# Étape 2 · A2-05 — contrôle final de transition (étape 4) : résultats de l'exécution

**Date** : 2026-10-20
**Statut** : **résultats d'une exécution unique, en attente d'arbitrage.** **L'étape 4 n'est pas clôturée et l'étape 5 n'est pas lancée.** Autorisation du 2026-10-20 (relecteur, par délégation ; relayée par l'utilisateur) : « J'approuve les neuf contrôles CF-1 à CF-9 et autorise une seule exécution du contrôle final de transition. » Aucun périmètre opérationnel de T1, aucune fiche d'examen, aucun verdict ; aucun audit lexical ; aucune correction appliquée ; aucun rapport arbitré, aucune donnée, norme, aucun registre ni test modifié ; aucun `git add`, commit ni push.

## 0. Arbitrage du 2026-10-20

Arbitrage (ChatGPT, par délégation ; relayé par l'utilisateur) : « La relecture des résultats du contrôle final de transition est favorable. Je retiens les neuf contrôles CF-1 à CF-9 comme conformes et autorise la clôture documentaire de l'étape 4. » **L'étape 4 est clôturée documentairement.** La sortie intégrale et les refus attendus sont conservés tels quels ci-dessous ; le contrôle n'est pas réexécuté.

**Constat postérieur à l'arbitrage, sans effet sur la conformité des neuf contrôles** : le nombre de corrections retenues compté par l'essai à blanc de CF-5 (8) est **incomplet**. La génération du périmètre de T1 a montré que le générateur v2 ne retrouve pas V2-84 (レジ袋), inscrite au bilan du volet 2 sous l'identifiant source canonique `hj_v_1`, alors qu'il la cherche sous l'identifiant publié `v_718` ; les corrections retenues sur les ENTRY de T1 sont **9**. CF-5 ne comparait pas ce nombre à une référence ; sa conformité n'est pas en cause, mais le comptage de référence l'est. Détail et portée : `docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre.md`, §6.4 ; aucune correction de l'outil n'est faite.

## 1. Avant l'exécution

- **Version du script** : `a2-05-travail/controle-final-transition.mjs` (11 786 octets, SHA-256 `eec7eff467706de2f87aa01d03d5499be735eb248f7d2146c34e444d70df10ae`) est **identique, caractère pour caractère, au texte exporté et relu**. La comparaison porte sur la partie 6 de la note `note-export-transition-etape3-cloture-etape4.md` et sur le fichier `05-relais.md` de l'archive relue. Une première comparaison avait rendu « faux » : l'erreur venait de mon extraction, décalée d'un caractère, non du script. Une fois l'extraction corrigée, la comparaison est vraie.
- **État relevé** : `git status --porcelain` (175 lignes) ; empreintes des 27 rapports arbitrés ; aucun dossier temporaire `ocha-cf-*` ; zones protégées (`data/`, `reconstruction/`, `tools/`, `tests/`, `docs/conception/`) sans modification.

## 2. Exécution

`node a2-05-travail/controle-final-transition.mjs . --executer`, lancée **une seule fois**, de 16:08:02 à 16:08:29 (heure locale) : **code de sortie 0**. La sortie intégrale, reprise du fichier de sortie sans retouche, figure dans la note d'export (partie 2) :

```
conforme CF-1  couverture et T1 : 148 arbitrés, 229 restants ; T1 : 24 sens (B10, B11, B12)
conforme CF-2  protections historiques : 27 empreintes ; git diff 78031638 sur les 27 : code 0 ; réécriture du manifeste : code 1
conforme CF-3  non-régression, sabotages, séparation des niveaux (copie temporaire) : essais : code 0 ; rapport d'essais identique à celui du dépôt ; rapport du dépôt inchangé
conforme CF-4  identifiants canoniques : 684 ENTRY publiées ; sans source : aucune
conforme CF-5  essai à blanc de T1 : générateur de périmètres : 24 sens, 22 ENTRY, 9 règles (toutes définies), 27 comparables nommés, 82 de même catégorie, 18 d'autres livraisons, 0 du bloc F, 8 correction(s) retenue(s), 6 risque(s) relevé(s) ; sortie temporaire supprimée ; refus sur docs/rapports/etape2-A2-05-volet1-lot3-B1-perimetre.md : oui
conforme CF-6  essai à blanc de T1 : module v2 : 24 sens résolus ; sans fiches : refusé ; écriture sur docs/rapports/etape2-A2-05-volet1-lot3-B9.md : refusée
conforme CF-7  synchronisation stable et relais allégé : idempotent : true ; 148/377, 79/148, 185, 165, V1-11 ; relais : 30 conformes sur 30 (code 0)
conforme CF-8  socle : verify 0 ; assemble 0 (684 ENTRY, 35 identifiant(s) retiré(s), 0 entrée(s) écartée(s)) ; tests 0 (ℹ pass 510) ; check-layers 0 ; git diff --check 0 ; zones protégées : intactes
conforme CF-9  aucun rapport arbitré modifié par le contrôle : 27 inchangés

9 conformes sur 9
```

## 3. Résultat de chaque contrôle

| Contrôle | Résultat | Ce qui a été obtenu |
|---|---|---|
| CF-1 · Couverture | conforme | 148 arbitrés, 229 restants ; T1 = B10, B11, B12 : 24 sens distincts, tous restants |
| CF-2 · Protections historiques | conforme | 27 empreintes ; les 27 rapports identiques à `78031638` (`git diff --quiet`, code 0) ; **refus attendu** : réécriture du manifeste refusée (code 1) |
| CF-3 · Non-régression, sabotages, séparation des niveaux | conforme | `essais-outillage-v2.mjs`, relancé sur une copie temporaire, rend le code 0 ; son rapport est **identique** à `docs/rapports/etape2-A2-05-outillage-essais.md` ; le rapport du dépôt n'a pas été réécrit |
| CF-4 · Identifiants | conforme | 684 ENTRY publiées, toutes avec une source canonique ; `v_718` → `hj_v_1`, `v_719` → `hj_v_2` |
| CF-5 · Essai à blanc de T1, générateur | conforme | nombres au §4 ; sortie temporaire supprimée ; **refus attendu** : écriture sur un périmètre arbitré (`…-lot3-B1-perimetre.md`) refusée |
| CF-6 · Essai à blanc de T1, module v2 | conforme | 24 sens résolus (sens, ENTRY, source canonique, fiche, candidat, hors des 147, décisions validées) ; **refus attendus** : sans fiches d'examen, refusé ; écriture sur un rapport arbitré (`…-lot3-B9.md`), refusée |
| CF-7 · Synchronisation et relais | conforme | recalcul idempotent ; 148/377, 79/148, 185, 165, V1-11 ; relais : 30 sur 30 |
| CF-8 · Socle | conforme | `verify` 0 ; `assemble` 0 (684 ENTRY, 35 retraits, 0 écartée) ; 510 tests réussis ; `check-layers` 0 ; `git diff --check` 0 ; zones protégées intactes |
| CF-9 · Innocuité | conforme | 27 rapports arbitrés inchangés |

## 4. Les nombres des essais à blanc de T1

Ce sont des comptages pris dans un fichier temporaire, aussitôt supprimé. **Ce n'est pas un périmètre** : aucune liste de comparables, aucun texte de périmètre n'a été lu, gardé ni exporté.

| Grandeur | Valeur |
|---|---|
| Sens | 24 (B10, B11, B12) |
| ENTRY | 22 |
| Règles du criblage | 9, toutes définies |
| Comparables nommés par les règles | 27 |
| Sens publiés de même catégorie de niveau 2 | 82 |
| Comparables d'autres livraisons | 18 |
| Comparables du bloc F | 0 |
| Corrections déjà retenues sur ces ENTRY | 8 (non appliquées) |
| Risques relevés automatiquement | 6 |

Ces nombres ne sont ni des verdicts ni une préparation du périmètre. Le périmètre de T1 (étape 5) sera généré à part, sur autorisation, et soumis à une acceptation explicite.

## 5. Après l'exécution

- **Fichiers temporaires** : aucun dossier `ocha-cf-*` ne reste, et aucun dossier `ocha-*` n'a été créé dans le dossier temporaire du système depuis le début de l'exécution. Le seul `ocha-essais-v2-*` présent date du 2026-10-18 et n'appartient pas à cette exécution.
- **Dépôt** : aucun fichier modifié depuis 16:08:01 (recherche par date de modification, hors `.git/` et `node_modules/`) ; aucun fichier de rapport nommé T1.
- **27 empreintes historiques** : identiques à celles relevées avant l'exécution (`sha256sum -c`, code 0).
- **Zones protégées** : aucune modification.
- **État Git** : `git status --porcelain` identique à celui d'avant (`diff`, code 0) ; HEAD et `origin/ocha-v2` à `78031638c0f81dca1b167e3f57f5a891767fc4cb` ; index vide.

## 6. Incidents

Aucun pendant l'exécution. Avant l'exécution, une seule anomalie : la comparaison erronée décrite au §1, due à mon extraction et non au script.

## 7. Décisions demandées

1. **L'arbitrage du résultat** de l'étape 4 : 9 sur 9 conformes, code 0.
2. Le cas échéant, **la clôture de l'étape 4**, sur autorisation distincte.
3. Puis l'**étape 5** (génération du périmètre de T1 par `perimetre-v2.mjs`, pour acceptation explicite), sur autorisation distincte.

**Décomptes conservés** : lot 3, 148 sur 377 ; bloc B, 79 sur 148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.
