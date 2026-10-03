// Couche mécanique de la reconstruction (A2-04 · 5.0) : elle calcule, elle ne décide pas.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newId, prefill } from '../../tools/reconstruction/mechanical.mjs';
import { EXCEPTION_FIELDS } from '../../tools/reconstruction/rules.mjs';
import { SOURCES, PREFILLS } from './helpers.mjs';

const source = (id) => [...SOURCES.vocab, ...SOURCES.hj].find((s) => s.id === id);

test('identifiants : n5_v_<n> → v_<n>, hors JLPT par table, rien d\'autre', () => {
  assert.equal(newId('n5_v_188'), 'v_188');
  assert.equal(newId('hj_v_1'), 'v_718');
  for (const bad of ['n4_v_1', 'v_188', 'hj_v_3', 'n5_v_0']) assert.throws(() => newId(bad), bad);
});

test('chaque champ mécanique a une valeur ou une exception, et aucun champ humain n\'est rempli', () => {
  assert.equal(PREFILLS.size, 718);
  for (const pre of PREFILLS.values()) {
    for (const f of EXCEPTION_FIELDS) assert.ok(Object.hasOwn(pre.values, f) !== Object.hasOwn(pre.exceptions, f), `${pre.oldId} · ${f}`);
    assert.deepEqual(Object.keys(pre.values).filter((k) => !EXCEPTION_FIELDS.includes(k)), [], pre.oldId);
  }
  assert.equal([...PREFILLS.values()].filter((p) => p.identity).length, 60);
});

test('« / » : jamais découpé, toujours une exception', () => {
  for (const id of ['n5_v_401', 'n5_v_369', 'n5_v_329', 'n5_v_420']) {
    const pre = PREFILLS.get(id);
    assert.ok(pre.exceptions.readings && !pre.values.readings, id);
    assert.ok(pre.identity, id);
  }
  assert.ok(PREFILLS.get('n5_v_420').exceptions.word);
});

test('furigana : espaces retirés seulement si la forme est retrouvée exactement', () => {
  const garcon = PREFILLS.get('n5_v_39'); // 男の子, furigana découpé par des espaces
  assert.equal(garcon.values.readings[0].furigana, '<ruby>男<rt>おとこ</rt></ruby>の<ruby>子<rt>こ</rt></ruby>');
  assert.match(PREFILLS.get('n5_v_214').exceptions.readings, /furigana/); // 入口 / 入り口
  assert.match(PREFILLS.get('n5_v_455').exceptions.readings, /furigana/); // 明るい
});

test('classe : nombres par liste, jamais par détection ; types sans classe en exception', () => {
  assert.equal(PREFILLS.get('n5_v_367').values.grammatical_class, 'numeral'); // 一
  const mannenhitsu = [...SOURCES.vocab].find((s) => s.word === '万年筆');
  assert.equal(PREFILLS.get(mannenhitsu.id).values.grammatical_class, 'nom', 'contient 万, reste un nom');
  assert.ok(PREFILLS.get('n5_v_410').exceptions.grammatical_class, 'この, ancien type « adjectif »');
  assert.ok(PREFILLS.get('n5_v_368').exceptions.grammatical_class, '一つ, composé à décider');
});

test('group : repris s\'il est compatible avec la classe, null pour une classe sans groupe', () => {
  const byClass = (c) => [...PREFILLS.values()].filter((p) => p.values.grammatical_class === c);
  assert.ok(byClass('nom').every((p) => p.values.group === 'nom'));
  for (const c of ['pronom', 'adverbe', 'numeral', 'conjonction', 'interjection']) assert.ok(byClass(c).every((p) => p.values.group === null), c);
  assert.ok(byClass('verbe').every((p) => ['ru', 'u', 'irrégulier', 'suru'].includes(p.values.group)));
  // Incompatibilité : exception, jamais une correction silencieuse.
  const s = { ...source('n5_v_175'), group: 'nom' };
  const pre = prefill(s, { level: 'N5', lieux: [], placeTags: SOURCES.placeTags });
  assert.match(pre.exceptions.group, /incompatible/);
  assert.ok(!('group' in pre.values));
});

test('tags de lieu : candidats seulement, par la correspondance explicite', () => {
  assert.deepEqual(PREFILLS.get('hj_v_1').tagCandidates, ['lieu_konbini']);
  assert.ok([...PREFILLS.values()].every((p) => !('tags' in p.values)));
  const s = { ...source('n5_v_188'), places: ['ecole'] };
  assert.throws(() => prefill(s, { level: 'N5', lieux: [], placeTags: SOURCES.placeTags }), /ecole/);
});

test('forme usuelle décidée : la forme et les lectures de 平仮名 deviennent des champs à décider', () => {
  const pre = PREFILLS.get('n5_v_604');
  assert.ok(pre.exceptions.word, 'forme en exception');
  assert.ok(pre.exceptions.readings, 'lectures en exception (elles dépendent de la forme)');
  assert.ok(!Object.hasOwn(pre.values, 'word'));
  // Les autres entrées ne sont pas touchées : la règle mécanique générale reste.
  assert.equal(PREFILLS.get('n5_v_682').values.word, '漢字');
});
