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
// A2-03 · 4.1 : socle. Seul le contrat d'entrée est vérifié ; les invariants I1 à I19 viennent
// avec 4.2 à 4.4.

import { buildRegistryIndex } from './registries.mjs';
import { LEXICON_LEVELS } from './schema.mjs';

export { buildRegistryIndex, readRegistries } from './registries.mjs';
export { REGISTRY_SOURCES, REGISTRY_FILES, LEXICON_LEVELS } from './schema.mjs';

const INPUT_KEYS = ['files', 'registries'];
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
    result: () => Object.freeze({ errors: Object.freeze(errors), warnings: Object.freeze(warnings), infos: Object.freeze(infos) })
  };
}

/**
 * @param {{ files: { file: string, level: string, entries: object[] }[], registries: Record<string, object> }} input
 *   files : les fichiers de vocabulaire, chacun avec le niveau qu'il porte (`N5`… ou `hors_jlpt`) ;
 *   registries : le contenu des huit registres de data/registries/, indexé par nom de fichier.
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

  try {
    buildRegistryIndex(input.registries);
  } catch (e) {
    report.error('registres-indisponibles', 'registries', e.message);
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
  return report.result();
}
