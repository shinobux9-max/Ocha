# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 26 « Passe finale » (5.16) · proposition

**Date** : 2026-10-07
**Nature** : **proposition**, tout en `proposed`. Rien n'est validé, committé ni poussé.
**Suite** : ce rapport décrit l'état de la proposition. Le lot a été **validé le 2026-10-07**, statuts
seulement : voir `docs/rapports/etape2-A2-04-lot26-valide.md`.
**Base** : `ocha-v2` = `origin/ocha-v2` = `8ce0e23`. Arbitrage du périmètre rendu par ChatGPT le
2026-10-07 (Q1 à Q9), relayé par l'utilisateur et consigné au §9 du rapport de périmètre
(`docs/rapports/etape2-A2-04-lot26-perimetre-5-16.md`).

**En bref** : 19 ENTRY validées sont rouvertes dans leur lot d'origine ; 44 décisions s'ajoutent à la
fin du journal (D1570 à D1613) ; 22 liens sont notés entre sens ; les furigana de 頼む sont corrigés ;
たばこ devient la forme usuelle de 煙草. `data/` n'est pas touché. Essai à blanc : 684 ENTRY, 35
retraits, 0 entrée écartée, 0 problème, 0 erreur. **Les dix choix d'exécution (§8) ont été relus ;
les choix 1, 2, 3 et 5 sont arbitrés au §12, et la révision qui en découle (la raison de D1613) est
faite et vérifiée.**

---

## 1. Le véhicule (Q1)

1. **`lot-26.json` existe et ne contient aucune entrée** : `{ lot: "lot-26", title: "Passe finale",
   entries: {}, additions: [] }`. Une entrée source ne se décide que dans un seul lot (contrôle
   `decision-double` de l'outil) : une ENTRY rouverte reste donc dans son lot d'origine, comme 暖かい
   au lot 17 et les treize corrections de 5.13-C.
2. **Le lot 26 est fait de décisions de journal** (`lot: "lot-26"`), ajoutées à la fin. Pour chaque
   ENTRY rouverte :
   - une décision de **réouverture** (`field: "entrée"`, `kind: "decision"`), dont le champ `before`
     garde **en entier** l'état validé (lot, statut, citations, champs) ;
   - puis **une décision par modification**.
3. **Seules les ENTRY dont les données changent sont rouvertes.** Une relation n'est notée qu'une
   fois (I12) : l'ENTRY qui la porte est rouverte, l'ENTRY visée ne l'est pas. 19 ENTRY sont
   rouvertes ; 15 autres sont seulement visées et restent validées, sans aucune modification.
4. **Les décisions historiques restent intactes** : D0001 à D1569 sont identiques à l'octet à
   `8ce0e23` (préfixe exact du journal, empreinte inchangée) ; chaque ENTRY rouverte cite toujours ses
   décisions historiques, à leur place, puis celles du lot 26.
5. **Effet sur l'assemblage réel** : une proposition n'est jamais lue comme une décision. Tant que le
   lot n'est pas validé, les 19 ENTRY rouvertes sont écartées : **665 ENTRY, 35 retraits, 19 écartées
   (« proposition non validée »)**, 0 problème, 0 erreur. C'est l'état attendu d'une réouverture, non
   une régression.

**Convention du côté porteur** (I12 n'impose aucun côté ; voir §8, choix 1) :
- relation dirigée `transitive_of` : sur le sens du **verbe transitif**, comme l'arbitrage l'écrit ;
- relation symétrique : sur le sens de l'ENTRY de **plus petit numéro**.

C'est une **convention technique propre au lot 26**, retenue à l'arbitrage de la proposition (§12)
parce qu'elle est stable et reproductible. **Ce n'est pas une norme générale** : elle ne modifie ni
I12, ni le schéma, ni le registre A2-REL.

## 2. Les 19 ENTRY rouvertes

| ENTRY | Mot | Lot d'origine | Objet | Décisions du lot 26 |
|---|---|---|---|---|
| `n5_v_208` | お風呂 | 03 | R1 | D1570, D1571 |
| `n5_v_580` | 開ける | 18 | R2 | D1572, D1573 |
| `n5_v_709` | 閉める | 18 | R3 | D1574, D1575 |
| `n5_v_561` | 消す | 18 | R4 | D1576, D1577 |
| `n5_v_529` | 並べる | 18 | R5 | D1578, D1579 |
| `n5_v_533` | 借りる | 19 | R6 | D1580, D1581 |
| `n5_v_562` | 渡す | 19 | R7 | D1582, D1583 |
| `n5_v_181` | する | 20 | R8 | D1584, D1585 |
| `n5_v_527` | 上げる | 19 | R9 | D1586, D1587 |
| `n5_v_593` | しかし | 23 | R10 | D1588, D1589 |
| `n5_v_416` | それから | 23 | R11 | D1590, D1591 |
| `n5_v_418` | では | 23 | R12 | D1592 à D1595 |
| `n5_v_413` | じゃあ | 23 | R12 | D1596 à D1598 |
| `n5_v_344` | はい | 23 | R13 | D1599 à D1601 |
| `n5_v_584` | いいえ | 23 | R13 | D1602, D1603 |
| `n5_v_447` | 少ない | 24 | R14 | D1604, D1605 |
| `n5_v_497` | ちょっと | 24 | R15 | D1606 à D1608 |
| `n5_v_116` | 頼む | 19 | Q5 | D1609, D1610 |
| `n5_v_598` | 煙草 | 19 | Q6 | D1611 à D1613 |

**44 décisions** : 19 réouvertures, 22 relations (une par lien), 1 `correction` (頼む), 2 décisions
pour 煙草 (forme usuelle, graphies). Toutes `proposed`, datées du 2026-10-07.

**Les 15 ENTRY seulement visées, non modifiées, non rouvertes** : ふろ (`n5_v_209`), 開く (`710`),
閉まる (`579`), 消える (`560`), 並ぶ (`528`), 貸す (`575`), 渡る (`563`, lot 04), やる (`608`), でも
(`599`), そうして (`596`), じゃ (`595`), それでは (`417`), ええ (`586`), 多い (`654`), 少し (`509`).

## 3. Les 22 liens (Q4)

Un lien se lit « sens porteur → type → sens visé ». Les libellés sont ceux des SENSE validés,
contrôlés par script avant l'écriture.

| # | Sens porteur | Type | Sens visé | Décision |
|---|---|---|---|---|
| R1 | `v_208_s1` お風呂 « Bain » | `equivalent_to` | `v_209_s1` ふろ « Bain » | D1571 |
| R2 | `v_580_s1` 開ける « Ouvrir » | `transitive_of` | `v_710_s1` 開く « S'ouvrir » | D1573 |
| R3 | `v_709_s1` 閉める « Fermer » | `transitive_of` | `v_579_s1` 閉まる « Se fermer » | D1575 |
| R4 | `v_561_s1` 消す « Éteindre » | `transitive_of` | `v_560_s1` 消える « S'éteindre » | D1577 |
| R5 | `v_529_s1` 並べる « Aligner » | `transitive_of` | `v_528_s2` 並ぶ « Être aligné » | D1579 |
| R6 | `v_533_s1` 借りる « Emprunter » | `reciprocal_with` | `v_575_s1` 貸す « Prêter » | D1581 |
| R7 | `v_562_s2` 渡す « Faire traverser » | `transitive_of` | `v_563_s1` 渡る « Traverser » | D1583 |
| R8 | `v_181_s1` する « Faire » | `equivalent_to` | `v_608_s1` やる « Faire » | D1585 |
| R9 | `v_527_s1` 上げる « Donner » | `similar_to` | `v_608_s2` やる « Donner (à des plantes, des animaux) » | D1587 |
| R10 | `v_593_s1` しかし « Cependant » | `equivalent_to` | `v_599_s1` でも « Mais » | D1589 |
| R11 | `v_416_s1` それから « Ensuite » | `equivalent_to` | `v_596_s1` そうして « Et puis » | D1591 |
| R12 | `v_418_s1` では « Dans ce cas » | `equivalent_to` | `v_595_s1` じゃ « Dans ce cas » | D1593 |
| R12 | `v_418_s2` では « Eh bien » | `equivalent_to` | `v_595_s2` じゃ « Bon » | D1594 |
| R12 | `v_418_s3` では « Alors » | `equivalent_to` | `v_595_s3` じゃ « Alors » | D1595 |
| R12 | `v_413_s1` じゃあ « Alors » | `equivalent_to` | `v_417_s1` それでは « Dans ce cas » | D1597 |
| R12 | `v_413_s2` じゃあ « Eh bien » | `equivalent_to` | `v_417_s2` それでは « Alors » | D1598 |
| R13 | `v_344_s1` はい « Oui » | `equivalent_to` | `v_586_s1` ええ « Oui » | D1600 |
| R13 | `v_344_s1` はい « Oui » | `opposed_to` | `v_584_s1` いいえ « Non » | D1601 |
| R13 | `v_584_s1` いいえ « Non » | `opposed_to` | `v_586_s1` ええ « Oui » | D1603 |
| R14 | `v_447_s1` 少ない « Peu nombreux » | `opposed_to` | `v_654_s1` 多い « Nombreux » | D1605 |
| R15 | `v_497_s1` ちょっと « Un peu » | `similar_to` | `v_509_s1` 少し « Une petite quantité » | D1607 |
| R15 | `v_497_s2` ちょっと « Un instant » | `similar_to` | `v_509_s3` 少し « Un court instant » | D1608 |

**Ce que l'arbitrage écarte, et qui est contrôlé par un test** (aucun lien, ni porté ni reçu) :
消す « Effacer » et 消える « Disparaître » (R4) ; 並ぶ « Faire la queue » (R5) ; 渡す « Remettre »
(R7) ; する « Coûter » (R8) ; 上げる « Lever » (R9) ; いいえ « De rien » (R13) ; たくさん et 大勢
(R14 bis). Aucun lien n'existe ailleurs dans le corpus : ces 22, et eux seuls.

### 3.1. R12 : correspondance des SENSE, entièrement

**Paire では (`v_418`) ↔ じゃ (`v_595`)** : trois sens de chaque côté, appariés un à un.

| では | Fonction | Emploi (nuance du sens) | じゃ | Fonction | Emploi | Lien |
|---|---|---|---|---|---|---|
| `v_418_s1` « Dans ce cas » | connecteur | tirer la conséquence de ce qui précède, conclure un accord | `v_595_s1` « Dans ce cas » | connecteur | conclure un accord, tirer la conséquence | **oui** (D1593) |
| `v_418_s2` « Eh bien » | discours | marquer le passage à une autre idée | `v_595_s2` « Bon » | discours | marquer une transition dans la conversation | **oui** (D1594) |
| `v_418_s3` « Alors » | discours, politesse | prendre congé de manière polie | `v_595_s3` « Alors » | discours | prendre congé | **oui** (D1595) |

**Paire それでは (`v_417`) ↔ じゃあ (`v_413`)** : trois sens contre deux.

| それでは | Fonction | Emploi | じゃあ | Fonction | Emploi | Lien |
|---|---|---|---|---|---|---|
| `v_417_s1` « Dans ce cas » | connecteur | introduire une conclusion | `v_413_s1` « Alors » | connecteur | conclure un accord, tirer la conséquence | **oui** (D1597) |
| `v_417_s2` « Alors » | discours | changer de sujet, ouvrir une étape | `v_413_s2` « Eh bien » | discours | marquer une transition, jusqu'à la prise de congé | **oui** (D1598) |
| `v_417_s3` « Sur ce » | discours, politesse | prendre congé de manière polie (formel) | — | | じゃあ n'a pas de sens distinct pour la prise de congé | **non** (§8, choix 2) |

**Aucun graphe complet** : では et それでは ne sont pas reliées entre elles, ni じゃ et じゃあ, ni では
et じゃあ, ni それでは et じゃ. **Aucun sens n'est créé.**

### 3.2. R15 : correspondance des SENSE, entièrement

| ちょっと (`v_497`) | Catégorie, fonction | Emploi | 少し (`v_509`) | Catégorie, fonction | Emploi | Lien |
|---|---|---|---|---|---|---|
| `v_497_s1` « Un peu » | petite quantité ; quantificateur | une faible quantité | `v_509_s1` « Une petite quantité » | petite quantité ; quantificateur | une faible quantité | **oui** (D1607) |
| — | | ちょっと n'a pas de sens distinct pour le degré | `v_509_s2` « Un peu » | sans catégorie ; intensifieur | un petit degré | **non** (§8, choix 3) |
| `v_497_s2` « Un instant » | temps › durée | un bref instant | `v_509_s3` « Un court instant » | temps › durée | une courte durée | **oui** (D1608) |

L'hésitation (« Euh… ») et le refus poli de ちょっと sont en **nuance** d'ENTRY, non des sens : aucun
lien ne peut s'y fonder, et aucun n'y est fondé.

## 4. Lecture et formes

### 4.1. 頼む (Q5) — `n5_v_116`

| Champ | Avant (mécanique, source) | Proposé |
|---|---|---|
| furigana | `<ruby>頼<rt>たノ</rt></ruby>む` | `<ruby>頼<rt>たの</rt></ruby>む` |
| kana, romaji | たのむ, tanomu | inchangés |
| forme, graphies, nuance, sens | | inchangés |

- `n5_v_116` entre dans la liste fermée **`READING_EXCEPTION_IDS`** de `rules.mjs` (avec 九つ) : la
  lecture devient décidable. La liste ne corrige rien d'elle-même.
- Décision **D1610**, de nature `correction`, sur `readings`.
- Aucune règle générale, aucun addendum ; la source figée garde `たノ`.

### 4.2. 煙草 (Q6) — `n5_v_598`

| Champ | Avant | Proposé |
|---|---|---|
| forme usuelle (`word`) | 煙草 (mécanique) | **たばこ** (D1612) |
| graphies (`writings`) | たばこ | **煙草**, furigana de la source `<ruby>煙<rt>たば</rt></ruby><ruby>草<rt>こ</rt></ruby>` (D1613) |
| lecture | たばこ, tabako, furigana segmentés sur 煙草 | たばこ, tabako, furigana `たばこ` (la forme elle-même) |
| nuance, tags, deux sens (« Cigarette », « Tabac ») | | inchangés |

- `n5_v_598` entre dans la liste fermée **`USUAL_FORM_IDS`** (avec 平仮名). Le traitement suit le
  précédent 平仮名 (D0440) : la lecture dépend de la forme, et se décide avec elle.
- **煙草 n'entre pas dans la liste des lectures spéciales d'A8** ; aucune règle de furigana n'est
  créée. Les furigana de la graphie 煙草 sont ceux de la fiche source, conservés exactement (§8,
  choix 5 ; arbitré au §12) : la source les fournit, et ils recomposent bien たばこ (I5). Ce maintien
  ne dit rien de la justesse linguistique de cette segmentation, et ne fonde aucune règle.

### 4.3. Statu quo : 居る (Q6) et すぐに (Q9)

- **居る** (`n5_v_548`) : forme usuelle 居る, aucune graphie. Ni rouverte, ni modifiée ; elle n'entre
  dans aucune liste.
- **すぐに** (`n5_v_518`) : `particles: ["に"]` conservée. Ni rouverte, ni modifiée.

Ces deux statu quo ne produisent **aucune décision de journal** (§8, choix 7) ; un test les contrôle.

## 5. Les tables (Q2, Q3, Q7)

### 5.1. Clés de `exemples.json` (Q2, Q3)

`data/n5/exemples.json` **n'est pas modifié** (un test le vérifie identique à la source figée). La
correspondance est fixée et vérifiée :

| Clés | Nombre | Phrases | Correspondance |
|---|---|---|---|
| entrée gardée | 682 | 2 047 | son nouvel identifiant (`n5_v_<n>` → `v_<n>`) |
| entrée fusionnée | 33 | 99 | l'identifiant de son **survivant** |
| `n5_v_602` (など) | 1 | 3 | **point de grammaire `g_27`**, pour la tâche 11 |
| `n5_v_717` (clé fantôme) | 1 | 3 | **aucune ENTRY** de vocabulaire |
| **Total** | **717** | **2 152** | |

- La règle générale est mécanique : elle se lit dans la table des identifiants de l'assemblage.
- Les deux seules clés sans ENTRY sont déclarées dans un fichier nouveau,
  `reconstruction/a2-04/exemples-correspondance.json` (§8, choix 9).
- `g_27` existe dans `data/n5/grammar.json` ; les 3 phrases contiennent bien など.
- **L'application appartient à la tâche 11** (registre de phrases).

### 5.2. Remappage des références (Q7)

Calculé et vérifié dans l'essai à blanc, en mode complet : **71 références** d'activités et
d'expressions, **71 remappées, 0 perdue** ; la table des identifiants a une ligne par entrée source
(718). **Rien n'est écrit dans `data/`** : c'est le travail de 5.17. Aucun fichier `out/` n'est
produit ni suivi.

## 6. Ce que le lot ne fait pas

- **Aucun tag de lieu** (Q8) : frontière conservée, 5.17 pour `lieux.json`, A2-05 pour l'audit.
- **Aucun balayage global des relations** : seules R1 à R15.
- **Aucune modification** de `data/` (dont `exemples.json`, `missions.json`, `lectures.json`,
  `expressions.json`), des sources figées, des registres, de la conception (aucun addendum).
- **Aucun point déclaré hors 5.16** (§5 du rapport de périmètre) n'est traité.

## 7. Contrôles

**Lancés par Claude Code sur le dépôt local.** Le relecteur ne peut pas les reproduire.

| Contrôle | Résultat |
|---|---|
| Journal contre `8ce0e23` | les 1 569 décisions de la référence sont un préfixe exact du journal ; 44 décisions nouvelles, toutes `lot-26`, `proposed` |
| Lots contre `8ce0e23` | 699 entrées identiques ; 19 rouvertes, dont le champ `before` est **exactement** l'état committé ; aucune autre différence |
| Rejeu des décisions | pour chaque ENTRY rouverte : état validé (`before`) + décisions du lot 26 = état proposé, **rien d'autre** |
| Diff de `data/`, des sources, de `place-tags.json`, de `src/`, de `docs/conception/` | vide |
| Assemblage réel (proposition) | 665 ENTRY, 35 retraits, 19 écartées (« proposition non validée ») ; 0 problème, 0 erreur, 0 attente ; 140 avertissements |
| **Essai à blanc**, partiel et complet (lot 26 supposé validé) | **684 ENTRY, 35 retraits, 0 écartée** ; 0 problème, 0 erreur, 0 attente ; **148 avertissements, aucun nouveau** ; 22 liens, I12 respecté ; 71 références remappées, 0 perdue |
| Suite de tests | **490 tests verts** (481 auparavant ; 9 ajoutés pour le lot 26) |
| Sabotages | **35 attrapés sur 35** (34 à la proposition ; un de plus à la révision, l'ancienne raison de D1613 rétablie, §12.3) ; témoin sain avant et après ; chaque sabotage modifie réellement un fichier ; fichiers restaurés à l'octet |
| `check-layers` | aucune violation |
| `validate-data` | 0 erreur, 8 avertissements connus |
| `verify` | sources conformes au manifeste |
| `git diff --check` | propre |
| `node --check` | sur chaque fichier JS modifié |

**Les sabotages** couvrent : statut d'une ENTRY ou d'une décision ; relation retirée, de type changé,
de cible changée, de cible inexistante, déplacée sur un autre sens, hors registre ; lien miroir sur
une ENTRY non rouverte ; liens écartés par l'arbitrage (« De rien », graphe complet, « Sur ce », degré
de 少し, たくさん) ; furigana et kana de 頼む ; forme, furigana et sens de 煙草 ; autre champ modifié
dans une ENTRY rouverte ; citation historique retirée ; 居る et すぐに touchées ; `lot-26.json` avec une
entrée ; décision validée modifiée ; champ `before` altéré ; décision supprimée ou rattachée à un
autre lot ; table de correspondance ; les deux listes fermées ; et, depuis la révision, l'ancienne
raison de D1613 rétablie.

**Adaptation des tests existants.** Les tests d'état des lots 0 à 25 lisent désormais l'état
**d'avant le lot 26**, reconstitué à partir du champ `before` des réouvertures : ce qu'ils
contrôlaient reste vérifié, sur l'état gardé au journal. Les tests d'assemblage lisent l'**essai à
blanc**. Trois d'entre eux changent d'attente, parce que le lot 26 change la donnée : les relations
des ENTRY des lots 18, 19 et 20 (aucune → celles de R2 à R9), les furigana de 頼む, la forme de 煙草.
Les tests des listes fermées passent de une à deux entrées.

## 8. Dix choix d'exécution et leur état

L'arbitrage du périmètre fixe les types et les sens. Ces choix sont ceux que l'exécution a dû faire.
**État** : tous ont été relus. Les choix 1, 2, 3 et 5, qui touchent le contenu lexical, sont
**arbitrés au §12** : 1, 2 et 3 retenus tels quels, 5 retenu avec une correction de la raison de
D1613. Les six autres, d'exécution, sont retenus sans correction. Le tableau garde la présentation
faite pour la relecture.

| # | Choix | Ce qui est fait | Pourquoi | Autre possibilité |
|---|---|---|---|---|
| 1 | **Côté porteur d'une relation symétrique** | l'ENTRY de plus petit numéro | I12 interdit le doublon mais n'impose aucun côté ; il fallait une règle stable, et le plus petit numéro est déjà celle des fusions (A3) | le côté nommé en premier dans l'arbitrage ; le résultat lexical est le même, seule l'ENTRY rouverte change |
| 2 | **それでは « Sur ce » (`v_417_s3`) non reliée** | deux liens seulement pour それでは ↔ じゃあ | じゃあ n'a que deux sens ; relier `s2` et `s3` de それでは au même `v_413_s2` dirait deux sens distincts équivalents à un seul | relier aussi `v_413_s2` ↔ `v_417_s3`, la nuance de じゃあ allant « jusqu'à la prise de congé » |
| 3 | **少し « Un peu » (`v_509_s2`, degré) non reliée** | deux liens seulement pour 少し ↔ ちょっと | ちょっと n'a pas de sens de degré : son sens 1 est un quantificateur, de faible quantité | relier `v_497_s1` aussi à `v_509_s2` ; l'arbitrage dit « faible quantité/degré » |
| 4 | **R9 : le sens visé s'appelle « Donner (à des plantes, des animaux) »** | lien `similar_to` noté tel qu'arbitré | le libellé réel de `v_608_s2` est plus étroit que « Donner » ; cela confirme `similar_to` plutôt qu'`equivalent_to` | aucune |
| 5 | **Furigana de la graphie 煙草** | ceux de la source, segmentés (煙 → たば, 草 → こ) | l'arbitrage exclut la liste A d'A8 et toute règle nouvelle ; c'est aussi le précédent 平仮名 | les écrire en bloc, ce que l'arbitrage n'autorise pas ; D1294 disait cette segmentation « sans fondement dans la fiche » : **tranché au §12**, segmentation de la source conservée |
| 6 | **`lot-26.json` sans entrée** | le lot existe, nomme la passe, et ne décide aucune entrée | une entrée ne se décide que dans un lot ; les réouvertures restent dans les lots d'origine | aucun fichier de lot, les décisions `lot-26` suffisant |
| 7 | **Les statu quo ne sont pas journalisés** (居る, すぐに, R14 bis, sens écartés) | consignés dans ce rapport, dans les raisons des décisions voisines, et contrôlés par des tests | une décision de journal doit être citée par une entrée, ce qui obligerait à rouvrir des ENTRY que rien ne modifie, contre Q1 | rouvrir ces ENTRY pour y attacher une décision sans effet |
| 8 | **Une décision par lien** | 22 décisions de relation ; はい en a deux sur le même sens | chaque lien arbitré se relit et se révise séparément | une décision par sens |
| 9 | **Un fichier `exemples-correspondance.json`** | deux exceptions seulement (`n5_v_602` → `g_27`, `n5_v_717` → aucune) ; le reste est calculé | « fixer la table » demande un endroit où l'écrire ; le fichier est dans l'espace de reconstruction, non dans `data/` | ne la fixer que dans un test |
| 10 | **Le rapport généré affiche les relations** | une ligne ajoutée à `report.mjs` | sans elle, le rapport d'un lot ne montrait aucune relation ; aucun rapport existant ne change par ce seul ajout | laisser l'outil tel quel |

## 9. Fichiers

| Fichier | Changement |
|---|---|
| `reconstruction/a2-04/journal.json` | 44 décisions ajoutées à la fin (D1570 à D1613) |
| `reconstruction/a2-04/lots/lot-03.json`, `lot-18`, `lot-19`, `lot-20`, `lot-23`, `lot-24` | les 19 ENTRY rouvertes : statut, citations, relations ; lecture de 頼む ; forme, graphie et lecture de 煙草 |
| `reconstruction/a2-04/lots/lot-26.json` | nouveau, sans entrée |
| `reconstruction/a2-04/exemples-correspondance.json` | nouveau |
| `reconstruction/a2-04/rapports/lot-03.md`, `18`, `19`, `20`, `23`, `24`, `26` | régénérés |
| `tools/reconstruction/rules.mjs` | `READING_EXCEPTION_IDS` (+ 頼む), `USUAL_FORM_IDS` (+ 煙草) |
| `tools/reconstruction/report.mjs` | affichage des relations |
| `tests/reconstruction/lot-26.test.js` | nouveau, 9 tests |
| `tests/reconstruction/workspace.test.js`, `rules.test.js`, `mechanical.test.js` | adaptés (§7) |
| `ETAT-ACTUEL.md`, `CLAUDE.md`, `docs/relecture/note-relais.md`, rapport de périmètre (§9) | suivi |

## 10. État de la relecture

**La relecture est faite** (§12) :

1. les 22 liens (§3) et les deux tables de correspondance (§3.1, §3.2) sont retenus, conformes à
   l'arbitrage du périmètre ;
2. les choix 1, 2, 3 et 5 du §8 sont arbitrés (§12.1) ;
3. 頼む et 煙草 (§4) sont retenues ;
4. la seule correction demandée, la raison de D1613, est faite à sa place, sous le même identifiant
   (§12.2), et **vérifiée par ChatGPT** (§12.4).

**Il ne reste aucune correction en attente.** La proposition n'autorise rien par elle-même : la
validation, le commit et le push demandent trois accords distincts et explicites, qui ne sont pas
donnés.

## 11. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport, le rapport de périmètre (arbitrage au §9), le rapport généré | `06-lot-courant-rapports.md` |
| Les 19 ENTRY rouvertes : fiche source, état proposé, toutes leurs décisions | `07-lot-courant-sources.md`, partie 3 |
| Les ENTRY seulement visées, citées par leur mot | `07-lot-courant-sources.md`, partie 2 |
| `lot-26.json` (sans entrée) | `08-lot-courant.json` |
| Les 44 décisions, intégrales, avec le champ `before` de chaque réouverture | `09-journal-lot-courant.json` |
| Le diff contre `8ce0e23`, les contrôles | `10-diff-et-controles.md` |
| `rules.mjs` (listes fermées), le registre A2-REL, le schéma (I12) | `02-conception.md`, `03-references-A2.md` |

## 12. Arbitrage de la proposition, et révision (2026-10-07)

Relecture de ChatGPT sur l'archive `chatgpt-relecture-lot-26.zip`, relayée par l'utilisateur : **avis
favorable, sous une correction rédactionnelle**. **Aucun accord de validation, de commit ni de push
n'est donné.**

### 12.1. Les quatre choix lexicaux du §8

| Choix | Arbitrage |
|---|---|
| 1. Côté porteur d'une relation symétrique | **Conservé** : l'ENTRY de plus petit numéro. Convention stable et reproductible, à documenter comme **convention technique propre au lot 26**, non comme une norme générale. |
| 2. それでは « Sur ce » (`v_417_s3`) | **Non reliée.** じゃあ n'a pas de sens distinct équivalent pour la prise de congé ; son emploi correspondant reste dans la nuance de `v_413_s2`. Un `equivalent_to` de plus serait trop fort. |
| 3. 少し « Un peu », le degré (`v_509_s2`) | **Non reliée** à ちょっと, dont la fiche ne donne pas de sens distinct de degré. Seuls restent `v_497_s1` ↔ `v_509_s1` et `v_497_s2` ↔ `v_509_s3`, en `similar_to`. |
| 5. Furigana de la graphie 煙草 | **Conservés exactement** tels que la fiche source les donne : `<ruby>煙<rt>たば</rt></ruby><ruby>草<rt>こ</rt></ruby>`. Ce maintien **ne valide pas linguistiquement** la segmentation : elle est gardée parce que la source la fournit explicitement, qu'elle recompose bien たばこ (I5), et qu'aucune règle normative ne permet de la remplacer par un bloc. 煙草 n'entre pas dans la liste A fermée d'A8 ; aucune règle de furigana n'est créée. |

**Le reste est retenu sans correction** : les 22 relations R1 à R15 ; 頼む (Q5) ; たばこ forme usuelle
et 煙草 autre graphie (Q6) ; 居る, すぐに et R14 bis inchangés ; la correspondance des exemples et le
remappage, dans leurs frontières ; aucune modification de `data/`.

### 12.2. La révision : D1613, à sa place

**Seule la raison de D1613 est réécrite**, sous le même identifiant. Elle ne dit plus que la
segmentation « n'est pas tranchée ici ».

| | Texte |
|---|---|
| Début, **inchangé** | 煙草 devient l'autre graphie (arbitrage du périmètre de 5.16, Q6), et たばこ, devenue la forme usuelle, quitte la liste des graphies, où D1294 l'avait placée. |
| Fin, **avant** | Les furigana de 煙草 sont ceux de la source, repris tels quels : 煙草 n'entre pas dans la liste fermée des lectures spéciales d'A8, et aucune règle de furigana n'est créée ; leur segmentation, que D1294 disait sans fondement dans la fiche, n'est pas tranchée ici. |
| Fin, **après** | Les furigana de 煙草 sont ceux de la fiche source, conservés exactement (arbitrage de la proposition du lot 26, choix 5) : la source les fournit explicitement, et ils recomposent bien la lecture たばこ (I5). Aucune règle normative ne permet de les remplacer par un bloc : 煙草 n'entre pas dans la liste fermée des lectures spéciales d'A8, et aucune règle de furigana n'est créée. La segmentation de la source est donc conservée pour cette reconstruction, sans généralisation normative ni affirmation linguistique sur sa justesse. |

**Rien d'autre ne change dans les données** : l'identifiant, le statut, la date, le lot, l'entrée, le
champ, la nature, `before` et `after` de D1613 sont identiques ; les 43 autres décisions du lot 26,
les 1 569 décisions validées et tous les fichiers de lot sont identiques.

**Ajustements liés** : un test fixe le sens de la raison révisée ; la convention du côté porteur est
dite propre au lot 26 (§1, et commentaire du test) ; le rapport généré du lot 19, qui recopie les
raisons, est régénéré.

### 12.3. Vérification de la révision

**Lancée par Claude Code sur le dépôt local.** La comparaison est faite contre les 44 décisions de
l'export précédent, celui qui a été relu.

| Contrôle | Résultat |
|---|---|
| Décisions du lot 26, avant / après la révision | 44 et 44, mêmes identifiants dans le même ordre ; **une seule différente, D1613, par son seul champ `reason`** |
| Journal contre `8ce0e23` | D0001 à D1569 toujours un préfixe exact |
| Lots contre `8ce0e23` | 699 entrées identiques ; 19 rouvertes, champ `before` exactement l'état committé |
| Diff de `data/`, des sources, de `src/`, de `docs/conception/` | vide |
| Assemblage réel | 665 ENTRY, 35 retraits, 19 écartées (propositions non validées) ; 0 problème, 0 erreur |
| Essai à blanc, partiel et complet | 684 ENTRY, 35 retraits, 0 écartée ; 0 problème, 0 erreur, 0 attente ; 148 avertissements |
| Suite de tests | 490 tests verts |
| Sabotages | 35 attrapés sur 35 (les 34 précédents, plus l'ancienne raison de D1613 rétablie) ; témoin sain avant et après |
| `check-layers`, `validate-data`, `verify`, `git diff --check` | sans violation ; 0 erreur, 8 avertissements connus ; sources conformes ; propre |

**Point clos** : la segmentation des furigana de la graphie 煙草 n'est plus un point ouvert de la
passe finale.

### 12.4. Vérification de la révision par ChatGPT (2026-10-07)

Faite sur l'archive `chatgpt-relecture-lot-26-revision.zip`, et relayée par l'utilisateur. **La
correction est conforme** : 44 décisions avant et après, mêmes identifiants et même ordre ; D1613
est la seule décision différente, par son seul champ `reason` ; son identifiant, son statut, son lot,
son entrée, son champ, sa nature, `before` et `after` sont identiques ; la nouvelle justification
correspond à l'arbitrage. Le §12 et le test associé sont conformes.

Les traces documentaires devenues obsolètes ont ensuite été corrigées, sans toucher à aucune donnée,
décision, lot, relation ni test : l'en-tête, le titre du §8, le §10 et le compte des sabotages de ce
rapport ; la note de relais ; la doctrine des listes fermées dans `CLAUDE.md`.

**Aucun accord de validation, de commit ni de push n'est donné.**
