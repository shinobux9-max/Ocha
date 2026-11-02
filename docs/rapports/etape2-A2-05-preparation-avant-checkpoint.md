# Étape 2 · A2-05 — préparation avant checkpoint : règle complémentaire et références Git

**Date** : 2026-11-02
**Statut** : **règle complémentaire appliquée le 2026-11-02, sur autorisation (§1). L'alternative (§3 à §6) reste une proposition, non appliquée** : le relais, son contrôle, `CLAUDE.md`, les versions figées et leur manifeste sont inchangés, et toutes ses mesures ont lieu sur des copies jetables.

**Demande** : « Je recommande l'ajout ciblé de : `/REGLES-CONSTRUCTION.md -text`. Vérifier le chemin, l'état des octets et les conséquences de cette règle sur les deux configurations Git. » ; « Ne pas réécrire une version figée et son manifeste uniquement pour obtenir un relais à 30/30. Préparer une alternative documentée » ; « Ne modifier aucun contrôle à ce stade. »

## 1. Règle complémentaire `/REGLES-CONSTRUCTION.md -text`

**Vérifications** (`a2-05-travail/arbitrage-F/complement-gitattributes/preparer-complement.mjs`, code 0) :

| Élément | Constat |
|---|---|
| Chemin | suivi, à la racine, casse exacte |
| Octets | 13 707 octets, `de46103a…`, aucun CR |
| Blob | `39f100a1…` : égal aux octets du fichier, sans filtre |
| Manifeste | hors des 45 |
| Capture voisine | `docs/legacy/REGLES-CONSTRUCTION.md` garde `text eol=crlf` : la règle ancrée ne le capture pas |

**Diff**, une ligne, après `/ROADMAP.md text eol=crlf` : `.gitattributes` passe de `8efbae1e…` à `da81234c…` ; diff `eae8abae…`.

**Conséquences mesurées** :

| Mesure | `true`, sans la règle | `true`, avec | `false`, sans | `false`, avec |
|---|---|---|---|---|
| Blob calculé | inchangé | inchangé | inchangé | inchangé |
| Horodatage changé, `git status` | rien | rien | rien | rien |
| Fichier réenregistré en CRLF, `git diff --numstat` | 0 / 0 | **269 / 269** | 269 / 269 | 269 / 269 |

**Simulation complète, avec la règle** (`dossier-checkpoint.mjs --attributs=…`, code 0, liste de travail actuelle) :

| Restauration | Empreintes | Tests | Fichiers différents | dans les zones | Arbre propre |
|---|---|---|---|---|---|
| `core.autocrlf=true` | 45/45 | 510/510 | 333 sur 1 143 | **1** | oui |
| `core.autocrlf=false` | 45/45 | 510/510 | 29 sur 1 143 | **1** | oui |

**`REGLES-CONSTRUCTION.md` revient à l'identique dans les deux cas.** Le seul écart restant dans les zones est la trace `.diff`, conservée telle quelle. Aucun blob suivi ne change.

**Le coût est unique** : sous `true`, un réenregistrement en CRLF, aujourd'hui normalisé et invisible, apparaîtrait comme une modification de tout le fichier, et serait stocké tel quel s'il était indexé. Il serait donc vu à la relecture du diff. C'est cohérent avec les zones déjà en `-text`.

**Appliquée le 2026-11-02, après la consignation** : `complement-gitattributes/application/appliquer-complement.mjs`, essai 10 refus sur 10, lancé une fois, code 0, 43 vérifications ; `.gitattributes` `da81234c…`, non committé.

## 2. Pourquoi le relais tombe après chaque commit

Le contrôle confond trois choses :

| Notion | Aujourd'hui | Défaut |
|---|---|---|
| Référence historique, `78031638…` | ligne « Git », figée par la version du 2026-10-20 | elle devient fausse dès le commit suivant, sous le libellé « dernier commit confirmé » |
| Dernier checkpoint | même ligne | il n'a aucune place propre, et ne peut pas entrer dans un texte figé |
| HEAD et distant | C5a exige qu'ils égalent le commit cité | aucun commit ne peut se citer lui-même |

**Le relais ne peut donc pas être à 30 sur 30 sur un état committé** : c'est structurel, non un oubli. Le scénario C ne le corrigeait que dans la copie de travail, en réécrivant une version figée à chaque checkpoint.

## 3. Alternative proposée : un fichier de références distinct

**Principe** : chaque notion a une seule source.

| Notion | Source | Évolution |
|---|---|---|
| Référence historique | `references-git.json`, `historique` ; citée par le candidat et le relais | **ne change jamais** |
| Dernier checkpoint | `references-git.json`, `checkpoint` | actualisée après un push, sur autorisation |
| HEAD et distant | **git seul**, jamais un document | `git rev-parse`, `git ls-remote` |
| Texte figé | candidat, version figée, manifeste | **inchangés** |

**Les contrôles deviennent** :

| Contrôle | Aujourd'hui | Proposé |
|---|---|---|
| C5a | commit cité = HEAD = `origin/ocha-v2` | la référence historique est citée par le candidat ; la référence déclarée descend d'elle, et elle est ancêtre de HEAD et d'`origin/ocha-v2` |
| C5a `--strict` | n'existe pas | en plus : tout est poussé, et rien ne suit la référence, sinon le fichier de références lui-même |
| C8, Q1 | « Sur quel commit repartir ? », lu dans le candidat | « Quel est le dernier checkpoint déclaré ? », lu dans le fichier, vérifié contre git |
| C9c, C10a | relais = version figée | relais = version figée, **à sa seule ligne « Git » près**, de forme exacte, citant la référence historique |
| C4, C10b | inchangés | inchangés |
| **C10c** | **inchangé** | **inchangé** : il lit la version figée de `CLAUDE.md`, qui reste identique |

**Mécanisme de clôture** : `a2-05-travail/cloture-checkpoint.mjs`, proposé, est le seul chemin prévu pour écrire une référence.

| Mode | Exige | Effet |
|---|---|---|
| `--declarer <commit> --libelle` | branche, index vide, HEAD = commit = `origin/ocha-v2` = distant réel (`git ls-remote`), descendance de la référence précédente, relais à 30 sur 30 | écrit la référence et son sceau, lance `--strict`, **restaure le fichier si `--strict` échoue** ; n'indexe, ne committe et ne pousse rien |
| `--verifier` | sceau juste, référence committée, tout poussé, HEAD = distant réel, rien après la référence sinon le fichier lui-même, `--strict` à 30 sur 30 | clôture constatée, sinon refus |
| `--etat` | rien | nomme l'état intermédiaire, en lecture seule, et rappelle que seul `--verifier` constate une clôture |

**Obligation** : **toute clôture de checkpoint exige `--verifier`, qui lance le relais en `--strict`. Un relais normal à 30 sur 30 n'est jamais la preuve d'une clôture Git.** Le libellé de C5a le dit, en mode normal. La démonstration D9 le montre : à l'état 4, clôture non poussée, le relais normal est à 30 sur 30, alors que `--strict` et `--verifier` refusent.

**Le contrôle lit le sceau** : une référence sans sceau, ou au sceau faux, fait tomber C5a **même en mode normal**. Aucun mode ne contourne `--strict`, et une option inconnue n'a aucun effet.

**Limite** : le sceau détecte un oubli ou une écriture à la main ; ce n'est pas une preuve cryptographique. Un sceau recalculé à la main passe le relais ; `--verifier` relit toutefois le distant réel et relance `--strict`. Rien n'empêche techniquement un commit fait sans ce script : le mécanisme rend l'omission visible et bloquante au contrôle.

## 4. Démonstrations sur clones

Mesures de `references-git/evaluer-references.mjs`, code 0, sur une copie jetable reliée à un distant nu, pour que le push et `git ls-remote` soient réels.

| Exigence | Démonstration | Résultat |
|---|---|---|
| Clôture sans contrôle strict refusée | aucun mode, mode inventé, vérification sans déclaration ; référence sans sceau, sceau faux ; vérification avant le commit de clôture, avant son push | 7 refus ; relais en écart dans les deux cas écrits à la main |
| Contrôle strict échoué bloquant | `--strict` saboté ; le même avec `--sans-strict --force` ; relais en écart avant déclaration | 3 refus, fichier restauré à l'octet |
| Commit nouveau détecté | non poussé ; poussé, non déclaré | `--strict` en écart ; 3 refus ; le second cycle se clôt ensuite normalement |
| HEAD et distant réel vérifiés | avant le push ; commit différent de HEAD ; hash abrégé ; distant en retard sur la référence locale ; distant injoignable ; index non vide | 6 refus |
| Écarts de la ligne « Git » limités | autre référence, retour à la forme ancienne, un mot ajouté, ligne supprimée, seconde ligne, ligne ajoutée, autre ligne modifiée | 7 sur 7 : C10a |
| C10c et version figée intacts | ligne de C10c identique dans le contrôle proposé ; version figée, manifeste figé, `CLAUDE.md` sabotés | 4 sur 4 détectés ; C10c conforme à chaque étape |
| Contrôles après clôture et restauration | ci-dessous | conformes |
| États intermédiaires nommés | `--etat` à chaque état | 5 sur 5 |
| Relais normal insuffisant | état 4 : normal à 30 sur 30, `--strict` et `--verifier` refusent | conforme |

| Étape | Relais normal | `--strict` |
|---|---|---|
| E0. Alternative posée, avant commit | 30/30 | 30/30 |
| E1. Commit N, non poussé | 30/30 | 29/30, C5a |
| E2. Push de N, référence non déclarée | 30/30 | 29/30, C5a |
| E3. Référence déclarée, non committée | 30/30 | 30/30 |
| E4. Commit de clôture et push | 30/30 | **30/30** |
| E5. Restauration de N, `true` et `false` | 30/30 | 29/30, C5a |
| E6. Restauration du commit de clôture, `true` et `false` | 30/30 | **30/30** |
| E7. Commit ordinaire, non poussé | 30/30 | 29/30, C5a |
| E8. Ce commit poussé, non déclaré | 30/30 | 29/30, C5a |
| E9. Second cycle clos | 30/30 | **30/30** |

**Restauration du commit de clôture, sous `true` et `false`** : 45 empreintes, pilote conforme, **510 tests sur 510**.

**E5 est attendu** : N ne peut pas se citer lui-même ; c'est le commit de clôture qui porte sa référence. Un checkpoint est donc complet à E4, non à E1.

## 5. Ce que cela impliquerait

**Modifications normatives** : **aucune**. Aucun addendum, aucun snapshot, aucun registre, aucune donnée. E5 n'est pas concerné.

**Une décision de gouvernance reste nécessaire** : admettre que le relais en service diffère de sa version figée par une seule ligne, à la forme exacte. Elle s'ajouterait à la règle explicite du 2026-10-20 pour le bilan, et se consignerait au bilan du volet 2.

**Modifications techniques** :

| Fichier | Changement | Volume |
|---|---|---|
| `a2-05-travail/references-git.json` | nouveau | `16037a88…`, `checkpoint: null` |
| `a2-05-travail/cloture-checkpoint.mjs` | nouveau | `fbe08161…`, 60 lignes |
| `a2-05-travail/controle-relais-allege.mjs` | sept remplacements ciblés | +15 / −4, diff `468dac3e…` |
| `docs/relecture/reprise-A2-05.md` | la ligne « Git » | +1 / −1, diff `31b85b75…` |
| `arbitrage-F/checkpoint/dossier-checkpoint.mjs` | valeurs attendues du relais, selon que l'alternative est installée | déjà modifié, script de préparation |
| Candidat, version figée, manifeste, `CLAUDE.md`, 45 documents | **aucun** | — |

**Ce que l'on perd** : en mode normal, le relais ne dénonce plus un commit non déclaré ; il l'affiche seulement dans le détail de C5a. `--strict` et `--verifier` reprennent ce rôle.

**Ce que cela ne règle pas** : `CLAUDE.md`, ligne 128, garde `7803163`, et toute modification fait tomber C10a. Elle deviendra fausse après le checkpoint. Conformément à la décision, je n'y touche pas ; cela reste à arbitrer.

**L'ordre compte** : pour que N porte le fichier de références et le script, l'alternative doit être appliquée **avant** lui. Sinon, N se restaurera à 28 sur 30, et seul le commit suivant en bénéficiera.

## 6. Variantes écartées

| Variante | Raison |
|---|---|
| Ne rien faire | 28 sur 30 permanent, et un écart « attendu » à interpréter à chaque contrôle, ce que le protocole interdit |
| Scénario C | réécrit une version figée à chaque checkpoint : écarté par la décision |
| Ne changer que C5a | le relais en service continuerait d'affirmer un « dernier commit confirmé » faux |

## 7. États intermédiaires d'un checkpoint

| État | Action, chacune sur autorisation distincte | `--etat` | Relais normal | `--strict` | `--verifier` |
|---|---|---|---|---|---|
| 1 | commit N | 1 | 30/30 | 29/30 | refus |
| 2 | push de N | 2 | 30/30 | 29/30 | refus |
| 3 | `--declarer N` | 3 | 30/30 | 30/30 | refus : référence non committée |
| 4 | commit de clôture | 4 | 30/30 | 29/30 | refus : commits non poussés |
| 5 | second push | 5 | 30/30 | 30/30 | à lancer |
| 6 | `--verifier` | 5 | 30/30 | 30/30 | **clôture constatée** |

**Seul l'état 6 vaut clôture.** Le relais normal est à 30 sur 30 à chaque état : il ne distingue pas une clôture d'une absence de clôture.

## 8. Installation préparée, non appliquée

`arbitrage-F/references-git/application/appliquer-installation.mjs` : **à lancer sur autorisation distincte.**

| Fichier | Départ | Proposé | Diff |
|---|---|---|---|
| `controle-relais-allege.mjs` | `cd8e307e…` | `ab750916…` | `468dac3e…`, C5a, C8/Q1, C9c, C10a |
| `docs/relecture/reprise-A2-05.md` | `a651cc84…` | `d0586d42…` | `31b85b75…`, ligne « Git » seule |
| `references-git.json` | absent | `16037a88…` | fichier nouveau, `checkpoint: null` |
| `cloture-checkpoint.mjs` | absent | `fbe08161…` | fichier nouveau |

**Préconditions** : celles du moteur (index vide, 45 empreintes, fins de ligne, ancres uniques, aperçu vide, relais à 30 sur 30, recalculs, diffs régénérés identiques), plus l'absence des deux fichiers nouveaux et les empreintes de cinq fichiers préservés : version figée du relais, version figée de `CLAUDE.md`, manifeste figé, candidat, `CLAUDE.md`.

**Essai sur copie** : 15 refus sur 15, exécution nominale conforme (67 vérifications), seconde exécution refusée, dépôt réel inchangé.

**Après installation, simulée sur copie** : commit et restauration sous `true` et `false`, 45 empreintes, 510 tests sur 510, relais normal à 30 sur 30, blobs limités à la liste.

## 9. Recommandation

**Je recommande d'installer l'alternative avant le commit de checkpoint.** Séquence, chaque étape sur autorisation distincte : installation ; consignation complémentaire, variante `avec` ; dossier régénéré ; puis les six états du §7.

**Rien de cela n'est exécuté.** Le correctif du contrôle et le script de clôture n'existent que sur des copies jetables ; leurs versions proposées sont dans `a2-05-travail/arbitrage-F/references-git/`.
