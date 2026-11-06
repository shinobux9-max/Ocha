// A2-05 · recherche d'omissions d'`interrogatif`, temps 3 : dossier factuel du périmètre du groupe E (valeurs nulles, T2-nuls), EN PROPOSITION ; aucun verdict.
// Lecture seule sur les données, les sources, le journal, les lots, la mesure, le découpage accepté, le bilan et l'audit des `null` (volet 2). Pour chaque ENTRY :
// classe, fiches (lot d'origine, rangement, anciens exemples), sens publiés (nature du `null`, verdict arbitré du volet 2), toutes ses décisions de journal (en entier
// celles qui portent sur les fonctions linguistiques), corrections retenues non appliquées, recoupement avec les 377 du lot 3, et un simple décompte des phrases des
// sources dont la traduction a la forme d'une question (fait de surface, jamais un indice de la fonction). N'écrit que deux fichiers neufs (refus d'écraser) :
// perimetre-E.json, dossier-E.md.
// Usage : node a2-05-travail/omissions-temps3/preparer-perimetre-E.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { charger, construirePopulation, sourceDe, FONCTION } from '../perimetre-F-operationnel/omissions.mjs';
import { couverture } from '../couverture-lot3.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', DEC = O + 'decoupage.json', DEC_SHA = '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46';
const MES = 'a2-05-travail/arbitrage-F/mesure-couverture/mesure/mesure.json', MES_SHA = '7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44';
const AUD = 'docs/rapports/etape2-A2-05-audit-null.md';
for (const f of ['perimetre-E.json', 'dossier-E.md']) if (existsSync(join(root, O + f))) throw new Error(O + f + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

ok(sha(DEC) === DEC_SHA && sha(MES) === MES_SHA, 'découpage accepté et mesure prise en acte, à leurs empreintes');
const G = JSON.parse(txt(DEC)).groupes; const E = G.E; const M = JSON.parse(txt(MES));
ok(E.sens.length === 121 && E.entry.length === 107, 'groupe E : 121 sens, 107 ENTRY', E.sens.length + ' sens, ' + E.entry.length + ' ENTRY');
ok(E.sens.every((s) => JSON.stringify(s.filtres) === '["T2-nuls"]'), 'groupe E : chaque sens porte T2-nuls, et lui seul');
ok(E.sens.every((s) => JSON.stringify(s.filtres) === JSON.stringify(M.candidats.find((c) => c.id === s.id)?.filtres)), 'filtres d\'origine identiques à la mesure');
ok(!E.entry.some((e) => Object.entries(G).some(([g, x]) => g !== 'E' && x.entry.includes(e))), 'aucune ENTRY du groupe E dans un autre groupe');
ok(E.sens.every((s) => E.entry.includes(s.entry)) && E.entry.every((e) => E.sens.some((s) => s.entry === e)), 'chaque sens rattaché à une ENTRY du groupe, chaque ENTRY a un sens');
const total = Object.values(G).reduce((n, x) => n + x.sens.length, 0); ok(total === 234, 'les cinq groupes couvrent les 234 candidats', total);
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
// Verdicts arbitrés du volet 2 (audit individuel des 147 `null`) : en-têtes « #### `id` · … — **X** »
const v2 = new Map(); for (const m of txt(AUD).matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` · .* — \*\*([LFCN])\*\*/gm)) (v2.get(m[1]) ?? v2.set(m[1], []).get(m[1])).push(m[2]);
ok([...v2.values()].reduce((n, x) => n + x.length, 0) === 147, 'audit des null : 147 verdicts lus', [...v2.values()].reduce((n, x) => n + x.length, 0));
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const nul = (s) => (s.category === null && s.semantic_type === null ? 'catégorie et type' : s.category === null ? 'catégorie' : s.semantic_type === null ? 'type' : 'aucun');
const RE_Q = /interrog|question|demand/i; const RE_FN = /linguistic_functions|fonction/i;
const questions = (fids) => fids.flatMap((f) => [src.get(f)?.example, ...(exemples[f] ?? [])]).filter((x) => x && /[?？]/.test(String(x.french ?? ''))).length;
const entrees = [];
for (const e of E.entry) {
  const sensE = E.sens.filter((s) => s.entry === e); const p0 = parSens.get(sensE[0].id); const En = p0.e; const fiches = [sourceDe(e), ...p0.fusionnees];
  entrees.push({
    entry: e, mot: En.word, lecture: En.readings?.[0]?.kana ?? null, classe: En.linguistic?.grammatical_class ?? null,
    fiches: fiches.map((f) => ({ id: f, presente: src.has(f), lot: lotDe.get(f)?.lot ?? null, statutLot: lotDe.get(f)?.statut ?? null, journalCite: lotDe.get(f)?.journal ?? [], categorie: src.get(f)?.category ?? null, sousCategorie: src.get(f)?.subcategory ?? null, type: src.get(f)?.type ?? null, exemple: !!src.get(f)?.example, anciensExemples: (exemples[f] ?? []).length })),
    phrasesQuestion: questions(fiches),
    sensPublies: En.senses.map((s) => ({ id: s.id, traduction: s.meaning.primary, categorie: cat(s.category), type: s.semantic_type, nul: nul(s), fonctions: fns(s), candidatE: sensE.some((x) => x.id === s.id), filtres: sensE.find((x) => x.id === s.id)?.filtres ?? null, lot3: lot3.get(s.id) ?? null, volet2: v2.get(s.id) ?? [] })),
    decisions: Dn.journal.filter((d) => fiches.includes(d.entry)).map((d) => { const fn = RE_FN.test(String(d.field)) || RE_FN.test(d.reason ?? ''); return { id: d.id, statut: d.status, lot: d.lot, champ: d.field, nature: d.kind, fonctions: fn, vocabulaireQuestion: RE_Q.test([d.reason, JSON.stringify(d.before ?? ''), JSON.stringify(d.after ?? '')].join(' ')), ...(fn ? { raison: d.reason, apres: d.after ?? null } : {}) }; }),
    corrections: corr.filter((c) => c.entry === e).map((c) => c.id + ' (' + c.champ + ')'),
  });
}
const sensDe = (id) => entrees.flatMap((x) => x.sensPublies).find((s) => s.id === id);
ok(entrees.every((x) => x.fiches.every((f) => f.presente && f.lot && f.statutLot === 'validated')), 'E : toutes les fiches présentes, chacune dans un lot validé', entrees.reduce((n, x) => n + x.fiches.length, 0) + ' fiches');
ok(entrees.every((x) => x.decisions.length && x.decisions.every((d) => d.statut === 'validated')), 'E : chaque ENTRY a des décisions de journal, toutes validées', entrees.reduce((n, x) => n + x.decisions.length, 0) + ' décisions');
ok(entrees.every((x) => !x.decisions.some((d) => d.vocabulaireQuestion)), 'E : aucune décision n\'emploie le vocabulaire de la question (le groupe ne relève pas de T2-journal)');
ok(entrees.every((x) => !['pronom', 'determinant', 'adverbe'].includes(x.classe)), 'E : aucune ENTRY de classe pronom, determinant ou adverbe (le groupe ne relève pas de T2-classe)');
ok(entrees.every((x) => x.sensPublies.every((s) => !s.fonctions.includes(FONCTION))), 'E : aucun sens de ces ENTRY ne porte la fonction');
ok(E.sens.every((s) => { const p = sensDe(s.id); return p.nul !== 'aucun' && !p.fonctions.length; }), 'E : chaque candidat a une catégorie ou un type nul, et aucune fonction');
ok(E.sens.every((s) => sensDe(s.id).volet2.length >= 1), 'E : chaque candidat a au moins un verdict arbitré du volet 2', E.sens.filter((s) => !sensDe(s.id).volet2.length).map((s) => s.id).join(', ') || 'tous');
const nonCand = entrees.flatMap((x) => x.sensPublies.filter((s) => !s.candidatE).map((s) => s.id));
ok(nonCand.every((id) => !M.candidats.some((c) => c.id === id)), 'E : sens publiés non candidats de ces ENTRY, hors des 234', nonCand.length + ' : ' + (nonCand.join(', ') || 'aucun'));
arret();

writeFileSync(join(root, O + 'perimetre-E.json'), JSON.stringify({ objet: 'Dossier factuel du groupe E, non arbitré ; aucun verdict', decoupage: { chemin: DEC, sha: DEC_SHA }, audit: { chemin: AUD, sha: sha(AUD) }, sens: E.sens, entrees }, null, 1) + '\n');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const compte = (f) => { const r = {}; for (const s of E.sens) { const k = f(s); r[k] = (r[k] ?? 0) + 1; } return Object.fromEntries(Object.entries(r).sort()); };
const entDe = (s) => entrees.find((x) => x.entry === s.entry);
const parClasse = compte((s) => entDe(s).classe), parNul = compte((s) => sensDe(s.id).nul), parV2 = compte((s) => sensDe(s.id).volet2.join('+')), parLot = compte((s) => entDe(s).fiches[0].lot);
const parCat = compte((s) => { const p = parSens.get(s.id); return p.s.category ? p.s.category.level_1 : 'null'; });
const nFiches = entrees.reduce((n, x) => n + x.fiches.length, 0), nAE = entrees.reduce((n, x) => n + x.fiches.reduce((m, f) => m + f.anciensExemples, 0), 0);
const nDec = entrees.reduce((n, x) => n + x.decisions.length, 0), nDecFn = entrees.reduce((n, x) => n + x.decisions.filter((d) => d.fonctions).length, 0);
const nQ = entrees.reduce((n, x) => n + x.phrasesQuestion, 0), entQ = entrees.filter((x) => x.phrasesQuestion).length;
const nCorr = entrees.reduce((n, x) => n + x.corrections.length, 0), entCorr = entrees.filter((x) => x.corrections.length).length;
const fus = entrees.filter((x) => x.fiches.length > 1);
const tab = (titre, o) => ['| ' + titre + ' | Sens |', '|---|---|', ...Object.entries(o).map(([k, v]) => '| ' + (k === 'null' || k === '' ? (k || '—') : '`' + k + '`') + ' | ' + v + ' |'), ''];
const md = ['# Dossier factuel du groupe E (généré ; aucun verdict)', '',
  '## Chiffres', '',
  '- ' + E.sens.length + ' sens, ' + E.entry.length + ' ENTRY, ' + nFiches + ' fiches sources (' + fus.length + ' ENTRY à fiche fusionnée : ' + (fus.map((x) => x.mot).join(', ') || 'aucune') + ') ; ' + nAE + ' anciens exemples.',
  '- ' + nDec + ' décisions de journal, toutes validées ; ' + nDecFn + ' portent sur les fonctions linguistiques ou en parlent (citées en entier plus bas).',
  '- ' + nCorr + ' corrections retenues, non appliquées, dans ' + entCorr + ' ENTRY.',
  '- Sens communs au lot 3 : ' + E.sens.filter((s) => lot3.get(s.id)).length + ' sur ' + E.sens.length + '.',
  '- Phrases des sources (exemple de fiche et anciens exemples) dont la traduction a la forme d\'une question : ' + nQ + ', dans ' + entQ + ' ENTRY. **Fait de surface** : la présence d\'un mot dans une question ne prouve pas qu\'il porte la fonction (arbitrage du groupe D, point 3).', '',
  '## Répartitions', '', ...tab('Classe de l\'ENTRY', parClasse), ...tab('Valeur nulle', parNul), ...tab('Verdict arbitré du volet 2', parV2), ...tab('Lot d\'origine de la fiche', parLot), ...tab('Catégorie publiée (niveau 1)', parCat),
  '## Les ' + E.sens.length + ' sens', '', '| N° | SENSE | ENTRY | Mot | Classe | Traduction publiée | Catégorie publiée | Type | Valeur nulle | Volet 2 | Lot 3 |', '|---|---|---|---|---|---|---|---|---|---|---|',
  ...E.sens.map((s, i) => { const p = parSens.get(s.id), q = sensDe(s.id); return '| ' + (i + 1) + ' | `' + s.id + '` | `' + s.entry + '` | ' + cell(p.e.word) + ' | `' + p.e.linguistic?.grammatical_class + '` | ' + cell(p.s.meaning.primary) + ' | `' + cat(p.s.category) + '` | `' + p.s.semantic_type + '` | ' + q.nul + ' | ' + q.volet2.join('+') + ' | ' + (lot3.get(s.id) ?? '—') + ' |'; }), '',
  '## Les ' + E.entry.length + ' ENTRY : sources, décisions, corrections', '', '| ENTRY | Mot | Classe | Fiches sources (lot ; rangement source ; anciens exemples) | Phrases en forme de question | Sens publiés (candidats E en gras) | Décisions de journal (fonctions en gras) | Corrections retenues, non appliquées |', '|---|---|---|---|---|---|---|---|',
  ...entrees.map((x) => '| `' + x.entry + '` | ' + cell(x.mot) + ' | `' + x.classe + '` | ' + x.fiches.map((f) => '`' + f.id + '` (' + f.lot + ' ; ' + cell(f.categorie + ' / ' + f.sousCategorie) + ' ; ' + f.anciensExemples + ')').join(' ; ') + ' | ' + x.phrasesQuestion + ' | ' + x.sensPublies.map((s) => (s.candidatE ? '**`' + s.id + '`**' : '`' + s.id + '`')).join(', ') + ' | ' + x.decisions.map((d) => (d.fonctions ? '**' + d.id.replace('A2-04-', '') + '**' : d.id.replace('A2-04-', ''))).join(', ') + ' | ' + (x.corrections.join(' ; ') || '—') + ' |'), '',
  '## Décisions qui portent sur les fonctions linguistiques ou en parlent, en entier', '',
  ...(entrees.flatMap((x) => x.decisions.filter((d) => d.fonctions).map((d) => '- **' + d.id.replace('A2-04-', '') + '** (`' + x.entry + '` ' + x.mot + ' ; ' + cell(d.champ) + ' ; ' + d.nature + ') : « ' + cell(d.raison) + ' »'))), '',
  'Sens publiés de ces ENTRY qui ne sont pas candidats : ' + (nonCand.map((i) => '`' + i + '`').join(', ') || 'aucun') + '.', ''];
writeFileSync(join(root, O + 'dossier-E.md'), md.join('\n'));
for (const [k, v] of [['classe', parClasse], ['valeur nulle', parNul], ['volet 2', parV2], ['lot', parLot], ['catégorie', parCat]]) console.log('répartition par ' + k + ' : ' + JSON.stringify(v));
console.log('fiches ' + nFiches + ' ; anciens exemples ' + nAE + ' ; décisions ' + nDec + ' (fonctions ' + nDecFn + ') ; corrections ' + nCorr + ' dans ' + entCorr + ' ENTRY ; lot 3 ' + E.sens.filter((s) => lot3.get(s.id)).length + ' ; phrases en forme de question ' + nQ + ' dans ' + entQ + ' ENTRY');
console.log('écrits : ' + O + 'perimetre-E.json, ' + O + 'dossier-E.md'); console.log('préparation conforme ; aucun verdict');
