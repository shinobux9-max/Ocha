# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.12 · Lot 11 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 11 (5.12b, archive d'empreinte SHA-256
`5eb60a92ae46aa7b31613fb73ceb203364812d1bd4dbff766d0d0d6790f1dfb9`).
**Historique** : 5.12 (composition, puis proposition), vérification de `deictique`, addendum A7 et
révision 5.12b (documentaire).

---

## 1. L'opération

Statuts seulement :
1. **Entrées** : les 34 entrées de `lots/lot-11.json` passent de `proposed` à `validated`.
2. **Journal** : les 104 décisions D0631 à D0734 passent de `proposed` à `validated`. Le journal
   entier est validé : **734 décisions sur 734**.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version 5.12b
   relue. L'opération vérifie elle-même, avant de basculer, que les décisions de fonction citent A7
   (version 5.12b). D0001 à D0630 sont inchangées.

## 2. Les invariants

| Contrôle | Attendu | Réel |
|---|---|---|
| ENTRY | 414 | **414** |
| Identifiants retirés | 31 | **31** |
| Décisions validées | 734 / 734 | **734 / 734** |
| Entrées restantes | 274 | **274**, toutes « non décidée » |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Code de sortie de `assemble` | 0 | **0** |

**Application d'A7, dans les données assemblées** :

| Entrée | Classe | Fonction |
|---|---|---|
| 私, あなた | pronom | `deictique` |
| 自分, 誰か, 皆 | pronom | aucune |
| それ | pronom | `deictique` |
| こんな | determinant | `deictique` |
| どちら (3 sens) | pronom | `interrogatif` × 3 |

Avertissements, inchangés et non bloquants : `categorie-nulle` × 24, `type-nul` × 20,
`kanji-inconnu` × 1 (醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **433 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 11 entièrement proposé » devient « lot 11 entièrement validé ». Il exige
aussi :
- qu'aucune fusion ne figure dans le lot ;
- l'application d'A7 : `deictique` pour 私 et あなた, aucune fonction pour 自分, 誰か et 皆 ;
- les classes décidées : それ, こちら, そちら, どっち, いくつ en `pronom` ; この, その, あの, どの,
  こんな en `determinant` ;
- que ses 104 décisions soient validées.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données.
- **O1**, `deictique` ajouté à 自分 : test d'état. Le validateur ne peut pas le voir, puisque la
  valeur est dans le registre.
- **O2**, こんな repassé en adjectif en な : test d'état. La valeur est structurellement valide.
- **O3**, `deictique` retiré de 私 : test d'état et test d'assemblage.
- **O4**, une justification `type-nul` de これ retirée : test d'assemblage et test du journal.

## 4. Feuille de route

`ROADMAP.md` est mis à jour :
- 5.12 passe à ✅ ;
- 5.13 (lot 12) devient le prochain chantier ;
- l'état chiffré est celui d'après le lot 11 : 414 ENTRY, 31 retraits, 274 entrées à décider,
  734 décisions validées ;
- la réservation A2-05 d'A7 (deixis temporelle) figure dans la liste d'A2-05.

## 5. Suite

5.13 suit le même protocole :
1. la composition du lot 12, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
