# Ocha v2 — Rapport de l'étape 2 · A2-03 · 4.3 · SENSE

**Date** : 2026-10-02
**Référence** : autorisation de 4.3 du 2026-10-02 et ses cinq frontières ; `schema-A2-01.md`,
§7, §8 et §12.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **359 tests, tous verts** (346 avant, 13 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| Données, `learning` | non modifiés ; le validateur lexical n'est toujours pas branché sur `data/` |

Contrôles en place : I1 (désormais jusqu'à l'intérieur des SENSE), I7, I8, I9, I10, I11, I13,
I14 (tags de l'ENTRY et des SENSE), I15. I12 et le reste de I14 attendent 4.4.

## 2. Fichiers

| Fichier | Contenu |
|---|---|
| `tools/lexicon/schema.mjs` | `SENSE_SHAPE` et ses sous-objets (libellé, chemin, dimension, relation, fonctions), `SENSE_ID` |
| `tools/lexicon/sense.mjs` | **nouveau** : contrôles des SENSE et des tags de l'ENTRY |
| `tools/lexicon/entry.mjs` | appelle les contrôles des SENSE ; transmet `particles` |
| `tools/lexicon/index.mjs` | contrat d'entrée augmenté de `particles` |
| `tests/lexicon/fixtures/minimal-lexicon.mjs` | `particles` ajouté |
| `tests/lexicon/sense.test.js` | **nouveau** : 11 tests |
| `tests/lexicon/schema.test.js` | 2 nouveaux tests de conformité (SENSE) |
| `tests/lexicon/entry.test.js`, `index.test.js` | adaptés : I1 dans les SENSE, contrat d'entrée |

## 3. Les cinq frontières

**1. `category: null` justifié.** `null` n'est accepté que si le sens porte au moins une fonction
linguistique, dans l'une ou l'autre famille (I9, `categorie-nulle`). Une catégorie non nulle est
résolue par l'index des registres, **par chemin complet seulement** :
- une chaîne isolée (`"mois"`) est refusée dès la forme (`type-invalide`) ;
- un `level_3` sans `level_2` donne `categorie-chemin` ;
- un chemin inexistant donne `categorie-inconnue`, y compris `{ level_1: "mois" }` ;
- les deux « mois » (sous `calendrier` et sous `unites_temporelles`) sont valides.

**2. `semantic_type: null` n'est pas un joker.** Il n'est accepté que si `category` est `null`
(I10, `type-nul`). Comme `category: null` exige lui-même une fonction linguistique, un sens sans
type est forcément un sens grammatical ou pragmatique. Sinon, un **type terminal** du registre est
exigé : une famille (`entity`) est refusée.

**3. Dimensions, un axe au plus une fois.**
- Axe au registre (`dimension-inconnue`), pôle de cet axe précisément (`pole-inconnu`), axe porté
  une seule fois par sens (`dimension-doublon`).
- `{ axis: "probabilite", pole: "probabilite" }` reste valide.

**4. Tags de l'ENTRY et des SENSE (D2).**
- Chaque tag est connu du registre (`tag-inconnu`) ; un préfixe `lieu_` ne suffit pas.
- Aucun doublon dans une liste (`tag-doublon`).
- Aucun tag de l'ENTRY répété sur l'un de ses sens (`tag-repete`).

Les tags de lieu sur les expressions restent à 4.4.

**5. Relations : forme seulement.** La description déclarative vérifie qu'une relation est
exactement `{ type, target }`, deux textes non vides. Rien d'autre : un test fixe la frontière
(une relation de type inconnu vers un sens inexistant est acceptée en 4.3). Le sabotage qui
contrôle le type dès 4.3 est attrapé. Le type, la cible, la symétrie, les inverses et les
doublons relèvent de I12, en 4.4.

## 4. `senses` et identifiants (I7)

- Au moins un sens (`sens-manquant`).
- Identifiant `v_<n>_s<m>`, appartenant à l'ENTRY (`sens-id`), unique (`id-duplique`), absent de
  `retired_sense_ids` (`id-retire`).
- Chaque identifiant de `retired_sense_ids` a la forme d'un sens de cette ENTRY
  (`sens-retire-invalide`).

L'unicité dans tout le vocabulaire découle de l'appartenance à une ENTRY elle-même unique.

La **stabilité historique** (numérotation monotone, non-réattribution d'un sens retiré dans le
passé mais oublié de `retired_sense_ids`) ne se vérifie pas sur un seul état des données. Elle
relève du journal de reconstruction d'A2-04, comme tu l'as noté.

## 5. Autres contrôles

- **I8** : alternatives non vides, distinctes entre elles et du libellé principal
  (`sens-libelle`).
- **I13** : chaque fonction appartient au registre **dans sa propre famille** : `interrogatif`
  sous `pragmatic_discourse` est refusé (`fonction-inconnue`).
- **I15** : chaque particule figure dans `particles.json` (`particule-inconnue`). Le contrat
  d'entrée gagne pour cela la clé `particles`, fournie par l'appelant comme `knownKanji`.

## 6. Interprétation du schéma, à relire

`category` : le schéma dit `level_2` et `level_3` « facultatifs ». Je les accepte absents ou à
`null`, comme l'accepte déjà l'index des registres depuis 4.1, et comme le montre l'exemple du
schéma, qui les écrit tous les trois.

## 7. Sabotages

| # | Sabotage | Attrapé |
|---|---|---|
| F1 à F5 | sens vide, sens d'une autre ENTRY, doublon, sens retiré réutilisé, `retired_sense_ids` non contrôlés | oui |
| F6 | alternatives répétées | oui |
| F7, F8 | `category: null` sans justification, chemin non résolu | oui |
| F9 | catégorie résolue par son dernier identifiant (hypothèse d'un identifiant global) | oui, 20 échecs |
| F10, F11 | `semantic_type: null` sans condition, type non contrôlé | oui |
| F12, F13 | pôle d'un autre axe, axe porté deux fois | oui |
| F14 | famille ignorée pour les fonctions | oui |
| F15 à F17, F19 | tag inconnu, doublon, répétition ENTRY → sens, tags de l'ENTRY non contrôlés | oui |
| F18 | particule inconnue | oui |
| F20 | forme des sens non décrite | oui |
| F21 | type des relations contrôlé dès 4.3 (frontière franchie) | oui |
| F22 | `level_2` rendu obligatoire | oui (conformité) |

Aucun trou révélé.

## 8. Une correction de test

L'aide de test `other()` (une seconde ENTRY) clonait 高い avec ses identifiants de sens
`v_188_s…`. Depuis I7, ces sens n'appartiennent plus à l'ENTRY `v_2` et sont refusés : deux tests
de 4.2 ont échoué pour cette raison. C'était le nouveau contrôle qui fonctionnait. L'aide
renumérote maintenant les sens sous l'identifiant de l'ENTRY ; aucun attendu n'a été affaibli.
