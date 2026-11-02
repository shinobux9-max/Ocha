# Étape 2 · A2-05 — relais allégé : versions finales des quatre documents (étape 3 du plan de transition)

**Date** : 2026-10-20
**Statut** : **versions finales proposées, non écrites.** Elles suivent l'arbitrage du 2026-10-20 sur `etape2-A2-05-relais-allege-proposition.md` (décisions D1 à D6, inscrites au §0 de ce rapport-là), qui « approuve les choix de conception » mais « n'autorise pas encore l'écriture des quatre documents ». **Aucun des quatre documents réels n'est modifié** : leurs empreintes sont vérifiées identiques à celles du manifeste (contrôle C10a). Aucune donnée, norme, aucun registre, snapshot, outil ni test modifié ; ni T1 ni audit lexical ; aucun `git add`, commit ni push.

## 1. Les quatre documents

Générés par `a2-05-travail/versions-finales/generer.mjs`, qui n'écrit que dans `a2-05-travail/versions-finales/`. Le manifeste `a2-05-travail/versions-finales/manifeste.json` donne, pour chaque document, l'empreinte SHA-256 de l'état de départ et celle de l'état final ; l'application devra refuser d'écrire si un état de départ a changé.

| Document | Version finale | Différence exacte | Lignes | Octets | Fins de ligne |
|---|---|---|---|---|---|
| `docs/relecture/reprise-A2-05.md` | `a2-05-travail/versions-finales/docs/relecture/reprise-A2-05.md` | `…/diffs/docs__relecture__reprise-A2-05.md.diff` | +55 −627 | 268 511 → 9 051 | LF |
| `CLAUDE.md` | `a2-05-travail/versions-finales/CLAUDE.md` | `…/diffs/CLAUDE.md.diff` | +2 −2 | 34 288 → 34 277 | CRLF |
| `docs/relecture/note-relais.md` | `a2-05-travail/versions-finales/docs/relecture/note-relais.md` | `…/diffs/docs__relecture__note-relais.md.diff` | +2 −0 | 36 360 → 36 798 | CRLF |
| `docs/rapports/etape2-A2-05-bilan-volet2.md` | `a2-05-travail/versions-finales/docs/rapports/etape2-A2-05-bilan-volet2.md` | `…/diffs/docs__rapports__etape2-A2-05-bilan-volet2.md.diff` | +16 −0 | 180 844 → 185 254 | LF |

Les fins de ligne de chaque document sont conservées. Les différences sont calculées sur les textes sans retour chariot, pour la lecture.

## 2. Le relais allégé corrigé (D1, D2, D3)

**Option A (D1)** : le contenu entier du relais est remplacé, **exception à `CLAUDE.md` §3 accordée pour cette seule opération, sur ce seul fichier**. La version finale est le candidat `a2-05-travail/reprise-A2-05-allegee-candidat.md`, dont seule la première ligne (le commentaire « CANDIDAT ») est retirée (contrôle C10b). L'ancien relais reste récupérable en entier : `git show 78031638:docs/relecture/reprise-A2-05.md` (contrôle C2c, 267 490 octets). La différence exacte retire les 627 lignes de l'ancien texte qui ne se retrouvent pas dans le nouveau, et ajoute les 55 lignes du nouveau. Son texte final est reproduit en entier dans la note d'export.

**Changements depuis la proposition**, tous demandés par l'arbitrage :

| Décision | Changement |
|---|---|
| D2, première précision | règle 9 ajoutée au §4 : **proposé**, **arbitré** (inscrit au §0), **appliqué**, **committé / poussé** ; « il ne crée aucun statut normatif nouveau » |
| D2, seconde précision | §6 réduit au renvoi à la rubrique « Prochaine action » d'`ETAT-ACTUEL.md`, qui fait foi ; aucune tâche datée |
| D2, conséquence | §2 : la distinction entre ce qui est préparé ou retenu en principe (outillage v2, tranches) et ce qui est proposé (E5) devient explicite ; l'état de la transition est écrit tel qu'il sera après la mise en service |
| D4 | §3 et règle 8 : renvoi au bilan du volet 2, §8.66, pour la liste complète des doctrines et leur provenance |
| D5 | §7 : l'absence d'`A2-GLOBAL-v1` dans l'export est à signaler dans chaque note ; correction de l'outil retenue en principe, non faite |
| D1 | en-tête et §5 : l'ancien relais est désigné par son commit, `78031638` |

**Taille (D3)** : 9 051 octets, contre 8 441 pour la proposition ; l'écart vient des deux précisions de D2 et du renvoi de D4.

## 3. `CLAUDE.md` : la référence Git (correction acceptée)

Seule la mention d'état du §5 change, sur les lignes 128 et 129 (contrôle C10c) ; aucune règle ni instruction n'est touchée. La différence est identique, octet pour octet, à celle livrée le 2026-10-20 (`a2-05-travail/proposition-CLAUDE-md-reference-git.diff`, comparaison `cmp`, code 0).

```diff
--- a/CLAUDE.md
+++ b/CLAUDE.md
@@ -126,6 +126,6 @@ faut savoir est dans le dépôt.
   `docs/relecture/reprise-A2-05.md` ; liste des corrections :
   `docs/rapports/etape2-A2-05-bilan-volet2.md`, §8 ; rapports de livraison du lot 3 :
-  `docs/rapports/etape2-A2-05-volet1-lot3-*.md`. `ocha-v2` et `origin/ocha-v2` sont à `558f150`
-  (checkpoint documentaire du 2026-10-12, committé et poussé) ; les travaux postérieurs ne sont ni
+  `docs/rapports/etape2-A2-05-volet1-lot3-*.md`. `ocha-v2` et `origin/ocha-v2` sont à `7803163`
+  (checkpoint B du 2026-10-18, committé et poussé) ; les travaux postérieurs ne sont ni
   committés ni poussés. Les puces suivantes décrivent A2-04 tel qu'il s'est clos le 2026-10-07 ; là
   où elles annoncent A2-05 comme « prochaine étape », lire : en cours.
```

## 4. `note-relais.md` : le gel (D6)

Un paragraphe ajouté en tête, puis une ligne vide. **Le reste du fichier, tout son historique, est conservé à l'identique** (contrôle C10d : la version finale se termine par le texte actuel, entier).

```diff
--- a/docs/relecture/note-relais.md
+++ b/docs/relecture/note-relais.md
@@ -1,2 +1,4 @@
+**Note gelée** (décision D6, arbitrage du 2026-10-20) : elle n'est plus mise à jour depuis le 2026-10-12 et ne décrit plus l'état du projet ; son historique est conservé tel quel ci-dessous. Le relais de reprise en service est `docs/relecture/reprise-A2-05.md` ; chaque export d'A2-05 porte sa propre note (`--note`). `tools/export-relecture.mjs` reprend encore cette note par défaut quand `--note` est omis : ne pas l'omettre.
+
 Cette note est écrite à la main par Claude Code et mise à jour avant chaque export. Elle dit ce
 que l'outil ne peut pas déduire des données : les rôles, les consignes, qui a décidé quoi, et ce
```

La dernière phrase est un constat sur l'outil (sa note par défaut), non une règle nouvelle ; elle évite qu'un export lancé sans `--note` présente la note gelée comme actuelle.

## 5. Bilan du volet 2 : §8.66, doctrines consolidées (D4)

Ajouté à la fin du bilan, par la fonction contrôlée `ajouterSectionBilan` de `sync-stable.mjs` ; rien d'autre ne change (contrôle C10e). Le §8.66 enregistre aussi l'arbitrage de ce jour, D1 à D6, puisque le bilan n'est pas écrit avant l'application. Sa différence exacte (16 lignes ajoutées, aucune retirée) est reproduite en entier dans la note d'export, et se trouve dans `a2-05-travail/versions-finales/diffs/docs__rapports__etape2-A2-05-bilan-volet2.md.diff`.

**Fidélité** : les sept formulations sont reprises **mot pour mot** du §6 de l'ancien relais au commit `78031638`. Le générateur refuse d'écrire une version finale si l'une d'elles n'y est pas retrouvée, et le contrôle C10f le vérifie à nouveau.

**Provenance** : chaque formulation est suivie de sa source : périmètre du volet 2, §5, §6 et §6.4 ; périmètre de la cohérence rétroactive, §5 ; audit des `null`, §T2.3, §3.1, §3.2 et §5 ; bilan, §2 ; A2-L3 §6 et A2-GLOBAL §4.4 ; README des snapshots. Le contrôle C10g vérifie que chaque section citée existe et contient la notion attribuée.

**Aucune règle nouvelle** : la sous-section le dit, et les précédents cités (大勢, 上 et 横, 力) restent présentés comme des comparables.

**Numérotation.** §8.66 suppose qu'aucune autre sous-section n'est ajoutée au bilan avant l'application. Si l'ordre change, la version finale est régénérée et la différence est présentée à nouveau ; elle n'est jamais renumérotée à la main.

## 6. Contrôles

`node a2-05-travail/controle-relais-allege.mjs .` : lecture seule, **27 contrôles** :
- les 19 de la proposition ;
- en C4, quatre exigences « prochaine action » adaptées à D2 : le §6 ne porte plus de tâche, et la rubrique d'`ETAT-ACTUEL.md`, qui fait foi, est vérifiée par C5f ;
- en C4, six exigences nouvelles, pour D2, D4 et D5 ;
- **C10a à C10g**, sur les versions finales ;
- **C8b** : l'essai de reprise rejoué sur le relais final et le bilan final, où les renvois au §8.66 doivent aboutir.

**Premier passage sur les versions finales : 26 conformes sur 27, code 1.** C4 a échoué sur l'exigence « proposé / validé / préparé ». En réduisant le §6 et en réécrivant l'état de la transition, j'avais retiré la seule mention de ce qui était « en proposition ». Le contrôle signalait donc un vrai manque. **Je n'ai pas assoupli le contrôle** : j'ai ajouté au §2 une puce qui distingue ce qui est préparé ou retenu en principe (outillage v2, tranches) de ce qui est proposé (E5), et l'exigence vise désormais cette puce. **Second passage : 27 sur 27, code 0** ; la sortie entière est dans la note d'export.

Ce que vérifient les autres contrôles :
- **comparaison avec le relais historique** (C7) : les 24 sections de l'ancien relais ont chacune une destination vérifiée ; pour le §6, c'est désormais le §8.66 de la version finale du bilan ;
- **références** (C2) : chaque chemin cité existe ;
- **empreintes** (C9a) : les 27 rapports arbitrés sont identiques ;
- **essai de reprise** (C8, C8b) : 12 réponses justes sur 12, puis les renvois de la version finale aboutissent.

## 7. Application proposée, sur autorisation explicite

Une seule opération, dans cet ordre, **les quatre documents ensemble** : le relais renvoie au §8.66, qui ne doit pas manquer.

1. Vérifier que l'état de départ des quatre documents correspond au manifeste (C10a) ; sinon, s'arrêter sans écrire et régénérer.
2. Copier chaque version finale sur son document. Pour le relais, c'est le remplacement autorisé par D1 ; pour les trois autres, la copie ne fait que reproduire les remplacements ciblés montrés ci-dessus.
3. Vérifier que l'empreinte de chaque document écrit est celle du manifeste (`final_sha256`), et que `git show 78031638:docs/relecture/reprise-A2-05.md` reste lisible.
4. Relancer les contrôles. Le contrôle C9c, qui vérifie aujourd'hui que le relais n'est **pas** remplacé, s'inversera, comme C10a. Ils devront être adaptés à l'état mis en service. Je le signale dès maintenant, pour qu'aucun échec ne soit lu à la volée comme « attendu ».
5. Mettre à jour le journal et les rubriques ; indexation, commit et push restent trois accords distincts.

## 8. Ce qui reste à décider

1. **L'autorisation d'écrire les quatre documents**, selon le §7 : D1 en fixe le principe, pas l'exécution.
2. **La correction future de `tools/export-relecture.mjs`** pour A2-GLOBAL-v1 (D5) : une autorisation d'outillage distincte, quand elle sera voulue.
3. Puis l'étape 4 du plan de transition (contrôle final), sur autorisation distincte.

**Décomptes conservés** (bloc `a2-05:etat`, inchangé) : lot 3, 148 sur 377 ; bloc B, 79 sur 148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.

## 9. Application du 2026-10-20

**Autorisation** (relecteur, par délégation ; relayée par l'utilisateur) : « J'autorise explicitement leur application aux documents réels, exclusivement selon les versions du manifeste `a2-05-travail/versions-finales/manifeste.json`. » Elle ne vaut ni indexation, ni commit, ni push, ni étape 4.

**Avant l'écriture.** Contrôle complet : 27 sur 27, code 0. `appliquer.mjs` a ensuite vérifié, sans rien écrire :
- les quatre empreintes de départ et les quatre empreintes finales, contre le manifeste ;
- les fins de ligne prévues ;
- les différences recalculées, identiques aux différences approuvées ;
- l'absence du §8.66, le §8.65 étant la dernière sous-section du bilan ;
- l'ancien relais, lisible au commit `78031638`.

Tout était conforme. **Rien n'a été régénéré.**

**Écriture.** Une sauvegarde de départ a été déposée dans `a2-05-travail/versions-finales/depart/`, empreintes vérifiées, avec une seconde copie hors dépôt. Les quatre documents ont été écrits, puis leurs empreintes finales vérifiées : code 0. Aucun échec, et donc aucune restauration.

**Différences réellement appliquées** (sauvegarde de départ → document écrit) : identiques, octet pour octet, aux quatre différences approuvées (`cmp`, code 0 pour chacune). `git diff --stat HEAD` sur ces quatre fichiers : 87 insertions, 629 suppressions. Ces chiffres incluent les deux puces non committées du 2026-10-18, remplacées avec l'ancien relais.

**Contrôles après application.**
- **Mode par défaut** (il décrit l'état d'avant) : 19 sur 27, code 1, et **ces échecs sont conservés tels quels** : C7, C9b, C9c, C10a, C10c, C10d, C10e et C10f lisent l'état actuel comme s'il était l'état de départ.
- **Mode `--apres-application`**, ajouté explicitement : l'état de départ est lu dans la sauvegarde vérifiée. C9b exclut `CLAUDE.md`, modifié sur autorisation et contrôlé par C10a et C10c. C9c exige le relais mis en service. C10a exige les empreintes finales et celles de la sauvegarde. C11 vérifie les fins de ligne, le §8.66 du bilan réel et les références du relais en service. Résultat : **30 sur 30, code 0**.
- **Autres contrôles** : recalcul en mémoire de la synchronisation, idempotent, avec des décomptes inchangés ; 27 empreintes ; zones protégées (`data/`, `reconstruction/`, `tools/`, `tests/`, `docs/conception/`) non modifiées ; `git diff --check`, code 0 ; index vide.

**Incidents.** Deux tentatives de correctif du script de contrôle ont échoué avant toute écriture : un motif altéré par l'échappement du shell. Le fichier est resté identique (`cmp`, code 0). Le correctif a ensuite été appliqué depuis un fichier, puis vérifié par `node --check`. Aucun incident sur les quatre documents.
