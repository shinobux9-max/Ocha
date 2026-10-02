// Ocha v2 — Reconstruction (A2-04) : sources figées
//
// Les sources sont des copies des anciens fichiers, figées au début de la reconstruction et
// protégées par leur empreinte SHA-256 (manifest.json). Elles ne sont jamais modifiées : une
// correction se décide dans un lot et se journalise, la source reste telle quelle.

import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

// Fichier source → rôle. Les exemples ne sont lus que comme contexte de relecture.
export const SOURCE_FILES = Object.freeze({
  'vocab.json': 'vocabulaire N5 (ancien format)',
  'vocab-hors-jlpt.json': 'mots hors JLPT (ancien format)',
  'lieux.json': 'lieux (ancien format, vocab_categories : candidats aux tags de lieu)',
  'exemples.json': 'exemples (contexte de relecture seulement, non migrés)'
});

export const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

/** Problèmes d'intégrité des sources : fichier manquant, empreinte différente, fichier imprévu. */
export function verifySources(sourcesDir) {
  const problems = [];
  const manifestPath = join(sourcesDir, 'manifest.json');
  if (!existsSync(manifestPath)) return [{ code: 'sources-manifeste', where: manifestPath, message: 'manifeste absent' }];
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const listed = Object.keys(manifest.files ?? {}).sort();
  if (listed.join() !== Object.keys(SOURCE_FILES).sort().join()) {
    problems.push({ code: 'sources-manifeste', where: manifestPath, message: `fichiers listés : ${listed.join(', ')}` });
  }
  for (const [file, expected] of Object.entries(manifest.files ?? {})) {
    const path = join(sourcesDir, file);
    if (!existsSync(path)) problems.push({ code: 'source-absente', where: file, message: 'fichier absent' });
    else if (sha256(path) !== expected) problems.push({ code: 'source-modifiee', where: file, message: 'empreinte différente du manifeste' });
  }
  return problems;
}

/**
 * Sources lues pour l'assembleur et le rapport, avec la correspondance décidée lieu → tag
 * (place-tags.json, à côté du dossier des sources).
 */
export function readSources(sourcesDir) {
  const read = (f) => JSON.parse(readFileSync(join(sourcesDir, f), 'utf8').replace(/^\uFEFF/, ''));
  const placeTags = JSON.parse(readFileSync(join(sourcesDir, '..', 'place-tags.json'), 'utf8')).places;
  return { vocab: read('vocab.json'), hj: read('vocab-hors-jlpt.json'), lieux: read('lieux.json'), exemples: read('exemples.json'), placeTags };
}
