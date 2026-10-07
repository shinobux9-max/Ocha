// Tests de tools/lexicon-adapter.mjs (A2-03 · 4.5)
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readLexiconDependencies, extractReferences, readActivities } from '../../tools/lexicon-adapter.mjs';
import { validateLexicon, REGISTRY_FILES } from '../../tools/lexicon/index.mjs';
import { DATA_DIR } from '../helpers/content-data.mjs';
import { minimalLexicon } from './fixtures/minimal-lexicon.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (rel) => JSON.parse(readFileSync(join(DATA_DIR, rel), 'utf8'));

test('dépendances : registres, kanji connus (catalogues et dictionnaire), particules, expressions', () => {
  const deps = readLexiconDependencies(DATA_DIR);
  assert.deepEqual(Object.keys(deps).sort(), ['expressions', 'knownKanji', 'particles', 'registries']);
  assert.deepEqual(Object.keys(deps.registries).sort(), [...REGISTRY_FILES].sort());
  const known = new Set(deps.knownKanji);
  for (const c of read('n5/kanji.json').chars) assert.ok(known.has(c), c);
  const dictionary = Object.keys(read('kanji_jouyou_fr.json'));
  for (const c of dictionary.filter((k) => [...k].length === 1)) assert.ok(known.has(c), c);
  assert.ok(known.has('爽'), 'dictionnaire');
  // Anomalie du dictionnaire : quelques clés sont des mots, pas des kanji ; elles sont écartées.
  const words = dictionary.filter((k) => [...k].length !== 1);
  assert.deepEqual(words.sort(), ['山羊', '措置', '生活', '継続', '迅速'].sort());
  for (const w of words) assert.ok(!known.has(w), w);
  assert.ok(deps.knownKanji.every((k) => [...k].length === 1));
  assert.deepEqual(new Set(deps.particles), new Set(read('n5/particles.json').map((p) => p.particle)));
  assert.deepEqual(deps.expressions, read('expressions.json'));
});

// Les catalogues actuels sont tous inclus dans le dictionnaire : seul un dossier construit pour
// l'occasion montre que les deux sources sont bien lues.
test('kanji connus : catalogues de niveau ET dictionnaire, chacun réellement lu', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ocha-lexique-'));
  try {
    cpSync(join(DATA_DIR, 'registries'), join(dir, 'registries'), { recursive: true });
    writeFileSync(join(dir, 'expressions.json'), '[]');
    writeFileSync(join(dir, 'kanji_jouyou_fr.json'), JSON.stringify({ 水: {}, 山羊: {} }));
    mkdirSync(join(dir, 'n5'));
    writeFileSync(join(dir, 'n5', 'kanji.json'), JSON.stringify({ chars: ['龘'] }));
    writeFileSync(join(dir, 'n5', 'particles.json'), JSON.stringify([{ particle: 'を' }]));
    const deps = readLexiconDependencies(dir);
    assert.deepEqual(deps.knownKanji.sort(), ['水', '龘'].sort());
    assert.deepEqual(deps.particles, ['を']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('lieux : lus seulement sur demande explicite, aucune détection du format', () => {
  assert.ok(!('lieux' in readLexiconDependencies(DATA_DIR)));
  assert.deepEqual(readLexiconDependencies(DATA_DIR, { includeLieux: true }).lieux, read('lieux.json'));
});

test('extraction : chaque emplacement de référence des formats actuels, jamais de sens', () => {
  const activity = {
    id: 'n5_m_9',
    requires: { vocab: ['v_1'], grammar: ['g_1'] },
    teaches: { vocab: ['v_2'], kana: ['kana_あ'] },
    dialogue: [{ japanese: 'x', refs: [{ text: 'x', vocab: 'v_3' }, { text: 'y', expression: 'ex_1' }] }],
    exercises: [{ id: 'n5_m_9_q1', target: { vocab: ['v_4'] } }]
  };
  const reading = {
    id: 'n5_l_9',
    blocks: [{ lines: [{ refs: [{ text: 'z', vocab: 'v_5', sense: 'v_5_s1' }] }] }, { refs: [{ text: 'w', vocab: 'v_6' }] }],
    questions: [{ id: 'n5_l_9_q1', target: { vocab: ['v_7'] } }]
  };
  const expression = { id: 'ex_9', refs: { vocab: ['v_8'] }, examples: [{ refs: [{ text: 'u', vocab: 'v_9' }] }] };
  const refs = extractReferences({ activities: [{ file: 'n5/missions.json', items: [activity] }, { file: 'n5/lectures.json', items: [reading] }],
    expressions: [expression] });
  assert.deepEqual(refs, [
    { where: 'n5/missions.json · n5_m_9 · requires', vocab: 'v_1' },
    { where: 'n5/missions.json · n5_m_9 · teaches', vocab: 'v_2' },
    { where: 'n5/missions.json · n5_m_9 · dialogue 1', vocab: 'v_3' },
    { where: 'n5/missions.json · n5_m_9 · question 1 · target', vocab: 'v_4' },
    { where: 'n5/lectures.json · n5_l_9 · bloc 1 · ligne 1', vocab: 'v_5' },
    { where: 'n5/lectures.json · n5_l_9 · bloc 2', vocab: 'v_6' },
    { where: 'n5/lectures.json · n5_l_9 · question 1 · target', vocab: 'v_7' },
    { where: 'expressions.json · ex_9 · refs', vocab: 'v_8' },
    { where: 'expressions.json · ex_9 · exemple 1', vocab: 'v_9' }
  ]);
  assert.ok(refs.every((r) => !('sense' in r)), 'aucun sens inventé, même si une source en porte un');
});

// Sur les vraies données : l'extracteur trouve chaque occurrence d'un identifiant de mot écrite
// dans les missions, les lectures et les expressions, ni plus ni moins.
test('extraction sur les vraies données : toutes les occurrences, ni plus ni moins', () => {
  const activities = readActivities(DATA_DIR, ['n5']);
  const expressions = read('expressions.json');
  const refs = extractReferences({ activities, expressions });
  const occurrences = ['n5/missions.json', 'n5/lectures.json', 'expressions.json']
    .flatMap((f) => readFileSync(join(DATA_DIR, f), 'utf8').match(/"v_\d+"/g) || [])
    .map((s) => s.slice(1, -1)).sort();
  assert.deepEqual(refs.map((r) => r.vocab).sort(), occurrences);
  assert.ok(refs.length > 0);
  // Depuis la publication d'A2-04 (5.17), les références sont canoniques : plus aucune ancienne forme.
  assert.ok(refs.every((r) => /^v_[1-9][0-9]*$/.test(r.vocab)));
});

test('branchement prêt : dépendances et références assemblées, validées sur la fixture', () => {
  const deps = readLexiconDependencies(DATA_DIR);
  const references = extractReferences({ activities: [{ file: 'n5/missions.json',
    items: [{ id: 'n5_m_9', teaches: { vocab: ['v_188'] }, dialogue: [{ refs: [{ text: '高い', vocab: 'v_188' }] }] }] }] });
  const r = validateLexicon({ ...minimalLexicon(), registries: deps.registries, knownKanji: deps.knownKanji,
    particles: deps.particles, expressions: deps.expressions, references });
  assert.deepEqual(r.errors, []);
});

// Publication d'A2-04 (5.17) : la bascule est faite. validate-data appelle le validateur lexical
// sur data/, par l'adaptateur, et n'a plus l'ancien contrôle du vocabulaire (plan d'A2-03, §4).
test('bascule faite à la publication d\'A2-04 : validate-data appelle le validateur lexical, sans l\'ancien contrôle', () => {
  const src = readFileSync(join(ROOT, 'tools', 'validate-data.mjs'), 'utf8');
  assert.match(src, /import \{ validateLexicon \} from '\.\/lexicon\/index\.mjs'/);
  assert.match(src, /import \{ readLexiconDependencies, extractReferences, readActivities \} from '\.\/lexicon-adapter\.mjs'/);
  assert.match(src, /validateLexicon\(\{/, 'le validateur lexical est appelé');
  assert.match(src, /includeLieux: true/, 'avec les lieux (I14)');
  assert.match(src, /'vocab-retired\.json', report, \{ required: true \}/, 'identifiants retirés obligatoires');
  for (const gone of ['function checkVocab(', 'function checkCategories(', 'categorie-isolee', 'categorie-doublon', 'kanji_list', 'KNOWN_GROUPS', 'vocab_categories']) {
    assert.ok(!src.includes(gone), `« ${gone} » : retiré avec l'ancien contrôle du vocabulaire`);
  }
  assert.match(src, /lexicon\/schema\.mjs/, 'la liste des registres reste partagée');
});
