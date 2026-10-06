# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 19 « Vie quotidienne, travail et échanges » · proposition

**Date** : 2026-10-06
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 26 entrées du lot et ses 61
décisions de journal. Rien n'est validé, rien n'est commité.

**Version** : révisée le 2026-10-06 après l'arbitrage des 22 choix (§8). Le texte ci-dessous décrit
la proposition révisée ; le tableau du §5 reste celui qui a été relu.

**État** : les 22 choix du §5 sont **arbitrés** (par ChatGPT, sur délégation de l'utilisateur) : dix-huit retenus tels que proposés,
quatre révisés (§8). Le lot est **validé** depuis le 2026-10-06 (`docs/rapports/etape2-A2-04-lot19-valide.md`). Ce rapport reste la
proposition telle qu'elle a été relue : les mentions « proposed » et l'essai à blanc y décrivent
l'état d'avant la validation.

**À lire avec** : `reconstruction/a2-04/rapports/lot-19.md` (rapport généré, entrée par entrée) et
`docs/rapports/etape2-A2-04-lot19-perimetre.md` (périmètre arbitré, §7).

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Aucun sens,
aucune lecture, aucune graphie, aucune particule, aucune relation n'est ajouté par connaissance
externe.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-19.json` | nouveau : 26 entrées, toutes `proposed`, aucun ajout, aucun retrait |
| `reconstruction/a2-04/journal.json` | 61 décisions `proposed`, D1241 à D1301, ajoutées à la fin (D1299 à D1301 à la révision) ; les 1 240 décisions validées sont identiques |
| `reconstruction/a2-04/rapports/lot-19.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | cinq tests adaptés (espace de travail réel, lots 17 et 18 dans l'assemblage réel, lot 18, journal), deux tests ajoutés |
| Autres lots, règles, validateur, registres, sources figées | inchangés |

**Sens** : 34, pour 26 entrées. Huit entrées ont deux sens (起きる, 寝る, 休む, 上げる, 渡す, 頼む,
吸う, 煙草) ; dix-huit en ont un seul.

| Nature | Champ | Nombre |
|---|---|---|
| `decision` | sens | 13 |
| `abandon` | sens (traductions écartées) | 12 |
| `categorie-nulle` | catégorie d'un sens (A5) | 15 |
| `decision` | type sémantique d'un sens | 4 |
| `decision` | `suru_compatible` | 3 |
| `decision` | relations (candidates à 5.16) | 3 |
| `correction` | lecture | 2 |
| `decision` | lecture (頼む : anomalie inscrite, rien de décidé) | 1 |
| `decision` | graphie | 1 |
| `decision` | entrée (コピーする conservée) | 1 |
| `decision` | nuance (起こす, nommé par la fiche de 起きる) | 1 |
| `abandon` | nuance (explications de kanji, exemple fautif) | 5 |

Aucune forme usuelle, aucune classe, aucun tag, aucune relation, aucune dimension ni aucune
fonction linguistique n'est décidé.

## 2. L'arbitrage du périmètre, tel qu'il est appliqué

1. **Périmètre** : les 26 identifiants arbitrés, dans l'ordre du rapport de périmètre ; le groupe E
   est dans le lot.
2. **Relations** : `relations: []` pour les 33 sens. Trois décisions inscrivent les candidates à
   l'audit de 5.16 :

   | Paire | Relation à examiner | Décisions |
   |---|---|---|
   | 貸す / 借りる | `reciprocal_with` | D1265 (貸す), D1268 (借りる) |
   | 渡す / 渡る | `transitive_of` / `intransitive_of` | D1275 (渡す) ; 渡る, validée au lot 04, n'est pas modifiée |

   Aucune relation pour 起きる / 起こす : 起こす n'est pas une entrée des sources. La mention de la
   fiche est gardée en nuance (D1242).
3. **頼む** : `READING_EXCEPTION_IDS` n'est pas modifiée, aucune règle ne l'est. La lecture reste
   mécanique, avec les furigana de la source (たノ). D1278 inscrit l'anomalie pour la passe finale ;
   elle ne décide aucun champ de l'ENTRY. **Vérifié à l'essai à blanc** : le validateur accepte ces
   furigana, A8 comparant les kana par une clé qui rapproche hiragana et katakana
   (`tools/lexicon/entry.mjs`, `kanaKey`). Le périmètre laissait ce point ouvert.
4. **コピーする** : ENTRY conservée telle quelle (D1259), forme, classe `verbe` et groupe `suru`
   mécaniques. L'exemple de la source n'est pas repris (D1262).
5. **`suru_compatible`** : `true` pour 結婚 (D1282) et 生活 (D1288), `false` pour 仕事 (D1253).
6. **État résultant, fiche par fiche** : en nuance pour 立つ (D1246), 座る (D1244) et 疲れる
   (D1250) ; « Dormir » reste un sens de 寝る (D1243) ; 起きる est examinée sur sa propre fiche
   (D1241).

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la proposition (commit `213fb2b`) | 590 | 32 | 97 | 0 | 0 | 0 |
| **Réel**, proposition en cours | **590** | 32 | 97 (71 non décidées, 26 propositions) | 0 | 0 | 0 |
| **Essai à blanc**, tout supposé validé, en mémoire | **616** | **32** | **71** | 0 | 0 | 0 |

- **L'état réel ne change pas** tant que rien n'est validé.
- **Essai à blanc** : 616 = 590 + 26. Vingt verbes et six noms, sans relation ; 渡る et 渡す, 休む
  et 休み restent des ENTRY distinctes.
- **Avertissements à l'essai à blanc** : 113, soit 15 de plus, tous des `categorie-nulle`
  justifiées au journal.
- **Tests** : 468 réussis, 0 échec (466 avant ; deux tests ajoutés : l'état du lot 19 proposé,
  l'essai à blanc). Un test du lot 18 a été borné : il interdisait à tout autre lot de citer une
  décision à partir de D1168, ce que le lot 19 fait légitimement avec les siennes.
- **Sabotages** : 43 joués après la révision (les 34 de la livraison, rejoués, et 9 sur les quatre
  points révisés), tous attrapés, chacun vérifié comme modifiant réellement son fichier,
  puis rétabli à l'octet près (empreintes contrôlées). Entrée ou décision validée sans
  autorisation ; relation posée contre l'arbitrage ; candidate effacée ; 渡る rouverte ; lecture de
  頼む décidée, ou son anomalie retirée du journal ; コピーする changée en nom ; `suru_compatible`
  inversé (仕事, 生活, 結婚) ; état résultant remis parmi les traductions, ou retiré de la nuance ;
  « Dormir » rabattu ; lectures remises aux furigana fautifs, ou retirées ; particule tirée d'un
  exemple ; catégorie nulle sans justification ; traduction abandonnée remise, ou perdue ; exemple
  fautif repris ; graphie retirée ; forme usuelle changée ; décision d'un lot clos rouverte ;
  décision supprimée ; type ou catégorie changés ; entrée ajoutée ou retirée ; sens retiré.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 4. Les choix lexicaux, groupe par groupe

Notation : **traduction principale** | autres traductions ; les particules entre parenthèses sont
celles des entrées à plusieurs sens (les autres reprennent celles de la fiche).

### A. Le rythme de la journée et le corps (6)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 起きる | 1. **Se réveiller** (aucune) · 2. **Se lever** \| Sortir du lit (aucune) | sommeil et repos | evenement · action |
| 寝る | 1. **Dormir** (aucune) · 2. **Se coucher** \| Aller au lit (aucune) | sommeil et repos | etat · action |
| 座る | **S'asseoir** \| Prendre place (« être assis » en nuance) | aucune | action |
| 立つ | **Se lever** \| Se dresser (« être debout » en nuance) | aucune | action |
| 休む | 1. **Se reposer** \| Faire une pause (aucune) · 2. **S'absenter** \| Prendre un congé (を) | sommeil et repos · aucune | action |
| 疲れる | **Se fatiguer** \| S'épuiser (« être fatigué », 疲れている, en nuance) | fatigue et énergie physique | processus |

- **起きる et 寝る** : deux sens chacune. La fiche de 起きる dit « sortir du sommeil **ou** se lever
  le matin », celle de 寝る « se coucher **ou** dormir » ; chaque exemple se traduit par l'un et
  l'autre. Ce ne sont pas un événement et son état résultant : on se réveille sans se lever, on se
  couche sans dormir. Aucune fiche ne donne de particule ; aucune n'est établie.
- **座る, 立つ** : aucune catégorie du registre ne nomme les postures du corps.
- **休む** : を est rattachée à l'absence, que la fiche illustre (« kaisha o yasumu ») ; に, que la
  fiche donne sans l'illustrer, n'est rattachée à aucun sens.
- **寝る** (D1243, révisée) : « Dormir » est un `etat`, la condition de sommeil elle-même ; « Se
  coucher » une `action`.
- **疲れる** (D1250, révisée) : type `processus`, une évolution vers la fatigue ; l'état résultant
  reste dit à part, en nuance, par 疲れている.

### B. Le travail (5)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 働く | **Travailler** \| Exercer un emploi | travail et emploi › activité professionnelle | action |
| 勤める | **Travailler pour** \| Être employé par \| Exercer un emploi dans | travail et emploi › emploi | action |
| 仕事 | **Travail** \| Emploi \| Profession | travail et emploi › activité professionnelle | action |
| 会社 | **Entreprise** \| Société \| Compagnie | entreprises et organisations › entreprises | organisation |
| コピーする | **Photocopier** \| Faire une copie | aucune | action |

- **会社** : type `organisation`, quand 銀行, 店 et 学校 sont validés en `lieu` ; la fiche décrit
  une société, non un bâtiment.
- **Écartées** : « Œuvrer », « Tâche professionnelle » (glose), « Bureau (par extension) » (non
  développée, signalée en nuance), « Dupliquer ». Les explications de kanji de 仕事 et de 会社 ne
  sont pas reprises.

### C. Donner, prêter, rendre, demander (6)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 上げる | 1. **Donner** \| Offrir (を, に) · 2. **Lever** \| Monter (を) | interactions sociales · monter, descendre | action |
| 貸す | **Prêter** \| Louer (à quelqu'un) | aucune | action |
| 借りる | **Emprunter** \| Louer | aucune | action |
| 返す | **Rendre** \| Restituer \| Rembourser | aucune | action |
| 渡す | 1. **Remettre** \| Donner en main propre (を, に) · 2. **Faire traverser** (を) | aucune · parcours et trajectoire | action |
| 頼む | 1. **Demander** (を) · 2. **Commander (un plat au restaurant)** (を) | interactions sociales · achat et vente › commande | action |

- **Lecture de 借りる** (D1266) : furigana de la source sur 借る ; か sur 借, り en okurigana.
- **返す** : un seul sens, trois objets (un objet emprunté, la monnaie, une somme).
- **渡す** : « faire traverser » est nommé par la nuance sans plus de détail ; second sens candidat.
- **頼む** : « Prier / confier une tâche » réunit deux emplois ; « faire une prière », que la nuance
  cite sans le développer, est signalé en nuance.
- **Écartées** : « Renvoyer » (non développée, signalée en nuance), « Transférer ».

### D. Rencontrer, attendre, vivre (6)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 会う | **Rencontrer** \| Voir quelqu'un | interactions sociales | action |
| 待つ | **Attendre** \| Patienter | aucune | action |
| 結婚 | **Mariage** | couple et relations intimes › mariage | evenement |
| 生まれる | **Naître** \| Venir au monde | cycle de vie › naissance | evenement |
| 死ぬ | **Mourir** \| Décéder | aucune | evenement |
| 生活 | **Mode de vie** \| Vie quotidienne \| Subsistance \| Existence | aucune | concept_abstrait |

- **Lecture de 待つ** (D1280) : furigana まつ sur 待, suivis de つ ; ま sur 待.
- **死ぬ** (D1299, ajoutée à la révision) : sans catégorie. La fiche décrit « l'action biologique de
  cesser de vivre », et son exemple porte sur un chien : le cycle de vie humain serait artificiel.
  生まれる garde « naissance » : sa fiche et son exemple portent sur une personne.
- **結婚** : « Se marier » est la traduction de 結婚する ; elle est portée par `suru_compatible` et
  dite en nuance.
- **生まれる** : particule に de la fiche, mécanique ; le で de l'exemple n'est pas ajouté.
- **Écartées** : « Faire la rencontre de », « Périr ».

### E. Fumer (3)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 吸う | 1. **Fumer** (を) · 2. **Aspirer** \| Inhaler (を) | aucune | action |
| 煙草 | 1. **Cigarette** (aucune) · 2. **Tabac** (aucune) | aucune | objet_artefact · substance_matiere |
| 灰皿 | **Cendrier** | habitat › accessoires domestiques | objet_artefact |

- **煙草** (D1300 et D1301, ajoutées à la révision) : deux sens. La fiche dit que le nom désigne
  « le tabac ou une cigarette » : un objet et une matière, deux référents de types différents.
- **煙草** : たばこ devient une autre graphie (D1294), la fiche la donnant pour la plus courante.
  La forme usuelle (煙草) et le découpage des furigana (たば, こ) sont mécaniques et restent ceux de
  la source ; signalés pour la passe finale.
- **Écartées** : « Cigare » (non développée, signalée en nuance), la glose de 灰皿.

## 5. Choix à arbitrer

**Arbitrés le 2026-10-06** (§8). Le tableau ci-dessous est celui qui a été relu : ses lignes 2, 5,
16 et 19 décrivent la proposition d'avant la révision.

| N° | Choix proposé | Alternative |
|---|---|---|
| 1 | 起きる : deux sens (se réveiller, `evenement` ; se lever, `action`) | un seul sens, « Se réveiller \| Se lever » |
| 2 | 寝る : deux sens (dormir ; se coucher), `action` tous deux | un seul sens ; ou `etat` pour « Dormir » |
| 3 | 座る, 立つ : un seul sens, l'état résultant en nuance ; sans catégorie | espace › mouvement et déplacement |
| 4 | 休む : deux sens ; を pour l'absence, aucune particule pour le repos, に non rattachée ; l'absence sans catégorie | un seul sens ; に rattachée ; conditions de travail › congés |
| 5 | 疲れる : un seul sens, `evenement` ; « être fatigué » en nuance | `etat` ou `processus` |
| 6 | 働く dans « activité professionnelle », 勤める dans « emploi » ; `action` pour les deux | même catégorie ; `etat` pour 勤める |
| 7 | 仕事 : un seul sens, `action` ; la « tâche à accomplir » en nuance | un second sens pour la tâche |
| 8 | 会社 : `organisation` | `lieu`, comme 銀行 |
| 9 | コピーする : sans catégorie | une catégorie de travail ou de technologie |
| 10 | 上げる : deux sens (donner ; lever) ; le don dans interactions sociales | un seul sens ; le don sans catégorie |
| 11 | 貸す, 借りる, 返す, 渡す (sens 1) : sans catégorie | économie et commerce › transactions, pour tout ou partie |
| 12 | 返す : un seul sens | un second sens pour l'argent |
| 13 | 渡す : deux sens (remettre ; faire traverser) | un seul sens, « faire traverser » signalée en nuance |
| 14 | 頼む : deux sens (demander ; commander) ; la commande dans achat et vente › commande | un seul sens ; alimentation › restauration |
| 15 | 会う, 頼む (sens 1), 上げる (sens 1) : relations sociales › interactions sociales | sans catégorie |
| 16 | 結婚, 生まれる, 死ぬ : `evenement` | `action` pour 結婚 |
| 17 | 生活 : `concept_abstrait`, sans catégorie | habitat et vie domestique |
| 18 | 吸う : deux sens (fumer ; aspirer), sans catégorie | un seul sens |
| 19 | 煙草 : graphie たばこ ajoutée ; `objet_artefact`, sans catégorie | sans graphie ajoutée |
| 20 | 起こす, nommé et expliqué par la fiche de 起きる : mention gardée en nuance | la retirer |
| 21 | Traductions non développées signalées en nuance : bureau, renvoyer, cigare ; emploi non développé : faire une prière | les abandonner sans les signaler |
| 22 | Forme de la décision D1278 (頼む) : nature `decision`, champ `readings`, qui ne décide aucun champ | l'inscrire seulement au suivi |

## 6. Cohérence avec les lots validés

- **État résultant** : 入る (D0340), 開く et 閉まる (lot 18).
- **Types** : `evenement` suit 忘れる (lot 06), 止まる (lot 04) et 旅行 (lot 09) ; `action` pour les
  noms d'activité suit 散歩, 掃除 et 料理.
- **`suru_compatible`** : `true` seulement quand la fiche établit Nする (散歩, 旅行).
- **Catégories reprises** : 渡る (lot 04) pour le sens 2 de 渡す ; 登る et 降りる pour le sens 2 de
  上げる.
- **Graphie en kana** : comme おなか, くだもの (lot 0).
- **Aucune décision validée n'est modifiée** ; 渡る et 休み ne sont pas touchées.

## 7. Suite

1. Vérification ciblée des quatre corrections du §8, et de l'absence de mouvement ailleurs.
2. Validation atomique, puis commit, chacun sur un accord explicite et distinct. Aucun push n'est
   fait.

## 8. Arbitrage des 22 choix et révision du 2026-10-06

**Arbitrage par ChatGPT, sur délégation de l'utilisateur**, après relecture des 26 fiches, des 26 entrées et des 58 décisions.

| Choix | Arbitrage |
|---|---|
| 1 · 起きる | retenu : deux sens, `evenement` et `action` |
| 2 · 寝る | deux sens retenus ; **type révisé** : « Dormir » en `etat` |
| 3 · 座る, 立つ | retenu : un sens d'action, état résultant en nuance, sans catégorie |
| 4 · 休む | retenu : deux sens ; を pour l'absence, に non rattachée ; l'absence sans catégorie |
| 5 · 疲れる | un seul sens retenu ; **type révisé** : `processus` |
| 6 à 15 · 働く, 勤める, 仕事, 会社, コピーする, 上げる, verbes de prêt, 返す, 渡す, 頼む, interactions sociales | retenus |
| 16 · 結婚, 生まれる, 死ぬ | `evenement` retenu ; **catégorie de 死ぬ révisée** : aucune |
| 17 · 生活 | retenu |
| 18 · 吸う | retenu : deux sens, sans catégorie |
| 19 · 煙草 | graphie たばこ retenue ; **sens révisés** : deux sens, « Cigarette » et « Tabac » |
| 20 · 起こす en nuance | retenu |
| 21 · traductions non développées en nuance | retenu |
| 22 · D1278 (頼む) | retenue telle quelle |

**La révision, sur ces quatre points seulement** :

| Point | Entrée | Avant | Après | Journal |
|---|---|---|---|---|
| 1 | 寝る | « Dormir », `action` | « Dormir », `etat` | D1243, raison réécrite à sa place |
| 2 | 疲れる | `evenement` | `processus` | D1250, raison réécrite à sa place |
| 3 | 死ぬ | être humain › cycle de vie › mort | aucune catégorie | **D1299, nouvelle** (`categorie-nulle`) ; D1286, raison réécrite |
| 4 | 煙草 | un sens, Cigarette \| Tabac, `objet_artefact` | deux sens : Cigarette (`objet_artefact`), Tabac (`substance_matiere`), sans catégorie | **D1300** (sens) et **D1301** (`categorie-nulle` du sens 2), nouvelles ; D1295, raison réécrite |

**Deux réécritures qui découlent de l'arbitrage sans y être nommées**, à contrôler :

- **D1286** (死ぬ, type) : sa raison disait aussi « Catégorie : être humain › cycle de vie ›
  mort ». Cette phrase aurait contredit D1299 ; elle est retirée, et la raison renvoie à D1299. Le
  type `evenement` qu'elle décide est inchangé.
- **D1295** (煙草, catégorie nulle du sens 1) : sa raison disait « Une cigarette, du tabac » ; elle
  ne parle plus que de la cigarette, le tabac ayant sa propre décision (D1301).

**Ce qui n'a pas bougé**, contrôlé par script au moment de l'écriture :

- 22 entrées sur 26 sont identiques ; dans les quatre autres, **seul le champ `senses` change**
  (nuances, graphies, lectures, `suru_compatible` identiques), et elles restent `proposed` ;
- 54 des 58 décisions d'origine sont identiques ; pour D1243, D1250, D1286 et D1295, **seule la
  raison change** (identifiant, statut, date, lot, entrée, champ, nature, « avant » et « après »
  inchangés) ;
- les 1 240 décisions validées sont identiques ; aucun autre lot n'est touché ;
- aucune relation, aucune règle ; les trois candidates à 5.16, D1278 (頼む), les lectures, les
  particules des autres entrées et les trois `suru_compatible` sont inchangés.

**Contrôles après révision** : état réel 590 ENTRY, 32 retraits, 97 entrées écartées ; essai à
blanc 616, 32, 71, sans problème ni erreur, 113 avertissements (15 catégories nulles pour le lot) ;
468 tests réussis ; 43 sabotages attrapés. Le test d'état vérifie les quatre points, leurs raisons,
et que D1286 ne parle plus de cycle de vie.

## 9. Diff complet de la révision

Comparaison ligne à ligne entre la proposition relue (copies gardées hors dépôt au moment de la
révision) et l'état actuel, avec une ligne de contexte. **C'est toute la révision** : aucune autre
ligne des deux fichiers n'a changé.

### `reconstruction/a2-04/lots/lot-19.json` (寝る, 疲れる, 死ぬ, 煙草)

```diff
@@ -86,3 +86,3 @@
             },
-            "semantic_type": "action",
+            "semantic_type": "etat",
             "dimensions": [],
@@ -271,3 +271,3 @@
             },
-            "semantic_type": "evenement",
+            "semantic_type": "processus",
             "dimensions": [],
@@ -918,3 +918,4 @@
         "A2-04-D1286",
-        "A2-04-D1287"
+        "A2-04-D1287",
+        "A2-04-D1299"
       ],
@@ -935,7 +936,3 @@
             },
-            "category": {
-              "level_1": "etre_humain",
-              "level_2": "cycle_de_vie",
-              "level_3": "mort"
-            },
+            "category": null,
             "semantic_type": "evenement",
@@ -1048,3 +1045,5 @@
         "A2-04-D1295",
-        "A2-04-D1296"
+        "A2-04-D1296",
+        "A2-04-D1300",
+        "A2-04-D1301"
       ],
@@ -1066,5 +1065,3 @@
               "primary": "Cigarette",
-              "alternatives": [
-                "Tabac"
-              ]
+              "alternatives": []
             },
@@ -1077,3 +1074,19 @@
               "pragmatic_discourse": []
-            }
+            },
+            "particles": []
+          },
+          {
+            "meaning": {
+              "primary": "Tabac",
+              "alternatives": []
+            },
+            "category": null,
+            "semantic_type": "substance_matiere",
+            "dimensions": [],
+            "relations": [],
+            "linguistic_functions": {
+              "grammatical": [],
+              "pragmatic_discourse": []
+            },
+            "particles": []
           }
```

### `reconstruction/a2-04/journal.json` (D1243, D1250, D1286, D1295 réécrites ; D1299 à D1301 ajoutées)

```diff
@@ -17527,3 +17527,3 @@
     ],
-    "reason": "Deux sens proposés, sur la fiche entière. « Dormir » n'est pas rabattu sur un état résultant (arbitrage du périmètre du lot 19) : c'est la traduction principale de la source et l'emploi central de la fiche, qui décrit « l'action de se coucher ou de dormir pour se reposer » ; son exemple se traduit par l'un et l'autre (« je dors (je vais me coucher) à 23 heures »). Dormir n'est pas non plus l'état qui résulte de se coucher : on se couche sans dormir. Deux référents, le sommeil et la mise au lit, comme les deux sens proposés pour 起きる. L'ordre suit les traductions de la source. Type action pour les deux, la fiche disant « l'action » de l'un comme de l'autre ; même catégorie, états et besoins physiques › sommeil et repos. La fiche ne donne aucune particule. Sens 2 candidat ; alternatives laissées à l'arbitrage : un seul sens, « Dormir | Se coucher » ; ou le type etat pour « Dormir »."
+    "reason": "Deux sens, sur la fiche entière. « Dormir » n'est pas rabattu sur un état résultant (arbitrage du périmètre du lot 19) : c'est la traduction principale de la source et l'emploi central de la fiche, qui décrit « l'action de se coucher ou de dormir pour se reposer » ; son exemple se traduit par l'un et l'autre (« je dors (je vais me coucher) à 23 heures »). Dormir n'est pas non plus l'état qui résulte de se coucher : on se couche sans dormir. Deux référents, le sommeil et la mise au lit, comme les deux sens de 起きる. L'ordre suit les traductions de la source. Types (arbitrage des choix du lot 19) : etat pour « Dormir », qui désigne la condition de sommeil elle-même ; action pour « Se coucher », l'action de se mettre au lit. Même catégorie pour les deux, états et besoins physiques › sommeil et repos. La fiche ne donne aucune particule."
   },
@@ -17630,3 +17630,3 @@
     "after": "un seul sens ; « Être fatigué » en nuance",
-    "reason": "Un seul sens : se fatiguer. « Être fatigué » est l'état qui en résulte : la fiche dit elle-même qu'il s'exprime par la forme 疲れている. Il n'est ni une autre traduction ni un second sens ; il est conservé en nuance, avec cette forme (arbitrage du périmètre du lot 19). Type proposé : evenement, un changement qui survient à quelqu'un sans qu'il l'accomplisse, comme 忘れる (lot 06) et 開く (lot 18) ; l'exemple de la fiche est au passé (« je me suis fatigué »). La fiche parle pourtant d'un verbe « décrivant l'état de fatigue » : alternatives laissées à l'arbitrage, le type etat, ou processus. Catégorie : états et besoins physiques › fatigue et énergie physique."
+    "reason": "Un seul sens : se fatiguer. « Être fatigué » est l'état qui en résulte : la fiche dit elle-même qu'il s'exprime par la forme 疲れている. Il n'est ni une autre traduction ni un second sens ; il est conservé en nuance, avec cette forme (arbitrage du périmètre du lot 19). Type processus (arbitrage des choix du lot 19) : la fiche décrit une évolution vers la fatigue, ce qui est plus proche d'un processus que d'un événement ponctuel ou d'un état ; l'état résultant reste dit à part, en nuance. Catégorie : états et besoins physiques › fatigue et énergie physique."
   },
@@ -18112,3 +18112,3 @@
     "after": "evenement",
-    "reason": "Type evenement, comme 生まれる dans ce lot : mourir survient à un être vivant. Catégorie : être humain › cycle de vie › mort, bien que l'exemple porte sur un chien : la fiche décrit « l'action biologique de cesser de vivre », et le registre n'a pas d'autre place pour la mort. La remarque de conjugaison de la fiche (verbe en -nu) est résumée en nuance."
+    "reason": "Type evenement, comme 生まれる dans ce lot : mourir survient à un être vivant. La catégorie de ce sens est décidée à part (D1299). La remarque de conjugaison de la fiche (verbe en -nu) est résumée en nuance."
   },
@@ -18231,3 +18231,3 @@
     "after": null,
-    "reason": "Une cigarette, du tabac : aucune catégorie du registre ne les nomme. Objet sans domaine thématique propre. Addendum A5."
+    "reason": "Une cigarette : aucune catégorie du registre ne la nomme. Objet sans domaine thématique propre. Addendum A5."
   },
@@ -18272,2 +18272,45 @@
     "reason": "Une part de la nuance de la source explique la composition du mot en kanji : ce n'est pas un emploi du mot, et elle n'est pas reprise (comme pour 暗い, lot 17)."
+  },
+  {
+    "id": "A2-04-D1299",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-19",
+    "entry": "n5_v_558",
+    "field": "sens 1 · category",
+    "kind": "categorie-nulle",
+    "before": "etre_humain › cycle_de_vie › mort",
+    "after": null,
+    "reason": "Aucune catégorie (arbitrage des choix du lot 19) : la proposition rangeait ce sens dans être humain › cycle de vie › mort. La fiche décrit « l'action biologique de cesser de vivre », et son exemple porte sur un chien : classer le verbe entier dans le cycle de vie humain serait artificiel, et le registre n'a pas de catégorie générale de la mort qui convienne au sens documenté. 生まれる, dans ce lot, garde naissance : sa fiche et son exemple portent sur une personne. Addendum A5."
+  },
+  {
+    "id": "A2-04-D1300",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-19",
+    "entry": "n5_v_598",
+    "field": "senses",
+    "kind": "decision",
+    "before": [
+      "Cigarette",
+      "Tabac",
+      "Cigare"
+    ],
+    "after": [
+      "S1 Cigarette",
+      "S2 Tabac"
+    ],
+    "reason": "Deux sens (arbitrage des choix du lot 19) : la proposition les réunissait en un seul, « Cigarette | Tabac ». La fiche dit que le nom désigne « le tabac ou une cigarette » : ce sont deux référents de types différents, un objet (objet_artefact) et une matière (substance_matiere), comme les deux sens de 料理 (lot 02, une activité et un plat). L'ordre suit les traductions de la source. La fiche ne donne aucune particule. « Cigare » reste abandonné (D1296) et signalé en nuance. La graphie たばこ (D1294) vaut pour l'ENTRY entière."
+  },
+  {
+    "id": "A2-04-D1301",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-19",
+    "entry": "n5_v_598",
+    "field": "sens 2 · category",
+    "kind": "categorie-nulle",
+    "before": null,
+    "after": null,
+    "reason": "Le tabac : aucune catégorie du registre ne le nomme ; il n'est ni un aliment ni une matière de construction ou de fabrication. Matière sans domaine thématique propre, comme le sens 1. Addendum A5."
   }
```
