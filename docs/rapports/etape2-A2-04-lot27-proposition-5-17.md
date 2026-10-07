# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.17 « Publication » · proposition d'exécution

**Date** : 2026-10-07
**Nature** : **plan d'exécution**, à relire. **Rien n'est exécuté** : aucune publication n'est
lancée, rien n'est écrit dans `data/`, aucun outil ni aucun test n'est modifié, aucune décision
lexicale n'est prise. Ce document dit ce qui sera fait, dans quel ordre, et comment ce sera contrôlé.
**Base** : `ocha-v2` = `origin/ocha-v2` = `b6d72ae` (commit documentaire, poussé le 2026-10-07).
Arbitrage du périmètre rendu le 2026-10-07 (Q1 à Q8), consigné au §9 du rapport de périmètre
(`docs/rapports/etape2-A2-04-lot27-perimetre-5-17.md`).
**Nom du fichier** : préfixe `lot27` pour l'export ; il n'existe aucun lot 27.

**En bref** : une commande `publish` écrit dans `data/` la sortie de l'assembleur complet et remappe
les 71 références ; `validate-data` bascule sur le validateur lexical ; `events.js` reçoit E1 à E4 ;
un test permanent tient `data/` égal à la reconstruction ; un inventaire des 148 avertissements
connus refuse toute régression. **Les neuf choix d'exécution (§10) sont arbitrés (§16)**, dont deux
qui élargissent le chantier au-delà du plan d'A2-03 : les identifiants de vocabulaire cités par les
tests d'apprentissage, et l'idempotence de l'assembleur après la publication. **Le protocole de
l'inventaire a été corrigé** à la relecture (§16.2) : l'inventaire est amorcé avant toute écriture
dans `data/`. **L'exécution n'est pas autorisée.**

---

## 1. Ce que l'arbitrage fixe

| Arbitrage | Conséquence pour l'exécution |
|---|---|
| Q1 | tout est écrit dans l'arbre de travail, contrôlé, exporté ; **un seul commit**, après accord |
| Q2 | une **commande de publication** reproductible, qui refuse d'écrire en cas de problème bloquant ; un **test permanent** ; `data/` est une projection |
| Q3, Q4 | **aucune modification lexicale** : la publication part de l'état validé actuel (lots 0 à 26) |
| Q5 | un **inventaire** des avertissements connus, qui refuse toute régression et permet toute diminution |
| Q6 | `exemples.json`, `concepts/n5.json`, `curriculum/n5.json`, `mapping.json` **ne sont pas touchés** |
| Q7 | les fichiers de l'ancienne application **ne sont pas touchés** |
| Q8 | le vocabulaire de `data/` n'est **jamais** corrigé à la main : la commande est le seul chemin |

## 2. La commande de publication

**Forme** : `node tools/reconstruction/run.mjs publish` (essai, n'écrit rien) et
`node tools/reconstruction/run.mjs publish --write` (écrit dans `data/`).

**Code** : un module nouveau, `tools/reconstruction/publish.mjs`, qui **calcule** la publication en
mémoire, sans accès au disque (une fonction qui reçoit l'assemblage et le contenu des fichiers à
transformer, et rend le contenu des fichiers à écrire). `run.mjs` lit, appelle, affiche, et écrit
seulement avec `--write`. Cette séparation permet de tester la publication sans rien écrire.

### 2.1. Ce qu'elle produit

| Fichier de `data/` | Contenu | Origine |
|---|---|---|
| `n5/vocab.json` | les 682 ENTRY de niveau N5, dans l'ordre des sources | sortie de l'assembleur complet |
| `vocab-hors-jlpt.json` | les 2 ENTRY hors JLPT (`v_718`, `v_719`) | sortie de l'assembleur complet |
| `vocab-retired.json` (**nouveau**) | les 35 identifiants retirés, avec leur successeur ou `null` | sortie de l'assembleur complet |
| `lieux.json` | pour chacun des 4 lieux, `vocab_categories` remplacé **à la même place** par `vocab_tags`, liste d'un tag ; tous les autres champs inchangés | `place-tags.json` (correspondance décidée, registre des tags §5) |
| `n5/missions.json`, `n5/lectures.json`, `expressions.json` | les 71 références remappées ; rien d'autre ne change | table des identifiants de l'assembleur |

### 2.2. Les conditions bloquantes

La commande **n'écrit rien**, et sort en erreur, si l'un de ces contrôles échoue :

1. les sources figées ne sont pas conformes au manifeste ;
2. une entrée de lot ou une décision du journal n'est pas `validated` ;
3. l'assemblage complet signale un problème de décision, une entrée écartée ou une attente ;
4. le validateur lexical rend une erreur ;
5. une référence ne trouve pas son nouvel identifiant, ou vise une ENTRY retirée sans successeur ;
6. un lieu n'a pas de tag dans `place-tags.json`, ou son tag n'est pas de nature `lieu` au registre ;
7. **l'inventaire des avertissements connus est absent** (§5), ou un avertissement du validateur n'y
   figure pas, ou son code n'est pas admis ;
8. après remappage, un ancien identifiant de vocabulaire subsiste dans l'un des trois fichiers de
   références.

**La condition 7 vaut pour toute publication, la première comprise.** `publish --write` n'écrit donc
jamais dans `data/` sans un inventaire présent et satisfait. L'inventaire de la première publication
est créé **avant**, par une étape distincte qui n'écrit pas dans `data/` : l'amorçage (§5.1). Il n'y a
plus de contradiction : au moment d'écrire, l'inventaire existe déjà et a été vérifié.

### 2.3. Les propriétés garanties

- **Reproductible** : deux exécutions sur le même état validé donnent les mêmes octets.
- **Idempotente** : relancée sur un `data/` déjà publié, elle ne change rien (§6).
- **Bornée** : elle n'écrit que les sept fichiers du §2.1. Un test vérifie qu'elle ne touche aucun
  autre chemin.
- **Transparente** : sans `--write`, elle affiche pour chaque fichier ce qui changerait (nombre
  d'entrées, de références remappées, de lieux convertis).

## 3. Les remappages

**Mesure actuelle** : 71 références, toutes écrites comme des chaînes entre guillemets (6 dans
`missions.json`, 64 dans `lectures.json`, 1 dans `expressions.json`) ; aucune occurrence d'un ancien
identifiant de vocabulaire hors d'une telle chaîne dans ces trois fichiers.

**Méthode proposée** : remplacement de **jetons**. Chaque chaîne `"n5_v_<n>"` ou `"hj_v_<n>"` est
remplacée par la chaîne de son nouvel identifiant, lu dans la table de l'assembleur ; une entrée
fusionnée donne l'identifiant de son survivant. Le reste du fichier est conservé à l'octet
(indentation, ordre des clés, fins de ligne).

**Contrôles** :

- avant : l'extracteur de références (`extractReferences`) trouve exactement 71 références ; le
  nombre de jetons remplacés est le même ;
- après : l'extracteur relancé sur le résultat rend exactement la liste remappée attendue ; le
  contenu JSON est identique à l'original, **à ces 71 chaînes près** (comparaison structurelle) ; plus
  aucun ancien identifiant ne subsiste ;
- I19 : chaque référence vise une ENTRY publiée.

**Les quatre fichiers figés** (Q6) ne passent pas par ce remappage ; un test vérifie qu'ils sont
identiques à l'état d'avant.

## 4. La bascule de `validate-data`

Dans `tools/validate-data.mjs`, conformément au plan d'A2-03 (§4, points 1 à 3) :

| Changement | Détail |
|---|---|
| **Appel du validateur lexical** | `validateLexicon` reçoit : les fichiers `n5/vocab.json` (niveau `N5`) et `vocab-hors-jlpt.json` (`hors_jlpt`) ; `retired`, lu dans `vocab-retired.json` ; les dépendances de l'adaptateur, **avec les lieux** ; les références extraites des missions, lectures et expressions. Son rapport est fusionné avec celui de `validate-data` |
| **Retrait** | `checkVocab` ; `checkCategories` et ses avertissements `categorie-isolee` et `categorie-doublon` ; les contrôles de `kanji_list` ; les anciennes valeurs non morphologiques de `group` ; l'index des anciennes catégories |
| **Lieux** | `checkLieux` ne lit plus `vocab_categories` ; le contrôle de `vocab_tags` est celui du validateur lexical (I14) ; le contrôle du préfixe réservé reste |
| **Inchangé** | la grammaire, les missions, les lectures, les expressions, les particules, les registres, les kana ; l'index des identifiants de vocabulaire, qui sert aux références, se construit sur le champ `id`, que le nouveau format garde |

**Résultat attendu, à mesurer à l'essai** : 0 erreur. Les avertissements changent de nature : les
quatre `kanji-inconnu` et les trois avertissements de catégories de l'ancien contrôle disparaissent
avec lui ; restent `lecon-sans-requires` (grammaire, inchangé) et les 148 du validateur lexical.

## 5. L'inventaire des avertissements connus (Q5)

**Fichier nouveau** : `reconstruction/a2-04/avertissements-connus.json`, liste triée de couples
`{ code, where }`, un par avertissement du validateur lexical sur l'état publié. L'emplacement de
chaque avertissement est déterministe (fichier, ENTRY, sens), ce qui permet un inventaire plutôt
qu'un compteur.

**Contenu à la première publication** : 148 lignes (120 `categorie-nulle`, 27 `type-nul`, 1
`kanji-inconnu` pour 醤 dans 醤油). Il est produit une seule fois, par l'amorçage (§5.1), et
committé avec la publication.

### 5.1. L'amorçage, pour la première publication seulement

`publish` calcule toujours la publication et le rapport lexical **entièrement en mémoire**. L'amorçage
est une étape à part, demandée explicitement (`publish --amorcer-avertissements`), qui **n'écrit
jamais dans `data/`**.

| Étape | Ce qui se passe |
|---|---|
| 1 | `publish` calcule en mémoire la publication et le rapport lexical ; rien n'est écrit |
| 2 | l'inventaire étant absent, l'amorçage produit un **candidat**, trié |
| 3 | le candidat n'est accepté que si le rapport contient **exactement** : 0 erreur ; 148 avertissements lexicaux ; les seuls codes `categorie-nulle`, `type-nul` et `kanji-inconnu` ; 120 `categorie-nulle`, 27 `type-nul`, 1 `kanji-inconnu`. Au moindre écart, rien n'est écrit |
| 4 | il écrit alors **uniquement** `reconstruction/a2-04/avertissements-connus.json` |
| 5 | `publish` est relancé **sans `--write`**, en mode normal : il vérifie les 148 avertissements contre l'inventaire |
| 6 | seulement si ce second contrôle passe, `publish --write` écrit les sept fichiers de `data/` |

**Après la première publication, l'amorçage est fermé.** Un inventaire absent est alors toujours une
erreur, et aucun baseline n'est jamais recréé automatiquement. Deux verrous le tiennent :

- l'amorçage refuse de s'exécuter si un inventaire existe déjà ;
- l'amorçage refuse de s'exécuter si `data/` est déjà publié, ce qui se lit à la présence de
  `data/vocab-retired.json`, fichier que seule la publication crée.

Les nombres 148, 120, 27 et 1 ne servent qu'à **accepter l'amorçage** : ils ne deviennent pas un
test permanent, conformément à l'arbitrage de Q5.

### 5.2. La règle permanente

**Tenue par un test permanent**, et par la commande à chaque publication :

| Cas | Effet |
|---|---|
| une erreur du validateur | **échec** |
| un avertissement absent de l'inventaire | **échec** : c'est une régression |
| un code d'avertissement hors de la liste admise (`categorie-nulle`, `type-nul`, `kanji-inconnu`) | **échec** |
| un avertissement de l'inventaire qui n'est plus émis | **accepté** : une diminution reste permise ; le test le signale sans échouer |
| l'inventaire absent | **échec**, hors du seul amorçage initial (§5.1) |

**Ce que l'inventaire ne fait pas** : il ne vérifie pas que chaque avertissement est justifié par une
décision du journal. Ce contrôle, décision par décision, relève d'A2-05.

**Ajouter une ligne à l'inventaire** ne se fait jamais en silence : une ligne nouvelle correspond à
une décision journalisée (`categorie-nulle` ou `type-nul`), et entre dans le même commit qu'elle.

## 6. L'assembleur après la publication

**Le problème** : aujourd'hui, `assemble --complete` et un test du lot 26 extraient les références de
`data/` puis les remappent **depuis les anciens identifiants**. Après la publication, `data/` porte
déjà les nouveaux : ce remappage ne trouverait plus rien, et l'assemblage complet signalerait 71
références « sans nouvel identifiant ». La commande ne serait pas non plus idempotente.

**Proposition, arbitrée (§16)** : `remapReferences` devient idempotent, **sans devenir permissif**.
La règle a trois cas, et trois seulement :

| Référence | Résultat |
|---|---|
| un **ancien identifiant connu** de la table | l'identifiant canonique prévu (celui du survivant, pour une entrée fusionnée) |
| un **identifiant canonique existant** parmi les ENTRY assemblées | conservé tel quel |
| **toute autre** : inconnue, mal formée, ou visant une ENTRY retirée sans successeur | **erreur**, comme aujourd'hui |

Trois endroits suivent :

- `tools/reconstruction/assemble.mjs` (`remapReferences`) ;
- `tools/reconstruction/run.mjs` (commande `assemble --complete`, et la nouvelle `publish`) ;
- `tests/reconstruction/lot-26.test.js` : le test « 71 références remappées » vérifie alors que les
  71 références de `data/` désignent toutes une ENTRY assemblée.

Rien ne change pour les lots ni pour le journal.

## 7. Les événements (E1 à E4)

Dans `src/learning/events.js`, selon le schéma A2-01 :

| Contrôle | Changement |
|---|---|
| E1 | une référence `vocab` a la forme `^v_[1-9][0-9]*$` ; l'ancienne forme (`n5_v_…`, `hj_v_…`) est refusée |
| E2 | `QUESTION_ANSWERED` accepte un champ facultatif `senseId`, de forme `^v_[1-9][0-9]*_s[1-9][0-9]*$` |
| E3 | `senseId` n'est admis que si `target` contient exactement une référence `vocab`, et s'il commence par l'identifiant de cette référence suivi de `_s` ; sinon l'événement est rejeté |
| E4 | `senseId` n'a aucun effet sur l'état, le SRS, les faiblesses, le budget ni le résumé quotidien |

**Tests** : un cas accepté et un cas refusé pour chacun de E1 à E3 ; pour E4, un **test de
non-effet** : rejouer le même scénario avec et sans `senseId` donne exactement le même état.

## 8. Les tests

### 8.1. Nouveaux

| Fichier | Ce qu'il tient |
|---|---|
| `tests/reconstruction/publication.test.js` | **`data/` = la reconstruction** : les trois fichiers de vocabulaire de `data/` sont exactement la sortie de l'assembleur complet ; `lieux.json` porte les tags de `place-tags.json` ; les 71 références désignent une ENTRY publiée ; les quatre fichiers figés sont intacts ; la publication calculée en mémoire est idempotente, bornée à sept fichiers, et refuse chacune des conditions bloquantes du §2.2 |
| le même fichier, ou un voisin | **l'inventaire des avertissements** (§5), sur des jeux d'essai et sur l'état réel : (1) l'amorçage initial n'est accepté que sur le baseline exact, 120 `categorie-nulle`, 27 `type-nul`, 1 `kanji-inconnu`, 0 erreur ; (2) un code inattendu fait échouer ; (3) un 149e avertissement fait échouer ; (4) un avertissement connu qui disparaît est accepté ; (5) un inventaire absent après la première publication fait échouer, et l'amorçage est alors refusé ; (6) l'amorçage n'écrit rien dans `data/` |

### 8.2. Adaptés

| Fichier | Pourquoi |
|---|---|
| `tests/lexicon/adapter.test.js` | le test « aucune bascule avant A2-04 » s'inverse : `validate-data` appelle le validateur lexical et n'a plus `checkVocab` |
| `tests/tools/validate-data.test.js` | ses jeux d'essai sont à l'ancien format ; ils passent au schéma A2-01 ; les tests de `checkVocab`, de `kanji_list` et des catégories disparaissent avec le code |
| `tests/reconstruction/lot-26.test.js` | les références de `data/` sont déjà canoniques (§6) |
| `tests/learning/events.test.js` | E1 à E4 |
| **treize autres fichiers de test** | ils citent d'anciens identifiants de vocabulaire comme données d'essai, qu'E1 refusera (§10, choix 6) |

Les treize : `tests/learning/` (`budget`, `e2e`, `effects-knowledge`, `effects`, `journal`, `record`,
`weakness`, `write-failure`), `tests/store/` (`contract-cases.js`, `contract.test.js`),
`tests/browser/store-contract.js`, `tests/content/` (`catalog`, `integration`). Le changement y est un
renommage d'identifiants d'essai (`n5_v_12` devient `v_12`), sans changement de ce que le test
vérifie ; son étendue exacte se mesurera à l'essai, fichier par fichier.

**Non touchés** : les tests des lots et du journal ; ceux du validateur lexical lui-même ; ceux des
registres ; `tests/tools/export-relecture.test.js`, qui lit les sources figées.

## 9. Les documents

| Document | Changement |
|---|---|
| `docs/conception/README.md`, `docs/conception/GUIDE-CONTENU.md` | les sections de format décrivent le schéma A2-01 ; les mots hors JLPT avec `level: "hors_jlpt"` ; `lieux.json` référence des tags ; le bandeau « seront mis à jour à la publication » est retiré. Réécriture autorisée par l'addendum A3 ; aucun addendum nouveau |
| `reconstruction/a2-04/README.md` | la commande `publish`, l'inventaire des avertissements, la doctrine de Q8 |
| `tools/lexicon-adapter.mjs`, `tools/lexicon/index.mjs`, `tools/reconstruction/assemble.mjs` | commentaires d'en-tête qui disent « jusqu'à la publication » |
| `ETAT-ACTUEL.md`, `ROADMAP.md`, `CLAUDE.md`, `docs/relecture/note-relais.md` | suivi ; l'ancienne application cesse de fonctionner sur `ocha-v2` |
| un rapport de publication | `docs/rapports/etape2-A2-04-lot27-publication-5-17.md` |

## 10. Neuf choix d'exécution et leur état

**État** : les neuf choix sont **arbitrés** (§16.1), tous acceptés ; le choix 4 avec une règle
stricte, le choix 6 sous mesure réelle. Le tableau garde la présentation faite pour la relecture.

| # | Choix | Ce qui est proposé | Pourquoi | Autre possibilité |
|---|---|---|---|---|
| 1 | **Format des fichiers de vocabulaire écrits** | indentation de 2, fins de ligne LF, saut de ligne final : celui que `assemble --write` produit déjà | une seule convention, reproductible à l'octet ; `n5/vocab.json` est de toute façon remplacé en entier | reprendre l'ancien format du fichier (indentation de 4, CRLF) |
| 2 | **Remappage par remplacement de jetons** (§3) | seules les 71 chaînes changent, le reste des trois fichiers est conservé à l'octet | le diff à relire se réduit à 71 lignes | relire et réécrire chaque fichier en JSON, ce qui changerait sa mise en forme |
| 3 | **Emplacement de l'inventaire des avertissements** | `reconstruction/a2-04/avertissements-connus.json` | l'espace de reconstruction est la source éditoriale (Q8) ; `data/` reste une projection | à côté du test, dans `tests/` |
| 4 | **L'assembleur reconnaît les identifiants déjà canoniques** (§6) | `remapReferences` garde une référence qui désigne une ENTRY assemblée | sans cela, `assemble --complete` échoue après la publication, et la commande n'est pas idempotente | figer une copie des missions, lectures et expressions dans les sources de la reconstruction |
| 5 | **`lieux.json` converti par la commande** | `vocab_tags` calculé depuis `place-tags.json`, à la place de `vocab_categories` | la correspondance est déjà une donnée décidée ; la conversion est mécanique et vérifiable | l'éditer une fois à la main |
| 6 | **Les identifiants de vocabulaire des tests d'apprentissage** | renommage des identifiants d'essai dans treize fichiers de test, sans changer ce qu'ils vérifient | E1 refuse l'ancienne forme, et ces tests construisent des événements avec elle | **aucune** si E1 est appliqué ; ce travail n'était pas dans le plan d'A2-03, il en est la conséquence |
| 7 | **Le dossier `out/` n'est pas utilisé** | `publish` écrit directement dans `data/` ; `assemble --write` reste tel quel | un seul chemin vers `data/`, sans fichier intermédiaire à garder en phase | publier en copiant `out/` |
| 8 | **Un seul avertissement non lexical reste** | `lecon-sans-requires` (grammaire), que `validate-data` émet déjà, reste hors de l'inventaire | l'inventaire porte sur le validateur lexical ; cet avertissement ne dépend pas du vocabulaire | l'ajouter à l'inventaire |
| 9 | **Le niveau N4 n'est pas touché** | `data/n4/vocab.json` garde l'ancien format et ses identifiants `n4_v_…` ; `validate-data` continue de l'indexer sans le valider | N4 n'est pas un niveau validé ; aucune activité validée ne le cite | aucune dans 5.17 |

## 11. L'ordre d'exécution, et les arrêts

Sur une **autorisation explicite d'exécuter**, dans l'arbre de travail, sans commit :

1. **Outillage** : `publish.mjs`, la commande `publish` et son amorçage, `remapReferences` (§6), avec
   leurs tests sur des jeux d'essai. `data/` n'est pas touché.
2. **Calcul en mémoire** : `publish` sans `--write`, inventaire absent. Il affiche la publication
   calculée et le rapport lexical, et signale l'inventaire manquant. **Arrêt et compte rendu** si les
   nombres diffèrent de ceux du périmètre (682, 2, 35, 71, 4 lieux), ou si une autre condition
   bloquante se déclenche.
3. **Amorçage de l'inventaire** (§5.1) : accepté seulement sur le baseline exact (0 erreur ; 148
   avertissements ; 120, 27 et 1). Il écrit le seul fichier `avertissements-connus.json`. **`data/`
   n'est pas touché.** Arrêt et compte rendu au moindre écart.
4. **Second contrôle** : `publish` sans `--write`, en mode normal. Il doit vérifier les 148
   avertissements contre l'inventaire, sans aucune condition bloquante. **Arrêt et compte rendu**
   sinon.
5. **Bascule du code** : `validate-data` (§4), `events.js` (§7), leurs tests, les tests d'essai
   renommés (§8.2).
6. **Écriture** : `publish --write`, qui écrit les sept fichiers de `data/`. C'est la seule étape qui
   touche `data/`, et elle ne part que si l'étape 4 est passée.
7. **Contrôles** (§12), puis **documents** (§9) et rapport de publication.
8. **Export** du diff complet pour relecture. **Aucun commit avant l'accord.**

**Arrêt immédiat, sans contournement**, dans trois cas : un test hors de la liste du §8 se met à
échouer ; la bascule de `validate-data` rend une erreur sur les données publiées ; un fichier hors du
§13 devrait être modifié. Dans chacun, je rends compte avant d'aller plus loin.

**Retour arrière, tant que rien n'est committé** : `git checkout -- .` et suppression des fichiers
nouveaux ramènent exactement à `b6d72ae`.

## 12. Les contrôles prévus

| Contrôle | Attendu |
|---|---|
| `publish` sans `--write`, inventaire absent | la publication calculée et ses comptes ; l'inventaire manquant signalé ; rien d'écrit |
| Amorçage | accepté sur 0 erreur et 148 avertissements (120, 27, 1) ; un seul fichier écrit, `avertissements-connus.json` ; `data/` sans diff |
| `publish` sans `--write`, après l'amorçage | les sept fichiers et leurs comptes ; les 148 avertissements retrouvés dans l'inventaire ; aucune condition bloquante |
| `publish --write`, puis `publish` de nouveau | la seconde exécution ne change aucun octet |
| `data/` contre la sortie de l'assembleur | identiques (test permanent) |
| Diff de `data/` | sept fichiers, et eux seuls ; dans les trois fichiers de références, 71 lignes changées ; dans `lieux.json`, les seuls champs `vocab_categories` |
| Les quatre fichiers figés, les sources de la reconstruction, les lots, le journal | aucun diff |
| `validate-data` sur `data/` | 0 erreur ; avertissements : ceux de l'inventaire, et `lecon-sans-requires` |
| `run.mjs assemble` et `assemble --complete` | 684 ENTRY, 35 retraits, 0 écartée, 0 problème, 0 erreur, 0 attente |
| Suite de tests | verte ; le nombre de tests est donné avant et après, avec le détail des ajouts et des retraits |
| Sabotages, témoin sain d'abord | une ENTRY de `data/` modifiée à la main ; une ENTRY retirée de `data/` ; `vocab-retired.json` altéré ; une référence remise à l'ancien identifiant ; une référence vers une ENTRY retirée ; une référence inconnue, ni ancienne ni canonique ; un tag de lieu inconnu ; un avertissement nouveau ; un code d'avertissement inattendu ; l'inventaire supprimé après la publication ; une erreur lexicale ; un fichier figé modifié ; E1, E2, E3 et E4 chacun neutralisé |
| `check-layers`, `run.mjs verify`, `git diff --check`, `node --check` | sans violation ; sources conformes ; propre |

## 13. Les fichiers

**Modifiés** :

| Fichier | Objet |
|---|---|
| `data/n5/vocab.json`, `data/vocab-hors-jlpt.json`, `data/lieux.json` | §2.1 |
| `data/n5/missions.json`, `data/n5/lectures.json`, `data/expressions.json` | §3 |
| `tools/validate-data.mjs` | §4 |
| `tools/reconstruction/run.mjs`, `tools/reconstruction/assemble.mjs` | §2, §6 |
| `tools/lexicon-adapter.mjs`, `tools/lexicon/index.mjs` | commentaires seulement |
| `src/learning/events.js` | §7 |
| `tests/lexicon/adapter.test.js`, `tests/tools/validate-data.test.js`, `tests/reconstruction/lot-26.test.js`, `tests/learning/events.test.js`, et les treize fichiers du §8.2 | §8.2 |
| `docs/conception/README.md`, `docs/conception/GUIDE-CONTENU.md`, `reconstruction/a2-04/README.md` | §9 |
| `ETAT-ACTUEL.md`, `ROADMAP.md`, `CLAUDE.md`, `docs/relecture/note-relais.md` | suivi |

**Nouveaux** : `data/vocab-retired.json` ; `tools/reconstruction/publish.mjs` ;
`reconstruction/a2-04/avertissements-connus.json` ; `tests/reconstruction/publication.test.js` ;
`docs/rapports/etape2-A2-04-lot27-publication-5-17.md`.

**Non touchés** : `reconstruction/a2-04/sources/`, `lots/`, `journal.json`, `place-tags.json`,
`exemples-correspondance.json` ; `data/n5/exemples.json`, `data/concepts/n5.json`,
`data/curriculum/n5.json`, `data/mapping.json` ; `data/n5/grammar.json`, `data/n5/particles.json`,
`data/n5/kanji.json`, les registres, `data/n4/` ; `tools/lexicon/` hors commentaire ; les autres
modules de `src/` ; les fichiers de l'ancienne application ; les snapshots et addenda.

## 14. État de la relecture, et ce qui est attendu

**Fait** (§16) : le plan est relu ; les neuf choix du §10 sont arbitrés ; un blocage a été relevé
dans le protocole de l'inventaire, et corrigé (§2.2, §5, §11).

**Attendu** :

1. **Vérifier la correction du protocole** : l'inventaire est amorcé avant toute écriture dans
   `data/` (§5.1) ; la condition 7 vaut pour toute publication (§2.2) ; l'ordre d'exécution le
   reflète (§11) ; les six cas de test demandés sont prévus (§8.1).
2. **Dire si tu autorises l'exécution**, dans l'arbre de travail, sans commit.

**Cette proposition n'autorise rien.** L'exécution, puis le commit de publication, puis le push
demandent chacun un accord explicite et distinct. Le commit documentaire `b6d72ae` est poussé ;
`ocha-v2` et `origin/ocha-v2` sont à `b6d72ae`.

## 15. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport, le rapport de périmètre (arbitrage au §9) | `06-lot-courant-rapports.md` |
| `rules.mjs`, `decisions.mjs`, le schéma A2-01 (E1 à E4, I14, I19, §9), le registre des tags | `02-conception.md` |
| Les addenda A3, A4, A5, A6 | `04-addenda.md` |
| `ETAT-ACTUEL.md`, `ROADMAP.md`, `CLAUDE.md` | `01-gouvernance.md` |
| L'état réel, la note de relais | `05-relais.md` |
| Le diff contre `b6d72ae`, les contrôles | `10-diff-et-controles.md` |

**Non joints** : `tools/validate-data.mjs`, `tools/lexicon-adapter.mjs`, `tools/reconstruction/run.mjs`,
`assemble.mjs` et `src/learning/events.js`, que le plan décrit sans les reproduire. Ils peuvent être
fournis sur demande.

## 16. Arbitrage de la proposition, et correction (2026-10-07)

Relecture de ChatGPT sur l'archive `chatgpt-relecture-5-17-proposition.zip`, relayée par
l'utilisateur. **L'exécution complète de 5.17 et toute écriture dans `data/` restent non autorisées.**
Aucun commit ni push supplémentaire n'est autorisé.

### 16.1. Les neuf choix du §10

| # | Choix | Arbitrage |
|---|---|---|
| 1 | Format des fichiers de vocabulaire | **Accepté** : indentation de 2 espaces, LF, saut de ligne final |
| 2 | Remappage par remplacement de jetons | **Accepté** : seules les 71 chaînes changent dans les trois fichiers concernés ; **comparaison structurelle obligatoire** |
| 3 | Inventaire dans `reconstruction/a2-04/avertissements-connus.json` | **Accepté** |
| 4 | Assembleur reconnaissant les identifiants déjà canoniques | **Accepté**, avec une règle stricte : ancien identifiant connu → canonique ; identifiant canonique existant dans les ENTRY assemblées → conservé ; **tout autre identifiant → erreur**. Le remappeur ne devient pas permissif envers des références inconnues. Modification de `assemble.mjs`, de `run.mjs` et du test concerné autorisée dans cette limite |
| 5 | Conversion de `data/lieux.json` par `publish`, depuis `place-tags.json` | **Acceptée** |
| 6 | Migration des identifiants des fixtures de tests | **Acceptée sous mesure réelle** : remplacement mécanique seulement ; aucun changement de scénario ; aucune assertion modifiée pour faire passer un test. Le chiffre de treize fichiers reste prévisionnel : **l'essai fournira la liste exacte des fichiers touchés, et leurs diffs** |
| 7 | Pas de dossier `out/` dans le chemin de publication | **Accepté** : `publish` est l'unique chemin de publication vers `data/` |
| 8 | `lecon-sans-requires` hors de l'inventaire lexical | **Accepté** |
| 9 | N4 entièrement hors de 5.17 | **Accepté** |

### 16.2. Le blocage relevé, et sa correction

**Le blocage** : le §2.2 faisait échouer `publish` si un avertissement lexical n'était pas dans
l'inventaire, alors que le §11 ne créait cet inventaire qu'après `publish --write`. La première
publication ne pouvait donc pas satisfaire son propre contrôle.

**Le protocole corrigé**, tel qu'arbitré :

1. `publish` calcule la publication et le rapport lexical entièrement en mémoire, sans écrire `data/` ;
2. pour la première publication uniquement, si `avertissements-connus.json` n'existe pas, un candidat
   d'amorçage est produit, trié ;
3. l'amorçage n'est accepté que si le rapport contient : 0 erreur ; exactement 148 avertissements
   lexicaux ; uniquement `categorie-nulle`, `type-nul`, `kanji-inconnu` ; exactement 120
   `categorie-nulle`, 27 `type-nul`, 1 `kanji-inconnu` ;
4. il écrit alors uniquement `reconstruction/a2-04/avertissements-connus.json`, pas encore `data/` ;
5. `publish` est relancé sans `--write`, en mode normal : il vérifie les 148 avertissements contre
   l'inventaire ;
6. seulement si ce second contrôle passe, `publish --write` écrit les sept fichiers de `data/` ;
7. après cet amorçage initial, un inventaire absent est toujours une erreur : aucun baseline n'est
   recréé automatiquement lors des publications futures.

**Où le rapport a changé** :

| Section | Avant | Après |
|---|---|---|
| §2.2, condition 7 | un avertissement absent de l'inventaire bloque | l'inventaire **absent** bloque aussi, pour toute publication, la première comprise ; l'amorçage est une étape distincte, qui n'écrit pas dans `data/` |
| §5 | l'inventaire était « produit une fois, par la commande » à la publication | §5.1, l'amorçage en six étapes et ses deux verrous ; §5.2, la règle permanente, où l'inventaire absent fait échouer |
| §6 | « toute autre est signalée » | la règle à trois cas du choix 4, écrite en tableau |
| §8.1 | « l'inventaire des avertissements » | les six cas de test demandés |
| §11 | écriture, **puis** génération de l'inventaire | calcul en mémoire, amorçage, second contrôle, bascule du code, **puis** écriture : huit étapes |
| §12 | un contrôle de `publish` avant écriture | trois : inventaire absent, amorçage, second contrôle ; trois sabotages ajoutés |

**Un point de mise en œuvre, à vérifier** : pour tenir le point 7, l'amorçage est une option explicite
de la commande (`publish --amorcer-avertissements`), et il se refuse dans deux cas : un inventaire
existe déjà, ou `data/` est déjà publié. Ce second cas se lit à la présence de
`data/vocab-retired.json`, fichier que seule la publication crée. Ce choix de mise en œuvre n'était
pas dans l'arbitrage ; il en est la traduction, et se discute.

**Les six cas de test demandés** sont inscrits au §8.1 : amorçage accepté sur le seul baseline exact ;
code inattendu ; 149e avertissement ; avertissement connu disparu ; inventaire absent après la
première publication ; aucune écriture dans `data/` pendant l'amorçage.
