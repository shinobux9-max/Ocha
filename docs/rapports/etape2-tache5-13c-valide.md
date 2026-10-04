# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.13-C · Validation des 13 corrections, et suite de 5.13b

**Date** : 2026-10-04
**Nature** : validation atomique des 13 corrections de 5.13-C, sur autorisation ; puis livraison,
pour relecture, de la suite de 5.13b. **Le lot 12 et toutes ses décisions restent `proposed`.**
Rien n'est commité.

---

## 1. Validation atomique de 5.13-C

**Ce qui a changé : des statuts, et rien d'autre.**

| Objet | Avant | Après |
|---|---|---|
| 13 entrées des lots 00, 01, 03, 05, 08 et 09 | `proposed` | `validated` |
| 13 décisions du journal, D0827 à D0839 | `proposed` | `validated` |

**Contrôle avant écriture** : pour chaque lot et pour le journal, le contenu sérialisé hors champ
`status` est identique avant et après ; les seuls statuts modifiés sont ceux des 13 entrées et des
13 décisions nommées ; chacun des six lots est de nouveau entièrement validé.

**Assemblage réel** (`node tools/reconstruction/run.mjs assemble`, sortie sans erreur) :

| ENTRY | Retraits | Écartées | Problèmes de décision | Erreurs lexicales | Attente |
|---|---|---|---|---|---|
| **414** | **31** | **274** | **0** | **0** | **0** |

La fusion `n5_v_672 → n5_v_555` n'est plus en attente : 曲がる est de nouveau assemblée. Le
complément d'I4 et d'I5 (addendum A8) passe sur les 414 ENTRY : plus aucune contradiction entre
furigana et kana.

**Journal** : 747 décisions validées (734 historiques et les 13 corrections), 97 proposées, toutes
du lot 12.

**Tests d'état, de nouveau stricts** :
- les lots 00, 01, 03, 05, 08 et 09 sont entièrement validés, sans aucune entrée tolérée ;
- leur journal compte leurs décisions historiques, en nombre inchangé, plus une correction par
  entrée corrigée, toutes validées ;
- l'espace de travail réel s'assemble à 414 / 31 / 274, sans problème, erreur ni attente ;
- les 13 corrections sont vérifiées une par une, avec leur valeur exacte ;
- tout ce qui n'est pas du lot 12 est validé, tout ce qui est du lot 12 est proposé.

La tolérance des entrées rouvertes, la tolérance de l'attente et le test du retour en mémoire sont
retirés : ils n'ont plus d'objet.

## 2. Suite de 5.13b, pour relecture

5.13b est la révision du lot 12 demandée après le contrôle des furigana. Elle compte maintenant
deux parties, toutes deux `proposed`.

**(a) Les cinq lectures rendues décidables par A8**, déjà relues (rapport
`etape2-tache5-13c.md`, §7) : 今年, 今朝, 昨夜 en bloc par la liste A ; 近々 en ちかじか ; 夕方 en
がた. Décisions D0840 à D0844.

**(b) La raison de D0746 (昨日 `n5_v_320`), réécrite à sa place.** L'identifiant, le statut,
l'entrée, le champ, la nature, la valeur d'avant et la lecture corrigée sont inchangés ; seule la
raison change.

| | Texte |
|---|---|
| Avant | Furigana de la source invalides (toute la lecture sur 昨, rien sur 日) : lecture spéciale (jukujikun), portée par les deux kanji ensemble. |
| Après | Furigana de la source invalides : toute la lecture est portée par 昨, et le `<rt>` de 日 est vide. Bloc par nécessité (addendum A8, §3) : la fiche donne きのう pour le mot entier (romaji : kinou) et ne répartit pas la lecture entre les kanji ; aucune segmentation admissible n'est établie par la source. Hors liste des lectures spéciales : la fiche ne qualifie pas cette lecture de spéciale. |

La lecture corrigée reste `<ruby>昨日<rt>きのう</rt></ruby>`. Le bloc ne s'appuie plus sur une
qualification que la fiche ne donne pas, mais sur la nécessité : la source ne fournit aucune
répartition de きのう entre 昨 et 日.

**Un garde-fou ajouté.** Un test refuse désormais qu'une décision du journal invoque « jukujikun »
pour une entrée qui n'est pas dans la liste fermée d'A8. Il passe sur les 844 décisions : D0746
était le seul cas.

**Ce que le dépôt ne dit pas.** Aucun document du dépôt ne liste d'autre correction attendue de
5.13b. Si la relecture du lot 12 en demandait d'autres, elles ne sont consignées nulle part ici :
il faudrait me les redonner.

## 3. État du lot 12

- 31 entrées, toutes `proposed`.
- 97 décisions, toutes `proposed` : D0735 à D0826 (dont D0746, raison réécrite) et D0840 à D0844.
- Six entrées décident leur lecture : 昨日 (D0746) et les cinq lectures de 5.13b.
- **Essai à blanc, en mémoire** (lot 12 et ses décisions supposés validés) : **445 ENTRY, 31
  retraits, 243 entrées écartées**, 0 problème de décision, 0 erreur lexicale, 0 attente.

## 4. Contrôles

- tests : **443 réussis**, 0 échec ;
- `check-layers` : aucune violation ;
- `validate-data` : 0 erreur, 8 avertissements connus ;
- sources : conformes au manifeste ;
- rapports de lot régénérés : 00, 01, 03, 05, 08, 09 et 12.

**9 sabotages, tous attrapés**, chacun vérifié comme modifiant réellement son fichier, puis
restauré à l'octet près :

| Sabotage | Tests en échec |
|---|---|
| une entrée corrigée repasse en `proposed` (切手) | 3 |
| une correction validée repasse en `proposed` (D0829) | 3 |
| une correction validée est défaite (荷物 → もの) | 3 |
| le kana de スポーツ est remis à すぷーつ | 3 |
| la lecture décidée de お兄さん est retirée | 3 |
| la graphie 曲る est remise à ま | 3 |
| une entrée du lot 12 est validée (今日) | 2 |
| la raison de D0746 invoque de nouveau jukujikun | 2 |
| la lecture corrigée de D0746 est changée | 1 |

## 5. Suite

1. Relecture de la suite de 5.13b (§2).
2. Sur autorisation : validation atomique du lot 12 (31 entrées, 97 décisions), statuts seulement.
3. Composition du périmètre du lot 13 (calendrier, dates, durées), par identifiants.
