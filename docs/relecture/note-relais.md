Cette note est écrite à la main par Claude Code et mise à jour avant chaque export. Elle dit ce
que l'outil ne peut pas déduire des données : les rôles, les consignes, qui a décidé quoi, et ce
qui est attendu. L'état chiffré est dans la partie 2, relevée par l'outil.

**Dernière mise à jour de la note** : 2026-10-05, après le commit du lot 16 (`6c8fc50`) ; périmètre
du lot 17 arbitré, proposition relue et arbitrée, lot 17 validé et committé (`e9fe6a4`) ; outillage
de relecture committé (`2387d20`) ; lot 18 : périmètre arbitré, proposition livrée, vingt choix
arbitrés, révision vérifiée, lot validé et committé (`213fb2b`) ; délégation des accords à
ChatGPT ; lot 19 : périmètre arbitré, proposition livrée, 22 choix arbitrés, révision vérifiée,
**lot validé, non commité** (2026-10-06).

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
Rien n'est poussé.

**Lot 18, « Actions sur les objets » : clos**, committé (`213fb2b`). **Rien n'est poussé.**

**Lot 19, « Vie quotidienne, travail et échanges » : validé, non commité.**

| Étape | État | Qui a décidé |
|---|---|---|
| Périmètre | arbitré le 2026-10-06 (rapport de périmètre, §7) | toi |
| Proposition lexicale | livrée : 26 entrées | — |
| Les 22 choix | arbitrés le 2026-10-06 : dix-huit retenus, quatre révisés (rapport de proposition, §8) | toi |
| Révision sur quatre points | faite, vérifiée (avis favorable) | toi |
| **Validation** | **faite le 2026-10-06** : 26 entrées et 61 décisions (D1241 à D1301) en `validated`, statuts seulement | toi, par délégation |
| Commit | **non autorisé** | à donner explicitement |
| Push | **non autorisé**, jamais fait | à donner explicitement |

**État réel après validation** : 616 ENTRY, 32 retraits, 71 entrées restantes ; 1 301 décisions
validées, aucune proposition en cours.

`08` contient les 26 entrées validées, `09` leurs 61 décisions, `06` les rapports (périmètre,
proposition, **validation**, rapport généré), `10` le diff contre le dernier commit (`213fb2b`) et
la comparaison avant / après validation.

## 4. Ce qui est attendu de cette relecture

**Contrôler le diff de validation**, avant de décider du commit :

1. **Statuts seulement** : dans `10`, §3, la comparaison avant / après validation doit donner 26
   lignes changées pour `lot-19.json` et 61 pour `journal.json`, toutes `"status": "proposed"` →
   `"validated"`, et un contenu identique hors statut. Les copies d'avant sont hors dépôt : tu ne
   peux pas refaire la comparaison, seulement lire son résultat.
2. **L'état attendu** : 616 ENTRY, 32 retraits, 71 entrées restantes, 1 301 décisions validées,
   aucune `proposed`.
3. **Les tests d'état** (`10`, diff de `tests/reconstruction/workspace.test.js`) : ils affirment
   maintenant l'état validé ; l'essai à blanc est devenu le contrôle du lot dans l'assemblage réel.

Puis **décide du commit**, explicitement. Les fichiers qui y entreraient sont listés dans `10`, §1 ;
`chatgpt-relecture/` n'en fait pas partie.

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

1. **Contrôle du diff de validation** par ChatGPT.
2. **Commit**, sur son accord explicite ; Claude Code montre d'abord le `git diff --stat` et la
   liste exacte des fichiers.
3. **Push** : jamais fait à ce jour ; sur un accord explicite et distinct.
4. **Lot 20** : sur demande explicite, thème et périmètre par identifiants, sans décision lexicale
   avant l'arbitrage du périmètre.
