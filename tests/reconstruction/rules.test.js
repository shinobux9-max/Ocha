// Règles et listes fermées de la reconstruction (A2-04 · 5.0) : chaque identifiant des listes est
// ancré à son mot dans les sources figées ; les tables couvrent exactement ce qu'elles doivent.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  HJ_IDS, RESERVED_RETIRED, TYPE_CLASS, NUMERAL_IDS, CLASS_EXCEPTION_IDS, WORD_EXCEPTION_IDS, USUAL_FORM_IDS, CLASS_GROUPS,
  IDENTITY_GROUPS, HUMAN_FIELDS, EXCEPTION_FIELDS
} from '../../tools/reconstruction/rules.mjs';
import { GROUP_VALUES } from '../../tools/lexicon/schema.mjs';
import { SOURCES, DEPS } from './helpers.mjs';

const word = new Map([...SOURCES.vocab, ...SOURCES.hj].map((s) => [s.id, s.word]));

test('listes d\'exceptions : chaque identifiant désigne bien son mot', () => {
  for (const list of [NUMERAL_IDS, CLASS_EXCEPTION_IDS, WORD_EXCEPTION_IDS, USUAL_FORM_IDS]) {
    for (const [id, w] of Object.entries(list)) assert.equal(word.get(id), w, id);
  }
  assert.equal(Object.keys(NUMERAL_IDS).length, 15);
  assert.equal(Object.keys(CLASS_EXCEPTION_IDS).length, 46);
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

test('forme usuelle décidée : liste fermée, une seule entrée (平仮名, arbitrage du lot 06)', () => {
  assert.deepEqual(Object.keys(USUAL_FORM_IDS), ['n5_v_604']);
  assert.equal(USUAL_FORM_IDS.n5_v_604, '平仮名');
  assert.ok(!Object.keys(USUAL_FORM_IDS).some((id) => Object.hasOwn(WORD_EXCEPTION_IDS, id)), 'distincte des graphies fautives');
});
