// A2-02 · 3.3 — Registres décidés en A2-02.
//
// Contrairement aux registres de 3.1 et 3.2, ces deux registres ne sont pas des transcriptions
// intégrales d'un snapshot. Les tests distinguent ce qui vient d'A2-LING-v1 de ce qui a été
// décidé le 2026-10-02 (ETAT-ACTUEL.md, décisions complémentaires) :
//   - classes grammaticales : A2-LING-v1 nomme la propriété « catégorie grammaticale » sans en
//     donner les valeurs ; les dix classes sont une décision A2-02 ;
//   - compatibilités de compteur : les six notions viennent d'A2-LING-v1 (section 3, un compteur
//     d'exemple chacune) ; seul l'identifiant `small_animals` y figure, les cinq autres
//     identifiants sont des conventions A2-02.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LING = readFileSync(join(ROOT, 'docs', 'conception', 'a2', 'A2-LING-v1.md'), 'utf8');
const registry = (file) => JSON.parse(readFileSync(join(ROOT, 'data', 'registries', file), 'utf8'));

test('classes grammaticales : les dix classes décidées en A2-02, dans l\'ordre (source A2-02)', () => {
  const reg = registry('grammatical-classes.json');
  assert.equal(reg.source, 'A2-02');
  assert.deepEqual(reg.classes.map((c) => c.id), ['nom', 'numeral', 'pronom', 'verbe', 'adjectif_i', 'adjectif_na',
    'adverbe', 'determinant', 'conjonction', 'interjection']);
  for (const c of reg.classes) assert.ok(typeof c.label === 'string' && c.label !== '', c.id);
  // Le snapshot ne fournit que la propriété, pas la liste : c'est bien une décision A2-02.
  assert.ok(LING.includes('catégorie grammaticale'));
  // Pas de classe « compteur » : 匹 est un nom avec la propriété counter (décision du 2026-10-02).
  assert.ok(!reg.classes.some((c) => /compt|counter/.test(c.id)));
});

// Compatibilité → compteur d'exemple cité par A2-LING-v1 (section 3) : c'est ce qui rattache
// chaque notion au snapshot.
const NOTIONS = [
  ['small_animals', '匹'], ['flat_objects', '枚'], ['long_objects', '本'],
  ['books_volumes', '冊'], ['generic_units', '個'], ['occurrences', '回']
];

test('compteurs : six compatibilités, chacune adossée à un compteur cité par A2-LING-v1', () => {
  const reg = registry('counters.json');
  assert.equal(reg.source, 'A2-02');
  assert.deepEqual(reg.compatibilities.map((c) => c.id), NOTIONS.map(([id]) => id));
  for (const [id, kanji] of NOTIONS) {
    assert.ok(LING.includes(`\`${kanji}\` --- compteur`), `${id} : compteur ${kanji} absent du snapshot`);
  }
  // Aucune notion de plus que les exemples du snapshot.
  assert.equal((LING.match(/^-\s+`.` --- compteur/gm) || []).length, NOTIONS.length);
});

test('compteurs : seul small_animals est un identifiant du snapshot, les cinq autres sont des conventions A2-02', () => {
  // Identifiants que le snapshot déclare sous « counter_for: » (bloc de code de la section 3).
  const block = LING.match(/counter_for:\s*\n((?:\s*- [a-z_]+\s*\n)+)/);
  assert.ok(block, 'bloc counter_for introuvable');
  const declared = [...block[1].matchAll(/- ([a-z_]+)/g)].map((m) => m[1]);
  assert.deepEqual(declared, ['small_animals']);
  const conventions = registry('counters.json').compatibilities.map((c) => c.id).filter((id) => !declared.includes(id));
  assert.deepEqual(conventions, ['flat_objects', 'long_objects', 'books_volumes', 'generic_units', 'occurrences']);
});

// ── A2-02 · 3.4 : tags (décisions du 2026-10-02) ──

test('tags : les quatre tags de lieu initiaux, de nature lieu, sans champ de cycle de vie', () => {
  const reg = registry('tags.json');
  assert.equal(reg.source, 'A2-02');
  assert.deepEqual(Object.keys(reg), ['source', 'tags']);
  assert.deepEqual(reg.tags.map((t) => t.id), ['lieu_konbini', 'lieu_gare', 'lieu_restaurant', 'lieu_hotel']);
  for (const t of reg.tags) {
    assert.deepEqual(Object.keys(t), ['id', 'label', 'description', 'kind'], t.id);
    assert.equal(t.kind, 'lieu', t.id);
    assert.ok(t.label !== '' && t.description !== '', t.id);
  }
});
