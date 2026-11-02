// A2-05 : synchronisation documentaire stable par marqueurs (étape 2 du plan de transition ; EN PROPOSITION, non activée).
// Successeur proposé de sync-pilotage-v2.mjs, qui reste inchangé. Fonctions pures, plus une ligne de commande :
//   node sync-stable.mjs <racine> --apercu [--commit <sha>]
//       calcule en mémoire toutes les transformations sur les documents réels et n'écrit que l'aperçu
//       a2-05-travail/sync-stable-apercu.md (différences unifiées, empreinte du plan) ; aucun document de pilotage n'est modifié.
//   node sync-stable.mjs <racine> --appliquer --plan <empreinte> [--commit <sha>]
//       recalcule le plan et n'écrit que si son empreinte est celle de l'aperçu montré (différence vue avant toute écriture).
//       NON ACTIVÉ : ce mode n'est lancé que sur des copies temporaires (essais-sync-stable.mjs) tant que l'adoption n'est pas autorisée.
// Ne lit ni n'écrit rien dans data/, reconstruction/, tools/, tests/ ni docs/conception/.
// PROPOSITION (2026-10-24), non appliquée : prise en compte des identifiants réservés (V1-22 et V1-23, propositions non retenues de T4).
import { readFileSync, writeFileSync, mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { couverture } from './couverture-lot3.mjs';
import { verifierEmpreintes } from './empreintes-lot3.mjs';

const LF = '\n';
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const sansCR = (t) => t.replace(/\r\n/g, LF);
const avecFins = (t, eol) => (eol === '\r\n' ? t.replace(/\n/g, '\r\n') : t);
const finDe = (t) => (t.includes('\r\n') ? '\r\n' : LF);
export class Refus extends Error { constructor(m) { super(m); this.name = 'Refus'; } }
const refuser = (m) => { throw new Refus(m); };

// --- 1. Valeurs calculées (mêmes règles que sync-pilotage-v2.mjs) -----------------------------------------------------
export function calculerEtat(root) {
  const txt = (p) => sansCR(readFileSync(join(root, p), 'utf8'));
  const cov = couverture(root); const emp = verifierEmpreintes(root);
  const b = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
  const m = new Map(); for (const l of b.slice(b.search(/^## 8\. /m)).split(LF)) { const r = l.match(/^\| (V[12]-\d+) \| (?:[a-z]+ \| )?`((?:hj_)?v_\d+)(?:_s\d+)?`/); if (r && !m.has(r[1])) m.set(r[1], r[2]); }
  const vol2 = []; for (const l of b.slice(0, b.search(/^## 7\. /m)).split(LF)) { const r = l.match(/^\| (\d+) \| `((?:hj_)?v_\d+)_s\d+` \|/); if (r) vol2.push(r[2]); }
  const v1 = [...m.keys()].filter((k) => k.startsWith('V1'));
  // Identifiants réservés (décision du 2026-10-24, T4) : lignes « | réservé | V1-n | `rapport.md` | … » du §8, hors du tableau des corrections
  // retenues, jamais comptées comme corrections. Chacun est unique, nommé « Correction proposée (V1-n) » dans son rapport, et porté par aucune
  // correction retenue ; le prochain numéro libre suit le plus grand identifiant retenu ou réservé.
  const reserves = new Map(); for (const l of b.slice(b.search(/^## 8\. /m)).split(LF)) { const r = l.match(/^\| réservé \| (V[12]-\d+) \| `(docs\/rapports\/[^`]+\.md)` \|/); if (r) { if (reserves.has(r[1])) refuser('identifiant réservé deux fois : ' + r[1]); reserves.set(r[1], r[2]); } else if (/^\|\s*r[ée]serv[ée]?e?s?\s*\|/i.test(l)) refuser('ligne de réservation mal formée : ' + l.slice(0, 60)); }
  for (const [id, rap] of reserves) {
    if (m.has(id)) refuser('identifiant réservé porté par une correction retenue : ' + id);
    let t; try { t = txt(rap); } catch { refuser('identifiant réservé ' + id + ' : rapport introuvable (' + rap + ')'); }
    if (!t.includes('**Correction proposée (' + id + ')**')) refuser('identifiant réservé ' + id + ' : non proposé dans ' + rap);
  }
  // Réservations déclarées au §0 des rapports arbitrés (formule « V1-n non retenue, identifiant réservé ») : chacune doit figurer au tableau,
  // sous ce rapport (une réservation manquante est refusée), et chaque réservation du tableau doit y être déclarée (sinon, injustifiée).
  const declarees = new Map();
  for (const f of readdirSync(join(root, 'docs/rapports')).filter((x) => x.startsWith('etape2-A2-05-') && x.endsWith('.md')).sort()) {
    const p = 'docs/rapports/' + f; const t = txt(p); if (!/^\*\*Statut\*\* : \*\*arbitré le /m.test(t)) continue;
    const i0 = t.search(/^## 0\. /m); if (i0 < 0) continue; const i1 = t.slice(i0 + 1).search(/^## \d+\. /m); const s0 = i1 < 0 ? t.slice(i0) : t.slice(i0, i0 + 1 + i1);
    for (const r of s0.matchAll(/\b(V[12]-\d+) non retenue, identifiant réservé/g)) { if (declarees.has(r[1]) && declarees.get(r[1]) !== p) refuser('identifiant déclaré réservé par deux rapports : ' + r[1]); declarees.set(r[1], p); }
  }
  for (const [id, p] of declarees) if (reserves.get(id) !== p) refuser('réservation manquante : ' + id + ' (déclarée au §0 de ' + p + ')');
  for (const [id, p] of reserves) if (declarees.get(id) !== p) refuser('réservation non déclarée au §0 de son rapport : ' + id + ' (' + p + ')');
  const numeros = [...v1, ...[...reserves.keys()].filter((k) => k.startsWith('V1'))].map((k) => +k.slice(3));
  const reg = JSON.parse(txt('a2-05-travail/registre-tranches.json'));
  const tranches = reg.tranches.map((t) => ({ id: t.id, livraisons: t.livraisons, statut: t.statut, sens: cov.sens.filter((s) => t.livraisons.includes(s.livraison)).length }));
  const couvertes = new Set(tranches.flatMap((t) => t.livraisons));
  if (tranches.flatMap((t) => t.livraisons).length !== couvertes.size) refuser('une livraison figure dans deux tranches');
  const horsRegistre = Object.entries(cov.etats).filter(([, e]) => e === 'absent').map(([l]) => l).filter((l) => !couvertes.has(l));
  if (horsRegistre.length) refuser('livraisons restantes absentes du registre des tranches : ' + horsRegistre.join(', '));
  return {
    arbitres: cov.totaux.arbitres, total: 377, restants: 377 - cov.totaux.arbitres, proposes: cov.totaux.proposes,
    blocB: cov.totaux.blocB, blocBArbitres: cov.totaux.blocBArbitres,
    corrections: m.size + vol2.length, entry: new Set([...m.values(), ...vol2]).size, libre: 'V1-' + (Math.max(...numeros) + 1), reserves: [...reserves.keys()],
    tranches, horsF: tranches.filter((t) => t.id !== 'F').reduce((n, t) => n + t.sens, 0), empreintes: emp.controles,
  };
}

// --- 2. Bloc entre marqueurs ------------------------------------------------------------------------------------------
const DEBUT = /^<!-- a2-05:etat:debut empreinte=([0-9a-f]{16}) \(bloc généré par a2-05-travail\/sync-stable\.mjs ; ne pas modifier à la main\) -->$/;
const FIN = '<!-- a2-05:etat:fin -->';
const TOUT_MARQUEUR = /<!-- a2-05:etat:/g;
export function corpsEtat(v) {
  return ['- **Lot 3** : ' + v.arbitres + ' sens arbitrés sur ' + v.total + ' ; ' + v.restants + ' restent (' + v.proposes + ' proposés). **Bloc B** : ' + v.blocBArbitres + ' sur ' + v.blocB + '.',
    '- **Corrections retenues, non appliquées** : ' + v.corrections + ', dans ' + v.entry + ' ENTRY ; prochain numéro libre : ' + v.libre + '.',
    '- **Tranches** : ' + v.tranches.map((t) => t.id + ' (' + t.livraisons.join(', ') + ' ; ' + t.sens + ' sens ; ' + t.statut + ')').join(' ; ') + ' ; ' + v.horsF + ' sens hors du bloc F.',
    '- **Contrôles** : registre de couverture sans omission ni doublon ; manifeste d\'empreintes, ' + v.empreintes + ' rapports arbitrés identiques.'].join(LF);
}
export function blocEtat(v) {
  const corps = corpsEtat(v);
  return '<!-- a2-05:etat:debut empreinte=' + sha(corps).slice(0, 16) + ' (bloc généré par a2-05-travail/sync-stable.mjs ; ne pas modifier à la main) -->' + LF + corps + LF + FIN;
}
// Localise l'unique bloc ; refuse tout marqueur absent, dupliqué, mal formé, mal ordonné, ou un bloc retouché à la main.
export function localiser(texte) {
  const t = sansCR(texte); const lignes = t.split(LF);
  const nTous = (t.match(TOUT_MARQUEUR) ?? []).length;
  const iDeb = lignes.flatMap((l, i) => (l.startsWith('<!-- a2-05:etat:debut') ? [i] : []));
  const iFin = lignes.flatMap((l, i) => (l === FIN ? [i] : []));
  if (!iDeb.length) refuser('marqueur de début absent');
  if (!iFin.length) refuser('marqueur de fin absent');
  if (iDeb.length > 1) refuser('marqueur de début dupliqué (' + iDeb.length + ')');
  if (iFin.length > 1) refuser('marqueur de fin dupliqué (' + iFin.length + ')');
  if (nTous !== 2) refuser('marqueur a2-05:etat mal formé ou hors ligne (' + nTous + ' occurrences)');
  const m = lignes[iDeb[0]].match(DEBUT); if (!m) refuser('marqueur de début mal formé');
  if (iFin[0] <= iDeb[0]) refuser('marqueur de fin avant le marqueur de début');
  const corps = lignes.slice(iDeb[0] + 1, iFin[0]).join(LF);
  if (sha(corps).slice(0, 16) !== m[1]) refuser('bloc modifié à la main : son contenu ne correspond plus à l\'empreinte de son marqueur');
  return { debut: iDeb[0], fin: iFin[0], corps };
}
// Remplace le contenu entre marqueurs ; garantit que tout le reste du document est identique, octet pour octet.
export function remplacerBloc(texte, bloc) {
  const eol = finDe(texte); const lignes = sansCR(texte).split(LF); const { debut, fin } = localiser(texte);
  const res = [...lignes.slice(0, debut), ...bloc.split(LF), ...lignes.slice(fin + 1)].join(LF);
  const avant = lignes.slice(0, debut).join(LF), apres = lignes.slice(fin + 1).join(LF);
  if (!res.startsWith(avant) || !res.endsWith(apres)) refuser('contrôle interne : texte hors marqueurs modifié');
  return avecFins(res, eol);
}
// Insertion unique des marqueurs, avant une ligne d'ancrage qui doit être unique ; refuse si un marqueur existe déjà.
export function insererMarqueurs(texte, bloc, ancre) {
  const t = sansCR(texte); if ((t.match(TOUT_MARQUEUR) ?? []).length) refuser('marqueurs déjà présents : l\'insertion est unique');
  const lignes = t.split(LF); const i = lignes.flatMap((l, k) => (l.startsWith(ancre) ? [k] : []));
  if (i.length !== 1) refuser('ligne d\'ancrage « ' + ancre.slice(0, 40) + ' » : ' + i.length + ' occurrence(s), une seule attendue');
  return avecFins([...lignes.slice(0, i[0]), ...bloc.split(LF), '', ...lignes.slice(i[0])].join(LF), finDe(texte));
}
// Cohérence entre les nombres calculés et ceux, rédigés à la main, des rubriques ; refuse au premier écart.
export function verifierCoherence(texte, v) {
  const t = sansCR(texte).replace(/\s+/g, ' ');
  const regles = [
    ['candidats arbitrés', /\*\*(\d+) candidats arbitrés sur (\d+) ; (\d+) restent\*\*/, (r) => +r[1] === v.arbitres && +r[2] === v.total && +r[3] === v.restants],
    ['bloc B', /\*\*Bloc B : (\d+) sens arbitrés sur (\d+)[^*]*; (\d+) restent\.\*\*/, (r) => +r[1] === v.blocBArbitres && +r[2] === v.blocB && +r[3] === v.blocB - v.blocBArbitres],
    ['corrections', /\*\*(\d+) corrections, dans (\d+) ENTRY\*\*/, (r) => +r[1] === v.corrections && +r[2] === v.entry],
  ];
  for (const [nom, re, ok] of regles) { const r = t.match(re); if (!r) refuser('rubrique « ' + nom + ' » introuvable'); if (!ok(r)) refuser('rubrique « ' + nom + ' » incohérente avec les valeurs calculées : « ' + r[0] + ' »'); }
}

// --- 3. Journal et bilan : ajouts contrôlés ---------------------------------------------------------------------------
const LIGNE_JOURNAL = /^\| \d{4}-\d{2}-\d{2}(?: au \d{4}-\d{2}-\d{2})? \| [^|]+ \| .+ \| [^|]+ \|$/;
export function ajouterLigneJournal(texte, ligne) {
  if (!LIGNE_JOURNAL.test(ligne)) refuser('ligne de journal mal formée');
  const lignes = sansCR(texte).split(LF);
  const tete = lignes.flatMap((l, i) => (l === '| Date | Étape · tâche | Résumé | Commit |' ? [i] : []));
  if (tete.length !== 1) refuser('en-tête du journal : ' + tete.length + ' occurrence(s), une seule attendue');
  let k = tete[0] + 2; while (k < lignes.length && lignes[k].startsWith('| ')) k++;
  if (lignes.slice(tete[0] + 2, k).includes(ligne)) return texte; // idempotent : ligne déjà présente
  return avecFins([...lignes.slice(0, k), ligne, ...lignes.slice(k)].join(LF), finDe(texte));
}
export function ajouterSectionBilan(texte, numero, titre, corps) {
  const t = sansCR(texte); const nums = [...t.matchAll(/^### 8\.(\d+) /gm)].map((r) => +r[1]);
  const entete = '### 8.' + numero + ' ' + titre;
  if (nums.includes(numero)) { if (t.includes(entete + LF + LF + corps)) return texte; refuser('§8.' + numero + ' existe déjà avec un autre contenu'); }
  if (Math.max(...nums) !== numero - 1) refuser('§8.' + numero + ' : la dernière sous-section est 8.' + Math.max(...nums));
  const fin = t.match(/\s*$/)[0];
  return avecFins(t.slice(0, t.length - fin.length) + LF + LF + entete + LF + LF + corps + fin, finDe(texte));
}

// --- 4. Mentions « non committé » d'un commit poussé -------------------------------------------------------------------
// Ne marque que les lignes du journal qui portaient « non committé » DANS le commit lui-même (texteAuCommit) ;
// les lignes postérieures ne sont pas touchées ; seule la dernière cellule change ; idempotent.
export function marquerCommit(texte, texteAuCommit, court) {
  if (!/^[0-9a-f]{7}$/.test(court)) refuser('hash court attendu (7 caractères)');
  const NC = ' | non committé |'; const vise = sansCR(texteAuCommit).split(LF).filter((l) => LIGNE_JOURNAL.test(l) && l.endsWith(NC));
  if (!vise.length) refuser('aucune ligne « non committé » dans le commit');
  const fait = (l) => l.slice(0, -NC.length) + ' | `' + court + '` |';
  const lignes = sansCR(texte).split(LF); let n = 0, deja = 0;
  for (const l of vise) {
    const i = lignes.indexOf(l), j = lignes.indexOf(fait(l));
    if (i >= 0) { if (lignes.indexOf(l, i + 1) >= 0) refuser('ligne dupliquée dans le journal'); lignes[i] = fait(l); n++; }
    else if (j >= 0) deja++;
    else refuser('ligne du commit introuvable dans le journal courant : « ' + l.slice(0, 60) + ' »');
  }
  return { texte: avecFins(lignes.join(LF), finDe(texte)), marquees: n, deja, visees: vise.length };
}

// --- 5. Plan complet, aperçu, application -----------------------------------------------------------------------------
export const PILOTAGE = ['ETAT-ACTUEL.md', 'ROADMAP.md'];
export const ANCRE = '- **Terminé et arbitré.**';
const git = (root, ...a) => { const r = spawnSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }); return { code: r.status, out: r.stdout ?? '' }; };
// docs : dossier où lire (et, à l'application, écrire) les documents de pilotage ; par défaut la racine (copies temporaires pour les essais)
export function planifier(root, { commit, docs = root } = {}) {
  const v = calculerEtat(root); const bloc = blocEtat(v); const sorties = {}; const journal = [];
  for (const p of PILOTAGE) {
    const avant = readFileSync(join(docs, p), 'utf8'); verifierCoherence(avant, v);
    const present = (sansCR(avant).match(TOUT_MARQUEUR) ?? []).length;
    let apres = present ? remplacerBloc(avant, bloc) : insererMarqueurs(avant, bloc, ANCRE);
    localiser(apres); sorties[p] = { avant, apres, present };
  }
  // Les deux documents portent les marqueurs ensemble ou pas du tout, et, s'ils les portent, le même bloc avant remplacement
  const [e, r] = PILOTAGE.map((p) => sorties[p]);
  if (!!e.present !== !!r.present) refuser('marqueurs présents dans un seul des deux documents de pilotage');
  if (e.present && localiser(e.avant).corps !== localiser(r.avant).corps) refuser('blocs différents dans ETAT-ACTUEL.md et ROADMAP.md');
  if (localiser(e.apres).corps !== localiser(r.apres).corps) refuser('blocs différents dans ETAT-ACTUEL.md et ROADMAP.md');
  if (commit) {
    const plein = git(root, 'rev-parse', '--verify', commit + '^{commit}'); if (plein.code !== 0) refuser('commit inconnu : ' + commit);
    const h = plein.out.trim(); if (git(root, 'merge-base', '--is-ancestor', h, 'origin/ocha-v2').code !== 0) refuser('commit non contenu dans origin/ocha-v2 : non poussé');
    const auCommit = git(root, 'show', h + ':ETAT-ACTUEL.md'); if (auCommit.code !== 0) refuser('ETAT-ACTUEL.md absent du commit');
    const r = marquerCommit(sorties['ETAT-ACTUEL.md'].apres, auCommit.out, h.slice(0, 7)); sorties['ETAT-ACTUEL.md'].apres = r.texte;
    journal.push(r.marquees + ' ligne(s) du journal marquées `' + h.slice(0, 7) + '` sur ' + r.visees + ' visées (' + r.deja + ' déjà marquées)');
  }
  const empreinte = sha(PILOTAGE.map((p) => p + LF + sorties[p].apres).join(LF)).slice(0, 16);
  return { valeurs: v, bloc, sorties, journal, empreinte, docs };
}
export function difference(avant, apres, nom) {
  const d = mkdtempSync(join(tmpdir(), 'sync-stable-'));
  try {
    writeFileSync(join(d, 'a'), sansCR(avant)); writeFileSync(join(d, 'b'), sansCR(apres));
    const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U1', 'a', 'b'], { cwd: d, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    if (r.status !== 0 && r.status !== 1) refuser('git diff --no-index : code ' + r.status);
    // Les lignes de contexte vides (« » seul) sont rendues vides, pour ne pas créer d'espace finale dans l'aperçu
    return r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/' + nom + LF + '+++ b/' + nom + LF).replace(/^ $/gm, '');
  } finally { rmSync(d, { recursive: true, force: true }); }
}
export function appliquer(plan, empreinteVue) {
  if (empreinteVue !== plan.empreinte) refuser('empreinte du plan différente de celle de l\'aperçu montré : rien n\'est écrit');
  // Le document ne doit pas avoir changé depuis le calcul du plan
  for (const p of PILOTAGE) if (readFileSync(join(plan.docs, p), 'utf8') !== plan.sorties[p].avant) refuser(p + ' modifié depuis le calcul du plan : rien n\'est écrit');
  for (const p of PILOTAGE) if (plan.sorties[p].apres !== plan.sorties[p].avant) writeFileSync(join(plan.docs, p), plan.sorties[p].apres);
}

// --- Ligne de commande ------------------------------------------------------------------------------------------------
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [root, ...args] = process.argv.slice(2); if (!root) throw new Error('argument attendu : racine du dépôt');
  const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
  const plan = planifier(root, { commit: opt('--commit') });
  if (args.includes('--appliquer')) { appliquer(plan, opt('--plan')); console.log('appliqué, plan ' + plan.empreinte); }
  else {
    const P = ['# Aperçu de la synchronisation stable (proposition, non appliquée)', '', '**Date** : 2026-10-18', '**Statut** : aperçu généré par `a2-05-travail/sync-stable.mjs --apercu`' + (opt('--commit') ? ' `--commit ' + opt('--commit') + '`' : '') + ' ; **aucun document de pilotage n\'est modifié**.', '',
      '**Empreinte du plan** : `' + plan.empreinte + '` (l\'application exigerait cette empreinte).', '', ...plan.journal.map((l) => '- ' + l), '',
      ...PILOTAGE.flatMap((p) => ['## `' + p + '`', '', '````diff', difference(plan.sorties[p].avant, plan.sorties[p].apres, p).trimEnd(), '````', ''])];
    writeFileSync(join(root, 'a2-05-travail/sync-stable-apercu.md'), P.join(LF).trimEnd() + LF);
    console.log('aperçu : plan ' + plan.empreinte + ' ; ' + (plan.journal.join(' ; ') || 'sans commit'));
  }
}
