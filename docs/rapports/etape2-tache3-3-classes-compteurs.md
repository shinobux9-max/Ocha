# Ocha v2 — Rapport de l'étape 2 · A2-02 · 3.3 · Classes grammaticales et compteurs

**Date** : 2026-10-02
**Référence** : arbitrage d'A2-02 (dix classes, `numeral`, 匹), identifiants des compteurs et
autorisation de 3.3 du 2026-10-02.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **308 tests, tous verts** (304 avant, 4 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| Fichiers créés dans `data/registries/` | `grammatical-classes.json` et `counters.json` seulement ; pas de `tags.json` |

## 2. Fichiers

| Fichier | Contenu |
|---|---|
| `data/registries/grammatical-classes.json` | **nouveau** : les dix classes |
| `data/registries/counters.json` | **nouveau** : les six compatibilités |
| `tools/validate-data.mjs` | `checkFlatRegistry`, les deux registres ajoutés à `REGISTRY_SOURCES` |
| `tests/tools/validate-data.test.js` | registres plats dans le jeu d'essai, 1 nouveau test |
| `tests/registries/decisions.test.js` | **nouveau** : 3 tests |

## 3. Ce qui vient du snapshot, ce qui a été décidé

Contrairement aux registres de 3.1 et 3.2, ces deux registres ne sont pas des transcriptions
intégrales d'un snapshot.

| | Vient d'`A2-LING-v1` | Décidé en A2-02 (2026-10-02) |
|---|---|---|
| Classes grammaticales | l'existence de la propriété « catégorie grammaticale » | la liste des dix classes, leurs identifiants, leurs libellés, leur ordre |
| Compteurs | les six notions, chacune illustrée par un compteur (匹, 枚, 本, 冊, 個, 回) ; l'identifiant `small_animals` | les cinq autres identifiants (`flat_objects`, `long_objects`, `books_volumes`, `generic_units`, `occurrences`) ; les libellés |

C'est pourquoi les deux fichiers portent `"source": "A2-02"`, et non une version de snapshot.
`decisions.test.js` vérifie cette séparation :
- les dix classes, exactement et dans l'ordre arbitré ; le snapshot ne nomme que la propriété ;
  aucune classe « compteur » ;
- les six compatibilités, chacune adossée au compteur d'exemple qui la justifie dans le
  snapshot, et pas une de plus que ses exemples ;
- les identifiants déclarés par le snapshot sous `counter_for` sont exactement `small_animals` ;
  les cinq autres sont donc des conventions.

## 4. Les registres

- **Classes grammaticales** : `{ source: "A2-02", classes: [{ id, label }] }`, avec `nom`,
  `numeral`, `pronom`, `verbe`, `adjectif_i`, `adjectif_na`, `adverbe`, `determinant`,
  `conjonction`, `interjection`. Le registre définit les valeurs permises ; le reclassement des
  entrées reste à A2-04.
- **Compteurs** : `{ source: "A2-02", compatibilities: [{ id, label }] }`, dans l'ordre des
  exemples du snapshot.
- **Chaîne à respecter**, contrôlée en A2-03 : propriété `counter` de l'ENTRY → `counter_for` →
  identifiant de `counters.json`. Rien n'est détecté par la forme d'un mot : au N5, seul 匹 a
  besoin de `counter_for`.
- **`validate-data`** contrôle les deux registres comme des listes plates : racine
  `{ source, <liste> }`, source `A2-02`, liste non vide, entrées `{ id, label }` exactes,
  identifiants valides, non réservés et uniques.

## 5. Sabotages

| # | Sabotage | Attrapé par |
|---|---|---|
| D1 | classe « compteur » ajoutée | `decisions.test.js` |
| D2 | classe `numeral` retirée | `decisions.test.js` |
| D3 | deux classes interverties | `decisions.test.js` |
| D4 | `books_volumes` renommé `books` | `decisions.test.js` |
| D5 | septième compatibilité (`persons`) | `decisions.test.js` |
| D6 | source `A2-LING-v1` pour les compteurs | test et `validate-data` |
| D7 | classe en double | test et `validate-data` |
| D8 | libellé de classe vide | test et `validate-data` |
| D9 | compatibilité avec un champ en plus | `validate-data` |
| V1 | registres plats non contrôlés | test « fichiers obligatoires » |
| V2 | source non contrôlée | test des registres plats |
| V3 | unicité non contrôlée | test des registres plats |
| V4 | liste vide acceptée | test des registres plats |

**Un attendu de test erroné, corrigé avant livraison.** Ma première version vérifiait que les
cinq identifiants conventionnels n'apparaissaient nulle part dans le snapshot. Or le mot
« occurrences » y figure en français (« compteur d'occurrences »). Le test compare maintenant la
liste des identifiants que le snapshot déclare sous `counter_for` ; le registre n'a pas changé.

Aucun trou révélé.

## 6. À contrôler

- **`"source": "A2-02"`** : choix proposé pour signaler un registre décidé par Ocha. La décision
  2 d'A2-02 demandait un `source` pour chaque registre sans en fixer la valeur dans ce cas.
- **Libellés** choisis pour les classes (« Adjectif en い », « Déterminant »…) et les
  compatibilités (« Petits animaux », « Objets longs ou cylindriques » pour reprendre « objets
  longs/cylindriques » du snapshot). Ils n'ont pas été arbitrés et ne viennent d'aucun snapshot.
