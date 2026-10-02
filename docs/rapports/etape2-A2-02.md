# Ocha v2 — Rapport final d'A2-02 · Registres

**Date** : 2026-10-02
**Périmètre** : étape 2, tâche 3 (A2-02), sous-tâches 3.1 à 3.5. Rapports intermédiaires :
`etape2-tache3-1-registres.md`, `etape2-tache3-2-categories.md`,
`etape2-tache3-3-classes-compteurs.md`, `etape2-tache3-4-tags.md`.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **315 tests, tous verts** (287 avant A2-02, 28 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés depuis le début de l'étape 2) |
| `node tools/check-layers.mjs` | aucune violation |
| Registres | les huit prévus, 1 011 nœuds ; aucun modifié par l'audit |
| Vocabulaire, `lieux.json` | non modifiés |

A2-02 est terminé. Prochaine tâche : A2-03, validateur du schéma lexical.

## 2. Les huit registres

| Registre | Source | Contenu | Nature |
|---|---|---|---|
| `categories.json` | A2-L3-v1 | 32 / 225 / 585 (56 niveaux 2 sans enfant) | transcription |
| `semantic-types.json` | A2-ST-v1 | 4 familles, 16 types | transcription |
| `dimensions.json` | A2-DIM-v1 | 9 familles, 26 axes, 51 pôles | transcription |
| `relations.json` | A2-REL-v1.1 | 6 familles, 21 relations | transcription |
| `linguistic-functions.json` | A2-LING-v1 | 2 familles, 14 fonctions | transcription |
| `grammatical-classes.json` | A2-02 | 10 classes | décision |
| `counters.json` | A2-02 | 6 compatibilités | décision (notions d'A2-LING-v1) |
| `tags.json` | A2-02 | 4 tags de lieu | décision |

Les cinq snapshots transcrits sont déposés dans `docs/conception/a2/`, identiques octet pour octet
aux originaux. Le document `docs/conception/registre-des-tags.md` fixe les critères et la
procédure des tags.

## 3. Conformité aux décisions d'A2-02

| # | Décision | Constat |
|---|---|---|
| 1 | `data/registries/`, un fichier par registre | les huit fichiers, aucun autre (audit) |
| 2 | `source` puis une structure propre ; identifiants ASCII figés, jamais `v_` ni `g_` ; relations en anglais ; libellés mot pour mot | 1 011 identifiants conformes, aucun préfixe réservé ; libellés vérifiés contre les snapshots ; aucune enveloppe universelle |
| 3 | catégories : identité hiérarchique locale | unicité parmi les frères seulement ; répétitions légales présentes (`mois`, `interpretation`, `radio → radio`…) ; seul `checkCategoryTree` lit l'arbre, sans index global |
| 4 | Probabilité : un seul pôle | `probabilite` → `[probabilite]`, seul axe à un pôle |
| 5 | relations : `family`, `symmetric`, `inverse` | 9 symétriques, 5 paires inverses réciproques, 2 dirigées sans inverse |
| 6 | types terminaux et fonctions transcrits | 16 types ; familles des fonctions = clés du schéma A2-01 |
| 7 | dix classes ; `numeral` ; 匹 = `nom` + `counter` | exactement les dix ; aucune classe compteur |
| 8 | six compatibilités ; identifiants fixés en 3.3 | `small_animals` du snapshot, cinq conventions A2-02 ; chacune adossée à un compteur cité |
| 9 | tags `{ id, label, description, kind }` ; `kind: lieu` ; pas de cycle de vie | quatre tags ; nature lue dans `kind` seulement ; aucun champ de retrait |
| 10 | snapshots dans `docs/conception/a2/` | ST, DIM, REL, LING, L3 ; GLOBAL non déposé (non utilisé) |
| 11 | intégrité dans `validate-data`, conformité du vocabulaire en A2-03 | contrôles d'intégrité des huit registres ; aucun contrôle du vocabulaire contre eux |

## 4. Audit transversal

Fixé dans `tests/registries/audit.test.js`, en complément des contrôles par registre :
- **inventaire** : exactement les huit fichiers, chacun avec sa provenance ; une transcription a
  son snapshot déposé, un registre décidé n'en a pas ;
- **identifiants** : 1 011 nœuds, tous ASCII, aucun préfixé `v_` ni `g_`, libellés non vides et
  sans espaces autour ;
- **espaces de noms lus par le schéma A2-01** (types, axes, relations, classes, compteurs, tags,
  et fonctions par famille) : un identifiant y désigne un seul nœud. Les catégories font
  exception par décision ;
- **aucune dépendance du code au préfixe `lieu_`** (`src/` et `tools/`).

**Constats sans erreur.**
- Un seul identifiant est commun à deux registres : `temps`, catégorie de niveau 1 (Temps) et
  fonction grammaticale (temps). C'est légal, chaque champ du schéma désignant son registre, et
  conforme à la distinction d'A2 entre temps conceptuel et temps grammatical.
- `validate-data` ne refuse pas encore `v_` dans les registres : I18 pour `v_` est prévu en
  A2-03. L'audit le refuse dès maintenant.
- `validate-data` refuse un libellé vide mais accepte des espaces autour ; seul l'audit les
  refuse. Aucune donnée n'est concernée.

**Sabotages de l'audit**, tous attrapés : neuvième registre, identifiant préfixé `v_`, libellé
avec espace final, deux axes de même identifiant dans deux familles, source `A2-02` sur une
transcription, code dépendant du préfixe `lieu_`.

## 5. Bilan des contrôles d'A2-02

| Sous-tâche | Nouveaux tests | Sabotages | Trous révélés |
|---|---|---|---|
| 3.1 registres fermés | 11 | 20 | aucun |
| 3.2 catégories | 6 | 16 | aucun (un sabotage refait, mal construit) |
| 3.3 classes et compteurs | 4 | 13 | aucun (un attendu de test corrigé) |
| 3.4 tags | 3 | 10 | aucun |
| 3.5 audit | 4 | 6 | aucun |

## 6. Ce qui passe à A2-03

- Ajouter `v_` aux préfixes réservés (I18).
- Résoudre une catégorie par son chemin complet (L1, L2, L3), jamais par un identifiant isolé.
- Reconnaître un tag de lieu par `kind` (I14).
- Décider s'il faut refuser dans `validate-data` les espaces autour d'un libellé de registre.
- L'emplacement des registres, que `schema-A2-01.md` laissait à A2-02, est `data/registries/`.

## 7. Ce qui reste à A2-04 (inchangé)

Consignés dans `ETAT-ACTUEL.md`, points ouverts :
- **doublons candidats** à vérifier un par un avant tout retrait d'identifiant (une vingtaine de
  paires : mêmes mots en double, graphies en kana et en kanji, variantes, 大変, キロ). Ce sont des
  candidats, pas des fusions autorisées ;
- **classes grammaticales à décider entrée par entrée** : les 13 `adjectif`, 大きな,
  conjonctions et interjections rangées en `adverbe`, など, 弱く, noms rangés en `adverbe`,
  いくら, いつ, composés numéraux ;
- **anomalies relevées** pour la reconstruction (lectures, `kanji_list`, furigana, graphies,
  exemples).
