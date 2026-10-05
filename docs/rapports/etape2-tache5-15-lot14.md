# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.15 · Lot 14 « Nombres, compteurs et mesures » · proposition

**Date** : 2026-10-04
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 29 entrées du lot et ses 72
décisions de journal. Rien n'est validé, rien n'est commité. Les cas sensibles ne sont pas
tranchés : chaque choix ci-dessous est une proposition, avec son alternative quand il y en a une.

**À lire avec** : `reconstruction/a2-04/rapports/lot-14.md` (rapport généré, entrée par entrée).

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| Liste fermée `READING_EXCEPTION_IDS` (`rules.mjs`) | nouvelle, une seule entrée : 九つ |
| Couche mécanique | la lecture d'une entrée de cette liste devient à décider, sans correction |
| `reconstruction/a2-04/lots/lot-14.json` | nouveau : 29 entrées, toutes `proposed`, aucune fusion, aucun ajout |
| `journal.json` | 72 décisions `proposed`, D0954 à D1025 ; les 953 décisions existantes sont identiques |
| Validateur, registres, sources figées | inchangés |

**Sens** : 38, pour 29 entrées (9 entrées à deux sens).

| Nature | Champ | Nombre |
|---|---|---|
| `abandon` | sens | 24 |
| `decision` | sens | 14 |
| `decision` | `counter` | 13 |
| `decision` | classe grammaticale | 12 |
| `correction` | lectures | 3 |
| `type-nul` | type d'un sens (A6) | 3 |
| `decision` | catégorie d'un sens | 2 |
| `categorie-nulle` | catégorie d'un sens (A5) | 1 |

## 2. La liste fermée des lectures fautives connues

**Le problème.** La source donne ここなつ pour 九つ, en kana comme en furigana ; le romaji de la
fiche dit *kokonotsu*. Les deux champs concordent : A8 ne détecte rien, et la lecture restait
mécanique, donc impossible à corriger dans un lot.

**Le mécanisme, arbitré le 2026-10-04.**
- `READING_EXCEPTION_IDS = { n5_v_375: '九つ' }`, dans `rules.mjs`.
- La couche mécanique pose une exception de lectures pour cette entrée : la lecture devient
  **décidable**. Elle ne propose aucune valeur : ni ここなつ, ni une correction.
- La correction est une décision du lot, journalisée (D0977). Les sources figées sont inchangées.
- La liste est distincte de la liste A des lectures spéciales (A8), des graphies fautives et des
  formes usuelles décidées. Ce n'est pas une règle générale : « le romaji fait foi » n'est pas
  retenu.

**Sa portée, testée.** Un test vérifie que la liste ne contient que 九つ, ancrée à son mot, avec le
défaut qui la justifie (kana, furigana et romaji de la source). Un autre vérifie que, sur les 718
sources, elle seule reçoit cette exception, que le reste de la série en つ garde sa lecture
mécanique, et que la source n'est pas modifiée.

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Réel | 472 | 31 | 216 | 0 | 0 | 0 |
| **Essai à blanc**, lot 14 supposé validé, en mémoire | **501** | **31** | **187** | 0 | 0 | 0 |

- **Avertissements à l'essai à blanc** : 51, soit 4 de plus, tous justifiés au journal : trois
  `type-nul` (キログラム, グラム, メートル) et une `categorie-nulle` (一人, sens 2).
- **Tests** : 447 réussis, 0 échec (443 avant ; quatre tests ajoutés : la liste fermée, sa portée,
  l'état du lot 14, l'essai à blanc).
- **Sabotages** : 10 sur 10 attrapés, chacun vérifié comme modifiant réellement son fichier, puis
  restauré à l'octet près : une deuxième lecture dans la liste ; la liste sans effet ; la lecture de
  九つ remise à ここなつ ou retirée ; furigana contradictoires pour 一人 ; compteur ajouté à 一つ ;
  type nul sans justification ; entrée validée par erreur ; lecture décidée pour une entrée
  mécanique ; décision d'un lot clos rouverte.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes.

## 4. Les choix lexicaux, groupe par groupe

### A. Nombres simples (12)

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| 一, 二, 三, 五, 六, 八, 十, 百, 千 | Un … Mille | nombres › nombres › cardinaux | `quantite_valeur` |
| ゼロ, 零 | Zéro (Néant) | idem | `quantite_valeur` |
| 万 | Dix mille (Myriade) | idem | `quantite_valeur` |

- Même traitement que 四, 七 et 九 dans le lot 0. Classe `numeral` et lecture : mécaniques.
- La seconde traduction de chaque fiche (« Le chiffre 1 ») est abandonnée comme redondante.
- **ゼロ et 零** : deux entrées, sans fusion. « Néant » est gardé comme autre traduction. Le registre
  de 零 passe en nuance. La fiche de ゼロ cite 丸 (まる), absent des sources : rien n'est ajouté.
- **万** : « Myriade » gardé comme autre traduction ; `counter: null`.
- Aucune lecture n'est ajoutée (十 n'a que じゅう).

### B. Série en つ (9)

| Mot | Sens 1 | Sens 2 |
|---|---|---|
| 一つ | Un (objet) | — |
| 二つ à 九つ | N (objets) | N ans (âge) |

- **Deux sens pour huit entrées** : la fiche dit « dénombrer exactement N objets … ou pour exprimer
  l'âge de N ans ». **Un seul pour 一つ**, dont la fiche ne mentionne pas l'âge : rien n'est ajouté
  par symétrie.
- **La quantité** : nombres › nombres › cardinaux, `quantite_valeur`.
- **L'âge** : être humain › cycle de vie, `quantite_valeur` (un nombre d'années, non la notion
  d'âge, que 年 porte en `propriete`).
- **Classe** : `nom`, comme les jours du mois (lot 13). La fiche dit « Nom numéral traditionnel ».
- **`counter: null`** : 一つ est un nombre déjà compté, pas un compteur.
- **九つ** : lecture corrigée en ここのつ, furigana ここの sur 九 (D0977).

### C. Personnes et âge (3)

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| 一人 | 1. Une personne · 2. Seul (Tout seul) | nombres › comptage et compteurs › personnes · `null` (A5) | `quantite_valeur` · `etat` |
| 二人 | Deux personnes (Tous les deux, Un couple) | nombres › comptage et compteurs › personnes | `quantite_valeur` |
| 二十歳 | Vingt ans (âge) | être humain › cycle de vie | `quantite_valeur` |

- **一人** : deux sens, selon la fiche (« soit une seule personne, soit le fait d'être seul »).
  Lecture décidée : les furigana de la source ont une balise cassée, leur contenu est repris.
- **二人** : un seul sens ; « à deux » désigne les mêmes deux personnes et passe en nuance.
- **二十歳** : lecture en bloc par nécessité (A8, §3), hors de la liste A.
- Classe `nom` et `counter: null` pour les trois.

### D. Mesures (4) et ページ

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| キログラム | Kilogramme (Kilo) | nombres et quantification | `null` (A6) |
| グラム | Gramme | nombres et quantification | `null` (A6) |
| メートル | Mètre | espace › dimensions › longueur | `null` (A6) |
| 半分 | Moitié (Demi) | nombres › proportions › fraction | `quantite_valeur` |
| ページ | Page | communication et langage › lecture | `objet_artefact` |

- **Unités** : type nul, comme キロ (lot 0). キログラム et キロ restent deux entrées.
- **半分** : même catégorie et même type que le sens « moitié » de 半 (lot 13), sans fusion.
- **ページ** : un nom, rangé comme 本 (lot 06) ; l'ancienne source en faisait un compteur.

## 5. Choix à arbitrer

1. **Série en つ : classe `nom`.** Alternative : `numeral`. La fiche dit « Nom numéral » ; la classe
   `numeral` est aujourd'hui réservée, par liste, aux quinze nombres simples.
2. **Série en つ : deux sens** (objets, âge), et un seul pour 一つ. Alternative : un seul sens
   partout, l'âge en nuance.
3. **Type de l'âge chiffré : `quantite_valeur`** (七つ « sept ans », 二十歳). Alternative :
   `propriete`, comme le sens « âge » de 年.
4. **« Néant » et « Myriade » gardés comme autres traductions.** Alternative : les abandonner,
   « néant » n'étant pas une valeur numérique. Je les ai gardés parce qu'ils viennent de la source
   et qu'aucun autre référent n'y est décrit.
5. **一人, sens « seul » : catégorie nulle**, type `etat`. Alternative : relations sociales ›
   interactions sociales.
6. **二人 : un seul sens**, avec « Un couple » comme traduction. Alternative : abandonner « Un
   couple », donné « par extension ».
7. **メートル dans espace › dimensions › longueur.** Le sens « kilomètre » de キロ (lot 0) est dans
   espace › distance et proximité : les deux unités n'ont pas la même catégorie. Je l'ai signalé
   pour l'audit A2-05 plutôt que d'aligner メートル sur un choix que sa fiche ne soutient pas.
8. **Les unités de masse** rangées au seul niveau 1 (nombres et quantification), comme キロ.
9. **Les 13 `counter: null`** : 万, la série en つ, 一人, 二人, 二十歳. Chaque fiche emploie le mot
   « compteur » ; aucune de ces entrées n'est un mot qui sert à compter une classe d'objets.
10. **ページ** : nom, sans `counter`.

## 6. Cohérence avec les lots validés

- **Nombres** : même catégorie et même type que 四, 七 et 九 (lot 0).
- **`counter`** : toujours porté par la seule 匹. **`suffix`** : par la seule 半.
- **A8** : trois lectures décidées, toutes concordantes. Aucune n'entre dans la liste A.
- **A7** : aucune fonction linguistique dans le lot.
- **Doctrine** : aucun sens, aucune lecture, aucune graphie n'est ajouté par connaissance externe.
  La lecture de 九つ est corrigée sur le témoignage du romaji de sa propre fiche.

## 7. Suite

1. Relecture de la proposition et arbitrage des points du §5.
2. Révision 5.15b si nécessaire, sous les mêmes identifiants.
3. Sur autorisation : validation atomique du lot 14 (statuts seulement).
