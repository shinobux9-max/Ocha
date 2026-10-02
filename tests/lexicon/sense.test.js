// Tests de tools/lexicon/sense.mjs (A2-03 · 4.3) : I1 (SENSE), I7 à I11, I13 à I15.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLexicon, readRegistries } from '../../tools/lexicon/index.mjs';
import { DATA_DIR } from '../helpers/content-data.mjs';
import { minimalLexicon } from './fixtures/minimal-lexicon.mjs';

const REGISTRIES = readRegistries(DATA_DIR);
// `change(x, entry, sense1, sense2)` modifie la fixture avant validation.
const run = (change = () => {}) => {
  const x = { ...minimalLexicon(), registries: REGISTRIES };
  const e = x.files[0].entries[0];
  change(x, e, e.senses[0], e.senses[1]);
  return validateLexicon(x);
};
const errs = (change) => run(change).errors.map((x) => x.code);
const assertErr = (code, change, label = code) => assert.ok(errs(change).includes(code), `${label} : ${JSON.stringify(errs(change))}`);
const assertClean = (change, label) => assert.deepEqual(run(change).errors, [], label);
const GRAMMATICAL = { grammatical: ['interrogatif'], pragmatic_discourse: [] };

test('fixture : les deux sens sont valides', () => assertClean(() => {}, 'fixture'));

// ── I1 · forme stricte du SENSE ──

test('I1 : champs du SENSE et de ses sous-objets', () => {
  assertErr('champ-inconnu', (x, e, s) => { s.examples = []; }, 'examples');
  assertErr('champ-inconnu', (x, e, s) => { s.meaning.secondary = []; }, 'meaning');
  assertErr('champ-inconnu', (x, e, s) => { s.category.level_4 = 'x'; }, 'category');
  assertErr('champ-inconnu', (x, e, s) => { s.dimensions = [{ axis: 'probabilite', pole: 'probabilite', weight: 1 }]; }, 'dimension');
  assertErr('champ-inconnu', (x, e, s) => { s.relations = [{ type: 'opposed_to', target: 'v_2_s1', note: 'x' }]; }, 'relation');
  assertErr('champ-inconnu', (x, e, s) => { s.linguistic_functions.semantic = []; }, 'fonctions');
  for (const k of ['id', 'meaning', 'category', 'semantic_type', 'dimensions', 'relations', 'linguistic_functions']) {
    assertErr('champ-manquant', (x, e, s) => { delete s[k]; }, k);
  }
  assertErr('champ-manquant', (x, e, s) => { delete s.linguistic_functions.pragmatic_discourse; }, 'famille');
  assertErr('champ-manquant', (x, e, s) => { s.relations = [{ type: 'opposed_to' }]; }, 'cible');
  assertErr('type-invalide', (x, e, s) => { s.dimensions = null; }, 'dimensions null');
  assertClean((x, e, s) => { delete s.tags; delete s.particles; delete s.nuance; }, 'facultatifs absents');
});

// ── I7 · identifiants ──

test('I7 : au moins un sens ; identifiant de cette ENTRY, unique, jamais retiré', () => {
  assertErr('sens-manquant', (x, e) => { e.senses = []; });
  for (const id of ['v_188_1', 'v_188_s0', 's1', 'v_188']) assertErr('sens-id', (x, e, s) => { s.id = id; }, id);
  assertErr('sens-id', (x, e, s) => { s.id = 'v_189_s1'; }, 'autre ENTRY');
  assertErr('id-duplique', (x, e, s1, s2) => { s2.id = s1.id; });
  assertErr('id-retire', (x, e) => { e.retired_sense_ids = ['v_188_s2']; });
  for (const r of ['v_189_s3', 'v_188_3', 'x']) assertErr('sens-retire-invalide', (x, e) => { e.retired_sense_ids = [r]; }, r);
  assertClean((x, e) => { e.retired_sense_ids = ['v_188_s3']; }, 'sens retiré valide');
});

// ── I8 · libellé ──

test('I8 : alternatives non vides, distinctes entre elles et du libellé', () => {
  assertErr('sens-libelle', (x, e, s) => { s.meaning.alternatives = ['Élevé', 'Élevé']; });
  assertErr('sens-libelle', (x, e, s) => { s.meaning.alternatives = ['Haut']; }, 'égale au libellé');
  assertErr('type-invalide', (x, e, s) => { s.meaning.alternatives = ['']; });
  assertErr('type-invalide', (x, e, s) => { s.meaning.primary = ''; });
  assertClean((x, e, s) => { s.meaning.alternatives = []; }, 'aucune alternative');
});

// ── I9 · catégorie ; I10 · type sémantique ──

test('I9 : chemin complet existant ; null avec une fonction, ou signalé pour un sens lexical (addendum A5)', () => {
  assertErr('categorie-inconnue', (x, e, s) => { s.category = { level_1: 'temps', level_2: 'radio' }; });
  assertErr('categorie-inconnue', (x, e, s) => { s.category = { level_1: 'mois' }; }, 'identifiant de niveau 3 placé en niveau 1');
  assertErr('categorie-chemin', (x, e, s) => { s.category = { level_1: 'temps', level_3: 'mois' }; }, 'level_3 sans level_2');
  assertErr('type-invalide', (x, e, s) => { s.category = 'mois'; }, 'identifiant isolé');
  // Sens lexical sans fonction : pas une erreur, un avertissement (justification au journal).
  assertClean((x, e, s) => { s.category = null; }, 'null lexical admis');
  assert.ok(run((x, e, s) => { s.category = null; }).warnings.some((w) => w.code === 'categorie-nulle'));
  assertClean((x, e, s) => { s.category = null; s.semantic_type = null; s.linguistic_functions = GRAMMATICAL; }, 'null justifié par une fonction');
  assert.ok(!run((x, e, s) => { s.category = null; s.semantic_type = null; s.linguistic_functions = GRAMMATICAL; }).warnings.some((w) => w.code === 'categorie-nulle'));
  assertClean((x, e, s) => { s.category = { level_1: 'temps', level_2: 'calendrier', level_3: 'mois' }; }, 'mois sous calendrier');
  assertClean((x, e, s) => { s.category = { level_1: 'temps', level_2: 'unites_temporelles', level_3: 'mois' }; }, 'mois sous unités');
  assertClean((x, e, s) => { s.category = { level_1: 'temps', level_2: null, level_3: null }; }, 'niveau 1 seul');
});

test('I10 : type terminal du registre, ou null indépendamment de category (addendum A6)', () => {
  assertErr('type-inconnu', (x, e, s) => { s.semantic_type = 'entity'; }, 'famille');
  assertErr('type-inconnu', (x, e, s) => { s.semantic_type = 'personne_generique'; });
  // null avec une catégorie : admis, signalé pour l'audit (sens lexical).
  assertClean((x, e, s) => { s.semantic_type = null; }, 'type nul, catégorie présente');
  assert.ok(run((x, e, s) => { s.semantic_type = null; }).warnings.some((w) => w.code === 'type-nul'));
  // Une fonction linguistique le justifie : pas d'avertissement.
  const fn = (x, e, s) => { s.category = null; s.semantic_type = null; s.linguistic_functions = GRAMMATICAL; };
  assertClean(fn, 'unité grammaticale');
  assert.ok(!run(fn).warnings.some((w) => w.code === 'type-nul'));
  assertClean((x, e, s) => { s.category = null; s.semantic_type = 'information_contenu'; s.linguistic_functions = GRAMMATICAL; }, 'type avec category null');
});

// ── I11 · dimensions ──

test('I11 : axe et pôle du registre, pôle de cet axe, un axe une seule fois', () => {
  assertErr('dimension-inconnue', (x, e, s) => { s.dimensions = [{ axis: 'improbabilite', pole: 'improbabilite' }]; });
  assertErr('pole-inconnu', (x, e, s) => { s.dimensions = [{ axis: 'facilite_difficulte', pole: 'certitude' }]; });
  assertErr('dimension-doublon', (x, e, s) => {
    s.dimensions = [{ axis: 'facilite_difficulte', pole: 'facilite' }, { axis: 'facilite_difficulte', pole: 'difficulte' }];
  });
  assertClean((x, e, s) => { s.dimensions = [{ axis: 'probabilite', pole: 'probabilite' }]; }, 'Probabilité, axe à un pôle');
  assertClean((x, e, s) => {
    s.dimensions = [{ axis: 'facilite_difficulte', pole: 'difficulte' }, { axis: 'probabilite', pole: 'probabilite' }];
  }, 'deux axes');
});

// ── I13 · fonctions ; I15 · particules ──

test('I13 : chaque fonction au registre, dans sa propre famille', () => {
  assertErr('fonction-inconnue', (x, e, s) => { s.linguistic_functions = { grammatical: [], pragmatic_discourse: ['interrogatif'] }; }, 'mauvaise famille');
  assertErr('fonction-inconnue', (x, e, s) => { s.linguistic_functions = { grammatical: ['questionnement'], pragmatic_discourse: [] }; });
  assertClean((x, e, s) => { s.linguistic_functions = { grammatical: ['temps'], pragmatic_discourse: ['politesse'] }; }, 'valides');
});

test('I15 : particules de particles.json', () => {
  assertErr('particule-inconnue', (x, e, s) => { s.particles = ['à']; });
  assertClean((x, e, s) => { s.particles = ['を', 'に']; }, 'connues');
});

// ── I14 · tags de l'ENTRY et des SENSE ──

test('I14 : tags connus, sans doublon, jamais répétés de l\'ENTRY sur un sens', () => {
  assertErr('tag-inconnu', (x, e, s) => { s.tags = ['lieu_ecole']; }, 'préfixe lieu_ mais inconnu');
  assertErr('tag-inconnu', (x, e) => { e.tags = ['konbini']; }, 'tag d\'ENTRY');
  assertErr('tag-doublon', (x, e, s1, s2) => { s2.tags = ['lieu_konbini', 'lieu_konbini']; });
  assertErr('tag-doublon', (x, e) => { e.tags = ['lieu_gare', 'lieu_gare']; }, 'doublon d\'ENTRY');
  assertErr('tag-repete', (x, e) => { e.tags = ['lieu_konbini']; });
  assertClean((x, e) => { e.tags = ['lieu_gare']; }, 'ENTRY et sens, tags différents');
});

// ── Frontière avec 4.4 ──

// sense.mjs ne vérifie que la forme d'une relation ; son type et sa cible ne sont jugés que par
// I12 (references.mjs). Une relation de type et de cible inconnus ne produit donc que des codes I12.
test('relations : sense.mjs ne juge que la forme, le reste relève de I12', () => {
  const codes = errs((x, e, s) => { s.relations = [{ type: 'opposé à', target: 'v_999_s1' }]; });
  assert.deepEqual([...new Set(codes)].sort(), ['relation-cible', 'relation-inconnue']);
});
