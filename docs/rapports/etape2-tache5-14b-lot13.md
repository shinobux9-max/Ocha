# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.14b · Révision du lot 13 : 後

**Date** : 2026-10-04
**Nature** : révision d'une proposition, limitée à une entrée, 後 (`n5_v_663`). **Tout reste
`proposed`.** Les 26 autres entrées du lot et leurs décisions sont identiques. Rien n'est commité.

**À lire avec** : `docs/rapports/etape2-tache5-14-lot13.md` (la proposition initiale), dont cette
révision remplace les passages sur 後.

---

## 1. Les deux points repris

### 1.1. « Plus tard » et l'addendum A7

**L'incohérence relevée.** La proposition gardait « Plus tard » dans les traductions du sens
temporel, tout en refusant la fonction `deictique` au motif que cet emploi restait « en nuance ».
Les deux ne tenaient pas ensemble : un emploi qui figure dans le sens n'est pas seulement en nuance.

**Ce que dit la fiche.** Elle donne « Plus tard » parmi les traductions, et précise que あと est
« souvent utilisé avec la particule *de* (あとで) pour signifier plus tard ».

**Révision proposée : le sens temporel porte `deictique`.**
- L'emploi « plus tard » est repéré par rapport au moment où l'on parle ; la fiche le dit fréquent
  et en fait une traduction : il fait partie intégrante du sens tel qu'il est modélisé (A7, §4). Il
  n'est ni marginal, ni une simple traduction contextuelle.
- L'autre emploi, la postériorité par rapport à un repère quelconque (un événement, une action),
  n'est pas déictique. Il est décrit dans la nuance.
- La référence est A7, §4 (sens à plusieurs emplois). Le §3.2 traite de l'anaphore et ne s'applique
  pas ici ; la première version de ce rapport le citait à tort.
- Nuance du sens : « Ce qui vient après un événement ou une action. あとで : plus tard, par rapport
  au moment où l'on parle. »

**L'autre solution cohérente**, non retenue : retirer « Plus tard » des traductions, délimiter le
sens à la seule postériorité relative, et le laisser sans fonction. Elle écarterait du sens un
emploi que la fiche donne comme traduction et dit fréquent.

### 1.2. « Le reste »

**Le défaut relevé.** La proposition abandonnait « Le reste » parce que la description de la fiche
ne le mentionne pas. Or la traduction figure bien dans la source : l'absence d'une phrase à son
sujet ne prouve pas qu'elle doive être écartée.

**Révision proposée : « Le reste » devient un troisième sens, candidat.**
- C'est un autre référent (ce qui reste d'un tout), distinct d'un moment et d'une position : ce ne
  peut pas être une traduction des deux autres sens.
- Catégorie et type sont tirés du seul libellé, sans information extérieure : nombres et
  quantification › totalité et partie › reste ; `concept_abstrait`.
- Aucune nuance, aucun exemple, aucune particule n'est ajouté.

**À arbitrer** : garder ce sens, ou l'abandonner. Dans les deux cas, rien n'est ajouté à ce que dit
la source.

## 2. 後 après révision

| # | Sens | Catégorie | Type | Fonction | Particules |
|---|---|---|---|---|---|
| 1 | **Après** (Plus tard) | temps › chronologie › avant, après | `concept_abstrait` | `deictique` | で, に |
| 2 | **Derrière** | espace › position › devant, derrière | `lieu` | | |
| 3 | **Le reste** (sens candidat) | nombres › totalité et partie › reste | `concept_abstrait` | | |

## 3. Les décisions réécrites

Trois décisions sont réécrites à leur place, sous le même identifiant. Aucune n'est ajoutée ni
retirée : le lot garde 109 décisions, D0845 à D0953.

| Décision | Avant | Après |
|---|---|---|
| D0951 | `decision` · `senses` : deux sens | `decision` · `senses` : trois sens |
| D0952 | `decision` · fonction du sens 1 : aucune | `decision` · fonction du sens 1 : `deictique` |
| D0953 | `abandon` · `senses` : « Le reste » | `decision` · catégorie du sens 3 (sens candidat) |

D0953 change de nature et de champ : c'est l'effet de la révision, l'abandon devenant un sens.

**Contrôle avant écriture** : dans `lot-13.json`, seuls les sens de 後 changent, et ses citations
sont identiques ; dans le journal, les 950 autres décisions sont identiques, et les trois réécrites
gardent leur identifiant, leur place, leur statut, leur lot et leur entrée.

## 4. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs | Attente |
|---|---|---|---|---|---|---|
| Réel | 445 | 31 | 243 | 0 | 0 | 0 |
| Essai à blanc, lot 13 supposé validé | 472 | 31 | 216 | 0 | 0 | 0 |

- Le lot compte maintenant **42 sens** (41 avant), dont **un seul déictique**, le sens temporel de
  後. Les décomptes du rapport initial (41 sens ; « aucune fonction `deictique` » ; 12 abandons)
  deviennent : 42 sens, 1 fonction `deictique`, 11 abandons.
- **Tests** : 444 réussis. Le test d'état du lot 13 vérifie désormais les trois sens de 後, sa
  fonction, qu'il est le seul sens déictique du lot, et qu'aucune traduction n'est à la fois gardée
  dans un sens et abandonnée au journal.
- **3 sabotages, tous attrapés**, le lot étant restauré à l'octet près : 後 sans `deictique` avec
  « Plus tard » ; « Le reste » retiré ; `deictique` ajouté à 日曜日.
- Le rapport généré `reconstruction/a2-04/rapports/lot-13.md` est régénéré.

## 5. Une conséquence hors du lot, signalée

Le sens temporel de **前** (lot 10, validé) est sans fonction, alors que sa nuance cite 三年前, « il
y a trois ans », emploi repéré par rapport au moment où l'on parle. Le lot 10 a été validé avant que
l'axe du temps d'A7 soit appliqué. Je n'y touche pas : c'est un cas pour l'audit rétroactif de la
deixis temporelle, déjà réservé à A2-05, comme おととし et 近く. Il est ajouté à la liste des cas à
auditer, avec le sens temporel de 先.

## 6. Reste à arbitrer

Les autres points du rapport initial (§5) ne sont pas modifiés et attendent l'arbitrage. Pour 後 :
1. la fonction `deictique` sur le sens temporel, ou le retrait de « Plus tard » ;
2. le sens candidat « Le reste », ou son abandon.
