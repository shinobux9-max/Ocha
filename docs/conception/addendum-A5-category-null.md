# Ocha — Document de conception v1

## Addendum A5 · `category: null` pour un sens lexical

**Statut** : 🔒 validé le 2026-10-02 (arbitrage du lot 0 d'A2-04).

**Objet** : aligner le contrôle I9 de `schema-A2-01.md` sur l'architecture A2. I9 n'admettait
`category: null` qu'avec une fonction linguistique ; A2 est plus large.

---

## 1. Constat

`A2-GLOBAL-v1` (§10) fait de `category: null` une possibilité officielle, « lorsqu'aucune
catégorie sémantique primaire suffisamment pertinente n'existe », et place la « propriété
générale » hors de la hiérarchie thématique (§4.4). Il précise seulement qu'un mot lexical plein
ne doit pas recevoir `null` « simplement parce que son classement est difficile ».

I9 interdisait donc des cas qu'A2 autorise. Le lot 0 de la reconstruction en a fait apparaître
cinq : 良い « bon », きれい « beau », 大変 « difficile », 本当 « vérité », 無くす « perdre ». Pour
chacun, une catégorie thématique serait artificielle.

## 2. Décision

`category: null` est permis lorsqu'aucune catégorie sémantique primaire suffisamment pertinente
n'existe :

- pour une unité principalement **grammaticale ou pragmatique**, une fonction linguistique le
  justifie directement ;
- pour un **sens lexical plein** (aucune fonction linguistique), l'absence de catégorie est une
  **décision humaine explicitement justifiée** dans le journal de reconstruction. Ce n'est jamais
  une valeur par défaut ni un fourre-tout.

## 3. Mise en œuvre

| Où | Règle |
|---|---|
| Reconstruction (`tools/reconstruction/decisions.mjs`) | un sens sans catégorie ni fonction exige une décision de journal de nature `categorie-nulle`, sur ce sens précisément (champ `sens <n> · category`) ; sinon : `categorie-nulle-injustifiee`, et l'entrée n'est pas assemblée |
| Validateur lexical (I9, `tools/lexicon/sense.mjs`) | `category: null` sans fonction n'est plus une erreur mais un **avertissement** (`categorie-nulle`) : les données canoniques ne portent pas le journal ; l'avertissement liste les cas pour l'audit A2-05 |
| I10 | modifié ensuite par l'addendum A6 : `semantic_type: null` est indépendant de `category` |

Après la publication d'A2-04, la justification d'un nouveau sens lexical sans catégorie devra
passer par une procédure équivalente, à définir avec le premier cas réel.

## 4. Textes précisés

| Texte | Précision |
|---|---|
| `schema-A2-01.md`, §7 (`category`) et §12 (I9) | `null` sans fonction linguistique : permis pour un sens lexical sur décision justifiée ; avertissement `categorie-nulle` au lieu d'une erreur |

---

## Décisions de cet addendum

| Point | Décision |
|---|---|
| `category: null` pour un sens lexical sans catégorie pertinente | permis, sur décision humaine justifiée au journal |
| I9 | avertissement `categorie-nulle` pour un sens lexical sans fonction ; la justification est exigée par la reconstruction |
