// Adaptateur d'environnement pour les tests (Node) : lit les fichiers de data/ et les assemble
// dans la forme attendue par createContent. Dans l'application, app.js jouera ce rôle avec
// fetch (étape 5). La couche content, elle, ne lit jamais de fichier.
//
// Niveaux chargés : ceux dont le validateur garantit la structure (VALIDATED_LEVELS). Les
// autres niveaux sont dans l'ancien format et ne sont pas encore intégrés : leur portée est vide.

import { readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VALIDATED_LEVELS } from '../../tools/validate-data.mjs';

export const DATA_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');

const read = (dataDir, rel) => JSON.parse(readFileSync(join(dataDir, rel), 'utf8').replace(/^\uFEFF/, ''));

export function loadRawContent(dataDir = DATA_DIR, levels = VALIDATED_LEVELS) {
  return {
    levels: Object.fromEntries(levels.map((lvl) => [lvl, {
      vocab: read(dataDir, join(lvl, 'vocab.json')),
      grammar: read(dataDir, join(lvl, 'grammar.json')),
      kanji: read(dataDir, join(lvl, 'kanji.json'))
    }])),
    kana: read(dataDir, 'kana.json'),
    vocabHorsJlpt: read(dataDir, 'vocab-hors-jlpt.json'),
    expressions: read(dataDir, 'expressions.json')
  };
}
