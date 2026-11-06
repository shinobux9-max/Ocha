# Étape 2 · A2-05 · Volet 1 · Lot 3 — bloc F : recherche d'omissions d'`interrogatif` (A10, §8), première mesure de couverture

**Date** : 2026-11-03
**Statut** : **mesure de couverture prise en acte le 2026-11-04 (§0).** Aucune relecture (temps 3), aucune conclusion lexicale, aucune modification de donnée, de lot, de journal ou de norme.
**Données** : réelles (dépôt, `HEAD` 39cce13, arbre de travail).

## 0. Prise en acte

Décision du 2026-11-04 (ChatGPT, par délégation ; relayée par l'utilisateur) : « Je prends acte de la première mesure réelle de couverture : 807 sens, 234 candidats relevés, 573 non relevés, aucun sens relu et aucun candidat supplémentaire par X1. J'accepte ces résultats comme mesure de couverture, sans en tirer de conclusion lexicale. »

**Origine.** Recopié de `a2-05-travail/arbitrage-F/mesure-couverture/mesure/rapport-mesure.md` (SHA-256 `858a7f3710a2e42005f8e4316115e2966dc3cd46dd014c75c4eba39f64289694`), écrit par `a2-05-travail/arbitrage-F/mesure-couverture/mesurer-couverture.mjs`, exécuté une fois sur autorisation ; seuls le statut et le présent §0 changent, le reste est conservé tel qu'il a été produit. La mesure complète, avec tous les candidats et leurs filtres, est dans `a2-05-travail/arbitrage-F/mesure-couverture/mesure/mesure.json` (SHA-256 `7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44`). La date (2026-11-03) est la date UTC de l'exécution, faite le 2026-11-04 à 00 h 02, heure locale.

## 1. Cadre

- Base normative : addendum A10, §8 (recherche des omissions, temps 1 et 2) ; périmètre opérationnel accepté le 2026-11-03 (`etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`, §0 et §6).
- **Un filtre de recherche ne vaut jamais preuve d'attribution** : il désigne des sens à relire, rien de plus. Cette mesure ne relit aucun sens.
- **Deux décomptes séparés** : le contrôle des 17 sens qui portent la fonction (bloc F, compté dans les 377 du lot 3) et la présente recherche d'omissions ne sont jamais additionnés. Un sens relevé ici n'est pas ajouté aux 377.
- Résultats de couverture (§4 et §5) et conclusions lexicales (temps 3, à venir) sont distincts : le présent document ne contient que les premiers.

## 2. Provenance

| Élément | Valeur |
|---|---|
| Commande | `node a2-05-travail/arbitrage-F/mesure-couverture/mesurer-couverture.mjs . --execution-autorisee` |
| `HEAD` | `39cce138f12c50d32675cc4acff5237883eec0b1` |
| Module de filtrage | `a2-05-travail/perimetre-F-operationnel/omissions.mjs`, SHA-256 `2b89abd92699e0dffb480c2224f0a66595ddc2fb6d114df68ea781c9b400ac8d` |
| Filtres | `T1-radicaux`, `T1-point`, `T1-mots`, `T2-classe`, `T2-nuls`, `T2-serie`, `T2-journal`, `X1` ; X1 activé (arbitrage du 2026-11-03, filtre complémentaire non normatif, hors A10) |
| Lu : `data/n5/vocab.json` | SHA-256 `c8cd0f6fc3a5edfd4eef7809778578d9d80595f15b4c0efeb90421f7ccedae5d` |
| Lu : `data/vocab-hors-jlpt.json` | SHA-256 `8ebea7443deb831475a6ac9feefee1571d35fa3de82ac4900fbf966266f09c43` |
| Lu : `reconstruction/a2-04/sources/vocab.json` | SHA-256 `1f7a039630d3a547393ab0b6c8d30e66176aaa157ae94905c28110be2af738fd` |
| Lu : `reconstruction/a2-04/sources/vocab-hors-jlpt.json` | SHA-256 `31198b2557c56925881330290177aee86988963ebae34549b007054b29436028` |
| Lu : `reconstruction/a2-04/journal.json` | SHA-256 `6f3eadf048b14ef053565bbfa45e5de506b3c0f3d7b6f7bc3c062919d0cde77e` |
| Lu : `reconstruction/a2-04/lots/lot-00.json` | SHA-256 `4336245ec2b5f2bf30b45107800898394855e37a58b79fe6be4421d590420dc0` |
| Lu : `reconstruction/a2-04/lots/lot-01.json` | SHA-256 `00e538688b71c10b5d9dfe6f872af77c4d898787bcd7eb1ddb3c4ff33261c448` |
| Lu : `reconstruction/a2-04/lots/lot-02.json` | SHA-256 `e4be90daaa7a5ca739a6b0aa28fd757777424c2e8dd871d436c3ee2dcdc54870` |
| Lu : `reconstruction/a2-04/lots/lot-03.json` | SHA-256 `aeedd263ab0f502a3f37c69a4c4880c6d5e065d1826fcd65f8cb3c5d1ef018f6` |
| Lu : `reconstruction/a2-04/lots/lot-04.json` | SHA-256 `9a72aa76ef6fcaad2ee49e4a7fafb5582658ab036bfc7a91da117aac14e7665a` |
| Lu : `reconstruction/a2-04/lots/lot-05.json` | SHA-256 `05c63a791310de82fc803aea2697f8fa1ef4081bbbf932e6a0a9e93256407322` |
| Lu : `reconstruction/a2-04/lots/lot-06.json` | SHA-256 `a548033f61aaf408a3c2ceee9fd0bbad216c56ee374a94a14ca2b46e23eb8d5e` |
| Lu : `reconstruction/a2-04/lots/lot-07.json` | SHA-256 `f1de2e62d970908f6e2b376636286f971fcdcafaffa4b0c51457563f680126ab` |
| Lu : `reconstruction/a2-04/lots/lot-08.json` | SHA-256 `8592ea87343d1c1409186f88e86f288982476d5539067f74fdc608f938c09dfa` |
| Lu : `reconstruction/a2-04/lots/lot-09.json` | SHA-256 `61239600cbc86627d76f5624da9653f1a81f3d9305c0ab9b2fabbd1ff417961e` |
| Lu : `reconstruction/a2-04/lots/lot-10.json` | SHA-256 `44d175452d54c2f4052d0b2afd3ff0255f0a3a08d2a2939fd17f82481bfa7b68` |
| Lu : `reconstruction/a2-04/lots/lot-11.json` | SHA-256 `2b21b6ac02d1043bcdd59b80d83a684156887ec6ff14da050b4ca354b1f95016` |
| Lu : `reconstruction/a2-04/lots/lot-12.json` | SHA-256 `41f7fa300a4e87d4ef8e0bfbf4aa7058f8e531d4856b9005c1a05b0421a4ce74` |
| Lu : `reconstruction/a2-04/lots/lot-13.json` | SHA-256 `5cc858a1a6fbe6c76e67621c14c66ff5ebd97dad96e18d74921ef4a60a5685e7` |
| Lu : `reconstruction/a2-04/lots/lot-14.json` | SHA-256 `92ea511b53b8e46c1ad73863ecebc2e163fa85afba91ecd4feebb435d4efe91d` |
| Lu : `reconstruction/a2-04/lots/lot-15.json` | SHA-256 `92d09004fa5ed0618cc411b81c47dfc66a7d904ae7f7a2944afa7d9c4770c34d` |
| Lu : `reconstruction/a2-04/lots/lot-16.json` | SHA-256 `7ecbede02b545dccda557b6c017b1ddebde9e73f5a7d961821ffecf472a7c0fb` |
| Lu : `reconstruction/a2-04/lots/lot-17.json` | SHA-256 `03522a237e10337c5d33ba4251929ae72416c58b5c86844b22ff1c899df7d643` |
| Lu : `reconstruction/a2-04/lots/lot-18.json` | SHA-256 `dc2d934c8f15d2c5f385f9d836f65c1c91dd947959a80fd66c630e53b799fecb` |
| Lu : `reconstruction/a2-04/lots/lot-19.json` | SHA-256 `7e481bcc557446e74980aa050e42ea62012b8ac1b092f6eb88a22bea0d124792` |
| Lu : `reconstruction/a2-04/lots/lot-20.json` | SHA-256 `034fd54de6236608624a06bb397e12ec7f44ec38089ccbd2a61d650f91664e59` |
| Lu : `reconstruction/a2-04/lots/lot-21.json` | SHA-256 `4f6b40d01a32dd8147d34ea7427567859ded48633d748a16a8ccaa621c8915a4` |
| Lu : `reconstruction/a2-04/lots/lot-22.json` | SHA-256 `6670c260b257c09a08ac28b2c2982f5749a13036b71c215cb447ea92ce54f80e` |
| Lu : `reconstruction/a2-04/lots/lot-23.json` | SHA-256 `144bbb290edd100cbd21825fb85e29b27ba3804869f1831c32565ad99659de5e` |
| Lu : `reconstruction/a2-04/lots/lot-24.json` | SHA-256 `f9b9f71eac2dadbeea2ef3c11bda593da1e2e7345141f9746d8b620307526499` |
| Lu : `reconstruction/a2-04/lots/lot-25.json` | SHA-256 `5415c4ed238a28c43ce3247028a932c98020980a2d45b4f96f359fdae7e3d06b` |
| Lu : `reconstruction/a2-04/lots/lot-26.json` | SHA-256 `9f44134e12465fb265aabc54e2753dab743b0a870483f83d532ebb69a7d9d6e1` |

Le détail complet (tous les candidats, tous leurs filtres) est dans `mesure.json`, à côté de ce rapport.

## 3. Population

- **807 sens** publiés qui ne portent pas `interrogatif` (805 N5, 2 hors JLPT), dans **669 ENTRY** ; les 17 porteurs sont exclus.
- Chaque sens est lu avec la fiche source de son ENTRY et les fiches retirées par fusion vers elle (sens concernés : 45).
- Hors population : les données de grammaire (A10, §4, point 5). Les phrases d'exemple ne sont pas filtrées ; elles seront lues en entier au temps 3.

## 4. Couverture

| Filtre | Temps | Ce qu'il relève | Sens relevés | Relevés par ce seul filtre |
|---|---|---|---|---|
| `T1-radicaux` | 1 | radicaux « interrog », « question », « demand » dans le type, les traductions ou les nuances | 18 | 5 |
| `T1-point` | 1 | point d'interrogation dans une traduction ou une nuance | 12 | 6 |
| `T1-mots` | 1 | mot interrogatif français dans une traduction | 7 | 4 |
| `T2-classe` | 2 | ENTRY de classe `pronom`, `determinant` ou `adverbe` | 69 | 44 |
| `T2-nuls` | 2 | sens sans catégorie ou sans type, sans aucune fonction | 144 | 123 |
| `T2-serie` | 2 | ENTRY dont une graphie contient une graphie ou une lecture d'une ENTRY porteuse | 5 | 0 |
| `T2-journal` | 2 | ENTRY dont une décision de journal emploie le vocabulaire de la question | 31 | 10 |
| `X1` | hors A10 | catégorie ou sous-catégorie de la fiche source nommant la question (proposé, hors A10) | 0 | 0 |

| Décompte | Sens |
|---|---|
| Population | 807 |
| Relevés, dédupliqués (un sens compté une fois, tous ses filtres indiqués) | 234 |
| dont relevés par le temps 1 | 35 |
| dont relevés par le seul temps 2 | 199 |
| dont relevés par le seul X1 (hors A10) | 0 |
| Relevés par les filtres d'A10 (sans X1) | 234 |
| Non relevés par aucun filtre | 573 |
| **Relus** | **0** |

Répartition des relevés par nombre de filtres : 1 filtre : 192 ; 2 filtres : 37 ; 3 filtres : 3 ; 4 filtres : 1 ; 7 filtres : 1.

**Un sens que les filtres n'ont pas relevé n'est pas un sens vérifié conforme : il n'a pas été relu.** Les 573 sens non relevés ne sont donc ni vérifiés ni conformes : ils sont hors de la relecture.

Note de méthode : le module rend un « seul temps 2 » de 199 qui compte aussi les sens relevés par le seul X1 (X1 n'étant ni du temps 1 ni du temps 2) ; le présent décompte les sépare (199 et 0).

## 5. Candidats relevés (liste dédupliquée)

Aucune colonne de conclusion : la relecture du temps 3 n'est pas commencée. Chaque candidat garde son identifiant de SENSE et la liste de ses filtres d'origine, du relevé jusqu'à la conclusion ; pour `T2-journal`, les décisions qui l'ont fait relever sont citées.

| N° | SENSE | ENTRY | Mot | Traduction publiée | Filtres d'origine | Décisions de journal (T2-journal) |
|---|---|---|---|---|---|---|
| 1 | `v_44_s1` | `v_44` | お腹 | Ventre | `T2-nuls` | — |
| 2 | `v_46_s1` | `v_46` | 体 | Corps | `T2-nuls` | — |
| 3 | `v_48_s1` | `v_48` | 口 | Bouche | `T2-nuls` | — |
| 4 | `v_50_s2` | `v_50` | 差す | Pointer | `T2-nuls` | — |
| 5 | `v_51_s1` | `v_51` | 手 | Main | `T2-nuls` | — |
| 6 | `v_54_s1` | `v_54` | 歯 | Dent | `T2-nuls` | — |
| 7 | `v_57_s1` | `v_57` | 目 | Œil | `T2-nuls` | — |
| 8 | `v_58_s1` | `v_58` | 耳 | Oreille | `T2-nuls` | — |
| 9 | `v_60_s1` | `v_60` | 足 | Pied | `T2-nuls` | — |
| 10 | `v_61_s1` | `v_61` | 身体 | Corps | `T2-nuls` | — |
| 11 | `v_62_s1` | `v_62` | 軽い | Léger | `T2-nuls` | — |
| 12 | `v_65_s1` | `v_65` | 頭 | Tête | `T2-nuls` | — |
| 13 | `v_65_s2` | `v_65` | 頭 | Esprit | `T2-nuls` | — |
| 14 | `v_67_s1` | `v_67` | 鼻 | Nez | `T2-nuls` | — |
| 15 | `v_79_s1` | `v_79` | 押す | Pousser | `T2-nuls` | — |
| 16 | `v_80_s2` | `v_80` | 曇る | S'embuer | `T2-nuls` | — |
| 17 | `v_82_s1` | `v_82` | 締める | Serrer | `T2-journal` | D1215 |
| 18 | `v_84_s1` | `v_84` | お弁当 | Bento | `T2-journal` | D0169 |
| 19 | `v_88_s1` | `v_88` | ご飯 | Riz cuit | `T2-journal` | D0165 |
| 20 | `v_88_s2` | `v_88` | ご飯 | Repas | `T2-journal` | D0165 |
| 21 | `v_111_s1` | `v_111` | 箸 | Baguettes | `T2-journal` | D0207 |
| 22 | `v_116_s1` | `v_116` | 頼む | Demander | `T1-radicaux`, `T2-journal` | D1276, D1277, D1609 |
| 23 | `v_116_s2` | `v_116` | 頼む | Commander (un plat au restaurant) | `T1-radicaux`, `T2-journal` | D1276, D1277, D1609 |
| 24 | `v_120_s1` | `v_120` | 飲み物 | Boisson | `T1-point` | — |
| 25 | `v_124_s1` | `v_124` | テスト | Examen | `T1-radicaux` | — |
| 26 | `v_130_s1` | `v_130` | 引く | Tirer | `T2-nuls` | — |
| 27 | `v_144_s1` | `v_144` | 忙しい | Occupé | `T2-nuls` | — |
| 28 | `v_163_s1` | `v_163` | かかる | Prendre (du temps ou de l'argent) | `T2-nuls`, `T2-journal` | D1343 |
| 29 | `v_164_s3` | `v_164` | かける | Accrocher | `T2-nuls` | — |
| 30 | `v_174_s1` | `v_174` | 答える | Répondre | `T1-radicaux`, `T2-journal` | D0510 |
| 31 | `v_175_s1` | `v_175` | 聞く | Écouter | `T1-radicaux`, `T2-journal` | D0509 |
| 32 | `v_175_s2` | `v_175` | 聞く | Demander | `T1-radicaux`, `T2-journal` | D0509 |
| 33 | `v_181_s1` | `v_181` | する | Faire | `T2-nuls` | — |
| 34 | `v_211_s1` | `v_211` | ナイフ | Couteau | `T2-journal` | D0213 |
| 35 | `v_225_s1` | `v_225` | お皿 | Assiette | `T2-journal` | D0201, D0202 |
| 36 | `v_230_s1` | `v_230` | コップ | Verre | `T2-journal` | D0205 |
| 37 | `v_231_s1` | `v_231` | スプーン | Cuillère | `T2-journal` | D0209 |
| 38 | `v_232_s1` | `v_232` | フォーク | Fourchette | `T2-journal` | D0211 |
| 39 | `v_240_s1` | `v_240` | 交番 | Poste de police | `T1-radicaux` | — |
| 40 | `v_243_s1` | `v_243` | 国 | Pays | `T1-point` | — |
| 41 | `v_265_s2` | `v_265` | 冷たい | Froid (attitude) | `T2-nuls` | — |
| 42 | `v_266_s2` | `v_266` | 吹く | Souffler (de l'air) | `T2-nuls` | — |
| 43 | `v_269_s1` | `v_269` | 天気 | Temps (qu'il fait) | `T1-mots` | — |
| 44 | `v_287_s1` | `v_287` | カレンダー | Calendrier | `T2-nuls` | — |
| 45 | `v_321_s2` | `v_321` | 時間 | Heure (durée) | `T2-nuls` | — |
| 46 | `v_339_s1` | `v_339` | こちら | Par ici | `T2-classe`, `T2-journal` | D0672 |
| 47 | `v_339_s2` | `v_339` | こちら | Moi, nous (poli) | `T2-classe`, `T2-journal` | D0672 |
| 48 | `v_340_s1` | `v_340` | そちら | Par là | `T2-classe`, `T2-journal` | D0677 |
| 49 | `v_342_s1` | `v_342` | それ | Cela | `T2-classe`, `T2-journal` | D0637 |
| 50 | `v_359_s1` | `v_359` | 近々 | Bientôt | `T2-classe` | — |
| 51 | `v_361_s1` | `v_361` | 違う | Être différent | `T2-nuls` | — |
| 52 | `v_361_s2` | `v_361` | 違う | Être incorrect | `T2-nuls` | — |
| 53 | `v_363_s1` | `v_363` | キロ | Kilo (kilogramme) | `T2-nuls` | — |
| 54 | `v_363_s2` | `v_363` | キロ | Kilomètre | `T2-nuls` | — |
| 55 | `v_364_s1` | `v_364` | キログラム | Kilogramme | `T2-nuls` | — |
| 56 | `v_366_s1` | `v_366` | メートル | Mètre | `T2-nuls` | — |
| 57 | `v_392_s1` | `v_392` | そこ | Là | `T1-mots`, `T2-classe` | — |
| 58 | `v_403_s1` | `v_403` | あそこ | Là-bas | `T2-classe` | — |
| 59 | `v_404_s1` | `v_404` | あちら | Là-bas (poli) | `T2-classe` | — |
| 60 | `v_404_s2` | `v_404` | あちら | Cette personne-là (poli) | `T2-classe` | — |
| 61 | `v_405_s1` | `v_405` | あっち | Par là-bas | `T2-classe` | — |
| 62 | `v_406_s1` | `v_406` | あの | Ce … là-bas | `T2-classe` | — |
| 63 | `v_407_s1` | `v_407` | あれ | Cela (là-bas) | `T2-classe` | — |
| 64 | `v_408_s1` | `v_408` | ここ | Ici | `T2-classe` | — |
| 65 | `v_409_s1` | `v_409` | こっち | Par ici | `T2-classe` | — |
| 66 | `v_409_s2` | `v_409` | こっち | Moi, mon camp | `T2-classe` | — |
| 67 | `v_410_s1` | `v_410` | この | Ce … -ci | `T2-classe` | — |
| 68 | `v_411_s1` | `v_411` | これ | Ceci | `T2-classe` | — |
| 69 | `v_412_s1` | `v_412` | こんな | Ce genre de | `T2-classe` | — |
| 70 | `v_414_s1` | `v_414` | そっち | Par là | `T2-classe` | — |
| 71 | `v_414_s2` | `v_414` | そっち | Toi, ton camp | `T1-point`, `T2-classe` | — |
| 72 | `v_415_s1` | `v_415` | その | Ce … -là | `T2-classe` | — |
| 73 | `v_420_s1` | `v_420` | いい | Bon | `T2-nuls` | — |
| 74 | `v_421_s1` | `v_421` | いろいろ | Divers | `T2-nuls` | — |
| 75 | `v_422_s2` | `v_422` | うるさい | Agaçant | `T2-nuls` | — |
| 76 | `v_424_s1` | `v_424` | きれい | Beau | `T2-nuls` | — |
| 77 | `v_425_s1` | `v_425` | だんだん | Graduellement | `T2-classe`, `T2-nuls` | — |
| 78 | `v_427_s2` | `v_427` | まずい | Fâcheux | `T2-nuls` | — |
| 79 | `v_428_s1` | `v_428` | 丈夫 | Solide | `T2-nuls` | — |
| 80 | `v_432_s1` | `v_432` | 便利 | Pratique | `T2-nuls` | — |
| 81 | `v_434_s1` | `v_434` | 危ない | Dangereux | `T2-nuls` | — |
| 82 | `v_438_s1` | `v_438` | 同じ | Même | `T2-classe`, `T2-nuls` | — |
| 83 | `v_441_s1` | `v_441` | 大きな | Grand | `T2-classe` | — |
| 84 | `v_442_s1` | `v_442` | 大切 | Important | `T2-nuls` | — |
| 85 | `v_444_s1` | `v_444` | 好き | Aimer | `T1-mots` | — |
| 86 | `v_446_s1` | `v_446` | 小さな | Petit | `T2-classe` | — |
| 87 | `v_449_s1` | `v_449` | 弱い | Faible | `T2-nuls` | — |
| 88 | `v_451_s1` | `v_451` | 強い | Fort | `T2-nuls` | — |
| 89 | `v_452_s1` | `v_452` | 悪い | Mauvais | `T2-nuls` | — |
| 90 | `v_456_s1` | `v_456` | 易しい | Facile | `T2-nuls` | — |
| 91 | `v_457_s1` | `v_457` | 暇 | Libre | `T2-nuls` | — |
| 92 | `v_458_s1` | `v_458` | 有名 | Célèbre | `T2-nuls` | — |
| 93 | `v_461_s2` | `v_461` | 汚い | Grossier (langage) | `T2-nuls` | — |
| 94 | `v_462_s1` | `v_462` | 清い | Pur | `T2-nuls` | — |
| 95 | `v_462_s2` | `v_462` | 清い | Pur (moralement) | `T2-nuls` | — |
| 96 | `v_464_s2` | `v_464` | 甘い | Indulgent | `T2-nuls` | — |
| 97 | `v_465_s1` | `v_465` | 痛い | Douloureux | `T1-mots` | — |
| 98 | `v_471_s1` | `v_471` | 結構 | Assez | `T2-classe` | — |
| 99 | `v_471_s2` | `v_471` | 結構 | Non merci | `T2-classe` | — |
| 100 | `v_478_s1` | `v_478` | 賑やか | Animé | `T2-nuls` | — |
| 101 | `v_484_s1` | `v_484` | 重い | Lourd | `T2-nuls` | — |
| 102 | `v_484_s2` | `v_484` | 重い | Grave | `T2-nuls` | — |
| 103 | `v_486_s1` | `v_486` | 難しい | Difficile | `T1-radicaux`, `T2-nuls`, `T2-journal` | D1095 |
| 104 | `v_489_s1` | `v_489` | 静か | Calme | `T2-nuls` | — |
| 105 | `v_494_s1` | `v_494` | いつも | Toujours | `T2-classe`, `T2-serie` | — |
| 106 | `v_495_s2` | `v_495` | 大変 | Difficile | `T2-nuls` | — |
| 107 | `v_496_s1` | `v_496` | ちょうど | Exactement | `T2-classe`, `T2-nuls` | — |
| 108 | `v_497_s1` | `v_497` | ちょっと | Un peu | `T2-classe` | — |
| 109 | `v_497_s2` | `v_497` | ちょっと | Un instant | `T2-classe` | — |
| 110 | `v_498_s1` | `v_498` | とても | Très | `T2-classe` | — |
| 111 | `v_499_s1` | `v_499` | どうも | Merci | `T2-classe`, `T2-serie` | — |
| 112 | `v_499_s2` | `v_499` | どうも | Vraiment | `T2-classe`, `T2-serie` | — |
| 113 | `v_500_s1` | `v_500` | また | À nouveau | `T2-classe`, `T2-nuls` | — |
| 114 | `v_500_s2` | `v_500` | また | Aussi | `T2-classe`, `T2-nuls` | — |
| 115 | `v_501_s1` | `v_501` | まだ | Encore | `T2-classe` | — |
| 116 | `v_501_s2` | `v_501` | まだ | Pas encore | `T2-classe` | — |
| 117 | `v_502_s1` | `v_502` | もう | Déjà | `T2-classe` | — |
| 118 | `v_502_s2` | `v_502` | もう | Ne… plus | `T2-classe` | — |
| 119 | `v_503_s1` | `v_503` | もう一度 | Encore une fois | `T1-radicaux`, `T2-classe`, `T2-nuls`, `T2-journal` | D1384 |
| 120 | `v_504_s1` | `v_504` | ゆっくり | Lentement | `T2-classe` | — |
| 121 | `v_504_s2` | `v_504` | ゆっくり | Tranquillement | `T2-classe`, `T2-nuls` | — |
| 122 | `v_506_s1` | `v_506` | よく | Souvent | `T2-classe` | — |
| 123 | `v_506_s2` | `v_506` | よく | Bien | `T2-classe`, `T2-nuls` | — |
| 124 | `v_509_s1` | `v_509` | 少し | Une petite quantité | `T2-classe` | — |
| 125 | `v_509_s2` | `v_509` | 少し | Un peu | `T2-classe` | — |
| 126 | `v_509_s3` | `v_509` | 少し | Un court instant | `T2-classe` | — |
| 127 | `v_510_s1` | `v_510` | 本当 | Vérité | `T1-point`, `T2-nuls` | — |
| 128 | `v_511_s1` | `v_511` | 問題 | Problème | `T1-radicaux`, `T2-nuls`, `T2-journal` | D1358, D1360 |
| 129 | `v_511_s2` | `v_511` | 問題 | Question (d'examen) | `T1-radicaux`, `T2-journal` | D1358, D1360 |
| 130 | `v_512_s1` | `v_512` | 大丈夫 | Ça va | `T2-nuls` | — |
| 131 | `v_513_s2` | `v_513` | 意味 | Intérêt | `T2-nuls` | — |
| 132 | `v_515_s1` | `v_515` | あまり | Pas tellement | `T2-classe` | — |
| 133 | `v_516_s1` | `v_516` | ある | Y avoir | `T2-nuls` | — |
| 134 | `v_516_s2` | `v_516` | ある | Posséder | `T2-nuls` | — |
| 135 | `v_517_s1` | `v_517` | 一番 | Le plus | `T1-point`, `T2-classe` | — |
| 136 | `v_517_s2` | `v_517` | 一番 | Numéro un | `T2-classe` | — |
| 137 | `v_518_s1` | `v_518` | すぐに | Tout de suite | `T2-classe` | — |
| 138 | `v_519_s1` | `v_519` | たいてい | Généralement | `T2-classe` | — |
| 139 | `v_520_s1` | `v_520` | たくさん | Beaucoup | `T2-classe` | — |
| 140 | `v_521_s1` | `v_521` | たぶん | Peut-être | `T2-classe`, `T2-nuls` | — |
| 141 | `v_522_s1` | `v_522` | 付ける | Allumer | `T2-nuls` | — |
| 142 | `v_522_s2` | `v_522` | 付ける | Fixer | `T2-nuls` | — |
| 143 | `v_523_s2` | `v_523` | 出来る | Être achevé / prêt | `T2-nuls` | — |
| 144 | `v_524_s1` | `v_524` | なる | Devenir | `T2-nuls` | — |
| 145 | `v_525_s1` | `v_525` | まっすぐ | Tout droit | `T2-classe` | — |
| 146 | `v_525_s2` | `v_525` | まっすぐ | Honnête | `T2-classe`, `T2-nuls` | — |
| 147 | `v_526_s1` | `v_526` | コピーする | Photocopier | `T2-nuls` | — |
| 148 | `v_528_s1` | `v_528` | 並ぶ | Faire la queue | `T2-nuls` | — |
| 149 | `v_532_s1` | `v_532` | 作る | Fabriquer | `T2-nuls` | — |
| 150 | `v_533_s1` | `v_533` | 借りる | Emprunter | `T2-nuls` | — |
| 151 | `v_536_s3` | `v_536` | 出す | Présenter | `T2-nuls` | — |
| 152 | `v_539_s1` | `v_539` | 切る | Couper | `T2-nuls` | — |
| 153 | `v_539_s2` | `v_539` | 切る | Raccrocher (un téléphone) | `T2-nuls` | — |
| 154 | `v_540_s1` | `v_540` | 初めて | Pour la première fois | `T2-classe` | — |
| 155 | `v_541_s1` | `v_541` | 取る | Prendre | `T2-nuls` | — |
| 156 | `v_541_s2` | `v_541` | 取る | Obtenir | `T2-nuls` | — |
| 157 | `v_542_s1` | `v_542` | 吸う | Fumer | `T1-point`, `T2-nuls` | — |
| 158 | `v_542_s2` | `v_542` | 吸う | Aspirer | `T2-nuls` | — |
| 159 | `v_545_s1` | `v_545` | 変える | Changer | `T2-nuls` | — |
| 160 | `v_546_s1` | `v_546` | 大体 | À peu près | `T2-classe` | — |
| 161 | `v_546_s2` | `v_546` | 大体 | En général | `T2-classe` | — |
| 162 | `v_548_s1` | `v_548` | 居る | Y avoir (pour les êtres vivants) | `T2-nuls` | — |
| 163 | `v_551_s1` | `v_551` | 座る | S'asseoir | `T2-nuls` | — |
| 164 | `v_552_s1` | `v_552` | 待つ | Attendre | `T2-nuls` | — |
| 165 | `v_554_s1` | `v_554` | 時々 | Parfois | `T2-classe` | — |
| 166 | `v_558_s1` | `v_558` | 死ぬ | Mourir | `T2-nuls` | — |
| 167 | `v_560_s1` | `v_560` | 消える | S'éteindre | `T2-nuls` | — |
| 168 | `v_560_s2` | `v_560` | 消える | Disparaître | `T2-nuls` | — |
| 169 | `v_561_s1` | `v_561` | 消す | Éteindre | `T2-nuls` | — |
| 170 | `v_562_s1` | `v_562` | 渡す | Remettre | `T2-nuls` | — |
| 171 | `v_564_s1` | `v_564` | 無くす | Perdre (un objet) | `T2-nuls` | — |
| 172 | `v_567_s1` | `v_567` | 磨く | Brosser | `T2-nuls` | — |
| 173 | `v_568_s1` | `v_568` | 立つ | Se lever | `T2-nuls` | — |
| 174 | `v_573_s1` | `v_573` | 要る | Avoir besoin de | `T2-nuls` | — |
| 175 | `v_575_s1` | `v_575` | 貸す | Prêter | `T2-nuls` | — |
| 176 | `v_576_s1` | `v_576` | 貼る | Coller | `T2-nuls` | — |
| 177 | `v_578_s1` | `v_578` | 返す | Rendre | `T2-nuls` | — |
| 178 | `v_579_s1` | `v_579` | 閉まる | Se fermer | `T2-nuls` | — |
| 179 | `v_580_s1` | `v_580` | 開ける | Ouvrir | `T2-nuls` | — |
| 180 | `v_581_s1` | `v_581` | あなた | Vous | `T2-classe` | — |
| 181 | `v_584_s1` | `v_584` | いいえ | Non | `T1-radicaux`, `T2-journal` | D1494, D1602 |
| 182 | `v_584_s2` | `v_584` | いいえ | De rien | `T1-radicaux`, `T2-journal` | D1494, D1602 |
| 183 | `v_596_s1` | `v_596` | そうして | Et puis | `T1-mots` | — |
| 184 | `v_598_s1` | `v_598` | たばこ | Cigarette | `T2-nuls`, `T2-journal` | D1294, D1612 |
| 185 | `v_598_s2` | `v_598` | たばこ | Tabac | `T2-nuls`, `T2-journal` | D1294, D1612 |
| 186 | `v_600_s1` | `v_600` | どうぞ | S'il vous plaît | `T2-classe`, `T2-serie`, `T2-journal` | D1500 |
| 187 | `v_603_s1` | `v_603` | 髪 | Cheveux | `T2-nuls` | — |
| 188 | `v_605_s1` | `v_605` | 他 | Autre | `T1-point`, `T2-nuls` | — |
| 189 | `v_606_s1` | `v_606` | 皆 | Tout le monde | `T2-classe`, `T2-nuls` | — |
| 190 | `v_607_s1` | `v_607` | もっと | Plus | `T2-classe` | — |
| 191 | `v_608_s1` | `v_608` | やる | Faire | `T2-nuls` | — |
| 192 | `v_608_s2` | `v_608` | やる | Donner (à des plantes, des animaux) | `T2-nuls` | — |
| 193 | `v_609_s1` | `v_609` | 立派 | Magnifique | `T2-nuls` | — |
| 194 | `v_609_s2` | `v_609` | 立派 | Remarquable | `T2-nuls` | — |
| 195 | `v_611_s1` | `v_611` | グラム | Gramme | `T2-nuls` | — |
| 196 | `v_627_s2` | `v_627` | 一人 | Seul | `T2-nuls` | — |
| 197 | `v_633_s1` | `v_633` | 人 | Personne | `T2-nuls` | — |
| 198 | `v_635_s2` | `v_635` | 休む | S'absenter | `T2-nuls` | — |
| 199 | `v_637_s1` | `v_637` | 使う | Utiliser | `T2-nuls` | — |
| 200 | `v_638_s1` | `v_638` | 兄弟 | Frères et sœurs | `T1-point` | — |
| 201 | `v_639_s1` | `v_639` | 全部 | Tout | `T2-classe` | — |
| 202 | `v_642_s2` | `v_642` | 出る | Assister à | `T2-nuls` | — |
| 203 | `v_642_s3` | `v_642` | 出る | Apparaître | `T2-nuls` | — |
| 204 | `v_646_s1` | `v_646` | 力 | Force | `T2-nuls` | — |
| 205 | `v_648_s1` | `v_648` | 匹 | Compteur des petits animaux | `T2-nuls` | — |
| 206 | `v_651_s1` | `v_651` | 名前 | Nom | `T1-point` | — |
| 207 | `v_653_s1` | `v_653` | 声 | Voix | `T2-nuls` | — |
| 208 | `v_657_s1` | `v_657` | 女 | Femme | `T2-nuls` | — |
| 209 | `v_664_s1` | `v_664` | 所 | Endroit | `T1-point` | — |
| 210 | `v_664_s2` | `v_664` | 所 | Partie | `T2-nuls` | — |
| 211 | `v_665_s1` | `v_665` | 持つ | Tenir | `T2-nuls` | — |
| 212 | `v_665_s2` | `v_665` | 持つ | Posséder | `T2-nuls` | — |
| 213 | `v_667_s1` | `v_667` | 方 | Personne | `T2-nuls` | — |
| 214 | `v_671_s1` | `v_671` | 時計 | Horloge | `T2-nuls` | — |
| 215 | `v_675_s1` | `v_675` | 次 | Suivant | `T2-nuls` | — |
| 216 | `v_677_s1` | `v_677` | 水 | Eau | `T1-radicaux` | — |
| 217 | `v_684_s1` | `v_684` | 物 | Chose | `T2-nuls` | — |
| 218 | `v_685_s1` | `v_685` | 生活 | Mode de vie | `T2-nuls` | — |
| 219 | `v_686_s1` | `v_686` | 男 | Homme | `T2-nuls` | — |
| 220 | `v_687_s1` | `v_687` | 皆さん | Tout le monde | `T2-nuls` | — |
| 221 | `v_688_s1` | `v_688` | 私 | Je | `T1-mots`, `T2-classe` | — |
| 222 | `v_690_s2` | `v_690` | 背 | Dos | `T2-nuls` | — |
| 223 | `v_691_s1` | `v_691` | 自分 | Soi-même | `T2-classe`, `T2-nuls` | — |
| 224 | `v_694_s1` | `v_694` | 荷物 | Bagage | `T2-nuls` | — |
| 225 | `v_696_s1` | `v_696` | 表 | Face | `T2-nuls` | — |
| 226 | `v_700_s1` | `v_700` | 誰か | Quelqu'un | `T1-radicaux`, `T1-point`, `T1-mots`, `T2-classe`, `T2-nuls`, `T2-serie`, `T2-journal` | D0724 |
| 227 | `v_702_s1` | `v_702` | 質問 | Question | `T1-radicaux`, `T2-journal` | D0512 |
| 228 | `v_703_s1` | `v_703` | 辺 | Environs | `T1-point` | — |
| 229 | `v_709_s1` | `v_709` | 閉める | Fermer | `T2-nuls` | — |
| 230 | `v_710_s1` | `v_710` | 開く | S'ouvrir | `T2-nuls` | — |
| 231 | `v_713_s1` | `v_713` | 電気 | Électricité | `T2-nuls` | — |
| 232 | `v_716_s1` | `v_716` | 顔 | Visage | `T2-nuls` | — |
| 233 | `v_718_s1` | `v_718` | レジ袋 | Sac de caisse | `T1-radicaux` | — |
| 234 | `v_719_s1` | `v_719` | ポイントカード | Carte de fidélité | `T1-radicaux` | — |

## 6. Décisions déjà existantes

- **D0724** (`v_700_s1`, validated) : « Personne indéterminée : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4) ; pas de fonction interrogative (誰か n'interroge pas), ni deictique (référent indéterminé, non repéré par la situation d'énonciation, A7) Addendum A5. » Le sens est relevé (`T1-radicaux`, `T1-point`, `T1-mots`, `T2-classe`, `T2-nuls`, `T2-serie`, `T2-journal`). La relecture dira si cette décision s'accorde avec la définition d'A10, sans la réécrire.

## 7. Limites

- **Un sens que les filtres n'ont pas relevé n'est pas un sens vérifié conforme : il n'a pas été relu.**
- Les filtres ne voient pas une fiche qui décrirait un emploi interrogatif sans aucune des marques recherchées, hors des classes et des séries du temps 2.
- `T2-serie` compare les graphies du candidat, non ses lectures : un composé écrit en kanji sur un porteur écrit en kana (ou l'inverse, hors des lectures des porteurs) lui échappe.
- X1 est un filtre complémentaire, non normatif, hors A10 ; il n'élargit que la relecture.
- Les exemples ne sont pas filtrés ; les données de grammaire sont hors population.

## 8. Suite

- La charge de relecture mesurée ici (234 sens) est soumise à l'arbitrage ; **la relecture individuelle du temps 3 ne commence qu'après cet arbitrage et sur autorisation distincte.**
- Au temps 3, chaque candidat recevra l'une des trois conclusions d'A10, §8, motivée par la définition et les frontières ; une omission signalée ne modifie rien et n'est pas ajoutée aux 377 candidats du lot 3.
- L'inscription de cette mesure dans les documents de pilotage se fait séparément ; ce rapport est une proposition, à ce stade hors de `docs/rapports/`.
