# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 24 « Quantité, degré et comparaison » · proposition

**Date** : 2026-10-06
**Nature** : livraison pour relecture, en `proposed` : les 14 entrées du lot et ses 58 décisions de
journal (D1510 à D1567, puis D1568 à la révision). **Validé le 2026-10-06**, statuts seulement
(rapport `docs/rapports/etape2-A2-04-lot24-valide.md`) ; committé (`affa45e`) et poussé.

**Version** : révisée le 2026-10-06 après l'arbitrage des 14 choix (§9). Les §1 à §8 restent la
proposition telle qu'elle a été relue ; le §9 dit ce qui a changé (et corrige le §8 sur les
sabotages), le §10 en donne le diff complet.

**À lire avec** : `reconstruction/a2-04/rapports/lot-24.md` (rapport généré, entrée par entrée),
`docs/rapports/etape2-A2-04-lot24-perimetre.md` (périmètre et arbitrage, §9) et l'addendum A9,
appliqué ici pour la première fois à `quantificateur` et `comparatif`.

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Aucun sens,
aucune lecture, aucune graphie, aucune particule, aucune relation n'est ajouté par connaissance
externe. Les fonctions sont posées **sens par sens**, selon l'arbitrage du périmètre et A9.

---

## 1. Ce qui est livré

| Pièce | Contenu |
|---|---|
| `reconstruction/a2-04/lots/lot-24.json` | 14 entrées gardées, aucune fusion, **20 sens**, toutes `proposed` |
| `reconstruction/a2-04/journal.json` | **58 décisions ajoutées à la fin**, D1510 à D1567, toutes `proposed` ; les 1 509 décisions validées sont identiques à l'octet |
| `reconstruction/a2-04/rapports/lot-24.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | tests d'état adaptés (lot 24 proposé, 15 écartées dont 14 propositions, 25 fichiers de lot, journal de 1 567 décisions ; 大勢 décidée au seul lot 24) ; **2 tests ajoutés** (lot 24 proposé ; essai à blanc) |

**Décisions, par nature** : 41 `decision` (4 classes, 14 découpages de sens, 20 décisions de
fonction, une par sens, 1 dimension, 2 relations reportées), 11 `type-nul`, 1 `categorie-nulle`
(ちょうど), 5 `abandon` (4 traductions, 1 exemple fautif).

## 2. L'arbitrage du périmètre, tel qu'il est appliqué

| Arbitrage | Application |
|---|---|
| 14 entrées, un seul lot ; など hors périmètre | `lot-24.json` contient exactement les 14 ; un test le contrôle, et un sabotage qui ajoute など est attrapé |
| 多い, 少ない : prédicats, sans `quantificateur` | un sens chacun, `grande_quantite` / `petite_quantite`, type `propriete`, aucune fonction (D1512, D1516) |
| 大勢 : sans `quantificateur` | un sens, `grande_quantite`, aucune fonction (D1518) |
| 少し : quantité, degré, durée | trois sens : `quantificateur` ; `intensifieur` ; `temps › duree` sans fonction |
| ちょっと : quantité et bref instant ; hésitation et refus poli en nuance, sans `politesse` | deux sens ; « Euh… (hésitation) » abandonnée en sens, gardée en nuance (D1536) |
| 結構 : degré et « Non merci » | deux sens : `intensifieur` ; `politesse` |
| 大体 : approximation et « En général » | deux sens : `approximation_quantitative` ; `temps › frequence › frequent`, comme たいてい |
| 一番 : superlatif et classement | deux sens : `comparatif` ; `nombres › ordinaux`, sans fonction |
| とても : un sens `intensifieur` ; négation en nuance | oui (D1541) |
| もっと : cumul `comparatif` + `intensifieur` | oui, un seul sens, les deux fonctions justifiées (D1553) |
| たくさん, 全部 : un sens `quantificateur` | oui (D1522, D1526) |
| あまり : un sens `intensifieur` ; « ににく » journalisé | oui ; l'exemple japonais n'est pas repris, sa traduction l'est (D1546), comme pour 他 |
| ちょうど : aucune fonction ; `exactitude_inexactitude` | oui : dimension exactitude (D1561), sans catégorie (D1562) |

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs | Attente | Avertissements |
|---|---|---|---|---|---|---|---|
| Réel (inchangé) | 670 | 34 | 15 (1 non décidée, 14 propositions) | 0 | 0 | 0 | 147 |
| **Essai à blanc** (lot et journal supposés validés) | **684** | **34** | **1** (など) | **0** | **0** | **0** | **148** |

- **Un seul avertissement nouveau** : la catégorie nulle de ちょうど, justifiée au journal (D1562).
  Les autres sens sans catégorie portent une fonction.
- **Après le lot**, il ne resterait que **など**, réservée à son préalable de classe.
- **Tests** : 478 réussis, 0 échec. **Sabotages** : 40, tous attrapés (§8).

## 4. Les choix lexicaux, groupe par groupe

### A. Quantité (7)

| Entrée | Classe | Sens | Catégorie · type | Fonction |
|---|---|---|---|---|
| 多い | `adjectif_i` (décidée) | **Nombreux** \| Beaucoup de, Abondant | quantité › grande quantité · `propriete` | aucune |
| 少ない | `adjectif_i` (mécanique) | **Peu nombreux** \| En petite quantité, Peu de | quantité › petite quantité · `propriete` | aucune |
| 大勢 | `nom` (mécanique) | **Beaucoup de monde** \| Une foule, Un grand nombre de personnes | quantité › grande quantité · `quantite_valeur` | aucune |
| たくさん | `adverbe` (décidée) | **Beaucoup** \| En grande quantité, Nombreux | quantité › grande quantité · — | `quantificateur` |
| 全部 | `nom` (décidée) | **Tout** \| L'ensemble, La totalité | totalité et partie › totalité · — | `quantificateur` |
| 少し | `adverbe` (mécanique) | S1 **Une petite quantité** \| Un peu ; S2 **Un peu** ; S3 **Un court instant** | S1 petite quantité · — ; S2 — · — ; S3 temps › durée · `concept_abstrait` | S1 `quantificateur` ; S2 `intensifieur` ; S3 aucune |
| ちょっと | `adverbe` (mécanique) | S1 **Un peu** \| Un peu de ; S2 **Un instant** | S1 petite quantité · — ; S2 temps › durée · `concept_abstrait` | S1 `quantificateur` ; S2 aucune |

- **Rôle et concept** (A9, §3.4) : les quatre sens `quantificateur` gardent la catégorie de leur
  concept (grande quantité, petite quantité, totalité), sans type : ils appliquent une quantité,
  ils ne la désignent pas (A9, §4.2).
- **大勢** : `quantite_valeur`, un nombre élevé de personnes que le mot désigne ; alternative
  `groupe_collectif` (« une foule »), laissée à l'arbitrage.
- **Abandons** : « Raréfié » (少ない, un devenir, non un état) ; « Suffisamment » (たくさん, non
  développée) ; « Euh… (hésitation) » (ちょっと, en nuance).

### B. Degré (3)

| Entrée | Classe | Sens | Fonction | Points |
|---|---|---|---|---|
| とても | `adverbe` | **Très** \| Extrêmement, Vraiment | `intensifieur` | « avec une négation : impossible, pas du tout » en nuance ; comme 大変 « très » |
| あまり | `adverbe` | **Pas tellement** \| Pas beaucoup, Guère | `intensifieur` | la construction négative en nuance ; pas de `negation` ; l'exemple fautif journalisé (D1546) |
| 結構 | `adverbe` | S1 **Assez** \| Pas mal, Suffisamment ; S2 **Non merci** | S1 `intensifieur` ; S2 `politesse` | « et adjectif en na » en nuance |

### C. Comparaison (2)

| Entrée | Classe | Sens | Fonction | Points |
|---|---|---|---|---|
| もっと | `adverbe` | **Plus** \| Davantage, Encore plus | `comparatif` + `intensifieur` | cumul : la fiche dit « intensification ou augmentation… par rapport au niveau actuel » |
| 一番 | `adverbe` (décidée) | S1 **Le plus** \| Le meilleur ; S2 **Numéro un** \| Premier | S1 `comparatif` ; S2 aucune | S2 en `nombres › ordinaux`, `concept_abstrait` |

### D. Mesure et approximation (2)

| Entrée | Classe | Sens | Catégorie · type · dimension | Fonction |
|---|---|---|---|---|
| ちょうど | `adverbe` | **Exactement** \| Juste, Précisément | — · `propriete` · `exactitude` | aucune ; catégorie nulle justifiée (D1562) |
| 大体 | `adverbe` | S1 **À peu près** ; S2 **En général** \| Généralement | S1 approximation quantitative · `propriete` ; S2 temps › fréquence › fréquent · `concept_abstrait` | aucune |

- **大体** : « Presque (la plupart du temps) » abandonnée, sa glose la rattachant au sens 2 que
  « généralement » dit déjà ; signalée en nuance.

## 5. Choix à arbitrer

| N° | Choix | Proposé | Alternative |
|---|---|---|---|
| 1 | **Classe de 多い** | `adjectif_i`, groupe `i` (D1510) | — |
| 2 | **Classe de たくさん** | `adverbe` (D1519) | `nom` |
| 3 | **Classe de 全部** | `nom`, groupe `nom` : nommé en premier, suivi de の devant un nom (D1524) | `adverbe` |
| 4 | **Classe de 一番** | `adverbe`, seule classe nommée par la fiche (D1555) | `nom` (pour le sens 2) |
| 5 | **Type de 大勢** | `quantite_valeur` (D1517) | `groupe_collectif` |
| 6 | **Types des sens fonctionnels** | `null`, avec `type-nul` (11 sens), la catégorie gardant le concept | `quantite_valeur` pour たくさん, 全部, 少し S1, ちょっと S1 |
| 7 | **少し**, traductions | S1 « Une petite quantité » \| « Un peu » ; S2 « Un peu » ; S3 « Un court instant » | une autre répartition de « Un peu » |
| 8 | **Durées** (少し S3, ちょっと S2) | `temps › duree`, `concept_abstrait` | — |
| 9 | **一番, sens 2** | `nombres › ordinaux`, `concept_abstrait` | `ordre_numerique` |
| 10 | **大体, sens 1** | `approximation_quantitative`, `propriete`, sans dimension | ajouter `precision_imprecision_ambiguite` (imprécision) |
| 11 | **ちょうど** | `propriete`, dimension `exactitude`, sans catégorie | — |
| 12 | **Abandons** | « Raréfié », « Suffisamment » (たくさん), « Euh… », « Presque (la plupart du temps) » | garder l'une ou l'autre en alternative |
| 13 | **あまり**, traduction « Guère » | gardée, la parenthèse « toujours suivi d'une négation » en nuance | — |
| 14 | **Relations reportées à 5.16** : 多い / 少ない (`opposed_to`) ; 少し / ちょっと | oui (D1513, D1534) | — |

## 6. Ce qui est signalé sans être proposé

- **Première application des catégories de quantité** au vocabulaire courant (`grande_quantite`,
  `petite_quantite`, `totalite`, `approximation_quantitative`) ; à surveiller à l'audit A2-05.
- **La durée** (少し S3, ちょっと S2) n'a pas de fonction : A9 ne définit pas `aspect`.
- **L'exemple fautif de あまり** : à signaler au registre de phrases.

## 7. Cohérence avec les lots validés

- **大変 « Très »** (`intensifieur`, lot 00) : とても, même fonction, même absence de catégorie et
  de type.
- **大きい, 小さい** (lot 15) : prédicats de dimension sans fonction ; 多い et 少ない, prédicats de
  quantité, s'y alignent.
- **たいてい** (lot 21) : 大体, sens 2, dans la même catégorie et le même type.
- **違う, sens 2** (lot 20) : même axe d'A2-DIM que ちょうど.
- **Lot 23** : `politesse` pour décliner une offre (結構, sens 2) comme pour décliner un
  remerciement (いいえ, sens 2) ; aucune entrée validée n'est modifiée.

## 8. Contrôles

- Les 1 509 décisions validées sont **identiques à l'octet** ; les 58 nouvelles se suivent sans trou
  (D1510 à D1567), toutes `proposed`, toutes citées par le lot et par lui seul, dans l'ordre.
- `verify` : sources conformes ; `check-layers` sans violation ; `validate-data` : 0 erreur ;
  `git diff --check` propre.
- **Sabotages (40, tous attrapés)** : entrée ou décision passée en `validated` ; `quantificateur`
  posé sur 多い ou 大勢, retiré de たくさん, ou mis dans la famille pragmatique ; 少し à deux sens, ou
  sa durée en `intensifieur` ; `politesse` ou un sens « Euh » pour ちょっと ; « Non merci » fondu dans
  « Assez », ou sans `politesse` ; もっと sans cumul ; 一番, sens 2, en `comparatif`, ou à un seul
  sens ; とても à deux sens ; `negation` posée sur あまり ; exemple fautif repris, ou corrigé par
  invention ; ちょうど avec une fonction, avec l'axe de précision, ou sa catégorie nulle non justifiée ;
  大体 à un sens, ou son sens 2 hors du temps ; catégorie retirée ou inversée ; type de secours ;
  `type-nul` non cité ; classe ou groupe changés ; traduction remise ou perdue ; particule ou
  relation posée ; など ajoutée ; entrée ou décision supprimée ; décision d'un lot clos modifiée ;
  lot 23 rouvert ; décision du lot 24 citée par un autre lot.

## Suite prévue à la livraison

1. Relecture de cette proposition et arbitrage des 14 choix (§5).
2. Révision, s'il y a lieu, à la place des décisions, les décisions nouvelles en fin de journal.
3. Validation atomique, sur autorisation explicite ; commit et push, sur deux accords distincts.

## 9. Arbitrage des 14 choix et révision du 2026-10-06

**Arbitré par ChatGPT, sur délégation de l'utilisateur.** La proposition est **retenue avec quatre
corrections ciblées** ; tous les autres choix du §5 sont approuvés tels que proposés.

| N° | Correction | Application |
|---|---|---|
| 1 | **全部** : classe `adverbe`, groupe `null` (et non `nom`) : type source adverbe, exemple près du verbe, nuance qui décrit cet emploi ; l'emploi avec の reste en nuance | **D1524 réécrite à sa place** (`after`, raison) ; dans le lot, classe et groupe ; nuance complétée (« la fiche le dit aussi nom ») |
| 2 | **大勢** : type `groupe_collectif` (et non `quantite_valeur`) ; la catégorie grande quantité porte l'aspect quantitatif ; aucune fonction | **D1517 réécrite à sa place** (raison) ; dans le lot, le type |
| 3 | **大体**, sens 1 : ajouter la dimension `precision_imprecision_ambiguite › imprecision` ; catégorie et type conservés | **D1568 ajoutée à la fin du journal** (`sens 1 · dimensions`), citée par 大体 ; dans le lot, la dimension |
| 4a | **少ない** : « Raréfié » remise en alternative du sens 1 | **D1515 réécrite à sa place** ; dans le lot, l'alternative |
| 4b | **たくさん** : « Suffisamment » remise en alternative du sens 1 | **D1521 réécrite à sa place** ; dans le lot, l'alternative ; la nuance ne la dit plus « non développée » |
| 4c | **ちょっと** : « Euh… (hésitation) » pas un sens, mais conservée explicitement en nuance | **D1536 réécrite à sa place** (raison ; elle reste un abandon en sens) ; nuance de l'entrée complétée |
| 4d | **大体** : l'abandon de « Presque (la plupart du temps) » approuvé | inchangé (D1565), signalé en nuance |

**Conséquence mécanique, documentée** : D1515 et D1521 étaient des `abandon`. Remettre la
traduction en alternative rend l'abandon faux ; elles sont réécrites à leur place, sous le même
identifiant, la même entrée et le même champ, mais avec la nature `decision` (« gardée en
alternative du sens 1 »). C'est le seul écart à la règle « natures inchangées » des révisions ; le
garder en `abandon` aurait laissé le journal contredire le lot.

**État après la révision** : 14 entrées, 20 sens, **59 décisions D1510 à D1568**, toutes `proposed` ;
par nature : 44 `decision` (dont 2 dimensions et 2 maintiens de traduction), 11 `type-nul`, 1
`categorie-nulle`, 3 `abandon` (« Euh… », « Presque », l'exemple de あまり).

**Contrôlé** : les 1 509 décisions validées sont identiques à l'octet ; seules D1515, D1517, D1521,
D1524 et D1536 changent (`kind`, `after`, `reason` selon le cas), D1568 est ajoutée ; identifiants,
entrées, champs et statuts inchangés. État réel inchangé (670 / 34 / 15) ; essai à blanc inchangé
(684 ENTRY, 34 retraits, 1 écartée, など ; 0 problème, 0 erreur, 0 attente ; 148 avertissements).

### Erratum sur les sabotages (§8, et lots 22 et 23)

En révisant, Claude a découvert que **le harnais des sabotages était défectueux** : il lançait
`node --test tests/reconstruction/`, que Node traite comme un fichier et qui **échoue toujours**,
même sur un état sain. Tout sabotage passait donc pour « attrapé », quel qu'il fût. Les
modifications et les restaurations étaient réelles ; la détection ne prouvait rien. Sont concernés
les comptes annoncés pour le lot 22 (49), le lot 23 (35, 38, 40) et le lot 24 (40 au §8).

**Corrigé** : le harnais lance `tests/reconstruction/*.test.js` et vérifie d'abord qu'un **témoin**
(l'état sain) passe. Rejoués avec lui, avant tout renforcement : lot 22, 48 sur 49 ; lot 23, 35 sur
40 ; lot 24, 44 sur 48. **Les tests ont été renforcés** pour combler les manques :

- une **empreinte des décisions validées** (D0001 à D1509), qui détecte toute retouche silencieuse
  d'une décision close ;
- aucune traduction à la fois gardée et abandonnée (lots 23 et 24) ;
- les particules d'un sens unique restent mécaniques, celles d'une entrée à plusieurs sens sont
  celles de la fiche ; aucune relation (lots 23 et 24) ;
- chaque sens porte exactement les fonctions que sa décision pose (lots 23 et 24) ;
- l'exemple altéré de いいえ (« ちigai masu ») n'est repris sous aucune forme.

**Résultat, vérifié avec le témoin** : lot 24, **48 sur 48** ; lot 23 (état validé), **40 sur 40** ; lot
22 (état validé), **49 sur 49**. 479 tests verts.

## 10. Diff complet de la révision

```diff
--- journal.json (avant la révision)
+++ journal.json (après la révision)
@@ -21344,12 +21344,12 @@
     "lot": "lot-24",
     "entry": "n5_v_447",
     "field": "senses",
-    "kind": "abandon",
+    "kind": "decision",
     "before": [
       "Raréfié"
     ],
-    "after": null,
-    "reason": "Traduction que la fiche ne développe pas : « raréfié » dit un devenir (devenir rare), alors que la nuance et l'exemple décrivent un état, une quantité restreinte. Elle n'est pas reprise."
+    "after": "gardée en alternative du sens 1",
+    "reason": "Traduction gardée en alternative du sens 1 (arbitrage des choix du lot 24) : aucune preuve interne à la fiche ne permet de l'écarter comme un devenir ; elle dit, avec les autres traductions, une quantité restreinte. Réécrite à sa place : la décision d'abandon proposée est remplacée par une décision de maintien, sous le même identifiant."
   },
   {
     "id": "A2-04-D1516",
@@ -21380,7 +21380,7 @@
       "Un grand nombre de personnes"
     ],
     "after": "un seul sens",
-    "reason": "Un seul sens : la fiche dit 大勢 « utilisé exclusivement pour désigner une grande foule ou un nombre élevé de personnes » ; les trois traductions disent ce même référent, que l'exemple illustre (il y a beaucoup de monde au parc). Catégorie nombres et quantification › quantité › grande quantité. Type quantite_valeur : un nombre élevé de personnes, une quantité que le mot désigne. Alternative laissée à l'arbitrage : groupe_collectif (« une foule »). Classe nom mécanique ; la fiche dit aussi « adverbe ». La particule の de la fiche est reprise mécaniquement pour ce sens unique."
+    "reason": "Un seul sens : la fiche dit 大勢 « utilisé exclusivement pour désigner une grande foule ou un nombre élevé de personnes » ; les trois traductions disent ce même référent, que l'exemple illustre (il y a beaucoup de monde au parc). Catégorie nombres et quantification › quantité › grande quantité. Type groupe_collectif (arbitrage des choix du lot 24) : la fiche désigne exclusivement une foule, un ensemble de personnes ; la catégorie grande quantité porte l'aspect quantitatif. Classe nom mécanique ; la fiche dit aussi « adverbe ». La particule の de la fiche est reprise mécaniquement pour ce sens unique."
   },
   {
     "id": "A2-04-D1518",
@@ -21433,12 +21433,12 @@
     "lot": "lot-24",
     "entry": "n5_v_520",
     "field": "senses",
-    "kind": "abandon",
+    "kind": "decision",
     "before": [
       "Suffisamment"
     ],
-    "after": null,
-    "reason": "Traduction que ni la nuance ni l'exemple ne développent (la fiche parle d'abondance, non de suffisance) : elle n'est pas reprise en sens, et elle est signalée en nuance (traductions non développées, lots 15 et 16)."
+    "after": "gardée en alternative du sens 1",
+    "reason": "Traduction gardée en alternative du sens 1 (arbitrage des choix du lot 24, conformément à l'arbitrage du périmètre) : « suffisamment » est une traduction de la fiche, rattachée au sens unique de quantité abondante. Réécrite à sa place : la décision d'abandon proposée est remplacée par une décision de maintien, sous le même identifiant."
   },
   {
     "id": "A2-04-D1522",
@@ -21478,8 +21478,8 @@
     "field": "grammatical_class",
     "kind": "decision",
     "before": "adverbe (ancien type)",
-    "after": "nom",
-    "reason": "Classe nom : la fiche le dit « nom / adverbe », nommant nom en premier, et le dit « suivi de la particule no lorsqu'il qualifie un nom », comportement d'un nom ; son emploi près du verbe, sans particule, est dit en nuance. Le schéma ne porte qu'une classe. Groupe nom (schema-A2-01, §6). La classe ne décide pas de la fonction, ni l'inverse (A9, §2.2)."
+    "after": "adverbe",
+    "reason": "Classe adverbe, groupe null (arbitrage des choix du lot 24) : la fiche dit « nom / adverbe », mais son type source est adverbe, son exemple principal l'emploie près du verbe (りんごをぜんぶたべました), et sa nuance décrit cet emploi (« souvent placé près du verbe »). L'emploi suivi de の, devant un nom, est conservé en nuance. Le schéma ne porte qu'une classe. Groupe null : la classe n'a aucune valeur de groupe compatible (schema-A2-01, §6). La classe ne décide pas de la fonction, ni l'inverse (A9, §2.2)."
   },
   {
     "id": "A2-04-D1525",
@@ -21663,7 +21663,7 @@
       "Euh... (hésitation)"
     ],
     "after": null,
-    "reason": "L'hésitation n'est pas un sens (arbitrage du périmètre du lot 24) : elle est dite en nuance, avec le refus poli, comme formule atténuante, ce que la fiche décrit (A9, §3.2, frontière 2 : un marqueur d'hésitation reste en nuance)."
+    "reason": "L'hésitation n'est pas un sens (arbitrage du périmètre du lot 24) : elle est dite en nuance, avec le refus poli, comme formule atténuante, ce que la fiche décrit (A9, §3.2, frontière 2 : un marqueur d'hésitation reste en nuance). La traduction de la source, « Euh… (hésitation) », y est conservée explicitement (arbitrage des choix du lot 24)."
   },
   {
     "id": "A2-04-D1537",
@@ -22135,5 +22135,22 @@
       "pragmatic_discourse": []
     },
     "reason": "Sens 2, aucune fonction : la généralité (« en général ») n'est aucune des fonctions définies par A9 ; elle est dite par la catégorie temps › fréquence, comme pour たいてい (lot 21), validée sans fonction."
+  },
+  {
+    "id": "A2-04-D1568",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-24",
+    "entry": "n5_v_546",
+    "field": "sens 1 · dimensions",
+    "kind": "decision",
+    "before": null,
+    "after": [
+      {
+        "axis": "precision_imprecision_ambiguite",
+        "pole": "imprecision_ambiguite"
+      }
+    ],
+    "reason": "Dimension imprécision (axe précision ↔ imprécision / ambiguïté d'A2-DIM ; arbitrage des choix du lot 24) : la fiche dit « une approximation », « grosso modo / à peu près », « sans entrer dans les détails précis » ; l'axe décrit directement le sens (doctrine du lot 16). La catégorie approximation quantitative et le type propriete sont conservés."
   }
 ]
\ No newline at end of file
--- lots/lot-24.json (avant la révision)
+++ lots/lot-24.json (après la révision)
@@ -63,6 +63,7 @@
             "meaning": {
               "primary": "Peu nombreux",
               "alternatives": [
+                "Raréfié",
                 "En petite quantité",
                 "Peu de"
               ]
@@ -110,7 +111,7 @@
               "level_2": "quantite",
               "level_3": "grande_quantite"
             },
-            "semantic_type": "quantite_valeur",
+            "semantic_type": "groupe_collectif",
             "dimensions": [],
             "relations": [],
             "linguistic_functions": {
@@ -135,7 +136,7 @@
         "suru_compatible": false,
         "suffix": false,
         "counter": null,
-        "nuance": "Une quantité abondante d'objets ou de personnes, ou une action accomplie en grand nombre : きのうりんごをたくさんかいました (hier, j'ai acheté beaucoup de pommes). La fiche le dit aussi nom ou adjectif en な dans certaines tournures, et donne « suffisamment », sans les développer.",
+        "nuance": "Une quantité abondante d'objets ou de personnes, ou une action accomplie en grand nombre : きのうりんごをたくさんかいました (hier, j'ai acheté beaucoup de pommes). La fiche le dit aussi nom ou adjectif en な dans certaines tournures.",
         "tags": [],
         "senses": [
           {
@@ -143,7 +144,8 @@
               "primary": "Beaucoup",
               "alternatives": [
                 "En grande quantité",
-                "Nombreux"
+                "Nombreux",
+                "Suffisamment"
               ]
             },
             "category": {
@@ -179,7 +181,7 @@
         "suru_compatible": false,
         "suffix": false,
         "counter": null,
-        "nuance": "L'intégralité d'une quantité ou d'un groupe d'objets : りんごをぜんぶたべました (j'ai tout mangé des pommes). Souvent placé près du verbe, ou suivi de の lorsqu'il qualifie un nom.",
+        "nuance": "L'intégralité d'une quantité ou d'un groupe d'objets : りんごをぜんぶたべました (j'ai tout mangé des pommes). Souvent placé près du verbe, ou suivi de の lorsqu'il qualifie un nom. La fiche le dit aussi nom.",
         "tags": [],
         "senses": [
           {
@@ -206,8 +208,8 @@
             }
           }
         ],
-        "grammatical_class": "nom",
-        "group": "nom"
+        "grammatical_class": "adverbe",
+        "group": null
       }
     },
     "n5_v_509": {
@@ -307,7 +309,7 @@
         "suru_compatible": false,
         "suffix": false,
         "counter": null,
-        "nuance": "Très courant. Sert aussi de formule atténuante, pour exprimer une hésitation ou un refus poli (« c'est un peu délicat… »).",
+        "nuance": "Très courant. Sert aussi de formule atténuante, pour exprimer une hésitation (« Euh… », que la fiche donne en traduction) ou un refus poli (« c'est un peu délicat… »).",
         "tags": [],
         "senses": [
           {
@@ -640,7 +642,8 @@
         "A2-04-D1564",
         "A2-04-D1565",
         "A2-04-D1566",
-        "A2-04-D1567"
+        "A2-04-D1567",
+        "A2-04-D1568"
       ],
       "fields": {
         "writings": [],
@@ -660,7 +663,12 @@
               "level_2": "approximation_quantitative"
             },
             "semantic_type": "propriete",
-            "dimensions": [],
+            "dimensions": [
+              {
+                "axis": "precision_imprecision_ambiguite",
+                "pole": "imprecision_ambiguite"
+              }
+            ],
             "relations": [],
             "linguistic_functions": {
               "grammatical": [],
```
