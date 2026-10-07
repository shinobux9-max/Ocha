// Règles et listes fermées de la reconstruction (A2-04 · 5.0) : chaque identifiant des listes est
// ancré à son mot dans les sources figées ; les tables couvrent exactement ce qu'elles doivent.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  HJ_IDS, RESERVED_RETIRED, TYPE_CLASS, NUMERAL_IDS, CLASS_EXCEPTION_IDS, WORD_EXCEPTION_IDS, USUAL_FORM_IDS, CLASS_GROUPS,
  IDENTITY_GROUPS, HUMAN_FIELDS, EXCEPTION_FIELDS, SPECIAL_READING_IDS, blockFurigana, READING_EXCEPTION_IDS
} from '../../tools/reconstruction/rules.mjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GROUP_VALUES } from '../../tools/lexicon/schema.mjs';
import { ROOT, SOURCES, DEPS } from './helpers.mjs';

const word = new Map([...SOURCES.vocab, ...SOURCES.hj].map((s) => [s.id, s.word]));

test('listes d\'exceptions : chaque identifiant désigne bien son mot', () => {
  for (const list of [NUMERAL_IDS, CLASS_EXCEPTION_IDS, WORD_EXCEPTION_IDS, USUAL_FORM_IDS, READING_EXCEPTION_IDS]) {
    for (const [id, w] of Object.entries(list)) assert.equal(word.get(id), w, id);
  }
  assert.equal(Object.keys(NUMERAL_IDS).length, 15);
  assert.equal(Object.keys(CLASS_EXCEPTION_IDS).length, 52);
  assert.equal(CLASS_EXCEPTION_IDS.n5_v_495, '大変', 'arbitrage du lot 0');
});

test('lot 0 : 27 groupes de doublons candidats, sans chevauchement', () => {
  assert.equal(IDENTITY_GROUPS.length, 27);
  const ids = IDENTITY_GROUPS.flat();
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.ok(word.has(id), id);
});

test('table des anciens types : les 17 types, vers des classes du registre ou une décision', () => {
  const types = new Set([...SOURCES.vocab, ...SOURCES.hj].map((s) => s.type));
  assert.deepEqual([...types].sort(), Object.keys(TYPE_CLASS).sort());
  const classes = DEPS.registries['grammatical-classes.json'].classes.map((c) => c.id);
  for (const c of Object.values(TYPE_CLASS)) if (c !== null) assert.ok(classes.includes(c), c);
  assert.deepEqual(Object.keys(CLASS_GROUPS).sort(), [...classes].sort());
  for (const groups of Object.values(CLASS_GROUPS)) for (const g of groups) assert.ok(GROUP_VALUES.includes(g), g);
});

test('tags de lieu : correspondance décidée (place-tags.json), chaque lieu vers un tag de nature lieu', () => {
  assert.deepEqual(Object.keys(SOURCES.placeTags).sort(), SOURCES.lieux.map((l) => l.id).sort());
  const kinds = new Map(DEPS.registries['tags.json'].tags.map((t) => [t.id, t.kind]));
  for (const t of Object.values(SOURCES.placeTags)) assert.equal(kinds.get(t), 'lieu', t);
});

test('identifiants fixés par l\'addendum A3, champs de la frontière', () => {
  assert.deepEqual(HJ_IDS, { hj_v_1: 'v_718', hj_v_2: 'v_719' });
  assert.deepEqual(RESERVED_RETIRED, [{ id: 'v_717', merged_into: null }]);
  assert.deepEqual([...HUMAN_FIELDS].sort(), ['counter', 'nuance', 'senses', 'suffix', 'suru_compatible', 'tags', 'writings']);
  assert.deepEqual([...EXCEPTION_FIELDS].sort(), ['grammatical_class', 'group', 'readings', 'word']);
});

// Passe finale 5.16 (Q6, lot 26) : 煙草 y entre par arbitrage, sa fiche disant たばこ la graphie la plus
// fréquente. 居る n'y entre pas (statu quo). La liste ne s'étend jamais par détection.
test('forme usuelle décidée : liste fermée, deux entrées (平仮名, lot 06 ; 煙草, lot 26)', () => {
  assert.deepEqual({ ...USUAL_FORM_IDS }, { n5_v_604: '平仮名', n5_v_598: '煙草' });
  assert.match(SOURCES.vocab.find((x) => x.id === 'n5_v_598').nuance, /le plus souvent en hiragana \(たばこ\)/, 'la fiche justifie l\'entrée');
  assert.ok(!Object.hasOwn(USUAL_FORM_IDS, 'n5_v_548'), '居る : statu quo');
  assert.ok(!Object.hasOwn(SPECIAL_READING_IDS, 'n5_v_598'), '煙草 n\'est pas une lecture spéciale d\'A8');
  assert.ok(!Object.keys(USUAL_FORM_IDS).some((id) => Object.hasOwn(WORD_EXCEPTION_IDS, id)), 'distincte des graphies fautives');
});

// Addendum A8, §4 (règle A) : la liste de rules.mjs est la transcription de la liste normative de
// l'addendum. Une entrée n'y entre que si sa fiche qualifie elle-même la lecture de spéciale.
test('lectures spéciales (addendum A8) : liste fermée de cinq lectures, conforme à l\'addendum', () => {
  assert.deepEqual({ ...SPECIAL_READING_IDS }, { n5_v_28: '大人', n5_v_299: '今年', n5_v_300: '今日', n5_v_303: '今朝', n5_v_319: '昨夜' });
  const a8 = readFileSync(join(ROOT, 'docs', 'conception', 'addendum-A8-furigana.md'), 'utf8');
  const rows = a8.split(/\r?\n/).filter((l) => /^\| `n5_v_[0-9]+` \|/.test(l));
  assert.equal(rows.length, Object.keys(SPECIAL_READING_IDS).length, 'autant de lignes dans l\'addendum que dans la liste');
  for (const [id, w] of Object.entries(SPECIAL_READING_IDS)) {
    const s = SOURCES.vocab.find((x) => x.id === id);
    assert.equal(s.word, w, id);
    assert.match(s.nuance, /jukujikun/, `${id} : la fiche qualifie la lecture de spéciale`);
    assert.ok(rows.some((l) => l.startsWith(`| \`${id}\` | ${w} | ${s.reading} | \`${blockFurigana(w, s.reading)}\` |`)), `${id} : ligne de l'addendum`);
  }
  assert.equal(blockFurigana('今日', 'きょう'), '<ruby>今日<rt>きょう</rt></ruby>');
});

// Arbitrage du lot 14 : une seule lecture fautive connue, celle de 九つ. La liste rend la lecture
// décidable sans la corriger ; elle ne s'étend pas par détection.
// Passe finale 5.16 (Q5, lot 26) : 頼む y entre par arbitrage, pour ses seuls furigana.
test('lecture fautive connue : liste fermée, deux entrées (九つ, lot 14 ; 頼む, lot 26)', () => {
  assert.deepEqual({ ...READING_EXCEPTION_IDS }, { n5_v_375: '九つ', n5_v_116: '頼む' });
  const s = SOURCES.vocab.find((x) => x.id === 'n5_v_375');
  assert.equal(s.word, '九つ');
  // Le défaut qui justifie l'entrée : kana et furigana concordent sur ここなつ, le romaji dit kokonotsu.
  assert.deepEqual([s.reading, s.word_furigana, s.romaji], ['ここなつ', '<ruby>九<rt>ここな</rt></ruby>つ', 'kokonotsu']);
  // 頼む : kana et romaji justes ; les furigana portent un ノ en katakana, qu'A8 ne détecte pas.
  const t = SOURCES.vocab.find((x) => x.id === 'n5_v_116');
  assert.deepEqual([t.word, t.reading, t.word_furigana, t.romaji], ['頼む', 'たのむ', '<ruby>頼<rt>たノ</rt></ruby>む', 'tanomu']);
  // Distincte des autres listes : ni lecture spéciale (A8), ni graphie fautive, ni forme usuelle décidée.
  for (const id of Object.keys(READING_EXCEPTION_IDS)) {
    for (const list of [SPECIAL_READING_IDS, WORD_EXCEPTION_IDS, USUAL_FORM_IDS]) assert.ok(!Object.hasOwn(list, id), id);
  }
});

test('exceptions de classe du lot 11 : それ, こちら, そちら, どっち, いくつ (classe décidable, liste fermée)', () => {
  for (const [id, word] of [['n5_v_342', 'それ'], ['n5_v_339', 'こちら'], ['n5_v_340', 'そちら'], ['n5_v_343', 'どっち'], ['n5_v_585', 'いくつ']]) {
    assert.equal(CLASS_EXCEPTION_IDS[id], word);
  }
});

// Arbitrage du périmètre du lot 15 : 小さな entre dans la liste parce que sa propre fiche la dit
// adnominale, comme celle de 大きな. L'entrée rend la classe décidable ; elle ne la décide pas.
test('exception de classe du lot 15 : 小さな, adnominale d\'après sa fiche, comme 大きな', () => {
  for (const [id, w] of [['n5_v_441', '大きな'], ['n5_v_446', '小さな']]) {
    assert.equal(CLASS_EXCEPTION_IDS[id], w);
    const s = SOURCES.vocab.find((x) => x.id === id);
    assert.equal(s.type, 'adjectif en na', `${id} : ancien type, qui donnerait adjectif_na`);
    assert.match(s.nuance, /Adjectif adnominal/, `${id} : la fiche justifie l'exception`);
  }
});
