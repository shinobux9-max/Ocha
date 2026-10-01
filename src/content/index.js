// Ocha v2 — Surface publique de la couche content
//
// Les autres couches n'importent content QUE par ce fichier. La couche est pure (partie 9,
// 9.1) : elle reçoit les données déjà lues et ne fait ni lecture de fichier ni requête réseau.
// Ce sont les adaptateurs d'environnement qui lisent les fichiers : app.js dans le navigateur
// (étape 5), un module d'aide dans les tests.
//
// Étape 2, tâche G1 : catalogue minimal. Il fournit à learning les deux fonctions qu'il attend
// (`elementExists`, `elementsOfScope`). Le graphe (requires, teaches, uses, relations dérivées)
// viendra avec G2 à G9, sur les données reconstruites.

import { buildCatalog, keyOf, ELEMENT_TYPES, SCOPES } from './catalog.js';
import { ContentError } from './errors.js';

export { ContentError } from './errors.js';
export { kanaProblems, kanaEntries, kanaId, KANA_ID_PREFIX } from './kana.js';
export { ELEMENT_TYPES, SCOPES, LEVELS } from './catalog.js';

/**
 * Données attendues :
 * {
 *   levels: { n5: { vocab: [...], grammar: [...], kanji: { chars: [...] } }, ... },
 *   kana: <contenu de data/kana.json>,
 *   vocabHorsJlpt: [...],
 *   expressions: [...]
 * }
 * Seuls les niveaux fournis existent ; les autres ont une portée vide.
 *
 * @throws {ContentError} si les données sont incohérentes (aucun contenu partiel n'est rendu)
 */
export function createContent(rawData) {
  const { problems, existing, scopes } = buildCatalog(rawData);
  if (problems.length) throw new ContentError(problems);

  const frozenScopes = new Map([...scopes].map(([scope, refs]) =>
    [scope, Object.freeze(refs.map((r) => Object.freeze(r)))]));

  /** Vrai si la référence { type, id } désigne un élément qui existe. */
  function elementExists(ref) {
    if (ref === null || typeof ref !== 'object') return false;
    if (!ELEMENT_TYPES.includes(ref.type) || typeof ref.id !== 'string') return false;
    return existing.has(keyOf(ref.type, ref.id));
  }

  /** Éléments d'une seule portée (« kana », « n5 »…), liste gelée de { type, id }. */
  function elementsOfScope(scope) {
    if (!SCOPES.includes(scope)) throw new TypeError(`portée inconnue : ${String(scope)}`);
    return frozenScopes.get(scope);
  }

  return Object.freeze({ elementExists, elementsOfScope });
}
