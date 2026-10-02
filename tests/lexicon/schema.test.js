// Conformité de tools/lexicon/schema.mjs à docs/conception/schema-A2-01.md (A2-03 · 4.2)
//
// Pas d'analyse du Markdown (arbitrage d'A2-03, décision 3) : ce test FIXE explicitement les champs
// et les propriétés structurantes attendus. Toute évolution du schéma doit modifier, consciemment,
// le document verrouillé, schema.mjs et ce test.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ENTRY_SHAPE, READING_SHAPE, WRITING_SHAPE, LINGUISTIC_SHAPE, COUNTER_SHAPE, RETIRED_SHAPE,
  SENSE_SHAPE, MEANING_SHAPE, CATEGORY_SHAPE, DIMENSION_SHAPE, RELATION_SHAPE, FUNCTIONS_SHAPE,
  ENTRY_ID, SENSE_ID, GROUP_VALUES, KANA_READING, LEXICON_LEVELS
} from '../../tools/lexicon/schema.mjs';

const keys = (shape) => Object.keys(shape);
const where = (shape, prop) => keys(shape).filter((k) => shape[k][prop] === true);

test('ENTRY (§3) : champs, obligatoires, nullables', () => {
  assert.deepEqual(keys(ENTRY_SHAPE), ['id', 'level', 'word', 'writings', 'readings', 'linguistic', 'nuance', 'tags',
    'retired_sense_ids', 'senses']);
  assert.deepEqual(where(ENTRY_SHAPE, 'required'), ['id', 'level', 'word', 'readings', 'linguistic', 'senses']);
  assert.deepEqual(where(ENTRY_SHAPE, 'nullable'), ['nuance']);
  // Ce que l'ENTRY canonique ne contient plus (addendum A3) : aucun champ hérité ni dérivé.
  for (const gone of ['kanji_list', 'examples', 'example', 'meanings', 'reading', 'romaji', 'word_furigana', 'type',
    'category', 'subcategory', 'particles', 'places']) {
    assert.ok(!keys(ENTRY_SHAPE).includes(gone), gone);
  }
});

test('lecture (§4), forme graphique (§5) : tous les champs obligatoires, seule note peut valoir null', () => {
  assert.deepEqual(keys(READING_SHAPE), ['kana', 'romaji', 'furigana', 'default', 'note']);
  assert.deepEqual(where(READING_SHAPE, 'required'), keys(READING_SHAPE));
  assert.deepEqual(where(READING_SHAPE, 'nullable'), ['note']);
  assert.equal(READING_SHAPE.default.type, 'boolean');
  assert.deepEqual(keys(WRITING_SHAPE), ['form', 'furigana']);
  assert.deepEqual(where(WRITING_SHAPE, 'required'), ['form', 'furigana']);
});

test('propriétés linguistiques (§6), compteur, identifiants retirés (§9)', () => {
  assert.deepEqual(keys(LINGUISTIC_SHAPE), ['grammatical_class', 'group', 'suru_compatible', 'suffix', 'counter']);
  assert.deepEqual(where(LINGUISTIC_SHAPE, 'required'), ['grammatical_class', 'group']);
  assert.deepEqual(where(LINGUISTIC_SHAPE, 'nullable'), ['group', 'counter']);
  assert.deepEqual(keys(COUNTER_SHAPE), ['counter_for']);
  assert.deepEqual(keys(RETIRED_SHAPE), ['id', 'merged_into']);
  assert.deepEqual(where(RETIRED_SHAPE, 'nullable'), ['merged_into']);
});

test('le validateur valide sans normaliser : aucune valeur par défaut dans la description', () => {
  for (const shape of [ENTRY_SHAPE, READING_SHAPE, WRITING_SHAPE, LINGUISTIC_SHAPE, COUNTER_SHAPE, RETIRED_SHAPE,
    SENSE_SHAPE, MEANING_SHAPE, CATEGORY_SHAPE, DIMENSION_SHAPE, RELATION_SHAPE, FUNCTIONS_SHAPE]) {
    for (const [name, field] of Object.entries(shape)) {
      for (const prop of Object.keys(field)) assert.ok(['type', 'required', 'nullable', 'items', 'shape'].includes(prop), `${name}.${prop}`);
    }
  }
});

test('valeurs : identifiant, niveaux, group, kana d\'une lecture', () => {
  for (const ok of ['v_1', 'v_188', 'v_719']) assert.match(ok, ENTRY_ID);
  for (const bad of ['v_0', 'v_08', 'n5_v_188', 'v_188_s1', 'hj_v_1', 'v_']) assert.doesNotMatch(bad, ENTRY_ID);
  assert.deepEqual(LEXICON_LEVELS, ['N5', 'N4', 'N3', 'N2', 'N1', 'hors_jlpt']);
  assert.deepEqual(GROUP_VALUES, ['ru', 'u', 'irrégulier', 'suru', 'i', 'na', 'nom']);
  for (const ok of ['たかい', 'コーヒー', 'きゃく', 'パン']) assert.match(ok, KANA_READING);
  for (const bad of ['なん / なに', 'takai', '高い', 'たか い', '']) assert.doesNotMatch(bad, KANA_READING);
});

test('SENSE (§7) : champs, obligatoires, nullables ; aucun exemple', () => {
  assert.equal(ENTRY_SHAPE.senses.items, SENSE_SHAPE);
  assert.deepEqual(keys(SENSE_SHAPE), ['id', 'meaning', 'category', 'semantic_type', 'dimensions', 'relations',
    'linguistic_functions', 'tags', 'particles', 'nuance']);
  assert.deepEqual(where(SENSE_SHAPE, 'required'), ['id', 'meaning', 'category', 'semantic_type', 'dimensions', 'relations',
    'linguistic_functions']);
  assert.deepEqual(where(SENSE_SHAPE, 'nullable'), ['category', 'semantic_type', 'nuance']);
  for (const gone of ['examples', 'example', 'level']) assert.ok(!keys(SENSE_SHAPE).includes(gone), gone);
});

test('sous-objets du SENSE : libellé, chemin, dimension, relation, fonctions', () => {
  assert.deepEqual(keys(MEANING_SHAPE), ['primary', 'alternatives']);
  assert.deepEqual(where(MEANING_SHAPE, 'required'), ['primary', 'alternatives']);
  assert.deepEqual(keys(CATEGORY_SHAPE), ['level_1', 'level_2', 'level_3']);
  assert.deepEqual(where(CATEGORY_SHAPE, 'required'), ['level_1']);
  assert.deepEqual(where(CATEGORY_SHAPE, 'nullable'), ['level_2', 'level_3']);
  assert.deepEqual(keys(DIMENSION_SHAPE), ['axis', 'pole']);
  assert.deepEqual(keys(RELATION_SHAPE), ['type', 'target']);
  // Familles du registre des fonctions, mêmes clés que dans le schéma.
  assert.deepEqual(keys(FUNCTIONS_SHAPE), ['grammatical', 'pragmatic_discourse']);
  assert.deepEqual(where(FUNCTIONS_SHAPE, 'required'), ['grammatical', 'pragmatic_discourse']);
  for (const ok of ['v_188_s1', 'v_1_s12']) assert.match(ok, SENSE_ID);
  for (const bad of ['v_188_s0', 'v_188_1', 'v_188', 'n5_v_188_s1']) assert.doesNotMatch(bad, SENSE_ID);
});
