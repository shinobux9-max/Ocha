# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 24 « Quantité, degré et comparaison » · périmètre

**Date** : 2026-10-06
**Nature** : **proposition de périmètre**, à arbitrer. **Aucune décision lexicale** : aucun fichier de
lot (pas de `lot-24.json`), aucune décision de journal, aucune ENTRY modifiée, aucun statut
`proposed`. Les fonctions d'A9 sont **signalées comme potentielles**, jamais attribuées. Rien n'est
validé, committé ni poussé.
**Cadre normatif** : addendum A9 (`docs/conception/addendum-A9-fonctions-linguistiques.md`),
appliqué au lot 23 pour `connecteur`, `discours`, `politesse` et `intensifieur` ; ce lot serait le
premier à appliquer `quantificateur` et `comparatif`.

**État réel vérifié avant ce rapport** : `ocha-v2` = `origin/ocha-v2` = `2c89eb0` (lot 23 validé,
committé et poussé) ; assemblage réel : 670 ENTRY, 34 retraits, **15 entrées écartées, toutes non
décidées**, 0 problème, 0 erreur, 0 attente ; 1 509 décisions validées, aucune proposition en
cours ; 476 tests verts.

---

## 1. Méthode

1. **Les entrées restantes** sont relevées par script : 15, toutes dans `vocab.json`. **など
   (`n5_v_602`) est exclue d'office** : son préalable spécifique de classe reste séparé (arbitrage
   du préalable, Q10 ; arbitrage du périmètre du lot 23).
2. **Les 14 autres** sont les entrées reportées au lot 23, regroupées par le rôle que leurs fiches
   mettent au premier plan.
3. **Chaque fiche est lue en entier** : traductions, nuance, exemple, particules ; les anciens
   exemples de contexte sont consultés comme contexte, jamais comme source de décision.
4. **Les fonctions d'A9** sont indiquées comme **potentielles** ; leur attribution, sens par sens,
   relève de la proposition (A9, §2.1).
5. **Identifiants contrôlés par script** : distincts, présents dans la source, non décidés.

## 2. Périmètre proposé : 14 entrées

Les fiches sources complètes sont dans `07-lot-courant-sources.md` (partie 1).

### A. Quantité (7)

| Identifiant | Mot | Traduction de la fiche | Classe (état mécanique) |
|---|---|---|---|
| `n5_v_654` | 多い | Nombreux ; beaucoup de, abondant | à décider (ancien type « adjectif ») |
| `n5_v_447` | 少ない | Peu nombreux ; raréfié, en petite quantité, peu de | `adjectif_i` (mécanique) |
| `n5_v_655` | 大勢 | Beaucoup de monde ; une foule, un grand nombre de personnes | `nom` (mécanique) |
| `n5_v_520` | たくさん | Beaucoup ; en grande quantité, nombreux, suffisamment | à décider (exception consignée) |
| `n5_v_639` | 全部 | Tout ; l'ensemble, la totalité | à décider (exception consignée) |
| `n5_v_509` | 少し | Un peu ; une petite quantité, un court instant | `adverbe` (mécanique) |
| `n5_v_497` | ちょっと | Un peu ; un instant, un peu de, euh… (hésitation) | `adverbe` (mécanique) |

### B. Degré (3)

| Identifiant | Mot | Traduction de la fiche | Classe (état mécanique) |
|---|---|---|---|
| `n5_v_498` | とても | Très ; extrêmement, vraiment | `adverbe` (mécanique) |
| `n5_v_515` | あまり | Pas tellement ; pas beaucoup, guère (toujours suivi d'une négation) | `adverbe` (mécanique) |
| `n5_v_471` | 結構 | Assez ; pas mal, suffisamment, non merci (pour refuser poliment) | `adverbe` (mécanique) |

### C. Comparaison (2)

| Identifiant | Mot | Traduction de la fiche | Classe (état mécanique) |
|---|---|---|---|
| `n5_v_607` | もっと | Plus ; davantage, encore plus | `adverbe` (mécanique) |
| `n5_v_517` | 一番 | Le plus ; le meilleur, numéro un, premier | à décider (exception consignée) |

### D. Mesure et approximation (2)

| Identifiant | Mot | Traduction de la fiche | Classe (état mécanique) |
|---|---|---|---|
| `n5_v_496` | ちょうど | Exactement ; juste, précisément | `adverbe` (mécanique) |
| `n5_v_546` | 大体 | En général ; à peu près, généralement, presque | `adverbe` (mécanique) |

**Total** : 7 + 3 + 2 + 2 = **14 entrées** ; quatre classes à décider (多い, たくさん, 全部, 一番) ;
aucune lecture à décider hors du mécanique, aucun tag de lieu candidat ; particules dans deux fiches
(多い : が ; 大勢 : の).

## 3. Pourquoi ce thème, et faut-il scinder ?

**Le thème** : des mots dont le sens est une **quantité**, un **degré**, une **comparaison** ou une
**mesure**. Ils partagent les frontières d'A9 entre `quantificateur`, `intensifieur` et
`comparatif` (§3.4 à §3.6), et la frontière entre fonction et catégorie `nombres_quantification`
(A9, §4.1). Plusieurs entrées les traversent toutes : 少し et ちょっと (quantité et degré), もっと
(degré et comparaison), 結構 (degré et formule sociale).

**Pourquoi un seul lot** : ces frontières se tranchent ensemble ; scinder en « quantité » et
« degré » ferait arbitrer deux fois les mêmes cas (少し, ちょっと, もっと). **Taille** : 14 entrées,
dans la fourchette des lots récents (9 à 26).

**Ce que le lot laisse** : など seule, réservée à son préalable de classe. Après ce lot, **aucune
entrée ne resterait à décider** hors de など.

## 4. Entrées restantes : incluses, reportées, hors périmètre

| Statut | Entrées |
|---|---|
| **Incluses (14)** | les quatre groupes du §2 |
| **Reportées** | aucune |
| **Hors périmètre (1)** | **など** `n5_v_602` : préalable spécifique de classe (« particule suffixe » selon sa fiche, classe absente du registre), séparé |

**Total** : 14 + 1 = **15**, l'ensemble des entrées restantes.

## 5. Fonctions A9 potentiellement concernées, entrée par entrée

**Rien n'est attribué ici.** Pour chaque entrée : ce que la fiche atteste, et les fonctions qu'A9
pourrait viser, avec la frontière en jeu.

| Entrée | Ce que la fiche atteste | Fonctions potentielles | Frontière ou question |
|---|---|---|---|
| **多い** | « adjectif en -i qualifiant une grande quantité » ; ほんがおおい ; particule が | aucune (A9, §3.4 : un mot qui **prédique** la quantité n'est pas quantificateur) | la quantité dite par la catégorie (`nombres_quantification › quantite › grande_quantite`), comme 大きい l'est par `dimensions › taille` |
| **少ない** | « quantité restreinte ou nombre faible » ; « antonyme de ooi » | aucune (même frontière) | `petite_quantite` ; relation `opposed_to` avec 多い, candidate à 5.16 |
| **大勢** | « nom / adverbe », « utilisé exclusivement pour désigner une grande foule ou un nombre élevé de personnes » ; おおぜいのひと ; particule の | `quantificateur` ? | **cas limite** : la fiche dit « désigner » (A9 §3.4 : un mot qui désigne une quantité n'est pas quantificateur), mais l'exemple quantifie 人 avec の |
| **たくさん** | « quantité abondante d'objets ou de personnes », « accomplissement d'une action en grand nombre » ; りんごをたくさんかいました | `quantificateur` | « suffisamment » et l'emploi en nom ou adjectif en な, que la fiche signale sans les développer |
| **全部** | « l'intégralité d'une quantité ou d'un groupe » ; « placé près du verbe, ou suivi de の » ; りんごをぜんぶたべました | `quantificateur` | concept : `totalite_partie › totalite` ; classe à décider (« nom / adverbe ») |
| **少し** | « une faible quantité, un petit degré ou une courte durée » ; みずをすこしください | `quantificateur` (quantité) ; `intensifieur` (degré) | **découpage** : un, deux ou trois sens (quantité, degré, durée) ; la durée n'est ni quantificateur ni intensifieur |
| **ちょっと** | « une faible quantité ou un bref instant », « formule atténuante pour exprimer une hésitation ou un refus poli » ; コーヒーをちょっとのみます | `quantificateur` ; `intensifieur` (atténuation) ; `politesse` (refus poli) ? | **découpage** ; l'hésitation (« euh… ») est un marqueur que A9 laisse en nuance (§3.2, frontière 2) ; le refus poli : formule sociale (P1) ou atténuation (I1) |
| **とても** | « adverbe d'intensité… pour accentuer un degré élevé » ; « avec la négation : impossible / pas du tout » | `intensifieur` | comme 大変 « très » (lot 00) ; l'emploi avec négation, un sens ou une nuance |
| **あまり** | « adverbe d'atténuation… systématiquement avec une structure… négative » | `intensifieur` (atténuation, A9 §3.6) | la négation est portée par le verbe (précédents D1387, D1390 ; A9 §3.6, frontière 3) : la contrainte en nuance ; **exemple fautif** (ににく pour にく) |
| **結構** | « une quantité ou un degré tout à fait satisfaisant », ou « formule de politesse pour décliner une offre » ; けっこうおもしろい | `intensifieur` (degré) ; `politesse` (décliner une offre, A9 §3.3) | **découpage** : la fiche traduit le refus à part (« non merci ») ; « et adjectif en na » |
| **もっと** | « intensification ou augmentation… par rapport au niveau actuel » ; もっとにほんごをべんきょうしたい | `comparatif` (A9, §3.5 : le niveau actuel comme référence) ; `intensifieur` ? | **cumul** (A9 §2.3, §3.6 frontière 2) : seulement si les deux rôles sont intégraux au même emploi |
| **一番** | « superlatif absolu (le plus… de tous) » ou « la première position » ; にほんごのなかでなにがいちばんすき | `comparatif` (superlatif) | « numéro un, premier » : un **classement**, non une comparaison (A9, §3.5, frontière 3) : un second sens, ordinal (`nombres › ordinaux` ou `ordre_numerique`), sans fonction ? |
| **ちょうど** | une mesure, une heure, une quantité ou une coïncidence « correspond parfaitement, sans excès ni manque » | aucune | dimension d'A2-DIM : `exactitude_inexactitude` ou `precision_imprecision_ambiguite` (règle du lot 16) |
| **大体** | « une approximation ou une règle générale » ; « très proche de taitei », « grosso modo / à peu près » | aucune | **découpage** : « à peu près » (`approximation_quantitative`, dimension de précision ?) et « en général » (`temps › frequence`, comme たいてい, lot 21) |

**Rappels d'A9 pour tout le lot** : la catégorie garde le **concept** (quantité, totalité,
approximation), la fonction dit le **rôle** (§3.4, §4.1) ; une fonction ne décide pas du type
(§4.2) ; ni `negation` ni `modalite` ne sont définies (§6).

## 6. Dépendances, ambiguïtés et risques

### 6.1. Identité et fusions

**Aucun risque de fusion.** 少し et ちょっと sont deux mots (la fiche de 少し le dit « très proche
d'usage » de ちょっと, « perçu comme un peu plus neutre ou écrit ») ; 多い, たくさん et 大勢 sont
trois mots ; 大体 et たいてい (validée au lot 21) aussi. Relations candidates à 5.16 : 多い / 少ない
(`opposed_to`, la fiche disant « antonyme ») ; 少し / ちょっと ; 多い / たくさん / 大勢.

### 6.2. Classes

- **多い** : ancien type « adjectif » sans classe par défaut ; la fiche dit « adjectif en -i ».
- **たくさん** : « adverbe (ou nom / adjectif en na dans certaines tournures) ».
- **全部** : « nom / adverbe » ; « suivi de の lorsqu'il qualifie un nom ».
- **一番** : « adverbe (composé de ichi et ban, suffixe de classement) ».
- **大勢** (`nom` mécanique) : sa fiche dit « nom / adverbe ».
- **結構** (`adverbe` mécanique) : « adverbe (et adjectif en na) ».

A9, §2.2 : la classe ne décide pas de la fonction, ni l'inverse. Le schéma ne porte qu'une classe
par ENTRY (point ouvert « adjectif en na (et nom) »).

### 6.3. Catégories : première application de `nombres_quantification` au quantitatif courant

Aucune entrée validée n'emploie encore `quantite › grande_quantite`, `petite_quantite`,
`totalite_partie › totalite` ni `approximation_quantitative`. Les précédents les plus proches :
半 et 半分 (`proportions › fraction`), 一人 et 二人 (`comptage_compteurs › personnes`), 後, sens 3
« le reste » (`totalite_partie › reste`). Le degré et la comparaison n'ont **aucune catégorie** au
registre (A9, §4.1) : sans catégorie, justifiée par la fonction.

### 6.4. Cohérence avec les lots validés

- **大変 « Très »** (`intensifieur`, lot 00) : とても devrait être traitée de même.
- **大きい, 小さい, 長い, 短い** (prédicats de dimension, sans fonction) : 多い et 少ない, prédicats de
  quantité, s'y alignent sous A9 (§3.4).
- **いろいろ** (lot 22, sans `quantificateur`, D1424) : la diversité n'est pas une quantité ; non
  concernée.
- **たいてい** (`temps › frequence › frequent`, lot 21) : le sens « en général » de 大体.
- **違う**, sens 2 (`exactitude_inexactitude`, lot 20) : l'axe possible pour ちょうど.

### 6.5. Anomalies de source

- **あまり** : l'exemple écrit « ににく » pour « にく » (la viande) ; à journaliser, sans correction
  inventée.
- **大勢** : « utilisé exclusivement pour… des personnes », alors que son exemple est bien sur des
  personnes ; pas d'anomalie, une restriction à garder en nuance.

## 7. Ce qui est à arbitrer

1. **Le thème et le périmètre** : « Quantité, degré et comparaison », **14 entrées**, など hors
   périmètre ; ou une scission (quantité 7 ; degré, comparaison et mesure 7).
2. **Si l'arbitrage veut les fixer dès le périmètre** :
   - 多い et 少ない : prédicats sans `quantificateur` (A9, §3.4), la quantité étant dite par la
     catégorie ;
   - 大勢 : `quantificateur` ou non (désigne ou quantifie ?) ;
   - le découpage de 少し, ちょっと, 結構, 大体, 一番 (et l'emploi de とても avec négation) ;
   - もっと : `comparatif` seul, ou cumul avec `intensifieur` ;
   - le refus poli de ちょっと : en nuance, ou `politesse`.

**Laissés à la proposition** : les classes, le découpage des sens, les traductions, les fonctions
(sens par sens, A9), les catégories, les types et les dimensions.

## 8. Où trouver les pièces dans l'export de relecture

| Fichier | Contenu |
|---|---|
| `06-lot-courant-rapports.md` | ce rapport |
| `07-lot-courant-sources.md` | partie 1 : **les 14 fiches sources complètes**, avec le pré-remplissage mécanique et les anciens exemples de contexte ; partie 2 : les précédents validés cités (大変, 大きい, 小さい, 半分, 後, たいてい, 違う, いろいろ, まだ, もう) |
| `08-lot-courant.json` | aucun fichier de lot : la liste des 14 identifiants candidats |
| `09-journal-lot-courant.json` | vide : aucune décision |
| `04-addenda.md` | A5, A6, A7, **A9** |
| `10-diff-et-controles.md` | le diff contre `2c89eb0` et les contrôles |

## 9. Arbitrage du périmètre (2026-10-06)

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle »). Les
décisions retenues :

1. **Périmètre approuvé** : un seul lot de **14 entrées**, « Quantité, degré et comparaison » ; pas
   de scission 7 + 7. **など** reste hors périmètre, réservée à son préalable spécifique de classe.
2. **多い, 少ない** : prédicats de quantité, sans `quantificateur`.
3. **大勢** : sans `quantificateur`, la fiche disant qu'il désigne une foule, un nombre élevé de
   personnes.
4. **少し** : trois sens : quantité (`quantificateur`), degré (`intensifieur`), durée (aucune de ces
   fonctions).
5. **ちょっと** : deux sens : quantité (`quantificateur`) et bref instant ; l'hésitation et le refus
   poli restent en nuance, sans `politesse`.
6. **結構** : deux sens : degré (`intensifieur`) et « Non merci » (`politesse`).
7. **大体** : deux sens : approximation et « En général ».
8. **一番** : deux sens : superlatif (`comparatif`) et classement, ordinal, sans `comparatif`.
9. **とても** : un sens, `intensifieur` ; l'emploi négatif en nuance.
10. **もっと** : cumul `comparatif` + `intensifieur` sur le même sens.
11. **たくさん**, **全部** : un sens chacun, `quantificateur`.
12. **あまり** : un sens, `intensifieur` ; la construction négative en nuance ; « ににく » journalisé,
    sans correction inventée.
13. **ちょうど** : aucune fonction d'A9 ; `exactitude_inexactitude` si une dimension est retenue.

**Ce qu'il autorise** : la proposition lexicale complète, tout en `proposed`. **Ce qu'il n'autorise
pas** : ni validation, ni commit, ni push.

**Suite donnée** : proposition lexicale en `proposed`, décisions D1510 à D1567 (rapport
`docs/rapports/etape2-A2-04-lot24-proposition.md`).
