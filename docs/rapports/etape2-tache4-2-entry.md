# Ocha v2 — Rapport de l'étape 2 · A2-03 · 4.2 · Schéma strict et ENTRY

**Date** : 2026-10-02
**Référence** : autorisation de 4.2 du 2026-10-02 et ses quatre garde-fous ; `schema-A2-01.md`,
§3 à §6, §9 et §12.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **346 tests, tous verts** (326 avant, 20 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| Données, `learning` | non modifiés ; le validateur lexical n'est toujours pas branché sur `data/` |

Contrôles en place : I1 (ENTRY et ses sous-objets), I2, I3, I4, I5, I6, I16, I17, A1, A2, A3, N1.
L'intérieur des SENSE n'est pas examiné (4.3) : `senses` doit seulement être une liste.

## 2. Fichiers

| Fichier | Contenu |
|---|---|
| `tools/lexicon/schema.mjs` | description déclarative (ENTRY, lecture, forme, propriétés linguistiques, compteur, identifiant retiré), valeurs, vérificateur générique `checkShape` |
| `tools/lexicon/entry.mjs` | **nouveau** : analyseur de furigana, contrôles de l'ENTRY et de `vocab-retired.json` |
| `tools/lexicon/index.mjs` | contrat d'entrée étendu (`retired`, `knownKanji`), appel des contrôles, rapport corrigé |
| `tests/lexicon/fixtures/minimal-lexicon.mjs` | `retired` et `knownKanji` ajoutés |
| `tests/lexicon/schema.test.js` | **nouveau** : 5 tests de conformité |
| `tests/lexicon/entry.test.js` | **nouveau** : 15 tests |
| `tests/lexicon/index.test.js` | contrat d'entrée étendu |

## 3. Les quatre garde-fous

**1. Obligatoire et nullable sont distincts.** Chaque champ porte `required` et `nullable`. Un
champ présent à `null` n'est accepté que s'il est `nullable` ; un champ absent n'est accepté que
s'il n'est pas `required`. Aucune valeur par défaut n'existe dans la description : le validateur
valide sans normaliser.
- Un test vérifie qu'une ENTRY sans ses champs facultatifs est valide **et inchangée**
  (comparaison avant et après la validation).
- Un autre vérifie qu'aucun descripteur de champ ne porte de propriété hors de `type`,
  `required`, `nullable`, `items`, `shape`.

**2. I1 générique.** La liste des champs admis vient de la seule description déclarative, par un
vérificateur unique `checkShape`, récursif sur les sous-objets décrits. `entry.mjs` ne contient
aucune liste de champs.

**3. Furigana : structure avant comparaison.** `parseFurigana` découpe le texte en jetons et
n'admet que du texte et des blocs `<ruby>` contenant une ou plusieurs paires « base,
`<rt>`lecture`</rt>` », `<rp>…</rp>` étant permis autour de `<rt>`.
- **Refusés** : toute autre balise, tout attribut, l'imbrication, un `<rt>` hors de `<ruby>`, une
  base ou une lecture vide, une balise non fermée, un `<` ou un `>` isolé.
- **Ordre** : la structure est validée avant le calcul du texte de base.
- **Le cas visé est testé** : `<span>高</span>い`, dont le texte visible vaut `高い`, donne
  `furigana-invalide` et non une concordance.

**4. Kanji calculés, jamais recréés.** Voir la remarque ci-dessous sur N1 : c'est A2 qui calcule
les kanji. `kanjiOf(word)` les calcule pour le contrôle et rien n'est ajouté à l'ENTRY (sabotage
E20).

## 4. Interprétations du schéma, à relire

- **N1 et les kanji.** Dans `schema-A2-01.md`, N1 est le nombre d'ENTRY par niveau (une
  information), et les kanji calculés à partir de `word` relèvent de A2. J'ai appliqué le
  garde-fou 4 à A2.
- **Champs d'une lecture et d'une forme.** Les tableaux §4 et §5 n'ont pas de colonne
  « Obligatoire ». Je les ai tous rendus obligatoires, `note` pouvant valoir `null`, puisque
  aucun n'y est marqué facultatif et que tous les exemples les écrivent.
- **Kanji connus (A2).** Je reprends la définition de l'actuel `kanji-inconnu` (catalogues de
  niveau et dictionnaire), fournie par l'appelant dans `knownKanji`.
- **`text`** désigne une chaîne non vide. Une chaîne vide n'a de sens pour aucun champ textuel du
  schéma.

## 5. Contrôles

| Invariant | Contrôle | Codes |
|---|---|---|
| I1 | forme stricte de l'ENTRY, des lectures, des formes, des propriétés linguistiques, du compteur ; types | `champ-inconnu`, `champ-manquant`, `type-invalide` |
| I2 | `v_<n>`, unique dans tous les fichiers, absent de `vocab-retired.json` | `entree-id`, `id-duplique`, `id-retire` |
| I3 | `level` égal au niveau du fichier | `niveau-fichier` |
| I4 | pas de « / » ; au moins une lecture, une seule par défaut ; kana seulement ; furigana | `forme-invalide`, `lecture-manquante`, `lecture-defaut`, `kana-invalide`, `furigana-invalide`, `furigana-base` |
| I5 | formes distinctes entre elles et de `word` ; furigana de chaque forme | `graphie-doublon`, `furigana-*` |
| I6 | classe au registre ; `group` morphologique ou `null` ; `suru_compatible` seulement avec `nom` ; `counter_for` non vide, au registre | `classe-inconnue`, `group-invalide`, `suru-compatible`, `compteur-vide`, `compteur-inconnu` |
| I16 | même forme et même lecture par défaut, dans tout le vocabulaire | `unite-doublon` |
| I17 | `{ id, merged_into }` exactement, forme, doublons, `merged_into` existant ou `null` | `retire-invalide`, `id-duplique` |
| A1 à A3 | macron, kanji inconnu, `group: suru` sans する | `romaji-macron`, `kanji-inconnu`, `suru-sans-suru` |
| N1 | ENTRY par niveau | `entrees-par-niveau` (information) |

## 6. Un défaut trouvé et corrigé pendant la tâche

Le rapport de 4.1 gelait ses tableaux internes dès le premier appel à `result()`. Or 4.2 l'appelle
en cours de route pour savoir si le contrat d'entrée est respecté. L'ajout suivant (l'information
N1) levait alors une exception. Le rapport a désormais une méthode `hasErrors()`, et `result()`
rend des copies gelées. Le sabotage qui rétablit le défaut d'origine fait échouer 15 tests.

## 7. Sabotages

| # | Sabotage | Attrapé |
|---|---|---|
| E1 à E3 | champs hors schéma, obligatoires non exigés, null accepté partout | oui |
| E4 | valeur par défaut injectée (`writings = []`) | oui (ENTRY inchangée) |
| E5 | furigana « nettoyés » par expression régulière | oui (structure) |
| E6 | `<rp>` non reconnu | oui |
| E7 à E9 | identifiant trop lâche, unicité, identifiant retiré réutilisable | oui |
| E10, E11 | niveau du fichier ignoré, lecture par défaut non contrôlée | oui |
| E12 | « / » et espaces admis dans les kana | oui |
| E13 | forme égale à `word` acceptée dans `writings` | oui |
| E14 à E17 | classe, `group` « adverbe », `suru_compatible`, compatibilité de compteur | oui |
| E18 | unité unique par fichier seulement | oui (cas entre fichiers) |
| E19 | `merged_into` non contrôlé | oui |
| E20 | kanji calculés stockés dans l'ENTRY | oui |
| E21 | N1 absent | oui |
| E22, E23 | valeur par défaut ou `kanji_list` dans la description | oui (conformité) |
| E24 | `note` rendue facultative | oui |
| E25 | appel de `result()` en cours de route | sans objet depuis la correction (`result()` rend des copies) ; le défaut d'origine, rejoué (E25b), est attrapé par 15 tests |

## 8. `ETAT-ACTUEL.md`

Mis à jour : 4.2 livrée, décisions de 4.2. La ligne d'A2-02 dit désormais « A2-02 fermé
(3.1 à 3.5 validées) », comme demandé à la relecture de 4.1.
