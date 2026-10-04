# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.13-C · Furigana : addendum A8 et corrections proposées

**Date** : 2026-10-04
**Nature** : livraison pour relecture. L'addendum A8 est validé et implémenté. Les **13 corrections
sont PROPOSÉES**, aucune n'est validée. De 5.13b, seules cinq lectures du lot 12 sont préparées, en
`proposed` (§7). Rien n'est commité.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| Addendum A8 (`docs/conception/addendum-A8-furigana.md`) | 🔒 validé, inscrit au sommaire |
| `schema-A2-01.md` | I4 et I5 complétés (§4, §5, §12) |
| Validateur lexical | compléments d'I4 et d'I5 implémentés, code `furigana-lecture` |
| Couche mécanique | une contradiction, ou une lecture spéciale segmentée de la liste A, rend la lecture décidable |
| Contrôle des décisions | une lecture décidée de la liste A doit être en bloc (code `lecture-speciale`) |
| Liste A | `SPECIAL_READING_IDS` dans `rules.mjs`, cinq lectures, conforme à l'addendum par un test |
| 13 entrées validées | rouvertes en `proposed`, avec leur correction |
| Journal | 13 décisions `correction` nouvelles, D0827 à D0839, `proposed` ; les 826 décisions historiques sont identiques |

## 2. Les 13 corrections proposées

Toutes de nature `correction`. Le champ fautif est choisi sur la fiche ; le romaji de la fiche sert
de témoin.

| Décision | Lot | ENTRY | Champ | Avant | Après |
|---|---|---|---|---|---|
| D0827 | 00 | 曲がる `n5_v_555` | graphie 曲る | `<ruby>曲<rt>ま</rt></ruby>る` | `<ruby>曲<rt>まが</rt></ruby>る` |
| D0828 | 01 | お巡りさん `n5_v_15` | lecture | お`<ruby>巡<rt>ま和</rt></ruby>`りさん | お`<ruby>巡<rt>まわ</rt></ruby>`りさん |
| D0829 | 01 | お兄さん `n5_v_16` | lecture | お`<ruby>兄<rt>に</rt></ruby>`さん | お`<ruby>兄<rt>にい</rt></ruby>`さん |
| D0830 | 01 | 大人 `n5_v_28` | lecture | `<ruby>大<rt>おと</rt></ruby><ruby>人<rt>おとな</rt></ruby>` | `<ruby>大人<rt>おとな</rt></ruby>` (liste A) |
| D0831 | 01 | 風邪 `n5_v_283` | lecture | `<ruby>風<rt>かぜ</rt></ruby><ruby>邪<rt>じゃ</rt></ruby>` | `<ruby>風邪<rt>かぜ</rt></ruby>` (bloc par nécessité) |
| D0832 | 03 | ちり紙 `n5_v_229` | lecture | ちり`<ruby>紙<rt>かみ</rt></ruby>` | ちり`<ruby>紙<rt>がみ</rt></ruby>` |
| D0833 | 05 | 上着 `n5_v_77` | lecture | `<ruby>上<rt>うえ</rt></ruby><ruby>着<rt>ぎ</rt></ruby>` | `<ruby>上<rt>うわ</rt></ruby><ruby>着<rt>ぎ</rt></ruby>` |
| D0834 | 05 | 財布 `n5_v_223` | lecture | `<ruby>財<rt>ざい</rt></ruby><ruby>布<rt>ふ</rt></ruby>` | `<ruby>財<rt>さい</rt></ruby><ruby>布<rt>ふ</rt></ruby>` |
| D0835 | 05 | 八百屋 `n5_v_640` | lecture | `<ruby>八<rt>やお</rt></ruby><ruby>百<rt>お</rt></ruby><ruby>屋<rt>や</rt></ruby>` | `<ruby>八百<rt>やお</rt></ruby><ruby>屋<rt>や</rt></ruby>` (correction minimale) |
| D0836 | 05 | 荷物 `n5_v_694` | lecture | `<ruby>荷<rt>に</rt></ruby><ruby>物<rt>もの</rt></ruby>` | `<ruby>荷<rt>に</rt></ruby><ruby>物<rt>もつ</rt></ruby>` |
| D0837 | 05 | 靴下 `n5_v_715` | lecture | `<ruby>靴<rt>くつ</rt></ruby><ruby>下<rt>下</rt></ruby>` | `<ruby>靴<rt>くつ</rt></ruby><ruby>下<rt>した</rt></ruby>` |
| D0838 | 08 | 切手 `n5_v_643` | lecture | `<ruby>切<rt>き</rt></ruby><ruby>手<rt>て</rt></ruby>` | `<ruby>切<rt>きっ</rt></ruby><ruby>手<rt>て</rt></ruby>` |
| D0839 | 09 | スポーツ `n5_v_190` | lecture, **kana** | すぷーつ | すぽーつ (furigana inchangés) |

**Forme de chaque réouverture**, vérifiée par comparaison avec le dernier commit :
- le statut de l'entrée passe de `validated` à `proposed` ;
- un seul champ change : `readings` est ajouté (12 entrées), ou le furigana de la graphie est
  corrigé (曲がる) ;
- l'entrée cite une décision de plus, ajoutée à la fin de sa liste ;
- aucun autre champ, aucune autre entrée, aucun ordre n'est modifié.

Pour スポーツ, le kana reste en hiragana avec le trait d'allongement, selon le statu quo des
lectures des mots en katakana.

## 3. Résultats

**Assemblage réel, pendant la revue** (`node tools/reconstruction/run.mjs assemble`) :

| ENTRY | Retraits | Écartées | Erreurs lexicales | Attente | Problèmes de décision |
|---|---|---|---|---|---|
| **401** | **30** | **287** | 0 | **1** : `n5_v_672 → n5_v_555` | **5**, tous dans le lot 12 (voir §4) |

**Retour après validation, vérifié en mémoire, sans écriture** (les 13 entrées et D0827 à D0839
supposées validées) :

| ENTRY | Retraits | Écartées | Erreurs lexicales | Attente |
|---|---|---|---|---|
| **414** | **31** | **274** | 0 | **0** |

Plus aucune contradiction entre furigana et kana ne subsiste dans les 414 ENTRY.

**Contrôles** :
- tests : **441 réussis**, 0 échec (434 avant ; 7 nouveaux) ;
- `check-layers` : aucune violation ;
- `validate-data` : 0 erreur, 8 avertissements connus ;
- sources : conformes au manifeste.

## 4. Point à arbitrer : cinq lectures du lot 12 deviennent incomplètes

**Le constat.** Dès que la règle est active dans la couche mécanique, elle s'applique à toutes les
sources, quel que soit le statut du lot. Cinq entrées du lot 12, proposé, ont donc désormais une
lecture à décider, que leur proposition ne contient pas :

| ENTRY | Raison |
|---|---|
| 今年 `n5_v_299` | contradiction (こととし), et liste A |
| 今朝 `n5_v_303` | liste A, segmentée |
| 昨夜 `n5_v_319` | liste A, segmentée |
| 近々 `n5_v_359` | contradiction (ちかぢか) |
| 夕方 `n5_v_439` | contradiction (ゆうかた) |

L'assembleur signale pour chacune `decision-incomplete : champ « readings » non décidé`, et la
commande `assemble` sort en erreur. Ces entrées n'étaient pas assemblées (elles sont proposées) :
aucune ENTRY n'est perdue.

**Ce que j'ai fait.** Je n'ai pas commencé 5.13b. Le test de l'espace de travail tolère
explicitement ces cinq problèmes, nommés un par un (`LOT12_READINGS_PENDING`), et aucun autre. La
liste se vide avec 5.13b.

**L'autre voie**, si tu préfères un assemblage sans aucun problème dès maintenant : décider ces
cinq lectures tout de suite, ce qui revient à commencer 5.13b.

## 5. Tests et sabotages

**Tests ajoutés ou adaptés** :
- validateur : I4 et I5 complétés (syllabe perdue, voisement, kanji dans un `<rt>`, kana fautif,
  katakana et hiragana, « ー », graphie contre la lecture par défaut seulement) ;
- couche mécanique : portée exacte sur les 718 sources (20 contradictions, 2 lectures spéciales
  seulement segmentées), 今日 mécanique ;
- décisions : lecture à décider, bloc exigé pour la liste A, 今日 hors frontière ;
- liste A : cinq lectures, chacune ancrée à son mot, qualifiée de *jukujikun* par sa fiche, et
  présente ligne pour ligne dans l'addendum ;
- états des lots 00, 01, 03, 05, 08 et 09 : seules les 13 entrées rouvertes ne sont pas validées ;
  décisions historiques en nombre inchangé, toutes validées ; une correction proposée par entrée ;
- espace de travail : 401 / 30 / 287, une seule attente, cinq problèmes du lot 12 et eux seuls ;
- retour en mémoire à 414 / 31 / 274 / 0 attente.

**Un test existant modifié** : dans `entry.test.js`, l'exemple `<ruby>高<rt>た</rt>い<rt>い</rt></ruby>`
(accepté pour sa structure) se lisait たい pour 高い. Il est devenu `<ruby>高<rt>たか</rt>い<rt>い</rt></ruby>` :
l'ancien est désormais refusé, à juste titre, par A8.

**13 sabotages, tous attrapés**, chacun vérifié comme modifiant réellement son fichier, puis
restauré à l'octet près :

| Sabotage | Tests en échec |
|---|---|
| complément A8 neutralisé dans le validateur | 2 |
| graphie non comparée à la lecture par défaut | 1 |
| katakana et hiragana non rapprochés | 5 |
| la contradiction ne rend plus la lecture décidable | 4 |
| le bloc d'une lecture spéciale n'est plus exigé | 1 |
| 今日 retirée de la liste A | 1 |
| correction de 財布 défaite | 1 |
| 大人 corrigée sans bloc (segmentation concordante) | 2 |
| graphie 曲る remise à ま | 1 |
| une quatorzième entrée rouverte | 3 |
| une correction passée en `validated` | 2 |
| une décision historique modifiée | 3 |
| une entrée rouverte revalidée seule | 3 |

## 6. Remarques

- **Rapports de lot régénérés** (`reconstruction/a2-04/rapports/`, lots 00, 01, 03, 05, 08, 09).
  Celui du lot 0 était périmé : il présentait encore les 60 entrées comme des propositions, reste
  de l'incident du 2026-10-04. Il est maintenant conforme au JSON.
- **Trois fiches retirées par fusion** (可愛い `n5_v_437`, 良い `n5_v_583`, 曲る `n5_v_672`) ont aussi
  des furigana contradictoires. Elles ne sont pas assemblées : aucune correction n'est nécessaire.
- **待つ et 初め** restent des contradictions à décider dans leur futur lot.

## 7. Complément du 2026-10-04 · 5.13b, lectures seulement : les cinq lectures du lot 12

**L'arbitrage.** Le point du §4 est tranché : les cinq lectures sont préparées maintenant, en
`proposed`, et la tolérance des tests est retirée. La préparation se limite à ces cinq lectures.

| Décision | ENTRY | Avant (source) | Après | Nature |
|---|---|---|---|---|
| D0840 | 今年 `n5_v_299` | `<ruby>今<rt>こと</rt></ruby><ruby>年<rt>とし</rt></ruby>` | `<ruby>今年<rt>ことし</rt></ruby>` | A + B, bloc (liste A) |
| D0841 | 今朝 `n5_v_303` | `<ruby>今<rt>け</rt></ruby><ruby>朝<rt>さ</rt></ruby>` | `<ruby>今朝<rt>けさ</rt></ruby>` | A, bloc (liste A) |
| D0842 | 昨夜 `n5_v_319` | `<ruby>昨<rt>ゆう</rt></ruby><ruby>夜<rt>べ</rt></ruby>` | `<ruby>昨夜<rt>ゆうべ</rt></ruby>` | A, bloc (liste A) |
| D0843 | 近々 `n5_v_359` | `<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>ぢか</rt></ruby>` | `<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>じか</rt></ruby>` | B ; arbitrage ちかじか |
| D0844 | 夕方 `n5_v_439` | `<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>かた</rt></ruby>` | `<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>がた</rt></ruby>` | B, voisement |

**Forme**, vérifiée par comparaison avec le dernier commit : dans `lot-12.json`, cinq entrées
changent, par le seul ajout de `readings` et d'une citation en fin de liste ; elles restent
`proposed`. Les 92 décisions initiales du lot (D0735 à D0826), les 826 décisions historiques et
D0827 à D0839 sont identiques.

**Résultats après ce complément** :

| État | ENTRY | Retraits | Écartées | Problèmes de décision | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Réel, pendant la revue | **401** | **30** | **287** | **0** | 0 | 1 : `n5_v_672 → n5_v_555` |
| 13 corrections supposées validées, en mémoire | 414 | 31 | 274 | 0 | 0 | 0 |
| Tout supposé validé, lot 12 compris, en mémoire | 445 | 31 | 243 | 0 | 0 | 0 |

La commande `assemble` sort de nouveau sans erreur. Le §3 et le §4 décrivent l'état avant ce
complément.

**Contrôles** : **443 tests réussis**, 0 échec ; `LOT12_READINGS_PENDING` n'existe plus ; deux
tests ajoutés (les cinq lectures et leurs décisions ; l'essai à blanc à 445 / 31 / 243).
**7 sabotages, tous attrapés**, chacun vérifié comme modifiant réellement son fichier, puis
restauré : furigana de 近々 remis à ぢか ; 今朝 segmentée sans bloc ; lecture de 夕方 retirée ; 今年
passée en `validated` ; une sixième lecture décidée (今日, protégée) ; D0843 passée en `validated` ;
une décision initiale du lot retirée du journal.

**Une remarque pour la suite de 5.13b, non traitée ici.** 昨日 (`n5_v_320`) décidait déjà sa
lecture dans la proposition initiale du lot 12 (D0746) : furigana source invalides, corrigés en
bloc. Sa raison parle de « lecture spéciale (jukujikun) », alors que la fiche de 昨日 ne le dit pas
(seules cinq fiches le disent : 大人, 今年, 今日, 今朝, 昨夜). Le bloc est juste, mais par nécessité au
sens d'A8, pas au titre de la liste A. La raison de D0746 est à reformuler dans la suite de 5.13b ;
je ne l'ai pas modifiée, la préparation étant limitée aux cinq lectures.

## 8. Suite

1. Relecture de cette livraison.
2. Sur autorisation : validation atomique des 13 corrections (statuts seulement), puis retour des
   tests d'état à « tout est validé ».
3. Suite de 5.13b : les autres corrections du lot 12, dont la raison de D0746.
4. Validation du lot 12, puis composition du lot 13.
