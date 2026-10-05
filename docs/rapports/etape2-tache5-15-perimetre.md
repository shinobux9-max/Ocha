# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.15 · Périmètre proposé du lot 14 « Nombres, compteurs et mesures »

**Date** : 2026-10-04
**Nature** : proposition de périmètre, pour relecture puis arbitrage. **Aucune décision lexicale** :
aucun fichier de lot, aucune décision de journal, aucune règle n'est créé ni modifié.

---

## 1. Méthode

Le thème proposé à la relecture est « nombres et quantification ». Le périmètre part de l'ancienne
catégorie `nombres_quantites`.

**Contrôles par script**, sur les sources figées et les 14 lots existants :
- `nombres_quantites` compte 35 entrées sources ; 6 sont décidées (キロ et son doublon, 七, 九, 四 dans
  le lot 0 ; 匹 dans le lot 07) ;
- il en reste **29**, toutes non décidées ;
- les 29 identifiants sont distincts, présents dans la source, absents de tout lot ;
- aucune n'a de candidat de tag de lieu.

## 2. Périmètre proposé : 29 entrées, en cinq groupes

### A. Nombres simples (12)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_365` | ゼロ | ぜろ | Zéro ; néant |
| `n5_v_389` | 零 | れい | Zéro ; néant ; zéro (scientifique, formel) |
| `n5_v_367` | 一 | いち | Un |
| `n5_v_376` | 二 | に | Deux |
| `n5_v_372` | 三 | さん | Trois |
| `n5_v_378` | 五 | ご | Cinq |
| `n5_v_382` | 六 | ろく | Six |
| `n5_v_380` | 八 | はち | Huit |
| `n5_v_384` | 十 | じゅう | Dix |
| `n5_v_388` | 百 | ひゃく | Cent |
| `n5_v_385` | 千 | せん | Mille |
| `n5_v_371` | 万 | まん | Dix mille ; myriade |

Ce sont douze des quinze nombres de la liste `NUMERAL_IDS` (classe `numeral`, mécanique). Les trois
autres, 四, 七 et 九, sont validés dans le lot 0 : nombres › nombres › cardinaux, `quantite_valeur`.

### B. Série en つ (9)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_368` | 一つ | ひとつ | Un (objet) ; une unité ; un (général) |
| `n5_v_377` | 二つ | ふたつ | Deux (objets) ; deux unités ; 2 ans (âge) |
| `n5_v_373` | 三つ | みっつ | Trois (objets) ; trois unités ; 3 ans (âge) |
| `n5_v_387` | 四つ | よっつ | Quatre (objets) ; quatre unités ; 4 ans (âge) |
| `n5_v_379` | 五つ | いつつ | Cinq (objets) ; cinq unités ; 5 ans (âge) |
| `n5_v_383` | 六つ | むっつ | Six (objets) ; six unités ; 6 ans (âge) |
| `n5_v_370` | 七つ | ななつ | Sept (7 objets) ; sept unités ; 7 ans (âge) |
| `n5_v_381` | 八つ | やっつ | Huit (objets) ; huit unités ; 8 ans (âge) |
| `n5_v_375` | 九つ | **ここなつ** | Neuf (objets) ; neuf unités ; 9 ans (âge) |

### C. Personnes et âge (3)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_627` | 一人 | ひとり | Une personne ; tout seul ; seul(e) |
| `n5_v_631` | 二人 | ふたり | Deux personnes ; tous les deux ; un couple (par extension) |
| `n5_v_632` | 二十歳 | はたち | 20 ans ; vingt ans (âge de la majorité traditionnelle) |

### D. Mesures (4)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_364` | キログラム | きろぐらむ | Kilogramme ; kilo |
| `n5_v_611` | グラム | ぐらむ | Gramme ; unité de mesure de masse |
| `n5_v_366` | メートル | めーとる | Mètre ; unité de mesure de longueur |
| `n5_v_650` | 半分 | はんぶん | Moitié ; partie égale ; demi |

### E. Hors série (1)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_623` | ページ | ぺーじ | Page ; page d'un livre ou d'un document |

L'ancienne source range ページ dans les compteurs ; sa fiche le décrit comme un nom.

## 3. Faut-il scinder le lot ?

**Je ne le recommande pas.** 29 entrées est une taille ordinaire, et les groupes A et B sont deux
paradigmes à décider en bloc.

## 4. Entrées voisines, hors `nombres_quantites`

Ces entrées non décidées expriment une quantité ou un degré. Je propose de **ne pas** les inclure.

| Identifiant | Mot | Ancienne catégorie | Sens de la source |
|---|---|---|---|
| `n5_v_654` | 多い | `descriptions_qualites › quantite` | Nombreux ; beaucoup de |
| `n5_v_447` | 少ない | `descriptions_qualites › quantite` | Peu nombreux ; peu de |
| `n5_v_655` | 大勢 | `descriptions_qualites › quantite` | Beaucoup de monde ; une foule |
| `n5_v_520` | たくさん | `adverbes_expressions › quantite` | Beaucoup |
| `n5_v_639` | 全部 | `adverbes_expressions › quantite` | Tout ; la totalité |
| `n5_v_509` | 少し | `adverbes_expressions › quantite` | Un peu |
| `n5_v_497` | ちょっと | `adverbes_expressions › quantite` | Un peu ; un instant |
| `n5_v_515` | あまり | `adverbes_expressions › quantite` | Pas tellement |
| `n5_v_517` | 一番 | `adverbes_expressions › superlatif` | Le plus ; numéro un |
| `n5_v_496`, `n5_v_498`, `n5_v_607`, `n5_v_546` | ちょうど, とても, もっと, 大体 | `adverbes_expressions` | degré, mesure, approximation |

**Pourquoi les laisser de côté.** Ces mots seront à examiner au regard des fonctions
`quantificateur`, `comparatif` et `intensifieur` d'A2-LING. Rien n'est dit ici de celles qu'ils
portent : aucune de ces fonctions n'a de définition normative (seule `deictique` en a une, par A7),
et leur attribution est une décision lexicale. Les décider maintenant obligerait à appliquer des
fonctions non définies à une dizaine de sens, ce qui avait demandé un addendum pour `deictique`
(lot 11). Je propose un lot ultérieur « quantité et degré », précédé de cette question.

Si tu préfères un lot plus large, les huit premières lignes du tableau porteraient le lot à 37
entrées, sans scission nécessaire, mais avec la question des fonctions à trancher d'abord.

## 5. Cas sensibles

### 5.1. Un blocage d'infrastructure : la lecture de 九つ

La source donne **ここなつ** pour 九つ, en kana comme en furigana (`<ruby>九<rt>ここな</rt></ruby>つ`).
La lecture juste est ここのつ, et le romaji de la fiche le dit (*kokonotsu*). L'anomalie est connue
(`ETAT-ACTUEL.md`, points ouverts).

- **L'addendum A8 ne la voit pas** : les furigana et les kana concordent, tous deux faux.
- **La lecture est donc mécanique** : aucune exception ne la rend décidable, et une décision de lot
  qui la corrigerait serait refusée (`decision-hors-frontiere`).
- **Il faut un mécanisme** avant la proposition lexicale. Je vois deux voies :
  - une **liste fermée de lectures à décider**, sur le modèle de `WORD_EXCEPTION_IDS` (graphie
    fautive connue), avec 九つ pour seule entrée ;
  - une **règle générale** comparant le romaji de la source aux kana, ce qui serait un troisième
    témoin systématique. Elle demanderait d'examiner d'abord combien d'entrées elle touche.
- Dans les deux cas, c'est une modification des règles de reconstruction, à arbitrer.

### 5.2. Mécanique

- **Lectures à décider** : 一人 (balise cassée dans les furigana) et 二十歳 (texte de base 二歳 au
  lieu de 二十歳). Pour 二十歳, la lecture はたち ne se répartit pas entre les trois kanji : un bloc par
  nécessité, au sens d'A8, est probable. Sa fiche parle de « lecture traditionnelle », non de
  lecture spéciale : elle reste hors de la liste A.
- **Classe grammaticale** : 12 entrées sont dans la liste des classes à décider (la série en つ,
  一人, 二人, 二十歳). Le lot 13 a retenu `nom` pour les jours du mois.
- **Lectures des mots en katakana** : statu quo (ぜろ, きろぐらむ, めーとる, ぐらむ, ぺーじ).

### 5.3. Sens et doctrine

1. **Série en つ : objets et âge.** Huit fiches sur neuf donnent « N objets » et « N ans (âge) » ;
   celle de 一つ ne mentionne pas l'âge. Un sens ou deux, et l'asymétrie de 一つ, sont à trancher.
2. **Le champ `counter`.** Plusieurs fiches emploient le mot « compteur » : la série en つ
   (« compteur général »), 一人 et 二人 (« compteur / nom spécial »), 二十歳 (« compteur d'âge
   spécial »), 万 (« nom ou compteur numérique »). Le champ est réservé aux ENTRY qui sont
   elles-mêmes des compteurs ; seule 匹 le porte. 一つ est un nombre déjà compté, pas un compteur.
   À examiner entrée par entrée, sans inventer de compatibilité.
3. **Unités** (キログラム, グラム, メートル) : candidates à `semantic_type: null` (A6), comme キロ.
4. **キログラム et キロ.** キロ est validé avec deux sens, kilogramme et kilomètre. La fiche de
   キログラム dit « souvent abrégé en kiro ». Ce sont deux mots distincts : aucune fusion.
5. **ゼロ et 零.** Deux mots pour la même valeur, que les fiches distinguent par le registre. Aucune
   fusion. La fiche de ゼロ cite aussi 丸 (まる), qui n'est pas dans les sources : rien n'est ajouté.
6. **半分 et 半.** 半 est validé avec le sens « moitié » (fraction, `quantite_valeur`). Deux entrées
   distinctes peuvent porter des sens proches : ni fusion, ni suppression de sens.
7. **一人 et 二人.** Deux emplois par fiche : le nombre de personnes, et « seul » ou « à deux ».
8. **Lectures absentes.** 四, 七 et 九 ont deux lectures dans le lot 0 ; les douze nombres de ce lot
   n'en ont qu'une dans les sources. Aucune n'est ajoutée (十 n'a que じゅう, pas とお).
9. **Paradigme incomplet.** La série en つ s'arrête à neuf (十 とお absent) ; 三人 et au-delà sont
   absents. Rien n'est complété.

## 6. Ce qui est à arbitrer

1. Le thème et le titre : « Nombres, compteurs et mesures », 29 entrées, sans scission.
2. Le sort des voisins du §4 : les réserver à un lot « quantité et degré », ou les inclure.
3. **Le mécanisme pour 九つ** (§5.1), qui conditionne la proposition lexicale.

Aucune proposition lexicale ne sera écrite avant la validation de ce périmètre.

## 7. Arbitrage du 2026-10-04

- **Périmètre retenu** : les 29 entrées, sous le titre « Nombres, compteurs et mesures », sans
  scission. Les voisins du §4 sont réservés à des lots ultérieurs.
- **九つ** : une **liste fermée de lectures fautives connues**, limitée à cette entrée, rend sa
  lecture décidable. Elle ne corrige rien d'elle-même et ne modifie pas les sources figées : la
  correction se décide dans le lot et se journalise. Elle est distincte de la liste A des lectures
  spéciales (A8). La comparaison générale du romaji et des kana demanderait un chantier à part
  (conventions de transcription, variantes, faux positifs) : elle n'est pas retenue.
- La formulation sur les fonctions linguistiques des voisins (§4) a été rectifiée après relecture.
- Cet arbitrage porte sur le périmètre et sur le mécanisme : il ne tranche aucun cas sensible du §5.
