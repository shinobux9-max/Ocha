// Ocha v2 — Erreur de construction du contenu
//
// Le contenu refuse de se construire sur des données incohérentes (décision du 2026-10-01) : une
// référence ou un catalogue cassé signifie que le graphe ne serait pas celui que déclarent les
// données. L'erreur porte TOUS les problèmes trouvés, pas seulement le premier.

/**
 * @typedef {{ code: string, where: string, message: string }} ContentProblem
 */

export class ContentError extends Error {
  /** @param {ContentProblem[]} problems */
  constructor(problems) {
    const head = problems.slice(0, 3).map((p) => `${p.where} : ${p.message}`).join(' ; ');
    const more = problems.length > 3 ? ` (et ${problems.length - 3} autre(s))` : '';
    super(`contenu invalide, ${problems.length} problème(s) : ${head}${more}`);
    this.name = 'ContentError';
    this.problems = Object.freeze(problems.map((p) => Object.freeze({ ...p })));
  }
}
