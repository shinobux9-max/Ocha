# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.9 · Lot 08 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 08 (5.9a validé sans modification, après la
vérification de `suru_compatible: false`).

---

## 1. L'opération

Statuts seulement :
1. **Entrées** : les 29 entrées de `lots/lot-08.json` passent de `proposed` à `validated`.
2. **Journal** : les 36 décisions D0504 à D0539 passent de `proposed` à `validated`. Le journal
   entier est validé : **539 décisions sur 539**.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue, et
   D0001 à D0503 sont inchangées. D0507 et D0519 sont conservées telles quelles.

## 2. Les invariants

| Contrôle | Attendu | Réel |
|---|---|---|
| ENTRY | 337 | **337** |
| Identifiants retirés | 30 | **30** |
| Décisions validées | 539 / 539 | **539 / 539** |
| Entrées restantes | 352 | **352**, toutes « non décidée » |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Code de sortie de `assemble` | 0 | **0** |
| Compteurs du corpus | 匹 seul | **匹 seul** |

**Arbitrages présents dans les données** :
- **`suru_compatible`** : 話 `false`, 電話 `false`, 質問 `true` ;
- **nombre de sens** :
  - かける : 3 ;
  - 聞く, 話, 呼ぶ, 電話, テープ : 2 ;
  - テレビ : 1.

Le `categorie-nulle` de かける « accrocher » (`v_164_s3`) est couvert par D0521, validée.

Avertissements, non bloquants : `categorie-nulle` × 21, `type-nul` × 19, `kanji-inconnu` × 1 (醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **429 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 08 entièrement proposé » devient « lot 08 entièrement validé ». Il exige
aussi :
- qu'aucune fusion ne figure dans le lot ;
- que **seul 質問** y ait `suru_compatible: true` ;
- que ses 36 décisions soient validées.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données.
- **S1**, 電話 passé à `suru_compatible: true` sans source : test d'état. Comme pour les compteurs,
  le validateur lexical ne peut pas le voir, puisque `true` sur un nom est structurellement valide.
  C'est le test d'état qui protège l'arbitrage.
- **S2**, la décision `suru_compatible` de 質問 (D0511) repassée en proposition : test d'état et
  test d'assemblage.
- **S3**, la justification `categorie-nulle` de かける (D0521) retirée : test d'assemblage et test
  du journal.

## 4. Feuille de route

`ROADMAP.md` est mis à jour :
- 5.9 passe à ✅ ;
- 5.10 (lot 09) devient le prochain chantier ;
- l'état chiffré est celui d'après le lot 08 : 337 ENTRY, 30 retraits, 352 entrées à décider,
  539 décisions validées.

`ETAT-ACTUEL.md` consigne la clôture, et la lecture de `suru_compatible` confirmée.

## 5. Suite

5.10 suit le même protocole :
1. la composition du lot 09, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
