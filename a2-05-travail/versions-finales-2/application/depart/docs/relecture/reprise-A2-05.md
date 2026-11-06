# A2-05 · Relais de reprise

**Objet** : reprendre A2-05 dans une session neuve, ou ouvrir une relecture dans une conversation neuve. **Ce relais ne décide rien et ne fait pas foi** : en cas d'écart, les documents du §3 l'emportent, et le relais se corrige.
**Rédigé** : 2026-10-20 (arbitrage des décisions D1 à D6). **L'historique n'est pas ici** : ancien relais complet dans git (`git show 78031638:docs/relecture/reprise-A2-05.md`) ; un cycle par sous-section dans le bilan du volet 2, §8 ; une ligne par tâche dans le journal d'`ETAT-ACTUEL.md`.

## 1. Rôles et accords

- Claude réalise dans le dépôt. ChatGPT relit un export, **sans accès au dépôt** et, par délégation de l'utilisateur, arbitre et autorise. L'utilisateur relaie les messages et garde le dernier mot.
- **Accords distincts, chacun explicite** : arbitrage, validation, indexation, commit, push. **Un avis favorable n'en vaut aucun**, et l'accord pour l'un ne vaut pas pour les autres (`CLAUDE.md`, §5, « Contrôle »).

## 2. État courant

- **Git** : branche `ocha-v2`. Référence historique : `78031638c0f81dca1b167e3f57f5a891767fc4cb` (checkpoint B, 2026-10-18, 177 chemins). Dernier checkpoint déclaré : `a2-05-travail/references-git.json`. **Les travaux postérieurs à ce checkpoint ne sont ni committés ni poussés, sauf mention contraire d'`ETAT-ACTUEL.md`.** À vérifier par `git rev-parse HEAD origin/ocha-v2` et `git ls-remote origin refs/heads/ocha-v2` avant de s'y fier.
- **Étape** : étape 2 de la reconstruction (Ocha v2), A2-05 (audit global du vocabulaire). Volet 2 clos (147/147) ; volet 1 : lots 1 et 2 clos, **lot 3 en cours** (377 sens, blocs A à F) ; bloc A clos ; bloc B ouvert ; volet 3 non commencé.
- **Décomptes** : **ne pas les recopier ici.** Ils sont calculés par `a2-05-travail/sync-stable.mjs`, entre les marqueurs `a2-05:etat` d'`ETAT-ACTUEL.md` et de `ROADMAP.md` (lot 3, bloc B, corrections retenues, prochain numéro libre, tranches, contrôles). Ce bloc fait foi.
- **Corrections** : retenues, **aucune appliquée**. `data/`, les lots, le journal, les registres, les snapshots, l'inventaire des avertissements, les outils et les tests sont ceux du commit `3d67594`.
- **Transition vers l'outillage v2** (`docs/rapports/etape2-A2-05-plan-transition.md`) : étape 1, le checkpoint B, est faite ; l'étape 2, la synchronisation stable, est appliquée (plan `89fa2e8a0a2c245b`) et acceptée ; l'étape 3 est ce relais allégé (arbitrage et rapport : `docs/rapports/etape2-A2-05-relais-allege-proposition.md`) ; les étapes 4 à 7 (contrôle final, périmètre de T1, pilote T1, bilan) ne sont pas commencées.
- **Préparé ou retenu en principe, non mis en œuvre** : l'outillage v2 (`a2-05-travail/lot3-commun-v2.mjs`, `a2-05-travail/perimetre-v2.mjs` ; contrôle final avant T1) ; les tranches T1 à T9, planifiées, et F, suspendue (`a2-05-travail/registre-tranches.json`). **Proposé, non adopté** : l'addendum E5.

## 3. Documents qui font foi

| Besoin | Document |
|---|---|
| Règles de travail et gouvernance | `CLAUDE.md`, `REGLES-CONSTRUCTION.md` (2.3), `docs/conception/README.md` |
| État, prochaine action, journal | `ETAT-ACTUEL.md` (« Étape en cours », bloc `a2-05:etat`) ; `ROADMAP.md` |
| Snapshots A2 (versions actives) | `docs/conception/a2/` : `A2-L3-v1`, `A2-ST-v1`, `A2-DIM-v1`, **`A2-REL-v1.1`** (remplace v1), `A2-LING-v1`, `A2-GLOBAL-v1` ; tableau des versions : `docs/conception/a2/README.md` |
| Addenda validés | `docs/conception/addendum-A1-…` à `addendum-A9-…` ; le plus souvent en cause : A5 (`category: null`), A6 (`semantic_type: null`), A7 (`deictique`), A9 (fonctions) |
| Registres | `data/registries/*.json` (catégories, types, dimensions, fonctions, relations, classes, compteurs, tags) |
| Non normatif | `docs/conception/legacy/a2/` (éclaire, ne fonde aucun verdict) ; la proposition d'addendum E5 sur `interrogatif` (`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`), **ni adoptée ni normative** ; ce relais |
| Arbitrages et leurs motivations | `docs/rapports/etape2-A2-05-bilan-volet2.md`, §8 (un cycle par sous-section ; la plus récente en dernier) ; le §0 de chaque rapport arbitré |
| Liste des corrections retenues | bilan du volet 2, §2 et §8 (V1-n, V2-n, et les dix modifications du volet 2) |
| Découpage des 377 et méthode | `docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md` (§6 : liste ; §10 : méthode) ; tranches : `a2-05-travail/registre-tranches.json` |
| Couverture et rapports protégés | `a2-05-travail/couverture-lot3.mjs` ; `a2-05-travail/empreintes-rapports-arbitres.json` (27 rapports arbitrés, à ne jamais régénérer) |
| Méthode et outillage | `docs/rapports/etape2-A2-05-etude-methode.md` ; `docs/rapports/etape2-A2-05-outillage-proposition.md` ; scripts : `a2-05-travail/INVENTAIRE-SCRIPTS.md` |
| Doctrines du volet 2 (`null`) | bilan du volet 2, §8.66 (liste consolidée, avec la provenance de chaque formulation) ; `docs/rapports/etape2-A2-05-audit-null.md` (fiches arbitrées par tranche) |

## 4. Règles de relecture (rappel ; la source fait foi)

1. **Lire chaque fiche source en entier** : traductions, particules, nuances, exemple et anciens exemples (méthode des livraisons, par exemple `docs/rapports/etape2-A2-05-volet1-lot3-B9.md`, §2 ; `etape2-A2-05-volet1-lot3-perimetre.md`, §10 ; bilan, §8.60).
2. **La fiche source décide** : aucun sens, aucune lecture, aucune graphie, aucun emploi ajouté par connaissance externe (`CLAUDE.md`, §4).
3. **Vérifier chaque champ un par un** (catégorie, type, fonctions, dimensions, tags, relations), et **motiver un conforme comme un écart** ; une réserve se nomme.
4. **Les comparables éclairent, ils ne jugent pas** : aucun verdict par analogie de traduction ou de famille (bilan, §8.42 : rapprochements mécaniques de traduction, au périmètre de B1). Le tri simple ou complexe n'est qu'une aide.
5. **Distinguer ce qui a été vérifié** sur un fichier lu **de ce qui est rapporté** d'une commande : le relecteur ne peut pas reproduire les commandes (export, fichier `10`).
6. **Contrôles bloquants par défaut** (sens omis, dupliqué ou inconnu ; champ absent ; règle non citée ; citation introuvable) ; les attributions à vérifier sont des avertissements ; la pertinence reste une relecture humaine (bilan, §8.61).
7. **Un rapport arbitré ne se régénère jamais** : un arbitrage s'inscrit en son §0 ; une erreur se corrige par un erratum, et non par une réécriture.
8. **Doctrines du volet 2**, à ne pas perdre : un `null` de catégorie hors hiérarchie est la réponse de l'architecture, non une lacune ; « état général » et « événement général » ne font pas partie de cette liste ; N n'est jamais un état final ; la correction d'un SENSE n'en renumérote aucun. Liste complète et provenance : bilan du volet 2, §8.66.
9. **Quatre états à ne pas confondre** (vocabulaire de lecture ; il ne crée aucun statut normatif nouveau) : **proposé**, une conclusion non encore arbitrée ; **arbitré**, une conclusion explicitement acceptée et inscrite au §0 du rapport ; **appliqué**, une correction réellement effectuée après autorisation ; **committé / poussé**, l'état Git, indépendant des décisions.

## 5. Restrictions en vigueur

- **Fermés jusqu'à décision explicite** : QC-1, QC-2, HP-1 à HP-4, G1 à G7 (volet 3), le bloc F et E5, le balayage global des relations. **Aucun périmètre de T1 n'est accepté.**
- **Aucune autorisation implicite** : sans accord spécifique, on ne modifie ni les données, ni les normes, ni les registres, ni les snapshots, ni les tests ; on n'applique aucune correction ; on ne lance aucun audit lexical.
- **Six opérations, six accords** : préparer ; auditer (seulement sur un périmètre accepté) ; arbitrer ; indexer ; committer ; pousser.
- **Les documents de pilotage** : le bloc `a2-05:etat` ne se modifie qu'avec `node a2-05-travail/sync-stable.mjs . --apercu`, puis `--appliquer --plan <empreinte>`, sur autorisation ; les rubriques rédigées et le journal se modifient par remplacements ciblés.
- **Commandes de contrôle** : rapporter le code de sortie de chacune, ne jamais tronquer ni masquer une sortie par un tube, signaler tout code non nul, même quand la sortie paraît favorable (règle retenue le 2026-10-12 ; ancien relais, au commit `78031638`, §11).
- **À ne jamais committer** sans accord : `chatgpt-relecture/` et les archives `.zip`.

## 6. Prochaine action

**Fait foi** : la rubrique « Prochaine action » d'`ETAT-ACTUEL.md` (section « Étape en cours »). Ce relais n'en donne volontairement aucune copie, pour ne jamais être en retard sur elle. Les restrictions du §5 s'appliquent en toute circonstance.

## 7. Produire un export de relecture

`node tools/export-relecture.mjs --lot lot-27 --ref <commit> --note <note du cycle>` (préfixe technique : il n'existe pas de lot 27 d'A2-05), puis archive `.zip` des fichiers `01` à `10`, à la racine. **L'export ne contient pas `A2-GLOBAL-v1`** : le signaler dans chaque note d'export, et l'y joindre quand une relecture en dépend (correction de l'outil retenue en principe, non faite : décision D5 du 2026-10-20).
