// Couverture du validateur lexical (A2-03 · 4.5)
//
// Relie chaque invariant de schema-A2-01.md (§12) couvert par A2-03 aux codes qui le signalent,
// et vérifie de façon permanente :
//   - que chaque code émis par tools/lexicon/ est rattaché à un invariant (aucun code orphelin) ;
//   - que chaque code rattaché est réellement émis (aucun invariant fantôme) ;
//   - que chaque code est attendu par au moins un test de tests/lexicon/.
// La preuve forte (neutraliser chaque site d'émission fait échouer au moins un test) a été faite
// par l'audit de 4.5 : voir docs/rapports/etape2-A2-03.md.
// I18 et I20 relèvent de validate-data (identifiants hors vocabulaire, grammaire) ; A4 aussi.
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LEXICON = join(ROOT, 'tools', 'lexicon');
const TESTS = join(ROOT, 'tests', 'lexicon');

export const COVERAGE = Object.freeze({
  contrat: ['lexique-format', 'registres-indisponibles'],
  I1: ['champ-inconnu', 'champ-manquant', 'type-invalide'],
  I2: ['entree-id', 'id-duplique', 'id-retire'],
  I3: ['niveau-fichier'],
  // furigana-lecture : compléments d'I4 et d'I5 par l'addendum A8.
  I4: ['forme-invalide', 'lecture-manquante', 'lecture-defaut', 'kana-invalide', 'furigana-invalide', 'furigana-base', 'furigana-lecture'],
  I5: ['graphie-doublon', 'furigana-invalide', 'furigana-base', 'furigana-lecture'],
  I6: ['classe-inconnue', 'group-invalide', 'suru-compatible', 'compteur-vide', 'compteur-inconnu'],
  I7: ['sens-manquant', 'sens-id', 'id-duplique', 'id-retire', 'sens-retire-invalide'],
  I8: ['sens-libelle'],
  I9: ['categorie-nulle', 'categorie-chemin', 'categorie-inconnue'],
  I10: ['type-nul', 'type-inconnu'],
  I11: ['dimension-inconnue', 'pole-inconnu', 'dimension-doublon'],
  I12: ['relation-inconnue', 'relation-cible', 'relation-doublon'],
  I13: ['fonction-inconnue'],
  I14: ['tag-inconnu', 'tag-doublon', 'tag-repete', 'tag-lieu-expression', 'lieu-tag-nature', 'lieu-format'],
  I15: ['particule-inconnue'],
  I16: ['unite-doublon'],
  I17: ['retire-invalide', 'id-duplique'],
  I19: ['reference-inconnue', 'reference-sens'],
  A1: ['romaji-macron'],
  A2: ['kanji-inconnu'],
  A3: ['suru-sans-suru'],
  N1: ['entrees-par-niveau']
});

const mapped = new Set(Object.values(COVERAGE).flat());
const emitted = new Set(readdirSync(LEXICON).filter((f) => f.endsWith('.mjs'))
  .flatMap((f) => [...readFileSync(join(LEXICON, f), 'utf8').matchAll(/report\.(?:error|warn|info)\('([a-z-]+)'/g)].map((m) => m[1])));
const testSources = readdirSync(TESTS).filter((f) => f.endsWith('.test.js') && f !== 'coverage.test.js')
  .map((f) => readFileSync(join(TESTS, f), 'utf8')).join('\n');

test('chaque invariant d\'A2-03 a au moins un code', () => {
  for (const id of ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'I12', 'I13', 'I14', 'I15', 'I16', 'I17',
    'I19', 'A1', 'A2', 'A3', 'N1']) {
    assert.ok(COVERAGE[id]?.length > 0, id);
  }
});

test('aucun code orphelin, aucun invariant fantôme', () => {
  assert.deepEqual([...emitted].filter((c) => !mapped.has(c)).sort(), [], 'codes émis sans invariant');
  assert.deepEqual([...mapped].filter((c) => !emitted.has(c)).sort(), [], 'codes rattachés jamais émis');
});

test('chaque code est attendu par au moins un test', () => {
  const untested = [...mapped].filter((c) => !testSources.includes(`'${c}'`));
  assert.deepEqual(untested, []);
});
