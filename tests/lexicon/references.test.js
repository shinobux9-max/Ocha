// Tests de tools/lexicon/references.mjs (A2-03 · 4.4) : I12, I19, tags des expressions et des
// lieux (I14 hors du vocabulaire).
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateLexicon, readRegistries } from '../../tools/lexicon/index.mjs';
import { DATA_DIR } from '../helpers/content-data.mjs';
import { minimalLexicon } from './fixtures/minimal-lexicon.mjs';

const REGISTRIES = readRegistries(DATA_DIR);

// Seconde ENTRY (低い, un sens), et une ENTRY hors JLPT, pour que les relations aient des cibles.
function lexicon() {
  const x = { ...minimalLexicon(), registries: REGISTRIES };
  const base = x.files[0].entries[0];
  const sense = (id) => ({ ...structuredClone(base.senses[0]), id, tags: [] });
  x.files[0].entries.push({ ...structuredClone(base), id: 'v_183', word: '低い',
    readings: [{ kana: 'ひくい', romaji: 'hikui', furigana: '<ruby>低<rt>ひく</rt></ruby>い', default: true, note: null }],
    senses: [sense('v_183_s1')] });
  x.files[1].entries.push({ ...structuredClone(base), id: 'v_718', level: 'hors_jlpt', word: '高め',
    readings: [{ kana: 'たかめ', romaji: 'takame', furigana: '<ruby>高<rt>たか</rt></ruby>め', default: true, note: null }],
    senses: [sense('v_718_s1')] });
  return x;
}
const sensesOf = (x) => Object.fromEntries(x.files.flatMap((f) => f.entries).flatMap((e) => e.senses).map((s) => [s.id, s]));
const run = (change) => { const x = lexicon(); change(x, sensesOf(x)); return validateLexicon(x); };
const errs = (change) => run(change).errors.map((e) => e.code);
const assertErr = (code, change, label = code) => assert.ok(errs(change).includes(code), `${label} : ${JSON.stringify(errs(change))}`);
const assertClean = (change, label) => assert.deepEqual(run(change).errors, [], label);
const rel = (type, target) => ({ type, target });

// Registre de tags augmenté d'exemples synthétiques, pour éprouver `kind` et le préfixe.
function withTags(x, extra) {
  x.registries = { ...x.registries, 'tags.json': { ...x.registries['tags.json'], tags: [...x.registries['tags.json'].tags, ...extra] } };
}
const THEME = { id: 'theme_saison', label: 'Saison', description: 'x', kind: 'theme' };
const PREFIX_TRAP = { id: 'lieu_trompeur', label: 'Piège', description: 'x', kind: 'theme' };
const NO_PREFIX = { id: 'pres_de_la_gare', label: 'Près de la gare', description: 'x', kind: 'lieu' };

test('fixture : trois ENTRY valides, sans référence', () => assertClean(() => {}, 'fixture'));

// ── I12 · relations ──

test('I12 : type au registre, cible = SENSE existant, différent du sens porteur', () => {
  assertErr('relation-inconnue', (x, s) => { s.v_188_s1.relations = [rel('opposé_à', 'v_183_s1')]; });
  assertErr('relation-cible', (x, s) => { s.v_188_s1.relations = [rel('opposed_to', 'v_183_s9')]; }, 'sens inexistant');
  assertErr('relation-cible', (x, s) => { s.v_188_s1.relations = [rel('opposed_to', 'v_183')]; }, 'ENTRY au lieu d\'un sens');
  assertErr('relation-cible', (x, s) => { s.v_188_s1.relations = [rel('similar_to', 'v_188_s1')]; }, 'vers soi-même');
  assertClean((x, s) => { s.v_188_s1.relations = [rel('opposed_to', 'v_183_s1')]; }, 'relation valide');
  assertClean((x, s) => { s.v_188_s2.relations = [rel('similar_to', 'v_718_s1')]; }, 'cible dans un autre fichier');
});

test('I12 : relation symétrique, ordre indifférent ; le lien miroir n\'est jamais exigé', () => {
  assertErr('relation-doublon', (x, s) => {
    s.v_188_s1.relations = [rel('opposed_to', 'v_183_s1')];
    s.v_183_s1.relations = [rel('opposed_to', 'v_188_s1')];
  }, 'notée des deux côtés');
  assertErr('relation-doublon', (x, s) => { s.v_188_s1.relations = [rel('opposed_to', 'v_183_s1'), rel('opposed_to', 'v_183_s1')]; }, 'répétée');
  assertClean((x, s) => { s.v_183_s1.relations = [rel('opposed_to', 'v_188_s1')]; }, 'un seul côté, l\'autre');
});

test('I12 : paire inverse, une seule écriture commune', () => {
  assertErr('relation-doublon', (x, s) => {
    s.v_188_s1.relations = [rel('part_of', 'v_183_s1')];
    s.v_183_s1.relations = [rel('has_part', 'v_188_s1')];
  }, 'A part_of B et B has_part A');
  assertClean((x, s) => { s.v_183_s1.relations = [rel('has_part', 'v_188_s1')]; }, 'une seule écriture');
  assertClean((x, s) => {
    s.v_188_s1.relations = [rel('part_of', 'v_183_s1')];
    s.v_188_s2.relations = [rel('part_of', 'v_183_s1')];
  }, 'deux sources différentes');
});

test('I12 : relation dirigée sans inverse, l\'orientation compte', () => {
  assertClean((x, s) => {
    s.v_188_s1.relations = [rel('compared_to', 'v_183_s1')];
    s.v_183_s1.relations = [rel('compared_to', 'v_188_s1')];
  }, 'deux orientations');
  assertErr('relation-doublon', (x, s) => { s.v_188_s1.relations = [rel('compared_to', 'v_183_s1'), rel('compared_to', 'v_183_s1')]; });
});

// ── I19 · références injectées ──

test('I19 : une référence vise une ENTRY ; un sens précisé doit lui appartenir', () => {
  const refs = (list) => (x) => { x.references = list; };
  assertClean(refs([{ where: 'n5_m_1 · teaches', vocab: 'v_188' }]), 'ENTRY seule (D1)');
  assertClean(refs([{ where: 'phrase', vocab: 'v_188', sense: 'v_188_s2' }]), 'sens de cette ENTRY');
  assertClean(refs([{ where: 'expression', vocab: 'v_718' }]), 'mot hors JLPT');
  assertErr('reference-inconnue', refs([{ where: 'n5_m_1', vocab: 'n5_v_188' }]), 'ancien identifiant');
  assertErr('reference-inconnue', refs([{ where: 'n5_m_1', vocab: 'v_999' }]));
  assertErr('reference-sens', refs([{ where: 'phrase', vocab: 'v_188', sense: 'v_183_s1' }]), 'sens d\'une autre ENTRY');
  assertErr('reference-sens', refs([{ where: 'phrase', vocab: 'v_188', sense: 'v_188_s9' }]), 'sens inexistant');
  assertErr('reference-sens', refs([{ where: 'phrase', vocab: 'v_188', sense: 's2' }]), 'forme');
  assertErr('champ-inconnu', refs([{ where: 'phrase', vocab: 'v_188', entry: 'v_188' }]));
  assertErr('champ-manquant', refs([{ vocab: 'v_188' }]));
  assertErr('lexique-format', refs({ vocab: 'v_188' }));
});

// ── I14 · tags des expressions ──

test('expressions : tags facultatifs, connus, sans doublon, jamais de nature lieu', () => {
  const expressions = JSON.parse(readFileSync(join(DATA_DIR, 'expressions.json'), 'utf8'));
  assert.ok(expressions.every((e) => !('tags' in e)), 'A2-03 n\'ajoute pas de tags aux expressions');
  assertClean((x) => { x.expressions = expressions; }, 'expressions actuelles');
  const ex = (tags) => [{ id: 'ex_1', places: ['konbini'], tags }];
  assertErr('tag-lieu-expression', (x) => { x.expressions = ex(['lieu_konbini']); });
  assertErr('tag-inconnu', (x) => { x.expressions = ex(['saison']); });
  assertErr('tag-doublon', (x) => { withTags(x, [THEME]); x.expressions = ex(['theme_saison', 'theme_saison']); });
  assertErr('type-invalide', (x) => { x.expressions = ex('theme_saison'); });
  assertErr('type-invalide', (x) => { x.expressions = ex(['']); }, 'tag vide');
  assertErr('type-invalide', (x) => { x.expressions = ex([3]); }, 'tag non textuel');
  assertClean((x) => { withTags(x, [THEME]); x.expressions = ex(['theme_saison']); }, 'tag d\'une autre nature');
  assertClean((x) => { withTags(x, [PREFIX_TRAP]); x.expressions = ex(['lieu_trompeur']); }, 'préfixe lieu_, nature theme');
  assertErr('tag-lieu-expression', (x) => { withTags(x, [NO_PREFIX]); x.expressions = ex(['pres_de_la_gare']); }, 'nature lieu sans préfixe');
});

// ── I14 · futur format de lieux.json ──

test('lieux (futur format) : vocab_tags ne désigne que des tags existants de nature lieu', () => {
  const lieu = (vocab_tags) => [{ id: 'konbini', name: 'Konbini', vocab_tags }];
  assertClean((x) => { x.lieux = lieu(['lieu_konbini']); }, 'tag de lieu');
  assertClean((x) => { x.lieux = lieu([]); }, 'aucun tag');
  assertErr('tag-inconnu', (x) => { x.lieux = lieu(['lieu_ecole']); }, 'préfixe sans tag');
  assertErr('lieu-tag-nature', (x) => { withTags(x, [THEME]); x.lieux = lieu(['theme_saison']); });
  assertErr('lieu-tag-nature', (x) => { withTags(x, [PREFIX_TRAP]); x.lieux = lieu(['lieu_trompeur']); }, 'préfixe lieu_, nature theme');
  assertClean((x) => { withTags(x, [NO_PREFIX]); x.lieux = lieu(['pres_de_la_gare']); }, 'nature lieu sans préfixe');
  assertErr('tag-doublon', (x) => { x.lieux = lieu(['lieu_gare', 'lieu_gare']); });
  assertErr('lieu-format', (x) => { x.lieux = [{ id: 'konbini', vocab_categories: ['nourriture'] }]; }, 'ancien format');
  assertErr('type-invalide', (x) => { x.lieux = ['konbini']; }, 'lieu non objet');
  assertErr('type-invalide', (x) => { x.lieux = lieu(['']); }, 'tag vide');
});

// A2-03 ne migrait pas lieux.json ; la publication d'A2-04 (5.17) l'a fait : chaque lieu porte
// `vocab_tags`, et plus `vocab_categories`.
test('le vrai lieux.json est au format publié : vocab_tags, sans vocab_categories', () => {
  const lieux = JSON.parse(readFileSync(join(DATA_DIR, 'lieux.json'), 'utf8'));
  assert.ok(lieux.length > 0 && lieux.every((l) => Array.isArray(l.vocab_tags) && l.vocab_tags.length === 1 && !('vocab_categories' in l)));
});
