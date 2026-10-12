# Étape 2 · A2-05 · Volet 1 · Lot 2 — périmètre proposé de la tranche 6 du contrôle de provenance

**Date** : 2026-10-12
**Statut** : **périmètre arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l'utilisateur) : **47 nuances des lots 10 et 11, dans 41 ENTRY, sans ajout ni retrait** ; **cinq livraisons** : 6a (10), 6b (9), 6c (10), 6d (7), 6e (11). **Audit documentaire autorisé pour 6a seule** ; chaque livraison suivante attend l'arbitrage de la précédente. Les 377 candidats C1 à C10 et les 147 arbitrages du volet 2 ne sont pas rouverts ; la tranche reste strictement limitée à la provenance des nuances. **Ordre fixé par le même arbitrage** : un checkpoint Git documentaire est préparé et relu avant l'audit de 6a. La proposition est conservée telle quelle ci-dessous.

**Statut d'origine (proposition)** : *proposition de périmètre, non arbitrée. Aucun audit lexical de la tranche 6 n'est commencé : aucune nuance n'a été lue en vue d'un verdict.* Calculé par `a2-05-travail/perimetre-v1-lot2-t6.mjs`, en lecture seule, sur le plan arbitré (`provenance/plan-tranches.json`) ; rien n'est modifié dans les données, le journal, les registres, les outils ni les snapshots. Les chaînes citées ci-dessous sont celles que le criblage et le tri ont relevées mécaniquement ; aucune fiche source n'a été ouverte pour ce rapport.

## 1. Point de départ

**La tranche 5 est close** (arbitrage de 5c du 2026-10-12 ; lots 08 et 09 : 29 nuances, 14 sourcées, 2 assumées, 13 écarts). Avec le bloc 1 bis et les tranches 2 à 4, **148 des 278 nuances du plan sont arbitrées ; restent 130**, réparties par le plan arbitré : tranche 6 : 47 ; tranche 7 : 39 ; tranche 8 : 44. **124 corrections retenues (10 + 5 + 109), dans 112 ENTRY, aucune appliquée** ; 377 candidats des axes C1 à C10 et 147 arbitrages du volet 2 inchangés. Plus aucune nuance hors JLPT n'est à contrôler.

## 2. Composition, thème et taille

**La tranche 6 est celle du plan arbitré : toutes les nuances restantes des lots 10 et 11, et elles seules.** Lot 10 : « Position, direction et orientation » ; lot 11 : « Démonstratifs, interrogatifs et pronoms ». **Thème** : les mots de repérage, dans l'espace (noms de position, directions, distance) et dans l'énonciation (démonstratifs, interrogatifs, pronoms). Ce sont des mots courts et fonctionnels : le lot 10 est surtout signalé par de brèves locutions (classe D), le lot 11 par des renvois d'un mot de série à l'autre (こちら et こっち, どちら et どこ, 誰 et どなた ; classes A et B) et par des formules.

**Taille : 47 nuances, dans 41 ENTRY** : 35 à examiner, 8 faux positifs présumés à contre-vérifier, 4 relevées par un caractère isolé seulement ; 16 nuances d'ENTRY, 31 nuances de sens. Par lot : 10 : 19 (18 ENTRY) ; 11 : 28 (23 ENTRY). **Aucune particule** ne reste à contrôler.

**Lot d'origine** : chaque ENTRY figure dans le fichier du lot indiqué, et les 118 décisions de journal de ces 41 ENTRY sont toutes des lots 10 et 11 : aucune n'a été rouverte ni décidée ailleurs.

| # | Livraison | Unité | Mot | Sens (traduction principale publiée) | Lot | Statut | Classe | Chaînes (signalées — écartées par le tri — d'un caractère) | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Renvois relevés (tranche de l'ENTRY citée) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 6a | `v_43` (nuance d'ENTRY) | 隣 | — | 10 | à examiner | D | 隣の家 | — | — | — |
| 2 | 6a | `v_341` (nuance d'ENTRY) | そば | — | 10 | à examiner | E | 蕎麦 | — | — | — |
| 3 | 6a | `v_345` (nuance d'ENTRY) | 上 | — | 10 | un caractère seulement | S1 | un caractère : の ; に | — | — | — |
| 4 | 6a | `v_346` (nuance d'ENTRY) | 中 | — | 10 | à examiner | E | ちゅう ; じゅう — un caractère : の ; に ; 中 | — | — | 十 (8) |
| 5 | 6a | `v_352` (nuance d'ENTRY) | 外 | — | 10 | à examiner | D | 外で遊ぶ — un caractère : 中 | — | — | 中 (6) |
| 6 | 6a | `v_354` (nuance d'ENTRY) | 後ろ | — | 10 | un caractère seulement | S1 | un caractère : の | — | — | — |
| 7 | 6a | `v_356` (nuance d'ENTRY) | 横 | — | 10 | à examiner | D | 横に置く — un caractère : 縦 (absent des fiches) | — | — | 縦 (6) |
| 8 | 6a | `v_597` (nuance d'ENTRY) | 縦 | — | 10 | à examiner | D | 縦に書く — un caractère : 横 | `v_597_s1` | — | 横 (6) |
| 9 | 6a | `v_630` (nuance d'ENTRY) | 下 | — | 10 | faux positif à contre-vérifier | B-transcription | écartées : 机の下に (par la lecture) | — | — | — |
| 10 | 6a | `v_696` (nuance d'ENTRY) | 表 | — | 10 | à examiner | E | ひょう — un caractère : 裏 ; 表 | — | `v_696_s1` | — |
| 11 | 6b | `v_347_s1` | 先 | « Avant (plus loin) » | 10 | à examiner | D | この先 ; ペンの先 | `v_347_s1` | — | — |
| 12 | 6b | `v_348_s2` | 前 | « Avant (dans le temps) » | 10 | à examiner | D | 三年前 ; 食べる前に | `v_348_s2` | — | — |
| 13 | 6b | `v_349` (nuance d'ENTRY) | 北 | — | 10 | à examiner | D | 北口 | `v_349_s1` | — | — |
| 14 | 6b | `v_350` (nuance d'ENTRY) | 南 | — | 10 | à examiner | D | 南口 | `v_350_s1` | — | — |
| 15 | 6b | `v_358` (nuance d'ENTRY) | 角 | — | 10 | à examiner | D | 次の角を右に曲がる ; つの — un caractère : 角 | — | — | — |
| 16 | 6b | `v_360` (nuance d'ENTRY) | 近い | — | 10 | à examiner | D | 駅に近い | `v_360_s1` | — | — |
| 17 | 6b | `v_362` (nuance d'ENTRY) | 遠い | — | 10 | à examiner | D | 駅から遠い | — | — | — |
| 18 | 6b | `v_704_s1` | 近く | « Environs » | 10 | faux positif à contre-vérifier | B-transcription | écartées : 駅の近くに (par la lecture) | `v_704_s1` | — | — |
| 19 | 6b | `v_704_s2` | 近く | « Prochainement » | 10 | à examiner | D | 近く結婚します | `v_704_s2` | — | — |
| 20 | 6c | `v_339_s1` | こちら | « Par ici » | 11 | à examiner | A | こっち | `v_339_s1` | — | こっち (6) |
| 21 | 6c | `v_339_s2` | こちら | « Moi, nous (poli) » | 11 | à examiner | D | こちらこそ ; こちらは田中です | `v_339_s2` | — | — |
| 22 | 6c | `v_340_s1` | そちら | « Par là » | 11 | à examiner | A | そっち | `v_340_s1` | — | そっち (6) |
| 23 | 6c | `v_404_s1` | あちら | « Là-bas (poli) » | 11 | à examiner | A | あっち — écartées : あそこ (par la lecture) | `v_404_s1` | — | あそこ (6) ; あっち (6) |
| 24 | 6c | `v_404_s2` | あちら | « Cette personne-là (poli) » | 11 | à examiner | D | あちらは田中さんです | `v_404_s2` | — | — |
| 25 | 6c | `v_405_s1` | あっち | « Par là-bas » | 11 | faux positif à contre-vérifier | B-romaji | écartées : あちら (par la lecture) | `v_405_s1` | — | あちら (6) |
| 26 | 6c | `v_406_s1` | あの | « Ce … là-bas » | 11 | à examiner | D | あの本 | `v_406_s1` | — | — |
| 27 | 6c | `v_409_s2` | こっち | « Moi, mon camp » | 11 | à examiner | D | こっちの話 | `v_409_s2` | — | — |
| 28 | 6c | `v_412_s1` | こんな | « Ce genre de » | 11 | à examiner | D | こんな本 | `v_412_s1` | — | — |
| 29 | 6c | `v_414_s2` | そっち | « Toi, ton camp » | 11 | à examiner | D | そっちはどう | `v_414_s2` | — | — |
| 30 | 6d | `v_343_s1` | どっち | « Lequel (des deux) » | 11 | faux positif à contre-vérifier | B-romaji | écartées : どちら (par la lecture) | `v_343_s1` | — | どちら (6) |
| 31 | 6d | `v_396` (nuance d'ENTRY) | どちら | — | 11 | à examiner | A | どこ | `v_396_s1`, `v_396_s2`, `v_396_s3` | — | どこ (6) ; どっち (6) ; どれ (6) |
| 32 | 6d | `v_396_s1` | どちら | « Lequel (des deux) » | 11 | à examiner | D | コーヒーと紅茶とどちらがいいですか | `v_396_s1` | — | — |
| 33 | 6d | `v_396_s2` | どちら | « Où (poli) » | 11 | à examiner | A | どこ | `v_396_s2` | — | どこ (6) |
| 34 | 6d | `v_396_s3` | どちら | « Qui (poli) » | 11 | à examiner | D | どちら様ですか | `v_396_s3` | — | — |
| 35 | 6d | `v_398_s1` | どの | « Quel … » | 11 | à examiner | D | どの本ですか | `v_398_s1` | — | — |
| 36 | 6d | `v_399_s1` | どれ | « Lequel » | 11 | à examiner | A | どちら ; どっち | `v_399_s1` | — | どちら (6) ; どっち (6) |
| 37 | 6e | `v_390_s1` | いかが | « Comment (poli) » | 11 | à examiner | D | お茶はいかがですか | `v_390_s1` | — | どう (6) |
| 38 | 6e | `v_393_s1` | どう | « Comment » | 11 | à examiner | A | いかが | `v_393_s1` | — | いかが (6) |
| 39 | 6e | `v_397_s1` | どなた | « Qui (poli) » | 11 | un caractère seulement | S1 | un caractère : 誰 | `v_397_s1` | — | 誰 (6) |
| 40 | 6e | `v_400_s1` | なぜ | « Pourquoi » | 11 | faux positif à contre-vérifier | B-romaji | écartées : どうして (par la lecture) | `v_400_s1` | — | どうして (6) |
| 41 | 6e | `v_402_s1` | 誰 | « Qui » | 11 | faux positif à contre-vérifier | B-romaji | écartées : どなた (par la lecture) | `v_402_s1` | — | どなた (6) |
| 42 | 6e | `v_581_s1` | あなた | « Vous » | 11 | faux positif à contre-vérifier | B-romaji | écartées : さん (par la lecture) | `v_581_s1` | — | 三 (8) |
| 43 | 6e | `v_585_s1` | いくつ | « Combien » | 11 | à examiner | D | おいくつですか — un caractère : つ | `v_585_s1` | — | — |
| 44 | 6e | `v_606_s1` | 皆 | « Tout le monde » | 11 | faux positif à contre-vérifier | B-transcription | écartées : 皆さん (par la lecture) | — | `v_606_s1` | 皆さん (2) |
| 45 | 6e | `v_688_s1` | 私 | « Je » | 11 | à examiner | D | わたくし ; 私の本 | `v_688_s1` | — | — |
| 46 | 6e | `v_691_s1` | 自分 | « Soi-même » | 11 | à examiner | D | 自分でやります | — | `v_691_s1` | — |
| 47 | 6e | `v_700_s1` | 誰か | « Quelqu'un » | 11 | un caractère seulement | S1 | un caractère : 誰 ; か | — | `v_700_s1` | 誰 (6) |

## 3. Classes de détection

La classe d'une nuance est celle de sa chaîne la plus lourde (tri factuel du lot 2) ; elle **oriente la lecture et ne préjuge d'aucun verdict**. Chaque nuance sera lue en entier, chaînes d'un caractère comprises, sur ses fiches entières (fiches fusionnées, exemples, anciens exemples, décisions).

| Classe | Définition | Nuances | Question à poser à la fiche |
|---|---|---|---|
| A | A-renvoi : la chaîne est le mot, une graphie ou une lecture d'une autre ENTRY publiée, que les fiches ne citent pas | 7 : こちら (sens 1), そちら (sens 1), どう (sens 1), どちら, どちら (sens 2), どれ (sens 1), あちら (sens 1) | la fiche cite-t-elle ce mot, et sous cette graphie ; sinon, une décision validée l'assume-t-elle avec un fondement vérifiable ? |
| D | D-exemple construit : une suite de mots absente des fiches | 25 : 隣, 先 (sens 1), 前 (sens 2), 北, 南, 外, 横, 角, 近い, 遠い, 縦, 近く (sens 2), こちら (sens 2), いかが (sens 1), どちら (sens 1), どちら (sens 3), どの (sens 1), あちら (sens 2), あの (sens 1), こっち (sens 2), こんな (sens 1), そっち (sens 2), いくつ (sens 1), 私 (sens 1), 自分 (sens 1) | la suite est-elle un exemple de la fiche, à la forme du dictionnaire, sans mot, particule ni construction changés, et sous les graphies que la fiche atteste ? |
| E | E-autre mot : un mot japonais absent des fiches et du vocabulaire publié | 3 : そば, 中, 表 | la fiche, ou une décision au fondement vérifiable, donne-t-elle ce mot ? |
| B-romaji | faux positif présumé, rapproché par le romaji de la fiche | 5 : どっち (sens 1), なぜ (sens 1), 誰 (sens 1), あっち (sens 1), あなた (sens 1) | le mot de la fiche est-il le même mot, et sa graphie publiée est-elle attestée, ou seulement sa lecture ? |
| B-transcription | faux positif présumé, rapproché par une autre écriture (kana, kanji, furigana) | 3 : 下, 近く (sens 1), 皆 (sens 1) | la correspondance repose-t-elle sur la graphie du mot, ou sur sa seule lecture (homophone possible) ? |
| S1 | jamais signalée par le criblage ; relevée par une chaîne d'un seul caractère | 4 : 上, 後ろ, どなた (sens 1), 誰か (sens 1) | le caractère est-il un mot que la fiche écrit, ou seulement un élément d'un mot plus long ? |

**Nuances à chaînes de classes différentes** (la classe la plus lourde figure au tableau ; toutes les chaînes seront contrôlées) : 中 (ちゅう : E-autre-mot ; じゅう : A-renvoi) ; 角 (次の角を右に曲がる : D-exemple-construit ; つの : E-autre-mot) ; こちら (sens 2) (こちらこそ : C-forme-de-l-entree ; こちらは田中です : D-exemple-construit) ; あちら (sens 1) (あそこ : B-romaji ; あっち : A-renvoi) ; 私 (sens 1) (わたくし : C-forme-de-l-entree ; 私の本 : D-exemple-construit).

**Chaînes d'un caractère relevées** : 11 nuances en portent ; 1 a un caractère absent de tous les textes des fiches (横 : 縦). Le relevé sert au seul repérage : un caractère isolé n'est jamais une preuve.

**Faux positifs présumés (8)** : 下 (机の下に) ; 近く (sens 1) (駅の近くに) ; どっち (sens 1) (どちら) ; なぜ (sens 1) (どうして) ; 誰 (sens 1) (どなた) ; あっち (sens 1) (あちら) ; あなた (sens 1) (さん) ; 皆 (sens 1) (皆さん). Chacun est contre-vérifié individuellement : l'identité du mot se distingue de la simple identité de lecture (défaut du tri retenu à l'arbitrage du 2026-10-10).

## 4. Chevauchements, dépendances et comparables

- **Candidats du volet 1 (axes C1 à C10)** : 33 nuances sur 47 portent sur un sens candidat ou sur une ENTRY qui en a un (**32 sens distincts sur 377**) : lot 10, 8 nuances (`v_347_s1` 先 ; `v_348_s2` 前 ; `v_349` 北 ; `v_350` 南 ; `v_360` 近い ; `v_597` 縦 ; `v_704_s2` 近く ; `v_704_s1` 近く) ; lot 11, 25 nuances sur 28 (toutes sauf `v_691_s1` 自分 ; `v_606_s1` 皆 ; `v_700_s1` 誰か). Ils restent candidats pour leurs propres relevés ; **le décompte reste 377**. Le chevauchement est bien plus fort que dans les tranches précédentes (6 sens à la tranche 5). Règles du criblage en cause, par nombre de sens : C4-0 (22), C2-0 (18), C1-a (5), C3-0 (4), RES (4), C1-b (2), C3-b (2), C1-f (1), C3-d (1), C7-b (1), C7-c (1) ; C4-0 et C2-0 sont les populations imposées « `semantic_type: null` avec une fonction linguistique » et « `category: null` avec une fonction linguistique » ; RES est le point réservé de la deixis temporelle (`v_347_s1` 先, `v_348_s2` 前, `v_704_s2` 近く, `v_704_s1` 近く). **Le contrôle ne porte que sur le champ `nuance`** : il n'ouvre ni l'examen de ces fonctions, ni le chantier normatif de `interrogatif`, ni le point réservé de la deixis temporelle.
- **Sens des 147 du volet 2** : 4 nuances (`v_696` 表 ; `v_691_s1` 自分 ; `v_606_s1` 皆 ; `v_700_s1` 誰か) ; leurs verdicts ne sont pas rouverts : le contrôle ne porte que sur `nuance`.
- **Corrections déjà retenues sur les mêmes ENTRY** (recherche dans les 124 lignes de la liste globale) : 表 (volet 2, n° 3, `v_696_s1`) ; 皆 (volet 2, n° 4, `v_606_s1`) ; elles visent `semantic_type` et `category`, non `nuance`. Aucune correction V1 ni V2 ne vise une ENTRY de la tranche.
- **Renvois vers des ENTRY des lots déjà traités** (lecture croisée, précédents cités, non rouverts) : 皆 → 皆さん (2).
- **Renvois à l'intérieur des lots 10 et 11** : dans la même livraison : 外 → 中 ; 横 → 縦 ; 縦 → 横 ; こちら → こっち ; そちら → そっち ; いかが → どう ; どう → いかが ; どちら → どっち ; どちら → どれ ; どれ → どちら ; どれ → どっち ; あちら → あっち ; どっち → どちら ; 誰 → どなた ; あっち → あちら ; どなた → 誰 ; 誰か → 誰 ; d'une livraison à l'autre : aucun ; vers une ENTRY des lots 10 et 11 qui n'a aucune nuance au plan (sa fiche sera lue pour le renvoi, sans verdict sur elle) : どちら → どこ ; あちら → あそこ ; なぜ → どうして.
- **Rapprochements du tri vers les tranches suivantes** : 中 → 十 (8) ; あなた → 三 (8). Ce sont des rapprochements mécaniques par la lecture, à contre-vérifier comme tels ; ils ne préjugent pas que la nuance renvoie à ces ENTRY.
- **`v_704_s1` 近く figure déjà à la tranche 1, pour un autre élément** : la tranche 1 a contrôlé sa **particule** の (sourcée, arbitrée le 2026-10-10) ; le plan range ici sa **nuance**, faux positif présumé. Il n'y a ni double compte ni réouverture : les 278 nuances du plan ne comprennent pas les particules.
- **Comparables utiles déjà arbitrés** (cités pour la cohérence, non rouverts) : お手洗い / トイレ (V2-76) et クラス / 教室 (D0414 ; V2-87) : un renvoi d'un mot à son voisin n'est sourcé que par la fiche examinée, et assumé que par une décision au fondement vérifiable, l'attestation réciproque ne suffisant pas (comparables pour les renvois entre こちら et こっち, どちら et どこ, どう et いかが, 誰 et どなた) ; 国 (V2-109 : お国はどちらですか, question honorifique construite) et les formes honorifiques des lots 01 et 02 (critère 3), pour les chaînes おいくつですか, どちら様ですか, お茶はいかがですか ; 皆さん (V2-53 : みんな, transcription en kana recevable), que le tri rapproche de 皆 ; 方 (V2-51 : あの方) ; 話す (5b) et 泳ぐ (5c) : variante expressément autorisée par la description de la fiche ; 橋 et 花 (bloc 1 bis), 弾く (5c) : traitement d'un homophone ; 来る (V2-25) et いい (V2-31) : forme que la fiche nomme sans l'écrire.
- **Précédents applicables, sans changement** : critères 1 à 3 ; graphie attestée pour le mot, jamais déduite par analogie (lot 00) ; transcription en kana d'un romaji attesté recevable, sans ajout de kanji (lot 01) ; classement **sourcé / assumé / écart** (lot 02) ; une attestation dans la fiche d'une autre ENTRY ne suffit pas sans décision (lot 03) ; une décision qui nomme une expression pour fonder un découpage ne la source pas (lots 02 et 06) ; forme du dictionnaire et retrait de mots non essentiels admis, complément ou particule changés non admis (5a) ; variante expressément autorisée par la description de la fiche (5b) ; information française attestée préservée.

## 5. Découpage proposé

**Cinq livraisons de 7 à 11 nuances, pour que chaque fiche soit lue en entier** (les livraisons de la tranche 5 en comptaient 9, 9 et 11). Chaque lot est coupé par sous-thème ; aucune ENTRY n'est partagée entre deux livraisons.

| Livraison | Contenu | Nuances | ENTRY |
|---|---|---|---|
| 6a | lot 10, **positions relatives** : 隣, そば, 中, 外, 横, 縦, 表, 下, 上, 後ろ | 10 | 10 |
| 6b | lot 10, **directions, distance et repères** : 先 (sens 1), 前 (sens 2), 北, 南, 角, 近い, 遠い, 近く (sens 2), 近く (sens 1) | 9 | 8 |
| 6c | lot 11, **séries こ, そ, あ** (démonstratifs) : こちら (sens 1), こちら (sens 2), そちら (sens 1), あちら (sens 1), あちら (sens 2), あの (sens 1), こっち (sens 2), こんな (sens 1), そっち (sens 2), あっち (sens 1) | 10 | 8 |
| 6d | lot 11, **どちら et le choix** : どちら, どちら (sens 1), どちら (sens 2), どちら (sens 3), どの (sens 1), どれ (sens 1), どっち (sens 1) | 7 | 4 |
| 6e | lot 11, **autres interrogatifs et pronoms de personne** : いかが (sens 1), どう (sens 1), いくつ (sens 1), 私 (sens 1), 自分 (sens 1), なぜ (sens 1), 誰 (sens 1), あなた (sens 1), 皆 (sens 1), どなた (sens 1), 誰か (sens 1) | 11 | 11 |
| **Total** | | **47** | **41** |

**Raisons du découpage** (d'après les seuls relevés du tri) :

- **6a** réunit les noms de position, dont les couples que le tri rapproche (中 et 外, 横 et 縦) et les trois nuances de classe E (そば, 中, 表) ;
- **6b** réunit les points cardinaux et l'angle (北, 南, 角), la distance (近い, 遠い, les deux sens de 近く) et les deux sens signalés de 先 et de 前 ;
- **6c** tient ensemble les séries こ, そ, あ, dont les formes en ちら sont rapprochées de leurs formes en っち (こちら et こっち, そちら et そっち, あちら et あっち) ;
- **6d** tient ensemble les quatre nuances de どちら (trois sens et l'ENTRY) et les mots dont le tri les rapproche (どっち, どれ), avec どの ;
- **6e** réunit les autres interrogatifs (いかが et どう, なぜ, いくつ), les trois mots 誰, どなた et 誰か, et les pronoms (私, あなた, 自分, 皆).

**Options** : (1) quatre livraisons, en réunissant 6d et 6e (18 nuances : tous les interrogatifs et les pronoms) ; (2) deux livraisons par lot (19 et 28), comme pour les tranches 3 et 4. **Je propose cinq livraisons** : le lot 11 compte 28 nuances presque toutes candidates du volet 1, aux renvois croisés serrés, et une livraison de 28 ne permettrait pas de lire chaque fiche en entier.

**Ordre proposé** : 6a, 6b, 6c, 6d, 6e ; chaque livraison après l'arbitrage de la précédente, sans nouvelle décision de périmètre.

## 6. Critères reproductibles de complétude

Calculés par `a2-05-travail/perimetre-v1-lot2-t6.mjs`, qui s'arrête au premier écart :

1. **Point de départ** : le plan compte 278 nuances ; 148 sont arbitrées (bloc 1 bis 10, tranche 2 43, tranche 3 36, tranche 4 30, tranche 5 29) ; il en reste 130. Le rapport de 5c porte l'arbitrage du 2026-10-12 et la clôture de la tranche 5.
2. **Tranche 6** : 47 identifiants distincts ; ce sont exactement les nuances restantes des lots 10 et 11, et aucune nuance restante de ces lots n'est hors de la tranche ; chaque ENTRY et chaque SENSE existe dans l'état publié ; chaque ENTRY est dans le fichier de son lot, et toutes ses décisions de journal sont des lots 10 et 11.
3. **Livraisons** : 6a (10) + 6b (9) + 6c (10) + 6d (7) + 6e (11) = 47, disjointes ; 6a et 6b forment exactement le lot 10 (19) ; 6c, 6d et 6e exactement le lot 11 (28) ; aucune ENTRY n'est partagée entre deux livraisons.
4. **Après la tranche 6** : il resterait 83 nuances du plan (tranche 7 : 39 ; tranche 8 : 44).
5. **Décomptes inchangés** : volet 2, 147 sur 147 (L 136, F 2, C 9, N 0) ; 377 candidats (les 32 de la tranche sont tous retrouvés dans le résultat du criblage) ; **124 corrections retenues** (124 lignes distinctes recomptées dans la liste globale du bilan : 10 + 5 + 109 ; 112 ENTRY), aucune appliquée ; hors JLPT : 2, arbitrées.

## 7. Limites et questions à arbitrer

Hors périmètre : le texte français des nuances (sauf à préserver l'information attestée dans une correction) ; les axes C1 à C10, dont les fonctions linguistiques des démonstratifs et des interrogatifs ; les champs autres que `nuance` ; toute correction. **L'audit de la tranche 6 ne commence qu'après la validation explicite de ce périmètre.**

1. Le périmètre de la tranche 6 (47 nuances des lots 10 et 11, dans 41 ENTRY, sans ajout ni retrait) est-il accepté ?
2. Le découpage en cinq livraisons (6a : 10 ; 6b : 9 ; 6c : 10 ; 6d : 7 ; 6e : 11) est-il retenu, ou l'une des deux options ?
3. L'audit de 6a seule est-il autorisé, chaque livraison suivant l'arbitrage de la précédente ?
