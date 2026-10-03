# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.7 · Lot 06 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 06, après l'audit 5.7-C du champ `counter`.
**Historique** : 5.7 (composition, puis proposition, avec la liste fermée `USUAL_FORM_IDS`),
5.7-C (audit des compteurs, sans modification de données).

---

## 1. L'opération

Statuts seulement :
1. **Entrées** : les 37 entrées de `lots/lot-06.json` passent de `proposed` à `validated`.
2. **Journal** : les 46 décisions D0410 à D0455 passent de `proposed` à `validated`. Le journal
   entier est validé : **455 décisions sur 455**.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version relue, et
   D0001 à D0409 sont inchangées.

Aucune donnée lexicale ni l'infrastructure `USUAL_FORM_IDS` (`n5_v_604` seul) n'ont été modifiées.

## 2. Les invariants demandés

| Contrôle | Attendu | Réel |
|---|---|---|
| ENTRY | 274 | **274** |
| Identifiants retirés | 30 | **30** |
| Décisions validées | 455 / 455 | **455 / 455** |
| D0001 à D0409 | inchangées | **inchangées** |
| Entrées du lot 06 validées | 37 | **37** |
| `n5_v_604` | `word: ひらがな`, graphie 平仮名 | **ひらがな**, graphie **平仮名** |
| `counter` de 本, 辞書, 鉛筆, 字 | `null` | **`null`** pour les quatre |
| `categorie-nulle` de 意味 (sens 2) | justifié | **`v_513_s2`**, couvert par D0445 (`categorie-nulle`, `validated`) |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Code de sortie de `assemble` | 0 | **0** |
| Entrées encore à décider | 415 | **415**, toutes « non décidée » |

Avertissements, non bloquants : `categorie-nulle` × 17, `type-nul` × 18, `kanji-inconnu` × 1 (醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **426 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 06 entièrement proposé » devient « lot 06 entièrement validé ». Il exige
aussi :
- qu'aucune fusion ne figure dans le lot ;
- que la forme usuelle de `n5_v_604` soit ひらがな ;
- **qu'aucune entrée du lot ne porte de `counter`**, puisque ce sont des noms comptés (audit 5.7-C) ;
- que ses 46 décisions soient validées.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données.
- **V1**, la décision de forme usuelle D0440 repassée en proposition : test d'état et test
  d'assemblage.
- **V2**, un `counter` ajouté à 本 (`books_volumes`) : test d'état. Le validateur lexical ne peut
  pas le voir, car un `counter_for` valide sur un nom est structurellement correct. Le garde-fou
  ajouté au test d'état était donc nécessaire pour protéger la conclusion de 5.7-C.
- **V3**, la justification `categorie-nulle` de 意味 (D0445) retirée : test d'assemblage et test du
  journal.

## 4. Feuille de route

`ROADMAP.md` est mis à jour :
- 5.7 passe à ✅ ;
- 5.8 (lot 07) devient le prochain chantier ;
- l'état chiffré est celui d'après le lot 06 : 274 ENTRY, 30 retraits, 415 entrées à décider,
  455 décisions validées.

## 5. Suite

5.8 suit le même protocole :
1. la composition du lot 07, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
