# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 22 · Périmètre proposé « Manière, identité, diversité et probabilité »

**Date** : 2026-10-06
**Nature** : proposition de périmètre, pour relecture puis arbitrage. **Aucune décision lexicale** :
aucun fichier de lot, aucune décision de journal, aucune règle n'est créé ni modifié ; aucune ENTRY
validée n'est touchée.
**État** : périmètre **arbitré le 2026-10-06** (§9), par ChatGPT, sur délégation de l'utilisateur
(`CLAUDE.md`, §5, « Contrôle »). Les §1 à §8 restent le rapport tel qu'il a été relu.

---

## 1. Méthode

Le lot 21 est clos : validé, committé (`1cfac5b`) et poussé ; `ocha-v2` et `origin/ocha-v2` sont
tous deux à `1cfac5b`. Le remote `origin` pointe désormais sur le dépôt de référence
(`https://github.com/shinobux9-max/Ocha.git`). État réel relevé avant ce rapport :

- assemblage réel : **650 ENTRY, 32 retraits, 37 entrées non décidées**, 0 problème, 0 erreur,
  0 attente ; 140 avertissements ;
- journal : 1 403 décisions (D0001 à D1403), toutes `validated` ; 22 fichiers de lot (lot 00 à
  lot 21), aucune entrée en `proposed` ;
- tests : 472, tous verts.

Les 37 entrées restantes : **aucun verbe**, 2 noms, 4 adjectifs, et 31 adverbes, conjonctions et
interjections. Elles sont toutes listées et regroupées au §4.

Le périmètre proposé en retient **9** : les cinq adverbes de manière, que l'arbitrage du lot 21 a
laissés hors de son périmètre, et les quatre mots d'identité, de diversité, d'alternative et de
probabilité. Chaque fiche a été lue en entier : traductions, nuance **et exemple**.

**Contrôles par script**, sur les sources figées et les 22 fichiers de lot existants :
- les 9 identifiants sont distincts, présents dans la source, non décidés, absents de tout lot ;
- **deux lectures sont en exception**, donc déjà décidables : 同じ (le champ `reading` vaut
  « お同じ », qui n'est pas en kana) et 一緒 (furigana mal formés) ; les 7 autres sont mécaniques ;
- **trois classes sont en exception** (`CLASS_EXCEPTION_IDS`), donc déjà décidables : 弱く, 一緒,
  同じ ; les 6 autres sont mécaniques (5 `adverbe`, いろいろ en `adjectif_na`, 他 en `nom`) ;
- **aucun candidat de tag de lieu**, ni dans le périmètre ni dans les 37 entrées restantes ;
- **aucune liste fermée n'est modifiée** par ce périmètre ;
- **essai en mémoire de l'outillage** (aucun fichier écrit, aucune décision créée) : une fusion de
  `n5_v_450` (弱く) dans `n5_v_449` (弱い, validée au lot 17), décidée dans un autre lot,
  s'assemble sans problème ni erreur, **sans rouvrir 弱い** : 650 ENTRY, 33 retraits, `v_450`
  retirée vers `v_449`. Cela montre seulement que l'issue A du §5.2 est techniquement possible ; rien
  n'est décidé.

## 2. Périmètre proposé : 9 entrées, en deux groupes

### A. Manière, direction et compagnie (5)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_504` | ゆっくり | ゆっくり | Lentement ; tranquillement ; à son aise ; prendre son temps |
| `n5_v_505` | ゆっくりと | ゆっくりと | Lentement ; tranquillement ; d'une manière posée |
| `n5_v_525` | まっすぐ | まっすぐ | Tout droit ; directement ; honnête ; « Français (pour une direction ou un caractère) » |
| `n5_v_450` | 弱く | よわく | Faiblement ; doucement ; légèrement |
| `n5_v_628` | 一緒 | いっしょ | Ensemble ; en compagnie de ; en même temps |

### B. Identité, diversité, alternative et probabilité (4)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_438` | 同じ | « お同じ » (exception) | Même ; identique ; pareil |
| `n5_v_421` | いろいろ | いろいろ | Divers ; varié ; différents ; plusieurs sortes de |
| `n5_v_605` | 他 | ほか | Autre ; en plus ; le reste ; en dehors de |
| `n5_v_521` | たぶん | たぶん | Peut-être ; probablement ; vraisemblablement |

## 3. Pourquoi ce thème, et faut-il scinder ou élargir ?

**L'intérêt pour Ocha.** Des mots des premières conversations : marchez lentement, allez tout
droit, allons-y ensemble, nous sommes dans la même classe, j'ai acheté diverses choses, y a-t-il
autre chose ?, il pleuvra peut-être demain.

**C'est le dernier groupe décidable sans question normative nouvelle.** Ces neuf mots posent des
questions d'**identité**, de **classe** et de **lecture**, toutes tranchables avec les règles
existantes (A3 pour les fusions, liste des exceptions de classe, A8 pour les lectures), et la
doctrine du lot 20, reconduite au lot 21, suffit pour les fonctions : aucune n'est indispensable au
sens de ces mots. Les 28 autres entrées restantes, au contraire, dépendent toutes de fonctions sans
définition normative (§4 et §6).

**Le titre est un regroupement de travail** : il n'oriente ni les catégories ni les types.

**Scission : non recommandée.** Le groupe A pourrait faire un lot à lui seul (5 entrées), mais le
groupe B n'aurait alors pas d'autre lot d'accueil : ses mots ne relèvent ni de la liaison, ni de la
quantité.

**Élargissement : non recommandé.** たくさん, 全部, 大体 ou ちょうど pourraient sembler proches de
いろいろ ou de 同じ ; ils relèvent du lot « quantité et degré », réservé (§4).

## 4. Les 37 entrées restantes, regroupées

Les 9 entrées du périmètre proposé sont en gras. Les regroupements des autres sont des hypothèses
de travail, non des périmètres. Entre parenthèses : la traduction principale de la source.

### Manière, direction, compagnie (5)

**ゆっくり** `n5_v_504` (lentement), **ゆっくりと** `n5_v_505` (lentement), **まっすぐ** `n5_v_525`
(tout droit), **弱く** `n5_v_450` (faiblement), **一緒** `n5_v_628` (ensemble).

### Identité, diversité, alternative, probabilité (4)

**同じ** `n5_v_438` (même), **いろいろ** `n5_v_421` (divers), **他** `n5_v_605` (autre), **たぶん**
`n5_v_521` (peut-être).

### Quantité et degré (14) : lot réservé

| Axe | Mots |
|---|---|
| Quantité | 多い `n5_v_654` (nombreux), 少ない `n5_v_447` (peu nombreux), 大勢 `n5_v_655` (beaucoup de monde), たくさん `n5_v_520` (beaucoup), 少し `n5_v_509` (un peu), ちょっと `n5_v_497` (un peu) |
| Totalité | 全部 `n5_v_639` (tout) |
| Degré et comparaison | とても `n5_v_498` (très), あまり `n5_v_515` (pas tellement), もっと `n5_v_607` (plus), 一番 `n5_v_517` (le plus), 結構 `n5_v_471` (assez) |
| Mesure et approximation | ちょうど `n5_v_496` (exactement), 大体 `n5_v_546` (en général ; à peu près) |

### Liaison et discours (9)

しかし `n5_v_593` (cependant), でも `n5_v_599` (mais), そうして `n5_v_596` (et puis), それから
`n5_v_416` (ensuite), では `n5_v_418` (alors), それでは `n5_v_417` (alors), じゃ `n5_v_595` (alors),
じゃあ `n5_v_413` (alors), など `n5_v_602` (etc.).

### Réponses et politesse (5)

はい `n5_v_344` (oui), ええ `n5_v_586` (oui), いいえ `n5_v_584` (non), どうぞ `n5_v_600` (s'il vous
plaît), どうも `n5_v_499` (merci).

**Total** : 5 + 4 + 14 + 9 + 5 = 37.

**Classes en exception parmi les 28 autres** : じゃあ, それから, それでは, いいえ, ええ, しかし,
じゃ, そうして, でも, どうぞ, など, 一番, たくさん, 全部, et 多い (ancien type « adjectif », sans
classe par défaut).

### Après le lot 22 : un point d'arrêt normatif

Si le lot 22 est retenu tel quel, **les 28 entrées restantes dépendent toutes de fonctions sans
définition normative** :

| Groupe | Entrées | Ce qui le conditionne |
|---|---|---|
| Liaison, discours, réponses et politesse | 14 | `connecteur`, `discours`, `politesse` ; la classe de など (le registre n'a pas de « particule ») |
| Quantité et degré | 14 | `quantificateur`, `comparatif`, `intensifieur` (appliquée à 大変 sans définition) ; `negation` pour あまり |

**Il faudra donc, avant le périmètre du lot 23, une décision normative** : soit un addendum qui
définisse les fonctions nécessaires (comme A7 l'a fait pour `deictique`), soit une décision explicite
que ces mots restent sans fonction, avec catégorie et type nuls justifiés (A5, A6). La doctrine du
lot 20 ne suffit pas : pour しかし ou どうぞ, l'emploi de liaison ou de politesse **est** le sens, et
ne peut pas être renvoyé en nuance. Rien n'est à trancher maintenant ; c'est signalé pour préparer la
suite.

### Voisins déjà validés, utiles à la cohérence

| Mot | Lot | Ce qui est validé |
|---|---|---|
| 弱い | 17 | « Faible » \| Fragile, sans catégorie, `propriete` ; nuance « un manque de force physique, de résistance ou d'intensité » ; ne nomme pas 弱く |
| よく | 21 | ENTRY distincte de いい : son premier sens, la fréquence, ne se tire pas de いい ; l'emploi « bien » y est un second sens |
| 速い, 遅い | 17 | « Rapide », « Lent » : `espace_proprietes_spatiales › vitesse`, `propriete` |
| 右, 左 | 10 | `espace_proprietes_spatiales › direction_orientation › gauche_droite`, `lieu` |
| 違う | 20 | « Être différent » ; « Être incorrect », dimension `inexactitude` |
| 大きな, 小さな | 15 | `determinant`, chacune sur sa fiche (« adjectif adnominal ») |
| 一人, 二人 | 14 | classe `nom` (exceptions de classe décidées) ; 一人 a un sens « Seul » (`etat`) |
| 先 | 10 | classe `nom`, alors que l'ancien type était « adverbe » (exception décidée) |
| 出来る | 20 | dimension `possibilite`, sans `modalite` |
| 掃除 / 掃除する | 03 | fusion d'une forme en する dans son nom : une forme est fusionnée quand elle n'apporte pas d'identité lexicale propre, cas par cas |
| 出ます / 出る | 04 | une forme conjuguée tenant lieu d'ENTRY, fusionnée dans le verbe |
| 暖かい / 温かい | 17 | réouverture d'une ENTRY validée pour une fusion (le retiré était validé) |

## 5. Cas sensibles

Ils sont relevés ici, aucun n'est tranché.

### 5.1. Frontière mécanique : lectures

- **同じ** : la fiche porte `reading: "お同じ"`, qui mêle un kana et un kanji. Ses furigana
  (`<ruby>同<rt>おな</rt></ruby>じ`), son romaji (`onaji`) et son exemple donnent おなじ. La couche
  mécanique classe la lecture en exception (« hors kana ») ; elle est décidable sans liste fermée,
  et la correction se fonde sur la fiche elle-même, comme le kana de スポーツ (5.13-C).
- **一緒** : `word_furigana` vaut `<ruby>一<rt>いっ</rt></ruby><ruby>緒<rt>しょ</rt></guasubi>` : la
  balise qui ferme `<rt>しょ` est `</guasubi>` au lieu de `</rt>`. Son exemple écrit la forme
  correctement (`<ruby>一<rt>いっ</rt></ruby><ruby>緒<rt>しょ</rt></ruby>`). Même défaut et même
  remède que もう一度 (lot 21, D1383).
- **他** : l'exemple écrit le mot en kana (ほか) et altère le verbe (« なに か ります か », sans
  あ). Les exemples ne sont pas migrés.

### 5.2. Identité : 弱く et 弱い

La fiche de 弱く la dit **« formé à partir de la forme en -ku de l'adjectif en i yowai, utilisé
pour modifier un verbe »** ; elle ne décrit rien d'autre que cette forme. 弱い (`n5_v_449`) est
validée au lot 17, sans mention de 弱く.

| Issue | Ce qu'elle implique |
|---|---|
| **A. Fusion de 弱く dans 弱い** | règle normale du plus petit numéro (A3, L2 : 449 < 450), sans `exception-fusion` ; **弱い n'est pas rouverte**, son contenu validé ne change pas (essai en mémoire, §1) ; la forme en -ku relève de la morphologie (étape 3), comme les formes conjuguées ; précédent : 出ます dans 出る (lot 04) |
| B. ENTRY distincte (adverbe) | comme よく (lot 21) ; mais よく a un sens propre (la fréquence), que la fiche de 弱く ne donne pas : 弱く n'aurait que le sens de 弱い, sous une autre forme |
| C. Fusion, avec réouverture de 弱い | seulement si l'on veut que 弱い dise l'emploi adverbial en nuance : réouverture explicite et journalisée, comme 暖かい ; non nécessaire à la fusion elle-même |

**Je recommande l'issue A** : la fiche ne décrit qu'une forme de 弱い, ce qui ne fait pas une unité
lexicale distincte (A3, L3), et la fusion ne touche pas l'ENTRY validée. La différence avec よく est
dans les fiches : celle de よく donne un sens que いい n'a pas, celle de 弱く non.

### 5.3. Identité : ゆっくり et ゆっくりと

La fiche de ゆっくりと la dit **« variante renforcée de yukkuri suivie de la particule to »**, avec
un accent sur la lenteur ou la délibération, « dans un style un peu plus formel ou littéraire » ;
elle donne une traduction propre (« D'une manière posée ») et la particule と dans `particles`.

| Issue | Ce qu'elle implique |
|---|---|
| **A. Fusion de ゆっくりと dans ゆっくり** | plus petit numéro (504 < 505), sans exception ; l'emploi avec と et sa nuance de style passent en nuance de ゆっくり ; précédent : la règle du lot 03 (une forme fusionnée quand elle n'apporte pas d'identité lexicale propre) |
| B. Deux ENTRY | si la différence de style et de nuance fait une unité lexicale à part ; la fiche ne décrit pourtant que « ゆっくり + と » |

**Je recommande l'issue A**, avec le même critère que pour 弱く. Les deux entrées sont non décidées :
aucune réouverture n'est en jeu. **Rien n'est ajouté** : すぐに (lot 21) est restée une ENTRY parce
que すぐ n'est pas une entrée des sources ; ici, les deux formes en sont.

### 5.4. Classes

- **一緒** (exception) : la fiche dit « nom / adjectif en -no / adverbe », « souvent suivi de la
  particule ni : 一緒に » ; son exemple emploie 一緒に ; `particles` vaut `["に"]`. Ancien type :
  adverbe. Le relevé des exceptions le rangeait parmi les « noms rangés en adverbe », avec 先, que le
  lot 10 a décidé `nom`. **Je penche pour `nom`**, と / に étant des particules ; à arbitrer avec la
  proposition, ou dès le périmètre si l'on veut.
- **同じ** (exception) : la fiche dit « adjectif en na (souvent considéré grammaticalement comme un
  adjectif adnominal ou un nom nominal) » ; son exemple emploie 同じクラス, **sans な**. Ancien
  type : adjectif en na. Deux classes possibles : `adjectif_na` (la classe nommée par la fiche) ou
  `determinant` (l'emploi adnominal que la fiche dit fréquent, et que l'exemple atteste), comme
  大きな et 小さな. La fiche ne tranche pas : à peser à la proposition.
- **弱く** (exception) : sans objet si l'issue A est retenue ; sinon `adverbe`.
- **いろいろ** (mécanique, `adjectif_na`) et **まっすぐ** (mécanique, `adverbe`) : leurs fiches
  disent aussi « adverbe / adjectif nominal » et « adverbe (et adjectif en na) ». Le schéma ne porte
  qu'une classe par ENTRY (point ouvert depuis le lot 16) ; la classe mécanique reste.

### 5.5. Une confusion probable de la source : まっすぐ

Les traductions de la fiche sont « Tout droit ; Directement ; Honnête ; **Français** (pour une
direction ou un caractère) ». La nuance dit « une direction sans déviation ni virage (tout droit),
ou qualifiant un comportement droit et intègre ». « Français » ne correspond à rien dans la fiche :
c'est une confusion de la source. La doctrine s'applique : elle est **écartée et journalisée, sans
devenir un sens**, et **sans correction par connaissance externe** (aucune traduction n'est mise à
sa place) ; l'emploi pour un caractère reste attesté par « Honnête » et par la nuance. Le nombre de
sens (la direction ; le caractère) sera à peser à la proposition, selon le principe des deux
référents.

### 5.6. Fonctions linguistiques

| Mot | Fonction tentante | Ce que dit la fiche |
|---|---|---|
| たぶん | `modalite` | une probabilité de 70 à 80 % ; l'axe `probabilite` d'A2-DIM existe (précédent : 出来る, `possibilite`, sans `modalite`) |
| 同じ | `comparatif` | l'identité ou la similitude ; A2-DIM renvoie l'identité aux relations, non aux dimensions |
| いろいろ | `quantificateur` | la diversité, « plusieurs sortes de » |
| 他 | `alternative` | ce qui est « différent, additionnel ou extérieur » ; la structure « hoka ni » |

**Je propose de reconduire la doctrine du lot 20** : aucune fonction sans définition normative ;
`deictique` n'est en jeu pour aucune de ces entrées. Aucun de ces sens n'est perdu sans fonction :
la probabilité, l'identité, la diversité et l'altérité sont dites par le sens lui-même.

### 5.7. Sens et doctrine

Ce qui suit dit ce que la proposition aura à peser, sans le trancher.

1. **ゆっくり** : la faible vitesse d'un déplacement, et le fait d'agir sans se presser, de prendre
   son temps ; « gitaigo » (mot mimétique). Un sens, ou deux ? Catégorie `vitesse`, comme 速い et
   遅い ?
2. **まっすぐ** : la direction (l'exemple) et le caractère ; deux référents ?
3. **一緒** : ensemble, en compagnie ; « En même temps » est-il un autre référent ?
4. **同じ** : l'identité ou la similitude ; un seul référent.
5. **いろいろ** : la diversité ; un seul référent.
6. **他** : l'autre, ce qui s'ajoute, le reste, ce qui est en dehors ; un ou plusieurs référents ?
   « Le reste » rejoint le sens « Le reste » de 後 (lot 13, `totalite_partie › reste`).
7. **たぶん** : la probabilité ; un seul référent.
8. **Catégories** : plusieurs de ces sens sont généraux ; une part de catégories nulles est
   probable (A5), aucune n'étant cherchée pour réduire les avertissements.

## 6. Les fonctions linguistiques sans définition, et ce qu'elles bloquent

Repris du rapport de périmètre du lot 21 (§6), mis à jour après le lot 21. A2-LING-v1 fixe 14
fonctions ; **seule `deictique` a une définition normative** (A7). `interrogatif` (17 sens) et
`intensifieur` (le sens « Très » de 大変) ont été appliquées sur un sens implicite.

| Fonction | Mots restants qu'elle pourrait toucher | Effet sur le lot 22 | Effet sur la suite |
|---|---|---|---|
| `modalite` | たぶん | contournable (axe `probabilite`) | — |
| `comparatif` | 同じ ; もっと, 一番 | contournable pour 同じ | **bloquant** pour もっと et 一番 |
| `quantificateur` | いろいろ ; 多い, 少ない, 大勢, たくさん, 全部, 少し, ちょっと | contournable pour いろいろ | **bloquant** pour la quantité |
| `alternative` | 他 | contournable | — |
| `intensifieur` | とても, 結構, あまり, ちょっと | — | **bloquant** (précédent de 大変) |
| `negation` | いいえ ; あまり | — | à peser |
| `connecteur` | しかし, でも, そうして, それから, では, それでは, じゃ, じゃあ | — | **bloquant** |
| `discours` | じゃ, じゃあ, では, それでは ; はい, ええ | — | **bloquant** |
| `politesse` | どうぞ, どうも, いいえ, それでは, 結構 | — | **bloquant** |
| `pluralisation` | など ? | — | à peser, avec la classe de など |

## 7. Ce qui est à arbitrer

1. **Le thème et le périmètre** : « Manière, identité, diversité et probabilité », 9 entrées (6
   adverbes de l'ancien rangement, dont 弱く et 一緒 en exception de classe ; 2 adjectifs ; 1 nom), sans scission ni élargissement.
2. **弱く** (§5.2) : issue A, fusion dans 弱い (règle normale, sans réouverture de 弱い) ; ou issue
   B, ENTRY distincte ; ou issue C, fusion avec réouverture.
3. **ゆっくりと** (§5.3) : issue A, fusion dans ゆっくり ; ou issue B, deux ENTRY.
4. **Les fonctions linguistiques** (§5.6) : reconduire la doctrine du lot 20.
5. **まっすぐ** (§5.5) : « Français » écarté comme confusion de la source et journalisé, sans
   traduction de remplacement.
6. **Les relations** : report intégral à la passe finale 5.16, `relations: []` partout ; aucune
   candidate (si l'issue A est retenue pour 弱く et ゆっくりと, il n'y a plus de paire à inscrire).
7. **Pour la suite, sans le trancher maintenant** : la décision normative nécessaire avant le lot
   23 (§4, « point d'arrêt normatif »).

Laissés à la proposition, parce qu'ils se décident sur pièces : les lectures de 同じ et de 一緒 ; les
classes de 一緒 et de 同じ ; le nombre de sens de ゆっくり, まっすぐ, 一緒 et 他 ; catégories, types et
dimensions (dont `probabilite` pour たぶん).

Aucune proposition lexicale ne sera écrite avant l'arbitrage de ce périmètre.

## 8. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport, en entier | `06-lot-courant-rapports.md` |
| Les 9 fiches sources intégrales (traductions, nuance, exemple), le pré-remplissage mécanique et les anciens exemples de contexte | `07-lot-courant-sources.md`, partie 1 |
| Les précédents validés cités ici, chacun avec sa fiche, son état validé et ses décisions de journal (弱い, よく, いい, 速い, 遅い, 右, 左, 違う, 大きな, 小さな, 一人, 二人, 先, 出来る, 後, 掃除, 出る, 温かい…) | `07-lot-courant-sources.md`, partie 2 |
| Addenda A3 (fusions), A5, A6, A7, A8 | `04-addenda.md` |
| Registres A2-LING, A2-L3, A2-ST, A2-DIM ; classes grammaticales | `03-references-A2.md` |
| Règles mécaniques et listes fermées (`rules.mjs`, dont `CLASS_EXCEPTION_IDS`) | `02-conception.md` |
| Les 37 entrées restantes, regroupées | ce rapport, §4 |
| Les contrôles de périmètre | ce rapport, §1 ; contrôles relancés à l'export : `10-diff-et-controles.md`, §2 ; état relevé par l'outil : `05-relais.md`, partie 2 |
| Les identifiants candidats (aucun fichier de lot) | `08-lot-courant.json` ; `09` est vide, aucune décision |

## 9. Arbitrage du périmètre (2026-10-06)

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle »). Les
décisions retenues :

1. **Périmètre retenu** : « Manière, identité, diversité et probabilité », **9 entrées**, sans
   scission ni élargissement.
2. **弱く : issue A.** Fusion normale de `n5_v_450` dans `n5_v_449` 弱い, le plus petit identifiant,
   sans `exception-fusion` et **sans réouverture de 弱い**. 弱く est documentée uniquement comme la
   forme en -ku de 弱い : **aucun sens nouveau n'est créé sur 弱い** pour représenter cette forme.
3. **ゆっくりと : issue A.** Fusion normale de `n5_v_505` dans `n5_v_504` ゆっくり. L'emploi
   ゆっくりと et sa nuance stylistique attestée sont conservés dans la nuance de l'ENTRY survivante ;
   **と n'est pas transformée en particule régie** de ゆっくり.
4. **Doctrine du lot 20 reconduite** : aucune fonction A2-LING sans définition normative ; ni
   `modalite`, ni `comparatif`, ni `quantificateur`, ni `alternative` dans ce lot. Les dimensions
   existantes, notamment `probabilite` pour たぶん, sont à examiner à la proposition.
5. **まっすぐ** : « Français » est une confusion de la source ; elle est écartée et journalisée, sans
   traduction de remplacement inventée.
6. **Relations** : `[]` partout, et aucune candidate nouvelle à 5.16.

**Laissés à la proposition** : les lectures et les classes de 同じ et de 一緒 ; le découpage des
sens ; les catégories, types et dimensions.

**Pour la suite** : le lot 23 n'est pas préparé ; après le lot 22, le point d'arrêt normatif sur
les fonctions A2-LING non définies sera traité d'abord, explicitement.

**Ce qu'il n'autorise pas** : ni la validation du lot 22, ni un commit, ni un push.

**Suite donnée** : proposition lexicale en `proposed`, décisions à partir de D1404 (rapport
`docs/rapports/etape2-A2-04-lot22-proposition.md`).
