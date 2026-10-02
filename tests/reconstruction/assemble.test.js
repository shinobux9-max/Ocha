// Assembleur et décisions de lot (A2-04 · 5.0)

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assemble, validateAssembly, remapReferences } from '../../tools/reconstruction/assemble.mjs';
import { SOURCES, DEPS, fieldsFor, validated, lot, journalEntry, sense } from './helpers.mjs';

const run = (lots, journal = [], mode = 'partial') => assemble({ sources: SOURCES, lots, journal, mode });
const codes = (a) => a.problems.map((p) => p.code);
const ids = (a) => a.files.flatMap((f) => f.entries).map((e) => e.id);

// ── Le verrou : proposer n'est pas décider ──

test('VERROU : une proposition non validée ne produit aucune ENTRY', () => {
  const proposed = run([lot({ n5_v_188: { status: 'proposed', fields: fieldsFor('n5_v_188') } })]);
  assert.deepEqual(ids(proposed), []);
  assert.deepEqual(proposed.excluded.find((x) => x.entry === 'n5_v_188'), { entry: 'n5_v_188', reason: 'proposition non validée' });
  const decided = run([lot({ n5_v_188: validated(fieldsFor('n5_v_188')) })]);
  assert.deepEqual(ids(decided), ['v_188']);
});

test('une ENTRY validée sort complète et passe le validateur lexical', () => {
  const a = run([lot({ n5_v_188: validated(fieldsFor('n5_v_188')), hj_v_1: validated(fieldsFor('hj_v_1', { tags: ['lieu_konbini'] })) })]);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(ids(a), ['v_188', 'v_718']);
  const e = a.files[0].entries[0];
  assert.deepEqual(Object.keys(e), ['id', 'level', 'word', 'writings', 'readings', 'linguistic', 'nuance', 'tags', 'retired_sense_ids', 'senses']);
  assert.equal(e.senses[0].id, 'v_188_s1');
  assert.deepEqual(validateAssembly(a, DEPS).errors, []);
});

// Un tag de lieu candidat (ancienne catégorie) n'entre jamais seul dans la sortie : seule la
// décision humaine compte, même quand elle écarte le candidat.
test('tags de lieu : candidats proposés, jamais ajoutés sans décision', async () => {
  const { PREFILLS } = await import('./helpers.mjs');
  const withCandidate = [...PREFILLS.values()].find((p) => p.level === 'N5' && p.tagCandidates.length > 0
    && Object.keys(p.exceptions).length === 0);
  assert.ok(withCandidate, 'une entrée N5 sans exception a un candidat');
  const a = run([lot({ [withCandidate.oldId]: validated(fieldsFor(withCandidate.oldId, { tags: [] })), hj_v_1: validated(fieldsFor('hj_v_1', { tags: [] })) })]);
  assert.deepEqual(a.problems, []);
  for (const e of a.files.flatMap((f) => f.entries)) assert.deepEqual(e.tags, [], e.id);
});

// ── La frontière ──

test('frontière : un champ humain manquant, un champ mécanique décidé, un champ en exception oublié', () => {
  const { senses, ...missing } = fieldsFor('n5_v_188');
  let a = run([lot({ n5_v_188: validated(missing) })]);
  assert.ok(codes(a).includes('decision-incomplete'));
  assert.deepEqual(ids(a), [], 'décision en erreur : entrée écartée');
  a = run([lot({ n5_v_188: validated(fieldsFor('n5_v_188', { grammatical_class: 'nom' })) })]);
  assert.ok(codes(a).includes('decision-hors-frontiere'), 'classe mécanique pour 高い');
  const { readings, ...noReadings } = fieldsFor('n5_v_401');
  a = run([lot({ n5_v_401: validated(noReadings) })]);
  assert.ok(codes(a).includes('decision-incomplete'), '何 : lectures en exception, à décider');
});

test('frontière : groupe compatible avec la classe ; identifiants et particules d\'un sens unique mécaniques', () => {
  let a = run([lot({ n5_v_410: validated(fieldsFor('n5_v_410', { grammatical_class: 'determinant', group: 'nom' })) })]);
  assert.ok(codes(a).includes('decision-groupe'), 'déterminant : aucun groupe');
  a = run([lot({ n5_v_410: validated(fieldsFor('n5_v_410', { grammatical_class: 'nom', group: 'nom' })) })]);
  assert.ok(!codes(a).includes('decision-groupe'));
  a = run([lot({ n5_v_188: validated(fieldsFor('n5_v_188', { senses: [{ ...sense(), id: 'v_188_s1' }] })) })]);
  assert.ok(codes(a).includes('decision-hors-frontiere'), 'identifiant de sens');
  a = run([lot({ n5_v_175: validated(fieldsFor('n5_v_175', { senses: [sense({ particles: ['を'] })] })) })]);
  assert.ok(codes(a).includes('decision-hors-frontiere'), 'particules d\'un sens unique');
  a = run([lot({ n5_v_175: validated(fieldsFor('n5_v_175')) })]);
  assert.deepEqual(a.files[0].entries[0].senses[0].particles, ['を', 'に'], 'reprises des sources');
  a = run([lot({ n5_v_175: validated(fieldsFor('n5_v_175', { senses: [sense({ particles: ['を'] }), sense({ particles: ['に'] })] })) })]);
  assert.deepEqual(a.problems, [], 'plusieurs sens : particules décidées');
});

// ── Fusions et retraits ──

test('fusion : journal requis, plus petit numéro survivant, conséquences mécaniques', () => {
  const j = [journalEntry('A2-04-D0001', 'fusion', 'n5_v_472')];
  let a = run([lot({ n5_v_424: validated(fieldsFor('n5_v_424')), n5_v_472: { status: 'validated', journal: ['A2-04-D0001'], retire: { merged_into: 'n5_v_424' } } })], j);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(a.retired, [{ id: 'v_717', merged_into: null }, { id: 'v_472', merged_into: 'v_424' }]);
  assert.equal(a.idMap.n5_v_472, 'v_424');
  assert.deepEqual(validateAssembly(a, DEPS).errors, []);
  a = run([lot({ n5_v_424: validated(fieldsFor('n5_v_424')), n5_v_472: { status: 'validated', retire: { merged_into: 'n5_v_424' } } })]);
  assert.ok(codes(a).includes('journal-requis'));
  a = run([lot({ n5_v_472: validated(fieldsFor('n5_v_472')), n5_v_424: { status: 'validated', journal: ['A2-04-D0001'], retire: { merged_into: 'n5_v_472' } } })], j);
  assert.ok(codes(a).includes('fusion-invalide'), 'v_472 ne peut pas absorber v_424 sans exception');
  const jx = [...j, journalEntry('A2-04-D0002', 'exception-fusion', 'n5_v_424')];
  a = run([lot({ n5_v_472: validated(fieldsFor('n5_v_472')), n5_v_424: { status: 'validated', journal: ['A2-04-D0001', 'A2-04-D0002'], retire: { merged_into: 'n5_v_472' } } })], jx);
  assert.deepEqual(a.problems, [], 'exception justifiée au journal');
});

test('fusion en attente tant que le survivant n\'est pas assemblé', () => {
  const j = [journalEntry('A2-04-D0001', 'fusion', 'n5_v_472')];
  const a = run([lot({ n5_v_472: { status: 'validated', journal: ['A2-04-D0001'], retire: { merged_into: 'n5_v_424' } } })], j);
  assert.deepEqual(a.retired, [{ id: 'v_717', merged_into: null }]);
  assert.ok(a.pending.some((p) => p.entry === 'n5_v_472'));
});

// ── Journal ──

test('journal : identifiants stables, natures connues, citations existantes', () => {
  const bad = [journalEntry('D1', 'fusion'), journalEntry('A2-04-D0001', 'humeur'), journalEntry('A2-04-D0002', 'fusion'), journalEntry('A2-04-D0002', 'fusion')];
  const a = run([lot({ n5_v_188: validated(fieldsFor('n5_v_188'), ['A2-04-D0099']) })], bad);
  assert.equal(codes(a).filter((c) => c === 'journal-format').length, 3);
  assert.ok(codes(a).includes('journal-inconnu'));
  const { reason, ...noReason } = journalEntry('A2-04-D0003', 'decision');
  assert.ok(codes(run([], [noReason])).includes('journal-format'));
});

test('une entrée décidée dans deux lots est refusée', () => {
  const a = run([lot({ n5_v_188: validated(fieldsFor('n5_v_188')) }), { ...lot({ n5_v_188: validated(fieldsFor('n5_v_188')) }), lot: 'lot-autre' }]);
  assert.ok(codes(a).includes('decision-double'));
});

// ── Ajouts : identifiant calculé, jamais une constante ──

test('ajout : max(identifiants actifs ∪ retirés) + 1, au moment de l\'assemblage', () => {
  const j = [journalEntry('A2-04-D0001', 'ajout')];
  const addition = { key: 'en', status: 'validated', journal: ['A2-04-D0001'], level: 'N5',
    fields: { ...fieldsFor('n5_v_188'), word: '円', readings: [{ kana: 'えん', romaji: 'en', furigana: '<ruby>円<rt>えん</rt></ruby>', default: true, note: null }],
      grammatical_class: 'nom', group: 'nom' } };
  let a = run([lot({}, { additions: [addition] })], j);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(ids(a), ['v_720']);
  // Sans les mots hors JLPT, le maximum vient du retrait réservé v_717.
  a = assemble({ sources: { ...SOURCES, hj: [] }, lots: [lot({}, { additions: [addition] })], journal: j });
  assert.deepEqual(a.files.flatMap((f) => f.entries).map((e) => e.id), ['v_718']);
  a = run([lot({}, { additions: [{ ...addition, journal: [] }] })], j);
  assert.ok(codes(a).includes('journal-requis'), 'un ajout cite une décision « ajout »');
  a = run([lot({}, { additions: [{ ...addition, status: 'proposed' }] })], j);
  assert.deepEqual(ids(a), [], 'ajout proposé : rien');
});

// ── Modes partiel et complet ──

test('partiel : relation vers une entrée non assemblée en attente ; vers un sens inexistant, erreur', () => {
  const rel = (type, target) => validated(fieldsFor('n5_v_188', { senses: [sense({ relations: [{ type, target }] })] }));
  let a = run([lot({ n5_v_188: rel('opposed_to', 'v_183_s1') })]);
  let r = validateAssembly(a, DEPS);
  assert.deepEqual(r.errors, []);
  assert.ok(r.pending.some((p) => p.reason.includes('v_183_s1')));
  a = run([lot({ n5_v_188: rel('opposé à', 'v_183_s1') })]);
  assert.ok(validateAssembly(a, DEPS).errors.some((e) => e.code === 'relation-inconnue'), 'forme locale vérifiée');
  a = run([lot({ n5_v_188: rel('opposed_to', 'v_183_s1'), n5_v_183: validated(fieldsFor('n5_v_183')) })]);
  assert.deepEqual(validateAssembly(a, DEPS).errors, [], 'cible assemblée');
  a = run([lot({ n5_v_188: rel('opposed_to', 'v_183_s9'), n5_v_183: validated(fieldsFor('n5_v_183')) })]);
  assert.ok(validateAssembly(a, DEPS).errors.some((e) => e.code === 'relation-cible'), 'sens inexistant d\'une entrée assemblée');
});

test('complet : chaque entrée source doit être décidée', () => {
  const a = run([lot({ n5_v_188: validated(fieldsFor('n5_v_188')) })], [], 'complete');
  assert.equal(codes(a).filter((c) => c === 'assemblage-incomplet').length, 717);
});

test('remappage des références : gardées, fusionnées, supprimées', () => {
  const { references, unknown } = remapReferences(
    [{ where: 'a', vocab: 'n5_v_188' }, { where: 'b', vocab: 'n5_v_472' }, { where: 'c', vocab: 'n5_v_9' }, { where: 'd', vocab: 'n5_v_5' }],
    { n5_v_188: 'v_188', n5_v_472: 'v_424', n5_v_9: null });
  assert.deepEqual(references, [{ where: 'a', vocab: 'v_188' }, { where: 'b', vocab: 'v_424' }]);
  assert.deepEqual(unknown.map((r) => r.where), ['c', 'd']);
});

// ── 5.1b : statut du journal, forme usuelle après fusion, category null justifiée ──

test('journal : statut obligatoire ; une décision validée ne cite que du journal validé', () => {
  const proposedJ = [journalEntry('A2-04-D0001', 'fusion', 'n5_v_472', { status: 'proposed' })];
  const ret = (status) => lot({ n5_v_424: validated(fieldsFor('n5_v_424')), n5_v_472: { status, journal: ['A2-04-D0001'], retire: { merged_into: 'n5_v_424' } } });
  assert.ok(codes(run([ret('validated')], proposedJ)).includes('journal-non-valide'));
  assert.ok(!codes(run([ret('proposed')], proposedJ)).includes('journal-non-valide'), 'une proposition peut citer une proposition');
  const { status, ...noStatus } = journalEntry('A2-04-D0002', 'decision');
  assert.ok(codes(run([], [noStatus])).includes('journal-format'));
  assert.ok(codes(run([], [journalEntry('A2-04-D0003', 'decision', 'n5_v_1', { status: 'vu' })])).includes('journal-format'));
});

test('forme usuelle : décidable pour le survivant d\'une fusion seulement, avec ses lectures', () => {
  const j = [journalEntry('A2-04-D0001', 'fusion', 'n5_v_227')];
  const kaban = { word: 'かばん', readings: [{ kana: 'かばん', romaji: 'kaban', furigana: 'かばん', default: true, note: null }],
    writings: [{ form: '鞄', furigana: '<ruby>鞄<rt>かばん</rt></ruby>' }] };
  const fused = (extra) => lot({ n5_v_64: validated(fieldsFor('n5_v_64', extra)), n5_v_227: { status: 'validated', journal: ['A2-04-D0001'], retire: { merged_into: 'n5_v_64' } } });
  let a = run([fused(kaban)], j);
  assert.deepEqual(a.problems, []);
  assert.equal(a.files[0].entries.find((e) => e.id === 'v_64').word, 'かばん', 'identifiant v_64, forme かばん');
  assert.deepEqual(validateAssembly(a, DEPS).errors, []);
  const { readings, ...wordOnly } = kaban;
  assert.ok(codes(run([fused(wordOnly)], j)).includes('decision-incomplete'), 'forme sans lectures');
  a = run([lot({ n5_v_188: validated(fieldsFor('n5_v_188', { word: 'たかい', readings: kaban.readings })) })]);
  assert.ok(codes(a).includes('decision-hors-frontiere'), 'pas de fusion : forme mécanique');
});

test('category null pour un sens lexical : décision « categorie-nulle » du journal exigée, sur ce sens', () => {
  const nullSense = (extra = {}) => validated(fieldsFor('n5_v_188', { senses: [sense({ category: null, ...extra })] }), ['A2-04-D0001']);
  const jOk = [journalEntry('A2-04-D0001', 'categorie-nulle', 'n5_v_188', { field: 'sens 1 · category' })];
  assert.deepEqual(run([lot({ n5_v_188: nullSense() })], jOk).problems, []);
  assert.ok(codes(run([lot({ n5_v_188: nullSense() })], [journalEntry('A2-04-D0001', 'decision', 'n5_v_188')])).includes('categorie-nulle-injustifiee'));
  const jWrongSense = [journalEntry('A2-04-D0001', 'categorie-nulle', 'n5_v_188', { field: 'sens 2 · category' })];
  assert.ok(codes(run([lot({ n5_v_188: nullSense() })], jWrongSense)).includes('categorie-nulle-injustifiee'), 'sur ce sens précisément');
  const fn = { linguistic_functions: { grammatical: ['interrogatif'], pragmatic_discourse: [] }, semantic_type: null };
  assert.deepEqual(run([lot({ n5_v_188: validated(fieldsFor('n5_v_188', { senses: [sense({ category: null, ...fn })] })) })]).problems, [], 'une fonction suffit');
});

test('大変 : classe et groupe décidables (exception de classe)', () => {
  const a = run([lot({ n5_v_495: validated(fieldsFor('n5_v_495', { grammatical_class: 'adjectif_na', group: 'na' })) })]);
  assert.deepEqual(a.problems, []);
  assert.equal(a.files[0].entries[0].linguistic.grammatical_class, 'adjectif_na');
});
