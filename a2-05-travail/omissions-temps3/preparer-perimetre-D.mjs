// A2-05 · recherche d'omissions d'`interrogatif`, temps 3 : dossier factuel du périmètre du groupe D (classe grammaticale, T2-classe), EN PROPOSITION ; aucun verdict.
// Lecture seule sur les données, les sources, le journal, les lots, la mesure, le découpage accepté et le bilan. Pour chaque ENTRY : classe, fiches (lot d'origine,
// rangement, anciens exemples), sens publiés, toutes ses décisions de journal (en entier celles qui portent sur les fonctions linguistiques), corrections retenues
// non appliquées, recoupement avec les 377 du lot 3. N'écrit que deux fichiers neufs (refus d'écraser) : perimetre-D.json, dossier-D.md.
// Usage : node a2-05-travail/omissions-temps3/preparer-perimetre-D.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { charger, construirePopulation, sourceDe, FONCTION } from '../perimetre-F-operationnel/omissions.mjs';
import { couverture } from '../couverture-lot3.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', DEC = O + 'decoupage.json', DEC_SHA = '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46';
const MES = 'a2-05-travail/arbitrage-F/mesure-couverture/mesure/mesure.json', MES_SHA = '7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44';
for (const f of ['perimetre-D.json', 'dossier-D.md']) if (existsSync(join(root, O + f))) throw new Error(O + f + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

ok(sha(DEC) === DEC_SHA && sha(MES) === MES_SHA, 'découpage accepté et mesure prise en acte, à leurs empreintes');
const G = JSON.parse(txt(DEC)).groupes; const D = G.D; const M = JSON.parse(txt(MES));
ok(D.sens.length === 53 && D.entry.length === 40, 'groupe D : 53 sens, 40 ENTRY', D.sens.length + ' sens, ' + D.entry.length + ' ENTRY');
ok(D.sens.every((s) => s.filtres.includes('T2-classe') && s.filtres.every((f) => ['T2-classe', 'T2-nuls'].includes(f))), 'groupe D : chaque sens porte T2-classe ; aucun autre filtre que T2-classe et T2-nuls');
ok(D.sens.every((s) => JSON.stringify(s.filtres) === JSON.stringify(M.candidats.find((c) => c.id === s.id)?.filtres)), 'filtres d\'origine identiques à la mesure');
ok(!D.entry.some((e) => Object.entries(G).some(([g, x]) => g !== 'D' && x.entry.includes(e))), 'aucune ENTRY du groupe D dans un autre groupe');
ok(D.sens.every((s) => D.entry.includes(s.entry)) && D.entry.every((e) => D.sens.some((s) => s.entry === e)), 'chaque sens rattaché à une ENTRY du groupe, chaque ENTRY a un sens');
arret();

const Dn = charger(root); const { pop } = construirePopulation(Dn);
const parSens = new Map(pop.map((p) => [p.id, p])); const src = new Map(Dn.sources.map((s) => [s.id, s]));
const exemples = JSON.parse(txt('reconstruction/a2-04/sources/exemples.json')).vocab ?? {};
const cov = couverture(root); const lot3 = new Map(cov.sens.map((s) => [s.id, s.livraison]));
const LOTS = 'reconstruction/a2-04/lots/'; const lotDe = new Map();
for (const n of readdirSync(join(root, LOTS)).filter((n) => /^lot-[0-9]+\.json$/.test(n)).sort()) for (const [id, x] of Object.entries(JSON.parse(txt(LOTS + n)).entries)) lotDe.set(id, { lot: n.replace('.json', ''), statut: x.status, journal: x.journal ?? [] });
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md'); const corr = [];
const champ = (l) => (l.split(' | ').slice(2).find((x) => /^`[a-z_.]+`/.test(x.trim())) ?? '?').trim();
for (const l of bilan.slice(0, bilan.search(/^## 7\. /m)).split('\n')) { const r = l.match(/^\| (\d+) \| `((?:hj_)?v_\d+)_s\d+` \|/); if (r) corr.push({ id: 'volet 2, modification ' + r[1], entry: r[2], champ: champ(l) }); }
for (const l of bilan.slice(bilan.search(/^## 8\. /m)).split('\n')) { const r = l.match(/^\| (V[12]-\d+) \| (?:[a-z]+ \| )?`((?:hj_)?v_\d+)(?:_s\d+)?`/); if (r && !corr.some((c) => c.id === r[1])) corr.push({ id: r[1], entry: r[2], champ: champ(l) }); }
ok(corr.length === 204, 'corrections retenues lues dans le bilan : 204', corr.length);
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const RE_Q = /interrog|question|demand/i; const RE_FN = /linguistic_functions|fonction/i;
const entrees = [];
for (const e of D.entry) {
  const sensD = D.sens.filter((s) => s.entry === e); const p0 = parSens.get(sensD[0].id); const E = p0.e; const source = sourceDe(e); const fiches = [source, ...p0.fusionnees];
  entrees.push({
    entry: e, mot: E.word, lecture: E.readings?.[0]?.kana ?? null, classe: E.linguistic?.grammatical_class ?? null,
    fiches: fiches.map((f) => ({ id: f, presente: src.has(f), lot: lotDe.get(f)?.lot ?? null, statutLot: lotDe.get(f)?.statut ?? null, journalCite: lotDe.get(f)?.journal ?? [], categorie: src.get(f)?.category ?? null, sousCategorie: src.get(f)?.subcategory ?? null, type: src.get(f)?.type ?? null, anciensExemples: (exemples[f] ?? []).length })),
    sensPublies: E.senses.map((s) => ({ id: s.id, traduction: s.meaning.primary, categorie: cat(s.category), type: s.semantic_type, fonctions: fns(s), candidatD: sensD.some((x) => x.id === s.id), filtres: sensD.find((x) => x.id === s.id)?.filtres ?? null, lot3: lot3.get(s.id) ?? null })),
    decisions: Dn.journal.filter((d) => fiches.includes(d.entry)).map((d) => { const fn = RE_FN.test(String(d.field)) || RE_FN.test(d.reason ?? ''); return { id: d.id, statut: d.status, lot: d.lot, champ: d.field, nature: d.kind, fonctions: fn, vocabulaireQuestion: RE_Q.test([d.reason, JSON.stringify(d.before ?? ''), JSON.stringify(d.after ?? '')].join(' ')), ...(fn ? { raison: d.reason, apres: d.after ?? null } : {}) }; }),
    corrections: corr.filter((c) => c.entry === e).map((c) => c.id + ' (' + c.champ + ')'),
  });
}
ok(entrees.every((x) => x.fiches.every((f) => f.presente && f.lot && f.statutLot === 'validated')), 'D : toutes les fiches présentes, chacune dans un lot validé', entrees.reduce((n, x) => n + x.fiches.length, 0) + ' fiches');
ok(entrees.every((x) => x.decisions.length && x.decisions.every((d) => d.statut === 'validated')), 'D : chaque ENTRY a des décisions de journal, toutes validées', entrees.reduce((n, x) => n + x.decisions.length, 0) + ' décisions');
ok(entrees.every((x) => !x.decisions.some((d) => d.vocabulaireQuestion)), 'D : aucune décision n\'emploie le vocabulaire de la question (le groupe ne relève pas de T2-journal)');
ok(entrees.every((x) => ['pronom', 'determinant', 'adverbe'].includes(x.classe)), 'D : chaque ENTRY est de classe pronom, determinant ou adverbe');
ok(entrees.every((x) => x.sensPublies.every((s) => !s.fonctions.includes(FONCTION))), 'D : aucun sens de ces ENTRY ne porte la fonction');
const nonCand = entrees.flatMap((x) => x.sensPublies.filter((s) => !s.candidatD).map((s) => s.id));
ok(nonCand.every((id) => !M.candidats.some((c) => c.id === id)), 'D : sens publiés non candidats de ces ENTRY, hors des 234', nonCand.length + ' : ' + (nonCand.join(', ') || 'aucun'));
arret();

writeFileSync(join(root, O + 'perimetre-D.json'), JSON.stringify({ objet: 'Dossier factuel du groupe D, non arbitré ; aucun verdict', decoupage: { chemin: DEC, sha: DEC_SHA }, sens: D.sens, entrees }, null, 1) + '\n');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const parClasse = Object.fromEntries(['pronom', 'determinant', 'adverbe'].map((k) => [k, { entry: entrees.filter((x) => x.classe === k).length, sens: D.sens.filter((s) => entrees.find((x) => x.entry === s.entry).classe === k).length }]));
const parFn = {}; for (const s of D.sens) { const f = fns(parSens.get(s.id).s); for (const k of f.length ? f : ['aucune']) parFn[k] = (parFn[k] ?? 0) + 1; }
const md = ['# Dossier factuel du groupe D (généré ; aucun verdict)', '',
  '## Répartitions', '', '| Classe | ENTRY | Sens |', '|---|---|---|', ...Object.entries(parClasse).map(([k, v]) => '| `' + k + '` | ' + v.entry + ' | ' + v.sens + ' |'), '',
  '| Fonction publiée | Sens |', '|---|---|', ...Object.entries(parFn).sort().map(([k, v]) => '| ' + (k === 'aucune' ? 'aucune' : '`' + k + '`') + ' | ' + v + ' |'), '',
  'Sens communs au lot 3 : ' + D.sens.filter((s) => lot3.get(s.id)).length + ' sur 53. Sens portant aussi `T2-nuls` : ' + D.sens.filter((s) => s.filtres.includes('T2-nuls')).length + '.', '',
  '## Les 53 sens', '', '| N° | SENSE | ENTRY | Mot | Classe | Traduction publiée | Filtres d\'origine | Catégorie publiée | Type | Fonctions | Lot 3 |', '|---|---|---|---|---|---|---|---|---|---|---|',
  ...D.sens.map((s, i) => { const p = parSens.get(s.id); return '| ' + (i + 1) + ' | `' + s.id + '` | `' + s.entry + '` | ' + cell(p.e.word) + ' | `' + p.e.linguistic?.grammatical_class + '` | ' + cell(p.s.meaning.primary) + ' | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | `' + cat(p.s.category) + '` | `' + p.s.semantic_type + '` | ' + (fns(p.s).map((f) => '`' + f + '`').join(', ') || '—') + ' | ' + (lot3.get(s.id) ?? '—') + ' |'; }), '',
  '## Les 40 ENTRY : sources, décisions, corrections', '', '| ENTRY | Mot | Classe | Fiches sources (lot ; rangement source ; anciens exemples) | Sens publiés (candidats D en gras) | Décisions de journal (fonctions en gras) | Corrections retenues, non appliquées |', '|---|---|---|---|---|---|---|',
  ...entrees.map((x) => '| `' + x.entry + '` | ' + cell(x.mot) + ' | `' + x.classe + '` | ' + x.fiches.map((f) => '`' + f.id + '` (' + f.lot + ' ; ' + cell(f.categorie + ' / ' + f.sousCategorie) + ' ; ' + f.anciensExemples + ')').join(' ; ') + ' | ' + x.sensPublies.map((s) => (s.candidatD ? '**`' + s.id + '`**' : '`' + s.id + '`')).join(', ') + ' | ' + x.decisions.map((d) => (d.fonctions ? '**' + d.id.replace('A2-04-', '') + '**' : d.id.replace('A2-04-', ''))).join(', ') + ' | ' + (x.corrections.join(' ; ') || '—') + ' |'), '',
  '## Décisions qui portent sur les fonctions linguistiques ou en parlent, en entier', '',
  ...entrees.flatMap((x) => x.decisions.filter((d) => d.fonctions).map((d) => '- **' + d.id.replace('A2-04-', '') + '** (`' + x.entry + '` ' + x.mot + ' ; ' + cell(d.champ) + ' ; ' + d.nature + ') : « ' + cell(d.raison) + ' »')), '',
  'Sens publiés de ces ENTRY qui ne sont pas candidats : ' + (nonCand.map((i) => '`' + i + '`').join(', ') || 'aucun') + '.', ''];
writeFileSync(join(root, O + 'dossier-D.md'), md.join('\n'));
console.log('répartition par classe : ' + JSON.stringify(parClasse)); console.log('fonctions publiées : ' + JSON.stringify(parFn));
console.log('écrits : ' + O + 'perimetre-D.json, ' + O + 'dossier-D.md'); console.log('préparation conforme ; aucun verdict');
