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
validé** (2026-10-06), dans une session Claude Code cloud ; ni committé ni poussé.

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

**Lot 21, « Fréquence, répétition et repères temporels » : validé, ni committé ni poussé.**

| Étape | État | Qui a décidé |
|---|---|---|
| Périmètre | arbitré le 2026-10-06 : 12 entrées (rapport de périmètre, §9) | toi |
| Proposition lexicale | livrée : 12 entrées, 16 sens | — |
| Les 21 choix | arbitrés le 2026-10-06, retenus avec trois corrections (rapport de proposition, §9) | toi |
| Révision | faite et vérifiée, favorable : D1375 et D1378 réécrites à leur place, D1403 ajoutée | toi |
| **Validation** | **faite le 2026-10-06** : 12 entrées et 34 décisions (D1370 à D1403) en `validated`, statuts seulement (rapport de validation) | toi ; transmise par l'utilisateur |
| **Commit** | **non autorisé** | à donner explicitement |
| **Push** | **non autorisé** | à donner explicitement, à part |

**D'après les contrôles rapportés par Claude Code** : seules les 46 lignes de statut ont changé (12
dans le lot, 34 dans le journal), le contenu hors `status` est identique, et les 1 369 décisions des
lots 0 à 20 sont identiques. **Assemblage réel : 650 ENTRY, 32 retraits, 37 entrées écartées, 0
problème, 0 erreur, 0 attente** ; 1 403 décisions toutes validées ; 140 avertissements justifiés ;
472 tests verts ; 42 sabotages attrapés.

`06` contient les rapports de périmètre, de proposition et de **validation**, et le rapport
généré ; `07` les 12 fiches et les précédents ; `08` est `lot-21.json` validé ; `09` ses 34
décisions ; `10` le diff contre `55acc13` et la **comparaison avant / après validation**. **Rien
n'est committé.**

## 4. Ce qui est attendu de cette relecture

**Contrôler le diff de validation** (`10`, §3, et rapport de validation) : statuts seulement.

**Décider du commit**, explicitement, puis, à part, **du push**. Les fichiers à committer sont
listés dans le rapport de validation (§6) et dans le relevé de Claude Code ; `chatgpt-relecture/`
et le ZIP de transfert n'en font jamais partie.

**Aucune préparation du lot 22** : rien n'est fait avant une demande explicite.

## 5. Points ouverts

La liste complète et à jour est dans `ETAT-ACTUEL.md`, section « Points ouverts »
(`01-gouvernance.md`). Ceux qui touchent la suite proche :

- **Fonctions d'A2-LING sans définition** : seule `deictique` en a une (A7). `connecteur`,
  `discours` et `politesse` conditionnent les mots de liaison et les réponses ; `quantificateur`,
  `comparatif` et `intensifieur`, le lot « quantité et degré » (rapport de périmètre, §6).
- **Classe de など** : « particule suffixe » selon sa fiche ; le registre des classes n'a pas de
  classe « particule ».
- **Identité de 弱く** (forme de 弱い, validée au lot 17) et de ゆっくり / ゆっくりと.
- **« Adjectif en na (et nom) »** : le schéma ne porte qu'une classe par ENTRY (いろいろ, 同じ, 一緒).
- **Audit A2-05** : catégories nulles, deixis temporelle de 前, 先 et 近く, catégories de メートル et
  キロ, extensions conservées en nuance.
- **Passe finale 5.16** : relations candidates des lots 18 à 20 ; furigana de 頼む ; formes de 煙草
  et 居る.

## 6. Prochaine action

1. **Commit** du lot 21, sur ton accord explicite (« j'autorise le commit »).
2. **Push**, sur un accord explicite et distinct.
3. Lot 22 : seulement sur demande explicite.
