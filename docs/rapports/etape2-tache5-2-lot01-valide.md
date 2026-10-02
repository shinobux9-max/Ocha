# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.2 · Lot 01 validé

**Date** : 2026-10-02
**Référence** : autorisation de la validation du lot 01 (relecture de 5.2b).
**Historique** : 5.2 (composition, puis proposition), 5.2b (révision après arbitrage).

---

## 1. L'opération

Statuts seulement :
1. **Entrées** : les 49 entrées de `lots/lot-01.json` passent de `proposed` à `validated`.
2. **Journal** : les 66 décisions du lot 01, de D0075 à D0140, passent de `proposed` à
   `validated`. Le journal entier, soit 140 décisions, est désormais validé.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue en
   5.2b, et les 74 décisions du lot 0 sont intactes.

## 2. Assemblage réel

| Mesure | Attendu | Réel |
|---|---|---|
| ENTRY | 82 | **82** (33 du lot 0, 49 du lot 01) |
| Identifiants retirés | 28 | **28** |
| Problèmes de reconstruction | 0 | **0** |
| Erreurs du validateur lexical | 0 | **0** |
| En attente | 0 | **0** |
| Entrées encore à décider | — | 609, toutes « non décidée » (718 − 60 − 49) |
| Code de sortie de `assemble` | 0 | **0** |

**Avertissements**, inchangés et non bloquants : `type-nul` × 17, `categorie-nulle` × 10,
`kanji-inconnu` × 1 (醤). Ils ne sont pas « corrigés » pour obtenir zéro avertissement.

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **419 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 01 entièrement proposé » devient « lot 01 entièrement validé ». Il exige
49 entrées validées, aucun ajout, et ses 66 décisions de journal validées. Avec le test du lot 0 et
le test permanent d'assemblage réel, l'espace de travail doit reproduire ces comptes.

**Sabotages**, tous attrapés :
- **W1**, une décision du lot 01 repassée en proposition : test d'état et test d'assemblage ;
- **W2**, une entrée repassée en proposition : test d'état ;
- **W3**, la justification `categorie-nulle` retirée de 人 : test d'assemblage et test du journal.

## 4. Suite

5.3 suit la même méthode :
1. la composition du lot thématique suivant, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
