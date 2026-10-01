// A2-02 · 3.1 — Transcription des registres fermés.
//
// Chaque registre de data/registries/ doit être la transcription exacte de son snapshot, déposé
// dans docs/conception/a2/ : mêmes familles, mêmes éléments, mêmes libellés, même ordre. Les
// comptes attendus sont écrits ici en dur, relevés à la main dans les snapshots, pour ne pas
// dépendre seulement de l'analyse des arbres.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const snapshot = (file) => readFileSync(join(ROOT, 'docs', 'conception', 'a2', file), 'utf8');
const registry = (file) => JSON.parse(readFileSync(join(ROOT, 'data', 'registries', file), 'utf8'));

// Arbre d'un bloc de code du snapshot : [[famille, [éléments…]], …].
function snapshotTree(md, rootLabel) {
  const blocks = [...md.matchAll(/^``` ?text\n([\s\S]*?)^```/gm)].map((m) => m[1].split('\n'));
  const block = blocks.find((lines) => lines[0].trim() === rootLabel);
  assert.ok(block, `arbre « ${rootLabel} » introuvable`);
  const tree = [];
  for (const line of block.slice(1)) {
    const m = line.match(/^([│ ]*)[├└]── (.+)$/);
    if (!m) continue;
    if (m[1].length === 0) tree.push([m[2].trim(), []]);
    else tree.at(-1)[1].push(m[2].trim());
  }
  return tree;
}

// Règle de génération des identifiants, appliquée une fois à la transcription (décision 2) :
// minuscules, accents retirés, « & » et apostrophes supprimés, autres caractères → « _ ».
const slug = (label) => label.normalize('NFD').replace(/\p{Mn}/gu, '').toLowerCase()
  .replace(/[&’']/g, ' ').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

const versionOf = (md) => md.match(/\*\*Version :\*\* ([^\s\\]+)/)[1];

test('chaque registre déclare la version de son snapshot', () => {
  for (const [json, md] of [['semantic-types.json', 'A2-ST-v1.md'], ['dimensions.json', 'A2-DIM-v1.md'],
    ['relations.json', 'A2-REL-v1.1.md'], ['linguistic-functions.json', 'A2-LING-v1.md']]) {
    assert.equal(registry(json).source, versionOf(snapshot(md)), json);
  }
});

test('types sémantiques : 4 familles, 16 types, transcription exacte (A2-ST-v1)', () => {
  const tree = snapshotTree(snapshot('A2-ST-v1.md'), 'SEMANTIC TYPE');
  const reg = registry('semantic-types.json');
  assert.deepEqual(reg.families.map((f) => [f.label, f.types.map((t) => t.label)]), tree);
  assert.equal(reg.families.length, 4);
  assert.equal(reg.families.flatMap((f) => f.types).length, 16);
  for (const node of [...reg.families, ...reg.families.flatMap((f) => f.types)]) assert.equal(node.id, slug(node.label));
});

test('dimensions : 9 familles, 26 axes, pôles tirés des libellés ; Probabilité à un seul pôle (A2-DIM-v1)', () => {
  const tree = snapshotTree(snapshot('A2-DIM-v1.md'), 'DIMENSIONS');
  const reg = registry('dimensions.json');
  assert.deepEqual(reg.families.map((f) => [f.label, f.axes.map((a) => a.label)]), tree);
  assert.equal(reg.families.length, 9);
  const axes = reg.families.flatMap((f) => f.axes);
  assert.equal(axes.length, 26);
  for (const a of axes) {
    assert.deepEqual(a.poles.map((p) => p.label), a.label.split('↔').map((p) => p.trim()), a.id);
    for (const node of [a, ...a.poles]) assert.equal(node.id, slug(node.label));
  }
  for (const f of reg.families) assert.equal(f.id, slug(f.label));
  assert.deepEqual(axes.find((a) => a.id === 'probabilite').poles, [{ id: 'probabilite', label: 'Probabilité' }]);
  assert.equal(axes.filter((a) => a.poles.length === 1).length, 1, 'seule Probabilité est un axe à un pôle');
});

test('relations : 6 familles, 21 relations, symétrie et inverses du snapshot (A2-REL-v1.1)', () => {
  const md = snapshot('A2-REL-v1.1.md');
  const tree = snapshotTree(md, 'RELATIONS');
  const reg = registry('relations.json');
  // Une ligne « a ↔ b » du snapshot donne deux relations, inverses l'une de l'autre.
  const expected = tree.map(([family, lines]) => [family, lines.flatMap((l) => l.split('↔').map((x) => x.trim()))]);
  assert.deepEqual(reg.families.map((f) => [f.label, f.relations.map((r) => r.id)]), expected);
  const relations = reg.families.flatMap((f) => f.relations);
  assert.equal(relations.length, 21);
  for (const r of relations) assert.equal(r.label, r.id, 'libellé = nom normatif du snapshot');
  for (const f of reg.families) assert.equal(f.id, slug(f.label));
  // Section 4 du snapshot : relations symétriques.
  const section = md.slice(md.indexOf('### Relations traitées comme symétriques'), md.indexOf('### Relations dirigées avec inverse'));
  const symmetric = [...section.matchAll(/`([a-z_]+)`/g)].map((m) => m[1]);
  assert.equal(symmetric.length, 9);
  assert.deepEqual(relations.filter((r) => r.symmetric).map((r) => r.id).sort(), [...symmetric].sort());
  const pairs = tree.flatMap(([, lines]) => lines.filter((l) => l.includes('↔')).map((l) => l.split('↔').map((x) => x.trim())));
  assert.equal(pairs.length, 5);
  for (const [a, b] of pairs) {
    assert.equal(relations.find((r) => r.id === a).inverse, b);
    assert.equal(relations.find((r) => r.id === b).inverse, a);
  }
  const directed = relations.filter((r) => !r.symmetric && r.inverse === null).map((r) => r.id);
  assert.deepEqual(directed.sort(), ['compared_to', 'corresponds_to']);
});

test('fonctions linguistiques : 2 familles, 14 fonctions ; familles nommées comme dans le schéma A2-01', () => {
  const tree = snapshotTree(snapshot('A2-LING-v1.md'), 'LINGUISTIC_FUNCTIONS');
  const reg = registry('linguistic-functions.json');
  assert.deepEqual(reg.families.map((f) => [f.label, f.functions.map((x) => x.label)]), tree);
  assert.equal(reg.families.flatMap((f) => f.functions).length, 14);
  for (const node of [...reg.families, ...reg.families.flatMap((f) => f.functions)]) assert.equal(node.id, slug(node.label));
  // schema-A2-01.md, §7 : linguistic_functions = { grammatical: [], pragmatic_discourse: [] }.
  assert.deepEqual(reg.families.map((f) => f.id), ['grammatical', 'pragmatic_discourse']);
});
