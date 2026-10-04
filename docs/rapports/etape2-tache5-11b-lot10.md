# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.11b · Lot 10, révision après arbitrage

**Date** : 2026-10-03
**Référence** : arbitrage du lot 10 (libellé du sens temporel de 先).
**Statut du lot** : toujours **en proposition**. Une seule correction rédactionnelle, sans
changement du découpage ; aucune autre décision modifiée, aucune nouvelle décision.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **431 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 356 ENTRY, 31 retraits, 0 problème, 0 erreur (lots 0 à 09 seuls validés) |
| D0001 à D0574 | inchangées |
| D0575 à D0630 | mêmes identifiants, entrées, natures et champs ; statut `proposed` |

**Essai à blanc** (lot 10 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 380 | **380** |
| Identifiants retirés | 31 | **31** |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Entrées restantes après le lot | 308 | **308** |
| Avertissements | inchangés | `type-nul` × 20, `categorie-nulle` × 21, `kanji-inconnu` × 1 |

## 2. Diff décisionnel

| Élément | Avant | Après |
|---|---|---|
| 先, sens 2 | « Auparavant » (autre traduction : « D'abord ») | **« D'abord »** (autre traduction : « Avant ») |
| 先, sens 2, catégorie | temps › chronologie › avant / après | inchangée |
| 先, sens 2, nuance | « 先に : d'abord, avant (les autres)… » | « 先に : d'abord, avant les autres ; お先に : je vous précède. » |
| 先, nuance de l'entrée | aucune | « Ce qui est devant : dans l'espace (plus loin, le bout) ou dans l'ordre du temps (ce qui passe en premier, ce qui est à venir). » |
| D0623 (先, découpage) | « S2 Auparavant, d'abord (temps) » | « S2 D'abord, avant (temps) », avec la raison du libellé précisé |

**Pourquoi.** « Auparavant » évoquait un moment passé, alors que la fiche décrit surtout
l'antériorité ou la priorité dans l'ordre (先に, d'abord, avant les autres). La mention du futur
(« le futur proche ») va dans la nuance générale de l'entrée, sans créer de troisième sens.

**Inchangés** : le sens 1 spatial (« Avant (plus loin) », autres traductions « Bout », « Extrémité »),
la classe `nom` (D0624), et toutes les autres décisions du lot.

## 3. Pour valider le lot 10

L'opération sera la même que pour les lots précédents :
1. les 24 entrées et les 56 décisions D0575 à D0630 passent en `validated`, en vérifiant que leur
   contenu reste identique hors statut ;
2. l'assemblage réel doit redonner 380 ENTRY, 31 retraits, 0 erreur, 0 attente, 308 entrées
   restantes ;
3. le test « lot 10 entièrement proposé » devient « lot 10 entièrement validé ».
