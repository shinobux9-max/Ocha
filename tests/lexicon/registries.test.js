// Tests de tools/lexicon/registries.mjs (A2-03 · 4.1)
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRegistryIndex, readRegistries } from '../../tools/lexicon/index.mjs';
import { DATA_DIR } from '../helpers/content-data.mjs';

const RAW = readRegistries(DATA_DIR);
const index = buildRegistryIndex(RAW);

// ── Catégories : résolution par chemin complet seulement ──

test('catégories : un chemin complet se résout, à chaque niveau', () => {
  assert.deepEqual(index.resolveCategory({ level_1: 'temps' })?.path, ['temps']);
  assert.deepEqual(index.resolveCategory({ level_1: 'temps', level_2: 'calendrier' })?.path, ['temps', 'calendrier']);
  const a = index.resolveCategory({ level_1: 'temps', level_2: 'calendrier', level_3: 'mois' });
  const b = index.resolveCategory({ level_1: 'temps', level_2: 'unites_temporelles', level_3: 'mois' });
  assert.ok(a && b && a !== b, 'deux « mois » distincts, chacun sous son parent');
  assert.deepEqual(index.resolveCategory({ level_1: 'medias', level_2: 'radio', level_3: 'radio' })?.path, ['medias', 'radio', 'radio']);
  // Forme d'un SENSE : null est permis pour les niveaux absents.
  assert.deepEqual(index.resolveCategory({ level_1: 'temps', level_2: null, level_3: null })?.path, ['temps']);
  // Chemins inexistants.
  assert.equal(index.resolveCategory({ level_1: 'temps', level_2: 'radio' }), null);
  assert.equal(index.resolveCategory({ level_1: 'medias', level_2: 'calendrier', level_3: 'mois' }), null);
});

// Invariant d'A2-03 : il doit être impossible de résoudre « mois » ou « radio » comme catégorie
// à partir de ce seul identifiant. La résolution exige le chemin.
test('catégories : impossible de résoudre un identifiant isolé (mois, radio)', () => {
  for (const id of ['mois', 'radio', 'interpretation']) {
    assert.throws(() => index.resolveCategory(id), TypeError, `chaîne « ${id} »`);
    assert.throws(() => index.resolveCategory({ level_3: id }), TypeError, `level_3 seul « ${id} »`);
    assert.throws(() => index.resolveCategory({ level_2: id }), TypeError, `level_2 seul « ${id} »`);
    assert.throws(() => index.resolveCategory({ level_1: 'temps', level_3: id }), TypeError, `level_3 sans level_2 « ${id} »`);
    assert.throws(() => index.resolveCategory({ id }), TypeError, `{ id: « ${id} » }`);
  }
  // Un identifiant de niveau 3 placé en niveau 1 n'est pas une catégorie.
  assert.equal(index.resolveCategory({ level_1: 'mois' }), null);
  assert.equal(index.resolveCategory({ level_1: 'radio' }), null);
  for (const bad of [null, undefined, ['temps'], 42, { level_1: 7 }]) {
    assert.throws(() => index.resolveCategory(bad), TypeError, JSON.stringify(bad));
  }
});

test('catégories : l\'API n\'expose aucune table « identifiant → nœud »', () => {
  assert.deepEqual(Object.keys(index).sort(), ['axisPoles', 'functionFamilies', 'isCounterCompatibility', 'isFunction',
    'isGrammaticalClass', 'isSemanticType', 'relationType', 'resolveCategory', 'tagKind']);
  assert.ok(Object.isFrozen(index));
  for (const value of Object.values(index)) assert.equal(typeof value, 'function');
  // Les nœuds rendus sont gelés : impossible de s'en servir pour bâtir un index modifiable.
  const node = index.resolveCategory({ level_1: 'temps', level_2: 'calendrier', level_3: 'mois' });
  assert.ok(Object.isFrozen(node) && Object.isFrozen(node.path));
});

// ── Autres registres ──

test('index des autres registres : types, axes, relations, fonctions, classes, compteurs, tags', () => {
  assert.equal(index.isSemanticType('propriete'), true);
  assert.equal(index.isSemanticType('entity'), false, 'une famille n\'est pas attribuable');
  assert.deepEqual(index.axisPoles('probabilite'), ['probabilite']);
  assert.deepEqual(index.axisPoles('facilite_difficulte'), ['facilite', 'difficulte']);
  assert.equal(index.axisPoles('facilite'), null, 'un pôle n\'est pas un axe');
  assert.deepEqual(index.relationType('opposed_to'), { id: 'opposed_to', symmetric: true, inverse: null });
  assert.deepEqual(index.relationType('part_of'), { id: 'part_of', symmetric: false, inverse: 'has_part' });
  assert.deepEqual(index.relationType('compared_to'), { id: 'compared_to', symmetric: false, inverse: null });
  assert.equal(index.relationType('opposé à'), null);
  assert.deepEqual(index.functionFamilies(), ['grammatical', 'pragmatic_discourse']);
  assert.equal(index.isFunction('grammatical', 'interrogatif'), true);
  assert.equal(index.isFunction('pragmatic_discourse', 'interrogatif'), false, 'la famille compte');
  assert.equal(index.isFunction('grammatical', 'temps'), true);
  assert.equal(index.isGrammaticalClass('numeral'), true);
  assert.equal(index.isGrammaticalClass('compteur'), false);
  assert.equal(index.isCounterCompatibility('small_animals'), true);
  assert.equal(index.isCounterCompatibility('books'), false);
  assert.equal(index.tagKind('lieu_konbini'), 'lieu');
  assert.equal(index.tagKind('lieu_inconnu'), null, 'la nature ne se déduit pas du préfixe');
});

test('index : refusé s\'il manque un registre', () => {
  for (const file of Object.keys(RAW)) {
    const partial = { ...RAW };
    delete partial[file];
    assert.throws(() => buildRegistryIndex(partial), new RegExp(file.replace('.', '\\.')));
  }
  assert.throws(() => buildRegistryIndex(undefined));
});
