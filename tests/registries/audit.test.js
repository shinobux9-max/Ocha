// A2-02 · 3.5 — Audit transversal des huit registres.
//
// Les autres tests vérifient chaque registre isolément (intégrité dans validate-data, fidélité
// dans transcription.test.js et decisions.test.js). Ceux-ci vérifient ce qui vaut pour
// l'ensemble : inventaire, provenance, identifiants, espaces de noms que le schéma A2-01 lira, et
// absence de dépendance du code à une convention de nom.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIR = join(ROOT, 'data', 'registries');
const registry = (file) => JSON.parse(readFileSync(join(DIR, file), 'utf8'));

// Provenance (décision 2 et autorisations de 3.1 à 3.4) : cinq transcriptions de snapshot, trois
// registres décidés en A2-02.
const SOURCES = {
  'categories.json': 'A2-L3-v1',
  'semantic-types.json': 'A2-ST-v1',
  'dimensions.json': 'A2-DIM-v1',
  'relations.json': 'A2-REL-v1.1',
  'linguistic-functions.json': 'A2-LING-v1',
  'grammatical-classes.json': 'A2-02',
  'counters.json': 'A2-02',
  'tags.json': 'A2-02'
};

// Tous les nœuds identifiés d'un registre, à toute profondeur.
function nodes(value, out = []) {
  if (Array.isArray(value)) value.forEach((v) => nodes(v, out));
  else if (value && typeof value === 'object') {
    if (typeof value.id === 'string') out.push(value);
    Object.values(value).forEach((v) => nodes(v, out));
  }
  return out;
}

test('inventaire : exactement les huit registres d\'A2-02, chacun avec sa provenance', () => {
  assert.deepEqual(readdirSync(DIR).sort(), Object.keys(SOURCES).sort());
  for (const [file, source] of Object.entries(SOURCES)) {
    assert.equal(registry(file).source, source, file);
    // Une transcription a son snapshot déposé ; un registre décidé n'en a pas.
    if (source !== 'A2-02') assert.ok(existsSync(join(ROOT, 'docs', 'conception', 'a2', `${source}.md`)), source);
  }
});

test('identifiants : ASCII, jamais préfixés v_ ni g_ (addenda A3 et A4), libellés non vides', () => {
  let count = 0;
  for (const file of Object.keys(SOURCES)) {
    for (const n of nodes(registry(file))) {
      count += 1;
      assert.match(n.id, /^[a-z0-9]+(_[a-z0-9]+)*$/, `${file} : ${n.id}`);
      assert.ok(!n.id.startsWith('v_') && !n.id.startsWith('g_'), `${file} : ${n.id}`);
      assert.ok(typeof n.label === 'string' && n.label !== '' && n.label === n.label.trim(), `${file} : ${n.id}`);
    }
  }
  assert.equal(count, 1011);
});

// Espaces de noms que le schéma A2-01 lira (§6 et §7) : un identifiant y désigne un seul nœud.
// Les catégories font exception par décision (identité locale, vérifiée par leurs propres tests).
test('espaces de noms du schéma A2-01 : chaque identifiant y désigne un seul nœud', () => {
  const flat = (file, ...path) => path.reduce((list, key) => list.flatMap((x) => x[key]), [registry(file)]);
  const spaces = {
    semantic_type: flat('semantic-types.json', 'families', 'types'),
    'dimensions.axis': flat('dimensions.json', 'families', 'axes'),
    'relations.type': flat('relations.json', 'families', 'relations'),
    grammatical_class: flat('grammatical-classes.json', 'classes'),
    counter_for: flat('counters.json', 'compatibilities'),
    tags: flat('tags.json', 'tags')
  };
  for (const [space, list] of Object.entries(spaces)) {
    const ids = list.map((n) => n.id);
    assert.equal(new Set(ids).size, ids.length, space);
  }
  // linguistic_functions : une liste par famille, sous les clés du schéma.
  const fams = registry('linguistic-functions.json').families;
  assert.deepEqual(fams.map((f) => f.id), ['grammatical', 'pragmatic_discourse']);
  for (const f of fams) assert.equal(new Set(f.functions.map((x) => x.id)).size, f.functions.length, f.id);
});

// Aucune dépendance implicite : le code ne reconnaît un tag de lieu que par `kind`, jamais par
// son préfixe (addendum A2, D2).
test('le code ne dépend d\'aucune convention de nom des tags', () => {
  const files = (dir) => readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : /\.m?js$/.test(e.name) ? [join(dir, e.name)] : []);
  const offenders = [...files('src'), ...files('tools')].filter((f) => readFileSync(join(ROOT, f), 'utf8').includes('lieu_'));
  assert.deepEqual(offenders, []);
});
