# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.5b · Lot 04, révision après arbitrage

**Date** : 2026-10-03
**Référence** : arbitrage du lot 04 (降りる).
**Statut du lot** : toujours **en proposition**. Une seule correction ; aucune autre décision
modifiée, aucune nouvelle décision.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **422 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 162 ENTRY, 29 retraits, 0 problème, 0 erreur (lots 0 à 03 seuls validés) |
| D0001 à D0292 | inchangées |
| D0293 à D0354 | identifiants conservés (même entrée, même nature, même champ), statut `proposed` |

**Essai à blanc** (lot 04 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 200 | **200** |
| Identifiants retirés | 30 | **30** |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Avertissements | inchangés | `type-nul` × 18, `categorie-nulle` × 14, `kanji-inconnu` × 1 |

## 2. Diff décisionnel

| Élément | Avant | Après |
|---|---|---|
| 降りる `n5_v_63`, tags | `["lieu_gare"]` | `[]` |
| D0347 (`decision`, `tags`) | candidats `[]` → `["lieu_gare"]`, au motif qu'on descend du train à la gare | candidats `[]` → `[]` : aucun tag |

**Nouvelle justification de D0347.** 降りる est un verbe général :
- descente ou sortie d'un véhicule (電車, バス, タクシー, 車) ;
- descente d'un lieu en hauteur (階段, 山).

Pouvoir dire 電車を降りる à la gare ne suffit pas : le mot n'appartient pas au vocabulaire d'action
propre à la gare (critère du lot 02).

**Une précaution d'identifiant.** Sans tag, 降りる n'a plus d'écart avec ses candidats (aucun), et
le générateur n'aurait plus émis de décision de tags. D0347 aurait alors disparu, et toutes les
décisions suivantes auraient changé d'identifiant. Elle est donc émise explicitement à sa place,
pour consigner l'absence de tag et sa raison. Le contrôle le confirme : D0293 à D0354 gardent la
même entrée, la même nature et le même champ.

## 3. Confirmé sans changement

- 出ます fusionné dans 出る en conservant `v_642` (D0335, D0336) ; les trois sens de 出る et leurs
  deux `categorie-nulle` (D0337 à D0339) ;
- 図書館 parmi les espaces publics collectifs (D0310) ;
- tout le reste du lot.

## 4. Pour valider le lot 04

L'opération sera la même que pour les lots précédents :
1. les 39 entrées (38 gardées, et le retrait de 出ます) et les 62 décisions D0293 à D0354 passent
   en `validated`, en vérifiant que leur contenu reste identique hors statut ;
2. l'assemblage réel doit redonner 200 ENTRY, 30 retraits, 0 erreur, 0 attente ;
3. le test « lot 04 entièrement proposé » devient « lot 04 entièrement validé ».
