// A2-05 · bloc F : première mesure de couverture de la recherche d'omissions d'`interrogatif` (A10, §8, temps 1 et 2), sur les 807 sens publiés qui ne portent
// pas la fonction, avec les huit filtres de `omissions.mjs` (X1 activé). PRÉPARÉ : à ne lancer sur les données réelles que sur autorisation distincte, une fois.
// Lecture seule : aucune donnée, aucun lot, aucun journal, aucune norme, aucun document de pilotage n'est écrit ; seules sont écrites, dans un dossier neuf
// (`mesure/`, à côté de ce script), la mesure (`mesure.json`) et sa proposition de rapport (`rapport-mesure.md`). Mesure de couverture seulement : aucune
// relecture (temps 3), aucune conclusion lexicale ; un filtre ne vaut jamais preuve. Chaque candidat garde son identifiant de SENSE et tous ses filtres d'origine.
// Arrêt au premier écart ; aucune réparation automatique ; n'indexe, ne committe et ne pousse rien.
// Usage : node a2-05-travail/arbitrage-F/mesure-couverture/mesurer-couverture.mjs <racine du dépôt> --execution-autorisee
// Sans `--execution-autorisee` : refus, code 2, rien n'est lu ni écrit. Variable OCHA_MESURE_GARDE_ESSAI=1 (essais seulement) : arrêt après les préconditions,
// code 3, aucun filtre lancé, rien n'est écrit. Les données injectées (`executer(root, { donnees })`) ne sont accessibles que par import, pour les essais.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { charger, construirePopulation, relever, FILTRES } from '../../perimetre-F-operationnel/omissions.mjs';

const W = 'a2-05-travail/', I = W + 'arbitrage-F/mesure-couverture/';
export const SORTIE = I + 'mesure/';
const MODULE = W + 'perimetre-F-operationnel/omissions.mjs', MODULE_SHA = '2b89abd92699e0dffb480c2224f0a66595ddc2fb6d114df68ea781c9b400ac8d';
const ESSAI_F = W + 'perimetre-F-operationnel/essayer-filtres.mjs', ESSAI_F_SHA = 'cda5bb117b39195c25ac5cd86798a9560492427b6cad12d009df131fa26f11e0';
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1';
const CTRL = W + 'controle-relais-allege.mjs', EMP = W + 'empreintes-lot3.mjs', COUV = W + 'couverture-lot3.mjs', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs';
export const IDS_FILTRES = ['T1-radicaux', 'T1-point', 'T1-mots', 'T2-classe', 'T2-nuls', 'T2-serie', 'T2-journal', 'X1'];
const ZONES = ['data', 'reconstruction', 'tools', 'tests'];
export const ATTENDUS_REELS = { population: 807, porteurs: 17, n5: 805, horsJlpt: 2, entry: 669 };
const LUS = ['data/n5/vocab.json', 'data/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/journal.json'];
// Identique à RE_RADICAUX de omissions.mjs (vérifié en précondition) : sert à citer les décisions de journal qui ont fait relever un sens par T2-journal
const RE_Q = /interrog|question|demand/i, RE_Q_SOURCE = 'RE_RADICAUX = /interrog|question|demand/i';
export const PHRASE = "Un sens que les filtres n'ont pas relevé n'est pas un sens vérifié conforme : il n'a pas été relu.";
const D0724 = 'A2-04-D0724';
const COMMANDE = 'node ' + I + 'mesurer-couverture.mjs . --execution-autorisee';

const sha = (b) => createHash('sha256').update(b).digest('hex');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
class Arret extends Error {}

// Instantané de l'arbre (hors .git, node_modules, export de relecture, archives, aperçu de synchronisation) : la mesure ne doit rien modifier hors de `mesure/`
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
function instantane(root) {
  const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === W + 'sync-stable-apercu.md') continue; if (statSync(join(root, p)).isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } };
  m(''); return h;
}
const ecarts = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();

// Mesure, fonction pure : population, relevé (deux fois, déterminisme), couverture, candidats avec leur provenance. Aucune écriture.
export function mesurer(D, { date, origine, head, lus = null }) {
  const { pop, porteurs } = construirePopulation(D);
  const r = relever(D, { avecX1: true }), r2 = relever(D, { avecX1: true });
  const parSens = new Map(pop.map((p) => [p.id, p]));
  const journalDe = (source) => D.journal.filter((d) => d.entry === source && RE_Q.test([d.reason, JSON.stringify(d.before ?? ''), JSON.stringify(d.after ?? '')].join(' '))).map((d) => d.id);
  const candidats = r.candidats.map((c, k) => { const p = parSens.get(c.id); return { rang: k + 1, id: c.id, entry: c.entry, source: p ? p.source : null, mot: c.mot, traduction: c.traduction, filtres: [...c.filtres], fichesFusionnees: p ? p.fusionnees : [], decisionsJournal: c.filtres.includes('T2-journal') && p ? journalDe(p.source) : [] }; });
  const t1 = (c) => c.filtres.some((f) => f.startsWith('T1-')), t2 = (c) => c.filtres.some((f) => f.startsWith('T2-'));
  const seulParFiltre = Object.fromEntries(IDS_FILTRES.map((f) => [f, candidats.filter((c) => c.filtres.length === 1 && c.filtres[0] === f).length]));
  const parNombre = {}; for (const c of candidats) parNombre[c.filtres.length] = (parNombre[c.filtres.length] ?? 0) + 1;
  const n5 = pop.filter((p) => p.e.level === 'N5').length;
  const d0724 = D.journal.find((d) => d.id === D0724); const s0724 = d0724 ? d0724.entry.replace(/^n5_/, '') + '_s1' : null;
  return {
    objet: "A2-05 · volet 1 · lot 3 · bloc F : recherche d'omissions d'`interrogatif` (A10, §8), première mesure de couverture",
    statut: 'mesure de couverture, proposition non arbitrée ; aucune relecture (temps 3), aucune conclusion lexicale, aucune modification',
    date, origine, head, commande: COMMANDE, module: { chemin: MODULE, sha: MODULE_SHA }, filtres: FILTRES.map(([id, temps, libelle]) => ({ id, temps, libelle })), x1: 'activé (arbitrage du 2026-11-03, filtre complémentaire non normatif, hors A10)', lus,
    population: { sens: pop.length, porteursExclus: porteurs.length, n5, horsJlpt: pop.length - n5, entry: new Set(pop.map((p) => p.e.id)).size, sensAvecFichesFusionnees: pop.filter((p) => p.fusionnees.length).length },
    couverture: {
      parFiltre: r.parFiltre, seulParFiltre, releves: candidats.length, parTemps1: candidats.filter(t1).length, seulementTemps2: candidats.filter((c) => !t1(c) && t2(c)).length,
      seulementX1: candidats.filter((c) => !t1(c) && !t2(c)).length, relevesSansX1: candidats.filter((c) => t1(c) || t2(c)).length, nonReleves: pop.length - candidats.length, relus: 0, parNombreDeFiltres: parNombre,
      moduleSeulementTemps2: r.seulementTemps2,
    },
    candidats,
    decisionsExistantes: d0724 ? [{ id: D0724, sens: s0724, statut: d0724.status, raison: d0724.reason, releve: candidats.some((c) => c.id === s0724), filtres: candidats.find((c) => c.id === s0724)?.filtres ?? [] }] : [],
    _controle: { brut: r, deterministe: JSON.stringify(r) === JSON.stringify(r2), idsPopulation: pop.map((p) => p.id), idsPorteurs: porteurs.map((p) => p.id) },
  };
}

// Contrôles de cohérence de la mesure, fonction pure : liste d'écarts (vide si conforme)
export function controlerMesure(m, attendus) {
  const e = []; const k = m._controle; const ids = m.candidats.map((c) => c.id); const pop = new Set(k.idsPopulation), por = new Set(k.idsPorteurs);
  if (!k.deterministe) e.push('M1 relevé non déterministe');
  for (const [cle, v] of [['sens', attendus.population], ['porteursExclus', attendus.porteurs], ['n5', attendus.n5], ['horsJlpt', attendus.horsJlpt], ['entry', attendus.entry]]) if (m.population[cle] !== v) e.push('M2 population : ' + cle + ' = ' + m.population[cle] + ', attendu ' + v);
  if (new Set(ids).size !== ids.length) e.push('M3 candidat en double');
  if (m.candidats.some((c) => !c.filtres.length || new Set(c.filtres).size !== c.filtres.length || c.filtres.some((f) => !IDS_FILTRES.includes(f)) || c.filtres.join() !== IDS_FILTRES.filter((f) => c.filtres.includes(f)).join())) e.push('M3 filtres d\'origine absents, en double, inconnus ou hors d\'ordre');
  if (ids.some((i) => !pop.has(i) || por.has(i))) e.push('M4 candidat hors de la population, ou porteur');
  if (JSON.stringify(Object.keys(m.couverture.parFiltre)) !== JSON.stringify(IDS_FILTRES) || IDS_FILTRES.some((f) => m.couverture.parFiltre[f] !== m.candidats.filter((c) => c.filtres.includes(f)).length)) e.push('M5 décompte par filtre incohérent');
  const c = m.couverture;
  if (c.parTemps1 + c.seulementTemps2 + c.seulementX1 !== c.releves || c.relevesSansX1 + c.seulementX1 !== c.releves || c.nonReleves !== m.population.sens - c.releves || c.relus !== 0 || k.brut.releves !== c.releves || k.brut.population !== m.population.sens) e.push('M6 arithmétique de la couverture incohérente');
  if (c.moduleSeulementTemps2 !== c.seulementTemps2 + c.seulementX1) e.push('M6 « seul temps 2 » du module différent de seul temps 2 + seul X1');
  if (m.candidats.some((x) => x.filtres.includes('T2-journal') !== (x.decisionsJournal.length > 0))) e.push('M7 décisions de journal citées incohérentes avec T2-journal');
  if (m.candidats.some((x, i) => x.rang !== i + 1)) e.push('M8 rangs non continus');
  return e;
}

const cellule = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const temps = (t) => (t === 0 ? 'hors A10' : String(t));

// Proposition de rapport (A10, §8, compte rendu obligatoire) ; aucune conclusion lexicale
export function rediger(m) {
  const c = m.couverture; const essai = m.origine !== 'réelles';
  const L = [
    '# Étape 2 · A2-05 · Volet 1 · Lot 3 — bloc F : recherche d\'omissions d\'`interrogatif` (A10, §8), première mesure de couverture', '',
    '**Date** : ' + m.date,
    '**Statut** : **mesure de couverture, proposition, non arbitrée.** Aucune relecture (temps 3), aucune conclusion lexicale, aucune modification de donnée, de lot, de journal ou de norme.',
    '**Données** : ' + (essai ? '**ESSAI : données ' + m.origine + ', sans valeur de mesure.**' : 'réelles (dépôt, `HEAD` ' + m.head.slice(0, 7) + ', arbre de travail).'), '',
    '## 1. Cadre', '',
    '- Base normative : addendum A10, §8 (recherche des omissions, temps 1 et 2) ; périmètre opérationnel accepté le 2026-11-03 (`etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`, §0 et §6).',
    '- **Un filtre de recherche ne vaut jamais preuve d\'attribution** : il désigne des sens à relire, rien de plus. Cette mesure ne relit aucun sens.',
    '- **Deux décomptes séparés** : le contrôle des 17 sens qui portent la fonction (bloc F, compté dans les 377 du lot 3) et la présente recherche d\'omissions ne sont jamais additionnés. Un sens relevé ici n\'est pas ajouté aux 377.',
    '- Résultats de couverture (§4 et §5) et conclusions lexicales (temps 3, à venir) sont distincts : le présent document ne contient que les premiers.', '',
    '## 2. Provenance', '',
    '| Élément | Valeur |', '|---|---|',
    '| Commande | `' + m.commande + '` |',
    '| `HEAD` | `' + m.head + '` |',
    '| Module de filtrage | `' + m.module.chemin + '`, SHA-256 `' + m.module.sha + '` |',
    '| Filtres | ' + m.filtres.map((f) => '`' + f.id + '`').join(', ') + ' ; X1 ' + m.x1 + ' |',
    ...(m.lus ? Object.entries(m.lus).map(([p, h]) => '| Lu : `' + p + '` | SHA-256 `' + h + '` |') : ['| Données lues | injectées par l\'essai (aucun fichier du dépôt) |']), '',
    'Le détail complet (tous les candidats, tous leurs filtres) est dans `mesure.json`, à côté de ce rapport.', '',
    '## 3. Population', '',
    '- **' + m.population.sens + ' sens** publiés qui ne portent pas `interrogatif` (' + m.population.n5 + ' N5, ' + m.population.horsJlpt + ' hors JLPT), dans **' + m.population.entry + ' ENTRY** ; les ' + m.population.porteursExclus + ' porteurs sont exclus.',
    '- Chaque sens est lu avec la fiche source de son ENTRY et les fiches retirées par fusion vers elle (sens concernés : ' + m.population.sensAvecFichesFusionnees + ').',
    '- Hors population : les données de grammaire (A10, §4, point 5). Les phrases d\'exemple ne sont pas filtrées ; elles seront lues en entier au temps 3.', '',
    '## 4. Couverture', '',
    '| Filtre | Temps | Ce qu\'il relève | Sens relevés | Relevés par ce seul filtre |', '|---|---|---|---|---|',
    ...m.filtres.map((f) => '| `' + f.id + '` | ' + temps(f.temps) + ' | ' + cellule(f.libelle) + ' | ' + c.parFiltre[f.id] + ' | ' + c.seulParFiltre[f.id] + ' |'), '',
    '| Décompte | Sens |', '|---|---|',
    '| Population | ' + m.population.sens + ' |',
    '| Relevés, dédupliqués (un sens compté une fois, tous ses filtres indiqués) | ' + c.releves + ' |',
    '| dont relevés par le temps 1 | ' + c.parTemps1 + ' |',
    '| dont relevés par le seul temps 2 | ' + c.seulementTemps2 + ' |',
    '| dont relevés par le seul X1 (hors A10) | ' + c.seulementX1 + ' |',
    '| Relevés par les filtres d\'A10 (sans X1) | ' + c.relevesSansX1 + ' |',
    '| Non relevés par aucun filtre | ' + c.nonReleves + ' |',
    '| **Relus** | **' + c.relus + '** |', '',
    'Répartition des relevés par nombre de filtres : ' + Object.entries(c.parNombreDeFiltres).map(([n, v]) => n + ' filtre' + (n > 1 ? 's' : '') + ' : ' + v).join(' ; ') + '.', '',
    '**' + PHRASE + '** Les ' + c.nonReleves + ' sens non relevés ne sont donc ni vérifiés ni conformes : ils sont hors de la relecture.', '',
    'Note de méthode : le module rend un « seul temps 2 » de ' + c.moduleSeulementTemps2 + ' qui compte aussi les sens relevés par le seul X1 (X1 n\'étant ni du temps 1 ni du temps 2) ; le présent décompte les sépare (' + c.seulementTemps2 + ' et ' + c.seulementX1 + ').', '',
    '## 5. Candidats relevés (liste dédupliquée)', '',
    'Aucune colonne de conclusion : la relecture du temps 3 n\'est pas commencée. Chaque candidat garde son identifiant de SENSE et la liste de ses filtres d\'origine, du relevé jusqu\'à la conclusion ; pour `T2-journal`, les décisions qui l\'ont fait relever sont citées.', '',
    '| N° | SENSE | ENTRY | Mot | Traduction publiée | Filtres d\'origine | Décisions de journal (T2-journal) |', '|---|---|---|---|---|---|---|',
    ...m.candidats.map((x) => '| ' + x.rang + ' | `' + x.id + '` | `' + x.entry + '` | ' + cellule(x.mot) + ' | ' + cellule(x.traduction) + ' | ' + x.filtres.map((f) => '`' + f + '`').join(', ') + ' | ' + (x.decisionsJournal.map((d) => d.replace('A2-04-', '')).join(', ') || '—') + ' |'), '',
    '## 6. Décisions déjà existantes', '',
    ...(m.decisionsExistantes.length ? m.decisionsExistantes.map((d) => '- **' + d.id.replace('A2-04-', '') + '** (`' + d.sens + '`, ' + d.statut + ') : « ' + d.raison + ' » ' + (d.releve ? 'Le sens est relevé (' + d.filtres.map((f) => '`' + f + '`').join(', ') + ').' : 'Le sens n\'est pas relevé.') + ' La relecture dira si cette décision s\'accorde avec la définition d\'A10, sans la réécrire.') : ['- Aucune décision existante retrouvée dans les données lues.']), '',
    '## 7. Limites', '',
    '- **' + PHRASE + '**',
    '- Les filtres ne voient pas une fiche qui décrirait un emploi interrogatif sans aucune des marques recherchées, hors des classes et des séries du temps 2.',
    '- `T2-serie` compare les graphies du candidat, non ses lectures : un composé écrit en kanji sur un porteur écrit en kana (ou l\'inverse, hors des lectures des porteurs) lui échappe.',
    '- X1 est un filtre complémentaire, non normatif, hors A10 ; il n\'élargit que la relecture.',
    '- Les exemples ne sont pas filtrés ; les données de grammaire sont hors population.', '',
    '## 8. Suite', '',
    '- La charge de relecture mesurée ici (' + c.releves + ' sens) est soumise à l\'arbitrage ; **la relecture individuelle du temps 3 ne commence qu\'après cet arbitrage et sur autorisation distincte.**',
    '- Au temps 3, chaque candidat recevra l\'une des trois conclusions d\'A10, §8, motivée par la définition et les frontières ; une omission signalée ne modifie rien et n\'est pas ajoutée aux 377 candidats du lot 3.',
    '- L\'inscription de cette mesure dans les documents de pilotage se fait séparément ; ce rapport est une proposition, à ce stade hors de `docs/rapports/`.',
  ];
  return L.join('\n') + '\n';
}

// Exécution encadrée : préconditions, mesure, écriture de `mesure/`, contrôles après écriture. Rend { code } : 0 conforme, 1 arrêt, 3 garde d'essai.
export function executer(root, { donnees = null, origine = 'réelles', attendus = ATTENDUS_REELS, garde = false, date = new Date().toISOString().slice(0, 10), log = console.log } = {}) {
  let ecrit = false, filtre = false;
  const ok = (c, nom, d) => { log((c ? 'conforme ' : 'ÉCART    ') + nom + (d ? ' : ' + d : '')); if (!c) throw new Arret(nom); };
  const git = (...a) => spawnSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const out = ((x.stdout ?? '') + (x.stderr ?? '')).trim(); return { code: x.status, out, fin: out.split('\n').pop(), ids: out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
  const fichier = (p) => readFileSync(join(root, p));
  const zones = () => git('-c', 'core.quotepath=false', 'status', '--porcelain', '--untracked-files=all', '--', ...ZONES).stdout.trim();
  const sains = (n) => {
    const e = lancer(EMP); ok(e.code === 0 && e.out.includes('47 rapports contrôlés, identiques'), n + ' empreintes : 47 rapports identiques', e.fin);
    const r = lancer(CTRL, '--apres-application'); ok(r.ids === 'C9b' && r.fin === '29 conformes sur 30', n + ' relais : 29 sur 30, C9b seul ; C9a conforme', r.fin + ' ; écarts : ' + r.ids);
    const p = lancer(CPO); ok(p.code === 0 && p.fin === '29 conformes sur 29', n + ' contrôle du périmètre opérationnel : 29 sur 29', p.fin);
  };
  try {
    log('--- Préconditions');
    ok(git('rev-parse', 'HEAD').stdout.trim() === CLOTURE, 'P1 HEAD à 39cce13 (mesure avant tout commit)', git('rev-parse', '--short', 'HEAD').stdout.trim());
    ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P2 index vide');
    ok(!existsSync(join(root, SORTIE)), 'P3 dossier de mesure absent : mesure jamais effectuée', SORTIE);
    ok(sha(fichier(MODULE)) === MODULE_SHA, 'P4 module de filtrage relu, inchangé', MODULE);
    ok(sha(fichier(ESSAI_F)) === ESSAI_F_SHA, 'P4 essai des filtres relu, inchangé', ESSAI_F);
    ok(JSON.stringify(FILTRES.map(([id]) => id)) === JSON.stringify(IDS_FILTRES) && fichier(MODULE).toString('utf8').includes(RE_Q_SOURCE), 'P5 huit filtres, X1 compris, dans leur ordre ; motif des radicaux identique', IDS_FILTRES.join(', '));
    const z = zones(); ok(!z, 'P6 data/, reconstruction/, tools/, tests/ identiques à HEAD, sans fichier non suivi', z.split('\n')[0]);
    sains('P7');
    const cv = lancer(COUV); ok(cv.code === 0 && cv.out.includes('377 arbitrés, 0 proposés, 0 restants'), 'P8 couverture du lot 3 : 377 sur 377', cv.out.split('\n')[0].slice(0, 120));
    const ef = lancer(ESSAI_F); ok(ef.code === 0 && ef.fin === 'essai conforme', 'P9 essai synthétique des filtres conforme', (ef.out.match(/^conforme/gm) ?? []).length + ' vérifications');
    const D = donnees ?? charger(root);
    const { pop, porteurs, manquantes } = construirePopulation(D); const n5 = pop.filter((p) => p.e.level === 'N5').length;
    ok(pop.length === attendus.population && porteurs.length === attendus.porteurs && n5 === attendus.n5 && pop.length - n5 === attendus.horsJlpt && new Set(pop.map((p) => p.e.id)).size === attendus.entry && !manquantes.length && porteurs.every((p) => fns(p.s).includes('interrogatif')),
      'P10 population (' + origine + ') : ' + attendus.population + ' sens, ' + attendus.entry + ' ENTRY, ' + attendus.porteurs + ' porteurs exclus, toutes les fiches présentes', pop.length + ' sens');
    if (garde) { log("garde d'essai : préconditions conformes ; aucun filtre lancé, rien n'est écrit"); return { code: 3 }; }

    log('--- Mesure (temps 1 et 2, huit filtres, X1 activé ; aucune relecture)');
    const avant = instantane(root);
    const lus = donnees ? null : Object.fromEntries([...LUS, ...readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((n) => /^lot-[0-9]+\.json$/.test(n)).sort().map((n) => 'reconstruction/a2-04/lots/' + n)].map((p) => [p, sha(fichier(p))]));
    filtre = true; const m = mesurer(D, { date, origine, head: CLOTURE, lus });
    const ec = controlerMesure(m, attendus); ok(!ec.length, 'M1 à M8 cohérence de la mesure : déterminisme, population, déduplication, provenance, décomptes', ec.join(' | ') || m.couverture.releves + ' relevés, ' + m.couverture.nonReleves + ' non relevés');
    const { _controle, ...publie } = m;
    const json = JSON.stringify(publie, null, 1) + '\n'; const rapport = rediger(m);
    ok(rapport.includes(PHRASE) && rapport.includes('| **Relus** | **0** |') && m.candidats.every((x) => rapport.includes('`' + x.id + '`')) && !/^\|.*(relève de la fonction|omission signalée)/m.test(rapport), 'M9 rapport : phrase obligatoire, relus 0, tous les candidats, aucune conclusion');

    log('--- Écriture (dossier neuf seulement)');
    mkdirSync(join(root, SORTIE)); ecrit = true;
    writeFileSync(join(root, SORTIE + 'mesure.json'), json); writeFileSync(join(root, SORTIE + 'rapport-mesure.md'), rapport);
    log('conforme écrit : ' + SORTIE + 'mesure.json : ' + sha(Buffer.from(json)).slice(0, 16));
    log('conforme écrit : ' + SORTIE + 'rapport-mesure.md : ' + sha(Buffer.from(rapport)).slice(0, 16));

    log('--- Contrôles après écriture');
    const ch = ecarts(avant, instantane(root)); ok(JSON.stringify(ch) === JSON.stringify([SORTIE + 'mesure.json', SORTIE + 'rapport-mesure.md']), 'C1 arbre entier comparé : les deux fichiers de mesure seuls sont nouveaux, rien d\'autre ne change', ch.join(', '));
    ok(JSON.stringify(JSON.parse(readFileSync(join(root, SORTIE + 'mesure.json'), 'utf8'))) === JSON.stringify(publie), 'C2 mesure.json relu, identique');
    const z2 = zones(); ok(!z2, 'C3 data/, reconstruction/, tools/, tests/ toujours identiques à HEAD');
    ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C4 index vide');
    sains('C5');
    log('mesure de couverture effectuée (' + origine + ') : ' + m.population.sens + ' sens, ' + m.couverture.releves + ' relevés, ' + m.couverture.nonReleves + ' non relevés, 0 relu ; aucune conclusion lexicale');
    return { code: 0, mesure: publie };
  } catch (x) {
    if (!(x instanceof Arret)) throw x;
    log('ARRÊT : ' + (ecrit ? 'écart après écriture ; le dossier ' + SORTIE + ' est laissé tel quel pour examen, aucune réparation' : filtre ? "filtres lancés en mémoire, rien n'est écrit" : "rien n'est écrit, aucun filtre lancé"));
    return { code: 1 };
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const a = process.argv.slice(2); if (!a[0]) throw new Error('argument attendu : racine du dépôt');
  if (!a.includes('--execution-autorisee')) { console.error("refus : la mesure de couverture n'est pas autorisée ; rien n'est lu ni écrit, aucun filtre lancé"); process.exit(2); }
  process.exit(executer(resolve(a[0]), { garde: process.env.OCHA_MESURE_GARDE_ESSAI === '1' }).code);
}
