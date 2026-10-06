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
const readJournal = () => JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8'));
const readLots = () => readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(readFileSync(join(WORK, 'lots', f), 'utf8')));
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
  const lot3 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-03.json'), 'utf8'));
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
  assert.ok(!others.some((id) => id >= 'A2-04-D1168'), 'aucun autre lot ne cite une décision du lot 18');
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
test('lot 18 : dans l\'assemblage réel (590 ENTRY, 32 retraits, 97 entrées écartées), 23 verbes sans relation', () => {
  const lots = readLots();
  const journal = readJournal();
  const a = assemble({ sources: SOURCES, lots, journal });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [590, 32, 97]);
  assert.ok(a.excluded.every((x) => x.reason === 'non décidée'));
  // Avertissements : les 75 des lots 0 à 17, et les 23 catégories nulles du lot, justifiées.
  assert.equal(r.warnings.length, 98);
  const ids = new Set(LOT18_IDS.map((id) => id.replace('n5_', '')));
  const mine = r.warnings.filter((w) => ids.has(w.where.split(' · ')[1]));
  assert.ok(mine.every((w) => w.code === 'categorie-nulle'));
  assert.deepEqual(mine.map((w) => w.where.split(' · ').at(-1)).sort(), ['v_130_s1', 'v_50_s2', 'v_522_s1', 'v_522_s2', 'v_528_s1', 'v_532_s1', 'v_536_s3', 'v_539_s1', 'v_539_s2', 'v_541_s1', 'v_541_s2', 'v_545_s1',
    'v_560_s1', 'v_560_s2', 'v_561_s1', 'v_567_s1', 'v_576_s1', 'v_579_s1', 'v_580_s1', 'v_637_s1', 'v_709_s1', 'v_710_s1', 'v_79_s1']);
  const all = a.files.flatMap((f) => f.entries);
  const byId = new Map(all.map((e) => [e.id, e]));
  const mineEntries = [...ids].map((id) => byId.get(id));
  assert.ok(mineEntries.every((e) => e && e.linguistic.grammatical_class === 'verbe' && ['u', 'ru'].includes(e.linguistic.group) && e.senses.every((s) => s.relations.length === 0)), 'les 23 ENTRY sont des verbes, sans relation');
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
// Après la validation du lot 18 : 590 ENTRY, 32 retraits, 97 entrées écartées ; le complément
// d'I4 et d'I5 (addendum A8) passe sur toutes les ENTRY assemblées. Aucune proposition n'est en
// cours : toutes les entrées décidées et tout le journal sont validés (lots 0 à 18).
test('espace de travail réel : assemblage partiel sans problème ni erreur', () => {
  const lots = readLots();
  const a = assemble({ sources: SOURCES, lots, journal: readJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  const decisions = lots.flatMap((l) => Object.values(l.entries)).filter((d) => d.status === 'validated');
  assert.equal(a.files.reduce((n, f) => n + f.entries.length, 0), decisions.filter((d) => d.fields).length);
  assert.equal(a.retired.length, 1 + decisions.filter((d) => d.retire).length);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [590, 32, 97]);
  assert.ok(a.excluded.every((x) => x.reason === 'non décidée'), 'aucune proposition en cours');
  assert.ok(lots.every((l) => Object.values(l.entries).every((d) => d.status === 'validated')), 'toutes les entrées décidées sont validées');
  assert.equal(lots.length, 19, 'lots 0 à 18');
  // Avertissements : 98, tous justifiés au journal ; les trois du lot 15, les douze du lot 16, les
  // neuf du lot 17 et les vingt-trois du lot 18 (contrôlés dans son test) sont leurs catégories nulles.
  assert.equal(r.warnings.length, 98);
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
  const a = assemble({ sources: SOURCES, lots, journal });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [590, 32, 97]);
  assert.ok(a.excluded.every((x) => x.reason === 'non décidée'));
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
  // Tout le journal est validé : 1 240 décisions, D0001 à D1240, sans trou ; les 73 dernières
  // (D1168 à D1240) sont celles du lot 18.
  assert.deepEqual(journal.map((j) => j.id), Array.from({ length: 1240 }, (_, k) => `A2-04-D${String(k + 1).padStart(4, '0')}`));
  assert.ok(journal.every((j) => j.status === 'validated'));
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

test('aucun outil de reconstruction n\'écrit dans data/ ni ne relit un rapport Markdown', () => {
  const dir = join(ROOT, 'tools', 'reconstruction');
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.mjs'))) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/writeFileSync\(([^,]+),/g)) assert.ok(!/DATA/.test(m[1]), `${f} : écriture vers data/`);
    assert.ok(!/\.md['"`]\)?\s*[,)]?.*readFileSync|readFileSync\([^)]*\.md/.test(src), `${f} : lecture d'un Markdown`);
  }
});
