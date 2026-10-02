# Lot lot-02 · Alimentation, boissons, repas et table

Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.

## Autres entrées

### n5_v_66 → v_66 · 飲む

**Statut** : PROPOSITION, non validée

- **A2-04-D0189** (decision, senses) : 薬を飲む garde le même sens japonais (avaler, ingérer) ; « prendre » n'est que la traduction française imposée par la collocation : repris dans la nuance. — avant `["Boire","Prendre (un médicament)"]` → après `"un seul sens"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 飲む · のむ · nomu |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › actions_objets |
| sens | Boire ; Prendre (un médicament) |
| nuance | Verbe pour exprimer l'action de boire un liquide (eau, thé, alcool) ou d'avaler un médicament. |
| particules | を |
| furigana | <ruby>飲<rt>の</rt></ruby>む |
| exemple | <ruby>喉<rt>のど</rt></ruby> が <ruby>乾<rt>かわ</rt></ruby>いた ので 、<ruby>水<rt>みず</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みます 。 — Ayant la gorge sèche, je **bois** de l'eau. |

**Mécanique**

- word : `"飲む"`
- readings : `[{"kana":"のむ","romaji":"nomu","furigana":"<ruby>飲<rt>の</rt></ruby>む","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"S'emploie aussi pour un médicament : 薬を飲む, prendre un médicament (l'avaler)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Boire** | alimentation_cuisine › consommation_alimentaire | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby> <ruby>朝<rt>あさ</rt></ruby> ごはん の <ruby>時<rt>とき</rt></ruby> に コーヒー を <ruby>飲<rt>の</rt></ruby>みます — Je **bois** du café tous les jours au petit-déjeuner.
- のど が かわいた ので、<ruby>冷<rt>つめ</rt></ruby>たい お<ruby>茶<rt>ちゃ</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みたい です — J'ai soif, alors je veux **boire** du thé froid.
- <ruby>夜<rt>よる</rt></ruby> は お<ruby>酒<rt>さけ</rt></ruby> を <ruby>飲<rt>の</rt></ruby>まない <ruby>方<rt>ほう</rt></ruby> が いい です — Il vaut mieux ne pas **boire** d'alcool le soir.

### n5_v_84 → v_84 · お弁当

**Statut** : PROPOSITION, non validée

- **A2-04-D0168** (decision, tags) : Acheté couramment au konbini. lieu_restaurant écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_konbini"]`
- **A2-04-D0169** (decision, writings) : 弁当 n'est pas ajouté comme autre graphie : retirer le préfixe お change la forme lexicale, pas seulement l'écriture (même question que お皿). Mentionné dans la nuance. — avant `null` → après `[]`
- **A2-04-D0170** (abandon, senses) : Terme voisin, pas équivalent. — avant `["Casse-croûte"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | お弁当 · おべんとう · obentou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › repas |
| sens | Bento ; Repas préparé en boîte ; Casse-croûte |
| nuance | Nom désignant un repas préparé à l'avance et disposé dans une boîte compartimentée (souvent avec le préfixe honorifique お, o). Très populaire au Japon pour le déjeuner à l'école ou au travail. |
| particules |  |
| furigana | お<ruby>弁<rt>べん</rt></ruby><ruby>当<rt>とう</rt></ruby> |
| exemple | <ruby>今日<rt>きょう</rt></ruby> の <ruby>昼<rt>ひる</rt></ruby> ごはん は <ruby>家<rt>いえ</rt></ruby> で <ruby>作<rt>つく</rt></ruby>った お<ruby>弁当<rt>べんとう</rt></ruby> です 。 — Mon déjeuner d'aujourd'hui est un **bento** préparé à la maison. |

**Mécanique**

- word : `"お弁当"`
- readings : `[{"kana":"おべんとう","romaji":"obentou","furigana":"お<ruby>弁<rt>べん</rt></ruby><ruby>当<rt>とう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Forme polie et courante ; 弁当 sans お existe aussi, surtout à l'écrit et dans les composés (駅弁)."`
- tags : `["lieu_konbini"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bento** (Repas en boîte) | alimentation_cuisine › aliments › produits_prepares | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>母<rt>はは</rt></ruby> が <ruby>作<rt>つく</rt></ruby>ってくれた <ruby>美味<rt>おい</rt></ruby>しい お<ruby>弁当<rt>べんとう</rt></ruby> を <ruby>昼<rt>ひる</rt></ruby> ごはん に <ruby>食<rt>た</rt></ruby>べます — Je mange pour le déjeuner un délicieux **bento** que ma mère m'a préparé.
- <ruby>朝<rt>あさ</rt></ruby> <ruby>時間<rt>じかん</rt></ruby> が なかった ので、コンビニ で お<ruby>弁当<rt>べんとう</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました — Je n'avais pas le temps ce matin, alors j'ai acheté un **bento** au konbini.
- お<ruby>弁当<rt>べんとう</rt></ruby> を <ruby>持<rt>も</rt></ruby>って <ruby>公園<rt>こうえん</rt></ruby> の <ruby>中<rt>なか</rt></ruby> で ピクニック を します — Je prends un **bento** et je fais un pique-nique dans le parc.

### n5_v_85 → v_85 · お茶

**Statut** : PROPOSITION, non validée

- **A2-04-D0179** (decision, senses) : « Thé vert » et « thé » sont une variation d'extension du même mot, pas deux sens. — avant `["Thé vert","Thé en général","Pause thé"]` → après `"un seul sens"`
- **A2-04-D0180** (abandon, senses) : Extension non retenue : une traduction source ne suffit pas à fonder un sens. — avant `["Pause thé"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | お茶 · おちゃ · ocha |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › boissons |
| sens | Thé vert ; Thé en général ; Pause thé |
| nuance | Nom désignant par défaut le thé vert japonais au quotidien, souvent précédé du préfixe poli お. |
| particules |  |
| furigana | お<ruby>茶<rt>ちゃ</rt></ruby> |
| exemple | <ruby>客<rt>きゃく</rt></ruby>さん に お<ruby>茶<rt>ちゃ</rt></ruby> を <ruby>出<rt>だ</rt></ruby>します 。 — Je sers du **thé vert** aux invités. |

**Mécanique**

- word : `"お茶"`
- readings : `[{"kana":"おちゃ","romaji":"ocha","furigana":"お<ruby>茶<rt>ちゃ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Désigne d'abord le thé vert japonais ; le thé noir se dit 紅茶."`
- tags : `["lieu_konbini","lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Thé** (Thé vert) | alimentation_cuisine › boissons › boissons_chaudes | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- お<ruby>寿司<rt>すし</rt></ruby> を <ruby>食<rt>た</rt></ruby>べる <ruby>時<rt>とき</rt></ruby>、いつも お<ruby>茶<rt>ちゃ</rt></ruby> を <ruby>一緒<rt>いっしょ</rt></ruby> に <ruby>飲<rt>の</rt></ruby>みます — Quand je mange des sushis, je bois toujours du **thé vert** avec.
- お<ruby>客<rt>きゃく</rt></ruby>さん が <ruby>来<rt>き</rt></ruby>た ので、<ruby>温<rt>あたた</rt></ruby>かい お<ruby>茶<rt>ちゃ</rt></ruby> を <ruby>出<rt>だ</rt></ruby>しました — Un client est venu, alors j'ai servi du **thé vert** chaud.
- カフェ で コーヒー の <ruby>代<rt>か</rt></ruby>わりに お<ruby>茶<rt>ちゃ</rt></ruby> を <ruby>注文<rt>ちゅうもん</rt></ruby>しました — J'ai commandé du **thé vert** au café à la place du café.

### n5_v_86 → v_86 · お酒

**Statut** : PROPOSITION, non validée

- **A2-04-D0185** (decision, senses) : Le saké est une spécification du même mot (comme le thé vert pour お茶), pas un sens distinct : repris dans la nuance. — avant `["Alcool","Boisson alcoolisée","Saké (alcool de riz)"]` → après `"un seul sens"`

| Champ source | Valeur |
|---|---|
| mot, lecture | お酒 · おさけ · osake |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › boissons |
| sens | Alcool ; Boisson alcoolisée ; Saké (alcool de riz) |
| nuance | Nom désignant toute boisson alcoolisée au sens large, ou spécifiquement le saké japonais traditionnel. S'emploie souvent avec le préfixe poli お (o). |
| particules |  |
| furigana | お<ruby>酒<rt>さけ</rt></ruby> |
| exemple | <ruby>父<rt>ちち</rt></ruby> は <ruby>晩<rt>ばん</rt></ruby> ごはん の とき に お<ruby>酒<rt>さけ</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みます 。 — Mon père boit de l'**alcool** au moment du dîner. |

**Mécanique**

- word : `"お酒"`
- readings : `[{"kana":"おさけ","romaji":"osake","furigana":"お<ruby>酒<rt>さけ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Désigne aussi, plus précisément, le saké (日本酒)."`
- tags : `["lieu_konbini","lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Alcool** (Boisson alcoolisée) | alimentation_cuisine › boissons › boissons_alcoolisees | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>週末<rt>しゅうまつ</rt></ruby> の <ruby>夜<rt>よる</rt></ruby>、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby> に お<ruby>酒<rt>さけ</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みに <ruby>行<rt>い</rt></ruby>きます — Le week-end au soir, je vais boire de l'**alcool** avec des amis.
- うち の <ruby>父<rt>ちち</rt></ruby> は お<ruby>酒<rt>さけ</rt></ruby> が <ruby>大好<rt>だいす</rt></ruby>き で、<ruby>毎晩<rt>まいばん</rt></ruby> <ruby>少<rt>すこ</rt></ruby>し <ruby>飲<rt>の</rt></ruby>みます — Mon père adore l'**alcool** et en boit un peu tous les soirs.
- <ruby>車<rt>くるま</rt></ruby> を <ruby>運転<rt>うんてん</rt></ruby>する ので、お<ruby>酒<rt>さけ</rt></ruby> は <ruby>絶対<rt>ぜったい</rt></ruby> に <ruby>飲<rt>の</rt></ruby>みません — Je conduis une voiture, donc je ne bois jamais d'**alcool**.

### n5_v_88 → v_88 · ご飯

**Statut** : PROPOSITION, non validée

- **A2-04-D0165** (decision, tags) : Le tag ne vaut que pour le riz cuit qu'on commande (sens 1) : il est porté par ce sens. lieu_konbini écarté. (porté par un sens) — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`
- **A2-04-D0166** (decision, senses) : Deux sens : un aliment (le riz cuit) et un événement (le repas), deux référents et deux types sémantiques distincts. — avant `["Riz cuit","Repas","Nourriture"]` → après `["S1 Riz cuit","S2 Repas"]`
- **A2-04-D0167** (abandon, senses) : Sens de 食べ物 ; non repris ici. — avant `["Nourriture"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ご飯 · ごはん · gohan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › repas |
| sens | Riz cuit ; Repas ; Nourriture |
| nuance | Nom fondamental désignant à la fois le riz blanc cuit (aliment de base) et, par extension, un repas complet comme <ruby>朝ご飯<rt>あさごはん</rt></ruby> (asagohan, petit-déjeuner) ; <ruby>昼ご飯<rt>ひるごはん</rt></ruby> (hirugohan, déjeuner) ; <ruby>晩ご飯<rt>ばんごはん</rt></ruby> (bangohan, dîner). |
| particules |  |
| furigana | ご<ruby>飯<rt>はん</rt></ruby> |
| exemple | <ruby>毎日<rt>まいにち</rt></ruby> おいしい ご<ruby>飯<rt>はん</rt></ruby> を <ruby>食<rt>た</rt></ruby>べます 。 — Je mange du bon **riz** (un bon repas) tous les jours. |

**Mécanique**

- word : `"ご飯"`
- readings : `[{"kana":"ごはん","romaji":"gohan","furigana":"ご<ruby>飯<rt>はん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Terme poli et courant ; le riz cru se dit 米 (こめ)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Riz cuit** | alimentation_cuisine › aliments › cereales_feculents | substance_matiere | tags lieu_restaurant |  |
| 2 | **Repas** | alimentation_cuisine › repas | evenement |  | ご飯を食べる : prendre son repas ; 朝ご飯, 晩ご飯 : petit-déjeuner, dîner. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本<rt>にほん</rt></ruby> の <ruby>食事<rt>しょくじ</rt></ruby> では、いつも <ruby>温<rt>あたた</rt></ruby>かい ご飯 を <ruby>茶碗<rt>ちゃわん</rt></ruby> に <ruby>盛<rt>も</rt></ruby>って <ruby>食<rt>た</rt></ruby>べます — Dans les repas japonais, on mange toujours du **riz cuit** chaud servi dans un bol.
- <ruby>朝<rt>あさ</rt></ruby> ごはん に 納豆 と ご飯 を <ruby>一緒<rt>いっしょ</rt></ruby> に <ruby>食<rt>た</rt></ruby>べる の が <ruby>好き<rt>すき</rt></ruby> です — J'aime manger du **riz** avec du natto pour le petit-déjeuner.
- <ruby>夕方<rt>ゆうがた</rt></ruby> に なった ので、そろそろ <ruby>夕<rt>ゆう</rt></ruby> ご飯 の <ruby>準備<rt>じゅんび</rt></ruby> を 始めます — Comme c'est le soir, je vais bientôt commencer à préparer le **repas du soir** (dîner).

### n5_v_89 → v_89 · ちゃわん

**Statut** : PROPOSITION, non validée

- **A2-04-D0199** (decision, writings) : 茶碗 est la graphie en kanji de ちゃわん : même mot, même lecture, simple variante d'écriture (kana / kanji). — avant `null` → après `["茶碗"]`
- **A2-04-D0200** (abandon, senses) : Le premier est repris dans la nuance ; le second est trop général. — avant `["Bol à thé (historiquement)","Bol en céramique"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ちゃわん · ちゃわん · chawan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › ustensiles |
| sens | Bol à riz ; Bol à thé (historiquement) ; Bol en céramique |
| nuance | Nom désignant traditionnellement le bol en céramique utilisé pour manger le riz (ou autrefois pour le thé, <ruby>茶碗<rt>ちゃわん</rt></ruby> - chawan, qui s'écrit aussi directement ainsi en kanji). |
| particules |  |
| furigana | ちゃわん |
| exemple | ちゃわん に ご<ruby>飯<rt>はん</rt></ruby> を <ruby>多<rt>おお</rt></ruby>く <ruby>入<rt>い</rt></ruby>れます 。 — Je mets beaucoup de **riz** dans le bol. |

**Mécanique**

- word : `"ちゃわん"`
- readings : `[{"kana":"ちゃわん","romaji":"chawan","furigana":"ちゃわん","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[{"form":"茶碗","furigana":"<ruby>茶碗<rt>ちゃわん</rt></ruby>"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Littéralement « bol à thé » : il sert aujourd'hui surtout pour le riz."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bol (à riz)** | alimentation_cuisine › vaisselle_ustensiles › vaisselle | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- お<ruby>米<rt>こめ</rt></ruby> が <ruby>入<rt>はい</rt></ruby>った ちゃわん を <ruby>両手<rt>りょうて</rt></ruby> で <ruby>持<rt>も</rt></ruby>って <ruby>食<rt>た</rt></ruby>べます — Je tiens le **bol à riz** rempli de riz à deux mains pour manger.
- うっかり ちゃわん を <ruby>落<rt>お</rt></ruby>として、<ruby>割<rt>わ</rt></ruby>ってしまいました — J'ai étourdiment fait tomber le **bol à riz** et je l'ai cassé.
- <ruby>新<rt>あたら</rt></ruby>しい ちゃわん と お<ruby>箸<rt>はし</rt></ruby> を <ruby>食器<rt>しょっき</rt></ruby><ruby>屋<rt>や</rt></ruby> で <ruby>買<rt>か</rt></ruby>いました — J'ai acheté un nouveau **bol à riz** et des baguettes dans un magasin de vaisselle.

### n5_v_90 → v_90 · とり肉

**Statut** : PROPOSITION, non validée

- **A2-04-D0143** (decision, tags) : Commandé, demandé ou nommé au restaurant. lieu_konbini écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`
- **A2-04-D0144** (decision, writings) : 鶏肉 est la graphie en kanji de とり肉 : même mot, même lecture, simple variante d'écriture (kana / kanji). — avant `null` → après `["鶏肉"]`

| Champ source | Valeur |
|---|---|
| mot, lecture | とり肉 · とりにく · toriniku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Viande de poulet ; Poulet (viande) |
| nuance | Nom composé de <ruby>鳥<rt>とり</rt></ruby> (tori, oiseau/volaille) et de <ruby>肉<rt>にく</rt></ruby> (niku, viande), désignant spécifiquement la chair de poulet consommée en cuisine (s'écrit aussi <ruby>鶏肉<rt>とりにく</rt></ruby> toriniku). |
| particules |  |
| furigana | とり<ruby>肉<rt>にく</rt></ruby> |
| exemple | きょう の <ruby>夕飯<rt>ゆうはん</rt></ruby> は とり<ruby>肉<rt>にく</rt></ruby> の カレー です 。 — Le dîner d'aujourd'hui est un curry au **poulet**. |

**Mécanique**

- word : `"とり肉"`
- readings : `[{"kana":"とりにく","romaji":"toriniku","furigana":"とり<ruby>肉<rt>にく</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[{"form":"鶏肉","furigana":"<ruby>鶏肉<rt>とりにく</rt></ruby>"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le poulet vivant se dit 鶏 (にわとり)."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Poulet (viande)** (Viande de poulet) | alimentation_cuisine › aliments › viandes | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- スーパー で とり<ruby>肉<rt>にく</rt></ruby> と <ruby>野菜<rt>やさい</rt></ruby> を <ruby>買<rt>か</rt></ruby>って、<ruby>夕方<rt>ゆうがた</rt></ruby> カレー を <ruby>作<rt>つく</rt></ruby>りました — J'ai acheté de la **viande de poulet** et des légumes au supermarché, puis j'ai fait du curry le soir.
- とり<ruby>肉<rt>にく</rt></ruby> は <ruby>脂肪<rt>しぼう</rt></ruby> が <ruby>少<rt>すこ</rt></ruby>なくて ヘルシー な ので よく <ruby>食<rt>た</rt></ruby>べます — Je mange souvent de la **viande de poulet** car elle est faible en graisses et saine.
- こんがり <ruby>焼<rt>や</rt></ruby>いた とり<ruby>肉<rt>にく</rt></ruby> に <ruby>塩<rt>しお</rt></ruby> と コショウ を かけます — Je mets du sel et du poivre sur la **viande de poulet** bien dorée.

### n5_v_93 → v_93 · カップ

**Statut** : PROPOSITION, non validée

- **A2-04-D0204** (abandon, senses) : Redondants avec « tasse » ; le mug est repris dans la nuance. — avant `["Mug","Tasse à café/thé"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | カップ · かっぷ · kappu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › ustensiles |
| sens | Tasse ; Gobelet ; Mug ; Tasse à café/thé |
| nuance | Mot en katakana issu de l'anglais 'cup', désignant une tasse avec ou sans anse, ou un gobelet utilisé pour boire des boissons chaudes ou froides. |
| particules |  |
| furigana | カップ |
| exemple | カップ に コーヒー を <ruby>注<rt>そそ</rt></ruby>ぎます 。 — Je verse du café dans la **tasse**. |

**Mécanique**

- word : `"カップ"`
- readings : `[{"kana":"かっぷ","romaji":"kappu","furigana":"カップ","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Récipient à anse (tasse, mug) ; le verre sans anse se dit コップ."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Tasse** (Gobelet) | alimentation_cuisine › vaisselle_ustensiles › vaisselle | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- お<ruby>気<rt>き</rt></ruby>に<ruby>入<rt>い</rt></ruby>り の カップ に <ruby>温<rt>あたた</rt></ruby>かい コーヒー を <ruby>入<rt>い</rt></ruby>れました — J'ai versé du café chaud dans ma tasse préférée.
- マグカップ を <ruby>両手<rt>りょうて</rt></ruby> で <ruby>持<rt>も</rt></ruby>って、<ruby>手<rt>て</rt></ruby> を <ruby>温<rt>あたた</rt></ruby>めて います — Je tiens la tasse à deux mains pour me réchauffer les mains.
- うっかり カップ を <ruby>机<rt>つくえ</rt></ruby> から <ruby>落<rt>お</rt></ruby>としてしまいました — J'ai maladroitement fait tomber la tasse de la table.

### n5_v_94 → v_94 · カレー

**Statut** : PROPOSITION, non validée

- **A2-04-D0171** (decision, tags) : Commandé, demandé ou nommé au restaurant. lieu_konbini écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`
- **A2-04-D0172** (abandon, senses) : Repris dans la nuance. — avant `["Curry japonais"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | カレー · かれー · karee |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › repas |
| sens | Curry ; Curry japonais ; Riz au curry |
| nuance | Mot en katakana issu de l'anglais 'curry', désignant le plat très populaire au Japon. Généralement servi sur du riz : カレーライス (karee raisu). |
| particules |  |
| furigana | カレー |
| exemple | <ruby>辛<rt>から</rt></ruby>い カレー を <ruby>食<rt>た</rt></ruby>べる の が <ruby>好<rt>す</rt></ruby>き です 。 — J'aime manger du **curry** épicé. |

**Mécanique**

- word : `"カレー"`
- readings : `[{"kana":"かれー","romaji":"karee","furigana":"カレー","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Désigne d'ordinaire le curry japonais servi avec du riz (カレーライス)."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Curry** (Riz au curry) | alimentation_cuisine › aliments › produits_prepares | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- きょう の <ruby>晩<rt>ばん</rt></ruby> ごはん は <ruby>野菜<rt>やさい</rt></ruby> と とり<ruby>肉<rt>にく</rt></ruby> が たくさん <ruby>入<rt>はい</rt></ruby>った カレー です — Le dîner d'aujourd'hui est un curry avec beaucoup de légumes et de viande de poulet.
- インド カレー は <ruby>辛<rt>から</rt></ruby>い です が、とても <ruby>美味<rt>おい</rt></ruby>しい です — Le curry indien est épicé mais très bon.
- お<ruby>腹<rt>なか</rt></ruby> が すいた ので、<ruby>食堂<rt>しょくどう</rt></ruby> で カレー ライス を <ruby>注文<rt>ちゅうもん</rt></ruby>しました — J'avais faim, alors j'ai commandé un riz au curry à la cantine.

### n5_v_95 → v_95 · コーヒー

**Statut** : PROPOSITION, non validée

- **A2-04-D0182** (abandon, senses) : Redondant. — avant `["Boisson au café"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | コーヒー · こーひー · koohii |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › boissons |
| sens | Café ; Boisson au café |
| nuance | Mot en katakana issu du néerlandais 'koffie', désignant la boisson à base de grains de café torréfiés. |
| particules |  |
| furigana | コーヒー |
| exemple | <ruby>毎朝<rt>まいあさ</rt></ruby> 、あたたかい コーヒー を <ruby>飲<rt>の</rt></ruby>みます 。 — Chaque matin, je bois un **café** chaud. |

**Mécanique**

- word : `"コーヒー"`
- readings : `[{"kana":"こーひー","romaji":"koohii","furigana":"コーヒー","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"La boisson ; l'établissement se dit 喫茶店 ou カフェ."`
- tags : `["lieu_konbini","lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Café (boisson)** | alimentation_cuisine › boissons › boissons_chaudes | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>香<rt>か</rt></ruby>り の いい コーヒー を <ruby>飲<rt>の</rt></ruby>いてから <ruby>仕事<rt>しごと</rt></ruby> を 始めます — Tous les matins, je commence le travail après avoir bu un café odorant.
- カフェ で <ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby> に コーヒー を <ruby>飲<rt>の</rt></ruby>みながら <ruby>話<rt>はな</rt></ruby>しました — J'ai discuté avec un ami dans un café tout en buvant du café.
- <ruby>夜<rt>よる</rt></ruby> は <ruby>眠<rt>ねむ</rt></ruby>れなくなる ので、コーヒー を <ruby>飲<rt>の</rt></ruby>まない ように しています — Je fais attention de ne pas boire de café le soir car je ne pourrais pas dormir.

### n5_v_97 → v_97 · パン

**Statut** : PROPOSITION, non validée

- **A2-04-D0153** (decision, tags) : Acheté couramment au konbini. lieu_restaurant écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_konbini"]`
- **A2-04-D0154** (abandon, senses) : Termes voisins, pas équivalents : une alternative doit être équivalente au sens. — avant `["Brioche","Viennoiserie"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | パン · ぱん · pan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Pain ; Brioche ; Viennoiserie |
| nuance | Mot en katakana issu du portugais 'pão', désignant le pain au sens large (baguette, pain de mie, brioches). Aliment très consommé au petit-déjeuner au Japon. |
| particules |  |
| furigana | パン |
| exemple | あさ は ごはん の <ruby>代<rt>か</rt></ruby>わりに パン を <ruby>食<rt>た</rt></ruby>べます 。 — Le matin, je mange du **pain** à la place du riz. |

**Mécanique**

- word : `"パン"`
- readings : `[{"kana":"ぱん","romaji":"pan","furigana":"パン","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_konbini"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Pain** | alimentation_cuisine › aliments › cereales_feculents | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>焼<rt>や</rt></ruby>きたて の パン に バター を つけて <ruby>食<rt>た</rt></ruby>べます — Tous les matins, je mange du **pain** frais avec du beurre tartiné dessus.
- <ruby>朝<rt>あさ</rt></ruby> <ruby>時間<rt>じかん</rt></ruby> が ない ので、パン と 牛乳 で <ruby>簡単<rt>かんたん</rt></ruby> な <ruby>朝食<rt>ちょうしょく</rt></ruby> に します — Je n'ai pas le temps le matin, alors je fais un petit-déjeuner simple avec du **pain** et du lait.
- <ruby>街<rt>まち</rt></ruby> の <ruby>美味<rt>おい</rt></ruby>しい パン<ruby>屋<rt>や</rt></ruby> で いろいろな パン を <ruby>買<rt>か</rt></ruby>いました — J'ai acheté différents types de **pain** dans une bonne boulangerie du quartier.

### n5_v_98 → v_98 · レストラン

**Statut** : PROPOSITION, non validée

- **A2-04-D0215** (decision, tags) : lieu_gare (ancienne catégorie « lieux ») écarté ; lieu_restaurant ajouté hors des candidats : c'est le mot du lieu lui-même. — avant `["lieu_gare"]` → après `["lieu_restaurant"]`
- **A2-04-D0216** (abandon, senses) : Redondant. — avant `["Établissement de restauration"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | レストラン · れすとらん · resutoran |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › restauration |
| sens | Restaurant ; Établissement de restauration |
| nuance | Mot en katakana issu du français 'restaurant', désignant un établissement où l'on sert des repas à table. |
| particules |  |
| furigana | レストラン |
| exemple | <ruby>週末<rt>しゅうまつ</rt></ruby> に <ruby>家族<rt>かぞく</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby> に レストラン で <ruby>食<rt>た</rt></ruby>べます 。 — Je mange au **restaurant** avec ma famille le week-end. |

**Mécanique**

- word : `"レストラン"`
- readings : `[{"kana":"れすとらん","romaji":"resutoran","furigana":"レストラン","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Plutôt un restaurant à l'occidentale ; un restaurant japonais traditionnel peut se dire 料理屋."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Restaurant** | alimentation_cuisine › restauration › restaurants | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今度<rt>こんど</rt></ruby> の <ruby>日曜日<rt>にちようび</rt></ruby>、<ruby>家族<rt>かぞく</rt></ruby> で <ruby>新<rt>あたら</rt></ruby>しい レストラン に <ruby>行<rt>い</rt></ruby>く <ruby>予定<rt>よてい</rt></ruby> です — Dimanche prochain, j'ai l'intention d'aller dans un nouveau **restaurant** en famille.
- その レストラン は フランス <ruby>料理<rt>りょうり</rt></ruby> が とても <ruby>美味<rt>おい</rt></ruby>しい こと で <ruby>有名<rt>ゆうめい</rt></ruby> です — Ce **restaurant** est célèbre pour sa très bonne cuisine française.
- お<ruby>誕生<rt>たんじょう</rt></ruby><ruby>日<rt>び</rt></ruby> の お<ruby>祝い<rt>いわい</rt></ruby> に、おしゃれ な レストラン を <ruby>予約<rt>よやく</rt></ruby>しました — J'ai réservé un **restaurant** chic pour fêter un anniversaire.

### n5_v_99 → v_99 · 卵

**Statut** : PROPOSITION, non validée

- **A2-04-D0149** (decision, tags) : Acheté couramment au konbini. lieu_restaurant écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_konbini"]`
- **A2-04-D0150** (abandon, senses) : Repris dans la nuance. — avant `["Œuf de poule"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 卵 · たまご · tamago |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Œuf ; Œuf de poule |
| nuance | Nom désignant l'œuf, ingrédient de base très courant en cuisine japonaise. S'écrit aussi <ruby>玉子<rt>たまご</rt></ruby> (tamago) quand il est cuit ou préparé. |
| particules |  |
| furigana | <ruby>卵<rt>たまご</rt></ruby> |
| exemple | <ruby>朝<rt>あさ</rt></ruby> ごはん に <ruby>卵<rt>たまご</rt></ruby> の <ruby>料理<rt>りょうり</rt></ruby> を <ruby>作<rt>つく</rt></ruby>ります 。 — Je prépare un plat à base d'**œufs** pour le petit-déjeuner. |

**Mécanique**

- word : `"卵"`
- readings : `[{"kana":"たまご","romaji":"tamago","furigana":"<ruby>卵<rt>たまご</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Désigne d'ordinaire l'œuf de poule."`
- tags : `["lieu_konbini"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Œuf** | alimentation_cuisine › aliments › ufs | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>朝<rt>あさ</rt></ruby> ごはん の ため に、<ruby>卵<rt>たまご</rt></ruby> を <ruby>茹<rt>ゆ</rt></ruby>でて ゆで<ruby>卵<rt>たまご</rt></ruby> を <ruby>作<rt>つく</rt></ruby>りました — J'ai fait bouillir un **œuf** pour préparer des œufs durs pour le petit-déjeuner.
- スーパー で <ruby>新鮮<rt>しんせん</rt></ruby> な <ruby>卵<rt>たまご</rt></ruby> の パック を <ruby>一<rt>一</rt></ruby>つ <ruby>買<rt>か</rt></ruby>いました — J'ai acheté une boîte d'**œufs** frais au supermarché.
- ボール に <ruby>卵<rt>たまご</rt></ruby> を <ruby>割<rt>わ</rt></ruby>り<ruby>入<rt>い</rt></ruby>れて、よく かきまぜます — Je casse un **œuf** dans un bol et je mélange bien.

### n5_v_101 → v_101 · 喫茶店

**Statut** : PROPOSITION, non validée

- **A2-04-D0217** (decision, tags) : lieu_gare écarté ; lieu_restaurant ajouté hors des candidats : on y commande comme au restaurant. — avant `["lieu_gare"]` → après `["lieu_restaurant"]`
- **A2-04-D0218** (abandon, senses) : Repris dans la nuance. — avant `["Coffee-shop à la japonaise"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 喫茶店 · きっさてん · kissaten |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › restauration |
| sens | Café ; Salon de thé traditionnel ; Coffee-shop à la japonaise |
| nuance | Nom désignant un salon de thé ou un café de style traditionnel japonais, par opposition aux chaînes de type Western ou aux restaurants. |
| particules |  |
| furigana | <ruby>喫<rt>きっ</rt></ruby><ruby>茶<rt>さ</rt></ruby><ruby>店<rt>てん</rt></ruby> |
| exemple | <ruby>午後<rt>ごご</rt></ruby> 、<ruby>静<rt>しず</rt></ruby>かな 喫茶店 で コーヒー を <ruby>飲<rt>の</rt></ruby>みます 。 — Cet après-midi, je bois un café dans un **salon de thé** calme. |

**Mécanique**

- word : `"喫茶店"`
- readings : `[{"kana":"きっさてん","romaji":"kissaten","furigana":"<ruby>喫<rt>きっ</rt></ruby><ruby>茶<rt>さ</rt></ruby><ruby>店<rt>てん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Café à la japonaise, souvent de style ancien ; la boisson se dit コーヒー."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Café (établissement)** (Salon de thé) | alimentation_cuisine › restauration › cafes | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>静<rt>しず</rt></ruby>かな 喫茶店 で <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>みながら コーヒー を <ruby>飲<rt>の</rt></ruby>みます — Je bois du café tout en lisant un livre dans un **café** (salon de thé) calme.
- この 喫茶店 は <ruby>昭和<rt>しょうわ</rt></ruby> の <ruby>雰囲気<rt>ふんいき</rt></ruby> が 残る レトロ な <ruby>店<rt>みせ</rt></ruby> です — Ce **café** est un établissement rétro qui conserve une ambiance de l'ère Showa.
- <ruby>午後<rt>ごご</rt></ruby> の <ruby>時間<rt>じかん</rt></ruby> に <ruby>友<rt>とも</rt></ruby>だち と 喫茶店 で <ruby>待ち合<rt>まちあ</rt></ruby>わせを します — Je donne rendez-vous à un ami dans un **café** dans l'après-midi.

### n5_v_102 → v_102 · 塩

**Statut** : PROPOSITION, non validée

- **A2-04-D0157** (decision, tags) : Vocabulaire peu utile dans les deux lieux : candidats écartés. — avant `["lieu_konbini","lieu_restaurant"]` → après `[]`
- **A2-04-D0158** (abandon, senses) : Redondant. — avant `["Sel de cuisine"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 塩 · しお · shio |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Sel ; Sel de cuisine |
| nuance | Nom désignant le sel, condiment fondamental utilisé pour assaisonner les plats ou en cuisine. |
| particules |  |
| furigana | <ruby>塩<rt>しお</rt></ruby> |
| exemple | この <ruby>料理<rt>りょうり</rt></ruby> に は ちょっと <ruby>塩<rt>しお</rt></ruby> が <ruby>多<rt>おお</rt></ruby>い です 。 — Il y a un peu trop de **sel** dans ce plat. |

**Mécanique**

- word : `"塩"`
- readings : `[{"kana":"しお","romaji":"shio","furigana":"<ruby>塩<rt>しお</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sel** | alimentation_cuisine › aliments › condiments_assaisonnements | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- スープ の <ruby>味<rt>あじ</rt></ruby> が ちょっと <ruby>薄<rt>うす</rt></ruby>い ので、<ruby>塩<rt>しお</rt></ruby> を <ruby>少<rt>すこ</rt></ruby>し <ruby>入<rt>い</rt></ruby>れます — Le goût de la soupe est un peu fade, alors j'ajoute un peu de **sel**.
- おにぎり を <ruby>作<rt>つく</rt></ruby>る <ruby>時<rt>とき</rt></ruby>、<ruby>手<rt>て</rt></ruby> に <ruby>塩<rt>しお</rt></ruby> を つけて <ruby>握<rt>にぎ</rt></ruby>ります — Quand je fais des onigiri, je m'humidifie les mains avec du **sel** pour les façonner.
- <ruby>焼<rt>や</rt></ruby>き<ruby>魚<rt>ざかな</rt></ruby> に <ruby>塩<rt>しお</rt></ruby> を ふって <ruby>香<rt>か</rt></ruby>ばしく <ruby>焼<rt>や</rt></ruby>き上げます — Je saupoudre du **sel** sur le poisson grillé et le fais cuire jusqu'à ce qu'il soit bien doré.

### n5_v_103 → v_103 · 夕飯

**Statut** : PROPOSITION, non validée

- **A2-04-D0173** (decision, tags) : Même choix que 晩ご飯 au lot 0 : lieu_restaurant gardé, lieu_konbini écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`
- **A2-04-D0174** (abandon, senses) : Régional ou vieilli en français ; non repris. — avant `["Souper"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 夕飯 · ゆうはん · yuuhan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › repas |
| sens | Repas du soir ; Dîner ; Souper |
| nuance | Nom désignant le repas du soir. Synonyme plus formel ou direct de <ruby>晩<rt>ばん</rt></ruby>ご<ruby>飯<rt>はん</rt></ruby> (bangohan). Composé de <ruby>夕<rt>ゆう</rt></ruby> (yuu, soir) et de <ruby>飯<rt>はん</rt></ruby> (han, repas). |
| particules |  |
| furigana | <ruby>夕<rt>ゆう</rt></ruby><ruby>飯<rt>はん</rt></ruby> |
| exemple | <ruby>今夜<rt>こんや</rt></ruby> の 夕飯 は <ruby>何<rt>なに</rt></ruby> を <ruby>作<rt>つく</rt></ruby>ります か 。 — Que préparons-nous pour le **dîner** ce soir ? |

**Mécanique**

- word : `"夕飯"`
- readings : `[{"kana":"ゆうはん","romaji":"yuuhan","furigana":"<ruby>夕<rt>ゆう</rt></ruby><ruby>飯<rt>はん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Un peu plus neutre que 晩ご飯, courant à l'oral."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Dîner** (Repas du soir) | alimentation_cuisine › repas › diner | evenement |  |  |

**Contexte (anciens exemples, lecture seule)**

- きょう の <ruby>夕飯<rt>ゆうはん</rt></ruby> は <ruby>何<rt>なに</rt></ruby> を <ruby>食<rt>た</rt></ruby>べよう かな と <ruby>考<rt>かんが</rt></ruby>えています — Je réfléchis à ce que je vais manger pour le **repas du soir** aujourd'hui.
- <ruby>家族<rt>かぞく</rt></ruby> みんな で <ruby>夕飯<rt>ゆうはん</rt></ruby> を <ruby>食<rt>た</rt></ruby>べながら、きょうの <ruby>出来事<rt>できごと</rt></ruby> を <ruby>話<rt>はな</rt></ruby>します — Tout en prenant le **repas du soir** en famille, nous discutons de ce qui s'est passé aujourd'hui.
- <ruby>遅<rt>おそ</rt></ruby>くまで <ruby>残業<rt>ざんぎょう</rt></ruby> だったので、<ruby>家<rt>いえ</rt></ruby> に <ruby>帰<rt>かえ</rt></ruby>って から <ruby>夕飯<rt>ゆうはん</rt></ruby> を <ruby>作<rt>つく</rt></ruby>ります — Comme j'ai fait des heures supplémentaires tard, je prépare le **repas du soir** après être rentré à la maison.

### n5_v_104 → v_104 · 料理

**Statut** : PROPOSITION, non validée

- **A2-04-D0175** (decision, tags) : Le tag ne vaut que pour les plats (sens 2) : il est porté par ce sens. lieu_konbini écarté. (porté par un sens) — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`
- **A2-04-D0176** (decision, senses) : Deux sens : une activité (cuisiner, 料理する) et son résultat (un plat), deux référents et deux types sémantiques distincts. suru_compatible : 料理する. — avant `["Cuisine","Plat","Spécialité culinaire","Action de cuisiner"]` → après `["S1 Cuisine (activité)","S2 Plat"]`
- **A2-04-D0177** (abandon, senses) : Emploi de S2 (日本料理), repris dans sa nuance. — avant `["Spécialité culinaire"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 料理 · りょうり · ryouri |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › cuisine |
| sens | Cuisine ; Plat ; Spécialité culinaire ; Action de cuisiner |
| nuance | Nom désignant à la fois l'art de cuisiner (préparer des plats) et le plat préparé lui-même (ex. : <ruby>日本<rt>にほん</rt></ruby><ruby>料理<rt>りょうり</rt></ruby> (nihon ryouri, cuisine japonaise). S'associe souvent au verbe する (suru) faire la cuisine. |
| particules |  |
| furigana | <ruby>料<rt>りょう</rt></ruby><ruby>理<rt>り</rt></ruby> |
| exemple | <ruby>母<rt>はは</rt></ruby> は <ruby>毎日<rt>まいにち</rt></ruby> おいしい <ruby>料理<rt>りょうり</rt></ruby> を <ruby>作<rt>つく</rt></ruby>ってくれます 。 — Ma mère me prépare de bons **plats** délicieux tous les jours. |

**Mécanique**

- word : `"料理"`
- readings : `[{"kana":"りょうり","romaji":"ryouri","furigana":"<ruby>料<rt>りょう</rt></ruby><ruby>理<rt>り</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `true`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Cuisine** (Préparation des plats) | alimentation_cuisine › cuisine_preparation | action |  | 料理する : cuisiner. |
| 2 | **Plat** (Mets) | alimentation_cuisine › aliments › produits_prepares | substance_matiere | tags lieu_restaurant | 日本料理 : la cuisine japonaise (les plats). |

**Contexte (anciens exemples, lecture seule)**

- <ruby>母<rt>はは</rt></ruby> は <ruby>毎日<rt>まいにち</rt></ruby> <ruby>美味<rt>おい</rt></ruby>しい <ruby>料理<rt>りょうり</rt></ruby> を <ruby>作<rt>つく</rt></ruby>ってくれます — Ma mère me prépare de bons **plats** (cuisine) tous les jours.
- フランス <ruby>料理<rt>りょうり</rt></ruby> の <ruby>中<rt>なか</rt></ruby> で、グラタン が <ruby>一番<rt>いちばん</rt></ruby> <ruby>好き<rt>すき</rt></ruby> です — Parmi la **cuisine** française, j'aime par-dessus tout le gratin.
- この <ruby>本<rt>ほん</rt></ruby> を <ruby>見<rt>み</rt></ruby>ながら、<ruby>新<rt>あたら</rt></ruby>しい <ruby>日本<rt>にほん</rt></ruby> の <ruby>料理<rt>りょうり</rt></ruby> に <ruby>挑戦<rt>ちょうせん</rt></ruby>します — En regardant ce livre, je m'essaie à une nouvelle **cuisine** japonaise.

### n5_v_108 → v_108 · 牛乳

**Statut** : PROPOSITION, non validée

- **A2-04-D0183** (decision, tags) : Acheté couramment au konbini. lieu_restaurant écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_konbini"]`
- **A2-04-D0184** (abandon, senses) : Le premier est repris dans la nuance ; le second est redondant. — avant `["Lait de vache","Lait frais"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 牛乳 · ぎゅうにゅう · gyuunyuu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › boissons |
| sens | Lait de vache ; Lait frais |
| nuance | Nom composé de <ruby>牛<rt>ぎゅう</rt></ruby> (bœuf/vache) et de <ruby>乳<rt>にゅう</rt></ruby> (lait), désignant spécifiquement le lait de vache destiné à la consommation (on utilise plus simplement le mot en katakana ミルク (miruku) pour le lait en général ou dans d'autres contextes). |
| particules |  |
| furigana | <ruby>牛<rt>ぎゅう</rt></ruby><ruby>乳<rt>にゅう</rt></ruby> |
| exemple | <ruby>毎朝<rt>まいあさ</rt></ruby> 、<ruby>体<rt>からだ</rt></ruby> の ため に <ruby>牛乳<rt>ぎゅうにゅう</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みます 。 — Chaque matin, je bois du **lait de vache** pour la santé. |

**Mécanique**

- word : `"牛乳"`
- readings : `[{"kana":"ぎゅうにゅう","romaji":"gyuunyuu","furigana":"<ruby>牛<rt>ぎゅう</rt></ruby><ruby>乳<rt>にゅう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lait de vache ; ミルク s'emploie aussi, surtout pour le café."`
- tags : `["lieu_konbini"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Lait** | alimentation_cuisine › aliments › produits_laitiers | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>新鮮<rt>しんせん</rt></ruby> な 牛乳 を <ruby>一<rt>い</rt></ruby>コップ <ruby>飲<rt>の</rt></ruby>みます — Tous les matins, je bois un verre de **lait de vache** frais.
- パン と 牛乳 は <ruby>朝食<rt>ちょうしょく</rt></ruby> に とても よく <ruby>合<rt>あ</rt></ruby>います — Le pain et le **lait de vache** vont très bien ensemble pour le petit-déjeuner.
- <ruby>料理<rt>りょうり</rt></ruby> に 牛乳 を <ruby>入<rt>い</rt></ruby>れる と、まろやか で <ruby>美味<rt>おい</rt></ruby>しく なります — Ajouter du **lait de vache** dans les plats les rend onctueux et délicieux.

### n5_v_109 → v_109 · 牛肉

**Statut** : PROPOSITION, non validée

- **A2-04-D0145** (decision, tags) : Commandé, demandé ou nommé au restaurant. lieu_konbini écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 牛肉 · ぎゅうにく · gyuuniku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Viande de bœuf ; Bœuf (viande) |
| nuance | Nom composé de <ruby>牛<rt>ぎゅう</rt></ruby> (bœuf) et de <ruby>肉<rt>にく</rt></ruby> (viande), désignant la chair de bœuf (gyuuniku) utilisée en cuisine. |
| particules |  |
| furigana | <ruby>牛<rt>ぎゅう</rt></ruby><ruby>肉<rt>にく</rt></ruby> |
| exemple | この <ruby>店<rt>みせ</rt></ruby> の <ruby>牛肉<rt>ぎゅうにく</rt></ruby> は とても やわらかい です 。 — La **viande de bœuf** de ce magasin est très tendre. |

**Mécanique**

- word : `"牛肉"`
- readings : `[{"kana":"ぎゅうにく","romaji":"gyuuniku","furigana":"<ruby>牛<rt>ぎゅう</rt></ruby><ruby>肉<rt>にく</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bœuf (viande)** (Viande de bœuf) | alimentation_cuisine › aliments › viandes | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今夜<rt>こんや</rt></ruby> の すき<ruby>焼<rt>や</rt></ruby>き の ため に、<ruby>美味<rt>おい</rt></ruby>しい 牛肉 を <ruby>買<rt>か</rt></ruby>いました — J'ai acheté de la bonne **viande de bœuf** pour le sukiyaki de ce soir.
- この スーパー の 牛肉 は <ruby>品質<rt>ひんしつ</rt></ruby> が よくて <ruby>人気<rt>にんき</rt></ruby> が あります — La **viande de bœuf** de ce supermarché est de bonne qualité et populaire.
- 牛肉 と <ruby>野菜<rt>やさい</rt></ruby> を <ruby>炒<rt>いた</rt></ruby>めて、<ruby>簡単<rt>かんたん</rt></ruby> な おかず を <ruby>作<rt>つく</rt></ruby>ります — Je fais sauter de la **viande de bœuf** avec des légumes pour préparer un accompagnement simple.

### n5_v_110 → v_110 · 砂糖

**Statut** : PROPOSITION, non validée

- **A2-04-D0159** (decision, tags) : Vocabulaire peu utile dans les deux lieux : candidats écartés. — avant `["lieu_konbini","lieu_restaurant"]` → après `[]`
- **A2-04-D0160** (abandon, senses) : Redondant. — avant `["Sucre de cuisine"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 砂糖 · さとう · satou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Sucre ; Sucre de cuisine |
| nuance | Nom désignant le sucre, condiment ou ingrédient sucrant fondamental en cuisine et en pâtisserie. |
| particules |  |
| furigana | <ruby>砂<rt>さ</rt></ruby><ruby>糖<rt>とう</rt></ruby> |
| exemple | コーヒー に <ruby>砂糖<rt>さとう</rt></ruby> を ふたつ <ruby>入<rt>い</rt></ruby>れます 。 — Je mets deux morceaux de **sucre** dans mon café. |

**Mécanique**

- word : `"砂糖"`
- readings : `[{"kana":"さとう","romaji":"satou","furigana":"<ruby>砂<rt>さ</rt></ruby><ruby>糖<rt>とう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sucre** | alimentation_cuisine › aliments › condiments_assaisonnements | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- コーヒー に <ruby>砂糖<rt>さとう</rt></ruby> と ミルク を <ruby>入<rt>い</rt></ruby>れて <ruby>飲<rt>の</rt></ruby>みます — Je bois mon café en y mettant du **sucre** et du lait.
- お<ruby>菓子<rt>かし</rt></ruby> を <ruby>作<rt>つく</rt></ruby>る <ruby>時<rt>とき</rt></ruby>、<ruby>多<rt>おお</rt></ruby>く の <ruby>砂糖<rt>さとう</rt></ruby> が <ruby>必要<rt>ひつよう</rt></ruby> です — Beaucoup de **sucre** est nécessaire lorsque l'on fait des pâtisseries.
- あまい もの が すき な ので、<ruby>料理<rt>りょうり</rt></ruby> に ちょっと <ruby>砂糖<rt>さとう</rt></ruby> を <ruby>加<rt>くわ</rt></ruby>えます — J'aime les choses sucrées, alors j'ajoute un peu de **sucre** à la cuisine.

### n5_v_111 → v_111 · 箸

**Statut** : PROPOSITION, non validée

- **A2-04-D0207** (decision, tags) : Aucun candidat hérité ; lieu_konbini et lieu_restaurant ajoutés : au konbini, on propose des baguettes avec le bento (お箸おつけしますか), et on les demande au restaurant. — avant `[]` → après `["lieu_konbini","lieu_restaurant"]`
- **A2-04-D0208** (abandon, senses) : Redondant. — avant `["Baguettes japonaises"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 箸 · はし · hashi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › ustensiles |
| sens | Baguettes (pour manger) ; Baguettes japonaises |
| nuance | Nom désignant les baguettes traditionnelles (<ruby>箸<rt>はし</rt></ruby> - hashi) utilisées pour manger. Côté pitch accent (changement d'intonation), la voix commence haut et descend, il faut donc placer l'intonation sur le 'ha'. |
| particules |  |
| furigana | <ruby>箸<rt>はし</rt></ruby> |
| exemple | 1 <ruby>人<rt>にん</rt></ruby> に つき 、<ruby>箸<rt>はし</rt></ruby> を 1 <ruby>膳<rt>ぜん</rt></ruby> <ruby>使<rt>つか</rt></ruby>います 。 — On utilise une paire de **baguettes** par personne. |

**Mécanique**

- word : `"箸"`
- readings : `[{"kana":"はし","romaji":"hashi","furigana":"<ruby>箸<rt>はし</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Souvent お箸, forme polie. Ne pas confondre avec 橋 (はし, le pont), homophone."`
- tags : `["lieu_konbini","lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Baguettes** | alimentation_cuisine › vaisselle_ustensiles › couverts | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本<rt>にほん</rt></ruby> の <ruby>食事<rt>しょくじ</rt></ruby> では、いつも <ruby>箸<rt>はし</rt></ruby> を <ruby>使<rt>つか</rt></ruby>って <ruby>料理<rt>りょうり</rt></ruby> を <ruby>食<rt>た</rt></ruby>べます — Dans les repas japonais, on utilise toujours des **baguettes** pour manger les plats.
- うまく <ruby>箸<rt>はし</rt></ruby> を <ruby>持<rt>も</rt></ruby>って、<ruby>小<rt>ちい</rt></ruby>さな <ruby>豆<rt>まめ</rt></ruby> を つまみます — Je tiens bien mes **baguettes** pour attraper de petits haricots.
- お<ruby>弁当<rt>べんとう</rt></ruby> を <ruby>買<rt>か</rt></ruby>った <ruby>時<rt>とき</rt></ruby>、コンビニ で <ruby>箸<rt>はし</rt></ruby> を もらいました — Quand j'ai acheté un bento, j'ai reçu des **baguettes** au konbini.

### n5_v_112 → v_112 · 紅茶

**Statut** : PROPOSITION, non validée

- **A2-04-D0181** (abandon, senses) : Repris dans la nuance. — avant `["Thé rouge (traduction littérale)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 紅茶 · こうちゃ · koucha |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › boissons |
| sens | Thé noir ; Thé rouge (traduction littérale) |
| nuance | Mot utilisé pour le thé noir de style occidental, à ne pas confondre avec le thé vert traditionnel <ruby>緑茶<rt>りょくちゃ</rt></ruby> (ryoukucha) ou <ruby>お茶<rt>おちゃ</rt></ruby> (ocha). |
| particules |  |
| furigana | <ruby>紅<rt>こう</rt></ruby><ruby>茶<rt>ちゃ</rt></ruby> |
| exemple | ケーキ と <ruby>一緒<rt>いっしょ</rt></ruby> に あたたかい <ruby>紅茶<rt>こうちゃ</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みます 。 — Je bois du **thé noir** chaud avec un gâteau. |

**Mécanique**

- word : `"紅茶"`
- readings : `[{"kana":"こうちゃ","romaji":"koucha","furigana":"<ruby>紅<rt>こう</rt></ruby><ruby>茶<rt>ちゃ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Littéralement « thé rouge »."`
- tags : `["lieu_konbini","lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Thé noir** | alimentation_cuisine › boissons › boissons_chaudes | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>午後<rt>ごご</rt></ruby> の ティータイム に、<ruby>温<rt>あたた</rt></ruby>かい 紅茶 を <ruby>一杯<rt>いっぱい</rt></ruby> <ruby>飲<rt>の</rt></ruby>みます — Je bois une tasse de **thé noir** chaud pendant la pause de l'après-midi.
- イギリス の <ruby>人<rt>ひと</rt></ruby> は ミルク を <ruby>入<rt>い</rt></ruby>れて 紅茶 を <ruby>楽<rt>たの</rt></ruby>しむ <ruby>事<rt>こと</rt></ruby> が <ruby>多<rt>おお</rt></ruby>い です — Les Britanniques apprécient souvent le **thé noir** en y ajoutant du lait.
- カフェ で デザート の ケーキ と <ruby>一緒<rt>いっしょ</rt></ruby> に 紅茶 を <ruby>注文<rt>ちゅうもん</rt></ruby>しました — J'ai commandé du **thé noir** avec un gâteau en dessert au café.

### n5_v_113 → v_113 · 肉

**Statut** : PROPOSITION, non validée

- **A2-04-D0141** (decision, tags) : Commandé, demandé ou nommé au restaurant. Peu acheté au konbini : lieu_konbini écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`
- **A2-04-D0142** (abandon, senses) : Terme technique ; non repris. — avant `["Chair animale"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 肉 · にく · niku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Viande ; Chair animale |
| nuance | Nom désignant la viande (<ruby>肉<rt>にく</rt></ruby> - niku) de manière générale (bœuf, porc, poulet, etc.), utilisé seul ou en suffixe. Comme <ruby>牛肉<rt>ぎゅうにく</rt></ruby> (gyuuniku) ou <ruby>鶏肉<rt>とりにく</rt></ruby> (toriniku). |
| particules |  |
| furigana | <ruby>肉<rt>にく</rt></ruby> |
| exemple | すき焼き に は たくさん の <ruby>肉<rt>にく</rt></ruby> を <ruby>入<rt>い</rt></ruby>れます 。 — On met beaucoup de **viande** dans le sukiyaki. |

**Mécanique**

- word : `"肉"`
- readings : `[{"kana":"にく","romaji":"niku","furigana":"<ruby>肉<rt>にく</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Viande** | alimentation_cuisine › aliments › viandes | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- すき<ruby>焼<rt>や</rt></ruby>き の ため に、<ruby>美味<rt>おい</rt></ruby>しい 肉 を スーパー で <ruby>買<rt>か</rt></ruby>いました — J'ai acheté de la bonne **viande** au supermarché pour le sukiyaki.
- <ruby>焼肉<rt>やきにく</rt></ruby> は いろいろな <ruby>種類<rt>しゅるい</rt></ruby> の 肉 を <ruby>鉄板<rt>てっぱん</rt></ruby> で <ruby>焼<rt>や</rt></ruby>いて <ruby>食<rt>た</rt></ruby>べます — Pour le yakiniku, on fait cuire différents types de **viande** sur une plaque de fer pour les manger.
- カレー に たくさん の <ruby>野菜<rt>やさい</rt></ruby> と 肉 を <ruby>入<rt>い</rt></ruby>れて <ruby>煮込<rt>にこ</rt></ruby>みます — Je mets beaucoup de légumes et de **viande** dans le curry et je laisse mijoter.

### n5_v_114 → v_114 · 豚肉

**Statut** : PROPOSITION, non validée

- **A2-04-D0146** (decision, tags) : Commandé, demandé ou nommé au restaurant. lieu_konbini écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 豚肉 · ぶたにく · butaniku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Viande de porc ; Porc (viande) |
| nuance | Nom composé de <ruby>豚<rt>ぶた</rt></ruby> (buta, cochon) et de <ruby>肉<rt>にく</rt></ruby> (niku, viande), désignant la chair de porc (butaniku) très utilisée dans les plats japonais (comme le tonkatsu ou le ramen au porc). |
| particules |  |
| furigana | <ruby>豚<rt>ぶた</rt></ruby><ruby>肉<rt>にく</rt></ruby> |
| exemple | スーパー で 新鮮な 豚肉 を かいました 。 — J'ai acheté de la **viande de porc** fraîche au supermarché. |

**Mécanique**

- word : `"豚肉"`
- readings : `[{"kana":"ぶたにく","romaji":"butaniku","furigana":"<ruby>豚<rt>ぶた</rt></ruby><ruby>肉<rt>にく</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Porc (viande)** (Viande de porc) | alimentation_cuisine › aliments › viandes | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今夜<rt>こんや</rt></ruby> の <ruby>夕食<rt>ゆうしょく</rt></ruby> は, <ruby>豚肉<rt>ぶたにく</rt></ruby> と <ruby>野菜<rt>やさい</rt></ruby> を <ruby>使<rt>つか</rt></ruby>った どて<ruby>焼<rt>や</rt></ruby>き を <ruby>作<rt>つく</rt></ruby>ります — Pour le dîner de ce soir, je prépare un sauté avec de la **viande de porc** et des légumes.
- スーパー で <ruby>豚肉<rt>ぶたにく</rt></ruby> が お<ruby>買<rt>か</rt></ruby>い<ruby>得<rt>どく</rt></ruby> だったので、<ruby>一<rt>一</rt></ruby>パック <ruby>買<rt>か</rt></ruby>いました — La **viande de porc** était en promotion au supermarché, alors j'en ai acheté un paquet.
- <ruby>豚肉<rt>ぶたにく</rt></ruby> は ビタミン が <ruby>豊富<rt>ほうふ</rt></ruby> で、<ruby>体<rt>からだ</rt></ruby> に とても いい です — La **viande de porc** est riche en vitamines et est très bonne pour la santé.

### n5_v_115 → v_115 · 野菜

**Statut** : PROPOSITION, non validée

- **A2-04-D0151** (decision, tags) : Ni acheté au konbini ni commandé comme tel au restaurant : les deux candidats sont écartés. — avant `["lieu_konbini","lieu_restaurant"]` → après `[]`
- **A2-04-D0152** (abandon, senses) : Redondant. — avant `["Légumes frais"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 野菜 · やさい · yasai |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Légume ; Légumes frais |
| nuance | Nom désignant les légumes (yasai) de manière générale. Composé des kanji <ruby>野<rt>や</rt></ruby> (ya, champ/campagne) et <ruby>菜<rt>さい</rt></ruby> (lsai, égume/plante comestible). |
| particules |  |
| furigana | <ruby>野<rt>や</rt></ruby><ruby>菜<rt>さい</rt></ruby> |
| exemple | 健康 の ため に 、毎日 たくさん の 野菜 を 食べています 。 — Pour ma santé, je mange beaucoup de **légumes** tous les jours. |

**Mécanique**

- word : `"野菜"`
- readings : `[{"kana":"やさい","romaji":"yasai","furigana":"<ruby>野<rt>や</rt></ruby><ruby>菜<rt>さい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Légume** | alimentation_cuisine › aliments › legumes | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>健康<rt>けんこう</rt></ruby> の ため に、<ruby>毎日<rt>まいにち</rt></ruby> たくさん の <ruby>野菜<rt>やさい</rt></ruby> を <ruby>食<rt>た</rt></ruby>べる ように しています — Pour ma santé, je fais en sorte de manger beaucoup de **légumes** tous les jours.
- ご<ruby>近所<rt>きんじょ</rt></ruby> の <ruby>農家<rt>のうか</rt></ruby> から、<ruby>新鮮<rt>しんせん</rt></ruby> な <ruby>野菜<rt>やさい</rt></ruby> を たくさん もらいました — J'ai reçu beaucoup de **légumes** frais d'un agriculteur du voisinage.
- スープ に は <ruby>季節<rt>きせつ</rt></ruby> の <ruby>野菜<rt>やさい</rt></ruby> が たくさん <ruby>入<rt>はい</rt></ruby>って います — Il y a beaucoup de **légumes** de saison dans la soupe.

### n5_v_117 → v_117 · 食べる

**Statut** : PROPOSITION, non validée

- **A2-04-D0187** (decision, tags) : Verbe général, sans lieu propre : candidats écartés. — avant `["lieu_konbini","lieu_restaurant"]` → après `[]`
- **A2-04-D0188** (abandon, senses) : Redondant. — avant `["Consommer (un aliment)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 食べる · たべる · taberu |
| type, group | verbe ichidan · ru |
| catégorie (ancienne, indicative) | nourriture_boissons › vie_quotidienne |
| sens | Manger ; Consommer (un aliment) |
| nuance | Verbe ichidan fondamental désignant l'action de manger ou de se nourrir. |
| particules | を |
| furigana | <ruby>食<rt>た</rt></ruby>べる |
| exemple | <ruby>朝<rt>あさ</rt></ruby> ごはん に パン を <ruby>食<rt>た</rt></ruby>べます 。 — Je **mange** du pain au petit-déjeuner. |

**Mécanique**

- word : `"食べる"`
- readings : `[{"kana":"たべる","romaji":"taberu","furigana":"<ruby>食<rt>た</rt></ruby>べる","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"ru"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Manger** | alimentation_cuisine › consommation_alimentaire | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby> <ruby>朝<rt>あさ</rt></ruby> ごはん を <ruby>食<rt>た</rt></ruby>べて から、<ruby>家<rt>いえ</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます — Je **mange** mon petit-déjeuner tous les jours avant de quitter la maison.
- <ruby>日本<rt>にほん</rt></ruby> に <ruby>行<rt>い</rt></ruby>ったら、ぜひ <ruby>本場<rt>ほんば</rt></ruby> の お<ruby>寿司<rt>すし</rt></ruby> を <ruby>食<rt>た</rt></ruby>べたい です — Quand j'irai au Japon, je veux absolument **manger** de vrais sushis.
- <ruby>夜<rt>よる</rt></ruby> <ruby>遅<rt>おそ</rt></ruby>く に <ruby>重<rt>おも</rt></ruby>い もの を <ruby>食<rt>た</rt></ruby>べる の は、<ruby>体<rt>からだ</rt></ruby> に よく ありません — **Manger** des choses lourdes tard le soir n'est pas bon pour la santé.

### n5_v_118 → v_118 · 食べ物

**Statut** : PROPOSITION, non validée

- **A2-04-D0163** (decision, tags) : Terme générique, sans lieu propre : candidats écartés. — avant `["lieu_konbini","lieu_restaurant"]` → après `[]`
- **A2-04-D0164** (abandon, senses) : Adjectif, pas une traduction du nom. — avant `["Comestible"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 食べ物 · たべもの · tabemono |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Nourriture ; Aliment ; Comestible |
| nuance | Nom composé du radical du verbe <ruby>食<rt>た</rt></ruby>べる (taberu, manger) et de <ruby>物<rt>もの</rt></ruby> (mono, chose/objet), désignant la nourriture de manière générale. |
| particules |  |
| furigana | <ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby> |
| exemple | スーパー に おいしい <ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby> が たくさん あります 。 — Il y a beaucoup de **nourriture** délicieuse au supermarché. |

**Mécanique**

- word : `"食べ物"`
- readings : `[{"kana":"たべもの","romaji":"tabemono","furigana":"<ruby>食<rt>た</rt></ruby>べ<ruby>物<rt>もの</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Nourriture** (Aliment) | alimentation_cuisine › aliments | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- スーパー で <ruby>今週<rt>こんしゅう</rt></ruby> の <ruby>食<rt>た</rt></ruby>べもの を たくさん <ruby>買<rt>か</rt></ruby>いました — J'ai acheté beaucoup de **nourriture** pour la semaine au supermarché.
- <ruby>世界<rt>せかい</rt></ruby> の <ruby>様々<rt>さまざま</rt></ruby> な <ruby>食<rt>た</rt></ruby>べもの を <ruby>試<rt>ため</rt></ruby>す の が <ruby>大好<rt>だいす</rt></ruby>き です — J'adore essayer différentes **nourritures** du monde entier.
- <ruby>旅行<rt>りょこう</rt></ruby> の とき、その <ruby>国<rt>くに</rt></ruby> の <ruby>美味<rt>おい</rt></ruby>しい <ruby>食<rt>た</rt></ruby>べもの を <ruby>食<rt>た</rt></ruby>べる の が <ruby>楽しみ<rt>たのしみ</rt></ruby> です — Quand je voyage, j'ai hâte de **manger** la bonne **nourriture** de ce pays.

### n5_v_119 → v_119 · 食堂

**Statut** : PROPOSITION, non validée

- **A2-04-D0219** (decision, tags) : lieu_gare écarté ; lieu_restaurant ajouté hors des candidats. — avant `["lieu_gare"]` → après `["lieu_restaurant"]`
- **A2-04-D0220** (abandon, senses) : Repris dans la nuance. — avant `["Restaurant populaire"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 食堂 · しょくどう · shokudou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › restauration |
| sens | Cantine ; Réfectoire ; Cafétéria ; Restaurant populaire |
| nuance | Nom composé de <ruby>食<rt>しょく</rt></ruby> (shoku, manger/repas) et <ruby>堂<rt>どう</rt></ruby> (dou, salle/bâtiment), désignant une cantine (shokudou - scolaire ou d'entreprise), un réfectoire ou un petit restaurant populaire et sans prétention. |
| particules |  |
| furigana | <ruby>食<rt>しょく</rt></ruby><ruby>堂<rt>どう</rt></ruby> |
| exemple | <ruby>昼<rt>ひる</rt></ruby> ごはん は <ruby>会社<rt>かいしゃ</rt></ruby> の <ruby>食堂<rt>しょくどう</rt></ruby> で <ruby>食<rt>た</rt></ruby>べます 。 — Je prends mon déjeuner à la **cantine** de l'entreprise. |

**Mécanique**

- word : `"食堂"`
- readings : `[{"kana":"しょくどう","romaji":"shokudou","furigana":"<ruby>食<rt>しょく</rt></ruby><ruby>堂<rt>どう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Aussi un petit restaurant populaire, bon marché."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Cantine** (Réfectoire, Cafétéria) | alimentation_cuisine › restauration › restaurants | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>昼<rt>ひる</rt></ruby> ごはん の <ruby>時間<rt>じかん</rt></ruby> に なった ので、<ruby>会社<rt>かいしゃ</rt></ruby> の <ruby>食堂<rt>しょくどう</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます — C'est l'heure du déjeuner, alors je vais à la **cantine** de l'entreprise.
- この <ruby>大学<rt>だいがく</rt></ruby> の <ruby>食堂<rt>しょくどう</rt></ruby> は、<ruby>安<rt>やす</rt></ruby>くて ボリューム が あって <ruby>人気<rt>にんき</rt></ruby> です — La **cantine** de cette université est populaire car elle est bon marché et copieuse.
- <ruby>食堂<rt>しょくどう</rt></ruby> で <ruby>温<rt>おたた</rt></ruby>かい うどん と おにぎり を <ruby>注文<rt>ちゅうもん</rt></ruby>しました — J'ai commandé des udon chauds et des onigiri à la **cantine**.

### n5_v_120 → v_120 · 飲み物

**Statut** : PROPOSITION, non validée

- **A2-04-D0186** (abandon, senses) : Définition, pas une traduction. — avant `["Liquide buvable"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 飲み物 · のみもの · nomimono |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › boissons |
| sens | Boisson ; Liquide buvable |
| nuance | Nom composé du radical du verbe <ruby>飲<rt>の</rt></ruby>む (nomu, boire) et de <ruby>物<rt>もの</rt></ruby> (mono, chose/objet), désignant toute sorte de boisson (nomimono - eau, thé, jus, etc.). |
| particules |  |
| furigana | <ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby> |
| exemple | のど が かわいた ので 、<ruby>冷<rt>つめ</rt></ruby>たい <ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby> を <ruby>買<rt>か</rt></ruby>います 。 — J'ai soif, alors j'achète une **boisson** fraîche. |

**Mécanique**

- word : `"飲み物"`
- readings : `[{"kana":"のみもの","romaji":"nomimono","furigana":"<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"飲み物は？ : et comme boisson ? (au restaurant)."`
- tags : `["lieu_konbini","lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Boisson** | alimentation_cuisine › boissons | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>暑<rt>あつ</rt></ruby>い <ruby>日<rt>ひ</rt></ruby> に は、<ruby>冷<rt>つめ</rt></ruby>たい <ruby>飲み物<rt>のみもの</rt></ruby> を たくさん <ruby>飲<rt>の</rt></ruby>みたくなります — Les jours de chaleur, on a envie de boire beaucoup de **boissons** fraîches.
- スーパー で お<ruby>茶<rt>ちゃ</rt></ruby> や ジュース など の <ruby>飲み物<rt>のみもの</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました — J'ai acheté des **boissons** comme du thé et du jus au supermarché.
- パーティー の ため に、さまざまな <ruby>種類<rt>しゅるい</rt></ruby> の <ruby>飲み物<rt>のみもの</rt></ruby> を <ruby>用意<rt>ようい</rt></ruby>しました — J'ai préparé différentes sortes de **boissons** pour la fête.

### n5_v_121 → v_121 · 飴

**Statut** : PROPOSITION, non validée

- **A2-04-D0161** (decision, tags) : Acheté couramment au konbini. lieu_restaurant écarté. — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_konbini"]`
- **A2-04-D0162** (abandon, senses) : Variétés particulières ; « bonbon » couvre le sens. — avant `["Sucre d'orge","Caramel dur"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 飴 · あめ · ame |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › aliments |
| sens | Bonbon ; Sucre d'orge ; Caramel dur |
| nuance | Nom désignant les bonbons durs ou les sucreries souvent écrit en hiragana あめ (ame). *(Note : attention à ne pas le confondre avec <ruby>雨<rt>あめ</rt></ruby> - la pluie, qui se prononce de la même façon mais avec un pitch accent (changement d'intonation), la voix commence haut et descend, il faut donc placer l'intonation sur le premier 'a')*.)*. |
| particules |  |
| furigana | <ruby>飴<rt>あめ</rt></ruby> |
| exemple | <ruby>喉<rt>のど</rt></ruby> が <ruby>痛<rt>いた</rt></ruby>い ので 、<ruby>飴<rt>あめ</rt></ruby> を なめます 。 — J'ai mal à la gorge, alors je suce un **bonbon**. |

**Mécanique**

- word : `"飴"`
- readings : `[{"kana":"あめ","romaji":"ame","furigana":"<ruby>飴<rt>あめ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Ne pas confondre avec 雨 (あめ, la pluie), homophone."`
- tags : `["lieu_konbini"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bonbon** | alimentation_cuisine › aliments › produits_prepares | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- ノド が <ruby>痛<rt>いた</rt></ruby>い ので、<ruby>甘<rt>あま</rt></ruby>い 飴 を <ruby>舐<rt>な</rt></ruby>めて います — J'ai mal à la gorge, alors je suce un **bonbon** sucré.
- ポケット に いつも <ruby>小<rt>ちい</rt></ruby>さい 飴 が <ruby>入<rt>はい</rt></ruby>って います — Il y a toujours un petit **bonbon** dans ma poche.
- <ruby>子供<rt>こども</rt></ruby> の <ruby>時<rt>とき</rt></ruby>、お<ruby>母<rt>かあ</rt></ruby>さん から よく 飴 を もらいました — Quand j'étais enfant, maman me donnait souvent des **bonbons**.

### n5_v_122 → v_122 · 魚

**Statut** : PROPOSITION, non validée

- **A2-04-D0147** (decision, tags) : Le tag ne vaut que pour le poisson comme aliment (sens 2), pas pour l'animal : il est porté par ce sens. lieu_konbini écarté. (porté par un sens) — avant `["lieu_konbini","lieu_restaurant"]` → après `["lieu_restaurant"]`
- **A2-04-D0148** (decision, senses) : Deux sens, contrairement à 足 (lot 01) : le référent change (un animal vivant, une nourriture) et le type sémantique aussi (organisme_vivant, substance_matiere). Ce n'est pas une largeur de traduction. — avant `["Poisson","Poisson (chair ou animal)"]` → après `["S1 Poisson (animal)","S2 Poisson (aliment)"]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 魚 · さかな · sakana |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › animaux |
| sens | Poisson ; Poisson (chair ou animal) |
| nuance | Nom désignant le poisson, ingrédient essentiel de la cuisine japonaise traditionnelle (consommé grillé, bouilli, ou cru en sushi/sashimi). |
| particules |  |
| furigana | <ruby>魚<rt>さかな</rt></ruby> |
| exemple | <ruby>毎朝<rt>まいあさ</rt></ruby> 、<ruby>朝<rt>あさ</rt></ruby> ごはん に おいしい <ruby>魚<rt>さかな</rt></ruby> を <ruby>食<rt>た</rt></ruby>べます 。 — Chaque matin, je mange du bon **poisson** au petit-déjeuner. |

**Mécanique**

- word : `"魚"`
- readings : `[{"kana":"さかな","romaji":"sakana","furigana":"<ruby>魚<rt>さかな</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Poisson (animal)** | monde_naturel › animaux › poissons | organisme_vivant |  |  |
| 2 | **Poisson (aliment)** | alimentation_cuisine › aliments › poissons_produits_marins | substance_matiere | tags lieu_restaurant |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>川<rt>かわ</rt></ruby> や <ruby>海<rt>うみ</rt></ruby> に は たくさん の <ruby>魚<rt>さかな</rt></ruby> が <ruby>泳<rt>およ</rt></ruby>いで います — Il y a beaucoup de **poissons** qui nagent dans les rivières et la mer.
- <ruby>市場<rt>いちば</rt></ruby> で <ruby>新鮮<rt>しんせん</rt></ruby> な <ruby>魚<rt>さかな</rt></ruby> を <ruby>買<rt>か</rt></ruby>って、<ruby>夜<rt>よる</rt></ruby> は <ruby>塩焼き<rt>しおやき</rt></ruby> に します — J'achète du **poisson** frais au marché et je le fais grillé au sel le soir.
- ネコ は <ruby>魚<rt>さかな</rt></ruby> を <ruby>食<rt>た</rt></ruby>べる の が とても <ruby>大好<rt>だいす</rt></ruby>き です — Les chats adorent manger du **poisson**.

### n5_v_211 → v_211 · ナイフ

**Statut** : PROPOSITION, non validée

- **A2-04-D0213** (decision, tags) : Aucun candidat hérité ; lieu_restaurant ajouté : se demande au restaurant. — avant `[]` → après `["lieu_restaurant"]`
- **A2-04-D0214** (abandon, senses) : Le premier est repris dans la nuance ; le second relève de 包丁. — avant `["Couteau de table","Lame de cuisine"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ナイフ · ないふ · naifu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › cuisine |
| sens | Couteau ; Couteau de table ; Lame de cuisine |
| nuance | Mot en katakana issu de l'anglais (knife), désignant un couteau. Compteur spécifique : <ruby>本<rt>ほん</rt></ruby> (hon). |
| particules |  |
| furigana | ナイフ |
| exemple | ナイフ で パン を <ruby>切<rt>き</rt></ruby>ります 。 — Je coupe le pain avec un **couteau**. |

**Mécanique**

- word : `"ナイフ"`
- readings : `[{"kana":"ないふ","romaji":"naifu","furigana":"ナイフ","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Couteau de table ; le couteau de cuisine se dit 包丁."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Couteau** | alimentation_cuisine › vaisselle_ustensiles › couverts | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- ナイフ で トマト や キャベツ などの <ruby>野菜<rt>やさい</rt></ruby> を <ruby>細<rt>こま</rt></ruby>かく <ruby>切<rt>き</rt></ruby>りました — J'ai coupé finement des légumes comme des tomates et du chou avec un **couteau**.
- この ナイフ は とても <ruby>切<rt>き</rt></ruby>れ<ruby>味<rt>あじ</rt></ruby> が よくて、お<ruby>肉<rt>にく</rt></ruby> が <ruby>簡単<rt>かんたん</rt></ruby> に <ruby>切<rt>き</rt></ruby>れます — Ce **couteau** coupe très bien et permet de couper facilement la viande.
- <ruby>食卓<rt>しょくたく</rt></ruby> で パン に バター を <ruby>塗<rt>ぬ</rt></ruby>る ため に、<ruby>専用<rt>せんよう</rt></ruby> の ナイフ を <ruby>使<rt>つか</rt></ruby>います — J'utilise un **couteau** spécial pour étaler le beurre sur le pain à table.

### n5_v_225 → v_225 · お皿

**Statut** : PROPOSITION, non validée

- **A2-04-D0201** (decision, tags) : lieu_hotel (ancienne catégorie de la maison) écarté ; lieu_restaurant ajouté hors des candidats : l'assiette se demande au restaurant. — avant `["lieu_hotel"]` → après `["lieu_restaurant"]`
- **A2-04-D0202** (decision, writings) : 皿 n'est pas ajouté comme autre graphie de お皿 : retirer le préfixe お change la forme lexicale elle-même, pas seulement son écriture (contrairement à ちゃわん / 茶碗). Question ouverte : 皿 pourrait être une ENTRY distincte, à décider si un lot la rencontre. Mentionné dans la nuance. — avant `null` → après `[]`
- **A2-04-D0203** (abandon, senses) : Terme voisin, pas équivalent. — avant `["Coupelle"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | お皿 · おさら · osara |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › cuisine |
| sens | Assiette ; Plat ; Coupelle |
| nuance | Nom précédé du préfixe honorifique お (o-), désignant une assiette ou un plat. Compteur spécifique : <ruby>枚<rt>まい</rt></ruby> (mai). |
| particules |  |
| furigana | お<ruby>皿<rt>さら</rt></ruby> |
| exemple | りょうり を お<ruby>皿<rt>さら</rt></ruby> に <ruby>盛<rt>も</rt></ruby>ります 。 — Je sers le plat dans une **assiette**. |

**Mécanique**

- word : `"お皿"`
- readings : `[{"kana":"おさら","romaji":"osara","furigana":"お<ruby>皿<rt>さら</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Forme polie et courante ; 皿 (さら) sans お, à l'écrit et dans les composés."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Assiette** (Plat) | alimentation_cuisine › vaisselle_ustensiles › vaisselle | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- お<ruby>皿<rt>さら</rt></ruby> に <ruby>美味<rt>おい</rt></ruby>しそうな ケーキ を <ruby>乗<rt>の</rt></ruby>せて、テーブル に <ruby>運<rt>はこ</rt></ruby>びました — J'ai posé un gâteau qui avait l'air délicieux sur l'**assiette** et je l'ai apporté à la table.
- <ruby>食後<rt>しょくご</rt></ruby> に、<ruby>汚<rt>よご</rt></ruby>れた お<ruby>皿<rt>さら</rt></ruby> を まとめて <ruby>台所<rt>だいどころ</rt></ruby> へ <ruby>持<rt>も</rt></ruby>っていきました — Après le repas, j'ai regroupé les **assiettes** sales et je les ai apportées dans la cuisine.
- この お<ruby>皿<rt>さら</rt></ruby> は <ruby>大切<rt>たいせつ</rt></ruby>な <ruby>物<rt>もの</rt></ruby> なので、<ruby>割<rt>わ</rt></ruby>らない ように 気をつけて <ruby>洗<rt>あら</rt></ruby>います — Comme cette **assiette** est précieuse, je la lave en faisant attention de ne pas la casser.

### n5_v_230 → v_230 · コップ

**Statut** : PROPOSITION, non validée

- **A2-04-D0205** (decision, tags) : lieu_hotel écarté ; lieu_restaurant ajouté hors des candidats : un verre se demande au restaurant. — avant `["lieu_hotel"]` → après `["lieu_restaurant"]`
- **A2-04-D0206** (abandon, senses) : Pas équivalent : la tasse se dit カップ. — avant `["Tasse"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | コップ · こっぷ · koppu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › cuisine |
| sens | Verre ; Tasse ; Gobelet |
| nuance | Mot en katakana issu du néerlandais (kop) ou du portugais (copo), désignant un verre à boire, un gobelet ou une tasse sans anse. Compteur spécifique : <ruby>杯<rt>はい</rt></ruby> (hai). |
| particules |  |
| furigana | コップ |
| exemple | コップ に みず を いれます 。 — Je mets de l'eau dans le **verre**. |

**Mécanique**

- word : `"コップ"`
- readings : `[{"kana":"こっぷ","romaji":"koppu","furigana":"コップ","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Récipient sans anse ; la tasse se dit カップ."`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Verre** (Gobelet) | alimentation_cuisine › vaisselle_ustensiles › vaisselle | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>喉<rt>のど</rt></ruby> が <ruby>渇<rt>かわ</rt></ruby>いた ので、コップ に <ruby>冷<rt>つめ</rt></ruby>たい お<ruby>茶<rt>ちゃ</rt></ruby> を <ruby>入<rt>い</rt></ruby>れて <ruby>飲<rt>の</rt></ruby>みました — Comme j'avais soif, j'ai versé du thé froid dans un **verre** et je l'ai bu.
- <ruby>割<rt>わ</rt></ruby>れやすい ので、ガラス の コップ は <ruby>丁寧<rt>ていねい</rt></ruby> に <ruby>扱<rt>あつか</rt></ruby>って ください — Comme il se casse facilement, veuillez manipuler le **verre** en verre avec précaution.
- <ruby>食後<rt>しょくご</rt></ruby> に <ruby>家族<rt>かぞく</rt></ruby> <ruby>分<rt>ぶん</rt></ruby> の コップ を まとめて <ruby>洗<rt>あら</rt></ruby>いました — Après le repas, j'ai lavé tous les **verres** de la famille en même temps.

### n5_v_231 → v_231 · スプーン

**Statut** : PROPOSITION, non validée

- **A2-04-D0209** (decision, tags) : lieu_hotel écarté ; lieu_konbini et lieu_restaurant ajoutés : proposée au konbini avec un plat, demandée au restaurant. — avant `["lieu_hotel"]` → après `["lieu_konbini","lieu_restaurant"]`
- **A2-04-D0210** (abandon, senses) : Variétés particulières, redondantes. — avant `["Cuillère à soupe","Cuillère à café"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | スプーン · すぷーん · supuun |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › cuisine |
| sens | Cuillère ; Cuillère à soupe ; Cuillère à café |
| nuance | Mot en katakana issu de l'anglais (spoon), désignant une cuillère. Compteur spécifique : <ruby>本<rt>ほん</rt></ruby> (hon). |
| particules |  |
| furigana | スプーン |
| exemple | スプーン で スープ を <ruby>飲<rt>の</rt></ruby>みます 。 — Je bois la soupe avec une **cuillère**. |

**Mécanique**

- word : `"スプーン"`
- readings : `[{"kana":"すぷーん","romaji":"supuun","furigana":"スプーン","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_konbini","lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Cuillère** | alimentation_cuisine › vaisselle_ustensiles › couverts | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- カレーライス を <ruby>食<rt>た</rt></ruby>べる ため に、スプーン を <ruby>1<rt>いち</rt></ruby><ruby>本<rt>ぽん</rt></ruby> <ruby>使<rt>つか</rt></ruby>いました — J'ai utilisé une **cuillère** pour manger du curry japonais.
- スープ が <ruby>熱<rt>あつ</rt></ruby>かった ので、<><ruby>小<rt>ちい</rt></ruby>さい スプーン で ゆっくり <ruby>飲<rt>の</rt></ruby>みました — Comme la soupe était chaude, je l'ai bu lentement avec une petite **cuillère**.
- プリン や ヨーグルト を <ruby>食<rt>た</rt></ruby>える ように、スプーン を <ruby>準備<rt>じゅんび</rt></ruby> して ください — Veuillez préparer une **cuillère** pour pouvoir manger du flan ou du yaourt.

### n5_v_232 → v_232 · フォーク

**Statut** : PROPOSITION, non validée

- **A2-04-D0211** (decision, tags) : lieu_hotel écarté ; lieu_restaurant ajouté hors des candidats : se demande au restaurant. — avant `["lieu_hotel"]` → après `["lieu_restaurant"]`
- **A2-04-D0212** (abandon, senses) : Redondant. — avant `["Fourchette de table"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | フォーク · ふぉーく · fooku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › cuisine |
| sens | Fourchette ; Fourchette de table |
| nuance | Mot en katakana issu de l'anglais (fork), désignant une fourchette. Compteur spécifique : <ruby>本<rt>ほん</rt></ruby> (hon). |
| particules |  |
| furigana | フォーク |
| exemple | フォーク で パスタ を <ruby>食<rt>た</rt></ruby>べます 。 — Je mange des pâtes avec une **fourchette**. |

**Mécanique**

- word : `"フォーク"`
- readings : `[{"kana":"ふぉーく","romaji":"fooku","furigana":"フォーク","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Fourchette** | alimentation_cuisine › vaisselle_ustensiles › couverts | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- レストラン で パスタ を <ruby>注文<rt>ちゅうもん</rt></ruby> して、フォーク で <ruby>食<rt>た</rt></ruby>べました — J'ai commandé des pâtes au restaurant et je les ai mangées avec une **fourchette**.
- <ruby>肉<rt>にく</rt></ruby> を ナイフ で <ruby>切<rt>き</rt></ruby>る とき に、フォーク で しっかり <ruby>押<rt>お</rt></ruby>さえて おきます — Quand on coupe de la viande avec un couteau, on la maintient fermement avec la **fourchette**.
- サラダ を <ruby>取<rt>と</rt></ruby>り<ruby>分<rt>わ</rt></ruby>ける ため に、<ruby>大<rt>おお</rt></ruby>きな フォーク を <ruby>使<rt>つか</rt></ruby>いました — J'ai utilisé une grande **fourchette** pour servir la salade.

### n5_v_427 → v_427 · まずい

**Statut** : PROPOSITION, non validée

- **A2-04-D0196** (decision, senses) : Deux sens : une saveur, et une situation qui tourne mal (まずいことになった), deux référents distincts. — avant `["Mauvais (goût)","Désagréable (au goût)","Impropre","Fâcheux (situation critique)"]` → après `["S1 Mauvais (au goût)","S2 Fâcheux"]`
- **A2-04-D0197** (categorie-nulle, sens 2 · category) : Évaluation générale d'une situation : « propriété générale », sans domaine thématique propre. Addendum A5.
- **A2-04-D0198** (abandon, senses) : Le premier est redondant ; le second, trop vague. — avant `["Désagréable (au goût)","Impropre"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | まずい · まずい · mazui |
| type, group | adjectif en i · i |
| catégorie (ancienne, indicative) | descriptions_qualites › saveur |
| sens | Mauvais (goût) ; Désagréable (au goût) ; Impropre ; Fâcheux (situation critique) |
| nuance | **Adjectif en i** qualifiant un aliment qui a un mauvais goût, ou familièrement une situation délicate (« c'est mal barré / c'est problématique »). |
| particules |  |
| furigana | まずい |
| exemple | この りょうり は ちょっと **まずい** です 。 — Ce plat est un peu **mauvais** (immangeable). |

**Mécanique**

- word : `"まずい"`
- readings : `[{"kana":"まずい","romaji":"mazui","furigana":"まずい","default":true,"note":null}]`
- grammatical_class : `"adjectif_i"`
- group : `"i"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Familier pour le goût ; plus poli : おいしくない."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Mauvais (au goût)** (Pas bon) | alimentation_cuisine › gouts_alimentaires | propriete |  |  |
| 2 | **Fâcheux** (Embarrassant) | **null** | propriete |  | まずいことになった : ça tourne mal. |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>料理<rt>りょうり</rt></ruby> は まずい です — Ce plat a un **mauvais** goût.
- <ruby>塩<rt>しお</rt></ruby> を <ruby>入<rt>い</rt></ruby>れすぎて、スープ が まずくなりました — J'ai mis trop de sel et la soupe est devenue **immangeable**.
- 「<ruby>味<rt>あじ</rt></ruby> は どうですか」「ちょっと まずい です」 — « Quel est le goût ? » « C'est un peu **mauvais**. »

### n5_v_464 → v_464 · 甘い

**Statut** : PROPOSITION, non validée

- **A2-04-D0190** (decision, senses) : Deux sens : une saveur, et une attitude trop peu exigeante envers quelqu'un ou quelque chose (子供に甘い). — avant `["Sucré","Doux (saveur)","LaXiste","Ingénu"]` → après `["S1 Sucré","S2 Indulgent"]`
- **A2-04-D0191** (correction, senses) : Coquille de la source (anomalie déjà consignée). — avant `"LaXiste"` → après `"Laxiste"`
- **A2-04-D0192** (categorie-nulle, sens 2 · category) : Attitude générale envers autrui (trop indulgent) : « propriété générale », sans domaine thématique propre. Addendum A5.
- **A2-04-D0193** (abandon, senses) : Emploi 考えが甘い, repris dans la nuance du sens 2. — avant `["Ingénu"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 甘い · あまい · amai |
| type, group | adjectif en i · i |
| catégorie (ancienne, indicative) | descriptions_qualites › saveur |
| sens | Sucré ; Doux (saveur) ; LaXiste ; Ingénu |
| nuance | **Adjectif en i** qualifiant une saveur sucrée, ou par extension une attitude trop clémente, indulgente ou naïve (« être indulgent / trop laxiste envers quelqu'un »). |
| particules |  |
| furigana | <ruby>甘<rt>あま</rt></ruby>い |
| exemple | この ケーキ は とても **<ruby>甘<rt>あま</rt></ruby>い** です 。 — Ce gâteau est très **sucré**. |

**Mécanique**

- word : `"甘い"`
- readings : `[{"kana":"あまい","romaji":"amai","furigana":"<ruby>甘<rt>あま</rt></ruby>い","default":true,"note":null}]`
- grammatical_class : `"adjectif_i"`
- group : `"i"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sucré** (Doux) | alimentation_cuisine › gouts_alimentaires › sucre | propriete |  |  |
| 2 | **Indulgent** (Laxiste) | **null** | propriete |  | 子供に甘い : être indulgent avec les enfants ; 考えが甘い : avoir une vue trop optimiste. |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>果物<rt>くだもの</rt></ruby> は とても <ruby>甘<rt>あま</rt></ruby>い です — Ce fruit est très **sucré**.
- コーヒー に <ruby>砂糖<rt>さとう</rt></ruby> を <ruby>入<rt>い</rt></ruby>れて、<ruby>甘<rt>あま</rt></ruby>く します — Je mets du sucre dans le café pour le rendre **sucré**.
- <ruby>甘<rt>あま</rt></ruby>い お<ruby>菓子<rt>かし</rt></ruby> を <ruby>食<rt>た</rt></ruby>べたい です — Je veux manger des friandises **sucrées**.

### n5_v_481 → v_481 · 辛い

**Statut** : PROPOSITION, non validée

- **A2-04-D0194** (decision, senses) : Un sens, « épicé ». « Salé à l'excès » est un emploi régional, repris dans la nuance. — avant `["Épicé","Piquant","Salé à l'excès","Pénible (sens ancien)"]` → après `"un seul sens"`
- **A2-04-D0195** (correction, senses) : Confusion de la source : « pénible » est le sens de つらい, autre lecture du même kanji, donc une autre unité lexicale (lecture différente). Ce n'est pas un sens de からい ; non repris ici. — avant `"Pénible (sens ancien)"` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 辛い · からい · karai |
| type, group | adjectif en i · i |
| catégorie (ancienne, indicative) | descriptions_qualites › saveur |
| sens | Épicé ; Piquant ; Salé à l'excès ; Pénible (sens ancien) |
| nuance | **Adjectif en i** qualifiant une saveur piquante, brûlante (comme le piment ou le curry fort) ou excessivement salée. |
| particules |  |
| furigana | <ruby>辛<rt>から</rt></ruby>い |
| exemple | この カレー は とても **<ruby>辛<rt>から</rt></ruby>い** です 。 — Ce curry est très **épicé**. |

**Mécanique**

- word : `"辛い"`
- readings : `[{"kana":"からい","romaji":"karai","furigana":"<ruby>辛<rt>から</rt></ruby>い","default":true,"note":null}]`
- grammatical_class : `"adjectif_i"`
- group : `"i"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Se dit aussi d'un plat trop salé dans certaines régions (ailleurs : しょっぱい). Le même kanji se lit つらい, « pénible » : c'est un autre mot."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Épicé** (Piquant) | alimentation_cuisine › gouts_alimentaires › epice | propriete |  |  |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>料理<rt>りょうり</rt></ruby> は とても <ruby>辛<rt>から</rt></ruby>い です — Ce plat est très **épicé** / piquant.
- <ruby>辛<rt>から</rt></ruby>い カレー を <ruby>食<rt>た</rt></ruby>べて、<ruby>汗<rt>あせ</rt></ruby> が <ruby>出<rt>で</rt></ruby>ました — En mangeant du curry **épicé**, j'ai transpiré.
- <ruby>私<rt>わたし</rt></ruby> は <ruby>辛<rt>から</rt></ruby>い もの が あまり <ruby>得意<rt>とくい</rt></ruby> ではありません — Je n'aime pas trop les choses **épicées**.

### n5_v_619 → v_619 · バター

**Statut** : PROPOSITION, non validée

- **A2-04-D0155** (decision, tags) : Vocabulaire peu utile dans les deux lieux : candidats écartés. — avant `["lieu_konbini","lieu_restaurant"]` → après `[]`
- **A2-04-D0156** (abandon, senses) : Définition, pas une traduction. — avant `["Matière grasse issue du lait"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | バター · ばたー · bataa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › produit_laitier |
| sens | Beurre ; Matière grasse issue du lait |
| nuance | **Nom** (emprunt de l'anglais *butter*) désignant le beurre utilisé en cuisine ou tartiné sur le pain. |
| particules |  |
| furigana | バター |
| exemple | ぱん に **バター** を ぬり ます 。 — Je tartine du **beurre** sur le pain. |

**Mécanique**

- word : `"バター"`
- readings : `[{"kana":"ばたー","romaji":"bataa","furigana":"バター","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Beurre** | alimentation_cuisine › aliments › produits_laitiers | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- パン に バター を つけて <ruby>食<rt>た</rt></ruby>べます — Je mets du **beurre** sur du pain pour le manger.
- <ruby>料理<rt>りょうり</rt></ruby> に バター を すこし <ruby>入<rt>い</rt></ruby>れます — Je mets un peu de **beurre** dans la cuisine.
- <ruby>冷蔵庫<rt>れいぞうこ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に バター が あります — Il y a du **beurre** à l'intérieur du réfrigérateur.

### n5_v_677 → v_677 · 水

**Statut** : PROPOSITION, non validée

- **A2-04-D0178** (abandon, senses) : Repris dans la nuance. — avant `["Eau fraîche / froide (par opposition à l'eau chaude oyu)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 水 · みず · mizu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | nourriture_boissons › boisson |
| sens | Eau ; Eau fraîche / froide (par opposition à l'eau chaude oyu) |
| nuance | **Nom** fondamental désignant l'eau potable ou l'eau liquide en général. Dans un contexte de restauration ou de cuisine, il s'oppose souvent à l'eau chaude (*oyu*). |
| particules |  |
| furigana | <ruby>水<rt>みず</rt></ruby> |
| exemple | コップ に **<ruby>水<rt>みず</rt></ruby>** を いれ ます 。 — Je mets de l'**eau** dans le verre. |

**Mécanique**

- word : `"水"`
- readings : `[{"kana":"みず","romaji":"mizu","furigana":"<ruby>水<rt>みず</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_konbini, lieu_restaurant

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'eau froide ou à température ambiante ; l'eau chaude se dit お湯 (おゆ). Au restaurant, on demande お水."`
- tags : `["lieu_konbini","lieu_restaurant"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Eau** | alimentation_cuisine › boissons › eau | substance_matiere |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>喉<rt>のど</rt></ruby> が かわいた ので、<ruby>冷<rt>つめ</rt></ruby>たい <ruby>水<rt>みず</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みました — J'avais soif, alors j'ai bu de l'**eau** fraîche.
- 「<ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>花<rt>はな</rt></ruby> に <ruby>水<rt>みず</rt></ruby> を やります」 — « Je donne de l'**eau** aux fleurs tous les matins. »
- <ruby>料理<rt>りょうり</rt></ruby> を する <ruby>前<rt>まえ</rt></ruby> に、<ruby>手<rt>て</rt></ruby> を <ruby>水<rt>みず</rt></ruby> で <ruby>洗<rt>あら</rt></ruby>います — Avant de cuisiner, je me lave les mains à l'**eau**.
