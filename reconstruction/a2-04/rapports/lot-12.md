# Lot lot-12 · Temps relatif, moments de la journée et fréquence

Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.

## Autres entrées

### n5_v_284 → v_284 · あさって

**Statut** : décision validée

- **A2-04-D0748** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0749** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le jour qui suit demain, à partir du moment de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0750** (decision, writings) : 明後日, documentée par la fiche (« peut s'écrire occasionnellement avec les kanji 明後日 »), est une autre graphie du même mot : ajoutée à writings. — avant `null` → après `["明後日"]`
- **A2-04-D0751** (abandon, senses) : Pas équivalent : le surlendemain se repère par rapport à un autre jour. — avant `["Le surlendemain"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | あさって · あさって · asatte |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Après-demain ; Le surlendemain |
| nuance | **Nom** temporel désignant le jour suivant demain. Peut s'écrire occasionnellement avec les kanji <ruby>明後日<rt>あさって</rt></ruby>. Les romajis associés sont (*asatte*). |
| particules |  |
| furigana | あさって |
| exemple | **あさって** 、ともだち と えいが を みます 。 — Je regarde un film avec un ami **après-demain**. |

**Mécanique**

- word : `"あさって"`
- readings : `[{"kana":"あさって","romaji":"asatte","furigana":"あさって","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[{"form":"明後日","furigana":"<ruby>明後日<rt>あさって</rt></ruby>"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Après-demain** | temps › moments_periodes › futur | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- あさって、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>東京<rt>とうきょう</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます — **Après-demain**, je vais à Tokyo avec des amis.
- <ruby>試験<rt>しけん</rt></ruby> は あさって なので、<ruby>今日<rt>きょう</rt></ruby> は たくさん <ruby>勉強<rt>べんきょう</rt></ruby> します — L'examen est **après-demain**, donc je vais beaucoup étudier aujourd'hui.
- あさって の <ruby>天気<rt>てんき</rt></ruby> は たぶん <ruby>曇<rt>くも</rt></ruby>り だと <ruby>思<rt>おも</rt></ruby>います — Je pense que la météo d'**après-demain** sera probablement nuageuse.

### n5_v_286 → v_286 · さ来年

**Statut** : décision validée

- **A2-04-D0792** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0793** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : l'année qui suit l'année prochaine, à partir du moment de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0794** (abandon, senses) : Glose littérale, reprise dans la nuance. — avant `["L'année prochaine de l'année prochaine"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | さ来年 · さらいねん · sarainen |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Dans deux ans ; L'année prochaine de l'année prochaine |
| nuance | **Nom** composé du préfixe temporel <ruby>さ<rt>さ</rt></ruby> (marquant un cran d'éloignement supplémentaire) et de <ruby>来年<rt>らいねん</rt></ruby> (l'année prochaine), désignant l'année suivant l'année prochaine. Les romajis associés sont (*sarainen*). |
| particules |  |
| furigana | さ<ruby>来<rt>らい</rt></ruby><ruby>年<rt>ねん</rt></ruby> |
| exemple | **さらいねん** 、だいがく を そつぎょう します 。 — Je diplôme de l'université **dans deux ans**. |

**Mécanique**

- word : `"さ来年"`
- readings : `[{"kana":"さらいねん","romaji":"sarainen","furigana":"さ<ruby>来<rt>らい</rt></ruby><ruby>年<rt>ねん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le préfixe さ marque un cran d'éloignement de plus que 来年."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Dans deux ans** | temps › moments_periodes › futur | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- さ<ruby>来年<rt>らいねん</rt></ruby>、<ruby>大学<rt>だいがく</rt></ruby> に <ruby>入<rt>はい</rt></ruby>る <ruby>予定<rt>よてい</rt></ruby> です — **Dans deux ans**, j'ai l'intention d'entrer à l'université.
- わたしの <ruby>兄<rt>あに</rt></ruby> は さ<ruby>来年<rt>らいねん</rt></ruby> <ruby>結婚<rt>けっこん</rt></ruby> します — Mon grand frère va se marier **dans deux ans**.
- さ<ruby>来年<rt>らいねん</rt></ruby> の <ruby>冬<rt>ふゆ</rt></ruby> に <ruby>自分<rt>じぶん</rt></ruby> の <ruby>国<rt>くに</rt></ruby> へ <ruby>帰<rt>かえ</rt></ruby>ります — L'hiver de l'année **dans deux ans**, je retournerai dans mon pays.

### n5_v_290 → v_290 · 一昨日

**Statut** : décision validée

- **A2-04-D0752** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0753** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le jour qui précède hier, à partir du moment de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0754** (decision, writings) : おととい, documentée par la fiche (« peut s'écrire également en hiragana »), est une autre graphie du même mot : ajoutée à writings. — avant `null` → après `["おととい"]`
- **A2-04-D0755** (abandon, senses) : Le premier est erroné (avant-hier est la veille d'hier) ; le second est redondant. — avant `["Le surlendemain d'hier","Il y a deux jours"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 一昨日 · おととい · ototoi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Avant-hier ; Le surlendemain d'hier ; Il y a deux jours |
| nuance | **Nom** temporel désignant le jour précédant hier. Peut s'écrire également en hiragana (*ototoi*). Les romajis associés sont (*ototoi*). |
| particules |  |
| furigana | <ruby>一昨日<rt>おととい</rt></ruby> |
| exemple | **<ruby>一昨日<rt>おととい</rt></ruby>** 、あたらしい くるま を かいました 。 — J'ai acheté une nouvelle voiture **avant-hier**. |

**Mécanique**

- word : `"一昨日"`
- readings : `[{"kana":"おととい","romaji":"ototoi","furigana":"<ruby>一昨日<rt>おととい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[{"form":"おととい","furigana":"おととい"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Avant-hier** | temps › moments_periodes › passe | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>一昨日<rt>おととい</rt></ruby>、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>映画<rt>えいが</rt></ruby> を <ruby>見<rt>み</rt></ruby>に <ruby>行<rt>い</rt></ruby>きました — **Avant-hier**, je suis allé voir un film avec un ami.
- <ruby>一昨日<rt>おととい</rt></ruby> 買った パソコン が、もう <ruby>届<rt>とど</rt></ruby>きました — L'ordinateur que j'ai acheté **avant-hier** est déjà arrivé.
- <ruby>一昨日<rt>おととい</rt></ruby> の <ruby>夜<rt>よる</rt></ruby> は とても <ruby>寒<rt>さむ</rt></ruby>くて、<ruby>風邪<rt>かぜ</rt></ruby> を ひきそうに なりました — La nuit d'**avant-hier**, il faisait très froid et j'ai failli attraper un rhume.

### n5_v_298 → v_298 · 今

**Statut** : décision validée

- **A2-04-D0735** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0736** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le moment présent, c'est-à-dire celui de l'énonciation. — avant `null` → après `["deictique"]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 今 · いま · ima |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Maintenant ; Actuellement ; À présent |
| nuance | **Nom** temporel désignant le moment présent ou l'instant actuel. Les romajis associés sont (*ima*). |
| particules |  |
| furigana | <ruby>今<rt>いま</rt></ruby> |
| exemple | **<ruby>今<rt>いま</rt></ruby>** 、なに を して います か 。 — Que faites-vous **maintenant** ? |

**Mécanique**

- word : `"今"`
- readings : `[{"kana":"いま","romaji":"ima","furigana":"<ruby>今<rt>いま</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Maintenant** (À présent, Actuellement) | temps › moments_periodes › present | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- すみません、<ruby>今<rt>いま</rt></ruby> は ちょっと <ruby>忙<rt>いそが</rt></ruby>しい ので、あと で <ruby>話<rt>はな</rt></ruby>しましょう — Excusez-moi, je suis un peu occupé **maintenant**, alors parlons-en plus tard.
- <ruby>外<rt>そと</rt></ruby> は <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>って いますが、<ruby>今<rt>いま</rt></ruby> は もう <ruby>止<rt>や</rt></ruby>みそうです — Il pleut dehors, mais **maintenant** la pluie est sur le point de s'arrêter.
- <ruby>昔<rt>むかし</rt></ruby> は 不便 でした が、<ruby>今<rt>いま</rt></ruby> は パソコン や スマホ が あって <ruby>便利<rt>べんり</rt></ruby> です — C'était peu pratique autrefois, mais **maintenant** c'est pratique grâce aux ordinateurs et aux smartphones.

### n5_v_299 → v_299 · 今年

**Statut** : décision validée

- **A2-04-D0783** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0784** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : l'année en cours au moment de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0785** (abandon, senses) : Redondant. — avant `["L'année en cours"]` → après `null`
- **A2-04-D0840** (correction, readings) : Addendum A8, règles A et B : lecture spéciale selon la fiche (jukujikun), segmentée et contradictoire (こととし au lieu de ことし) ; furigana en bloc (liste fermée). — avant `"<ruby>今<rt>こと</rt></ruby><ruby>年<rt>とし</rt></ruby>"` → après `"<ruby>今年<rt>ことし</rt></ruby>"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 今年 · ことし · kotoshi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Cette année ; L'année en cours |
| nuance | **Nom** temporel composé de <ruby>今<rt>こ</rt></ruby> (présent) et de <ruby>年<rt>とし</rt></ruby> (année) avec une lecture spéciale (jukujikun) désignant l'année en cours. Les romajis associés sont (*kotoshi*). |
| particules |  |
| furigana | <ruby>今<rt>こと</rt></ruby><ruby>年<rt>とし</rt></ruby> |
| exemple | **<ruby>今年<rt>ことし</rt></ruby>** は たくさん ほん を よみます 。 — Je lis beaucoup de livres **cette année**. |

**Mécanique**

- word : `"今年"`
- grammatical_class : `"nom"`
- group : `"nom"`
- readings : **exception**, furigana contredisant les kana (addendum A8)
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- readings : `[{"kana":"ことし","romaji":"kotoshi","furigana":"<ruby>今年<rt>ことし</rt></ruby>","default":true,"note":null}]`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture spéciale (ことし)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Cette année** | temps › moments_periodes › present | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今年<rt>ことし</rt></ruby> は <ruby>新<rt>あたら</rt></ruby>しい <ruby>仕事<rt>しごと</rt></ruby> に <ruby>挑戦<rt>ちょうせん</rt></ruby> する <ruby>予定<rt>よてい</rt></ruby> です — Je prévois de relever un nouveau défi professionnel **cette année**.
- <ruby>今年<rt>ことし</rt></ruby> の <ruby>夏<rt>なつ</rt></ruby> は とても <ruby>暑<rt>あつ</rt></ruby>かった ので、エアコン を たくさん <ruby>使<rt>つか</rt></ruby>いました — L'été a été très chaud **c'est année**, alors j'ai beaucoup utilisé la climatisation.
- <ruby>今年<rt>ことし</rt></ruby> こそ <ruby>毎日<rt>まいにち</rt></ruby> <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> を <ruby>続<rt>つづ</rt></ruby>けたい です — C'est **cette année** que je veux vraiment continuer à étudier le japonais tous les jours.

### n5_v_300 → v_300 · 今日

**Statut** : décision validée

- **A2-04-D0737** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0738** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le jour actuel, repéré par rapport au moment de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0739** (abandon, senses) : Redondant. — avant `["Le jour présent"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 今日 · きょう · kyou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Aujourd'hui ; Le jour présent |
| nuance | **Nom** temporel désignant le jour actuel (écrit avec les kanji de *ce* et de *jour*, lu en jukujikun). Les romajis associés sont (*kyou*). |
| particules |  |
| furigana | <ruby>今日<rt>きょう</rt></ruby> |
| exemple | **<ruby>今日<rt>きょう</rt></ruby>** は いいてんき です 。 — **Aujourd'hui**, il fait beau temps. |

**Mécanique**

- word : `"今日"`
- readings : `[{"kana":"きょう","romaji":"kyou","furigana":"<ruby>今日<rt>きょう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture spéciale (きょう) : le jour où l'on parle."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Aujourd'hui** | temps › moments_periodes › present | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今日<rt>きょう</rt></ruby> は <ruby>天気<rt>てんき</rt></ruby> が よくて <ruby>気持<rt>きも</rt></ruby>ちが いい ので、<ruby>公園<rt>こうえん</rt></ruby> を <ruby>散歩<rt>さんぽ</rt></ruby> します — Il fait beau **aujourd'hui** et c'est agréable, alors je vais me promener dans le parc.
- <ruby>今日<rt>きょう</rt></ruby> の <ruby>午後<rt>ごご</rt></ruby> は <ruby>会議<rt>かいぎ</rt></ruby> が ある ので、<ruby>会社<rt>かいしゃ</rt></ruby> に <ruby>残<rt>のこ</rt></ruby>ります — Comme j'ai une réunion cet après-midi **aujourd'hui**, je reste au bureau.
- <ruby>今日<rt>きょう</rt></ruby> は <ruby>何<rt>なに</rt></ruby> を <ruby>食<rt>た</rt></ruby>べよう か まだ <ruby>決<rt>き</rt></ruby>めていません — Je n'ai pas encore décidé ce que je vais manger **aujourd'hui**.

### n5_v_301 → v_301 · 今晩

**Statut** : décision validée

- **A2-04-D0759** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0760** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : la soirée du jour de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0761** (abandon, senses) : Pas équivalent. — avant `["La nuit prochaine"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 今晩 · こんばん · konban |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Ce soir ; La nuit prochaine ; Cette nuit |
| nuance | **Nom** temporel composé de <ruby>今<rt>こん</rt></ruby> (présent/actuel) et de <ruby>晩<rt>ばん</rt></ruby> (soir/nuit), désignant la soirée ou la nuit du jour présent. Les romajis associés sont (*konban*). |
| particules |  |
| furigana | <ruby>今<rt>こん</rt></ruby><ruby>晩<rt>ばん</rt></ruby> |
| exemple | **<ruby>今晩<rt>こんばん</rt></ruby>** 、なに を たべます か 。 — Que mangez-vous **ce soir** ? |

**Mécanique**

- word : `"今晩"`
- readings : `[{"kana":"こんばん","romaji":"konban","furigana":"<ruby>今<rt>こん</rt></ruby><ruby>晩<rt>ばん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Ce soir** (Cette nuit) | temps › moments_periodes › parties_de_la_journee | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今晩<rt>こんばん</rt></ruby>、<ruby>時間<rt>じかん</rt></ruby> が あったら <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>夕食<rt>ゆうしょく</rt></ruby> を <ruby>食<rt>た</rt></ruby>べませんか — Si tu as du temps **ce soir**, veux-tu qu'on prenne le dîner ensemble ?
- <ruby>今晩<rt>こんばん</rt></ruby> は <ruby>寒<rt>さむ</rt></ruby>い ので、<ruby>温<rt>あたた</rt></ruby>かい お<ruby>鍋<rt>なべ</rt></ruby> を <ruby>作<rt>つく</rt></ruby>ります — Il fait froid **ce soir**, alors je vais préparer une fondue japonaise chaude (nabe).
- <ruby>今晩<rt>こんばん</rt></ruby> は <ruby>星<rt>ほし</rt></ruby> が とても <ruby>綺麗<rt>きれい</rt></ruby> に <ruby>見<rt>み</rt></ruby>えています — Les étoiles sont très joliment visibles **ce soir**.

### n5_v_302 → v_302 · 今月

**Statut** : décision validée

- **A2-04-D0774** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0775** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le mois en cours au moment de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0776** (abandon, senses) : Redondant. — avant `["Le mois en cours"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 今月 · こんげつ · kongetsu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Ce mois-ci ; Le mois en cours |
| nuance | **Nom** temporel composé de <ruby>今<rt>こん</rt></ruby> (présent/actuel) et de <ruby>月<rt>げつ</rt></ruby> (mois), désignant le mois en cours. Les romajis associés sont (*kongetsu*). |
| particules |  |
| furigana | <ruby>今<rt>こん</rt></ruby><ruby>月<rt>げつ</rt></ruby> |
| exemple | **<ruby>今月<rt>こんげつ</rt></ruby>** 、あたらしい しごと を はじめます 。 — Je commence un nouveau travail **ce mois-ci**. |

**Mécanique**

- word : `"今月"`
- readings : `[{"kana":"こんげつ","romaji":"kongetsu","furigana":"<ruby>今<rt>こん</rt></ruby><ruby>月<rt>げつ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Ce mois-ci** | temps › moments_periodes › present | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今月<rt>こんげつ</rt></ruby> は <ruby>仕事<rt>shigoto</rt></ruby><rt>しごと</rt></ruby> が とても <ruby>忙<rt>isogashii</rt></ruby><rt>いそが</rt></ruby>しくて、<ruby>休<rt>yasu</rt></ruby><rt>やす</rt></ruby>み が あまり ありません — Je suis très pris par le travail **ce mois-ci** et je n'ai pas beaucoup de repos.
- <ruby>今月<rt>こんげつ</rt></ruby> の <ruby>終<rt>owa</rt></ruby><rt>お</rt></ruby>わり に、<ruby>家族<rt>kazoku</rt></ruby><rt>かぞく</rt></ruby> と <ruby>一緒<rt>issho</rt></ruby><rt>いっしょ</rt></ruby>に <ruby>旅行<rt>ryokou</rt></ruby><rt>りょこう</rt></ruby> に <ruby>行<rt>i</rt></ruby><rt>い</rt></ruby>きます — Je vais en voyage avec ma famille à la fin **de ce mois-ci**.
- <ruby>今月<rt>こんげつ</rt></ruby> から <ruby>新<rt>atara</rt></ruby><rt>あたら</rt></ruby>しい <ruby>言語<rt>gengo</rt></ruby><rt>げんご</rt></ruby> の <ruby>勉強<rt>benkyou</rt></ruby><rt>べんきょう</rt></ruby> を <ruby>始<rt>haji</rt></ruby><rt>はじ</rt></ruby>めました — J'ai commencé l'étude d'une nouvelle langue à partir **de ce mois-ci**.

### n5_v_303 → v_303 · 今朝

**Statut** : décision validée

- **A2-04-D0756** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0757** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : la matinée du jour de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0758** (abandon, senses) : Redondant. — avant `["La matinée d'aujourd'hui"]` → après `null`
- **A2-04-D0841** (correction, readings) : Addendum A8, règle A : lecture spéciale selon la fiche (jukujikun), répartie artificiellement entre les kanji (け + さ) ; furigana en bloc (liste fermée). — avant `"<ruby>今<rt>け</rt></ruby><ruby>朝<rt>さ</rt></ruby>"` → après `"<ruby>今朝<rt>けさ</rt></ruby>"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 今朝 · けさ · kesa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Ce matin ; La matinée d'aujourd'hui |
| nuance | **Nom** temporel composé avec une lecture spéciale (jukujikun) désignant la matinée du jour présent. Les romajis associés sont (*kesa*). |
| particules |  |
| furigana | <ruby>今<rt>け</rt></ruby><ruby>朝<rt>さ</rt></ruby> |
| exemple | **<ruby>今朝<rt>けさ</rt></ruby>** 、はやく おきました 。 — Je me suis levé tôt **ce matin**. |

**Mécanique**

- word : `"今朝"`
- grammatical_class : `"nom"`
- group : `"nom"`
- readings : **exception**, lecture spéciale segmentée, à écrire en bloc (addendum A8, liste fermée)
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- readings : `[{"kana":"けさ","romaji":"kesa","furigana":"<ruby>今朝<rt>けさ</rt></ruby>","default":true,"note":null}]`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture spéciale (けさ)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Ce matin** | temps › moments_periodes › parties_de_la_journee | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今朝<rt>kesa</rt></ruby><rt>けさ</rt></ruby> は <ruby>寝坊<rt>nebou</rt></ruby><rt>ねぼう</rt></ruby> してしまった ので、<ruby>慌<rt>awa</rt></ruby><rt>あわ</rt></ruby>てて <ruby>家<rt>ie</rt></ruby><rt>いえ</rt></ruby> を <ruby>出<rt>de</rt></ruby><rt>で</rt></ruby>ました — Comme j'ai fait une grasse matinée **ce matin**, je suis sorti de chez moi en vitesse.
- <ruby>今朝<rt>kesa</rt></ruby><rt>けさ</rt></ruby> の <ruby>天気<rt>tenki</rt></ruby><rt>てんき</rt></ruby> は とても <ruby>良<rt>yo</rt></ruby><rt>よ</rt></ruby>く、<ruby>散歩<rt>sanpo</rt></ruby><rt>さんぽ</rt></ruby> する の が <ruby>気持<rt>kimo</rt></ruby><rt>きも</rt></ruby>ち よかったです — Le temps **ce matin** était très beau, et c'était agréable de se promener.
- <ruby>今朝<rt>kesa</rt></ruby><rt>けさ</rt></ruby> <ruby>届<rt>todo</rt></ruby><rt>とど</rt></ruby>いた <ruby>手紙<rt>tegami</rt></ruby><rt>てがみ</rt></ruby> を、<ruby>仕事<rt>shigoto</rt></ruby><rt>しごと</rt></ruby> の <ruby>後<rt>ato</rt></ruby><rt>あと</rt></ruby> に <ruby>読<rt>yo</rt></ruby><rt>よ</rt></ruby>みます — Je lirai la lettre arrivée **ce matin** après le travail.

### n5_v_304 → v_304 · 今週

**Statut** : décision validée

- **A2-04-D0765** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0766** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : la semaine en cours au moment de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0767** (abandon, senses) : Redondant. — avant `["La semaine en cours"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 今週 · こんしゅう · konshuu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Cette semaine ; La semaine en cours |
| nuance | **Nom** temporel composé de <ruby>今<rt>こん</rt></ruby> (présent/actuel) et de <ruby>週<rt>しゅう</rt></ruby> (semaine), désignant la semaine en cours. Les romajis associés sont (*konshuu*). |
| particules |  |
| furigana | <ruby>今<rt>こん</rt></ruby><ruby>週<rt>しゅう</rt></ruby> |
| exemple | **<ruby>今週<rt>こんしゅう</rt></ruby>** は いそがしい です 。 — Je suis occupé **cette semaine**. |

**Mécanique**

- word : `"今週"`
- readings : `[{"kana":"こんしゅう","romaji":"konshuu","furigana":"<ruby>今<rt>こん</rt></ruby><ruby>週<rt>しゅう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Cette semaine** | temps › moments_periodes › present | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今週<rt>konshuu</rt></ruby><rt>こんしゅう</rt></ruby> は <ruby>水曜日<rt>suiyoubi</rt></ruby><rt>すいようび</rt></ruby> に <ruby>大和<rt>yamato</rt></ruby><rt>おおきな</rt></ruby> <ruby>会議<rt>kaigi</rt></ruby><rt>かいぎ</rt></ruby> が <ruby>予定<rt>yotei</rt></ruby><rt>よてい</rt></ruby> されています — Une grande réunion est prévue mercredi **cette semaine**.
- <ruby>今週<rt>konshuu</rt></ruby><rt>こんしゅう</rt></ruby> の <ruby>週末<rt>shuumatsu</rt></ruby><rt>しゅうまつ</rt></ruby> は、<ruby>友達<rt>tomodachi</rt></ruby><rt>ともだち</rt></ruby> と <ruby>映画<rt>eiga</rt></ruby><rt>えいが</rt></ruby> を <ruby>見<rt>mi</rt></ruby><rt>み</rt></ruby>に <ruby>行<rt>i</rt></ruby><rt>い</rt></ruby>く <ruby>約束<rt>yakusoku</rt></ruby><rt>やくそく</rt></ruby> です — Pour le week-end **de cette semaine**, j'ai promis d'aller voir un film avec un ami.
- <ruby>今週<rt>konshuu</rt></ruby><rt>こんしゅう</rt></ruby> は <ruby>雨<rt>ame</rt></ruby><rt>あめ</rt></ruby> が <ruby>多<rt>oo</rt></ruby><rt>おお</rt></ruby>い ので、<ruby>外<rt>soto</rt></ruby><rt>そと</rt></ruby> へ <ruby>出<rt>de</rt></ruby><rt>で</rt></ruby>る とき は <ruby>傘<rt>kasa</rt></ruby><rt>かさ</rt></ruby> が <ruby>必要<rt>hitsuyou</rt></ruby><rt>ひつよう</rt></ruby> です — Il pleut souvent **cette semaine**, un parapluie est donc nécessaire quand on sort.

### n5_v_305 → v_305 · 先月

**Statut** : décision validée

- **A2-04-D0777** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0778** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le mois qui précède celui de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0779** (abandon, senses) : Redondant. — avant `["Le mois précédent"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 先月 · せんげつ · sengetsu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Le mois dernier ; Le mois précédent |
| nuance | **Nom** temporel composé de <ruby>先<rt>せん</rt></ruby> (précédent/passé) et de <ruby>月<rt>げつ</rt></ruby> (mois), désignant le mois qui vient de s'écouler. Les romajis associés sont (*sengetsu*). |
| particules |  |
| furigana | <ruby>先<rt>せん</rt></ruby><ruby>月<rt>げつ</rt></ruby> |
| exemple | **<ruby>先月<rt>せんげつ</rt></ruby>** 、くるま を かいました 。 — J'ai acheté une voiture **le mois dernier**. |

**Mécanique**

- word : `"先月"`
- readings : `[{"kana":"せんげつ","romaji":"sengetsu","furigana":"<ruby>先<rt>せん</rt></ruby><ruby>月<rt>げつ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Le mois dernier** | temps › moments_periodes › passe | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>先月<rt>せんげつ</rt></ruby>、<ruby>新<rt>あたら</rt></ruby>しい <ruby>仕事<rt>しごと</rt></ruby> を <ruby>始<rt>はじ</rt></ruby>めて、ようやく <ruby>慣<rt>な</rt></ruby>れてきました — J'ai commencé un nouveau travail **le mois dernier**, et je commence enfin à m'y habituer.
- <ruby>先月<rt>せんげつ</rt></ruby> は <ruby>出張<rt>しゅっちょう</rt></ruby> が <p>多</p>くて、あまり <ruby>家<rt>いえ</rt></ruby> に <ruby>帰<rt>かえ</rt></ruby>れませんでした — J'ai eu beaucoup de voyages d'affaires **le mois dernier** et je n'ai pas pu rentrer beaucoup à la maison.
- <ruby>先月<rt>せんげつ</rt></ruby> <ruby>買<rt>か</rt></ruby>った <ruby>本<rt>ほん</rt></ruby> を、やっと <ruby>今日<rt>きょう</rt></ruby> <ruby>全部<rt>ぜんぶ</rt></ruby> <ruby>読<rt>よ</rt></ruby>み<ruby>終<rt>お</rt></ruby>えました — J'ai enfin fini de lire entièrement aujourd'hui le livre que j'ai acheté **le mois dernier**.

### n5_v_306 → v_306 · 先週

**Statut** : décision validée

- **A2-04-D0768** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0769** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : la semaine qui précède celle de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0770** (abandon, senses) : Redondant. — avant `["La semaine précédente"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 先週 · せんしゅう · senshuu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | La semaine dernière ; La semaine précédente |
| nuance | **Nom** temporel composé de <ruby>先<rt>せん</rt></ruby> (précédent/passé) et de <ruby>週<rt>しゅう</rt></ruby> (semaine), désignant la semaine qui vient de s'écouler. Les romajis associés sont (*senshuu*). |
| particules |  |
| furigana | <ruby>先<rt>せん</rt></ruby><ruby>週<rt>しゅう</rt></ruby> |
| exemple | **<ruby>先週<rt>せんしゅう</rt></ruby>** 、とうきょう に いきました 。 — Je suis allé à Tokyo **la semaine dernière**. |

**Mécanique**

- word : `"先週"`
- readings : `[{"kana":"せんしゅう","romaji":"senshuu","furigana":"<ruby>先<rt>せん</rt></ruby><ruby>週<rt>しゅう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **La semaine dernière** | temps › moments_periodes › passe | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>先週<rt>せんしゅう</rt></ruby> の <ruby>週末<rt>しゅうまつ</rt></ruby> は、<ruby>家族<rt>かぞく</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>温泉<rt>おんせん</rt></ruby> に <ruby>行<rt>い</rt></ruby>きました — Le week-end **de la semaine dernière**, je suis allé aux sources chaudes avec ma famille.
- <ruby>先週<rt>せんしゅう</rt></ruby> から <ruby>始<rt>はじ</rt></ruby>まった <ruby>新しい<rt>あたらしい</rt></ruby> プロジェクト が <ruby>順調<rt>じゅんちょう</rt></ruby> に <ruby>進<rt>すす</rt></ruby>んでいます — Le nouveau projet qui a commencé **la semaine dernière** progresse sans encombre.
- <ruby>先週<rt>せんしゅう</rt></ruby> は <ruby>毎日<rt>まいにち</rt></ruby> <ruby>忙<rt>いそが</rt></ruby>しかった ので、この <ruby>週末<rt>しゅうまつ</rt></ruby> は ゆっくり <ruby>休<rt>やす</rt></ruby>みたい です — J'ai été occupé tous les jours **la semaine dernière**, alors je veux me reposer tranquillement ce week-end.

### n5_v_310 → v_310 · 午前

**Statut** : décision validée

- **A2-04-D0812** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0813** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 午前 désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0814** (abandon, senses) : Le premier est repris dans le libellé ; le second est une abréviation anglaise. — avant `["Avant midi","AM"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 午前 · ごぜん · gozen |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Matin ; Avant midi ; AM |
| nuance | **Nom** temporel composé de <ruby>御<rt>ご</rt></ruby> (préfixe honorifique) et de <ruby>前<rt>ぜん</rt></ruby> (avant), désignant la période de la matinée précédant midi. Les romajis associés sont (*gozen*). |
| particules |  |
| furigana | <ruby>午前<rt>ごぜん</rt></ruby> |
| exemple | **<ruby>午前<rt>ごぜん</rt></ruby>** は しごと を して います 。 — Je travaille **le matin** (avant midi). |

**Mécanique**

- word : `"午前"`
- readings : `[{"kana":"ごぜん","romaji":"gozen","furigana":"<ruby>午前<rt>ごぜん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Aussi devant une heure : 午前十時, dix heures du matin. Contraire : 午後."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Matin (avant midi)** (Matinée) | temps › moments_periodes › parties_de_la_journee | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>明日<rt>あした</rt></ruby> の <ruby>午前<rt>ごぜん</rt></ruby> 10 <ruby>時<rt>じ</rt></ruby> に <ruby>会社<rt>かいしゃ</rt></ruby> の <ruby>会議室<rt>かいぎしつ</rt></ruby> で <ruby>会<rt>あ</rt></ruby>いましょう — Retrouvons-nous dans la salle de réunion de l'entreprise demain à 10h **du matin**.
- <ruby>午前<rt>ごぜん</rt></ruby> <ruby>中<rt>ちゅう</rt></ruby> は <ruby>家<rt>いえ</rt></ruby> の <ruby>掃除<rt>そうじ</rt></ruby> や <ruby>洗濯<rt>せんたく</rt></ruby> を して 過ごしました — J'ai passé la matinée (**le matin**) à faire le ménage et la _lessive_ à la maison.
- <ruby>午前<rt>ごぜん</rt></ruby> は <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>っていましたが、<ruby>午後<rt>ごご</rt></ruby> から は <ruby>晴<rt>は</rt></ruby>れてきました — Il pleuvait **le matin**, mais le temps s'est dégagé à partir de l'après-midi.

### n5_v_312 → v_312 · 去年

**Statut** : décision validée

- **A2-04-D0786** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0787** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : l'année qui précède celle de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0788** (abandon, senses) : Redondant. — avant `["L'année passée"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 去年 · きょねん · kyonen |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | L'année dernière ; L'année passée |
| nuance | **Nom** temporel composé de <ruby>去<rt>きょ</rt></ruby> (partir/passé) et de <ruby>年<rt>ねん</rt></ruby> (année), désignant l'année précédente (la plus courante par rapport à *ototoshi*). Les romajis associés sont (*kyonen*). |
| particules |  |
| furigana | <ruby>去<rt>きょ</rt></ruby><ruby>年<rt>ねん</rt></ruby> |
| exemple | **<ruby>去年<rt>きょねん</rt></ruby>** 、にほん に いきました 。 — Je suis allé au Japon **l'année dernière**. |

**Mécanique**

- word : `"去年"`
- readings : `[{"kana":"きょねん","romaji":"kyonen","furigana":"<ruby>去<rt>きょ</rt></ruby><ruby>年<rt>ねん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Plus courant que おととし (il y a deux ans)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **L'année dernière** | temps › moments_periodes › passe | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>去年<rt>きょねん</rt></ruby> の <ruby>春<rt>はる</rt></ruby> に <ruby>大学<rt>だいがく</rt></ruby> を <ruby>卒業<rt>そつぎょう</rt></ruby> しました — Je suis diplômé de l'université au printemps de **l'année dernière**.
- <ruby>去年<rt>きょねん</rt></ruby> は <ruby>仕事<rt>しごと</rt></ruby> で <ruby>日本<rt>にほん</rt></ruby> へ <ruby>何<rt>なん</rt></ruby> <ruby>度<rt>ど</rt></ruby> も <ruby>行<rt>い</rt></ruby>きました — Je suis allé au Japon plusieurs fois pour le travail **l'année dernière**.
- <ruby>去年<rt>きょねん</rt></ruby> と <ruby>比<rt>くら</rt></ruby>べて、<ruby>今年<rt>ことし</rt></ruby> は <ruby>日本語<rt>にほんご</rt></ruby> が もっと <ruby>上手<rt>じょうず</rt></ruby> に なりたい です — Comparé à **l'année dernière**, je souhaite progresser encore plus en japonais cette année.

### n5_v_315 → v_315 · 夜

**Statut** : décision validée

- **A2-04-D0809** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0810** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 夜 désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0811** (abandon, senses) : Pas équivalent. — avant `["Tombée de la nuit"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 夜 · よる · yoru |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Nuit ; Soirée ; Tombée de la nuit |
| nuance | **Nom** temporel désignant la période de la nuit ou de la soirée (après le coucher du soleil). Les romajis associés sont (*yoru*). |
| particules |  |
| furigana | <ruby>夜<rt>よる</rt></ruby> |
| exemple | **<ruby>夜<rt>よる</rt></ruby>** は うち で べんきょう します 。 — J'étudie à la maison **le soir**. |

**Mécanique**

- word : `"夜"`
- readings : `[{"kana":"よる","romaji":"yoru","furigana":"<ruby>夜<rt>よる</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"La période après le coucher du soleil."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Nuit** (Soirée) | temps › moments_periodes › parties_de_la_journee | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>夜<rt>よる</rt></ruby> になると、この <ruby>静<rt>しず</rt></ruby>かな <ruby>町<rt>まち</rt></ruby> は いっそう <ruby>静<rt>しず</rt></ruby>かになります — Quand la **nuit** tombe, cette ville calme devient encore plus paisible.
- わたしの <ruby>父<rt>ちち</rt></ruby> は <ruby>仕事<rt>しごと</rt></ruby> が <ruby>忙<rt>いそが</rt></ruby>しくて、いつも <ruby>夜<rt>よる</rt></ruby> <ruby>遅<rt>おそ</rt></ruby>く <ruby>家<rt>いえ</rt></ruby> に <ruby>帰<rt>かえ</rt></ruby>ってきます — Mon père est occupé par son travail et rentre toujours tard la **nuit** à la maison.
- <ruby>夜<rt>よる</rt></ruby> は <ruby>暗<rt>くら</rt></ruby>い ので、<ruby>外<rt>そと</rt></ruby> を <ruby>歩<rt>ある</rt></ruby>く とき は <ruby>車<rt>くるま</rt></ruby> に <ruby>気<rt>き</rt></ruby>をつけてください — Il fait sombre la **nuit**, alors faites attention aux voitures quand vous marchez dehors.

### n5_v_318 → v_318 · 明日

**Statut** : décision validée

- **A2-04-D0740** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0741** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le jour qui suit celui de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0742** (decision, readings) : La lecture あす, documentée par la nuance de la fiche, n'est pas ajoutée à readings : ce serait une exception de lecture absente de la mécanique (doctrine du lot 03, 家 / うち). Elle reste dans la nuance.
- **A2-04-D0743** (abandon, senses) : Pas équivalent : « le jour suivant » se repère par rapport à un autre jour, pas au moment de la parole. — avant `["Le jour suivant"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 明日 · あした · ashita |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Demain ; Le jour suivant |
| nuance | **Nom** temporel désignant le jour venant après aujourd'hui (peut également se lire *asu* dans un registre plus formel). Les romajis associés sont (*ashita*). |
| particules |  |
| furigana | <ruby>明日<rt>あした</rt></ruby> |
| exemple | **<ruby>明日<rt>あした</rt></ruby>** 、かいもの に いきます 。 — Je vais faire des courses **demain**. |

**Mécanique**

- word : `"明日"`
- readings : `[{"kana":"あした","romaji":"ashita","furigana":"<ruby>明日<rt>あした</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Se lit aussi あす dans un registre plus formel (lecture documentée par la fiche, non reprise comme lecture structurée)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Demain** | temps › moments_periodes › futur | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>明日<rt>あした</rt></ruby> は <ruby>朝<rt>あさ</rt></ruby> <ruby>早<rt>はや</rt></ruby>く から <ruby>出張<rt>しゅっちょう</rt></ruby> なので、<ruby>今夜<rt>こんや</rt></ruby> は <ruby>早<rt>はや</rt></ruby>く <ruby>寝<rt>ね</rt></ruby>ます — Comme j'ai un voyage d'affaires tôt **demain** matin, je vais me coucher tôt ce soir.
- <ruby>明日<rt>あした</rt></ruby> の <ruby>天気<rt>てんき</rt></ruby> は <ruby>晴<rt>は</rt></ruby>れ だと <ruby>天気予報<rt>てんきよほう</rt></ruby> で <ruby>言<rt>い</rt></ruby>っていました — Les prévisions météo disaient que le temps de **demain** serait beau.
- <ruby>明日<rt>あした</rt></ruby> は <ruby>図書館<rt>としょかん</rt></ruby> へ <ruby>行<rt>い</rt></ruby>って、<ruby>必要<rt>ひつよう</rt></ruby> な <ruby>本<rt>ほん</rt></ruby> を <ruby>借<rt>かり</rt></ruby>てきます — J'irai à la bibliothèque **demain** pour emprunter les livres nécessaires.

### n5_v_319 → v_319 · 昨夜

**Statut** : décision validée

- **A2-04-D0762** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0763** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : la soirée de la veille du jour de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0764** (decision, writings) : ゆうべ et 夕べ, documentées par la fiche (« peut aussi s'écrire en hiragana yuube ou avec les kanji 夕べ »), sont d'autres graphies du même mot : ajoutées à writings. — avant `null` → après `["ゆうべ","夕べ"]`
- **A2-04-D0842** (correction, readings) : Addendum A8, règle A : lecture spéciale selon la fiche (jukujikun), répartie artificiellement entre les kanji (ゆう + べ) ; furigana en bloc (liste fermée). — avant `"<ruby>昨<rt>ゆう</rt></ruby><ruby>夜<rt>べ</rt></ruby>"` → après `"<ruby>昨夜<rt>ゆうべ</rt></ruby>"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 昨夜 · ゆうべ · yuube |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Hier soir ; La nuit dernière |
| nuance | **Nom** temporel utilisant une lecture spéciale (jukujikun) désignant la soirée ou la nuit d'hier (peut aussi s'écrire en hiragana *yuube* ou avec les kanji <ruby>夕べ<rt>ゆうべ</rt></ruby>). Les romajis associés sont (*yuube*). |
| particules |  |
| furigana | <ruby>昨<rt>ゆう</rt></ruby><ruby>夜<rt>べ</rt></ruby> |
| exemple | **<ruby>昨夜<rt>ゆうべ</rt></ruby>** 、テレビ を みました 。 — J'ai regardé la télévision **hier soir**. |

**Mécanique**

- word : `"昨夜"`
- grammatical_class : `"nom"`
- group : `"nom"`
- readings : **exception**, lecture spéciale segmentée, à écrire en bloc (addendum A8, liste fermée)
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- readings : `[{"kana":"ゆうべ","romaji":"yuube","furigana":"<ruby>昨夜<rt>ゆうべ</rt></ruby>","default":true,"note":null}]`
- writings : `[{"form":"ゆうべ","furigana":"ゆうべ"},{"form":"夕べ","furigana":"<ruby>夕<rt>ゆう</rt></ruby>べ"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture spéciale (ゆうべ)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Hier soir** (La nuit dernière) | temps › moments_periodes › parties_de_la_journee | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>昨夜<rt>ゆうべ</rt></ruby> は <ruby>遅<rt>おそ</rt></ruby>く まで <ruby>仕事<rt>しごと</rt></ruby> を していた ので、<ruby>今朝<rt>けさ</rt></ruby> は ちょっと <ruby>疲<rt>つか</rt></ruby>れています — Comme j'ai travaillé tard **hier soir**, je suis un peu fatigué ce matin.
- <ruby>昨夜<rt>ゆうべ</rt></ruby> <ruby>降<rt>ふ</rt></ruby>った <ruby>雨<rt>あめ</rt></ruby> の おかげ で、<ruby>今朝<rt>けさ</rt></ruby> の <ruby>空気<rt>くうき</rt></ruby> は とても <ruby>清々<rt>すがすが</rt></ruby>しい です — Grâce à la pluie tombée **hier soir**, l'air de ce matin est très frais et vivifiant.
- <ruby>昨夜<rt>ゆうべ</rt></ruby> は <ruby>家<rt>いえ</rt></ruby> で <ruby>家族<rt>かぞく</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>美味<rt>おい</rt></ruby>しい 料理 を <ruby>食<rt>た</rt></ruby>べました — J'ai mangé un délicieux plat en famille à la maison **hier soir**.

### n5_v_320 → v_320 · 昨日

**Statut** : décision validée

- **A2-04-D0744** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0745** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le jour qui précède celui de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0746** (correction, readings) : Furigana de la source invalides : toute la lecture est portée par 昨, et le <rt> de 日 est vide. Bloc par nécessité (addendum A8, §3) : la fiche donne きのう pour le mot entier (romaji : kinou) et ne répartit pas la lecture entre les kanji ; aucune segmentation admissible n'est établie par la source. Hors liste des lectures spéciales : la fiche ne qualifie pas cette lecture de spéciale. — avant `"<ruby>昨<rt>きのう</rt></ruby><ruby>日<rt></rt></ruby>"` → après `"<ruby>昨日<rt>きのう</rt></ruby>"`
- **A2-04-D0747** (abandon, senses) : Pas équivalent : « la veille » se repère par rapport à un autre jour. — avant `["La veille"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 昨日 · きのう · kinou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Hier ; La veille |
| nuance | **Nom** temporel désignant le jour précédant immédiatement aujourd'hui. Les romajis associés sont (*kinou*). |
| particules |  |
| furigana | <ruby>昨<rt>きのう</rt></ruby><ruby>日<rt></rt></ruby> |
| exemple | **<ruby>昨日<rt>きのう</rt></ruby>** 、ともだち に あいました 。 — J'ai rencontré un ami **hier**. |

**Mécanique**

- word : `"昨日"`
- grammatical_class : `"nom"`
- group : `"nom"`
- readings : **exception**, furigana incohérents avec la forme
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- readings : `[{"kana":"きのう","romaji":"kinou","furigana":"<ruby>昨日<rt>きのう</rt></ruby>","default":true,"note":null}]`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Hier** | temps › moments_periodes › passe | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>昨日<rt>きのう</rt></ruby> は <ruby>一日<rt>いちにち</rt></ruby> <ruby>中<rt>じゅう</rt></ruby> <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>っていましたが、<ruby>今日<rt>きょう</rt></ruby> は いい <ruby>天気<rt>てんき</rt></ruby> です — Il a plu toute la journée **hier**, mais il fait beau aujourd'hui.
- <ruby>昨日<rt>きのう</rt></ruby> <ruby>買<rt>か</rt></ruby>った <ruby>本<rt>ほん</rt></ruby> を、もう <ruby>全部<rt>ぜんぶ</rt></ruby> <ruby>読<rt>よ</rt></ruby>み<ruby>終<rt>お</rt></ruby>えました — J'ai déjà fini de lire entièrement le livre que j'ai acheté **hier**.
- <ruby>昨日<rt>きのう</rt></ruby> の <ruby>夜<rt>よる</rt></ruby> は <ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>夕食<rt>ゆうしょく</rt></ruby> を <ruby>食<rt>た</rt></ruby>べました — J'ai pris le dîner avec un ami **hier** soir.

### n5_v_322 → v_322 · 晩

**Statut** : décision validée

- **A2-04-D0806** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0807** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 晩 désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0808** (abandon, senses) : Relève de 夜 ; la fiche de 晩 décrit la fin de la journée et le début de la soirée. — avant `["Nuit"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 晩 · ばん · ban |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Soir ; Soirée ; Nuit |
| nuance | **Nom** temporel désignant la fin de la journée ou le début de la soirée. Compteur spécifique : <ruby>回<rt>かい</rt></ruby> (kai) pour les soirs. Les romajis associés sont (*ban*). |
| particules |  |
| furigana | <ruby>晩<rt>ばん</rt></ruby> |
| exemple | まい **<ruby>晩<rt>ばん</rt></ruby>** 、<ruby>日本語<rt>にほんご</rt></ruby> を べんきょう します 。 — J'étudie le japonais chaque **soir**. |

**Mécanique**

- word : `"晩"`
- readings : `[{"kana":"ばん","romaji":"ban","furigana":"<ruby>晩<rt>ばん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"La fin de la journée, le début de la soirée ; la nuit se dit plutôt 夜."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Soir** (Soirée) | temps › moments_periodes › parties_de_la_journee | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- お<ruby>父<rt>とう</rt></ruby>さん は <ruby>毎晩<rt>まいばん</rt></ruby> <ruby>遅<rt>おそ</rt></ruby>く まで <ruby>仕事<rt>しごと</rt></ruby> を しています — Mon père travaille tard tous les **soirs**.
- <ruby>今晩<rt>こんばん</rt></ruby> の <ruby>晩<rt>ばん</rt></ruby> ごはん は、<ruby>何<rt>なに</rt></ruby> を <ruby>食<rt>た</rt></ruby>べる 予定 ですか — Qu'est-ce que tu prévois de manger pour le **repas du soir** ce soir ?
- この <ruby>町<rt>まち</rt></ruby> は <ruby>晩<rt>ばん</rt></ruby> になると とても <ruby>静<rt>しず</rt></ruby>かになって、<ruby>歩<rt>ある</rt></ruby>きやすい です — Cette ville devient très calme le **soir**, et il est facile d'y marcher.

### n5_v_324 → v_324 · 朝

**Statut** : décision validée

- **A2-04-D0797** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0798** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 朝 désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 朝 · あさ · asa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Matin ; Matinée |
| nuance | **Nom** temporel désignant la première partie de la journée, du lever du soleil jusqu'à midi. Compteur spécifique : <ruby>回<rt>かい</rt></ruby> (kai) pour les matins. Les romajis associés sont (*asa*). |
| particules |  |
| furigana | <ruby>朝<rt>あさ</rt></ruby> |
| exemple | まい **<ruby>朝<rt>あさ</rt></ruby>** 、コーヒー を のみ ます 。 — Je bois du café chaque **matin**. |

**Mécanique**

- word : `"朝"`
- readings : `[{"kana":"あさ","romaji":"asa","furigana":"<ruby>朝<rt>あさ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Matin** (Matinée) | temps › moments_periodes › parties_de_la_journee | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby> <ruby>早<rt>はや</rt></ruby>く に <ruby>起<rt>お</rt></ruby>きて、<ruby>公園<rt>こうえん</rt></ruby> を <ruby>散歩<rt>さんぽ</rt></ruby> する の が <ruby>日課<rt>にっか</rt></ruby> です — C'est ma routine de me lever tôt chaque **matin** et de me promener dans le parc.
- <ruby>今日<rt>きょう</rt></ruby> の <ruby>朝<rt>あさ</rt></ruby> は とても <ruby>寒<rt>さむ</rt></ruby>かった ので、<ruby>温<rt>あたた</rt></ruby>かい スープ を <ruby>飲<rt>の</rt></ruby>みました — Il faisait très froid ce **matin**, alors j'ai bu une soupe chaude.
- <ruby>朝<rt>あさ</rt></ruby> ごはん を しっかり <ruby>食<rt>た</rt></ruby>べて から、<ruby>仕事<rt>しごと</rt></ruby> に <ruby>出<rt>で</rt></ruby>かけます — Je prends un bon petit-déjeuner (**repas du matin**) avant de partir au travail.

### n5_v_326 → v_326 · 来年

**Statut** : décision validée

- **A2-04-D0789** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0790** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : l'année qui suit celle de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0791** (abandon, senses) : Redondant. — avant `["L'an prochain"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 来年 · らいねん · rainen |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | L'année prochaine ; L'an prochain |
| nuance | **Nom** temporel composé de <ruby>来<rt>らい</rt></ruby> (venir/prochain) et de <ruby>年<rt>ねん</rt></ruby> (année), désignant l'année suivant l'année en cours. Les romajis associés sont (*rainen*). |
| particules |  |
| furigana | <ruby>来<rt>らい</rt></ruby><ruby>年<rt>ねん</rt></ruby> |
| exemple | **<ruby>来年<rt>らいねん</rt></ruby>** 、にほん に りょこう します 。 — Je voyagerai au Japon **l'année prochaine**. |

**Mécanique**

- word : `"来年"`
- readings : `[{"kana":"らいねん","romaji":"rainen","furigana":"<ruby>来<rt>らい</rt></ruby><ruby>年<rt>ねん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **L'année prochaine** | temps › moments_periodes › futur | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>来年<rt>らいねん</rt></ruby> の <ruby>春<rt>はる</rt></ruby> に <ruby>日本<rt>にほん</rt></ruby> へ <ruby>留学<rt>りゅうがく</rt></ruby> する <ruby>予定<rt>よてい</rt></ruby> です — Je prévois d'aller étudier au Japon au printemps de **l'année prochaine**.
- <ruby>来年<rt>らいねん</rt></ruby> こそ は <ruby>新<rt>あたら</rt></ruby>しい <ruby>資格<rt>しかく</rt></ruby> を <ruby>取<rt>と</rt></ruby>りたい と <ruby>思<rt>おも</rt></ruby>っています — C'est vraiment **l'année prochaine** que je souhaite obtenir une nouvelle qualification.
- <ruby>今年<rt>ことし</rt></ruby> も <ruby>速<rt>はや</rt></ruby>かった ですが、<ruby>来年<rt>らいねん</rt></ruby> も きっと <ruby>忙<rt>いそが</rt></ruby>しい <ruby>一年<rt>いちねん</rt></ruby> に なる でしょう — Cette année a passé vite, mais **l'année prochaine** sera sûrement aussi une année bien remplie.

### n5_v_327 → v_327 · 来月

**Statut** : décision validée

- **A2-04-D0780** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0781** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : le mois qui suit celui de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0782** (abandon, senses) : Redondant. — avant `["Le mois suivant"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 来月 · らいげつ · raigetsu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Le mois prochain ; Le mois suivant |
| nuance | **Nom** temporel composé de <ruby>来<rt>らい</rt></ruby> (venir/prochain) et de <ruby>月<rt>げつ</rt></ruby> (mois), désignant le mois suivant le mois en cours. Les romajis associés sont (*raigetsu*). |
| particules |  |
| furigana | <ruby>来<rt>らい</rt></ruby><ruby>月<rt>げつ</rt></ruby> |
| exemple | **<ruby>来月<rt>らいげつ</rt></ruby>** 、あたらしい くるま を かいます 。 — J'achèterai une nouvelle voiture **le mois prochain**. |

**Mécanique**

- word : `"来月"`
- readings : `[{"kana":"らいげつ","romaji":"raigetsu","furigana":"<ruby>来<rt>らい</rt></ruby><ruby>月<rt>げつ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Le mois prochain** | temps › moments_periodes › futur | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>来月<rt>らいげつ</rt></ruby> から <ruby>新<rt>あたら</rt></ruby>しい <ruby>プロジェクト<rt>ぷろじぇくと</rt></ruby> が <ruby>始<rt>はじ</rt></ruby>まる ので、<ruby>今<rt>いま</rt></ruby> から <ruby>準備<rt>じゅんび</rt></ruby> を <ruby>進<rt>すす</rt></ruby>めています — Un nouveau projet commence **le mois prochain**, alors je prépare le terrain dès maintenant.
- <ruby>来月<rt>らいげつ</rt></ruby> の <ruby>週末<rt>しゅうまつ</rt></ruby> に、<ruby>家族<rt>かぞく</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>温泉<rt>おんせん</rt></ruby> に <ruby>旅行<rt>りょこう</rt></ruby> に <ruby>行<rt>い</rt></ruby>きます — Le week-end **du mois prochain**, je pars en voyage aux sources chaudes avec ma famille.
- <ruby>来月<rt>らいげつ</rt></ruby> は <ruby>仕事<rt>しごと</rt></ruby> で <ruby>何<rt>なん</rt></ruby> <ruby>日<rt>にち</rt></ruby> か <ruby>東京<rt>とうきょう</rt></ruby> へ <ruby>出張<rt>しゅっちょう</rt></ruby> する <ruby>予定<rt>よてい</rt></ruby> です — Je prévois de faire un voyage d'affaires de quelques jours à Tokyo pour le travail **le mois prochain**.

### n5_v_328 → v_328 · 来週

**Statut** : décision validée

- **A2-04-D0771** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0772** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : la semaine qui suit celle de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0773** (abandon, senses) : Redondant. — avant `["La semaine suivante"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 来週 · らいしゅう · raishuu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | La semaine prochaine ; La semaine suivante |
| nuance | **Nom** temporel composé de <ruby>来<rt>らい</rt></ruby> (venir/prochain) et de <ruby>週<rt>しゅう</rt></ruby> (semaine), désignant la semaine suivant la semaine en cours. Les romajis associés sont (*raishuu*). |
| particules |  |
| furigana | <ruby>来<rt>らい</rt></ruby><ruby>週<rt>しゅう</rt></ruby> |
| exemple | **<ruby>来週<rt>らいしゅう</rt></ruby>** 、とうきょう に いきます 。 — Je vais à Tokyo **la semaine prochaine**. |

**Mécanique**

- word : `"来週"`
- readings : `[{"kana":"らいしゅう","romaji":"raishuu","furigana":"<ruby>来<rt>らい</rt></ruby><ruby>週<rt>しゅう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **La semaine prochaine** | temps › moments_periodes › futur | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>水曜日<rt>すいようび</rt></ruby> に <ruby>大切<rt>たいせつ</rt></ruby> な <ruby>会議<rt>かいぎ</rt></ruby> が ある ので、<ruby>資料<rt>しりょう</rt></ruby> を <ruby>作<rt>つく</rt></ruby>らなければ なりません — Comme j'ai une réunion importante mercredi **la semaine prochaine**, je dois préparer les documents.
- <ruby>来週<rt>らいしゅう</rt></ruby> は <ruby>毎日<rt>まいにち</rt></ruby> <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>授業<rt>じゅぎょう</rt></ruby> が ある ので、<ruby>予習<rt>よしゅう</rt></ruby> を しっかり やります — J'ai cours de japonais tous les jours **la semaine prochaine**, alors je vais bien faire mes préparations.
- <ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>週末<rt>しゅうまつ</rt></ruby> は <ruby>天気<rt>てんき</rt></ruby> が よければ、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>公園<rt>こうえん</rt></ruby> で バーベキュー を します — Si le temps est beau le week-end **de la semaine prochaine**, je ferai un barbecue au parc avec des amis.

### n5_v_330 → v_330 · 毎日

**Statut** : décision validée

- **A2-04-D0818** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0819** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une récurrence, sans repérage par rapport au moment de l'énonciation. Même traitement que 毎年 et 毎月 (lot 0) : temps › fréquence › fréquent, concept_abstrait. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 毎日 · まいにち · mainichi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › frequence |
| sens | Chaque jour ; Tous les jours |
| nuance | **Nom** temporel composé de <ruby>毎<rt>まい</rt></ruby> (chaque) et de <ruby>日<rt>にち</rt></ruby> (jour), désignant une récurrence quotidienne. Les romajis associés sont (*mainichi*). |
| particules |  |
| furigana | <ruby>毎<rt>まい</rt></ruby><ruby>日<rt>にち</rt></ruby> |
| exemple | **<ruby>毎日<rt>まいにち</rt></ruby>** 、かんじ を べんきょう します 。 — J'étudie les kanji **tous les jours**. |

**Mécanique**

- word : `"毎日"`
- readings : `[{"kana":"まいにち","romaji":"mainichi","furigana":"<ruby>毎<rt>まい</rt></ruby><ruby>日<rt>にち</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Chaque jour** (Tous les jours) | temps › frequence › frequent | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby> <ruby>15<rt>じゅうご</rt></ruby> <ruby>分<rt>ふん</rt></ruby> でも <ruby>良<rt>よ</rt></ruby>い ので、<ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> を <ruby>続<rt>つづ</rt></ruby>ける こと が <ruby>大切<rt>たいせつ</rt></ruby> です — Il est important de continuer à étudier le japonais **chaque jour**, même si ce n'est que pendant 15 minutes.
- <ruby>毎日<rt>まいにち</rt></ruby> <ruby>朝<rt>あさ</rt></ruby> <ruby>早<rt>はや</rt></ruby>く に <ruby>起<rt>お</rt></ruby>きて、<ruby>会社<rt>かいしゃ</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>く の カフェ で コーヒー を <ruby>飲<rt>の</rt></ruby>みます — Je me lève tôt **chaque jour** et bois un café dans un café près du bureau.
- <ruby>毎日<rt>まいにち</rt></ruby> <ruby>仕事<rt>しごと</rt></ruby> が <ruby>忙<rt>いそが</rt></ruby>しい ですが、<ruby>夜<rt>よる</rt></ruby> は ゆっくり <ruby>休<rt>やす</rt></ruby>む ように しています — Je suis occupé par le travail **chaque jour**, mais je veille à me reposer tranquillement le soir.

### n5_v_331 → v_331 · 毎晩

**Statut** : décision validée

- **A2-04-D0822** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0823** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une récurrence, sans repérage par rapport au moment de l'énonciation. Même traitement que 毎年 et 毎月 (lot 0) : temps › fréquence › fréquent, concept_abstrait. — avant `null` → après `[]`
- **A2-04-D0826** (abandon, senses) : Redondant. — avant `["Chaque nuit"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 毎晩 · まいばん · maiban |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › frequence |
| sens | Chaque soir ; Tous les soirs ; Chaque nuit |
| nuance | **Nom** temporel composé de <ruby>毎<rt>まい</rt></ruby> (chaque) et de <ruby>晩<rt>ばん</rt></ruby> (soir), désignant une habitude ou une action répétée chaque soir. Les romajis associés sont (*maiban*). |
| particules |  |
| furigana | <ruby>毎<rt>まい</rt></ruby><ruby>晩<rt>ばん</rt></ruby> |
| exemple | **<ruby>毎晩<rt>まいばん</rt></ruby>** 、11じ に ねます 。 — Je me couche à 23 heures **tous les soirs**. |

**Mécanique**

- word : `"毎晩"`
- readings : `[{"kana":"まいばん","romaji":"maiban","furigana":"<ruby>毎<rt>まい</rt></ruby><ruby>晩<rt>ばん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Chaque soir** (Tous les soirs) | temps › frequence › frequent | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎晩<rt>まいばん</rt></ruby> <ruby>寝<rt>ね</rt></ruby>る <ruby>前<rt>まえ</rt></ruby> に、お<ruby>風呂<rt>ふろ</rt></ruby> に <ruby>入<rt>はい</rt></ruby>って <ruby>一<rt>いち</rt></ruby><ruby>日<rt>にち</rt></ruby> の <ruby>疲<rt>つか</rt></ruby>れ を <ruby>取<rt>と</rt></ruby>ります — Je prends un bain **chaque soir** avant de dormir pour évacuer la fatigue de la journée.
- <ruby>毎晩<rt>まいばん</rt></ruby> 10 <ruby>時<rt>じ</rt></ruby> ごろ に なる と、<ruby>近所<rt>きんじょ</rt></ruby> の <ruby>道<rt>みち</rt></ruby> が とても <ruby>静<rt>しず</rt></ruby>かになります — Vers 10 heures **chaque soir**, les rues du quartier deviennent très calmes.
- <ruby>毎晩<rt>まいばん</rt></ruby> 30 <ruby>分<rt>ぷん</rt></ruby> ほど <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>んで から <ruby>寝<rt>ね</rt></ruby>る の が <ruby>習慣<rt>しゅうかん</rt></ruby> です — C'est mon habitude de lire un livre en japonais pendant environ 30 minutes **chaque soir** avant de dormir.

### n5_v_333 → v_333 · 毎朝

**Statut** : décision validée

- **A2-04-D0820** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0821** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une récurrence, sans repérage par rapport au moment de l'énonciation. Même traitement que 毎年 et 毎月 (lot 0) : temps › fréquence › fréquent, concept_abstrait. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 毎朝 · まいあさ · maiasa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › frequence |
| sens | Chaque matin ; Tous les matins |
| nuance | **Nom** temporel composé de <ruby>毎<rt>まい</rt></ruby> (chaque) et de <ruby>朝<rt>あさ</rt></ruby> (matin), désignant une action répétée ou une habitude matinale. Les romajis associés sont (*maiasa*). |
| particules |  |
| furigana | <ruby>毎<rt>まい</rt></ruby><ruby>朝<rt>あさ</rt></ruby> |
| exemple | **<ruby>毎朝<rt>まいあさ</rt></ruby>** 、さんぽ を します 。 — Je fais une promenade **tous les matins**. |

**Mécanique**

- word : `"毎朝"`
- readings : `[{"kana":"まいあさ","romaji":"maiasa","furigana":"<ruby>毎<rt>まい</rt></ruby><ruby>朝<rt>あさ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Chaque matin** (Tous les matins) | temps › frequence › frequent | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby> <ruby>6<rt>ろく</rt></ruby> <ruby>時<rt>じ</rt></ruby> に <ruby>起<rt>お</rt></ruby>きて、<ruby>温<rt>あたた</rt></ruby>かい コーヒー を <ruby>飲<rt>の</rt></ruby>みます — Je me lève à 6 heures **chaque matin** et je bois un café chaud.
- <ruby>毎朝<rt>まいあさ</rt></ruby> の <ruby>通勤<rt>つうきん</rt></ruby> ラッシュ は とても <ruby>混<rt>こ</rt></ruby>む ので、<ruby>大変<rt>たいへん</rt></ruby> です — La cohue des transports **chaque matin** est très encombrée, c'est difficile.
- <ruby>毎朝<rt>まいあさ</rt></ruby> <ruby>窓<rt>まど</rt></ruby> を <ruby>開<rt>あ</rt></ruby>けて、<ruby>部屋<rt>へや</rt></ruby> に <ruby>新<rt>しん</rt></ruby>しい <ruby>空気<rt>くうき</rt></ruby> を <ruby>入<rt>い</rt></ruby>れます — J'ouvre la fenêtre **chaque matin** pour faire entrer de l'air frais dans la chambre.

### n5_v_334 → v_334 · 毎週

**Statut** : décision validée

- **A2-04-D0824** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0825** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une récurrence, sans repérage par rapport au moment de l'énonciation. Même traitement que 毎年 et 毎月 (lot 0) : temps › fréquence › fréquent, concept_abstrait. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 毎週 · まいしゅう · maishuu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › frequence |
| sens | Chaque semaine ; Toutes les semaines |
| nuance | **Nom** temporel composé de <ruby>毎<rt>まい</rt></ruby> (chaque) et de <ruby>週<rt>しゅう</rt></ruby> (semaine), désignant une récurrence hebdomadaire. Les romajis associés sont (*maishuu*). |
| particules |  |
| furigana | <ruby>毎<rt>まい</rt></ruby><ruby>週<rt>しゅう</rt></ruby> |
| exemple | **<ruby>毎週<rt>まいしゅう</rt></ruby>** 、にほんご を ならって います 。 — J'apprends le japonais **chaque semaine**. |

**Mécanique**

- word : `"毎週"`
- readings : `[{"kana":"まいしゅう","romaji":"maishuu","furigana":"<ruby>毎<rt>まい</rt></ruby><ruby>週<rt>しゅう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Chaque semaine** (Toutes les semaines) | temps › frequence › frequent | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎週<rt>まいしゅう</rt></ruby> の <ruby>週末<rt>しゅうまつ</rt></ruby> に、<ruby>一週間<rt>いっしゅうかん</rt></ruby> の <ruby>食料品<rt>しょくりょうひん</rt></ruby> を まとめ て <ruby>買<rt>か</rt></ruby>います — **Chaque semaine** le week-end, j'achète mes provisions pour toute la semaine en une seule fois.
- <ruby>毎週<rt>まいしゅう</rt></ruby> <ruby>水曜日<rt>すいようび</rt></ruby> の <ruby>午後<rt>ごご</rt></ruby> は、<ruby>会社<rt>かいしゃ</rt></ruby> で <ruby>大<rt>おお</rt></ruby>きな <ruby>会議<rt>かいぎ</rt></ruby> が あります — **Chaque semaine** le mercredi après-midi, il y a une grande réunion au bureau.
- <ruby>毎週<rt>まいしゅう</rt></ruby> ジム に <ruby>通<rt>かよ</rt></ruby>って、<ruby>体<rt>からだ</rt></ruby> を <ruby>動<rt>うご</rt></ruby>かす よう に しています — Je fréquente la salle de sport **chaque semaine** et je fais en sorte de bouger mon corps.

### n5_v_359 → v_359 · 近々

**Statut** : décision validée

- **A2-04-D0795** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0796** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps : un futur proche, repéré à partir du moment de l'énonciation. — avant `null` → après `["deictique"]`
- **A2-04-D0843** (correction, readings) : Addendum A8 (I4) : les furigana se lisaient ちかぢか au lieu de ちかじか, le kana de la fiche (romaji : chikajika). Arbitrage : ちかじか, le kana et le romaji de la fiche concordent, seuls les furigana différaient. Segmentation conservée : la fiche ne qualifie pas la lecture de spéciale. — avant `"<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>ぢか</rt></ruby>"` → après `"<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>じか</rt></ruby>"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 近々 · ちかじか · chikajika |
| type, group | adverbe · temps |
| catégorie (ancienne, indicative) | temps_calendrier › distance |
| sens | Bientôt ; Prochainement ; Sous peu |
| nuance | **Adverbe** temporel ou de position (dans le temps) désignant un futur proche, sous peu (souvent écrit avec le kanji doublé par un ventori). Les romajis associés sont (*chikajika*). |
| particules |  |
| furigana | <ruby>近<rt>ちか</rt></ruby><ruby>々<rt>ぢか</rt></ruby> |
| exemple | **<ruby>近々<rt>ちかじか</rt></ruby>** 、また おあい しましょう 。 — Nous nous reverrons **bientôt**. |

**Mécanique**

- word : `"近々"`
- grammatical_class : `"adverbe"`
- group : `null`
- readings : **exception**, furigana contredisant les kana (addendum A8)
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- readings : `[{"kana":"ちかじか","romaji":"chikajika","furigana":"<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>じか</rt></ruby>","default":true,"note":null}]`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Un futur proche, à partir du moment où l'on parle ; s'écrit avec le signe de répétition 々."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bientôt** (Prochainement, Sous peu) | temps › moments_periodes › futur | concept_abstrait | grammatical : deictique |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>近々<rt>ちかじか</rt></ruby> <ruby>日本<rt>にほん</rt></ruby> へ <ruby>旅行<rt>りょこう</rt></ruby> に 行く ので、<ruby>今<rt>いま</rt></ruby> <ruby>計画<rt>けいかく</rt></ruby> を <ruby>立<rt>た</rt></ruby>てています — Comme je vais **bientôt** voyager au Japon, je suis en train d'établir le programme.
- <ruby>近々<rt>ちかじか</rt></ruby> また <ruby>連絡<rt>れんらく</rt></ruby> します ので、そのとき に <ruby>詳<rt>くわ</rt></ruby>しい 話 を しましょう — Je vous recontacterai **bientôt**, nous en parlerons en détail à ce moment-là.
- <ruby>近々<rt>ちかじか</rt></ruby> <ruby>新<rt>あたら</rt></ruby>しい プロジェクト が 始まる ので、<ruby>準備<rt>じゅんび</rt></ruby> が 忙しく なります — Un nouveau projet commençant **bientôt**, les préparatifs vont devenir prenants.

### n5_v_439 → v_439 · 夕方

**Statut** : décision validée

- **A2-04-D0803** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0804** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 夕方 désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0805** (abandon, senses) : Terme voisin, pas équivalent. — avant `["Crépuscule"]` → après `null`
- **A2-04-D0844** (correction, readings) : Addendum A8 (I4) : les furigana se lisaient ゆうかた au lieu de ゆうがた (voisement perdu ; romaji de la fiche : yuugata). — avant `"<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>かた</rt></ruby>"` → après `"<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>がた</rt></ruby>"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 夕方 · ゆうがた · yuugata |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › temps |
| sens | Fin d'après-midi ; Soirée ; Crépuscule |
| nuance | **Nom** désignant la période de la journée où le jour commence à baisser, entre l'après-midi et la nuit tombante. |
| particules |  |
| furigana | <ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>かた</rt></ruby> |
| exemple | **<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>かた</rt></ruby>** 、 あめ が ふり まし た 。 — En **fin d'après-midi**, il a plu. |

**Mécanique**

- word : `"夕方"`
- grammatical_class : `"nom"`
- group : `"nom"`
- readings : **exception**, furigana contredisant les kana (addendum A8)
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- readings : `[{"kana":"ゆうがた","romaji":"yuugata","furigana":"<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>がた</rt></ruby>","default":true,"note":null}]`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le moment où le jour baisse, entre l'après-midi et la nuit."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Fin d'après-midi** (Soirée) | temps › moments_periodes › parties_de_la_journee | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>夕方<rt>ゆうがた</rt></ruby>、<ruby>公園<rt>こうえん</rt></ruby> を <ruby>散歩<rt>さんぽ</rt></ruby> します — Je me promène dans le parc en **fin d'après-midi**.
- <ruby>夕方<rt>ゆうがた</rt></ruby> に なって、<ruby>涼<rt>すず</rt></ruby>しく なりました — C'est devenu frais en **fin d'après-midi**.
- <ruby>夕方<rt>ゆうがた</rt></ruby> から <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>り<ruby>始<rt>はじ</rt></ruby>めました — Il a commencé à pleuvoir à partir de la **fin d'après-midi**.

### n5_v_649 → v_649 · 午後

**Statut** : décision validée

- **A2-04-D0815** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0816** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 午後 désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0817** (abandon, senses) : Le premier est une abréviation anglaise ; le second est repris dans la nuance. — avant `["P.M.","De l'après-midi"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 午後 · ごご · gogo |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Après-midi ; P.M. ; De l'après-midi |
| nuance | **Nom / adverbe temporel** composé des kanjis « midi/signe du cheval » et « après », désignant la période de la journée située entre midi et minuit (par opposition à *gozen* 午前 pour le matin). |
| particules |  |
| furigana | <ruby>午<rt>ご</rt></ruby><ruby>後<rt>ご</rt></ruby> |
| exemple | **<ruby>午<rt>ご</rt></ruby><ruby>後<rt>ご</rt></ruby>** 2 じ に かいぎ が あり ます 。 — Il y a une réunion à 14h00 (2 heures de l'après-midi). |

**Mécanique**

- word : `"午後"`
- readings : `[{"kana":"ごご","romaji":"gogo","furigana":"<ruby>午<rt>ご</rt></ruby><ruby>後<rt>ご</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Aussi devant une heure : 午後三時, trois heures de l'après-midi. Contraire : 午前."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Après-midi** | temps › moments_periodes › parties_de_la_journee | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>午後<rt>ごご</rt></ruby> 1 <ruby>時<rt>じ</rt></ruby> から <ruby>会議<rt>かいぎ</rt></ruby> が あります — Il y a une réunion à **1 heure de l'après-midi**.
- 「<ruby>午後<rt>ごご</rt></ruby> は <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>る <ruby>予報<rt>よほう</rt></ruby> です」 — « Les prévisions annoncent de la pluie pour l'**après-midi**. »
- <ruby>午後<rt>ごご</rt></ruby> の <ruby>授業<rt>じゅぎょう</rt></ruby> は <ruby>日本<rt>にほん</rt></ruby> <ruby>語<rt>ご</rt></ruby> です — Le cours de l'**après-midi** est en japonais.

### n5_v_670 → v_670 · 昼

**Statut** : décision validée

- **A2-04-D0799** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0800** (decision, senses) : Deux sens documentés par la fiche (« la période diurne…, le milieu de la journée (midi), ou par extension le repas du midi ») : une période du jour, et un repas. La journée et midi restent un seul sens (la période diurne et son milieu). Le repas est un autre référent et un autre type (evenement), comme le sens « repas » de ご飯 (lot 02). — avant `["Midi","Journée","Heure du déjeuner"]` → après `["S1 Midi, journée (période)","S2 Déjeuner (repas)"]`
- **A2-04-D0801** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 昼 désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0802** (abandon, senses) : Repris par le sens 2. — avant `["Heure du déjeuner"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 昼 · ひる · hiru |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › moments_journee |
| sens | Midi ; Journée ; Heure du déjeuner |
| nuance | **Nom** désignant la période diurne (par opposition à la nuit *yoru*), le milieu de la journée (midi), ou par extension le repas du midi (*hirugohan*). |
| particules |  |
| furigana | <ruby>昼<rt>ひる</rt></ruby> |
| exemple | **<ruby>昼<rt>ひる</rt></ruby>** ごはん を たべ ます 。 — Je mange le repas de **midi**. |

**Mécanique**

- word : `"昼"`
- readings : `[{"kana":"ひる","romaji":"hiru","furigana":"<ruby>昼<rt>ひる</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Midi** (Journée) | temps › moments_periodes › parties_de_la_journee | concept_abstrait |  | La période du jour, par opposition à la nuit (夜), et son milieu (midi). |
| 2 | **Déjeuner (repas)** | alimentation_cuisine › repas › dejeuner | evenement |  | 昼にする : faire la pause déjeuner ; le repas se dit aussi 昼ご飯. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>昼<rt>ひる</rt></ruby> ごはん を <ruby>食<rt>た</rt></ruby>べる <ruby>時間<rt>じかん</rt></ruby> に なりました — C'est l'heure de manger le repas de **midi**.
- 「<ruby>昼<rt>ひる</rt></ruby> は とても <ruby>暑<rt>あつ</rt></ruby>いですから、<ruby>気<rt>き</rt></ruby>をつけましょう」 — « Comme il fait très chaud à **midi** ('pendant la journée'), faisons attention. »
- <ruby>昼<rt>ひる</rt></ruby> の <ruby>間<rt>あいだ</rt></ruby> は <ruby>仕事<rt>しごと</rt></ruby> を して、<ruby>夜<rt>よる</rt></ruby> は <ruby>勉強<rt>べんきょう</rt></ruby> します — Je travaille pendant la journée (**midi**), et j'étudie le soir.
