# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.6 · Lot 05 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 05 (relecture de 5.6b).
**Historique** : 5.6 (composition, puis proposition), 5.6b (時計 et 荷物 en `category: null`).

---

## 1. L'opération

Statuts seulement, sans aucune modification lexicale :
1. **Entrées** : les 37 entrées de `lots/lot-05.json` passent de `proposed` à `validated`.
2. **Journal** : les 55 décisions D0355 à D0409 passent de `proposed` à `validated`. Le journal
   entier est validé : **409 décisions sur 409**.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue en
   5.6b, et D0001 à D0354 sont inchangées.

## 2. Les invariants demandés

| Contrôle | Attendu | Réel |
|---|---|---|
| ENTRY | 237 | **237** |
| Identifiants retirés | 30 | **30** |
| Décisions validées | 409 / 409 | **409 / 409** |
| D0001 à D0354 | inchangées | **inchangées** |
| `vocab-hors-jlpt.json` | `v_718` et `v_719` | **`v_718` レジ袋, `v_719` ポイントカード**, `level: hors_jlpt` |
| `categorie-nulle` | 16, dont 時計 et 荷物 couverts | **16** ; `v_671_s1` et `v_694_s1` présents, couverts par D0404 et D0408 (`categorie-nulle`, `validated`) |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Code de sortie de `assemble` | 0 | **0** |
| Entrées encore à décider | — | 452, toutes « non décidée » |

Les autres avertissements sont inchangés : `type-nul` × 18, `kanji-inconnu` × 1 (醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **423 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 05 entièrement proposé » devient « lot 05 entièrement validé ». Il exige
aussi :
- qu'aucune fusion ne figure dans le lot ;
- que les deux mots hors JLPT y soient ;
- que ses 55 décisions soient validées.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données.
- **W1**, la justification `categorie-nulle` de 荷物 (D0408) retirée : test d'assemblage et test du
  journal.
- **W2**, la décision de classe de いくら (D0372) repassée en proposition : test d'état et test
  d'assemblage.
- **W3**, un mot hors JLPT repassé en proposition : test d'état.

## 4. Feuille de route

`ROADMAP.md` est mis à jour :
- 5.6 passe à ✅ ;
- 5.7 (lot 06) devient le prochain chantier ;
- l'état chiffré est celui d'après le lot 05 : 237 ENTRY, 30 retraits, 452 entrées à décider,
  409 décisions validées.

## 5. Suite

5.7 suit le même protocole :
1. la composition du lot 06, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
