# Étape 2 · A2-05 · Volet 3 · G6 — tranche G6-T03 : examen linguistique (T3, T4, T6), arbitré

**Date** : examen le 2026-11-15 ; arbitrage le 2026-11-16.

**Statut** : **arbitré, inscrit par la consignation de G6-T03** (bilan du volet 2, §8.135) ; rapport de tranche de G6, à reprendre dans le rapport G6 final (G6-Q5). 24 fiches examinées sur 24. Résultat arbitré : **24 fiches examinées, 23 conformes, 1 écart T3 (`v_64`), aucune correction appliquée**. **G6-T03-Q1 est tranchée par l'option (a)** : écart confirmé, correction retenue, non appliquée (§3). **G6-T03-Q2 est tranchée par l'option (a)** : aide de lecture inchangée, limite documentée (§3, §4). La correction retenue porte l'identifiant **V3-1**, attribué à l'inscription (I-1, option (b), du 2026-11-16 : série propre au volet 3) ; elle n'est pas appliquée. Aucune donnée, aucune décision ni aucune norme n'est modifiée.

**Autorisations exécutées** :
- examen : « J'autorise explicitement l'examen linguistique de G6-T03 uniquement, sur ces 24 ENTRY. » ;
- version arbitrée : « J'autorise uniquement la préparation documentaire de la version arbitrée de G6-T03, sans inscription. »

**Arbitrage reçu** (relayé par l'utilisateur, sur les recommandations de ChatGPT) : « J'accepte les recommandations de ChatGPT concernant l'examen linguistique G6-T03. » ; « G6-T03-Q1 — v_64 かばん : option (a) retenue. » ; « G6-T03-Q2 — option (a) retenue. » ; « J'accepte les 23 autres verdicts conformes. » ; « Le bilan arbitré de G6-T03 est donc : 24 fiches examinées, 23 conformes, 1 écart T3, aucune correction appliquée. »

Non autorisés lors de la préparation de cette version : l'inscription documentaire (faite ensuite, sur autorisation distincte, par la consignation de G6-T03), la création d'une décision dans le journal, l'application de la correction, git add, le commit, le push, G6-T04, G4 et les autres contrôles du volet 3. Aucune modification des données, des sources, des décisions historiques ni des normes.

**Référence** : `HEAD`, `origin/ocha-v2` et le distant sont à `b41ef64`. `data/`, `tools/`, `reconstruction/`, `tests/` et `docs/` sont sans modification locale (contrôle d'examen, §6). Les 204 corrections retenues ne sont pas appliquées, et l'étape 2 reste ouverte.

**Pièces examinées**, inchangées depuis la préparation relue et acceptée (empreintes vérifiées, §6) :
- le dossier `dossier-G6-T03.md` (`1a07837d…`) : les 24 fiches sources figées intégrales, les deux fiches absorbées (`n5_v_227`, `n5_v_549`), les données publiées, les décisions validées et les lignes de grille ;
- la sortie de l'aide de lecture `sortie-aide-lecture-G6-T03.txt` (`5a6402c3…`) ;
- la grille `grille-relecture-G6-T03.md` (`4bbb5f84…`), qui reste intacte. La grille complétée est un fichier distinct (`examen/grille-G6-T03-examinee.md`).

**Emplacement des pièces** (adaptation d'inscription) : les chemins relatifs de ce rapport (`dossier-G6-T03.md`, `grille-relecture-G6-T03.md`, `sortie-aide-lecture-G6-T03.txt`, `examen/…`, `arbitrage/…`, `adaptation-V3/…`) partent de `a2-05-travail/volet3-cadrage/G6/tranches/G6-T03/` ; l'aide de lecture `aide-lecture-tranche.mjs` est dans `a2-05-travail/volet3-cadrage/G6/tranches/`. La version arbitrée relue y est conservée : `arbitrage/rapport-G6-T03-arbitre.md`.

## 1. Méthode

Celle de G6-T01 et de G6-T02, arbitrées (`docs/rapports/etape2-A2-05-volet3-G6-T01.md` et `…-G6-T02.md`, §1), sans changement.

- **Lecture.** Pour chaque ENTRY, j'ai lu la fiche entière : `word`, `word_furigana`, `reading`, traductions (`meanings`), `nuance`, exemple japonais et français. J'ai lu de même les deux fiches absorbées de la tranche (`v_64` ← `n5_v_227`, D0014 ; `v_68` ← `n5_v_549`, D0025). J'ai ensuite confronté chaque fiche aux données publiées et aux décisions validées que cite le dossier.
- **Critères** (dossier de tranche, « Références normatives ») :
  - **T3** : une graphie publiée doit être documentée par la fiche de l'entrée, ou d'une fiche fusionnée en elle, et la fiche ne doit documenter aucune graphie absente (lot 20 : « une graphie s'ajoute si la fiche de l'entrée la documente […], non si une autre fiche la cite ») ; schéma A2-01 et invariant I5 : une graphie est un `{ form, furigana }`, différent de `word`, dont les furigana recomposent la lecture par défaut ;
  - **T4**, pour les 18 ENTRY du groupe « nom » : `true` seulement si la fiche établit la formation Nする ; `false` veut dire « non établi » ;
  - **T6** : `suffix` reflète ce que la fiche dit du mot lui-même (précédents D0907, D1356, D1026).
- **Ce qui n'est pas une graphie** (G6-T01, §1 ; G6-T02, §1) : un autre mot que la fiche cite pour l'opposer ou y renvoyer ; une forme fléchie ; le nom d'un kanji ; un composant nommé ; un mot de l'exemple ; un autre emploi de lecture différente.
- **Ce qui en est une** : une autre écriture du même mot, de même lecture, que la fiche présente comme telle (« s'écrit aussi », « souvent écrit en »). Les précédents validés ne distinguent pas l'écriture employée : kanji (D0262 風呂, D0268 椅子, D0348 下りる), hiragana (D0733 みんな, D0754 おととい) ou **katakana (D0397 : 眼鏡, « Graphies en hiragana et en katakana documentées par la nuance de la source : variantes d'écriture du même mot » ; publiées : めがね, メガネ)**.
- **T4 dans les exemples.** Chaque する (ou forme fléchie) des fiches a été rattaché à ce qu'il régit dans la phrase.
- **Indices.** Les indices de la grille G6 et de l'aide de lecture ont seulement orienté la lecture. Aucun verdict n'en découle : chaque verdict se fonde sur le texte cité de la fiche. Les deux ne relèvent que des **segments à kanji** : une graphie en kana citée par une nuance ne produit aucun indice (§4, L4). L'écart de `v_64` a été trouvé à la lecture.
- **Aucune connaissance externe.** Aucune graphie, lecture, signification ni propriété n'est ajoutée. La correction décrite en Q1 ne reprend que la forme écrite par la fiche.
- **Verdict global d'une ENTRY** : le plus défavorable de ses contrôles applicables.

## 2. Verdicts, ENTRY par ENTRY

Les citations sont celles des fiches sources figées, balises ruby retirées (la base est gardée, la lecture entre crochets si utile).

### `v_50` 差す (`n5_v_50`, lot 18) — **conforme** (indice « Nする fléchi » examiné)

- **T3 · conforme.** Aucune graphie publiée, aucune décision sur `writings`. La fiche n'écrit le mot que 差す (`word`, nuance « 傘を差す (kasa o sasu) », exemple « 差します », forme fléchie). 傘, 雨 et 降 appartiennent à la nuance ou à l'exemple.
- **T4** : sans objet (groupe « u »).
  - **L'indice « Nする fléchi »** de l'aide porte sur l'exemple « 傘 を 差[さ]します », romaji « kasa o **sashimasu** », traduit « j'**ouvre** un parapluie ». La suite します suit le kanji 差 dont le furigana est さ : c'est la forme polie du verbe 差す lui-même (*sasu* → *sashimasu*), dont し est la terminaison, non する accolé à un nom. C'est le **faux positif connu** de ce motif (verbes en す ; G6-T02, `v_40`). T4 n'étant pas applicable, l'indice est sans objet.
- **T6 · conforme.** « Verbe godan » ; aucune mention de suffixe.

### `v_51` 手 (`n5_v_51`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 手. La chaîne « écrit » relevée par l'aide est celle de « Écriture (style) » et de « style d'écriture » : un sens, non une écriture du mot. 食事, 前 et 洗 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 手 を 洗います ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_52` 手紙 (`n5_v_52`, lot 08) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 手紙. « Nom composé de 手 (main) et 紙 (papier) » nomme ses composants (紙 y est lu かみ, non がみ). La chaîne « écrit » est celle de « une lettre écrite à la main ». 友達 et 書 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 手紙 を 書きます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.
- *Hors périmètre de G6* : nuance publiée, écart V2-97 (retenu, non appliqué ; §5).

### `v_53` 歩く (`n5_v_53`, lot 04) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 歩く (`word`, exemple « 歩きます », forme fléchie). 毎日 et 駅 appartiennent à l'exemple.
- **T4** : sans objet (groupe « u »).
- **T6 · conforme.** « Verbe godan » ; aucune mention de suffixe.

### `v_54` 歯 (`n5_v_54`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 歯. 毎朝 et 磨 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 歯 を 磨きます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_55` 病気 (`n5_v_55`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 病気. 家 et 休 appartiennent à l'exemple.
- **T4 · conforme.** `false`. « un état de mauvaise santé, une maladie » ; l'exemple a « 病気 の とき は 、家 で 休みます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.
- *Hors périmètre* : nuance publiée, écart V2-43 (retenu, non appliqué).

### `v_56` 病院 (`n5_v_56`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 病院. 熱 et 行 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 病院 へ 行きます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_57` 目 (`n5_v_57`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 目. 痛, 医者 et 診 appartiennent à l'exemple.
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** `suffix: false`. La fiche décrit un « Nom fondamental désignant l'organe de la vision », employé « par extension pour exprimer un point de vue » ; elle ne dit nulle part que 目 est un suffixe ni ne donne d'emploi suffixé. Aucun emploi n'est ajouté par connaissance externe.
- *Hors périmètre* : nuance publiée, écart V2-44 (retenu, non appliqué).

### `v_58` 耳 (`n5_v_58`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 耳. 音楽, 聞 et イヤホン appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 耳 に イヤホン を つけます » : つけます régit イヤホン. Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.
- *Hors périmètre* : nuance publiée, écart V2-45 (retenu, non appliqué).

### `v_59` 薬 (`n5_v_59`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 薬. 食後 et 飲 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 薬 を 飲みます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_60` 足 (`n5_v_60`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 足. 長, 時間, 歩 et 痛 appartiennent à l'exemple.
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_61` 身体 (`n5_v_61`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 身体[しんたい]. Elle cite « 体[からだ] (karada) » comme l'équivalent courant : un autre mot, de lecture différente (ENTRY `v_46`), non une graphie de 身体. 健康 et 動 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 身体 を 動かします » : forme du verbe 動かす (*ugokashimasu*), dont 身体 est l'objet (を) ; le motif « Nする fléchi » ne le relève pas, la suite します suivant か. Aucune formation 身体する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_62` 軽い (`n5_v_62`, lot 15) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 軽い (`word`, exemple « 軽くて », forme fléchie). 重い est un autre mot, son contraire. 鞄 et 持 appartiennent à l'exemple.
- **T4** : sans objet (groupe « i »).
- **T6 · conforme.** « Adjectif en -i » ; aucune mention de suffixe.

### `v_63` 降りる (`n5_v_63`, lot 04) — **conforme** (indice de grille examiné)

- **Publié** : une graphie, 下りる (furigana `<ruby>下<rt>お</rt></ruby>りる`). Décision validée D0348 (« 下りる, documentée par la nuance de la source, est une autre graphie du même mot (おりる), sans changement de forme lexicale : ajoutée à writings »).
- **T3 · conforme.**
  - La nuance dit : « S'écrit aussi 下[お]りる (oriru) ». C'est une autre écriture du même mot, de même lecture : la graphie est documentée par la fiche de l'entrée.
  - **Furigana** : la fiche écrit `<ruby>下<rt>お</rt></ruby>りる`, exactement les furigana publiés ; ils recomposent おりる, la lecture par défaut (I5).
  - La fiche ne documente aucune autre graphie. 次, 駅 et 電車 appartiennent à l'exemple.
  - **Indice** : la grille G6 marque « graphie « 下りる » absente mot pour mot de la fiche » ; c'est l'effet du balisage ruby (G6-T01, M1). L'aide de lecture, qui retire le ruby, la marque « présente (texte sans ruby) ». Ni l'un ni l'autre ne fonde le verdict.
- **T4** : sans objet (groupe « ru »).
- **T6 · conforme.** « Verbe ichidan » ; aucune mention de suffixe.
- *Hors périmètre* : la nuance publiée a été jugée « sourcée » au volet 1 (lot 2, tranche 1).

### `v_64` かばん (`n5_v_64`, lot 00 ; absorbe `n5_v_227`, D0014) — **écart** (T3 ; arbitré : G6-T03-Q1, option (a))

- **Publié** : `word` かばん ; une graphie, 鞄 (furigana `<ruby>鞄<rt>かばん</rt></ruby>`) ; lecture かばん. Décisions validées : D0014 (fusion de `n5_v_227` dans `n5_v_64` : « Même unité lexicale que 鞄 ; かばん est une autre graphie ») et D0058 (« Forme usuelle décidée à la fusion (arbitrage du lot 0, 4.2 b) : かばん ; 鞄 devient une autre graphie »). **Aucune décision sur `writings`.**
- **T3 · écart** (confirmé le 2026-11-16, G6-T03-Q1, option (a) ; §3). L'analyse ci-dessous est celle de la proposition, conservée telle quelle ; l'arbitrage la complète au dernier point.
  - **Les deux formes publiées sont documentées.**
    - かばん : `word`, `word_furigana` et `reading` de la fiche absorbée `n5_v_227` ; son exemple écrit « かばん に 入れます ».
    - 鞄 : `word` de la fiche de l'entrée `n5_v_64`, furigana `<ruby>鞄<rt>かばん</rt></ruby>`, identiques aux furigana publiés, qui recomposent かばん (I5) ; son exemple écrit « 私 の 鞄 ». La nuance de `n5_v_227` le confirme : « Nom s'écrivant parfois en kanji 鞄[かばん] (kaban) ».
  - **Une graphie documentée n'est pas publiée : カバン.** La nuance de la fiche de l'entrée `n5_v_64` dit : « Nom désignant un sac servant à transporter des affaires (**souvent écrit en katakana カバン (kaban)** au quotidien) ».
    - C'est une autre écriture du même mot, de même lecture (« kaban »), que la fiche présente comme telle (« écrit en katakana »). Ce n'est ni un autre mot, ni une forme fléchie, ni le nom d'un kanji.
    - Elle est documentée par **la fiche de l'entrée elle-même** : le critère du lot 20 s'applique directement.
    - Le précédent validé **D0397** (`n5_v_81` 眼鏡) a publié, dans le même cas, les graphies en hiragana et en katakana documentées par la nuance (めがね, メガネ). D0733 (みんな), D0754 (おととい), D0764 (ゆうべ, 夕べ) et D1294 (たばこ) traitent de même des formules « s'écrit … en hiragana ».
    - **Aucune décision ne l'écarte.** D0014 et D0058 ne portent que sur la paire issue de la fusion (鞄, かばん). Le rapport du lot 0 (`docs/rapports/etape2-tache5-1-lot0.md`, §4.2) ne traite que la forme usuelle des paires de fusion ; il ne cite pas カバン. Le volet 1 (lot 3, T1, `v_64_s1`) a expressément laissé la question ouverte : « La forme usuelle かばん et la graphie 鞄 (D0058) ne sont pas examinées ».
  - **La correction qu'appellerait l'écart** (non appliquée ; Q1) : ajouter à `writings` de `v_64` la graphie `{ form: "カバン", furigana: "カバン" }`, par une décision nouvelle de journal (champ `writings`). La forme est celle qu'écrit la fiche ; les furigana d'une forme sans kanji sont la forme elle-même, comme pour メガネ (`v_81`). Ils recomposent la lecture かばん par la clé de comparaison d'A8, qui rapproche hiragana et katakana (D1278). Ni la forme usuelle (D0058), ni la graphie 鞄, ni les sens ne sont touchés.
  - **Indices** : la grille G6 marque « graphie « 鞄 » présente dans le champ word » ; l'aide de lecture, « 鞄 présente » dans les deux fiches. Ni l'une ni l'autre ne relève カバン, qui ne contient aucun kanji (§4, L4).
  - **Arbitrage (G6-T03-Q1, option (a))** : l'écart T3 est confirmé. La fiche source `n5_v_64` documente explicitement la graphie カバン, absente des données publiées. **Correction retenue, non applicable immédiatement** : `writings` de `v_64` : ajouter `{ form: "カバン", furigana: "カバン" }`, sur la fiche source et le précédent validé D0397. Ni la forme principale かばん, ni la graphie 鞄, ni les lectures, ni les sens ne sont modifiés. Aucune décision de journal n'est créée ; la correction n'est pas appliquée (§3).
- **Distinction avec G5.** La graphie 鞄 est **conforme au regard de G6** : elle est documentée par les deux fiches de l'ENTRY, avec des furigana conformes. L'**anomalie de G5** est d'une autre nature : le kanji 鞄 est absent des kanji connus et du dictionnaire `data/kanji_jouyou_fr.json` (G5, K3 non conforme, et K8). Elle relève de la tâche de données sur les kanji, dont le placement n'est pas décidé (`ROADMAP.md`, §17 ; G5-A1). G6 ne la reprend pas, n'en change pas la qualification, et l'écart de G6 ne porte pas sur 鞄. L'ajout de カバン n'y changerait rien : la forme ne contient aucun kanji.
- **T4 · conforme.** `false`. Les deux fiches ne forment aucun verbe avec le mot ; leurs exemples ont « 入っています » et « 入れます », dont かばん est le lieu (に). La mention « Compteur spécifique : 個 (ko) ou つ (tsu) » de `n5_v_227` porte sur le compte de l'objet, non sur une formation avec する.
- **T6 · conforme.** Aucune mention de suffixe dans les deux fiches. La mention du compteur ne fait pas de かばん un suffixe ; `counter` est hors de T6.

### `v_65` 頭 (`n5_v_65`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 頭. 昨日 et 痛 appartiennent à l'exemple.
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.
- *Hors périmètre* : nuance du sens 2, écart V2-46 ; type du sens 2, correction n° 2 du volet 2 (`null` → `propriete`) ; toutes deux retenues, non appliquées.

### `v_66` 飲む (`n5_v_66`, lot 02) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 飲む (`word`, exemple « 飲みます », forme fléchie). 喉, 乾 et 水 appartiennent à l'exemple.
- **T4** : sans objet (groupe « u »).
- **T6 · conforme.** Aucune mention de suffixe.

### `v_67` 鼻 (`n5_v_67`, lot 01) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que 鼻. 風邪, 引 et 出 appartiennent à l'exemple.
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_68` 履く (`n5_v_68`, lot 00 ; absorbe `n5_v_549`, D0025) — **conforme** (indice de l'aide examiné)

- **Publié** : `word` 履く ; une graphie, はく (furigana `はく`) ; lecture はく, furigana `<ruby>履<rt>は</rt></ruby>く`. Décisions validées : D0025 (fusion de `n5_v_549` dans `n5_v_68` : « Même unité lexicale que はく ; 履く est une autre graphie ») et D0064 (« Forme usuelle décidée à la fusion (arbitrage du lot 0, 4.2 b) : 履く ; はく devient une autre graphie »).
- **T3 · conforme.**
  - **はく** : `word`, `word_furigana` et `reading` de la fiche de l'entrée `n5_v_68` ; son exemple écrit « ズボン を はきます ». Sa nuance dit : « S'écrit le plus souvent en hiragana ou avec le kanji 履[は]く ».
  - **履く** : `word` de la fiche absorbée `n5_v_549`, furigana `<ruby>履<rt>は</rt></ruby>く`, identiques aux furigana publiés de la lecture ; son exemple écrit « 履いて » (forme fléchie). La nuance de `n5_v_68` le documente aussi (« avec le kanji 履く »).
  - Les deux écritures que la fiche de l'entrée documente (hiragana, kanji 履) sont donc publiées ; aucune autre n'est documentée. 着る est un autre mot, qu'elle oppose (« par opposition à 着る (kiru) pour le haut »). 新 et ズボン appartiennent à l'exemple ; くつ, à celui de `n5_v_549`.
  - **Indice de l'aide** : « graphie publiée « はく » absente » de `n5_v_549`. C'est un relevé de chaîne : `n5_v_549` est la fiche de la forme 履く, et l'aide ne lit pas `reading`, où はく figure (G6-T02, L3). La graphie はく est documentée par la fiche de l'entrée ; il n'est pas nécessaire que chaque fiche fusionnée la documente.
- **T4** : sans objet (groupe « u »).
- **T6 · conforme.** « Verbe godan » (`n5_v_68`), « Verbe transitif (groupe u) » (`n5_v_549`) ; aucune mention de suffixe.
- *Hors périmètre* : catégorie du sens 1, écart V1-11 (volet 1, lot 3, T1 ; retenu, non appliqué).

### `v_69` コート (`n5_v_69`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que コート ; « issu de l'anglais 'coat' » donne l'étymon, non une écriture japonaise. 寒, 着 et あたたかい appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « コート を 着ます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_70` シャツ (`n5_v_70`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que シャツ. ワイシャツ (waishatsu) et Tシャツ (T-shatsu) y sont des termes « plus précis » pour la chemise de costume et le t-shirt : d'autres mots, de lecture différente, non des graphies de シャツ. 白 et 洗濯 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « 白い シャツ を 洗濯 します » : します forme 洗濯する, dont シャツ est l'objet (を). C'est un Nする de 洗濯, non de シャツ. Le motif « Nする fléchi » ne le relève pas (espace avant します).
- **T6 · conforme.** Aucune mention de suffixe.

### `v_71` スカート (`n5_v_71`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que スカート. 履く (haku) y est le verbe employé avec le vêtement : un autre mot. 新 et かいました appartiennent à l'exemple.
- **T4 · conforme.** `false`. Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_72` ズボン (`n5_v_72`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que ズボン. パンツ (pantsu) est « le mot d'origine anglaise » aussi utilisé, de lecture différente et qui peut désigner les sous-vêtements : un autre mot, non une graphie de ズボン. 履く est le verbe employé. 黒 appartient à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « ズボン を はいています » (verbe はく). Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

### `v_73` ネクタイ (`n5_v_73`, lot 05) — **conforme**

- **T3 · conforme.** Aucune graphie publiée. La fiche n'a que ネクタイ. 会社 et 赤 appartiennent à l'exemple.
- **T4 · conforme.** `false`. L'exemple a « ネクタイ を つけます ». Aucune formation avec する.
- **T6 · conforme.** Aucune mention de suffixe.

## 3. Questions arbitrées

**G6-T03-Q1 · `v_64` かばん, T3 (graphies) : カバン.** **Arbitrée le 2026-11-16 : option (a), écart confirmé ; correction retenue, non appliquée.**

- **Arbitrage rendu** (relayé par l'utilisateur, sur les recommandations de ChatGPT) :
  - « G6-T03-Q1 — v_64 かばん : option (a) retenue. » ;
  - « Je confirme l'écart T3. La fiche source `n5_v_64` documente explicitement la graphie カバン, absente des données publiées. » ;
  - « Je retiens la correction suivante, non applicable immédiatement : `writings` de `v_64` : ajouter `{ form: "カバン", furigana: "カバン" }`. » ;
  - « Cette recommandation s'appuie sur la fiche source et sur le précédent validé D0397. » ;
  - « Ne modifie ni la forme principale かばん, ni la graphie 鞄, ni les lectures ou les sens. L'anomalie G5 concernant le kanji 鞄 reste distincte. »
- **Effet** : T3 et le statut global de `v_64` restent « écart » ; aucun autre verdict n'est modifié. L'option (b) n'est pas retenue.
- **Correction retenue, décrite, non appliquée** :

  | ENTRY | Forme | Lot | Champ | Avant (publié) | Après (retenu) | Fondement |
  |---|---|---|---|---|---|---|
  | `v_64` | かばん | 00 | `writings` | `[{ form: "鞄", furigana: "<ruby>鞄<rt>かばん</rt></ruby>" }]` | `[{ form: "鞄", furigana: "<ruby>鞄<rt>かばん</rt></ruby>" }, { form: "カバン", furigana: "カバン" }]` | nuance de `n5_v_64` : « souvent écrit en katakana カバン (kaban) au quotidien » ; précédent validé D0397 (`n5_v_81`, `writings` : めがね, メガネ) |

  - **Inchangés** : `word` かばん (D0058), la graphie 鞄 et ses furigana, `readings` (かばん, lecture par défaut), les sens, `suru_compatible`, `suffix`, `counter`, les tags. L'ordre retenu ajoute カバン après 鞄 ; l'ordre des graphies n'est pas un critère de G6.
  - **Voie d'application**, quand elle sera autorisée : celle des corrections retenues (bilan du volet 2, §5, phase B) : réouverture de l'ENTRY dans le lot 00, décision nouvelle `writings` à la fin du journal, validation atomique, publication par `publish --write`. **Aucune de ces étapes n'est faite ni préparée ici** ; aucun identifiant de décision n'est réservé.
  - **Essai à blanc du validateur** (copie jetable de `data/`, hors dépôt, supprimable) : la graphie ajoutée à `v_64` dans la copie, `validateData` rend 0 erreur et les 149 mêmes avertissements que `data/` réel. **Limite** : cet essai ne porte que sur la projection `data/` ; il ne vaut ni assemblage ni validation de la décision future.
- **Vérification de non-doublon** (relevé par script, lecture seule ; contrôle d'arbitrage, §6) :
  - liste des corrections retenues du bilan (`docs/rapports/etape2-A2-05-bilan-volet2.md`) : 194 lignes `V1-n` / `V2-n` au §8 et 10 modifications au §2, soit **204**, dans **177 ENTRY**, recalculées par `calculerEtat` (`a2-05-travail/sync-stable.mjs`) : 204, 177, prochain numéro libre V1-32, réservés V1-22 et V1-23 ;
  - **aucune** de ces 204 corrections ne porte sur `v_64` (ni sur l'ENTRY, ni sur un de ses sens), **aucune** sur le champ `writings`, **aucune** ne cite カバン ; le bilan ne mentionne `v_64` qu'une fois, au §8.132 (G5, kanji 鞄) ;
  - journal : les décisions sur `n5_v_64` sont D0014 (entrée), D0047 (`senses`), D0058 (`word`) ; sur `n5_v_227`, D0014 seule ; **aucune décision sur `writings` ; aucune décision ne cite カバン** ;
  - données publiées : `writings` de `v_64` vaut `[鞄]` seule ; la correction n'est donc **ni appliquée ni déjà présente** ;
  - **conclusion : la correction est nouvelle ; elle ne double aucune correction retenue** (règle de non-doublon du cadrage, Q3).
- **Distinction maintenue avec G5** : la graphie 鞄 est conforme au regard de G6 ; l'anomalie de G5 (kanji 鞄 absent des kanji connus et du dictionnaire, K3, K8) reste rattachée à la tâche de données sur les kanji (G5-A1), inchangée. L'ajout de カバン n'y change rien.
- **Décomptes** : la proposition de mise à jour, non appliquée, est dans `arbitrage/proposition-decomptes-G6-T03.md`. Elle porte la question de l'identifiant de la correction, qui n'était pas attribué lors de la préparation. **À l'inscription** : identifiant **V3-1** (I-1, option (b), 2026-11-16) ; décomptes calculés : 205 corrections dans 178 ENTRY (les 204 des volets 1 et 2, dans 177 ENTRY, et V3-1 sur `v_64`), après l'adaptation de `a2-05-travail/sync-stable.mjs`, qui compte la série V3 (bilan du volet 2, §8.135). Le constat C1 de `controle-G6.mjs` (« aucune correction retenue ne porte sur `writings` ») ne vaut que pour les 204 corrections historiques.

**G6-T03-Q2 · Indices des graphies en kana.** **Arbitrée le 2026-11-16 : option (a), aide de lecture inchangée, limite documentée.**

- **Arbitrage rendu** : « G6-T03-Q2 — option (a) retenue. » ; « Conserve l'aide de lecture inchangée. Documente sa limite : les graphies uniquement en kana peuvent échapper aux indices automatiques. La lecture intégrale de chaque fiche reste obligatoire. »
- **Effet** : `aide-lecture-tranche.mjs` (`ea04bd6e…`) reste inchangé (empreinte vérifiée, §6) ; l'option (b) n'est pas retenue, aucun script n'est révisé. La limite est documentée au §4 (L4). Aucun verdict de la tranche n'en dépend.
- **Portée pour les tranches suivantes** : chaque rapport de tranche reprend la limite L4 ; la lecture intégrale de chaque fiche reste la seule base du verdict. Cela ne vaut pas autorisation de G6-T04.

Les questions et leurs options sont conservées ci-dessous, telles qu'elles ont été proposées le 2026-11-15.

**G6-T03-Q1 · `v_64` かばん, T3 (graphies) : カバン.**
- **Constat** : la fiche de l'entrée `n5_v_64` documente « souvent écrit en katakana カバン (kaban) » ; la graphie n'est pas publiée, et aucune décision ne l'écarte (§2, `v_64`).
- **Options** :
  - **(a) [R] écart ; correction retenue, non appliquée** : ajouter `{ form: "カバン", furigana: "カバン" }` à `writings` de `v_64`, par une décision nouvelle de journal, sur le précédent D0397 (メガネ). La correction rejoindrait la liste des corrections retenues, selon la procédure du volet 2, et ne serait appliquée qu'avec elles, sur autorisation distincte. Le décompte de 204 n'est pas modifié par la présente proposition ; il ne le serait qu'à l'inscription de l'arbitrage.
  - **(b) conforme, sans correction** : il faudrait tenir qu'une écriture en katakana citée par la nuance n'est pas une graphie. Cela contredit D0397 et le critère du lot 20 ; je ne le recommande pas.
- **Effet du choix** : le verdict global de `v_64` reste « écart » avec (a), devient « conforme » avec (b). Aucun autre verdict de la tranche n'en dépend. Dans les deux cas, la graphie 鞄 reste conforme au regard de G6, et l'anomalie de G5 (kanji 鞄 absent des kanji connus) reste inchangée.

**G6-T03-Q2 · Indices des graphies en kana** (méthode, sans effet sur les 24 verdicts).
- **Constat** : la grille G6 et l'aide de lecture réutilisable ne relèvent que des segments à kanji. Une graphie en hiragana ou en katakana citée par une nuance (カバン) ne produit aucun indice ; seule la lecture entière de la fiche la trouve.
- **Options** :
  - **(a) [R]** garder l'aide inchangée pour G6-T04 et la suite, la lecture entière restant la seule base du verdict, et consigner cette limite (L4) dans chaque rapport de tranche ;
  - **(b)** réviser l'aide réutilisable pour relever aussi les segments en kana voisins de « écrit » ou de « katakana », « hiragana » : modification d'un script relu, sur autorisation distincte, avec un essai de non-régression sur G6-T01 à G6-T03.
- **Hors du présent examen** : je n'ai pas relu G6-T01 ni G6-T02 sous cet angle. Leurs fiches ont été lues entières lors de leur examen.

## 4. Limites et constats de méthode

- **L1 · Indices de grille** (G6-T01, M1, M2) : ils comparent le texte balisé et ne lisent que la fiche de l'entrée. Effet ici : « 下りる absente mot pour mot » (`v_63`), dû au ruby.
- **L2 · Motif « Nする fléchi »** : un indice, faux positif connu (`v_50`, 差します). Les autres する des exemples (`v_70`, 洗濯 します) et les formes en -します de verbes (`v_61`, 動かします) ont été examinés à la lecture : aucun ne porte sur l'ENTRY.
- **L3 · Champs lus par l'aide** : `word`, `word_furigana`, traductions, `nuance`, exemple ; non `reading`. D'où « はく absente » dans `n5_v_549` (`v_68`).
- **L4 · Indices limités aux kanji** (nouveau constat) : ni la grille ni l'aide ne relèvent une graphie en kana citée par une nuance. Cas de la tranche : カバン (`v_64`), trouvé à la lecture (Q2). **Limite documentée (G6-T03-Q2, option (a), arbitrée le 2026-11-16)** : l'aide de lecture est conservée inchangée ; **les graphies uniquement en kana peuvent échapper aux indices automatiques** ; **la lecture intégrale de chaque fiche reste obligatoire**, et elle seule fonde le verdict.
- **M1 · Portée.** Ces verdicts portent sur T3, T4 et T6 seuls. Les catégories, types, sens et nuances ne sont pas réexaminés (volet 1) ; les lectures et furigana relèvent de T1 et T2, automatiques ; les kanji, de G5.
- **M2 · Autres mots cités par les fiches.** 体 (からだ, `v_61`), 重い (`v_62`), 着る (`v_68`), ワイシャツ, Tシャツ (`v_70`), パンツ (`v_72`) et le verbe 履く (`v_71`, `v_72`) sont présentés comme d'autres mots, de lecture ou de sens différents ; ils sont lus comme tels, non comme des graphies.
- **M3 · Défauts de texte des fiches sources**, signalés sans correction (les sources figées restent intactes ; aucun n'est une graphie ni une donnée publiée) :
  - `n5_v_50` : rangement « cactions_generiques » (coquille de l'ancienne catégorie) ;
  - `n5_v_51` : romaji de l'exemple « arainasu » pour 洗います ;
  - `n5_v_64` : note éditoriale dans la nuance (« *(Note : classé ici dans le lot courant, bien qu'il s'agisse d'un objet usuel).* ») ; romaji « kyokasho » pour 教科書[きょうかしょ] ;
  - `n5_v_227` : « つ[つ] (tsu) », balise ruby posée sur un kana ;
  - `n5_v_549` : marques de gras (`**`) dans l'exemple japonais ; mot mis en relief « 履く », absent tel quel de l'exemple (« 履いて ») ;
  - `n5_v_67` : « Flur (odorat) », déjà traité par D0118 (validée) ;
  - `n5_v_55` : traduction anglaise « Sickness », déjà traitée par D0135 (validée).

## 5. Observations hors périmètre, sans verdict

- **Corrections déjà retenues sur des ENTRY de la tranche, non appliquées** (parmi les 204) : nuances V2-97 (`v_52`), V2-43 (`v_55`), V2-44 (`v_57`), V2-45 (`v_58`), V2-46 (`v_65_s2`) (volet 1, lot 2) ; catégorie V1-11 (`v_68_s1`, volet 1, lot 3, T1) ; type de `v_65_s2`, `null` → `propriete` (volet 2, correction n° 2). G6 ne les reprend pas, et aucune constatation nouvelle n'en naît.
- **G5** : kanji 鞄 (`v_64`, graphie) absent des kanji connus et du dictionnaire (K3, K8) ; rattaché à la tâche de données sur les kanji (G5-A1). Distinct de l'écart de G6 (§2, `v_64`).
- La nuance publiée de `v_63` (下りる, escalier, pente) a été jugée « sourcée » au volet 1 (lot 2, tranche 1).

## 6. Contrôles et aide de lecture (lecture seule)

- **Aide de lecture** : `aide-lecture-tranche.mjs`, sortie `sortie-aide-lecture-G6-T03.txt` (`5a6402c3…`), produite et relue à la préparation ; reprise telle quelle. « aucun verdict rendu par ce script ».
- **Contrôle d'examen** : `examen/controle-examen-G6-T03.mjs` (copie de `controle-examen-G6-T02.mjs`, noms, empreintes et décomptes adaptés), sortie `examen/sortie-controle-examen-G6-T03.txt`. Il vérifie :
  - que les pièces relues de la préparation sont inchangées (empreintes) ;
  - que la grille examinée a les mêmes 24 ENTRY, dans le même ordre, que la grille de préparation ;
  - que chaque ligne porte un statut admis, « sans objet » pour T4 exactement hors « nom », et le statut global le plus défavorable ;
  - les décomptes (18 T4 applicables ; 23 conformes, 1 écart, 0 à arbitrer) ;
  - que le rapport a une section par ENTRY, avec le même statut global, et deux questions (Q1, Q2) ;
  - qu'aucune zone protégée n'est modifiée.
- **Contrôle d'arbitrage** : `arbitrage/controle-arbitrage-G6-T03.mjs`, sortie `arbitrage/sortie-controle-arbitrage-G6-T03.txt`, en lecture seule. Il vérifie :
  - que les pièces de préparation et d'examen, et l'aide de lecture, sont inchangées (empreintes) ;
  - que la grille arbitrée reprend les 24 lignes de la grille examinée, identiques sauf la justification de `v_64`, dont les statuts restent « écart » ;
  - les statuts admis, le statut global le plus défavorable et les décomptes (23 conformes, 1 écart, 0 à arbitrer ; 18 T4) ;
  - que le rapport arbitré a 24 sections, mêmes ENTRY, ordre et statuts, et consigne Q1 (a), Q2 (a), la correction retenue et la limite L4 ;
  - la non-doublon de la correction (bilan, journal, données publiées) et les décomptes actuels (`calculerEtat`) ;
  - qu'aucune zone suivie n'est modifiée et que l'index est vide.

## 7. Ce qui n'est pas fait

- Aucune modification de `data/`, des lots, du journal, des sources (fiches de l'entrée et fiches absorbées), des références normatives, des outils ni des tests.
- Aucune décision de journal ; la correction retenue de Q1 est décrite, ni écrite au journal ni appliquée ; lors de la préparation de cette version, elle n'était pas inscrite dans la liste des corrections du bilan, et aucun identifiant ne lui était attribué ; l'inscription l'y porte sous l'identifiant V3-1 (bilan du volet 2, §8.135).
- Aucune modification de l'aide de lecture (Q2, option (a)).
- Aucune mise à jour des décomptes dans les documents de pilotage lors de la préparation de cette version : la proposition est un fichier distinct (`arbitrage/proposition-decomptes-G6-T03.md`).
- Aucune inscription lors de la préparation de cette version ; l'inscription est faite ensuite par la consignation de G6-T03 (bilan du volet 2, §8.135), qui actualise aussi les décomptes et la phrase Git d'`ETAT-ACTUEL.md` et de `ROADMAP.md`. Le rapport G6 final n'est pas écrit.
- G6-T04 à G6-T29, G4, G7 et les autres contrôles ne sont pas commencés.
- Rien n'était indexé, committé ni poussé lors de la préparation de cette version.
