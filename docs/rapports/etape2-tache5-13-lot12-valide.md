# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.13 · Lot 12 « Temps relatif, moments de la journée et fréquence » · validé

**Date** : 2026-10-04
**Nature** : validation atomique du lot 12, sur autorisation, après la révision 5.13b et la clôture
du chantier 5.13-C. Le lot 13 n'est pas composé. Rien n'est commité.

---

## 1. Ce qui a été validé

**Des statuts, et rien d'autre.**

| Objet | Avant | Après |
|---|---|---|
| 31 entrées de `lot-12.json` | `proposed` | `validated` |
| 97 décisions du journal (D0735 à D0826, D0840 à D0844) | `proposed` | `validated` |

**Contrôle avant écriture** : le contenu sérialisé hors champ `status` de `lot-12.json` et de
`journal.json` est identique avant et après ; les seuls statuts modifiés au journal sont ceux des
97 décisions du lot 12 ; les entrées du lot citent exactement ces 97 décisions.

Le contenu validé est celui qui a été relu : la proposition initiale 5.13, puis la révision 5.13b
(cinq lectures, D0840 à D0844 ; raison de D0746 réécrite à sa place).

## 2. Assemblage réel

`node tools/reconstruction/run.mjs assemble`, sortie sans erreur :

| ENTRY | Retraits | Écartées | Problèmes de décision | Erreurs lexicales | Attente |
|---|---|---|---|---|---|
| **445** | **31** | **243** | **0** | **0** | **0** |

- **Journal** : 844 décisions, D0001 à D0844, toutes validées. Plus aucune proposition n'est en
  cours dans l'espace de travail.
- **Avertissements** : 45, soit le même nombre qu'avant le lot 12 (24 `categorie-nulle`, 20
  `type-nul`, 1 `kanji-inconnu` sur 醤). Le lot 12 n'en ajoute aucun.
- **Reste à décider** : 243 anciennes entrées.

## 3. Le lot 12 en bref

- **31 entrées gardées**, aucune fusion, aucun ajout, aucun tag de lieu (31 candidats `lieu_hotel`
  rejetés).
- **Addendum A7, axe du temps** : 20 sens portent `deictique`, dans 20 entrées ; 11 entrées n'en
  portent pas. La fonction est appliquée sens par sens : être un mot temporel ne suffit pas.
- **Addendum A8** : six entrées décident leur lecture.

| ENTRY | Décision | Lecture validée | Fondement |
|---|---|---|---|
| 昨日 `n5_v_320` | D0746 | `<ruby>昨日<rt>きのう</rt></ruby>` | furigana source invalides ; bloc par nécessité |
| 今年 `n5_v_299` | D0840 | `<ruby>今年<rt>ことし</rt></ruby>` | liste A, et contradiction |
| 今朝 `n5_v_303` | D0841 | `<ruby>今朝<rt>けさ</rt></ruby>` | liste A |
| 昨夜 `n5_v_319` | D0842 | `<ruby>昨夜<rt>ゆうべ</rt></ruby>` | liste A |
| 近々 `n5_v_359` | D0843 | `<ruby>近<rt>ちか</rt></ruby><ruby>々<rt>じか</rt></ruby>` | contradiction ; arbitrage ちかじか |
| 夕方 `n5_v_439` | D0844 | `<ruby>夕<rt>ゆう</rt></ruby><ruby>方<rt>がた</rt></ruby>` | contradiction, voisement |

今日 (`n5_v_300`) est dans la liste A pour protection : sa lecture, déjà en bloc dans la source,
reste mécanique.

## 4. Tests

**Tests d'état, stricts** :
- le lot 12 est entièrement validé : 31 entrées, 97 décisions, aucune fusion, aucun tag de lieu,
  20 sens déictiques, 11 entrées sans fonction déictique ;
- les cinq lectures de 5.13b ont leur valeur exacte, et D0746 sa lecture et son fondement ;
- l'espace de travail réel s'assemble à 445 / 31 / 243, sans problème, erreur ni attente ;
- aucune proposition n'est en cours : toutes les entrées décidées et tout le journal sont validés ;
- le journal va de D0001 à D0844, sans trou.

L'essai à blanc en mémoire, devenu identique à l'état réel, est retiré.

**Contrôles** : **442 tests réussis**, 0 échec ; `check-layers` sans violation ; `validate-data` :
0 erreur, 8 avertissements connus ; sources conformes au manifeste.

**8 sabotages, tous attrapés**, chacun vérifié comme modifiant réellement son fichier, puis
restauré à l'octet près :

| Sabotage | Tests en échec |
|---|---|
| une entrée du lot 12 repasse en `proposed` (今日) | 2 |
| une décision du lot 12 repasse en `proposed` (D0800) | 3 |
| une fonction `deictique` est retirée d'un sens du lot 12 | 1 |
| un tag de lieu est ajouté à une entrée du lot 12 | 1 |
| 今朝 : lecture segmentée, sans bloc | 2 |
| 夕方 : furigana remis à かた | 2 |
| une décision du lot 12 est retirée du journal (D0844) | 4 |
| une entrée du lot 11 repasse en `proposed` | 2 |

## 5. Bilan de la séquence 5.13

| Étape | Résultat |
|---|---|
| 5.13 | lot 12 proposé (31 entrées, 92 décisions) |
| 5.13-C | addendum A8 validé et implémenté ; 13 entrées validées corrigées (D0827 à D0839) |
| 5.13b | révision du lot 12 : cinq lectures (D0840 à D0844), raison de D0746 |
| 5.13 | lot 12 validé : 445 ENTRY, 31 retraits, 243 entrées restantes, 844 décisions validées |

## 6. Suite

1. Contrôle final du diff, puis commit sur autorisation.
2. Composition du périmètre du lot 13 (5.14 : calendrier, dates, durées), par identifiants
   contrôlés par script, avec ses cas sensibles ; aucune décision avant validation du périmètre.
