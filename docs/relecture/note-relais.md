Cette note est écrite à la main par Claude Code et mise à jour avant chaque export. Elle dit ce
que l'outil ne peut pas déduire des données : les rôles, les consignes, qui a décidé quoi, et ce
qui est attendu. L'état chiffré est dans la partie 2, relevée par l'outil.

**Dernière mise à jour de la note** : 2026-10-06. Historique : 2026-10-05, après le commit du lot 16 (`6c8fc50`) ; périmètre
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
committé (`affa45e`) et poussé**, dans une session Claude Code cloud.

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

**Lot 24, « Quantité, degré et comparaison » : clos.** Validé, committé (`affa45e`) et poussé.

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

`06` contient le rapport de périmètre (arbitrage au §9), le rapport de proposition, **le rapport de
validation** et le rapport généré ; `07`, les **14 fiches sources complètes** et les précédents
validés ; `08` est `lot-24.json` ; `09` ses 59 décisions ; `10` le diff contre `2c89eb0` et le diff
de la validation (statuts seulement).

## 4. Ce qui est attendu de cette relecture

Rien sur le lot 24, clos. La prochaine relecture portera sur le préalable de classe de など.

## 5. Points ouverts

La liste complète et à jour est dans `ETAT-ACTUEL.md`, section « Points ouverts »
(`01-gouvernance.md`). Ceux qui touchent la suite proche :

- **Fonctions d'A2-LING** : `deictique` est définie par A7 ; **A9, validé, définit aussi
  `connecteur`, `discours`, `politesse`, `quantificateur`, `comparatif` et `intensifieur`**
  (appliquées au lot 23 pour les trois premières et `intensifieur`, au lot 24 pour `quantificateur`,
  `comparatif`, `intensifieur` et `politesse`). Restent
  sans définition : `interrogatif` (appliquée sur un sens implicite), `negation`, `pluralisation`,
  `modalite`, `aspect`, `temps`, `alternative`.
- **Classe de など** : « particule suffixe » selon sa fiche ; le registre des classes n'a pas de
  classe « particule ».
- **Identité de 弱く et de ゆっくりと** : arbitrée au lot 22 (fusions dans 弱い, sans réouverture,
  et dans ゆっくり).
- **« Adjectif en na (et nom) »** : le schéma ne porte qu'une classe par ENTRY (いろいろ, 同じ, 一緒).
- **Audit A2-05** : catégories nulles, deixis temporelle de 前, 先 et 近く, catégories de メートル et
  キロ, extensions conservées en nuance.
- **Passe finale 5.16** : relations candidates des lots 18 à 20 ; furigana de 頼む ; formes de 煙草
  et 居る.

## 6. Prochaine action

1. **Ouvrir le préalable sur la classe de など**, dernière entrée du vocabulaire N5, séparément de
   tout lot lexical : la fiche la dit « particule suffixe », et le registre des classes n'a pas de
   classe « particule ».
2. Ensuite : la passe finale 5.16, puis la publication 5.17.
