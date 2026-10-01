# Ocha v2 — Rapport de l'étape 2 · A2-02 · 3.4 · Registre des tags

**Date** : 2026-10-02
**Référence** : autorisation de 3.4 du 2026-10-02 ; addendum A2, décision D2 ; arbitrage d'A2-02
(décision 9).

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **311 tests, tous verts** (308 avant, 3 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| `data/registries/` | les huit registres d'A2-02, et aucun autre |
| `lieux.json`, vocabulaire | non modifiés |

## 2. Fichiers

| Fichier | Contenu |
|---|---|
| `data/registries/tags.json` | **nouveau** : quatre tags de lieu |
| `docs/conception/registre-des-tags.md` | **nouveau** : nature, critères de création, procédure |
| `docs/conception/00-sommaire.md` | ligne du nouveau document |
| `tools/validate-data.mjs` | `checkTags`, `TAG_KINDS`, `tags.json` dans `REGISTRY_SOURCES` |
| `tests/tools/validate-data.test.js` | tag dans le jeu d'essai, 2 nouveaux tests |
| `tests/registries/decisions.test.js` | 1 nouveau test |

## 3. Les quatre tags, à relire

| `id` | `label` | `description` |
|---|---|---|
| `lieu_konbini` | Utile au konbini | Vocabulaire à proposer pour le lieu « konbini » d'Explorer, quel que soit son domaine sémantique. |
| `lieu_gare` | Utile à la gare | Vocabulaire à proposer pour le lieu « gare » d'Explorer, quel que soit son domaine sémantique. |
| `lieu_restaurant` | Utile au restaurant | Vocabulaire à proposer pour le lieu « restaurant » d'Explorer, quel que soit son domaine sémantique. |
| `lieu_hotel` | Utile à l'hôtel | Vocabulaire à proposer pour le lieu « hôtel » d'Explorer, quel que soit son domaine sémantique. |

Tous ont `kind: "lieu"`.

**Pourquoi ces formulations.**
- Les libellés reprennent la formule de l'addendum A2 (« utile au konbini »).
- Les descriptions disent l'**usage** du tag (sélectionner le vocabulaire d'un lieu d'Explorer),
  et non ce que les mots « sont ».
- « quel que soit son domaine sémantique » rappelle la règle « concept ≠ contexte d'usage »
  (`A2-GLOBAL-v1`, 4.3) : un mot utile au konbini peut relever de l'alimentation, du commerce ou
  de la communication. Le tag ne recrée donc pas une mini-catégorie.
- Aucun exemple de mot n'y figure, pour ne pas suggérer un domaine.

## 4. Contrôles

**`validate-data`** (`checkTags`) :
- racine `{ source, tags }`, `source` égale à `A2-02` ;
- liste non vide ;
- entrées `{ id, label, description, kind }` exactement : un champ de cycle de vie (`retired`…)
  est refusé ;
- identifiants valides, non réservés et uniques ; libellé et description non vides ;
- `kind` parmi `TAG_KINDS`, aujourd'hui `['lieu']` (nouveau code `tag-kind`).

**La nature se lit dans `kind`, jamais dans l'identifiant.** Un test le prouve dans les deux
sens :
- un tag préfixé `lieu_` mais de nature inconnue est refusé ;
- un tag de nature `lieu` sans le préfixe (`pres_de_la_gare`) est accepté.

**`decisions.test.js`** : exactement les quatre tags décidés, dans l'ordre, tous de nature `lieu`,
avec exactement les quatre clés. C'est le contrôle de fidélité aux décisions, séparé de
l'intégrité.

## 5. `registre-des-tags.md`

Il fixe :
- ce qu'est un tag : appartenance transversale ; porteurs ENTRY, SENSE, expression ; plat ;
  contrôlé ;
- la structure et le rôle de `kind`, le préfixe n'ayant qu'une fonction de lisibilité ;
- les quatre critères de création : récurrence dans le corpus, frontière nette, utilité réelle,
  aucun doublon avec un champ dédié ;
- la procédure : proposition justifiée, relecture et décision consignée, inscription et
  validation ;
- l'absence de cycle de vie, défini au premier retrait réel.

Il ne crée aucune règle nouvelle : tout vient de D2, d'`A2-GLOBAL-v1` §12 et des arbitrages
d'A2-02.

## 6. Sabotages

| # | Sabotage | Attrapé par |
|---|---|---|
| T1 | nature déduite du préfixe `lieu_` | test « nature lue dans kind » |
| T2 | nature non contrôlée | tests des tags |
| T3 | description vide acceptée | test des tags |
| T4 | `tags.json` facultatif | test « huit fichiers obligatoires » |
| T5 | clés non contrôlées (champ de cycle de vie toléré) | test des tags |
| D1 | cinquième tag ajouté | `decisions.test.js` |
| D2 | champ `retired` ajouté | `decisions.test.js` et `validate-data` |
| D3 | nature `categorie` | `decisions.test.js` et `validate-data` |
| D4 | identifiant renommé (`konbini`) | `decisions.test.js` |
| D5 | description vide | `decisions.test.js` et `validate-data` |

Aucun trou révélé.
