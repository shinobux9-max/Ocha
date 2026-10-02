// Ocha v2 — Validateur lexical : description du schéma (A2-03)
//
// Implémentation exécutable de docs/conception/schema-A2-01.md, qui reste la référence humaine.
// Ce fichier est la SEULE description du schéma utilisée par le validateur : aucun contrôle ne
// relit le Markdown. Une divergence entre les deux se corrige consciemment, des deux côtés.
//
// A2-03 · 4.1 : socle seulement (registres, niveaux). La description des objets ENTRY et SENSE
// vient avec 4.2 et 4.3.

// Registres de data/registries/ et version de leur source (A2-02) : cinq transcriptions de
// snapshot, trois registres décidés en A2-02. Liste unique, importée aussi par validate-data.
export const REGISTRY_SOURCES = Object.freeze({
  'categories.json': 'A2-L3-v1',
  'semantic-types.json': 'A2-ST-v1',
  'dimensions.json': 'A2-DIM-v1',
  'relations.json': 'A2-REL-v1.1',
  'linguistic-functions.json': 'A2-LING-v1',
  // Décidés en A2-02, non transcrits d'un snapshot : classes grammaticales (A2-LING-v1 nomme la
  // propriété sans en donner les valeurs), compatibilités de compteur (notions d'A2-LING-v1,
  // identifiants fixés en A2-02 sauf `small_animals`), tags.
  'grammatical-classes.json': 'A2-02',
  'counters.json': 'A2-02',
  'tags.json': 'A2-02'
});

export const REGISTRY_FILES = Object.freeze(Object.keys(REGISTRY_SOURCES));

// Valeurs du champ `level` d'une ENTRY (schema-A2-01.md, §3).
export const LEXICON_LEVELS = Object.freeze(['N5', 'N4', 'N3', 'N2', 'N1', 'hors_jlpt']);
