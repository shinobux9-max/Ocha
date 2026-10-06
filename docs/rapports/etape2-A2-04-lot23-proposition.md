# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 23 « Liaison, échange et formules sociales » · proposition

**Date** : 2026-10-06
**Nature** : livraison pour relecture, alors en `proposed`. **Lot validé depuis, le 2026-10-06**
(rapport `docs/rapports/etape2-A2-04-lot23-valide.md`) : statuts seulement. Rien n'est committé, rien n'est poussé.

**Version** : révisée le 2026-10-06 après l'arbitrage des 18 choix (§9). Les §1 à §8 restent la
proposition telle qu'elle a été relue ; le §9 dit ce qui a changé, le §10 en donne le diff complet.

**À lire avec** : `reconstruction/a2-04/rapports/lot-23.md` (rapport généré, entrée par entrée),
`docs/rapports/etape2-A2-04-lot23-perimetre.md` (périmètre) et l'addendum A9
(`docs/conception/addendum-A9-fonctions-linguistiques.md`), **appliqué pour la première fois**.

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Aucun sens,
aucune lecture, aucune graphie, aucune particule, aucune relation n'est ajouté par connaissance
externe. Les fonctions sont posées **sens par sens**, quand le rôle fait partie intégrante du sens
modélisé et que la fiche l'atteste (A9, §2.1), jamais par la classe (A9, §2.2).

---

## 1. Ce qui est livré

| Pièce | Contenu |
|---|---|
| `reconstruction/a2-04/lots/lot-23.json` | 13 entrées gardées, aucune fusion, **22 sens**, toutes `proposed` |
| `reconstruction/a2-04/journal.json` | **74 décisions ajoutées à la fin**, D1436 à D1509, toutes `proposed` ; les 1 435 décisions validées sont identiques à l'octet |
| `reconstruction/a2-04/rapports/lot-23.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | tests d'état adaptés à la proposition (lot 23 proposé, 28 écartées dont 13 propositions, 24 fichiers de lot, journal de 1 509 décisions) ; **2 tests ajoutés** (lot 23 proposé ; essai à blanc) |

**Décisions, par nature** : 49 `decision` (10 classes, 13 découpages de sens, 22 fonctions, 4
relations reportées), 22 `type-nul`, 3 `abandon` (2 traductions non développées, 1 exemple altéré).
**Aucune** décision `categorie-nulle` : chaque sens porte une fonction, qui justifie l'absence de
catégorie (A5 ; A9, §4.1).

## 2. L'arbitrage du périmètre, tel qu'il est appliqué

| Arbitrage | Application |
|---|---|
| 13 entrées ; 14 reportées ; など hors périmètre | `lot-23.json` contient exactement les 13 ; un test le contrôle, et un sabotage qui ajoute など ou とても est attrapé |
| じゃ et じゃあ : deux ENTRY, aucune fusion | deux entrées gardées, aucune décision `fusion` ; la paire est inscrite comme candidate aux relations de 5.16 (D1462) |
| では, それでは, じゃ, じゃあ : un sens par emploi réellement établi ; pas de sens fourre-tout ; cumul seulement si deux rôles sont intégraux au même emploi | trois sens pour では, それでは, じゃ (conséquence ; transition ; prise de congé), deux pour じゃあ, dont la nuance ne nomme pas la prise de congé (§4.B) ; cumul discours et politesse sur la seule prise de congé « polie » (では, それでは) |
| いいえ « De rien » : sens distinct | deux sens : « Non » ; « De rien, pas du tout » |
| どうも « Vraiment » : sens distinct ; la gêne en nuance | deux sens : « Merci » ; « Vraiment » ; la gêne et l'incertitude en nuance de l'entrée |
| そうして : succession et addition dans un même sens | un seul sens, « Et puis » |
| それから : un sens temporel ; l'énumération en nuance | un seul sens, « Ensuite » ; l'énumération en nuance |
| いいえ : anomalie journalisée, ni correction ni remplacement | D1499 : l'exemple n'est repris ni en japonais ni en traduction ; aucun ancien exemple ne le remplace |

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs | Attente | Avertissements |
|---|---|---|---|---|---|---|---|
| Réel (inchangé) | 657 | 34 | 28 (15 non décidées, 13 propositions) | 0 | 0 | 0 | 147 |
| **Essai à blanc** (lot et journal supposés validés) | **670** | **34** | **15** | **0** | **0** | **0** | **147** |

- **Aucun avertissement nouveau** : chaque sens porte une fonction ; le validateur n'avertit
  `categorie-nulle` et `type-nul` qu'en l'absence de fonction (I9, I10). Les 22 types nuls sont
  néanmoins justifiés au journal (règle de 5.1c).
- **Après le lot** : 15 entrées restent à décider, les 14 reportées (quantité, degré, comparaison)
  et など.
- **Tests** : 476 réussis, 0 échec. **Sabotages** : 35, tous attrapés, chacun vérifié comme
  modifiant réellement son fichier, puis rétabli à l'octet près (§8).

## 4. Les choix lexicaux, groupe par groupe

Pour tous les sens : `category: null` (A2-LING §5 ; A9 §4.1), `semantic_type: null` avec une
décision `type-nul` (A6 ; A9 §4.2), aucune dimension, aucune relation, aucune particule (aucune
fiche n'en donne).

### A. Liaison entre énoncés (4)

| Entrée | Classe | Sens | Fonction | Points |
|---|---|---|---|---|
| しかし | conjonction | **Cependant** \| Mais, Toutefois, Néanmoins | `connecteur` | « plus formel que でも » en nuance |
| でも | conjonction | **Mais** \| Cependant, Pourtant | `connecteur` | « plus familier » en nuance |
| それから | conjonction | **Ensuite** \| Et puis, Puis après | `connecteur` | sens temporel unique ; l'énumération et la composition (sore + kara) en nuance |
| そうして | conjonction | **Et puis** \| Et ensuite | `connecteur` | succession et addition dans le même sens ; « c'est ainsi que » abandonnée (non développée), signalée en nuance |

### B. Transition, conclusion et prise de congé (4)

| Entrée | Classe | Sens 1 | Sens 2 | Sens 3 |
|---|---|---|---|---|
| では | conjonction (mécanique) | **Dans ce cas** · `connecteur` (conséquence, conclure un accord) | **Eh bien** · `discours` (passer à une autre idée) | **Alors** · `discours` + `politesse` (prendre congé « de manière polie » ; では、またあした) |
| それでは | conjonction | **Dans ce cas** · `connecteur` (introduire une conclusion) | **Alors** · `discours` (changer de sujet ; それでは、はじめましょう) | **Sur ce** · `discours` + `politesse` (prendre congé « de manière polie ») |
| じゃ | conjonction | **Dans ce cas** · `connecteur` (conclure un accord) | **Bon** · `discours` (transition) | **Alors** · `discours` seul (prendre congé ; じゃ、またあした) |
| じゃあ | conjonction | **Alors** \| Dans ce cas · `connecteur` | **Eh bien** · `discours` (transition, jusqu'à la prise de congé de l'exemple) | — |

**Pourquoi trois sens, sauf pour じゃあ** : les nuances de では, それでは et じゃ nomment chacune trois
emplois, dont la prise de congé ; celle de じゃあ en nomme deux (transition, « alors / dans ce
cas ») ; la prise de congé n'y est attestée que par l'exemple, et elle est dite en nuance du sens 2,
comme clôture de l'échange (même fonction, `discours`).

**Pourquoi la politesse sur trois prises de congé sur quatre seulement** : la fiche de では et celle
de それでは disent la prise de congé « de manière polie », un acte social (A9, §3.3 : prendre congé
poliment) ; celle de じゃ la dit familière, sans politesse. Le registre seul (« forme polie », « formel »)
n'est pas la fonction (A9, §3.3, frontière 1) : il est en nuance.

**Les traductions** : chaque traduction de la source est reprise dans le sens dont elle dit
l'emploi ; « Alors » sert de traduction au sens 3 de では et de じゃ (la prise de congé de leurs
exemples : « Alors, à demain »), la nuance du sens disant l'emploi.

### C. Réponses (3)

| Entrée | Classe | Sens | Fonction | Points |
|---|---|---|---|---|
| はい | interjection (mécanique) | **Oui** \| C'est exact, Entendu | `discours` | la réponse à un appel, sans traduction propre, en nuance ; « terme d'approbation poli » est un registre : pas de `politesse` |
| ええ | interjection | **Oui** \| D'accord, Certes | `discours` | « plus douce et conversationnelle que はい » en nuance |
| いいえ | interjection | S1 **Non** · `discours` ; S2 **De rien** \| Pas du tout · `politesse` | | S2 sans `discours` en cumul (le sens ne répond pas sur une information : son rôle est l'acte social) ; pas de `negation` (non définie, A9 §6) ; **l'exemple altéré n'est pas repris** (D1499) |

### D. Formules sociales (2)

| Entrée | Classe | Sens | Fonction | Points |
|---|---|---|---|---|
| どうぞ | adverbe | **S'il vous plaît** \| Je vous en prie, Allez-y | `politesse` | un seul sens : inviter, céder le passage, offrir sont trois situations de la même invitation |
| どうも | adverbe (mécanique) | S1 **Merci** · `politesse` ; S2 **Vraiment** · `intensifieur` | | « particule d'atténuation » selon la fiche : I1 couvre l'atténuation ; « bien des choses » abandonnée (non développée), la gêne en nuance |

## 5. Choix à arbitrer

| N° | Choix | Proposé | Alternative |
|---|---|---|---|
| 1 | **Classe de じゃ** | `conjonction` : « particule de transition » nomme le rôle de では, dont la fiche la dit la contraction (D1471) | `interjection`, seule classe du registre que la fiche nomme en toutes lettres |
| 2 | **Classe de どうぞ** | `adverbe`, nommé en premier par la fiche ; même classe que どうも (D1500) | `interjection` |
| 3 | **Classes de それから et それでは** (ancien type interjection) | `conjonction`, comme les fiches le disent (D1445, D1463) | — |
| 4 | **Classes de ええ et いいえ** | `interjection` (D1489, D1493) | — |
| 5 | **しかし, でも** : un sens chacun, `connecteur` | oui | — |
| 6 | **それから** : sens temporel unique, énumération en nuance | oui (arbitrage du périmètre) | — |
| 7 | **そうして** : un sens ; « c'est ainsi que » abandonnée | oui (D1452) | garder la traduction en alternative |
| 8 | **では** : trois sens ; cumul `discours` + `politesse` au sens 3 | oui (D1455 à D1458) | — |
| 9 | **それでは** : trois sens ; « Sur ce » en sens 3, `discours` + `politesse` | oui (D1464 à D1467) | — |
| 10 | **じゃ** : trois sens ; sens 3 sans `politesse` | oui (D1472 à D1475) | — |
| 11 | **じゃあ** : deux sens ; prise de congé en nuance du sens 2 | oui (D1480 à D1482) | trois sens, comme じゃ, sur la foi de l'exemple |
| 12 | **はい** : un sens ; réponse à un appel en nuance ; pas de `politesse` | oui (D1485, D1486) | — |
| 13 | **いいえ**, sens 2 : `politesse` seule | oui (D1496) | cumul `discours` + `politesse` |
| 14 | **どうぞ** : un seul sens `politesse` | oui (D1501, D1502) | — |
| 15 | **どうも**, sens 2 : `intensifieur` | oui (D1507) | aucune fonction (la fiche ne dit pas ce que la particule modifie) ; le sens exigerait alors une décision `categorie-nulle` |
| 16 | **Traductions principales des sens de transition** : では « Dans ce cas » / « Eh bien » / « Alors » ; それでは « Dans ce cas » / « Alors » / « Sur ce » ; じゃ « Dans ce cas » / « Bon » / « Alors » ; じゃあ « Alors » / « Eh bien » | oui | une autre répartition des traductions attestées |
| 17 | **Aucune catégorie, aucun type** pour les 22 sens | oui (22 `type-nul`) | — |
| 18 | **Relations reportées à 5.16** : しかし / でも ; それから / そうして ; では / それでは / じゃ / じゃあ ; はい / ええ / いいえ | oui (D1440, D1449, D1462, D1488) | — |

## 6. Ce qui est signalé sans être proposé

- **Asymétrie avec また, sens 2** (lot 21, « Aussi, de plus ») : validée sans fonction (D1381), elle
  qualifierait pour `connecteur`, que le lot 23 pose sur une addition (そうして). **Non rouverte** :
  réservée à l'audit A2-05 (A9, §5) ; la raison de D1453 le dit.
- **はい** : `group: "nom"` dans la source, sans effet (groupe null pour une interjection) ; dit dans
  D1485.
- **L'exemple altéré de いいえ** : à signaler au registre de phrases.
- **Les emplois sociaux de 結構 et ちょっと** (refus poli) : dans le lot des 14 reportées.

## 7. Cohérence avec les lots validés

- **A9 appliqué pour la première fois** : 22 décisions de fonction, toutes justifiées par A9
  (§2.1 et la définition en jeu) ; 2 sens en cumul (では et それでは, sens 3), justifiés fonction par
  fonction.
- **Doctrine du lot 16** (emplois d'adresse d'un mot lexical en nuance) : non concernée ; ces 13
  entrées n'ont pas de sens lexical d'accueil.
- **大変 « Très »** (`intensifieur`, lot 00) : même fonction que どうも, sens 2, sans conflit.
- **Aucune entrée validée n'est modifiée** : un test le contrôle pour また, et un sabotage qui la
  rouvre est attrapé.

## 8. Contrôles

- Les 1 435 décisions validées sont **identiques à l'octet** ; les 74 nouvelles se suivent sans trou
  (D1436 à D1509), toutes `proposed`, toutes citées par le lot et par lui seul.
- `verify` : sources conformes au manifeste ; `check-layers` sans violation ; `validate-data` : 0
  erreur ; `git diff --check` propre.
- **Sabotages (35, tous attrapés)** : entrée ou décision passée en `validated` ; じゃ fusionnée dans
  じゃあ ; `connecteur` retiré, ou mis dans la famille grammaticale ; `negation` posée ; `politesse`
  posée par le registre (はい), ajoutée à la prise de congé familière (じゃ) ou retirée de では ; では
  recollée en un sens fourre-tout ; « De rien » ou « Vraiment » fondus dans le premier sens ;
  それから à deux sens ; catégorie `reponse` inventée ; type de secours ; `type-nul` non cité ;
  fonction retirée sans `categorie-nulle` ; classe ou groupe changés ; classe décidée pour une entrée
  mécanique ; exemple altéré repris, ou remplacé par un ancien exemple ; traduction abandonnée remise
  ou perdue ; particule ou relation posée ; など ou とても ajoutées ; entrée ou décision supprimée ;
  décision d'un lot clos modifiée ; また rouverte, ou `connecteur` posé sur elle ; décision du lot 23
  citée par le lot 22 ; fonction retirée de sa décision.

## Suite prévue à la livraison

1. Relecture de cette proposition et arbitrage des 18 choix (§5).
2. Révision, s'il y a lieu, à la place des décisions, les décisions nouvelles en fin de journal.
3. Validation atomique, sur autorisation explicite ; commit et push, sur deux accords distincts.

## 9. Arbitrage des 18 choix et révision du 2026-10-06

**Arbitré par ChatGPT, sur délégation de l'utilisateur.** La proposition est **retenue dans son
ensemble, avec une seule correction** :

- **D1471, じゃ : classe `interjection`, et non `conjonction`** (choix 1). Motif : la fiche dit
  explicitement « interjection / particule de transition » ; « particule » n'est pas une classe
  disponible, et `interjection` est donc la classe attestée disponible. La classe ne se déduit ni de
  la contraction avec では, ni du rôle de transition : A9 sépare la classe et la fonction (§2.2).
  `group: null` reste inchangé.
- **Les trois sens de じゃ et leurs fonctions restent exactement comme proposés** : sens 1 « Dans ce
  cas », `connecteur` ; sens 2 « Bon », `discours` ; sens 3 « Alors », prise de congé familière,
  `discours`, sans `politesse`.
- **Les 17 autres choix du §5 sont approuvés tels que proposés**, dont どうぞ en `adverbe` (choix 2) et
  どうも, sens 2, en `intensifieur` (choix 15).

**Révision appliquée, à sa place** :

| Fichier | Changement |
|---|---|
| `journal.json` | **D1471 réécrite à sa place** : `after` `conjonction` → `interjection`, et sa raison ; identifiant, entrée, nature, champ et statut (`proposed`) inchangés ; aucune autre décision ne change, aucune n'est ajoutée |
| `lots/lot-23.json` | **une seule ligne** : la classe de じゃ (`n5_v_595`), `conjonction` → `interjection` ; `group: null` et les trois sens inchangés |
| `rapports/lot-23.md` | régénéré |
| `tests/reconstruction/workspace.test.js` | attente de la classe de じゃ mise à jour ; l'essai à blanc contrôle aussi じゃ (`interjection`) et じゃあ (`conjonction`) |

**Après la révision, les classes du lot** : 6 `conjonction` (しかし, でも, それから, そうして, それでは,
じゃあ) et では, mécanique ; 3 `interjection` (じゃ, ええ, いいえ) et はい, mécanique ; 1 `adverbe`
(どうぞ) et どうも, mécanique.

**Contrôlé** : les 1 435 décisions validées sont identiques à l'octet ; une seule décision du lot
change (D1471, `after` et `reason`) ; tout reste `proposed`. État réel inchangé (657 ENTRY, 34
retraits, 28 écartées) ; essai à blanc inchangé (670 ENTRY, 34 retraits, 15 écartées, 0 problème, 0
erreur, 0 attente, 147 avertissements).

**Ce qu'il n'autorise pas** : ni la validation, ni un commit, ni un push.

## 10. Diff complet de la révision

```diff
--- journal.json (avant la révision)
+++ journal.json (après la révision)
@@ -20703,8 +20703,8 @@
     "field": "grammatical_class",
     "kind": "decision",
     "before": "adverbe (ancien type)",
-    "after": "conjonction",
-    "reason": "Classe conjonction : la fiche le dit « interjection / particule de transition (contraction familière de では) » ; « particule de transition » nomme le même rôle que la « conjonction de transition » では (classe mécanique conjonction), dont la fiche le dit la contraction, et sa nuance décrit les mêmes emplois. Le registre n'a pas de classe « particule ». Alternative laissée à l'arbitrage : interjection, la seule classe du registre que la fiche nomme en toutes lettres. Groupe null : la classe n'a aucune valeur de groupe compatible (schema-A2-01, §6). La classe ne décide pas de la fonction, ni l'inverse (addendum A9, §2.2)."
+    "after": "interjection",
+    "reason": "Classe interjection (arbitrage des choix du lot 23) : la fiche dit explicitement « interjection / particule de transition (contraction familière de では) » ; « particule » n'est pas une classe du registre, et interjection est la classe attestée par la fiche et disponible. La classe n'est déduite ni de la contraction avec では, ni du rôle de transition : A9 sépare la classe et la fonction (§2.2). Groupe null : la classe n'a aucune valeur de groupe compatible (schema-A2-01, §6). Les trois sens et leurs fonctions (connecteur ; discours ; discours, sans politesse) ne changent pas."
   },
   {
     "id": "A2-04-D1472",
--- lots/lot-23.json (avant la révision)
+++ lots/lot-23.json (après la révision)
@@ -398,7 +398,7 @@
             "nuance": "Pour prendre congé : じゃ、またあした (alors, à demain)."
           }
         ],
-        "grammatical_class": "conjonction",
+        "grammatical_class": "interjection",
         "group": null
       }
     },
```
