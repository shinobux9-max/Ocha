# A2-05 · bloc F · recherche d'omissions d'`interrogatif`, temps 3 — périmètre du groupe B

**Date** : 2026-11-04
**Statut** : **proposition, non arbitrée.** Aucun sens du groupe B n'est relu, aucun verdict lexical n'est pris, aucune donnée n'est modifiée.

**Demande** (relayée) : « Prépare également le périmètre du groupe B : 18 sens dans 15 ENTRY, avec les identifiants, le thème, les sources disponibles, les décisions historiques pertinentes et la méthode de relecture selon A10. Ne commence aucun verdict lexical sur le groupe B avant mon acceptation explicite de son périmètre. »

**Base** :
- addendum A10 (§2 à §4, §6, §8) ;
- découpage accepté le 2026-11-04 (`a2-05-travail/omissions-temps3/decoupage.json`, SHA-256 `56da6952…7acc46`).

**Outillage** : `a2-05-travail/omissions-temps3/preparer-perimetre-B.mjs`, en lecture seule, code 0 ; il produit `perimetre-B.json` et `dossier-B.md` (annexe), où se trouvent les tableaux complets.

## 1. Thème du groupe

**Décisions du journal (T2-journal).** Chacun des 18 sens est relevé parce qu'une décision de journal de son ENTRY emploie le vocabulaire de la question (« interrog », « question », « demand »). Aucun ne porte un filtre du temps 1. Comme tout filtre, c'est un indice à relire, **jamais une preuve** (A10, §8).

Les dix-sept décisions en cause se rangent en trois familles :

| Famille | Sens | Ce que dit la décision |
|---|---|---|
| a. « Demander », « question » au sens courant, dans une décision de tags, de graphie, de nuance ou de sens | 13 : 締める, お弁当, ご飯 (2), 箸, かかる, ナイフ, お皿, コップ, スプーン, フォーク, たばこ (2) | un couvert « qu'on demande » au restaurant ; « même question que お皿 » ; une tâche qui « demande » du temps ; « la question avait été signalée »… |
| b. Démonstratifs dont une décision de tags dit « démonstratif ou interrogatif d'usage général » | 4 : こちら (2), そちら, それ | D0672, D0677, D0637 : formule commune aux décisions de tags du lot 11 |
| c. Formule de politesse dont la classe est dite employée « avec une demande » | 1 : どうぞ | D1500 ; どうぞ porte aussi `T2-serie` (どう) et `T2-classe` |

## 2. Identifiants : 18 sens, 15 ENTRY

| N° | SENSE | ENTRY | Mot | Traduction publiée | Filtres d'origine | Fonctions publiées | Lot 3 |
|---|---|---|---|---|---|---|---|
| 1 | `v_82_s1` | `v_82` | 締める | Serrer | `T2-journal` | — | B12 |
| 2 | `v_84_s1` | `v_84` | お弁当 | Bento | `T2-journal` | — | C1 |
| 3 | `v_88_s1` | `v_88` | ご飯 | Riz cuit | `T2-journal` | — | C1 |
| 4 | `v_88_s2` | `v_88` | ご飯 | Repas | `T2-journal` | — | — |
| 5 | `v_111_s1` | `v_111` | 箸 | Baguettes | `T2-journal` | — | — |
| 6 | `v_163_s1` | `v_163` | かかる | Prendre (du temps ou de l'argent) | `T2-nuls`, `T2-journal` | — | — |
| 7 | `v_211_s1` | `v_211` | ナイフ | Couteau | `T2-journal` | — | — |
| 8 | `v_225_s1` | `v_225` | お皿 | Assiette | `T2-journal` | — | — |
| 9 | `v_230_s1` | `v_230` | コップ | Verre | `T2-journal` | — | — |
| 10 | `v_231_s1` | `v_231` | スプーン | Cuillère | `T2-journal` | — | — |
| 11 | `v_232_s1` | `v_232` | フォーク | Fourchette | `T2-journal` | — | — |
| 12 | `v_339_s1` | `v_339` | こちら | Par ici | `T2-classe`, `T2-journal` | `deictique` | D2 |
| 13 | `v_339_s2` | `v_339` | こちら | Moi, nous (poli) | `T2-classe`, `T2-journal` | `deictique` | D2 |
| 14 | `v_340_s1` | `v_340` | そちら | Par là | `T2-classe`, `T2-journal` | `deictique` | D2 |
| 15 | `v_342_s1` | `v_342` | それ | Cela | `T2-classe`, `T2-journal` | `deictique` | D2 |
| 16 | `v_598_s1` | `v_598` | たばこ | Cigarette | `T2-nuls`, `T2-journal` | — | — |
| 17 | `v_598_s2` | `v_598` | たばこ | Tabac | `T2-nuls`, `T2-journal` | — | — |
| 18 | `v_600_s1` | `v_600` | どうぞ | S'il vous plaît | `T2-classe`, `T2-serie`, `T2-journal` | `politesse` | D7 |

**Contrôles** (tous conformes) :
- les filtres d'origine sont identiques à la mesure ;
- aucune ENTRY du groupe ne figure dans un autre groupe ;
- tous les sens publiés de ces 15 ENTRY sont candidats ;
- aucun sens n'est rattaché par son ENTRY : chacun porte lui-même `T2-journal`.

## 3. Sources disponibles

- **15 fiches sources**, toutes présentes, aucune fiche fusionnée, chacune dans un lot validé :
  - lot 02 : お弁当, ご飯, 箸, ナイフ, お皿, コップ, スプーン, フォーク ;
  - lot 11 : こちら, そちら, それ ;
  - lot 18 : 締める ;
  - lot 19 : たばこ ;
  - lot 20 : かかる ;
  - lot 23 : どうぞ.
- **Anciens exemples** : trois par fiche (45 au total).
- **Le reste du dossier de chaque sens** :
  - l'ENTRY publiée et tous ses sens ;
  - l'entrée de son lot ;
  - pour les huit sens communs au lot 3, leur verdict arbitré (B12, C1, D2, D7), cité et non rouvert.
- **À l'export de la relecture**, comme pour A : les 15 fiches complètes, leurs anciens exemples et les ENTRY publiées.

## 4. Décisions historiques pertinentes

**53 décisions de journal**, toutes `validated`. **Les dix-sept qui emploient le vocabulaire de la question** sont citées en entier dans `dossier-B.md` :

| Famille | Décisions |
|---|---|
| a | D1215, D0169, D0165, D0207, D1343, D0213, D0201, D0202, D0205, D0209, D0211, D1294, D1612 |
| b | D0672, D0677, D0637 |
| c | D1500 |

**Point à signaler (famille b).** D0637 (それ), D0672 (こちら) et D0677 (そちら) écartent un tag de lieu en qualifiant ces mots de « démonstratif ou interrogatif d'usage général ». Ce sont des décisions de **tags**, antérieures à A10, sur un gabarit commun. Elles ne posent pas la fonction ; aucune de ces ENTRY ne porte `interrogatif`. La relecture dira, en R5, si cette qualification s'accorde avec la définition d'A10, **sans réécrire ces décisions**. Une discordance éventuelle serait signalée comme observation, à arbitrer séparément.

**Fonctions déjà portées** :
- `deictique` : `v_339_s1`, `v_339_s2`, `v_340_s1`, `v_342_s1` (décisions du lot 11, A7) ;
- `politesse` : `v_600_s1` (lot 23, A9).

Un cumul ne se poserait (A10, §6) que si la fonction `interrogatif` était établie.

**Corrections retenues, non appliquées** : sept, dans six ENTRY. Elles sont lues, ni appliquées ni rouvertes.

| ENTRY | Corrections |
|---|---|
| お弁当 | V2-57 (`nuance`) |
| ご飯 | V2-60 (`nuance`) |
| 箸 | V2-64 (`nuance`) |
| ナイフ | V2-66 (`nuance`) |
| こちら | V2-124 (`nuance`, sens 1), V2-125 (`nuance`, sens 2) |
| そちら | V2-126 (`nuance`, sens 1) |

## 5. Méthode de relecture (A10, §8, temps 3)

Elle est **identique à celle du groupe A** (QA-4, accepté) :
- la fiche entière, les anciens exemples, l'ENTRY publiée et tous ses sens, toutes les décisions de journal de l'ENTRY et l'entrée de son lot ;
- les corrections retenues (lues, non appliquées) et, pour les huit sens communs au lot 3, leur verdict arbitré (cité, non rouvert).

**Grille R1 à R5, sur la fonction seule** :

| N° | Question | Référence |
|---|---|---|
| R1 | Demander une information non spécifiée fait-il partie intégrante du sens modélisé ? | A10, §2 ; §3, point 1 |
| R2 | La fiche l'atteste-t-elle ? Une nuance, une traduction contextuelle ou une question d'exemple ne suffisent pas. | A10, §3, point 1 ; §8 |
| R3 | Une frontière s'applique-t-elle (indéfini, `deictique`, registre poli, sens qui nomme une question, marque grammaticale) ? | A10, §4 |
| R4 | Si R1 et R2 sont positives, un cumul serait-il fondé ? | A10, §6 |
| R5 | Les décisions existantes, en particulier les dix-sept citées, s'accordent-elles avec la définition ? Elles sont citées, jamais réécrites. | A10, §8 |

**Principes propres au groupe B** :
- **le filtre `T2-journal` porte sur une décision, non sur le sens** : une décision qui emploie « demander » ou « question » ne dit rien, à elle seule, du sens. La relecture lit donc d'abord la fiche ; la décision n'intervient qu'en R5 ;
- **jamais par la classe ni par la série** (A10, §3, point 2), pour les démonstratifs de la série ko-so-a-do et pour どうぞ (série en ど, via どう) ;
- **sens par sens** (§3, point 3), notamment pour こちら (deux sens) et たばこ (deux sens) ;
- la catégorie et le type ne sont pas réexaminés ; une anomalie remarquée hors de la fonction est consignée comme observation, sans verdict ni correction.

**Conclusions**, une par sens, motivée : « ne relève pas de la fonction », « relève de la fonction » (omission signalée, rien n'est modifié, hors des 377) ou « à arbitrer ».

**Livraison** : un seul rapport de relecture du groupe B, en proposition, avec le recueil des 15 fiches complètes, sur le modèle de A.

## 6. Ce qui reste séparé

- **Les 377 sens du lot 3** ne sont pas rouverts ; les huit sens communs reçoivent une conclusion sur la seule fonction.
- **Les 204 corrections** restent non appliquées.
- **La recherche d'omissions** est comptée à part. Après A : 39 relus, 195 restent ; B en porte 18.
- **Les groupes C à E** ne sont pas commencés.

## 7. Questions à l'arbitrage

1. **QB-1** : accepter le périmètre du groupe B tel qu'il est (18 sens, 15 ENTRY, thème T2-journal).
2. **QB-2** : appliquer à B la méthode de A (grille R1 à R5, trois conclusions, un seul rapport, recueil des 15 fiches complètes à l'export).
3. **QB-3** : pour les huit sens communs au lot 3 (`v_82_s1`, `v_84_s1`, `v_88_s1`, `v_339_s1`, `v_339_s2`, `v_340_s1`, `v_342_s1`, `v_600_s1`), une conclusion sur la seule fonction, leurs verdicts du lot 3 cités et non rouverts.
4. **QB-4** : pour D0637, D0672 et D0677 (« démonstratif ou interrogatif d'usage général »), dire en R5 si la qualification s'accorde avec A10, sans réécrire ces décisions ; une discordance éventuelle serait une observation, à arbitrer séparément.
5. **QB-5** : autoriser, distinctement, l'ouverture de la relecture du groupe B.
