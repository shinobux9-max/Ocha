# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.4 · Lot 03 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 03 (relecture de 5.4b).
**Historique** : 5.4 (composition, puis proposition), 5.4b (お風呂 et ふろ à un sens, エレベーター
sans `lieu_hotel`).

---

## 1. L'opération

Statuts seulement, sans aucune modification lexicale :
1. **Entrées** : les 40 entrées de `lots/lot-03.json` (39 gardées, et le retrait de 掃除する)
   passent de `proposed` à `validated`.
2. **Journal** : les 72 décisions D0221 à D0292 passent de `proposed` à `validated`. Le journal
   entier, soit 292 décisions, est validé.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue en
   5.4b, et D0001 à D0220 sont inchangées.

## 2. Assemblage réel

| Mesure | Attendu | Réel |
|---|---|---|
| ENTRY | 162 | **162** (33 du lot 0, 49 du lot 01, 41 du lot 02, 39 du lot 03) |
| Identifiants retirés | 29 | **29**, dont `v_220 → v_219` (掃除する dans 掃除) |
| Problèmes de reconstruction | 0 | **0** |
| Erreurs du validateur lexical | 0 | **0** |
| En attente | 0 | **0** |
| Entrées encore à décider | — | 528, toutes « non décidée » |
| Code de sortie de `assemble` | 0 | **0** |

**Avertissements**, non bloquants : `type-nul` × 18, `categorie-nulle` × 12, `kanji-inconnu` × 1
(醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **421 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 03 entièrement proposé » devient « lot 03 entièrement validé ». Il exige
aussi que le seul retrait du lot soit `n5_v_220 → n5_v_219`, et que les 72 décisions du lot soient
validées.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données,
pour éviter l'erreur de ciblage du lot 02 :
- **Y1**, la fusion D0288 repassée en proposition : test d'état et test d'assemblage ;
- **Y2**, le retrait de 掃除する repassé en proposition : test d'état ;
- **Y3**, la justification `type-nul` (D0275) retirée de 電気 : test d'assemblage et test du
  journal.

## 4. Feuille de route

`ROADMAP.md` est mis à jour, puisque l'avancement global change :
- 5.4 passe à ✅ ;
- 5.5 (lot 04) devient le prochain chantier ;
- l'état chiffré est celui d'après le lot 03 : 162 ENTRY, 29 retraits, 528 entrées à décider.

## 5. Suite

5.5 suit le même protocole :
1. la composition du lot 04, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
