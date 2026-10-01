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

// Squelette canonique : deux écritures, cinq groupes chacune ; seule la base des hiragana a des cases.
const SCRIPTS = ['hiragana', 'katakana'];
const GROUPS = ['base', 'dakuten', 'handakuten', 'sokuon', 'yoon'];
const canonical = (rows = [[{ char: 'あ', romaji: 'a' }]]) => ({ scripts: SCRIPTS.map((id, i) => ({
  id, groups: GROUPS.map((g) => ({ id: g, title: null, rows: g === 'base' && i === 0 ? rows : [] })) })) });
const has = (kana, code) => kanaProblems(kana).some((p) => p.code === code);

test('catalogue des kana : chaque défaut de structure est signalé', () => {
  const a = { char: 'あ', romaji: 'a' };
  assert.deepEqual(kanaProblems(canonical()), []);
  assert.deepEqual(kanaProblems(canonical([[a, null]])), [], 'une case vide est permise');
  const cases = [
    [null, 'format'],
    [{ scripts: [] }, 'format'],
    [{ ...canonical(), extra: 1 }, 'cle-inconnue'],
    [canonical([[a, { char: 'あ', romaji: 'a' }]]), 'id-duplique'],
    [canonical([[{ char: 'a', romaji: 'a' }]]), 'kana-invalide'],
    [canonical([[{ char: 'あ', romaji: '' }]]), 'format'],
    [canonical([[{ char: 'あ', romaji: 'a', id: 'kana_あ' }]]), 'format'],
    [canonical(['あ']), 'format']
  ];
  for (const [kana, code] of cases) assert.ok(has(kana, code), `${JSON.stringify(kana)?.slice(0, 80)} → ${code}`);
  const k = canonical();
  k.scripts[0].groups[0].title = 3;
  assert.ok(has(k, 'format'), 'title ni texte ni null');
});

// Structure canonique (décision du 2026-10-02) : imposée par kanaProblems, donc par le contenu ET
// par le validateur, et pas seulement vérifiée sur le fichier actuel.
test('catalogue des kana : écritures et groupes canoniques, chacun une fois, dans l\'ordre', () => {
  const change = (fn) => { const k = canonical(); fn(k); return k; };
  const cases = [
    ['écriture inconnue', (k) => { k.scripts[1].id = 'romaji'; }, 'ecriture-inconnue'],
    ['écriture manquante', (k) => { k.scripts.pop(); }, 'ecriture-manquante'],
    ['écriture supplémentaire', (k) => { k.scripts.push({ id: 'hentaigana', groups: [] }); }, 'ecriture-inconnue'],
    ['écriture en double', (k) => { k.scripts.push(structuredClone(k.scripts[1])); }, 'id-duplique'],
    ['écritures dans le désordre', (k) => { k.scripts.reverse(); }, 'ordre-invalide'],
    ['groupe inconnu', (k) => { k.scripts[0].groups[1].id = 'foobar'; }, 'groupe-inconnu'],
    ['groupe inconnu en plus', (k) => { k.scripts[1].groups.push({ id: 'foobar', title: null, rows: [] }); }, 'groupe-inconnu'],
    ['groupe manquant', (k) => { k.scripts[1].groups.splice(3, 1); }, 'groupe-manquant'],
    ['groupe en double', (k) => { k.scripts[0].groups.push({ id: 'yoon', title: null, rows: [] }); }, 'id-duplique'],
    ['groupes dans le désordre', (k) => { [k.scripts[0].groups[1], k.scripts[0].groups[2]] = [k.scripts[0].groups[2], k.scripts[0].groups[1]]; }, 'ordre-invalide']
  ];
  for (const [label, fn, code] of cases) assert.ok(has(change(fn), code), `${label} → ${code}`);
  // Le cas de la revue : un groupe « foobar » seul n'est pas une grille valide.
  const lone = { scripts: [{ id: 'hiragana', groups: [{ id: 'foobar', title: null, rows: [] }] }] };
  for (const code of ['groupe-inconnu', 'groupe-manquant', 'ecriture-manquante']) assert.ok(has(lone, code), code);
});
