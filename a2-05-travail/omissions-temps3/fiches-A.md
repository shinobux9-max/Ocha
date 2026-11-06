# Groupe A — les 32 fiches sources complètes, leurs anciens exemples et les 31 ENTRY publiées

Recopiés tels quels, sans retouche : fiches de `reconstruction/a2-04/sources/vocab.json` et `vocab-hors-jlpt.json` (sources figées) ; anciens exemples de `reconstruction/a2-04/sources/exemples.json` (clé `vocab`) ; ENTRY de `data/n5/vocab.json` et `data/vocab-hors-jlpt.json`. Empreintes des fichiers lus : `reconstruction/a2-04/sources/vocab.json` `1f7a039630d3a547` ; `reconstruction/a2-04/sources/vocab-hors-jlpt.json` `31198b2557c56925` ; `reconstruction/a2-04/sources/exemples.json` `a8ecf995970462b1` ; `data/n5/vocab.json` `c8cd0f6fc3a5edfd` ; `data/vocab-hors-jlpt.json` `8ebea7443deb8314`.

## 頼む — `v_116`

### Fiche source `n5_v_116`

```json
{
 "id": "n5_v_116",
 "level": "N5",
 "word": "頼む",
 "word_furigana": "<ruby>頼<rt>たノ</rt></ruby>む",
 "reading": "たのむ",
 "romaji": "tanomu",
 "meanings": {
  "primary": "Demander",
  "secondary": [
   "Commander (un plat au restaurant)",
   "Prier / confier une tâche"
  ]
 },
 "nuance": "Verbe utilisé pour demander un service, faire une prière ou, dans le contexte du restaurant, passer une commande (plat ou boisson).",
 "type": "verbe godan",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "actions_objets",
 "kanji_list": [
  "頼"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "レストラン で カレーライス を 頼みました 。",
  "romaji": "resutoran de kareeraisu o tanomimashita.",
  "french": "J'ai **commandé** un riz au curry au restaurant.",
  "highlight": [
   "頼みました",
   "tanomimashita"
  ]
 }
}
```

### Anciens exemples de `n5_v_116` (3)

```json
[
 {
  "japanese": "レストラン で メニュー を <ruby>見<rt>み</rt></ruby>て、<ruby>定食<rt>ていしょく</rt></ruby> を <ruby>頼<rt>たの</rt></ruby>みました",
  "romaji": "resutoran de menyuu o mite, teishoku o tanomimashita.",
  "french": "J'ai regardé le menu au restaurant et j'ai **commandé** un menu fixe.",
  "highlight": [
   "頼む",
   "tanomu"
  ]
 },
 {
  "japanese": "わからない こと が あったら、<ruby>遠慮<rt>えんりょ</rt></ruby> せずに <ruby>人<rt>ひと</rt></ruby> に <ruby>頼<rt>たの</rt></ruby>んで ください",
  "romaji": "wakaranai koto ga attara, enryo sezuni hito ni tanonde kudasai.",
  "french": "S'il y a quelque chose que vous ne comprenez pas, n'hésitez pas à le **demander** à quelqu'un.",
  "highlight": [
   "頼む",
   "tanomu"
  ]
 },
 {
  "japanese": "タクシー を <ruby>頼<rt>たの</rt></ruby>んで、<ruby>駅<rt>えき</rt></ruby> まで <ruby>行<rt>い</rt></ruby>く こと に しました",
  "romaji": "takushii o tanonde, eki made iku koto ni shimashita.",
  "french": "J'ai décidé de **commander** (appeler) un taxi pour aller à la gare.",
  "highlight": [
   "頼む",
   "tanomu"
  ]
 }
]
```

### ENTRY publiée `v_116`

```json
{
 "id": "v_116",
 "level": "N5",
 "word": "頼む",
 "writings": [],
 "readings": [
  {
   "kana": "たのむ",
   "romaji": "tanomu",
   "furigana": "<ruby>頼<rt>たの</rt></ruby>む",
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
 "nuance": "La source cite aussi l'emploi « faire une prière », sans le développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_116_s1",
   "meaning": {
    "primary": "Demander",
    "alternatives": []
   },
   "category": {
    "level_1": "relations_sociales",
    "level_2": "interactions_sociales"
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
   "nuance": "Demander un service à quelqu'un."
  },
  {
   "id": "v_116_s2",
   "meaning": {
    "primary": "Commander (un plat au restaurant)",
    "alternatives": []
   },
   "category": {
    "level_1": "economie_commerce",
    "level_2": "achat_vente",
    "level_3": "commande"
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
   "nuance": "Au restaurant, passer une commande, un plat ou une boisson : レストランでカレーライスを頼みました (j'ai commandé un riz au curry au restaurant)."
  }
 ]
}
```

## 飲み物 — `v_120`

### Fiche source `n5_v_120`

```json
{
 "id": "n5_v_120",
 "level": "N5",
 "word": "飲み物",
 "word_furigana": "<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>",
 "reading": "のみもの",
 "romaji": "nomimono",
 "meanings": {
  "primary": "Boisson",
  "secondary": [
   "Liquide buvable"
  ]
 },
 "nuance": "Nom composé du radical du verbe <ruby>飲<rt>の</rt></ruby>む (nomu, boire) et de <ruby>物<rt>もの</rt></ruby> (mono, chose/objet), désignant toute sorte de boisson (nomimono - eau, thé, jus, etc.).",
 "type": "nom",
 "group": "nom",
 "category": "nourriture_boissons",
 "subcategory": "boissons",
 "kanji_list": [
  "飲",
  "物"
 ],
 "particles": [],
 "example": {
  "japanese": "のど が かわいた ので 、<ruby>冷<rt>つめ</rt></ruby>たい <ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby> を <ruby>買<rt>か</rt></ruby>います 。",
  "romaji": "nodo ga kawaita node, tsumetai nomimono o kaimasu.",
  "french": "J'ai soif, alors j'achète une **boisson** fraîche.",
  "highlight": [
   "飲み物",
   "nomimono"
  ]
 }
}
```

### Anciens exemples de `n5_v_120` (3)

```json
[
 {
  "japanese": "<ruby>暑<rt>あつ</rt></ruby>い <ruby>日<rt>ひ</rt></ruby> に は、<ruby>冷<rt>つめ</rt></ruby>たい <ruby>飲み物<rt>のみもの</rt></ruby> を たくさん <ruby>飲<rt>の</rt></ruby>みたくなります",
  "romaji": "atsui hi ni wa, tsumetai nomimono o takusan nomitaku narimasu.",
  "french": "Les jours de chaleur, on a envie de boire beaucoup de **boissons** fraîches.",
  "highlight": [
   "飲み物",
   "nomimono"
  ]
 },
 {
  "japanese": "スーパー で お<ruby>茶<rt>ちゃ</rt></ruby> や ジュース など の <ruby>飲み物<rt>のみもの</rt></ruby> を <ruby>買<rt>か</rt></ruby>いました",
  "romaji": "suupaade ocha ya juusu nado no nomimono o kaimashita.",
  "french": "J'ai acheté des **boissons** comme du thé et du jus au supermarché.",
  "highlight": [
   "飲み物",
   "nomimono"
  ]
 },
 {
  "japanese": "パーティー の ため に、さまざまな <ruby>種類<rt>しゅるい</rt></ruby> の <ruby>飲み物<rt>のみもの</rt></ruby> を <ruby>用意<rt>ようい</rt></ruby>しました",
  "romaji": "paatii no tame ni, samazama na shurui no nomimono o youi shimashita.",
  "french": "J'ai préparé différentes sortes de **boissons** pour la fête.",
  "highlight": [
   "飲み物",
   "nomimono"
  ]
 }
]
```

### ENTRY publiée `v_120`

```json
{
 "id": "v_120",
 "level": "N5",
 "word": "飲み物",
 "writings": [],
 "readings": [
  {
   "kana": "のみもの",
   "romaji": "nomimono",
   "furigana": "<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "飲み物は？ : et comme boisson ? (au restaurant).",
 "tags": [
  "lieu_konbini",
  "lieu_restaurant"
 ],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_120_s1",
   "meaning": {
    "primary": "Boisson",
    "alternatives": []
   },
   "category": {
    "level_1": "alimentation_cuisine",
    "level_2": "boissons"
   },
   "semantic_type": "substance_matiere",
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

## テスト — `v_124`

### Fiche source `n5_v_124`

```json
{
 "id": "n5_v_124",
 "level": "N5",
 "word": "テスト",
 "word_furigana": "テスト",
 "reading": "てすと",
 "romaji": "tesuto",
 "meanings": {
  "primary": "Test",
  "secondary": [
   "Examen",
   "Interrogation écrite"
  ]
 },
 "nuance": "Mot en katakana issu de l'anglais 'test', désignant un examen scolaire ou une évaluation. Synonyme fréquent de <ruby>試験<rt>しけん</rt></ruby> (shiken).",
 "type": "nom",
 "group": "nom",
 "category": "ecole_apprentissage",
 "subcategory": "cours",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> 、<ruby>日本語<rt>にほんご</rt></ruby> の <ruby>テスト<rt>てすと</rt></ruby> が あります 。",
  "romaji": "ashita, nihongo no tesuto ga arimasu.",
  "french": "Demain, il y a un **test** de japonais.",
  "highlight": [
   "テスト",
   "tesuto"
  ]
 }
}
```

### Anciens exemples de `n5_v_124` (3)

```json
[
 {
  "japanese": "<ruby>来週<rt>らいしゅう</rt></ruby> <ruby>日本語<rt>にほんご</rt></ruby> の テスト が ある ので、<ruby>今週末<rt>こんしゅうまつ</rt></ruby> は たくさん <ruby>勉強<rt>べんきょう</rt></ruby>します",
  "romaji": "raishuu nihongo no tesuto ga aru node, konshuumatsu wa takusan benkyou shimasu.",
  "french": "Il y a un **test** de japonais la semaine prochaine, alors je vais beaucoup étudier ce week-end.",
  "highlight": [
   "テスト",
   "tesuto"
  ]
 },
 {
  "japanese": "先生 が テスト の <ruby>結果<rt>けっか</rt></ruby> を <ruby>配<rt>配</rt></ruby>りましたが、<ruby>点数<rt>てんすう</rt></ruby> が よくて <ruby>安心<rt>あんしん</rt></ruby>しました",
  "romaji": "sensei ga tesuto no kekka o配rimashita ga, tensuu ga yokute anshin shimashita.",
  "french": "Le professeur a distribué les résultats du **test**, et j'étais soulagé d'avoir de bonnes notes.",
  "highlight": [
   "テスト",
   "tesuto"
  ]
 },
 {
  "japanese": "<ruby>昨日<rt>きのう</rt></ruby> の 漢字 の テスト は とても <ruby>難<rt>むずか</rt></ruby>しかったです",
  "romaji": "kinou no kanji no tesuto wa totemo muzukashikatta desu.",
  "french": "Le **test** de kanji d'hier était très difficile.",
  "highlight": [
   "テスト",
   "tesuto"
  ]
 }
]
```

### ENTRY publiée `v_124`

```json
{
 "id": "v_124",
 "level": "N5",
 "word": "テスト",
 "writings": [],
 "readings": [
  {
   "kana": "てすと",
   "romaji": "tesuto",
   "furigana": "テスト",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Synonyme courant de 試験.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_124_s1",
   "meaning": {
    "primary": "Examen",
    "alternatives": [
     "Test",
     "Interrogation"
    ]
   },
   "category": {
    "level_1": "education_apprentissage",
    "level_2": "evaluation_scolaire",
    "level_3": "examens"
   },
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

## 答える — `v_174`

### Fiche source `n5_v_174`

```json
{
 "id": "n5_v_174",
 "level": "N5",
 "word": "答える",
 "word_furigana": "<ruby>答<rt>こた</rt></ruby>える",
 "reading": "こたえる",
 "romaji": "kotaeru",
 "meanings": {
  "primary": "Répondre",
  "secondary": [
   "Donner une réponse (à une question)"
  ]
 },
 "nuance": "Verbe ichidan désignant l'action de donner une réponse à une question ou à un problème. Attention à sa structure grammaticale : il exige l'utilisation de la particule に (ni) juste après l'élément auquel on répond (la question, la personne, etc.).",
 "type": "verbe ichidan",
 "group": "ru",
 "category": "communication",
 "subcategory": "conversation",
 "kanji_list": [
  "答"
 ],
 "particles": [
  "に"
 ],
 "example": {
  "japanese": "<ruby>先生<rt>せんせい</rt></ruby> の <ruby>質問<rt>しつもん</rt></ruby> に <ruby>日本語<rt>にほんご</rt></ruby> で <ruby>答<rt>こた</rt></ruby>えます 。",
  "romaji": "sensei no shitsumon ni nihongo de kotaemasu.",
  "french": "Je **réponds** à la question du professeur en japonais.",
  "highlight": [
   "答えます",
   "kotaemasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_174` (3)

```json
[
 {
  "japanese": "<ruby>先生<rt>せんせい</rt></ruby> から の <ruby>質問<rt>しつもん</rt></ruby> に、はっきりと **答** えて ください",
  "romaji": "sensei kara no shitsumon ni, hakkiri to kotaete kudasai.",
  "french": "Veuillez **répondre** clairement à la question du professeur.",
  "highlight": [
   "答える",
   "kotaeru"
  ]
 },
 {
  "japanese": "テスト の <ruby>問題<rt>もんだい</rt></ruby> が 難<rt>むずか</rt></ruby>しくて、どう **答** えたら いい か 迷いました",
  "romaji": "tesuto no mondai ga muzukashikute, dou kotaetara ii ka mayoimashita.",
  "french": "Les questions du test étaient difficiles et j'ai hésité sur la manière de **répondre**.",
  "highlight": [
   "答える",
   "kotaeru"
  ]
 },
 {
  "japanese": "アンケート の <ruby>質問<rt>しつもん</rt></ruby> に すべて **答** えた ので、スタッフ に <ruby>提出<rt>ていしゅつ</rt></ruby>しました",
  "romaji": "ankēto no shitsumon ni subete kotaeta node, sutaffu ni teishutsu shimashita.",
  "french": "Comme j'ai **répondu** à toutes les questions du questionnaire, je l'ai remis au personnel.",
  "highlight": [
   "答える",
   "kotaeru"
  ]
 }
]
```

### ENTRY publiée `v_174`

```json
{
 "id": "v_174",
 "level": "N5",
 "word": "答える",
 "writings": [],
 "readings": [
  {
   "kana": "こたえる",
   "romaji": "kotaeru",
   "furigana": "<ruby>答<rt>こた</rt></ruby>える",
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
 "nuance": "Avec に pour ce à quoi l'on répond : 質問に答える.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_174_s1",
   "meaning": {
    "primary": "Répondre",
    "alternatives": []
   },
   "category": {
    "level_1": "communication_langage",
    "level_2": "parole_conversation",
    "level_3": "reponse"
   },
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

## 聞く — `v_175`

### Fiche source `n5_v_175`

```json
{
 "id": "n5_v_175",
 "level": "N5",
 "word": "聞く",
 "word_furigana": "<ruby>聞<rt>き</rt></ruby>く",
 "reading": "きく",
 "romaji": "kiku",
 "meanings": {
  "primary": "Écouter",
  "secondary": [
   "Entendre",
   "Demander (une question ou une information)"
  ]
 },
 "nuance": "Verbe godan qui signifie à la fois 'écouter' et 'demander (une question)'. Attention : lorsqu'on pose une question à quelqu'un, cette personne doit toujours être suivie de la particule に (ni).",
 "type": "verbe godan",
 "group": "u",
 "category": "communication",
 "subcategory": "conversation",
 "kanji_list": [
  "聞"
 ],
 "particles": [
  "を",
  "に"
 ],
 "example": {
  "japanese": "<ruby>毎日<rt>まいにち</rt></ruby> <ruby>朝<rt>あさ</rt></ruby> ラジオ の <ruby>音楽<rt>おんがく</rt></persos> を **<ruby>聞<rt>き</rt></ruby>きます** 。",
  "romaji": "mainichi asa rajio no ongaku o kikimasu.",
  "french": "J'**écoute** de la musique à la radio tous les matins.",
  "highlight": [
   "聞きます",
   "kikimasu"
  ]
 }
}
```

### Anciens exemples de `n5_v_175` (3)

```json
[
 {
  "japanese": "<ruby>毎日<rt>まいにち</rt></ruby>、<ruby>通勤<rt>つうきん</rt></ruby> の <ruby>電車<rt>でんしゃ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> で <ruby>日本語<rt>にほんご</rt></ruby> の ラジオ を <ruby>聞<rt>き</rt></ruby>いて います",
  "romaji": "mainichi, tsuukin no densha no naka de nihongo no rajio o kiite imasu.",
  "french": "Tous les jours, j'**écoute** la radio en japonais dans le train pour aller au travail.",
  "highlight": [
   "聞く",
   "kiku"
  ]
 },
 {
  "japanese": "<ruby>先生<rt>せんせい</rt></ruby> の <ruby>話<rt>はなし</rt></ruby> を しっかり <ruby>聞<rt>き</rt></ruby>いて から、<ruby>問題<rt>もんだい</rt></ruby> を <ruby>解<rt>と</rt></ruby>いて ください",
  "romaji": "sensei no hanashi o shikkari kiite kara, mondai o toite kudasai.",
  "french": "Veuillez bien **écouter** l'explication du professeur avant de résoudre les problèmes.",
  "highlight": [
   "聞く",
   "kiku"
  ]
 },
 {
  "japanese": "<ruby>道<rt>みち</rt></ruby> が わからなかったので、<ruby>交番<rt>こうばん</rt></ruby> の おまわりさん に <ruby>道<rt>みち</rt></ruby> を <ruby>聞<rt>き</rt></ruby>きました",
  "romaji": "michi ga wakaranakatta node, kouban no omawarisan ni michi o kikimashita.",
  "french": "Comme je ne connaissais pas le chemin, j'ai **demandé** (écouté/interrogé) le policier au poste de police.",
  "highlight": [
   "聞く",
   "kiku"
  ]
 }
]
```

### ENTRY publiée `v_175`

```json
{
 "id": "v_175",
 "level": "N5",
 "word": "聞く",
 "writings": [],
 "readings": [
  {
   "kana": "きく",
   "romaji": "kiku",
   "furigana": "<ruby>聞<rt>き</rt></ruby>く",
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
   "id": "v_175_s1",
   "meaning": {
    "primary": "Écouter",
    "alternatives": [
     "Entendre"
    ]
   },
   "category": {
    "level_1": "etre_humain",
    "level_2": "sens_perception",
    "level_3": "ouie"
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
   "nuance": "音楽を聞く : écouter de la musique."
  },
  {
   "id": "v_175_s2",
   "meaning": {
    "primary": "Demander",
    "alternatives": [
     "Poser une question"
    ]
   },
   "category": {
    "level_1": "communication_langage",
    "level_2": "parole_conversation",
    "level_3": "question"
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
   "nuance": "La personne à qui l'on demande est suivie de に : 先生に聞く."
  }
 ]
}
```

## 交番 — `v_240`

### Fiche source `n5_v_240`

```json
{
 "id": "n5_v_240",
 "level": "N5",
 "word": "交番",
 "word_furigana": "<ruby>交<rt>こう</rt></ruby><ruby>番<rt>ばん</rt></ruby>",
 "reading": "こうばん",
 "romaji": "kouban",
 "meanings": {
  "primary": "Poste de police",
  "secondary": [
   "Commissariat de quartier (Japon)",
   "Ilot de police"
  ]
 },
 "nuance": "Nom composé de <ruby>交<rt>こう</rt></ruby> (alternance/roulement) et <ruby>番<rt>ばん</rt></ruby> (garde/poste), faisant référence au système de service posté des officiers dans ces petits postes de quartier japonais. Compteur spécifique : <ruby>箇<rt>か</rt></ruby><ruby>所<rt>しょ</rt></ruby> (kasho) ou <ruby>軒<rt>けん</rt></ruby> (ken).",
 "type": "nom",
 "group": "nom",
 "category": "maison_quotidien",
 "subcategory": "batiments",
 "kanji_list": [
  "交",
  "番"
 ],
 "particles": [],
 "example": {
  "japanese": "<ruby>道<rt>みち</rt></ruby> が わからない ので 、**<ruby>交番<rt>こうばん</rt></ruby>** で <ruby>聞<rt>き</rt></ruby>きます 。",
  "romaji": "michi ga wakaranai node, kouban de kikimasu.",
  "french": "Comme je ne connais pas le chemin, je demande au **poste de police**.",
  "highlight": [
   "交番",
   "kouban"
  ]
 }
}
```

### Anciens exemples de `n5_v_240` (3)

```json
[
 {
  "japanese": "<ruby>道<rt>みち</rt></ruby> が わからなくなった ので、<ruby>近<rt>ちか</rt></ruby>く の <ruby>交番<rt>こうばん</rt></ruby> で <ruby>警察官<rt>けいさつかん</rt></ruby> に <ruby>尋<rt>たず</rt></ruby>ねました",
  "romaji": "michi ga wakaranaku natta node, chikaku no kouban de keisatsukan ni tazunemashita.",
  "french": "Comme je ne connaissais plus le chemin, j'ai demandé à un policier au **poste de police** (koban) le plus proche.",
  "highlight": [
   "交番",
   "kouban"
  ]
 },
 {
  "japanese": "<ruby>財布<rt>さいふ</rt></ruby> を <ruby>落<rt>お</rt></ruby>として しまった ので、<ruby>交番<rt>こうばん</rt></ruby> に <ruby>届<rt>とど</rt></ruby>けを <ruby>出<rt>だ</rt></ruby>しに 行きました",
  "romaji": "saifu o otoshite shimatta node, kouban ni todoke o dashi ni ikimashita.",
  "french": "J'ai perdu mon portefeuille, alors je suis allé au **poste de police** pour faire une déclaration.",
  "highlight": [
   "交番",
   "kouban"
  ]
 },
 {
  "japanese": "<ruby>駅前<rt>えきまえ</rt></ruby> の <ruby>交番<rt>こうばん</rt></ruby> の <ruby>横<rt>よこ</rt></ruby> で <ruby>友達<rt>ともだち</rt></ruby> と <ruby>待<rt>ま</rt></ruby>ち<ruby>合<rt>あ</rt></ruby>わせを しています",
  "romaji": "ekimae no kouban no yoko de tomodachi to machiawase o shite imasu.",
  "french": "Je donne rendez-vous à un ami à côté du **poste de police** devant la gare.",
  "highlight": [
   "交番",
   "kouban"
  ]
 }
]
```

### ENTRY publiée `v_240`

```json
{
 "id": "v_240",
 "level": "N5",
 "word": "交番",
 "writings": [],
 "readings": [
  {
   "kana": "こうばん",
   "romaji": "kouban",
   "furigana": "<ruby>交<rt>こう</rt></ruby><ruby>番<rt>ばん</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Le petit poste de police de quartier japonais, où l'on demande aussi son chemin ; le policier s'y appelle お巡りさん.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_240_s1",
   "meaning": {
    "primary": "Poste de police",
    "alternatives": []
   },
   "category": {
    "level_1": "droit_justice",
    "level_2": "application_de_la_loi",
    "level_3": "police"
   },
   "semantic_type": "lieu",
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

## 国 — `v_243`

### Fiche source `n5_v_243`

```json
{
 "id": "n5_v_243",
 "level": "N5",
 "word": "国",
 "word_furigana": "<ruby>国<rt>くに</rt></ruby>",
 "reading": "くに",
 "romaji": "kuni",
 "meanings": {
  "primary": "Pays",
  "secondary": [
   "Patrie",
   "Nation",
   "Région d'origine"
  ]
 },
 "nuance": "Nom désignant un pays, une nation ou la région natale d'une personne. Compteur spécifique : <ruby>個<rt>こ</rt></ruby> (ko) ou <ruby>か国<rt>かこく</rt></ruby> (kakoku).",
 "type": "nom",
 "group": "nom",
 "category": "maison_quotidien",
 "subcategory": "ville",
 "kanji_list": [
  "国"
 ],
 "particles": [],
 "example": {
  "japanese": "らいげつ 、わたし の **<ruby>国<rt>くに</rt></ruby>** へ かえります 。",
  "romaji": "raigetsu, watashi no kuni e kaerimasu.",
  "french": "Le mois prochain, je retourne dans mon **pays**.",
  "highlight": [
   "国",
   "kuni"
  ]
 }
}
```

### Anciens exemples de `n5_v_243` (3)

```json
[
 {
  "japanese": "いつか <ruby>別<rt>べつ</rt></ruby> の <ruby>国<rt>くに</rt></ruby> に <ruby>旅行<rt>りょこう</rt></ruby> に <ruby>行<rt>い</rt></ruby>って、いろいろな <ruby>文化<rt>ぶんか</rt></ruby> を <ruby>体験<rt>たいけん</rt></ruby>したい です",
  "romaji": "itsuka betsu no kuni ni ryokou ni itte, iroirona bunka o taiken shitai desu.",
  "french": "J'aimerais un jour voyager dans un autre **pays** et faire l'expérience de différentes cultures.",
  "highlight": [
   "国",
   "kuni"
  ]
 },
 {
  "japanese": "<ruby>外国<rt>がいこく</rt></ruby> の <ruby>国<rt>くに</rt></ruby> から <ruby>来<rt>き</rt></ruby>た <ruby>友達<rt>ともだち</rt></ruby> と <ruby>一緒<rt>いっしょ</rt></ruby>に <ruby>日本<rt>にほん</rt></ruby> の <ruby>料理<rt>りょうり</rt></ruby> を <ruby>食<rt>た</rt></ruby>べました",
  "romaji": "gaikoku no kuni kara kita tomodachi to issho ni nihon no ryouri o tabemashita.",
  "french": "J'ai mangé de la cuisine japonaise avec un ami venu d'un **pays** étranger.",
  "highlight": [
   "国",
   "kuni"
  ]
 },
 {
  "japanese": "<ruby>私<rt>わたし</rt></ruby> の <ruby>国<rt>くに</rt></ruby> では、1 <ruby>年<rt>ねん</rt></ruby> を <ruby>通<rt>とお</rt></ruby>して とても <ruby>温<rt>あたた</rt></ruby>かい <ruby>気候<rt>きこう</rt></ruby> が <ruby>続<rt>つづ</rt></ruby>きます",
  "romaji": "watashi no kuni de wa, ichinen o toushite totemo atatakai kikou ga tsuzukimasu.",
  "french": "Dans mon **pays**, un climat très doux se maintient tout au long de l'année.",
  "highlight": [
   "国",
   "kuni"
  ]
 }
]
```

### ENTRY publiée `v_243`

```json
{
 "id": "v_243",
 "level": "N5",
 "word": "国",
 "writings": [],
 "readings": [
  {
   "kana": "くに",
   "romaji": "kuni",
   "furigana": "<ruby>国<rt>くに</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Désigne aussi le pays ou la région d'origine de quelqu'un : 国に帰る, rentrer au pays ; お国はどちらですか, d'où venez-vous ?",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_243_s1",
   "meaning": {
    "primary": "Pays",
    "alternatives": [
     "Nation"
    ]
   },
   "category": {
    "level_1": "territoires_lieux_geographiques",
    "level_2": "pays_territoires",
    "level_3": "pays"
   },
   "semantic_type": "lieu",
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

## 天気 — `v_269`

### Fiche source `n5_v_269`

```json
{
 "id": "n5_v_269",
 "level": "N5",
 "word": "天気",
 "word_furigana": "<ruby>天<rt>てん</rt></ruby><ruby>気<rt>き</rt></ruby>",
 "reading": "てんき",
 "romaji": "tenki",
 "meanings": {
  "primary": "Météo",
  "secondary": [
   "Temps (qu'il fait)",
   "Climat"
  ]
 },
 "nuance": "Nom composé de <ruby>天<rt>てん</rt></ruby> (ciel) et de <ruby>気<rt>き</rt></ruby> (esprit/atmosphère), désignant les conditions atmosphériques ou le beau temps (souvent abrégé pour signifier qu'il fait beau).",
 "type": "nom",
 "group": "nom",
 "category": "meteo_saisons",
 "subcategory": "meteo",
 "kanji_list": [
  "天",
  "気"
 ],
 "particles": [],
 "example": {
  "japanese": "きょう は **<ruby>天気<rt>てんき</rt></ruby>** が とても いい です 。",
  "romaji": "kyou wa tenki ga totemo ii desu.",
  "french": "La **météo** est très bonne aujourd'hui (il fait très beau).",
  "highlight": [
   "天気",
   "tenki"
  ]
 }
}
```

### Anciens exemples de `n5_v_269` (3)

```json
[
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> の <ruby>天気<rt>てんき</rt></ruby> は <ruby>晴<rt>は</rt></ruby>れ なので、ピクニック に <ruby>行<rt>い</rt></ruby>く の が とても <ruby>楽<rt>たの</rt></ruby>しみ です",
  "romaji": "ashita no tenki wa hare nanode, pikunikku ni iku no ga totemo tanoshimi desu.",
  "french": "La **météo** de demain étant au beau fixe, j'ai hâte d'aller faire un pique-nique.",
  "highlight": [
   "天気",
   "tenki"
  ]
 },
 {
  "japanese": "<ruby>毎朝<rt>まいあさ</rt></ruby>、テレビ で <ruby>天気予報<rt>てんきよほう</rt></ruby> を <ruby>見<rt>み</rt></ruby>て から <ruby>外出<rt>がいしゅつ</rt></ruby> する の が <ruby>習慣<rt>しゅうかん</rt></ruby> です",
  "romaji": "maiasa, terebi de tenkiyohou o mite kara gaishutsu suru no ga shuukan desu.",
  "french": "C'est une habitude de regarder les prévisions **météo** à la télévision chaque matin avant de sortir.",
  "highlight": [
   "天気",
   "tenki"
  ]
 },
 {
  "japanese": "<ruby>山<rt>やま</rt></ruby> の <ruby>天気<rt>てんき</rt></ruby> は <ruby>変<rt>か</rt></ruby>わりやすい ので、<ruby>雨具<rt>あまぐ</rt></ruby> を <ruby>持<rt>も</rt></ruby>って <ruby>行<rt>い</rt></ruby>った <ruby>方<rt>ほう</rt></ruby> が いい です",
  "romaji": "yama no tenki wa kawariyasui node, amagu o motte itta hou ga ii desu.",
  "french": "La **météo** en montagne change facilement, il vaut mieux emporter des vêtements de pluie.",
  "highlight": [
   "天気",
   "tenki"
  ]
 }
]
```

### ENTRY publiée `v_269`

```json
{
 "id": "v_269",
 "level": "N5",
 "word": "天気",
 "writings": [],
 "readings": [
  {
   "kana": "てんき",
   "romaji": "tenki",
   "furigana": "<ruby>天<rt>てん</rt></ruby><ruby>気<rt>き</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Les conditions atmosphériques ; seul, il désigne souvent le beau temps : いい天気ですね, il fait beau.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_269_s1",
   "meaning": {
    "primary": "Temps (qu'il fait)",
    "alternatives": [
     "Météo"
    ]
   },
   "category": {
    "level_1": "monde_naturel",
    "level_2": "meteo",
    "level_3": "conditions_atmospheriques"
   },
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

## そこ — `v_392`

### Fiche source `n5_v_392`

```json
{
 "id": "n5_v_392",
 "level": "N5",
 "word": "そこ",
 "word_furigana": "そこ",
 "reading": "そこ",
 "romaji": "soko",
 "meanings": {
  "primary": "Là",
  "secondary": [
   "Cet endroit",
   "Là-bas (près de la personne à qui l'on parle)"
  ]
 },
 "nuance": "**Pronom démonstratif** de lieu (série ko-so-a-do) désignant un endroit proche de l'interlocuteur ou le lieu dont on vient de parler. Les romajis associés sont (*soko*).",
 "type": "pronom",
 "group": "nom",
 "category": "pronoms_demonstratifs",
 "subcategory": "demonstratifs_lieux",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "**そこ** に ほう を おいて ください 。",
  "romaji": "soko ni hon o oite kudasai.",
  "french": "Veuillez poser le livre **là** (près de vous).",
  "highlight": [
   "そこ",
   "soko"
  ]
 }
}
```

### Anciens exemples de `n5_v_392` (3)

```json
[
 {
  "japanese": "そこ に ある ペン を <ruby>取<rt>と</rt></ruby>って ください",
  "romaji": "soko ni aru pen o totte kudasai.",
  "french": "Veuillez prendre le stylo qui est **là**.",
  "highlight": [
   "そこ",
   "soko"
  ]
 },
 {
  "japanese": "<ruby>傘<rt>かさ</rt></ruby> は どこ ですか。「そこ に ありますよ」",
  "romaji": "kasa wa doko desu ka. 'soko ni arimasu yo.'",
  "french": "Où est le **parapluie** ? « Il est là. »",
  "highlight": [
   "そこ",
   "soko"
  ]
 },
 {
  "japanese": "<ruby>会議<rt>かいぎ</rt></ruby> は あそこの <ruby>部屋<rt>へや</rt></ruby> ですか。「いいえ、そこ の <ruby>部屋<rt>へや</rt></ruby> です」",
  "romaji": "kaigi wa asoko no heya desu ka. 'iie, soko no heya desu.'",
  "french": "La **réunion** se fait-elle dans cette pièce là-bas ? « Non, c'est dans cette pièce-là. »",
  "highlight": [
   "そこ",
   "soko"
  ]
 }
]
```

### ENTRY publiée `v_392`

```json
{
 "id": "v_392",
 "level": "N5",
 "word": "そこ",
 "writings": [],
 "readings": [
  {
   "kana": "そこ",
   "romaji": "soko",
   "furigana": "そこ",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "pronom",
  "group": null,
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_392_s1",
   "meaning": {
    "primary": "Là",
    "alternatives": []
   },
   "category": {
    "level_1": "espace_proprietes_spatiales",
    "level_2": "position_localisation"
   },
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "deictique"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Un endroit proche de l'interlocuteur, ou dont on vient de parler."
  }
 ]
}
```

## そっち — `v_414`

### Fiche source `n5_v_414`

```json
{
 "id": "n5_v_414",
 "level": "N5",
 "word": "そっち",
 "word_furigana": "そっち",
 "reading": "そっち",
 "romaji": "sochi",
 "meanings": {
  "primary": "Par là",
  "secondary": [
   "De ce côté-là (près de l'interlocuteur)",
   "Ton côté / ton camp"
  ]
 },
 "nuance": "**Pronom démonstratif** de lieu ou de direction familier et décontracté (variante familière de * sochira* <ruby>そちら</ruby>) désignant un endroit proche de l'interlocuteur ou le camp de ce dernier. Les romajis associés sont (*sochi*).",
 "type": "pronom",
 "group": "nom",
 "category": "pronoms_demonstratifs",
 "subcategory": "demonstratifs_direction",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "**そっち** の てんき は どう です か 。",
  "romaji": "sochi no tenki wa dou desu ka.",
  "french": "Quel temps fait-il **chez vous / par là-bas** ?",
  "highlight": [
   "そっち",
   "sochi"
  ]
 }
}
```

### Anciens exemples de `n5_v_414` (3)

```json
[
 {
  "japanese": "そっち に は <ruby>何<rt>なに</rt></ruby> が ありますか",
  "romaji": "socchi ni wa nani ga arimasu ka.",
  "french": "Qu'y a-t-il **par là** ?",
  "highlight": [
   "そっち",
   "sochi"
  ]
 },
 {
  "japanese": "カバン は そっち に <ruby>置<rt>お</rt></ruby>いて ください",
  "romaji": "kaban wa socchi ni oite kudasai.",
  "french": "Veuillez poser le sac **par là**.",
  "highlight": [
   "そっち",
   "sochi"
  ]
 },
 {
  "japanese": "こっち より そっち の <ruby>方<rt>ほう</rt></ruby> が <ruby>静<rt>しず</rt></ruby>か です",
  "romaji": "kocchi yori socchi no hou ga shizuka desu.",
  "french": "C'est plus calme **par là** qu'ici.",
  "highlight": [
   "そっち",
   "sochi"
  ]
 }
]
```

### ENTRY publiée `v_414`

```json
{
 "id": "v_414",
 "level": "N5",
 "word": "そっち",
 "writings": [],
 "readings": [
  {
   "kana": "そっち",
   "romaji": "sochi",
   "furigana": "そっち",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "pronom",
  "group": null,
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_414_s1",
   "meaning": {
    "primary": "Par là",
    "alternatives": [
     "Ce côté-là"
    ]
   },
   "category": {
    "level_1": "espace_proprietes_spatiales",
    "level_2": "direction_orientation",
    "level_3": "orientation"
   },
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "deictique"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Familier ; plus poli : そちら."
  },
  {
   "id": "v_414_s2",
   "meaning": {
    "primary": "Toi, ton camp",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "deictique"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "そっちはどう？ : et de ton côté ?"
  }
 ]
}
```

## 好き — `v_444`

### Fiche source `n5_v_444`

```json
{
 "id": "n5_v_444",
 "level": "N5",
 "word": "好き",
 "word_furigana": "<ruby>好<rt>す</rt></ruby>き",
 "reading": "すき",
 "romaji": "suki",
 "meanings": {
  "primary": "Aimé",
  "secondary": [
   "Préféré",
   "Que l'on aime",
   "Favori"
  ]
 },
 "nuance": "**Adjectif en na** (et nom) exprimant l'affection ou la préférence pour quelqu'un ou quelque chose (généralement suivi de la particule *ga* pour l'objet aimé).",
 "type": "adjectif en na",
 "group": "na",
 "category": "descriptions_qualites",
 "subcategory": "sentiment",
 "kanji_list": [
  "好"
 ],
 "particles": [],
 "example": {
  "japanese": "私 は りんご が **<ruby>好<rt>す</rt></ruby>き** です 。",
  "romaji": "watashi wa ringo ga suki desu.",
  "french": "J' **aime** les pommes (les pommes me sont **préférées**).",
  "highlight": [
   "好き",
   "suki"
  ]
 }
}
```

### Anciens exemples de `n5_v_444` (3)

```json
[
 {
  "japanese": "<ruby>私<rt>わたし</rt></ruby> は <ruby>日本<rt>にほん</rt></ruby> の <ruby>料理<rt>りょうり</rt></ruby> が <ruby>好<rt>す</rt></ruby>き です",
  "romaji": "watashi wa nihon no ryouri ga suki desu.",
  "french": "J'**aime** la cuisine japonaise.",
  "highlight": [
   "好き",
   "suki"
  ]
 },
 {
  "japanese": "「<ruby>猫<rt>ねこ</rt></ruby> と <ruby>犬<rt>いぬ</rt></ruby> と どちら が <ruby>好<rt>す</rt></ruby>きですか」「<ruby>猫<rt>ねこ</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> が <ruby>好<rt>す</rt></ruby>き です」",
  "romaji": "'neko to inu to dochira ga suki desu ka' 'neko no hou ga suki desu.'",
  "french": "« Entre les chats et les chiens, qu'est-ce que tu **préfères** ? » « Je **préfère** les chats. »",
  "highlight": [
   "好き",
   "suki"
  ]
 },
 {
  "japanese": "<ruby>彼女<rt>かのじょ</rt></ruby> は <ruby>音楽<rt>おんがく</rt></ruby> を <ruby>聴<rt>き</rt></ruby>く こと が <ruby>好<rt>す</rt></ruby>き です",
  "romaji": "kanojo wa ongaku o kiku koto ga suki desu.",
  "french": "Elle **aime** écouter de la musique.",
  "highlight": [
   "好き",
   "suki"
  ]
 }
]
```

### ENTRY publiée `v_444`

```json
{
 "id": "v_444",
 "level": "N5",
 "word": "好き",
 "writings": [],
 "readings": [
  {
   "kana": "すき",
   "romaji": "suki",
   "furigana": "<ruby>好<rt>す</rt></ruby>き",
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
 "nuance": "Ce qu'on aime est marqué par が, avant 好き : りんごが好きです (j'aime les pommes).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_444_s1",
   "meaning": {
    "primary": "Aimer",
    "alternatives": [
     "Aimé",
     "Préféré"
    ]
   },
   "category": {
    "level_1": "etre_humain",
    "level_2": "psychologie_esprit",
    "level_3": "preferences"
   },
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

## 痛い — `v_465`

### Fiche source `n5_v_465`

```json
{
 "id": "n5_v_465",
 "level": "N5",
 "word": "痛い",
 "word_furigana": "<ruby>痛<rt>いた</rt></ruby>い",
 "reading": "いたい",
 "romaji": "itai",
 "meanings": {
  "primary": "Douloureux",
  "secondary": [
   "Qui fait mal",
   "Aïe !"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant une douleur physique (blessure, mal de tête, etc.) ou utilisé comme interjection pour exprimer une douleur soudaine (« Aïe ! »).",
 "type": "adjectif en i",
 "group": "i",
 "category": "corps_sante",
 "subcategory": "etat_sante",
 "kanji_list": [
  "痛"
 ],
 "particles": [],
 "example": {
  "japanese": "あたま が **<ruby>痛<rt>いた</rt></ruby>い** です 。",
  "romaji": "atama ga itai desu.",
  "french": "J'ai mal à la tête (c'est **douloureux**).",
  "highlight": [
   "痛い",
   "itai"
  ]
 }
}
```

### Anciens exemples de `n5_v_465` (3)

```json
[
 {
  "japanese": "お<ruby>腹<rt>なか</rt></ruby> が <ruby>痛<rt>いた</rt></ruby>い です",
  "romaji": "onaka ga itai desu.",
  "french": "J'ai **mal** au ventre / Le ventre est **douloureux**.",
  "highlight": [
   "痛い",
   "itai"
  ]
 },
 {
  "japanese": "<ruby>頭<rt>あたま</rt></ruby> が <ruby>痛<rt>いた</rt></ruby>くて、<ruby>仕事<rt>しごと</rt></ruby> が できません",
  "romaji": "atama ga itaくて, shigoto ga dekimasen.",
  "french": "J'ai **mal** à la tête, je ne peux pas travailler.",
  "highlight": [
   "痛い",
   "itai"
  ]
 },
 {
  "japanese": "スポーツ で <ruby>足<rt>あし</rt></ruby> が <ruby>痛<rt>いた</rt></ruby>くなりました",
  "romaji": "supotsu de ashi ga itakunarimashita.",
  "french": "J'ai eu **mal** aux jambes à cause du sport.",
  "highlight": [
   "痛い",
   "itai"
  ]
 }
]
```

### ENTRY publiée `v_465`

```json
{
 "id": "v_465",
 "level": "N5",
 "word": "痛い",
 "writings": [],
 "readings": [
  {
   "kana": "いたい",
   "romaji": "itai",
   "furigana": "<ruby>痛<rt>いた</rt></ruby>い",
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
 "nuance": "頭が痛い : avoir mal à la tête. S'emploie seul comme exclamation : 痛い！ (aïe !).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_465_s1",
   "meaning": {
    "primary": "Douloureux",
    "alternatives": [
     "Qui fait mal"
    ]
   },
   "category": {
    "level_1": "sante_medecine",
    "level_2": "symptomes_douleur",
    "level_3": "douleur"
   },
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

## 難しい — `v_486`

### Fiche source `n5_v_486`

```json
{
 "id": "n5_v_486",
 "level": "N5",
 "word": "難しい",
 "word_furigana": "<ruby>難<rt>むずか</rt></ruby>しい",
 "reading": "むずかしい",
 "romaji": "muzukashii",
 "meanings": {
  "primary": "Difficile",
  "secondary": [
   "Compliqué",
   "Ardu",
   "Problématique"
  ]
 },
 "nuance": "**Adjectif en i** qualifiant une tâche, une question ou une situation qui demande beaucoup d'effort ou de réflexion pour être résolue ou comprise (antonyme de *yasashii*).",
 "type": "adjectif en i",
 "group": "i",
 "category": "descriptions_qualites",
 "subcategory": "competence",
 "kanji_list": [
  "難"
 ],
 "particles": [],
 "example": {
  "japanese": "この もんだい は **<ruby>難<rt>むずか</rt></ruby>しい** です 。",
  "romaji": "kono mondai wa muzukashii desu.",
  "french": "Ce problème est **difficile**.",
  "highlight": [
   "難しい",
   "muzukashii"
  ]
 }
}
```

### Anciens exemples de `n5_v_486` (3)

```json
[
 {
  "japanese": "この <ruby>漢字<rt>かんじ</rt></ruby> は とても <ruby>難<rt>むずか</rt></ruby>しい です",
  "romaji": "kono kanji wa totemo muzukashii desu.",
  "french": "Ce kanji est très **difficile**.",
  "highlight": [
   "難しい",
   "muzukashii"
  ]
 },
 {
  "japanese": "その <ruby>問題<rt>もんだい</rt></ruby> は <ruby>難<rt>むずか</rt></ruby>しくて、すぐ <ruby>解<rt>と</rt></ruby>けません",
  "romaji": "sono mondai wa muzukashikute, sugu tokemasen.",
  "french": "Ce problème est **difficile**, je ne peux pas le résoudre tout de suite.",
  "highlight": [
   "難しい",
   "muzukashii"
  ]
 },
 {
  "japanese": "<ruby>外国語<rt>がいこくご</rt></ruby> を <ruby>話<rt>はな</rt></ruby>す の は <ruby>難<rt>むずか</rt></ruby>しい です が <ruby>楽<rt>たの</rt></ruby>しい です",
  "romaji": "gaikokugo o hanasu no wa muzukashii desu ga tanoshii desu.",
  "french": "Parler une langue étrangère est **difficile** mais amusant.",
  "highlight": [
   "難しい",
   "muzukashii"
  ]
 }
]
```

### ENTRY publiée `v_486`

```json
{
 "id": "v_486",
 "level": "N5",
 "word": "難しい",
 "writings": [],
 "readings": [
  {
   "kana": "むずかしい",
   "romaji": "muzukashii",
   "furigana": "<ruby>難<rt>むずか</rt></ruby>しい",
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
 "nuance": "Une tâche, une question ou une situation qui demande de l'effort ou de la réflexion. Contraire : 易しい.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_486_s1",
   "meaning": {
    "primary": "Difficile",
    "alternatives": [
     "Compliqué"
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
   }
  }
 ]
}
```

## もう一度 — `v_503`

### Fiche source `n5_v_503`

```json
{
 "id": "n5_v_503",
 "level": "N5",
 "word": "もう一度",
 "word_furigana": "もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></getKey></ruby>",
 "reading": "もういちど",
 "romaji": "mouichido",
 "meanings": {
  "primary": "Encore une fois",
  "secondary": [
   "Une autre fois",
   "De nouveau"
  ]
 },
 "nuance": "**Expression adverbiale** composée de *mou* (encore/un de plus) et *ichido* (une fois), servant à demander la répétition d'une action (« répétez s'il vous plaît »).",
 "type": "adverbe",
 "group": "adverbe",
 "category": "adverbes_expressions",
 "subcategory": "frequence",
 "kanji_list": [
  "一",
  "度"
 ],
 "particles": [],
 "example": {
  "japanese": "**もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></ruby>** おねがいします 。",
  "romaji": "mouichido onegaishimasu.",
  "french": "**Encore une fois**, s'il vous plaît.",
  "highlight": [
   "もう一度",
   "mouichido"
  ]
 }
}
```

### Anciens exemples de `n5_v_503` (3)

```json
[
 {
  "japanese": "すみません、もう<ruby>一度<rt>いちど</rt></ruby> <ruby>言<rt>い</rt></ruby>ってください",
  "romaji": "sumimasen, mou ichido itte kudasai.",
  "french": "Excusez-moi, veuillez le dire **encore une fois**.",
  "highlight": [
   "もう一度",
   "mouichido"
  ]
 },
 {
  "japanese": "この <ruby>映画<rt>えいが</rt></ruby> は もう<ruby>一度<rt>いちど</rt></ruby> <ruby>見<rt>み</rt></ruby>たい です",
  "romaji": "kono eiga wa mou ichido mitai desu.",
  "french": "Je voudrais revoir ce film **encore une fois**.",
  "highlight": [
   "もう一度",
   "mouichido"
  ]
 },
 {
  "japanese": "<ruby>失敗<rt>しっぱい</rt></ruby> しても、もう<ruby>一度<rt>いちど</rt></ruby> <ruby>挑戦<rt>ちょうせん</rt></ruby> します",
  "romaji": "shippai shite mo, mou ichido chousen shimasu.",
  "french": "Même si j'échoue, je tenterai ma chance **encore une fois**.",
  "highlight": [
   "もう一度",
   "mouichido"
  ]
 }
]
```

### ENTRY publiée `v_503`

```json
{
 "id": "v_503",
 "level": "N5",
 "word": "もう一度",
 "writings": [],
 "readings": [
  {
   "kana": "もういちど",
   "romaji": "mouichido",
   "furigana": "もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adverbe",
  "group": null,
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Une fois de plus ; sert notamment à demander qu'on répète : もう一度おねがいします (encore une fois, s'il vous plaît). Composé de もう (encore, un de plus) et de 一度 (une fois).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_503_s1",
   "meaning": {
    "primary": "Encore une fois",
    "alternatives": [
     "Une autre fois",
     "De nouveau"
    ]
   },
   "category": null,
   "semantic_type": "concept_abstrait",
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

## 本当 — `v_510`

### Fiche source `n5_v_510`

```json
{
 "id": "n5_v_510",
 "level": "N5",
 "word": "本当",
 "word_furigana": "<ruby>本<rt>ほん</rt></ruby><ruby>当<rt>とう</rt></ruby>",
 "reading": "ほんとう",
 "romaji": "hontou",
 "meanings": {
  "primary": "Vérité",
  "secondary": [
   "Réalité",
   "Vrai",
   "Sérieux"
  ]
 },
 "nuance": "**Nom** (souvent utilisé comme adverbe ou adjectif en na) désignant ce qui est réel, authentique ou vrai, employé fréquemment pour marquer l'etonnement (« vraiment ? »).",
 "type": "nom",
 "group": "nom",
 "category": "abstrait",
 "subcategory": "verite",
 "kanji_list": [
  "本",
  "当"
 ],
 "particles": [],
 "example": {
  "japanese": "それ は **<ruby>本<rt>ほん</rt></ruby><ruby>当<rt>とう</rt></ruby>** です か 。",
  "romaji": "sore wa hontou desu ka.",
  "french": "Est-ce **vrai** ?",
  "highlight": [
   "本当",
   "hontou"
  ]
 }
}
```

### Anciens exemples de `n5_v_510` (3)

```json
[
 {
  "japanese": "それ は ほんとう の <ruby>話<rt>はなし</rt></ruby> ですか",
  "romaji": "sore wa hontou no hanashi desu ka.",
  "french": "Est-ce une **vraie** histoire ?",
  "highlight": [
   "ほんとう",
   "hontou"
  ]
 },
 {
  "japanese": "「ほんとう に ありがとう」「どういたしまして」",
  "romaji": "'hontou ni arigatou' 'douitashimashite.'",
  "french": "« Merci **vraiment** (**sincèrement**). » « De rien. »",
  "highlight": [
   "ほんとう",
   "hontou"
  ]
 },
 {
  "japanese": "<ruby>彼<rt>かれ</rt></ruby> は ほんとう の こと を <ruby>言<rt>い</rt></ruby>いませんでした",
  "romaji": "kare wa hontou no koto o iimasendeshita.",
  "french": "Il n'a pas dit la **vérité**.",
  "highlight": [
   "ほんとう",
   "hontou"
  ]
 }
]
```

### Fiche source `n5_v_514` (fusionnée vers `v_510`)

```json
{
 "id": "n5_v_514",
 "level": "N5",
 "word": "本当",
 "word_furigana": "<ruby>本<rt>ほん</rt></ruby><ruby>当<rt>とう</rt></ruby>",
 "reading": "ほんとう",
 "romaji": "hontou",
 "meanings": {
  "primary": "Vérité",
  "secondary": [
   "Réalité",
   "Vrai",
   "Sérieux"
  ]
 },
 "nuance": "**Nom** (souvent utilisé comme adverbe ou adjectif en na) désignant ce qui est réel, authentique ou vrai, employé fréquemment pour marquer l'étonnement ou confirmer la véracité d'un fait.",
 "type": "nom",
 "group": "nom",
 "category": "abstrait",
 "subcategory": "verite",
 "kanji_list": [
  "本",
  "当"
 ],
 "particles": [],
 "example": {
  "japanese": "それは **<ruby>本<rt>ほん</rt></ruby><ruby>当<rt>とう</rt></ruby>** の はなし です か 。",
  "romaji": "sore wa hontou no hanashi desu ka.",
  "french": "Est-ce une histoire **vraie** ?",
  "highlight": [
   "本当",
   "hontou"
  ]
 }
}
```

### Anciens exemples de `n5_v_514` (3)

```json
[
 {
  "japanese": "それ は <ruby>本当<rt>ほんとう</rt></ruby> の <ruby>話<rt>はなし</rt></ruby> ですか",
  "romaji": "sore wa hontou no hanashi desu ka.",
  "french": "Est-ce une **vraie** histoire ? / Est-ce vrai ?",
  "highlight": [
   "本当",
   "hontou"
  ]
 },
 {
  "japanese": "<ruby>本当<rt>ほんとう</rt></ruby> に ありがとうございます",
  "romaji": "hontou ni arigatou gozaimasu.",
  "french": "Merci **vraiment** (**sincèrement**).",
  "highlight": [
   "本当",
   "hontou"
  ]
 },
 {
  "japanese": "<ruby>彼<rt>かれ</rt></ruby> は <ruby>本当<rt>ほんとう</rt></ruby> の こと を <ruby>言<rt>い</rt></ruby>いませんでした",
  "romaji": "kare wa hontou no koto o iimasendeshita.",
  "french": "Il n'a pas dit la **vérité**.",
  "highlight": [
   "本当",
   "hontou"
  ]
 }
]
```

### ENTRY publiée `v_510`

```json
{
 "id": "v_510",
 "level": "N5",
 "word": "本当",
 "writings": [],
 "readings": [
  {
   "kana": "ほんとう",
   "romaji": "hontou",
   "furigana": "<ruby>本<rt>ほん</rt></ruby><ruby>当<rt>とう</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "S'emploie souvent comme adverbe (本当に, vraiment) ou pour marquer l'étonnement (本当？, vraiment ?).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_510_s1",
   "meaning": {
    "primary": "Vérité",
    "alternatives": [
     "Réalité",
     "Vrai"
    ]
   },
   "category": null,
   "semantic_type": "concept_abstrait",
   "dimensions": [
    {
     "axis": "vrai_faux",
     "pole": "vrai"
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

## 問題 — `v_511`

### Fiche source `n5_v_511`

```json
{
 "id": "n5_v_511",
 "level": "N5",
 "word": "問題",
 "word_furigana": "<ruby>問<rt>もん</rt></ruby><ruby>題<rt>だい</rt></ruby>",
 "reading": "もんだい",
 "romaji": "mondai",
 "meanings": {
  "primary": "Problème",
  "secondary": [
   "Question (d'examen)",
   "Sujet de discussion",
   "Affaire"
  ]
 },
 "nuance": "**Nom** désignant une question à résoudre (comme dans un test scolaire) ou un problème / différend qui pose une difficulté dans une situation.",
 "type": "nom",
 "group": "nom",
 "category": "abstrait",
 "subcategory": "concept",
 "kanji_list": [
  "問",
  "題"
 ],
 "particles": [],
 "example": {
  "japanese": "この しけん の **<ruby>問<rt>もん</rt></ruby><ruby>題<rt>だい</rt></ruby>** は むずかしい です 。",
  "romaji": "kono shiken no mondai wa muzukashii desu.",
  "french": "Les **problèmes** de cet examen sont difficiles.",
  "highlight": [
   "問題",
   "mondai"
  ]
 }
}
```

### Anciens exemples de `n5_v_511` (3)

```json
[
 {
  "japanese": "この <ruby>問題<rt>もんだい</rt></ruby> は とても <ruby>簡単<rt>かんたん</rt></ruby> です",
  "romaji": "kono mondai wa totemo kantan desu.",
  "french": "Ce **problème** est très facile.",
  "highlight": [
   "問題",
   "mondai"
  ]
 },
 {
  "japanese": "<ruby>試験<rt>しけん</rt></ruby> に は <ruby>難<rt>むずか</rt></ruby>しい <ruby>問題<rt>もんだい</rt></ruby> が たくさん ありました",
  "romaji": "shiken ni wa muzukashii mondai ga takusan arimashita.",
  "french": "Il y avait beaucoup de **problèmes** difficiles à l'examen.",
  "highlight": [
   "問題",
   "mondai"
  ]
 },
 {
  "japanese": "その <ruby>事<rt>こと</rt></ruby> について、<ruby>大<rt>おお</rt></ruby>きな <ruby>問題<rt>もんだい</rt></ruby> は ありません",
  "romaji": "sono koto ni tsuite, ookina mondai wa arimasen.",
  "french": "Il n'y a pas de gros **problème** à ce sujet.",
  "highlight": [
   "問題",
   "mondai"
  ]
 }
]
```

### ENTRY publiée `v_511`

```json
{
 "id": "v_511",
 "level": "N5",
 "word": "問題",
 "writings": [],
 "readings": [
  {
   "kana": "もんだい",
   "romaji": "mondai",
   "furigana": "<ruby>問<rt>もん</rt></ruby><ruby>題<rt>だい</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "La source donne aussi les traductions « sujet de discussion » et « affaire », sans les développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_511_s1",
   "meaning": {
    "primary": "Problème",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "concept_abstrait",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Un problème, un différend, qui pose une difficulté dans une situation."
  },
  {
   "id": "v_511_s2",
   "meaning": {
    "primary": "Question (d'examen)",
    "alternatives": []
   },
   "category": {
    "level_1": "education_apprentissage",
    "level_2": "evaluation_scolaire",
    "level_3": "examens"
   },
   "semantic_type": "information_contenu",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Une question à résoudre, dans un test scolaire : このしけんの問題はむずかしいです (les problèmes de cet examen sont difficiles)."
  }
 ]
}
```

## 一番 — `v_517`

### Fiche source `n5_v_517`

```json
{
 "id": "n5_v_517",
 "level": "N5",
 "word": "一番",
 "word_furigana": "<ruby>一<rt>いち</rt></ruby><ruby>番<rt>ばん</rt></ruby>",
 "reading": "いちばん",
 "romaji": "ichiban",
 "meanings": {
  "primary": "Le plus",
  "secondary": [
   "Le meilleur",
   "Numéro un",
   "Premier"
  ]
 },
 "nuance": "**Adverbe** (composé de *ichi* (un) et *ban* (suffixe de classement)) servant à marquer le superlatif absolu (« le plus... » de tous) ou à désigner la première position.",
 "type": "adverbe",
 "group": "adverbe",
 "category": "adverbes_expressions",
 "subcategory": "superlatif",
 "kanji_list": [
  "一",
  "番"
 ],
 "particles": [],
 "example": {
  "japanese": "にほんご の なかで なに が **<ruby>一<rt>いち</rt></ruby><ruby>番<rt>ばん</rt></ruby>** すき です か 。",
  "romaji": "nihongo no naka de nani ga ichiban suki desu ka.",
  "french": "Qu'est-ce que vous aimez **le plus** en japonais ?",
  "highlight": [
   "一番",
   "ichiban"
  ]
 }
}
```

### Anciens exemples de `n5_v_517` (3)

```json
[
 {
  "japanese": "<ruby>日本<rt>にほん</rt></ruby> の <ruby>季節<rt>きせつ</rt></ruby> で、<ruby>春<rt>はる</rt></ruby> が いちばん <ruby>好き<rt>すき</rt></ruby> です",
  "romaji": "nihon no kisetsu de, haru ga ichiban suki desu.",
  "french": "Des saisons du Japon, c'est le printemps que j'aime **le plus**.",
  "highlight": [
   "いちばん",
   "ichiban"
  ]
 },
 {
  "japanese": "この <ruby>中<rt>なか</rt></ruby> で いちばん <ruby>大<rt>おお</rt></ruby>きい <ruby>動物<rt>どうぶつ</rt></ruby> は どれ ですか",
  "romaji": "kono naka de ichiban ookii doubutsu wa dore desu ka.",
  "french": "Lequel est le plus grand animal parmi ceux-ci ?",
  "highlight": [
   "いちばん",
   "ichiban"
  ]
 },
 {
  "japanese": "クラス で いちばん <ruby>日本語<rt>にほんご</rt></ruby> が <ruby>上手<rt>じょうず</rt></ruby> な <ruby>人<rt>ひと</rt></ruby> は <ruby>誰<rt>だれ</rt></ruby> ですか",
  "romaji": "kurasu de ichiban nihongo ga jouzu na hito wa dare desu ka.",
  "french": "Qui est la personne qui parle **le mieux** japonais dans la classe ?",
  "highlight": [
   "いちばん",
   "ichiban"
  ]
 }
]
```

### ENTRY publiée `v_517`

```json
{
 "id": "v_517",
 "level": "N5",
 "word": "一番",
 "writings": [],
 "readings": [
  {
   "kana": "いちばん",
   "romaji": "ichiban",
   "furigana": "<ruby>一<rt>いち</rt></ruby><ruby>番<rt>ばん</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "adverbe",
  "group": null,
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Composé de ichi (un) et de ban (suffixe de classement), selon la fiche.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_517_s1",
   "meaning": {
    "primary": "Le plus",
    "alternatives": [
     "Le meilleur"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "comparatif"
    ],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Le superlatif absolu, « le plus… » de tous : にほんごのなかでなにがいちばんすきですか (qu'est-ce que vous aimez le plus en japonais ?)."
  },
  {
   "id": "v_517_s2",
   "meaning": {
    "primary": "Numéro un",
    "alternatives": [
     "Premier"
    ]
   },
   "category": {
    "level_1": "nombres_quantification",
    "level_2": "nombres",
    "level_3": "ordinaux"
   },
   "semantic_type": "concept_abstrait",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "La première position dans un classement."
  }
 ]
}
```

## 吸う — `v_542`

### Fiche source `n5_v_542`

```json
{
 "id": "n5_v_542",
 "level": "N5",
 "word": "吸う",
 "word_furigana": "<ruby>吸<rt>す</rt></ruby>う",
 "reading": "すう",
 "romaji": "suu",
 "meanings": {
  "primary": "Fumer",
  "secondary": [
   "Aspirer",
   "Inhaler"
  ]
 },
 "nuance": "**Verbe transitif (groupe u)** exprimant l'action d'inspirer de l'air ou de la fumée (comme fumer une cigarette), ou d'aspirer un liquide.",
 "type": "verbe",
 "group": "u",
 "category": "actions_generiques",
 "subcategory": "consommation",
 "kanji_list": [
  "吸"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "ここで たばこ を **<ruby>吸<rt>す</rt></ruby>い** ます か 。",
  "romaji": "koko de tabako o suimasu ka.",
  "french": "Est-ce qu'on **fume** des cigarettes ici ?",
  "highlight": [
   "吸う",
   "suu"
  ]
 }
}
```

### Anciens exemples de `n5_v_542` (3)

```json
[
 {
  "japanese": "<ruby>父<rt>ちち</rt></ruby> は <ruby>部屋<rt>へや</rt></ruby> で タバコ を <ruby>吸<rt>す</rt></ruby>います",
  "romaji": "chichi wa heya de tabako o suimasu.",
  "french": "Mon père **fume** une cigarette dans sa chambre.",
  "highlight": [
   "吸う",
   "suu"
  ]
 },
 {
  "japanese": "ここで タバコ を <ruby>吸<rt>す</rt></ruby>って も いい です か",
  "romaji": "koko de tabako o sutte mo ii desu ka.",
  "french": "Puis-je **fumer** une cigarette ici ?",
  "highlight": [
   "吸う",
   "suu"
  ]
 },
 {
  "japanese": "<ruby>空<rt>そく</rt></ruby>きれいな <ruby>空気<rt>くうき</rt></ruby> を たくさん <ruby>吸<rt>す</rt></ruby>い込みました",
  "romaji": "kireina kuuki o takusan suikomimashita.",
  "french": "J'ai **respiré** (**aspiré**) beaucoup d'air pur.",
  "highlight": [
   "吸う",
   "suu"
  ]
 }
]
```

### ENTRY publiée `v_542`

```json
{
 "id": "v_542",
 "level": "N5",
 "word": "吸う",
 "writings": [],
 "readings": [
  {
   "kana": "すう",
   "romaji": "suu",
   "furigana": "<ruby>吸<rt>す</rt></ruby>う",
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
   "id": "v_542_s1",
   "meaning": {
    "primary": "Fumer",
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
   "nuance": "Inspirer de la fumée : fumer une cigarette. ここでたばこを吸いますか (est-ce qu'on fume ici ?)."
  },
  {
   "id": "v_542_s2",
   "meaning": {
    "primary": "Aspirer",
    "alternatives": [
     "Inhaler"
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
   "nuance": "Inspirer de l'air, ou aspirer un liquide."
  }
 ]
}
```

## いいえ — `v_584`

### Fiche source `n5_v_584`

```json
{
 "id": "n5_v_584",
 "level": "N5",
 "word": "いいえ",
 "word_furigana": "いいえ",
 "reading": "いいえ",
 "romaji": "iie",
 "meanings": {
  "primary": "Non",
  "secondary": [
   "De rien",
   "Pas du tout"
  ]
 },
 "nuance": "**Interjection / expression** de négation courante. Utilisée pour répondre par la négative à une question, ou pour décliner poliment un compliment ou un remerciement (dans le sens de « de rien »).",
 "type": "adverbe",
 "group": "adverbe",
 "category": "adverbes_expressions",
 "subcategory": "politesse",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "**いいえ** 、 ちigai masu 。",
  "romaji": "iie, chigaimasu.",
  "french": "**Non**, ce n'est pas ça.",
  "highlight": [
   "いいえ",
   "iie"
  ]
 }
}
```

### Anciens exemples de `n5_v_584` (3)

```json
[
 {
  "japanese": "「<ruby>学生<rt>がくせい</rt></ruby> です か」「いいえ、<ruby>会社員<rt>かいしゃいん</rt></ruby> です」",
  "romaji": "'gakusei desu ka' 'iie, kaishain desu.'",
  "french": "« Êtes-vous étudiant ? » « **Non**, je suis employé de bureau. »",
  "highlight": [
   "いいえ",
   "iie"
  ]
 },
 {
  "japanese": "「これ は あなた の ペン です か」「いいえ、ちがいます」",
  "romaji": "'kore wa anata no pen desu ka' 'iie, chigaimasu.'",
  "french": "« Est-ce votre stylo ? » « **Non**, ce n'est pas le cas. »",
  "highlight": [
   "いいえ",
   "iie"
  ]
 },
 {
  "japanese": "「お<ruby>酒<rt>さけ</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みます か」「いいえ、<ruby>全<rt>まった</rt></ruby>く <ruby>飲<rt>の</rt></ruby>みません」",
  "romaji": "'osake o nomimasu ka' 'iie, mattaku nomimasen.'",
  "french": "« Buvez-vous de l'alcool ? » « **Non**, je n'en bois pas du tout. »",
  "highlight": [
   "いいえ",
   "iie"
  ]
 }
]
```

### ENTRY publiée `v_584`

```json
{
 "id": "v_584",
 "level": "N5",
 "word": "いいえ",
 "writings": [],
 "readings": [
  {
   "kana": "いいえ",
   "romaji": "iie",
   "furigana": "いいえ",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "interjection",
  "group": null,
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_584_s1",
   "meaning": {
    "primary": "Non",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [
    {
     "type": "opposed_to",
     "target": "v_586_s1"
    }
   ],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": [
     "discours"
    ]
   },
   "particles": [],
   "nuance": "Pour répondre par la négative à une question."
  },
  {
   "id": "v_584_s2",
   "meaning": {
    "primary": "De rien",
    "alternatives": [
     "Pas du tout"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": [
     "politesse"
    ]
   },
   "particles": [],
   "nuance": "Pour décliner poliment un compliment ou un remerciement."
  }
 ]
}
```

## そうして — `v_596`

### Fiche source `n5_v_596`

```json
{
 "id": "n5_v_596",
 "level": "N5",
 "word": "そうして",
 "word_furigana": "そうして",
 "reading": "そうして",
 "romaji": "soushite",
 "meanings": {
  "primary": "Et puis",
  "secondary": [
   "Et ensuite",
   "C'est ainsi que"
  ]
 },
 "nuance": "**Conjonction** utilisée pour lier deux phrases ou actions de manière séquentielle (indiquant ce qui se produit après) ou pour ajouter une information supplémentaire, de façon un peu plus soutenue que *sorekara* (それから).",
 "type": "adverbe",
 "group": "adverbe",
 "category": "adverbes_expressions",
 "subcategory": "liaison",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "あさ ごはん を たべ まし た 。 **そうして** 、 がっこう へ いき まし た 。",
  "romaji": "asa gohan o tabemashita. soushite, gakkou e ikimashita.",
  "french": "J'ai pris mon petit-déjeuner. **Et puis**, je suis allé à l'école.",
  "highlight": [
   "そうして",
   "soushite"
  ]
 }
}
```

### Anciens exemples de `n5_v_596` (3)

```json
[
 {
  "japanese": "きょう は <ruby>朝<rt>あさ</rt></ruby> ごはん を <ruby>食<rt>た</rt></ruby>べました。そうして、すぐ <ruby>会社<rt>かいしゃ</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きました",
  "romaji": "kyou wa asa gohan o tabemashita. soushite, sugu kaisha e ikimashita.",
  "french": "J'ai pris mon petit-déjeuner ce matin. **Et puis**, je suis immédiatement allé au bureau.",
  "highlight": [
   "そうして",
   "soushite"
  ]
 },
 {
  "japanese": "<ruby>昨日<rt>きのう</rt></ruby> は <ruby>本<rt>ほん</rt></ruby> を <ruby>読<rt>よ</rt></ruby>みました。そうして、<ruby>映画<rt>えいが</rt></ruby> も <ruby>見<rt>み</rt></ruby>ました",
  "romaji": "kinou wa hon o yomimashita. soushite, eiga mo mimashita.",
  "french": "J'ai lu un livre hier. **Et puis**, j'ai aussi regardé un film.",
  "highlight": [
   "そうして",
   "soushite"
  ]
 },
 {
  "japanese": "<ruby>先週<rt>せんしゅう</rt></ruby> <ruby>京都<rt>きょうと</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きました。そうして、たくさん の <ruby>寺<rt>てら</rt></ruby> を <ruby>見<rt>み</rt></ruby>ました",
  "romaji": "senshuu kyouto e ikimashita. soushite, takusan no tera o mimashita.",
  "french": "Je suis allé à Kyoto la semaine dernière. **Et puis**, j'ai vu beaucoup de temples.",
  "highlight": [
   "そうして",
   "soushite"
  ]
 }
]
```

### ENTRY publiée `v_596`

```json
{
 "id": "v_596",
 "level": "N5",
 "word": "そうして",
 "writings": [],
 "readings": [
  {
   "kana": "そうして",
   "romaji": "soushite",
   "furigana": "そうして",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "conjonction",
  "group": null,
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Pour lier deux phrases ou actions de manière séquentielle, ou pour ajouter une information : あさごはんをたべました。そうして、がっこうへいきました (j'ai pris mon petit-déjeuner. Et puis, je suis allé à l'école). Un peu plus soutenu que それから. La fiche donne aussi « c'est ainsi que », sans le développer.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_596_s1",
   "meaning": {
    "primary": "Et puis",
    "alternatives": [
     "Et ensuite"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": [
     "connecteur"
    ]
   }
  }
 ]
}
```

## 他 — `v_605`

### Fiche source `n5_v_605`

```json
{
 "id": "n5_v_605",
 "level": "N5",
 "word": "他",
 "word_furigana": "<ruby>他<rt>ほか</rt></ruby>",
 "reading": "ほか",
 "romaji": "hoka",
 "meanings": {
  "primary": "Autre",
  "secondary": [
   "En plus",
   "Le reste",
   "En dehors de"
  ]
 },
 "nuance": "**Nom / expression** désignant ce qui est différent, additionnel ou extérieur à un élément donné (très utilisé dans la structure *hoka ni* en plus de / à part...).",
 "type": "nom",
 "group": "nom",
 "category": "adverbes_expressions",
 "subcategory": "alternance",
 "kanji_list": [
  "他"
 ],
 "particles": [],
 "example": {
  "japanese": "**ほか** に なに か ります か 。",
  "romaji": "hoka ni nani ka arimasu ka.",
  "french": "Y a-t-il **autre** chose ?",
  "highlight": [
   "他",
   "hoka"
  ]
 }
}
```

### Anciens exemples de `n5_v_605` (3)

```json
[
 {
  "japanese": "ほかに <ruby>質問<rt>しつもん</rt></ruby> が あります か",
  "romaji": "hoka ni shitsumon ga arimasu ka.",
  "french": "Y a-t-il d'**autres** questions ?",
  "highlight": [
   "ほか",
   "hoka"
  ]
 },
 {
  "japanese": "この <ruby>問題<rt>もんだい</rt></ruby> の <ruby>ほか<rt>ほか</rt></ruby> に も <ruby>難<rt>むずか</rt></ruby>しい ところ が あります",
  "romaji": "kono mondai no hoka ni mo muzukashii tokoro ga arimasu.",
  "french": "Il y a des endroits difficiles **en plus** de ce problème.",
  "highlight": [
   "ほか",
   "hoka"
  ]
 },
 {
  "japanese": "<ruby>日曜日<rt>にちようび</rt></ruby> は 買い物の ほか に 部屋の 掃除 を します",
  "romaji": "nichiyoubi wa kaimono no hoka ni heya no souji o shimasu.",
  "french": "Le dimanche, je fais le ménage de ma chambre **en plus** des courses.",
  "highlight": [
   "ほか",
   "hoka"
  ]
 }
]
```

### ENTRY publiée `v_605`

```json
{
 "id": "v_605",
 "level": "N5",
 "word": "他",
 "writings": [],
 "readings": [
  {
   "kana": "ほか",
   "romaji": "hoka",
   "furigana": "<ruby>他<rt>ほか</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Ce qui est différent, additionnel ou extérieur à un élément donné : y a-t-il autre chose ? Avec に, ほかに : en plus de, à part, en dehors de.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_605_s1",
   "meaning": {
    "primary": "Autre",
    "alternatives": [
     "Le reste"
    ]
   },
   "category": null,
   "semantic_type": "concept_abstrait",
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

## 兄弟 — `v_638`

### Fiche source `n5_v_638`

```json
{
 "id": "n5_v_638",
 "level": "N5",
 "word": "兄弟",
 "word_furigana": "<ruby>兄<rt>きょう</rt></ruby><ruby>弟<rt>だい</rt></ruby>",
 "reading": "きょうだい",
 "romaji": "kyoudai",
 "meanings": {
  "primary": "Frères et sœurs",
  "secondary": [
   "Fratrie"
  ]
 },
 "nuance": "**Nom** désignant collectivement les frères et sœurs (qu'ils soient plus âgés ou plus jeunes). Pour parler poliment des frères et sœurs de quelqu'un d'autre, on emploie généralement le terme honorifique *gokyoudai* (ご兄弟).",
 "type": "nom",
 "group": "nom",
 "category": "personnes_famille",
 "subcategory": "famille",
 "kanji_list": [
  "兄",
  "弟"
 ],
 "particles": [],
 "example": {
  "japanese": "あなた は **<ruby>兄<rt>きょう</rt></ruby><ruby>弟<rt>だい</rt></ruby>** が い ます か 。",
  "romaji": "anata wa kyoudai ga imasu ka.",
  "french": "Avez-vous des **frères et sœurs** ?",
  "highlight": [
   "兄弟",
   "kyoudai"
  ]
 }
}
```

### Anciens exemples de `n5_v_638` (4)

```json
[
 {
  "japanese": "「あなた は <ruby>兄弟<rt>きょうだい</rt></ruby> が います か」「はい、<ruby>兄<rt>あに</rt></ruby> が 1 <ruby>人<rt>ひとり</rt></ruby> います」",
  "romaji": "'anata wa kyoudai ga imasu ka' 'hai, ani ga hitori imasu.'",
  "french": "« As-tu des **frères et sœurs** ? » « Oui, j'ai un grand frère. »",
  "highlight": [
   "兄弟",
   "kyoudai"
  ]
 },
 {
  "japanese": "うち の <ruby>兄弟<rt>きょうだい</rt></ruby> は みんな よく <ruby>勉強<rt>べんきょう</rt></ruby> します",
  "romaji": "uchi no kyoudai wa minna yoku benkyou shimasu.",
  "french": "Les **frères et sœurs** de notre famille étudient tous bien.",
  "highlight": [
   "兄弟",
   "kyoudai"
  ]
 },
 {
  "japanese": "<ruby>兄弟<rt>きょうだい</rt></ruby> で いっしょに <ruby>父<rt>ちち</rt></ruby> の <ruby>誕生日<rt>たんじょうび</rt></ruby> の プレゼント を <ruby>買<rt>か</rt></ruby>いました",
  "romaji": "kyoudai de isshoni chichi no tanjoubi no purezento o kaimashita.",
  "french": "Nous avons acheté le cadeau d'anniversaire de notre père **entre frères et sœurs** ensemble.",
  "highlight": [
   "兄弟",
   "kyoudai"
  ]
 },
 {
  "japanese": "<ruby>兄弟<rt>きょうだい</rt></ruby> で いっしょに <ruby>父<rt>ちち</rt></ruby> の <ruby>誕生日<rt>たんじょうび</rt></ruby> の プレゼント を <ruby>買<rt>か</rt></ruby>いました",
  "romaji": "kyoudai de isshoni chichi no tanjoubi no purezento o kaimashita.",
  "french": "Nous avons acheté le cadeau d'anniversaire de notre père **entre frères et sœurs** ensemble.",
  "highlight": [
   "兄弟",
   "kyoudai"
  ]
 }
]
```

### ENTRY publiée `v_638`

```json
{
 "id": "v_638",
 "level": "N5",
 "word": "兄弟",
 "writings": [],
 "readings": [
  {
   "kana": "きょうだい",
   "romaji": "kyoudai",
   "furigana": "<ruby>兄<rt>きょう</rt></ruby><ruby>弟<rt>だい</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Désigne l'ensemble des frères et sœurs, quel que soit leur sexe : 兄弟がいますか (avez-vous des frères et sœurs ?).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_638_s1",
   "meaning": {
    "primary": "Frères et sœurs",
    "alternatives": [
     "Fratrie"
    ]
   },
   "category": {
    "level_1": "relations_sociales",
    "level_2": "famille_parente",
    "level_3": "fratrie"
   },
   "semantic_type": "groupe_collectif",
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

## 名前 — `v_651`

### Fiche source `n5_v_651`

```json
{
 "id": "n5_v_651",
 "level": "N5",
 "word": "名前",
 "word_furigana": "<ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>",
 "reading": "なまえ",
 "romaji": "namae",
 "meanings": {
  "primary": "Nom",
  "secondary": [
   "Prénom",
   "Appellation"
  ]
 },
 "nuance": "**Nom** composé de « nom » et « devant / avant », désignant le nom ou le prénom d'une personne, d'un animal ou d'une chose.",
 "type": "nom",
 "group": "nom",
 "category": "ecole_apprentissage",
 "subcategory": "identification",
 "kanji_list": [
  "名",
  "前"
 ],
 "particles": [],
 "example": {
  "japanese": "ノート に **<ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>** を かき ます 。",
  "romaji": "nooto ni namae o kakimasu.",
  "french": "J'écris mon **nom** sur le cahier.",
  "highlight": [
   "名前",
   "namae"
  ]
 }
}
```

### Anciens exemples de `n5_v_651` (3)

```json
[
 {
  "japanese": "<ruby>試験<rt>しけん</rt></ruby> の <ruby>用紙<rt>ようし</rt></ruby> に <ruby>名前<rt>なまえ</rt></ruby> を <ruby>書<rt>か</rt></ruby>いて ください",
  "romaji": "shiken no youshi ni namae o kaite kudasai.",
  "french": "Veuillez écrire votre **nom** sur la feuille d'examen.",
  "highlight": [
   "名前",
   "namae"
  ]
 },
 {
  "japanese": "「あなたの お<ruby>名前<rt>なまえ</rt></ruby> は なん です か」",
  "romaji": "'anata no onamae wa nan desu ka.'",
  "french": "« Quel est votre **nom** ? »",
  "highlight": [
   "名前",
   "namae"
  ]
 },
 {
  "japanese": "<ruby>教科書<rt>きょうかしょ</rt></ruby> に <ruby>自分<rt>じぶん</rt></ruby> の <ruby>名前<rt>なまえ</rt></ruby> を <ruby>書<rt>か</rt></ruby>きました",
  "romaji": "kyoukasho ni jibun no namae o kakimashita.",
  "french": "J'ai écrit mon propre **nom** sur le manuel scolaire.",
  "highlight": [
   "名前",
   "namae"
  ]
 }
]
```

### ENTRY publiée `v_651`

```json
{
 "id": "v_651",
 "level": "N5",
 "word": "名前",
 "writings": [],
 "readings": [
  {
   "kana": "なまえ",
   "romaji": "namae",
   "furigana": "<ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Le nom d'une personne, d'un animal ou d'une chose : お名前は？, votre nom ?",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_651_s1",
   "meaning": {
    "primary": "Nom",
    "alternatives": [
     "Prénom"
    ]
   },
   "category": {
    "level_1": "communication_langage"
   },
   "semantic_type": "information_contenu",
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

## 所 — `v_664`

### Fiche source `n5_v_664`

```json
{
 "id": "n5_v_664",
 "level": "N5",
 "word": "所",
 "word_furigana": "<ruby>所<rt>ところ</rt></ruby>",
 "reading": "ところ",
 "romaji": "tokoro",
 "meanings": {
  "primary": "Endroit",
  "secondary": [
   "Lieu",
   "Place",
   "Partie"
  ]
 },
 "nuance": "**Nom** désignant un lieu, un endroit physique, ou un point/une partie spécifique d'une chose ou d'une situation.",
 "type": "nom",
 "group": "nom",
 "category": "abstrait",
 "subcategory": "lieu",
 "kanji_list": [
  "所"
 ],
 "particles": [],
 "example": {
  "japanese": "ここ は きれいな **<ruby>所<rt>ところ</rt></ruby>** です ね 。",
  "romaji": "koko wa kireina tokoro desu ne.",
  "french": "C'est un **endroit** magnifique, n'est-ce pas ?",
  "highlight": [
   "所",
   "tokoro"
  ]
 }
}
```

### Anciens exemples de `n5_v_664` (3)

```json
[
 {
  "japanese": "ここ は <ruby>私<rt>わたし</rt></ruby> が <ruby>大好<rt>だいす</rt></ruby>きな <ruby>所<rt>ところ</rt></ruby> です",
  "romaji": "koko wa watashi ga daisuki na tokoro desu.",
  "french": "C'est un **endroit** que j'adore ('que j'aime beaucoup').",
  "highlight": [
   "所",
   "tokoro"
  ]
 },
 {
  "japanese": "「<ruby>今度<rt>こんど</rt></ruby> の <ruby>日曜日<rt>にちようび</rt></ruby>、どこか いい <ruby>所<rt>ところ</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きませんか」",
  "romaji": "'kondo no nichiyoubi, dokoka ii tokoro e ikimasen ka.'",
  "french": "« Si on allait quelque part dans un bon **endroit** ce dimanche prochain ? »",
  "highlight": [
   "所",
   "tokoro"
  ]
 },
 {
  "japanese": "この <ruby>町<rt>まち</rt></ruby> に は <ruby>静<rt>しず</rt></ruby>かな <ruby>所<rt>ところ</rt></ruby> が たくさん あります",
  "romaji": "kono machi ni wa shizuka na tokoro ga takusan arimasu.",
  "french": "Il y a beaucoup d'**endroits** calmes dans cette ville.",
  "highlight": [
   "所",
   "tokoro"
  ]
 }
]
```

### ENTRY publiée `v_664`

```json
{
 "id": "v_664",
 "level": "N5",
 "word": "所",
 "writings": [],
 "readings": [
  {
   "kana": "ところ",
   "romaji": "tokoro",
   "furigana": "<ruby>所<rt>ところ</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_664_s1",
   "meaning": {
    "primary": "Endroit",
    "alternatives": [
     "Lieu",
     "Place"
    ]
   },
   "category": {
    "level_1": "espace_proprietes_spatiales",
    "level_2": "position_localisation"
   },
   "semantic_type": "lieu",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Un lieu, un endroit physique : ここはきれいな所ですね (c'est un endroit magnifique, n'est-ce pas ?)."
  },
  {
   "id": "v_664_s2",
   "meaning": {
    "primary": "Partie",
    "alternatives": []
   },
   "category": null,
   "semantic_type": "concept_abstrait",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "particles": [],
   "nuance": "Un point, une partie précise d'une chose ou d'une situation."
  }
 ]
}
```

## 水 — `v_677`

### Fiche source `n5_v_677`

```json
{
 "id": "n5_v_677",
 "level": "N5",
 "word": "水",
 "word_furigana": "<ruby>水<rt>みず</rt></ruby>",
 "reading": "みず",
 "romaji": "mizu",
 "meanings": {
  "primary": "Eau",
  "secondary": [
   "Eau fraîche / froide (par opposition à l'eau chaude oyu)"
  ]
 },
 "nuance": "**Nom** fondamental désignant l'eau potable ou l'eau liquide en général. Dans un contexte de restauration ou de cuisine, il s'oppose souvent à l'eau chaude (*oyu*).",
 "type": "nom",
 "group": "nom",
 "category": "nourriture_boissons",
 "subcategory": "boisson",
 "kanji_list": [
  "水"
 ],
 "particles": [],
 "example": {
  "japanese": "コップ に **<ruby>水<rt>みず</rt></ruby>** を いれ ます 。",
  "romaji": "koppu ni mizu o iremasu.",
  "french": "Je mets de l'**eau** dans le verre.",
  "highlight": [
   "水",
   "mizu"
  ]
 }
}
```

### Anciens exemples de `n5_v_677` (3)

```json
[
 {
  "japanese": "<ruby>喉<rt>のど</rt></ruby> が かわいた ので、<ruby>冷<rt>つめ</rt></ruby>たい <ruby>水<rt>みず</rt></ruby> を <ruby>飲<rt>の</rt></ruby>みました",
  "romaji": "nodo ga kawaita node, tsumetai mizu o nomimashita.",
  "french": "J'avais soif, alors j'ai bu de l'**eau** fraîche.",
  "highlight": [
   "水",
   "mizu"
  ]
 },
 {
  "japanese": "「<ruby>毎朝<rt>まいあさ</rt></ruby>、<ruby>花<rt>はな</rt></ruby> に <ruby>水<rt>みず</rt></ruby> を やります」",
  "romaji": "'maiasa, hana ni mizu o yarimasu.'",
  "french": "« Je donne de l'**eau** aux fleurs tous les matins. »",
  "highlight": [
   "水",
   "mizu"
  ]
 },
 {
  "japanese": "<ruby>料理<rt>りょうり</rt></ruby> を する <ruby>前<rt>まえ</rt></ruby> に、<ruby>手<rt>て</rt></ruby> を <ruby>水<rt>みず</rt></ruby> で <ruby>洗<rt>あら</rt></ruby>います",
  "romaji": "ryouri o suru mae ni, te o mizu de araimasu.",
  "french": "Avant de cuisiner, je me lave les mains à l'**eau**.",
  "highlight": [
   "水",
   "mizu"
  ]
 }
]
```

### ENTRY publiée `v_677`

```json
{
 "id": "v_677",
 "level": "N5",
 "word": "水",
 "writings": [],
 "readings": [
  {
   "kana": "みず",
   "romaji": "mizu",
   "furigana": "<ruby>水<rt>みず</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "L'eau froide ou à température ambiante ; l'eau chaude se dit お湯 (おゆ). Au restaurant, on demande お水.",
 "tags": [
  "lieu_konbini",
  "lieu_restaurant"
 ],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_677_s1",
   "meaning": {
    "primary": "Eau",
    "alternatives": []
   },
   "category": {
    "level_1": "alimentation_cuisine",
    "level_2": "boissons",
    "level_3": "eau"
   },
   "semantic_type": "substance_matiere",
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

## 私 — `v_688`

### Fiche source `n5_v_688`

```json
{
 "id": "n5_v_688",
 "level": "N5",
 "word": "私",
 "word_furigana": "<ruby>私<rt>わたし</rt></ruby>",
 "reading": "わたし",
 "romaji": "watashi",
 "meanings": {
  "primary": "Je",
  "secondary": [
   "Moi",
   "Mon / Ma (en tant que préfixe possessif implicite)"
  ]
 },
 "nuance": "**Pronom personnel** le plus courant pour désigner la première personne du singulier (« je » ou « moi »). Il est poli et neutre, utilisé indifféremment par les hommes et les femmes dans la plupart des situations formelles et quotidiennes.",
 "type": "pronom",
 "group": "pronom",
 "category": "pronoms_demonstratifs",
 "subcategory": "pronom",
 "kanji_list": [
  "私"
 ],
 "particles": [
  "は",
  "が",
  "を"
 ],
 "example": {
  "japanese": "**<ruby>私<rt>わたし</rt></ruby>** は がくせい です 。",
  "romaji": "watashi wa gakusei desu.",
  "french": "**Je** suis étudiant.",
  "highlight": [
   "私",
   "watashi"
  ]
 }
}
```

### Anciens exemples de `n5_v_688` (3)

```json
[
 {
  "japanese": "<ruby>私<rt>わたし</rt></ruby> は <ruby>毎日<rt>まいにち</rt></ruby> <ruby>朝<rt>あさ</rt></ruby> 6 <ruby>時<rt>じ</rt></ruby> に 起<rt>お</rt></ruby>きます",
  "romaji": "watashi wa mainichi asa roku-ji ni okimasu.",
  "french": "**Je** me lève à 6 heures du matin tous les jours.",
  "highlight": [
   "私",
   "watashi"
  ]
 },
 {
  "japanese": "「<ruby>私<rt>わたし</rt></ruby> の <ruby>名前<rt>なまえ</rt></ruby> は アンナ です。よろしく おねがいします」",
  "romaji": "'watashi no namae wa anna desu. yoroshiku onegaishimasu.'",
  "french": "« **Mon** nom est Anna. Enchantée. »",
  "highlight": [
   "私",
   "watashi"
  ]
 },
 {
  "japanese": "<ruby>私<rt>わたし</rt></ruby> は <ruby>日本<rt>にほん</rt></ruby> の <ruby>料理<rt>りょうり</rt></ruby> が <ruby>大好<rt>だいす</rt></ruby>き です",
  "romaji": "watashi wa nihon no ryouri ga daisuki desu.",
  "french": "**J'**adore la cuisine japonaise.",
  "highlight": [
   "私",
   "watashi"
  ]
 }
]
```

### ENTRY publiée `v_688`

```json
{
 "id": "v_688",
 "level": "N5",
 "word": "私",
 "writings": [],
 "readings": [
  {
   "kana": "わたし",
   "romaji": "watashi",
   "furigana": "<ruby>私<rt>わたし</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "pronom",
  "group": null,
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_688_s1",
   "meaning": {
    "primary": "Je",
    "alternatives": [
     "Moi"
    ]
   },
   "category": null,
   "semantic_type": "personne",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "deictique"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Neutre et poli, pour tous ; plus formel : わたくし. Possessif : 私の本, mon livre.",
   "particles": [
    "は",
    "が",
    "を"
   ]
  }
 ]
}
```

## 誰か — `v_700`

### Fiche source `n5_v_700`

```json
{
 "id": "n5_v_700",
 "level": "N5",
 "word": "誰か",
 "word_furigana": "<ruby>誰<rt>だれ</rt></ruby>か",
 "reading": "だれか",
 "romaji": "dareka",
 "meanings": {
  "primary": "Quelqu'un",
  "secondary": [
   "N'importe qui (dans une phrase affirmative)"
  ]
 },
 "nuance": "**Pronom indéfini** composé du pronom interrogatif *dare* (qui) et de la particule interrogative/indéfinie *ka*, désignant une personne indéterminée (« quelqu'un »).",
 "type": "pronom",
 "group": "pronom",
 "category": "pronoms_demonstratifs",
 "subcategory": "pronom",
 "kanji_list": [
  "誰"
 ],
 "particles": [
  "が",
  "を"
 ],
 "example": {
  "japanese": "きょうしつ に **<ruby>誰<rt>だれ</rt></ruby>か** が い ます 。",
  "romaji": "kyoushitsu ni dareka ga imasu.",
  "french": "Il y a **quelqu'un** dans la classe.",
  "highlight": [
   "誰か",
   "dareka"
  ]
 }
}
```

### Anciens exemples de `n5_v_700` (3)

```json
[
 {
  "japanese": "<ruby>教室<rt>きょうしつ</rt></ruby> の <ruby>中<rt>なか</rt></ruby> に <ruby>誰<rt>だれ</rt></ruby>か います か",
  "romaji": "kyoushitsu no naka ni dareka imasu ka.",
  "french": "Y a-t-il **quelqu'un** à l'intérieur de la salle de classe ?",
  "highlight": [
   "誰か",
   "dareka"
  ]
 },
 {
  "japanese": "「あそこに <ruby>誰<rt>だれ</rt></ruby>か 立<rt>た</rt></ruby>って います」",
  "romaji": "'asoko ni dareka tatte imasu.'",
  "french": "« Il y a **quelqu'un** debout par là-bas. »",
  "highlight": [
   "誰か",
   "dareka"
  ]
 },
 {
  "japanese": "<ruby>困<rt>こま</rt></ruby>った とき は、<ruby>誰<rt>だれ</rt></ruby>か に <ruby>相談<rt>そうだん</rt></ruby> して ください",
  "romaji": "komatta toki wa, dareka ni soudan shite kudasai.",
  "french": "Quand vous avez un problème, veuillez en parler à **quelqu'un** ('consulter quelqu'un').",
  "highlight": [
   "誰か",
   "dareka"
  ]
 }
]
```

### ENTRY publiée `v_700`

```json
{
 "id": "v_700",
 "level": "N5",
 "word": "誰か",
 "writings": [],
 "readings": [
  {
   "kana": "だれか",
   "romaji": "dareka",
   "furigana": "<ruby>誰<rt>だれ</rt></ruby>か",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "pronom",
  "group": null,
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_700_s1",
   "meaning": {
    "primary": "Quelqu'un",
    "alternatives": [
     "N'importe qui"
    ]
   },
   "category": null,
   "semantic_type": "personne",
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [],
    "pragmatic_discourse": []
   },
   "nuance": "Formé de 誰 et de か : une personne indéterminée. 誰かいますか : il y a quelqu'un ?",
   "particles": [
    "が",
    "を"
   ]
  }
 ]
}
```

## 質問 — `v_702`

### Fiche source `n5_v_702`

```json
{
 "id": "n5_v_702",
 "level": "N5",
 "word": "質問",
 "word_furigana": "<ruby>質<rt>しつ</rt></ruby><ruby>問<rt>もん</rt></ruby>",
 "reading": "しつもん",
 "romaji": "shitsumon",
 "meanings": {
  "primary": "Question",
  "secondary": [
   "Interrogation"
  ]
 },
 "nuance": "**Nom / verbe suru** composé des kanjis signifiant « nature / qualité » et « poser une question / demander », désignant une question posée pour obtenir une information. S'utilise avec le verbe *suru* (質問する) pour « poser une question ».",
 "type": "nom",
 "group": "nom",
 "category": "ecole_apprentissage",
 "subcategory": "communication",
 "kanji_list": [
  "質",
  "問"
 ],
 "particles": [
  "を"
 ],
 "example": {
  "japanese": "せんせい に **<ruby>質<rt>しつ</rt></ruby><ruby>問<rt>もん</rt></ruby>** を し ます 。",
  "romaji": "sensei ni shitsumon o shimasu.",
  "french": "Je pose une **question** au professeur.",
  "highlight": [
   "質問",
   "shitsumon"
  ]
 }
}
```

### Anciens exemples de `n5_v_702` (3)

```json
[
 {
  "japanese": "<ruby>授業<rt>じゅぎょう</rt></ruby> の <ruby>終<rt>お</rt></ruby>わりに <ruby>先生<rt>せんせい</rt></ruby> に <ruby>質問<rt>しつもん</rt></ruby> を します",
  "romaji": "jugyou no owari ni sensei ni shitsumon o shimasu.",
  "french": "Je pose une **question** au professeur à la fin du cours.",
  "highlight": [
   "質問",
   "shitsumon"
  ]
 },
 {
  "japanese": "「この <ruby>漢字<rt>かんじ</rt></ruby> の <ruby>意味<rt>いみ</rt></ruby> について <ruby>質問<rt>しつもん</rt></ruby> が あります」",
  "romaji": "'kono kanji no imi ni tsuite shitsumon ga arimasu.'",
  "french": "« J'ai une **question** concernant le sens de ce kanji. »",
  "highlight": [
   "質問",
   "shitsumon"
  ]
 },
 {
  "japanese": "<ruby>学生<rt>がくせい</rt></ruby> たち は みんな <ruby>熱心<rt>ねっしん</rt></ruby> に <ruby>質問<rt>しつもん</rt></ruby> を して います",
  "romaji": "gakuseitachi wa minna nesshin ni shitsumon o shite imasu.",
  "french": "Tous les étudiants posent des **questions** avec enthousiasme.",
  "highlight": [
   "質問",
   "shitsumon"
  ]
 }
]
```

### ENTRY publiée `v_702`

```json
{
 "id": "v_702",
 "level": "N5",
 "word": "質問",
 "writings": [],
 "readings": [
  {
   "kana": "しつもん",
   "romaji": "shitsumon",
   "furigana": "<ruby>質<rt>しつ</rt></ruby><ruby>問<rt>もん</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": true,
  "suffix": false,
  "counter": null
 },
 "nuance": "質問する : poser une question.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_702_s1",
   "meaning": {
    "primary": "Question",
    "alternatives": []
   },
   "category": {
    "level_1": "communication_langage",
    "level_2": "parole_conversation",
    "level_3": "question"
   },
   "semantic_type": "information_contenu",
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

## 辺 — `v_703`

### Fiche source `n5_v_703`

```json
{
 "id": "n5_v_703",
 "level": "N5",
 "word": "辺",
 "word_furigana": "<ruby>辺<rt>へん</rt></ruby>",
 "reading": "へん",
 "romaji": "hen",
 "meanings": {
  "primary": "Région",
  "secondary": [
   "Environs",
   "Alentours",
   "Quartier"
  ]
 },
 "nuance": "**Nom / suffixe** désignant les environs, les alentours ou une zone géographique proche (souvent utilisé dans l'expression *kono hen* qui signifie « par ici / dans ces parages »).",
 "type": "nom",
 "group": "nom",
 "category": "abstrait",
 "subcategory": "lieu",
 "kanji_list": [
  "辺"
 ],
 "particles": [
  "に"
 ],
 "example": {
  "japanese": "この **<ruby>辺<rt>へん</rt></ruby>** に コンビニ が あり ます か 。",
  "romaji": "kono hen ni konbini ga arimasu ka.",
  "french": "Y a-t-il un konbini dans les **environs** ?",
  "highlight": [
   "辺",
   "hen"
  ]
 }
}
```

### Anciens exemples de `n5_v_703` (3)

```json
[
 {
  "japanese": "この <ruby>辺<rt>あたり</rt></ruby> に は <ruby>美味<rt>おい</rt></ruby>しい レストラン が たくさん あります",
  "romaji": "kono hen ni wa oishii resutoran ga takusan arimasu.",
  "french": "Il y a beaucoup de bons restaurants dans cette **région** ('aux alentours').",
  "highlight": [
   "辺",
   "hen"
  ]
 },
 {
  "japanese": "「<ruby>駅<rt>えき</rt></ruby> の <ruby>辺<rt>あたり</rt></ruby> は いつも とても <ruby>賑<rt>にぎ</rt></ruby>やかです」",
  "romaji": "'eki no hen wa itsumo totemo nigiyaka desu.'",
  "french": "« La **région** ('les environs') de la gare est toujours très animée. »",
  "highlight": [
   "辺",
   "hen"
  ]
 },
 {
  "japanese": "<ruby>財布<rt>さいふ</rt></ruby> を <ruby>落<rt>お</rt></ruby>としてしまった ので、この <ruby>辺<rt>あたり</rt></ruby> を <ruby>探<rt>さが</rt></ruby>して います",
  "romaji": "saifu o otoshite shimatta node, kono hen o sagashite imasu.",
  "french": "J'ai perdu mon portefeuille, alors je cherche dans cette **région** ('cette zone').",
  "highlight": [
   "辺",
   "hen"
  ]
 }
]
```

### ENTRY publiée `v_703`

```json
{
 "id": "v_703",
 "level": "N5",
 "word": "辺",
 "writings": [],
 "readings": [
  {
   "kana": "へん",
   "romaji": "hen",
   "furigana": "<ruby>辺<rt>へん</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": true,
  "counter": null
 },
 "nuance": "Les environs, les alentours, une zone proche ; souvent après この, この辺 : par ici, dans ces parages. この辺にコンビニがありますか (y a-t-il un konbini dans les environs ?).",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_703_s1",
   "meaning": {
    "primary": "Environs",
    "alternatives": [
     "Alentours",
     "Région",
     "Quartier"
    ]
   },
   "category": {
    "level_1": "espace_proprietes_spatiales",
    "level_2": "distance_proximite",
    "level_3": "proximite"
   },
   "semantic_type": "lieu",
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

## レジ袋 — `v_718`

### Fiche source `hj_v_1`

```json
{
 "id": "hj_v_1",
 "level": "hors_jlpt",
 "word": "レジ袋",
 "word_furigana": "レジ<ruby>袋<rt>ぶくろ</rt></ruby>",
 "reading": "れじぶくろ",
 "romaji": "rejibukuro",
 "meanings": {
  "primary": "Sac de caisse",
  "secondary": [
   "Sac plastique (magasin)"
  ]
 },
 "nuance": "Sac proposé à la caisse, payant au Japon depuis 2020 : le caissier demande presque toujours si on en veut un.",
 "type": "nom",
 "group": "nom",
 "category": "achats_argent",
 "subcategory": "commerce",
 "kanji_list": [
  "袋"
 ],
 "particles": [],
 "places": [
  "konbini"
 ],
 "example": {
  "japanese": "レジ<ruby>袋<rt>ぶくろ</rt></ruby>、お<ruby>願<rt>ねが</rt></ruby>いします。",
  "romaji": "rejibukuro, onegai shimasu.",
  "french": "Un **sac**, s'il vous plaît.",
  "highlight": [
   "レジ袋",
   "rejibukuro"
  ]
 }
}
```

### Anciens exemples de `hj_v_1` (0)

Aucun.

### ENTRY publiée `v_718`

```json
{
 "id": "v_718",
 "level": "hors_jlpt",
 "word": "レジ袋",
 "writings": [],
 "readings": [
  {
   "kana": "れじぶくろ",
   "romaji": "rejibukuro",
   "furigana": "レジ<ruby>袋<rt>ぶくろ</rt></ruby>",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Payant au Japon depuis 2020 : le caissier demande presque toujours si l'on en veut un (レジ袋はご利用ですか).",
 "tags": [
  "lieu_konbini"
 ],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_718_s1",
   "meaning": {
    "primary": "Sac de caisse",
    "alternatives": [
     "Sac plastique"
    ]
   },
   "category": {
    "level_1": "habillement_accessoires_personnels",
    "level_2": "sacs_contenants_personnels",
    "level_3": "sacs"
   },
   "semantic_type": "objet_artefact",
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

## ポイントカード — `v_719`

### Fiche source `hj_v_2`

```json
{
 "id": "hj_v_2",
 "level": "hors_jlpt",
 "word": "ポイントカード",
 "word_furigana": "ポイントカード",
 "reading": "ぽいんとかーど",
 "romaji": "pointo kaado",
 "meanings": {
  "primary": "Carte de fidélité",
  "secondary": []
 },
 "nuance": "Le caissier demande souvent 「ポイントカードはお持ちですか」 : on répond simplement いいえ ou on la montre.",
 "type": "nom",
 "group": "nom",
 "category": "achats_argent",
 "subcategory": "commerce",
 "kanji_list": [],
 "particles": [],
 "places": [
  "konbini"
 ],
 "example": {
  "japanese": "ポイントカードはありません。",
  "romaji": "pointo kaado wa arimasen.",
  "french": "Je n'ai pas de **carte de fidélité**.",
  "highlight": [
   "ポイントカード",
   "pointo kaado"
  ]
 }
}
```

### Anciens exemples de `hj_v_2` (0)

Aucun.

### ENTRY publiée `v_719`

```json
{
 "id": "v_719",
 "level": "hors_jlpt",
 "word": "ポイントカード",
 "writings": [],
 "readings": [
  {
   "kana": "ぽいんとかーど",
   "romaji": "pointo kaado",
   "furigana": "ポイントカード",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "nom",
  "group": "nom",
  "suru_compatible": false,
  "suffix": false,
  "counter": null
 },
 "nuance": "Le caissier demande souvent ポイントカードはお持ちですか : on répond いいえ, ou on la montre.",
 "tags": [
  "lieu_konbini"
 ],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_719_s1",
   "meaning": {
    "primary": "Carte de fidélité",
    "alternatives": []
   },
   "category": {
    "level_1": "economie_commerce",
    "level_2": "marketing_promotion"
   },
   "semantic_type": "objet_artefact",
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
