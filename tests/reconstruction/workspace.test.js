// Espace de travail (A2-04 · 5.0) : sources figées, aucun lot, rapport généré, data/ intouché.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { verifySources } from '../../tools/reconstruction/sources.mjs';
import { renderLotReport } from '../../tools/reconstruction/report.mjs';
import { assemble, validateAssembly } from '../../tools/reconstruction/assemble.mjs';
import { ROOT, WORK, SOURCES, DEPS, fieldsFor, validated, lot } from './helpers.mjs';

// A2-04 · 5.13-C (addendum A8), fermée : 13 entrées déjà validées avaient des furigana qui
// contredisaient les kana. Elles ont été rouvertes, corrigées par une décision « correction »
// chacune (D0827 à D0839), puis revalidées. Leurs lots sont de nouveau ENTIÈREMENT validés : aucune
// entrée n'y est tolérée en « proposed ». Leur journal compte une décision de plus par entrée
// corrigée, en plus des décisions historiques, dont le nombre n'a pas changé.
const CORRECTED_513C = Object.freeze({
  'lot-00': ['n5_v_555'],
  'lot-01': ['n5_v_15', 'n5_v_16', 'n5_v_28', 'n5_v_283'],
  'lot-03': ['n5_v_229'],
  'lot-05': ['n5_v_77', 'n5_v_223', 'n5_v_640', 'n5_v_694', 'n5_v_715'],
  'lot-08': ['n5_v_643'],
  'lot-09': ['n5_v_190']
});
const FIRST_CORRECTION = 'A2-04-D0827';
// A2-04 · lot 26 « Passe finale » (5.16) : il ne décide aucune entrée nouvelle ; il ROUVRE des ENTRY
// validées dans leur lot d'origine, par des décisions de journal `lot-26` ajoutées à la fin. Trois vues :
//   - l'état RÉEL (readLotsNow, readJournalNow), tel qu'écrit dans les fichiers ;
//   - l'état D'AVANT le lot 26 (readLots, readJournal) : les lots 0 à 25 et leurs 1 569 décisions,
//     chaque ENTRY rouverte étant rendue à l'état validé que sa décision de réouverture conserve en
//     entier dans son champ « avant ». Les tests d'état des lots 0 à 25 lisent cette vue : ce qu'ils
//     contrôlent reste donc vérifié, sur l'état gardé au journal ;
//   - l'ESSAI À BLANC (dryLots, dryJournal) : l'état réel, lot 26 supposé validé. Les tests d'assemblage
//     le lisent ; à la validation du lot 26, il devient l'état réel sans que rien n'y change.
// Lot 26 VALIDÉ le 2026-10-07 (statuts seulement) : l'essai à blanc EST désormais l'état réel, ce que
// lot-26.test.js vérifie (lots et journal identiques). Les tests d'assemblage ci-dessous portent donc
// bien sur l'assemblage réel ; la vue d'avant le lot 26 reste celle des tests d'état des lots 0 à 25.
const LOT26 = 'lot-26';
const readJournalNow = () => JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8'));
const readLotsNow = () => readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(readFileSync(join(WORK, 'lots', f), 'utf8')));
const reopenings26 = () => new Map(readJournalNow().filter((j) => j.lot === LOT26 && j.field === 'entrée').map((j) => [j.entry, j]));
const readJournal = () => readJournalNow().filter((j) => j.lot !== LOT26);
const readLots = () => {
  const reopened = reopenings26();
  return readLotsNow().filter((l) => l.lot !== LOT26).map((l) => ({ ...l, entries: Object.fromEntries(Object.entries(l.entries).map(([id, e]) => {
    const b = reopened.get(id)?.before;
    return [id, b ? { status: b.status, journal: b.journal, fields: b.fields } : e];
  })) }));
};
const asValidated = (x) => ({ ...x, status: 'validated' });
const dryJournal = () => readJournalNow().map(asValidated);
const dryLots = () => readLotsNow().map((l) => ({ ...l, entries: Object.fromEntries(Object.entries(l.entries).map(([id, e]) => [id, asValidated(e)])) }));
// Un lot clos est entièrement validé : aucune entrée proposée, sans exception.
const assertAllValidated = (l) => assert.deepEqual(
  Object.entries(l.entries).filter(([, e]) => e.status !== 'validated').map(([id]) => id), [], `${l.lot} : entièrement validé`);
// Journal d'un lot clos : ses décisions historiques, en nombre attendu ; une correction 5.13-C par
// entrée corrigée, et rien d'autre ; toutes validées.
function assertLotJournal(name, historic) {
  const own = readJournal().filter((j) => j.lot === name);
  const before = own.filter((j) => j.id < FIRST_CORRECTION);
  const after = own.filter((j) => j.id >= FIRST_CORRECTION);
  assert.equal(before.length, historic, `${name} : décisions historiques`);
  assert.deepEqual(after.map((j) => j.entry).sort(), [...(CORRECTED_513C[name] ?? [])].sort(), `${name} : une correction par entrée corrigée`);
  assert.ok(after.every((j) => j.kind === 'correction'), `${name} : corrections 5.13-C`);
  assert.ok(own.every((j) => j.status === 'validated'), `${name} : journal entièrement validé`);
}

// A2-04 · lots 21 à 24 validés le 2026-10-06 : leurs entrées sont dans l'assemblage réel (ou
// retirées par fusion, pour 弱く et ゆっくりと). Le lot 25 (など, retirée sans successeur) est validé le
// 2026-10-07 : plus aucune entrée n'est écartée.
const LOT21_IDS = [494, 519, 506, 554, 500, 503, 501, 502, 518, 540, 425, 454].map((n) => `n5_v_${n}`);
const LOT22_IDS = [504, 505, 525, 450, 628, 438, 421, 605, 521].map((n) => `n5_v_${n}`);
const LOT23_IDS = [593, 599, 416, 596, 418, 417, 595, 413, 344, 586, 584, 600, 499].map((n) => `n5_v_${n}`);
const LOT24_IDS = [654, 447, 655, 520, 639, 509, 497, 498, 515, 471, 607, 517, 496, 546].map((n) => `n5_v_${n}`);
function assertExcludedAfterLot24(a) {
  assert.ok(!a.excluded.some((x) => [...LOT21_IDS, ...LOT22_IDS, ...LOT23_IDS, ...LOT24_IDS].includes(x.entry)), 'les entrées des lots 21 à 24 ne sont plus écartées');
  assert.deepEqual(a.excluded.map((x) => [x.entry, x.reason]), [], 'aucune entrée écartée : など est retirée (lot 25)');
}

test('sources : conformes au manifeste ; une modification est détectée', () => {
  assert.deepEqual(verifySources(join(WORK, 'sources')), []);
  const dir = mkdtempSync(join(tmpdir(), 'ocha-sources-'));
  try {
    cpSync(join(WORK, 'sources'), dir, { recursive: true });
    writeFileSync(join(dir, 'lieux.json'), '[]');
    assert.deepEqual(verifySources(dir).map((p) => p.code), ['source-modifiee']);
    rmSync(join(dir, 'exemples.json'));
    assert.ok(verifySources(dir).some((p) => p.code === 'source-absente'));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// A2-04 · 5.1 fermée : le lot 0 est entièrement validé, avec tout son journal.
test('5.1 : le lot 0 est entièrement validé (60 entrées), sans ajout', () => {
  const lot0 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-00.json'), 'utf8'));
  assert.equal(Object.keys(lot0.entries).length, 60);
  assertAllValidated(lot0);
  assert.deepEqual(lot0.additions, []);
  assertLotJournal('lot-00', 74);
});

// A2-04 · 5.2 fermée : le lot 01 est entièrement validé, avec tout son journal.
test('5.2 : le lot 01 est entièrement validé (49 entrées), journal compris', () => {
  const lot1 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-01.json'), 'utf8'));
  assert.equal(Object.keys(lot1.entries).length, 49);
  assertAllValidated(lot1);
  assert.deepEqual(lot1.additions, []);
  assertLotJournal('lot-01', 66);
});

// A2-04 · 5.3 fermée : le lot 02 est entièrement validé, avec tout son journal.
test('5.3 : le lot 02 est entièrement validé (41 entrées), journal compris', () => {
  const lot2 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-02.json'), 'utf8'));
  assert.equal(Object.keys(lot2.entries).length, 41);
  assert.ok(Object.values(lot2.entries).every((e) => e.status === 'validated'));
  assert.deepEqual(lot2.additions, []);
  const own = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8')).filter((j) => j.lot === 'lot-02');
  assert.equal(own.length, 80);
  assert.ok(own.every((j) => j.status === 'validated'));
});

// A2-04 · 5.4 fermée : le lot 03 est entièrement validé (39 entrées gardées, 掃除する retiré),
// avec tout son journal.
test('5.4 : le lot 03 est entièrement validé (40 entrées dont 1 retrait), journal compris', () => {
  const lot3 = readLots().find((l) => l.lot === 'lot-03'); // お風呂 est rouverte par le lot 26 : état d'avant
  assert.equal(Object.keys(lot3.entries).length, 40);
  assertAllValidated(lot3);
  assert.deepEqual(Object.entries(lot3.entries).filter(([, e]) => e.retire).map(([id, e]) => [id, e.retire.merged_into]), [['n5_v_220', 'n5_v_219']]);
  assert.deepEqual(lot3.additions, []);
  assertLotJournal('lot-03', 72);
});

// A2-04 · 5.5 fermée : le lot 04 est entièrement validé (38 entrées gardées, 出ます fusionné dans
// 出る avec exception à la règle du plus petit numéro), avec tout son journal.
test('5.5 : le lot 04 est entièrement validé (39 entrées dont 1 retrait), journal compris', () => {
  const lot4 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-04.json'), 'utf8'));
  assert.equal(Object.keys(lot4.entries).length, 39);
  assert.ok(Object.values(lot4.entries).every((e) => e.status === 'validated'));
  assert.deepEqual(Object.entries(lot4.entries).filter(([, e]) => e.retire).map(([id, e]) => [id, e.retire.merged_into]), [['n5_v_537', 'n5_v_642']]);
  assert.deepEqual(lot4.additions, []);
  const own = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8')).filter((j) => j.lot === 'lot-04');
  assert.equal(own.length, 62);
  assert.ok(own.every((j) => j.status === 'validated'));
  assert.ok(own.some((j) => j.kind === 'exception-fusion' && j.entry === 'n5_v_537'), 'exception à la règle du plus petit numéro');
});

// A2-04 · 5.6 fermée : le lot 05 est entièrement validé (aucune fusion ; les deux premiers mots
// hors JLPT), avec tout son journal.
test('5.6 : le lot 05 est entièrement validé (37 entrées), journal compris', () => {
  const lot5 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-05.json'), 'utf8'));
  assert.equal(Object.keys(lot5.entries).length, 37);
  assertAllValidated(lot5);
  assert.ok(Object.values(lot5.entries).every((e) => !e.retire), 'aucune fusion dans le lot 05');
  assert.ok(['hj_v_1', 'hj_v_2'].every((id) => lot5.entries[id]), 'les deux mots hors JLPT');
  assert.deepEqual(lot5.additions, []);
  assertLotJournal('lot-05', 55);
});

// A2-04 · 5.7 fermée : le lot 06 est entièrement validé (aucune fusion ; 平仮名 → ひらがな par la
// liste fermée USUAL_FORM_IDS), avec tout son journal.
test('5.7 : le lot 06 est entièrement validé (37 entrées), journal compris', () => {
  const lot6 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-06.json'), 'utf8'));
  assert.equal(Object.keys(lot6.entries).length, 37);
  assert.ok(Object.values(lot6.entries).every((e) => e.status === 'validated'));
  assert.ok(Object.values(lot6.entries).every((e) => !e.retire), 'aucune fusion dans le lot 06');
  assert.equal(lot6.entries.n5_v_604.fields.word, 'ひらがな', 'forme usuelle décidée');
  assert.ok(Object.values(lot6.entries).every((e) => e.fields.counter === null), 'aucun compteur : ce sont des noms comptés (audit 5.7-C)');
  assert.deepEqual(lot6.additions, []);
  const own = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8')).filter((j) => j.lot === 'lot-06');
  assert.equal(own.length, 46);
  assert.ok(own.every((j) => j.status === 'validated'));
});

// A2-04 · 5.8 fermée : le lot 07 est validé (匹, premier compteur), avec tout son journal.
// Une entrée y est ROUVERTE par l'arbitrage du périmètre du lot 17 : 暖かい (n5_v_275), même unité
// lexicale que 温かい (n5_v_8), est retirée par fusion dans celle-ci (A3, L2 et L3 : le plus petit
// numéro survit, sans exception). La réouverture est VALIDÉE, avec le lot 17 : l'entrée cite ses deux
// décisions historiques, intactes, puis la réouverture et la fusion, ajoutées à la fin du journal.
test('5.8 : le lot 07 est validé (34 entrées), dont 暖かい, retirée par fusion dans 温かい', () => {
  const lot7 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-07.json'), 'utf8'));
  assert.equal(Object.keys(lot7.entries).length, 34);
  const others = Object.entries(lot7.entries).filter(([id]) => id !== 'n5_v_275');
  assert.ok(others.every(([, e]) => e.status === 'validated' && e.fields && !e.retire), 'les 33 autres entrées : validées, aucune fusion');
  assert.deepEqual(lot7.entries.n5_v_275, { status: 'validated', journal: ['A2-04-D0476', 'A2-04-D0477', 'A2-04-D1127', 'A2-04-D1128'], retire: { merged_into: 'n5_v_8' } });
  assert.deepEqual(lot7.entries.n5_v_648.fields.counter, { counter_for: ['small_animals'] });
  assert.deepEqual(lot7.additions, []);
  const journal = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8'));
  // Le journal historique du lot 07 n'est pas touché : 48 décisions validées, dont D0476 et D0477.
  const own = journal.filter((j) => j.lot === 'lot-07');
  assert.equal(own.length, 48);
  assert.ok(own.every((j) => j.status === 'validated'));
  const byId = new Map(journal.map((j) => [j.id, j]));
  assert.deepEqual(['A2-04-D0476', 'A2-04-D0477'].map((id) => [byId.get(id).entry, byId.get(id).field, byId.get(id).kind, byId.get(id).status, JSON.stringify(byId.get(id).after)]), [
    ['n5_v_275', 'writings', 'decision', 'validated', '["温かい"]'],
    ['n5_v_275', 'senses', 'abandon', 'validated', 'null']
  ]);
  // D0476 et D0477 ne sont pas modifiées en silence : l'empreinte de leur contenu ENTIER (tous les
  // champs, raison comprise) est celle de leur état validé au lot 07.
  const print = (id) => createHash('sha256').update(JSON.stringify(byId.get(id))).digest('hex');
  assert.equal(print('A2-04-D0476'), '0aa6efc8bb43cfcdb254ae7aa1fa017d8a7ec7a593f29868aa0c27ab000a421d', 'D0476 non modifiée');
  assert.equal(print('A2-04-D0477'), '7b73d11879d1202b5437ff7b43ef4cd6c58731a0b31fb6d60fe30348c9d1c876', 'D0477 non modifiée');
  assert.equal(byId.get('A2-04-D0477').reason, 'Trop large : « chaud » se dit 暑い.');
  // La réouverture garde en entier l'état validé de l'ENTRY ; la fusion suit la règle normale.
  const reopen = byId.get('A2-04-D1127');
  assert.deepEqual([reopen.lot, reopen.entry, reopen.field, reopen.kind, reopen.status], ['lot-17', 'n5_v_275', 'entrée', 'decision', 'validated']);
  assert.deepEqual([reopen.before.lot, reopen.before.status, reopen.before.journal], ['lot-07', 'validated', ['A2-04-D0476', 'A2-04-D0477']]);
  assert.deepEqual(reopen.before.fields.writings, [{ form: '温かい', furigana: '<ruby>温<rt>あたた</rt></ruby>かい' }]);
  assert.deepEqual(reopen.before.fields.senses.map((s) => [s.meaning.primary, ...s.meaning.alternatives, Object.values(s.category).join('/'), s.semantic_type]), [['Doux (agréablement chaud)', 'Tiède', 'monde_naturel/meteo/conditions_atmospheriques', 'propriete']]);
  const fusion = byId.get('A2-04-D1128');
  assert.deepEqual([fusion.lot, fusion.entry, fusion.field, fusion.kind, fusion.status, fusion.after], ['lot-17', 'n5_v_275', 'entrée', 'fusion', 'validated', 'n5_v_8']);
  assert.deepEqual(journal.filter((j) => j.kind === 'exception-fusion').map((j) => j.id), ['A2-04-D0336'], 'aucune exception-fusion nouvelle : le plus petit numéro survit');
});

// Audit 5.7-C : `counter` est réservé aux ENTRY qui sont elles-mêmes des compteurs. Au N5, seul 匹
// (A2-02). Un nom compté (本, 犬, 鉛筆…) n'en porte jamais. Ajouter un compteur exige un arbitrage
// explicite, donc une modification de cette liste.
// Portée : la reconstruction N5 (A2-04). Ce n'est PAS une règle ontologique générale (« Ocha n'a
// qu'un compteur ») : un futur corpus (N4…) qui introduit 枚, 冊, 個, 回… comme ENTRY-compteurs
// fera évoluer ce test.
test('compteurs : seule 匹 porte un counter, dans tous les lots', () => {
  const lots = readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(WORK, 'lots', f), 'utf8')));
  const withCounter = lots.flatMap((l) => Object.entries(l.entries)).filter(([, d]) => d.fields && d.fields.counter !== null).map(([id]) => id);
  assert.deepEqual(withCounter, ['n5_v_648']);
});

// A2-04 · 5.9 fermée : le lot 08 est entièrement validé (aucune fusion), avec tout son journal.
// suru_compatible : true seulement là où la source l'établit (質問) ; false = non établi.
test('5.9 : le lot 08 est entièrement validé (29 entrées), journal compris', () => {
  const lot8 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-08.json'), 'utf8'));
  assert.equal(Object.keys(lot8.entries).length, 29);
  assertAllValidated(lot8);
  assert.ok(Object.values(lot8.entries).every((e) => !e.retire), 'aucune fusion dans le lot 08');
  const suru = Object.entries(lot8.entries).filter(([, e]) => e.fields.suru_compatible).map(([id]) => id);
  assert.deepEqual(suru, ['n5_v_702'], 'seul 質問 a une compatibilité avec する établie par la source');
  assert.deepEqual(lot8.additions, []);
  assertLotJournal('lot-08', 36);
});

// A2-04 · 5.10 fermée : le lot 09 est entièrement validé (散歩する fusionné dans 散歩), avec tout
// son journal. suru_compatible : true seulement quand la source établit la formation du verbe avec
// する (散歩, 旅行, 帰国) ; une construction nom + を + する (スポーツ, 釣り) ne suffit pas.
test('5.10 : le lot 09 est entièrement validé (20 entrées dont 1 retrait), journal compris', () => {
  const lot9 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-09.json'), 'utf8'));
  assert.equal(Object.keys(lot9.entries).length, 20);
  assertAllValidated(lot9);
  assert.deepEqual(Object.entries(lot9.entries).filter(([, e]) => e.retire).map(([id, e]) => [id, e.retire.merged_into]), [['n5_v_194', 'n5_v_193']]);
  const suru = Object.entries(lot9.entries).filter(([, e]) => e.fields && e.fields.suru_compatible).map(([id]) => id);
  assert.deepEqual(suru, ['n5_v_193', 'n5_v_195', 'n5_v_245']);
  assert.deepEqual(lot9.additions, []);
  assertLotJournal('lot-09', 35);
});

// A2-04 · 5.11 fermée : le lot 10 est entièrement validé (aucune fusion), avec tout son journal.
// Les 22 candidats lieu_gare y ont été rejetés un par un : aucun tag dans le lot.
test('5.11 : le lot 10 est entièrement validé (24 entrées), journal compris', () => {
  const lot10 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-10.json'), 'utf8'));
  assert.equal(Object.keys(lot10.entries).length, 24);
  assert.ok(Object.values(lot10.entries).every((e) => e.status === 'validated'));
  assert.ok(Object.values(lot10.entries).every((e) => !e.retire), 'aucune fusion dans le lot 10');
  const tagged = Object.entries(lot10.entries).filter(([, e]) => e.fields.tags.length || e.fields.senses.some((s) => (s.tags || []).length)).map(([id]) => id);
  assert.deepEqual(tagged, [], 'aucun tag de lieu dans le lot 10');
  assert.equal(lot10.entries.n5_v_347.fields.grammatical_class, 'nom', '先 : classe nom');
  assert.deepEqual(lot10.additions, []);
  const own = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8')).filter((j) => j.lot === 'lot-10');
  assert.equal(own.length, 56);
  assert.ok(own.every((j) => j.status === 'validated'));
});

// A2-04 · 5.12 fermée : le lot 11 est entièrement validé (aucune fusion), avec tout son journal.
// Addendum A7 : 私 et あなた portent deictique (deixis de personne) ; 自分 (réfléchi), 誰か
// (indéterminé) et 皆 n'en portent pas. Classes du paradigme décidées sur les fiches.
test('5.12 : le lot 11 est entièrement validé (34 entrées), journal compris', () => {
  const lot11 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-11.json'), 'utf8'));
  assert.equal(Object.keys(lot11.entries).length, 34);
  assert.ok(Object.values(lot11.entries).every((e) => e.status === 'validated'));
  assert.ok(Object.values(lot11.entries).every((e) => !e.retire), 'aucune fusion dans le lot 11');
  const fn = (id) => lot11.entries[id].fields.senses.flatMap((s) => s.linguistic_functions.grammatical);
  assert.deepEqual(fn('n5_v_688'), ['deictique'], '私');
  assert.deepEqual(fn('n5_v_581'), ['deictique'], 'あなた');
  for (const id of ['n5_v_691', 'n5_v_700', 'n5_v_606']) assert.deepEqual(fn(id), [], `${id} : pas de deictique (A7)`);
  const cls = (id) => lot11.entries[id].fields.grammatical_class;
  for (const id of ['n5_v_342', 'n5_v_339', 'n5_v_340', 'n5_v_343', 'n5_v_585']) assert.equal(cls(id), 'pronom', id);
  for (const id of ['n5_v_410', 'n5_v_415', 'n5_v_406', 'n5_v_398', 'n5_v_412']) assert.equal(cls(id), 'determinant', id);
  assert.deepEqual(lot11.additions, []);
  const own = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8')).filter((j) => j.lot === 'lot-11');
  assert.equal(own.length, 104);
  assert.ok(own.every((j) => j.status === 'validated'));
});

// A2-04 · 5.13 fermée : le lot 12 est entièrement validé (aucune fusion, aucun tag de lieu), avec
// tout son journal : 92 décisions initiales (D0735 à D0826) et 5 lectures de la révision 5.13b
// (D0840 à D0844). Premier lot de l'axe temporel d'A7 : 20 sens déictiques, appliqués sens par sens
// (« être un mot temporel ≠ être déictique »), dans 20 entrées ; 11 entrées n'en portent pas. Ce
// test ne vérifie que le lot 12 : il n'impose pas l'axe temporel d'A7 aux lots clos avant lui
// (réservation A2-05).
test('5.13 : le lot 12 est entièrement validé (31 entrées), journal compris', () => {
  const lot12 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-12.json'), 'utf8'));
  assert.equal(Object.keys(lot12.entries).length, 31);
  assertAllValidated(lot12);
  assert.ok(Object.values(lot12.entries).every((e) => !e.retire), 'aucune fusion dans le lot 12');
  const tagged = Object.entries(lot12.entries).filter(([, e]) => e.fields.tags.length || e.fields.senses.some((s) => (s.tags || []).length)).map(([id]) => id);
  assert.deepEqual(tagged, [], 'aucun tag de lieu dans le lot 12');
  const deictic = (e) => e.fields.senses.filter((s) => s.linguistic_functions.grammatical.includes('deictique')).length;
  const entries = Object.values(lot12.entries);
  assert.equal(entries.reduce((n, e) => n + deictic(e), 0), 20, 'sens déictiques (A7, axe du temps)');
  assert.equal(entries.filter((e) => deictic(e) === 0).length, 11, 'entrées sans fonction déictique');
  assert.deepEqual(lot12.additions, []);
  const own = readJournal().filter((j) => j.lot === 'lot-12');
  assert.equal(own.length, 97);
  assert.ok(own.every((j) => j.status === 'validated'));
});

// A2-04 · 5.13b, révision du lot 12 : l'addendum A8 rend décidables cinq lectures, 今年, 今朝, 昨夜
// (liste A, en bloc), 近々 et 夕方 (contradictions), avec une décision « correction » chacune
// (D0840 à D0844) ; les 92 décisions initiales du lot (D0735 à D0826) gardent leur identifiant et
// leur place.
test('5.13b : cinq lectures du lot 12 décidées (D0840 à D0844), et elles seules', () => {
  const lot12 = readLots().find((l) => l.lot === 'lot-12');
  const journal = readJournal();
  const own = journal.filter((j) => j.lot === 'lot-12');
  assert.deepEqual(own.slice(0, 92).map((j) => j.id), Array.from({ length: 92 }, (_, k) => `A2-04-D${String(735 + k).padStart(4, '0')}`));
  const added = own.slice(92);
  assert.deepEqual(added.map((j) => [j.id, j.entry, j.field, j.kind, j.status]), [
    ['A2-04-D0840', 'n5_v_299', 'readings', 'correction', 'validated'],
    ['A2-04-D0841', 'n5_v_303', 'readings', 'correction', 'validated'],
    ['A2-04-D0842', 'n5_v_319', 'readings', 'correction', 'validated'],
    ['A2-04-D0843', 'n5_v_359', 'readings', 'correction', 'validated'],
    ['A2-04-D0844', 'n5_v_439', 'readings', 'correction', 'validated']
  ]);
  // 昨日 (n5_v_320) décidait déjà sa lecture dans la proposition initiale (D0746, furigana source
  // invalides) : sa lecture n'est pas touchée par 5.13b.
  const all = Object.entries(lot12.entries).filter(([, e]) => Object.hasOwn(e.fields, 'readings'));
  assert.deepEqual(all.map(([id]) => id).sort(), ['n5_v_320', ...added.map((j) => j.entry)].sort());
  const decided = all.filter(([id]) => id !== 'n5_v_320');
  const furigana = Object.fromEntries(decided.map(([id, e]) => [id, e.fields.readings.map((r) => [r.kana, r.furigana])]));
  assert.deepEqual(furigana, {
    n5_v_299: [['ことし', '<ruby>今年<rt>ことし</rt></ruby>']],
    n5_v_303: [['けさ', '<ruby>今朝<rt>けさ</rt></ruby>']],
    n5_v_319: [['ゆうべ', '<ruby>昨夜<rt>ゆうべ</rt></ruby>']],
    n5_v_359: [['ちかじか', '<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>じか</rt></ruby>']],
    n5_v_439: [['ゆうがた', '<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>がた</rt></ruby>']]
  });
  for (const [id, e] of decided) assert.equal(e.journal.at(-1), added.find((j) => j.entry === id).id, `${id} : cite sa correction`);
  // 昨日 : bloc par nécessité (A8, §3), décidé par D0746, à sa place et sous le même identifiant.
  const d746 = journal.find((j) => j.id === 'A2-04-D0746');
  assert.deepEqual([d746.entry, d746.field, d746.kind, d746.status, d746.after], ['n5_v_320', 'readings', 'correction', 'validated', '<ruby>昨日<rt>きのう</rt></ruby>']);
  assert.match(d746.reason, /Bloc par nécessité \(addendum A8/);
});

// La fiche source décide : une décision n'attribue une lecture « spéciale » ou « jukujikun » qu'à
// une entrée de la liste fermée d'A8, la seule dont la fiche le dit. Ailleurs, un bloc se justifie
// par la nécessité, pas par une connaissance externe.
test('journal : « jukujikun » n\'est invoqué que pour une entrée de la liste fermée d\'A8', () => {
  const special = ['n5_v_28', 'n5_v_299', 'n5_v_300', 'n5_v_303', 'n5_v_319'];
  const claims = readJournal().filter((j) => /jukujikun/i.test(j.reason) && !special.includes(j.entry));
  assert.deepEqual(claims.map((j) => `${j.id} ${j.entry}`), []);
});

// A2-04 · lot 22 fermé, VALIDÉ le 2026-10-06 : « Manière, identité, diversité et probabilité » (9 entrées, dont 2 retirées
// par fusion ; 9 sens), avec sa proposition de journal (32 décisions, D1404 à D1435), dans sa version
// révisée après l'arbitrage des 16 choix : ゆっくり à deux sens (D1404, D1435) ; まっすぐ, sens 1, en
// parcours et trajectoire ; 同じ en determinant (D1418). Arbitrage du
// périmètre (2026-10-06) : 弱く fusionnée dans 弱い (plus petit numéro, sans exception ni
// réouverture de 弱い, aucun sens nouveau sur 弱い) ; ゆっくりと fusionnée dans ゆっくり, son emploi et
// sa nuance de style en nuance, と non régie ; aucune fonction sans définition normative ;
// « Français » de まっすぐ écarté comme confusion de la source ; aucune relation. Validation atomique :
// statuts seulement, le contenu étant celui de la proposition révisée et vérifiée.
// A2-04 · lot 23 VALIDÉ le 2026-10-06 : « Liaison, échange et formules sociales » (13 entrées, 22
// sens), avec son journal (74 décisions, D1436 à D1509), dans sa version révisée après l'arbitrage
// des 18 choix (じゃ en interjection, D1471). Validation atomique : statuts seulement. Périmètre
// arbitré : じゃ et じゃあ restent deux ENTRY ; un sens par emploi établi par la fiche pour では,
// それでは, じゃ, じゃあ ; « De rien » (いいえ) et « Vraiment » (どうも) en sens distincts ; そうして et
// それから à un seul sens. Fonctions d'A9 posées sens par sens (connecteur, discours, politesse,
// intensifieur), sans catégorie ni type ; l'exemple altéré de いいえ n'est pas repris.
// A2-04 · lot 24 VALIDÉ le 2026-10-06 : « Quantité, degré et comparaison » (14 entrées, 20 sens),
// avec son journal (59 décisions, D1510 à D1568), validé (statuts seulement) dans sa version
// révisée après l'arbitrage des 14 choix (全部 en adverbe, 大勢 en groupe_collectif, imprécision pour
// 大体, sens 1, « Raréfié » et « Suffisamment » gardées). Périmètre
// arbitré : 多い, 少ない et 大勢 sans quantificateur ; 少し à trois sens, ちょっと à deux (sans
// politesse), 結構, 大体 et 一番 à deux ; もっと en cumul comparatif + intensifieur ; とても, あまり,
// たくさん, 全部 à un sens ; ちょうど sans fonction, dimension exactitude ; など hors périmètre.
test('lot 24 : entièrement validé (14 entrées, 20 sens), journal compris ; fonctions d\'A9 selon l\'arbitrage', () => {
  const lots = readLots();
  const lot24 = lots.find((l) => l.lot === 'lot-24');
  assert.equal(lot24.title, 'Quantité, degré et comparaison');
  const E = lot24.entries;
  assert.deepEqual(Object.keys(E), LOT24_IDS, 'périmètre arbitré : 14 entrées, dans l\'ordre du rapport');
  assert.ok(!('n5_v_602' in E), 'など hors périmètre');
  assertAllValidated(lot24);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune fusion');
  assert.deepEqual(lot24.additions, []);
  const journal = readJournal();
  const own = journal.filter((j) => j.lot === 'lot-24');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 59 }, (_, k) => `A2-04-D${String(1510 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated'));
  assert.deepEqual(Object.values(E).flatMap((e) => e.journal), own.map((j) => j.id), 'le lot cite ses 59 décisions, dans l\'ordre');
  // Révision après l'arbitrage des 14 choix : D1568 (dimension de 大体, sens 1) ajoutée à la fin ;
  // D1515 et D1521 réécrites à leur place, de l'abandon au maintien de la traduction.
  assert.deepEqual([own.at(-1).id, own.at(-1).entry, own.at(-1).field], ['A2-04-D1568', 'n5_v_546', 'sens 1 · dimensions']);
  assert.deepEqual(['A2-04-D1515', 'A2-04-D1521'].map((id) => [own.find((j) => j.id === id).kind, own.find((j) => j.id === id).after]), [['decision', 'gardée en alternative du sens 1'], ['decision', 'gardée en alternative du sens 1']]);
  assert.ok(!own.some((j) => j.kind === 'fusion' || j.kind === 'exception-fusion'));
  const senses = (id) => E[id].fields.senses;
  const show = (id) => senses(id).map((s) => [s.meaning.primary, s.category ? Object.values(s.category).join('>') : 'null', s.semantic_type, ...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse].join(':'));
  assert.equal(Object.keys(E).reduce((n, id) => n + senses(id).length, 0), 20);
  assert.deepEqual(show('n5_v_654'), ['Nombreux:nombres_quantification>quantite>grande_quantite:propriete']);
  assert.deepEqual(show('n5_v_447'), ['Peu nombreux:nombres_quantification>quantite>petite_quantite:propriete']);
  assert.deepEqual(show('n5_v_655'), ['Beaucoup de monde:nombres_quantification>quantite>grande_quantite:groupe_collectif']);
  assert.deepEqual([senses('n5_v_447')[0].meaning.alternatives, senses('n5_v_520')[0].meaning.alternatives], [['Raréfié', 'En petite quantité', 'Peu de'], ['En grande quantité', 'Nombreux', 'Suffisamment']]);
  assert.ok(E.n5_v_497.fields.nuance.includes('Euh'), '« Euh… » conservée en nuance');
  assert.deepEqual(show('n5_v_520'), ['Beaucoup:nombres_quantification>quantite>grande_quantite::quantificateur']);
  assert.deepEqual(show('n5_v_639'), ['Tout:nombres_quantification>totalite_partie>totalite::quantificateur']);
  assert.deepEqual(show('n5_v_509'), ['Une petite quantité:nombres_quantification>quantite>petite_quantite::quantificateur', 'Un peu:null::intensifieur', 'Un court instant:temps>duree:concept_abstrait']);
  assert.deepEqual(show('n5_v_497'), ['Un peu:nombres_quantification>quantite>petite_quantite::quantificateur', 'Un instant:temps>duree:concept_abstrait']);
  assert.deepEqual(show('n5_v_498'), ['Très:null::intensifieur']);
  assert.deepEqual(show('n5_v_515'), ['Pas tellement:null::intensifieur']);
  assert.deepEqual(show('n5_v_471'), ['Assez:null::intensifieur', 'Non merci:null::politesse']);
  assert.deepEqual(show('n5_v_607'), ['Plus:null::comparatif:intensifieur']);
  assert.deepEqual(show('n5_v_517'), ['Le plus:null::comparatif', 'Numéro un:nombres_quantification>nombres>ordinaux:concept_abstrait']);
  assert.deepEqual(show('n5_v_496'), ['Exactement:null:propriete']);
  assert.deepEqual(senses('n5_v_496')[0].dimensions, [{ axis: 'exactitude_inexactitude', pole: 'exactitude' }]);
  assert.deepEqual(senses('n5_v_546')[0].dimensions, [{ axis: 'precision_imprecision_ambiguite', pole: 'imprecision_ambiguite' }]);
  assert.deepEqual(show('n5_v_546'), ['À peu près:nombres_quantification>approximation_quantitative:propriete', 'En général:temps>frequence>frequent:concept_abstrait']);
  // Familles : quantificateur et comparatif sont grammaticales ; intensifieur et politesse, pragmatiques.
  for (const id of LOT24_IDS) for (const s of senses(id)) {
    assert.ok(s.linguistic_functions.grammatical.every((x) => ['quantificateur', 'comparatif'].includes(x)), id);
    assert.ok(s.linguistic_functions.pragmatic_discourse.every((x) => ['intensifieur', 'politesse'].includes(x)), id);
  }
  // Classes : quatre décidées, les autres mécaniques.
  assert.deepEqual(own.filter((j) => j.field === 'grammatical_class').map((j) => [j.entry, j.after]), [['n5_v_654', 'adjectif_i'], ['n5_v_520', 'adverbe'], ['n5_v_639', 'adverbe'], ['n5_v_517', 'adverbe']]);
  // Une décision de fonction par sens ; une décision type-nul par type nul ; une seule catégorie nulle
  // sans fonction (ちょうど).
  const count = (kind, re) => own.filter((j) => j.kind === kind && re.test(j.field)).length;
  assert.deepEqual([count('decision', / · linguistic_functions$/), count('type-nul', / · semantic_type$/), count('categorie-nulle', / · category$/), count('decision', / · dimensions$/), count('decision', /^senses$/), count('abandon', /^senses$/), count('abandon', /^nuance$/), count('decision', /^relations$/)], [20, 11, 1, 2, 16, 2, 1, 2]); // 16 decisions « senses » : 14 découpages et 2 maintiens de traduction (D1515, D1521)
  assert.ok(own.filter((j) => / · linguistic_functions$/.test(j.field)).every((j) => j.reason.includes('A9') || j.reason.includes('lot 24')));
  // L'exemple fautif de あまり : journalisé, ni repris ni corrigé.
  assert.ok(!JSON.stringify(E.n5_v_515.fields).includes('ににく') && !JSON.stringify(E.n5_v_515.fields).includes('にくを'));
  // Toute traduction de la source est gardée ou abandonnée.
  const dropped = (id) => own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses').flatMap((j) => j.before);
  for (const [id, e] of Object.entries(E)) {
    const keptT = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const m = SOURCES.vocab.find((x) => x.id === id).meanings;
    const gone = dropped(id);
    const strip = (t) => t.replace(/ \(.*\)$/, '');
    assert.deepEqual([m.primary, ...(m.secondary ?? [])].filter((x) => !keptT.has(x) && !keptT.has(strip(x)) && !gone.includes(x)), [], `${id} : traduction de la source ni gardée ni abandonnée`);
    // Une traduction abandonnée n'est pas gardée.
    assert.deepEqual(gone.filter((x) => keptT.has(x) || keptT.has(strip(x))), [], `${id} : traduction à la fois gardée et abandonnée`);
    // Particules : celles de la fiche pour chaque sens d'une entrée à plusieurs sens ; mécaniques (absentes
    // du lot) pour un sens unique. Aucune relation.
    const src = SOURCES.vocab.find((x) => x.id === id);
    if (e.fields.senses.length > 1) assert.ok(e.fields.senses.every((x) => JSON.stringify(x.particles) === JSON.stringify(src.particles ?? [])), `${id} : particules hors fiche`);
    else assert.ok(!Object.hasOwn(e.fields.senses[0], 'particles'), `${id} : particules d'un sens unique décidées`);
    assert.ok(e.fields.senses.every((x) => x.relations.length === 0), `${id} : relation posée`);
    // Chaque sens porte exactement les fonctions que sa décision du journal pose.
    e.fields.senses.forEach((x, k) => {
      const dec = own.find((j) => j.entry === id && j.field === `sens ${k + 1} · linguistic_functions`);
      if (dec) assert.deepEqual(dec.after, x.linguistic_functions, `${id}, sens ${k + 1} : fonctions différentes de leur décision`);
    });
  }
});

// Le lot 24 dans l'assemblage RÉEL (l'essai à blanc d'avant la validation en est devenu l'état réel).
test('lot 24 : dans l\'assemblage réel (684 ENTRY, 35 retraits, aucune entrée écartée), sans problème ni erreur', () => {
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assert.deepEqual(a.excluded, [], 'など retirée au lot 25');
  assert.equal(r.warnings.length, 148, 'un seul avertissement nouveau : la catégorie nulle de ちょうど, justifiée');
  assert.deepEqual(r.warnings.filter((w) => w.where.includes('v_496')).map((w) => w.code), ['categorie-nulle']);
  const byId = new Map(a.files.flatMap((f) => f.entries).map((e) => [e.id, e]));
  assert.deepEqual(['v_654', 'v_520', 'v_639', 'v_517'].map((id) => byId.get(id).linguistic.grammatical_class), ['adjectif_i', 'adverbe', 'adverbe', 'adverbe']);
  assert.deepEqual([byId.get('v_654').senses[0].particles, byId.get('v_655').senses[0].particles], [['が'], ['の']]);
});

test('lot 23 : entièrement validé (13 entrées, 22 sens), journal compris ; fonctions d\'A9, sans catégorie ni type', () => {
  const lots = readLots();
  const lot23 = lots.find((l) => l.lot === 'lot-23');
  assert.equal(lot23.title, 'Liaison, échange et formules sociales');
  const E = lot23.entries;
  assert.deepEqual(Object.keys(E), LOT23_IDS, 'périmètre arbitré : 13 entrées, dans l\'ordre du rapport');
  assertAllValidated(lot23);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune fusion');
  assert.deepEqual(lot23.additions, []);
  const journal = readJournal();
  const own = journal.filter((j) => j.lot === 'lot-23');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 74 }, (_, k) => `A2-04-D${String(1436 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated'));
  assert.deepEqual(Object.values(E).flatMap((e) => e.journal), own.map((j) => j.id), 'le lot cite ses 74 décisions, dans l\'ordre');
  assert.ok(!own.some((j) => j.kind === 'fusion' || j.kind === 'exception-fusion'), 'じゃ et じゃあ : aucune fusion');
  const senses = Object.fromEntries(Object.entries(E).map(([id, e]) => [id, e.fields.senses]));
  const fns = (id) => senses[id].map((s) => [s.meaning.primary, ...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse].join(':'));
  assert.deepEqual(Object.values(senses).flat().length, 22);
  assert.ok(Object.values(senses).flat().every((s) => s.category === null && s.semantic_type === null && s.dimensions.length === 0 && s.relations.length === 0 && s.linguistic_functions.grammatical.length === 0));
  assert.deepEqual(fns('n5_v_593'), ['Cependant:connecteur']);
  assert.deepEqual(fns('n5_v_416'), ['Ensuite:connecteur']);
  assert.deepEqual(fns('n5_v_596'), ['Et puis:connecteur']);
  assert.deepEqual(fns('n5_v_418'), ['Dans ce cas:connecteur', 'Eh bien:discours', 'Alors:discours:politesse']);
  assert.deepEqual(fns('n5_v_417'), ['Dans ce cas:connecteur', 'Alors:discours', 'Sur ce:discours:politesse']);
  assert.deepEqual(fns('n5_v_595'), ['Dans ce cas:connecteur', 'Bon:discours', 'Alors:discours']);
  assert.deepEqual(fns('n5_v_413'), ['Alors:connecteur', 'Eh bien:discours']);
  assert.deepEqual(fns('n5_v_344'), ['Oui:discours']);
  assert.deepEqual(fns('n5_v_584'), ['Non:discours', 'De rien:politesse']);
  assert.deepEqual(fns('n5_v_600'), ['S\'il vous plaît:politesse']);
  assert.deepEqual(fns('n5_v_499'), ['Merci:politesse', 'Vraiment:intensifieur']);
  // Classes : dix décidées (exceptions consignées), trois mécaniques (では, はい, どうも).
  const cls = own.filter((j) => j.field === 'grammatical_class').map((j) => [j.entry, j.after]);
  assert.deepEqual(cls, [['n5_v_593', 'conjonction'], ['n5_v_599', 'conjonction'], ['n5_v_416', 'conjonction'], ['n5_v_596', 'conjonction'], ['n5_v_417', 'conjonction'], ['n5_v_595', 'interjection'], ['n5_v_413', 'conjonction'], ['n5_v_586', 'interjection'], ['n5_v_584', 'interjection'], ['n5_v_600', 'adverbe']]);
  assert.ok(['n5_v_418', 'n5_v_344', 'n5_v_499'].every((id) => !Object.hasOwn(E[id].fields, 'grammatical_class')));
  // Chaque sens : une décision de fonction et une décision type-nul ; aucune categorie-nulle (la
  // fonction justifie l'absence, A5).
  const count = (kind, re) => own.filter((j) => j.kind === kind && re.test(j.field)).length;
  assert.deepEqual([count('decision', / · linguistic_functions$/), count('type-nul', / · semantic_type$/), count('categorie-nulle', /./), count('decision', /^senses$/), count('abandon', /^senses$/), count('decision', /^relations$/), count('abandon', /^nuance$/)], [22, 22, 0, 13, 2, 4, 1]);
  assert.ok(own.filter((j) => / · linguistic_functions$/.test(j.field)).every((j) => j.reason.includes('A9')));
  // L'exemple altéré de いいえ : journalisé, ni repris ni remplacé.
  const iie = own.find((j) => j.entry === 'n5_v_584' && j.field === 'nuance');
  assert.equal(iie.kind, 'abandon');
  for (const bad of ['ちが', 'chigai', 'ちigai', 'masu']) assert.ok(!JSON.stringify(E.n5_v_584.fields).includes(bad), `いいえ : « ${bad} » repris`);
  // Toute traduction de la source est gardée ou abandonnée.
  const dropped = (id) => own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses').flatMap((j) => j.before);
  for (const [id, e] of Object.entries(E)) {
    const keptT = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const m = SOURCES.vocab.find((x) => x.id === id).meanings;
    const gone = dropped(id);
    const strip = (t) => t.replace(/ \(.*\)$/, '');
    assert.deepEqual([m.primary, ...(m.secondary ?? [])].filter((x) => !keptT.has(x) && !keptT.has(strip(x)) && !gone.includes(x)), [], `${id} : traduction de la source ni gardée ni abandonnée`);
    // Une traduction abandonnée n'est pas gardée.
    assert.deepEqual(gone.filter((x) => keptT.has(x) || keptT.has(strip(x))), [], `${id} : traduction à la fois gardée et abandonnée`);
    // Particules : celles de la fiche pour chaque sens d'une entrée à plusieurs sens ; mécaniques (absentes
    // du lot) pour un sens unique. Aucune relation.
    const src = SOURCES.vocab.find((x) => x.id === id);
    if (e.fields.senses.length > 1) assert.ok(e.fields.senses.every((x) => JSON.stringify(x.particles) === JSON.stringify(src.particles ?? [])), `${id} : particules hors fiche`);
    else assert.ok(!Object.hasOwn(e.fields.senses[0], 'particles'), `${id} : particules d'un sens unique décidées`);
    assert.ok(e.fields.senses.every((x) => x.relations.length === 0), `${id} : relation posée`);
    // Chaque sens porte exactement les fonctions que sa décision du journal pose.
    e.fields.senses.forEach((x, k) => {
      const dec = own.find((j) => j.entry === id && j.field === `sens ${k + 1} · linguistic_functions`);
      if (dec) assert.deepEqual(dec.after, x.linguistic_functions, `${id}, sens ${k + 1} : fonctions différentes de leur décision`);
    });
  }
  // また (lot 21) n'est pas rouverte.
  const lot21 = lots.find((l) => l.lot === 'lot-21');
  assert.equal(lot21.entries.n5_v_500.status, 'validated');
  assert.deepEqual(lot21.entries.n5_v_500.fields.senses[1].linguistic_functions, { grammatical: [], pragmatic_discourse: [] });
});

// Le lot 23 dans l'assemblage RÉEL (l'essai à blanc d'avant la validation en est devenu l'état réel).
test('lot 23 : dans l\'assemblage réel (684 ENTRY, 35 retraits, aucune entrée écartée), sans problème ni erreur', () => {
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assertExcludedAfterLot24(a);
  assert.equal(r.warnings.length, 148, 'le lot 23 n\'en ajoute aucun : chaque sens porte une fonction ; le 148e est ちょうど (lot 24)');
  const byId = new Map(a.files.flatMap((f) => f.entries).map((e) => [e.id, e]));
  assert.ok(byId.has('v_595') && byId.has('v_413'), 'じゃ et じゃあ : deux ENTRY');
  assert.deepEqual(['v_593', 'v_418', 'v_595', 'v_413', 'v_344', 'v_586', 'v_600', 'v_499'].map((id) => byId.get(id).linguistic.grammatical_class), ['conjonction', 'conjonction', 'interjection', 'conjonction', 'interjection', 'interjection', 'adverbe', 'adverbe']);
  assert.deepEqual(byId.get('v_418').senses.map((s) => s.id), ['v_418_s1', 'v_418_s2', 'v_418_s3']);
});

test('lot 22 : entièrement validé (9 entrées, 2 fusions, 9 sens), journal compris ; aucune fonction ni relation', () => {
  const lots = readLots();
  const lot22 = lots.find((l) => l.lot === 'lot-22');
  assert.equal(lot22.title, 'Manière, identité, diversité et probabilité');
  const E = lot22.entries;
  assert.deepEqual(Object.keys(E), LOT22_IDS, 'périmètre arbitré : 9 entrées, dans l\'ordre du rapport');
  assertAllValidated(lot22);
  assert.deepEqual(lot22.additions, []);
  // Fusions : règle normale du plus petit numéro, sans exception-fusion.
  assert.deepEqual(Object.entries(E).filter(([, e]) => e.retire).map(([id, e]) => [id, e.retire.merged_into]), [['n5_v_505', 'n5_v_504'], ['n5_v_450', 'n5_v_449']]);
  const journal = readJournal();
  const own = journal.filter((j) => j.lot === 'lot-22');
  assert.ok(!own.some((j) => j.kind === 'exception-fusion'));
  assert.deepEqual(own.filter((j) => j.kind === 'fusion').map((j) => [j.entry, j.after]), [['n5_v_505', 'n5_v_504'], ['n5_v_450', 'n5_v_449']]);
  // 弱い n'est pas rouverte : son statut, ses décisions et son contenu validé sont intacts.
  const lot17 = lots.find((l) => l.lot === 'lot-17');
  assert.deepEqual([lot17.entries.n5_v_449.status, lot17.entries.n5_v_449.journal], ['validated', ['A2-04-D1137', 'A2-04-D1138', 'A2-04-D1139']]);
  assert.deepEqual(lot17.entries.n5_v_449.fields.senses.map((s) => s.meaning), [{ primary: 'Faible', alternatives: ['Fragile'] }]);
  const show = (s) => `${[s.meaning.primary, ...s.meaning.alternatives].join(' | ')} @ ${s.category ? Object.values(s.category).join('/') : 'null'} # ${s.semantic_type}${Object.hasOwn(s, 'particles') ? ` # ${s.particles.join('')}` : ''}`;
  const kept = Object.entries(E).filter(([, e]) => e.fields);
  assert.deepEqual(Object.fromEntries(kept.map(([id, e]) => [id.replace('n5_v_', ''), e.fields.senses.map(show)])), {
    504: ['Lentement @ espace_proprietes_spatiales/vitesse # propriete # ', 'Tranquillement | À son aise @ null # propriete # '],
    525: ['Tout droit | Directement @ espace_proprietes_spatiales/parcours_trajectoire # propriete # ', 'Honnête @ null # propriete # '],
    628: ['Ensemble | En compagnie de @ relations_sociales/interactions_sociales # etat'],
    438: ['Même | Identique | Pareil @ null # propriete'],
    421: ['Divers | Varié | Différents | Plusieurs sortes de @ null # propriete'],
    605: ['Autre | Le reste @ null # concept_abstrait'],
    521: ['Peut-être | Probablement | Vraisemblablement @ null # null']
  });
  const senses = kept.flatMap(([, e]) => e.fields.senses);
  assert.equal(senses.length, 9, 'sens du lot');
  assert.ok(senses.every((s) => s.relations.length === 0), 'relations : aucune');
  assert.ok(senses.every((s) => s.linguistic_functions.grammatical.length === 0 && s.linguistic_functions.pragmatic_discourse.length === 0), 'aucune fonction sans définition normative');
  assert.deepEqual(kept.flatMap(([id, e]) => e.fields.senses.map((s, k) => [id, k + 1, s.dimensions]).filter(([, , d]) => d.length)), [['n5_v_521', 1, [{ axis: 'probabilite', pole: 'probabilite' }]]]);
  // と n'est pas une particule régie de ゆっくり ; aucune particule hors de la fiche. « Prendre son temps »
  // est dit en nuance du sens 2 ; « gitaigo » en nuance générale.
  for (const [id, e] of kept) {
    const source = SOURCES.vocab.find((x) => x.id === id).particles ?? [];
    assert.deepEqual(e.fields.senses.flatMap((s) => s.particles ?? []).filter((p) => !source.includes(p)), [], `${id} : particule absente de la fiche`);
  }
  assert.ok(E.n5_v_504.fields.senses.every((s) => s.particles.length === 0));
  assert.ok(E.n5_v_504.fields.senses[1].nuance.includes('prendre son temps') && E.n5_v_504.fields.nuance.includes('gitaigo'));
  assert.ok(E.n5_v_504.fields.nuance.includes('ゆっくりと') && E.n5_v_504.fields.nuance.includes('formel ou littéraire'), 'emploi ゆっくりと conservé en nuance');
  assert.ok(kept.every(([, e]) => e.fields.tags.length === 0 && e.fields.writings.length === 0 && e.fields.counter === null && e.fields.suru_compatible === false && e.fields.suffix === false));
  // Lectures, classes et groupes décidés : 一緒 et 同じ seuls.
  assert.deepEqual(kept.filter(([, e]) => Object.hasOwn(e.fields, 'readings')).map(([id]) => id), ['n5_v_628', 'n5_v_438']);
  assert.deepEqual(E.n5_v_628.fields.readings, [{ kana: 'いっしょ', romaji: 'issho', furigana: '<ruby>一<rt>いっ</rt></ruby><ruby>緒<rt>しょ</rt></ruby>', default: true, note: null }]);
  assert.ok(SOURCES.vocab.find((x) => x.id === 'n5_v_628').example.japanese.includes(E.n5_v_628.fields.readings[0].furigana));
  assert.deepEqual(E.n5_v_438.fields.readings, [{ kana: 'おなじ', romaji: 'onaji', furigana: '<ruby>同<rt>おな</rt></ruby>じ', default: true, note: null }]);
  assert.deepEqual([E.n5_v_628.fields.grammatical_class, E.n5_v_628.fields.group, E.n5_v_438.fields.grammatical_class, E.n5_v_438.fields.group], ['nom', 'nom', 'determinant', null]);
  assert.ok(E.n5_v_438.fields.nuance.includes('« adjectif en na »') && E.n5_v_438.fields.nuance.includes('sans な'), '同じ : la description de la fiche gardée en nuance');
  assert.ok(kept.every(([, e]) => !Object.hasOwn(e.fields, 'word')));
  // まっすぐ : « Français » écarté, sans traduction de remplacement.
  const text = JSON.stringify(kept.map(([, e]) => e.fields));
  assert.ok(!text.includes('Français') && !text.includes('Franc'));
  assert.ok(own.some((j) => j.entry === 'n5_v_525' && j.kind === 'abandon' && j.before.includes('Français (pour une direction ou un caractère)') && /^Confusion de la source, écartée/.test(j.reason)));
  for (const bad of ['なにかります', 'なに か ります', 'guasubi', 'お同じ']) assert.ok(!text.includes(bad), bad);
  // Journal : 32 décisions validées, D1404 à D1435, citées par le lot et par lui seul. Les 31
  // premières sont à leur place ; D1435 (catégorie nulle de ゆっくり, sens 2) est venue à la fin, à la
  // révision.
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 32 }, (_, k) => `A2-04-D${String(1404 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated' && j.date === '2026-10-06'));
  assert.deepEqual(Object.values(E).flatMap((e) => e.journal).filter((id) => id !== 'A2-04-D1435'), own.slice(0, 31).map((j) => j.id), 'le lot cite ses 31 premières décisions, dans l\'ordre');
  assert.deepEqual([E.n5_v_504.journal.at(-1), own.at(-1).entry, own.at(-1).field, own.at(-1).kind], ['A2-04-D1435', 'n5_v_504', 'sens 2 · category', 'categorie-nulle']);
  // Les points de la révision, et leurs raisons.
  const reasonOf = (id) => own.find((j) => j.id === id).reason;
  assert.deepEqual(own.find((j) => j.id === 'A2-04-D1404').after, ['S1 Lentement', 'S2 Tranquillement, à son aise']);
  assert.ok(reasonOf('A2-04-D1409').includes('parcours et trajectoire') && !reasonOf('A2-04-D1409').includes('orientation, type'));
  assert.deepEqual(own.find((j) => j.id === 'A2-04-D1418').after, 'determinant');
  assert.ok(reasonOf('A2-04-D1405').includes('sens 2'));
  const others = lots.filter((l) => l.lot !== 'lot-22').flatMap((l) => Object.values(l.entries).flatMap((e) => e.journal ?? []));
  assert.ok(!others.some((id) => id >= 'A2-04-D1404' && id <= 'A2-04-D1435'), 'aucun autre lot ne cite une décision du lot 22');
  const count = (kind, field) => own.filter((j) => j.kind === kind && field.test(j.field)).length;
  assert.deepEqual([count('decision', /^senses$/), count('abandon', /^senses$/), count('fusion', /^entrée$/), count('categorie-nulle', / · category$/), count('type-nul', / · semantic_type$/),
    count('decision', / · dimensions$/), count('decision', / · linguistic_functions$/), count('decision', /^relations$/), count('correction', /^readings$/), count('decision', /^grammatical_class$/), count('decision', /nuance$/), count('abandon', /nuance$/)],
  [7, 5, 2, 6, 1, 1, 4, 0, 2, 2, 1, 1]);
  const fn = own.filter((j) => / · linguistic_functions$/.test(j.field));
  assert.deepEqual(fn.map((j) => [j.entry, j.after]), [['n5_v_438', []], ['n5_v_421', []], ['n5_v_605', []], ['n5_v_521', []]]);
  assert.ok(fn[0].reason.includes('comparatif') && fn[1].reason.includes('quantificateur') && fn[2].reason.includes('alternative') && fn[3].reason.includes('modalite'));
  // Toute traduction de la source d'une entrée gardée est gardée ou abandonnée.
  const dropped = (id) => own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses').flatMap((j) => j.before);
  for (const [id, e] of kept) {
    const keptT = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const gone = dropped(id);
    assert.deepEqual(gone.filter((x) => keptT.has(x)), [], `${id} : traduction à la fois gardée et abandonnée`);
    const m = SOURCES.vocab.find((x) => x.id === id).meanings;
    assert.deepEqual([m.primary, ...(m.secondary ?? [])].filter((x) => !keptT.has(x) && !gone.includes(x)), [], `${id} : traduction de la source ni gardée ni abandonnée`);
  }
});

// Le lot 22 dans l'assemblage RÉEL (l'essai à blanc d'avant la validation en est devenu l'état
// réel) : 657 ENTRY, 34 retraits, 28 entrées encore à décider ; six catégories nulles et un type nul
// de plus, tous justifiés au journal ; 弱い et ゆっくり survivent, 弱く et ゆっくりと sont retirées vers
// elles.
test('lot 22 : dans l\'assemblage réel (684 ENTRY, 35 retraits, aucune entrée écartée), sans problème ni erreur', () => {
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assertExcludedAfterLot24(a);
  assert.equal(r.warnings.length, 148);
  const ids = new Set(['v_504', 'v_525', 'v_628', 'v_438', 'v_421', 'v_605', 'v_521']);
  const mine = r.warnings.filter((w) => ids.has(w.where.split(' · ')[1]));
  assert.deepEqual(mine.map((w) => [w.code, w.where.split(' · ').at(-1)]).sort(), [['categorie-nulle', 'v_421_s1'], ['categorie-nulle', 'v_438_s1'], ['categorie-nulle', 'v_504_s2'], ['categorie-nulle', 'v_521_s1'], ['categorie-nulle', 'v_525_s2'], ['categorie-nulle', 'v_605_s1'], ['type-nul', 'v_521_s1']]);
  assert.deepEqual([a.retired.find((x) => x.id === 'v_505'), a.retired.find((x) => x.id === 'v_450')], [{ id: 'v_505', merged_into: 'v_504' }, { id: 'v_450', merged_into: 'v_449' }]);
  const byId = new Map(a.files.flatMap((f) => f.entries).map((e) => [e.id, e]));
  assert.ok(!byId.has('v_505') && !byId.has('v_450'));
  assert.deepEqual([byId.get('v_449').word, byId.get('v_449').senses.length, byId.get('v_504').word], ['弱い', 1, 'ゆっくり']);
  assert.deepEqual([byId.get('v_628').linguistic.grammatical_class, byId.get('v_628').senses[0].particles, byId.get('v_438').linguistic.grammatical_class, byId.get('v_438').readings[0].kana], ['nom', ['に'], 'determinant', 'おなじ']);
});

// A2-04 · lot 21 fermé, VALIDÉ le 2026-10-06 : « Fréquence, répétition et repères temporels » (12 entrées : 11 adverbes,
// 1 adjectif ; 16 sens), avec sa proposition de journal (34 décisions, D1370 à D1403), dans sa
// version révisée après l'arbitrage des 21 choix : la remarque ii / yoi de よく conservée en nuance
// du sens 2, attribuée à la fiche (D1375) ; また, sens 2, sans type (A6, D1403). Arbitrage du
// périmètre (2026-10-06) : aucune fonction sans définition normative ; aucune entrée ne porte
// deictique, すぐに compris (contrairement à 近々) ; よく reste une ENTRY distincte de いい, sans
// fusion ni réouverture de v_420 ; aucune relation, aucune candidate à 5.16. Validation atomique :
// statuts seulement, le contenu étant celui de la proposition révisée et vérifiée.
test('lot 21 : entièrement validé (12 entrées, 16 sens), journal compris ; aucune fonction ni relation', () => {
  const lots = readLots();
  const lot21 = lots.find((l) => l.lot === 'lot-21');
  assert.equal(lot21.title, 'Fréquence, répétition et repères temporels');
  const E = lot21.entries;
  assert.deepEqual(Object.keys(E), LOT21_IDS, 'périmètre arbitré : 12 entrées, dans l\'ordre du rapport');
  assertAllValidated(lot21);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune entrée du lot n\'est retirée');
  assert.deepEqual(lot21.additions, []);
  // Hors du lot : les cinq adverbes de manière, et いい (v_420), qui n'est pas rouverte.
  assert.ok(!['n5_v_504', 'n5_v_505', 'n5_v_525', 'n5_v_450', 'n5_v_628'].some((id) => id in E), 'les adverbes de manière sont hors du lot 21');
  const lot0 = lots.find((l) => l.lot === 'lot-00');
  assert.deepEqual([lot0.entries.n5_v_420.status, lot0.entries.n5_v_420.journal], ['validated', ['A2-04-D0036', 'A2-04-D0037', 'A2-04-D0053', 'A2-04-D0065']], 'いい n\'est pas touchée');
  const show = (s) => `${[s.meaning.primary, ...s.meaning.alternatives].join(' | ')} @ ${s.category ? Object.values(s.category).join('/') : 'null'} # ${s.semantic_type}${Object.hasOwn(s, 'particles') ? ` # ${s.particles.join('')}` : ''}`;
  assert.deepEqual(Object.fromEntries(Object.entries(E).map(([id, e]) => [id.replace('n5_v_', ''), e.fields.senses.map(show)])), {
    494: ['Toujours | Habituellement | En tout temps @ temps/frequence/frequent # concept_abstrait'],
    519: ['Généralement | La plupart du temps | En général | Presque toujours @ temps/frequence/frequent # concept_abstrait'],
    506: ['Souvent | Fréquemment @ temps/frequence/frequent # concept_abstrait # ', 'Bien | Habilement @ null # propriete # '],
    554: ['Parfois | De temps en temps | Quelquefois @ temps/frequence/occasionnel # concept_abstrait'],
    500: ['À nouveau | Encore @ null # concept_abstrait # ', 'Aussi | De plus @ null # null # '],
    503: ['Encore une fois | Une autre fois | De nouveau @ null # concept_abstrait'],
    501: ['Encore @ temps/relations_temporelles # concept_abstrait # ', 'Pas encore @ temps/relations_temporelles # concept_abstrait # '],
    502: ['Déjà @ temps/relations_temporelles # concept_abstrait # ', 'Ne… plus @ temps/relations_temporelles # concept_abstrait # '],
    518: ['Tout de suite | Immédiatement | Aussitôt | Sans tarder @ temps/relations_temporelles # concept_abstrait'],
    540: ['Pour la première fois @ temps/chronologie/succession # concept_abstrait'],
    425: ['Graduellement | Peu à peu | Progressivement @ null # concept_abstrait'],
    454: ['Tôt | Précoce @ temps # propriete']
  });
  const senses = Object.values(E).flatMap((e) => e.fields.senses);
  assert.equal(senses.length, 16, 'sens du lot');
  // Arbitrage du périmètre : aucune relation, aucune fonction (pas même deictique), aucune dimension.
  assert.ok(senses.every((s) => s.relations.length === 0), 'relations : aucune');
  assert.ok(senses.every((s) => s.linguistic_functions.grammatical.length === 0 && s.linguistic_functions.pragmatic_discourse.length === 0), 'aucune fonction, pas de deictique');
  assert.ok(senses.every((s) => s.dimensions.length === 0), 'aucune dimension');
  // Aucune particule hors de la fiche ; aucun tag, graphie, suffixe, compteur ; aucune forme ni classe.
  for (const [id, e] of Object.entries(E)) {
    const source = SOURCES.vocab.find((x) => x.id === id).particles ?? [];
    assert.deepEqual(e.fields.senses.flatMap((s) => s.particles ?? []).filter((p) => !source.includes(p)), [], `${id} : particule absente de la fiche`);
  }
  assert.ok(Object.values(E).every((e) => e.fields.tags.length === 0 && e.fields.writings.length === 0 && e.fields.counter === null && e.fields.suru_compatible === false && e.fields.suffix === false));
  assert.ok(Object.values(E).every((e) => !Object.hasOwn(e.fields, 'word') && !Object.hasOwn(e.fields, 'grammatical_class') && !Object.hasOwn(e.fields, 'group')));
  // Lecture : もう一度 seule, avec les furigana de l'exemple de sa fiche (A8).
  assert.deepEqual(Object.keys(E).filter((id) => Object.hasOwn(E[id].fields, 'readings')), ['n5_v_503']);
  assert.deepEqual(E.n5_v_503.fields.readings, [{ kana: 'もういちど', romaji: 'mouichido', furigana: 'もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></ruby>', default: true, note: null }]);
  assert.ok(SOURCES.vocab.find((x) => x.id === 'n5_v_503').example.japanese.includes(E.n5_v_503.fields.readings[0].furigana));
  // Anomalies de la source non reprises : exemples altérés, traduction fautive, remarques d'origine.
  const text = JSON.stringify(Object.values(E).map((e) => [e.fields.nuance, e.fields.senses.map((s) => s.nuance ?? null)]));
  for (const bad of ['じchiじ', 'きた まし た', 'Regardons-nous', 'hajimeru', 'itération']) assert.ok(!text.includes(bad), bad);
  // よく : la remarque ii / yoi, conservée seulement en nuance du sens 2, et attribuée à la fiche.
  assert.equal(E.n5_v_506.fields.senses[1].nuance, 'Une action faite de manière approfondie ou satisfaisante. La fiche indique cet emploi « bien / habilement » comme issu de ii / yoi.');
  assert.ok(!/yoi|いい/.test(JSON.stringify([E.n5_v_506.fields.nuance, E.n5_v_506.fields.senses[0].nuance])), 'la remarque n\'est que dans le sens 2');
  assert.ok(E.n5_v_454.fields.nuance.includes('速い'), '早い : la distinction de la fiche est conservée');
  // Journal : 34 décisions validées, D1370 à D1403, citées par le lot et par lui seul. Les 33
  // premières sont à leur place, entrée par entrée ; D1403 (type nul de また, sens 2) est venue à la
  // fin, à la révision.
  const journal = readJournal();
  const own = journal.filter((j) => j.lot === 'lot-21');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 34 }, (_, k) => `A2-04-D${String(1370 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated' && j.date === '2026-10-06'));
  assert.deepEqual(Object.values(E).flatMap((e) => e.journal).filter((id) => id !== 'A2-04-D1403'), own.slice(0, 33).map((j) => j.id), 'le lot cite ses 33 premières décisions, dans l\'ordre');
  assert.deepEqual(E.n5_v_500.journal.at(-1), 'A2-04-D1403');
  assert.deepEqual(own.slice(33).map((j) => [j.id, j.entry, j.field, j.kind, j.before, j.after]), [['A2-04-D1403', 'n5_v_500', 'sens 2 · semantic_type', 'type-nul', 'concept_abstrait', null]]);
  // Les points de la révision, et leurs raisons.
  const reasonOf = (id) => own.find((j) => j.id === id).reason;
  assert.ok(reasonOf('A2-04-D1403').includes('A6') && reasonOf('A2-04-D1403').includes('type de secours'));
  assert.ok(!reasonOf('A2-04-D1378').includes('adresse') && reasonOf('A2-04-D1378').includes('emploi de prise de congé') && reasonOf('A2-04-D1378').includes('D1403'));
  assert.deepEqual([own.find((j) => j.id === 'A2-04-D1375').kind, own.find((j) => j.id === 'A2-04-D1375').field], ['decision', 'sens 2 · nuance']);
  assert.ok(own.every((j) => E[j.entry]?.journal.includes(j.id)));
  const others = lots.filter((l) => l.lot !== 'lot-21').flatMap((l) => Object.values(l.entries).flatMap((e) => e.journal ?? []));
  assert.ok(!others.some((id) => id >= 'A2-04-D1370' && id <= 'A2-04-D1403'), 'aucun autre lot ne cite une décision du lot 21');
  const count = (kind, field) => own.filter((j) => j.kind === kind && field.test(j.field)).length;
  assert.deepEqual([count('decision', /^senses$/), count('abandon', /^senses$/), count('categorie-nulle', / · category$/), count('type-nul', / · semantic_type$/),
    count('decision', / · linguistic_functions$/), count('decision', /^relations$/), count('correction', /^readings$/), count('decision', /nuance$/), count('abandon', /nuance$/)],
  [12, 2, 5, 1, 6, 0, 1, 2, 5]);
  // Fonctions : six décisions disent qu'aucune n'est posée ; すぐに refuse deictique au regard de 近々.
  const fn = own.filter((j) => / · linguistic_functions$/.test(j.field));
  assert.deepEqual(fn.map((j) => [j.entry, j.field, j.after]), [['n5_v_500', 'sens 2 · linguistic_functions', []], ['n5_v_501', 'sens 1 · linguistic_functions', []], ['n5_v_502', 'sens 1 · linguistic_functions', []],
    ['n5_v_518', 'sens 1 · linguistic_functions', []], ['n5_v_540', 'sens 1 · linguistic_functions', []], ['n5_v_425', 'sens 1 · linguistic_functions', []]]);
  assert.ok(fn.every((j) => j.reason.includes('aucun addendum')));
  const sugu = fn.find((j) => j.entry === 'n5_v_518').reason;
  assert.ok(sugu.includes('deictique') && sugu.includes('近々') && sugu.includes('A7'));
  // よく : deux sens, sans fusion ; la remarque d'origine n'est pas reprise, et aucune relation n'en vient.
  const yoku = own.filter((j) => j.entry === 'n5_v_506');
  assert.ok(yoku[0].reason.includes('ENTRY distincte de いい') && yoku[0].reason.includes('v_420'));
  assert.ok(yoku.some((j) => j.kind === 'decision' && j.field === 'sens 2 · nuance' && j.reason.includes('5.16') && j.reason.includes('v_420')));
  // Toute traduction de la source est gardée ou abandonnée, sauf les deux reformulées : « Pas encore
  // (…) » et « Plus (avec une négation) », dont la remarque d'emploi passe en nuance.
  const MOVED = { n5_v_501: ['Pas encore (lorsqu\'il est associé à une négation)'], n5_v_502: ['Plus (avec une négation)'] };
  const dropped = (id) => own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses').flatMap((j) => j.before);
  for (const [id, e] of Object.entries(E)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const gone = dropped(id);
    assert.deepEqual(gone.filter((x) => kept.has(x)), [], `${id} : traduction à la fois gardée et abandonnée`);
    const m = SOURCES.vocab.find((x) => x.id === id).meanings;
    assert.deepEqual([m.primary, ...(m.secondary ?? [])].filter((x) => !kept.has(x) && !gone.includes(x)), MOVED[id] ?? [], `${id} : traduction de la source ni gardée ni abandonnée`);
  }
});

// Le lot 21 dans l'assemblage RÉEL (l'essai à blanc d'avant la validation en est devenu l'état
// réel) : 650 ENTRY, 32 retraits, 37 entrées encore à décider ; cinq catégories nulles et un type nul
// (また, sens 2) de plus, tous justifiés au journal.
test('lot 21 : dans l\'assemblage réel (684 ENTRY, 35 retraits, aucune entrée écartée), sans problème ni erreur', () => {
  const lots = readLots();
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assertExcludedAfterLot24(a);
  assert.equal(r.warnings.length, 148);
  const ids = new Set(LOT21_IDS.map((id) => id.replace('n5_', '')));
  const mine = r.warnings.filter((w) => ids.has(w.where.split(' · ')[1]));
  assert.deepEqual(mine.map((w) => [w.code, w.where.split(' · ').at(-1)]).sort(), [['categorie-nulle', 'v_425_s1'], ['categorie-nulle', 'v_500_s1'], ['categorie-nulle', 'v_500_s2'], ['categorie-nulle', 'v_503_s1'], ['categorie-nulle', 'v_506_s2'], ['type-nul', 'v_500_s2']]);
  const byId = new Map(a.files.flatMap((f) => f.entries).map((e) => [e.id, e]));
  const mineEntries = [...ids].map((id) => byId.get(id));
  assert.equal(mineEntries.filter((e) => e.linguistic.grammatical_class === 'adverbe').length, 11);
  assert.deepEqual([byId.get('v_454').linguistic.grammatical_class, byId.get('v_454').linguistic.group], ['adjectif_i', 'i']);
  // Particule de すぐに : celle de la fiche, reprise mécaniquement pour son sens unique.
  assert.deepEqual(byId.get('v_518').senses[0].particles, ['に']);
  assert.deepEqual(byId.get('v_503').readings[0].furigana, 'もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></ruby>');
  // よく et いい : deux ENTRY.
  assert.deepEqual([byId.get('v_506').word, byId.get('v_420').word], ['よく', 'いい']);
});

// A2-04 · lot 20 fermé : « Existence, possession, action et déroulement », entièrement validé (22
// entrées : les 14 derniers verbes et 8 noms ; 30 sens), avec tout son journal (68 décisions, D1302
// à D1369), dans sa
// version révisée après l'arbitrage des 25 choix : « Y avoir » en traduction principale de ある et de
// 居る ; « être achevé » (出来る) en resultat ; le prix (する) et かかる en propriete ; 次 et 声 sans
// catégorie ; trois dimensions, là où un axe d'A2-DIM décrit directement le sens (要る, 出来る, 違う).
// Arbitrage du
// périmètre : aucune fonction linguistique sans définition normative (ni modalite pour 出来る, ni
// aspect pour なる, ni deictique pour 次) ; aucune relation (report à 5.16 ; する / やる et やる /
// 上げる sont inscrites comme candidates) ; suffix pour 辺 ; la graphie 掛かる pour かかる, en bloc, et
// aucune pour 居る ; le tag lieu_gare de 次 refusé. Le lot « quantité et degré » reste fermé : 他 et
// 大勢 n'y sont pas. Les sens, catégories, types et particules suivent chaque fiche : ce ne sont PAS
// des règles générales.
const LOT20_IDS = [516, 548, 665, 573, 523, 524, 361, 544, 181, 608, 698, 547, 470, 163, 645, 675, 684, 664, 703, 511, 646, 653].map((n) => `n5_v_${n}`);
test('lot 20 : entièrement validé (22 entrées, 30 sens), journal compris ; aucune relation, aucune fonction linguistique', () => {
  const lots = readLots();
  const lot20 = lots.find((l) => l.lot === 'lot-20');
  assert.equal(lot20.title, 'Existence, possession, action et déroulement');
  const E = lot20.entries;
  assert.deepEqual(Object.keys(E), LOT20_IDS, 'périmètre arbitré : 22 entrées, dans l\'ordre du rapport');
  assertAllValidated(lot20);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune entrée du lot n\'est retirée');
  assert.deepEqual(lot20.additions, []);
  // Le lot « quantité et degré » reste fermé : ni 他 ni 大勢 ne sont décidées, dans aucun lot.
  // 他 n'est décidée qu'au lot 22 (périmètre arbitré le 2026-10-06), 大勢 qu'au lot 24.
  assert.deepEqual(lots.filter((l) => 'n5_v_605' in l.entries).map((l) => l.lot), ['lot-22']);
  assert.deepEqual(lots.filter((l) => 'n5_v_655' in l.entries).map((l) => l.lot), ['lot-24']);
  const show = (s) => `${[s.meaning.primary, ...s.meaning.alternatives].join(' | ')} @ ${s.category ? Object.values(s.category).join('/') : 'null'} # ${s.semantic_type}${Object.hasOwn(s, 'particles') ? ` # ${s.particles.join('')}` : ''}`;
  // Traductions, catégorie, type et particules exacts de chaque sens : rien n'y entre sans décision.
  assert.deepEqual(Object.fromEntries(Object.entries(E).map(([id, e]) => [id.replace('n5_v_', ''), e.fields.senses.map(show)])), {
    516: ["Y avoir | Exister | Se trouver (pour les objets inanimés) @ null # etat # がに", "Posséder @ null # etat # が"],
    548: ["Y avoir (pour les êtres vivants) | Être | Se trouver @ null # etat"],
    665: ["Tenir | Porter (en main) | Avoir sur soi @ null # action # を", "Posséder @ null # etat # を"],
    573: ["Avoir besoin de | Être nécessaire | Falloir @ null # etat"],
    523: ["Pouvoir | Être capable de @ etre_humain/capacites_aptitudes/aptitude # etat # が", "Être achevé / prêt @ null # resultat # が"],
    524: ["Devenir | Se transformer en @ null # evenement"],
    361: ["Être différent @ null # etat # ", "Être incorrect | Se tromper @ null # etat # "],
    544: ["Avoir des ennuis | Être embarrassé | Être en difficulté @ etre_humain/psychologie_esprit/etats_psychologiques # etat"],
    181: ["Faire @ null # action # を", "Coûter (pour un prix) | Valoir @ economie_commerce/prix_valeur_economique/prix # propriete # "],
    608: ["Faire | Jouer (à un jeu, un sport) @ null # action # を", "Donner (à des plantes, des animaux) @ null # action # を"],
    698: ["Voir | Regarder | Examiner | Observer @ etre_humain/sens_perception/vue # action"],
    547: ["Commencer | Débuter @ temps/chronologie/debut_fin # evenement"],
    470: ["Finir | Terminer | Prendre fin | S'achever @ temps/chronologie/debut_fin # evenement"],
    163: ["Prendre (du temps ou de l'argent) | Coûter @ null # propriete"],
    645: ["Début | Commencement @ temps/chronologie/debut_fin # concept_abstrait"],
    675: ["Suivant | Prochain | Ensuite @ null # concept_abstrait"],
    684: ["Chose | Objet | Article @ null # objet_artefact"],
    664: ["Endroit | Lieu | Place @ espace_proprietes_spatiales/position_localisation # lieu # ", "Partie @ null # concept_abstrait # "],
    703: ["Environs | Alentours | Région | Quartier @ espace_proprietes_spatiales/distance_proximite/proximite # lieu"],
    511: ["Problème @ null # concept_abstrait # ", "Question (d'examen) @ education_apprentissage/evaluation_scolaire/examens # information_contenu # "],
    646: ["Force | Puissance | Énergie @ null # propriete"],
    653: ["Voix | Cri (d'animal) @ null # null"]
  });
  const senses = Object.values(E).flatMap((e) => e.fields.senses);
  assert.equal(senses.length, 30, 'sens du lot');
  // Arbitrage du périmètre : aucune relation, aucune fonction linguistique, pour aucun sens.
  assert.ok(senses.every((s) => s.relations.length === 0), 'relations : report intégral à 5.16');
  assert.ok(senses.every((s) => s.linguistic_functions.grammatical.length === 0 && s.linguistic_functions.pragmatic_discourse.length === 0), 'aucune fonction sans définition normative');
  // Dimensions : trois, et elles seules, avec les identifiants exacts du registre A2-DIM.
  assert.deepEqual(Object.entries(E).flatMap(([id, e]) => e.fields.senses.map((s, k) => [id, k + 1, s.dimensions]).filter(([, , d]) => d.length)), [
    ['n5_v_573', 1, [{ axis: 'necessite_facultativite', pole: 'necessite' }]],
    ['n5_v_523', 1, [{ axis: 'possibilite_impossibilite', pole: 'possibilite' }]],
    ['n5_v_361', 2, [{ axis: 'exactitude_inexactitude', pole: 'inexactitude' }]]
  ]);
  // Une particule décidée est une particule de la fiche : aucune n'est tirée d'un exemple.
  for (const [id, e] of Object.entries(E)) {
    const source = SOURCES.vocab.find((x) => x.id === id).particles ?? [];
    assert.deepEqual(e.fields.senses.flatMap((s) => s.particles ?? []).filter((p) => !source.includes(p)), [], `${id} : particule absente de la fiche`);
  }
  // suffix : 辺 seule, la fiche disant « nom / suffixe ». Tags : aucun, lieu_gare étant refusé pour 次.
  assert.deepEqual(Object.keys(E).filter((id) => E[id].fields.suffix), ['n5_v_703']);
  assert.ok(Object.values(E).every((e) => e.fields.tags.length === 0 && e.fields.counter === null && e.fields.suru_compatible === false));
  // Graphies : 掛かる pour かかる, avec les furigana de la fiche, en bloc ; aucune pour 居る.
  assert.deepEqual(Object.keys(E).filter((id) => E[id].fields.writings.length), ['n5_v_163']);
  assert.deepEqual(E.n5_v_163.fields.writings, [{ form: '掛かる', furigana: '<ruby>掛かる<rt>かかる</rt></ruby>' }]);
  // Lectures : deux corrections ; 出来る en bloc par nécessité (A8, §3). Aucune forme, aucune classe.
  assert.deepEqual(Object.keys(E).filter((id) => Object.hasOwn(E[id].fields, 'readings')), ['n5_v_523', 'n5_v_645']);
  assert.deepEqual(E.n5_v_523.fields.readings, [{ kana: 'できる', romaji: 'dekiru', furigana: '<ruby>出来<rt>でき</rt></ruby>る', default: true, note: null }]);
  assert.deepEqual(E.n5_v_645.fields.readings, [{ kana: 'はじめ', romaji: 'hajime', furigana: '<ruby>初<rt>はじ</rt></ruby>め', default: true, note: null }]);
  assert.ok(Object.values(E).every((e) => !Object.hasOwn(e.fields, 'word') && !Object.hasOwn(e.fields, 'grammatical_class') && !Object.hasOwn(e.fields, 'group')));
  // Anomalies de la source non reprises : l'exemple de 要る (ぱソコン).
  const nuances = JSON.stringify(Object.values(E).map((e) => [e.fields.nuance, e.fields.senses.map((s) => s.nuance ?? null)]));
  assert.ok(!nuances.includes('ぱソコン'));
  // 始める, que la fiche de 始まる nomme, reste en nuance ; ce n'est pas une entrée. 居る et 要る se
  // renvoient l'une à l'autre en nuance, sans fusion.
  assert.ok(E.n5_v_547.fields.nuance.includes('始める') && !SOURCES.vocab.some((x) => x.word === '始める'));
  assert.ok(E.n5_v_573.fields.nuance.includes('居る'));
  // Journal : 68 décisions validées, D1302 à D1369, citées par le lot et par lui seul. Les 64
  // premières sont à leur place, entrée par entrée ; D1366 à D1368 (dimensions) et D1369 (catégorie
  // nulle de 声) sont venues à la fin, à la révision.
  const journal = readJournal();
  const own = journal.filter((j) => j.lot === 'lot-20');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 68 }, (_, k) => `A2-04-D${String(1302 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated' && j.date === '2026-10-06'));
  const REVISION = ['A2-04-D1366', 'A2-04-D1367', 'A2-04-D1368', 'A2-04-D1369'];
  assert.deepEqual(Object.values(E).flatMap((e) => e.journal).filter((id) => !REVISION.includes(id)), own.slice(0, 64).map((j) => j.id), 'le lot cite ses 64 premières décisions, dans l\'ordre');
  assert.deepEqual(own.slice(64).map((j) => [j.id, j.entry, j.field, j.kind, j.after]), [
    ['A2-04-D1366', 'n5_v_573', 'sens 1 · dimensions', 'decision', [{ axis: 'necessite_facultativite', pole: 'necessite' }]],
    ['A2-04-D1367', 'n5_v_523', 'sens 1 · dimensions', 'decision', [{ axis: 'possibilite_impossibilite', pole: 'possibilite' }]],
    ['A2-04-D1368', 'n5_v_361', 'sens 2 · dimensions', 'decision', [{ axis: 'exactitude_inexactitude', pole: 'inexactitude' }]],
    ['A2-04-D1369', 'n5_v_653', 'sens 1 · category', 'categorie-nulle', null]
  ]);
  assert.ok(own.every((j) => E[j.entry]?.journal.includes(j.id)), 'chaque décision porte sur une entrée du lot, qui la cite');
  // Les points de la révision, et leurs raisons.
  const reasonOf = (id) => own.find((j) => j.id === id).reason;
  assert.deepEqual([E.n5_v_516.fields.senses[0].meaning.primary, E.n5_v_548.fields.senses[0].meaning.primary], ['Y avoir', 'Y avoir (pour les êtres vivants)']);
  assert.deepEqual([E.n5_v_523.fields.senses[1].semantic_type, E.n5_v_181.fields.senses[1].semantic_type, E.n5_v_163.fields.senses[0].semantic_type], ['resultat', 'propriete', 'propriete']);
  assert.match(reasonOf('A2-04-D1316'), /resultat pour l'achèvement/);
  assert.deepEqual([E.n5_v_675.fields.senses[0].category, E.n5_v_653.fields.senses[0].category, E.n5_v_653.fields.senses[0].semantic_type], [null, null, null]);
  assert.deepEqual([own.find((j) => j.id === 'A2-04-D1351').kind, own.find((j) => j.id === 'A2-04-D1351').field], ['categorie-nulle', 'sens 1 · category']);
  assert.ok(reasonOf('A2-04-D1351').includes('« dans l\'ordre, le temps ou l\'espace »') && !/sens et perception › ouïe, ce que l'on entend/.test(reasonOf('A2-04-D1364')));
  const others = lots.filter((l) => l.lot !== 'lot-20').flatMap((l) => Object.values(l.entries).flatMap((e) => e.journal ?? []));
  assert.ok(!others.some((id) => id >= 'A2-04-D1302' && id <= 'A2-04-D1369'), 'aucun autre lot ne cite une décision du lot 20');
  assert.deepEqual(Object.keys(E).filter((id) => E[id].journal.length === 0), [], 'chaque entrée du lot a au moins une décision');
  const count = (kind, field) => own.filter((j) => j.kind === kind && field.test(j.field)).length;
  assert.deepEqual([count('decision', /^senses$/), count('abandon', /^senses$/), count('categorie-nulle', / · category$/), count('decision', / · category$/), count('type-nul', / · semantic_type$/),
    count('decision', / · linguistic_functions$/), count('decision', /^relations$/), count('decision', /^writings$/), count('correction', /^readings$/), count('decision', /^tags$/), count('decision', /^suffix$/),
    count('decision', /^nuance$/), count('abandon', /^nuance$/)],
  [19, 9, 20, 0, 1, 4, 3, 2, 2, 1, 1, 1, 2]);
  assert.equal(count('decision', / · dimensions$/), 3);
  // Fonctions : quatre décisions disent qu'aucune n'est posée, et pourquoi (existence, modalite,
  // aspect, deictique).
  const fn = own.filter((j) => / · linguistic_functions$/.test(j.field));
  assert.deepEqual(fn.map((j) => [j.entry, j.before, j.after]), [['n5_v_516', null, []], ['n5_v_523', null, []], ['n5_v_524', null, []], ['n5_v_675', null, []]]);
  assert.ok(fn[1].reason.includes('modalite') && fn[2].reason.includes('aspect') && fn[3].reason.includes('deictique') && fn[3].reason.includes('A7'));
  assert.ok(fn.every((j) => j.reason.includes('aucun addendum')));
  // Candidates à l'audit des relations de 5.16 : する / やる (des deux côtés) et やる / 上げる ; 上げる,
  // validée au lot 19, n'est pas modifiée. Ni 始まる / 終わる ni 見る / 見せる ne sont inscrites.
  const rel = own.filter((j) => j.field === 'relations');
  assert.deepEqual(rel.map((j) => [j.entry, j.kind, j.before, j.after]), [['n5_v_181', 'decision', null, []], ['n5_v_608', 'decision', null, []], ['n5_v_608', 'decision', null, []]]);
  assert.ok(rel[0].reason.includes('する / やる') && rel[0].reason.includes('n5_v_608') && rel[1].reason.includes('する / やる') && rel[1].reason.includes('n5_v_181'));
  assert.ok(rel[2].reason.includes('やる / 上げる') && rel[2].reason.includes('n5_v_527'));
  assert.ok(rel.every((j) => j.reason.includes('5.16') && j.reason.includes('candidate')));
  const lot19 = lots.find((l) => l.lot === 'lot-19');
  assert.deepEqual([lot19.entries.n5_v_527.status, lot19.entries.n5_v_527.journal.some((id) => id >= 'A2-04-D1302')], ['validated', false], '上げる n\'est pas touchée');
  // Les arbitrages portés par une décision : le tag refusé, le suffixe, la graphie non ajoutée.
  const find = (entry, field) => own.find((j) => j.entry === entry && j.field === field);
  assert.deepEqual([find('n5_v_675', 'tags').before, find('n5_v_675', 'tags').after], [['lieu_gare'], []]);
  assert.deepEqual([find('n5_v_703', 'suffix').before, find('n5_v_703', 'suffix').after], [false, true]);
  assert.deepEqual(find('n5_v_548', 'writings').after, []);
  assert.deepEqual(find('n5_v_163', 'writings').after, ['掛かる']);
  // Une traduction gardée dans un sens n'est pas aussi abandonnée ; toute traduction de la source est
  // gardée ou abandonnée, sauf « Commencer (intransitif) », gardée sans sa parenthèse de grammaire.
  const MOVED = { n5_v_547: ['Commencer (intransitif)'] };
  const dropped = (id) => own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses').flatMap((j) => j.before);
  for (const [id, e] of Object.entries(E)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const gone = dropped(id);
    assert.deepEqual(gone.filter((x) => kept.has(x)), [], `${id} : traduction à la fois gardée et abandonnée`);
    const m = SOURCES.vocab.find((x) => x.id === id).meanings;
    assert.deepEqual([m.primary, ...(m.secondary ?? [])].filter((x) => !kept.has(x) && !gone.includes(x)), MOVED[id] ?? [], `${id} : traduction de la source ni gardée ni abandonnée`);
  }
  assert.equal(E.n5_v_547.fields.senses[0].meaning.primary, 'Commencer');
});

// Le lot 20 dans l'assemblage RÉEL (l'essai à blanc d'avant la validation en est devenu l'état
// réel) : ses 22 ENTRY, leurs classes, leurs lectures, leurs particules ; plus aucun verbe à décider.
test('lot 20 : dans l\'assemblage réel (684 ENTRY, 35 retraits, aucune entrée écartée), 14 verbes et 8 noms sans relation ni fonction', () => {
  const lots = readLots();
  const journal = readJournal();
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assertExcludedAfterLot24(a);
  // Il ne reste aucun verbe à décider.
  assert.deepEqual(a.excluded.map((x) => SOURCES.vocab.find((e) => e.id === x.entry).type).filter((ty) => ty.startsWith('verbe')), []);
  // Avertissements : les 113 des lots 0 à 19 et les 6 du lot 21 ; pour le lot, 20 catégories nulles
  // et un type nul (声), justifiés au journal.
  assert.equal(r.warnings.length, 148);
  const ids = new Set(LOT20_IDS.map((id) => id.replace('n5_', '')));
  const mine = r.warnings.filter((w) => ids.has(w.where.split(' · ')[1]));
  assert.deepEqual(mine.filter((w) => w.code !== 'categorie-nulle').map((w) => [w.code, w.where.split(' · ').at(-1)]), [['type-nul', 'v_653_s1']]);
  assert.deepEqual(mine.filter((w) => w.code === 'categorie-nulle').map((w) => w.where.split(' · ').at(-1)).sort(), ['v_163_s1', 'v_181_s1', 'v_361_s1', 'v_361_s2', 'v_511_s1', 'v_516_s1', 'v_516_s2', 'v_523_s2', 'v_524_s1', 'v_548_s1', 'v_573_s1', 'v_608_s1', 'v_608_s2', 'v_646_s1', 'v_653_s1', 'v_664_s2', 'v_665_s1', 'v_665_s2', 'v_675_s1', 'v_684_s1']);
  const all = a.files.flatMap((f) => f.entries);
  const byId = new Map(all.map((e) => [e.id, e]));
  const mineEntries = [...ids].map((id) => byId.get(id));
  assert.ok(mineEntries.every((e) => e && e.senses.every((s) => s.linguistic_functions.grammatical.length === 0)), 'les 22 ENTRY existent, sans fonction');
  // Relations : aucune au lot 20 ; celle que le lot 26 note sur する (R8), et elle seule.
  assert.deepEqual(mineEntries.flatMap((e) => e.senses.flatMap((s) => s.relations.map((x) => `${s.id} ${x.type} ${x.target}`))), ['v_181_s1 equivalent_to v_608_s1']);
  assert.equal(mineEntries.filter((e) => e.linguistic.grammatical_class === 'verbe').length, 14);
  assert.deepEqual(mineEntries.filter((e) => e.linguistic.grammatical_class === 'nom').map((e) => e.word), ['初め', '次', '物', '所', '辺', '問題', '力', '声']);
  // suffix : 半 (lot 13) et 辺, et elles seules, dans tout le corpus.
  assert.deepEqual(all.filter((e) => e.linguistic.suffix).map((e) => e.word).sort(), ['半', '辺'].sort());
  // Homophones 居る et 要る : deux ENTRY, de groupes différents ; する garde son groupe irrégulier.
  assert.deepEqual([byId.get('v_548').word, byId.get('v_548').linguistic.group, byId.get('v_573').word, byId.get('v_573').linguistic.group, byId.get('v_181').linguistic.group], ['居る', 'ru', '要る', 'u', 'irrégulier']);
  assert.deepEqual([byId.get('v_548').readings[0].kana, byId.get('v_573').readings[0].kana, byId.get('v_548').writings], ['いる', 'いる', []]);
  // Lectures et graphie décidées.
  assert.deepEqual([byId.get('v_523').readings[0].furigana, byId.get('v_645').readings[0].furigana, byId.get('v_163').word, byId.get('v_163').writings],
    ['<ruby>出来<rt>でき</rt></ruby>る', '<ruby>初<rt>はじ</rt></ruby>め', 'かかる', [{ form: '掛かる', furigana: '<ruby>掛かる<rt>かかる</rt></ruby>' }]]);
  // Particules : celles de la fiche pour un sens unique (mécanique), celles décidées sinon.
  assert.deepEqual([byId.get('v_548').senses[0].particles, byId.get('v_524').senses[0].particles, byId.get('v_703').senses[0].particles], [['が', 'に'], ['に'], ['に']]);
  assert.deepEqual(byId.get('v_516').senses.map((s) => s.particles), [['が', 'に'], ['が']]);
  assert.deepEqual(byId.get('v_181').senses.map((s) => s.particles), [['を'], []]);
});

// A2-04 · lot 19 fermé : « Vie quotidienne, travail et échanges », entièrement validé (26 entrées :
// 20 verbes, 6 noms ; 34 sens), avec tout son journal (61 décisions, D1241 à D1301), dans sa version
// révisée après
// l'arbitrage des 22 choix : « Dormir » est un etat ; 疲れる un processus ; 死ぬ est sans catégorie,
// sa fiche portant aussi sur un animal ; 煙草 a deux sens, la cigarette (un objet) et le tabac (une
// matière). Arbitrage du périmètre :
// aucune relation n'est portée dans ce lot (report intégral à 5.16 ; 貸す / 借りる et 渡す / 渡る sont
// inscrites comme candidates) ; 頼む garde sa lecture mécanique, son anomalie de furigana étant
// inscrite pour la passe finale, sans modifier aucune règle ; コピーする reste une ENTRY de verbe ;
// suru_compatible est true pour 結婚 et 生活, false pour 仕事 ; l'état résultant est traité fiche
// par fiche (en nuance pour 立つ, 座る et 疲れる ; « Dormir » reste un sens de 寝る). Les sens,
// catégories, types et particules suivent chaque fiche : ce ne sont PAS des règles générales.
const LOT19_IDS = [577, 49, 551, 568, 635, 9, 534, 143, 141, 142, 526, 527, 575, 533, 578, 562, 116, 530, 552, 569, 153, 558, 685, 542, 598, 683].map((n) => `n5_v_${n}`);
test('lot 19 : entièrement validé (26 entrées, 34 sens), journal compris ; aucune relation, aucune règle modifiée', () => {
  const lots = readLots();
  const lot19 = lots.find((l) => l.lot === 'lot-19');
  assert.equal(lot19.title, 'Vie quotidienne, travail et échanges');
  const E = lot19.entries;
  assert.deepEqual(Object.keys(E), LOT19_IDS, 'périmètre arbitré : 26 entrées, dans l\'ordre du rapport');
  assertAllValidated(lot19);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune entrée du lot n\'est retirée');
  assert.deepEqual(lot19.additions, []);
  const show = (s) => `${[s.meaning.primary, ...s.meaning.alternatives].join(' | ')} @ ${s.category ? Object.values(s.category).join('/') : 'null'} # ${s.semantic_type}${Object.hasOwn(s, 'particles') ? ` # ${s.particles.join('')}` : ''}`;
  // Traductions, catégorie, type et particules exacts de chaque sens : rien n'y entre sans décision.
  assert.deepEqual(Object.fromEntries(Object.entries(E).map(([id, e]) => [id.replace('n5_v_', ''), e.fields.senses.map(show)])), {
    577: ["Se réveiller @ etre_humain/etats_besoins_physiques/sommeil_repos # evenement # ", "Se lever | Sortir du lit @ etre_humain/etats_besoins_physiques/sommeil_repos # action # "],
    49: ["Dormir @ etre_humain/etats_besoins_physiques/sommeil_repos # etat # ", "Se coucher | Aller au lit @ etre_humain/etats_besoins_physiques/sommeil_repos # action # "],
    551: ["S'asseoir | Prendre place @ null # action"],
    568: ["Se lever | Se dresser @ null # action"],
    635: ["Se reposer | Faire une pause @ etre_humain/etats_besoins_physiques/sommeil_repos # action # ", "S'absenter | Prendre un congé @ null # action # を"],
    9: ["Se fatiguer | S'épuiser @ etre_humain/etats_besoins_physiques/fatigue_energie_physique # processus"],
    534: ["Travailler | Exercer un emploi @ travail_vie_professionnelle/travail_emploi/activite_professionnelle # action"],
    143: ["Travailler pour | Être employé par | Exercer un emploi dans @ travail_vie_professionnelle/travail_emploi/emploi # action"],
    141: ["Travail | Emploi | Profession @ travail_vie_professionnelle/travail_emploi/activite_professionnelle # action"],
    142: ["Entreprise | Société | Compagnie @ travail_vie_professionnelle/entreprises_organisations_professionnelles/entreprises # organisation"],
    526: ["Photocopier | Faire une copie @ null # action"],
    527: ["Donner | Offrir @ relations_sociales/interactions_sociales # action # をに", "Lever | Monter @ espace_proprietes_spatiales/mouvement_deplacement/monter_descendre # action # を"],
    575: ["Prêter | Louer (à quelqu'un) @ null # action"],
    533: ["Emprunter | Louer @ null # action"],
    578: ["Rendre | Restituer | Rembourser @ null # action"],
    562: ["Remettre | Donner en main propre @ null # action # をに", "Faire traverser @ espace_proprietes_spatiales/parcours_trajectoire # action # を"],
    116: ["Demander @ relations_sociales/interactions_sociales # action # を", "Commander (un plat au restaurant) @ economie_commerce/achat_vente/commande # action # を"],
    530: ["Rencontrer | Voir quelqu'un @ relations_sociales/interactions_sociales # action"],
    552: ["Attendre | Patienter @ null # action"],
    569: ["Mariage @ relations_sociales/couple_relations_intimes/mariage # evenement"],
    153: ["Naître | Venir au monde @ etre_humain/cycle_de_vie/naissance # evenement"],
    558: ["Mourir | Décéder @ null # evenement"],
    685: ["Mode de vie | Vie quotidienne | Subsistance | Existence @ null # concept_abstrait"],
    542: ["Fumer @ null # action # を", "Aspirer | Inhaler @ null # action # を"],
    598: ["Cigarette @ null # objet_artefact # ", "Tabac @ null # substance_matiere # "],
    683: ["Cendrier @ habitat_vie_domestique/accessoires_domestiques # objet_artefact"]
  });
  const senses = Object.values(E).flatMap((e) => e.fields.senses);
  assert.equal(senses.length, 34, 'sens du lot');
  // Arbitrage du périmètre : aucune relation dans ce lot, pour aucun sens.
  assert.ok(senses.every((s) => s.relations.length === 0), 'relations : report intégral à 5.16');
  assert.ok(senses.every((s) => s.dimensions.length === 0 && s.linguistic_functions.grammatical.length === 0 && s.linguistic_functions.pragmatic_discourse.length === 0));
  // Une particule décidée est une particule de la fiche : aucune n'est tirée d'un exemple.
  for (const [id, e] of Object.entries(E)) {
    const source = SOURCES.vocab.find((x) => x.id === id).particles ?? [];
    assert.deepEqual(e.fields.senses.flatMap((s) => s.particles ?? []).filter((p) => !source.includes(p)), [], `${id} : particule absente de la fiche`);
  }
  // suru_compatible, arbitré : true pour 結婚 et 生活, false pour 仕事 et pour tout le reste.
  assert.deepEqual(Object.keys(E).filter((id) => E[id].fields.suru_compatible), ['n5_v_569', 'n5_v_685']);
  // L'état résultant, fiche par fiche : en nuance, et hors des traductions, pour 立つ, 座る et 疲れる ;
  // « Dormir » reste la traduction principale d'un sens de 寝る.
  const meaning = (id) => JSON.stringify(E[id].fields.senses.map((s) => s.meaning));
  for (const [id, state] of [['n5_v_568', 'être debout'], ['n5_v_551', 'être assis'], ['n5_v_9', 'Être fatigué']]) {
    assert.equal(E[id].fields.senses.length, 1, id);
    assert.ok(!/être|Être/.test(meaning(id)), `${id} : l'état résultant n'est pas une traduction`);
    assert.ok(E[id].fields.nuance.includes(state), `${id} : l'état résultant est en nuance`);
  }
  assert.equal(E.n5_v_49.fields.senses[0].meaning.primary, 'Dormir');
  // Lectures : deux corrections, déjà décidables (A8). 頼む reste mécanique : aucune lecture décidée,
  // et une décision qui inscrit son anomalie pour la passe finale, sans rien décider de l'ENTRY.
  assert.deepEqual(Object.keys(E).filter((id) => Object.hasOwn(E[id].fields, 'readings')), ['n5_v_533', 'n5_v_552']);
  assert.deepEqual(E.n5_v_533.fields.readings, [{ kana: 'かりる', romaji: 'kariru', furigana: '<ruby>借<rt>か</rt></ruby>りる', default: true, note: null }]);
  assert.deepEqual(E.n5_v_552.fields.readings, [{ kana: 'まつ', romaji: 'matsu', furigana: '<ruby>待<rt>ま</rt></ruby>つ', default: true, note: null }]);
  // Aucune forme, aucune classe : コピーする reste telle que la source la donne. Une seule graphie
  // décidée, たばこ, que la fiche de 煙草 documente.
  assert.ok(Object.values(E).every((e) => !Object.hasOwn(e.fields, 'word') && !Object.hasOwn(e.fields, 'grammatical_class') && !Object.hasOwn(e.fields, 'group')
    && e.fields.counter === null && e.fields.suffix === false && e.fields.tags.length === 0));
  assert.deepEqual(Object.keys(E).filter((id) => E[id].fields.writings.length), ['n5_v_598']);
  assert.deepEqual(E.n5_v_598.fields.writings, [{ form: 'たばこ', furigana: 'たばこ' }]);
  // Anomalies de la source non reprises : l'exemple de コピーする (しるし pour « document »).
  const nuances = JSON.stringify(Object.values(E).map((e) => [e.fields.nuance, e.fields.senses.map((s) => s.nuance ?? null)]));
  assert.ok(!nuances.includes('しるし'));
  // 起こす, que la fiche de 起きる nomme et explique, reste en nuance ; ce n'est pas une entrée.
  assert.ok(E.n5_v_577.fields.nuance.includes('起こす'));
  assert.ok(!SOURCES.vocab.some((x) => x.word === '起こす'));
  // Journal : 61 décisions validées, D1241 à D1301, citées par le lot et par lui seul. Les 58
  // premières sont à leur place, entrée par entrée ; D1299 (死ぬ), D1300 et D1301 (煙草) sont venues à
  // la fin, à la révision.
  const journal = readJournal();
  const own = journal.filter((j) => j.lot === 'lot-19');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 61 }, (_, k) => `A2-04-D${String(1241 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated' && j.date === '2026-10-06'));
  const REVISION = ['A2-04-D1299', 'A2-04-D1300', 'A2-04-D1301'];
  assert.deepEqual(Object.values(E).flatMap((e) => e.journal).filter((id) => !REVISION.includes(id)), own.slice(0, 58).map((j) => j.id), 'le lot cite ses 58 premières décisions, dans l\'ordre');
  assert.deepEqual([E.n5_v_558.journal, E.n5_v_598.journal.slice(-2)], [['A2-04-D1286', 'A2-04-D1287', 'A2-04-D1299'], ['A2-04-D1300', 'A2-04-D1301']]);
  assert.deepEqual(own.slice(58).map((j) => [j.id, j.entry, j.field, j.kind]), [['A2-04-D1299', 'n5_v_558', 'sens 1 · category', 'categorie-nulle'],
    ['A2-04-D1300', 'n5_v_598', 'senses', 'decision'], ['A2-04-D1301', 'n5_v_598', 'sens 2 · category', 'categorie-nulle']]);
  // Les quatre points de la révision, et leurs raisons : « Dormir » est un etat, 疲れる un processus,
  // 死ぬ est sans catégorie (sa fiche porte aussi sur un chien), 煙草 a deux sens de types différents.
  const reasonOf = (id) => own.find((j) => j.id === id).reason;
  assert.deepEqual(E.n5_v_49.fields.senses.map((s) => [s.meaning.primary, s.semantic_type]), [['Dormir', 'etat'], ['Se coucher', 'action']]);
  assert.match(reasonOf('A2-04-D1243'), /etat pour « Dormir », qui désigne la condition de sommeil elle-même/);
  assert.equal(E.n5_v_9.fields.senses[0].semantic_type, 'processus');
  assert.match(reasonOf('A2-04-D1250'), /Type processus/);
  assert.deepEqual([E.n5_v_558.fields.senses[0].category, E.n5_v_558.fields.senses[0].semantic_type, E.n5_v_153.fields.senses[0].category.level_3], [null, 'evenement', 'naissance']);
  assert.ok(reasonOf('A2-04-D1299').includes('chien') && !/cycle de vie › mort/.test(reasonOf('A2-04-D1286')));
  assert.deepEqual(E.n5_v_598.fields.senses.map((s) => [s.meaning.primary, s.meaning.alternatives, s.semantic_type, s.category]), [['Cigarette', [], 'objet_artefact', null], ['Tabac', [], 'substance_matiere', null]]);
  assert.ok(own.every((j) => E[j.entry]?.journal.includes(j.id)), 'chaque décision porte sur une entrée du lot, qui la cite');
  const others = lots.filter((l) => l.lot !== 'lot-19').flatMap((l) => Object.values(l.entries).flatMap((e) => e.journal ?? []));
  assert.ok(!others.some((id) => id >= 'A2-04-D1241' && id <= 'A2-04-D1301'), 'aucun autre lot ne cite une décision du lot 19');
  assert.deepEqual(Object.keys(E).filter((id) => E[id].journal.length === 0), [], 'chaque entrée du lot a au moins une décision');
  const count = (kind, field) => own.filter((j) => j.kind === kind && field.test(j.field)).length;
  assert.deepEqual([count('decision', /^senses$/), count('abandon', /^senses$/), count('categorie-nulle', / · category$/), count('decision', / · semantic_type$/), count('decision', /^relations$/),
    count('decision', /^suru_compatible$/), count('correction', /^readings$/), count('decision', /^readings$/), count('decision', /^writings$/), count('decision', /^entrée$/), count('decision', /^nuance$/), count('abandon', /^nuance$/)],
  [13, 12, 15, 4, 3, 3, 2, 1, 1, 1, 1, 5]);
  // Les candidates à l'audit des relations de 5.16 : 貸す et 借りる (reciprocal_with), 渡す (examen
  // transitive_of / intransitive_of avec 渡る, validée au lot 04 et non modifiée). Elles seules.
  const rel = own.filter((j) => j.field === 'relations');
  assert.deepEqual(rel.map((j) => [j.entry, j.kind, j.before, j.after]), [['n5_v_575', 'decision', null, []], ['n5_v_533', 'decision', null, []], ['n5_v_562', 'decision', null, []]]);
  assert.ok(rel[0].reason.includes('reciprocal_with') && rel[0].reason.includes('n5_v_533') && rel[1].reason.includes('reciprocal_with') && rel[1].reason.includes('n5_v_575'));
  assert.ok(rel[2].reason.includes('transitive_of / intransitive_of') && rel[2].reason.includes('n5_v_563'));
  assert.ok(rel.every((j) => j.reason.includes('5.16') && j.reason.includes('candidate')));
  const lot4 = lots.find((l) => l.lot === 'lot-04');
  assert.deepEqual([lot4.entries.n5_v_563.status, lot4.entries.n5_v_563.journal.some((id) => id >= 'A2-04-D1241')], ['validated', false], '渡る n\'est pas touchée');
  // 頼む : l'anomalie est journalisée, la règle n'est pas modifiée.
  const tanomu = own.find((j) => j.entry === 'n5_v_116' && j.field === 'readings');
  assert.deepEqual([tanomu.kind, tanomu.before, tanomu.after], ['decision', '<ruby>頼<rt>たノ</rt></ruby>む', 'lecture mécanique conservée ; anomalie inscrite pour la passe finale']);
  assert.ok(tanomu.reason.includes('READING_EXCEPTION_IDS n\'est pas modifiée') && tanomu.reason.includes('passe finale'));
  // suru_compatible : une décision par nom arbitré, avec sa valeur.
  assert.deepEqual(own.filter((j) => j.field === 'suru_compatible').map((j) => [j.entry, j.after]), [['n5_v_141', false], ['n5_v_569', true], ['n5_v_685', true]]);
  // Une traduction gardée dans un sens n'est pas aussi abandonnée ; toute traduction de la source est
  // gardée, abandonnée, ou, pour les deux états résultants, passée en nuance par la décision de sens.
  const MOVED = { n5_v_568: ['Être debout'], n5_v_9: ['Être fatigué'] };
  const dropped = (id) => own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses').flatMap((j) => j.before);
  for (const [id, e] of Object.entries(E)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const gone = dropped(id);
    assert.deepEqual(gone.filter((x) => kept.has(x)), [], `${id} : traduction à la fois gardée et abandonnée`);
    const m = SOURCES.vocab.find((x) => x.id === id).meanings;
    assert.deepEqual([m.primary, ...(m.secondary ?? [])].filter((x) => !kept.has(x) && !gone.includes(x)), MOVED[id] ?? [], `${id} : traduction de la source ni gardée ni abandonnée`);
  }
});

// Le lot 19 dans l'assemblage RÉEL (l'essai à blanc d'avant la validation en est devenu l'état
// réel) : ses 26 ENTRY, leurs classes, leurs lectures, leurs particules, et les voisins non touchés.
test('lot 19 : dans l\'assemblage réel, 20 verbes et 6 noms sans relation', () => {
  const lots = readLots();
  const journal = readJournal();
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assertExcludedAfterLot24(a);
  // Avertissements : parmi les 134 de l'assemblage réel, les 15 catégories nulles du lot, justifiées.
  assert.equal(r.warnings.length, 148);
  const ids = new Set(LOT19_IDS.map((id) => id.replace('n5_', '')));
  const mine = r.warnings.filter((w) => ids.has(w.where.split(' · ')[1]));
  assert.ok(mine.every((w) => w.code === 'categorie-nulle'));
  assert.deepEqual(mine.map((w) => w.where.split(' · ').at(-1)).sort(), ['v_526_s1', 'v_533_s1', 'v_542_s1', 'v_542_s2', 'v_551_s1', 'v_552_s1', 'v_558_s1', 'v_562_s1', 'v_568_s1', 'v_575_s1', 'v_578_s1', 'v_598_s1', 'v_598_s2', 'v_635_s2', 'v_685_s1']);
  const all = a.files.flatMap((f) => f.entries);
  const byId = new Map(all.map((e) => [e.id, e]));
  const mineEntries = [...ids].map((id) => byId.get(id));
  // Relations : aucune au lot 19 ; les trois que le lot 26 note sur ses ENTRY (R6, R7, R9), et elles seules.
  assert.ok(mineEntries.every((e) => e), 'les 26 ENTRY existent');
  assert.deepEqual(mineEntries.flatMap((e) => e.senses.flatMap((s) => s.relations.map((x) => `${s.id} ${x.type} ${x.target}`))),
    ['v_527_s1 similar_to v_608_s2', 'v_533_s1 reciprocal_with v_575_s1', 'v_562_s2 transitive_of v_563_s1']);
  // 煙草 : forme usuelle たばこ depuis le lot 26 (Q6).
  assert.deepEqual(mineEntries.filter((e) => e.linguistic.grammatical_class === 'nom').map((e) => e.word), ['仕事', '会社', '結婚', '生活', 'たばこ', '灰皿']);
  assert.equal(mineEntries.filter((e) => e.linguistic.grammatical_class === 'verbe').length, 20);
  // コピーする : l'ENTRY telle que la source la donne.
  const copy = byId.get('v_526');
  assert.deepEqual([copy.word, copy.linguistic.grammatical_class, copy.linguistic.group, copy.readings[0].kana], ['コピーする', 'verbe', 'suru', 'こぴーする']);
  // Lectures : les deux corrections du lot 19 ; les furigana de 頼む, dont le ノ en katakana était
  // l'anomalie inscrite pour la passe finale, sont corrigés par le lot 26 (Q5).
  assert.deepEqual([byId.get('v_533').readings[0].furigana, byId.get('v_552').readings[0].furigana, byId.get('v_116').readings[0].furigana],
    ['<ruby>借<rt>か</rt></ruby>りる', '<ruby>待<rt>ま</rt></ruby>つ', '<ruby>頼<rt>たの</rt></ruby>む']);
  // Particules : celles de la fiche pour un sens unique (mécanique), celles décidées sinon.
  assert.deepEqual([byId.get('v_153').senses[0].particles, byId.get('v_530').senses[0].particles, byId.get('v_569').senses[0].particles], [['に'], ['に'], ['と', 'に']]);
  assert.deepEqual(byId.get('v_635').senses.map((s) => s.particles), [[], ['を']]);
  assert.deepEqual(byId.get('v_527').senses.map((s) => s.particles), [['を', 'に'], ['を']]);
  // 煙草 : une seule ENTRY ; depuis le lot 26, たばこ en est la forme usuelle et 煙草 l'autre graphie.
  // 渡る et 渡す restent deux ENTRY.
  assert.deepEqual([byId.get('v_598').word, byId.get('v_598').writings.map((w) => w.form)], ['たばこ', ['煙草']]);
  for (const w of ['渡る', '渡す', '貸す', '借りる', '休む', '休み']) assert.equal(all.filter((e) => e.word === w).length, 1, w);
});

// A2-04 · lot 18 fermé : « Actions sur les objets », entièrement validé (23 verbes, 34 sens), avec
// tout son journal (73 décisions, D1168 à D1240), dans sa version révisée après l'arbitrage des
// vingt choix : pour 開く et
// 閉まる, l'état résultant (« être ouvert », « être fermé ») est en nuance, non parmi les traductions ;
// « Serrer » est la traduction principale de 締める (D1240, ajoutée à la fin) ; la mention de
// « hiraku » n'est pas reprise pour 開く, celle de « kawaru » l'est pour 変える. Arbitrage du périmètre : aucune relation n'est portée dans ce lot
// (report intégral à la passe finale 5.16), les quatre paires transitif / intransitif sont inscrites
// au journal comme candidates à cet audit ; « prendre une photo » (取る) et « jouer d'un instrument »
// (引く) sont des confusions de la source, écartées et journalisées, avec un renvoi en nuance vers
// 撮る et 弾く. Les sens, catégories, types et particules suivent chaque fiche : ce ne sont PAS des
// règles générales, et rien n'y est ajouté par connaissance externe.
const LOT18_IDS = [710, 580, 579, 709, 560, 561, 522, 539, 541, 576, 637, 79, 130, 82, 50, 571, 535, 536, 528, 529, 545, 532, 567].map((n) => `n5_v_${n}`);
const LOT18_PAIRS = [['n5_v_710', 'n5_v_580'], ['n5_v_579', 'n5_v_709'], ['n5_v_560', 'n5_v_561'], ['n5_v_528', 'n5_v_529']];
test('lot 18 : entièrement validé (23 entrées, 34 sens), journal compris ; aucune relation, deux confusions écartées', () => {
  const lots = readLots();
  const lot18 = lots.find((l) => l.lot === 'lot-18');
  assert.equal(lot18.title, 'Actions sur les objets');
  const E = lot18.entries;
  assert.deepEqual(Object.keys(E), LOT18_IDS, 'périmètre arbitré : 23 entrées, dans l\'ordre du rapport');
  assertAllValidated(lot18);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune entrée du lot n\'est retirée');
  assert.deepEqual(lot18.additions, []);
  const show = (s) => `${[s.meaning.primary, ...s.meaning.alternatives].join(' | ')} @ ${s.category ? Object.values(s.category).join('/') : 'null'} # ${s.semantic_type}${Object.hasOwn(s, 'particles') ? ` # ${s.particles.join('')}` : ''}`;
  // Traductions, catégorie, type et particules exacts de chaque sens : rien n'y entre sans décision.
  // Les particules ne sont décidées que pour les ENTRY à plusieurs sens.
  assert.deepEqual(Object.fromEntries(Object.entries(E).map(([id, e]) => [id.replace('n5_v_', ''), e.fields.senses.map(show)])), {
    710: ["S'ouvrir @ null # evenement"], 580: ['Ouvrir @ null # action'],
    579: ['Se fermer @ null # evenement'], 709: ['Fermer @ null # action'],
    560: ["S'éteindre @ null # evenement # が", "Disparaître | S'effacer @ null # evenement # が"],
    561: ['Éteindre @ null # action # を', 'Effacer @ communication_langage/ecriture # action # を'],
    522: ['Allumer @ null # action # を', 'Fixer | Attacher @ null # action # を'],
    539: ['Couper | Trancher @ null # action # を', 'Raccrocher (un téléphone) | Éteindre (un contact) @ null # action # を'],
    541: ['Prendre | Saisir @ null # action # を', 'Obtenir @ null # action # を'],
    576: ['Coller | Afficher @ null # action'],
    637: ['Utiliser | Se servir de | Employer (un objet ou une langue) @ null # action'],
    79: ['Pousser | Appuyer sur (un bouton) | Tamponner @ null # action'],
    130: ['Tirer @ null # action # を', 'Chercher (dans un dictionnaire) @ communication_langage/langues # action # を'],
    82: ['Serrer | Attacher | Nouer (une cravate, une ceinture) @ habillement_accessoires_personnels/accessoires_vestimentaires # action'],
    50: ['Ouvrir (un parapluie) @ habillement_accessoires_personnels/accessoires_vestimentaires # action # を', 'Pointer @ null # action # を'],
    571: ['Poser | Placer | Mettre @ espace_proprietes_spatiales/position_localisation # action'],
    535: ['Mettre dans | Insérer | Faire entrer @ espace_proprietes_spatiales/entree_sortie/entrer_sortir # action'],
    536: ['Sortir | Mettre dehors @ espace_proprietes_spatiales/entree_sortie/entrer_sortir # action # を', 'Envoyer (du courrier) @ communication_langage/communication/transmission # action # を', 'Présenter @ null # action # を'],
    528: ['Faire la queue | Se mettre en rang @ null # action # に', 'Être aligné @ espace_proprietes_spatiales/position_localisation # etat # '],
    529: ['Aligner | Disposer | Mettre en rang @ espace_proprietes_spatiales/position_localisation # action'],
    545: ['Changer | Modifier | Transformer | Remplacer @ null # action'],
    532: ['Fabriquer | Créer | Produire @ null # action # を', 'Préparer (un repas) @ alimentation_cuisine/cuisine_preparation # action # を'],
    567: ['Brosser | Polir | Frotter @ null # action']
  });
  const senses = Object.values(E).flatMap((e) => e.fields.senses);
  assert.equal(senses.length, 34, 'sens du lot');
  // Arbitrage du périmètre : aucune relation dans ce lot, pour aucun sens.
  assert.ok(senses.every((s) => s.relations.length === 0), 'relations : report intégral à 5.16');
  assert.ok(senses.every((s) => s.dimensions.length === 0 && s.linguistic_functions.grammatical.length === 0 && s.linguistic_functions.pragmatic_discourse.length === 0));
  // Une particule décidée est une particule de la fiche : aucune n'est ajoutée.
  for (const [id, e] of Object.entries(E)) {
    const source = SOURCES.vocab.find((x) => x.id === id).particles;
    assert.deepEqual(e.fields.senses.flatMap((s) => s.particles ?? []).filter((p) => !source.includes(p)), [], `${id} : particule absente de la fiche`);
  }
  // Arbitrage du périmètre : les deux confusions de la source ne font pas un sens ; le renvoi vers le
  // mot validé est en nuance.
  const text = (e) => JSON.stringify(e.fields.senses.map((s) => [s.meaning, s.nuance ?? null]));
  assert.ok(!/photo/i.test(text(E.n5_v_541)), '取る : aucun sens photographique');
  assert.match(E.n5_v_541.fields.nuance, /^Prendre une photo s'écrit 撮る, de même lecture/);
  assert.ok(!/instrument|piano|jouer/i.test(text(E.n5_v_130)), '引く : aucun sens musical');
  assert.match(E.n5_v_130.fields.nuance, /^Jouer d'un instrument à cordes ou du piano s'écrit 弾く, de même lecture/);
  // Anomalies de la source non reprises : texte parasite de l'exemple de 閉める, mauvais kanji de la
  // nuance de 締める.
  const nuances = JSON.stringify(Object.values(E).map((e) => [e.fields.nuance, e.fields.senses.map((s) => s.nuance ?? null)]));
  assert.ok(!nuances.includes('1sutekina') && !nuances.includes('ネクタイを閉める'));
  assert.ok(E.n5_v_82.fields.nuance.includes('ネクタイを締めます') && E.n5_v_82.fields.nuance.includes('閉める'));
  // Lectures : deux seulement sont décidables (furigana de la source incohérents ou invalides) ;
  // aucune forme, aucune classe, aucune graphie, aucun compteur, suffixe ni tag.
  assert.deepEqual(Object.keys(E).filter((id) => Object.hasOwn(E[id].fields, 'readings')), ['n5_v_579', 'n5_v_532']);
  assert.deepEqual(E.n5_v_579.fields.readings, [{ kana: 'しまる', romaji: 'shimaru', furigana: '<ruby>閉<rt>し</rt></ruby>まる', default: true, note: null }]);
  assert.deepEqual(E.n5_v_532.fields.readings, [{ kana: 'つくる', romaji: 'tsukuru', furigana: '<ruby>作<rt>つく</rt></ruby>る', default: true, note: null }]);
  assert.ok(Object.values(E).every((e) => !Object.hasOwn(e.fields, 'word') && !Object.hasOwn(e.fields, 'grammatical_class') && !Object.hasOwn(e.fields, 'group')
    && e.fields.writings.length === 0 && e.fields.counter === null && e.fields.suffix === false && e.fields.tags.length === 0 && e.fields.suru_compatible === false));
  // Arbitrage des choix : un événement et l'état qui en résulte ne sont pas deux traductions. L'état
  // est en nuance, pour 開く et 閉まる, et n'est ni une autre traduction ni un second sens.
  const RESULT_STATES = { n5_v_710: 'Être ouvert', n5_v_579: 'Être fermé' };
  for (const [id, state] of Object.entries(RESULT_STATES)) {
    assert.equal(E[id].fields.senses.length, 1, id);
    assert.ok(!/être/i.test(JSON.stringify(E[id].fields.senses[0].meaning)), `${id} : l'état résultant n'est pas une traduction`);
    assert.ok(E[id].fields.nuance.includes(`Désigne aussi l'état qui en résulte : ${state.toLowerCase()}.`), `${id} : l'état résultant est en nuance`);
  }
  // « hiraku », que la fiche de 開く nomme sans l'expliquer, n'est repris dans aucune nuance ;
  // « kawaru », que la fiche de 変える oppose à l'entrée, reste dans la sienne.
  assert.ok(!/hiraku|ひらく/i.test(nuances));
  assert.ok(E.n5_v_545.fields.nuance.includes('« kawaru »'));
  // 締める : « Serrer » en traduction principale, par une décision dédiée, ajoutée à la fin.
  assert.deepEqual(E.n5_v_82.fields.senses[0].meaning, { primary: 'Serrer', alternatives: ['Attacher', 'Nouer (une cravate, une ceinture)'] });
  assert.deepEqual(E.n5_v_82.journal, ['A2-04-D1214', 'A2-04-D1215', 'A2-04-D1240']);
  // Journal : 73 décisions validées, D1168 à D1240, citées par le lot et par lui seul. Les 72
  // premières sont à leur place, entrée par entrée ; D1240 (締める) est venue à la fin, à la révision.
  const journal = readJournal();
  const own = journal.filter((j) => j.lot === 'lot-18');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 73 }, (_, k) => `A2-04-D${String(1168 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated' && j.date === '2026-10-06'));
  assert.deepEqual(Object.values(E).flatMap((e) => e.journal).filter((id) => id !== 'A2-04-D1240'), own.slice(0, 72).map((j) => j.id), 'le lot cite ses 72 premières décisions, dans l\'ordre');
  assert.deepEqual(own.slice(0, 72).map((j) => j.entry).filter((id, k, a) => id !== a[k - 1]), LOT18_IDS, 'les décisions d\'origine se suivent, entrée par entrée');
  const d1240 = own.at(-1);
  assert.deepEqual([d1240.id, d1240.entry, d1240.field, d1240.kind, d1240.before, d1240.after],
    ['A2-04-D1240', 'n5_v_82', 'senses', 'decision', ['Attacher', 'Serrer', 'Nouer (une cravate, une ceinture)'], 'un seul sens ; « Serrer » en traduction principale']);
  const byId = new Map(own.map((j) => [j.id, j]));
  assert.deepEqual([byId.get('A2-04-D1168').after, byId.get('A2-04-D1177').after, byId.get('A2-04-D1170').after],
    ['un seul sens ; « Être ouvert » en nuance', 'un seul sens ; « Être fermé » en nuance', 'mention non reprise ; aucune lecture ajoutée']);
  assert.ok(own.every((j) => E[j.entry]?.journal.includes(j.id)), 'chaque décision est citée par son entrée');
  const others = lots.filter((l) => l.lot !== 'lot-18').flatMap((l) => Object.values(l.entries).flatMap((e) => e.journal ?? []));
  assert.ok(!others.some((id) => id >= 'A2-04-D1168' && id <= 'A2-04-D1240'), 'aucun autre lot ne cite une décision du lot 18');
  const count = (kind, field) => own.filter((j) => j.kind === kind && field.test(j.field)).length;
  assert.deepEqual([count('decision', /^senses$/), count('abandon', /^senses$/), count('categorie-nulle', / · category$/), count('decision', / · category$/), count('decision', /^relations$/),
    count('correction', /^readings$/), count('decision', /^nuance$/), count('abandon', /^nuance$/), count('correction', /^nuance$/)], [16, 15, 23, 5, 8, 2, 2, 1, 1]);
  // Les quatre paires candidates à l'audit des relations de 5.16 : une décision par membre, et elles
  // seules ; chacune nomme l'autre membre et la passe finale.
  const rel = own.filter((j) => j.field === 'relations');
  assert.deepEqual(rel.map((j) => j.entry).sort(), LOT18_PAIRS.flat().sort());
  for (const [a, b] of LOT18_PAIRS) {
    for (const [self, other] of [[a, b], [b, a]]) {
      const d = rel.find((j) => j.entry === self);
      assert.deepEqual([d.kind, d.before, d.after], ['decision', null, []]);
      assert.ok(d.reason.includes(other) && d.reason.includes('5.16') && d.reason.includes('candidate'), `${self} : paire candidate avec ${other}`);
    }
  }
  // Les deux confusions sont journalisées comme telles, sur les traductions écartées.
  const dropped = (id) => own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses');
  assert.ok(dropped('n5_v_541').some((j) => j.before.includes('Prendre (une photo)') && /^Confusion de la source, écartée/.test(j.reason) && j.reason.includes('n5_v_171')));
  assert.ok(dropped('n5_v_130').some((j) => j.before.includes('Jouer d\'un instrument à cordes') && /^Confusion de la source, écartée/.test(j.reason) && j.reason.includes('n5_v_192')));
  // Une traduction gardée dans un sens n'est pas aussi abandonnée au journal ; toute traduction de la
  // source est gardée, abandonnée, ou, pour les deux états résultants, passée en nuance par la
  // décision de sens de son entrée (rien ne disparaît sans décision).
  for (const [id, e] of Object.entries(E)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const gone = dropped(id).flatMap((j) => j.before);
    assert.deepEqual(gone.filter((t) => kept.has(t)), [], `${id} : traduction à la fois gardée et abandonnée`);
    const m = SOURCES.vocab.find((x) => x.id === id).meanings;
    assert.deepEqual([m.primary, ...(m.secondary ?? [])].filter((t) => !kept.has(t) && !gone.includes(t)), RESULT_STATES[id] ? [RESULT_STATES[id]] : [], `${id} : traduction de la source ni gardée ni abandonnée`);
  }
  // Les mots validés que le lot nomme ne sont pas touchés : 撮る (lot 08) et 弾く (lot 09).
  const lotOf = (id) => lots.find((l) => Object.hasOwn(l.entries, id));
  assert.deepEqual([lotOf('n5_v_171').lot, lotOf('n5_v_171').entries.n5_v_171.status, lotOf('n5_v_192').lot, lotOf('n5_v_192').entries.n5_v_192.status], ['lot-08', 'validated', 'lot-09', 'validated']);
});

// Le lot 18 dans l'assemblage RÉEL (l'essai à blanc d'avant la validation en est devenu l'état
// réel) : ses 23 ENTRY, leurs lectures, leurs particules, et les homophones restés distincts.
test('lot 18 : dans l\'assemblage réel, 23 verbes sans relation', () => {
  const lots = readLots();
  const journal = readJournal();
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assertExcludedAfterLot24(a);
  // Avertissements : parmi les 134 de l'assemblage réel, les 23 catégories nulles du lot, justifiées.
  assert.equal(r.warnings.length, 148);
  const ids = new Set(LOT18_IDS.map((id) => id.replace('n5_', '')));
  const mine = r.warnings.filter((w) => ids.has(w.where.split(' · ')[1]));
  assert.ok(mine.every((w) => w.code === 'categorie-nulle'));
  assert.deepEqual(mine.map((w) => w.where.split(' · ').at(-1)).sort(), ['v_130_s1', 'v_50_s2', 'v_522_s1', 'v_522_s2', 'v_528_s1', 'v_532_s1', 'v_536_s3', 'v_539_s1', 'v_539_s2', 'v_541_s1', 'v_541_s2', 'v_545_s1',
    'v_560_s1', 'v_560_s2', 'v_561_s1', 'v_567_s1', 'v_576_s1', 'v_579_s1', 'v_580_s1', 'v_637_s1', 'v_709_s1', 'v_710_s1', 'v_79_s1']);
  const all = a.files.flatMap((f) => f.entries);
  const byId = new Map(all.map((e) => [e.id, e]));
  const mineEntries = [...ids].map((id) => byId.get(id));
  assert.ok(mineEntries.every((e) => e && e.linguistic.grammatical_class === 'verbe' && ['u', 'ru'].includes(e.linguistic.group)), 'les 23 ENTRY sont des verbes');
  // Relations : aucune au lot 18 ; les quatre paires transitif / intransitif que le lot 26 note (R2 à
  // R5), une seule fois chacune, sur le verbe transitif.
  assert.deepEqual(mineEntries.flatMap((e) => e.senses.flatMap((s) => s.relations.map((x) => `${s.id} ${x.type} ${x.target}`))).sort(),
    ['v_529_s1 transitive_of v_528_s2', 'v_561_s1 transitive_of v_560_s1', 'v_580_s1 transitive_of v_710_s1', 'v_709_s1 transitive_of v_579_s1']);
  // Lectures décidées : les deux corrections ; les autres restent mécaniques.
  assert.deepEqual([byId.get('v_579').readings[0].furigana, byId.get('v_579').readings[0].kana, byId.get('v_532').readings[0].furigana, byId.get('v_532').readings[0].kana],
    ['<ruby>閉<rt>し</rt></ruby>まる', 'しまる', '<ruby>作<rt>つく</rt></ruby>る', 'つくる']);
  // Particules : celles de la fiche pour un sens unique (mécanique), celles décidées sinon.
  assert.deepEqual([byId.get('v_571').senses[0].particles, byId.get('v_576').senses[0].particles, byId.get('v_710').senses[0].particles], [['を', 'に'], ['を', 'に'], ['が']]);
  assert.deepEqual(byId.get('v_528').senses.map((s) => s.particles), [['に'], []]);
  assert.deepEqual(byId.get('v_536').senses.map((s) => s.id), ['v_536_s1', 'v_536_s2', 'v_536_s3']);
  // Homophones : chaque forme n'existe qu'une fois ; 取る et 撮る, 引く et 弾く, 閉める et 締める restent
  // des ENTRY distinctes.
  for (const w of ['取る', '撮る', '引く', '弾く', '閉める', '締める']) assert.equal(all.filter((e) => e.word === w).length, 1, w);
});

// L'espace de travail réel s'assemble sans erreur : ni problème de décision, ni erreur du
// validateur lexical, ni attente. Les comptes suivent les décisions validées, lot après lot.
// Après la validation du lot 20 : 638 ENTRY, 32 retraits, 49 entrées écartées ; le complément
// d'I4 et d'I5 (addendum A8) passe sur toutes les ENTRY assemblées. Aucune proposition n'est en
// cours : toutes les entrées décidées et tout le journal sont validés (lots 0 à 22).
// A2-04 · lot 25 « Retrait de など » : VALIDÉ le 2026-10-07 (statuts seulement). Une seule entrée, retirée sans
// successeur (arbitrage du préalable sur la classe de など, option C ; périmètre arbitré, P1 à P3) ;
// une seule décision, D1569, de nature retrait, dont la raison s'en tient aux quatre points arbitrés.
const LOT25_REASON_POINTS = ['« particule suffixe »', 'aucune classe du registre lexical', 'A3 (L8)', 'merged_into vaut null'];
test('lot 25 (validé) : など seule, retirée sans successeur, une décision retrait D1569', () => {
  const l = readLots().find((x) => x.lot === 'lot-25');
  assert.deepEqual(l, { lot: 'lot-25', title: 'Retrait de など', entries: { n5_v_602: { status: 'validated', journal: ['A2-04-D1569'], retire: { merged_into: null } } }, additions: [] });
  const own = readJournal().filter((j) => j.lot === 'lot-25');
  assert.equal(own.length, 1, 'une seule décision ; aucune décision abandon');
  const [d] = own;
  assert.deepEqual([d.id, d.status, d.entry, d.field, d.kind, d.before, d.after], ['A2-04-D1569', 'validated', 'n5_v_602', 'entrée', 'retrait', null, null]);
  for (const p of LOT25_REASON_POINTS) assert.ok(d.reason.includes(p), `raison : ${p}`);
  assert.ok(!/toute particule|les particules|aucune particule/i.test(d.reason), 'aucune règle générale sur les particules');
  assert.equal(readJournal().filter((j) => j.entry === 'n5_v_602').length, 1, 'D1569 est la seule décision qui cite など');
});

// L'essai à blanc d'avant la validation est devenu l'assemblage réel, partiel et complet.
test('lot 25 : dans l\'assemblage réel, partiel et complet : 684 ENTRY, 35 retraits, aucune entrée écartée, sans problème', () => {
  for (const mode of ['partial', 'complete']) {
    const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal(), mode });
    const r = validateAssembly(a, DEPS);
    assert.deepEqual(a.problems, [], mode);
    assert.deepEqual(r.errors, [], mode);
    assert.deepEqual([...a.pending, ...r.pending], [], mode);
    assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0], mode);
    assert.deepEqual(a.retired.filter((x) => x.merged_into === null), [{ id: 'v_717', merged_into: null }, { id: 'v_602', merged_into: null }], `${mode} : v_717 (A3, d'emblée) et v_602, sans successeur`);
    assert.ok(!a.files.some((f) => f.entries.some((e) => e.id === 'v_602')), `${mode} : v_602 n'est pas assemblée`);
    assert.equal(r.warnings.length, 148, `${mode} : aucun avertissement nouveau`);
  }
});

test('espace de travail réel : assemblage partiel sans problème ni erreur', () => {
  const lots = readLots();
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  const decisions = lots.flatMap((l) => Object.values(l.entries)).filter((d) => d.status === 'validated');
  assert.equal(a.files.reduce((n, f) => n + f.entries.length, 0), decisions.filter((d) => d.fields).length);
  assert.equal(a.retired.length, 1 + decisions.filter((d) => d.retire).length);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assertExcludedAfterLot24(a);
  assert.ok(lots.every((l) => Object.values(l.entries).every((d) => d.status === 'validated')), 'les lots 0 à 25 sont entièrement validés');
  assert.equal(lots.length, 26, 'lots 0 à 25');
  // Avertissements : 148, tous justifiés au journal (le 148e : ちょうど, lot 24) ; les trois du lot 15, les douze du lot 16, les
  // neuf du lot 17, les vingt-trois du lot 18, les quinze du lot 19, les vingt du lot 20, les cinq du
  // lot 21 et les six du lot 22 (contrôlés dans leurs tests) sont leurs catégories nulles ; les lots
  // 20, 21 et 22 ajoutent chacun un type nul (声 ; また, sens 2 ; たぶん).
  assert.equal(r.warnings.length, 148);
  const nullOf = (re) => r.warnings.filter((w) => w.code === 'categorie-nulle' && re.test(w.where)).map((w) => w.where.split(' · ').at(-1)).sort();
  assert.deepEqual(nullOf(/· (v_484|v_62) ·/), ['v_484_s1', 'v_484_s2', 'v_62_s1']);
  assert.deepEqual(nullOf(/· (v_144|v_432|v_434|v_442|v_452|v_456|v_457|v_458|v_486|v_512|v_609) ·/),
    ['v_144_s1', 'v_432_s1', 'v_434_s1', 'v_442_s1', 'v_452_s1', 'v_456_s1', 'v_457_s1', 'v_458_s1', 'v_486_s1', 'v_512_s1', 'v_609_s1', 'v_609_s2']);
  assert.deepEqual(nullOf(/· (v_422|v_428|v_449|v_451|v_461|v_462|v_478|v_489) ·/),
    ['v_422_s2', 'v_428_s1', 'v_449_s1', 'v_451_s1', 'v_461_s2', 'v_462_s1', 'v_462_s2', 'v_478_s1', 'v_489_s1']);
});

// A2-04 · lot 17 fermé : « États et propriétés descriptives », entièrement validé (17 adjectifs,
// aucun tag, aucune lecture décidée), avec tout son journal (41 décisions, D1127 à D1167), dans sa
// version révisée après relecture. Quatorze choix arbitrés, dont : 暖かい (lot 07) rouverte et
// fusionnée dans 温かい, ENTRY survivante construite à partir des deux fiches (forme usuelle 温かい,
// deux sens) ; deux sens lorsque la fiche décrit deux référents ; un seul pour 強い, 弱い et 若い ;
// 古い et 新しい dans le temps ; neuf catégories nulles. Ce ne sont PAS des règles générales : chaque
// sens suit sa fiche, exemple compris.
test('lot 17 : entièrement validé (17 entrées, 25 sens), journal compris ; 暖かい fusionnée dans 温かい', () => {
  const lot17 = readLots().find((l) => l.lot === 'lot-17');
  assert.equal(lot17.title, 'États et propriétés descriptives');
  const E = lot17.entries;
  assert.deepEqual(Object.keys(E).sort(), [1, 4, 8, 422, 428, 436, 449, 451, 453, 461, 462, 476, 478, 482, 483, 489, 681].map((n) => `n5_v_${n}`).sort(), 'périmètre arbitré : 17 entrées');
  assertAllValidated(lot17);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune entrée du lot n\'est retirée');
  assert.deepEqual(lot17.additions, []);
  const show = (s) => `${[s.meaning.primary, ...s.meaning.alternatives].join(' | ')} @ ${s.category ? Object.values(s.category).join('/') : 'null'}`;
  // Traductions et catégories exactes de chaque sens : rien n'y entre sans décision. Tous les sens
  // sont des propriétés, sans dimension (aucun axe d'A2-DIM ne décrit directement ces sens).
  assert.deepEqual(Object.fromEntries(Object.entries(E).map(([id, e]) => [id.replace('n5_v_', ''), e.fields.senses.map(show)])), {
    436: ['Vieux | Ancien @ temps'], 453: ['Nouveau | Neuf | Récent @ temps'], 476: ['Jeune @ etre_humain/cycle_de_vie'],
    451: ['Fort | Puissant | Résistant @ null'], 449: ['Faible | Fragile @ null'],
    428: ['Solide | Robuste | Résistant @ null', 'En bonne santé @ sante_medecine/sante_etats_pathologiques'],
    482: ['Rapide | Prompt @ espace_proprietes_spatiales/vitesse'],
    483: ['Lent @ espace_proprietes_spatiales/vitesse', 'En retard | Tardif @ temps'],
    461: ['Sale | Crasseux @ habitat_vie_domestique/entretien_domestique/nettoyage', 'Grossier (langage) @ null'],
    462: ['Pur | Limpide @ null', 'Pur (moralement) | Innocent | Honnête @ null'],
    422: ['Bruyant @ etre_humain/sens_perception/ouie', 'Agaçant | Embêtant @ null'],
    478: ['Animé | Joyeux (lieu) @ null'], 489: ['Calme | Tranquille | Silencieux @ null'],
    8: ['Chaud | Tiède @ etre_humain/sens_perception/toucher_sensations', 'Doux (agréablement chaud) | Tiède @ monde_naturel/meteo/conditions_atmospheriques'],
    681: ['Tiède @ etre_humain/sens_perception/toucher_sensations'],
    1: ['Frais | Rafraîchissant | Agréable @ monde_naturel/meteo/conditions_atmospheriques', 'Vif @ etre_humain/psychologie_esprit/etats_psychologiques'],
    4: ['Sombre | Obscur @ couleurs/teintes_nuances/clair_fonce', 'Triste @ etre_humain/psychologie_esprit/etats_psychologiques']
  });
  const senses = Object.values(E).flatMap((e) => e.fields.senses);
  assert.equal(senses.length, 25, 'sens du lot');
  assert.ok(senses.every((s) => s.semantic_type === 'propriete' && s.dimensions.length === 0 && s.relations.length === 0 && !Object.hasOwn(s, 'particles')
    && s.linguistic_functions.grammatical.length === 0 && s.linguistic_functions.pragmatic_discourse.length === 0));
  // 温かい, survivante de la fusion : sa forme et sa lecture restent mécaniques ; 暖かい devient une
  // autre graphie ; le sens 2 reprend à l'identique le sens validé de 暖かい (lot 07).
  assert.deepEqual(E.n5_v_8.fields.writings, [{ form: '暖かい', furigana: '<ruby>暖<rt>あたた</rt></ruby>かい' }]);
  assert.ok(!Object.hasOwn(E.n5_v_8.fields, 'word') && !Object.hasOwn(E.n5_v_8.fields, 'readings'));
  const byId = new Map(readJournal().map((j) => [j.id, j]));
  const before = byId.get('A2-04-D1127').before.fields.senses[0];
  const s2 = E.n5_v_8.fields.senses[1];
  assert.deepEqual([s2.meaning, s2.category, s2.semantic_type], [before.meaning, before.category, before.semantic_type], 'sens 2 : celui de 暖かい, à l\'identique');
  assert.ok(!E.n5_v_8.fields.senses[1].meaning.alternatives.includes('Chaud') && s2.meaning.primary !== 'Chaud', 'D0477 respectée : « Chaud » n\'entre pas dans le sens météorologique');
  assert.equal(E.n5_v_8.journal[0], 'A2-04-D1128', 'la survivante cite la fusion');
  assert.match(E.n5_v_8.fields.nuance, /^温かい s'écrit pour l'eau, un objet, un plat ou une boisson ; 暖かい, pour le temps, le climat ou une pièce\./);
  // Les exemples des fiches sont conservés là où ils portent un emploi (intensité, sens moral).
  for (const [id, ex] of [['n5_v_451', 'あめが強いです'], ['n5_v_449', 'かぜが弱いです']]) assert.ok(E[id].fields.nuance.includes(ex), id);
  assert.ok(E.n5_v_462.fields.senses[1].nuance.includes('清いこころ'));
  // 静か : l'exemple fautif de la source (としばこ) n'entre dans aucune nuance du lot.
  assert.ok(!JSON.stringify(lot17).includes('としばこ') || !JSON.stringify(Object.values(E).map((e) => [e.fields.nuance, e.fields.senses.map((s) => s.nuance)])).includes('としばこ'));
  // Classes : seule 温い était décidable ; aucune lecture, aucune forme, aucun compteur, suffixe ni tag.
  assert.deepEqual(Object.keys(E).filter((id) => Object.hasOwn(E[id].fields, 'grammatical_class')), ['n5_v_681']);
  assert.deepEqual([E.n5_v_681.fields.grammatical_class, E.n5_v_681.fields.group], ['adjectif_i', 'i']);
  assert.ok(Object.values(E).every((e) => !Object.hasOwn(e.fields, 'readings') && !Object.hasOwn(e.fields, 'word')
    && e.fields.counter === null && e.fields.suffix === false && e.fields.tags.length === 0 && e.fields.suru_compatible === false));
  assert.deepEqual(Object.keys(E).filter((id) => E[id].fields.writings.length), ['n5_v_8'], 'une seule graphie décidée');
  // Journal : 41 décisions validées. Le lot cite les siennes, sauf la réouverture, que cite la seule
  // entrée rouverte du lot 07 ; la fusion est citée des deux côtés.
  const own = readJournal().filter((j) => j.lot === 'lot-17');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 41 }, (_, k) => `A2-04-D${String(1127 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated' && j.date === '2026-10-05'));
  const cited = new Set(Object.values(E).flatMap((e) => e.journal));
  assert.deepEqual(own.map((j) => j.id).filter((id) => !cited.has(id)), ['A2-04-D1127'], 'seule la réouverture n\'est pas citée par une entrée du lot 17');
  assert.deepEqual([...cited].filter((id) => !own.some((j) => j.id === id)), [], 'le lot 17 ne cite que ses décisions');
  assert.deepEqual(own.filter((j) => j.entry === 'n5_v_275').map((j) => j.id), ['A2-04-D1127', 'A2-04-D1128']);
  assert.deepEqual(Object.keys(E).filter((id) => E[id].journal.length === 0), [], 'chaque entrée du lot a au moins une décision');
  const count = (kind, field) => own.filter((j) => j.kind === kind && field.test(j.field)).length;
  assert.deepEqual([count('abandon', /^senses$/), count('categorie-nulle', / · category$/), count('decision', /^senses$/), count('decision', / · category$/), count('abandon', /^nuance$/),
    count('decision', /^grammatical_class$/), count('decision', /^writings$/), count('decision', /^entrée$/), count('fusion', /^entrée$/)], [11, 9, 11, 4, 2, 1, 1, 1, 1]);
  // Une traduction gardée dans un sens n'est pas aussi abandonnée au journal.
  for (const [id, e] of Object.entries(E)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const dropped = own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses').flatMap((j) => j.before);
    assert.deepEqual(dropped.filter((t) => kept.has(t)), [], `${id} : traduction à la fois gardée et abandonnée`);
  }
});

// Identité de 温かい et de 暖かい dans l'assemblage RÉEL (l'essai à blanc d'avant la validation en est
// devenu l'état réel) : v_275 n'existe plus, son identifiant est retiré vers v_8 et ne sera jamais
// réattribué ; une seule ENTRY porte les deux graphies.
test('lot 17 : dans l\'assemblage réel, v_275 (暖かい) est fusionnée dans v_8 (温かい)', () => {
  const lots = readLots();
  const journal = readJournal();
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assertExcludedAfterLot24(a);
  // L'identité : v_275 n'existe plus, son identifiant est retiré vers v_8 et n'est pas réattribué.
  const all = a.files.flatMap((f) => f.entries);
  assert.ok(!all.some((e) => e.id === 'v_275'));
  assert.deepEqual(a.retired.find((x) => x.id === 'v_275'), { id: 'v_275', merged_into: 'v_8' });
  assert.equal(a.idMap.n5_v_275, 'v_8');
  const v8 = all.find((e) => e.id === 'v_8');
  assert.deepEqual([v8.word, v8.writings.map((w) => w.form), v8.readings.map((x) => x.kana), v8.senses.map((s) => s.id)], ['温かい', ['暖かい'], ['あたたかい'], ['v_8_s1', 'v_8_s2']]);
  assert.equal(all.filter((e) => [e.word, ...e.writings.map((w) => w.form)].some((f) => f === '温かい' || f === '暖かい')).length, 1, 'une seule ENTRY porte ces deux graphies');
  // Le lot 07 garde 33 ENTRY et un retrait ; aucune exception-fusion n'a été nécessaire.
  const lot7 = lots.find((l) => l.lot === 'lot-07');
  assert.deepEqual([Object.values(lot7.entries).filter((e) => e.fields).length, Object.values(lot7.entries).filter((e) => e.retire).length], [33, 1]);
  assert.deepEqual(journal.filter((j) => j.kind === 'exception-fusion').map((j) => j.id), ['A2-04-D0336']);
});

// A2-04 · lot 16 fermé : « Préférences, appréciations et états de la personne », entièrement validé
// (21 adjectifs, aucune fusion, aucun tag, aucune lecture décidée), avec tout son journal (51
// décisions, D1076 à D1126), dans sa version révisée après relecture. Dix-huit choix arbitrés, dont :
// traductions naturelles attestées par les fiches (« Aimer », « Vouloir », « Libre »), sans toucher
// à la classe japonaise ; préférences en propriete, désir et états de la personne en etat (A2-ST) ;
// emplois d'adresse conservés en nuance ; un axe d'A2-DIM lorsqu'il décrit directement le sens ;
// évaluations générales sans catégorie ; 立派 à deux sens. Ce ne sont PAS des règles générales :
// chaque sens suit sa fiche, exemple compris.
test('lot 16 : entièrement validé (21 entrées, 22 sens), journal compris', () => {
  const lot16 = readLots().find((l) => l.lot === 'lot-16');
  assert.equal(lot16.title, 'Préférences, appréciations et états de la personne');
  const E = lot16.entries;
  assert.deepEqual(Object.keys(E).sort(), [2, 3, 5, 6, 144, 426, 429, 430, 432, 433, 434, 442, 444, 452, 456, 457, 458, 486, 512, 609, 659].map((n) => `n5_v_${n}`).sort(), 'périmètre arbitré : 21 entrées');
  assertAllValidated(lot16);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune fusion dans le lot 16');
  assert.deepEqual(lot16.additions, []);
  const shape = (id) => E[id].fields.senses.map((s) => `${s.category ? Object.values(s.category).join('/') : 'null'}:${s.semantic_type}`);
  const dims = (id) => E[id].fields.senses.map((s) => s.dimensions.map((d) => `${d.axis}/${d.pole}`).join(','));
  assert.equal(Object.values(E).reduce((n, e) => n + e.fields.senses.length, 0), 22, 'sens du lot');
  // Préférences : une caractéristique attribuée à la personne (propriete, A2-ST) ; le désir de
  // 欲しい : la condition d'une personne dans une situation (etat), parmi les états psychologiques.
  for (const id of ['n5_v_444', 'n5_v_2', 'n5_v_3', 'n5_v_659']) assert.deepEqual(shape(id), ['etre_humain/psychologie_esprit/preferences:propriete'], id);
  assert.deepEqual(shape('n5_v_6'), ['etre_humain/psychologie_esprit/etats_psychologiques:etat']);
  // Les justifications de type citent les définitions d'A2-ST, sans opposer « durable » à « momentané ».
  const reasonOf = (id) => readJournal().find((j) => j.id === id).reason;
  assert.match(reasonOf('A2-04-D1076'), /caractéristique attribuable à une entité, indépendamment du fait qu'elle soit permanente ou variable/);
  assert.match(reasonOf('A2-04-D1084'), /condition dans laquelle se trouve momentanément ou contextuellement une entité/);
  assert.doesNotMatch(`${reasonOf('A2-04-D1076')} ${reasonOf('A2-04-D1084')}`, /caractéristique durable|aucune des sous-catégories/);
  // つまらない : le rattachement à la modestie est présenté comme le choix proposé ; 忙しい : la
  // catégorie nulle se justifie par sa propre fiche (« un emploi du temps chargé »).
  assert.match(reasonOf('A2-04-D1088'), /La fiche ne rattache pas explicitement ces deux traductions à un emploi\. Le choix proposé/);
  assert.match(reasonOf('A2-04-D1122'), /« un emploi du temps chargé »/);
  assert.doesNotMatch(reasonOf('A2-04-D1122'), /obligations/);
  // Traductions naturelles, attestées par les fiches ; la classe japonaise n'est pas touchée.
  assert.deepEqual(E.n5_v_444.fields.senses[0].meaning, { primary: 'Aimer', alternatives: ['Aimé', 'Préféré'] });
  assert.deepEqual(['n5_v_2', 'n5_v_3', 'n5_v_6'].map((id) => E[id].fields.senses[0].meaning.primary), ['Adorer', 'Détester', 'Vouloir']);
  assert.deepEqual(E.n5_v_457.fields.senses[0].meaning, { primary: 'Libre', alternatives: ['Temps libre'] });
  // Traductions exactes de chaque sens : rien n'y entre sans décision (ni l'homophone « gentil » que
  // cite la fiche de 易しい, ni une traduction abandonnée).
  const meanings = Object.fromEntries(Object.entries(E).map(([id, e]) => [id.replace('n5_v_', ''), e.fields.senses.map((s) => [s.meaning.primary, ...s.meaning.alternatives].join(' | '))]));
  assert.deepEqual(meanings, {
    444: ['Aimer | Aimé | Préféré'], 2: ['Adorer | Aimer beaucoup'], 3: ['Détester | Ne pas aimer'], 659: ['Désagréable | Détestable'], 6: ['Vouloir | Désirer'],
    5: ['Amusant | Agréable'], 426: ['Ennuyeux | Inintéressant'],
    429: ['Doué | Habile | Bon (dans un domaine)'], 430: ['Maladroit | Nul | Mauvais (en pratique)'], 456: ['Facile | Simple'], 486: ['Difficile | Compliqué'],
    452: ['Mauvais'], 442: ['Important | Précieux | Cher'], 609: ['Magnifique | Superbe | Splendide', 'Remarquable | Digne'], 432: ['Pratique | Commode | Utile'],
    458: ['Célèbre | Connu'], 434: ['Dangereux | Risqué'],
    433: ['En forme | En bonne santé | Vigoureux'], 457: ['Libre | Temps libre'], 144: ['Occupé | Pris | Débordé'], 512: ['Ça va | Pas de problème | Tout va bien']
  });
  assert.match(E.n5_v_456.fields.nuance, /Même lecture que l'adjectif signifiant « aimable, gentil », qui s'écrit autrement\.$/);
  // 好き : la nuance suit l'exemple (が avant 好き), une correction de la source journalisée ; le
  // champ mécanique des particules n'est pas décidé.
  assert.match(E.n5_v_444.fields.nuance, /marqué par が, avant 好き : りんごが好きです/);
  assert.ok(Object.values(E).flatMap((e) => e.fields.senses).every((s) => !Object.hasOwn(s, 'particles')), 'aucune particule décidée');
  // Classes : seules 立派 et 嫌 étaient décidables (adjectif_na) ; aucune autre n'est décidée.
  assert.deepEqual(Object.keys(E).filter((id) => Object.hasOwn(E[id].fields, 'grammatical_class')).sort(), ['n5_v_609', 'n5_v_659']);
  for (const id of ['n5_v_609', 'n5_v_659']) assert.deepEqual([E[id].fields.grammatical_class, E[id].fields.group], ['adjectif_na', 'na'], id);
  // Plaisir et intérêt, comme les deux sens de 面白い (lot 0) ; compétence sur une même échelle.
  assert.deepEqual(shape('n5_v_5'), ['etre_humain/emotions_sentiments/joie_plaisir:propriete']);
  assert.deepEqual(shape('n5_v_426'), ['etre_humain/psychologie_esprit/attention:propriete']);
  for (const id of ['n5_v_429', 'n5_v_430']) assert.deepEqual(shape(id), ['etre_humain/capacites_aptitudes/habilete:propriete'], id);
  // Dimensions d'A2-DIM : un axe existant lorsqu'il décrit directement le sens, et seulement alors.
  assert.deepEqual(Object.fromEntries(Object.keys(E).filter((id) => dims(id).some((d) => d)).sort().map((id) => [id, dims(id)])), {
    n5_v_432: ['utilite_inutilite/utilite'], n5_v_442: ['importance_insignifiance/importance'],
    n5_v_456: ['facilite_difficulte/facilite'], n5_v_486: ['facilite_difficulte/difficulte']
  });
  // Appréciations générales : sans catégorie (A5), comme いい ; 立派 à deux sens (chose, personne).
  for (const id of ['n5_v_456', 'n5_v_486', 'n5_v_452', 'n5_v_442', 'n5_v_432', 'n5_v_458', 'n5_v_434']) assert.deepEqual(shape(id), ['null:propriete'], id);
  assert.deepEqual(shape('n5_v_609'), ['null:propriete', 'null:propriete']);
  // États de la personne : etat ; 元気 dans l'énergie physique, les trois autres sans catégorie.
  assert.deepEqual(shape('n5_v_433'), ['etre_humain/etats_besoins_physiques/fatigue_energie_physique:etat']);
  for (const id of ['n5_v_457', 'n5_v_144', 'n5_v_512']) assert.deepEqual(shape(id), ['null:etat'], id);
  // Emplois d'adresse (refus, excuse, avertissement) : conservés en nuance, sans sens ni fonction.
  for (const [id, re] of [['n5_v_659', /à refuser nettement : « non, je ne veux pas »/], ['n5_v_452', /à s'excuser : « c'est ma faute, désolé »/], ['n5_v_434', /S'emploie seul pour avertir : « Attention ! »/]]) {
    assert.match(E[id].fields.nuance, re, id);
    assert.equal(E[id].fields.senses.length, 1, id);
  }
  assert.match(E.n5_v_452.fields.nuance, /めが悪いです/, '悪い : l\'exemple de la fiche est conservé');
  // Traductions de la source non développées : signalées en nuance, hors des sens.
  assert.ok(E.n5_v_433.fields.nuance.endsWith('La source donne aussi la traduction « joyeux », sans la développer.'));
  assert.ok(E.n5_v_512.fields.nuance.endsWith('La source donne aussi les traductions « en sécurité » et « correct », sans les développer.'));
  // Rien de mécanique n'est décidé ; aucun compteur, suffixe, tag, relation ni fonction linguistique.
  assert.ok(Object.values(E).every((e) => !Object.hasOwn(e.fields, 'readings') && !Object.hasOwn(e.fields, 'word')));
  assert.ok(Object.values(E).every((e) => e.fields.counter === null && e.fields.suffix === false && e.fields.tags.length === 0 && e.fields.writings.length === 0 && e.fields.suru_compatible === false));
  assert.ok(Object.values(E).flatMap((e) => e.fields.senses).every((s) => s.relations.length === 0
    && s.linguistic_functions.grammatical.length === 0 && s.linguistic_functions.pragmatic_discourse.length === 0));
  // Journal : 51 décisions validées, à la suite des lots précédents ; le lot cite exactement les siennes.
  const own = readJournal().filter((j) => j.lot === 'lot-16');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 51 }, (_, k) => `A2-04-D${String(1076 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated' && j.date === '2026-10-05'));
  const cited = new Set(Object.values(E).flatMap((e) => e.journal));
  assert.deepEqual([...cited].sort(), own.map((j) => j.id), 'le lot cite exactement ses décisions');
  assert.deepEqual(Object.keys(E).filter((id) => E[id].journal.length === 0), ['n5_v_3'], 'seule 嫌い ne demande aucune décision notable');
  const count = (kind, field) => own.filter((j) => j.kind === kind && field.test(j.field)).length;
  assert.deepEqual([count('abandon', /^senses$/), count('categorie-nulle', / · category$/), count('decision', /^senses$/), count('decision', / · dimensions$/),
    count('decision', / · category$/), count('decision', /^grammatical_class$/), count('correction', /^nuance$/), count('abandon', /^nuance$/)], [19, 12, 10, 4, 2, 2, 1, 1]);
  // Chaque dimension portée a sa décision de journal, sur ce sens précisément.
  for (const id of ['n5_v_432', 'n5_v_442', 'n5_v_456', 'n5_v_486']) {
    const d = own.filter((j) => j.entry === id && j.field === 'sens 1 · dimensions');
    assert.equal(d.length, 1, id);
    assert.deepEqual(d[0].after, E[id].fields.senses[0].dimensions, id);
  }
  // Une traduction gardée dans un sens n'est pas aussi abandonnée au journal.
  for (const [id, e] of Object.entries(E)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const dropped = own.filter((j) => j.entry === id && j.kind === 'abandon' && j.field === 'senses').flatMap((j) => j.before);
    assert.deepEqual(dropped.filter((t) => kept.has(t)), [], `${id} : traduction à la fois gardée et abandonnée`);
  }
});

// A2-04 · lot 15 fermé : « Couleurs, formes, dimensions et poids », entièrement validé (29 entrées,
// aucune fusion, aucun tag, aucune lecture décidée), avec tout son journal (50 décisions, D1026 à
// D1075), dans sa version révisée deux fois après relecture. Périmètre arbitré : sept anciennes
// sous-catégories de descriptions_qualites. Dix-sept choix arbitrés, dont : 大きな et 小さな en
// determinant ; seconds sens de 青, 青い et 緑 (verdure en groupe_collectif) ; 色 sans suffix ; un seul
// sens pour 長い, 短い, 低い et 大きな, leurs extensions étant conservées en nuance ; 薄い à trois sens ;
// poids sans catégorie. Ce ne sont PAS des règles générales : chaque sens suit sa fiche, exemple
// compris, et aucune symétrie n'est imposée entre deux entrées.
test('lot 15 : entièrement validé (29 entrées, 36 sens), journal compris', () => {
  const lot15 = readLots().find((l) => l.lot === 'lot-15');
  assert.equal(lot15.title, 'Couleurs, formes, dimensions et poids');
  const E = lot15.entries;
  assert.equal(Object.keys(E).length, 29);
  assertAllValidated(lot15);
  assert.ok(Object.values(E).every((e) => e.fields && !e.retire), 'aucune fusion dans le lot 15');
  assert.deepEqual(lot15.additions, []);
  // Périmètre arbitré : sept anciennes sous-catégories de descriptions_qualites, prises en entier.
  const SUB = ['couleurs', 'couleur', 'dimension', 'taille', 'taille_dimensions', 'forme', 'poids'];
  const scope = SOURCES.vocab.filter((s) => s.category === 'descriptions_qualites' && SUB.includes(s.subcategory)).map((s) => s.id);
  assert.deepEqual(Object.keys(E).sort(), scope.sort());
  const shape = (id) => E[id].fields.senses.map((s) => `${s.category ? Object.values(s.category).join('/') : 'null'}:${s.semantic_type}`);
  assert.equal(Object.values(E).reduce((n, e) => n + e.fields.senses.length, 0), 36, 'sens du lot');
  // Couleurs : un sens par nom et par adjectif, dans la teinte du registre ; 色 au seul niveau 1.
  const HUE = {
    n5_v_466: 'noir_blanc_gris/blanc', n5_v_467: 'noir_blanc_gris/blanc', n5_v_492: 'noir_blanc_gris/noir', n5_v_493: 'noir_blanc_gris/noir',
    n5_v_479: 'couleurs_chromatiques/rouge', n5_v_480: 'couleurs_chromatiques/rouge', n5_v_490: 'couleurs_chromatiques/jaune',
    n5_v_491: 'couleurs_chromatiques/jaune', n5_v_693: 'couleurs_chromatiques/brun'
  };
  for (const [id, hue] of Object.entries(HUE)) assert.deepEqual(shape(id), [`couleurs/${hue}:propriete`], id);
  assert.deepEqual(shape('n5_v_475'), ['couleurs:propriete'], '色');
  // 青 et 青い : le bleu, et le vert de certains éléments ; 緑 : la couleur et la verdure.
  for (const id of ['n5_v_487', 'n5_v_488']) assert.deepEqual(shape(id), ['couleurs/couleurs_chromatiques/bleu:propriete', 'couleurs/couleurs_chromatiques/vert:propriete'], id);
  // La verdure est un ensemble de plantes considéré collectivement, non un organisme (A2-ST).
  assert.deepEqual(shape('n5_v_473'), ['couleurs/couleurs_chromatiques/vert:propriete', 'monde_naturel/vegetation:groupe_collectif']);
  assert.deepEqual(E.n5_v_488.fields.senses[1].meaning, { primary: 'Vert', alternatives: [] }, '青い : aucune portée figurée ajoutée');
  // Taille : un sens ; 大きな et 小さな sont les deux seules classes décidées (determinant, sans groupe).
  for (const id of ['n5_v_440', 'n5_v_441', 'n5_v_445', 'n5_v_446']) assert.deepEqual(shape(id), ['espace_proprietes_spatiales/dimensions/taille:propriete'], id);
  assert.deepEqual(Object.keys(E).filter((id) => Object.hasOwn(E[id].fields, 'grammatical_class')).sort(), ['n5_v_441', 'n5_v_446']);
  for (const id of ['n5_v_441', 'n5_v_446']) assert.deepEqual([E[id].fields.grammatical_class, E[id].fields.group], ['determinant', null], id);
  // 大きな : l'emploi pour une voix, attesté par l'exemple de la fiche, est conservé en nuance, sans
  // second sens ; le maintien du sens unique est une décision explicite du journal (D1075).
  assert.match(E.n5_v_441.fields.nuance, /L'exemple source l'emploie aussi pour une voix forte : 大きなこえ\./);
  assert.match(SOURCES.vocab.find((s) => s.id === 'n5_v_441').example.japanese, /<ruby>大<rt>おお<\/rt><\/ruby>きな\*\* こえ/, 'l\'exemple de la fiche');
  const d1075 = readJournal().find((j) => j.id === 'A2-04-D1075');
  assert.deepEqual([d1075.entry, d1075.field, d1075.kind, d1075.after, E.n5_v_441.journal.at(-1)], ['n5_v_441', 'senses', 'decision', 'un seul sens', 'A2-04-D1075']);
  // La raison ne pose aucun seuil sur la valeur des exemples : le découpage reste à l'arbitrage.
  assert.match(d1075.reason, /sa séparation en un second sens reste soumise à l'arbitrage/);
  assert.doesNotMatch(d1075.reason, /un seul exemple ne documente pas/);
  assert.ok(!Object.hasOwn(E.n5_v_446.fields, 'nuance') || !/voix/.test(E.n5_v_446.fields.nuance), '小さな : rien n\'est ajouté par symétrie');
  // Dimensions : 長い et 短い à un seul sens (la durée en nuance) ; 低い comme le sens « haut » de 高い,
  // à un seul sens, où l'emploi de prix attesté par la fiche est conservé en nuance ; 薄い à trois sens.
  for (const id of ['n5_v_485', 'n5_v_468']) {
    assert.deepEqual(shape(id), ['espace_proprietes_spatiales/dimensions/longueur:propriete'], id);
    assert.match(E[id].fields.nuance, /ou une durée\./, id);
  }
  assert.deepEqual(shape('n5_v_183'), ['espace_proprietes_spatiales/dimensions/hauteur:propriete']);
  assert.match(E.n5_v_183.fields.nuance, /une voix, un prix \(値段は低くありません\)\. Pour dire « bon marché », on emploie plutôt 安い\./);
  assert.match(readJournal().find((j) => j.lot === 'lot-15' && j.entry === 'n5_v_183' && j.field === 'senses').reason, /son exemple porte sur des prix/);
  // 細い : « Étroit », attesté par l'exemple de la fiche, est gardé sans sa parenthèse.
  assert.deepEqual(E.n5_v_469.fields.senses[0].meaning, { primary: 'Mince', alternatives: ['Fin', 'Étroit'] });
  for (const id of ['n5_v_448', 'n5_v_463', 'n5_v_443', 'n5_v_469', 'n5_v_435']) assert.deepEqual(shape(id), ['espace_proprietes_spatiales/dimensions:propriete'], id);
  assert.deepEqual(shape('n5_v_477'), ['espace_proprietes_spatiales/dimensions:propriete', 'couleurs/teintes_nuances/intensite:propriete', 'alimentation_cuisine/gouts_alimentaires:propriete']);
  // Forme et poids : le poids sans catégorie (A5) ; un second sens propre à chaque fiche.
  assert.deepEqual(shape('n5_v_431'), ['espace_proprietes_spatiales/forme/rond:propriete']);
  assert.deepEqual(shape('n5_v_484'), ['null:propriete', 'null:propriete']);
  assert.deepEqual(shape('n5_v_62'), ['null:propriete', 'sante_medecine/maladies_troubles:propriete']);
  // Traductions de la source non développées : signalées en nuance, jamais gardées dans un sens.
  for (const [id, t] of [['n5_v_441', 'important'], ['n5_v_446', 'modeste'], ['n5_v_435', 'chaleureux (pour l\'accueil)']]) {
    assert.ok(E[id].fields.nuance.endsWith(`La source donne aussi la traduction « ${t} », sans la développer.`), id);
    if (id !== 'n5_v_435') assert.match(E[id].fields.nuance, /^Toujours placé directement devant un nom, sans ajout de la particule な\./, id);
    assert.equal(E[id].fields.senses.length, 1, id);
  }
  // Rien de mécanique n'est décidé : aucune lecture, aucune forme ; aucun compteur, suffixe ni tag ;
  // aucune relation (la dérivation nom / adjectif n'en autorise aucune), aucune fonction linguistique.
  assert.ok(Object.values(E).every((e) => !Object.hasOwn(e.fields, 'readings') && !Object.hasOwn(e.fields, 'word')));
  assert.ok(Object.values(E).every((e) => e.fields.counter === null && e.fields.suffix === false && e.fields.tags.length === 0 && e.fields.writings.length === 0));
  assert.ok(Object.values(E).flatMap((e) => e.fields.senses).every((s) => s.relations.length === 0 && s.dimensions.length === 0
    && s.linguistic_functions.grammatical.length === 0 && s.linguistic_functions.pragmatic_discourse.length === 0));
  // Journal : 50 décisions validées, à la suite des lots précédents ; le lot cite exactement les siennes.
  const own = readJournal().filter((j) => j.lot === 'lot-15');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 50 }, (_, k) => `A2-04-D${String(1026 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated' && j.date === '2026-10-05'));
  const cited = new Set(Object.values(E).flatMap((e) => e.journal));
  assert.deepEqual([...cited].sort(), own.map((j) => j.id), 'le lot cite exactement ses décisions');
  assert.deepEqual(Object.keys(E).filter((id) => E[id].journal.length === 0), ['n5_v_431'], 'seule 丸い ne demande aucune décision notable');
  const count = (kind, field) => own.filter((j) => j.kind === kind && field.test(j.field)).length;
  assert.deepEqual([count('abandon', /^senses$/), count('decision', /^senses$/), count('decision', / · category$/), count('categorie-nulle', / · category$/),
    count('decision', /^grammatical_class$/), count('decision', /^suffix$/), count('correction', /^senses$/)], [24, 12, 7, 3, 2, 1, 1]);
  // Une traduction gardée dans un sens n'est pas aussi abandonnée au journal.
  for (const [id, e] of Object.entries(E)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const dropped = own.filter((j) => j.entry === id && j.kind === 'abandon').flatMap((j) => j.before);
    assert.deepEqual(dropped.filter((t) => kept.has(t)), [], `${id} : traduction à la fois gardée et abandonnée`);
  }
});

// A2-04 · 5.15 fermée : le lot 14 est entièrement validé (aucune fusion, aucun tag), avec tout son
// journal (72 décisions, D0954 à D1025), dans sa version révisée par 5.15b. Périmètre : les 29
// entrées de nombres_quantites restantes. Trois lectures y sont décidées : 九つ (lecture fautive
// connue, liste fermée), 一人 et 二十歳 (furigana de la source invalides). Choix arbitrés : série en
// つ en classe nom, à deux sens (objets, âge) sauf 一つ ; âge chiffré en quantite_valeur ; unités en
// type nul ; aucun counter. Ce n'est PAS une règle générale (« un emploi avec compteur fait un
// sens ») : les sens suivent les fiches de ce lot.
test('5.15 : le lot 14 est entièrement validé (29 entrées), journal compris', () => {
  const lot14 = readLots().find((l) => l.lot === 'lot-14');
  assert.equal(lot14.title, 'Nombres, compteurs et mesures');
  assert.equal(Object.keys(lot14.entries).length, 29);
  assertAllValidated(lot14);
  assert.ok(Object.values(lot14.entries).every((e) => e.fields && !e.retire), 'aucune fusion dans le lot 14');
  assert.deepEqual(lot14.additions, []);
  const E = lot14.entries;
  const shape = (id) => E[id].fields.senses.map((s) => `${s.category ? Object.values(s.category).join('/') : 'null'}:${s.semantic_type}`);
  assert.equal(Object.values(E).reduce((n, e) => n + e.fields.senses.length, 0), 38, 'sens du lot');
  // Série en つ : classe nom ; deux sens (objets, âge) de 二つ à 九つ, un seul pour 一つ.
  const TSU = ['n5_v_370', 'n5_v_373', 'n5_v_375', 'n5_v_377', 'n5_v_379', 'n5_v_381', 'n5_v_383', 'n5_v_387'];
  for (const id of TSU) assert.deepEqual(shape(id), ['nombres_quantification/nombres/cardinaux:quantite_valeur', 'etre_humain/cycle_de_vie:quantite_valeur'], id);
  assert.deepEqual(shape('n5_v_368'), ['nombres_quantification/nombres/cardinaux:quantite_valeur'], '一つ : un seul sens');
  const NAMED = [...TSU, 'n5_v_368', 'n5_v_627', 'n5_v_631', 'n5_v_632'];
  assert.deepEqual(Object.keys(E).filter((id) => Object.hasOwn(E[id].fields, 'grammatical_class')).sort(), [...NAMED].sort());
  assert.ok(NAMED.every((id) => E[id].fields.grammatical_class === 'nom' && E[id].fields.group === 'nom'));
  // Nombres simples : un sens cardinal ; classe numeral mécanique, donc non décidée ici.
  for (const id of ['n5_v_365', 'n5_v_367', 'n5_v_371', 'n5_v_372', 'n5_v_376', 'n5_v_378', 'n5_v_380', 'n5_v_382', 'n5_v_384', 'n5_v_385', 'n5_v_388', 'n5_v_389']) {
    assert.deepEqual(shape(id), ['nombres_quantification/nombres/cardinaux:quantite_valeur'], id);
  }
  assert.deepEqual(E.n5_v_371.fields.senses[0].meaning, { primary: 'Dix mille', alternatives: ['Myriade'] });
  // Personnes et âge ; unités en type nul ; 半分 comme le sens « moitié » de 半 ; ページ comme un nom.
  assert.deepEqual(shape('n5_v_627'), ['nombres_quantification/comptage_compteurs/personnes:quantite_valeur', 'null:etat']);
  assert.deepEqual(shape('n5_v_631'), ['nombres_quantification/comptage_compteurs/personnes:quantite_valeur']);
  assert.deepEqual(shape('n5_v_632'), ['etre_humain/cycle_de_vie:quantite_valeur']);
  assert.deepEqual(['n5_v_364', 'n5_v_611', 'n5_v_366'].map((id) => shape(id)[0]), ['nombres_quantification:null', 'nombres_quantification:null', 'espace_proprietes_spatiales/dimensions/longueur:null']);
  assert.deepEqual(shape('n5_v_650'), ['nombres_quantification/proportions/fraction:quantite_valeur']);
  assert.deepEqual(shape('n5_v_623'), ['communication_langage/lecture:objet_artefact']);
  const byId = new Map([...SOURCES.vocab, ...SOURCES.hj].map((s) => [s.id, s]));
  assert.ok(Object.keys(lot14.entries).every((id) => byId.get(id).category === 'nombres_quantites'), 'périmètre : nombres_quantites seulement');
  const own = readJournal().filter((j) => j.lot === 'lot-14');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 72 }, (_, k) => `A2-04-D${String(954 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated'));
  const cited = new Set(Object.values(lot14.entries).flatMap((e) => e.journal));
  assert.deepEqual([...cited].sort(), own.map((j) => j.id), 'le lot cite exactement ses décisions');
  // Lectures décidées : ces trois-là, et aucune autre. Celle de 九つ est corrigée dans le lot, pas
  // dans la source.
  const decided = Object.entries(lot14.entries).filter(([, e]) => Object.hasOwn(e.fields, 'readings'));
  assert.deepEqual(Object.fromEntries(decided.map(([id, e]) => [id, e.fields.readings.map((r) => [r.kana, r.furigana])])), {
    n5_v_375: [['ここのつ', '<ruby>九<rt>ここの</rt></ruby>つ']],
    n5_v_627: [['ひとり', '<ruby>一<rt>ひと</rt></ruby><ruby>人<rt>り</rt></ruby>']],
    n5_v_632: [['はたち', '<ruby>二十歳<rt>はたち</rt></ruby>']]
  });
  assert.equal(byId.get('n5_v_375').reading, 'ここなつ', 'source figée inchangée');
  // Révision 5.15b : « Néant » n'est pas une traduction du sens numérique de ゼロ et de 零 ; il est
  // signalé en nuance comme traduction de la source non développée. « Un couple » garde, pour 二人,
  // la qualification de la source.
  for (const id of ['n5_v_365', 'n5_v_389']) {
    assert.deepEqual(lot14.entries[id].fields.senses.map((s) => s.meaning), [{ primary: 'Zéro', alternatives: [] }], id);
    assert.match(lot14.entries[id].fields.nuance, /La source donne aussi la traduction « néant », sans la développer\.$/, id);
  }
  assert.deepEqual(lot14.entries.n5_v_631.fields.senses[0].meaning, { primary: 'Deux personnes', alternatives: ['Tous les deux', 'Un couple (par extension)'] });
  // Aucun compteur, aucun suffixe, aucun tag : seule 匹 porte counter dans le corpus.
  assert.ok(Object.values(lot14.entries).every((e) => e.fields.counter === null && e.fields.suffix === false && e.fields.tags.length === 0));
  // Une traduction gardée dans un sens n'est pas aussi abandonnée au journal.
  for (const [id, e] of Object.entries(lot14.entries)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const dropped = own.filter((j) => j.entry === id && j.kind === 'abandon').flatMap((j) => j.before);
    assert.deepEqual(dropped.filter((t) => kept.has(t)), [], `${id} : traduction à la fois gardée et abandonnée`);
  }
});

// A2-04 · 5.14 fermée : le lot 13 est entièrement validé (aucune fusion, aucun tag de lieu), avec
// tout son journal (109 décisions, D0845 à D0953), dans sa version révisée par 5.14b. Périmètre
// arbitré : les 26 entrées de temps_calendrier restantes et 夏休み. Choix arbitrés : jours du mois à
// deux sens, dans l'ordre de chaque fiche ; durées en quantite_valeur ; 半 suffixe ; 時間 sans
// counter (lacune du registre, ouverte) ; カレンダー sans catégorie, comme 時計.
test('5.14 : le lot 13 est entièrement validé (27 entrées), journal compris', () => {
  const lot13 = readLots().find((l) => l.lot === 'lot-13');
  assert.equal(lot13.title, 'Calendrier, dates et durées');
  assert.equal(Object.keys(lot13.entries).length, 27);
  assertAllValidated(lot13);
  assert.ok(Object.values(lot13.entries).every((e) => e.fields && !e.retire), 'aucune fusion dans le lot 13');
  assert.deepEqual(lot13.additions, []);
  const E = lot13.entries;
  const all = Object.entries(E);
  assert.equal(all.reduce((n, [, e]) => n + e.fields.senses.length, 0), 42, 'sens du lot');
  assert.deepEqual(all.filter(([, e]) => e.fields.tags.length || e.fields.senses.some((s) => (s.tags || []).length)).map(([id]) => id), [], 'aucun tag de lieu dans le lot 13');
  // Jours du mois : deux sens, la durée (quantite_valeur) et la date ; seule 三日 met la date en premier.
  const DAYS = ['n5_v_292', 'n5_v_293', 'n5_v_294', 'n5_v_295', 'n5_v_296', 'n5_v_297', 'n5_v_307', 'n5_v_308', 'n5_v_309', 'n5_v_313'];
  const shape = (id) => E[id].fields.senses.map((s) => `${s.category.level_2}${s.category.level_3 ? `/${s.category.level_3}` : ''}:${s.semantic_type}`);
  for (const id of DAYS) {
    const expected = id === 'n5_v_293' ? ['calendrier/dates:concept_abstrait', 'duree:quantite_valeur'] : ['duree:quantite_valeur', 'calendrier/dates:concept_abstrait'];
    assert.deepEqual(shape(id), expected, id);
  }
  // 一日 et 一月 : un seul sens, une durée, donc quantite_valeur comme les durées des jours du mois.
  for (const id of ['n5_v_288', 'n5_v_291']) assert.deepEqual(shape(id), ['duree:quantite_valeur'], id);
  // 半 : une fraction et une demi-heure, deux quantités.
  assert.deepEqual(shape('n5_v_311'), ['proportions/fraction:quantite_valeur', 'unites_temporelles/seconde_minute_heure:quantite_valeur']);
  // Jours de la semaine et 誕生日 : repères du calendrier, un sens, concept_abstrait.
  for (const id of ['n5_v_314', 'n5_v_317', 'n5_v_323', 'n5_v_325', 'n5_v_335', 'n5_v_336', 'n5_v_338']) assert.deepEqual(shape(id), ['calendrier/jours:concept_abstrait'], id);
  assert.deepEqual(shape('n5_v_337'), ['calendrier/dates:concept_abstrait']);
  // Classe décidée (nom) pour les douze composés numéraux, et pour eux seuls.
  assert.deepEqual(all.filter(([, e]) => Object.hasOwn(e.fields, 'grammatical_class')).map(([id]) => id).sort(), [...DAYS, 'n5_v_288', 'n5_v_291'].sort());
  assert.ok([...DAYS, 'n5_v_288', 'n5_v_291'].every((id) => E[id].fields.grammatical_class === 'nom' && E[id].fields.group === 'nom'));
  // 半 : seule ENTRY du lot à porter suffix ; 時間 : pas de counter, type nul sur le sens « heure ».
  assert.deepEqual(all.filter(([, e]) => e.fields.suffix).map(([id]) => id), ['n5_v_311']);
  assert.ok(all.every(([, e]) => e.fields.counter === null));
  assert.deepEqual(E.n5_v_321.fields.senses.map((s) => s.semantic_type), ['concept_abstrait', null]);
  assert.deepEqual(E.n5_v_316.fields.senses.map((s) => [s.meaning.primary, s.semantic_type]), [['Année', 'concept_abstrait'], ['Âge', 'propriete']]);
  assert.equal(E.n5_v_287.fields.senses[0].category, null, 'カレンダー : catégorie nulle (A5)');
  assert.deepEqual([E.n5_v_634, E.n5_v_268].map((e) => [e.fields.senses.length, e.fields.senses[0].category.level_2]), [[1, 'moments_periodes'], [1, 'moments_periodes']]);
  const byId = new Map([...SOURCES.vocab, ...SOURCES.hj].map((s) => [s.id, s]));
  const outside = Object.keys(lot13.entries).filter((id) => byId.get(id).category !== 'temps_calendrier');
  assert.deepEqual(outside, ['n5_v_268'], 'seule 夏休み vient d\'une autre ancienne catégorie');
  const own = readJournal().filter((j) => j.lot === 'lot-13');
  assert.deepEqual(own.map((j) => j.id), Array.from({ length: 109 }, (_, k) => `A2-04-D${String(845 + k).padStart(4, '0')}`));
  assert.ok(own.every((j) => j.status === 'validated'));
  const cited = new Set(Object.values(lot13.entries).flatMap((e) => e.journal));
  assert.deepEqual([...cited].sort(), own.map((j) => j.id), 'le lot cite exactement ses décisions');
  // Révision 5.14b, limitée à 後 : le sens temporel garde « Plus tard » ET porte deictique (A7, §4) ;
  // « Le reste », attesté par les traductions de la source, est conservé comme sens candidat.
  const ato = lot13.entries.n5_v_663.fields.senses;
  assert.deepEqual(ato.map((s) => [s.meaning.primary, ...s.meaning.alternatives]), [['Après', 'Plus tard'], ['Derrière'], ['Le reste']]);
  assert.deepEqual(ato.map((s) => s.linguistic_functions.grammatical), [['deictique'], [], []]);
  // Seul sens déictique du lot : les jours, les dates et les durées sont des repères du calendrier.
  const deictic = Object.entries(lot13.entries).filter(([, e]) => e.fields.senses.some((s) => s.linguistic_functions.grammatical.includes('deictique'))).map(([id]) => id);
  assert.deepEqual(deictic, ['n5_v_663']);
  // Un sens qui garde une traduction ne la retrouve pas dans une décision d'abandon.
  for (const [id, e] of Object.entries(lot13.entries)) {
    const kept = new Set(e.fields.senses.flatMap((s) => [s.meaning.primary, ...s.meaning.alternatives]));
    const dropped = own.filter((j) => j.entry === id && j.kind === 'abandon').flatMap((j) => j.before);
    assert.deepEqual(dropped.filter((t) => kept.has(t)), [], `${id} : traduction à la fois gardée et abandonnée`);
  }
});

// 5.13-C fermée : les 13 corrections sont VALIDÉES. Chacune porte sur le seul champ en cause, cite
// sa décision de correction, et ne touche pas aux décisions historiques de l'entrée.
test('5.13-C : 13 entrées corrigées et revalidées, une correction validée chacune (D0827 à D0839)', () => {
  const journal = readJournal();
  const byId = new Map(journal.map((j) => [j.id, j]));
  const corrections = journal.filter((j) => j.id >= FIRST_CORRECTION && Object.hasOwn(CORRECTED_513C, j.lot));
  assert.deepEqual(corrections.map((j) => j.id), Array.from({ length: 13 }, (_, k) => `A2-04-D${String(827 + k).padStart(4, '0')}`));
  assert.ok(corrections.every((j) => j.status === 'validated' && j.kind === 'correction'));
  // Le journal : 1 568 décisions, D0001 à D1568, sans trou ; les 1 509 premières sont validées ; les
  // 68 de D1302 à D1369 sont celles du lot 20, les 34 de D1370 à D1403 celles du lot 21, les 32 de
  // D1404 à D1435 celles du lot 22, les 74 de D1436 à D1509 celles du lot 23 ; les 59 dernières (D1510
  // à D1568), celles du lot 24, toutes validées.
  // Lot 25 (2026-10-07) : D1569, validée ; tout le journal est validé.
  assert.deepEqual(journal.map((j) => j.id), Array.from({ length: 1569 }, (_, k) => `A2-04-D${String(k + 1).padStart(4, '0')}`));
  assert.ok(journal.every((j) => j.status === 'validated'));
  assert.deepEqual(journal.map((j, k) => [k, j.lot]).filter(([, l]) => l === 'lot-25').map(([k]) => k), [1568]);
  assert.deepEqual(journal.map((j, k) => [k, j.lot]).filter(([, l]) => l === 'lot-24').map(([k]) => k), Array.from({ length: 59 }, (_, k) => 1509 + k));
  assert.deepEqual(journal.map((j, k) => [k, j.lot]).filter(([, l]) => l === 'lot-23').map(([k]) => k), Array.from({ length: 74 }, (_, k) => 1435 + k));
  assert.deepEqual(journal.map((j, k) => [k, j.lot]).filter(([, l]) => l === 'lot-22').map(([k]) => k), Array.from({ length: 32 }, (_, k) => 1403 + k));
  assert.deepEqual(journal.map((j, k) => [k, j.lot]).filter(([, l]) => l === 'lot-21').map(([k]) => k), Array.from({ length: 34 }, (_, k) => 1369 + k));
  assert.deepEqual(journal.map((j, k) => [k, j.lot]).filter(([, l]) => l === 'lot-20').map(([k]) => k), Array.from({ length: 68 }, (_, k) => 1301 + k));
  assert.deepEqual(journal.map((j, k) => [k, j.lot]).filter(([, l]) => l === 'lot-19').map(([k]) => k), Array.from({ length: 61 }, (_, k) => 1240 + k));
  assert.deepEqual(journal.map((j, k) => [k, j.lot]).filter(([, l]) => l === 'lot-18').map(([k]) => k), Array.from({ length: 73 }, (_, k) => 1167 + k));
  const lots = new Map(readLots().map((l) => [l.lot, l]));
  const expected = {
    n5_v_555: ['writings', '<ruby>曲<rt>まが</rt></ruby>る'],
    n5_v_15: ['おまわりさん', 'お<ruby>巡<rt>まわ</rt></ruby>りさん'],
    n5_v_16: ['おにいさん', 'お<ruby>兄<rt>にい</rt></ruby>さん'],
    n5_v_28: ['おとな', '<ruby>大人<rt>おとな</rt></ruby>'],
    n5_v_283: ['かぜ', '<ruby>風邪<rt>かぜ</rt></ruby>'],
    n5_v_229: ['ちりがみ', 'ちり<ruby>紙<rt>がみ</rt></ruby>'],
    n5_v_77: ['うわぎ', '<ruby>上<rt>うわ</rt></ruby><ruby>着<rt>ぎ</rt></ruby>'],
    n5_v_223: ['さいふ', '<ruby>財<rt>さい</rt></ruby><ruby>布<rt>ふ</rt></ruby>'],
    n5_v_640: ['やおや', '<ruby>八百<rt>やお</rt></ruby><ruby>屋<rt>や</rt></ruby>'],
    n5_v_694: ['にもつ', '<ruby>荷<rt>に</rt></ruby><ruby>物<rt>もつ</rt></ruby>'],
    n5_v_715: ['くつした', '<ruby>靴<rt>くつ</rt></ruby><ruby>下<rt>した</rt></ruby>'],
    n5_v_643: ['きって', '<ruby>切<rt>きっ</rt></ruby><ruby>手<rt>て</rt></ruby>'],
    n5_v_190: ['すぽーつ', 'スポーツ']
  };
  for (const [name, ids] of Object.entries(CORRECTED_513C)) {
    for (const id of ids) {
      const d = lots.get(name).entries[id];
      assert.equal(d.status, 'validated', id);
      const added = d.journal.map((j) => byId.get(j)).filter((j) => j.id >= FIRST_CORRECTION);
      assert.equal(added.length, 1, `${id} : une seule correction`);
      assert.deepEqual([added[0].lot, added[0].entry, added[0].status, added[0].kind], [name, id, 'validated', 'correction']);
      // 曲がる : la graphie 曲る ; les autres : la lecture, devenue décidable par A8.
      if (id === 'n5_v_555') {
        assert.equal(added[0].field, 'writings');
        assert.ok(!Object.hasOwn(d.fields, 'readings'));
        assert.deepEqual(d.fields.writings, [{ form: '曲る', furigana: expected[id][1] }]);
      } else {
        assert.equal(added[0].field, 'readings', id);
        assert.deepEqual(d.fields.readings.map((r) => [r.kana, r.furigana]), [expected[id]], id);
      }
    }
  }
  assert.equal(Object.values(CORRECTED_513C).flat().length, 13);
});

// Une décision validée n'est jamais modifiée en silence (CLAUDE.md, invariants du journal) : l'empreinte
// des décisions validées est fixée ici, plage par plage, et ne change que par une décision nouvelle.
// À chaque validation de lot, la plage s'étend ; la valeur se recalcule alors une seule fois.
test('journal : empreinte des décisions validées (D0001 à D1569), inchangée', () => {
  const journal = readJournal();
  const validatedPart = journal.slice(0, 1569);
  assert.ok(validatedPart.every((j) => j.status === 'validated'));
  assert.equal(validatedPart.at(-1).id, 'A2-04-D1569');
  // D0001 à D1509 : empreinte fixée avant la validation du lot 24 ; elle ne change pas.
  assert.equal(createHash('sha256').update(JSON.stringify(validatedPart.slice(0, 1509))).digest('hex'), '6fab1b44944f722d826c59529c0bde2f88b7ba69e9f6c5e08a5ca6216cc82bf3');
  // D0001 à D1568 : plage étendue à la validation du lot 24 (2026-10-06).
  assert.equal(createHash('sha256').update(JSON.stringify(validatedPart.slice(0, 1568))).digest('hex'), 'ed51cd67ddd4f3227087ae2c8bc9f60878ce50ce402277e2345bdb1f41ffcc75');
  // D0001 à D1569 : plage étendue à la validation du lot 25 (2026-10-07).
  assert.equal(createHash('sha256').update(JSON.stringify(validatedPart)).digest('hex'), 'c7375b5bbd5d5dd55ea408c7f43b8e317d416c742a6118bf056708006bf3ddbe');
});

test('journal : chaque décision est citée par une entrée de lot', () => {
  const journal = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8'));
  const lots = readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(WORK, 'lots', f), 'utf8')));
  const cited = new Set(lots.flatMap((l) => Object.values(l.entries).flatMap((e) => e.journal ?? [])));
  assert.deepEqual(journal.filter((j) => !cited.has(j.id)).map((j) => j.id), []);
});

test('rapport : généré depuis le JSON, distingue proposition et décision', () => {
  const md = renderLotReport(lot({
    n5_v_188: { status: 'proposed', fields: fieldsFor('n5_v_188') },
    n5_v_401: validated(fieldsFor('n5_v_401'))
  }), SOURCES);
  assert.match(md, /n5_v_188 → v_188/);
  assert.match(md, /PROPOSITION, non validée/);
  assert.match(md, /décision validée/);
  assert.match(md, /readings : \*\*exception\*\*/);
  assert.match(md, /Contexte \(anciens exemples, lecture seule\)/);
  assert.match(md, /\| 1 \| \*\*Illustratif\*\*/, 'sens présentés en tableau');
});

test('rapport : groupes candidats réunis, décisions du journal avec leur raison', () => {
  const j = [{ id: 'A2-04-D0001', date: '2026-10-02', lot: 'lot-test', entry: 'n5_v_472', field: 'entrée', kind: 'fusion', before: null, after: 'n5_v_424', reason: 'Même unité, deux graphies.' }];
  const md = renderLotReport(lot({
    n5_v_472: { status: 'proposed', journal: ['A2-04-D0001'], retire: { merged_into: 'n5_v_424' } },
    n5_v_188: { status: 'proposed', fields: fieldsFor('n5_v_188') },
    n5_v_424: { status: 'proposed', journal: ['A2-04-D0001'], fields: fieldsFor('n5_v_424') }
  }), SOURCES, j);
  assert.match(md, /## Groupe candidat · きれい \/ 綺麗/);
  assert.match(md, /\*\*Proposition du groupe\*\* : n5_v_424 : gardée ; n5_v_472 : fusionnée dans n5_v_424/);
  assert.match(md, /A2-04-D0001\*\* \(fusion, entrée\) : Même unité, deux graphies\./);
  // Les deux entrées du groupe se suivent, avant les autres entrées.
  assert.ok(md.indexOf('### n5_v_424') < md.indexOf('### n5_v_472') && md.indexOf('### n5_v_472') < md.indexOf('### n5_v_188'));
});

// Publication (A2-04 · 5.17, arbitrage Q2 et Q7) : `publish --write` est l'UNIQUE chemin vers data/.
// Un seul point d'écriture y mène, dans run.mjs, et il vient après le refus des conditions
// bloquantes et après la garde de l'essai sans `--write`. L'amorçage de l'inventaire, lui, n'écrit
// jamais dans data/. Aucun autre outil de reconstruction n'écrit dans data/.
test('un seul chemin écrit dans data/ : publish --write ; aucun outil ne relit un rapport Markdown', () => {
  const dir = join(ROOT, 'tools', 'reconstruction');
  const sites = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.mjs'))) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/writeFileSync\(([^,]+),/g)) if (/DATA/.test(m[1])) sites.push([f, m.index]);
    assert.ok(!/\.md['"`]\)?\s*[,)]?.*readFileSync|readFileSync\([^)]*\.md/.test(src), `${f} : lecture d'un Markdown`);
  }
  assert.deepEqual(sites.map(([f]) => f), ['run.mjs'], 'un seul point d\'écriture vers data/, dans run.mjs');
  const src = readFileSync(join(dir, 'run.mjs'), 'utf8');
  const at = sites[0][1];
  const start = src.indexOf("if (command === 'publish')");
  assert.ok(start !== -1 && start < at, 'le point d\'écriture est dans la commande publish');
  const before = src.slice(start, at);
  // Dans l'ordre : l'amorçage (qui sort sans écrire dans data/), le refus des conditions bloquantes,
  // la garde de l'essai sans --write.
  const order = ['if (bootstrap) {', 'if (p.blocking.length) {', 'if (!write) {'].map((s) => before.indexOf(s));
  assert.ok(order.every((i) => i !== -1), 'les trois gardes précèdent l\'écriture');
  assert.deepEqual([...order].sort((a, b) => a - b), order, 'amorçage, puis conditions bloquantes, puis essai');
  const bootstrap = before.slice(order[0], order[1]);
  assert.match(bootstrap, /writeFileSync\(inventoryPath,/, 'l\'amorçage écrit le seul inventaire');
  assert.ok(!/writeFileSync\([^,]*DATA/.test(bootstrap), 'l\'amorçage n\'écrit jamais dans data/');
  assert.equal(bootstrap.match(/process\.exit\(/g).length, 2, 'l\'amorçage sort toujours, refusé ou accepté');
  // publish.mjs calcule en mémoire : aucun accès au disque.
  assert.ok(!/node:fs|writeFileSync|readFileSync/.test(readFileSync(join(dir, 'publish.mjs'), 'utf8')), 'publish.mjs : aucun accès au disque');
});
