# Groupe E, livraison E2 — les 31 fiches sources complètes, leurs anciens exemples, les 27 ENTRY publiées et leurs décisions

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

## 軽い — `v_62`

### Fiche source `n5_v_62`

```json
{
 "id": "n5_v_62",
 "level": "N5",
 "word": "軽い",
 "word_furigana": "<ruby>軽<rt>かる</rt></ruby>い",
 "reading": "かるい",
 "romaji": "karui",
 "meanings": {
  "primary": "Léger",
  "secondary": [
   "Peu lourd",
   "Bénin (maladie)"
  ]
 },
 "nuance": "Adjectif en -i qui signifie \"léger\" (contraire de <ruby>重<rt>おも</rt></ruby>い, lourd) et qualifie aussi une maladie ou un symptôme sans gravité.",
 "type": "adjectif i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "poids",
 "kanji_list": [
  "軽"
 ],
 "particles": [],
 "example": {
  "japanese": "この <ruby>鞄<rt>かばん</rt></ruby> は <ruby>軽<rt>かる</rt></ruby>くて 、<ruby>持<rt>も</rt></ruby>ちやすい です 。",
  "romaji": "kono kaban wa karukute, mochiyasui desu.",
  "french": "Ce sac est **léger** et facile à porter.",
  "highlight": [
   "軽い",
   "karui"
  ]
 }
}
```

### Anciens exemples de `n5_v_62` (3)

```json
[
 {
  "japanese": "この <ruby>荷物<rt>にもつ</rt></ruby> は <ruby>軽<rt>かる</rt></ruby>い ので、<ruby>片手<rt>かたて</rt></ruby> で <ruby>持<rt>も</rt></ruby>てます",
  "romaji": "kono nimotsu wa karui node, katate de motemasu.",
  "french": "Ce bagage est **léger**, donc je peux le porter d'une seule main.",
  "highlight": [
   "軽い",
   "karui"
  ]
 },
 {
  "japanese": "ランニング <ruby>用<rt>よう</rt></ruby> の <ruby>軽<rt>かる</rt></ruby>い <ruby>靴<rt>くつ</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました",
  "romaji": "ranningu you no karui kutsu o kaimashita.",
  "french": "J'ai acheté des chaussures **légères** pour la course à pied.",
  "highlight": [
   "軽い",
   "karui"
  ]
 },
 {
  "japanese": "<ruby>朝<rt>あさ</rt></ruby> ごはん は <ruby>軽<rt>かる</rt></ruby>く パン と コーヒー に しました",
  "romaji": "asa gohan wa karuku pan to koohii ni shimashita.",
  "french": "J'ai pris un petit-déjeuner **léger** composé de pain et de café.",
  "highlight": [
   "軽い",
   "karui"
  ]
 }
]
```

### ENTRY publiée `v_62`

```json
{
 "id": "v_62",
 "level": "N5",
 "word": "軽い",
 "writings": [],
 "readings": [
  {
   "kana": "かるい",
   "romaji": "karui",
   "furigana": "<ruby>軽<rt>かる</rt></ruby>い",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_62_s1",
   "meaning": {
    "primary": "Léger",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Contraire : 重い."
  },
  {
   "id": "v_62_s2",
   "meaning": {
    "primary": "Bénin",
    "alternatives": []
   },
   "category": {
    "level_1": "sante_medecine",
    "level_2": "maladies_troubles"
   },
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Une maladie ou un symptôme sans gravité."
  }
 ]
}
```

### Décisions de journal de `v_62` (3)

```json
[
 {
  "id": "A2-04-D1072",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-15",
  "entry": "n5_v_62",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Léger",
   "Peu lourd",
   "Bénin (maladie)"
  ],
  "after": [
   "S1 Léger (poids)",
   "S2 Bénin (maladie)"
  ],
  "reason": "Deux sens documentés par la fiche (« signifie \"léger\" … et qualifie aussi une maladie ou un symptôme sans gravité ») : une propriété physique, et la faible gravité d'une maladie ; deux référents. Le second : santé › maladies et troubles, au niveau 2. Décidé sur sa propre fiche : le second sens n'est pas celui de 重い, dont la fiche parle d'une charge morale. Alternative : un seul sens, la maladie passant en nuance."
 },
 {
  "id": "A2-04-D1073",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-15",
  "entry": "n5_v_62",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Aucune catégorie primaire pertinente : le poids est une propriété physique générale d'un objet, que le registre ne range nulle part (espace › dimensions ne couvre que longueur, largeur, hauteur, profondeur et taille ; sciences › physique désigne la discipline, non la propriété d'un objet du quotidien). Addendum A5."
 },
 {
  "id": "A2-04-D1074",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-15",
  "entry": "n5_v_62",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Peu lourd"
  ],
  "after": null,
  "reason": "Redondant."
 }
]
```

## 忙しい — `v_144`

### Fiche source `n5_v_144`

```json
{
 "id": "n5_v_144",
 "level": "N5",
 "word": "忙しい",
 "word_furigana": "<ruby>忙<rt>いそが</rt></ruby>しい",
 "reading": "いそがしい",
 "romaji": "isogashii",
 "meanings": {
  "primary": "Occupé",
  "secondary": [
   "Pris",
   "Débordé (par le travail ou les tâches)"
  ]
 },
 "nuance": "Adjectif en -i désignant un emploi du temps chargé. Son kanji (<ruby>忙<rt>ぼう</rt></ruby>) est fascinant : il fusionne la clé du 'cœur/esprit' <ruby>心<rt>しん</rt></ruby> (shin) et le kanji de la 'perte/disparition' <ruby>亡<rt>ぼう</rt></ruby> (bou). Littéralement, être pressé ou occupé en japonais signifie ainsi 'perdre son cœur' ou avoir l'esprit complètement accaparé.",
 "type": "adjectif en i",
 "group": "i",
 "category": "travail_entreprise",
 "subcategory": "etat",
 "kanji_list": [
  "忙"
 ],
 "particles": [],
 "example": {
  "japanese": "<ruby>今週<rt>こんしゅう</rt></ruby> は <ruby>仕事<rt>しごと</rt></ruby> が おおく て とても <ruby>忙<rt>いそが</rt></ruby>しい です 。",
  "romaji": "konshuu wa shigoto ga ooku te totemo isogashii desu.",
  "french": "Cette semaine, j'ai beaucoup de travail et je suis très **occupé**.",
  "highlight": [
   "忙しい",
   "isogashii"
  ]
 }
}
```

### Anciens exemples de `n5_v_144` (3)

```json
[
 {
  "japanese": "<ruby>今週<rt>こんしゅう</rt></ruby> は <ruby>仕事<rt>しごと</rt></ruby> と <ruby>勉強<rt>べんきょう</rt></ruby> で とても <ruby>忙<rt>いそが</rt></ruby>しい です",
  "romaji": "konshuu wa shigoto to benkyou de totemo isogashii desu.",
  "french": "Je suis très **occupé** cette semaine avec le travail et les études.",
  "highlight": [
   "忙しい",
   "isogashii"
  ]
 },
 {
  "japanese": "<ruby>忙<rt>いそが</rt></ruby>しい <ruby>日<rt>ひ</rt></ruby> でも、<ruby>一<rt>い</rt></ruby>日 <ruby>30<rt>さんじゅっ</rt></ruby> <ruby>分<rt>ぷん</rt></ruby> は <ruby>読書<rt>どくしょ</rt></ruby> の <ruby>時間<rt>じかん</rt></ruby> を <ruby>作<rt>つく</rt></ruby>ります",
  "romaji": "isogashii hi demo, ichinichi sanjuppun wa dokusho no jikan o tsukurimasu.",
  "french": "Même les jours **occupés**, je me réserve trente minutes de lecture par jour.",
  "highlight": [
   "忙しい",
   "isogashii"
  ]
 },
 {
  "japanese": "お<ruby>母<rt>かあ</rt></ruby>さん は <ruby>毎日<rt>まいにち</rt></ruby> <ruby>家事<rt>かじ</rt></ruby> で <ruby>忙<rt>いそが</rt></ruby>しく <ruby>働<rt>はたら</rt></ruby>いて います",
  "romaji": "okaasan wa mainichi kaji de isogashiku hataraite imasu.",
  "french": "Mère travaille **occupée** chaque jour avec les tâches ménagères.",
  "highlight": [
   "忙しい",
   "isogashii"
  ]
 }
]
```

### ENTRY publiée `v_144`

```json
{
 "id": "v_144",
 "level": "N5",
 "word": "忙しい",
 "writings": [],
 "readings": [
  {
   "kana": "いそがしい",
   "romaji": "isogashii",
   "furigana": "<ruby>忙<rt>いそが</rt></ruby>しい",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Un emploi du temps chargé, par le travail ou les tâches.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_144_s1",
   "meaning": {
    "primary": "Occupé",
    "alternatives": [
     "Pris",
     "Débordé"
    ]
   },
   "category": null,
   "semantic_type": "etat",
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

### Décisions de journal de `v_144` (2)

```json
[
 {
  "id": "A2-04-D1122",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_144",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Aucune catégorie primaire pertinente : la fiche décrit « un emploi du temps chargé », l'état d'une personne quant à son temps. Le registre ne le range ni dans le temps (qui porte les notions de temps), ni dans le seul travail : la traduction de la source dit « par le travail ou les tâches ». Addendum A5."
 },
 {
  "id": "A2-04-D1123",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_144",
  "field": "nuance",
  "kind": "abandon",
  "before": "explication du kanji 忙 (心 « cœur » et 亡 « perte »)",
  "after": null,
  "reason": "La nuance de la source est presque entièrement une explication de la composition du kanji : ce n'est pas un emploi du mot. Seule sa première phrase, « un emploi du temps chargé », décrit le sens ; elle est reprise. « Débordé » est gardé sans sa parenthèse (« par le travail ou les tâches »), reprise en nuance. Type etat."
 }
]
```

## 冷たい — `v_265`

### Fiche source `n5_v_265`

```json
{
 "id": "n5_v_265",
 "level": "N5",
 "word": "冷たい",
 "word_furigana": "<ruby>冷<rt>つめ</rt></ruby>たい",
 "reading": "つめたい",
 "romaji": "tsumetai",
 "meanings": {
  "primary": "Froid (au toucher)",
  "secondary": [
   "Glacé",
   "Froid (chose ou liquide)",
   "Insensible (figuré)"
  ]
 },
 "nuance": "Adjectif en -i (<ruby>形容詞<rt>けいようし</rt></ruby>) qualifiant la température tactile d'un objet, d'une surface ou d'un liquide, à ne pas confondre avec <ruby>寒<rt>さむ</rt></ruby>い (samui) qui qualifie la température ambiante de l'air.",
 "type": "adjectif i",
 "group": "i",
 "category": "meteo_saisons",
 "subcategory": "temperature",
 "kanji_list": [
  "冷"
 ],
 "particles": [],
 "example": {
  "japanese": "この みず は とても **<ruby>冷<rt>つめ</rt></ruby>たい** です 。",
  "romaji": "kono mizu wa totemo tsumetai desu.",
  "french": "Cette eau est très **froide** (au toucher).",
  "highlight": [
   "冷たい",
   "tsumetai"
  ]
 }
}
```

### Anciens exemples de `n5_v_265` (3)

```json
[
 {
  "japanese": "<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby> から <ruby>出<rt>だ</rt></ruby>した ばかりの <ruby>冷<rt>つめ</rt></ruby>たい お<ruby>茶<rt>ちゃ</rt></ruby> を グラス に <ruby>注<rt>そそ</rt></ruby>ぎました",
  "romaji": "reizouko kara dashita bakari no tsumetai ocha o gurasu ni sosogimashita.",
  "french": "J'ai versé dans un verre du thé bien **frais** (au toucher/température) tout juste sorti du réfrigérateur.",
  "highlight": [
   "冷たい",
   "tsumetai"
  ]
 },
 {
  "japanese": "<ruby>冬<rt>ふゆ</rt></ruby> の <ruby>朝<rt>あさ</rt></ruby>、<ruby>外<rt>そと</rt></ruby> の <ruby>水道<rt>すいどう</rt></ruby> から <ruby>出<rt>で</rt></ruby>る <ruby>水<rt>みず</rt></ruby> が とても 冷たい です",
  "romaji": "fuyu no asa, soto no suidou kara deru mizu ga totemo tsumetai desu.",
  "french": "Les matins d'hiver, l'eau qui sort du robinet extérieur est très **froide**.",
  "highlight": [
   "冷たい",
   "tsumetai"
  ]
 },
 {
  "japanese": "<ruby>外<rt>そと</rt></ruby> で たくさん <ruby>運動<rt>うんどう</rt></ruby> を した ので、冷たい アイスクリーム が とても <ruby>美味<rt>おい</rt></ruby>しく <ruby>感<rt>かん</rt></ruby>じられます",
  "romaji": "soto de takusan undou o shita node, tsumetai aisukuriimu ga totemo oishiku kanjiraremasu.",
  "french": "Comme j'ai beaucoup fait d'exercice dehors, je trouve la crème glacée **fraîche** très délicieuse.",
  "highlight": [
   "冷たい",
   "tsumetai"
  ]
 }
]
```

### ENTRY publiée `v_265`

```json
{
 "id": "v_265",
 "level": "N5",
 "word": "冷たい",
 "writings": [],
 "readings": [
  {
   "kana": "つめたい",
   "romaji": "tsumetai",
   "furigana": "<ruby>冷<rt>つめ</rt></ruby>たい",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_265_s1",
   "meaning": {
    "primary": "Froid (au toucher)",
    "alternatives": [
     "Glacé"
    ]
   },
   "category": {
    "level_1": "etre_humain",
    "level_2": "sens_perception",
    "level_3": "toucher_sensations"
   },
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "冷たい水 : de l'eau froide. L'air froid se dit 寒い."
  },
  {
   "id": "v_265_s2",
   "meaning": {
    "primary": "Froid (attitude)",
    "alternatives": [
     "Distant"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "冷たい人 : une personne froide, distante."
  }
 ]
}
```

### Décisions de journal de `v_265` (3)

```json
[
 {
  "id": "A2-04-D0480",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-07",
  "entry": "n5_v_265",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Froid (au toucher)",
   "Glacé",
   "Froid (chose ou liquide)",
   "Insensible (figuré)"
  ],
  "after": [
   "S1 Froid (au toucher)",
   "S2 Froid (attitude)"
  ],
  "reason": "Deux sens documentés par la source (« Insensible (figuré) ») : une température au toucher, et une attitude envers autrui, deux référents distincts."
 },
 {
  "id": "A2-04-D0481",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-07",
  "entry": "n5_v_265",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Attitude distante envers autrui : « propriété générale », sans domaine thématique propre (comme 甘い « indulgent », lot 02). Addendum A5."
 },
 {
  "id": "A2-04-D0482",
  "status": "validated",
  "date": "2026-10-03",
  "lot": "lot-07",
  "entry": "n5_v_265",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Froid (chose ou liquide)",
   "Insensible (figuré)"
  ],
  "after": null,
  "reason": "Le premier est redondant ; « insensible » est rendu par « distant » (sens 2)."
 }
]
```

## いい — `v_420`

### Fiche source `n5_v_420`

```json
{
 "id": "n5_v_420",
 "level": "N5",
 "word": "いい / 良い",
 "word_furigana": "<ruby>良<rt>よ</rt></ruby>い",
 "reading": "いい / よい",
 "romaji": "ii / yoi",
 "meanings": {
  "primary": "Bon",
  "secondary": [
   "Bien",
   "Chouette",
   "Bienveillant"
  ]
 },
 "nuance": "**Adjectif en i** très courant exprimant la qualité positive, l'approbation ou la convenance. Sa forme de dictionnaire formelle est *yoi*, mais *ii* est beaucoup plus utilisé à l'oral au présent (les deux partagent les mêmes formes conjuguées en *yoi-*).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "appreciation",
 "kanji_list": [
  "良"
 ],
 "particles": [],
 "example": {
  "japanese": "きょう は **<ruby>良<rt>よ</rt></ruby>い** てんき です ね 。",
  "romaji": "kyou wa yoi tenki desu ne.",
  "french": "Il fait **bon** temps aujourd'hui, n'est-ce pas ?",
  "highlight": [
   "良い",
   "yoi"
  ]
 }
}
```

### Anciens exemples de `n5_v_420` (3)

```json
[
 {
  "japanese": "この <ruby>本<rt>ほん</rt></ruby> は とても <ruby>良<rt>よ</rt></ruby>い <ruby>本<rt>ほん</rt></ruby> です",
  "romaji": "kono hon wa totemo yoi hon desu.",
  "french": "Ce livre est un très **bon** livre.",
  "highlight": [
   "良い",
   "yoi"
  ]
 },
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> は いい <ruby>天気<rt>てんき</rt></ruby> に なると いい ですね",
  "romaji": "ashita wa ii tenki ni naru to ii desu ne.",
  "french": "J'espère qu'il fera **beau** temps demain, n'est-ce pas ?",
  "highlight": [
   "いい",
   "ii"
  ]
 },
 {
  "japanese": "「この <ruby>映画<rt>えいが</rt></ruby> は どうでしたか」「はい、とても <ruby>良<rt>よ</rt></ruby>かったです」",
  "romaji": "'kono eiga wa doudeshita ka' 'hai, totemo yokattadesu.'",
  "french": "« Qu'avez-vous pensé de ce film ? » « Oui, il était très **bien** / bon. »",
  "highlight": [
   "良い",
   "yoi"
  ]
 }
]
```

### Fiche source `n5_v_583`

```json
{
 "id": "n5_v_583",
 "level": "N5",
 "word": "良い",
 "word_furigana": "<ruby>良<rt>よ</rt></ruby>い",
 "reading": "いい",
 "romaji": "ii",
 "meanings": {
  "primary": "Bien",
  "secondary": [
   "Bon",
   "Superbe",
   "Excellent",
   "Correct"
  ]
 },
 "nuance": "**Adjectif en -i** exprimant la qualité positive, l'approbation ou la bonne condition de quelque chose. Dans la langue parlée quotidienne, la variante *ii* (いい) est beaucoup plus fréquente au présent affirmatif.",
 "type": "adjectif",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "appreciation",
 "kanji_list": [
  "良"
 ],
 "particles": [],
 "example": {
  "japanese": "きょう は **<ruby>良<rt>よ</rt></ruby>い** てんき です ね 。",
  "romaji": "kyou wa yoi tenki desu ne.",
  "french": "Il fait **beau** temps aujourd'hui, n'est-ce pas ?",
  "highlight": [
   "良い",
   "yoi"
  ]
 }
}
```

### Anciens exemples de `n5_v_583` (3)

```json
[
 {
  "japanese": "きょう は とても いい <ruby>天気<rt>てんき</rt></ruby> です ね",
  "romaji": "kyou wa totemo ii tenki desu ne.",
  "french": "C'est un très **bon** temps aujourd'hui, n'est-ce pas ?",
  "highlight": [
   "いい",
   "ii"
  ]
 },
 {
  "japanese": "「この レストラン は どうですか」「ええ、とても いい です よ」",
  "romaji": "'kono resutoran wa doudesu ka' 'ee, totemo ii desu yo.'",
  "french": "« Comment est ce restaurant ? » « Oui, il est très **bien** ! »",
  "highlight": [
   "いい",
   "ii"
  ]
 },
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> また いい <ruby>日<rt>ひ</rt></ruby> に なると いい です ね",
  "romaji": "ashita mata ii hi ni naru to ii desu ne.",
  "french": "Ce serait **bien** que demain soit encore une belle journée.",
  "highlight": [
   "いい",
   "ii"
  ]
 }
]
```

### ENTRY publiée `v_420`

```json
{
 "id": "v_420",
 "level": "N5",
 "word": "いい",
 "writings": [
  {
   "form": "良い",
   "furigana": "<ruby>良<rt>い</rt></ruby>い"
  }
 ],
 "readings": [
  {
   "kana": "いい",
   "romaji": "ii",
   "furigana": "いい",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Forme écrite ou soutenue : よい (良い). Les formes conjuguées viennent de よい : よかった, よくない.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_420_s1",
   "meaning": {
    "primary": "Bon",
    "alternatives": [
     "Bien",
     "Chouette",
     "Bienveillant"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_420` (4)

```json
[
 {
  "id": "A2-04-D0036",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_583",
  "field": "entrée",
  "kind": "fusion",
  "before": null,
  "after": "n5_v_420",
  "reason": "良い et いい / 良い sont la même unité ; n5_v_420 survit (plus petit numéro)."
 },
 {
  "id": "A2-04-D0037",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_420",
  "field": "word",
  "kind": "decision",
  "before": "いい / 良い",
  "after": "いい",
  "reason": "La forme source contenait deux formes. Forme usuelle いい ; 良い devient une autre graphie. La lecture よい n'est pas une lecture structurée : ses furigana devraient avoir いい pour texte de base (I4), ce qui est impossible ; elle est décrite dans la nuance de l'ENTRY."
 },
 {
  "id": "A2-04-D0053",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_420",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Superbe",
   "Excellent",
   "Correct"
  ],
  "after": null,
  "reason": "Traductions du doublon n5_v_583, trop fortes (superbe, excellent) ou redondantes (correct)."
 },
 {
  "id": "A2-04-D0065",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_420",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "« Bon » : propriété générale, hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5."
 }
]
```

## いろいろ — `v_421`

### Fiche source `n5_v_421`

```json
{
 "id": "n5_v_421",
 "level": "N5",
 "word": "いろいろ",
 "word_furigana": "いろいろ",
 "reading": "いろいろ",
 "romaji": "iroiro",
 "meanings": {
  "primary": "Divers",
  "secondary": [
   "Varié",
   "Différents",
   "Plusieurs sortes de"
  ]
 },
 "nuance": "**Adjectif en na** (ou adverbe/adjectif nominal) redoublé exprimant la diversité ou la variété de choses, d'idées ou de situations.",
 "type": "adjectif en na",
 "group": "na",
 "category": "adverbes_expressions",
 "subcategory": "diversite",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "デパート で **いろいろ** な もの を かい まし た 。",
  "romaji": "depato de iroiro na mono o kaimashita.",
  "french": "J'ai acheté **diverses** choses au grand magasin.",
  "highlight": [
   "いろいろ",
   "iroiro"
  ]
 }
}
```

### Anciens exemples de `n5_v_421` (3)

```json
[
 {
  "japanese": "デパート で いろいろな <ruby>物<rt>もの</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました",
  "romaji": "depaato de iroirona mono o kaimashita.",
  "french": "J'ai acheté **divers** articles au grand magasin.",
  "highlight": [
   "いろいろ",
   "iroiro"
  ]
 },
 {
  "japanese": "しゅくだい について いろいろ <ruby>考<rt>かんが</rt></ruby>えました",
  "romaji": "shukudai ni tsuite iroiro kangaemashita.",
  "french": "J'ai pensé à **diverses** choses concernant les devoirs.",
  "highlight": [
   "いろいろ",
   "iroiro"
  ]
 },
 {
  "japanese": "<ruby>日本<rt>にほん</rt></ruby> の <ruby>文化<rt>ぶんか</rt></ruby> について いろいろな <ruby>話<rt>はなし</rt></ruby> を <ruby>聞<rt>き</rt></ruby>きました",
  "romaji": "nihon no bunka ni tsuite iroirona hanashi o kikimashita.",
  "french": "J'ai entendu **diverses** histoires au sujet de la culture japonaise.",
  "highlight": [
   "いろいろ",
   "iroiro"
  ]
 }
]
```

### ENTRY publiée `v_421`

```json
{
 "id": "v_421",
 "level": "N5",
 "word": "いろいろ",
 "writings": [],
 "readings": [
  {
   "kana": "いろいろ",
   "romaji": "iroiro",
   "furigana": "いろいろ",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "La diversité, la variété de choses, d'idées ou de situations : デパートでいろいろなものをかいました (j'ai acheté diverses choses au grand magasin).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_421_s1",
   "meaning": {
    "primary": "Divers",
    "alternatives": [
     "Varié",
     "Différents",
     "Plusieurs sortes de"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_421` (3)

```json
[
 {
  "id": "A2-04-D1422",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-22",
  "entry": "n5_v_421",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Divers",
   "Varié",
   "Différents",
   "Plusieurs sortes de"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens : « la diversité ou la variété de choses, d'idées ou de situations », que les quatre traductions disent. Type propriete, une caractéristique attribuée à un ensemble de choses. La fiche dit aussi « ou adverbe / adjectif nominal » : la classe mécanique, adjectif_na, reste ; le schéma ne porte qu'une classe. La fiche ne donne aucune particule."
 },
 {
  "id": "A2-04-D1423",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-22",
  "entry": "n5_v_421",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "La diversité : une propriété générale, sans domaine thématique propre. Elle n'est pas une quantité : aucune catégorie de nombres et quantification n'est cherchée pour elle. Addendum A5."
 },
 {
  "id": "A2-04-D1424",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-22",
  "entry": "n5_v_421",
  "field": "sens 1 · linguistic_functions",
  "kind": "decision",
  "before": null,
  "after": [],
  "reason": "Aucune fonction linguistique : quantificateur n'a pas de définition normative (arbitrage du périmètre du lot 22). Aucune fonction qui n'a pas de définition normative n'est posée dans ce lot (doctrine du lot 20, reconduite par l'arbitrage du périmètre du lot 22) ; aucune définition, aucun addendum n'est créé."
 }
]
```

## うるさい — `v_422`

### Fiche source `n5_v_422`

```json
{
 "id": "n5_v_422",
 "level": "N5",
 "word": "うるさい",
 "word_furigana": "うるさい",
 "reading": "うるさい",
 "romaji": "urusai",
 "meanings": {
  "primary": "Bruyant",
  "secondary": [
   "Agaçant",
   "Embêtant",
   "Chicanier"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant un bruit excessif et désagréable, ou par extension une personne insistante ou ennuyeuse.",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "caractere_bruit",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "となり の へや が **うるさい** です 。",
  "romaji": "tonari no heya ga urusai desu.",
  "french": "La chambre d'à côté est **bruyante**.",
  "highlight": [
   "うるさい",
   "urusai"
  ]
 }
}
```

### Anciens exemples de `n5_v_422` (3)

```json
[
 {
  "japanese": "<ruby>外<rt>そと</rt></ruby> が うるさい ので、<ruby>窓<rt>まど</rt></ruby> を <ruby>閉<rt>し</rt></ruby>めました",
  "romaji": "soto ga urusai node, mado o shimemashita.",
  "french": "C'est **bruyant** dehors, alors j'ai fermé la fenêtre.",
  "highlight": [
   "うるさい",
   "urusai"
  ]
 },
 {
  "japanese": "となり の <ruby>部屋<rt>へや</rt></ruby> が うるさい です",
  "romaji": "tonari no heya ga urusai desu.",
  "french": "La pièce d'à côté est **bruyante**.",
  "highlight": [
   "うるさい",
   "urusai"
  ]
 },
 {
  "japanese": "<ruby>工事<rt>こうじ</rt></ruby> の <ruby>音<rt>おと</rt></ruby> が うるさくて、<ruby>勉強<rt>べんきょう</rt></ruby> が できません",
  "romaji": "kouji no oto ga urusakute, benkyou ga dekimasen.",
  "french": "Le bruit des travaux est **bruyant**, je ne peux pas étudier.",
  "highlight": [
   "うるさい",
   "urusai"
  ]
 }
]
```

### ENTRY publiée `v_422`

```json
{
 "id": "v_422",
 "level": "N5",
 "word": "うるさい",
 "writings": [],
 "readings": [
  {
   "kana": "うるさい",
   "romaji": "urusai",
   "furigana": "うるさい",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_422_s1",
   "meaning": {
    "primary": "Bruyant",
    "alternatives": []
   },
   "category": {
    "level_1": "etre_humain",
    "level_2": "sens_perception",
    "level_3": "ouie"
   },
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Un bruit excessif et désagréable."
  },
  {
   "id": "v_422_s2",
   "meaning": {
    "primary": "Agaçant",
    "alternatives": [
     "Embêtant"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Une personne insistante ou ennuyeuse."
  }
 ]
}
```

### Décisions de journal de `v_422` (3)

```json
[
 {
  "id": "A2-04-D1151",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_422",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Bruyant",
   "Agaçant",
   "Embêtant",
   "Chicanier"
  ],
  "after": [
   "S1 Bruyant",
   "S2 Agaçant (personne)"
  ],
  "reason": "Deux sens documentés par la fiche (« un bruit excessif et désagréable, ou par extension une personne insistante ou ennuyeuse ») : un bruit, et le comportement d'une personne ; deux référents. Le premier : sens et perception › ouïe. L'exemple porte sur le bruit (« la chambre d'à côté est bruyante »). Sens 2 candidat ; alternative : un seul sens, l'extension passant en nuance."
 },
 {
  "id": "A2-04-D1152",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_422",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Le comportement insistant ou ennuyeux d'une personne : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1153",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_422",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Chicanier"
  ],
  "after": null,
  "reason": "Rattaché par la proposition à l'extension (une personne insistante) ; plus étroit que ce que décrit la fiche."
 }
]
```

## きれい — `v_424`

### Fiche source `n5_v_424`

```json
{
 "id": "n5_v_424",
 "level": "N5",
 "word": "きれい",
 "word_furigana": "きれい",
 "reading": "きれい",
 "romaji": "kirei",
 "meanings": {
  "primary": "Joli",
  "secondary": [
   "Propre",
   "Beau",
   "Net"
  ]
 },
 "nuance": "**Adjectif en na** s'appliquant aussi bien à la beauté visuelle (paysage, personne) qu'à la propreté (ordre, netteté).",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "appreciation",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "**きれい** な はな が さいて います 。",
  "romaji": "kirei na hana ga saite imasu.",
  "french": "De **jolies** fleurs sont écloses.",
  "highlight": [
   "きれい",
   "kirei"
  ]
 }
}
```

### Anciens exemples de `n5_v_424` (3)

```json
[
 {
  "japanese": "あそこ に きれい な <ruby>花<rt>はな</rt></ruby> が 咲いて います",
  "romaji": "asoko ni kirei na hana ga saite imasu.",
  "french": "Il y a de **jolies** fleurs qui poussent là-bas.",
  "highlight": [
   "きれい",
   "kirei"
  ]
 },
 {
  "japanese": "この <ruby>部屋<rt>へや</rt></ruby> は とても きれい です",
  "romaji": "kono heya wa totemo kirei desu.",
  "french": "Cette pièce est très **propre** / jolie.",
  "highlight": [
   "きれい",
   "kirei"
  ]
 },
 {
  "japanese": "<ruby>夜<rt>よる</rt></ruby> の <ruby>街<rt>まち</rt></ruby> で きれい な <ruby>星<rt>ほし</rt></ruby> を <ruby>見<rt>み</rt></ruby>ました",
  "romaji": "yoru no machi de kirei na hoshi o mimashita.",
  "french": "J'ai vu de **belles** étoiles dans la ville la nuit.",
  "highlight": [
   "きれい",
   "kirei"
  ]
 }
]
```

### Fiche source `n5_v_472`

```json
{
 "id": "n5_v_472",
 "level": "N5",
 "word": "綺麗",
 "word_furigana": "<ruby>綺<rt>き</rt></ruby><ruby>麗<rt>れい</rt></ruby>",
 "reading": "きれい",
 "romaji": "kirei",
 "meanings": {
  "primary": "Joli",
  "secondary": [
   "Beau",
   "Propre",
   "Net"
  ]
 },
 "nuance": "**Adjectif en na** qualifiant ce qui est esthétiquement agréable à regarder (paysage, personne, objet) ou ce qui est propre et bien rangé.",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "appreciation",
 "kanji_list": [
  "綺",
  "麗"
 ],
 "particles": [],
 "example": {
  "japanese": "はな が **<ruby>綺<rt>き</rt></ruby><ruby>麗<rt>れい</rt></ruby>** です 。",
  "romaji": "hana wa kirei desu.",
  "french": "Les fleurs sont **jolis** (belles).",
  "highlight": [
   "綺麗",
   "kirei"
  ]
 }
}
```

### Anciens exemples de `n5_v_472` (3)

```json
[
 {
  "japanese": "<ruby>彼女<rt>かのじょ</rt></ruby> は <ruby>綺麗<rt>きれい</rt></ruby> な <ruby>花<rt>はな</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました",
  "romaji": "kanojo wa kirei na hana o kaimashita.",
  "french": "Elle a acheté de **jolies** fleurs.",
  "highlight": [
   "綺麗",
   "kirei"
  ]
 },
 {
  "japanese": "ここ は とても <ruby>綺麗<rt>きれい</rt></ruby> な <ruby>海<rt>うみ</rt></ruby> です",
  "romaji": "koko wa totemo kirei na umi desu.",
  "french": "C'est une mer très **belle** / propre ici.",
  "highlight": [
   "綺麗",
   "kirei"
  ]
 },
 {
  "japanese": "<ruby>部屋<rt>へや</rt></ruby> を <ruby>片<rt>かたづ</rt></ruby>けて、<ruby>綺麗<rt>きれい</rt></ruby> に しました",
  "romaji": "heya o katadukete, kirei ni shimashita.",
  "french": "J'ai rangé la chambre et l'ai rendue **propre** / nette.",
  "highlight": [
   "綺麗",
   "kirei"
  ]
 }
]
```

### ENTRY publiée `v_424`

```json
{
 "id": "v_424",
 "level": "N5",
 "word": "きれい",
 "writings": [
  {
   "form": "綺麗",
   "furigana": "<ruby>綺<rt>き</rt></ruby><ruby>麗<rt>れい</rt></ruby>"
  }
 ],
 "readings": [
  {
   "kana": "きれい",
   "romaji": "kirei",
   "furigana": "きれい",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_424_s1",
   "meaning": {
    "primary": "Beau",
    "alternatives": [
     "Joli"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  },
  {
   "id": "v_424_s2",
   "meaning": {
    "primary": "Propre",
    "alternatives": [
     "Net"
    ]
   },
   "category": {
    "level_1": "habitat_vie_domestique",
    "level_2": "entretien_domestique",
    "level_3": "nettoyage"
   },
   "semantic_type": "propriete",
   "dimensions": [
    {
     "axis": "ordonne_desordonne",
     "pole": "ordonne"
    }
   ],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions de journal de `v_424` (3)

```json
[
 {
  "id": "A2-04-D0026",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_424",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Joli",
   "Propre",
   "Beau",
   "Net"
  ],
  "after": [
   "S1 Beau (joli)",
   "S2 Propre (net)"
  ],
  "reason": "Deux sens exploitables : la beauté visuelle et la propreté."
 },
 {
  "id": "A2-04-D0027",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_472",
  "field": "entrée",
  "kind": "fusion",
  "before": null,
  "after": "n5_v_424",
  "reason": "Même unité lexicale que きれい ; 綺麗 est une autre graphie. n5_v_424 survit (plus petit numéro)."
 },
 {
  "id": "A2-04-D0066",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_424",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "« Beau » : appréciation esthétique générale, sans domaine thématique propre. Addendum A5."
 }
]
```

## まずい — `v_427`

### Fiche source `n5_v_427`

```json
{
 "id": "n5_v_427",
 "level": "N5",
 "word": "まずい",
 "word_furigana": "まずい",
 "reading": "まずい",
 "romaji": "mazui",
 "meanings": {
  "primary": "Mauvais (goût)",
  "secondary": [
   "Désagréable (au goût)",
   "Impropre",
   "Fâcheux (situation critique)"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant un aliment qui a un mauvais goût, ou familièrement une situation délicate (« c'est mal barré / c'est problématique »).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "saveur",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "この りょうり は ちょっと **まずい** です 。",
  "romaji": "kono ryouri wa chotto mazui desu.",
  "french": "Ce plat est un peu **mauvais** (immangeable).",
  "highlight": [
   "まずい",
   "mazui"
  ]
 }
}
```

### Anciens exemples de `n5_v_427` (3)

```json
[
 {
  "japanese": "この <ruby>料理<rt>りょうり</rt></ruby> は まずい です",
  "romaji": "kono ryouri wa mazui desu.",
  "french": "Ce plat a un **mauvais** goût.",
  "highlight": [
   "まずい",
   "mazui"
  ]
 },
 {
  "japanese": "<ruby>塩<rt>しお</rt></ruby> を <ruby>入<rt>い</rt></ruby>れすぎて、スープ が まずくなりました",
  "romaji": "shio o iresugite, suupu wa mazukunarimashita.",
  "french": "J'ai mis trop de sel et la soupe est devenue **immangeable**.",
  "highlight": [
   "まずい",
   "mazui"
  ]
 },
 {
  "japanese": "「<ruby>味<rt>あじ</rt></ruby> は どうですか」「ちょっと まずい です」",
  "romaji": "'aji wa dou desu ka' 'chotto mazui desu.'",
  "french": "« Quel est le goût ? » « C'est un peu **mauvais**. »",
  "highlight": [
   "まずい",
   "mazui"
  ]
 }
]
```

### ENTRY publiée `v_427`

```json
{
 "id": "v_427",
 "level": "N5",
 "word": "まずい",
 "writings": [],
 "readings": [
  {
   "kana": "まずい",
   "romaji": "mazui",
   "furigana": "まずい",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Familier pour le goût ; plus poli : おいしくない.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_427_s1",
   "meaning": {
    "primary": "Mauvais (au goût)",
    "alternatives": [
     "Pas bon"
    ]
   },
   "category": {
    "level_1": "alimentation_cuisine",
    "level_2": "gouts_alimentaires"
   },
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  },
  {
   "id": "v_427_s2",
   "meaning": {
    "primary": "Fâcheux",
    "alternatives": [
     "Embarrassant"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "まずいことになった : ça tourne mal."
  }
 ]
}
```

### Décisions de journal de `v_427` (3)

```json
[
 {
  "id": "A2-04-D0196",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-02",
  "entry": "n5_v_427",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Mauvais (goût)",
   "Désagréable (au goût)",
   "Impropre",
   "Fâcheux (situation critique)"
  ],
  "after": [
   "S1 Mauvais (au goût)",
   "S2 Fâcheux"
  ],
  "reason": "Deux sens : une saveur, et une situation qui tourne mal (まずいことになった), deux référents distincts."
 },
 {
  "id": "A2-04-D0197",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-02",
  "entry": "n5_v_427",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Évaluation générale d'une situation : « propriété générale », sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D0198",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-02",
  "entry": "n5_v_427",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Désagréable (au goût)",
   "Impropre"
  ],
  "after": null,
  "reason": "Le premier est redondant ; le second, trop vague."
 }
]
```

## 丈夫 — `v_428`

### Fiche source `n5_v_428`

```json
{
 "id": "n5_v_428",
 "level": "N5",
 "word": "丈夫",
 "word_furigana": "<ruby>丈夫<rt>じょうぶ</rt></ruby>",
 "reading": "じょうぶ",
 "romaji": "joubu",
 "meanings": {
  "primary": "Solide",
  "secondary": [
   "Robuste",
   "Résistant",
   "En bonne santé"
  ]
 },
 "nuance": "**Adjectif en na** qualifiant la robustesse physique d'un objet (solide, durable) ou la robustesse de la santé d'une personne.",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "etat_physique",
 "kanji_list": [
  "壮",
  "夫"
 ],
 "particles": [],
 "example": {
  "japanese": "この かばん は **<ruby>丈夫<rt>じょうぶ</rt></ruby>** です 。",
  "romaji": "kono kaban wa joubu desu.",
  "french": "Ce sac est **solide**.",
  "highlight": [
   "丈夫",
   "joubu"
  ]
 }
}
```

### Anciens exemples de `n5_v_428` (3)

```json
[
 {
  "japanese": "この カバン は <ruby>丈夫<rt>じょうぶ</rt></ruby> です",
  "romaji": "kono kaban wa joubu desu.",
  "french": "Ce sac est **solide**.",
  "highlight": [
   "丈夫",
   "joubu"
  ]
 },
 {
  "japanese": "<ruby>丈夫<rt>じょうぶ</rt></ruby> な <ruby>建物<rt>たてもの</rt></ruby> は <ruby>地震<rt>じしん</rt></ruby> に <ruby>強<rt>つよ</rt></ruby>い です",
  "romaji": "joubu na tatemono wa jishin ni tsuyoi desu.",
  "french": "Un bâtiment **solide** résiste bien aux séismes.",
  "highlight": [
   "丈夫",
   "joubu"
  ]
 },
 {
  "japanese": "<ruby>毎日<rt>まいにち</rt></ruby> <ruby>運動<rt>うんどう</rt></ruby> して、<ruby>体<rt>からだ</rt></ruby> を <ruby>丈夫<rt>じょうぶ</rt></ruby> に します",
  "romaji": "mainichi undou shite, karada o joubu ni shimasu.",
  "french": "Je fais de l'exercice tous les jours pour rendre mon corps **solide** / robuste.",
  "highlight": [
   "丈夫",
   "joubu"
  ]
 }
]
```

### ENTRY publiée `v_428`

```json
{
 "id": "v_428",
 "level": "N5",
 "word": "丈夫",
 "writings": [],
 "readings": [
  {
   "kana": "じょうぶ",
   "romaji": "joubu",
   "furigana": "<ruby>丈夫<rt>じょうぶ</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_428_s1",
   "meaning": {
    "primary": "Solide",
    "alternatives": [
     "Robuste",
     "Résistant"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Un objet solide, durable : このかばんは丈夫です (ce sac est solide)."
  },
  {
   "id": "v_428_s2",
   "meaning": {
    "primary": "En bonne santé",
    "alternatives": []
   },
   "category": {
    "level_1": "sante_medecine",
    "level_2": "sante_etats_pathologiques"
   },
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "La santé robuste d'une personne."
  }
 ]
}
```

### Décisions de journal de `v_428` (2)

```json
[
 {
  "id": "A2-04-D1140",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_428",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Solide",
   "Robuste",
   "Résistant",
   "En bonne santé"
  ],
  "after": [
   "S1 Solide (objet)",
   "S2 En bonne santé (personne)"
  ],
  "reason": "Deux sens documentés par la fiche (« la robustesse physique d'un objet (solide, durable) ou la robustesse de la santé d'une personne ») : la solidité d'une chose, que l'exemple illustre (un sac), et la santé d'une personne ; deux référents. Le second : santé et médecine › santé et états pathologiques ; type propriete, une constitution robuste étant une caractéristique attribuée à la personne, à la différence de 元気 (lot 16, etat). Sens 2 candidat ; alternative : un seul sens."
 },
 {
  "id": "A2-04-D1141",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_428",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "La solidité d'un objet : propriété générale d'une chose, sans domaine thématique propre. Addendum A5."
 }
]
```

## 便利 — `v_432`

### Fiche source `n5_v_432`

```json
{
 "id": "n5_v_432",
 "level": "N5",
 "word": "便利",
 "word_furigana": "<ruby>便<rt>べん</rt></ruby><ruby>利<rt>り</rt></ruby>",
 "reading": "べんり",
 "romaji": "benri",
 "meanings": {
  "primary": "Pratique",
  "secondary": [
   "Commode",
   "Utile"
  ]
 },
 "nuance": "**Adjectif en na** qualifiant un objet, un service ou un endroit qui facilite la vie ou rend un service appréciable.",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "caracteristique",
 "kanji_list": [
  "便",
  "利"
 ],
 "particles": [],
 "example": {
  "japanese": "この パソコン は とても **<ruby>便<rt>べん</rt></ruby><ruby>利<rt>り</rt></ruby>** です 。",
  "romaji": "kono pasokon wa totemo benri desu.",
  "french": "Cet ordinateur est très **pratique**.",
  "highlight": [
   "便利",
   "benri"
  ]
 }
}
```

### Anciens exemples de `n5_v_432` (3)

```json
[
 {
  "japanese": "この パソコン は とても <ruby>便利<rt>べんり</rt></ruby> です",
  "romaji": "kono pasokon wa totemo benri desu.",
  "french": "Cet ordinateur est très **pratique**.",
  "highlight": [
   "便利",
   "benri"
  ]
 },
 {
  "japanese": "<ruby>家<rt>いえ</rt></ruby> の <ruby>近<rt>ちか</rt></ruby>く に スーパー が あって、<ruby>便利<rt>べんり</rt></ruby> です",
  "romaji": "ie no chikaku ni suupa ga atte, benri desu.",
  "french": "Il y a un supermarché près de chez moi, c'est **pratique**.",
  "highlight": [
   "便利",
   "benri"
  ]
 },
 {
  "japanese": "スマホ は <ruby>毎日<rt>まいにち</rt></ruby> <ruby>使<rt>つか</rt></ruby>えて、とても <ruby>便利<rt>べんり</rt></ruby> な もの です",
  "romaji": "sumaho wa mainichi tsukaete, totemo benri na mono desu.",
  "french": "Le smartphone est utilisable tous les jours, c'est un objet très **pratique**.",
  "highlight": [
   "便利",
   "benri"
  ]
 }
]
```

### ENTRY publiée `v_432`

```json
{
 "id": "v_432",
 "level": "N5",
 "word": "便利",
 "writings": [],
 "readings": [
  {
   "kana": "べんり",
   "romaji": "benri",
   "furigana": "<ruby>便<rt>べん</rt></ruby><ruby>利<rt>り</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Un objet, un service ou un endroit qui facilite la vie.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_432_s1",
   "meaning": {
    "primary": "Pratique",
    "alternatives": [
     "Commode",
     "Utile"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [
    {
     "axis": "utilite_inutilite",
     "pole": "utilite"
    }
   ],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions de journal de `v_432` (2)

```json
[
 {
  "id": "A2-04-D1109",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_432",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Évaluation générale de l'utilité d'une chose : « propriété générale », sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1110",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_432",
  "field": "sens 1 · dimensions",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "axis": "utilite_inutilite",
    "pole": "utilite"
   }
  ],
  "reason": "Dimension utilité / inutilité, pôle utilité : l'axe d'A2-DIM décrit directement le sens (« qui facilite la vie ou rend un service appréciable »). Arbitrage du périmètre du lot 16."
 }
]
```

## 危ない — `v_434`

### Fiche source `n5_v_434`

```json
{
 "id": "n5_v_434",
 "level": "N5",
 "word": "危ない",
 "word_furigana": "<ruby>危<rt>あぶ</rt></ruby>ない",
 "reading": "あぶない",
 "romaji": "abunai",
 "meanings": {
  "primary": "Dangereux",
  "secondary": [
   "Périlleux",
   "Risqué",
   "Attention !"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant une situation qui présente un risque physique ou un danger, ou utilisé comme interjection pour avertir quelqu'un (« Attention ! »).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "securite",
 "kanji_list": [
  "危"
 ],
 "particles": [],
 "example": {
  "japanese": "ここ は **<ruby>危<rt>あぶ</rt></ruby>ない** から 、 はいって は いけ ませ ん 。",
  "romaji": "koko wa abunai kara, haitte wa ikemasen.",
  "french": "C'est **dangereux** ici, il ne faut pas entrer.",
  "highlight": [
   "危ない",
   "abunai"
  ]
 }
}
```

### Anciens exemples de `n5_v_434` (3)

```json
[
 {
  "japanese": "この <ruby>川<rt>かわ</rt></ruby> で <ruby>泳<rt>およ</rt></ruby>ぐ の は <ruby>危<rt>あぶ</rt></ruby>ない です",
  "romaji": "kono kawa de oyogu no wa abunai desu.",
  "french": "Il est **dangereux** de nager dans cette rivière.",
  "highlight": [
   "危ない",
   "abunai"
  ]
 },
 {
  "japanese": "「あぶない！」<ruby>車<rt>くるま</rt></ruby> が <ruby>来<rt>き</rt></ruby>ました よ",
  "romaji": "'abunai!' kuruma ga kimashita yo.",
  "french": "« **Attention** / C'est dangereux ! » Une voiture est arrivée.",
  "highlight": [
   "危ない",
   "abunai"
  ]
 },
 {
  "japanese": "<ruby>夜<rt>よる</rt></ruby> の <ruby>暗<rt>くら</rt></ruby>い <ruby>道<rt>みち</rt></ruby> は <ruby>危<rt>あぶ</rt></ruby>ない ですから、<ruby>気<rt>き</rt></ruby>をつけて ください",
  "romaji": "yoru no kurai michi wa abunai desu kara, ki o tsukete kudasai.",
  "french": "Les routes sombres la nuit sont **dangereuses**, alors faites attention.",
  "highlight": [
   "危ない",
   "abunai"
  ]
 }
]
```

### ENTRY publiée `v_434`

```json
{
 "id": "v_434",
 "level": "N5",
 "word": "危ない",
 "writings": [],
 "readings": [
  {
   "kana": "あぶない",
   "romaji": "abunai",
   "furigana": "<ruby>危<rt>あぶ</rt></ruby>ない",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Une situation qui présente un risque ou un danger. S'emploie seul pour avertir : « Attention ! ».",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_434_s1",
   "meaning": {
    "primary": "Dangereux",
    "alternatives": [
     "Risqué"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_434` (4)

```json
[
 {
  "id": "A2-04-D1113",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_434",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Dangereux",
   "Périlleux",
   "Risqué",
   "Attention !"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens proposé : ce qui présente un risque ou un danger. L'emploi d'avertissement (« Attention ! »), que la nuance décrit (« utilisé comme interjection »), est un emploi d'adresse : il est conservé en nuance, comme l'exclamation de 痛い (lot 01), sans créer de sens ni de fonction pragmatique. Alternative laissée à l'arbitrage : un second sens pour l'avertissement."
 },
 {
  "id": "A2-04-D1114",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_434",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Évaluation générale du risque d'une situation : « propriété générale », sans domaine thématique propre ; aucun axe d'A2-DIM ne décrit le danger. Addendum A5."
 },
 {
  "id": "A2-04-D1115",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_434",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Périlleux"
  ],
  "after": null,
  "reason": "Redondant."
 },
 {
  "id": "A2-04-D1116",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_434",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Attention !"
  ],
  "after": null,
  "reason": "Emploi d'adresse, repris en nuance."
 }
]
```

## 大切 — `v_442`

### Fiche source `n5_v_442`

```json
{
 "id": "n5_v_442",
 "level": "N5",
 "word": "大切",
 "word_furigana": "<ruby>大<rt>たい</rt></ruby><ruby>切<rt>せつ</rt></ruby>",
 "reading": "たいせつ",
 "romaji": "taisetsu",
 "meanings": {
  "primary": "Important",
  "secondary": [
   "Précieux",
   "Cher",
   "Essentiel"
  ]
 },
 "nuance": "**Adjectif en na** qualifiant ce qui a de la valeur, de l'importance ou qui est cher à notre cœur (personnes, objets ou notions).",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "appreciation",
 "kanji_list": [
  "大",
  "切"
 ],
 "particles": [],
 "example": {
  "japanese": "これ は **<ruby>大<rt>たい</rt></ruby><ruby>切<rt>せつ</rt></ruby>** な しょるい です 。",
  "romaji": "kore wa taisetsu na shorui desu.",
  "french": "C'est un document **important**.",
  "highlight": [
   "大切",
   "taisetsu"
  ]
 }
}
```

### Anciens exemples de `n5_v_442` (3)

```json
[
 {
  "japanese": "<ruby>家族<rt>かぞく</rt></ruby> は <ruby>私<rt>わたし</rt></ruby> にとって とても <ruby>大切<rt>たいせつ</rt></ruby> です",
  "romaji": "kazoku wa watashi ni totte totemo taisetsu desu.",
  "french": "La famille est très **importante** pour moi.",
  "highlight": [
   "大切",
   "taisetsu"
  ]
 },
 {
  "japanese": "これ は <ruby>大切<rt>たいせつ</rt></ruby> な <ruby>書類<rt>しょるい</rt></ruby> ですから、<ruby>失<rt>うしな</rt></ruby>わないで ください",
  "romaji": "kore wa taisetsu na shorui desu kara, ushinawanaide kudasai.",
  "french": "C'est un document **important**, alors ne le perdez pas.",
  "highlight": [
   "大切",
   "taisetsu"
  ]
 },
 {
  "japanese": "<ruby>大切<rt>たいせつ</rt></ruby> な <ruby>友達<rt>ともだち</rt></ruby> から プレゼント を もらいました",
  "romaji": "taisetsu na tomodachi kara purezento o moraimashita.",
  "french": "J'ai reçu un cadeau d'un ami **important** (cher).",
  "highlight": [
   "大切",
   "taisetsu"
  ]
 }
]
```

### ENTRY publiée `v_442`

```json
{
 "id": "v_442",
 "level": "N5",
 "word": "大切",
 "writings": [],
 "readings": [
  {
   "kana": "たいせつ",
   "romaji": "taisetsu",
   "furigana": "<ruby>大<rt>たい</rt></ruby><ruby>切<rt>せつ</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Ce qui a de la valeur ou de l'importance, ou à quoi l'on tient : une personne, un objet, une notion.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_442_s1",
   "meaning": {
    "primary": "Important",
    "alternatives": [
     "Précieux",
     "Cher"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [
    {
     "axis": "importance_insignifiance",
     "pole": "importance"
    }
   ],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions de journal de `v_442` (4)

```json
[
 {
  "id": "A2-04-D1101",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_442",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Important",
   "Précieux",
   "Cher",
   "Essentiel"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens proposé : la fiche réunit « ce qui a de la valeur, de l'importance ou qui est cher à notre cœur » dans une même description, pour les personnes, les objets et les notions ; son exemple porte sur un document important. Alternative laissée à l'arbitrage : un second sens pour l'attachement (« précieux, cher »)."
 },
 {
  "id": "A2-04-D1102",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_442",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Évaluation générale de l'importance d'une chose : « propriété générale », sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1103",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_442",
  "field": "sens 1 · dimensions",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "axis": "importance_insignifiance",
    "pole": "importance"
   }
  ],
  "reason": "Dimension importance / insignifiance, pôle importance : l'axe d'A2-DIM décrit directement le sens (« ce qui a de la valeur, de l'importance »). Arbitrage du périmètre du lot 16."
 },
 {
  "id": "A2-04-D1104",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_442",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Essentiel"
  ],
  "after": null,
  "reason": "Redondant."
 }
]
```

## 弱い — `v_449`

### Fiche source `n5_v_449`

```json
{
 "id": "n5_v_449",
 "level": "N5",
 "word": "弱い",
 "word_furigana": "<ruby>弱<rt>よわ</rt></ruby>い",
 "reading": "よわい",
 "romaji": "yowai",
 "meanings": {
  "primary": "Faible",
  "secondary": [
   "Fragile",
   "Peu résistant",
   "Vulnérable"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant un manque de force physique, de résistance ou d'intensité (antonyme de *tsuyoi*).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "etat_physique",
 "kanji_list": [
  "弱"
 ],
 "particles": [],
 "example": {
  "japanese": "きょう は かぜ が **<ruby>弱<rt>よわ</rt></ruby>い** です 。",
  "romaji": "kyou wa kaze ga yowai desu.",
  "french": "Le vent est **faible** aujourd'hui.",
  "highlight": [
   "弱い",
   "yowai"
  ]
 }
}
```

### Anciens exemples de `n5_v_449` (3)

```json
[
 {
  "japanese": "この <ruby>椅子<rt>いす</rt></ruby> は <ruby>弱<rt>よわ</rt></ruby>い から、<ruby>気<rt>き</rt></ruby>をつけて ください",
  "romaji": "kono isu wa yowai kara, ki o tsukete kudasai.",
  "french": "Cette chaise est **faible** (fragile), alors faites attention.",
  "highlight": [
   "弱い",
   "yowai"
  ]
 },
 {
  "japanese": "<ruby>風邪<rt>かぜ</rt></ruby> を ひいて、<ruby>体<rt>からだ</rt></ruby> が <ruby>弱<rt>よわ</rt></ruby>くなって います",
  "romaji": "kaze o hiite, karada ga yowakunatte imasu.",
  "french": "J'ai attrapé un rhume et mon corps est affaibli.",
  "highlight": [
   "弱い",
   "yowai"
  ]
 },
 {
  "japanese": "<ruby>彼<rt>かれ</rt></ruby> は <ruby>寒<rt>さむ</rt></ruby>さ に <ruby>弱<rt>よわ</rt></ruby>い です",
  "romaji": "kare wa samusa ni yowai desu.",
  "french": "Il **ne supporte pas bien** le froid (il est faible face au froid).",
  "highlight": [
   "弱い",
   "yowai"
  ]
 }
]
```

### Fiche source `n5_v_450`

```json
{
 "id": "n5_v_450",
 "level": "N5",
 "word": "弱く",
 "word_furigana": "<ruby>弱<rt>よわ</rt></ruby>く",
 "reading": "よわく",
 "romaji": "yowaku",
 "meanings": {
  "primary": "Faiblement",
  "secondary": [
   "Doucement",
   "Légèrement"
  ]
 },
 "nuance": "**Adverbe** formé à partir de la forme en -ku de l'adjectif en i *yowai*, utilisé pour modifier un verbe en indiquant un manque de force ou d'intensité.",
 "type": "adverbe",
 "group": "adverbe",
 "category": "adverbes_expressions",
 "subcategory": "etat_physique",
 "kanji_list": [
  "弱"
 ],
 "particles": [],
 "example": {
  "japanese": "ひも を **<ruby>弱<rt>よわ</rt></ruby>く** むすび まし た 。",
  "romaji": "himo o yowaku musubimashita.",
  "french": "J'ai noué la ficelle **faiblement** (lâchement).",
  "highlight": [
   "弱く",
   "yowaku"
  ]
 }
}
```

### Anciens exemples de `n5_v_450` (3)

```json
[
 {
  "japanese": "<ruby>雨<rt>あめ</rt></ruby> が <ruby>弱<rt>よわ</rt></ruby>く <ruby>降<rt>ふ</rt></ruby>って います",
  "romaji": "ame ga yowaku futte imasu.",
  "french": "Il pleut **faiblement** (légèrement).",
  "highlight": [
   "弱く",
   "yowaku"
  ]
 },
 {
  "japanese": "<ruby>風<rt>かぜ</rt></ruby> が <ruby>弱<rt>よわ</rt></ruby>く なりました",
  "romaji": "kaze ga yowaku narimashita.",
  "french": "Le vent est devenu **faible**.",
  "highlight": [
   "弱く",
   "yowaku"
  ]
 },
 {
  "japanese": "ラジオ の <ruby>音<rt>おと</rt></ruby> を <ruby>弱<rt>よわ</rt></ruby>く してください",
  "romaji": "rajio no oto o yowaku shite kudasai.",
  "french": "Baissez le volume de la radio (**faiblement** / moins fort), s'il vous plaît.",
  "highlight": [
   "弱く",
   "yowaku"
  ]
 }
]
```

### ENTRY publiée `v_449`

```json
{
 "id": "v_449",
 "level": "N5",
 "word": "弱い",
 "writings": [],
 "readings": [
  {
   "kana": "よわい",
   "romaji": "yowai",
   "furigana": "<ruby>弱<rt>よわ</rt></ruby>い",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Un manque de force physique, de résistance ou d'intensité : かぜが弱いです (le vent est faible). Contraire : 強い.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_449_s1",
   "meaning": {
    "primary": "Faible",
    "alternatives": [
     "Fragile"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_449` (4)

```json
[
 {
  "id": "A2-04-D1137",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_449",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Faible",
   "Fragile",
   "Peu résistant",
   "Vulnérable"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens proposé, examiné sur sa propre fiche avec le même critère que 強い : la fiche réunit « un manque de force physique, de résistance ou d'intensité », avec un seul contraire (強い) ; son exemple porte sur l'intensité (« le vent est faible »), conservée en nuance avec lui. Alternative laissée à l'arbitrage : un second sens pour l'intensité."
 },
 {
  "id": "A2-04-D1138",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_449",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Le manque de force, de résistance ou d'intensité : propriété générale d'une chose, sans domaine thématique propre, comme 強い. Addendum A5."
 },
 {
  "id": "A2-04-D1139",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_449",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Peu résistant",
   "Vulnérable"
  ],
  "after": null,
  "reason": "Redondants avec « Fragile »."
 },
 {
  "id": "A2-04-D1412",
  "status": "validated",
  "date": "2026-10-06",
  "lot": "lot-22",
  "entry": "n5_v_450",
  "field": "entrée",
  "kind": "fusion",
  "before": null,
  "after": "n5_v_449",
  "reason": "弱く n'est pas une unité lexicale distincte : sa fiche la dit « formé à partir de la forme en -ku de l'adjectif en i yowai, utilisé pour modifier un verbe », et ne décrit rien d'autre que cette forme de 弱い. Fusion dans 弱い (n5_v_449, validée au lot 17), selon la règle normale du plus petit numéro (addendum A3, L2 : 449 < 450), sans exception-fusion et sans réouverture de 弱い, dont le contenu validé ne change pas (arbitrage du périmètre du lot 22, issue A). Aucun sens nouveau n'est créé sur 弱い pour représenter cette forme : la forme en -ku relève de la morphologie (étape 3). Ses traductions (« Faiblement », « Doucement », « Légèrement ») sont celles de cette forme, et ne sont pas reportées. À la différence de よく (lot 21), sa fiche ne donne aucun sens propre."
 }
]
```

## 強い — `v_451`

### Fiche source `n5_v_451`

```json
{
 "id": "n5_v_451",
 "level": "N5",
 "word": "強い",
 "word_furigana": "<ruby>強<rt>つよ</rt></ruby>い",
 "reading": "つよい",
 "romaji": "tsuyoi",
 "meanings": {
  "primary": "Fort",
  "secondary": [
   "Puissant",
   "Résistant",
   "Robuste"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant une force physique importante, de la robustesse ou une forte intensité (antonyme de *yowai*).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "etat_physique",
 "kanji_list": [
  "強"
 ],
 "particles": [],
 "example": {
  "japanese": "あめ が **<ruby>強<rt>つよ</rt></ruby>い** です 。",
  "romaji": "ame ga tsuyoi desu.",
  "french": "La pluie est **forte**.",
  "highlight": [
   "強い",
   "tsuyoi"
  ]
 }
}
```

### Anciens exemples de `n5_v_451` (3)

```json
[
 {
  "japanese": "<ruby>彼<rt>かれ</rt></ruby> は とても <ruby>強<rt>つよ</rt></ruby>い です",
  "romaji": "kare wa totemo tsuyoi desu.",
  "french": "Il est très **fort**.",
  "highlight": [
   "強い",
   "tsuyoi"
  ]
 },
 {
  "japanese": "きょう は <ruby>風<rt>かぜ</rt></ruby> が <ruby>強<rt>つよ</rt></ruby>い です",
  "romaji": "kyou wa kaze ga tsuyoi desu.",
  "french": "Le vent est **fort** aujourd'hui.",
  "highlight": [
   "強い",
   "tsuyoi"
  ]
 },
 {
  "japanese": "<ruby>困難<rt>こんなん</rt></ruby> に <ruby>負<rt>ま</rt></gem>けない <ruby>強<rt>つよ</rt></ruby>い <ruby>心<rt>こころ</rt></ruby> が <ruby>欲<rt>ほしい</rt></ruby>い です",
  "romaji": "konnan ni makenai tsuyoi kokoro ga hoshii desu.",
  "french": "Je veux un cœur **fort** qui ne cède pas face aux difficultés.",
  "highlight": [
   "強い",
   "tsuyoi"
  ]
 }
]
```

### ENTRY publiée `v_451`

```json
{
 "id": "v_451",
 "level": "N5",
 "word": "強い",
 "writings": [],
 "readings": [
  {
   "kana": "つよい",
   "romaji": "tsuyoi",
   "furigana": "<ruby>強<rt>つよ</rt></ruby>い",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "La force physique, la robustesse ou l'intensité : あめが強いです (la pluie est forte). Contraire : 弱い.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_451_s1",
   "meaning": {
    "primary": "Fort",
    "alternatives": [
     "Puissant",
     "Résistant"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_451` (3)

```json
[
 {
  "id": "A2-04-D1134",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_451",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Fort",
   "Puissant",
   "Résistant",
   "Robuste"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens proposé : la fiche réunit dans une même description « une force physique importante, de la robustesse ou une forte intensité », avec un seul contraire (弱い) ; son exemple porte sur l'intensité (« la pluie est forte »), conservée en nuance avec lui. Alternative laissée à l'arbitrage : un second sens pour l'intensité."
 },
 {
  "id": "A2-04-D1135",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_451",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "La force, la robustesse ou l'intensité : propriété générale d'une chose, sans domaine thématique propre ; la fiche l'applique aussi bien à une personne qu'à un phénomène (la pluie). Addendum A5."
 },
 {
  "id": "A2-04-D1136",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_451",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Robuste"
  ],
  "after": null,
  "reason": "Redondant avec « Résistant »."
 }
]
```

## 悪い — `v_452`

### Fiche source `n5_v_452`

```json
{
 "id": "n5_v_452",
 "level": "N5",
 "word": "悪い",
 "word_furigana": "<ruby>悪<rt>わる</rt></ruby>い",
 "reading": "わるい",
 "romaji": "warui",
 "meanings": {
  "primary": "Mauvais",
  "secondary": [
   "Néfaste",
   "Coupable",
   "Désolé (formule polie)"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant ce qui est moralement ou physiquement mauvais, de mauvaise qualité, ou utilisé pour s'excuser familièrement (« c'est ma faute / désolé »).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "appreciation",
 "kanji_list": [
  "悪"
 ],
 "particles": [],
 "example": {
  "japanese": "きょう は め が **<ruby>悪<rt>わる</rt></ruby>い** です 。",
  "romaji": "kyou wa me ga warui desu.",
  "french": "Ma vue est **mauvaise** aujourd'hui.",
  "highlight": [
   "悪い",
   "warui"
  ]
 }
}
```

### Anciens exemples de `n5_v_452` (3)

```json
[
 {
  "japanese": "この <ruby>天気<rt>てんき</rt></ruby> は <ruby>悪<rt>わる</rt></ruby>い です",
  "romaji": "kono tenki wa warui desu.",
  "french": "Ce temps est **mauvais**.",
  "highlight": [
   "悪い",
   "warui"
  ]
 },
 {
  "japanese": "<ruby>私<rt>わたし</rt></ruby> は <ruby>体<rt>からだ</rt></ruby> の <ruby>調子<rt>ちょうし</rt></ruby> が <ruby>悪<rt>わる</rt></ruby>い です",
  "romaji": "watashi wa karada no choushi ga warui desu.",
  "french": "Je ne me sens pas bien / Je suis en **mauvaise** forme physique.",
  "highlight": [
   "悪い",
   "warui"
  ]
 },
 {
  "japanese": "<ruby>悪<rt>わる</rt></ruby>い <ruby>夢<rt>ゆめ</rt></ruby> を <ruby>見<rt>み</rt></ruby>ました",
  "romaji": "warui yume o mimashita.",
  "french": "J'ai fait un **mauvais** rêve.",
  "highlight": [
   "悪い",
   "warui"
  ]
 }
]
```

### ENTRY publiée `v_452`

```json
{
 "id": "v_452",
 "level": "N5",
 "word": "悪い",
 "writings": [],
 "readings": [
  {
   "kana": "わるい",
   "romaji": "warui",
   "furigana": "<ruby>悪<rt>わる</rt></ruby>い",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Moralement ou physiquement mauvais, ou de mauvaise qualité : めが悪いです (avoir une mauvaise vue). Sert aussi, familièrement, à s'excuser : « c'est ma faute, désolé ».",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_452_s1",
   "meaning": {
    "primary": "Mauvais",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_452` (4)

```json
[
 {
  "id": "A2-04-D1097",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_452",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Mauvais",
   "Néfaste",
   "Coupable",
   "Désolé (formule polie)"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens proposé : l'évaluation négative, que la fiche applique au moral, au physique et à la qualité, et son exemple à la vue (めが悪い) ; même traitement que いい « bon » (lot 0). L'emploi d'excuse, que la nuance décrit, est un emploi d'adresse : il est conservé en nuance. Alternative laissée à l'arbitrage : un second sens pour l'excuse."
 },
 {
  "id": "A2-04-D1098",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_452",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Évaluation générale : « propriété générale », hors de la hiérarchie thématique, comme いい (lot 0). Addendum A5."
 },
 {
  "id": "A2-04-D1099",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_452",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Néfaste"
  ],
  "after": null,
  "reason": "Redondant."
 },
 {
  "id": "A2-04-D1100",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_452",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Coupable",
   "Désolé (formule polie)"
  ],
  "after": null,
  "reason": "Rattachés à l'emploi d'excuse, repris en nuance. La traduction de la source dit « formule polie », sa nuance « familièrement » : la nuance, qui développe l'emploi (« c'est ma faute / désolé »), est suivie."
 }
]
```

## 易しい — `v_456`

### Fiche source `n5_v_456`

```json
{
 "id": "n5_v_456",
 "level": "N5",
 "word": "易しい",
 "word_furigana": "<ruby>易<rt>やさ</rt></ruby>しい",
 "reading": "やさしい",
 "romaji": "yasashii",
 "meanings": {
  "primary": "Facile",
  "secondary": [
   "Simple",
   "Aisé"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant une tâche, un exercice ou une épreuve qui ne présente pas de difficulté (partage la même lecture que l'adjectif signifiant « aimable/gentil », mais s'écrit avec le kanji de la simplicité).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "competence",
 "kanji_list": [
  "易"
 ],
 "particles": [],
 "example": {
  "japanese": "この しごと は **<ruby>易<rt>やさ</rt></ruby>しい** です 。",
  "romaji": "kono shigoto wa yasashii desu.",
  "french": "Ce travail est **facile**.",
  "highlight": [
   "易しい",
   "yasashii"
  ]
 }
}
```

### Anciens exemples de `n5_v_456` (3)

```json
[
 {
  "japanese": "この <ruby>漢字<rt>かんじ</rt></ruby> は とても <ruby>易<rt>やさ</rt></ruby>しい です",
  "romaji": "kono kanji wa totemo yasashii desu.",
  "french": "Ce kanji est très **facile**.",
  "highlight": [
   "易しい",
   "yasashii"
  ]
 },
 {
  "japanese": "その <ruby>質問<rt>しつもん</rt></ruby> は <ruby>易<rt>やさ</rt></ruby>しい ので、すぐ <ruby>答<rt>こた</rt></ruby>えられました",
  "romaji": "sono shitsumon wa yasashii node, sugu kotaeraremashita.",
  "french": "Cette question était **facile**, j'ai donc pu y répondre immédiatement.",
  "highlight": [
   "易しい",
   "yasashii"
  ]
 },
 {
  "japanese": "<ruby>易<rt>やさ</rt></ruby>しい <ruby>言葉<rt>ことば</rt></ruby> で <ruby>説明<rt>せつめい</rt></ruby> して ください",
  "romaji": "yasashii kotoba de setsumei shite kudasai.",
  "french": "Expliquez avec des mots **faciles** (simples), s'il vous plaît.",
  "highlight": [
   "易しい",
   "yasashii"
  ]
 }
]
```

### ENTRY publiée `v_456`

```json
{
 "id": "v_456",
 "level": "N5",
 "word": "易しい",
 "writings": [],
 "readings": [
  {
   "kana": "やさしい",
   "romaji": "yasashii",
   "furigana": "<ruby>易<rt>やさ</rt></ruby>しい",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Une tâche, un exercice ou une épreuve sans difficulté. Même lecture que l'adjectif signifiant « aimable, gentil », qui s'écrit autrement.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_456_s1",
   "meaning": {
    "primary": "Facile",
    "alternatives": [
     "Simple"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [
    {
     "axis": "facilite_difficulte",
     "pole": "facilite"
    }
   ],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions de journal de `v_456` (3)

```json
[
 {
  "id": "A2-04-D1091",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_456",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Propriété générale d'une tâche, sans domaine thématique propre ; le sens passe par la dimension facilité / difficulté, comme le sens « difficile » de 大変 (lot 0). Addendum A5."
 },
 {
  "id": "A2-04-D1092",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_456",
  "field": "sens 1 · dimensions",
  "kind": "decision",
  "before": [],
  "after": [
   {
    "axis": "facilite_difficulte",
    "pole": "facilite"
   }
  ],
  "reason": "Dimension facilité / difficulté, pôle facilité : l'axe d'A2-DIM décrit directement le sens (« qui ne présente pas de difficulté »). Arbitrage du périmètre du lot 16 : un axe existant est employé lorsqu'il décrit directement le sens ; cohérent avec 大変 « difficile » (lot 0). L'homophone « aimable, gentil » que cite la fiche n'est pas dans les sources : aucun sens ni aucune graphie n'est ajouté."
 },
 {
  "id": "A2-04-D1093",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_456",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Aisé"
  ],
  "after": null,
  "reason": "Redondant."
 }
]
```

## 暇 — `v_457`

### Fiche source `n5_v_457`

```json
{
 "id": "n5_v_457",
 "level": "N5",
 "word": "暇",
 "word_furigana": "<ruby>暇<rt>ひま</rt></ruby>",
 "reading": "ひま",
 "romaji": "hima",
 "meanings": {
  "primary": "Temps libre",
  "secondary": [
   "Libre",
   "Dispo",
   "Oisif"
  ]
 },
 "nuance": "**Adjectif en na** (et nom) désignant le fait d'avoir du temps libre, de ne pas être occupé par le travail ou des obligations.",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "etat_sante",
 "kanji_list": [
  "暇"
 ],
 "particles": [],
 "example": {
  "japanese": "きょう の ごご は **<ruby>暇<rt>ひま</rt></ruby>** です 。",
  "romaji": "kyou no gogo wa hima desu.",
  "french": "Je suis **libre** (j'ai du temps libre) cet après-midi.",
  "highlight": [
   "暇",
   "hima"
  ]
 }
}
```

### Anciens exemples de `n5_v_457` (3)

```json
[
 {
  "japanese": "あなた は <ruby>明日<rt>あした</rt></ruby> <ruby>暇<rt>ひま</rt></ruby> ですか",
  "romaji": "anata wa ashita hima desu ka.",
  "french": "Es-tu **libre** (as-tu du temps libre) demain ?",
  "highlight": [
   "暇",
   "hima"
  ]
 },
 {
  "japanese": "<ruby>週末<rt>しゅうまつ</rt></ruby> は <ruby>暇<rt>ひま</rt></ruby> なので、<ruby>映画<rt>えいが</rt></ruby> を <ruby>見<rt>み</rt></ruby>に <ruby>行<rt>い</rt></ruby>きます",
  "romaji": "shuumatsu wa hima na node, eiga o mi ni ikimasu.",
  "french": "Je suis **libre** ce week-end, alors je vais aller voir un film.",
  "highlight": [
   "暇",
   "hima"
  ]
 },
 {
  "japanese": "<ruby>暇<rt>ひま</rt></ruby> な <ruby>時<rt>とき</rt></ruby>、よく <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>みます",
  "romaji": "hima na toki, yoku hon o yomimasu.",
  "french": "Quand j'ai du **temps libre**, je lis souvent des livres.",
  "highlight": [
   "暇",
   "hima"
  ]
 }
]
```

### ENTRY publiée `v_457`

```json
{
 "id": "v_457",
 "level": "N5",
 "word": "暇",
 "writings": [],
 "readings": [
  {
   "kana": "ひま",
   "romaji": "hima",
   "furigana": "<ruby>暇<rt>ひま</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Avoir du temps libre, ne pas être pris par le travail ou des obligations.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_457_s1",
   "meaning": {
    "primary": "Libre",
    "alternatives": [
     "Temps libre"
    ]
   },
   "category": null,
   "semantic_type": "etat",
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

### Décisions de journal de `v_457` (3)

```json
[
 {
  "id": "A2-04-D1119",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_457",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Temps libre",
   "Libre",
   "Dispo",
   "Oisif"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens : le fait d'avoir du temps libre. « Libre » passe en traduction principale : l'exemple de la fiche emploie 暇 en prédicat (きょうのごごは暇です, « je suis libre cet après-midi »). « Temps libre », traduction principale de la source, est gardé : la fiche dit « adjectif en na (et nom) ». La classe est mécanique (adjectif_na), rien n'est ajouté. Type etat. Alternative : garder « Temps libre » en tête."
 },
 {
  "id": "A2-04-D1120",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_457",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Aucune catégorie primaire pertinente : avoir ou non du temps devant soi est l'état d'une personne, que le registre ne range ni dans le temps (qui porte les notions de temps), ni dans le travail (la fiche parle du travail « ou » d'autres obligations). Addendum A5."
 },
 {
  "id": "A2-04-D1121",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_457",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Dispo",
   "Oisif"
  ],
  "after": null,
  "reason": "Le premier est une abréviation familière, redondante ; le second, péjoratif, n'est pas développé par la fiche."
 }
]
```

## 有名 — `v_458`

### Fiche source `n5_v_458`

```json
{
 "id": "n5_v_458",
 "level": "N5",
 "word": "有名",
 "word_furigana": "<ruby>有<rt>ゆう</rt></ruby><ruby>名<rt>めい</rt></ruby>",
 "reading": "ゆうめい",
 "romaji": "yuumei",
 "meanings": {
  "primary": "Célèbre",
  "secondary": [
   "Renommé",
   "Connu"
  ]
 },
 "nuance": "**Adjectif en na** qualifiant une personne, un lieu ou une chose qui jouit d'une grande notoriété ou d'une popularité reconnue.",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "caracteristique",
 "kanji_list": [
  "有",
  "名"
 ],
 "particles": [],
 "example": {
  "japanese": "ここ は **<ruby>有<rt>ゆう</rt></ruby><ruby>名<rt>めい</rt></ruby>** な まち です 。",
  "romaji": "koko wa yuumei na machi desu.",
  "french": "C'est une ville **célèbre**.",
  "highlight": [
   "有名",
   "yuumei"
  ]
 }
}
```

### Anciens exemples de `n5_v_458` (3)

```json
[
 {
  "japanese": "ここ は <ruby>有名<rt>ゆうめい</rt></ruby> な <ruby>観光地<rt>かんこうち</rt></ruby> です",
  "romaji": "koko wa yuumei na kankouchi desu.",
  "french": "C'est un site touristique **célèbre**.",
  "highlight": [
   "有名",
   "yuumei"
  ]
 },
 {
  "japanese": "<ruby>彼女<rt>かのじょ</rt></ruby> は <ruby>日本<rt>にほん</rt></ruby> で <ruby>有名<rt>ゆうめい</rt></ruby> な <ruby>歌手<rt>かしゅ</rt></ruby> です",
  "romaji": "kanojo wa nihon de yuumei na kashu desu.",
  "french": "Elle est une chanteuse **célèbre** au Japon.",
  "highlight": [
   "有名",
   "yuumei"
  ]
 },
 {
  "japanese": "その <ruby>小説<rt>しょうせつ</rt></ruby> は <ruby>世界中<rt>せかいじゅう</rt></ruby> で <ruby>有名<rt>ゆうめい</rt></ruby> です",
  "romaji": "sono shousetsu wa sekaijuu de yuumei desu.",
  "french": "Ce roman est **célèbre** dans le monde entier.",
  "highlight": [
   "有名",
   "yuumei"
  ]
 }
]
```

### ENTRY publiée `v_458`

```json
{
 "id": "v_458",
 "level": "N5",
 "word": "有名",
 "writings": [],
 "readings": [
  {
   "kana": "ゆうめい",
   "romaji": "yuumei",
   "furigana": "<ruby>有<rt>ゆう</rt></ruby><ruby>名<rt>めい</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Une personne, un lieu ou une chose qui jouit d'une grande notoriété.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_458_s1",
   "meaning": {
    "primary": "Célèbre",
    "alternatives": [
     "Connu"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_458` (2)

```json
[
 {
  "id": "A2-04-D1111",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_458",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "La notoriété est une caractéristique générale d'une personne, d'un lieu ou d'une chose, sans domaine thématique propre ; aucun axe d'A2-DIM ne la décrit, aucune dimension n'est donc portée. Addendum A5."
 },
 {
  "id": "A2-04-D1112",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_458",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Renommé"
  ],
  "after": null,
  "reason": "Redondant."
 }
]
```

## 汚い — `v_461`

### Fiche source `n5_v_461`

```json
{
 "id": "n5_v_461",
 "level": "N5",
 "word": "汚い",
 "word_furigana": "<ruby>汚<rt>きたな</rt></ruby>い",
 "reading": "きたない",
 "romaji": "kitanai",
 "meanings": {
  "primary": "Sale",
  "secondary": [
   "Immonde",
   "Crasseux",
   "Grossier (langage)"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant un manque de propreté physique d'un endroit ou d'un objet, ou par extension un langage grossier ou une action malhonnête (antonyme de *kirei* dans son sens de propreté).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "proprete",
 "kanji_list": [
  "汚"
 ],
 "particles": [],
 "example": {
  "japanese": "この くつ は **<ruby>汚<rt>きたな</rt></ruby>い** です 。",
  "romaji": "kono kutsu wa kitanai desu.",
  "french": "Ces chaussures sont **sales**.",
  "highlight": [
   "汚い",
   "kitanai"
  ]
 }
}
```

### Anciens exemples de `n5_v_461` (3)

```json
[
 {
  "japanese": "この <ruby>部屋<rt>へや</rt></ruby> は とても <ruby>汚<rt>きたな</rt></ruby>い です",
  "romaji": "kono heya wa totemo kitanai desu.",
  "french": "Cette pièce est très **sale**.",
  "highlight": [
   "汚い",
   "kitanai"
  ]
 },
 {
  "japanese": "<ruby>汚<rt>きたな</rt></ruby>い <ruby>手<rt>て</rt></ruby> で <ruby>顔<rt>かお</rt></ruby> を さわらないで ください",
  "romaji": "kitanai te de kao o sawaranaide kudasai.",
  "french": "Ne touchez pas votre visage avec des mains **sales**.",
  "highlight": [
   "汚い",
   "kitanai"
  ]
 },
 {
  "japanese": "<ruby>外<rt>そと</rt></ruby> で <ruby>遊<rt>あそ</rt></ruby>んで、<ruby>靴<rt>くつ</rt></ruby> が <ruby>汚<rt>きたな</rt></ruby>くなりました",
  "romaji": "soto de asonde, kutsu ga kitanakunarimashita.",
  "french": "En jouant dehors, mes chaussures sont devenues **sales**.",
  "highlight": [
   "汚い",
   "kitanai"
  ]
 }
]
```

### ENTRY publiée `v_461`

```json
{
 "id": "v_461",
 "level": "N5",
 "word": "汚い",
 "writings": [],
 "readings": [
  {
   "kana": "きたない",
   "romaji": "kitanai",
   "furigana": "<ruby>汚<rt>きたな</rt></ruby>い",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_461_s1",
   "meaning": {
    "primary": "Sale",
    "alternatives": [
     "Crasseux"
    ]
   },
   "category": {
    "level_1": "habitat_vie_domestique",
    "level_2": "entretien_domestique",
    "level_3": "nettoyage"
   },
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Un endroit ou un objet qui manque de propreté. Contraire : きれい, au sens de « propre »."
  },
  {
   "id": "v_461_s2",
   "meaning": {
    "primary": "Grossier (langage)",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Un langage grossier, ou une action malhonnête."
  }
 ]
}
```

### Décisions de journal de `v_461` (3)

```json
[
 {
  "id": "A2-04-D1145",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_461",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Sale",
   "Immonde",
   "Crasseux",
   "Grossier (langage)"
  ],
  "after": [
   "S1 Sale",
   "S2 Grossier (langage)"
  ],
  "reason": "Deux sens documentés par la fiche (« un manque de propreté physique d'un endroit ou d'un objet, ou par extension un langage grossier ou une action malhonnête ») : la saleté d'une chose, et la conduite d'une personne ; deux référents, comme les deux sens de 重い (lot 15). Le premier est dans la catégorie du sens « propre » de きれい (lot 0), que la fiche donne pour contraire. Sens 2 candidat ; alternative : un seul sens, l'extension passant en nuance."
 },
 {
  "id": "A2-04-D1146",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_461",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Un langage grossier ou une action malhonnête : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1147",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_461",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Immonde"
  ],
  "after": null,
  "reason": "Redondant, et plus fort que ce que décrit la fiche."
 }
]
```

## 清い — `v_462`

### Fiche source `n5_v_462`

```json
{
 "id": "n5_v_462",
 "level": "N5",
 "word": "清い",
 "word_furigana": "<ruby>清<rt>きよ</rt></ruby>い",
 "reading": "きよい",
 "romaji": "kiyoi",
 "meanings": {
  "primary": "Pur",
  "secondary": [
   "Limpide",
   "Innocent",
   "Honnête"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant ce qui est physiquement pur (comme l'eau claire) ou moralement pur et intègre (comme une conscience ou un cœur).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "proprete",
 "kanji_list": [
  "清"
 ],
 "particles": [],
 "example": {
  "japanese": "かれ は **<ruby>清<rt>きよ</rt></ruby>い** こころ を 持って います 。",
  "romaji": "kare wa kiyoi kokoro o motte imasu.",
  "french": "Il a un cœur **pur**.",
  "highlight": [
   "清い",
   "kiyoi"
  ]
 }
}
```

### Anciens exemples de `n5_v_462` (3)

```json
[
 {
  "japanese": "<ruby>川<rt>かわ</rt></ruby> の <ruby>水<rt>みず</rt></ruby> が とても <ruby>清<rt>きよ</rt></ruby>い です",
  "romaji": "kawa no mizu ga totemo kiyoi desu.",
  "french": "L'eau de la rivière est très **pure**.",
  "highlight": [
   "清い",
   "kiyoi"
  ]
 },
 {
  "japanese": "<ruby>彼女<rt>かのじょ</rt></ruby> は <ruby>清<rt>きよ</rt></ruby>い <ruby>心<rt>こころ</rt></ruby> を <ruby>持<rt>も</rt></ruby>って います",
  "romaji": "kanojo wa kiyoi kokoro o motte imasu.",
  "french": "Elle a un cœur **pur**.",
  "highlight": [
   "清い",
   "kiyoi"
  ]
 },
 {
  "japanese": "<ruby>清<rt>きよ</rt></ruby>い <ruby>空気<rt>くうき</rt></ruby> を <ruby>吸<rt>す</rt></ruby>いながら <ruby>散歩<rt>さんぽ</rt></ruby> します",
  "romaji": "kiyoi kuuki o suinagara sanpo shimasu.",
  "french": "Je me promène tout en respirant de l'air **pur**.",
  "highlight": [
   "清い",
   "kiyoi"
  ]
 }
]
```

### ENTRY publiée `v_462`

```json
{
 "id": "v_462",
 "level": "N5",
 "word": "清い",
 "writings": [],
 "readings": [
  {
   "kana": "きよい",
   "romaji": "kiyoi",
   "furigana": "<ruby>清<rt>きよ</rt></ruby>い",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_462_s1",
   "meaning": {
    "primary": "Pur",
    "alternatives": [
     "Limpide"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Ce qui est physiquement pur : de l'eau claire."
  },
  {
   "id": "v_462_s2",
   "meaning": {
    "primary": "Pur (moralement)",
    "alternatives": [
     "Innocent",
     "Honnête"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Ce qui est moralement pur et intègre : une conscience, un cœur. かれは清いこころを持っています (il a un cœur pur)."
  }
 ]
}
```

### Décisions de journal de `v_462` (3)

```json
[
 {
  "id": "A2-04-D1148",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_462",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Pur",
   "Limpide",
   "Innocent",
   "Honnête"
  ],
  "after": [
   "S1 Pur (physiquement)",
   "S2 Pur (moralement)"
  ],
  "reason": "Deux sens documentés par la fiche (« ce qui est physiquement pur (comme l'eau claire) ou moralement pur et intègre (comme une conscience ou un cœur) ») : une chose, et la conduite ou le cœur d'une personne ; deux référents. L'exemple de la fiche porte sur le sens moral (« il a un cœur pur ») ; il est conservé en nuance. L'ordre suit les traductions de la source. Sens 2 candidat ; alternative : un seul sens."
 },
 {
  "id": "A2-04-D1149",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_462",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "La pureté physique d'une chose : propriété générale d'une chose, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1150",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_462",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "La pureté morale : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5."
 }
]
```

## 甘い — `v_464`

### Fiche source `n5_v_464`

```json
{
 "id": "n5_v_464",
 "level": "N5",
 "word": "甘い",
 "word_furigana": "<ruby>甘<rt>あま</rt></ruby>い",
 "reading": "あまい",
 "romaji": "amai",
 "meanings": {
  "primary": "Sucré",
  "secondary": [
   "Doux (saveur)",
   "LaXiste",
   "Ingénu"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant une saveur sucrée, ou par extension une attitude trop clémente, indulgente ou naïve (« être indulgent / trop laxiste envers quelqu'un »).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "saveur",
 "kanji_list": [
  "甘"
 ],
 "particles": [],
 "example": {
  "japanese": "この ケーキ は とても **<ruby>甘<rt>あま</rt></ruby>い** です 。",
  "romaji": "kono keiki wa totemo amai desu.",
  "french": "Ce gâteau est très **sucré**.",
  "highlight": [
   "甘い",
   "amai"
  ]
 }
}
```

### Anciens exemples de `n5_v_464` (3)

```json
[
 {
  "japanese": "この <ruby>果物<rt>くだもの</rt></ruby> は とても <ruby>甘<rt>あま</rt></ruby>い です",
  "romaji": "kono kudamono wa totemo amai desu.",
  "french": "Ce fruit est très **sucré**.",
  "highlight": [
   "甘い",
   "amai"
  ]
 },
 {
  "japanese": "コーヒー に <ruby>砂糖<rt>さとう</rt></ruby> を <ruby>入<rt>い</rt></ruby>れて、<ruby>甘<rt>あま</rt></ruby>く します",
  "romaji": "koohii ni satou o irete, amaku shimasu.",
  "french": "Je mets du sucre dans le café pour le rendre **sucré**.",
  "highlight": [
   "甘い",
   "amai"
  ]
 },
 {
  "japanese": "<ruby>甘<rt>あま</rt></ruby>い お<ruby>菓子<rt>かし</rt></ruby> を <ruby>食<rt>た</rt></ruby>べたい です",
  "romaji": "amai okashi o tabetai desu.",
  "french": "Je veux manger des friandises **sucrées**.",
  "highlight": [
   "甘い",
   "amai"
  ]
 }
]
```

### ENTRY publiée `v_464`

```json
{
 "id": "v_464",
 "level": "N5",
 "word": "甘い",
 "writings": [],
 "readings": [
  {
   "kana": "あまい",
   "romaji": "amai",
   "furigana": "<ruby>甘<rt>あま</rt></ruby>い",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_464_s1",
   "meaning": {
    "primary": "Sucré",
    "alternatives": [
     "Doux"
    ]
   },
   "category": {
    "level_1": "alimentation_cuisine",
    "level_2": "gouts_alimentaires",
    "level_3": "sucre"
   },
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   }
  },
  {
   "id": "v_464_s2",
   "meaning": {
    "primary": "Indulgent",
    "alternatives": [
     "Laxiste"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "子供に甘い : être indulgent avec les enfants ; 考えが甘い : avoir une vue trop optimiste."
  }
 ]
}
```

### Décisions de journal de `v_464` (4)

```json
[
 {
  "id": "A2-04-D0190",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-02",
  "entry": "n5_v_464",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Sucré",
   "Doux (saveur)",
   "LaXiste",
   "Ingénu"
  ],
  "after": [
   "S1 Sucré",
   "S2 Indulgent"
  ],
  "reason": "Deux sens : une saveur, et une attitude trop peu exigeante envers quelqu'un ou quelque chose (子供に甘い)."
 },
 {
  "id": "A2-04-D0191",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-02",
  "entry": "n5_v_464",
  "field": "senses",
  "kind": "correction",
  "before": "LaXiste",
  "after": "Laxiste",
  "reason": "Coquille de la source (anomalie déjà consignée)."
 },
 {
  "id": "A2-04-D0192",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-02",
  "entry": "n5_v_464",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Attitude générale envers autrui (trop indulgent) : « propriété générale », sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D0193",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-02",
  "entry": "n5_v_464",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Ingénu"
  ],
  "after": null,
  "reason": "Emploi 考えが甘い, repris dans la nuance du sens 2."
 }
]
```

## 賑やか — `v_478`

### Fiche source `n5_v_478`

```json
{
 "id": "n5_v_478",
 "level": "N5",
 "word": "賑やか",
 "word_furigana": "<ruby>賑<rt>にぎ</rt></ruby>やか",
 "reading": "にぎやか",
 "romaji": "nigiyaka",
 "meanings": {
  "primary": "Animé",
  "secondary": [
   "Bruyant",
   "Populeux",
   "Joyeux (lieu)"
  ]
 },
 "nuance": "**Adjectif en na** qualifiant un endroit plein de vie, de monde, d'animation ou d'agitation joyeuse (comme une rue commerçante ou une fête).",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "caractere_bruit",
 "kanji_list": [
  "賑"
 ],
 "particles": [],
 "example": {
  "japanese": "この まち は いつも **<ruby>賑<rt>にぎ</rt></ruby>やか** です 。",
  "romaji": "kono machi wa itsumo nigiyaka desu.",
  "french": "Cette ville est toujours **animée**.",
  "highlight": [
   "賑やか",
   "nigiyaka"
  ]
 }
}
```

### Anciens exemples de `n5_v_478` (3)

```json
[
 {
  "japanese": "ここ は いつも <ruby>賑<rt>にぎ</rt></ruby>やか な <ruby>街<rt>まち</rt></ruby> です",
  "romaji": "koko wa itsumo nigiyaka na machi desu.",
  "french": "C'est toujours une ville **animée** ici.",
  "highlight": [
   "賑やか",
   "nigiyaka"
  ]
 },
 {
  "japanese": "<ruby>祭<rt>まつ</rt></ruby>り のおかげで、<ruby>神社<rt>じんじゃ</rt></ruby> の <ruby>前<rt>まえ</rt></ruby> が とても <ruby>賑<rt>にぎ</rt></ruby>やか です",
  "romaji": "matsuri no okage de, jinja no mae ga totemo nigiyaka desu.",
  "french": "Grâce au festival, il y a beaucoup d'**animation** devant le sanctuaire.",
  "highlight": [
   "賑やか",
   "nigiyaka"
  ]
 },
 {
  "japanese": "クラス の みんな で <ruby>賑<rt>にぎ</rt></ruby>やか に お<ruby>昼<rt>ひる</rt></ruby> ごはん を <ruby>食<rt>た</rt></ruby>べました",
  "romaji": "kurasu no minna de nigiyaka ni ohiru gohan o tabemashita.",
  "french": "Nous avons pris notre déjeuner dans une ambiance **animée** avec toute la classe.",
  "highlight": [
   "賑やか",
   "nigiyaka"
  ]
 }
]
```

### ENTRY publiée `v_478`

```json
{
 "id": "v_478",
 "level": "N5",
 "word": "賑やか",
 "writings": [],
 "readings": [
  {
   "kana": "にぎやか",
   "romaji": "nigiyaka",
   "furigana": "<ruby>賑<rt>にぎ</rt></ruby>やか",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Un endroit plein de vie, de monde, d'animation ou d'agitation joyeuse : une rue commerçante, une fête.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_478_s1",
   "meaning": {
    "primary": "Animé",
    "alternatives": [
     "Joyeux (lieu)"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_478` (2)

```json
[
 {
  "id": "A2-04-D1154",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_478",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "L'animation ou le calme d'un lieu : propriété générale d'un endroit ou d'une atmosphère, sans domaine thématique propre ; la fiche parle de vie, de monde et d'agitation autant que de bruit, ce que « ouïe » ne couvrirait qu'en partie. Addendum A5."
 },
 {
  "id": "A2-04-D1155",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_478",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Bruyant",
   "Populeux"
  ],
  "after": null,
  "reason": "La fiche décrit une animation joyeuse, non un bruit désagréable (うるさい) ; « plein de monde » est dit en nuance."
 }
]
```

## 重い — `v_484`

### Fiche source `n5_v_484`

```json
{
 "id": "n5_v_484",
 "level": "N5",
 "word": "重い",
 "word_furigana": "<ruby>重<rt>おも</rt></ruby>い",
 "reading": "おもい",
 "romaji": "omoi",
 "meanings": {
  "primary": "Lourd",
  "secondary": [
   "Pesant",
   "Grave (situation, responsabilité)"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant un poids physique important (antonyme de *karui*), ou par extension une atmosphère, une responsabilité ou une charge morale pesante.",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "poids",
 "kanji_list": [
  "重"
 ],
 "particles": [],
 "example": {
  "japanese": "この にもつ は **<ruby>重<rt>おも</rt></ruby>い** です 。",
  "romaji": "kono nimotsu wa omoi desu.",
  "french": "Ce bagage est **lourd**.",
  "highlight": [
   "重い",
   "omoi"
  ]
 }
}
```

### Anciens exemples de `n5_v_484` (3)

```json
[
 {
  "japanese": "この <ruby>荷物<rt>にもつ</rt></ruby> は とても <ruby>重<rt>おも</rt></ruby>い です",
  "romaji": "kono nimotsu wa totemo omoi desu.",
  "french": "Ce bagage est très **lourd**.",
  "highlight": [
   "重い",
   "omoi"
  ]
 },
 {
  "japanese": "<ruby>重<rt>おも</rt></ruby>い <ruby>鞄<rt>かばん</rt></ruby> を <ruby>持<rt>も</rt></ruby>って、<ruby>肩<rt>かた</rt></ruby> が <ruby>痛<rt>いた</rt></ruby>くなりました",
  "romaji": "omoi kaban o motte, kata ga itakunarimashita.",
  "french": "En portant un sac **lourd**, j'ai eu mal à l'épaule.",
  "highlight": [
   "重い",
   "omoi"
  ]
 },
 {
  "japanese": "パソコン は <ruby>重<rt>おも</rt></ruby>い ので、<ruby>車<rt>くるま</rt></ruby> で <ruby>運<rt>はこ</rt></ruby>びます",
  "romaji": "pasokon wa omoi node, kuruma de hakobimasu.",
  "french": "Comme l'ordinateur portable est **lourd**, je le transporte en voiture.",
  "highlight": [
   "重い",
   "omoi"
  ]
 }
]
```

### ENTRY publiée `v_484`

```json
{
 "id": "v_484",
 "level": "N5",
 "word": "重い",
 "writings": [],
 "readings": [
  {
   "kana": "おもい",
   "romaji": "omoi",
   "furigana": "<ruby>重<rt>おも</rt></ruby>い",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_i",
  "group": "i",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_484_s1",
   "meaning": {
    "primary": "Lourd",
    "alternatives": [
     "Pesant"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Contraire : 軽い."
  },
  {
   "id": "v_484_s2",
   "meaning": {
    "primary": "Grave",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Une situation, une responsabilité, une atmosphère, une charge morale."
  }
 ]
}
```

### Décisions de journal de `v_484` (3)

```json
[
 {
  "id": "A2-04-D1069",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-15",
  "entry": "n5_v_484",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Lourd",
   "Pesant",
   "Grave (situation, responsabilité)"
  ],
  "after": [
   "S1 Lourd (poids)",
   "S2 Grave"
  ],
  "reason": "Deux sens documentés par la fiche (« un poids physique important … ou par extension une atmosphère, une responsabilité ou une charge morale pesante ») : une propriété physique, et la gravité d'une situation ; deux référents. Alternative : un seul sens, l'extension passant en nuance."
 },
 {
  "id": "A2-04-D1070",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-15",
  "entry": "n5_v_484",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Aucune catégorie primaire pertinente : le poids est une propriété physique générale d'un objet, que le registre ne range nulle part (espace › dimensions ne couvre que longueur, largeur, hauteur, profondeur et taille ; sciences › physique désigne la discipline, non la propriété d'un objet du quotidien). Addendum A5."
 },
 {
  "id": "A2-04-D1071",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-15",
  "entry": "n5_v_484",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Gravité d'une situation, d'une responsabilité ou d'une atmosphère : « propriété générale », sans domaine thématique propre (comme 甘い « indulgent », lot 02). Addendum A5."
 }
]
```

## 静か — `v_489`

### Fiche source `n5_v_489`

```json
{
 "id": "n5_v_489",
 "level": "N5",
 "word": "静か",
 "word_furigana": "<ruby>静<rt>しず</rt></ruby>か",
 "reading": "しずか",
 "romaji": "shizuka",
 "meanings": {
  "primary": "Calme",
  "secondary": [
   "Tranquille",
   "Silencieux",
   "Paisible"
  ]
 },
 "nuance": "**Adjectif en na** qualifiant un endroit dépourvu de bruit et d'agitation, ou une atmosphère paisible et sereine (antonyme de *nigiyaka*).",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "caractere_bruit",
 "kanji_list": [
  "静"
 ],
 "particles": [],
 "example": {
  "japanese": "この としばこ は いつも **<ruby>静<rt>しず</rt></ruby>か** です 。",
  "romaji": "kono toshokan wa itsumo shizuka desu.",
  "french": "Cette bibliothèque est toujours **calme**.",
  "highlight": [
   "静か",
   "shizuka"
  ]
 }
}
```

### Anciens exemples de `n5_v_489` (3)

```json
[
 {
  "japanese": "ここ は いつも <ruby>静<rt>しず</rt></ruby>か な <ruby>場所<rt>ばしょ</rt></ruby> です",
  "romaji": "koko wa itsumo shizuka na basho desu.",
  "french": "C'est toujours un endroit **calme** ici.",
  "highlight": [
   "静か",
   "shizuka"
  ]
 },
 {
  "japanese": "<ruby>夜<rt>よる</rt></ruby> に なると、<ruby>町<rt>まち</rt></ruby> が <ruby>静<rt>しず</rt></ruby>かに なります",
  "romaji": "yoru ni naruto, machi ga shizuka ni narimasu.",
  "french": "Quand la nuit tombe, la ville devient **calme**.",
  "highlight": [
   "静か",
   "shizuka"
  ]
 },
 {
  "japanese": "<ruby>図書館<rt>としょかん</rt></ruby> では <ruby>静<rt>しず</rt></ruby>かに <ruby>勉強<rt>べんきょう</rt></ruby> しなければなりません",
  "romaji": "toshokan de wa shizuka ni benkyou shinakereba narimasen.",
  "french": "Il faut étudier en **silence** (calmement) à la bibliothèque.",
  "highlight": [
   "静か",
   "shizuka"
  ]
 }
]
```

### ENTRY publiée `v_489`

```json
{
 "id": "v_489",
 "level": "N5",
 "word": "静か",
 "writings": [],
 "readings": [
  {
   "kana": "しずか",
   "romaji": "shizuka",
   "furigana": "<ruby>静<rt>しず</rt></ruby>か",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Un endroit sans bruit ni agitation, ou une atmosphère paisible et sereine. Contraire : 賑やか.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_489_s1",
   "meaning": {
    "primary": "Calme",
    "alternatives": [
     "Tranquille",
     "Silencieux"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
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

### Décisions de journal de `v_489` (3)

```json
[
 {
  "id": "A2-04-D1156",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_489",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "L'animation ou le calme d'un lieu : propriété générale d'un endroit ou d'une atmosphère, sans domaine thématique propre ; la fiche parle de vie, de monde et d'agitation autant que de bruit, ce que « ouïe » ne couvrirait qu'en partie. Addendum A5."
 },
 {
  "id": "A2-04-D1157",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_489",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Paisible"
  ],
  "after": null,
  "reason": "Redondant ; repris en nuance."
 },
 {
  "id": "A2-04-D1158",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-17",
  "entry": "n5_v_489",
  "field": "nuance",
  "kind": "abandon",
  "before": "exemple de la source : « この としばこ は いつも 静か です » (« cette bibliothèque est toujours calme »)",
  "after": null,
  "reason": "Anomalie de la source : l'exemple dit としばこ pour « bibliothèque », qui se dit としょかん (図書館, lot 04). L'exemple n'est repris dans aucune nuance ; les exemples ne sont pas migrés, et l'anomalie est signalée pour le registre de phrases. Aucune information lexicale n'en est tirée."
 }
]
```

## 大変 — `v_495`

### Fiche source `n5_v_495`

```json
{
 "id": "n5_v_495",
 "level": "N5",
 "word": "大変",
 "word_furigana": "<ruby>大<rt>たい</rt></ruby><ruby>変<rt>へん</rt></ruby>",
 "reading": "たいへん",
 "romaji": "taihen",
 "meanings": {
  "primary": "Très",
  "secondary": [
   "Grave",
   "Difficile",
   "Pénible"
  ]
 },
 "nuance": "**Adverbe** (et adjectif en na) exprimant un degré élevé (synonyme de *totemo* dans le langage courant), ou désignant une situation difficile ou un pétrin (« c'est dur / pénible »).",
 "type": "adverbe",
 "group": "adverbe",
 "category": "adverbes_expressions",
 "subcategory": "degre",
 "kanji_list": [
  "大",
  "変"
 ],
 "particles": [],
 "example": {
  "japanese": "きょう は **<ruby>大<rt>たい</rt></ruby><ruby>変<rt>へん</rt></ruby>** あつい です 。",
  "romaji": "kyou wa taihen atsui desu.",
  "french": "Il fait **très** chaud aujourd'hui.",
  "highlight": [
   "大変",
   "taihen"
  ]
 }
}
```

### Anciens exemples de `n5_v_495` (3)

```json
[
 {
  "japanese": "きょう は たいへん <ruby>暑<rt>あつ</rt></ruby>い です",
  "romaji": "kyou wa taihen atsui desu.",
  "french": "Il fait **très** chaud aujourd'hui.",
  "highlight": [
   "たいへん",
   "taihen"
  ]
 },
 {
  "japanese": "きのう の <ruby>仕事<rt>しごと</rt></ruby> は たいへん でした",
  "romaji": "kinou no shigoto wa taihen deshita.",
  "french": "Le travail d'hier a été **difficile** / éprouvant.",
  "highlight": [
   "たいへん",
   "taihen"
  ]
 },
 {
  "japanese": "<ruby>地震<rt>じしん</rt></ruby> で たいへんな <ruby>被害<rt>ひがい</rt></ruby> が 出ました",
  "romaji": "jishin de taihen na higai ga demashita.",
  "french": "Il y a eu de **graves** dégâts à cause du tremblement de terre.",
  "highlight": [
   "たいへん",
   "taihen"
  ]
 }
]
```

### Fiche source `n5_v_508`

```json
{
 "id": "n5_v_508",
 "level": "N5",
 "word": "大変",
 "word_furigana": "<ruby>大<rt>たい</rt></ruby><ruby>変<rt>へん</rt></ruby>",
 "reading": "たいへん",
 "romaji": "taihen",
 "meanings": {
  "primary": "Difficile",
  "secondary": [
   "Pénible",
   "Grave",
   "Dur"
  ]
 },
 "nuance": "**Adjectif en na** (également utilisé comme adverbe) qualifiant une situation ardue, exigeante ou éprouvante à supporter (contrairement à l'entrée précédente axée sur l'adverbe d'intensité « très », celle-ci met l'accent sur la nature laborieuse ou difficile de la tâche).",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "degre",
 "kanji_list": [
  "大",
  "変"
 ],
 "particles": [],
 "example": {
  "japanese": "しごと が **<ruby>大<rt>たい</rt></ruby><ruby>変<rt>へん</rt></ruby>** です 。",
  "romaji": "shigoto ga taihen desu.",
  "french": "Le travail est **difficile** / éprouvant.",
  "highlight": [
   "大変",
   "taihen"
  ]
 }
}
```

### Anciens exemples de `n5_v_508` (3)

```json
[
 {
  "japanese": "きょう の <ruby>仕事<rt>しごと</rt></ruby> は たいへん です",
  "romaji": "kyou no shigoto wa taihen desu.",
  "french": "Le travail d'aujourd'hui est **difficile** / pénible.",
  "highlight": [
   "大変",
   "taihen"
  ]
 },
 {
  "japanese": "ひとりで この <ruby>荷物<rt>にもつ</rt></ruby> を <ruby>運<rt>はこ</rt></ruby>ぶ の は たいへん です",
  "romaji": "hitori de kono nimotsu o hakobu no wa taihen desu.",
  "french": "C'est **difficile** de transporter ce bagage tout seul.",
  "highlight": [
   "大変",
   "taihen"
  ]
 },
 {
  "japanese": "お<ruby>母<rt>かあ</rt></ruby>さん の <ruby>病気<rt>びょうき</rt></ruby> は たいへん でしたね",
  "romaji": "okaasan no byouki wa taihen deshita ne.",
  "french": "La maladie de votre mère a été une épreuve **difficile**, n'est-ce pas ?",
  "highlight": [
   "大変",
   "taihen"
  ]
 }
]
```

### ENTRY publiée `v_495`

```json
{
 "id": "v_495",
 "level": "N5",
 "word": "大変",
 "writings": [],
 "readings": [
  {
   "kana": "たいへん",
   "romaji": "taihen",
   "furigana": "<ruby>大<rt>たい</rt></ruby><ruby>変<rt>へん</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_495_s1",
   "meaning": {
    "primary": "Très",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": [
     "intensifieur"
    ]
   }
  },
  {
   "id": "v_495_s2",
   "meaning": {
    "primary": "Difficile",
    "alternatives": [
     "Pénible",
     "Grave"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [
    {
     "axis": "facilite_difficulte",
     "pole": "difficulte"
    }
   ],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "大変です : c'est dur, c'est grave."
  }
 ]
}
```

### Décisions de journal de `v_495` (4)

```json
[
 {
  "id": "A2-04-D0034",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_508",
  "field": "entrée",
  "kind": "fusion",
  "before": null,
  "after": "n5_v_495",
  "reason": "大変 adverbe et 大変 adjectif en な sont une seule unité lexicale ; n5_v_495 survit (plus petit numéro). Classe : adjectif en な ; l'emploi intensifieur relève du sens 1."
 },
 {
  "id": "A2-04-D0052",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_495",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "Dur"
  ],
  "after": null,
  "reason": "Redondant avec « Difficile » et « Pénible » (traduction du doublon n5_v_508)."
 },
 {
  "id": "A2-04-D0067",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_495",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "« Difficile » : propriété générale ; le sens passe par la dimension facilité / difficulté. Addendum A5."
 },
 {
  "id": "A2-04-D0074",
  "status": "validated",
  "date": "2026-10-02",
  "lot": "lot-00",
  "entry": "n5_v_495",
  "field": "sens 1 · semantic_type",
  "kind": "type-nul",
  "before": null,
  "after": null,
  "reason": "Emploi intensifieur (très) : fonction pragmatique, aucun type terminal ne s'applique. Addendum A6."
 }
]
```

## 大丈夫 — `v_512`

### Fiche source `n5_v_512`

```json
{
 "id": "n5_v_512",
 "level": "N5",
 "word": "大丈夫",
 "word_furigana": "<ruby>大<rt>だい</rt></ruby><ruby>丈<rt>じょう</rt></ruby><ruby>夫<rt>ぶ</rt></ruby>",
 "reading": "だいじょうぶ",
 "romaji": "daijoubu",
 "meanings": {
  "primary": "Ça va",
  "secondary": [
   "Pas de problème",
   "En sécurité",
   "Correct",
   "Tout va bien"
  ]
 },
 "nuance": "**Adjectif en na** (utilisé comme expression autonome) signifiant que tout est en ordre, qu'il n'y a pas lieu de s'inquiéter ou pour rassurer quelqu'un.",
 "type": "adjectif en na",
 "group": "na",
 "category": "adverbes_expressions",
 "subcategory": "etat_sante",
 "kanji_list": [
  "大",
  "丈",
  "夫"
 ],
 "particles": [],
 "example": {
  "japanese": "「 しんぱい しないで 、 **<ruby>大<rt>だい</rt></ruby><ruby>丈<rt>じょう</rt></ruby><ruby>夫<rt>ぶ</rt></ruby>** です 。」",
  "romaji": "\"shinpai shinaide, daijoubu desu.\"",
  "french": "« Ne t'inquiète pas, **ça va**. »",
  "highlight": [
   "大丈夫",
   "daijoubu"
  ]
 }
}
```

### Anciens exemples de `n5_v_512` (3)

```json
[
 {
  "japanese": "「<ruby>体<rt>からだ</rt></ruby> は <ruby>大丈夫<rt>だいじょうぶ</rt></ruby> ですか」「はい、<ruby>大丈夫<rt>だいじょうぶ</rt></ruby> です」",
  "romaji": "'karada wa daijoubu desu ka' 'hai, daijoubu desu.'",
  "french": "« **Ça va** pour votre santé ? / Êtes-vous en forme ? » « Oui, **ça va** (**il n'y a pas de problème**). »",
  "highlight": [
   "大丈夫",
   "daijoubu"
  ]
 },
 {
  "japanese": "しんぱい しないで ください、<ruby>全部<rt>ぜんぶ</rt></ruby> <ruby>大丈夫<rt>だいじょうぶ</rt></ruby> です",
  "romaji": "shinpai shinaide kudasai, zenbu daijoubu desu.",
  "french": "Ne vous inquiétez pas, tout **va bien**.",
  "highlight": [
   "大丈夫",
   "daijoubu"
  ]
 },
 {
  "japanese": "「この <ruby>仕事<rt>しごと</rt></ruby> は あした までに <ruby>終<rt>お</rt></ruby>わりますか」「はい、<ruby>大丈夫<rt>だいじょうぶ</rt></ruby> です」",
  "romaji": "'kono shigoto wa ashita made ni owarimasu ka' 'hai, daijoubu desu.'",
  "french": "« Est-ce que ce travail sera terminé d'ici demain ? » « Oui, **c'est bon** / il n'y a pas de souci. »",
  "highlight": [
   "大丈夫",
   "daijoubu"
  ]
 }
]
```

### ENTRY publiée `v_512`

```json
{
 "id": "v_512",
 "level": "N5",
 "word": "大丈夫",
 "writings": [],
 "readings": [
  {
   "kana": "だいじょうぶ",
   "romaji": "daijoubu",
   "furigana": "<ruby>大<rt>だい</rt></ruby><ruby>丈<rt>じょう</rt></ruby><ruby>夫<rt>ぶ</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "S'emploie souvent seul, pour rassurer ou dire que tout est en ordre. La source donne aussi les traductions « en sécurité » et « correct », sans les développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_512_s1",
   "meaning": {
    "primary": "Ça va",
    "alternatives": [
     "Pas de problème",
     "Tout va bien"
    ]
   },
   "category": null,
   "semantic_type": "etat",
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

### Décisions de journal de `v_512` (3)

```json
[
 {
  "id": "A2-04-D1124",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_512",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Ça va",
   "Pas de problème",
   "En sécurité",
   "Correct",
   "Tout va bien"
  ],
  "after": "un seul sens",
  "reason": "Un seul sens : « tout est en ordre, il n'y a pas lieu de s'inquiéter », que l'exemple de la fiche emploie pour rassurer (« ne t'inquiète pas, ça va »). La fiche dit « adjectif en na (utilisé comme expression autonome) » : l'emploi autonome est dit en nuance ; la classe est mécanique. Type etat. Arbitrage du périmètre : 大丈夫 reste dans ce lot."
 },
 {
  "id": "A2-04-D1125",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_512",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Aucune catégorie primaire pertinente : « tout va bien » est l'état général d'une personne ou d'une situation, sans domaine thématique propre. Addendum A5."
 },
 {
  "id": "A2-04-D1126",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_512",
  "field": "senses",
  "kind": "abandon",
  "before": [
   "En sécurité",
   "Correct"
  ],
  "after": null,
  "reason": "Deux autres emplois que la fiche ne développe pas : ce ne sont pas des traductions de ce sens. Signalés en nuance comme traductions de la source non développées."
 }
]
```

## 立派 — `v_609`

### Fiche source `n5_v_609`

```json
{
 "id": "n5_v_609",
 "level": "N5",
 "word": "立派",
 "word_furigana": "<ruby>立<rt>りっ</rt></ruby><ruby>派<rt>ぱ</rt></ruby>",
 "reading": "りっぱ",
 "romaji": "rippa",
 "meanings": {
  "primary": "Magnifique",
  "secondary": [
   "Superbe",
   "Splendide",
   "Remarquable",
   "Digne"
  ]
 },
 "nuance": "**Adjectif en -na** qualifiant quelque chose de grand, d'impressionnant, d'élégant, ou une personne qui fait preuve d'un comportement admirable et remarquable.",
 "type": "adjectif",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "appreciation",
 "kanji_list": [
  "立",
  "派"
 ],
 "particles": [],
 "example": {
  "japanese": "あの たてもの は **<ruby>立<rt>りっ</rt></ruby><ruby>派<rt>ぱ</rt></ruby>** です ね 。",
  "romaji": "ano tatemono wa rippa desu ne.",
  "french": "Ce bâtiment est **magnifique**, n'est-ce pas ?",
  "highlight": [
   "立派",
   "rippa"
  ]
 }
}
```

### Anciens exemples de `n5_v_609` (3)

```json
[
 {
  "japanese": "あそこに <ruby>立派<rt>りっぱ</rt></ruby> な お<ruby>寺<rt>てら</rt></ruby> が あります",
  "romaji": "asoko ni rippa na otera ga arimasu.",
  "french": "Il y a un **magnifique** temple là-bas.",
  "highlight": [
   "立派",
   "rippa"
  ]
 },
 {
  "japanese": "かれ は <ruby>立派<rt>りっぱ</rt></ruby> な <ruby>医者<rt>いしゃ</rt></ruby> に なりました",
  "romaji": "kare wa rippa na isha ni narimashita.",
  "french": "Il est devenu un **magnifique** médecin (**un médecin remarquable**).",
  "highlight": [
   "立派",
   "rippa"
  ]
 },
 {
  "japanese": "「きれいな うちですね」「ええ、とても <ruby>立派<rt>りっぱ</rt></ruby> ですね」",
  "romaji": "'kireina uchi desu ne' 'ee, totemo rippa desu ne.'",
  "french": "« C'est une belle maison ! » « Oui, elle est vraiment **magnifique** ! »",
  "highlight": [
   "立派",
   "rippa"
  ]
 }
]
```

### ENTRY publiée `v_609`

```json
{
 "id": "v_609",
 "level": "N5",
 "word": "立派",
 "writings": [],
 "readings": [
  {
   "kana": "りっぱ",
   "romaji": "rippa",
   "furigana": "<ruby>立<rt>りっ</rt></ruby><ruby>派<rt>ぱ</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adjectif_na",
  "group": "na",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_609_s1",
   "meaning": {
    "primary": "Magnifique",
    "alternatives": [
     "Superbe",
     "Splendide"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Une chose grande, impressionnante ou élégante : un bâtiment."
  },
  {
   "id": "v_609_s2",
   "meaning": {
    "primary": "Remarquable",
    "alternatives": [
     "Digne"
    ]
   },
   "category": null,
   "semantic_type": "propriete",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Une personne au comportement admirable."
  }
 ]
}
```

### Décisions de journal de `v_609` (4)

```json
[
 {
  "id": "A2-04-D1105",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_609",
  "field": "grammatical_class",
  "kind": "decision",
  "before": "adjectif (ancien type sans classe par défaut)",
  "after": "adjectif_na",
  "reason": "Classe adjectif_na : la fiche dit « adjectif en -na », et l'ancien group est na. group : na."
 },
 {
  "id": "A2-04-D1106",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_609",
  "field": "senses",
  "kind": "decision",
  "before": [
   "Magnifique",
   "Superbe",
   "Splendide",
   "Remarquable",
   "Digne"
  ],
  "after": [
   "S1 Magnifique (chose)",
   "S2 Remarquable (personne)"
  ],
  "reason": "Deux sens documentés par la fiche (« qualifiant quelque chose de grand, d'impressionnant, d'élégant, ou une personne qui fait preuve d'un comportement admirable et remarquable ») : l'aspect d'une chose, que l'exemple illustre (un bâtiment), et la conduite d'une personne ; deux référents. Sens 2 candidat ; alternative : un seul sens."
 },
 {
  "id": "A2-04-D1107",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_609",
  "field": "sens 1 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Appréciation générale de l'aspect d'une chose : « propriété générale », sans domaine thématique propre, comme きれい « beau » (lot 0). Addendum A5."
 },
 {
  "id": "A2-04-D1108",
  "status": "validated",
  "date": "2026-10-05",
  "lot": "lot-16",
  "entry": "n5_v_609",
  "field": "sens 2 · category",
  "kind": "categorie-nulle",
  "before": null,
  "after": null,
  "reason": "Appréciation générale de la conduite d'une personne : « propriété générale », sans domaine thématique propre. Addendum A5."
 }
]
```
