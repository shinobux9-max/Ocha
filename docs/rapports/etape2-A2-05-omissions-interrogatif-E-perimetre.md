# A2-05 · bloc F · recherche d'omissions d'`interrogatif`, temps 3 — périmètre du groupe E

**Date** : 2026-11-05
**Statut** : **périmètre accepté le 2026-11-05 (§0).** La proposition est conservée telle qu'elle a été livrée ; aucune donnée n'est modifiée. L'organisation retenue pour l'inscription (QE-4) diffère de celle proposée au §4 : le §0 fait foi.

**Demande** (relayée) : « Je t'autorise uniquement à préparer, sans appliquer : […] le périmètre du groupe E, dernier groupe : 121 sens dans 107 ENTRY, avec identifiants, thème, filtres d'origine, sources disponibles, décisions historiques et corrections retenues pertinentes. Pour le groupe E, propose une organisation de relecture adaptée à sa taille, sans prendre de décision lexicale. Ne commence aucun verdict lexical sur E avant l'acceptation explicite de son périmètre. »

**Base** :
- addendum A10 (§2 à §4, §6, §8) ;
- découpage accepté le 2026-11-04 (`a2-05-travail/omissions-temps3/decoupage.json`, SHA-256 `56da6952…7acc46`) ;
- méthode des groupes A à D (QA-4, QB-2, QC-2, QD-3, acceptées) ;
- arbitrage du groupe D (2026-11-05), dont le point 3 : « la présence du mot relu dans une question ne prouve pas qu'il porte la fonction ».

**Outillage** : `a2-05-travail/omissions-temps3/preparer-perimetre-E.mjs`, en lecture seule, code 0. Il produit `perimetre-E.json` et `dossier-E.md` (annexe), où se trouvent les tableaux complets :
- les 121 sens et les 107 ENTRY ;
- leurs fiches, leurs décisions et leurs corrections retenues ;
- en entier, les 14 décisions qui portent sur les fonctions ou en parlent.

## 0. Arbitrage

Arbitrage du 2026-11-05 (l'utilisateur, qui accepte les recommandations de ChatGPT ; relayé par l'utilisateur) : « QE-1 : OUI — périmètre accepté, 121 sens dans 107 ENTRY, thème T2-nuls. » « QE-2 : OUI — trois livraisons par classe : E1, 39 sens dans 37 ENTRY ; E2, 30 sens dans 27 ENTRY ; E3, 52 sens dans 43 ENTRY. » « QE-3 : OUI — méthode R1 à R5, trois conclusions possibles, sources intégrales et décisions historiques citées sans être rouvertes. » « QE-4 : je retiens une inscription documentaire après chaque livraison arbitrée, avec préparation, relecture et autorisation d'application distinctes. » « Aucun verdict lexical sur E pour le moment. » L'ouverture de la relecture de E1 (QE-5) a été réservée jusqu'à la vérification de l'application de l'inscription du groupe D, puis autorisée distinctement : « QE-5 : OUI. J'autorise l'ouverture de la relecture lexicale de E1, strictement limitée aux 39 sens nominaux dans 37 ENTRY du périmètre E déjà accepté. » « Ne commence pas E2 ni E3. » (Citation de QE-4 normalisée sur un seul caractère : dans le message relayé, le dernier « e » de « arbitrée » est la lettre cyrillique U+0435.)

**Effets.** Le périmètre du groupe E (121 sens, 107 ENTRY, thème T2-nuls) et sa méthode (grille R1 à R5, trois conclusions possibles, fiches sources intégrales, décisions historiques et verdicts du volet 2 cités sans être rouverts) sont acceptés. **Organisation** : trois livraisons par classe de l'ENTRY, dans l'ordre E1 (noms : 39 sens, 37 ENTRY), E2 (adjectifs en i et en na : 30 sens, 27 ENTRY), E3 (verbes : 52 sens, 43 ENTRY) ; aucune ENTRY n'est partagée entre deux livraisons ; chaque livraison s'ouvre sur une autorisation distincte (QE-5 pour E1 ; E2 et E3, chacune la sienne). **Inscription (QE-4)** : une inscription documentaire après chaque livraison arbitrée, chacune avec sa préparation, sa relecture et son autorisation d'application distinctes ; c'est l'« autre voie possible » du §4, et non l'inscription unique après E3 qui y est proposée. Ce §0 ne modifie pas la portée des arbitrages : il les enregistre. Les annexes citées sont dans le dossier de travail `a2-05-travail/omissions-temps3/` : `dossier-E.md` (SHA-256 `1a141ac195c3c39dfe3435b7d94722175385b78e29a5faa7ebd35b4ee5b33d60`) et `perimetre-E.json` (SHA-256 `0f4682d8b00a2d3befb2581a0f74cbc0bfe3eacb9a5f8a2e3a578f032c0539b5`). Le texte qui suit est la proposition, conservée telle qu'elle a été livrée.

## 1. Thème du groupe

**Les valeurs nulles (T2-nuls).** Le filtre relève tout sens **sans catégorie ou sans type, et sans aucune fonction**. Un `null` est une absence justifiée (addenda A5 et A6), arbitrée un par un au volet 2 ; **il ne présume rien de la fonction**. Le filtre désigne des sens à relire, rien de plus (A10, §8).

Chaque sens porte `T2-nuls` et lui seul : aucun filtre du temps 1, ni `T2-classe`, ni `T2-serie`, ni `T2-journal`. Le script le vérifie aussi par les données :
- aucune ENTRY n'est de classe `pronom`, `determinant` ou `adverbe` ;
- aucune des 339 décisions n'emploie le vocabulaire de la question ;
- aucun sens de ces ENTRY ne porte la fonction.

| Valeur nulle | Sens |
|---|---|
| catégorie | 96 |
| type | 24 |
| catégorie et type (声 « Voix ») | 1 |
| **Total** | **121** |

| Classe de l'ENTRY | ENTRY | Sens |
|---|---|---|
| `nom` | 37 | 39 |
| `adjectif_i` | 15 | 17 |
| `adjectif_na` | 12 | 13 |
| `verbe` | 43 | 52 |
| **Total** | **107** | **121** |

Les 107 ENTRY portent 151 sens publiés. Les 30 qui ne sont pas candidats ne sont pas dans les 234 ; le script le vérifie. Leurs identifiants sont listés dans l'annexe.

## 2. Sources disponibles

**115 fiches sources** pour 107 ENTRY, toutes présentes, chacune dans un lot validé. Huit ENTRY ont une fiche fusionnée :

| ENTRY | Fiches |
|---|---|
| お腹 | `n5_v_44` et `n5_v_45` |
| キロ | `n5_v_363` et `n5_v_610` |
| いい | `n5_v_420` et `n5_v_583` |
| きれい | `n5_v_424` et `n5_v_472` |
| 弱い | `n5_v_449` et `n5_v_450` |
| 大変 | `n5_v_495` et `n5_v_508` |
| 無くす | `n5_v_564` et `n5_v_601` |
| 出る | `n5_v_642` et `n5_v_537` |

Dix-neuf lots d'origine sont représentés. Les plus fournis :

| Lot | Contenu | Sens |
|---|---|---|
| lot 01 | parties du corps, personnes | 19 |
| lot 18 | actions sur les objets | 23 |
| lot 20 | existence, possession, action | 17 |
| lot 16 | préférences et états | 11 |
| lot 19 | vie quotidienne | 11 |

Le reste, lot par lot, est dans l'annexe.

**Anciens exemples** : 345.

**Phrases dont la traduction a la forme d'une question** (exemples de fiche et anciens exemples) : 36, dans 26 ENTRY. C'est un **fait de surface**, que le script compte sans rien en déduire ; elles sont détaillées au §5, point 2.

**À l'export de la relecture**, comme pour A à D : les fiches complètes, leurs anciens exemples et les ENTRY publiées.

## 3. Décisions historiques et verdicts antérieurs

**339 décisions de journal**, toutes `validated`. **14 portent sur les fonctions linguistiques ou en parlent** ; elles sont citées en entier dans l'annexe. Elles refusent ou n'attribuent aucune fonction, et aucune ne parle de la question :

| Décisions | ENTRY | Objet |
|---|---|---|
| D0927, D0928 | 時間 | pas de `deictique` |
| D1350 | 次 | pas de `deictique` |
| D1305, D1319, D1323 | ある, 出来る, なる | aucune fonction, périmètre du lot 20 |
| D1424 | いろいろ | aucune fonction sans définition normative |
| D1327 | 違う | l'emploi d'adresse reste en nuance, sans sens ni fonction |
| D1113 | 危ない | l'emploi d'avertissement reste en nuance |
| D0074 | 大変 | emploi intensifieur, type nul (A6) |
| D0849 | カレンダー | catégorie, mention d'une fonction |
| D0404 | 時計 | catégorie, mention d'une fonction |
| D0500 | 匹 | compteur |
| D1184 | 消える | sens |

**Verdicts du lot 3** : **aucun sens de E n'est commun aux 377**, et il n'y a donc aucun verdict du lot 3 à citer.

**Verdicts arbitrés du volet 2** (audit individuel des 147 `null`, `docs/rapports/etape2-A2-05-audit-null.md`) : les 121 sens en ont un. Ils sont cités et non rouverts ; ils portent sur la catégorie ou le type, jamais sur la fonction.

| Verdict | Sens |
|---|---|
| L (`null` légitime) | 114 |
| L, deux fois (声 : catégorie et type) | 1 |
| C (correction retenue) | 6 |

Les six sens au verdict C :

| Sens | Mot | Correction retenue |
|---|---|---|
| `v_65_s2` | 頭 « Esprit » | volet 2, modification 2 (`semantic_type`) |
| `v_287_s1` | カレンダー | volet 2, modification 8 (`category`) |
| `v_528_s1` | 並ぶ | volet 2, modification 6 (`category`) |
| `v_671_s1` | 時計 | volet 2, modification 7 (`category`) |
| `v_687_s1` | 皆さん | volet 2, modification 5 (`category`) |
| `v_696_s1` | 表 | volet 2, modification 3 (`semantic_type`) |

**Corrections retenues, non appliquées** : 43, dans 31 ENTRY. Elles sont lues, ni appliquées ni rouvertes, et leur liste complète est dans l'annexe. **Aucune ne porte sur les fonctions linguistiques.**

| Champ | Corrections |
|---|---|
| `nuance` | 31 |
| `category` | 4 |
| `semantic_type` | 3 |
| `particles` | 3 (dont 2 avec `nuance`) |
| `meaning` | 2 |

## 4. Organisation proposée de la relecture

Le groupe E est le plus grand : 121 sens, environ 2,3 fois le groupe D. Son rapport unique ferait environ 3 400 lignes, contre 1 481 pour D. **Je propose trois livraisons, par classe de l'ENTRY**, chacune sur une autorisation distincte :

| Livraison | Classe | Sens | ENTRY | Fiches | Anciens ex. | Décisions | Corrections | Phrases en question |
|---|---|---|---|---|---|---|---|---|
| **E1** | `nom` | 39 | 37 | 39 | 117 | 101 | 22 | 14 |
| **E2** | `adjectif_i`, `adjectif_na` | 30 | 27 | 31 | 93 | 84 | 10 | 12 |
| **E3** | `verbe` | 52 | 43 | 45 | 135 | 154 | 11 | 10 |
| | | **121** | **107** | **115** | **345** | **339** | **43** | **36** |

**Les raisons** :
- La classe est une propriété de l'ENTRY. Aucune ENTRY n'est donc partagée entre deux livraisons, et la cohérence intra-ENTRY se juge dans une seule livraison.
- Les frontières d'A10, §4, s'y regroupent naturellement :
  - noms de personne et d'unité dans E1 ;
  - emplois de vérification et énoncés en « n'est-ce pas ? » dans E2 ;
  - demandes de permission dans E3.
- Chaque livraison a au plus la taille de D, déjà relu en un seul rapport.
- **L'ordre proposé est E1, E2, E3.** E1 vient d'abord parce qu'elle porte le plus de phrases en forme de question, et que les noms de personne y sont les plus proches de la frontière.

**Chaque livraison suivrait le format de D** :
- un rapport de relecture, avec les analyses individuelles, des contrôles automatiques, des sabotages et l'export ;
- le recueil de ses fiches complètes ;
- un arbitrage propre à la livraison.

**L'inscription documentaire** :
- *proposée* : **une seule inscription**, après l'arbitrage de E3, qui couvre les trois livraisons et clôt le décompte de la recherche (234 relus sur 234) ;
- *autre voie possible* : une inscription après chaque livraison, comme pour A à D, soit trois cycles de plus.

**Autres voies possibles pour la forme** :
- un rapport unique (environ 3 400 lignes) ;
- quatre livraisons, E3 étant scindée en E3a (verbes du lot 18, 23 sens, 19 ENTRY) et E3b (autres verbes, 29 sens, 24 ENTRY).

## 5. Points sensibles, à examiner à la relecture (sans conclusion ici)

1. **Le thème.** Un `null` de catégorie ou de type ne dit rien de la fonction. Les verdicts du volet 2 sont cités, non rouverts, et ne décident pas de la fonction.
2. **Les 36 phrases en forme de question** (annexe et export). Leur forme grammaticale est décrite ici sans jugement sur le mot relu. Chacune sera relue selon R2 et le point 3 de l'arbitrage du groupe D.

   **Questions ouvertes**, où l'interrogation est tenue par un autre mot :

   | Mot interrogatif | ENTRY relues |
   |---|---|
   | 何 | 時計, 匹 |
   | いくら | 要る, グラム |
   | どなた, だれ, 誰 | 人, 方, 女, 男, 一人 |
   | どう, どういう | いい, まずい, 意味, 無くす |
   | どのくらい | 時間 |

   **Autres formes** :

   | Forme | ENTRY relues |
   |---|---|
   | questions fermées en か | 暇, 大丈夫, やる, 持つ, 皆さん |
   | demandes de permission en 〜てもいいですか | コピーする, 借りる, 貼る, 開ける, 使う |
   | énoncés en ね, traduits « n'est-ce pas ? » | いい, 大変, 立派 |
   | invitation en 〜ませんか | 時間 |

   Les décomptes ne s'additionnent pas : certaines ENTRY ont plusieurs phrases.
3. **Les noms de personne** (人, 方, 女, 男, 皆さん, 一人) dans « Qui est … ? » : ils désignent le référent de la question. La relecture dira s'ils demandent quoi que ce soit (A10, §2).
4. **いい et 大丈夫** : les emplois de vérification (« 大丈夫ですか ») sont des questions fermées. A10, §4, point 5 (marques grammaticales) est à examiner.
5. **皆さん** : un ancien exemple contient 質問 (« question »). A10, §4, point 4, distingue nommer une question de la poser ; la frontière est à examiner pour le seul sens relu.
6. **意味 « Signification »** : un ancien exemple (« どういう意味ですか ») demande une signification. Le nom désigne la signification ; l'interrogation est tenue par どういう.
7. **Les répliques et les avertissements** : 違う « c'est faux » (D1327) et 危ない « Attention ! » (D1113) sont gardés en nuance, sans sens ni fonction. Ils sont cités, jamais réécrits.
8. **Les six sens au verdict C du volet 2**, et les 43 corrections retenues : ils sont lus et non appliqués. Aucune ne touche les fonctions.
9. **Les huit fiches fusionnées** : chaque fiche est lue en entier, la fiche fusionnée comprise.
10. **Aucun sens commun au lot 3** : la relecture s'appuie sur la fiche, l'ENTRY, les décisions et le verdict du volet 2.

## 6. Méthode de relecture (A10, §8, temps 3)

Elle est **identique à celle des groupes A à D** (QA-4, QB-2, QC-2, QD-3, acceptées). Pour chaque sens, la relecture lit :
- la fiche entière, et la fiche fusionnée s'il y en a une ;
- ses anciens exemples ;
- l'ENTRY publiée et tous ses sens ;
- toutes les décisions de journal de l'ENTRY, et l'entrée de son lot ;
- le verdict du volet 2, cité et non rouvert ;
- les corrections retenues, lues et non appliquées.

**Grille R1 à R5, sur la fonction seule** :

| N° | Question | Référence |
|---|---|---|
| R1 | Demander une information non spécifiée fait-il partie intégrante du sens modélisé ? | A10, §2 ; §3, point 1 |
| R2 | La fiche l'atteste-t-elle ? Une nuance, une traduction contextuelle ou une question d'exemple ne suffisent pas. | A10, §3, point 1 ; §8 ; arbitrage du groupe D, point 3 |
| R3 | Une frontière s'applique-t-elle (indéfini, `deictique`, registre poli, sens qui nomme une question, marque grammaticale) ? La classe et le `null` ne décident pas. | A10, §3, point 2 ; §4 |
| R4 | Si R1 et R2 sont positives, un cumul serait-il fondé ? | A10, §6 |
| R5 | Les décisions existantes, citées et jamais réécrites, s'accordent-elles avec la définition ? | A10, §8 |

**Conclusions**, une par sens, motivée :
- « ne relève pas de la fonction » ;
- « relève de la fonction » : omission signalée ; rien n'est modifié, et le sens reste hors des 377 ;
- « à arbitrer ».

## 7. Ce qui reste séparé

- **Les 377 sens du lot 3** ne sont pas concernés : aucun sens de E n'en fait partie.
- **Les verdicts du volet 2** sont cités et non rouverts.
- **Les 204 corrections** restent non appliquées.
- **La recherche d'omissions** est comptée à part. Après A à D, 113 sens sont relus et 121 restent : ce sont les sens de E. Après E, les 234 candidats seraient tous relus ; la clôture de la recherche serait une étape distincte.
- **L'inscription de l'arbitrage du groupe D** est préparée à part, dans la même livraison, et n'est pas appliquée.

## 8. Questions à l'arbitrage

1. **QE-1** : accepter le périmètre du groupe E tel qu'il est (121 sens, 107 ENTRY, thème T2-nuls).
2. **QE-2** : la forme de la livraison :
   - trois livraisons par classe, E1 noms, E2 adjectifs, E3 verbes, dans cet ordre (proposé) ;
   - ou un rapport unique ;
   - ou quatre livraisons, E3 scindée en E3a et E3b.
3. **QE-3** : appliquer à E la méthode de A à D (grille R1 à R5, trois conclusions, recueil des fiches complètes à l'export), avec les verdicts du volet 2 cités et non rouverts.
4. **QE-4** : l'inscription de l'arbitrage de E :
   - une seule, après E3 (proposé) ;
   - ou une après chaque livraison.
5. **QE-5** : autoriser, distinctement, l'ouverture de la relecture de la première livraison.
