# Lot lot-06 · École, apprentissage, langue et écrit

Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.

## Autres entrées

### n5_v_22 → v_22 · 先生

**Statut** : décision validée

- **A2-04-D0416** (decision, senses) : Deux sens documentés par la source : l'enseignant, et le titre ou l'appellation de respect pour d'autres professions (médecin, auteur, maître dans un art). Même modèle que les termes d'adresse du lot 01. — avant `["Professeur","Enseignant","Maître","Médecin","Auteur / Professionnel qualifié"]` → après `["S1 Professeur","S2 Titre de respect (médecin, auteur, maître)"]`
- **A2-04-D0417** (abandon, senses) : Le médecin se dit 医者 : 先生 n'en est que le titre de respect, repris dans le sens 2. — avant `["Médecin","Auteur / Professionnel qualifié"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 先生 · せんせい · sensei |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › personnes |
| sens | Professeur ; Enseignant ; Maître ; Médecin ; Auteur / Professionnel qualifié |
| nuance | Nom utilisé à la fois comme titre honorifique après un nom de famille et comme appellation pour s'adresser à un professeur, un docteur, un auteur ou un maître dans un art. On ne l'utilise jamais pour soi-même. |
| particules |  |
| furigana | <ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby> |
| exemple | <ruby>田中<rt>たなか</rt></ruby> <ruby>先生<rt>せんせい</rt></ruby> は <ruby>日本語<rt>にほんご</rt></ruby> を <ruby>教<rt>おし</rt></ruby>えます 。 — Le **professeur** Tanaka enseigne le japonais. |

**Mécanique**

- word : `"先生"`
- readings : `[{"kana":"せんせい","romaji":"sensei","furigana":"<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Titre de respect : on ne l'emploie jamais pour soi-même."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Professeur** (Enseignant) | education_apprentissage › acteurs_de_l_education | personne |  |  |
| 2 | **Maître** (Docteur) | relations_sociales › interactions_sociales | personne |  | Titre de respect pour un médecin, un auteur, un maître dans un art, ou pour s'adresser à eux ; après un nom : 田中先生. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>先生<rt>せんせい</rt></ruby> に <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>質問<rt>しつもん</rt></ruby> を します — Je pose une question de japonais au **professeur**.
- あの <ruby>先生<rt>せんせい</rt></ruby> の <ruby>授業<rt>じゅぎょう</rt></ruby> は とても <ruby>分<rt>わ</rt></ruby>かりやすい です — Le cours de ce **professeur** est très facile à comprendre.
- <ruby>学校<rt>がっこう</rt></ruby> で <ruby>先生<rt>せんせい</rt></ruby> に あいさつ を しました — J'ai salué le **professeur** à l'école.

### n5_v_32 → v_32 · 学生

**Statut** : décision validée

- **A2-04-D0418** (abandon, senses) : Repris dans la nuance. — avant `["Écolier (au sens large)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 学生 · がくせい · gakusei |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecole |
| sens | Étudiant ; Élève ; Écolier (au sens large) |
| nuance | Nom désignant une personne qui étudie, le plus souvent un étudiant du secondaire ou du supérieur (université). |
| particules |  |
| furigana | <ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby> |
| exemple | <ruby>私<rt>わたし</rt></ruby> は <ruby>大学<rt>だいがく</rt></ruby> の <ruby>学生<rt>がくせい</rt></ruby> です 。 — Je suis **étudiant** à l'université. |

**Mécanique**

- word : `"学生"`
- readings : `[{"kana":"がくせい","romaji":"gakusei","furigana":"<ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le plus souvent un étudiant du secondaire ou de l'université ; l'élève du primaire ou du secondaire se dit plutôt 生徒."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Étudiant** (Élève) | education_apprentissage › acteurs_de_l_education | personne |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>私<rt>わたし</rt></ruby> は <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>学生<rt>がくせい</rt></ruby> です — Je suis un **étudiant** en japonais.
- あの <ruby>図書館<rt>としょかん</rt></ruby> に は たくさん の <ruby>学生<rt>がくせい</rt></ruby> が います — Il y a beaucoup d'**étudiants** dans cette bibliothèque.
- <ruby>学生<rt>がくせい</rt></ruby> の <ruby>時<rt>とき</rt></ruby>、たくさん <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>みました — Quand j'étais **étudiant**, j'ai lu beaucoup de livres.

### n5_v_38 → v_38 · 生徒

**Statut** : décision validée

- **A2-04-D0419** (abandon, senses) : Cas particuliers, couverts par « élève ». — avant `["Collégien","Lycéen"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 生徒 · せいと · seito |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › personnes |
| sens | Élève ; Écolier ; Collégien ; Lycéen |
| nuance | Nom désignant un élève, principalement dans l'enseignement primaire ou secondaire (collège et lycée). Pour un étudiant d'université, on utilise plutôt <ruby>学生<rt>がくせい</rt></ruby> (gakusei). |
| particules |  |
| furigana | <ruby>生<rt>せい</rt></ruby><ruby>徒<rt>と</rt></ruby> |
| exemple | <ruby>教室<rt>きょうしつ</rt></ruby> に <ruby>20<rt>にじゅっ</rt></ruby> <ruby>人<rt>にん</rt></ruby> の <ruby>生徒<rt>せいと</rt></ruby> が います 。 — Il y a 20 **élèves** dans la classe. |

**Mécanique**

- word : `"生徒"`
- readings : `[{"kana":"せいと","romaji":"seito","furigana":"<ruby>生<rt>せい</rt></ruby><ruby>徒<rt>と</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Surtout au primaire et au secondaire ; à l'université, 学生."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Élève** (Écolier) | education_apprentissage › acteurs_de_l_education | personne |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>教室<rt>きょうしつ</rt></ruby> に は たくさん の <ruby>生徒<rt>せいと</rt></ruby> が います — Il y a beaucoup d'**élèves** dans la classe.
- あの <ruby>生徒<rt>せいと</rt></ruby> は <ruby>毎日<rt>まいにち</rt></ruby> <ruby>一生懸命<rt>いっしょうけんめい</rt></ruby> <ruby>勉強<rt>べんきょう</rt></ruby> して います — Cet **élève** étudie dur tous les jours.
- <ruby>先生<rt>せんせい</rt></ruby> が <ruby>生徒<rt>せいと</rt></ruby> に <ruby>質問<rt>しつもん</rt></ruby> を します — Le professeur pose une question à l'**élève**.

### n5_v_40 → v_40 · 留学生

**Statut** : décision validée

- **A2-04-D0420** (abandon, senses) : Pas équivalent : 留学生 ne suppose pas un échange. — avant `["Étudiant en échange international"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 留学生 · りゅうがくせい · ryuugakusei |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › personnes |
| sens | Étudiant étranger ; Étudiant en échange international |
| nuance | Nom désignant une personne qui étudie à l'étranger, ou plus spécifiquement un étudiant international venu faire ses études au Japon. |
| particules |  |
| furigana | <ruby>留<rt>りゅう</rt></ruby><ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby> |
| exemple | <ruby>私<rt>わたし</rt></ruby> は <ruby>大学<rt>だいがく</rt></ruby> で <ruby>留学生<rt>りゅうがくせい</rt></ruby> と <ruby>話<rt>はな</rt></ruby>しました 。 — J'ai parlé avec un **étudiant étranger** à l'université. |

**Mécanique**

- word : `"留学生"`
- readings : `[{"kana":"りゅうがくせい","romaji":"ryuugakusei","furigana":"<ruby>留<rt>りゅう</rt></ruby><ruby>学<rt>がく</rt></ruby><ruby>生<rt>せい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Celui qui étudie à l'étranger, ou l'étudiant international venu étudier au Japon."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Étudiant étranger** | education_apprentissage › acteurs_de_l_education | personne |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>私<rt>わたし</rt></ruby> は <ruby>日本<rt>にほん</rt></ruby> の <ruby>留学生<rt>りゅうがくせい</rt></ruby> です — Je suis un **étudiant étranger** au Japon.
- <ruby>大学<rt>だいがく</rt></ruby> の <ruby>寮<rt>りょう</rt></ruby> に は たくさん の <ruby>留学生<rt>りゅうがくせい</rt></ruby> が <ruby>住<rt>す</rt></ruby>んで います — Il y a beaucoup d'**étudiants étrangers** dans le dortoir de l'université.
- <ruby>留学生<rt>りゅうがくせい</rt></ruby> の <ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby> に ごはん を <ruby>食<rt>た</rt></ruby>べました — J'ai mangé avec un ami **étudiant étranger**.

### n5_v_41 → v_41 · 習う

**Statut** : décision validée

- **A2-04-D0428** (abandon, senses) : Redondant. — avant `["Étudier (auprès de quelqu'un)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 習う · ならう · narau |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | personnes_famille › apprentissage |
| sens | Apprendre ; Prendre des leçons ; Étudier (auprès de quelqu'un) |
| nuance | Verbe godan employé pour exprimer l'action d'apprendre une compétence ou un savoir auprès d'un professeur (par opposition à <ruby>勉強<rt>べんきょう</rt></ruby>する (benkyousuru) qui désigne l'étude en général ou <ruby>覚<rt>おぼ</rt></ruby>える (oboeru) qui insiste sur la mémorisation). |
| particules | を |
| furigana | <ruby>習<rt>なら</rt></ruby>う |
| exemple | <ruby>来週<rt>らいしゅう</rt></ruby> から <ruby>漢字<rt>かんじ</rt></ruby> を <ruby>習<rt>なら</rt></ruby>います 。 — À partir de la semaine prochaine, j'**apprendrai** les kanjis. |

**Mécanique**

- word : `"習う"`
- readings : `[{"kana":"ならう","romaji":"narau","furigana":"<ruby>習<rt>なら</rt></ruby>う","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Apprendre auprès d'un professeur ; l'étude en général se dit 勉強する, la mémorisation 覚える."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Apprendre (auprès de quelqu'un)** (Prendre des leçons) | education_apprentissage › apprentissage › etudier | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>私<rt>わたし</rt></ruby> は <ruby>先生<rt>せんせい</rt></ruby> から <ruby>日本語<rt>にほんご</rt></ruby> を <ruby>習<rt>なら</rt></ruby>って います — J'**apprends** le japonais auprès du professeur.
- <ruby>一<rt>いち</rt></ruby><ruby>年<rt>ねん</rt></ruby> <ruby>前<rt>まえ</rt></ruby> から ピアノ を <ruby>習<rt>なら</rt></ruby>い<ruby>始<rt>はじ</rt></ruby>めました — J'ai commencé à **apprendre** le piano il y a un an.
- ここで <ruby>料理<rt>りょうり</rt></ruby> の <ruby>仕<rt>し</rt></ruby><ruby>方<rt>かた</rt></ruby> を <ruby>習<rt>なら</rt></ruby>う こと が できます — On peut **apprendre** à cuisiner ici.

### n5_v_123 → v_123 · クラス

**Statut** : décision validée

- **A2-04-D0413** (decision, senses) : Un seul sens : la source décrit « une classe d'élèves ou un groupe de cours », pas une salle. — avant `["Classe","Salle de classe","Groupe d'élèves"]` → après `"un seul sens"`
- **A2-04-D0414** (abandon, senses) : Non documenté par la nuance de la source ; la salle se dit 教室. — avant `["Salle de classe"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | クラス · くらす · kurasu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecole |
| sens | Classe ; Salle de classe ; Groupe d'élèves |
| nuance | Mot en katakana issu de l'anglais 'class', désignant une classe d'élèves ou un groupe de cours. |
| particules |  |
| furigana | クラス |
| exemple | わたし の <ruby>クラス<rt>くらす</rt></ruby> に は <ruby>学生<rt>がくせい</rt></ruby> が <ruby>20<rt>にじゅっ</rt></ruby><ruby>人<rt>にん</rt></ruby> います 。 — Il y a vingt élèves dans ma **classe**. |

**Mécanique**

- word : `"クラス"`
- readings : `[{"kana":"くらす","romaji":"kurasu","furigana":"クラス","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le groupe d'élèves ou de participants à un cours ; la salle se dit 教室."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Classe** (Groupe d'élèves) | education_apprentissage › vie_scolaire_universitaire › classe | groupe_collectif |  |  |

**Contexte (anciens exemples, lecture seule)**

- きょう は クラス の <ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby> に <ruby>日本語<rt>にほんご</rt></ruby> を <ruby>勉強<rt>べんきょう</rt></ruby>しました — Aujourd'hui, j'ai étudié le japonais avec un ami de la **classe**.
- わたし の クラス には アメリカ や フランス から の <ruby>留学生<rt>りゅうがくせい</rt></ruby> が います — Dans ma **classe**, il y a des étudiants étrangers venant des États-Unis et de France.
- <ruby>授業<rt>じぎょう</rt></ruby> が <ruby>終<rt>お</rt></ruby>わった <ruby>後<rt>あと</rt></ruby>、クラス の みんな で <ruby>写真<rt>しゃしん</rt></ruby> を <ruby>撮<rt>と</rt></ruby>りました — Après la fin du cours, tout le monde dans la **classe** a pris une photo ensemble.

### n5_v_124 → v_124 · テスト

**Statut** : décision validée

| Champ source | Valeur |
|---|---|
| mot, lecture | テスト · てすと · tesuto |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › cours |
| sens | Test ; Examen ; Interrogation écrite |
| nuance | Mot en katakana issu de l'anglais 'test', désignant un examen scolaire ou une évaluation. Synonyme fréquent de <ruby>試験<rt>しけん</rt></ruby> (shiken). |
| particules |  |
| furigana | テスト |
| exemple | <ruby>明日<rt>あした</rt></ruby> 、<ruby>日本語<rt>にほんご</rt></ruby> の <ruby>テスト<rt>てすと</rt></ruby> が あります 。 — Demain, il y a un **test** de japonais. |

**Mécanique**

- word : `"テスト"`
- readings : `[{"kana":"てすと","romaji":"tesuto","furigana":"テスト","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Synonyme courant de 試験."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Examen** (Test, Interrogation) | education_apprentissage › evaluation_scolaire › examens | evenement |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>来週<rt>らいしゅう</rt></ruby> <ruby>日本語<rt>にほんご</rt></ruby> の テスト が ある ので、<ruby>今週末<rt>こんしゅうまつ</rt></ruby> は たくさん <ruby>勉強<rt>べんきょう</rt></ruby>します — Il y a un **test** de japonais la semaine prochaine, alors je vais beaucoup étudier ce week-end.
- 先生 が テスト の <ruby>結果<rt>けっか</rt></ruby> を <ruby>配<rt>配</rt></ruby>りましたが、<ruby>点数<rt>てんすう</rt></ruby> が よくて <ruby>安心<rt>あんしん</rt></ruby>しました — Le professeur a distribué les résultats du **test**, et j'étais soulagé d'avoir de bonnes notes.
- <ruby>昨日<rt>きのう</rt></ruby> の 漢字 の テスト は とても <ruby>難<rt>むずか</rt></ruby>しかったです — Le **test** de kanji d'hier était très difficile.

### n5_v_125 → v_125 · ノート

**Statut** : décision validée

- **A2-04-D0452** (abandon, senses) : Pas équivalent. — avant `["Bloc-notes"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ノート · のーと · nooto |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › materiel_scolaire |
| sens | Cahier ; Carnet de notes ; Bloc-notes |
| nuance | Mot en katakana issu de l'anglais 'notebook', désignant un cahier d'écolier ou un carnet ligné/quadrillé pour prendre des notes. |
| particules |  |
| furigana | ノート |
| exemple | <ruby>先生<rt>せんせい</rt></ruby> の <ruby>言<rt>い</rt></ruby>った こと を <ruby>ノート<rt>のーと</rt></ruby> に <ruby>書<rt>か</rt></ruby>きます 。 — J'écris ce que le professeur a dit dans mon **cahier**. |

**Mécanique**

- word : `"ノート"`
- readings : `[{"kana":"のーと","romaji":"nooto","furigana":"ノート","default":true,"note":null}]`
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
| 1 | **Cahier** (Carnet) | communication_langage › ecriture › ecrire | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>授業<rt>じぎょう</rt></ruby> の <ruby>大切<rt>たいせつ</rt></ruby> な <ruby>説明<rt>せつめい</rt></ruby> を ノート に しっかり <ruby>書<rt>か</rt></ruby>き<ruby>留<rt>と</rt></ruby>めました — J'ai bien noté les explications importantes du cours dans mon **cahier**.
- <ruby>新<rt>あたら</rt></ruby>しい ノート と ペン を <ruby>文房具<rt>ぶんぼうぐ</rt></ruby><ruby>屋<rt>や</rt></ruby> で <ruby>買<rt>か</rt></ruby>いました — J'ai acheté un nouveau **cahier** et un stylo dans une papeterie.
- ノート の <ruby>中<rt>なか</rt></ruby> を <ruby>見<rt>み</rt></ruby>ながら、<ruby>漢字<rt>かんじ</rt></ruby> の <ruby>復習<rt>ふくしゅう</rt></ruby> を しています — Je révise les kanji en regardant à l'intérieur de mon **cahier**.

### n5_v_126 → v_126 · 大学

**Statut** : décision validée

- **A2-04-D0411** (abandon, senses) : Pas équivalent : désigne le niveau d'études, pas l'établissement. — avant `["Enseignement supérieur"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 大学 · だいがく · daigaku |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecole |
| sens | Université ; Enseignement supérieur |
| nuance | Nom composé de <ruby>大<rt>だい</rt></ruby> (dai, grand) et de <ruby>学<rt>がく</rt></ruby> (gaku, étude/apprentissage), désignant un établissement d'enseignement supérieur ou une université. |
| particules |  |
| furigana | <ruby>大<rt>だい</rt></ruby><ruby>学<rt>がく</rt></ruby> |
| exemple | わたし は <ruby>毎日<rt>まいにち</rt></ruby> <ruby>電車<rt>でんしゃ</rt></ruby> で <ruby>大学<rt>だいがく</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます 。 — Je vais à l'**université** en train tous les jours. |

**Mécanique**

- word : `"大学"`
- readings : `[{"kana":"だいがく","romaji":"daigaku","furigana":"<ruby>大<rt>だい</rt></ruby><ruby>学<rt>がく</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Université** | education_apprentissage › etablissements_educatifs › universite | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>一<rt>い</rt><ruby>年<rt>ねん</rt></ruby>の<ruby>時<rt>とき</rt></ruby>から<ruby>大学<rt>だいがく</rt></ruby>で<ruby>経済学<rt>けいざいがく</rt></ruby>を<ruby>専門<rt>せんもん</rt></ruby>として<ruby>勉強<rt>べんきょう</rt></ruby>しています — J'étudie la science économique comme spécialité à l'**université** depuis ma première année.
- キャンパスの<ruby>広<rt>ひろ</rt></ruby>い<ruby>大学<rt>だいがく</rt></ruby>の<ruby>中<rt>なか</rt></ruby>には、きれいな<ruby>図書館<rt>としょかん</rt></ruby>やカフェテリアがあります — À l'intérieur de cette grande **université** dotée d'un vaste campus, il y a une belle bibliothèque et une cafétéria.
- <ruby>将来<rt>しょうらい</rt></ruby><ruby>大学<rt>だいがく</rt></ruby>を<ruby>卒業<rt>そつぎょう</rt></ruby>したら、<ruby>海外<rt>かいがい</rt></ruby>で<ruby>働<rt>はたら</rt></ruby>きたいという<ruby>夢<rt>ゆめ</rt></ruby>があります — J'ai le rêve de travailler à l'étranger une fois que j'aurai terminé mes études à l'**université** dans le futur.

### n5_v_127 → v_127 · 学校

**Statut** : décision validée

- **A2-04-D0410** (abandon, senses) : Redondant. — avant `["Établissement scolaire"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 学校 · がっこう · gakkou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecole |
| sens | École ; Établissement scolaire |
| nuance | Nom désignant une école (<ruby>学校<rt>がっこう</rt></ruby> - gakkou) au sens général (école primaire, collège, lycée, etc.). Composé de <ruby>学<rt>がく</rt></ruby> (gaku, étude) et <ruby>校<rt>こう</rt></ruby> (kou, bâtiment/établissement). |
| particules |  |
| furigana | <ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby> |
| exemple | <ruby>子供<rt>こども</rt></ruby> たち は <ruby>朝<rt>あさ</rt></ruby> <ruby>学校<rt>がっこう</rt></ruby> へ <ruby>歩<rt>ある</rt></ruby>いて <ruby>行<rt>い</rt></ruby>きます 。 — Les enfants vont à l'**école** à pied le matin. |

**Mécanique**

- word : `"学校"`
- readings : `[{"kana":"がっこう","romaji":"gakkou","furigana":"<ruby>学<rt>がっ</rt></ruby><ruby>校<rt>こう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'école au sens général : primaire, collège, lycée."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **École** | education_apprentissage › etablissements_educatifs › ecole | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎朝<rt>まいあさ</rt></ruby><ruby>元気<rt>げんき</rt></ruby>に「<ruby>和<rt>わ</rt></ruby>っしょい」と<ruby>声<rt>こえ</rt></ruby>を<ruby>出<rt>だ</rt></ruby>しながら<ruby>子供<rt>こども</rt></ruby>たちが<ruby>学校<rt>がっこう</rt></ruby>へ<ruby>通<rt>かよ</rt></ruby>っています — Tous les matins, les enfants se rendent à l'**école** en poussant joyeusement des cris enthousiastes.
- この<ruby>学校<rt>がっこう</rt></ruby>には<ruby>世界中<rt>せかいじゅう</rt></ruby>からさまざまな<ruby>国籍<rt>こくせき</rt></ruby>の<ruby>生徒<rt>せいと</rt></ruby>が集まって勉強しています — Dans cette **école**, des élèves de nationalités diverses du monde entier se rassemblent pour étudier.
- <ruby>放課後<rt>ほうかご</rt></ruby>になると、<ruby>学校<rt>がっこう</rt></ruby>のグラウンドから<ruby>部活動<rt>ぶかつどう</rt></ruby>で<ruby>走<rt>はし</rt></ruby>る<ruby>音<rt>おと</rt></ruby>が<ruby>落<rt>お</rt></ruby>ちてきます — Quand vient la fin des cours, les bruits des activités de club résonnent depuis le terrain de l'**école**.

### n5_v_129 → v_129 · 幼稚園

**Statut** : décision validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 幼稚園 · ようちえん · youchien |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecole |
| sens | Jardin d'enfants ; École maternelle |
| nuance | Nom composé de <ruby>幼<rt>よう</rt></ruby> (you, jeune/enfance), <ruby>稚<rt>ち</rt></ruby> (chi, enfance) et <ruby>園<rt>えん</rt></ruby> (en, jardin/établissement), désignant la maternelle ou le jardin d'enfants pour les jeunes enfants avant l'école primaire. |
| particules |  |
| furigana | <ruby>幼<rt>よう</rt></ruby><ruby>稚<rt>ち</rt></ruby><ruby>園<rt>えん</rt></ruby> |
| exemple | ちいさい <ruby>子供<rt>こども</rt></ruby> が <ruby>幼稚園<rt>ようちえん</rt></ruby> へ <ruby>通<rt>かよ</rt></ruby>っています 。 — Un petit enfant fréquente le **jardin d'enfants**. |

**Mécanique**

- word : `"幼稚園"`
- readings : `[{"kana":"ようちえん","romaji":"youchien","furigana":"<ruby>幼<rt>よう</rt></ruby><ruby>稚<rt>ち</rt></ruby><ruby>園<rt>えん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Pour les jeunes enfants, avant l'école primaire."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **École maternelle** (Jardin d'enfants) | education_apprentissage › etablissements_educatifs › ecole | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>朝<rt>あさ</rt></ruby>、<ruby>子供<rt>こども</rt></ruby>たちが<ruby>元気<rt>げんき</rt></ruby>に<ruby>幼稚園<rt>ようちえん</rt></ruby>へ<ruby>通<rt>かよ</rt></ruby>う<ruby>姿<rt>すがた</rt></ruby>を<ruby>見<rt>み</rt></ruby>かけました — Le matin, j'ai vu des enfants se rendre joyeusement à l'**école maternelle**.
- <ruby>幼稚園<rt>ようちえん</rt></ruby>の<ruby>庭<rt>にわ</rt></ruby>で、<ruby>園児<rt>えんじ</rt></ruby>たちが<ruby>明<rt>あか</rt></ruby>るく<ruby>遊<rt>あそ</rt></ruby>んでいます — Dans le jardin de l'**école maternelle**, les jeunes enfants jouent joyeusement.
- <ruby>妹<rt>いもうと</rt></ruby>は<ruby>来年<rt>らいねん</rt></ruby>から<ruby>幼稚園<rt>ようちえん</rt></ruby>に<ruby>入<rt>はい</rt></ruby>るのをとても<ruby>楽<rt>たの</rt></ruby>しみにしています — Ma petite sœur a très hâte d'entrer à l'**école maternelle** à partir de l'année prochaine.

### n5_v_131 → v_131 · 授業

**Statut** : décision validée

- **A2-04-D0415** (abandon, senses) : Pas équivalent ; le groupe se dit クラス. — avant `["Classe (pédagogique)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 授業 · じゅぎょう · jugyou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › cours |
| sens | Cours ; Leçon ; Classe (pédagogique) |
| nuance | Nom désignant une leçon ou un cours dispensé par un professeur dans un établissement scolaire. |
| particules |  |
| furigana | <ruby>授<rt>じゅ</rt></ruby><ruby>業<rt>ぎょう</rt></ruby> |
| exemple | <ruby>午後<rt>ごご</rt></ruby> の <ruby>授業<rt>じゅぎょう</rt></ruby> が <ruby>始<rt>はじ</rt></ruby>まります 。 — Le **cours** de l'après-midi commence. |

**Mécanique**

- word : `"授業"`
- readings : `[{"kana":"じゅぎょう","romaji":"jugyou","furigana":"<ruby>授<rt>じゅ</rt></ruby><ruby>業<rt>ぎょう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le cours donné par un enseignant : 授業に出る, assister au cours."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Cours** (Leçon) | education_apprentissage › enseignement › cours | evenement |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>午後<rt>ごご</rt></ruby>の<ruby>授業<rt>じぎょう</rt></ruby>が<ruby>始<rt>はじ</rt></ruby>まるまで、<ruby>教室<rt>きょうしつ</rt></ruby>で<ruby>予習<rt>よしゅう</rt></ruby>をします — Je fais des révisions en avance dans la classe jusqu'à ce que le **cours** de l'après-midi commence.
- この<ruby>先生<rt>せんせい</rt></ruby>の<ruby>授業<rt>じぎょう</rt></ruby>はいつもわかりやすくて<ruby>人気<rt>にんき</rt></ruby>があります — Le **cours** de ce professeur est toujours facile à comprendre et populaire.
- <ruby>今日<rt>きょう</rt></ruby>の<ruby>日本語<rt>にほんご</rt></ruby>の<ruby>授業<rt>じぎょう</rt></ruby>では、<ruby>新<rt>あたら</rt></ruby>しい<ruby>文法<rt>ぶんぽう</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>しました — Pendant le **cours** de japonais d'aujourd'hui, nous avons étudié de nouvelles règles de grammaire.

### n5_v_132 → v_132 · 教える

**Statut** : décision validée

- **A2-04-D0429** (decision, senses) : Deux sens documentés par la source : « transmettre un savoir, enseigner une matière, ou indiquer une information ou un chemin ». Transmettre un savoir et donner une information ponctuelle sont deux actions distinctes. — avant `["Enseigner","Apprendre (quelque chose à quelqu'un)","Indiquer","Informer"]` → après `["S1 Enseigner","S2 Indiquer"]`
- **A2-04-D0430** (abandon, senses) : Équivalent de « enseigner » dans un emploi transitif du français : redondant. — avant `["Apprendre (quelque chose à quelqu'un)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 教える · おしえる · oshieru |
| type, group | verbe ichidan · ru |
| catégorie (ancienne, indicative) | ecole_apprentissage › apprentissage |
| sens | Enseigner ; Apprendre (quelque chose à quelqu'un) ; Indiquer ; Informer |
| nuance | Verbe ichidan exprimant différentes actions : transmettre un savoir, enseigner une matière, ou indiquer une information ou un chemin à quelqu'un. |
| particules | に を |
| furigana | <ruby>教<rt>おし</rt></ruby>える |
| exemple | <ruby>先生<rt>せんせい</rt></ruby> が <ruby>学生<rt>がくせい</rt></ruby> に <ruby>日本語<rt>にほんご</rt></ruby> を <ruby>教<rt>おし</rt></ruby>えます 。 — Le professeur **enseigne** le japonais aux élèves. |

**Mécanique**

- word : `"教える"`
- readings : `[{"kana":"おしえる","romaji":"oshieru","furigana":"<ruby>教<rt>おし</rt></ruby>える","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"ru"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Enseigner** | education_apprentissage › enseignement › enseigner | action | particules に を |  |
| 2 | **Indiquer** (Informer) | communication_langage › communication › transmission | action | particules に を | 道を教える : indiquer le chemin. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>先生<rt>せんせい</rt></ruby> が <ruby>学生<rt>がくせい</rt></ruby> に <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>文法<rt>ぶんぽう</rt></ruby> を <ruby>教<rt>おし</rt></ruby>えます — Le professeur **enseigne** la grammaire japonaise aux élèves.
- <ruby>道<rt>みち</rt></ruby> が わからなかったので、<ruby>親切<rt>しんせつ</rt></ruby> な <ruby>人<rt>ひと</rt></ruby> が <ruby>駅<rt>えき</rt></ruby> まで の <ruby>道<rt>みち</rt></ruby> を <ruby>教<rt>おし</rt></ruby>えてくれました — Comme je ne connaissais pas le chemin, une personne gentille m'a **indiqué** (enseigné) la route jusqu'à la gare.
- <ruby>友達<rt>ともだち</rt></ruby> に おいしい レストラン の <ruby>場所<rt>ばしょ</rt></ruby> を <ruby>教<rt>おし</rt></ruby>えて もらいました — Un ami m'a **indiqué** l'emplacement d'un bon restaurant.

### n5_v_133 → v_133 · 教室

**Statut** : décision validée

- **A2-04-D0412** (abandon, senses) : Redondant. — avant `["Classe (salle physique)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 教室 · きょうしつ · kyoushitsu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecole |
| sens | Salle de classe ; Classe (salle physique) |
| nuance | Nom composé de <ruby>教<rt>きょう</rt></ruby> (kyou, enseigner) et <ruby>室<rt>しつ</rt></ruby> (shitsu, chambre/pièce), désignant la salle de cours physique où se déroulent les leçons. |
| particules |  |
| furigana | <ruby>教<rt>きょう</rt></ruby><ruby>室<rt>しつ</rt></ruby> |
| exemple | <ruby>生徒<rt>せいと</rt></ruby> たち は <ruby>教室<rt>きょうしつ</rt></ruby> で <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>んでいます 。 — Les élèves lisent un livre dans la **salle de classe**. |

**Mécanique**

- word : `"教室"`
- readings : `[{"kana":"きょうしつ","romaji":"kyoushitsu","furigana":"<ruby>教<rt>きょう</rt></ruby><ruby>室<rt>しつ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"La salle physique où ont lieu les cours ; le groupe d'élèves se dit クラス."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Salle de classe** | education_apprentissage › vie_scolaire_universitaire › classe | lieu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>朝<rt>あさ</rt></ruby>、<ruby>学生<rt>がくせい</rt></ruby> たち が <ruby>元気<rt>げんき</rt></ruby> に <ruby>教室<rt>きょうしつ</rt></ruby> に <ruby>入<rt>はい</rt></ruby>って きました — Le matin, les étudiants sont entrés joyeusement dans la **salle de classe**.
- <ruby>黒板<rt>こくばん</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> で <ruby>先生<rt>せんせい</rt></ruby> が <ruby>教室<rt>きょうしつ</rt></ruby> の みんな に <ruby>話<rt>はな</rt></ruby>して います — Le professeur parle à tout le monde dans la **salle de classe** devant le tableau noir.
- <ruby>授業<rt>じぎょう</rt></ruby> が <ruby>終<rt>お</rt></ruby>わった <ruby>後<rt>あと</rt></ruby>、<ruby>教室<rt>きょうしつ</rt></ruby> を きれい に かたづけました — Après la fin du cours, j'ai bien rangé la **salle de classe**.

### n5_v_134 → v_134 · 本

**Statut** : décision validée

- **A2-04-D0448** (decision, senses) : L'emploi de 本 comme compteur (〜本, objets longs), documenté par la source, n'est pas un sens de cette ENTRY : il relève du registre des compteurs. — avant `"Livre ; emploi comme compteur des objets longs (nuance de la source)"` → après `"un seul sens : livre"`
- **A2-04-D0449** (abandon, senses) : Redondant. — avant `["Ouvrage"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 本 · ほん · hon |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › materiel_scolaire |
| sens | Livre ; Ouvrage |
| nuance | Nom désignant un livre. Attention à deux particularités : 1) Pour compter des livres, on doit utiliser le suffixe spécifique <ruby>冊<rt>さつ</rt></ruby> (satsu). 2) Ce mot sert lui-même de suffixe de comptage (compteur) pour les objets longs et cylindriques (crayons, bouteilles...). |
| particules |  |
| furigana | <ruby>本<rt>ほん</rt></ruby> |
| exemple | しずか な <ruby>部屋<rt>へや</rt></ruby> で <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>む の が <ruby>好き<rt>すき</rt></ruby> です 。 — J'aime lire un **livre** dans une chambre calme. |

**Mécanique**

- word : `"本"`
- readings : `[{"kana":"ほん","romaji":"hon","furigana":"<ruby>本<rt>ほん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Se compte avec 冊. Ne pas confondre avec le compteur 〜本 des objets longs."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Livre** | communication_langage › lecture | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>図書館<rt>としょかん</rt></ruby> で <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> の ため に <ruby>本<rt>ほん</rt></ruby> を <ruby>一<rt>い</rt></ruby>冊 <ruby>借<rt>か</rt></ruby>りました — J'ai emprunté un **livre** à la bibliothèque pour étudier le japonais.
- <ruby>休<rt>やす</rt></ruby>み の <ruby>日<rt>ひ</rt></ruby> は、<ruby>部屋<rt>へや</rt></ruby> で のんびり <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>む の が <ruby>大好<rt>だいす</rt></ruby>き です — Pendant mes jours de repos, j'adore lire tranquillement un **livre** dans ma chambre.
- この <ruby>本<rt>ほん</rt></ruby> には たくさん の <ruby>面白<rt>おもしろ</rt></ruby>い <ruby>物語<rt>ものがたり</rt></ruby> が <ruby>載<rt>の</rt></ruby>って います — Ce **livre** contient de nombreuses histoires intéressantes.

### n5_v_135 → v_135 · 知る

**Statut** : décision validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 知る · しる · shiru |
| type, group | verbe godan · u |
| catégorie (ancienne, indicative) | actions_generiques › apprentissage |
| sens | Savoir ; Connaître |
| nuance | Verbe désignant le fait de posséder une information. Attention à sa grammaire unique : 1) À l'affirmatif ('je sais'), on utilise TOUJOURS la forme continue <ruby>知っている<rt>しっている</rt></ruby> (shitte iru). 2) Au négatif ('je ne sais pas'), on revient à la forme simple <ruby>知らない<rt>しらない</rt></ruby> (shiranai). On n'utilise 'shiru' seul que pour traduire 'apprendre/découvrir une nouvelle'. |
| particules | を |
| furigana | <ruby>知<rt>し</rt></ruby>る |
| exemple | この <ruby>漢字<rt>かんじ</rt></ruby> の <ruby>意味<rt>いみ</rt></ruby> を <ruby>知<rt>し</rt></ruby>っています か 。 — **Savez-vous** le sens de ce kanji ? |

**Mécanique**

- word : `"知る"`
- readings : `[{"kana":"しる","romaji":"shiru","furigana":"<ruby>知<rt>し</rt></ruby>る","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"À l'affirmatif, toujours 知っている ; au négatif, 知らない (et non 知っていない)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Savoir** (Connaître) | etre_humain › psychologie_esprit › pensee | etat |  |  |

**Contexte (anciens exemples, lecture seule)**

- その <ruby>美味<rt>おい</rt></ruby>しい レストラン の <ruby>場所<rt>ばしょ</rt></ruby> を <ruby>知<rt>し</rt></ruby>って いますか — Savez-vous où se trouve ce bon restaurant ?
- 彼<ruby>女<rt>じょ</rt></ruby> は 日本の<ruby>歴史<rt>れきし</rt></ruby> について たくさん <ruby>知<rt>し</rt></ruby>って います — Elle en sait beaucoup sur l'histoire du Japon.
- はじめて その<ruby>事実<rt>じじつ</rt></ruby> を <ruby>知<rt>し</rt></ruby>った とき、とても おどろきました — Quand j'ai appris cette vérité pour la première fois, j'ai été très surpris.

### n5_v_136 → v_136 · 英語

**Statut** : décision validée

- **A2-04-D0438** (abandon, senses) : Redondant. — avant `["Langue anglaise"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 英語 · えいご · eigo |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › langues |
| sens | Anglais ; Langue anglaise |
| nuance | Nom désignant la langue anglaise. Il est composé de 英 (abréviation pour l'Angleterre) et du suffixe universel <ruby>語<rt>ご</rt></ruby> (go) qui signifie 'langue'. On retrouve ce suffixe pour former d'autres langues, comme <ruby>フランス語<rt>ふらんすご</rt></ruby> (le français) ou <ruby>日本語<rt>にほんご</rt></ruby> (le japonais). |
| particules |  |
| furigana | <ruby>英<rt>えい</rt></ruby><ruby>語<rt>ご</rt></ruby> |
| exemple | 3 <ruby>時<rt>じ</rt></ruby> から <ruby>英語<rt>えいご</rt></ruby> の <ruby>授業<rt>じゅぎょう</rt></ruby> が あります 。 — Il y a un cours d'**anglais** à partir de trois heures. |

**Mécanique**

- word : `"英語"`
- readings : `[{"kana":"えいご","romaji":"eigo","furigana":"<ruby>英<rt>えい</rt></ruby><ruby>語<rt>ご</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"〜語 forme le nom des langues : フランス語, 日本語."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Anglais (langue)** | communication_langage › langues › langues | concept_abstrait |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>将来<rt>しょうらい</rt></ruby>、<ruby>仕事<rt>しごと</rt></ruby> で <ruby>役<rt>やく</rt></ruby>に<ruby>立<rt>た</rt></ruby>つ ため に <ruby>英語<rt>えいご</rt></ruby> を <ruby>勉強<rt>べんきょう</rt></ruby>しています — J'étudie l'anglais pour qu'il me soit utile dans mon travail à l'avenir.
- この ホテル では <ruby>英語<rt>えいご</rt></ruby> が <ruby>話<rt>はな</rt></ruby>せる スタッフ が います — Il y a du personnel qui parle anglais dans cet hôtel.
- <ruby>外国<rt>がいこく</rt></ruby><ruby>人<rt>じん</rt></ruby> の <ruby>観光客<rt>かんこうきゃく</rt></ruby> から <ruby>英語<rt>えいご</rt></ruby> で <ruby>道<rt>みち</rt></ruby> を <ruby>聞<rt>き</rt></ruby>かれました — Un touriste étranger m'a demandé son chemin en anglais.

### n5_v_137 → v_137 · 覚える

**Statut** : décision validée

- **A2-04-D0431** (abandon, senses) : Redondant. — avant `["Apprendre par cœur"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 覚える · おぼえる · oboeru |
| type, group | verbe ichidan · ru |
| catégorie (ancienne, indicative) | ecole_apprentissage › apprentissage |
| sens | Mémoriser ; Apprendre par cœur |
| nuance | Verbe ichidan désignant le processus d'enregistrer une information en mémoire (ex: du vocabulaire). Attention à sa nuance de temps : à la forme simple, il signifie 'mémoriser/retenir' (action en cours). Pour exprimer l'état résultatif 'se souvenir / se rappeler de quelque chose', on utilise sa forme continue <ruby>覚えている<rt>おぼえている</rt></ruby> (oboete iru). |
| particules | を |
| furigana | <ruby>覚<rt>おぼ</rt></ruby>える |
| exemple | <ruby>毎日<rt>まいにち</rt></ruby> <ruby>新<rt>あたら</rt></ruby>しい <ruby>単語<rt>たんご</rt></ruby> を <ruby>覚<rt>おぼ</rt></ruby>えます 。 — Je **mémorise** de nouveaux mots de vocabulaire tous les jours. |

**Mécanique**

- word : `"覚える"`
- readings : `[{"kana":"おぼえる","romaji":"oboeru","furigana":"<ruby>覚<rt>おぼ</rt></ruby>える","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"ru"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'action d'enregistrer en mémoire ; l'état « se souvenir » se dit 覚えている."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Mémoriser** (Retenir) | education_apprentissage › apprentissage › memoriser_en_contexte_d_apprentissage | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby> すこしずつ <ruby>新<rt>あたら</rt></ruby>しい 漢字 を <ruby>覚<rt>おぼ</rt></ruby>えて います — J'apprends (mémorise) de nouveaux kanji petit à petit chaque jour.
- <ruby>電話<rt>でんわ</rt></ruby> の <ruby>番号<rt>ばんごう</rt></ruby> を しっかり <ruby>覚<rt>おぼ</rt></ruby>えて から <ruby>架<rt>か</rt></ruby>けます — Je mémorise bien le numéro de téléphone avant d'appeler.
- <ruby>子<rt>こ</rt></ruby><ruby>供<rt>ども</rt></ruby><ruby>時代<rt>じだい</rt></ruby> に <ruby>読<rt>よ</rt></ruby>んだ <ruby>歌<rt>うた</rt></ruby> の <ruby>歌詞<rt>かし</rt></ruby> を まだ <ruby>覚<rt>おぼ</rt></ruby>えて います — Je me souviens (mémorise) encore des paroles de la chanson que j'ai lues dans mon enfance.

### n5_v_138 → v_138 · 言葉

**Statut** : décision validée

- **A2-04-D0436** (decision, senses) : Deux sens documentés par la source (« un mot, une expression, la parole ou le langage en général ») : une unité ou ce qui est dit, et un système de langue. — avant `["Mot","Langue","Parole","Vocabulaire","Terme"]` → après `["S1 Mot (paroles)","S2 Langue"]`
- **A2-04-D0437** (abandon, senses) : Pas équivalent : l'ensemble des mots se dit 語彙. — avant `["Vocabulaire"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 言葉 · ことば · kotoba |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › langues |
| sens | Mot ; Langue ; Parole ; Vocabulaire ; Terme |
| nuance | Nom désignant un mot, une expression, la parole ou le langage en général. Composé de <ruby>言<rt>こと</rt></ruby> (dire/parole) et <ruby>葉<rt>ば</rt></ruby> (feuille). |
| particules |  |
| furigana | <ruby>言<rt>こと</rt></ruby><ruby>葉<rt>ば</rt></ruby> |
| exemple | この <ruby>辞書<rt>じしょ</rt></ruby> で <ruby>新<rt>あたら</rt></ruby>しい <ruby>言葉<rt>ことば</rt></ruby> を <ruby>調<rt>しら</rt></ruby>べます 。 — Je cherche un nouveau **mot** dans ce dictionnaire. |

**Mécanique**

- word : `"言葉"`
- readings : `[{"kana":"ことば","romaji":"kotoba","furigana":"<ruby>言<rt>こと</rt></ruby><ruby>葉<rt>ば</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Mot** (Terme, Paroles) | communication_langage › expression | information_contenu |  | 先生の言葉 : les paroles du professeur. |
| 2 | **Langue** (Langage) | communication_langage › langues › langues | concept_abstrait |  | 日本の言葉 : la langue du Japon. |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>新<rt>あたら</rt></ruby>しい <ruby>言葉<rt>ことば</rt></ruby> を <ruby>覚<rt>おぼ</rt></ruby>える の は とても <ruby>楽<rt>たの</rt></ruby>しい です — C'est très amusant d'apprendre de nouveaux **mots** en japonais.
- その <ruby>外国<rt>がいこく</rt></ruby> の <ruby>言葉<rt>ことば</rt></ruby> は むずかしくて、なかなか <ruby>話<rt>はな</rt></ruby>せません — Les **mots** de cette langue étrangère sont difficiles, et je n'arrive pas à les parler facilement.
- お<ruby>母<rt>かあ</rt></ruby>さん に <ruby>優<rt>やさ</rt></ruby>しい <ruby>言葉<rt>ことば</rt></ruby> を かけて もらって <ruby>嬉<rt>うれ</rt></ruby>しかったです — J'étais heureux que ma mère m'adresse des **mots** gentils.

### n5_v_139 → v_139 · 辞書

**Statut** : décision validée

- **A2-04-D0447** (abandon, senses) : Pas équivalent. — avant `["Lexique"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 辞書 · じしょ · jisho |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecriture_lecture |
| sens | Dictionnaire ; Lexique |
| nuance | Nom composé de <ruby>辞<rt>じ</rt></ruby> (ji, mot/expression) et <ruby>書<rt>しょ</rt></ruby> (sho, livre/écrit). Pour dire 'consulter ou chercher dans un dictionnaire', on utilise toujours l'expression figée <ruby>辞書を引く<rt>じしょをひく</rt></ruby> (jisho wo hiku). Pour compter les dictionnaires, on utilise le compteur des livres : <ruby>冊<rt>さつ</rt></ruby> (satsu). |
| particules |  |
| furigana | <ruby>辞<rt>じ</rt></ruby><ruby>書<rt>しょ</rt></ruby> |
| exemple | <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> に は <ruby>辞書<rt>じしょ</rt></ruby> が <ruby>大切<rt>たいせつ</rt></ruby> です 。 — Le **dictionnaire** est important pour l'apprentissage du japonais. |

**Mécanique**

- word : `"辞書"`
- readings : `[{"kana":"じしょ","romaji":"jisho","furigana":"<ruby>辞<rt>じ</rt></ruby><ruby>書<rt>しょ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"辞書を引く : chercher dans le dictionnaire."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Dictionnaire** | communication_langage › langues | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- わからない <ruby>漢字<rt>かんじ</rt></ruby> が あった ので、<ruby>辞書<rt>じしょ</rt></ruby> で <ruby>調<rt>しら</rt></ruby>べました — Comme il y avait un kanji que je ne comprenais pas, je l'ai cherché dans le **dictionnaire**.
- <ruby>最近<rt>さいきん</rt></ruby> は、<ruby>紙<rt>かみ</rt></ruby> の <ruby>辞書<rt>じしょ</rt></ruby> だけでなく スマホ の アプリ も よく <ruby>使<rt>つか</rt></ruby>います — Ces derniers temps, j'utilise souvent non seulement les **dictionnaires** en papier, mais aussi des applications sur smartphone.
- この <ruby>辞書<rt>じしょ</rt></ruby> は とても <ruby>便利<rt>べんり</rt></ruby> で、たくさんの <ruby>例文<rt>れいぶん</rt></ruby> が <ruby>載<rt>の</rt></ruby>っています — Ce **dictionnaire** est très pratique et contient de nombreux exemples de phrases.

### n5_v_140 → v_140 · 鉛筆

**Statut** : décision validée

| Champ source | Valeur |
|---|---|
| mot, lecture | 鉛筆 · えんぴつ · enpitsu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › materiel_scolaire |
| sens | Crayon ; Crayon à papier |
| nuance | Nom composé de <ruby>鉛<rt>えん</rt></ruby> (en, plomb) et <ruby>筆<rt>ひつ</rt></ruby> (hitsu, pinceau/style d'écriture). Comme il s'agit d'un objet long et cylindrique, on utilise obligatoirement le suffixe de comptage <ruby>本<rt>ほん</rt></ruby> (hon) pour le dénombrer (<ruby>鉛筆<rt>えんぴつ</rt></ruby> (enpitsu), ex: <ruby>鉛筆<rt>えんぴつ</rt></ruby>を1<ruby>本<rt>いっぽん</rt></ruby><ruby>買<rt>か</rt></ruby>う (enpitsu o ippon kau, acheter un crayon). |
| particules |  |
| furigana | <ruby>鉛<rt>えん</rt></ruby><ruby>筆<rt>ぴつ</rt></ruby> |
| exemple | テスト の とき は ボールペン で は なく <ruby>鉛筆<rt>えんぴつ</rt></ruby> を <ruby>使<rt>つか</rt></ruby>います 。 — Au moment du test, on utilise un **crayon** et non un stylo à Bille. |

**Mécanique**

- word : `"鉛筆"`
- readings : `[{"kana":"えんぴつ","romaji":"enpitsu","furigana":"<ruby>鉛<rt>えん</rt></ruby><ruby>筆<rt>ぴつ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le crayon à papier ; le stylo se dit ペン."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Crayon** (Crayon à papier) | communication_langage › ecriture › ecrire | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- テスト を <ruby>受<rt>う</rt></ruby>ける とき、<ruby>鉛筆<rt>えんぴつ</rt></ruby> と <ruby>消<rt>け</rt></ruby>しゴム を <ruby>使<rt>つか</rt></ruby>います — Lorsque je passe un test, j'utilise un **crayon** et une gomme.
- <ruby>子供<rt>こども</rt></ruby> の <ruby>頃<rt>ころ</rt></ruby>、<ruby>毎日<rt>まいにち</rt></ruby> <ruby>鉛筆<rt>えんぴつ</rt></ruby> で ノート に 漢字 を <ruby>練習<rt>れんしゅう</rt></ruby>しました — Quand j'étais enfant, je pratiquais les kanji tous les jours dans mon cahier avec un **crayon**.
- <ruby>鉛筆<rt>えんぴつ</rt></ruby> の <ruby>先<rt>さき</rt></ruby> が まるくなった ので、<ruby>鉛筆削<rt>えんぴつけず</rt></ruby>り で <ruby>尖<rt>とが</rt></ruby>らせます — La pointe du **crayon** est devenue émoussée, alors je la taille avec un taille-crayon.

### n5_v_170 → v_170 · 字

**Statut** : décision validée

- **A2-04-D0442** (decision, senses) : Deux sens documentés par la source : un caractère écrit, et « le style d'écriture ou la calligraphie d'une personne » (字が上手). Un signe d'une part, une manière d'écrire d'autre part. — avant `["Caractère (écrit)","Lettre","Écriture"]` → après `["S1 Caractère","S2 Écriture (d'une personne)"]`

| Champ source | Valeur |
|---|---|
| mot, lecture | 字 · じ · ji |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › ecriture |
| sens | Caractère (écrit) ; Lettre ; Écriture |
| nuance | Nom désignant un caractère écrit, une lettre de l'alphabet ou un kanji Il qualifie également le style d'écriture ou la calligraphie d'une personne. Comme il s'agit de symboles tracés sur une surface, on utilise le suffixe de comptage <ruby>文字<rt>もじ</rt></ruby> (moji) ou le compteur général pour les dénombrer. |
| particules |  |
| furigana | <ruby>字<rt>じ</rt></ruby> |
| exemple | この <ruby>漢字<rt>かんじ</rt></ruby> は <ruby>字<rt>じ</rt></ruby> が <ruby>大<rt>おお</rt></ruby>きくて <ruby>読<rt>よ</rt></ruby>みやすい です 。 — Ce kanji a de grands **caractères** et est facile à lire. |

**Mécanique**

- word : `"字"`
- readings : `[{"kana":"じ","romaji":"ji","furigana":"<ruby>字<rt>じ</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Caractère** (Lettre) | communication_langage › ecriture › systemes_d_ecriture | information_contenu |  |  |
| 2 | **Écriture (d'une personne)** | communication_langage › ecriture › ecrire | propriete |  | 字が上手だ : avoir une belle écriture. |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>漢字<rt>かんじ</rt></ruby> の <ruby>字<rt>じ</rt></ruby> の <ruby>書<rt>か</rt></ruby>き<ruby>方<rt>かた</rt></ruby> が よく わからない ので、<ruby>教<rt>おし</rt></ruby>えて ください — Je ne comprends pas bien comment écrire ce **caractère** kanji, alors veuillez me l'enseigner.
- ノート に 大きな <ruby>字<rt>じ</rt></ruby> で きれいに <ruby>名前<rt>なまえ</rt></ruby> を 書きました — J'ai écrit mon nom proprement avec de grands **caractères** dans mon cahier.
- <ruby>黒板<rt>こくばん</rt></ruby> の <ruby>字<rt>じ</rt></ruby> が <ruby>小<rt>ちい</rt></ruby>さくて <ruby>読<rt>よ</rt></ruby>みにくい です — Les **caractères** sur le tableau noir sont petits et difficiles à lire.

### n5_v_216 → v_216 · 宿題

**Statut** : décision validée

- **A2-04-D0425** (abandon, senses) : Repris dans la nuance. — avant `["Travail scolaire à la maison"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 宿題 · しゅくだい · shukudai |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › cours |
| sens | Devoirs ; Travail scolaire à la maison |
| nuance | Nom composé de <ruby>宿<rt>しゅく</rt></ruby> (shuku - loger/demeurer) et de <ruby>題<rt>だい</rt></ruby> (dai - sujet/thème), désignant les devoirs à la maison donnés aux élèves. Compteur spécifique : <ruby>個<rt>こ</rt></ruby> (ko) ou <ruby>つ<rt>つ</rt></ruby> (tsu). |
| particules |  |
| furigana | <ruby>宿<rt>しゅく</rt></ruby><ruby>題<rt>だい</rt></ruby> |
| exemple | <ruby>学校<rt>がっこう</rt></ruby> の あと で **<ruby>宿題<rt>しゅくだい</rt></ruby>** を します 。 — Je fais mes **devoirs** après l'école. |

**Mécanique**

- word : `"宿題"`
- readings : `[{"kana":"しゅくだい","romaji":"shukudai","furigana":"<ruby>宿<rt>しゅく</rt></ruby><ruby>題<rt>だい</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le travail donné aux élèves pour la maison."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Devoirs** | education_apprentissage › vie_scolaire_universitaire › devoirs | information_contenu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>学校<rt>がっこう</rt></ruby> から <ruby>帰<rt>かえ</rt></ruby>ってきて、すぐに <ruby>宿題<rt>しゅくだい</rt></ruby> を <ruby>片付<rt>かたづ</rt></ruby>けました — Je suis rentré de l'école et j'ai immédiatement fini mes **devoirs**.
- きょう の <ruby>宿題<rt>しゅくだい</rt></ruby> は <ruby>漢字<rt>かんじ</rt></ruby> の <ruby>練習<rt>れんしゅう</rt></ruby> と <ruby>数学<rt>すうがく</rt></ruby> の <ruby>問題<rt>もんだい</rt></ruby> です — Les **devoirs** d'aujourd'hui sont la pratique des kanji et des problèmes de mathématiques.
- すべて の <ruby>宿題<rt>しゅくだい</rt></ruby> が <ruby>終<rt>お</rt></ruby>わった ので、やっと <ruby>自由<rt>じゆう</rt></ruby>な <ruby>時間<rt>じかん</rt></ruby> に なりました — Tous mes **devoirs** sont terminés, j'ai enfin du temps libre.

### n5_v_513 → v_513 · 意味

**Statut** : décision validée

- **A2-04-D0444** (decision, senses) : Deux sens documentés par la source : « le sens d'un mot, d'une phrase, d'un symbole, ou l'intention / l'utilité derrière une action » (意味がない). — avant `["Signification","Sens","Importance","Portée"]` → après `["S1 Sens (d'un mot)","S2 Intérêt (utilité)"]`
- **A2-04-D0445** (categorie-nulle, sens 2 · category) : Utilité ou raison d'être d'une action : « propriété générale », sans domaine thématique propre. Addendum A5.
- **A2-04-D0446** (abandon, senses) : Termes voisins du sens 2, pas équivalents. — avant `["Importance","Portée"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 意味 · いみ · imi |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | abstrait › concept |
| sens | Signification ; Sens ; Importance ; Portée |
| nuance | **Nom** désignant le sens d'un mot, d'une phrase, d'un symbole, ou l'intention / l'utilité derrière une action. |
| particules |  |
| furigana | <ruby>意<rt>い</rt></ruby><ruby>味<rt>み</rt></ruby> |
| exemple | この ことば の **<ruby>意<rt>い</rt></ruby><ruby>味<rt>み</rt></ruby>** を おしえて ください 。 — Veuillez m'expliquer la **signification** de ce mot. |

**Mécanique**

- word : `"意味"`
- readings : `[{"kana":"いみ","romaji":"imi","furigana":"<ruby>意<rt>い</rt></ruby><ruby>味<rt>み</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Sens** (Signification) | communication_langage › comprehension_linguistique | information_contenu |  | この言葉の意味 : le sens de ce mot. |
| 2 | **Intérêt** (Utilité) | **null** | propriete |  | 意味がない : ça ne sert à rien, ça n'a pas de sens. |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>言葉<rt>ことば</rt></ruby> の <ruby>意味<rt>いみ</rt></ruby> を <ruby>教<rt>おし</rt></ruby>えて ください — Veuillez m'enseigner la **signification** de ce mot.
- その <ruby>質問<rt>しつもん</rt></ruby> は どういう <ruby>意味<rt>いみ</rt></ruby> ですか — Quelle est la **signification** de cette question ? / Qu'entendez-vous par là ?
- <ruby>辞書<rt>じしょ</rt></ruby> を <ruby>使<rt>つか</rt></ruby>って、<ruby>単語<rt>たんご</rt></ruby> の <ruby>意味<rt>いみ</rt></ruby> を <ruby>調<rt>しら</rt></ruby>べます — Je cherche la **signification** du mot en utilisant un dictionnaire.

### n5_v_538 → v_538 · 分かる

**Statut** : décision validée

- **A2-04-D0432** (decision, senses) : Un seul sens, comprendre ; « savoir » et « connaître » relèvent de 知る. — avant `["Comprendre","Savoir","Connaître","Être clair"]` → après `"un seul sens"`
- **A2-04-D0433** (abandon, senses) : Les deux premiers relèvent de 知る ; le troisième est un emploi de comprendre. — avant `["Savoir","Connaître","Être clair"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 分かる · わかる · wakaru |
| type, group | verbe · u |
| catégorie (ancienne, indicative) | actions_generiques › cognition |
| sens | Comprendre ; Savoir ; Connaître ; Être clair |
| nuance | **Verbe intransitif (groupe u)** exprimant la compréhension d'une explication, d'une langue ou le fait de saisir une information (s'emploie généralement avec la particule *ga* pour l'objet compris). |
| particules | が |
| furigana | <ruby>分<rt>わ</rt></ruby>かる |
| exemple | にほんご が すこし **<ruby>分<rt>わ</rt></ruby>かり** ます 。 — Je **comprends** un peu le japonais. |

**Mécanique**

- word : `"分かる"`
- readings : `[{"kana":"わかる","romaji":"wakaru","furigana":"<ruby>分<rt>わ</rt></ruby>かる","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Avec が pour ce qui est compris : 日本語が分かる, comprendre le japonais."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Comprendre** | etre_humain › psychologie_esprit › pensee | etat |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>先生<rt>せんせい</rt></ruby> の <ruby>説明<rt>せつめい</rt></ruby> が よく <ruby>分<rt>わ</rt></ruby>かります — Je **comprends** bien l'explication du professeur.
- この <ruby>漢字<rt>かんじ</rt></ruby> の <ruby>意味<rt>いみ</rt></ruby> が <ruby>分<rt>わ</rt></ruby>かりません — Je ne **comprends** pas la signification de ce kanji.
- <ruby>日本語<rt>にほんご</rt></ruby> が 少し <ruby>分<rt>わ</rt></ruby>かります — Je **comprends** un peu le japonais.

### n5_v_553 → v_553 · 忘れる

**Statut** : décision validée

- **A2-04-D0434** (decision, senses) : Un seul sens : oublier une information ou un objet (« omettre d'emporter ») est le même concept, en japonais comme en français. — avant `["Oublier","Laisser derrière soi","Effacer de sa mémoire"]` → après `"un seul sens"`
- **A2-04-D0435** (abandon, senses) : Le premier est repris dans la nuance ; le second est redondant. — avant `["Laisser derrière soi","Effacer de sa mémoire"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 忘れる · わすれる · wasureru |
| type, group | verbe · ru |
| catégorie (ancienne, indicative) | actions_generiques › cognition |
| sens | Oublier ; Laisser derrière soi ; Effacer de sa mémoire |
| nuance | **Verbe transitif (groupe ichidan / ru)** désignant l'action d'oublier un fait, une information ou d'omettre d'emporter un objet. |
| particules | を |
| furigana | <ruby>忘<rt>わす</rt></ruby>れる |
| exemple | かさ を **<ruby>忘<rt>わす</rt></ruby>れ** まし た 。 — J'ai **oublié** mon parapluie. |

**Mécanique**

- word : `"忘れる"`
- readings : `[{"kana":"わすれる","romaji":"wasureru","furigana":"<ruby>忘<rt>わす</rt></ruby>れる","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"ru"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Un fait comme un objet : 名前を忘れる, oublier un nom ; 傘を忘れる, oublier son parapluie."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Oublier** | etre_humain › psychologie_esprit › memoire | evenement |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>家<rt>いえ</rt></ruby> に <ruby>鍵<rt>かぎ</rt></ruby> を <ruby>忘<rt>わす</rt></ruby>れてしまいました — J'ai **oublié** mes clés à la maison.
- <ruby>大切<rt>たいせつ</rt></ruby> な <ruby>約束<rt>やくそく</rt></ruby> を <ruby>忘<rt>わす</rt></ruby>れない で ください — N'**oubliez** pas la promesse importante.
- きのう の <ruby>宿題<rt>しゅくだい</rt></ruby> を <ruby>忘<rt>わす</rt></ruby>れました — J'ai **oublié** mes devoirs d'hier.

### n5_v_556 → v_556 · 書く

**Statut** : décision validée

- **A2-04-D0450** (correction, senses) : « Tracer un dessin » est le sens de 描く, même lecture (かく) mais autre graphie et autre sens : ce n'est pas un sens de 書く (comme 飛ぶ / 跳ぶ au lot 04). Non repris. — avant `"Tracer (des caractères, un dessin)"` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 書く · かく · kaku |
| type, group | verbe · u |
| catégorie (ancienne, indicative) | actions_generiques › travail |
| sens | Écrire ; Rédiger ; Tracer (des caractères, un dessin) |
| nuance | **Verbe transitif (groupe u)** désignant l'action d'écrire des lettres, des caractères, des notes ou de composer un texte à la main ou sur un support. |
| particules | を |
| furigana | <ruby>書<rt>か</rt></ruby>く |
| exemple | ノート に なまえ を **<ruby>書<rt>か</rt></ruby>き** ます 。 — J'**écris** mon nom sur le cahier. |

**Mécanique**

- word : `"書く"`
- readings : `[{"kana":"かく","romaji":"kaku","furigana":"<ruby>書<rt>か</rt></ruby>く","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Écrire des lettres, des caractères, un texte. Dessiner se dit 描く, même lecture."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Écrire** (Rédiger) | communication_langage › ecriture › ecrire | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- ノート に <ruby>漢字<rt>かんじ</rt></ruby> を <ruby>書<rt>か</rt></ruby>いて います — J'**écris** des kanjis sur mon cahier.
- <ruby>明日<rt>あした</rt></ruby> <ruby>友達<rt>ともだち</rt></ruby> に <ruby>手紙<rt>てがみ</rt></ruby> を <ruby>書<rt>か</rt></ruby>きます — J'**écrirai** une lettre à un ami demain.
- この ペン は とても きれいに <ruby>書<rt>か</rt></ruby>けます — Ce stylo permet d'**écrire** très joliment.

### n5_v_570 → v_570 · 練習

**Statut** : décision validée

- **A2-04-D0423** (decision, suru_compatible) : suru_compatible documenté par la source (« Nom (et verbe suru) »). — avant `null` → après `true`
- **A2-04-D0424** (abandon, senses) : Traduction de 練習する, reprise dans la nuance. — avant `["S'entraîner"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 練習 · れんしゅう · renshuu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | actions_generiques › travail |
| sens | Entraînement ; Exercice ; Pratique ; S'entraîner |
| nuance | **Nom (et verbe suru - groupe suru)** désignant l'action de s'exercer, de répéter ou de pratiquer une activité (sport, musique, langue) pour s'améliorer. |
| particules | を |
| furigana | <ruby>練<rt>れん</rt></ruby><ruby>習<rt>しゅう</rt></ruby> |
| exemple | まいにち にほんご の **<ruby>練<rt>れん</rt></ruby><ruby>習<rt>しゅう</rt></ruby>** を し ます 。 — Je fais de l'**entraînement** de japonais tous les jours. |

**Mécanique**

- word : `"練習"`
- readings : `[{"kana":"れんしゅう","romaji":"renshuu","furigana":"<ruby>練<rt>れん</rt></ruby><ruby>習<rt>しゅう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `true`
- suffix : `false`
- counter : `null`
- nuance : `"練習する : s'entraîner, s'exercer (sport, musique, langue)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Entraînement** (Exercice, Pratique) | education_apprentissage › apprentissage › exercices | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby> <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>練習<rt>れんしゅう</rt></ruby> を して います — Je fais de l'**entraînement** (**de la pratique**) de japonais tous les jours.
- あした の <ruby>試合<rt>しあい</rt></ruby> の ため に、たくさん <ruby>練習<rt>れんしゅう</rt></ruby> しました — Je me suis beaucoup **entraîné** pour le match de demain.
- ピアノ の <ruby>練習<rt>れんしゅう</rt></ruby> は 1<ruby>日<rt>にち</rt></ruby> 1<ruby>時間<rt>じかん</rt></ruby> です — L'**entraînement** de piano dure une heure par jour.

### n5_v_574 → v_574 · 読む

**Statut** : décision validée

- **A2-04-D0451** (abandon, senses) : Pas équivalent. — avant `["Déchiffrer un texte"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 読む · よむ · yomu |
| type, group | verbe · u |
| catégorie (ancienne, indicative) | actions_generiques › travail |
| sens | Lire ; Déchiffrer un texte |
| nuance | **Verbe transitif (groupe u)** désignant l'action de lire un livre, un journal, des kanjis ou tout autre contenu écrit. |
| particules | を |
| furigana | <ruby>読<rt>よ</rt></ruby>む |
| exemple | まいにち としょかん で ほん を **<ruby>読<rt>よ</rt></ruby>み** ます 。 — Je **lis** un livre à la bibliothèque tous les jours. |

**Mécanique**

- word : `"読む"`
- readings : `[{"kana":"よむ","romaji":"yomu","furigana":"<ruby>読<rt>よ</rt></ruby>む","default":true,"note":null}]`
- grammatical_class : `"verbe"`
- group : `"u"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `null`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Lire** | communication_langage › lecture › lire | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- まいあさ <ruby>新聞<rt>しんぶん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>みます — Je **lis** le journal tous les matins.
- <ruby>図書館<rt>としょかん</rt></ruby> で おもしろい <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>みました — J'ai **lu** un livre intéressant à la bibliothèque.
- <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>漢字<rt>かんじ</rt></ruby> が <ruby>上手<rt>じょうず</rt></ruby> に <ruby>読<rt>よ</rt></ruby>めます — Je peux **lire** bien les kanjis japonais.

### n5_v_604 → v_604 · 平仮名

**Statut** : décision validée

- **A2-04-D0440** (decision, word) : Forme usuelle ひらがな (arbitrage du lot 06) : 平仮名 devient une autre graphie. Exception humaine propre à cette ENTRY (liste fermée USUAL_FORM_IDS) ; la règle mécanique générale n'est pas modifiée, et aucune autre entrée n'est traitée ainsi. — avant `"平仮名"` → après `"ひらがな"`
- **A2-04-D0441** (abandon, senses) : Repris dans la nuance. — avant `["Syllabaire japonais cursif"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 平仮名 · ひらがな · hiragana |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecriture |
| sens | Hiragana ; Syllabaire japonais cursif |
| nuance | **Nom** désignant l'un des deux alphabets phonétiques (syllabaires) japonais, caractérisé par des tracés souples et arrondis, utilisé notamment pour la grammaire, les inflexions et les mots d'origine japonaise n'ayant pas de kanji. |
| particules |  |
| furigana | <ruby>平<rt>ひら</rt></ruby><ruby>仮<rt>が</rt></ruby><ruby>名<rt>な</rt></ruby> |
| exemple | この じ は **ひらがな** で かき ます 。 — Ce caractère s'écrit en **hiragana**. |

**Mécanique**

- grammatical_class : `"nom"`
- group : `"nom"`
- word : **exception**, forme usuelle décidée (liste fermée)
- readings : **exception**, dépend de la forme, en exception

**Décision**

- word : `"ひらがな"`
- readings : `[{"kana":"ひらがな","romaji":"hiragana","furigana":"ひらがな","default":true,"note":null}]`
- writings : `[{"form":"平仮名","furigana":"<ruby>平<rt>ひら</rt></ruby><ruby>仮<rt>が</rt></ruby><ruby>名<rt>な</rt></ruby>"}]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"L'un des deux syllabaires japonais, aux tracés arrondis : grammaire, terminaisons, mots sans kanji."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Hiragana** | communication_langage › ecriture › systemes_d_ecriture | information_contenu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>最初<rt>さいしょ</rt></ruby> に ひらがな を <ruby>勉強<rt>べんきょう</rt></ruby> します — On étudie les **hiraganas** au tout début du japonais.
- この <ruby>漢字<rt>かんじ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に ひらがな が <ruby>書<rt>か</rt></ruby>いて あります — Il y a des **hiraganas** écrits au-dessus de ce kanji.
- <ruby>名前<rt>なまえ</rt></ruby> を ひらがな で <ruby>書<rt>か</rt></ruby>いて ください — Veuillez écrire votre nom en **hiraganas**.

### n5_v_622 → v_622 · ペン

**Statut** : décision validée

- **A2-04-D0453** (abandon, senses) : « Plume » relève de 万年筆 ; « Bic » est une marque. — avant `["Plume","Bic"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ペン · ぺん · pen |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › papeterie |
| sens | Stylo ; Plume ; Bic |
| nuance | **Nom** (emprunt de l'anglais *pen*) désignant un stylo à bille ou à encre, par opposition au crayon à papier (*enpitsu* 鉛筆). |
| particules |  |
| furigana | ペン |
| exemple | あか い **ペン** で なまえ を かき ます 。 — J'écris mon nom avec un **stylo** rouge. |

**Mécanique**

- word : `"ペン"`
- readings : `[{"kana":"ぺん","romaji":"pen","furigana":"ペン","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Stylo à bille ou à encre, par opposition au crayon (鉛筆)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Stylo** | communication_langage › ecriture › ecrire | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- 「すみません、ペン を ちょっと <ruby>貸<rt>か</rt></ruby>して ください」 — « Excusez-moi, prêtez-moi un **stylo** un instant s'il vous plaît. »
- <ruby>赤<rt>あか</rt></ruby>い ペン で <ruby>名前<rt>なまえ</rt></ruby> を <ruby>書<rt>か</rt></ruby>いて ください — Veuillez écrire votre nom avec un **stylo** rouge.
- <ruby>筆箱<rt>ふでばこ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に ペン が 3 <ruby>本<rt>ほん</rt></ruby> あります — Il y a trois **stylos** à l'intérieur de la trousse.

### n5_v_625 → v_625 · ボールペン

**Statut** : décision validée

- **A2-04-D0454** (abandon, senses) : Le premier est une marque ; le second est redondant. — avant `["Bic","Stylo bille"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | ボールペン · ぼーるぺん · boorupen |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › papeterie |
| sens | Stylo à bille ; Bic ; Stylo bille |
| nuance | **Nom** (emprunt de l'anglais *ballpoint pen*) désignant spécifiquement un stylo à bille, par opposition aux autres types de stylos ou crayons. |
| particules |  |
| furigana | ボールペン |
| exemple | <strong>ボールペン</strong> で てがみ を かき ます 。 — J'écris une lettre avec un <strong>stylo à bille</strong>. |

**Mécanique**

- word : `"ボールペン"`
- readings : `[{"kana":"ぼーるぺん","romaji":"boorupen","furigana":"ボールペン","default":true,"note":null}]`
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
| 1 | **Stylo à bille** | communication_langage › ecriture › ecrire | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- 「<ruby>黒<rt>くろ</rt></ruby>い ボールペン で <ruby>名前<rt>なまえ</rt></ruby> を <ruby>書<rt>か</rt></ruby>いて ください」 — « Veuillez écrire votre nom avec un stylo à bille noir s'il vous plaît. »
- <ruby>筆箱<rt>ふでばこ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に ボールペン が 2 <ruby>本<rt>ほん</rt></ruby> あります — Il y a deux stylos à bille à l'intérieur de la trousse.
- 「すみません、ボールペン を ちょっと <ruby>貸<rt>か</rt></ruby>して ください」 — « Excusez-moi, prêtez-moi un stylo à bille un instant s'il vous plaît. »

### n5_v_629 → v_629 · 万年筆

**Statut** : décision validée

- **A2-04-D0455** (abandon, senses) : Redondant. — avant `["Stylo à plume"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 万年筆 · まんねんひつ · mannenhitsu |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | objets › papeterie |
| sens | Stylo-plume ; Stylo à plume |
| nuance | **Nom** composé formé littéralement des kanjis « dix mille », « an » et « pinceau/crayon », désignant un stylo-plume traditionnel. Bien que moins courant au quotidien que le stylo à bille, il reste un terme classique des examens. |
| particules |  |
| furigana | <ruby>万<rt>まん</rt></ruby><ruby>年<rt>ねん</rt></ruby><ruby>筆<rt>ひつ</rt></ruby> |
| exemple | **<ruby>万<rt>まん</rt></ruby><ruby>年<rt>ねん</rt></ruby><ruby>筆<rt>ひつ</rt></ruby>** で なまえ を かき ます 。 — J'écris mon nom avec un **stylo-plume**. |

**Mécanique**

- word : `"万年筆"`
- readings : `[{"kana":"まんねんひつ","romaji":"mannenhitsu","furigana":"<ruby>万<rt>まん</rt></ruby><ruby>年<rt>ねん</rt></ruby><ruby>筆<rt>ひつ</rt></ruby>","default":true,"note":null}]`
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
| 1 | **Stylo-plume** | communication_langage › ecriture › ecrire | objet_artefact |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>大切<rt>たいせつ</rt></ruby> な <ruby>手紙<rt>てがみ</rt></ruby> を <ruby>万年筆<rt>まんねんひつ</rt></ruby> で <ruby>書<rt>か</rt></ruby>きます — J'écris une lettre importante avec un **stylo-plume**.
- 「この <ruby>万年筆<rt>まんねんひつ</rt></ruby> は <ruby>父<rt>ちち</rt></ruby> から もらいました」 — « J'ai reçu ce **stylo-plume** de mon père. »
- <ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に <ruby>万年筆<rt>まんねんひつ</rt></ruby> と インク が あります — Il y a un **stylo-plume** et de l'encre sur le bureau.

### n5_v_636 → v_636 · 作文

**Statut** : décision validée

- **A2-04-D0426** (decision, suru_compatible) : suru_compatible non retenu : la source décrit 作文 comme « Nom » seulement ; aucun emploi en する n'est documenté. — avant `null` → après `false`
- **A2-04-D0427** (abandon, senses) : Pas équivalent. — avant `["Dissertation (niveau scolaire)"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 作文 · さくぶん · sakubun |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › travail_scolaire |
| sens | Rédaction ; Composition écrite ; Dissertation (niveau scolaire) |
| nuance | **Nom** composé formé des kanjis « fabriquer/produire » et « phrase/texte », désignant un devoir de rédaction ou une composition écrite rédigée par un élève. |
| particules |  |
| furigana | <ruby>作<rt>さく</rt></ruby><ruby>文<rt>ぶん</rt></ruby> |
| exemple | きょう 、 じゅぎょう で **<ruby>作<rt>さく</rt></ruby><ruby>文<rt>ぶん</rt></ruby>** を かき まし た 。 — Aujourd'hui, j'ai écrit une **rédaction** en cours. |

**Mécanique**

- word : `"作文"`
- readings : `[{"kana":"さくぶん","romaji":"sakubun","furigana":"<ruby>作<rt>さく</rt></ruby><ruby>文<rt>ぶん</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Le devoir de rédaction d'un élève."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Rédaction** (Composition écrite) | education_apprentissage › apprentissage › exercices | information_contenu |  |  |

**Contexte (anciens exemples, lecture seule)**

- きょう の <ruby>宿題<rt>しゅくだい</rt></ruby> は <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>作文<rt>さくぶん</rt></ruby> です — Le devoir d'aujourd'hui est une **rédaction** en japonais.
- 「<ruby>私<rt>わたし</rt></ruby> は <ruby>週末<rt>しゅうまつ</rt></ruby> に <ruby>作文<rt>さくぶん</rt></ruby> を <ruby>書<rt>か</rt></ruby>きました」 — « J'ai écrit une **rédaction** ce week-end. »
- <ruby>先生<rt>せんせい</rt></ruby> が <ruby>作文<rt>さくぶん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>んで います — Le professeur lit la **rédaction**.

### n5_v_647 → v_647 · 勉強

**Statut** : décision validée

- **A2-04-D0421** (decision, suru_compatible) : suru_compatible documenté par la source (« Nom / verbe suru », 勉強する). — avant `null` → après `true`
- **A2-04-D0422** (abandon, senses) : Se dit 宿題. — avant `["Devoirs"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 勉強 · べんきょう · benkyou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › education |
| sens | Étude ; Apprentissage ; Devoirs |
| nuance | **Nom / verbe suru** désignant l'action d'étudier, d'apprendre des leçons ou de travailler une matière. S'emploie très fréquemment avec le verbe *suru* (勉強する) pour signifier « étudier ». |
| particules | を |
| furigana | <ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby> |
| exemple | まいにち にほんご を **<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>** し ます 。 — J'étudie le japonais tous les jours. |

**Mécanique**

- word : `"勉強"`
- readings : `[{"kana":"べんきょう","romaji":"benkyou","furigana":"<ruby>勉<rt>べん</rt></ruby><ruby>強<rt>きょう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `true`
- suffix : `false`
- counter : `null`
- nuance : `"勉強する : étudier ; l'étude en général, plutôt que l'apprentissage auprès d'un maître (習う)."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Étude** (Apprentissage) | education_apprentissage › apprentissage › etudier | action |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>毎日<rt>まいにち</rt></ruby>、<ruby>家<rt>いえ</rt></ruby> で <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> を します — Je fais l'**étude** du japonais tous les jours à la maison.
- 「<ruby>図書館<rt>としょかん</rt></ruby> は <ruby>静<rt>しず</rt></ruby>か ですから、<ruby>勉強<rt>べんきょう</rt></ruby> に <ruby>良<rt>よ</rt></ruby>い です」 — « Comme la bibliothèque est calme, elle est bien pour l'**étude** ('pour étudier'). »
- <ruby>試験<rt>しけん</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> ですから、<ruby>夜遅<rt>よるおそ</rt></ruby>く まで <ruby>勉強<rt>べんきょう</rt></ruby> します — Comme c'est avant l'examen, j'**étudie** tard le soir.

### n5_v_666 → v_666 · 文章

**Statut** : décision validée

- **A2-04-D0443** (abandon, senses) : « Phrase » se dit 文, « composition écrite » 作文 ; « prose » n'est pas équivalent. — avant `["Phrase","Composition écrite","Prose"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 文章 · ぶんしょう · bunshou |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › texte |
| sens | Phrase ; Texte ; Composition écrite ; Prose |
| nuance | **Nom** composé des kanjis signifiant « écriture / phrase » et « chapitre / composition », désignant un texte rédigé, une phrase ou un passage cohérent. |
| particules |  |
| furigana | <ruby>文<rt>ぶん</rt></ruby><ruby>章<rt>しょう</rt></ruby> |
| exemple | この **<ruby>文<rt>ぶん</rt></ruby><ruby>章<rt>しょう</rt></ruby>** を よん で ください 。 — Veuillez lire ce **texte** (cette phrase). |

**Mécanique**

- word : `"文章"`
- readings : `[{"kana":"ぶんしょう","romaji":"bunshou","furigana":"<ruby>文<rt>ぶん</rt></ruby><ruby>章<rt>しょう</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Un texte rédigé, un passage suivi ; une phrase seule se dit 文."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Texte** (Passage) | communication_langage › lecture › texte | information_contenu |  |  |

**Contexte (anciens exemples, lecture seule)**

- この <ruby>文章<rt>ぶんしょう</rt></ruby> の <ruby>意味<rt>いみ</rt></ruby> が よく わかります — Je comprends bien le sens de cette **phrase**.
- 「<ruby>先生<rt>せんせい</rt></ruby> は <ruby>黒板<rt>こくばん</rt></ruby> に <ruby>長<rt>なが</rt></ruby>い <ruby>文章<rt>ぶんしょう</rt></ruby> を <ruby>書<rt>か</rt></ruby>きました」 — « Le professeur a écrit une longue **phrase** sur le tableau noir. »
- <ruby>辞書<rt>じしょ</rt></ruby> を <ruby>使<rt>つか</rt></ruby>って、この <ruby>文章<rt>ぶんしょう</rt></ruby> を <ruby>翻訳<rt>ほんやく</rt></ruby> します — J'utilise le dictionnaire pour traduire cette **phrase**.

### n5_v_682 → v_682 · 漢字

**Statut** : décision validée

- **A2-04-D0439** (abandon, senses) : Repris dans la nuance. — avant `["Caractères chinois utilisés en japonais"]` → après `null`

| Champ source | Valeur |
|---|---|
| mot, lecture | 漢字 · かんじ · kanji |
| type, group | nom · nom |
| catégorie (ancienne, indicative) | ecole_apprentissage › ecriture |
| sens | Kanji ; Caractères chinois utilisés en japonais |
| nuance | **Nom** composé des kanjis signifiant « dynastie Han / Chine » et « caractère / lettre », désignant les caractères d'origine chinoise adoptés dans le système d'écriture japonais. |
| particules |  |
| furigana | <ruby>漢<rt>かん</rt></ruby><ruby>字<rt>じ</rt></ruby> |
| exemple | まいにち **<ruby>漢<rt>かん</rt></ruby><ruby>字<rt>じ</rt></ruby>** を べんきょう し ます 。 — J'étudie les **kanjis** tous les jours. |

**Mécanique**

- word : `"漢字"`
- readings : `[{"kana":"かんじ","romaji":"kanji","furigana":"<ruby>漢<rt>かん</rt></ruby><ruby>字<rt>じ</rt></ruby>","default":true,"note":null}]`
- grammatical_class : `"nom"`
- group : `"nom"`

**Décision**

- writings : `[]`
- suru_compatible : `false`
- suffix : `false`
- counter : `null`
- nuance : `"Les caractères d'origine chinoise de l'écriture japonaise."`
- tags : `[]`

| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |
|---|---|---|---|---|---|
| 1 | **Kanji** (Caractère chinois) | communication_langage › ecriture › systemes_d_ecriture | information_contenu |  |  |

**Contexte (anciens exemples, lecture seule)**

- <ruby>日本語<rt>にほんご</rt></ruby> の <ruby>新聞<rt>しんぶん</rt></ruby> で <ruby>難<rt>むずか</rt></ruby>しい <ruby>漢字<rt>かんじ</rt></ruby> を <ruby>読<rt>よ</rt></ruby>みます — Je lis des **kanjis** difficiles dans le journal japonais.
- 「この <ruby>漢字<rt>かんじ</rt></ruby> の <ruby>書<rt>か</rt></ruby>き<ruby>方<rt>かた</rt></ruby> を ノート に <ruby>練習<rt>れんしゅう</rt></ruby> します」 — « Je m'exerce à écrire la manière d'écrire ce **kanji** dans mon cahier. »
- テスト の <ruby>前<rt>まえ</rt></ruby> に たくさんの <ruby>漢字<rt>かんじ</rt></ruby> を <ruby>覚<rt>おぼ</rt></ruby>えました — J'ai mémorisé beaucoup de **kanjis** avant le test.
