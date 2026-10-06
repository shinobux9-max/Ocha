# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 22 « Manière, identité, diversité et probabilité » · proposition

**Date** : 2026-10-06
**Nature** : livraison pour relecture, alors en `proposed`. **Lot validé depuis, le 2026-10-06**
(rapport `docs/rapports/etape2-A2-04-lot22-valide.md`) : statuts seulement. Rien n'est committé,
rien n'est poussé.

**Version** : révisée le 2026-10-06 après l'arbitrage des 16 choix (§9). Les §1 à §8 restent la
proposition telle qu'elle a été relue ; le §9 dit ce qui a changé, le §10 en donne le diff complet.

**À lire avec** : `reconstruction/a2-04/rapports/lot-22.md` (rapport généré, entrée par entrée) et
`docs/rapports/etape2-A2-04-lot22-perimetre.md` (périmètre arbitré, §9).

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Aucun sens,
aucune lecture, aucune graphie, aucune particule, aucune relation, aucune fonction n'est ajouté par
connaissance externe.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-22.json` | nouveau : 9 entrées, toutes `proposed` ; 7 gardées, 2 retirées par fusion ; aucun ajout |
| `reconstruction/a2-04/journal.json` | 31 décisions `proposed`, D1404 à D1434, ajoutées à la fin ; les 1 403 décisions validées sont identiques à l'octet |
| `reconstruction/a2-04/rapports/lot-22.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | tests adaptés à l'état « lot 22 proposé » (espace de travail réel ; lots 17 à 21 dans l'assemblage réel ; lots 20 et 21 ; journal), deux tests ajoutés |
| Autres lots, règles, validateur, registres, sources figées | inchangés ; **弱い (lot 17) n'est pas touchée** |

**Sens** : 8, pour les 7 entrées gardées. まっすぐ a deux sens ; les six autres en ont un.

| Nature | Champ | Nombre |
|---|---|---|
| `fusion` | entrée (弱く dans 弱い ; ゆっくりと dans ゆっくり) | 2 |
| `decision` | sens (une par entrée gardée) | 7 |
| `abandon` | sens (traductions écartées) | 5 |
| `categorie-nulle` | catégorie d'un sens (A5) | 5 |
| `type-nul` | type d'un sens (A6) | 1 |
| `decision` | dimension d'un sens (A2-DIM) | 1 |
| `decision` | fonctions linguistiques (aucune n'est posée) | 4 |
| `correction` | lecture (一緒, 同じ) | 2 |
| `decision` | classe grammaticale (一緒, 同じ) | 2 |
| `decision` | nuance (emploi ゆっくりと conservé) | 1 |
| `abandon` | nuance (exemple altéré de 他) | 1 |

Aucune forme usuelle, aucune graphie, aucun tag, aucune relation ni aucune fonction linguistique
n'est décidé.

## 2. L'arbitrage du périmètre, tel qu'il est appliqué

1. **Périmètre** : les 9 identifiants arbitrés, dans l'ordre du rapport de périmètre.
2. **弱く : fusion dans 弱い** (D1412) : `retire: { merged_into: "n5_v_449" }`, règle normale du plus
   petit numéro, sans `exception-fusion`. **弱い n'est pas rouverte** : son statut, ses trois
   décisions (D1137 à D1139) et son sens unique « Faible » sont intacts (un test le vérifie) ; aucun
   sens nouveau n'y est créé. Les traductions de la forme en -ku ne sont pas reportées.
3. **ゆっくりと : fusion dans ゆっくり** (D1408) : l'emploi avec と et sa nuance de style (« lenteur
   ou délibération », « style un peu plus formel ou littéraire ») sont dans la nuance de ゆっくり
   (D1407), avec l'exemple de la fiche fusionnée ; **と n'est pas une particule régie** : le sens
   unique de ゆっくり reprend mécaniquement les particules de sa fiche, aucune. « D'une manière
   posée », traduction de ゆっくりと, est gardée dans cette nuance, non comme traduction du sens
   (D1406).
4. **Fonctions** : `linguistic_functions` est vide pour les 8 sens. Quatre décisions disent
   qu'aucune n'est posée : `comparatif` pour 同じ (D1421), `quantificateur` pour いろいろ (D1424),
   `alternative` pour 他 (D1428), `modalite` pour たぶん (D1434).
5. **まっすぐ** : « Français (pour une direction ou un caractère) » écarté comme confusion de la
   source (D1410), **sans traduction de remplacement**.
6. **Relations** : `relations: []` pour les 8 sens, aucune candidate.

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la proposition (commit `1cfac5b`) | 650 | 32 | 37 | 0 | 0 | 0 |
| **Réel**, proposition en cours | **650** | 32 | 37 (28 non décidées, 9 propositions) | 0 | 0 | 0 |
| **Essai à blanc**, tout supposé validé, en mémoire | **657** | **34** | **28** | 0 | 0 | 0 |

- **L'état réel ne change pas** tant que rien n'est validé.
- **Essai à blanc** : 657 = 650 + 7 ENTRY gardées ; 34 = 32 + 2 retraits (`v_505` vers `v_504`,
  `v_450` vers `v_449`). Les 28 entrées restantes seraient 1 nom (大勢), 25 adverbes, conjonctions
  et interjections, 2 adjectifs (多い, 少ない).
- **Avertissements à l'essai à blanc** : 146, soit 6 de plus : 5 `categorie-nulle` (まっすぐ, sens 2 ;
  同じ ; いろいろ ; 他 ; たぶん) et 1 `type-nul` (たぶん), tous justifiés au journal. 弱い garde son
  avertissement, inchangé depuis le lot 17.
- **Tests** : 474 réussis, 0 échec (472 avant ; deux tests ajoutés : l'état du lot 22 proposé,
  l'essai à blanc).
- **Sabotages** : 36, tous attrapés, chacun vérifié comme modifiant réellement son fichier, puis
  rétabli à l'octet près (empreintes contrôlées) : entrée ou décision validée sans autorisation ;
  弱い rouverte, ou un sens ajouté à 弱い ; 弱く gardée, ou fusionnée ailleurs ; ゆっくりと gardée,
  ou fusion inversée ; `exception-fusion` ajoutée ; と en particule régie ; emploi ゆっくりと retiré
  de la nuance ; « Français » remis, ou « Franc » inventé ; まっすぐ réduite à un sens ;
  `comparatif`, `modalite`, `alternative` ou `quantificateur` posée ; dimension retirée ou inventée ;
  relation posée ; type nul ou catégorie nulle sans justification ; lectures remises à la source ;
  classe ou groupe changés ; traduction abandonnée remise, ou perdue ; exemple altéré repris ; type
  changé ; entrée retirée du lot, ou entrée hors périmètre ajoutée ; décision supprimée ; décision
  d'un lot clos modifiée ; décision du lot 22 citée par un autre lot.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 4. Les choix lexicaux, groupe par groupe

Notation : **traduction principale** | autres traductions.

### A. Manière, direction et compagnie (5)

| Entrée | Décision | Catégorie | Type |
|---|---|---|---|
| ゆっくり | **Lentement** \| Tranquillement \| À son aise | espace › vitesse | propriete |
| ゆっくりと | fusionnée dans ゆっくり | — | — |
| まっすぐ | 1. **Tout droit** \| Directement · 2. **Honnête** | 1. espace › direction et orientation › orientation · 2. aucune | propriete |
| 弱く | fusionnée dans 弱い | — | — |
| 一緒 | **Ensemble** \| En compagnie de (に, de la fiche) | relations sociales › interactions sociales | etat |

- **ゆっくり** (D1404) : un sens, la manière d'agir sans hâte ; catégorie et type de « Lent » (遅い)
  et « Rapide » (速い). « Prendre son temps », locution verbale, passe en nuance (D1405). La mention
  « gitaigo » est gardée en nuance (D1407).
- **まっすぐ** (D1409) : deux référents, la direction (l'exemple) et le caractère. Le registre n'a
  pas de catégorie pour le caractère (D1411). La fiche dit aussi « adjectif en na » : la classe
  mécanique, adverbe, reste.
- **一緒** : lecture corrigée (D1413, furigana de l'exemple de la fiche, comme もう一度) ; **classe
  `nom`** (D1414), la fiche disant « nom / adjectif en -no / adverbe » et l'emploi adverbial passant
  par に, comme 先 (lot 10) ; un sens (D1415), « En même temps », non développée, signalée en nuance
  (D1416) ; type `etat`, être ensemble étant une condition.

### B. Identité, diversité, alternative et probabilité (4)

| Entrée | Décision | Catégorie | Type |
|---|---|---|---|
| 同じ | **Même** \| Identique \| Pareil | aucune | propriete |
| いろいろ | **Divers** \| Varié \| Différents \| Plusieurs sortes de | aucune | propriete |
| 他 | **Autre** \| Le reste | aucune | concept_abstrait |
| たぶん | **Peut-être** \| Probablement \| Vraisemblablement ; dimension `probabilite` | aucune | aucun |

- **同じ** : lecture corrigée en おなじ (D1417) : la fiche donne « お同じ » en `reading`, mais おな
  sur 同 en furigana, `onaji` en romaji, おなじ dans l'exemple ; **classe `adjectif_na`** (D1418), la
  classe que la fiche nomme d'abord, l'emploi sans な devant un nom (同じクラス, l'exemple) étant dit
  en nuance ; `determinant` est l'alternative (§5, choix 7).
- **いろいろ** (D1422) : la diversité n'est pas une quantité ; aucune catégorie de nombres n'est
  cherchée (D1423).
- **他** (D1425) : « En plus » et « En dehors de » sont les traductions de ほかに, reprises en nuance
  avec に (D1426), comme « Au début » pour 初めに (D1347) ; « Le reste » rejoint le type de « Le
  reste », sens 3 de 後. L'exemple altéré n'est pas repris (D1429).
- **たぶん** : **dimension `probabilite`** (D1431), selon la doctrine du lot 16, comme `possibilite`
  pour 出来る ; **sans type** (D1433, A6) : たぶん qualifie la probabilité de ce qui est dit, et
  `concept_abstrait` ne sert pas de type de secours (D1403) ; sans catégorie (D1432).

## 5. Choix à arbitrer

| N° | Choix proposé | Alternative |
|---|---|---|
| 1 | ゆっくり : un seul sens, `vitesse`, `propriete` | deux sens (vitesse ; sans hâte, détente) ; sans catégorie |
| 2 | ゆっくり : « Prendre son temps » en nuance, non en traduction | la garder en autre traduction |
| 3 | ゆっくり : la mention « gitaigo » gardée en nuance | l'écarter, comme une remarque sur le mot |
| 4 | ゆっくりと : « D'une manière posée » gardée dans la nuance de l'emploi avec と | l'abandonner sans la garder |
| 5 | まっすぐ : deux sens (direction ; caractère), le second sans catégorie | un seul sens, « Honnête » en nuance |
| 6 | まっすぐ, sens 1 : `direction_orientation › orientation` | `parcours_trajectoire` |
| 7 | 同じ : classe `adjectif_na`, l'emploi sans な en nuance | `determinant`, comme 大きな et 小さな |
| 8 | 同じ : lecture おなじ, furigana de la fiche | — |
| 9 | 同じ, いろいろ, 他 : sans catégorie (A5) | une catégorie à nommer |
| 10 | 一緒 : classe `nom` | `adverbe`, l'ancien type |
| 11 | 一緒 : `relations sociales › interactions sociales`, type `etat` | sans catégorie ; un autre type |
| 12 | 一緒 : « En même temps » signalée en nuance, non en sens | un second sens |
| 13 | 他 : un sens (« Autre », « Le reste ») ; « En plus », « En dehors de » en nuance, pour ほかに | deux sens (l'autre ; l'ajout) |
| 14 | たぶん : dimension `probabilite` | aucune dimension |
| 15 | たぶん : sans type (A6) | `concept_abstrait` |
| 16 | 同じ, いろいろ : `propriete` ; 他 : `concept_abstrait` | — |

## 6. Ce qui est signalé sans être proposé

- **一緒 et sa particule** : に, de la fiche, est reprise mécaniquement pour le sens unique ; ici elle
  est bien régie (一緒に), à la différence de すぐに (lot 21).
- **Exemple altéré, pour le registre de phrases** : 他 (« なに か ります か »).
- **Classes multiples dites par les fiches** : いろいろ (« ou adverbe / adjectif nominal »), まっすぐ
  (« et adjectif en na »), 同じ (« ou nom »), 一緒 (« nom / adjectif en -no / adverbe ») ; le schéma
  ne porte qu'une classe (point ouvert depuis le lot 16).
- **Morphologie (étape 3)** : 同じ, s'il reste `adjectif_na`, ne prend pas な devant un nom ; la forme
  en -ku de 弱い (弱く) est désormais à produire par la morphologie.
- **Après ce lot**, le point d'arrêt normatif sur les fonctions A2-LING (rapport de périmètre, §4) :
  rien n'est préparé pour le lot 23.

## 7. Cohérence avec les lots validés

- **Fusions** : règle du plus petit numéro (A3, L2) ; fusion d'une forme sans identité lexicale
  propre (掃除する, lot 03 ; 出ます, lot 04) ; survivant validé non rouvert, à la différence de
  暖かい (lot 17), où c'est l'entrée retirée qui était validée.
- **Vitesse** : 速い et 遅い (lot 17), pour ゆっくり.
- **Classe `nom` d'un mot rangé en adverbe** : 先 (lot 10), pour 一緒.
- **Lectures corrigées sur la fiche** : もう一度 (D1383) pour 一緒 ; スポーツ (5.13-C) pour 同じ.
- **Traductions d'une construction en nuance** : 初めに (D1347) pour ほかに.
- **Dimension sans fonction** : 出来る, `possibilite` (lot 20), pour たぶん.
- **Pas de type de secours** : また, sens 2 (D1403), pour たぶん.
- **Confusion de la source écartée et journalisée** : 取る et 引く (lot 18), pour まっすぐ.
- **Aucune décision validée n'est modifiée** ; 弱い n'est pas touchée.

## Suite prévue à la livraison

1. Relecture et arbitrage des 16 choix du §5, par ChatGPT, sur délégation de l'utilisateur.
2. Révision éventuelle, à sa place, sous les mêmes identifiants.
3. Validation atomique, puis commit, puis push, chacun sur un accord explicite et distinct.
4. Le lot 23 n'est pas préparé : le point d'arrêt normatif sera traité d'abord.

## 9. Arbitrage des 16 choix et révision du 2026-10-06

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle ») : la
proposition est **retenue dans son ensemble**, avec trois corrections. Tous les autres choix du §5
sont approuvés, notamment les deux fusions (D1412, D1408, D1407), まっすぐ à deux sens et
« Français » abandonné, la lecture おなじ, 一緒 en `nom` dans `interactions sociales` en `etat`, 他 à
un sens, たぶん avec `probabilite` sans catégorie ni type, aucune fonction et aucune relation.

| Point | Arbitrage | Révision |
|---|---|---|
| ゆっくり (choix 1 et 2) | **deux sens** : la fiche distingue le déplacement à faible vitesse et le fait d'agir sans se presser ; « Prendre son temps » en nuance du sens 2 ; « gitaigo » en nuance générale | sens 1 **Lentement** (`vitesse`, `propriete`) ; sens 2 **Tranquillement** \| À son aise (sans catégorie, `propriete`) ; **D1404 et D1405 réécrites à leur place** ; **D1435 ajoutée à la fin** (`categorie-nulle`, « sens 2 · category »), citée par ゆっくり |
| まっすぐ, sens 1 (choix 6) | `espace_proprietes_spatiales › parcours_trajectoire` : un déplacement sans déviation ni virage, et l'exemple enseigne « aller tout droit » | catégorie remplacée ; **D1409 réécrite à sa place** ; le sens 2 reste sans catégorie |
| 同じ (choix 7) | **`determinant`** : la fiche mentionne l'analyse adnominale, et l'exemple montre 同じ + nom sans な ; la description de la fiche gardée en nuance | classe `determinant`, groupe `null` ; nuance complétée (« adjectif en na », adnominal ou nom) ; **D1418 réécrite à sa place** |

**Vérifié après la révision** :
- les 9 entrées et les 32 décisions du lot sont toutes `proposed` ;
- les 1 403 décisions validées sont identiques à l'octet ;
- dans le journal, quatre décisions réécrites à leur place (D1404, D1405, D1409, D1418), une ajoutée
  à la fin (D1435) ; identifiants, entrées, lots, natures, champs, statuts et dates des 31 décisions
  d'avant inchangés ;
- dans le lot, les changements arbitrés et eux seuls : les sens et les nuances de ゆっくり et sa
  citation de D1435 ; la catégorie du sens 1 de まっすぐ ; la classe, le groupe et la nuance de 同じ ;
- **état réel inchangé** : 650 ENTRY, 32 retraits, 37 écartées (28 non décidées, 9 propositions),
  0 problème, 0 erreur, 0 attente ;
- **essai à blanc** : 657 ENTRY, 34 retraits, 28 écartées, 0 problème, 0 erreur, 0 attente, **147
  avertissements** : 6 catégories nulles (ゆっくり, sens 2, en plus) et 1 type nul, tous justifiés ;
- **474 tests verts** ; test d'état du lot renforcé sur chaque point révisé ;
- **47 sabotages attrapés** : les 36 de la livraison, rejoués, et 11 sur la révision (ゆっくり remise
  à un sens, ou son sens 2 catégorisé ; D1435 non citée ou supprimée ; « Prendre son temps » remise
  en traduction, ou retirée de la nuance ; まっすぐ remise en `orientation` ; 同じ remise en
  `adjectif_na`, ou la description de la fiche retirée de sa nuance ; D1418 et D1404 remises à leur
  état d'avant), chacun vérifié comme modifiant réellement son fichier, puis rétabli à l'octet près ;
- `check-layers` sans violation ; `validate-data` : 0 erreur ; sources conformes au manifeste.

**Vérification ciblée de la révision : terminée et favorable** (ChatGPT, 2026-10-06), sur
l'ancienne et la nouvelle proposition : ゆっくり à deux sens ; D1435 en fin de journal ; まっすぐ,
sens 1, en `parcours_trajectoire` ; 同じ en `determinant`, groupe `null`, la description de la fiche
en nuance ; les autres choix approuvés inchangés. Aucune correction lexicale supplémentaire.
**Prochaine étape : la validation atomique, sur autorisation explicite** ; ni validation, ni
commit, ni push ne sont autorisés à ce stade.

**Décomptes révisés** : 9 sens ; 32 décisions (2 `fusion`, 7 `decision` de sens, 5 `abandon` de
sens, 6 `categorie-nulle`, 1 `type-nul`, 1 dimension, 4 décisions de fonction, 2 `correction` de
lecture, 2 décisions de classe, 1 `decision` et 1 `abandon` de nuance).

## 10. Diff complet de la révision

Différence entre la proposition relue et la version révisée, pour `lot-22.json` et `journal.json`.

```diff
diff  lot-22.json (avant révision → après)
--- a/reconstruction/a2-04/lots/lot-22.json
+++ b/reconstruction/a2-04/lots/lot-22.json
@@ -9,5 +9,6 @@
         "A2-04-D1405",
         "A2-04-D1406",
-        "A2-04-D1407"
+        "A2-04-D1407",
+        "A2-04-D1435"
       ],
       "fields": {
@@ -16,5 +17,5 @@
         "suffix": false,
         "counter": null,
-        "nuance": "Une faible vitesse, ou le fait d'agir sans se presser, de se détendre et de prendre son temps : ゆっくりあるいてください (marchez lentement, s'il vous plaît). Mot mimétique (gitaigo). Suivi de と, ゆっくりと met l'accent sur la lenteur ou la délibération, dans un style un peu plus formel ou littéraire : かれはゆっくりとはなしました (il a parlé lentement, d'une manière posée).",
+        "nuance": "Mot mimétique (gitaigo). Suivi de と, ゆっくりと met l'accent sur la lenteur ou la délibération, dans un style un peu plus formel ou littéraire : かれはゆっくりとはなしました (il a parlé lentement, d'une manière posée).",
         "tags": [],
         "senses": [
@@ -22,8 +23,5 @@
             "meaning": {
               "primary": "Lentement",
-              "alternatives": [
-                "Tranquillement",
-                "À son aise"
-              ]
+              "alternatives": []
             },
             "category": {
@@ -37,5 +35,25 @@
               "grammatical": [],
               "pragmatic_discourse": []
-            }
+            },
+            "particles": [],
+            "nuance": "Un déplacement à faible vitesse : ゆっくりあるいてください (marchez lentement, s'il vous plaît)."
+          },
+          {
+            "meaning": {
+              "primary": "Tranquillement",
+              "alternatives": [
+                "À son aise"
+              ]
+            },
+            "category": null,
+            "semantic_type": "propriete",
+            "dimensions": [],
+            "relations": [],
+            "linguistic_functions": {
+              "grammatical": [],
+              "pragmatic_discourse": []
+            },
+            "particles": [],
+            "nuance": "Agir sans se presser, se détendre, prendre son temps."
           }
         ]
@@ -75,6 +93,5 @@
             "category": {
               "level_1": "espace_proprietes_spatiales",
-              "level_2": "direction_orientation",
-              "level_3": "orientation"
+              "level_2": "parcours_trajectoire"
             },
             "semantic_type": "propriete",
@@ -179,5 +196,5 @@
         "suffix": false,
         "counter": null,
-        "nuance": "L'identité ou la similitude entre deux ou plusieurs choses : 私たちは同じクラスです (nous sommes dans la même classe). Devant un nom, il s'emploie directement, sans な, comme dans cet exemple.",
+        "nuance": "L'identité ou la similitude entre deux ou plusieurs choses : 私たちは同じクラスです (nous sommes dans la même classe). Devant un nom, il s'emploie directement, sans な, comme dans cet exemple. La fiche le décrit aussi comme « adjectif en na », souvent considéré comme un adjectif adnominal ou un nom.",
         "tags": [],
         "senses": [
@@ -209,6 +226,6 @@
           }
         ],
-        "grammatical_class": "adjectif_na",
-        "group": "na"
+        "grammatical_class": "determinant",
+        "group": null
       }
     },
diff  journal.json (avant révision → après)
--- a/reconstruction/a2-04/journal.json
+++ b/reconstruction/a2-04/journal.json
@@ -19765,4 +19765,7 @@
     ],
-    "after": "un seul sens",
-    "reason": "Un seul sens : la fiche décrit « un déplacement à faible vitesse, ou le fait d'agir sans se presser, de se détendre et de prendre son temps », une même manière d'agir, sans hâte ; son exemple porte sur la marche (marchez lentement). Catégorie espace et propriétés spatiales › vitesse, et type propriete, comme « Lent » (遅い) et « Rapide » (速い), lot 17 : une caractéristique attribuée à la façon dont l'action se fait. La fiche ne donne aucune particule."
+    "after": [
+      "S1 Lentement",
+      "S2 Tranquillement, à son aise"
+    ],
+    "reason": "Deux sens (arbitrage des choix du lot 22), la fiche distinguant explicitement « un déplacement à faible vitesse » et « le fait d'agir sans se presser, de se détendre et de prendre son temps » ; ses exemples documentent ces deux emplois. Sens 1 « Lentement » : espace et propriétés spatiales › vitesse, type propriete, comme « Lent » (遅い) et « Rapide » (速い), lot 17. Sens 2 « Tranquillement, à son aise » : sans catégorie (D1435), type propriete, une caractéristique de la manière d'agir. « Prendre son temps » est dit en nuance du sens 2 (D1405) ; la mention « gitaigo » reste en nuance générale (D1407). La fiche ne donne aucune particule : aucune pour les deux sens."
   },
@@ -19780,3 +19783,3 @@
     "after": null,
-    "reason": "Une locution verbale, non une traduction équivalente de l'adverbe : elle est reprise dans la nuance, avec la description de la fiche (« agir sans se presser, se détendre et prendre son temps »)."
+    "reason": "Une locution verbale, non une traduction équivalente de l'adverbe : elle est reprise dans la nuance du sens 2 (« agir sans se presser, se détendre, prendre son temps »), qui décrit cet emploi (arbitrage des choix du lot 22)."
   },
@@ -19838,3 +19841,3 @@
     ],
-    "reason": "Deux sens, sur la fiche, qui décrit deux référents : « une direction sans déviation ni virage (tout droit) », ce que l'exemple illustre, et « un comportement droit et intègre » (honnête). Une direction et un caractère ne sont pas deux traductions d'une même chose (principe des deux référents, lot 17). Sens 1 : espace et propriétés spatiales › direction et orientation › orientation, type propriete, une caractéristique du déplacement. Sens 2 : sans catégorie (D1411), type propriete, un trait de la personne. La fiche ne donne aucune particule : aucune pour les deux sens. Elle dit aussi « adverbe (et adjectif en na) » : la classe mécanique, adverbe, reste ; le schéma ne porte qu'une classe."
+    "reason": "Deux sens, sur la fiche, qui décrit deux référents : « une direction sans déviation ni virage (tout droit) », ce que l'exemple illustre, et « un comportement droit et intègre » (honnête). Une direction et un caractère ne sont pas deux traductions d'une même chose (principe des deux référents, lot 17). Sens 1 : espace et propriétés spatiales › parcours et trajectoire (arbitrage des choix du lot 22) : la fiche décrit une direction, un déplacement sans déviation ni virage, et son exemple enseigne « aller tout droit » ; type propriete, une caractéristique du déplacement. Sens 2 : sans catégorie (D1411), type propriete, un trait de la personne. La fiche ne donne aucune particule : aucune pour les deux sens. Elle dit aussi « adverbe (et adjectif en na) » : la classe mécanique, adverbe, reste ; le schéma ne porte qu'une classe."
   },
@@ -19953,4 +19956,4 @@
     "before": "adjectif en na (ancien type)",
-    "after": "adjectif_na",
-    "reason": "Classe adjectif_na, groupe na : c'est la classe que la fiche nomme d'abord (« Adjectif en na »). La fiche ajoute qu'il est « souvent considéré grammaticalement comme un adjectif adnominal ou un nom », et son exemple (同じクラス) l'emploie devant un nom sans な : cet emploi est dit en nuance. Le schéma ne porte qu'une classe par ENTRY ; determinant, retenu pour 大きな et 小さな dont la fiche ne donne que l'emploi adnominal, est l'autre classe possible, et le choix est soumis à l'arbitrage. La morphologie (étape 3) devra tenir compte de l'absence de な devant un nom."
+    "after": "determinant",
+    "reason": "Classe determinant, groupe null (arbitrage des choix du lot 22) : la fiche mentionne aussi l'analyse adnominale (« souvent considéré grammaticalement comme un adjectif adnominal ou un nom »), et son exemple montre 同じ suivi d'un nom, sans な (同じクラス). Pour Ocha, determinant évite de suggérer à un débutant une morphologie en な que les pièces fournies n'attestent pas ; comme 大きな et 小さな (lot 15). La description de la fiche (« adjectif en na », adnominal ou nom) est conservée en nuance. Le schéma ne porte qu'une classe par ENTRY."
   },
@@ -20173,2 +20176,14 @@
     "reason": "Aucune fonction linguistique : modalite n'a pas de définition normative (arbitrage du périmètre du lot 22) ; la probabilité est dite par la dimension, non par une fonction. Aucune fonction qui n'a pas de définition normative n'est posée dans ce lot (doctrine du lot 20, reconduite par l'arbitrage du périmètre du lot 22) ; aucune définition, aucun addendum n'est créé."
+  },
+  {
+    "id": "A2-04-D1435",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-22",
+    "entry": "n5_v_504",
+    "field": "sens 2 · category",
+    "kind": "categorie-nulle",
+    "before": null,
+    "after": null,
+    "reason": "« Tranquillement, à son aise » : agir sans se presser, se détendre, prendre son temps ; une manière d'agir, non une vitesse de déplacement : aucune catégorie du registre ne la nomme (arbitrage des choix du lot 22). Addendum A5."
   }
```
