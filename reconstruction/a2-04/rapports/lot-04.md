# Lot lot-04 · Ville, transports et déplacements

Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.

## Autres entrées

### n5_v_53 → v_53 · 歩く

**Statut** : PROPOSITION, non validée

- **A2-04-D0342** (abandon, senses) : Pas équivalent : se promener se dit 散歩する. — avant `["Se promener à pied"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 歩く · あるく · aruku |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Marcher ; Se promener à pied |
| nuance | Verbe godan exprimant l'action de se déplacer à pied. Très courant pour parler de la marche au quotidien. |
| particules | を に |
| furigana | <ruby>歩<rt>ある</rt></ruby>く |
| exemple | <ruby>毎日<rt>まいにち</rt></ruby> <ruby>駅<rt>えき</rt></ruby> まで <ruby>歩<rt>ある</rt></ruby>きます 。 — Je **marche** jusqu'à la gare tous les jours. |

**Mécanique**

- word : `"歩く"`
- readings : `[{"kana":"あるく","romaji":"aruku","furigana":"<ruby>歩<rt>ある</rt></ruby>く","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"駅まで歩く : aller à pied jusqu'à la gare."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Marcher** | espace_proprietes_spatiales › mouvement_deplacement | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>公園<rt>こうえん</rt></ruby> の <ruby>中<rt>なか</rt></ruby> を <ruby>歩<rt>ある</rt></ruby>いて います — Je **marche** dans le parc tous les matins.
- <ruby>駅<rt>えき</rt></ruby> から <ruby>家<rt>いえ</rt></ruby> まで <ruby>十<rt>じゅう</rt></ruby><ruby>分<rt>ぷん</rt></ruby> <ruby>歩<rt>ある</rt></ruby>きます — Je **marche** dix minutes de la gare à la maison.
- <ruby>道<rt>みち</rt></ruby> が <ruby>混<rt>こ</rt></ruby>んで いる ので、<ruby>歩<rt>ある</rt></ruby>いた <ruby>方<rt>ほう</rt></ruby> が <ruby>早<rt>はや</rt></ruby>い です — La route est encombrée, il est donc plus rapide de **marcher**.

### n5_v_63 → v_63 · 降りる

**Statut** : PROPOSITION, non validée

- **A2-04-D0347** (decision, tags) : Aucun candidat hérité ; lieu_gare ajouté : Vocabulaire d'action propre à la gare (acheter un billet, trouver le bon quai, changer de ligne), 電車を降りる (descendre du train), à la gare où l'on descend. — avant `[]` → après `["lieu_gare"]`
- **A2-04-D0348** (decision, writings) : 下りる, documentée par la nuance de la source, est une autre graphie du même mot (おりる), sans changement de forme lexicale : ajoutée à writings. — avant `null` → après `["下りる"]`
- **A2-04-D0349** (abandon, senses) : Repris dans la nuance. — avant `["Sortir (d'un véhicule)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 降りる · おりる · oriru |
| type, group | verbe ichidan · ru |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Descendre ; Sortir (d'un véhicule) |
| nuance | Verbe ichidan désignant l'action de descendre d'un lieu surélevé ou d'un moyen de transport (train, bus, etc.). S'écrit aussi <ruby>下<rt>お</rt></ruby>りる (oriru). |
| particules | を から |
| furigana | <ruby>降<rt>お</rt></ruby>りる |
| exemple | <ruby>次<rt>つぎ</rt></ruby> の <ruby>駅<rt>えき</rt></ruby> で <ruby>電車<rt>でんしゃ</rt></ruby> を <ruby>降<rt>お</rt></ruby>ります 。 — Je **descends** du train à la prochaine gare. |

**Mécanique**

- word : `"降りる"`
- readings : `[{"kana":"おりる","romaji":"oriru","furigana":"<ruby>降<rt>お</rt></ruby>りる","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"ru"`

**Proposition**

- writings : `[{"form":"下りる","furigana":"<ruby>下<rt>お</rt></ruby>りる"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Descendre d'un véhicule (電車を降りる) ou d'un lieu en hauteur ; 下りる s'emploie plutôt pour un escalier, une pente."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Descendre** | espace_proprietes_spatiales › mouvement_deplacement › monter_descendre | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>次<rt>つぎ</rt></ruby> の <ruby>駅<rt>えき</rt></ruby> で <ruby>電車<rt>でんしゃ</rt></ruby> を <ruby>降<rt>お</rt></ruby>ります — Je **descends** du train à la prochaine gare.
- タクシー から <ruby>降<rt>お</rt></ruby>りる <ruby>時<rt>とき</rt></ruby>、<ruby>忘れ物<rt>わすれもの</rt></ruby> に <ruby>気<rt>き</rt></ruby>をつけて ください — En **descendant** du taxi, faites attention de ne rien oublier.
- <ruby>階段<rt>かいだん</rt></ruby> を <ruby>使<rt>つか</rt></ruby>って <ruby>上<rt>うえ</rt></ruby> から <ruby>下<rt>した</rt></ruby> へ <ruby>降<rt>お</rt></ruby>りました — J'ai **descendu** du haut vers le bas en utilisant les escaliers.

### n5_v_146 → v_146 · 郵便局

**Statut** : PROPOSITION, non validée

- **A2-04-D0312** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 郵便局 · ゆうびんきょく · yuubinkyoku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › batiments |
| sens | Bureau de poste ; La poste |
| nuance | Nom composé de <ruby>郵便<rt>ゆうびん</rt></ruby> (yuubin, courrier) et <ruby>局<rt>きょく</rt></ruby> (kyoku, bureau). Au Japon, les bureaux de poste et les boîtes aux lettres sont reconnaissables à leur couleur rouge vif et au symbole 〒. |
| particules |  |
| furigana | <ruby>郵<rt>ゆう</rt></ruby><ruby>便<rt>びん</rt></ruby><ruby>局<rt>きょく</rt></ruby> |
| exemple | <ruby>小包<rt>こづつみ</rt></ruby> を <ruby>送<rt>おく</rt></ruby>る ため に <ruby>郵便局<rt>ゆうびんきょく</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます 。 — Je vais au **bureau de poste** pour envoyer un colis. |

**Mécanique**

- word : `"郵便局"`
- readings : `[{"kana":"ゆうびんきょく","romaji":"yuubinkyoku","furigana":"<ruby>郵<rt>ゆう</rt></ruby><ruby>便<rt>びん</rt></ruby><ruby>局<rt>きょく</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Bureau de poste** (La poste) | communication_langage › communication › transmission | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>国<rt>くに</rt></ruby> の <ruby>家族<rt>かぞく</rt></ruby> に <ruby>荷物<rt>にもつ</rt></ruby> を <ruby>送<rt>おく</rt></ruby>る ため に、<ruby>郵便局<rt>ゆうびんきょく</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きました — Je suis allé au **bureau de poste** pour envoyer un colis à ma famille au pays.
- <ruby>郵便局<rt>ゆうびんきょく</rt></ruby> で <ruby>切手<rt>きって</rt></ruby> を <ruby>買<rt>か</rt></ruby>って、<ruby>封筒<rt>ふうとう</rt></ruby> に <ruby>貼<rt>は</rt></ruby>りました — J'ai acheté des timbres au **bureau de poste** et je les ai collés sur l'enveloppe.
- この <ruby>近<rt>ちか</rt></ruby>く に <ruby>郵便局<rt>ゆうびんきょく</rt></ruby> が ある ので、とても <ruby>便利<rt>べんり</rt></ruby> です — Il y a un **bureau de poste** près d'ici, c'est très pratique.

### n5_v_147 → v_147 · タクシー

**Statut** : PROPOSITION, non validée

- **A2-04-D0323** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | タクシー · たくしー · takushii |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › transports_publics |
| sens | Taxi ;  |
| nuance | Emprunt à l'anglais 'taxi' écrit en katakana. Comme il s'agit d'un véhicule, on utilise le compteur <ruby>台<rt>だい</rt></ruby> (dai) pour le compter. Note culturelle : les portes arrière des taxis japonais s'ouvrent et se ferment automatiquement, il ne faut pas essayer de les manipuler soi-même ! |
| particules |  |
| furigana | タクシー |
| exemple | <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>って いる ので 、<ruby>駅<rt>えき</rt></ruby> まで タクシー に <ruby>乗<rt>の</rt></ruby>ります 。 — Il pleut, alors je prends un **taxi** pour aller à la gare. |

**Mécanique**

- word : `"タクシー"`
- readings : `[{"kana":"たくしー","romaji":"takushii","furigana":"タクシー","default":true,"note":null}]`
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
| 1 | **Taxi** | transport_mobilite › transport_terrestre › transport_routier | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>っていた ので、<ruby>駅<rt>えき</rt></ruby> まで タクシー を <ruby>利用<rt>りよう</rt></ruby>しました — Comme il pleuvait, j'ai pris un **taxi** jusqu'à la gare.
- <ruby>大<rt>おお</rt></ruby>きな <ruby>荷物<rt>にもつ</rt></ruby> が たくさん あった ので、ホテル の <ruby>前<rt>まえ</rt></ruby> から タクシー に <ruby>乗<rt>の</rt></ruby>りました — Comme j'avais beaucoup de gros bagages, j'ai pris un **taxi** devant l'hôtel.
- <ruby>終電<rt>しゅうでん</rt></ruby> に <ruby>間<rt>ま</rt></ruby>に<ruby>合<rt>あ</rt></ruby>わなかったので、<ruby>家<rt>いえ</rt></ruby> まで タクシー で <ruby>帰<rt>かえ</rt></ruby>りました — Je n'ai pas pu attraper le dernier train, alors je suis rentré chez moi en **taxi**.

### n5_v_148 → v_148 · バス

**Statut** : PROPOSITION, non validée

- **A2-04-D0322** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. Le bus relève de son propre arrêt (バス停), pas de la gare ferroviaire. — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | バス · ばす · basu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › transports_publics |
| sens | Bus ; Autobus |
| nuance | Emprunt à l'anglais 'bus' écrit en katakana. Comme pour le taxi et la voiture, on utilise le compteur <ruby>台<rt>だい</rt></ruby> (dai) pour le dénombrer. Pour dire 'prendre le bus', on utilise le verbe <ruby>乗る<rt>のる</rt></ruby> (basu ni noru), et un arrêt de bus se dit <ruby>バス停<rt>ばすてい</rt></ruby> (basutei). |
| particules |  |
| furigana | バス |
| exemple | <ruby>毎朝<rt>まいあさ</rt></ruby> 、<ruby>会社<rt>かいしゃ</rt></ruby> まで バス で <ruby>通<rt>かよ</rt></ruby>っています 。 — Tous les matins, je me rends à l'entreprise en **bus**. |

**Mécanique**

- word : `"バス"`
- readings : `[{"kana":"ばす","romaji":"basu","furigana":"バス","default":true,"note":null}]`
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
| 1 | **Bus** (Autobus) | transport_mobilite › transport_terrestre › bus | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>会社<rt>かいしゃ</rt></ruby> へ <ruby>行<rt>い</rt></ruby>く ため に バス に <ruby>乗<rt>の</rt></ruby>ります — Tous les matins, je prends le **bus** pour aller au travail.
- この <ruby>停留所<rt>ていりゅうじょ</rt></ruby> から <ruby>市役所<rt>しやくしょ</rt></ruby> まで <ruby>行<rt>い</rt></ruby>く バス が <ruby>出<rt>で</rt></ruby>ています — Il y a un **bus** qui part de cet arrêt pour aller à la mairie.
- <ruby>一<rt>い</rt><ruby>日<rt>にち</rt></ruby> <ruby>乗車券<rt>じょうしゃけん</rt></ruby> を <ruby>使<rt>つか</rt></ruby>う と、バス に <ruby>何度<rt>なんど</rt></ruby> でも <ruby>乗<rt>の</rt></ruby>れて <ruby>便利<rt>べんり</rt></ruby> です — C'est pratique d'utiliser un ticket journalier car on peut monter dans le **bus** autant de fois qu'on le souhaite.

### n5_v_149 → v_149 · 乗る

**Statut** : PROPOSITION, non validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 乗る · のる · noru |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | transports › mouvement_deplacement |
| sens | Prendre (un transport) ; Monter dans |
| nuance | Verbe godan utilisé pour monter à bord d'un véhicule (train, vélo, bus, voiture). Attention à la grammaire : il s'utilise TOUJOURS avec la particule に (ni) juste après le moyen de transport choisi. Son opposé exact est <ruby>降りる<rt>おりる</rt></ruby> (oriru, descendre d'un véhicule). |
| particules | に |
| furigana | <ruby>乗<rt>の</rt></ruby>る |
| exemple | <ruby>明日<rt>あした</rt></ruby> の <ruby>朝<rt>あさ</rt></ruby> 、<ruby>新幹線<rt>しんかんせん</rt></ruby> に <ruby>乗<rt>の</rt></ruby>ります 。 — Demain matin, je **monte dans** le Shinkansen. |

**Mécanique**

- word : `"乗る"`
- readings : `[{"kana":"のる","romaji":"noru","furigana":"<ruby>乗<rt>の</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Toujours avec に : 電車に乗る, prendre le train."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Prendre (un transport)** (Monter dans) | transport_mobilite › utilisation_des_transports | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>朝<rt>あさ</rt></ruby>、<ruby>家<rt>いえ</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> から バス に <ruby>乗<rt>の</rt></ruby>って <ruby>学校<rt>gakkou</rt></ruby> に <ruby>向<rt>む</rt></ruby>かいます — Le matin, je **monte dans** le bus devant chez moi pour me rendre à l'école.
- <ruby>電車<rt>でんしゃ</rt></ruby> に <ruby>乗<rt>の</rt></ruby>る <ruby>前<rt>まえ</rt></ruby> に、<ruby>自動券売機<rt>じどうけんばいき</rt></ruby> で <ruby>切符<rt>きっぷ</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました — Avant de **monter dans** le train, j'ai acheté un billet au distributeur automatique.
- たまには <ruby>自転車<rt>じてんしゃ</rt></ruby> ではなく、<ruby>遠<rt>とお</rt></ruby>く の <ruby>電車<rt>でんしゃ</rt></ruby> に <ruby>乗<rt>の</rt></ruby>って <ruby>旅行<rt>りょこう</rt></ruby> したい です — De temps en temps, je ne veux pas faire de vélo, mais **monter dans** un train lointain pour voyager.

### n5_v_150 → v_150 · 出かける

**Statut** : PROPOSITION, non validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 出かける · でかける · dekakeru |
| type, group | verbe ichidan · ru |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Sortir ; Partir (de chez soi) |
| nuance | Verbe ichidan désignant l'action de quitter son domicile avec un but précis (loisirs, travail, courses). Contrairement au verbe simple <ruby>出る<rt>でる</rt></ruby> (deru, sortir d'une pièce ou d'un lieu), 'dekakeru' implique une absence plus longue et un déplacement à l'extérieur. |
| particules | に へ |
| furigana | <ruby>出<rt>で</rt></ruby>かける |
| exemple | <ruby>週末<rt>しゅうまつ</rt></ruby> に <ruby>友達<rt>ともだち</rt></ruby> と <ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby> に <ruby>出<rt>で</rt></ruby>かけます 。 — Je **sors** faire des courses avec un ami ce week-end. |

**Mécanique**

- word : `"出かける"`
- readings : `[{"kana":"でかける","romaji":"dekakeru","furigana":"<ruby>出<rt>で</rt></ruby>かける","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"ru"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Quitter son domicile pour aller quelque part ; sortir d'un lieu se dit 出る."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sortir (de chez soi)** (Partir) | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>週末<rt>しゅうまつ</rt></ruby> は <ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby> に <ruby>街<rt>まち</rt></ruby> へ <ruby>出<rt>で</rt></ruby>かける <ruby>予定<rt>よてい</rt></ruby> です — Ce week-end, j'ai l'intention de **sortir** en ville avec un ami.
- <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>りそう な ので、<ruby>出<rt>で</rt></ruby>かける <ruby>時<rt>とき</rt></ruby> に 傘 を <ruby>持<rt>も</rt></ruby>って 行きます — Comme il va probablement pleuvoir, je prendrai un parapluie en **sortant**.
- <ruby>朝<rt>あさ</rt></ruby> <ruby>早<rt>はや</rt></ruby>く に <ruby>家<rt>いえ</rt></ruby> を <ruby>出<rt>で</rt></ruby>かけて、<ruby>一日中<rt>いちにちじゅう</rt></ruby> <ruby>観光<rt>かんこう</rt></ruby> を しました — Je suis **sorti** de chez moi tôt le matin et j'ai fait du tourisme toute la journée.

### n5_v_151 → v_151 · 地下鉄

**Statut** : PROPOSITION, non validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 地下鉄 · ちかてつ · chikatetsu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › transports_publics |
| sens | Métro ;  |
| nuance | Nom désignant le métro souterrain. Son étymologie littérale est 'le chemin de fer <ruby>鉄<rt>てつ</rt></ruby> (tetsu) sous <ruby>下<rt>か</rt></ruby> (ka) la terre <ruby>地<rt>ち</rt></ruby> (chi)'. Comme il s'agit d'un moyen de transport, on utilise le suffixe de comptage <ruby>台<rt>だい</rt></ruby> (dai) pour dénombrer ses rames. |
| particules |  |
| furigana | <ruby>地<rt>ち</rt></ruby><ruby>下<rt>か</rt></ruby><ruby>鉄<rt>てつ</rt></ruby> |
| exemple | <ruby>東京<rt>とうきょう</rt></ruby> の <ruby>地下鉄<rt>ちかてつ</rt></ruby> は とても <ruby>便利<rt>べんり</rt></ruby> です 。 — Le **métro** de Tokyo est très pratique. |

**Mécanique**

- word : `"地下鉄"`
- readings : `[{"kana":"ちかてつ","romaji":"chikatetsu","furigana":"<ruby>地<rt>ち</rt></ruby><ruby>下<rt>か</rt></ruby><ruby>鉄<rt>てつ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Métro** | transport_mobilite › transport_ferroviaire › metro | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>東京<rt>とうきょう</rt></ruby> の <ruby>地下鉄<rt>ちかてつ</rt></ruby> は とても <ruby>便利<rt>べんり</rt></ruby> で、どこ へ 行く の も 簡単 です — Le **métro** de Tokyo est très pratique et il est facile d'aller n'importe où.
- <ruby>朝<rt>あさ</rt></ruby> の <ruby>通勤<rt>つうきん</rt></ruby> <ruby>時間<rt>じかん</rt></ruby> は、<ruby>地下鉄<rt>ちかてつ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> が 非常に 混雑 します — Pendant les heures de pointe du matin, l'intérieur du **métro** est extrêmement bondé.
- 最寄<rt>もよ</rt></ruby>り の <ruby>駅<rt>えき</rt></ruby> から <ruby>地下鉄<rt>ちかてつ</rt></ruby> に 乗って、美術館 へ 行きました — Je suis monté dans le **métro** à la gare la plus proche pour aller au musée d'art.

### n5_v_152 → v_152 · 来る

**Statut** : PROPOSITION, non validée

- **A2-04-D0333** (abandon, senses) : « Arriver » relève de 着く ; le second est repris dans la nuance. — avant `["Arriver","Se rendre vers (le locuteur)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 来る · くる · kuru |
| type, group | verbe irrégulier · irrégulier |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Venir ; Arriver ; Se rendre vers (le locuteur) |
| nuance | Verbe irrégulier unique (groupe 3) indiquant un mouvement vers le locuteur. Attention aux changements de lecture majeurs de son kanji selon sa conjugaison : il se lit 'ku' à la forme d'origine, 'ki' à la forme polie, et 'ko' à la forme négative. |
| particules | に へ を |
| furigana | <ruby>来<rt>く</rt></ruby>る |
| exemple | <ruby>明日<rt>あした</rt></ruby> 、<ruby>私<rt>わたし</rt></ruby> の <ruby>家<rt>いえ</rt></ruby> に <ruby>友達<rt>ともだち</rt></ruby> が <ruby>来<rt>き</rt></ruby>ます 。 — Demain, un ami **vient** chez moi. |

**Mécanique**

- word : `"来る"`
- readings : `[{"kana":"くる","romaji":"kuru","furigana":"<ruby>来<rt>く</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"irrégulier"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Mouvement vers le locuteur. Verbe irrégulier : le kanji se lit く, き ou こ selon la forme (来る, 来ます, 来ない)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Venir** | espace_proprietes_spatiales › mouvement_deplacement › aller_venir | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- 明日<rt>あした</rt></ruby>、私<rt>わたし</rt></ruby> の 家<rt>いえ</rt></ruby> に 友達<rt>ともだち</rt></ruby> が 遊び に 来ます — Demain, un ami **vient** chez moi pour s'amuser.
- 日本<rt>にほん</rt></ruby> に 来<rt>き</rt></ruby>て から もう すぐ 一年<rt>いちねん</rt></ruby> に なります — Bientôt un an se sera écoulé depuis que je suis **venu** au Japon.
- 冬<rt>ふゆ</rt></ruby> が 近<rt>ちか</rt></ruby>づいて、冷<rt>つめ</rt></ruby>たい 風<rt>かぜ</rt></ruby> が 吹<rt>ふ</rt></ruby>く よう に なって きました — L'hiver approche et un vent froid a commencé à souffler (est **venu** à souffler).

### n5_v_154 → v_154 · 自動車

**Statut** : PROPOSITION, non validée

- **A2-04-D0326** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0327** (abandon, senses) : Redondant. — avant `["Véhicule automobile"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 自動車 · じどうしゃ · jidousha |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › vehicules |
| sens | Automobile ; Voiture ; Véhicule automobile |
| nuance | Nom désignant une automobile, plus formel que le mot en katakana クルマ (kuruma). Composé de <ruby>自<rt>じ</rt></ruby> (ji, soi-même), <ruby>動<rt>どう</rt></ruby> (dou, bouger) et <ruby>車<rt>しゃ</rt></ruby> (sha, véhicule/roue). |
| particules |  |
| furigana | <ruby>自<rt>じ</rt></ruby><ruby>動<rt>どう</rt></ruby><ruby>車<rt>しゃ</rt></ruby> |
| exemple | <ruby>父<rt>ちち</rt></ruby> は <ruby>新<rt>あたら</rt></ruby>しい <ruby>自動車<rt>じどうしゃ</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました 。 — Mon père a acheté une nouvelle **automobile**. |

**Mécanique**

- word : `"自動車"`
- readings : `[{"kana":"じどうしゃ","romaji":"jidousha","furigana":"<ruby>自<rt>じ</rt></ruby><ruby>動<rt>どう</rt></ruby><ruby>車<rt>しゃ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Terme formel ; dans la conversation : 車."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Automobile** (Voiture) | transport_mobilite › transport_terrestre › automobile | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>週末<rt>しゅうまつ</rt></ruby> に <ruby>家族<rt>かぞく</rt></ruby> で 自動車 を <ruby>使<rt>つか</rt></ruby>って <ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby> に 行きます — Le week-end, je vais faire des courses en famille en **voiture** (automobile).
- この <ruby>町<rt>まち</rt></ruby> は <ruby>道<rt>みち</rt></ruby> が <ruby>狭<rt>せま</rt></ruby>い ので、自動車 を <ruby>運転<rt>うんてん</rt></ruby> する とき は <ruby>注意<rt>ちゅうい</rt></ruby> が <ruby>必要<rt>ひつよう</rt></ruby> です — Comme les routes de cette ville sont étroites, il faut faire attention lorsqu'on conduit une **voiture**.
- トヨタ は <ruby>世界中<rt>せかいじゅう</rt></ruby> で <ruby>大人気<rt>だいにんき</rt></ruby> の 自動車 を たくさん <ruby>作<rt>つく</rt></ruby>っています — Toyota fabrique beaucoup de **voitures** qui sont extrêmement populaires dans le monde entier.

### n5_v_155 → v_155 · 自転車

**Statut** : PROPOSITION, non validée

- **A2-04-D0328** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 自転車 · じてんしゃ · jitensha |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › vehicules |
| sens | Vélo ; Bicyclette |
| nuance | Nom désignant une bicyclette. Composé de <ruby>自<rt>じ</rt></ruby> (ji, soi-même), <ruby>転<rt>てん</rt></ruby> (ten, rouler/tourner) et <ruby>車<rt>しゃ</rt></ruby> (sha, véhicule/roue). |
| particules |  |
| furigana | <ruby>自<rt>じ</rt></ruby><ruby>転<rt>てん</rt></ruby><ruby>車<rt>しゃ</rt></ruby> |
| exemple | <ruby>毎日<rt>まいにち</rt></ruby> <ruby>自転車<rt>じてんしゃ</rt></ruby> で <ruby>学校<rt>がっこう</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます 。 — Je vais à l'école en **vélo** tous les jours. |

**Mécanique**

- word : `"自転車"`
- readings : `[{"kana":"じてんしゃ","romaji":"jitensha","furigana":"<ruby>自<rt>じ</rt></ruby><ruby>転<rt>てん</rt></ruby><ruby>車<rt>しゃ</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Vélo** (Bicyclette) | transport_mobilite › transport_terrestre › deux_roues | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>自転車<rt>じてんしゃ</rt></ruby> に <ruby>乗<rt>の</rt></ruby>って <ruby>学校<rt>がっこう</rt></ruby> や <ruby>会社<rt>かいしゃ</rt></ruby> へ <ruby>通<rt>かよ</rt></ruby>う <ruby>人<rt>ひと</rt></ruby> が たくさん います — Tous les matins, il y a beaucoup de gens qui vont à l'école ou au travail en **vélo**.
- <ruby>今日<rt>きょう</rt></ruby> は <ruby>天気<rt>てんき</rt></ruby> が いい ので、自転車 で <ruby>近<rt>ちか</rt></ruby>く の <ruby>公園<rt>こうえん</rt></ruby> まで <ruby>出<rt>で</rt></ruby>かけました — Comme il fait beau aujourd'hui, je suis sorti jusqu'au parc voisin en **vélo**.
- 駅<rt>えき</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> に <ruby>大<rt>おお</rt></ruby>きな 自転車 <ruby>置<rt>お</rt></ruby>き<ruby>場<rt>ば</rt></ruby> が あって、とても <ruby>便利<rt>べんり</rt></ruby> です — Il y a un grand parking à **vélos** devant la gare, c'est très pratique.

### n5_v_156 → v_156 · 行く

**Statut** : PROPOSITION, non validée

- **A2-04-D0332** (abandon, senses) : Redondants avec « aller ». — avant `["Se rendre","Partir vers"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 行く · いく · iku |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Aller ; Se rendre ; Partir vers |
| nuance | Verbe godan fondamental exprimant un mouvement du locuteur vers un autre lieu souvent utilisé avec les particules に (ni), へ (he) ou まで (made). |
| particules | に へ まで |
| furigana | <ruby>行<rt>い</rt></ruby>く |
| exemple | <ruby>来週<rt>らいしゅう</rt></ruby> 、<ruby>京都<rt>きょうと</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます 。 — La semaine prochaine, je vais **aller** à Kyoto. |

**Mécanique**

- word : `"行く"`
- readings : `[{"kana":"いく","romaji":"iku","furigana":"<ruby>行<rt>い</rt></ruby>く","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Mouvement qui s'éloigne du locuteur, avec に, へ ou まで."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Aller** | espace_proprietes_spatiales › mouvement_deplacement › aller_venir | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>明日<rt>あした</rt></ruby>、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby> に <ruby>映画館<rt>えいがかん</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます — Demain, je **vais** au cinéma avec un ami.
- <ruby>夏休み<rt>なつやすみ</rt></ruby> に は、<ruby>家族<rt>かぞく</rt></ruby> で <ruby>北海道<rt>ほっかいどう</rt></ruby> へ <ruby>行<rt>い</rt></ruby>く <ruby>予定<rt>よてい</rt></ruby> です — Pendant les vacances d'été, j'ai l'intention d'**aller** à Hokkaidô en famille.
- お<ruby>金<rt>かね</rt></ruby> が あまり ない ので、<ruby>今年<rt>ことし</rt></ruby> は <ruby>海外<rt>かいがい</rt></ruby> へ <ruby>行<rt>い</rt></ruby>けません — Comme je n'ai pas beaucoup d'argent, je ne peux pas **aller** à l'étranger cette année.

### n5_v_157 → v_157 · 走る

**Statut** : PROPOSITION, non validée

- **A2-04-D0343** (decision, senses) : Un seul concept, se déplacer rapidement ; l'emploi pour un véhicule est le même verbe, décrit dans la nuance. — avant `["Courir","Galoper","Rouler (pour un véhicule)"]` → après `"un seul sens"`
- **A2-04-D0344** (abandon, senses) : Le premier n'est pas équivalent ; le second est repris dans la nuance. — avant `["Galoper","Rouler (pour un véhicule)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 走る · はしる · hashiru |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Courir ; Galoper ; Rouler (pour un véhicule) |
| nuance | Verbe désignant l'action de courir ou de circuler pour un véhicule. Attention au piège visuel : bien qu'il se termine par 'ru' précédé d'un son 'i', ce n'est PAS un verbe ichidan. C'est un verbe <ruby>五段<rt>ごだん</rt></ruby> (godan) irrégulier. Sa forme polie est donc <ruby>走ります<rt>はしります</rt></ruby> (hashirimasu) et non 'hashimasu'. |
| particules |  |
| furigana | <ruby>走<rt>はし</rt></ruby>る |
| exemple | <ruby>朝<rt>あさ</rt></ruby> 、<ruby>公園<rt>こうえん</rt></ruby> を <ruby>走<rt>はし</rt></ruby>ります 。 — Le matin, je **cours** dans le parc. |

**Mécanique**

- word : `"走る"`
- readings : `[{"kana":"はしる","romaji":"hashiru","furigana":"<ruby>走<rt>はし</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Se dit aussi d'un véhicule qui roule : 電車が走る. Verbe du groupe u malgré sa terminaison en -iru."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Courir** | espace_proprietes_spatiales › mouvement_deplacement | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>公園<rt>こうえん</rt></ruby> の <ruby>中<rt>なか</rt></ruby> を <ruby>30<rt>さんじゅっ</rt></ruby> <ruby>分<rt>ぷん</rt></ruby> ほど <ruby>走<rt>はし</rt></ruby>って います — Tous les matins, je **cours** pendant environ trente minutes dans le parc.
- <ruby>電車<rt>でんしゃ</rt></ruby> の <ruby>時間<rt>じかん</rt></ruby> に <ruby>遅<rt>おく</rt></ruby>れそうに なった ので、<ruby>駅<rt>えき</rt></ruby> まで <ruby>急<rt>きょ</rt></ruby>いで <ruby>走<rt>はし</rt></ruby>りました — Comme j'allais rater l'heure du train, j'ai **couru** en urgence jusqu'à la gare.
- <ruby>子供<rt>こども</rt></ruby> たち が グラウンド で <ruby>元気<rt>げんき</rt></ruby> に <ruby>走<rt>はし</rt></ruby>りまわって います — Les enfants **courent** et s'amusent joyeusement sur le terrain.

### n5_v_158 → v_158 · 車

**Statut** : PROPOSITION, non validée

- **A2-04-D0324** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0325** (abandon, senses) : « Véhicule » est trop large ; « roue » est un sens étymologique du kanji, ni attesté comme emploi courant ni N5 : non repris. — avant `["Véhicule","Roue"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 車 · くるま · kuruma |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › vehicules |
| sens | Voiture ; Véhicule ; Roue |
| nuance | Nom usuel et quotidien pour désigner une voiture, à privilégier à l'oral face au terme plus formel <ruby>自動車<rt>じどうしゃ</rt></ruby> (jidōsha). Comme pour tous les véhicules et appareils, on utilise obligatoirement le suffixe de comptage <ruby>台<rt>だい</rt></ruby> (dai) pour la dénombrer. |
| particules |  |
| furigana | <ruby>車<rt>くるま</rt></ruby> |
| exemple | わたしたち は <ruby>車<rt>くるま</rt></ruby> で <ruby>旅行<rt>りょこう</rt></ruby> に <ruby>出<rt>で</rt></ruby>かけます 。 — Nous **sortons** en voyage en voiture. |

**Mécanique**

- word : `"車"`
- readings : `[{"kana":"くるま","romaji":"kuruma","furigana":"<ruby>車<rt>くるま</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Terme courant ; plus formel : 自動車."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Voiture** | transport_mobilite › transport_terrestre › automobile | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>父<rt>ちち</rt></ruby> は <ruby>新<rt>あたら</rt></ruby>しい 車 を <ruby>買<rt>か</rt></ruby>った ので、<ruby>週末<rt>しゅうまつ</rt></ruby> に ドライブ に 行きます — Mon père a acheté une nouvelle **voiture**, alors nous allons faire un tour en voiture ce week-end.
- <ruby>道路<rt>どうろ</rt></ruby> が とても <ruby>混<rt>こ</rt></ruby>んでいて、車 が 全然 <ruby>進<rt>すす</rt></ruby>みません — La route est très encombrée et les **voitures** n'avancent pas du tout.
- お<ruby>酒<rt>さけ</rt></ruby> を <ruby>飲<rt>の</rt></ruby>んだら、<ruby>絶対<rt>ぜったい</rt></ruby> に 車 を <ruby>運転<rt>うんてん</rt></ruby>してはいけません — Si vous buvez de l'alcool, vous ne devez absolument pas conduire de **voiture**.

### n5_v_159 → v_159 · 電車

**Statut** : PROPOSITION, non validée

- **A2-04-D0321** (abandon, senses) : Le premier est repris dans la nuance ; le second n'est pas équivalent (路面電車). — avant `["Train électrique","Tramway"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 電車 · でんしゃ · densha |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › transports_publics |
| sens | Train électrique ; Train ; Tramway |
| nuance | Nom désignant spécifiquement un train de banlieue ou de ligne classique. Son étymologie littérale est 'véhicule <ruby>車<rt>しゃ</rt></ruby> (sha) électrique <ruby>電<rt>でん</rt></ruby> (den)'. Comme il s'agit d'un moyen de transport lourd, on utilise le suffixe de comptage <ruby>台<rt>だい</rt></ruby> (dai) pour dénombrer ses rames. |
| particules |  |
| furigana | <ruby>電<rt>でん</rt></ruby><ruby>車<rt>しゃ</rt></ruby> |
| exemple | まいにち <ruby>電車<rt>でんしゃ</rt></ruby> で <ruby>会社<rt>かいしゃ</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます 。 — Je vais à l'entreprise en **train** tous les jours. |

**Mécanique**

- word : `"電車"`
- readings : `[{"kana":"でんしゃ","romaji":"densha","furigana":"<ruby>電<rt>でん</rt></ruby><ruby>車<rt>しゃ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Littéralement « véhicule électrique » : le train de banlieue ou de ligne classique ; le tramway se dit 路面電車."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Train** | transport_mobilite › transport_ferroviaire › train | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby>、<ruby>会社<rt>かいしゃ</rt></ruby> へ <ruby>行<rt>い</rt></ruby>く ため に 電車 に <ruby>乗<rt>の</rt></ruby>ります — Tous les jours, je prends le **train** pour aller au travail.
- ラッシュアワー の 電車 は いつも たくさん の <ruby>人<rt>ひと</rt></ruby> で <ruby>混雑<rt>こんざつ</rt></ruby> して います — Les **trains** aux heures de pointe sont toujours bondés de monde.
- <ruby>窓<rt>まど</rt></ruby> の <ruby>外<rt>そと</rt></ruby> の <ruby>景色<rt>けしき</rt></ruby> を <ruby>見<rt>み</rt></ruby>ながら、電車 で <ruby>旅<rt>たび</rt></ruby> を する の が <ruby>好<rt>す</rt></ruby>き です — J'aime voyager en **train** tout en regardant le paysage par la fenêtre.

### n5_v_160 → v_160 · 飛ぶ

**Statut** : PROPOSITION, non validée

- **A2-04-D0353** (decision, senses) : Un seul sens pour 飛ぶ : voler dans les airs. — avant `["Voler","Sauter","Bondir"]` → après `"un seul sens"`
- **A2-04-D0354** (correction, senses) : Confusion de la source : « sauter, bondir » est le sens de 跳ぶ, même lecture (とぶ) mais autre graphie et autre sens. Ce n'est pas un sens de 飛ぶ ; non repris ici. — avant `["Sauter","Bondir"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 飛ぶ · とぶ · tobu |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Voler ; Sauter ; Bondir |
| nuance | Verbe godan désignant l'action de voler dans les airs (pour un oiseau, un avion) ou de sauter/bondir. |
| particules |  |
| furigana | <ruby>飛<rt>と</rt></ruby>ぶ |
| exemple | <ruby>空<rt>そら</rt></ruby> に <ruby>鳥<rt>とり</rt></ruby> が <ruby>飛<rt>と</rt></ruby>んで います 。 — Un oiseau **vole** dans le ciel. |

**Mécanique**

- word : `"飛ぶ"`
- readings : `[{"kana":"とぶ","romaji":"tobu","furigana":"<ruby>飛<rt>と</rt></ruby>ぶ","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Voler dans les airs (un oiseau, un avion)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Voler** | espace_proprietes_spatiales › mouvement_deplacement | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>空<rt>そら</rt></ruby> を <ruby>見<rt>み</rt></ruby>上げると、<ruby>鳥<rt>とり</rt></ruby> が <ruby>自由<rt>じゆう</rt></ruby> に 飛んで います — En levant les yeux vers le ciel, des oiseaux **volent** librement.
- <ruby>子供<rt>こども</rt></ruby> たち が <ruby>公園<rt>こうえん</rt></ruby> で 紙飛行機 を <ruby>作<rt>つく</rt></ruby>って 飛ばして います — Les enfants fabriquent des avions en papier et les font **voler** dans le parc.
- <ruby>風<rt>かぜ</rt></ruby> が <ruby>強<rt>つよ</rt></ruby>くて、<ruby>帽子<rt>ぼうし</rt></ruby> が <ruby>頭<rt>あたま</rt></ruby> から <ruby>飛<rt>と</rt></ruby>ばされてしまいました — Le vent était fort et mon chapeau s'est **envolé** de ma tête.

### n5_v_161 → v_161 · 飛行機

**Statut** : PROPOSITION, non validée

- **A2-04-D0329** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0330** (abandon, senses) : Terme technique. — avant `["Aéronef"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 飛行機 · ひこうき · hikouki |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › voyage_aerien |
| sens | Avion ; Aéronef |
| nuance | Nom désignant un avion. Son étymologie se décompose en 'machine <ruby>機<rt>き</rt></ruby> (ki) qui va <ruby>行<rt>こう</rt></ruby> (kō) en volant <ruby>飛<rt>ひ</rt></ruby> (hi)'. Comme pour tous les grands appareils mécaniques et véhicules, on utilise le suffixe de comptage <ruby>台<rt>だい</rt></ruby> (dai) pour le dénombrer. |
| particules |  |
| furigana | <ruby>飛<rt>ひ</rt></ruby><ruby>行<rt>こう</rt></ruby><ruby>機<rt>き</rt></ruby> |
| exemple | らいしゅう 、<ruby>飛行機<rt>ひこうき</rt></ruby> で フランス へ <ruby>行<rt>い</rt></ruby>きます 。 — La semaine prochaine, je vais en France en **avion**. |

**Mécanique**

- word : `"飛行機"`
- readings : `[{"kana":"ひこうき","romaji":"hikouki","furigana":"<ruby>飛<rt>ひ</rt></ruby><ruby>行<rt>こう</rt></ruby><ruby>機<rt>き</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Avion** | transport_mobilite › transport_aerien › avions | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>海外旅行<rt>かいがいりょこう</rt></ruby> の ため に、<ruby>今日<rt>きょう</rt></ruby> 飛行機 の <ruby>切符<rt>きっぷ</rt></ruby> を 予約しました — J'ai réservé aujourd'hui un billet d'**avion** pour mon voyage à l'étranger.
- <ruby>窓<rt>まど</rt></ruby> から <ruby>下<rt>した</rt></ruby> を <ruby>見<rt>み</rt></ruby>ると、雲 の <ruby>上<rt>うえ</rt></ruby> を 飛行機 が <ruby>進<rt>すす</rt></ruby>んで います — En regardant en bas par la hublot, l'**avion** avance au-dessus des nuages.
- <ruby>東京<rt>とうきょう</rt></ruby> から 札幌 まで 飛行機 で 約 <ruby>一<rt>いち</rt></ruby> <ruby>時間<rt>じかん</rt></ruby> 半 かかります — Il faut environ une heure et demie en **avion** pour aller de Tokyo à Sapporo.

### n5_v_162 → v_162 · 駅

**Statut** : PROPOSITION, non validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 駅 · えき · eki |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › transports |
| sens | Gare ; Station (de train, de métro) |
| nuance | Nom désignant une gare ferroviaire ou une station de métro. Le kanji actuel <ruby>駅<rt>えき</rt></ruby> (eki) est une simplification de sa forme ancienne qui comprenait la clé du cheval, rappelant que les gares d'origine étaient les relais de poste où l'on changeait de monture. |
| particules |  |
| furigana | <ruby>駅<rt>えき</rt></ruby> |
| exemple | わたし は <ruby>毎朝<rt>まいあさ</rt></ruby> <ruby>自転車<rt>じてんしゃ</rt></ruby> で <ruby>駅<rt>えき</rt></ruby> まで <ruby>行<rt>い</rt></ruby>きます 。 — Je vais à la **gare** à vélo tous les matins. |

**Mécanique**

- word : `"駅"`
- readings : `[{"kana":"えき","romaji":"eki","furigana":"<ruby>駅<rt>えき</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Gare de train ou station de métro."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Gare** (Station) | transport_mobilite › reseaux_infrastructures › gares | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby>、<ruby>会社<rt>かいしゃ</rt></ruby> へ <ruby>行<rt>い</rt></ruby>く ため に <ruby>朝<rt>あさ</rt></ruby> <ruby>早<rt>はや</rt></ruby>く に 駅 へ <ruby>歩<rt>ある</rt></ruby>いて 行きます — Tous les jours, je vais à pied **gare** (station) de bon matin pour aller au travail.
- <ruby>友<rt>とも</rt></ruby>だち と <ruby>約束<rt>やくそく</rt></ruby> した ので、<ruby>今週末<rt>こんしゅうまつ</rt></ruby> は 駅 の <ruby>前<rt>まえ</rt></ruby> で <ruby>待<rt>ま</rt></ruby>ち<ruby>合<rt>あ</rt></ruby>わせをします — Comme j'ai rendez-vous avec un ami, nous nous retrouverons devant la **gare** ce week-end.
- この <ruby>電車の<rt>でんしゃの</rt></ruby> 駅 は とても <ruby>大<rt>おお</rt></ruby>きくて、たくさんの <ruby>人<rt>ひと</rt></ruby> が <ruby>利用<rt>りよう</rt></ruby>して います — Cette station de **train** est très grande et beaucoup de gens l'utilisent.

### n5_v_213 → v_213 · 入る

**Statut** : PROPOSITION, non validée

- **A2-04-D0340** (decision, senses) : Un seul sens, « entrer ». « Être dedans » (入っている) est l'état qui résulte d'être entré, décrit dans la nuance. — avant `["Entrer","Pénétrer","Contenir","Entrer (dans un bain)"]` → après `"un seul sens"`
- **A2-04-D0341** (abandon, senses) : « Contenir » est une traduction trompeuse : avec 入る, c'est le contenu qui « est dedans », non le contenant qui contient ; « entrer dans un bain » est un emploi, repris dans la nuance. — avant `["Contenir","Entrer (dans un bain)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 入る · はいる · hairu |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Entrer ; Pénétrer ; Contenir ; Entrer (dans un bain) |
| nuance | Verbe <ruby>五段<rt>ごだん</rt></ruby> (godan) marquant l'action d'entrer dans un lieu, souvent associé à la particule に (ni). Bien qu'il se termine par iru/eru, c'est un verbe godan exceptionnel. |
| particules | に |
| furigana | <ruby>入<rt>はい</rt></ruby>る |
| exemple | くつ を <ruby>脱<rt>ぬ</rt></ruby>いで <ruby>部屋<rt>へや</rt></ruby> に **<ruby>入<rt>はい</rt></ruby>ります** 。 — Je retire mes chaussures et **entre** dans la pièce. |

**Mécanique**

- word : `"入る"`
- readings : `[{"kana":"はいる","romaji":"hairu","furigana":"<ruby>入<rt>はい</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Avec に : 部屋に入る, entrer dans la pièce ; お風呂に入る, prendre un bain. 入っている : être dedans (箱に何が入っていますか)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Entrer** (Pénétrer) | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>ってきた ので、<ruby>近<rt>ちか</rt></ruby>く の <ruby>喫茶店<rt>きっさてん</rt></ruby> に <ruby>入<rt>はい</rt></ruby>りました — Comme il a commencé à pleuvoir, je suis entré dans un café voisin.
- 靴<rt>くつ</rt></ruby> を 脱<rt>ぬ</rt></ruby>いで、<ruby>家<rt>いえ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に <ruby>入<rt>はい</rt></ruby>って ください — Veuillez enlever vos chaussures et entrer dans la maison.
- <ruby>来年<rt>らいねん</rt></ruby> から <ruby>新<rt>あたら</rt></ruby>しい <ruby>大学<rt>だいがく</rt></ruby> に <ruby>入<rt>はい</rt></ruby>る <ruby>予定<rt>よてい</rt></ruby> です — J'ai l'intention d'entrer dans une nouvelle université à partir de l'année prochaine.

### n5_v_215 → v_215 · 公園

**Statut** : PROPOSITION, non validée

- **A2-04-D0308** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 公園 · こうえん · kouen |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › loisirs |
| sens | Parc ; Jardin public |
| nuance | Nom composé de <ruby>公<rt>こう</rt></ruby> (kou - public) et de <ruby>園<rt>えん</rt></ruby> (en - jardin), désignant un parc public. Compteur spécifique : <ruby>個所<rt>かしょ</rt></ruby> (kasho) ou <ruby>つ<rt>つ</rt></ruby> (tsu). |
| particules |  |
| furigana | <ruby>公<rt>こう</rt></ruby><ruby>園<rt>えん</rt></ruby> |
| exemple | ひるやすみ に **<ruby>公園<rt>こうえん</rt></ruby>** を <ruby>散歩<rt>さんぽ</rt></ruby>します 。 — Je me promène dans le **parc** pendant la pause de midi. |

**Mécanique**

- word : `"公園"`
- readings : `[{"kana":"こうえん","romaji":"kouen","furigana":"<ruby>公<rt>こう</rt></ruby><ruby>園<rt>えん</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Parc** (Jardin public) | environnement_construit_espaces_humains › espaces_publics › parcs_amenages | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- 1 <ruby>日<rt>にち</rt></ruby> の <ruby>仕事<rt>しごと</rt></ruby> が <ruby>終<rt>お</rt></ruby>わった <ruby>後<rt>あと</rt></ruby>、<ruby>近所<rt>きんじょ</rt></ruby> の <ruby>公園<rt>こうえん</rt></ruby> を <ruby>散歩<rt>さんぽ</rt></ruby> します — Après une journée de travail, je me promène dans le parc du quartier.
- <ruby>週末<rt>しゅうまつ</rt></ruby> になると、<ruby>公園<rt>こうえん</rt></ruby> でたくさんの<ruby>家族<rt>かぞく</rt></ruby>がピクニックを<ruby>楽<rt>たの</rt></ruby>しんでいます — Quand le week-end arrive, de nombreuses familles profitent d'un pique-nique dans le parc.
- この <ruby>公園<rt>こうえん</rt></ruby> には<ruby>綺麗<rt>きれい</rt></ruby>な<ruby>花<rt>はな</rt></ruby>がたくさん<ruby>咲<rt>さ</rt></ruby>いていて、<ruby>空気<rt>くうき</rt></ruby>もおいしいです — Il y a beaucoup de belles fleurs qui poussent dans ce parc et l'air y est pur.

### n5_v_239 → v_239 · 交差点

**Statut** : PROPOSITION, non validée

- **A2-04-D0303** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0304** (abandon, senses) : Redondant. — avant `["Croisement"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 交差点 · こうさてん · kousaten |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › ville |
| sens | Carrefour ; Intersection ; Croisement |
| nuance | Nom composé de <ruby>交<rt>こう</rt></ruby> (croiser), <ruby>差<rt>さ</rt></ruby> (différence/interstice) et <ruby>点<rt>てん</rt></ruby> (point), désignant une intersection de routes. Compteur spécifique : <ruby>箇<rt>か</rt></ruby><ruby>所<rt>しょ</rt></ruby> (kasho) ou <ruby>つ<rt>つ</rt></ruby> (tsu). |
| particules |  |
| furigana | <ruby>交<rt>こう</rt></ruby><ruby>差<rt>さ</rt></ruby><ruby>点<rt>てん</rt></ruby> |
| exemple | あの **<ruby>交差点<rt>こうさてん</rt></ruby>** を <ruby>右<rt>みぎ</rt></ruby> に <ruby>曲<rt>ま</rt></ruby>がります 。 — Je tourne à droite à ce **carrefour**. |

**Mécanique**

- word : `"交差点"`
- readings : `[{"kana":"こうさてん","romaji":"kousaten","furigana":"<ruby>交<rt>こう</rt></ruby><ruby>差<rt>さ</rt></ruby><ruby>点<rt>てん</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Carrefour** (Intersection) | environnement_construit_espaces_humains › voirie › carrefours | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>信号<rt>しんごう</rt></ruby> が <ruby>青<rt>あお</rt></ruby> に なった ので、<ruby>交差点<rt>こうさてん</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>りました — Comme le feu est devenu vert, j'ai traversé le **carrefour**.
- あの <ruby>大<rt>おお</rt></ruby>きな <ruby>交差点<rt>こうさてん</rt></ruby> を <ruby>右<rt>みぎ</rt></ruby> に <ruby>曲<rt>ま</rt></ruby>がると、<ruby>駅<rt>えき</rt></ruby> が あります — Si vous tournez à droite à ce grand **carrefour**, il y a la gare.
- <ruby>朝<rt>あさ</rt></ruby> の <ruby>通勤<rt>つうきん</rt></ruby> の <ruby>時間帯<rt>じかんたい</rt></ruby> は、この <ruby>交差点<rt>こうさてん</rt></ruby> が とても <ruby>混雑<rt>こんざつ</rt></ruby> します — Ce **carrefour** est très encombré pendant les heures de pointe du matin.

### n5_v_240 → v_240 · 交番

**Statut** : PROPOSITION, non validée

- **A2-04-D0315** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0316** (abandon, senses) : Le premier est repris dans la nuance ; le second ne correspond à rien. — avant `["Commissariat de quartier (Japon)","Ilot de police"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 交番 · こうばん · kouban |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › batiments |
| sens | Poste de police ; Commissariat de quartier (Japon) ; Ilot de police |
| nuance | Nom composé de <ruby>交<rt>こう</rt></ruby> (alternance/roulement) et <ruby>番<rt>ばん</rt></ruby> (garde/poste), faisant référence au système de service posté des officiers dans ces petits postes de quartier japonais. Compteur spécifique : <ruby>箇<rt>か</rt></ruby><ruby>所<rt>しょ</rt></ruby> (kasho) ou <ruby>軒<rt>けん</rt></ruby> (ken). |
| particules |  |
| furigana | <ruby>交<rt>こう</rt></ruby><ruby>番<rt>ばん</rt></ruby> |
| exemple | <ruby>道<rt>みち</rt></ruby> が わからない ので 、**<ruby>交番<rt>こうばん</rt></ruby>** で <ruby>聞<rt>き</rt></ruby>きます 。 — Comme je ne connais pas le chemin, je demande au **poste de police**. |

**Mécanique**

- word : `"交番"`
- readings : `[{"kana":"こうばん","romaji":"kouban","furigana":"<ruby>交<rt>こう</rt></ruby><ruby>番<rt>ばん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le petit poste de police de quartier japonais, où l'on demande aussi son chemin ; le policier s'y appelle お巡りさん."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Poste de police** | droit_justice › application_de_la_loi › police | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>道<rt>みち</rt></ruby> が わからなくなった ので、<ruby>近<rt>ちか</rt></ruby>く の <ruby>交番<rt>こうばん</rt></ruby> で <ruby>警察官<rt>けいさつかん</rt></ruby> に <ruby>尋<rt>たず</rt></ruby>ねました — Comme je ne connaissais plus le chemin, j'ai demandé à un policier au **poste de police** (koban) le plus proche.
- <ruby>財布<rt>さいふ</rt></ruby> を <ruby>落<rt>お</rt></ruby>として しまった ので、<ruby>交番<rt>こうばん</rt></ruby> に <ruby>届<rt>とど</rt></ruby>けを <ruby>出<rt>だ</rt></ruby>しに 行きました — J'ai perdu mon portefeuille, alors je suis allé au **poste de police** pour faire une déclaration.
- <ruby>駅前<rt>えきまえ</rt></ruby> の <ruby>交番<rt>こうばん</rt></ruby> の <ruby>横<rt>よこ</rt></ruby> で <ruby>友達<rt>ともだち</rt></ruby> と <ruby>待<rt>ま</rt></ruby>ち<ruby>合<rt>あ</rt></ruby>わせを しています — Je donne rendez-vous à un ami à côté du **poste de police** devant la gare.

### n5_v_242 → v_242 · 図書館

**Statut** : PROPOSITION, non validée

- **A2-04-D0309** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0310** (decision, category) : Le registre n'a pas de catégorie de bibliothèque : rangée parmi les espaces publics collectifs, comme un service public de la ville. — avant `null` → après `"environnement_construit_espaces_humains › espaces_publics › espaces_collectifs"`
- **A2-04-D0311** (abandon, senses) : Terme voisin ; la précision est reprise dans la nuance. — avant `["Médiathèque (publique ou universitaire)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 図書館 · としょかん · toshokan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › loisirs |
| sens | Bibliothèque ; Médiathèque (publique ou universitaire) |
| nuance | Nom composé de <ruby>図書<rt>としょ</rt></ruby> (tosho - livres/ouvrages) et de <ruby>館<rt>かん</rt></ruby> (kan - bâtiment public), désignant une bibliothèque. Compteur spécifique : <ruby>軒<rt>けん</rt></ruby> (ken) ou <ruby>個所<rt>かしょ</rt></ruby> (kasho). |
| particules |  |
| furigana | <ruby>図<rt>と</rt></ruby><ruby>書<rt>しょ</rt></ruby><ruby>館<rt>かん</rt></ruby> |
| exemple | **<ruby>図書館<rt>としょかん</rt></ruby>** で ほんにん を よみます 。 — Je lis des livres à la **bibliothèque**. |

**Mécanique**

- word : `"図書館"`
- readings : `[{"kana":"としょかん","romaji":"toshokan","furigana":"<ruby>図<rt>と</rt></ruby><ruby>書<rt>しょ</rt></ruby><ruby>館<rt>かん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"La bibliothèque publique ou universitaire ; le meuble se dit 本棚."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bibliothèque** | environnement_construit_espaces_humains › espaces_publics › espaces_collectifs | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>静<rt>しず</rt></ruby>かな <ruby>環境<rt>かんきょう</rt></ruby> で <ruby>勉強<rt>べんきょう</rt></ruby> する ため に、<ruby>週末<rt>しゅうまつ</rt></ruby> は よく <ruby>図書館<rt>としょかん</rt></ruby> に <ruby>行<rt>い</rt></ruby>きます — Je vais souvent à la **bibliothèque** le week-end pour étudier dans un environnement calme.
- <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> の ため に、<ruby>図書館<rt>としょかん</rt></ruby> で <ruby>本<rt>ほん</rt></ruby> を 3 <ruby>冊<rt>さつ</rt></ruby> <ruby>借<rt>か</rt></ruby>りました — J'ai emprunté trois livres à la **bibliothèque** pour mon étude du japonais.
- <ruby>図書館<rt>としょかん</rt></ruby> の <ruby>中<rt>なか</rt></ruby> では、ほかの <ruby>人<rt>ひと</rt></ruby> の <ruby>迷惑<rt>めいわく</rt></ruby> に ならない ように <ruby>静<rt>しず</rt></ruby>かに しなければなりません — À l'intérieur de la **bibliothèque**, il faut rester silencieux pour ne pas déranger les autres.

### n5_v_244 → v_244 · 大使館

**Statut** : PROPOSITION, non validée

- **A2-04-D0317** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0318** (abandon, senses) : Redondant. — avant `["Représentation diplomatique"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 大使館 · たいしかん · taishikan |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › batiments |
| sens | Ambassade ; Représentation diplomatique |
| nuance | Nom composé de <ruby>大使<rt>たいし</rt></ruby> (taishi - ambassadeur) et de <ruby>館<rt>kan</rt></ruby> (<ruby>館<rt>かん</rt></ruby> - bâtiment), désignant une ambassade. Compteur spécifique : <ruby>軒<rt>けん</rt></ruby> (ken) ou <ruby>箇所<rt>かしょ</rt></ruby> (kasho). |
| particules |  |
| furigana | <ruby>大<rt>たい</rt></ruby><ruby>使<rt>し</rt></ruby><ruby>館<rt>かん</rt></ruby> |
| exemple | がいこく の **<ruby>大使館<rt>たいしかん</rt></ruby>** へ いきます 。 — Je vais à l'**ambassade** étrangère. |

**Mécanique**

- word : `"大使館"`
- readings : `[{"kana":"たいしかん","romaji":"taishikan","furigana":"<ruby>大<rt>たい</rt></ruby><ruby>使<rt>し</rt></ruby><ruby>館<rt>かん</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Ambassade** | politique_institutions_publiques › relations_internationales_diplomatie › ambassades | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>海外<rt>かいがい</rt></ruby> で パスポート を <ruby>失<rt>うしな</rt></ruby>ってしまった ので、<ruby>大使館<rt>たいしかん</rt></ruby> に <ruby>行<rt>い</rt></ruby>って <ruby>相談<rt>そうだん</rt></ruby>しました — Comme j'ai perdu mon passeport à l'étranger, je suis allé à l'**ambassade** pour en discuter.
- <ruby>来月<rt>らいげつ</rt></ruby> から の <ruby>留学<rt>りゅうがく</rt></ruby> の ビザ を <ruby>取得<rt>しゅとく</rt></ruby> する ため に、<ruby>大使館<rt>たいしかん</rt></ruby> で <ruby>手続き<rt>てつづき</rt></ruby> を します — Je fais les démarches à l'**ambassade** pour obtenir mon visa d'études à partir du mois prochain.
- あの <ruby>大通り<rt>おおどおり</rt></ruby> の <ruby>角<rt>かど</rt></ruby> に、<ruby>日本<rt>にほん</rt></ruby> の <ruby>大使館<rt>たいしかん</rt></ruby> の <ruby>建物<rt>たてもの</rt></ruby> が あります — Il y a le bâtiment de l'**ambassade** du Japon au coin de cette grande avenue.

### n5_v_246 → v_246 · 建物

**Statut** : PROPOSITION, non validée

- **A2-04-D0305** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0306** (correction, readings) : Les furigana de la source étaient ceux de la graphie 建て物, pas de la forme usuelle 建物. — avant `"<ruby>建<rt>た</rt></ruby>て<ruby>物<rt>もの</rt></ruby>"` → après `"<ruby>建<rt>たて</rt></ruby><ruby>物<rt>もの</rt></ruby>"`
- **A2-04-D0307** (abandon, senses) : Termes voisins ou soutenus ; non repris. — avant `["Construction","Édifice"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 建物 · たてもの · tatemono |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › batiments |
| sens | Bâtiment ; Immeuble ; Construction ; Édifice |
| nuance | Nom composé de <ruby>建<rt>た</rt></ruby>てる (tateru - construire/bâtir) et de <ruby>物<rt>もの</rt></ruby> (mono - chose), désignant tout type de construction architecturale ou d'immeuble. Compteur spécifique : <ruby>棟<rt>とう</rt></ruby> (tou) ou <ruby>軒<rt>けん</rt></ruby> (ken). |
| particules |  |
| furigana | <ruby>建<rt>た</rt></ruby>て<ruby>物<rt>もの</rt></ruby> |
| exemple | あの おおきい **<ruby>建物<rt>たてもの</rt></ruby>** は びょういん です 。 — Ce grand **bâtiment** est un hôpital. |

**Mécanique**

- word : `"建物"`
- grammatical_class : `"nom"`
- group : `"nom"`
- readings : **exception**, furigana incohérents avec la forme
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- readings : `[{"kana":"たてもの","romaji":"tatemono","furigana":"<ruby>建<rt>たて</rt></ruby><ruby>物<rt>もの</rt></ruby>","default":true,"note":null}]`
- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Bâtiment** (Immeuble) | environnement_construit_espaces_humains › batiments_constructions › batiments | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>駅<rt>えき</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> に、<ruby>高<rt>たか</rt></ruby>くて <ruby>立派<rt>りっぱ</rt></ruby>な <ruby>建物<rt>たてもの</rt></ruby> が たくさん <ruby>建<rt>た</rt></ruby>って います — Il y a beaucoup de **bâtiments** hauts et magnifiques devant la gare.
- この <ruby>建物<rt>たてもの</rt></ruby> は <ruby>歴史<rt>れきし</rt></ruby> が <ruby>古<rt>ふる</rt></ruby>く、とても <ruby>重要<rt>じゅうよう</rt></ruby>な <ruby>文化財<rt>ぶんかざい</rt></ruby> に 指定されて います — Ce **bâtiment** a une histoire ancienne et est désigné comme un bien culturel très important.
- <ruby>地震<rt>じしん</rt></ruby> が <ruby>起<rt>お</rt></ruby>きた とき は、あわてて <ruby>建物<rt>たてもの</rt></ruby> から <ruby>外<rt>そと</rt></ruby> へ <ruby>出<rt>で</rt></ruby>ない ように 注意して ください — Quand un tremblement de terre se produit, veuillez faire attention à ne pas sortir précipitamment du **bâtiment**.

### n5_v_249 → v_249 · 町

**Statut** : PROPOSITION, non validée

- **A2-04-D0293** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0294** (decision, senses) : Un seul concept, l'agglomération habitée ; « quartier » en rend la largeur, comme « jambe » pour 足. — avant `["Ville","Quartier","Bourg","Rue commerçante"]` → après `"un seul sens"`
- **A2-04-D0295** (abandon, senses) : « Bourg » est redondant ; « rue commerçante » est reprise dans la nuance (quartier animé). — avant `["Bourg","Rue commerçante"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 町 · まち · machi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › ville |
| sens | Ville ; Quartier ; Bourg ; Rue commerçante |
| nuance | Nom désignant une ville (souvent de taille moyenne ou petite par rapport à <ruby>市<rt>し</rt></ruby> - shi), un quartier ou une rue animée. Compteur spécifique : <ruby>つ<rt>つ</rt></ruby> (tsu) ou <ruby>箇所<rt>かしょ</rt></ruby> (kasho). |
| particules |  |
| furigana | <ruby>町<rt>まち</rt></ruby> |
| exemple | きょう は **<ruby>町<rt>まち</rt></ruby>** で かいもの を します 。 — Aujourd'hui, je fais des achats en **ville**. |

**Mécanique**

- word : `"町"`
- readings : `[{"kana":"まち","romaji":"machi","furigana":"<ruby>町<rt>まち</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_hotel

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Une ville, souvent petite ou moyenne (une grande ville administrative se dit 市), ou un quartier animé."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Ville** (Quartier) | territoires_lieux_geographiques › villes_localites › villes | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>私<rt>わたし</rt></ruby> が <ruby>住<rt>す</rt></ruby>んでいる 町 は、とても <ruby>静<rt>しず</rt></ruby>かで <ruby>空気<rt>くうき</rt></ruby> が きれいに です — La **ville** où j'habite est très calme et l'air y est pur.
- <ruby>週末<rt>しゅうまつ</rt></ruby> になると、<ruby>多<rt>おお</rt></ruby>くの <ruby>人<rt>ひと</rt></ruby> が <ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby> に 町 の <ruby>中心部<rt>ちゅうしんぶ</rt></ruby> へ <ruby>出<rt>で</rt></ruby>かけます — Le week-end venu, beaucoup de gens sortent dans le centre de la **ville** pour faire du shopping.
- この 町 には <ruby>古<rt>ふる</rt></ruby>い <ruby>歴史<rt>れきし</rt></ruby> の ある <ruby>神社<rt>じんじゃ</rt></ruby> や お<ruby>寺<rt>てら</rt></ruby> が たくさん あります — Il y a beaucoup de sanctuaires et de temples avec une vieille histoire dans cette **ville**.

### n5_v_250 → v_250 · 銀行

**Statut** : PROPOSITION, non validée

- **A2-04-D0313** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_hotel"]` → après `[]`
- **A2-04-D0314** (abandon, senses) : Redondant. — avant `["Établissement bancaire"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 銀行 · ぎんこう · ginkou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | maison_quotidien › commerces |
| sens | Banque ; Établissement bancaire |
| nuance | Nom composé de <ruby>銀<rt>ぎん</rt></ruby> (argent métal) et de <ruby>行<rt>こう</rt></ruby> (aller/institution), désignant une banque. Compteur spécifique : <ruby>軒<rt>けん</rt></ruby> (ken) ou <ruby>箇所<rt>かしょ</rt></ruby> (kasho). |
| particules |  |
| furigana | <ruby>銀<rt>ぎん</rt></ruby><ruby>行<rt>こう</rt></ruby> |
| exemple | **<ruby>銀行<rt>ぎんこう</rt></ruby>** で おかね を おろします 。 — Je retire de l'argent à la **banque**. |

**Mécanique**

- word : `"銀行"`
- readings : `[{"kana":"ぎんこう","romaji":"ginkou","furigana":"<ruby>銀<rt>ぎん</rt></ruby><ruby>行<rt>こう</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Banque** | economie_commerce › banque_finance › banque | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>明日<rt>あした</rt></ruby> の <ruby>家賃<rt>やちん</rt></ruby> を <ruby>払<rt>はら</rt></ruby>う ため に、<ruby>午前中<rt>ごぜんちゅう</rt></ruby> に 銀行 で お<ruby>金<rt>かね</rt></ruby> を おろしました — J'ai retiré de l'argent à la **banque** dans la matinée pour payer le loyer de demain.
- <ruby>海外<rt>かいがい</rt></ruby> に いる <ruby>家族<rt>かぞく</rt></ruby> に お<ruby>金<rt>かね</rt></ruby> を <ruby>送金<rt>そうきん</rt></ruby> する ため、<ruby>銀行<rt>ぎんこう</rt></ruby> の <ruby>窓口<rt>まどぐち</rt></ruby> で <ruby>手続<rt>てつづ</rt></ruby>き を しました — J'ai fait les démarches au guichet de la **banque** pour envoyer de l'argent à ma famille à l'étranger.
- <ruby>駅<rt>えき</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>く に <ruby>新<rt>あたら</rt></ruby>しい 銀行 が <ruby>出来<rt>でき</rt></ruby>た ので、とても <ruby>便利<rt>べんり</rt></ruby> に なりました — Comme une nouvelle **banque** a été construite près de la gare, c'est devenu très pratique.

### n5_v_255 → v_255 · 村

**Statut** : PROPOSITION, non validée

- **A2-04-D0296** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0297** (abandon, senses) : Termes voisins, pas équivalents. — avant `["Hameau","Commune rurale"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 村 · むら · mura |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › ville |
| sens | Village ; Hameau ; Commune rurale |
| nuance | Nom désignant un village ou une communauté rurale, par opposition à la ville (<ruby>町<rt>まち</rt></ruby> - machi ou <ruby>市<rt>し</rt></ruby> - shi). Compteur spécifique : <ruby>つ<rt>つ</rt></ruby> (tsu) ou <ruby>ヶ<rt>か</rt></ruby><ruby>所<rt>しょ</rt></ruby> (kasho). |
| particules |  |
| furigana | <ruby>村<rt>むら</rt></ruby> |
| exemple | この **<ruby>村<rt>むら</rt></ruby>** は とても しずか です 。 — Ce **village** est très calme. |

**Mécanique**

- word : `"村"`
- readings : `[{"kana":"むら","romaji":"mura","furigana":"<ruby>村<rt>むら</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Village** | territoires_lieux_geographiques › villes_localites › villages | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>山<rt>やま</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に ある この <ruby>村<rt>むら</rt></ruby> は、<ruby>空<rt>そら</rt></ruby> が <ruby>綺麗<rt>きれい</rt></ruby> で <ruby>空気<rt>くうき</rt></ruby> が とても おいしい です — Ce **village** situé au milieu de la montagne a un beau ciel et un air très pur.
- <ruby>昔<rt>むかし</rt></ruby> ながら の <ruby>家<rt>いえ</rt></ruby> が <ruby>並<rt>なら</rt></ruby>ぶ <ruby>村<rt>むら</rt></ruby> を <ruby>散歩<rt>さんぽ</rt></ruby> する の が <ruby>大好<rt>だいす</rt></ruby>き です — J'adore me promener dans le **village** où sont alignées des maisons traditionnelles.
- <ruby>夏休み<rt>なつやすみ</rt></ruby> になると、<ruby>都会<rt>とかい</rt></ruby> を <ruby>離<rt>はな</rt></ruby>れて <ruby>静<rt>しず</rt></ruby>かな <ruby>村<rt>むら</rt></ruby> の <ruby>実家<rt>じっか</rt></ruby> へ <ruby>帰<rt>かえ</rt></ruby>ります — Quand les vacances d'été arrivent, je quitte la ville pour retourner dans la maison familiale d'un **village** calme.

### n5_v_259 → v_259 · 登る

**Statut** : PROPOSITION, non validée

- **A2-04-D0352** (abandon, senses) : Redondant avec « grimper ». — avant `["Escalader"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 登る · のぼる · noboru |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Grimper ; Monter ; Escalader |
| nuance | Verbe <ruby>五段<rt>ごだん</rt></ruby> (godan) transitif ou intransitif désignant l'action de grimper ou de gravir une montagne, des escaliers ou une structure, généralement associé à la particule に (ni) ou を (o). |
| particules | に を |
| furigana | <ruby>登<rt>のぼ</rt></ruby>る |
| exemple | あした 、<ruby>山<rt>やま</rt></ruby> に **<ruby>登<rt>のぼ</rt></ruby>ります** 。 — Demain, je **grimperai** la montagne. |

**Mécanique**

- word : `"登る"`
- readings : `[{"kana":"のぼる","romaji":"noboru","furigana":"<ruby>登<rt>のぼ</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Gravir : 山に登る, faire l'ascension d'une montagne."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Monter** (Grimper) | espace_proprietes_spatiales › mouvement_deplacement › monter_descendre | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>週末<rt>しゅうまつ</rt></ruby>、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>高<rt>たか</rt></ruby>い <ruby>山<rt>やま</rt></ruby> に 登る <ruby>予定<rt>よてい</rt></ruby> です — Le week-end prochain, j'ai l'intention de **grimper** (gravir) une haute montagne avec un ami.
- <ruby>頂上<rt>ちょうじょう</rt></ruby> まで 登ると、そこから <ruby>見<rt>み</rt></ruby>える <ruby>景色<rt>けしき</rt></ruby> が とても <ruby>美<rt>うつく</rt></ruby>しかったです — Quand on est monté jusqu'au sommet, le paysage qu'on voyait depuis là-bas était très beau.
- <ruby>子供<rt>こども</rt></ruby> の <ruby>頃<rt>ころ</rt></ruby>、よく <ruby>近所<rt>きんじょ</rt></ruby> の <ruby>大<rt>おお</rt></ruby>きな 木 に 登って <ruby>遊<rt>あそ</rt></ruby>びました — Quand j'étais enfant, je m'amusais souvent à **grimper** sur le grand arbre du voisinage.

### n5_v_537 → v_537 · 出ます

**Statut** : PROPOSITION, non validée

- **A2-04-D0335** (fusion, entrée) : 出ます n'est pas une unité lexicale : c'est la forme polie conjuguée de 出る. Fusion dans 出る (arbitrage du lot 04) ; son sens « assister à » rejoint l'ENTRY survivante. — avant `null` → après `"n5_v_642"`
- **A2-04-D0336** (exception-fusion, entrée) : Exception à la règle du plus petit numéro (addendum A3) : n5_v_537 est une représentation manifestement erronée (une forme conjuguée tenant lieu d'ENTRY) ; garder son identifiant ferait survivre la représentation incorrecte au moment où elle est corrigée. v_642 (出る) est conservé. — avant `"survivant par la règle : n5_v_537"` → après `"survivant : n5_v_642"`

| Champ source | Valeur |
|---|---|
| mot, lecture | 出ます · でます · demasu |
| type, group | verbe · ru |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Sortir ; Partir de ; Quitter ; Assister à |
| nuance | **Verbe intransitif (groupe ichidan / ru)** – forme polie de *deru* (出る) – exprimant le fait de sortir d'un lieu, de quitter une pièce ou de participer à un événement. |
| particules | を から |
| furigana | <ruby>出<rt>で</rt></ruby>ます |
| exemple | まいあさ 8じ に いえ を **<ruby>出<rt>で</rt></ruby>ます** 。 — Je **sers** (quitte) de la maison tous les matins à huit heures. |

**Mécanique**

- word : `"出ます"`
- readings : `[{"kana":"でます","romaji":"demasu","furigana":"<ruby>出<rt>で</rt></ruby>ます","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"ru"`

**Retrait** : fusion dans n5_v_642

**Contexte (anciens exemples, lecture seule)**

- まいあさ 7<ruby>時<rt>じ</rt></ruby> に <ruby>家<rt>いえ</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます — Je **sors** de la maison à 7 heures tous les matins.
- <ruby>次<rt>つぎ</rt></ruby> の <ruby>駅<rt>えき</rt></ruby> で <ruby>電車<rt>でんしゃ</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます (または: <ruby>降<rt>お</rt></ruby>ります) — Je **sors** du train à la prochaine gare.
- もう すぐ <ruby>部屋<rt>へや</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます — Je vais **sortir** de la chambre bientôt.

### n5_v_550 → v_550 · 帰る

**Statut** : PROPOSITION, non validée

- **A2-04-D0334** (abandon, senses) : Repris dans la nuance. — avant `["Retourner chez soi","S'en retourner"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 帰る · かえる · kaeru |
| type, group | verbe · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Rentrer ; Retourner chez soi ; S'en retourner |
| nuance | **Verbe intransitif (groupe u exceptionnel - i/e ru)** exprimant l'action de rentrer chez soi ou de retourner à son point de départ. |
| particules | に へ から |
| furigana | <ruby>帰<rt>かえ</rt></ruby>る |
| exemple | まいにち ろくじ に うち へ **<ruby>帰<rt>かえ</rt></ruby>り** ます 。 — Je **rentre** chez moi tous les jours à six heures. |

**Mécanique**

- word : `"帰る"`
- readings : `[{"kana":"かえる","romaji":"kaeru","furigana":"<ruby>帰<rt>かえ</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Rentrer chez soi, ou retourner à son point de départ. Verbe du groupe u malgré sa terminaison en -eru."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Rentrer** | espace_proprietes_spatiales › mouvement_deplacement › aller_venir | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>仕事<rt>しごと</rt></ruby> が <ruby>終<rt>お</rt></ruby>わって から、<ruby>家<rt>いえ</rt></ruby> に <ruby>帰<rt>か</rt></ruby>ります — Je **rentre** à la maison après avoir terminé mon travail.
- <ruby>昨日<rt>きのう</rt></ruby> いつ <ruby>家<rt>いえ</rt></ruby> に <ruby>帰<rt>か</rt></ruby>りました か — À quelle heure êtes-vous **rentré** à la maison hier ?
- <ruby>明日<rt>あした</rt></ruby> フランス に <ruby>帰<rt>か</rt></ruby>ります — Je **rentre** en France demain.

### n5_v_557 → v_557 · 止まる

**Statut** : PROPOSITION, non validée

- **A2-04-D0350** (decision, senses) : Un seul concept, cesser de se mouvoir ou de fonctionner ; l'emploi pour un service ou un mécanisme est décrit dans la nuance. — avant `["S'arrêter","Faire halte","Être suspendu (pour un service, un mécanisme)"]` → après `"un seul sens"`
- **A2-04-D0351** (abandon, senses) : Le premier est redondant ; le second est repris dans la nuance. — avant `["Faire halte","Être suspendu (pour un service, un mécanisme)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 止まる · とまる · tomaru |
| type, group | verbe · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | S'arrêter ; Faire halte ; Être suspendu (pour un service, un mécanisme) |
| nuance | **Verbe intransitif (groupe u)** exprimant le fait qu'un objet en mouvement, un véhicule ou un mécanisme s'arrête de lui-même ou est immobilisé (par opposition au verbe transitif *tomeru* 止める qui signifie « arrêter / immobiliser [quelque chose] »). |
| particules | が |
| furigana | <ruby>止<rt>と</rt></ruby>まる |
| exemple | くるま が **<ruby>止<rt>と</rt></ruby>まり** まし た 。 — La voiture s'**est arrêtée**. |

**Mécanique**

- word : `"止まる"`
- readings : `[{"kana":"とまる","romaji":"tomaru","furigana":"<ruby>止<rt>と</rt></ruby>まる","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Se dit d'un véhicule, d'une machine ou d'un service : 電車が止まる, le train s'arrête."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **S'arrêter** | espace_proprietes_spatiales › mouvement_deplacement | evenement |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>前<rt>まえ</rt></ruby> に <ruby>車<rt>くるま</rt></ruby> が <ruby>止<rt>と</rt></ruby>まって います — Il y a une voiture qui **s'arrête** devant.
- ここで <ruby>電車<rt>でんしゃ</rt></ruby> が <ruby>止<rt>と</rt></ruby>まります — Le train **s'arrête** ici.
- あした は <ruby>雨<rt>あめ</rt></ruby> が <ruby>止<rt>と</rt></ruby>む と いい です ね — Ce serait bien si la pluie **s'arrêtait** demain.

### n5_v_563 → v_563 · 渡る

**Statut** : PROPOSITION, non validée

- **A2-04-D0345** (abandon, senses) : Redondant. — avant `["Passer de l'autre côté"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 渡る · わたる · wataru |
| type, group | verbe · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Traverser ; Passer de l'autre côté |
| nuance | **Verbe intransitif (groupe u)** exprimant l'action de traverser un pont, une rue, une rivière ou un espace étendu pour aller d'une rive ou d'un côté à un autre (la contrepartie transitive étant *watasu* 渡す). |
| particules | を |
| furigana | <ruby>渡<rt>わた</rt></ruby>る |
| exemple | はし を **<ruby>渡<rt>わた</rt></ruby>り** ます 。 — Je **traverse** le pont. |

**Mécanique**

- word : `"渡る"`
- readings : `[{"kana":"わたる","romaji":"wataru","furigana":"<ruby>渡<rt>わた</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Avec を : 道を渡る, traverser la rue ; 橋を渡る, traverser le pont."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Traverser** | espace_proprietes_spatiales › parcours_trajectoire | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>信号<rt>しんごう</rt></ruby> が <ruby>青<rt>あお</rt></ruby>い ですから、<ruby>道路<rt>どうろ</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>りましょう — Le feu est vert, alors **traversons** la route.
- あの <ruby>橋<rt>はし</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>ると、<ruby>美術館<rt>びじゅつかん</rt></ruby> が あります — Si vous **traversez** ce pont, il y a le musée des beaux-arts.
- <ruby>横断歩道<rt>おうだんほどう</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>って ください — Veuillez **traverser** sur le passage piéton.

### n5_v_565 → v_565 · 着く

**Statut** : PROPOSITION, non validée

- **A2-04-D0346** (abandon, senses) : Redondant. — avant `["Atteindre (une destination)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 着く · つく · tsuku |
| type, group | verbe · u |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Arriver ; Atteindre (une destination) |
| nuance | **Verbe intransitif (groupe u)** désignant l'action d'arriver à destination (une gare, une ville, une maison) ou d'atteindre un lieu après un déplacement. |
| particules | に へ |
| furigana | <ruby>着<rt>つ</rt></ruby>く |
| exemple | とうきょう えき に **<ruby>着<rt>つ</rt></ruby>き** まし た 。 — Je suis **arrivé** à la gare de Tokyo. |

**Mécanique**

- word : `"着く"`
- readings : `[{"kana":"つく","romaji":"tsuku","furigana":"<ruby>着<rt>つ</rt></ruby>く","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Arriver à destination : 駅に着く, arriver à la gare."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Arriver** | espace_proprietes_spatiales › mouvement_deplacement › aller_venir | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>電車<rt>でんしゃ</rt></ruby> は もう すぐ <ruby>東京<rt>とうきょう</rt></ruby> <ruby>駅<rt>えき</rt></ruby> に <ruby>着<rt>つ</rt></ruby>きます — Le train va bientôt **arriver** à la gare de Tokyo.
- <ruby>昨日<rt>きのう</rt></ruby> の <ruby>夜<rt>よる</rt></ruby> <ruby>遅<rt>おそ</rt></ruby>く <ruby>家<rt>いえ</rt></ruby> に <ruby>着<rt>つ</rt></ruby>きました — Je suis **arrivé** à la maison tard dans la nuit hier.
- あの <ruby>山<rt>やま</rt></ruby> の <ruby>頂上<rt>ちょうじょう</rt></ruby> に <ruby>着<rt>つ</rt></ruby>いたら、おべんとう を <ruby>食<rt>た</rt></ruby>べましょう — Quand nous **serons arrivés** au sommet de cette montagne, mangeons notre bento.

### n5_v_624 → v_624 · ホテル

**Statut** : PROPOSITION, non validée

- **A2-04-D0319** (decision, tags) : lieu_gare (ancienne catégorie « lieux ») écarté ; lieu_hotel ajouté hors des candidats : c'est le mot du lieu lui-même, comme レストラン pour le restaurant. — avant `["lieu_gare"]` → après `["lieu_hotel"]`
- **A2-04-D0320** (abandon, senses) : Redondant. — avant `["Établissement hôtelier"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ホテル · ほてる · hoteru |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › hebergement |
| sens | Hôtel ; Établissement hôtelier |
| nuance | **Nom** (emprunt de l'anglais *hotel*) désignant un hôtel pour l'hébergement lors de voyages ou de déplacements. |
| particules |  |
| furigana | ホテル |
| exemple | りょこう の とき 、 **ホテル** に とまり ます 。 — Je descends (reste) dans un **hôtel** pendant le voyage. |

**Mécanique**

- word : `"ホテル"`
- readings : `[{"kana":"ほてる","romaji":"hoteru","furigana":"ホテル","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `["lieu_hotel"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Hôtel** | voyage_tourisme › hebergement_temporaire › hotels | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>東京<rt>とうきょう</rt></ruby> の <ruby>駅<rt>えき</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>く に 大きな ホテル が あります — Il y a un grand hôtel près de la gare de Tokyo.
- 「<ruby>旅行<rt>りょこう</rt></ruby> の <ruby>間<rt>あいだ</rt></ruby>、どんな ホテル に <ruby>泊<rt>と</rt></ruby>まります か」 — « Dans quel genre d'hôtel logerez-vous pendant le voyage ? »
- 「この ホテル は とても きれいで 便利 です」 — « Cet hôtel est très propre et pratique. »

### n5_v_642 → v_642 · 出る

**Statut** : PROPOSITION, non validée

- **A2-04-D0335** (fusion, entrée) : 出ます n'est pas une unité lexicale : c'est la forme polie conjuguée de 出る. Fusion dans 出る (arbitrage du lot 04) ; son sens « assister à » rejoint l'ENTRY survivante. — avant `null` → après `"n5_v_642"`
- **A2-04-D0337** (decision, senses) : Trois sens documentés par les deux sources fusionnées : quitter un lieu (を), prendre part à quelque chose (に, documenté par 出ます), et apparaître (が). Trois référents distincts, chacun avec sa particule. — avant `["Sortir","Quitter","Partir","Apparaître","Assister à (n5_v_537)"]` → après `["S1 Sortir","S2 Assister à","S3 Apparaître"]`
- **A2-04-D0338** (categorie-nulle, sens 2 · category) : Prendre part à une activité (cours, réunion) : « action générale », sans domaine thématique propre. Addendum A5.
- **A2-04-D0339** (categorie-nulle, sens 3 · category) : Apparaître, devenir visible : « action générale », sans domaine thématique propre. Addendum A5.

| Champ source | Valeur |
|---|---|
| mot, lecture | 出る · でる · deru |
| type, group | verbe · ru |
| catégorie (ancienne, indicative) | actions_generiques › mouvement_deplacement |
| sens | Sortir ; Quitter ; Partir ; Apparaître |
| nuance | **Verbe intransitif (groupe ru / ichidan)** exprimant l'action de quitter un lieu (souvent suivi de la particule *o* pour indiquer le lieu que l'on quitte, comme *heya o deru* sortir de la pièce) ou de se manifester. |
| particules | を から |
| furigana | <ruby>出<rt>で</rt></ruby>る |
| exemple | いま いえ を **<ruby>出<rt>で</rt></ruby>ます** 。 — Je **sors** de la maison maintenant. |

**Mécanique**

- word : `"出る"`
- readings : `[{"kana":"でる","romaji":"deru","furigana":"<ruby>出<rt>で</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"ru"`

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Sortir** (Quitter, Partir) | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | particules を から | 部屋を出る : sortir de la pièce ; 駅を出る : sortir de la gare. |
| 2 | **Assister à** (Participer à) | **null** | action | particules に | 授業に出る : assister au cours ; 会議に出る : participer à la réunion. |
| 3 | **Apparaître** | **null** | evenement | particules が | 月が出る : la lune apparaît. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>朝<rt>あさ</rt></ruby> 7 <ruby>時<rt>じ</rt></ruby> に <ruby>家<rt>いえ</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます — Je **sors** de la maison à 7 heures du matin.
- 「<ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>っていますから、<ruby>外<rt>そと</rt></ruby> へ <ruby>出<rt>で</rt></ruby>ない で ください」 — « Comme il pleut, veuillez ne pas **sortir** dehors. »
- <ruby>電車<rt>でんしゃ</rt></ruby> が <ruby>駅<rt>えき</rt></ruby> を <ruby>出<rt>で</rt></ruby>ました — Le train a **quitté** ('est **sorti** de') la gare.

### n5_v_644 → v_644 · 切符

**Statut** : PROPOSITION, non validée

- **A2-04-D0331** (abandon, senses) : Redondant. — avant `["Titre de transport"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 切符 · きっぷ · kippu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | transports › titre_transport |
| sens | Billet ; Ticket de transport ; Titre de transport |
| nuance | **Nom** désignant un ticket ou un billet pour les transports (train, métro, bus). Ne s'applique pas aux billets de banque ou aux billets d'avion, qui utilisent des termes empruntés en katakana. |
| particules |  |
| furigana | <ruby>切<rt>きっ</rt></ruby><ruby>符<rt>ぷ</rt></ruby> |
| exemple | えき で **<ruby>切<rt>きっ</rt></ruby><ruby>符<rt>ぷ</rt></ruby>** を かい まし た 。 — J'ai acheté un **billet** (de train) à la gare. |

**Mécanique**

- word : `"切符"`
- readings : `[{"kana":"きっぷ","romaji":"kippu","furigana":"<ruby>切<rt>きっ</rt></ruby><ruby>符<rt>ぷ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Billet de train, de métro ou de bus ; le billet de banque se dit お札, le billet d'avion チケット."`
- tags : `["lieu_gare"]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Billet** (Ticket) | transport_mobilite › utilisation_des_transports | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>駅<rt>えき</rt></ruby> の <ruby>自動<rt>じどう</rt></ruby> <ruby>券売機<rt>けんばいき</rt></ruby> で <ruby>切符<rt>きっぷ</rt></ruby> を <ruby>買<rt>か</rt></ruby>います — J'achète un **billet** au distributeur automatique de la gare.
- 「<ruby>電車<rt>でんしゃ</rt></ruby> を <ruby>降<rt>お</rt></ruby>りる <ruby>時<rt>とき</rt></ruby> に、<ruby>切符<rt>きっぷ</rt></ruby> を <ruby>入<rt>い</rt></ruby>れて ください」 — « Veuillez insérer le **billet** lorsque vous descendez du train. »
- <ruby>財布<rt>さいふ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に <ruby>新幹線<rt>しんかんせん</rt></ruby> の <ruby>切符<rt>きっぷ</rt></ruby> が あります — Il y a un **billet** de Shinkansen à l'intérieur du portefeuille.

### n5_v_674 → v_674 · 橋

**Statut** : PROPOSITION, non validée

- **A2-04-D0301** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0302** (abandon, senses) : Pas équivalent. — avant `["Passerelle"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 橋 · はし · hashi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › infrastructure |
| sens | Pont ; Passerelle |
| nuance | **Nom** désignant un pont qui permet de traverser une rivière, une route ou un obstacle (à ne pas confondre avec l'accentuation de *hashi* signifiant « baguettes » ou « bord »). |
| particules |  |
| furigana | <ruby>橋<rt>はし</rt></ruby> |
| exemple | この **<ruby>橋<rt>はし</rt></ruby>** を わたります 。 — Je traverse ce **pont**. |

**Mécanique**

- word : `"橋"`
- readings : `[{"kana":"はし","romaji":"hashi","furigana":"<ruby>橋<rt>はし</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Ne pas confondre avec 箸 (baguettes), homophone d'accentuation différente."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Pont** | environnement_construit_espaces_humains › batiments_constructions › ouvrages | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>川<rt>かわ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に <ruby>長<rt>なが</rt></ruby>い <ruby>橋<rt>はし</rt></ruby> が かかっています — Il y a un long **pont** au-dessus de la rivière.
- 「この <ruby>橋<rt>はし</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>る と、<ruby>図書館<rt>としょかん</rt></ruby> が あります」 — « En traversant ce **pont**, il y a la bibliothèque. »
- <ruby>歩<rt>ある</rt></ruby>いて <ruby>橋<rt>はし</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>りながら、きれいな <ruby>景色<rt>けしき</rt></ruby> を <ruby>見<rt>み</rt></ruby>ました — En traversant le **pont** à pied, j'ai vu un beau paysage.

### n5_v_705 → v_705 · 道

**Statut** : PROPOSITION, non validée

- **A2-04-D0298** (decision, tags) : Association pas assez caractéristique du lieu (critère des tags de lieu du lot 02) : le mot peut se rencontrer près du lieu ou dans celui-ci, mais il n'appartient pas au vocabulaire d'action propre à ce contexte. Candidats écartés. — avant `["lieu_gare"]` → après `[]`
- **A2-04-D0299** (decision, senses) : Un seul concept, la voie où l'on circule ; rue, chemin et route en rendent la largeur. — avant `["Rue","Chemin","Route","Voie"]` → après `"un seul sens"`
- **A2-04-D0300** (abandon, senses) : La « voie » morale ou spirituelle (武道) documentée par la nuance de la source est hors N5 : non reprise. — avant `["Voie"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 道 · みち · michi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | lieux › infrastructure |
| sens | Rue ; Chemin ; Route ; Voie |
| nuance | **Nom** désignant une route, un chemin ou une rue pour circuler à pied ou en véhicule, ainsi que par extension la voie morale ou spirituelle (dans les arts martiaux par exemple). |
| particules | を |
| furigana | <ruby>道<rt>みち</rt></ruby> |
| exemple | **<ruby>道<rt>みち</rt></ruby>** を あるいて い ます 。 — Je marche dans la **rue**. |

**Mécanique**

- word : `"道"`
- readings : `[{"kana":"みち","romaji":"michi","furigana":"<ruby>道<rt>みち</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`
- tags de lieu candidats (à confirmer) : lieu_gare

**Proposition**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Tout chemin où l'on circule : 道を渡る, traverser la rue ; 道に迷う, se perdre."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Chemin** (Rue, Route) | environnement_construit_espaces_humains › voirie › rues | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>道<rt>みち</rt></ruby> が <ruby>混<rt>こ</rt></ruby>んでいて、バス が なかなか <ruby>進<rt>すす</rt></ruby>みません — La **rue** ('la route') est encombrée et le bus n'avance pas facilement.
- 「この <ruby>道<rt>みち</rt></ruby> をまっすぐ <ruby>行<rt>い</rt></ruby>く と、<ruby>郵便局<rt>ゆうびんきょく</rt></ruby> が あります」 — « Si vous allez tout droit dans cette **rue**, il y a le bureau de poste. »
- <ruby>夜<rt>よる</rt></ruby> は <ruby>道<rt>みち</rt></ruby> が <ruby>暗<rt>くら</rt></ruby>い ので、<ruby>気<rt>き</rt></ruby>ををつけて <ruby>歩<rt>ある</rt></ruby>きます — La **rue** est sombre la nuit, alors je marche en faisant attention.
