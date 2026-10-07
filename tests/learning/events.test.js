// Tests de src/learning/events.js : format commun (partie 3, 3.2), types et charges utiles
// (3.3), références { type, id } (partie 2), invariant 3 de 3.10.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEvent, createEventId, EVENT_TYPES, CONTEXT_VALUES, REF_TYPES
} from '../../src/learning/events.js';

const AT = '2026-10-01T08:00:00.000Z';
const free = { mode: 'free', source: 'practice', activityType: 'quiz', exerciseType: 'qcm' };
const ref = (type, id) => ({ type, id });

// Un événement valide de chacun des 12 types.
const VALID = {
  SESSION_STARTED: { sessionId: 'ses_1', context: { mode: 'guided', source: 'home' },
    payload: { sessionType: 'normal', plannedMinutes: 12, plan: [] } },
  SESSION_COMPLETED: { sessionId: 'ses_1', context: { mode: 'guided', source: 'home' },
    payload: { actualMinutes: 13, completedActivities: [] } },
  SESSION_ABANDONED: { sessionId: 'ses_1', context: { mode: 'guided', source: 'home' },
    payload: { lastActivity: null, actualMinutes: 4 } },
  ACTIVITY_STARTED: { context: { mode: 'free', source: 'explore', activityType: 'mission', activityId: 'n5_m_1' },
    payload: { activityId: 'n5_m_1', activityType: 'mission' } },
  ACTIVITY_COMPLETED: { context: { mode: 'free', source: 'explore', activityType: 'mission', activityId: 'n5_m_1' },
    payload: { activityId: 'n5_m_1', activityType: 'mission', durationSeconds: 300, score: 0.8 } },
  ACTIVITY_SKIPPED: { sessionId: 'ses_1', context: { mode: 'guided', source: 'home', activityType: 'reading' },
    payload: { activityId: 'n5_l_5', activityType: 'reading' } },
  CONTENT_INTRODUCED: { context: { mode: 'free', source: 'learn', activityType: 'lesson', activityId: 'g_8' },
    payload: { element: ref('grammar', 'g_8') } },
  QUESTION_ANSWERED: { context: free,
    payload: { questionId: 'gen:cloze:g_8:ex2', target: [ref('grammar', 'g_8')], correct: false, answer: 'が' } },
  REVIEW_GRADED: { context: { mode: 'free', source: 'review', activityType: 'srs_review', exerciseType: 'flashcard' },
    payload: { element: ref('kanji', '水'), quality: 2 } },
  REINFORCEMENT_TRIGGERED: { sessionId: 'ses_1', context: { mode: 'guided', source: 'home', activityType: 'quiz' },
    payload: { element: ref('vocab', 'v_117'), reason: 'error', sourceActivity: null } },
  KNOWLEDGE_DECLARED: { context: { mode: 'free', source: 'onboarding', activityType: 'declaration' },
    payload: { scope: 'n5', origin: 'declared', declarationId: 'dcl_1' } },
  KNOWLEDGE_DECLARATION_UNDONE: { context: { mode: 'free', source: 'settings', activityType: 'declaration' },
    payload: { declarationId: 'dcl_1' } }
};

const make = (type, changes = {}) => ({ id: 'evt_1', type, at: AT, ...VALID[type], ...changes });
const withPayload = (type, payloadChanges) => make(type, { payload: { ...VALID[type].payload, ...payloadChanges } });
const withContext = (type, contextChanges) => make(type, { context: { ...VALID[type].context, ...contextChanges } });
const invalid = (event, pattern, message) => {
  const problems = validateEvent(event);
  assert.ok(problems.some((p) => pattern.test(p)), `${message} — obtenu : ${JSON.stringify(problems)}`);
};

// ── Types et format commun ──────────────────────────────────────────────────

test('les 12 types d\'événements de la v1, et rien d\'autre (3.3)', () => {
  assert.equal(EVENT_TYPES.length, 12);
  assert.deepEqual(Object.keys(VALID).sort(), [...EVENT_TYPES].sort());
  invalid(make('QUESTION_ANSWERED', { type: 'CARD_FLIPPED' }), /type d'événement inconnu/, 'type inconnu');
});

test('un événement valide de chaque type ne présente aucun problème', () => {
  for (const type of EVENT_TYPES) assert.deepEqual(validateEvent(make(type)), [], type);
});

test('valeurs du contexte et types de référence (3.2, partie 2)', () => {
  assert.deepEqual([...CONTEXT_VALUES.mode], ['guided', 'free']);
  assert.equal(CONTEXT_VALUES.source.length, 11);
  assert.equal(CONTEXT_VALUES.activityType.length, 9);
  assert.equal(CONTEXT_VALUES.exerciseType.length, 9);
  assert.deepEqual([...REF_TYPES], ['grammar', 'vocab', 'kanji', 'kana', 'expression']);
});

test('format commun : id « evt_… », horodatage UTC canonique, champs connus seulement', () => {
  invalid(make('QUESTION_ANSWERED', { id: 'abc' }), /^id/, 'id sans préfixe');
  invalid(make('QUESTION_ANSWERED', { id: 'evt_' }), /^id/, 'id vide après le préfixe');
  for (const at of ['2026-10-01T10:00:00+02:00', '2026-10-01', 'hier', 1727769600000]) {
    invalid(make('QUESTION_ANSWERED', { at }), /^at/, `at = ${at}`);
  }
  assert.deepEqual(validateEvent(make('QUESTION_ANSWERED', { at: '2026-10-01T08:00:00Z' })), []);
  invalid(make('QUESTION_ANSWERED', { extra: 1 }), /champ inconnu « extra »/, 'champ inconnu en tête');
  invalid(withContext('QUESTION_ANSWERED', { device: 'ios' }), /champ inconnu « device »/, 'champ inconnu dans le contexte');
  // `senseId` est défini depuis la publication d'A2-04 (E2) : voir les tests E1 à E3 plus bas.
  assert.deepEqual(validateEvent(null), ['événement : objet attendu']);
});

// ── Vocabulaire et sens : E1 à E3 (schema-A2-01.md), publication d'A2-04 ────

// E1 : une ENTRY s'identifie par `v_<n>`, sans niveau dans l'identifiant.
test('E1 · vocabulaire : forme v_<n> seulement, les anciennes formes à niveau sont refusées', () => {
  for (const id of ['v_1', 'v_117', 'v_718', 'v_1000']) {
    assert.deepEqual(validateEvent(withPayload('CONTENT_INTRODUCED', { element: ref('vocab', id) })), [], id);
  }
  for (const id of ['n5_v_117', 'n4_v_3', 'hj_v_1', 'v_0', 'v_08', 'v_', 'v_8a', 'V_8', 'v_-1', ' v_8', 'v_8_s1', 'g_8']) {
    assert.ok(validateEvent(withPayload('CONTENT_INTRODUCED', { element: ref('vocab', id) })).length > 0, id);
  }
});

// E2 : `senseId` est un champ facultatif de QUESTION_ANSWERED, de forme `v_<n>_s<m>`.
test('E2 · senseId : facultatif dans QUESTION_ANSWERED, de forme v_<n>_s<m>', () => {
  const answered = (payload) => withPayload('QUESTION_ANSWERED', { target: [ref('vocab', 'v_117')], ...payload });
  assert.deepEqual(validateEvent(answered({})), [], 'sans senseId');
  for (const senseId of ['v_117_s1', 'v_117_s2', 'v_117_s12']) assert.deepEqual(validateEvent(answered({ senseId })), [], senseId);
  for (const senseId of ['s1', 'v_117', 'v_117_s0', 'v_117_s01', 'v_117_s', 'n5_v_117_s1', 'v_117_S1', '', null, 1, 'v_117_s1 ']) {
    invalid(answered({ senseId }), /payload\.senseId : identifiant de sens/, `senseId = ${JSON.stringify(senseId)}`);
  }
  // Le champ n'existe que pour une réponse à une question.
  invalid(withPayload('CONTENT_INTRODUCED', { element: ref('vocab', 'v_117'), senseId: 'v_117_s1' }), /champ inconnu « senseId »/, 'hors QUESTION_ANSWERED');
  invalid(withPayload('REVIEW_GRADED', { senseId: 'v_117_s1' }), /champ inconnu « senseId »/, 'dans une révision');
});

// E3 : `senseId` n'est admis que si la cible contient exactement une référence de vocabulaire, et
// s'il désigne un sens de cette ENTRY ; sinon l'événement est rejeté.
test('E3 · senseId : une seule référence de vocabulaire dans la cible, et un sens de cette ENTRY', () => {
  const answered = (target, senseId) => withPayload('QUESTION_ANSWERED', { target, senseId });
  assert.deepEqual(validateEvent(answered([ref('vocab', 'v_117')], 'v_117_s1')), []);
  assert.deepEqual(validateEvent(answered([ref('grammar', 'g_8'), ref('vocab', 'v_117')], 'v_117_s2')), [], 'une seule référence vocab, parmi d\'autres types');
  invalid(answered([ref('grammar', 'g_8')], 'v_117_s1'), /exactement une référence de vocabulaire/, 'aucune référence vocab');
  invalid(answered([ref('vocab', 'v_117'), ref('vocab', 'v_118')], 'v_117_s1'), /exactement une référence de vocabulaire/, 'deux références vocab');
  invalid(answered([ref('vocab', 'v_117')], 'v_118_s1'), /n'est pas un sens de « v_117 »/, 'sens d\'une autre ENTRY');
  invalid(answered([ref('vocab', 'v_11')], 'v_117_s1'), /n'est pas un sens de « v_11 »/, 'préfixe commun, autre ENTRY');
  invalid(answered([ref('vocab', 'v_117')], 'v_1175_s1'), /n'est pas un sens de « v_117 »/, 'identifiant qui prolonge celui de l\'ENTRY');
});

test('sessionId : « ses_… », obligatoire pour les événements de session', () => {
  invalid(make('SESSION_STARTED', { sessionId: undefined }), /sessionId : obligatoire/, 'session sans sessionId');
  invalid(make('QUESTION_ANSWERED', { sessionId: 'x1' }), /sessionId/, 'préfixe');
  assert.deepEqual(validateEvent(make('QUESTION_ANSWERED', { sessionId: 'ses_9' })), []);
});

test('contexte : mode, source et type d\'activité connus ; facultatifs vérifiés', () => {
  invalid(withContext('QUESTION_ANSWERED', { mode: 'auto' }), /context\.mode/, 'mode');
  invalid(withContext('QUESTION_ANSWERED', { source: 'dashboard' }), /context\.source/, 'source');
  invalid(withContext('QUESTION_ANSWERED', { activityType: undefined }), /context\.activityType/, 'type d\'activité absent');
  invalid(withContext('QUESTION_ANSWERED', { exerciseType: 'drag' }), /context\.exerciseType/, 'type d\'exercice');
  invalid(withContext('QUESTION_ANSWERED', { folderId: 'a_revoir' }), /folderId/, 'dossier');
  assert.deepEqual(validateEvent(withContext('QUESTION_ANSWERED', { source: 'folder', folderId: 'fld_1' })), []);
  invalid(make('QUESTION_ANSWERED', { context: undefined }), /^context : objet attendu/, 'sans contexte');
  invalid(withContext('SESSION_STARTED', { activityType: 'quiz' }), /sans objet/, 'type d\'activité sur une session');
});

// ── Références { type, id } ─────────────────────────────────────────────────

test('références : clé connue et identifiant de la bonne forme (partie 1, 1.1)', () => {
  const ok = [ref('grammar', 'g_8'), ref('vocab', 'v_117'), ref('vocab', 'v_718'), ref('vocab', 'v_3'),
    ref('kanji', '水'), ref('kanji', '𠮟'), ref('kana', 'kana_あ'), ref('expression', 'ex_3')];
  for (const r of ok) assert.deepEqual(validateEvent(withPayload('CONTENT_INTRODUCED', { element: r })), [], r.id);
  const ko = [ref('vocabulary', 'v_1'), ref('kanji', 'n5_k_1'), ref('kanji', '水曜'), ref('kana', 'あ'),
    ref('vocab', 'g_8'), ref('grammar', 'v_1'), ref('expression', 'n5_e_1'), ref('vocab', ''),
    { type: 'vocab', id: 'v_1', label: 'x' }, 'v_1'];
  for (const r of ko) {
    assert.ok(validateEvent(withPayload('CONTENT_INTRODUCED', { element: r })).length > 0, JSON.stringify(r));
  }
});

// Addendum A4 · E5 : une leçon s'identifie par `g_<n>`, sans niveau dans l'identifiant.
test('grammaire : forme g_<n> seulement, l\'ancienne forme à niveau est refusée (addendum A4)', () => {
  for (const id of ['g_1', 'g_8', 'g_75', 'g_1000']) {
    assert.deepEqual(validateEvent(withPayload('CONTENT_INTRODUCED', { element: ref('grammar', id) })), [], id);
  }
  for (const id of ['n5_g_8', 'n4_g_1', 'g_0', 'g_08', 'g_', 'g_8a', 'G_8', 'g_-1', ' g_8', 'gen:cloze:g_8:ex1']) {
    assert.ok(validateEvent(withPayload('CONTENT_INTRODUCED', { element: ref('grammar', id) })).length > 0, id);
  }
});

test('l\'existence des éléments est vérifiée par la fonction injectée', () => {
  const catalog = new Set(['grammar:g_8', 'kanji:水']);
  const elementExists = (r) => catalog.has(`${r.type}:${r.id}`);
  assert.deepEqual(validateEvent(make('QUESTION_ANSWERED'), { elementExists }), []);
  const unknown = withPayload('QUESTION_ANSWERED', { target: [ref('grammar', 'g_8'), ref('vocab', 'v_999')] });
  assert.deepEqual(validateEvent(unknown, { elementExists }), ['élément inexistant : vocab v_999']);
  // Sans fonction fournie, aucune vérification d'existence.
  assert.deepEqual(validateEvent(unknown), []);
  // Une déclaration par niveau ne référence aucun élément : rien à vérifier ici.
  assert.deepEqual(validateEvent(make('KNOWLEDGE_DECLARED'), { elementExists: () => false }), []);
});

// ── Charges utiles (3.3) ────────────────────────────────────────────────────

test('QUESTION_ANSWERED : question, cible non vide sans doublon, correct booléen, answer facultatif', () => {
  invalid(withPayload('QUESTION_ANSWERED', { questionId: '' }), /questionId/, 'question');
  invalid(withPayload('QUESTION_ANSWERED', { target: [] }), /payload\.target/, 'cible vide');
  invalid(withPayload('QUESTION_ANSWERED', { target: ref('grammar', 'g_8') }), /payload\.target/, 'cible non liste');
  invalid(withPayload('QUESTION_ANSWERED', { target: [ref('grammar', 'g_8'), ref('grammar', 'g_8')] }),
    /en double/, 'doublon');
  invalid(withPayload('QUESTION_ANSWERED', { correct: 'oui' }), /correct/, 'correct');
  const selfReport = { ...make('QUESTION_ANSWERED'), payload: { questionId: 'q', target: [ref('kanji', '水')], correct: true } };
  assert.deepEqual(validateEvent(selfReport), []);
});

// Partie 3 · 3.10, invariant 3
test('REVIEW_GRADED : note 0 à 3, et seulement dans une révision SRS', () => {
  for (const quality of [-1, 4, 1.5, '2']) invalid(withPayload('REVIEW_GRADED', { quality }), /quality/, String(quality));
  invalid(withContext('REVIEW_GRADED', { activityType: 'quiz', source: 'practice' }), /hors d'une révision SRS/, 'hors SRS');
  for (const quality of [0, 1, 2, 3]) assert.deepEqual(validateEvent(withPayload('REVIEW_GRADED', { quality })), []);
});

test('KNOWLEDGE_DECLARED : éléments OU niveau, origine declared ou tested, identifiant', () => {
  const both = withPayload('KNOWLEDGE_DECLARED', { elements: [ref('vocab', 'v_1')] });
  invalid(both, /exactement un/, 'éléments et niveau');
  const neither = make('KNOWLEDGE_DECLARED', { payload: { origin: 'declared', declarationId: 'd' } });
  invalid(neither, /exactement un/, 'ni l\'un ni l\'autre');
  const elements = make('KNOWLEDGE_DECLARED', { payload: { elements: [ref('vocab', 'v_1')], origin: 'tested', declarationId: 'd' } });
  assert.deepEqual(validateEvent(elements), []);
  invalid(withPayload('KNOWLEDGE_DECLARED', { scope: 'n6' }), /payload\.scope/, 'niveau inconnu');
  invalid(withPayload('KNOWLEDGE_DECLARED', { origin: 'learned' }), /payload\.origin/, 'origine non déclarative');
  invalid(withPayload('KNOWLEDGE_DECLARED', { declarationId: '' }), /declarationId/, 'identifiant');
  for (const scope of ['kana', 'n5', 'n4', 'n3', 'n2', 'n1']) {
    assert.deepEqual(validateEvent(withPayload('KNOWLEDGE_DECLARED', { scope })), [], scope);
  }
});

test('événements de session : format, durées, plan', () => {
  invalid(withPayload('SESSION_STARTED', { sessionType: 'express' }), /sessionType/, 'format');
  invalid(withPayload('SESSION_STARTED', { plannedMinutes: -1 }), /plannedMinutes/, 'durée');
  invalid(withPayload('SESSION_STARTED', { plan: undefined }), /plan/, 'plan');
  invalid(withPayload('SESSION_COMPLETED', { completedActivities: 3 }), /completedActivities/, 'activités');
  invalid(make('SESSION_ABANDONED', { payload: { actualMinutes: 4 } }), /lastActivity/, 'dernière activité');
});

test('événements d\'activité et de renforcement', () => {
  invalid(withPayload('ACTIVITY_STARTED', { activityType: 'game' }), /payload\.activityType/, 'type');
  invalid(withPayload('ACTIVITY_COMPLETED', { durationSeconds: undefined }), /durationSeconds/, 'durée');
  invalid(withPayload('ACTIVITY_COMPLETED', { score: 'bien' }), /score/, 'score');
  invalid(withPayload('ACTIVITY_SKIPPED', { activityId: '' }), /activityId/, 'activité');
  invalid(withPayload('REINFORCEMENT_TRIGGERED', { reason: 'boredom' }), /reason/, 'raison');
  invalid(make('REINFORCEMENT_TRIGGERED', { payload: { element: ref('vocab', 'v_1'), reason: 'error' } }),
    /sourceActivity/, 'activité source');
  invalid(make('CONTENT_INTRODUCED', { payload: undefined }), /payload : objet attendu/, 'sans charge utile');
});

test('validateEvent ne modifie pas l\'événement', () => {
  const e = make('QUESTION_ANSWERED');
  const copy = structuredClone(e);
  validateEvent(e, { elementExists: () => true });
  assert.deepEqual(e, copy);
});

// ── Identifiant ─────────────────────────────────────────────────────────────

test('createEventId : préfixe evt_, aléa injectable, valide pour validateEvent', () => {
  assert.equal(createEventId(() => 'abc'), 'evt_abc');
  const a = createEventId();
  const b = createEventId();
  assert.match(a, /^evt_[0-9a-f-]{36}$/);
  assert.notEqual(a, b);
  assert.deepEqual(validateEvent(make('QUESTION_ANSWERED', { id: a })), []);
});
