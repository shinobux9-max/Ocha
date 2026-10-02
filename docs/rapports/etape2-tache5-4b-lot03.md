# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.4b · Lot 03, révision après arbitrage

**Date** : 2026-10-03
**Référence** : arbitrage du lot 03 (お風呂 / ふろ, エレベーター).
**Statut du lot** : toujours **en proposition**. Aucune nouvelle infrastructure, aucune nouvelle
décision de journal ; rien d'autre n'a changé.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **421 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 123 ENTRY, 28 retraits, 0 problème, 0 erreur (lots 0 à 02 seuls validés) |
| D0001 à D0220 | inchangées |
| D0221 à D0292 | identifiants conservés, statut `proposed`, aucune nouvelle décision |

**Essai à blanc** (lot 03 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 162 | **162** |
| Identifiants retirés | 29 | **29** |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Avertissements | inchangés | `type-nul` × 18, `categorie-nulle` × 12, `kanji-inconnu` × 1 |

## 2. お風呂 / ふろ : un seul sens

**Ce que disent les sources.**
- **お風呂** : « bain ; salle de bain ; baignoire », et une nuance qui parle de « la salle de bain
  ou le bain traditionnel japonais ».
- **ふろ** : « bain ; baignoire ; salle de bain », et une nuance qui parle du « bain ou la
  baignoire ».

Aucune ne décrit une action. Dans お風呂に入る, l'action vient de 入る ; le nom désigne le bain.

**Conclusion.** Les sources documentent un seul concept : le bain japonais, c'est-à-dire
l'installation remplie d'eau chaude, et par extension la pièce. « Salle de bain » rend la largeur
référentielle du même mot, comme « jambe » pour 足 ; ce n'est pas un second référent canonique.
Le sens « action » proposé en 5.4 venait de la traduction française « bain » et de la collocation
お風呂に入る, pas d'une distinction sémantique.

| | Avant (5.4) | Après (5.4b) |
|---|---|---|
| Sens | 1. Bain (`action`, hygiène › toilette corporelle) ; 2. Salle de bain (`lieu`) | 1. **Bain**, autre traduction « Salle de bain » (`lieu`, habitat › espaces domestiques › salle de bain et toilettes) |
| Nuance du sens | « お風呂に入る : prendre un bain » | le bain japonais (la baignoire d'eau chaude, et par extension la pièce) ; お風呂に入る, l'action étant portée par 入る |

Le reste ne change pas :
- **les ENTRY** : お風呂 et ふろ restent distinctes, comme décidé ;
- **le tag** : `lieu_hotel` sur お風呂 seule, au niveau de l'ENTRY ;
- **la graphie** 風呂 sur ふろ ;
- **les abandons de « baignoire »** (D0257, D0260) : la baignoire comme objet seul se dit 浴槽,
  et la nuance du sens décrit désormais l'installation.

**Décisions réécrites à leur place** : D0256 (お風呂) et D0259 (ふろ), passées de « deux sens » à
« un seul sens », avec la justification ci-dessus.

## 3. エレベーター : `lieu_gare` seul

`lieu_hotel` est retiré. L'ascenseur est commun à tout immeuble (centre commercial, hôpital,
bureaux…) et n'appartient pas au service hôtelier au même titre que 部屋, ベッド, シャワー ou le
sens « lumière » de 電気. Le justifier par « on le cherche à l'arrivée » reviendrait à la simple
possibilité d'emploi, que le critère du lot 02 exclut.

`lieu_gare` est gardé : dans une gare à plusieurs niveaux, chercher et prendre l'ascenseur relève
du vocabulaire d'orientation et d'accessibilité.

**Décision réécrite à sa place** : D0254, `["lieu_gare", "lieu_hotel"]` → `["lieu_gare"]`.

## 4. Diff décisionnel complet

| Entrée | Changement |
|---|---|
| お風呂 `n5_v_208` | deux sens → un sens « Bain » (autre traduction « Salle de bain »), `lieu` |
| ふろ `n5_v_209` | idem |
| エレベーター `n5_v_202` | tags `lieu_gare`, `lieu_hotel` → `lieu_gare` |

| Décision | Changement |
|---|---|
| D0254 | tags d'エレベーター, justification reformulée selon le critère |
| D0256 | お風呂 : « deux sens » → « un seul sens » |
| D0259 | ふろ : idem |

## 5. Pour valider le lot 03

L'opération sera la même que pour les lots précédents :
1. les 40 entrées (39 gardées et le retrait de 掃除する) et les 72 décisions D0221 à D0292 passent
   en `validated`, en vérifiant que leur contenu reste identique hors statut ;
2. l'assemblage réel doit redonner 162 ENTRY, 29 retraits, 0 erreur, 0 attente ;
3. le test « lot 03 entièrement proposé » devient « lot 03 entièrement validé ».
