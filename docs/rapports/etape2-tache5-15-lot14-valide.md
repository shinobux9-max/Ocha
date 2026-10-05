# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.15 · Lot 14 « Nombres, compteurs et mesures » · validé

**Date** : 2026-10-04
**Nature** : validation atomique du lot 14, sur autorisation explicite, dans sa version révisée par
5.15b. Rien n'est commité.

---

## 1. Ce qui a été validé

**Des statuts, et rien d'autre.**

| Objet | Avant | Après |
|---|---|---|
| 29 entrées de `lot-14.json` | `proposed` | `validated` |
| 72 décisions du journal (D0954 à D1025) | `proposed` | `validated` |

**Contrôle avant écriture** : le contenu sérialisé hors champ `status` de `lot-14.json` et de
`journal.json` est identique avant et après ; les seuls statuts modifiés au journal sont ceux des
72 décisions du lot 14 ; les entrées du lot citent exactement ces 72 décisions. Aucune valeur,
aucune raison n'a été modifiée lors de la bascule.

## 2. Les choix arbitrés

1. **Série en つ** : deux sens, les objets et l'âge, de 二つ à 九つ ; un seul sens pour 一つ, dont la
   fiche ne mentionne pas l'âge. Classe `nom`. Ce n'est pas une règle générale : un emploi avec
   compteur ne produit pas automatiquement un sens ; ici, les sens suivent les fiches.
2. **Âge chiffré** (le sens « N ans » de la série, 二十歳) : type `quantite_valeur`.
3. **ゼロ et 零** : sens « Zéro » ; « Néant » signalé en nuance comme traduction de la source non
   développée.
4. **万** : « Myriade » gardé comme autre traduction.
5. **一人** : deux sens ; « seul » en `etat`, catégorie nulle (A5).
6. **二人** : un seul sens ; « Un couple (par extension) » garde la qualification de la source.
7. **Unités** (キログラム, グラム, メートル) : type nul (A6). L'écart de catégorie entre メートル et le
   sens « kilomètre » de キロ est réservé à l'audit A2-05.
8. **半分** : distincte de 半, sans fusion. **ページ** : un nom, sans `counter`.
9. **13 `counter: null`** : 万, la série en つ, 一人, 二人, 二十歳.
10. **九つ** : lecture ここのつ, décidée grâce à la liste fermée des lectures fautives connues.

**Une précision sur le point 6.** Dans les données, « Un couple (par extension) » est une autre
traduction du sens unique de 二人 (`meaning.alternatives`), avec sa qualification. Ce n'est pas le
champ `nuance` de l'entrée, qui dit « 二人で : à deux ». C'est la forme relue en 5.15b ; la bascule
ne l'a pas changée.

## 3. Assemblage réel

`node tools/reconstruction/run.mjs assemble`, sortie sans erreur :

| ENTRY | Retraits | Écartées | Problèmes de décision | Erreurs lexicales | Attente |
|---|---|---|---|---|---|
| **501** | **31** | **187** | **0** | **0** | **0** |

- **Journal** : 1 025 décisions, D0001 à D1025, toutes validées. Aucune proposition n'est en cours.
- **Avertissements** : 51, soit 4 de plus qu'avant le lot, tous justifiés au journal : trois
  `type-nul` (キログラム, グラム, メートル) et une `categorie-nulle` (一人, sens 2).
- **Reste à décider** : 187 anciennes entrées.

## 4. Le lot 14 en bref

- **29 entrées gardées**, aucune fusion, aucun ajout, aucun tag ; **38 sens** ; 9 entrées à deux sens.
- **Lectures décidées** : trois (九つ, 一人, 二十歳). Les sources figées sont inchangées.
- **Classe** : `nom` décidée pour douze entrées ; `numeral`, mécanique, pour les douze nombres simples.
- **`counter`** : toujours porté par la seule 匹. **`suffix`** : par la seule 半.
- **Liste fermée des lectures fautives connues** : une seule entrée, 九つ.

## 5. Ce qui reste ouvert

- **Audit A2-05** : la catégorie de メートル (espace › dimensions › longueur) et celle du sens
  « kilomètre » de キロ (espace › distance et proximité) diffèrent.
- **Lot « quantité et degré »** : 多い, 少ない, 大勢, たくさん, 全部, 少し, ちょっと, あまり, 一番 et
  quelques adverbes, à examiner au regard de `quantificateur`, `comparatif` et `intensifieur`, qui
  n'ont pas de définition normative.
- **Registre des compteurs** : toujours sans compatibilité pour une durée (時間, lot 13).

## 6. Tests

**Tests d'état, stricts** :
- le lot 14 est entièrement validé : 29 entrées, 72 décisions, 38 sens, aucune fusion ;
- chaque choix arbitré est vérifié : forme des sens de la série en つ et asymétrie de 一つ, type de
  l'âge, classes, nombres simples, « Myriade », « Néant » en nuance, 一人, 二人, unités, 半分, ページ,
  les trois lectures décidées, l'absence de compteur, de suffixe et de tag ;
- l'espace de travail réel s'assemble à 501 / 31 / 187, sans problème, erreur ni attente ;
- aucune proposition n'est en cours ; le journal va de D0001 à D1025 sans trou.

L'essai à blanc en mémoire, devenu identique à l'état réel, est retiré.

**Contrôles** : **446 tests réussis**, 0 échec ; `check-layers` sans violation ; `validate-data` :
0 erreur, 8 avertissements connus ; sources conformes au manifeste.

**12 sabotages, tous attrapés**, chacun vérifié comme modifiant réellement son fichier, puis
restauré à l'octet près : entrée ou décision repassée en `proposed` ; sens d'âge retiré de 七つ ;
sens d'âge ajouté à 一つ ; âge de 二十歳 en `propriete` ; 三つ en classe `numeral` ; « Néant » remis
dans le sens de ゼロ ; « Myriade » retiré ; « seul » rangé dans les relations sociales ; メートル
aligné sur キロ ; compteur ajouté à 二人 ; lecture de 九つ remise à ここなつ.

## 7. Suite

1. Contrôle final du diff, puis commit sur autorisation.
2. Choix du thème du lot 15 parmi les 187 entrées restantes, puis composition de son périmètre ;
   aucune décision avant validation du périmètre.
