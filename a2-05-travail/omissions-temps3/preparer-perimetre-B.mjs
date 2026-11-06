// A2-05 · recherche d'omissions d'`interrogatif`, temps 3 : dossier factuel du périmètre du groupe B (décisions du journal, T2-journal), EN PROPOSITION ; aucun verdict.
// Lecture seule sur les données, les sources, le journal, les lots, la mesure, le découpage accepté et le bilan. Pour chaque ENTRY : fiches (lot d'origine, rangement,
// anciens exemples), sens publiés, toutes ses décisions de journal, et, en entier, celles qui emploient le vocabulaire de la question (motif du filtre T2-journal) ;
// corrections retenues non appliquées ; recoupement avec les 377 du lot 3. N'écrit que deux fichiers neufs (refus d'écraser) : perimetre-B.json, dossier-B.md.
// Usage : node a2-05-travail/omissions-temps3/preparer-perimetre-B.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { charger, construirePopulation, sourceDe } from '../perimetre-F-operationnel/omissions.mjs';
import { couverture } from '../couverture-lot3.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', DEC = O + 'decoupage.json', DEC_SHA = '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46';
const MES = 'a2-05-travail/arbitrage-F/mesure-couverture/mesure/mesure.json', MES_SHA = '7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44';
for (const f of ['perimetre-B.json', 'dossier-B.md']) if (existsSync(join(root, O + f))) throw new Error(O + f + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

ok(sha(DEC) === DEC_SHA && sha(MES) === MES_SHA, 'découpage accepté et mesure prise en acte, à leurs empreintes');
const G = JSON.parse(txt(DEC)).groupes; const B = G.B; const M = JSON.parse(txt(MES));
ok(B.sens.length === 18 && B.entry.length === 15, 'groupe B : 18 sens, 15 ENTRY', B.sens.length + ' sens, ' + B.entry.length + ' ENTRY');
ok(B.sens.every((s) => s.filtres.includes('T2-journal') && !s.filtres.some((f) => f.startsWith('T1-'))), 'groupe B : chaque sens porte T2-journal, aucun ne porte un filtre du temps 1');
ok(B.sens.every((s) => JSON.stringify(s.filtres) === JSON.stringify(M.candidats.find((c) => c.id === s.id)?.filtres)), 'filtres d\'origine identiques à la mesure');
ok(!B.entry.some((e) => Object.entries(G).some(([g, x]) => g !== 'B' && x.entry.includes(e))), 'aucune ENTRY du groupe B dans un autre groupe');
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
const RE_Q = /interrog|question|demand/i; const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const entrees = [];
for (const e of B.entry) {
  const sensB = B.sens.filter((s) => s.entry === e); const p0 = parSens.get(sensB[0].id); const E = p0.e; const source = sourceDe(e); const fiches = [source, ...p0.fusionnees];
  const dec = Dn.journal.filter((d) => fiches.includes(d.entry));
  entrees.push({
    entry: e, mot: E.word, lecture: E.readings?.[0]?.kana ?? null, classe: E.linguistic?.grammatical_class ?? null,
    fiches: fiches.map((f) => ({ id: f, presente: src.has(f), lot: lotDe.get(f)?.lot ?? null, statutLot: lotDe.get(f)?.statut ?? null, journalCite: lotDe.get(f)?.journal ?? [], categorie: src.get(f)?.category ?? null, sousCategorie: src.get(f)?.subcategory ?? null, type: src.get(f)?.type ?? null, anciensExemples: (exemples[f] ?? []).length })),
    sensPublies: E.senses.map((s) => ({ id: s.id, traduction: s.meaning.primary, categorie: cat(s.category), type: s.semantic_type, fonctions: fns(s), candidatB: sensB.some((x) => x.id === s.id), lot3: lot3.get(s.id) ?? null })),
    decisions: dec.map((d) => { const q = RE_Q.test([d.reason, JSON.stringify(d.before ?? ''), JSON.stringify(d.after ?? '')].join(' ')); return { id: d.id, statut: d.status, champ: d.field, nature: d.kind, vocabulaireQuestion: q, ...(q ? { raison: d.reason, avant: d.before ?? null, apres: d.after ?? null } : {}) }; }),
    corrections: corr.filter((c) => c.entry === e).map((c) => c.id + ' (' + c.champ + ')'),
  });
}
ok(entrees.every((x) => x.fiches.every((f) => f.presente && f.lot && f.statutLot === 'validated')), 'B : toutes les fiches présentes, chacune dans un lot validé', entrees.reduce((n, x) => n + x.fiches.length, 0) + ' fiches');
ok(entrees.every((x) => x.decisions.length && x.decisions.every((d) => d.statut === 'validated')), 'B : chaque ENTRY a des décisions de journal, toutes validées', entrees.reduce((n, x) => n + x.decisions.length, 0) + ' décisions');
ok(entrees.every((x) => x.decisions.some((d) => d.vocabulaireQuestion)), 'B : chaque ENTRY a au moins une décision qui emploie le vocabulaire de la question (motif de T2-journal)', entrees.reduce((n, x) => n + x.decisions.filter((d) => d.vocabulaireQuestion).length, 0) + ' décisions');
const nonCand = entrees.flatMap((x) => x.sensPublies.filter((s) => !s.candidatB).map((s) => s.id));
ok(nonCand.every((id) => !M.candidats.some((c) => c.id === id)), 'B : sens publiés non candidats de ces ENTRY, hors des 234', nonCand.length + ' : ' + (nonCand.join(', ') || 'aucun'));
arret();

writeFileSync(join(root, O + 'perimetre-B.json'), JSON.stringify({ objet: 'Dossier factuel du groupe B, non arbitré ; aucun verdict', decoupage: { chemin: DEC, sha: DEC_SHA }, sens: B.sens, entrees }, null, 1) + '\n');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const md = ['# Dossier factuel du groupe B (généré ; aucun verdict)', '',
  '## Les 18 sens', '', '| N° | SENSE | ENTRY | Mot | Traduction publiée | Filtres d\'origine | Catégorie publiée | Type | Fonctions | Lot 3 |', '|---|---|---|---|---|---|---|---|---|---|',
  ...B.sens.map((s, i) => { const p = parSens.get(s.id); return '| ' + (i + 1) + ' | `' + s.id + '` | `' + s.entry + '` | ' + cell(p.e.word) + ' | ' + cell(p.s.meaning.primary) + ' | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | `' + cat(p.s.category) + '` | `' + p.s.semantic_type + '` | ' + (fns(p.s).map((f) => '`' + f + '`').join(', ') || '—') + ' | ' + (lot3.get(s.id) ?? '—') + ' |'; }), '',
  '## Les 15 ENTRY : sources, décisions, corrections', '', '| ENTRY | Mot | Classe | Fiches sources (lot ; rangement source ; anciens exemples) | Sens publiés (candidats B en gras) | Décisions de journal (vocabulaire de la question en gras) | Corrections retenues, non appliquées |', '|---|---|---|---|---|---|---|',
  ...entrees.map((x) => '| `' + x.entry + '` | ' + cell(x.mot) + ' | `' + x.classe + '` | ' + x.fiches.map((f) => '`' + f.id + '` (' + f.lot + ' ; ' + cell(f.categorie + ' / ' + f.sousCategorie) + ' ; ' + f.anciensExemples + ')').join(' ; ') + ' | ' + x.sensPublies.map((s) => (s.candidatB ? '**`' + s.id + '`**' : '`' + s.id + '`')).join(', ') + ' | ' + x.decisions.map((d) => (d.vocabulaireQuestion ? '**' + d.id.replace('A2-04-', '') + '**' : d.id.replace('A2-04-', ''))).join(', ') + ' | ' + (x.corrections.join(' ; ') || '—') + ' |'), '',
  '## Décisions qui emploient le vocabulaire de la question, en entier (motif du filtre T2-journal)', '',
  ...entrees.flatMap((x) => x.decisions.filter((d) => d.vocabulaireQuestion).map((d) => '- **' + d.id.replace('A2-04-', '') + '** (`' + x.entry + '` ' + x.mot + ' ; ' + d.champ + ' ; ' + d.nature + ') : « ' + cell(d.raison) + ' »')), '',
  'Sens publiés de ces ENTRY qui ne sont pas candidats : ' + (nonCand.map((i) => '`' + i + '`').join(', ') || 'aucun') + '.', ''];
writeFileSync(join(root, O + 'dossier-B.md'), md.join('\n'));
console.log('écrits : ' + O + 'perimetre-B.json, ' + O + 'dossier-B.md'); console.log('préparation conforme ; aucun verdict');
