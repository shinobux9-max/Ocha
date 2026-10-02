// Tests du point d'entrée tools/lexicon/index.mjs (A2-03 · 4.1 : contrat d'entrée)
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLexicon, readRegistries, buildRegistryIndex } from '../../tools/lexicon/index.mjs';
import { DATA_DIR } from '../helpers/content-data.mjs';
import { minimalLexicon } from './fixtures/minimal-lexicon.mjs';

const REGISTRIES = readRegistries(DATA_DIR);
const input = (change = () => {}) => { const x = { ...minimalLexicon(), registries: REGISTRIES }; change(x); return x; };
const codes = (r) => r.errors.map((e) => e.code);

test('lexique minimal : aucune erreur ni avertissement, rapport gelé', () => {
  const r = validateLexicon(input());
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.warnings, []);
  assert.ok(Object.isFrozen(r) && Object.isFrozen(r.errors));
});

// La fixture ne vaut que si ses références aux registres existent réellement.
test('la fixture minimale ne référence que des valeurs existantes des registres', () => {
  const index = buildRegistryIndex(REGISTRIES);
  for (const f of minimalLexicon().files) {
    for (const e of f.entries) {
      assert.ok(index.isGrammaticalClass(e.linguistic.grammatical_class), e.id);
      for (const s of e.senses) {
        assert.ok(index.resolveCategory(s.category), `${s.id} : catégorie`);
        assert.ok(index.isSemanticType(s.semantic_type), `${s.id} : type`);
        for (const t of s.tags) assert.equal(index.tagKind(t), 'lieu', `${s.id} : tag ${t}`);
      }
    }
  }
});

test('contrat d\'entrée : { files, registries }, fichiers { file, level, entries }', () => {
  const cases = [
    (x) => { x.extra = 1; },
    (x) => { x.files = []; },
    (x) => { delete x.files; },
    (x) => { x.files[0].level = 'n5'; },
    (x) => { x.files[0].level = 'N6'; },
    (x) => { x.files[0].entries = {}; },
    (x) => { x.files[1].file = 'n5/vocab.json'; },
    (x) => { x.files[0].source = 'A2-04'; },
    (x) => { delete x.files[0].file; },
    (x) => { x.files.push('n5/vocab.json'); },
    (x) => { delete x.retired; },
    (x) => { x.retired = {}; },
    (x) => { delete x.knownKanji; },
    (x) => { x.knownKanji = ['高い']; },
    (x) => { delete x.particles; },
    (x) => { x.particles = ['を', '']; }
  ];
  for (const [i, change] of cases.entries()) assert.ok(codes(validateLexicon(input(change))).includes('lexique-format'), `cas ${i + 1}`);
  assert.ok(codes(validateLexicon(null)).includes('lexique-format'));
});

test('registres manquants : signalés, sans exception', () => {
  const r = validateLexicon(input((x) => { x.registries = { ...REGISTRIES }; delete x.registries['tags.json']; }));
  assert.ok(r.errors.some((e) => e.code === 'registres-indisponibles' && e.message.includes('tags.json')));
});
