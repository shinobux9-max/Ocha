# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.9 · Vérification de `suru_compatible: false`

**Date** : 2026-10-03
**Nature** : vérification de contrat. **Aucune donnée ni aucun statut n'est modifié.**
**Question** : dans notre modèle, `suru_compatible: false` signifie-t-il (1) « compatibilité avec
する non établie par la source », ou (2) « ENTRY établie comme non compatible avec する » ?

---

## 1. Réponse

**Sens (1) : compatibilité non établie.** Aucun texte ne donne à `false` la valeur d'une négation
établie. `false` est la **valeur par défaut** d'une propriété facultative, dont seule la présence
(`true`) est définie. Les décisions D0507 (話) et D0519 (電話) sont donc **conformes** : elles ne
retiennent pas une compatibilité que la source n'établit pas. Elles n'affirment pas une
incompatibilité.

## 2. Les passages qui l'établissent

**`schema-A2-01.md`, §6 (champs de `linguistic`) :**

| Champ | Type | Obligatoire | Règle |
|---|---|---|---|
| `suru_compatible` | booléen | **non, `false`** | **le nom forme un verbe avec する** ; seulement avec `group: nom` ; distinct de `group: suru` (verbe écrit avec する) |

- **La définition porte sur `true`** : « le nom forme un verbe avec する ». Rien n'est dit de
  `false`, sinon qu'il est la **valeur par défaut** d'un champ **non obligatoire**.
- **I6** contraint seulement `true` (« `suru_compatible: true` seulement avec `group: nom` »). Aucun
  invariant ne porte sur `false`.
- **K9** (arbitrages d'A2-01, conversation de la tâche G1) ne fait que distinguer
  `suru_compatible` de `group: suru` : « deux cas différents à ne pas confondre ». Il ne dit rien
  de la valeur `false`.
- **`rules.mjs`** : `suru_compatible` figure dans `HUMAN_FIELDS`. Il n'existe aucune règle
  mécanique, et donc aucune règle qui produirait une négation.

**La pratique validée (lots 0 à 07)** le confirme de façon décisive :

| Noms validés | Nombre | Justifiés au journal |
|---|---|---|
| Total | 244 | — |
| `true` | 6 : 料理, 掃除, 洗濯, 買い物, 練習, 勉強 | **les 6**, chacun par la source |
| `false` | 238 | **1 seul** (作文, D0426) |

Les 237 autres `false` n'ont jamais été décidés : c'est la valeur par défaut. Si `false` valait
« établi comme incompatible », ce seraient 237 négations affirmées sans aucune justification. Parmi
elles figure par exemple テスト, alors que テストする existe. Le corpus validé ne tient donc que si
`false` signifie « non établi ».

## 3. Les trois cas comparés

| Décision | Entrée | Valeur | Ce que dit la source | Conformité |
|---|---|---|---|---|
| D0426 (validée, lot 06) | 作文 | `false` | « Nom » seulement | conforme : compatibilité non établie |
| D0507 (proposée) | 話 | `false` | « nom dérivé du verbe 話す » | conforme : compatibilité non établie |
| D0519 (proposée) | 電話 | `false` | « l'appareil ou la communication » ; l'appel s'y dit 電話をかける | conforme : compatibilité non établie |

Les trois décisions disent « suru_compatible non retenu », avec pour raison l'absence d'emploi en
する dans la source. Aucune n'affirme que le mot ne se combine pas avec する.

## 4. Deux points à signaler

1. **Une précision de formulation.** Pour qu'aucun lecteur ne prenne la raison pour une négation,
   les raisons de D0507 et D0519 pourraient dire explicitement « `false` est la valeur par défaut :
   compatibilité non établie par la source, et non incompatibilité ». Ces décisions sont encore
   `proposed` : elles peuvent être reformulées à leur place si tu le souhaites. D0426 est validée et
   reste telle quelle, puisque sa formulation (« non retenu ») est déjà correcte.
2. **Une conséquence pour la suite d'Ocha.** Un consommateur des données (générateur d'exercices,
   morphologie de l'étape 3) ne doit **jamais** lire `false` comme « ne se combine pas avec する ».
   Il doit le lire comme « aucune compatibilité établie, ne pas générer de forme en する ». Le schéma
   est verrouillé et ne le dit pas : je propose de le consigner comme une précision de lecture dans
   `ETAT-ACTUEL.md`, et de la reprendre si une évolution du schéma est un jour décidée.

## 5. Conclusion

D0507 et D0519 peuvent être validées telles quelles. La reformulation du point 4.1 est facultative.
Aucune correction de modèle n'est nécessaire avant la validation du lot 08.
