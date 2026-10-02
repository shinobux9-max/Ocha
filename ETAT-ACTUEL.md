# Ocha v2 — État actuel

**S'applique à** : la branche `ocha-v2` uniquement.

Ce fichier dit **où en est la reconstruction**. Il évolue à chaque tâche. Ce que Ocha doit
devenir est décrit dans `docs/conception/` (verrouillé) ; comment travailler, dans
`REGLES-CONSTRUCTION.md`.

---

## Étape en cours

**Étape 2 · Contenu et graphe — en cours** (partie 9, 9.9 : chargement, normalisation
`{ type, id }`, graphe, relations dérivées, `forms` / `construction` ; tests R1, R4, S1). Elle
comprend la reconstruction du vocabulaire selon l'architecture sémantique A2 (projets A2-01 à
A2-05) et la réidentification de la grammaire (addendum A4).

**Tâche en cours : 4 · A2-03 · Validateur du schéma lexical.** 4.1 à 4.4 validées ; 4.5 livrée
(adaptateur, audit de couverture, clôture ; rapport final `docs/rapports/etape2-A2-03.md`).
Après sa validation, A2-03 sera fermé et la prochaine tâche sera A2-04 (reconstruction et
publication du vocabulaire N5). Le validateur lexical est implémenté et éprouvé sur jeux
d'essai ; il n'est pas encore appliqué à `data/` (bascule à la publication d'A2-04).
A2-02 est terminé (rapport final `docs/rapports/etape2-A2-02.md`). A2-01 est verrouillé
(`docs/conception/schema-A2-01.md`, addenda A3 et A4, règles v2.3) ; la grammaire est
réidentifiée en `g_<n>` (tâche 1 bis) ; le catalogue minimal du contenu existe (tâche 2, G1,
rapport `docs/rapports/etape2-tache2-G1.md`).

### Étape 2 · Feuille de route

Ordre fixé le 2026-10-02 : le graphe (G2 à G9) se construit sur le corpus audité (A2-05). Chaque tâche suit la méthode habituelle : périmètre validé,
livraison, relecture, tests verts, commit.

| # | Tâche | Contenu | État |
|---|---|---|---|
| 1 | A2-01 · Verrouillage | schéma A2-01, addenda A3 et A4, `REGLES-CONSTRUCTION.md` 2.3, mentions de statut dans les parties concernées ; documents seulement | ✅ fait |
| 1 bis | Réidentification de la grammaire (A4) | un seul commit : `grammar.json` (`n5_g_<n>` → `g_<n>`, champ `level`), 63 références actives remappées, `events.js` (E5), validateur (I20, A4, préfixe `g_` de I18), tests ; plus aucun niveau déduit d'un identifiant `g_` ; `exemples.json` et fichiers de l'ancienne app inchangés | ✅ fait |
| 2 | G1 · Catalogue minimal | `data/kana.json` (grille, 210 kana, non-régression), `createContent(rawData)` pur, `elementExists`, `elementsOfScope` ; ne lit que les identifiants ; niveau donné par la place du fichier ; comptes tirés des données ; test d'intégration par les surfaces publiques de `content` et `learning` | ✅ fait |
| 3 | A2-02 · Registres | dans `data/registries/`, une sous-tâche par groupe de registres, chacune autorisée explicitement avant toute création de fichier : 3.1 registres fermés (types sémantiques, dimensions, relations, fonctions linguistiques) et snapshots dans `docs/conception/a2/` (validée) ; 3.2 catégories (validée) ; 3.3 (validée) ; 3.4 (validée) ; 3.5 (validée) 3.3 classes grammaticales et compteurs ; 3.4 tags ; 3.5 audit et verrouillage | ✅ fait, A2-02 fermé (3.1 à 3.5 validées) |
| 4 | A2-03 · Validateur | module `tools/lexicon/`, fonction pure `validateLexicon` testée sur des jeux d'essai, appelée par l'outil d'assemblage d'A2-04 puis par `validate-data` à la publication ; sous-tâches autorisées une à une : 4.1 socle (index des registres, règles transmises) ; 4.2 schéma strict et ENTRY (I1 à I6, I16, I17, A1 à A3, N1) ; 4.3 SENSE (I7 à I11, I13 à I15) ; 4.4 références transversales (I12, I19, I14 des expressions, futur format de `lieux.json` sur jeu d'essai) ; 4.5 point d'entrée et clôture | 4.1 à 4.4 validées, 4.5 livrée |
| 5 | A2-04.0 · Espace de travail | sources figées, fichiers de lot, journal des corrections, table de correspondance, outil d'assemblage | à faire |
| 6 | A2-04.1 à .15 · Lots | ~50 entrées par lot : proposition, relecture, audit, commit dans l'espace de travail | à faire |
| 7 | A2-04.16 · Passe finale | fusions, relations, tags de lieu, `vocab-retired.json`, remappage des références | à faire |
| 8 | A2-04.17 · Publication | une seule opération : vocabulaire canonique, validateur activé, `events.js` (E1 à E4) ; l'ancienne app cesse de fonctionner sur `ocha-v2` | à faire |
| 9 | A2-05 · Audit | échantillon relu, statistiques, cohérence, rapport | à faire |
| 10 | G2 à G9 · Graphe | normalisation, ordre de référence, graphe, relations dérivées, accessibilité (S1, R1), `forms` / `construction` (G7), validation (R4), branchement sur `learning` | à faire |
| 11 | Registre de phrases | format, identifiants, reconstruction depuis `exemples.json` et les anciens exemples ; requis avant l'étape 3 | à faire |
| 12 | Clôture de l'étape 2 | scénario de bout en bout, rapport `docs/rapports/etape2.md` | à faire |

Sous PowerShell, lancer les tests avec `npm.cmd test` (la stratégie d'exécution de Windows
bloque `npm test`).

### Étape 1 · Stockage et apprentissage — ✅ terminée

| Tâche | Contenu | Tests | État |
|---|---|---|---|
| 1 | Contrat de stockage et version en mémoire (`src/store/contract.js`, `src/store/memory.js`) : les 9 magasins de 9.2, transaction multi-magasins tout ou rien, panne déclenchable à la demande | suite de contrat réutilisable, atomicité | ✅ fait |
| 2 | SRS repris (`src/learning/srs.js`) : `gradeReview` pur et `getDaysOverdue` seulement ; constantes dans `GUIDED_CONFIG.srsAlgorithm` | non-régression : chaque note à chaque répétition, intervalles 1, 3, 8, 20, 50, 125 avec « Bien » | ✅ fait |
| 3 | État calculé (`src/learning/state.js`) : `new` → `mastered`, par les règles générales (seuils 21 / 60) | invariants 1.8 ; cohérence `declaredVerificationWindowDays.min ≥ acquiredIntervalDays` | ✅ fait |
| 4 | Faiblesses (`src/learning/weakness.js`) : échec, réussite, résolution après 3 réussites, réactivation, `computeWeaknessPriority` ; constantes dans `GUIDED_CONFIG.weaknessPriority` | tableau 3.5, priorité identique à l'ancien code | ✅ fait |
| 5 | Format et validation des événements (`src/learning/events.js`) : 12 types, contexte, références `{ type, id }`, identifiant | rejets et acceptations | ✅ fait |
| 6 | Effets, 1re partie (`src/learning/effects.js`) : `CONTENT_INTRODUCED` ; `QUESTION_ANSWERED` avec création de l'entrée SRS à J+1 et exception du test de positionnement ; `REVIEW_GRADED` avec vérification ; outil de rejeu pour les tests | S6, S7, C1, C4, synthèse 3.4 | ✅ fait |
| 7 | Effets, 2e partie : `KNOWLEDGE_DECLARED` (entrée SRS de vérification), `KNOWLEDGE_DECLARATION_UNDONE`, avancement des activités | aucun recul pour chaque I de 21 à 45 et chaque note ; annulation | ✅ fait |
| 8 | `recordLearningEvent` (`src/learning/record.js`, `index.js`) : file un par un, calcul sur copie, une transaction, idempotence, notification, chargement initial, instantané | C2 (test statique), C3, idempotence, ordre | ✅ fait |
| 9 | Journal (`src/learning/journal.js`) : résumé quotidien, compaction 30 jours / 5 000 événements | C5 | ✅ fait |
| 10 | Budget quotidien (`src/learning/budget.js`) : éléments qui quittent Nouveau, tous écrans confondus ; kana et déclarations exclus | nouveautés prises hors mode guidé (base de S10) | ✅ fait |
| 11 | Échec d'écriture (9.4) : compaction puis une seule nouvelle tentative, file volatile, état « en échec », `retry()` | 9.4, avec un stockage qui échoue à la demande | ✅ fait |
| 12 | IndexedDB (`src/store/indexeddb.js`, `src/store/schema.js`) : base `ocha`, schéma v1, migrations numérotées, `meta` | schéma testé dans Node ; adaptateur vérifié par la page `tests/browser/` | ✅ fait |
| 13 | Clôture : scénario de bout en bout sur la mémoire, `check-layers`, rapport `docs/rapports/etape1.md` | toute la suite verte | ✅ fait |

### Étape 0 · Préparation — ✅ terminée

| Tâche | Contenu | État |
|---|---|---|
| 1 | Branche `ocha-v2`, arborescence, `.gitignore` | ✅ fait (commit `c1a0f7b`) |
| 2 | Gouvernance et documentation | ✅ fait (commit `a7b701a`) |
| 3 | `src/config.js` avec `GUIDED_CONFIG` et réglages initiaux | ✅ fait |
| 4 | `tools/check-layers.mjs` | ✅ fait |
| 5 | `tools/validate-data.mjs` | ✅ fait |
| 6 | Nettoyage des données, validation sans erreur | ✅ fait |

---

## Contenu de la branche

- **Nouvelle base** : `src/config.js`, `src/store/` (contrat de stockage, version en
  mémoire, schéma et migrations, IndexedDB), `src/learning/` (`index.js`, `record.js`, `srs.js`, `state.js`,
  `weakness.js`, `events.js`, `effects.js`, `journal.js`, `budget.js`,
  `dates.js`), `src/content/` (`index.js`, `catalog.js`, `kana.js`, `errors.js`), `tools/check-layers.mjs`,
  `tools/validate-data.mjs`, `data/registries/` (registres A2), `docs/conception/a2/` (snapshots A2 figés), `tools/lexicon/` (validateur lexical), `tools/lexicon-adapter.mjs` (son adaptateur), `tests/` (380 tests dans Node, plus la page
  `tests/browser/store-contract.html`), `docs/conception/`, `docs/rapports/`, `package.json` (modules ESM).
  Les autres dossiers de `src/` sont vides pour l'instant.
- **Conception** : addenda A3 (modèle lexical et reconstruction) et A4 (identifiants
  indépendants du niveau), `docs/conception/schema-A2-01.md` (schéma du vocabulaire et
  invariants du validateur), validés le 2026-10-02.
- **Ancienne app** (`js/`, `css/`, `index.html`, `sw.js`…) : conservée **comme référence**
  pour reprendre la logique des modules listés dans la stratégie de reconstruction. Elle
  n'est pas modifiée. Son sort (déplacement ou suppression) sera décidé à l'étape 5, quand la
  nouvelle interface arrivera.
- **Anciens documents de l'app** : dans `docs/legacy/`, pour référence uniquement. Ils ne
  s'appliquent pas à la v2.
- **Données** (`data/`) : N5 et fichiers communs validés sans erreur
  (`node tools/validate-data.mjs`) ; N4 à N1 hors périmètre de validation.

## Autres branches

- `Modularisation` : app actuelle, avec le travail de style le plus récent. Non touchée.
- `UI-sans-refonte` : point de départ de `ocha-v2`. Non touchée.

Le dépôt s'appelle désormais `Ocha` (https://github.com/shinobux9-max/Ocha).

---

## Décisions complémentaires

Décisions prises pendant la reconstruction, qui complètent le document de conception sans
modifier ses parties verrouillées.

| Date | Décision | Où |
|---|---|---|
| 2026-09-29 | Réglages initiaux : 10 nouveautés par jour (contenu seulement, kana exclus), format de session normal | `src/config.js`, `DEFAULT_USER_SETTINGS` |
| 2026-09-29 | Commande de test : `npm test` (`node --test "tests/**/*.test.js"`), `node --test tests/` ne fonctionnant pas avec Node 22+ | `package.json`, `REGLES-CONSTRUCTION.md` v2.2 |
| 2026-09-29 | `src/app.js` (démarrage) a les mêmes droits que l'interface : imports, accès au navigateur, `store/settings.js` seulement | `tools/check-layers.mjs`, `REGLES-CONSTRUCTION.md` v2.2 |
| 2026-09-30 | Addendum A1 : le champ des constructions générées s'appelle `construction` (`pattern` reste le motif d'affichage) | `docs/conception/addendum-A1-construction.md` |
| 2026-09-30 | `particles.json` déplacé dans `data/n5/` ; `concepts`, `curriculum` et `mapping` restent en place jusqu'à l'étape 5, car l'ancienne app les charge | `data/` |
| 2026-09-30 | `group` non conjugables admis : adverbe, pronom, interrogatif, démonstratif, conjonction, temps, quantité, interjection | `tools/validate-data.mjs` |
| 2026-09-30 | Avertissements ajoutés : kanji absent des listes, catégorie isolée, catégories en double | `tools/validate-data.mjs` |
| 2026-09-30 | Unicité des identifiants entre fichiers (par espace), préfixes obligatoires, `kanji_list` à un kanji par entrée | `tools/validate-data.mjs` |
| 2026-10-01 | 結婚 et 練習 restent des noms (« mariage », « entraînement »), non transformés en verbes en する | `data/n5/vocab.json` |
| 2026-10-01 | Addendum A2 : l'ENTRY est l'unique unité de progression du vocabulaire ; tags officiels, non sémantiques, plats et contrôlés | `docs/conception/addendum-A2-liaison.md` |
| 2026-10-01 | Constantes de l'ancien `gradeReview` et de `computeWeaknessPriority` déplacées dans `GUIDED_CONFIG` (`srsAlgorithm`, `weaknessPriority`), à valeurs strictement identiques : explicitation des paramètres, pas un nouvel algorithme | `src/config.js` (tâches 2 et 4) |
| 2026-10-01 | Frontière du jour : date locale de l'appareil, pour la clé `daily` et le budget quotidien | `src/learning/journal.js`, `budget.js` |
| 2026-10-01 | La compaction ne résume jamais le jour en cours ; le plafond de 5 000 événements peut être dépassé ce jour-là, la justesse du budget primant | `src/learning/journal.js` |
| 2026-10-01 | La création d'une entrée SRS est un effet d'événement (J+1 à la première évaluation, 21 à 45 jours à la déclaration) ; `srs.js` ne contient que `gradeReview` et `getDaysOverdue` | `src/learning/effects.js`, `srs.js` |
| 2026-10-01 | Entrée SRS d'une déclaration : intervalle égal au délai déterministe de vérification (21 à 45 jours), 3 répétitions (contrainte réelle : au moins 2, sinon `gradeReview` ferait reculer un élément Acquis), facilité 2,5, aucune date de dernière révision ; la première vraie révision suit l'algorithme normal | `src/learning/effects.js` (tâche 7) |
| 2026-10-01 | L'état d'un élément déclaré se calcule par les règles générales (intervalle ≥ `acquiredIntervalDays` ⇒ Acquis) ; aucune règle « déclaré = Acquis » ; un test garantit `declaredVerificationWindowDays.min ≥ acquiredIntervalDays` | `src/learning/state.js` (tâche 3) |
| 2026-10-01 | Annulation d'une déclaration : un élément `verified` a été révisé depuis, et ses révisions priment | `src/learning/effects.js` (tâche 7) |
| 2026-10-01 | Session et mission persistées dans la transaction de l'événement : `recordLearningEvent(event, { session })`, instantané opaque pour `learning` jusqu'à l'étape 4 | `src/learning/record.js` |
| 2026-10-01 | Choix techniques de `learning` : horloge prise dans `event.at`, existence des éléments vérifiée par une fonction injectée (le contenu arrive à l'étape 2), `src/learning/index.js` seule surface publique (test statique pour C2) | `src/learning/` |
| 2026-10-01 | `computeQueuePriorityTier`, `prioritizeQueue` et `scheduleRelearning` reportés à l'étape 4 (moteur), avec un hasard injecté | — |
| 2026-10-01 | IndexedDB sans dépendance de test : contrat testé sur la version en mémoire dans Node, adaptateur IndexedDB vérifié par une page manuelle (`tests/browser/`) | tâche 12 |
| 2026-10-01 | `getDaysOverdue` reprend le comportement réel de l'ancien code : écart signé à l'échéance, négatif avant l'échéance, malgré l'ancien commentaire qui annonçait 0 | `src/learning/srs.js` |
| 2026-10-01 | Faiblesses : une réussite sur une faiblesse inactive la laisse inactive et garde sa date de résolution ; `computeWeaknessPriority` reste le calcul brut de l'ancien code, et c'est à l'appelant d'écarter les faiblesses inactives (`isWeaknessActive`) | `src/learning/weakness.js` |
| 2026-10-01 | Format des événements : schéma strict (champ inconnu refusé) ; `at` en UTC canonique (forme de `toISOString`) pour que l'index du journal trie correctement ; préfixes `evt_`, `ses_`, `fld_` ; `context.activityType` obligatoire sauf pour les événements de session, où il est sans objet ; `sessionId` obligatoire pour ces derniers ; forme des identifiants d'éléments vérifiée par type (partie 1, 1.1) | `src/learning/events.js` |
| 2026-10-01 | Déclaration par niveau : `scope` vaut `kana`, `n5`, `n4`, `n3`, `n2` ou `n1` (un seul niveau, celui choisi ; les niveaux inférieurs sont inclus par les effets, partie 1, 1.5) | `src/learning/events.js` |
| 2026-10-01 | Charges utiles définies par le moteur (`plan`, `completedActivities`, `lastActivity`, `sourceActivity`) : présence vérifiée, contenu fixé à l'étape 4 | `src/learning/events.js` |
| 2026-10-01 | L'origine technique « appris » est identifiée par `learned` ; les trois origines sont donc `learned`, `declared`, `tested`. `verified` reste un fait distinct de l'origine, posé seulement pour `declared` et `tested` | `src/learning/effects.js` |
| 2026-10-01 | Entrée SRS d'une première évaluation : intervalle `firstCheckDelayDays` (1 jour), facilité initiale 2,5, 0 répétition, aucune date de dernière révision, échéance le lendemain à la même heure locale ; l'origine `learned` est posée en même temps (un élément Découvert n'a pas d'origine) | `src/learning/effects.js` |
| 2026-10-01 | Délai de vérification d'une déclaration : 21 + (empreinte FNV-1a 32 bits de « date de la déclaration \| identifiant de l'élément » modulo 25) jours après la déclaration, la date étant l'horodatage `at` de la déclaration ; même élément et même déclaration donnent toujours le même délai (partie 1, 1.3) | `src/learning/effects.js` |
| 2026-10-01 | Déclaration par niveau : le contenu fournit les éléments d'un niveau (`elementsOfScope`, injectée) ; `learning` applique le cumul kana → N5 → N4 → … jusqu'au niveau choisi | `src/learning/effects.js` |
| 2026-10-01 | Trace d'une déclaration (magasin `declarations`) : `{ id, at, origin, scope ou elements, previous, undoneAt }`, où `previous` contient les faits d'avant des seuls éléments modifiés (`null` s'ils n'en avaient pas) ; la trace est conservée après annulation | `src/learning/effects.js` |
| 2026-10-01 | Annulation d'une déclaration : un élément n'est rétabli que s'il est encore exactement tel que la déclaration l'a laissé (cela couvre « vérifié depuis » et une déclaration plus récente) ; un élément sans faits avant la déclaration est retiré du magasin ; une déclaration déjà annulée est sans effet ; une déclaration inconnue ou un identifiant réutilisé est une erreur | `src/learning/effects.js` |
| 2026-10-01 | Avancement : faits `startedAt` et `completedAt` (premières dates, jamais repoussées), statut calculé (`computeActivityStatus`) ; `ACTIVITY_SKIPPED` ne change pas l'avancement (le moteur le lit dans le journal) ; l'étape atteinte d'une mission en cours est enregistrée avec la session | `src/learning/effects.js`, `state.js` |
| 2026-10-01 | `KNOWLEDGE_DECLARATION_UNDONE` constitue l'exception explicite à S6 et S7 : lorsqu'elle rétablit les faits antérieurs à une déclaration, elle peut supprimer ou modifier une entrée SRS et faire reculer l'état sans `REVIEW_GRADED` ni « Oublié ». Aucun autre événement ne bénéficie de cette exception (règle spécifique de 1.5 et 3.4, qui prime sur la formulation générale des critères) | `tests/learning/effects-knowledge.test.js` |
| 2026-10-01 | Interface du traitement central : `createLearning({ store, config, elementExists, elementsOfScope, warn })` donne `load()`, `recordLearningEvent(event, { session })`, `getSnapshot()`, `getSession()`, `subscribe()`. Résultat : `recorded`, `duplicate` (même identifiant déjà enregistré : aucun effet), `rejected` (invalide, ou incompatible avec l'état : rien n'est écrit, signalement par `warn`, `console.warn` par défaut) ou `pending` (échec du stockage, voir 9.4 ci-dessous) ; l'état en mémoire ne change qu'après confirmation du stockage | `src/learning/record.js` |
| 2026-10-01 | Session en cours : enregistrée sous la clé `current` du magasin `sessions`, sous la forme `{ id: 'current', value }`, contenu opaque pour `learning` jusqu'à l'étape 4 ; `session: null` l'efface, l'option absente n'y touche pas | `src/learning/record.js` |
| 2026-10-01 | L'instantané (`getSnapshot`) et la session sont gelés : un écran ne peut pas les modifier | `src/learning/record.js` |
| 2026-10-01 | Surface publique de `learning` (`index.js`) : traitement central, construction et validation d'événements, fonctions de lecture (état, avancement, faiblesse active, priorité, retard). Aucune fonction d'écriture n'est exposée (`gradeReview`, `applyWeakness…`, `applyEvent`) ; un test statique (C2) refuse tout import d'un module interne de `learning` depuis une autre couche | `src/learning/index.js`, `tests/learning/surface.test.js` |
| 2026-10-01 | Résumé quotidien tenu à jour à chaque événement enregistré, dans la même transaction (et non au moment de la compaction) : aucun jour n'est jamais sans résumé, et la compaction ne fait que supprimer du détail déjà résumé ; doublons, événements rejetés et échecs du stockage n'y comptent pas | `src/learning/journal.js`, `record.js` |
| 2026-10-01 | Contenu du résumé d'un jour (clé : jour local) : réponses justes et fausses par mode puis par type d'exercice (`none` sans type), révisions SRS par note (pour la régularité), activités terminées, secondes d'activités terminées et minutes de sessions guidées, gardées séparément | `src/learning/journal.js` |
| 2026-10-01 | Compaction : sont conservés tout le jour en cours, puis le détail des 30 derniers jours locaux (jour en cours compris) dans la limite de 5 000 événements au total, les plus récents d'abord ; un événement daté dans le futur est conservé. Elle a lieu au chargement, une fois par jour au plus (`meta.lastCompaction`) ; un échec est signalé sans bloquer le chargement ; `compactJournal()` la déclenche à la demande | `src/learning/journal.js`, `record.js` |
| 2026-10-01 | Horloge injectable (`now`) dans `createLearning`, utilisée pour la compaction et pour le jour du budget ; les effets d'un événement utilisent toujours sa date `at` | `src/learning/record.js` |
| 2026-10-01 | Budget quotidien : un élément « quitte Nouveau » quand son état calculé passe de Nouveau à un autre état sous l'effet d'un événement d'apprentissage (présentation, première réponse évaluée, première note SRS) ; déclarations, annulations et test de positionnement n'en font jamais partie. Ce fait est établi au moment de l'événement et compté par type dans le résumé du jour (`introduced`, kana compris), dans la même transaction ; le budget du jour (kana exclus) se lit dans ce résumé, il ne dépend donc ni de la compaction ni d'un rejeu | `src/learning/budget.js`, `journal.js`, `record.js` |
| 2026-10-01 | `getNewContentBudget(dailyNewBudget)` donne `{ date, used, limit, remaining }` pour le jour local de l'horloge ; le plafond, réglage de l'utilisateur, est reçu en argument ; `learning` compte, le moteur décide (étape 4) | `src/learning/record.js` |
| 2026-10-01 | Un élément ramené à Nouveau par l'annulation d'une déclaration consomme le budget s'il est ensuite présenté ou évalué : une déclaration n'est pas un apprentissage | `src/learning/budget.js` |
| 2026-10-01 | Échec d'écriture (9.4) : sur une panne du stockage (`StorageError`), compaction immédiate puis une seule nouvelle tentative ; si elle échoue, l'événement passe au statut `pending` et attend dans une file volatile, en mémoire. L'échec est visible par `getWriteFailure()` (`{ since, kind, message, pendingCount }`, `since` étant le début de l'échec) et `onWriteFailureChange()`. Pendant l'échec, tout événement valide rejoint la file sans être tenté, pour garder l'ordre ; un événement invalide reste rejeté. `retry()` enregistre la file dans l'ordre, s'arrête au premier échec, écarte en le signalant un événement devenu incompatible avec l'état ; l'idempotence évite les doublons. La file est perdue si l'app se ferme : aucune seconde persistance | `src/learning/record.js` |
| 2026-10-01 | Seule une panne du stockage déclenche 9.4 ; toute autre erreur rejette la promesse, sans compaction ni nouvelle tentative | `src/learning/record.js` |
| 2026-10-01 | `meta` initial : à la création, la base contient `schemaVersion` et `installationId` (9.2) ; la version en mémoire part des mêmes enregistrements (`initialMetaRecords`), pour qu'un stockage neuf soit identique dans les deux implémentations ; le cas de contrat « stockage neuf » le vérifie | `src/store/schema.js`, `memory.js` |
| 2026-10-01 | Schéma : les magasins, clés et index restent définis dans `contract.js` ; `schema.js` porte la base `ocha`, `SCHEMA_VERSION` (1) et les migrations numérotées, appliquées à `upgradeneeded` ; un retour en arrière ou une version inconnue du code est refusé | `src/store/schema.js` |
| 2026-10-01 | Adaptateur IndexedDB, même sémantique que la version en mémoire : vérifications communes de `contract.js` avant tout appel à IndexedDB (mêmes `TypeError`), même file d'exécution (IndexedDB peut faire tourner en parallèle des transactions sur des magasins différents), annulation explicite si `work` échoue ; erreurs traduites en `StorageError` (`QuotaExceededError` → `quota` ; `InvalidStateError`, `UnknownError`, `NotFoundError`, base bloquée ou fermée → `unavailable` ; autres → `aborted`) ; une demande de mise à niveau venue d'un autre onglet ferme la base | `src/store/indexeddb.js` |
| 2026-10-01 | Vérification de l'adaptateur IndexedDB : la suite de contrat commune (sans les pannes simulées), la persistance après réouverture et C3 de bout en bout sont joués dans le navigateur par `tests/browser/store-contract.html`, servie par `node tests/browser/serve.mjs` (aucune dépendance) | `tests/browser/` |
| 2026-10-01 | `REVIEW_GRADED` sur un élément sans entrée SRS : la note est sa première évaluation (partie 1 : « question d'exercice ou note SRS »), donc `gradeReview` s'applique aussitôt à partir de l'entrée de départ de l'ancien code, alors que `QUESTION_ANSWERED` crée une entrée à J+1 sans la noter ; date d'introduction et origine `learned` posées si absentes | `src/learning/effects.js` |
| 2026-10-01 | Étape 2 : `data/kana.json` devient la source canonique des kana (grille par groupes, identifiants stables `base`, `dakuten`, `handakuten`, `sokuon`, `yoon`), repris à l'identique de l'ancien code, romaji compris (`–`, `di`, `du`, `wo` inchangés) ; l'existence d'un kana est l'appartenance au catalogue | tâche G1 |
| 2026-10-01 | Un kanji est un élément s'il appartient au catalogue de kanji d'un niveau ; sa présence dans un mot ne suffit pas | tâche G1 |
| 2026-10-01 | `elementsOfScope(niveau)` : vocabulaire JLPT, grammaire et kanji du niveau ; jamais les mots hors JLPT ni les expressions ; kana pour la portée `kana` ; liste vide pour un niveau non intégré | tâche G1 |
| 2026-10-01 | `content` est pur : `createContent(rawData)` reçoit les données déjà lues ; une référence structurelle invalide refuse la construction ; l'accessibilité reçoit l'état par injection (`getElementState(ref)`), sans importer `learning` | étape 2 |
| 2026-10-01 | `docs/conception/README.md` n'est pas modifié pour décrire `kana.json` : documenté dans `ETAT-ACTUEL.md` et le rapport de la tâche | tâche G1 |
| 2026-10-02 | A2-01 verrouillé : schéma ENTRY → SENSE strict, au moins un sens, sens ≠ traduction (`meaning.primary` et `alternatives`), lectures structurées, `writings`, kanji calculés, `grammatical_class` et `group` séparés, `suru_compatible`, nuances à trois portées, relations de sens à sens, `senseId` seulement avec une seule cible `vocab` | `docs/conception/schema-A2-01.md` |
| 2026-10-02 | Addendum A3 : les données sont reconstruites (sources figées → travail → canonique toujours valide) ; identifiants de vocabulaire `v_<n>` indépendants du niveau, numéro historique conservé, `v_717` retiré, `hj_v_1` → `v_718`, `hj_v_2` → `v_719`, fusion au plus petit numéro, `data/vocab-retired.json` ; exemples hors du vocabulaire, dans un registre de phrases | `docs/conception/addendum-A3-modele-lexical.md` |
| 2026-10-02 | Addendum A4 : grammaire `g_<n>` (numéro conservé) avec champ `level` ; aucun comportement ne déduit le niveau d'un identifiant d'élément ; missions et lectures gardent leur niveau dans l'identifiant | `docs/conception/addendum-A4-identifiants.md` |
| 2026-10-02 | L'ancienne application cessera de fonctionner sur `ocha-v2` (grammaire dès la tâche 1 bis, vocabulaire à la publication d'A2-04) ; aucune compatibilité n'est maintenue ; elle reste intacte sur `Modularisation` | — |
| 2026-10-02 | `exemples.json`, `concepts/n5.json`, `curriculum/n5.json` et `mapping.json` sont des sources figées : non remappés, lus avec les tables de correspondance | — |
| 2026-10-02 | `REGLES-CONSTRUCTION.md` version 2.3 : identifiants `v_<n>` et `g_<n>`, identité sans niveau | `REGLES-CONSTRUCTION.md` §5 |
| 2026-10-02 | Grammaire réidentifiée : `n5_g_<n>` → `g_<n>` (numéro conservé), champ `level: "N5"` placé juste après `id` ; 63 références actives remappées ; `exemples.json`, `concepts/n5.json`, `curriculum/n5.json` et `mapping.json` inchangés (sources figées). L'ancienne app ne trouve plus les leçons sur `ocha-v2` | `data/` (tâche 1 bis) |
| 2026-10-02 | Validateur : niveau d'une leçon = son champ `level`, à défaut (niveau hors périmètre, ancien format) le niveau du fichier qui la définit, jamais l'identifiant ; niveau d'une activité = son champ `level`, à défaut son fichier ; `levelOfId` supprimé, y compris pour le périmètre des catégories du vocabulaire (niveau du fichier) ; nouveaux codes `forme-id`, `niveau-invalide`, `niveau-fichier` (I20) et `prefixe-reserve` (I18, préfixe `g_` ; `v_` s'ajoutera avec A2-03) | `tools/validate-data.mjs` |
| 2026-10-02 | Préfixe réservé contrôlé sur les identifiants de lieux, registres, personnages, missions, lectures, questions et expressions | `tools/validate-data.mjs` |
| 2026-10-02 | Garde-fou statique : aucun fichier de `src/` ni de `tools/` ne contient `_g_` (ni lecture ni construction d'un identifiant de grammaire à niveau) | `tests/tools/identifiers.test.js` |
| 2026-10-02 | Les clés d'exemple des tests du stockage suivent la nouvelle forme (`g_10`, `g_8`) ; l'ordre attendu change en conséquence (`g_…` avant `kana_…`) | `tests/store/` |
| 2026-10-02 | `data/kana.json` : `{ scripts: [{ id, groups: [{ id, title, rows }] }] }`, écritures `hiragana` et `katakana`, groupes `base`, `dakuten`, `handakuten`, `sokuon`, `yoon`, cases `{ char, romaji }` ou `null` (grille de l'interface conservée) ; ces écritures et ces groupes sont imposés par `kanaProblems`, chacun une fois et dans cet ordre (codes `ecriture-inconnue`, `ecriture-manquante`, `groupe-inconnu`, `groupe-manquant`, `ordre-invalide`) ; `title` repris tel quel de l'ancien code ; l'identifiant `kana_<caractère>` n'est pas stocké, il se déduit | `data/kana.json`, `src/content/kana.js` |
| 2026-10-02 | Contrat d'entrée de `createContent` : `{ levels: { <niveau>: { vocab, grammar, kanji } }, kana, vocabHorsJlpt, expressions }`, toute autre clé refusée ; les niveaux fournis sont ceux de `VALIDATED_LEVELS` (adaptateur) ; un niveau absent a une portée vide | `src/content/catalog.js`, `tests/helpers/content-data.mjs` |
| 2026-10-02 | Surface de `content` (G1) : `createContent` rend un objet gelé `{ elementExists, elementsOfScope }` ; portées gelées, stables d'un appel à l'autre ; portée inconnue : `TypeError` ; données incohérentes : `ContentError` portant tous les problèmes (identifiant absent ou en double par type, kanji de plusieurs caractères ou dans deux niveaux, niveau ou clé inconnus, fichier de niveau manquant, catalogue des kana invalide) | `src/content/index.js` |
| 2026-10-02 | Ordre d'une portée de niveau : grammaire, vocabulaire, kanji, chacun dans l'ordre de son fichier ; portée `kana` dans l'ordre de la grille (hiragana puis katakana) | `src/content/catalog.js` |
| 2026-10-02 | Validateur : `kana.json` obligatoire, contrôlé par la même fonction que le contenu (`kanaProblems`, importée de `src/content/index.js`) ; un kana existe s'il est au catalogue (les yōon sont acceptés) ; un kanji référencé doit appartenir au catalogue d'un niveau, le dictionnaire ne servant plus qu'à l'avertissement `kanji-inconnu` sur les mots | `tools/validate-data.mjs` |
| 2026-10-02 | A2-02 · emplacement : `data/registries/` (données canoniques), un fichier par registre : `categories.json`, `semantic-types.json`, `dimensions.json`, `relations.json`, `linguistic-functions.json`, `grammatical-classes.json`, `counters.json`, `tags.json` ; snapshots A2 figés dans `docs/conception/a2/`, copies octet pour octet | A2-02 |
| 2026-10-02 | A2-02 · format : chaque registre a `source` (version du snapshot) puis une structure propre à sa nature, sans enveloppe universelle ; identifiants ASCII minuscules avec `_`, générés une fois à partir du libellé puis figés, jamais réattribués, jamais préfixés `v_` ni `g_` ; relations : noms anglais normatifs du snapshot ; libellés repris mot pour mot | A2-02 |
| 2026-10-02 | A2-02 · catégories : identité hiérarchique locale. Un identifiant n'est unique que parmi ses frères ; l'identité d'un nœud de niveau 2 est (L1, L2), celle d'un niveau 3 (L1, L2, L3) ; aucun niveau 2 ou 3 n'est jamais cherché par son seul identifiant. Raison : 24 identifiants mécaniques sont partagés par 50 nœuds, aucune collision entre frères | A2-02 · 3.2 |
| 2026-10-02 | A2-02 · dimensions : un axe a au moins un pôle ; « Probabilité » est l'axe `probabilite` à un seul pôle `probabilite` (transcription fidèle, I11 inchangé) | `data/registries/dimensions.json` |
| 2026-10-02 | A2-02 · relations : `family`, `symmetric`, `inverse` ; libellé = nom normatif (le snapshot n'en donne pas d'autre) ; types sémantiques : seuls les 16 types terminaux sont attribuables ; fonctions linguistiques : familles `grammatical` et `pragmatic_discourse`, comme dans le schéma A2-01 ; libellés de familles repris en majuscules, comme dans les snapshots | 3.1 |
| 2026-10-02 | A2-02 · classes grammaticales (pour 3.3) : `nom`, `numeral`, `pronom`, `verbe`, `adjectif_i`, `adjectif_na`, `adverbe`, `determinant`, `conjonction`, `interjection`. `numeral` couvre les 15 nombres simples (一 à 十, 百, 千, 万, 零, ゼロ) ; aucune règle « contient un chiffre → numeral » : les composés (一つ, 一人, jours, 二十歳…) se décident entrée par entrée en A2-04. 匹 : `nom` avec la propriété `counter`, pas de classe compteur | A2-02 · 3.3 |
| 2026-10-02 | A2-02 · compteurs : six compatibilités attestées par `A2-LING-v1` (petits animaux, objets plats, objets longs, livres et volumes, unités génériques, occurrences) ; seule `small_animals` a un identifiant dans la source, les cinq autres seront fixés en 3.3 | A2-02 · 3.3 |
| 2026-10-02 | A2-02 · tags : `{ id, label, description, kind }`, `kind: lieu` seul pour l'instant ; premiers tags `lieu_konbini`, `lieu_gare`, `lieu_restaurant`, `lieu_hotel` ; aucun mécanisme de retrait défini tant qu'aucun retrait réel n'existe ; un identifiant de tag n'est jamais réattribué | A2-02 · 3.4 |
| 2026-10-02 | A2-02 · contrôles : `validate-data` vérifie l'intégrité interne des registres (source, clés exactes, identifiants, unicité, pôles, inverses réciproques, aucun inverse sur une relation symétrique) ; la conformité du vocabulaire aux registres relève d'A2-03 ; la transcription est vérifiée par des tests qui relisent les snapshots déposés | `tools/validate-data.mjs`, `tests/registries/` |
| 2026-10-02 | A2-02 · 3.2 · `categories.json` : `{ source: "A2-L3-v1", levels: [{ id, label, children: [{ id, label, children: [{ id, label }] }] }] }` ; un niveau 2 sans niveau 3 a `children: []` ; un niveau 3 n'a pas de clé `children` ; transcription de la section 5 du snapshot | `data/registries/categories.json` |
| 2026-10-02 | A2-02 · 3.3 · identifiants des compatibilités de compteur : `small_animals` (identifiant du snapshot), puis `flat_objects`, `long_objects`, `books_volumes`, `generic_units`, `occurrences` (conventions Ocha A2-02, notions tirées d'`A2-LING-v1`, chacune adossée à un compteur d'exemple : 匹, 枚, 本, 冊, 個, 回) | `data/registries/counters.json` |
| 2026-10-02 | A2-02 · 3.3 · `grammatical-classes.json` : `{ source: "A2-02", classes: [{ id, label }] }`, les dix classes dans l'ordre arbitré ; `counters.json` : `{ source: "A2-02", compatibilities: [{ id, label }] }`. `source: "A2-02"` signale des registres décidés par Ocha et non transcrits d'un snapshot. Chaîne à respecter (contrôlée en A2-03) : propriété `counter` → `counter_for` → identifiant de `counters.json`. Aucune forme (一つ, 一人, 二十歳…) n'est rendue compteur par détection : au N5, seul 匹 a besoin de `counter_for` | `data/registries/` |
| 2026-10-02 | A2-02 · 3.3 · `source: "A2-02"` et libellés des classes et des compatibilités validés ; la provenance détaillée (notions d'`A2-LING-v1`, identifiants décidés en A2-02) est tenue par le rapport et `tests/registries/decisions.test.js` | 3.3 |
| 2026-10-02 | A2-02 · 3.4 · `tags.json` : `{ source: "A2-02", tags: [{ id, label, description, kind }] }` ; `kind` parmi `TAG_KINDS` (`lieu` seul) ; quatre tags `lieu_konbini`, `lieu_gare`, `lieu_restaurant`, `lieu_hotel`, libellés « Utile au… », descriptions d'usage ; la nature est lue dans `kind`, jamais déduite du préfixe ; aucun champ de cycle de vie ; critères et procédure dans `docs/conception/registre-des-tags.md` | `data/registries/tags.json` |
| 2026-10-02 | A2-02 · 3.5 · audit transversal permanent (`tests/registries/audit.test.js`) : exactement huit registres et leur provenance ; aucun identifiant préfixé `v_` ni `g_` dans les registres (le validateur ne refusera `v_` qu'à partir d'A2-03) ; libellés sans espaces autour ; unicité dans chaque espace de noms lu par le schéma A2-01 ; aucune dépendance du code au préfixe `lieu_`. Seul identifiant commun à deux registres : `temps` (catégorie de niveau 1 et fonction grammaticale), légal puisque chaque champ du schéma désigne son registre | `tests/registries/audit.test.js` |
| 2026-10-02 | A2-03 · activation : `validateLexicon(...)` est une fonction pure, testée sur des jeux d'essai ; l'outil d'assemblage d'A2-04 l'appelle sur l'espace de travail ; `validate-data` ne l'appelle sur `data/` qu'à la publication d'A2-04, dans le commit qui retire l'ancien contrôle du vocabulaire ; aucune détection automatique du format | `tools/lexicon/index.mjs` |
| 2026-10-02 | A2-03 · code dans `tools/lexicon/` (`index.mjs`, `registries.mjs`, `schema.mjs`, `entry.mjs`, `sense.mjs`, `references.mjs`) ; `validate-data.mjs` reste l'orchestrateur. `schema.mjs` est la seule description exécutable du schéma ; le test de conformité fixe explicitement les champs attendus, sans analyser `schema-A2-01.md` | `tools/lexicon/` |
| 2026-10-02 | A2-03 · invariant architectural : une catégorie n'est résolue que par son chemin complet ; l'API de l'index des registres ne prend jamais un identifiant de catégorie isolé et n'expose aucune table « identifiant → nœud » | `tools/lexicon/registries.mjs` |
| 2026-10-02 | A2-03 · règles de contrôle arbitrées : furigana (seules `ruby`, `rt`, `rp` ; texte de base égal à la forme) ; kana d'une lecture = hiragana, katakana, `ー`, sans « / », règle définie une seule fois ; relations canonisées selon le registre (symétrique : ordre indifférent ; paire inverse : représentation commune ; dirigée sans inverse : ordre significatif) ; `vocab_tags` d'un lieu ne désigne que des tags existants de nature `lieu` ; tags d'une expression : facultatifs, connus, jamais de nature `lieu` ; aucune modification de `lieux.json` ni des expressions en A2-03 (futur format de `lieux.json` validé sur jeu d'essai) ; références de phrases : seulement `{ vocab, sense }`, sans figer le registre de phrases ; E1 à E4 à la publication d'A2-04 ; fixtures lexicales illustratives, sans valeur de décision pour A2-04 | A2-03 |
| 2026-10-02 | A2-03 · 4.1 : `REGISTRY_SOURCES` déplacé dans `tools/lexicon/schema.mjs` (liste unique, réexportée par `validate-data`) ; `validate-data` refuse les espaces autour d'un libellé de registre et réserve `v_` hors vocabulaire (`RESERVED_PREFIXES = ['g_', 'v_']`) ; contrat d'entrée de `validateLexicon` : `{ files: [{ file, level, entries }], registries }` | `tools/lexicon/`, `tools/validate-data.mjs` |
| 2026-10-02 | A2-03 · 4.2 · description déclarative (`tools/lexicon/schema.mjs`) : chaque champ a `type` (`text` = chaîne non vide, `boolean`, `list`, `object`), `required`, `nullable`, et `items` ou `shape` ; présent à null ≠ absent ; aucune valeur par défaut, le validateur valide sans normaliser ; un seul vérificateur générique (`checkShape`) tire de cette description la liste des champs admis (I1) | `tools/lexicon/schema.mjs` |
| 2026-10-02 | A2-03 · 4.2 · interprétations du schéma : les champs d'une lecture (§4) et d'une forme (§5) sont tous obligatoires, `note` pouvant valoir null (aucun n'y est marqué facultatif) ; N1 est le nombre d'ENTRY par niveau, les kanji calculés à partir de `word` relèvent de A2 (`kanji-inconnu`), jamais stockés ; kanji connus = catalogues de niveau et dictionnaire, comme l'actuel `kanji-inconnu`, fournis par l'appelant | A2-03 · 4.2 |
| 2026-10-02 | A2-03 · 4.2 · contrat d'entrée de `validateLexicon` : `{ files, registries, retired, knownKanji }` ; furigana : seule la structure `ruby` (paires base et `rt`, `rp` facultatifs autour de `rt`) est admise, validée avant le calcul du texte de base ; codes `champ-inconnu`, `champ-manquant`, `type-invalide`, `entree-id`, `id-retire`, `niveau-fichier`, `forme-invalide`, `lecture-manquante`, `lecture-defaut`, `kana-invalide`, `furigana-invalide`, `furigana-base`, `graphie-doublon`, `classe-inconnue`, `group-invalide`, `suru-compatible`, `compteur-vide`, `compteur-inconnu`, `unite-doublon`, `retire-invalide` ; avertissements `romaji-macron`, `kanji-inconnu`, `suru-sans-suru` ; information `entrees-par-niveau` | `tools/lexicon/` |
| 2026-10-02 | A2-03 · 4.2 validée : lecture `{ kana, romaji, furigana, default, note }` et forme `{ form, furigana }` entièrement obligatoires, `note: null` signifiant « aucune condition particulière » (jamais rendu facultatif en A2-04) ; `retired` et `knownKanji` fournis par l'appelant | `tools/lexicon/schema.mjs` |
| 2026-10-02 | A2-03 · 4.3 · SENSE : description déclarative (`SENSE_SHAPE` et sous-objets), I1 étendu à l'intérieur des SENSE ; `category.level_2` et `level_3` facultatifs, absents ou null ; relations vérifiées dans leur seule forme `{ type, target }` (type, cible, cohérence : I12, 4.4) ; contrat d'entrée augmenté de `particles` (valeurs de `particles.json`, I15) ; la stabilité historique des identifiants de sens n'est pas vérifiable sur un seul état des données et relève du journal d'A2-04 | `tools/lexicon/sense.mjs` |
| 2026-10-02 | A2-03 · 4.3 · codes : `sens-manquant`, `sens-id`, `sens-retire-invalide`, `sens-libelle`, `categorie-nulle`, `categorie-chemin`, `categorie-inconnue`, `type-nul`, `type-inconnu`, `dimension-inconnue`, `pole-inconnu`, `dimension-doublon`, `fonction-inconnue`, `tag-inconnu`, `tag-doublon`, `tag-repete`, `particule-inconnue` (avec `id-duplique` et `id-retire`) | `tools/lexicon/sense.mjs` |
| 2026-10-02 | A2-03 · 4.4 · I12 : index global des SENSE de tous les fichiers fournis ; type au registre, cible = SENSE existant différent du porteur ; doublons détectés par une clé canonique (symétrique : ordre indifférent ; paire inverse : écriture commune ; dirigée sans inverse : orientation significative) ; le lien miroir n'est jamais exigé, mais le noter des deux côtés est un doublon (I12) | `tools/lexicon/references.mjs` |
| 2026-10-02 | A2-03 · 4.4 · I19 : les références arrivent déjà extraites, liste plate `{ where, vocab, sense? }` (`REFERENCE_SHAPE`), sans que le validateur connaisse la structure des activités ni du futur registre de phrases ; une référence vise l'ENTRY, `sense` doit être un sens existant de cette ENTRY (D1 intact) ; l'extraction depuis les activités et les expressions revient à l'appelant | `tools/lexicon/references.mjs` |
| 2026-10-02 | A2-03 · 4.4 · contrat d'entrée : `references`, `expressions`, `lieux` facultatifs (absents : non contrôlés). Expressions : seul `tags` est examiné (facultatif ; connus, sans doublon, jamais de nature `lieu`) ; lieux au futur format : seul `vocab_tags` (liste de tags existants de nature `lieu`, lue dans `kind`) ; `expressions.json` et `lieux.json` non modifiés ; garde-fou de pureté : seul `registries.mjs` importe `node:fs`, pour l'aide `readRegistries`, jamais appelée par le validateur | `tools/lexicon/`, `tests/lexicon/purity.test.js` |
| 2026-10-02 | A2-03 · 4.4 validée : I19 valide des références lexicales normalisées `{ where, vocab, sense? }` ; leur extraction depuis chaque format source appartient à l'orchestrateur ou à l'adaptateur, jamais au validateur | `tools/lexicon/references.mjs` |
| 2026-10-02 | A2-03 · 4.5 · adaptateur `tools/lexicon-adapter.mjs`, hors du cœur pur : `readLexiconDependencies` (registres, kanji connus = catalogues de tous les niveaux et clés d'un caractère du dictionnaire, particules, expressions ; lieux seulement avec `includeLieux`), `readRetired`, `readActivities`, `extractReferences` (parcours identique à `validate-data`, jamais de `sense`) ; préparer le branchement n'est pas effectuer la bascule : `validate-data` n'appelle pas le validateur lexical avant la publication d'A2-04 (vérifié par un test) | `tools/lexicon-adapter.mjs` |
| 2026-10-02 | A2-03 · 4.5 · couverture : `tests/lexicon/coverage.test.js` relie chaque invariant à ses codes (aucun code orphelin, aucun invariant fantôme, chaque code attendu par un test) ; audit mécanique des 81 sites d'émission, 81 attrapés après comblement de 5 trous de test ; plan de bascule pour le commit de publication d'A2-04 dans le rapport final | `tests/lexicon/coverage.test.js`, `docs/rapports/etape2-A2-03.md` |

---

## Points ouverts

- **9.4 côté écran** (étape 5) : sur `pending`, mettre aussitôt en pause les exercices évalués,
  afficher le bandeau « Ta dernière réponse n'a pas pu être enregistrée. » avec Réessayer
  (`retry()`) et Exporter mes données, laisser la consultation possible. L'export (étape 6)
  devra préciser s'il inclut les événements en attente.
- **C4 côté écran** : la tâche 6 garantit que `REVIEW_GRADED` porte à lui seul les effets
  d'une révision. Que l'écran de révision n'émette qu'un seul événement par carte se vérifiera
  avec l'interface (étape 5).
- **Dossiers** : le magasin `folders` existe dans le schéma v1 ; son accès (par `learning`,
  jamais directement par l'interface) sera défini à l'étape 5.
- **Champ de sens dans `QUESTION_ANSWERED`** : `senseId` (A2-01), ajouté à la publication
  d'A2-04 (E2 à E4).
- **Tests navigateur** : la page `tests/browser/store-contract.html` se lance à la main ; elle
  n'est pas jouée par `npm test`. À relancer après toute modification de `src/store/`.
- **Export / import** (bouton du bandeau 9.4) : étape 6. L'étape 1 expose l'état d'échec et
  `retry()`.
- **`fake-indexeddb`** : à reconsidérer seulement si la vérification manuelle de l'adaptateur
  IndexedDB devient pénalisante.
- **Architecture lexicale A2** : A2-01 verrouillé ; A2-02 à A2-05 dans la feuille de route de
  l'étape 2. La place des projets A2-06 à A2-09 reste à arbitrer.
- **`data/n5/exemples.json`** : source du registre de phrases (tâche 11), qui corrigera ses
  défauts connus (436 exemples par kanji sans hiragana, découpage par espaces, 一つ lu いち,
  買 lu ばい, 今朝 lu いま あさ, clé fantôme `n5_v_717`).
- **Anomalies du vocabulaire relevées pour A2-04** (corrigées et journalisées pendant la
  reconstruction) : 九つ lu ここなつ ; `kanji_list` faux pour 丈夫, 出来る, 二十歳, お手洗い ;
  20 furigana dont le texte de base diffère du mot ; lectures et formes avec « / » ; doublons
  きれい / 綺麗 et いい / 良い ; balise cassée dans l'exemple de 聞く ; « LaXiste » dans 甘い.
- **Registre des formes et groupes compatibles** : à fixer avant G7 (aucun identifiant de forme
  n'est inventé).
- **Avertissement « élément enseigné par aucune activité ni leçon »** (2.7) : contrôle de
  couverture du graphe ; ses exclusions légitimes sont à définir avant G8.
- **Ajouts de contenu** : 円 (vocabulaire, par décision consignée pendant A2-04) ;
  おはようございます (expressions, hors A2-04).
- **Romaji des kana** (`–` pour っ, `di`, `du`, `wo`) : repris tels quels dans `kana.json` ;
  correction éventuelle à décider séparément.
- **Grammaire présente dans plusieurs niveaux** : à décider à l'intégration du N4 (addendum A4).
- **Pour A2-03** (relevé par l'audit d'A2-02) : `v_` réservé et espaces des libellés refusés
  (faits en 4.1) ; catégorie résolue par chemin complet (index livré en 4.1, contrôle I9 en
  4.3) ; tag de lieu reconnu par `kind` (I14, en 4.3 et 4.4) ; registres dans
  `data/registries/`.
- **Bascule du validateur lexical à la publication d'A2-04** : suivre le plan de
  `docs/rapports/etape2-A2-03.md`, section 4 (appel par `validate-data`, retrait de l'ancien
  contrôle du vocabulaire, `lieux.json` en `vocab_tags`, références remappées, `events.js` E1 à E4,
  formats de `README.md` et `GUIDE-CONTENU.md`).
- **Anomalie du dictionnaire des kanji** : `data/kanji_jouyou_fr.json` contient cinq clés qui sont
  des mots (山羊, 生活, 措置, 継続, 迅速) ; l'adaptateur du validateur lexical les écarte ; à
  corriger dans une tâche de données.
- **Points d'audit obligatoires d'A2-04 : doublons candidats** (à vérifier un par un avant tout
  retrait d'identifiant, ce ne sont pas des fusions autorisées) : お姉さん, お母さん, お父さん,
  美味しい, 面白い, 本当, 浴びる, 無くす, 醤油 (même mot en double) ; おなか / お腹, かばん / 鞄,
  くだもの / 果物, ばんごはん / 晩ご飯, ひるごはん / 昼ご飯, かぎ / 鍵, せっけん / 石鹸,
  くもり / 曇り, おととし / 一昨年, かわいい / 可愛い, はく / 履く, きれい / 綺麗, いい / 良い ;
  朝ご飯 / 朝御飯, 曲がる / 曲る, 明るい / 明い (graphie fautive) ; 大変 (adverbe et adjectif en
  な) ; キロ (kilo et kilomètre).
- **Classes grammaticales à décider entrée par entrée en A2-04** : les 13 `adjectif` (この, その,
  あの, どの, こんな → `determinant` ; les autres sont des adjectifs mal typés), 大きな
  (`determinant`), conjonctions et interjections rangées en `adverbe` ou `interjection` (しかし,
  でも, そうして, じゃ, じゃあ, それから, それでは, いいえ, ええ, どうぞ), など (particule), 弱く
  (forme adverbiale de 弱い), noms rangés en `adverbe` (先, 一緒, 全部, 一番, たくさん), いくら, いつ,
  composés numéraux (一つ à 九つ, jours, 一人, 二人, 二十歳).
- **N4** : dans l'ancien format de données. Sera reconstruit avec la même méthode qu'A2-04,
  identifiants `v_<n>` et `g_<n>` suivants, niveau le plus précoce pour un mot présent dans
  plusieurs listes. Le validateur ne couvre que le N5 d'ici là.
- **75 leçons de grammaire sans `requires`** : dépendances à écrire (travail pédagogique).
- **À l'étape 5** : déplacer `concepts/n5.json` vers `data/n5/concepts.json`, et
  `curriculum/n5.json` et `mapping.json` vers `data/legacy/`.

---

## Journal des tâches

| Date | Étape · tâche | Résumé | Commit |
|---|---|---|---|
| 2026-09-29 | 0 · 1 | Branche `ocha-v2` créée depuis `UI-sans-refonte`, arborescence, `.gitignore` | `c1a0f7b` |
| 2026-09-29 | 0 · 2 | Documents de conception, nouvelles règles et état ; anciens documents rangés dans `docs/legacy/` | `a7b701a` |
| 2026-09-29 | 0 · 3 | `src/config.js` : GUIDED_CONFIG (parties 1 à 5), réglages initiaux de l'utilisateur ; `package.json` en ESM | — |
| 2026-09-29 | 0 · 4 | `tools/check-layers.mjs` et ses 19 tests, commande `npm test`, droits de `src/app.js` | — |
| 2026-09-30 | — | Addendum A1 (`construction`) ; `particles.json` déplacé dans `data/n5/` | — |
| 2026-09-30 | 0 · 5 | `tools/validate-data.mjs` et ses 23 tests, périmètre N5 | — |
| 2026-10-01 | 0 · 6 | Nettoyage structurel des données : validation sans erreur (rapport : `docs/rapports/etape0-tache6.md`) | — |
| 2026-10-01 | — | Addendum A2 : liaison entre l'architecture sémantique A2 et la conception | — |
| 2026-10-01 | 1 · — | Découpage de l'étape 1 en 13 tâches et arbitrages préalables validés | — |
| 2026-10-01 | 1 · 1 | Contrat de stockage (9 magasins, transactions tout ou rien, `StorageError`), version en mémoire avec pannes à la demande, suite de contrat réutilisable ; 32 tests | — |
| 2026-10-01 | 1 · 2 | `gradeReview` et `getDaysOverdue` repris en fonctions pures, constantes dans `GUIDED_CONFIG.srsAlgorithm` ; oracle de l'ancien calcul sur toutes les suites de 7 notes ; 13 tests | — |
| 2026-10-01 | 1 · 3 | État calculé (`computeState`, `STATES`, `STATE_ORDER`) par l'intervalle seul ; vérification des invariants 2 et 3 (`checkElementFacts`) ; cohérence de la configuration (`tests/config.test.js`) ; 19 tests | — |
| 2026-10-01 | 1 · 4 | Faiblesses progressives (échec, réussite, résolution après 3 réussites, réactivation), `computeWeaknessPriority` repris à l'identique (constantes dans `GUIDED_CONFIG.weaknessPriority`) ; lecture des dates commune (`dates.js`, `srs.js` patché) ; 17 tests | — |
| 2026-10-01 | 1 · 5 | Format et validation des 12 types d'événements (`validateEvent`, existence des éléments injectée), invariant 3 de 3.10 (`REVIEW_GRADED` seulement en révision SRS), `createEventId` ; 15 tests | — |
| 2026-10-01 | 1 · 6 | Effets purs de `CONTENT_INTRODUCED`, `QUESTION_ANSWERED` (exception du test de positionnement) et `REVIEW_GRADED` (vérification) ; rejeu de journaux aléatoires pour S6 et S7, C1, C4 côté traitement ; `addCalendarDays` dans `dates.js` (`srs.js` patché) ; 20 tests | — |
| 2026-10-01 | 1 · 7 | Effets de `KNOWLEDGE_DECLARED` (délai déterministe, cumul des niveaux, trace), de son annulation et de l'avancement des activités ; S6 et S7 sur des journaux avec déclarations ; `computeActivityStatus` ; `effects.test.js` adapté ; délai dépendant de la date de déclaration et de l'identifiant (correctif de relecture) ; 27 tests | — |
| 2026-10-01 | 1 · 8 | `recordLearningEvent` : validation, calcul sur l'état en mémoire, une transaction (événement, faits, session), idempotence, file interne, notifications, chargement, instantané gelé ; surface publique `index.js` ; C2 (test statique), C3 (rechargement et rejeu) ; 23 tests | — |
| 2026-10-01 | 1 · 9 | Résumé quotidien dans la transaction de chaque événement, compaction (jour en cours jamais compacté), compaction quotidienne au chargement, `getDailySummaries`, `localDayKey` ; C5 ; horloge fixée dans `record.test.js` ; 15 tests | — |
| 2026-10-01 | 1 · 10 | Budget quotidien de nouveautés : `elementsLeavingNew`, comptage par type dans le résumé du jour, `getNewContentBudget` ; base de S10 ; `journal.test.js` adapté (champ `introduced`) ; 13 tests | — |
| 2026-10-01 | 1 · 11 | Échec d'écriture (9.4) : compaction puis une seule nouvelle tentative, file volatile, statut `pending`, échec observable, `retry()` dans l'ordre ; trois tests des tâches 8 et 9 adaptés au nouveau comportement ; 16 tests | — |
| 2026-10-01 | 1 · 12 | IndexedDB : `schema.js` (base `ocha`, version 1, migrations), `indexeddb.js` (même contrat que la mémoire), `meta` initial commun ; page de test navigateur et serveur local ; nouveau cas de contrat (ordre de fin entre magasins différents) ; 9 tests Node, 20 cas navigateur | — |
| 2026-10-01 | 1 · 13 | Clôture : scénario de bout en bout (`e2e.test.js`, du 1er octobre au 23 décembre, invariants, S6 et S7 après chaque événement, C3, C5, 9.4, budget) ; vérification que le code livré est celui testé ; rapport `docs/rapports/etape1.md`. Aucune logique nouvelle. Étape 1 terminée : 262 tests, 20/20 dans le navigateur | — |
| 2026-10-01 | 2 · — | Découpage de l'étape 2 et arbitrages préalables (kana, kanji, portées, `content` pur, refus des références invalides, accessibilité injectée) ; nouvel ordre avec la reconstruction A2 | — |
| 2026-10-01 | A2-01 | Corpus de stress-test (16 entrées N5), proposition de schéma, analyse de la reconstruction et des identifiants | — |
| 2026-10-02 | 2 · 1 | Verrouillage d'A2-01 : `schema-A2-01.md`, addenda A3 et A4, `REGLES-CONSTRUCTION.md` 2.3, mentions de statut des parties 1, 2, 3, 5, 8, des addenda A1 et A2, du `README.md` et de `GUIDE-CONTENU.md`, sommaire. Documents seulement | — |
| 2026-10-02 | 2 · 1 bis | Réidentification de la grammaire (addendum A4) : `grammar.json` en `g_<n>` avec `level`, 63 références remappées, `events.js` (E5), validateur (I18 pour `g_`, I20, A4), tests adaptés ; 6 nouveaux tests ; 11 sabotages du code et 5 des données, tous attrapés après comblement d'un trou (S11) ; 268 tests | — |
| 2026-10-02 | 2 · 2 (G1) | Catalogue minimal : `data/kana.json` (210 kana, non-régression contre une copie figée de l'ancienne liste), `src/content/` (`createContent`, `elementExists`, `elementsOfScope`, `ContentError`), adaptateur de test, validateur (kana et kanji par catalogue) ; intégration avec `learning` par les surfaces publiques ; structure canonique des kana imposée après relecture ; 19 nouveaux tests, 27 sabotages attrapés ; 287 tests | — |
| 2026-10-02 | 2 · 3 (A2-02) | Découpage et arbitrage d'A2-02 (11 décisions, identité locale des catégories, classe `numeral`, 10 classes, 匹), après extraction des libellés répétés, des 17 anciens `type` et des candidats numéraux et compteurs ; aucun fichier créé | — |
| 2026-10-02 | 2 · 3.1 | Registres fermés : `semantic-types.json` (4 familles, 16 types), `dimensions.json` (9 familles, 26 axes), `relations.json` (6 familles, 21 relations), `linguistic-functions.json` (2 familles, 14 fonctions) ; snapshots ST, DIM, REL, LING déposés ; intégrité dans `validate-data` ; tests de transcription ; 11 nouveaux tests, 20 sabotages attrapés ; 298 tests | — |
| 2026-10-02 | 2 · 3.2 | Catégories : `categories.json` (32 / 225 / 585, dont 56 niveaux 2 sans niveau 3), snapshot `A2-L3-v1` déposé ; intégrité de l'arbre dans `validate-data` (unicité parmi les frères seulement) ; transcription comparée à l'arbre entier du snapshot ; 6 nouveaux tests, 16 sabotages attrapés ; 304 tests | — |
| 2026-10-02 | 2 · 3.3 | Classes grammaticales et compteurs : `grammatical-classes.json` (10 classes), `counters.json` (6 compatibilités) ; registres plats contrôlés par `validate-data` ; tests distinguant ce qui vient d'`A2-LING-v1` de ce qui a été décidé en A2-02 ; 4 nouveaux tests, 13 sabotages attrapés ; 308 tests | — |
| 2026-10-02 | 2 · 3.4 | Tags : `tags.json` (4 tags de lieu), contrôle dans `validate-data` (nature par `kind` seulement), `docs/conception/registre-des-tags.md` (critères et procédure), sommaire ; 3 nouveaux tests, 10 sabotages attrapés ; 311 tests | — |
| 2026-10-02 | 2 · 3.5 | Audit et clôture d'A2-02 : huit registres audités (1 011 nœuds), conformité aux décisions 1 à 11, test d'audit transversal ; aucun registre modifié ; 4 nouveaux tests, 6 sabotages attrapés ; 315 tests ; A2-02 terminé | — |
| 2026-10-02 | 2 · 4 (A2-03) | Découpage et arbitrage d'A2-03 (12 décisions ; `lieux.json` reste à A2-04 ; pas d'analyse du Markdown du schéma) | — |
| 2026-10-02 | 2 · 4.1 | Socle du validateur lexical : `tools/lexicon/` (`index.mjs`, `registries.mjs`, `schema.mjs`), index des huit registres (catégories par chemin seulement), contrat d'entrée de `validateLexicon`, fixture illustrative ; `validate-data` : libellés sans espaces autour, `v_` réservé ; 11 nouveaux tests, 13 sabotages attrapés ; 326 tests | — |
| 2026-10-02 | 2 · 4.2 | Schéma strict et ENTRY : description déclarative et `checkShape` (I1), `tools/lexicon/entry.mjs` (I2 à I6, I16, I17, A1 à A3, N1), analyseur structurel des furigana, test de conformité au schéma ; correction d'un défaut du rapport (tableaux gelés en cours de route) ; 20 nouveaux tests, 26 sabotages attrapés ; 346 tests | — |
| 2026-10-02 | 2 · 4.3 | SENSE : description déclarative, `tools/lexicon/sense.mjs` (I7 à I11, I13 à I15, tags de l'ENTRY), contrat d'entrée augmenté de `particles`, conformité au schéma étendue ; 13 nouveaux tests, 22 sabotages attrapés ; 359 tests | — |
| 2026-10-02 | 2 · 4.4 | Références transversales : `tools/lexicon/references.mjs` (I12, I19, tags des expressions, futur format des lieux), contrat d'entrée augmenté de trois listes facultatives, garde-fou de pureté du validateur ; un contrôle redondant supprimé (sens d'une référence) ; 11 nouveaux tests, 19 sabotages attrapés ; 370 tests | — |
| 2026-10-02 | 2 · 4.5 | Adaptateur du validateur lexical (dépendances, extraction des références, sans bascule), audit de couverture (81 sites, 6 trous de test comblés dont un révélé par sabotage), test permanent de couverture, rapport final d'A2-03 avec plan de bascule ; 10 nouveaux tests ; 380 tests | — |
