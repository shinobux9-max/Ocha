# Étape 2 · A2-05 · Volet 1 · Lot 2 — périmètre proposé de la tranche 5 du contrôle de provenance

**Date** : 2026-10-10
**Statut** : **périmètre arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l'utilisateur) : **29 nuances dans 24 ENTRY**, exactement les nuances restantes des lots 08 et 09, sans ajout ni retrait ; **trois livraisons distinctes** : 5a (lot 08, écrit, téléphone et médias, 9), 5b (lot 08, parole et échange, 9), 5c (lot 09, loisirs et voyages, 11). Audit autorisé pour 5a seule ; 5b puis 5c après l'arbitrage de chacune. Les verdicts du volet 2 (dont かける sens 3) et les candidats C1 à C10 ne sont pas rouverts. La proposition est conservée telle quelle ci-dessous.

**Statut d'origine (proposition)** : *proposition de périmètre, non arbitrée. Aucun audit lexical de la tranche 5 n'est commencé : aucune nuance n'a été lue en vue d'un verdict.* Calculé par `a2-05-travail/perimetre-v1-lot2-t5.mjs`, en lecture seule, sur le plan arbitré (`provenance/plan-tranches.json`) ; rien n'est modifié dans les données, le journal, les registres, les outils ni les snapshots.

## 1. Point de départ

**La tranche 4 est close** (lots 05 et 06 : 30 nuances du plan, 11 sourcées, 1 assumée, 18 écarts ; et, à part, les 2 hors JLPT : 1 sourcée, 1 écart). Avec le bloc 1 bis et les tranches 2 et 3, **119 des 278 nuances du plan sont arbitrées ; restent 159**, réparties par le plan arbitré : tranche 5 : 29 ; tranche 6 : 47 ; tranche 7 : 39 ; tranche 8 : 44. **111 corrections retenues, aucune appliquée** ; 377 candidats des axes C1 à C10 et 147 arbitrages du volet 2 inchangés. **Plus aucune nuance hors JLPT n'est à contrôler.**

## 2. Composition, thème et taille

**La tranche 5 est celle du plan arbitré : toutes les nuances restantes des lots 08 et 09, et elles seules.** Lot 08 : « Communication, correspondance et médias » ; lot 09 : « Loisirs, sorties et voyages ». **Thème** : la parole, la correspondance et les loisirs. Ce sont surtout des **verbes d'action avec leur complément** (電話をかける, 手紙を書く, 映画を見る, 友達と遊ぶ) : la classe D domine, et la question sera presque toujours celle du critère 1 (l'expression publiée est-elle un exemple de la fiche, à la forme du dictionnaire, sous les graphies que la fiche atteste ?).

**Taille : 29 nuances, dans 24 ENTRY** : 25 à examiner, 3 faux positifs présumés à contre-vérifier, 1 relevées par un caractère isolé seulement ; 20 nuances d'ENTRY, 9 nuances de sens. Par lot : 08 : 18 ; 09 : 11. **Aucune particule** ne reste à contrôler.

| # | Unité | Mot | Lot | Statut | Classe | Chaînes (signalées — écartées par le tri — d'un caractère) | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Renvois relevés (tranche de l'ENTRY citée) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_52` (nuance d'ENTRY) | 手紙 | 08 | à examiner | D | 手紙を書く ; 手紙を出す | — | — | — |
| 2 | `v_164_s1` | かける | 08 | à examiner | D | 電話をかける ; 友達に電話をかける | `v_164_s1` | — | — |
| 3 | `v_164_s2` | かける | 08 | à examiner | D | めがねをかける | `v_164_s2` | — | — |
| 4 | `v_164_s3` | かける | 08 | à examiner | D | 壁に絵をかける | — | `v_164_s3` | — |
| 5 | `v_168` (nuance d'ENTRY) | 写真 | 08 | à examiner | D | 写真を撮る | — | — | — |
| 6 | `v_169_s1` | 呼ぶ | 08 | à examiner | D | 名前を呼ぶ ; 友達を呼ぶ | — | — | — |
| 7 | `v_169_s2` | 呼ぶ | 08 | à examiner | D | と呼ぶ | — | — | — |
| 8 | `v_173` (nuance d'ENTRY) | 番号 | 08 | à examiner | D | 部屋の番号 | `v_173_s1` | — | — |
| 9 | `v_174` (nuance d'ENTRY) | 答える | 08 | à examiner | D | 質問に答える | — | — | — |
| 10 | `v_175_s1` | 聞く | 08 | à examiner | D | 音楽を聞く | `v_175_s1` | — | — |
| 11 | `v_175_s2` | 聞く | 08 | à examiner | D | 先生に聞く | `v_175_s2` | — | — |
| 12 | `v_176` (nuance d'ENTRY) | 言う | 08 | à examiner | D | と言います ; 田中と言います — écartées : ゆう (par la lecture) | — | — | — |
| 13 | `v_177` (nuance d'ENTRY) | 話す | 08 | à examiner | D | 日本語を話す ; 日本語で話す | — | — | — |
| 14 | `v_178_s2` | 電話 | 08 | à examiner | D | 電話をかける | — | — | — |
| 15 | `v_203` (nuance d'ENTRY) | テレビ | 08 | à examiner | D | テレビを見る | — | — | — |
| 16 | `v_697` (nuance d'ENTRY) | 見せる | 08 | à examiner | D | 写真を友達に見せる | — | — | — |
| 17 | `v_699_s2` | 話 | 08 | à examiner | D | 昔の話 | — | — | — |
| 18 | `v_699` (nuance d'ENTRY) | 話 | 08 | faux positif à contre-vérifier | B-romaji | écartées : 話す (par la lecture) | — | — | 話す (5) |
| 19 | `v_26` (nuance d'ENTRY) | 外国 | 09 | à examiner | D | 外国に行く ; 外国人 | — | — | 外国人 (2) |
| 20 | `v_193` (nuance d'ENTRY) | 散歩 | 09 | à examiner | D | 犬の散歩 | — | — | — |
| 21 | `v_196` (nuance d'ENTRY) | 映画 | 09 | à examiner | D | 映画を見る | — | — | 映画館 (5) |
| 22 | `v_198` (nuance d'ENTRY) | 泳ぐ | 09 | à examiner | D | プールで泳ぐ | — | — | — |
| 23 | `v_199` (nuance d'ENTRY) | 遊ぶ | 09 | à examiner | D | 友達と遊ぶ | — | — | — |
| 24 | `v_243` (nuance d'ENTRY) | 国 | 09 | à examiner | D | 国に帰る ; お国はどちらですか | — | — | — |
| 25 | `v_689` (nuance d'ENTRY) | 絵 | 09 | à examiner | D | 絵を描く — écartées : かく (par la lecture) | — | — | 書く (4) |
| 26 | `v_707` (nuance d'ENTRY) | 釣り | 09 | à examiner | D | 釣りに行く | — | — | — |
| 27 | `v_192` (nuance d'ENTRY) | 弾く | 09 | faux positif à contre-vérifier | B-transcription | écartées : 引く (par la lecture) | `v_192_s1` | — | 引く (7) ; ギター (5) ; 吹く (1, arbitrée) |
| 28 | `v_676` (nuance d'ENTRY) | 歌 | 09 | faux positif à contre-vérifier | B-romaji | écartées : 歌を歌う (par la lecture) | — | — | — |
| 29 | `v_197` (nuance d'ENTRY) | 歌う | 09 | un caractère seulement | S1 | un caractère : 歌 | — | — | 歌 (5) |

## 3. Classes de détection

La classe d'une nuance est celle de sa chaîne la plus lourde (tri factuel du lot 2) ; elle **oriente la lecture et ne préjuge d'aucun verdict**. Chaque nuance sera lue en entier, chaînes d'un caractère comprises, sur ses fiches entières (fiches fusionnées, exemples, anciens exemples, décisions).

| Classe | Définition | Nuances | Question à poser à la fiche |
|---|---|---|---|
| D | D-exemple construit : une suite de mots absente des fiches | 25 : 手紙, かける, かける, かける, 写真, 呼ぶ, 呼ぶ, 番号, 答える, 聞く, 聞く, 言う, 話す, 電話, テレビ, 見せる, 話, 外国, 散歩, 映画, 泳ぐ, 遊ぶ, 国, 絵, 釣り | la suite est-elle un exemple de la fiche, à la forme du dictionnaire, sans mot, particule ni construction changés, et sous les graphies que la fiche atteste ? |
| B-romaji | faux positif présumé, rapproché par le romaji de la fiche | 2 : 話, 歌 | le mot de la fiche est-il le même mot, et sa graphie publiée est-elle attestée, ou seulement sa lecture ? |
| B-transcription | faux positif présumé, rapproché par une autre écriture (kana, kanji, furigana) | 1 : 弾く | la correspondance repose-t-elle sur la graphie du mot, ou sur sa seule lecture (homophone possible) ? |
| S1 | jamais signalée par le criblage ; relevée par une chaîne d'un seul caractère | 1 : 歌う | le caractère est-il un mot que la fiche écrit, ou seulement un élément d'un mot plus long ? |

**Chaînes d'un caractère relevées** : 1 nuances en portent ; 0 ont un caractère absent de tous les textes des fiches. Le relevé sert au seul repérage.

## 4. Chevauchements, dépendances et comparables

- **Candidats du volet 1 (axes C1 à C10)** : 6 nuances portent sur un sens candidat ou sur une ENTRY qui en a un (6 sens distincts sur 377) : `v_164_s1` かける ; `v_164_s2` かける ; `v_173` 番号 ; `v_175_s1` 聞く ; `v_175_s2` 聞く ; `v_192` 弾く. Ils restent candidats pour leurs propres relevés ; le décompte reste 377.
- **Sens des 147 du volet 2** : 1 nuances (`v_164_s3` かける) ; leurs verdicts ne sont pas rouverts : le contrôle ne porte que sur `nuance`.
- **Corrections déjà retenues sur les mêmes ENTRY** : aucune.
- **Renvois vers des ENTRY des lots déjà traités** (lecture croisée, précédents cités, non rouverts) : 外国 → 外国人 (2) ; 絵 → 書く (4) ; 弾く → 吹く (1, arbitrée).
- **Renvois vers des ENTRY des lots 08 et 09** : 話 → 話す ; 映画 → 映画館 ; 弾く → ギター ; 歌う → 歌.
- **Renvois vers les tranches suivantes** : 弾く → 引く (7).
- **Comparables utiles déjà arbitrés** (cités pour la cohérence, non rouverts) : 書く (V2-95, 描く retiré : la nuance de 絵 cite 絵を描く) ; 吹く (tranche 1 et lot 1 : particules et 笛を吹く ; la nuance de 弾く renvoie à 吹く et à 引く) ; 外国人 (lot 01, V2-37, nuance retirée : la nuance de 外国 cite 外国人) ; 出る et 授業 (授業に出る retiré deux fois : un verbe avec un complément que la fiche ne donne pas) ; 言葉 (lot 06 : expressions construites dans le domaine de la parole).
- **Précédents applicables, sans changement** : critères 1 à 3 ; graphie attestée pour le mot, jamais déduite par analogie (lot 00) ; transcription en kana d'un romaji attesté recevable, sans ajout de kanji (lot 01) ; classement **sourcé / assumé / écart** (lot 02) ; une attestation dans la fiche d'une autre ENTRY ne suffit pas sans décision (lot 03) ; une décision qui nomme une expression pour fonder un découpage ne la source pas (lots 02 et 06) ; information française attestée préservée.

## 5. Découpage proposé

**Trois livraisons, pour que chaque fiche soit lue en entier** : le lot 08 (18 nuances) est coupé en deux par sous-thème, puis le lot 09.

| Livraison | Contenu | Nuances |
|---|---|---|
| 5a | lot 08, **écrit, téléphone et médias** : 手紙, かける (sens 1), かける (sens 2), かける (sens 3), 写真, 番号, 電話 (sens 2), テレビ, 見せる | 9 |
| 5b | lot 08, **parole et échange** : 呼ぶ (sens 1), 呼ぶ (sens 2), 答える, 聞く (sens 1), 聞く (sens 2), 言う, 話す, 話 (sens 2), 話 | 9 |
| 5c | lot 09, **loisirs et voyages** : 外国, 散歩, 映画, 泳ぐ, 遊ぶ, 国, 絵, 釣り, 弾く, 歌, 歌う | 11 |
| **Total** | | **29** |

**Option** : deux livraisons par lot (08 : 18 ; 09 : 11), comme pour les tranches 3 et 4. Je propose trois livraisons parce que le lot 08 réunit trois sens de かける, deux de 呼ぶ, deux de 聞く et deux nuances de 話, qui se lisent mieux par sous-thème.

## 6. Critères reproductibles de complétude

Calculés par `a2-05-travail/perimetre-v1-lot2-t5.mjs`, qui s'arrête au premier écart :

1. **Point de départ** : le plan compte 278 nuances ; 119 sont arbitrées (bloc 1 bis 10, tranche 2 43, tranche 3 36, tranche 4 30) ; il en reste 159.
2. **Tranche 5** : 29 identifiants distincts ; ce sont exactement les nuances restantes des lots 08 et 09, et aucune nuance restante de ces lots n'est hors de la tranche.
3. **Livraisons** : 5a (9) + 5b (9) + 5c (11) = 29, disjointes ; 5a et 5b forment exactement le lot 08.
4. **Après la tranche 5** : il resterait 130 nuances du plan (tranche 6 : 47 ; tranche 7 : 39 ; tranche 8 : 44).
5. **Décomptes inchangés** : volet 2, 147 sur 147 (L 136, F 2, C 9, N 0) ; 377 candidats ; 111 corrections retenues, aucune appliquée ; hors JLPT : 2, arbitrées.

## 7. Limites et questions à arbitrer

Hors périmètre : le texte français des nuances (sauf à préserver l'information attestée dans une correction) ; les axes C1 à C10 ; les champs autres que `nuance` ; toute correction. **L'audit de la tranche 5 ne commence qu'après la validation de ce périmètre.**

1. Le périmètre de la tranche 5 (29 nuances des lots 08 et 09, sans ajout ni retrait) est-il accepté ?
2. Le découpage en trois livraisons (5a : 9 ; 5b : 9 ; 5c : 11) est-il retenu, ou deux livraisons par lot suffisent-elles ?
