# Lot lot-24 · Quantité, degré et comparaison

Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.

## Autres entrées

### n5_v_654 → v_654 · 多い

**Statut** : décision validée

- **A2-04-D1510** (decision, grammatical_class) : Classe adjectif_i : la fiche le dit « adjectif en -i qualifiant une grande quantité » ; son exemple l'emploie en prédicat (ほんがおおいです). Groupe i (schema-A2-01, §6). La classe ne décide pas de la fonction, ni l'inverse (A9, §2.2). — avant `"adjectif (ancien type, sans classe par défaut)"` → après `"adjectif_i"`
- **A2-04-D1511** (decision, senses) : Un seul sens : une grande quantité de choses ou de personnes, que les trois traductions disent et que l'exemple illustre (il y a beaucoup de livres). Catégorie nombres et quantification › quantité › grande quantité : le concept de quantité (A2-LING, §5). Type propriete, une caractéristique attribuée à ce qui est nombreux, comme 大きい (lot 15) pour la taille. La particule が de la fiche est reprise mécaniquement pour ce sens unique. — avant `["Nombreux","Beaucoup de","Abondant"]` → après `"un seul sens"`
- **A2-04-D1512** (decision, sens 1 · linguistic_functions) : Aucune fonction (arbitrage du périmètre du lot 24) : 多い prédique la quantité (« les livres sont nombreux ») ; un prédicat de quantité n'est pas un quantificateur (A9, §3.4). La quantité est dite par la catégorie, comme la taille de 大きい (lot 15), validé sans fonction. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`
- **A2-04-D1513** (decision, relations) : Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (report à la passe finale 5.16, comme aux lots 18 à 23). 多い / 少ない : la fiche de 少ない le dit « antonyme de ooi » : opposed_to. 多い, たくさん et 大勢 disent aussi une grande quantité, de classes et d'emplois différents. Candidate explicite à l'audit des relations de 5.16 (registre A2-REL) ; aucune fusion. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 多い · おおい · ooi |
| type, group | adjectif · i |
| catégorie (ancienne, indicative) | descriptions_qualites › quantite |
| sens | Nombreux ; Beaucoup de ; Abondant |
| nuance | **Adjectif en -i** qualifiant une grande quantité de choses ou de personnes. Lorsqu'il qualifie directement un nom, il se place généralement avant celui-ci. |
| particules | が |
| furigana | <ruby>多<rt>おお</rt></ruby>い |
| exemple | この としょかん は ほん が **<ruby>多<rt>おお</rt></ruby>い** です 。 — Il y a **beaucoup** de livres dans cette bibliothèque. |

**Mécanique**

- word : `"多い"`
- readings : `[{"kana":"おおい","romaji":"ooi","furigana":"<ruby>多<rt>おお</rt></ruby>い","default":true,"note":null}]`
- grammatical_class : **exception**, ancien type « adjectif » sans classe par défaut
- group : **exception**, dépend de la classe, en exception

**Décision**

- grammatical_class : `"adjectif_i"`
- group : `"i"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Qualifie une grande quantité de choses ou de personnes : このとしょかんはほんがおおいです (il y a beaucoup de livres dans cette bibliothèque). Lorsqu'il qualifie directement un nom, il se place généralement avant celui-ci."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Nombreux** (Beaucoup de, Abondant) | nombres_quantification › quantite › grande_quantite | propriete |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>東京<rt>とうきょう</rt></ruby> に は <ruby>車<rt>くるま</rt></ruby> が <ruby>多<rt>おお</rt></ruby>い です — Il y a **beaucoup** de voitures à Tokyo.
- 「この <ruby>図書館<rt>としょかん</rt></ruby> は <ruby>本<rt>ほん</rt></ruby> が <ruby>多<rt>おお</rt></ruby>くて <ruby>便利<rt>べんり</rt></ruby> です」 — « Cette bibliothèque est pratique car il y a **beaucoup** de livres. »
- <ruby>週末<rt>しゅうまつ</rt></ruby> は <ruby>公園<rt>こうえん</rt></ruby> に <ruby>人<rt>ひと</rt></ruby> が <ruby>多<rt>おお</rt></ruby>い です — Il y a **beaucoup** de monde au parc le week-end.

### n5_v_447 → v_447 · 少ない

**Statut** : décision validée

- **A2-04-D1514** (decision, senses) : Un seul sens : une quantité restreinte ou un nombre faible d'éléments ou de personnes, que l'exemple illustre (il y a peu de voitures). Catégorie nombres et quantification › quantité › petite quantité. Type propriete, comme 多い. Classe adjectif_i mécanique. La fiche ne donne aucune particule. — avant `["Peu nombreux","Raréfié","En petite quantité","Peu de"]` → après `"un seul sens"`
- **A2-04-D1515** (decision, senses) : Traduction gardée en alternative du sens 1 (arbitrage des choix du lot 24) : aucune preuve interne à la fiche ne permet de l'écarter comme un devenir ; elle dit, avec les autres traductions, une quantité restreinte. Réécrite à sa place : la décision d'abandon proposée est remplacée par une décision de maintien, sous le même identifiant. — avant `["Raréfié"]` → après `"gardée en alternative du sens 1"`
- **A2-04-D1516** (decision, sens 1 · linguistic_functions) : Aucune fonction (arbitrage du périmètre du lot 24) : 少ない prédique la quantité ; un prédicat de quantité n'est pas un quantificateur (A9, §3.4). La quantité est dite par la catégorie. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`

| Champ source | Valeur |
|---|---|
| mot, lecture | 少ない · すくない · sukunai |
| type, group | adjectif en i · i |
| catégorie (ancienne, indicative) | descriptions_qualites › quantite |
| sens | Peu nombreux ; Raréfié ; En petite quantité ; Peu de |
| nuance | **Adjectif en i** qualifiant une quantité restreinte ou un nombre faible d'éléments ou de personnes (antonyme de *ooi*). |
| particules |  |
| furigana | <ruby>少<rt>すく</rt></ruby>ない |
| exemple | この まち は くるま が **<ruby>少<rt>すく</rt></ruby>ない** です 。 — Il y a **peu** de voitures dans cette ville. |

**Mécanique**

- word : `"少ない"`
- readings : `[{"kana":"すくない","romaji":"sukunai","furigana":"<ruby>少<rt>すく</rt></ruby>ない","default":true,"note":null}]`
- grammatical_class : `"adjectif_i"`
- group : `"i"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Qualifie une quantité restreinte ou un nombre faible d'éléments ou de personnes : このまちはくるまがすくないです (il y a peu de voitures dans cette ville). Antonyme de 多い, selon la fiche."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Peu nombreux** (Raréfié, En petite quantité, Peu de) | nombres_quantification › quantite › petite_quantite | propriete |  |  |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>町<rt>まち</rt></ruby> は <ruby>車<rt>くるま</rt></ruby> が <ruby>少<rt>すく</rt></ruby>ない です — Il y a **peu** de voitures dans cette ville.
- <ruby>今年<rt>ことし</rt></ruby> は <ruby>雨<rt>あめ</rt></ruby> の <ruby>日<rt>ひ</rt></ruby> が <ruby>少<rt>すく</rt></ruby>ない です — Il y a **peu** de jours de pluie cette année.
- <ruby>時間<rt>じかん</rt></ruby> が <ruby>少<rt>すく</rt></ruby>ない ので、<ruby>急<rt>いそ</rt></ruby>ぎましょう — Comme nous avons **peu** de temps, dépêchons-nous.

### n5_v_655 → v_655 · 大勢

**Statut** : décision validée

- **A2-04-D1517** (decision, senses) : Un seul sens : la fiche dit 大勢 « utilisé exclusivement pour désigner une grande foule ou un nombre élevé de personnes » ; les trois traductions disent ce même référent, que l'exemple illustre (il y a beaucoup de monde au parc). Catégorie nombres et quantification › quantité › grande quantité. Type groupe_collectif (arbitrage des choix du lot 24) : la fiche désigne exclusivement une foule, un ensemble de personnes ; la catégorie grande quantité porte l'aspect quantitatif. Classe nom mécanique ; la fiche dit aussi « adverbe ». La particule の de la fiche est reprise mécaniquement pour ce sens unique. — avant `["Beaucoup de monde","Une foule","Un grand nombre de personnes"]` → après `"un seul sens"`
- **A2-04-D1518** (decision, sens 1 · linguistic_functions) : Aucune fonction (arbitrage du périmètre du lot 24) : la fiche dit que 大勢 désigne une foule ou un nombre élevé de personnes ; un mot qui désigne une quantité n'est pas un quantificateur (A9, §3.4). L'emploi avec の devant 人 est dit en nuance. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`

| Champ source | Valeur |
|---|---|
| mot, lecture | 大勢 · おおぜい · oozei |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | descriptions_qualites › quantite |
| sens | Beaucoup de monde ; Une foule ; Un grand nombre de personnes |
| nuance | **Nom / adverbe** composé des kanjis signifiant « grand » et « force / foule », utilisé exclusivement pour désigner une grande foule ou un nombre élevé de personnes. |
| particules | の |
| furigana | <ruby>大<rt>おお</rt></ruby><ruby>勢<rt>ぜい</rt></ruby> |
| exemple | こうえん に **<ruby>大<rt>おお</rt></ruby><ruby>勢<rt>ぜい</rt></ruby>** の ひと が い ます 。 — Il y a **beaucoup de monde** (une foule de gens) au parc. |

**Mécanique**

- word : `"大勢"`
- readings : `[{"kana":"おおぜい","romaji":"oozei","furigana":"<ruby>大<rt>おお</rt></ruby><ruby>勢<rt>ぜい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Une grande foule ou un nombre élevé de personnes, exclusivement pour des personnes ; suivi de の devant un nom : こうえんにおおぜいのひとがいます (il y a beaucoup de monde au parc). La fiche le dit aussi adverbe."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Beaucoup de monde** (Une foule, Un grand nombre de personnes) | nombres_quantification › quantite › grande_quantite | groupe_collectif |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>駅前<rt>えきまえ</rt></ruby> に <ruby>大勢<rt>おおぜい</rt></ruby> の <ruby>人<rt>ひと</rt></ruby> が <ruby>集<rt>あつ</rt></ruby>まっています — **Beaucoup de monde** ('une foule de personnes') est rassemblé devant la gare.
- 「コンサート に <ruby>大勢<rt>おおぜい</rt></ruby> の <ruby>子供<rt>こども</rt></ruby> が <ruby>来<rt>き</rt></ruby>ました」 — « **Beaucoup** d'enfants sont venus au concert. »
- <ruby>食堂<rt>しょくどう</rt></ruby> に は <ruby>学生<rt>がくせい</rt></ruby> が <ruby>大勢<rt>おおぜい</rt></ruby> います — Il y a **beaucoup** d'étudiants dans la cantine.

### n5_v_520 → v_520 · たくさん

**Statut** : décision validée

- **A2-04-D1519** (decision, grammatical_class) : Classe adverbe : la fiche le dit d'abord « adverbe », « ou nom / adjectif en na dans certaines tournures » ; son exemple l'emploie près du verbe, sans particule (りんごをたくさんかいました). Le schéma ne porte qu'une classe ; les autres emplois sont dits en nuance. Groupe null : la classe n'a aucune valeur de groupe compatible (schema-A2-01, §6). La classe ne décide pas de la fonction, ni l'inverse (A9, §2.2). — avant `"adverbe (ancien type)"` → après `"adverbe"`
- **A2-04-D1520** (decision, senses) : Un seul sens (arbitrage du périmètre du lot 24) : une quantité abondante d'objets ou de personnes, ou une action accomplie en grand nombre, que l'exemple illustre (j'ai acheté beaucoup de pommes). Catégorie nombres et quantification › quantité › grande quantité, le concept de quantité ; sans type (décision type-nul). La fiche ne donne aucune particule. — avant `["Beaucoup","En grande quantité","Nombreux","Suffisamment"]` → après `"un seul sens"`
- **A2-04-D1521** (decision, senses) : Traduction gardée en alternative du sens 1 (arbitrage des choix du lot 24, conformément à l'arbitrage du périmètre) : « suffisamment » est une traduction de la fiche, rattachée au sens unique de quantité abondante. Réécrite à sa place : la décision d'abandon proposée est remplacée par une décision de maintien, sous le même identifiant. — avant `["Suffisamment"]` → après `"gardée en alternative du sens 1"`
- **A2-04-D1522** (decision, sens 1 · linguistic_functions) : Fonction quantificateur (A9, §3.4 ; arbitrage du périmètre du lot 24) : たくさん quantifie un référent désigné par un autre mot (les pommes, objet du verbe), en en donnant l'étendue ; c'est le sens lui-même, attesté par la fiche et son exemple. Le concept reste porté par la catégorie (rôle et concept, A9, §3.4, frontière 2). — avant `null` → après `{"grammatical":["quantificateur"],"pragmatic_discourse":[]}`
- **A2-04-D1523** (type-nul, sens 1 · semantic_type) : Aucun type : たくさん applique une quantité au référent qu'il quantifie ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.

| Champ source | Valeur |
|---|---|
| mot, lecture | たくさん · たくさん · takusan |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › quantite |
| sens | Beaucoup ; En grande quantité ; Nombreux ; Suffisamment |
| nuance | **Adverbe** (ou nom/adjectif en na dans certaines tournures) exprimant une quantité abondante d'objets ou de personnes, ou l'accomplissement d'une action en grand nombre. |
| particules |  |
| furigana | たくさん |
| exemple | きのう りんご を **たくさん** かい まし た 。 — Hier, j'ai acheté **beaucoup** de pommes. |

**Mécanique**

- word : `"たくさん"`
- readings : `[{"kana":"たくさん","romaji":"takusan","furigana":"たくさん","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception

**Décision**

- grammatical_class : `"adverbe"`
- group : `null`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Une quantité abondante d'objets ou de personnes, ou une action accomplie en grand nombre : きのうりんごをたくさんかいました (hier, j'ai acheté beaucoup de pommes). La fiche le dit aussi nom ou adjectif en な dans certaines tournures."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Beaucoup** (En grande quantité, Nombreux, Suffisamment) | nombres_quantification › quantite › grande_quantite | **null** | grammatical : quantificateur |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>図書館<rt>としょかん</rt></ruby> に たくさん の <ruby>本<rt>ほん</rt></ruby> が あります — Il y a **beaucoup** de livres à la bibliothèque.
- <ruby>昨日<rt>きのう</rt></ruby> は <ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby> で たくさん <ruby>お金<rt>かね</rt></ruby> を <ruby>使<rt>つか</rt></ruby>いました — J'ai dépensé **beaucoup** d'argent pour le shopping hier.
- <ruby>夕方<rt>ゆうがた</rt></ruby>、<ruby>公園<rt>こうえん</rt></ruby> で <ruby>子供<rt>こども</rt></ruby> たち が たくさん <ruby>遊<rt>あそ</rt></ruby>んで います — En fin d'après-midi, **beaucoup** d'enfants jouent dans le parc.

### n5_v_639 → v_639 · 全部

**Statut** : décision validée

- **A2-04-D1524** (decision, grammatical_class) : Classe adverbe, groupe null (arbitrage des choix du lot 24) : la fiche dit « nom / adverbe », mais son type source est adverbe, son exemple principal l'emploie près du verbe (りんごをぜんぶたべました), et sa nuance décrit cet emploi (« souvent placé près du verbe »). L'emploi suivi de の, devant un nom, est conservé en nuance. Le schéma ne porte qu'une classe. Groupe null : la classe n'a aucune valeur de groupe compatible (schema-A2-01, §6). La classe ne décide pas de la fonction, ni l'inverse (A9, §2.2). — avant `"adverbe (ancien type)"` → après `"adverbe"`
- **A2-04-D1525** (decision, senses) : Un seul sens (arbitrage du périmètre du lot 24) : l'intégralité d'une quantité ou d'un groupe d'objets, que les trois traductions disent et que l'exemple illustre (j'ai tout mangé des pommes). Catégorie nombres et quantification › totalité et partie › totalité ; sans type. La fiche ne donne aucune particule. — avant `["Tout","L'ensemble","La totalité"]` → après `"un seul sens"`
- **A2-04-D1526** (decision, sens 1 · linguistic_functions) : Fonction quantificateur (A9, §3.4 ; arbitrage du périmètre du lot 24) : 全部 quantifie un référent désigné par un autre mot (les pommes), en en donnant l'étendue, la totalité ; c'est le sens lui-même. Le concept de totalité reste porté par la catégorie. — avant `null` → après `{"grammatical":["quantificateur"],"pragmatic_discourse":[]}`
- **A2-04-D1527** (type-nul, sens 1 · semantic_type) : Aucun type : 全部 applique la totalité au référent qu'il quantifie ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.

| Champ source | Valeur |
|---|---|
| mot, lecture | 全部 · ぜんぶ · zenbu |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › quantite |
| sens | Tout ; L'ensemble ; La totalité |
| nuance | **Nom / adverbe** exprimant l'intégralité d'une quantité ou d'un groupe d'objets. Il est souvent placé près du verbe ou suivi de la particule *no* lorsqu'il qualifie un nom. |
| particules |  |
| furigana | <ruby>全<rt>ぜん</rt></ruby><ruby>部<rt>ぶ</rt></ruby> |
| exemple | りんご を **<ruby>全<rt>ぜん</rt></ruby><ruby>部<rt>ぶ</rt></ruby>** たべ まし た 。 — J'ai **tout** mangé des pommes. |

**Mécanique**

- word : `"全部"`
- readings : `[{"kana":"ぜんぶ","romaji":"zenbu","furigana":"<ruby>全<rt>ぜん</rt></ruby><ruby>部<rt>ぶ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception

**Décision**

- grammatical_class : `"adverbe"`
- group : `null`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'intégralité d'une quantité ou d'un groupe d'objets : りんごをぜんぶたべました (j'ai tout mangé des pommes). Souvent placé près du verbe, ou suivi de の lorsqu'il qualifie un nom. La fiche le dit aussi nom."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Tout** (L'ensemble, La totalité) | nombres_quantification › totalite_partie › totalite | **null** | grammatical : quantificateur |  |

**Contexte (anciens exemples, lecture seule)**

- 「<ruby>宿題<rt>しゅくだい</rt></ruby> は もう <ruby>終<rt>お</rt></ruby>わりました か」「はい、<ruby>全部<rt>ぜんぶ</rt></ruby> <ruby>終<rt>お</rt></ruby>わりました」 — « As-tu déjà fini tes devoirs ? » « Oui, j'ai **tout** terminé. »
- <ruby>冷蔵庫<rt>れいぞうこ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> の ケーキ を <ruby>全部<rt>ぜんぶ</rt></ruby> <ruby>食<rt>た</rt></ruby>べてしまいました — J'ai **tout** mangé le gâteau qui était dans le réfrigérateur.
- 「この <ruby>本<rt>ほん</rt></ruby> の <ruby>代金<rt>だいきん</rt></ruby> は <ruby>全部<rt>ぜんぶ</rt></ruby> で いくら です か」 — « Combien coûte ce livre en **tout** ? »

### n5_v_509 → v_509 · 少し

**Statut** : décision validée

- **A2-04-D1528** (decision, senses) : Trois sens (arbitrage du périmètre du lot 24), un par emploi que la fiche établit : « une faible quantité », que l'exemple illustre (donnez-moi un peu d'eau) ; « un petit degré » ; « une courte durée ». Sens 1 : petite quantité, quantificateur ; sens 2 : sans catégorie, intensifieur ; sens 3 : temps › durée, type concept_abstrait, comme les adverbes de temps du lot 21, sans fonction. La fiche ne donne aucune particule : aucune pour les trois sens. Classe adverbe mécanique ; « ou nom » dit en nuance. — avant `["Un peu","Une petite quantité","Un court instant"]` → après `["S1 Une petite quantité, un peu","S2 Un peu (degré)","S3 Un court instant"]`
- **A2-04-D1529** (decision, sens 1 · linguistic_functions) : Sens 1, fonction quantificateur (A9, §3.4) : quantifie un référent désigné par un autre mot (l'eau) ; la petite quantité est dite par la catégorie. — avant `null` → après `{"grammatical":["quantificateur"],"pragmatic_discourse":[]}`
- **A2-04-D1530** (decision, sens 2 · linguistic_functions) : Sens 2, fonction intensifieur (A9, §3.6) : « un petit degré » modifie, en l'atténuant, le degré d'une propriété exprimée par un autre mot, sans la désigner. Sans catégorie : le rôle (quantifier, modifier un degré, comparer) n'a pas de domaine thématique (A9, §4.1) ; la fonction justifie l'absence (A5), sans décision categorie-nulle. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":["intensifieur"]}`
- **A2-04-D1531** (decision, sens 3 · linguistic_functions) : Sens 3, aucune fonction (arbitrage du périmètre du lot 24) : une courte durée n'est ni une quantification d'un référent ni une modification de degré ; la durée est dite par la catégorie temps › durée. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`
- **A2-04-D1532** (type-nul, sens 1 · semantic_type) : Aucun type : 少し, sens 1, applique une petite quantité au référent qu'il quantifie ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.
- **A2-04-D1533** (type-nul, sens 2 · semantic_type) : Aucun type : 少し, sens 2, modifie un degré ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.
- **A2-04-D1534** (decision, relations) : Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (report à la passe finale 5.16, comme aux lots 18 à 23). 少し / ちょっと : la fiche de 少し le dit « très proche d'usage » de ちょっと, « perçu comme un peu plus neutre ou écrit » : deux mots, de registres différents. Candidate explicite à l'audit des relations de 5.16 (registre A2-REL) ; aucune fusion. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 少し · すこし · sukoshi |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › quantite |
| sens | Un peu ; Une petite quantité ; Un court instant |
| nuance | **Adverbe** (ou nom) indiquant une faible quantité, un petit degré ou une courte durée, très proche d'usage de l'adverbe *chotto* mais perçu comme un peu plus neutre ou écrit. |
| particules |  |
| furigana | <ruby>少<rt>すこ</rt></ruby>し |
| exemple | みず を **<ruby>少<rt>すこ</rt></ruby>し** ください 。 — Donnez-moi **un peu** d'eau, s'il vous plaît. |

**Mécanique**

- word : `"少し"`
- readings : `[{"kana":"すこし","romaji":"sukoshi","furigana":"<ruby>少<rt>すこ</rt></ruby>し","default":true,"note":null}]`
- grammatical_class : `"adverbe"`
- group : `null`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Plus neutre ou écrit que ちょっと, très proche d'usage. La fiche le dit aussi nom."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Une petite quantité** (Un peu) | nombres_quantification › quantite › petite_quantite | **null** | grammatical : quantificateur | Une faible quantité : みずをすこしください (donnez-moi un peu d'eau, s'il vous plaît). |
| 2 | **Un peu** | **null** | **null** | pragmatic_discourse : intensifieur | Un petit degré. |
| 3 | **Un court instant** | temps › duree | concept_abstrait |  | Une courte durée. |

**Contexte (anciens exemples, lecture seule)**

- コーヒー に <ruby>砂糖<rt>さとう</rt></ruby> を <ruby>少<rt>すこ</rt></ruby>し <ruby>入<rt>い</rt></ruby>れます — Je mets **un peu** de sucre dans le café.
- ずいぶん <ruby>歩<rt>ある</rt></ruby>いて、<ruby>少<rt>すこ</rt></ruby>し <ruby>疲<rt>つか</rt></ruby>れました — J'ai beaucoup marché et je suis **un peu** fatigué.
- <ruby>日本語<rt>にほんご</rt></ruby> が <ruby>少<rt>すこ</rt></ruby>し <ruby>話<rt>はな</rt></ruby>せます — Je peux parler **un peu** japonais.

### n5_v_497 → v_497 · ちょっと

**Statut** : décision validée

- **A2-04-D1535** (decision, senses) : Deux sens (arbitrage du périmètre du lot 24) : « une faible quantité », que l'exemple illustre (je bois un peu de café) ; « un bref instant ». L'emploi comme « formule atténuante pour exprimer une hésitation ou un refus poli » reste en nuance, sans politesse ni sens propre. Sens 1 : petite quantité, quantificateur ; sens 2 : temps › durée, type concept_abstrait, sans fonction, comme 少し, sens 3. Classe adverbe mécanique. La fiche ne donne aucune particule : aucune pour les deux sens. — avant `["Un peu","Un instant","Un peu de","Euh... (hésitation)"]` → après `["S1 Un peu","S2 Un instant"]`
- **A2-04-D1536** (abandon, senses) : L'hésitation n'est pas un sens (arbitrage du périmètre du lot 24) : elle est dite en nuance, avec le refus poli, comme formule atténuante, ce que la fiche décrit (A9, §3.2, frontière 2 : un marqueur d'hésitation reste en nuance). La traduction de la source, « Euh… (hésitation) », y est conservée explicitement (arbitrage des choix du lot 24). — avant `["Euh... (hésitation)"]` → après `null`
- **A2-04-D1537** (decision, sens 1 · linguistic_functions) : Sens 1, fonction quantificateur (A9, §3.4) : quantifie un référent désigné par un autre mot (le café) ; la petite quantité est dite par la catégorie. — avant `null` → après `{"grammatical":["quantificateur"],"pragmatic_discourse":[]}`
- **A2-04-D1538** (decision, sens 2 · linguistic_functions) : Sens 2, aucune fonction (arbitrage du périmètre du lot 24) : un bref instant est une durée, dite par la catégorie temps › durée. Pas de politesse : le refus poli reste en nuance (arbitrage du périmètre du lot 24). — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`
- **A2-04-D1539** (type-nul, sens 1 · semantic_type) : Aucun type : ちょっと, sens 1, applique une petite quantité au référent qu'il quantifie ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.

| Champ source | Valeur |
|---|---|
| mot, lecture | ちょっと · ちょっと · chotto |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › quantite |
| sens | Un peu ; Un instant ; Un peu de ; Euh... (hésitation) |
| nuance | **Adverbe** très courant exprimant une faible quantité ou un bref instant, ou utilisé comme formule atténuante pour exprimer une hésitation ou un refus poli (« c'est un peu délicat... »). |
| particules |  |
| furigana | ちょっと |
| exemple | コーヒー を **ちょっと** のみ ます 。 — Je bois **un peu** de café. |

**Mécanique**

- word : `"ちょっと"`
- readings : `[{"kana":"ちょっと","romaji":"chotto","furigana":"ちょっと","default":true,"note":null}]`
- grammatical_class : `"adverbe"`
- group : `null`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Très courant. Sert aussi de formule atténuante, pour exprimer une hésitation (« Euh… », que la fiche donne en traduction) ou un refus poli (« c'est un peu délicat… »)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Un peu** (Un peu de) | nombres_quantification › quantite › petite_quantite | **null** | grammatical : quantificateur | Une faible quantité : コーヒーをちょっとのみます (je bois un peu de café). |
| 2 | **Un instant** | temps › duree | concept_abstrait |  | Un bref instant. |

**Contexte (anciens exemples, lecture seule)**

- コーヒー に <ruby>砂糖<rt>さとう</rt></ruby> を ちょっと <ruby>入<rt>い</rt></ruby>れます — Je mets **un peu** de sucre dans le café.
- <ruby>時間<rt>じかん</rt></ruby> が ちょっと ありません — Je n'ai pas **un peu** de temps / je n'ai pas le temps (un moment).
- 「すみません、ちょっと いいですか」「はい、いいですよ」 — « Excusez-moi, auriez-vous **un petit** instant ? » « Oui, bien sûr. »

### n5_v_498 → v_498 · とても

**Statut** : décision validée

- **A2-04-D1540** (decision, senses) : Un seul sens (arbitrage du périmètre du lot 24) : l'intensité, « placé devant les adjectifs ou les verbes pour accentuer un degré élevé », que l'exemple illustre (il fait très froid). L'emploi avec une négation (« impossible, pas du tout ») est dit en nuance. Classe adverbe mécanique. La fiche ne donne aucune particule. — avant `["Très","Extrêmement","Vraiment"]` → après `"un seul sens"`
- **A2-04-D1541** (decision, sens 1 · linguistic_functions) : Fonction intensifieur (A9, §3.6) : renforce le degré d'une propriété exprimée par un autre mot (froid), sans la désigner ; comme 大変, sens 1 « Très » (lot 00). Pas de negation (non définie, A9, §6 ; la négation est portée par le verbe). Sans catégorie : le rôle (quantifier, modifier un degré, comparer) n'a pas de domaine thématique (A9, §4.1) ; la fonction justifie l'absence (A5), sans décision categorie-nulle. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":["intensifieur"]}`
- **A2-04-D1542** (type-nul, sens 1 · semantic_type) : Aucun type : とても modifie un degré ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.

| Champ source | Valeur |
|---|---|
| mot, lecture | とても · とても · totemo |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › degre |
| sens | Très ; Extrêmement ; Vraiment |
| nuance | **Adverbe** d'intensité placé devant les adjectifs ou les verbes pour accentuer un degré élevé (utilisé également avec la négation pour signifier « impossible / pas du tout »). |
| particules |  |
| furigana | とても |
| exemple | きょう は **とても** さむい です 。 — Il fait **très** froid aujourd'hui. |

**Mécanique**

- word : `"とても"`
- readings : `[{"kana":"とても","romaji":"totemo","furigana":"とても","default":true,"note":null}]`
- grammatical_class : `"adverbe"`
- group : `null`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Adverbe d'intensité, placé devant les adjectifs ou les verbes pour accentuer un degré élevé : きょうはとてもさむいです (il fait très froid aujourd'hui). Avec une négation, il signifie « impossible, pas du tout »."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Très** (Extrêmement, Vraiment) | **null** | **null** | pragmatic_discourse : intensifieur |  |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>映画<rt>えいが</rt></ruby> は とても <ruby>面白<rt>おもしろ</rt></ruby>い です — Ce film est **très** intéressant.
- <ruby>昨日<rt>きのう</rt></ruby> は とても <ruby>疲<rt>つか</rt></ruby>れました — J'ai été **très** fatigué hier.
- <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> は とても <ruby>楽<rt>たの</rt></ruby>しい です — L'étude du japonais est **très** amusante.

### n5_v_515 → v_515 · あまり

**Statut** : décision validée

- **A2-04-D1543** (decision, senses) : Un seul sens (arbitrage du périmètre du lot 24) : « adverbe d'atténuation » qui, « employé systématiquement avec une structure verbale ou adjectivale négative », signifie « ne… pas tellement, pas trop » ; la construction négative est dite en nuance. La parenthèse de « Guère » est reprise en nuance. Classe adverbe mécanique. La fiche ne donne aucune particule. — avant `["Pas tellement","Pas beaucoup","Guère (toujours suivi d'une négation)"]` → après `"un seul sens"`
- **A2-04-D1544** (decision, sens 1 · linguistic_functions) : Fonction intensifieur (A9, §3.6) : atténue le degré de ce qu'exprime le verbe ou l'adjectif, sans le désigner ; A9 couvre l'atténuation. Pas de negation : la négation est portée par le verbe (D1387, D1390 ; A9, §3.6, frontière 3). Sans catégorie : le rôle (quantifier, modifier un degré, comparer) n'a pas de domaine thématique (A9, §4.1) ; la fonction justifie l'absence (A5), sans décision categorie-nulle. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":["intensifieur"]}`
- **A2-04-D1545** (type-nul, sens 1 · semantic_type) : Aucun type : あまり modifie un degré ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.
- **A2-04-D1546** (abandon, nuance) : Anomalie de la source, journalisée (arbitrage du périmètre du lot 24) : l'exemple japonais écrit « ににく » là où la traduction dit « viande ». Il n'est pas repris, et aucune correction n'est inventée ; sa traduction l'est, comme pour 他 (D1428). À signaler au registre de phrases. Les sources figées ne sont pas modifiées. — avant `"exemple de la source : « わたし は ににく を あまり たべません » (« Je ne mange pas tellement de viande. »)"` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | あまり · あまり · amari |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › quantite |
| sens | Pas tellement ; Pas beaucoup ; Guère (toujours suivi d'une négation) |
| nuance | **Adverbe** d'atténuation qui, employé systématiquement avec une structure verbale ou adjectivale négative, signifie « ne... pas tellement / pas trop ». |
| particules |  |
| furigana | あまり |
| exemple | わたし は ににく を **あまり** たべません 。 — Je ne mange **pas tellement** de viande. |

**Mécanique**

- word : `"あまり"`
- readings : `[{"kana":"あまり","romaji":"amari","furigana":"あまり","default":true,"note":null}]`
- grammatical_class : `"adverbe"`
- group : `null`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Adverbe d'atténuation, employé systématiquement avec une structure verbale ou adjectivale négative : « ne… pas tellement, pas trop » ; « guère », toujours suivi d'une négation. Je ne mange pas tellement de viande."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Pas tellement** (Pas beaucoup, Guère) | **null** | **null** | pragmatic_discourse : intensifieur |  |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>料理<rt>りょうり</rt></ruby> は あまり <ruby>辛<rt>から</rt></ruby>い ありません — Ce plat n'est **pas tellement** piquant.
- <ruby>私<rt>わたし</rt></ruby> は あまり <ruby>肉<rt>にく</rt></ruby> を <ruby>食<rt>た</rt></ruby>べません — Je ne mange **pas tellement** de viande.
- きょう は あまり <ruby>時間<rt>じかん</rt></ruby> が ありません — Je n'ai **pas tellement** de temps aujourd'hui.

### n5_v_471 → v_471 · 結構

**Statut** : décision validée

- **A2-04-D1547** (decision, senses) : Deux sens (arbitrage du périmètre du lot 24) : « une quantité ou un degré tout à fait satisfaisant », que l'exemple illustre (ce film est assez intéressant) ; « formule de politesse pour décliner une offre (c'est bon, merci) », que la fiche traduit à part. Classe adverbe mécanique ; « et adjectif en na » dit en nuance. La fiche ne donne aucune particule : aucune pour les deux sens. — avant `["Assez","Pas mal","Suffisamment","Non merci (pour refuser poliment)"]` → après `["S1 Assez","S2 Non merci"]`
- **A2-04-D1548** (decision, sens 1 · linguistic_functions) : Sens 1, fonction intensifieur (A9, §3.6 ; arbitrage du périmètre du lot 24) : modifie le degré d'une propriété exprimée par un autre mot (intéressant), sans la désigner. Sans catégorie : le rôle (quantifier, modifier un degré, comparer) n'a pas de domaine thématique (A9, §4.1) ; la fonction justifie l'absence (A5), sans décision categorie-nulle. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":["intensifieur"]}`
- **A2-04-D1549** (decision, sens 2 · linguistic_functions) : Sens 2, fonction politesse (A9, §3.3 ; arbitrage du périmètre du lot 24) : décliner une offre est un acte social conventionnel, accompli par la formule. Sans catégorie : le rôle (quantifier, modifier un degré, comparer) n'a pas de domaine thématique (A9, §4.1) ; la fonction justifie l'absence (A5), sans décision categorie-nulle. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":["politesse"]}`
- **A2-04-D1550** (type-nul, sens 1 · semantic_type) : Aucun type : 結構, sens 1, modifie un degré ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.
- **A2-04-D1551** (type-nul, sens 2 · semantic_type) : Aucun type : 結構, sens 2, accomplit un acte social ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.

| Champ source | Valeur |
|---|---|
| mot, lecture | 結構 · けっこう · kekkou |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › appreciation |
| sens | Assez ; Pas mal ; Suffisamment ; Non merci (pour refuser poliment) |
| nuance | **Adverbe** (et adjectif en na) exprimant qu'une quantité ou un degré est tout à fait satisfaisant, ou utilisé comme formule de politesse pour décliner une offre (« c'est bon, merci »). |
| particules |  |
| furigana | <ruby>結<rt>けっ</rt></ruby><ruby>構<rt>こう</rt></ruby> |
| exemple | この えいが は **<ruby>結<rt>けっ</rt></ruby><ruby>構<rt>こう</rt></ruby>** おもしろい です 。 — Ce film est **assez** intéressant. |

**Mécanique**

- word : `"結構"`
- readings : `[{"kana":"けっこう","romaji":"kekkou","furigana":"<ruby>結<rt>けっ</rt></ruby><ruby>構<rt>こう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"adverbe"`
- group : `null`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"La fiche le dit aussi adjectif en な."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Assez** (Pas mal, Suffisamment) | **null** | **null** | pragmatic_discourse : intensifieur | Un degré tout à fait satisfaisant : このえいがはけっこうおもしろいです (ce film est assez intéressant). |
| 2 | **Non merci** | **null** | **null** | pragmatic_discourse : politesse | Formule de politesse pour décliner une offre : « c'est bon, merci ». |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>料理<rt>りょうり</rt></ruby> は <ruby>結構<rt>けっこう</rt></ruby> <ruby>美味<rt>おい</rt></ruby>しい です — Ce plat est **assez** bon.
- <ruby>昨日<rt>きのう</rt></ruby> は <ruby>結構<rt>けっこう</rt></ruby> <ruby>歩<rt>ある</rt></ruby>きました — J'ai **pas mal** (assez) marché hier.
- 「もう <ruby>十分<rt>じゅうぶん</rt></ruby> ですか」「はい、<ruby>結構<rt>けっこう</rt></ruby> です」 — « C'est déjà suffisant ? » « Oui, c'est **bon** / ça suffit. »

### n5_v_607 → v_607 · もっと

**Statut** : décision validée

- **A2-04-D1552** (decision, senses) : Un seul sens : « l'intensification ou l'augmentation d'une action, d'une quantité ou d'une qualité par rapport au niveau actuel », que les trois traductions disent et que l'exemple illustre (je veux étudier davantage le japonais). Classe adverbe mécanique. La fiche ne donne aucune particule. — avant `["Plus","Davantage","Encore plus"]` → après `"un seul sens"`
- **A2-04-D1553** (decision, sens 1 · linguistic_functions) : Fonctions comparatif et intensifieur, en cumul (A9, §2.3 ; arbitrage du périmètre du lot 24) : le sens situe un degré par rapport à une référence, le niveau actuel (comparatif, A9 §3.5), et l'augmente (intensifieur, A9 §3.6) ; les deux rôles sont intégraux au même emploi, et la fiche dit les deux (« intensification ou augmentation… par rapport au niveau actuel »). Chacun est justifié ici. Sans catégorie : le rôle (quantifier, modifier un degré, comparer) n'a pas de domaine thématique (A9, §4.1) ; la fonction justifie l'absence (A5), sans décision categorie-nulle. — avant `null` → après `{"grammatical":["comparatif"],"pragmatic_discourse":["intensifieur"]}`
- **A2-04-D1554** (type-nul, sens 1 · semantic_type) : Aucun type : もっと situe et augmente un degré ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.

| Champ source | Valeur |
|---|---|
| mot, lecture | もっと · もっと · motto |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › degre |
| sens | Plus ; Davantage ; Encore plus |
| nuance | **Adverbe** exprimant l'intensification ou l'augmentation d'une action, d'une quantité ou d'une qualité par rapport au niveau actuel. |
| particules |  |
| furigana | もっと |
| exemple | **もっと** にほんご を べんきょう し たい です 。 — Je veux étudier le japonais **plus** (davantage). |

**Mécanique**

- word : `"もっと"`
- readings : `[{"kana":"もっと","romaji":"motto","furigana":"もっと","default":true,"note":null}]`
- grammatical_class : `"adverbe"`
- group : `null`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'intensification ou l'augmentation d'une action, d'une quantité ou d'une qualité, par rapport au niveau actuel : もっとにほんごをべんきょうしたいです (je veux étudier le japonais davantage)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Plus** (Davantage, Encore plus) | **null** | **null** | grammatical : comparatif ; pragmatic_discourse : intensifieur |  |

**Contexte (anciens exemples, lecture seule)**

- もっと <ruby>日本語<rt>にほんご</rt></ruby> を <ruby>話<rt>はな</rt></ruby>したい です — Je veux parler japonais **plus**.
- <ruby>料理<rt>りょうり</rt></ruby> が おいしい ですから、もっと <ruby>食<rt>た</rt></ruby>べます — Le plat est délicieux, alors j'en mange **plus**.
- <ruby>時間<rt>じかん</rt></ruby> が ありませんから、もっと <ruby>急<rt>いそ</rt></ruby>いで ください — Il n'y a plus de temps, alors dépêchez-vous **davantage** s'il vous plaît.

### n5_v_517 → v_517 · 一番

**Statut** : décision validée

- **A2-04-D1555** (decision, grammatical_class) : Classe adverbe : c'est la seule classe que la fiche nomme (« adverbe, composé de ichi et ban, suffixe de classement ») ; son exemple l'emploie devant le prédicat (いちばんすき). L'emploi du classement est dit par le sens 2. Groupe null : la classe n'a aucune valeur de groupe compatible (schema-A2-01, §6). La classe ne décide pas de la fonction, ni l'inverse (A9, §2.2). — avant `"adverbe (ancien type)"` → après `"adverbe"`
- **A2-04-D1556** (decision, senses) : Deux sens (arbitrage du périmètre du lot 24) : « marquer le superlatif absolu (le plus… de tous) », que l'exemple illustre (qu'aimez-vous le plus en japonais ?) ; « désigner la première position », un classement. « Le meilleur » rejoint le superlatif. Sens 2 : nombres et quantification › nombres › ordinaux, type concept_abstrait (une position dans un ordre), sans fonction. La fiche ne donne aucune particule : aucune pour les deux sens. — avant `["Le plus","Le meilleur","Numéro un","Premier"]` → après `["S1 Le plus, le meilleur","S2 Numéro un, premier"]`
- **A2-04-D1557** (decision, sens 1 · linguistic_functions) : Sens 1, fonction comparatif (A9, §3.5) : situe le degré par rapport à l'ensemble de tous les termes (superlatif). Sans catégorie : le rôle (quantifier, modifier un degré, comparer) n'a pas de domaine thématique (A9, §4.1) ; la fonction justifie l'absence (A5), sans décision categorie-nulle. — avant `null` → après `{"grammatical":["comparatif"],"pragmatic_discourse":[]}`
- **A2-04-D1558** (decision, sens 2 · linguistic_functions) : Sens 2, aucune fonction (arbitrage du périmètre du lot 24) : la première position dans une série est un classement, un ordinal, non une comparaison (A9, §3.5, frontière 3). — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`
- **A2-04-D1559** (type-nul, sens 1 · semantic_type) : Aucun type : 一番, sens 1, situe un degré ; le sens est son rôle, non une entité, une occurrence, une condition ou une abstraction désignée (A9, §4.2). concept_abstrait ne sert pas de type de secours (D1403), ni quantite_valeur pour un mot qui applique une quantité sans la désigner. Addendum A6.

| Champ source | Valeur |
|---|---|
| mot, lecture | 一番 · いちばん · ichiban |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › superlatif |
| sens | Le plus ; Le meilleur ; Numéro un ; Premier |
| nuance | **Adverbe** (composé de *ichi* (un) et *ban* (suffixe de classement)) servant à marquer le superlatif absolu (« le plus... » de tous) ou à désigner la première position. |
| particules |  |
| furigana | <ruby>一<rt>いち</rt></ruby><ruby>番<rt>ばん</rt></ruby> |
| exemple | にほんご の なかで なに が **<ruby>一<rt>いち</rt></ruby><ruby>番<rt>ばん</rt></ruby>** すき です か 。 — Qu'est-ce que vous aimez **le plus** en japonais ? |

**Mécanique**

- word : `"一番"`
- readings : `[{"kana":"いちばん","romaji":"ichiban","furigana":"<ruby>一<rt>いち</rt></ruby><ruby>番<rt>ばん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception

**Décision**

- grammatical_class : `"adverbe"`
- group : `null`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Composé de ichi (un) et de ban (suffixe de classement), selon la fiche."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Le plus** (Le meilleur) | **null** | **null** | grammatical : comparatif | Le superlatif absolu, « le plus… » de tous : にほんごのなかでなにがいちばんすきですか (qu'est-ce que vous aimez le plus en japonais ?). |
| 2 | **Numéro un** (Premier) | nombres_quantification › nombres › ordinaux | concept_abstrait |  | La première position dans un classement. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本<rt>にほん</rt></ruby> の <ruby>季節<rt>きせつ</rt></ruby> で、<ruby>春<rt>はる</rt></ruby> が いちばん <ruby>好き<rt>すき</rt></ruby> です — Des saisons du Japon, c'est le printemps que j'aime **le plus**.
- この <ruby>中<rt>なか</rt></ruby> で いちばん <ruby>大<rt>おお</rt></ruby>きい <ruby>動物<rt>どうぶつ</rt></ruby> は どれ ですか — Lequel est le plus grand animal parmi ceux-ci ?
- クラス で いちばん <ruby>日本語<rt>にほんご</rt></ruby> が <ruby>上手<rt>じょうず</rt></ruby> な <ruby>人<rt>ひと</rt></ruby> は <ruby>誰<rt>だれ</rt></ruby> ですか — Qui est la personne qui parle **le mieux** japonais dans la classe ?

### n5_v_496 → v_496 · ちょうど

**Statut** : décision validée

- **A2-04-D1560** (decision, senses) : Un seul sens : une mesure, une heure, une quantité ou une coïncidence qui « correspond parfaitement, sans excès ni manque », que les trois traductions disent et que l'exemple illustre (il est exactement dix heures). Type propriete, une caractéristique de ce qui correspond ; dimension exactitude (décision de dimension). Classe adverbe mécanique. La fiche ne donne aucune particule. — avant `["Exactement","Juste","Précisément"]` → après `"un seul sens"`
- **A2-04-D1561** (decision, sens 1 · dimensions) : Dimension exactitude (axe exactitude ↔ inexactitude d'A2-DIM ; arbitrage du périmètre du lot 24) : l'axe décrit directement le sens, une correspondance parfaite, sans excès ni manque (doctrine du lot 16 ; même axe que 違う, sens 2, lot 20). — avant `null` → après `[{"axis":"exactitude_inexactitude","pole":"exactitude"}]`
- **A2-04-D1562** (categorie-nulle, sens 1 · category) : L'exactitude d'une mesure, d'une heure, d'une quantité ou d'une coïncidence : la fiche couvre plusieurs domaines, et aucune catégorie ne les nomme tous ; la dimension porte le sens. Addendum A5.
- **A2-04-D1563** (decision, sens 1 · linguistic_functions) : Aucune fonction (arbitrage du périmètre du lot 24) : l'exactitude n'est ni une quantification, ni une modification de degré, ni une comparaison (A9, §4.3 : elle relève d'un axe d'A2-DIM). — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`

| Champ source | Valeur |
|---|---|
| mot, lecture | ちょうど · ちょうど · choudo |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › mesure |
| sens | Exactement ; Juste ; Précisément |
| nuance | **Adverbe** indiquant qu'une mesure, une heure, une quantité ou une coïncidence correspond parfaitement sans excès ni manque. |
| particules |  |
| furigana | ちょうど |
| exemple | いま **ちょうど** じゅうじ です 。 — Il est **exactement** dix heures maintenant. |

**Mécanique**

- word : `"ちょうど"`
- readings : `[{"kana":"ちょうど","romaji":"choudo","furigana":"ちょうど","default":true,"note":null}]`
- grammatical_class : `"adverbe"`
- group : `null`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Une mesure, une heure, une quantité ou une coïncidence qui correspond parfaitement, sans excès ni manque : いまちょうどじゅうじです (il est exactement dix heures maintenant)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Exactement** (Juste, Précisément) | **null** | propriete | exactitude_inexactitude : exactitude |  |

**Contexte (anciens exemples, lecture seule)**

- いま ちょうど <ruby>12時<rt>じゅうにじ</rt></ruby> です — Il est **exactement** midi maintenant.
- この <ruby>靴<rt>くつ</rt></ruby> の <ruby>サイズ<rt>さいず</rt></ruby> は ちょうど いい です — La taille de ces chaussures est **parfaite** (exactement ce qu'il faut).
- <ruby>駅<rt>えき</rt></ruby> に <ruby>着<rt>つ</rt></ruby>いたら、ちょうど <ruby>電車<rt>でんしゃ</rt></ruby> が <ruby>来<rt>き</rt></ruby>ました — Quand je suis arrivé à la gare, le train est arrivé **juste** à ce moment-là.

### n5_v_546 → v_546 · 大体

**Statut** : décision validée

- **A2-04-D1564** (decision, senses) : Deux sens (arbitrage du périmètre du lot 24) : « une approximation », « grosso modo, à peu près », que l'exemple illustre (le travail est à peu près terminé) ; « une règle générale », très proche de たいてい (lot 21). Sens 1 : nombres et quantification › approximation quantitative, type propriete ; sens 2 : temps › fréquence › fréquent, type concept_abstrait, comme たいてい. Sans fonction (aucune des fonctions définies). Classe adverbe mécanique ; « et nom » dit en nuance. La fiche ne donne aucune particule : aucune pour les deux sens. — avant `["En général","À peu près","Généralement","Presque (la plupart du temps)"]` → après `["S1 À peu près","S2 En général, généralement"]`
- **A2-04-D1565** (abandon, senses) : Traduction ambiguë, non reprise : « presque » irait au sens 1 (l'approximation), mais sa glose (« la plupart du temps ») le rattache au sens 2, que « généralement » dit déjà. Elle est signalée en nuance. — avant `["Presque (la plupart du temps)"]` → après `null`
- **A2-04-D1566** (decision, sens 1 · linguistic_functions) : Sens 1, aucune fonction : l'approximation n'est ni une quantification d'un référent, ni une modification de degré, ni une comparaison (A9) ; elle est dite par la catégorie approximation quantitative. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`
- **A2-04-D1567** (decision, sens 2 · linguistic_functions) : Sens 2, aucune fonction : la généralité (« en général ») n'est aucune des fonctions définies par A9 ; elle est dite par la catégorie temps › fréquence, comme pour たいてい (lot 21), validée sans fonction. — avant `null` → après `{"grammatical":[],"pragmatic_discourse":[]}`
- **A2-04-D1568** (decision, sens 1 · dimensions) : Dimension imprécision (axe précision ↔ imprécision / ambiguïté d'A2-DIM ; arbitrage des choix du lot 24) : la fiche dit « une approximation », « grosso modo / à peu près », « sans entrer dans les détails précis » ; l'axe décrit directement le sens (doctrine du lot 16). La catégorie approximation quantitative et le type propriete sont conservés. — avant `null` → après `[{"axis":"precision_imprecision_ambiguite","pole":"imprecision_ambiguite"}]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 大体 · だいたい · daitai |
| type, group | adverbe · adverbe |
| catégorie (ancienne, indicative) | adverbes_expressions › approximation |
| sens | En général ; À peu près ; Généralement ; Presque (la plupart du temps) |
| nuance | **Adverbe** (et nom) indiquant une approximation ou une règle générale sans entrer dans les détails précis (très proche de *taitei*, mais s'emploie aussi pour signifier « grosso modo / à peu près »). |
| particules |  |
| furigana | <ruby>大<rt>だい</rt></ruby><ruby>体<rt>たい</rt></ruby> |
| exemple | しごと は **<ruby>大<rt>だい</rt></ruby><ruby>体<rt>たい</rt></ruby>** おわり まし た 。 — Le travail est **à peu près** terminé. |

**Mécanique**

- word : `"大体"`
- readings : `[{"kana":"だいたい","romaji":"daitai","furigana":"<ruby>大<rt>だい</rt></ruby><ruby>体<rt>たい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"adverbe"`
- group : `null`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Très proche de たいてい, selon la fiche. La fiche le dit aussi nom, et donne « presque (la plupart du temps) »."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **À peu près** | nombres_quantification › approximation_quantitative | propriete | precision_imprecision_ambiguite : imprecision_ambiguite | Une approximation, grosso modo, sans entrer dans les détails : しごとはだいたいおわりました (le travail est à peu près terminé). |
| 2 | **En général** (Généralement) | temps › frequence › frequent | concept_abstrait |  | Une règle générale. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby>、<ruby>大体<rt>だいたい</rt></ruby> 7<ruby>時<rt>じ</rt></ruby> に <ruby>起<rt>お</rt></ruby>きます — Je me lève **en général** vers 7 heures tous les jours.
- この <ruby>仕事<rt>しごと</rt></ruby> は <ruby>大体<rt>だいたい</rt></ruby> <ruby>終<rt>お</rt></ruby>わりました — Ce travail est **généralement** (**presque**) terminé.
- <ruby>駅<rt>えき</rt></ruby> から ここ まで <ruby>大体<rt>だいたい</rt></ruby> 10<ruby>分<rt>ぷん</rt></ruby> かかります — Il faut **en gros** (**environ**) 10 minutes d'ici à la gare.
