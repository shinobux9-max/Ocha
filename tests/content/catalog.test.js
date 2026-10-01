// Tests de src/content (catalogue des éléments, étape 2 · G1)
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createContent, ContentError, SCOPES } from '../../src/content/index.js';
import { loadRawContent } from '../helpers/content-data.mjs';

const RAW = loadRawContent();
const content = createContent(RAW);
const N5 = RAW.levels.n5;

// ── Existence (partie 1, 1.1) ──

test('elementExists : chaque type d\'élément, sur les vraies données', () => {
  const yes = [
    { type: 'grammar', id: N5.grammar[0].id },
    { type: 'vocab', id: N5.vocab[0].id },
    { type: 'vocab', id: RAW.vocabHorsJlpt[0].id },
    { type: 'expression', id: RAW.expressions[0].id },
    { type: 'kanji', id: '水' },
    { type: 'kana', id: 'kana_あ' },
    { type: 'kana', id: 'kana_きゃ' }
  ];
  for (const r of yes) assert.equal(content.elementExists(r), true, JSON.stringify(r));
  const no = [
    { type: 'kanji', id: '爽' },              // présent dans 爽やか, absent du catalogue N5
    { type: 'kana', id: 'kana_x' },
    { type: 'kana', id: 'kana_ゔ' },           // kana, mais pas dans le catalogue
    { type: 'vocab', id: N5.grammar[0].id },   // bon identifiant, mauvais type
    { type: 'grammar', id: 'g_9999' },
    { type: 'vocabulary', id: N5.vocab[0].id },
    { type: 'vocab' }, { id: '水' }, null, undefined, '水', { type: 'kanji', id: 7 }
  ];
  for (const r of no) assert.equal(content.elementExists(r), false, JSON.stringify(r));
});

// ── Portées (partie 1, 1.5 ; décision du 2026-10-01) ──

test('portée n5 : grammaire, vocabulaire JLPT et kanji du niveau, dans cet ordre', () => {
  const n5 = content.elementsOfScope('n5');
  const expected = [
    ...N5.grammar.map((g) => ({ type: 'grammar', id: g.id })),
    ...N5.vocab.map((w) => ({ type: 'vocab', id: w.id })),
    ...N5.kanji.chars.map((c) => ({ type: 'kanji', id: c }))
  ];
  assert.deepEqual(n5, expected);
  assert.equal(n5.length, N5.grammar.length + N5.vocab.length + N5.kanji.chars.length);
});

test('aucun mot hors JLPT ni aucune expression dans une portée', () => {
  const inScopes = new Set(SCOPES.flatMap((s) => content.elementsOfScope(s)).map((r) => `${r.type}:${r.id}`));
  for (const w of RAW.vocabHorsJlpt) assert.ok(!inScopes.has(`vocab:${w.id}`), w.id);
  for (const e of RAW.expressions) assert.ok(!inScopes.has(`expression:${e.id}`), e.id);
});

test('portée kana : les 210 kana du catalogue ; niveaux non intégrés : portée vide', () => {
  const kana = content.elementsOfScope('kana');
  assert.equal(kana.length, 210);
  assert.ok(kana.every((r) => r.type === 'kana'));
  for (const lvl of ['n4', 'n3', 'n2', 'n1']) assert.deepEqual(content.elementsOfScope(lvl), [], lvl);
});

test('portées gelées, identiques d\'un appel à l\'autre ; portée inconnue refusée', () => {
  const a = content.elementsOfScope('n5');
  assert.equal(content.elementsOfScope('n5'), a);
  assert.ok(Object.isFrozen(a) && Object.isFrozen(a[0]));
  assert.throws(() => { a.push({ type: 'vocab', id: 'x' }); }, TypeError);
  assert.ok(Object.isFrozen(content));
  for (const bad of ['N5', 'hors_jlpt', 'all', undefined]) {
    assert.throws(() => content.elementsOfScope(bad), TypeError, String(bad));
  }
});

// ── Refus des données incohérentes (décision du 2026-10-01) ──

// Squelette canonique de kana.json : deux écritures, cinq groupes chacune ; seule la base des
// hiragana reçoit des cases.
const canonicalKana = (baseRows) => ({ scripts: ['hiragana', 'katakana'].map((id, i) => ({
  id, groups: ['base', 'dakuten', 'handakuten', 'sokuon', 'yoon'].map((g) => ({
    id: g, title: null, rows: g === 'base' && i === 0 ? baseRows : [] })) })) });

function minimal() {
  return {
    levels: { n5: { grammar: [{ id: 'g_1' }], vocab: [{ id: 'n5_v_1' }], kanji: { chars: ['水'] } } },
    kana: canonicalKana([[{ char: 'あ', romaji: 'a' }]]),
    vocabHorsJlpt: [{ id: 'hj_v_1' }],
    expressions: [{ id: 'ex_1' }]
  };
}

function refused(change, code) {
  const raw = minimal();
  change(raw);
  let error;
  try { createContent(raw); } catch (e) { error = e; }
  assert.ok(error instanceof ContentError, `${code} : ContentError attendue`);
  assert.ok(error.problems.some((p) => p.code === code), `${code} : ${JSON.stringify(error.problems)}`);
  return error;
}

test('construction refusée : chaque motif est signalé', () => {
  assert.doesNotThrow(() => createContent(minimal()));
  refused((r) => { r.vocabHorsJlpt.push({ id: 'n5_v_1' }); }, 'id-duplique');
  refused((r) => { r.levels.n5.grammar.push({ id: 'g_1' }); }, 'id-duplique');
  refused((r) => { r.levels.n4 = { grammar: [], vocab: [], kanji: { chars: ['水'] } }; }, 'id-duplique');
  refused((r) => { r.levels.n5.kanji.chars.push('水曜'); }, 'kanji-invalide');
  refused((r) => { r.levels.n5.vocab.push({ word: '水' }); }, 'format');
  refused((r) => { r.expressions.push({ id: '' }); }, 'format');
  refused((r) => { r.levels.n6 = r.levels.n5; }, 'niveau-inconnu');
  refused((r) => { delete r.levels.n5.kanji; }, 'fichier-absent');
  refused((r) => { r.levels.n5.exemples = []; }, 'cle-inconnue');
  refused((r) => { r.mapping = {}; }, 'cle-inconnue');
  refused((r) => { r.kana.scripts[0].groups[0].rows[0].push({ char: 'あ', romaji: 'a' }); }, 'id-duplique');
  refused((r) => { delete r.kana; }, 'format');
  refused((r) => { r.kana.scripts[0].groups[0].id = 'foobar'; }, 'groupe-inconnu');
  refused((r) => { r.kana.scripts.pop(); }, 'ecriture-manquante');
  refused((r) => { r.vocabHorsJlpt = {}; }, 'format');
  refused((r) => { delete r.levels; }, 'format');
});

test('l\'erreur porte tous les problèmes, et aucun contenu partiel n\'est rendu', () => {
  const error = refused((r) => { r.levels.n5.grammar.push({ id: 'g_1' }); r.levels.n5.kanji.chars.push('ab'); }, 'id-duplique');
  assert.ok(error.problems.some((p) => p.code === 'kanji-invalide'));
  assert.ok(Object.isFrozen(error.problems));
  assert.throws(() => createContent('données'), ContentError);
});

test('le contenu ne lit que l\'identifiant des entrées lexicales (addendum A3)', () => {
  // Une entrée réduite à son identifiant suffit : aucun champ du schéma lexical actuel n'est requis.
  const raw = minimal();
  raw.levels.n5.vocab = [{ id: 'n5_v_1' }];
  raw.levels.n5.grammar = [{ id: 'g_1' }];
  const c = createContent(raw);
  assert.equal(c.elementExists({ type: 'vocab', id: 'n5_v_1' }), true);
  assert.equal(c.elementExists({ type: 'grammar', id: 'g_1' }), true);
});
