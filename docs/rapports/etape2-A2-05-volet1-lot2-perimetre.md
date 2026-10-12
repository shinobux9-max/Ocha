# Étape 2 · A2-05 · Volet 1 · Lot 2 — périmètre proposé : provenance des particules et des exemples de nuance

**Date** : 2026-10-08
**Statut (mis à jour le 2026-10-12)** : **périmètre de la tranche 1 accepté le 2026-10-08** (34 unités distinctes dans 33 ENTRY, sans ajout ni retrait ; critères de relecture arbitrés). Le plan des tranches suivantes a été recalculé et arbitré le 2026-10-10 (`etape2-A2-05-volet1-lot2-tranche2-perimetre.md`). Le texte d'origine suit.
**Statut** : **proposition de périmètre, non arbitrée. Aucun audit lexical n'est commencé** ; aucune fiche n'a été lue en vue d'un verdict. Ce rapport est calculé par `a2-05-travail/tri-provenance.mjs` puis `a2-05-travail/perimetre-v1-lot2.mjs`, en lecture seule ; rien n'est modifié dans les données, le journal, les registres, les outils ni les snapshots.

## 1. Thème et origine

Le lot 1 a établi trois écarts de provenance (出る, sens 2 et 3 ; 吹く, sens 2) et la doctrine arbitrée : **aucune exception générale n'autorise un contenu non sourcé au motif qu'il serait linguistiquement correct** ; le criblage T5 est **un inventaire de signalements, non d'erreurs**. Le lot 2 proposé a un seul thème : **la provenance des particules publiées et des chaînes japonaises des nuances publiées**. La question, pour chaque élément : se retrouve-t-il dans les fiches sources de l'ENTRY (fiches fusionnées et anciens exemples compris), ou une décision de journal en assume-t-elle l'origine ? Rien d'autre : ni catégorie, ni type, ni découpage, ni traduction.

## 2. Tri factuel des 270 signalements de nuance

Le tri est mécanique. Il range chacune des 326 chaînes japonaises signalées (dans 270 nuances, de sens ou d'ENTRY) dans une classe, puis chaque nuance dans la classe la plus lourde de ses chaînes. **Il ne dit pas qu'un élément est fautif ; il dit seulement s'il est retrouvé, et sous quelle forme.**

| Classe | Définition mécanique | Nuances | Chaînes | Suite proposée |
|---|---|---|---|---|
| B-transcription | la chaîne est dans les fiches, dans une autre écriture (kanji pour kana, ou l'inverse, d'après les furigana des fiches et les lectures publiées) | 33 | 40 | **faux positif** : écarté |
| B-romaji | la chaîne est dans la nuance des fiches, en caractères latins (comparaison sur des mots entiers) | 50 | 59 | **faux positif** : écarté |
| A-renvoi | la chaîne est le mot, une graphie ou une lecture d'une autre ENTRY publiée, que les fiches de l'ENTRY ne citent pas | 29 | 35 | à examiner |
| C-forme-de-l-entree | le mot de l'ENTRY avec un préfixe お ou ご, ou une terminaison en kana | 11 | 15 | à examiner |
| E-autre-mot | un autre mot japonais, absent des fiches et du vocabulaire publié | 21 | 29 | à examiner |
| D-exemple-construit | une suite de mots (exemple, collocation ou composé) absente des fiches | 126 | 148 | à examiner |
| **Total** | | **270** | **326** | |

**Résultat** : **83 nuances sur 270 sont des faux positifs du criblage** (leur contenu est dans les fiches). 187 restent, dont les 3 arbitrées au lot 1 : **184 nuances à examiner**, dans 170 ENTRY ; 130 sont des nuances d'ENTRY, 54 des nuances de sens. Par classe : A : 29 ; C : 11 ; D : 123 ; E : 21. Par lot d'origine : 10 : 15 ; 11 : 20 ; 12 : 3 ; 15 : 2 ; 18 : 3 ; 00 : 4 ; 01 : 27 ; 02 : 20 ; 03 : 9 ; 04 : 14 ; 05 : 8 ; 06 : 15 ; 07 : 19 ; 08 : 17 ; 09 : 8. **Ce nombre reste un plafond, non un compte d'erreurs** : les classes A, C et E rassemblent surtout des renvois, des formes honorifiques ou conjuguées et des synonymes, que l'examen pourra trouver attestés autrement.

**Limites du tri**, à connaître avant de s'y fier : il ne voit que les chaînes japonaises d'au moins deux caractères ; **il ne voit pas le texte français d'une nuance**, qui peut lui aussi dépasser la fiche ; il ne reconnaît une transcription que si les furigana ou une lecture publiée la donnent ; il ne reconnaît pas la forme du dictionnaire d'un exemple que la fiche donne à la forme polie (出ます dans la fiche, 出る dans la nuance), qui tombe en classe D.

**Faux positifs écartés** (liste complète, pour contrôle) : お姉さん (あね) ; お母さん (はは) ; お父さん (ちち) ; おなか (お腹がすいた) ; はく (きる) ; お兄さん (あに) ; 警官 (お巡りさん) ; 身体 (からだ) ; 痛い (頭が痛い) ; 奥さん (家内) ; 背 (背が高い) ; 家 (うち) ; 門 (ドア) ; ズボン (はく) ; 着る (はく) ; スリッパ (玄関) ; 寒い (暑い) ; 熱い (暑い) ; 話 (話す) ; 弾く (引く) ; 歌 (歌を歌う) ; 下 (机の下に) ; 近く (駅の近くに) ; どっち (どちら) ; なぜ (どうして) ; 誰 (どなた) ; あっち (あちら) ; あなた (さん) ; 皆 (皆さん) ; 去年 (おととし) ; 明日 (あす) ; 一月 (いちがつ) ; ゼロ (れい) ; 緑 (緑の色) ; 大きい (小さい) ; 大きな (大きい) ; 小さい (大きい) ; 小さな (小さい) ; 短い (長い) ; 広い (狭い) ; 狭い (広い) ; 太い (細い) ; 細い (太い) ; 厚い (薄い) ; 薄い (厚い) ; 重い (軽い) ; 下手 (上手) ; 難しい (易しい) ; 新しい (古い) ; 強い (弱い) ; 弱い (強い) ; 遅い (はやい) ; 汚い (きれい) ; 静か (賑やか) ; 開く (開ける) ; 閉める (閉まる) ; 取る (撮る) ; 引く (弾く) ; 並べる (並ぶ) ; 座る (ている) ; 立つ (ている) ; 結婚 (する, 結婚する) ; 生活 (する) ; ある (居る) ; 居る (ある) ; 出来る (わたしはにほんごが出来る) ; 困る (ている) ; やる (する) ; やる (上げる) ; 終わる (しごとが終わりました) ; また (またね) ; 早い (速い) ; それでは (じゃあ) ; 多い (このとしょかんはほんがおおいです) ; 少ない (このまちはくるまがすくないです, 多い) ; 大勢 (こうえんにおおぜいのひとがいます) ; 全部 (りんごをぜんぶたべました) ; 少し (みずをすこしください) ; 少し (ちょっと) ; 結構 (このえいがはけっこうおもしろいです) ; 一番 (にほんごのなかでなにがいちばんすきですか) ; 大体 (しごとはだいたいおわりました) ; 大体 (たいてい).

## 3. Les particules

Le criblage relève 4 sens dont une particule publiée est absente des particules des fiches. Deux sont arbitrés au lot 1 (出る, sens 2 et 3). **Deux restent, sans verdict** :

| SENSE | Mot | Lot | Particule publiée, absente de la fiche | Particules de la fiche |
|---|---|---|---|---|
| `v_266_s1` | 吹く | 07 | が | を |
| `v_704_s1` | 近く | 10 | の | に |

## 4. Périmètre proposé du lot 2 : première tranche, lots 04 et 07

**33 nuances à examiner des lots 04 et 07, et les 2 particules restantes** (celle de 吹く, sens 1, dont la nuance est aussi signalée ; celle de 近く, sens 1, du lot 10) : **34 unités d'examen**, dans 33 ENTRY. Ces deux lots sont ceux des trois écarts arbitrés au lot 1 : les précédents y sont directs, et les ENTRY déjà touchées (出る, 吹く, 冷たい) y sont traitées en entier.

| # | Unité | Mot | Lot | Classe | Chaînes signalées | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Déjà visé par une correction retenue ? |
|---|---|---|---|---|---|---|---|---|
| 1 | `v_53` (nuance d'ENTRY) | 歩く | 04 | D | 駅まで歩く | `v_53_s1` | — | — |
| 2 | `v_63` (nuance d'ENTRY) | 降りる | 04 | D | 電車を降りる | `v_63_s1` | — | — |
| 3 | `v_152` (nuance d'ENTRY) | 来る | 04 | C | 来ない | `v_152_s1` | — | — |
| 4 | `v_157` (nuance d'ENTRY) | 走る | 04 | D | 電車が走る | `v_157_s1` | — | — |
| 5 | `v_159` (nuance d'ENTRY) | 電車 | 04 | D | 路面電車 | `v_159_s1` | — | — |
| 6 | `v_213` (nuance d'ENTRY) | 入る | 04 | D | 部屋に入る ; お風呂に入る ; 入っている ; 箱に何が入っていますか | `v_213_s1` | — | — |
| 7 | `v_240` (nuance d'ENTRY) | 交番 | 04 | A | お巡りさん | `v_240_s1` | — | — |
| 8 | `v_242` (nuance d'ENTRY) | 図書館 | 04 | A | 本棚 | — | — | — |
| 9 | `v_557` (nuance d'ENTRY) | 止まる | 04 | D | 電車が止まる | `v_557_s1` | — | — |
| 10 | `v_563` (nuance d'ENTRY) | 渡る | 04 | D | 道を渡る | `v_563_s1` | — | — |
| 11 | `v_565` (nuance d'ENTRY) | 着く | 04 | D | 駅に着く | `v_565_s1` | — | — |
| 12 | `v_642_s1` | 出る | 04 | D | 駅を出る | `v_642_s1` | — | — |
| 13 | `v_644` (nuance d'ENTRY) | 切符 | 04 | E | お札 ; チケット | `v_644_s1` | — | — |
| 14 | `v_705` (nuance d'ENTRY) | 道 | 04 | D | 道を渡る ; 道に迷う | — | — | — |
| 15 | `v_80_s2` | 曇る | 07 | D | めがねが曇る | — | `v_80_s2` | — |
| 16 | `v_128` (nuance d'ENTRY) | 川 | 07 | D | がわ ; 隅田川 | — | — | — |
| 17 | `v_253` (nuance d'ENTRY) | 山 | 07 | D | 山に登る | — | — | — |
| 18 | `v_254_s2` | 木 | 07 | D | 木の机 | `v_254_s2` | — | — |
| 19 | `v_256` (nuance d'ENTRY) | 海 | 07 | D | 海に行く | — | — | — |
| 20 | `v_260` (nuance d'ENTRY) | 空 | 07 | D | 空が青い | — | — | — |
| 21 | `v_265_s1` | 冷たい | 07 | D | 冷たい水 | `v_265_s1` | — | — |
| 22 | `v_265_s2` | 冷たい | 07 | D | 冷たい人 | — | `v_265_s2` | lot 1 : `v_265_s2` |
| 23 | `v_266_s1` | 吹く | 07 | D | 風が吹く ; **et particule が** | — | — | — |
| 24 | `v_267` (nuance d'ENTRY) | 夏 | 07 | A | 夏休み | `v_267_s1` | — | — |
| 25 | `v_269` (nuance d'ENTRY) | 天気 | 07 | D | いい天気ですね | `v_269_s1` | — | — |
| 26 | `v_272` (nuance d'ENTRY) | 晴れ | 07 | A | くもり | — | — | — |
| 27 | `v_273` (nuance d'ENTRY) | 晴れる | 07 | D | 明日は晴れるでしょう | — | — | — |
| 28 | `v_274` (nuance d'ENTRY) | 暑い | 07 | A | 寒い | `v_274_s1` | — | — |
| 29 | `v_279` (nuance d'ENTRY) | 降る | 07 | A | 降りる | — | — | — |
| 30 | `v_280` (nuance d'ENTRY) | 雨 | 07 | D | 雨が降る | — | — | — |
| 31 | `v_282` (nuance d'ENTRY) | 風 | 07 | D | 風が吹く | `v_282_s1` | — | — |
| 32 | `v_543` (nuance d'ENTRY) | 咲く | 07 | D | 花が咲く | — | — | — |
| 33 | `v_648` (nuance d'ENTRY) | 匹 | 07 | E | ろっぴき ; はっぴき ; じゅっぴき | — | `v_648_s1` | — |
| 34 | `v_704_s1` | 近く | 10 | particule | **particule の** (la nuance de ce sens est un faux positif du tri) | `v_704_s1` | — | — |

**Tranches suivantes du même chantier**, à arbitrer chacune à son tour, dans cet ordre proposé :

| Tranche | Lots d'origine | Nuances à examiner |
|---|---|---|
| 1 (ce périmètre) | 04, 07 | 33 (et 2 particules) |
| 2 | 00, 01 | 31 |
| 3 | 02, 03 | 29 |
| 4 | 05, 06 | 23 |
| 5 | 08, 09 | 25 |
| 6 | 10, 11 | 35 |
| 7 | 12, 15, 18 | 8 |
| **Total** | | **184** |

## 5. Chevauchements avec les 377 candidats restants du volet 1

Sur les 184 nuances à examiner, **84 portent sur un sens candidat du volet 1, ou sur une ENTRY qui en a un** (83 sens candidats distincts sur 377) ; 30 portent sur un sens des 147 du volet 2, ou sur son ENTRY. Dans la première tranche : 18 et 3.

**Règle proposée, à arbitrer avec le périmètre** : ce chantier ne pose qu'une question, sur des champs que les axes C1 à C10 n'examinent pas (`particles`, `nuance`). Un sens candidat du volet 1 **reste candidat** pour ses propres relevés : il n'est pas retiré des 377, et aucun verdict du volet 2 n'est rouvert. C'est l'inverse de l'option (b) du lot 1, qui valait pour cinq sens : l'appliquer ici ferait entrer plus de quatre-vingts sens dans un examen complet et changerait la nature du lot. « Un cas n'est audité qu'une fois » s'entend alors question par question.

## 6. Verdicts, critères de complétude et dépendances normatives

- **Verdicts proposés pour chaque unité** : **sourcé** (l'élément se retrouve dans les fiches, sous une forme que le tri n'a pas reconnue) ; **assumé** (une décision de journal en dit l'origine, et cette origine se vérifie) ; **écart** (E2 : ni l'un ni l'autre), avec une correction nommée, reprise de la fiche, sans exemple japonais ajouté. Aucune correction n'est appliquée.
- **Complétude** : 34 unités distinctes, calculées par script ; chacune est un signalement du criblage, hors faux positifs du tri et hors les trois sens arbitrés au lot 1 ; les 2 particules restantes y sont ; à la clôture du chantier, la somme des tranches vaut 184 nuances et 2 particules (contrôlé par script).
- **Normes** : « la fiche source décide » (`CLAUDE.md`, §4) ; la doctrine de provenance arbitrée au lot 1 ; « aucune particule n'est tirée d'un exemple » (lot 18) ; A3 et le schéma A2-01 pour les champs `particles` et `nuance` ; les invariants du journal (une décision validée n'est jamais modifiée en silence).
- **Trois questions de principe à trancher avec le périmètre**, parce qu'elles décident de la plupart des cas : (1) **la forme du dictionnaire d'un exemple de la fiche** (家を出ます dans la fiche, 家を出る dans la nuance) est-elle sourcée ? (2) **un renvoi à une autre ENTRY publiée** que la fiche ne cite pas (classe A : un contraire, un synonyme) est-il admis, le mot étant dans le corpus, ou faut-il que la fiche le donne ? (3) **une forme honorifique ou conjuguée du mot de l'ENTRY** (classe C : ご両親, 来ない) est-elle sourcée par le mot lui-même ?
- **Hors périmètre** : le texte français des nuances ; les axes C1 à C10 ; G1 à G7 ; toute correction.
