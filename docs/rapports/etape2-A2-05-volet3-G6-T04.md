# Étape 2 · A2-05 · Volet 3 · G6 — tranche G6-T04 : examen linguistique (T3, T4, T6), arbitré

**Date** : examen et arbitrage le 2026-11-19.

**Statut** : **arbitré, inscrit par la consignation de G6-T04** (bilan du volet 2, §8.136) ; rapport de tranche de G6, à reprendre dans le rapport G6 final (G6-Q5). 24 fiches examinées sur 24.
- **Résultat arbitré** : **24 fiches examinées, 24 conformes, 0 écart, 0 à arbitrer.**
- **Aucun écart, aucune correction nouvelle** : le nombre de corrections retenues reste de 205, dans 178 ENTRY, toutes non appliquées.
- **Aucune question** n'a été posée, et l'arbitrage n'en ajoute aucune. Les points d'attention sont confirmés (§3).
- **Rien n'est modifié** : aucune donnée, aucune décision ni aucune norme.

**Autorisations exécutées** :
- examen : « J'autorise explicitement l'examen linguistique de G6-T04 uniquement, sur ces 24 ENTRY. » ;
- version arbitrée : « J'autorise uniquement la préparation documentaire de la version arbitrée de G6-T04, sans inscription dans les fichiers suivis. »

**Arbitrage reçu** (relayé par l'utilisateur, sur la relecture favorable de ChatGPT) : « J'accepte la relecture favorable de ChatGPT concernant l'examen linguistique G6-T04. » ; « Je retiens les 24 verdicts conformes, sans écart et sans nouvelle correction. Aucune question supplémentaire n'est nécessaire. » Les quatre confirmations particulières sont citées au §3.

**Non autorisés lors de la préparation de cette version** (l'inscription documentaire a été faite ensuite, sur autorisation distincte, par la consignation de G6-T04) :
- l'inscription documentaire ;
- une décision supplémentaire dans le journal ;
- une modification des données lexicales ;
- `git add`, le commit et le push ;
- G6-T05, G4 et les autres contrôles du volet 3.

Aucune modification des données, des sources, des décisions historiques ni des normes.

**Référence** : `HEAD`, `origin/ocha-v2` et le distant sont à `4b2e2e1`. `data/`, `tools/`, `reconstruction/`, `tests/` et `docs/` sont sans modification locale (contrôle d'examen, §6). Les 205 corrections retenues dans 178 ENTRY ne sont pas appliquées, et l'étape 2 reste ouverte.

**Pièces examinées**, inchangées depuis la préparation relue et acceptée (empreintes vérifiées, §6) :
- **le dossier** `dossier-G6-T04.md` (`12f01503…`) : les 24 fiches sources figées intégrales, les trois fiches absorbées (`n5_v_107`, `n5_v_106`, `n5_v_105`), les données publiées, les décisions validées et les lignes de grille ;
- **la sortie de l'aide de lecture** `sortie-aide-lecture-G6-T04.txt` (`679c166f…`) ;
- **la grille** `grille-relecture-G6-T04.md` (`292d6773…`), qui reste intacte. La grille complétée est un fichier distinct (`examen/grille-G6-T04-examinee.md`).

**Emplacement des pièces** (adaptation d'inscription) : les chemins relatifs de ce rapport (`dossier-G6-T04.md`, `grille-relecture-G6-T04.md`, `sortie-aide-lecture-G6-T04.txt`, `examen/…`, `arbitrage/…`) partent de `a2-05-travail/volet3-cadrage/G6/tranches/G6-T04/` ; l'aide de lecture `aide-lecture-tranche.mjs` est dans `a2-05-travail/volet3-cadrage/G6/tranches/`. La version arbitrée relue y est conservée : `arbitrage/rapport-G6-T04-arbitre.md`.

## 1. Méthode

La méthode est celle de G6-T01 à G6-T03, telle qu'elle a été arbitrée (`docs/rapports/etape2-A2-05-volet3-G6-T01.md` à `…-G6-T03.md`, §1), sans changement.

- **Lecture.** Pour chaque ENTRY, j'ai lu la fiche entière :
  - `word`, `word_furigana` et `reading` ;
  - les traductions (`meanings`) et la `nuance` ;
  - l'exemple japonais, son romaji et sa traduction.

  J'ai lu de même les trois fiches absorbées :
  - `v_87` ← `n5_v_107` (D0015) ;
  - `v_91` ← `n5_v_106` (D0016) ;
  - `v_92` ← `n5_v_105` (D0017).

  J'ai ensuite confronté chaque fiche aux données publiées et aux décisions validées que cite le dossier.
- **Critères** (dossier de tranche, « Références normatives ») :
  - **T3** : une graphie publiée doit être documentée par la fiche de l'entrée, ou par une fiche fusionnée en elle. La fiche ne doit documenter aucune graphie qui ne soit pas publiée. Règle du lot 20 : « une graphie s'ajoute si la fiche de l'entrée la documente […], non si une autre fiche la cite » (D1342, D1308). Schéma A2-01 et invariant I5 : une graphie est un `{ form, furigana }`, différent de `word`, dont les furigana recomposent la lecture par défaut ;
  - **T4**, pour les 21 ENTRY du groupe « nom » : `true` seulement si la fiche établit la formation Nする ; `false` veut dire « non établi » ;
  - **T6** : `suffix` reflète ce que la fiche dit du mot lui-même (précédents D0907, D1356, D1026).
- **Ce qui n'est pas une graphie** (G6-T01 à G6-T03, §1) :
  - un autre mot que la fiche cite pour l'opposer ou y renvoyer ;
  - une forme fléchie ;
  - un composant nommé ;
  - un mot de l'exemple ;
  - le champ `reading` seul ;
  - une forme qu'une autre fiche écrit ;
  - **la forme du mot privée de son préfixe お**, qui change la forme lexicale (D0169).
- **Ce qui en est une** : une autre écriture du même mot, de même lecture, que la fiche présente comme telle (« s'écrit aussi », « souvent écrit en »). L'écriture peut être en kanji, en hiragana ou en katakana : précédent D0397, pour `v_81` de cette tranche ; G6-T03-Q1, pour カバン.
- **T4 dans les exemples.** J'ai rattaché chaque suite en し / します des exemples à ce qu'elle régit. Aucun する n'y porte sur un nom (§2, `v_79` et `v_85`).
- **Indices et limite L4.**
  - Les indices de la grille G6 et de l'aide de lecture n'ont fait qu'orienter la lecture : aucun verdict n'en découle.
  - **L4 (G6-T03-Q2, option (a))** : les graphies uniquement en kana peuvent échapper aux indices automatiques. J'ai donc **relevé à la lecture**, dans chaque fiche, toute forme en kana du mot ou d'un mot voisin. Quatorze des 24 ENTRY ont une forme ou une graphie publiée en kana : neuf formes et cinq ENTRY à graphies (`v_81`, `v_87`, `v_90` mixte, `v_91`, `v_92`). Une quinzième, ご飯 (`v_88`), est écrite en kana par d'autres fiches.
- **Aucune connaissance externe.** Je n'ajoute aucune graphie, lecture, signification ni propriété.
- **Verdict global d'une ENTRY** : le plus défavorable de ses contrôles applicables.

## 2. Verdicts, ENTRY par ENTRY

Les citations sont celles des fiches sources figées, balises ruby retirées. La base est gardée, avec la lecture entre crochets si elle est utile.

### `v_74` ボタン (`n5_v_74`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée ; aucune décision sur `writings`.
  - La fiche n'écrit le mot que ボタン : `word`, exemple « シャツ の ボタン が とれました ».
  - La nuance « Mot en katakana désignant […] » ne donne aucune autre écriture. シャツ est un autre mot.
- **T4 · conforme.** `false`. Aucune formation avec する : l'exemple a « とれました ».
- **T6 · conforme.** Aucune mention de suffixe.

### `v_75` ポケット (`n5_v_75`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que ポケット (« Mot en katakana issu de l'anglais 'pocket' »). ズボン et ケータイ sont des mots de l'exemple.
- **T4 · conforme.** `false`. L'exemple a « ポケット に ケータイ が あります ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_76` ワイシャツ (`n5_v_76`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée.
  - La fiche n'a que ワイシャツ ; « contraction de 'white shirt' » est une étymologie, non une écriture.
  - 毎日, 白, 着, 会社 et 行 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « ワイシャツ を 着て ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_77` 上着 (`n5_v_77`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée.
  - La fiche n'écrit le mot que 上着 (`word` ; exemple « 上着[うわぎ] を 着ます »).
  - « Nom composé de 上 (ue, dessus) et 着 (gi, vêtement) » nomme ses composants.
  - 月 et 寒 appartiennent à l'exemple.
  - Les furigana fautifs de la fiche (うえ) relèvent de T1 et T2 ; ils sont déjà corrigés par D0833 (validée).
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_78` 帽子 (`n5_v_78`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée.
  - La fiche n'a que 帽子.
  - かぶる est un autre mot, le verbe employé avec 帽子 (« On emploie généralement le verbe かぶる »).
  - 日 et 強 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 帽子 を かぶります ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_79` 押す (`n5_v_79`, lot 18) — **conforme** (indice « Nする fléchi » examiné)

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 押す ; l'exemple a « 押して », une forme fléchie. ドア, ボタン, 電車 et 降 appartiennent à l'exemple.
- **T4** : sans objet (groupe « u »).
  - L'indice « Nする fléchi » de l'aide porte sur « ボタン を 押[お]して », romaji « **oshite** ».
  - して suit 押, lu お : c'est la forme en -て du verbe 押す lui-même (*osu* → *oshite*). Ce n'est pas する accolé à un nom.
  - C'est le **faux positif connu** de ce motif (verbes en す ; G6-T03, `v_50`).
- **T6 · conforme.** « Verbe godan » ; aucune mention de suffixe.

### `v_80` 曇る (`n5_v_80`, lot 07) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 曇る (l'exemple a « 曇って », forme fléchie). 朝, 晴 et 昼 appartiennent à l'exemple.
- **T4** : sans objet (groupe « u »).
- **T6 · conforme.** « Verbe godan » ; aucune mention de suffixe.

### `v_81` 眼鏡 (`n5_v_81`, lot 05) — **conforme** (variantes examinées)

- **T3 · conforme.**
  - **Graphies publiées** : `{ form: "めがね", furigana: "めがね" }` et `{ form: "メガネ", furigana: "メガネ" }`, par D0397 (validée) : « Graphies en hiragana et en katakana documentées par la nuance de la source : variantes d'écriture du même mot ».
  - **Ce que dit la nuance** : « […] souvent écrit plus simplement en hiragana めがね (megane) ou en katakana メガネ (megane)au quotidien ». La fiche présente les deux formes comme d'autres écritures du même mot, de même lecture (romaji « megane » pour l'une et l'autre).
  - **Correspondance avec le schéma** : chaque `form` diffère de `word` (眼鏡), et ses furigana sont la forme même ; la lecture par défaut est めがね. Les deux graphies sont publiées, et elles seules.
  - **Rien d'autre n'est documenté** : l'exemple écrit 眼鏡[めがね] ; 字 et 読 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 眼鏡 を かけます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_82` 締める (`n5_v_82`, lot 18) — **conforme**

- **T3 · conforme.** Aucune graphie publiée.
  - Le mot de la fiche est 締める (`word`, furigana, exemple « ネクタイ を 締めます »).
  - **Aucun 閉める n'est une graphie** :
    - le premier, « ネクタイを閉[し]める », est une confusion de la source, corrigée et journalisée par D1215 (validée) : « La forme de la fiche, ses furigana et son exemple écrivent 締める » ;
    - le second, « À ne pas confondre avec 閉める (fermer une porte ou une fenêtre) », désigne un autre mot.
  - 会社, 行 et 前 appartiennent à l'exemple.
- **T4** : sans objet (groupe « ru »).
- **T6 · conforme.** « Verbe ichidan transitif » ; aucune mention de suffixe.

### `v_83` 背広 (`n5_v_83`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée.
  - La fiche n'a que 背広 (nuance « 背広 (sebiro) reste le terme classique », exemple).
  - スーツ est un autre mot (« le mot moderne スーツ (suutsu) »).
  - 父, 毎日, 着, 会社 et 行 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 背広 を 着て ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_84` お弁当 (`n5_v_84`, lot 02) — **conforme** (mention de préfixe examinée)

- **T3 · conforme.** Aucune graphie publiée.
  - La fiche écrit お弁当 (`word` ; exemple « 家 で 作った お弁当 です ») ; elle n'écrit nulle part 弁当 seul.
  - Sa nuance dit « (souvent avec le préfixe honorifique お, o) » : elle mentionne l'emploi du préfixe, sans écrire de forme sans préfixe.
  - D0169 (validée) a tranché : « 弁当 n'est pas ajouté comme autre graphie : retirer le préfixe お change la forme lexicale, pas seulement l'écriture ».
  - 今日, 昼 (« 昼 ごはん »), 家 et 作 appartiennent à l'exemple.
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** La chaîne « préfixe » relevée par l'aide porte sur お, un élément **du mot**. La fiche ne dit pas que お弁当 s'emploie comme suffixe. `suffix: false` reflète la fiche. Le schéma n'a pas de propriété « préfixe » : la mention n'appelle aucun champ.

### `v_85` お茶 (`n5_v_85`, lot 02) — **conforme** (mention de préfixe et indice « Nする fléchi » examinés)

- **T3 · conforme.** Aucune graphie publiée ; aucune décision sur `writings`.
  - La fiche écrit お茶 (`word`, exemple). Sa nuance, « souvent précédé du préfixe poli お », n'écrit pas 茶 seul comme forme du mot.
  - Le critère de D0169 (le préfixe change la forme lexicale) vaut ici de la même manière.
  - 客 et 出 appartiennent à l'exemple.
- **T4 · conforme.** `false`.
  - L'indice « Nする fléchi » porte sur « お茶 を 出[だ]します », romaji « **dashimasu** ».
  - します suit 出, lu だ : c'est la forme polie du verbe 出す (*dasu* → *dashimasu*), dont l'objet est お茶 (を). Ce n'est pas お茶する.
  - C'est le **faux positif connu** (verbes en す). Aucune formation Nする n'est établie.
- **T6 · conforme.** « préfixe » porte sur お, élément du mot ; aucune mention de suffixe.

### `v_86` お酒 (`n5_v_86`, lot 02) — **conforme** (mention de préfixe examinée)

- **T3 · conforme.** Aucune graphie publiée ; aucune décision sur `writings`.
  - La fiche écrit お酒. Sa nuance, « S'emploie souvent avec le préfixe poli お (o) », n'écrit pas 酒 seul comme forme du mot.
  - Le critère de D0169 vaut de même.
  - 父, 晩 (« 晩 ごはん ») et 飲 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « お酒 を 飲みます ». Aucune formation avec する.
- **T6 · conforme.** « préfixe » porte sur お ; aucune mention de suffixe.

### `v_87` 果物 (`n5_v_87`, lot 00 ; absorbe `n5_v_107`, D0015) — **conforme** (fusion examinée)

- **T3 · conforme.**
  - **Les deux fiches** :
    - la fiche de l'entrée `n5_v_87` a pour `word` くだもの. Sa nuance dit « s'écrit couramment en kanji 果物 ou en hiragana », et son exemple écrit « くだもの » ;
    - la fiche absorbée `n5_v_107` a pour `word` 果物. Sa nuance dit « écrit ici avec les kanji 果物 (kudamono, souvent écrit aussi en hiragana くだもの) », et son exemple écrit 果物[くだもの].
  - **Les décisions validées** : la fusion D0015 (« 果物 est une autre graphie ») et la forme usuelle D0059 (« 果物 ; くだもの devient une autre graphie »).
  - **Ce qui est publié** : `word` 果物, graphie `{ form: "くだもの", furigana: "くだもの" }`. Les deux écritures documentées sont publiées, et elles seules.
  - **Ce qui n'est pas une graphie** : 朝, 新鮮 et 食 appartiennent à l'exemple de l'entrée ; 市場 et « かいました » (verbe 買う écrit en kana) à celui de la fiche absorbée.
- **T4 · conforme.** `false`. Les exemples ont « くだもの を 食べます » et « 果物 を かいました ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe dans les deux fiches.

### `v_88` ご飯 (`n5_v_88`, lot 02) — **conforme** (graphie en kana recherchée, L4)

- **T3 · conforme.** Aucune graphie publiée ; aucune décision sur `writings`.
  - **Ce que la fiche écrit** : seulement ご飯, dans `word`, `word_furigana` et l'exemple (« おいしい ご飯 を 食べます »). Le kana ごはん n'y figure que dans `reading`, qui donne la lecture et non une écriture.
  - **Ce qui n'est pas une graphie de ご飯** : 朝ご飯, 昼ご飯 et 晩ご飯, cités par la nuance, sont d'autres mots, des composés.
  - **L4** : la forme en kana ごはん est écrite par **d'autres fiches** :
    - les nuances de `n5_v_91` et `n5_v_92` (« Composé de 晩 / 昼 et de ごはん (gohan, repas/riz) ») ;
    - les exemples de `n5_v_84` (« 昼 ごはん »), `n5_v_86` (« 晩 ごはん »), `n5_v_87` (« 朝 ごはん ») et `n5_v_97` (« ごはん の 代わりに »).

    Selon la règle du lot 20 (« non si une autre fiche la cite » ; D1308, いる pour 居る), ces mentions ne documentent pas une graphie de `v_88`.
  - 毎日 et 食 appartiennent à l'exemple.
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_89` ちゃわん (`n5_v_89`, lot 02) — **conforme**

- **T3 · conforme.**
  - **Graphie publiée** : `{ form: "茶碗", furigana: "<ruby>茶碗<rt>ちゃわん</rt></ruby>" }`, par D0199 (validée) : « 茶碗 est la graphie en kanji de ちゃわん : même mot, même lecture ».
  - **Ce que dit la nuance** : « (ou autrefois pour le thé, 茶碗 - chawan, qui s'écrit aussi directement ainsi en kanji) ». La graphie est documentée par la fiche de l'entrée, et c'est la seule autre écriture qu'elle donne.
  - **Ce qui n'est pas une graphie** : ご飯, 多 et 入 appartiennent à l'exemple, qui écrit « ちゃわん ».
  - **Hors G6** : 碗 est absent des kanji connus. C'est une anomalie de G5 (K3, G5-A1), distincte de T3.
- **T4 · conforme.** `false`. L'exemple a « ちゃわん に ご飯 を 多く 入れます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_90` とり肉 (`n5_v_90`, lot 02) — **conforme**

- **T3 · conforme.**
  - **Graphie publiée** : `{ form: "鶏肉", furigana: "<ruby>鶏肉<rt>とりにく</rt></ruby>" }`, par D0144 (validée).
  - **Ce que dit la nuance** : « (s'écrit aussi 鶏肉[とりにく] toriniku) ».
  - **Ce qui n'est pas une graphie** :
    - « Nom composé de 鳥 (tori, oiseau/volaille) et de 肉 (niku, viande) » nomme les composants ; la fiche n'écrit pas 鳥肉 comme forme du mot ;
    - la fiche n'écrit pas non plus とりにく tout en kana, hors `reading` ;
    - 夕飯 et カレー appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « とり肉 の カレー です ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_91` 晩ご飯 (`n5_v_91`, lot 00 ; absorbe `n5_v_106`, D0016) — **conforme** (fusion et indice de l'aide examinés)

- **T3 · conforme.**
  - **Les deux fiches** :
    - la fiche de l'entrée `n5_v_91` a pour `word` ばんごはん, et son exemple l'écrit (« ばんごはん を 食べます »). Sa nuance dit « (souvent écrit en kanji 晩ご飯 - bangohan) » ;
    - la fiche absorbée `n5_v_106` a pour `word` 晩ご飯, et son exemple l'écrit.
  - **Les décisions validées** : la fusion D0016 et la forme usuelle D0060 (« 晩ご飯 ; ばんごはん devient une autre graphie »).
  - **Ce qui est publié** : `word` 晩ご飯, graphie `{ form: "ばんごはん", furigana: "ばんごはん" }`. Les deux écritures documentées sont publiées, et elles seules.
  - **L'indice de l'aide**, « ばんごはん absente » de `n5_v_106`, est exact. Cette fiche n'écrit ばんごはん que dans `reading`, que l'aide ne lit pas (L3). Il est sans effet : la graphie est documentée par la fiche de l'entrée, qui survit à la fusion.
  - **Ce qui n'est pas une graphie** :
    - « Composé de 晩 (ban, soir) et de ごはん » et « 晩 (soir) et de ご飯 (riz/repas) » nomment des composants ;
    - 夕飯 (yuuhan) est un autre mot (« Équivalent plus courant au quotidien que 夕飯 ») ;
    - la forme mixte « 晩 ごはん », écrite par l'exemple d'une autre fiche (`n5_v_86`), ne documente pas une graphie de `v_91` (règle du lot 20) ;
    - 家族, 何 et le kana みんな appartiennent aux exemples.
- **T4 · conforme.** `false`. Les exemples ont « ばんごはん を 食べます » et « 晩ご飯 は 何 です か ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe dans les deux fiches.

### `v_92` 昼ご飯 (`n5_v_92`, lot 00 ; absorbe `n5_v_105`, D0017) — **conforme** (fusion examinée)

- **T3 · conforme.**
  - **Les deux fiches** :
    - la fiche de l'entrée `n5_v_92` a pour `word` ひるごはん, et son exemple l'écrit. Sa nuance dit « Souvent écrit en kanji 昼ご飯 (hirugohan) » ;
    - la fiche absorbée `n5_v_105` a pour `word` 昼ご飯. Sa nuance dit « Souvent écrit en hiragana (ひるごはん) ou avec les kanji (昼ご飯) ».
  - **Les décisions validées** : la fusion D0017 et la forme usuelle D0061.
  - **Ce qui est publié** : `word` 昼ご飯, graphie `{ form: "ひるごはん", furigana: "ひるごはん" }`. Les deux écritures documentées sont publiées, et elles seules.
  - **Ce qui n'est pas une graphie** :
    - « Composé de 昼 (hiru, midi/journée) et de ごはん » nomme des composants ;
    - la forme mixte « 昼 ごはん », écrite par l'exemple d'une autre fiche (`n5_v_84`), ne documente pas une graphie de `v_92` ;
    - 12時, 食, 行, 友達 et 一緒 appartiennent aux exemples.
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe dans les deux fiches.

### `v_93` カップ (`n5_v_93`, lot 02) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que カップ (« Mot en katakana issu de l'anglais 'cup' »). コーヒー et 注 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « カップ に コーヒー を 注ぎます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_94` カレー (`n5_v_94`, lot 02) — **conforme**

- **T3 · conforme.** Aucune graphie publiée.
  - La fiche n'a que カレー.
  - カレーライス (karee raisu) est un autre mot, un composé (« Généralement servi sur du riz : カレーライス ») ; D0172 (validée) le traite comme une expression complète.
  - 辛, 食 et 好 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « カレー を 食べる の が 好き です ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_95` コーヒー (`n5_v_95`, lot 02) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que コーヒー (« Mot en katakana issu du néerlandais 'koffie' »). 毎朝 et 飲 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « コーヒー を 飲みます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_96` テーブル (`n5_v_96`, lot 03) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que テーブル (« Mot en katakana issu de l'anglais 'table' »). 料理, 上 et 並 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « テーブル の 上 に 並べます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_97` パン (`n5_v_97`, lot 02) — **conforme**

- **T3 · conforme.** Aucune graphie publiée.
  - La fiche n'a que パン (« Mot en katakana issu du portugais 'pão' »).
  - « あさ » (朝 écrit en kana), « ごはん » et 代 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « パン を 食べます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

## 3. Points d'attention, arbitrés

**Arbitré le 2026-11-19 : les 24 verdicts conformes sont retenus, sans écart et sans nouvelle correction ; aucune question supplémentaire n'est nécessaire.** Aucune question n'avait été posée à l'examen. Chacun des points que l'autorisation demandait d'examiner avec attention se règle par une décision ou une règle déjà validée ; l'arbitrage les confirme un par un.

- **Variantes de `v_81` 眼鏡.**
  - La nuance de la fiche documente めがね et メガネ comme d'autres écritures du même mot. Les deux sont publiées par D0397 (validée), avec des furigana égaux à la forme.
  - Aucune autre écriture n'est documentée. **Conforme.**
  - **Confirmé par l'arbitrage** : « `v_81` 眼鏡 : les graphies めがね et メガネ sont conformes à D0397. »
- **Mentions de préfixe de `v_84` à `v_86`.**
  - Les trois fiches mentionnent l'emploi du préfixe お ; aucune n'écrit 弁当, 茶 ou 酒 seuls comme formes du mot.
  - D0169 (validée, `v_84`) établit que retirer お change la forme lexicale. Pour `v_85` et `v_86`, aucune décision sur `writings` n'existe, et aucune n'est requise : la fiche ne documente pas de graphie.
  - La chaîne « préfixe » porte sur un élément du mot, non sur un emploi du mot comme suffixe : T6 est conforme. **Trois conformes.**
  - **Confirmé par l'arbitrage** : « `v_84` à `v_86` : le préfixe お n'implique ni une autre graphie sans お, ni `suffix: true`. »
- **Fusions de `v_87`, `v_91` et `v_92`.**
  - Dans chacune, la fiche de l'entrée est en hiragana et la fiche absorbée en kanji. Chaque fiche mentionne l'autre écriture : explicitement pour `v_87` et `v_92`, par la nuance de la fiche de l'entrée pour `v_91`.
  - Les décisions de fusion (D0015 à D0017) et de forme usuelle (D0059 à D0061) placent la forme en kanji dans `word` et la forme en hiragana dans `writings`. Les publications correspondent exactement aux deux écritures documentées.
  - **Trois conformes.**
  - **Confirmé par l'arbitrage** : « `v_87`, `v_91` et `v_92` : les trois fusions et leurs graphies publiées sont conformes. »
- **Limite L4.** La recherche des formes en kana, faite à la lecture, n'a trouvé aucune graphie documentée et non publiée. Le seul cas notable, ごはん pour `v_88`, n'est documenté que par d'autres fiches (§2, `v_88`), ce qui exclut une graphie selon la règle du lot 20.
  - **Confirmé par l'arbitrage** : « `v_88` ご飯 : ne pas ajouter ごはん à `writings`, car cette forme apparaît seulement dans `reading` de sa propre fiche et dans d'autres fiches ; respecter la règle du lot 20 et D1308. »

**Consignation** : aucun écart n'est constaté dans la tranche, et aucune correction nouvelle n'est retenue. Le décompte des corrections retenues, non appliquées, reste celui que calcule `calculerEtat` (`a2-05-travail/sync-stable.mjs`) : **205, dans 178 ENTRY** (204 des volets 1 et 2, et V3-1). Aucun numéro V1, V2 ou V3 n'est attribué par G6-T04.

À l'examen, une réserve avait été notée : si une forme mentionnée par une autre fiche devait compter pour `v_88`, ce serait une question de principe sur la règle validée du lot 20, hors du périmètre de G6. L'arbitrage écarte cette hypothèse en confirmant la règle ; la réserve est close.

## 4. Limites et constats de méthode

- **L1 · Indices de grille** (G6-T01, M1, M2) : ils comparent le texte balisé et ne lisent que la fiche de l'entrée. Effet dans cette tranche : aucun.
- **L2 · Motif « Nする fléchi »** : deux faux positifs connus, 押して (`v_79`) et 出します (`v_85`).
- **L3 · Champs lus par l'aide** : `word`, `word_furigana`, traductions, `nuance` et exemple ; non `reading`. D'où « ばんごはん absente » pour `n5_v_106` (`v_91`).
- **L4 · Indices limités aux kanji** (G6-T03-Q2, option (a), arbitrée le 2026-11-16) : **les graphies uniquement en kana peuvent échapper aux indices automatiques ; la lecture intégrale de chaque fiche reste obligatoire.**
  - L'aide de lecture est restée inchangée (`ea04bd6e…`).
  - Dans cette tranche, les formes en kana ont été recherchées à la lecture, fiche par fiche (§1, §2).
  - Les graphies en kana publiées (めがね, メガネ, くだもの, ばんごはん, ひるごはん) sont toutes documentées.
  - Aucune graphie en kana documentée n'est absente.
- **M1 · Portée.** Ces verdicts portent sur T3, T4 et T6 seuls. Ne sont pas réexaminés :
  - les catégories, types, sens, nuances et tags (volet 1) ;
  - les lectures et furigana, qui relèvent de T1 et T2, automatiques ;
  - les kanji, qui relèvent de G5.
- **M2 · Autres mots cités par les fiches.** Les fiches présentent les mots suivants comme d'autres mots, des composés ou des composants ; ils sont lus comme tels, non comme des graphies :
  - シャツ (`v_74`) ;
  - かぶる (`v_78`) ;
  - 閉める (`v_82`) ;
  - スーツ (`v_83`) ;
  - 朝ご飯, 昼ご飯, 晩ご飯 (`v_88`) ;
  - 鳥 (`v_90`) ;
  - 夕飯 (`v_91`) ;
  - カレーライス (`v_94`).

  Hors de la tranche, la fiche `n5_v_460` 朝御飯 écrit 御飯. C'est un autre mot, dans une autre fiche : sans effet sur `v_88`.
- **M3 · Défauts de texte des fiches sources**, signalés sans correction. Les sources figées restent intactes ; aucun de ces défauts n'est une graphie ni une donnée publiée :
  - `n5_v_80` : catégorie héritée « vetements » pour 曇る (sous-catégorie « meteo ») ;
  - `n5_v_81` : espace manquante dans « (megane)au quotidien » ; romaji de l'exemple « kakimasu » pour かけます ;
  - `n5_v_82` : 閉 pour 締 dans la nuance, déjà traité par D1215 (validée) ;
  - `n5_v_77` : furigana うえ pour 上 dans 上着, déjà traités par D0833 (validée) ;
  - `n5_v_107` : 買いました écrit « かいました » dans l'exemple ;
  - `n5_v_97` : 朝 écrit « あさ » dans l'exemple ;
  - `n5_v_84`, `n5_v_86`, `n5_v_87` : « 昼 ごはん », « 晩 ごはん », « 朝 ごはん », composés écrits en deux segments dans les exemples.

## 5. Observations hors périmètre, sans verdict

- **Corrections déjà retenues sur des ENTRY de la tranche, non appliquées** (parmi les 205) :
  - catégorie V1-13 (`v_74_s2`) ;
  - tags de lieu V1-15 (`v_87`), V1-17 (`v_85`), V1-18 (`v_86`), V1-29 (`v_91`) et V1-30 (`v_92`) ;
  - nuances V2-57 (`v_84`), V2-58 (`v_85`), V2-59 (`v_86`), V2-60 (`v_88`), V2-61 (`v_90`) et V2-62 (`v_95`).

  G6 ne les reprend pas, et aucune constatation nouvelle n'en naît.
- **G5** : le kanji 碗 (`v_89`, graphie 茶碗) est absent des kanji connus (K3, G5-A1). Ce constat est distinct du verdict T3 de `v_89`, qui est conforme.
- **Nuances publiées** : `v_80_s2` (« めがねが曇る ») et d'autres nuances publiées de la tranche relèvent du contrôle de provenance du volet 1. Elles ne sont pas réexaminées ici.

## 6. Contrôles et aide de lecture (lecture seule)

- **Aide de lecture** : `aide-lecture-tranche.mjs`, sortie `sortie-aide-lecture-G6-T04.txt` (`679c166f…`), produite et relue à la préparation, reprise telle quelle. Elle indique « aucun verdict rendu par ce script ».
- **Contrôle d'arbitrage** : `arbitrage/controle-arbitrage-G6-T04.mjs`, sortie `arbitrage/sortie-controle-arbitrage-G6-T04.txt`. Il vérifie que les pièces de préparation et d'examen sont inchangées ; que la grille arbitrée reprend les 24 lignes de la grille examinée, identiques octet pour octet ; que le rapport arbitré garde les 24 sections, leurs statuts et leur texte ; la consignation de l'arbitrage ; que le décompte des corrections reste 205 dans 178 ENTRY, sans correction sur les ENTRY de la tranche hors des corrections déjà retenues, et que les données publiées des 24 ENTRY sont celles qu'a lues l'examen ; que les zones suivies et l'index sont intacts.
- **Contrôle d'examen** (inchangé depuis la relecture) : `examen/controle-examen-G6-T04.mjs`, sortie `examen/sortie-controle-examen-G6-T04.txt`.
  - C'est une copie de `controle-examen-G6-T03.mjs`, dont sont adaptés les noms, les empreintes, les décomptes et le nombre de questions.
  - Les vérifications factuelles de `v_64` sont remplacées par celles des points d'attention.
- **Ce qu'il vérifie** :
  - que les pièces relues de la préparation sont inchangées (empreintes) ;
  - que la grille examinée a les mêmes 24 ENTRY, dans le même ordre, que la grille de préparation ;
  - que chaque ligne porte un statut admis, que T4 est « sans objet » exactement hors « nom », et que le statut global est le plus défavorable ;
  - les décomptes : 21 T4 applicables ; 24 conformes, 0 écart, 0 à arbitrer ;
  - que le rapport a une section par ENTRY, avec le même statut global, et ne pose aucune question ;
  - les citations et décisions sur lesquelles reposent les points d'attention : les nuances de `v_81`, D0397, D0169, l'absence de décision sur `writings` de `v_85` et `v_86`, les fusions D0015 à D0017 et D0059 à D0061, les graphies publiées, et l'absence de ごはん dans les textes de `n5_v_88` hors `reading` ;
  - qu'aucune zone protégée n'est modifiée.

## 7. Ce qui n'est pas fait

- Aucune modification de `data/`, des lots, du journal, des sources (fiches de l'entrée et fiches absorbées), des références normatives, des outils ni des tests.
- Aucune décision de journal ; aucune correction proposée, retenue ni appliquée.
- La version arbitrée est un jeu de copies distinct (`G6-T04/arbitrage/`) ; les pièces de préparation et d'examen restent inchangées.
- Aucune inscription lors de la préparation de cette version ; l'inscription est faite ensuite par la consignation de G6-T04 (bilan du volet 2, §8.136), qui actualise aussi l'avancement de G6 et la phrase Git d'`ETAT-ACTUEL.md` et de `ROADMAP.md`. Le relais n'est pas modifié. Le rapport G6 final n'est pas écrit.
- G6-T05 à G6-T29, G4, G7 et les autres contrôles ne sont pas commencés.
- Rien n'était indexé, committé ni poussé lors de la préparation de cette version.
