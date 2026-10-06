# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 20 « Existence, possession, action et déroulement » · proposition

**Date** : 2026-10-06
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 22 entrées du lot et ses 68
décisions de journal. Rien n'est validé, rien n'est commité.

**Version** : révisée le 2026-10-06 après l'arbitrage des 25 choix (§9). Le texte ci-dessous décrit
la proposition révisée ; le tableau du §5 reste celui qui a été relu.

**État** : les 25 choix du §5 sont **arbitrés** (par ChatGPT, sur délégation de l'utilisateur) : la proposition est retenue dans son
ensemble, avec sept corrections et trois dimensions ajoutées (§9). Le lot est **validé** depuis le
2026-10-06 (`docs/rapports/etape2-A2-04-lot20-valide.md`). Ce rapport reste la proposition telle qu'elle a été relue : les mentions
« proposed » et l'essai à blanc y décrivent l'état d'avant la validation.

**À lire avec** : `reconstruction/a2-04/rapports/lot-20.md` (rapport généré, entrée par entrée) et
`docs/rapports/etape2-A2-04-lot20-perimetre.md` (périmètre arbitré, §7).

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Aucun sens,
aucune lecture, aucune graphie, aucune particule, aucune relation, aucune fonction n'est ajouté par
connaissance externe.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-20.json` | nouveau : 22 entrées, toutes `proposed`, aucun ajout, aucun retrait |
| `reconstruction/a2-04/journal.json` | 68 décisions `proposed`, D1302 à D1369, ajoutées à la fin (D1366 à D1369 à la révision) ; les 1 301 décisions validées sont identiques |
| `reconstruction/a2-04/rapports/lot-20.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | cinq tests adaptés (espace de travail réel, lots 17, 18 et 19 dans l'assemblage réel, journal), deux tests ajoutés |
| Autres lots, règles, validateur, registres, sources figées | inchangés |

**Sens** : 30, pour 22 entrées. Huit entrées ont deux sens (ある, 持つ, 出来る, 違う, する, やる, 所,
問題) ; quatorze en ont un seul.

| Nature | Champ | Nombre |
|---|---|---|
| `decision` | sens | 19 |
| `abandon` | sens (traductions écartées) | 9 |
| `categorie-nulle` | catégorie d'un sens (A5) | 20 |
| `decision` | dimension d'un sens (A2-DIM) | 3 |
| `type-nul` | type d'un sens (A6) | 1 |
| `decision` | fonctions linguistiques (aucune n'est posée) | 4 |
| `decision` | relations (candidates à 5.16) | 3 |
| `decision` | graphie (une ajoutée, une refusée) | 2 |
| `correction` | lecture | 2 |
| `decision` | tag de lieu (refusé) | 1 |
| `decision` | `suffix` | 1 |
| `decision` | nuance (始める, nommé par la fiche de 始まる) | 1 |
| `abandon` | nuance (exemple fautif, remarque d'origine) | 2 |

Aucune forme usuelle, aucune classe, aucune relation ni aucune fonction linguistique n'est décidé.
Trois sens portent une dimension.

## 2. L'arbitrage du périmètre, tel qu'il est appliqué

1. **Périmètre** : les 22 identifiants arbitrés. 他 et 大勢 ne sont dans aucun lot ; le lot
   « quantité et degré » reste fermé (un test le contrôle).
2. **Fonctions linguistiques** : `linguistic_functions` est vide pour les 30 sens. Quatre décisions
   disent qu'aucune fonction n'est posée, et pourquoi : l'existence pour ある (D1305), `modalite`
   pour 出来る (D1319), `aspect` pour なる (D1323), `deictique` pour 次 (D1350). Aucune définition,
   aucun addendum n'est créé.
3. **Relations** : `relations: []` pour les 30 sens. Trois décisions inscrivent les candidates à
   l'audit de 5.16 :

   | Paire | Décisions | Fondement |
   |---|---|---|
   | する / やる | D1332 (する), D1336 (やる) | la fiche de やる nomme « suru » comme synonyme familier pour « faire » |
   | やる / 上げる | D1337 (やる) ; 上げる, validée au lot 19, n'est pas modifiée | la fiche de やる nomme « ageru » pour l'emploi « donner » |

   Ne sont pas inscrites : 始まる / 終わる, 見る / 見せる. 始める, nommé par la fiche de 始まる, n'est
   pas une entrée des sources : la mention reste en nuance (D1340).
4. **辺** : `suffix: true` (D1356) ; classe mécanique `nom`.
5. **Graphies** : 掛かる ajoutée à かかる, avec les furigana de la fiche, en bloc
   (`<ruby>掛かる<rt>かかる</rt></ruby>`, D1342) ; いる **non ajoutée** à 居る (D1308).
6. **次** : `lieu_gare` refusé, `tags: []` (D1349).

**Vérifié à l'essai à blanc** : le validateur accepte les furigana en bloc de 掛かる, okurigana
compris, et ceux de 出来る.

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la proposition (commit `9e75c99`) | 616 | 32 | 71 | 0 | 0 | 0 |
| **Réel**, proposition en cours | **616** | 32 | 71 (49 non décidées, 22 propositions) | 0 | 0 | 0 |
| **Essai à blanc**, tout supposé validé, en mémoire | **638** | **32** | **49** | 0 | 0 | 0 |

- **L'état réel ne change pas** tant que rien n'est validé.
- **Essai à blanc** : 638 = 616 + 22. **Il ne resterait aucun verbe à décider** ; les 49 entrées
  restantes seraient 2 noms, 42 adverbes et mots de liaison, 5 adjectifs. 居る et 要る restent deux
  ENTRY de même lecture, de groupes différents.
- **Avertissements à l'essai à blanc** : 134, soit 21 de plus : 20 `categorie-nulle` et 1
  `type-nul` (声), tous justifiés au journal.
- **Tests** : 470 réussis, 0 échec (468 avant ; deux tests ajoutés : l'état du lot 20 proposé,
  l'essai à blanc).
- **Sabotages** : 55 joués après la révision (les 40 de la livraison, rejoués, et 15 sur les points
  révisés), tous attrapés, chacun vérifié comme modifiant réellement son fichier,
  puis rétabli à l'octet près (empreintes contrôlées). Entrée ou décision validée sans
  autorisation ; fonction `modalite`, `aspect` ou `deictique` posée contre l'arbitrage, ou sa
  décision vidée ; relation posée ; candidate effacée ; 上げる rouverte ; `suffix` retiré de 辺, ou
  posé ailleurs ; tag `lieu_gare` remis ; graphie いる ajoutée à 居る ; graphie 掛かる retirée, ou
  ses furigana segmentés ; lecture de 出来る remise à la source, ou segmentée ; lecture retirée ;
  居る et 要る fusionnées ; 大勢 ou 他 ajoutée au lot ; particule tirée d'un exemple ; catégorie
  nulle ou type nul sans justification ; traduction abandonnée remise, ou perdue ; exemple fautif
  repris ; décision d'un lot clos rouverte ; décision supprimée ou inversée ; type, catégorie ou
  ordre changés ; sens retiré ; entrée retirée.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 4. Les choix lexicaux, groupe par groupe

Notation : **traduction principale** | autres traductions ; les particules entre parenthèses sont
celles des entrées à plusieurs sens (les autres reprennent celles de la fiche).

### A. Exister, avoir, avoir besoin (4)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| ある | 1. **Y avoir** \| Exister \| Se trouver (pour les objets inanimés) (が, に) · 2. **Posséder** (が) | aucune | etat |
| 居る | **Y avoir (pour les êtres vivants)** \| Être \| Se trouver | aucune | etat |
| 持つ | 1. **Tenir** \| Porter (en main) \| Avoir sur soi (を) · 2. **Posséder** (を) | aucune | action · etat |
| 要る | **Avoir besoin de** \| Être nécessaire \| Falloir ; dimension nécessité | aucune | etat |

- **ある** : la fiche dit « l'existence, la présence ou la possession » ; la possession est proposée
  comme second sens. 居る n'en a qu'un : sa fiche ne parle pas de possession.
- **Traductions principales** (D1302, D1306, révisées) : « Y avoir », devant « Exister » et
  « Être », que la source donne en premier ; les deux exemples se traduisent « il y a ». Seul
  l'ordre change.
- **要る** (D1366, ajoutée à la révision) : dimension `necessite_facultativite`, pôle
  `necessite`.
- **居る et 要る** : deux mots de même lecture, que la fiche de 要る distingue ; chacune renvoie à
  l'autre en nuance. L'exemple de 要る (ぱソコン) n'est pas repris.

### B. Pouvoir, devenir, différer, être en difficulté (4)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 出来る | 1. **Pouvoir** \| Être capable de (が) ; dimension possibilité · 2. **Être achevé / prêt** (が) | capacités et aptitudes › aptitude · aucune | etat · resultat |
| なる | **Devenir** \| Se transformer en | aucune | evenement |
| 違う | 1. **Être différent** (aucune) · 2. **Être incorrect** \| Se tromper (aucune) ; dimension inexactitude | aucune | etat |
| 困る | **Avoir des ennuis** \| Être embarrassé \| Être en difficulté | psychologie › états psychologiques | etat |

- **Lecture de 出来る** (D1315) : furigana de la source sur 出きる. Bloc par nécessité (A8, §3) :
  でき sur 出来, la fiche ne répartissant pas la lecture entre les deux kanji ; un ancien exemple
  de la fiche écrit de même (出来ます, でき sur 出来).
- **出来る** (D1316, révisée ; D1367, ajoutée) : « être achevé » est un `resultat`, que A2-ST
  définit comme l'aboutissement d'une action, d'un processus ou d'un événement ; le sens 1 porte la
  dimension `possibilite_impossibilite`, pôle `possibilite`.
- **違う** (D1368, ajoutée) : le sens 2 porte la dimension `exactitude_inexactitude`, pôle
  `inexactitude` ; aucune dimension pour « être différent ».
- **違う** : « C'est faux » est une réplique ; l'emploi d'adresse est conservé en nuance, sans sens
  ni fonction.
- **困る** : type `etat`. Toutes les traductions de la source disent un état ; à la différence de
  疲れる, aucun changement n'est à distinguer de son résultat.
- **Écartées** : « Réussir » (non développée, signalée en nuance), « Prendre forme », « Être dans
  l'embarras » (redondante).

### C. Faire, regarder (3)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| する | 1. **Faire** (を) · 2. **Coûter (pour un prix)** \| Valoir (aucune) | aucune · prix et valeur économique › prix | action · propriete |
| やる | 1. **Faire** \| Jouer (à un jeu, un sport) (を) · 2. **Donner (à des plantes, des animaux)** (を) | aucune | action |
| 見る | **Voir** \| Regarder \| Examiner \| Observer | sens et perception › vue | action |

- **する** (D1330, révisée) : le prix se dit « immédiatement après un montant », sans particule ;
  l'exemple porte sur ce sens. Type `propriete` : le prix qu'affiche un objet le caractérise.
- **やる** : « Jouer » est rattaché à « Faire » : la fiche parle de « s'adonner à une activité », et
  l'exemple se traduit « je fais (joue au) tennis ». Le registre familier est dit en nuance.
- **見る** : un seul sens, un geste pour plusieurs objets.

### D. Commencer, finir, durer (5)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 始まる | **Commencer** \| Débuter | chronologie › début et fin | evenement |
| 終わる | **Finir** \| Terminer \| Prendre fin \| S'achever | chronologie › début et fin | evenement |
| かかる | **Prendre (du temps ou de l'argent)** \| Coûter | aucune | propriete |
| 初め | **Début** \| Commencement | chronologie › début et fin | concept_abstrait |
| 次 | **Suivant** \| Prochain \| Ensuite | aucune | concept_abstrait |

- **始まる** : la source donne « Commencer (intransitif) » ; la parenthèse, remarque de grammaire,
  est retirée de la traduction et dite en nuance (D1339).
- **Lecture de 初め** (D1346) : furigana はじめ sur 初, suivis de め ; はじ sur 初.
- **かかる** (D1343, révisée) : type `propriete`, comme le sens « coûter » de する ; sans
  catégorie, le sens couvrant le temps et l'argent.
- **次** (D1351, révisée à sa place) : sans catégorie. La fiche dit « dans l'ordre, le temps ou
  l'espace » : le seul domaine du temps serait artificiel.
- **Écartées** : « Prendre du temps » (redite), « Au début » (traduction de 初めに, reprise en
  nuance).

### E. Noms généraux (6)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 物 | **Chose** \| Objet \| Article | aucune | objet_artefact |
| 所 | 1. **Endroit** \| Lieu \| Place (aucune) · 2. **Partie** (aucune) | position et localisation · aucune | lieu · concept_abstrait |
| 辺 | **Environs** \| Alentours \| Région \| Quartier | distance et proximité › proximité | lieu |
| 問題 | 1. **Problème** (aucune) · 2. **Question (d'examen)** (aucune) | aucune · évaluation scolaire › examens | concept_abstrait · information_contenu |
| 力 | **Force** \| Puissance \| Énergie | aucune | propriete |
| 声 | **Voix** \| Cri (d'animal) | aucune | aucun (A6) |

- **辺** : « Environs » passe en traduction principale, devant « Région », que la source donne en
  premier : la fiche décrit « les environs, les alentours », et son exemple se traduit « dans les
  environs ». Seul l'ordre change.
- **所, 問題** : deux référents de types différents, comme 煙草 (lot 19).
- **力** : un seul sens, comme 強い (lot 17) ; les compétences sont dites en nuance.
- **声** (D1369, ajoutée à la révision) : sans catégorie. « Ouïe » décrit la perception auditive
  d'un être humain, non le son que produit une voix ou un animal.
- **声** : **aucun type** (`type-nul`, D1365). La voix est un son émis par un être vivant, et aucun
  type du registre ne convient à un son ; c'est le traitement des parties du corps (lot 01).
- **Écartées** : « Bien matériel », « Capacité physique ou mentale » (gloses) ; « Sujet de
  discussion », « Affaire » (non développées, signalées en nuance).

## 5. Choix à arbitrer

**Arbitrés le 2026-10-06** (§9). Le tableau ci-dessous est celui qui a été relu : ses lignes 2, 5,
10, 14, 16 et 22 décrivent la proposition d'avant la révision.

| N° | Choix proposé | Alternative |
|---|---|---|
| 1 | ある : deux sens (exister, y avoir ; posséder), `etat` | un seul sens, la possession en nuance |
| 2 | ある et 居る : traduction principale de la source (« Exister », « Être ») | « Y avoir » en principale, que les exemples attestent |
| 3 | ある, 居る, 要る : `etat` ; sans catégorie | — |
| 4 | 持つ : deux sens (tenir, `action` ; posséder, `etat`) | un seul sens |
| 5 | 出来る : deux sens ; la capacité en `etat`, dans capacités et aptitudes › aptitude ; l'achèvement en `evenement`, sans catégorie | un seul sens ; `etat` pour l'achèvement |
| 6 | 出来る : furigana en bloc, でき sur 出来 | — |
| 7 | なる : un seul sens, `evenement`, sans catégorie ; « ku » cité en nuance | retirer la mention de « ku » |
| 8 | 違う : deux sens (être différent ; être incorrect), `etat` ; « C'est faux » en nuance | un seul sens |
| 9 | 困る : `etat`, dans psychologie › états psychologiques | `evenement`, l'état en nuance |
| 10 | する : deux sens (faire ; coûter) ; le prix en `etat`, sans particule | un seul sens |
| 11 | やる : deux sens (faire ; donner) ; « Jouer » rattaché à « Faire » | un troisième sens pour « jouer » |
| 12 | 見る : un seul sens, `action`, dans sens et perception › vue | un second sens pour « examiner » |
| 13 | 始まる, 終わる : `evenement`, dans chronologie › début et fin ; « Commencer » sans sa parenthèse | garder « Commencer (intransitif) » |
| 14 | かかる : un seul sens, `etat`, sans catégorie | `evenement` |
| 15 | 初め : `concept_abstrait` ; « Au début » en nuance | — |
| 16 | 次 : `concept_abstrait`, dans chronologie › succession | sans catégorie |
| 17 | 物 : `objet_artefact`, sans catégorie | — |
| 18 | 所 : deux sens (endroit, `lieu` ; partie, `concept_abstrait`) | un seul sens |
| 19 | 辺 : « Environs » en traduction principale ; `lieu`, proximité | l'ordre de la source |
| 20 | 問題 : deux sens (problème ; question d'examen) | un seul sens |
| 21 | 力 : un seul sens, `propriete`, sans catégorie | un second sens pour les compétences |
| 22 | 声 : un seul sens ; **aucun type** (A6) ; dans sens et perception › ouïe | un second sens pour le cri d'un animal ; sans catégorie |
| 23 | 始める, nommé par la fiche de 始まる : mention gardée en nuance | la retirer |
| 24 | Traductions non développées signalées en nuance : réussir, sujet de discussion, affaire | les abandonner sans les signaler |
| 25 | 18 catégories nulles (A5) | une catégorie pour certains, à nommer |

## 6. Ce qui est signalé sans être proposé

- **居る** : la forme usuelle en kanji reste celle de la source, mécanique ; à revoir à la passe
  finale, avec 煙草.
- **辺 dans les anciens exemples** : les trois anciens exemples de contexte de la fiche écrivent ce
  mot avec la lecture あたり, quand la fiche donne へん (kana, romaji et furigana). Les anciens
  exemples sont en lecture seule : aucune lecture n'est ajoutée. À signaler pour le registre de
  phrases.
- **« Nom / adjectif en -no »** (次) : le schéma ne porte qu'une classe par ENTRY (point ouvert
  depuis le lot 16).

## 7. Cohérence avec les lots validés

- **Types** : `etat` suit 知る et 分かる (lot 06) et « Dormir » (lot 19) ; `evenement` suit 開く
  (lot 18) et 止まる (lot 04).
- **Deux référents de types différents font deux sens** : 煙草 (lot 19), 料理 (lot 02).
- **Type nul** : les parties du corps (lot 01).
- **Catégories reprises** : 近く (lot 10) pour 辺, テスト (lot 06) pour 問題, 高い « cher » (lot 05)
  pour する, 前 (lot 10) pour 次 et 初め.
- **`suffix`** : 半 (lot 13).
- **Furigana en bloc** : 二十歳 (D1020), 昨日 (D0746).
- **Aucune décision validée n'est modifiée** ; 上げる n'est pas touchée.

## 8. Suite

1. Vérification ciblée des corrections du §9, et de l'absence de mouvement ailleurs.
2. Validation atomique, puis commit, chacun sur un accord explicite et distinct. Aucun push n'est
   fait.

## 9. Arbitrage des 25 choix et révision du 2026-10-06

**Arbitrage par ChatGPT, sur délégation de l'utilisateur**, après relecture des 22 fiches, du lot proposé, du journal et des références
normatives. La proposition est retenue dans son ensemble, avec les corrections ci-dessous.

| Choix | Arbitrage |
|---|---|
| 1 · ある | deux sens retenus ; **« Y avoir » en traduction principale** du sens 1 |
| 2 · 居る | un sens retenu ; **« Y avoir (pour les êtres vivants) » en traduction principale** |
| 3 · ある, 居る, 要る | `etat` et catégories nulles retenus ; **dimension nécessité pour 要る** |
| 4 · 持つ | retenu |
| 5 · 出来る | deux sens retenus ; **dimension possibilité** pour le sens 1 ; **sens 2 en `resultat`** |
| 6 · furigana de 出来る | bloc retenu |
| 7 · なる | retenu, « ku » gardé en nuance |
| 8 · 違う | deux sens retenus ; **dimension inexactitude** pour le sens 2 |
| 9 · 困る | retenu (`etat`) |
| 10 · する | deux sens retenus ; **prix en `propriete`** |
| 11 à 13 · やる, 見る, 始まる, 終わる | retenus |
| 14 · かかる | un sens retenu ; **`propriete`** |
| 15 · 初め | retenu |
| 16 · 次 | type retenu ; **catégorie nulle** |
| 17 à 21 · 物, 所, 辺, 問題, 力 | retenus |
| 22 · 声 | un sens et `semantic_type: null` retenus ; **catégorie nulle** |
| 23, 24 · 始める en nuance, traductions non développées | retenus |
| 25 · catégories nulles | retenues, avec 次 et 声 en plus : 20 |

**La révision** :

| Entrée | Avant | Après | Journal |
|---|---|---|---|
| ある, sens 1 | Exister \| Y avoir \| Se trouver (…) | **Y avoir** \| Exister \| Se trouver (…) | D1302, réécrite à sa place |
| 居る | Être \| Se trouver \| Y avoir (…) | **Y avoir (pour les êtres vivants)** \| Être \| Se trouver | D1306, réécrite à sa place |
| 出来る, sens 2 | `evenement` | `resultat` | D1316 et D1317, raisons réécrites |
| する, sens 2 | `etat` | `propriete` | D1330, raison réécrite |
| かかる | `etat` | `propriete` | D1343 et D1344, raisons réécrites |
| 次 | temps › chronologie › succession | aucune catégorie | **D1351, réécrite à sa place : de `decision` à `categorie-nulle`** |
| 声 | être humain › sens et perception › ouïe | aucune catégorie | **D1369, nouvelle** ; D1364, raison réécrite |
| 要る, sens 1 | aucune dimension | `necessite_facultativite` / `necessite` | **D1366, nouvelle** |
| 出来る, sens 1 | aucune dimension | `possibilite_impossibilite` / `possibilite` | **D1367, nouvelle** |
| 違う, sens 2 | aucune dimension | `exactitude_inexactitude` / `inexactitude` | **D1368, nouvelle** |

Les identifiants d'axe et de pôle sont ceux du registre `data/registries/dimensions.json`
(A2-DIM-v1), lus dans le fichier ; le validateur les accepte. La définition de `resultat` citée par
l'arbitrage est bien celle d'A2-ST (`docs/conception/a2/A2-ST-v1.md`).

**Trois points qui découlent de l'arbitrage sans y être nommés tels quels**, à contrôler :

- **Quatre décisions nouvelles, et non trois.** L'arbitrage demandait d'ajouter les trois décisions
  de dimensions. Mettre 声 sans catégorie exige en plus, par A5, une décision `categorie-nulle`
  sur ce sens : aucune décision existante ne portait sur sa catégorie (elle était dite dans la
  décision de sens, D1364). Elle est ajoutée à la fin : **D1369**.
- **D1351 change de nature.** Elle décidait la catégorie de 次 (nature `decision`) ; elle devient,
  à sa place et sous le même identifiant, la décision `categorie-nulle` de ce sens, qu'A5 exige.
  Précédent : D1129 et D1131 au lot 17, dans l'autre sens.
- **Trois raisons resserrées** : D1317 (出来る) disait « événement général », D1344 (かかる) « état
  sans domaine », D1364 (声) proposait la catégorie ouïe ; elles suivent maintenant le type ou la
  catégorie arbitrés. Ce qu'elles décident est inchangé.

**Ce qui n'a pas bougé**, contrôlé par script au moment de l'écriture :

- 13 entrées sur 22 sont identiques ; dans les neuf autres, **seul le champ `senses` change**, le
  nombre de sens est le même, et elles restent `proposed` ;
- 55 des 64 décisions d'origine sont identiques ; pour les neuf réécrites, l'identifiant, le
  statut, la date, le lot, l'entrée, le champ et « avant » sont inchangés ; **une seule change de
  nature**, D1351 ;
- les 1 301 décisions validées sont identiques ; aucun autre lot n'est touché ;
- aucune relation, aucune fonction linguistique, aucune règle ; les sept décisions de relations et
  de fonctions, `suffix`, les graphies, le tag refusé, les lectures et les particules sont
  inchangés.

**Contrôles après révision** : état réel 616 ENTRY, 32 retraits, 71 entrées écartées ; essai à
blanc 638, 32, 49, sans problème ni erreur, 134 avertissements (20 catégories nulles et 1 type nul
pour le lot) ; 470 tests réussis ; 55 sabotages attrapés. Le test d'état vérifie chaque point : les
deux traductions principales, les trois types, les deux catégories nulles, la nature de D1351, et
les trois dimensions avec leurs identifiants exacts.

## 10. Diff complet de la révision

Comparaison ligne à ligne entre la proposition relue (copies gardées hors dépôt au moment de la
révision) et l'état actuel, avec une ligne de contexte. **C'est toute la révision** : aucune autre
ligne des deux fichiers n'a changé.

### `reconstruction/a2-04/lots/lot-20.json`

```diff
@@ -22,5 +22,5 @@
             "meaning": {
-              "primary": "Exister",
+              "primary": "Y avoir",
               "alternatives": [
-                "Y avoir",
+                "Exister",
                 "Se trouver (pour les objets inanimés)"
@@ -80,6 +80,6 @@
             "meaning": {
-              "primary": "Être",
+              "primary": "Y avoir (pour les êtres vivants)",
               "alternatives": [
-                "Se trouver",
-                "Y avoir (pour les êtres vivants)"
+                "Être",
+                "Se trouver"
               ]
@@ -160,3 +160,4 @@
         "A2-04-D1313",
-        "A2-04-D1314"
+        "A2-04-D1314",
+        "A2-04-D1366"
       ],
@@ -180,3 +181,8 @@
             "semantic_type": "etat",
-            "dimensions": [],
+            "dimensions": [
+              {
+                "axis": "necessite_facultativite",
+                "pole": "necessite"
+              }
+            ],
             "relations": [],
@@ -197,3 +203,4 @@
         "A2-04-D1318",
-        "A2-04-D1319"
+        "A2-04-D1319",
+        "A2-04-D1367"
       ],
@@ -220,3 +227,8 @@
             "semantic_type": "etat",
-            "dimensions": [],
+            "dimensions": [
+              {
+                "axis": "possibilite_impossibilite",
+                "pole": "possibilite"
+              }
+            ],
             "relations": [],
@@ -237,3 +249,3 @@
             "category": null,
-            "semantic_type": "evenement",
+            "semantic_type": "resultat",
             "dimensions": [],
@@ -302,3 +314,4 @@
         "A2-04-D1326",
-        "A2-04-D1327"
+        "A2-04-D1327",
+        "A2-04-D1368"
       ],
@@ -337,3 +350,8 @@
             "semantic_type": "etat",
-            "dimensions": [],
+            "dimensions": [
+              {
+                "axis": "exactitude_inexactitude",
+                "pole": "inexactitude"
+              }
+            ],
             "relations": [],
@@ -432,3 +450,3 @@
             },
-            "semantic_type": "etat",
+            "semantic_type": "propriete",
             "dimensions": [],
@@ -645,3 +663,3 @@
             "category": null,
-            "semantic_type": "etat",
+            "semantic_type": "propriete",
             "dimensions": [],
@@ -726,7 +744,3 @@
             },
-            "category": {
-              "level_1": "temps",
-              "level_2": "chronologie",
-              "level_3": "succession"
-            },
+            "category": null,
             "semantic_type": "concept_abstrait",
@@ -963,3 +977,4 @@
         "A2-04-D1364",
-        "A2-04-D1365"
+        "A2-04-D1365",
+        "A2-04-D1369"
       ],
@@ -980,7 +995,3 @@
             },
-            "category": {
-              "level_1": "etre_humain",
-              "level_2": "sens_perception",
-              "level_3": "ouie"
-            },
+            "category": null,
             "semantic_type": null,
```

### `reconstruction/a2-04/journal.json`

```diff
@@ -18331,6 +18331,6 @@
     "after": [
-      "S1 Exister, y avoir",
+      "S1 Y avoir, exister",
       "S2 Posséder"
     ],
-    "reason": "Deux sens proposés, sur la fiche (« l'existence, la présence ou la possession de choses inanimées ») : une chose qui existe ou se trouve quelque part, ce que l'exemple illustre, et une chose que quelqu'un possède ; deux référents. L'ordre et la traduction principale sont ceux de la source. Type etat pour les deux : la fiche parle d'existence, de présence et de possession, non d'une action ni d'un changement ; comme 知る et 分かる (lot 06). Particules de la fiche : が et に pour l'existence (la chose, le lieu), が pour la possession. Sens 2 candidat ; alternatives laissées à l'arbitrage : un seul sens, la possession passant en nuance ; ou « Y avoir » en traduction principale, que l'exemple atteste."
+    "reason": "Deux sens, sur la fiche (« l'existence, la présence ou la possession de choses inanimées ») : une chose qui existe ou se trouve quelque part, ce que l'exemple illustre, et une chose que quelqu'un possède ; deux référents. Pour le sens 1, « Y avoir » passe en traduction principale, devant « Exister », que la source donne en premier (arbitrage des choix du lot 20) : l'exemple de la fiche traduit ある par « il y a », formulation plus naturelle pour un débutant francophone et directement attestée ; aucune traduction n'est ajoutée ni retirée, seul l'ordre change. Type etat pour les deux : la fiche parle d'existence, de présence et de possession, non d'une action ni d'un changement ; comme 知る et 分かる (lot 06). Particules de la fiche : が et に pour l'existence (la chose, le lieu), が pour la possession."
   },
@@ -18385,4 +18385,4 @@
     ],
-    "after": "un seul sens",
-    "reason": "Un seul sens : la fiche décrit « l'existence ou la présence d'êtres animés », sans la possession que celle de ある ajoute. Chaque fiche décide pour elle-même. Type etat, comme le sens 1 de ある. L'ordre et la traduction principale sont ceux de la source. Alternative laissée à l'arbitrage : « Y avoir » en traduction principale, que l'exemple atteste."
+    "after": "un seul sens ; « Y avoir (pour les êtres vivants) » en traduction principale",
+    "reason": "Un seul sens : la fiche décrit « l'existence ou la présence d'êtres animés », sans la possession que celle de ある ajoute. Chaque fiche décide pour elle-même. Type etat, comme le sens 1 de ある. « Y avoir (pour les êtres vivants) » passe en traduction principale, devant « Être », que la source donne en premier (arbitrage des choix du lot 20) : l'exemple de la fiche est précisément « il y a un enfant dans la pièce ». Aucune traduction n'est ajoutée ni retirée, seul l'ordre change. Le contraste avec ある reste dit en nuance."
   },
@@ -18526,3 +18526,3 @@
     ],
-    "reason": "Deux sens documentés par la fiche (« la capacité ou la possibilité physique/mentale de faire quelque chose (…), ou le fait qu'une chose soit terminée ou fabriquée ») : ce que quelqu'un sait ou peut faire, que l'exemple illustre, et une chose qui est achevée ; deux référents. Types : etat pour la capacité, comme 分かる (lot 06) ; evenement pour l'achèvement, un changement qui survient à une chose. Particule が de la fiche pour chacun. Le sens 1 : être humain › capacités et aptitudes › aptitude. Sens 2 candidat ; alternatives laissées à l'arbitrage : un seul sens ; ou le type etat pour le sens 2."
+    "reason": "Deux sens documentés par la fiche (« la capacité ou la possibilité physique/mentale de faire quelque chose (…), ou le fait qu'une chose soit terminée ou fabriquée ») : ce que quelqu'un sait ou peut faire, que l'exemple illustre, et une chose qui est achevée ; deux référents. Types : etat pour la capacité, comme 分かる (lot 06) ; resultat pour l'achèvement (arbitrage des choix du lot 20) : A2-ST définit ce type comme une entité ou un état conceptualisé principalement comme l'aboutissement d'une action, d'un processus ou d'un événement, ce qui convient à une chose « terminée ou fabriquée » mieux qu'evenement. Particule が de la fiche pour chacun. Le sens 1 : être humain › capacités et aptitudes › aptitude."
   },
@@ -18538,3 +18538,3 @@
     "after": null,
-    "reason": "Une chose terminée ou fabriquée : événement général, sans domaine thématique propre. Addendum A5."
+    "reason": "Une chose terminée ou fabriquée : résultat général, sans domaine thématique propre. Addendum A5."
   },
@@ -18726,3 +18726,3 @@
     ],
-    "reason": "Deux sens documentés par la fiche : « son sens principal de faire », et le sens qu'il prend « lorsqu'il est placé immédiatement après un montant financier pour indiquer le prix ou la valeur qu'affiche un objet », que l'exemple illustre ; une chose que l'on fait, et un prix ; deux référents, et deux types : une action, et un état, comme le sens « cher » de 高い (lot 05) pour la catégorie. Particules : を, celle de la fiche, pour « faire » ; aucune pour le prix, que la fiche dit placé directement après le montant, sans particule. L'ordre suit les traductions de la source. Les noms à suru_compatible et コピーする (lot 19) ne sont pas touchés. Sens 2 candidat ; alternative laissée à l'arbitrage : un seul sens."
+    "reason": "Deux sens documentés par la fiche : « son sens principal de faire », et le sens qu'il prend « lorsqu'il est placé immédiatement après un montant financier pour indiquer le prix ou la valeur qu'affiche un objet », que l'exemple illustre ; une chose que l'on fait, et un prix ; deux référents, et deux types : une action, et une propriete (arbitrage des choix du lot 20) : le prix ou la valeur qu'affiche un objet est une caractéristique que l'on attribue à cet objet, au sens d'A2-ST, plutôt qu'une condition dans laquelle il se trouve ; comme le sens « cher » de 高い (lot 05), dont il partage la catégorie. Particules : を, celle de la fiche, pour « faire » ; aucune pour le prix, que la fiche dit placé directement après le montant, sans particule. L'ordre suit les traductions de la source. Les noms à suru_compatible et コピーする (lot 19) ne sont pas touchés."
   },
@@ -18908,3 +18908,3 @@
     "after": "un seul sens",
-    "reason": "Un seul sens : « l'exigence ou la consommation d'une ressource », du temps ou de l'argent ; deux ressources pour un même fait. L'exemple porte sur le temps. Type etat proposé : ce qu'une chose demande, non une action ni un changement ; comme le sens « coûter » proposé pour する. Alternative laissée à l'arbitrage : le type evenement."
+    "reason": "Un seul sens : « l'exigence ou la consommation d'une ressource », du temps ou de l'argent ; deux ressources pour un même fait. L'exemple porte sur le temps. Type propriete (arbitrage des choix du lot 20) : le temps ou le coût qu'une tâche ou une situation demande la caractérise ; ce n'est ni une action ni un événement ponctuel. Comme le sens « coûter » de する, dans ce lot."
   },
@@ -18920,3 +18920,3 @@
     "after": null,
-    "reason": "Ce qu'une chose exige en temps ou en argent : la durée relèverait du temps et le prix de l'économie ; aucun domaine ne couvre les deux, et le sens est unique. État sans domaine thématique propre. Addendum A5."
+    "reason": "Ce qu'une chose exige en temps ou en argent : la durée relèverait du temps et le prix de l'économie ; aucun domaine ne couvre les deux, et le sens est unique. Propriété sans domaine thématique propre. Addendum A5."
   },
@@ -19007,6 +19007,6 @@
     "field": "sens 1 · category",
-    "kind": "decision",
+    "kind": "categorie-nulle",
     "before": null,
-    "after": "temps › chronologie › succession",
-    "reason": "Ce qui vient immédiatement après : temps › chronologie › succession. La fiche dit « dans l'ordre, le temps ou l'espace » ; la succession est ce que les trois ont en commun. Type concept_abstrait, comme le sens « avant (dans le temps) » de 前 (lot 10). La fiche dit « nom / adjectif en -no » : la classe mécanique est nom, et l'emploi avec の est dit en nuance."
+    "after": null,
+    "reason": "Aucune catégorie (arbitrage des choix du lot 20) : la proposition rangeait ce sens dans temps › chronologie › succession. La fiche dit explicitement « dans l'ordre, le temps ou l'espace » : classer le sens entier dans le seul domaine du temps serait artificiel, et aucun domaine thématique ne couvre cette généralité. Type concept_abstrait, comme le sens « avant (dans le temps) » de 前 (lot 10). La fiche dit « nom / adjectif en -no » : la classe mécanique est nom, et l'emploi avec の est dit en nuance. Addendum A5."
   },
@@ -19202,3 +19202,3 @@
     "after": "un seul sens",
-    "reason": "Un seul sens proposé : la voix d'une personne et le cri d'un animal sont de même nature, un son qu'émet un être vivant ; ce ne sont pas deux référents de types différents. L'exemple porte sur la voix. Catégorie : être humain › sens et perception › ouïe, ce que l'on entend. Alternatives laissées à l'arbitrage : un second sens pour le cri d'un animal ; ou aucune catégorie (A5), la fiche couvrant aussi les animaux."
+    "reason": "Un seul sens : la voix d'une personne et le cri d'un animal sont de même nature, un son qu'émet un être vivant ; ce ne sont pas deux référents de types différents. L'exemple porte sur la voix. Le type et la catégorie de ce sens sont décidés à part (D1365, D1369)."
   },
@@ -19215,2 +19215,65 @@
     "reason": "Aucun type : la voix est un son émis par un être vivant, et aucun type du registre A2-ST ne convient à un son (ni objet, ni substance, ni action, ni information). Absence décidée, comme pour les parties du corps (lot 01). Addendum A6."
+  },
+  {
+    "id": "A2-04-D1366",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-20",
+    "entry": "n5_v_573",
+    "field": "sens 1 · dimensions",
+    "kind": "decision",
+    "before": [],
+    "after": [
+      {
+        "axis": "necessite_facultativite",
+        "pole": "necessite"
+      }
+    ],
+    "reason": "Dimension nécessité / facultativité, pôle nécessité : l'axe d'A2-DIM décrit directement le sens (la fiche le définit par « avoir besoin », « être nécessaire », « falloir »). Arbitrage des choix du lot 20, selon la doctrine arbitrée au lot 16 : un axe existant est employé lorsqu'il décrit directement le sens, et seulement alors."
+  },
+  {
+    "id": "A2-04-D1367",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-20",
+    "entry": "n5_v_523",
+    "field": "sens 1 · dimensions",
+    "kind": "decision",
+    "before": [],
+    "after": [
+      {
+        "axis": "possibilite_impossibilite",
+        "pole": "possibilite"
+      }
+    ],
+    "reason": "Dimension possibilité / impossibilité, pôle possibilité : l'axe d'A2-DIM décrit directement le sens (la fiche dit « la capacité ou la possibilité physique/mentale de faire quelque chose »). Arbitrage des choix du lot 20, selon la doctrine arbitrée au lot 16 : un axe existant est employé lorsqu'il décrit directement le sens, et seulement alors."
+  },
+  {
+    "id": "A2-04-D1368",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-20",
+    "entry": "n5_v_361",
+    "field": "sens 2 · dimensions",
+    "kind": "decision",
+    "before": [],
+    "after": [
+      {
+        "axis": "exactitude_inexactitude",
+        "pole": "inexactitude"
+      }
+    ],
+    "reason": "Dimension exactitude / inexactitude, pôle inexactitude : l'axe d'A2-DIM décrit directement le sens (la fiche dit qu'une information est « erronée », et son exemple se traduit « ce n'est pas exact »). Arbitrage des choix du lot 20, selon la doctrine arbitrée au lot 16 : un axe existant est employé lorsqu'il décrit directement le sens, et seulement alors. Aucune dimension pour le sens 1, « être différent » : la simple différence relève du sens lexical, et le cas échéant des relations, non de cet axe."
+  },
+  {
+    "id": "A2-04-D1369",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-20",
+    "entry": "n5_v_653",
+    "field": "sens 1 · category",
+    "kind": "categorie-nulle",
+    "before": "etre_humain › sens_perception › ouie",
+    "after": null,
+    "reason": "Aucune catégorie (arbitrage des choix du lot 20) : la proposition rangeait ce sens dans être humain › sens et perception › ouïe. La fiche porte à la fois sur la voix humaine et sur le cri d'un animal ; « ouïe » décrit la perception auditive d'un être humain, non le son que produit une voix ou un animal : la catégorie serait artificielle. Addendum A5."
   }
```
