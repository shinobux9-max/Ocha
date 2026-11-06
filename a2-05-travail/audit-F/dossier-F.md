# Étape 2 · A2-05 · Volet 1 · Lot 3 — dossier d'audit du bloc F (17 sens, 15 ENTRY)

**Date** : 2026-11-03
**Statut** : **dossier de lecture préparatoire, sans verdict.** Généré par `a2-05-travail/audit-F/preparer-dossier-F.mjs`. L'audit s'ouvre sur autorisation distincte ; la grille de chaque sens est vide.

**Cadre** : A10 (`docs/conception/addendum-A10-interrogatif.md`) ; périmètre opérationnel accepté le 2026-11-03 (`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`, §0) : une seule livraison F, deux verdicts par sens (`interrogatif` selon A10 ; `type-nul` selon A6), catégories examinées selon les règles ordinaires, sans présumer d'erreur. Questions Q1 à Q6 : périmètre, §4.

**Contenu, par ENTRY, dans l'ordre du découpage** : fiche source complète (traductions, nuance, exemple) ; anciens exemples (`reconstruction/a2-04/sources/exemples.json`, lecture seule) ; ENTRY publiée (`data/`) ; décisions historiques complètes (`reconstruction/a2-04/journal.json`), aucune réécrite ; corrections retenues non appliquées (bilan du volet 2, §8), à lire avec la nuance publiée.

**Décision de frontière citée** (hors des 17, pour mémoire) : D0724 (誰か), « Personne indéterminée : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4) ; pas de fonction interrogative (誰か n'interroge pas), ni deictique (référent indéterminé, non repéré par la situation d'énonciation, A7) Addendum A5. » ; 聞く et 質問, arbitrés en B2 et B3, ne sont pas rouverts.

## 1. 何 — `v_401` (ligne 361 ; `v_401_s1`)

### Fiche source `n5_v_401`

```json
{
 "id": "n5_v_401",
 "level": "N5",
 "word": "何",
 "word_furigana": "<ruby>何<rt>なに</rt></ruby>",
 "reading": "なん / なに",
 "romaji": "nan / nani",
 "meanings": {
  "primary": "Quoi",
  "secondary": [
   "Quel",
   "Que"
  ]
 },
 "nuance": "**Pronom interrogatif** désignant une chose indéterminée. Il possède deux lectures : *nani* (général) et *nan* (utilisé devant les consonnes des séries t, d, n, ainsi que devant les compteurs et les suffixes comme *desu*). Les romajis associés sont (*nan* / *nani*).",
 "type": "pronom",
 "group": "nom",
 "category": "questions",
 "subcategory": "interrogatifs",
 "kanji_list": [
  "何"
 ],
 "particles": [],
 "example": {
  "japanese": "きょう は **<ruby>何<rt>なに</rt></ruby>** を たべ ます か 。",
  "romaji": "kyou wa nani o tabe masu ka.",
  "french": "**Qu'**est-ce que vous mangez aujourd'hui ?",
  "highlight": [
   "何",
   "nani"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "<ruby>机<rt>つくえ</rt></ruby> の <ruby>上<rt>うえ</rt></ruby> に <ruby>何<rt>なに</rt></ruby> が ありますか",
  "romaji": "tsukue no ue ni nani ga arimasu ka.",
  "french": "Qu'y a-t-il sur le **bureau** ?",
  "highlight": [
   "何",
   "nani"
  ]
 },
 {
  "japanese": "<ruby>夏休み<rt>なつやすみ</rt></ruby> に <ruby>何<rt>なに</rt></ruby> を しますか。「<ruby>海<rt>うみ</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きます」",
  "romaji": "natsuyasumi ni nani o shimasu ka. 'umi e ikimasu.'",
  "french": "Que faites-vous pendant les vacances d'été ? « Je vais à la **mer**. »",
  "highlight": [
   "何",
   "nani"
  ]
 },
 {
  "japanese": "お<ruby>腹<rt>はら</rt></ruby> が <ruby>空<rt>す</rt></ruby>きましたね。<ruby>何<rt>なに</rt></ruby> を <ruby>食<rt>た</rt></ruby>べましょうか",
  "romaji": "ohara ga sukimashita ne. nani o tabemashou ka.",
  "french": "Tu as faim, n'est-ce pas ? **Qu'**allons-nous manger ?",
  "highlight": [
   "何",
   "nani"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_401",
 "level": "N5",
 "word": "何",
 "writings": [],
 "readings": [
  {
   "kana": "なに",
   "romaji": "nani",
   "furigana": "<ruby>何<rt>なに</rt></ruby>",
   "default": true,
   "note": null
  },
  {
   "kana": "なん",
   "romaji": "nan",
   "furigana": "<ruby>何<rt>なん</rt></ruby>",
   "default": false,
   "note": "Devant t, d, n, devant un compteur et devant です."
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
   "id": "v_401_s1",
   "meaning": {
    "primary": "Quoi",
    "alternatives": [
     "Quel",
     "Que"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0043** · decision · readings · validated · lot lot-00
  - avant : `"なん / なに"`
  - après : `["なに (défaut)","なん"]`
  - raison : « Deux lectures d'un même sens ; la condition d'emploi de なん va dans la note de la lecture. »
- **D0073** · type-nul · sens 1 · semantic_type · validated · lot lot-00 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité grammaticale (interrogatif) : ni entité ni concept désigné, aucun type terminal ne s'applique. Addendum A6. »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_401_s1` | — | — | — | — | — | — | — | — |

## 2. いくら — `v_179` (ligne 362 ; `v_179_s1`)

### Fiche source `n5_v_179`

```json
{
 "id": "n5_v_179",
 "level": "N5",
 "word": "いくら",
 "word_furigana": "いくら",
 "reading": "いくら",
 "romaji": "ikura",
 "meanings": {
  "primary": "Combien",
  "secondary": [
   "Quel prix",
   "Combien ça coûte"
  ]
 },
 "nuance": "Mot interrogatif invariable utilisé exclusivement pour s'informer sur une valeur financière ou un montant à payer. Il s'écrit toujours en hiragana pour cet usage afin de ne pas le confondre avec son homophone culinaire qui désigne les œufs de saumon.",
 "type": "adverbe / pronom",
 "group": "quantité",
 "category": "achats_argent",
 "subcategory": "prix",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "この りんご は <ruby>幾<rt>いく</rt></ruby>ら です か 。",
  "romaji": "kono ringo wa ikura desu ka.",
  "french": "Combien **coûtent** ces pommes ?",
  "highlight": [
   "いくら",
   "ikura"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "この <ruby>新<rt>あたら</rt></ruby>しい カメラ は いくら です か",
  "romaji": "kono atarashii kamera wa ikura desu ka.",
  "french": "Combien **coûte** ce nouvel appareil photo ?",
  "highlight": [
   "いくら",
   "ikura"
  ]
 },
 {
  "japanese": "スーパー で <ruby>野菜<rt>やさい</rt></ruby> と <ruby>果物<rt>くだもの</rt></ruby> を たくさん <ruby>買<rt>か</rt></ruby>ったら、いくら に なりました か",
  "romaji": "suupaa de yasai to kudamono o takusan kattara, ikura ni narimashita ka.",
  "french": "Combien cela a-t-il coûté après avoir acheté beaucoup de légumes et de fruits au supermarché ?",
  "highlight": [
   "いくら",
   "ikura"
  ]
 },
 {
  "japanese": "この <ruby>辞書<rt>じしょ</rt></ruby> は いくら です か。— それ は <ruby>2<rt>に</rt></ruby><ruby>千<rt>せん</rt></ruby><ruby>円<rt>えん</rt></ruby> です",
  "romaji": "kono jisho wa ikura desu ka. -- sore wa nisen en desu.",
  "french": "Combien **coûte** ce dictionnaire ? — Il coûte 2 000 yens.",
  "highlight": [
   "いくら",
   "ikura"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_179",
 "level": "N5",
 "word": "いくら",
 "writings": [],
 "readings": [
  {
   "kana": "いくら",
   "romaji": "ikura",
   "furigana": "いくら",
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
 "nuance": "Pour demander un prix ou un montant : いくらですか, combien est-ce ?",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_179_s1",
   "meaning": {
    "primary": "Combien",
    "alternatives": [
     "Quel prix"
    ]
   },
   "category": {
    "level_1": "economie_commerce",
    "level_2": "prix_valeur_economique",
    "level_3": "prix"
   },
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions historiques (4, dont 1 `type-nul`)

- **D0371** · decision · tags · validated · lot lot-05
  - avant : `["lieu_konbini"]`
  - après : `[]`
  - raison : « Mot du commerce en général, pas du vocabulaire d'action propre au konbini (critère des tags de lieu du lot 02) : on peut l'employer au konbini comme dans tout magasin. Candidat écarté. »
- **D0372** · decision · grammatical_class · validated · lot lot-05
  - avant : `"adverbe / pronom (ancien type)"`
  - après : `"pronom"`
  - raison : « Classe pronom (arbitrage du lot 05), confirmée par la source : « mot interrogatif invariable utilisé exclusivement pour s'informer sur une valeur financière ou un montant ». L'emploi いくら…ても n'est pas documenté et ne fonde ni une autre classe ni un autre sens. group: null (pronom). »
- **D0373** · type-nul · sens 1 · semantic_type · validated · lot lot-05 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Pronom interrogatif : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何, lot 0). Addendum A6. »
- **D0374** · abandon · senses · validated · lot lot-05
  - avant : `["Combien ça coûte"]`
  - après : `null`
  - raison : « Traduction de いくらですか, reprise dans la nuance. »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_179_s1` | — | — | — | — | — | — | — | — |

## 3. どっち — `v_343` (ligne 363 ; `v_343_s1`)

### Fiche source `n5_v_343`

```json
{
 "id": "n5_v_343",
 "level": "N5",
 "word": "どっち",
 "word_furigana": "どっち",
 "reading": "どっち",
 "romaji": "docchi",
 "meanings": {
  "primary": "Lequel (familier)",
  "secondary": [
   "Par où",
   "Quel côté (entre deux options)"
  ]
 },
 "nuance": "**Pronom** interrogatif familier de la série Do désignant un choix entre deux directions ou deux éléments (version plus informelle de *dono hō* ou *dochira*). Les romajis associés sont (*docchi*).",
 "type": "nom",
 "group": "nom",
 "category": "position_direction",
 "subcategory": "demonstratifs_direction",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "**どっち** が すき です か 。",
  "romaji": "docchi ga suki desu ka.",
  "french": "Lequel préfères-tu ?",
  "highlight": [
   "どっち",
   "docchi"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "りんご と みかん、<ruby>どっち<rt>どっち</rt></ruby> の <ruby>方<rt>ほう</rt></ruby> が <ruby>甘<rt>あま</rt></ruby>い ですか",
  "romaji": "ringo to mikan, docchi no hou ga amai desu ka.",
  "french": "Entre la pomme et la mandarine, **lequel** est le plus sucré (familier) ?",
  "highlight": [
   "どっち",
   "docchi"
  ]
 },
 {
  "japanese": "<ruby>今年<rt>ことし</rt></ruby> の <ruby>夏<rt>なつ</rt></ruby> は <ruby>海<rt>うみ</rt></ruby> と <ruby>山<rt>やま</rt></ruby>、<ruby>どっち<rt>どっち</rt></ruby> に <ruby>行<rt>い</rt></ruby>く か まだ <ruby>決<rt>き</rt></mathml>まっていません",
  "romaji": "kotoshi no natsu wa umi to yama, docchi ni iku ka mada kimatte imasen.",
  "french": "Pour cet été, entre la mer et la montagne, je ne sais pas encore **lequel** des deux je vais choisir.",
  "highlight": [
   "どっち",
   "docchi"
  ]
 },
 {
  "japanese": "<ruby>道<rt>みち</rt></ruby> が <ruby>分<rt>わ</rt></ruby>かれ て いますが、<ruby>どっち<rt>どっち</rt></ruby> に <ruby>進<rt>すす</rt></ruby>めば いい ですか",
  "romaji": "michi ga wakarete imasu ga, docchi ni susumeba ii desu ka.",
  "french": "Le chemin se sépare, **lequel** des deux devrions-nous emprunter ?",
  "highlight": [
   "どっち",
   "docchi"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_343",
 "level": "N5",
 "word": "どっち",
 "writings": [],
 "readings": [
  {
   "kana": "どっち",
   "romaji": "docchi",
   "furigana": "どっち",
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
   "id": "v_343_s1",
   "meaning": {
    "primary": "Lequel (des deux)",
    "alternatives": [
     "Par où"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Familier ; plus poli : どちら. Pour deux éléments comme pour deux directions."
  }
 ]
}
```

### Décisions historiques (5, dont 1 `type-nul`)

- **D0696** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0697** · decision · grammatical_class · validated · lot lot-11
  - avant : `"nom (mécanique, d'après l'ancien type)"`
  - après : `"pronom"`
  - raison : « Classe mécanique insuffisante : l'ancien rangement l'avait typé « nom », alors que la fiche le décrit comme « pronom interrogatif familier de la série Do ». La cohérence du paradigme (どちら, どれ : pronom) sert de contrôle, non de source. group: null (A2-02). »
- **D0698** · decision · senses · validated · lot lot-11
  - avant : `["Lequel (familier)","Par où","Quel côté (entre deux options)"]`
  - après : `"un seul sens"`
  - raison : « Un seul sens : la fiche présente une seule notion, « un choix entre deux directions ou deux éléments », contrairement à どちら dont la fiche énumère des emplois distincts. »
- **D0699** · abandon · senses · validated · lot lot-11
  - avant : `["Quel côté (entre deux options)"]`
  - après : `null`
  - raison : « Redondant. »
- **D0700** · decision · tags · validated · lot lot-11
  - avant : `["lieu_gare"]`
  - après : `[]`
  - raison : « lieu_gare (ancienne catégorie position_direction) écarté : démonstratif ou interrogatif d'usage général, qui s'emploie partout ; l'indiquer dans une gare ne le rend pas propre à la gare (critère des tags de lieu du lot 02). »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_343_s1` | — | — | — | — | — | — | — | — |

## 4. いかが — `v_390` (ligne 364 ; `v_390_s1`)

### Fiche source `n5_v_390`

```json
{
 "id": "n5_v_390",
 "level": "N5",
 "word": "いかが",
 "word_furigana": "いかが",
 "reading": "いかが",
 "romaji": "ikaga",
 "meanings": {
  "primary": "Comment (poli)",
  "secondary": [
   "Comment ça va ?",
   "De quelle manière"
  ]
 },
 "nuance": "**Adverbe interrogatif** poli (équivalent formel de *dō* <ruby>どう<rt>どう</rt></ruby>) utilisé pour demander l'état, l'avis ou la manière de faire de quelqu'un. Les romajis associés sont (*ikaga*).",
 "type": "adverbe",
 "group": "interrogatif",
 "category": "questions",
 "subcategory": "raison_maniere",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "きょう の ちょうし は **いかが** です か 。",
  "romaji": "kyou no choushi wa ikaga desu ka.",
  "french": "Comment va votre forme aujourd'hui ?",
  "highlight": [
   "いかが",
   "ikaga"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> の <ruby>天気<rt>てんき</rt></ruby> は <ruby>如何<rt>いかが</rt></ruby> ですか",
  "romaji": "ashita no tenki wa ikaga desu ka.",
  "french": "Quel temps fera-t-il **demain** ?",
  "highlight": [
   "いかが",
   "ikaga"
  ]
 },
 {
  "japanese": "この <ruby>料理<rt>りょうり</rt></ruby> の <ruby>味<rt>あじ</rt></ruby> は <ruby>如何<rt>いかが</rt></ruby> ですか",
  "romaji": "kono ryouri no aji wa ikaga desu ka.",
  "french": "Quel est le goût de ce **plat** ?",
  "highlight": [
   "いかが",
   "ikaga"
  ]
 },
 {
  "japanese": "<ruby>一緒<rt>いっしょ</rt></ruby> に <ruby>映画<rt>えいが</rt></ruby> を <ruby>見<rt>み</rt></ruby>に <ruby>行<rt>い</rt></ruby>きませんか。「いいですね、<ruby>如何<rt>いかが</rt></ruby> しましょうか」",
  "romaji": "issho ni eiga o mi ni ikimasen ka. 'ii desu ne, ikaga shimashou ka.'",
  "french": "Voulez-vous aller voir un film **ensemble** ? « C'est une bonne idée, qu'allons-nous faire ? »",
  "highlight": [
   "いかが",
   "ikaga"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_390",
 "level": "N5",
 "word": "いかが",
 "writings": [],
 "readings": [
  {
   "kana": "いかが",
   "romaji": "ikaga",
   "furigana": "いかが",
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
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_390_s1",
   "meaning": {
    "primary": "Comment (poli)",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Forme polie de どう : いかがですか, comment allez-vous ?, qu'en pensez-vous ? Aussi pour proposer : お茶はいかがですか."
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0718** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0719** · abandon · senses · validated · lot lot-11
  - avant : `["Comment ça va ?","De quelle manière"]`
  - après : `null`
  - raison : « Traductions d'emplois, reprises dans la nuance. »

### Corrections retenues, non appliquées (1)

| Id | Unité | Champ | … |
|---|---|---|---|
| V2-139 | `v_390_s1` | いかが | 11 | `nuance` (sens 1) | « Forme polie de どう : いかがですか, comment allez-vous ?, qu'en pensez-vous ? », sans la phrase sur la proposition ni お茶はいかがですか. |

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_390_s1` | — | — | — | — | — | — | — | — |

## 5. いつ — `v_391` (ligne 365 ; `v_391_s1`)

### Fiche source `n5_v_391`

```json
{
 "id": "n5_v_391",
 "level": "N5",
 "word": "いつ",
 "word_furigana": "いつ",
 "reading": "いつ",
 "romaji": "itsu",
 "meanings": {
  "primary": "Quand",
  "secondary": [
   "À quel moment"
  ]
 },
 "nuance": "**Pronom interrogatif** temporel utilisé pour poser la question sur le moment d'un événement passé, présent ou futur. Les romajis associés sont (*itsu*).",
 "type": "pronom",
 "group": "nom",
 "category": "questions",
 "subcategory": "temps",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "にほん へ **いつ** きました か 。",
  "romaji": "nihon e itsu kimashita ka.",
  "french": "**Quand** êtes-vous venu au Japon ?",
  "highlight": [
   "いつ",
   "itsu"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "<ruby>日本<rt>にほん</rt></ruby> へ <ruby>行<rt>い</rt></ruby>きますか。「<ruby>来年<rt>らいねん</rt></ruby> の <ruby>春<rt>はる</rt></ruby> に <ruby>行<rt>い</rt></ruby>きます」",
  "romaji": "nihon e ikimasu ka. 'rainen no haru ni ikimasu.'",
  "french": "Quand allez-vous au **Japon** ? « J'y vais au printemps prochain. »",
  "highlight": [
   "いつ",
   "itsu"
  ]
 },
 {
  "japanese": "<ruby>試験<rt>しけん</rt></ruby> は いつ ですか。「<ruby>来週<rt>らいしゅう</rt></ruby> の <ruby>月曜日<rt>げつようび</rt></ruby> です」",
  "romaji": "shiken wa itsu desu ka. 'raishuu no getsuyoubi desu.'",
  "french": "Quand est l'**examen** ? « C'est lundi prochain. »",
  "highlight": [
   "いつ",
   "itsu"
  ]
 },
 {
  "japanese": "いつ <ruby>東京<rt>とうきょう</rt></ruby> に <ruby>着<rt>つ</rt></ruby>きましたか。「<ruby>昨日<rt>きのう</rt></ruby> の <ruby>夜<rt>よる</rt></ruby> <ruby>着<rt>つ</rt></ruby>きました」",
  "romaji": "itsu tōkyō ni tsuimashita ka. 'kinou no yoru tsuimashita.'",
  "french": "Quand êtes-vous arrivé à **Tokyo** ? « Je suis arrivé hier soir. »",
  "highlight": [
   "いつ",
   "itsu"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_391",
 "level": "N5",
 "word": "いつ",
 "writings": [],
 "readings": [
  {
   "kana": "いつ",
   "romaji": "itsu",
   "furigana": "いつ",
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
   "id": "v_391_s1",
   "meaning": {
    "primary": "Quand",
    "alternatives": [
     "À quel moment"
    ]
   },
   "category": {
    "level_1": "temps"
   },
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   }
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0712** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0713** · decision · grammatical_class · validated · lot lot-11
  - avant : `"pronom / nom (ancien type, exception de classe)"`
  - après : `"pronom"`
  - raison : « Classe mécanique inapplicable (exception) : la fiche le décrit comme « pronom interrogatif temporel », comme 何 et いくら. group: null (A2-02). »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_391_s1` | — | — | — | — | — | — | — | — |

## 6. どう — `v_393` (ligne 366 ; `v_393_s1`)

### Fiche source `n5_v_393`

```json
{
 "id": "n5_v_393",
 "level": "N5",
 "word": "どう",
 "word_furigana": "どう",
 "reading": "どう",
 "romaji": "dou",
 "meanings": {
  "primary": "Comment",
  "secondary": [
   "De quelle manière",
   "De quel avis"
  ]
 },
 "nuance": "**Adverbe interrogatif** (forme neutre/courante) utilisé pour demander la manière de faire, l'état d'une chose, ou pour solliciter l'avis de quelqu'un. Les romajis associés sont (*dou*).",
 "type": "adverbe",
 "group": "interrogatif",
 "category": "questions",
 "subcategory": "raison_maniere",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "この りょうり は **どう** です か 。",
  "romaji": "kono ryouri wa dou desu ka.",
  "french": "**Comment** trouvez-vous ce plat ?",
  "highlight": [
   "どう",
   "dou"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> の <ruby>天気<rt>てんき</rt></ruby> は どう ですか",
  "romaji": "ashita no tenki wa dou desu ka.",
  "french": "Quel temps fera-t-il **demain** ?",
  "highlight": [
   "どう",
   "dou"
  ]
 },
 {
  "japanese": "この <ruby>料理<rt>りょうり</rt></ruby> の <ruby>味<rt>あじ</rt></ruby> は どう ですか",
  "romaji": "kono ryouri no aji wa dou desu ka.",
  "french": "Quel est le goût de ce **plat** ?",
  "highlight": [
   "どう",
   "dou"
  ]
 },
 {
  "japanese": "<ruby>日本語<rt>にほんご</rt></ruby> の <ruby>勉強<rt>べんきょう</rt></ruby> は どう ですか。「とても <ruby>面白<rt>おもしろ</rt></ruby>い です」",
  "romaji": "nihongo no benkyou wa dou desu ka. 'totemo omoshiroi desu.'",
  "french": "Comment se passe l'étude du **japonais** ? « C'est très intéressant. »",
  "highlight": [
   "どう",
   "dou"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_393",
 "level": "N5",
 "word": "どう",
 "writings": [],
 "readings": [
  {
   "kana": "どう",
   "romaji": "dou",
   "furigana": "どう",
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
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_393_s1",
   "meaning": {
    "primary": "Comment",
    "alternatives": [
     "De quelle manière"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "La manière, l'état, l'avis : どうですか, comment est-ce ?, qu'en pensez-vous ? Plus poli : いかが."
  }
 ]
}
```

### Décisions historiques (3, dont 1 `type-nul`)

- **D0705** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0706** · decision · senses · validated · lot lot-11
  - avant : `["Comment","De quelle manière","De quel avis"]`
  - après : `"un seul sens"`
  - raison : « Un seul sens : manière, état et avis sont des emplois du même « comment », énumérés par la fiche comme objets de la question. »
- **D0707** · abandon · senses · validated · lot lot-11
  - avant : `["De quel avis"]`
  - après : `null`
  - raison : « Repris dans la nuance. »

### Corrections retenues, non appliquées (1)

| Id | Unité | Champ | … |
|---|---|---|---|
| V2-140 | `v_393_s1` | どう | 11 | `nuance` (sens 1) | « La manière, l'état, l'avis : どうですか, comment est-ce ?, qu'en pensez-vous ? », sans le renvoi à いかが. |

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_393_s1` | — | — | — | — | — | — | — | — |

## 7. どうして — `v_394` (ligne 367 ; `v_394_s1`)

### Fiche source `n5_v_394`

```json
{
 "id": "n5_v_394",
 "level": "N5",
 "word": "どうして",
 "word_furigana": "どうして",
 "reading": "どうして",
 "romaji": "doushite",
 "meanings": {
  "primary": "Pourquoi",
  "secondary": [
   "Pour quelle raison",
   "Comment se fait-il que"
  ]
 },
 "nuance": "**Adverbe interrogatif** utilisé pour demander la cause ou la raison d'un fait (souvent suivi d'une réponse expliquant le motif avec la particule *-kara*). Les romajis associés sont (*doushite*).",
 "type": "adverbe",
 "group": "interrogatif",
 "category": "questions",
 "subcategory": "raison_maniere",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "**どうして** がっこう を やすみ まし た か 。",
  "romaji": "doushite gakkou o yasumi mashita ka.",
  "french": "**Pourquoi** avez-vous raté l'école ?",
  "highlight": [
   "どうして",
   "doushite"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "どうして <ruby>今日<rt>きょう</rt></ruby> は <ruby>学校<rt>がっこう</rt></ruby> を <ruby>休<rt>やす</rt></ruby>んだ の ですか",
  "romaji": "doushite kyou wa gakkou o yasunda no desu ka.",
  "french": "**Pourquoi** as-tu raté l'école aujourd'hui ?",
  "highlight": [
   "どうして",
   "doushite"
  ]
 },
 {
  "japanese": "どうして <ruby>日本語<rt>にほんご</rt></ruby> を <ruby>勉強<rt>べんきょう</rt></ruby> して いる の ですか。「アニメ が <ruby>好き<rt>すき</rt></ruby> だからです」",
  "romaji": "doushite nihongo o benkyou shite iru no desu ka. 'anime ga suki dakara desu.'",
  "french": "**Pourquoi** étudiez-vous le japonais ? « C'est parce que j'aime les animés. »",
  "highlight": [
   "どうして",
   "doushite"
  ]
 },
 {
  "japanese": "どうして <ruby>昨日<rt>きのう</rt></ruby> は <ruby>電話<rt>でんわ</rt></ruby> を しなかった の ですか",
  "romaji": "doushite kinou wa denwa o shinakatta no desu ka.",
  "french": "**Pourquoi** est-ce que tu n'as pas téléphoné hier ?",
  "highlight": [
   "どうして",
   "doushite"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_394",
 "level": "N5",
 "word": "どうして",
 "writings": [],
 "readings": [
  {
   "kana": "どうして",
   "romaji": "doushite",
   "furigana": "どうして",
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
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_394_s1",
   "meaning": {
    "primary": "Pourquoi",
    "alternatives": [
     "Comment se fait-il que"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Courant à l'oral ; la réponse explique souvent avec から."
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0716** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0717** · abandon · senses · validated · lot lot-11
  - avant : `["Pour quelle raison"]`
  - après : `null`
  - raison : « Redondant. »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_394_s1` | — | — | — | — | — | — | — | — |

## 8. どこ — `v_395` (ligne 368 ; `v_395_s1`)

### Fiche source `n5_v_395`

```json
{
 "id": "n5_v_395",
 "level": "N5",
 "word": "どこ",
 "word_furigana": "どこ",
 "reading": "どこ",
 "romaji": "doko",
 "meanings": {
  "primary": "Où",
  "secondary": [
   "Quel endroit"
  ]
 },
 "nuance": "**Pronom interrogatif** de lieu (série ko-so-a-do) utilisé pour demander l'emplacement d'une personne, d'un objet ou d'un lieu. Les romajis associés sont (*doko*).",
 "type": "pronom",
 "group": "nom",
 "category": "questions",
 "subcategory": "lieu",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "あなた の いえ は **どこ** です か 。",
  "romaji": "anata no ie wa doko desu ka.",
  "french": "**Où** se trouve votre maison ?",
  "highlight": [
   "どこ",
   "doko"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "あなたの <ruby>傘<rt>かさ</rt></ruby> は どこ に ありますか",
  "romaji": "anata no kasa wa doko ni arimasu ka.",
  "french": "**Où** est ton parapluie ?",
  "highlight": [
   "どこ",
   "doko"
  ]
 },
 {
  "japanese": "<ruby>トイレ<rt>といれ</rt></ruby> は どこ ですか。「あちら に あります」",
  "romaji": "toire wa doko desu ka. 'achira ni arimasu.'",
  "french": "**Où** sont les toilettes ? « C'est par là-bas. »",
  "highlight": [
   "どこ",
   "doko"
  ]
 },
 {
  "japanese": "どこ へ <ruby>旅行<rt>りょこう</rt></ruby> に <ruby>行<rt>い</rt></ruby>きますか。「<ruby>北海道<rt>ほっかいどう</rt></ruby> に <ruby>行<rt>い</rt></ruby>きます」",
  "romaji": "doko e ryokou ni ikimasu ka. 'hokkaidoo ni ikimasu.'",
  "french": "**Où** allez-vous en voyage ? « Je vais à Hokkaido. »",
  "highlight": [
   "どこ",
   "doko"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_395",
 "level": "N5",
 "word": "どこ",
 "writings": [],
 "readings": [
  {
   "kana": "どこ",
   "romaji": "doko",
   "furigana": "どこ",
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
   "id": "v_395_s1",
   "meaning": {
    "primary": "Où",
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
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "トイレはどこですか : où sont les toilettes ?"
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0652** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0653** · abandon · senses · validated · lot lot-11
  - avant : `["Quel endroit"]`
  - après : `null`
  - raison : « Redondant. »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_395_s1` | — | — | — | — | — | — | — | — |

## 9. どちら — `v_396` (lignes 369, 370, 371 ; `v_396_s1`, `v_396_s2`, `v_396_s3`)

### Fiche source `n5_v_396`

```json
{
 "id": "n5_v_396",
 "level": "N5",
 "word": "どちら",
 "word_furigana": "どちら",
 "reading": "どちら",
 "romaji": "dochira",
 "meanings": {
  "primary": "Lequel (entre deux)",
  "secondary": [
   "Où (poli)",
   "Vers où",
   "Qui (poli)"
  ]
 },
 "nuance": "**Pronom interrogatif** poli (forme polie de *dore* <ruby>どれ<rt>どれ</rt></gy> ou *docchi* <ruby>どっち<rt>どっち</rt></ruby>) utilisé pour choisir entre deux options, désigner une direction polie, ou demander l'origine / l'identité de quelqu'un de façon respectueuse. Les romajis associés sont (*dochira*).",
 "type": "pronom",
 "group": "nom",
 "category": "questions",
 "subcategory": "interrogatifs",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "コーヒー と こうちゃ と 、 **どちら** が すき です か 。",
  "romaji": "koohii to koucha to, dochira ga suki desu ka.",
  "french": "Entre le café et le thé, **lequel** préférez-vous ?",
  "highlight": [
   "どちら",
   "dochira"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "リンゴ と バナナ、どちら が <ruby>好き<rt>すき</rt></ruby> ですか",
  "romaji": "ringo to banana, dochira ga suki desu ka.",
  "french": "Entre la pomme et la banane, **lequel** préférez-vous ?",
  "highlight": [
   "どちら",
   "dochira"
  ]
 },
 {
  "japanese": "<ruby>右<rt>みぎ</rt></ruby> と <ruby>左<rt>ひだり</rt></ruby>、どちら に <ruby>曲<rt>ま</rt></ruby>がりますか",
  "romaji": "migi to hidari, dochira ni magarimasu ka.",
  "french": "À droite ou à gauche, de **quel** côté tournez-vous ?",
  "highlight": [
   "どちら",
   "dochira"
  ]
 },
 {
  "japanese": "お<ruby>国<rt>くに</rt></ruby> は どちら ですか。「フランス です」",
  "romaji": "okuni wa dochira desu ka. 'furansu desu.'",
  "french": "De **quel** pays êtes-vous originaire ? « Je suis de France. »",
  "highlight": [
   "どちら",
   "dochira"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_396",
 "level": "N5",
 "word": "どちら",
 "writings": [],
 "readings": [
  {
   "kana": "どちら",
   "romaji": "dochira",
   "furigana": "どちら",
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
 "nuance": "Forme polie ; plus familier : どっち, どれ, どこ.",
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_396_s1",
   "meaning": {
    "primary": "Lequel (des deux)",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Pour choisir entre deux : コーヒーと紅茶とどちらがいいですか."
  },
  {
   "id": "v_396_s2",
   "meaning": {
    "primary": "Où (poli)",
    "alternatives": [
     "Quelle direction"
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
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Forme polie de どこ : お国はどちらですか, d'où venez-vous ?"
  },
  {
   "id": "v_396_s3",
   "meaning": {
    "primary": "Qui (poli)",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "どちら様ですか : à qui ai-je l'honneur ?"
  }
 ]
}
```

### Décisions historiques (5, dont 3 `type-nul`)

- **D0681** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0682** · type-nul · sens 2 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0683** · type-nul · sens 3 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0684** · decision · senses · validated · lot lot-11
  - avant : `["Lequel (entre deux)","Où (poli)","Vers où","Qui (poli)"]`
  - après : `["S1 Lequel (des deux)","S2 Où (poli)","S3 Qui (poli)"]`
  - raison : « Trois sens documentés par la fiche, qui les énumère (« choisir entre deux options, désigner une direction polie, ou demander l'origine / l'identité de quelqu'un ») : un choix, un lieu, une personne. Les trois sont interrogatifs. À ARBITRER : nombre de sens. »
- **D0685** · abandon · senses · validated · lot lot-11
  - avant : `["Vers où"]`
  - après : `null`
  - raison : « Redondant avec « Où ». »

### Corrections retenues, non appliquées (4)

| Id | Unité | Champ | … |
|---|---|---|---|
| V2-133 | `v_396_s1` | どちら | 11 | `nuance` (sens 1) | « Pour choisir entre deux : コーヒーとこうちゃと、どちらがすきですか. », la forme de l'exemple de la fiche, sans 紅茶 ni いい. |
| V2-134 | `v_396_s2` | どちら | 11 | `nuance` (sens 2) | « Forme polie : お国はどちらですか, d'où venez-vous ? », sans le renvoi à どこ. |
| V2-135 | `v_396_s3` | どちら | 11 | `nuance` (sens 3) | « Pour demander l'identité de quelqu'un de façon respectueuse. », d'après la fiche, sans exemple japonais. |
| V2-136 | `v_396` | どちら | 11 | `nuance` (ENTRY) | « Forme polie ; plus familier : どっち, どれ. », sans どこ. |

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_396_s1` | — | — | — | — | — | — | — | — |
| `v_396_s2` | — | — | — | — | — | — | — | — |
| `v_396_s3` | — | — | — | — | — | — | — | — |

## 10. どなた — `v_397` (ligne 372 ; `v_397_s1`)

### Fiche source `n5_v_397`

```json
{
 "id": "n5_v_397",
 "level": "N5",
 "word": "どなた",
 "word_furigana": "どなた",
 "reading": "どなた",
 "romaji": "donata",
 "meanings": {
  "primary": "Qui (poli)",
  "secondary": [
   "Laquelle de ces personnes"
  ]
 },
 "nuance": "**Pronom interrogatif** honorifique / poli (équivalent respectueux de *dare* <ruby>誰<rt>だれ</rt></gy>) utilisé pour demander l'identité d'une personne. Les romajis associés sont (*donata*).",
 "type": "pronom",
 "group": "nom",
 "category": "questions",
 "subcategory": "interrogatifs",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "あの ひと は **どなた** です か 。",
  "romaji": "ano hito wa donata desu ka.",
  "french": "Qui est cette personne ? (poli)",
  "highlight": [
   "どなた",
   "donata"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "あの <ruby>親切<rt>しんせつ</rt></ruby> な <ruby>方<rt>かた</rt></ruby> は どなた ですか",
  "romaji": "ano shinsetsu na kata wa donata desu ka.",
  "french": "Cette personne aimable, c'est **qui** ?",
  "highlight": [
   "どなた",
   "donata"
  ]
 },
 {
  "japanese": "この ペン を <ruby>落<rt>お</rt></ruby>とした の は どなた ですか",
  "romaji": "kono pen o otoshita no wa donata desu ka.",
  "french": "C'est **qui** qui a fait tomber ce stylo ?",
  "highlight": [
   "どなた",
   "donata"
  ]
 },
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> の パーティー に はどなた が <ruby>来<rt>き</rt></ruby>ますか",
  "romaji": "ashita no paatii ni wa donata ga kimasu ka.",
  "french": "**Qui** vient à la fête de demain ?",
  "highlight": [
   "どなた",
   "donata"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_397",
 "level": "N5",
 "word": "どなた",
 "writings": [],
 "readings": [
  {
   "kana": "どなた",
   "romaji": "donata",
   "furigana": "どなた",
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
   "id": "v_397_s1",
   "meaning": {
    "primary": "Qui (poli)",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Forme polie de 誰."
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0710** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0711** · abandon · senses · validated · lot lot-11
  - avant : `["Laquelle de ces personnes"]`
  - après : `null`
  - raison : « Redondant. »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_397_s1` | — | — | — | — | — | — | — | — |

## 11. どの — `v_398` (ligne 373 ; `v_398_s1`)

### Fiche source `n5_v_398`

```json
{
 "id": "n5_v_398",
 "level": "N5",
 "word": "どの",
 "word_furigana": "どの",
 "reading": "どの",
 "romaji": "dono",
 "meanings": {
  "primary": "Quel ... ?",
  "secondary": [
   "Parmi plusieurs, lequel..."
  ]
 },
 "nuance": "**Adjectif interrogatif** se plaçant devant un nom pour demander 'quel' objet choisir parmi plusieurs. Il commence par ど (*do*), la syllabe universelle en japonais pour poser une question, comme dans どこ (*doko*)où ou どれ (*dore*) lequel.",
 "type": "adjectif",
 "group": "interrogatif",
 "category": "questions",
 "subcategory": "interrogatifs",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "**どの** ほん が あなた の です か 。",
  "romaji": "dono hon ga anata no desu ka.",
  "french": "**Quel** livre est le vôtre ?",
  "highlight": [
   "どの",
   "dono"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "どの <ruby>本<rt>ほん</rt></ruby> が あなた の ですか",
  "romaji": "dono hon ga anata no desu ka.",
  "french": "**Quel** livre est le vôtre ?",
  "highlight": [
   "どの",
   "dono"
  ]
 },
 {
  "japanese": "どの <ruby>傘<rt>かさ</rt></ruby> を <ruby>買<rt>か</rt></ruby>いますか",
  "romaji": "dono kasa o kaimasu ka.",
  "french": "**Quel** parapluie achetez-vous ?",
  "highlight": [
   "どの",
   "dono"
  ]
 },
 {
  "japanese": "どの <ruby>人<rt>ひと</rt></ruby> が お<ruby>医者<rt>いしゃ</rt></ruby> さん ですか",
  "romaji": "dono hito ga oisha san desu ka.",
  "french": "**Quelle** personne est le médecin ?",
  "highlight": [
   "どの",
   "dono"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_398",
 "level": "N5",
 "word": "どの",
 "writings": [],
 "readings": [
  {
   "kana": "どの",
   "romaji": "dono",
   "furigana": "どの",
   "default": true,
   "note": null
  }
 ],
 "linguistic": {
  "grammatical_class": "determinant",
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
   "id": "v_398_s1",
   "meaning": {
    "primary": "Quel …",
    "alternatives": [
     "Lequel"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Toujours devant un nom : どの本ですか, quel livre ?"
  }
 ]
}
```

### Décisions historiques (3, dont 1 `type-nul`)

- **D0664** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0665** · decision · grammatical_class · validated · lot lot-11
  - avant : `"adjectif / interrogatif (ancien type, exception de classe)"`
  - après : `"determinant"`
  - raison : « Classe mécanique inapplicable (exception) : la fiche dit que どの « se place devant un nom » ; il ne s'emploie jamais seul. Déterminant interrogatif, comme この, その, あの sont des déterminants démonstratifs. group: null (A2-02). »
- **D0666** · abandon · senses · validated · lot lot-11
  - avant : `["Parmi plusieurs, lequel..."]`
  - après : `null`
  - raison : « Repris par « Lequel ». »

### Corrections retenues, non appliquées (1)

| Id | Unité | Champ | … |
|---|---|---|---|
| V2-137 | `v_398_s1` | どの | 11 | `nuance` (sens 1) | « Toujours devant un nom : どの本, quel livre ? », la suite de l'ancien exemple, sans ですか. |

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_398_s1` | — | — | — | — | — | — | — | — |

## 12. どれ — `v_399` (ligne 374 ; `v_399_s1`)

### Fiche source `n5_v_399`

```json
{
 "id": "n5_v_399",
 "level": "N5",
 "word": "どれ",
 "word_furigana": "どれ",
 "reading": "どれ",
 "romaji": "dore",
 "meanings": {
  "primary": "Lequel",
  "secondary": [
   "Laquel",
   "Lesquels (parmi trois choix ou plus)"
  ]
 },
 "nuance": "**Pronom interrogatif** (de la série ko-so-a-do) utilisé pour identifier un élément spécifique parmi un groupe de trois objets ou plus. Les romajis associés sont (*dore*).",
 "type": "pronom",
 "group": "nom",
 "category": "questions",
 "subcategory": "interrogatifs",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "あなた の かさ は **どれ** です か 。",
  "romaji": "anata no kasa wa dore desu ka.",
  "french": "**Lequel** est votre parapluie ?",
  "highlight": [
   "どれ",
   "dore"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "あなた の <ruby>傘<rt>かさ</rt></ruby> は どれ ですか",
  "romaji": "anata no kasa wa dore desu ka.",
  "french": "**Lequel** est votre parapluie ?",
  "highlight": [
   "どれ",
   "dore"
  ]
 },
 {
  "japanese": "この <ruby>中<rt>なか</rt></ruby> から どれ を <ruby>選<rt>えら</rt></ruby>びますか",
  "romaji": "kono naka kara dore o erabimasu ka.",
  "french": "**Lequel** choisissez-vous parmi ceux-ci ?",
  "highlight": [
   "どれ",
   "dore"
  ]
 },
 {
  "japanese": "おいしい ケーキ は どれ ですか。「この <ruby>苺<rt>いちご</rt></ruby> の ケーキ です」",
  "romaji": "oishii keeki wa dore desu ka. 'kono ichigo no keeki desu.'",
  "french": "**Lequel** est le gâteau délicieux ? « C'est ce gâteau aux fraises. »",
  "highlight": [
   "どれ",
   "dore"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_399",
 "level": "N5",
 "word": "どれ",
 "writings": [],
 "readings": [
  {
   "kana": "どれ",
   "romaji": "dore",
   "furigana": "どれ",
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
   "id": "v_399_s1",
   "meaning": {
    "primary": "Lequel",
    "alternatives": [
     "Laquelle"
    ]
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Parmi trois éléments ou plus ; entre deux, どちら ou どっち."
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0641** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0642** · abandon · senses · validated · lot lot-11
  - avant : `["Lesquels (parmi trois choix ou plus)"]`
  - après : `null`
  - raison : « Précision reprise dans la nuance. »

### Corrections retenues, non appliquées (1)

| Id | Unité | Champ | … |
|---|---|---|---|
| V2-138 | `v_399_s1` | どれ | 11 | `nuance` (sens 1) | « Parmi trois éléments ou plus. », sans le renvoi à どちら ni à どっち. |

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_399_s1` | — | — | — | — | — | — | — | — |

## 13. なぜ — `v_400` (ligne 375 ; `v_400_s1`)

### Fiche source `n5_v_400`

```json
{
 "id": "n5_v_400",
 "level": "N5",
 "word": "なぜ",
 "word_furigana": "なぜ",
 "reading": "なぜ",
 "romaji": "naze",
 "meanings": {
  "primary": "Pourquoi",
  "secondary": [
   "Pour quelle raison"
  ]
 },
 "nuance": "**Adverbe interrogatif** exprimant la cause ou la raison, d'un usage un peu plus formel ou littéraire que *doushite*.",
 "type": "adverbe",
 "group": "interrogatif",
 "category": "questions",
 "subcategory": "raison_maniere",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "**なぜ** おかね を つかい まし た か 。",
  "romaji": "naze okane o tsukai mashita ka.",
  "french": "**Pourquoi** avez-vous dépensé de l'argent ?",
  "highlight": [
   "なぜ",
   "naze"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "なぜ <ruby>今日<rt>きょう</rt></ruby> は <ruby>早<rt>はや</rt></ruby>く <ruby>家<rt>いえ</rt></ruby> を <ruby>出<rt>で</rt></ruby>た の ですか",
  "romaji": "naze kyou wa hayaku ie o deta no desu ka.",
  "french": "**Pourquoi** es-tu parti de la maison tôt aujourd'hui ?",
  "highlight": [
   "なぜ",
   "naze"
  ]
 },
 {
  "japanese": "なぜ <ruby>日本語<rt>にほんご</rt></ruby> を <ruby>勉強<rt>べんきょう</rt></ruby> して いる の ですか。「<ruby>日本<rt>にほん</rt></ruby> に <ruby>行<rt>い</rt></ruby>きたいからです」",
  "romaji": "naze nihongo o benkyou shite iru no desu ka. 'nihon ni ikitai kara desu.'",
  "french": "**Pourquoi** étudiez-vous le japonais ? « C'est parce que je veux aller au Japon. »",
  "highlight": [
   "なぜ",
   "naze"
  ]
 },
 {
  "japanese": "なぜ <ruby>昨日<rt>きのう</rt></ruby> は <ruby>授業<rt>じぎょう</rt></ruby> を <ruby>休<rt>やす</rt></ruby>んだ の ですか",
  "romaji": "naze kinou wa jugyou o yasunda no desu ka.",
  "french": "**Pourquoi** as-tu raté le cours hier ?",
  "highlight": [
   "なぜ",
   "naze"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_400",
 "level": "N5",
 "word": "なぜ",
 "writings": [],
 "readings": [
  {
   "kana": "なぜ",
   "romaji": "naze",
   "furigana": "なぜ",
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
 "nuance": null,
 "tags": [],
 "retired_sense_ids": [],
 "senses": [
  {
   "id": "v_400_s1",
   "meaning": {
    "primary": "Pourquoi",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Un peu plus formel ou écrit que どうして."
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0714** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0715** · abandon · senses · validated · lot lot-11
  - avant : `["Pour quelle raison"]`
  - après : `null`
  - raison : « Redondant. »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_400_s1` | — | — | — | — | — | — | — | — |

## 14. 誰 — `v_402` (ligne 376 ; `v_402_s1`)

### Fiche source `n5_v_402`

```json
{
 "id": "n5_v_402",
 "level": "N5",
 "word": "誰",
 "word_furigana": "<ruby>誰<rt>だれ</rt></ruby>",
 "reading": "だれ",
 "romaji": "dare",
 "meanings": {
  "primary": "Qui",
  "secondary": [
   "Laquelle de ces personnes"
  ]
 },
 "nuance": "**Pronom interrogatif** utilisé pour demander l'identité d'une personne (équivalent standard et courant de *donata*). Les romajis associés sont (*dare*).",
 "type": "pronom",
 "group": "nom",
 "category": "questions",
 "subcategory": "interrogatifs",
 "kanji_list": [
  "誰"
 ],
 "particles": [],
 "example": {
  "japanese": "あの ひと は **<ruby>誰<rt>だれ</rt></ruby>** です か 。",
  "romaji": "ano hito wa dare desu ka.",
  "french": "**Qui** est cette personne ?",
  "highlight": [
   "誰",
   "dare"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "あの <ruby>人<rt>ひと</rt></ruby> は <ruby>誰<rt>だれ</rt></ruby> ですか",
  "romaji": "ano hito wa dare desu ka.",
  "french": "C'est **qui** cette personne ?",
  "highlight": [
   "誰",
   "dare"
  ]
 },
 {
  "japanese": "この ペン を <ruby>持<rt>も</rt></ruby>ってきた の は <ruby>誰<rt>だれ</rt></ruby> ですか",
  "romaji": "kono pen o mottekita no wa dare desu ka.",
  "french": "C'est **qui** qui a apporté ce stylo ?",
  "highlight": [
   "誰",
   "dare"
  ]
 },
 {
  "japanese": "<ruby>明日<rt>あした</rt></ruby> の パーティー に は <ruby>誰<rt>だれ</rt></ruby> が <ruby>来<rt>き</rt></ruby>ますか",
  "romaji": "ashita no paatii ni wa dare ga kimasu ka.",
  "french": "**Qui** vient à la fête de demain ?",
  "highlight": [
   "誰",
   "dare"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_402",
 "level": "N5",
 "word": "誰",
 "writings": [],
 "readings": [
  {
   "kana": "だれ",
   "romaji": "dare",
   "furigana": "<ruby>誰<rt>だれ</rt></ruby>",
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
   "id": "v_402_s1",
   "meaning": {
    "primary": "Qui",
    "alternatives": []
   },
   "category": null,
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Plus poli : どなた."
  }
 ]
}
```

### Décisions historiques (2, dont 1 `type-nul`)

- **D0708** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0709** · abandon · senses · validated · lot lot-11
  - avant : `["Laquelle de ces personnes"]`
  - après : `null`
  - raison : « Redondant. »

### Corrections retenues, non appliquées (0)

Aucune.

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_402_s1` | — | — | — | — | — | — | — | — |

## 15. いくつ — `v_585` (ligne 377 ; `v_585_s1`)

### Fiche source `n5_v_585`

```json
{
 "id": "n5_v_585",
 "level": "N5",
 "word": "いくつ",
 "word_furigana": "いくつ",
 "reading": "いくつ",
 "romaji": "ikutsu",
 "meanings": {
  "primary": "Combien",
  "secondary": [
   "Quel âge",
   "Combien de pièces (objets généraux)"
  ]
 },
 "nuance": "**Pronom interrogatif** utilisé pour demander la quantité d'objets indénombrables/généraux (avec le compteur par défaut) ou pour demander l'âge de quelqu'un (particulièrement d'un enfant).",
 "type": "adverbe",
 "group": "adverbe",
 "category": "questions",
 "subcategory": "quantite",
 "kanji_list": [],
 "particles": [],
 "example": {
  "japanese": "りんご を **いくつ** かい まし た か 。",
  "romaji": "ringo o ikutsu kaimashita ka.",
  "french": "**Combien** de pommes avez-vous achetées ?",
  "highlight": [
   "いくつ",
   "ikutsu"
  ]
 }
}
```

### Anciens exemples (3)

```json
[
 {
  "japanese": "りんご を いくつ <ruby>買<rt>か</rt></ruby>いたい です か",
  "romaji": "ringo o ikutsu kaitai desu ka.",
  "french": "Combien de pommes voulez-vous **acheter** ?",
  "highlight": [
   "いくつ",
   "ikutsu"
  ]
 },
 {
  "japanese": "「この りんご は いくつ で すか」「3 つ で 300 <ruby>円<rt>えん</rt></ruby> です」",
  "romaji": "'kono ringo wa ikutsu desu ka' 'mittsu de sanbyaku-en desu.'",
  "french": "« **Combien** de ces pommes y a-t-il ? » / « **Combien** coûtent-elles ? » (Ici : « Il y en a trois pour 300 yens »)",
  "highlight": [
   "いくつ",
   "ikutsu"
  ]
 },
 {
  "japanese": "<ruby>家族<rt>かぞく</rt></ruby> は いくつ の <ruby>年齢<rt>ねんれい</rt></ruby> (または: <ruby>何人<rt>なんにん</rt></ruby>) です か",
  "romaji": "kazoku wa ikutsu no nenrei desu ka.",
  "french": "Quel âge ont les membres de votre famille ? (**Combien** d'années... ?)",
  "highlight": [
   "いくつ",
   "ikutsu"
  ]
 }
]
```

### ENTRY publiée

```json
{
 "id": "v_585",
 "level": "N5",
 "word": "いくつ",
 "writings": [],
 "readings": [
  {
   "kana": "いくつ",
   "romaji": "ikutsu",
   "furigana": "いくつ",
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
   "id": "v_585_s1",
   "meaning": {
    "primary": "Combien",
    "alternatives": []
   },
   "category": {
    "level_1": "nombres_quantification"
   },
   "semantic_type": null,
   "dimensions": [],
   "relations": [],
   "linguistic_functions": {
    "grammatical": [
     "interrogatif"
    ],
    "pragmatic_discourse": []
   },
   "nuance": "Pour un nombre d'objets, avec le compteur général 〜つ ; aussi pour l'âge : おいくつですか, quel âge avez-vous ?"
  }
 ]
}
```

### Décisions historiques (4, dont 1 `type-nul`)

- **D0720** · type-nul · sens 1 · semantic_type · validated · lot lot-11 · **à examiner selon A6**
  - avant : `null`
  - après : `null`
  - raison : « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. »
- **D0721** · decision · grammatical_class · validated · lot lot-11
  - avant : `"adverbe (mécanique, d'après l'ancien type)"`
  - après : `"pronom"`
  - raison : « Classe mécanique insuffisante : l'ancien type « adverbe » ne correspond pas à la fiche, qui le décrit comme « pronom interrogatif » demandant une quantité ou un âge ; même décision que いくら (lot 05). group: null (A2-02). »
- **D0722** · decision · senses · validated · lot lot-11
  - avant : `["Combien","Quel âge","Combien de pièces (objets généraux)"]`
  - après : `"un seul sens"`
  - raison : « Un seul sens : l'âge est un nombre d'années, la question reste « combien » ; repris dans la nuance. »
- **D0723** · abandon · senses · validated · lot lot-11
  - avant : `["Quel âge","Combien de pièces (objets généraux)"]`
  - après : `null`
  - raison : « Emplois repris dans la nuance. »

### Corrections retenues, non appliquées (1)

| Id | Unité | Champ | … |
|---|---|---|---|
| V2-141 | `v_585_s1` | いくつ | 11 | `nuance` (sens 1) | « Pour un nombre d'objets, avec le compteur général 〜つ ; aussi pour demander l'âge. », sans おいくつですか. |

### Grille d'examen (vide ; à remplir à l'audit, sur autorisation distincte)

| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |
|---|---|---|---|---|---|---|---|---|
| `v_585_s1` | — | — | — | — | — | — | — | — |

## Décomptes

| Élément | Nombre |
|---|---|
| Sens | 17 |
| ENTRY et fiches sources | 15 |
| Anciens exemples | 45 |
| Décisions historiques | 42 |
| dont `type-nul` | 17 |
| Corrections retenues, non appliquées | 9 |
| Verdicts | 0 |
