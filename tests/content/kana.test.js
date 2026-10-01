// Tests de src/content/kana.js et de data/kana.json
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { kanaProblems, kanaEntries, kanaId } from '../../src/content/index.js';
import { loadRawContent } from '../helpers/content-data.mjs';

const LEGACY = JSON.parse(readFileSync(new URL('./fixtures/kana-legacy.json', import.meta.url), 'utf8'));
const KANA = loadRawContent().kana;

// Non-régression (stratégie de reconstruction, §3.2) : data/kana.json redonne exactement la liste
// de l'ancienne application, identifiants, caractères, romaji et ordre compris.
test('data/kana.json redonne exactement la liste de l\'ancienne application (non-régression)', () => {
  assert.deepEqual(kanaProblems(KANA), []);
  const entries = kanaEntries(KANA).map(({ id, char, romaji }) => ({ id, char, romaji }));
  assert.equal(LEGACY.items.length, 210);
  assert.deepEqual(entries, LEGACY.items);
});

test('la grille garde ses écritures et ses groupes, avec des identifiants stables', () => {
  assert.deepEqual(KANA.scripts.map((s) => s.id), ['hiragana', 'katakana']);
  for (const s of KANA.scripts) {
    assert.deepEqual(s.groups.map((g) => g.id), ['base', 'dakuten', 'handakuten', 'sokuon', 'yoon']);
  }
  const entries = kanaEntries(KANA);
  assert.equal(entries.filter((e) => e.script === 'hiragana').length, 105);
  assert.equal(entries.filter((e) => e.group === 'yoon').length, 66);
  assert.ok(entries.every((e) => e.id === kanaId(e.char)));
  // Un yōon est un seul élément de deux caractères.
  assert.ok(entries.some((e) => e.id === 'kana_きゃ'));
});

test('catalogue des kana : chaque défaut de structure est signalé', () => {
  const grid = (rows, extra = {}) => ({ scripts: [{ id: 'hiragana', groups: [{ id: 'base', title: null, rows }] }], ...extra });
  const a = { char: 'あ', romaji: 'a' };
  const cases = [
    [null, 'format'],
    [{ scripts: [] }, 'format'],
    [grid([[a]], { extra: 1 }), 'cle-inconnue'],
    [grid([[a, { char: 'あ', romaji: 'a' }]]), 'id-duplique'],
    [grid([[{ char: 'a', romaji: 'a' }]]), 'kana-invalide'],
    [grid([[{ char: 'あ', romaji: '' }]]), 'format'],
    [grid([[{ char: 'あ', romaji: 'a', id: 'kana_あ' }]]), 'format'],
    [grid(['あ']), 'format'],
    [{ scripts: [{ id: 'hiragana', groups: [{ id: 'base', title: null, rows: [] }, { id: 'base', title: null, rows: [] }] }] }, 'id-duplique'],
    [{ scripts: [{ id: 'hiragana', groups: [{ id: 'base', title: 3, rows: [] }] }] }, 'format'],
    [{ scripts: [{ id: 'hiragana', groups: [] }, { id: 'hiragana', groups: [] }] }, 'id-duplique']
  ];
  for (const [kana, code] of cases) {
    const problems = kanaProblems(kana);
    assert.ok(problems.some((p) => p.code === code), `${JSON.stringify(kana)} → ${code}`);
  }
  assert.deepEqual(kanaProblems(grid([[a, null]])), [], 'une case vide est permise');
});
