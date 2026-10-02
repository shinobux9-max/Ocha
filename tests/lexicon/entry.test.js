// Tests de tools/lexicon/entry.mjs (A2-03 · 4.2) : I1 à I6, I16, I17, A1 à A3, N1.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLexicon, readRegistries, parseFurigana, kanjiOf } from '../../tools/lexicon/index.mjs';
import { DATA_DIR } from '../helpers/content-data.mjs';
import { minimalLexicon } from './fixtures/minimal-lexicon.mjs';

const REGISTRIES = readRegistries(DATA_DIR);
const run = (change = () => {}) => {
  const x = { ...minimalLexicon(), registries: REGISTRIES };
  change(x, x.files[0].entries[0]);
  return validateLexicon(x);
};
const errs = (change) => run(change).errors.map((e) => e.code);
const warns = (change) => run(change).warnings.map((w) => w.code);
const assertErr = (code, change, label = code) => assert.ok(errs(change).includes(code), `${label} : ${JSON.stringify(errs(change))}`);
const assertClean = (change, label) => assert.deepEqual(run(change).errors, [], label);
// Une seconde ENTRY, distincte de la première.
const other = (patch = {}) => ({ ...structuredClone(minimalLexicon().files[0].entries[0]), id: 'v_2', word: '低い',
  readings: [{ kana: 'ひくい', romaji: 'hikui', furigana: '<ruby>低<rt>ひく</rt></ruby>い', default: true, note: null }], ...patch });

// ── I1 · forme stricte ──

test('I1 : champ hors schéma, à chaque niveau de l\'ENTRY', () => {
  assertErr('champ-inconnu', (x, e) => { e.kanji_list = ['高']; }, 'kanji_list');
  assertErr('champ-inconnu', (x, e) => { e.examples = []; }, 'examples');
  assertErr('champ-inconnu', (x, e) => { e.places = ['konbini']; }, 'places');
  assertErr('champ-inconnu', (x, e) => { e.readings[0].reading = 'たかい'; }, 'lecture');
  assertErr('champ-inconnu', (x, e) => { e.linguistic.type = 'adjectif'; }, 'linguistique');
  assertErr('champ-inconnu', (x, e) => { e.linguistic.counter = { counter_for: ['small_animals'], kanji: '匹' }; }, 'compteur');
  assertErr('champ-inconnu', (x, e) => { e.writings = [{ form: '高い', furigana: '高い', usual: false }]; }, 'graphie');
});

test('I1 : champ obligatoire manquant, null interdit ou permis, mauvais type', () => {
  for (const k of ['id', 'level', 'word', 'readings', 'linguistic', 'senses']) assertErr('champ-manquant', (x, e) => { delete e[k]; }, k);
  assertErr('champ-manquant', (x, e) => { delete e.readings[0].note; }, 'note');
  assertErr('champ-manquant', (x, e) => { delete e.linguistic.group; }, 'group');
  assertErr('type-invalide', (x, e) => { e.writings = null; }, 'writings null');
  assertErr('type-invalide', (x, e) => { e.level = null; }, 'level null');
  assertErr('type-invalide', (x, e) => { e.word = ''; }, 'word vide');
  assertErr('type-invalide', (x, e) => { e.readings[0].default = 'oui'; }, 'default');
  assertErr('type-invalide', (x, e) => { e.tags = 'lieu_konbini'; }, 'tags');
  assertErr('type-invalide', (x, e) => { e.senses = {}; }, 'senses');
  assertClean((x, e) => { e.nuance = null; e.linguistic.group = null; e.linguistic.counter = null; }, 'nullables à null');
});

test('I1 : un champ facultatif absent est accepté, et rien n\'est ajouté (aucune normalisation)', () => {
  const x = { ...minimalLexicon(), registries: REGISTRIES };
  const e = x.files[0].entries[0];
  for (const k of ['writings', 'nuance', 'tags', 'retired_sense_ids']) delete e[k];
  delete e.linguistic.suru_compatible;
  delete e.linguistic.suffix;
  delete e.linguistic.counter;
  const before = structuredClone(e);
  assert.deepEqual(validateLexicon(x).errors, []);
  assert.deepEqual(e, before, 'l\'ENTRY n\'est pas modifiée');
  assert.ok(!('writings' in e) && !('kanji_list' in e));
});

// ── I2 · identifiant ; I3 · niveau ──

test('I2 : forme v_<n>, unicité dans tout le vocabulaire, jamais un identifiant retiré', () => {
  for (const id of ['n5_v_188', 'v_0', 'v_188_s1', 'hj_v_1']) assertErr('entree-id', (x, e) => { e.id = id; }, id);
  assertErr('id-duplique', (x) => { x.files[1].entries.push(other({ id: 'v_188', level: 'hors_jlpt' })); });
  assertErr('id-retire', (x, e) => { e.id = 'v_717'; });
});

test('I3 : level égal au niveau du fichier', () => {
  assertErr('niveau-fichier', (x, e) => { e.level = 'N4'; });
  assertErr('niveau-fichier', (x) => { x.files[1].entries.push(other({ level: 'N5' })); });
  assertClean((x) => { x.files[1].entries.push(other({ level: 'hors_jlpt' })); }, 'hors JLPT');
});

// ── I4 · forme et lectures ──

test('I4 : forme sans « / », lectures, une seule lecture par défaut, kana seulement', () => {
  assertErr('forme-invalide', (x, e) => { e.word = 'いい / 良い'; });
  assertErr('lecture-manquante', (x, e) => { e.readings = []; });
  assertErr('lecture-defaut', (x, e) => { e.readings.push({ ...e.readings[0], romaji: 'takai' }); }, 'deux par défaut');
  assertErr('lecture-defaut', (x, e) => { e.readings[0].default = false; }, 'aucune par défaut');
  for (const kana of ['takai', 'なん / なに', 'たか い', '高い']) assertErr('kana-invalide', (x, e) => { e.readings[0].kana = kana; }, kana);
});

test('I4 : furigana, structure validée avant le texte de base', () => {
  assertErr('furigana-base', (x, e) => { e.readings[0].furigana = '<ruby>高<rt>たか</rt></ruby>'; }, 'base incomplète');
  assertErr('furigana-base', (x, e) => { e.readings[0].furigana = '<ruby>高<rt>たか</rt></ruby> い'; }, 'espace de découpage');
  const invalid = [
    '<span>高</span>い',                           // texte visible égal à la forme, mais balise interdite
    '<b>高</b>い',
    '<ruby class="x">高<rt>たか</rt></ruby>い',     // attribut
    '<ruby>高<rt>たか</rt>い',                      // </ruby> manquant
    '<ruby><rt>たか</rt></ruby>高い',               // base absente
    '<ruby>高</ruby>い',                            // <rt> absent
    '<ruby>高<rt></rt></ruby>い',                   // lecture vide
    '高<rt>たか</rt>い',                            // <rt> hors de <ruby>
    '<ruby>高<rt>たか</rt><ruby>い<rt>い</rt></ruby></ruby>', // imbrication
    '<ruby></ruby>高い',
    '高い>', '<高い'
  ];
  for (const f of invalid) {
    const codes = errs((x, e) => { e.readings[0].furigana = f; });
    assert.ok(codes.includes('furigana-invalide') && !codes.includes('furigana-base'), `${f} : ${JSON.stringify(codes)}`);
  }
  for (const f of ['<ruby>高<rp>(</rp><rt>たか</rt><rp>)</rp></ruby>い', '<ruby>高<rt>た</rt>い<rt>い</rt></ruby>']) {
    assertClean((x, e) => { e.readings[0].furigana = f; }, f);
  }
});

test('parseFurigana : texte de base, et mots sans kanji', () => {
  assert.deepEqual(parseFurigana('<ruby>日<rt>に</rt>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>'), { base: '日曜日' });
  assert.deepEqual(parseFurigana('きれい'), { base: 'きれい' });
  assert.ok(parseFurigana('<rt>x</rt>').error);
});

// ── I5 · autres formes ──

test('I5 : formes distinctes, furigana de chaque forme', () => {
  assertErr('graphie-doublon', (x, e) => { e.writings = [{ form: '高い', furigana: '<ruby>高<rt>たか</rt></ruby>い' }]; }, 'égale à word');
  assertErr('graphie-doublon', (x, e) => { e.writings = [{ form: 'たかい', furigana: 'たかい' }, { form: 'たかい', furigana: 'たかい' }]; });
  assertErr('furigana-base', (x, e) => { e.writings = [{ form: '綺麗', furigana: '<ruby>綺<rt>き</rt></ruby>' }]; });
  assertErr('furigana-invalide', (x, e) => { e.writings = [{ form: '綺麗', furigana: '<i>綺麗</i>' }]; });
  assertClean((x, e) => { e.writings = [{ form: 'たかい', furigana: 'たかい' }]; }, 'forme en kana');
});

// ── I6 · propriétés linguistiques ──

test('I6 : classe, group, suru_compatible, compteur', () => {
  assertErr('classe-inconnue', (x, e) => { e.linguistic.grammatical_class = 'adjectif'; });
  assertErr('classe-inconnue', (x, e) => { e.linguistic.grammatical_class = 'compteur'; });
  for (const g of ['adverbe', 'pronom', 'interrogatif', 'nom_commun']) assertErr('group-invalide', (x, e) => { e.linguistic.group = g; }, g);
  assertErr('suru-compatible', (x, e) => { e.linguistic.suru_compatible = true; });
  assertClean((x, e) => { e.linguistic.group = 'nom'; e.linguistic.grammatical_class = 'nom'; e.linguistic.suru_compatible = true; }, 'nom + する');
  assertErr('compteur-vide', (x, e) => { e.linguistic.counter = { counter_for: [] }; });
  assertErr('compteur-inconnu', (x, e) => { e.linguistic.counter = { counter_for: ['books'] }; });
  assertClean((x, e) => { e.linguistic.counter = { counter_for: ['small_animals'] }; }, 'compteur connu');
});

// ── I16 · une unité, une ENTRY ; I17 · identifiants retirés ──

test('I16 : même forme usuelle et même lecture par défaut, refusé dans tout le vocabulaire', () => {
  assertErr('unite-doublon', (x) => { x.files[0].entries.push(other({ word: '高い', readings: structuredClone(minimalLexicon().files[0].entries[0].readings) })); });
  assertErr('unite-doublon', (x) => {
    x.files[1].entries.push(other({ level: 'hors_jlpt', word: '高い', readings: structuredClone(minimalLexicon().files[0].entries[0].readings) }));
  }, 'entre fichiers');
  assertClean((x) => {
    x.files[0].entries.push(other({ word: '高い', readings: [{ kana: 'こうい', romaji: 'koui', furigana: '<ruby>高<rt>こう</rt></ruby>い', default: true, note: null }] }));
  }, 'même forme, autre lecture');
});

test('I17 : vocab-retired.json', () => {
  assertErr('retire-invalide', (x) => { x.retired.push({ id: 'n5_v_472', merged_into: null }); });
  assertErr('id-duplique', (x) => { x.retired.push({ id: 'v_717', merged_into: null }); });
  assertErr('retire-invalide', (x) => { x.retired.push({ id: 'v_472', merged_into: 'v_424' }); }, 'merged_into inconnu');
  assertErr('champ-inconnu', (x) => { x.retired.push({ id: 'v_472', merged_into: 'v_188', date: '2026-10-02' }); });
  assertErr('champ-manquant', (x) => { x.retired.push({ id: 'v_472' }); });
  assertClean((x) => { x.retired.push({ id: 'v_472', merged_into: 'v_188' }); }, 'fusion valide');
});

// ── A1 à A3, N1 ──

test('A1 macron, A2 kanji inconnus (calculés, jamais stockés), A3 group suru', () => {
  assert.ok(warns((x, e) => { e.readings[0].romaji = 'takāi'; }).includes('romaji-macron'));
  assert.ok(warns((x) => { x.knownKanji = []; }).includes('kanji-inconnu'));
  assert.deepEqual(warns(() => {}), []);
  assert.ok(warns((x, e) => { e.linguistic.group = 'suru'; }).includes('suru-sans-suru'));
  assert.deepEqual(kanjiOf('日曜日'), ['日', '曜']);
  assert.deepEqual(kanjiOf('きれい'), []);
  assert.deepEqual(kanjiOf('人々'), ['人']);
});

test('N1 : nombre d\'ENTRY par niveau', () => {
  const infos = run((x) => { x.files[1].entries.push(other({ level: 'hors_jlpt' })); }).infos;
  assert.deepEqual(infos.map((i) => [i.code, i.where, i.message]), [
    ['entrees-par-niveau', 'N5', '1 ENTRY'], ['entrees-par-niveau', 'hors_jlpt', '1 ENTRY']]);
});

// 4.2 s'arrête à l'ENTRY : le contenu d'un SENSE n'est examiné qu'en 4.3.
test('4.2 n\'examine pas l\'intérieur des SENSE', () => {
  assert.deepEqual(errs((x, e) => { e.senses = [{ quoi: 'que ce soit' }]; }), []);
});
