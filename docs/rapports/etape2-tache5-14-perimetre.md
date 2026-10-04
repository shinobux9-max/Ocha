# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.14 · Périmètre proposé du lot 13 « Calendrier, dates et durées »

**Date** : 2026-10-04
**Nature** : proposition de périmètre, pour relecture puis arbitrage. **Aucune décision lexicale** :
aucun fichier de lot, aucune décision de journal, aucune règle n'est créé ni modifié.

---

## 1. Méthode

Le périmètre part de la décision du 2026-10-03 : les entrées de l'ancienne catégorie
`temps_calendrier` forment deux lots, le lot 12 puis le lot 13, ce dernier « à composer par
identifiants après le lot 12, éventuellement en deux ».

**Contrôles par script**, sur les sources figées et les 13 lots existants :
- `temps_calendrier` compte 61 entrées sources : 4 décidées dans le lot 0, 31 dans le lot 12 ;
- il en reste **26**, toutes non décidées ;
- les 26 identifiants sont distincts, présents dans la source, absents de tout lot ;
- cet ensemble est exactement celui des `temps_calendrier` non décidées.

## 2. Périmètre proposé : 26 entrées, en quatre groupes

### A. Jours de la semaine (7)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_317` | 日曜日 | にちようび | Dimanche |
| `n5_v_323` | 月曜日 | げつようび | Lundi |
| `n5_v_336` | 火曜日 | かようび | Mardi |
| `n5_v_335` | 水曜日 | すいようび | Mercredi |
| `n5_v_325` | 木曜日 | もくようび | Jeudi |
| `n5_v_338` | 金曜日 | きんようび | Vendredi |
| `n5_v_314` | 土曜日 | どようび | Samedi |

### B. Jours du mois et durées en jours (10)

| Identifiant | Mot | Lecture | Sens de la source, dans son ordre |
|---|---|---|---|
| `n5_v_296` | 二日 | ふつか | Deux jours (durée) ; le 2 (du mois) |
| `n5_v_293` | 三日 | みっか | Le 3 (du mois) ; trois jours (durée) |
| `n5_v_313` | 四日 | よっか | 4 jours ; le 4 (du mois) |
| `n5_v_297` | 五日 | いつか | 5 jours ; le 5 (du mois) |
| `n5_v_308` | 六日 | むいか | 6 jours ; le 6 (du mois) |
| `n5_v_292` | 七日 | なのか | 7 jours (durée) ; le 7 du mois |
| `n5_v_307` | 八日 | ようか | 8 jours ; le 8 (du mois) |
| `n5_v_294` | 九日 | ここのか | 9 jours ; le 9 (du mois) |
| `n5_v_309` | 十日 | とおか | 10 jours (durée) ; le 10 (du mois) |
| `n5_v_295` | 二十日 | はつか | 20 jours ; le 20 (du mois) |

### C. Durées et unités de temps (5)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_288` | 一日 | いちにち | Une journée ; tout au long de la journée |
| `n5_v_291` | 一月 | ひとつき | Un mois (durée) |
| `n5_v_316` | 年 | とし | Année ; âge ; an |
| `n5_v_321` | 時間 | じかん | Temps ; heure (durée) |
| `n5_v_311` | 半 | はん | Moitié ; et demie (pour les heures) |

### D. Calendrier et repères (4)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_287` | カレンダー | かれんだー | Calendrier ; éphéméride |
| `n5_v_337` | 誕生日 | たんじょうび | Anniversaire ; jour de naissance |
| `n5_v_634` | 休み | やすみ | Repos ; vacances ; congé ; jour férié ; pause |
| `n5_v_663` | 後 | あと | Après ; plus tard ; derrière ; le reste |

## 3. Faut-il scinder le lot ?

**Je ne le recommande pas.** 26 entrées est une taille ordinaire (les lots validés vont de 20 à 60).
Les groupes A et B sont deux paradigmes, qui se décident mieux en bloc ; les groupes C et D
partagent les mêmes questions (unité, durée, repère). Aucune fusion n'est en vue.

La scission ne se justifierait que si les voisins du §4 étaient tous ajoutés.

## 4. Entrées voisines, hors `temps_calendrier`

Ces entrées non décidées touchent au thème. Leur inclusion est à arbitrer ; je donne un avis pour
chacune.

| Identifiant | Mot | Ancienne catégorie | Lien | Avis |
|---|---|---|---|---|
| `n5_v_268` | 夏休み なつやすみ | `meteo_saisons › saisons` | composé de 休み ; « vacances d'été » | **à inclure** : le décider avec 休み évite deux arbitrages divergents sur la catégorie et le type |
| `n5_v_650` | 半分 はんぶん | `nombres_quantites › mesures` | « moitié », comme le premier sens de 半 | à laisser au lot des nombres ; 半 et 半分 sont deux entrées distinctes, qui peuvent porter des sens proches : cette proximité n'impose ni fusion ni suppression de sens |
| `n5_v_632` | 二十歳 はたち | `nombres_quantites › age` | composé numéral ; lecture en exception | à laisser au lot des nombres |
| `n5_v_645` | 初め はじめ | `ecole_apprentissage › temps` | « début » ; lecture à décider (A8) | à laisser à un lot ultérieur |
| `n5_v_454` | 早い はやい | `descriptions_qualites › temps` | « tôt » | à laisser au lot des adjectifs |
| `n5_v_675` | 次 つぎ | `position_direction › ordre` | « suivant, prochain » | à laisser à un lot ultérieur |

**À signaler** : dix adverbes de temps et de fréquence restent non décidés, dans
`adverbes_expressions` (いつも, また, もう一度, よく, たいてい, 時々 ; まだ, もう, すぐに, 初めて). Le
lot 12, bien que nommé « … et fréquence », n'a pris que des entrées de `temps_calendrier`. Ces
adverbes ne relèvent pas du calendrier : je propose de les réserver à un lot d'adverbes. Ils y
seront examinés au regard d'A7, sens par sens : leur caractère temporel ne suffit pas à établir une
fonction déictique.

Avec 夏休み, le lot compterait **27 entrées**.

## 5. Cas sensibles

**Mécanique.**
- **Lectures et formes** : aucune exception dans les 26 entrées. Aucune contradiction au sens
  d'A8 ; les lectures restent mécaniques.
- **Classe grammaticale** : 12 entrées sont dans la liste des classes à décider, soit les dix
  jours du mois, 一日 et 一月 (« composés numéraux »). Leur classe et leur groupe se décident dans
  le lot.
- **Particules** : une seule fiche en donne (後 : で, に).
- **Tags de lieu** : les 26 entrées héritent du candidat `lieu_hotel`, à arbitrer une par une. Le
  lot 12 avait rejeté ses 31 candidats.

**Sens et doctrine.**
1. **Jours du mois : deux sens, ou un seul ?** Chaque fiche donne une date (« le 3 du mois ») et
   une durée (« trois jours »). Ce sont deux emplois distincts, pas deux traductions : la question
   est à trancher pour le paradigme entier.
2. **Ordre des sens, asymétrique dans les sources.** 三日 met la date en premier ; les neuf autres
   mettent la durée. L'ordre fixe les identifiants de sens : faut-il suivre chaque fiche, ou un
   ordre unique ? Le lot 11 avait assumé l'asymétrie de ses fiches.
3. **Paradigme incomplet.** Les sources n'ont ni ついたち (le 1er), ni 十四日, ni 二十四日, ni les noms
   des mois. 一日 n'est donné qu'en いちにち (durée) et 一月 qu'en ひとつき (durée) ; les fiches
   mentionnent ついたち et いちがつ comme autres mots. Doctrine : aucune forme ni lecture absente
   n'est complétée.
4. **Lectures des jours du mois.** Elles sont en bloc dans les sources et concordantes. Aucune
   fiche ne les qualifie de spéciales (elles parlent de « lecture traditionnelle ») : elles restent
   hors de la liste A d'A8.
5. **年 (とし)** : « année » et « âge » sont deux sens candidats. À relier à 今年, validé.
6. **時間** : « temps » et « heure (durée) ». La fiche le dit aussi compteur des heures. Le champ
   `counter` est réservé aux ENTRY qui sont des compteurs ; seul 匹 le porte. Cette mention de la
   source demande un examen explicite du modèle et du registre existants ; elle ne justifie pas, à
   elle seule, une compatibilité nouvelle.
7. **半** : la fiche le dit « suffixe ou nominal ». Le champ `suffix` est défini dans le schéma
   (propriété « suffixe » d'A2-LING-v1) ; le point ouvert porte sur la représentation des affixes.
   Deux emplois : « moitié » et « et demie ».
8. **休み** : cinq traductions pour un ou deux sens (le repos, la période de congé). Lié à 夏休み.
9. **後 (あと)** : sens temporel (« après, plus tard »), sens spatial (« derrière ») et « le
   reste ». 後ろ, 前 et 先 sont validés dans le lot 10 : cohérence à tenir.
10. **Addendum A7, axe du temps.** Les jours de la semaine et les dates sont des repères du
    calendrier, pas des repères d'énonciation ; 後 « plus tard » peut l'être. À appliquer sens par
    sens.
11. **Addendum A6.** Les unités et mesures (年, 時間, 半, durées en jours) sont des candidats à
    `semantic_type: null`, à justifier sens par sens.
12. **Étymologies.** Les fiches des jours donnent « le jour de Saturne », « le jour du Soleil » :
    ce sont des gloses, pas des sens.

## 6. Ce qui est à arbitrer

1. Le périmètre : 26 entrées, ou 27 avec 夏休み.
2. Le sort des autres voisins du §4, et celui des dix adverbes.
3. L'absence de scission.

Aucune proposition lexicale ne sera écrite avant la validation de ce périmètre.

## 7. Arbitrage du 2026-10-04

Périmètre retenu : **27 entrées**, les 26 de `temps_calendrier` et 夏休み (`n5_v_268`), sans
scission. Les autres voisins et les dix adverbes restent pour des lots ultérieurs. Trois
formulations de ce rapport ont été rectifiées après relecture (半 et le champ `suffix`, les adverbes
et A7, 半 et 半分), et la remarque sur 時間 a été précisée. Cet arbitrage porte sur le périmètre : il
ne tranche aucun des cas sensibles du §5.
