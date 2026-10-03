# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.8 · Lot 07 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 07 (5.8a validé sans révision).

---

## 1. L'opération

Statuts seulement :
1. **Entrées** : les 34 entrées de `lots/lot-07.json` passent de `proposed` à `validated`.
2. **Journal** : les 48 décisions D0456 à D0503 passent de `proposed` à `validated`. Le journal
   entier est validé : **503 décisions sur 503**.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue, et
   D0001 à D0455 sont inchangées.

## 2. Les invariants demandés

| Contrôle | Attendu | Réel |
|---|---|---|
| ENTRY | 308 | **308** |
| Identifiants retirés | 30 | **30** |
| Décisions validées | 503 / 503 | **503 / 503** |
| Entrées restantes | 381 | **381**, toutes « non décidée » |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Code de sortie de `assemble` | 0 | **0** |
| 匹, premier `counter` du corpus | `{ counter_for: ["small_animals"] }` | **seule ENTRY du corpus entier à porter un `counter`** (`v_648`) |

**Couverture des décisions A5 et A6** : chaque avertissement nouveau du lot est couvert par sa
décision, désormais validée.

| Sens | Avertissement | Décision |
|---|---|---|
| 曇る « s'embuer » (`v_80_s2`) | `categorie-nulle` | D0466, validée |
| 吹く « souffler (de l'air) » (`v_266_s2`) | `categorie-nulle` | D0472, validée |
| 冷たい « froid (attitude) » (`v_265_s2`) | `categorie-nulle` | D0481, validée |
| 匹 (`v_648_s1`) | `type-nul` | D0502, validée |

Avertissements, non bloquants : `type-nul` × 19, `categorie-nulle` × 20, `kanji-inconnu` × 1 (醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **428 tests, tous verts** (427 avant, 1 nouveau) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 07 entièrement proposé » devient « lot 07 entièrement validé ». Il exige
aussi qu'aucune fusion ne figure dans le lot, et que 匹 porte `counter_for: small_animals`.

**Nouveau test permanent, transversal à tous les lots** : seule `n5_v_648` (匹) porte un
`counter`. Il prolonge la conclusion de l'audit 5.7-C (le champ est réservé aux ENTRY qui sont
elles-mêmes des compteurs) à tout le corpus, présent et à venir. Ajouter un compteur exigera de
modifier ce test, donc un arbitrage explicite.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données.
- **T1**, le `counter` de 匹 retiré : test d'état et test des compteurs.
- **T2**, un `counter` ajouté à 犬, nom compté du lot 07 : test des compteurs.
- **T3**, un `counter` ajouté à ナイフ, **dans le lot 02 déjà validé** : test des compteurs. Le
  garde-fou protège aussi les lots antérieurs.
- **T4**, la justification `type-nul` de 匹 (D0502) retirée : test d'assemblage et test du journal.

## 4. Feuille de route

`ROADMAP.md` est mis à jour :
- 5.8 passe à ✅ ;
- 5.9 (lot 08) devient le prochain chantier ;
- l'état chiffré est celui d'après le lot 07 : 308 ENTRY, 30 retraits, 381 entrées à décider,
  503 décisions validées, 1 compteur.

## 5. Suite

5.9 suit le même protocole :
1. la composition du lot 08, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
