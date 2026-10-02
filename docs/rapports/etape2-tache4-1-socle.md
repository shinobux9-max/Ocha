# Ocha v2 — Rapport de l'étape 2 · A2-03 · 4.1 · Socle du validateur lexical

**Date** : 2026-10-02
**Référence** : arbitrage du découpage d'A2-03 et autorisation de 4.1 du 2026-10-02.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **326 tests, tous verts** (315 avant, 11 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| Données | aucune modifiée : ni vocabulaire, ni `lieux.json`, ni expressions, ni registres |
| `src/learning/`, `events.js` | non modifiés |

## 2. Fichiers

| Fichier | Contenu |
|---|---|
| `tools/lexicon/schema.mjs` | **nouveau** : socle de la description du schéma (registres et leur source, niveaux d'une ENTRY) |
| `tools/lexicon/registries.mjs` | **nouveau** : lecture et index des huit registres |
| `tools/lexicon/index.mjs` | **nouveau** : `validateLexicon`, contrat d'entrée seulement |
| `tools/validate-data.mjs` | `REGISTRY_SOURCES` importé du socle ; libellés sans espaces autour ; `v_` réservé |
| `tests/lexicon/fixtures/minimal-lexicon.mjs` | **nouveau** : fixture technique illustrative |
| `tests/lexicon/registries.test.js` | **nouveau** : 5 tests |
| `tests/lexicon/index.test.js` | **nouveau** : 4 tests |
| `tests/tools/validate-data.test.js` | 2 nouveaux tests |

`entry.mjs`, `sense.mjs` et `references.mjs` viendront avec 4.2 à 4.4.

## 3. Index des registres

`buildRegistryIndex(registres)` rend un objet gelé de neuf fonctions, sans aucune table
exposée :

| Fonction | Question |
|---|---|
| `resolveCategory({ level_1, level_2, level_3 })` | ce chemin existe-t-il ? (nœud `{ path, label }` gelé, ou `null`) |
| `isSemanticType(id)` | est-ce un type terminal ? (une famille ne l'est pas) |
| `axisPoles(axe)` | pôles de l'axe, ou `null` |
| `relationType(id)` | `{ id, symmetric, inverse }`, ou `null` |
| `functionFamilies()`, `isFunction(famille, id)` | familles, et appartenance à une famille précise |
| `isGrammaticalClass(id)`, `isCounterCompatibility(id)` | appartenance |
| `tagKind(id)` | nature du tag, ou `null` ; jamais déduite de l'identifiant |

**Résolution des catégories par chemin seulement.**
- `resolveCategory` refuse par une `TypeError` une chaîne isolée (`"mois"`), un chemin sans
  `level_1`, un `level_3` sans `level_2`, une clé inconnue (`{ id: "mois" }`) ou un niveau non
  textuel.
- `{ level_1: "mois" }` rend `null` : `mois` n'est pas un niveau 1.
- `null` est accepté pour un niveau absent, comme dans un SENSE.

Les tests vérifient :
- que `mois`, `radio` et `interpretation` ne se résolvent sous aucune forme isolée ;
- que les deux « mois » sont deux nœuds distincts ;
- que l'API compte exactement ces neuf fonctions, gelées, et que les nœuds rendus sont gelés.

L'index refuse de se construire s'il manque un registre. Il suppose des registres intègres :
c'est `validate-data` qui vérifie leur intégrité.

## 4. `validateLexicon`

- **Contrat d'entrée** : `{ files: [{ file, level, entries }], registries }`.
  - `level` : `N5` à `N1` ou `hors_jlpt`, la valeur du champ `level` des ENTRY.
  - `registries` : le contenu des huit registres, indexé par nom de fichier.
- **Ce qui est refusé** (`lexique-format`) : clé inconnue, liste de fichiers vide ou absente,
  fichier malformé ou en double, niveau inconnu, `entries` qui n'est pas une liste. Un registre
  manquant donne `registres-indisponibles`, sans exception.
- **Rapport** : `{ errors, warnings, infos }` gelé, de même forme que celui de `validate-data`.
- **Ce qui n'est pas encore contrôlé** : aucun des invariants I1 à I19 n'est vérifié en 4.1.

## 5. Règles transmises par l'audit d'A2-02, actives dans `validate-data`

- **Libellés** : non vides, sans espace au début ni à la fin (`label === label.trim()`), dans les
  huit registres. Les espaces internes restent permis (« Objet / artefact »).
- **`v_` réservé** : `RESERVED_PREFIXES = ['g_', 'v_']`, refusé dans les lieux, registres de
  langue, personnages, activités, questions, expressions et registres A2. Les identifiants de
  vocabulaire eux-mêmes sont contrôlés par leur propre forme.
- **Liste unique des registres** : `REGISTRY_SOURCES` est défini une seule fois, dans
  `tools/lexicon/schema.mjs`, et importé par `validate-data`, qui le réexporte.

## 6. Fixture

`minimal-lexicon.mjs` contient une entrée au schéma A2-01 (高い, deux sens) et un fichier hors
JLPT vide. Elle est **illustrative** : elle ne décide rien du contenu canonique de 高い, que seule
A2-04 fixera. Un test vérifie que toutes ses références aux registres existent (chemins de
catégorie, types, classe, tag de lieu).

## 7. Sabotages

| # | Sabotage | Attrapé par |
|---|---|---|
| L1 | identifiant isolé résolu par recherche dans l'arbre | « impossible de résoudre un identifiant isolé » |
| L2 | fonction `categoryById` ajoutée à l'API | « aucune table identifiant → nœud » |
| L3 | `level_3` accepté sans `level_2` | « identifiant isolé » |
| L4 | `level_1` facultatif | « identifiant isolé » |
| L5 | familles de types attribuables | index des autres registres |
| L6 | nature d'un tag déduite du préfixe | index des autres registres |
| L7 | famille ignorée pour les fonctions | index des autres registres |
| L8 | registre manquant non détecté | « registres manquants » |
| L9 | nœuds de catégorie non gelés | API gelée |
| L10 | niveau de fichier non contrôlé | contrat d'entrée |
| L11 | clés inconnues du lexique acceptées | contrat d'entrée |
| L12 | espaces autour d'un libellé acceptés | test des libellés |
| L13 | `v_` non réservé | test du préfixe `v_` |

Aucun trou révélé.
