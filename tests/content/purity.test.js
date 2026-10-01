// La couche content est pure (décision du 2026-10-01, partie 9, 9.1) : elle reçoit les données
// déjà lues. Aucune lecture de fichier, aucune requête réseau, aucun accès à l'environnement.
// Les imports sont vérifiés par la même analyse que tools/check-layers.mjs (aucun import
// externe, `node:fs` compris) ; les accès globaux qu'elle ne couvre pas sont vérifiés ici.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkFile } from '../../tools/check-layers.mjs';

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src');
const FILES = readdirSync(join(SRC, 'content')).filter((f) => f.endsWith('.js')).map((f) => join(SRC, 'content', f));

test('content : imports conformes aux couches (aucune dépendance externe)', () => {
  assert.ok(FILES.length >= 4);
  for (const f of FILES) assert.deepEqual(checkFile(SRC, f, readFileSync(f, 'utf8')), [], f);
});

test('content : ni fetch, ni require, ni process, ni import dynamique', () => {
  const forbidden = [/\bfetch\s*\(/, /\brequire\s*\(/, /\bprocess\./, /\bXMLHttpRequest\b/, /\bimport\s*\(/];
  for (const f of FILES) {
    const code = readFileSync(f, 'utf8');
    for (const re of forbidden) assert.ok(!re.test(code), `${f} : ${re}`);
  }
});
