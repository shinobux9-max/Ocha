// A2-05 · bloc F · recherche d'omissions d'`interrogatif`, temps 3 : PROPOSITION de découpage des 234 candidats de la mesure en cinq groupes (A à E),
// et dossier factuel du périmètre du groupe A. Lecture seule sur les données, les sources, le journal, la mesure et le bilan ; aucun verdict lexical.
// Règle de découpage vérifiée : chaque ENTRY va, entière, dans le premier groupe (ordre A, B, C, D, E) dont au moins un de ses sens candidats porte
// un filtre : A = T1-radicaux, T1-point, T1-mots ; B = T2-journal ; C = T2-serie ; D = T2-classe ; E = T2-nuls. Les filtres d'origine sont conservés.
// N'écrit que trois fichiers neufs dans son dossier (refus d'écraser) : decoupage.json, perimetre-A.json, dossier-A.md (tableaux factuels).
// Usage : node a2-05-travail/omissions-temps3/preparer-decoupage-A.mjs <racine du dépôt>. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { charger, construirePopulation, sourceDe } from '../perimetre-F-operationnel/omissions.mjs';
import { couverture } from '../couverture-lot3.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', MES = 'a2-05-travail/arbitrage-F/mesure-couverture/mesure/mesure.json', MES_SHA = '7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44';
const SORTIES = ['decoupage.json', 'perimetre-A.json', 'dossier-A.md'];
for (const f of SORTIES) if (existsSync(join(root, O + f))) throw new Error(O + f + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) { ko++; } };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

ok(createHash('sha256').update(brut(MES)).digest('hex') === MES_SHA, 'mesure.json : empreinte de la mesure prise en acte', MES);
const M = JSON.parse(txt(MES)); arret();
ok(M.candidats.length === 234 && M.population.sens === 807 && M.population.entry === 669 && M.couverture.relus === 0, 'mesure : 807 sens, 669 ENTRY, 234 candidats, 0 relu');

// --- Découpage
const GROUPES = [['A', 'indices textuels du temps 1', (f) => f.startsWith('T1-')], ['B', 'décisions du journal (T2-journal)', (f) => f === 'T2-journal'], ['C', 'série (T2-serie)', (f) => f === 'T2-serie'], ['D', 'classe grammaticale (T2-classe)', (f) => f === 'T2-classe'], ['E', 'valeurs nulles (T2-nuls)', (f) => f === 'T2-nuls']];
const PROPOSE = { A: [39, 31], B: [18, 15], C: [3, 2], D: [53, 40], E: [121, 107] };
const parEntry = new Map(); for (const c of M.candidats) { if (!parEntry.has(c.entry)) parEntry.set(c.entry, []); parEntry.get(c.entry).push(c); }
const groupeDe = (cs) => GROUPES.find(([, , p]) => cs.some((c) => c.filtres.some(p)));
const D = Object.fromEntries(GROUPES.map(([g, t]) => [g, { theme: t, entry: [], sens: [] }]));
for (const [e, cs] of parEntry) { const [g, , p] = groupeDe(cs); D[g].entry.push(e); for (const c of cs) D[g].sens.push({ id: c.id, entry: e, rang: c.rang, filtres: c.filtres, motif: c.filtres.some(p) ? 'filtre propre au groupe' : 'rattaché par son ENTRY' }); }
const tousSens = Object.values(D).flatMap((g) => g.sens.map((s) => s.id)), tousE = Object.values(D).flatMap((g) => g.entry);
ok(tousSens.length === 234 && new Set(tousSens).size === 234, 'découpage : 234 sens, aucun doublon', tousSens.length + ' sens, ' + new Set(tousSens).size + ' distincts');
ok(tousE.length === parEntry.size && new Set(tousE).size === tousE.length, 'découpage : aucune ENTRY coupée ni dans deux groupes', parEntry.size + ' ENTRY');
ok(Object.values(D).every((g) => g.sens.every((s) => JSON.stringify(s.filtres) === JSON.stringify(M.candidats.find((c) => c.id === s.id).filtres))), 'filtres d\'origine de chaque sens conservés, à l\'identique');
for (const [g] of GROUPES) ok(D[g].sens.length === PROPOSE[g][0] && D[g].entry.length === PROPOSE[g][1], 'groupe ' + g + ' (' + D[g].theme + ') : ' + PROPOSE[g][0] + ' sens, ' + PROPOSE[g][1] + ' ENTRY, comme proposé', D[g].sens.length + ' sens, ' + D[g].entry.length + ' ENTRY ; rattachés par leur ENTRY : ' + D[g].sens.filter((s) => s.motif !== 'filtre propre au groupe').length);
arret();

// --- Dossier A
const Dn = charger(root); const { pop } = construirePopulation(Dn);
const parSens = new Map(pop.map((p) => [p.id, p])); const src = new Map(Dn.sources.map((s) => [s.id, s]));
const exemples = JSON.parse(txt('reconstruction/a2-04/sources/exemples.json')).vocab ?? {};
const cov = couverture(root); const lot3 = new Map(cov.sens.map((s) => [s.id, s.livraison]));
// Lot d'origine de chaque fiche (fichiers lot-NN.json seulement) et décisions qu'il cite
const LOTS = 'reconstruction/a2-04/lots/'; const lotDe = new Map();
for (const n of readdirSync(join(root, LOTS)).filter((n) => /^lot-[0-9]+\.json$/.test(n)).sort()) for (const [id, x] of Object.entries(JSON.parse(txt(LOTS + n)).entries)) lotDe.set(id, { lot: n.replace('.json', ''), statut: x.status, journal: x.journal ?? [] });
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md'); const corr = [];
// Mêmes motifs que calculerEtat (sync-stable.mjs) : lignes du tableau du volet 2 avant le §7, lignes V1/V2 du §8 (première occurrence) ; champ : première cellule en `code` après l'identifiant de sens
const champ = (l) => (l.split(' | ').slice(2).find((x) => /^`[a-z_.]+`/.test(x.trim())) ?? '?').trim();
for (const l of bilan.slice(0, bilan.search(/^## 7\. /m)).split('\n')) { const r = l.match(/^\| (\d+) \| `((?:hj_)?v_\d+)_s\d+` \|/); if (r) corr.push({ id: 'volet 2, modification ' + r[1], entry: r[2], champ: champ(l) }); }
for (const l of bilan.slice(bilan.search(/^## 8\. /m)).split('\n')) { const r = l.match(/^\| (V[12]-\d+) \| (?:[a-z]+ \| )?`((?:hj_)?v_\d+)(?:_s\d+)?`/); if (r && !corr.some((c) => c.id === r[1])) corr.push({ id: r[1], entry: r[2], champ: champ(l) }); }
ok(corr.length === 204, 'corrections retenues lues dans le bilan : 204 (10 du volet 2, 194 du §8), aucune appliquée', corr.length);
const RE_Q = /interrog|question|demand/i; const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const A = D.A; const entrees = [];
for (const e of A.entry) {
  const sensA = A.sens.filter((s) => s.entry === e); const p0 = parSens.get(sensA[0].id); const E = p0.e; const source = sourceDe(e); const fiches = [source, ...p0.fusionnees];
  const dec = Dn.journal.filter((d) => fiches.includes(d.entry));
  entrees.push({
    entry: e, mot: E.word, classe: E.linguistic?.grammatical_class ?? null, fiches: fiches.map((f) => ({ id: f, presente: src.has(f), lot: lotDe.get(f)?.lot ?? null, statutLot: lotDe.get(f)?.statut ?? null, journalCite: lotDe.get(f)?.journal ?? [], categorie: src.get(f)?.category ?? null, sousCategorie: src.get(f)?.subcategory ?? null, type: src.get(f)?.type ?? null, anciensExemples: (exemples[f] ?? []).length })),
    sensPublies: E.senses.map((s) => ({ id: s.id, traduction: s.meaning.primary, categorie: cat(s.category), type: s.semantic_type, fonctions: fns(s), candidatA: sensA.some((x) => x.id === s.id), lot3: lot3.get(s.id) ?? null })),
    decisions: dec.map((d) => ({ id: d.id, statut: d.status, champ: d.field, nature: d.kind, vocabulaireQuestion: RE_Q.test([d.reason, JSON.stringify(d.before ?? ''), JSON.stringify(d.after ?? '')].join(' ')) })),
    corrections: corr.filter((c) => c.entry === e).map((c) => c.id + ' (' + c.champ + ')'),
  });
}
ok(entrees.every((x) => x.fiches.every((f) => f.presente)), 'A : toutes les fiches sources présentes (fiches fusionnées comprises)', entrees.reduce((n, x) => n + x.fiches.length, 0) + ' fiches');
ok(entrees.every((x) => x.fiches.every((f) => f.lot && f.statutLot === 'validated')), 'A : chaque fiche a son lot d\'origine, validé', [...new Set(entrees.flatMap((x) => x.fiches.map((f) => f.lot)))].sort().join(', '));
ok(entrees.every((x) => x.fiches.every((f) => f.journalCite.every((id) => x.decisions.some((d) => d.id === id)))), 'A : les décisions citées par les lots sont toutes parmi celles du journal relevées pour l\'ENTRY');
ok(entrees.every((x) => x.decisions.every((d) => d.statut === 'validated')),'A : toutes les décisions de journal des ENTRY sont validées', entrees.reduce((n, x) => n + x.decisions.length, 0) + ' décisions');
const nonCand = entrees.flatMap((x) => x.sensPublies.filter((s) => !s.candidatA).map((s) => s.id));
ok(nonCand.every((id) => parSens.has(id) && !M.candidats.some((c) => c.id === id)), 'A : sens publiés non candidats des ENTRY du groupe : hors des 234, non relevés', nonCand.length + ' sens : ' + nonCand.join(', '));
const dans377 = A.sens.filter((s) => lot3.has(s.id));
console.log('info    A : sens candidats parmi les 377 du lot 3 (verdicts arbitrés, non rouverts) : ' + (dans377.map((s) => s.id + ' (' + lot3.get(s.id) + ')').join(', ') || 'aucun'));
console.log('info    A : ENTRY touchées par une correction retenue non appliquée : ' + (entrees.filter((x) => x.corrections.length).map((x) => x.entry + ' ' + x.corrections.join(', ')).join(' ; ') || 'aucune'));
arret();

// --- Écritures
const decoupage = { objet: 'Proposition de découpage du temps 3 (recherche d\'omissions d\'`interrogatif`), non arbitrée', mesure: { chemin: MES, sha: MES_SHA }, regle: 'chaque ENTRY va, entière, dans le premier groupe (A, B, C, D, E) dont un de ses sens candidats porte un filtre du groupe ; tous les filtres d\'origine sont conservés', groupes: D };
writeFileSync(join(root, O + 'decoupage.json'), JSON.stringify(decoupage, null, 1) + '\n');
writeFileSync(join(root, O + 'perimetre-A.json'), JSON.stringify({ objet: 'Dossier factuel du groupe A, non arbitré ; aucun verdict', sens: A.sens, entrees }, null, 1) + '\n');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const md = ['# Dossier factuel du groupe A (généré ; aucun verdict)', '',
  '## Découpage des 234 candidats', '', '| Groupe | Thème | Sens | ENTRY | Sens rattachés par leur ENTRY |', '|---|---|---|---|---|',
  ...GROUPES.map(([g]) => '| ' + g + ' | ' + D[g].theme + ' | ' + D[g].sens.length + ' | ' + D[g].entry.length + ' | ' + D[g].sens.filter((s) => s.motif !== 'filtre propre au groupe').length + ' |'), '| **Total** | | **234** | **' + parEntry.size + '** | |', '',
  'Sens rattachés par leur ENTRY : ' + Object.entries(D).flatMap(([g, x]) => x.sens.filter((s) => s.motif !== 'filtre propre au groupe').map((s) => '`' + s.id + '` (' + g + ' ; ' + s.filtres.join(', ') + ')')).join(' ; ') + '.', '',
  '## Groupe A : les 39 sens', '', '| N° | SENSE | ENTRY | Mot | Traduction publiée | Filtres d\'origine | Entrée dans A | Catégorie publiée | Type | Fonctions | Lot 3 |', '|---|---|---|---|---|---|---|---|---|---|---|',
  ...A.sens.map((s, i) => { const p = parSens.get(s.id); return '| ' + (i + 1) + ' | `' + s.id + '` | `' + s.entry + '` | ' + cell(p.e.word) + ' | ' + cell(p.s.meaning.primary) + ' | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | ' + s.motif + ' | `' + cat(p.s.category) + '` | `' + p.s.semantic_type + '` | ' + (fns(p.s).map((f) => '`' + f + '`').join(', ') || '—') + ' | ' + (lot3.get(s.id) ?? '—') + ' |'; }), '',
  '## Groupe A : les 31 ENTRY, sources et décisions', '', '| ENTRY | Mot | Classe | Fiches sources (lot d\'origine ; catégorie source ; anciens exemples) | Sens publiés (candidats A en gras) | Décisions de journal (vocabulaire de la question en gras) | Corrections retenues, non appliquées |', '|---|---|---|---|---|---|---|',
  ...entrees.map((x) => '| `' + x.entry + '` | ' + cell(x.mot) + ' | `' + x.classe + '` | ' + x.fiches.map((f) => '`' + f.id + '` (' + f.lot + ' ; ' + cell(f.categorie + ' / ' + f.sousCategorie) + ' ; ' + f.anciensExemples + ')').join(' ; ') + ' | ' + x.sensPublies.map((s) => (s.candidatA ? '**`' + s.id + '`**' : '`' + s.id + '`')).join(', ') + ' | ' + (x.decisions.map((d) => (d.vocabulaireQuestion ? '**' + d.id.replace('A2-04-', '') + '**' : d.id.replace('A2-04-', ''))).join(', ') || '—') + ' | ' + (x.corrections.join(' ; ') || '—') + ' |'), '',
  'Sens publiés de ces ENTRY qui ne sont pas candidats (' + nonCand.length + ') : ' + (nonCand.map((i) => '`' + i + '`').join(', ') || 'aucun') + '.', '',
  'Candidats du groupe A parmi les 377 du lot 3 : ' + (dans377.map((s) => '`' + s.id + '` (' + lot3.get(s.id) + ')').join(', ') || 'aucun') + '.', ''];
writeFileSync(join(root, O + 'dossier-A.md'), md.join('\n'));
console.log('écrits : ' + SORTIES.map((f) => O + f).join(', '));
console.log('préparation conforme ; aucun verdict');
