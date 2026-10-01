# Ocha v2 — Rapport de l'étape 2 · A2-02 · 3.1 · Registres fermés

**Date** : 2026-10-02
**Référence** : arbitrage d'A2-02 du 2026-10-02 (décisions 1 à 11 ; structure des quatre
registres de 3.1 fixée par l'autorisation de la sous-tâche).

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **298 tests, tous verts** (287 avant, 11 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| Snapshots déposés | identiques, octet pour octet, aux fichiers du Project |
| Fichiers créés dans `data/registries/` | les quatre autorisés, et aucun autre |

## 2. Fichiers

| Fichier | Contenu |
|---|---|
| `docs/conception/a2/A2-ST-v1.md`, `A2-DIM-v1.md`, `A2-REL-v1.1.md`, `A2-LING-v1.md` | copies figées des snapshots, renommées par leur version |
| `docs/conception/a2/README.md` | provenance de chaque copie et registre transcrit |
| `data/registries/semantic-types.json` | 4 familles, 16 types |
| `data/registries/dimensions.json` | 9 familles, 26 axes, 51 pôles |
| `data/registries/relations.json` | 6 familles, 21 relations |
| `data/registries/linguistic-functions.json` | 2 familles, 14 fonctions |
| `tools/validate-data.mjs` | intégrité des quatre registres |
| `tests/tools/validate-data.test.js` | registres minimaux dans le jeu d'essai, 6 nouveaux tests |
| `tests/registries/transcription.test.js` | **nouveau** : 5 tests de transcription |

Les snapshots `A2-L3-v1` et `A2-GLOBAL-v1` ne sont pas déposés : ils ne servent pas à 3.1.

## 3. Transcription

- **Structures** : celles fixées par l'autorisation. Chaque fichier a `source`, puis `families`,
  et dans chaque famille respectivement `types`, `axes` (avec `poles`), `relations` (avec
  `symmetric` et `inverse`) ou `functions`.
- **Libellés** repris mot pour mot. Les libellés de familles sont en majuscules dans les
  snapshots (`IDENTITÉ & COMPARAISON`) et le restent.
- **Identifiants** générés une fois par la règle mécanique (minuscules, accents retirés, `&` et
  apostrophes supprimés, autres caractères remplacés par `_`), puis figés.
- **Exemples** : `objet_artefact`, `quantite_valeur`, `precision_imprecision_ambiguite` (pôles
  `precision` et `imprecision_ambiguite`), `uniforme_non_uniforme`, `pragmatic_discourse`.
- **Relations** : l'identifiant est le nom normatif du snapshot. Le snapshot ne donnant pas
  d'autre libellé, le libellé est ce même nom.
  - Une ligne `a ↔ b` donne deux relations, inverses l'une de l'autre.
  - La symétrie vient de la liste de la section 4 du snapshot : 9 relations symétriques,
    5 paires inverses, 2 relations dirigées sans inverse (`corresponds_to`, `compared_to`).
- **Pôles** : tirés du libellé de l'axe, de part et d'autre de `↔`. « Probabilité » est le seul
  axe à un pôle : `{ id: "probabilite", poles: [{ id: "probabilite" }] }`.
- **Familles des fonctions** : `grammatical` et `pragmatic_discourse`, identiques aux clés de
  `linguistic_functions` dans le schéma A2-01. Un test le vérifie.

## 4. Contrôles

**`validate-data`**, intégrité interne (décision 11) :
- les quatre fichiers sont obligatoires ;
- racine `{ source, families }`, `source` égale à la version attendue (`REGISTRY_SOURCES`) ;
- chaque nœud a exactement ses clés, un identifiant `^[a-z0-9]+(_[a-z0-9]+)*$` non réservé et un
  libellé non vide ;
- unicité des familles, types, axes, relations et fonctions dans tout leur registre, et des pôles
  dans leur axe ;
- un axe a au moins un pôle ;
- `symmetric` booléen ; `inverse` nul ou existant, réciproque, différent de soi ; aucun inverse
  sur une relation symétrique.

Nouveaux codes : `registre-format`, `registre-source`, `registre-id`, `inverse-invalide` ; les
codes existants `id-duplique`, `prefixe-reserve` et `fichier-absent` sont réutilisés.

**Tests de transcription** : ils relisent les snapshots déposés avec un analyseur écrit
indépendamment du script de génération. Ils comparent familles, éléments, libellés et ordre, et
vérifient les comptes relevés à la main (4 / 16, 9 / 26, 6 / 21, 2 / 14), la symétrie, les
paires inverses, l'axe à un pôle, la règle des identifiants et la version de chaque snapshot.

## 5. Sabotages

| # | Sabotage | Attrapé par |
|---|---|---|
| R1 | libellé de type altéré | transcription |
| R2 | axe supprimé | transcription |
| R3 | pôle « improbabilite » inventé | transcription |
| R4 | `opposed_to` rendue non symétrique | transcription |
| R5 | inverse non réciproque | transcription et `validate-data` |
| R6 | identifiant de fonction modifié (`deictic`) | transcription |
| R7 | deux types intervertis | transcription |
| R8 | version de source erronée | transcription et `validate-data` |
| R9 | famille renommée (`grammaticale`) | transcription (concordance avec le schéma) |
| R10 | relation dirigée rendue symétrique | transcription |
| V1 | registres facultatifs | test « fichiers obligatoires » |
| V2 | version de source non contrôlée | test « racine » |
| V3 | forme des identifiants non contrôlée | test « nœuds » |
| V4 | préfixe réservé non contrôlé | test « nœuds » |
| V5 | unicité non contrôlée | test « unicité » |
| V6 | axe sans pôle accepté | test « dimensions » |
| V7 | réciprocité des inverses non contrôlée | test « relations » |
| V8 | inverse accepté sur une relation symétrique | test « relations » |
| V9 | clés en trop acceptées | test « nœuds » |
| V10 | `symmetric` non booléen accepté | test « relations » |

Aucun trou révélé. R4, R6, R7, R9 et R10 ne sont attrapés que par la transcription : ce sont des
écarts au snapshot, pas des incohérences internes, ce qui confirme la séparation entre
intégrité (`validate-data`) et fidélité (tests de transcription).

## 6. Points à signaler

- **Libellés des relations** : le snapshot ne donne aucun libellé français ; le libellé est donc
  le nom normatif. Si un libellé lisible est voulu pour l'interface, ce sera une décision à part,
  hors de la transcription.
- **`REGISTRY_SOURCES`** fige dans le validateur la version de chaque snapshot : une nouvelle
  version d'A2 demandera de mettre à jour ensemble le snapshot déposé, le registre et cette
  constante.
