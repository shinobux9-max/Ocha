// Addendum A4 : aucun code d'Ocha v2 ne reconnaît l'ancienne forme des identifiants de grammaire
// (`n5_g_…`) ni ne construit un identifiant de grammaire à partir d'un niveau (`${niveau}_g_`).
// Garde-fou statique : le niveau d'une leçon est son champ `level`, jamais son identifiant.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

function codeFiles(dir) {
  return readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = join(dir, e.name);
    if (e.isDirectory()) return codeFiles(rel);
    return /\.(m?js)$/.test(e.name) ? [rel] : [];
  });
}

test('aucun code ne lit ni ne construit un identifiant de grammaire à niveau (addendum A4)', () => {
  const files = [...codeFiles('src'), ...codeFiles('tools')];
  assert.ok(files.length > 0);
  const offenders = files.filter((f) => /_g_/.test(readFileSync(join(ROOT, f), 'utf8')));
  assert.deepEqual(offenders, []);
});
