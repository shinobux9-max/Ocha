// A2-05 · volet 1 · lot 3 : manifeste d'empreintes (SHA-256) des rapports arbitrés (outillage v2, en proposition).
// Par défaut, vérifie le manifeste ; avec --ecrire, l'établit à partir de l'état présent (une seule fois, sur décision).
// Rapports couverts : les rapports de livraison arbitrés du lot 3, leurs périmètres arbitrés, le périmètre du lot 3 et le bilan du bloc A.
// Entrées de tranche (option A, décision du 2026-10-22) : un périmètre accepté peut être protégé seul tant que le rapport de sa tranche n'est
// pas arbitré ; un rapport arbitré exige son périmètre protégé (anomaliesTranches, partagée avec le contrôle C9a du relais).
// Usage : node empreintes-lot3.mjs <racine du dépôt> [--ecrire]
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { couverture } from './couverture-lot3.mjs';

export const MANIFESTE = 'a2-05-travail/empreintes-rapports-arbitres.json';
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const sha = (root, p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
const arbitre = (root, p) => /^\*\*Statut\*\* : \*\*(arbitré le |périmètre accepté le )/m.test(readFileSync(join(root, p), 'utf8'));

/** Rapports arbitrés à couvrir, calculés : rapports de livraison arbitrés, périmètres acceptés, périmètre du lot 3, bilan du bloc A. */
export function rapportsArbitres(root) {
  const c = couverture(root);
  const l = [R + 'perimetre.md', R + 'blocA-bilan.md', ...c.arbitrees.map((x) => R + x + '.md'), ...(c.tranchesArbitrees ?? []).map((x) => R + x + '.md')];
  for (const f of readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)\d+-perimetre\.md$/.test(f)).sort()) if (arbitre(root, 'docs/rapports/' + f)) l.push('docs/rapports/' + f);
  for (const p of l) if (!arbitre(root, p)) throw new Error(p + ' : ne porte pas son arbitrage');
  return l;
}

/** Vérifie le manifeste : chaque rapport listé garde son empreinte ; un rapport arbitré absent du manifeste est signalé. */
export function verifierEmpreintes(root) {
  if (!existsSync(join(root, MANIFESTE))) throw new Error('manifeste absent : ' + MANIFESTE);
  const m = JSON.parse(readFileSync(join(root, MANIFESTE), 'utf8'));
  const differents = Object.entries(m.empreintes).filter(([p, h]) => sha(root, p) !== h).map(([p]) => p);
  if (differents.length) throw new Error('empreinte modifiée : ' + differents.join(', '));
  const nouveaux = rapportsArbitres(root).filter((p) => !Object.hasOwn(m.empreintes, p));
  return { controles: Object.keys(m.empreintes).length, nouveaux };
}

export const TRANCHE = /^docs\/rapports\/etape2-A2-05-volet1-lot3-(T\d+)(-perimetre)?\.md$/;

/** Anomalies des entrées de tranche d'un manifeste m, par rapport aux entrées de base (déjà admises) ; brut : texte du manifeste, pour les
 *  clés en double. Un périmètre accepté peut être protégé seul tant que le rapport de sa tranche n'est pas arbitré ; un rapport arbitré exige
 *  son périmètre protégé, inscrit avant lui ou avec lui ; aucune entrée étrangère ; aucun doublon ; aucune omission ; ajouts datés en ordre. */
export function anomaliesTranches(root, m, base, brut) {
  const a = []; const cles = Object.keys(m.empreintes);
  const statut = (p) => (existsSync(join(root, p)) ? (readFileSync(join(root, p), 'utf8').match(/^\*\*Statut\*\* : \*\*(arbitré le |périmètre accepté le )/m) ?? [])[1] ?? 'autre' : 'absent');
  if (brut !== null) { const n = [...brut.matchAll(/^\s*"([^"]+)": "[0-9a-f]{64}"/gm)].length; if (n !== cles.length) a.push('clé en double dans le manifeste (' + n + ' empreintes écrites, ' + cles.length + ' clés distinctes)'); }
  const ordre = new Map(); const dates = (m.ajouts ?? []).map((x) => x.date);
  (m.ajouts ?? []).forEach((x, i) => { for (const p of x.chemins) { if (ordre.has(p)) a.push(p + ' : inscrit deux fois dans les ajouts'); else ordre.set(p, i); } });
  if (dates.some((d, i) => i && d < dates[i - 1])) a.push('ajouts : dates hors d\'ordre (' + dates.join(', ') + ')');
  for (const p of ordre.keys()) if (!Object.hasOwn(m.empreintes, p)) a.push(p + ' : inscrit dans les ajouts, absent des empreintes (omission)');
  for (const p of cles.filter((x) => !base.has(x))) {
    const t = p.match(TRANCHE); if (!t) { a.push(p + ' : entrée étrangère (ni rapport ni périmètre de tranche)'); continue; }
    if (!ordre.has(p)) a.push(p + ' : entrée nouvelle non inscrite dans les ajouts');
    const rap = R + t[1] + '.md', per = R + t[1] + '-perimetre.md';
    if (t[2]) {
      if (statut(p) !== 'périmètre accepté le ') a.push(p + ' : périmètre protégé sans le statut « périmètre accepté le » (' + statut(p) + ')');
      if (statut(rap) === 'arbitré le ' && !Object.hasOwn(m.empreintes, rap)) a.push(rap + ' : rapport arbitré hors du manifeste, alors que son périmètre y est (omission)');
    } else {
      if (statut(p) !== 'arbitré le ') a.push(p + ' : rapport protégé sans le statut « arbitré le » (' + statut(p) + ')');
      if (!Object.hasOwn(m.empreintes, per)) a.push(p + ' : rapport arbitré sans son périmètre protégé');
      else if (!base.has(per) && ordre.has(p) && ordre.has(per) && ordre.get(per) > ordre.get(p)) a.push(p + ' : rapport inscrit avant son périmètre');
    }
  }
  return a;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
  if (process.argv.includes('--ajouter')) {
    // Ajout contrôlé : seuls les rapports arbitrés absents du manifeste s'ajoutent ; les empreintes existantes, vérifiées d'abord, ne changent jamais
    const { nouveaux } = verifierEmpreintes(root); if (!nouveaux.length) throw new Error('aucun rapport arbitré à ajouter');
    const m = JSON.parse(readFileSync(join(root, MANIFESTE), 'utf8'));
    const avant = new Set(Object.keys(m.empreintes)); const sain = anomaliesTranches(root, m, avant, readFileSync(join(root, MANIFESTE), 'utf8'));
    if (sain.length) throw new Error('manifeste existant non conforme, aucun ajout : ' + sain.join(' ; '));
    for (const p of nouveaux) m.empreintes[p] = sha(root, p);
    m.ajouts = [...(m.ajouts ?? []), { date: new Date().toISOString().slice(0, 10), chemins: nouveaux }];
    const an = anomaliesTranches(root, m, avant, null); if (an.length) throw new Error('ajout refusé, rien n\'est écrit : ' + an.join(' ; '));
    writeFileSync(join(root, MANIFESTE), JSON.stringify(m, null, 1) + '\n');
    console.log('manifeste : ' + nouveaux.length + ' rapport(s) ajouté(s) : ' + nouveaux.join(', ')); process.exit(0);
  }
  if (process.argv.includes('--ecrire')) {
    if (existsSync(join(root, MANIFESTE))) throw new Error('manifeste déjà établi : il ne se réécrit pas ; une addition passe par une décision');
    const l = rapportsArbitres(root);
    const out = { genere_par: 'a2-05-travail/empreintes-lot3.mjs', etabli_le: '2026-10-18', note: 'empreintes SHA-256 des octets des rapports arbitrés ; un rapport arbitré ne se régénère pas', empreintes: Object.fromEntries(l.map((p) => [p, sha(root, p)])) };
    writeFileSync(join(root, MANIFESTE), JSON.stringify(out, null, 1) + '\n');
    console.log('manifeste établi : ' + l.length + ' rapports');
  } else {
    const v = verifierEmpreintes(root);
    console.log('empreintes : ' + v.controles + ' rapports contrôlés, identiques' + (v.nouveaux.length ? ' ; rapports arbitrés hors du manifeste : ' + v.nouveaux.join(', ') : ''));
  }
}
