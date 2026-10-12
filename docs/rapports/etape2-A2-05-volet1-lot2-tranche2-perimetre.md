# Étape 2 · A2-05 · Volet 1 · Lot 2 — périmètre proposé de la tranche 2 du contrôle de provenance

**Date** : 2026-10-10
**Statut** : **périmètre arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l'utilisateur), sous les précisions du §0. La proposition est conservée telle quelle aux §1 à §9.

## 0. Arbitrage du périmètre (2026-10-10)

**Avis favorable au plan recalculé**, avec ces réponses aux questions du §9 :

1. **Les 83 faux positifs présumés sont contre-vérifiés**, et non les seuls 50 rapprochés par le romaji : le cas 風 / 風邪 montre qu'un rapprochement en kana peut aussi confondre deux homophones.
2. **Les 83 contre-vérifications sont réparties dans les tranches de leurs lots d'origine**, sans tranche séparée.
3. **La règle de détection des caractères isolés est acceptée** (tout kanji isolé ; tout kana isolé que le critère des particules de la fiche n'exclut pas). Elle sert **au seul repérage**, jamais à un verdict automatique.
4. **Le bloc 1 bis (10 nuances, lots 04 et 07) et la tranche 2 (43 nuances, lots 00 et 01) sont acceptés, en livraisons séparées**, chacune avec ses propres contrôles de complétude ; **la tranche 2 est subdivisée par lot d'origine** (lot 00 : 9 ; lot 01 : 34). Ordre : le bloc 1 bis d'abord, puis la tranche 2 lot par lot.
5. **Rattachement des deux nuances hors JLPT (`hj_v_1`, `hj_v_2`) à la future tranche 4, accepté en proposition** : contrôlées sur leurs fiches source propres (`sources/vocab-hors-jlpt.json`), comptées à part de l'univers des 684 nuances.

**Conditions de l'audit** : pour chaque nuance, lecture entière de la fiche source (traductions, nuance, exemple, anciens exemples) et contrôle de la provenance de chaque élément japonais pertinent ; **un rapprochement par la lecture ou un caractère isolé ne vaut jamais preuve** ; le texte français des nuances et les axes C1 à C10 restent hors périmètre ; les 377 candidats restent ouverts ; aucun verdict du volet 2 n'est rouvert ; à la clôture de chaque sous-tranche, le décompte est actualisé sans double comptage. À la clôture de toute la tranche 2, le périmètre de la tranche 3 sera proposé, sans audit avant accord.

**Proposition d'origine (2026-10-10)** : *proposition de périmètre, non arbitrée. Aucun audit lexical de la tranche 2 n'est commencé : aucune nuance n'a été lue en vue d'un verdict.* Ce rapport est calculé par `a2-05-travail/perimetre-v1-lot2-t2.mjs`, en lecture seule, sur le tri, le criblage, les fiches sources, les lots et les rapports arbitrés ; rien n'est modifié dans les données, le journal, les registres, les outils ni les snapshots.

## 1. Ce qui change depuis le périmètre du lot 2

La tranche 1 est arbitrée le 2026-10-10 : 9 sourcés, 25 écarts. L'arbitrage retient **deux défauts du tri** et précise qu'**ils ne permettent de déclarer ni faux ni vrais les autres signalements**. Le plan des tranches doit donc couvrir, en plus des 151 nuances encore à examiner, ce que le tri a écarté ou n'a pas vu.

1. **Une correspondance par la lecture peut confondre deux homophones.** L'arbitrage le formule pour le romaji (« 風 et 風邪 ») et vise les 50 nuances écartées à ce titre. **Constat factuel, à arbitrer** : 風邪 n'a pas été écarté par le romaji, mais par la comparaison des lectures en kana. Le tri l'a rangé en B-transcription : 風邪 se lit かぜ, et l'exemple de la fiche de 風 écrit かぜ en kana. Le même défaut atteint donc les deux classes de faux positifs, **50 nuances B-romaji et 33 nuances B-transcription**, soit les 83. Le rapport de la tranche 1 porte un erratum sur ce point (fiche de 風), sans changer son verdict.
2. **Les chaînes japonaises d'un seul caractère ne sont pas détectées.** Le criblage T5 ne relève que les chaînes d'au moins deux caractères. Un caractère isolé (雨, 飴) n'a donc été vu que dans les nuances lues en entier.

## 2. Plan complet du chantier, recalculé

Chaque nuance publiée (de sens ou d'ENTRY) des ENTRY décidées reçoit un statut, calculé :

| Statut | Nuances | Définition |
|---|---|---|
| arbitré au lot 1 | 3 | les trois sens arbitrés au lot 1 (出る sens 2 et 3, 吹く sens 2) |
| arbitré en tranche 1 | 33 | les 33 nuances de la tranche 1, lues en entier |
| à examiner | 151 | signalées par le criblage, classe A, C, D ou E du tri |
| faux positif à contre-vérifier | 83 | signalées par le criblage, écartées par le tri (B-romaji ou B-transcription) |
| un caractère seulement | 44 | jamais signalées, mais portant une chaîne japonaise d'un seul caractère : un kanji, ou un kana qui n'est pas une particule du champ des fiches (§7) |
| hors chantier | 370 | ni signalées, ni porteuses d'une chaîne d'un caractère |
| **Total** | **684** | toutes les nuances publiées des ENTRY décidées |

**Restent à lire : 278 nuances** (151 à examiner, 83 faux positifs, 44 à chaîne d'un caractère seulement). Les tranches suivent les lots d'origine, comme au périmètre du lot 2. Les lots qui n'avaient aucune nuance à examiner (13, 14, 16, 17, 19, 20, 21, 22, 23, 24) n'ont que des faux positifs ou des chaînes d'un caractère : ils forment une tranche 8. **Le complément des lots 04 et 07**, lots de la tranche 1 arbitrée, forme un bloc « 1 bis » (§3).

| Tranche | Lots d'origine | À examiner | Faux positifs à contre-vérifier | Un caractère seulement | Total |
|---|---|---|---|---|---|
| 1 bis (ce périmètre) |  ; complément de la tranche 1 : 04, 07 | 0 | 2 | 8 | 10 |
| 2 (ce périmètre) | 00, 01 | 31 | 11 | 1 | 43 |
| 3 | 02, 03 | 29 | 2 | 5 | 36 |
| 4 | 05, 06 | 23 | 3 | 4 | 30 |
| 5 | 08, 09 | 25 | 3 | 1 | 29 |
| 6 | 10, 11 | 35 | 8 | 4 | 47 |
| 7 | 12, 15, 18 | 8 | 20 | 11 | 39 |
| 8 | 13, 14, 16, 17, 19, 20, 21, 22, 23, 24 | 0 | 34 | 10 | 44 |
| **Total** | | **151** | **83** | **44** | **278** |

**Troisième lacune, relevée en recalculant l'univers, hors de ce plan** : 2 nuances appartiennent à des ENTRY hors JLPT (`hj_v_1`, lot 05 ; `hj_v_2`, lot 05). Leurs fiches sont dans `sources/vocab-hors-jlpt.json`, que le criblage T5 ne lit pas : il les a comptées à part (`horsSources`), sans les cribler. Elles portent du japonais (« Payant au Japon depuis 2020 : le caissier demande presque toujours si l'on en veut un (レジ袋はご利用ですか). » ; « Le caissier demande souvent ポイントカードはお持ちですか : on répond いいえ, ou on la montre. »). **Proposé** : les ajouter à la tranche 4 (lot 05), contrôlées sur leur fiche hors JLPT ; elles n'entrent dans aucun décompte avant cet arbitrage.

## 3. Thème et taille de la tranche 2

**Thème : les lots 00 (« Identité : doublons candidats, formes et lectures avec « / » ») et 01 (« Personnes, famille, corps et santé »)**, dans l'ordre proposé au périmètre du lot 2. Le lot 01 domine : termes de parenté et d'adresse (formes respectueuses en お et ご), parties du corps et santé ; ses nuances renvoient souvent à une autre ENTRY (le terme neutre, le terme respectueux, l'homophone). La question reste la seule du chantier : chaque élément japonais de la nuance est-il dans les fiches de l'ENTRY, ou une décision validée en assume-t-elle l'origine ?

**Taille : 43 nuances, dans 43 ENTRY** : 31 à examiner, 11 faux positifs à contre-vérifier, 1 à chaîne d'un caractère seulement ; 37 nuances d'ENTRY, 6 nuances de sens. Par lot : 00 : 9 ; 01 : 34. **Aucune particule** n'y reste à contrôler : les quatre signalements du criblage sont arbitrés (lot 1 et tranche 1). La tranche dépasse la tranche 1 (34 unités) : aux 31 nuances prévues au périmètre du lot 2 s'ajoutent 12 contre-vérifications, courtes pour la plupart (un mot à identifier). **Option, si l'arbitrage la juge trop longue** : la couper par lot (00 : 9 ; 01 : 34).

| # | Unité | Mot | Lot | Statut | Motif | Chaînes (signalées — écartées par le tri — d'un caractère) | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Correction déjà retenue sur l'ENTRY |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_226_s1` | 鍵 | 00 | à examiner | D | 鍵をかける | `v_226_s1` | — | — |
| 2 | `v_420` (nuance d'ENTRY) | いい | 00 | à examiner | D | よくない — écartées : よかった | — | `v_420_s1` | — |
| 3 | `v_555_s1` | 曲がる | 00 | à examiner | D | 角を曲がる ; 右に曲がる | — | — | — |
| 4 | `v_564` (nuance d'ENTRY) | 無くす | 00 | à examiner | C | 無くなる | — | `v_564_s1` | — |
| 5 | `v_15` (nuance d'ENTRY) | お巡りさん | 01 | à examiner | A | 交番 ; 警官 | `v_15_s1` | — | — |
| 6 | `v_20` (nuance d'ENTRY) | 両親 | 01 | à examiner | C | ご両親 | `v_20_s1` | — | — |
| 7 | `v_24` (nuance d'ENTRY) | 叔母 | 01 | à examiner | E | 伯母 | — | — | — |
| 8 | `v_25` (nuance d'ENTRY) | 叔父 | 01 | à examiner | E | 伯父 | — | — | — |
| 9 | `v_27` (nuance d'ENTRY) | 外国人 | 01 | à examiner | E | 外人 | — | — | — |
| 10 | `v_31` (nuance d'ENTRY) | 子供 | 01 | à examiner | C | お子さん | `v_31_s1`, `v_31_s2` | — | — |
| 11 | `v_35` (nuance d'ENTRY) | 家族 | 01 | à examiner | C | ご家族 | — | — | — |
| 12 | `v_46` (nuance d'ENTRY) | 体 | 01 | à examiner | D | 体にいい ; 体が弱い | — | `v_46_s1` | — |
| 13 | `v_47` (nuance d'ENTRY) | 医者 | 01 | à examiner | C | お医者さん | — | — | — |
| 14 | `v_48` (nuance d'ENTRY) | 口 | 01 | à examiner | D | 瓶の口 | — | `v_48_s1` | — |
| 15 | `v_51` (nuance d'ENTRY) | 手 | 01 | à examiner | D | 手を洗う | — | `v_51_s1` | — |
| 16 | `v_54` (nuance d'ENTRY) | 歯 | 01 | à examiner | D | 歯を磨く | — | `v_54_s1` | — |
| 17 | `v_55` (nuance d'ENTRY) | 病気 | 01 | à examiner | D | 病気になる ; 病気です | `v_55_s1` | — | — |
| 18 | `v_56` (nuance d'ENTRY) | 病院 | 01 | à examiner | D | 病院に行く | — | — | — |
| 19 | `v_57` (nuance d'ENTRY) | 目 | 01 | à examiner | D | 目がいい ; 目が悪い | — | `v_57_s1` | — |
| 20 | `v_58` (nuance d'ENTRY) | 耳 | 01 | à examiner | D | 耳がいい ; 耳が遠い | — | `v_58_s1` | — |
| 21 | `v_59` (nuance d'ENTRY) | 薬 | 01 | à examiner | D | 薬を飲む | — | — | — |
| 22 | `v_65_s2` | 頭 | 01 | à examiner | D | 頭がいい ; 頭を使う | — | `v_65_s2` | volet 2 n° 2 (`v_65_s2`) |
| 23 | `v_283` (nuance d'ENTRY) | 風邪 | 01 | à examiner | D | 風邪をひく — un caractère : 風 (présent dans un texte des fiches) | — | — | — |
| 24 | `v_603` (nuance d'ENTRY) | 髪 | 01 | à examiner | D | 髪を切る — un caractère : 紙 ; 神 | — | `v_603_s1` | — |
| 25 | `v_633` (nuance d'ENTRY) | 人 | 01 | à examiner | A | かた — un caractère : 方 | — | `v_633_s1` | — |
| 26 | `v_657` (nuance d'ENTRY) | 女 | 01 | à examiner | D | 女性 | — | `v_657_s1` | — |
| 27 | `v_660` (nuance d'ENTRY) | 家内 | 01 | à examiner | A | 奥さん | — | — | — |
| 28 | `v_667` (nuance d'ENTRY) | 方 | 01 | à examiner | D | どの方 — un caractère : 人 | — | `v_667_s1` | — |
| 29 | `v_686` (nuance d'ENTRY) | 男 | 01 | à examiner | D | 男性 | — | `v_686_s1` | — |
| 30 | `v_687` (nuance d'ENTRY) | 皆さん | 01 | à examiner | D | こんにちは — écartées : みんな (par la lecture) — un caractère : 皆 (présent dans un texte des fiches) | — | `v_687_s1` | volet 2 n° 5 (`v_687_s1`) |
| 31 | `v_716` (nuance d'ENTRY) | 顔 | 01 | à examiner | D | 変な顔をする ; 顔色 | — | `v_716_s1` | — |
| 32 | `v_17` (nuance d'ENTRY) | お姉さん | 00 | faux positif à contre-vérifier | B-transcription | écartées : あね — un caractère : 姉 (présent dans un texte des fiches) | — | — | — |
| 33 | `v_18` (nuance d'ENTRY) | お母さん | 00 | faux positif à contre-vérifier | B-transcription | écartées : はは — un caractère : 母 (présent dans un texte des fiches) | — | — | — |
| 34 | `v_19` (nuance d'ENTRY) | お父さん | 00 | faux positif à contre-vérifier | B-transcription | écartées : ちち — un caractère : 父 (présent dans un texte des fiches) | — | — | — |
| 35 | `v_44_s1` | お腹 | 00 | faux positif à contre-vérifier | B-transcription | écartées : お腹がすいた | — | `v_44_s1` | — |
| 36 | `v_68_s1` | 履く | 00 | faux positif à contre-vérifier | B-transcription | écartées : きる | `v_68_s1` | — | — |
| 37 | `v_16` (nuance d'ENTRY) | お兄さん | 01 | faux positif à contre-vérifier | B-transcription | écartées : あに — un caractère : 兄 (présent dans un texte des fiches) | — | — | — |
| 38 | `v_42` (nuance d'ENTRY) | 警官 | 01 | faux positif à contre-vérifier | B-romaji | écartées : お巡りさん (par la lecture) | `v_42_s1` | — | — |
| 39 | `v_61` (nuance d'ENTRY) | 身体 | 01 | faux positif à contre-vérifier | B-transcription | écartées : からだ — un caractère : 体 (présent dans un texte des fiches) | — | `v_61_s1` | — |
| 40 | `v_465` (nuance d'ENTRY) | 痛い | 01 | faux positif à contre-vérifier | B-transcription | écartées : 頭が痛い (par la lecture) | `v_465_s1` | — | — |
| 41 | `v_656` (nuance d'ENTRY) | 奥さん | 01 | faux positif à contre-vérifier | B-transcription | écartées : 家内 (par la lecture) — un caractère : 妻 | `v_656_s1` | — | — |
| 42 | `v_690_s1` | 背 | 01 | faux positif à contre-vérifier | B-transcription | écartées : 背が高い (par la lecture) | — | — | — |
| 43 | `v_23` (nuance d'ENTRY) | 友達 | 01 | un caractère seulement | S1 | un caractère : 達 (présent dans un texte des fiches) | — | — | — |

### Bloc « 1 bis » : complément des lots 04 et 07

**10 nuances, dans 10 ENTRY** : 2 faux positifs à contre-vérifier et 8 nuances à chaîne d'un caractère seulement ; lot 04 : 3 ; lot 07 : 7. La tranche 1 est close et arbitrée ; ses lots gardent pourtant des nuances que le tri a écartées ou n'a pas vues. Elles ne rouvrent aucun verdict de la tranche 1 : ce sont d'autres nuances. **Proposé** : les auditer dans la même livraison que la tranche 2, avec leur propre décompte (橋 / 箸 et 花 / 鼻 se lisent alors avec leurs homologues, 寒い et 熱い avec la nuance arbitrée de 暑い). **Option** : un bloc livré à part, avant la tranche 3.

| # | Unité | Mot | Lot | Statut | Motif | Chaînes (signalées — écartées par le tri — d'un caractère) | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Correction déjà retenue sur l'ENTRY |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_270` (nuance d'ENTRY) | 寒い | 07 | faux positif à contre-vérifier | B-transcription | écartées : 暑い (par la lecture) | `v_270_s1` | — | — |
| 2 | `v_277` (nuance d'ENTRY) | 熱い | 07 | faux positif à contre-vérifier | B-transcription | écartées : 暑い (par la lecture) | `v_277_s1` | — | — |
| 3 | `v_154` (nuance d'ENTRY) | 自動車 | 04 | un caractère seulement | S1 | un caractère : 車 (présent dans un texte des fiches) | — | — | — |
| 4 | `v_249` (nuance d'ENTRY) | 町 | 04 | un caractère seulement | S1 | un caractère : 市 (présent dans un texte des fiches) | — | — | — |
| 5 | `v_674` (nuance d'ENTRY) | 橋 | 04 | un caractère seulement | S1 | un caractère : 箸 | — | — | — |
| 6 | `v_257` (nuance d'ENTRY) | 犬 | 07 | un caractère seulement | S1 | un caractère : 匹 (présent dans un texte des fiches) | — | — | — |
| 7 | `v_258` (nuance d'ENTRY) | 猫 | 07 | un caractère seulement | S1 | un caractère : 匹 (présent dans un texte des fiches) | — | — | — |
| 8 | `v_261` (nuance d'ENTRY) | 花 | 07 | un caractère seulement | S1 | un caractère : 鼻 | — | — | — |
| 9 | `v_262` (nuance d'ENTRY) | 鳥 | 07 | un caractère seulement | S1 | un caractère : 羽 (présent dans un texte des fiches) | — | — | — |
| 10 | `v_271` (nuance d'ENTRY) | 春 | 07 | un caractère seulement | S1 | un caractère : 桜 (présent dans un texte des fiches) | `v_271_s1` | — | — |

## 4. Chevauchements avec les 377 candidats encore ouverts des axes C1 à C10

**Tranche 2 et bloc 1 bis : 12 nuances portent sur un sens candidat du volet 1, ou sur une ENTRY qui en a un** (13 sens candidats distincts sur 377) : `v_270` 寒い ; `v_277` 熱い ; `v_271` 春 ; `v_226_s1` 鍵 ; `v_15` お巡りさん ; `v_20` 両親 ; `v_31` 子供 ; `v_55` 病気 ; `v_68_s1` 履く ; `v_42` 警官 ; `v_465` 痛い ; `v_656` 奥さん. **18 portent sur un sens des 147 du volet 2**, ou sur son ENTRY : `v_420` いい ; `v_564` 無くす ; `v_46` 体 ; `v_48` 口 ; `v_51` 手 ; `v_54` 歯 ; `v_57` 目 ; `v_58` 耳 ; `v_65_s2` 頭 ; `v_603` 髪 ; `v_633` 人 ; `v_657` 女 ; `v_667` 方 ; `v_686` 男 ; `v_687` 皆さん ; `v_716` 顔 ; `v_44_s1` お腹 ; `v_61` 身体.

**Règle arbitrée au lot 2, appliquée sans changement** : le contrôle de provenance ne pose qu'une question, sur des champs que les axes C1 à C10 n'examinent pas (`nuance`, `particles`). Un sens candidat **reste candidat** pour ses propres relevés ; **le décompte reste 377** ; aucun verdict du volet 2 n'est rouvert.

**Corrections déjà retenues sur les mêmes ENTRY** : 頭 (volet 2 n° 2 (`v_65_s2`)) ; 皆さん (volet 2 n° 5 (`v_687_s1`)). Une correction de provenance s'ajouterait à celles-ci sans les modifier ; un recoupement de champ serait signalé dans la fiche.

## 5. Dépendances avec les autres tranches

Un renvoi est une chaîne de la nuance qui est le mot, une graphie ou une lecture d'une autre ENTRY publiée (relevé mécanique, chaînes d'un caractère comprises). Chaque nuance se juge sur **sa** fiche (critère 2) : un renvoi peut être sourcé dans un sens et non dans l'autre. Les renvois ne créent donc **pas de verdict commun**, mais une **lecture croisée** à signaler dans les fiches.

- **Renvois sortants de la tranche 2 et du bloc 1 bis** (24) : 寒い → 暑い (tranche 1, arbitrée) ; 寒い → 冷たい (tranche 1, arbitrée) ; 熱い → 暑い (tranche 1, arbitrée) ; 自動車 → 車 (tranche 1 bis) ; 橋 → 箸 (tranche 3) ; 犬 → 匹 (tranche 1, arbitrée) ; 猫 → 匹 (tranche 1, arbitrée) ; 花 → 鼻 (tranche 2) ; お巡りさん → 交番 (tranche 1, arbitrée) ; お巡りさん → 警官 (tranche 2) ; 風邪 → 風 (tranche 1, arbitrée) ; 髪 → 紙 (tranche 3) ; 人 → 方 (tranche 2) ; 家内 → 奥さん (tranche 2) ; 方 → 人 (tranche 2) ; 皆さん → 皆 (tranche 6) ; お姉さん → 姉 (tranche 2) ; お母さん → 母 (tranche 2) ; 履く → 切る (tranche 7) ; 履く → 着る (tranche 4) ; お兄さん → 兄 (tranche 2) ; 警官 → お巡りさん (tranche 2) ; 身体 → 体 (tranche 2) ; 奥さん → 家内 (tranche 2).
- **Renvois entrants**, depuis des nuances des tranches 3 à 8, vers la tranche 2 ou le bloc 1 bis (7) : 箸 (tranche 3) → 橋 ; 紙 (tranche 3) → 髪 ; スカート (tranche 4) → 履く ; ズボン (tranche 4) → 履く ; 着る (tranche 4) → 履く ; 外国 (tranche 5) → 外国人 ; 皆 (tranche 6) → 皆さん.
- **Précédents arbitrés de la tranche 1** qui renvoient à une ENTRY de la tranche 2 (5) : 交番 → お巡りさん ; 冷たい → 寒い ; 暑い → 寒い ; 暑い → 熱い ; 風 → 風邪. Ils sont cités, non rouverts.
- **Critères et précédents de la tranche 1, appliqués sans changement** : critère 1 (forme du dictionnaire d'un exemple de la fiche, sans mot, particule ni construction changés : 渡る, 海, 空, 冷たい sens 1, 天気) ; critère 2 (renvoi appuyé par la fiche ou par une décision au fondement vérifiable) ; critère 3 (forme honorifique ou conjuguée, pas sourcée d'office ; une graphie que la fiche nomme sans l'écrire ne se reconstitue pas : 来る) ; aucune particule tirée d'un exemple (吹く sens 1) ; l'unité porte sur la nuance entière (雨, 飴). **Le lot 01 dépend surtout des critères 2 et 3** : formes en お et ご (classe C), termes neutre et respectueux qui se répondent (classe A).
- **Ordre** : aucune tranche n'attend le verdict d'une autre. La tranche 8 vient en dernier parce qu'elle ne contient que des contre-vérifications.

## 6. Contrôle des faux positifs du tri (rapprochements par la lecture)

**Méthode proposée** : **chacune des 83 nuances écartées est relue en entier, dans la tranche de son lot**, avec les mêmes verdicts que les autres (sourcé, assumé, écart). Pour chaque chaîne écartée, la relecture vérifie que le mot de la fiche est **le même mot** que celui de la nuance (même graphie, ou même mot écrit autrement), et non un homophone ; elle contrôle aussi les autres éléments japonais de la nuance, chaînes d'un caractère comprises. **Aucun faux positif n'est confirmé par le seul calcul.**

- **B-romaji** : 50 nuances. La correspondance y passe toujours par la lecture : l'homophonie est possible pour toutes.
- **B-transcription** : 33 nuances. 14 ont au moins une chaîne retrouvée **par sa seule lecture** (le kana de la fiche, sans la graphie) : homophonie possible. Les 19 autres sont retrouvées par leur graphie, à travers les furigana de la fiche ; le risque d'homophonie y est faible, mais elles sont relues aussi, parce que le second défaut (un caractère) peut les atteindre.
- **Indicateur, non verdict** : 64 des 83 nuances reposent sur au moins une correspondance par la lecture. Il ordonne la relecture ; il ne classe aucun cas.
- **Répartition** : tranche 1 bis : 2 ; tranche 2 : 11 ; tranche 3 : 2 ; tranche 4 : 3 ; tranche 5 : 3 ; tranche 6 : 8 ; tranche 7 : 20 ; tranche 8 : 34. Relire chaque faux positif avec les autres nuances de son lot garde ensemble les paires de contraires et d'homophones (大きい / 小さい, 開く / 開ける, ある / 居る) et évite de rouvrir une ENTRY dans deux tranches.
- **Alternative, si l'arbitrage la préfère** : une tranche dédiée aux 83 faux positifs, à la fin du chantier. La question y serait homogène, mais elle dépasserait la taille habituelle, et une paire de mots se lirait à deux moments.

## 7. Traitement des chaînes japonaises d'un seul caractère

**Règle de relevé proposée, mécanique** : une chaîne d'un seul caractère est une suite maximale de caractères japonais de longueur 1 (même expression que le criblage T5, après retrait des furigana et des balises). **Un kanji isolé est toujours relevé** ; un kana isolé l'est **sauf s'il est une particule du champ `particles` des fiches** de l'ENTRY (« Avec を : … » quand la fiche porte を). Le trait d'allongement ー seul n'est pas relevé.

- **La présence mécanique ne prouve rien** : un caractère isolé peut se retrouver à l'intérieur d'un mot plus long des fiches (車 dans 自動車, 姉 dans お姉さん) sans que la fiche le donne comme mot. Le relevé **désigne les nuances à lire** ; le verdict se fait à la lecture.
- **Où il compte** : dans une nuance déjà à examiner ou déjà écartée, le caractère est contrôlé à la lecture de la nuance entière, comme 雨 et 飴 en tranche 1. **Il ne fait entrer de nuances nouvelles que s'il est leur seul signal** : 44 nuances, jamais signalées par le criblage.
- **Décompte** : 78 nuances du chantier portent au moins une chaîne d'un caractère relevée, dont 3 déjà lues ; 19 en ont une absente de tous les textes des fiches. Les 44 nuances nouvelles se répartissent ainsi : tranche 1 bis : 8 ; tranche 2 : 1 ; tranche 3 : 5 ; tranche 4 : 4 ; tranche 5 : 1 ; tranche 6 : 4 ; tranche 7 : 11 ; tranche 8 : 10.
- **Lots de la tranche 1** : 8 nuances des lots 04 et 07 n'ont été vues par aucun contrôle (`v_154` 自動車 ; `v_249` 町 ; `v_674` 橋 ; `v_257` 犬 ; `v_258` 猫 ; `v_261` 花 ; `v_262` 鳥 ; `v_271` 春) ; avec les faux positifs de ces lots, elles forment le bloc 1 bis du §3.
- **Particules nommées dans une nuance** : un kana isolé qui est une particule absente du champ `particles` des fiches (« Avec の et に : … ») est relevé par la même règle et jugé comme une chaîne : sourcé si la fiche le nomme (champ ou description) ou s'il appartient à un exemple de la fiche repris selon le critère 1. La règle « aucune particule tirée d'un exemple » porte sur le champ `particles` ; elle n'interdit pas à une nuance de reprendre un exemple sourcé.

## 8. Critères reproductibles de complétude

Calculés par `a2-05-travail/perimetre-v1-lot2-t2.mjs`, qui s'arrête au premier écart :

1. **Univers** : 684 nuances publiées, de sens et d'ENTRY, des ENTRY décidées (les champs `nuance` des lots) ; identifiants distincts ; les 270 nuances du tri y sont toutes. Les 2 nuances des ENTRY hors JLPT en sont exclues, comme du criblage, et sont signalées au §2.
2. **Statuts exclusifs** : chaque nuance a un statut et un seul ; 3 arbitrées au lot 1, 33 en tranche 1, 151 à examiner, 83 faux positifs (50 B-romaji, 33 B-transcription), 44 « un caractère seulement » et 370 « hors chantier », par la règle du §7.
3. **Plan** : chaque nuance à lire appartient à une tranche et une seule ; la somme du bloc 1 bis et des tranches 2 à 8 vaut 278 ; aucune nuance à examiner ne reste dans les lots 04 et 07, ni dans la tranche 8.
4. **Tranche 2** : 43 identifiants distincts ; ce sont exactement les nuances à lire des lots 00 et 01 ; **bloc 1 bis** : 10 identifiants distincts, exactement les faux positifs et les nuances « un caractère seulement » des lots 04 et 07 ; aucune n'est une nuance de la tranche 1 ni un sens arbitré au lot 1.
5. **Décomptes inchangés** : volet 2, 147 sur 147 (L 136, F 2, C 9, N 0) ; candidats du volet 1, 377 ; corrections retenues, 10 + 5 + 25, aucune appliquée.
6. **À la clôture du chantier** : 3 + 33 + 278 = 314 nuances lues, chacune une fois ; les 4 particules du criblage sont arbitrées.

## 9. Ce que la tranche 2 ne fera pas, et questions à arbitrer

Aucun texte français de nuance n'est contrôlé ; aucune catégorie, aucun type, aucune traduction ni aucun découpage n'est examiné ; aucune correction n'est appliquée ; aucune décision de journal n'est écrite. **L'audit de la tranche 2 ne commence qu'après la validation de ce périmètre.**

1. Le contrôle des faux positifs couvre-t-il les **83** (B-romaji et B-transcription), comme proposé au vu du constat sur 風邪, ou les seuls 50 B-romaji visés par l'arbitrage ?
2. Les faux positifs sont-ils relus **dans la tranche de leur lot** (proposé) ou dans une tranche dédiée ?
3. La règle de relevé des chaînes d'un caractère (§7) est-elle acceptée, en particulier l'exclusion des seules particules du champ `particles` des fiches ?
4. Le **complément des lots 04 et 07** (10 nuances) est-il audité dans la même livraison que la tranche 2, avec son propre décompte (proposé), ou livré à part ? La tranche 2 (43 nuances) doit-elle être coupée par lot ?
5. Les 2 nuances des ENTRY hors JLPT, jamais criblées, rejoignent-elles la tranche 4 (proposé) ?
