# Étape 2 · A2-05 — relais de reprise allégé (étape 3 du plan de transition)

**Date** : 2026-10-20
**Statut** : **proposition, non mise en service.** Préparation autorisée le 2026-10-20 par l'arbitrage qui clôt l'étape 2 (ChatGPT, par délégation ; relayé par l'utilisateur) : « J'autorise la **préparation de l'étape 3 en proposition uniquement**. » Le relais en service, `docs/relecture/reprise-A2-05.md`, **n'est pas modifié** ; `CLAUDE.md` non plus. Aucune donnée, norme, aucun registre, snapshot, outil ni test n'est modifié ; `sync-stable.mjs` est inchangé ; ni T1 ni audit lexical ; aucun `git add`, commit ni push.

## 0. Arbitrage du 2026-10-20

Arbitrage (ChatGPT, par délégation ; relayé par l'utilisateur) : « La proposition est favorablement accueillie. » **D1** : option A retenue ; exception à `CLAUDE.md` §3 accordée **uniquement pour cette opération, sur ce fichier précis**, sans précédent ; l'ancien relais doit rester récupérable intégralement depuis `78031638`. **D2** : candidat accepté sous deux précisions (quatre états : proposé, arbitré, appliqué, committé / poussé, sans statut normatif nouveau ; « Prochaine action » réduite au renvoi à `ETAT-ACTUEL.md`). **D3** : taille acceptée (environ 8,4 Ko), sans sacrifier une règle de reprise. **D4** : liste détaillée des doctrines du volet 2 à intégrer dans une sous-section du bilan, avec renvoi depuis le relais, formulations et provenance conservées, sans règle nouvelle ; intégration présentée et relue avant écriture. **D5** : correction future de `tools/export-relecture.mjs` retenue en principe ; outil non modifié ; absence d'A2-GLOBAL-v1 à continuer de signaler. **D6** : gel de `note-relais.md` par un renvoi, historique conservé ; diff préparé avant application. **Correction de `CLAUDE.md`** acceptée : `558f150` → `7803163`, dans la seule mention d'état du §5. « Ces décisions approuvent les choix de conception. Elles n'autorisent pas encore l'écriture des quatre documents. » Suite : `etape2-A2-05-relais-allege-versions-finales.md`. La proposition ci-dessous est conservée telle qu'elle a été relue.

## 1. En bref

- **Relais candidat** : `a2-05-travail/reprise-A2-05-allegee-candidat.md`, **8 441 octets**, contre 268 511 pour le relais en service (3,1 %). Sept sections : rôles et accords ; état courant ; documents qui font foi ; règles de relecture ; restrictions ; prochaine action ; export. Sa première ligne, un commentaire « CANDIDAT, NON EN SERVICE », disparaît à la mise en service.
- **Principe** : un document de reprise opérationnelle, **non normatif**, qui dit où sont les choses et ne recopie pas ce que calcule `sync-stable.mjs` : les décomptes restent dans le bloc `a2-05:etat`, qui fait foi.
- **Contrôles** : `a2-05-travail/controle-relais-allege.mjs` (lecture seule) ; 19 contrôles ; résultats au §5 ; essai de reprise simulée au §6.
- **Rien de nécessaire à la reprise n'est perdu** : chacune des 24 sections du relais en service a une destination vérifiée (§3). Ce qui ne subsisterait que dans git est listé au §4 : de l'historique, et une liste de doctrines dont le candidat garde les principes.
- **Correction de `CLAUDE.md`** : diff ciblé d'une seule référence (§8), non appliqué.
- **Six décisions** à prendre avant toute mise en service (§10), dont une **contradiction de règle** : remplacer le contenu du relais revient à réécrire un fichier entier, ce que `CLAUDE.md` §3 interdit.

## 2. Le relais proposé

| § | Contenu | Pourquoi ici |
|---|---|---|
| en-tête | objet ; **le relais ne fait pas foi** ; où est l'historique (git `7803163`, bilan §8, journal) | priorité des documents normatifs sur le résumé |
| 1 | rôles ; accords distincts ; « un avis favorable n'en vaut aucun » | règle de toute relecture |
| 2 | git (branche, commit confirmé, travaux non committés) ; étape ; volets, lots, blocs ; **renvoi au bloc `a2-05:etat` pour tous les décomptes** ; corrections non appliquées ; état de la transition | état courant, sans chiffre recopié |
| 3 | table « besoin → document qui fait foi » : gouvernance, pilotage, six snapshots (A2-REL-v1.1 actif), addenda A1 à A9, registres, non normatif (legacy, E5), arbitrages, corrections, découpage, couverture, empreintes, méthode, scripts, doctrines du volet 2 | chemins exacts |
| 4 | huit règles de relecture, chacune avec sa source | rappel ; la source fait foi |
| 5 | chantiers fermés ; aucune autorisation implicite ; six opérations, six accords ; documents de pilotage ; codes de sortie ; artefacts à ne pas committer | restrictions |
| 6 | prochaine action : **renvoi à `ETAT-ACTUEL.md`** et une phrase datée ; opérations interdites | prochaine action |
| 7 | commande d'export ; lacune signalée (A2-GLOBAL-v1 absent de l'export) | reprise d'une relecture |

**Taille.** 8,4 Ko au lieu des 5 Ko visés : les accents et les chemins comptent, et la table du §3 porte l'essentiel des renvois. On pourrait descendre vers 6 Ko en retirant le §7 et la règle 8 du §4 ; je ne le recommande pas, puisque l'arbitrage refuse toute limite qui ferait perdre une information nécessaire (décision D3, §10).

## 3. Inventaire comparatif, section par section

Légende : **conservé** (repris dans le candidat), **déplacé** (l'information existe déjà dans le document désigné, que le candidat cite), **supprimé** (historique, périmé ou redondant ; retrouvable dans git, au commit `7803163`). Tailles mesurées sur le relais en service.

| Section du relais en service | Octets | Sort | Destination vérifiée (contrôle C7) |
|---|---|---|---|
| En-tête (dates de mise à jour, 2026-10-08 à 2026-10-18) | 3 149 | supprimé (historique) | journal d'`ETAT-ACTUEL.md` ; bilan §8 |
| §1.0 : puces par cycle, du 2026-10-12 au 2026-10-18 | 112 018 | **état courant conservé** (candidat §2) ; le reste supprimé (historique) | journal d'`ETAT-ACTUEL.md` (une ligne par tâche) ; bilan §8.1 à §8.64 (un cycle par sous-section) ; git |
| §1.1 et §1.2 : états antérieurs au checkpoint du 2026-10-12 | 11 872 | supprimé (historique) | idem |
| §2 Règles de contrôle | 862 | conservé (candidat §1, §5, §7) ; commande d'export rendue générique (la référence `5a8687b` est périmée) | `CLAUDE.md` §5 « Contrôle » |
| §3 Structure validée d'A2-05 (avec l'historique de la provenance) | 8 313 | conservé en une puce (candidat §2) ; détail déplacé | « Terminé et arbitré » d'`ETAT-ACTUEL.md` ; bilan §3 et §4 ; bilan de provenance |
| §4 Volet 2 : cumul arbitré | 8 153 | déplacé | `docs/rapports/etape2-A2-05-audit-null.md` ; bilan §1 |
| §5 Les dix modifications du volet 2 et la procédure d'application (lot 27 véhicule, D1614, `publish --write`) | 2 568 | déplacé | bilan §2 (table) et §5 (procédure : « lot véhicule sans ENTRY propre », D1614) |
| §5 bis Corrections du volet 1 | 2 655 | déplacé | bilan §8 (listes V1-n et V2-n, décompte global) |
| §6 Arbitrages de fond | 1 610 | **principes conservés** (candidat §4, règle 8) ; formulations détaillées déplacées | A2-L3 §6, A2-GLOBAL §4.4, A5, A6 ; fiches arbitrées de l'audit des `null` |
| §6 bis Suivi transversal (onze points) | 3 527 | déplacé (renvoyé au lot 1 du volet 1, arbitré) | bilan §3.2 ; `docs/rapports/etape2-A2-05-coherence-retroactive.md` |
| §7 Les 94 `categorie-nulle` restants, et ses quatre familles | 7 860 | supprimé (historique : tranches closes) | audit des `null`, tranches 2 à 7 |
| §8 à §8 quinquies : périmètres proposés des tranches du volet 2 | 23 538 | supprimé (historique : périmètres arbitrés, clos) | audit des `null`, sections T2 à T7 |
| §9 Scripts et sorties | 5 869 | déplacé | `a2-05-travail/INVENTAIRE-SCRIPTS.md` (plus complet et tenu à jour) |
| §10 Prochaine action : un paragraphe « 0. » de 69 353 octets, cumul des cycles du 2026-10-08 au 2026-10-12, et quatre points datés du 2026-10-08 | 69 939 | supprimé (**périmé** : il s'arrête à la tranche 6 de provenance) ; remplacé par le candidat §6 | rubrique « Prochaine action » d'`ETAT-ACTUEL.md` ; bilan §8 |
| §11 Anomalie du 2026-10-10 (code 255) et la règle retenue | 4 483 | **règle conservée** (candidat §5) ; constat détaillé supprimé (historique) | git (ancien relais) |
| Puces du 2026-10-18, ajoutées après le §11 | 2 072 | supprimé (redondant) | bilan §8.61 à §8.64 |

**Ce que le candidat ajoute** et que le relais en service ne disait pas, ou plus : la liste exacte des six snapshots et la version active des relations ; la priorité des documents normatifs sur le relais ; la séparation des six opérations ; l'état de la transition (étapes 1 à 7) ; la lacune de l'export pour A2-GLOBAL-v1. Le §10 du relais en service, la seule « prochaine action » qu'il donne, date du 2026-10-08 : **le relais en service est aujourd'hui trompeur sur ce point**, ce qui plaide pour l'allègement.

## 4. Ce qui ne se retrouverait plus que dans git

Ces informations ne figurent dans aucun autre document du dépôt que le relais en service. Après la mise en service, elles resteraient lisibles par `git show 7803163:docs/relecture/reprise-A2-05.md` (contrôle C2c).

1. **Le détail des pushes et des contrôles d'index du 2026-10-12** (sorties de `git ls-remote`, avance et retard) : historique ; le journal d'`ETAT-ACTUEL.md` en garde le résultat.
2. **Le constat détaillé de l'anomalie du 2026-10-10** (commande exacte, sortie entière) : historique ; **la règle qui en découle est reprise** (candidat §5).
3. **La consolidation des doctrines du §6 en une seule liste.** Chaque élément existe dans une fiche arbitrée de l'audit des `null` : une partie du corps, une unité de mesure ou un compteur est classé L ; un nom de position est un `lieu` ; « personne générique » ne s'étend pas à un ensemble complet, qui relève de la totalité. La liste elle-même n'existe que dans le relais en service. Le candidat garde les quatre principes généraux (règle 8). Si le relecteur veut la liste complète à portée de main, elle peut rejoindre le relais (environ 0,8 Ko de plus) ou une sous-section du bilan (décision D4).
4. **Le garde-fou local** qui refuse la première création d'un fichier : propriété de l'environnement de Claude Code ; il se manifeste de lui-même et n'apporte rien à une reprise.
5. **L'ancienne commande d'export** (`--ref 5a8687b…`) : périmée ; le candidat en donne la forme générique.

**Aucune information nécessaire à la reprise n'est perdue** (contrôles C4, C7 et C8).

## 5. Contrôles

`node a2-05-travail/controle-relais-allege.mjs .` : lecture seule, aucun fichier écrit ; code 0 si tout est conforme.

**Premier passage, avant la rédaction de ce rapport** : 18 conformes sur 19, code 1. Seul écart, C2a : le chemin `docs/rapports/etape2-A2-05-relais-allege-proposition.md`, cité par le candidat (§6), n'existait pas encore. C'est ce rapport.

**Second passage, après la rédaction de ce rapport et la mise à jour du cycle** : voir la note d'export (partie 2), qui reprend la sortie entière et son code de sortie.

| Contrôle | Objet |
|---|---|
| C1 | taille du candidat, comparée au relais en service |
| C2a à C2d | chaque chemin cité existe ; les six snapshots ; l'ancien relais lisible dans git ; chaque section citée (bilan §8.42, §8.60, §8.61 ; B9 §2 ; périmètre §6 et §10 ; `CLAUDE.md` §4 et §5) existe et dit ce que le candidat lui attribue |
| C3 | aucun décompte calculé n'est recopié dans le candidat |
| C4 | les 27 informations obligatoires de l'arbitrage (§2, points 1 à 6) sont présentes |
| C5a à C5f | commit cité = HEAD = `origin/ocha-v2` ; bloc identique dans les deux documents ; aucune tranche acceptée ; chantiers fermés présents dans « Étape en cours » ; état de la transition ; rubrique « Prochaine action » identique dans les deux documents |
| C6 | snapshots, addenda A1 à A9 et huit registres du dépôt, tous couverts |
| C7 | les 24 sections du relais en service : destination existante, qui contient le repère attendu |
| C8 | essai de reprise simulée (§6) |
| C9a à C9c | couverture et 27 empreintes ; zones protégées non modifiées (`data/`, `reconstruction/`, `tools/`, `tests/`, `docs/conception/`, `CLAUDE.md`) ; relais en service non remplacé |

**Cohérence avec les arbitrages validés.** Le candidat ne qualifie rien autrement que les documents de pilotage. E5 est « ni adopté ni normatif ». T1 n'a pas de périmètre accepté. L'étape 2 est appliquée et acceptée. Les corrections sont retenues, non appliquées. QC-1, QC-2, HP-1 à HP-4, G1 à G7, le bloc F, E5 et le balayage des relations restent fermés. Les contrôles C5 vérifient une partie de ces points par script ; pour le reste, je l'ai vérifié en lisant les rubriques une par une.

## 6. Essai de reprise simulée

**Méthode automatique (C8).** Douze questions qu'un relecteur doit pouvoir résoudre en partant **du seul candidat** et en suivant ses renvois. Chaque réponse est tirée du candidat ou du document qu'il désigne, puis comparée à la vérité du dépôt : git, `calculerEtat`, le registre des tranches, le README des snapshots, `CLAUDE.md`.

| Question | Chemin suivi depuis le candidat | Réponse attendue |
|---|---|---|
| Q1 Sur quel commit repartir ? | §2 | `78031638…` = `origin/ocha-v2` |
| Q2 Lot 3 | §2 → bloc `a2-05:etat` d'`ETAT-ACTUEL.md` | 148/377 |
| Q3 Bloc B | §2 → bloc de `ROADMAP.md` | 79/148 |
| Q4 Corrections | §2 → bloc ; « aucune appliquée » | 185 / 165 ENTRY / 0 appliquée |
| Q5 Numéro libre | §2 → bloc | V1-11 |
| Q6 Relations | §3 | A2-REL-v1.1 (= README des snapshots) |
| Q7 E5 normatif ? | §3 | non |
| Q8 Périmètre de T1 accepté ? | §5 | non (= registre : T1 planifiée) |
| Q9 Un avis favorable autorise-t-il un commit ? | §1 | non (= `CLAUDE.md`) |
| Q10 Motivations des arbitrages | §3 | bilan du volet 2, §8 |
| Q11 Rapports protégés | §3 → manifeste | 27 (= `calculerEtat`) |
| Q12 Prochaine action qui fait foi | §6 | rubrique d'`ETAT-ACTUEL.md` |

**Lecture manuelle, faite par moi en me limitant au candidat et à ses renvois.**
- **Normes** : le §3 mène aux six snapshots et aux neuf addenda. La seule norme citée qu'un relecteur sans accès au dépôt ne trouverait pas dans l'export est A2-GLOBAL-v1 ; le candidat le signale (§7).
- **Restrictions** : le §5 suffit.
- **Prochaine action** : le §6, confirmé par `ETAT-ACTUEL.md`.

**Une seule limite** : un relecteur qui n'a que l'export ne peut pas lancer `git show 7803163:…` ; l'historique ancien ne lui est accessible que si la note d'export le joint. C'est voulu, puisque l'historique n'est pas nécessaire à la reprise, et le §4 dit ce qu'il contient.

## 7. Constats

1. **L'export ne contient pas `A2-GLOBAL-v1`.** La liste `REFERENCES` de `tools/export-relecture.mjs` comprend cinq snapshots, sans le global. Les relectures du volet 2 l'ont pourtant cité (A2-GLOBAL §4.4). L'outil n'est pas modifié (outillage hors de l'autorisation) ; le candidat signale la lacune. Décision D5.
2. **`docs/relecture/note-relais.md`** (36 Ko, mise à jour le 2026-10-12) double en partie le relais (rôles, consignes, état). Les exports d'A2-05 passent par `--note`, et l'outil ne la lit donc pas ; elle vieillit. Elle n'entre pas dans l'autorisation. Décision D6.
3. **Le coût de l'export ne vient plus du relais.** Le relais n'est recopié dans un export que si une note le joint. Le fichier `01-gouvernance.md` recopie en entier `ETAT-ACTUEL.md` (326 Ko), dont le journal et la table des décisions d'A2-04 forment l'essentiel. Le relais allégé ne règle pas ce point ; je le signale pour une étape ultérieure, sans rien proposer ici.
4. **Le §6 du candidat demande une phrase à chaque cycle.** C'est la seule partie datée hors du bloc calculé. Pour éviter qu'elle diverge, elle renvoie à `ETAT-ACTUEL.md`, qui fait foi, et le contrôle C5f vérifie la rubrique de ce document.

## 8. Correction ciblée de `CLAUDE.md` (proposition, non appliquée)

Fichier : `a2-05-travail/proposition-CLAUDE-md-reference-git.diff`, calculé sur une copie temporaire. L'occurrence est unique et le reste du fichier est identique octet pour octet. `git apply --check` rend le code 0, et le fichier n'est pas modifié.

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

Aucune règle de gouvernance n'est touchée (§1 à §4 et §6, délégation comprise). La référence au relais (`docs/relecture/reprise-A2-05.md`) reste valable avec l'option A du §9 ; avec l'option B, elle changerait (décision D1).

## 9. Mise en service : deux options, non exécutées

- **Option A, remplacement du contenu** (celle du plan de transition) : le contenu de `docs/relecture/reprise-A2-05.md` est remplacé par le candidat, première ligne retirée. Les chemins cités ailleurs (`CLAUDE.md`, `ETAT-ACTUEL.md`, `ROADMAP.md`) restent valables. **Elle contredit la règle de `CLAUDE.md` §3** (« jamais réécrire un fichier entier existant ») et demande donc une exception explicite, limitée à ce fichier. L'ancien contenu reste dans git (`7803163`) ; un contrôle d'avant écriture vérifierait que `git show 7803163:…` est lisible et que le relais en service n'a pas changé depuis l'aperçu.
- **Option B, nouveau fichier** : le candidat devient `docs/relecture/reprise-A2-05-v2.md`, et le relais en service reçoit une seule ligne en tête, ajoutée par remplacement ciblé, qui renvoie au nouveau fichier. Cette option respecte la règle. Mais elle oblige à changer la référence au relais dans `CLAUDE.md` §5 (une modification de gouvernance de plus) et dans les deux documents de pilotage.

**Recommandation : l'option A**, sur une exception explicite. Le plan accepté prévoyait déjà le remplacement, l'historique est garanti par git, et les références restent stables. Dans les deux cas : aperçu de la différence avant écriture, contrôle relancé après, indexation, commit et push sur des autorisations distinctes.

## 10. Décisions à prendre avant toute mise en service

1. **D1 · Option de mise en service** : A (remplacement du contenu, avec une exception explicite à `CLAUDE.md` §3) ou B (nouveau fichier et renvoi).
2. **D2 · Contenu du candidat** : accepté tel quel, ou à réviser (sections, formulations, sources citées).
3. **D3 · Taille** : 8,4 Ko acceptés, ou réduction vers 6 Ko (retrait du §7 et de la règle 8).
4. **D4 · Doctrines détaillées du volet 2** (§4, point 3) : les laisser dans git, les ajouter au relais (environ 0,8 Ko), ou les consigner dans une sous-section du bilan.
5. **D5 · A2-GLOBAL-v1 absent de l'export** : signalement seul, ou correction de `tools/export-relecture.mjs` sur une autorisation d'outillage distincte.
6. **D6 · `docs/relecture/note-relais.md`** : la laisser en l'état, la geler par une ligne de renvoi, ou la traiter avec le relais.

S'y ajoute, indépendamment : **l'autorisation d'appliquer la correction de `CLAUDE.md`** (§8). Puis, pour chaque écriture : la mise en service, l'indexation, le commit et le push, chacun sur un accord distinct.

**Décomptes conservés** (bloc `a2-05:etat`, inchangé) : lot 3, 148 sur 377 ; bloc B, 79 sur 148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.
