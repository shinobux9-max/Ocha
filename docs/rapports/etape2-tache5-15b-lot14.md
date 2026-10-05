# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.15b · Révision du lot 14 : deux traductions

**Date** : 2026-10-04
**Nature** : révision d'une proposition, limitée à trois entrées : ゼロ (`n5_v_365`), 零 (`n5_v_389`)
et 二人 (`n5_v_631`). **Tout reste `proposed`.** Les 26 autres entrées du lot et leurs décisions
sont identiques. Rien n'est commité.

**À lire avec** : `docs/rapports/etape2-tache5-15-lot14.md` (la proposition initiale), dont cette
révision remplace les passages sur ces trois entrées.

---

## 1. Les deux points repris

### 1.1. ゼロ et 零 : « Néant »

**Le défaut relevé.** La proposition gardait « Néant » comme autre traduction du sens numérique.
C'était l'assimiler, sans explication, à une valeur numérique, alors que la fiche ne décrit que « la
valeur zéro » et ne développe pas cette traduction.

**Révision proposée.**
- Le sens numérique ne garde que « Zéro », sans autre traduction.
- « Néant » n'est pas abandonné : il passe dans la nuance de l'entrée, présenté pour ce qu'il est,
  une traduction de la source non développée.

| Entrée | Sens | Nuance |
|---|---|---|
| ゼロ | Zéro | Emprunt ; s'emploie comme 零 (れい) pour dire le chiffre zéro. La source donne aussi la traduction « néant », sans la développer. |
| 零 | Zéro | Surtout dans les contextes formels ou scientifiques, pour les températures et les chiffres après la virgule. La source donne aussi la traduction « néant », sans la développer. |

### 1.2. 二人 : « Un couple »

**Le défaut relevé.** La source donne « Un couple (par extension) ». La proposition avait gardé
« Un couple » en perdant la qualification, ce qui en faisait une traduction équivalente dans tous
les contextes.

**Révision proposée.** La traduction retrouve sa forme source : **« Un couple (par extension) »**.

| Entrée | Sens |
|---|---|
| 二人 | Deux personnes (Tous les deux ; Un couple (par extension)) |

## 2. Les décisions réécrites

Trois décisions sont réécrites à leur place, sous le même identifiant. Seule leur raison change :
leur champ, leur nature, leurs valeurs d'avant et d'après et leur statut sont identiques. Aucune
décision n'est ajoutée ni retirée : le lot garde 72 décisions, D0954 à D1025.

| Décision | Entrée | Objet |
|---|---|---|
| D0955 | ゼロ | sens : « Néant » signalé en nuance, non repris dans le sens numérique |
| D1006 | 零 | sens : idem |
| D1018 | 二人 | sens : « Un couple » avec sa qualification « par extension » |

**Contrôle avant écriture** : dans `lot-14.json`, seules la nuance et les autres traductions de ces
trois entrées changent (la nuance de 二人 est inchangée) ; dans le journal, les 1 022 autres
décisions sont identiques.

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs | Attente |
|---|---|---|---|---|---|---|
| Réel | 472 | 31 | 216 | 0 | 0 | 0 |
| Essai à blanc, lot 14 supposé validé | 501 | 31 | 187 | 0 | 0 | 0 |

- **Tests** : 447 réussis. Le test d'état du lot 14 vérifie désormais que ゼロ et 零 n'ont que
  « Zéro » pour sens, que leur nuance signale « néant », et que 二人 garde « Un couple (par
  extension) ».
- **3 sabotages, tous attrapés**, le lot étant restauré à l'octet près : « Néant » remis dans le
  sens de ゼロ ; mention retirée de la nuance de 零 ; qualification retirée pour 二人.
- Le rapport généré `reconstruction/a2-04/rapports/lot-14.md` est régénéré.

## 4. Reste à arbitrer

Les autres points du rapport initial (§5) ne sont pas modifiés. Le point 4 (« Néant » et
« Myriade ») devient : « Néant » en nuance pour ゼロ et 零 ; « Myriade » gardé comme autre traduction
de 万. Le point 6 (二人) devient : un seul sens, avec « Un couple (par extension) ».
