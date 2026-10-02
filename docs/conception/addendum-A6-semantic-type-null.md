# Ocha — Document de conception v1

## Addendum A6 · `semantic_type: null`

**Statut** : 🔒 validé le 2026-10-02 (arbitrage du lot 0 d'A2-04).

**Objet** : corriger le contrôle I10 de `schema-A2-01.md`, qui supposait que `A2-ST-v1` fournit un
type terminal à tout sens dès qu'il a une catégorie. Le snapshot A2 n'est pas modifié : seul le
schéma Ocha l'est.

---

## 1. Constat

`A2-ST-v1` définit le type sémantique comme la sorte d'entité ou de concept désignée, et exclut
explicitement certaines notions de cette couche :
- la partie et la totalité ne sont pas des types sémantiques ;
- la mesure non plus : une unité, un instrument, une propriété mesurable ou une opération de mesure
  ne sont « pas automatiquement » des `quantite_valeur`.

Le lot 0 de la reconstruction en a fait apparaître trois cas :
- お腹, une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui ;
- キロ au sens « kilogramme » ;
- キロ au sens « kilomètre ».

Chacun a une catégorie pertinente, mais aucun type terminal ne lui convient. I10 n'admettait
pourtant `semantic_type: null` que si `category` était `null`.

## 2. Décision

- `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit
  correctement la nature du sens.
- `semantic_type: null` est **indépendant** de `category: null` : une catégorie peut être
  pertinente sans qu'aucun type ne le soit.
- Ce n'est jamais une échappatoire : comme pour A5, il faut distinguer l'absence légitime d'une
  classification non terminée. Tout `semantic_type: null` est une **décision humaine justifiée**,
  sens par sens.

## 3. Mise en œuvre

| Où | Règle |
|---|---|
| Reconstruction (`tools/reconstruction/decisions.mjs`) | tout sens à `semantic_type: null` exige une décision de journal de nature `type-nul`, sur ce sens précisément (champ `sens <n> · semantic_type`) ; sinon : `type-nul-injustifie`, et l'entrée n'est pas assemblée |
| Validateur lexical (I10, `tools/lexicon/sense.mjs`) | `semantic_type` : type terminal du registre ou `null`, sans condition sur `category` ; `null` sans fonction linguistique : **avertissement** `type-nul` pour l'audit A2-05 (les données canoniques ne portent pas le journal) |

## 4. Textes modifiés

| Texte | Modification |
|---|---|
| `schema-A2-01.md`, §7 (`semantic_type`) | type terminal ou `null` sur décision explicite, indépendant de `category` |
| `schema-A2-01.md`, §12 (I10) | `semantic_type` dans son registre ou `null` ; avertissement `type-nul` |
| `A2-ST-v1` | **aucune** : l'ontologie n'est pas modifiée |

---

## Décisions de cet addendum

| Point | Décision |
|---|---|
| `semantic_type: null` | permis quand aucun type terminal ne convient, sur décision justifiée par sens |
| lien avec `category` | aucun : les deux absences sont indépendantes |
| I10 | erreur seulement pour un type inconnu ou non terminal ; `null` donne l'avertissement `type-nul` |
