# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.17 « Publication » · périmètre

**Date** : 2026-10-07
**Nature** : **recensement et proposition de périmètre**, à arbitrer. **Aucune modification** : aucune
donnée de `data/`, aucun outil, aucun test, aucun fichier de lot, aucune décision de journal, aucune
décision lexicale. Rien n'est committé ni poussé. Les mesures citées ont été prises en lecture seule,
l'assemblage étant calculé en mémoire, sans écriture.
**Nom du fichier** : il porte le préfixe `lot27` pour que l'export de relecture le regroupe, comme le
rapport de périmètre de 5.16 portait `lot26`. **Il n'existe aucun lot 27**, et 5.17 n'est pas un
lot : c'est une publication. Son véhicule est une question à arbitrer (§6, Q1).

**État réel vérifié avant ce rapport** : `ocha-v2` = `origin/ocha-v2` = `9f3dc2b` ; lots 0 à 26
validés ; assemblage réel, partiel et complet : **684 ENTRY, 35 retraits, 0 entrée écartée**, 0
problème, 0 erreur, 0 attente, 148 avertissements ; 1 613 décisions validées (D0001 à D1613), aucune
proposition en cours ; 490 tests verts. **Le travail 5.16 est terminé.**

---

## 1. Méthode

1. **Les sources normatives de 5.17** sont relevées : le plan de bascule du rapport final d'A2-03
   (`docs/rapports/etape2-A2-03.md`, §4), le contenu de 5.17 dans `ROADMAP.md`, le plan de l'étape 2
   dans `ETAT-ACTUEL.md` (ligne 8), le schéma A2-01 (contrôles E1 à E4, §9 sur les identifiants
   retirés), les addenda A3 et A4 (identifiants immuables après la première publication), le
   registre des tags (§5, lieux).
2. **Toutes les mentions** de « 5.17 », « publication » et « bascule » sont relevées par recherche
   dans la gouvernance, la conception, les outils et le code.
3. **Les points ouverts** d'`ETAT-ACTUEL.md` qui se réservent « avant 5.17 » ou « à la publication »
   sont relus un à un.
4. **L'état réel** est mesuré par script, en lecture seule : ce que l'assembleur produirait, ce que
   `data/` contient aujourd'hui, qui lit ces fichiers, quelles références citent encore d'anciens
   identifiants.
5. **Rien n'est décidé ici** : pour chaque élément, ce rapport dit si une décision existe déjà, à
   appliquer, ou si un arbitrage est nécessaire.

## 2. Les entrées concernées

**La publication ne décide aucune entrée.** Elle écrit dans `data/` ce que les lots 0 à 26 ont
validé. Aucune fiche source n'est donc à relire pour le périmètre, à une exception près, liée à une
question lexicale ouverte (Q4) : `n5_v_33` (家), dont la fiche complète est dans
`07-lot-courant-sources.md`.

La question Q3 porte sur 64 ENTRY (les mots dont la forme contient du katakana) ; elles ne sont pas
jointes une à une, la question étant de règle et non de fiche. Exemples : コート (こーと), シャツ
(しゃつ), スカート (すかーと), ズボン (ずぼん), ネクタイ (ねくたい), ボタン (ぼたん).

## 3. Ce que les normes mettent dans 5.17

| Source | Ce qu'elle dit |
|---|---|
| `ETAT-ACTUEL.md`, plan de l'étape 2, ligne 8 | « une seule opération : vocabulaire canonique, validateur activé, `events.js` (E1 à E4) ; l'ancienne app cesse de fonctionner sur `ocha-v2` » |
| `docs/rapports/etape2-A2-03.md`, §4 | « Plan de bascule, pour le commit de publication d'A2-04. **Une seule opération, dans le même commit que les données reconstruites** », en six points (repris au §4.1) |
| `ROADMAP.md`, contenu de 5.17 | les six mêmes points ; « rien de nouveau ici » |
| `schema-A2-01.md`, §9 et table des invariants | I1 à I17, I19, A1 à A3, N1 « activés sur `data/` à la publication d'A2-04 » ; E1 à E4 « publication d'A2-04 » ; `vocab-retired.json` contient au moins `v_717` à la première publication |
| Addendum A3 (L2), addendum A4 (A4-3) | l'identifiant d'une ENTRY est **immuable et jamais réattribué à partir de la première publication** |
| `registre-des-tags.md`, §5 | la correspondance lieu → tag est une donnée décidée ; le remplacement de `vocab_categories` a lieu « à la publication d'A2-04 » |
| Arbitrage du périmètre de 5.16 (Q7, Q8) | 5.17 seulement écrit les références remappées dans `data/` ; `lieux.json` relève de 5.17 |
| `ETAT-ACTUEL.md`, table des décisions (2026-10-02) | « `exemples.json`, `concepts/n5.json`, `curriculum/n5.json` et `mapping.json` sont des sources figées : non remappés, lus avec les tables de correspondance » ; « l'ancienne application cessera de fonctionner sur `ocha-v2` […] aucune compatibilité n'est maintenue ; elle reste intacte sur `Modularisation` » |

**Constat** : le contenu de 5.17 est déjà largement décidé. Ce qui ne l'est pas tient à trois
choses : **comment relire** une opération que le plan veut en un seul commit ; **deux questions
lexicales** que les documents réservent explicitement « avant 5.17 » ; et **ce qui devient la
référence après la publication**.

## 4. Inventaire

**Lecture de la colonne « Nature »** : **appliquer** quand la décision existe déjà et que l'opération
est mécanique ; **arbitrer** quand un choix reste à faire avant toute modification.

### 4.1. Décisions déjà prises, à appliquer

| # | Élément | Source exacte | État actuel (mesuré) | Fichiers concernés | Nature |
|---|---|---|---|---|---|
| P1 | **Vocabulaire N5 canonique** | A2-03 §4, point 1 ; schéma A2-01 | `data/n5/vocab.json` : **716 entrées à l'ancien format** (`type`, `category`, `meanings`…), identique à la source figée ; l'assembleur produit **682 ENTRY** au schéma A2-01 | `data/n5/vocab.json` | **appliquer** (sortie de l'assembleur) |
| P2 | **Mots hors JLPT** | A2-03 §4, point 1 ; addendum A3 | `data/vocab-hors-jlpt.json` : 2 entrées à l'ancien format (`hj_v_1`, `hj_v_2`) ; l'assembleur produit **2 ENTRY** (`v_718`, `v_719`, `level: "hors_jlpt"`) | `data/vocab-hors-jlpt.json` | **appliquer** |
| P3 | **Identifiants retirés** | schéma A2-01, §9 ; A2-03 §4, point 1 | `data/vocab-retired.json` **n'existe pas** ; l'assembleur calcule **35 retraits** (33 fusions, `v_717` et `v_602` sans successeur) | `data/vocab-retired.json` (**nouveau**) | **appliquer** |
| P4 | **Bascule du validateur** | A2-03 §4, points 1 et 2 | `validate-data` n'appelle pas le validateur lexical et garde `checkVocab` ; un test le vérifie (`tests/lexicon/adapter.test.js`) | `tools/validate-data.mjs` : appel de `validateLexicon` (fichiers, `retired`, dépendances avec les lieux, références extraites) ; retrait de `checkVocab`, des avertissements `categorie-isolee` et `categorie-doublon`, des contrôles de `kanji_list`, des anciennes valeurs de `group` | **appliquer** |
| P5 | **Lieux** | A2-03 §4, point 3 ; registre des tags, §5 ; `place-tags.json` | `data/lieux.json` : 4 lieux, chacun avec `vocab_categories` (konbini : 2 catégories ; gare : 3 ; restaurant : 1 ; hôtel : 2), aucun `vocab_tags` ; la correspondance décidée donne un tag par lieu (`lieu_konbini`, `lieu_gare`, `lieu_restaurant`, `lieu_hotel`) ; dans le lexique assemblé, **51 ENTRY et 3 sens** portent un tag de lieu (konbini 16, restaurant 17 et 2 sens, gare 10, hôtel 8 et 1 sens) | `data/lieux.json` ; `checkLieux` dans `tools/validate-data.mjs` | **appliquer** |
| P6 | **Références remappées** | A2-03 §4, point 4 ; arbitrage 5.16, Q7 | **71 références** citent d'anciens identifiants : 6 dans `data/n5/missions.json`, 64 dans `data/n5/lectures.json`, 1 dans `data/expressions.json` ; table vérifiée en 5.16 : 71 remappées, 0 perdue | ces trois fichiers | **appliquer** (table des identifiants de l'assembleur) |
| P7 | **Événements** | schéma A2-01 (E1 à E4) ; A2-03 §4, point 5 | `src/learning/events.js` accepte pour `vocab` la forme `^(n[1-5]\|hj)_v_.+$` ; `senseId` n'existe pas | `src/learning/events.js` et ses tests : E1 (identifiant `^v_[1-9][0-9]*$`), E2 (`senseId` facultatif dans `QUESTION_ANSWERED`), E3 (admis seulement avec une seule référence `vocab`, et préfixé par elle), E4 (aucun effet sur l'état, le SRS, les faiblesses, le budget, le résumé) | **appliquer** |
| P8 | **Documents de format** | A2-03 §4, point 6 ; addendum A3 (table des documents) | `docs/conception/README.md` et `GUIDE-CONTENU.md` portent un bandeau « seront mis à jour à la publication » | les sections de format de ces deux documents ; `ETAT-ACTUEL.md` (l'ancienne application cesse de fonctionner sur `ocha-v2`) | **appliquer** ; la réécriture est déjà autorisée par l'addendum A3, sans addendum nouveau |
| P9 | **Tests liés à l'ancien format** | conséquence de P1 à P7 | le test « aucune bascule avant A2-04 » exige l'état d'aujourd'hui ; `tests/tools/validate-data.test.js` construit ses jeux d'essai à l'ancien format ; `tests/helpers/content-data.mjs` lit le vocabulaire publié | ces tests, et ceux d'`events.js` | **appliquer** : le test de verrou s'inverse, les jeux d'essai suivent le nouveau format |

### 4.2. Constats, déjà tranchés, à ne pas rouvrir

| # | Constat | Source | Conséquence pour 5.17 |
|---|---|---|---|
| C1 | **Quatre fichiers figés ne sont pas remappés** : `exemples.json`, `concepts/n5.json`, `curriculum/n5.json`, `mapping.json` | décision du 2026-10-02 ; arbitrage 5.16, Q3 (la tâche 11 applique la correspondance d'`exemples.json`) | `data/n5/exemples.json` garde ses 717 clés à l'ancienne forme ; `data/curriculum/n5.json` cite six anciens identifiants de vocabulaire, sur six lignes (numéros 22, 32, 66, 117, 127 et 156, tous gardés, aucun fusionné) ; `validate-data` ignore déjà `mapping.json` et `curriculum/n5.json`, et ne fait que charger `exemples.json`. **À confirmer** (Q6) |
| C2 | **L'ancienne application cesse de fonctionner sur `ocha-v2`** | décision du 2026-10-02 ; plan, ligne 8 | aucune compatibilité à maintenir ; elle reste intacte sur la branche `Modularisation` ; une trentaine de ses fichiers sont suivis à la racine (`index.html`, `sw.js`, `js/`…) |
| C3 | **Le niveau N4 n'est pas validé** | `VALIDATED_LEVELS = ['n5']` | `data/n4/vocab.json` reste à l'ancien format, hors périmètre |
| C4 | **Les sources figées de la reconstruction ne bougent pas** | `reconstruction/a2-04/README.md` (« conservé au moins jusqu'à l'audit A2-05 ») | `reconstruction/a2-04/sources/` reste intact ; après la publication, `data/n5/vocab.json` ne sera plus identique à sa copie figée, ce qui est le but |
| C5 | **Les identifiants deviennent immuables** | addendum A3 (L2), addendum A4 (A4-3) | 5.17 est la **première publication** : après elle, un identifiant `v_<n>` ne change plus et n'est jamais réattribué. C'est le caractère peu réversible de l'opération |

### 4.3. Points à arbitrer avant toute modification

| # | Élément | Source exacte | État actuel (mesuré) | Pourquoi 5.17 | Nature |
|---|---|---|---|---|---|
| A1 | **Le véhicule** | A2-03 §4 (« une seule opération, dans le même commit ») ; protocole des lots (`CLAUDE.md` §4) | le protocole proposition → relecture → validation repose sur le statut `proposed` / `validated`, qui n'existe pas pour `data/` | le plan impose un seul commit ; la relecture doit donc porter sur un état **non committé** | **arbitrer** (Q1) |
| A2 | **L'origine des fichiers publiés** | `run.mjs` (`assemble --complete --write` écrit dans `reconstruction/a2-04/out/`) ; `assemble.mjs` (« la sortie n'est jamais écrite dans `data/` : la publication est une opération à part ») | aucune commande n'écrit dans `data/` ; `out/` n'existe pas et n'est pas suivi | il faut dire **comment** les trois fichiers de vocabulaire arrivent dans `data/`, et ce qui garantit qu'ils sont bien la sortie des lots validés | **arbitrer** (Q2) |
| A3 | **Lectures des mots en katakana** | `ETAT-ACTUEL.md`, points ouverts : « point transversal, **à trancher globalement avant 5.17** […] faut-il normaliser les lectures des emprunts en katakana ? Si la règle change, elle s'applique uniformément à tout le corpus concerné, jamais lot par lot. Statu quo pendant les lots » ; `CLAUDE.md` §4 (« statu quo mécanique pendant les lots ») | **64 ENTRY** ont une forme en katakana ; **toutes** ont une lecture en hiragana avec trait d'allongement (コート → こーと) ; aucune n'a de lecture en katakana ; c'est valide pour le schéma | réservé explicitement **avant 5.17** | **arbitrer** (Q3) ; question lexicale, **non décidée ici** |
| A4 | **Lecture うち de 家** | `ETAT-ACTUEL.md`, points ouverts et décision du 2026-10-02 : « un éventuel enrichissement des lectures manquantes passera par une procédure globale **décidée avant 5.17** » ; D0223 | 家 (`v_33`) a une seule lecture, いえ ; うち est dans la nuance ; 6 ENTRY du corpus ont plusieurs lectures | réservé explicitement **avant 5.17** | **arbitrer** (Q4) ; question lexicale, **non décidée ici** |
| A5 | **Avertissements sur `data/`** | A2-03 §4, point 1 (« son rapport est fusionné avec celui de `validate-data` ») ; addenda A5 et A6 | `validate-data` rend aujourd'hui **0 erreur, 8 avertissements** ; le validateur lexical en rendra **148** sur le vocabulaire publié : 120 `categorie-nulle`, 27 `type-nul`, tous justifiés par une décision du journal, et 1 `kanji-inconnu` (醤, dans 醤油, absent des kanji connus) | les justifications sont dans le journal de la reconstruction, pas dans `data/` | **arbitrer** (Q5) |
| A6 | **Fichiers figés** | C1 | décision existante, mais prise avant que `curriculum/n5.json` soit relevé comme citant du vocabulaire | confirmation utile avant une opération peu réversible | **arbitrer** (Q6, confirmation) |
| A7 | **Fichiers de l'ancienne application** | C2 | une trentaine de fichiers suivis à la racine, que la publication casse sans les toucher | le plan dit qu'elle « cesse de fonctionner », non qu'elle est retirée | **arbitrer** (Q7) |
| A8 | **Corriger après la publication** | C5 ; `reconstruction/a2-04/README.md` | l'espace de reconstruction est conservé « au moins jusqu'à l'audit A2-05 », lequel vient **après** la publication (plan, ligne 9) et doit pouvoir corriger | il faut dire d'où part une correction une fois `data/` publié | **arbitrer** (Q8) |

## 5. Hors de 5.17, relevé pour mémoire

Ces points sont réservés par les documents **à d'autres chantiers** ; ils ne sont pas proposés pour
5.17.

| Point | Source | Chantier |
|---|---|---|
| Application de la table de correspondance d'`exemples.json` (682 clés renommées, 33 fusionnées, など vers `g_27`, clé fantôme) ; défauts des exemples | arbitrage 5.16, Q2 et Q3 ; points ouverts | registre de phrases (tâche 11) |
| N2, un sens sans phrase | A2-03, table des invariants | registre de phrases (tâche 11) |
| Cohérence globale des tags de lieu ; tags `lieu_restaurant` du lot 0 jugés trop larges | arbitrage 5.16, Q8 ; points ouverts | audit A2-05 |
| Catégories nulles, deixis temporelle, メートル et キロ, extensions en nuance, また (sens 2) | points ouverts | audit A2-05 |
| Verbes en する (散歩する, 勉強する…) : règle de fusion cas par cas | points ouverts | toutes les entrées sont décidées ; aucun cas en attente |
| Lecture よい de いい ; « adjectif en na (et nom) » ; affixes | points ouverts | chantiers de modèle (schéma), hors A2-04 |
| Cinq clés du dictionnaire de kanji qui sont des mots (山羊, 生活, 措置, 継続, 迅速) | A2-03, §6 | tâche de données, à part |
| `data/n4/vocab.json`, à l'ancien format | C3 | reconstruction de N4, non planifiée ici |
| Graphe (G2 à G9), branchement sur `learning` | plan, ligne 10 | après A2-05 |
| Bascule de `main` | `REGLES-CONSTRUCTION.md` | étape 7 seulement |

## 6. Ce qui est à arbitrer

| # | Question | Options | Proposition de Claude |
|---|---|---|---|
| Q1 | **Le véhicule** : comment relire une opération qui doit tenir en un seul commit | (a) **essai dans l'arbre de travail**, non committé : tous les fichiers sont écrits, les contrôles lancés, l'export montre le diff complet ; un seul commit après ton accord ; (b) une branche de travail, fusionnée ensuite ; (c) plusieurs commits successifs, contre le plan | **(a)**, la plus proche du plan et de la pratique des lots : la relecture porte sur le diff, et rien n'est committé avant l'accord |
| Q2 | **L'origine des fichiers de vocabulaire publiés** | (a) une **commande de publication** dans `tools/reconstruction/` écrit dans `data/` la sortie de l'assembleur complet, et refuse d'écrire au moindre problème ; un **test permanent** vérifie ensuite que `data/` est exactement cette sortie ; (b) copie de `out/` à la main, sans test ; (c) le test seul, sans commande | **(a)** : la publication reste reproductible, et aucune correction à la main de `data/` ne passe inaperçue |
| Q3 | **Lectures des 64 mots en katakana** : aujourd'hui en hiragana (コート → こーと) | (a) **statu quo** : lecture en hiragana, comme la source ; (b) lecture en katakana pour ces 64 ENTRY, par une règle uniforme, journalisée ; (c) autre règle | **aucune proposition sur le fond** : la question est lexicale et t'est réservée. À noter seulement : (b) demanderait une décision de règle avant la publication, une modification de la couche mécanique et un contrôle sur les 64 ENTRY ; (a) ne demande rien |
| Q4 | **Lecture うち de 家**, et plus largement l'enrichissement des lectures manquantes | (a) **aucun enrichissement** avant la publication : 家 garde いえ seule, うち reste en nuance ; (b) une procédure globale d'enrichissement, à définir, avant la publication ; (c) le seul cas de 家, par une réouverture | **aucune proposition sur le fond**. À noter : les documents exigent une **procédure globale** si l'on enrichit, ce qui exclut (c) tel quel ; une lecture ajoutée après la publication ne change aucun identifiant |
| Q5 | **Les 148 avertissements du validateur lexical dans `validate-data`** | (a) les afficher tels quels : 0 erreur, 8 + 148 avertissements, le journal de la reconstruction faisant foi pour les 147 justifiés ; (b) un contrôle qui exige, pour chaque `categorie-nulle` et `type-nul`, une décision du journal, et ne laisse en avertissement que ce qui n'est pas justifié ; (c) corriger avant de publier | **(a)** pour la publication, en fixant le nombre par un test ; (b) relèverait de l'audit A2-05. Pour 醤 : avertissement laissé, signalé à la tâche de données du dictionnaire |
| Q6 | **Les quatre fichiers figés** : `exemples.json`, `concepts/n5.json`, `curriculum/n5.json`, `mapping.json` | (a) **confirmer** qu'ils ne sont pas remappés, comme décidé le 2026-10-02 ; (b) remapper les six lignes de `curriculum/n5.json` | **(a)** : c'est la décision existante ; les six identifiants cités sont tous gardés, sans fusion |
| Q7 | **Les fichiers de l'ancienne application** à la racine | (a) **ne rien toucher** : ils cessent de fonctionner, et restent jusqu'à l'étape 7 ; (b) les retirer de `ocha-v2` | **(a)** : le plan ne demande pas leur retrait, et la bascule de `main` n'a lieu qu'à l'étape 7 |
| Q8 | **Corriger après la publication** : d'où part une correction lexicale une fois `data/` publié | (a) l'**espace de reconstruction reste la source** : une correction passe par une décision journalisée, puis par une nouvelle publication mécanique ; `data/` n'est jamais édité à la main ; (b) `data/` devient la source, l'espace de reconstruction est archivé | **(a)**, au moins jusqu'à la fin de l'audit A2-05, qui doit pouvoir corriger ; à réexaminer ensuite |

## 7. Ce que l'arbitrage déclenchera, et ce qu'il ne fera pas

1. **Après l'arbitrage du périmètre**, et sur une autorisation distincte : Claude prépare la
   proposition de la publication selon le véhicule arbitré (Q1). Si (a) est retenu : tous les
   fichiers sont écrits dans l'arbre de travail, sans commit ; l'export en montre le diff complet.
2. **Si Q3 ou Q4 demandent une modification lexicale**, elle se fait **avant** la publication, par
   le protocole normal (périmètre, proposition, validation), dans l'espace de reconstruction. La
   publication ne part que d'un état entièrement validé.
3. **Aucun point du §5** n'est traité en 5.17.
4. **L'arbitrage n'autorise ni l'exécution, ni le commit, ni le push.**

**Fichiers susceptibles d'être modifiés par 5.17**, si les propositions sont suivies :

| Fichier | Changement |
|---|---|
| `data/n5/vocab.json`, `data/vocab-hors-jlpt.json` | remplacés par la sortie de l'assembleur (P1, P2) |
| `data/vocab-retired.json` | **nouveau** (P3) |
| `data/lieux.json` | `vocab_categories` → `vocab_tags` (P5) |
| `data/n5/missions.json`, `data/n5/lectures.json`, `data/expressions.json` | 71 références remappées (P6) |
| `tools/validate-data.mjs` | bascule du validateur, `checkLieux` (P4, P5) |
| `tools/reconstruction/run.mjs`, et peut-être un module voisin | commande de publication (Q2) |
| `src/learning/events.js` | E1 à E4 (P7) |
| `tests/tools/validate-data.test.js`, `tests/lexicon/adapter.test.js`, tests d'`events.js`, tests de contenu, un test nouveau de publication | P9, Q2, Q5 |
| `docs/conception/README.md`, `docs/conception/GUIDE-CONTENU.md` | sections de format (P8) |
| `ETAT-ACTUEL.md`, `ROADMAP.md`, `CLAUDE.md`, `docs/relecture/note-relais.md` | suivi |

**Fichiers qui ne seront pas modifiés** : `reconstruction/a2-04/sources/`, les lots et le journal
(sauf décision lexicale issue de Q3 ou Q4, par le protocole normal) ; `data/n5/exemples.json`,
`data/concepts/n5.json`, `data/curriculum/n5.json`, `data/mapping.json` ; `data/n5/grammar.json`,
`data/n5/particles.json`, les registres ; `data/n4/` ; les fichiers de l'ancienne application ; les
snapshots et addenda de la conception.

## 8. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport | `06-lot-courant-rapports.md` |
| La fiche source de 家 (Q4) | `07-lot-courant-sources.md` |
| Le plan de bascule d'A2-03 (§4) | non joint en entier : ses six points sont repris au §3 et au §4.1 |
| `ROADMAP.md`, `ETAT-ACTUEL.md` (plan de l'étape 2, points ouverts), `CLAUDE.md` | `01-gouvernance.md` |
| Le schéma A2-01 (E1 à E4, §9), le registre des tags (§5) | `02-conception.md` |
| Les addenda A3, A4, A5, A6 | `04-addenda.md` |
| L'état réel, la note de relais | `05-relais.md` |
| Le diff de la clôture documentaire, contre `9f3dc2b` | `10-diff-et-controles.md` |

## 9. Arbitrage rendu (2026-10-07)

Rendu par ChatGPT, par délégation, et relayé par l'utilisateur. **Il ne vaut autorisation ni
d'exécuter 5.17, ni d'écrire dans `data/`, ni de committer la publication, ni de pousser.** Il
autorise la seule préparation de la proposition d'exécution de 5.17.

| # | Arbitrage |
|---|---|
| Q1 | **Essai complet dans l'arbre de travail, non committé.** 5.17 sera écrite entièrement, contrôlée et exportée pour relecture ; un seul commit de publication sera autorisé ensuite. |
| Q2 | **Une commande de publication reproductible** dans `tools/reconstruction/`, qui écrit dans `data/` la sortie de l'assembleur complet et refuse l'écriture en cas de problème bloquant. **Un test permanent** garantit que les fichiers publiés correspondent à la sortie canonique de la reconstruction. **`data/` est une projection publiée, pas une deuxième source éditoriale.** |
| Q3 | **Statu quo pour les 64 ENTRY en katakana.** Les lectures en hiragana, telles que les fiches sources les donnent et telles qu'elles sont validées, sont conservées. Aucune normalisation vers le katakana, aucune règle mécanique nouvelle, aucune réouverture. **Point clos pour la v1.** |
| Q4 | **Aucun enrichissement de lecture avant 5.17.** 家 garde la seule lecture structurée いえ ; うち, que la fiche documente explicitement, reste dans la nuance. 家 n'est pas rouverte seule. Un éventuel enrichissement structuré des lectures passera plus tard par la procédure globale déjà exigée ; il pourra relever de l'audit A2-05 ou d'une tâche globale dédiée, sans modifier l'identifiant `v_33`. |
| Q5 | **Les 148 avertissements connus ne bloquent pas la publication.** Mais aucun test permanent n'exigera éternellement exactement 148 avertissements. Un **baseline** refuse toute régression : zéro erreur, aucune catégorie d'avertissement inattendue, aucun accroissement des avertissements connus. **Une diminution ultérieure reste autorisée.** Si l'outil permet un inventaire déterministe des avertissements connus, il est préféré à un simple compteur. Le contrôle décision par décision relève d'A2-05. |
| Q6 | **Décision existante confirmée** : les quatre fichiers figés `data/n5/exemples.json`, `data/concepts/n5.json`, `data/curriculum/n5.json` et `data/mapping.json` ne sont pas remappés. Les six anciens identifiants de `curriculum/n5.json` ne justifient aucune exception : ils visent des entrées conservées. |
| Q7 | **Les fichiers de l'ancienne application ne sont ni modifiés ni retirés** pendant 5.17. Ils restent jusqu'à l'étape 7. |
| Q8 | **Après la publication, l'espace de reconstruction reste la source de vérité éditoriale.** Toute correction lexicale passe par une décision journalisée, l'assemblage, puis une nouvelle publication mécanique. Le vocabulaire canonique de `data/` n'est jamais corrigé à la main. Cette doctrine vaut tant qu'une décision architecturale ultérieure ne la remplace pas explicitement. |

**Conséquence** : il n'y a **aucune décision lexicale à prendre avant la publication**. Q3 et Q4 sont
closes par statu quo ; la publication partira de l'état validé actuel (lots 0 à 26, 684 ENTRY, 1 613
décisions).

**Suite** : la proposition d'exécution de 5.17 (fichiers exacts, commande de publication, tests,
remappages, baseline des avertissements, contrôles), **sans lancer aucune publication et sans rien
écrire dans `data/`**.
