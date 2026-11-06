# Groupe E, livraison E3 — les 45 fiches sources complètes, leurs anciens exemples, les 43 ENTRY publiées et leurs décisions

Recopiés tels quels, sans retouche, dans l'ordre du périmètre :
- fiches de `reconstruction/a2-04/sources/vocab.json` (sources figées) ;
- anciens exemples de `reconstruction/a2-04/sources/exemples.json` (clé `vocab`) ;
- ENTRY de `data/n5/vocab.json` ;
- décisions de journal de chaque ENTRY, de `reconstruction/a2-04/journal.json`, en entier.

Empreintes des fichiers lus :
- `reconstruction/a2-04/sources/vocab.json` `1f7a039630d3a547`
- `reconstruction/a2-04/sources/vocab-hors-jlpt.json` `31198b2557c56925`
- `reconstruction/a2-04/sources/exemples.json` `a8ecf995970462b1`
- `data/n5/vocab.json` `c8cd0f6fc3a5edfd`
- `data/vocab-hors-jlpt.json` `8ebea7443deb8314`
- `reconstruction/a2-04/journal.json` `6f3eadf048b14ef0`

## 差す — `v_50`

### Fiche source `n5_v_50`

```json
{
 "id": "n5_v_50",
 "level": "N5",
 "word": "差す",
 "word_furigana": "<ruby>差<rt>さ</rt></ruby>す",
 "reading": "さす",
 "romaji": "sasu",
 "meanings": {
  "primary": "Ouvrir (un parapluie)",
  "secondary": [
   "Lever (une main, un parasol)",
   "Pointer",
   "Verser (des gouttes)"
  ]
 },
 "nuance": "Verbe godan employé spécifiquement pour l'action d'ouvrir et de tenir un parapluie au-dessus de soi (<ruby>傘<rt>かさ</rt></ruby>を<ruby>差<rt>さ</rt></ruby>す, kasa o sasu), ou de tendre la main ou pointer quelque chose.",
 "type": "verbe godan",
 "group": "u",
 "category": "cactions_generiques",
 "subcategory": "actions_objets",
 "kanji_list": [
  "差"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "<ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>ってきた ので 、<ruby>傘<rt>かさ</rt></ruby> を <ruby>差<rt>さ</rt></ruby>します 。",
  "romaji": "ame ga futtekita node, kasa o sashimasu.",
  "french": "La pluie s'étant mise à tomber, j'**ouvre** un parapluie.",
  "highlight": [
   "差します",
   "sashimasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_50` (3)

```json
[
 {
  "japanese": "<ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>って きた ので、かさ を <ruby>差<rt>さ</rt></ruby>しました",
  "romaji": "ame ga futte kita node, kasa o sashimashita.",
  "french": "Il s'est mis à pleuvoir, alors j'ai **ouvert** (levé) un parapluie.",
  "highlight": [
   "差す",
   "sasu"
  ]
 },
 {
  "japanese": "<ruby>外<rt>そと</rt></ruby> は <ruby>日<rt>ひ</rt></ruby> が <ruby>強<rt>つよ</rt></ruby>い ので、<ruby>日傘<rt>ひがさ</rt></ruby> を <ruby>差<rt>さ</rt></ruby>した <ruby>方<rt>ほう</rt></ruby> が いい です",
  "romaji": "soto wa hi ga tsuyoi node, higasa o sashita hou ga ii desu.",
  "french": "Le soleil tape fort dehors, il vaut mieux **ouvrir** une ombrelle.",
  "highlight": [
   "差す",
   "sasu"
  ]
 },
 {
  "japanese": "<ruby>急<rt>きゅう</rt></ruby> に <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>り<ruby>出<rt>だ</rt></ruby>した ので、みんなが<ruby>一斉<rt>いっせい</rt></ruby>に かさ を <ruby>差<rt>さ</rt></ruby>した",
  "romaji": "kyuu ni ame ga furidashita node, minna ga issei ni kasa o sashita.",
  "french": "La pluie s'étant mise à tomber soudainement, tout le monde a **ouvert** son parapluie en même temps.",
  "highlight": [
   "差す",
   "sasu"
  ]
 }
]
```

### ENTRY publiée `v_50`

```json
{
 "id": "v_50",
 "level": "N5",
 "word": "差す",
 "writings": [],
 "readings": [
  {
   "kana": "さす",
   "romaji": "sasu",
   "furigana": "<ruby>差<rt>さ</rt></ruby>す",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "La source donne aussi la traduction « verser (des gouttes) », sans la développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_50_s1",
   "meaning": {
    "primary": "Ouvrir (un parapluie)",
    "alternatives": []
   },
   "category": {
    "level_1": "habillement_accessoires_personnels",
    "level_2": "accessoires_vestimentaires"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "傘を差す : ouvrir un parapluie et le tenir au-dessus de soi. 雨が降ってきたので、傘を差します (la pluie s'étant mise à tomber, j'ouvre un parapluie)."
  },
  {
   "id": "v_50_s2",
   "meaning": {
    "primary": "Pointer",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Tendre la main, ou pointer quelque chose."
  }
 ]
}
```

### Décisions de journal de `v_50` (4)

```json
[
 {
  "id": "A2-04-D1216",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_50",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Ouvrir (un parapluie)",
   "Lever (une main, un parasol)",
   "Pointer",
   "Verser (des gouttes)"
  ],
  "after": [
   "S1 Ouvrir (un parapluie)",
   "S2 Pointer"
  ],
  "reason": "Deux sens documentés par la fiche : l'emploi qu'elle dit « spécifique », « ouvrir et tenir un parapluie au-dessus de soi (傘を差す) », que l'exemple illustre, et « tendre la main ou pointer quelque chose » ; un parapluie que l'on tient ouvert, et une chose que l'on désigne ; deux référents. Particule を de la fiche pour chacun. Le sens 1 est dans la catégorie de 傘 (lot 05), habillement › accessoires vestimentaires. Sens 2 candidat ; alternative : un seul sens, le second emploi passant en nuance."
 },
 {
  "id": "A2-04-D1217",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_50",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Tendre la main ou pointer quelque chose : action générale, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1218",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_50",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Lever (une main, un parasol)"
  ],
  "after": null,
  "reason": "La parenthèse réunit les deux emplois : le parasol relève du sens 1 (un parapluie que l'on tient ouvert), la main du sens 2, où la nuance la reprend (« tendre la main »)."
 },
 {
  "id": "A2-04-D1219",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_50",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Verser (des gouttes)"
  ],
  "after": null,
  "reason": "La nuance de la fiche ne développe pas cet emploi. Signalée en nuance comme traduction de la source non développée, comme pour 厚い (lot 15) et 温い (lot 17)."
 }
]
```

## 押す — `v_79`

### Fiche source `n5_v_79`

```json
{
 "id": "n5_v_79",
 "level": "N5",
 "word": "押す",
 "word_furigana": "<ruby>押<rt>お</rt></ruby>す",
 "reading": "おす",
 "romaji": "osu",
 "meanings": {
  "primary": "Pousser",
  "secondary": [
   "Appuyer sur (un bouton)",
   "Tamponner"
  ]
 },
 "nuance": "Verbe godan très courant au quotidien, désignant l'action de pousser un objet, d'appuyer sur un bouton, ou d'appliquer un tampon/sceau.",
 "type": "verbe godan",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "actions_objets",
 "kanji_list": [
  "押"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "ドア の ボタン を <ruby>押<rt>お</rt></ruby>して 、<ruby>電車<rt>でんしゃ</rt></ruby> を <ruby>降<rt>お</rt></ruby>ります 。",
  "romaji": "doa no botan o oshite, densha o orimasu.",
  "french": "J'**appuie** sur le bouton de la porte pour descendre du train.",
  "highlight": [
   "押して",
   "oshite"
  ]
 }
}
```

### Anciens exemples de `n5_v_79` (3)

```json
[
 {
  "japanese": "ドア を <ruby>押<rt>お</rt></ruby>して <ruby>中<rt>なか</rt></ruby> に <ruby>入<rt>はい</rt></ruby>ってください",
  "romaji": "doa o oshite naka ni haitte kudasai.",
  "french": "Veuillez **pousser** la porte pour entrer.",
  "highlight": [
   "押す",
   "osu"
  ]
 },
 {
  "japanese": "この ボタン を <ruby>押<rt>お</rt></ruby>すと、お<ruby>湯<rt>ゆ</rt></ruby> が <ruby>出<rt>で</rt></ruby>ます",
  "romaji": "kono botan o osuto, oyu ga demasu.",
  "french": "Si vous **poussez** ce bouton, de l'eau chaude coulera.",
  "highlight": [
   "押す",
   "osu"
  ]
 },
 {
  "japanese": "<ruby>重<rt>おも</rt></ruby>い <ruby>荷物<rt>にもつ</rt></ruby> を <ruby>前<rt>まえ</rt></ruby> に <ruby>押<rt>お</rt></ruby>しながら <ruby>歩<rt>ある</rt></ruby>きます",
  "romaji": "omoi nimotsu o mae ni oshinagara arukimasu.",
  "french": "Je marche en **poussant** un lourd bagage vers l'avant.",
  "highlight": [
   "押す",
   "osu"
  ]
 }
]
```

### ENTRY publiée `v_79`

```json
{
 "id": "v_79",
 "level": "N5",
 "word": "押す",
 "writings": [],
 "readings": [
  {
   "kana": "おす",
   "romaji": "osu",
   "furigana": "<ruby>押<rt>お</rt></ruby>す",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Pousser un objet, appuyer sur un bouton, ou apposer un tampon ou un sceau. ドアのボタンを押して、電車を降ります (j'appuie sur le bouton de la porte pour descendre du train).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_79_s1",
   "meaning": {
    "primary": "Pousser",
    "alternatives": [
     "Appuyer sur (un bouton)",
     "Tamponner"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_79` (2)

```json
[
 {
  "id": "A2-04-D1207",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_79",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Pousser",
   "Appuyer sur (un bouton)",
   "Tamponner"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens proposé : la fiche réunit dans une même description « pousser un objet, appuyer sur un bouton, ou appliquer un tampon/sceau », trois objets pour un même geste, exercer une pression. Un emploi avec un objet ne produit pas automatiquement un sens (lot 14). L'exemple porte sur le bouton ; il est conservé en nuance avec les trois emplois. Alternative laissée à l'arbitrage : un second sens pour le tampon."
 },
 {
  "id": "A2-04-D1208",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_79",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Pousser un objet, appuyer sur un bouton ou apposer un tampon : action générale, sans domaine thématique propre. Addendum A5."
 }
]
```

## 曇る — `v_80`

### Fiche source `n5_v_80`

```json
{
 "id": "n5_v_80",
 "level": "N5",
 "word": "曇る",
 "word_furigana": "<ruby>曇<rt>くも</rt></ruby>る",
 "reading": "くもる",
 "romaji": "kumoru",
 "meanings": {
  "primary": "Devenir nuageux",
  "secondary": [
   "Se couvrir (ciel)",
   "S'embuer (lunettes, vitre)"
  ]
 },
 "nuance": "Verbe godan désignant le fait que le ciel se couvre de nuages, ou par extension qu'une surface vitrée ou des lunettes s'embuent.",
 "type": "verbe godan",
 "group": "u",
 "category": "vetements",
 "subcategory": "meteo",
 "kanji_list": [
  "曇"
 ],
 "particles": [],
 "example": {
  "japanese": "<ruby>朝<rt>あさ</rt></ruby> は <ruby>晴<rt>は</rt></ruby>れていた のに 、<ruby>昼<rt>ひる</rt></ruby> から <ruby>曇<rt>くも</rt></ruby>って きました 。",
  "romaji": "asa wa hareteita noni, hiru kara kumotte kimashita.",
  "french": "Le temps était clair ce matin, mais il a **commencé à se couvrir** depuis midi.",
  "highlight": [
   "曇って",
   "kumotte"
  ]
 }
}
```

### Anciens exemples de `n5_v_80` (3)

```json
[
 {
  "japanese": "<ruby>朝<rt>あさ</rt></ruby> は <ruby>晴<rt>は</rt></ruby>れていた のに、<ruby>午後<rt>ごご</rt></ruby> から <ruby>空<rt>そら</rt></ruby> が <ruby>曇<rt>くも</rt></ruby>って きました",
  "romaji": "asa wa harete ita noni, gogo kara sora ga kumotte kimashita.",
  "french": "Il faisait beau ce matin, mais le ciel s'est **couvert** (nuageux) à partir de l'après-midi.",
  "highlight": [
   "曇る",
   "kumoru"
  ]
 },
 {
  "japanese": "<ruby>天気<rt>てんき</rt></ruby> が <ruby>曇<rt>くも</rt></ruby>って いる ので、<ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>る かもしれません",
  "romaji": "tenki ga kumotte iru node, ame ga furu kamoshiremasen.",
  "french": "Le temps est **couvert**, il est donc possible qu'il pleuve.",
  "highlight": [
   "曇る",
   "kumoru"
  ]
 },
 {
  "japanese": "<ruby>眼鏡<rt>めがね</rt></ruby> が <ruby>曇<rt>くも</rt></ruby>って、よく <ruby>見<rt>み</rt></ruby>えなく なりました",
  "romaji": "megane ga kumotte, yoku mienakuりました.",
  "french": "Mes **lunettes** se sont **embuées** et je ne vois plus très bien.",
  "highlight": [
   "曇る",
   "kumoru"
  ]
 }
]
```

### ENTRY publiée `v_80`

```json
{
 "id": "v_80",
 "level": "N5",
 "word": "曇る",
 "writings": [],
 "readings": [
  {
   "kana": "くもる",
   "romaji": "kumoru",
   "furigana": "<ruby>曇<rt>くも</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_80_s1",
   "meaning": {
    "primary": "Se couvrir (le ciel)",
    "alternatives": [
     "Devenir nuageux"
    ]
   },
   "category": {
    "level_1": "monde_naturel",
    "level_2": "meteo",
    "level_3": "nuages"
   },
   "semantic_type": "processus",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  },
  {
   "id": "v_80_s2",
   "meaning": {
    "primary": "S'embuer",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "processus",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "めがねが曇る : les lunettes s'embuent."
  }
 ]
}
```

### Décisions de journal de `v_80` (2)

```json
[
 {
  "id": "A2-04-D0465",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-07",
  "entry": "n5_v_80",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Devenir nuageux",
   "Se couvrir (ciel)",
   "S'embuer (lunettes, vitre)"
  ],
  "after": [
   "S1 Se couvrir (le ciel)",
   "S2 S'embuer"
  ],
  "reason": "Deux sens documentés par la source (« le ciel se couvre… ou par extension qu'une surface vitrée ou des lunettes s'embuent ») : un phénomène météorologique, et un phénomène touchant un objet, avec des sujets distincts (空, めがね). À ARBITRER : on peut aussi n'en garder qu'un, l'extension allant dans la nuance."
 },
 {
  "id": "A2-04-D0466",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-07",
  "entry": "n5_v_80",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Une surface qui s'embue : phénomène physique général, sans domaine thématique propre. Addendum A5."
 }
]
```

## 引く — `v_130`

### Fiche source `n5_v_130`

```json
{
 "id": "n5_v_130",
 "level": "N5",
 "word": "引く",
 "word_furigana": "<ruby>引<rt>ひ</rt></ruby>く",
 "reading": "ひく",
 "romaji": "hiku",
 "meanings": {
  "primary": "Tirer",
  "secondary": [
   "Tracer (une ligne)",
   "Chercher (dans un dictionnaire)",
   "Jouer d'un instrument à cordes"
  ]
 },
 "nuance": "Verbe d'action polyvalent. Son sens premier est de tirer. Il s'utilise aussi dans des expressions, comme feuilleter ou chercher dans un dictionnaire <ruby>辞書<rt>じしょ</rt></ruby>を<ruby>引<rt>ひ</rt></ruby>く(jisho o hiku), ou encore jouer d'un instrument à cordes ou du piano.",
 "type": "verbe godan",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "actions_objets",
 "kanji_list": [
  "引"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "わからない <ruby>言葉<rt>ことば</rt></ruby> を <ruby>辞書<rt>じしょ</rt></ruby> で <ruby>引<rt>ひ</rt></ruby>きます 。",
  "romaji": "wakaranai kotoba o jisho de hikimasu.",
  "french": "Je **cherche** un mot que je ne connais pas dans le dictionnaire.",
  "highlight": [
   "引きます",
   "hikimasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_130` (3)

```json
[
 {
  "japanese": "<ruby>扉<rt>とびら</rt></ruby>を<ruby>開<rt>あ</rt></ruby>けるために、ノブをしっかり<ruby>引<rt>ひ</rt></ruby>いてください",
  "romaji": "tobira o akeru tame ni, nobu o shikkari hiite kudasai.",
  "french": "Pour ouvrir la porte, veuillez **tirer** fermement sur la poignée.",
  "highlight": [
   "引く",
   "hiku"
  ]
 },
 {
  "japanese": "<ruby>子供<rt>こども</rt></ruby>が<ruby>母親<rt>ははおや</rt></ruby>のスカートの<ruby>裾<rt>すそ</rt></ruby>をぴょんと<ruby>引<rt>ひ</rt></ruby>っぱりました",
  "romaji": "kodomo ga hahaoya no sukaato no suso o pyonto hipparimashita.",
  "french": "L'enfant a **tiré** brusquement sur l'ourlet de la jupe de sa mère.",
  "highlight": [
   "引く",
   "hiku"
  ]
 },
 {
  "japanese": "<ruby>辞典<rt>じてん</rt></ruby>で<ruby>分<rt>わ</rt></ruby>からない<ruby>言葉<rt>ことば</rt></ruby>を<ruby>引<rt>ひ</rt></ruby>いて、<ruby>意味<rt>いみ</rt></ruby>を<ruby>調<rt>しら</rt></ruby>べます",
  "romaji": "jiten de wakaranai kotoba o hiite, imi o shirabemasu.",
  "french": "**Chercher** (consulter) un mot incompréhensible dans le dictionnaire pour en vérifier le sens.",
  "highlight": [
   "引く",
   "hiku"
  ]
 }
]
```

### ENTRY publiée `v_130`

```json
{
 "id": "v_130",
 "level": "N5",
 "word": "引く",
 "writings": [],
 "readings": [
  {
   "kana": "ひく",
   "romaji": "hiku",
   "furigana": "<ruby>引<rt>ひ</rt></ruby>く",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Jouer d'un instrument à cordes ou du piano s'écrit 弾く, de même lecture : c'est un autre mot. La source donne aussi la traduction « tracer (une ligne) », sans la développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_130_s1",
   "meaning": {
    "primary": "Tirer",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Le sens premier du verbe."
  },
  {
   "id": "v_130_s2",
   "meaning": {
    "primary": "Chercher (dans un dictionnaire)",
    "alternatives": []
   },
   "category": {
    "level_1": "communication_langage",
    "level_2": "langues"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "辞書を引く : chercher un mot dans un dictionnaire, le feuilleter. わからない言葉を辞書で引きます (je cherche dans le dictionnaire un mot que je ne connais pas)."
  }
 ]
}
```

### Décisions de journal de `v_130` (5)

```json
[
 {
  "id": "A2-04-D1209",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_130",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Tirer",
   "Tracer (une ligne)",
   "Chercher (dans un dictionnaire)",
   "Jouer d'un instrument à cordes"
  ],
  "after": [
   "S1 Tirer",
   "S2 Chercher (dans un dictionnaire)"
  ],
  "reason": "Deux sens documentés par la fiche : « son sens premier est de tirer », et l'expression 辞書を引く, « feuilleter ou chercher dans un dictionnaire », que l'exemple de la fiche illustre ; un objet que l'on tire, et un mot que l'on cherche ; deux référents. Particule を de la fiche pour chacun (l'exemple marque le dictionnaire par で, que la fiche ne donne pas parmi ses particules : rien n'est ajouté). Sens 2 candidat ; alternative : un seul sens, l'expression passant en nuance."
 },
 {
  "id": "A2-04-D1210",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_130",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Jouer d'un instrument à cordes"
  ],
  "after": null,
  "reason": "Confusion de la source, écartée (arbitrage du périmètre du lot 18) : la fiche attribue à 引く l'emploi « jouer d'un instrument à cordes ou du piano », qui est celui de 弾く, de même lecture. 弾く (n5_v_192) est validée au lot 09 avec ce sens, sa nuance dit que 引く est « un autre mot », et D0545 notait déjà qu'aucun sens n'y était repris de l'homophone. Aucun sens musical n'est créé pour 引く ; un renvoi vers 弾く est conservé en nuance. Une confusion de la source est corrigée et journalisée, pas transformée en sens."
 },
 {
  "id": "A2-04-D1211",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_130",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Tracer (une ligne)"
  ],
  "after": null,
  "reason": "La nuance de la fiche ne développe pas cet emploi. Signalée en nuance comme traduction de la source non développée, comme pour 厚い (lot 15) et 温い (lot 17)."
 },
 {
  "id": "A2-04-D1212",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_130",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Tirer quelque chose : action générale, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1213",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_130",
  "field": "sens 2 · category",
  "kind": "decision",
  "before": null,
  "after": "communication_langage › langues",
  "reason": "Chercher un mot dans un dictionnaire : communication et langage › langues, au niveau 2, la catégorie de 辞書 (lot 06). Alternative laissée à l'arbitrage : éducation et apprentissage › apprentissage."
 }
]
```

## かける — `v_164`

### Fiche source `n5_v_164`

```json
{
 "id": "n5_v_164",
 "level": "N5",
 "word": "かける",
 "word_furigana": "かける",
 "reading": "かける",
 "romaji": "kakeru",
 "meanings": {
  "primary": "Téléphoner",
  "secondary": [
   "Passer un appel",
   "Mettre (des lunettes)",
   "Accrocher"
  ]
 },
 "nuance": "Verbe ichidan d'une polyvalence extrême dont le sens dépend entièrement du nom auquel il est associé. S'écrit majoritairement en hiragana à ce niveau. Son sens s'oriente vers le fait de projeter ou d'appliquer quelque chose sur un support, comme une action vers autrui ou l'installation de lunettes sur le visage.",
 "type": "verbe ichidan",
 "group": "ru",
 "category": "communication",
 "subcategory": "telephone",
 "kanji_list": [],
 "particles": [
  "を",
  "に"
 ],
 "example": {
  "japanese": "<ruby>母<rt>はは</rt></ruby> に <ruby>電話<rt>でんわ</rt></ruby> を かけます 。",
  "romaji": "haha ni denwa o kakemasu.",
  "french": "Je **téléphone** à ma mère.",
  "highlight": [
   "かけます",
   "kakemasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_164` (3)

```json
[
 {
  "japanese": "<ruby>今夜<rt>こんや</rt></ruby>、<ruby>実家<rt>じっか</rt></ruby> の <ruby>両親<rt>りょうしん</rt></ruby> に <ruby>電話<rt>でんわ</rt></ruby> を かけます",
  "romaji": "konya, jikka no ryoushin ni denwa o kakemasu.",
  "french": "Ce soir, je **téléphonerai** (passerai un coup de fil) à mes parents dans ma famille d'origine.",
  "highlight": [
   "かける",
   "kakeru"
  ]
 },
 {
  "japanese": "<ruby>出<rt>で</rt></ruby>かける <ruby>前<rt>まえ</rt></ruby> に、<ruby>部屋<rt>へや</rt></ruby> の <ruby>鍵<rt>かぎ</rt></ruby> を かけました",
  "romaji": "dekakeru mae ni, heya no kagi o kakemashita.",
  "french": "Avant de sortir, j'ai **fermé à clé** (mis la clé) ma chambre.",
  "highlight": [
   "かける",
   "kakeru"
  ]
 },
 {
  "japanese": "<ruby>椅子<rt>いす</rt></ruby> に <ruby>腰<rt>こし</rt></ruby> を かけて、すこし <ruby>休<rt>やす</rt></ruby>みましょう",
  "romaji": "isu ni koshi o kakete, sukoshi yasumimashou.",
  "french": "**Asseyons-nous** (posons nos hanches) sur la chaise et reposons-nous un peu.",
  "highlight": [
   "かける",
   "kakeru"
  ]
 }
]
```

### ENTRY publiée `v_164`

```json
{
 "id": "v_164",
 "level": "N5",
 "word": "かける",
 "writings": [],
 "readings": [
  {
   "kana": "かける",
   "romaji": "kakeru",
   "furigana": "かける",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Verbe très polyvalent, dont le sens dépend du nom qui l'accompagne ; s'écrit d'ordinaire en hiragana à ce niveau.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_164_s1",
   "meaning": {
    "primary": "Passer (un appel)",
    "alternatives": [
     "Téléphoner"
    ]
   },
   "category": {
    "level_1": "communication_langage",
    "level_2": "communication",
    "level_3": "contact"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "に",
    "を"
   ],
   "nuance": "電話をかける : téléphoner ; 友達に電話をかける."
  },
  {
   "id": "v_164_s2",
   "meaning": {
    "primary": "Mettre (des lunettes)",
    "alternatives": []
   },
   "category": {
    "level_1": "habillement_accessoires_personnels",
    "level_2": "accessoires_vestimentaires"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "めがねをかける : mettre ses lunettes."
  },
  {
   "id": "v_164_s3",
   "meaning": {
    "primary": "Accrocher",
    "alternatives": [
     "Suspendre"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "に",
    "を"
   ],
   "nuance": "壁に絵をかける : accrocher un tableau au mur."
  }
 ]
}
```

### Décisions de journal de `v_164` (2)

```json
[
 {
  "id": "A2-04-D0520",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-08",
  "entry": "n5_v_164",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Téléphoner",
   "Passer un appel",
   "Mettre (des lunettes)",
   "Accrocher"
  ],
  "after": [
   "S1 Passer (un appel)",
   "S2 Mettre (des lunettes)",
   "S3 Accrocher"
  ],
  "reason": "Trois sens, et seulement ceux que la source documente : téléphoner, mettre des lunettes, accrocher. Aucun autre emploi de かける n'est ajouté. Aucune graphie en kanji : la source dit qu'il s'écrit en hiragana à ce niveau."
 },
 {
  "id": "A2-04-D0521",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-08",
  "entry": "n5_v_164",
  "field": "sens 3 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Accrocher, suspendre un objet : action générale, sans domaine thématique propre. Addendum A5."
 }
]
```

## する — `v_181`

### Fiche source `n5_v_181`

```json
{
 "id": "n5_v_181",
 "level": "N5",
 "word": "する",
 "word_furigana": "する",
 "reading": "する",
 "romaji": "suru",
 "meanings": {
  "primary": "Faire",
  "secondary": [
   "Coûter (pour un prix)",
   "Valoir"
  ]
 },
 "nuance": "Verbe irrégulier fondamental (groupe 3). En dehors de son sens principal de 'faire', il change de sens lorsqu'il est placé immédiatement après un montant financier pour indiquer le prix ou la valeur qu'affiche un objet.",
 "type": "verbe irrégulier",
 "group": "irrégulier",
 "category": "actions_generiques",
 "subcategory": "prix",
 "kanji_list": [],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "この ノート は 200<ruby>円<rt>えん</rt></ruby> します 。",
  "romaji": "kono nooto wa nihyaku en shimasu.",
  "french": "Ce carnet **coûte** 200 yens.",
  "highlight": [
   "します",
   "shimasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_181` (3)

```json
[
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> の <ruby>午後<rt>ごご</rt></ruby>、<ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby> に <ruby>宿題<rt>しゅくだい</rt></ruby> を **する** <ruby>予定<rt>よてい</rt></ruby> です",
  "romaji": "ashita no gogo, tomodachi to issho ni shukudai o suru yotei desu.",
  "french": "Demain après-midi, j'ai l'intention de **faire** mes devoirs avec un ami.",
  "highlight": [
   "する",
   "suru"
  ]
 },
 {
  "japanese": "この <ruby>仕事<rt>しごと</rt></ruby> を **する** の に は、たくさんの <ruby>時間<rt>じかん</rt></ruby> と <ruby>労力<rt>ろうりょく</rt></ruby> が かかります",
  "romaji": "kono shigoto o suru no ni wa, takusan no jikan to rouryoku ga kakarimasu.",
  "french": "Pour **faire** ce travail, cela prend beaucoup de temps et d'efforts.",
  "highlight": [
   "する",
   "suru"
  ]
 },
 {
  "japanese": "<ruby>週末<rt>しゅうまつ</rt></ruby> に は <ruby>部屋<rt>へや</rt></ruby> の <ruby>掃除<rt>そうじ</rt></ruby> を **して**から、ゆっくり <ruby>休<rt>やす</rt></ruby>みます",
  "romaji": "shuumatsu ni wa heya no souji o shite kara, yukkuri yasumimasu.",
  "french": "Le week-end, après avoir **fait** le ménage de ma chambre, je me reposerai tranquillement.",
  "highlight": [
   "する",
   "suru"
  ]
 }
]
```

### ENTRY publiée `v_181`

```json
{
 "id": "v_181",
 "level": "N5",
 "word": "する",
 "writings": [],
 "readings": [
  {
   "kana": "する",
   "romaji": "suru",
   "furigana": "する",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "irrégulier",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_181_s1",
   "meaning": {
    "primary": "Faire",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [
    {
     "type": "equivalent_to",
     "target": "v_608_s1"
    }
   ],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Le sens principal du verbe."
  },
  {
   "id": "v_181_s2",
   "meaning": {
    "primary": "Coûter (pour un prix)",
    "alternatives": [
     "Valoir"
    ]
   },
   "category": {
    "level_1": "economie_commerce",
    "level_2": "prix_valeur_economique",
    "level_3": "prix"
   },
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Placé immédiatement après un montant, indique le prix ou la valeur d'un objet : このノートは200円します (ce carnet coûte 200 yens)."
  }
 ]
}
```

### Décisions de journal de `v_181` (5)

```json
[
 {
  "id": "A2-04-D1330",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_181",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Faire",
   "Coûter (pour un prix)",
   "Valoir"
  ],
  "after": [
   "S1 Faire",
   "S2 Coûter (après un montant)"
  ],
  "reason": "Deux sens documentés par la fiche : « son sens principal de faire », et le sens qu'il prend « lorsqu'il est placé immédiatement après un montant financier pour indiquer le prix ou la valeur qu'affiche un objet », que l'exemple illustre ; une chose que l'on fait, et un prix ; deux référents, et deux types : une action, et une propriete (arbitrage des choix du lot 20) : le prix ou la valeur qu'affiche un objet est une caractéristique que l'on attribue à cet objet, au sens d'A2-ST, plutôt qu'une condition dans laquelle il se trouve ; comme le sens « cher » de 高い (lot 05), dont il partage la catégorie. Particules : を, celle de la fiche, pour « faire » ; aucune pour le prix, que la fiche dit placé directement après le montant, sans particule. L'ordre suit les traductions de la source. Les noms à suru_compatible et コピーする (lot 19) ne sont pas touchés."
 },
 {
  "id": "A2-04-D1331",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_181",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Faire : action la plus générale, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1332",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_181",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 20, report intégral à la passe finale 5.16). La paire する / やる est inscrite comme candidate explicite à l'audit des relations de 5.16 : la fiche de やる nomme expressément « suru » comme son synonyme familier pour « faire ». L'autre membre est n5_v_608 (やる), dans ce lot. Le type exact de la relation sera décidé à 5.16, sens par sens, parmi les relations officielles du registre A2-REL ; une relation ne servira pas à représenter le registre familier de やる."
 },
 {
  "id": "A2-04-D1584",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_181",
  "field": "entrée",
  "kind": "decision",
  "before": {
   "lot": "lot-20",
   "status": "validated",
   "journal": [
    "A2-04-D1330",
    "A2-04-D1331",
    "A2-04-D1332"
   ],
   "fields": {
    "writings": [],
    "suru_compatible": false,
    "suffix": false,
    "counter": null,
    "nuance": null,
    "tags": [],
    "senses": [
     {
      "meaning": {
       "primary": "Faire",
       "alternatives": []
      },
      "category": null,
      "semantic_type": "action",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      },
      "particles": [
       "を"
      ],
      "nuance": "Le sens principal du verbe."
     },
     {
      "meaning": {
       "primary": "Coûter (pour un prix)",
       "alternatives": [
        "Valoir"
       ]
      },
      "category": {
       "level_1": "economie_commerce",
       "level_2": "prix_valeur_economique",
       "level_3": "prix"
      },
      "semantic_type": "propriete",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      },
      "particles": [],
      "nuance": "Placé immédiatement après un montant, indique le prix ou la valeur d'un objet : このノートは200円します (ce carnet coûte 200 yens)."
     }
    ]
   }
  },
  "after": "rouverte : relation ajoutée (v_181_s1 equivalent_to v_608_s1) ; rien d'autre ne change",
  "reason": "Réouverture explicite d'une ENTRY validée (arbitrage du périmètre de la passe finale 5.16, Q1 : un lot 26, qui ne rouvre que les ENTRY dont les données changent). する (n5_v_181), validée au lot 20, est rouverte pour y noter la relation arbitrée (Q4, R8). Son état validé est conservé en entier dans le champ « avant » de cette décision. Ses décisions historiques (D1330, D1331, D1332) ne sont pas modifiées : elles restent au journal, validées, et citées par l'entrée."
 },
 {
  "id": "A2-04-D1585",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_181",
  "field": "sens 1 · relations",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "type": "equivalent_to",
    "target": "v_608_s1"
   }
  ],
  "reason": "Relation equivalent_to de v_181_s1 (する, « Faire ») vers v_608_s1 (やる, « Faire ») : arbitrage du périmètre de 5.16 (Q4, R8). Candidate inscrite par D1332 et D1336 (« type exact décidé à 5.16, sens par sens »). Le lien ne porte que sur « Faire » : ni « Coûter » (する, sens 2), ni « Donner » (やる, sens 2). La relation dit l'équivalence des deux sens, non le registre familier de やる, qui reste en nuance (D1332). I12 : la relation, symétrique, n'est notée qu'une fois, sur le sens de l'ENTRY de plus petit numéro (convention de ce lot) ; やる (n5_v_608) n'est ni modifiée ni rouverte."
 }
]
```

## 吹く — `v_266`

### Fiche source `n5_v_266`

```json
{
 "id": "n5_v_266",
 "level": "N5",
 "word": "吹く",
 "word_furigana": "<ruby>吹<rt>ふ</rt></ruby>く",
 "reading": "ふく",
 "romaji": "fuku",
 "meanings": {
  "primary": "Souffler",
  "secondary": [
   "Jouer d'un instrument à vent",
   "Émettre de l'air"
  ]
 },
 "nuance": "Verbe <ruby>五段<rt>ごだん</rt></ruby> (godan) transitif ou intransitif désignant l'action du vent qui souffle, ou de souffler de l'air/de jouer d'un instrument à vent. Compteur spécifique : <ruby>回<rt>かい</rt></ruby> (kai).",
 "type": "verbe godan",
 "group": "u",
 "category": "meteo_saisons",
 "subcategory": "phenomenes_meteo",
 "kanji_list": [
  "吹"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "きょう は かぜ が つよく **<ruby>吹<rt>ふ</rt></ruby>いて** います 。",
  "romaji": "kyou wa kaze ga tsuyoku fuite imasu.",
  "french": "Le vent **souffle** fort aujourd'hui.",
  "highlight": [
   "吹いて",
   "fuite"
  ]
 }
}
```

### Anciens exemples de `n5_v_266` (3)

```json
[
 {
  "japanese": "<ruby>外<rt>そと</rt></ruby> に 出ると、<ruby>冷<rt>つめ</rt></ruby>たい <ruby>風<rt>かぜ</rt></ruby> が <ruby>強<rt>つよ</rt></ruby>く <ruby>吹<rt>ふ</rt></ruby>いて いました",
  "romaji": "soto ni deru to, tsumetai kaze ga tsuyoku fuite imashita.",
  "french": "Quand je suis sorti, un vent **frais** soufflait fortement.",
  "highlight": [
   "吹く",
   "fuku"
  ]
 },
 {
  "japanese": "<ruby>温<rt>あたた</rt></ruby>かい スープ を <ruby>飲<rt>の</rt></ruby>む <ruby>前<rt>まえ</rt></ruby> に、ちょっと <ruby>息<rt>いき</rt></ruby> を <ruby>吹<rt>ふ</rt></ruby>いて <ruby>冷<rt>さ</rt></ruby>ましました",
  "romaji": "atatakai suupu o nomu mae ni, chotto iki o fuite samashimashita.",
  "french": "Avant de boire la soupe chaude, j'ai soufflé un peu dessus pour la refroidir.",
  "highlight": [
   "吹く",
   "fuku"
  ]
 },
 {
  "japanese": "<ruby>春<rt>はる</rt></ruby> の <ruby>訪<rt>おとず</rt></ruby>れ を <ruby>告<rt>つ</rt></ruby>げる <ruby>心地<rt>ここち</rt></ruby>よい <ruby>風<rt>かぜ</rt></ruby> が <ruby>優<rt>やさ</rt></ruby>しく <ruby>吹<rt>ふ</rt></ruby>いています",
  "romaji": "haru no otozure o tsugeru kokochiyoi kaze ga yasashiku fuite imasu.",
  "french": "Un vent agréable qui annonce l'arrivée du printemps **souffle** doucement.",
  "highlight": [
   "吹く",
   "fuku"
  ]
 }
]
```

### ENTRY publiée `v_266`

```json
{
 "id": "v_266",
 "level": "N5",
 "word": "吹く",
 "writings": [],
 "readings": [
  {
   "kana": "ふく",
   "romaji": "fuku",
   "furigana": "<ruby>吹<rt>ふ</rt></ruby>く",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_266_s1",
   "meaning": {
    "primary": "Souffler (le vent)",
    "alternatives": []
   },
   "category": {
    "level_1": "monde_naturel",
    "level_2": "meteo",
    "level_3": "vent"
   },
   "semantic_type": "processus",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ],
   "nuance": "風が吹く : le vent souffle."
  },
  {
   "id": "v_266_s2",
   "meaning": {
    "primary": "Souffler (de l'air)",
    "alternatives": [
     "Jouer d'un instrument à vent"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "笛を吹く : jouer de la flûte."
  }
 ]
}
```

### Décisions de journal de `v_266` (3)

```json
[
 {
  "id": "A2-04-D0471",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-07",
  "entry": "n5_v_266",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Souffler",
   "Jouer d'un instrument à vent",
   "Émettre de l'air"
  ],
  "after": [
   "S1 Souffler (le vent)",
   "S2 Souffler (de l'air)"
  ],
  "reason": "Deux sens documentés par la source (« l'action du vent qui souffle, ou de souffler de l'air / de jouer d'un instrument à vent ») : un phénomène naturel sans agent (が), et une action humaine (を)."
 },
 {
  "id": "A2-04-D0472",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-07",
  "entry": "n5_v_266",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Souffler de l'air (sur une bougie, dans un instrument) : action générale, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D0473",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-07",
  "entry": "n5_v_266",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Émettre de l'air"
  ],
  "after": null,
  "reason": "Redondant avec le sens 2."
 }
]
```

## 違う — `v_361`

### Fiche source `n5_v_361`

```json
{
 "id": "n5_v_361",
 "level": "N5",
 "word": "違う",
 "word_furigana": "<ruby>違<rt>ちが</rt></ruby>う",
 "reading": "ちがう",
 "romaji": "chigau",
 "meanings": {
  "primary": "Être différent",
  "secondary": [
   "Se tromper",
   "C'est faux",
   "Être incorrect"
  ]
 },
 "nuance": "**Verbe** du groupe u (godan) exprimant la différence entre deux éléments, ou signifiant qu'une information est erronée (\"c'est faux\" / \"non, ce n'est pas ça\"). Les romajis associés sont (*chigau*).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "orientation",
 "kanji_list": [
  "違"
 ],
 "particles": [],
 "example": {
  "japanese": "いいえ 、それ は **<ruby>違<rt>ちが</rt></ruby>います** 。",
  "romaji": "iie, sore wa chigaimasu.",
  "french": "Non, c'est **différent** (ou : ce n'est pas exact).",
  "highlight": [
   "違う",
   "chigau"
  ]
 }
}
```

### Anciens exemples de `n5_v_361` (3)

```json
[
 {
  "japanese": "その <ruby>質問<rt>しつもん</rt></ruby> の <ruby>答<rt>こた</rt></ruby>え は、さっき の と ちょっと <ruby>違<rt>ちが</rt></ruby>います",
  "romaji": "sono shitsumon no kotae wa, sakki no to chotto chigaimasu.",
  "french": "La réponse à cette question est un peu **différente** de la précédente.",
  "highlight": [
   "違う",
   "chigau"
  ]
 },
 {
  "japanese": "「いいえ、それは <ruby>違<rt>ちが</rt></ruby>います」 と<ruby>明<rt>あか</rt></ruby>るく <ruby>訂正<rt>ていせい</rt></ruby> します",
  "romaji": "'iie, sore wa chigaimasu' to akaruku teisei shimasu.",
  "french": "Je corrige cela joyeusement en disant : « Non, c'est **différent** / faux ».",
  "highlight": [
   "違う",
   "chigau"
  ]
 },
 {
  "japanese": "ふたり は <ruby>兄弟<rt>きょうだい</rt></ruby> ですが、<ruby>性格<rt>せいかく</rt></ruby> が まったく <ruby>違<rt>ちが</rt></ruby>います",
  "romaji": "futari wa kyoudai desu ga, seikaku ga mattaku chigaimasu.",
  "french": "Ils sont frères, mais leurs caractères sont totalement **différents**.",
  "highlight": [
   "違う",
   "chigau"
  ]
 }
]
```

### ENTRY publiée `v_361`

```json
{
 "id": "v_361",
 "level": "N5",
 "word": "違う",
 "writings": [],
 "readings": [
  {
   "kana": "ちがう",
   "romaji": "chigau",
   "furigana": "<ruby>違<rt>ちが</rt></ruby>う",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "S'emploie aussi pour répondre : いいえ、それは違います (non, c'est différent ; non, ce n'est pas ça).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_361_s1",
   "meaning": {
    "primary": "Être différent",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "etat",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "La différence entre deux éléments."
  },
  {
   "id": "v_361_s2",
   "meaning": {
    "primary": "Être incorrect",
    "alternatives": [
     "Se tromper"
    ]
   },
   "category": null,
   "semantic_type": "etat",
   "dimensions": [
    {
     "axis": "exactitude_inexactitude",
     "pole": "inexactitude"
    }
   ],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Une information erronée."
  }
 ]
}
```

### Décisions de journal de `v_361` (5)

```json
[
 {
  "id": "A2-04-D1324",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_361",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Être différent",
   "Se tromper",
   "C'est faux",
   "Être incorrect"
  ],
  "after": [
   "S1 Être différent",
   "S2 Être incorrect"
  ],
  "reason": "Deux sens documentés par la fiche (« la différence entre deux éléments, ou signifiant qu'une information est erronée ») : deux choses qui diffèrent, et une information qui est fausse ; deux référents. L'exemple se traduit des deux façons (« c'est différent (ou : ce n'est pas exact) ») ; il est conservé en nuance. Type etat pour les deux. La fiche ne donne aucune particule : aucune n'est établie. Sens 2 candidat ; alternative laissée à l'arbitrage : un seul sens."
 },
 {
  "id": "A2-04-D1325",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_361",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "La différence entre deux éléments : état général, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1326",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_361",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Une information erronée : état général, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1327",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_361",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "C'est faux"
  ],
  "after": null,
  "reason": "Une réplique, non une traduction du verbe : l'emploi d'adresse (« c'est faux », « non, ce n'est pas ça ») est conservé en nuance, sans sens ni fonction, comme les emplois d'adresse du lot 16."
 },
 {
  "id": "A2-04-D1368",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_361",
  "field": "sens 2 · dimensions",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "axis": "exactitude_inexactitude",
    "pole": "inexactitude"
   }
  ],
  "reason": "Dimension exactitude / inexactitude, pôle inexactitude : l'axe d'A2-DIM décrit directement le sens (la fiche dit qu'une information est « erronée », et son exemple se traduit « ce n'est pas exact »). Arbitrage des choix du lot 20, selon la doctrine arbitrée au lot 16 : un axe existant est employé lorsqu'il décrit directement le sens, et seulement alors. Aucune dimension pour le sens 1, « être différent » : la simple différence relève du sens lexical, et le cas échéant des relations, non de cet axe."
 }
]
```

## ある — `v_516`

### Fiche source `n5_v_516`

```json
{
 "id": "n5_v_516",
 "level": "N5",
 "word": "ある",
 "word_furigana": "ある",
 "reading": "ある",
 "romaji": "aru",
 "meanings": {
  "primary": "Exister",
  "secondary": [
   "Y avoir",
   "Posséder",
   "Se trouver (pour les objets inanimés)"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u)** fondamental exprimant l'existence, la présence ou la possession de choses inanimées (objets, lieux, concepts abstraits), par opposition à *iru* pour les êtres vivants.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "existence",
 "kanji_list": [],
 "particles": [
  "が",
  "に"
 ],
 "example": {
  "japanese": "つくえ の うえ に ほん が **ある** 。",
  "romaji": "tsukue no ue ni hon ga aru.",
  "french": "Il **y a** un livre sur le bureau.",
  "highlight": [
   "ある",
   "aru"
  ]
 }
}
```

### Anciens exemples de `n5_v_516` (3)

```json
[
 {
  "japanese": "<ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に <ruby>本<rt>ほん</rt></ruby> が あります",
  "romaji": "tsukue no ue ni hon ga arimasu.",
  "french": "Il y **a** un livre sur le bureau.",
  "highlight": [
   "ある",
   "aru"
  ]
 },
 {
  "japanese": "あした は <ruby>学校<rt>がっこう</rt></ruby> で <ruby>試験<rt>しけん</rt></ruby> が あります",
  "romaji": "ashita wa gakkou de shiken ga arimasu.",
  "french": "Il **y a** un examen à l'école demain.",
  "highlight": [
   "ある",
   "aru"
  ]
 },
 {
  "japanese": "<ruby>私<rt>わたし</rt></ruby> は <ruby>車<rt>くるま</rt></ruby> を <ruby>持<rt>も</rt></ruby>っています (or <ruby>車<rt>くるま</rt></ruby> が あります)",
  "romaji": "watashi wa kuruma o motte imasu.",
  "french": "J'**ai** une voiture.",
  "highlight": [
   "ある",
   "aru"
  ]
 }
]
```

### ENTRY publiée `v_516`

```json
{
 "id": "v_516",
 "level": "N5",
 "word": "ある",
 "writings": [],
 "readings": [
  {
   "kana": "ある",
   "romaji": "aru",
   "furigana": "ある",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Pour les choses inanimées : objets, lieux, notions abstraites. Pour les êtres vivants, on emploie 居る.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_516_s1",
   "meaning": {
    "primary": "Y avoir",
    "alternatives": [
     "Exister",
     "Se trouver (pour les objets inanimés)"
    ]
   },
   "category": null,
   "semantic_type": "etat",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が",
    "に"
   ],
   "nuance": "L'existence ou la présence d'une chose : つくえのうえにほんがある (il y a un livre sur le bureau)."
  },
  {
   "id": "v_516_s2",
   "meaning": {
    "primary": "Posséder",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "etat",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ],
   "nuance": "La possession d'une chose."
  }
 ]
}
```

### Décisions de journal de `v_516` (4)

```json
[
 {
  "id": "A2-04-D1302",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_516",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Exister",
   "Y avoir",
   "Posséder",
   "Se trouver (pour les objets inanimés)"
  ],
  "after": [
   "S1 Y avoir, exister",
   "S2 Posséder"
  ],
  "reason": "Deux sens, sur la fiche (« l'existence, la présence ou la possession de choses inanimées ») : une chose qui existe ou se trouve quelque part, ce que l'exemple illustre, et une chose que quelqu'un possède ; deux référents. Pour le sens 1, « Y avoir » passe en traduction principale, devant « Exister », que la source donne en premier (arbitrage des choix du lot 20) : l'exemple de la fiche traduit ある par « il y a », formulation plus naturelle pour un débutant francophone et directement attestée ; aucune traduction n'est ajoutée ni retirée, seul l'ordre change. Type etat pour les deux : la fiche parle d'existence, de présence et de possession, non d'une action ni d'un changement ; comme 知る et 分かる (lot 06). Particules de la fiche : が et に pour l'existence (la chose, le lieu), が pour la possession."
 },
 {
  "id": "A2-04-D1303",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_516",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "L'existence ou la présence d'une chose : état général, sans domaine thématique propre ; aucune catégorie du registre ne nomme l'existence. Addendum A5."
 },
 {
  "id": "A2-04-D1304",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_516",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "La possession d'une chose : état général, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1305",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_516",
  "field": "sens 1 · linguistic_functions",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune fonction linguistique (arbitrage du périmètre du lot 20) : le registre A2-LING n'a aucune fonction pour l'existence, et aucune n'est inventée pour ある ni pour 居る. Aucune fonction qui n'a pas de définition normative n'est posée dans ce lot ; aucune définition, aucun addendum n'est créé."
 }
]
```

## 付ける — `v_522`

### Fiche source `n5_v_522`

```json
{
 "id": "n5_v_522",
 "level": "N5",
 "word": "付ける",
 "word_furigana": "<ruby>付<rt>つ</rt></ruby>ける",
 "reading": "つける",
 "romaji": "tsukeru",
 "meanings": {
  "primary": "Allumer",
  "secondary": [
   "Fixer",
   "Attacher",
   "Appliquer"
  ]
 },
 "nuance": "**Verbe transitif (groupe ichidan / ru)** signifiant l'action de mettre en marche un appareil électrique (lumière, climatiseur, télévision) ou d'attacher/fixer quelque chose.",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "付"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "へや の でんき を **<ruby>付<rt>つ</rt></ruby>けて** ください 。",
  "romaji": "heya no denki o tsukete kudasai.",
  "french": "Veuillez **allumer** la lumière de la pièce.",
  "highlight": [
   "付ける",
   "tsukeru"
  ]
 }
}
```

### Anciens exemples de `n5_v_522` (3)

```json
[
 {
  "japanese": "<ruby>暗<rt>くら</rt></ruby>い です から、<ruby>電灯<rt>でんとう</rt></ruby> を つけて ください",
  "romaji": "kurai desu kara, dentou o tsukete kudasai.",
  "french": "Il fait sombre, veuillez **allumer** la lumière, s'il vous plaît.",
  "highlight": [
   "つける",
   "tsukeru"
  ]
 },
 {
  "japanese": "テレビ を つけて、<ruby>ニュース<rt>にゅーす</rt></ruby> を <ruby>見<rt>み</rt></ruby>ましょう",
  "romaji": "terebi o tsukete, nyuusu o mimashou.",
  "french": "**Allumons** la télévision pour regarder les informations.",
  "highlight": [
   "つける",
   "tsukeru"
  ]
 },
 {
  "japanese": "<ruby>部屋<rt>へや</rt></ruby> が <ruby>寒<rt>さむ</rt></ruby>い ので、エアコン を つけました",
  "romaji": "heya ga samui node, eakon o tsukemashita.",
  "french": "Comme la pièce est froide, j'ai **allumé** la climatisation (ou le chauffage).",
  "highlight": [
   "つける",
   "tsukeru"
  ]
 }
]
```

### ENTRY publiée `v_522`

```json
{
 "id": "v_522",
 "level": "N5",
 "word": "付ける",
 "writings": [],
 "readings": [
  {
   "kana": "つける",
   "romaji": "tsukeru",
   "furigana": "<ruby>付<rt>つ</rt></ruby>ける",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "La source donne aussi la traduction « appliquer », sans la développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_522_s1",
   "meaning": {
    "primary": "Allumer",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Mettre en marche un appareil électrique : la lumière, le climatiseur, la télévision. へやのでんきを付けてください (veuillez allumer la lumière de la pièce)."
  },
  {
   "id": "v_522_s2",
   "meaning": {
    "primary": "Fixer",
    "alternatives": [
     "Attacher"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Attacher ou fixer quelque chose."
  }
 ]
}
```

### Décisions de journal de `v_522` (4)

```json
[
 {
  "id": "A2-04-D1193",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_522",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Allumer",
   "Fixer",
   "Attacher",
   "Appliquer"
  ],
  "after": [
   "S1 Allumer (un appareil)",
   "S2 Fixer"
  ],
  "reason": "Deux sens documentés par la fiche (« mettre en marche un appareil électrique (lumière, climatiseur, télévision) ou attacher/fixer quelque chose ») : un appareil que l'on met en marche, ce que l'exemple illustre (la lumière), et une chose que l'on fixe à une autre ; deux référents. Particule を de la fiche pour chacun. La fiche écrit 付ける pour les deux emplois : aucune autre graphie n'est ajoutée, et aucun contraire, la fiche n'en donnant pas. Sens 2 candidat ; alternative : un seul sens."
 },
 {
  "id": "A2-04-D1194",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_522",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Mettre en marche un appareil électrique : action générale, sans domaine thématique propre, comme le sens « éteindre » de 消す. Addendum A5."
 },
 {
  "id": "A2-04-D1195",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_522",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Attacher ou fixer quelque chose : action générale, sans domaine thématique propre, comme le sens « accrocher » de かける (lot 08). Addendum A5."
 },
 {
  "id": "A2-04-D1196",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_522",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Appliquer"
  ],
  "after": null,
  "reason": "La nuance de la fiche ne décrit qu'allumer et fixer. Signalée en nuance comme traduction de la source non développée, comme pour 厚い (lot 15) et 温い (lot 17)."
 }
]
```

## 出来る — `v_523`

### Fiche source `n5_v_523`

```json
{
 "id": "n5_v_523",
 "level": "N5",
 "word": "出来る",
 "word_furigana": "<ruby>出<rt>で</rt></ruby>きる",
 "reading": "できる",
 "romaji": "dekiru",
 "meanings": {
  "primary": "Pouvoir",
  "secondary": [
   "Être capable de",
   "Réussir",
   "Être achevé / prêt"
  ]
 },
 "nuance": "**Verbe intransitif (groupe ichidan / ru)** exprimant la capacité ou la possibilité physique/mentale de faire quelque chose (« savoir faire, être capable »), ou le fait qu'une chose soit terminée ou fabriquée.",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "capacite",
 "kanji_list": [
  "出"
 ],
 "particles": [
  "が"
 ],
 "example": {
  "japanese": "わたし は にほんご が **<ruby>出<rt>で</rt></ruby>きる** 。",
  "romaji": "watashi wa nihongo ga dekiru.",
  "french": "Je **peux** parler japonais (je suis capable de faire du japonais).",
  "highlight": [
   "出来る",
   "dekiru"
  ]
 }
}
```

### Anciens exemples de `n5_v_523` (3)

```json
[
 {
  "japanese": "<ruby>私<rt>わたし</rt></ruby> は <ruby>日本語<rt>にほんご</rt></ruby> が 少し <ruby>話<rt>はな</rt></ruby>せます (または: <ruby>話<rt>はな</rt></ruby>す こと が できます)",
  "romaji": "watashi wa nihongo ga sukoshi hanasemasu.",
  "french": "Je **peux** parler un peu japonais.",
  "highlight": [
   "できる",
   "dekiru"
  ]
 },
 {
  "japanese": "この <ruby>仕事<rt>しごと</rt></ruby> は あした までに <ruby>出来<rt>でき</rt></ruby>ます",
  "romaji": "kono shigoto wa ashita made ni dekimasu.",
  "french": "Ce travail **peut** être fait d'ici demain.",
  "highlight": [
   "できる",
   "dekiru"
  ]
 },
 {
  "japanese": "<ruby>彼<rt>かれ</rt></ruby> は <ruby>上手<rt>じょうず</rt></ruby> に <ruby>料理<rt>りょうり</rt></ruby> が できます",
  "romaji": "kare wa jouzu ni ryouri ga dekimasu.",
  "french": "Il **sait** bien cuisiner (**peut** cuisiner habilement).",
  "highlight": [
   "できる",
   "dekiru"
  ]
 }
]
```

### ENTRY publiée `v_523`

```json
{
 "id": "v_523",
 "level": "N5",
 "word": "出来る",
 "writings": [],
 "readings": [
  {
   "kana": "できる",
   "romaji": "dekiru",
   "furigana": "<ruby>出来<rt>でき</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "La source donne aussi la traduction « réussir », sans la développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_523_s1",
   "meaning": {
    "primary": "Pouvoir",
    "alternatives": [
     "Être capable de"
    ]
   },
   "category": {
    "level_1": "etre_humain",
    "level_2": "capacites_aptitudes",
    "level_3": "aptitude"
   },
   "semantic_type": "etat",
   "dimensions": [
    {
     "axis": "possibilite_impossibilite",
     "pole": "possibilite"
    }
   ],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ],
   "nuance": "La capacité ou la possibilité, physique ou mentale, de faire quelque chose : savoir faire, être capable. わたしはにほんごが出来る (je peux parler japonais)."
  },
  {
   "id": "v_523_s2",
   "meaning": {
    "primary": "Être achevé / prêt",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "resultat",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ],
   "nuance": "Une chose terminée ou fabriquée."
  }
 ]
}
```

### Décisions de journal de `v_523` (6)

```json
[
 {
  "id": "A2-04-D1315",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_523",
  "field": "readings",
  "kind": "correction",
  "before": "<ruby>出<rt>で</rt></ruby>きる",
  "after": "<ruby>出来<rt>でき</rt></ruby>る",
  "reason": "Furigana de la source incohérents avec la forme : leur texte de base est 出きる, sans le 来 de 出来る (で sur 出, puis きる en kana). La lecture できる et le romaji dekiru de la fiche sont repris tels quels. Bloc par nécessité (addendum A8, §3) : la fiche ne répartit pas でき entre 出 et 来, et aucune segmentation n'est établie par elle ; でき est porté par 出来 en bloc, る est l'okurigana de la forme. C'est aussi ce que montre un ancien exemple de la fiche (出来ます, でき sur 出来). Hors liste des lectures spéciales, que ce lot ne modifie pas. L'exemple de la fiche a le même défaut ; la nuance l'écrit avec la forme de l'entrée. Les sources figées ne sont pas modifiées."
 },
 {
  "id": "A2-04-D1316",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_523",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Pouvoir",
   "Être capable de",
   "Réussir",
   "Être achevé / prêt"
  ],
  "after": [
   "S1 Pouvoir, être capable de",
   "S2 Être achevé, prêt"
  ],
  "reason": "Deux sens documentés par la fiche (« la capacité ou la possibilité physique/mentale de faire quelque chose (…), ou le fait qu'une chose soit terminée ou fabriquée ») : ce que quelqu'un sait ou peut faire, que l'exemple illustre, et une chose qui est achevée ; deux référents. Types : etat pour la capacité, comme 分かる (lot 06) ; resultat pour l'achèvement (arbitrage des choix du lot 20) : A2-ST définit ce type comme une entité ou un état conceptualisé principalement comme l'aboutissement d'une action, d'un processus ou d'un événement, ce qui convient à une chose « terminée ou fabriquée » mieux qu'evenement. Particule が de la fiche pour chacun. Le sens 1 : être humain › capacités et aptitudes › aptitude."
 },
 {
  "id": "A2-04-D1317",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_523",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Une chose terminée ou fabriquée : résultat général, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1318",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_523",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Réussir"
  ],
  "after": null,
  "reason": "La nuance de la fiche ne décrit que la capacité et l'achèvement. Signalée en nuance comme traduction de la source non développée (principe retenu au lot 18)."
 },
 {
  "id": "A2-04-D1319",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_523",
  "field": "sens 1 · linguistic_functions",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune fonction linguistique (arbitrage du périmètre du lot 20) : pas de modalite pour 出来る : cette fonction du registre A2-LING n'a pas de définition normative. Aucune fonction qui n'a pas de définition normative n'est posée dans ce lot ; aucune définition, aucun addendum n'est créé."
 },
 {
  "id": "A2-04-D1367",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_523",
  "field": "sens 1 · dimensions",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "axis": "possibilite_impossibilite",
    "pole": "possibilite"
   }
  ],
  "reason": "Dimension possibilité / impossibilité, pôle possibilité : l'axe d'A2-DIM décrit directement le sens (la fiche dit « la capacité ou la possibilité physique/mentale de faire quelque chose »). Arbitrage des choix du lot 20, selon la doctrine arbitrée au lot 16 : un axe existant est employé lorsqu'il décrit directement le sens, et seulement alors."
 }
]
```

## なる — `v_524`

### Fiche source `n5_v_524`

```json
{
 "id": "n5_v_524",
 "level": "N5",
 "word": "なる",
 "word_furigana": "なる",
 "reading": "なる",
 "romaji": "naru",
 "meanings": {
  "primary": "Devenir",
  "secondary": [
   "Se transformer en",
   "Prendre forme"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u)** exprimant un changement d'état, de condition, de statut ou de temps (souvent associé aux particules *ni* pour les noms et *ku* pour les adjectifs en i).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "changement",
 "kanji_list": [],
 "particles": [
  "に"
 ],
 "example": {
  "japanese": "いしゃ に **なる** 。",
  "romaji": "isha ni naru.",
  "french": "Je vais **devenir** médecin.",
  "highlight": [
   "なる",
   "naru"
  ]
 }
}
```

### Anciens exemples de `n5_v_524` (3)

```json
[
 {
  "japanese": "<ruby>秋<rt>あき</rt></ruby> に なると、<ruby>木<rt>き</rt></ruby> の <ruby>葉<rt>は</rt></ruby> が <ruby>赤<rt>あか</rt></ruby>く なります",
  "romaji": "aki ni naruto, ki no ha ga akaku narimasu.",
  "french": "Quand l'automne arrive, les feuilles des arbres **deviennent** rouges.",
  "highlight": [
   "なる",
   "naru"
  ]
 },
 {
  "japanese": "<ruby>将来<rt>しょうらい</rt></ruby>、<ruby>医者<rt>いしゃ</rt></ruby> に なりたい です",
  "romaji": "shourai, isha ni naritai desu.",
  "french": "Je voudrais **devenir** médecin dans le futur.",
  "highlight": [
   "なる",
   "naru"
  ]
 },
 {
  "japanese": "<ruby>外<rt>そと</rt></ruby> が <ruby>暗<rt>くら</rt></ruby>く なりました",
  "romaji": "soto ga kuraku narimashita.",
  "french": "Il est **devenu** sombre dehors.",
  "highlight": [
   "なる",
   "naru"
  ]
 }
]
```

### ENTRY publiée `v_524`

```json
{
 "id": "v_524",
 "level": "N5",
 "word": "なる",
 "writings": [],
 "readings": [
  {
   "kana": "なる",
   "romaji": "naru",
   "furigana": "なる",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Un changement d'état, de condition, de statut ou de temps : いしゃになる (je vais devenir médecin). Avec に après un nom ; la fiche cite aussi « ku » après un adjectif en い.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_524_s1",
   "meaning": {
    "primary": "Devenir",
    "alternatives": [
     "Se transformer en"
    ]
   },
   "category": null,
   "semantic_type": "evenement",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "に"
   ]
  }
 ]
}
```

### Décisions de journal de `v_524` (4)

```json
[
 {
  "id": "A2-04-D1320",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_524",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Devenir",
   "Se transformer en",
   "Prendre forme"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens : un changement d'état, de condition, de statut ou de temps. Type evenement : un changement qui survient, comme 開く (lot 18). La particule de ce sens unique est celle de la fiche (に), mécaniquement ; « ku », que la nuance cite pour les adjectifs, n'est pas une particule du champ de la fiche : rien n'est ajouté, la mention reste en nuance."
 },
 {
  "id": "A2-04-D1321",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_524",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Devenir, changer d'état : événement général, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1322",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_524",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Prendre forme"
  ],
  "after": null,
  "reason": "Plus étroit que ce que décrit la fiche (un changement d'état, de condition, de statut ou de temps)."
 },
 {
  "id": "A2-04-D1323",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_524",
  "field": "sens 1 · linguistic_functions",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune fonction linguistique (arbitrage du périmètre du lot 20) : pas d'aspect pour なる : cette fonction du registre A2-LING n'a pas de définition normative. Aucune fonction qui n'a pas de définition normative n'est posée dans ce lot ; aucune définition, aucun addendum n'est créé."
 }
]
```

## コピーする — `v_526`

### Fiche source `n5_v_526`

```json
{
 "id": "n5_v_526",
 "level": "N5",
 "word": "コピーする",
 "word_furigana": "コピーする",
 "reading": "こぴーする",
 "romaji": "kopii suru",
 "meanings": {
  "primary": "Photocopier",
  "secondary": [
   "Faire une copie",
   "Dupliquer"
  ]
 },
 "nuance": "**Verbe d'action (verbe en suru)** composé du mot emprunté *kopii* (copie / photocopie) et du verbe auxiliaire *suru* (faire).",
 "type": "verbe",
 "group": "suru",
 "category": "actions_generiques",
 "subcategory": "travail",
 "kanji_list": [],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "この しるし を **コピーして** ください 。",
  "romaji": "kono shorui o kopii shite kudasai.",
  "french": "Veuillez **photocopier** ce document.",
  "highlight": [
   "コピーする",
   "kopii suru"
  ]
 }
}
```

### Anciens exemples de `n5_v_526` (3)

```json
[
 {
  "japanese": "この <ruby>書類<rt>しょるい</rt></ruby> を 3<ruby>部<rt>ぶ</rt></ruby> コピーして ください",
  "romaji": "kono shorui o sanbu kopii shite kudasai.",
  "french": "Veuillez **photocopier** ce document en 3 exemplaires.",
  "highlight": [
   "コピーする",
   "kopii suru"
  ]
 },
 {
  "japanese": "<ruby>図書館<rt>としょかん</rt></ruby> で <ruby>本<rt>ほん</rt></ruby> の <ruby>1ページ<rt>いちぺーじ</rt></ruby> を コピーしました",
  "romaji": "toshokan de hon no ichi peaji o kopii shimashita.",
  "french": "J'ai **photocopié** une page du livre à la bibliothèque.",
  "highlight": [
   "コピーする",
   "kopii suru"
  ]
 },
 {
  "japanese": "「この <ruby>地図<rt>ちず</rt></ruby> を コピーしても いいですか」「はい、どうぞ」",
  "romaji": "'kono chizu o kopii shite mo ii desu ka' 'hai, douzo.'",
  "french": "« Puis-je **photocopier** cette carte ? » « Oui, je vous en prie. »",
  "highlight": [
   "コピーする",
   "kopii suru"
  ]
 }
]
```

### ENTRY publiée `v_526`

```json
{
 "id": "v_526",
 "level": "N5",
 "word": "コピーする",
 "writings": [],
 "readings": [
  {
   "kana": "こぴーする",
   "romaji": "kopii suru",
   "furigana": "コピーする",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "suru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Verbe en する, formé sur le mot emprunté コピー (copie, photocopie).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_526_s1",
   "meaning": {
    "primary": "Photocopier",
    "alternatives": [
     "Faire une copie"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_526` (4)

```json
[
 {
  "id": "A2-04-D1259",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_526",
  "field": "entrée",
  "kind": "decision",
  "before": "fiche de verbe en する, sans fiche de nom コピー dans les sources",
  "after": "ENTRY conservée telle quelle : コピーする, verbe, groupe suru",
  "reason": "L'ENTRY est conservée telle que la source la donne (arbitrage du périmètre du lot 19) : forme コピーする, classe verbe, groupe suru, tous mécaniques. Elle n'est pas transformée en nom コピー : aucune entrée コピー n'existe dans les sources, et aucune identité lexicale n'est inventée ; les précédents 散歩する et 掃除する (fusionnées dans la fiche de leur nom) ne s'appliquent pas, faute de fiche de nom. Elle n'est pas réservée à un lot ultérieur. La lecture en hiragana (こぴーする) est celle de la source : statu quo mécanique des mots en katakana."
 },
 {
  "id": "A2-04-D1260",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_526",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Faire une photocopie : action générale, sans domaine thématique propre ; la fiche ne la rattache ni au bureau ni à l'école. Addendum A5."
 },
 {
  "id": "A2-04-D1261",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_526",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Dupliquer"
  ],
  "after": null,
  "reason": "Plus large que ce que décrit la fiche (une copie, une photocopie)."
 },
 {
  "id": "A2-04-D1262",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_526",
  "field": "nuance",
  "kind": "abandon",
  "before": "exemple de la source : « この しるし を コピーして ください » (« Veuillez photocopier ce document »)",
  "after": null,
  "reason": "Anomalie de la source : l'exemple dit しるし, que sa traduction rend par « document ». L'exemple n'est repris dans aucune nuance (arbitrage du périmètre du lot 19) ; les exemples ne sont pas migrés, et l'anomalie est signalée pour le registre de phrases. Aucune information lexicale n'en est tirée."
 }
]
```

## 並ぶ — `v_528`

### Fiche source `n5_v_528`

```json
{
 "id": "n5_v_528",
 "level": "N5",
 "word": "並ぶ",
 "word_furigana": "<ruby>並<rt>なら</rt></ruby>ぶ",
 "reading": "ならぶ",
 "romaji": "narabu",
 "meanings": {
  "primary": "Faire la queue",
  "secondary": [
   "Se mettre en rang",
   "Être aligné"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u)** exprimant le fait de se placer en ligne, de faire la file d'attente ou d'être disposé côte à côte de manière ordonnée.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "position",
 "kanji_list": [
  "並"
 ],
 "particles": [
  "に"
 ],
 "example": {
  "japanese": "きっぷ の うりば で **<ruby>並<rt>なら</rt></ruby>んで** います 。",
  "romaji": "kippu no uriba de narande imasu.",
  "french": "Je **fais la queue** au guichet des billets.",
  "highlight": [
   "並ぶ",
   "narabu"
  ]
 }
}
```

### Anciens exemples de `n5_v_528` (3)

```json
[
 {
  "japanese": "<ruby>切符<rt>きっぷ</rt></ruby> を <ruby>買<rt>か</rt></ruby>う ために、<ruby>人<rt>ひと</rt></ruby> が 並んで います",
  "romaji": "kippu o kau tame ni, hito ga narande imasu.",
  "french": "Les gens **font la queue** pour acheter des billets.",
  "highlight": [
   "並ぶ",
   "narabu"
  ]
 },
 {
  "japanese": "レストラン の <ruby>前<rt>まえ</rt></ruby> で 長く 並びました",
  "romaji": "resutoran no mae de nagaku narabimashita.",
  "french": "J'ai **fait la queue** longtemps devant le restaurant.",
  "highlight": [
   "並ぶ",
   "narabu"
  ]
 },
 {
  "japanese": "<ruby>学生<rt>がくせい</rt></ruby> たち が <ruby>教室<rt>きょうしつ</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> に 並んで います",
  "romaji": "gakusei tachi ga kyoushitsu no mae ni narande imasu.",
  "french": "Les étudiants **sont alignés** (**font la queue**) devant la classe.",
  "highlight": [
   "並ぶ",
   "narabu"
  ]
 }
]
```

### ENTRY publiée `v_528`

```json
{
 "id": "v_528",
 "level": "N5",
 "word": "並ぶ",
 "writings": [],
 "readings": [
  {
   "kana": "ならぶ",
   "romaji": "narabu",
   "furigana": "<ruby>並<rt>なら</rt></ruby>ぶ",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Intransitif. Aligner ou disposer des objets se dit 並べる.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_528_s1",
   "meaning": {
    "primary": "Faire la queue",
    "alternatives": [
     "Se mettre en rang"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "に"
   ],
   "nuance": "Se placer en ligne, faire la file d'attente : きっぷのうりばで並んでいます (je fais la queue au guichet des billets)."
  },
  {
   "id": "v_528_s2",
   "meaning": {
    "primary": "Être aligné",
    "alternatives": []
   },
   "category": {
    "level_1": "espace_proprietes_spatiales",
    "level_2": "position_localisation"
   },
   "semantic_type": "etat",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Être disposé côte à côte, de manière ordonnée."
  }
 ]
}
```

### Décisions de journal de `v_528` (3)

```json
[
 {
  "id": "A2-04-D1226",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_528",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Faire la queue",
   "Se mettre en rang",
   "Être aligné"
  ],
  "after": [
   "S1 Faire la queue (des personnes)",
   "S2 Être aligné (des choses)"
  ],
  "reason": "Deux sens documentés par la fiche (« se placer en ligne, de faire la file d'attente ou d'être disposé côte à côte de manière ordonnée ») : des personnes qui se rangent, ce que l'exemple illustre (au guichet), et des choses disposées côte à côte ; deux référents. Types : action pour le premier, etat pour le second, comme les deux sens de 曲がる (lot 0, « tourner » et « être courbé »). Particules : に, celle de la fiche, pour le sens 1 ; aucune n'est établie par la fiche pour le sens 2, comme pour le sens « être courbé » de 曲がる. Le sens 2 est dans la catégorie proposée pour 並べる et 置く (espace › position et localisation). Sens 2 candidat ; alternative : un seul sens."
 },
 {
  "id": "A2-04-D1227",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_528",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Se mettre en rang, faire la queue : action générale, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1228",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_528",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 18, report intégral à la passe finale 5.16). La paire 並ぶ / 並べる est inscrite comme candidate explicite à l'audit des relations de 5.16 (transitive_of / intransitive_of, registre A2-REL) : cette entrée en est le membre intransitif, l'autre est n5_v_529 (並べる). La fiche nomme elle-même son correspondant ; il est dit en nuance."
 }
]
```

## 作る — `v_532`

### Fiche source `n5_v_532`

```json
{
 "id": "n5_v_532",
 "level": "N5",
 "word": "作る",
 "word_furigana": "<ruby>作<rt>つく</rt></getKey>る",
 "reading": "つくる",
 "romaji": "tsukuru",
 "meanings": {
  "primary": "Fabriquer",
  "secondary": [
   "Préparer (un repas)",
   "Créer",
   "Produire"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de fabriquer un objet, de cuisiner un plat ou de créer quelque chose de matériel ou d'immatériel.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "creation",
 "kanji_list": [
  "作"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "まいにち ばんごはん を **<ruby>作<rt>つく</rt></ruby>り** ます 。",
  "romaji": "mainichi bangohan o tsukurimasu.",
  "french": "Je **prépare** le dîner tous les jours.",
  "highlight": [
   "作る",
   "tsukuru"
  ]
 }
}
```

### Anciens exemples de `n5_v_532` (3)

```json
[
 {
  "japanese": "<ruby>母<rt>はは</rt></ruby> は <ruby>美味<rt>おい</rt></ruby>しい <ruby>料理<rt>りょうり</rt></ruby> を <ruby>作<rt>つく</rt></ruby>ります",
  "romaji": "haha wa oishii ryouri o tsukurimasu.",
  "french": "Ma mère **prépare** (**fabrique**) un délicieux plat.",
  "highlight": [
   "作る",
   "tsukuru"
  ]
 },
 {
  "japanese": "きょう <ruby>学校<rt>がっこう</rt></ruby> で <ruby>紙<rt>かみ</rt></ruby> の <ruby>飛行機<rt>ひこうき</rt></ruby> を <ruby>作<rt>つく</rt></ruby>りました",
  "romaji": "kyou gakkou de kami no hikouki o tsukurimashita.",
  "french": "J'ai **fabriqué** un avion en papier à l'école aujourd'hui.",
  "highlight": [
   "作る",
   "tsukuru"
  ]
 },
 {
  "japanese": "この <ruby>会社<rt>かいしゃ</rt></ruby> は <ruby>車<rt>くるま</rt></ruby> を <ruby>作<rt>つく</rt></ruby>って います",
  "romaji": "kono kaisha wa kuruma o tsukutte imasu.",
  "french": "Cette entreprise **fabrique** des voitures.",
  "highlight": [
   "作る",
   "tsukuru"
  ]
 }
]
```

### ENTRY publiée `v_532`

```json
{
 "id": "v_532",
 "level": "N5",
 "word": "作る",
 "writings": [],
 "readings": [
  {
   "kana": "つくる",
   "romaji": "tsukuru",
   "furigana": "<ruby>作<rt>つく</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_532_s1",
   "meaning": {
    "primary": "Fabriquer",
    "alternatives": [
     "Créer",
     "Produire"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Fabriquer un objet, ou créer quelque chose de matériel ou d'immatériel."
  },
  {
   "id": "v_532_s2",
   "meaning": {
    "primary": "Préparer (un repas)",
    "alternatives": []
   },
   "category": {
    "level_1": "alimentation_cuisine",
    "level_2": "cuisine_preparation"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Cuisiner un plat : まいにちばんごはんを作ります (je prépare le dîner tous les jours)."
  }
 ]
}
```

### Décisions de journal de `v_532` (3)

```json
[
 {
  "id": "A2-04-D1234",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_532",
  "field": "readings",
  "kind": "correction",
  "before": "<ruby>作<rt>つく</rt></getKey>る",
  "after": "<ruby>作<rt>つく</rt></ruby>る",
  "reason": "Furigana de la source invalides (balise fermante cassée, « </getKey> » au lieu de « </ruby> »). Leur contenu est repris tel quel : つく sur 作, る en okurigana ; la lecture つくる et le romaji tsukuru sont ceux de la fiche. Même correction que pour 一人 (D1012, lot 14). Les sources figées ne sont pas modifiées."
 },
 {
  "id": "A2-04-D1235",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_532",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Fabriquer",
   "Préparer (un repas)",
   "Créer",
   "Produire"
  ],
  "after": [
   "S1 Fabriquer, créer",
   "S2 Préparer (un repas)"
  ],
  "reason": "Deux sens documentés par la fiche (« fabriquer un objet, de cuisiner un plat ou de créer quelque chose de matériel ou d'immatériel ») : une chose que l'on fabrique ou que l'on crée, et un plat que l'on cuisine, ce que l'exemple illustre (le dîner) ; deux référents. Fabriquer et créer restent un seul sens : la fiche ne les sépare que par « matériel ou immatériel ». Particule を de la fiche pour chacun. Le sens 2 est dans la catégorie du sens « cuisine » de 料理 (lot 02), alimentation › cuisine et préparation. L'ordre suit les traductions de la source. Sens 2 candidat ; alternative : un seul sens, la cuisine passant en nuance."
 },
 {
  "id": "A2-04-D1236",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_532",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Fabriquer un objet, créer quelque chose de matériel ou d'immatériel : action générale, sans domaine thématique propre ; « fabrication », dans le registre, est un domaine industriel. Addendum A5."
 }
]
```

## 借りる — `v_533`

### Fiche source `n5_v_533`

```json
{
 "id": "n5_v_533",
 "level": "N5",
 "word": "借りる",
 "word_furigana": "<ruby>借<rt>かり</rt></ruby>る",
 "reading": "かりる",
 "romaji": "kariru",
 "meanings": {
  "primary": "Emprunter",
  "secondary": [
   "Louer"
  ]
 },
 "nuance": "**Verbe transitif (groupe ichidan / ru)** exprimant l'action d'emprunter un objet à quelqu'un ou de louer un bien (comme un logement, par opposition à *貸す kasu* qui signifie prêter).",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "transaction",
 "kanji_list": [
  "借"
 ],
 "particles": [
  "を",
  "から"
 ],
 "example": {
  "japanese": "としょかん で ほん を **<ruby>借<rt>かり</rt></ruby>り** ます 。",
  "romaji": "toshokan de hon o karimasu.",
  "french": "J'**emprunte** un livre à la bibliothèque.",
  "highlight": [
   "借りる",
   "kariru"
  ]
 }
}
```

### Anciens exemples de `n5_v_533` (3)

```json
[
 {
  "japanese": "<ruby>図書館<rt>としょかん</rt></ruby> で <ruby>本<rt>ほん</rt></ruby> を <ruby>借<rt>か</rt></ruby>りました",
  "romaji": "toshokan de hon o karimashita.",
  "french": "J'ai **emprunté** un livre à la bibliothèque.",
  "highlight": [
   "借りる",
   "kariru"
  ]
 },
 {
  "japanese": "<ruby>友達<rt>ともだち</rt></ruby> から <ruby>傘<rt>かさ</rt></ruby> を <ruby>借<rt>か</rt></ruby>りました",
  "romaji": "tomodachi kara kasa o karimashita.",
  "french": "J'ai **emprunté** un parapluie à un ami.",
  "highlight": [
   "借りる",
   "kariru"
  ]
 },
 {
  "japanese": "「すみません、その <ruby>鉛筆<rt>えんぴつ</rt></ruby> を <ruby>借<rt>か</rt></ruby>りても いいですか」「はい、どうぞ」",
  "romaji": "'sumimasen, sono enpitsu o karite mo ii desu ka' 'hai, douzo.'",
  "french": "« Excusez-moi, puis-je **emprunter** ce crayon ? » « Oui, je vous en prie. »",
  "highlight": [
   "借りる",
   "kariru"
  ]
 }
]
```

### ENTRY publiée `v_533`

```json
{
 "id": "v_533",
 "level": "N5",
 "word": "借りる",
 "writings": [],
 "readings": [
  {
   "kana": "かりる",
   "romaji": "kariru",
   "furigana": "<ruby>借<rt>か</rt></ruby>りる",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Emprunter un objet à quelqu'un, ou louer un bien, un logement par exemple : としょかんでほんを借ります (j'emprunte un livre à la bibliothèque). Prêter se dit 貸す.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_533_s1",
   "meaning": {
    "primary": "Emprunter",
    "alternatives": [
     "Louer"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [
    {
     "type": "reciprocal_with",
     "target": "v_575_s1"
    }
   ],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を",
    "から"
   ]
  }
 ]
}
```

### Décisions de journal de `v_533` (5)

```json
[
 {
  "id": "A2-04-D1266",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_533",
  "field": "readings",
  "kind": "correction",
  "before": "<ruby>借<rt>かり</rt></ruby>る",
  "after": "<ruby>借<rt>か</rt></ruby>りる",
  "reason": "Furigana de la source incohérents avec la forme : leur texte de base est 借る, sans le り de 借りる, et かり est porté par le kanji. La lecture かりる et le romaji kariru de la fiche sont repris tels quels ; か est porté par 借, り est l'okurigana de la forme. L'exemple de la fiche a le même défaut ; la nuance l'écrit avec la forme de l'entrée. Même correction que pour 閉まる (D1176, lot 18). Les sources figées ne sont pas modifiées."
 },
 {
  "id": "A2-04-D1267",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_533",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Emprunter un objet ou louer un bien : action générale, sans domaine thématique propre, comme 貸す. Addendum A5."
 },
 {
  "id": "A2-04-D1268",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_533",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 19, report intégral à la passe finale 5.16). La paire 貸す / 借りる est inscrite comme candidate explicite à l'audit des relations de 5.16, pour reciprocal_with (registre A2-REL) : cette entrée est celle qui emprunte, et sa fiche nomme 貸す ; l'autre membre est n5_v_575 (貸す)."
 },
 {
  "id": "A2-04-D1580",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_533",
  "field": "entrée",
  "kind": "decision",
  "before": {
   "lot": "lot-19",
   "status": "validated",
   "journal": [
    "A2-04-D1266",
    "A2-04-D1267",
    "A2-04-D1268"
   ],
   "fields": {
    "writings": [],
    "suru_compatible": false,
    "suffix": false,
    "counter": null,
    "nuance": "Emprunter un objet à quelqu'un, ou louer un bien, un logement par exemple : としょかんでほんを借ります (j'emprunte un livre à la bibliothèque). Prêter se dit 貸す.",
    "tags": [],
    "senses": [
     {
      "meaning": {
       "primary": "Emprunter",
       "alternatives": [
        "Louer"
       ]
      },
      "category": null,
      "semantic_type": "action",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      }
     }
    ],
    "readings": [
     {
      "kana": "かりる",
      "romaji": "kariru",
      "furigana": "<ruby>借<rt>か</rt></ruby>りる",
      "default": true,
      "note": null
     }
    ]
   }
  },
  "after": "rouverte : relation ajoutée (v_533_s1 reciprocal_with v_575_s1) ; rien d'autre ne change",
  "reason": "Réouverture explicite d'une ENTRY validée (arbitrage du périmètre de la passe finale 5.16, Q1 : un lot 26, qui ne rouvre que les ENTRY dont les données changent). 借りる (n5_v_533), validée au lot 19, est rouverte pour y noter la relation arbitrée (Q4, R6). Son état validé est conservé en entier dans le champ « avant » de cette décision. Ses décisions historiques (D1266, D1267, D1268) ne sont pas modifiées : elles restent au journal, validées, et citées par l'entrée."
 },
 {
  "id": "A2-04-D1581",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_533",
  "field": "sens 1 · relations",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "type": "reciprocal_with",
    "target": "v_575_s1"
   }
  ],
  "reason": "Relation reciprocal_with de v_533_s1 (借りる, « Emprunter ») vers v_575_s1 (貸す, « Prêter ») : arbitrage du périmètre de 5.16 (Q4, R6). Candidate inscrite par D1265 et D1268 ; chaque fiche nomme l'autre verbe. I12 : la relation, symétrique, n'est notée qu'une fois, sur le sens de l'ENTRY de plus petit numéro (convention de ce lot) ; 貸す (n5_v_575) n'est ni modifiée ni rouverte."
 }
]
```

## 出す — `v_536`

### Fiche source `n5_v_536`

```json
{
 "id": "n5_v_536",
 "level": "N5",
 "word": "出す",
 "word_furigana": "<ruby>出<rt>だ</rt></ruby>す",
 "reading": "だす",
 "romaji": "dasu",
 "meanings": {
  "primary": "Sortir",
  "secondary": [
   "Envoyer (du courrier)",
   "Mettre dehors",
   "Présenter"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de faire sortir quelque chose d'un endroit, de poster une lettre ou de soumettre un document.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "mouvement",
 "kanji_list": [
  "出"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "てがみ を ポスト に **<ruby>出<rt>だ</rt></ruby>し** ます 。",
  "romaji": "tegami o posuto ni dashimasu.",
  "french": "Je **poste** (sors) une lettre dans la boîte aux lettres.",
  "highlight": [
   "出す",
   "dasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_536` (3)

```json
[
 {
  "japanese": "ごみを <ruby>朝<rt>あさ</rt></ruby> に <ruby>出<rt>だ</rt></ruby>して ください",
  "romaji": "gomi o asa ni dashite kudasai.",
  "french": "Veuillez **sortir** les ordures le matin.",
  "highlight": [
   "出す",
   "dasu"
  ]
 },
 {
  "japanese": "カバン から <ruby>本<rt>ほん</rt></ruby> を <ruby>出<rt>だ</rt></ruby>しました",
  "romaji": "kaban kara hon o dashimashita.",
  "french": "J'ai **sorti** le livre du sac.",
  "highlight": [
   "出す",
   "dasu"
  ]
 },
 {
  "japanese": "せんせいに <ruby>宿題<rt>しゅくだい</rt></ruby> を <ruby>出<rt>だ</rt></ruby>します",
  "romaji": "sensei ni shukudai o dashimasu.",
  "french": "Je **rends** (**sorts**) mes devoirs au professeur.",
  "highlight": [
   "出す",
   "dasu"
  ]
 }
]
```

### ENTRY publiée `v_536`

```json
{
 "id": "v_536",
 "level": "N5",
 "word": "出す",
 "writings": [],
 "readings": [
  {
   "kana": "だす",
   "romaji": "dasu",
   "furigana": "<ruby>出<rt>だ</rt></ruby>す",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Transitif.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_536_s1",
   "meaning": {
    "primary": "Sortir",
    "alternatives": [
     "Mettre dehors"
    ]
   },
   "category": {
    "level_1": "espace_proprietes_spatiales",
    "level_2": "entree_sortie",
    "level_3": "entrer_sortir"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Faire sortir quelque chose d'un endroit."
  },
  {
   "id": "v_536_s2",
   "meaning": {
    "primary": "Envoyer (du courrier)",
    "alternatives": []
   },
   "category": {
    "level_1": "communication_langage",
    "level_2": "communication",
    "level_3": "transmission"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Poster une lettre : てがみをポストに出します (je poste une lettre dans la boîte aux lettres)."
  },
  {
   "id": "v_536_s3",
   "meaning": {
    "primary": "Présenter",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Soumettre un document."
  }
 ]
}
```

### Décisions de journal de `v_536` (2)

```json
[
 {
  "id": "A2-04-D1224",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_536",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Sortir",
   "Envoyer (du courrier)",
   "Mettre dehors",
   "Présenter"
  ],
  "after": [
   "S1 Sortir (quelque chose)",
   "S2 Envoyer (du courrier)",
   "S3 Présenter (un document)"
  ],
  "reason": "Trois sens documentés par la fiche (« faire sortir quelque chose d'un endroit, de poster une lettre ou de soumettre un document ») : une chose que l'on sort d'un lieu, un courrier que l'on envoie, ce que l'exemple illustre (une lettre), et un document que l'on remet ; trois référents, comme les trois sens de 出る (lot 04). Particule を de la fiche pour chacun (l'exemple marque la boîte aux lettres par に, que la fiche ne donne pas parmi ses particules : rien n'est ajouté). Catégories : celle de 出る « sortir » pour le sens 1 (entrer, sortir), celle de 手紙 et de 切手 (lot 08) pour le sens 2 (communication › transmission). Sens 2 et 3 candidats ; alternatives : deux sens (le document passant en nuance), ou un seul."
 },
 {
  "id": "A2-04-D1225",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_536",
  "field": "sens 3 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Soumettre ou présenter un document : action générale, sans domaine thématique propre ; la fiche ne le rattache ni à l'école ni à l'administration. Addendum A5."
 }
]
```

## 切る — `v_539`

### Fiche source `n5_v_539`

```json
{
 "id": "n5_v_539",
 "level": "N5",
 "word": "切る",
 "word_furigana": "<ruby>切<rt>き</rt></ruby>る",
 "reading": "きる",
 "romaji": "kiru",
 "meanings": {
  "primary": "Couper",
  "secondary": [
   "Trancher",
   "Éteindre (un contact)",
   "Raccrocher (un téléphone)"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action physique de trancher ou de couper un matériau avec un outil (ciseaux, couteau), ou de couper une connexion / un appel.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "切"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "はさみ で かみ を **<ruby>切<rt>き</rt></ruby>り** ます 。",
  "romaji": "hasami de kami o kirimasu.",
  "french": "Je **coupe** du papier avec des ciseaux.",
  "highlight": [
   "切る",
   "kiru"
  ]
 }
}
```

### Anciens exemples de `n5_v_539` (3)

```json
[
 {
  "japanese": "<ruby>包丁<rt>ほうちょう</rt></ruby> で <ruby>野菜<rt>やさい</rt></ruby> を <ruby>切<rt>き</rt></ruby>ります",
  "romaji": "houchou de yasai o kirimasu.",
  "french": "Je **coupe** les légumes avec un couteau de cuisine.",
  "highlight": [
   "切る",
   "kiru"
  ]
 },
 {
  "japanese": "きょう <ruby>髪<rt>かみ</rt></ruby> を <ruby>切<rt>き</rt></ruby>りに <ruby>行<rt>い</rt></ruby>きます",
  "romaji": "kyou kami o kiri ni ikimasu.",
  "french": "Je vais me **couper** les cheveux aujourd'hui.",
  "highlight": [
   "切る",
   "kiru"
  ]
 },
 {
  "japanese": "この <ruby>紙<rt>かみ</rt></ruby> を ハサミ で <ruby>切<rt>き</rt></ruby>って ください",
  "romaji": "kono kami o hasami de kitte kudasai.",
  "french": "Veuillez **couper** ce papier avec des ciseaux.",
  "highlight": [
   "切る",
   "kiru"
  ]
 }
]
```

### ENTRY publiée `v_539`

```json
{
 "id": "v_539",
 "level": "N5",
 "word": "切る",
 "writings": [],
 "readings": [
  {
   "kana": "きる",
   "romaji": "kiru",
   "furigana": "<ruby>切<rt>き</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_539_s1",
   "meaning": {
    "primary": "Couper",
    "alternatives": [
     "Trancher"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Trancher ou couper un matériau avec un outil (ciseaux, couteau) : はさみでかみを切ります (je coupe du papier avec des ciseaux)."
  },
  {
   "id": "v_539_s2",
   "meaning": {
    "primary": "Raccrocher (un téléphone)",
    "alternatives": [
     "Éteindre (un contact)"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Couper une connexion ou un appel."
  }
 ]
}
```

### Décisions de journal de `v_539` (3)

```json
[
 {
  "id": "A2-04-D1197",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_539",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Couper",
   "Trancher",
   "Éteindre (un contact)",
   "Raccrocher (un téléphone)"
  ],
  "after": [
   "S1 Couper (un matériau)",
   "S2 Raccrocher, couper (une connexion, un appel)"
  ],
  "reason": "Deux sens documentés par la fiche (« trancher ou couper un matériau avec un outil (ciseaux, couteau), ou couper une connexion / un appel ») : une matière, que l'exemple illustre (du papier), et une communication ou un contact ; deux référents. Particule を de la fiche pour chacun. Les deux dernières traductions de la source, « Raccrocher (un téléphone) » et « Éteindre (un contact) », sont celles du sens 2. Sens 2 candidat ; alternative : un seul sens, l'emploi passant en nuance."
 },
 {
  "id": "A2-04-D1198",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_539",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Couper un matériau avec un outil : action générale, sans domaine thématique propre ; la découpe en cuisine n'en est qu'un cas, et l'exemple porte sur du papier. Addendum A5."
 },
 {
  "id": "A2-04-D1199",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_539",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Couper une connexion ou un appel : action générale, sans domaine thématique propre. L'appel seul relèverait de communication › contact, comme le sens « passer un appel » de かける (lot 08), mais la fiche réunit l'appel et la connexion, et donne « éteindre (un contact) ». Addendum A5."
 }
]
```

## 取る — `v_541`

### Fiche source `n5_v_541`

```json
{
 "id": "n5_v_541",
 "level": "N5",
 "word": "取る",
 "word_furigana": "<ruby>取<rt>と</rt></ruby>る",
 "reading": "とる",
 "romaji": "toru",
 "meanings": {
  "primary": "Prendre",
  "secondary": [
   "Saisir",
   "Obtenir",
   "Prendre (une photo)"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** désignant l'action de saisir ou de prendre un objet avec la main, d'obtenir quelque chose (comme une note ou un permis), ou de prendre une photo (*shashin o toru*).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "取"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "テーブル の うえ の ぺん を **<ruby>取<rt>と</rt></ruby>っ** て ください 。",
  "romaji": "teeburu no ue no pen o totte kudasai.",
  "french": "Veuillez **prendre** le stylo qui est sur la table.",
  "highlight": [
   "取る",
   "toru"
  ]
 }
}
```

### Anciens exemples de `n5_v_541` (3)

```json
[
 {
  "japanese": "<ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> から <ruby>本<rt>ほん</rt></ruby> を <ruby>取<rt>と</rt></ruby>りました",
  "romaji": "tsukue no ue kara hon o torimashita.",
  "french": "J'ai **pris** le livre du haut du bureau.",
  "highlight": [
   "取る",
   "toru"
  ]
 },
 {
  "japanese": "あした は <ruby>写真<rt>しゃしん</rt></ruby> を たくさん <ruby>取<rt>と</rt></ruby>ります (または: <ruby>撮<rt>と</rt></ruby>ります)",
  "romaji": "ashita wa shashin o takusan torimasu.",
  "french": "Je **prendrai** beaucoup de photos demain.",
  "highlight": [
   "取る",
   "toru"
  ]
 },
 {
  "japanese": "すみません、その <ruby>塩<rt>しお</rt></ruby> を <ruby>取<rt>と</rt></ruby>って ください",
  "romaji": "sumimasen, sono shio o totte kudasai.",
  "french": "Excusez-moi, veuillez me **prendre** (**passer**) ce sel.",
  "highlight": [
   "取る",
   "toru"
  ]
 }
]
```

### ENTRY publiée `v_541`

```json
{
 "id": "v_541",
 "level": "N5",
 "word": "取る",
 "writings": [],
 "readings": [
  {
   "kana": "とる",
   "romaji": "toru",
   "furigana": "<ruby>取<rt>と</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Prendre une photo s'écrit 撮る, de même lecture : c'est un autre mot.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_541_s1",
   "meaning": {
    "primary": "Prendre",
    "alternatives": [
     "Saisir"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Saisir ou prendre un objet avec la main : テーブルのうえのぺんを取ってください (veuillez prendre le stylo qui est sur la table)."
  },
  {
   "id": "v_541_s2",
   "meaning": {
    "primary": "Obtenir",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Obtenir quelque chose : une note, un permis."
  }
 ]
}
```

### Décisions de journal de `v_541` (4)

```json
[
 {
  "id": "A2-04-D1200",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_541",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Prendre",
   "Saisir",
   "Obtenir",
   "Prendre (une photo)"
  ],
  "after": [
   "S1 Prendre (un objet)",
   "S2 Obtenir (une note, un permis)"
  ],
  "reason": "Deux sens documentés par la fiche (« saisir ou prendre un objet avec la main, d'obtenir quelque chose (comme une note ou un permis) ») : un objet que l'on saisit, ce que l'exemple illustre (un stylo), et un résultat que l'on obtient ; deux référents. Particule を de la fiche pour chacun. Sens 2 candidat ; alternative : un seul sens, « obtenir » passant en nuance."
 },
 {
  "id": "A2-04-D1201",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_541",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Prendre (une photo)"
  ],
  "after": null,
  "reason": "Confusion de la source, écartée (arbitrage du périmètre du lot 18) : la fiche attribue à 取る l'emploi « prendre une photo (shashin o toru) », qui est celui de 撮る, de même lecture. 撮る (n5_v_171) est validée au lot 08 avec ce sens, et sa nuance renvoie déjà à 取る. Aucun sens photographique n'est créé pour 取る ; un renvoi vers 撮る est conservé en nuance. Une confusion de la source est corrigée et journalisée, pas transformée en sens."
 },
 {
  "id": "A2-04-D1202",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_541",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Saisir ou prendre un objet avec la main : action générale, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1203",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_541",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Obtenir une note ou un permis : action générale, sans domaine thématique propre ; la fiche ne le rattache ni à l'école ni à l'administration en particulier. Addendum A5."
 }
]
```

## 変える — `v_545`

### Fiche source `n5_v_545`

```json
{
 "id": "n5_v_545",
 "level": "N5",
 "word": "変える",
 "word_furigana": "<ruby>変<rt>か</rt></ruby>える",
 "reading": "かえる",
 "romaji": "kaeru",
 "meanings": {
  "primary": "Changer",
  "secondary": [
   "Modifier",
   "Transformer",
   "Remplacer"
  ]
 },
 "nuance": "**Verbe transitif (groupe ichidan / ru)** exprimant l'action de modifier, de transformer ou de remplacer quelque chose (par opposition au verbe intransitif *kawaru* qui désigne un changement qui se produit de lui-même).",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "changement",
 "kanji_list": [
  "変"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "よみかた を **<ruby>変<rt>か</rt></ruby>え** ます 。",
  "romaji": "yomikata o kaemasu.",
  "french": "Je **change** la manière de lire.",
  "highlight": [
   "変える",
   "kaeru"
  ]
 }
}
```

### Anciens exemples de `n5_v_545` (3)

```json
[
 {
  "japanese": "お<ruby>金<rt>かね</rt></ruby> を <ruby>小銭<rt>こぜに</rt></ruby> に <ruby>変<rt>か</rt></ruby>えて ください",
  "romaji": "okane o kozeni ni kaete kudasai.",
  "french": "Veuillez **changer** mon argent en monnaie (pièces).",
  "highlight": [
   "変える",
   "kaeru"
  ]
 },
 {
  "japanese": "プログラミング の <ruby>予定<rt>よてい</rt></ruby> を <ruby>変<rt>か</rt></ruby>えました",
  "romaji": "puroguramingu no yotei o kaamashita.",
  "french": "J'ai **changé** le planning de programmation.",
  "highlight": [
   "変える",
   "kaeru"
  ]
 },
 {
  "japanese": "<ruby>髪<rt>かみ</rt></ruby> の <ruby>形<rt>かたち</rt></ruby> を <ruby>変<rt>か</rt></ruby>えたい です",
  "romaji": "kami no katachi o kaetai desu.",
  "french": "Je voudrais **changer** de coupe de cheveux.",
  "highlight": [
   "変える",
   "kaeru"
  ]
 }
]
```

### ENTRY publiée `v_545`

```json
{
 "id": "v_545",
 "level": "N5",
 "word": "変える",
 "writings": [],
 "readings": [
  {
   "kana": "かえる",
   "romaji": "kaeru",
   "furigana": "<ruby>変<rt>か</rt></ruby>える",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Transitif : modifier, transformer ou remplacer quelque chose. よみかたを変えます (je change la manière de lire). La source l'oppose à l'intransitif « kawaru », pour un changement qui se produit de lui-même.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_545_s1",
   "meaning": {
    "primary": "Changer",
    "alternatives": [
     "Modifier",
     "Transformer",
     "Remplacer"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_545` (2)

```json
[
 {
  "id": "A2-04-D1232",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_545",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Modifier, transformer ou remplacer quelque chose : action générale, sans domaine thématique propre ; l'exemple de la fiche (la manière de lire) est abstrait. Addendum A5."
 },
 {
  "id": "A2-04-D1233",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_545",
  "field": "nuance",
  "kind": "decision",
  "before": "mention de la source : « par opposition au verbe intransitif kawaru »",
  "after": "aucune relation, aucune entrée ajoutée",
  "reason": "La fiche nomme « kawaru » en romaji seulement ; ce verbe n'est pas une entrée des sources. Rien n'est ajouté : ni entrée, ni graphie, ni relation (aucune relation n'est portée dans ce lot, et cette paire n'est pas parmi les quatre candidates à l'audit de 5.16, faute de second membre). La mention est conservée en nuance, telle que la source la donne."
 }
]
```

## 居る — `v_548`

### Fiche source `n5_v_548`

```json
{
 "id": "n5_v_548",
 "level": "N5",
 "word": "居る",
 "word_furigana": "<ruby>居<rt>い</rt></ruby>る",
 "reading": "いる",
 "romaji": "iru",
 "meanings": {
  "primary": "Être",
  "secondary": [
   "Se trouver",
   "Y avoir (pour les êtres vivants)"
  ]
 },
 "nuance": "**Verbe intransitif (groupe ichidan / ru)** exprimant l'existence ou la présence d'êtres animés (humains et animaux), par opposition à *aru* qui s'emploie pour les objets inanimés.",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "existence",
 "kanji_list": [
  "居"
 ],
 "particles": [
  "が",
  "に"
 ],
 "example": {
  "japanese": "へや の なか に こども が **<ruby>居<rt>い</rt></ruby>ます** 。",
  "romaji": "heya no naka ni kodomo ga imasu.",
  "french": "Il **y a** un enfant dans la pièce.",
  "highlight": [
   "居る",
   "iru"
  ]
 }
}
```

### Anciens exemples de `n5_v_548` (3)

```json
[
 {
  "japanese": "<ruby>部屋<rt>へや</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に <ruby>猫<rt>ねこ</rt></ruby> が <ruby>居<rt>いる</rt></ruby>ます",
  "romaji": "heya no naka ni neko ga imasu.",
  "french": "Il y **a** un chat à l'intérieur de la pièce.",
  "highlight": [
   "居る",
   "iru"
  ]
 },
 {
  "japanese": "<ruby>母<rt>はは</rt></ruby> は いま <ruby>台所<rt>だいどころ</rt></ruby> に <ruby>居<rt>いる</rt></ruby>ます",
  "romaji": "haha wa ima daidokoro ni imasu.",
  "french": "Ma mère **est** actuellement dans la cuisine.",
  "highlight": [
   "居る",
   "iru"
  ]
 },
 {
  "japanese": "<ruby>公園<rt>こうえん</rt></ruby> に たくさん の <ruby>子供<rt>こども</rt></ruby> が <ruby>居<rt>いる</rt></ruby>ます",
  "romaji": "kouen ni takusan no kodomo ga imasu.",
  "french": "Il **y a** beaucoup d'enfants dans le parc.",
  "highlight": [
   "居る",
   "iru"
  ]
 }
]
```

### ENTRY publiée `v_548`

```json
{
 "id": "v_548",
 "level": "N5",
 "word": "居る",
 "writings": [],
 "readings": [
  {
   "kana": "いる",
   "romaji": "iru",
   "furigana": "<ruby>居<rt>い</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "L'existence ou la présence d'êtres animés, humains et animaux : へやのなかにこどもが居ます (il y a un enfant dans la pièce). Pour les objets inanimés, on emploie ある.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_548_s1",
   "meaning": {
    "primary": "Y avoir (pour les êtres vivants)",
    "alternatives": [
     "Être",
     "Se trouver"
    ]
   },
   "category": null,
   "semantic_type": "etat",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が",
    "に"
   ]
  }
 ]
}
```

### Décisions de journal de `v_548` (3)

```json
[
 {
  "id": "A2-04-D1306",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_548",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Être",
   "Se trouver",
   "Y avoir (pour les êtres vivants)"
  ],
  "after": "un seul sens ; « Y avoir (pour les êtres vivants) » en traduction principale",
  "reason": "Un seul sens : la fiche décrit « l'existence ou la présence d'êtres animés », sans la possession que celle de ある ajoute. Chaque fiche décide pour elle-même. Type etat, comme le sens 1 de ある. « Y avoir (pour les êtres vivants) » passe en traduction principale, devant « Être », que la source donne en premier (arbitrage des choix du lot 20) : l'exemple de la fiche est précisément « il y a un enfant dans la pièce ». Aucune traduction n'est ajoutée ni retirée, seul l'ordre change. Le contraste avec ある reste dit en nuance."
 },
 {
  "id": "A2-04-D1307",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_548",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "L'existence ou la présence d'un être vivant : état général, sans domaine thématique propre, comme ある. Addendum A5."
 },
 {
  "id": "A2-04-D1308",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_548",
  "field": "writings",
  "kind": "decision",
  "before": "graphie いる, citée par la fiche de 要る (« homophone parfait de 居る et いる (exister) »)",
  "after": [],
  "reason": "Aucune graphie n'est ajoutée (arbitrage du périmètre du lot 20) : la fiche de 居る ne donne pas いる comme autre graphie ; elle n'est citée que par la fiche de 要る, pour expliquer l'homophonie, ce qui ne suffit pas à créer une graphie sur une autre ENTRY. La forme usuelle, 居る, est mécanique et reste celle de la source ; signalée pour la passe finale."
 }
]
```

## 座る — `v_551`

### Fiche source `n5_v_551`

```json
{
 "id": "n5_v_551",
 "level": "N5",
 "word": "座る",
 "word_furigana": "<ruby>座<rt>すわ</rt></ruby>る",
 "reading": "すわる",
 "romaji": "suwaru",
 "meanings": {
  "primary": "S'asseoir",
  "secondary": [
   "Prendre place"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u)** exprimant l'action de s'asseoir (souvent employé sous la forme en *-te iru* pour indiquer l'état « être assis »).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "mouvement_deplacement",
 "kanji_list": [
  "座"
 ],
 "particles": [
  "に"
 ],
 "example": {
  "japanese": "いす に **<ruby>座<rt>すわ</rt></ruby>っ** て ください 。",
  "romaji": "isu ni suwatte kudasai.",
  "french": "Veuillez **vous asseoir** sur la chaise.",
  "highlight": [
   "座る",
   "suwaru"
  ]
 }
}
```

### Anciens exemples de `n5_v_551` (3)

```json
[
 {
  "japanese": "どうぞ <ruby>椅子<rt>いす</rt></ruby> に <ruby>座<rt>すわ</rt></ruby>って ください",
  "romaji": "douzo isu ni suwatte kudasai.",
  "french": "Veuillez **vous asseoir** sur la chaise, je vous en prie.",
  "highlight": [
   "座る",
   "suwaru"
  ]
 },
 {
  "japanese": "<ruby>電車<rt>でんしゃ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> で <ruby>座<rt>すわ</rt></ruby>る <ruby>場所<rt>ばしょ</rt></ruby> が ありません",
  "romaji": "densha no naka de suwaru basho ga arimasen.",
  "french": "Il n'y a pas de place pour **s'asseoir** dans le train.",
  "highlight": [
   "座る",
   "suwaru"
  ]
 },
 {
  "japanese": "<ruby>公園<rt>こうえん</rt></ruby> の ベンチ に <ruby>座<rt>すわ</rt></ruby>って <ruby>話<rt>はな</rt></ruby>しました",
  "romaji": "kouen no benchi ni suwatte hanashimashita.",
  "french": "Nous **nous sommes assis** sur le banc du parc pour discuter.",
  "highlight": [
   "座る",
   "suwaru"
  ]
 }
]
```

### ENTRY publiée `v_551`

```json
{
 "id": "v_551",
 "level": "N5",
 "word": "座る",
 "writings": [],
 "readings": [
  {
   "kana": "すわる",
   "romaji": "suwaru",
   "furigana": "<ruby>座<rt>すわ</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "S'asseoir : いすに座ってください (veuillez vous asseoir sur la chaise). L'état « être assis » se dit à la forme en ている.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_551_s1",
   "meaning": {
    "primary": "S'asseoir",
    "alternatives": [
     "Prendre place"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "に"
   ]
  }
 ]
}
```

### Décisions de journal de `v_551` (2)

```json
[
 {
  "id": "A2-04-D1244",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_551",
  "field": "senses",
  "kind": "decision",
  "before": [
   "S'asseoir",
   "Prendre place"
  ],
  "after": "un seul sens ; « être assis » en nuance",
  "reason": "Un seul sens, de type action : s'asseoir. « Être assis », que la fiche place elle-même dans sa nuance (« souvent employé sous la forme en -te iru pour indiquer l'état »), est l'état qui en résulte ; il reste en nuance, et n'est ni une traduction ni un second sens (principe du lot 18, retenu pour cette fiche à l'arbitrage du périmètre du lot 19)."
 },
 {
  "id": "A2-04-D1245",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_551",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "S'asseoir : une posture du corps. Aucune catégorie du registre ne nomme les postures (le corps y est décrit par ses parties, l'espace par le déplacement) ; action générale. Addendum A5."
 }
]
```

## 待つ — `v_552`

### Fiche source `n5_v_552`

```json
{
 "id": "n5_v_552",
 "level": "N5",
 "word": "待つ",
 "word_furigana": "<ruby>待<rt>まつ</rt></ruby>つ",
 "reading": "まつ",
 "romaji": "matsu",
 "meanings": {
  "primary": "Attendre",
  "secondary": [
   "Patienter"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de patienter en attendant l'arrivée de quelqu'un ou qu'un événement se produise.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "temps",
 "kanji_list": [
  "待"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "えき で ともだち を **<ruby>待<rt>ま</rt></ruby>っ** て います 。",
  "romaji": "eki de tomodachi o matte imasu.",
  "french": "J'**attends** un ami à la gare.",
  "highlight": [
   "待つ",
   "matsu"
  ]
 }
}
```

### Anciens exemples de `n5_v_552` (3)

```json
[
 {
  "japanese": "<ruby>駅<rt>えき</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> で 10<ruby>分<rt>ぷん</rt></ruby> ほど <ruby>待<rt>ま</rt></ruby>ちました",
  "romaji": "eki no mae de juppun hodo machimashita.",
  "french": "J'ai **attendu** environ 10 minutes devant la gare.",
  "highlight": [
   "待つ",
   "matsu"
  ]
 },
 {
  "japanese": "「すみません、ちょっと <ruby>待<rt>ま</rt></ruby>ってください」「はい、わかりました」",
  "romaji": "'sumimasen, chotto matte kudasai' 'hai, wakarimashita.'",
  "french": "« Excusez-moi, attendez un instant s'il vous plaît. » « Oui, d'accord. »",
  "highlight": [
   "待つ",
   "matsu"
  ]
 },
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> の パーティー を とても <ruby>待<rt>ま</rt></ruby>ち<ruby>遠<rt>どお</rt></ruby>しく <ruby>思<rt>おも</rt></ruby>っています (または: <ruby>待<rt>ま</rt></ruby>っています)",
  "romaji": "ashita no paatii o totemo machi-doushiiku omotte imasu.",
  "french": "J'**attends** la fête de demain avec beaucoup d'impatience.",
  "highlight": [
   "待つ",
   "matsu"
  ]
 }
]
```

### ENTRY publiée `v_552`

```json
{
 "id": "v_552",
 "level": "N5",
 "word": "待つ",
 "writings": [],
 "readings": [
  {
   "kana": "まつ",
   "romaji": "matsu",
   "furigana": "<ruby>待<rt>ま</rt></ruby>つ",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Patienter en attendant l'arrivée de quelqu'un, ou qu'un événement se produise : えきでともだちを待っています (j'attends un ami à la gare).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_552_s1",
   "meaning": {
    "primary": "Attendre",
    "alternatives": [
     "Patienter"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_552` (2)

```json
[
 {
  "id": "A2-04-D1280",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_552",
  "field": "readings",
  "kind": "correction",
  "before": "<ruby>待<rt>まつ</rt></ruby>つ",
  "after": "<ruby>待<rt>ま</rt></ruby>つ",
  "reason": "Addendum A8 (I4) : les furigana de la source portent まつ sur 待 et sont suivis de つ ; ils se lisaient まつつ au lieu de まつ, la lecture en kana (romaji de la fiche : matsu). ま est porté par 待, つ est l'okurigana de la forme ; c'est la segmentation de l'exemple de la fiche (待っています). Les sources figées ne sont pas modifiées."
 },
 {
  "id": "A2-04-D1281",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_552",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Attendre quelqu'un ou quelque chose : action générale, sans domaine thématique propre. Addendum A5."
 }
]
```

## 死ぬ — `v_558`

### Fiche source `n5_v_558`

```json
{
 "id": "n5_v_558",
 "level": "N5",
 "word": "死ぬ",
 "word_furigana": "<ruby>死<rt>し</rt></ruby>ぬ",
 "reading": "しぬ",
 "romaji": "shinu",
 "meanings": {
  "primary": "Mourir",
  "secondary": [
   "Périr",
   "Décéder"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u exceptionnel - terminaison -nu)** désignant l'action biologique de cesser de vivre. C'est l'un des rares verbes en *-nu* de la langue japonaise (dont le radical change en *-nde* pour la forme en te).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "etat_sante",
 "kanji_list": [
  "死"
 ],
 "particles": [],
 "example": {
  "japanese": "むかし 、 ゆうめい な いぬ が **<ruby>死<rt>し</rt></ruby>ん** だ 。",
  "romaji": "mukashi, yuumei na inu ga shinda.",
  "french": "Autrefois, un chien célèbre est **mort**.",
  "highlight": [
   "死ぬ",
   "shinu"
  ]
 }
}
```

### Anciens exemples de `n5_v_558` (3)

```json
[
 {
  "japanese": "この <ruby>花<rt>はな</rt></ruby> は <ruby>水<rt>みず</rt></ruby> が ない と <ruby>死<rt>し</rt></ruby>んでしまいます",
  "romaji": "kono hana wa mizu ga nai to shinde shimaimasu.",
  "french": "Cette fleur **meurt** s'il n'y a pas d'eau.",
  "highlight": [
   "死ぬ",
   "shinu"
  ]
 },
 {
  "japanese": "<ruby>昔<rt>むかし</rt></ruby>、<ruby>有名<rt>ゆうめい</rt></ruby> な <ruby>作家<rt>さっか</rt></ruby> が <ruby>亡<rt>な</rt></ruby>くなりました (または: <ruby>死<rt>し</rt></ruby>にました)",
  "romaji": "mukashi, yuumei na sakka ga nakunarimashita.",
  "french": "Autrefois, un écrivain célèbre est **mort**.",
  "highlight": [
   "死ぬ",
   "shinu"
  ]
 },
 {
  "japanese": "「そんなに <ruby>怖<rt>こわ</rt></ruby>がらなくても <ruby>死<rt>し</rt></ruby>ぬ わけではありません」",
  "romaji": "'sonna ni kowaranakute mo shinu wake de wa arimasen.'",
  "french": "« Même sans avoir si peur, vous n'allez pas en **mourir**. »",
  "highlight": [
   "死ぬ",
   "shinu"
  ]
 }
]
```

### ENTRY publiée `v_558`

```json
{
 "id": "v_558",
 "level": "N5",
 "word": "死ぬ",
 "writings": [],
 "readings": [
  {
   "kana": "しぬ",
   "romaji": "shinu",
   "furigana": "<ruby>死<rt>し</rt></ruby>ぬ",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Cesser de vivre : むかし、ゆうめいないぬが死んだ (autrefois, un chien célèbre est mort). L'un des rares verbes en ぬ.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_558_s1",
   "meaning": {
    "primary": "Mourir",
    "alternatives": [
     "Décéder"
    ]
   },
   "category": null,
   "semantic_type": "evenement",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions de journal de `v_558` (3)

```json
[
 {
  "id": "A2-04-D1286",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_558",
  "field": "sens 1 · semantic_type",
  "kind": "decision",
  "before": null,
  "after": "evenement",
  "reason": "Type evenement, comme 生まれる dans ce lot : mourir survient à un être vivant. La catégorie de ce sens est décidée à part (D1299). La remarque de conjugaison de la fiche (verbe en -nu) est résumée en nuance."
 },
 {
  "id": "A2-04-D1287",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_558",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Périr"
  ],
  "after": null,
  "reason": "Redondant avec « Mourir », et plus littéraire."
 },
 {
  "id": "A2-04-D1299",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_558",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": "etre_humain › cycle_de_vie › mort",
  "after": null,
  "reason": "Aucune catégorie (arbitrage des choix du lot 19) : la proposition rangeait ce sens dans être humain › cycle de vie › mort. La fiche décrit « l'action biologique de cesser de vivre », et son exemple porte sur un chien : classer le verbe entier dans le cycle de vie humain serait artificiel, et le registre n'a pas de catégorie générale de la mort qui convienne au sens documenté. 生まれる, dans ce lot, garde naissance : sa fiche et son exemple portent sur une personne. Addendum A5."
 }
]
```

## 消える — `v_560`

### Fiche source `n5_v_560`

```json
{
 "id": "n5_v_560",
 "level": "N5",
 "word": "消える",
 "word_furigana": "<ruby>消<rt>き</rt></ruby>える",
 "reading": "きえる",
 "romaji": "kieru",
 "meanings": {
  "primary": "S'éteindre",
  "secondary": [
   "Disparaître",
   "S'effacer"
  ]
 },
 "nuance": "**Verbe intransitif (groupe ichidan / ru)** exprimant le fait qu'une lumière, un feu ou une source d'énergie s'éteint de lui-même, ou qu'une chose/personne disparaît de la vue (la contrepartie transitive étant *kesu* 消す).",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "changement",
 "kanji_list": [
  "消"
 ],
 "particles": [
  "が"
 ],
 "example": {
  "japanese": "へや の でんき が **<ruby>消<rt>き</rt></ruby>え** まし た 。",
  "romaji": "heya no denki ga kiemashita.",
  "french": "La lumière de la pièce **s'est éteinte**.",
  "highlight": [
   "消える",
   "kieru"
  ]
 }
}
```

### Anciens exemples de `n5_v_560` (3)

```json
[
 {
  "japanese": "<ruby>部屋<rt>へや</rt></ruby> の <ruby>電気<rt>でんき</rt></ruby> が <ruby>消<rt>き</rt></ruby>えて います",
  "romaji": "heya no denki ga kiete imasu.",
  "french": "La lumière de la pièce **est éteinte** (**s'éteint**).",
  "highlight": [
   "消える",
   "kieru"
  ]
 },
 {
  "japanese": "ぜんぶ の <ruby>明<rt>あか</rt></ruby>り が <ruby>消<rt>き</rt></ruby>えました",
  "romaji": "zenbu no akari ga kiemashita.",
  "french": "Toutes les lumières **se sont éteintes**.",
  "highlight": [
   "消える",
   "kieru"
  ]
 },
 {
  "japanese": "ホワイトボード の <ruby>字<rt>じ</rt></ruby> が <ruby>消<rt>き</rt></ruby>えやすい です",
  "romaji": "howaitoboodo no ji ga kieyasui desu.",
  "french": "Les caractères sur le tableau blanc **s'effacent** facilement.",
  "highlight": [
   "消える",
   "kieru"
  ]
 }
]
```

### ENTRY publiée `v_560`

```json
{
 "id": "v_560",
 "level": "N5",
 "word": "消える",
 "writings": [],
 "readings": [
  {
   "kana": "きえる",
   "romaji": "kieru",
   "furigana": "<ruby>消<rt>き</rt></ruby>える",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Intransitif. Éteindre ou effacer quelque chose se dit 消す.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_560_s1",
   "meaning": {
    "primary": "S'éteindre",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "evenement",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ],
   "nuance": "Une lumière, un feu ou une source d'énergie qui s'éteint : へやのでんきが消えました (la lumière de la pièce s'est éteinte)."
  },
  {
   "id": "v_560_s2",
   "meaning": {
    "primary": "Disparaître",
    "alternatives": [
     "S'effacer"
    ]
   },
   "category": null,
   "semantic_type": "evenement",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ],
   "nuance": "Une chose ou une personne qui disparaît de la vue."
  }
 ]
}
```

### Décisions de journal de `v_560` (4)

```json
[
 {
  "id": "A2-04-D1184",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_560",
  "field": "senses",
  "kind": "decision",
  "before": [
   "S'éteindre",
   "Disparaître",
   "S'effacer"
  ],
  "after": [
   "S1 S'éteindre (lumière, feu)",
   "S2 Disparaître (de la vue)"
  ],
  "reason": "Deux sens documentés par la fiche (« une lumière, un feu ou une source d'énergie s'éteint de lui-même, ou qu'une chose/personne disparaît de la vue ») : ce qui cesse de brûler ou de fonctionner, que l'exemple illustre (la lumière de la pièce), et ce qui cesse d'être visible ; deux référents, comme les trois sens de 出る (lot 04). Particule が de la fiche pour chacun. Type evenement pour les deux, comme le sens « apparaître » de 出る. « S'effacer » est rattaché au sens 2 : la fiche de 消える ne parle pas d'écriture. Sens 2 candidat ; alternative : un seul sens, la disparition passant en nuance."
 },
 {
  "id": "A2-04-D1185",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_560",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Une lumière, un feu ou une source d'énergie qui s'éteint : événement général, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1186",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_560",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Disparaître de la vue : événement général, sans domaine thématique propre, comme le sens « apparaître » de 出る (lot 04). Addendum A5."
 },
 {
  "id": "A2-04-D1187",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_560",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 18, report intégral à la passe finale 5.16). La paire 消える / 消す est inscrite comme candidate explicite à l'audit des relations de 5.16 (transitive_of / intransitive_of, registre A2-REL) : cette entrée en est le membre intransitif, l'autre est n5_v_561 (消す). La fiche nomme elle-même son correspondant ; il est dit en nuance."
 }
]
```

## 消す — `v_561`

### Fiche source `n5_v_561`

```json
{
 "id": "n5_v_561",
 "level": "N5",
 "word": "消す",
 "word_furigana": "<ruby>消<rt>け</rt></ruby>す",
 "reading": "けす",
 "romaji": "kesu",
 "meanings": {
  "primary": "Éteindre",
  "secondary": [
   "Effacer",
   "Faire disparaître"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** désignant l'action intentionnelle d'éteindre un appareil électrique, une lumière ou un feu, ou d'effacer des notes écrites (avec une gomme par exemple).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "消"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "ねる まえ に テレビ を **<ruby>消<rt>け</rt></ruby>し** て ください 。",
  "romaji": "neru mae ni terebi o keshite kudasai.",
  "french": "Veuillez **éteindre** la télévision avant de dormir.",
  "highlight": [
   "消す",
   "kesu"
  ]
 }
}
```

### Anciens exemples de `n5_v_561` (3)

```json
[
 {
  "japanese": "<ruby>寝<rt>ね</rt></ruby>る <ruby>前<rt>まえ</rt></ruby> に <ruby>部屋<rt>へや</rt></ruby> の <ruby>電気<rt>でんき</rt></ruby> を <ruby>消<rt>け</rt></ruby>して ください",
  "romaji": "neru mae ni heya no denki o keshite kudasai.",
  "french": "Veuillez **éteindre** la lumière de la pièce avant d'aller vous coucher.",
  "highlight": [
   "消す",
   "kesu"
  ]
 },
 {
  "japanese": "ノート の まちがい を ゴム で <ruby>消<rt>け</rt></ruby>しました",
  "romaji": "nooto no machigai o gomu de keshimashita.",
  "french": "J'ai **effacé** l'erreur sur le cahier avec une gomme.",
  "highlight": [
   "消す",
   "kesu"
  ]
 },
 {
  "japanese": "テレビ を <ruby>消<rt>け</rt></ruby>て、<ruby>勉強<rt>べんきょう</rt></ruby> を はじめましょう",
  "romaji": "terebi o keshite, benkyou o hajimemashou.",
  "french": "**Éteignons** la télévision et commençons à étudier.",
  "highlight": [
   "消す",
   "kesu"
  ]
 }
]
```

### ENTRY publiée `v_561`

```json
{
 "id": "v_561",
 "level": "N5",
 "word": "消す",
 "writings": [],
 "readings": [
  {
   "kana": "けす",
   "romaji": "kesu",
   "furigana": "<ruby>消<rt>け</rt></ruby>す",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Transitif, pour une action volontaire. S'éteindre et disparaître se disent 消える. La source donne aussi la traduction « faire disparaître », sans la développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_561_s1",
   "meaning": {
    "primary": "Éteindre",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [
    {
     "type": "transitive_of",
     "target": "v_560_s1"
    }
   ],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Un appareil électrique, une lumière ou un feu : ねるまえにテレビを消してください (veuillez éteindre la télévision avant de dormir)."
  },
  {
   "id": "v_561_s2",
   "meaning": {
    "primary": "Effacer",
    "alternatives": []
   },
   "category": {
    "level_1": "communication_langage",
    "level_2": "ecriture"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Des notes écrites, avec une gomme par exemple."
  }
 ]
}
```

### Décisions de journal de `v_561` (7)

```json
[
 {
  "id": "A2-04-D1188",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_561",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Éteindre",
   "Effacer",
   "Faire disparaître"
  ],
  "after": [
   "S1 Éteindre (appareil, lumière, feu)",
   "S2 Effacer (ce qui est écrit)"
  ],
  "reason": "Deux sens documentés par la fiche (« éteindre un appareil électrique, une lumière ou un feu, ou effacer des notes écrites (avec une gomme par exemple) ») : ce que l'on arrête, que l'exemple illustre (la télévision), et ce qui est écrit ; deux référents. Particule を de la fiche pour chacun. Chaque fiche décide pour elle-même : le sens 2 de 消す (effacer un écrit) n'est pas le symétrique du sens 2 de 消える (disparaître de la vue), et aucune symétrie n'est imposée. Sens 2 candidat ; alternative : un seul sens."
 },
 {
  "id": "A2-04-D1189",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_561",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Éteindre un appareil électrique, une lumière ou un feu : action générale, sans domaine thématique propre ; aucun domaine ne couvre à la fois l'appareil et le feu. Addendum A5."
 },
 {
  "id": "A2-04-D1190",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_561",
  "field": "sens 2 · category",
  "kind": "decision",
  "before": null,
  "after": "communication_langage › ecriture",
  "reason": "Effacer ce qui est écrit : communication et langage › écriture, au niveau 2 ; aucune sous-catégorie (écrire, systèmes d'écriture, orthographe) ne nomme l'effacement. Alternative laissée à l'arbitrage : aucune catégorie (A5), comme le sens 1."
 },
 {
  "id": "A2-04-D1191",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_561",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Faire disparaître"
  ],
  "after": null,
  "reason": "La nuance de la fiche ne décrit qu'éteindre et effacer. Signalée en nuance comme traduction de la source non développée, comme pour 厚い (lot 15) et 温い (lot 17)."
 },
 {
  "id": "A2-04-D1192",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_561",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 18, report intégral à la passe finale 5.16). La paire 消える / 消す est inscrite comme candidate explicite à l'audit des relations de 5.16 (transitive_of / intransitive_of, registre A2-REL) : cette entrée en est le membre transitif, l'autre est n5_v_560 (消える). La fiche nomme elle-même son correspondant ; il est dit en nuance."
 },
 {
  "id": "A2-04-D1576",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_561",
  "field": "entrée",
  "kind": "decision",
  "before": {
   "lot": "lot-18",
   "status": "validated",
   "journal": [
    "A2-04-D1188",
    "A2-04-D1189",
    "A2-04-D1190",
    "A2-04-D1191",
    "A2-04-D1192"
   ],
   "fields": {
    "writings": [],
    "suru_compatible": false,
    "suffix": false,
    "counter": null,
    "nuance": "Transitif, pour une action volontaire. S'éteindre et disparaître se disent 消える. La source donne aussi la traduction « faire disparaître », sans la développer.",
    "tags": [],
    "senses": [
     {
      "meaning": {
       "primary": "Éteindre",
       "alternatives": []
      },
      "category": null,
      "semantic_type": "action",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      },
      "particles": [
       "を"
      ],
      "nuance": "Un appareil électrique, une lumière ou un feu : ねるまえにテレビを消してください (veuillez éteindre la télévision avant de dormir)."
     },
     {
      "meaning": {
       "primary": "Effacer",
       "alternatives": []
      },
      "category": {
       "level_1": "communication_langage",
       "level_2": "ecriture"
      },
      "semantic_type": "action",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      },
      "particles": [
       "を"
      ],
      "nuance": "Des notes écrites, avec une gomme par exemple."
     }
    ]
   }
  },
  "after": "rouverte : relation ajoutée (v_561_s1 transitive_of v_560_s1) ; rien d'autre ne change",
  "reason": "Réouverture explicite d'une ENTRY validée (arbitrage du périmètre de la passe finale 5.16, Q1 : un lot 26, qui ne rouvre que les ENTRY dont les données changent). 消す (n5_v_561), validée au lot 18, est rouverte pour y noter la relation arbitrée (Q4, R4). Son état validé est conservé en entier dans le champ « avant » de cette décision. Ses décisions historiques (D1188, D1189, D1190, D1191, D1192) ne sont pas modifiées : elles restent au journal, validées, et citées par l'entrée."
 },
 {
  "id": "A2-04-D1577",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_561",
  "field": "sens 1 · relations",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "type": "transitive_of",
    "target": "v_560_s1"
   }
  ],
  "reason": "Relation transitive_of de v_561_s1 (消す, « Éteindre ») vers v_560_s1 (消える, « S'éteindre ») : arbitrage du périmètre de 5.16 (Q4, R4). Candidate inscrite par D1187 et D1192. Le lien ne porte que sur les sens 1 : aucune relation entre « Effacer » (消す, sens 2) et « Disparaître » (消える, sens 2), aucune symétrie n'étant imposée entre eux (D1188). I12 : la paire transitive_of / intransitive_of n'est notée qu'une fois, sur le sens du verbe transitif ; 消える (n5_v_560) n'est ni modifiée ni rouverte."
 }
]
```

## 渡す — `v_562`

### Fiche source `n5_v_562`

```json
{
 "id": "n5_v_562",
 "level": "N5",
 "word": "渡す",
 "word_furigana": "<ruby>渡<rt>わた</rt></ruby>す",
 "reading": "わたす",
 "romaji": "watasu",
 "meanings": {
  "primary": "Remettre",
  "secondary": [
   "Donner en main propre",
   "Transférer",
   "Faire traverser"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de remettre un objet directement à quelqu'un d'autre de la main à la main, ou de faire traverser quelque chose.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "transaction",
 "kanji_list": [
  "渡"
 ],
 "particles": [
  "を",
  "に"
 ],
 "example": {
  "japanese": "せんせい に しょるい を **<ruby>渡<rt>わた</rt></ruby>し** まし た 。",
  "romaji": "sensei ni shorui o watashimashita.",
  "french": "J'ai **remis** les documents au professeur.",
  "highlight": [
   "渡す",
   "watasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_562` (3)

```json
[
 {
  "japanese": "「すみません、この <ruby>書類<rt>しょるい</rt></ruby> を <ruby>先生<rt>せんせい</rt></ruby> に <ruby>渡<rt>わた</rt></ruby>して ください」「はい、わかりました」",
  "romaji": "'sumimasen, kono shorui o sensei ni watashite kudasai' 'hai, wakarimashita.'",
  "french": "« Excusez-moi, veuillez **remettre** ce document au professeur. » « Oui, d'accord. »",
  "highlight": [
   "渡す",
   "watasu"
  ]
 },
 {
  "japanese": "<ruby>駅<rt>えき</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> で <ruby>友達<rt>ともだち</rt></ruby> に プレゼント を <ruby>渡<rt>わた</rt></ruby>しました",
  "romaji": "eki no mae de tomodachi ni purezento o watashimashita.",
  "french": "J'ai **remis** un cadeau à mon ami devant la gare.",
  "highlight": [
   "渡す",
   "watasu"
  ]
 },
 {
  "japanese": "<ruby>荷物<rt>にもつ</rt></ruby> を <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>る とき に、<ruby>名前<rt>なまえ</rt></ruby> を <ruby>書<rt>か</rt></ruby>いた <ruby>紙<rt>かみ</rt></ruby> を <ruby>渡<rt>わた</rt></ruby>します",
  "romaji": "nimotsu o uketoru toki ni, namae o kaita kami o watashimasu.",
  "french": "Au moment de récupérer le colis, on **remet** le papier où le nom est écrit.",
  "highlight": [
   "渡す",
   "watasu"
  ]
 }
]
```

### ENTRY publiée `v_562`

```json
{
 "id": "v_562",
 "level": "N5",
 "word": "渡す",
 "writings": [],
 "readings": [
  {
   "kana": "わたす",
   "romaji": "watasu",
   "furigana": "<ruby>渡<rt>わた</rt></ruby>す",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_562_s1",
   "meaning": {
    "primary": "Remettre",
    "alternatives": [
     "Donner en main propre"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を",
    "に"
   ],
   "nuance": "Remettre un objet directement à quelqu'un, de la main à la main : せんせいにしょるいを渡しました (j'ai remis les documents au professeur)."
  },
  {
   "id": "v_562_s2",
   "meaning": {
    "primary": "Faire traverser",
    "alternatives": []
   },
   "category": {
    "level_1": "espace_proprietes_spatiales",
    "level_2": "parcours_trajectoire"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [
    {
     "type": "transitive_of",
     "target": "v_563_s1"
    }
   ],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Faire traverser quelque chose."
  }
 ]
}
```

### Décisions de journal de `v_562` (6)

```json
[
 {
  "id": "A2-04-D1272",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_562",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Remettre",
   "Donner en main propre",
   "Transférer",
   "Faire traverser"
  ],
  "after": [
   "S1 Remettre (à quelqu'un)",
   "S2 Faire traverser"
  ],
  "reason": "Deux sens documentés par la fiche (« remettre un objet directement à quelqu'un d'autre de la main à la main, ou de faire traverser quelque chose ») : un objet que l'on remet à une personne, ce que l'exemple illustre, et une chose que l'on fait passer de l'autre côté ; deux référents. La nuance nomme le second sans le détailler davantage : il reste candidat. Particules de la fiche : を et に pour le premier, を pour le second. Le sens 2 est dans la catégorie de 渡る « traverser » (lot 04), espace › parcours et trajectoire ; 渡る n'est pas modifiée. Sens 2 candidat ; alternative laissée à l'arbitrage : un seul sens, « faire traverser » étant signalée en nuance."
 },
 {
  "id": "A2-04-D1273",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_562",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Remettre un objet à quelqu'un, de la main à la main : action générale, sans domaine thématique propre, comme 貸す. Addendum A5."
 },
 {
  "id": "A2-04-D1274",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_562",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Transférer"
  ],
  "after": null,
  "reason": "Plus large que ce que décrit la fiche (remettre de la main à la main, faire traverser)."
 },
 {
  "id": "A2-04-D1275",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_562",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 19, report intégral à la passe finale 5.16). La paire 渡す / 渡る est inscrite comme candidate explicite à l'audit des relations de 5.16, pour l'examen transitive_of / intransitive_of (registre A2-REL) : cette entrée en serait le membre transitif ; sa fiche ne nomme pas 渡る ; l'autre membre est n5_v_563 (渡る), validée au lot 04 et non modifiée."
 },
 {
  "id": "A2-04-D1582",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_562",
  "field": "entrée",
  "kind": "decision",
  "before": {
   "lot": "lot-19",
   "status": "validated",
   "journal": [
    "A2-04-D1272",
    "A2-04-D1273",
    "A2-04-D1274",
    "A2-04-D1275"
   ],
   "fields": {
    "writings": [],
    "suru_compatible": false,
    "suffix": false,
    "counter": null,
    "nuance": null,
    "tags": [],
    "senses": [
     {
      "meaning": {
       "primary": "Remettre",
       "alternatives": [
        "Donner en main propre"
       ]
      },
      "category": null,
      "semantic_type": "action",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      },
      "particles": [
       "を",
       "に"
      ],
      "nuance": "Remettre un objet directement à quelqu'un, de la main à la main : せんせいにしょるいを渡しました (j'ai remis les documents au professeur)."
     },
     {
      "meaning": {
       "primary": "Faire traverser",
       "alternatives": []
      },
      "category": {
       "level_1": "espace_proprietes_spatiales",
       "level_2": "parcours_trajectoire"
      },
      "semantic_type": "action",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      },
      "particles": [
       "を"
      ],
      "nuance": "Faire traverser quelque chose."
     }
    ]
   }
  },
  "after": "rouverte : relation ajoutée (v_562_s2 transitive_of v_563_s1) ; rien d'autre ne change",
  "reason": "Réouverture explicite d'une ENTRY validée (arbitrage du périmètre de la passe finale 5.16, Q1 : un lot 26, qui ne rouvre que les ENTRY dont les données changent). 渡す (n5_v_562), validée au lot 19, est rouverte pour y noter la relation arbitrée (Q4, R7). Son état validé est conservé en entier dans le champ « avant » de cette décision. Ses décisions historiques (D1272, D1273, D1274, D1275) ne sont pas modifiées : elles restent au journal, validées, et citées par l'entrée."
 },
 {
  "id": "A2-04-D1583",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_562",
  "field": "sens 2 · relations",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "type": "transitive_of",
    "target": "v_563_s1"
   }
  ],
  "reason": "Relation transitive_of de v_562_s2 (渡す, « Faire traverser ») vers v_563_s1 (渡る, « Traverser ») : arbitrage du périmètre de 5.16 (Q4, R7). Candidate inscrite par D1275, pour examen ; 渡る est validée au lot 04. Le lien part du sens 2 de 渡す, « Faire traverser », et non de son sens 1, « Remettre ». I12 : la paire transitive_of / intransitive_of n'est notée qu'une fois, sur le sens du verbe transitif ; 渡る (n5_v_563) n'est ni modifiée ni rouverte."
 }
]
```

## 無くす — `v_564`

### Fiche source `n5_v_564`

```json
{
 "id": "n5_v_564",
 "level": "N5",
 "word": "無くす",
 "word_furigana": "<ruby>無<rt>な</rt></ruby>くす",
 "reading": "なくす",
 "romaji": "nakusu",
 "meanings": {
  "primary": "Perdre (un objet)",
  "secondary": [
   "Égarer",
   "Se débarrasser de"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de perdre un objet matériel, de l'égarer au point de ne plus le retrouver (à ne pas confondre avec le verbe intransitif *nakunaru* なくなる qui signifie « disparaître » ou « décéder »).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "possession",
 "kanji_list": [
  "無"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "さいふ を **<ruby>無<rt>な</rt></ruby>くし** まし た 。",
  "romaji": "saifu o nakushimashita.",
  "french": "J'ai **perdu** mon portefeuille.",
  "highlight": [
   "無くす",
   "nakusu"
  ]
 }
}
```

### Anciens exemples de `n5_v_564` (3)

```json
[
 {
  "japanese": "<ruby>大切<rt>たいせつ</rt></ruby> な お<ruby>金<rt>かね</rt></ruby> を <ruby>無<rt>な</rt></ruby>くしてしまいました",
  "romaji": "taisetsu na okane o nakushite shimaimashita.",
  "french": "J'ai **perdu** mon argent précieux.",
  "highlight": [
   "無くす",
   "nakusu"
  ]
 },
 {
  "japanese": "<ruby>昨日<rt>きのう</rt></ruby> かばん の <ruby>中<rt>なか</rt></ruby> で スマホ の カギ を <ruby>無<rt>な</rt></ruby>くしました",
  "romaji": "kinou kaban no naka de sumaho no kagi o nakushimashita.",
  "french": "J'ai **perdu** la clé de mon smartphone dans mon sac hier.",
  "highlight": [
   "無くす",
   "nakusu"
  ]
 },
 {
  "japanese": "<ruby>パスポート<rt>ぱすぽーと</rt></ruby> を <ruby>無<rt>な</rt></ruby>くしたら、どう すれば いい ですか",
  "romaji": "pasupooto o nakushitara, dou sureba ii desu ka.",
  "french": "Que dois-je faire si je **perds** mon passeport ?",
  "highlight": [
   "無くす",
   "nakusu"
  ]
 }
]
```

### Fiche source `n5_v_601`

```json
{
 "id": "n5_v_601",
 "level": "N5",
 "word": "無くす",
 "word_furigana": "<ruby>無<rt>な</rt></ruby>くす",
 "reading": "なくす",
 "romaji": "nakusu",
 "meanings": {
  "primary": "Perdre",
  "secondary": [
   "Égarer",
   "Faire disparaître"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de perdre un objet matériel ou de l'égarer (s'écrit souvent en kana *なくす* dans les textes d'apprentissage débutants).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "possession",
 "kanji_list": [
  "無"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "かぎ を **なくし** まし た 。",
  "romaji": "kagi o nakushimashita.",
  "french": "J'ai **perdu** mes clés.",
  "highlight": [
   "無くす",
   "nakusu"
  ]
 }
}
```

### Anciens exemples de `n5_v_601` (3)

```json
[
 {
  "japanese": "<ruby>大切<rt>たいせつ</rt></ruby> な お<ruby>金<rt>かね</rt></ruby> を なくしてしまいました",
  "romaji": "taisetsu na okane o nakushite shimaimashita.",
  "french": "J'ai **perdu** mon argent précieux.",
  "highlight": [
   "なくす",
   "nakusu"
  ]
 },
 {
  "japanese": "<ruby>昨日<rt>きのう</rt></ruby> <ruby>駅<rt>えき</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>く で ケータイ を なくしました",
  "romaji": "kinou eki no chikaku de keetai o nakushimashita.",
  "french": "J'ai **perdu** mon téléphone portable près de la gare hier.",
  "highlight": [
   "なくす",
   "nakusu"
  ]
 },
 {
  "japanese": "<ruby>切符<rt>きっぷ</rt></ruby> を なくした ら、どう すれば いい です か",
  "romaji": "kippu o nakushitara, dou sureba ii desu ka.",
  "french": "Que dois-je faire si je **perds** mon ticket ?",
  "highlight": [
   "なくす",
   "nakusu"
  ]
 }
]
```

### ENTRY publiée `v_564`

```json
{
 "id": "v_564",
 "level": "N5",
 "word": "無くす",
 "writings": [],
 "readings": [
  {
   "kana": "なくす",
   "romaji": "nakusu",
   "furigana": "<ruby>無<rt>な</rt></ruby>くす",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Transitif (を) ; ne pas confondre avec l'intransitif 無くなる (disparaître, être perdu).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_564_s1",
   "meaning": {
    "primary": "Perdre (un objet)",
    "alternatives": [
     "Égarer"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_564` (3)

```json
[
 {
  "id": "A2-04-D0010",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_601",
  "field": "entrée",
  "kind": "fusion",
  "before": null,
  "after": "n5_v_564",
  "reason": "Doublon exact de 無くす ; n5_v_564 survit (plus petit numéro)."
 },
 {
  "id": "A2-04-D0046",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_564",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Se débarrasser de"
  ],
  "after": null,
  "reason": "Sens de 無くす au sens de « supprimer » (無くす = faire disparaître) : hors N5, non repris ; à rouvrir si un lot le juge utile."
 },
 {
  "id": "A2-04-D0069",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_564",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "« Perdre (un objet) » : action générale, hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5."
 }
]
```

## 磨く — `v_567`

### Fiche source `n5_v_567`

```json
{
 "id": "n5_v_567",
 "level": "N5",
 "word": "磨く",
 "word_furigana": "<ruby>磨<rt>みが</rt></ruby>く",
 "reading": "みがく",
 "romaji": "migaku",
 "meanings": {
  "primary": "Brosser",
  "secondary": [
   "Polir",
   "Frotter",
   "Nettoyer (les dents, des chaussures)"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de frotter pour nettoyer ou faire briller, le plus souvent utilisé pour se brosser les dents (*ha o migaku*) ou cirer des chaussures.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "vie_quotidienne",
 "kanji_list": [
  "磨"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "まいあさ は を **<ruby>磨<rt>みが</rt></ruby>き** ます 。",
  "romaji": "maiasa ha o migakimasu.",
  "french": "Je me **brosse** les dents tous les matins.",
  "highlight": [
   "磨く",
   "migaku"
  ]
 }
}
```

### Anciens exemples de `n5_v_567` (3)

```json
[
 {
  "japanese": "まいあさ ごはん を <ruby>食<rt>た</rt></ruby>べた <ruby>後<rt>あと</rt></ruby> で、<ruby>歯<rt>は</rt></ruby> を <ruby>磨<rt>みが</rt></ruby>きます",
  "romaji": "maiasa gohan o tabeta ato de, ha o migakimasu.",
  "french": "Je **brosse** mes dents tous les matins après avoir mangé.",
  "highlight": [
   "磨く",
   "migaku"
  ]
 },
 {
  "japanese": "くつ を <ruby>綺麗<rt>きれい</rt></ruby> に <ruby>磨<rt>みが</rt></ruby>いて ください",
  "romaji": "kutsu o kirei ni migaite kudasai.",
  "french": "Veuillez **lustrer** (**brosser**) proprement vos chaussures.",
  "highlight": [
   "磨く",
   "migaku"
  ]
 },
 {
  "japanese": "まいにち <ruby>日本語<rt>にほんご</rt></ruby> の スキル を <ruby>磨<rt>みが</rt></ruby>いています",
  "romaji": "mainichi nihongo no sukiru o migaite imasu.",
  "french": "Je **perfectionne** (**travaille**) mes compétences en japonais tous les jours.",
  "highlight": [
   "磨く",
   "migaku"
  ]
 }
]
```

### ENTRY publiée `v_567`

```json
{
 "id": "v_567",
 "level": "N5",
 "word": "磨く",
 "writings": [],
 "readings": [
  {
   "kana": "みがく",
   "romaji": "migaku",
   "furigana": "<ruby>磨<rt>みが</rt></ruby>く",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Frotter pour nettoyer ou faire briller ; le plus souvent, se brosser les dents ou cirer des chaussures. まいあさはを磨きます (je me brosse les dents tous les matins).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_567_s1",
   "meaning": {
    "primary": "Brosser",
    "alternatives": [
     "Polir",
     "Frotter"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_567` (3)

```json
[
 {
  "id": "A2-04-D1237",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_567",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Brosser",
   "Polir",
   "Frotter",
   "Nettoyer (les dents, des chaussures)"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens proposé : la fiche décrit un seul geste, « frotter pour nettoyer ou faire briller », et deux objets typiques, les dents et les chaussures. Un emploi avec un objet ne produit pas automatiquement un sens (lot 14). L'exemple porte sur les dents ; il est conservé en nuance avec les deux emplois. Un ancien exemple de contexte parle de perfectionner une compétence : il est en lecture seule, la fiche ne décrit pas cet emploi, et il n'établit aucun sens. Alternative laissée à l'arbitrage : deux sens, les dents (hygiène › soins bucco-dentaires) et les objets (entretien domestique › nettoyage)."
 },
 {
  "id": "A2-04-D1238",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_567",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Frotter pour nettoyer ou faire briller : action générale. Les dents relèveraient des soins bucco-dentaires et les chaussures de l'entretien ; aucun domaine ne couvre les deux, et le sens est unique. Addendum A5."
 },
 {
  "id": "A2-04-D1239",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_567",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Nettoyer (les dents, des chaussures)"
  ],
  "after": null,
  "reason": "Une glose, non une traduction : ses deux objets sont repris en nuance."
 }
]
```

## 立つ — `v_568`

### Fiche source `n5_v_568`

```json
{
 "id": "n5_v_568",
 "level": "N5",
 "word": "立つ",
 "word_furigana": "<ruby>立<rt>た</rt></ruby>つ",
 "reading": "たつ",
 "romaji": "tatsu",
 "meanings": {
  "primary": "Se lever",
  "secondary": [
   "Être debout",
   "Se dresser"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u)** exprimant l'action de se mettre debout ou d'être en position verticale (souvent employé à la forme en *-te iru* pour indiquer l'état « être debout »).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "mouvement_deplacement",
 "kanji_list": [
  "立"
 ],
 "particles": [],
 "example": {
  "japanese": "いす から **<ruby>立<rt>た</rt></ruby>っ** て ください 。",
  "romaji": "isu kara tatte kudasai.",
  "french": "Veuillez **vous lever** de la chaise.",
  "highlight": [
   "立つ",
   "tatsu"
  ]
 }
}
```

### Anciens exemples de `n5_v_568` (3)

```json
[
 {
  "japanese": "「<ruby>起<rt>お</rt></ruby>きなさい」と <ruby>言<rt>い</rt></ruby>われて、ベッド の <ruby>上<rt>うえ</rt></ruby> に <ruby>立<rt>た</rt></ruby>ちました (または: 起きました)",
  "romaji": "'okinasai' to iwarete, beddo no ue ni tachimashita.",
  "french": "On m'a dit « lève-toi », et je me suis **levé** sur le lit.",
  "highlight": [
   "立つ",
   "tatsu"
  ]
 },
 {
  "japanese": "<ruby>電車<rt>でんしゃ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> で <ruby>ずっと</ruby> <ruby>立<rt>た</rt></ruby>って いました",
  "romaji": "densha no naka de zutto tatte imashita.",
  "french": "Je suis resté **debout** tout le long dans le train.",
  "highlight": [
   "立つ",
   "tatsu"
  ]
 },
 {
  "japanese": "<ruby>先生<rt>せんせい</rt></ruby> が <ruby>入<rt>はい</rt></ruby>って きた とき、みんな <ruby>立<rt>た</rt></ruby>ちました",
  "romaji": "sensei ga haitte kita toki, minna tachimashita.",
  "french": "Tout le monde s'est **levé** quand le professeur est entré.",
  "highlight": [
   "立つ",
   "tatsu"
  ]
 }
]
```

### ENTRY publiée `v_568`

```json
{
 "id": "v_568",
 "level": "N5",
 "word": "立つ",
 "writings": [],
 "readings": [
  {
   "kana": "たつ",
   "romaji": "tatsu",
   "furigana": "<ruby>立<rt>た</rt></ruby>つ",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Se mettre debout : いすから立ってください (veuillez vous lever de la chaise). L'état « être debout » se dit à la forme en ている.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_568_s1",
   "meaning": {
    "primary": "Se lever",
    "alternatives": [
     "Se dresser"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions de journal de `v_568` (2)

```json
[
 {
  "id": "A2-04-D1246",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_568",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Se lever",
   "Être debout",
   "Se dresser"
  ],
  "after": "un seul sens ; « Être debout » en nuance",
  "reason": "Un seul sens, de type action : se mettre debout. « Être debout » n'est pas une autre traduction de « Se lever » : c'est l'état qui en résulte, que la fiche dit exprimé « à la forme en -te iru ». Il n'est ni gardé dans le sens ni érigé en second sens de type etat ; il est conservé en nuance (principe du lot 18, retenu pour cette fiche à l'arbitrage du périmètre du lot 19). La fiche ne donne aucune particule ; le から de son exemple n'est pas ajouté."
 },
 {
  "id": "A2-04-D1247",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_568",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Se mettre debout : une posture du corps, comme 座る ; aucune catégorie du registre ne nomme les postures. Action générale. Addendum A5."
 }
]
```

## 要る — `v_573`

### Fiche source `n5_v_573`

```json
{
 "id": "n5_v_573",
 "level": "N5",
 "word": "要る",
 "word_furigana": "<ruby>要<rt>い</rt></ruby>る",
 "reading": "いる",
 "romaji": "iru",
 "meanings": {
  "primary": "Avoir besoin de",
  "secondary": [
   "Être nécessaire",
   "Falloir"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u exceptionnel - i/e ru)** exprimant la nécessité ou le besoin de quelque chose (s'emploie généralement avec la particule *ga* pour l'objet requis). Homophone parfait de 居る et いる (exister).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "possession",
 "kanji_list": [
  "要"
 ],
 "particles": [
  "が"
 ],
 "example": {
  "japanese": "あたらしい ぱソコン が **<ruby>要<rt>い</rt></ruby>り** ます 。",
  "romaji": "atarashii pasokon ga irimasu.",
  "french": "J'**ai besoin** d'un nouvel ordinateur.",
  "highlight": [
   "要る",
   "iru"
  ]
 }
}
```

### Anciens exemples de `n5_v_573` (3)

```json
[
 {
  "japanese": "この <ruby>仕事<rt>しごと</rt></ruby> には パソコン が <ruby>要<rt>い</rt></ruby>ります",
  "romaji": "kono shigoto ni wa pasokon ga irimasu.",
  "french": "Ce travail **nécessite** (**a besoin d'**) un ordinateur.",
  "highlight": [
   "要る",
   "iru"
  ]
 },
 {
  "japanese": "<ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>旅行<rt>りょこう</rt></ruby> に お<ruby>金<rt>かね</rt></ruby> が いくら <ruby>要<rt>い</rt></ruby>ります か",
  "romaji": "raishuu no ryokou ni okane ga ikura irimasu ka.",
  "french": "Combien d'argent **faut-il** (**a-t-on besoin**) pour le voyage de la semaine prochaine ?",
  "highlight": [
   "要る",
   "iru"
  ]
 },
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> は <ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>る から、<ruby>傘<rt>かさ</rt></ruby> が <ruby>要<rt>い</rt></ruby>ります",
  "romaji": "ashita wa ame ga furu kara, kasa ga irimasu.",
  "french": "Il pleuvra demain, donc on **a besoin** d'un parapluie.",
  "highlight": [
   "要る",
   "iru"
  ]
 }
]
```

### ENTRY publiée `v_573`

```json
{
 "id": "v_573",
 "level": "N5",
 "word": "要る",
 "writings": [],
 "readings": [
  {
   "kana": "いる",
   "romaji": "iru",
   "furigana": "<ruby>要<rt>い</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "La nécessité ou le besoin de quelque chose ; ce dont on a besoin est marqué par が. De même lecture que 居る (exister) : c'est un autre mot.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_573_s1",
   "meaning": {
    "primary": "Avoir besoin de",
    "alternatives": [
     "Être nécessaire",
     "Falloir"
    ]
   },
   "category": null,
   "semantic_type": "etat",
   "dimensions": [
    {
     "axis": "necessite_facultativite",
     "pole": "necessite"
    }
   ],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ]
  }
 ]
}
```

### Décisions de journal de `v_573` (4)

```json
[
 {
  "id": "A2-04-D1312",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_573",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Avoir besoin de",
   "Être nécessaire",
   "Falloir"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens : la nécessité ou le besoin de quelque chose. Type etat : la fiche décrit une nécessité, non une action. 要る et 居る sont deux mots de même lecture, que la fiche distingue (« homophone parfait de 居る ») : aucune fusion, et leurs classes mécaniques diffèrent (groupe u pour 要る, ru pour 居る). Le renvoi est conservé en nuance."
 },
 {
  "id": "A2-04-D1313",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_573",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Avoir besoin de quelque chose : état général, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1314",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_573",
  "field": "nuance",
  "kind": "abandon",
  "before": "exemple de la source : « あたらしい ぱソコン が 要り ます » (« J'ai besoin d'un nouvel ordinateur »)",
  "after": null,
  "reason": "Anomalie de la source : l'exemple écrit ぱソコン, en mêlant hiragana et katakana. L'exemple n'est repris dans aucune nuance ; les exemples ne sont pas migrés, et l'anomalie est signalée pour le registre de phrases. Aucune information lexicale n'en est tirée."
 },
 {
  "id": "A2-04-D1366",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_573",
  "field": "sens 1 · dimensions",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "axis": "necessite_facultativite",
    "pole": "necessite"
   }
  ],
  "reason": "Dimension nécessité / facultativité, pôle nécessité : l'axe d'A2-DIM décrit directement le sens (la fiche le définit par « avoir besoin », « être nécessaire », « falloir »). Arbitrage des choix du lot 20, selon la doctrine arbitrée au lot 16 : un axe existant est employé lorsqu'il décrit directement le sens, et seulement alors."
 }
]
```

## 貸す — `v_575`

### Fiche source `n5_v_575`

```json
{
 "id": "n5_v_575",
 "level": "N5",
 "word": "貸す",
 "word_furigana": "<ruby>貸<rt>か</rt></ruby>す",
 "reading": "かす",
 "romaji": "kasu",
 "meanings": {
  "primary": "Prêter",
  "secondary": [
   "Louer (à quelqu'un)"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de prêter un objet à quelqu'un ou de lui louer un bien (par opposition à *kariru* 借りる qui signifie emprunter).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "transaction",
 "kanji_list": [
  "貸"
 ],
 "particles": [
  "を",
  "に"
 ],
 "example": {
  "japanese": "ともだち に かさ を **<ruby>貸<rt>か</rt></ruby>し** まし た 。",
  "romaji": "tomodachi ni kasa o kashimashita.",
  "french": "J'ai **prêté** mon parapluie à un ami.",
  "highlight": [
   "貸す",
   "kasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_575` (3)

```json
[
 {
  "japanese": "<ruby>友達<rt>ともだち</rt></ruby> に お<ruby>金<rt>かね</rt></ruby> を <ruby>貸<rt>か</rt></ruby>しました",
  "romaji": "tomodachi ni okane o kashimashita.",
  "french": "J'ai **prêté** de l'argent à un ami.",
  "highlight": [
   "貸す",
   "kasu"
  ]
 },
 {
  "japanese": "すみません、その ペン を ちょっと <ruby>貸<rt>か</rt></ruby>して ください",
  "romaji": "sumimasen, sono pen o chotto kashite kudasai.",
  "french": "Excusez-moi, veuillez me **prêter** ce stylo un instant.",
  "highlight": [
   "貸す",
   "kasu"
  ]
 },
 {
  "japanese": "<ruby>図書館<rt>としょかん</rt></ruby> で <ruby>本<rt>ほん</rt></ruby> を 3<ruby>冊<rt>さつ</rt></ruby> <ruby>貸<rt>か</rt></ruby>してもらいました",
  "romaji": "toshokan de hon o san-satsu kashite moraimashita.",
  "french": "On m'a **prêté** trois livres à la bibliothèque.",
  "highlight": [
   "貸す",
   "kasu"
  ]
 }
]
```

### ENTRY publiée `v_575`

```json
{
 "id": "v_575",
 "level": "N5",
 "word": "貸す",
 "writings": [],
 "readings": [
  {
   "kana": "かす",
   "romaji": "kasu",
   "furigana": "<ruby>貸<rt>か</rt></ruby>す",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Prêter un objet à quelqu'un, ou lui louer un bien : ともだちにかさを貸しました (j'ai prêté mon parapluie à un ami). Emprunter se dit 借りる.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_575_s1",
   "meaning": {
    "primary": "Prêter",
    "alternatives": [
     "Louer (à quelqu'un)"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を",
    "に"
   ]
  }
 ]
}
```

### Décisions de journal de `v_575` (2)

```json
[
 {
  "id": "A2-04-D1264",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_575",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Prêter un objet ou louer un bien à quelqu'un : action générale, sans domaine thématique propre ; le « prêt » du registre est un produit bancaire, et l'exemple porte sur un parapluie. Addendum A5."
 },
 {
  "id": "A2-04-D1265",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_575",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 19, report intégral à la passe finale 5.16). La paire 貸す / 借りる est inscrite comme candidate explicite à l'audit des relations de 5.16, pour reciprocal_with (registre A2-REL) : cette entrée est celle qui prête, et sa fiche nomme 借りる ; l'autre membre est n5_v_533 (借りる)."
 }
]
```

## 貼る — `v_576`

### Fiche source `n5_v_576`

```json
{
 "id": "n5_v_576",
 "level": "N5",
 "word": "貼る",
 "word_furigana": "<ruby>貼<rt>は</rt></ruby>る",
 "reading": "はる",
 "romaji": "haru",
 "meanings": {
  "primary": "Coller",
  "secondary": [
   "Afficher",
   "Fixer avec de la colle ou un adhésif"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** désignant l'action de coller un timbre, une affiche, une étiquette ou du ruban adhésif sur une surface.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "貼"
 ],
 "particles": [
  "を",
  "に"
 ],
 "example": {
  "japanese": "ふうとう に きって を **<ruby>貼<rt>は</rt></ruby>り** ます 。",
  "romaji": "fuutou ni kitte o harimasu.",
  "french": "Je **colle** un timbre sur l'enveloppe.",
  "highlight": [
   "貼る",
   "haru"
  ]
 }
}
```

### Anciens exemples de `n5_v_576` (3)

```json
[
 {
  "japanese": "ノート の <ruby>表紙<rt>ひょうし</rt></ruby> に シール を <ruby>貼<rt>は</rt></ruby>って います",
  "romaji": "nooto no hyoushi ni shiiru o hatte imasu.",
  "french": "J'ai **collé** un autocollant sur la couverture du cahier.",
  "highlight": [
   "貼る",
   "haru"
  ]
 },
 {
  "japanese": "<ruby>手紙<rt>てがみ</rt></ruby> の <ruby>封筒<rt>ふうとう</rt></ruby> に <ruby>切手<rt>きって</rt></ruby> を <ruby>貼<rt>は</rt></ruby>ります",
  "romaji": "tegami no fuutou ni kitte o harimasu.",
  "french": "Je **colle** un timbre sur l'enveloppe de la lettre.",
  "highlight": [
   "貼る",
   "haru"
  ]
 },
 {
  "japanese": "ここに <ruby>ポスター<rt>ぽすたー</rt></ruby> を <ruby>貼<rt>は</rt></ruby>って も いい です か",
  "romaji": "koko ni posutaa o hatte mo ii desu ka.",
  "french": "Puis-je **coller** une affiche ici ?",
  "highlight": [
   "貼る",
   "haru"
  ]
 }
]
```

### ENTRY publiée `v_576`

```json
{
 "id": "v_576",
 "level": "N5",
 "word": "貼る",
 "writings": [],
 "readings": [
  {
   "kana": "はる",
   "romaji": "haru",
   "furigana": "<ruby>貼<rt>は</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Coller un timbre, une affiche, une étiquette ou du ruban adhésif sur une surface : ふうとうにきってを貼ります (je colle un timbre sur l'enveloppe).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_576_s1",
   "meaning": {
    "primary": "Coller",
    "alternatives": [
     "Afficher"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を",
    "に"
   ]
  }
 ]
}
```

### Décisions de journal de `v_576` (2)

```json
[
 {
  "id": "A2-04-D1204",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_576",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Coller quelque chose sur une surface : action générale, sans domaine thématique propre ; le timbre de l'exemple n'est qu'un des objets que cite la fiche. Addendum A5."
 },
 {
  "id": "A2-04-D1205",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_576",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Fixer avec de la colle ou un adhésif"
  ],
  "after": null,
  "reason": "Une glose, non une traduction : reprise en nuance par les objets que cite la fiche."
 }
]
```

## 返す — `v_578`

### Fiche source `n5_v_578`

```json
{
 "id": "n5_v_578",
 "level": "N5",
 "word": "返す",
 "word_furigana": "<ruby>返<rt>かえ</rt></ruby>す",
 "reading": "かえす",
 "romaji": "kaesu",
 "meanings": {
  "primary": "Rendre",
  "secondary": [
   "Restituer",
   "Rembourser",
   "Renvoyer"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action de restituer un objet emprunté à son propriétaire, de rendre l'monnaie ou de rembourser une somme d'argent.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "transaction",
 "kanji_list": [
  "返"
 ],
 "particles": [
  "を",
  "に"
 ],
 "example": {
  "japanese": "としょかん に ほん を **<ruby>返<rt>かえ</rt></ruby>し** ます 。",
  "romaji": "toshokan ni hon o kaeshimasu.",
  "french": "Je **rends** le livre à la bibliothèque.",
  "highlight": [
   "返す",
   "kaesu"
  ]
 }
}
```

### Anciens exemples de `n5_v_578` (3)

```json
[
 {
  "japanese": "<ruby>図書館<rt>としょかん</rt></ruby> から <ruby>借<rt>か</rt></ruby>りた <ruby>本<rt>ほん</rt></ruby> を <ruby>返<rt>かえ</rt></ruby>しました",
  "romaji": "toshokan kara karita hon o kaeshimashita.",
  "french": "J'ai **rendu** le livre emprunté à la bibliothèque.",
  "highlight": [
   "返す",
   "kaesu"
  ]
 },
 {
  "japanese": "「すみません、この お<ruby>金<rt>かね</rt></ruby> を お<ruby>返<rt>かえ</rt></ruby>しします」「ありがとう」",
  "romaji": "'sumimasen, kono okane o okaeshi shimasu' 'arigatou.'",
  "french": "« Excusez-moi, je vous **rends** cet argent. » « Merci. »",
  "highlight": [
   "返す",
   "kaesu"
  ]
 },
 {
  "japanese": "<ruby>友達<rt>ともだち</rt></ruby> に <ruby>傘<rt>かさ</rt></ruby> を <ruby>返<rt>かえ</rt></ruby>す の を <ruby>忘<rt>wasu</rt></ruby>れました (または: <ruby>忘<rt>わす</rt></ruby>れました)",
  "romaji": "tomodachi ni kasa o kaesu no o wasuremashita.",
  "french": "J'ai oublié de **rendre** le parapluie à mon ami.",
  "highlight": [
   "返す",
   "kaesu"
  ]
 }
]
```

### ENTRY publiée `v_578`

```json
{
 "id": "v_578",
 "level": "N5",
 "word": "返す",
 "writings": [],
 "readings": [
  {
   "kana": "かえす",
   "romaji": "kaesu",
   "furigana": "<ruby>返<rt>かえ</rt></ruby>す",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Restituer un objet emprunté à son propriétaire, rendre la monnaie, ou rembourser une somme : としょかんにほんを返します (je rends le livre à la bibliothèque). La source donne aussi la traduction « renvoyer », sans la développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_578_s1",
   "meaning": {
    "primary": "Rendre",
    "alternatives": [
     "Restituer",
     "Rembourser"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を",
    "に"
   ]
  }
 ]
}
```

### Décisions de journal de `v_578` (3)

```json
[
 {
  "id": "A2-04-D1269",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_578",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Rendre",
   "Restituer",
   "Rembourser",
   "Renvoyer"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens proposé : la fiche réunit dans une même description restituer un objet emprunté, rendre la monnaie et rembourser une somme, trois objets pour un même geste, rendre ce qui revient à quelqu'un. Un emploi avec un objet ne produit pas automatiquement un sens (lot 14). Alternative laissée à l'arbitrage : un second sens pour l'argent."
 },
 {
  "id": "A2-04-D1270",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_578",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Rendre un objet, de la monnaie ou une somme : action générale, sans domaine thématique propre ; le remboursement seul relèverait des transactions, mais la fiche réunit les trois, et son exemple porte sur un livre. Addendum A5."
 },
 {
  "id": "A2-04-D1271",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_578",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Renvoyer"
  ],
  "after": null,
  "reason": "La nuance de la fiche ne décrit que rendre, restituer et rembourser. Signalée en nuance comme traduction de la source non développée (principe retenu au lot 18)."
 }
]
```

## 閉まる — `v_579`

### Fiche source `n5_v_579`

```json
{
 "id": "n5_v_579",
 "level": "N5",
 "word": "閉まる",
 "word_furigana": "<ruby>閉<rt>しま</rt></ruby>る",
 "reading": "しまる",
 "romaji": "shimaru",
 "meanings": {
  "primary": "Se fermer",
  "secondary": [
   "Être fermé"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u)** exprimant le fait qu'une porte, une fenêtre ou un magasin se ferme de lui-même ou est fermé (la contrepartie transitive étant *shimeru* 閉める).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "閉"
 ],
 "particles": [
  "が"
 ],
 "example": {
  "japanese": "ドア が **<ruby>閉<rt>しま</rt></ruby>り** まし た 。",
  "romaji": "doa ga shimarimashita.",
  "french": "La porte **s'est fermée**.",
  "highlight": [
   "閉まる",
   "shimaru"
  ]
 }
}
```

### Anciens exemples de `n5_v_579` (3)

```json
[
 {
  "japanese": "9<ruby>時<rt>じ</rt></ruby> に <ruby>デパート<rt>でぱーと</rt></ruby> の <ruby>扉<rt>とびら</rt></ruby> が <ruby>閉<rt>し</rt></ruby>まります",
  "romaji": "kuji ni depaato no tobira ga shimarimasu.",
  "french": "La porte du grand magasin **se ferme** à 9 heures.",
  "highlight": [
   "閉まる",
   "shimaru"
  ]
 },
 {
  "japanese": "<ruby>窓<rt>まど</rt></ruby> が しっかり <ruby>閉<rt>し</rt></ruby>まって います",
  "romaji": "mado ga shikkari shimatte imasu.",
  "french": "La fenêtre **est** fermée hermétiquement.",
  "highlight": [
   "閉まる",
   "shimaru"
  ]
 },
 {
  "japanese": "この ドア は <ruby>自動<rt>じどう</rt></ruby> で <ruby>閉<rt>し</rt></ruby>まります",
  "romaji": "kono doa wa jidou de shimarimasu.",
  "french": "Cette porte **se ferme** automatiquement.",
  "highlight": [
   "閉まる",
   "shimaru"
  ]
 }
]
```

### ENTRY publiée `v_579`

```json
{
 "id": "v_579",
 "level": "N5",
 "word": "閉まる",
 "writings": [],
 "readings": [
  {
   "kana": "しまる",
   "romaji": "shimaru",
   "furigana": "<ruby>閉<rt>し</rt></ruby>まる",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Intransitif : une porte, une fenêtre ou un magasin se ferme, de lui-même. ドアが閉まりました (la porte s'est fermée). Désigne aussi l'état qui en résulte : être fermé. Fermer quelque chose se dit 閉める.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_579_s1",
   "meaning": {
    "primary": "Se fermer",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "evenement",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ]
  }
 ]
}
```

### Décisions de journal de `v_579` (4)

```json
[
 {
  "id": "A2-04-D1176",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_579",
  "field": "readings",
  "kind": "correction",
  "before": "<ruby>閉<rt>しま</rt></ruby>る",
  "after": "<ruby>閉<rt>し</rt></ruby>まる",
  "reason": "Furigana de la source incohérents avec la forme : leur texte de base est 閉る, sans le ま de 閉まる, et しま est porté par le kanji. La lecture しまる et le romaji shimaru de la fiche sont repris tels quels ; し est porté par 閉, ま est l'okurigana de la forme. C'est la segmentation que donnent les trois anciens exemples de la fiche (閉まります, し sur 閉) et la fiche de 閉める (し sur 閉). L'exemple de la fiche a le même défaut ; la nuance l'écrit avec la forme de l'entrée. Les sources figées ne sont pas modifiées."
 },
 {
  "id": "A2-04-D1177",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_579",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Se fermer",
   "Être fermé"
  ],
  "after": "un seul sens ; « Être fermé » en nuance",
  "reason": "Un seul sens, de type evenement (arbitrage des choix du lot 18), examiné sur sa propre fiche avec le même critère que 開く : la fiche décrit ce qui « se ferme de lui-même ou est fermé », comme 止まる (lot 04). « Être fermé » n'est pas une autre traduction de « Se fermer » : un événement et l'état qui en résulte ne sont pas deux traductions équivalentes. Il n'est ni gardé dans le sens ni érigé en second sens de type etat ; il est conservé en nuance."
 },
 {
  "id": "A2-04-D1178",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_579",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Une porte, une fenêtre ou un magasin qui se ferme : événement général, sans domaine thématique propre, comme 開く. Addendum A5."
 },
 {
  "id": "A2-04-D1179",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_579",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 18, report intégral à la passe finale 5.16). La paire 閉まる / 閉める est inscrite comme candidate explicite à l'audit des relations de 5.16 (transitive_of / intransitive_of, registre A2-REL) : cette entrée en est le membre intransitif, l'autre est n5_v_709 (閉める). La fiche nomme elle-même son correspondant ; il est dit en nuance."
 }
]
```

## 開ける — `v_580`

### Fiche source `n5_v_580`

```json
{
 "id": "n5_v_580",
 "level": "N5",
 "word": "開ける",
 "word_furigana": "<ruby>開<rt>あ</rt></ruby>ける",
 "reading": "あける",
 "romaji": "akeru",
 "meanings": {
  "primary": "Ouvrir",
  "secondary": [
   "Déverrouiller",
   "Déballer"
  ]
 },
 "nuance": "**Verbe transitif (groupe ichidan / ru)** exprimant l'action intentionnelle d'ouvrir une porte, une fenêtre, une boîte ou un contenant (par opposition au verbe intransitif *aku* 開く qui signifie « s'ouvrir »).",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "開"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "まど を **<ruby>開<rt>あ</rt></ruby>け** て ください 。",
  "romaji": "mado o akete kudasai.",
  "french": "Veuillez **ouvrir** la fenêtre.",
  "highlight": [
   "開ける",
   "akeru"
  ]
 }
}
```

### Anciens exemples de `n5_v_580` (3)

```json
[
 {
  "japanese": "<ruby>暑<rt>あつ</rt></ruby>い ですから、<ruby>窓<rt>まど</rt></ruby> を <ruby>開<rt>あ</rt></ruby>けて ください",
  "romaji": "atsui desu kara, mado o akete kudasai.",
  "french": "Il fait chaud, veuillez **ouvrir** la fenêtre.",
  "highlight": [
   "開ける",
   "akeru"
  ]
 },
 {
  "japanese": "<ruby>朝<rt>あさ</rt></ruby> <ruby>起<rt>お</rt></ruby>きて すぐに カーテン を <ruby>開<rt>あ</rt></ruby>けました",
  "romaji": "asa okite suguni kaaten o akemashita.",
  "french": "Je me suis réveillé le matin et j'ai **ouvert** les rideaux tout de suite.",
  "highlight": [
   "開ける",
   "akeru"
  ]
 },
 {
  "japanese": "「すみません、その <ruby>箱<rt>はこ</rt></ruby> を <ruby>開<rt>あ</rt></ruby>けて も いい です か」",
  "romaji": "'sumimasen, sono hako o akete mo ii desu ka.'",
  "french": "« Excusez-moi, puis-je **ouvrir** cette boîte ? »",
  "highlight": [
   "開ける",
   "akeru"
  ]
 }
]
```

### ENTRY publiée `v_580`

```json
{
 "id": "v_580",
 "level": "N5",
 "word": "開ける",
 "writings": [],
 "readings": [
  {
   "kana": "あける",
   "romaji": "akeru",
   "furigana": "<ruby>開<rt>あ</rt></ruby>ける",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Transitif : ouvrir volontairement une porte, une fenêtre, une boîte ou un contenant. まどを開けてください (veuillez ouvrir la fenêtre). S'ouvrir se dit 開く. La source donne aussi la traduction « déverrouiller », sans la développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_580_s1",
   "meaning": {
    "primary": "Ouvrir",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [
    {
     "type": "transitive_of",
     "target": "v_710_s1"
    }
   ],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_580` (6)

```json
[
 {
  "id": "A2-04-D1172",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_580",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Ouvrir une porte, une fenêtre, une boîte ou un contenant : action générale, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1173",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_580",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Déverrouiller"
  ],
  "after": null,
  "reason": "La fiche ne parle ni de clé ni de verrou : ce n'est pas une traduction du sens qu'elle décrit. Signalée en nuance comme traduction de la source non développée, comme pour 厚い (lot 15) et 温い (lot 17)."
 },
 {
  "id": "A2-04-D1174",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_580",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Déballer"
  ],
  "after": null,
  "reason": "Plus étroit que le sens : ouvrir une boîte ou un contenant, que décrit la fiche, est dit en nuance."
 },
 {
  "id": "A2-04-D1175",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_580",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 18, report intégral à la passe finale 5.16). La paire 開く / 開ける est inscrite comme candidate explicite à l'audit des relations de 5.16 (transitive_of / intransitive_of, registre A2-REL) : cette entrée en est le membre transitif, l'autre est n5_v_710 (開く). La fiche nomme elle-même son correspondant ; il est dit en nuance."
 },
 {
  "id": "A2-04-D1572",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_580",
  "field": "entrée",
  "kind": "decision",
  "before": {
   "lot": "lot-18",
   "status": "validated",
   "journal": [
    "A2-04-D1172",
    "A2-04-D1173",
    "A2-04-D1174",
    "A2-04-D1175"
   ],
   "fields": {
    "writings": [],
    "suru_compatible": false,
    "suffix": false,
    "counter": null,
    "nuance": "Transitif : ouvrir volontairement une porte, une fenêtre, une boîte ou un contenant. まどを開けてください (veuillez ouvrir la fenêtre). S'ouvrir se dit 開く. La source donne aussi la traduction « déverrouiller », sans la développer.",
    "tags": [],
    "senses": [
     {
      "meaning": {
       "primary": "Ouvrir",
       "alternatives": []
      },
      "category": null,
      "semantic_type": "action",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      }
     }
    ]
   }
  },
  "after": "rouverte : relation ajoutée (v_580_s1 transitive_of v_710_s1) ; rien d'autre ne change",
  "reason": "Réouverture explicite d'une ENTRY validée (arbitrage du périmètre de la passe finale 5.16, Q1 : un lot 26, qui ne rouvre que les ENTRY dont les données changent). 開ける (n5_v_580), validée au lot 18, est rouverte pour y noter la relation arbitrée (Q4, R2). Son état validé est conservé en entier dans le champ « avant » de cette décision. Ses décisions historiques (D1172, D1173, D1174, D1175) ne sont pas modifiées : elles restent au journal, validées, et citées par l'entrée."
 },
 {
  "id": "A2-04-D1573",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_580",
  "field": "sens 1 · relations",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "type": "transitive_of",
    "target": "v_710_s1"
   }
  ],
  "reason": "Relation transitive_of de v_580_s1 (開ける, « Ouvrir ») vers v_710_s1 (開く, « S'ouvrir ») : arbitrage du périmètre de 5.16 (Q4, R2). Candidate inscrite par D1171 et D1175 ; chaque fiche nomme son correspondant. I12 : la paire transitive_of / intransitive_of n'est notée qu'une fois, sur le sens du verbe transitif ; 開く (n5_v_710) n'est ni modifiée ni rouverte."
 }
]
```

## やる — `v_608`

### Fiche source `n5_v_608`

```json
{
 "id": "n5_v_608",
 "level": "N5",
 "word": "やる",
 "word_furigana": "やる",
 "reading": "やる",
 "romaji": "yaru",
 "meanings": {
  "primary": "Faire",
  "secondary": [
   "Donner (à des plantes, des animaux)",
   "Jouer (à un jeu, un sport)"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** synonyme familier de *suru* (faire) ou *ageru* (donner à quelqu'un de inférieur, un animal ou une plante). Il est très employé à l'oral pour exprimer l'action de s'adonner à une activité ou de s'occuper de quelque chose.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "action",
 "kanji_list": [],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "あした 、 テニス を **やる** よ 。",
  "romaji": "ashita, tenisu o yaru yo.",
  "french": "Demain, je **fais** (joue au) tennis !",
  "highlight": [
   "やる",
   "yaru"
  ]
 }
}
```

### Anciens exemples de `n5_v_608` (3)

```json
[
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> から <ruby>新<rt>あたら</rt></ruby>しい アルバイト を やります",
  "romaji": "ashita kara atarashii arubaito o yarimasu.",
  "french": "Je **fais** un nouveau travail à temps partiel à partir de demain.",
  "highlight": [
   "やる",
   "yaru"
  ]
 },
 {
  "japanese": "「<ruby>宿題<rt>しゅくだい</rt></ruby> は もう やりました か」「はい、もう やりました」",
  "romaji": "'shukudai wa mou yarimashita ka' 'hai, mou yarimashita.'",
  "french": "« As-tu déjà **fait** tes devoirs ? » « Oui, je les ai déjà faits. »",
  "highlight": [
   "やる",
   "yaru"
  ]
 },
 {
  "japanese": "<ruby>庭<rt>にわ</rt></ruby> で テニス を やりましょう",
  "romaji": "niwa de tenisu o yarimashou.",
  "french": "**Faisons** du tennis dans le jardin.",
  "highlight": [
   "やる",
   "yaru"
  ]
 }
]
```

### ENTRY publiée `v_608`

```json
{
 "id": "v_608",
 "level": "N5",
 "word": "やる",
 "writings": [],
 "readings": [
  {
   "kana": "やる",
   "romaji": "yaru",
   "furigana": "やる",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_608_s1",
   "meaning": {
    "primary": "Faire",
    "alternatives": [
     "Jouer (à un jeu, un sport)"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Familier, très employé à l'oral, pour する : s'adonner à une activité, s'occuper de quelque chose. あした、テニスをやるよ (demain, je fais du tennis !)."
  },
  {
   "id": "v_608_s2",
   "meaning": {
    "primary": "Donner (à des plantes, des animaux)",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Donner à un animal, à une plante, ou à quelqu'un d'inférieur ; la fiche le rapproche de 上げる (« ageru »)."
  }
 ]
}
```

### Décisions de journal de `v_608` (5)

```json
[
 {
  "id": "A2-04-D1333",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_608",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Faire",
   "Donner (à des plantes, des animaux)",
   "Jouer (à un jeu, un sport)"
  ],
  "after": [
   "S1 Faire (familier)",
   "S2 Donner (à une plante, un animal)"
  ],
  "reason": "Deux sens documentés par la fiche (« synonyme familier de suru (faire) ou ageru (donner à quelqu'un d'inférieur, un animal ou une plante) ») : une activité que l'on fait, et une chose que l'on donne ; deux référents. « Jouer (à un jeu, un sport) » est rattaché au sens 1 : la fiche parle de « s'adonner à une activité », et son exemple se traduit « je fais (joue au) tennis ». Particule を de la fiche pour chacun. Le registre familier est dit en nuance. Sens 2 candidat ; alternative laissée à l'arbitrage : un troisième sens pour « jouer »."
 },
 {
  "id": "A2-04-D1334",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_608",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Faire, s'adonner à une activité : action la plus générale, sans domaine thématique propre, comme する. Addendum A5."
 },
 {
  "id": "A2-04-D1335",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_608",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Donner à un animal ou à une plante : action générale, sans domaine thématique propre ; la fiche ne la rattache ni au jardin ni à l'élevage. Addendum A5."
 },
 {
  "id": "A2-04-D1336",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_608",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 20, report intégral à la passe finale 5.16). La paire する / やる est inscrite comme candidate explicite à l'audit des relations de 5.16 : la fiche de やる nomme expressément « suru » comme synonyme familier pour « faire » (sens 1). L'autre membre est n5_v_181 (する), dans ce lot. Le type exact de la relation sera décidé à 5.16, sens par sens, parmi les relations officielles du registre A2-REL ; une relation ne servira pas à représenter le registre familier de やる."
 },
 {
  "id": "A2-04-D1337",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_608",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 20, report intégral à la passe finale 5.16). La paire やる / 上げる est inscrite comme candidate explicite à l'audit des relations de 5.16 : la fiche de やる nomme expressément « ageru » pour l'emploi « donner » (sens 2). L'autre membre est n5_v_527 (上げる), validée au lot 19 et non modifiée. Le type exact de la relation sera décidé à 5.16, sens par sens, parmi les relations officielles du registre A2-REL ; une relation ne servira pas à représenter le registre familier de やる."
 }
]
```

## 休む — `v_635`

### Fiche source `n5_v_635`

```json
{
 "id": "n5_v_635",
 "level": "N5",
 "word": "休む",
 "word_furigana": "<ruby>休<rt>やす</rt></ruby>む",
 "reading": "やすむ",
 "romaji": "yasumu",
 "meanings": {
  "primary": "Se reposer",
  "secondary": [
   "S'absenter",
   "Prendre un congé",
   "Faire une pause"
  ]
 },
 "nuance": "**Verbe intransitif / transitif (groupe u)** exprimant l'action de faire une pause pour récupérer, ou de s'absenter de l'école ou du travail (ex: *kaisha o yasumu* s'absenter du travail).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "repos",
 "kanji_list": [
  "休"
 ],
 "particles": [
  "を",
  "に"
 ],
 "example": {
  "japanese": "すこし **<ruby>休<rt>やす</rt></ruby>み** ます 。",
  "romaji": "sukoshi yasumimasu.",
  "french": "Je **me repose** un peu.",
  "highlight": [
   "休む",
   "yasumu"
  ]
 }
}
```

### Anciens exemples de `n5_v_635` (3)

```json
[
 {
  "japanese": "<ruby>疲<rt>つか</rt></ruby>れましたから、ちょっと <ruby>休<rt>やす</rt></ruby>みます",
  "romaji": "tsukaremashita kara, chotto yasumimasu.",
  "french": "Je suis fatigué, donc je **me repose** un instant.",
  "highlight": [
   "休む",
   "yasumu"
  ]
 },
 {
  "japanese": "「<ruby>体<rt>からだ</rt></ruby> が 悪いですから、きょう は <ruby>会社<rt>かいしゃ</rt></ruby> を <ruby>休<rt>やす</rt></ruby>みます」",
  "romaji": "'karada ga warui desu kara, kyou wa kaisha o yasumimasu.'",
  "french": "« Comme je ne me sens pas bien, je **prends congé** de l'entreprise aujourd'hui. »",
  "highlight": [
   "休む",
   "yasumu"
  ]
 },
 {
  "japanese": "お<ruby>昼<rt>ひる</rt></ruby> の <ruby>時間<rt>じかん</rt></ruby> に 1 <ruby>時間<rt>じかん</rt></ruby> <ruby>休<rt>やす</rt></ruby>みます",
  "romaji": "ohiru no jikan ni ichi-jikan yasumimasu.",
  "french": "Je **me repose** une heure pendant l'heure du midi.",
  "highlight": [
   "休む",
   "yasumu"
  ]
 }
]
```

### ENTRY publiée `v_635`

```json
{
 "id": "v_635",
 "level": "N5",
 "word": "休む",
 "writings": [],
 "readings": [
  {
   "kana": "やすむ",
   "romaji": "yasumu",
   "furigana": "<ruby>休<rt>やす</rt></ruby>む",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_635_s1",
   "meaning": {
    "primary": "Se reposer",
    "alternatives": [
     "Faire une pause"
    ]
   },
   "category": {
    "level_1": "etre_humain",
    "level_2": "etats_besoins_physiques",
    "level_3": "sommeil_repos"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Faire une pause pour récupérer : すこし休みます (je me repose un peu)."
  },
  {
   "id": "v_635_s2",
   "meaning": {
    "primary": "S'absenter",
    "alternatives": [
     "Prendre un congé"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "S'absenter de l'école ou du travail."
  }
 ]
}
```

### Décisions de journal de `v_635` (2)

```json
[
 {
  "id": "A2-04-D1248",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_635",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Se reposer",
   "S'absenter",
   "Prendre un congé",
   "Faire une pause"
  ],
  "after": [
   "S1 Se reposer",
   "S2 S'absenter (de l'école, du travail)"
  ],
  "reason": "Deux sens documentés par la fiche (« faire une pause pour récupérer, ou de s'absenter de l'école ou du travail ») : le repos, que l'exemple illustre, et l'absence ; deux référents. Particules : la fiche donne を et に, et dit le verbe « intransitif / transitif » ; elle n'illustre que を, pour l'absence (« kaisha o yasumu », s'absenter du travail), et son exemple du repos n'en porte aucune. を est donc rattachée au sens 2, aucune au sens 1 ; に, que la fiche donne sans l'illustrer, n'est rattachée à aucun sens. Le sens 1 est dans la catégorie proposée pour 寝る (sommeil et repos). Sens 2 candidat ; alternatives laissées à l'arbitrage : un seul sens ; ou に rattachée à l'un des deux."
 },
 {
  "id": "A2-04-D1249",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-19",
  "entry": "n5_v_635",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "S'absenter de l'école ou du travail : la fiche réunit les deux lieux ; « congés », dans le registre, relève des seules conditions de travail. Action générale. Addendum A5."
 }
]
```

## 使う — `v_637`

### Fiche source `n5_v_637`

```json
{
 "id": "n5_v_637",
 "level": "N5",
 "word": "使う",
 "word_furigana": "<ruby>使<rt>つか</rt></ruby>う",
 "reading": "つかう",
 "romaji": "tsukau",
 "meanings": {
  "primary": "Utiliser",
  "secondary": [
   "Se servir de",
   "Employer (un objet ou une langue)"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** très courant signifiant utiliser un objet, un outil, de l'argent, une langue ou un service.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "使"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "この パソコン を **<ruby>使<rt>つか</rt></ruby>い** ます 。",
  "romaji": "kono pasokon o tsukaimasu.",
  "french": "J'**utilise** cet ordinateur.",
  "highlight": [
   "使う",
   "tsukau"
  ]
 }
}
```

### Anciens exemples de `n5_v_637` (3)

```json
[
 {
  "japanese": "この パソコン を <ruby>使<rt>つか</rt></ruby>って も いい です か",
  "romaji": "kono pasokon o tsukatte mo ii desu ka.",
  "french": "Puis-je **utiliser** cet ordinateur ?",
  "highlight": [
   "使う",
   "tsukau"
  ]
 },
 {
  "japanese": "「<ruby>辞書<rt>じしょ</rt></ruby> を <ruby>使<rt>つか</rt></ruby>って <ruby>漢字<rt>かんじ</rt></ruby> を <ruby>調<rt>しら</rt></ruby>べます」",
  "romaji": "'jisho o tsukatte kanji o shirabemasu.'",
  "french": "« J'**utilise** le dictionnaire pour chercher le kanji. »",
  "highlight": [
   "使う",
   "tsukau"
  ]
 },
 {
  "japanese": "<ruby>料理<rt>りょうり</rt></ruby> に おいしい <ruby>水<rt>みず</rt></ruby> を <ruby>使<rt>つか</rt></ruby>います",
  "romaji": "ryouri ni oishii mizu o tsukaimasu.",
  "french": "J'**utilise** de l'eau délicieuse pour la cuisine.",
  "highlight": [
   "使う",
   "tsukau"
  ]
 }
]
```

### ENTRY publiée `v_637`

```json
{
 "id": "v_637",
 "level": "N5",
 "word": "使う",
 "writings": [],
 "readings": [
  {
   "kana": "つかう",
   "romaji": "tsukau",
   "furigana": "<ruby>使<rt>つか</rt></ruby>う",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Très courant : utiliser un objet, un outil, de l'argent, une langue ou un service. このパソコンを使います (j'utilise cet ordinateur).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_637_s1",
   "meaning": {
    "primary": "Utiliser",
    "alternatives": [
     "Se servir de",
     "Employer (un objet ou une langue)"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_637` (1)

```json
[
 {
  "id": "A2-04-D1206",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_637",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Utiliser un objet, un outil, de l'argent, une langue ou un service : action générale, sans domaine thématique propre ; la fiche réunit ces emplois dans une seule description. Addendum A5."
 }
]
```

## 出る — `v_642`

### Fiche source `n5_v_642`

```json
{
 "id": "n5_v_642",
 "level": "N5",
 "word": "出る",
 "word_furigana": "<ruby>出<rt>で</rt></ruby>る",
 "reading": "でる",
 "romaji": "deru",
 "meanings": {
  "primary": "Sortir",
  "secondary": [
   "Quitter",
   "Partir",
   "Apparaître"
  ]
 },
 "nuance": "**Verbe intransitif (groupe ru / ichidan)** exprimant l'action de quitter un lieu (souvent suivi de la particule *o* pour indiquer le lieu que l'on quitte, comme *heya o deru* sortir de la pièce) ou de se manifester.",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "mouvement_deplacement",
 "kanji_list": [
  "出"
 ],
 "particles": [
  "を",
  "から"
 ],
 "example": {
  "japanese": "いま いえ を **<ruby>出<rt>で</rt></ruby>ます** 。",
  "romaji": "ima ie o demasu.",
  "french": "Je **sors** de la maison maintenant.",
  "highlight": [
   "出る",
   "deru"
  ]
 }
}
```

### Anciens exemples de `n5_v_642` (3)

```json
[
 {
  "japanese": "<ruby>朝<rt>あさ</rt></ruby> 7 <ruby>時<rt>じ</rt></ruby> に <ruby>家<rt>いえ</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます",
  "romaji": "asa shichi-ji ni ie o demasu.",
  "french": "Je **sors** de la maison à 7 heures du matin.",
  "highlight": [
   "出る",
   "deru"
  ]
 },
 {
  "japanese": "「<ruby>雨<rt>あめ</rt></ruby> が <ruby>降<rt>ふ</rt></ruby>っていますから、<ruby>外<rt>そと</rt></ruby> へ <ruby>出<rt>で</rt></ruby>ない で ください」",
  "romaji": "'ame ga futte imasu kara, soto e denai de kudasai.'",
  "french": "« Comme il pleut, veuillez ne pas **sortir** dehors. »",
  "highlight": [
   "出る",
   "deru"
  ]
 },
 {
  "japanese": "<ruby>電車<rt>でんしゃ</rt></ruby> が <ruby>駅<rt>えき</rt></ruby> を <ruby>出<rt>で</rt></ruby>ました",
  "romaji": "densha ga eki o demashita.",
  "french": "Le train a **quitté** ('est **sorti** de') la gare.",
  "highlight": [
   "出る",
   "deru"
  ]
 }
]
```

### Fiche source `n5_v_537`

```json
{
 "id": "n5_v_537",
 "level": "N5",
 "word": "出ます",
 "word_furigana": "<ruby>出<rt>で</rt></ruby>ます",
 "reading": "でます",
 "romaji": "demasu",
 "meanings": {
  "primary": "Sortir",
  "secondary": [
   "Partir de",
   "Quitter",
   "Assister à"
  ]
 },
 "nuance": "**Verbe intransitif (groupe ichidan / ru)** – forme polie de *deru* (出る) – exprimant le fait de sortir d'un lieu, de quitter une pièce ou de participer à un événement.",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "mouvement_deplacement",
 "kanji_list": [
  "出"
 ],
 "particles": [
  "を",
  "から"
 ],
 "example": {
  "japanese": "まいあさ 8じ に いえ を **<ruby>出<rt>で</rt></ruby>ます** 。",
  "romaji": "maiasa hachiji ni ie o demasu.",
  "french": "Je **sers** (quitte) de la maison tous les matins à huit heures.",
  "highlight": [
   "出ます",
   "demasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_537` (3)

```json
[
 {
  "japanese": "まいあさ 7<ruby>時<rt>じ</rt></ruby> に <ruby>家<rt>いえ</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます",
  "romaji": "maiasa shichiji ni ie o demasu.",
  "french": "Je **sors** de la maison à 7 heures tous les matins.",
  "highlight": [
   "出ます",
   "demasu"
  ]
 },
 {
  "japanese": "<ruby>次<rt>つぎ</rt></ruby> の <ruby>駅<rt>えき</rt></ruby> で <ruby>電車<rt>でんしゃ</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます (または: <ruby>降<rt>お</rt></ruby>ります)",
  "romaji": "tsugi no eki de densha o demasu.",
  "french": "Je **sors** du train à la prochaine gare.",
  "highlight": [
   "出ます",
   "demasu"
  ]
 },
 {
  "japanese": "もう すぐ <ruby>部屋<rt>へや</rt></ruby> を <ruby>出<rt>で</rt></ruby>ます",
  "romaji": "mou sugu heya o demasu.",
  "french": "Je vais **sortir** de la chambre bientôt.",
  "highlight": [
   "出ます",
   "demasu"
  ]
 }
]
```

### ENTRY publiée `v_642`

```json
{
 "id": "v_642",
 "level": "N5",
 "word": "出る",
 "writings": [],
 "readings": [
  {
   "kana": "でる",
   "romaji": "deru",
   "furigana": "<ruby>出<rt>で</rt></ruby>る",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_642_s1",
   "meaning": {
    "primary": "Sortir",
    "alternatives": [
     "Quitter",
     "Partir"
    ]
   },
   "category": {
    "level_1": "espace_proprietes_spatiales",
    "level_2": "entree_sortie",
    "level_3": "entrer_sortir"
   },
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を",
    "から"
   ],
   "nuance": "部屋を出る : sortir de la pièce ; 駅を出る : sortir de la gare."
  },
  {
   "id": "v_642_s2",
   "meaning": {
    "primary": "Assister à",
    "alternatives": [
     "Participer à"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "に"
   ],
   "nuance": "授業に出る : assister au cours ; 会議に出る : participer à la réunion."
  },
  {
   "id": "v_642_s3",
   "meaning": {
    "primary": "Apparaître",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "evenement",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ],
   "nuance": "月が出る : la lune apparaît."
  }
 ]
}
```

### Décisions de journal de `v_642` (5)

```json
[
 {
  "id": "A2-04-D0335",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-04",
  "entry": "n5_v_537",
  "field": "entrée",
  "kind": "fusion",
  "before": null,
  "after": "n5_v_642",
  "reason": "出ます n'est pas une unité lexicale : c'est la forme polie conjuguée de 出る. Fusion dans 出る (arbitrage du lot 04) ; son sens « assister à » rejoint l'ENTRY survivante."
 },
 {
  "id": "A2-04-D0336",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-04",
  "entry": "n5_v_537",
  "field": "entrée",
  "kind": "exception-fusion",
  "before": "survivant par la règle : n5_v_537",
  "after": "survivant : n5_v_642",
  "reason": "Exception à la règle du plus petit numéro (addendum A3) : n5_v_537 est une représentation manifestement erronée (une forme conjuguée tenant lieu d'ENTRY) ; garder son identifiant ferait survivre la représentation incorrecte au moment où elle est corrigée. v_642 (出る) est conservé."
 },
 {
  "id": "A2-04-D0337",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-04",
  "entry": "n5_v_642",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Sortir",
   "Quitter",
   "Partir",
   "Apparaître",
   "Assister à (n5_v_537)"
  ],
  "after": [
   "S1 Sortir",
   "S2 Assister à",
   "S3 Apparaître"
  ],
  "reason": "Trois sens documentés par les deux sources fusionnées : quitter un lieu (を), prendre part à quelque chose (に, documenté par 出ます), et apparaître (が). Trois référents distincts, chacun avec sa particule."
 },
 {
  "id": "A2-04-D0338",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-04",
  "entry": "n5_v_642",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Prendre part à une activité (cours, réunion) : « action générale », sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D0339",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-04",
  "entry": "n5_v_642",
  "field": "sens 3 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Apparaître, devenir visible : « action générale », sans domaine thématique propre. Addendum A5."
 }
]
```

## 持つ — `v_665`

### Fiche source `n5_v_665`

```json
{
 "id": "n5_v_665",
 "level": "N5",
 "word": "持つ",
 "word_furigana": "<ruby>持<rt>も</rt></ruby>つ",
 "reading": "もつ",
 "romaji": "motsu",
 "meanings": {
  "primary": "Tenir",
  "secondary": [
   "Porter (en main)",
   "Posséder",
   "Avoir sur soi"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action physique de tenir ou de porter quelque chose dans ses mains, ou par extension de posséder un objet ou un sentiment.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "possession",
 "kanji_list": [
  "持"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "かばん を **<ruby>持<rt>も</rt></ruby>っ** て いき ます 。",
  "romaji": "kaban o motte ikimasu.",
  "french": "Je **porte** (tiens) mon sac en y allant.",
  "highlight": [
   "持つ",
   "motsu"
  ]
 }
}
```

### Anciens exemples de `n5_v_665` (3)

```json
[
 {
  "japanese": "「<ruby>重<rt>おも</rt></ruby>い <ruby>荷物<rt>にもつ</rt></ruby> ですから、<ruby>持<rt>も</rt></ruby>って あげます」",
  "romaji": "'omoi nimotsu desu kara, motte agemasu.'",
  "french": "« C'est un lourd bagage, alors je le **tiens** ('je le porte') pour vous. »",
  "highlight": [
   "持つ",
   "motsu"
  ]
 },
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> は <ruby>傘<rt>かさ</rt></ruby> を <ruby>持<rt>も</rt></ruby>って <ruby>出<rt>で</rt></ruby>かけて ください",
  "romaji": "ashita wa kasa o motte dekakete kudasai.",
  "french": "Demain, veuillez sortir en **tenant** ('en prenant') un parapluie.",
  "highlight": [
   "持つ",
   "motsu"
  ]
 },
 {
  "japanese": "「あなた は スマホ を <ruby>持<rt>も</rt></ruby>っています か」",
  "romaji": "'anata wa sumaho o motte imasu ka.'",
  "french": "« As-tu ('possèdes-tu') un smartphone ? »",
  "highlight": [
   "持つ",
   "motsu"
  ]
 }
]
```

### ENTRY publiée `v_665`

```json
{
 "id": "v_665",
 "level": "N5",
 "word": "持つ",
 "writings": [],
 "readings": [
  {
   "kana": "もつ",
   "romaji": "motsu",
   "furigana": "<ruby>持<rt>も</rt></ruby>つ",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_665_s1",
   "meaning": {
    "primary": "Tenir",
    "alternatives": [
     "Porter (en main)",
     "Avoir sur soi"
    ]
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Tenir ou porter quelque chose dans ses mains : かばんを持っていきます (je porte mon sac en y allant)."
  },
  {
   "id": "v_665_s2",
   "meaning": {
    "primary": "Posséder",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "etat",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ],
   "nuance": "Par extension : posséder un objet, ou avoir un sentiment."
  }
 ]
}
```

### Décisions de journal de `v_665` (3)

```json
[
 {
  "id": "A2-04-D1309",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_665",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Tenir",
   "Porter (en main)",
   "Posséder",
   "Avoir sur soi"
  ],
  "after": [
   "S1 Tenir, porter",
   "S2 Posséder"
  ],
  "reason": "Deux sens proposés, sur la fiche (« l'action physique de tenir ou de porter quelque chose dans ses mains, ou par extension de posséder un objet ou un sentiment ») : une chose que l'on a en main, ce que l'exemple illustre, et une chose ou un sentiment que l'on a ; deux référents, et deux types : une action, et un état, comme le sens « posséder » proposé pour ある. « Avoir sur soi » est rattaché au sens 1. Particule を de la fiche pour chacun. Sens 2 candidat ; alternative laissée à l'arbitrage : un seul sens, l'extension passant en nuance."
 },
 {
  "id": "A2-04-D1310",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_665",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Tenir ou porter quelque chose dans ses mains : action générale, sans domaine thématique propre, comme 取る (lot 18). Addendum A5."
 },
 {
  "id": "A2-04-D1311",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-20",
  "entry": "n5_v_665",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Posséder un objet ou avoir un sentiment : état général, sans domaine thématique propre. Addendum A5."
 }
]
```

## 閉める — `v_709`

### Fiche source `n5_v_709`

```json
{
 "id": "n5_v_709",
 "level": "N5",
 "word": "閉める",
 "word_furigana": "<ruby>閉<rt>し</rt></ruby>める",
 "reading": "しめる",
 "romaji": "shimeru",
 "meanings": {
  "primary": "Fermer",
  "secondary": [
   "Fermer une porte, une fenêtre ou un tiroir"
  ]
 },
 "nuance": "**Verbe transitif (groupe ichidan / ru)** exprimant l'action de fermer quelque chose (comme une porte, une fenêtre ou un couvercle), par opposition au verbe intransitif *shimaru*.",
 "type": "verbe",
 "group": "ru",
 "category": "actions_generiques",
 "subcategory": "manipulation",
 "kanji_list": [
  "閉"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "1sutekina mado o **<ruby>閉<rt>し</rt></ruby>め** て ください 。",
  "romaji": "mado o shimete kudasai.",
  "french": "Veuillez **fermer** la fenêtre.",
  "highlight": [
   "閉める",
   "shimeru"
  ]
 }
}
```

### Anciens exemples de `n5_v_709` (3)

```json
[
 {
  "japanese": "<ruby>寒<rt>さむ</rt></ruby>い ので、<ruby>窓<rt>まど</rt></ruby> を <ruby>閉<rt>し</rt></ruby>めて ください",
  "romaji": "samui node, mado o shimete kudasai.",
  "french": "Comme il fait froid, veuillez **fermer** la fenêtre.",
  "highlight": [
   "閉める",
   "shimeru"
  ]
 },
 {
  "japanese": "「<ruby>出<rt>で</rt></ruby>かける <ruby>時<rt>とき</rt></ruby> に は、ドア を しっかり <ruby>閉<rt>し</rt></ruby>めて ください」",
  "romaji": "'dekakeru toki ni wa, doa o shikkari shimete kudasai.'",
  "french": "« Lorsque vous sortez, veuillez bien **fermer** la porte. »",
  "highlight": [
   "閉める",
   "shimeru"
  ]
 },
 {
  "japanese": "もう <ruby>夜<rt>よる</rt></ruby> ですから、カーテン を <ruby>閉<rt>し</rt></ruby>めます",
  "romaji": "mou yoru desu kara, kaaten o shimemasu.",
  "french": "Comme c'est déjà la nuit, je **ferme** les rideaux.",
  "highlight": [
   "閉める",
   "shimeru"
  ]
 }
]
```

### ENTRY publiée `v_709`

```json
{
 "id": "v_709",
 "level": "N5",
 "word": "閉める",
 "writings": [],
 "readings": [
  {
   "kana": "しめる",
   "romaji": "shimeru",
   "furigana": "<ruby>閉<rt>し</rt></ruby>める",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "ru",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Transitif : fermer une porte, une fenêtre, un tiroir ou un couvercle. Se fermer se dit 閉まる.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_709_s1",
   "meaning": {
    "primary": "Fermer",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "action",
   "dimensions": [],
   "relations": [
    {
     "type": "transitive_of",
     "target": "v_579_s1"
    }
   ],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "を"
   ]
  }
 ]
}
```

### Décisions de journal de `v_709` (6)

```json
[
 {
  "id": "A2-04-D1180",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_709",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Fermer une porte, une fenêtre, un tiroir ou un couvercle : action générale, sans domaine thématique propre, comme 開ける. Addendum A5."
 },
 {
  "id": "A2-04-D1181",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_709",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Fermer une porte, une fenêtre ou un tiroir"
  ],
  "after": null,
  "reason": "Une glose, non une traduction : ses objets sont repris en nuance."
 },
 {
  "id": "A2-04-D1182",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_709",
  "field": "nuance",
  "kind": "abandon",
  "before": "exemple de la source : « 1sutekina mado o 閉め て ください 。 » (« Veuillez fermer la fenêtre »)",
  "after": null,
  "reason": "Anomalie de la source : la phrase japonaise de l'exemple commence par du texte parasite en caractères latins (« 1sutekina mado o »), au lieu de まどを que donnent son romaji (mado o shimete kudasai) et sa traduction. L'exemple n'est repris dans aucune nuance ; les exemples ne sont pas migrés, et l'anomalie est signalée pour le registre de phrases. Aucune information lexicale n'en est tirée."
 },
 {
  "id": "A2-04-D1183",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_709",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 18, report intégral à la passe finale 5.16). La paire 閉まる / 閉める est inscrite comme candidate explicite à l'audit des relations de 5.16 (transitive_of / intransitive_of, registre A2-REL) : cette entrée en est le membre transitif, l'autre est n5_v_579 (閉まる). La fiche nomme elle-même son correspondant ; il est dit en nuance."
 },
 {
  "id": "A2-04-D1574",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_709",
  "field": "entrée",
  "kind": "decision",
  "before": {
   "lot": "lot-18",
   "status": "validated",
   "journal": [
    "A2-04-D1180",
    "A2-04-D1181",
    "A2-04-D1182",
    "A2-04-D1183"
   ],
   "fields": {
    "writings": [],
    "suru_compatible": false,
    "suffix": false,
    "counter": null,
    "nuance": "Transitif : fermer une porte, une fenêtre, un tiroir ou un couvercle. Se fermer se dit 閉まる.",
    "tags": [],
    "senses": [
     {
      "meaning": {
       "primary": "Fermer",
       "alternatives": []
      },
      "category": null,
      "semantic_type": "action",
      "dimensions": [],
      "relations": [],
      "linguistic_functions": {
       "grammatical": [],
       "pragmatic_discourse": []
      }
     }
    ]
   }
  },
  "after": "rouverte : relation ajoutée (v_709_s1 transitive_of v_579_s1) ; rien d'autre ne change",
  "reason": "Réouverture explicite d'une ENTRY validée (arbitrage du périmètre de la passe finale 5.16, Q1 : un lot 26, qui ne rouvre que les ENTRY dont les données changent). 閉める (n5_v_709), validée au lot 18, est rouverte pour y noter la relation arbitrée (Q4, R3). Son état validé est conservé en entier dans le champ « avant » de cette décision. Ses décisions historiques (D1180, D1181, D1182, D1183) ne sont pas modifiées : elles restent au journal, validées, et citées par l'entrée."
 },
 {
  "id": "A2-04-D1575",
  "status": "validated",
  "date": "2026-10-07",
  "lot": "lot-26",
  "entry": "n5_v_709",
  "field": "sens 1 · relations",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "type": "transitive_of",
    "target": "v_579_s1"
   }
  ],
  "reason": "Relation transitive_of de v_709_s1 (閉める, « Fermer ») vers v_579_s1 (閉まる, « Se fermer ») : arbitrage du périmètre de 5.16 (Q4, R3). Candidate inscrite par D1179 et D1183 ; chaque fiche nomme son correspondant. I12 : la paire transitive_of / intransitive_of n'est notée qu'une fois, sur le sens du verbe transitif ; 閉まる (n5_v_579) n'est ni modifiée ni rouverte."
 }
]
```

## 開く — `v_710`

### Fiche source `n5_v_710`

```json
{
 "id": "n5_v_710",
 "level": "N5",
 "word": "開く",
 "word_furigana": "<ruby>開<rt>あ</rt></ruby>く",
 "reading": "あく",
 "romaji": "aku",
 "meanings": {
  "primary": "S'ouvrir",
  "secondary": [
   "Être ouvert"
  ]
 },
 "nuance": "**Verbe intransitif (groupe u)** exprimant l'action d'une porte, d'une fenêtre, d'un magasin ou d'un contenant qui s'ouvre de lui-même ou par une action (à ne pas confondre avec le verbe transitif *akeru* ou le verbe *hiraku*).",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "mouvement_deplacement",
 "kanji_list": [
  "開"
 ],
 "particles": [
  "が"
 ],
 "example": {
  "japanese": "ドア が **<ruby>開<rt>あ</rt></ruby>き** ます 。",
  "romaji": "doa ga akimasu.",
  "french": "La porte **s'ouvre**.",
  "highlight": [
   "開く",
   "aku"
  ]
 }
}
```

### Anciens exemples de `n5_v_710` (3)

```json
[
 {
  "japanese": "<ruby>自動<rt>じどう</rt></ruby>ドア が スーッ と <ruby>開<rt>あ</rt></ruby>く",
  "romaji": "jidou doa ga suu to aku.",
  "french": "La porte automatique **s'ouvre** en douceur.",
  "highlight": [
   "開く",
   "aku"
  ]
 },
 {
  "japanese": "「<ruby>時間<rt>じかん</rt></ruby> に なったら、<ruby>店<rt>みせ</rt></ruby> の <ruby>扉<rt>とびら</rt></ruby> が <ruby>開<rt>あ</rt></ruby>きます」",
  "romaji": "'jikan ni nattara, mise no tobira ga akimasu.'",
  "french": "« Quand l'heure sera venue, la porte du magasin **s'ouvrira**. »",
  "highlight": [
   "開く",
   "aku"
  ]
 },
 {
  "japanese": "<ruby>風<rt>かぜ</rt></ruby> で <ruby>窓<rt>まど</rt></ruby> が パッ と <ruby>開<rt>あ</rt></ruby>きました",
  "romaji": "kaze de mado ga pa to akimashita.",
  "french": "La fenêtre **s'est ouverte** d'un coup sous l'effet du vent.",
  "highlight": [
   "開く",
   "aku"
  ]
 }
]
```

### ENTRY publiée `v_710`

```json
{
 "id": "v_710",
 "level": "N5",
 "word": "開く",
 "writings": [],
 "readings": [
  {
   "kana": "あく",
   "romaji": "aku",
   "furigana": "<ruby>開<rt>あ</rt></ruby>く",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "verbe",
  "group": "u",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Intransitif : une porte, une fenêtre, un magasin ou un contenant s'ouvre, de lui-même ou par une action. ドアが開きます (la porte s'ouvre). Désigne aussi l'état qui en résulte : être ouvert. Ouvrir quelque chose se dit 開ける.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_710_s1",
   "meaning": {
    "primary": "S'ouvrir",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "evenement",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [
    "が"
   ]
  }
 ]
}
```

### Décisions de journal de `v_710` (4)

```json
[
 {
  "id": "A2-04-D1168",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_710",
  "field": "senses",
  "kind": "decision",
  "before": [
   "S'ouvrir",
   "Être ouvert"
  ],
  "after": "un seul sens ; « Être ouvert » en nuance",
  "reason": "Un seul sens, de type evenement (arbitrage des choix du lot 18) : la fiche décrit un seul fait (ce qui « s'ouvre de lui-même ou par une action »), un changement qui survient, sans agent exprimé (particule が), comme 止まる (lot 04). « Être ouvert » n'est pas une autre traduction de « S'ouvrir » : un événement et l'état qui en résulte ne sont pas deux traductions équivalentes. Il n'est ni gardé dans le sens ni érigé en second sens de type etat ; il est conservé en nuance, comme l'état résultant de 入る (lot 04)."
 },
 {
  "id": "A2-04-D1169",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_710",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Une porte, une fenêtre, un magasin ou un contenant qui s'ouvre : événement général, sans domaine thématique propre ; « portes et fenêtres » ne couvrirait ni le magasin ni le contenant. Addendum A5."
 },
 {
  "id": "A2-04-D1170",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_710",
  "field": "nuance",
  "kind": "decision",
  "before": "mention de la source : « à ne pas confondre avec le verbe transitif akeru ou le verbe hiraku »",
  "after": "mention non reprise ; aucune lecture ajoutée",
  "reason": "La fiche nomme « hiraku » en romaji seulement, sans graphie, sans lecture en kana, sans sens et sans distinction exploitable : aucune lecture ひらく n'est ajoutée à l'ENTRY (la fiche source décide), et la mention n'est pas reprise dans la nuance (arbitrage des choix du lot 18) : un nom romanisé que les données ne permettent pas d'expliquer n'aide pas un débutant. La mise en garde contre le transitif (akeru) est conservée, sous la forme du renvoi à 開ける. La mention de « kawaru » par la fiche de 変える, qui explique un contraste, est traitée à part (D1233) et conservée."
 },
 {
  "id": "A2-04-D1171",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-18",
  "entry": "n5_v_710",
  "field": "relations",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune relation n'est portée dans ce lot : relations: [] pour chaque sens (arbitrage du périmètre du lot 18, report intégral à la passe finale 5.16). La paire 開く / 開ける est inscrite comme candidate explicite à l'audit des relations de 5.16 (transitive_of / intransitive_of, registre A2-REL) : cette entrée en est le membre intransitif, l'autre est n5_v_580 (開ける). La fiche nomme elle-même son correspondant ; il est dit en nuance."
 }
]
```
