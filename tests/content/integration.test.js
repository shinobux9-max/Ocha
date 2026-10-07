// Intégration content ↔ learning (étape 2 · G1), uniquement par les surfaces publiques :
// src/content/index.js et src/learning/index.js. Le stockage est la version en mémoire.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createContent } from '../../src/content/index.js';
import { createLearning, createEventId, computeState, RECORD_STATUS } from '../../src/learning/index.js';
import { createMemoryStore } from '../../src/store/memory.js';
import { loadRawContent } from '../helpers/content-data.mjs';

const RAW = loadRawContent();
const content = createContent(RAW);

async function open() {
  const learning = createLearning({
    store: createMemoryStore(),
    elementExists: content.elementExists,
    elementsOfScope: content.elementsOfScope,
    now: () => new Date('2026-10-02T08:00:00.000Z'),
    warn: () => {}
  });
  await learning.load();
  return learning;
}

let seq = 0;
const event = (type, payload, context) => ({
  id: createEventId(), type, at: new Date(Date.UTC(2026, 9, 2, 8, 0, ++seq)).toISOString(), context, payload
});
const ONBOARDING = { mode: 'free', source: 'onboarding', activityType: 'declaration' };
const LEARN = { mode: 'free', source: 'learn', activityType: 'lesson' };

test('« Je connais le N5 » : kana et N5 déclarés, ni mots hors JLPT ni expressions (1.5)', async () => {
  const learning = await open();
  const result = await learning.recordLearningEvent(
    event('KNOWLEDGE_DECLARED', { scope: 'n5', origin: 'declared', declarationId: 'dcl_n5' }, ONBOARDING));
  assert.equal(result.status, RECORD_STATUS.RECORDED, JSON.stringify(result.problems || ''));

  const declared = [...content.elementsOfScope('kana'), ...content.elementsOfScope('n5')];
  const { elements } = learning.getSnapshot();
  assert.equal(Object.keys(elements).length, declared.length);
  assert.equal(declared.length, 210 + RAW.levels.n5.grammar.length + RAW.levels.n5.vocab.length + RAW.levels.n5.kanji.chars.length);
  for (const r of declared) assert.equal(computeState(elements[r.id]), 'acquired', r.id);
  for (const w of RAW.vocabHorsJlpt) assert.equal(elements[w.id], undefined, w.id);
  for (const e of RAW.expressions) assert.equal(elements[e.id], undefined, e.id);
});

test('un événement sur un élément qui n\'existe pas est refusé ; un élément existant est accepté', async () => {
  const learning = await open();
  for (const element of [{ type: 'grammar', id: 'g_9999' }, { type: 'kanji', id: '爽' }, { type: 'kana', id: 'kana_ゔ' },
    { type: 'vocab', id: 'v_99999' }]) {
    const r = await learning.recordLearningEvent(event('CONTENT_INTRODUCED', { element }, LEARN));
    assert.equal(r.status, RECORD_STATUS.REJECTED, JSON.stringify(element));
  }
  for (const element of [{ type: 'vocab', id: RAW.vocabHorsJlpt[0].id }, { type: 'kana', id: 'kana_きゃ' },
    { type: 'grammar', id: RAW.levels.n5.grammar[0].id }]) {
    const r = await learning.recordLearningEvent(event('CONTENT_INTRODUCED', { element }, LEARN));
    assert.equal(r.status, RECORD_STATUS.RECORDED, JSON.stringify(element));
  }
  assert.equal(Object.keys(learning.getSnapshot().elements).length, 3);
});
