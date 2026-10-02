// Pureté du validateur lexical (arbitrage d'A2-03) : validateLexicon reçoit toutes ses données et
// ne lit aucun fichier. Seul registries.mjs importe node:fs, pour readRegistries, une aide de
// lecture offerte à l'appelant et jamais appelée par le validateur.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'tools', 'lexicon');
const source = (f) => readFileSync(join(DIR, f), 'utf8');

test('aucun module du validateur ne lit de fichier, sauf l\'aide readRegistries', () => {
  const files = readdirSync(DIR).filter((f) => f.endsWith('.mjs'));
  assert.ok(files.includes('index.mjs') && files.includes('references.mjs'));
  for (const f of files) {
    const code = source(f);
    const io = /from 'node:(fs|fs\/promises|http|https|net|child_process)'|\bfetch\s*\(|\brequire\s*\(|\bimport\s*\(/.test(code);
    if (f === 'registries.mjs') {
      assert.match(code, /from 'node:fs'/);
      assert.ok(!/\bfetch\s*\(|\bimport\s*\(/.test(code), f);
    } else {
      assert.ok(!io, `${f} : accès au disque ou au réseau`);
    }
  }
});

test('validateLexicon n\'appelle jamais readRegistries', () => {
  for (const f of ['index.mjs', 'entry.mjs', 'sense.mjs', 'references.mjs', 'schema.mjs']) {
    assert.ok(!/readRegistries\s*\(/.test(source(f)), f);
  }
});
