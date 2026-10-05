// Espace de travail (A2-04 · 5.0) : sources figées, aucun lot, rapport généré, data/ intouché.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

// A2-04 · 5.8 fermée : le lot 07 est entièrement validé (aucune fusion ; 匹, premier compteur),
// avec tout son journal.
test('5.8 : le lot 07 est entièrement validé (34 entrées), journal compris', () => {
  const lot7 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-07.json'), 'utf8'));
  assert.equal(Object.keys(lot7.entries).length, 34);
  assert.ok(Object.values(lot7.entries).every((e) => e.status === 'validated'));
  assert.ok(Object.values(lot7.entries).every((e) => !e.retire), 'aucune fusion dans le lot 07');
  assert.deepEqual(lot7.entries.n5_v_648.fields.counter, { counter_for: ['small_animals'] });
  assert.deepEqual(lot7.additions, []);
  const own = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8')).filter((j) => j.lot === 'lot-07');
  assert.equal(own.length, 48);
  assert.ok(own.every((j) => j.status === 'validated'));
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

// L'espace de travail réel s'assemble sans erreur : ni problème de décision, ni erreur du
// validateur lexical, ni attente. Les comptes suivent les décisions validées, lot après lot.
// Après la validation du lot 14 : 501 ENTRY, 31 retraits, 187 entrées écartées ; le complément
// d'I4 et d'I5 (addendum A8) passe sur toutes les ENTRY assemblées. Aucune proposition n'est en
// cours : toutes les entrées décidées et tout le journal sont validés.
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
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [501, 31, 187]);
  assert.ok(a.excluded.every((x) => x.reason === 'non décidée'), 'aucune proposition en cours');
  assert.ok(lots.every((l) => Object.values(l.entries).every((d) => d.status === 'validated')), 'toutes les entrées décidées sont validées');
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
  // Tout le journal est validé : 1 025 décisions, D0001 à D1025, sans trou.
  assert.deepEqual(journal.map((j) => j.id), Array.from({ length: 1025 }, (_, k) => `A2-04-D${String(k + 1).padStart(4, '0')}`));
  assert.ok(journal.every((j) => j.status === 'validated'));
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
