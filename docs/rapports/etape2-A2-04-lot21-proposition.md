# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 21 « Fréquence, répétition et repères temporels » · proposition

**Date** : 2026-10-06
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 12 entrées du lot et ses 34
décisions de journal. Rien n'est validé, rien n'est committé, rien n'est poussé.

**Version** : révisée le 2026-10-06 après l'arbitrage des 21 choix (§9). Les §1 à §8 restent la
proposition telle qu'elle a été relue ; le §9 dit ce qui a changé, le §10 en donne le diff complet.

**État** : le lot est **validé** depuis le 2026-10-06 (`docs/rapports/etape2-A2-04-lot21-valide.md`).
Ce rapport reste la proposition telle qu'elle a été relue : les mentions « proposed » et l'essai à
blanc y décrivent l'état d'avant la validation.

**À lire avec** : `reconstruction/a2-04/rapports/lot-21.md` (rapport généré, entrée par entrée) et
`docs/rapports/etape2-A2-04-lot21-perimetre.md` (périmètre arbitré, §9).

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Aucun sens,
aucune lecture, aucune graphie, aucune particule, aucune relation, aucune fonction n'est ajouté par
connaissance externe.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-21.json` | nouveau : 12 entrées, toutes `proposed`, aucun ajout, aucun retrait |
| `reconstruction/a2-04/journal.json` | 33 décisions `proposed`, D1370 à D1402, ajoutées à la fin ; les 1 369 décisions validées sont identiques à l'octet |
| `reconstruction/a2-04/rapports/lot-21.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | six tests adaptés à l'état « lot 21 proposé » (espace de travail réel ; lots 17, 18, 19 et 20 dans l'assemblage réel ; journal), deux tests ajoutés |
| Autres lots, règles, validateur, registres, sources figées | inchangés |

**Sens** : 16, pour 12 entrées. Quatre entrées ont deux sens (よく, また, まだ, もう) ; huit en ont un
seul.

| Nature | Champ | Nombre |
|---|---|---|
| `decision` | sens (une par entrée) | 12 |
| `abandon` | sens (traductions écartées) | 2 |
| `categorie-nulle` | catégorie d'un sens (A5) | 5 |
| `decision` | fonctions linguistiques (aucune n'est posée) | 6 |
| `correction` | lecture (もう一度) | 1 |
| `decision` | nuance (distinction 早い / 速い conservée) | 1 |
| `abandon` | nuance (exemples altérés, traduction fautive, remarques d'origine ou d'écriture) | 6 |

Aucune forme usuelle, aucune classe, aucune graphie, aucun tag, aucune dimension, aucune relation ni
aucune fonction linguistique n'est décidé. Aucun type nul.

## 2. L'arbitrage du périmètre, tel qu'il est appliqué

1. **Périmètre** : les 12 identifiants arbitrés, dans l'ordre du rapport de périmètre. Les cinq
   adverbes de manière ne sont dans aucun lot (un test le contrôle).
2. **Fonctions linguistiques** : `linguistic_functions` est vide pour les 16 sens. Six décisions
   disent qu'aucune fonction n'est posée, et pourquoi : `connecteur` pour また, sens 2 (D1381) ;
   `aspect` et `negation` pour まだ (D1387) et もう (D1390) ; `aspect` pour 初めて (D1397) et
   だんだん (D1400) ; `deictique` pour すぐに (D1392). Aucune définition, aucun addendum.
3. **Aucune entrée ne porte `deictique`.** Pour すぐに, la décision D1392 reprend l'arbitrage : le
   sens exprime l'absence de délai relativement à un repère ou à un événement ; contrairement à
   近々, il n'est pas intrinsèquement un futur proche repéré depuis le moment de l'énonciation (A7,
   §4). まだ, もう et 初めて le disent aussi dans leur décision de fonction.
4. **よく reste une ENTRY distincte de いい** (D1373) : aucune fusion ; `v_420` n'est pas rouverte
   (un test vérifie qu'elle est intacte, statut et journal).
5. **Relations** : `relations: []` pour les 16 sens, aucune décision de relation, aucune candidate à
   5.16. Les liens よく / いい, 早い / 速い et もう一度 / もう restent ce que l'arbitrage en dit :
   une origine (non reprise, D1375), une distinction (conservée en nuance, D1402), une composition
   (conservée en nuance, D1384).

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la proposition (commit `55acc13`) | 638 | 32 | 49 | 0 | 0 | 0 |
| **Réel**, proposition en cours | **638** | 32 | 49 (37 non décidées, 12 propositions) | 0 | 0 | 0 |
| **Essai à blanc**, tout supposé validé, en mémoire | **650** | **32** | **37** | 0 | 0 | 0 |

- **L'état réel ne change pas** tant que rien n'est validé.
- **Essai à blanc** : 650 = 638 + 12. Les 37 entrées restantes seraient 2 noms, 31 adverbes et mots
  de liaison, 4 adjectifs.
- **Avertissements à l'essai à blanc** : 139, soit 5 de plus, tous `categorie-nulle` et justifiés
  au journal : よく sens 2, また sens 1 et 2, もう一度, だんだん.
- **Tests** : 472 réussis, 0 échec (470 avant ; deux tests ajoutés : l'état du lot 21 proposé,
  l'essai à blanc).
- **Sabotages** : 30, tous attrapés, chacun vérifié comme modifiant réellement son fichier, puis
  rétabli à l'octet près (empreintes contrôlées) : entrée ou décision validée sans autorisation ;
  `deictique` posée sur すぐに, `aspect` sur まだ, `connecteur` sur また ; raison d'une décision de
  fonction vidée ; relation ou dimension posée ; いい rouverte ; よく réduite à un sens ; furigana de
  もう一度 remis à la source, ou mis en bloc, ou lecture retirée ; catégorie nulle sans
  justification, ou justification retirée ; type, catégorie ou ordre des sens changés ; particule
  étrangère à la fiche ; traduction abandonnée remise, ou perdue ; exemple fautif ou remarque
  d'origine repris ; distinction de 早い retirée ; adverbe de manière ajouté ; entrée retirée du
  lot ; tag ajouté ; décision supprimée ; décision d'un lot clos modifiée ; décision du lot 21 citée
  par un autre lot.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 4. Les choix lexicaux, groupe par groupe

Notation : **traduction principale** | autres traductions. Les entrées à un sens reprennent les
particules de la fiche (aucune, sauf に pour すぐに) ; les entrées à deux sens n'en ont aucune, la
fiche n'en donnant pas.

### A. Fréquence et habitude (4)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| いつも | **Toujours** \| Habituellement \| En tout temps | temps › fréquence › fréquent | concept_abstrait |
| たいてい | **Généralement** \| La plupart du temps \| En général \| Presque toujours | temps › fréquence › fréquent | concept_abstrait |
| よく | 1. **Souvent** \| Fréquemment · 2. **Bien** \| Habilement | 1. temps › fréquence › fréquent · 2. aucune | concept_abstrait · propriete |
| 時々 | **Parfois** \| De temps en temps \| Quelquefois | temps › fréquence › occasionnel | concept_abstrait |

- **Fréquence** : catégorie et type de 毎日, 毎週 et des autres mots de fréquence validés (lots 00 et
  12). Aucune dimension : la fréquence est dite par la catégorie, et 毎日 n'en porte pas.
- **よく** (D1373) : deux sens, la fiche décrivant deux référents, la fréquence d'une action et la
  manière dont elle est faite (« bien / habilement »). « Habilement », que la fiche donne avec
  « bien » dans sa nuance, devient l'autre traduction du sens 2. Le sens 2 est sans catégorie
  (D1374), comme « Bon » de いい (D0065), en `propriete`. La remarque « issu de l'adjectif ii /
  yoi » n'est pas reprise (D1375) : une origine, comme celle de 初め (D1348).
- **たいてい** : l'exemple altéré (« じchiじ ») n'est pas repris (D1372).
- **時々** : la remarque sur le signe d'itération 々 n'est pas reprise (D1377) ; catégorie
  `occasionnel`, la fiche disant « de temps à autre ».

### B. Répétition (2)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| また | 1. **À nouveau** \| Encore · 2. **Aussi** \| De plus | aucune · aucune | concept_abstrait |
| もう一度 | **Encore une fois** \| Une autre fois \| De nouveau | aucune | concept_abstrait |

- **また** (D1378) : deux sens, la répétition (l'exemple) et l'ajout d'un élément (« lier des
  arguments »). La prise de congé (またね) est un emploi d'adresse, conservé en nuance du sens 1
  (doctrine du lot 16). Sans catégorie (D1379, D1380) : aucune catégorie ne nomme la répétition, et
  `temps › fréquence` dit combien souvent une chose arrive, non qu'elle arrive une fois de plus ;
  l'ajout est une relation de discours. La traduction fautive de l'exemple (« Regardons-nous ») n'est
  pas reprise ; seule « à bientôt », que la fiche donne aussi, l'est (D1382).
- **もう一度** : lecture corrigée (D1383, §5) ; un seul sens ; la demande de répétition est dite en
  nuance, sans fonction ; la composition que donne la fiche (もう et 一度) est conservée en nuance.
  Sans catégorie, comme また, sens 1 (D1385).

### C. Repères dans le déroulement (5)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| まだ | 1. **Encore** · 2. **Pas encore** | temps › relations temporelles | concept_abstrait |
| もう | 1. **Déjà** · 2. **Ne… plus** | temps › relations temporelles | concept_abstrait |
| すぐに | **Tout de suite** \| Immédiatement \| Aussitôt \| Sans tarder | temps › relations temporelles | concept_abstrait |
| 初めて | **Pour la première fois** | temps › chronologie › succession | concept_abstrait |
| だんだん | **Graduellement** \| Peu à peu \| Progressivement | aucune | concept_abstrait |

- **まだ** (D1386) : deux sens, un état qui se poursuit (encore), et une action attendue qui n'a
  pas eu lieu (pas encore), ce que l'exemple illustre. « Pas encore (lorsqu'il est associé à une
  négation) » perd sa parenthèse, une remarque d'emploi dite en nuance, comme « Commencer
  (intransitif) » (D1339).
- **もう** (D1388) : deux sens, ceux que la fiche développe : « déjà » (l'exemple) et « ne...
  plus ». « Ne… plus », la forme de la nuance de la fiche, remplace « Plus (avec une négation) »
  en traduction principale. « Encore (un de plus) », que ni la nuance ni l'exemple ne développent,
  n'est pas reprise en sens et est signalée en nuance de l'entrée (D1389).
- **まだ, もう, すぐに** : `temps › relations temporelles`, un niveau 2 sans niveau 3 : ces mots
  situent un état ou une action par rapport à un moment ou à un événement de référence.
- **すぐに** (D1391) : un sens ; la composition (すぐ et に) est dite en nuance ; すぐ n'est pas une
  entrée, rien n'est ajouté. L'exemple japonais, altéré (« きた まし た »), n'est pas repris ; sa
  traduction l'est (D1393).
- **初めて** (D1394) : la première d'une suite d'occurrences, `succession` ; « Pour la première
  occurrence », qui redit la principale, est abandonnée (D1395) ; la remarque d'origine
  (« hajimeru ») n'est pas reprise (D1396).
- **だんだん** (D1398) : sans catégorie (D1399) : la manière dont se fait un changement n'est ni
  une fréquence, ni une durée, ni une relation entre deux moments.

### D. Moment (1)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 早い | **Tôt** \| Précoce | temps (niveau 1) | propriete |

- Catégorie et type de « En retard », sens 2 de 遅い (lot 17), sans symétrie imposée. La distinction
  que fait la fiche avec 速い (rapide) est conservée en nuance (D1402), comme 居る et 要る se
  distinguent l'une l'autre (lot 20).

## 5. La lecture de もう一度

La fiche porte `もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</getKey></ruby>` : la balise qui ferme
`<rt>ど` est `</getKey>`. La correction (D1383) reprend la chaîne de l'exemple de la même fiche,
identique hors cette balise : `もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></ruby>`. Sa lecture
recomposée est もういちど, égale aux kana (A8, I4) ; kana `もういちど` et romaji `mouichido` sont ceux
de la fiche. Rien n'est segmenté autrement que la fiche ne le fait. Les sources figées ne sont pas
modifiées ; aucune liste fermée n'est touchée.

## 6. Choix à arbitrer

| N° | Choix proposé | Alternative |
|---|---|---|
| 1 | Fréquences (いつも, たいてい, よく 1, 時々) : `temps › fréquence`, `concept_abstrait`, comme 毎日 | — |
| 2 | Aucune dimension ; pas d'axe `habituel_exceptionnel` pour いつも ni たいてい | poser `habituel` pour いつも et たいてい |
| 3 | よく : deux sens (souvent ; bien) | un seul sens, « bien » en nuance |
| 4 | よく, sens 2 : « Habilement » en autre traduction, tirée de la nuance de la fiche | « Bien » seul |
| 5 | よく, sens 2 : `propriete`, sans catégorie | un autre type |
| 6 | Remarques d'origine non reprises (よく : « ii / yoi » ; 初めて : « hajimeru »), comme 初め (D1348) | garder pour よく la mention de いい, qui éclaire le sens 2 |
| 7 | 時々 : `occasionnel` ; la remarque sur 々 non reprise | `frequent` ; garder la remarque |
| 8 | また : deux sens (répétition ; ajout) ; la prise de congé en nuance | un seul sens, « aussi, de plus » en nuance |
| 9 | また, sens 1, et もう一度 : sans catégorie (la répétition n'est pas une fréquence) | `temps › fréquence`, au niveau 2 |
| 10 | また, sens 2 : sans catégorie ni fonction | — |
| 11 | もう一度 : furigana de l'exemple de la fiche (§5) | — |
| 12 | もう一度 : un sens ; la demande et la composition en nuance | ne pas garder la composition |
| 13 | まだ : deux sens (encore ; pas encore), « Pas encore » sans sa parenthèse | un seul sens, « pas encore » en autre traduction |
| 14 | もう : deux sens (déjà ; ne… plus), « Ne… plus » en principale du sens 2 ; « Encore (un de plus) » abandonnée et signalée en nuance | un troisième sens pour « encore un » ; ou un seul sens |
| 15 | まだ, もう, すぐに : `temps › relations temporelles` | `temps › chronologie`, ou sans catégorie |
| 16 | すぐに : un sens ; la composition en nuance ; la particule に de la fiche reprise mécaniquement (§7) | — |
| 17 | 初めて : `temps › chronologie › succession` | sans catégorie |
| 18 | だんだん : sans catégorie | `temps`, au niveau 1 |
| 19 | 早い : `temps` au niveau 1, `propriete` ; la distinction avec 速い en nuance | sans la mention de 速い |
| 20 | Exemples altérés et traduction fautive non repris (たいてい, すぐに, また) | — |
| 21 | Cinq catégories nulles (A5) | une catégorie pour certains, à nommer |

## 7. Ce qui est signalé sans être proposé

- **すぐに et sa particule** : la fiche range に dans `particles`, alors que に fait partie de la
  forme. Pour un sens unique, les particules sont mécaniques : l'ENTRY assemblée porte donc `に`.
  Rien n'est modifié ; à revoir à la passe finale 5.16, avec les furigana de 頼む.
- **Exemples altérés, pour le registre de phrases** : たいてい (« じchiじ »), すぐに (« きた まし
  た »), また (traduction « Regardons-nous »).
- **一緒** (hors du lot) : même défaut de furigana que もう一度 (`</guasubi>` au lieu de `</rt>`) ;
  il sera traité dans son lot.

## 8. Cohérence avec les lots validés

- **Fréquence** : 毎日, 毎晩, 毎朝, 毎週 (lot 12), 毎年, 毎月 (lot 00).
- **Adverbe de temps** : 近々 (lot 12), `concept_abstrait` ; c'est le seul à porter `deictique`, que
  l'arbitrage refuse à すぐに.
- **Pas de `deictique`** pour une succession ou un repère relatif : 次 (lot 20).
- **Propriété temporelle** : 遅い, sens 2 (lot 17), pour 早い.
- **Catégorie nulle d'une qualité générale** : いい (D0065), pour よく, sens 2.
- **Remarques d'origine non reprises** : 初め (D1348). **Remarques d'emploi retirées d'une
  traduction** : 始まる (D1339).
- **Emplois d'adresse en nuance** : 嫌, 悪い, 危ない (lot 16), pour la prise de congé de また.
- **Aucune décision validée n'est modifiée** ; いい n'est pas touchée.

## Suite prévue à la livraison

1. Relecture et arbitrage des 21 choix du §6, par ChatGPT, sur délégation de l'utilisateur.
2. Révision éventuelle, à sa place, sous les mêmes identifiants.
3. Validation atomique, puis commit, puis push, chacun sur un accord explicite et distinct.

## 9. Arbitrage des 21 choix et révision du 2026-10-06

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle ») : la
proposition est **retenue dans son ensemble**, avec trois corrections. Les autres choix du §6 sont
retenus tels que proposés.

| Point | Arbitrage | Révision |
|---|---|---|
| よく, sens 2 (choix 6) | conserver la remarque « issu de l'adjectif ii / yoi », seulement dans la nuance du sens 2, sous une formulation prudente fondée sur la fiche ; ni fusion avec いい, ni réouverture de `v_420`, ni relation | nuance du sens 2 : « Une action faite de manière approfondie ou satisfaisante. La fiche indique cet emploi « bien / habilement » comme issu de ii / yoi. » ; **D1375 réécrite à sa place** (`abandon` de « nuance » → `decision` sur « sens 2 · nuance ») |
| また, sens 2 « Aussi / De plus » (choix 10) | garder `category: null` et aucune fonction ; **`semantic_type: null`** : un emploi discursif, que A2-ST ne type pas, `concept_abstrait` ne devant pas servir de type de secours (A6) | `semantic_type: null` ; **D1403 ajoutée à la fin** du journal (`type-nul`, « sens 2 · semantic_type »), citée par また |
| D1378 (また) | resserrer la raison : « emploi de prise de congé » au lieu d'« emploi d'adresse » ; ni `discours` ni `politesse` | **D1378 réécrite à sa place** : la qualification, et le type du sens 2, renvoyé à D1403 |

**Vérifié après la révision** :
- les 12 entrées et les 34 décisions du lot sont toutes `proposed` ;
- les 1 369 décisions validées sont identiques à l'octet ;
- dans le journal, deux décisions réécrites à leur place (D1375, D1378), une ajoutée à la fin
  (D1403) ; identifiants, entrées, lots, statuts et dates des 33 décisions d'avant inchangés ;
- dans le lot, trois changements et eux seuls : la nuance de よく, sens 2 ; le type de また, sens 2 ;
  la citation de D1403 par また ;
- **état réel inchangé** : 638 ENTRY, 32 retraits, 49 écartées (37 non décidées, 12 propositions),
  0 problème, 0 erreur, 0 attente ;
- **essai à blanc** : 650 ENTRY, 32 retraits, 37 écartées, 0 problème, 0 erreur, 0 attente, **140
  avertissements** : 5 catégories nulles et 1 type nul (また, sens 2), tous justifiés au journal ;
- **472 tests verts** ; test d'état du lot renforcé sur chaque point révisé ;
- **41 sabotages attrapés** : les 30 de la livraison, rejoués (celui de la remarque d'origine
  adapté), et 11 sur la révision (remarque ii / yoi retirée, déplacée hors du sens 2 ou non
  attribuée à la fiche ; D1375 remise en abandon ; また, sens 2, remis en `concept_abstrait` ou typé
  autrement ; D1403 non citée, supprimée ou validée ; « emploi d'adresse » remis dans D1378 ; type
  du sens 2 non dit dans D1378 ; fonction posée sur また, sens 2), chacun vérifié comme modifiant
  réellement son fichier, puis rétabli à l'octet près ;
- `check-layers` sans violation ; `validate-data` : 0 erreur ; sources conformes au manifeste.

**Vérification ciblée de la révision : terminée et favorable** (ChatGPT, 2026-10-06), sur les
exports d'avant et d'après : les trois changements de `lot-21.json` et eux seuls ; D1375 et D1378
réécrites à leur place ; D1403 ajoutée en fin de journal ; 12 entrées, 16 sens, 34 décisions, toutes
`proposed` ; aucune dimension, relation ni fonction ajoutée ; corrections de gouvernance cohérentes.
Aucune correction supplémentaire. **Prochaine étape : la validation atomique, sur autorisation
explicite** ; ni validation, ni commit, ni push ne sont autorisés à ce stade.

**Décomptes révisés** : 34 décisions (12 `decision` de sens, 2 `abandon` de sens, 5
`categorie-nulle`, 1 `type-nul`, 6 décisions de fonction, 1 `correction` de lecture, 2 `decision`
de nuance, 5 `abandon` de nuance).

## 10. Diff complet de la révision

Différence entre la proposition relue et la version révisée, pour `lot-21.json` et `journal.json`.

```diff
diff  lot-21.json (avant révision → après)
--- a/reconstruction/a2-04/lots/lot-21.json
+++ b/reconstruction/a2-04/lots/lot-21.json
@@ -132,5 +132,5 @@
             },
             "particles": [],
-            "nuance": "Une action faite de manière approfondie ou satisfaisante."
+            "nuance": "Une action faite de manière approfondie ou satisfaisante. La fiche indique cet emploi « bien / habilement » comme issu de ii / yoi."
           }
         ]
@@ -182,5 +182,6 @@
         "A2-04-D1380",
         "A2-04-D1381",
-        "A2-04-D1382"
+        "A2-04-D1382",
+        "A2-04-D1403"
       ],
       "fields": {
@@ -218,5 +219,5 @@
             },
             "category": null,
-            "semantic_type": "concept_abstrait",
+            "semantic_type": null,
             "dimensions": [],
             "relations": [],
diff  journal.json (avant révision → après)
--- a/reconstruction/a2-04/journal.json
+++ b/reconstruction/a2-04/journal.json
@@ -19361,7 +19361,7 @@
     "entry": "n5_v_506",
-    "field": "nuance",
-    "kind": "abandon",
+    "field": "sens 2 · nuance",
+    "kind": "decision",
     "before": "remarque de la source : « issu de l'adjectif ii / yoi »",
-    "after": null,
-    "reason": "Une remarque sur l'origine du mot : ce n'est pas un emploi, et elle n'est pas reprise, comme celle de 初め (D1348). L'arbitrage du périmètre du lot 21 qualifie ce lien d'origine, non de relation sémantique : aucune relation, aucune candidate à 5.16."
+    "after": "mention conservée en nuance du sens 2, attribuée à la fiche",
+    "reason": "La remarque de la fiche est conservée, seulement dans la nuance du sens 2 « Bien / Habilement », et attribuée à la fiche : « La fiche indique cet emploi « bien / habilement » comme issu de ii / yoi. » (arbitrage des choix du lot 21). Elle éclaire le sens 2 sans rien ajouter par connaissance externe. Elle ne crée ni fusion avec いい, ni réouverture de v_420, ni relation : l'arbitrage du périmètre du lot 21 qualifie ce lien d'origine, non de relation sémantique ; aucune candidate à 5.16."
   },
@@ -19413,3 +19413,3 @@
     ],
-    "reason": "Deux sens, sur la fiche, qui décrit deux référents : « la répétition d'une action ou le retour d'un état » (à nouveau, encore), ce que l'exemple illustre, et le fait de « lier des arguments » (aussi, de plus), c'est-à-dire d'ajouter un élément. La prise de congé (« mata ne ») est un emploi d'adresse : elle est conservée en nuance du sens 1, sans sens ni fonction (doctrine du lot 16). Type concept_abstrait pour les deux. La fiche ne donne aucune particule : aucune pour les deux sens."
+    "reason": "Deux sens, sur la fiche, qui décrit deux référents : « la répétition d'une action ou le retour d'un état » (à nouveau, encore), ce que l'exemple illustre, et le fait de « lier des arguments » (aussi, de plus), c'est-à-dire d'ajouter un élément. L'emploi de prise de congé (« mata ne ») est conservé en nuance du sens 1, sans sens ni fonction (doctrine du lot 16) ; ni discours ni politesse n'est posée. Type concept_abstrait pour le sens 1 ; le sens 2 est sans type (D1403, A6). La fiche ne donne aucune particule : aucune pour les deux sens."
   },
@@ -19738,2 +19738,14 @@
     "reason": "La fiche distingue elle-même 早い de 速い (rapide, lot 17) : la mention est conservée en nuance, comme 居る et 要る se distinguent l'une l'autre (lot 20). L'arbitrage du périmètre du lot 21 la qualifie de distinction, non de relation sémantique : aucune relation, aucune candidate à 5.16."
+  },
+  {
+    "id": "A2-04-D1403",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-21",
+    "entry": "n5_v_500",
+    "field": "sens 2 · semantic_type",
+    "kind": "type-nul",
+    "before": "concept_abstrait",
+    "after": null,
+    "reason": "Aucun type (arbitrage des choix du lot 21) : la proposition rangeait ce sens en concept_abstrait. La fiche décrit un emploi discursif, qui sert à lier des arguments, à ajouter un élément à ce qui précède ; A2-ST décrit des entités, des occurrences, des conditions et des abstractions, non des fonctions de discours, et concept_abstrait ne doit pas servir de type de secours. Aucun type terminal existant ne décrit correctement ce sens. Le sens reste sans catégorie (D1380) et sans fonction (D1381), connecteur n'ayant pas de définition normative. Addendum A6."
   }
```
