# Snapshots de l'architecture sémantique A2

Copies figées des snapshots officiels A2, déposées pour que la transcription des registres de
`data/registries/` soit vérifiable par les tests. Ce sont des **références**, pas des données
lues par l'application. **Ne pas modifier** : toute évolution d'A2 passe par un nouveau snapshot
versionné (`A2-GLOBAL-v1`, §14).

| Fichier | Version | Fichier d'origine | Registre transcrit |
|---|---|---|---|
| `A2-L3-v1.md` | A2-L3-v1 | `Ocha_Snapshot_Architecture_Semantique_A2_L3_v1.md` | `data/registries/categories.json` |
| `A2-ST-v1.md` | A2-ST-v1 | `Ocha_Snapshot_Architecture_Semantique_A2_ST_v1.md` | `data/registries/semantic-types.json` |
| `A2-DIM-v1.md` | A2-DIM-v1 | `Ocha_Snapshot_Architecture_Semantique_A2_DIM_v1.md` | `data/registries/dimensions.json` |
| `A2-REL-v1.1.md` | A2-REL-v1.1 | `Ocha_Snapshot_Architecture_Semantique_A2_REL_v1_1.md` | `data/registries/relations.json` |
| `A2-LING-v1.md` | A2-LING-v1 | `Ocha_Snapshot_Architecture_Semantique_A2_LING_v1.md` | `data/registries/linguistic-functions.json` |
| `A2-GLOBAL-v1.md` | A2-GLOBAL-v1 | `Ocha_Snapshot_Architecture_Semantique_A2_GLOBAL_v1.md` | aucun : snapshot global, qui consolide les cinq autres sans les remplacer |

Copies octet pour octet des fichiers d'origine, déposées le 2026-10-02 : ST, DIM, REL et LING
avec A2-02 · 3.1, L3 avec A2-02 · 3.2. Le snapshot `A2-GLOBAL-v1` a été déposé le 2026-10-07, par
l'utilisateur, avant l'audit A2-05 ; pour une définition détaillée ou une frontière fine, il renvoie
lui-même au snapshot spécialisé (`A2-GLOBAL-v1`, §1).

**Noms des fichiers.** La colonne « Fichier d'origine » donne le nom sous lequel chaque fichier a
été déposé. Les snapshots se désignent entre eux sous d'autres noms, qui renvoient aux mêmes
versions :

| Nom cité par les snapshots | Fichier du dépôt |
|---|---|
| `Ocha_Snapshot_Officiel_A2_Level1-3_v1.md` | `A2-L3-v1.md` |
| `Ocha_Snapshot_Officiel_A2_Semantic_Types_v1.md` | `A2-ST-v1.md` |
| `Ocha_Snapshot_Officiel_A2_Dimensions_v1.md` | `A2-DIM-v1.md` |
| `Ocha_Snapshot_Officiel_A2_Relations_v1.1.md` | `A2-REL-v1.1.md` |
| `Ocha_Snapshot_Officiel_A2_Linguistic_v1.md` | `A2-LING-v1.md` |

`A2-LING-v1` cite encore `Ocha_Snapshot_Officiel_A2_Relations_v1.md` : la version active des
relations est `A2-REL-v1.1`, qui remplace `A2-REL-v1` (`A2-GLOBAL-v1`, §1).

Les documents qui retracent la conception d'A2 sont à part, dans `docs/conception/legacy/a2/` : ils
ne sont pas normatifs.
