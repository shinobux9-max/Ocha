Cette note est écrite à la main par Claude Code et mise à jour avant chaque export. Elle dit ce
que l'outil ne peut pas déduire des données : les rôles, les consignes, qui a décidé quoi, et ce
qui est attendu. L'état chiffré est dans la partie 2, relevée par l'outil.

**Dernière mise à jour de la note** : 2026-10-05, après le commit du lot 16 (`6c8fc50`) ; périmètre
du lot 17 arbitré, proposition relue et arbitrée ; **lot 17 validé, non committé** (2026-10-06).

## 1. Les rôles

- **L'utilisateur** arbitre. Lui seul valide, autorise un commit, autorise un push.
- **Claude Code** réalise les modifications dans le dépôt local et lance les contrôles.
- **Le relecteur** (ChatGPT, sur ces fichiers ; Codex auparavant, sur le dépôt réel) relit et
  recommande.

## 2. Consignes pour le relecteur

1. **Claude Code réalise les modifications ; tu relis et tu recommandes** les choix les plus
   pertinents et les plus pédagogiques pour Ocha, une application d'apprentissage du japonais pour
   francophones débutants.
2. **L'utilisateur te délègue les recommandations linguistiques** : donne un choix clair et
   motivé, pas une liste d'options à égalité. Si deux choix se valent, dis lequel tu retiendrais et
   pourquoi.
3. **Trois accords restent distincts et explicites** : la validation d'un lot, le commit, le push.
   Ton avis favorable n'en vaut aucun. Ne les présente jamais comme acquis.
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

**Lot 16, « Préférences, appréciations et états de la personne » : clos.**

| Étape | État | Qui a décidé |
|---|---|---|
| Proposition, révisée une fois | avis favorable sans réserve de Codex | Codex |
| Validation atomique | faite | l'utilisateur, par un accord explicite |
| Relecture du diff de validation | avis favorable au commit, sans correction | ChatGPT |
| Commit | **fait** : `6c8fc50` | l'utilisateur, par un accord explicite |
| Push | non fait, non autorisé | l'utilisateur |

**Entre les deux lots**, trois choses hors lexique, non committées à la date de cette note :
l'outil d'export qui produit ce dossier (`tools/export-relecture.mjs`, avec ses tests), cette note,
et le retrait de `PASSATION-CONVERSATION.md`, un document de passation du 2026-10-01 devenu
périmé, qu'aucun fichier ne citait. Elles apparaissent dans le diff (`10`).

**Lot 17, « États et propriétés descriptives » : validé sur autorisation explicite de l'utilisateur ; non committé. Le diff de validation est à relire.**

| Étape | État | Qui décide |
|---|---|---|
| Périmètre | proposé par Claude Code | — |
| Relecture du périmètre | **faite** : avis favorable aux 17 entrées, sans scission ni élargissement ; issue C recommandée pour 温かい et 暖かい ; titre « États et propriétés descriptives » recommandé ; correction du §5.1 demandée | ChatGPT |
| Correction du §5.1 | **faite** : les trois issues sont lues au regard d'A3 (L2 et L3) | Claude Code |
| Arbitrage du périmètre | **fait** : 17 entrées ; titre « États et propriétés descriptives » ; **issue C** pour 温かい et 暖かい ; 早い et 弱く hors du lot | l'utilisateur |
| Proposition lexicale | livrée, en `proposed` : 17 entrées, 41 décisions (D1127 à D1167), réouverture de 暖かい comprise | Claude Code |
| Relecture de la proposition | **faite** : favorable à 13 des 14 choix ; correction demandée sur le point 12 (catégories de 古い et de 新しい) | ChatGPT |
| Révision | **faite, à relire** : 古い et 新しい passent de la catégorie nulle à `temps`, niveau 1 (D1129 et D1131 réécrites à leur place) | Claude Code |
| Seconde relecture | faite : avis favorable sur les quatorze choix, sans réserve lexicale | ChatGPT |
| Arbitrage des quatorze choix | fait : tous retenus dans leur version révisée | l'utilisateur |
| Validation atomique (statuts seulement) | **faite**, sur autorisation explicite : lot 17, ses 41 décisions, et l'entrée rouverte du lot 07 | l'utilisateur |
| Relecture du diff de validation | **à faire : c'est la tâche du relecteur** | — |
| Commit, push | **non autorisés** | l'utilisateur |

**Le lot 17 est validé ; son diff de validation est à relire** : `08` est le lot, `09` ses 41 décisions, `07` les 17
fiches sources et les précédents cités, `06` les rapports (périmètre, proposition, rapport généré).

**Une ENTRY validée a été rouverte, puis revalidée.** 暖かい (`n5_v_275`, lot 07) est maintenant
`validated`, retirée par fusion dans 温かい (`n5_v_8`). L'entrée rouverte est dans `lot-07.json`, non dans `08` : son état
actuel, son état validé d'avant (champ « avant » de D1127) et ses décisions D0476 et D0477 sont
dans `07`, partie 2, et dans `09` ; le diff de `lot-07.json` est dans `10`. L'assemblage réel
compte 567 ENTRY et 32 retraits.

## 4. Ce qui est attendu de cette relecture

**Relire le diff de validation du lot 17** (`10`), avec le rapport de validation (`06`). Il ne
s'agit pas de rejuger la proposition, déjà relue et arbitrée, mais de vérifier que ce qui est validé
est bien ce qui a été relu :

- le lot (`08`) et ses 41 décisions (`09`) correspondent aux quatorze choix arbitrés (rapport de
  validation, §2) ;
- l'entrée rouverte du lot 07 (`07`, partie 3) est validée telle que proposée ; D0476 et D0477 sont
  intactes ;
- le suivi (`ROADMAP.md`, `ETAT-ACTUEL.md`, `CLAUDE.md`) dit la même chose que les données ;
- les tests modifiés décrivent l'état validé.

Termine par un avis net : favorable au commit, ou corrections demandées.

Ce qui suit rappelle les demandes précédentes, sur la proposition puis sur le périmètre. Pour la
proposition, il fallait regarder de près :

- **la réouverture et la fusion** (rapport de proposition, §2) : D1127 garde-t-elle bien tout
  l'état validé de 暖かい ? D0476 et D0477 sont-elles intactes ? L'ENTRY survivante ne contient-elle
  que ce que documentent les deux fiches, sans perte ni ajout ?
- **les deux sens de 温かい** et sa forme usuelle ;
- **les entrées à deux sens** (丈夫, 遅い, 汚い, 清い, うるさい, 爽やか, 暗い) : chaque second sens
  est-il bien documenté par la fiche, exemple compris ?
- **les neuf catégories nulles** (古い et 新しい sont désormais rangées dans le temps).

Ce qui suit rappelle la demande précédente, sur le périmètre, désormais arbitré.

**Relire le rapport de périmètre du lot 17** (`06`), avec les 17 fiches (`07`), et recommander à
l'utilisateur, point par point :

1. **Le thème et le périmètre** : les 17 adjectifs, sans scission.
2. **L'identité de 温かい et de 暖かい** (rapport, §5.1). C'est le point qui demande le plus
   d'attention. 暖かい est validée au lot 07 et porte déjà la graphie 温かい ; 温かい est aussi une
   entrée source à part. Les trois issues envisagées touchent une ENTRY validée. La fiche de 暖かい,
   sa décision validée et ses décisions de journal sont dans `07`, partie 2. Recommande l'issue la
   plus juste pour un débutant, en disant ce qu'elle coûte.
3. **L'élargissement** à 早い et à 弱く, ou non.
4. **Les cas sensibles** du §5.4 : signale ceux qui te paraissent mal posés, ou une fiche que le
   rapport lit de travers. Ne tranche pas les sens : la proposition lexicale viendra après l'accord
   sur le périmètre.

**Accessoirement**, si tu as le temps : le diff de l'outil d'export et de ses tests (`10`). C'est
du code d'outillage, sans effet sur les données lexicales.

## 5. Points ouverts

La liste complète et à jour est dans `ETAT-ACTUEL.md`, section « Points ouverts »
(`01-gouvernance.md`). Ceux qui touchent la suite proche :

- **Identité de 温かい et de 暖かい** : arbitrée (issue C) et validée avec le lot 17 (D1127,
  D1128).
- **Adjectifs restants hors du lot 17** : 多い et 少ない (lot « quantité et degré », réservé), 早い
  (réservée depuis le lot 13, à examiner au regard d'A7), 同じ et いろいろ (sans lot attribué), et
  l'adverbe 弱く (forme de 弱い, identité à décider).
- **Lot « quantité et degré »**, précédé de la question des fonctions `quantificateur`,
  `comparatif` et `intensifieur`, sans définition normative.
- **« Adjectif en na (et nom) »** : le schéma ne porte qu'une classe par ENTRY.
- **Emplois d'adresse conservés en nuance** : les fonctions pragmatiques d'A2-LING n'ont pas de
  définition normative.
- **Audit A2-05** : catégories nulles, deixis temporelle de 前 et 先, catégories de メートル et キロ,
  extensions conservées en nuance.
- **Hors lexique** : le push de la branche, jamais fait à ce jour.

## 6. Prochaine action

1. **Avis du relecteur** sur le diff de validation du lot 17, rédigé pour être transmis tel quel à
   Claude Code.
2. **Sur accord explicite de l'utilisateur** : commit, sur une ligne. Aucun push sans accord
   distinct.
3. **Ensuite, sur demande explicite** : préparation du périmètre du lot 18, sans décision lexicale
   avant l'accord sur ce périmètre.
4. **Séparément, sur accord explicite** : le commit de l'outil d'export, de la note et du retrait
   du document de passation ; puis, à part, celui du lot 17.
