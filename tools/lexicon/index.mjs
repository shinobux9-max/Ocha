// Ocha v2 — Validateur lexical (A2-03)
//
// Vérifie un lexique au schéma A2-01 (docs/conception/schema-A2-01.md) contre les registres
// d'A2-02. C'est une fonction pure : elle reçoit les données déjà lues et rend un rapport.
//
// Activation (arbitrage d'A2-03, décision 1) :
//   - dès A2-03, sur des jeux d'essai (tests) ;
//   - dès A2-04.0, sur la sortie de l'espace de reconstruction, appelée par l'outil d'assemblage ;
//   - sur data/ seulement à la publication d'A2-04, quand tools/validate-data.mjs l'appellera à la
//     place de l'ancien contrôle du vocabulaire. Aucune détection automatique du format.
//
// Contrôles en place : contrat d'entrée (4.1) ; ENTRY, I1 à I6, I16, I17, A1 à A3, N1 (4.2) ;
// SENSE, I7 à I11, I13 à I15 (4.3). À venir : références transversales, I12 et I19 (4.4).

import { buildRegistryIndex } from './registries.mjs';
import { LEXICON_LEVELS } from './schema.mjs';
import { checkEntries } from './entry.mjs';

export { buildRegistryIndex, readRegistries } from './registries.mjs';
export { REGISTRY_SOURCES, REGISTRY_FILES, LEXICON_LEVELS } from './schema.mjs';
export { parseFurigana, kanjiOf } from './entry.mjs';

const INPUT_KEYS = ['files', 'registries', 'retired', 'knownKanji', 'particles'];
const FILE_KEYS = ['file', 'level', 'entries'];
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Rapport de même forme que celui de validate-data : { code, where, message }.
function createReport() {
  const errors = [];
  const warnings = [];
  const infos = [];
  return {
    error: (code, where, message) => errors.push({ code, where, message }),
    warn: (code, where, message) => warnings.push({ code, where, message }),
    info: (code, where, message) => infos.push({ code, where, message }),
    hasErrors: () => errors.length > 0,
    // Copie gelée : le rapport peut encore recevoir des problèmes après un appel.
    result: () => Object.freeze({ errors: Object.freeze([...errors]), warnings: Object.freeze([...warnings]), infos: Object.freeze([...infos]) })
  };
}

/**
 * @param {object} input
 * @param {{ file: string, level: string, entries: object[] }[]} input.files fichiers de vocabulaire,
 *   chacun avec le niveau qu'il porte (`N5`… ou `hors_jlpt`)
 * @param {Record<string, object>} input.registries contenu des huit registres de data/registries/
 * @param {object[]} input.retired contenu de data/vocab-retired.json
 * @param {string[]} input.knownKanji kanji connus : catalogues de niveau et dictionnaire (A2)
 * @param {string[]} input.particles valeurs de particles.json (I15)
 * @returns {{ errors: object[], warnings: object[], infos: object[] }}
 */
export function validateLexicon(input) {
  const report = createReport();
  if (!isObject(input)) {
    report.error('lexique-format', 'lexique', 'objet { files, registries } attendu');
    return report.result();
  }
  const extra = Object.keys(input).filter((k) => !INPUT_KEYS.includes(k));
  if (extra.length) report.error('lexique-format', 'lexique', `clé(s) inconnue(s) : ${extra.join(', ')}`);

  let index = null;
  try {
    index = buildRegistryIndex(input.registries);
  } catch (e) {
    report.error('registres-indisponibles', 'registries', e.message);
  }
  if (!Array.isArray(input.retired)) report.error('lexique-format', 'lexique', '« retired » doit être une liste (data/vocab-retired.json)');
  if (!Array.isArray(input.knownKanji) || input.knownKanji.some((k) => typeof k !== 'string' || [...k].length !== 1)) {
    report.error('lexique-format', 'lexique', '« knownKanji » doit être une liste de caractères');
  }
  if (!Array.isArray(input.particles) || input.particles.some((p) => typeof p !== 'string' || p === '')) {
    report.error('lexique-format', 'lexique', '« particles » doit être une liste de particules (particles.json)');
  }

  if (!Array.isArray(input.files) || input.files.length === 0) {
    report.error('lexique-format', 'lexique', '« files » doit être une liste non vide');
    return report.result();
  }
  const names = new Set();
  input.files.forEach((f, i) => {
    const where = `fichier ${i + 1}`;
    if (!isObject(f)) { report.error('lexique-format', where, 'objet { file, level, entries } attendu'); return; }
    const keys = Object.keys(f).sort().join(',');
    if (keys !== [...FILE_KEYS].sort().join(',')) report.error('lexique-format', where, `clés ${keys || '(aucune)'} au lieu de ${FILE_KEYS.join(', ')}`);
    if (typeof f.file !== 'string' || f.file === '') report.error('lexique-format', where, 'nom de fichier manquant');
    else if (names.has(f.file)) report.error('lexique-format', where, `fichier « ${f.file} » en double`);
    else names.add(f.file);
    if (!LEXICON_LEVELS.includes(f.level)) report.error('lexique-format', where, `niveau « ${f.level} » inconnu (${LEXICON_LEVELS.join(', ')})`);
    if (!Array.isArray(f.entries)) report.error('lexique-format', where, '« entries » doit être une liste');
  });
  // Les contrôles du lexique supposent un contrat d'entrée respecté.
  if (report.hasErrors()) return report.result();
  checkEntries(report, { files: input.files, retired: input.retired, knownKanji: input.knownKanji, particles: input.particles, index });
  return report.result();
}
