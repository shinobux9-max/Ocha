# Étape 2 · A2-05 — contrôle final de transition (étape 4 du plan de transition) : proposition

**Date** : 2026-10-20
**Statut** : **proposition, non exécutée.** Préparation autorisée le 2026-10-20, avec la clôture de l'étape 3 (bilan du volet 2, §8.67) : « Préparer le contrôle final de transition, étape 4, en proposition uniquement. » Le script `a2-05-travail/controle-final-transition.mjs` est écrit et vérifié par `node --check` (code 0) ; lancé sans option, il n'affiche que le plan, avec le code 2 voulu. **Il n'a pas été exécuté** : ni essai à blanc de T1, ni relance des essais. **Aucun périmètre opérationnel de T1** n'est préparé ni adopté ; aucun audit lexical ; aucun verdict ; aucune correction appliquée ; aucune donnée, norme, aucun registre, snapshot, outil du dépôt ni test modifié ; aucun `git add`, commit ni push.

## 1. Objet

Le plan de transition (`etape2-A2-05-plan-transition.md`, §2, étape 4) prévoit, avant toute utilisation opérationnelle de l'outillage v2 :
- la relance des essais : non-régression, sabotages, séparation des niveaux ;
- les empreintes et la couverture ;
- la vérification que le générateur de périmètres et le module v2 s'exécutent sur T1 **sans écrire**.

L'arbitrage du 2026-10-20 y ajoute un **essai à blanc de T1** (B10 à B12, 24 sens), limité au périmètre et sans audit lexical ni verdict. Il demande de vérifier la couverture, les identifiants, les règles de criblage, les comparables et les protections historiques.

Ce contrôle dit seulement si l'outillage v2 est prêt. **Il ne remplace ni la génération du périmètre de T1, ni son acceptation explicite (étape 5), ni l'audit (étape 6).**

## 2. Les neuf contrôles proposés

| Contrôle | Ce qui est vérifié | Comment, sans rien écrire dans le dépôt |
|---|---|---|
| **CF-1 · Couverture** | les 377 sans omission ni doublon ; 148 arbitrés, 229 restants ; T1 = B10, B11, B12, soit 24 sens distincts, tous restants | `couverture-lot3.mjs`, registre des tranches |
| **CF-2 · Protections historiques** | 27 empreintes ; les 27 rapports arbitrés identiques à leur version du commit `78031638` ; réécriture du manifeste refusée | `verifierEmpreintes` ; `git diff --quiet 78031638 -- <27 chemins>` ; `empreintes-lot3.mjs --ecrire`, dont le refus a lieu avant toute écriture |
| **CF-3 · Non-régression, sabotages, séparation des niveaux** | B6 à B9 sans différence ; générateur sur B8 et B9 ; sabotages refusés ; mode bloquant par défaut (B6 bloqué, B9 non bloqué) | `essais-outillage-v2.mjs` relancé sur une **copie temporaire** de l'arbre (`data/`, `docs/`, `reconstruction/`, `tools/`, `a2-05-travail/`) : le script écrit son rapport dans la copie, qui doit être **identique** à `docs/rapports/etape2-A2-05-outillage-essais.md` ; le rapport du dépôt n'est pas réécrit |
| **CF-4 · Identifiants** | toutes les ENTRY publiées ont une source canonique ; `v_718` → `hj_v_1`, `v_719` → `hj_v_2` | `correspondance` du module v2 |
| **CF-5 · Essai à blanc de T1 : générateur** | 24 sens exactement ; règles du criblage toutes définies ; décisions des ENTRY toutes validées ; sens hors des 147 ; comparables, autres livraisons, bloc F, corrections retenues et risques **comptés** ; refus d'écrire sur un périmètre arbitré | `produirePerimetre` vers un fichier temporaire, **supprimé aussitôt** : seuls des nombres et des refus sont rapportés, aucun texte de périmètre n'est livré |
| **CF-6 · Essai à blanc de T1 : module v2** | résolution des 24 sens (sens, ENTRY, source canonique, fiche source, candidat du criblage, hors des 147, décisions validées) ; **refus sans fiches d'examen** ; refus d'écrire sur un rapport arbitré | contrôles en mémoire ; `produire` appelé **sans aucune fiche** (`F` vide) : le refus est le résultat attendu, et aucun verdict n'est fourni ni produit |
| **CF-7 · Synchronisation et relais** | recalcul en mémoire idempotent ; décomptes 148/377, 79/148, 185, 165, V1-11 ; relais allégé conforme | `planifier` en mémoire ; `controle-relais-allege.mjs --apres-application` |
| **CF-8 · Socle** | `run.mjs verify` ; `run.mjs assemble` sans `--write` (684 ENTRY) ; suite de tests ; `check-layers` ; `git diff --check` ; zones protégées non modifiées | commandes en lecture seule |
| **CF-9 · Innocuité** | aucun des 27 rapports arbitrés modifié par le contrôle lui-même | empreintes avant et après |

**Les comparables (CF-5)** ne sont que comptés : comparables nommés par les règles, sens de même catégorie, autres livraisons, comparables du bloc F. Leur liste fera partie du périmètre de T1 (étape 5), qui n'est pas préparé ici.

## 3. Ce que le contrôle ne fait pas

- Il ne livre **aucun périmètre de T1** : le fichier que produit le générateur est temporaire, supprimé dans l'essai même, et n'est ni relu ni exporté.
- Il n'ouvre **aucune fiche source pour la juger**, ne propose **aucun verdict**, ne fournit au module v2 **aucune fiche d'examen**.
- Il n'écrit rien dans le dépôt. Les sorties vont dans un dossier temporaire, supprimé même en cas d'échec ; le contrôle CF-9 le vérifie sur les rapports arbitrés.
- Il ne modifie ni l'outillage v2, ni `sync-stable.mjs`, ni `tools/`, ni les tests.

## 4. Points d'attention

1. **CF-3 et la date du rapport d'essais** : `essais-outillage-v2.mjs` écrit une date fixe (2026-10-18), sans horodatage. Un rapport identique est donc attendu si rien n'a changé. Toute différence serait rapportée comme un écart, à arbitrer, et non tolérée d'office.
2. **CF-7 et le relais** : le contrôle `--apres-application` du relais doit tolérer les sous-sections ajoutées au bilan après la mise en service (§8.67 et suivantes), à condition qu'elles s'ajoutent à la fin, sans rien modifier d'autre. Cette tolérance explicite est ajoutée et vérifiée dans ce cycle. Elle n'assouplit aucune autre exigence.
3. **Durée** : la copie temporaire de l'arbre et la suite de tests font du contrôle une opération de quelques minutes.
4. **Ce que signifie un échec** : tout contrôle en échec arrête la transition à l'étape 4 ; il est rapporté tel quel, sans être requalifié.

## 5. Décisions demandées

1. **Le contenu du contrôle** : les neuf contrôles conviennent-ils, ou faut-il en ajouter, en retirer ou en préciser ?
2. **L'autorisation d'exécuter** `node a2-05-travail/controle-final-transition.mjs . --executer`, une fois, avec livraison de sa sortie entière et de son code de sortie.
3. **La suite**, sur autorisations distinctes : l'étape 5 (génération du périmètre de T1, pour acceptation explicite) ne commence qu'après l'arbitrage du résultat de l'étape 4.

## 6. Formalisation de l'étape 3, faite dans ce cycle

Le §8.67 du bilan du volet 2 inscrit la clôture de l'étape 3. Le §8.66 et ses sept doctrines sont inchangés, et le relais allégé n'est pas réécrit. La sauvegarde de départ est conservée jusqu'au checkpoint Git de la transition. Les vérifications demandées (relais et références, 27 empreintes, idempotence, décomptes, zones protégées, `git diff --check`) sont rapportées dans la note d'export.

**Décomptes conservés** : lot 3, 148 sur 377 ; bloc B, 79 sur 148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.
