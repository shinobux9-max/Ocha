# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.11 · Lot 10 validé

**Date** : 2026-10-03
**Référence** : autorisation de la validation du lot 10 (5.11b validée pour bascule, archive
d'empreinte SHA-256 `a8442c3d8e80d1eea35fff844911a94fef24ea98e5b453ef513054172fe082d2`).
**Historique** : 5.11 (composition, puis proposition), 5.11b (libellé du sens temporel de 先).

---

## 1. L'opération

Statuts seulement :
1. **Entrées** : les 24 entrées de `lots/lot-10.json` passent de `proposed` à `validated`.
2. **Journal** : les 56 décisions D0575 à D0630 passent de `proposed` à `validated`. Le journal
   entier est validé : **630 décisions sur 630**.
3. **Contrôle** : le contenu, statut mis à part, est vérifié **identique** à la version 5.11b
   relue ; l'opération vérifie elle-même que le sens 2 de 先 est bien « D'abord » avant de basculer.
   D0001 à D0574 sont inchangées.

## 2. Les invariants

| Contrôle | Attendu | Réel |
|---|---|---|
| ENTRY | 380 | **380** |
| Identifiants retirés | 31 | **31** |
| Décisions validées | 630 / 630 | **630 / 630** |
| Entrées restantes | 308 | **308**, toutes « non décidée » |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Code de sortie de `assemble` | 0 | **0** |

**Arbitrages présents dans les données** :
- **先** : classe `nom`, sens « Avant (plus loin) » / « D'abord » (version 5.11b) ;
- **表** : `type-nul`, couvert par D0604, validée ;
- **tags** : aucun dans le lot.

Avertissements, inchangés et non bloquants : `type-nul` × 20, `categorie-nulle` × 21,
`kanji-inconnu` × 1 (醤).

## 3. Vérifications

| Vérification | Résultat |
|---|---|
| `npm test` | **431 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| `data/` | non modifié |

**Test d'état** : « lot 10 entièrement proposé » devient « lot 10 entièrement validé ». Il exige
aussi :
- qu'aucune fusion ne figure dans le lot ;
- **qu'aucun tag de lieu ne figure dans le lot**, puisque les 22 candidats ont été rejetés ;
- que 先 soit en classe `nom` ;
- que ses 56 décisions soient validées.

**Sabotages**, tous attrapés. Chacun a d'abord été vérifié comme modifiant réellement les données.
- **Q1**, `lieu_gare` rétabli sur 東 : test d'état. C'est le garde-fou de l'arbitrage « aucune
  présomption pour les points cardinaux ».
- **Q2**, la décision de classe de 先 (D0624) repassée en proposition : test d'état et test
  d'assemblage.
- **Q3**, la justification `type-nul` de 表 (D0604) retirée : test d'assemblage et test du journal.

## 4. Feuille de route

`ROADMAP.md` est mis à jour :
- 5.11 passe à ✅ ;
- 5.12, le lot 11 des démonstratifs et interrogatifs (こ・そ・あ・ど), devient le prochain
  chantier ;
- l'état chiffré est celui d'après le lot 10 : 380 ENTRY, 31 retraits, 308 entrées à décider,
  630 décisions validées.

**Désormais, chaque archive livrée est identifiée par son empreinte SHA-256**, pour éviter la
confusion survenue entre les archives 5.11a et 5.11b.

## 5. Suite

5.12 suit le même protocole :
1. la composition du lot 11, à valider d'abord ;
2. aucune proposition lexicale avant cette validation.
