# Ocha — Document de conception v1

## Addendum A8 · Concordance des furigana et des kana

**Statut** : 🔒 validé le 2026-10-04 (arbitrage du chantier 5.13-C d'A2-04, après relecture).

**Objet** : compléter les contrôles I4 et I5 de `schema-A2-01.md`, qui vérifient le texte de base
des furigana mais pas la lecture qu'ils affichent ; et fixer la règle de segmentation des lectures
spéciales.

**Ce que cet addendum ne fait pas** :
- il ne modifie aucun snapshot A2, ni la structure d'une ENTRY, d'une lecture ou d'une graphie ;
- il n'ajoute aucun champ au schéma ;
- il ne permet pas d'attacher une graphie à une lecture autre que la lecture par défaut (§6) ;
- il ne tranche pas la convention des lectures des mots en katakana (statu quo pendant les lots) ;
- il ne décide d'aucune correction de données : il fixe la règle, les corrections sont des
  décisions de reconstruction, journalisées.

---

## 1. Constat

`schema-A2-01.md` demande, pour les furigana d'une lecture (I4) comme pour ceux d'une graphie
(I5), que le **texte de base** hors `<rt>` soit égal à la forme. Rien ne contrôle le contenu des
`<rt>`. Des furigana peuvent donc avoir un texte de base juste et afficher une lecture fausse.

Le contrôle du lot 12 (rapports `etape2-tache5-13-verif-furigana.md` et
`etape2-tache5-13c-portee.md`) a montré que ce n'est pas théorique : des entrées validées affichent
おにさん pour お兄さん, ざいふ pour 財布, きて pour 切手. C'est une erreur de données, pas de
présentation : l'application montrerait une lecture fausse.

Deux problèmes distincts sont en cause, et cet addendum les traite séparément :

| | Problème | Détection |
|---|---|---|
| **B** | les furigana contredisent les kana | mécanique : une comparaison de chaînes |
| **A** | une lecture spéciale est répartie artificiellement entre les kanji, alors que la lecture recomposée est juste | impossible mécaniquement : rien ne distingue 今朝 (け + さ, artificiel) de 今晩 (こん + ばん, légitime) |

## 2. Règle B · Concordance

### 2.1 La lecture recomposée

La **lecture recomposée** de furigana s'obtient ainsi :

1. le texte hors `<ruby>` est conservé tel quel ;
2. chaque `<ruby>…<rt>X</rt></ruby>` est remplacé par `X` ;
3. le résultat ne contient que des kana. Un kanji resté dans la lecture recomposée, qu'il vienne
   d'un `<rt>` ou du texte hors `<ruby>`, est une contradiction.

La comparaison avec des kana se fait après conversion des katakana en hiragana, des deux côtés. Le
trait d'allongement « ー » est conservé tel quel.

### 2.2 Les deux contrôles

> **I4 (complément)** — pour chaque lecture, la lecture recomposée de ses `furigana` est égale à
> son `kana`.
>
> **I5 (complément)** — pour chaque graphie, la lecture recomposée de ses `furigana` est égale au
> `kana` de la **lecture par défaut** de l'ENTRY.

Les deux compléments sont des **erreurs bloquantes**, comme le reste d'I4 et d'I5.

I5 compare à la lecture par défaut parce que c'est ce que dit déjà le schéma (§5 : les `furigana`
d'une graphie sont donnés « pour la lecture par défaut »). A8 n'élargit pas le modèle.

## 3. Détecter n'est pas corriger

La règle B dit que **deux champs se contredisent**. Elle ne dit pas lequel est faux.

- Le plus souvent, ce sont les furigana (お兄さん : kana おにいさん, furigana に).
- Parfois, ce sont les kana. スポーツ : les furigana donnent すぽーつ, le kana de la source est
  すぷーつ ; c'est le kana qui est fautif.

Le champ à corriger est donc une **décision humaine**, prise sur la fiche source, entrée par
entrée, et journalisée. Le romaji de la fiche sert de témoin, sans être une preuve à lui seul.
Aucun outil ne corrige automatiquement une contradiction.

**Correction minimale.** La correction retenue est la plus petite qui rétablit la concordance, en
gardant la segmentation kanji par kanji quand elle est possible :

| Cas | Correction | Pourquoi |
|---|---|---|
| 八百屋 | 八百 / やお, puis 屋 / や | deux kanji portent ensemble やお ; 屋 garde sa lecture |
| 風邪 | 風邪 / かぜ, en bloc | **bloc par nécessité** : 邪 ne porte aucune part de la lecture ; aucune segmentation admissible, attribuant une lecture non vide à chaque segment, ne recompose かぜ |

**Segmentation admissible.** La concordance seule ne justifie pas une segmentation : elle est
admissible si chaque segment reçoit une lecture non vide, qui est bien la part de la lecture portée
par ce segment. Quand aucune segmentation admissible ne recompose les kana, le bloc s'impose.

Un bloc par nécessité relève de la règle B. Il n'inscrit pas l'entrée dans la liste de la règle A.

## 4. Règle A · Segmentation des lectures spéciales

Quand la fiche source qualifie elle-même la lecture de **spéciale** (ou de *jukujikun*), la lecture
appartient au mot entier, pas à ses kanji : les furigana sont écrits **en bloc**, un seul `<ruby>`
couvrant tous les kanji concernés.

Cette règle ne peut pas être contrôlée par la concordance : une segmentation artificielle recompose
la bonne lecture. Elle repose sur une **liste fermée**, dont voici la définition normative :

| Ancien identifiant | Mot | Lecture | Furigana attendus | Furigana de la source | Effet |
|---|---|---|---|---|---|
| `n5_v_28` | 大人 | おとな | `<ruby>大人<rt>おとな</rt></ruby>` | segmentés | **à corriger** |
| `n5_v_299` | 今年 | ことし | `<ruby>今年<rt>ことし</rt></ruby>` | segmentés | **à corriger** |
| `n5_v_300` | 今日 | きょう | `<ruby>今日<rt>きょう</rt></ruby>` | déjà en bloc | **à protéger** |
| `n5_v_303` | 今朝 | けさ | `<ruby>今朝<rt>けさ</rt></ruby>` | segmentés | **à corriger** |
| `n5_v_319` | 昨夜 | ゆうべ | `<ruby>昨夜<rt>ゆうべ</rt></ruby>` | segmentés | **à corriger** |

La liste a deux effets, qu'il ne faut pas confondre :
- **protéger** : pour toute entrée de la liste, les furigana attendus sont le bloc. Un test le
  vérifie, et refuse qu'une de ces lectures soit un jour segmentée ;
- **corriger** : quand les furigana de la source sont segmentés, la lecture devient décidable et
  reçoit le bloc par une décision journalisée.

今日 est seulement protégée : ses furigana sont déjà justes. Son inscription ne demande **aucune
correction et aucune réouverture**.

**Entrer dans la liste** demande une condition et un arbitrage explicite, journalisé : la fiche
source qualifie elle-même la lecture de spéciale. Ce n'est jamais une connaissance externe.

Ce n'est **pas** une règle générale du type « toute lecture irrégulière s'écrit en bloc ».

**Nature de la règle** : c'est une règle de **reconstruction**, ciblée, et non un invariant du
validateur lexical. À l'implémentation, la liste est transcrite dans
`tools/reconstruction/rules.mjs`, et un test vérifie qu'elle est conforme à cet addendum, que
chaque identifiant est ancré à son mot, et que chaque lecture de la liste est en bloc.

## 5. Application et effets

| Où | Effet |
|---|---|
| `schema-A2-01.md`, §4, §5 et §12 | I4 et I5 reçoivent leur complément (§2.2) |
| Validateur lexical | les deux compléments sont implémentés (code `furigana-lecture`), avec leurs tests et leurs sabotages |
| Reconstruction A2-04 | une lecture devient **décidable** (exception au champ mécanique `readings`) quand sa lecture recomposée diffère des kana, ou quand l'entrée est à corriger selon la liste A ; les graphies sont déjà des décisions humaines |
| **Données déjà validées** | corrigées **maintenant**, par une réouverture contrôlée et journalisée : l'entrée repasse en `proposed`, une décision `correction` nouvelle est ajoutée au journal, les décisions historiques restent intactes. La liste des entrées et la forme exacte sont dans le rapport de portée |
| Lot 12 (proposé) | corrigé par 5.13b, après 5.13-C |
| Lots à venir | la règle s'applique telle quelle ; les contradictions y sont décidées dans leur lot (待つ, 初め) |
| Sommaire | une ligne A8 est ajoutée |

**Ordre d'application.** Le complément bloquant ne peut être activé dans l'assemblage qu'une fois
les entrées validées corrigées, ou au même moment : sinon l'assemblage réel échouerait sur des
entrées que personne n'a encore rouvertes. L'ordre exact est fixé avec la forme de la réouverture.

## 6. Besoin distinct, signalé et non traité

I5 compare une graphie à la lecture par défaut. Une graphie qui ne se lirait **qu'avec une autre
lecture** de l'ENTRY serait donc refusée. Ce cas n'est pas une faiblesse d'A8 : le schéma ne sait
pas attacher une graphie à une lecture (voir le point ouvert « Lecture よい de いい » d'`ETAT-ACTUEL.md`).

A8 ne l'élargit pas en silence. Si le besoin se présente, il demandera une évolution du schéma,
décidée pour elle-même. Aujourd'hui, aucune ENTRY assemblée n'a à la fois plusieurs lectures et une
autre graphie.

---

## 7. Mesure de la règle sur le corpus (simulation en mémoire, sans écriture)

La règle du §2 a été appliquée à l'assemblage réel et à l'essai à blanc du lot 12, pour vérifier
qu'elle ne produit pas de fausse alerte :

| État | ENTRY | Lectures | Graphies | Contradictions |
|---|---|---|---|---|
| Assemblage réel (lots 0 à 11) | 414 | 420 | 27 | **13** |
| Essai à blanc (lot 12 supposé validé) | 445 | 451 | 31 | **16** |

Les 13 contradictions de l'assemblage réel sont toutes des erreurs réelles. Onze figurent au
tableau initial du rapport de portée. **Deux n'y figuraient pas** : お巡りさん (`<rt>ま和</rt>`) et
靴下 (`<rt>下</rt>`), dont un `<rt>` contient un kanji. Le relevé initial les avait écartées à tort
(rapport de portée, complément du 2026-10-04).

Les 3 contradictions ajoutées par le lot 12 sont 今年, 夕方 et 近々. 今朝 et 昨夜, concordantes,
relèvent seulement de la règle A.

---

## 8. Précisions arrêtées à la relecture

Arrêtées le 2026-10-04, après le contrôle indépendant des chiffres sur le dépôt, et validées avec
l'addendum :

1. **Kanji dans un `<rt>`** (§2.1, point 3) : traité par la règle B. Il fait déjà échouer la
   comparaison avec les kana ; aucun contrôle séparé n'est nécessaire.
2. **お巡りさん et 靴下** : la réouverture porte sur **13 entrées** validées, et non 11 (rapport de
   portée, complément).
3. **今日** : inscrite dans la liste A, pour la protection seulement (§4).
4. **Code de l'erreur** des deux compléments : `furigana-lecture`.

---

## Décisions de cet addendum

| Point | Décision |
|---|---|
| Niveau de gouvernance | addendum de conception Ocha, complément d'I4 et d'I5 |
| Règle B, lectures | lecture recomposée des furigana égale au `kana` de la lecture ; erreur bloquante (I4) |
| Règle B, graphies | lecture recomposée égale au `kana` de la lecture par défaut ; erreur bloquante (I5) |
| Comparaison | katakana convertis en hiragana des deux côtés ; « ー » conservé ; aucun kanji dans la lecture recomposée |
| Détection et correction | la règle détecte ; le champ fautif est choisi par une décision humaine sur la fiche source (スポーツ : le kana) |
| Correction minimale | segmentation conservée quand une segmentation admissible existe (八百屋) ; bloc par nécessité sinon (風邪), sans entrée dans la liste A |
| Règle A | liste fermée normative : 大人, 今年, 今日, 今朝, 昨夜 ; furigana en bloc ; règle de reconstruction, non contrôlée par le validateur |
| Protection et correction | toute entrée de la liste est protégée ; seules celles dont la source est segmentée sont corrigées (今日 : protégée, ni corrigée ni rouverte) |
| Liste A, implémentation | transcrite dans `rules.mjs`, avec un test de conformité |
| Kanji dans un `<rt>` | contradiction de la règle B, sans contrôle séparé |
| Données validées | corrigées maintenant, par réouverture contrôlée et journalisée (13 entrées) |
| Graphie liée à une lecture non par défaut | besoin distinct, hors du champ de cet addendum |
