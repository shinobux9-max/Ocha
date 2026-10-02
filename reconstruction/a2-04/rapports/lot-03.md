# Lot lot-03 · Maison, habitat et vie domestique

Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.

## Autres entrées

### n5_v_33 → v_33 · 家

**Statut** : PROPOSITION, non validée

- **A2-04-D0221** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0222** (abandon, senses) : « Foyer » relève de 家庭, « famille » de 家族 ; « logement » est redondant avec « domicile ». — avant `["Foyer","Logement","Famille"]` → après `null`
- **A2-04-D0223** (decision, readings) : La lecture うち, documentée par la nuance de la source, n'est PAS ajoutée à readings (arbitrage du lot 03) : ce serait une exception de lecture absente de la mécanique. Elle reste mentionnée dans la nuance et consignée comme candidat d'enrichissement, à traiter par une procédure globale si elle est décidée avant 5.17.

| Champ source | Valeur |
|---|---|
| mot, lecture | 家 · いえ · ie |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › pieces_maison |
| sens | Maison ; Domicile ; Foyer ; Logement ; Famille |
| nuance | Nom désignant le bâtiment physique où l'on habite, ou par extension le foyer familial (peut aussi se lire <ruby>家<rt>うち</rt></ruby> (uchi) dans un contexte plus familier pour dire 'chez soi'). |
| particules |  |
| furigana | <ruby>家<rt>いえ</rt></ruby> |
| exemple | <ruby>日曜日<rt>にちようび</rt></ruby> は <ruby>家<rt>いえ</rt></ruby> で のんびり します 。 — Dimanche, je me détends à la **maison**. |

**Mécanique**

- word : `"家"`
- readings : `[{"kana":"いえ","romaji":"ie","furigana":"<ruby>家<rt>いえ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le bâtiment où l'on habite. Se lit aussi うち, surtout pour « chez soi », avec une nuance plus familière (lecture documentée par la source, non reprise comme lecture structurée dans A2-04)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Maison** (Domicile) | habitat_vie_domestique › logements › maisons | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>私<rt>わたし</rt></ruby> の <ruby>家<rt>いえ</rt></ruby> は <ruby>駅<rt>えき</rt></ruby> から <ruby>近<rt>ちか</rt></ruby>い です — Ma **maison** est proche de la gare.
- <ruby>日曜日<rt>にちようび</rt></ruby> に <ruby>家<rt>いえ</rt></ruby> の <ruby>掃除<rt>そうじ</rt></ruby> を します — Je fais le ménage de la **maison** le dimanche.
- <ruby>疲<rt>つか</rt></ruby>れて いる ので <ruby>早<rt>はや</rt></ruby>く <ruby>家<rt>いえ</rt></ruby> に <ruby>帰<rt>かえ</rt></ruby>りたい です — Je suis fatigué, alors je veux rentrer vite à la **maison**.

### n5_v_34 → v_34 · 家庭

**Statut** : PROPOSITION, non validée

- **A2-04-D0226** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0227** (abandon, senses) : « Famille » relève de 家族 ; « ménage » est ambigu en français (le nettoyage) ; « cadre familial » est redondant. — avant `["Famille","Ménage","Cadre familial"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 家庭 · かてい · katei |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › famille |
| sens | Foyer ; Famille ; Ménage ; Cadre familial |
| nuance | Nom désignant le foyer ou l'ambiance chaleureuse de la maison, par opposition au bâtiment physique <ruby>家<rt>いえ</rt></ruby> (ie, maison). |
| particules |  |
| furigana | <ruby>家<rt>か</rt></ruby><ruby>庭<rt>てい</rt></ruby> |
| exemple | げんき な <ruby>家庭<rt>かてい</rt></ruby> を つくる こと が <ruby>大切<rt>たいせつ</rt></ruby> です 。 — Il est important de créer un **foyer** heureux. |

**Mécanique**

- word : `"家庭"`
- readings : `[{"kana":"かてい","romaji":"katei","furigana":"<ruby>家<rt>か</rt></ruby><ruby>庭<rt>てい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le foyer, la vie de famille à la maison, par opposition au bâtiment 家 (いえ) : 家庭料理, la cuisine familiale."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Foyer** | relations_sociales › famille_parente › relations_familiales | groupe_collectif |  |  |

**Contexte (anciens exemples, lecture seule)**

- あたたかい <ruby>家庭<rt>かてい</rt></ruby> を <ruby>作<rt>つく</rt></ruby>りたい です — Je veux créer un **foyer** chaleureux.
- <ruby>家庭<rt>かてい</rt></ruby> の <ruby>料理<rt>りょうり</rt></ruby> は いつも <ruby>美味<rt>おい</rt></ruby>しい です — La cuisine de **foyer** (familiale) est toujours délicieuse.
- <ruby>仕事<rt>しごと</rt></ruby> と <ruby>家庭<rt>かてい</rt></ruby> の <ruby>両方<rt>りょうほう</rt></ruby> を <ruby>大切<rt>たいせつ</rt></ruby> に しています — Je donne de l'importance à la fois au travail et au **foyer**.

### n5_v_96 → v_96 · テーブル

**Statut** : PROPOSITION, non validée

- **A2-04-D0271** (abandon, senses) : Le premier est repris dans la nuance ; le second relève de 机. — avant `["Table à manger","Bureau"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | テーブル · てーぶる · teeburu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › mobilier |
| sens | Table ; Table à manger ; Bureau |
| nuance | Mot en katakana issu de l'anglais 'table', désignant une table de salon ou de salle à manger dans le contexte des repas et de la cuisine. |
| particules |  |
| furigana | テーブル |
| exemple | <ruby>料理<rt>りょうり</rt></ruby> を テーブル の <ruby>上<rt>うえ</rt></ruby> に <ruby>並<rt>なら</rt></ruby>べます 。 — Je dispose les plats sur la **table**. |

**Mécanique**

- word : `"テーブル"`
- readings : `[{"kana":"てーぶる","romaji":"teeburu","furigana":"テーブル","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Table de repas ou de salon ; le bureau pour travailler se dit 机."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Table** | habitat_vie_domestique › mobilier › tables_surfaces | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>家族<rt>かぞく</rt></ruby> みんな で テーブル を <ruby>囲<rt>かこ</rt></ruby>んで <ruby>夕食<rt>ゆうしょく</rt></ruby> を <ruby>食<rt>た</rt></ruby>べます — Toute la famille se réunit autour de la **table** pour dîner.
- <ruby>勉強<rt>べんきょう</rt></ruby> する ため に、テーブル の <ruby>上<rt>うえ</rt></ruby> を きれい に かたづけました — J'ai bien rangé le dessus de la **table** pour étudier.
- カフェ の テーブル に コーヒー と ケーキ を <ruby>置<rt>お</rt></ruby>きました — J'ai posé le café et le gâteau sur la **table** du café.

### n5_v_100 → v_100 · 台所

**Statut** : PROPOSITION, non validée

- **A2-04-D0228** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0229** (abandon, senses) : Redondant. — avant `["Pièce pour cuisiner"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 台所 · だいどころ · daidokoro |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › cuisine |
| sens | Cuisine ; Pièce pour cuisiner |
| nuance | Nom désignant la pièce de la maison réservée à la préparation des repas et à la cuisine. On utilise aussi plus communément le terme en katakana キッチン (kicchin). |
| particules |  |
| furigana | <ruby>台<rt>だい</rt></ruby><ruby>所<rt>どころ</rt></ruby> |
| exemple | <ruby>母<rt>はは</rt></ruby> は <ruby>台所<rt>だいどころ</rt></ruby> で <ruby>夕飯<rt>ゆうはん</rt></ruby> を <ruby>作<rt>つく</rt></ruby>っています 。 — Ma mère prépare le dîner dans la **cuisine**. |

**Mécanique**

- word : `"台所"`
- readings : `[{"kana":"だいどころ","romaji":"daidokoro","furigana":"<ruby>台<rt>だい</rt></ruby><ruby>所<rt>どころ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"La pièce où l'on prépare les repas ; キッチン, emprunté à l'anglais, est aussi très courant."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Cuisine (pièce)** | habitat_vie_domestique › espaces_domestiques › cuisine | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- お<ruby>母<rt>かあ</rt></ruby>さん が <ruby>台所<rt>だいどころ</rt></ruby> で <ruby>夕食<rt>ゆうしょく</rt></ruby> の <ruby>準備<rt>じゅんび</rt></ruby> を <ruby>手伝<rt>てつだ</rt></ruby>って います — Je aide maman à préparer le dîner dans la **cuisine**.
- <ruby>台所<rt>だいどころ</rt></ruby> の <ruby>掃除<rt>そうじ</rt></ruby> を <ruby>終<rt>お</rt></ruby>えて から、ゆっくり <ruby>休憩<rt>きゅうけい</rt></ruby> します — Après avoir fini de nettoyer la **cuisine**, je prends une pause tranquille.
- <ruby>台所<rt>だいどころ</rt></ruby> から いい <ruby>匂<rt>にお</rt></ruby>い が すすんで きます — Une bonne odeur commence à s'échapper de la **cuisine**.

### n5_v_145 → v_145 · 机

**Statut** : PROPOSITION, non validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 机 · つくえ · tsukue |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › lieu_travail |
| sens | Bureau ; Table de travail |
| nuance | Nom désignant le meuble de travail (bureau, pupitre d'écolier). Pour le distinguer, <ruby>机<rt>つくえ</rt></ruby> (tsukue) sert à étudier ou travailler, tandis que <ruby>テーブル<rt>てーぶる</rt></ruby> (tēburu) sert plutôt pour les repas. Comme c'est un grand meuble, on utilise le compteur <ruby>台<rt>だい</rt></ruby> (dai) pour le compter. |
| particules |  |
| furigana | <ruby>机<rt>つくえ</rt></ruby> |
| exemple | <ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に <ruby>パソコン<rt>ぱそこん</rt></ruby> と <ruby>本<rt>ほん</rt></ruby> が あります 。 — Il y a un ordinateur et un livre sur le **bureau**. |

**Mécanique**

- word : `"机"`
- readings : `[{"kana":"つくえ","romaji":"tsukue","furigana":"<ruby>机<rt>つくえ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Meuble pour étudier ou travailler ; la table de repas se dit テーブル."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bureau** (Table de travail) | habitat_vie_domestique › mobilier › tables_surfaces | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に <ruby>本<rt>ほん</rt></ruby> と ノート を <ruby>綺麗<rt>きれい</rt></ruby> に <ruby>並<rt>なら</rt></ruby>べました — J'ai bien rangé les livres et les cahiers sur le **bureau**.
- 新しい <ruby>机<rt>つくえ</rt></ruby> を <ruby>買<rt>か</rt></ruby>った ので、<ruby>部屋<rt>へや</rt></ruby> で <ruby>勉強<rt>べんきょう</rt></ruby> する の が とても <ruby>楽<rt>たの</rt></ruby>しみ です — Comme j'ai acheté un nouveau **bureau**, j'ai hâte d'étudier dans ma chambre.
- <ruby>机<rt>つくえ</rt></ruby> の <ruby>引<rt>ひ</rt></ruby>き<ruby>出<rt>だ</rt></ruby>し に <ruby>大切<rt>たいせつ</rt></ruby> な <ruby>手紙<rt>てがみ</rt></ruby> を <ruby>入<rt>い</rt></ruby>れて おきます — Je mets une lettre importante dans le tiroir du **bureau**.

### n5_v_191 → v_191 · マッチ

**Statut** : PROPOSITION, non validée

- **A2-04-D0286** (abandon, senses) : Autre emploi de l'emprunt, non pertinent au N5 : le match sportif se dit 試合. — avant `["Match"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | マッチ · まっち · macchi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › fournitures |
| sens | Allumette ; Match |
| nuance | Emprunt à l'anglais 'match' écrit en katakana. En japonais quotidien, il désigne presque toujours une allumette pour faire du feu. Pour parler d'un match de sport, les Japonais préfèrent utiliser le mot spécifique <ruby>試合<rt>しあい</rt></ruby> (shiai). |
| particules |  |
| furigana | マッチ |
| exemple | **マッチ** で キャンプ の たきび に ひ を つけます 。 — J'allume le feu de camp avec une **allumette**. |

**Mécanique**

- word : `"マッチ"`
- readings : `[{"kana":"まっち","romaji":"macchi","furigana":"マッチ","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le match sportif se dit 試合."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Allumette** | habitat_vie_domestique › accessoires_domestiques | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>昔<rt>むかし</rt></ruby> は マッチ を <ruby>使<rt>つか</rt></ruby>って キャンプ の <ruby>火<rt>ひ</rt></ruby> を つけました — Autrefois, on utilisait des **allumettes** pour allumer le feu de camp.
- この ストーブ は マッチ を <ruby>使<rt>つか</rt></ruby>わずに、<ruby>簡単<rt>かんたん</rt></ruby> に スイッチ で つきます — Ce poêle s'allume facilement avec un interrupteur, sans avoir besoin d'**allumettes**.
- キャンプ の <ruby>準備<rt>じゅんび</rt></ruby> として、<ruby>念<rt>ねん</rt></ruby> の ため マッチ と ろうそく を <ruby>持<rt>も</rt></ruby>っていきます — En guise de préparatifs pour le camping, j'emporte des **allumettes** et des bougies au cas où.

### n5_v_202 → v_202 · エレベーター

**Statut** : PROPOSITION, non validée

- **A2-04-D0254** (decision, tags) : Aucun candidat hérité ; lieu_gare et lieu_hotel ajoutés : on cherche l'ascenseur pour s'orienter dans une gare comme à l'arrivée à l'hôtel (エレベーターはどこですか). — avant `[]` → après `["lieu_gare","lieu_hotel"]`
- **A2-04-D0255** (abandon, senses) : Pas équivalent. — avant `["Monte-charge"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | エレベーター · えれべーたー · erebeetaa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › appareils |
| sens | Ascenseur ; Monte-charge |
| nuance | Mot en katakana issu de l'anglais (elevator). Compteur spécifique : <ruby>基<rt>き</rt></ruby> (ki). |
| particules |  |
| furigana | エレベーター |
| exemple | <ruby>次<rt>つぎ</rt></ruby> の <ruby>階<rt>かい</rt></ruby> へ <ruby>行<rt>い</rt></ruby>く ため に エレベーター に <ruby>乗<rt>の</rt></ruby>ります 。 — Je prends l'**ascenseur** pour aller à l'étage suivant. |

**Mécanique**

- word : `"エレベーター"`
- readings : `[{"kana":"えれべーたー","romaji":"erebeetaa","furigana":"エレベーター","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_gare","lieu_hotel"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Ascenseur** | environnement_construit_espaces_humains › elements_architecturaux | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>重<rt>おも</rt></ruby>い <ruby>荷物<rt>にもつ</rt></ruby> が ある ので、<ruby>階段<rt>かいだん</rt></ruby> ではなく エレベーター を <ruby>使<rt>つか</rt></ruby>います — Comme j'ai des bagages lourds, j'utilise l'**ascenseur** plutôt que les escaliers.
- この <ruby>建物<rt>たてもの</rt></ruby> は 10 <ruby>階<rt>かい</rt></ruby> まで ある ので、エレベーター が とても <ruby>便利<rt>べんり</rt></ruby> です — Ce bâtiment a jusqu'à 10 étages, donc l'**ascenseur** est très pratique.
- お<ruby>年寄<rt>としよ</rt></ruby>り や <ruby>体<rt>からだ</rt></ruby> の <ruby>不自由<rt>ふじゆう</rt></ruby>な <ruby>方<rt>かた</rt></ruby> の ため に、エレベーター は いつも <ruby>清潔<rt>せいけつ</rt></ruby> に <ruby>保<rt>たも</rt></ruby>たれて います — Pour les personnes âgées ou à mobilité réduite, l'**ascenseur** est toujours maintenu propre.

### n5_v_207 → v_207 · いす

**Statut** : PROPOSITION, non validée

- **A2-04-D0267** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0268** (decision, writings) : 椅子 est la graphie en kanji de いす (documentée par la nuance de la source) : variante kana / kanji. — avant `null` → après `["椅子"]`
- **A2-04-D0269** (abandon, senses) : Pas équivalent. — avant `["Tabouret"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | いす · いす · isu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › mobilier |
| sens | Chaise ; Siège ; Tabouret |
| nuance | Nom s'écrivant parfois en kanji <ruby>椅子<rt>いす</rt></ruby> (isu), mais très fréquemment en hiragana. Compteur spécifique : <ruby>脚<rt>きゃく</rt></ruby> (kyaku). |
| particules |  |
| furigana | いす |
| exemple | テーブル の <ruby>前<rt>まえ</rt></ruby> に いす を <ruby>置<rt>お</rt></ruby>きます 。 — Je place une **chaise** devant la table. |

**Mécanique**

- word : `"いす"`
- readings : `[{"kana":"いす","romaji":"isu","furigana":"いす","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[{"form":"椅子","furigana":"<ruby>椅子<rt>いす</rt></ruby>"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Chaise** (Siège) | habitat_vie_domestique › mobilier › assises | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>机<rt>つくえ</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> の いす に <ruby>座<rt>すわ</rt></ruby>って、<ruby>勉強<rt>べんきょう</rt></ruby> を <ruby>始<rt>はじ</rt></ruby>めました — Je me suis assis sur la **chaise** devant le bureau et j'ai commencé à étudier.
- この いす は クッション が やわらかくて、<ruby>長<rt>なが</rt></ruby>く <ruby>座<rt>すわ</rt></ruby>っても <ruby>疲<rt>つか</rt></ruby>れません — Cette **chaise** a un coussin moelleux, on ne se fatigue pas même en restant assis longtemps.
- <ruby>部屋<rt>へや</rt></ruby> の <ruby>掃除<rt>そうじ</rt></ruby> を する ため に、いす を ちょっと <ruby>動<rt>うご</rt></ruby>かしました — J'ai bougé un peu la **chaise** pour faire le ménage dans la chambre.

### n5_v_208 → v_208 · お風呂

**Statut** : PROPOSITION, non validée

- **A2-04-D0256** (decision, senses) : Deux sens documentés par la source : prendre un bain (お風呂に入る) et la pièce, deux référents distincts. — avant `["Bain","Salle de bain","Baignoire"]` → après `["S1 Bain (le fait de se baigner)","S2 Salle de bain"]`
- **A2-04-D0257** (abandon, senses) : La baignoire elle-même se dit 浴槽 ; non reprise. — avant `["Baignoire"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | お風呂 · おふろ · ofuro |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › hygiene |
| sens | Bain ; Salle de bain ; Baignoire |
| nuance | Nom précédé du préfixe honorifique お (o-), désignant la salle de bain ou le bain traditionnel japonais. Compteur spécifique : <ruby>回<rt>かい</rt></ruby> (kai) pour les bains pris. |
| particules |  |
| furigana | お<ruby>風呂<rt>ふろ</rt></ruby> |
| exemple | <ruby>夜<rt>よる</rt></ruby> お<ruby>風呂<rt>ふろ</rt></ruby> に <ruby>入<rt>はい</rt></ruby>ります 。 — Je prends un **bain** le soir. |

**Mécanique**

- word : `"お風呂"`
- readings : `[{"kana":"おふろ","romaji":"ofuro","furigana":"お<ruby>風呂<rt>ふろ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Forme polie et courante, avec お ; ふろ (風呂) est une autre ENTRY (arbitrage du lot 03)."`
- tags : `["lieu_hotel"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bain** | etre_humain › hygiene_soins_personnels › toilette_corporelle | action |  | お風呂に入る : prendre un bain. |
| 2 | **Salle de bain** | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今日<rt>きょう</rt></ruby> は <ruby>仕事<rt>しごと</rt></ruby> で <ruby>疲<rt>つか</rt></ruby>れた ので、お<ruby>風呂<rt>ふろ</rt></ruby> に ゆっくり <ruby>入<rt>はい</rt></ruby>りたい です — Je suis fatigué par le travail aujourd'hui, alors je veux prendre un long **bain** tranquillement.
- お<ruby>風呂<rt>ふろ</rt></ruby> の <ruby>湯<rt>ゆ</rt></ruby> が <ruby>温<rt>あたた</rt></ruby>かくて、<ruby>入<rt>はい</rt></ruby>る と <ruby>身体<rt>からだ</rt></ruby> の <ruby>痛<rt>いた</rt></ruby>み が <ruby>消<rt>き</rt></ruby>えます — L'eau du **bain** est chaude, et quand on y entre, les douleurs du corps disparaissent.
- お<ruby>風呂<rt>ふろ</rt></ruby> から <ruby>出<rt>で</rt></ruby>た <ruby>後<rt>あと</rt></ruby> で、<ruby>冷<rt>つめ</rt></ruby>たい <ruby>牛乳<rt>ぎゅうにゅう</rt></ruby> を <ruby>飲<rt>の</rt></ruby>む の が <ruby>最高<rt>さいこう</rt></ruby> です — Boire du lait bien frais après être sorti du **bain**, c'est le top.

### n5_v_209 → v_209 · ふろ

**Statut** : PROPOSITION, non validée

- **A2-04-D0258** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. Dans le service hôtelier, on dit お風呂. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0259** (decision, senses) : Mêmes sens que お風呂 (n5_v_208). — avant `["Bain","Baignoire","Salle de bain"]` → après `["S1 Bain","S2 Salle de bain"]`
- **A2-04-D0260** (abandon, senses) : La baignoire elle-même se dit 浴槽. — avant `["Baignoire"]` → après `null`
- **A2-04-D0261** (decision, entrée) : お風呂 et ふろ restent deux ENTRY (arbitrage du lot 03) : comme pour お皿 / 皿, la présence de お change la forme lexicale ; leur proximité pourra être notée par une relation en 5.16. — avant `null` → après `"distincte de n5_v_208"`
- **A2-04-D0262** (decision, writings) : 風呂 est la graphie en kanji de ふろ (documentée par la nuance de la source) : variante kana / kanji. — avant `null` → après `["風呂"]`

| Champ source | Valeur |
|---|---|
| mot, lecture | ふろ · ふろ · furo |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › hygiene |
| sens | Bain ; Baignoire ; Salle de bain |
| nuance | Variante sans le préfixe honorifique de <ruby>風呂<rt>ふろ</rt></ruby> (furo), désignant le bain ou la baignoire de manière plus neutre ou familière. |
| particules |  |
| furigana | ふろ |
| exemple | もう すぐ ふろ が わきます 。 — Le **bain** sera bientôt chaud. |

**Mécanique**

- word : `"ふろ"`
- readings : `[{"kana":"ふろ","romaji":"furo","furigana":"ふろ","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[{"form":"風呂","furigana":"<ruby>風呂<rt>ふろ</rt></ruby>"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Forme sans お, plus neutre ou familière ; お風呂 est une autre ENTRY. Les deux ne sont pas fusionnées : la présence de お n'est pas une différence d'écriture (arbitrage du lot 03)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bain** | etre_humain › hygiene_soins_personnels › toilette_corporelle | action |  | お風呂に入る : prendre un bain. |
| 2 | **Salle de bain** | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- お<ruby>湯<rt>ゆ</rt></ruby> が <ruby>沸<rt>わ</rt></ruby>いた ので、そろそろ ふろ に <ruby>入<rt>はい</rt></ruby>りましょう — L'eau chaude est prête, allons bientôt prendre un **bain**.
- お<ruby>父<rt>とう</rt></ruby>さん が ふろ の <ruby>掃除<rt>そうじ</rt></ruby> を きれいに して くれました — Mon père a bien nettoyé la **salle de bain** (la baignoire/le bain).
- ふろ に <ruby>入<rt>はい</rt></ruby>って <ruby>一<rt>いち</rt></ruby> <ruby>日<rt>にち</rt></ruby> の <ruby>疲<rt>つか</rt></ruby>れ を しっかり <ruby>取<rt>と</rt></ruby>ります — Je prends un **bain** pour bien éliminer la fatigue de la journée.

### n5_v_210 → v_210 · ドア

**Statut** : PROPOSITION, non validée

- **A2-04-D0242** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0243** (abandon, senses) : Le premier est repris dans la nuance ; le second prête à confusion avec 玄関. — avant `["Porte battante","Porte d'entrée"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ドア · どあ · doa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › pieces_maison |
| sens | Porte ; Porte battante ; Porte d'entrée |
| nuance | Mot en katakana issu de l'anglais (door), désignant une porte occidentale (à battant), par opposition à la porte traditionnelle japonaise <ruby>戸<rt>と</rt></ruby> (to) ou <ruby>襖<rt>ふすま</rt></ruby> (fusuma). Compteur spécifique : <ruby>枚<rt>まい</rt></ruby> (mai). |
| particules |  |
| furigana | ドア |
| exemple | さむい ので 、<ruby>部屋<rt>へや</rt></ruby> の ドア を <ruby>閉<rt>し</rt></ruby>めて ください 。 — Il fait froid, veuillez fermer la **porte** de la chambre. |

**Mécanique**

- word : `"ドア"`
- readings : `[{"kana":"どあ","romaji":"doa","furigana":"ドア","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Porte à l'occidentale, à battant ; la porte japonaise, souvent coulissante, se dit 戸."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Porte** | environnement_construit_espaces_humains › elements_architecturaux › portes_fenetres | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>部屋<rt>へや</rt></ruby> に <ruby>入<rt>はい</rt></ruby>る <ruby>前<rt>まえ</rt></ruby> に、ドア を ノック して ください — Veuillez frapper à la **porte** avant d'entrer dans la chambre.
- <ruby>風<rt>かぜ</rt></ruby> が <ruby>強<rt>つよ</rt></ruby>かった ので、<ruby>玄関<rt>げんかん</rt></ruby> の ドア が <ruby>音<rt>おと</rt></ruby> を たてて りました — Comme le vent soufflait fort, la **porte** de l'entrée faisait du bruit.
- <ruby>出掛<rt>でか</rt></ruby>ける とき は、<ruby>安全<rt>あんぜん</rt></ruby> の ため に ドア の <ruby>鍵<rt>かぎ</rt></ruby> を かけて ください — Lorsque vous sortez, veuillez verrouiller la **porte** pour des raisons de sécurité.

### n5_v_212 → v_212 · ベッド

**Statut** : PROPOSITION, non validée

- **A2-04-D0270** (abandon, senses) : Trop général. — avant `["Couchage"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ベッド · べっど · beddo |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › mobilier |
| sens | Lit ; Couchage |
| nuance | Mot en katakana issu de l'anglais (bed), désignant un lit occidental, par opposition au futon traditionnel <ruby>布団<rt>ふとん</rt></ruby> (futon). Compteur spécifique : <ruby>台<rt>だい</rt></ruby> (dai) ou <ruby>床<rt>ゆか</rt></ruby> (yuka). |
| particules |  |
| furigana | ベッド |
| exemple | <ruby>夜<rt>よる</rt></ruby> おそく ベッド に <ruby>入<rt>はい</rt></ruby>ります 。 — Je vais au **lit** tard le soir. |

**Mécanique**

- word : `"ベッド"`
- readings : `[{"kana":"べっど","romaji":"beddo","furigana":"ベッド","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lit à l'occidentale ; le couchage traditionnel se dit 布団."`
- tags : `["lieu_hotel"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Lit** | habitat_vie_domestique › mobilier › couchage | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>夜<rt>よる</rt></ruby> おそくまで <ruby>勉強<rt>べんきょう</rt></ruby> して いた ので、ベッド に <ruby>入<rt>はい</rt></ruby>ると すぐに <ruby>眠<rt>ねむ</rt></ruby>ってしまいました — J'ai étudié tard le soir, alors sitôt couché dans le **lit**, je me suis endormi.
- この ベッド は マットレス が とても <ruby>快適<rt>かいてき</rt></ruby> で、<ruby>朝<rt>あさ</rt></ruby> まで ぐっすり <ruby>眠<rt>ねむ</rt></ruby>れます — Le matelas de ce **lit** est très confortable, on y dort profondément jusqu'au matin.
- <ruby>朝<rt>あさ</rt></ruby> <ruby>起<rt>お</rt></ruby>きた <ruby>後<rt>あと</rt></ruby>、<ruby>部屋<rt>へや</rt></ruby> を きれいに する ため に ベッド を <ruby>整<rt>ととの</rt></ruby>えました — Après m'être réveillé le matin, j'ai fait le **lit** pour ranger la chambre.

### n5_v_214 → v_214 · 入口

**Statut** : PROPOSITION, non validée

- **A2-04-D0236** (decision, tags) : lieu_hotel écarté ; lieu_gare ajouté hors des candidats : Vocabulaire d'action propre à la gare (s'orienter, trouver un service), 入口 et 出口 balisent toute gare. — avant `["lieu_hotel"]` → après `["lieu_gare"]`
- **A2-04-D0237** (correction, readings) : Les furigana de la source étaient ceux de la graphie 入り口, pas de la forme usuelle 入口. — avant `"<ruby>入<rt>い</rt></ruby>り<ruby>口<rt>ぐち</rt></ruby>"` → après `"<ruby>入<rt>いり</rt></ruby><ruby>口<rt>ぐち</rt></ruby>"`
- **A2-04-D0238** (decision, writings) : 入り口 est une autre graphie du même mot (okurigana), sans changement de forme lexicale : ajoutée à writings. — avant `null` → après `["入り口"]`
- **A2-04-D0239** (abandon, senses) : Pas équivalent : 入口 désigne l'accès, pas la porte. — avant `["Porte d'entrée"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 入口 · いりぐち · iriguchi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › pieces_maison |
| sens | Entrée ; Porte d'entrée ; Accès |
| nuance | Nom composé de <ruby>入<rt>はい</rt></ruby>る (hairu) et de <ruby>口<rt>くち</rt></ruby> (kuchi) signifiant la bouche ou l'ouverture (contraire de <ruby>出口<rt>でぐち</rt></ruby> - deguchi). |
| particules |  |
| furigana | <ruby>入<rt>い</rt></ruby>り<ruby>口<rt>ぐち</rt></ruby> |
| exemple | <ruby>駅<rt>えき</rt></ruby> の **<ruby>入口<rt>いりぐち</rt></ruby>** で ともだち と まちます 。 — J'attends un ami à l'**entrée** de la gare. |

**Mécanique**

- word : `"入口"`
- grammatical_class : `"nom"`
- group : `"nom"`
- readings : **exception**, furigana incohérents avec la forme
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- readings : `[{"kana":"いりぐち","romaji":"iriguchi","furigana":"<ruby>入<rt>いり</rt></ruby><ruby>口<rt>ぐち</rt></ruby>","default":true,"note":null}]`
- writings : `[{"form":"入り口","furigana":"<ruby>入<rt>い</rt></ruby>り<ruby>口<rt>ぐち</rt></ruby>"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'endroit par où l'on entre ; contraire : 出口."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Entrée** (Accès) | environnement_construit_espaces_humains › elements_architecturaux | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>映画館<rt>えいがかん</rt></ruby> の <ruby>入口<rt>いりぐち</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> で <ruby>友達<rt>ともだち</rt></ruby> と <ruby>待<rt>ま</rt></ruby>ち<ruby>合<rt>あ</rt></ruby>わせを しています — Je donne rendez-vous à un ami devant l'entrée du cinéma.
- <ruby>建物<rt>たてもの</rt></ruby> の <ruby>入口<rt>いりぐち</rt></ruby> に <ruby>大<rt>おお</rt></ruby>きな <ruby>看板<rt>かんばん</rt></ruby> が <ruby>立<rt>た</rt></ruby>って います — Une grande enseigne se dresse à l'entrée du bâtiment.
- <ruby>混雑<rt>こんざつ</rt></ruby> を <ruby>避<rt>さ</rt></ruby>ける ため に、<ruby>別<rt>べつ</rt></ruby> の <ruby>入口<rt>いりぐち</rt></ruby> から <ruby>会場<rt>かいじょう</rt></ruby> に <ruby>入<rt>はい</rt></ruby>りました — Pour éviter la foule, je suis entré dans la salle par une autre entrée.

### n5_v_217 → v_217 · 庭

**Statut** : PROPOSITION, non validée

- **A2-04-D0232** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0233** (abandon, senses) : Définition, pas une traduction. — avant `["Espace extérieur privé"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 庭 · にわ · niwa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › pieces_maison |
| sens | Jardin ; Cour ; Espace extérieur privé |
| nuance | Nom désignant un jardin, qu'il soit de style traditionnel japonais ou occidental. Compteur spécifique : <ruby>箇所<rt>かしょ</rt></ruby> (kasho) ou <ruby>つ<rt>つ</rt></ruby> (tsu). |
| particules |  |
| furigana | <ruby>庭<rt>にわ</rt></ruby> |
| exemple | <ruby>猫<rt>ねこ</rt></ruby> が **<ruby>庭<rt>にわ</rt></ruby>** で <ruby>走<rt>はし</rt></ruby>って います 。 — Un chat court dans le **jardin**. |

**Mécanique**

- word : `"庭"`
- readings : `[{"kana":"にわ","romaji":"niwa","furigana":"<ruby>庭<rt>にわ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Jardin** (Cour) | habitat_vie_domestique › espaces_domestiques › espaces_exterieurs_domestiques | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- うち の <ruby>庭<rt>にわ</rt></ruby> に たくさんの <ruby>綺麗<rt>きれい</rt></ruby>な <ruby>花<rt>はな</rt></ruby> を <ruby>植<rt>う</rt></ruby>えました — J'ai planté beaucoup de jolies fleurs dans le **jardin** de notre maison.
- <ruby>朝<rt>あさ</rt></ruby>、<ruby>庭<rt>にわ</rt></ruby> の <ruby>草花<rt>くさばな</rt></ruby> に <ruby>水<rt>みず</rt></ruby> を やる の が <ruby>日課<rt>にっか</rt></ruby> です — Arroser les plantes du **jardin** le matin est ma routine quotidienne.
- <ruby>天気<rt>てんき</rt></ruby> が よい ので、<ruby>日曜日<rt>にちようび</rt></ruby> の お<ruby>昼<rt>ひる</rt></ruby> は <ruby>庭<rt>にわ</rt></ruby> で <ruby>食事<rt>しょくじ</rt></ruby> を します — Comme il fait beau, nous mangeons dans le **jardin** le dimanche midi.

### n5_v_218 → v_218 · 戸

**Statut** : PROPOSITION, non validée

- **A2-04-D0244** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0245** (abandon, senses) : Terme technique ; non repris. — avant `["Vantail"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 戸 · と · to |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › pieces_maison |
| sens | Porte (style japonais) ; Porte coulissante ; Vantail |
| nuance | Nom désignant spécifiquement une porte traditionnelle japonaise (coulissante ou battante en bois), par opposition à la porte occidentale <ruby>ドア<rt>どあ</rt></ruby> (doa). Compteur spécifique : <ruby>枚<rt>まい</rt></ruby> (mai). |
| particules |  |
| furigana | <ruby>戸<rt>と</rt></ruby> |
| exemple | あさ に なったら 、<ruby>部屋<rt>へや</rt></ruby> の **<ruby>戸<rt>と</rt></ruby>** を <ruby>開<rt>あ</rt></ruby>けます 。 — Quand le matin arrive, j'ouvre la **porte** de la chambre. |

**Mécanique**

- word : `"戸"`
- readings : `[{"kana":"と","romaji":"to","furigana":"<ruby>戸<rt>と</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Porte traditionnelle japonaise ; la porte occidentale se dit ドア."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Porte (japonaise)** (Porte coulissante) | environnement_construit_espaces_humains › elements_architecturaux › portes_fenetres | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>和室<rt>わしつ</rt></ruby> の 戸 を <ruby>静<rt>しず</rt></ruby>かに <ruby>開<rt>あ</rt></ruby>けて、<ruby>部屋<rt>へや</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に <ruby>入<rt>はい</rt></ruby>りました — J'ai ouvert doucement la **porte** de la pièce de style japonais et je suis entré dans la pièce.
- <ruby>風<rt>かぜ</rt></ruby> を <ruby>通<rt>とお</rt></ruby>す ため に、<ruby>家<rt>いえ</rt></ruby> の <ruby>戸<rt>と</rt></ruby> を すべて <ruby>開<rt>あ</rt></ruby>けました — J'ai ouvert toutes les **portes** de la maison pour faire circuler l'air.
- <ruby>夜<rt>よる</rt></ruby> に なったら、<ruby>防犯<rt>ぼうはん</rt></ruby> の ため に 戸 を しっかり <ruby>閉<rt>し</rt></ruby>めて ください — Quand la nuit tombe, veuillez fermer la **porte** solidement pour la sécurité.

### n5_v_219 → v_219 · 掃除

**Statut** : PROPOSITION, non validée

- **A2-04-D0287** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0288** (fusion, entrée) : 掃除する est la réalisation en する du nom verbal 掃除, sans identité lexicale distincte : fusion dans 掃除, qui reçoit suru_compatible: true (arbitrage du lot 03). Règle transversale : on fusionne une forme en する avec son nom quand elle n'apporte pas d'identité lexicale propre ; chaque cas futur est examiné selon ce critère. — avant `null` → après `"n5_v_219"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 掃除 · そうじ · souji |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › menage |
| sens | Nettoyage ; Ménage |
| nuance | Nom composé de <ruby>掃<rt>そう</rt></ruby> (balayer) et de <ruby>除<rt>じ</rt></ruby> (éliminer/nettoyer), désignant l'action de faire le ménage. Souvent combiné avec le verbe する (suru) pour former le verbe correspondant. |
| particules |  |
| furigana | <ruby>掃除<rt>そうじ</rt></ruby> |
| exemple | まいあさ <ruby>部屋<rt>へや</rt></ruby> の **<ruby>掃除<rt>そうじ</rt></ruby>** を します 。 — Je fais le **ménage** de la chambre tous les matins. |

**Mécanique**

- word : `"掃除"`
- readings : `[{"kana":"そうじ","romaji":"souji","furigana":"<ruby>掃除<rt>そうじ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `true`
- suffix : `false`
- counter : `null`
- nuance : `"掃除する : faire le ménage, nettoyer."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Ménage** (Nettoyage) | habitat_vie_domestique › entretien_domestique › nettoyage | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>週末<rt>しゅうまつ</rt></ruby> に は、<ruby>家族<rt>かぞく</rt></ruby> みんな で <ruby>部屋<rt>へや</rt></ruby> の <ruby>掃除<rt>そうじ</rt></ruby> を します — Le week-end, toute la famille fait le **ménage** de la chambre.
- <ruby>大掃除<rt>おおそうじ</rt></ruby> を して、<ruby>家中<rt>いえじゅう</rt></ruby> の ゴミ を すべて <ruby>片付<rt>かたづ</rt></ruby>けました — J'ai fait le grand **ménage** et j'ai débarrassé tous les déchets de toute la maison.
- <ruby>毎日<rt>まいにち</rt></ruby> 少しずつ <ruby>掃除<rt>そうじ</rt></ruby> を すると、<ruby>部屋<rt>へや</rt></ruby> が いつも きれいに <ruby>保<rt>たも</rt></ruby>てます — En faisant un peu de **ménage** chaque jour, la chambre reste toujours propre.

### n5_v_220 → v_220 · 掃除する

**Statut** : PROPOSITION, non validée

- **A2-04-D0288** (fusion, entrée) : 掃除する est la réalisation en する du nom verbal 掃除, sans identité lexicale distincte : fusion dans 掃除, qui reçoit suru_compatible: true (arbitrage du lot 03). Règle transversale : on fusionne une forme en する avec son nom quand elle n'apporte pas d'identité lexicale propre ; chaque cas futur est examiné selon ce critère. — avant `null` → après `"n5_v_219"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 掃除する · そうじする · soujisuru |
| type, group | verbe suru · irrégulier |
| catégorie (ancienne, indicative) | maison_quotidien › menage |
| sens | Nettoyer ; Faire le ménage |
| nuance | Verbe suru (verbe en -suru) formé à partir du nom <ruby>掃除<rt>そうじ</rt></ruby> (souji) et du verbe auxiliaire する, désignant l'action de nettoyer ou de ranger un espace. |
| particules | を |
| furigana | <ruby>掃除<rt>そうじ</rt></ruby>する |
| exemple | きょう は <ruby>一日中<rt>いちにちじゅう</rt></ruby> リビング を **<ruby>掃除<rt>そうじ</rt></ruby>します** 。 — Aujourd'hui, je **nettoie** le salon toute la journée. |

**Mécanique**

- word : `"掃除する"`
- readings : `[{"kana":"そうじする","romaji":"soujisuru","furigana":"<ruby>掃除<rt>そうじ</rt></ruby>する","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"irrégulier"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Retrait** : fusion dans n5_v_219

**Contexte (anciens exemples, lecture seule)**

- きょう は <ruby>時間<rt>じかん</rt></ruby> が ある ので、<ruby>部屋<rt>へや</rt></ruby> の <ruby>中<rt>なか</rt></ruby> を しっかり <ruby>掃除<rt>そうじ</rt></ruby>する つもり です — Comme j'ai du temps aujourd'hui, j'ai l'intention de bien **nettoyer** l'intérieur de la chambre.
- ペット を <ruby>飼<rt>か</rt></ruby>っている ので、<ruby>毎日<rt>まいにち</rt></ruby> <ruby>床<rt>ゆか</rt></ruby> を 掃除する <ruby>必要<rt>ひつよう</rt></ruby> が あります — Comme j'ai un animal de compagnie, il est nécessaire de **nettoyer** le sol tous les jours.
- ゲスト が <ruby>来<rt>く</rt></ruby>る <ruby>前<rt>まえ</rt></ruby> に、リビング の <ruby>方<rt>ほう</rt></ruby> を きれいに 掃除して おきました — Avant que les invités n'arrivent, j'avais bien **nettoyé** la partie du salon.

### n5_v_221 → v_221 · 洗う

**Statut** : PROPOSITION, non validée

- **A2-04-D0291** (abandon, senses) : Le premier n'est pas équivalent ; le second est repris dans la nuance. — avant `["Rincer","Nettoyer à l'eau"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 洗う · あらう · arau |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › vie_quotidienne |
| sens | Laver ; Rincer ; Nettoyer à l'eau |
| nuance | Verbe <ruby>五段<rt>ごだん</rt></ruby> (godan) désignant l'action de laver des objets, des vêtements ou des aliments avec de l'eau. |
| particules | を |
| furigana | <ruby>洗<rt>あら</rt></ruby>う |
| exemple | <ruby>食事<rt>しょくじ</rt></ruby> の あと で <ruby>皿<rt>さら</rt></ruby> を **<ruby>洗<rt>あら</rt></ruby>います** 。 — Je **lave** les assiettes après le repas. |

**Mécanique**

- word : `"洗う"`
- readings : `[{"kana":"あらう","romaji":"arau","furigana":"<ruby>洗<rt>あら</rt></ruby>う","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Laver avec de l'eau : les mains, la vaisselle, les légumes."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Laver** | habitat_vie_domestique › entretien_domestique › nettoyage | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>食後<rt>しょくご</rt></ruby> に、<ruby>台所<rt>だいどころ</rt></ruby> で たくさんの <ruby>皿<rt>さら</rt></ruby> や コップ を <ruby>洗<rt>あら</rt></ruby>いました — Après le repas, j'ai **lavé** beaucoup d'assiettes et de tasses dans la cuisine.
- <ruby>汚<rt>よご</rt></ruby>れた シャツ を <ruby>水<rt>みず</rt></ruby> と <ruby>洗剤<rt>せんざい</rt></ruby> で しっかり <ruby>洗<rt>あら</rt></ruby>って ください — Veuillez bien **laver** la chemise sale avec de l'eau et de la vaisselle/lessive.
- <ruby>料理<rt>りょうり</rt></ruby> を <ruby>作<rt>つく</rt></ruby>る <ruby>前<rt>まえ</rt></ruby> に、かならず <ruby>石鹸<rt>せっけん</rt></ruby> で <ruby>手<rt>て</rt></ruby> を <ruby>洗<rt>あら</rt></ruby>います — Avant de cuisiner, je me **lave** toujours les mains avec du savon.

### n5_v_222 → v_222 · 窓

**Statut** : PROPOSITION, non validée

- **A2-04-D0246** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0247** (decision, senses) : Un seul sens, « fenêtre ». — avant `["Fenêtre","Ouverture","Guichet"]` → après `"un seul sens"`
- **A2-04-D0248** (correction, senses) : « Guichet » est le sens de 窓口, autre mot : confusion de la source, non reprise comme sens de 窓. — avant `"Guichet"` → après `null`
- **A2-04-D0249** (abandon, senses) : Trop général. — avant `["Ouverture"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 窓 · まど · mado |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › pieces_maison |
| sens | Fenêtre ; Ouverture ; Guichet |
| nuance | Nom désignant une fenêtre ou un guichet. Compteur spécifique : <ruby>枚<rt>まい</rt></ruby> (mai). |
| particules |  |
| furigana | <ruby>窓<rt>まど</rt></ruby> |
| exemple | あさ に なったら 、<ruby>部屋<rt>へや</rt></ruby> の **<ruby>窓<rt>まど</rt></ruby>** を <ruby>開<rt>あ</rt></ruby>けます 。 — Quand le matin arrive, j'ouvre la **fenêtre** de la chambre. |

**Mécanique**

- word : `"窓"`
- readings : `[{"kana":"まど","romaji":"mado","furigana":"<ruby>窓<rt>まど</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Fenêtre** | environnement_construit_espaces_humains › elements_architecturaux › portes_fenetres | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>部屋<rt>へや</rt></ruby> の <ruby>窓<rt>まど</rt></ruby> を <ruby>開<rt>あ</rt></ruby>けて、<ruby>新鮮<rt>しんせん</rt></ruby> な <ruby>空気<rt>くうき</rt></ruby> を <ruby>入<rt>い</rt></ruby>れました — J'ai ouvert la **fenêtre** de la chambre pour laisser entrer l'air frais.
- <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>ってきた ので、あわてて <ruby>窓<rt>まど</rt></ruby> を <ruby>閉<rt>し</rt></ruby>めました — Comme il a commencé à pleuvoir, j'ai fermé la **fenêtre** en hâte.
- <ruby>窓<rt>まど</rt></ruby> から <ruby>外<rt>そと</rt></ruby> を <ruby>見<rt>み</rt></ruby>ると、<ruby>綺麗<rt>きれい</rt></ruby>な <ruby>夕日<rt>ゆうひ</rt></ruby> が <ruby>見<rt>み</rt></ruby>えました — En regardant dehors par la **fenêtre**, j'ai pu voir un beau coucher de soleil.

### n5_v_224 → v_224 · 部屋

**Statut** : PROPOSITION, non validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 部屋 · へや · heya |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › pieces_maison |
| sens | Chambre ; Pièce ; Salle |
| nuance | Nom composé de <ruby>部<rt>ぶ</rt></ruby> (partie/section) et de <ruby>屋<rt>や</rt></ruby> (magasin/bâtiment), désignant une pièce ou une chambre. Compteur spécifique : <ruby>間<rt>ま</rt></ruby> (ma) ou <ruby>部屋<rt>へや</rt></ruby> (heya). |
| particules |  |
| furigana | <ruby>部<rt>へ</rt></ruby><ruby>屋<rt>や</rt></ruby> |
| exemple | わたし の **<ruby>部屋<rt>へや</rt></ruby>** は とても <ruby>広<rt>ひろ</rt></ruby>い です 。 — Ma **chambre** est très grande. |

**Mécanique**

- word : `"部屋"`
- readings : `[{"kana":"へや","romaji":"heya","furigana":"<ruby>部<rt>へ</rt></ruby><ruby>屋<rt>や</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Toute pièce d'une habitation ; à l'hôtel, la chambre."`
- tags : `["lieu_hotel"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Pièce** (Chambre, Salle) | habitat_vie_domestique › espaces_domestiques | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>学校<rt>がっこう</rt></ruby> から <ruby>帰<rt>かえ</rt></ruby>った <ruby>後<rt>あと</rt></ruby>、自分の <ruby>部屋<rt>へや</rt></ruby> で <ruby>宿題<rt>しゅくだい</rt></ruby> を します — Après être rentré de l'école, je fais mes devoirs dans ma **chambre**.
- この <ruby>部屋<rt>へや</rt></ruby> は <ruby>日当<rt>ひなた</rt></ruby>り が よくて、とても <ruby>温<rt>あたた</rt></ruby>かい です — Cette **chambre** est bien exposée au soleil et elle est très chaleureuse.
- ゲスト が <ruby>泊<rt>と</rt></ruby>まる ため に、<ruby>客間<rt>きゃくま</rt></ruby> の <ruby>部屋<rt>へや</rt></ruby> を きれいに <ruby>片付<rt>かたづ</rt></ruby>けました — J'ai bien rangé la **chambre** d'amis pour qu'un invité puisse y loger.

### n5_v_229 → v_229 · ちり紙

**Statut** : PROPOSITION, non validée

- **A2-04-D0281** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0282** (abandon, senses) : Redondant. — avant `["Papier toilette"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ちり紙 · ちりがみ · chirigami |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › objets_maison |
| sens | Papier hygiénique ; Papier mouchoir ; Papier toilette |
| nuance | Nom composé de ちり (poussière/déchets) et de <ruby>紙<rt>かみ</rt></ruby> (kami - papier), désignant historiquement le papier de soie ou le papier multi-usage (mouchoir ou papier toilette). Compteur spécifique : <ruby>巻<rt>かん</rt></ruby> (kan) ou <ruby>枚<rt>まい</rt></ruby> (mai). |
| particules |  |
| furigana | ちり<ruby>紙<rt>かみ</rt></ruby> |
| exemple | トイレ に ちり紙 が あります 。 — Il y a du **papier hygiénique** aux toilettes. |

**Mécanique**

- word : `"ちり紙"`
- readings : `[{"kana":"ちりがみ","romaji":"chirigami","furigana":"ちり<ruby>紙<rt>かみ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Terme un peu vieilli : on dit aujourd'hui トイレットペーパー ou ティッシュ."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Papier hygiénique** (Papier mouchoir) | habitat_vie_domestique › accessoires_domestiques | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>手<rt>て</rt></ruby> や <ruby>口<rt>くち</rt></ruby> の <ruby>汚<rt>よご</rt></ruby>れ を <ruby>拭<rt>ふ</rt></ruby>き<ruby>取<rt>と</rt></ruby>る ため に、ちり<ruby>紙<rt>がみ</rt></ruby> を <ruby>1枚<rt>いちまい</rt></ruby> <ruby>取<rt>と</rt></ruby>りました — J'ai pris une feuille de **papier hygiénique** (papier mouchoir) pour essuyer la saleté de mes mains ou de ma bouche.
- <ruby>昔<rt>むかし</rt></ruby> は ポケット に ちり<ruby>紙<rt>がみ</rt></ruby> を <ruby>常<rt>つね</rt></ruby>に <ruby>持<rt>も</rt></ruby>ち<ruby>歩<rt>ある</rt></ruby>いて いました — Autrefois, je transportais toujours du **papier hygiénique** dans ma poche.
- <ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に こぼした <ruby>水<rt>みず</rt></ruby> を、ちり<ruby>紙<rt>がみ</rt></ruby> で きれいに <ruby>吸<rt>す</rt></ruby>い<ruby>取<rt>と</rt></ruby>りました — J'ai bien absorbé l'eau renversée sur le bureau avec du **papier hygiénique**.

### n5_v_233 → v_233 · ポスト

**Statut** : PROPOSITION, non validée

- **A2-04-D0283** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0284** (correction, senses) : Traduction erronée : ポスト a aussi le sens de « poste, fonction », un autre emploi de l'emprunt, hors N5. « Pilier » ne correspond à rien : non repris. — avant `"Pilier (métier, figuratif)"` → après `null`
- **A2-04-D0285** (abandon, senses) : Pas équivalent : la boîte postale est un service de la poste. — avant `["Boîte postale"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ポスト · ぽすと · posuto |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › objets_maison |
| sens | Boîte aux lettres ; Boîte postale ; Pilier (métier, figuratif) |
| nuance | Mot en katakana issu de l'anglais (post), désignant une boîte aux lettres de rue ou personnelle. Compteur spécifique : <ruby>個<rt>こ</rt></ruby> (ko) ou <ruby>台<rt>だい</rt></ruby> (dai). |
| particules |  |
| furigana | ポスト |
| exemple | ポスト に てがみ を <ruby>入<rt>はい</rt></ruby>れます 。 — Je mets la lettre dans la **boîte aux lettres**. |

**Mécanique**

- word : `"ポスト"`
- readings : `[{"kana":"ぽすと","romaji":"posuto","furigana":"ポスト","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Boîte aux lettres de rue (pour poster) ou de la maison."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Boîte aux lettres** | communication_langage › communication › transmission | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- おいしい <ruby>手紙<rt>てがみ</rt></ruby> を <ruby>書<rt>か</rt></ruby>いた ので、<ruby>近<rt>ちか</rt></ruby>く の ポスト に <ruby>投函<rt>とうかん</rt></ruby> しました — J'ai écrit une lettre importante, alors je l'ai postée dans la **boîte aux lettres** voisine.
- この <ruby>手紙<rt>てがみ</rt></ruby> は <ruby>明日<rt>あした</rt></ruby> の <ruby>朝<rt>あさ</rt></ruby> まで に ポスト に <ruby>出<rt>だ</rt></ruby>さなければ なりません — Je dois mettre cette lettre dans la **boîte aux lettres** avant demain matin.
- <ruby>角<rt>かど</rt></ruby> を <ruby>曲<rt>ま</rt></ruby>がった ところ に <ruby>赤<rt>あか</rt></ruby>い ポスト が <ruby>立<rt>た</rt></ruby>って います — Il y a une **boîte aux lettres** rouge plantée juste après avoir tourné le coin.

### n5_v_236 → v_236 · 箱

**Statut** : PROPOSITION, non validée

- **A2-04-D0279** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0280** (abandon, senses) : Pas équivalent. — avant `["Coffret"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 箱 · はこ · hako |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › objets_maison |
| sens | Boîte ; Coffret ; Carton |
| nuance | Nom désignant une boîte, un coffret ou un carton de rangement. Compteur spécifique : <ruby>個<rt>こ</rt></ruby> (ko) ou <ruby>つ<rt>つ</rt></ruby> (tsu). |
| particules |  |
| furigana | <ruby>箱<rt>はこ</rt></ruby> |
| exemple | ふるい もの を **<ruby>箱<rt>はこ</rt></ruby>** に いれます 。 — Je mets les vieilles choses dans une **boîte**. |

**Mécanique**

- word : `"箱"`
- readings : `[{"kana":"はこ","romaji":"hako","furigana":"<ruby>箱<rt>はこ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Boîte** (Carton) | habitat_vie_domestique › rangement | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>使<rt>つか</rt></ruby>わない <ruby>服<rt>ふく</rt></ruby> や <ruby>本<rt>ほん</rt></ruby> を <ruby>大<rt>おお</rt></ruby>きな 箱 に <ruby>入<rt>い</rt></ruby>れて <ruby>片付<rt>かたづ</rt></ruby>けました — J'ai rangé les vêtements et les livres que je n'utilise pas en les mettant dans une grande **boîte**.
- プレゼント の <ruby>中身<rt>なかみ</rt></ruby> が わからない ように、<ruby>綺麗<rt>きれい</rt></ruby>な <ruby>包装紙<rt>ほうそうし</rt></ruby> で 箱 を <ruby>包<rt>つつ</rt></ruby>みました — J'ai emballé la **boîte** avec du beau papier cadeau pour qu'on ne devine pas le contenu du présent.
- この 箱 は とても <ruby>頑丈<rt>がんじょう</rt></ruby> なので、<ruby>重<rt>おも</rt></ruby>い <ruby>荷物<rt>にもつ</rt></ruby> を <ruby>送<rt>おく</rt></ruby>る とき に <ruby>便利<rt>べんり</rt></ruby> です — Cette **boîte** est très solide, ce qui est pratique pour envoyer des bagages lourds.

### n5_v_237 → v_237 · 紙

**Statut** : PROPOSITION, non validée

- **A2-04-D0278** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 紙 · かみ · kami |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › objets_maison |
| sens | Papier ; Feuille de papier |
| nuance | Nom désignant le papier au sens général ou une feuille de papier. Compteur spécifique : <ruby>枚<rt>まい</rt></ruby> (mai). |
| particules |  |
| furigana | <ruby>紙<rt>かみ</rt></ruby> |
| exemple | **<ruby>紙<rt>かみ</rt></ruby>** に なまえ を かきます 。 — J'écris mon nom sur du **papier**. |

**Mécanique**

- word : `"紙"`
- readings : `[{"kana":"かみ","romaji":"kami","furigana":"<ruby>紙<rt>かみ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le papier, ou une feuille (1枚の紙). Ne pas confondre avec 髪 (cheveux) et 神 (dieu), homophones."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Papier** (Feuille de papier) | matieres_materiaux › materiaux_organiques › papier | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>大切<rt>たいせつ</rt></ruby>な <ruby>事<rt>こと</rt></ruby> を <ruby>忘<rt>わす</rt></ruby>れない ように、<ruby>紙<rt>かみ</rt></ruby> に メモ を <ruby>書<rt>か</rt></ruby>きました — J'ai écrit un mémo sur du **papier** pour ne pas oublier les choses importantes.
- この <ruby>紙<rt>かみ</rt></ruby> は とても <ruby>薄<rt>うす</rt></ruby>くて <ruby>破<rt>やぶ</rt></ruby>れやすい ので、<ruby>丁寧<rt>ていねい</rt></ruby> に <ruby>扱<rt>あつか</rt></ruby>って ください — Ce **papier** est très fin et se déchire facilement, veuillez le manipuler avec précaution.
- <ruby>子供<rt>こども</rt></ruby> の <ruby>頃<rt>ころ</rt></ruby>、<ruby>白<rt>しろ</rt></ruby>い <ruby>紙<rt>かみ</rt></ruby> で さまざまな <ruby>形<rt>かたち</rt></ruby> の <ruby>折<rt>お</rt></ruby>り<ruby>紙<rt>がみ</rt></ruby> を <ruby>作<rt>つく</rt></ruby>って <ruby>遊<rt>あそ</rt></ruby>びました — Quand j'étais enfant, je m'amusais à fabriquer de l'origami de différentes formes avec du **papier** blanc.

### n5_v_241 → v_241 · 出口

**Statut** : PROPOSITION, non validée

- **A2-04-D0240** (decision, tags) : lieu_hotel écarté ; lieu_gare ajouté hors des candidats : Vocabulaire d'action propre à la gare (s'orienter, trouver un service), les sorties numérotées (東口, 3番出口). — avant `["lieu_hotel"]` → après `["lieu_gare"]`
- **A2-04-D0241** (abandon, senses) : Pas équivalent : 出口 désigne l'issue, pas la porte. — avant `["Porte de sortie"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 出口 · でぐち · deguchi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › pieces_maison |
| sens | Sortie ; Issue ; Porte de sortie |
| nuance | Nom composé de <ruby>出<rt>で</rt></ruby>る (deru - sortir) et <ruby>口<rt>くち</rt></ruby> (kuchi - bouche/ouverture), désignant l'issue d'un bâtiment ou d'une zone (contraire de <ruby>入口<rt>いりぐち</rt></ruby> - iriguchi). Compteur spécifique : <ruby>箇<rt>か</rt></ruby><ruby>所<rt>しょ</rt></ruby> (kasho) ou <ruby>つ<rt>つ</rt></ruby> (tsu). |
| particules |  |
| furigana | <ruby>出<rt>で</rt></ruby><ruby>口<rt>ぐち</rt></ruby> |
| exemple | <ruby>駅<rt>えき</rt></ruby> の **<ruby>出口<rt>でぐち</rt></ruby>** は どちら です か 。 — Où se trouve la **sortie** de la gare ? |

**Mécanique**

- word : `"出口"`
- readings : `[{"kana":"でぐち","romaji":"deguchi","furigana":"<ruby>出<rt>で</rt></ruby><ruby>口<rt>ぐち</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Contraire : 入口."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sortie** (Issue) | environnement_construit_espaces_humains › elements_architecturaux | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>電車<rt>でんしゃ</rt></ruby> を <ruby>降<rt>お</rt></ruby>りて、<ruby>一番<rt>いちばん</rt></ruby> <ruby>近<rt>ちか</rt></ruby>い <ruby>出口<rt>でぐち</rt></ruby> から <ruby>駅<rt>えき</rt></ruby> の <ruby>外<rt>そと</rt></ruby> に <ruby>出<rt>で</rt></ruby>ました — Je suis descendu du train et je suis sorti de la gare par la **sortie** la plus proche.
- <ruby>建物<rt>たてもの</rt></ruby> の <ruby>中<rt>なか</rt></ruby> が <ruby>広<rt>ひろ</rt></ruby>くて、<ruby>非常口<rt>ひじょうぐち</rt></ruby> の <ruby>出口<rt>でぐち</rt></ruby> を <ruby>探<rt>さが</rt></ruby>す のに <ruby>苦労<rt>くろう</rt></ruby>しました — L'intérieur du bâtiment était grand, et j'ai eu du mal à chercher la **sortie** de secours.
- お<ruby>会計<rt>かいけい</rt></ruby> を <ruby>済<rt>す</rt></ruby>ませて、レジ の <ruby>横<rt>よこ</rt></ruby> に ある <ruby>出口<rt>でぐち</rt></ruby> から <ruby>店<rt>みせ</rt></ruby> を <ruby>出<rt>で</rt></ruby>ました — J'ai réglé l'addition et je suis sorti du magasin par la **sortie** située à côté de la caisse.

### n5_v_247 → v_247 · 本棚

**Statut** : PROPOSITION, non validée

- **A2-04-D0272** (abandon, senses) : Redondant. — avant `["Étagère de rangement pour livres"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 本棚 · ほんだな · hondana |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › mobilier |
| sens | Bibliothèque (meuble) ; Étagère à livres ; Étagère de rangement pour livres |
| nuance | Nom composé de <ruby>本<rt>ほん</rt></ruby> (hon - livre) et de <ruby>棚<rt>たな</rt></ruby> (tana - étagère/banc), désignant spécifiquement le meuble pour ranger les livres (par opposition à la bibliothèque institutionnelle <ruby>図書館<rt>としょかん</rt></ruby>). Compteur spécifique : <ruby>個<rt>こ</rt></ruby> (ko) ou <ruby>台<rt>だい</rt></ruby> (dai). |
| particules |  |
| furigana | <ruby>本<rt>ほん</rt></ruby><ruby>棚<rt>だな</rt></ruby> |
| exemple | **<ruby>本棚<rt>ほんだな</rt></ruby>** に たくさん の ほん が あります 。 — Il y a beaucoup de livres sur l'**étagère à livres**. |

**Mécanique**

- word : `"本棚"`
- readings : `[{"kana":"ほんだな","romaji":"hondana","furigana":"<ruby>本<rt>ほん</rt></ruby><ruby>棚<rt>だな</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Étagère à livres** (Bibliothèque (meuble)) | habitat_vie_domestique › mobilier › rangement | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>部屋<rt>へや</rt></ruby> の <ruby>中<rt>なか</rt></ruby> が <ruby>本<rt>ほん</rt></ruby> で あふれていた ので、<ruby>新<rt>あたら</rt></ruby>しい 本棚 を <ruby>買<rt>か</rt></ruby>いました — Comme la chambre débordait de livres, j'ai acheté une nouvelle **bibliothèque (meuble)**.
- <ruby>本棚<rt>ほんだな</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> の <ruby>段<rt>だん</rt></ruby> に よく <ruby>使<rt>つか</rt></ruby>う <ruby>教科書<rt>きょうかしょ</rt></ruby> を <ruby>並<rt>なら</rt></ruby>べて おきました — J'ai aligné les manuels scolaires que j'utilise souvent sur l'étagère supérieure de la **bibliothèque**.
- <ruby>読<rt>よ</rt></ruby>み<ruby>終<rt>お</rt></ruby>わった <ruby>小説<rt>しょうせつ</rt></ruby> を 本棚 の <ruby>中<rt>なか</rt></ruby> に きれいに <ruby>片付<rt>かたづ</rt></ruby>けました — J'ai bien rangé le roman que j'avais fini de lire à l'intérieur de la **bibliothèque (meuble)**.

### n5_v_248 → v_248 · 玄関

**Statut** : PROPOSITION, non validée

- **A2-04-D0230** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0231** (abandon, senses) : Pas équivalent : le 玄関 est à l'intérieur. — avant `["Porche d'entrée"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 玄関 · げんかん · genkan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › pieces_maison |
| sens | Entrée (traditionnelle japonaise) ; Vestibule ; Porche d'entrée |
| nuance | Nom désignant le vestibule traditionnel situé à l'entrée d'une maison, d'un appartement ou d'un bâtiment japonais, où l'on retire ses chaussures avant de monter sur le plancher surélevé. Compteur spécifique : <ruby>箇<rt>か</rt></ruby><ruby>所<rt>しょ</rt></ruby> (kasho) ou <ruby>つ<rt>つ</rt></ruby> (tsu). |
| particules |  |
| furigana | <ruby>玄<rt>げん</rt></ruby><ruby>関<rt>かん</rt></ruby> |
| exemple | くつ を **<ruby>玄関<rt>げんかん</rt></ruby>** で <ruby>脱<rt>ぬ</rt></ruby>ぎます 。 — Je retire mes chaussures dans l'**entrée**. |

**Mécanique**

- word : `"玄関"`
- readings : `[{"kana":"げんかん","romaji":"genkan","furigana":"<ruby>玄<rt>げん</rt></ruby><ruby>関<rt>かん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le vestibule à l'entrée d'une maison japonaise, où l'on retire ses chaussures."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Entrée** (Vestibule) | habitat_vie_domestique › espaces_domestiques › entree | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>家<rt>いえ</rt></ruby> に <ruby>入<rt>はい</rt></ruby>る とき は、<ruby>玄関<rt>げんかん</rt></ruby> で くつ を <ruby>脱<rt>ぬ</rt></ruby>がなければなりません — Quand on entre dans la maison, il faut enlever ses chaussures dans l'**entrée**.
- <ruby>玄関<rt>げんかん</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> に たくさんの <ruby>綺麗<rt>きれい</rt></ruby>な <ruby>花<rt>はな</rt></ruby> の プランター が <ruby>置<rt>お</rt></ruby>いて あります — Il y a de nombreux pots de fleurs magnifiques disposés devant l'**entrée**.
- ゆうびんきょく の <ruby>人<rt>ひと</rt></ruby> が <ruby>来<rt>き</rt></ruby>た ので、<ruby>玄関<rt>げんかん</rt></ruby> の ドア を <ruby>開<rt>あ</rt></ruby>けました — Comme le facteur est venu, j'ai ouvert la porte de l'**entrée**.

### n5_v_507 → v_507 · アパート

**Statut** : PROPOSITION, non validée

- **A2-04-D0224** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0225** (abandon, senses) : Explication d'usage, reprise dans la nuance. — avant `["Logement en immeuble (souvent de type léger/modeste par rapport au *manshon* ou *mansion*)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | アパート · あぱーと · apaato |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › logement |
| sens | Appartement ; Logement en immeuble (souvent de type léger/modeste par rapport au *manshon* ou *mansion*) |
| nuance | **Nom (mot emprunté / katakana)** désignant un immeuble d'appartements de construction légère (généralement en bois ou en acier léger), très courant au Japon. |
| particules |  |
| furigana | アパート |
| exemple | きょうりょく な **アパート** に すん でい ます 。 — J'habite dans un **appartement**. |

**Mécanique**

- word : `"アパート"`
- readings : `[{"kana":"あぱーと","romaji":"apaato","furigana":"アパート","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Désigne un petit immeuble d'appartements de construction légère, ou un logement dans un tel immeuble ; un immeuble plus solide et cossu se dit マンション."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Appartement** | habitat_vie_domestique › logements › appartements | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>私<rt>わたし</rt></ruby> は <ruby>新<rt>あたら</rt></ruby>しい アパート に <ruby>引<rt>ひ</rt></ruby>き<ruby>越<rt>こ</rt></ruby>しました — J'ai emménagé dans un nouvel **appartement**.
- この アパート は <ruby>家賃<rt>やちん</rt></ruby> が 安い です — Le loyer de cet **appartement** est bon marché.
- <ruby>大学<rt>だいがく</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>くに アパート を <ruby>借<rt>か</rt></ruby>借りました — J'ai loué un **appartement** près de l'université.

### n5_v_531 → v_531 · 住む

**Statut** : PROPOSITION, non validée

- **A2-04-D0292** (abandon, senses) : Registre soutenu ; non repris. — avant `["Demeurer"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 住む · すむ · sumu |
| type, group | verbe · u |
| catégorie (ancienne, indicative) | actions_generiques › vie_quotidienne |
| sens | Habiter ; Résider ; Demeurer |
| nuance | **Verbe intransitif (groupe u)** désignant l'action de résider ou de vivre dans un lieu ou une localité donnée (souvent utilisé sous la forme en *-te iru* pour indiquer le lieu de résidence actuel). |
| particules | に |
| furigana | <ruby>住<rt>す</rt></ruby>む |
| exemple | とうきょう に **<ruby>住<rt>す</rt></getKey></ruby>ん でい ます 。 — J'**habite** à Tokyo. |

**Mécanique**

- word : `"住む"`
- readings : `[{"kana":"すむ","romaji":"sumu","furigana":"<ruby>住<rt>す</rt></ruby>む","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Surtout au progressif : 東京に住んでいます, j'habite à Tokyo."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Habiter** (Résider) | habitat_vie_domestique › logements | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>私<rt>わたし</rt></ruby> は <ruby>東京<rt>とうきょう</rt></ruby> に <ruby>住<rt>す</rt></ruby>んでいます — J'**habite** à Tokyo.
- どちら に <ruby>住<rt>す</rt></ruby>んで いますか — Où **habitez**-vous ?
- <ruby>静<rt>しず</rt></ruby>かな <ruby>町<rt>まち</rt></ruby> に <ruby>住<rt>す</rt></ruby>みたい です — Je voudrais **habiter** dans une ville calme.

### n5_v_589 → v_589 · お手洗い

**Statut** : PROPOSITION, non validée

- **A2-04-D0265** (correction, readings) : Furigana de la source invalides (ruby sans lecture) et écrits avec 御 au lieu de お. — avant `"<ruby>御</ruby><ruby>手</ruby><ruby>洗</ruby>い"` → après `"お<ruby>手<rt>て</rt></ruby><ruby>洗<rt>あら</rt></ruby>い"`
- **A2-04-D0266** (abandon, senses) : « Cabinet » est vieilli ; le sens littéral est repris dans la nuance. — avant `["Cabinet","Lavabo (sens originel)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | お手洗い · おてあらい · otearai |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › batiment |
| sens | Toilettes ; Cabinet ; Lavabo (sens originel) |
| nuance | **Nom** poli et très courant désignant les toilettes publiques ou privées. C'est l'un des termes les plus sûrs et polis à employer dans les restaurants, hôtels ou magasins. |
| particules |  |
| furigana | <ruby>御</ruby><ruby>手</ruby><ruby>洗</ruby>い |
| exemple | **<ruby>御</ruby><ruby>手</ruby><ruby>洗</ruby>い** は どこ です か 。 — Où sont les **toilettes** ? |

**Mécanique**

- word : `"お手洗い"`
- grammatical_class : `"nom"`
- group : `"nom"`
- readings : **exception**, furigana incohérents avec la forme
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- readings : `[{"kana":"おてあらい","romaji":"otearai","furigana":"お<ruby>手<rt>て</rt></ruby><ruby>洗<rt>あら</rt></ruby>い","default":true,"note":null}]`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Terme poli, sûr dans toutes les situations ; littéralement « se laver les mains ». Plus direct : トイレ."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Toilettes** | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- 「すみません、お<ruby>手洗<rt>てあら</rt></ruby>い は どこ です か」「あそこ です」 — « Excusez-moi, où sont les **toilettes** ? » « C'est par là-bas. »
- <ruby>レストラン<rt>れすとらん</rt></ruby> の お<ruby>手洗<rt>てあら</rt></ruby>い を つかいます — J'utilise les **toilettes** du restaurant.
- <ruby>電車<rt>でんしゃ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に お<ruby>手洗<rt>てあら</rt></ruby>い が ありません — Il n'y a pas de **toilettes** à l'intérieur du train.

### n5_v_612 → v_612 · シャワー

**Statut** : PROPOSITION, non validée

- **A2-04-D0263** (abandon, senses) : Redondant. — avant `["Jet de douche"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | シャワー · しゃわー · shawaa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › salle_de_bain |
| sens | Douche ; Jet de douche |
| nuance | **Nom** (emprunt de l'anglais *shower*) désignant la douche. Il est le plus souvent employé dans l'expression verbale *シャワーを浴びる* (prendre une douche). |
| particules |  |
| furigana | シャワー |
| exemple | あさ に **シャワー** を あび ます 。 — Je prends une **douche** le matin. |

**Mécanique**

- word : `"シャワー"`
- readings : `[{"kana":"しゃわー","romaji":"shawaa","furigana":"シャワー","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Surtout dans シャワーを浴びる : prendre une douche."`
- tags : `["lieu_hotel"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Douche** | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>朝<rt>あさ</rt></ruby> おきて から シャワー を あびます — Je prends une **douche** après m'être réveillé le matin.
- <ruby>暑<rt>あつ</rt></ruby>い ですから、つめたい シャワー が <ruby>気持<rt>きも</rt></ruby>ちいい です — Il fait chaud, donc une **douche** fraîche fait du bien.
- お<ruby>風呂<rt>ふろ</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> に シャワー を つかいます — J'utilise la **douche** avant d'aller dans le bain.

### n5_v_613 → v_613 · ストーブ

**Statut** : PROPOSITION, non validée

- **A2-04-D0273** (abandon, senses) : Pas équivalent : désigne en français un appareil fixe. — avant `["Radiateur"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ストーブ · すとーぶ · sutoobu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › chauffage |
| sens | Poêle ; Radiateur ; Chauffage d'appoint (terme d'origine anglaise stove) |
| nuance | **Nom** (emprunt de l'anglais *stove*) qui, au Japon, désigne principalement un appareil de chauffage d'appoint pour la maison (au gaz, au kérosène ou électrique) plutôt qu'une cuisinière de cuisine. |
| particules |  |
| furigana | ストーブ |
| exemple | ふゆ は **ストーブ** を つけ ます 。 — J'allume le **chauffage** (poêle) en hiver. |

**Mécanique**

- word : `"ストーブ"`
- readings : `[{"kana":"すとーぶ","romaji":"sutoobu","furigana":"ストーブ","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Au Japon, appareil de chauffage d'appoint (au gaz, au kérosène, électrique)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Poêle (de chauffage)** (Chauffage d'appoint) | habitat_vie_domestique › equipements_domestiques › chauffage_climatisation | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>冬<rt>ふゆ</rt></ruby> は <ruby>部屋<rt>へや</rt></ruby> の <ruby>中<rt>なか</rt></ruby> で ストーブ を つけます — En hiver, on allume le **poêle** à l'intérieur de la pièce.
- ストーブ の <ruby>前<rt>まえ</rt></ruby> は とても あたたかい です — Il fait très chaud devant le **poêle**.
- 「<ruby>出<rt>で</rt></ruby>かける <ruby>時<rt>とき</rt></ruby> に、ストーブ を <ruby>消<rt>け</rt></ruby>して ください」 — « Veuillez éteindre le **poêle** lorsque vous sortez. »

### n5_v_617 → v_617 · トイレ

**Statut** : PROPOSITION, non validée

- **A2-04-D0264** (abandon, senses) : Vieilli ; non repris. — avant `["Cabinet"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | トイレ · といれ · toire |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › batiment |
| sens | Toilettes ; Cabinet ; W.C. |
| nuance | **Nom** (emprunt de l'anglais *toilet*) très courant et direct désignant les toilettes. Bien qu'un peu plus familier que *otearai* (お手洗い), il est universellement compris et employé au quotidien. |
| particules |  |
| furigana | トイレ |
| exemple | すみません 、 **トイレ** は どこ です か 。 — Excusez-moi, où sont les **toilettes** ? |

**Mécanique**

- word : `"トイレ"`
- readings : `[{"kana":"といれ","romaji":"toire","furigana":"トイレ","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Terme courant et direct ; plus poli : お手洗い."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Toilettes** (W.-C.) | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- 「すみません、トイレ は どこ です か」「あちら です」 — « Excusez-moi, où sont les **toilettes** ? » « C'est par là-bas. »
- <ruby>電車<rt>でんしゃ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に トイレ が あります — Il y a des **toilettes** à l'intérieur du train.
- <ruby>外<rt>そと</rt></ruby> へ <ruby>出<rt>で</rt></ruby>る <ruby>前<rt>まえ</rt></ruby> に トイレ に <ruby>行<rt>い</rt></ruby>きます — Je vais aux **toilettes** avant de sortir.

### n5_v_641 → v_641 · 冷蔵庫

**Statut** : PROPOSITION, non validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 冷蔵庫 · れいぞうこ · reizouko |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › electromenager |
| sens | Réfrigérateur ; Frigo |
| nuance | **Nom** composé des kanjis signifiant « froid », « entreposer » et « magasin / entrepôt », désignant l'appareil électroménager servant à conserver les aliments au frais. |
| particules |  |
| furigana | <ruby>冷<rt>れい</rt></ruby><ruby>蔵<rt>ぞう</rt></ruby><ruby>庫<rt>こ</rt></ruby> |
| exemple | ぎゅうにゅう を **<ruby>冷<rt>れい</rt></ruby><ruby>蔵<rt>ぞう</rt></ruby><ruby>庫<rt>こ</rt></ruby>** に いれ ます 。 — Je mets le lait dans le **réfrigérateur**. |

**Mécanique**

- word : `"冷蔵庫"`
- readings : `[{"kana":"れいぞうこ","romaji":"reizouko","furigana":"<ruby>冷<rt>れい</rt></ruby><ruby>蔵<rt>ぞう</rt></ruby><ruby>庫<rt>こ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Réfrigérateur** (Frigo) | habitat_vie_domestique › equipements_domestiques › electromenager | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>冷蔵庫<rt>れいぞうこ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に つめたい ジュース が あります — Il y a du jus frais à l'intérieur du **réfrigérateur**.
- 「<ruby>買<rt>か</rt></ruby>ってきた くだもの を <ruby>冷蔵庫<rt>れいぞうこ</rt></ruby> に <ruby>入<rt>い</rt></ruby>れて ください」 — « Veuillez mettre les fruits que vous avez achetés dans le **réfrigérateur**. »
- <ruby>冷蔵庫<rt>れいぞうこ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に <ruby>電子<rt>でんし</rt></ruby>レンジ が あります — Il y a un four à micro-ondes sur le **réfrigérateur**.

### n5_v_662 → v_662 · 廊下

**Statut** : PROPOSITION, non validée

- **A2-04-D0250** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0251** (abandon, senses) : Termes voisins, pas équivalents. — avant `["Passage","Galerie"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 廊下 · ろうか · rouka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › batiment |
| sens | Couloir ; Passage ; Galerie |
| nuance | **Nom** composé des kanjis signifiant « galerie couverte / corridor » et « sous / bas », désignant un couloir à l'intérieur d'un bâtiment, d'une école ou d'une maison. |
| particules |  |
| furigana | <ruby>廊<rt>ろう</rt></ruby><ruby>下<rt>か</rt></ruby> |
| exemple | **<ruby>廊<rt>ろう</rt></ruby><ruby>下<rt>か</rt></ruby>** を はしら ない で ください 。 — Veuillez ne pas courir dans le **couloir**. |

**Mécanique**

- word : `"廊下"`
- readings : `[{"kana":"ろうか","romaji":"rouka","furigana":"<ruby>廊<rt>ろう</rt></ruby><ruby>下<rt>か</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Couloir** (Corridor) | environnement_construit_espaces_humains › elements_architecturaux | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>学校<rt>がっこう</rt></ruby> の <ruby>廊下<rt>ろうか</rt></ruby> を <ruby>走<rt>はし</rt></ruby>って は いけません — Il ne faut pas courir dans le **couloir** de l'école.
- 「<ruby>廊下<rt>ろうか</rt></ruby> の <ruby>奥<rt>おく</rt></ruby> に <ruby>先生<rt>せんせい</rt></ruby> の <ruby>部屋<rt>へや</rt></ruby> が あります」 — « La pièce du professeur se trouve au fond du **couloir**. »
- <ruby>雨<rt>あめ</rt></ruby> で <ruby>廊下<rt>ろうか</rt></ruby> が すべりやすい です — Le **couloir** glisse facilement à cause de la pluie.

### n5_v_680 → v_680 · 洗濯

**Statut** : PROPOSITION, non validée

- **A2-04-D0289** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0290** (abandon, senses) : Expression familière, pas une traduction du nom. — avant `["Faire la machine"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 洗濯 · せんたく · sentaku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › tache_menagere |
| sens | Lessive ; Lavage du linge ; Faire la machine |
| nuance | **Nom / verbe suru** composé des kanjis signifiant « laver » et « rincer / nettoyer », désignant l'action de laver les vêtements. S'emploie très fréquemment avec le verbe *suru* (洗濯する) pour dire « faire la lessive ». |
| particules | を |
| furigana | <ruby>洗<rt>せん</rt></ruby><ruby>濯<rt>たく</rt></ruby> |
| exemple | きょう は **<ruby>洗<rt>せん</rt></ruby><ruby>濯<rt>たく</rt></ruby>** を し ます 。 — Aujourd'hui, je fais la **lessive**. |

**Mécanique**

- word : `"洗濯"`
- readings : `[{"kana":"せんたく","romaji":"sentaku","furigana":"<ruby>洗<rt>せん</rt></ruby><ruby>濯<rt>たく</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `true`
- suffix : `false`
- counter : `null`
- nuance : `"洗濯する : faire la lessive."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Lessive** (Lavage du linge) | habitat_vie_domestique › entretien_domestique › lessive | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>晴<rt>は</rt></ruby>れた <ruby>日<rt>ひ</rt></ruby> に <ruby>外<rt>そと</rt></ruby> で <ruby>洗濯<rt>せんたく</rt></ruby> を します — Je fais la **lessive** ('le linge') dehors les jours de beau temps.
- 「<ruby>今日<rt>きょう</rt></ruby> は <ruby>天気<rt>てんき</rt></ruby> が いい ですから、<ruby>洗濯<rt>せんたく</rt></ruby> が よく <ruby>乾<rt>かわ</rt></ruby>きます」 — « Comme il fait beau aujourd'hui, la **lessive** sèche bien. »
- <ruby>洗濯機<rt>せんたくき</rt></ruby> で <ruby>服<rt>ふく</rt></ruby> の <ruby>洗濯<rt>せんたく</rt></ruby> を します — Je fais la **lessive** de mes vêtements avec la machine à laver.

### n5_v_692 → v_692 · 花瓶

**Statut** : PROPOSITION, non validée

- **A2-04-D0277** (abandon, senses) : Redondant. — avant `["Vase à fleurs"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 花瓶 · かびん · kabin |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › decoration |
| sens | Vase ; Vase à fleurs |
| nuance | **Nom** composé des kanjis signifiant « fleur » (*hana*, qui s'assourdit en *ka* en composition) et « bouteille / flacon » (*bin*), désignant le récipient utilisé pour disposer des fleurs coupées. |
| particules |  |
| furigana | <ruby>花<rt>か</rt></ruby><ruby>瓶<rt>びん</rt></ruby> |
| exemple | **<ruby>花<rt>か</rt></ruby><ruby>瓶<rt>びん</rt></ruby>** に はな を いれ ます 。 — Je mets des fleurs dans le **vase**. |

**Mécanique**

- word : `"花瓶"`
- readings : `[{"kana":"かびん","romaji":"kabin","furigana":"<ruby>花<rt>か</rt></ruby><ruby>瓶<rt>びん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Vase** | habitat_vie_domestique › accessoires_domestiques | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> の <ruby>花瓶<rt>かびん</rt></ruby> に <ruby>綺麗<rt>きれい</rt></ruby> な <ruby>花<rt>はな</rt></ruby> が <ruby>生<rt>い</rt></ruby>けて あります — Il y a de belles fleurs disposées dans le **vase** sur le bureau.
- 「<ruby>母<rt>はは</rt></ruby> の <ruby>誕生<rt>たんじょう</rt></ruby>日に ガラス の <ruby>花瓶<rt>かびん</rt></ruby> を プレゼント しました」 — « J'ai offert un **vase** en verre à ma mère pour son anniversaire. »
- <ruby>誤<rt>あやま</rt></ruby>って <ruby>花瓶<rt>かびん</rt></ruby> を <ruby>落<rt>お</rt></ruby>として、<ruby>割<rt>わ</rt></ruby>ってしまいました — J'ai fait tomber le **vase** par inadvertance et je l'ai cassé.

### n5_v_708 → v_708 · 門

**Statut** : PROPOSITION, non validée

- **A2-04-D0234** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0235** (abandon, senses) : « Porte d'entrée » prête à confusion avec 玄関 et 入口 ; « porte monumentale » est reprise dans la nuance (temple). — avant `["Porte d'entrée","Porte monumentale"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 門 · もん · mon |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › infrastructure |
| sens | Portail ; Porte d'entrée ; Grille ; Porte monumentale |
| nuance | **Nom** désignant une grande porte extérieure, un portail d'entrée (comme l'entrée d'une université, d'un temple ou d'une propriété), par opposition à la porte coulissante intérieure (*doa* ou *fusuma*). |
| particules |  |
| furigana | <ruby>門<rt>もん</rt></ruby> |
| exemple | がっこう の **<ruby>門<rt>もん</rt></ruby>** の まえ に とまり ます 。 — Je m'arrête devant le **portail** de l'école. |

**Mécanique**

- word : `"門"`
- readings : `[{"kana":"もん","romaji":"mon","furigana":"<ruby>門<rt>もん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Grande porte extérieure : l'entrée d'une propriété, d'une école, d'un temple ; la porte d'une maison se dit ドア ou 戸."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Portail** (Grille) | environnement_construit_espaces_humains › elements_architecturaux › portes_fenetres | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>大学<rt>だいがく</rt></ruby> の <ruby>門<rt>もん</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> で <ruby>友達<rt>ともだち</rt></ruby> と <ruby>待<rt>ま</rt></ruby>ち<ruby>合<rt>あ</rt></ruby>わせを します — Je donne rendez-vous à un ami devant le **portail** de l'université.
- 「お<ruby>寺<rt>てら</rt></ruby> の 大きな <ruby>門<rt>もん</rt></ruby> を くぐって <ruby>中<rt>なか</rt></ruby> に <ruby>入<rt>はい</rt></ruby>ります」 — « Nous passons sous le grand **portail** du temple pour entrer à l'intérieur. »
- <ruby>夜<rt>よる</rt></ruby> 10 <ruby>時<rt>じ</rt></ruby> に なる と、<ruby>公園<rt>こうえん</rt></ruby> の <ruby>門<rt>もん</rt></ruby> が 閉<rt>し</rt></ruby>まります — À 22 heures, le **portail** du parc se ferme.

### n5_v_711 → v_711 · 階段

**Statut** : PROPOSITION, non validée

- **A2-04-D0252** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut s'y employer, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0253** (abandon, senses) : Redondant. — avant `["Marches d'escalier"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 階段 · かいだん · kaidan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › batiment |
| sens | Escalier ; Marches d'escalier |
| nuance | **Nom** composé des kanjis signifiant « étage / degré » et « marche / degré », désignant un escalier permettant de monter ou descendre entre les niveaux d'un bâtiment. |
| particules |  |
| furigana | <ruby>階<rt>かい</rt></ruby><ruby>段<rt>だん</rt></ruby> |
| exemple | **<ruby>階<rt>かい</rt></ruby><ruby>段<rt>だん</rt></ruby>** を のぼり ます 。 — Je monte l'**escalier**. |

**Mécanique**

- word : `"階段"`
- readings : `[{"kana":"かいだん","romaji":"kaidan","furigana":"<ruby>階<rt>かい</rt></ruby><ruby>段<rt>だん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Escalier** | environnement_construit_espaces_humains › elements_architecturaux › escaliers | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>重<rt>おも</rt></ruby>い <ruby>荷物<rt>にもつ</rt></ruby> を <ruby>持<rt>も</rt></ruby>って <ruby>階段<rt>かいだん</rt></ruby> を <ruby>上<rt>のぼ</rt></ruby>ります — Je monte l'**escalier** en portant de lourds bagages.
- 「エレベーター が 混<rt>こ</rt></ruby>んでいる ので、<ruby>階段<rt>かいだん</rt></ruby> を <ruby>使<rt>つか</rt></ruby>いましょう」 — « Comme l'ascenseur est bondé, prenons l'**escalier**. »
- <ruby>駅<rt>えき</rt></ruby> の <ruby>階段<rt>かいだん</rt></ruby> で <ruby>足<rt>あし</rt></ruby> を <ruby>滑<rt>すべ</rt></ruby>らせてしまいました — J'ai glissé sur l'**escalier** de la gare.

### n5_v_713 → v_713 · 電気

**Statut** : PROPOSITION, non validée

- **A2-04-D0274** (decision, senses) : Deux sens documentés par la source : l'énergie, et l'éclairage qu'on allume ou éteint (電気をつける), deux référents distincts. — avant `["Électricité","Lumière électrique","Éclairage"]` → après `["S1 Électricité","S2 Lumière (éclairage)"]`
- **A2-04-D0275** (type-nul, sens 1 · semantic_type) : L'électricité, phénomène et forme d'énergie : ni substance, ni objet, ni concept abstrait de secours ; aucun type terminal ne convient. Addendum A6.
- **A2-04-D0276** (abandon, senses) : Redondant avec « lumière ». — avant `["Lumière électrique"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 電気 · でんき · denki |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › energie |
| sens | Électricité ; Lumière électrique ; Éclairage |
| nuance | **Nom** composé des kanjis signifiant « électricité / éclair » et « esprit / énergie / atmosphère », désignant à la fois l'énergie électrique et l'éclairage d'une pièce (que l'on allume ou éteint). |
| particules |  |
| furigana | <ruby>電<rt>でん</rt></ruby><ruby>気<rt>き</rt></ruby> |
| exemple | へや の **<ruby>電<rt>でん</rt></ruby><ruby>気<rt>き</rt></ruby>** を つけ ます 。 — J'allume la **lumière** (l'électricité) de la pièce. |

**Mécanique**

- word : `"電気"`
- readings : `[{"kana":"でんき","romaji":"denki","furigana":"<ruby>電<rt>でん</rt></ruby><ruby>気<rt>き</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Électricité** | sciences › physique › electricite_magnetisme | **null** |  |  |
| 2 | **Lumière** (Éclairage) | habitat_vie_domestique › equipements_domestiques › equipements_fonctionnels | objet_artefact | tags lieu_hotel | 電気をつける : allumer la lumière ; 電気を消す : l'éteindre. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>部屋<rt>へや</rt></ruby> を <ruby>出<rt>で</rt></ruby>る <ruby>時<rt>とき</rt></ruby> に、<ruby>電気<rt>でんき</rt></ruby> を <ruby>消<rt>け</rt></ruby>します — J'éteins l'**électricité** ('la lumière') en quittant la pièce.
- 「<ruby>台風<rt>たいふう</rt></ruby> の せいで、<ruby>家<rt>いえ</rt></ruby> の <ruby>電気<rt>でんき</rt></ruby> が <ruby>消<rt>き</rt></ruby>えてしまいました」 — « À cause du typhon, l'**électricité** de la maison s'est coupée. »
- パソコン を <ruby>使<rt>つか</rt></ruby>う ため に、<ruby>電気<rt>でんき</rt></ruby> の コンセント を つなぎます — Je branche la prise **électrique** pour utiliser l'ordinateur.
