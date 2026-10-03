# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.8 · Lot 07 « météo, saisons et nature » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 34 entrées et les 48 décisions de journal du lot sont `proposed`
(D0456 à D0503). Les lots 0 à 06 et leurs 455 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-07.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **427 tests, tous verts** (426 avant, 1 nouveau : le lot 07 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 274 ENTRY, 30 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 07 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 308 (274 + 34) | **308** |
| Identifiants retirés | 30 | **30** (aucune fusion) |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Entrées restantes après le lot | 381 | **381** |
| Avertissements | — | `type-nul` × 19 (1 nouveau : 匹), `categorie-nulle` × 20 (3 nouveaux : 曇る, 吹く et 冷たい, chacun au sens 2), `kanji-inconnu` × 1 |

## 2. 匹 : le premier compteur du corpus

| Champ | Valeur | Décision |
|---|---|---|
| `grammatical_class` / `group` | `nom` / `nom` (mécanique) | aucune classe « compteur » |
| `counter` | `{ counter_for: ["small_animals"] }` | D0500 : propriété de l'ENTRY, conforme à A2-02 et à l'audit 5.7-C |
| Fonction linguistique | aucune | pas de fonction « compteur », ce statut étant porté par `counter` |
| `category` du sens | nombres & quantification › comptage & compteurs › animaux | D0501, **à arbitrer** (ci-dessous) |
| `semantic_type` | `null` | D0502 (`type-nul`) : une unité de comptage, comme キロ au lot 0 |

**La catégorie, confrontée au registre comme demandé.** Le registre contient une catégorie
**« Comptage & compteurs › animaux »**, dont les sœurs sont « personnes », « objets longs », « objets
plats », « machines, véhicules » et « autres classes de comptage ». Elle n'est pas déduite de
`counter_for` : elle décrit directement ce que signifie le sens, une unité pour compter les animaux.

Cela ne contredit pas A2-LING, qui dit seulement que la présence d'un compteur **dans une
expression** (三匹の猫) ne place pas automatiquement cette expression dans « Nombres &
quantification ». Ici, c'est l'ENTRY elle-même qui est le compteur.

- **Proposition** : cette catégorie.
- **Alternative**, si tu juges qu'elle ne décrit pas assez le sens : `category: null` avec une
  décision A5.

## 3. Les autres cas sensibles, à partir des sources

| Entrée | Proposition | Ce que dit la source |
|---|---|---|
| **鳥** | **un sens**, oiseau (D0496) | **Pas d'analogie automatique avec 魚.** La nuance ne décrit que l'oiseau, et « chair de volaille » n'apparaît que dans la liste de traductions ; la viande a sa propre ENTRY (とり肉 / 鶏肉, lot 02). |
| **木** | **deux sens** : arbre / bois (matière) (D0490) | « un arbre vivant ou le bois en tant que matériau » : deux référents, deux types (`organisme_vivant`, `substance_matiere`) |
| **吹く** | **deux sens** : souffler (le vent) / souffler (de l'air, dans un instrument) (D0471) | « l'action du vent qui souffle, ou de souffler de l'air / de jouer d'un instrument à vent » : un phénomène sans agent (が), une action humaine (を) ; sens 2 en `categorie-nulle` (D0472) |
| **冷たい** | **deux sens** : froid au toucher / froid (attitude) (D0480) | « Insensible (figuré) » : sens 2 en `categorie-nulle` (D0481), comme 甘い « indulgent » au lot 02 |
| **曇る** | **deux sens** : se couvrir (le ciel) / s'embuer (D0465), **à arbitrer** | « …ou **par extension** qu'une surface vitrée ou des lunettes s'embuent » ; sujets distincts (空, めがね). On peut aussi n'en garder qu'un, l'extension allant dans la nuance. Sens 2 en `categorie-nulle` (D0466). |
| **山** | un sens, montagne | « tas, au figuré » : hors N5 et absent de la nuance de la source ; abandonné |
| **天気** | un sens, le temps qu'il fait (D0461) ; **correction** (D0462) | « climat » est une information suspecte : il se dit 気候. « Beau temps » est un emploi, dans la nuance. |

## 4. Autres décisions

- **Une graphie** :
  - **暖かい** reçoit la graphie 温かい (D0476), documentée par la source pour la tiédeur d'un plat ;
  - l'usage de chaque graphie est décrit dans la nuance.
- **Deux choix de catégorie, faute de catégorie propre dans le registre** :
  - **les saisons** : « temps › moments et périodes » (D0460, citée par les quatre saisons), type
    `concept_abstrait` comme les repérages temporels du lot 0 ;
  - **空** : « monde naturel », au niveau 1 seul, sans sous-catégorie forcée (D0488).
- **Température** :
  - celle de l'air (暑い, 寒い, 暖かい, 涼しい) relève de « météo › conditions atmosphériques » ;
  - celle des objets (熱い, 冷たい) relève de « sens et perception › toucher et sensations ».
- **川** : `lieu_gare` écarté (D0484). Voir ou traverser une rivière près d'une gare ne suffit pas.
- **Les homophones** (暑い / 熱い, 鳴く / 泣く, 雨 / 飴, 風 / 風邪, 花 / 鼻) sont signalés dans les
  nuances. Ce sont des ENTRY distinctes.
- **Compteurs (audit 5.7-C)** : les nuances de 犬, 猫 et 鳥 disent avec quoi on les compte (匹, 羽),
  en texte libre. Aucune de ces ENTRY n'a de `counter`, puisque ce sont des noms comptés.

## 5. Journal du lot

48 décisions proposées, de D0456 à D0503 :
- 12 décisions : découpages, sens uniques, `counter` et catégorie de 匹, catégories des saisons et
  du ciel, graphie de 暖かい, tag de 川 ;
- 31 abandons ;
- 1 correction (天気 « climat ») ;
- 3 `categorie-nulle` ;
- 1 `type-nul` (匹).

## 6. Ce que j'attends

Ton arbitrage, en particulier sur :
- **la catégorie de 匹** : « Comptage & compteurs › animaux » ou `null` ;
- **曇る** : un ou deux sens ;
- le sens unique de 鳥, et les deux sens de 木, 吹く et 冷たい ;
- les catégories des saisons et de 空.
