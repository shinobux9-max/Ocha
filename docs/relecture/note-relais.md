Cette note est écrite à la main par Claude Code et mise à jour avant chaque export. Elle dit ce
que l'outil ne peut pas déduire des données : les rôles, les consignes, qui a décidé quoi, et ce
qui est attendu. L'état chiffré est dans la partie 2, relevée par l'outil.

**Dernière mise à jour de la note** : 2026-10-07. Historique : 2026-10-05, après le commit du lot 16 (`6c8fc50`) ; périmètre
du lot 17 arbitré, proposition relue et arbitrée, lot 17 validé et committé (`e9fe6a4`) ; outillage
de relecture committé (`2387d20`) ; lot 18 : périmètre arbitré, proposition livrée, vingt choix
arbitrés, révision vérifiée, lot validé et committé (`213fb2b`) ; délégation des accords à
ChatGPT ; lot 19 validé et committé (`9e75c99`) ; lot 20 : périmètre arbitré, proposition livrée,
25 choix arbitrés, révision vérifiée, lot validé et committé (`bcbc85c`) ; branche poussée
(`origin/ocha-v2` à `55acc13`) ; **lot 21 : périmètre arbitré, proposition livrée, 21 choix arbitrés, révision vérifiée, lot
validé, committé (`1cfac5b`) et poussé** (2026-10-06) ; remote `origin` corrigé vers `Ocha` ;
**lot 22 : périmètre arbitré, proposition livrée, 16 choix arbitrés et révisée, révision
vérifiée, lot validé, committé (`f3e81bc`) et poussé** ; remote `origin` remis sur `Ocha` ;
**point d'arrêt normatif sur les fonctions A2-LING ouvert** (rapport d'arbitrage livré), arbitré ;
**addendum A9 rédigé, relu, validé, committé (`fac6a60`) et poussé** ; **lot 23 : périmètre
arbitré, proposition livrée, 18 choix arbitrés et révisée, révision vérifiée, lot validé, committé
(`2c89eb0`) et poussé** ; **lot 24 : périmètre arbitré, proposition livrée, 14 choix arbitrés et révisée, lot validé,
committé (`affa45e`) et poussé**, suivi documentaire `5e9a233` poussé ; **préalable sur la classe de
など ouvert et arbitré** (2026-10-07), **lot 25 : périmètre arbitré, proposition livrée et approuvée, lot validé, committé (`b3740c7`) et
poussé**, suivi documentaire `8ce0e23` poussé ; **périmètre de la passe finale 5.16 proposé**
(2026-10-07), dans une session Claude Code cloud ; travail repris en local (VS Code), transfert
vérifié ; **périmètre de 5.16 arbitré, proposition du lot 26 livrée** (2026-10-07), **relue (avis
favorable sous une correction), quatre choix arbitrés, raison de D1613 révisée**, **révision
vérifiée par ChatGPT, traces documentaires corrigées** ; **lot 26 validé** (2026-10-07), **committé
(`9f3dc2b`) et poussé** ; **clôture documentaire préparée, périmètre de la publication 5.17 proposé**.

## 1. Les rôles

- **L'utilisateur** relaie les messages entre Claude Code et ChatGPT, et garde le dernier mot.
- **Claude Code** réalise les modifications dans le dépôt local et lance les contrôles.
- **ChatGPT** (sur ces fichiers, sans accès au dépôt ; Codex auparavant, sur le dépôt réel) relit
  et, **depuis le 2026-10-06, par délégation de l'utilisateur**, arbitre les périmètres et les choix
  lexicaux, et donne les accords de validation, de commit et de push.

**La délégation, telle que l'utilisateur l'a confirmée à Claude Code** : ces trois accords restent
distincts ; chacun doit être donné explicitement, en toutes lettres, dans un message que
l'utilisateur relaie lui-même ; un avis favorable n'en vaut aucun, et l'accord pour l'un ne vaut pas
pour les autres. L'utilisateur peut toujours décider lui-même ou reprendre la délégation ; elle ne
se modifie que sur sa parole.

## 2. Consignes pour le relecteur

1. **Claude Code réalise les modifications ; tu relis et tu recommandes** les choix les plus
   pertinents et les plus pédagogiques pour Ocha, une application d'apprentissage du japonais pour
   francophones débutants.
2. **L'utilisateur te délègue les recommandations linguistiques** : donne un choix clair et
   motivé, pas une liste d'options à égalité. Si deux choix se valent, dis lequel tu retiendrais et
   pourquoi.
3. **Trois accords restent distincts et explicites** : la validation d'un lot, le commit, le push.
   Depuis le 2026-10-06, c'est toi qui les donnes, par délégation. Écris-les en toutes lettres
   (« j'autorise la validation », « j'autorise le commit », « j'autorise le push ») et dis aussi ce
   que tu n'autorises pas : un avis favorable ne vaut aucun des trois, et Claude Code ne déduira
   jamais un accord d'un autre.
4. **Lis chaque fiche entière, exemple compris.** Une traduction, une nuance et un exemple peuvent
   se contredire ou se compléter ; les trois comptent.
5. **Aucun ajout lexical par connaissance externe** : ni sens, ni lecture, ni graphie, ni emploi
   que la fiche ne donne pas. Une confusion de la source se corrige et se journalise ; elle ne
   devient pas un sens.
6. **Distingue toujours** ce que tu vérifies toi-même sur les fichiers fournis de ce que Claude
   Code rapporte avoir contrôlé sur le dépôt.
7. **Ne prétends jamais** avoir exécuté les tests, l'assemblage ou une commande, ni avoir vérifié
   le dépôt local : tu n'y as pas accès. Écris « d'après les contrôles rapportés ».
8. **À la clôture d'un lot**, demande explicitement à l'utilisateur de lancer la préparation du
   suivant. Ne prends aucune décision lexicale avant l'accord sur son périmètre.

**Ce que tu peux vérifier toi-même ici** : la cohérence entre une fiche source (`07`), la décision
prise (`08`), sa raison (`09`) et les rapports (`06`) ; la conformité aux références (`02`, `03`,
`04`) ; les précédents cités (`07`, partie 2) ; le contenu du diff (`10`).

**Ce que tu ne peux pas vérifier** : les résultats des tests et de l'assemblage, l'état git,
l'intégrité des sources figées.

## 3. Où en est le projet

**Lot 17, « États et propriétés descriptives » : clos.** Validé sur autorisation explicite de
l'utilisateur, relu (avis favorable au commit, sans correction), committé : `e9fe6a4`. La fusion de
暖かい dans 温かい est validée avec lui. L'outillage de relecture est committé à part : `2387d20`.

**Lots 18 à 20 : clos.** Validés puis committés sur tes accords explicites : `213fb2b` (lot 18),
`9e75c99` (lot 19), `bcbc85c` (lot 20). **La branche est poussée** : `ocha-v2` et `origin/ocha-v2`
sont à `55acc13` (commit de documentation du lot 20).

**État réel, relevé par Claude Code avant le rapport de périmètre** : 638 ENTRY, 32 retraits, **49
entrées non décidées**, aucune proposition en cours ; 1 369 décisions validées (D0001 à D1369) ;
0 problème, 0 erreur, 0 attente ; 470 tests verts. Il ne reste aucun verbe.

**Lot 21, « Fréquence, répétition et repères temporels » : clos.** Validé, committé (`1cfac5b`) et
poussé, chacun sur ton accord explicite. `ocha-v2` et `origin/ocha-v2` sont à `1cfac5b`, 0 ahead / 0
behind. Le remote `origin` pointe désormais sur `https://github.com/shinobux9-max/Ocha.git` (le dépôt
`Kanji-trad` a été déplacé) ; `ls-remote` y lit `1cfac5b`.

**État réel, relevé par Claude Code avant le rapport de périmètre** : 650 ENTRY, 32 retraits, **37
entrées non décidées**, aucune proposition en cours ; 1 403 décisions validées (D0001 à D1403) ; 0
problème, 0 erreur, 0 attente ; 140 avertissements ; 472 tests verts.

**Lot 22, « Manière, identité, diversité et probabilité » : clos.** Validé, committé (`f3e81bc`)
et poussé, chacun sur ton accord explicite ; `ocha-v2` et `origin/ocha-v2` sont à `f3e81bc`, 0
ahead / 0 behind ; `origin` pointe sur `https://github.com/shinobux9-max/Ocha.git`.

| Étape | État | Qui a décidé |
|---|---|---|
| Périmètre | arbitré le 2026-10-06 : 9 entrées (rapport de périmètre, §9) | toi |
| Proposition lexicale | livrée : 7 entrées gardées, 2 fusions | — |
| Les 16 choix | arbitrés le 2026-10-06, retenus avec trois corrections (rapport de proposition, §9) | toi |
| Révision | faite : D1404, D1405, D1409 et D1418 réécrites à leur place, D1435 ajoutée ; 9 sens, 32 décisions D1404 à D1435, toutes `proposed` ; **vérifiée, favorable**, sans correction supplémentaire | toi |
| **Validation** | **faite le 2026-10-06** sur ton autorisation explicite : statuts seulement, 9 entrées et 32 décisions | toi |
| Commit, push | **faits** : `f3e81bc`, puis push `1cfac5b..f3e81bc` | toi, deux accords distincts |

**D'après les contrôles rapportés par Claude Code** : seules 41 lignes changent, toutes
`"status": "proposed"` → `"validated"` (9 dans `lot-22.json`, 32 dans `journal.json`) ; le contenu
hors statut est identique ; les 1 403 décisions antérieures sont identiques ; assemblage réel : **657
ENTRY, 34 retraits, 28 écartées (toutes non décidées)**, 0 problème, 0 erreur, 0 attente, 147
avertissements ; 1 435 décisions, toutes validées ; 弱い n'est pas touchée ; 474 tests verts ; 49
sabotages attrapés.

**Point d'arrêt normatif sur les fonctions A2-LING : ouvert le 2026-10-06, sur la demande transmise par l'utilisateur, avant tout
lot 23.** Rapport d'arbitrage livré : `docs/rapports/etape2-A2-04-lot23-prealable-normatif.md`. Le
préfixe `lot23` sert seulement à l'export : **aucun `lot-23.json`, aucune décision de journal, aucune
ENTRY modifiée, aucun addendum écrit** ; rien n'est validé, committé ni poussé.

**État réel, relevé par Claude Code avant le rapport** : 657 ENTRY, 34 retraits, **28 entrées non
décidées**, aucune proposition en cours ; 1 435 décisions validées ; 0 problème, 0 erreur, 0
attente ; 147 avertissements ; 474 tests verts.

**Arbitrage rendu** (rapport, §12) : A9 ; C1, D1, P1, Q1, K1, I1 reformulée ; cumul sous conditions ;
また, sens 2, à l'audit A2-05 ; など hors du lot 23 ; ni `negation` ni `pluralisation`. **Addendum A9
validé le 2026-10-06** sur ton autorisation, après ta relecture favorable : `docs/conception/addendum-A9-fonctions-linguistiques.md`,
dans `04-addenda.md` (dernier document). Seul son statut a changé ; il est inscrit au sommaire de
la conception. **Committé (`fac6a60`) et poussé**, sur tes deux accords : `ocha-v2` et
`origin/ocha-v2` sont à `fac6a60`.

**Lot 23, « Liaison, échange et formules sociales » : clos.** Validé, committé (`2c89eb0`) et
poussé, chacun sur ton accord explicite ; `ocha-v2` et `origin/ocha-v2` sont à `2c89eb0`.

| Étape | État | Qui décide |
|---|---|---|
| Périmètre | **arbitré** le 2026-10-06 (rapport de périmètre, §9) : 13 entrées ; じゃ et じゃあ deux ENTRY ; un sens par emploi établi ; « De rien » et « Vraiment » en sens distincts ; そうして et それから à un sens ; exemple de いいえ journalisé | toi |
| Proposition lexicale | **livrée**, tout en `proposed` : 13 entrées, 22 sens, 74 décisions D1436 à D1509 ; **18 choix arbitrés** le 2026-10-06 (rapport de proposition, §9) : retenue avec une correction | toi |
| Révision | **faite** : D1471 réécrite à sa place (じゃ en `interjection`) ; dans le lot, la seule classe de じゃ change ; diff complet au §10 ; **vérifiée, favorable** | toi |
| **Validation** | **faite le 2026-10-06** sur ton autorisation explicite : statuts seulement, 13 entrées et 74 décisions | toi |
| Commit, push | **faits** : `2c89eb0`, puis push `fac6a60..2c89eb0` | toi, deux accords distincts |

**D'après les contrôles rapportés par Claude Code**, à la validation : seules 87 lignes changent, toutes
`"status": "proposed"` → `"validated"` (13 dans `lot-23.json`, 74 dans `journal.json`) ; le
contenu hors statut est identique ; les 1 435 décisions antérieures sont identiques ; assemblage
réel : **670 ENTRY, 34 retraits, 15 écartées (toutes non décidées)**, 0 problème, 0 erreur, 0
attente, 147 avertissements ; 1 509 décisions, toutes validées ; また non rouverte ; 476 tests verts ;
40 sabotages attrapés.

**Publication 5.17 : périmètre proposé, arbitrage attendu.**

| Étape | État | Qui décide |
|---|---|---|
| Recensement et périmètre | **livrés** : `docs/rapports/etape2-A2-04-lot27-perimetre-5-17.md` (le préfixe `lot27` sert à l'export ; **il n'existe aucun lot 27**) ; 9 éléments déjà décidés à appliquer, 8 questions à arbitrer | Claude Code |
| Arbitrage (Q1 à Q8) | **attendu** | **toi** |
| Exécution de 5.17 | **non autorisée** : aucune donnée de `data/`, aucun outil, aucun test, aucune décision lexicale | toi |
| Commit, push | non autorisés | toi, accords distincts |

**Passe finale 5.16, lot 26 « Passe finale » : CLOS.** Validé le 2026-10-07, committé (`9f3dc2b`) et
poussé, chacun sur ton accord explicite ; `ocha-v2` et `origin/ocha-v2` sont à `9f3dc2b`, 0 en
avance, 0 en retard. Le travail 5.16 est terminé ; aucune action 5.16 ne reste.

| Étape | État | Qui décide |
|---|---|---|
| Recensement et périmètre | **livrés** : `docs/rapports/etape2-A2-04-lot26-perimetre-5-16.md` | Claude Code |
| Arbitrage (Q1 à Q9) | **rendu** le 2026-10-07, consigné au §9 du rapport de périmètre | toi |
| Proposition | **livrée**, tout en `proposed` (`docs/rapports/etape2-A2-04-lot26-proposition.md`) : `lot-26.json` sans entrée ; 19 ENTRY rouvertes dans leur lot d'origine ; 44 décisions D1570 à D1613 ; 22 liens ; 頼む corrigée ; 煙草 en たばこ ; table de correspondance d'`exemples.json` fixée, sans réécriture | Claude Code |
| Relecture, et les dix choix du §8 | **faite** le 2026-10-07 : avis favorable sous une correction rédactionnelle ; quatre choix arbitrés (rapport de proposition, §12.1) | toi |
| Révision | **faite** : la seule raison de D1613, réécrite à sa place (§12.2) ; **vérifiée par ChatGPT le 2026-10-07, conforme** (§12.4) | toi |
| Traces documentaires | **corrigées** après ta vérification : en-tête, §8, §10 et sabotages du rapport de proposition ; cette note ; doctrine des listes fermées de `CLAUDE.md`. Aucune donnée, décision, lot, relation ni test modifié | Claude Code |
| **Validation** | **faite le 2026-10-07** sur ton autorisation explicite : statuts seulement, 19 ENTRY rouvertes et 44 décisions D1570 à D1613 (`docs/rapports/etape2-A2-04-lot26-valide.md`) | toi |
| Commit, push | **faits** : `9f3dc2b` (31 fichiers), puis push `8ce0e23..9f3dc2b`, sans force | toi, deux accords distincts |
| Clôture documentaire | **préparée**, non committée : `ETAT-ACTUEL.md`, `ROADMAP.md`, `CLAUDE.md`, cette note | toi |

**D'après les contrôles rapportés par Claude Code**, à la validation : comparés à des copies prises
avant la bascule, le journal et les sept fichiers de lot ne diffèrent que par **63 lignes, toutes
`"status": "proposed"` → `"validated"`** (44 dans `journal.json` ; 1, 4, 5, 1, 6 et 2 dans les lots
03, 18, 19, 20, 23 et 24 ; 0 dans `lot-26.json`) ; même nombre de lignes, contenu hors statut
identique ; aucun autre fichier de données modifié. **Assemblage réel, partiel et complet : 684 ENTRY,
35 retraits, 0 écartée**, 0 problème, 0 erreur, 0 attente, 148 avertissements (aucun nouveau) ; 22
relations ; 71 références remappées ; **1 613 décisions, toutes validées** ; 27 lots entièrement
validés ; empreinte D0001 à D1569 inchangée. 490 tests verts ; sabotages sur l'état validé : 40
attrapés sur 40, témoin sain d'abord.

**D'après les contrôles rapportés par Claude Code**, à la révision : comparées aux 44 décisions de
l'export que tu as relu, les 44 décisions actuelles ont les mêmes identifiants dans le même ordre, et
**une seule diffère, D1613, par son seul champ `reason`** ; D0001 à D1569 restent identiques à
`8ce0e23` ; 699 entrées identiques, 19 rouvertes ; `data/` sans diff ; assemblage réel 665 ENTRY, 35
retraits, 19 écartées ; essai à blanc 684, 35, 0 ; 490 tests verts ; 35 sabotages attrapés sur 35.

**D'après les contrôles rapportés par Claude Code**, à la proposition : D0001 à D1569 identiques à
`8ce0e23` (préfixe exact du journal) ; 699 entrées identiques, 19 rouvertes dont le champ `before` est
exactement l'état committé ; rejouer les décisions sur cet état redonne l'état proposé, sans autre
différence ; `data/`, les sources et la conception sans diff. Assemblage réel : **665 ENTRY, 35
retraits, 19 écartées (propositions non validées)**, 0 problème, 0 erreur. **Essai à blanc, partiel et
complet : 684 ENTRY, 35 retraits, 0 écartée**, 0 problème, 0 erreur, 0 attente, 148 avertissements, 71
références remappées. 490 tests verts ; 34 sabotages attrapés sur 34, témoin sain d'abord.

**À savoir pour lire l'export** : le lot 26 ne décide aucune entrée, `08` est donc un lot **sans
entrée**, et la partie 1 de `07` ne contient aucune fiche. Les 19 ENTRY rouvertes sont dans la
**partie 3** de `07` (fiche source, état proposé, toutes leurs décisions) ; les 44 décisions, avec le
champ `before` de chaque réouverture, sont dans `09`. Depuis la validation, le compteur « entrées
écartées » de `05` et de `10` vaut 0 (il valait 19 pendant la proposition : les ENTRY rouvertes).

**Lot 25, « Retrait de など » : clos.** Validé, committé (`b3740c7`) et poussé ; toutes les entrées des
sources sont décidées.

| Étape | État | Qui décide |
|---|---|---|
| Préalable sur la classe | **arbitré** le 2026-10-07 (rapport du préalable, §12) : option C, retrait sans successeur ; aucune classe, aucun addendum A10 ; phrases à 5.16 ; un lot d'une entrée | toi |
| Périmètre | **arbitré sans correction** (P1 à P3) : `n5_v_602` seule | toi |
| Proposition lexicale | **livrée** : `lot-25.json` et D1569 (`docs/rapports/etape2-A2-04-lot25-proposition.md`) ; **approuvée sans correction** | toi |
| **Validation** | **faite le 2026-10-07** sur ton autorisation explicite : statuts seulement, l'entrée `n5_v_602` et D1569 | toi |
| Commit, push | **faits** : `b3740c7`, puis push `5e9a233..b3740c7` | toi, deux accords distincts |

**Lot 24, « Quantité, degré et comparaison » : clos.** Validé, committé (`affa45e`) et poussé ;
suivi documentaire `5e9a233`, poussé.

| Étape | État | Qui décide |
|---|---|---|
| Périmètre | **arbitré** le 2026-10-06 (rapport de périmètre, §9) : un seul lot de 14 entrées ; など hors périmètre ; 13 arbitrages structurants | toi |
| Proposition lexicale | **livrée** : 14 entrées, 20 sens ; **14 choix arbitrés** le 2026-10-06, retenue avec quatre corrections (rapport de proposition, §9) | toi |
| Révision | **faite** : D1515, D1517, D1521, D1524, D1536 réécrites à leur place, D1568 ajoutée ; diff complet au §10 | toi |
| **Validation** | **faite le 2026-10-06** sur ton autorisation explicite : statuts seulement, 14 entrées et 59 décisions D1510 à D1568 | toi |
| Commit, push | **faits** : `affa45e`, puis push `2c89eb0..affa45e` | toi, deux accords distincts |

**D'après les contrôles rapportés par Claude Code**, à la validation : seules 73 lignes changent,
toutes `"status": "proposed"` → `"validated"` (14 dans `lot-24.json`, 59 dans `journal.json`) ; le
contenu hors statut est identique ; les 1 509 décisions antérieures sont identiques (empreinte) ;
assemblage réel : **684 ENTRY, 34 retraits, 1 écartée (など, non décidée)**, 0 problème, 0 erreur, 0
attente, 148 avertissements (le nouveau : la catégorie nulle de ちょうど, justifiée) ; 1 568
décisions, toutes validées ; 479 tests verts ; sabotages rejoués sur l'état validé, harnais corrigé :
lot 24, 51/51 ; lot 23, 40/40 ; lot 22, 49/49.

**Erratum, à lire** (rapport de proposition, §9) : le harnais des sabotages des lots 22 à 24
échouait toujours, même sur un état sain ; les comptes « tous attrapés » annoncés pour ces lots ne
prouvaient rien. Corrigé (témoin sain vérifié d'abord) ; rejoués : 48/49, 35/40, 44/48 ; tests
renforcés (dont une empreinte des décisions validées) ; maintenant 49/49, 40/40, 48/48. Les données
validées des lots 22 et 23 ne changent pas ; un erratum est ajouté à leurs rapports de validation.

**État réel, relevé par Claude Code avant le rapport** : 684 ENTRY, 34 retraits, **1 entrée non
décidée** (など), aucune proposition en cours ; 1 568 décisions validées ; 0 problème, 0 erreur, 0
attente ; 148 avertissements ; 479 tests verts.

**D'après les contrôles rapportés par Claude Code**, à la validation : seules 2 lignes changent,
toutes deux `"status": "proposed"` → `"validated"` (1 dans `lot-25.json`, 1 dans `journal.json`) ; le
contenu hors statut est identique ; les 1 568 décisions antérieures sont identiques ; **assemblage
réel, partiel et complet : 684 ENTRY, 35 retraits, 0 écartée**, 0 problème, 0 erreur, 0 attente, 148
avertissements ; 1 569 décisions, toutes validées ; **toutes les entrées des sources sont décidées** ;
481 tests verts ; sabotages sur l'état validé : lot 25, 22/22 ; lot 24, 51/51 ; lot 23, 40/40.

**Constat corrigé, à lire** (rapport de proposition, §5) : les 34 retraits ne sont pas tous des
fusions ; ils comptent 33 fusions et `v_717`, retiré d'emblée sans successeur par A3. `v_602` serait
le premier retrait sans successeur **décidé dans un lot**. Errata ajoutés aux deux rapports
précédents ; l'arbitrage ne change pas.

**Dans cet export** : `06` contient le rapport du préalable (arbitrage au §12), le rapport de
périmètre, le rapport de proposition, **le rapport de validation** et le rapport généré ; `07`, la
**fiche source complète de など** et les précédents validés cités ; `08` est `lot-25.json` ; `09`,
D1569 ; `10` le diff contre `5e9a233` et le diff de la validation (statuts seulement).

## 4. Ce qui est attendu de cette relecture

Deux choses, distinctes.

**A. Contrôler la clôture documentaire du lot 26** (diff du `10`, pris contre `9f3dc2b`) : quatre
documents seulement (`ETAT-ACTUEL.md`, `ROADMAP.md`, `CLAUDE.md`, cette note). Ils doivent dire : lot
26 validé ; commit `9f3dc2b` créé et poussé ; branches locale et distante alignées ; travail 5.16
terminé, aucune action 5.16 restante ; prochaine action identifiée. Aucune donnée, aucun lot, aucun
journal, aucun test, aucun outil n'est modifié. Dis si tu autorises le commit de cette clôture ; le
push demandera un accord séparé. Le rapport de périmètre de 5.17, fichier nouveau, peut entrer dans
ce commit ou attendre son arbitrage : dis-le.

**B. Arbitrer le périmètre de la publication 5.17** (rapport de périmètre, §6) :

1. **Q1, le véhicule** : une opération qui tient en un seul commit, relue sur un essai préparé dans
   l'arbre de travail avant d'être committée ;
2. **Q2, l'origine des fichiers publiés** : la sortie de l'assembleur, écrite telle quelle, et un
   test permanent qui la compare à `data/` ;
3. **Q3, Q4, deux questions lexicales** que les documents réservent « avant 5.17 » : les lectures des
   64 mots en katakana ; la lecture うち de 家. **Elles sont posées, non décidées** : rien n'est
   proposé sur le fond sans ton arbitrage ;
4. **Q5, les avertissements** : 148 avertissements du validateur lexical apparaîtront dans
   `validate-data` ;
5. **Q6, Q7, Q8, les frontières** : fichiers figés non remappés, ancienne application, corrections
   après la publication.

Vérifie aussi que le recensement est complet (§3 à §5) et que rien n'y est décidé. Ton arbitrage
n'autorisera ni l'exécution de 5.17, ni commit, ni push : chacun demande un accord explicite.

**Dans cet export** : `06` contient le rapport de périmètre de 5.17 ; `07`, la fiche source de 家 ;
`08` n'est pas un fichier de lot (il n'en existe aucun pour 5.17) ; `09` est vide ; `10` le diff
contre `9f3dc2b` et les contrôles.

**Dans cet export** : `06` contient le rapport de périmètre (arbitrage du périmètre au §9), le rapport
de proposition (arbitrage de la proposition et révision au §12) et le rapport généré ; `07`, les 19
ENTRY rouvertes (partie 3) et les précédents cités (partie 2) ; `08` est `lot-26.json`, sans entrée ;
`09`, les 44 décisions, dont D1613 révisée ; `10` le diff contre `8ce0e23` et les contrôles.

## 5. Points ouverts

La liste complète et à jour est dans `ETAT-ACTUEL.md`, section « Points ouverts »
(`01-gouvernance.md`). Ceux qui touchent la suite proche :

- **Fonctions d'A2-LING** : `deictique` est définie par A7 ; **A9, validé, définit aussi
  `connecteur`, `discours`, `politesse`, `quantificateur`, `comparatif` et `intensifieur`**
  (appliquées au lot 23 pour les trois premières et `intensifieur`, au lot 24 pour `quantificateur`,
  `comparatif`, `intensifieur` et `politesse`). Restent
  sans définition : `interrogatif` (appliquée sur un sens implicite), `negation`, `pluralisation`,
  `modalite`, `aspect`, `temps`, `alternative`.
- **Classe de など** : « particule suffixe » selon sa fiche ; **préalable arbitré** : retrait sans
  successeur (lot 25). Les 3 phrases rangées sous `n5_v_602` sont pour 5.16.
- **Identité de 弱く et de ゆっくりと** : arbitrée au lot 22 (fusions dans 弱い, sans réouverture,
  et dans ゆっくり).
- **« Adjectif en na (et nom) »** : le schéma ne porte qu'une classe par ENTRY (いろいろ, 同じ, 一緒).
- **Audit A2-05** : catégories nulles, deixis temporelle de 前, 先 et 近く, catégories de メートル et
  キロ, extensions conservées en nuance.
- **Passe finale 5.16** : relations candidates des lots 18 à 20 ; furigana de 頼む ; formes de 煙草
  et 居る.

## 6. Prochaine action

1. **Ton contrôle de la clôture documentaire**, puis ton accord explicite de commit, puis de push.
2. **Ton arbitrage du périmètre de 5.17** (Q1 à Q8).
3. Sur ton autorisation distincte : la proposition de la publication, selon le véhicule arbitré.
4. Ensuite : l'audit A2-05, le graphe (G2 à G9), le registre de phrases (tâche 11).
