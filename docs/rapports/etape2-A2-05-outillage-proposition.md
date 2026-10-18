# Étape 2 · A2-05 · Volet 1 · Lot 3 — proposition d'outillage v2

**Date** : 2026-10-18
**Statut** : **proposition, non adoptée.** Préparée sur l'autorisation de l'arbitrage de l'étude de méthode du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Prépare une livraison technique dédiée, sans audit lexical […]. Cette autorisation concerne la préparation des fichiers et scripts en proposition, pas leur adoption définitive ni leur utilisation pour de nouveaux audits. » **Aucun audit lexical n'est fait ; aucun périmètre de T1 n'est préparé ; le module v1 et tous les scripts existants sont inchangés ; aucun rapport arbitré n'est régénéré (empreintes contrôlées) ; aucune donnée, norme, registre, snapshot ni test n'est modifié.**

## 1. Les composants

| Composant | Fichier | Ce qu'il fait | État |
|---|---|---|---|
| Module commun v2 | `a2-05-travail/lot3-commun-v2.mjs` | rapports de livraison ou de tranche, avec les apports listés au §2 | nouveau, essayé ; v1 gelé |
| Périmètres générés et contrôlés | `a2-05-travail/perimetre-v2.mjs` | périmètre d'une tranche, risques détectés automatiquement ; refuse les sens déjà arbitrés et les périmètres arbitrés | nouveau, essayé sur B8 et B9 ; non employé pour T1 |
| Registre de couverture des 377 | `a2-05-travail/couverture-lot3.mjs`, `a2-05-travail/couverture-lot3.json` | état de chaque sens ; arrêt sur omission, doublon ou sens inconnu | nouveau, calculé : 148 arbitrés, 229 restants |
| Manifeste d'empreintes | `a2-05-travail/empreintes-lot3.mjs`, `a2-05-travail/empreintes-rapports-arbitres.json` | SHA-256 de 27 rapports arbitrés (16 livraisons, 9 périmètres, périmètre du lot 3, bilan du bloc A) ; vérification par défaut ; ne se réécrit pas | établi le 2026-10-18 |
| Essais et non-régression | `a2-05-travail/essais-outillage-v2.mjs` → `docs/rapports/etape2-A2-05-outillage-essais.md` | B6 à B9 repassés par le module v2 et le générateur, dans un dossier temporaire ; sabotages | tous conformes (§3) |
| Synchronisation stable | `a2-05-travail/sync-pilotage-v2.mjs`, `a2-05-travail/registre-tranches.json` → `a2-05-travail/sync-pilotage-v2-apercu.md` | bloc d'état calculé entre marqueurs fixes, modèles de ligne de journal, de sous-section du bilan et de relais | aperçu seulement ; aucun document de pilotage touché |
| Relais allégé | `a2-05-travail/proposition-reprise-allegee.md` | modèle d'environ 5 Ko, à la place d'un relais d'environ 250 Ko | proposition ; relais actuel inchangé |
| Plan de checkpoint | `a2-05-travail/plan-checkpoint.mjs` → `docs/rapports/etape2-A2-05-plan-checkpoint.md` | liste exacte des fichiers, exclusions, différences, contrôles préalables | plan ; rien n'est indexé |

## 2. Ce que le module v2 change

1. **Identifiants hors JLPT** : la fiche source et les décisions sont résolues par la **correspondance canonique de l'assemblage** (`idMap`, entrées validées et non retirées, correspondance unique exigée), non par `n5_` suivi de l'identifiant publié. Les 684 ENTRY publiées ont une entrée source ; `v_718` → `hj_v_1`, `v_719` → `hj_v_2`.
2. **Plus de faux rapprochement par sous-chaîne** : les décisions d'autres ENTRY qui citent le mot sont **listées pour lecture, jamais comptées** dans R4.
3. **Dédoublonnage par ENTRY** : les décisions sont comptées une fois par ENTRY ; le générateur de périmètres ne compte plus, parmi les « autres sens », ceux de la même tranche.
4. **Contrôles des motivations** : chaque fiche d'examen doit nommer les huit champs (catégorie, type, fonctions, dimensions, tags, relations, particules, `counter`) et chaque règle du criblage qui désigne le sens. Ses citations sont recherchées dans leur source : la fiche, une décision nommée juste avant, ou à défaut les autres sources connues. Une citation introuvable est un manque ; trouvée ailleurs que dans la source annoncée, elle est une « attribution à vérifier ». Le module a un **mode signalement**, qui l'affiche dans le rapport, et un **mode strict**, qui arrête le script.
5. **Tri simple ou complexe**, aide à la priorisation seulement : un sens est complexe dès qu'un écart, une correction ou un point porté à l'arbitrage figure dans sa fiche d'examen. Le tri ne dispense d'aucune lecture.
6. **Tranches** de plusieurs livraisons du découpage arbitré, contrôlées contre le registre de couverture.
7. **Protection** : le manifeste est vérifié avant toute écriture ; l'écriture sur un rapport arbitré est refusée ; une livraison dont les sens sont arbitrés n'est traitée qu'en mode de non-régression.

## 3. Résultats des essais

Le détail est dans `docs/rapports/etape2-A2-05-outillage-essais.md`.

- **Non-régression B6 à B9 (35 sens)** : verdicts, catégories, types, fonctions et corrections **identiques** aux rapports arbitrés. **R4 : B6 9 sur 9, B7 7 sur 9, B8 6 sur 7, B9 6 sur 10, toutes valeurs arbitrées.** Pour B8, le module v1 affichait 5 ; le module v2 liste D1425 sans la compter.
- **Générateur de périmètres** : sur B8 et B9, il retrouve exactement les sens nommés par les règles (8, 3), les sens des mêmes catégories (54, 50), les autres livraisons (35, 19) et les décisions de chaque ENTRY.
- **Sabotages, tous refusés** : un sens examiné dans deux rapports ; un titre de fiche supprimé ; un sens inconnu du découpage ; un rapport arbitré modifié d'un seul espace ; une écriture demandée sur un rapport ou un périmètre arbitré ; des sens arbitrés traités hors du mode de non-régression.
- **État avant et après** : 27 empreintes identiques ; couverture inchangée ; aucun rapport arbitré modifié.

## 4. Observations, sans correction ni réouverture

- **B6** : les neuf fiches d'examen ne nomment pas `counter`. Le mode strict l'exigerait des tranches futures ; rien n'est repris pour B6.
- **B9, 温かい** : une citation présentée comme venant de la fiche (« la température douce et agréable de l'eau, d'un objet ou d'un plat ») est en fait le texte de D1160, qui résume la fiche. C'est une **attribution imprécise** dans un rapport arbitré ; le sens de la phrase est exact. La seconde attribution signalée sur ce sens vient d'une limite de l'heuristique (la citation suit « la fiche et son exemple, et rappelle que »).
- **Audit des 147** : 147 fiches pour 144 identifiants distincts, certains sens ayant deux fiches. Le générateur reprend le contrôle du script v1 (147 fiches), qu'une première version avait mal transposé ; l'arrêt est survenu avant toute écriture.

## 5. Limites

- Le contrôle des champs vérifie qu'un champ est **nommé**, non qu'il est **bien justifié** : il complète la relecture humaine, il ne la remplace pas.
- Une citation qui n'est attribuée ni à la fiche ni à une décision (libellé d'A2-L3, définition d'A2-ST, nuance publiée, criblage) n'est pas contrôlée ; le rapport en donne le nombre, fiche par fiche.
- La correspondance canonique appelle l'assemblage en mémoire : elle suppose les lots et le journal cohérents. Ceux-ci sont contrôlés par la suite de tests et par `run.mjs assemble`, relancés à chaque export.
- Les rapports arbitrés antérieurs restent produits par le module v1, avec ses limites connues (R4 de B8 affiché à 5) ; les valeurs arbitrées font foi.

## 6. Ce que l'adoption demanderait, et ce qui reste fermé

1. **Adoption du module v2 et du générateur de périmètres** pour les tranches, à partir de T1, en mode strict ou en mode signalement selon l'arbitrage.
2. **Synchronisation stable** : insertion des marqueurs dans `ETAT-ACTUEL.md` et `ROADMAP.md`, puis un mode d'application ; retrait des scripts de cycle.
3. **Relais allégé** : remplacement du contenu courant, après le checkpoint.
4. **Checkpoint** : plan séparé, autorisations distinctes de commit et de push.

**Restent fermés** : le périmètre et l'audit de T1, QC-1, QC-2, HP-1 à HP-4, G1 à G7, le bloc F, E5, le balayage des relations et l'application des 185 corrections.

## 7. Questions à l'arbitrage

1. Le module v2 et le générateur de périmètres sont-ils adoptés pour les tranches ? Les contrôles des motivations s'appliquent-ils en mode strict ou en mode signalement ?
2. La synchronisation stable et le relais allégé sont-ils retenus ? Leur mise en place se fait-elle avant le pilote ou avec lui ?
3. Le plan de checkpoint (option A ou B) est-il retenu ? Les autorisations de commit et de push seront données séparément.
4. Après adoption : la préparation du périmètre opérationnel de T1, par le générateur, pour acceptation explicite.
