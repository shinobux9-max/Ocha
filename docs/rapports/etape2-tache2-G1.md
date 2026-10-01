# Ocha v2 — Rapport de l'étape 2 · tâche 2 · G1 · Catalogue minimal

**Date** : 2026-10-02
**Référence** : périmètre validé le 2026-10-01 (décisions 1 à 8), ajusté par les addenda A3 et A4
(aucun contrôle de préfixe du vocabulaire, grammaire en `g_<n>`).

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **286 tests, tous verts** (268 avant la tâche, 18 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation (19 fichiers, dont les 4 de `src/content/`) |
| Catalogue sur les vraies données | 210 kana ; portée `n5` : 75 leçons, 716 mots, 110 kanji (901) ; `n4` à `n1` vides |

## 2. Fichiers

| Fichier | Rôle |
|---|---|
| `data/kana.json` | **nouveau** : source canonique des kana, en grille (voir section 3) |
| `src/content/index.js` | **nouveau** : seule surface publique de `content` |
| `src/content/catalog.js` | **nouveau** : catalogue des éléments à partir des données reçues |
| `src/content/kana.js` | **nouveau** : contrôle et liste plate du catalogue des kana |
| `src/content/errors.js` | **nouveau** : `ContentError` |
| `tests/helpers/content-data.mjs` | **nouveau** : adaptateur Node qui lit `data/` pour les tests |
| `tests/content/fixtures/kana-legacy.json` | **nouveau** : copie figée de l'ancienne liste des kana |
| `tests/content/kana.test.js`, `catalog.test.js`, `integration.test.js`, `purity.test.js` | **nouveaux** : 15 tests |
| `tools/validate-data.mjs` | kana et kanji par catalogue |
| `tests/tools/validate-data.test.js` | catalogue de kana dans le jeu d'essai, 3 nouveaux tests |

## 3. `data/kana.json`

- **Généré** à partir des listes de l'ancien `data-loader.js`, sans aucune correction : les romaji
  `–` (っ), `di`, `du`, `wo` sont repris tels quels.
- **Forme** : `{ scripts: [{ id, groups: [{ id, title, rows }] }] }`.
  - Écritures : `hiragana`, `katakana`.
  - Groupes : `base`, `dakuten`, `handakuten`, `sokuon`, `yoon`.
  - `title` : repris de l'ancien code (`null` pour la base, `Dakuten ゛`…).
  - Cases : `{ char, romaji }` ou `null` (case vide de la grille).
- **Aucun identifiant stocké** : `kana_<caractère>` se déduit du caractère, comme le veut le
  principe « rien de dérivable » de l'addendum A3.
- Une rangée par ligne dans le fichier, pour que la grille reste lisible dans VS Code.
- **Non-régression** : la liste plate dérivée du fichier est comparée, élément par élément
  (identifiant, caractère, romaji, ordre), à une copie figée de `getKanaFlatList('both')` de
  l'ancienne application. La copie ne dépend pas de `js/`, qui disparaîtra à l'étape 5.

## 4. La couche `content`

- **Pure.** `createContent(rawData)` reçoit les données déjà lues. Aucune lecture de fichier,
  aucune requête : c'est l'adaptateur qui lit (`tests/helpers/content-data.mjs` dans les tests,
  `app.js` à l'étape 5).
- **Contrat d'entrée** : `{ levels: { <niveau>: { vocab, grammar, kanji } }, kana, vocabHorsJlpt,
  expressions }`. Toute autre clé est refusée. L'adaptateur fournit les niveaux de
  `VALIDATED_LEVELS` (aujourd'hui `n5`).
- **Ne lit que l'identité.** Vocabulaire, grammaire et expressions : `id` seulement (un test le
  vérifie avec des entrées réduites à `{ id }`). Kanji : `kanji.chars` du niveau. Kana : la
  grille. Aucun champ du schéma lexical actuel n'entre dans le contrat.
- **Le niveau** vient de la place du fichier dans les données reçues, jamais de l'identifiant.
- **Surface** : `createContent` rend un objet gelé `{ elementExists, elementsOfScope }`.
  - `elementExists({ type, id })` : vrai si l'élément existe ; faux pour toute référence mal
    formée ou d'un type inconnu.
  - `elementsOfScope(portée)` :
    - `kana` : les 210 kana, dans l'ordre de la grille ;
    - `n5` à `n1` : grammaire, vocabulaire JLPT et kanji du niveau, dans cet ordre et dans
      l'ordre des fichiers ; jamais les mots hors JLPT ni les expressions ;
    - niveau non fourni : liste vide ; portée inconnue : `TypeError`.

    Les listes sont gelées et identiques d'un appel à l'autre.
- **Refus** (`ContentError`, qui porte tous les problèmes) : identifiant absent ou en double pour
  un même type (y compris entre le N5 et les mots hors JLPT), kanji de plusieurs caractères ou
  présent dans deux niveaux, niveau inconnu, fichier de niveau manquant, clé inconnue, catalogue
  des kana invalide. Aucun contenu partiel n'est rendu.

## 5. Validateur

- **`kana.json` obligatoire**, contrôlé par `kanaProblems`, importée de `src/content/index.js` :
  une seule définition des règles pour le contenu et le validateur.
- **Un kana existe s'il est au catalogue.** L'ancien contrôle par la forme (un caractère après
  `kana_`) refusait les yōon : `kana_きゃ` est maintenant accepté.
- **Un kanji référencé** (`requires`, `teaches`, `target`, `refs`) doit appartenir au catalogue
  d'un niveau. Le dictionnaire `kanji_jouyou_fr.json` ne sert plus qu'à l'avertissement
  `kanji-inconnu` sur les kanji des mots. Aucune donnée actuelle ne référence de kanji ni de kana :
  rien ne change pour elles.

## 6. Intégration avec `learning`

Par les seules surfaces publiques (`src/content/index.js`, `src/learning/index.js`) et le stockage
en mémoire :

- « Je connais le N5 » déclare exactement les kana et les éléments N5 (1 111), tous Acquis, et
  aucun mot hors JLPT ni aucune expression ;
- un événement sur un élément inexistant (`g_9999`, 爽, `kana_ゔ`, mot inconnu) est refusé ;
  un élément existant (mot hors JLPT, yōon, leçon) est accepté.

## 7. Sabotages

| # | Sabotage | Attrapé par |
|---|---|---|
| S1 | un romaji de `kana.json` modifié (ぢ : `di` → `ji`) | non-régression |
| S2 | deux kana intervertis dans la grille | non-régression |
| S3 | mots hors JLPT dans la portée `n5` | portée, intégration |
| S4 | expressions dans la portée `n5` | portée, intégration |
| S5 | tout caractère seul accepté comme kanji | existence, intégration |
| S6 | kana reconnu par sa forme et non par le catalogue | existence, intégration |
| S7 | identifiants en double acceptés | refus |
| S8 | contenu rendu malgré les problèmes | refus |
| S9 | portées non gelées | portées gelées |
| S10 | portée inconnue rendue vide | portées |
| S11 | `import 'node:fs'` dans `content` | pureté (et `check-layers`) |
| S12 | `fetch` dans `content` | pureté |
| S13 | grammaire retirée de la portée `n5` | portée, intégration |
| S13b | vocabulaire placé avant la grammaire dans la portée | ordre de la portée |
| S14 | un champ lexical exigé (`word`) | « ne lit que l'identifiant » |
| S15 | validateur : kana reconnu par sa forme | kana au catalogue |
| S16 | validateur : kanji du dictionnaire acceptés en référence | kanji au catalogue |
| S17 | validateur : `kana.json` facultatif | `kana.json` obligatoire |
| S18 | validateur : structure de `kana.json` non contrôlée | `kana.json` contrôlé |
| S19 | case de kana avec un champ en trop acceptée | structure des kana |

Données : un kana en double dans `data/kana.json` fait échouer `validate-data` (`id-duplique`).

Aucun trou révélé.

## 8. Points à signaler

- **`check-layers` ne voit pas `fetch`** (ce n'est pas un global qu'il surveille). Le test de
  pureté de `content` le couvre pour cette couche ; je n'ai pas modifié `check-layers`.
- **Le validateur importe `src/content/index.js`.** C'est voulu (une seule définition des règles
  des kana) ; `tools/` n'est pas une couche contrôlée par `check-layers`.
- **`exemples.json` et l'ancienne application** ne sont pas lus par `content`.
