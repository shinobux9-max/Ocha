# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.10 · Lot 09 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 09 (5.10b validée pour bascule).
**Historique** : 5.10 (composition, puis proposition), 5.10b (釣り en `suru_compatible: false`, 国 à
un sens).

---

## 1. L'opération

Statuts seulement :
1. **Entrées** : les 20 entrées de `lots/lot-09.json` (19 gardées, et le retrait de 散歩する)
   passent de `proposed` à `validated`.
2. **Journal** : les 35 décisions D0540 à D0574 passent de `proposed` à `validated`. Le journal
   entier est validé : **574 décisions sur 574**.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue en
   5.10b, et D0001 à D0539 sont inchangées.

## 2. Les invariants

| Contrôle | Attendu | Réel |
|---|---|---|
| ENTRY | 356 | **356** |
| Identifiants retirés | 31, dont `v_194 → v_193` | **31**, dont `v_194 → v_193` |
| Décisions validées | 574 / 574 | **574 / 574** |
| Entrées restantes | 332 | **332**, toutes « non décidée » |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Code de sortie de `assemble` | 0 | **0** |

**Arbitrages présents dans les données** :
- `suru_compatible` : 散歩 `true`, 釣り `false`, スポーツ `false` ;
- 国 : un sens ;
- 匹 reste le seul compteur.

Avertissements, inchangés et non bloquants : `categorie-nulle` × 21, `type-nul` × 19,
`kanji-inconnu` × 1 (醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **430 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 09 entièrement proposé » devient « lot 09 entièrement validé ». Il exige
aussi :
- que le seul retrait du lot soit `n5_v_194 → n5_v_193` ;
- que `suru_compatible: true` ne vise que 散歩, 旅行 et 帰国 dans le lot ;
- que ses 35 décisions soient validées.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données.
- **R1**, 釣り repassé à `suru_compatible: true` : test d'état. Le validateur ne peut pas le voir,
  puisque `true` sur un nom est structurellement valide.
- **R2**, la fusion D0556 repassée en proposition : test d'état et test d'assemblage.
- **R3**, le retrait de 散歩する repassé en proposition : test d'état.

## 4. Feuille de route

`ROADMAP.md` est mis à jour :
- 5.10 passe à ✅ ;
- 5.11 (lot 10) devient le prochain chantier ;
- l'état chiffré est celui d'après le lot 09 : 356 ENTRY, 31 retraits, 332 entrées à décider,
  574 décisions validées.

`ETAT-ACTUEL.md` consigne la clôture, et précise que la distinction Nする / Nをする est une
clarification opérationnelle d'A2-04, pas une affirmation linguistique.

## 5. Suite

5.11 suit le même protocole :
1. la composition du lot 10, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
