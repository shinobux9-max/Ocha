# Lot lot-10 · Position, direction et orientation

Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.

## Autres entrées

### n5_v_43 → v_43 · 隣

**Statut** : décision validée

- **A2-04-D0592** (decision, senses) : Un seul concept documenté (« l'emplacement directement à côté ou voisin ») : le voisin et la maison d'à côté en sont des emplois avec の, repris dans la nuance. — avant `["À côté","Voisin","Maison d'à côté"]` → après `"un seul sens"`
- **A2-04-D0593** (abandon, senses) : Emplois repris dans la nuance. — avant `["Voisin","Maison d'à côté"]` → après `null`
- **A2-04-D0594** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare ; même 隣の駅 (la station voisine) reste un emploi général (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 隣 · となり · tonari |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | À côté ; Voisin ; Maison d'à côté |
| nuance | Nom indiquant l'emplacement directement à côté ou voisin (souvent utilisé avec la particule の (no) pour qualifier un objet, une personne ou un lieu). |
| particules | に |
| furigana | <ruby>隣<rt>となり</rt></ruby> |
| exemple | <ruby>私<rt>わたし</rt></ruby> の <ruby>家<rt>いえ</rt></ruby> の <ruby>隣<rt>となり</rt></ruby> に スーパー が あります 。 — Il y a un supermarché **à côté** de chez moi. |

**Mécanique**

- word : `"隣"`
- readings : `[{"kana":"となり","romaji":"tonari","furigana":"<ruby>隣<rt>となり</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'emplacement immédiatement voisin : 隣の人, le voisin ; 隣の家, la maison d'à côté ; 隣の席, la place d'à côté."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **À côté** | espace_proprietes_spatiales › distance_proximite › proximite | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>私<rt>わたし</rt></ruby> の <ruby>家<rt>いえ</rt></ruby> の <ruby>隣<rt>となり</rt></ruby> に スーパー が あります — Il y a un supermarché **à côté** de ma maison.
- <ruby>授業<rt>じゅぎょう</rt></ruby><ruby>中<rt>ちゅう</rt></ruby>、<ruby>隣<rt>となり</rt></ruby> の <ruby>人<rt>ひと</rt></ruby> と おしゃべり を しない で ください — Pendant le cours, veuillez ne pas discuter avec la personne **à côté**.
- <ruby>彼<rt>かれ</rt></ruby> は <ruby>私<rt>わたし</rt></ruby> の <ruby>隣<rt>となり</rt></ruby> の <ruby>席<rt>せき</rt></ruby> に <ruby>座<rt>すわ</rt></ruby>りました — Il s'est assis à la place **à côté** de la mienne.

### n5_v_341 → v_341 · そば

**Statut** : décision validée

- **A2-04-D0595** (decision, writings) : 側, documentée par la nuance de la source, est la graphie en kanji de そば : variante kana / kanji. Rien n'est repris de l'homophone 蕎麦. — avant `null` → après `["側"]`
- **A2-04-D0596** (abandon, senses) : Nom abstrait, pas équivalent. — avant `["Proximité"]` → après `null`
- **A2-04-D0597** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | そば · そば · soba |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | À côté ; Près ; Proximité |
| nuance | **Nom** de position désignant l'espace situé tout près ou à côté de quelqu'un ou de quelque chose (souvent utilisé avec la particule *no* ou *ni* : <ruby>側<rt>そば</rt></ruby>). Les romajis associés sont (*soba*). |
| particules |  |
| furigana | そば |
| exemple | いえ の **そば** に こうえん が あります 。 — Il y a un parc **à côté** de la maison. |

**Mécanique**

- word : `"そば"`
- readings : `[{"kana":"そば","romaji":"soba","furigana":"そば","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[{"form":"側","furigana":"<ruby>側<rt>そば</rt></ruby>"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Tout près de quelqu'un ou de quelque chose : 駅のそば. Homophone : 蕎麦 (les nouilles soba), un autre mot."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Près** (À côté) | espace_proprietes_spatiales › distance_proximite › proximite | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>家<rt>いえ</rt></ruby> の <ruby>そば<rt>そば</rt></ruby> に 大きな 公園 が ある ので、よく 散歩 を します — Comme il y a un grand parc **à côté** de la maison, je me promène souvent.
- <ruby>駅<rt>えき</rt></ruby> の <ruby>そば<rt>そば</rt></ruby> に 便利な スーパー が オープン しました — Un supermarché pratique a ouvert **à côté** de la gare.
- ベッド の <ruby>そば<rt>そば</rt></ruby> に <ruby>目覚<rt>めざ</rt></ruby>まし時計 を 置いて 眠ります — Je place mon réveil **à côté** du lit pour dormir.

### n5_v_345 → v_345 · 上

**Statut** : décision validée

- **A2-04-D0575** (decision, senses) : Un seul sens : la nuance de la source ne décrit que la position (le dessus, au-dessus). — avant `["Au-dessus","Dessus","Sur","Supérieur"]` → après `"un seul sens"`
- **A2-04-D0576** (abandon, senses) : « Sur » est une traduction de construction (〜の上に) ; « supérieur » (rang) n'est pas documenté par la nuance. — avant `["Sur","Supérieur"]` → après `null`
- **A2-04-D0577** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 上 · うえ · ue |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Au-dessus ; Dessus ; Sur ; Supérieur |
| nuance | **Nom** de position désignant la partie supérieure, le dessus d'un objet ou la position au-dessus (souvent utilisé avec la particule *no* pour marquer la localisation : <ruby>上<rt>うえ</rt></ruby>). Les romajis associés sont (*ue*). |
| particules |  |
| furigana | <ruby>上<rt>うえ</rt></ruby> |
| exemple | つくえ の **<ruby>上<rt>うえ</rt></ruby>** に ほん が あります 。 — Il y a un livre **sur** le bureau. |

**Mécanique**

- word : `"上"`
- readings : `[{"kana":"うえ","romaji":"ue","furigana":"<ruby>上<rt>うえ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Avec の et に : 机の上に, sur le bureau."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Dessus** (Au-dessus) | espace_proprietes_spatiales › position_localisation › dessus_dessous | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に <ruby>大切<rt>たいせつ</rt></ruby> な <ruby>書類<rt>しょるい</rt></ruby> と ペン が 置いて あります — Des documents importants et un stylo sont posés **sur** le bureau.
- カレンダー は <ruby>壁<rt>かべ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> に かけて あります — Le calendrier est accroché **au-dessus** sur le mur.
- <ruby>寒<rt>さむ</rt></ruby>い ので、コート の <ruby>上<rt>うえ</rt></ruby> から さらに マフラー を 巻きました — Comme il fait froid, j'ai en plus enroulé une écharpe **par-dessus** mon manteau.

### n5_v_346 → v_346 · 中

**Statut** : décision validée

- **A2-04-D0581** (abandon, senses) : « Dans » est une traduction de construction ; « au milieu » (真ん中) n'est pas documenté par la nuance. Aucun sens n'est repris du suffixe 〜中. — avant `["Dans","Au milieu"]` → après `null`
- **A2-04-D0582** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 中 · なか · naka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Intérieur ; Dans ; Au milieu |
| nuance | **Nom** de position désignant l'espace intérieur d'un objet, d'un lieu ou d'un contenant (utilisé fréquemment avec *no* et la particule de lieu *ni* : <ruby>中<rt>なか</rt></ruby>). Les romajis associés sont (*naka*). |
| particules |  |
| furigana | <ruby>中<rt>なか</rt></ruby> |
| exemple | 1しゅうかん の **<ruby>中<rt>なか</rt></ruby>** で にちようび が いちばん すき です 。 — **Dans** la semaine, c'est le dimanche que je préfère. |

**Mécanique**

- word : `"中"`
- readings : `[{"kana":"なか","romaji":"naka","furigana":"<ruby>中<rt>なか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Avec の et に : 箱の中に, dans la boîte. Lu ちゅう ou じゅう, 〜中 est un suffixe, une autre unité."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Intérieur** (Dedans) | espace_proprietes_spatiales › position_localisation › interieur_exterieur | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>箱<rt>はこ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に は かわいい おもちゃ や ぬいぐるみ が 入っています — À l'**intérieur** de la boîte, il y a de jolies peluches et jouets.
- <ruby>部屋<rt>へや</rt></ruby> の <ruby>中<rt>なか</rt></ruby> は エアコン が 効いていて とても 涼しい です — Il fait très frais à l'**intérieur** de la pièce grâce à la climatisation.
- <ruby>財布<rt>さいふ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> を <ruby>確認<rt>かくにん</rt></ruby> したら、お金 が あまり 残っていませんでした — En vérifiant à l'**intérieur** de mon portefeuille, il ne restait plus beaucoup d'argent.

### n5_v_347 → v_347 · 先

**Statut** : décision validée

- **A2-04-D0623** (decision, senses) : Deux sens documentés par la nuance (« l'avant… l'extrémité d'une chose » ; « le futur proche, une priorité dans l'ordre chronologique ») : un point dans l'espace et l'antériorité ou la priorité dans l'ordre (先に, d'abord, avant les autres), comme 前. Libellé du sens 2 précisé (révision 5.11b) : « auparavant » évoquait un moment passé ; la mention du futur va dans la nuance générale, sans troisième sens. — avant `["D'abord","Avant","En avant","Bout","Extrémité"]` → après `["S1 Avant, bout (espace)","S2 D'abord, avant (temps)"]`
- **A2-04-D0624** (decision, grammatical_class) : Classe nom : la source l'étiquette « adverbe », mais tous ses emplois documentés sont ceux d'un nom (先に, この先, l'extrémité). L'emploi adverbial passe par la particule に (先に). — avant `"adverbe / temps (ancien type)"` → après `"nom"`
- **A2-04-D0625** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 先 · さき · saki |
| type, group | adverbe · temps |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | D'abord ; Avant ; En avant ; Bout ; Extrémité |
| nuance | **Adverbe** désignant l'avant, le futur proche, une priorité dans l'ordre chronologique ou l'extrémité d'une chose. Les romajis associés sont (*saki*). |
| particules |  |
| furigana | <ruby>先<rt>さき</rt></ruby> |
| exemple | **<ruby>先<rt>さき</rt></ruby>** に しつれい します 。 — Je m'excuse de partir **avant** (je vous devance). |

**Mécanique**

- word : `"先"`
- readings : `[{"kana":"さき","romaji":"saki","furigana":"<ruby>先<rt>さき</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Ce qui est devant : dans l'espace (plus loin, le bout) ou dans l'ordre du temps (ce qui passe en premier, ce qui est à venir)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Avant (plus loin)** (Bout, Extrémité) | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu |  | この先 : plus loin ; ペンの先 : la pointe du stylo. |
| 2 | **D'abord** (Avant) | temps › chronologie › avant_apres | concept_abstrait |  | 先に : d'abord, avant les autres ; お先に : je vous précède. |

**Contexte (anciens exemples, lecture seule)**

- レストラン に 入る <ruby>前<rt>まえ</rt></ruby> に、<ruby>先<rt>さき</rt></ruby> に メニュー を <ruby>決<rt>き</rt></ruby>めておきましょう — Avant d'entrer au restaurant, décidons du menu **d'abord**.
- お<ruby>先<rt>さき</rt></ruby> に <ruby>失礼<rt>しつれい</rt></ruby> します。また <ruby>明日<rt>あした</rt></ruby> お<ruby>会<rt>あ</rt></ruby>いしましょう — Je pars **avant** vous (je vous prie de m'excuser de partir le premier). À demain.
- <ruby>仕事<rt>しごと</rt></ruby> が たくさん ある ので、<ruby>先<rt>さき</rt></ruby> に <ruby>重要<rt>じゅうよう</rt></ruby> な もの から <ruby>片付<rt>かたづ</rt></ruby>けます — Comme il y a beaucoup de travail, je règle **d'abord** les choses importantes.

### n5_v_348 → v_348 · 前

**Statut** : décision validée

- **A2-04-D0585** (decision, senses) : Deux sens documentés par la nuance de la source (« l'espace situé en face… ou un moment antérieur dans le temps ») : une position et un moment, deux référents, deux catégories, deux types. — avant `["Devant","Avant","En face de"]` → après `["S1 Devant (espace)","S2 Avant (temps)"]`
- **A2-04-D0586** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 前 · まえ · mae |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Devant ; Avant ; En face de |
| nuance | **Nom** de position désignant l'espace situé en face de quelqu'un ou de quelque chose, ou un moment antérieur dans le temps. Les romajis associés sont (*mae*). |
| particules |  |
| furigana | <ruby>前<rt>まえ</rt></ruby> |
| exemple | えき の **<ruby>前<rt>まえ</rt></ruby>** で まって います 。 — J'attends **devant** la gare. |

**Mécanique**

- word : `"前"`
- readings : `[{"kana":"まえ","romaji":"mae","furigana":"<ruby>前<rt>まえ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Devant** (En face) | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu |  | 駅の前 : devant la gare. |
| 2 | **Avant (dans le temps)** (Auparavant) | temps › chronologie › avant_apres | concept_abstrait |  | 三年前 : il y a trois ans ; 食べる前に : avant de manger. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>駅<rt>えき</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> で <ruby>友達<rt>ともだち</rt></ruby> と <ruby>待ち合わせ<rt>まちあわせ</rt></ruby> を しています — Je donne rendez-vous à un ami **devant** la gare.
- <ruby>映画<rt>えいが</rt></ruby> が <ruby>始<rt>はじ</rt></ruby>まる <ruby>前<rt>まえ</rt></ruby> に、ポップコーン と お<ruby>茶<rt>ちゃ</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました — J'ai acheté du pop-corn et du thé **avant** que le film ne commence.
- <ruby>車<rt>くるま</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> に <ruby>小<rt>ちい</rt></ruby>さな <ruby>猫<rt>ねこ</rt></ruby> が いる ので、ゆっくり <ruby>出発<rt>しゅっぱつ</rt></ruby> します — Comme il y a un petit chat **devant** la voiture, je pars doucement.

### n5_v_349 → v_349 · 北

**Statut** : décision validée

- **A2-04-D0618** (abandon, senses) : Redondant. — avant `["Direction du nord"]` → après `null`
- **A2-04-D0619** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : les noms de sorties (東口, 西口, 南口, 北口) montrent qu'un point cardinal qualifie une sortie, sans rendre le point cardinal propre à la gare : il structure aussi les villes, les routes, les cartes, les régions (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0620** (decision, sens 1 · semantic_type) : Un point cardinal est une direction, ni un lieu ni un objet : concept non matériel qui ne relève pas plus précisément d'un autre type (A2-ST-v1). Vaut pour 東, 西, 南, 北. — avant `null` → après `"concept_abstrait"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 北 · きた · kita |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › orientation |
| sens | Nord ; Direction du nord |
| nuance | **Nom** de direction désignant le point cardinal nord. Les romajis associés sont (*kita*). |
| particules |  |
| furigana | <ruby>北<rt>きた</rt></ruby> |
| exemple | はっかいどう は とうきょう の **<ruby>北<rt>きた</rt></ruby>** に あります 。 — Hokkaido est au **nord** de Tokyo. |

**Mécanique**

- word : `"北"`
- readings : `[{"kana":"きた","romaji":"kita","furigana":"<ruby>北<rt>きた</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Exemple : 北口, la sortie nord."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Nord** | espace_proprietes_spatiales › direction_orientation › directions_cardinales | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本<rt>にほん</rt></ruby> の <ruby>北<rt>きた</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> に ある <ruby>北海道<rt>ほっかいどう</rt></ruby> は、<ruby>冬<rt>ふゆ</rt></ruby> になると たくさん <ruby>雪<rt>ゆき</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>ります — Hokkaidô, situé vers le **nord** du Japon, reçoit beaucoup de neige en hiver.
- <ruby>毎朝<rt>まいあさ</rt></ruby> <ruby>北<rt>きた</rt></ruby> の <ruby>方向<rt>ほうこう</rt></ruby> に <ruby>向<rt>む</rt></ruby>かって <ruby>散歩<rt>さんぽ</rt></ruby> を する の が <ruby>日課<rt>にっか</rt></ruby> です — C'est ma routine de faire une promenade en direction du **nord** chaque matin.
- <ruby>窓<rt>まど</rt></ruby> を <ruby>北<rt>きた</rt></ruby> に <ruby>向<rt>む</rt></ruby>けて 開けると、<ruby>涼<rt>すず</rt></ruby>しい 風 が 入ってきます — Si l'on ouvre la fenêtre orientée vers le **nord**, un vent frais entre.

### n5_v_350 → v_350 · 南

**Statut** : décision validée

- **A2-04-D0616** (abandon, senses) : Redondant. — avant `["Direction du sud"]` → après `null`
- **A2-04-D0617** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : les noms de sorties (東口, 西口, 南口, 北口) montrent qu'un point cardinal qualifie une sortie, sans rendre le point cardinal propre à la gare : il structure aussi les villes, les routes, les cartes, les régions (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0620** (decision, sens 1 · semantic_type) : Un point cardinal est une direction, ni un lieu ni un objet : concept non matériel qui ne relève pas plus précisément d'un autre type (A2-ST-v1). Vaut pour 東, 西, 南, 北. — avant `null` → après `"concept_abstrait"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 南 · みなみ · minami |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › orientation |
| sens | Sud ; Direction du sud |
| nuance | **Nom** de direction désignant le point cardinal sud. Les romajis associés sont (*minami*). |
| particules |  |
| furigana | <ruby>南<rt>みなみ</rt></ruby> |
| exemple | おきなわ は 日本 の **<ruby>南<rt>みなみ</rt></ruby>** に あります 。 — Okinawa est au **sud** du Japon. |

**Mécanique**

- word : `"南"`
- readings : `[{"kana":"みなみ","romaji":"minami","furigana":"<ruby>南<rt>みなみ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Exemple : 南口, la sortie sud."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sud** | espace_proprietes_spatiales › direction_orientation › directions_cardinales | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本<rt>にほん</rt></ruby> の <ruby>南<rt>みなみ</rt></ruby> に ある <ruby>沖縄<rt>おきなわ</rt></ruby> は、1 <ruby>年<rt>ねん</rt></thought></ruby> 中 暖かくて <ruby>海<rt>うみ</rt></ruby> が とても 綺麗 です — Okinawa, situé au **sud** du Japon, est chaud toute l'année et la mer y est très belle.
- この <ruby>家<rt>いえ</rt></ruby> は <ruby>南<rt>みなみ</rt></ruby> に <ruby>向<rt>む</rt></ruby>いて 建って いる ので、<ruby>部屋<rt>へや</rt></ruby> に たくさん <ruby>日光<rt>にっこう</rt></ruby> が 入ります — Cette maison est orientée vers le **sud**, donc beaucoup de lumière du soleil entre dans la pièce.
- <ruby>冬<rt>ふゆ</rt></ruby> になると、<ruby>寒<rt>さむ</rt></ruby>い <ruby>地域<rt>ちいき</rt></ruby> から <ruby>南<rt>みなみ</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> へ <ruby>移動<rt>いどう</rt></ruby> する <ruby>鳥<rt>とり</rt></ruby> が います — À l'approche de l'hiver, certains oiseaux migrent des régions froides vers le **sud**.

### n5_v_351 → v_351 · 右

**Statut** : décision validée

- **A2-04-D0610** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare ; indiquer la droite vaut pour toute orientation (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 右 · みぎ · migi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › directions |
| sens | Droite ; Côté droit |
| nuance | **Nom** de position ou de direction désignant le côté droit par rapport à un point de repère. Les romajis associés sont (*migi*). |
| particules |  |
| furigana | <ruby>右<rt>みぎ</rt></ruby> |
| exemple | こうさてん を **<ruby>右<rt>みぎ</rt></ruby>** へ まがって ください 。 — Veuillez tourner à **droite** au carrefour. |

**Mécanique**

- word : `"右"`
- readings : `[{"kana":"みぎ","romaji":"migi","furigana":"<ruby>右<rt>みぎ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"右に曲がる : tourner à droite."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Droite** (Côté droit) | espace_proprietes_spatiales › direction_orientation › gauche_droite | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- つき の <ruby>角<rt>かど</rt></ruby> を <ruby>右<rt>みぎ</rt></ruby> に <ruby>曲<rt>ま</rt></ruby>がると、<ruby>目的<rt>もくてき</rt></ruby> の <ruby>駅<rt>えき</rt></ruby> が あります — En tournant à **droite** au coin suivant, il y a la gare recherchée.
- <ruby>横断歩道<rt>おうだんほどう</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>る <ruby>前<rt>まえ</rt></ruby> に、<ruby>左<rt>ひだり</rt></ruby> と <ruby>右<rt>みぎ</rt></ruby> を よく <ruby>確認<rt>かくにん</rt></ruby> してください — Avant de traverser le passage piéton, veuillez bien vérifier à **gauche** et à **droite**.
- <ruby>書類<rt>しょるい</rt></ruby> に <ruby>名前<rt>なまえ</rt></ruby> を <ruby>書<rt>か</rt></ruby>く とき は、<ruby>右<rt>みぎ</rt></ruby> の <ruby>欄<rt>らん</rt></ruby> に お<ruby>願<rt>ねが</rt></ruby>い します — Lorsque vous écrivez votre nom sur le document, veuillez le faire dans la colonne de **droite**.

### n5_v_352 → v_352 · 外

**Statut** : décision validée

- **A2-04-D0583** (abandon, senses) : Redondant. — avant `["À l'extérieur"]` → après `null`
- **A2-04-D0584** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 外 · そと · soto |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Extérieur ; Dehors ; À l'extérieur |
| nuance | **Nom** de position désignant l'espace extérieur, par opposition à l'intérieur d'un bâtiment ou d'un lieu clos (souvent utilisé avec la particule *de* ou *ni* : <ruby>外<rt>そと</rt></ruby>). Les romajis associés sont (*soto*). |
| particules |  |
| furigana | <ruby>外<rt>そと</rt></ruby> |
| exemple | きょう は **<ruby>外<rt>そと</rt></ruby>** が さむい です 。 — Il fait froid **dehors** aujourd'hui. |

**Mécanique**

- word : `"外"`
- readings : `[{"kana":"そと","romaji":"soto","furigana":"<ruby>外<rt>そと</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Par opposition à l'intérieur (中) : 外で遊ぶ, jouer dehors."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Extérieur** (Dehors) | espace_proprietes_spatiales › position_localisation › interieur_exterieur | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>雨<rt>あめ</rt></ruby> が <ruby>止<rt>と</rt></ruby>んだ ので、<ruby>子供<rt>こども</rt></ruby> たち は <ruby>外<rt>そと</rt></ruby> で <ruby>元気<rt>げんき</rt></ruby> よく <ruby>遊<rt>あそ</rt></ruby>んでいます — Comme la pluie s'est arrêtée, les enfants jouent joyeusement **dehors**.
- <ruby>部屋<rt>へや</rt></ruby> の <ruby>中<rt>なか</rt></ruby> が <ruby>暑<rt>あつ</rt></ruby>かった ので、ちょっと <ruby>外<rt>そと</rt></ruby> の <ruby>空気<rt>くうき</rt></ruby> を 吸い に 出ました — Comme il faisait chaud à l'intérieur de la pièce, je suis sorti un moment pour respirer l'air de **dehors**.
- <ruby>靴<rt>くつ</rt></ruby> を <ruby>履<rt>は</rt></ruby>き<ruby>替<rt>か</rt></ruby>えて、<ruby>今<rt>いま</rt></ruby> から <ruby>外<rt>そと</rt></ruby> へ ジョギング に 出発 します — Je change de chaussures et je pars maintenant **dehors** pour faire du jogging.

### n5_v_353 → v_353 · 左

**Statut** : décision validée

- **A2-04-D0611** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare ; indiquer la gauche vaut pour toute orientation (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 左 · ひだり · hidari |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › directions |
| sens | Gauche ; Côté gauche |
| nuance | **Nom** de position ou de direction désignant le côté gauche par rapport à un point de repère. Les romajis associés sont (*hidari*). |
| particules |  |
| furigana | <ruby>左<rt>ひだり</rt></ruby> |
| exemple | ぎんこう は **<ruby>左<rt>ひだり</rt></ruby>** に あります 。 — La banque est sur la **gauche**. |

**Mécanique**

- word : `"左"`
- readings : `[{"kana":"ひだり","romaji":"hidari","furigana":"<ruby>左<rt>ひだり</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"左に曲がる : tourner à gauche."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Gauche** (Côté gauche) | espace_proprietes_spatiales › direction_orientation › gauche_droite | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>次<rt>つぎ</rt></ruby> の <ruby>信号<rt>しんごう</rt></ruby> を <ruby>左<rt>ひだり</rt></ruby> に <ruby>曲<rt>ま</rt></ruby>がると、<ruby>左側<rt>ひだりがわ</rt></ruby> に <ruby>郵便局<rt>ゆうびんきょく</rt></ruby> が あります — En tournant à **gauche** au prochain feu tricolore, il y a un bureau de poste sur le côté gauche.
- ノート の <ruby>左側<rt>ひだりがわ</rt></ruby> の <ruby>余白<rt>よはく</rt></ruby> に、<ruby>大切<rt>たいせつ</rt></ruby> な メモ を <ruby>書<rt>か</rt></ruby>き<ruby>込<rt>こ</rt></ruby>みます — J'écris des mémos importants dans la marge du côté **gauche** du carnet.
- エスカレーター を <ruby>利用<rt>りよう</rt></ruby> する とき は、<ruby>左<rt>ひだり</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> に 立って お待ち ください — Lorsque vous utilisez l'escalator, veuillez vous tenir du côté **gauche**.

### n5_v_354 → v_354 · 後ろ

**Statut** : décision validée

- **A2-04-D0587** (abandon, senses) : Non documenté par la nuance (qui décrit l'espace à l'arrière) ; le dos se dit 背 (lot 01). — avant `["Dos"]` → après `null`
- **A2-04-D0588** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 後ろ · うしろ · ushiro |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Derrière ; Arrière ; Dos |
| nuance | **Nom** de position désignant l'espace situé à l'arrière de quelqu'un ou de quelque chose (souvent utilisé avec la particule *no* pour marquer la localisation : <ruby>後<rt>うし</rt></ruby>ろ). Les romajis associés sont (*ushiro*). |
| particules |  |
| furigana | <ruby>後<rt>うし</rt></ruby>ろ |
| exemple | くるま の **<ruby>後<rt>うし</rt></ruby>ろ** に ねこ が います 。 — Il y a un chat **derrière** la voiture. |

**Mécanique**

- word : `"後ろ"`
- readings : `[{"kana":"うしろ","romaji":"ushiro","furigana":"<ruby>後<rt>うし</rt></ruby>ろ","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Avec の : 家の後ろ, derrière la maison."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Derrière** (Arrière) | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>家<rt>いえ</rt></ruby> の <ruby>後ろ<rt>うしろ</rt></ruby> に は、<ruby>緑<rt>みどり</rt></ruby> が たくさん ある <ruby>静<rt>しず</rt></ruby>かな <ruby>山<rt>やま</rt></ruby> が あります — **Derrière** la maison, il y a une montagne calme avec beaucoup de verdure.
- <ruby>黒板<rt>こくばん</rt></ruby> の <ruby>字<rt>じ</rt></ruby> が 見えにくい ので、<ruby>教室<rt>きょうしつ</rt></ruby> の <ruby>後ろ<rt>うしろ</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> から <ruby>前<rt>まえ</rt></ruby> の <ruby>席<rt>せき</rt></ruby> に <ruby>移動<rt>いどう</rt></ruby> しました — Comme il était difficile de voir les caractères au tableau, je suis passé d'une place **derrière** dans la classe à une place devant.
- <ruby>写真<rt>しゃしん</rt></ruby> を <ruby>撮<rt>と</rt></ruby>る とき は、<ruby>建物<rt>たてもの</rt></ruby> の <ruby>後ろ<rt>うしろ</rt></ruby> に <ruby>立<rt>た</rt></ruby>って ください — Lorsque vous prenez une photo, veuillez vous placer **derrière** le bâtiment.

### n5_v_355 → v_355 · 東

**Statut** : décision validée

- **A2-04-D0612** (abandon, senses) : Redondant. — avant `["Direction de l'est"]` → après `null`
- **A2-04-D0613** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : les noms de sorties (東口, 西口, 南口, 北口) montrent qu'un point cardinal qualifie une sortie, sans rendre le point cardinal propre à la gare : il structure aussi les villes, les routes, les cartes, les régions (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0620** (decision, sens 1 · semantic_type) : Un point cardinal est une direction, ni un lieu ni un objet : concept non matériel qui ne relève pas plus précisément d'un autre type (A2-ST-v1). Vaut pour 東, 西, 南, 北. — avant `null` → après `"concept_abstrait"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 東 · ひがし · higashi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › orientation |
| sens | Est ; Direction de l'est |
| nuance | **Nom** de direction désignant le point cardinal est. Les romajis associés sont (*higashi*). |
| particules |  |
| furigana | <ruby>東<rt>ひがし</rt></ruby> |
| exemple | とうきょう は にほん の **<ruby>東<rt>ひがし</rt></ruby>** に あります 。 — Tokyo est à l'**est** du Japon. |

**Mécanique**

- word : `"東"`
- readings : `[{"kana":"ひがし","romaji":"higashi","furigana":"<ruby>東<rt>ひがし</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Exemples : 東口, la sortie est ; 東京, la « capitale de l'est »."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Est** | espace_proprietes_spatiales › direction_orientation › directions_cardinales | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本<rt>にほん</rt></ruby> の <ruby>東<rt>ひがし</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> に は、<ruby>大<rt>おお</rt></ruby>きな <ruby>首都<rt>しゅと</rt></ruby> である <ruby>東京<rt>とうきょう</rt></ruby> が あります — Vers l'**est** du Japon se trouve Tokyo, qui est la grande capitale.
- <ruby>毎朝<rt>まいあさ</rt></thought></ruby> <ruby>東<rt>ひがし</rt></ruby> の <ruby>空<rt>そら</rt></thought></ruby> から <ruby>綺麗<rt>きれい</rt></ruby> な <ruby>太陽<rt>たいよう</rt></thought></ruby> が <ruby>上<rt>のぼ</rt></thought></ruby>ります — Chaque matin, un beau soleil se lève depuis le ciel à l'**est**.
- <ruby>駅<rt>えき</rt></ruby> の <ruby>東口<rt>ひがしぐち</rt></ruby> から <ruby>出<rt>で</rt></ruby>て、<ruby>東<rt>ひがし</rt></ruby> に <ruby>向<rt>む</rt></ruby>かって 5 <ruby>分<rt>ふん</rt></ruby>ほど <ruby>歩<rt>ある</rt></ruby>きます — Je sors par la sortie est de la gare et marche environ 5 minutes en direction de l'**est**.

### n5_v_356 → v_356 · 横

**Statut** : décision validée

- **A2-04-D0589** (decision, senses) : Un seul concept documenté (« le flanc ou le côté horizontal ») : « horizontal » en est la direction, reprise dans la nuance, et non un second sens. — avant `["Côté","À côté de","Latéral","Horizontal"]` → après `"un seul sens"`
- **A2-04-D0590** (abandon, senses) : Le premier est une traduction de construction ; « latéral » est un adjectif ; « horizontal » est repris dans la nuance. — avant `["À côté de","Latéral","Horizontal"]` → après `null`
- **A2-04-D0591** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 横 · よこ · yoko |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Côté ; À côté de ; Latéral ; Horizontal |
| nuance | **Nom** de position désignant le flanc ou le côté horizontal d'un objet ou d'une personne (souvent utilisé avec *no* pour situer quelque chose juste à côté : <ruby>横<rt>よこ</rt></ruby>). Les romajis associés sont (*yoko*). |
| particules |  |
| furigana | <ruby>横<rt>よこ</rt></ruby> |
| exemple | ベッド の **<ruby>横<rt>よこ</rt></ruby>** に つくえ が あります 。 — Il y a un bureau **à côté** du lit. |

**Mécanique**

- word : `"横"`
- readings : `[{"kana":"よこ","romaji":"yoko","furigana":"<ruby>横<rt>よこ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'espace juste à côté ou le flanc : 横に置く ; aussi le sens horizontal, par opposition à 縦."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Côté** (Flanc) | espace_proprietes_spatiales › position_localisation | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>車<rt>くるま</rt></ruby> の <ruby>横<rt>よこ</rt></ruby> に <ruby>綺麗<rt>きれい</rt></ruby> な <ruby>花<rt>はな</rt></ruby> が たくさん <ruby>植<rt>う</rt></ruby>えられています — Il y a beaucoup de jolies fleurs plantées sur le **côté** de la voiture.
- <ruby>図書館<rt>としょかん</rt></ruby> の <ruby>横<rt>よこ</rt></ruby> に <ruby>静<rt>しず</rt></ruby>かな カフェ が ある ので、よく <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>み に 行きます — Comme il y a un café calme à **côté** de la bibliothèque, j'y vais souvent pour lire des livres.
- ベッド の <ruby>横<rt>よこ</rt></ruby> に <ruby>小<rt>ちい</rt></ruby>さな テーブル を 置いて、スマホ や グラス を <ruby>置<rt>お</rt></ruby>いています — Je place une petite table sur le **côté** du lit pour y poser mon smartphone et mon verre.

### n5_v_357 → v_357 · 西

**Statut** : décision validée

- **A2-04-D0614** (abandon, senses) : Redondant. — avant `["Direction de l'ouest"]` → après `null`
- **A2-04-D0615** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : les noms de sorties (東口, 西口, 南口, 北口) montrent qu'un point cardinal qualifie une sortie, sans rendre le point cardinal propre à la gare : il structure aussi les villes, les routes, les cartes, les régions (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0620** (decision, sens 1 · semantic_type) : Un point cardinal est une direction, ni un lieu ni un objet : concept non matériel qui ne relève pas plus précisément d'un autre type (A2-ST-v1). Vaut pour 東, 西, 南, 北. — avant `null` → après `"concept_abstrait"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 西 · にし · nishi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › orientation |
| sens | Ouest ; Direction de l'ouest |
| nuance | **Nom** de direction désignant le point cardinal ouest. Les romajis associés sont (*nishi*). |
| particules |  |
| furigana | <ruby>西<rt>にし</rt></ruby> |
| exemple | きょうと は おおさか の **<ruby>西<rt>にし</rt></ruby>** に ありません 。 — Kyoto n'est pas à l'**ouest** d'Osaka. |

**Mécanique**

- word : `"西"`
- readings : `[{"kana":"にし","romaji":"nishi","furigana":"<ruby>西<rt>にし</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Exemple : 西口, la sortie ouest."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Ouest** | espace_proprietes_spatiales › direction_orientation › directions_cardinales | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本<rt>にほん</rt></ruby> の <ruby>西<rt>にし</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> に ある <ruby>京都<rt>きょうと</rt></ruby> には、<ruby>歴史<rt>れきし</rt></ruby> の ある <ruby>寺<rt>てら</rt></ruby> が たくさん あります — Il y a beaucoup de temples historiques à Kyoto, situé vers l'**ouest** du Japon.
- <ruby>夕方<rt>ゆうがた</rt></ruby> になると、<ruby>西<rt>にし</rt></ruby> の <ruby>空<rt>そら</rt></ruby> が <ruby>赤<rt>あか</rt></ruby>く <ruby>染<rt>そ</rt></ruby>まって とても <ruby>綺麗<rt>きれい</rt></ruby> です — Le soir venu, le ciel à l'**ouest** se colore en rouge et c'est très beau.
- <ruby>駅<rt>えき</rt></ruby> の <ruby>西口<rt>にしぐち</rt></ruby> から <ruby>出<rt>で</rt></ruby>て、<ruby>西<rt>にし</rt></ruby> に <ruby>向<rt>む</rt></ruby>かって 歩く と デパート が あります — En sortant par la sortie ouest de la gare et en marchant vers l'**ouest**, il y a un grand magasin.

### n5_v_358 → v_358 · 角

**Statut** : décision validée

- **A2-04-D0621** (abandon, senses) : Pas équivalent ; aucun sens n'est repris de 角 lu つの. — avant `["Virage"]` → après `null`
- **A2-04-D0622** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare ; l'angle de rue relève de la ville (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 角 · かど · kado |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Coin ; Virage ; Angle (de rue) |
| nuance | **Nom** de position ou de lieu désignant l'angle formé par deux rues qui se croisent ou le coin extérieur d'un bâtiment. Les romajis associés sont (*kado*). |
| particules |  |
| furigana | <ruby>角<rt>かど</rt></ruby> |
| exemple | その **<ruby>角<rt>かど</rt></ruby>** を ひだり に まがって ください 。 — Veuillez tourner à gauche à ce **coin**. |

**Mécanique**

- word : `"角"`
- readings : `[{"kana":"かど","romaji":"kado","furigana":"<ruby>角<rt>かど</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'angle de deux rues ou le coin d'un bâtiment : 次の角を右に曲がる, tourner à droite au prochain coin. Lu つの, 角 (la corne) est un autre mot."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Coin** (Angle) | espace_proprietes_spatiales › forme › angulaire | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- つき の <ruby>角<rt>かど</rt></ruby> を <ruby>右<rt>みぎ</rt></ruby> に <ruby>曲<rt>ま</rt></ruby>がると、<ruby>郵便局<rt>ゆうびんきょく</rt></ruby> が あります — En tournant à droite au **coin** suivant, il y a un bureau de poste.
- <ruby>子供<rt>こども</rt></ruby> が <ruby>走<rt>はし</rt></ruby>ってきて、<ruby>道<rt>みち</rt></ruby> の <ruby>角<rt>かど</rt></ruby> で ぶつかりそう に なりました — Un enfant a couru et a failli entrer en collision au **coin** de la rue.
- その <ruby>建物<rt>たてもの</rt></ruby> の <ruby>角<rt>かど</rt></ruby> に かわいい カフェ が オープン しました — Un joli café a ouvert au **coin** de ce bâtiment.

### n5_v_360 → v_360 · 近い

**Statut** : décision validée

- **A2-04-D0626** (decision, senses) : Un seul sens : la nuance applique la même échelle de distance à l'espace et au temps. — avant `["Proche","Près","Avoisinant"]` → après `"un seul sens"`
- **A2-04-D0627** (abandon, senses) : Redondant. — avant `["Avoisinant"]` → après `null`
- **A2-04-D0628** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 近い · ちかい · chikai |
| type, group | adjectif_i · i |
| catégorie (ancienne, indicative) | position_direction › distance |
| sens | Proche ; Près ; Avoisinant |
| nuance | **Adjectif en -i** désignant une distance courte dans l'espace ou dans le temps. Les romajis associés sont (*chikai*). |
| particules |  |
| furigana | <ruby>近<rt>ちか</rt></ruby>い |
| exemple | えき から わたし の いえ は **<ruby>近<rt>ちか</rt></ruby>い** です 。 — Ma maison est **proche** de la gare. |

**Mécanique**

- word : `"近い"`
- readings : `[{"kana":"ちかい","romaji":"chikai","furigana":"<ruby>近<rt>ちか</rt></ruby>い","default":true,"note":null}]`
- grammatical_class : `"adjectif_i"`
- group : `"i"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Une distance courte, dans l'espace ou dans le temps : 駅に近い, près de la gare."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Proche** (Près) | espace_proprietes_spatiales › distance_proximite › proximite | propriete |  |  |

**Contexte (anciens exemples, lecture seule)**

- わたしの <ruby>家<rt>いえ</rt></ruby> は <ruby>駅<rt>えき</rt></ruby> から <ruby>近<rt>ちか</rt></ruby>い ので、<ruby>通勤<rt>つうきん</rt></ruby> が とても <ruby>便利<rt>べんり</rt></ruby> です — Comme ma maison est **proche** de la gare, les trajets pour aller au travail sont très pratiques.
- <ruby>近<rt>ちか</rt></ruby>い うち に、また ゆっくり <ruby>食事<rt>しょくじ</rt></ruby> でも しましょう — Dans un avenir **proche**, prenons à nouveau le temps de manger ensemble.
- <ruby>夏休み<rt>なつやすみ</rt></ruby> が <ruby>近<rt>ちか</rt></ruby>づいてきた ので、<ruby>旅行<rt>りょこう</rt></ruby> の <ruby>計画<rt>けいかく</rt></ruby> を <ruby>立<rt>た</rt></ruby>てています — Les vacances d'été étant **proches**, je fais des projets de voyage.

### n5_v_362 → v_362 · 遠い

**Statut** : décision validée

- **A2-04-D0629** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 遠い · とおい · tooi |
| type, group | adjectif_i · i |
| catégorie (ancienne, indicative) | position_direction › distance |
| sens | Loin ; Éloigné |
| nuance | **Adjectif en -i** désignant une grande distance dans l'espace ou dans le temps. Les romajis associés sont (*tooi*). |
| particules |  |
| furigana | <ruby>遠<rt>とお</rt></ruby>い |
| exemple | ここ から とうきょう は **<ruby>遠<rt>とお</rt></ruby>い** です 。 — Tokyo est **loin** d'ici. |

**Mécanique**

- word : `"遠い"`
- readings : `[{"kana":"とおい","romaji":"tooi","furigana":"<ruby>遠<rt>とお</rt></ruby>い","default":true,"note":null}]`
- grammatical_class : `"adjectif_i"`
- group : `"i"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Une grande distance, dans l'espace ou dans le temps : 駅から遠い."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Loin** (Éloigné) | espace_proprietes_spatiales › distance_proximite › eloignement | propriete |  |  |

**Contexte (anciens exemples, lecture seule)**

- わたしの <ruby>実家<rt>じっか</rt></ruby> は ここ から とても <ruby>遠<rt>とおい</rt></ruby> ので、<ruby>新幹線<rt>しんかんせん</rt></ruby> で <ruby>帰<rt>かえ</rt></ruby>ります — Comme ma maison natale est très **lointaine** d'ici, je rentre en Shinkansen.
- <ruby>休<rt>やす</rt></ruby>みの <ruby>日<rt>ひ</rt></ruby> は、<ruby>遠<rt>とおい</rt></ruby> の <ruby>海<rt>うみ</rt></ruby> まで ドライブ に <ruby>行<rt>い</rt></ruby>く の が <ruby>好き<rt>すき</rt></ruby> です — Les jours de congé, j'aime aller faire un tour en voiture jusqu'à la mer qui est **loin**.
- 「<ruby>雷<rt>かみなり</rt></ruby> が <ruby>鳴<rt>な</rt></ruby>って いる ね」「うん、まだ <ruby>遠<rt>とおい</rt></ruby> ところ だ から <ruby>大丈夫<rt>だいじょうぶ</rt></ruby> だよ」 — « Le tonnerre gronde, non ? » « Oui, c'est encore **loin**, donc il n'y a pas de problème. »

### n5_v_419 → v_419 · 向こう

**Statut** : décision validée

- **A2-04-D0601** (decision, senses) : Un seul concept documenté : un lieu situé en vis-à-vis ou de l'autre côté. — avant `["Là-bas","En face","De l'autre côté","L'autre versant"]` → après `"un seul sens"`
- **A2-04-D0602** (abandon, senses) : Pas équivalent. — avant `["L'autre versant"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 向こう · むこう · mukou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | pronoms_demonstratifs › demonstratifs_direction |
| sens | Là-bas ; En face ; De l'autre côté ; L'autre versant |
| nuance | **Nom** ou pronom de lieu désignant un endroit situé en face, de l'autre côté d'une rue, ou un lieu distant et vis-à-vis. |
| particules |  |
| furigana | <ruby>向<rt>む</rt></ruby>こう |
| exemple | しんごう の **<ruby>向<rt>む</rt></ruby>こう** に ゆうびんきょく が あり ます 。 — Il y a un bureau de poste **en face**, de l'autre côté du feu tricolore. |

**Mécanique**

- word : `"向こう"`
- readings : `[{"kana":"むこう","romaji":"mukou","furigana":"<ruby>向<rt>む</rt></ruby>こう","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Un lieu situé en face, de l'autre côté d'une rue, ou au loin : 道の向こう."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **En face** (Là-bas, L'autre côté) | espace_proprietes_spatiales › position_localisation | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>道<rt>みち</rt></ruby> の <ruby>向<rt>む</rt></ruby>こう に <ruby>郵便局<rt>ゆうびんきょく</rt></ruby> が あります — Il y a un bureau de poste **en face** de la rue.
- <ruby>窓<rt>まど</rt></ruby> の <ruby>向<rt>む</rt></ruby>こう に <ruby>綺麗<rt>きれい</rt></ruby> な <ruby>海<rt>うみ</rt></ruby> が <ruby>見<rt>み</rt></ruby>えます — On peut voir une belle mer **de l'autre côté** de la fenêtre.
- <ruby>川<rt>かわ</rt></ruby> の <ruby>向<rt>む</rt></ruby>こう に <ruby>渡<rt>わた</rt></ruby>る ため に、<ruby>橋<rt>はし</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>ります — Pour traverser **de l'autre côté** de la rivière, on traverse un pont.

### n5_v_597 → v_597 · 縦

**Statut** : décision validée

- **A2-04-D0607** (decision, senses) : Un seul concept documenté (« la dimension verticale ou l'orientation de haut en bas ») : « vertical » et « sens de la longueur » en sont des traductions contextuelles. — avant `["Hauteur","Vertical","Sens de la longueur (vertical)"]` → après `"un seul sens"`
- **A2-04-D0608** (abandon, senses) : Traductions contextuelles, reprises dans la nuance. — avant `["Vertical","Sens de la longueur (vertical)"]` → après `null`
- **A2-04-D0609** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 縦 · たて · tate |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › dimension |
| sens | Hauteur ; Vertical ; Sens de la longueur (vertical) |
| nuance | **Nom** désignant la dimension verticale ou l'orientation de haut en bas, par opposition à *yoko* (横) qui désigne l'horizontale ou la largeur. |
| particules |  |
| furigana | <ruby>縦<rt>たて</rt></ruby> |
| exemple | この かみ は **<ruby>縦<rt>たて</rt></ruby>** が ながい です 。 — Ce papier est long dans le sens de la **hauteur** (verticalement). |

**Mécanique**

- word : `"縦"`
- readings : `[{"kana":"たて","romaji":"tate","furigana":"<ruby>縦<rt>たて</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"La dimension de haut en bas, ou le sens de la longueur ; contraire : 横 (l'horizontale, la largeur). 縦に書く : écrire verticalement."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sens vertical** (Hauteur) | espace_proprietes_spatiales › dimensions › hauteur | propriete |  |  |

**Contexte (anciens exemples, lecture seule)**

- この テーブル の たて は 1メートル です — La **hauteur** (**longueur verticale**) de cette table est d'un mètre.
- <ruby>紙<rt>かみ</rt></ruby> の たて と <ruby>横<rt>よこ</rt></ruby> の <ruby>長<rt>なが</rt></ruby>さ を <ruby>測<rt>はか</rt></ruby>ります — Je mesure la longueur **verticale** et horizontale du papier.
- この <ruby>部屋<rt>へや</rt></ruby> の たて の <ruby>広<rt>ひろ</rt></ruby>さ は どれくらい です か — Quelle est la dimension en **hauteur** (**longueur**) de cette pièce ?

### n5_v_630 → v_630 · 下

**Statut** : décision validée

- **A2-04-D0578** (decision, senses) : Un seul sens : la nuance ne décrit que la position (l'espace au-dessous). — avant `["Sous","En bas","Au-dessous","Inférieur"]` → après `"un seul sens"`
- **A2-04-D0579** (abandon, senses) : « Sous » est une traduction de construction ; « au-dessous » est redondant ; « inférieur » (rang) n'est pas documenté par la nuance. — avant `["Sous","Au-dessous","Inférieur"]` → après `null`
- **A2-04-D0580** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 下 · した · shita |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Sous ; En bas ; Au-dessous ; Inférieur |
| nuance | **Nom de position** indiquant l'espace situé au-dessous ou en contrebas de quelque chose. Il est généralement suivi de la particule de lieu *ni* (下に) pour situer un objet. |
| particules | に |
| furigana | <ruby>下<rt>した</rt></ruby> |
| exemple | ねこ は つくえ の **<ruby>下<rt>した</rt></ruby>** に い ます 。 — Le chat est **sous** le bureau. |

**Mécanique**

- word : `"下"`
- readings : `[{"kana":"した","romaji":"shita","furigana":"<ruby>下<rt>した</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Avec に : 机の下に, sous le bureau."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Dessous** (En bas) | espace_proprietes_spatiales › position_localisation › dessus_dessous | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>猫<rt>ねこ</rt></ruby> が テーブル の <ruby>下<rt>した</rt></ruby> に います — Le chat est **sous** la table.
- ベッド の <ruby>下<rt>した</rt></ruby> を <ruby>掃除<rt>そうじ</rt></ruby> して ください — Veuillez faire le ménage **sous** le lit.
- この <ruby>木<rt>き</rt></ruby> の <ruby>下<rt>した</rt></ruby> で ちょっと <ruby>休<rt>やす</rt></ruby>みましょう — Reposons-nous un instant **sous** cet arbre.

### n5_v_652 → v_652 · 地図

**Statut** : décision validée

- **A2-04-D0630** (abandon, senses) : Le premier est redondant ; le second est un cas particulier. — avant `["Plan géographique","Carte routière"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 地図 · ちず · chizu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › fourniture |
| sens | Carte (plan) ; Plan géographique ; Carte routière |
| nuance | **Nom** composé des kanjis signifiant « terre / sol » et « dessin / plan », désignant une carte géographique ou un plan urbain pour se repérer. |
| particules |  |
| furigana | <ruby>地<rt>ち</rt></ruby><ruby>図<rt>ず</rt></ruby> |
| exemple | **<ruby>地<rt>ち</rt></ruby><ruby>図<rt>ず</rt></ruby>** で みち を み ます 。 — Je regarde le chemin sur la **carte**. |

**Mécanique**

- word : `"地図"`
- readings : `[{"kana":"ちず","romaji":"chizu","furigana":"<ruby>地<rt>ち</rt></ruby><ruby>図<rt>ず</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Carte géographique ou plan de ville, pour se repérer."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Carte** (Plan) | territoires_lieux_geographiques › representation_geographique › cartes | information_contenu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>地図<rt>ちず</rt></ruby> を <ruby>見<rt>み</rt></ruby>ながら <ruby>道<rt>みち</rt></ruby> を <ruby>探<rt>さが</rt></ruby>します — Je cherche mon chemin tout en regardant la **carte**.
- 「この <ruby>地図<rt>ちず</rt></ruby> で <ruby>郵便局<rt>ゆうびんきょく</rt></ruby> の <ruby>場所<rt>ばしょ</rt></ruby> が わかります」 — « On comprend l'emplacement du bureau de poste grâce à cette **carte** ('cette **carte** permet de trouver...'). »
- <ruby>旅行<rt>りょこう</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> に <ruby>日本<rt>にほん</rt></ruby> の <ruby>地図<rt>ちず</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました — J'ai acheté une **carte** du Japon avant le voyage.

### n5_v_696 → v_696 · 表

**Statut** : décision validée

- **A2-04-D0603** (decision, senses) : Un seul concept documenté : le côté visible ou avant d'une chose. Aucun sens n'est repris de 表 lu ひょう (tableau). — avant `["Surface","Devant","Face","Côté recto"]` → après `"un seul sens"`
- **A2-04-D0604** (type-nul, sens 1 · semantic_type) : La face d'une chose en est une partie : la partie n'est pas un type sémantique, et aucun type terminal ne convient (comme les parties du corps, lot 01) Addendum A6.
- **A2-04-D0605** (abandon, senses) : Pas équivalent : la surface se dit 表面. — avant `["Surface"]` → après `null`
- **A2-04-D0606** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 表 · おもて · omote |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Surface ; Devant ; Face ; Côté recto |
| nuance | **Nom** désignant le côté visible, la face avant, le recto d'une feuille ou l'extérieur d'un bâtiment (par opposition à *ura* pour l'envers ou le verso). |
| particules |  |
| furigana | <ruby>表<rt>おもて</rt></ruby> |
| exemple | かみ の **<ruby>表<rt>おもて</rt></ruby>** に 名前 を かき ます 。 — J'écris mon nom sur le **recto** (la face avant) de la feuille. |

**Mécanique**

- word : `"表"`
- readings : `[{"kana":"おもて","romaji":"omote","furigana":"<ruby>表<rt>おもて</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le côté visible, la face avant, le recto, l'extérieur d'un bâtiment ; contraire : 裏 (l'envers). Lu ひょう, 表 (tableau) est un autre mot."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Face** (Recto, Devant) | espace_proprietes_spatiales › position_localisation › devant_derriere | **null** |  |  |

**Contexte (anciens exemples, lecture seule)**

- シャツ の <ruby>表<rt>おもて</rt></ruby> と <ruby>裏<rt>うら</rt></ruby> を <ruby>間<rt>ま</rt></ruby>違<rt>ちが</rt></ruby>えて <ruby>着<rt>き</rt></ruby>てしまいました — Je me suis trompé entre l'**endroit** ('la surface') et l'envers de ma chemise en la portant.
- 「ノート の <ruby>表<rt>おもて</rt></ruby> に <ruby>名前<rt>なまえ</rt></ruby> と クラス を <ruby>書<rt>か</rt></ruby>いて ください」 — « Veuillez écrire votre nom et votre classe sur le recto (**surface**) du cahier. »
- コイン の <ruby>表<rt>おもて</rt></ruby> が 出<rt>で</rt></ruby>る か <ruby>裏<rt>うら</rt></ruby> が 出<rt>で</rt></ruby>る か <ruby>当<rt>あ</rt></ruby>てます — Je devine si ce sera pile (**l'endroit**) ou face avec la pièce.

### n5_v_704 → v_704 · 近く

**Statut** : décision validée

- **A2-04-D0598** (decision, senses) : Deux sens documentés par la source (« la proximité spatiale (près de…) ou temporelle (bientôt) ») : un lieu proche et un moment proche. À la différence de 近い (un seul sens), 近く « prochainement » désigne un moment, et non un degré de distance. — avant `["Près","Proche","Aux environs","Prochainement"]` → après `["S1 Environs (espace)","S2 Prochainement (temps)"]`
- **A2-04-D0599** (abandon, senses) : Adjectif, relève de 近い. — avant `["Proche"]` → après `null`
- **A2-04-D0600** (decision, tags) : lieu_gare (ancienne catégorie position_direction) écarté : mot d'espace général, qui s'emploie partout ; pouvoir le dire dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 近く · ちかく · chikaku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | position_direction › position |
| sens | Près ; Proche ; Aux environs ; Prochainement |
| nuance | **Nom / postposition** dérivé de l'adjectif *chikai* (proche), désignant la proximité spatiale (« près de... ») ou temporelle (« bientôt »). Souvent utilisé avec la particule *ni* ou *no*. |
| particules | に |
| furigana | <ruby>近<rt>ちか</rt></ruby>く |
| exemple | えき の **<ruby>近<rt>ちか</rt></ruby>く** に カフェ が あり ます 。 — Il y a un café **près** de la gare. |

**Mécanique**

- word : `"近く"`
- readings : `[{"kana":"ちかく","romaji":"chikaku","furigana":"<ruby>近<rt>ちか</rt></ruby>く","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Environs** (Près) | espace_proprietes_spatiales › distance_proximite › proximite | lieu | particules に の | 駅の近くに : près de la gare. |
| 2 | **Prochainement** (Bientôt) | temps › moments_periodes › futur | concept_abstrait |  | 近く結婚します : il se marie prochainement. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>家<rt>いえ</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>く に <ruby>便利<rt>べんり</rt></ruby> な スーパー が あります — Il y a un supermarché pratique **près** de chez moi.
- 「<ruby>駅<rt>えき</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>く で <ruby>友達<rt>ともだち</rt></ruby> と <ruby>待<rt>ま</rt></ruby>ち<ruby>合<rt>あ</rt></ruby>わせを します」 — « Je donne rendez-vous à un ami **près** de la gare. »
- <ruby>病院<rt>びょういん</rt></ruby> は この <ruby>公園<rt>こうえん</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>く に あります — L'hôpital se trouve **près** de ce parc.
