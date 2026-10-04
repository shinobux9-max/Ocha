# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.13 · Contrôle des furigana

**Date** : 2026-10-03
**Nature** : constat. **Aucune donnée ni aucun statut n'est modifié** : le lot 12 reste
`proposed`, et 5.13b n'est pas écrite.
**Déclencheur** : l'arbitrage de 5.13a demandait de corriger les furigana segmentés de trois
lectures spéciales (今朝, 昨夜, 今年) et de vérifier les autres fiches du lot. Le contrôle a révélé
un problème plus large, qui touche des lots validés.

---

## 1. Deux problèmes distincts

**(A) La segmentation arbitraire d'une lecture spéciale.** La lecture recomposée est juste, mais
elle est répartie artificiellement entre les kanji. Exemples : 今朝 `<ruby>今<rt>け</rt></ruby><ruby>朝<rt>さ</rt></ruby>`,
昨夜 `<ruby>昨<rt>ゆう</rt></ruby><ruby>夜<rt>べ</rt></ruby>`.
- **Indétectable mécaniquement** : rien ne distingue cette segmentation d'une segmentation
  légitime (今晩 こん + ばん).
- **Seul repère** : la fiche qui qualifie la lecture de « spéciale » ou de *jukujikun*. Dans tout
  le corpus, cinq fiches le font : 大人 (lot 01, validé, segmenté), 今年, 今朝 et 昨夜 (lot 12,
  segmentés), 今日 (lot 12, déjà en bloc).

**(B) Des furigana qui contredisent la lecture.** En recomposant la lecture à partir des furigana
(texte hors ruby et contenu des `rt`), on obtient autre chose que la lecture kana de l'entrée.
- **C'est une erreur de données, pas de présentation** : l'application afficherait une fausse
  lecture.
- **Le validateur ne le voit pas** : I4 vérifie que le texte de base des furigana est la forme
  (`furigana-base`), pas que leur lecture recompose les kana.
- **Détectable mécaniquement**, sans liste : c'est une comparaison de chaînes.

## 2. Le relevé de (B), retraits exclus, graphies comprises

**Dans des lots validés (11)** :

| Entrée | Lot | Furigana | Lecture recomposée | Lecture kana |
|---|---|---|---|---|
| お兄さん | 01 | お`<ruby>兄<rt>に</rt></ruby>`さん | おにさん | おにいさん |
| 大人 | 01 | `<ruby>大<rt>おと</rt></ruby><ruby>人<rt>おとな</rt></ruby>` | おとおとな | おとな |
| 風邪 | 01 | `<ruby>風<rt>かぜ</rt></ruby><ruby>邪<rt>じゃ</rt></ruby>` | かぜじゃ | かぜ |
| ちり紙 | 03 | ちり`<ruby>紙<rt>かみ</rt></ruby>` | ちりかみ | ちりがみ |
| 上着 | 05 | `<ruby>上<rt>うえ</rt></ruby><ruby>着<rt>ぎ</rt></ruby>` | うえぎ | うわぎ |
| 財布 | 05 | `<ruby>財<rt>ざい</rt></ruby><ruby>布<rt>ふ</rt></ruby>` | ざいふ | さいふ |
| 八百屋 | 05 | `<ruby>八<rt>やお</rt></ruby><ruby>百<rt>お</rt></ruby><ruby>屋<rt>や</rt></ruby>` | やおおや | やおや |
| 荷物 | 05 | `<ruby>荷<rt>に</rt></ruby><ruby>物<rt>もの</rt></ruby>` | にもの | にもつ |
| 切手 | 08 | `<ruby>切<rt>き</rt></ruby><ruby>手<rt>て</rt></ruby>` | きて | きって |
| 曲がる, graphie 曲る | 00 | `<ruby>曲<rt>ま</rt></ruby>る` | まる | まがる |
| スポーツ | 09 | スポーツ (sans ruby) | すぽーつ | **すぷーつ** : c'est ici la **lecture kana** qui est fausse (coquille de la source) |

**Dans le lot 12, proposé (3)** :

| Entrée | Furigana | Recomposée | Kana | Remarque |
|---|---|---|---|---|
| 今年 | `<ruby>今<rt>こと</rt></ruby><ruby>年<rt>とし</rt></ruby>` | こととし | ことし | aussi (A) : lecture spéciale |
| 夕方 | `<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>かた</rt></ruby>` | ゆうかた | ゆうがた | rendaku perdu |
| 近々 | `<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>ぢか</rt></ruby>` | ちかぢか | ちかじか | la fiche se contredit : lecture et romaji disent じか, furigana ぢか |

S'y ajoutent, en (A) seulement, **今朝** et **昨夜** (lecture recomposée juste, segmentation
arbitraire).

**Dans les entrées encore à décider (2)** : 待つ (`<ruby>待<rt>まつ</rt></ruby>つ`, soit まつつ) et 初め
(`<ruby>初<rt>はじめ</rt></ruby>め`, soit はじめめ).

## 3. Pourquoi je ne peux pas faire une 5.13b « minimale »

1. **Les lectures sont des champs mécaniques.** Les furigana de 今朝, 昨夜, 今年, 夕方 et 近々 sont
   structurellement valides (texte de base correct). Aucune exception ne les rend décidables. Une
   décision de journal ne peut pas les changer : la frontière la refuserait (`decision-hors-frontiere`).
2. **Il faut donc toucher l'infrastructure**, de l'une de deux façons :
   - **(a) une liste fermée** des lectures à décider, comme `USUAL_FORM_IDS` pour 平仮名 : 今朝, 昨夜,
     今年, 夕方, 近々. C'est le minimum pour le lot 12 ;
   - **(b) une règle mécanique générale**, qui rend les lectures décidables dès que la lecture
     recomposée des furigana diffère des kana. Elle est objective et sans liste, mais elle frappe
     aussi les **11 entrées validées** : leurs décisions deviendraient incomplètes (les lectures
     seraient exigées), et l'assemblage réel des lots 00, 01, 03, 05, 08 et 09 échouerait tant
     qu'elles ne sont pas corrigées.
3. **La segmentation (A) ne peut pas être une règle mécanique** : elle exige la liste des fiches
   qui le disent, ou un arbitrage entrée par entrée.

## 4. Ce que je propose, à arbitrer

- **Pour le lot 12 (5.13b)** : la voie (a). Une liste fermée de cinq entrées (今朝, 昨夜, 今年 en
  bloc ; 夕方 avec le rendaku ; 近々 en bloc), avec de nouvelles décisions `correction` après D0826.
  Pour 近々, trancher entre ちかじか (lecture et romaji de la fiche) et ちかぢか (ses furigana). Je
  proposerais ちかじか, puisque deux champs de la fiche sur trois le disent.
- **Pour le corpus**, un **mini-chantier transversal 5.13-C**, comme 5.7-C pour les compteurs :
  1. **un contrôle permanent** : un invariant du validateur (« la lecture recomposée des furigana
     égale les kana »), ce qui touche le contrat I4 et demande un addendum ;
  2. **la correction des 11 entrées validées**, et de la lecture kana de スポーツ, sous une forme
     qui respecte les statuts : soit tout de suite, par des décisions de correction dans leurs lots
     (une réouverture contrôlée), soit en les réservant à A2-05 comme la deixis temporelle ;
  3. **la règle (b)**, si tu la retiens, une fois les entrées validées corrigées, pour que les lots
     à venir (待つ, 初め…) soient protégés mécaniquement.

**Aucune donnée n'est modifiée par ce rapport.**
