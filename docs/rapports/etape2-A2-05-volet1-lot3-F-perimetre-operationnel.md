# Étape 2 · A2-05 · Volet 1 · Lot 3 — périmètre opérationnel de contrôle du bloc F (A10, §7)

**Date** : 2026-11-03
**Statut** : **périmètre opérationnel accepté le 2026-11-03 (§0).** La proposition est conservée telle qu'elle a été livrée. Aucune fiche n'est auditée, aucun sens n'est jugé, aucune décision lexicale n'est prise, aucun filtre de recherche d'omissions n'est exécuté sur les données réelles.

**Autorisation** : message relayé du 2026-11-03 (ChatGPT, par délégation) : « Après installation conforme, **préparer le périmètre opérationnel du bloc F**, conformément à A10 : 17 sens dans 15 ENTRY, en une seule tranche. Vérifier les frontières F1/F2 et l'exhaustivité de la population. Préparer les contrôles des 17 `type-nul`. Préparer les filtres de recherche d'omissions sur les 807 sens non porteurs, avec essais sur copie. Ne prendre aucune décision lexicale et ne lancer aucun audit ni filtre réel avant acceptation du périmètre opérationnel. »

**Document antérieur** : `etape2-A2-05-volet1-lot3-F-perimetre.md` (2026-11-01), périmètre **préparatoire**, établi avant l'adoption d'A10. Il n'est pas modifié ; le présent document lui succède comme périmètre opérationnel (A10, §7, séquence, point 2).

## 0. Arbitrage

Arbitrage du 2026-11-03 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **J'accepte le périmètre opérationnel du bloc F : 17 sens dans 15 ENTRY, lignes 361 à 377, sans ajout ni retrait.** »

Décisions de périmètre : « 1. Réunir F1 (11 sens) et F2 (6 sens) dans une seule livraison F et un seul rapport d'audit. » « 2. Retenir deux verdicts distincts par sens : conformité de `interrogatif` selon A10 et justification du `type-nul` selon A6. » « 3. Examiner les catégories selon les règles ordinaires, sans présumer d'erreur. » « 4. Accepter les sept filtres d'A10 et leurs modalités proposées, notamment la correction de T2-serie. » « 5. **Activer X1** comme filtre complémentaire, non normatif, lors de la future recherche d'omissions. » « 6. Retenir l'ordre : audit des 17 sens, puis recherche d'omissions distincte sur les 807 sens non porteurs. »

Recherche d'omissions : « Conserver la population des 807 sens et les huit filtres, X1 inclus. » « Ne lancer aucun filtre sur les données réelles pour l'instant. » « Prévoir une première exécution de mesure de couverture uniquement, avec décompte par filtre, déduplication, candidats et limites, sans relecture ni verdict. Son autorisation sera demandée séparément après l'audit des 17 sens. »

« **Ne prendre aucun verdict lexical avant autorisation distincte d'ouverture de l'audit F.** »

**Effets** : les questions 1 à 6 du §10 sont tranchées ; le registre des tranches porte la tranche F planifiée en une seule livraison F (F1 et F2 restent les subdivisions du découpage arbitré, qui n'est pas modifié) ; X1 sera appliqué à l'exécution de mesure (`omissions.mjs --avec-X1`), le module restant inchangé ; l'audit n'est pas ouvert ; aucun filtre n'est lancé ; aucune décision lexicale n'est prise. Le texte qui suit (§1 à §10) est la proposition, conservée telle qu'elle a été livrée.
## 1. Base normative

- **A10** (`docs/conception/addendum-A10-interrogatif.md`) : 🔒 validé et installé le 2026-11-03, inscrit au sommaire de la conception. Définition (§2) : « fonction grammaticale d'un SENSE dont le rôle est de **demander une information non spécifiée** ».
- **Séquence** (A10, §7) : adoption (faite), **périmètre opérationnel validé** (le présent document, en proposition), puis contrôle des 17 sens et recherche d'omissions, **coordonnés mais comptabilisés séparément**.
- **Relais** : version figée 2 en service le 2026-11-03 ; il constate le statut normatif d'A10 (Q7 « oui »).

## 2. Population du contrôle : 17 sens, 15 ENTRY

| N° | Ligne | Livraison d'origine | Sens | Mot | Traduction | Classe | Catégorie publiée | Type publié | Décision `type-nul` | Corrections retenues sur l'ENTRY |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 361 | F1 | `v_401_s1` | 何 | Quoi | pronom | `null` | `null` | D0073 | — |
| 2 | 362 | F1 | `v_179_s1` | いくら | Combien | pronom | `economie_commerce › prix_valeur_economique › prix` | `null` | D0373 | — |
| 3 | 363 | F1 | `v_343_s1` | どっち | Lequel (des deux) | pronom | `null` | `null` | D0696 | — |
| 4 | 364 | F1 | `v_390_s1` | いかが | Comment (poli) | adverbe | `null` | `null` | D0718 | V2-139 |
| 5 | 365 | F1 | `v_391_s1` | いつ | Quand | pronom | `temps` | `null` | D0712 | — |
| 6 | 366 | F1 | `v_393_s1` | どう | Comment | adverbe | `null` | `null` | D0705 | V2-140 |
| 7 | 367 | F1 | `v_394_s1` | どうして | Pourquoi | adverbe | `null` | `null` | D0716 | — |
| 8 | 368 | F1 | `v_395_s1` | どこ | Où | pronom | `espace_proprietes_spatiales › position_localisation` | `null` | D0652 | — |
| 9 | 369 | F1 | `v_396_s1` | どちら | Lequel (des deux) | pronom | `null` | `null` | D0681 | V2-133, V2-134, V2-135, V2-136 |
| 10 | 370 | F1 | `v_396_s2` | どちら | Où (poli) | pronom | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | D0682 | V2-133, V2-134, V2-135, V2-136 |
| 11 | 371 | F1 | `v_396_s3` | どちら | Qui (poli) | pronom | `null` | `null` | D0683 | V2-133, V2-134, V2-135, V2-136 |
| 12 | 372 | F2 | `v_397_s1` | どなた | Qui (poli) | pronom | `null` | `null` | D0710 | — |
| 13 | 373 | F2 | `v_398_s1` | どの | Quel … | determinant | `null` | `null` | D0664 | V2-137 |
| 14 | 374 | F2 | `v_399_s1` | どれ | Lequel | pronom | `null` | `null` | D0641 | V2-138 |
| 15 | 375 | F2 | `v_400_s1` | なぜ | Pourquoi | adverbe | `null` | `null` | D0714 | — |
| 16 | 376 | F2 | `v_402_s1` | 誰 | Qui | pronom | `null` | `null` | D0708 | — |
| 17 | 377 | F2 | `v_585_s1` | いくつ | Combien | pronom | `nombres_quantification` | `null` | D0720 | V2-141 |

**Exhaustivité** (contrôlée par script, §9) : les porteurs publiés d'`interrogatif` sont exactement ces 17 sens, ni plus ni moins ; ce sont aussi exactement les 17 sens restants du lot 3 (360 arbitrés sur 377). Aucune des 15 ENTRY n'a d'autre sens : les 669 autres ENTRY publiées ne portent la fonction sur aucun sens. Aucune n'a de fiche retirée par fusion vers elle. `interrogatif` est la seule fonction des 17 sens (aucun cumul). Les 42 décisions de ces ENTRY sont toutes validées, et aucune ne porte sur `linguistic_functions`.

## 3. Une seule tranche : frontières F1/F2

**Bornes vérifiées** : un segment contigu, lignes 361 à 377 du découpage arbitré, les dernières des 377, bordé par E3 (ligne 360). **F1** : lignes 361 à 371, 11 sens, 9 ENTRY ; **F2** : lignes 372 à 377, 6 sens, 6 ENTRY. **Aucune ENTRY n'est coupée** par la frontière : les trois sens de どちら sont tous en F1.

**Proposition** : **une seule livraison « F »**, réunissant F1 et F2, et un seul rapport d'audit. La frontière F1/F2 suivait l'ordre du découpage et la taille des livraisons, non le contenu ; elle sépare des mots que les fiches rapprochent (どうして et なぜ ; いくら et いくつ ; どちら s3, どなた et 誰 ; どっち et どちら s1, どの et どれ). Le registre des tranches porte déjà une seule tranche `F` (livraisons F1, F2), au statut « suspendue au préalable E5 ». **Il n'est pas modifié ici** : son passage à une livraison unique et la levée de la suspension s'inscriront après l'acceptation de ce périmètre, sur autorisation distincte.

## 4. Grille d'examen de chaque sens (pour l'audit, sans verdict ici)

Chaque sens est examiné séparément (A10, §3, point 3), sur sa fiche entière (traductions, nuance, exemple, anciens exemples), les décisions de son ENTRY, les valeurs publiées et, pour les ENTRY concernées, les nuances retenues mais non appliquées (V2-133 à V2-141). Les questions :

| N° | Question | Référence |
|---|---|---|
| Q1 | Demander une information non spécifiée fait-il partie intégrante du sens tel qu'il est modélisé ? | A10, §2 ; §3, point 1 |
| Q2 | La fiche source l'atteste-t-elle (non seulement une nuance, ni une traduction contextuelle en forme de question) ? | A10, §3, point 1 |
| Q3 | Le sens relève-t-il d'une frontière : indéfini ou emploi concessif, `deictique`, registre poli, sens qui nomme une question ? | A10, §4, points 1 à 4 |
| Q4 | Un cumul serait-il fondé (une autre fonction, rôle distinct, intégral, attesté) ? | A10, §6 ; A7 ; A9 |
| Q5 | La catégorie publiée (ou son absence) suit-elle les règles ordinaires, sens par sens ? | A10, §5, point 1 ; A5 |
| Q6 | Le `semantic_type: null` est-il justifié selon A6, indépendamment de la fonction ? (§5) | A10, §5, point 2 ; A6 |

**Verdicts possibles**, deux par sens, **comptés séparément** : sur la fonction, et sur le `type-nul`. **Conforme** : attribution maintenue, inchangée, justifiée par le verdict individuel arbitré, traçable dans le rapport d'audit, sans décision nouvelle (A10, §3, point 4). **Écart** : une correction proposée, qui suivra la voie ordinaire (décision nouvelle, réouverture explicite, autorisations distinctes ; aucune décision historique réécrite). **À arbitrer**. La catégorie (Q5) est relevée sans compter un troisième verdict, comme dans les tranches précédentes.

## 5. Contrôles des 17 décisions `type-nul`

Les 17 décisions sont validées, une par sens, de champ `sens N · semantic_type`, et le type publié est `null` pour chacun des 17 sens. Leur raison suit **un même gabarit** (relevé sans jugement) :

| Gabarit | Décisions |
|---|---|
| « Unité grammaticale (interrogatif) : ni entité ni concept désigné, aucun type terminal ne s'applique. Addendum A6. » | D0073 (何) |
| « Pronom interrogatif : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何, lot 0). Addendum A6. » | D0373 (いくら) |
| « Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6. » | D0641, D0652, D0664, D0681, D0682, D0683, D0696, D0705, D0708, D0710, D0712, D0714, D0716, D0718, D0720 |

**Fait à examiner, non présumé fautif** : les 17 raisons invoquent le caractère interrogatif de l'unité. A10 (§5, point 2) dit que la fonction « ne justifie pas par elle-même `semantic_type: null` » et qu'**aucun écart n'est présumé** (§7). L'audit dira, sens par sens, si un type terminal décrit correctement le sens (`concept_abstrait` ne sert pas de type de secours) ; la décision historique est citée, jamais réécrite.

**Contrôles préparés** (`controle-perimetre-operationnel.mjs`, §9) : les 17 décisions existent, sont validées, de nature `type-nul`, une par sens et sur le bon champ ; le type publié est nul ; le gabarit est celui relevé ci-dessus. **Le rapport d'audit devra** porter une ligne par décision, citant son identifiant, avec un verdict A6 distinct du verdict sur la fonction.

## 6. Recherche d'omissions (A10, §8) : préparée, non exécutée

**Population** : **807 sens** publiés qui ne portent pas la fonction (824 publiés, moins les 17 porteurs) : 805 N5 et 2 hors JLPT, dans 669 ENTRY. Chaque sens est lu avec la fiche source de son ENTRY et les fiches retirées par fusion vers elle : **33 fiches fusionnées, rattachées à 33 ENTRY**, soit 45 sens. Toutes les fiches sont présentes. La fiche d'une ENTRY hors JLPT est trouvée par la correspondance de la reconstruction (`HJ_IDS`). **Hors population** : les données de grammaire (§4, point 5) et les phrases d'exemple, qui ne sont pas filtrées mais seront lues en entier au temps 3. 誰か (`v_700_s1`) est dans la population : D0724 lui refuse la fonction, et la relecture la citera.

**Filtres** (`a2-05-travail/perimetre-F-operationnel/omissions.mjs`) :

| Filtre | Temps | Champs lus | Motif |
|---|---|---|---|
| T1-radicaux | 1 | type, traductions et nuance des fiches ; traduction, alternatives, nuances publiées (ENTRY et sens) | « interrog », « question », « demand », sans casse |
| T1-point | 1 | traductions et nuances, fiches et publiées | « ? » ou « ？ » |
| T1-mots | 1 | traductions et alternatives seulement, fiches et publiées | qui, que (et « qu' » élidé), quoi, quel et ses formes, lequel et ses formes (auquel, duquel… compris), où, quand, comment, pourquoi, combien, en mot entier |
| T2-classe | 2 | classe de l'ENTRY | `pronom`, `determinant`, `adverbe` |
| T2-nuls | 2 | sens publié | catégorie ou type nul, et aucune fonction |
| T2-serie | 2 | graphies du candidat (mot et graphies) | contient une graphie ou une lecture d'une des 15 ENTRY porteuses (何, なに, なん, 誰, だれ, いつ, いくら, いくつ, いかが, どう, どうして, どこ, どちら, どっち, どなた, どの, どれ, なぜ) |
| T2-journal | 2 | décisions de journal de l'ENTRY (raison, avant, après) | « interrog », « question », « demand » |
| X1 | hors A10 | catégorie et sous-catégorie de la fiche source | « question », « interrog » ; **proposé, désactivé par défaut** |

**Choix de mise en œuvre, soumis à l'arbitrage** :
1. **Tous les filtres sont appliqués à tous les sens.** A10 applique le temps 2 « sur les sens que le temps 1 n'a pas relevés » ; l'ensemble relevé est le même, mais chaque candidat garde **tous** ses filtres d'origine (traçabilité), et le compte rendu sépare « relevé par le temps 1 » et « relevé par le seul temps 2 ».
2. **« qu' » élidé** compte comme une forme de « que » ; « Quelque », « Presque », « Lorsque », « Quiche » ne sont pas relevés (mot entier).
3. **Balises ruby et gras retirés** avant la recherche (les furigana ne sont pas du texte français).
4. **T2-serie compare les graphies du candidat, non ses lectures** : sinon どう relèverait 動物 (どうぶつ) ou 食堂 (しょくどう), qui ne sont pas formés sur どう. Les lectures des porteurs restent comparées, pour relever なにか ou だれか écrits en kana. **Limite** : un composé écrit en kanji sur un porteur écrit en kana (ou l'inverse, hors des lectures des porteurs) échappe à T2-serie.
5. **X1, hors A10** : 13 des 15 fiches porteuses sont rangées sous la catégorie source « questions » (sous-catégories « interrogatifs », « raison_maniere », « temps », « lieu », « quantite ») ; いくら est sous « achats_argent / prix », どっち sous « position_direction / demonstratifs_direction ». Ce champ n'est pas dans la liste du temps 1 d'A10. Il est préparé comme filtre complémentaire, **désactivé par défaut** ; son ajout demande votre accord. Un filtre ne valant jamais preuve, l'ajouter ne fait qu'élargir la relecture ; l'exemple de いくら et どっち montre qu'il ne suffirait pas seul.

**Garde** : la ligne de commande refuse de filtrer sans `--execution-autorisee` (code 2, rien n'est écrit). Le contrôle du périmètre ne lit que la population, jamais un filtre.

**Essai, sur une population synthétique et sur copie jetable** (`essayer-filtres.mjs`) : **conforme, 31 vérifications.** 14 cas relevés, chacun par la liste exacte de filtres attendue (série, alternative, nuance en gras, « ? » hors traduction, classe seule, nuls sans fonction, journal, fiche fusionnée avec ruby, trois filtres pour un seul candidat, « qu' », sens par sens, hors JLPT, graphie formée sur どう) ; 9 non relevés (porteurs, question dans le seul exemple, nul avec fonction, faux amis « Lorsque », « Quiche », « Presque », « Quelques », autre sens de la même ENTRY, X1 désactivé, 動物 lu どうぶつ) ; couverture et décompte par filtre exacts ; X1 sur option ; sur copie, la ligne de commande refuse sans autorisation et n'écrit rien ; dépôt réel inchangé.

**Charge de relecture : non mesurée.** L'exécution réelle est interdite avant l'acceptation de ce périmètre. T2-classe et T1-mots (« que », « où ») peuvent relever beaucoup de sens. **Proposition** : la première exécution réelle, sur autorisation distincte, livre en proposition la couverture (population, relevés par filtre, relevés par le temps 1 et par le seul temps 2, non relevés) et la liste dédupliquée des candidats avec leurs filtres ; la relecture du temps 3 ne commence qu'après l'arbitrage de cette charge.

**Compte rendu prévu** (A10, §8) : couverture, avec la phrase « un sens que les filtres n'ont pas relevé n'est pas un sens vérifié conforme : il n'a pas été relu » ; traçabilité (identifiant de SENSE et filtres d'origine, du relevé à la conclusion) ; doublons comptés une fois ; décisions existantes citées (D0724) ; limites (ce que les filtres ne voient pas, ce qui est hors population). Trois conclusions au temps 3 : « ne relève pas de la fonction », « relève de la fonction » (omission signalée, rien n'est modifié), « à arbitrer ». **Une omission signalée n'est pas ajoutée aux 377 candidats du lot 3.**

## 7. Deux décomptes séparés

| Décompte | Population | Unité | Livraison |
|---|---|---|---|
| Contrôle des porteurs | 17 sens, 15 ENTRY | deux verdicts par sens (fonction, `type-nul`) | bloc F du lot 3 ; compte dans la couverture 377/377 |
| Recherche d'omissions | 807 sens, 669 ENTRY | une conclusion par candidat relevé | rapport distinct ; hors des 377 ; jamais additionnée au premier |

**Ordre proposé** : l'audit des 17 d'abord, pour éprouver la définition sur les cas connus (comme le recommandait l'analyse d'E5, §7), puis la recherche d'omissions. Les deux restent coordonnés : une frontière précisée par l'audit s'applique à la relecture du temps 3.

## 8. Hors du périmètre

- Aucune décision lexicale ; aucun audit de fiche ; aucun filtre exécuté sur les données réelles.
- Les 204 corrections retenues restent non appliquées ; les neuf qui touchent ces ENTRY (V2-133 à V2-141, toutes de `nuance`) sont lues, non rouvertes.
- 聞く et 質問 (arbitrés en B2 et B3) ne sont pas rouverts ; 誰か relève de la recherche d'omissions, non du contrôle des 17.
- Les marques grammaticales de l'interrogation et les données de grammaire (A10, §4, point 5).
- `CLAUDE.md` §5 (description périmée d'E5, conservée comme reste documentaire) et les autres mentions datées du relais : maintenance séparée.
- Volet 3 (G1 à G7), HP-1 à HP-4, QC-1, QC-2 : fermés.
- Le registre des tranches, `ETAT-ACTUEL.md`, `ROADMAP.md` et le bilan ne sont pas modifiés par ce document.

## 9. Contrôles

`a2-05-travail/perimetre-F-operationnel/controle-perimetre-operationnel.mjs`, lecture seule ; il n'emploie du module de filtrage que la construction de la population ; avec `--sabotages`. Il vérifie contre le dépôt : A10 validé et au sommaire ; le découpage (17 lignes, 361 à 377, F1 et F2, aucune ENTRY coupée) ; la couverture (17 restants, tous du bloc F) ; l'exhaustivité (porteurs = bloc F, aucun cumul, aucun autre sens sur les 15 ENTRY, aucune fusion) ; les 42 décisions des 15 ENTRY (toutes validées, aucune sur `linguistic_functions`) ; les 17 `type-nul` et leurs gabarits ; la population (824, 807, 805 et 2, 669 ENTRY, 33 fusions et 45 sens, toutes les fiches présentes, 誰か compris) ; les tableaux du présent document contre les données et le bilan ; les filtres décrits contre le module ; l'absence de verdict et de candidat ; la non-régression (données, lots, journal, tests, outils, 45 empreintes, index vide, `HEAD` à `39cce13`).

## 10. Questions à l'arbitrage

1. Le périmètre opérationnel est-il accepté : 17 sens, 15 ENTRY, sans ajout ni retrait (§2) ?
2. F1 et F2 sont-elles réunies en **une seule livraison « F »**, l'inscription au registre se faisant après acceptation, sur autorisation distincte (§3) ?
3. La grille d'examen et les deux verdicts par sens conviennent-ils (§4, §5) ?
4. Les filtres et les choix de mise en œuvre 1 à 4 sont-ils acceptés (§6) ?
5. Le filtre complémentaire **X1** est-il ajouté, ou laissé désactivé (§6, choix 5) ?
6. L'ordre du §7 (audit des 17, puis recherche d'omissions) est-il retenu ? L'audit du bloc F et la première exécution réelle des filtres demandent chacun une autorisation distincte.
