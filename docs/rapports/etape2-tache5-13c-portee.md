# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.13-C · Portée du chantier des furigana

**Date** : 2026-10-03
**Nature** : tableau exhaustif des violations, pour valider la portée de 5.13-C **avant** toute
correction. **Aucune donnée, aucun statut, aucune infrastructure n'est modifié.** Le lot 12 reste
suspendu (D0735 à D0826 `proposed`).

**Rappel de l'arbitrage** :
- **A**, la segmentation d'une lecture spéciale : une décision humaine, par une liste fermée ;
- **B**, la contradiction entre furigana et kana : une règle générale, avec un invariant (addendum
  A8, complément d'I4) ;
- les cas validés sont corrigés **maintenant**, par une réouverture contrôlée et journalisée.

---

## 1. Méthode du relevé

**La recomposition.** Pour chaque lecture et chaque graphie de chaque entrée, la lecture
recomposée est obtenue ainsi :
- **le texte hors `<ruby>`** est conservé tel quel ;
- **chaque `<ruby>…<rt>X</rt></ruby>`** est remplacé par `X` ;
- **la comparaison** avec les kana se fait après conversion des katakana en hiragana, le trait
  d'allongement restant tel quel.

**Pour les graphies**, la comparaison se fait avec la lecture par défaut de l'entrée.

**Sont exclues** : les entrées retirées par fusion (non assemblées) ; les recompositions qui
contiennent encore un kanji, déjà refusées par une exception de lectures.

**Le résultat** couvre tout le corpus, soit les 718 entrées sources : **18 cas**.

## 2. Le tableau exhaustif

Nature : **A** segmentation d'une lecture spéciale (la fiche la qualifie de « spéciale » ou de
*jukujikun*) ; **B** furigana contredisant les kana ; **K** kana erroné.

Le romaji de la fiche sert de témoin indépendant. Il concorde avec les kana dans tous les cas, sauf
スポーツ, où il concorde avec le furigana.

### Lots validés (11)

| # | ENTRY | Lot | Champ | Kana actuel | Furigana actuel | Recomposé | Romaji | Nature | Correction proposée |
|---|---|---|---|---|---|---|---|---|---|
| 1 | お兄さん `n5_v_16` | 01 | lecture | おにいさん | お`<ruby>兄<rt>に</rt></ruby>`さん | おにさん | oniisan | B | お`<ruby>兄<rt>にい</rt></ruby>`さん |
| 2 | 大人 `n5_v_28` | 01 | lecture | おとな | `<ruby>大<rt>おと</rt></ruby><ruby>人<rt>おとな</rt></ruby>` | おとおとな | otona | **A+B** | `<ruby>大人<rt>おとな</rt></ruby>` (en bloc) |
| 3 | 風邪 `n5_v_283` | 01 | lecture | かぜ | `<ruby>風<rt>かぜ</rt></ruby><ruby>邪<rt>じゃ</rt></ruby>` | かぜじゃ | kaze | B | `<ruby>風邪<rt>かぜ</rt></ruby>` : en bloc par nécessité (邪 n'a pas de part de la lecture), pas par choix éditorial A |
| 4 | ちり紙 `n5_v_229` | 03 | lecture | ちりがみ | ちり`<ruby>紙<rt>かみ</rt></ruby>` | ちりかみ | chirigami | B | ちり`<ruby>紙<rt>がみ</rt></ruby>` (rendaku) |
| 5 | 上着 `n5_v_77` | 05 | lecture | うわぎ | `<ruby>上<rt>うえ</rt></ruby><ruby>着<rt>ぎ</rt></ruby>` | うえぎ | uwagi | B | `<ruby>上<rt>うわ</rt></ruby><ruby>着<rt>ぎ</rt></ruby>` |
| 6 | 財布 `n5_v_223` | 05 | lecture | さいふ | `<ruby>財<rt>ざい</rt></ruby><ruby>布<rt>ふ</rt></ruby>` | ざいふ | saifu | B | `<ruby>財<rt>さい</rt></ruby><ruby>布<rt>ふ</rt></ruby>` |
| 7 | 八百屋 `n5_v_640` | 05 | lecture | やおや | `<ruby>八<rt>やお</rt></ruby><ruby>百<rt>お</rt></ruby><ruby>屋<rt>や</rt></ruby>` | やおおや | yaoya | B | `<ruby>八百<rt>やお</rt></ruby><ruby>屋<rt>や</rt></ruby>` (correction minimale ; la fiche ne la qualifie pas de spéciale) |
| 8 | 荷物 `n5_v_694` | 05 | lecture | にもつ | `<ruby>荷<rt>に</rt></ruby><ruby>物<rt>もの</rt></ruby>` | にもの | nimotsu | B | `<ruby>荷<rt>に</rt></ruby><ruby>物<rt>もつ</rt></ruby>` |
| 9 | 切手 `n5_v_643` | 08 | lecture | きって | `<ruby>切<rt>き</rt></ruby><ruby>手<rt>て</rt></ruby>` | きて | kitte | B | `<ruby>切<rt>きっ</rt></ruby><ruby>手<rt>て</rt></ruby>` (petit っ) |
| 10 | 曲がる `n5_v_555`, graphie 曲る | 00 | **graphie** | まがる | `<ruby>曲<rt>ま</rt></ruby>る` | まる | magaru | B | `<ruby>曲<rt>まが</rt></ruby>る` |
| 11 | スポーツ `n5_v_190` | 09 | lecture | **すぷーつ** | スポーツ | すぽーつ | supootsu | **K** | kana **すぽーつ** ; le furigana est juste |

### Lot 12, proposé et suspendu (5)

| # | ENTRY | Champ | Kana | Furigana actuel | Recomposé | Romaji | Nature | Correction proposée |
|---|---|---|---|---|---|---|---|---|
| 12 | 今年 `n5_v_299` | lecture | ことし | `<ruby>今<rt>こと</rt></ruby><ruby>年<rt>とし</rt></ruby>` | こととし | kotoshi | **A+B** | `<ruby>今年<rt>ことし</rt></ruby>` |
| 13 | 今朝 `n5_v_303` | lecture | けさ | `<ruby>今<rt>け</rt></ruby><ruby>朝<rt>さ</rt></ruby>` | けさ | kesa | **A** | `<ruby>今朝<rt>けさ</rt></ruby>` |
| 14 | 昨夜 `n5_v_319` | lecture | ゆうべ | `<ruby>昨<rt>ゆう</rt></ruby><ruby>夜<rt>べ</rt></ruby>` | ゆうべ | yuube | **A** | `<ruby>昨夜<rt>ゆうべ</rt></ruby>` |
| 15 | 夕方 `n5_v_439` | lecture | ゆうがた | `<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>かた</rt></ruby>` | ゆうかた | yuugata | B | `<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>がた</rt></ruby>` (rendaku) |
| 16 | 近々 `n5_v_359` | lecture | ちかじか | `<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>ぢか</rt></ruby>` | ちかぢか | chikajika | B | `<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>じか</rt></ruby>` : kana et romaji concordent sur ちかじか, seul le furigana diffère (arbitrage) ; pas de bloc, la fiche ne la qualifie pas de spéciale |

### Entrées encore à décider (2), pour information

La règle générale les attrapera dans leur lot ; aucune action en 5.13-C.

| # | ENTRY | Kana | Furigana actuel | Recomposé | Romaji | Nature | Correction attendue dans son lot |
|---|---|---|---|---|---|---|---|
| 17 | 待つ `n5_v_552` | まつ | `<ruby>待<rt>まつ</rt></ruby>`つ | まつつ | matsu | B | `<ruby>待<rt>ま</rt></ruby>`つ |
| 18 | 初め `n5_v_645` | はじめ | `<ruby>初<rt>はじめ</rt></ruby>`め | はじめめ | hajime | B | `<ruby>初<rt>はじ</rt></ruby>`め |

**Totaux** :
- 11 cas validés : 9 B, 1 A+B, 1 K ;
- 5 cas proposés : 2 A, 1 A+B, 2 B ;
- 2 cas futurs : B.

**Liste fermée A** : 大人, 今年, 今朝, 昨夜, soit les quatre seules fiches qui qualifient leur lecture
de spéciale et dont les furigana sont segmentés (今日, la cinquième, est déjà en bloc).

## 3. Points à arbitrer avant la correction

1. **La portée d'A8 s'étend-elle aux graphies ?** Le cas n° 10 (la graphie 曲る) est une
   contradiction dans les furigana d'une graphie, pas d'une lecture. L'arbitrage parle de « chaque
   lecture ». Je propose qu'A8 couvre aussi les graphies, recomposées contre la lecture par défaut.
   Sinon, ce cas reste hors invariant.
2. **風邪 (n° 3)** : la seule correction possible qui recompose かぜ avec les deux kanji en base est le
   bloc. Je le classe en B, « bloc par nécessité », sans l'ajouter à la liste A. Il suffit de le
   confirmer.
3. **八百屋 (n° 7)** : la correction minimale (八百 / 屋) suffit à B. Le bloc n'est justifié ni par la
   fiche, ni par la nécessité.
4. **La forme de la réouverture**, sur laquelle je fais une proposition :
   - **Mécanique** : la règle B rend les lectures décidables dès que la recomposition diffère des
     kana. La liste A rend décidables les quatre lectures spéciales.
   - **Lots validés** : l'entrée concernée repasse en `proposed`, sa décision reçoit les lectures
     corrigées (ou la graphie, pour 曲る), et une nouvelle décision de journal `correction` est
     ajoutée après D0826, en `proposed`. Les décisions historiques restent intactes et validées.
   - **Assemblage réel pendant la revue** : les 11 entrées rouvertes en sortent, 曲がる comprise. Sa
     graphie 曲る est portée par la décision d'entrée de `n5_v_555` (`fields.writings`) : la
     corriger rouvre l'entrée entière. La fusion `n5_v_672 → n5_v_555` (lot 0) perd alors sa cible
     et passe en attente. État attendu pendant la revue : **403 ENTRY, 30 retraits, 285 entrées
     écartées, 1 attente**, liée uniquement à cette fusion. Après validation : 414 ENTRY, 31
     retraits, 274 entrées écartées, 0 attente.
   - **Tests d'état** : les lots 00, 01, 03, 05, 08 et 09 tolèrent pendant la revue les 11 entrées
     rouvertes listées, et seulement elles. Le lot 00 tolère en plus une seule attente, la fusion
     `n5_v_672 → n5_v_555`. Toute autre entrée rouverte et toute autre attente font échouer les
     tests.
   - **Rectification du 2026-10-04** : la version initiale de ce point annonçait 405 ENTRY et le
     maintien de 曲がる dans l'assemblage. Les deux étaient faux : 414 − 10 = 404, et 曲がる ne peut
     pas rester validée si sa graphie change. Les chiffres ci-dessus viennent d'une simulation en
     mémoire sur l'assembleur réel, sans écriture.
5. **L'ordre des identifiants** : les décisions de 5.13-C viendraient à partir de D0827, avant
   celles de 5.13b. 5.13b ajouterait ensuite ses propres décisions de correction pour le lot 12, ou
   réécrirait à leur place celles qui existent déjà (aucune ne porte aujourd'hui sur les lectures de
   ces cinq entrées). À confirmer.

## 4. Complément du 2026-10-04 : deux cas omis par le relevé

**Le constat.** En appliquant la règle B à l'assemblage réel (simulation en mémoire, sans
écriture), on obtient **13** contradictions dans les lots validés, et non 11. Les deux cas
supplémentaires ont un kanji dans un `<rt>` :

| # | ENTRY | Lot | Champ | Kana | Furigana actuel | Recomposé | Romaji | Nature | Correction proposée |
|---|---|---|---|---|---|---|---|---|---|
| 19 | お巡りさん `n5_v_15` | 01 | lecture | おまわりさん | お`<ruby>巡<rt>ま和</rt></ruby>`りさん | おま和りさん | omawarisan | B | お`<ruby>巡<rt>まわ</rt></ruby>`りさん |
| 20 | 靴下 `n5_v_715` | 05 | lecture | くつした | `<ruby>靴<rt>くつ</rt></ruby><ruby>下<rt>下</rt></ruby>` | くつ下 | kutsushita | B | `<ruby>靴<rt>くつ</rt></ruby><ruby>下<rt>した</rt></ruby>` |

**La cause.** La section 1 exclut « les recompositions qui contiennent encore un kanji, déjà
refusées par une exception de lectures ». C'est vrai de dix des douze fiches sources concernées :
cinq sont retirées par fusion, une a ses lectures décidées (お手洗い), quatre ont des balises
cassées et seront des exceptions dans leur lot (もう一度, 作る, 一人, 一緒). Ce n'est pas vrai de ces
deux-là : leur texte de base est juste, la couche mécanique les a donc acceptées, et elles sont
validées avec une lecture fausse.

**Les totaux corrigés** : 13 cas validés (11 B, 1 A+B, 1 K), 5 cas proposés, 2 cas futurs, soit
**20 cas**.

**Sixième point à arbitrer.** Si le complément d'I4 devient bloquant (projet d'A8), ces deux
entrées doivent être corrigées avec les autres : sinon l'assemblage échouerait sur elles. La
réouverture porterait alors sur **13 entrées**, dans les mêmes lots (00, 01, 03, 05, 08, 09) :

| Réouverture | ENTRY | Retraits | Écartées | Attente |
|---|---|---|---|---|
| 11 entrées (point 4) | 403 | 30 | 285 | 1 |
| **13 entrées** (avec お巡りさん et 靴下) | **401** | 30 | **287** | 1 |

L'attente reste unique dans les deux cas : la fusion `n5_v_672 → n5_v_555`. Après validation,
l'assemblage revient à 414 ENTRY, 31 retraits, 274 entrées écartées, 0 attente.

**Orientation retenue le 2026-10-04**, après reproduction indépendante de ces chiffres par Codex :
la réouverture porte sur les **13 entrées** (401 ENTRY, 30 retraits, 287 écartées, 1 attente), et
le kanji dans un `<rt>` est traité par la règle B. La liste A du projet d'A8 compte cinq lectures :
les quatre à corriger de la section 2, et 今日, seulement protégée, qui n'est pas rouverte. Ces
orientations ne deviennent des décisions qu'à la validation d'A8.

**Aucune donnée n'est modifiée par ce rapport.**
