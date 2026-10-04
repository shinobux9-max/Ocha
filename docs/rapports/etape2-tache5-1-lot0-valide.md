# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.1 · Lot 0 « identité » validé

**Date** : 2026-10-02
**Référence** : autorisation du passage intégral du lot 0 en `validated` (relecture de 5.1c).
**Historique** : 5.1 (proposition), 5.1b (journal à statut, forme usuelle, 大変, A5), 5.1c (A6).

---

## 1. L'opération

Une seule opération, sans autre changement :
1. **Entrées** : les 60 décisions d'ENTRY de `lots/lot-00.json` passent de `proposed` à
   `validated`.
2. **Journal** : les 74 décisions de `journal.json` passent de `proposed` à `validated`.
3. **Contrôle** : le contenu des décisions, statut mis à part, est vérifié **identique** à la
   version relue en 5.1c, entrées comme journal.

## 2. Assemblage réel

`node tools/reconstruction/run.mjs assemble`, puis le validateur lexical :

| Mesure | Attendu | Réel |
|---|---|---|
| ENTRY assemblées | 33 | **33** |
| Identifiants retirés | 28 | **28** (`v_717` et les 27 fusions) |
| Problèmes de reconstruction | 0 | **0** |
| Erreurs du validateur lexical | 0 | **0** |
| En attente | 0 | **0** |
| Entrées écartées | — | 658, toutes « non décidée » : les lots à venir (718 − 60) |
| Code de sortie de `assemble` | 0 | **0** |

L'assemblage réel reproduit exactement l'essai à blanc de 5.1c.

**Avertissements, tous intentionnels** :
- `categorie-nulle` × 5 (addendum A5) : 良い « bon », きれい « beau », 大変 « difficile »,
  本当 « vérité », 無くす « perdre » ;
- `type-nul` × 3 (addendum A6) : お腹, キロ « kilogramme », キロ « kilomètre » ;
- `kanji-inconnu` × 1 : 醤 (醤油). L'anomalie est réelle, non bloquante, et consignée pour A2-05
  ou la tâche de données sur les kanji.

何 et 大変 « très », dont le type nul est justifié par une fonction linguistique, n'avertissent pas,
comme convenu.

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **418 tests, tous verts** (417 avant, 1 nouveau) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes au manifeste |
| `data/` | non modifié : rien n'est publié avant 5.17 |

## 4. Tests

- **Le test de statut change** : « le lot 0 est entièrement proposé » devient « le lot 0 est
  entièrement validé ». Il exige 60 entrées validées, aucun ajout, et le journal du lot 0
  entièrement validé.
- **Nouveau test permanent** : l'espace de travail réel s'assemble sans problème de décision,
  sans erreur du validateur lexical et sans attente. Le nombre d'ENTRY doit être égal au nombre
  de décisions validées qui gardent une entrée, et le nombre d'identifiants retirés à
  `1 + retraits validés`. Chaque lot thématique devra le passer.

**Sabotages des données validées**, tous attrapés :

| # | Sabotage | Attrapé par |
|---|---|---|
| V1 | une décision du journal repassée en proposition | test de statut et test d'assemblage réel |
| V2 | justification `type-nul` retirée de お腹 | test d'assemblage réel et test du journal |
| V3 | une entrée repassée en proposition | test de statut |

## 5. Ce que le lot 0 a établi

**Données** :
- 27 fusions et 33 entrées décidées ;
- 9 formes usuelles choisies indépendamment de l'identifiant survivant ;
- 6 lectures à barre oblique structurées ;
- des corrections factuelles (おととし, 可愛い) et 13 abandons d'information journalisés.

**Conception**, à partir des cas réels :
- **addendum A5** : `category: null` pour un sens lexical, sur décision justifiée ;
- **addendum A6** : `semantic_type: null`, indépendant de `category` ;
- **reconstruction** : un journal à statut propre, et une forme usuelle décidable après fusion.

## 6. Pour 5.2

- **Lots thématiques** : ils suivront le même cycle (proposition, relecture sur le rapport généré,
  révision, validation), avec le test d'assemblage réel comme garde-fou permanent.
- **Composition de 5.2** : je la proposerai avant d'écrire la moindre décision.
