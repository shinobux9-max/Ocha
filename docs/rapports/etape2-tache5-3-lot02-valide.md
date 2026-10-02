# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.3 · Lot 02 validé

**Date** : 2026-10-02
**Référence** : autorisation de la validation du lot 02 (relecture de 5.3b).
**Historique** : 5.3 (composition, puis proposition), 5.3b (révision : critère des tags de lieu,
カップ, カレー).

---

## 1. L'opération

Statuts seulement :
1. **Entrées** : les 41 entrées de `lots/lot-02.json` passent de `proposed` à `validated`.
2. **Journal** : les 80 décisions D0141 à D0220 passent de `proposed` à `validated`. Le journal
   entier, soit 220 décisions, est validé.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue en
   5.3b, et D0001 à D0140 sont intactes.

## 2. Assemblage réel

| Mesure | Attendu | Réel |
|---|---|---|
| ENTRY | 123 | **123** (33 du lot 0, 49 du lot 01, 41 du lot 02) |
| Identifiants retirés | 28 | **28** |
| Problèmes de reconstruction | 0 | **0** |
| Erreurs du validateur lexical | 0 | **0** |
| En attente | 0 | **0** |
| Entrées encore à décider | — | 568, toutes « non décidée » |
| Code de sortie de `assemble` | 0 | **0** |

**Avertissements**, inchangés et non bloquants : `type-nul` × 17, `categorie-nulle` × 12,
`kanji-inconnu` × 1 (醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **420 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 02 entièrement proposé » devient « lot 02 entièrement validé », avec ses 80
décisions de journal validées.

**Sabotages**, tous attrapés :
- **X1**, une décision du lot 02 repassée en proposition : test d'état et test d'assemblage ;
- **X2**, une entrée repassée en proposition : test d'état ;
- **X3**, la justification `categorie-nulle` retirée de まずい : test d'assemblage et test du
  journal.

Ma première version de X3 retirait D0199, qui n'est pas citée par まずい : elle ne modifiait rien,
et aucun test n'a donc échoué. Refaite avec le bon identifiant (D0197), elle est attrapée. Ce
n'était pas un trou de test, mais un sabotage mal ciblé.

## 4. Points ouverts conservés

- `ufs`, identifiant du registre des catégories ;
- la convention des lectures en katakana, à trancher globalement avant 5.17 ;
- les tags de lieu des repas du lot 0, pour l'audit A2-05.

## 5. Suite

5.4 suit le même protocole :
1. la composition du lot suivant, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
