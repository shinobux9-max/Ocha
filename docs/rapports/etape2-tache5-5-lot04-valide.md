# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.5 · Lot 04 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 04 (relecture de 5.5b).
**Historique** : 5.5 (composition, puis proposition), 5.5b (降りる sans `lieu_gare`).

---

## 1. L'opération

Statuts seulement, sans aucune modification lexicale :
1. **Entrées** : les 39 entrées de `lots/lot-04.json` (38 gardées, et le retrait de 出ます)
   passent de `proposed` à `validated`.
2. **Journal** : les 62 décisions D0293 à D0354 passent de `proposed` à `validated`. Le journal
   entier est validé : **354 décisions sur 354**.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue en
   5.5b, et D0001 à D0292 sont inchangées.

## 2. Assemblage réel

| Mesure | Attendu | Réel |
|---|---|---|
| ENTRY | 200 | **200** (lots 0 à 04) |
| Identifiants retirés | 30, dont `v_537 → v_642` | **30**, dont `v_537 → v_642` |
| Problèmes de reconstruction | 0 | **0** |
| Erreurs du validateur lexical | 0 | **0** |
| En attente | 0 | **0** |
| Entrées encore à décider | — | 489, toutes « non décidée » |
| Code de sortie de `assemble` | 0 | **0** |

**Avertissements**, non bloquants : `type-nul` × 18, `categorie-nulle` × 14, `kanji-inconnu` × 1
(醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **422 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 04 entièrement proposé » devient « lot 04 entièrement validé ». Il exige
aussi :
- que le seul retrait du lot soit `n5_v_537 → n5_v_642` ;
- que le journal du lot contienne l'`exception-fusion` de `n5_v_537` ;
- que ses 62 décisions soient validées.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données.
- **Z1**, l'`exception-fusion` D0336 repassée en proposition : test d'état et test d'assemblage.
- **Z2**, l'`exception-fusion` retirée de la décision de retrait : la fusion est alors refusée
  (le plus petit numéro devrait survivre). C'est la preuve que l'exception est réellement
  contrôlée, pas seulement documentée.
- **Z3**, une justification `categorie-nulle` de 出る (D0338) retirée : test d'assemblage et test
  du journal.

## 4. Feuille de route

`ROADMAP.md` est mis à jour :
- 5.5 passe à ✅ ;
- 5.6 (lot 05) devient le prochain chantier ;
- l'état chiffré est celui d'après le lot 04 : 200 ENTRY, 30 retraits, 489 entrées à décider.

## 5. Suite

5.6 suit le même protocole :
1. la composition du lot 05, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
