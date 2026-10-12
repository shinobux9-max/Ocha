# A2-05 · Relais de reprise

**Date** : 2026-10-08 ; mis à jour le 2026-10-10 (arbitrage de la tranche 1 de provenance, périmètre proposé de la tranche 2) ; mis à jour le 2026-10-12 (arbitrage de 5c, clôture de la tranche 5, périmètre proposé de la tranche 6, anomalie technique expliquée au §11 ; puis, le même jour : périmètre de la tranche 6 arbitré, checkpoint Git documentaire proposé, puis accepté sous corrections et préparé, sans indexation ni commit ; puis committé, `3756fe3`, non poussé ; clôture documentaire préparée)
**Objet** : permettre de reprendre A2-05 dans une session neuve, sans la conversation précédente. Ce fichier est autonome. Il ne décide rien.
**Statut du fichier** : suivi par git depuis le commit de checkpoint `3756fe3e8076efb7dbf06933d453ec5b06612234` (2026-10-12). Auparavant : nouveau, non suivi.

---

## 1. État du dépôt

### 1.1 État au 2026-10-12, après le checkpoint documentaire

- **Le checkpoint documentaire d'A2-05 est committé** : `3756fe3e8076efb7dbf06933d453ec5b06612234`, sur `ocha-v2`, parent `5a8687b063fd2fca7c343d544aff040709bc5ec8` ; message « Docs: checkpoint A2-05, arbitrages des volets 1 et 2 documentes, aucune correction appliquee » ; **36 fichiers, 5 modifiés et 31 nouveaux**, tous en Markdown ; créé le 2026-10-12 sur l'accord explicite de commit relayé par l'utilisateur.
- **Il n'est pas poussé.** La référence locale `origin/ocha-v2` est restée à `5a8687b` ; `ocha-v2` a un commit d'avance. Le distant réel n'a pas été interrogé ; il le sera avant tout push, qui demande un accord distinct.
- **Ce que le commit contient** : les quatre documents de gouvernance actualisés (`CLAUDE.md`, `ETAT-ACTUEL.md`, `ROADMAP.md`, `docs/relecture/note-relais.md`) ; le rangement documentaire d'A2 (`docs/conception/a2/README.md`, `A2-GLOBAL-v1.md`, `docs/conception/legacy/a2/`) ; les 25 rapports `docs/rapports/etape2-A2-05-*.md` ; ce relais. **Ce qu'il ne contient pas** : aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot déjà suivi, aucun outil, aucun test ; ni `a2-05-travail/`, ni `chatgpt-relecture/`, ni aucune archive.
- **Avant le commit**, trois anomalies d'espacement signalées par `git diff --cached --check` (code 2) ont arrêté l'opération ; elles ont été corrigées sur autorisation, sans autre changement (rapport de checkpoint, §0.6) ; le contrôle a ensuite rendu 0.
- **Constat historique, daté du 2026-10-12, moment où la clôture documentaire a été rédigée** (il décrit ce moment, non l'état courant du dépôt) : la clôture est une étape distincte du commit de checkpoint ; elle porte sur quatre fichiers, `ETAT-ACTUEL.md`, `docs/relecture/note-relais.md`, `docs/rapports/etape2-A2-05-checkpoint-documentaire.md` et ce relais ; à cette date, elle n'était ni indexée ni committée, et son commit, puis le push de l'ensemble, relevaient d'accords explicites et distincts, non encore donnés. Ce qu'il en est advenu depuis se lit dans `git log` et dans les mises à jour ultérieures de ce relais.
- **A2-05 reste en cours ; l'étape 2 n'est pas terminée.** Inchangés : **124 corrections retenues dans 112 ENTRY, aucune appliquée** ; **130 nuances de provenance restent à contrôler** (tranche 6 : 47 ; tranche 7 : 39 ; tranche 8 : 44) ; **377 candidats des axes C1 à C10** ; les 147 arbitrages du volet 2 ; le volet 3 non commencé. L'audit de la livraison 6a est autorisé et non commencé : il suit la sécurisation du checkpoint.
- Derniers contrôles observés (2026-10-12, codes 0) : `verify`, `assemble` (684 ENTRY, 35 retraits, 0 écartée), `validate-data` (0 erreur, 149 avertissements), `publish` sans `--write` (`data/` à jour), suite complète (510 tests réussis).

### 1.2 État d'avant le checkpoint (conservé tel qu'il a été relu)

Les puces et le tableau ci-dessous décrivent le dépôt entre `5a8687b` et le commit de checkpoint. Là où ils disent « non committé » ou « non suivi », lire : committé dans `3756fe3`, sauf pour les dossiers et archives exclus.

- `ocha-v2` et `origin/ocha-v2` sont à `5a8687b063fd2fca7c343d544aff040709bc5ec8` (clôture documentaire de 5.17, committée et poussée sur accords explicites).
- **Depuis ce commit, rien n'est committé, rien n'est indexé, rien n'est poussé.**
- **Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot, aucun inventaire, aucun outil et aucun test n'est modifié.** Tout le travail d'A2-05 est documentaire.
- **Un seul fichier suivi par git est modifié** (précision du 2026-10-10, pour lever une contradiction relevée à la relecture) : `docs/conception/a2/README.md`, +22 et −2 lignes par rapport à `5a8687b`, ce que `10-diff-et-controles.md` montre à chaque export. **Origine** : le rangement documentaire d'A2, fait le 2026-10-07 (dernière écriture du fichier : 2026-10-07, 22 h 29), avant tout audit A2-05, et relu dans l'export `chatgpt-relecture-A2-rangement-documentaire.zip`. **Contenu** : une ligne de tableau pour `A2-GLOBAL-v1.md` ; la date de dépôt de ce snapshot (2026-10-07, par l'utilisateur) à la place de « sera déposé avec la tâche qui en aura besoin » ; une table de correspondance entre les noms que les snapshots se donnent entre eux et les fichiers du dépôt ; la note sur la référence de A2-LING-v1 à A2-REL-v1 ; le renvoi à `docs/conception/legacy/a2/`. Aucune règle n'y change. **Statut** : relu et accepté, **commit non autorisé** ; ni supprimé ni committé. Il n'a pas été touché depuis le 2026-10-07. Les phrases « tous non suivis » des notes d'export ne visaient que les fichiers touchés depuis l'export précédent ; elles ne niaient pas cette modification antérieure.
- Dernier contrôle : suite complète, 510 tests verts ; assemblage 684 ENTRY, 35 retraits, 0 écartée ; `validate-data` 0 erreur.
- **Depuis le 2026-10-12, cinq fichiers suivis sont modifiés, aucun n'est indexé** : `docs/conception/a2/README.md` (ci-dessus) et, pour le checkpoint documentaire accepté sous corrections, `CLAUDE.md`, `ETAT-ACTUEL.md`, `ROADMAP.md` et `docs/relecture/note-relais.md` (actualisations C1 à C4, E1 à E5 et deux lignes d'E6, R1 à R6, N1 à N5 ; rapport de checkpoint, §0 et §4). Ce sont des documents : aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot, aucun outil ni aucun test n'est touché. Contrôles du 2026-10-12, codes de sortie observés, tous 0 : `verify` (sources conformes au manifeste), `assemble` (684 ENTRY, 35 retraits, 0 écartée), `validate-data` (0 erreur, 149 avertissements), `publish` sans `--write` (`data/` à jour), suite complète (510 tests réussis), index vide.

**Dans l'arbre de travail, non committé** :

| Fichier | Nature | État |
|---|---|---|
| `docs/conception/a2/README.md` | modifié | rangement documentaire d'A2 : relu et accepté, **commit non autorisé à ce jour** |
| `docs/conception/a2/A2-GLOBAL-v1.md` | nouveau | snapshot global, référence normative ; identique à son original |
| `docs/conception/legacy/a2/` | nouveau | README et trois documents historiques, **non normatifs** |
| `docs/rapports/etape2-A2-05-perimetre-coherence.md` | nouveau | périmètre **validé** du volet 1 |
| `docs/rapports/etape2-A2-05-perimetre.md` | nouveau | périmètre **validé** du volet 2 |
| `docs/rapports/etape2-A2-05-perimetre-controles-globaux.md` | nouveau | périmètre **validé** du volet 3 |
| `docs/rapports/etape2-A2-05-criblage-coherence.md` | nouveau | résultat du criblage du volet 1, **validé** |
| `docs/rapports/etape2-A2-05-audit-null.md` | nouveau | rapport du volet 2 : **147 fiches arbitrées sur 147**, avec le contrôle de clôture (T7.8) |
| `docs/rapports/etape2-A2-05-bilan-volet2.md` | nouveau | bilan consolidé du volet 2 (arbitré) ; état des volets 1 et 3, ordre d'exécution et périmètre du prochain lot (**proposition, non arbitrée**) |
| `docs/rapports/etape2-A2-05-coherence-retroactive.md` | nouveau | volet 1, lot 1 : **arbitré** (14 conformes, 5 écarts) |
| `docs/rapports/etape2-A2-05-volet1-lot2-perimetre.md` | nouveau | volet 1, lot 2 (provenance) : tri et périmètre, **tranche 1 acceptée** |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance.md` | nouveau | tranche 1 de provenance : **arbitrée le 2026-10-10** (9 sourcés, 25 écarts) ; propositions d'origine conservées |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche2-perimetre.md` | nouveau | périmètre de la tranche 2 et plan recalculé du chantier : **arbitré le 2026-10-10** (§0 du rapport) |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-1bis.md` | nouveau | bloc 1 bis (10 nuances, lots 04 et 07) : **arbitré le 2026-10-10** (5 sourcés, 5 écarts ; V2-26 à V2-30 retenues) |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot00.md` | nouveau | tranche 2, lot 00 (9 nuances) : **arbitré le 2026-10-10** (7 sourcés, 2 écarts ; V2-31 et V2-32 retenues) |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot01.md` | nouveau | tranche 2, lot 01 (34 nuances) : **arbitré le 2026-10-10** (10 sourcés, 24 écarts ; V2-33 à V2-56 retenues) ; **tranche 2 close** |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche3-perimetre.md` | nouveau | périmètre de la tranche 3 (36 nuances, lots 02 et 03) : **arbitré le 2026-10-10**, deux livraisons par lot |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot02.md` | nouveau | tranche 3, lot 02 (22 nuances) : **arbitré le 2026-10-10** (4 sourcés, 3 assumés, 15 écarts ; V2-57 à V2-71 retenues) |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot03.md` | nouveau | tranche 3, lot 03 (14 nuances) : **arbitré le 2026-10-10** (6 sourcés, 2 assumés, 6 écarts ; V2-72 à V2-77 retenues) ; **tranche 3 close** |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche4-perimetre.md` | nouveau | périmètre de la tranche 4 (30 nuances, lots 05 et 06, plus 2 hors JLPT comptées à part) : **arbitré le 2026-10-10**, deux livraisons |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot05.md` | nouveau | tranche 4, lot 05 (12 nuances) et 2 hors JLPT : **arbitrés le 2026-10-10** (lot 05 : 6 sourcés, 6 écarts ; hors JLPT : 1 sourcé, 1 écart ; V2-78 à V2-84 retenues) |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot06.md` | nouveau | tranche 4, lot 06 (18 nuances) : **arbitré le 2026-10-10** (5 sourcés, 1 assumé, 12 écarts ; V2-85 à V2-96 retenues) ; **tranche 4 close** |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche5-perimetre.md` | nouveau | périmètre de la tranche 5 (29 nuances, lots 08 et 09, trois livraisons) : **arbitré le 2026-10-10** |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5a.md` | nouveau | tranche 5, livraison 5a (9 nuances du lot 08) : **arbitrée le 2026-10-10** (3 sourcés, 6 écarts ; V2-97 à V2-102 retenues) |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5b.md` | nouveau | tranche 5, livraison 5b (9 nuances du lot 08) : **arbitrée le 2026-10-10** (4 sourcés, 1 assumé, 4 écarts ; §T0) |
| `docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5c.md` | nouveau | tranche 5, livraison 5c (11 nuances du lot 09) : **arbitrée le 2026-10-12** (7 sourcés, 1 assumé, 3 écarts ; V2-107 à V2-109 retenues ; §U0) ; **tranche 5 close** |
| `docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md` | nouveau | périmètre de la tranche 6 (47 nuances, 41 ENTRY, lots 10 et 11, cinq livraisons) : **arbitré le 2026-10-12** ; audit de 6a autorisé, **non commencé** (il suit la relecture du checkpoint) |
| `docs/rapports/etape2-A2-05-checkpoint-documentaire.md` | nouveau | checkpoint Git documentaire : **contenu et périmètre acceptés le 2026-10-12, sous corrections** (§0 du rapport) ; 36 chemins ; actualisations de gouvernance **appliquées dans l'arbre de travail** ; **rien n'est indexé ni committé** ; accords de commit et de push non donnés |
| `docs/relecture/reprise-A2-05.md` | nouveau | ce relais |

Non suivis et à ne jamais committer : `chatgpt-relecture/`, les archives `chatgpt-relecture-*.zip`, et `a2-05-travail/` (scripts et sorties de l'audit, §8).

**Mise à jour du 2026-10-12** : le paragraphe qui suit décrit l'état d'avant le checkpoint ; les quatre documents de gouvernance sont désormais actualisés dans l'arbre de travail (A2-05 en cours, `5a8687b` enregistré), **sans être indexés ni committés**.

**Les documents de gouvernance ne sont pas à jour.** `CLAUDE.md`, `ETAT-ACTUEL.md`, `ROADMAP.md` et `docs/relecture/note-relais.md` s'arrêtent à la clôture de 5.17 : ils annoncent A2-05 comme « prochaine action » et ne disent rien de ce qui suit. Ils n'enregistrent pas non plus le commit `5a8687b` ni son push. Leur mise à jour est à faire, et demandera un accord de commit.

## 2. Règles de contrôle, inchangées

- Claude réalise dans le dépôt ; ChatGPT relit un export et, par délégation de l'utilisateur, arbitre et autorise ; l'utilisateur relaie et garde le dernier mot.
- **Trois accords distincts et explicites** : validation, commit, push. Un avis favorable n'en vaut aucun.
- Un export : `node tools/export-relecture.mjs --lot lot-27 --ref 5a8687b063fd2fca7c343d544aff040709bc5ec8 --note <fichier> --precedents <ids sources>`, puis une archive ZIP des dix fichiers `01` à `10` à la racine. `--precedents` joint au `07` la fiche source, la décision validée et les décisions de journal des ENTRY listées. Le préfixe `lot-27` de l'export n'est pas le lot 27 d'A2-05.
- Un garde-fou local refuse la première création d'un fichier par l'outil d'écriture et demande d'énoncer les faits ; la seconde tentative passe.

## 3. Structure validée d'A2-05

| Volet | Objet | État |
|---|---|---|
| 1 | cohérence sémantique rétroactive, axes C1 à C10 | **criblage validé et terminé** ; examen individuel : **lot 1 (T1 à T8, 19 SENSE) arbitré : 14 conformes, 5 écarts** ; **377 candidats restants** (axes C1 à C10 ; inchangé par les contrôles de provenance) ; **lot 2 (provenance), contrôle spécialisé** : périmètre de la tranche 1 accepté (34 unités) ; **tranche 1 arbitrée le 2026-10-10 : 9 sourcés, 25 écarts** (来る reclassé écart ; 25 corrections V2-1 à V2-25 retenues, non appliquées) ; **plan recalculé après les deux défauts du tri : 278 nuances restent à lire** (151 à examiner, 83 faux positifs à contre-vérifier, 44 à chaîne d'un caractère seulement), plus 2 nuances hors JLPT jamais criblées ; **périmètre de la tranche 2 arbitré le 2026-10-10** (43 nuances, lots 00 et 01, livrées par lot ; un bloc « 1 bis » de 10 nuances des lots 04 et 07, livré à part) ; **bloc 1 bis arbitré le 2026-10-10 : 5 sourcés, 5 écarts** (V2-26 à V2-30 retenues) ; **268 nuances restaient à lire** après lui ; **tranche 2, lot 00 arbitré le 2026-10-10 : 7 sourcés, 2 écarts** (V2-31 et V2-32 retenues) ; **259 nuances restent** ; **tranche 2, lot 01 arbitré le 2026-10-10 : 10 sourcés, 24 écarts** (V2-33 à V2-56 retenues) ; **tranche 2 close** (53 nuances : 22 sourcées, 31 écarts) ; **225 nuances restent** (tranches 3 à 8), plus 2 hors JLPT à part ; **périmètre de la tranche 3 arbitré le 2026-10-10** (36 nuances, 32 ENTRY, lots 02 et 03, deux livraisons) ; **lot 02 arbitré le 2026-10-10 : 4 sourcés, 3 assumés, 15 écarts** (V2-57 à V2-71 retenues ; classement sourcé / assumé / écart confirmé) ; **203 nuances restent** ; **lot 03 arbitré le 2026-10-10 : 6 sourcés, 2 assumés, 6 écarts** (V2-72 à V2-77 retenues) ; **tranche 3 close** (36 nuances : 10 sourcées, 5 assumées, 21 écarts) ; **189 nuances restent** (tranches 4 à 8), plus 2 hors JLPT à part ; **périmètre de la tranche 4 arbitré le 2026-10-10** (30 nuances, lots 05 et 06, et les 2 hors JLPT comptées à part ; deux livraisons) ; **lot 05 et hors JLPT arbitrés le 2026-10-10 : lot 05, 6 sourcés, 6 écarts ; hors JLPT, 1 sourcé, 1 écart** (V2-78 à V2-84 retenues, V2-84 d'origine `hors_jlpt` dans la liste globale unique) ; **177 nuances du plan restent** ; **lot 06 arbitré le 2026-10-10 : 5 sourcés, 1 assumé, 12 écarts** (V2-85 à V2-96 retenues) ; **tranche 4 close** (30 nuances du plan : 11 sourcées, 1 assumée, 18 écarts ; hors JLPT à part : 1 sourcée, 1 écart) ; **159 nuances du plan restent** (tranches 5 à 8) ; **périmètre de la tranche 5 arbitré le 2026-10-10** (29 nuances, 24 ENTRY, lots 08 et 09, trois livraisons : 5a 9, 5b 9, 5c 11) ; **livraison 5a arbitrée le 2026-10-10 : 3 sourcés, 6 écarts** (V2-97 à V2-102 retenues) ; **150 nuances restent** ; **livraison 5b arbitrée le 2026-10-10 : 4 sourcés, 1 assumé, 4 écarts** (V2-103 à V2-106 retenues ; 話す sourcé, variante autorisée par la fiche) ; **121 corrections, 109 ENTRY, aucune appliquée** ; **141 nuances restent** (5c : 11 ; tranches 6 à 8 : 130) ; **livraison 5c arbitrée le 2026-10-12 : 7 sourcés, 1 assumé, 3 écarts** (V2-107 à V2-109 retenues sans modification ; 泳ぐ sourcé et 弾く assumé confirmés, sans correction de repli ; 国 : 国へかえる conservé) ; **tranche 5 close** (29 nuances : 14 sourcées, 2 assumées, 13 écarts) ; **124 corrections, 112 ENTRY, aucune appliquée** ; **130 nuances restent** (tranche 6 : 47 ; tranche 7 : 39 ; tranche 8 : 44) ; **périmètre de la tranche 6 arbitré le 2026-10-12** (47 nuances, 41 ENTRY, lots 10 et 11, sans ajout ni retrait ; cinq livraisons : 6a 10, 6b 9, 6c 10, 6d 7, 6e 11) ; **audit de 6a seule autorisé**, chaque livraison suivante après l'arbitrage de la précédente ; **non commencé** : il suit la relecture du checkpoint documentaire (§10) |
| 2 | audit individuel des 147 `null` | **terminé et arbitré le 2026-10-08 : 147 cas sur 147** (L 136, F 2, C 9, N 0) ; dix modifications de SENSE retenues, **aucune appliquée** |
| 3 | contrôles globaux résiduels, G1 à G7 | **non commencé** |

**Ordre arbitré** : criblage de cohérence (fait) ; audit individuel des 147 `null` (en cours) ; examen individuel des autres candidats du volet 1 ; arbitrage global. Un même cas n'est audité individuellement qu'une fois. Le volet 3 peut être mené en parallèle, sur autorisation.

**Volet 1, criblage** : 443 sens candidats, 381 non-candidats ; 27 règles, dont quatre ajoutées après lecture (C1-f, C1-g, C1-h, C8-c) et dix points réservés complétés ; échantillon de validation 2 (graine 20261009, 50 sens) propre. Les quatre lectures hésitantes (お金, 橋, 音楽, 帰国) sont maintenues hors candidats. 17 sens portent `interrogatif` : E5 normatif commun, dont le chantier normatif doit aboutir avant la clôture de l'étape 2.

## 4. Volet 2 : cumul arbitré

| Tranche | Cas | L | F | C | N |
|---|---|---|---|---|---|
| 27 `type-nul` | 27 | 24 | 1 | 2 | 0 |
| `categorie-nulle`, première tranche | 26 | 23 | 1 | 2 | 0 |
| `categorie-nulle`, deuxième tranche, « propriété générale » | 29 | 29 | 0 | 0 | 0 |
| `categorie-nulle`, troisième tranche, « action générale », première partie | 22 | 21 | 0 | 1 | 0 |
| `categorie-nulle`, quatrième tranche, « action générale », seconde partie | 14 | 14 | 0 | 0 | 0 |
| `categorie-nulle`, cinquième tranche, « aucune catégorie ne nomme la notion » | 18 | 14 | 0 | 4 | 0 |
| `categorie-nulle`, sixième et dernière tranche, « autre formulation » | 11 | 11 | 0 | 0 | 0 |
| **Bilan définitif du volet 2** | **147** | **136** | **2** | **9** | **0** |
| Reste à auditer | 0 | | | | |

**La sixième et dernière tranche (rapport d'audit, « Tranche 7 ») est arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : 11 L, aucune modification. **Le volet 2 est entièrement arbitré : 147 sur 147, L 136, F 2, C 9, N 0.** 他 est confirmé L (l'altérité ; « Le reste » ne suffit pas à imposer la catégorie de 後 sens 3) ; 出来る sens 2 est confirmé L (`resultat`, rare mais conforme) ; たぶん est confirmé L (dimension `probabilite` maintenue, `type-nul` non rouvert) ; する et やる sont confirmés L. Le bilan consolidé et la suite proposée sont dans `docs/rapports/etape2-A2-05-bilan-volet2.md` (**proposition, non arbitrée** pour l'ordre d'exécution et le périmètre du prochain lot).
- **Fondement réel de chaque `null`** (T7.3) : huit sens relèvent d'un élément qu'A2-L3 §6 nomme hors hiérarchie (action générique : する, やる ; propriété générale : きれい, 有名, よく ; objet générique : 物 ; identité / différence : 他 ; possibilité / nécessité : たぶん) ; trois tiennent par l'absence de toute catégorie décrivant le sens (問題, 所 sens 2, 出来る sens 2).
- **Points examinés** : le type `resultat` de 出来る sens 2 est conforme à la définition d'A2-ST (rare, non fautif) ; la dimension `probabilite` de たぶん décrit directement le sens ; する et やる sont traités de façon cohérente.
- **Une divergence nouvelle, sans verdict sur le comparable** : 他 (« Le reste » en traduction, sans catégorie) et 後 sens 3 « Le reste » (totalité et partie › reste).
- **Cinq réserves** : よく sens 2 (type), 問題 (axe difficulté non proposé), 他 (C possible, « Reste »), 所 sens 2 (traduction « Partie »), 出来る sens 2 (axe complet non proposé).
- **Contrôle de clôture du volet 2** (T7.8), calculé par script : 147 fiches pour 147 avertissements (120 et 27), aucun sans fiche, aucun en trop, aucun doublon ; verdicts antérieurs conservés (0 écart) ; L 136, F 2, C 9, N 0 si les 11 L sont confirmés ; **10 SENSE à modifier pour 11 avertissements**, dans 9 ENTRY et 7 lots (01, 05, 10, 11, 13, 18, 21) ; il resterait 136 avertissements émis, tous L (112 `categorie-nulle`, 24 `type-nul`).

**La cinquième tranche (rapport d'audit, « Tranche 6 ») est arbitrée le 2026-10-08** (ChatGPT, par délégation) : 14 L, 4 C.
- **Quatre modifications retenues, non appliquées** (§5, n° 7 à 10) : 時計 → `temps` (niveau 1) ; カレンダー → `temps › calendrier` ; また sens 1 et もう一度 → `temps › chronologie › succession`. Les autres champs de ces sens restent inchangés. Deux principes en ressortent : **un objet spécialisé suit le domaine qu'il sert** (A2-L3 §7, règle 5) ; **« une fois de plus » est, comme « la première fois », une place dans une suite d'occurrences**.
- **`v_627_s2` 一人 « Seul » : L, et non C.** La fiche décrit l'absence de compagnie et non une interaction sociale ; la catégorie de 一緒 « Ensemble » ne suffit pas à imposer une symétrie. `category: null` est maintenu ; la divergence avec 一緒 est conservée au suivi transversal (§6 bis, 7), sans verdict sur ce comparable.
- **Les 13 autres L sont confirmés.** Pour 死ぬ, la formule de la famille est inexacte (l'arbre nomme la mort) et la conclusion tient par le débordement de la fiche, en cohérence avec 力.
- **Les justifications historiques ne sont pas réécrites** (D0404, D0849, D1379, D1385, D1015).
- **Réserves et points transversaux conservés** : 死ぬ, 声, だんだん / ゆっくり, 本当, まっすぐ (§6 bis).

**La quatrième tranche (rapport d'audit, « Tranche 5 ») est arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : 14 L, aucune modification. **La famille « action générale » est entièrement arbitrée : 36 cas** (35 L, 1 C).
- **渡す, sens 1 « Remettre » : L confirmé** ; le geste de remise d'un objet ne suffit pas à imposer « Interactions sociales ». La distinction avec 上げる « Donner » reste documentée.
- **出る, sens 3 « Apparaître » : L confirmé** ; le type `evenement` est cohérent ; la justification historique « action générale » (D0339) est imprécise et **n'est pas réécrite**.
- **座る et 立つ : L confirmés**, en l'absence de catégorie décrivant les postures.
- **Aucun `null` n'est fondé sur la formule** : chaque fiche donne un fondement vérifié sur la fiche source.
- **Réserves conservées** : 返す (deux emplois monétaires sur trois) ; やる, sens 2 (la traduction publiée omet « quelqu'un d'inférieur ») ; 吹く, sens 2 (asymétrie avec 弾く) ; 出る, sens 2 et sens 3 (voir §6 bis).

**La troisième tranche (rapport d'audit, « Tranche 4 ») est arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : 21 L, 1 C.
- **`v_528_s1` 並ぶ « Faire la queue » : C confirmé**, `category` : `null` → `espace_proprietes_spatiales › position_localisation`, `semantic_type: action` conservé. Modification retenue, **non appliquée** (§5, n° 6).
- **`v_536_s3` 出す « Présenter » : L confirmé** : la soumission d'un document ne suffit pas à établir « Communication › Transmission ».
- **« Action générale » et « action générique »** : la correspondance de substance est acceptée **pour les cas justifiés individuellement**. **Ce n'est pas une présomption automatique pour les tranches suivantes** : chaque `null` se vérifie sur sa fiche.
- **Réserves conservées** : 磨く (sans catégorie) et 洗う (catégorisé, hors des 147, **sans verdict**, point pour le volet 1) ; la traduction principale de 切る, sens 2, « Raccrocher (un téléphone) », plus étroite que le sens, et son asymétrie avec かける, sens 1 ; la citation inexacte du §4.4 par D0069 (無くす), sans réécriture de la décision.

**La deuxième tranche (rapport d'audit, « Tranche 3 ») est arbitrée le 2026-10-08** (ChatGPT, par délégation) : 29 L. Les 28 L proposés sont confirmés ; le seul C proposé, `v_265_s2` 冷たい « Froid (attitude) », est **reclassé L** et garde `category: null` : la fiche atteste « Insensible (figuré) », mais ne décrit pas assez précisément un état psychologique. Les réserves de 丈夫, 力 et 意味 sont arbitrées L. **Cette tranche ne retient aucune correction.**

**Point de contrôle transversal ouvert pour le volet 1, sans verdict** : le traitement du caractère d'une personne. 明るい, 暗い et 爽やか (sens 2) sont en `etre_humain › psychologie_esprit › etats_psychologiques` ; 冷たい (sens 2) et まっすぐ « Honnête » (D1411 : « le registre n'a pas de catégorie pour la personnalité ou le caractère ») sont sans catégorie. 甘い, sens 2, y est rattaché par sa réserve.

**Réserves documentaires conservées** : la traduction principale de 汚い, sens 2, « Grossier (langage) », ne nomme que la moitié du sens ; la traduction publiée de 冷たい, sens 2, « Distant », s'écarte de « Insensible » ; 力 repose sur la même doctrine que 死ぬ, à auditer de façon cohérente.

Pendant l'audit : L + F + C + N = 147. À la déclaration finale : N = 0 et L + F + C = 147.

Les deux F sont **le même SENSE** (`v_500_s2`), compté une fois par avertissement.

## 5. Corrections retenues, non exécutées

**Aucune n'est faite.** Elles rejoignent la future liste fermée des corrections du volet 2. **Dix modifications de SENSE, pour onze avertissements** (la sixième retenue à l'arbitrage de la tranche 4, les quatre dernières à celui de la tranche 6). また porte deux modifications, une par sens :

| # | SENSE | Classement | Modification retenue | Avertissements qui cesseraient |
|---|---|---|---|---|
| 1 | `v_500_s2` また « Aussi » | F | `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]` ; `semantic_type` et `category` restent `null` | **deux** : son `type-nul` et son `categorie-nulle`. **Une seule modification du SENSE.** |
| 2 | `v_65_s2` 頭 « Esprit » | C | `semantic_type` : `null` → `propriete` | son `type-nul` |
| 3 | `v_696_s1` 表 « Face » | C | `semantic_type` : `null` → `lieu` | son `type-nul` |
| 4 | `v_606_s1` 皆 « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` | son `categorie-nulle` |
| 5 | `v_687_s1` 皆さん « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` | son `categorie-nulle` |
| 6 | `v_528_s1` 並ぶ « Faire la queue » | C | `category` : `null` → `espace_proprietes_spatiales › position_localisation` ; `semantic_type: action` conservé | son `categorie-nulle` |
| 7 | `v_671_s1` 時計 « Horloge » | C | `category` : `null` → `temps` (niveau 1 seul) ; autres champs inchangés | son `categorie-nulle` |
| 8 | `v_287_s1` カレンダー « Calendrier » | C | `category` : `null` → `temps › calendrier` (niveau 2) ; autres champs inchangés | son `categorie-nulle` |
| 9 | `v_500_s1` また « À nouveau » | C | `category` : `null` → `temps › chronologie › succession` ; autres champs inchangés | son `categorie-nulle` |
| 10 | `v_503_s1` もう一度 « Encore une fois » | C | `category` : `null` → `temps › chronologie › succession` ; autres champs inchangés | son `categorie-nulle` |

**Procédure quand elles seront autorisées** (périmètre du volet 2, §7) : liste fermée arbitrée ; **lot 27**, lot véhicule d'A2-05 sans ENTRY propre ; réouverture de chaque ENTRY dans son lot d'origine ; décisions nouvelles à la fin du journal, à partir de D1614 ; validation atomique ; publication par `publish --write` ; inventaire des avertissements resynchronisé par une commande déterministe et testée, jamais à la main (chantier d'outillage séparé) ; commit et push sur accords distincts.

## 5 bis. Corrections du volet 1, tenues à part (mise à jour du 2026-10-10)

**Aucune n'est faite.** La liste globale compte **trois listes distinctes** (bilan, §8.7) : les dix modifications ci-dessus ; **V1-1 à V1-5** (volet 1, lot 1 ; bilan, §8.1) ; **V2-1 à V2-25** (volet 1, lot 2, tranche 1 de provenance ; bilan, §8.6, et rapport de provenance, §P1.3). **40 corrections, 35 ENTRY.** Les V2 portent sur 21 nuances d'ENTRY, 3 nuances de sens et une liste de particules (吹く sens 1), dans 24 ENTRY des lots 04 et 07 ; elles ne touchent aucun avertissement. Les numéros V2-1 à V2-24 sont ceux de la proposition du 2026-10-08 ; **V2-25 (来る)** naît de l'arbitrage du 2026-10-10 : « … le kanji se lit く, き ou こ selon la forme (d'origine, polie, négative). » Les deux variantes de correction, d'abord non tranchées (V2-3 : 入る, garder 入っている ; V2-6 : 渡る, ajouter 道路を渡る), **sont écartées au second arbitrage du 2026-10-10** : les corrections de base sont conservées, aucun des 25 verdicts n'est rouvert. **V2-26 à V2-30** (bloc 1 bis : 寒い, 熱い, 自動車, 橋, 花), d'abord proposées, **sont retenues sans modification à l'arbitrage du 2026-10-10** (bilan, §8.8) : **la liste globale compte désormais 45 corrections (10 + 5 + 30), dans 40 ENTRY, toutes non appliquées.** V2-31 et V2-32 (tranche 2, lot 00 : いい, 無くす), d'abord proposées, **sont retenues sans modification à l'arbitrage du 2026-10-10** (bilan, §8.9) : **la liste globale compte désormais 47 corrections (10 + 5 + 32), dans 42 ENTRY, toutes non appliquées.** **Critère confirmé** : une graphie n'est sourcée que si la fiche, ou sa fiche fusionnée, l'atteste pour le mot concerné ; une graphie déduite par analogie ne l'est pas. V2-33 à V2-56 (tranche 2, lot 01), d'abord proposées, **sont retenues sans modification de leur contenu à l'arbitrage du 2026-10-10** (bilan, §8.10) : **la liste globale compte désormais 71 corrections (10 + 5 + 56), dans 64 ENTRY, toutes non appliquées**, différées jusqu'à la phase globale de correction. D0081 et D0083 (伯母, 伯父) restent intactes ; le changement sera porté par une décision nouvelle. Les transcriptions en kana de romajis attestés (V2-53 みんな, V2-55 おまわりさん) sont recevables ; elles n'autorisent pas l'ajout de graphies en kanji. **État au 2026-10-12, après la clôture de la tranche 5** : les tranches 3 à 5 ont ajouté V2-57 à V2-109 (bilan, §8.11 à §8.17) ; **la liste globale unique compte 124 corrections (10 + 5 + 109), dans 112 ENTRY, toutes non appliquées** ; V2-84 y figure avec l'origine `hors_jlpt`.

## 6. Arbitrages de fond à ne pas perdre

- **Les normes actuelles jugent** : snapshots de `docs/conception/a2/`, addenda validés, registres. Les documents de `docs/conception/legacy/a2/` éclairent, sans fonder aucun verdict.
- **Hors hiérarchie par décision de l'architecture** (A2-L3 §6, A2-GLOBAL §4.4) : objet, personne, lieu et action génériques, propriété générale, identité / différence, possibilité / nécessité, validité / adéquation, inclusion / appartenance, transitif / intransitif. Pour eux, `category: null` est la réponse de l'architecture, non une lacune.
- **« État général » et « événement général » ne sont pas dans cette liste.** Un `null` justifié par ces formules se vérifie par un élément de la liste que la raison ne nommait pas, ou par l'absence de toute catégorie décrivant le sens, après relecture de l'arbre d'A2-L3.
- **« Personne générique » ne s'étend pas automatiquement à un ensemble complet de personnes** : A2-L3 nomme « Totalité & partie › Totalité ». Le type `groupe_collectif` dit la nature du référent, la catégorie la totalité.
- **Un `null` de type** : une partie du corps, le corps entier, une unité de mesure, un compteur, un son, l'électricité sont confirmés L. Un nom de position est un `lieu` (表, comme 上 et 横). Une capacité attribuée à une personne est une `propriete` (頭 sens 2, comme 力).
- **Un C final a été corrigé** ; si l'arbitrage rejette la correction, le cas est reclassé avant la sortie. **N n'est jamais un état final.**
- **La correction d'un SENSE n'en renumérote aucun.**

## 6 bis. Suivi transversal du volet 1 : points de contrôle ouverts par l'audit des `null`

Ces points ont été relevés pendant le volet 2 et renvoyés au volet 1 par arbitrage. **Aucun n'a de verdict ; aucune correction n'est décidée.**

1. **Le caractère d'une personne** (tranche 3). 明るい, 暗い et 爽やか (sens 2) sont en `etre_humain › psychologie_esprit › etats_psychologiques` ; 冷たい (sens 2, L) et まっすぐ « Honnête » (D1411) sont sans catégorie ; 甘い, sens 2, y est rattaché par sa réserve.
2. **磨く et 洗う** (tranche 4). 洗う (lot 03) est en entretien domestique › nettoyage bien que sa fiche couvre plusieurs domaines ; 磨く (L) est sans catégorie.
3. **Provenance des informations publiées non retrouvées dans les fiches sources** (tranche 5, arbitrage du 2026-10-08). À contrôler, en recherchant d'abord si des décisions explicites autorisaient ces éléments :
   - `v_642_s2` 出る « Assister à » : particule に ; nuance « 授業に出る », « 会議に出る » ;
   - `v_642_s3` 出る « Apparaître » : particule が ; nuance « 月が出る » ;
   - `v_266_s2` 吹く « Souffler (de l'air) » : nuance « 笛を吹く ».

   Ni les fiches sources, ni la fiche fusionnée de 出ます, ni les anciens exemples ne les contiennent. D'autres entrées des premiers lots peuvent être concernées : le contrôle n'est pas limité à ces trois sens.
4. **Traductions publiées plus étroites que le sens** : 汚い, sens 2 « Grossier (langage) » ; 切る, sens 2 « Raccrocher (un téléphone) » ; やる, sens 2 « Donner (à des plantes, des animaux) » ; 冷たい, sens 2 (« Distant » pour « Insensible »).
5. **Asymétries documentées, tenues pour justifiées par les fiches** : 切る, sens 2, et かける, sens 1 ; 渡す et 上げる ; 吹く, sens 2, et 弾く.
6. **Raisons historiques inexactes dans la lettre, non réécrites** : D0069 (無くす, citation du §4.4) ; D0339 (出る, sens 3, « action générale » pour un `evenement`) ; D1299 (死ぬ : l'arbre nomme la mort, le `null` vient du débordement de la fiche) ; D1411 (まっすぐ : « pas de catégorie pour la personnalité ou le caractère », formule plus large que ce qu'elle établit).
7. **一緒 et 一人, sens 2** (tranche 6). 一緒 « Ensemble » (lot 22) est en `relations_sociales › interactions_sociales` ; 一人 « Seul » (L) est sans catégorie. **Aucun verdict sur 一緒.**
8. **Le type des adverbes de manière** (tranches 6 et 7) : だんだん `concept_abstrait` (lot 21) ; ゆっくり (lot 22) et よく sens 2 (lot 21) `propriete`. Aucune proposition de changement.
9. **本当** (tranche 6) : la fiche dit « réel, authentique ou vrai » ; le sens porte l'axe vrai / faux, non l'axe réel / fictif, qu'A2-DIM distingue.
10. **Doctrines communes à tenir cohérentes** : 死ぬ et 力 (une fiche qui déborde l'être humain par l'animal) ; 声 (`type-nul` arbitré L à la tranche 1, non rouvert).
12. **他 et 後, sens 3** (tranche 7). « Le reste » porte la catégorie totalité et partie › reste comme sens de 後, attesté par une seule traduction ; 他 « Autre » (L) est sans catégorie. **Aucun verdict sur 後.**
11. **Sens corrigés dont un comparable catégorisé reste à relire** : 初めて (succession), fondement des C de また et de もう一度 ; ペン, 切符 et les objets rangés par leur domaine fonctionnel, fondement des C de 時計 et de カレンダー. Aucun écart relevé ; cités pour mémoire.

## 7. Les 94 `categorie-nulle` restants après la première tranche

**Mise à jour du 2026-10-08** : la famille « propriété générale » (29) est auditée et arbitrée (29 L) ; il reste 65 cas non commencés (36, 18 et 11). Le périmètre proposé pour la suite est au §8 bis.

Regroupement **automatique**, d'après la formulation de la raison journalisée (les familles du rapport de criblage, annexe D). Il prépare la lecture ; **il ne classe aucun cas**. Un cas tombe dans la première famille dont sa raison contient la formule.

| Famille | Cas restants |
|---|---|
| action générale | 36 |
| propriété générale | 29 |
| aucune catégorie ne nomme la notion | 18 |
| autre formulation | 11 |
| **Total** | **94** |

### action générale (36)

| SENSE | Mot | Sens | Classe | Type | Lot | Décision |
|---|---|---|---|---|---|---|
| `v_50_s2` | 差す | Pointer | verbe | action | 18 | D1217 |
| `v_79_s1` | 押す | Pousser | verbe | action | 18 | D1208 |
| `v_130_s1` | 引く | Tirer | verbe | action | 18 | D1212 |
| `v_164_s3` | かける | Accrocher | verbe | action | 08 | D0521 |
| `v_266_s2` | 吹く | Souffler (de l'air) | verbe | action | 07 | D0472 |
| `v_522_s1` | 付ける | Allumer | verbe | action | 18 | D1194 |
| `v_522_s2` | 付ける | Fixer | verbe | action | 18 | D1195 |
| `v_526_s1` | コピーする | Photocopier | verbe | action | 19 | D1260 |
| `v_528_s1` | 並ぶ | Faire la queue | verbe | action | 18 | D1227 |
| `v_532_s1` | 作る | Fabriquer | verbe | action | 18 | D1236 |
| `v_533_s1` | 借りる | Emprunter | verbe | action | 19 | D1267 |
| `v_536_s3` | 出す | Présenter | verbe | action | 18 | D1225 |
| `v_539_s1` | 切る | Couper | verbe | action | 18 | D1198 |
| `v_539_s2` | 切る | Raccrocher (un téléphone) | verbe | action | 18 | D1199 |
| `v_541_s1` | 取る | Prendre | verbe | action | 18 | D1202 |
| `v_541_s2` | 取る | Obtenir | verbe | action | 18 | D1203 |
| `v_542_s2` | 吸う | Aspirer | verbe | action | 19 | D1293 |
| `v_545_s1` | 変える | Changer | verbe | action | 18 | D1232 |
| `v_551_s1` | 座る | S'asseoir | verbe | action | 19 | D1245 |
| `v_552_s1` | 待つ | Attendre | verbe | action | 19 | D1281 |
| `v_561_s1` | 消す | Éteindre | verbe | action | 18 | D1189 |
| `v_562_s1` | 渡す | Remettre | verbe | action | 19 | D1273 |
| `v_564_s1` | 無くす | Perdre (un objet) | verbe | action | 00 | D0069 |
| `v_567_s1` | 磨く | Brosser | verbe | action | 18 | D1238 |
| `v_568_s1` | 立つ | Se lever | verbe | action | 19 | D1247 |
| `v_575_s1` | 貸す | Prêter | verbe | action | 19 | D1264 |
| `v_576_s1` | 貼る | Coller | verbe | action | 18 | D1204 |
| `v_578_s1` | 返す | Rendre | verbe | action | 19 | D1270 |
| `v_580_s1` | 開ける | Ouvrir | verbe | action | 18 | D1172 |
| `v_608_s2` | やる | Donner (à des plantes, des animaux) | verbe | action | 20 | D1335 |
| `v_635_s2` | 休む | S'absenter | verbe | action | 19 | D1249 |
| `v_637_s1` | 使う | Utiliser | verbe | action | 18 | D1206 |
| `v_642_s2` | 出る | Assister à | verbe | action | 04 | D0338 |
| `v_642_s3` | 出る | Apparaître | verbe | evenement | 04 | D0339 |
| `v_665_s1` | 持つ | Tenir | verbe | action | 20 | D1310 |
| `v_709_s1` | 閉める | Fermer | verbe | action | 18 | D1180 |

### propriété générale (29)

| SENSE | Mot | Sens | Classe | Type | Lot | Décision |
|---|---|---|---|---|---|---|
| `v_62_s1` | 軽い | Léger | adjectif_i | propriete | 15 | D1073 |
| `v_265_s2` | 冷たい | Froid (attitude) | adjectif_i | propriete | 07 | D0481 |
| `v_420_s1` | いい | Bon | adjectif_i | propriete | 00 | D0065 |
| `v_421_s1` | いろいろ | Divers | adjectif_na | propriete | 22 | D1423 |
| `v_422_s2` | うるさい | Agaçant | adjectif_i | propriete | 17 | D1152 |
| `v_427_s2` | まずい | Fâcheux | adjectif_i | propriete | 02 | D0197 |
| `v_428_s1` | 丈夫 | Solide | adjectif_na | propriete | 17 | D1141 |
| `v_432_s1` | 便利 | Pratique | adjectif_na | propriete | 16 | D1109 |
| `v_434_s1` | 危ない | Dangereux | adjectif_i | propriete | 16 | D1114 |
| `v_438_s1` | 同じ | Même | determinant | propriete | 22 | D1420 |
| `v_442_s1` | 大切 | Important | adjectif_na | propriete | 16 | D1102 |
| `v_449_s1` | 弱い | Faible | adjectif_i | propriete | 17 | D1138 |
| `v_451_s1` | 強い | Fort | adjectif_i | propriete | 17 | D1135 |
| `v_452_s1` | 悪い | Mauvais | adjectif_i | propriete | 16 | D1098 |
| `v_456_s1` | 易しい | Facile | adjectif_i | propriete | 16 | D1091 |
| `v_461_s2` | 汚い | Grossier (langage) | adjectif_i | propriete | 17 | D1146 |
| `v_462_s1` | 清い | Pur | adjectif_i | propriete | 17 | D1149 |
| `v_462_s2` | 清い | Pur (moralement) | adjectif_i | propriete | 17 | D1150 |
| `v_464_s2` | 甘い | Indulgent | adjectif_i | propriete | 02 | D0192 |
| `v_478_s1` | 賑やか | Animé | adjectif_na | propriete | 17 | D1154 |
| `v_484_s1` | 重い | Lourd | adjectif_i | propriete | 15 | D1070 |
| `v_484_s2` | 重い | Grave | adjectif_i | propriete | 15 | D1071 |
| `v_486_s1` | 難しい | Difficile | adjectif_i | propriete | 16 | D1094 |
| `v_489_s1` | 静か | Calme | adjectif_na | propriete | 17 | D1156 |
| `v_495_s2` | 大変 | Difficile | adjectif_na | propriete | 00 | D0067 |
| `v_513_s2` | 意味 | Intérêt | nom | propriete | 06 | D0445 |
| `v_609_s1` | 立派 | Magnifique | adjectif_na | propriete | 16 | D1107 |
| `v_609_s2` | 立派 | Remarquable | adjectif_na | propriete | 16 | D1108 |
| `v_646_s1` | 力 | Force | nom | propriete | 20 | D1362 |

### aucune catégorie ne nomme la notion (18)

| SENSE | Mot | Sens | Classe | Type | Lot | Décision |
|---|---|---|---|---|---|---|
| `v_144_s1` | 忙しい | Occupé | adjectif_i | etat | 16 | D1122 |
| `v_287_s1` | カレンダー | Calendrier | nom | objet_artefact | 13 | D0849 |
| `v_425_s1` | だんだん | Graduellement | adverbe | concept_abstrait | 21 | D1399 |
| `v_457_s1` | 暇 | Libre | adjectif_na | etat | 16 | D1120 |
| `v_500_s1` | また | À nouveau | adverbe | concept_abstrait | 21 | D1379 |
| `v_503_s1` | もう一度 | Encore une fois | adverbe | concept_abstrait | 21 | D1385 |
| `v_504_s2` | ゆっくり | Tranquillement | adverbe | propriete | 22 | D1435 |
| `v_510_s1` | 本当 | Vérité | nom | concept_abstrait | 00 | D0068 |
| `v_525_s2` | まっすぐ | Honnête | adverbe | propriete | 22 | D1411 |
| `v_542_s1` | 吸う | Fumer | verbe | action | 19 | D1292 |
| `v_558_s1` | 死ぬ | Mourir | verbe | evenement | 19 | D1299 |
| `v_598_s1` | たばこ | Cigarette | nom | objet_artefact | 19 | D1295 |
| `v_598_s2` | たばこ | Tabac | nom | substance_matiere | 19 | D1301 |
| `v_627_s2` | 一人 | Seul | nom | etat | 14 | D1015 |
| `v_653_s1` | 声 | Voix | nom | null | 20 | D1369 |
| `v_671_s1` | 時計 | Horloge | nom | objet_artefact | 05 | D0404 |
| `v_685_s1` | 生活 | Mode de vie | nom | concept_abstrait | 19 | D1289 |
| `v_694_s1` | 荷物 | Bagage | nom | objet_artefact | 05 | D0408 |

### autre formulation (11)

| SENSE | Mot | Sens | Classe | Type | Lot | Décision |
|---|---|---|---|---|---|---|
| `v_181_s1` | する | Faire | verbe | action | 20 | D1331 |
| `v_424_s1` | きれい | Beau | adjectif_na | propriete | 00 | D0066 |
| `v_458_s1` | 有名 | Célèbre | adjectif_na | propriete | 16 | D1111 |
| `v_506_s2` | よく | Bien | adverbe | propriete | 21 | D1374 |
| `v_511_s1` | 問題 | Problème | nom | concept_abstrait | 20 | D1359 |
| `v_521_s1` | たぶん | Peut-être | adverbe | null | 22 | D1432 |
| `v_523_s2` | 出来る | Être achevé / prêt | verbe | resultat | 20 | D1317 |
| `v_605_s1` | 他 | Autre | nom | concept_abstrait | 22 | D1427 |
| `v_608_s1` | やる | Faire | verbe | action | 20 | D1334 |
| `v_664_s2` | 所 | Partie | nom | concept_abstrait | 20 | D1355 |
| `v_684_s1` | 物 | Chose | nom | objet_artefact | 20 | D1352 |

## 8. Périmètre proposé pour la prochaine tranche

**Mise à jour du 2026-10-08 : périmètre validé par ChatGPT (les 29 cas, tels quels), audit individuel livré (export `chatgpt-relecture-A2-05-categorie-nulle-t2.zip`), puis tranche arbitrée : 29 L** (rapport d'audit, « Tranche 3 »). Les cinq `propriete` des autres familles (きれい, 有名, よく, ゆっくり, まっすぐ) ont servi de comparables, **sans verdict**. Le texte ci-dessous est la proposition de périmètre d'origine.

**Proposition, non arbitrée. Aucune décision lexicale n'est prise sur ces cas ; aucune fiche n'a été lue en vue de leur audit.**

**La famille « propriété générale », en entier : 29 cas.** Elle tient dans la taille demandée (20 à 30) sans être coupée, et ses raisons invoquent toutes le même élément de la norme, ce qui rend les comparaisons directes.

- Sens concernés : `v_62_s1` 軽い ; `v_265_s2` 冷たい ; `v_420_s1` いい ; `v_421_s1` いろいろ ; `v_422_s2` うるさい ; `v_427_s2` まずい ; `v_428_s1` 丈夫 ; `v_432_s1` 便利 ; `v_434_s1` 危ない ; `v_438_s1` 同じ ; `v_442_s1` 大切 ; `v_449_s1` 弱い ; `v_451_s1` 強い ; `v_452_s1` 悪い ; `v_456_s1` 易しい ; `v_461_s2` 汚い ; `v_462_s1` 清い ; `v_462_s2` 清い ; `v_464_s2` 甘い ; `v_478_s1` 賑やか ; `v_484_s1` 重い ; `v_484_s2` 重い ; `v_486_s1` 難しい ; `v_489_s1` 静か ; `v_495_s2` 大変 ; `v_513_s2` 意味 ; `v_609_s1` 立派 ; `v_609_s2` 立派 ; `v_646_s1` 力.
- Comparables à joindre à l'export : les adjectifs catégorisés des mêmes familles source (`descriptions_qualites / …`), que la règle C1-h du criblage a rendus candidats, et les sens portant une dimension d'A2-DIM.
- **Question à arbitrer avec le périmètre** : 29 cas, c’est le haut de la fourchette. La famille peut aussi être coupée en deux tranches par classe (adjectifs en i d’un côté, adjectifs en na, noms et adverbes de l’autre) ; je propose de la garder entière, pour que les comparaisons restent dans une même relecture.

**Tranches suivantes, à titre indicatif** : « action générale » (36 cas, à couper en deux par famille source : manipulation et objets, puis les autres) ; puis « aucune catégorie ne nomme la notion » (18 cas) et « autre formulation » (11 cas).

## 8 bis. Périmètre proposé pour la tranche suivante (2026-10-08)

**Mise à jour du 2026-10-08 : périmètre validé par ChatGPT (les 22 cas de la première partie, tels quels), audit individuel livré, puis tranche arbitrée : 21 L, 1 C** (rapport d'audit, « Tranche 4 »). Les 14 cas de la seconde partie font l'objet du §8 ter ; aucun n'est audité. Le texte ci-dessous est la proposition de périmètre d'origine.

**Proposition, non arbitrée. Aucune fiche n'a été lue en vue de l'audit ; aucune décision lexicale n'est prise.** Relevé par script, en lecture seule, sur l'inventaire, le journal, l'état publié et le résultat du criblage.

**« Action générale », première partie : 22 cas.** La famille compte 36 cas, au-delà de la taille d'une tranche (20 à 30) ; elle est coupée en deux par un critère vérifiable.

- **Les 19 sens décidés au lot 18 « Actions sur les objets »** : `v_50_s2` 差す ; `v_79_s1` 押す ; `v_130_s1` 引く ; `v_522_s1` et `v_522_s2` 付ける ; `v_528_s1` 並ぶ ; `v_532_s1` 作る ; `v_536_s3` 出す ; `v_539_s1` et `v_539_s2` 切る ; `v_541_s1` et `v_541_s2` 取る ; `v_545_s1` 変える ; `v_561_s1` 消す ; `v_567_s1` 磨く ; `v_576_s1` 貼る ; `v_580_s1` 開ける ; `v_637_s1` 使う ; `v_709_s1` 閉める.
- **Trois sens d'autres lots que leurs raisons ou leur famille source y rattachent** : `v_164_s3` かける « Accrocher » (lot 08 ; la raison de 付ける, sens 2, y renvoie) ; `v_665_s1` 持つ « Tenir » (lot 20 ; sa raison renvoie à 取る) ; `v_564_s1` 無くす « Perdre (un objet) » (lot 0 ; même famille source « possession » que 持つ).

**Deuxième partie, tranche d'après : 14 cas** : `v_533_s1` 借りる ; `v_575_s1` 貸す ; `v_562_s1` 渡す ; `v_578_s1` 返す ; `v_551_s1` 座る ; `v_568_s1` 立つ ; `v_526_s1` コピーする ; `v_542_s2` 吸う ; `v_552_s1` 待つ ; `v_635_s2` 休む (lot 19) ; `v_642_s2` et `v_642_s3` 出る (lot 04) ; `v_266_s2` 吹く (lot 07) ; `v_608_s2` やる (lot 20).

**Chevauchements avec le volet 1** (un cas n'étant audité qu'une fois, la fiche d'audit traitera ces relevés) : dans la première partie, 7 sens sur 22 sont candidats au criblage : 取る sens 1 (C1-a, C3-b), 消す, 開ける et 閉める (C3-e, C10-a ; 開ける aussi C1-a), 使う (C7-c), 並ぶ (C10-a), 無くす (C9-a). Dans la seconde, 5 sur 14 : 借りる, 貸す, 渡す (C10-a), 立つ (C1-a), やる sens 2 (C1-a, C1-d).

**Dépendances** :
- avec des cas arbitrés : 消す, 開ける et 閉める sont reliés par `transitive_of` à 消える, 開く et 閉まる (L) ; 持つ, sens 1, a pour autre sens « Posséder » (L) ;
- à l'intérieur de la première partie : les renvois entre raisons (付ける / 消す, 閉める / 開ける, 付ける / かける, 持つ / 取る) y sont tous contenus ;
- entre familles, toutes dans la seconde partie : 吸う, sens 2, a pour autre sens « Fumer » (famille « aucune catégorie », lié à たばこ) ; やる, sens 2, a pour autre sens « Faire » (famille « autre formulation », lié à する par `equivalent_to`) ;
- **point de fond à trancher par l'audit, non par le périmètre** : A2-L3 §6 et A2-GLOBAL §4.4 nomment l'« action générique » ; les 36 raisons disent « action générale ». Le criblage l'a relevé pour D0069 (無くす, C9-a).

**Critères de complétude** : 22 identifiants distincts ; chacun porte un avertissement `categorie-nulle` de l'inventaire et exactement une décision de journal de cette nature ; aucun ne figure parmi les 55 `categorie-nulle` arbitrés ; les 22 et les 14 de la seconde partie sont disjoints et leur réunion est exactement la famille « action générale » (36) ; après la tranche, le rapport compte 104 fiches sur 147, et il reste 43 `categorie-nulle` (14, 18, 11).

## 8 ter. Périmètre proposé pour la tranche suivante : « action générale », seconde partie (2026-10-08)

**Mise à jour du 2026-10-08 : périmètre validé par ChatGPT (les 14 cas, tels quels), audit individuel livré, puis tranche arbitrée : 14 L** (rapport d'audit, « Tranche 5 »). Le périmètre suivant est au §8 quater. Le texte ci-dessous est la proposition de périmètre d'origine.

**Proposition, non arbitrée. Aucune fiche n'a été lue en vue de l'audit ; aucune décision lexicale n'est prise.** Relevé par script, en lecture seule, sur l'inventaire, le journal, l'état publié et le résultat du criblage.

**Les 14 sens restants de la famille « action générale », en entier**, pour terminer la famille avant les deux autres.

| SENSE | Mot | Sens | Type | Lot | Décision | Criblage (volet 1) | Autres sens de l'ENTRY |
|---|---|---|---|---|---|---|---|
| `v_266_s2` | 吹く | Souffler (de l'air) | action | 07 | D0472 | — | sens 1 « Souffler (le vent) », météo › vent |
| `v_526_s1` | コピーする | Photocopier | action | 19 | D1260 | — | — |
| `v_533_s1` | 借りる | Emprunter | action | 19 | D1267 | C10-a | — |
| `v_542_s2` | 吸う | Aspirer | action | 19 | D1293 | — | sens 1 « Fumer », **sans catégorie, famille « aucune catégorie »** |
| `v_551_s1` | 座る | S'asseoir | action | 19 | D1245 | — | — |
| `v_552_s1` | 待つ | Attendre | action | 19 | D1281 | — | — |
| `v_562_s1` | 渡す | Remettre | action | 19 | D1273 | C10-a | sens 2 « Faire traverser », parcours et trajectoire |
| `v_568_s1` | 立つ | Se lever | action | 19 | D1247 | C1-a | — |
| `v_575_s1` | 貸す | Prêter | action | 19 | D1264 | C10-a | — |
| `v_578_s1` | 返す | Rendre | action | 19 | D1270 | — | — |
| `v_608_s2` | やる | Donner (à des plantes, des animaux) | action | 20 | D1335 | C1-a, C1-d | sens 1 « Faire », **sans catégorie, famille « autre formulation »** |
| `v_635_s2` | 休む | S'absenter | action | 19 | D1249 | — | sens 1 « Se reposer », sommeil et repos |
| `v_642_s2` | 出る | Assister à | action | 04 | D0338 | — | sens 1 « Sortir », entrer / sortir ; sens 3 ci-dessous |
| `v_642_s3` | 出る | Apparaître | **evenement** | 04 | D0339 | — | sens 1 et sens 2 ci-dessus |

Par lot : lot 19, 10 ; lot 04, 2 ; lot 07, 1 ; lot 20, 1.

**Chevauchements avec le volet 1** (5 sens sur 14 ; la fiche d'audit traitera ces relevés) :
- 借りる, 貸す, 渡す (C10-a) : leurs raisons renvoyaient les relations à la passe finale ; `reciprocal_with` est publiée entre 借りる et 貸す ;
- 立つ (C1-a) : « Se lever » est aussi la traduction de 起きる, sens 2, en états et besoins physiques › sommeil et repos ;
- やる, sens 2 (C1-a, C1-d) : « Donner » est aussi 上げる, sens 1, en relations sociales › interactions sociales, et les deux sens sont reliés par `similar_to`, avec des catégories de niveaux 1 différents (l'une nulle).

**Dépendances** :
- à l'intérieur de la tranche : 渡す et 返す renvoient à 貸す ; 借りる à 貸す ; 立つ à 座る ; 吸う, sens 2, à 吹く, sens 2 ; tous sont dans la tranche ;
- avec des cas arbitrés : 出る, sens 3 « Apparaître », a été cité comme contraire de 消える, sens 2 « Disparaître » (L) ; 渡す « Remettre » a été cité pour 出す, sens 3 (L) ; 待つ pour 並ぶ, sens 1 (C) ;
- **entre familles** : 吸う, sens 1 « Fumer », et les deux sens de たばこ (famille « aucune catégorie ») ; やる, sens 1 « Faire », et する (famille « autre formulation », reliés par `equivalent_to`). Ils seront lus comme comparables, **sans verdict** ; leur audit reste à leur famille.

**Points à examiner par l'audit, non par le périmètre** :
- 出る, sens 3, est de type `evenement` et sa raison dit « action générale » ;
- 座る et 立つ invoquent deux fondements : « action générale » et « aucune catégorie du registre ne nomme les postures » ;
- la formule « action générale » ne vaut pas justification (arbitrage du 2026-10-08) : chaque `null` se vérifie sur sa fiche.

**Critères de complétude** : 14 identifiants distincts ; chacun porte un avertissement `categorie-nulle` de l'inventaire et exactement une décision de journal `validated` de cette nature ; chaque raison emploie la formule « action générale » ; aucun ne figure parmi les 77 `categorie-nulle` arbitrés ; les 14 sont exactement le reste de la famille (36 = 22 + 14) ; après la tranche, le rapport compte 118 fiches sur 147, et il reste 29 `categorie-nulle` (18 et 11).

## 8 quater. Périmètre proposé pour la tranche suivante : « aucune catégorie ne nomme la notion » (2026-10-08)

**Mise à jour du 2026-10-08 : périmètre validé par ChatGPT (les 18 cas et les six sous-groupes, tels quels), audit individuel livré, puis tranche arbitrée : 14 L, 4 C** (rapport d'audit, « Tranche 6 »). Le périmètre de la dernière famille est au §8 quinquies. Le texte ci-dessous est la proposition de périmètre d'origine.

**Proposition, non arbitrée. Aucune fiche n'a été lue en vue de l'audit ; aucune décision lexicale n'est prise.** Relevé par script, en lecture seule, sur l'inventaire, le journal, l'état publié et le résultat du criblage.

**La famille « aucune catégorie ne nomme la notion », en entier : 18 cas.**

| SENSE | Mot | Sens | Classe | Type | Lot | Décision | Criblage (volet 1) |
|---|---|---|---|---|---|---|---|
| `v_144_s1` | 忙しい | Occupé | adjectif_i | etat | 16 | D1122 | — |
| `v_287_s1` | カレンダー | Calendrier | nom | objet_artefact | 13 | D0849 | — |
| `v_425_s1` | だんだん | Graduellement | adverbe | concept_abstrait | 21 | D1399 | C3-0, C7-c, C10-a |
| `v_457_s1` | 暇 | Libre | adjectif_na | etat | 16 | D1120 | — |
| `v_500_s1` | また | À nouveau | adverbe | concept_abstrait | 21 | D1379 | C3-0 |
| `v_503_s1` | もう一度 | Encore une fois | adverbe | concept_abstrait | 21 | D1385 | C3-0 |
| `v_504_s2` | ゆっくり | Tranquillement | adverbe | propriete | 22 | D1435 | — |
| `v_510_s1` | 本当 | Vérité | nom | concept_abstrait | 00 | D0068 | C3-0, C5-0 |
| `v_525_s2` | まっすぐ | Honnête | adverbe | propriete | 22 | D1411 | — |
| `v_542_s1` | 吸う | Fumer | verbe | action | 19 | D1292 | — |
| `v_558_s1` | 死ぬ | Mourir | verbe | evenement | 19 | D1299 | — |
| `v_598_s1` | たばこ | Cigarette | nom | objet_artefact | 19 | D1295 | — |
| `v_598_s2` | たばこ | Tabac | nom | substance_matiere | 19 | D1301 | — |
| `v_627_s2` | 一人 | Seul | nom | etat | 14 | D1015 | C7-c |
| `v_653_s1` | 声 | Voix | nom | null | 20 | D1369 | — |
| `v_671_s1` | 時計 | Horloge | nom | objet_artefact | 05 | D0404 | — |
| `v_685_s1` | 生活 | Mode de vie | nom | concept_abstrait | 19 | D1289 | C3-0 |
| `v_694_s1` | 荷物 | Bagage | nom | objet_artefact | 05 | D0408 | — |

Par lot : lot 19, 5 ; lot 21, 3 ; lot 05, 2 ; lot 16, 2 ; lot 22, 2 ; lots 00, 13, 14 et 20, 1 chacun.

**Cohérence de la famille.** Elle est définie par une formulation, non par un contenu : ce sont les raisons qui affirment qu'aucune catégorie du registre ne nomme la notion (« aucune catégorie », « ne nomme », « n'a pas de catégorie »), une fois retirées les familles déjà traitées. Ses membres sont hétérogènes (cinq classes, huit valeurs de `semantic_type`, dont `null`), mais ils appellent **la même vérification** : relire l'arbre d'A2-L3 pour contrôler l'affirmation d'absence, comme pour le poids et les postures. C'est ce qui justifie de les lire ensemble.

**Sous-groupes de lecture** (pour l'ordre des fiches ; chaque verdict reste individuel) :
- **le tabac** (3) : 吸う, sens 1 « Fumer » ; たばこ, sens 1 « Cigarette » et sens 2 « Tabac » ; leurs raisons se répondent ;
- **objets que la raison écarte d'un domaine voisin** (3) : カレンダー et 時計 (du temps), 荷物 (des transports) ; la raison de カレンダー renvoie à 時計 ;
- **états d'une personne** (3) : 忙しい, 暇, 一人 sens 2 « Seul » ;
- **répétition et progression** (3) : また sens 1, もう一度, だんだん ; la raison de もう一度 renvoie à また ;
- **manière et caractère** (2) : ゆっくり sens 2 « Tranquillement », まっすぐ sens 2 « Honnête » ;
- **cas singuliers** (4) : 本当 « Vérité », 死ぬ « Mourir », 声 « Voix », 生活 « Mode de vie ».

**Chevauchements avec le volet 1** (6 sens sur 18 ; la fiche d'audit traitera ces relevés) :
- C3-0, pour cinq sens de type `concept_abstrait` (また sens 1, もう一度, だんだん, 本当, 生活) : le criblage impose l'examen individuel de ce type, qui ne sert jamais de type de secours ;
- C7-c, pour だんだん et 一人 sens 2 : fonction `quantificateur` non examinée avant A9 (termes « peu », « tout » dans les traductions) ;
- C10-a, pour だんだん : D1400 refusait une fonction faute de définition ;
- C5-0, pour 本当 : dimension `vrai_faux:vrai` posée.

**Dépendances avec des cas arbitrés** :
- 声 porte deux avertissements : son `type-nul` est arbitré L (tranche 1) ; sa fiche `categorie-nulle` se lira avec ;
- また, sens 1, a pour autre sens « Aussi », arbitré F (`connecteur` retenu) ;
- 吸う, sens 1, a pour autre sens « Aspirer », arbitré L ;
- 死ぬ repose sur la même doctrine que 力 (L) : une fiche qui déborde l'être humain par l'animal ; les deux verdicts doivent rester cohérents ;
- まっすぐ, sens 2, est un des termes du point de contrôle « caractère d'une personne » (§6 bis, 1) ; 冷たい, 清い et 甘い (sens 2) sont arbitrés L ;
- ゆっくり, sens 2, et まっすぐ, sens 2, ont déjà servi de comparables, sans verdict.

**Dépendances avec la dernière famille (« autre formulation », 11 cas, non auditée)** : 物 « Chose » (l'objet générique, à comparer aux quatre objets de cette tranche) ; 問題 « Problème » et 他 « Autre » (`concept_abstrait`) ; よく, sens 2 « Bien » (manière). Ils seront lus comme comparables, **sans verdict**.

**Comparables externes prévisibles** (catégorisés, hors des 147 ; lus sans être audités) : 生まれる « Naître » (cycle de vie › naissance), que la raison de 死ぬ cite ; 灰皿 « Cendrier » et マッチ « Allumette » (accessoires domestiques), pour la cigarette ; かばん et 財布 (sacs et contenants personnels), pour 荷物 ; 元気 et 疲れる (fatigue et énergie physique), pour 忙しい et 暇 ; いつも et よく sens 1 (temps › fréquence), pour la répétition ; 鳴く (animaux), pour 声 ; 一人 sens 1 (comptage › personnes).

**Critères de complétude** : 18 identifiants distincts ; chacun porte un avertissement `categorie-nulle` de l'inventaire et exactement une décision de journal `validated` de cette nature ; chaque raison contient la formule de la famille et aucune des formules des familles déjà traitées ; aucun ne figure parmi les 91 `categorie-nulle` arbitrés ; les 18 sont exactement les `categorie-nulle` restants que la règle de regroupement range dans cette famille ; après la tranche, le rapport compte 136 fiches sur 147, et il reste 11 `categorie-nulle` (« autre formulation »).

## 8 quinquies. Périmètre proposé pour la dernière tranche : « autre formulation » (2026-10-08)

**Mise à jour du 2026-10-08 : périmètre validé par ChatGPT (les 11 cas et les cinq sous-groupes, tels quels), puis audit individuel fait et livré en proposition, avec le contrôle de clôture du volet 2** (rapport d'audit, « Tranche 7 »). Le texte ci-dessous est la proposition de périmètre d'origine.

**Proposition, non arbitrée. Aucune fiche n'a été lue en vue de l'audit ; aucune décision lexicale n'est prise.** Relevé par script, en lecture seule, sur l'inventaire, le journal, l'état publié et le résultat du criblage.

**Les 11 derniers `categorie-nulle`, en entier.** Avec eux, les 147 avertissements auront chacun leur fiche.

| SENSE | Mot | Sens | Classe | Type | Lot | Décision | Criblage (volet 1) | Autres sens de l'ENTRY |
|---|---|---|---|---|---|---|---|---|
| `v_181_s1` | する | Faire | verbe | action | 20 | D1331 | C10-a | sens 2 « Coûter (pour un prix) », économie › prix |
| `v_424_s1` | きれい | Beau | adjectif_na | propriete | 00 | D0066 | — | sens 2 « Propre », entretien › nettoyage |
| `v_458_s1` | 有名 | Célèbre | adjectif_na | propriete | 16 | D1111 | — | — |
| `v_506_s2` | よく | Bien | adverbe | propriete | 21 | D1374 | C7-c | sens 1 « Souvent », temps › fréquence |
| `v_511_s1` | 問題 | Problème | nom | concept_abstrait | 20 | D1359 | C3-0 | sens 2 « Question (d'examen) », évaluation scolaire |
| `v_521_s1` | たぶん | Peut-être | adverbe | null | 22 | D1432 | C5-0, C10-a | — |
| `v_523_s2` | 出来る | Être achevé / prêt | verbe | resultat | 20 | D1317 | C3-c | sens 1 « Pouvoir », capacités › aptitude |
| `v_605_s1` | 他 | Autre | nom | concept_abstrait | 22 | D1427 | C3-0, C10-a | — |
| `v_608_s1` | やる | Faire | verbe | action | 20 | D1334 | C10-a | sens 2 « Donner (à des plantes, des animaux) », **arbitré L** |
| `v_664_s2` | 所 | Partie | nom | concept_abstrait | 20 | D1355 | C3-0 | sens 1 « Endroit », position et localisation |
| `v_684_s1` | 物 | Chose | nom | objet_artefact | 20 | D1352 | — | — |

Par lot : lot 20, 6 ; lot 22, 2 ; lots 00, 16 et 21, 1 chacun.

**Cohérence du regroupement.** C'est une famille **résiduelle** : ses raisons n'emploient aucune des formules des familles déjà traitées. Elle n'a donc pas d'unité de formulation, et moins encore de contenu (quatre classes, six valeurs de `semantic_type`, dont `null`). Ce que ses raisons ont en commun est une tournure voisine : « sans domaine thématique propre », « notion générale », « action la plus générale », « nom générique ». Plusieurs de ces sens relèvent, en substance, de familles déjà auditées ; l'audit devra donc, pour chacun, **identifier le fondement réel** avant de le vérifier, sans s'appuyer sur la formule.

**Sous-groupes de lecture** (pour l'ordre des fiches ; chaque verdict reste individuel) :
- **l'action la plus générale** (2) : する et やる, sens 1 « Faire », reliés par `equivalent_to` ; la raison de やる renvoie à する ; c'est l'« action générique » d'A2-L3 §6 au sens le plus strict ;
- **appréciations et propriétés** (3) : きれい « Beau », 有名 « Célèbre », よく sens 2 « Bien » ; en substance, des « propriétés générales » ; la raison de よく renvoie à いい ;
- **notions générales de type `concept_abstrait`** (3) : 問題 « Problème », 他 « Autre », 所 sens 2 « Partie » ;
- **l'objet générique** (1) : 物 « Chose » ;
- **cas singuliers** (2) : たぶん « Peut-être » (probabilité, dimension posée, sans type) ; 出来る sens 2 « Être achevé / prêt » (type `resultat`).

**Chevauchements avec le volet 1** (8 sens sur 11 ; la fiche d'audit traitera ces relevés) :
- C3-0, pour 問題, 他 et 所 sens 2 : type `concept_abstrait`, examen individuel imposé ;
- C3-c, pour 出来る sens 2 : couple atypique, un verbe de type `resultat` (un seul sens sur les 145 sens de verbes) ;
- C5-0, pour たぶん : dimension `probabilite` posée ;
- C7-c, pour よく sens 2 : fonction `intensifieur` non examinée avant A9 (« bien ») ;
- C10-a, pour する et やる sens 1 (relation renvoyée à la passe finale ; `equivalent_to` est publiée), pour たぶん et pour 他 (fonction refusée faute de définition).

**Dépendances avec des cas arbitrés** :
- たぶん porte deux avertissements : son `type-nul` est arbitré L (tranche 1) ; seule sa fiche `categorie-nulle` reste ;
- やる, sens 1, a pour autre sens « Donner », arbitré L ;
- きれい, sens 1, a servi de comparable à 立派 sens 1 (L) et à いい (L), sans verdict ; よく, sens 2, à いい et à ゆっくり sens 2 (L) ; 有名 à 便利 (L) ;
- 物, l'objet générique, se lit avec les objets spécialisés de la tranche 6 : 時計 et カレンダー (C retenus), 荷物 et たばこ (L) ;
- 他 « Autre » touche à l'identité et à la différence : 同じ et 違う sens 1 (L) ;
- 出来る, sens 2, se lit avec 作る sens 1 « Fabriquer » (L) et なる (L) ;
- 問題, 他 et 所 se lisent avec 本当 et 生活 (L, `concept_abstrait` vérifié comme type propre).

**Comparables externes prévisibles** (catégorisés, hors des 147 ; lus sans être audités) : 上げる (pour やる) ; 美味しい, かわいい, 上手 (pour les appréciations) ; きれい sens 2 et 汚い sens 1 (nettoyage) ; 所 sens 1 (position et localisation) ; 出来る sens 1 (aptitude) ; 意味 sens 1 et 問題 sens 2 (même famille source) ; 終わる (début / fin).

**Critères de complétude** : 11 identifiants distincts ; chacun porte un avertissement `categorie-nulle` de l'inventaire et exactement une décision de journal `validated` de cette nature ; aucune raison ne contient une formule des familles déjà traitées ; aucun ne figure parmi les 109 `categorie-nulle` arbitrés ; les 11 sont exactement les `categorie-nulle` restants. **Contrôle de clôture du volet 2, à joindre à cette tranche** : les 147 couples `{ code, where }` de l'inventaire ont chacun une fiche et une seule (120 `categorie-nulle`, 27 `type-nul`), aucun n'est ajouté, et L + F + C + N = 147.

## 9. Scripts et sorties de l'audit

Les scripts ne sont pas des outils du dépôt. Ils ont été copiés dans `a2-05-travail/` (non suivi, à ne pas committer) pour ne pas être perdus avec la session :

- `criblage-a205.mjs` et `criblage/resultat.json` : le criblage du volet 1 (candidats, familles, constats) ;
- `validation-a205.mjs` et les listes des échantillons lus (`sens-deja-lus.json`, `validation-20261008.json`, `validation-20261009.json`) ;
- `rapport-criblage.mjs`, `section6.mjs` : générateur du rapport de criblage ;
- `audit-type-nul.mjs`, `audit-cat-t1.mjs` : générateurs des fiches d'audit, **qui contiennent les verdicts et les motivations arbitrés**. `audit-null.md` se reconstruit en les lançant dans cet ordre ;
- `audit-cat-t2.mjs` et `audit-cat-t2.json` : la tranche « propriété générale » (29 fiches, **arbitrées**, 29 L) ; le script est relançable et remplace la « Tranche 3 » du rapport ; `note-export-t2.md` : la note de l'export ;
- `audit-cat-t3.mjs` et `audit-cat-t3.json` : la tranche « action générale », première partie (22 fiches, **arbitrées**, 21 L et 1 C) ; le script contrôle l'exhaustivité, est relançable et remplace la « Tranche 4 » du rapport ; `note-export-t3.md` : la note de l'export ;
- `audit-cat-t4.mjs` et `audit-cat-t4.json` : la tranche « action générale », seconde partie (14 fiches, **arbitrées**, 14 L) ; le script contrôle l'exhaustivité et recompte le cumul sur les fiches du rapport ; il est relançable et remplace la « Tranche 5 » ; `note-export-t4.md` : la note de l'export ;
- `audit-cat-t5.mjs` et `audit-cat-t5.json` : la tranche « aucune catégorie ne nomme la notion » (18 fiches, **arbitrées**, 14 L et 4 C) ; le script contrôle l'exhaustivité, l'existence des catégories proposées dans le registre et le cumul ; il est relançable et remplace la « Tranche 6 » ; `note-export-t5.md` : la note de l'export ;
- `audit-cat-t6.mjs` et `audit-cat-t6.json` : la dernière tranche, « autre formulation » (11 fiches, **arbitrées**, 11 L ; à lancer avec `--arbitre`), **et le contrôle de clôture du volet 2** (147 fiches pour 147 avertissements, verdicts antérieurs conservés, liste consolidée des modifications) ; le script est relançable et remplace la « Tranche 7 » ; `note-export-t6.md` : la note de l'export ;
- `perimetre-t1-t8.mjs` : la vérification documentaire du périmètre du lot 1 du volet 1 (bilan, §7) ; `criblage-provenance.mjs` et `provenance/resultat.json` : le criblage factuel de provenance (T5) ; `audit-v1-lot1.mjs` : les 19 fiches du lot 1, **arbitrées**, avec leurs contrôles ; il réécrit `etape2-A2-05-coherence-retroactive.md` et est relançable ; `tri-provenance.mjs` (sortie `provenance/tri.json`) : le tri factuel des 270 signalements, puis `perimetre-v1-lot2.mjs` : le périmètre proposé du lot 2 ; `audit-v1-lot2-t1.mjs` : les 34 fiches de provenance de la tranche 1, **arbitrées le 2026-10-10** (objets `ARB`, `MOTIF`, `VARIANTE`, `ERRATUM` ; les propositions d'origine restent dans `F`), avec leurs contrôles ; `perimetre-v1-lot2-t2.mjs` (sortie `provenance/plan-tranches.json`) : le plan recalculé du chantier et le périmètre de la tranche 2, **arbitré** ; `audit-v1-lot2-1bis.mjs` : les 10 fiches du bloc 1 bis, **arbitrées**, lues dans `plan-tranches.json` ; `audit-v1-lot2-t2-lot00.mjs` : les 9 fiches du lot 00 de la tranche 2, **arbitrées** ; `audit-v1-lot2-t2-lot01.mjs` : les 34 fiches du lot 01, **arbitrées** ; `audit-v1-lot2-t3-lot02.mjs` : les 22 fiches du lot 02 de la tranche 3, **arbitrées** ; `audit-v1-lot2-t3-lot03.mjs` : les 14 fiches du lot 03, **arbitrées** ; `audit-v1-lot2-t4-lot05.mjs` : les 12 fiches du lot 05 et les 2 fiches hors JLPT, **arbitrées** ; `audit-v1-lot2-t4-lot06.mjs` : les 18 fiches du lot 06, **arbitrées** ; `perimetre-v1-lot2-t5.mjs` : le périmètre de la tranche 5, **arbitré** ; `audit-v1-lot2-t5-5a.mjs` : les 9 fiches de la livraison 5a, **arbitrées** ; `audit-v1-lot2-t5-5b.mjs` : les 9 fiches de la livraison 5b, **arbitrées** ; `audit-v1-lot2-t5-5c.mjs` : les 11 fiches de la livraison 5c, **arbitrées le 2026-10-12** ; `perimetre-v1-lot2-t6.mjs` : le périmètre de la tranche 6, **arbitré le 2026-10-12** (il lit aussi `criblage/resultat.json` et recompte les 124 lignes de corrections du bilan) ; `perimetre-v1-lot2-t4.mjs` : le périmètre de la tranche 4, **arbitré**, avec le relevé des deux nuances hors JLPT sur leurs fiches propres ; `perimetre-v1-lot2-t3.mjs` : le périmètre de la tranche 3, **arbitré**, lu dans le champ `toutes` de `plan-tranches.json` (ajouté au script de la tranche 2, rapport de celle-ci inchangé) ;
- `relais-reprise.mjs` : ce relais, dans son état d'origine. **Ne pas le relancer** : il réécrirait ce fichier sans les mises à jour faites à la main depuis.

Leurs chemins internes pointent vers l'ancien dossier temporaire : à adapter avant de les relancer.

## 10. Prochaine action

0. **État au 2026-10-08** : la tranche « propriété générale » est arbitrée (29 L, aucune correction) ; la tranche « action générale », première partie, est arbitrée (21 L, 1 C ; six modifications de SENSE retenues au total, aucune appliquée). La tranche « action générale », seconde partie, est arbitrée (14 L) : la famille est close, et le cumul est de 118 sur 147. La tranche « aucune catégorie ne nomme la notion » est arbitrée (14 L, 4 C) : le cumul est de 136 sur 147, et dix modifications de SENSE sont retenues, toutes non appliquées. **Le volet 2 est clos : 147 sur 147 arbitrés.** Le bilan consolidé, l'état des volets 1 et 3, un ordre d'exécution et le périmètre du prochain lot sont proposés dans `docs/rapports/etape2-A2-05-bilan-volet2.md`. **Avis favorable du relecteur (2026-10-08) au périmètre transversal T1 à T8, 19 SENSE dans 17 ENTRY, et au report des dix modifications jusqu'à une liste globale de corrections.** La vérification documentaire demandée est faite (bilan, §7, calculée par `a2-05-travail/perimetre-t1-t8.mjs`) : 19 identifiants distincts ; 7 sens jamais audités (明るい, 暗い, 爽やか sens 2 ; 洗う ; 一緒 ; 後 sens 3 ; ゆっくり sens 1) et 12 déjà examinés au volet 2, tous L, non rouverts ; aucun n'est visé par une modification retenue. Limites confirmées : **T5**, criblage factuel et exhaustif seulement, tout cas supplémentaire restant hors des 19 ; **T6**, chaque type contrôlé individuellement, sans type commun imposé ; **T7**, fidélité de la traduction principale seulement, sans rouvrir les verdicts `categorie-nulle`. Export : `chatgpt-relecture-A2-05-volet1-lot1-perimetre.zip`. **Périmètre accepté définitivement le 2026-10-08, avec l'option (b)** : cinq sens jamais audités sont examinés en entier, avec leurs autres relevés du criblage (明るい sens 2 : C1-g ; 洗う : C1-b, C1-h ; 一緒 : C7-c ; 後 sens 3 : C3-0, C1-g ; ゆっくり sens 1 : C1-h) ; ils sortiront des 382 candidats restants (382 → 377) une fois leur audit validé. **Audit des 19 sens fait, puis arbitré (voir plus bas)** : rapport `docs/rapports/etape2-A2-05-coherence-retroactive.md` (lot 1), écrit par `a2-05-travail/audit-v1-lot1.mjs`. **Proposé : 14 conformes, 5 écarts**, et cinq corrections V1-1 à V1-5, **distinctes des dix modifications du volet 2** : 洗う (E3, `category` → `null`, ce qui ajouterait un avertissement) ; 出る sens 2 et sens 3, 吹く sens 2 (E2, particules et nuances absentes des sources) ; 冷たい sens 2 (E2, « Insensible » de la fiche remplacé par « Distant »). **Criblage de provenance T5** (`a2-05-travail/criblage-provenance.mjs`, sortie dans `provenance/resultat.json`) : 4 particules absentes des fiches (dont 吹く sens 1 et 近く, hors périmètre) et 270 relevés bruts de nuance, surtout dans les lots 00 à 11, sans verdict. Le bilan du volet 2 est inchangé (147 sur 147 ; L 136, F 2, C 9, N 0). Export : `chatgpt-relecture-A2-05-volet1-lot1.zip`. **Lot 1 arbitré le 2026-10-08 : 14 conformes, 5 écarts ; les 19 verdicts sont confirmés.** La correction de 冷たい sens 2 est retenue sous une forme plus complète : traduction principale « Insensible (figuré) », alternative « Distant » supprimée. **Cinq corrections V1-1 à V1-5 rejoignent la liste globale, à part des dix du volet 2** (bilan, §8) ; aucune n'est appliquée ; V1-1 (洗う) ajoutera un avertissement `categorie-nulle` attendu (113 au lieu de 112, toutes corrections faites). **Il reste 377 candidats au volet 1.** **Doctrine de provenance arbitrée** : aucune exception générale pour un contenu non sourcé, même linguistiquement correct ; le criblage T5 est un inventaire de signalements, non d'erreurs ; les cas hors des 19 restent sans verdict. **Réserves non closes** : 暗い sens 2, 爽やか sens 2, 後 sens 3 (bilan, §8.5). **Périmètre du lot 2 proposé, non arbitré** (`docs/rapports/etape2-A2-05-volet1-lot2-perimetre.md`, calculé par `tri-provenance.mjs` puis `perimetre-v1-lot2.mjs`) : thème unique, la provenance des particules et des chaînes japonaises des nuances ; tri factuel : 83 des 270 signalements sont des faux positifs, **184 nuances restent à examiner** dans 170 ENTRY, plus 2 particules ; première tranche proposée : lots 04 et 07, **34 unités** ; six tranches suivantes ; chevauchement avec les 377 : 84 nuances, 83 sens, qui resteraient candidats ; trois questions de principe à trancher (forme du dictionnaire d'un exemple de la fiche ; renvoi à une autre ENTRY publiée ; forme honorifique ou conjuguée du mot). Export : `chatgpt-relecture-A2-05-volet1-lot2-perimetre.zip`. **Périmètre de la tranche 1 accepté le 2026-10-08 : 34 unités distinctes dans 33 ENTRY**, sans ajout ni retrait. **Critères de relecture arbitrés** (ils ne modifient aucun snapshot ni addendum) : (1) la forme du dictionnaire d'un exemple de la fiche est admise si la correspondance est vérifiable et qu'aucun élément lexical ou sémantique n'est ajouté, jamais pour un exemple construit librement ; (2) un renvoi à une autre ENTRY publiée doit être appuyé par la fiche examinée ou par une décision validée au fondement vérifiable ; (3) les formes honorifiques et conjuguées ne sont pas sourcées d'office : une flexion régulière vérifiable se distingue d'une construction conventionnelle ou enrichie, cas par cas. **Règle de chevauchement arbitrée** : un sens candidat du volet 1 reste candidat après son contrôle de provenance ; le décompte reste 377. **Tranche 1 auditée, en proposition non arbitrée** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance.md`, écrit par `a2-05-travail/audit-v1-lot2-t1.mjs`) : **10 sourcés, 24 écarts**, 24 corrections proposées V2-1 à V2-24, distinctes des dix du volet 2 et des cinq du lot 1 (une seule touche un sens déjà visé : 冷たい sens 2, autre champ). Les écarts se rangent en quatre familles : contenu ajouté (10), renvoi non appuyé (8), reformulation proche de la source, où la preuve est insuffisante plutôt que l'erreur établie (5 : 渡る, 海, 空, 冷たい sens 1, 天気), particule tirée d'un exemple (1 : 吹く sens 1). **Décompte du chantier de provenance** : 184 nuances restaient à examiner après le tri ; **33 sont contrôlées**, 151 restent, en six tranches ; les 2 particules restantes sont contrôlées. **Deux limites du tri apparues** : il a écarté à tort 風邪 (homophone reconnu par le romaji de 風) ; le criblage ignore les chaînes d'un seul caractère (雨, 飴). Export : `chatgpt-relecture-A2-05-volet1-lot2-tranche1.zip`. **Tranche 1 arbitrée le 2026-10-10** (ChatGPT, par délégation ; relayé et accepté par l'utilisateur) : **9 sourcés, 25 écarts**. Les 24 écarts et 9 des 10 « sourcé » sont confirmés ; **`v_152` 来る est reclassé écart** : la fiche nomme la forme négative et sa lecture, sans écrire la graphie 来ない, qui ne se reconstitue pas par connaissance grammaticale extérieure ; correction V2-25 : lectures attestées conservées, formes remplacées par « d'origine, polie, négative ». Conservés : les cinq écarts de reformulation (渡る, 海, 空, 冷たい sens 1, 天気), l'écart sur la particule が de 吹く sens 1, les écarts sur les renvois non sourcés. Corrections V2-1 à V2-25, distinctes des dix du volet 2 et des cinq du lot 1 (§5 bis). Le rapport conserve les propositions d'origine, fiche par fiche, à côté des verdicts arbitrés. **Deux défauts du tri retenus**, qui ne permettent de déclarer ni faux ni vrais les autres signalements : la confusion d'homophones par une correspondance de lecture ; les chaînes d'un seul caractère non détectées. **Constat factuel, signalé à l'arbitrage** : 風邪 a été écarté par la comparaison des lectures en kana (classe B-transcription), non par le romaji ; le défaut atteint donc les 83 faux positifs (50 B-romaji, 33 B-transcription) ; un erratum est porté sur la fiche de 風, sans changer son verdict. **Périmètre de la tranche 2 proposé, non arbitré** (`docs/rapports/etape2-A2-05-volet1-lot2-tranche2-perimetre.md`, calculé par `a2-05-travail/perimetre-v1-lot2-t2.mjs`) : plan recalculé, **278 nuances restent à lire** (151 à examiner, 83 faux positifs, 44 jamais signalées mais portant une chaîne d'un caractère), en un bloc « 1 bis » (10 nuances des lots 04 et 07) et sept tranches 2 à 8 ; **tranche 2 : lots 00 et 01, 43 nuances** (31 à examiner, 11 faux positifs, 1 à chaîne d'un caractère) ; chevauchements : 12 nuances sur un sens candidat ou son ENTRY (13 des 377, qui restent candidats), 18 sur un sens des 147 (non rouverts) ; corrections déjà retenues sur les mêmes ENTRY : 頭 et 皆さん (volet 2, autres champs). **Troisième lacune relevée** : 2 nuances d'ENTRY hors JLPT (`hj_v_1`, `hj_v_2`, lot 05), jamais criblées ; proposées pour la tranche 4. Cinq questions à arbitrer (rapport, §9). Export : `chatgpt-relecture-A2-05-volet1-lot2-tranche2-perimetre.zip`. **Périmètre arbitré le 2026-10-10** (ChatGPT, par délégation ; rapport, §0) : contre-vérification des **83** faux positifs, répartis dans les tranches de leurs lots ; règle des caractères isolés acceptée, **pour le seul repérage** ; **bloc 1 bis (10) et tranche 2 (43) acceptés, en livraisons séparées**, avec des contrôles de complétude distincts, la tranche 2 subdivisée par lot (00 : 9 ; 01 : 34) ; `hj_v_1` et `hj_v_2` rattachés en proposition à la tranche 4, contrôlés sur leurs fiches propres et comptés à part des 684 ; variantes V2-3 et V2-6 écartées (§5 bis). **Audit autorisé** du bloc 1 bis et de la tranche 2, dans ce périmètre fermé : fiche source entière, chaque élément japonais pertinent contrôlé, aucun rapprochement par la lecture ni caractère isolé tenu pour preuve. La contradiction sur `docs/conception/a2/README.md` est levée au §1. **Bloc 1 bis livré en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-1bis.md`, écrit par `a2-05-travail/audit-v1-lot2-1bis.mjs`) : **5 sourcés** (町, 犬, 猫, 鳥, 春 : le mot cité est écrit dans la fiche) **et 5 écarts** : 寒い et 熱い (暑い, retrouvé à tort par l'homophone 熱い あつい : le défaut du tri se vérifie), 自動車 (車 pour la graphie クルマ de la fiche ; preuve insuffisante plutôt qu'erreur), 橋 (graphie 箸 reconstituée), 花 (homophone 鼻 ajouté ; nuance à retirer) ; corrections proposées V2-26 à V2-30. **Décompte : 278 − 10 = 268 nuances restent à lire** (tranche 2 : 43 ; tranches 3 à 8 : 225), et 2 hors JLPT à part. Export : `chatgpt-relecture-A2-05-volet1-lot2-bloc1bis.zip`. **Bloc 1 bis arbitré le 2026-10-10** (ChatGPT, par délégation) : **5 sourcés, 5 écarts**, les dix verdicts confirmés, **V2-26 à V2-30 retenues sans modification** (寒い et 熱い : 暑い retiré ; 自動車 : クルマ, graphie de la source ; 橋 : graphie 箸 retirée, mention de l'homophone « baguettes » conservée ; 花 : nuance retirée, sans nuance nouvelle tirée des compteurs). **Liste globale : 45 corrections, aucune appliquée.** Les 83 rapprochements présumés sourcés restent soumis à une contre-vérification individuelle, qui distingue l'identité du mot de la simple identité de lecture. La clarification sur `docs/conception/a2/README.md` (§1) est conservée. **Décompte : 268 nuances restent à examiner** dans le périmètre de provenance actuellement compté (les 2 hors JLPT à part). **Tranche 2, lot 00 livré en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot00.md`, écrit par `a2-05-travail/audit-v1-lot2-t2-lot00.mjs`) : **7 sourcés** (鍵, 曲がる ; et les cinq faux positifs présumés お姉さん, お母さん, お父さん, お腹, 履く, dont le mot cité est écrit dans la fiche sous la même graphie, furigana compris) **et 2 écarts** : いい (よくない, forme conjuguée que la fiche n'écrit pas, comme 来ない) et 無くす (無くなる, graphie en kanji d'un mot que la fiche écrit なくなる, comme 車 pour クルマ) ; corrections proposées V2-31 et V2-32. Après son arbitrage, il resterait 259 nuances (lot 01 : 34 ; tranches 3 à 8 : 225). Export : `chatgpt-relecture-A2-05-volet1-lot2-t2-lot00.zip`. **Lot 00 arbitré le 2026-10-10** (ChatGPT, par délégation) : **7 sourcés, 2 écarts**, les neuf verdicts confirmés, **V2-31 et V2-32 retenues sans modification** ; critère de graphie confirmé (attestée pour le mot par la fiche ou sa fiche fusionnée ; jamais déduite par analogie). **Liste globale : 47 corrections, aucune appliquée. Restent 259 nuances** (lot 01 : 34 ; tranches 3 à 8 : 225), et 2 hors JLPT à part ; 377 candidats et bilan du volet 2 inchangés. **Tranche 2, lot 01 livré en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot01.md`, écrit par `a2-05-travail/audit-v1-lot2-t2-lot01.mjs`) : **10 sourcés, 24 écarts** ; écarts : renvois non appuyés (7 : お巡りさん, 外国人, 人, 女, 家内, 方, 男), formes honorifiques non écrites (4 : 両親, 子供, 家族, 医者), exemples construits ou constructions changées (8 : 体, 口, 病気, 目, 耳, 頭 sens 2, 皆さん, 顔), graphies non attestées pour le mot (3 : 髪, 警官, 奥さん), renvois assumés par une décision au fondement vérifiable à moitié (2 : 叔母 et 叔父, D0081 et D0083, le cas le plus discutable) ; 友達 (達) proposé sourcé, avec réserve ; corrections proposées V2-33 à V2-56, dont cinq retraits de nuance. Après son arbitrage, la tranche 2 serait close et il resterait 225 nuances (tranches 3 à 8). Export : `chatgpt-relecture-A2-05-volet1-lot2-t2-lot01.zip`. **Lot 01 arbitré le 2026-10-10** (ChatGPT, par délégation) : **10 sourcés, 24 écarts**, les 34 verdicts confirmés, **V2-33 à V2-56 retenues sans modification de leur contenu** ; 叔母 et 叔父 (V2-35, V2-36) : écarts confirmés, D0081 et D0083 conservées sans réécriture ; 友達 : sourcé ; V2-53 et V2-55 : transcriptions en kana recevables, sans permission d'ajouter des kanji ; les cinq retraits de nuance confirmés ; informations françaises attestées préservées (目, 耳, 顔). **Tranche 2 close : 53 nuances, 22 sourcées, 31 écarts. Liste globale : 71 corrections, aucune appliquée. Restent 225 nuances** (tranches 3 à 8), plus 2 hors JLPT suivies à part ; 377 candidats et 147 arbitrages du volet 2 inchangés. **Périmètre de la tranche 3 proposé** (`docs/rapports/etape2-A2-05-volet1-lot2-tranche3-perimetre.md`, calculé par `a2-05-travail/perimetre-v1-lot2-t3.mjs`) : **36 nuances, 32 ENTRY, lots 02 (« Alimentation, boissons, repas et table », 22) et 03 (« Maison, habitat et vie domestique », 14)** ; 29 à examiner, 2 faux positifs (家, 門), 5 à caractère isolé ; classes A 6, C 3, D 10, E 10, B 2, S1 5 ; chevauchements : 20 nuances sur 18 candidats des 377 (qui restent candidats), 3 sur des sens des 147 (まずい, 甘い ; non rouverts) ; aucune correction déjà retenue sur ces ENTRY ; renvois croisés vers des précédents arbitrés (橋, 雨, 髪, 入る) ; **découpage proposé : lot 02 (22), puis lot 03 (14)**, livrés à part. Après la tranche 3, il resterait 189 nuances. Export : `chatgpt-relecture-A2-05-volet1-lot2-tranche3-perimetre.zip`. **Périmètre de la tranche 3 arbitré le 2026-10-10** (ChatGPT, par délégation) : 36 nuances dans 32 ENTRY, sans ajout ni retrait ; deux livraisons distinctes, lot 02 (22) puis lot 03 (14) ; audit autorisé pour le lot 02 seul ; le lot 03 suivra son arbitrage, sans nouvelle décision de périmètre ; comparables カップ / コップ, et précédents 箸 / 橋 et 飴 / 雨, tenus ensemble. **Lot 02 livré en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot02.md`, écrit par `a2-05-travail/audit-v1-lot2-t3-lot02.mjs`) : **4 sourcés** (ご飯 sens 2, 料理 sens 1, 飴, お皿), **3 assumés** (premier emploi de ce verdict : 飲む par D0189, la collocation 薬を飲む étant écrite dans la fiche de 薬 ; カップ et コップ par D0204 et D0206, chaque renvoi se fondant sur la fiche de l'autre mot), **15 écarts** (紅茶, 日本酒, 米, 喫茶店, 料理屋, おいしくない : mots ajoutés ; にわとり (鶏) et お湯 : graphies non attestées pour le mot, おゆ étant recevable ; 駅弁, お箸, 飲み物は, まずいことになった, 子供に甘い, お水 : formes ou constructions absentes ; 包丁 (D0214) et つらい (D0195) : décisions au fondement absent des sources) ; corrections proposées V2-57 à V2-71, dont trois retraits de nuance (とり肉, 箸, 飲み物). Après son arbitrage, il resterait 203 nuances (lot 03 : 14 ; tranches 4 à 8 : 189). Export : `chatgpt-relecture-A2-05-volet1-lot2-t3-lot02.zip`. **Lot 02 arbitré le 2026-10-10** (ChatGPT, par délégation) : **4 sourcés, 3 assumés, 15 écarts**, les 22 verdicts confirmés, **V2-57 à V2-71 retenues sans modification**. **Classement de provenance confirmé pour ce chantier**, sans modifier les normes A2 : *sourcé* (attesté par la fiche examinée ou par une normalisation admise) ; *assumé* (introduit par une décision validée qui en identifie l'origine, vérifiable dans les sources figées) ; *écart* (provenance non établie, même si une décision historique la mentionne). Assumés confirmés : 飲む (D0189), カップ (D0204), コップ (D0206) ; écarts de ナイフ (D0214) et 辛い (D0195) conservés. **Réserve de fidélité sémantique, hors périmètre, non corrigée** : la nuance de カップ dit « à anse », la fiche « avec ou sans anse ». **Liste globale : 86 corrections, 78 ENTRY, aucune appliquée** (bilan, §8.11). **Restent 203 nuances** (lot 03 : 14 ; tranches 4 à 8 : 189), plus 2 hors JLPT à part. **Lot 03 livré en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot03.md`, écrit par `a2-05-travail/audit-v1-lot2-t3-lot03.mjs`) : **6 sourcés** (家, お風呂 sens 1 et ENTRY, ドア, アパート : マンション transcrit du romaji manshon, 電気 sens 2), **2 assumés** (テーブル : 机, D0271, fondée sur la fiche de 机 ; ふろ : お風呂, D0261), **6 écarts** (家庭 : 家庭料理 pour 家庭の料理 ; ふろ sens 1 : お風呂に入る pour ふろに入る ; ちり紙 : トイレットペーパー, ティッシュ ; 紙 : 1枚の紙, 髪, 神 ; お手洗い : トイレ, attesté par la fiche de トイレ mais assumé par aucune décision, cas à trancher ; 門 : 戸, ドア étant recevable) ; corrections proposées V2-72 à V2-77, aucun retrait complet. Après son arbitrage, la tranche 3 serait close et il resterait 189 nuances. Export : `chatgpt-relecture-A2-05-volet1-lot2-t3-lot03.zip`. **Lot 03 arbitré le 2026-10-10** (ChatGPT, par délégation) : **6 sourcés, 2 assumés, 6 écarts**, les 14 verdicts confirmés, **V2-72 à V2-77 retenues sans modification** ; **お手洗い (V2-76)** : l'attestation réciproque par la fiche de トイレ ne suffit pas, à elle seule, à sourcer le renvoi, et aucune décision ne l'assume ; « assumé » exige une décision validée au fondement vérifiable, « sourcé » une attestation dans la fiche examinée ou une normalisation admise ; doctrine documentaire et normes A2 inchangées. **Tranche 3 close : 36 nuances, 10 sourcées, 5 assumées, 21 écarts. Liste globale : 92 corrections, 84 ENTRY, aucune appliquée** (bilan, §8.12). **Restent 189 nuances** (tranches 4 à 8), plus 2 hors JLPT suivies à part ; 377 candidats et 147 arbitrages du volet 2 inchangés. **Périmètre de la tranche 4 proposé** (`docs/rapports/etape2-A2-05-volet1-lot2-tranche4-perimetre.md`, calculé par `a2-05-travail/perimetre-v1-lot2-t4.mjs`) : **30 nuances, 29 ENTRY, lots 05 (« Achats, vêtements et objets personnels », 12) et 06 (« École, apprentissage, langue et écrit », 18)** ; 23 à examiner, 3 faux positifs (着る, ズボン, スリッパ), 4 à caractère isolé ; classes A 4, C 2, D 14, E 3, B 3, S1 4 ; chevauchements : 9 sens candidats des 377, 2 sens des 147 (時計, 意味 sens 2 ; non rouverts) ; correction déjà retenue sur 時計 (volet 2, n° 7). **Les deux ENTRY hors JLPT** (`hj_v_1` レジ袋, `hj_v_2` ポイントカード, lot 05) : validées sans aucune décision de journal ; fiches dans `sources/vocab-hors-jlpt.json`, sans anciens exemples ; hors des 684 et des 278 ; relevé mécanique : レジ袋はご利用ですか absente de la fiche, ポイントカードはお持ちですか et いいえ présentes ; **proposées dans la livraison du lot 05, contrôlées sur leurs fiches propres et comptées à part (189 + 2)**. **Découpage proposé** : lot 05 (12, plus 2 hors JLPT), puis lot 06 (18) ; option : les 2 hors JLPT seules d'abord. Après la tranche 4, il resterait 159 nuances. Export : `chatgpt-relecture-A2-05-volet1-lot2-tranche4-perimetre.zip`. **Périmètre de la tranche 4 arbitré le 2026-10-10** (ChatGPT, par délégation) : 30 nuances (lot 05 : 12 ; lot 06 : 18), sans ajout ni retrait, plus les 2 hors JLPT intégrées au contrôle du lot 05, sur leurs fiches propres, dans un tableau distinct, sans décision historique attribuée ; deux livraisons, sans troisième ; 時計 non rouvert. **Lot 05 livré en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot05.md`, écrit par `a2-05-travail/audit-v1-lot2-t4-lot05.mjs`) : **lot 05 : 6 sourcés** (スカート, ズボン, ボタン sens 2, お金, 着る, 買い物), **0 assumé, 6 écarts** (傘 : 日傘 ; ハンカチ : ティッシュ ; 時計 : 目覚まし時計, D0405 sans fondement dans les sources ; 脱ぐ : 靴 pour くつ ; スリッパ : 玄関 pour げんかん ; 洋服 : 和服, 着物 pour wafuku, kimono) ; **hors JLPT, comptées à part : ポイントカード sourcé** (la fiche écrit la question et いいえ), **レジ袋 écart** (レジ袋はご利用ですか construite) ; corrections proposées V2-78 à V2-83 (lot 05) et V2-84 (hors JLPT). Après son arbitrage, il resterait 177 nuances du plan (lot 06 : 18 ; tranches 5 à 8 : 159), et plus aucune hors JLPT. Export : `chatgpt-relecture-A2-05-volet1-lot2-t4-lot05.zip`. **Lot 05 et hors JLPT arbitrés le 2026-10-10** (ChatGPT, par délégation) : lot 05, **6 sourcés, 0 assumé, 6 écarts** ; hors JLPT, **1 sourcé (ポイントカード), 1 écart (レジ袋)** ; les quatorze verdicts confirmés ; **V2-78 à V2-84 retenues sans modification de fond** ; 時計 : l'arbitrage du volet 2 sur sa catégorie conservé, V2-82 le complète sans le rouvrir ; aucune décision historique inventée pour les ENTRY hors JLPT. **V2-84 rejoint la liste globale unique, avec l'origine `hors_jlpt` explicite ; deux comptabilités distinctes** (plan initial ; hors JLPT, contrôlées à part). **Liste globale : 99 corrections, 90 ENTRY, aucune appliquée** (bilan, §8.13). **Restent 177 nuances du plan** (lot 06 : 18 ; tranches 5 à 8 : 159) ; les 2 hors JLPT sont arbitrées. **Lot 06 livré en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot06.md`, écrit par `a2-05-travail/audit-v1-lot2-t4-lot06.mjs`) : **5 sourcés** (教える sens 2, 本, 英語, 分かる, 練習), **1 assumé** (クラス : 教室, D0414, fondée sur la fiche de 教室), **12 écarts** (学生 : 生徒 ; 教室 : クラス, aucune décision ; 勉強 : 習う ; 授業 : 授業に出る ; 知る : 知っていない ; 言葉 sens 1 et sens 2 : 先生の言葉, 日本の言葉 ; 字 sens 2 : 字が上手だ, D0442 ; 意味 sens 2 : 意味がない, D0444 ; 忘れる : 名前を忘れる, 傘 pour かさ ; 書く : 描く, D0450 ; 文章 : 文, D0443 au fondement partiel, cas discutable) ; corrections proposées V2-85 à V2-96, aucun retrait complet. Après son arbitrage, la tranche 4 serait close et il resterait 159 nuances (tranches 5 à 8). Export : `chatgpt-relecture-A2-05-volet1-lot2-t4-lot06.zip`. **Lot 06 arbitré le 2026-10-10** (ChatGPT, par délégation) : **5 sourcés, 1 assumé, 12 écarts**, les 18 verdicts confirmés, **V2-85 à V2-96 retenues sans modification de fond** ; クラス assumé (D0414), 教室 écart (V2-87, doctrine de お手洗い / トイレ inchangée) ; 文章 écart (V2-96 : la fiche donne le sens du kanji 文, sans l'attester comme mot ; D0443, au fondement partiel, reste intacte ; le nouvel arbitrage est documenté à part). **Tranche 4 close : 30 nuances du plan, 11 sourcées, 1 assumée, 18 écarts ; hors JLPT, à part : 1 sourcée, 1 écart. Liste globale unique : 111 corrections, 101 ENTRY, aucune appliquée** (bilan, §8.14). **Restent 159 nuances du plan** (tranches 5 à 8) ; 377 candidats et 147 arbitrages du volet 2 inchangés. **Périmètre de la tranche 5 proposé** (`docs/rapports/etape2-A2-05-volet1-lot2-tranche5-perimetre.md`, calculé par `a2-05-travail/perimetre-v1-lot2-t5.mjs`) : **29 nuances, 24 ENTRY, lots 08 (« Communication, correspondance et médias », 18) et 09 (« Loisirs, sorties et voyages », 11)** ; 25 à examiner (toutes de classe D : verbes avec leur complément), 3 faux positifs (話, 歌, 弾く), 1 à caractère isolé (歌う) ; chevauchements : 6 sens candidats des 377, 1 sens des 147 (かける sens 3) ; aucune correction déjà retenue sur ces ENTRY ; comparables arbitrés : 書く (描く), 吹く, 外国人, 授業に出る, 言葉 ; **découpage proposé en trois livraisons** : 5a (lot 08, écrit, téléphone et médias, 9), 5b (lot 08, parole et échange, 9), 5c (lot 09, 11) ; option : deux par lot. Après la tranche 5, il resterait 130 nuances. Export : `chatgpt-relecture-A2-05-volet1-lot2-tranche5-perimetre.zip`. **Périmètre de la tranche 5 arbitré le 2026-10-10** (ChatGPT, par délégation) : 29 nuances dans 24 ENTRY, exactement les restantes des lots 08 et 09, sans ajout ni retrait ; **trois livraisons distinctes** (5a : 9 ; 5b : 9 ; 5c : 11) ; audit autorisé pour 5a seule ; 5b, puis 5c, après l'arbitrage de chacune ; かける sens 3 (volet 2) et les candidats C1 à C10 non rouverts. **Livraison 5a en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5a.md`, écrit par `a2-05-travail/audit-v1-lot2-t5-5a.mjs`) : **3 sourcés** (写真 : 写真を撮る ; 電話 sens 2 : 電話をかける ; 見せる : 写真を友達に見せる, tous d'anciens exemples), **0 assumé, 6 écarts**, tous du critère 1 (手紙 : 手紙を出す ; かける sens 1 : 友達 pour 母 ; かける sens 2 et 3 : めがねをかける, 壁に絵をかける, construits ; 番号 : 部屋の番号 ; テレビ : テレビを見る pour テレビで…を見る) ; corrections proposées V2-97 à V2-102. Après son arbitrage, il resterait 150 nuances (5b : 9 ; 5c : 11 ; tranches 6 à 8 : 130). Export : `chatgpt-relecture-A2-05-volet1-lot2-t5-5a.zip`. **5a arbitrée le 2026-10-10** (ChatGPT, par délégation) : **3 sourcés, 0 assumé, 6 écarts**, les neuf verdicts confirmés, **V2-97 à V2-102 retenues sans modification**. **Précision méthodologique** : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte ; remplacer un complément ou changer une particule n'est pas une normalisation ; pour テレビ, insuffisance de provenance, non démonstration d'incorrection ; かける sens 3 : nuance seule, verdict du volet 2 inchangé. **Liste globale unique : 117 corrections, 105 ENTRY, aucune appliquée** (bilan, §8.15). **Restent 150 nuances** (5b : 9 ; 5c : 11 ; tranches 6 à 8 : 130). **5b livrée en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5b.md`, écrit par `a2-05-travail/audit-v1-lot2-t5-5b.mjs`) : **4 sourcés** (呼ぶ sens 1, 答える, 聞く sens 1 ; 話す : 日本語を話す, la fiche nommant l'alternance を / で, cas à confirmer), **1 assumé** (話, nuance d'ENTRY : 話す, D0507), **4 écarts** (呼ぶ sens 2 : 〜と呼ぶ, D0513 ; 聞く sens 2 : 先生に聞く pour おまわりさんに道を聞く ; 言う : 田中と言います ; 話 sens 2 : 昔の話) ; corrections proposées V2-103 à V2-106. Après son arbitrage, il resterait 141 nuances. Export : `chatgpt-relecture-A2-05-volet1-lot2-t5-5b.zip`. **5b arbitrée le 2026-10-10** (ChatGPT, par délégation) : **4 sourcés, 1 assumé, 4 écarts**, les neuf verdicts confirmés, **V2-103 à V2-106 retenues sans modification** ; 話す sourcé : **une variante expressément autorisée par la description de la fiche peut être sourcée lorsqu'elle conserve le mot et la construction concernés** (précision propre au contrôle de provenance, sans élargir les normes A2 ni autoriser une variante inférée de connaissances externes). **Liste globale unique : 121 corrections, 109 ENTRY, aucune appliquée** (bilan, §8.16). **Restent 141 nuances** (5c : 11 ; tranches 6 à 8 : 130). **Audit de 5c autorisé** (11 nuances du lot 09, livrées à part). **5c livrée en proposition** (`docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5c.md`, écrit par `a2-05-travail/audit-v1-lot2-t5-5c.mjs`) : **7 sourcés** (映画, 歌う, 泳ぐ : プールで泳ぐ, la fiche autorisant で pour le lieu, cas à confirmer ; 遊ぶ, 歌, 絵, 釣り), **1 assumé** (弾く : l'homophone 引く, D0545 et D1210), **3 écarts** (外国 : renvoi à 外国人 sans appui ; 散歩 : 犬の散歩, construit ; 国 : 国に帰る pour 国へかえる, et お国はどちらですか, construit) ; corrections proposées V2-107 à V2-109. Après son arbitrage, il resterait 130 nuances, toutes dans les tranches 6 à 8, et la tranche 5 serait close. Export : `chatgpt-relecture-A2-05-volet1-lot2-t5-5c.zip`. **5c arbitrée le 2026-10-12** (ChatGPT, par délégation ; relayé par l'utilisateur) : **7 sourcés, 1 assumé, 3 écarts**, les onze verdicts confirmés, **V2-107 à V2-109 retenues sans modification** (rapport, §U0 ; bilan, §8.17). **泳ぐ, sourcé** : la fiche documente explicitement で pour le lieu, notamment une piscine, et プール et sa construction avec で figurent dans les anciens exemples ; プールで泳ぐ conservé, sans la correction de repli. **弾く, assumé** : D0545 et D1210 établissent explicitement la distinction avec l'homophone 引く, fondement vérifiable dans les sources figées ; renvoi conservé, sans la correction de repli ; le candidat `v_192_s1` reste ouvert dans les 377. **国 (V2-109)** : 国へかえる conservé (exemple source, particule へ, verbe en kana) ; 国に帰る et お国はどちらですか non conservés ; pas de repli au français seul. **外国 (V2-107)** : renvoi à 外国人 retiré, 外国に行く conservé. **散歩 (V2-108)** : 犬の散歩 retiré, 散歩する et 公園を散歩する conservés. **Tranche 5 close documentairement : 29 nuances, 14 sourcées, 2 assumées, 13 écarts. Liste globale unique : 124 corrections, 112 ENTRY, toutes non appliquées. Restent 130 nuances** : tranche 6, 47 ; tranche 7, 39 ; tranche 8, 44. 377 candidats C1 à C10 et 147 arbitrages du volet 2 inchangés ; aucune décision historique réécrite. **Anomalie technique du 2026-10-10** (code de sortie non nul de la commande finale) : expliquée et reproduite, §11 ; elle ne touche ni l'export ni l'archive. **Périmètre de la tranche 6 proposé le 2026-10-12, non arbitré** (`docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md`, calculé par `a2-05-travail/perimetre-v1-lot2-t6.mjs`) : **47 nuances, 41 ENTRY, lots 10 (« Position, direction et orientation », 19) et 11 (« Démonstratifs, interrogatifs et pronoms », 28)** ; 35 à examiner, 8 faux positifs présumés, 4 à caractère isolé ; classes D 25, A 7, B-romaji 5, B-transcription 3, E 3, S1 4 ; chevauchements : 33 nuances sur 32 sens candidats des 377 (surtout C4-0 et C2-0, populations imposées des `null` avec fonction linguistique ; quatre sens au point réservé de la deixis temporelle), 4 sens des 147 (表, 皆, 自分, 誰か ; non rouverts) ; corrections déjà retenues sur 表 et 皆 (volet 2, n° 3 et n° 4, autres champs) ; `v_704_s1` 近く : sa particule a été contrôlée à la tranche 1, sa nuance l'est ici ; **découpage proposé en cinq livraisons** : 6a (lot 10, positions relatives, 10), 6b (lot 10, directions, distance et repères, 9), 6c (lot 11, séries こ, そ, あ, 10), 6d (lot 11, どちら et le choix, 7), 6e (lot 11, autres interrogatifs et pronoms, 11) ; options : quatre livraisons, ou deux par lot. Après la tranche 6, il resterait 83 nuances. Export : `chatgpt-relecture-A2-05-volet1-lot2-tranche6-perimetre.zip`. **Périmètre de la tranche 6 arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l'utilisateur) : les 47 nuances des lots 10 et 11, dans 41 ENTRY, sans ajout ni retrait ; les cinq livraisons 6a (10), 6b (9), 6c (10), 6d (7), 6e (11) ; **audit documentaire de 6a seule autorisé**, chaque livraison suivante attendant l'arbitrage de la précédente ; 377 candidats et 147 arbitrages non rouverts ; périmètre strictement limité à la provenance des nuances. **Explication de l'anomalie PowerShell (§11) acceptée comme diagnostic documentaire** ; consigne : conserver la distinction entre les codes de sortie réellement observés et les résultats simplement affichés. **Nouvelle priorité fixée par le même arbitrage : un checkpoint Git documentaire, avant l'audit de 6a**, limité aux éléments documentaires validés, sans application des corrections lexicales ; la demande n'autorise que la préparation et le contrôle en lecture seule, **ni indexation, ni commit, ni push**. **Checkpoint proposé le 2026-10-12, non arbitré** (`docs/rapports/etape2-A2-05-checkpoint-documentaire.md`) : état complet de Git (un seul fichier suivi modifié ; 187 chemins non suivis, dont 30 documents) ; classement des fichiers (normatifs, historiques, périmètres validés, rapports arbitrés, documents mixtes, temporaires) ; diff de `docs/conception/a2/README.md`, conforme au rangement accepté ; actualisations minimales proposées pour `CLAUDE.md`, `ETAT-ACTUEL.md`, `ROADMAP.md` et `docs/relecture/note-relais.md`, **non appliquées** ; **36 chemins à indexer par ajout explicite** (5 modifiés, 31 nouveaux), contrôlés par script contre l'état de Git ; exclusions vérifiées (`data/`, `reconstruction/`, registres, outils, tests, `a2-05-travail/`, `chatgpt-relecture/`, archives) ; `.gitignore` n'excluant aucun de ces dossiers, l'exclusion repose sur les chemins explicites ; deux en-têtes de statut périmés à corriger (criblage ; périmètre du lot 2) ; six questions à arbitrer. Export : `chatgpt-relecture-A2-05-checkpoint-documentaire.zip`. **Checkpoint relu le 2026-10-12 : accord sur le contenu et le périmètre, sous corrections ; ni indexation, ni commit, ni push autorisés.** Arbitrages des six questions : (1) bilan mixte inclus, son en-tête précisant que les §3 à §5 demeurent des propositions non arbitrées et que le §6, proposition de périmètre, a été accepté puis exécuté ; (2) les deux en-têtes périmés corrigés par ajout, texte d'origine intact ; (3) gouvernance acceptée, C1 à C4, E1 à E5, R1 à R6, N1 à N5 ; **E6 : deux lignes historiques seulement, la ligne du checkpoint reportée au commit réel, sans anticiper de push** ; (4) scripts d'`a2-05-travail/` exclus, non supprimés, inventoriés à part (`a2-05-travail/INVENTAIRE-SCRIPTS.md`), conservation durable à arbitrer séparément ; (5) rapport de checkpoint inclus, arbitrages inscrits, proposition initiale conservée ; (6) les 36 chemins et le message de commit acceptés en principe. **Contrôle préalable demandé, fait** : `docs/conception/a2/A2-GLOBAL-v1.md` est identique à l'original retrouvé sur le poste (`Architecture taxonomie/Ocha_Snapshot_Architecture_Semantique_A2_GLOBAL_v1.md`), même SHA-256 `a8ae70d1…ded0`, `cmp` sans différence. **Préparation faite le 2026-10-12** (rapport de checkpoint, §0) : les 21 actualisations de gouvernance et les deux lignes d'E6 appliquées dans l'arbre de travail ; trois en-têtes complétés (bilan, criblage, périmètre du lot 2), une ligne ajoutée chacun ; un écart signalé : la mention « ChatGPT, par délégation » retirée de l'en-tête du criblage, l'auteur de la validation n'étant pas attesté dans les documents ; contrôles relancés, tous en code 0 (§1). Export : `chatgpt-relecture-A2-05-checkpoint-prepare.zip`. **Préparation relue le 2026-10-12, avis favorable ; périmètre définitivement validé (36 chemins : 5 modifications, 31 nouveaux) ; ajustements confirmés** (attribution non établie retirée de l'en-tête du criblage, statut des propositions historiques précisé, troisième ligne d'E6 reportée). **Commit autorisé explicitement, puis créé le 2026-10-12** : à l'étape de contrôle de l'index, `git diff --cached --check` a rendu le code 2 (trois anomalies d'espacement dans des fichiers nouveaux) ; l'opération a été arrêtée avant le commit et signalée ; sur autorisation, les trois espaces ont été corrigés, les trois fichiers réindexés, et les contrôles relancés (code 0 ; 5 `M` et 31 `A` ; index identique à la liste ; aucun fichier interdit). **Commit `3756fe3e8076efb7dbf06933d453ec5b06612234`**, parent `5a8687b`, 36 fichiers ; **non poussé**. **Clôture documentaire préparée le 2026-10-12, sur demande, sans indexation** : troisième ligne d'E6 dans `ETAT-ACTUEL.md`, avec le SHA réel ; §1 de ce relais (§1.1 nouveau, §1.2 conservé) ; historique de `docs/relecture/note-relais.md` ; §0.6 du rapport de checkpoint. Export : `chatgpt-relecture-A2-05-checkpoint-cloture.zip`. **Attendu : la relecture de cette clôture ; puis, séparément, l'accord pour le second commit, et l'accord de push après contrôle du distant réel. Ensuite seulement : l'audit de 6a (dix nuances de positions relatives du lot 10) ; 6b n'est pas commencée avant l'arbitrage de 6a ; après la clôture de la tranche 6, le périmètre de la tranche 7 (entrées restantes, thème, limites, livraisons), sans audit lexical avant accord.** **Aucune correction, aucune modification du journal, aucun commit ni push avant accord explicite.**
1. Arbitrage du périmètre de la prochaine tranche (§8).
2. Sur cet accord : audit individuel de la tranche, selon la méthode validée (fiche source entière et exemple ; état publié ; décision et décisions voisines ; A5, A2-L3, A2-GLOBAL et autres normes ; comparables ; verdict L, F, C ou N motivé cas par cas), puis export.
3. À décider à part, sur accords explicites : le commit du travail documentaire en attente, et la mise à jour des documents de gouvernance.
4. **Ne pas commencer** : l'examen des autres candidats du volet 1, ni G1 à G7.

## 11. Anomalie technique du 2026-10-10 : code de sortie non nul de la commande finale (expliquée le 2026-10-12)

**Constat.** À la fin de la livraison 5c, la dernière commande de la session a rendu un code de sortie non nul, alors que tous les contrôles affichés étaient favorables. Retrouvé dans le journal de la session du 2026-10-10 (23 h 01), puis reproduit le 2026-10-12, en lecture seule.

**Commande exacte** (PowerShell 5.1, une seule ligne, cinq instructions séparées par `;`) :

```
Select-String -Path chatgpt-relecture\10-diff-et-controles.md -Pattern '684|problème|erreur' | Select-Object -First 4 | ForEach-Object { $_.Line.Substring(0, [Math]::Min(200, $_.Line.Length)) }; (Select-String -Path chatgpt-relecture\05-relais.md -Pattern 'livraison 5c (proposition)' -SimpleMatch).Count; $f = Get-ChildItem chatgpt-relecture -File | Where-Object { $_.Name -match '^(0[1-9]|10)-' } | Sort-Object Name; Compress-Archive -Path $f.FullName -DestinationPath chatgpt-relecture-A2-05-volet1-lot2-t5-5c.zip -Force; Get-Item chatgpt-relecture-A2-05-volet1-lot2-t5-5c.zip | Select-Object Name, Length; git status --short | Select-Object -First 3
```

**Code de sortie** : 255.

**Sortie, en entier** (stdout et stderr confondus par l'outil ; les trois premières lignes sont tronquées à 200 caractères par la commande elle-même) :

```
Exit code 255
| `node tools/reconstruction/run.mjs assemble` | assemblage partial : 684 ENTRY, 35 identifiant(s) retiré(s), 0 entrée(s) écartée(s) (code 0) |
| `node tools/validate-data.mjs` | validate-data : 0 erreur(s), 149 avertissement(s) |
| assemblage relu en mémoire | 684 ENTRY, 35 retraits, 0 écartées (aucun) ; 0 problème, 0 erreur lexicale, 0 attente ; 148 avertissements (27 « type-nul », 120 « categorie-nulle », 1 « kanji-inconnu »
assemblage partial : 684 ENTRY, 35 identifiant(s) retiré(s), 0 entrée(s) écartée(s)
2

Name                                           Length
----                                           ------
chatgpt-relecture-A2-05-volet1-lot2-t5-5c.zip 2092915
 M docs/conception/a2/README.md
?? a2-05-travail/
?? chatgpt-relecture-A2-05-volet1-lot2-t4-lot05.zip
```

**Cause identifiée, reproduite** : la dernière instruction, `git status --short | Select-Object -First 3`. `git status --short` avait 36 lignes à écrire ; `Select-Object -First 3` arrête le pipeline après la troisième, et git, interrompu avant d'avoir fini d'écrire, se termine avec un code non nul, que l'outil rapporte comme code de la commande entière. Reproduction du 2026-10-12 : cette instruction, lancée seule, rend de nouveau 255 avec les trois mêmes lignes ; avec `-First 100` (plus que les 36 lignes), elle rend 0 ; les instructions de lecture qui la précèdent, relancées seules, rendent 0. **Limite de l'explication** : le mécanisme interne exact (la manière dont PowerShell 5.1 arrête le processus amont et dont le code 255 est formé) n'est pas établi ; ce qui est établi est que la troncature du flux de git produit le code, et qu'aucune autre instruction ne le produit.

**Ce que l'anomalie ne touche pas, vérifié** : l'export avait été généré par la commande précédente, dont la sortie ne portait aucune erreur (dix fichiers écrits ; 510 tests, 510 réussis, 0 en échec) ; l'archive `chatgpt-relecture-A2-05-volet1-lot2-t5-5c.zip` contient les dix fichiers `01` à `10`, de contenu identique (SHA-256) à ceux de `chatgpt-relecture/`, restés tels quels depuis le 2026-10-10 à 23 h 01 (contrôle du 2026-10-12, avant le nouvel export). **Deux manques du 2026-10-10, à ne pas reproduire** : le compte rendu de la session a présenté l'archive comme créée sans signaler le code 255 ; et la commande d'export elle-même avait été lancée avec `2>&1 | tail -15`, si bien que son propre code de sortie était celui de `tail`, non celui de l'outil d'export : il n'a donc pas été observé, seule sa sortie l'a été. « Archive créée » ne valait pas « exécution intégralement réussie ».

**Règle retenue pour la suite** : ne plus tronquer la sortie d'une commande native par `Select-Object -First` ; ne plus faire passer une commande de contrôle par un tube qui masque son code de sortie ; rapporter le code de sortie de chaque commande de contrôle ; signaler tout code non nul dans le compte rendu, même quand la sortie paraît favorable. **Rien n'a été modifié dans le dépôt pour masquer l'anomalie** : aucun outil, aucun test, aucune donnée.
