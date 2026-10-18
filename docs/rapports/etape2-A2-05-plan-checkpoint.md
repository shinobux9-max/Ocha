# Étape 2 · A2-05 — plan de checkpoint documentaire (proposition)

**Date** : 2026-10-18
**Statut** : **plan, sans exécution.** Écrit par `a2-05-travail/plan-checkpoint.mjs`, en lecture seule sur git : **rien n'est indexé, committé ni poussé.** La validation du plan, l'autorisation de commit et l'autorisation de push sont trois accords distincts, à donner séparément, après relecture. Modèle : le checkpoint du 2026-10-12 (`3756fe3`), documentaire, indexé par chemins explicites.

## 1. État de git au moment du plan

| Élément | Valeur |
|---|---|
| Branche | `ocha-v2` |
| HEAD | `558f15064b22b463f98173417ee1c01c07f2f13a` |
| `origin/ocha-v2` | `558f15064b22b463f98173417ee1c01c07f2f13a` (identique à HEAD) |
| Index | vide |
| Fichiers suivis modifiés | 5 |
| Fichiers non suivis (hors `chatgpt-relecture/`) | 426 |
| Changements dans `data/`, `reconstruction/`, `tools/`, `tests/` ou l'application | aucun |

**`.gitignore`** ne couvre ni `a2-05-travail/`, ni `chatgpt-relecture/`, ni les archives : l'indexation doit se faire **par chemins explicites**, jamais par `git add .` ni `git add -A`.

## 2. Fichiers suivis modifiés (inclus dans les deux options)

| Fichier | Lignes ajoutées | Lignes retirées |
|---|---|---|
| `CLAUDE.md` | 19 | 14 |
| `ETAT-ACTUEL.md` | 118 | 19 |
| `ROADMAP.md` | 62 | 14 |
| `docs/rapports/etape2-A2-05-bilan-volet2.md` | 481 | 1 |
| `docs/relecture/reprise-A2-05.md` | 58 | 4 |

## 3. Fichiers non suivis, par groupe

| Groupe | Fichiers | Taille |
|---|---|---|
| `a2-05-travail/INVENTAIRE-SCRIPTS.md` | 1 | 38,2 Ko |
| `a2-05-travail/audit-cat-t1.mjs` | 1 | 28,0 Ko |
| `a2-05-travail/audit-cat-t2.json` | 1 | 30,0 Ko |
| `a2-05-travail/audit-cat-t2.mjs` | 1 | 17,4 Ko |
| `a2-05-travail/audit-cat-t3.json` | 1 | 23,3 Ko |
| `a2-05-travail/audit-cat-t3.mjs` | 1 | 24,5 Ko |
| `a2-05-travail/audit-cat-t4.json` | 1 | 18,5 Ko |
| `a2-05-travail/audit-cat-t4.mjs` | 1 | 21,8 Ko |
| `a2-05-travail/audit-cat-t5.json` | 1 | 26,6 Ko |
| `a2-05-travail/audit-cat-t5.mjs` | 1 | 26,6 Ko |
| `a2-05-travail/audit-cat-t6.json` | 1 | 17,1 Ko |
| `a2-05-travail/audit-cat-t6.mjs` | 1 | 31,4 Ko |
| `a2-05-travail/audit-type-nul.mjs` | 1 | 34,0 Ko |
| `a2-05-travail/audit-v1-lot1.mjs` | 1 | 32,1 Ko |
| `a2-05-travail/audit-v1-lot2-1bis.mjs` | 1 | 17,4 Ko |
| `a2-05-travail/audit-v1-lot2-t1.mjs` | 1 | 37,6 Ko |
| `a2-05-travail/audit-v1-lot2-t2-lot00.mjs` | 1 | 17,1 Ko |
| `a2-05-travail/audit-v1-lot2-t2-lot01.mjs` | 1 | 32,3 Ko |
| `a2-05-travail/audit-v1-lot2-t3-lot02.mjs` | 1 | 27,3 Ko |
| `a2-05-travail/audit-v1-lot2-t3-lot03.mjs` | 1 | 22,9 Ko |
| `a2-05-travail/audit-v1-lot2-t4-lot05.mjs` | 1 | 24,7 Ko |
| `a2-05-travail/audit-v1-lot2-t4-lot06.mjs` | 1 | 23,5 Ko |
| `a2-05-travail/audit-v1-lot2-t5-5a.mjs` | 1 | 16,9 Ko |
| `a2-05-travail/audit-v1-lot2-t5-5b.mjs` | 1 | 17,6 Ko |
| `a2-05-travail/audit-v1-lot2-t5-5c.mjs` | 1 | 21,8 Ko |
| `a2-05-travail/audit-v1-lot2-t6-6a.mjs` | 1 | 30,4 Ko |
| `a2-05-travail/audit-v1-lot2-t6-6b.mjs` | 1 | 28,4 Ko |
| `a2-05-travail/audit-v1-lot2-t6-6c.mjs` | 1 | 29,3 Ko |
| `a2-05-travail/audit-v1-lot2-t6-6d.mjs` | 1 | 15,2 Ko |
| `a2-05-travail/audit-v1-lot2-t6-6e.mjs` | 1 | 18,8 Ko |
| `a2-05-travail/audit-v1-lot2-t7-7a.mjs` | 1 | 20,5 Ko |
| `a2-05-travail/audit-v1-lot2-t7-7b.mjs` | 1 | 17,5 Ko |
| `a2-05-travail/audit-v1-lot2-t7-7c.mjs` | 1 | 21,6 Ko |
| `a2-05-travail/audit-v1-lot2-t7-7d.mjs` | 1 | 17,2 Ko |
| `a2-05-travail/audit-v1-lot2-t7-7e.mjs` | 1 | 31,8 Ko |
| `a2-05-travail/audit-v1-lot2-t8-8a.mjs` | 1 | 19,3 Ko |
| `a2-05-travail/audit-v1-lot2-t8-8b.mjs` | 1 | 22,3 Ko |
| `a2-05-travail/audit-v1-lot2-t8-8c.mjs` | 1 | 24,1 Ko |
| `a2-05-travail/audit-v1-lot2-t8-8d.mjs` | 1 | 27,8 Ko |
| `a2-05-travail/audit-v1-lot2-t8-8e.mjs` | 1 | 23,5 Ko |
| `a2-05-travail/audit-v1-lot2-t8-8f.mjs` | 1 | 17,2 Ko |
| `a2-05-travail/audit-v1-lot3-A1.mjs` | 1 | 30,8 Ko |
| `a2-05-travail/audit-v1-lot3-A2.mjs` | 1 | 26,9 Ko |
| `a2-05-travail/audit-v1-lot3-A3.mjs` | 1 | 27,7 Ko |
| `a2-05-travail/audit-v1-lot3-A4.mjs` | 1 | 16,2 Ko |
| `a2-05-travail/audit-v1-lot3-A5.mjs` | 1 | 20,1 Ko |
| `a2-05-travail/audit-v1-lot3-A6.mjs` | 1 | 30,4 Ko |
| `a2-05-travail/audit-v1-lot3-A7.mjs` | 1 | 39,8 Ko |
| `a2-05-travail/audit-v1-lot3-B1.mjs` | 1 | 29,3 Ko |
| `a2-05-travail/audit-v1-lot3-B2.mjs` | 1 | 20,8 Ko |
| `a2-05-travail/audit-v1-lot3-B3.mjs` | 1 | 22,8 Ko |
| `a2-05-travail/audit-v1-lot3-B4.mjs` | 1 | 27,6 Ko |
| `a2-05-travail/audit-v1-lot3-B5.mjs` | 1 | 25,0 Ko |
| `a2-05-travail/audit-v1-lot3-B6.mjs` | 1 | 24,9 Ko |
| `a2-05-travail/audit-v1-lot3-B7.mjs` | 1 | 36,4 Ko |
| `a2-05-travail/audit-v1-lot3-B8.mjs` | 1 | 33,4 Ko |
| `a2-05-travail/audit-v1-lot3-B9.mjs` | 1 | 32,7 Ko |
| `a2-05-travail/bilan-provenance.mjs` | 1 | 36,8 Ko |
| `a2-05-travail/blocA-bilan-et-B1-perimetre.mjs` | 1 | 42,6 Ko |
| `a2-05-travail/checkpoint-chemins-option-A.txt` | 1 | 2,9 Ko |
| `a2-05-travail/checkpoint-chemins-option-B.txt` | 1 | 7,0 Ko |
| `a2-05-travail/controle-pilotage.md` | 1 | 28,5 Ko |
| `a2-05-travail/couverture-lot3.json` | 1 | 28,1 Ko |
| `a2-05-travail/couverture-lot3.mjs` | 1 | 4,3 Ko |
| `a2-05-travail/criblage-a205.mjs` | 1 | 28,7 Ko |
| `a2-05-travail/criblage-provenance.mjs` | 1 | 4,0 Ko |
| `a2-05-travail/criblage-v1/` | 1 | 289,4 Ko |
| `a2-05-travail/criblage-v2/` | 1 | 319,2 Ko |
| `a2-05-travail/criblage/` | 1 | 362,2 Ko |
| `a2-05-travail/empreintes-lot3.mjs` | 1 | 3,4 Ko |
| `a2-05-travail/empreintes-rapports-arbitres.json` | 1 | 3,4 Ko |
| `a2-05-travail/essais-outillage-v2.mjs` | 1 | 15,9 Ko |
| `a2-05-travail/inventaire-v1-lot3-restants.mjs` | 1 | 11,2 Ko |
| `a2-05-travail/lot3-commun-v2.mjs` | 1 | 24,1 Ko |
| `a2-05-travail/lot3-commun.mjs` | 1 | 17,2 Ko |
| `a2-05-travail/note-export-checkpoint-cloture-entete.md` | 1 | 5,2 Ko |
| `a2-05-travail/note-export-checkpoint-cloture.md` | 1 | 248,1 Ko |
| `a2-05-travail/note-export-checkpoint-entete.md` | 1 | 5,9 Ko |
| `a2-05-travail/note-export-checkpoint-prepare.md` | 1 | 192,4 Ko |
| `a2-05-travail/note-export-checkpoint.md` | 1 | 166,2 Ko |
| `a2-05-travail/note-export-lot3-A1-E5-entete.md` | 1 | 10,0 Ko |
| `a2-05-travail/note-export-lot3-A1-E5.md` | 1 | 364,3 Ko |
| `a2-05-travail/note-export-lot3-A2-E5-entete.md` | 1 | 9,7 Ko |
| `a2-05-travail/note-export-lot3-A2-E5.md` | 1 | 344,5 Ko |
| `a2-05-travail/note-export-lot3-A3-E5v2-entete.md` | 1 | 10,6 Ko |
| `a2-05-travail/note-export-lot3-A3-E5v2.md` | 1 | 350,1 Ko |
| `a2-05-travail/note-export-lot3-A4-entete.md` | 1 | 11,3 Ko |
| `a2-05-travail/note-export-lot3-A4.md` | 1 | 366,8 Ko |
| `a2-05-travail/note-export-lot3-A5-entete.md` | 1 | 13,4 Ko |
| `a2-05-travail/note-export-lot3-A5.md` | 1 | 367,4 Ko |
| `a2-05-travail/note-export-lot3-A6-entete.md` | 1 | 13,6 Ko |
| `a2-05-travail/note-export-lot3-A6.md` | 1 | 397,2 Ko |
| `a2-05-travail/note-export-lot3-A7-entete.md` | 1 | 15,5 Ko |
| `a2-05-travail/note-export-lot3-A7.md` | 1 | 416,8 Ko |
| `a2-05-travail/note-export-lot3-B1-entete.md` | 1 | 8,1 Ko |
| `a2-05-travail/note-export-lot3-B1.md` | 1 | 374,3 Ko |
| `a2-05-travail/note-export-lot3-B2-entete.md` | 1 | 7,7 Ko |
| `a2-05-travail/note-export-lot3-B2-perimetre-entete.md` | 1 | 7,2 Ko |
| `a2-05-travail/note-export-lot3-B2-perimetre.md` | 1 | 336,8 Ko |
| `a2-05-travail/note-export-lot3-B2.md` | 1 | 314,1 Ko |
| `a2-05-travail/note-export-lot3-B3-entete.md` | 1 | 5,7 Ko |
| `a2-05-travail/note-export-lot3-B3-perimetre-entete.md` | 1 | 6,0 Ko |
| `a2-05-travail/note-export-lot3-B3-perimetre.md` | 1 | 273,7 Ko |
| `a2-05-travail/note-export-lot3-B3.md` | 1 | 296,7 Ko |
| `a2-05-travail/note-export-lot3-B4-entete.md` | 1 | 7,8 Ko |
| `a2-05-travail/note-export-lot3-B4-perimetre-entete.md` | 1 | 8,1 Ko |
| `a2-05-travail/note-export-lot3-B4-perimetre.md` | 1 | 277,8 Ko |
| `a2-05-travail/note-export-lot3-B4.md` | 1 | 324,2 Ko |
| `a2-05-travail/note-export-lot3-B5-entete.md` | 1 | 6,1 Ko |
| `a2-05-travail/note-export-lot3-B5-perimetre-entete.md` | 1 | 6,0 Ko |
| `a2-05-travail/note-export-lot3-B5-perimetre.md` | 1 | 283,2 Ko |
| `a2-05-travail/note-export-lot3-B5.md` | 1 | 310,9 Ko |
| `a2-05-travail/note-export-lot3-B6-entete.md` | 1 | 6,9 Ko |
| `a2-05-travail/note-export-lot3-B6-perimetre-entete.md` | 1 | 5,7 Ko |
| `a2-05-travail/note-export-lot3-B6-perimetre.md` | 1 | 286,7 Ko |
| `a2-05-travail/note-export-lot3-B6.md` | 1 | 325,0 Ko |
| `a2-05-travail/note-export-lot3-B7-entete.md` | 1 | 8,5 Ko |
| `a2-05-travail/note-export-lot3-B7-perimetre-entete.md` | 1 | 6,6 Ko |
| `a2-05-travail/note-export-lot3-B7-perimetre.md` | 1 | 297,9 Ko |
| `a2-05-travail/note-export-lot3-B7.md` | 1 | 343,0 Ko |
| `a2-05-travail/note-export-lot3-B8-entete.md` | 1 | 8,6 Ko |
| `a2-05-travail/note-export-lot3-B8-perimetre-entete.md` | 1 | 7,7 Ko |
| `a2-05-travail/note-export-lot3-B8-perimetre.md` | 1 | 306,6 Ko |
| `a2-05-travail/note-export-lot3-B8.md` | 1 | 339,3 Ko |
| `a2-05-travail/note-export-lot3-B9-entete.md` | 1 | 8,1 Ko |
| `a2-05-travail/note-export-lot3-B9-etude-methode-entete.md` | 1 | 7,1 Ko |
| `a2-05-travail/note-export-lot3-B9-etude-methode.md` | 1 | 345,9 Ko |
| `a2-05-travail/note-export-lot3-B9-perimetre-entete.md` | 1 | 8,6 Ko |
| `a2-05-travail/note-export-lot3-B9-perimetre.md` | 1 | 311,1 Ko |
| `a2-05-travail/note-export-lot3-B9.md` | 1 | 349,6 Ko |
| `a2-05-travail/note-export-lot3-blocA-bilan-B1-perimetre-entete.md` | 1 | 13,5 Ko |
| `a2-05-travail/note-export-lot3-blocA-bilan-B1-perimetre.md` | 1 | 398,4 Ko |
| `a2-05-travail/note-export-outillage-v2-entete.md` | 1 | 4,6 Ko |
| `a2-05-travail/note-export-outillage-v2.md` | 1 | 79,2 Ko |
| `a2-05-travail/note-export-provenance-cloture-lot3-perimetre-entete.md` | 1 | 9,8 Ko |
| `a2-05-travail/note-export-provenance-cloture-lot3-perimetre.md` | 1 | 351,8 Ko |
| `a2-05-travail/note-export-t2.md` | 1 | 86,5 Ko |
| `a2-05-travail/note-export-t3.md` | 1 | 106,8 Ko |
| `a2-05-travail/note-export-t4.md` | 1 | 94,2 Ko |
| `a2-05-travail/note-export-t5.md` | 1 | 127,5 Ko |
| `a2-05-travail/note-export-t6-cloture-t7-perimetre-entete.md` | 1 | 8,8 Ko |
| `a2-05-travail/note-export-t6-cloture-t7-perimetre.md` | 1 | 265,9 Ko |
| `a2-05-travail/note-export-t6.md` | 1 | 111,9 Ko |
| `a2-05-travail/note-export-t7-cloture-t8-perimetre-entete.md` | 1 | 10,5 Ko |
| `a2-05-travail/note-export-t7-cloture-t8-perimetre.md` | 1 | 323,2 Ko |
| `a2-05-travail/note-export-t8-cloture-bilan-entete.md` | 1 | 10,8 Ko |
| `a2-05-travail/note-export-t8-cloture-bilan.md` | 1 | 373,1 Ko |
| `a2-05-travail/note-export-v1-lot1-entete.md` | 1 | 5,1 Ko |
| `a2-05-travail/note-export-v1-lot1-perimetre.md` | 1 | 87,7 Ko |
| `a2-05-travail/note-export-v1-lot1.md` | 1 | 111,6 Ko |
| `a2-05-travail/note-export-v1-lot2-1bis-entete.md` | 1 | 6,0 Ko |
| `a2-05-travail/note-export-v1-lot2-1bis.md` | 1 | 212,6 Ko |
| `a2-05-travail/note-export-v1-lot2-perimetre-entete.md` | 1 | 4,6 Ko |
| `a2-05-travail/note-export-v1-lot2-perimetre.md` | 1 | 151,8 Ko |
| `a2-05-travail/note-export-v1-lot2-t1-entete.md` | 1 | 5,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t1.md` | 1 | 137,7 Ko |
| `a2-05-travail/note-export-v1-lot2-t2-lot00-entete.md` | 1 | 4,8 Ko |
| `a2-05-travail/note-export-v1-lot2-t2-lot00.md` | 1 | 151,1 Ko |
| `a2-05-travail/note-export-v1-lot2-t2-lot01-entete.md` | 1 | 6,3 Ko |
| `a2-05-travail/note-export-v1-lot2-t2-lot01.md` | 1 | 214,0 Ko |
| `a2-05-travail/note-export-v1-lot2-t2-perimetre-entete.md` | 1 | 6,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t2-perimetre.md` | 1 | 190,5 Ko |
| `a2-05-travail/note-export-v1-lot2-t3-lot02-entete.md` | 1 | 5,7 Ko |
| `a2-05-travail/note-export-v1-lot2-t3-lot02.md` | 1 | 158,1 Ko |
| `a2-05-travail/note-export-v1-lot2-t3-lot03-entete.md` | 1 | 5,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t3-lot03.md` | 1 | 216,7 Ko |
| `a2-05-travail/note-export-v1-lot2-t3-perimetre-entete.md` | 1 | 4,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t3-perimetre.md` | 1 | 203,8 Ko |
| `a2-05-travail/note-export-v1-lot2-t4-lot05-entete.md` | 1 | 5,5 Ko |
| `a2-05-travail/note-export-v1-lot2-t4-lot05.md` | 1 | 141,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t4-lot06-entete.md` | 1 | 5,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t4-lot06.md` | 1 | 205,7 Ko |
| `a2-05-travail/note-export-v1-lot2-t4-perimetre-entete.md` | 1 | 5,1 Ko |
| `a2-05-travail/note-export-v1-lot2-t4-perimetre.md` | 1 | 175,3 Ko |
| `a2-05-travail/note-export-v1-lot2-t5-5a-entete.md` | 1 | 4,4 Ko |
| `a2-05-travail/note-export-v1-lot2-t5-5a.md` | 1 | 133,2 Ko |
| `a2-05-travail/note-export-v1-lot2-t5-5b-entete.md` | 1 | 4,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t5-5b.md` | 1 | 184,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t5-5c-entete.md` | 1 | 5,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t5-5c.md` | 1 | 198,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t5-perimetre-entete.md` | 1 | 4,5 Ko |
| `a2-05-travail/note-export-v1-lot2-t5-perimetre.md` | 1 | 186,3 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6a-entete.md` | 1 | 6,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6a.md` | 1 | 188,0 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6b-entete.md` | 1 | 7,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6b.md` | 1 | 250,0 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6c-entete.md` | 1 | 8,2 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6c.md` | 1 | 259,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6d-entete.md` | 1 | 8,0 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6d.md` | 1 | 264,1 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6e-entete.md` | 1 | 8,0 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-6e.md` | 1 | 278,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-perimetre-entete.md` | 1 | 10,2 Ko |
| `a2-05-travail/note-export-v1-lot2-t6-perimetre.md` | 1 | 210,5 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7a-entete.md` | 1 | 7,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7a.md` | 1 | 266,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7b-entete.md` | 1 | 7,8 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7b.md` | 1 | 280,8 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7c-entete.md` | 1 | 8,3 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7c.md` | 1 | 280,7 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7d-entete.md` | 1 | 7,5 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7d.md` | 1 | 287,5 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7e-entete.md` | 1 | 8,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t7-7e.md` | 1 | 316,3 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8a-entete.md` | 1 | 7,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8a.md` | 1 | 298,5 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8b-entete.md` | 1 | 7,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8b.md` | 1 | 316,3 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8c-entete.md` | 1 | 7,9 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8c.md` | 1 | 336,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8d-entete.md` | 1 | 8,2 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8d.md` | 1 | 358,3 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8e-entete.md` | 1 | 8,6 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8e.md` | 1 | 366,8 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8f-entete.md` | 1 | 7,3 Ko |
| `a2-05-travail/note-export-v1-lot2-t8-8f.md` | 1 | 352,0 Ko |
| `a2-05-travail/perimetre-t1-t8.mjs` | 1 | 10,0 Ko |
| `a2-05-travail/perimetre-v1-lot2-t2.mjs` | 1 | 35,7 Ko |
| `a2-05-travail/perimetre-v1-lot2-t3.mjs` | 1 | 14,6 Ko |
| `a2-05-travail/perimetre-v1-lot2-t4.mjs` | 1 | 18,1 Ko |
| `a2-05-travail/perimetre-v1-lot2-t5.mjs` | 1 | 15,3 Ko |
| `a2-05-travail/perimetre-v1-lot2-t6.mjs` | 1 | 26,4 Ko |
| `a2-05-travail/perimetre-v1-lot2-t7.mjs` | 1 | 27,2 Ko |
| `a2-05-travail/perimetre-v1-lot2-t8.mjs` | 1 | 30,5 Ko |
| `a2-05-travail/perimetre-v1-lot2.mjs` | 1 | 13,4 Ko |
| `a2-05-travail/perimetre-v1-lot3-B2.mjs` | 1 | 17,3 Ko |
| `a2-05-travail/perimetre-v1-lot3-B3.mjs` | 1 | 17,3 Ko |
| `a2-05-travail/perimetre-v1-lot3-B4.mjs` | 1 | 18,6 Ko |
| `a2-05-travail/perimetre-v1-lot3-B5.mjs` | 1 | 19,1 Ko |
| `a2-05-travail/perimetre-v1-lot3-B6.mjs` | 1 | 19,5 Ko |
| `a2-05-travail/perimetre-v1-lot3-B7.mjs` | 1 | 20,7 Ko |
| `a2-05-travail/perimetre-v1-lot3-B8.mjs` | 1 | 22,7 Ko |
| `a2-05-travail/perimetre-v1-lot3-B9.mjs` | 1 | 22,4 Ko |
| `a2-05-travail/perimetre-v1-lot3.mjs` | 1 | 37,8 Ko |
| `a2-05-travail/perimetre-v2.mjs` | 1 | 15,6 Ko |
| `a2-05-travail/plan-checkpoint.mjs` | 1 | 7,7 Ko |
| `a2-05-travail/prealable-E5.mjs` | 1 | 20,0 Ko |
| `a2-05-travail/proposition-CLAUDE-md-section5-v2.diff` | 1 | 2,6 Ko |
| `a2-05-travail/proposition-CLAUDE-md-section5.diff` | 1 | 4,0 Ko |
| `a2-05-travail/proposition-reprise-allegee.md` | 1 | 2,6 Ko |
| `a2-05-travail/provenance-commun.mjs` | 1 | 15,6 Ko |
| `a2-05-travail/provenance/` | 3 | 377,8 Ko |
| `a2-05-travail/rapport-criblage.mjs` | 1 | 28,5 Ko |
| `a2-05-travail/registre-tranches.json` | 1 | 1,2 Ko |
| `a2-05-travail/relais-reprise.mjs` | 1 | 16,3 Ko |
| `a2-05-travail/section6.mjs` | 1 | 12,1 Ko |
| `a2-05-travail/sens-deja-lus.json` | 1 | 0,6 Ko |
| `a2-05-travail/sync-pilotage-v2-apercu.md` | 1 | 2,7 Ko |
| `a2-05-travail/sync-pilotage-v2.mjs` | 1 | 5,8 Ko |
| `a2-05-travail/tranche-cat-1.json` | 1 | 0,3 Ko |
| `a2-05-travail/tri-provenance.mjs` | 1 | 9,4 Ko |
| `a2-05-travail/validation-20261008.json` | 1 | 1,7 Ko |
| `a2-05-travail/validation-20261009.json` | 1 | 1,7 Ko |
| `a2-05-travail/validation-a205.mjs` | 1 | 5,0 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B6-perimetre.zip` | 1 | 5768,2 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B6.zip` | 1 | 5883,9 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B7-perimetre.zip` | 1 | 5954,5 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B7.zip` | 1 | 6091,0 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B8-perimetre.zip` | 1 | 6158,6 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B8.zip` | 1 | 6288,3 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B9-arbitrage-etude-methode.zip` | 1 | 6591,6 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B9-perimetre.zip` | 1 | 6361,2 Ko |
| `chatgpt-relecture-A2-05-volet1-lot3-B9.zip` | 1 | 6488,6 Ko |
| `chatgpt-relecture/01-gouvernance.md` | 1 | 412,6 Ko |
| `chatgpt-relecture/02-conception.md` | 1 | 96,1 Ko |
| `chatgpt-relecture/03-references-A2.md` | 1 | 63,2 Ko |
| `chatgpt-relecture/04-addenda.md` | 1 | 85,3 Ko |
| `chatgpt-relecture/05-relais.md` | 1 | 352,2 Ko |
| `chatgpt-relecture/06-lot-courant-rapports.md` | 1 | 84,5 Ko |
| `chatgpt-relecture/07-lot-courant-sources.md` | 1 | 49,4 Ko |
| `chatgpt-relecture/08-lot-courant.json` | 1 | 0,2 Ko |
| `chatgpt-relecture/09-journal-lot-courant.json` | 1 | 0,0 Ko |
| `chatgpt-relecture/10-diff-et-controles.md` | 1 | 26009,8 Ko |
| `chatgpt-relecture/chatgpt-relecture-5-16-perimetre.zip` | 1 | 242,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-5-17-cloture.zip` | 1 | 244,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-5-17-essai.zip` | 1 | 501,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-5-17-final.zip` | 1 | 513,8 Ko |
| `chatgpt-relecture/chatgpt-relecture-5-17-perimetre.zip` | 1 | 223,6 Ko |
| `chatgpt-relecture/chatgpt-relecture-5-17-proposition-v2.zip` | 1 | 238,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-5-17-proposition.zip` | 1 | 232,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-categorie-nulle-t1.zip` | 1 | 376,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-categorie-nulle-t2.zip` | 1 | 596,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-categorie-nulle-t3.zip` | 1 | 663,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-categorie-nulle-t4.zip` | 1 | 705,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-categorie-nulle-t5.zip` | 1 | 787,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-categorie-nulle-t6.zip` | 1 | 839,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-checkpoint-cloture-v2.zip` | 1 | 1928,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-checkpoint-cloture.zip` | 1 | 1927,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-checkpoint-documentaire.zip` | 1 | 2164,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-checkpoint-prepare.zip` | 1 | 2243,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-criblage-validation.zip` | 1 | 579,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-criblage.zip` | 1 | 511,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-perimetres.zip` | 1 | 260,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-provenance-cloture-lot3-perimetre.zip` | 1 | 3906,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-reprise.zip` | 1 | 506,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-tranche6-cloture-tranche7-perimetre.zip` | 1 | 2442,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-tranche7-cloture-tranche8-perimetre.zip` | 1 | 3012,8 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-tranche8-cloture-bilan-provenance.zip` | 1 | 3776,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-trois-volets-v2.zip` | 1 | 283,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-trois-volets.zip` | 1 | 269,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-type-nul.zip` | 1 | 376,3 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot1-perimetre.zip` | 1 | 859,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot1.zip` | 1 | 945,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-bloc1bis.zip` | 1 | 1254,8 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-perimetre.zip` | 1 | 1027,5 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t2-lot00.zip` | 1 | 1297,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t2-lot01.zip` | 1 | 1410,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t3-lot02.zip` | 1 | 1538,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t3-lot03.zip` | 1 | 1626,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t4-lot05.zip` | 1 | 1716,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t4-lot06.zip` | 1 | 1813,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t5-5a.zip` | 1 | 1894,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t5-5b.zip` | 1 | 1965,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t5-5c.zip` | 1 | 2043,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t6-6a.zip` | 1 | 1986,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t6-6b.zip` | 1 | 2091,6 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t6-6c.zip` | 1 | 2176,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t6-6d.zip` | 1 | 2261,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t6-6e.zip` | 1 | 2360,3 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t7-7a.zip` | 1 | 2538,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t7-7b.zip` | 1 | 2625,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t7-7c.zip` | 1 | 2716,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t7-7d.zip` | 1 | 2802,8 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t7-7e.zip` | 1 | 2917,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t8-8a.zip` | 1 | 3110,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t8-8b.zip` | 1 | 3213,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t8-8c.zip` | 1 | 3324,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t8-8d.zip` | 1 | 3442,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t8-8e.zip` | 1 | 3548,3 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-t8-8f.zip` | 1 | 3642,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-tranche1.zip` | 1 | 1090,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-tranche2-perimetre.zip` | 1 | 1170,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-tranche3-perimetre.zip` | 1 | 1475,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-tranche4-perimetre.zip` | 1 | 1668,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-tranche5-perimetre.zip` | 1 | 1860,3 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot2-tranche6-perimetre.zip` | 1 | 2118,8 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-A1-E5.zip` | 1 | 4042,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-A2-E5-addendum.zip` | 1 | 4144,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-A3-E5-addendum-v2.zip` | 1 | 4249,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-A4-pilotage.zip` | 1 | 4379,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-A5.zip` | 1 | 4474,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-A6.zip` | 1 | 4591,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-A7.zip` | 1 | 4733,8 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B1.zip` | 1 | 4977,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B2-perimetre.zip` | 1 | 5058,3 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B2.zip` | 1 | 5161,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B3-perimetre.zip` | 1 | 5223,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B3.zip` | 1 | 5327,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B4-perimetre.zip` | 1 | 5397,8 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B4.zip` | 1 | 5525,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B5-perimetre.zip` | 1 | 5588,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-B5.zip` | 1 | 5701,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-05-volet1-lot3-blocA-bilan-B1-perimetre.zip` | 1 | 4854,5 Ko |
| `chatgpt-relecture/chatgpt-relecture-A2-rangement-documentaire.zip` | 1 | 255,7 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-21.zip` | 1 | 262,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-22.zip` | 1 | 262,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-23-A9-valide.zip` | 1 | 254,2 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-23-A9.zip` | 1 | 251,4 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-23-prealable.zip` | 1 | 235,3 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-23.zip` | 1 | 285,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-24-docs.zip` | 1 | 226,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-24.zip` | 1 | 277,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-25-docs.zip` | 1 | 199,5 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-25-perimetre.zip` | 1 | 206,6 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-25-prealable.zip` | 1 | 200,6 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-25-valide.zip` | 1 | 225,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-25.zip` | 1 | 217,9 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-26-pret-validation.zip` | 1 | 317,0 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-26-revision.zip` | 1 | 314,5 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-26-valide.zip` | 1 | 344,1 Ko |
| `chatgpt-relecture/chatgpt-relecture-lot-26.zip` | 1 | 309,1 Ko |
| `docs/rapports/` | 53 | 2265,5 Ko |

## 4. Deux options d'inclusion

| Option | Contenu | Fichiers | Taille | Liste exacte |
|---|---|---|---|---|
| **A** (comme le 2026-10-12) | les 5 fichiers suivis modifiés et les 53 rapports et documents nouveaux sous `docs/` | 58 | 3089,6 Ko | `a2-05-travail/checkpoint-chemins-option-A.txt` |
| **B** (recommandée) | l'option A, plus les 115 fichiers de travail utiles à la traçabilité (scripts qui ont écrit les rapports, registres, inventaire des scripts, manifeste), sans les notes d'export | 173 | 6674,7 Ko | `a2-05-travail/checkpoint-chemins-option-B.txt` |

**Pourquoi B** : chaque rapport arbitré nomme le script qui l'a écrit ; sans ces scripts dans git, un rapport n'est plus reproductible depuis le dépôt. Les notes d'export (141 fichiers, 19714,0 Ko) sont des copies assemblées de documents déjà inclus : elles restent hors du commit.

## 5. Exclusions

| Exclu | Fichiers | Taille | Motif |
|---|---|---|---|
| `chatgpt-relecture/` | — | — | dossier d'export, jamais committé sans accord |
| archives `chatgpt-relecture-*.zip` à la racine et autres fichiers hors `docs/` et `a2-05-travail/` | 117 | 274700,5 Ko | artefacts de transfert |
| `a2-05-travail/note-export-*` | 141 | 19714,0 Ko | copies assemblées pour la relecture (option B) ; tout `a2-05-travail/` est exclu en option A |

## 6. Contrôles préalables, à relancer juste avant un commit autorisé

1. `git status --short`, index vide, HEAD = `origin/ocha-v2`.
2. Aucun changement dans `data/`, `reconstruction/`, `tools/`, `tests/` ni dans l'application.
3. `node tools/reconstruction/run.mjs verify` puis `assemble` : sources conformes ; 684 ENTRY, 35 retraits, 0 entrée écartée.
4. `node --test "tests/**/*.test.js"` : 510 tests verts.
5. `node tools/validate-data.mjs` : 0 erreur, 149 avertissements.
6. `git diff --check` propre.
7. `node a2-05-travail/empreintes-lot3.mjs .` et `node a2-05-travail/couverture-lot3.mjs .` : codes 0.
8. Recalcul de la liste globale : 185 corrections, 165 ENTRY.
9. Indexation par la liste exacte de l'option retenue, puis `git diff --cached --stat` comparé à cette liste, fichier par fichier, avant le commit.

## 7. Commit proposé (non exécuté)

- **Message, sur une ligne** : `Docs: checkpoint A2-05, lot 3 jusqu'a B9 arbitree, etude de methode et outillage v2 en proposition, aucune correction appliquee` (sans accents, comme les commits précédents).
- **Indexation** : `git add --pathspec-from-file=a2-05-travail/checkpoint-chemins-option-<A|B>.txt`, puis contrôle du point 9.
- **Push** : séparé, sur autorisation distincte.

