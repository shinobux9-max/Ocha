# Étape 2 · A2-05 — plan de transition technique vers l'outillage v2

**Date** : 2026-10-18
**Statut** : **plan, sans exécution.** Suit l'arbitrage du 2026-10-18 sur la proposition d'outillage : l'architecture est retenue en principe, sous réserve d'un contrôle final avant sa première utilisation sur T1 ; l'option B du checkpoint est retenue, mais pas encore exécutée. **Aucun audit lexical, aucun périmètre de T1, aucun `git add`, commit ni push.**

## 1. Fait dans ce cycle

- **Séparation des niveaux de contrôle, vérifiée et imposée dans `lot3-commun-v2.mjs`.** Le mode est **bloquant par défaut**. Bloquent : un sens omis, dupliqué ou inconnu (registre de couverture), un champ obligatoire absent, une règle applicable non citée, une citation littérale introuvable. Les **attributions à vérifier** (citation retrouvée dans une autre source, attribution ambiguë) sont signalées dans la fiche et ne bloquent pas. Le **mode signalement** est une option explicite, réservée à la non-régression des rapports historiques. Les essais le montrent : le mode par défaut bloque les fiches de B6 (`counter`) et laisse passer B9 (deux attributions à vérifier, aucun manque) ; la non-régression de B6 à B9 reste conforme.
- **Contrôle préalable du checkpoint B** : `a2-05-travail/controle-checkpoint-B.mjs` → `docs/rapports/etape2-A2-05-checkpoint-B-controle.md` ; le script n'écrit que deux artefacts documentaires (ce rapport et `a2-05-travail/checkpoint-chemins-ajouts.txt`) et ne modifie aucun autre fichier.
- Les constats historiques (B6 `counter` ; B9, attribution d'une citation de D1160 pour 温かい) restent documentés, sans réouverture.

## 2. Séquence de transition

| Étape | Contenu | Condition |
|---|---|---|
| 1. Checkpoint B | indexation par la liste exacte, contrôle de l'index, commit sur une ligne, puis push | autorisations distinctes de commit et de push ; contrôle préalable entièrement conforme et relancé juste avant |
| 2. Synchronisation stable | insertion unique des marqueurs `a2-05:etat` dans `ETAT-ACTUEL.md` et `ROADMAP.md` ; mode d'application qui calcule les valeurs, **montre la différence avant toute écriture**, **refuse si un marqueur manque ou est dupliqué**, ne remplace que le contenu entre marqueurs ; historique documentaire conservé (journal, bilan, git) | après le checkpoint ; proposition relue avant toute écriture |
| 3. Relais allégé | remplacement du contenu courant par le modèle, vérifié contre une **liste des informations nécessaires à la reprise** (rôles, règles, état, documents qui font foi, prochaine action, restrictions) ; l'ancien relais reste dans git | après le checkpoint, et avec l'étape 2 |
| 4. Contrôle final de transition | relance des essais (non-régression, sabotages, séparation des niveaux), des empreintes et de la couverture ; vérification que le générateur de périmètres et le module v2 s'exécutent sur T1 **sans écrire** (exécution à blanc) | avant toute utilisation opérationnelle |
| 5. Périmètre de T1 | généré par `perimetre-v2.mjs`, livré pour **acceptation explicite** | autorisation distincte |
| 6. Audit de T1, pilote | module v2 en mode bloquant ; lecture intégrale de chaque fiche, justification de chaque champ ; tri simple ou complexe comme aide seulement | acceptation du périmètre |
| 7. Bilan du pilote | taille, lectures portées à l'arbitrage, erreurs relevées ; décision sur T4 et sur une éventuelle préapprobation des périmètres suivants | arbitrage |

## 3. Ce qui reste fermé

QC-1, QC-2, HP-1 à HP-4, G1 à G7, le bloc F, E5, le balayage des relations, l'application des 185 corrections ; toute modification des données, normes, registres, snapshots ou tests. **Décomptes conservés** : lot 3, 148 sur 377 ; bloc B, 79 sur 148 ; 185 corrections dans 165 ENTRY ; V1-11 libre.
