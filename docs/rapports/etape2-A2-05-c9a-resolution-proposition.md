# Étape 2 · A2-05 — incident C9a : résolution proposée (option A)

**Date** : 2026-10-22
**Statut** : **résolution acceptée et appliquée le 2026-10-22 ; périmètre accepté de T2 inscrit au manifeste (30 entrées) ; bloc d'état synchronisé ; relais 30 sur 30 (§8).** Le texte qui suit est celui de la proposition, conservé tel qu'il a été relu. **Proposition (2026-10-22), non appliquée alors.** Décision du 2026-10-22 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **Je retiens l'option A comme règle de fonctionnement : un périmètre accepté doit pouvoir être protégé avant que le rapport d'audit de sa tranche soit arbitré.** Préparer, en proposition, l'adaptation coordonnée de `controle-relais-allege.mjs` et du manifeste d'empreintes. […] **Ne pas appliquer encore cette adaptation ni ajouter T2 au manifeste avant relecture de la proposition.** Conserver le résultat C9a actuel, 29/30, comme incident ouvert jusqu'à résolution. » Les modules réels ne sont **pas** modifiés (`empreintes-lot3.mjs` `34e0d5696ce9…`, `controle-relais-allege.mjs` `779ef8460dcb…`, vérifiés avant et après) ; le manifeste garde **29 entrées** (`826d6d164e9c…`) ; **T2 n'y est pas ajouté**. Le contrôle du relais reste à **29 sur 30** (C9a), incident ouvert.

## 1. La règle proposée

Une seule règle, **`anomaliesTranches`**, exportée par `empreintes-lot3.mjs` et appliquée à la fois par le contrôle C9a du relais et par l'ajout contrôlé au manifeste (`--ajouter`) : ce que l'ajout écrit, C9a l'accepte, et ce que C9a refuse, l'ajout ne l'écrit pas.

Pour chaque entrée **nouvelle** du manifeste (C9a : par rapport au manifeste de HEAD ; `--ajouter` : par rapport au manifeste existant) :

| Cas | Règle |
|---|---|
| Périmètre de tranche (`…-lot3-Tn-perimetre.md`) | statut « périmètre accepté le » exigé ; **admis seul** tant que le rapport de sa tranche n'est pas arbitré ; si ce rapport est arbitré, il doit être au manifeste (sinon : omission) |
| Rapport de tranche (`…-lot3-Tn.md`) | statut « arbitré le » exigé ; **son périmètre doit être protégé** ; inscrit avec lui ou après lui, jamais avant |
| Toute autre entrée nouvelle | refusée (entrée étrangère) |
| Ajouts (`ajouts`) | chaque entrée nouvelle inscrite une fois et une seule ; aucun chemin inscrit absent des empreintes ; dates en ordre |
| Texte du manifeste | aucune clé en double (le texte est compté, `JSON.parse` gardant silencieusement la dernière) |

Les critères existants de C9a sont conservés : manifeste entier vérifié (`calculerEtat` sans refus, donc chaque empreinte identique au fichier), entrées de HEAD présentes et inchangées, aucun rapport arbitré hors du manifeste. **Seul change le critère des paires** : un périmètre accepté peut désormais précéder le rapport de sa tranche ; l'inverse reste refusé.

`--ajouter` vérifie d'abord le manifeste existant (doublons, ajouts), puis la règle sur le manifeste qu'il écrirait ; **rien n'est écrit** en cas d'anomalie.

## 2. États d'une tranche et transitions

| État de la tranche | Manifeste attendu | C9a |
|---|---|---|
| Périmètre proposé | ni périmètre ni rapport | conforme ; `--ajouter` n'ajoute rien |
| Périmètre accepté, hors du manifeste (état réel de T2) | — | **refus** (omission) : incident actuel |
| Périmètre accepté seul, protégé | périmètre seul (**30** entrées pour T2) | conforme |
| Rapport proposé | périmètre seul | conforme |
| Rapport arbitré, non protégé | — | **refus** (omission) |
| Tranche arbitrée | périmètre et rapport (**31** entrées pour T2) | conforme |

Transitions prévues : accepté seul → `--ajouter` (le périmètre seul, une entrée datée) → rapport proposé → rapport arbitré → `--ajouter` (le rapport seul). Le passage direct (périmètre et rapport tous deux hors du manifeste, comme pour T1 le 2026-10-20) reste admis : `--ajouter` inscrit la paire en un seul ajout.

## 3. Différences exactes

Préparées par `a2-05-travail/correction-c9a/preparer.mjs` (remplacements ciblés à occurrence unique ; modules réels lus, non modifiés) ; versions proposées dans `a2-05-travail/correction-c9a/proposition/`, différences dans `a2-05-travail/correction-c9a/diffs/` :

| Module | Départ | Proposé | Différence |
|---|---|---|---|
| `empreintes-lot3.mjs` | `34e0d5696ce9…` | `bac08d6c3962…` | `33b8055c132a…` (53 lignes) : en-tête ; `TRANCHE` et `anomaliesTranches` (exportées) ; `--ajouter` contrôlé |
| `controle-relais-allege.mjs` | `779ef8460dcb…` | `cd8e307e5664…` | `6475cad02e3c…` (32 lignes) : import ; commentaire ; C9a appelle `anomaliesTranches` au lieu du filtre par paires ; libellé et détail |

Aucun autre module ne change : `rapportsArbitres` et `verifierEmpreintes` sont inchangés, donc le générateur de périmètres, `sync-stable.mjs` et les autres importateurs aussi. Les seuls autres appelants de `--ajouter` sont historiques (`correction-couverture/`, note d'export de T1).

## 4. Les essais

`node a2-05-travail/correction-c9a/essais.mjs .` : **24 sur 24, code 0**. Copie temporaire de l'arbre, avec un dépôt git jetable dont HEAD porte le manifeste de HEAD réel (27 entrées) ; versions proposées substituées ; contrôle actuel gardé à côté pour comparaison. Le rapport de T2 utilisé dans la copie est **synthétique** (statut et titres des 21 sens, aucun verdict). Dépôt réel inchangé (E9).

| Essai | Résultat |
|---|---|
| E1 | témoin, état réel : C9a refuse (proposé et actuel) — l'incident est reproduit |
| E2, E3 | périmètre proposé : C9a conforme (proposé et actuel) ; `--ajouter` refuse (« aucun rapport arbitré à ajouter »), manifeste inchangé |
| E4 | périmètre accepté seul : `--ajouter` l'inscrit **seul** → **30 entrées, les 29 inchangées (valeurs et ordre)** ; C9a conforme ; le contrôle actuel le refuse (paires) ; vérification du manifeste : 30 identiques |
| E5 | rapport proposé : C9a conforme, 30 entrées ; `--ajouter` n'ajoute rien |
| E6 | tranche arbitrée, rapport non protégé : C9a refuse (omission) |
| E7 | `--ajouter` inscrit le rapport seul → **31 entrées**, les 30 précédentes inchangées ; ajouts : 2026-10-20 (T1, T1-perimetre) ; 2026-10-22 (T2-perimetre) ; 2026-10-22 (T2) ; C9a conforme |
| E8 | passage direct (cas de T1) : la paire inscrite en un ajout → 31, conforme |
| R1 | refus : rapport arbitré protégé sans son périmètre |
| R2 | refus de `--ajouter` : rapport arbitré dont le périmètre n'est pas protégé ; rien n'est écrit |
| R3, R4 | refus : clé en double dans le texte du manifeste (JSON valide) ; chemin inscrit deux fois dans les ajouts |
| R5, R6 | refus (omissions) : chemin des ajouts absent des empreintes ; rapport arbitré hors du manifeste alors que son périmètre y est |
| R7 | refus : entrée étrangère (bilan du volet 2) |
| R8 | refus : entrée nouvelle non inscrite dans les ajouts |
| R9, R10, R11, R14 | refus (états incohérents) : périmètre protégé au statut « proposition » ; périmètre protégé puis repassé en proposition ; rapport inscrit avant son périmètre ; rapport protégé au statut « proposition » |
| R12 | refus : ajouts datés hors d'ordre |
| R13 | refus : une des 29 empreintes existantes altérée |
| S0 | témoin final : copie restaurée, même refus que E1 |
| E9 | dépôt inchangé : `data`, `reconstruction`, `tests`, `tools`, `docs/conception` ; manifeste ; périmètre de T2 ; modules ; registre des tranches ; documents de pilotage ; aucun rapport de T2 |

**Premier lancement : 22 sur 24, code 1**, deux défauts du harnais d'essais, corrigés dans `essais.mjs` avant le second lancement, sans toucher à la proposition : (R2) le refus avait bien lieu (code 1, manifeste inchangé), mais le message capturé était la ligne de code citée par Node, non la ligne `Error:` ; (R3) le sabotage dupliquait la dernière clé sans virgule, rendant le JSON invalide au lieu de produire une clé répétée.

**Limite, inchangée** : R10 et R13 sont refusés parce que `calculerEtat` lève une erreur (« empreinte modifiée ») ; le contrôle du relais s'arrête alors, code 1, sans ligne C9a. C'est le comportement actuel, non modifié.

## 5. Application, sur autorisation distincte

1. Appliquer les deux modules, sur le modèle des correctifs précédents (`appliquer.mjs` : empreintes de départ vérifiées, différence recalculée identique à la différence relue, `git apply` en bac à sable, sauvegarde de départ et manifeste de correctif ; arrêt sans écriture en cas d'écart).
2. Ajouter le périmètre de T2 au manifeste : `node a2-05-travail/empreintes-lot3.mjs . --ajouter` → **30 entrées**, les 29 inchangées, un ajout daté ne portant que `…-T2-perimetre.md`.
3. Contrôle du relais `--apres-application` : 30 sur 30 attendu ; C9a résolu.
4. Le bloc `a2-05:etat` d'`ETAT-ACTUEL.md` et de `ROADMAP.md` dit « 29 rapports arbitrés identiques » : il se resynchronise par `sync-stable.mjs` (`--apercu`, puis `--appliquer --plan <empreinte>`), sur autorisation (règle du relais, §5).
5. À l'arbitrage de T2 : `--ajouter` n'inscrira que son rapport → **31 entrées**.

## 6. Ce qui n'est pas fait

Les modules réels ne sont pas modifiés ; T2 n'est pas ajouté au manifeste ; le contrôle du relais reste à 29 sur 30 ; aucun rapport arbitré, aucune donnée, aucun registre ni test n'est touché.

## 7. Décision demandée

Retenir, ou non, cette résolution, puis autoriser, ou non, séparément : son application (§5, point 1) ; l'ajout du périmètre de T2 au manifeste (point 2) ; la resynchronisation du bloc d'état (point 4).

## 8. Décisions et application (2026-10-22)

**Décision 1** (ChatGPT, par délégation ; relayé par l'utilisateur) : « J'autorise deux opérations distinctes : la résolution technique de C9a, puis la publication documentaire de l'erratum T1. » Application des seules versions proposées aux deux modules, après vérification des empreintes initiales et de l'identité des différences avec l'archive relue ; puis ajout, par `--ajouter`, du **seul périmètre accepté de T2** (30 entrées, les 29 précédentes inchangées) ; « Si un contrôle échoue, interrompre la suite et fournir le diagnostic sans réparation supplémentaire. »

**Application** (`node a2-05-travail/correction-c9a/appliquer.mjs .`, code 0) : avant l'écriture, empreintes de départ (`34e0d5696ce9…`, `779ef8460dcb…`), versions proposées (`bac08d6c3962…`, `cd8e307e5664…`) et différences (`33b8055c132a…`, `6475cad02e3c…`) conformes aux constantes relues ; les deux différences du dépôt identiques, octet pour octet, à celles de l'archive relue (`chatgpt-relecture-A2-05-comparables-application-C9a-erratum.zip`, `c0b5c4a7d14b…`, Partie 2.2) ; différences recalculées identiques ; `git apply` en bac à sable conforme ; manifeste à 29 entrées (`826d6d164e9c…`). Après : modules réels identiques aux versions proposées, `node --check` conforme ; sauvegarde de départ (modules et manifeste à 29 entrées) dans `a2-05-travail/correction-c9a/depart/`, manifeste du correctif `a2-05-travail/correction-c9a/manifeste.json`. Contrôle du relais avant l'ajout : 29 sur 30, C9a sans anomalie de règle, seule l'omission du périmètre de T2.

**Ajout** (`node a2-05-travail/empreintes-lot3.mjs . --ajouter`, code 0) : « 1 rapport(s) ajouté(s) : docs/rapports/etape2-A2-05-volet1-lot3-T2-perimetre.md » ; **30 entrées**, les 29 précédentes inchangées en valeurs et en ordre ; nouvelle entrée `b3b8ac70c178…` (empreinte du fichier) ; ajout daté du 2026-10-22, portant ce seul chemin ; aucun rapport de T2 (le fichier n'existe pas). Manifeste : 30 rapports identiques (code 0) ; **relais 30 sur 30, code 0**.

**Essais après application** (`node a2-05-travail/correction-c9a/essais.mjs . --apres-application`, mode ajouté par remplacements ciblés : la copie part du manifeste de départ sauvegardé, le contrôle de comparaison est la version de départ sauvegardée) : **26 sur 26, code 0** : E0 (identités), E1 à E8, R1 à R14 (tous les refus), S0, E9 (dépôt inchangé), E10 (dépôt réel : 30 entrées, 29 inchangées, T2-perimetre seul ajouté ; C9a conforme ; nouvel `--ajouter` refusé sans écriture). Libellé de S0 : en ce mode, la copie est restaurée sur le manifeste de départ sauvegardé, non sur celui du dépôt. Contrôle du relais identique sur deux passes.

**Diagnostic, puis décision 2** : l'aperçu de synchronisation n'était plus vide (plan `46ccaac1440d396b` : le bloc `a2-05:etat` passait de 29 à 30 rapports identiques) ; arrêt sans réparation, diagnostic transmis. Décision du 2026-10-22 : « J'accepte le diagnostic et autorise la synchronisation ciblée du bloc `a2-05:etat`. » Aperçu relancé : plan `46ccaac1440d396b`, quatre lignes changées, le marqueur et la ligne « Contrôles » (29 → 30) dans chacun des deux documents ; `node a2-05-travail/sync-stable.mjs . --appliquer --plan 46ccaac1440d396b`, code 0 ; différence réelle limitée à ces lignes, CRLF conservés ; aperçu suivant vide (idempotent). Décomptes inchangés : 172/377 ; bloc B 103/148 ; 186 corrections dans 166 ENTRY ; V1-12 libre.
