# Étape 2 · A2-05 — registre de couverture et rapports de tranche : correctif proposé

**Date** : 2026-10-20
**Statut** : **proposition, non appliquée.** Préparation autorisée le 2026-10-20 avec l'arbitrage de T1 : « J'autorise la préparation d'une adaptation technique en proposition, pas encore son application. » Les modules réels `a2-05-travail/couverture-lot3.mjs` et `a2-05-travail/empreintes-lot3.mjs` **ne sont pas modifiés** (empreintes vérifiées). Les versions proposées sont dans `a2-05-travail/correction-couverture/proposition/`, et les différences exactes dans `…/diffs/`. Aucun décompte n'est modifié à la main ; aucune donnée, norme, aucun registre normatif, snapshot ni test touché ; T2 n'est pas préparée ; aucun `git add`, commit ni push.

## 1. Le défaut

Le registre ne lit que les rapports nommés d'après les livraisons (`…-lot3-B10.md`). Le rapport de T1 (`…-lot3-T1.md`), arbitré, n'est donc pas compté : le registre donne toujours 148 sur 377, et le bloc B 79 sur 148. Le manifeste d'empreintes déduit en outre ses rapports arbitrés des livraisons arbitrées : un registre qui compterait T1 sans autre changement lui ferait chercher `…-B10.md`, qui n'existe pas.

## 2. Le correctif proposé

**Registre de couverture** :
- les rapports de tranche du registre des tranches (`…-lot3-<tranche>.md`) sont lus en plus des rapports de livraison historiques, avec le même contrôle de statut (arbitré, proposé ; tout autre statut est refusé) ;
- chaque sens examiné dans un rapport de tranche doit appartenir à l'une des livraisons de la tranche ;
- une livraison n'a jamais à la fois son propre rapport et le rapport d'une tranche (**chevauchement refusé**) ;
- un sens examiné dans deux rapports est refusé (doublon) ;
- un sens de la tranche absent de son rapport est refusé (omission) ;
- l'état d'un sens est celui du rapport de sa livraison, sinon celui du rapport de sa tranche, sinon « restant » : un rapport proposé ne compte jamais comme arbitré ;
- le registre rend en plus `tranches`, `tranchesArbitrees` et `tranchesProposees`, et, pour chaque sens, le rapport qui l'examine.

**Manifeste d'empreintes** :
- les rapports de tranche arbitrés et les périmètres de tranche acceptés (`…-lot3-T<n>-perimetre.md`) entrent dans la liste des rapports arbitrés ; non encore au manifeste, ils sont **signalés comme nouveaux**, sans erreur ;
- un mode `--ajouter` les ajoute après vérification de toutes les empreintes existantes, qui ne changent jamais ; il refuse s'il n'y a rien à ajouter ; la réécriture du manifeste (`--ecrire`) reste refusée.

## 3. Les essais

`node a2-05-travail/correction-couverture/essais.mjs .`, sur une copie temporaire de l'arbre où les modules proposés remplacent les modules réels : **14 sur 14, code 0**.

| Essai | Résultat |
|---|---|
| E1 · Décomptes | **172 sur 377, 205 restants, 0 proposé ; bloc B 103 sur 148** ; T1 arbitrée |
| E2 · T1 | les 24 sens comptés une fois, par le rapport de T1 |
| E3 · Non-régression | les 353 autres sens et les livraisons historiques ont l'état que leur donne le registre actuel |
| E4 · Synchronisation stable | `calculerEtat` donne 172/377, 103/148, 186 corrections, 166 ENTRY, V1-12 |
| E5 · Manifeste | 27 empreintes vérifiées ; nouveaux signalés : T1 et son périmètre |
| E6 · Ajout contrôlé (copie) | 29 entrées, les 27 anciennes inchangées ; second ajout refusé |
| S1 · Double comptage T1 + B10 | refusé (chevauchement) |
| S2 · Omission dans T1 | refusée |
| S3 · Sens de B9 aussi dans T1 | refusé (deux rapports) |
| S4 · Sens inconnu | refusé |
| S5 · Statut illisible | refusé |
| S6 · Rapport historique modifié | refusé (empreinte) |
| S7 · Rapport de tranche proposé | compté en « proposé » (24), jamais en « arbitré » |
| E7 · Innocuité | modules réels, manifeste réel et 27 rapports du dépôt inchangés |

## 4. État actuel du dépôt, et ce qu'il reste à faire

L'arbitrage de T1 est inscrit, et V1-11 est dans la liste globale : le calcul donne **186 corrections, dans 166 ENTRY ; V1-12 libre**. Le lot 3 reste calculé à 148 sur 377 tant que le correctif n'est pas appliqué. **Le bloc `a2-05:etat` n'est pas encore resynchronisé** : il affiche 185, 165 et V1-11, d'où un écart dans l'essai de reprise du relais (C8 : 10 sur 12). Il ne se modifie que par la synchronisation stable, sur autorisation.

**Application proposée, sur autorisation distincte, en une seule opération** :
1. Vérifier les empreintes de départ des deux modules, puis copier les versions proposées.
2. `node a2-05-travail/empreintes-lot3.mjs . --ajouter`, qui intègre T1 et son périmètre au manifeste (29 entrées).
3. `node a2-05-travail/sync-stable.mjs . --apercu`, puis `--appliquer --plan <empreinte>`, pour resynchroniser le bloc en une fois : 172/377, 103/148, 186 corrections, 166 ENTRY, V1-12.
4. Relancer les essais, en comparant au registre de départ sauvegardé, ainsi que les contrôles du relais.

## 5. Décisions demandées

1. Retenir, ou non, le correctif du registre et du manifeste, et autoriser son application selon le §4.
2. Autoriser la resynchronisation du bloc `a2-05:etat` en même temps.
3. Puis seulement, la préparation de T2.

**Décomptes** : calculés aujourd'hui, 148/377 et 79/148 ; après le correctif, 172/377 et 103/148 ; corrections, 186 dans 166 ENTRY, non appliquées ; V1-12 libre.

## 6. Application du 2026-10-20 ; réparation de C9a (2026-10-21)

**Application (2026-10-20, sur autorisation)**, selon le §4 : (1) `a2-05-travail/correction-couverture/appliquer.mjs` : les deux modules réels sont les versions proposées (empreintes finales du manifeste d'application `a2-05-travail/correction-couverture/manifeste.json` : `couverture-lot3.mjs` `3de20300a501…`, `empreintes-lot3.mjs` `34e0d5696ce9…`) ; sauvegarde de départ dans `a2-05-travail/correction-couverture/depart/` ; (2) `empreintes-lot3.mjs --ajouter` : T1 et son périmètre ajoutés au manifeste, **29 entrées**, les 27 de `HEAD` inchangées, un ajout daté du 2026-10-20 ; (3) synchronisation stable, plan `42e2765a1b657aa8` : bloc `a2-05:etat` porté à 172/377, 103/148, 186 corrections dans 166 ENTRY, V1-12, 29 rapports arbitrés identiques. (4) **Incident** : le contrôle du relais (`controle-relais-allege.mjs . --apres-application`) a rendu **29 sur 30, code 1** ; seul écart, **C9a**, qui exigeait exactement 27 empreintes (constante écrite quand le manifeste en comptait 27), alors que le manifeste en compte légitimement 29. Arrêt sans réparation, diagnostic présenté.

**Réparation de C9a (2026-10-21, sur autorisation)**, par remplacement ciblé dans `a2-05-travail/controle-relais-allege.mjs`, sans constante : C9a exige à la fois (a) le manifeste réel vérifié entier par `calculerEtat`, sans refus, et le nombre d'empreintes vérifiées égal au nombre d'entrées du manifeste réel ; (b) les entrées du manifeste de `HEAD` toutes présentes, empreintes strictement inchangées ; (c) les entrées nouvelles exclusivement des rapports de tranche (`…-lot3-T<n>.md`, statut « arbitré le », et `…-lot3-T<n>-perimetre.md`, statut « périmètre accepté le »), par paires, reconnus par `rapportsArbitres` et inscrits dans les `ajouts` du manifeste ; (d) aucun rapport arbitré hors manifeste. Intitulé sans « 27 ». Vérifications : `node --check` code 0 ; contrôle du relais **30 sur 30, code 0** (antérieurement 29 sur 30) ; C9a : 29 sur 29, `HEAD` 27 inchangées, nouvelles T1 et périmètre de T1 ; sur une copie temporaire, témoin sain conforme et quatre sabotages refusés (rapport historique modifié avec empreinte remise à jour ; entrée historique retirée ; entrée nouvelle hors tranche à empreinte exacte ; paire de T1 incomplète) ; essais du correctif, `essais.mjs . --apres-application` : **16 sur 16, code 0** (E0 et E8 compris) ; 29 empreintes identiques ; synchronisation idempotente (plan recalculé `42e2765a1b657aa8`, aucune transformation) ; `git diff --check` code 0 ; zones protégées sans modification.

**Constats, non traités** : l'aperçu de `sync-stable.mjs` porte une date codée en dur (« 2026-10-18 »), non modifiée ; le relais en service (`docs/relecture/reprise-A2-05.md`) mentionne encore « 27 rapports arbitrés », document figé par C10a, non modifié ; le statut de T1 dans `a2-05-travail/registre-tranches.json` (« planifiée ») est conservé tel quel, sujet non ouvert.

**Décomptes calculés** : 172/377, 205 restants ; bloc B 103/148 ; 186 corrections dans 166 ENTRY, non appliquées ; V1-12 libre. T2 n'est pas préparée. Aucun `git add`, commit ni push.

## 7. Arbitrage de la consolidation (2026-10-21)

Arbitrage du 2026-10-21 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **La consolidation technique et documentaire de T1 est acceptée.** » Résultats retenus : 172/377 sens arbitrés, 205 restants ; bloc B 103/148, 45 restants ; 186 corrections retenues dans 166 ENTRY, non appliquées ; V1-12 libre ; 29 empreintes protégées, dont 27 historiques ; contrôle du relais 30 sur 30 et essais de couverture 16 sur 16. « **La réparation de C9a est acceptée.** Conserver les traces de l'incident initial 29/30 et des sabotages » : elles restent au §6, inchangé. **La consolidation de T1 est close documentairement.** Restent hors de cet arbitrage, inchangés : le statut de T1 dans `a2-05-travail/registre-tranches.json` (arbitrage distinct), le relais figé et la date codée en dur de `sync-stable.mjs`. Autorisation distincte, du même jour : la préparation du périmètre de T2, en proposition seulement (`docs/rapports/etape2-A2-05-volet1-lot3-T2-perimetre.md` ; bilan du volet 2, §8.72). Aucun `git add`, commit ni push.
