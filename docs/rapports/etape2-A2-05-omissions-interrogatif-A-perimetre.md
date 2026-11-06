# A2-05 · bloc F · recherche d'omissions d'`interrogatif`, temps 3 — découpage des 234 candidats et périmètre du groupe A

**Date** : 2026-11-04
**Statut** : **périmètre accepté le 2026-11-04 (§0).** La proposition est conservée telle qu'elle a été livrée ; aucune donnée n'est modifiée.

**Demande** (relayée) : « Vérifie cette répartition sur la liste réelle, sans doublon et sans couper une ENTRY. Préserve tous les filtres d'origine de chaque sens. Prépare le périmètre du groupe A : identifiants des sens et des ENTRY, thème, sources disponibles, décisions historiques applicables et méthode de relecture selon A10 §8. Ne commence aucun verdict lexical avant mon acceptation de ce périmètre. »

**Base** :
- la mesure de couverture prise en acte (`a2-05-travail/arbitrage-F/mesure-couverture/mesure/mesure.json`, SHA-256 `7637157e…1d44` : 807 sens, 234 candidats, 573 non relevés, 0 relu) ;
- addendum A10, §2 à §4, §6 et §8.

**Outillage** : `a2-05-travail/omissions-temps3/preparer-decoupage-A.mjs`, en lecture seule, code 0 (sortie complète en annexe). Il produit `decoupage.json`, `perimetre-A.json` et `dossier-A.md` (les tableaux factuels).

## 0. Arbitrage

Arbitrage du 2026-11-04 (ChatGPT, par délégation ; relayé par l'utilisateur) : « QA-1 : OUI — découpage des 234 candidats en cinq groupes A à E, avec la règle de priorité par ENTRY. » « QA-2 : OUI — les quatre sens rattachés à leur ENTRY seront examinés dans A, avec leurs propres filtres. » « QA-3 : OUI — les 24 sens communs au lot 3 seront examinés uniquement sur la fonction interrogative. Les décisions historiques ne seront pas rouvertes. 聞く et 質問 recevront chacun une conclusion individuelle motivée. » « QA-4 : OUI — grille R1 à R5, trois conclusions selon A10 et un seul rapport pour A. » « QA-5 : OUI — périmètre A accepté : 39 sens dans 31 ENTRY. » « J'autorise distinctement l'ouverture de la relecture lexicale du groupe A, strictement dans ce périmètre. »

**Effets.** Le découpage en cinq groupes (A 39 sens, B 18, C 3, D 53, E 121 ; 195 ENTRY) est accepté ; chaque groupe autre que A attend son propre périmètre. Les annexes citées sont dans le dossier de travail `a2-05-travail/omissions-temps3/` : `dossier-A.md` (annexe A), `decoupage.json` (SHA-256 `56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46`, annexe C), `perimetre-A.json`. Le texte qui suit est la proposition, conservée telle qu'elle a été livrée.

## 1. Découpage des 234 candidats : vérifié

**Règle.** Chaque ENTRY va, **entière**, dans le premier groupe (dans l'ordre A, B, C, D, E) dont au moins un de ses sens candidats porte un filtre du groupe :

| Groupe | Filtres du groupe |
|---|---|
| A | `T1-radicaux`, `T1-point`, `T1-mots` |
| B | `T2-journal` |
| C | `T2-serie` |
| D | `T2-classe` |
| E | `T2-nuls` |

La règle n'était pas écrite dans la proposition reçue. Je l'ai reconstituée, et elle **reproduit exactement les nombres proposés** ; une répartition sens par sens donnerait A 35, D 55 et E 123, et couperait quatre ENTRY.

| Groupe | Thème | Sens | ENTRY | Rattachés par leur ENTRY |
|---|---|---|---|---|
| A | indices textuels du temps 1 | 39 | 31 | 4 |
| B | décisions du journal | 18 | 15 | 0 |
| C | série | 3 | 2 | 0 |
| D | classe grammaticale | 53 | 40 | 0 |
| E | valeurs nulles | 121 | 107 | 0 |
| **Total** | | **234** | **195** | **4** |

**Contrôles, tous conformes** :
- 234 sens, aucun doublon ;
- 195 ENTRY, aucune coupée, aucune dans deux groupes ;
- les filtres d'origine de chaque sens sont **conservés à l'identique**, y compris ceux qui ne sont pas le filtre de son groupe (un sens du groupe B peut porter aussi `T2-nuls`) ;
- les nombres de chaque groupe sont égaux à ceux proposés.

**Les quatre sens rattachés par leur ENTRY**, tous dans A, ne portent aucun filtre du temps 1 :

| Sens | ENTRY | Filtres d'origine |
|---|---|---|
| `v_414_s1` (そっち « Par là ») | `v_414` | `T2-classe` |
| `v_517_s2` (一番 « Numéro un ») | `v_517` | `T2-classe` |
| `v_542_s2` (吸う « Aspirer ») | `v_542` | `T2-nuls` |
| `v_664_s2` (所 « Partie ») | `v_664` | `T2-nuls` |

La liste nominative des sens de chaque groupe est dans `decoupage.json` (annexe C).

## 2. Périmètre du groupe A

**Thème** : les **indices textuels du temps 1**. Au moins un sens de l'ENTRY porte, dans sa fiche ou dans ses valeurs publiées :
- un radical de la question (« interrog », « question », « demand ») ;
- un point d'interrogation ;
- ou un mot interrogatif français en traduction.

C'est un indice à relire, **jamais une preuve** (A10, §8).

**39 sens dans 31 ENTRY**, dans l'ordre de la mesure ; les tableaux complets sont en annexe A.

| ENTRY | Mot | Sens |
|---|---|---|
| `v_116` | 頼む | `v_116_s1`, `v_116_s2` |
| `v_120` | 飲み物 | `v_120_s1` |
| `v_124` | テスト | `v_124_s1` |
| `v_174` | 答える | `v_174_s1` |
| `v_175` | 聞く | `v_175_s1`, `v_175_s2` |
| `v_240` | 交番 | `v_240_s1` |
| `v_243` | 国 | `v_243_s1` |
| `v_269` | 天気 | `v_269_s1` |
| `v_392` | そこ | `v_392_s1` |
| `v_414` | そっち | `v_414_s1`, `v_414_s2` |
| `v_444` | 好き | `v_444_s1` |
| `v_465` | 痛い | `v_465_s1` |
| `v_486` | 難しい | `v_486_s1` |
| `v_503` | もう一度 | `v_503_s1` |
| `v_510` | 本当 | `v_510_s1` |
| `v_511` | 問題 | `v_511_s1`, `v_511_s2` |
| `v_517` | 一番 | `v_517_s1`, `v_517_s2` |
| `v_542` | 吸う | `v_542_s1`, `v_542_s2` |
| `v_584` | いいえ | `v_584_s1`, `v_584_s2` |
| `v_596` | そうして | `v_596_s1` |
| `v_605` | 他 | `v_605_s1` |
| `v_638` | 兄弟 | `v_638_s1` |
| `v_651` | 名前 | `v_651_s1` |
| `v_664` | 所 | `v_664_s1`, `v_664_s2` |
| `v_677` | 水 | `v_677_s1` |
| `v_688` | 私 | `v_688_s1` |
| `v_700` | 誰か | `v_700_s1` |
| `v_702` | 質問 | `v_702_s1` |
| `v_703` | 辺 | `v_703_s1` |
| `v_718` | レジ袋 | `v_718_s1` |
| `v_719` | ポイントカード | `v_719_s1` |

Tous les sens publiés de ces 31 ENTRY sont candidats : aucun sens non relevé n'est mêlé au groupe.

### 2.1 Sources disponibles

- **32 fiches sources**, toutes présentes : les 31 fiches des ENTRY, plus `n5_v_514`, fusionnée vers 本当 (`v_510`). Deux fiches sont hors JLPT (`hj_v_1`, `hj_v_2`).
- **Anciens exemples** (`reconstruction/a2-04/sources/exemples.json`) : 3 par fiche N5 (4 pour 兄弟), **aucun pour les deux fiches hors JLPT**.
- **Le reste du dossier de chaque sens** :
  - l'ENTRY publiée (`data/`) et tous ses sens ;
  - l'entrée de son lot d'origine (17 lots, tous validés) ;
  - les rapports d'audit du lot 3, pour les sens qui y figurent (§2.3).

### 2.2 Décisions historiques applicables

**76 décisions de journal**, toutes `validated`, rattachées aux fiches des 31 ENTRY.

**Quatre ENTRY n'ont aucune décision de journal** : elles ont été décidées dans leur lot, avec `journal: []`.

| ENTRY | Mot | Lot |
|---|---|---|
| `v_124` | テスト | 06 |
| `v_638` | 兄弟 | 01 |
| `v_718` | レジ袋 | 05 |
| `v_719` | ポイントカード | 05 |

**Treize décisions emploient le vocabulaire de la question** (en gras dans l'annexe A) : D0509, D0510, D0512, D0724, D1095, D1276, D1277, D1358, D1360, D1384, D1494, D1602, D1609. Deux points concernent directement la fonction ou sa frontière :
- **D0724** (誰か) refuse la fonction : « pas de fonction interrogative (誰か n'interroge pas) » ; A10, §4, point 1, la cite comme exemple de frontière ;
- **聞く (`v_175_s2`, D0509) et 質問 (`v_702_s1`, D0512)** sont nommés par A10, §4, point 4 (« nommer une question n'est pas interroger »).

Ces décisions sont **citées, jamais réécrites** ; la relecture dit si elles s'accordent avec la définition.

**Corrections retenues, non appliquées** : douze, touchant dix ENTRY du groupe. Elles sont **lues, ni appliquées ni rouvertes**.

| ENTRY | Corrections |
|---|---|
| 飲み物 | V2-65 (`nuance`), V1-20 (`tags`) |
| 聞く | V2-104 (`nuance`, sens 2) |
| 交番 | V2-4 (`nuance`) |
| 国 | V2-109 (`nuance`) |
| 天気 | V2-17 (`nuance`) |
| そっち | V2-132 (`nuance`, sens 2) |
| 難しい | V2-160 (`nuance`) |
| もう一度 | volet 2, modification 10 (`category`) |
| 水 | V2-71 (`nuance`), V1-21 (`tags`) |
| 私 | V2-143 (`nuance`, sens 1) |

### 2.3 Recoupement avec les 377 sens du lot 3

**24 des 39 sens sont aussi parmi les 377 sens arbitrés du lot 3**, examinés sur les axes C1 à C10, non sur la fonction `interrogatif`.

| Sens | Livraison du lot 3 |
|---|---|
| `v_116_s1` | B15 |
| `v_116_s2` | B4 |
| `v_120_s1` | C2 |
| `v_124_s1` | B5 |
| `v_175_s1` | B10 |
| `v_175_s2` | B2 |
| `v_240_s1` | B4 |
| `v_269_s1` | D1 |
| `v_392_s1` | D2 |
| `v_414_s1` | D3 |
| `v_414_s2` | D3 |
| `v_465_s1` | E1 |
| `v_511_s2` | B5 |
| `v_517_s1` | D8 |
| `v_517_s2` | A7 |
| `v_584_s1` | D7 |
| `v_584_s2` | D7 |
| `v_596_s1` | D7 |
| `v_638_s1` | D1 |
| `v_677_s1` | C2 |
| `v_688_s1` | D3 |
| `v_702_s1` | B3 |
| `v_718_s1` | B12 |
| `v_719_s1` | C4 |

Leurs verdicts du lot 3 sont **cités, non rouverts** ; la relecture du temps 3 ne porte que sur la fonction.

### 2.4 Sens qui portent déjà une autre fonction

| Fonction | Sens |
|---|---|
| `deictique` | `v_392_s1`, `v_414_s1`, `v_414_s2`, `v_688_s1` |
| `comparatif` | `v_517_s1` |
| `discours` | `v_584_s1` |
| `politesse` | `v_584_s2` |
| `connecteur` | `v_596_s1` |

Pour eux, un cumul ne se pose (A10, §6) que si la fonction `interrogatif` était établie.

## 3. Méthode de relecture (A10, §8, temps 3)

**Ce que l'on lit, pour chaque sens** :
- la fiche source entière (type, traductions principale et secondaires, nuance, rangement source, exemple), et celles qui lui sont fusionnées ;
- les anciens exemples, lus en entier ;
- l'ENTRY publiée et tous ses sens ;
- toutes les décisions de journal de l'ENTRY et l'entrée de son lot ;
- les corrections retenues qui la touchent (lues, non appliquées) ;
- pour les 24 sens du lot 3, leur verdict arbitré (cité, non rouvert).

**Questions, sur la fonction seule** :

| N° | Question | Référence |
|---|---|---|
| R1 | Demander une information non spécifiée fait-il partie intégrante du sens tel qu'il est modélisé ? | A10, §2 ; §3, point 1 |
| R2 | La fiche source l'atteste-t-elle ? Une nuance qui mentionne un emploi, une traduction contextuelle en forme de question, ou une question dans un exemple ne suffisent pas. | A10, §3, point 1 ; §8, temps 1 |
| R3 | Une frontière s'applique-t-elle ? Indéfini ou emploi concessif ; `deictique` ; registre poli ; sens qui **nomme** une question ou l'acte de demander ; marque grammaticale de l'interrogation. | A10, §4, points 1 à 5 |
| R4 | Si R1 et R2 sont positives, un cumul avec une fonction déjà portée serait-il fondé (rôle distinct, intégral, attesté) ? | A10, §6 |
| R5 | Une décision existante (D0724, D0509, D0512…) s'accorde-t-elle avec la définition ? Elle est citée, jamais réécrite. | A10, §8, compte rendu |

**Principes** :
- sens par sens (§3, point 3) ;
- jamais par la classe ni par la série (§3, point 2) ;
- les filtres d'origine sont rappelés pour chaque sens, mais ne pèsent pas dans la conclusion ;
- la catégorie et le type ne sont pas réexaminés. Une anomalie remarquée hors de la fonction est consignée comme observation hors périmètre, sans verdict ni correction.

**Conclusions**, une par sens et motivée :
- « ne relève pas de la fonction » ;
- « relève de la fonction » : une **omission signalée**, qui ne modifie rien, est portée à l'arbitrage et n'est pas ajoutée aux 377 ;
- « à arbitrer ».

**Livraison** : un seul rapport de relecture du groupe A, en proposition. Il contient une section par sens (filtres d'origine, sources lues, réponses R1 à R5, conclusion, motif), le décompte des trois conclusions, et l'état des quatre sens rattachés.

## 4. Ce qui reste séparé

- **Les 377 sens arbitrés du lot 3** : rien n'est rouvert. Les 24 sens communs reçoivent une conclusion sur la seule fonction, dans un décompte distinct.
- **Les 204 corrections retenues** : non appliquées, ni modifiées ni complétées.
- **La recherche d'omissions** : son décompte (234 candidats, 573 non relevés) n'est jamais additionné aux 377 ni au contrôle des 17 porteurs. Les groupes B à E attendent chacun leur propre périmètre.

**Hors périmètre** : les 573 sens non relevés ; les groupes B à E ; toute modification des données, des normes, des lots, du journal ou des documents de pilotage ; l'inscription de la mesure et de ce découpage dans les documents de pilotage.

## 5. Questions à l'arbitrage

1. **QA-1** : accepter le découpage en cinq groupes selon la règle du §1 (ENTRY entières, ordre A à E, filtres conservés).
2. **QA-2** : accepter que les quatre sens rattachés (`v_414_s1`, `v_517_s2`, `v_542_s2`, `v_664_s2`) soient relus dans A avec le reste de leur ENTRY, avec leurs propres filtres.
3. **QA-3** : pour les 24 sens communs au lot 3, une conclusion sur la seule fonction, les verdicts du lot 3 cités et non rouverts. 聞く et 質問, nommés en exemples par A10, §4, point 4, reçoivent aussi une conclusion individuelle motivée.
4. **QA-4** : accepter la grille R1 à R5, les trois conclusions et la livraison en un seul rapport.
5. **QA-5** : accepter le périmètre du groupe A tel qu'il est (39 sens, 31 ENTRY), puis autoriser, distinctement, l'ouverture de sa relecture.
