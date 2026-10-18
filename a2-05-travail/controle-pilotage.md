# A2-05 · Contrôle documentaire de `ETAT-ACTUEL.md` et de `ROADMAP.md`

**Date** : 2026-10-12
**Statut** : **soumis à relecture. Aucune validation documentaire n'est donnée.** Les deux fichiers sont modifiés dans l'arbre de travail ; ils ne sont ni indexés, ni committés, ni poussés. Ce contrôle est écrit par un script (`maj-lot3-A4.mjs`, dossier de travail), qui s'arrête à la première discordance.

## 1. Ce qui a été fait, et quand

- **Rattrapage** : préparé le 2026-10-12, à la demande de l'utilisateur, à partir de l'état arbitré d'A2-05 (jusqu'à l'arbitrage d'A2). Les différences lui ont été présentées dans la session ; **aucun export n'a suivi**, et le relecteur ne l'a pas reçu.
- **Actualisation** : faite avec cette livraison, pour l'arbitrage d'A3 (28 sur 377) et les précisions sur le préalable E5.
- **Règle retenue** : ces deux documents sont vérifiés à chaque clôture significative ; `ETAT-ACTUEL.md` porte le détail de l'état, `ROADMAP.md` seulement l'avancement et les dépendances des étapes ; le détail des arbitrages reste dans leurs rapports. La règle est inscrite à la table des décisions d'`ETAT-ACTUEL.md`.

## 2. Contrôles de cohérence

**L'état d'A2-05 est écrit en cinq rubriques, identiques mot pour mot dans les deux fichiers** (contrôle du script) : terminé et arbitré ; proposé, non validé ; corrections retenues, non appliquées ; reste à faire et blocages ; prochaine action.

| État arbitré ou proposé | Dans `ROADMAP.md` | Dans `ETAT-ACTUEL.md` | Concordant avec le relais |
|---|---|---|---|
| volet 2 : 147 sur 147 (L 136, F 2, C 9, N 0) | oui | oui | oui |
| contrôle de provenance clos : 278 nuances (119, 20, 139) | oui | oui | oui |
| lot 3 : périmètre de 377 candidats, 40 livraisons | oui | oui | oui |
| A1, A2 et A3 arbitrées : 28 sur 377, 349 restent | oui | oui | oui |
| A4 : proposée, non arbitrée | oui | oui | oui |
| addendum `interrogatif` : proposition, ni adoptée ni normative | oui | oui | oui |
| 180 corrections dans 161 ENTRY, non appliquées | oui | oui | oui |
| bloc F suspendu au préalable E5, avec sa séquence | oui | oui | oui |
| HP-1 à HP-4 consignées, non commencées | oui | oui | oui |
| volet 3 (G1 à G7) non commencé | oui | oui | oui |
| prochaine action : arbitrage d'A4 ; A5 pas avant | oui | oui | oui |

| Chiffre ou état périmé, recherché dans le bloc d'état | `ROADMAP.md` | `ETAT-ACTUEL.md` |
|---|---|---|
| 124 corrections | absent | absent |
| 130 nuances restantes | absent | absent |
| 358 candidats restants | absent | absent |
| 19 candidats arbitrés | absent | absent |
| A3 proposée | absent | absent |

- **Bilan du volet 2** : le §8.37 (arbitrage d'A3, 28 sur 377) est présent, et la liste des corrections compte toujours 180 lignes dans 161 ENTRY.
- **Statuts des jalons de `ROADMAP.md`** : inchangés. A2-05 reste 🔵 (├── A2-05 Audit vocabulaire              🔵) ; l'étape 2 reste en cours ; aucun jalon ne passe à ✅. Les sections 7 à 15 de la feuille de route ne sont pas touchées.
- **Ce que `ROADMAP.md` ne reçoit pas** : le détail des verdicts, des réserves et des arbitrages de livraison, qui restent dans les rapports. Le journal des tâches est dans `ETAT-ACTUEL.md` seulement.
- **Limite de ce contrôle** : il vérifie la présence de formulations attendues et l'absence de chiffres périmés dans le bloc d'état ; il ne relit pas le reste des deux fichiers, dont les parties historiques gardent légitimement leurs chiffres d'époque (par exemple « 124 corrections » dans la ligne du checkpoint).

## 3. Contradictions relevées

1. **`CLAUDE.md`, §5 : périmé, non corrigé.** Il porte l'état du checkpoint : « 124 corrections retenues, dans 112 ENTRY », « 130 restent », « 377 candidats restent à examiner », et dit qu'avant le checkpoint les branches étaient à `5a8687b`. L'état arbitré est : 180 corrections dans 161 ENTRY, provenance close, 28 candidats arbitrés sur 377, branches à `558f150`. Ce fichier est lu au début de chaque session. **Je ne l'ai pas modifié** : la demande portait sur deux fichiers. Je recommande de l'aligner, sur accord explicite.
2. **`ETAT-ACTUEL.md`, journal des tâches : une ligne dépassée, complétée sans être réécrite.** La ligne du checkpoint `3756fe3` dit « non poussé » ; `ocha-v2` et `origin/ocha-v2` sont à `558f150`. Une ligne ajoutée après elle dit le commit de clôture et le push ; la ligne d'origine est conservée.
3. **Relais** : concordant avec les deux fichiers sur tous les points du tableau. Le relais garde ses mises à jour successives, datées ; seul son dernier état fait foi.
4. **Références normatives** : aucune contradiction relevée. `docs/conception/` n'est pas modifié ; la proposition d'addendum est présentée partout comme non adoptée, et le numéro A10 comme pressenti.
5. **Présentation** : les listes ajoutées à `ROADMAP.md` emploient « - », le reste du fichier « -   » ; sans effet sur le contenu, à aligner si le relecteur le souhaite.

## 4. Différences complètes, par rapport au commit `558f150`

`git diff --stat` : 2 files changed, 111 insertions(+), 33 deletions(-)

```diff
diff --git a/ETAT-ACTUEL.md b/ETAT-ACTUEL.md
index bafd005..3957020 100644
--- a/ETAT-ACTUEL.md
+++ b/ETAT-ACTUEL.md
@@ -16,20 +16,44 @@ travailler, dans `REGLES-CONSTRUCTION.md`.
 comprend la reconstruction du vocabulaire selon l'architecture sémantique A2 (projets A2-01 à
 A2-05) et la réidentification de la grammaire (addendum A4).
 
-**Tâche en cours (au 2026-10-12) : A2-05 · Audit global du vocabulaire.** **A2-05 est en cours ;
-l'étape 2 n'est pas terminée.** Trois volets, aux périmètres validés le 2026-10-07. **Volet 2**
-(audit individuel des 147 `null`) : terminé et arbitré le 2026-10-08, 147 sur 147 (L 136, F 2, C 9,
-N 0). **Volet 1** (cohérence rétroactive, axes C1 à C10) : criblage validé (443 candidats) ; lot 1
-arbitré (19 sens : 14 conformes, 5 écarts) ; **377 candidats restent à examiner** ; lot 2, contrôle
-de provenance des nuances : tranche 1 (34 unités), bloc 1 bis, tranches 2 à 5 et les 2 nuances hors
-JLPT arbitrés ; 148 des 278 nuances du plan recalculé sont arbitrées, **130 restent** (tranche 6 :
-47 ; tranche 7 : 39 ; tranche 8 : 44) ; périmètre de la tranche 6 arbitré le 2026-10-12, audit de la
-livraison 6a autorisé, non commencé. **Volet 3** (contrôles globaux G1 à G7) : non commencé. **124
-corrections retenues, dans 112 ENTRY, aucune appliquée** (dix modifications du volet 2, V1-1 à V1-5,
-V2-1 à V2-109) : `data/`, les lots, le journal, les registres, les snapshots, l'inventaire des
-avertissements, les outils et les tests sont ceux du commit `3d67594`. Relais :
-`docs/relecture/reprise-A2-05.md` ; liste des corrections :
-`docs/rapports/etape2-A2-05-bilan-volet2.md`, §8.
+**Tâche en cours (au 2026-10-12, rattrapage documentaire) : A2-05 · Audit global du vocabulaire.**
+**A2-05 est en cours ; l'étape 2 n'est pas terminée.** Trois volets, aux périmètres validés le
+2026-10-07. Les détails des arbitrages sont dans les rapports cités ; seul l'état est donné ici.
+
+- **Terminé et arbitré.** **Volet 2** (audit individuel des 147 `null`) : 147 sur 147, arbitré le
+  2026-10-08 (L 136, F 2, C 9, N 0). **Volet 1** (cohérence rétroactive, axes C1 à C10) : criblage
+  validé (443 candidats) ; **lot 1** arbitré (19 sens : 14 conformes, 5 écarts) ; **lot 2, contrôle
+  de provenance des nuances, clos documentairement le 2026-10-12** : les 278 nuances du plan sont
+  arbitrées (119 sourcées, 20 assumées, 139 écarts), avec, hors plan, les 34 unités de la tranche 1
+  et 2 nuances hors JLPT (bilan : `docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md`) ;
+  **lot 3, examen individuel des 377 candidats restants** : périmètre arbitré le 2026-10-12 (377
+  sens, 332 ENTRY, six blocs A à F, 40 livraisons ;
+  `docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md`) ; livraisons **A1** (10 sens), **A2**
+  (9 sens) et **A3** (9 sens) arbitrées : 28 conformes, aucun écart, aucune correction. **28
+  candidats arbitrés sur 377 ; 349 restent.**
+- **Proposé, non validé.** La livraison **A4** du lot 3 (8 sens, 8 conformes proposés), en attente
+  d'arbitrage. Une **proposition d'addendum sur la fonction `interrogatif`** (préalable normatif
+  E5, révision 3), jugée prête à être soumise à un arbitrage normatif distinct, **ni adoptée ni
+  normative**, rangée dans `docs/rapports/` et non dans `docs/conception/` ; numéro A10 seulement
+  pressenti. Aucune norme n'est modifiée.
+- **Corrections retenues, non appliquées.** **180 corrections, dans 161 ENTRY** : dix modifications
+  du volet 2, V1-1 à V1-5 (lot 1), V2-1 à V2-165 (provenance). `data/`, les lots, le journal, les
+  registres, les snapshots, l'inventaire des avertissements, les outils et les tests sont ceux du
+  commit `3d67594`. Liste : `docs/rapports/etape2-A2-05-bilan-volet2.md`, §8.
+- **Reste à faire, et blocages.** Les 349 candidats du lot 3, livraison par livraison, chacune sur
+  autorisation distincte. **Blocage : le bloc F (17 sens portant `interrogatif`) est suspendu**
+  au préalable E5, qui doit aboutir avant la clôture de l'étape 2, selon une séquence arbitrée :
+  adoption explicite de l'addendum ; puis périmètre opérationnel de contrôle, validé ; puis examen
+  des 17 sens et recherche d'omissions, comptabilisés séparément. Le rapport de conclusion du
+  criblage sur C6 et C9. Quatre vérifications hors périmètre (HP-1 à HP-4 : ひらがな, 漢字, 右, 左),
+  consignées et non commencées, dont le cadre reste à proposer. Le **volet 3** (contrôles globaux
+  G1 à G7), non commencé. Puis l'arbitrage global et l'application des corrections, sur
+  autorisations distinctes.
+- **Prochaine action.** L'arbitrage d'A4 ; l'arbitrage normatif distinct de la proposition
+  d'addendum. A5 ne commence pas avant l'arbitrage d'A4.
+
+Les travaux postérieurs au checkpoint `558f150` (committé et poussé le 2026-10-12) sont
+documentaires et **ne sont ni committés ni poussés**. Relais : `docs/relecture/reprise-A2-05.md`.
 
 **Tâche précédente, terminée : A2-04 · Reconstruction du vocabulaire N5.** A2-03 est fermé (rapport final
 `docs/rapports/etape2-A2-03.md`). 5.0 validée (infrastructure). **5.1 · lot 0 « identité » validé** (rapport final
@@ -362,7 +386,7 @@ livraison, relecture, tests verts, commit.
 | 6 | A2-04 · 5.1 à 5.15 · Lots | 5.1 lot 0 · identité (60 entrées : 27 groupes de doublons candidats, formes et lectures avec « / »), avant tout lot thématique ; puis lots thématiques regroupés par ancienne catégorie (environ 50 entrées, cible indicative) : proposition, relecture sur le rapport généré, validation, commit dans l'espace de travail | 5.1 à 5.15 validées (lots 0 à 14), corrections de 5.13-C comprises ; lots 15 à 17 validés (暖かい, lot 07, fusionnée dans 温かい) ; lot 18 : thème et périmètre à arbitrer. À partir du lot 15, les lots sont désignés par leur numéro (« A2-04 · lot 15 », lot 16, etc.), sans nouveau numéro de sous-tâche : 5.16 et 5.17 restent la passe finale et la publication |
 | 7 | A2-04 · 5.16 · Passe finale | fusions, relations, tags de lieu, `vocab-retired.json`, remappage des références | ✅ fait (lot 26, validé le 2026-10-07, committé `9f3dc2b`, poussé) ; tags de lieu et écriture dans `data/` renvoyés à 5.17 et A2-05 par arbitrage |
 | 8 | A2-04 · 5.17 · Publication | une seule opération : vocabulaire canonique, validateur activé, `events.js` (E1 à E4) ; l'ancienne app cesse de fonctionner sur `ocha-v2` | ✅ fait (rapport `docs/rapports/etape2-A2-04-lot27-publication-5-17.md` ; committé `3d67594` le 2026-10-07, poussé) |
-| 9 | A2-05 · Audit | échantillon relu, statistiques, cohérence, rapport ; **audit individuel des 120 `categorie-nulle` et des 27 `type-nul`**, distinction entre `null` légitimes et données à corriger (point de sortie de l'étape 2) | **en cours** : volet 2 arbitré (147 sur 147) ; volet 1, 377 candidats et 130 nuances de provenance à examiner ; volet 3 non commencé ; 124 corrections retenues, aucune appliquée (`docs/relecture/reprise-A2-05.md`) |
+| 9 | A2-05 · Audit | échantillon relu, statistiques, cohérence, rapport ; **audit individuel des 120 `categorie-nulle` et des 27 `type-nul`**, distinction entre `null` légitimes et données à corriger (point de sortie de l'étape 2) | **en cours** : volet 2 arbitré (147 sur 147) ; volet 1 : lots 1 et 2 arbitrés (provenance close, 278 nuances), lot 3 en cours (28 candidats arbitrés sur 377, 349 restent ; bloc F suspendu au préalable E5) ; volet 3 non commencé ; 180 corrections retenues dans 161 ENTRY, aucune appliquée (`docs/relecture/reprise-A2-05.md`) |
 | 10 | G2 à G9 · Graphe | normalisation, ordre de référence, graphe, relations dérivées, accessibilité (S1, R1), `forms` / `construction` (G7), validation (R4), branchement sur `learning` | à faire |
 | 11 | Registre de phrases | format, identifiants, reconstruction depuis `exemples.json` et les anciens exemples ; requis avant l'étape 3 | à faire |
 | 12 | Clôture de l'étape 2 | scénario de bout en bout, rapport `docs/rapports/etape2.md` | à faire |
@@ -620,6 +644,8 @@ modifier ses parties verrouillées.
 | 2026-10-06 | A2-04 · préalable au lot 23 · **addendum A9 validé** (après une relecture favorable, sans correction ; validation autorisée par ChatGPT, sur délégation) : `connecteur`, `discours`, `politesse`, `quantificateur`, `comparatif` et `intensifieur` ont une définition normative, appliquée sens par sens ; la doctrine du lot 20 reste en vigueur pour les fonctions non définies ; aucun outil, aucun registre, A2-LING-v1 inchangés ; また, sens 2, réservée à l'audit A2-05 | `docs/conception/addendum-A9-fonctions-linguistiques.md`, `docs/conception/00-sommaire.md` |
 | 2026-10-06 | A2-04 · lot 23 fermé : lot 23 validé (proposition révisée une fois), sur dix-huit choix arbitrés : première application d'A9, fonctions posées sens par sens (`connecteur` 8, `discours` 10, `politesse` 5, `intensifieur` 1) ; cumul `discours` + `politesse` pour la seule prise de congé « polie » (では, それでは) ; le registre n'est pas la politesse (はい, じゃ) ; un sens par emploi établi par la fiche, sans sens fourre-tout ; じゃ et じゃあ deux ENTRY ; la classe suit la fiche, non la fonction (じゃ en `interjection`) ; aucune catégorie, types nuls justifiés ; l'exemple altéré de いいえ journalisé, ni repris ni remplacé | `reconstruction/a2-04/lots/lot-23.json`, `docs/rapports/etape2-A2-04-lot23-valide.md` |
 | 2026-10-04 | Passage à Claude Code : les modifications se font directement dans le dépôt (plus d'archives ni d'empreintes) ; Claude réalise, Codex relit et contrôle sur le dépôt réel, l'utilisateur arbitre ; aucun commit sans accord | `CLAUDE.md` |
+| 2026-10-12 | A2-05 · volet 1, lot 3 · **méthode arbitrée** (avec le périmètre) : deux verdicts définitifs, « conforme » et « écart » ; un statut provisoire, « suspendu — préalable normatif », qui ne compte pas comme arbitré ; aucune catégorie, aucun type, aucune fonction ni aucun sens absent de la fiche ou du registre n'est inventé ; corrections nouvelles numérotées à partir de V1-6 ; une livraison à la fois, chacune sur autorisation distincte ; les conclusions d'une livraison servent de comparaison aux suivantes, jamais de verdict automatique | `docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md` ; rapports A1 et A2 |
+| 2026-10-12 | **Maintenance des documents de pilotage** (demande de l'utilisateur) : à chaque clôture de lot, de tranche ou de jalon significatif, vérifier si `ETAT-ACTUEL.md` et `ROADMAP.md` doivent être actualisés ; `ETAT-ACTUEL.md` reflète les décisions arbitrées, les travaux restants, les blocages et la prochaine action ; `ROADMAP.md` n'est mis à jour que si l'avancement ou les dépendances des étapes changent ; distinguer le terminé, le proposé non validé et les corrections retenues non appliquées ; laisser le détail des arbitrages dans leurs rapports ; signaler les contradictions avec le relais et les références normatives | cette table ; `ROADMAP.md`, §16 |
 
 ---
 
@@ -969,12 +995,30 @@ modifier ses parties verrouillées.
   relève du chantier de données. A2-05 doit fournir la preuve que les `null` restant après audit sont
   intentionnels et conformes aux normes. **L'étape 2 ne peut pas être considérée comme terminée tant
   que cette vérification n'est pas faite.**
-- **A2-05 · état de la preuve (au 2026-10-12).** L'audit individuel des 147 `null` est fait et
-  arbitré : 136 légitimes (L), 2 F et 9 C, soit dix modifications de SENSE retenues pour onze
+- **A2-05 · état de la preuve (au 2026-10-12, rattrapage).** L'audit individuel des 147 `null` est
+  fait et arbitré : 136 légitimes (L), 2 F et 9 C, soit dix modifications de SENSE retenues pour onze
   avertissements. **Ces modifications ne sont pas appliquées : le point de sortie n'est donc pas
-  atteint.** Restent, avant toute clôture de l'étape 2 : l'examen des 377 candidats du volet 1, les
-  130 nuances de provenance, le volet 3, l'arbitrage global, puis l'application des corrections
+  atteint.** Le contrôle de provenance des nuances est clos (278 nuances arbitrées). Restent, avant
+  toute clôture de l'étape 2 : 349 des 377 candidats du volet 1 (lot 3), dont les 17 du bloc F ; le
+  rapport sur C6 et C9 ; le volet 3 ; l'arbitrage global ; puis l'application des 180 corrections
   retenues, sur autorisations distinctes.
+- **A2-05 · préalable normatif E5, fonction `interrogatif` (ouvert).** La fonction est posée sur 17
+  sens (15 ENTRY) sans définition normative ; aucune décision de journal ne la pose. Un dossier
+  préparatoire est accepté comme base de travail
+  (`docs/rapports/etape2-A2-05-prealable-E5-interrogatif.md`) ; une **proposition d'addendum**
+  existe (`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`, révision 3), jugée
+  prête à être soumise à un arbitrage normatif distinct, **ni adoptée ni normative**, hors de
+  `docs/conception/` ; numéro A10 seulement pressenti. **Séquence arbitrée** : adoption explicite
+  (numéro, emplacement et statut précisés, après vérification d'unicité) ; puis périmètre opérationnel
+  de contrôle, préparé et validé ; puis examen des 17 sens et recherche d'omissions, coordonnés et
+  comptabilisés séparément ; une omission découverte n'est pas ajoutée d'office aux 377 candidats.
+  Avant l'adoption et l'accord sur ce périmètre : le bloc F reste suspendu, aucune recherche
+  d'omissions n'est lancée, et les 17 décisions `type-nul` de ces sens (à examiner selon A6, sans
+  écart présumé) ne sont pas examinées. À résoudre avant la clôture de l'étape 2.
+- **A2-05 · vérifications hors périmètre HP-1 à HP-4 (ouvert, non commencé).** Quatre sens relevés
+  comme comparables pendant la livraison A1, hors des 377 candidats et non ajoutés : ひらがな et 漢字
+  (`information_contenu`), 右 et 左 (`lieu`). Leur type n'est ni validé ni infirmé ; leur cadre de
+  contrôle reste à proposer (`docs/rapports/etape2-A2-05-bilan-volet2.md`, §8.35).
 - **Bascule du validateur lexical à la publication d'A2-04** (**faite**, commit `3d67594`) : selon le plan de
   `docs/rapports/etape2-A2-03.md`, section 4 (appel par `validate-data`, retrait de l'ancien
   contrôle du vocabulaire, `lieux.json` en `vocab_tags`, références remappées, `events.js` E1 à E4,
@@ -1189,3 +1233,7 @@ modifier ses parties verrouillées.
 | 2026-10-07 | 2 · A2-04 · 5.17 | Clôture documentaire de 5.17 et annonce d'A2-05, committée et poussée sur accords explicites. | `5a8687b` |
 | 2026-10-07 au 2026-10-12 | 2 · A2-05 | Travail documentaire seulement, aucune donnée modifiée. Rangement documentaire d'A2 (snapshot `A2-GLOBAL-v1`, documents historiques dans `docs/conception/legacy/a2/`). Périmètres des trois volets validés. Volet 2 : 147 `null` audités et arbitrés (L 136, F 2, C 9). Volet 1 : criblage validé, lot 1 arbitré, contrôle de provenance arbitré jusqu'à la tranche 5 ; périmètre de la tranche 6 arbitré. 124 corrections retenues dans 112 ENTRY, aucune appliquée. | — |
 | 2026-10-12 | 2 · A2-05 | **Checkpoint documentaire committé**, sur l'accord explicite de commit relayé par l'utilisateur, après relecture favorable de la préparation (ChatGPT) : 36 fichiers (5 modifiés, 31 nouveaux), tous documentaires ; index contrôlé (5 `M`, 31 `A`, identique à la liste validée, aucun fichier interdit). Un arrêt avant le commit : `git diff --cached --check` en code 2 pour trois anomalies d'espacement dans des fichiers nouveaux, corrigées sur autorisation sans autre changement, puis contrôle en code 0. Commit `3756fe3e8076efb7dbf06933d453ec5b06612234` (« Docs: checkpoint A2-05, arbitrages des volets 1 et 2 documentes, aucune correction appliquee »), parent `5a8687b`. **Non poussé** : `origin/ocha-v2` (référence locale) reste à `5a8687b`. A2-05 reste en cours ; 124 corrections retenues, aucune appliquée ; 130 nuances de provenance et 377 candidats C1 à C10 à examiner. | `3756fe3` |
+| 2026-10-12 | 2 · A2-05 | Clôture documentaire du checkpoint, committée (`558f150`, « Docs: clore le checkpoint A2-05 apres commit ») ; **poussée** : `ocha-v2` et `origin/ocha-v2` sont à `558f150` (la ligne précédente, écrite avant le push, dit « non poussé »). | `558f150` |
+| 2026-10-12 | 2 · A2-05 | Volet 1, lot 2 : tranches 6, 7 et 8 du contrôle de provenance arbitrées ; bilan exhaustif arbitré ; **contrôle de provenance clos documentairement** (278 nuances : 119 sourcées, 20 assumées, 139 écarts). **180 corrections retenues dans 161 ENTRY, aucune appliquée.** Travail documentaire, aucune donnée modifiée. | non committé |
+| 2026-10-12 | 2 · A2-05 | Volet 1, lot 3 : périmètre arbitré (377 candidats, 40 livraisons) ; livraisons A1 et A2 arbitrées (19 conformes, aucune correction ; 358 candidats restent) ; livraison A3 proposée, non arbitrée. Préalable E5 (`interrogatif`) : dossier préparatoire accepté comme base ; proposition d'addendum en révision 2, non validée. Vérifications HP-1 à HP-4 consignées, non commencées. Rattrapage de `ROADMAP.md` et d'`ETAT-ACTUEL.md`. Travail documentaire, aucune donnée modifiée. | non committé |
+| 2026-10-12 | 2 · A2-05 | Volet 1, lot 3 : livraison A3 arbitrée (9 conformes, aucune correction ; **28 candidats arbitrés sur 377, 349 restent**) ; livraison A4 proposée, non arbitrée. Préalable E5 : proposition d'addendum en révision 3, prête pour un arbitrage normatif distinct, non adoptée ; séquence arbitrée (adoption, périmètre opérationnel, puis contrôle des 17 sens et recherche d'omissions). `ROADMAP.md` et `ETAT-ACTUEL.md` actualisés, différences soumises à relecture. Travail documentaire, aucune donnée modifiée. | non committé |
diff --git a/ROADMAP.md b/ROADMAP.md
index 3114ef6..4e79abb 100644
--- a/ROADMAP.md
+++ b/ROADMAP.md
@@ -2,7 +2,7 @@
 
 **Statut :** document de suivi global\
 **Branche concernée :** `ocha-v2`\
-**Dernière mise à jour :** 2026-10-12 (A2-05 en cours : volet 2 arbitré, volet 1 en cours, volet 3 non commencé ; aucune correction appliquée)
+**Dernière mise à jour :** 2026-10-12, rattrapage (A2-05 en cours : volet 2 arbitré ; volet 1 : lots 1 et 2 arbitrés, lot 3 en cours, 28 candidats sur 377 ; volet 3 non commencé ; 180 corrections retenues, aucune appliquée)
 
 > Ce fichier répond à une question simple : **où en est Ocha v2, et que
 > reste-t-il à faire jusqu'à la version finale ?**
@@ -602,19 +602,49 @@ Points déjà réservés pour cet audit :
     sont des mots (山羊, 生活, 措置, 継続, 迅速) ;
 -   anomalies ou décisions transversales découvertes pendant les lots.
 
-**Avancement (au 2026-10-12).** **A2-05 est en cours ; l'étape 2 n'est pas terminée.** Trois volets,
-aux périmètres validés le 2026-10-07. **Volet 2** (audit individuel des 147 `null`) : terminé et
-arbitré le 2026-10-08, 147 sur 147 (L 136, F 2, C 9, N 0). **Volet 1** (cohérence rétroactive, axes
-C1 à C10) : criblage validé (443 candidats) ; lot 1 arbitré (19 sens : 14 conformes, 5 écarts) ;
-**377 candidats restent à examiner** ; lot 2, contrôle de provenance des nuances : tranche 1 (34
-unités), bloc 1 bis, tranches 2 à 5 et les 2 nuances hors JLPT arbitrés ; 148 des 278 nuances du
-plan recalculé sont arbitrées, **130 restent** (tranche 6 : 47 ; tranche 7 : 39 ; tranche 8 : 44) ;
-périmètre de la tranche 6 arbitré le 2026-10-12, audit de la livraison 6a autorisé, non commencé.
-**Volet 3** (contrôles globaux G1 à G7) : non commencé. **124 corrections retenues, dans 112 ENTRY,
-aucune appliquée** (dix modifications du volet 2, V1-1 à V1-5, V2-1 à V2-109) : `data/`, les lots,
-le journal, les registres, les snapshots, l'inventaire des avertissements, les outils et les tests
-sont ceux du commit `3d67594`. Relais : `docs/relecture/reprise-A2-05.md` ; liste des corrections :
-`docs/rapports/etape2-A2-05-bilan-volet2.md`, §8.
+**Dépendance apparue pendant l'audit** (périmètre de la cohérence rétroactive, arbitré le
+2026-10-07) : la fonction `interrogatif`, posée sur 17 sens sans définition normative, demande un
+addendum validé **avant la clôture de l'étape 2** ; l'examen de ces 17 sens en dépend. Séquence
+arbitrée le 2026-10-12 : adoption explicite de l'addendum, puis périmètre opérationnel de contrôle,
+puis examen des 17 sens et recherche d'omissions.
+
+**Avancement (au 2026-10-12, rattrapage documentaire).** **A2-05 est en cours ; l'étape 2 n'est pas terminée.** Trois volets, aux périmètres validés le
+2026-10-07. Les détails des arbitrages sont dans les rapports cités ; seul l'état est donné ici.
+
+- **Terminé et arbitré.** **Volet 2** (audit individuel des 147 `null`) : 147 sur 147, arbitré le
+  2026-10-08 (L 136, F 2, C 9, N 0). **Volet 1** (cohérence rétroactive, axes C1 à C10) : criblage
+  validé (443 candidats) ; **lot 1** arbitré (19 sens : 14 conformes, 5 écarts) ; **lot 2, contrôle
+  de provenance des nuances, clos documentairement le 2026-10-12** : les 278 nuances du plan sont
+  arbitrées (119 sourcées, 20 assumées, 139 écarts), avec, hors plan, les 34 unités de la tranche 1
+  et 2 nuances hors JLPT (bilan : `docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md`) ;
+  **lot 3, examen individuel des 377 candidats restants** : périmètre arbitré le 2026-10-12 (377
+  sens, 332 ENTRY, six blocs A à F, 40 livraisons ;
+  `docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md`) ; livraisons **A1** (10 sens), **A2**
+  (9 sens) et **A3** (9 sens) arbitrées : 28 conformes, aucun écart, aucune correction. **28
+  candidats arbitrés sur 377 ; 349 restent.**
+- **Proposé, non validé.** La livraison **A4** du lot 3 (8 sens, 8 conformes proposés), en attente
+  d'arbitrage. Une **proposition d'addendum sur la fonction `interrogatif`** (préalable normatif
+  E5, révision 3), jugée prête à être soumise à un arbitrage normatif distinct, **ni adoptée ni
+  normative**, rangée dans `docs/rapports/` et non dans `docs/conception/` ; numéro A10 seulement
+  pressenti. Aucune norme n'est modifiée.
+- **Corrections retenues, non appliquées.** **180 corrections, dans 161 ENTRY** : dix modifications
+  du volet 2, V1-1 à V1-5 (lot 1), V2-1 à V2-165 (provenance). `data/`, les lots, le journal, les
+  registres, les snapshots, l'inventaire des avertissements, les outils et les tests sont ceux du
+  commit `3d67594`. Liste : `docs/rapports/etape2-A2-05-bilan-volet2.md`, §8.
+- **Reste à faire, et blocages.** Les 349 candidats du lot 3, livraison par livraison, chacune sur
+  autorisation distincte. **Blocage : le bloc F (17 sens portant `interrogatif`) est suspendu**
+  au préalable E5, qui doit aboutir avant la clôture de l'étape 2, selon une séquence arbitrée :
+  adoption explicite de l'addendum ; puis périmètre opérationnel de contrôle, validé ; puis examen
+  des 17 sens et recherche d'omissions, comptabilisés séparément. Le rapport de conclusion du
+  criblage sur C6 et C9. Quatre vérifications hors périmètre (HP-1 à HP-4 : ひらがな, 漢字, 右, 左),
+  consignées et non commencées, dont le cadre reste à proposer. Le **volet 3** (contrôles globaux
+  G1 à G7), non commencé. Puis l'arbitrage global et l'application des corrections, sur
+  autorisations distinctes.
+- **Prochaine action.** L'arbitrage d'A4 ; l'arbitrage normatif distinct de la proposition
+  d'addendum. A5 ne commence pas avant l'arbitrage d'A4.
+
+Les travaux postérieurs au checkpoint `558f150` (committé et poussé le 2026-10-12) sont
+documentaires et **ne sont ni committés ni poussés**. Relais : `docs/relecture/reprise-A2-05.md`.
 
 ------------------------------------------------------------------------
```
