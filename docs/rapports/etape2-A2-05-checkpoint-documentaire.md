# Étape 2 · A2-05 — checkpoint Git documentaire : proposition

**Date** : 2026-10-12
**Statut** : **contenu et périmètre du checkpoint acceptés le 2026-10-12, sous corrections** (ChatGPT, par délégation ; relayé par l'utilisateur) ; les modifications documentaires autorisées sont appliquées (§0). **Cet accord n'autorise ni indexation, ni commit, ni push : rien n'est indexé, committé ni poussé.** L'autorisation de commit et l'autorisation de push restent à donner, séparément et explicitement. La proposition est conservée telle quelle aux §1 à §8.

## 0. Arbitrage du 2026-10-12 et préparation faite

### 0.1 Réponses aux six questions du §8

1. **Bilan mixte : accepté.** `etape2-A2-05-bilan-volet2.md` est inclus ; son en-tête reçoit une phrase explicite : les §3 à §5 demeurent des propositions non arbitrées ; le §6 était une proposition de périmètre, acceptée puis exécutée. Sections historiques préservées.
2. **En-têtes périmés : corrections acceptées**, pour le rapport de criblage et le périmètre du lot 2, sans réécrire le texte d'origine, avec contrôle que seuls les en-têtes changent.
3. **Gouvernance : acceptée avec une correction.** C1 à C4, E1 à E5, R1 à R6 et N1 à N5 sont appliqués conformément au rapport. **E6** : les deux premières lignes, historiques, sont inscrites ; **la troisième, qui aurait affirmé le checkpoint committé, est reportée** au moment où le commit aura réellement été créé, avec son état exact et son identifiant ; aucun push n'est anticipé.
4. **Scripts d'audit : exclus du présent checkpoint.** Les fichiers d'`a2-05-travail/` restent hors de la liste Git ; aucun n'est supprimé ; un inventaire séparé est préparé (`a2-05-travail/INVENTAIRE-SCRIPTS.md`, hors dépôt) ; leur conservation durable relève d'un arbitrage distinct.
5. **Rapport de checkpoint : accepté.** Ce rapport est inclus, les présents arbitrages inscrits et son statut corrigé, la proposition initiale conservée.
6. **Liste Git et message : acceptés en principe.** Exactement les 36 chemins du §5 (5 modifiés, 31 nouveaux), avec le message proposé.

### 0.2 Contrôle préalable demandé : identité d'`A2-GLOBAL-v1.md`

**Vérifiée.** L'original a été retrouvé sur le poste de l'utilisateur, hors du dépôt : `Documents/App Jap/Github/Architecture taxonomie/Ocha_Snapshot_Architecture_Semantique_A2_GLOBAL_v1.md` (17 410 octets, daté du 2026-10-01, 14 h 21 ; le dossier contient aussi les cinq autres snapshots et les trois documents historiques). Les deux fichiers ont le même SHA-256, `a8ae70d160e0e8432a5c2642405993ae0f7dd0dee3c69f87713ca64ab110ded0` (`sha256sum`, code 0), et `cmp` ne relève aucune différence (code 0). **Limite** : que ce dossier soit bien la source d'où l'utilisateur a déposé le fichier est sa connaissance, non la mienne ; le nom, la taille, la date et l'empreinte concordent. La réserve du §2.1 (« je ne peux pas le revérifier ici ») est donc levée.

### 0.3 Modifications appliquées

| Fichier | Git | Ce qui a été fait |
|---|---|---|
| `CLAUDE.md` | suivi, modifié | C1 à C4 (+20, −4) |
| `ETAT-ACTUEL.md` | suivi, modifié | E1 à E5, et les deux lignes historiques d'E6 (+26, −3) |
| `ROADMAP.md` | suivi, modifié | R1 à R6 (+21, −8) |
| `docs/relecture/note-relais.md` | suivi, modifié | N1 à N5 (+28, −11) |
| `docs/rapports/etape2-A2-05-bilan-volet2.md` | nouveau | une ligne ajoutée après la ligne de statut, inchangée |
| `docs/rapports/etape2-A2-05-criblage-coherence.md` | nouveau | une ligne de statut à jour ajoutée avant la ligne d'origine, inchangée |
| `docs/rapports/etape2-A2-05-volet1-lot2-perimetre.md` | nouveau | idem |
| ce rapport | nouveau | statut et présent §0 ; §1 à §8 inchangés, sauf la formulation de la question 4 (« qu'aucun commit ne sauvegarde »), corrigée avant la première relecture |
| `docs/relecture/reprise-A2-05.md` | nouveau | arbitrage et préparation inscrits (§1 et §10) |

Les 21 remplacements de gouvernance ont été faits par un script de remplacements ciblés, chacun contrôlé comme unique, précédé d'un essai à blanc (code 0) ; les fins de ligne des quatre fichiers (CRLF) sont conservées ; `git diff --check` ne relève rien (code 0). Les trois en-têtes ont été contrôlés par `diff` contre une copie d'avant : **une ligne ajoutée par fichier, aucune ligne modifiée ni supprimée**. Les deux en-têtes de statut sont reportés dans leurs scripts (`rapport-criblage.mjs`, `perimetre-v1-lot2.mjs`, hors dépôt), pour qu'une relance ne les efface pas.

**Écarts avec le texte proposé, à relire** :

- **En-tête du criblage** : la parenthèse proposée disait « ChatGPT, par délégation ». Je l'ai retirée : le relais et le bilan disent le criblage « validé et terminé » sans nommer l'auteur de la validation, et je ne peux pas l'attester. Texte inscrit : « **Statut (mis à jour le 2026-10-12)** : **criblage validé et terminé** (443 sens candidats, 381 non-candidats, échantillon de validation 2 propre). Le texte d'origine suit. »
- **Libellé des deux en-têtes** : « **Statut (mis à jour le 2026-10-12)** », pour le distinguer de la ligne « **Statut** » d'origine, conservée juste dessous.
- **Bilan** : la phrase inscrite précise la date d'acceptation du §6 (2026-10-08) et rappelle que les §7 et §8 enregistrent des arbitrages rendus.
- **E6** : deuxième ligne, colonne « Commit » : « — » ; aucune troisième ligne.
- **C2** : phrase « Avant ce checkpoint, `ocha-v2` et `origin/ocha-v2` étaient à `5a8687b` » : elle décrit l'état d'avant, et restera exacte après un commit ; elle n'affirme pas que le checkpoint est committé.

### 0.4 Contrôles relancés le 2026-10-12, codes de sortie observés

Chaque commande lancée seule, sa sortie écrite dans un fichier, son code relevé aussitôt.

| Commande | Code | Résultat |
|---|---|---|
| `node tools/reconstruction/run.mjs verify` | 0 | « sources : conformes au manifeste » |
| `node tools/reconstruction/run.mjs assemble` | 0 | « assemblage partial : 684 ENTRY, 35 identifiant(s) retiré(s), 0 entrée(s) écartée(s) » |
| `node tools/validate-data.mjs` | 0 | « validate-data : 0 erreur(s), 149 avertissement(s) » |
| `node tools/reconstruction/run.mjs publish` (sans `--write`) | 0 | « fichiers de data/ à écrire : aucun (data/ est à jour) » ; rien n'est écrit |
| `node --test "tests/**/*.test.js"` (le script `npm test`) | 0 | 510 tests, 510 réussis, 0 en échec, 0 sauté |
| `git status --short -- data reconstruction tools tests src` | 0 | sortie vide |
| `git diff --cached --name-only` | 0 | sortie vide : **index vide** |
| `git diff --check` | 0 | aucun espace fautif |

Un échec sans effet, pendant la préparation de l'inventaire des scripts : un script de relevé jetable, hors dépôt et en lecture seule, s'est arrêté en code 1 sur une erreur de syntaxe de mon fait ; corrigé, il a rendu 0.

### 0.5 Ce qui reste à faire, et ce qui n'est pas fait

- **Non fait** : aucune indexation, aucun commit, aucun push ; aucune correction lexicale (les 124 corrections retenues dans 112 ENTRY restent non appliquées) ; aucun audit de 6a.
- **Après un accord de commit explicite** : `git add --` des 36 chemins nommés un par un ; contrôle de l'index (5 `M`, 31 `A`) ; commit sous le message accepté. **Puis**, dans un commit documentaire de clôture distinct et sur un nouvel accord : la troisième ligne d'E6, avec l'identifiant réel, et l'actualisation du §1 du relais.
- **Après un accord de push explicite, distinct** : vérification du distant réel, puis push sans force.

---

## Proposition d'origine (2026-10-12)

**Statut d'origine** : **proposition, non arbitrée.** Préparation documentaire et contrôles en lecture seule. **Rien n'est indexé, committé ni poussé ; aucun fichier suivi n'a été modifié pour ce rapport** (les quatre documents de gouvernance sont intacts : leurs actualisations sont proposées au §4, non appliquées). La validation du contenu, l'autorisation de commit et l'autorisation de push sont trois accords distincts, à donner séparément.
**Objet** : sécuriser dans Git les arbitrages d'A2-05 déjà rendus, accumulés depuis le commit `5a8687b`, **sans appliquer aucune correction lexicale**. Les 124 corrections retenues dans 112 ENTRY restent toutes non appliquées. **L'étape 2 n'est pas terminée.**

---

## 1. État complet de Git avant toute opération

Relevé le 2026-10-12. Les codes de sortie sont ceux des commandes elles-mêmes ; là où un filtre a servi à compter, le code relevé est celui de `git`.

| Contrôle | Commande | Code | Résultat |
|---|---|---|---|
| Branche | `git branch --show-current` | 0 | `ocha-v2` |
| Tête locale et distante | `git rev-parse HEAD origin/ocha-v2` | 0 | `5a8687b063fd2fca7c343d544aff040709bc5ec8`, deux fois. C'est la référence locale du distant : le distant réel n'a pas été interrogé, aucune commande réseau n'ayant été lancée |
| Dernier commit | `git log -1` | 0 | `5a8687b`, 2026-10-07 21:04, « Docs: clore la publication 5.17 apres push et annoncer A2-05 » |
| Index | `git diff --cached --name-only` | 0 | vide : rien n'est indexé |
| Remises | `git stash list` | 0 | vide |
| Fichiers suivis modifiés | `git status --short` | 0 | **un seul** : ` M docs/conception/a2/README.md` |
| Espaces fautifs | `git diff --check` | 0 | aucun ; un avertissement de fin de ligne (LF remplacé par CRLF au prochain passage de Git), sans effet sur le contenu |
| Chemins sensibles | `git status --short -- data reconstruction tools tests src docs/conception/addendum* docs/conception/schema* REGLES-CONSTRUCTION.md package.json` | 0 | **sortie vide** : aucun changement, suivi ou non |
| Fichiers non suivis | `git status --short --untracked-files=all` | 0 | **187 chemins** : 30 documents (§2), 90 dans `a2-05-travail/`, 66 dans `chatgpt-relecture/`, 1 archive ZIP à la racine |

**Exclusions actuelles** : `.gitignore` ne contient que `__pycache__/` et `glassy-box.html`. **Ni `a2-05-travail/`, ni `chatgpt-relecture/`, ni les archives ZIP ne sont ignorés** (`git check-ignore` : code 1, aucune règle). Leur exclusion du checkpoint repose donc entièrement sur une indexation par chemins explicites ; un `git add .` les emporterait. Ce rapport ne propose pas de modifier `.gitignore`.

**Dernier état contrôlé des données** (export du 2026-10-12, 09 h 50, code 0) : 510 tests, 510 réussis ; assemblage 684 ENTRY, 35 retraits, 0 écartée (code 0) ; `validate-data` 0 erreur, 149 avertissements. Aucun fichier de données, de lot, de journal, de registre, d'outil ni de test n'a changé depuis.

## 2. Inventaire et classement des fichiers

Trente documents non suivis, un fichier suivi modifié, et ce rapport. La colonne « Git » donne le statut actuel ; « Checkpoint » dit ce que je propose.

### 2.1 Documents normatifs

| Fichier | Git | Nature | Checkpoint |
|---|---|---|---|
| `docs/conception/a2/README.md` | **suivi, modifié** (+22, −2) | index des snapshots A2 ; rangement documentaire du 2026-10-07, relu et accepté ; diff au §3 | inclure |
| `docs/conception/a2/A2-GLOBAL-v1.md` | nouveau | snapshot global d'A2, référence normative, déposé par l'utilisateur le 2026-10-07. Le relais le dit identique à son original ; je ne peux pas le revérifier ici, l'original n'étant pas dans le dépôt | inclure |

Aucun autre document de conception n'est touché : ni les cinq snapshots spécialisés, ni les addenda, ni le schéma A2-01.

### 2.2 Documents historiques, non normatifs

| Fichier | Git | Checkpoint |
|---|---|---|
| `docs/conception/legacy/a2/README.md` | nouveau | inclure |
| `docs/conception/legacy/a2/02_Ocha_Stress_Test_N5_N2.md` | nouveau | inclure |
| `docs/conception/legacy/a2/03_Ocha_Reprise_Audit.md` | nouveau | inclure |
| `docs/conception/legacy/a2/Ocha_Decisions_A2_Unite_Apprentissage_Tags.md` | nouveau | inclure |

Leur README déclare qu'ils servent à la traçabilité et ne fondent aucune règle. Ils appartiennent au même rangement documentaire que le README d'A2, qui y renvoie.

### 2.3 Périmètres validés des trois volets

| Fichier | Git | État | Checkpoint |
|---|---|---|---|
| `docs/rapports/etape2-A2-05-perimetre-coherence.md` | nouveau | périmètre du volet 1, validé le 2026-10-07 | inclure |
| `docs/rapports/etape2-A2-05-perimetre.md` | nouveau | périmètre du volet 2, validé le 2026-10-07 | inclure |
| `docs/rapports/etape2-A2-05-perimetre-controles-globaux.md` | nouveau | périmètre du volet 3, validé ; **le volet 3 n'est pas commencé** | inclure |

### 2.4 Rapports entièrement arbitrés

| Fichier | Git | Arbitrage | Checkpoint |
|---|---|---|---|
| `docs/rapports/etape2-A2-05-criblage-coherence.md` | nouveau | criblage du volet 1 : validé et terminé (443 candidats) ; **en-tête de statut périmé**, voir §2.7 | inclure, en-tête corrigé |
| `docs/rapports/etape2-A2-05-audit-null.md` | nouveau | volet 2 : 147 sur 147, arbitré le 2026-10-08 (L 136, F 2, C 9, N 0) | inclure |
| `docs/rapports/etape2-A2-05-coherence-retroactive.md` | nouveau | volet 1, lot 1 : arbitré le 2026-10-08 (14 conformes, 5 écarts) | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-perimetre.md` | nouveau | lot 2, tri et périmètre : tranche 1 acceptée le 2026-10-08 ; **en-tête de statut périmé**, voir §2.7 | inclure, en-tête corrigé |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance.md` | nouveau | tranche 1 : arbitrée le 2026-10-10 (9 sourcés, 25 écarts) | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche2-perimetre.md` | nouveau | plan recalculé et périmètre de la tranche 2 : arbitrés le 2026-10-10 | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-1bis.md` | nouveau | bloc 1 bis : arbitré le 2026-10-10 (5 sourcés, 5 écarts) | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot00.md` | nouveau | arbitré le 2026-10-10 (7 sourcés, 2 écarts) | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot01.md` | nouveau | arbitré le 2026-10-10 (10 sourcés, 24 écarts) ; tranche 2 close | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche3-perimetre.md` | nouveau | périmètre arbitré le 2026-10-10 | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot02.md` | nouveau | arbitré le 2026-10-10 (4 sourcés, 3 assumés, 15 écarts) | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot03.md` | nouveau | arbitré le 2026-10-10 (6 sourcés, 2 assumés, 6 écarts) ; tranche 3 close | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche4-perimetre.md` | nouveau | périmètre arbitré le 2026-10-10 | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot05.md` | nouveau | arbitré le 2026-10-10 (lot 05 : 6 sourcés, 6 écarts ; hors JLPT : 1 sourcé, 1 écart) | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot06.md` | nouveau | arbitré le 2026-10-10 (5 sourcés, 1 assumé, 12 écarts) ; tranche 4 close | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche5-perimetre.md` | nouveau | périmètre arbitré le 2026-10-10 | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5a.md` | nouveau | arbitré le 2026-10-10 (3 sourcés, 6 écarts) | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5b.md` | nouveau | arbitré le 2026-10-10 (4 sourcés, 1 assumé, 4 écarts) | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5c.md` | nouveau | arbitré le 2026-10-12 (7 sourcés, 1 assumé, 3 écarts) ; tranche 5 close | inclure |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md` | nouveau | **périmètre arbitré le 2026-10-12** (47 nuances, 41 ENTRY, cinq livraisons) ; aucun audit de la tranche n'est commencé | inclure |

### 2.5 Documents mixtes ou vivants

| Fichier | Git | Ce qu'il contient | Checkpoint |
|---|---|---|---|
| `docs/rapports/etape2-A2-05-bilan-volet2.md` | nouveau | **arbitré** : §1 et §2 (bilan du volet 2, dix modifications), §7 (périmètre T1 à T8, accepté le 2026-10-08), §8 (**la liste consolidée unique des 124 corrections**, §8.1 à §8.17). **Propositions jamais arbitrées en tant que telles** : §3 à §5 (points restants, état du volet 3, ordre d'exécution en trois phases). §6 (périmètre du lot 1) est une proposition d'origine, depuis acceptée et exécutée. L'en-tête le dit pour les sections 3 à 6 | **inclure** : c'est la seule liste consolidée des corrections. Voir la question 1 |
| `docs/relecture/reprise-A2-05.md` | nouveau | le relais de reprise d'A2-05 : état, décomptes, arbitrages, anomalie du 2026-10-10 (§11). Document vivant, mis à jour à chaque arbitrage ; il conserve les propositions de périmètre d'origine du volet 2 (§8 à §8 quinquies), toutes arbitrées depuis | **inclure** : sans lui, une session neuve ne peut pas reprendre |
| `docs/rapports/etape2-A2-05-checkpoint-documentaire.md` | nouveau | ce rapport, **proposition non arbitrée** | inclure **seulement après sa validation**, son statut étant alors mis à jour. Voir la question 5 |

### 2.6 Fichiers temporaires et artefacts de transfert : exclus

| Chemin | Contenu | Raison |
|---|---|---|
| `a2-05-travail/` (90 fichiers, 6,2 Mo) | scripts de criblage, d'audit et de périmètre ; sorties JSON ; notes d'export | exclu, comme demandé. **Conséquence à connaître** : ces scripts portent les verdicts et régénèrent les rapports ; les rapports committés les citent (« calculé par `a2-05-travail/…` ») sans qu'ils soient dans le dépôt. Les rapports contiennent tout le contenu arbitré ; mais les scripts ne seront sauvegardés par aucun commit. Voir la question 4 |
| `chatgpt-relecture/` (66 fichiers, 49 Mo) | les dix fichiers de l'export courant et 56 archives, que l'utilisateur y range lui-même | artefacts de relecture, jamais committés (`CLAUDE.md`, §5) |
| `chatgpt-relecture-A2-05-volet1-lot2-tranche6-perimetre.zip`, à la racine | l'export du périmètre de la tranche 6 | artefact de transfert, jamais ajouté à Git |

Pour mémoire : une archive est **déjà suivie** à la racine, `src-tools-tests-data.zip` (2026-10-02). Elle est inchangée et n'est pas concernée.

### 2.7 Propositions encore ouvertes, et en-têtes à corriger

**Propositions ouvertes à ce jour** : ce rapport ; les §3 à §5 du bilan. **Aucun rapport d'audit n'est en attente d'arbitrage** : l'audit de 6a est autorisé et non commencé.

**Deux en-têtes de statut ne reflètent plus l'état arbitré.** Ils n'ont pas été mis à jour après l'arbitrage, que le relais et le bilan enregistrent. Je propose de les corriger avant le commit, par une phrase ajoutée en tête, la formulation d'origine étant conservée ; **rien n'est fait à ce jour** :

| Fichier | En-tête actuel | Texte proposé, ajouté avant |
|---|---|---|
| `etape2-A2-05-criblage-coherence.md` | « résultat du temps 1 du volet 1 (criblage exhaustif), livré pour relecture. » | « **Statut** : **criblage validé et terminé** (ChatGPT, par délégation ; 443 sens candidats, 381 non-candidats, échantillon de validation 2 propre). Le texte d'origine suit. » |
| `etape2-A2-05-volet1-lot2-perimetre.md` | « proposition de périmètre, non arbitrée. Aucun audit lexical n'est commencé » | « **Statut** : **périmètre de la tranche 1 accepté le 2026-10-08** (34 unités distinctes dans 33 ENTRY, sans ajout ni retrait ; critères de relecture arbitrés). Le plan des tranches suivantes a été recalculé et arbitré le 2026-10-10 (`etape2-A2-05-volet1-lot2-tranche2-perimetre.md`). Le texte d'origine suit. » |

Ces deux rapports sont écrits par des scripts de `a2-05-travail/`. La correction serait une insertion ciblée dans le rapport lui-même, avec contrôle par diff que seul l'en-tête change, et reportée dans le script pour qu'une relance ne l'efface pas.

## 3. Le seul fichier suivi modifié : `docs/conception/a2/README.md`

**Diff complet** (`git diff -- docs/conception/a2/README.md`, code 0 ; 22 insertions, 2 suppressions) :

```diff
@@ -12,7 +12,27 @@ versionné (`A2-GLOBAL-v1`, §14).
 | `A2-DIM-v1.md` | A2-DIM-v1 | `Ocha_Snapshot_Architecture_Semantique_A2_DIM_v1.md` | `data/registries/dimensions.json` |
 | `A2-REL-v1.1.md` | A2-REL-v1.1 | `Ocha_Snapshot_Architecture_Semantique_A2_REL_v1_1.md` | `data/registries/relations.json` |
 | `A2-LING-v1.md` | A2-LING-v1 | `Ocha_Snapshot_Architecture_Semantique_A2_LING_v1.md` | `data/registries/linguistic-functions.json` |
+| `A2-GLOBAL-v1.md` | A2-GLOBAL-v1 | `Ocha_Snapshot_Architecture_Semantique_A2_GLOBAL_v1.md` | aucun : snapshot global, qui consolide les cinq autres sans les remplacer |

 Copies octet pour octet des fichiers d'origine, déposées le 2026-10-02 : ST, DIM, REL et LING
-avec A2-02 · 3.1, L3 avec A2-02 · 3.2. Le snapshot `A2-GLOBAL-v1` sera déposé avec la tâche qui
-en aura besoin.
+avec A2-02 · 3.1, L3 avec A2-02 · 3.2. Le snapshot `A2-GLOBAL-v1` a été déposé le 2026-10-07, par
+l'utilisateur, avant l'audit A2-05 ; pour une définition détaillée ou une frontière fine, il renvoie
+lui-même au snapshot spécialisé (`A2-GLOBAL-v1`, §1).
+
+**Noms des fichiers.** La colonne « Fichier d'origine » donne le nom sous lequel chaque fichier a
+été déposé. Les snapshots se désignent entre eux sous d'autres noms, qui renvoient aux mêmes
+versions :
+
+| Nom cité par les snapshots | Fichier du dépôt |
+|---|---|
+| `Ocha_Snapshot_Officiel_A2_Level1-3_v1.md` | `A2-L3-v1.md` |
+| `Ocha_Snapshot_Officiel_A2_Semantic_Types_v1.md` | `A2-ST-v1.md` |
+| `Ocha_Snapshot_Officiel_A2_Dimensions_v1.md` | `A2-DIM-v1.md` |
+| `Ocha_Snapshot_Officiel_A2_Relations_v1.1.md` | `A2-REL-v1.1.md` |
+| `Ocha_Snapshot_Officiel_A2_Linguistic_v1.md` | `A2-LING-v1.md` |
+
+`A2-LING-v1` cite encore `Ocha_Snapshot_Officiel_A2_Relations_v1.md` : la version active des
+relations est `A2-REL-v1.1`, qui remplace `A2-REL-v1` (`A2-GLOBAL-v1`, §1).
+
+Les documents qui retracent la conception d'A2 sont à part, dans `docs/conception/legacy/a2/` : ils
+ne sont pas normatifs.
```

**Compatibilité avec le rangement accepté.** Le diff contient exactement les cinq éléments que le relais (§1) décrit comme relus et acceptés dans l'export `chatgpt-relecture-A2-rangement-documentaire.zip` : (1) la ligne de tableau d'`A2-GLOBAL-v1.md` ; (2) sa date de dépôt, à la place de « sera déposé avec la tâche qui en aura besoin » ; (3) la table de correspondance des noms ; (4) la note sur la référence d'A2-LING-v1 à A2-REL-v1 ; (5) le renvoi à `docs/conception/legacy/a2/`. **Aucune règle n'y change ; aucun snapshot n'est modifié.** La dernière écriture du fichier date du 2026-10-07, 22 h 29, avant tout audit A2-05.

**Dépendance entre fichiers** : ce README cite `A2-GLOBAL-v1.md` et `docs/conception/legacy/a2/`. Les trois doivent entrer dans le même commit, faute de quoi le README renverrait à des fichiers absents du dépôt.

**Limite de ma vérification** : je constate que le diff correspond à la description du relais ; je n'ai pas rouvert l'archive du 2026-10-07 pour le comparer à ce qui avait été relu.

## 4. Actualisation minimale proposée des documents de gouvernance

**Aucune de ces modifications n'est faite.** Principe : dire qu'A2-05 est en cours et où il en est, enregistrer `5a8687b`, renvoyer au relais pour le détail ; **aucune règle nouvelle, aucune décision nouvelle, aucune clôture de l'étape 2**. Les passages historiques ne sont pas réécrits. Les chiffres cités sont ceux des rapports arbitrés.

**Bloc de référence**, repris dans les quatre documents avec les seules adaptations de forme :

> **A2-05 est en cours ; l'étape 2 n'est pas terminée.** Trois volets, aux périmètres validés le 2026-10-07. **Volet 2** (audit individuel des 147 `null`) : terminé et arbitré le 2026-10-08, 147 sur 147 (L 136, F 2, C 9, N 0). **Volet 1** (cohérence rétroactive, axes C1 à C10) : criblage validé (443 candidats) ; lot 1 arbitré (19 sens : 14 conformes, 5 écarts) ; **377 candidats restent à examiner** ; lot 2, contrôle de provenance des nuances : tranche 1 (34 unités), bloc 1 bis, tranches 2 à 5 et les 2 nuances hors JLPT arbitrés ; 148 des 278 nuances du plan recalculé sont arbitrées, **130 restent** (tranche 6 : 47 ; tranche 7 : 39 ; tranche 8 : 44) ; périmètre de la tranche 6 arbitré le 2026-10-12, audit de la livraison 6a autorisé, non commencé. **Volet 3** (contrôles globaux G1 à G7) : non commencé. **124 corrections retenues, dans 112 ENTRY, aucune appliquée** (dix modifications du volet 2, V1-1 à V1-5, V2-1 à V2-109) : `data/`, les lots, le journal, les registres, les snapshots, l'inventaire des avertissements, les outils et les tests sont ceux du commit `3d67594`. Relais : `docs/relecture/reprise-A2-05.md` ; liste des corrections : `docs/rapports/etape2-A2-05-bilan-volet2.md`, §8.

### 4.1 `CLAUDE.md`

| # | Endroit | Modification proposée |
|---|---|---|
| C1 | §5, titre « Où l'on en est (au 2026-10-07) » | « Où l'on en est (au 2026-10-12) » |
| C2 | §5, **avant** la première puce (« Lots 0 à 26 validés… ») | insérer une puce : le bloc de référence, suivi de : « Avant ce checkpoint, `ocha-v2` et `origin/ocha-v2` étaient à `5a8687b` (clôture documentaire de 5.17, committée et poussée). Les puces suivantes décrivent A2-04 tel qu'il s'est clos le 2026-10-07 ; là où elles annoncent A2-05 comme « prochaine étape », lire : en cours. » |
| C3 | §5, première puce, fin : « **Prochaine étape : A2-05**, l'audit global du vocabulaire (détail en fin de section). » | « **A2-05, l'audit global du vocabulaire, est en cours** (puce précédente). » |
| C4 | §5, avant-dernière puce, « **Prochaine action : A2-05**, à ouvrir par un périmètre. Il doit comprendre : […] » | faire précéder de « **(État au 2026-10-07.)** » ; le texte, historique, n'est pas réécrit |

Rien d'autre : §1 à §4 et §6 inchangés ; aucune étape ajoutée à la liste de début de session.

### 4.2 `ETAT-ACTUEL.md`

| # | Endroit | Modification proposée |
|---|---|---|
| E1 | « Étape en cours », avant « **Tâche en cours : A2-04 · Reconstruction du vocabulaire N5.** » | insérer un paragraphe : « **Tâche en cours (au 2026-10-12) : A2-05 · Audit global du vocabulaire.** », suivi du bloc de référence |
| E2 | même section, « **Tâche en cours : A2-04 · Reconstruction du vocabulaire N5.** » | « **Tâche précédente, terminée : A2-04 · Reconstruction du vocabulaire N5.** » ; la suite du paragraphe, historique, est inchangée |
| E3 | même section, « **Prochaine action : A2-05**, à ouvrir par un périmètre qui comprend obligatoirement […] » | faire précéder de « (État au 2026-10-07.) » |
| E4 | « Étape 2 · Feuille de route », ligne 9 du tableau, dernière colonne : « **prochaine action** : périmètre à proposer » | « **en cours** : volet 2 arbitré (147 sur 147) ; volet 1, 377 candidats et 130 nuances de provenance à examiner ; volet 3 non commencé ; 124 corrections retenues, aucune appliquée (`docs/relecture/reprise-A2-05.md`) » |
| E5 | « Points ouverts », après le point « POINT DE SORTIE DE L'ÉTAPE 2 · audit des `null` » | ajouter une puce : « **A2-05 · état de la preuve (au 2026-10-12).** L'audit individuel des 147 `null` est fait et arbitré : 136 légitimes (L), 2 F et 9 C, soit dix modifications de SENSE retenues pour onze avertissements. **Ces modifications ne sont pas appliquées : le point de sortie n'est donc pas atteint.** Restent, avant toute clôture de l'étape 2 : l'examen des 377 candidats du volet 1, les 130 nuances de provenance, le volet 3, l'arbitrage global, puis l'application des corrections retenues, sur autorisations distinctes. » |
| E6 | « Journal des tâches », à la fin | ajouter trois lignes (ci-dessous) |

Lignes proposées pour le journal :

| Date | Étape · tâche | Résumé | Commit |
|---|---|---|---|
| 2026-10-07 | 2 · A2-04 · 5.17 | Clôture documentaire de 5.17 et annonce d'A2-05, committée et poussée sur accords explicites. | `5a8687b` |
| 2026-10-07 au 2026-10-12 | 2 · A2-05 | Travail documentaire seulement, aucune donnée modifiée. Rangement documentaire d'A2 (snapshot `A2-GLOBAL-v1`, documents historiques dans `docs/conception/legacy/a2/`). Périmètres des trois volets validés. Volet 2 : 147 `null` audités et arbitrés (L 136, F 2, C 9). Volet 1 : criblage validé, lot 1 arbitré, contrôle de provenance arbitré jusqu'à la tranche 5 ; périmètre de la tranche 6 arbitré. 124 corrections retenues dans 112 ENTRY, aucune appliquée. | — |
| 2026-10-12 | 2 · A2-05 | Checkpoint documentaire : rapports arbitrés, relais et rangement d'A2 committés, sans donnée, journal, registre, outil ni test. | (à compléter) |

L'identifiant du checkpoint ne peut être connu qu'après le commit : il serait complété par le commit documentaire de clôture habituel (« Docs: clore … apres push »), sur un accord distinct.

### 4.3 `ROADMAP.md`

| # | Endroit | Modification proposée |
|---|---|---|
| R1 | en-tête, « **Dernière mise à jour :** 2026-10-07 (… ; prochain chantier : A2-05) » | « **Dernière mise à jour :** 2026-10-12 (A2-05 en cours : volet 2 arbitré, volet 1 en cours, volet 3 non commencé ; aucune correction appliquée) » |
| R2 | « Position actuelle », fin du paragraphe : « **Prochain chantier : A2-05**, l'audit global du vocabulaire, dont l'audit un par un des `null`, point de sortie de l'étape 2. » | « **Chantier en cours : A2-05**, l'audit global du vocabulaire (section 6). L'audit un par un des `null` est arbitré ; ses corrections ne sont pas appliquées, et le point de sortie de l'étape 2 n'est pas atteint. » |
| R3 | fin de la section 5, « **Prochaine action immédiate :** ouvrir A2-05 par son périmètre (section 6). […] » | « **Suite :** A2-05, ouvert le 2026-10-07 (section 6). Aucun commit ni push sans accord explicite. » |
| R4 | section 6, titre « — ⬜ À FAIRE » | « — 🔵 EN COURS » |
| R5 | section 6, après la liste « Points déjà réservés pour cet audit » | ajouter un paragraphe « **Avancement (au 2026-10-12)** » : le bloc de référence |
| R6 | section 15, arbre : `├── A2-05 Audit vocabulaire              ⬜` | `🔵` à la place de `⬜` |

`🔵` est le symbole que la roadmap définit pour un « chantier actuellement en cours » (section 16) ; aucune tâche n'est marquée `✅`. Les sections 7 à 14 ne changent pas.

### 4.4 `docs/relecture/note-relais.md`

| # | Endroit | Modification proposée |
|---|---|---|
| N1 | « **Dernière mise à jour de la note** : 2026-10-07. » | « **Dernière mise à jour de la note** : 2026-10-12. » ; à la fin de l'historique, après « **clôture documentaire de 5.17 préparée, non committée** » : « , **puis committée (`5a8687b`) et poussée** ; **A2-05 ouvert** (2026-10-07) : pendant A2-05, le relais détaillé est `docs/relecture/reprise-A2-05.md`, joint à chaque export par l'option `--note`. » |
| N2 | §3 « Où en est le projet », en tête | insérer un paragraphe « **A2-05, en cours (au 2026-10-12).** » : le bloc de référence |
| N3 | §4 « Ce qui est attendu de cette relecture » | remplacer le premier paragraphe (« Contrôler la clôture documentaire de 5.17 ») par : « Pendant A2-05, ce qui est attendu de chaque relecture est écrit en tête de la note jointe à l'export (`05-relais.md`, partie 1). La liste ci-dessous est celle de la clôture de 5.17, conservée pour mémoire. » |
| N4 | §5, point « **Audit A2-05** : catégories nulles, deixis temporelle… » | ajouter à la fin : « En cours : voir `docs/relecture/reprise-A2-05.md`, §3 et §6 bis. » |
| N5 | §6 « Prochaine action », points 1 et 2 | « 1. **A2-05, en cours** : audit de la livraison 6a du contrôle de provenance (dix nuances du lot 10), puis 6b à 6e, chacune après l'arbitrage de la précédente ; ensuite le périmètre de la tranche 7. 2. Restent dans A2-05 : les 377 candidats du volet 1, le volet 3, l'arbitrage global et l'application des corrections, sur autorisations distinctes. **Aucune clôture de l'étape 2 avant.** » ; le point 3 (graphe, registre de phrases) est inchangé |

### 4.5 Le relais `docs/relecture/reprise-A2-05.md`

Son §1 dit aujourd'hui que rien n'est committé et que le fichier est « non suivi par git ». **Ces phrases restent vraies jusqu'au commit, et deviendraient fausses après.** Je propose de ne pas les anticiper : le relais part dans le checkpoint tel qu'il décrit l'état d'avant, et son §1 est actualisé dans le commit documentaire de clôture, comme pour les lots (un commit ne peut pas contenir son propre identifiant).

## 5. Chemins qui seraient indexés, et message de commit

**36 chemins, par ajout explicite, sans `git add .` ni aucune indexation globale.** 5 modifiés, 31 nouveaux.

Modifiés (5) :

```
CLAUDE.md
ETAT-ACTUEL.md
ROADMAP.md
docs/relecture/note-relais.md
docs/conception/a2/README.md
```

Nouveaux (31) :

```
docs/conception/a2/A2-GLOBAL-v1.md
docs/conception/legacy/a2/README.md
docs/conception/legacy/a2/02_Ocha_Stress_Test_N5_N2.md
docs/conception/legacy/a2/03_Ocha_Reprise_Audit.md
docs/conception/legacy/a2/Ocha_Decisions_A2_Unite_Apprentissage_Tags.md
docs/rapports/etape2-A2-05-perimetre.md
docs/rapports/etape2-A2-05-perimetre-coherence.md
docs/rapports/etape2-A2-05-perimetre-controles-globaux.md
docs/rapports/etape2-A2-05-criblage-coherence.md
docs/rapports/etape2-A2-05-audit-null.md
docs/rapports/etape2-A2-05-bilan-volet2.md
docs/rapports/etape2-A2-05-coherence-retroactive.md
docs/rapports/etape2-A2-05-volet1-lot2-perimetre.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-1bis.md
docs/rapports/etape2-A2-05-volet1-lot2-tranche2-perimetre.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot00.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot01.md
docs/rapports/etape2-A2-05-volet1-lot2-tranche3-perimetre.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot02.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot03.md
docs/rapports/etape2-A2-05-volet1-lot2-tranche4-perimetre.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot05.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot06.md
docs/rapports/etape2-A2-05-volet1-lot2-tranche5-perimetre.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5a.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5b.md
docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5c.md
docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md
docs/rapports/etape2-A2-05-checkpoint-documentaire.md
docs/relecture/reprise-A2-05.md
```

Volume : environ 1,8 Mo de Markdown. Aucun des trente documents existants ne contient de chemin personnel ni d'adresse de messagerie (recherche de `C:\Users`, `AppData`, `@gmail` : aucune occurrence, code 1 de `grep`).

**Message de commit proposé**, sur une seule ligne, sans accent, dans la forme des commits précédents :

```
Docs: checkpoint A2-05, arbitrages des volets 1 et 2 documentes, aucune correction appliquee
```

**Procédure proposée, une fois les accords donnés** : (1) sur la validation du contenu : appliquer les actualisations du §4 et les deux en-têtes du §2.7, puis montrer `git diff --stat` et le diff des quatre documents de gouvernance ; (2) relancer les contrôles (tests, assemblage, `validate-data`) et rapporter leurs codes de sortie ; (3) sur l'accord de commit : `git add --` suivi des 36 chemins, nommés un par un ; contrôle de l'index par `git diff --cached --name-status` (attendu : 5 `M`, 31 `A`, rien d'autre) ; commit ; (4) sur l'accord de push, distinct : vérification du distant réel, puis push sans force.

## 6. Vérification des chemins à exclure

| Chemin ou famille | État vérifié | Dans la liste du §5 ? |
|---|---|---|
| `data/` | aucun changement (sortie vide de `git status --short`) | non |
| `reconstruction/` (lots, journal, sources figées, inventaire des avertissements) | aucun changement | non |
| `data/registries/` (registres) | aucun changement | non |
| `tools/`, `tests/`, `src/`, `package.json` | aucun changement | non |
| les cinq snapshots déjà suivis de `docs/conception/a2/`, les addenda, le schéma A2-01 | aucun changement | non |
| `REGLES-CONSTRUCTION.md` | aucun changement | non |
| `a2-05-travail/` | 90 fichiers non suivis, non ignorés | **non** |
| `chatgpt-relecture/` | 66 fichiers non suivis, non ignorés | **non** |
| archive ZIP de la racine | 1, non suivie, non ignorée | **non** |
| documents non arbitrés | ce rapport, jusqu'à sa validation ; les §3 à §5 du bilan, signalés comme tels dans son en-tête | ce rapport : seulement après validation ; le bilan : question 1 |

**Contrôle croisé** : les 31 chemins nouveaux du §5 sont les 30 documents non suivis que `git status` liste hors de `a2-05-travail/`, de `chatgpt-relecture/` et de l'archive, plus ce rapport. Aucun chemin de la liste ne commence par `data/`, `reconstruction/`, `tools/`, `tests/`, `src/`, `a2-05-travail/` ni `chatgpt-relecture/`, et aucun ne se termine par `.zip`.

**Aucun test ne dépend des documents à committer.** Les tests qui citent `docs/conception/a2/` lisent les cinq snapshots spécialisés (transcription des registres) ou la liste de l'outil d'export, qui ne comprend pas `A2-GLOBAL-v1.md` ; ni ces tests ni l'outil ne sont touchés.

## 7. Ce qui reste hors du checkpoint, par construction

- **Aucune correction lexicale** : les 124 corrections retenues dans 112 ENTRY restent non appliquées ; ni lot 27, ni décision de journal à partir de D1614, ni `publish --write`.
- **Aucune clôture** : ni d'A2-05, ni de l'étape 2. Les 377 candidats du volet 1, les 130 nuances de provenance et le volet 3 restent à faire.
- **Aucun audit lexical de la tranche 6** : 6a est autorisée, et attend la relecture de ce checkpoint.

## 8. Questions à arbitrer

1. **Le bilan** (`etape2-A2-05-bilan-volet2.md`) contient la liste consolidée des 124 corrections, mais aussi trois sections de propositions jamais arbitrées (§3 à §5). L'inclure tel quel, son en-tête le signalant ? Ou compléter d'abord cet en-tête d'une phrase précisant que les §3 à §5 restent des propositions et que le §6 a été accepté puis exécuté ?
2. **Les deux en-têtes périmés** (§2.7) : les corriger avant le commit, par les textes proposés ?
3. **Les actualisations de gouvernance** (§4) : sont-elles acceptées telles quelles, C1 à C4, E1 à E6, R1 à R6, N1 à N5 ?
4. **`a2-05-travail/`** reste exclu, comme demandé. Faut-il prévoir, à part et plus tard, une décision sur la conservation des scripts d'audit, qu'aucun commit ne sauvegarde ?
5. **Ce rapport** entre-t-il dans le checkpoint une fois validé, ou reste-t-il hors du dépôt ?
6. **La liste des 36 chemins et le message de commit** (§5) sont-ils validés ?
