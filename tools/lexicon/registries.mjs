// Ocha v2 — Validateur lexical : index des registres (A2-03 · 4.1)
//
// Construit une fois, à partir des huit registres de data/registries/, les questions que le
// validateur lexical posera : ce chemin de catégorie existe-t-il ? ce pôle appartient-il à cet
// axe ? quelle est la nature de ce tag ? Les contrôles du vocabulaire passent uniquement par
// cette API.
//
// Invariant architectural (décision 3 d'A2-02, arbitrage d'A2-03) : une catégorie n'est
// résolue QUE par son chemin complet. Aucune fonction ne prend un identifiant de catégorie isolé,
// et aucune table « identifiant → nœud » n'est exposée : `mois` ou `radio` n'ont de sens que sous
// leur parent.
//
// L'intégrité des registres est vérifiée par tools/validate-data.mjs ; l'index suppose des
// registres intègres et refuse seulement de se construire s'il en manque un.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { REGISTRY_FILES } from './schema.mjs';

const PATH_KEYS = ['level_1', 'level_2', 'level_3'];
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const flat = (registry, ...keys) => keys.reduce((list, key) => list.flatMap((x) => x[key]), [registry]);

/** Lit les huit registres d'un dossier de données. */
export function readRegistries(dataDir) {
  return Object.fromEntries(REGISTRY_FILES.map((file) =>
    [file, JSON.parse(readFileSync(join(dataDir, 'registries', file), 'utf8'))]));
}

// Chemin de catégorie (forme de `category` dans un SENSE, schema-A2-01.md §7) : objet aux clés
// level_1, level_2, level_3 ; level_1 obligatoire ; level_3 seulement avec level_2. Toute autre
// forme, une chaîne isolée en particulier, est une erreur d'appel.
function pathOf(category) {
  if (!isObject(category)) {
    throw new TypeError('une catégorie se résout par son chemin { level_1, level_2, level_3 }, jamais par un identifiant isolé');
  }
  const extra = Object.keys(category).filter((k) => !PATH_KEYS.includes(k));
  if (extra.length) throw new TypeError(`clé(s) de chemin inconnue(s) : ${extra.join(', ')}`);
  const steps = PATH_KEYS.map((k) => category[k] ?? null);
  if (typeof steps[0] !== 'string') throw new TypeError('chemin de catégorie sans level_1');
  if (steps[2] !== null && steps[1] === null) throw new TypeError('level_3 sans level_2');
  for (const s of steps) if (s !== null && typeof s !== 'string') throw new TypeError('niveau de chemin non textuel');
  return steps.filter((s) => s !== null);
}

/**
 * @param {Record<string, object>} registries contenu des huit registres, indexé par nom de fichier
 * @throws {Error} s'il manque un registre
 */
export function buildRegistryIndex(registries) {
  const missing = REGISTRY_FILES.filter((f) => !isObject(registries?.[f]));
  if (missing.length) throw new Error(`registre(s) manquant(s) : ${missing.join(', ')}`);

  // Catégories : clé interne = chemin complet, jamais exposée.
  const categories = new Map();
  for (const l1 of registries['categories.json'].levels) {
    categories.set(JSON.stringify([l1.id]), Object.freeze({ path: Object.freeze([l1.id]), label: l1.label }));
    for (const l2 of l1.children) {
      categories.set(JSON.stringify([l1.id, l2.id]), Object.freeze({ path: Object.freeze([l1.id, l2.id]), label: l2.label }));
      for (const l3 of l2.children) {
        const path = Object.freeze([l1.id, l2.id, l3.id]);
        categories.set(JSON.stringify(path), Object.freeze({ path, label: l3.label }));
      }
    }
  }
  // Types sémantiques : seuls les types terminaux sont attribuables (A2-ST-v1).
  const semanticTypes = new Set(flat(registries['semantic-types.json'], 'families', 'types').map((t) => t.id));
  const axes = new Map(flat(registries['dimensions.json'], 'families', 'axes')
    .map((a) => [a.id, Object.freeze(a.poles.map((p) => p.id))]));
  const relations = new Map(flat(registries['relations.json'], 'families', 'relations')
    .map((r) => [r.id, Object.freeze({ id: r.id, symmetric: r.symmetric, inverse: r.inverse })]));
  const functions = new Map(registries['linguistic-functions.json'].families
    .map((f) => [f.id, new Set(f.functions.map((x) => x.id))]));
  const classes = new Set(registries['grammatical-classes.json'].classes.map((c) => c.id));
  const counters = new Set(registries['counters.json'].compatibilities.map((c) => c.id));
  const tags = new Map(registries['tags.json'].tags.map((t) => [t.id, t.kind]));

  return Object.freeze({
    /** Nœud de catégorie { path, label } au chemin donné, ou null. */
    resolveCategory: (category) => categories.get(JSON.stringify(pathOf(category))) ?? null,
    /** Vrai pour un type sémantique terminal. */
    isSemanticType: (id) => semanticTypes.has(id),
    /** Pôles de l'axe, ou null si l'axe n'existe pas. */
    axisPoles: (axis) => axes.get(axis) ?? null,
    /** Propriétés d'un type de relation { id, symmetric, inverse }, ou null. */
    relationType: (id) => relations.get(id) ?? null,
    /** Familles de fonctions linguistiques (clés de `linguistic_functions`). */
    functionFamilies: () => Object.freeze([...functions.keys()]),
    /** Vrai si la fonction appartient à cette famille. */
    isFunction: (family, id) => functions.get(family)?.has(id) ?? false,
    isGrammaticalClass: (id) => classes.has(id),
    isCounterCompatibility: (id) => counters.has(id),
    /** Nature d'un tag (`kind`), ou null s'il n'existe pas. Jamais déduite de l'identifiant. */
    tagKind: (id) => tags.get(id) ?? null
  });
}
