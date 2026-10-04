# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.14 · Lot 13 « Calendrier, dates et durées » · validé

**Date** : 2026-10-04
**Nature** : validation atomique du lot 13, sur autorisation explicite, dans sa version révisée par
5.14b. Rien n'est commité.

---

## 1. Ce qui a été validé

**Des statuts, et rien d'autre.**

| Objet | Avant | Après |
|---|---|---|
| 27 entrées de `lot-13.json` | `proposed` | `validated` |
| 109 décisions du journal (D0845 à D0953) | `proposed` | `validated` |

**Contrôle avant écriture** : le contenu sérialisé hors champ `status` de `lot-13.json` et de
`journal.json` est identique avant et après ; les seuls statuts modifiés au journal sont ceux des
109 décisions du lot 13 ; les entrées du lot citent exactement ces 109 décisions.

Le contenu validé est celui qui a été relu : la proposition 5.14, la révision 5.14b (後), et la
référence à A7 §4 précisée dans D0952.

## 2. Les choix arbitrés

1. **Jours du mois** : deux sens, la date et la durée, dans l'ordre de chaque fiche. 三日 est la
   seule entrée à montrer la date en premier.
2. **Durées** (les jours du mois, 一日, 一月) : type `quantite_valeur`.
3. **年** : deux sens, l'année (`concept_abstrait`) et l'âge (`propriete`).
4. **休み et 夏休み** : un sens chacun, rangés comme périodes (temps › moments et périodes).
5. **後** : trois sens ; `deictique` sur le sens temporel (A7, §4) ; « Le reste » conservé.
6. **カレンダー** : catégorie nulle, comme 時計 (A5).
7. **半** : `suffix: true`, première ENTRY du corpus à porter ce champ.
8. **時間** : `counter: null` ; la lacune du registre des compteurs reste ouverte (§5).
9. **Tags** : les 26 candidats `lieu_hotel` sont rejetés.

## 3. Assemblage réel

`node tools/reconstruction/run.mjs assemble`, sortie sans erreur :

| ENTRY | Retraits | Écartées | Problèmes de décision | Erreurs lexicales | Attente |
|---|---|---|---|---|---|
| **472** | **31** | **216** | **0** | **0** | **0** |

- **Journal** : 953 décisions, D0001 à D0953, toutes validées. Aucune proposition n'est en cours.
- **Avertissements** : 47, soit 2 de plus qu'avant le lot, tous deux justifiés au journal :
  `categorie-nulle` sur カレンダー (D0849), `type-nul` sur 時間, sens 2 (D0926). Au total :
  25 `categorie-nulle`, 21 `type-nul`, 1 `kanji-inconnu` (醤).
- **Reste à décider** : 216 anciennes entrées.

## 4. Le lot 13 en bref

- **27 entrées gardées**, aucune fusion, aucun ajout, aucun tag de lieu ; **42 sens**.
- **Catégories utilisées pour la première fois** : temps › calendrier (jours, dates, années),
  temps › durée, temps › unités temporelles, nombres › totalité et partie › reste.
- **Addendum A7** : un seul sens déictique, le sens temporel de 後.
- **Addendum A8** : aucune lecture décidée ; toutes sont mécaniques et concordantes.
- **Classe** : `nom` décidée pour douze composés numéraux (les dix jours du mois, 一日, 一月).
- **Champ `counter`** : toujours porté par la seule 匹. **Champ `suffix`** : porté par la seule 半.

## 5. Ce qui reste ouvert

- **Registre des compteurs et 時間** : la fiche dit que 時間 compte les heures, mais le registre n'a
  aucune compatibilité pour une durée. Le dire dans le modèle demande une décision sur le registre
  (A2-02, verrouillé). D'ici là, `counter: null`, et l'emploi est décrit en nuance.
- **Audit A2-05 de la deixis temporelle** : les sens temporels de 前 et de 先 (lot 10) sont sans
  fonction, alors que 後 porte `deictique`. L'audit ne préjuge pas d'une correction.
- **Réservés à des lots ultérieurs** : 半分, 二十歳, 初め, 早い, 次, et dix adverbes de temps et de
  fréquence.

## 6. Tests

**Tests d'état, stricts** :
- le lot 13 est entièrement validé : 27 entrées, 109 décisions, 42 sens, aucune fusion, aucun tag ;
- chaque choix arbitré est vérifié : forme et ordre des sens des jours du mois, type des durées,
  年, 半, 時間, カレンダー, 休み, 夏休み, les trois sens de 後 et sa fonction ;
- aucune traduction n'est à la fois gardée dans un sens et abandonnée au journal ;
- l'espace de travail réel s'assemble à 472 / 31 / 216, sans problème, erreur ni attente ;
- aucune proposition n'est en cours ; le journal va de D0001 à D0953 sans trou.

L'essai à blanc en mémoire, devenu identique à l'état réel, est retiré.

**Contrôles** : **443 tests réussis**, 0 échec ; `check-layers` sans violation ; `validate-data` :
0 erreur, 8 avertissements connus ; sources conformes au manifeste.

**Sabotages** : 13, chacun vérifié comme modifiant réellement son fichier, puis restauré à l'octet
près. L'un d'eux n'a pas été attrapé au premier passage ; il a été rejoué après correction du test.

| Sabotage | Résultat |
|---|---|
| une entrée repasse en `proposed` (月曜日) | attrapé |
| une décision repasse en `proposed` (D0900) | attrapé |
| 二日 : ordre des sens inversé | attrapé |
| **一日 : durée en `concept_abstrait`** | **non attrapé au premier passage**, puis attrapé |
| 半 : `suffix` remis à `false` | attrapé |
| 時間 : compatibilité de compteur inventée | attrapé |
| カレンダー rangé dans temps › calendrier | attrapé |
| 後 : fonction `deictique` retirée | attrapé |
| 休み : tag `lieu_hotel` ajouté | attrapé |
| une décision du lot retirée du journal (D0953) | attrapé |
| 一月 : durée en `concept_abstrait` | attrapé |
| 土曜日 rangé dans les dates | attrapé |
| 年 : âge en `quantite_valeur` | attrapé |

**Un trou de test comblé.** Le type des durées n'était vérifié que pour les jours du mois : changer
celui de 一日 ne faisait échouer aucun test. Le test d'état vérifie maintenant le type et la
catégorie de 一日, 一月, 半, des jours de la semaine et de 誕生日. Le sabotage, rejoué, est attrapé.

## 7. Suite

1. Contrôle final du diff, puis commit sur autorisation.
2. Choix du thème du lot 14 parmi les 216 entrées restantes, puis composition de son périmètre par
   identifiants ; aucune décision avant validation du périmètre.
