# Lot lot-13 · Calendrier, dates et durées

Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.

## Autres entrées

### n5_v_268 → v_268 · 夏休み

**Statut** : décision validée

- **A2-04-D0845** (decision, sens 1 · category) : Même catégorie et même type que 休み, décidé dans ce lot : une période de l'année pendant laquelle on ne travaille ou n'étudie pas (temps › moments et périodes, niveau 2 ; concept_abstrait, comme les saisons du lot 07). La fiche parle de vacances « scolaires ou professionnelles » : éducation › vacances scolaires serait trop étroit, travail › congés aussi. — avant `null` → après `"temps › moments_periodes"`
- **A2-04-D0846** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une période de l'année en général, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0847** (abandon, senses) : Redondant. — avant `["Congés estivaux"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 夏休み · なつやすみ · natsuyasumi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | meteo_saisons › saisons |
| sens | Vacances d'été ; Congés estivaux |
| nuance | Nom composé de <ruby>夏<rt>なつ</rt></ruby> (natsu - été) et de <ruby>休み<rt>やすみ</rt></ruby> (yasumi - repos/vacances), désignant la période des vacances scolaires ou professionnelles estivales. Compteur spécifique : <ruby>回<rt>かい</rt></ruby> (kai) ou <ruby>日間<rt>にちかん</rt></ruby> (nichikan). |
| particules |  |
| furigana | <ruby>夏<rt>なつ</rt></ruby><ruby>休<rt>やす</rt></ruby>み |
| exemple | **<ruby>夏休み<rt>なつやすみ</rt></ruby>** に りょこう を します 。 — Je fais un voyage pendant les **vacances d'été**. |

**Mécanique**

- word : `"夏休み"`
- readings : `[{"kana":"なつやすみ","romaji":"natsuyasumi","furigana":"<ruby>夏<rt>なつ</rt></ruby><ruby>休<rt>やす</rt></ruby>み","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Vacances d'été** | temps › moments_periodes | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>楽<rt>たの</rt></ruby>しい <ruby>夏休み<rt>なつやすみ</rt></ruby> の <ruby>間<rt>あいだ</rt></ruby> に、たくさん の <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>みたい です — Pendant les **vacances d'été** qui sont amusantes, je voudrais lire beaucoup de livres.
- <ruby>夏休み<rt>なつやすみ</rt></ruby> を <ruby>利用<rt>りよう</rt></ruby>して、<ruby>田舎<rt>いなか</rt></ruby> の <ruby>祖父母<rt>そふぼ</rt></ruby> の <ruby>家<rt>いえ</rt></ruby> に <ruby>泊<rt>と</rt></ruby>まりにいきました — J'en ai profité pour aller loger chez mes grands-parents à la campagne pendant les **vacances d'été**.
- <ruby>学生<rt>がくせい</rt></ruby> たち は <ruby>長<rt>なが</rt></ruby>い 夏休み が <ruby>始<rt>はじ</rt></ruby>まる ので とても <ruby>喜<rt>よろこ</rt></ruby>んでいます — Les étudiants sont très heureux car de longues **vacances d'été** commencent.

### n5_v_287 → v_287 · カレンダー

**Statut** : décision validée

- **A2-04-D0848** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : objet d'usage général, sans lien caractéristique avec le contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0849** (categorie-nulle, sens 1 · category) : Aucune catégorie primaire pertinente : カレンダー est un objet qui présente les jours et les mois, pas une notion du calendrier. Le ranger dans temps › calendrier ferait d'une proximité fonctionnelle une appartenance ; le registre n'a pas de catégorie pour ce type d'objet. Même traitement que 時計 (lot 05, révision 5.6b). Addendum A5.

| Champ source | Valeur |
|---|---|
| mot, lecture | カレンダー · かれんだー · karendaa |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › calendrier |
| sens | Calendrier ; Éphéméride |
| nuance | **Nom** d'origine étrangère (gairaigo) transcrit en katakana, désignant un calendrier ou un almanach. Compteur spécifique : <ruby>枚<rt>まい</rt></ruby> (mai) pour les feuilles ou <ruby>冊<rt>さつ</rt></ruby> (satsu) pour les livrets. Les romajis associés sont (*karendaa*). |
| particules |  |
| furigana | カレンダー |
| exemple | **カレンダー** に よえい を かきこみます 。 — Je note mes projets sur le **calendrier**. |

**Mécanique**

- word : `"カレンダー"`
- readings : `[{"kana":"かれんだー","romaji":"karendaa","furigana":"カレンダー","default":true,"note":null}]`
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
| 1 | **Calendrier** (Éphéméride) | **null** | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>壁<rt>かべ</rt></ruby> に カレンダー を <ruby>貼<rt>は</rt></ruby>って、<ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>予定<rt>よてい</rt></ruby> を <ruby>確認<rt>かくにん</rt></ruby> しました — J'ai accroché un **calendrier** au mur pour vérifier mon planning de la semaine prochaine.
- カレンダー を <ruby>見<rt>み</rt></ruby>たら、<ruby>今月<rt>こんげつ</rt></ruby> の <ruby>日曜日<rt>にちようび</rt></ruby> は 全部 <ruby>休み<rt>やすみ</rt></ruby> でした — En regardant le **calendrier**, j'ai vu que tous les dimanches de ce mois-ci étaient des jours de repos.
- <ruby>新<rt>あたら</rt></ruby>しい <ruby>年<rt>とし</rt></ruby> になった ので、<ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> の カレンダー を <ruby>新<rt>あたら</rt></ruby>しく <ruby>変<rt>か</rt></ruby>えました — Comme nous sommes dans une nouvelle année, j'ai remplacé le **calendrier** sur mon bureau par un nouveau.

### n5_v_288 → v_288 · 一日

**Statut** : décision validée

- **A2-04-D0850** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0851** (decision, grammatical_class) : Classe nom : la fiche décrit 一日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0852** (decision, senses) : Un seul sens documenté par la fiche (« une durée d'une journée entière ») ; « toute la journée » en est l'emploi adverbial, non un autre sens. La lecture ついたち (le premier jour du mois), que la fiche signale comme à ne pas confondre, n'est ni une lecture ni un sens de cette entrée : rien n'est ajouté. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. — avant `["Une journée","Tout au long de la journée","Pendant une journée entière"]` → après `"un seul sens"`
- **A2-04-D0853** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0854** (abandon, senses) : Redondant avec « Toute la journée ». — avant `["Pendant une journée entière"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 一日 · いちにち · ichinichi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Une journée ; Tout au long de la journée ; Pendant une journée entière |
| nuance | **Nom** temporel désignant une durée d'une journée entière (à ne pas confondre avec la lecture <ruby>ついたち<rt>tsuitachi</rt></ruby> qui désigne le premier jour du mois). Les romajis associés sont (*ichinichi*). |
| particules |  |
| furigana | <ruby>一日<rt>いちにち</rt></ruby> |
| exemple | **<ruby>一日<rt>いちにち</rt></ruby>** trung <ruby>本<rt>ほん</rt></ruby> を よんで いました 。 — J'ai lu des livres **toute la journée**. |

**Mécanique**

- word : `"一日"`
- readings : `[{"kana":"いちにち","romaji":"ichinichi","furigana":"<ruby>一日<rt>いちにち</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Durée d'une journée entière. À ne pas confondre avec ついたち, le premier jour du mois."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Une journée** (Toute la journée) | temps › duree | quantite_valeur |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>一日<rt>いちにち</rt></ruby> <ruby>中<rt>じゅう</rt></ruby> <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>っていた ので、<ruby>家<rt>いえ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> で <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>いて 過ごしました — Il a plu **toute la journée**, alors je l'ai passée à lire des livres à la maison.
- <ruby>富士山<rt>ふじさん</rt></ruby> の <ruby>頂上<rt>ちょうじょう</rt></ruby> まで <ruby>登<rt>のぼ</rt></ruby>る の に、<ruby>一日<rt>いちにち</rt></ruby> かかりました — Il m'a fallu **une journée** entière pour grimper jusqu'au sommet du mont Fuji.
- <ruby>今日<rt>きょう</rt></ruby> は <ruby>一日<rt>いちにち</rt></ruby> <ruby>本当<rt>ほんとう</rt></ruby> に お<ruby>疲<rt>つか</rt></ruby>れ<ruby>様<rt>さま</rt></ruby>でした。ゆっくり <ruby>休<rt>やす</rt></ruby>んで ください — Merci beaucoup pour **cette journée** d'efforts aujourd'hui. Reposez-vous bien.

### n5_v_291 → v_291 · 一月

**Statut** : décision validée

- **A2-04-D0855** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0856** (decision, grammatical_class) : Classe nom : la fiche décrit 一月 comme un « Nom temporel ». Composé d'un nombre et de 月, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0857** (decision, senses) : Un seul sens documenté par la fiche (« une durée d'un mois »). いちがつ (janvier), que la fiche signale comme à ne pas confondre, n'est ni une lecture ni un sens de cette entrée : rien n'est ajouté. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. — avant `["Un mois (durée)","Une période d'un mois"]` → après `"un seul sens"`
- **A2-04-D0858** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0859** (abandon, senses) : Redondant. — avant `["Une période d'un mois"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 一月 · ひとつき · hitotsuki |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Un mois (durée) ; Une période d'un mois |
| nuance | **Nom** temporel utilisant la lecture japonaise (wago) pour désigner une durée d'un mois (à ne pas confondre avec <ruby>一月<rt>いちがつ</rt></ruby> *ichigatsu* qui désigne le mois de janvier). Les romajis associés sont (*hitotsuki*). |
| particules |  |
| furigana | <ruby>一月<rt>ひとつき</rt></ruby> |
| exemple | **<ruby>一月<rt>ひとつき</rt></ruby>** の あいだ 、にほん に いました 。 — J'ai été au Japon pendant **un mois**. |

**Mécanique**

- word : `"一月"`
- readings : `[{"kana":"ひとつき","romaji":"hitotsuki","furigana":"<ruby>一月<rt>ひとつき</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise (ひとつき), pour la durée. À ne pas confondre avec いちがつ, janvier."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Un mois** | temps › duree | quantite_valeur |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本<rt>にほん</rt></ruby> に <ruby>来<rt>き</rt></ruby>て から、もう <ruby>一月<rt>ひとつき</rt></ruby> が <ruby>経<rt>た</rt></ruby>ちました — Cela fait déjà **un mois** que je suis arrivé au Japon.
- <ruby>一月<rt>ひとつき</rt></ruby> の <ruby>間<rt>あいだ</rt></ruby>、<ruby>毎日<rt>まいにち</rt></ruby> <ruby>休<rt>やす</rt></ruby>まずに <ruby>日本語<rt>にほんご</rt></ruby> を <ruby>勉強<rt>べんきょう</rt></ruby> しています — Pendant **un mois**, j'étudie le japonais tous les jours sans repos.
- この <ruby>仕事<rt>しごと</rt></ruby> を <ruby>終<rt>お</rt></ruby>わる の に、<ruby>一月<rt>ひとつき</rt></ruby> くらい かかります — Il faut environ **un mois** pour terminer ce travail.

### n5_v_292 → v_292 · 七日

**Statut** : décision validée

- **A2-04-D0860** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0861** (decision, grammatical_class) : Classe nom : la fiche décrit 七日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0862** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de sept jours, soit le septième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["7 jours (durée)","Le 7 du mois"]` → après `["S1 Sept jours (durée)","S2 Le 7 du mois (date)"]`
- **A2-04-D0863** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0864** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 七日 · なのか · nanoka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | 7 jours (durée) ; Le 7 du mois |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (kokuji/wago) désignant soit une durée de sept jours, soit le septième jour d'un mois. Les romajis associés sont (*nanoka*). |
| particules |  |
| furigana | <ruby>七日<rt>なのか</rt></ruby> |
| exemple | りょこう は **<ruby>七日<rt>なのか</rt></ruby>** かかります 。 — Le voyage prend **sept jours**. |

**Mécanique**

- word : `"七日"`
- readings : `[{"kana":"なのか","romaji":"nanoka","furigana":"<ruby>七日<rt>なのか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (なのか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sept jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 7 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>旅行<rt>りょこう</rt></ruby> で <ruby>北海道<rt>ほっかいどう</rt></ruby> に <ruby>七日<rt>なのか</rt></ruby> <ruby>間<rt>かん</rt></ruby> <ruby>滞在<rt>たいざい</rt></ruby> する <ruby>予定<rt>よてい</rt></ruby> です — J'ai l'intention de séjourner **7 jours** à Hokkaidô pour mon voyage.
- お<ruby>盆<rt>ぼん</rt></ruby> の <ruby>休<rt>やす</rt></ruby>み は <ruby>七日<rt>なのか</rt></ruby> ありますが、あっという間に <ruby>終<rt>お</rt></ruby>わってしまいました — Les vacances d'Obon durent **7 jours**, mais elles ont filé en un instant.
- <ruby>図書館<rt>としょかん</rt></ruby> で <ruby>借<rt>かり</rt></ruby>た <ruby>本<rt>ほん</rt></ruby> は、あと <ruby>七日<rt>なのか</rt></ruby> 以内 に <ruby>返<rt>かえ</rt></ruby>さなければ なりません — Je dois rendre les livres empruntés à la bibliothèque d'ici **7 jours** au plus tard.

### n5_v_293 → v_293 · 三日

**Statut** : décision validée

- **A2-04-D0865** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0866** (decision, grammatical_class) : Classe nom : la fiche décrit 三日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0867** (decision, senses) : Deux sens documentés par la fiche (« soit le troisième jour d'un mois, soit une durée de trois jours ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche, qui donne ici la date en premier (seule fiche du paradigme dans ce cas). — avant `["Le 3 (du mois)","Trois jours (durée)"]` → après `["S1 Le 3 du mois (date)","S2 Trois jours (durée)"]`
- **A2-04-D0868** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0869** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 三日 · みっか · mikka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Le 3 (du mois) ; Trois jours (durée) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) désignant soit le troisième jour d'un mois, soit une durée de trois jours. Les romajis associés sont (*mikka*). |
| particules |  |
| furigana | <ruby>三日<rt>みっか</rt></ruby> |
| exemple | げつまつ に **<ruby>三日<rt>みっか</rt></ruby>** やすみ を もらいました 。 — J'ai obtenu **trois jours** de repos à la fin du mois. |

**Mécanique**

- word : `"三日"`
- readings : `[{"kana":"みっか","romaji":"mikka","furigana":"<ruby>三日<rt>みっか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (みっか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Le 3 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |
| 2 | **Trois jours** | temps › duree | quantite_valeur |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>今月<rt>こんげつ</rt></ruby> の <ruby>三日<rt>みっか</rt></ruby> に、<ruby>新<rt>あたら</rt></ruby>しい <ruby>店<rt>みせ</rt></ruby> が <ruby>オープン<rt>おーぷん</rt></ruby> します — Un nouveau magasin ouvrira **le 3** de ce mois-ci.
- <ruby>三日<rt>みっか</rt></thought></ruby> <ruby>間<rt>かん</rt></thought></ruby> <ruby>家<rt>いえ</rt></ruby> を <ruby>空<rt>あ</rt></thought></ruby>ける ので、<ruby>植物<rt>しょくぶつ</rt></ruby> に <ruby>水<rt>みず</rt></ruby> を たくさん やりました — Je m'absente de la maison pendant **3 jours**, alors j'ai bien arrosé les plantes.
- <ruby>三日<rt>みっか</rt></ruby> ほど <ruby>考<rt>かんが</rt></thought></ruby>えて から、その <ruby>仕事<rt>しごと</rt></ruby> を <ruby>受<rt>う</rt></ruby>ける か どうか <ruby>決<rt>き</rt></thought></ruby>めます — Après y avoir réfléchi environ **3 jours**, je déciderai si j'accepte ce travail ou non.

### n5_v_294 → v_294 · 九日

**Statut** : décision validée

- **A2-04-D0870** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0871** (decision, grammatical_class) : Classe nom : la fiche décrit 九日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0872** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de neuf jours, soit le neuvième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["9 jours","Le 9 (du mois)"]` → après `["S1 Neuf jours (durée)","S2 Le 9 du mois (date)"]`
- **A2-04-D0873** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0874** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 九日 · ここのか · kokonoka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | 9 jours ; Le 9 (du mois) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) désignant soit une durée de neuf jours, soit le neuvième jour d'un mois. Les romajis associés sont (*kokonoka*). |
| particules |  |
| furigana | <ruby>九日<rt>ここのか</rt></ruby> |
| exemple | しゅっちょう は **<ruby>九日<rt>ここのか</rt></ruby>** かかります 。 — Le voyage d'affaires prend **neuf jours**. |

**Mécanique**

- word : `"九日"`
- readings : `[{"kana":"ここのか","romaji":"kokonoka","furigana":"<ruby>九日<rt>ここのか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (ここのか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Neuf jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 9 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>温泉<rt>おんせん</rt></thought></ruby> に <ruby>九日<rt>ここのか</rt></ruby> <ruby>間<rt>かん</rt></ruby> <ruby>滞在<rt>たいざい</rt></ruby> して、<ruby>日頃<rt>ひごろ</rt></thought></ruby> の <ruby>疲<rt>つか</rt></ruby>れ を すっかり <ruby>取<rt>と</rt></ruby>りました — J'ai séjourné **9 jours** aux sources chaudes et j'ai totalement évacué la fatigue du quotidien.
- プロジェクト の <ruby>締<rt>し</rt></ruby>め<ruby>切<rt>き</rt></thought></ruby>り まで あと <ruby>九日<rt>ここのか</rt></ruby> なので、<ruby>急<rt>きゅう</rt></thought></ruby>ピッチ で <ruby>作業<rt>さぎょう</rt></thought></ruby> を <ruby>進<rt>すす</rt></ruby>めています — Il reste **9 jours** avant la date limite du projet, j'avance donc le travail à un rythme soutenu.
- <ruby>毎月<rt>まいつき</rt></thought></ruby> <ruby>九日<rt>ここのか</rt></thought></ruby> は スーパー の <ruby>特売日<rt>とくばいび</rt></thought></ruby> なので、たくさんの <ruby>人<rt>ひと</rt></thought></ruby> で <ruby>賑<rt>にぎ</rt></thought></ruby>わいます — Comme le **9** de chaque mois est le jour des promotions au supermarché, c'est très animé par beaucoup de monde.

### n5_v_295 → v_295 · 二十日

**Statut** : décision validée

- **A2-04-D0875** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0876** (decision, grammatical_class) : Classe nom : la fiche décrit 二十日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0877** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de vingt jours, soit le vingtième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["20 jours","Le 20 (du mois)"]` → après `["S1 Vingt jours (durée)","S2 Le 20 du mois (date)"]`
- **A2-04-D0878** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0879** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 二十日 · はつか · hatsuka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | 20 jours ; Le 20 (du mois) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) spécifique désignant soit une durée de vingt jours, soit le vingtième jour d'un mois. Les romajis associés sont (*hatsuka*). |
| particules |  |
| furigana | <ruby>二十日<rt>はつか</rt></ruby> |
| exemple | らいげつ の **<ruby>二十日<rt>はつか</rt></ruby>** に とうきょう へ いきます 。 — Je vais à Tokyo le **20** du mois prochain. |

**Mécanique**

- word : `"二十日"`
- readings : `[{"kana":"はつか","romaji":"hatsuka","furigana":"<ruby>二十日<rt>はつか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (はつか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Vingt jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 20 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎月<rt>まいつき</rt></ruby> <ruby>二十日<rt>はつか</rt></ruby> は、<ruby>給料<rt>きゅうりょう</rt></ruby> が <ruby>支払<rt>しはら</rt></ruby>われる <ruby>日<rt>ひ</rt></ruby> です — Le **20** de chaque mois est le jour où le salaire est versé.
- <ruby>二十日<rt>はつか</rt></ruby> <ruby>間<rt>かん</rt></ruby> の <ruby>出張<rt>しゅっちょう</rt></thought></ruby> を <ruby>無事<rt>ぶじ</rt></thought></ruby> に <ruby>終<rt>お</rt></thought></ruby>えて、ようやく <ruby>家<rt>いえ</rt></thought></ruby> に <ruby>帰<rt>かえ</rt></thought></ruby>ってきました — Ayant terminé avec succès mon voyage d'affaires de **20 jours**, je suis enfin rentré à la maison.
- はたち（<ruby>二十歳<rt>はたち</rt></ruby>）の <ruby>誕生日<rt>たんじょうび</rt></thought></ruby> を <ruby>迎<rt>むか</rt></thought></ruby>え、<ruby>家族<rt>かぞく</rt></thought></ruby> と <ruby>一緒<rt>いっしょ</rt></thought></ruby>に お<ruby>祝い<rt>いわ</rt></ruby> を しました — J'ai fêté mes **20 ans** et j'ai célébré cela avec ma famille.

### n5_v_296 → v_296 · 二日

**Statut** : décision validée

- **A2-04-D0880** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0881** (decision, grammatical_class) : Classe nom : la fiche décrit 二日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0882** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de deux jours, soit le deuxième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["Deux jours (durée)","Le 2 (du mois)"]` → après `["S1 Deux jours (durée)","S2 Le 2 du mois (date)"]`
- **A2-04-D0883** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0884** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 二日 · ふつか · futsuka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Deux jours (durée) ; Le 2 (du mois) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) désignant soit une durée de deux jours, soit le deuxième jour d'un mois. Les romajis associés sont (*futsuka*). |
| particules |  |
| furigana | <ruby>二日<rt>ふつか</rt></ruby> |
| exemple | しゅっぴん の ため に **<ruby>二日<rt>ふつか</rt></ruby>** かかりました 。 — Cela a pris **deux jours** pour l'expédition. |

**Mécanique**

- word : `"二日"`
- readings : `[{"kana":"ふつか","romaji":"futsuka","furigana":"<ruby>二日<rt>ふつか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (ふつか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Deux jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 2 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>温泉<rt>おんせん</rt></ruby> で <ruby>二日<rt>ふつか</rt></ruby> <ruby>間<rt>かん</rt></ruby> のんびり <ruby>過<rt>す</rt></ruby>ごして、<ruby>日頃<rt>ひごろ</rt></ruby> の <ruby>疲<rt>つか</rt></ruby>れ が すっかり <ruby>取<rt>と</rt></ruby>れました — J'ai passé **deux jours** tranquillement aux sources chaudes et toute ma fatigue quotidienne a complètement disparu.
- この <ruby>仕事<rt>しごと</rt></ruby> は <ruby>難<rt>むずか</rt></ruby>しい ですが、あと <ruby>二日<rt>ふつか</rt></ruby> で <ruby>終<rt>お</rt></ruby>わります — Ce travail est difficile, mais il sera terminé dans **deux jours**.
- <ruby>二日<rt>ふつか</rt></ruby> <ruby>前<rt>まえ</rt></ruby> に <ruby>送<rt>おく</rt></ruby>った メール の <ruby>返事<rt>へんじ</rt></ruby> が まだ <ruby>来<rt>き</rt></ruby>ません — Je n'ai toujours pas reçu la réponse à l'e-mail que j'ai envoyé il y a **deux jours**.

### n5_v_297 → v_297 · 五日

**Statut** : décision validée

- **A2-04-D0885** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0886** (decision, grammatical_class) : Classe nom : la fiche décrit 五日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0887** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de cinq jours, soit le cinquième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["5 jours","Le 5 (du mois)"]` → après `["S1 Cinq jours (durée)","S2 Le 5 du mois (date)"]`
- **A2-04-D0888** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0889** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 五日 · いつか · itsuka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | 5 jours ; Le 5 (du mois) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) désignant soit une durée de cinq jours, soit le cinquième jour d'un mois. Les romajis associés sont (*itsuka*). |
| particules |  |
| furigana | <ruby>五日<rt>いつか</rt></ruby> |
| exemple | りょこう は **<ruby>五日<rt>いつか</rt></ruby>** で おわります 。 — Le voyage se termine en **cinq jours**. |

**Mécanique**

- word : `"五日"`
- readings : `[{"kana":"いつか","romaji":"itsuka","furigana":"<ruby>五日<rt>いつか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (いつか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Cinq jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 5 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>月曜日<rt>げつようび</rt></ruby> から <ruby>五日<rt>いつか</rt></ruby> <ruby>間<rt>かん</rt></ruby>、<ruby>京都<rt>きょうと</rt></ruby> へ <ruby>出張<rt>しゅっちょう</rt></ruby> に <ruby>行<rt>い</rt></ruby>きます — Je vais en voyage d'affaires à Kyoto pendant **5 jours** à partir de lundi prochain.
- イベント の <ruby>準備<rt>じゅんび</rt></ruby> に は あと <ruby>五日<rt>いつか</rt></ruby> ありますが、もう <ruby>大体<rt>だいたい</rt></ruby> <ruby>終<rt>お</rt></ruby>わっています — Il reste encore **5 jours** pour la préparation de l'événement, mais c'est déjà presque terminé.
- <ruby>毎月<rt>まいつき</rt></ruby> <ruby>五日<rt>いつか</rt></ruby> は <ruby>図書館<rt>としょかん</rt></ruby> の <ruby>休館日<rt>きゅうかんび</rt></ruby> なので、<ruby>本<rt>ほん</rt></ruby> が <ruby>借<rt>か</rt></ruby>りられません — Comme le **5** de chaque mois est le jour de fermeture de la bibliothèque, on ne peut pas y emprunter de livres.

### n5_v_307 → v_307 · 八日

**Statut** : décision validée

- **A2-04-D0890** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0891** (decision, grammatical_class) : Classe nom : la fiche décrit 八日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0892** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de huit jours, soit le huitième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["8 jours","Le 8 (du mois)"]` → après `["S1 Huit jours (durée)","S2 Le 8 du mois (date)"]`
- **A2-04-D0893** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0894** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 八日 · ようか · youka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | 8 jours ; Le 8 (du mois) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) spécifique désignant soit une durée de huit jours, soit le huitième jour d'un mois. Les romajis associés sont (*youka*). |
| particules |  |
| furigana | <ruby>八日<rt>ようか</rt></ruby> |
| exemple | しゅっちょう は **<ruby>八日<rt>ようか</rt></ruby>** かかりました 。 — Le voyage d'affaires a pris **huit jours**. |

**Mécanique**

- word : `"八日"`
- readings : `[{"kana":"ようか","romaji":"youka","furigana":"<ruby>八日<rt>ようか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (ようか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Huit jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 8 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>図書館<rt>としょかん</rt></ruby> で <ruby>借<rt>かり</rt></ruby>た <ruby>本<rt>ほん</rt></ruby> を、<ruby>八日<rt>ようか</rt></ruby> <ruby>後<rt>ご</rt></ruby> に <ruby>返却<rt>へんきゃく</rt></ruby> する <ruby>予定<rt>よてい</rt></ruby> です — J'ai l'intention de rendre les livres empruntés à la bibliothèque **8 jours** plus tard.
- お<ruby>盆<rt>ぼん</rt></ruby> の <ruby>休<rt>やす</rt></ruby>み は <ruby>八日<rt>ようか</rt></ruby> <ruby>間<rt>かん</rt></ruby> ある ので、<ruby>旅行<rt>りょこう</rt></ruby> に <ruby>行<rt>い</rt></ruby>く こと に します — Comme les vacances d'Obon durent **8 jours**, je décide de partir en voyage.
- <ruby>毎月<rt>まいつき</rt></ruby> <ruby>八日<rt>ようか</rt></ruby> は <ruby>近所<rt>きんじょ</rt></ruby> の スーパー で <ruby>安売<rt>やすう</rt></ruby>り セール が <ruby>行<rt>おこな</rt></ruby>われます — Chaque mois, **le 8**, une vente promotionnelle a lieu au supermarché du quartier.

### n5_v_308 → v_308 · 六日

**Statut** : décision validée

- **A2-04-D0895** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0896** (decision, grammatical_class) : Classe nom : la fiche décrit 六日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0897** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de six jours, soit le sixième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["6 jours","Le 6 (du mois)"]` → après `["S1 Six jours (durée)","S2 Le 6 du mois (date)"]`
- **A2-04-D0898** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0899** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 六日 · むいか · muika |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | 6 jours ; Le 6 (du mois) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) spécifique désignant soit une durée de six jours, soit le sixième jour d'un mois. Les romajis associés sont (*muika*). |
| particules |  |
| furigana | <ruby>六日<rt>むいか</rt></ruby> |
| exemple | しごと は **<ruby>六日<rt>むいか</rt></ruby>** で おわります 。 — Le travail se termine en **six jours**. |

**Mécanique**

- word : `"六日"`
- readings : `[{"kana":"むいか","romaji":"muika","furigana":"<ruby>六日<rt>むいか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (むいか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Six jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 6 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>温泉<rt>おんせん</rt></ruby> に <ruby>六日<rt>むいか</rt></ruby> <ruby>間<rt>かん</rt></ruby> <ruby>滞在<rt>たいざい</rt></ruby> して、<ruby>体<rt>からだ</rt></ruby> の <ruby>疲<rt>つか</rt></ruby>れ を すっかり <ruby>取<rt>と</rt></ruby>りました — J'ai séjourné **6 jours** aux sources chaudes et toute la fatigue de mon corps a complètement disparu.
- イベント の <ruby>準備<rt>じゅんび</rt></ruby> に は あと <ruby>六日<rt>むいか</rt></ruby> ありますが、<ruby>順調<rt>じゅんちょう</rt></ruby> に <ruby>進<rt>すす</rt></ruby>んでいます — Il reste encore **6 jours** pour la préparation de l'événement, mais cela avance sans encombre.
- <ruby>毎月<rt>まいつき</rt></ruby> <ruby>六日<rt>むいか</rt></ruby> は <ruby>映画館<rt>えいがかん</rt></ruby> の <ruby>割安<rt>わりやす</rt></ruby> デー なので、よく <ruby>見<rt>み</rt></ruby>に <ruby>行<rt>い</rt></ruby>きます — Comme le **6** de chaque mois est le jour des tarifs réduits au cinéma, j'y vais souvent.

### n5_v_309 → v_309 · 十日

**Statut** : décision validée

- **A2-04-D0900** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0901** (decision, grammatical_class) : Classe nom : la fiche décrit 十日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0902** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de dix jours, soit le dixième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["10 jours (durée)","Le 10 (du mois)"]` → après `["S1 Dix jours (durée)","S2 Le 10 du mois (date)"]`
- **A2-04-D0903** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0904** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 十日 · とおか · tooka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | 10 jours (durée) ; Le 10 (du mois) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) spécifique désignant soit une durée de dix jours, soit le dixième jour d'un mois. Les romajis associés sont (*tooka*). |
| particules |  |
| furigana | <ruby>十日<rt>とおか</rt></ruby> |
| exemple | りょこう は **<ruby>十日<rt>とおか</rt></ruby>** かかりました 。 — Le voyage a pris **dix jours**. |

**Mécanique**

- word : `"十日"`
- readings : `[{"kana":"とおか","romaji":"tooka","furigana":"<ruby>十日<rt>とおか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (とおか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Dix jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 10 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>北海道<rt>ほっかいどう</rt></ruby> を <ruby>中心<rt>ちゅうしん</rt></ruby> に <ruby>十日<rt>とおか</rt></ruby> <ruby>間<rt>かん</rt></ruby> の <ruby>旅行<rt>りょこう</rt></ruby> を <ruby>楽<rt>たの</rt></ruby>しみました — J'ai profité d'un voyage de **10 jours** principalement centré sur Hokkaidô.
- <ruby>図書館<rt>としょかん</rt></ruby> で <ruby>借<rt>かり</rt></ruby>た <ruby>本<rt>ほん</rt></ruby> は、<ruby>十日<rt>とおか</rt></ruby> <ruby>以内<rt>いない</rt></ruby> に <ruby>返却<rt>へんきゃく</rt></ruby> する <ruby>必要<rt>ひつよう</rt></ruby> が あります — Il est nécessaire de rendre les livres empruntés à la bibliothèque dans un délai de **10 jours**.
- この プロジェクト の <ruby>締<rt>し</rt></ruby>め<ruby>切<rt>き</rt></ruby>り まで あと <ruby>十日<rt>とおか</rt></ruby> なので、ラストスパート を かけます — Il reste **10 jours** avant la date limite de ce projet, alors nous mettons un dernier coup d'accélérateur.

### n5_v_311 → v_311 · 半

**Statut** : décision validée

- **A2-04-D0905** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0906** (decision, senses) : Deux sens documentés par la fiche (« désignant la moitié d'une quantité ou employé après une heure pour indiquer la demi-heure ») : une fraction, et la demi-heure qui s'ajoute à une heure ; deux référents, deux catégories. Type quantite_valeur pour les deux : une quantité (la moitié, une demi-heure), non une unité. — avant `["Moitié","Et demie (pour les heures)"]` → après `["S1 Moitié (d'une quantité)","S2 Et demie (après une heure)"]`
- **A2-04-D0907** (decision, suffix) : suffix : true. La fiche décrit 半 comme « Nom suffixe ou nominal » et donne son emploi suffixé (三時半). C'est la propriété « suffixe » d'A2-LING-v1, portée par le champ suffix du schéma ; première ENTRY du corpus à la porter. Cette décision ne crée aucune ENTRY d'affixe et ne préjuge pas de la représentation des affixes (point ouvert). — avant `false` → après `true`
- **A2-04-D0908** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une précision d'heure, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 半 · はん · han |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › mesures |
| sens | Moitié ; Et demie (pour les heures) |
| nuance | **Nom** suffixe ou nominal désignant la moitié d'une quantité ou employé après une heure pour indiquer la demi-heure (ex. : <ruby>三時半<rt>さんじはん</rt></ruby> *san ji han* - 3h30). Les romajis associés sont (*han*). |
| particules |  |
| furigana | <ruby>半<rt>はん</rt></ruby> |
| exemple | いちじ **<ruby>半<rt>はん</rt></ruby>** に でかけます 。 — Je sors à une heure et **demie**. |

**Mécanique**

- word : `"半"`
- readings : `[{"kana":"はん","romaji":"han","furigana":"<ruby>半<rt>はん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `true`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Moitié** | nombres_quantification › proportions › fraction | quantite_valeur |  |  |
| 2 | **Et demie (heure)** | temps › unites_temporelles › seconde_minute_heure | quantite_valeur |  | Après une heure : 三時半, trois heures et demie. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>会議<rt>かいぎ</rt></ruby> が <ruby>始<rt>はじ</rt></ruby>まって から <ruby>半<rt>はん</rt></ruby> <ruby>時間<rt>じかん</rt></ruby> が <ruby>経<rt>た</rt></ruby>ちました — Une **demi**-heure s'est écoulée depuis le début de la réunion.
- <ruby>時計<rt>とけい</rt></ruby> の <ruby>針<rt>はり</rt></ruby> が ちょうど 12 <ruby>時<rt>じ</rt></ruby> <ruby>半<rt>はん</rt></ruby> を <ruby>指<rt>さ</rt></ruby>して います — Les aiguilles de l'horloge indiquent exactement midi et **demie**.
- <ruby>林檎<rt>りんご</rt></ruby> を ナイフ で <ruby>半<rt>はん</rt></ruby>ぶん に <ruby>切<rt>き</rt></ruby>って、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>分<rt>わ</rt></ruby>けました — J'ai coupé une pomme en **deux** (moitié) avec un couteau et l'ai partagée avec un ami.

### n5_v_313 → v_313 · 四日

**Statut** : décision validée

- **A2-04-D0909** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0910** (decision, grammatical_class) : Classe nom : la fiche décrit 四日 comme un « Nom temporel ». Composé d'un nombre et de 日, ce n'est pas un numéral simple (liste des quinze nombres) ; il s'emploie comme un nom. group : nom. — avant `"nom (ancien type ; exception de classe : composé numéral)"` → après `"nom"`
- **A2-04-D0911** (decision, senses) : Deux sens documentés par la fiche (« soit une durée de quatre jours, soit le quatrième jour d'un mois ») : une date du calendrier et une durée, deux référents, deux catégories, deux types. La date : temps › calendrier › dates, concept_abstrait, comme les repères temporels des lots 0 et 12. La durée : temps › durée, quantite_valeur (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement », A2-ST-v1) : c'est une quantité de temps, et non une unité. Ordre des sens : celui de la fiche. — avant `["4 jours","Le 4 (du mois)"]` → après `["S1 Quatre jours (durée)","S2 Le 4 du mois (date)"]`
- **A2-04-D0912** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0913** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 四日 · よっか · yokka |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | 4 jours ; Le 4 (du mois) |
| nuance | **Nom** temporel utilisant une lecture traditionnelle (wago) spécifique désignant soit une durée de quatre jours, soit le quatrième jour d'un mois. Les romajis associés sont (*yokka*). |
| particules |  |
| furigana | <ruby>四日<rt>よっか</rt></ruby> |
| exemple | しゅっちょう は **<ruby>四日<rt>よっか</rt></ruby>** かかりました 。 — Le voyage d'affaires a pris **quatre jours**. |

**Mécanique**

- word : `"四日"`
- readings : `[{"kana":"よっか","romaji":"yokka","furigana":"<ruby>四日<rt>よっか</rt></ruby>","default":true,"note":null}]`
- grammatical_class : **exception**, classe à décider (liste consignée)
- group : **exception**, dépend de la classe, en exception
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- grammatical_class : `"nom"`
- group : `"nom"`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Lecture japonaise traditionnelle (よっか), la même pour la date et pour la durée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Quatre jours** | temps › duree | quantite_valeur |  |  |
| 2 | **Le 4 (du mois)** | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>温泉<rt>おんせん</rt></ruby> に <ruby>四日<rt>よっか</rt></ruby> <ruby>間<rt>かん</rt></ruby> <ruby>滞在<rt>たいざい</rt></ruby> して、ゆっくり リフレッシュ しました — J'ai séjourné **4 jours** aux sources chaudes et je me suis détendu tranquillement.
- <ruby>図書館<rt>としょかん</rt></ruby> で <ruby>借<rt>かり</rt></ruby>た <ruby>本<rt>ほん</rt></ruby> を、あと <ruby>四日<rt>よっか</rt></ruby> <ruby>以内<rt>いない</rt></ruby> に <ruby>返<rt>かえ</rt></ruby>さなければ なりません — Je dois rendre les livres empruntés à la bibliothèque d'ici **4 jours** au plus tard.
- イベント の <ruby>準備<rt>じゅんび</rt></ruby> に は あと <ruby>四日<rt>よっか</rt></ruby> ある ので、まだ <ruby>時間<rt>じかん</rt></ruby> が あります — Il reste encore **4 jours** pour la préparation de l'événement, donc il y a encore du temps.

### n5_v_314 → v_314 · 土曜日

**Statut** : décision validée

- **A2-04-D0914** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0915** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 土曜日 est un jour de la semaine, repère du calendrier, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0916** (abandon, senses) : Glose étymologique des kanji du mot, donnée par la fiche : ni un sens, ni une traduction. — avant `["Le jour de Saturne"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 土曜日 · どようび · doyoubi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Samedi ; Le jour de Saturne |
| nuance | **Nom** temporel composé de <ruby>土<rt>ど</rt></ruby> (terre/élément terre), <ruby>曜<rt>よう</rt></ruby> (brillant/astre) et <ruby>日<rt>び</rt></ruby> (jour), désignant le samedi. Les romajis associés sont (*doyoubi*). |
| particules |  |
| furigana | <ruby>土<rt>ど</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby> |
| exemple | **<ruby>土曜日<rt>どようび</rt></ruby>** は しごと が ありません 。 — Je n'ai pas travail **samedi**. |

**Mécanique**

- word : `"土曜日"`
- readings : `[{"kana":"どようび","romaji":"doyoubi","furigana":"<ruby>土<rt>ど</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Samedi** | temps › calendrier › jours | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>土曜日<rt>どようび</rt></ruby> は <ruby>会社<rt>かいしゃ</rt></ruby> が <ruby>休み<rt>やすみ</rt></ruby> なので、<ruby>朝<rt>あさ</rt></ruby> ゆっくり <ruby>寝<rt>ね</rt></ruby>られます — Comme l'entreprise est fermée **le samedi**, je peux faire la grasse matinée le matin.
- <ruby>今週末<rt>こんしゅうまつ</rt></ruby> の <ruby>土曜日<rt>どようび</rt></ruby> に、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>映画<rt>えいが</rt></ruby> を <ruby>見<rt>み</rt></ruby>に <ruby>行<rt>い</rt></ruby>きます — Ce **samedi** de ce week-end, je vais aller voir un film avec un ami.
- <ruby>土曜日<rt>どようび</rt></ruby> の <ruby>午後<rt>ごご</rt></ruby> は <ruby>近所<rt>きんじょ</rt></ruby> の スーパー で <ruby>一週間<rt>いっしゅうかん</rt></ruby> の <ruby>食料品<rt>しょくりょうひん</rt></ruby> を <ruby>買<rt>か</rt></ruby>います — Le **samedi** après-midi, j'achète les provisions pour une semaine au supermarché du quartier.

### n5_v_316 → v_316 · 年

**Statut** : décision validée

- **A2-04-D0917** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0918** (decision, senses) : Deux sens documentés par la fiche (« une année calendaire ou l'âge d'une personne ») : une période du calendrier et une caractéristique d'une personne, deux référents, deux catégories, deux types. L'année : temps › calendrier › années, concept_abstrait. L'âge : être humain › cycle de vie (niveau 2, le registre n'a pas de niveau 3 pour l'âge), propriete (caractéristique attribuable à une entité, A2-ST-v1). — avant `["Année","Âge","An"]` → après `["S1 Année, an (calendrier)","S2 Âge (d'une personne)"]`
- **A2-04-D0919** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : l'année en général, sans repérage par rapport au moment de l'énonciation ; ce repérage est porté par 今年 (lot 12). — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 年 · とし · toshi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Année ; Âge ; An |
| nuance | **Nom** temporel désignant une année calendaire ou l'âge d'une personne (avec la lecture japonaise *toshi*). Les romajis associés sont (*toshi*). |
| particules |  |
| furigana | <ruby>年<rt>とし</rt></ruby> |
| exemple | ことし は あたらしい **<ruby>年<rt>とし</rt></ruby>** です 。 — Cette année est une **année** nouvelle. |

**Mécanique**

- word : `"年"`
- readings : `[{"kana":"とし","romaji":"toshi","furigana":"<ruby>年<rt>とし</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Année** (An) | temps › calendrier › annees | concept_abstrait |  |  |
| 2 | **Âge** | etre_humain › cycle_de_vie | propriete |  |  |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>町<rt>まち</rt></ruby> に <ruby>住<rt>す</rt></ruby>んで から、もう 5 <ruby>年<rt>ねん</rt></thought></ruby> が <ruby>経<rt>た</rt></ruby>ちました — Cela fait déjà 5 **ans** que j'habite dans cette ville.
- <ruby>年<rt>とし</rt></ruby> の <ruby>初<rt>はし</rt></ruby>め に、その <ruby>年<rt>とし</rt></ruby> の <ruby>目標<rt>もくひょう</rt></ruby> を <ruby>手帳<rt>てちょう</rt></ruby> に <ruby>書<rt>か</rt></ruby>きます — Au début de l'**année**, j'écris les objectifs de cette **année**-là dans mon carnet.
- <ruby>祖父<rt>そふ</rt></ruby> は お<ruby>年<rt>とし</rt></ruby> を <ruby>召<rt>め</rt></ruby>していますが、まだまだ とても <ruby>元気<rt>げんき</rt></ruby> です — Mon grand-père a de l'âge (prend de l'**âge**), mais il est encore très en forme.

### n5_v_317 → v_317 · 日曜日

**Statut** : décision validée

- **A2-04-D0920** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0921** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 日曜日 est un jour de la semaine, repère du calendrier, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0922** (abandon, senses) : Glose étymologique des kanji du mot, donnée par la fiche : ni un sens, ni une traduction. — avant `["Le jour du Soleil"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 日曜日 · にちようび · nichiyoubi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Dimanche ; Le jour du Soleil |
| nuance | **Nom** temporel composé de <ruby>日<rt>にち</rt></ruby> (soleil/jour), <ruby>曜<rt>よう</rt></ruby> (brillant/astre) et <ruby>日<rt>び</rt></ruby> (jour), désignant le dimanche. Les romajis associés sont (*nichiyoubi*). |
| particules |  |
| furigana | <ruby>日<rt>にち</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby> |
| exemple | **<ruby>日曜日<rt>にちようび</rt></ruby>** は やすみ です 。 — Le **dimanche** est un jour de repos. |

**Mécanique**

- word : `"日曜日"`
- readings : `[{"kana":"にちようび","romaji":"nichiyoubi","furigana":"<ruby>日<rt>にち</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Dimanche** | temps › calendrier › jours | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日曜日<rt>にちようび</rt></ruby> は <ruby>会社<rt>かいしゃ</rt></ruby> が <ruby>休み<rt>やすみ</rt></ruby> なので、<ruby>家族<rt>かぞく</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>公園<rt>こうえん</rt></ruby> に <ruby>行<rt>い</rt></ruby>きます — Comme l'entreprise est fermée **le dimanche**, je vais au parc avec ma famille.
- <ruby>日曜日<rt>にちようび</rt></ruby> の <ruby>朝<rt>あさ</rt></ruby> は <ruby>静<rt>しず</rt></ruby>かで、<ruby>部屋<rt>へや</rt></ruby> で ゆっくり <ruby>読書<rt>どくしょ</rt></ruby> を する の が <ruby>好き<rt>すき</rt></ruby> です — Le matin **du dimanche** est calme, et j'aime lire tranquillement dans ma chambre.
- <ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>日曜日<rt>にちようび</rt></ruby> は、<ruby>大切<rt>たいせつ</rt></ruby> な <ruby>試験<rt>しけん</rt></ruby> が ある ので <ruby>朝<rt>あさ</rt></ruby> から <ruby>勉強<rt>べんきょう</rt></ruby> します — Comme j'ai un examen important **dimanche** prochain, j'étudierai dès le matin.

### n5_v_321 → v_321 · 時間

**Statut** : décision validée

- **A2-04-D0923** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0924** (decision, senses) : Deux sens documentés par la fiche (« désignant une durée ou le temps global disponible », puis « Compteur spécifique : 時間 … pour les heures ») : le temps comme durée, et l'heure comme unité de durée ; deux référents, deux catégories. S1 : temps › durée, concept_abstrait (la notion de durée, non une quantité déterminée). — avant `["Temps","Heure (durée)"]` → après `["S1 Temps, durée","S2 Heure (unité de durée)"]`
- **A2-04-D0925** (decision, counter) : counter : null, faute de pouvoir faire autrement. La fiche dit que 時間 sert de compteur pour les heures ; mais counter_for exige au moins une compatibilité du registre des compteurs (A2-02), qui n'en a que six (petits animaux, objets plats, objets longs, livres et volumes, unités génériques, occurrences), aucune pour une durée. Aucune compatibilité n'est inventée. L'emploi est décrit dans la nuance du sens 2. Blocage de modèle signalé à la relecture.
- **A2-04-D0926** (type-nul, sens 2 · semantic_type) : Heure, unité de durée : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0) et 匹 (lot 07). Addendum A6.
- **A2-04-D0927** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : le temps comme durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0928** (decision, sens 2 · linguistic_functions) : Pas de fonction deictique (A7) : une unité de durée, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 時間 · じかん · jikan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › periodes |
| sens | Temps ; Heure (durée) |
| nuance | **Nom** composé de <ruby>時<rt>じ</rt></ruby> (heure/moment) et de <ruby>間<rt>かん</rt></ruby> (intervalle/espace), désignant une durée ou le temps global disponible. Compteur spécifique : <ruby>時間<rt>じかん</rt></ruby> (jikan) pour les heures. Les romajis associés sont (*jikan*). |
| particules |  |
| furigana | <ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby> |
| exemple | いま 、**<ruby>時間<rt>じかん</rt></ruby>** が ありません 。 — Je n'ai pas le **temps** maintenant. |

**Mécanique**

- word : `"時間"`
- readings : `[{"kana":"じかん","romaji":"jikan","furigana":"<ruby>時<rt>じ</rt></ruby><ruby>間<rt>かん</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Temps** (Durée) | temps › duree | concept_abstrait |  |  |
| 2 | **Heure (durée)** | temps › unites_temporelles › seconde_minute_heure | **null** |  | Sert à compter les heures. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>時間<rt>じかん</rt></ruby> が あったら、<ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>日本<rt>にほん</rt></ruby> の <ruby>映画<rt>えいが</rt></ruby> を <ruby>見<rt>み</rt></ruby>ませんか — Si tu as du **temps**, veux-tu qu'on regarde un film japonais ensemble ?
- この <ruby>仕事<rt>しごと</rt></ruby> を <ruby>終<rt>お</rt></ruby>わる の に、どのくらい <ruby>時間<rt>じかん</rt></ruby> が かかりますか — Combien de **temps** faut-il pour terminer ce travail ?
- <ruby>毎日<rt>まいにち</rt></ruby> <ruby>時間<rt>じかん</rt></ruby> を <ruby>決<rt>き</rt></ruby>めて、<ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> を しています — Je fixe du **temps** tous les jours pour étudier le japonais.

### n5_v_323 → v_323 · 月曜日

**Statut** : décision validée

- **A2-04-D0929** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0930** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 月曜日 est un jour de la semaine, repère du calendrier, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0931** (abandon, senses) : Glose étymologique des kanji du mot, donnée par la fiche : ni un sens, ni une traduction. — avant `["Le jour de la Lune"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 月曜日 · げつようび · getsuyoubi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Lundi ; Le jour de la Lune |
| nuance | **Nom** temporel composé de <ruby>月<rt>げつ</rt></ruby> (lune/mois), <ruby>曜<rt>よう</rt></ruby> (brillant/astre) et <ruby>日<rt>び</rt></ruby> (jour), désignant le lundi. Les romajis associés sont (*getsuyoubi*). |
| particules |  |
| furigana | <ruby>月<rt>げつ</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby> |
| exemple | **<ruby>月曜日<rt>げつようび</rt></ruby>** から しごと が はじまります 。 — Le travail commence à partir de **lundi**. |

**Mécanique**

- word : `"月曜日"`
- readings : `[{"kana":"げつようび","romaji":"getsuyoubi","furigana":"<ruby>月<rt>げつ</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Lundi** | temps › calendrier › jours | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>月曜日<rt>げつようび</rt></ruby> から <ruby>新<rt>あたら</rt></ruby>しい <ruby>週<rt>しゅう</rt></ruby> が <ruby>始<rt>はじ</rt></ruby>まる ので、<ruby>週末<rt>しゅうまつ</rt></ruby> は しっかり <ruby>休<rt>やす</rt></ruby>みます — Une nouvelle semaine commence **lundi**, alors je me repose bien le week-end.
- <ruby>月曜日<rt>げつようび</rt></ruby> の <ruby>朝<rt>あさ</rt></ruby> は <ruby>会社<rt>かいしゃ</rt></ruby> に <ruby>向<rt>む</rt></ruby>かう <ruby>人<rt>ひと</rt></ruby> で <ruby>電車<rt>でんしゃ</rt></ruby> が とても <ruby>混<rt>こ</rt></ruby>みます — Le **lundi** matin, les trains sont très bondés de gens qui se rendent au travail.
- <ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>月曜日<rt>げつようび</rt></ruby> に、<ruby>大切<rt>たいせつ</rt></ruby> な <ruby>会議<rt>かいぎ</rt></ruby> が <ruby>予定<rt>よてい</rt></ruby> されています — Une réunion importante est prévue **lundi** prochain.

### n5_v_325 → v_325 · 木曜日

**Statut** : décision validée

- **A2-04-D0932** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0933** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 木曜日 est un jour de la semaine, repère du calendrier, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0934** (abandon, senses) : Glose étymologique des kanji du mot, donnée par la fiche : ni un sens, ni une traduction. — avant `["Le jour de Jupiter (de l'arbre)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 木曜日 · もくようび · mokuyoubi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Jeudi ; Le jour de Jupiter (de l'arbre) |
| nuance | **Nom** temporel composé de <ruby>木<rt>もく</rt></ruby> (arbre/bois), <ruby>曜<rt>よう</rt></ruby> (brillant/astre) et <ruby>日<rt>び</rt></ruby> (jour), désignant le jeudi. Les romajis associés sont (*mokuyoubi*). |
| particules |  |
| furigana | <ruby>木<rt>もく</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby> |
| exemple | **<ruby>木曜日<rt>もくようび</rt></ruby>** に テスト が あります 。 — Il y a un test **jeudi**. |

**Mécanique**

- word : `"木曜日"`
- readings : `[{"kana":"もくようび","romaji":"mokuyoubi","furigana":"<ruby>木<rt>もく</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Jeudi** | temps › calendrier › jours | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎週<rt>まいしゅう</rt></ruby> <ruby>木曜日<rt>もくようび</rt></ruby> の <ruby>午後<rt>ごご</rt></ruby> は、<ruby>日本語<rt>にほんご</rt></ruby> の サークル に <ruby>参加<rt>さんか</rt></ruby> しています — Tous les **jeudis** après-midi, je participe à un cercle de discussion en japonais.
- <ruby>今週<rt>こんしゅう</rt></ruby> の <ruby>木曜日<rt>もくようび</rt></ruby> は <ruby>祝日<rt>しゅくじつ</rt></ruby> なので、<ruby>会社<rt>かいしゃ</rt></ruby> は お<ruby>休<rt>やす</rt></ruby>み です — Comme c'est un jour férié ce **jeudi**-ci, l'entreprise est fermée.
- <ruby>木曜日<rt>もくようび</rt></ruby> まで に この レポート を <ruby>完成<rt>かんせい</rt></ruby> させなければ なりません — Je dois terminer ce rapport d'ici **jeudi** au plus tard.

### n5_v_335 → v_335 · 水曜日

**Statut** : décision validée

- **A2-04-D0935** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0936** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 水曜日 est un jour de la semaine, repère du calendrier, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0937** (abandon, senses) : Glose étymologique des kanji du mot, donnée par la fiche : ni un sens, ni une traduction. — avant `["Le jour de l'eau"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 水曜日 · すいようび · suiyoubi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Mercredi ; Le jour de l'eau |
| nuance | **Nom** temporel composé de <ruby>水<rt>すい</rt></ruby> (eau/élément eau), <ruby>曜<rt>よう</rt></ruby> (brillant/astre) et <ruby>日<rt>び</rt></ruby> (jour), désignant le mercredi. Les romajis associés sont (*suiyoubi*). |
| particules |  |
| furigana | <ruby>水<rt>すい</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby> |
| exemple | **<ruby>水曜日<rt>すいようび</rt></ruby>** に とずかん に いきます 。 — Je vais à la bibliothèque **mercredi**. |

**Mécanique**

- word : `"水曜日"`
- readings : `[{"kana":"すいようび","romaji":"suiyoubi","furigana":"<ruby>水<rt>すい</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Mercredi** | temps › calendrier › jours | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>水曜日<rt>すいようび</rt></ruby> の <ruby>午後<rt>ごご</rt></ruby> に、<ruby>新<rt>あたら</rt></ruby>しい <ruby>プロジェクト<rt>ぷろじぇくと</rt></ruby> の <ruby>会議<rt>かいぎ</rt></ruby> が あります — Il y a une réunion pour le nouveau projet mercredi **après-midi** (**mercredi**).
- <ruby>毎週<rt>まいしゅう</rt></ruby> <ruby>水曜日<rt>すいようび</rt></ruby> は <ruby>図書館<rt>としょかん</rt></ruby> が <ruby>休館日<rt>きゅうかんび</rt></ruby> なので、<ruby>本<rt>ほん</rt></ruby> が <ruby>借<rt>か</rt></ruby>りられません — Comme la bibliothèque est fermée **chaque mercredi**, on ne peut pas y emprunter de livres.
- <ruby>今週<rt>こんしゅう</rt></ruby> の <ruby>水曜日<rt>すいようび</rt></ruby> は <ruby>天気<rt>てんき</rt></ruby> が よければ、<ruby>仕事<rt>しごと</rt></ruby> の <ruby>後<rt>あと</rt></ruby> に <ruby>散歩<rt>さんぽ</rt></ruby> を します — Si le temps est beau **mercredi** de cette semaine, je ferai une promenade après le travail.

### n5_v_336 → v_336 · 火曜日

**Statut** : décision validée

- **A2-04-D0938** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0939** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 火曜日 est un jour de la semaine, repère du calendrier, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0940** (abandon, senses) : Glose étymologique des kanji du mot, donnée par la fiche : ni un sens, ni une traduction. — avant `["Le jour du feu"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 火曜日 · かようび · kayoubi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Mardi ; Le jour du feu |
| nuance | **Nom** temporel composé de <ruby>火<rt>か</rt></ruby> (feu/élément feu), <ruby>曜<rt>よう</rt></ruby> (brillant/astre) et <ruby>日<rt>び</rt></ruby> (jour), désignant le mardi. Les romajis associés sont (*kayoubi*). |
| particules |  |
| furigana | <ruby>火<rt>か</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby> |
| exemple | **<ruby>火曜日<rt>かようび</rt></ruby>** は かいぎ が あります 。 — Il y a une réunion **mardi**. |

**Mécanique**

- word : `"火曜日"`
- readings : `[{"kana":"かようび","romaji":"kayoubi","furigana":"<ruby>火<rt>か</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Mardi** | temps › calendrier › jours | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>火曜日<rt>かようび</rt></ruby> の <ruby>朝<rt>あさ</rt></ruby> は、<ruby>近所<rt>きんじょ</rt></ruby> の スーパー で <ruby>野菜<rt>やさい</rt></ruby> の <ruby>特売<rt>とくばい</rt></ruby> が あります — Mardi **matin**, il y a une vente spéciale de légumes au supermarché du quartier.
- <ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>火曜日<rt>かようび</rt></ruby> まで に、この レポート を <ruby>提出<rt>ていしゅつ</rt></ruby> しなければ なりません — Je dois rendre ce rapport d'ici **mardi** de la semaine prochaine.
- <ruby>毎週<rt>まいしゅう</rt></ruby> <ruby>火曜日<rt>かようび</rt></ruby> の <ruby>夜<rt>よる</rt></ruby> は、<ruby>家<rt>いえ</rt></ruby> で ゆっくり <ruby>読書<rt>どくしょ</rt></ruby> を する <ruby>時間<rt>じかん</rt></ruby> に しています — Je prends le temps de lire tranquillement chez moi **chaque mardi** soir.

### n5_v_337 → v_337 · 誕生日

**Statut** : décision validée

- **A2-04-D0941** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0942** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une date propre à une personne, repérée dans le calendrier et non par rapport au moment de l'énonciation. — avant `null` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 誕生日 · たんじょうび · tanjoubi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › calendrier |
| sens | Anniversaire ; Jour de naissance |
| nuance | **Nom** temporel composé de <ruby>誕生<rt>たんじょう</rt></ruby> (naissance) et de <ruby>日<rt>び</rt></ruby> (jour), désignant la date d'anniversaire d'une personne. Les romajis associés sont (*tanjoubi*). |
| particules |  |
| furigana | <ruby>誕<rt>たん</rt></ruby><ruby>生<rt>じょう</rt></ruby><ruby>日<rt>び</rt></ruby> |
| exemple | きょう は わたし の **<ruby>誕生日<rt>たんじょうび</rt></ruby>** です 。 — Aujourd'hui, c'est mon **anniversaire**. |

**Mécanique**

- word : `"誕生日"`
- readings : `[{"kana":"たんじょうび","romaji":"tanjoubi","furigana":"<ruby>誕<rt>たん</rt></ruby><ruby>生<rt>じょう</rt></ruby><ruby>日<rt>び</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Anniversaire** (Jour de naissance) | temps › calendrier › dates | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>日曜日<rt>にちようび</rt></ruby> は わたしの <ruby>誕生日<rt>たんじょうび</rt></ruby> なので、<ruby>家族<rt>かぞく</rt></ruby> が お<ruby>祝い<rt>いわ</rt></ruby> を してくれます — Comme c'est mon **anniversaire** dimanche prochain, ma famille va me fêter cela.
- <ruby>友達<rt>ともだち</rt></ruby> の <ruby>誕生日<rt>たんじょうび</rt></ruby> に、<ruby>綺麗<rt>きれい</rt></ruby> な <ruby>花束<rt>はなたば</rt></ruby> と カード を <ruby>贈<rt>おく</rt></ruby>りました — J'ai offert un joli bouquet de fleurs et une carte pour l'**anniversaire** d'un ami.
- <ruby>誕生日<rt>たんじょうび</rt></ruby> に <ruby>欲<rt>ほ</rt></ruby>しかった カメラ を、<ruby>自分<rt>じぶん</rt></ruby> の <ruby>褒美<rt>ほうび</rt></ruby> に <ruby>買<rt>か</rt></ruby>いました — Pour mon **anniversaire**, je me suis acheté l'appareil photo dont j'enviais l'acquisition en guise de récompense.

### n5_v_338 → v_338 · 金曜日

**Statut** : décision validée

- **A2-04-D0943** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0944** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : 金曜日 est un jour de la semaine, repère du calendrier, sans repérage par rapport au moment de l'énonciation. Être un mot temporel ne suffit pas. — avant `null` → après `[]`
- **A2-04-D0945** (abandon, senses) : Glose étymologique des kanji du mot, donnée par la fiche : ni un sens, ni une traduction. — avant `["Le jour de l'or / du métal"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 金曜日 · きんようび · kinyoubi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › jours |
| sens | Vendredi ; Le jour de l'or / du métal |
| nuance | **Nom** temporel composé de <ruby>金<rt>きん</rt></ruby> (or/métal), <ruby>曜<rt>よう</rt></ruby> (brillant/astre) et <ruby>日<rt>び</rt></ruby> (jour), désignant le vendredi. Les romajis associés sont (*kinyoubi*). |
| particules |  |
| furigana | <ruby>金<rt>きん</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby> |
| exemple | **<ruby>金曜日<rt>きんようび</rt></ruby>** に えいが を みます 。 — Je regarde un film **vendredi**. |

**Mécanique**

- word : `"金曜日"`
- readings : `[{"kana":"きんようび","romaji":"kinyoubi","furigana":"<ruby>金<rt>きん</rt></ruby><ruby>曜<rt>よう</rt></ruby><ruby>日<rt>び</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Vendredi** | temps › calendrier › jours | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>金曜日<rt>きんようび</rt></ruby> の <ruby>夜<rt>よる</rt></ruby> は <ruby>仕事<rt>しごと</rt></ruby> が <ruby>終<rt>お</rt></ruby>わった <ruby>後<rt>あと</rt></ruby>、<ruby>同僚<rt>どうりょう</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>食事<rt>しょくじ</rt></ruby> に <ruby>行<rt>い</rt></ruby>きます — Vendredi **soir**, après le travail, je vais dîner avec mes collègues.
- <ruby>毎週<rt>まいしゅう</rt></ruby> <ruby>金曜日<rt>きんようび</rt></ruby> の <ruby>午後<rt>ごご</rt></ruby> は、<ruby>一週間<rt>いっしゅうかん</rt></ruby> の <ruby>片付<rt>かたづ</rt></ruby>け や <ruby>整理<rt>せいり</rt></ruby> を します — Chaque **vendredi** après-midi, je fais le rangement et le tri de la semaine.
- <ruby>今週<rt>こんしゅう</rt></ruby> の <ruby>金曜日<rt>きんようび</rt></ruby> は <ruby>有給<rt>ゆうきゅう</rt></ruby> を <ruby>取<rt>と</rt></ruby>って、<ruby>3<rt>さん</rt></ruby> <ruby>連休<rt>れんきゅう</rt></ruby> に する <ruby>予定<rt>よてい</rt></ruby> です — Je prévois de prendre un congé payé ce **vendredi** de cette semaine pour faire un week-end de 3 jours.

### n5_v_634 → v_634 · 休み

**Statut** : décision validée

- **A2-04-D0946** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0947** (decision, senses) : Un seul sens : la fiche décrit une seule notion, la période pendant laquelle on ne travaille ou n'étudie pas (« une période de pause, un jour de congé, les vacances scolaires ou professionnelles »). Pause, congé et vacances en rendent la durée variable, comme montre et horloge pour 時計 ; ce sont des traductions, non des sens. Catégorie : temps › moments et périodes (niveau 2), la fiche couvrant à la fois l'école et le travail ; ni éducation › vacances scolaires, ni travail › congés ne conviennent seuls. Type concept_abstrait, comme les saisons (lot 07). — avant `["Repos","Vacances","Congé","Jour férié","Pause"]` → après `"un seul sens"`
- **A2-04-D0948** (decision, sens 1 · linguistic_functions) : Pas de fonction deictique (A7) : une période de repos en général, sans repérage par rapport au moment de l'énonciation. — avant `null` → après `[]`
- **A2-04-D0949** (abandon, senses) : La fiche parle d'« un jour de congé », non d'un jour férié : cas particulier, couvert par « Congé ». — avant `["Jour férié"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 休み · やすみ · yasumi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › repos |
| sens | Repos ; Vacances ; Congé ; Jour férié ; Pause |
| nuance | **Nom** (dérivé du verbe *yasumu* 休む, se reposer) désignant une période de pause, un jour de congé, les vacances scolaires ou professionnelles. |
| particules |  |
| furigana | <ruby>休<rt>やす</rt></ruby>み |
| exemple | あした は **<ruby>休<rt>やす</rt></ruby>み** です 。 — Demain est un jour de **repos** (congé). |

**Mécanique**

- word : `"休み"`
- readings : `[{"kana":"やすみ","romaji":"yasumi","furigana":"<ruby>休<rt>やす</rt></ruby>み","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Dérivé du verbe 休む, se reposer."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Repos** (Pause, Congé, Vacances) | temps › moments_periodes | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>明日<rt>あした</rt></ruby> は <ruby>会社<rt>かいしゃ</rt></ruby> の <ruby>休み<rt>やすみ</rt></ruby> です — Demain est un jour de **repos** de l'entreprise.
- 「<ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>日曜日<rt>にちようび</rt></ruby> は <ruby>休み<rt>やすみ</rt></ruby> です か」「はい、休み です」 — « Est-ce que le dimanche de la semaine prochaine est un jour de **congé** ? » « Oui, c'est un jour de **repos** ('de congé'). »
- <ruby>夏<rt>なつ</rt></ruby> の <ruby>休み<rt>やすみ</rt></ruby> に <ruby>国<rt>くに</rt></ruby> へ <ruby>帰<rt>かえ</rt></ruby>ります — Je retourne dans mon pays pendant les **vacances** d'été.

### n5_v_663 → v_663 · 後

**Statut** : décision validée

- **A2-04-D0950** (decision, tags) : lieu_hotel (ancienne catégorie temps_calendrier) écarté : mot de temps d'usage général. Pouvoir l'employer à l'hôtel (horaires, réservation) ne le rend pas caractéristique du contexte hôtelier (critère des tags de lieu du lot 02). — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0951** (decision, senses) : Trois sens. Deux sont documentés par la description de la fiche (« ce qui vient après dans le temps ou ce qui se trouve à l'arrière ») : un moment et une position, deux référents, deux catégories, deux types, comme 前 et 先 (lot 10). Le troisième, « Le reste », n'est attesté que par les traductions de la fiche : il est conservé comme sens candidat (voir D0953). Les particules de la source (で, に) vont au sens temporel, que la fiche illustre par あとで. Révision 5.14b. — avant `["Après","Plus tard","Derrière","Le reste"]` → après `["S1 Après, plus tard (temps)","S2 Derrière (espace)","S3 Le reste (sens candidat)"]`
- **A2-04-D0952** (decision, sens 1 · linguistic_functions) : Fonction deictique selon l'addendum A7, axe du temps. La fiche donne « Plus tard » parmi les traductions du sens et dit que あと est « souvent utilisé avec la particule de (あとで) pour signifier plus tard » : cet emploi, repéré par rapport au moment où l'on parle, fait partie intégrante du sens tel qu'il est modélisé (A7, §4) ; il n'est ni marginal ni une simple traduction contextuelle. L'autre emploi, la postériorité par rapport à un repère quelconque (un événement, une action), n'est pas déictique : il est décrit dans la nuance. La référence est A7, §4 (sens à plusieurs emplois : la fonction est attribuée dès que l'emploi déictique fait partie intégrante du sens modélisé) ; le §3.2, qui traite de l'anaphore, ne s'applique pas ici. Révision 5.14b : la version précédente refusait la fonction tout en gardant « Plus tard » dans le sens, ce qui était incohérent. — avant `null` → après `["deictique"]`
- **A2-04-D0953** (decision, sens 3 · category) : Sens candidat, à arbitrer. « Le reste » figure dans les traductions de la source ; sa description (nuance) ne le mentionne pas, mais cette absence ne suffit pas à l'écarter. C'est un troisième référent (ce qui reste d'un tout), distinct d'un moment et d'une position : il ne peut pas être une traduction des deux autres sens. Catégorie et type tirés du seul libellé, sans information extérieure : nombres et quantification › totalité et partie › reste ; concept_abstrait. Aucune nuance, aucun exemple, aucune particule n'est ajouté. Révision 5.14b : la version précédente l'abandonnait. — avant `null` → après `"nombres_quantification › totalite_partie › reste"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 後 · あと · ato |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | temps_calendrier › temps |
| sens | Après ; Plus tard ; Derrière ; Le reste |
| nuance | **Nom / postposition** temporel ou spatial désignant ce qui vient après dans le temps ou ce qui se trouve à l'arrière. Souvent utilisé avec la particule *de* (あとで) pour signifier « plus tard / après avoir fait... ». |
| particules | で に |
| furigana | <ruby>後<rt>あと</rt></ruby> |
| exemple | しごと の **<ruby>後<rt>あと</rt></ruby>** で えき へ いき ます 。 — Je vais à la gare **après** le travail. |

**Mécanique**

- word : `"後"`
- readings : `[{"kana":"あと","romaji":"ato","furigana":"<ruby>後<rt>あと</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Après** (Plus tard) | temps › chronologie › avant_apres | concept_abstrait | grammatical : deictique ; particules で に | Ce qui vient après un événement ou une action. あとで : plus tard, par rapport au moment où l'on parle. |
| 2 | **Derrière** | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu |  |  |
| 3 | **Le reste** | nombres_quantification › totalite_partie › reste | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>仕事<rt>しごと</rt></ruby> の <ruby>後<rt>あと</rt></ruby> で、<ruby>友達<rt>ともだち</rt></ruby> と コーヒー を <ruby>飲<rt>の</rt></ruby>みます — Je bois un café avec un ami **après** le travail.
- 「<ruby>昼御飯<rt>ひるごはん</rt></ruby> の <ruby>後<rt>あと</rt></ruby> で、くすり を <ruby>飲<rt>の</rt></ruby>んで ください」 — « Veuillez prendre le médicament **après** le déjeuner. »
- <ruby>映画<rt>えいが</rt></ruby> が <ruby>終<rt>お</rt></ruby>わった <ruby>後<rt>あと</rt></ruby>、みんな で <ruby>感想<rt>かんそう</rt></ruby> を <ruby>言<rt>い</rt></ruby>いました — **Après** que le film s'est terminé, tout le monde a partagé ses impressions.
