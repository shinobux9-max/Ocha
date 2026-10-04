# Ocha v2 — État actuel

**S'applique à** : la branche `ocha-v2` uniquement.

Ce fichier dit **où en est la reconstruction**, dans le détail technique. Il évolue à chaque
tâche. La vue d'ensemble jusqu'à la version finale (étapes 0 à 7, grands chantiers) est dans
`ROADMAP.md` ; ce que Ocha doit devenir, dans `docs/conception/` (verrouillé) ; comment
travailler, dans `REGLES-CONSTRUCTION.md`.

---

## Étape en cours

**Étape 2 · Contenu et graphe — en cours** (partie 9, 9.9 : chargement, normalisation
`{ type, id }`, graphe, relations dérivées, `forms` / `construction` ; tests R1, R4, S1). Elle
comprend la reconstruction du vocabulaire selon l'architecture sémantique A2 (projets A2-01 à
A2-05) et la réidentification de la grammaire (addendum A4).

**Tâche en cours : A2-04 · Reconstruction du vocabulaire N5.** A2-03 est fermé (rapport final
`docs/rapports/etape2-A2-03.md`). 5.0 validée (infrastructure). **5.1 · lot 0 « identité » validé** (rapport final
`docs/rapports/etape2-tache5-1-lot0-valide.md`) : 60 entrées et 74 décisions du journal en
`validated` ; assemblage réel : 33 ENTRY, 28 identifiants retirés, aucune erreur, aucune attente.
**5.2 · lot 01 « personnes, famille, corps, santé » validé** (rapport
`docs/rapports/etape2-tache5-2-lot01-valide.md`) : 49 entrées et 66 décisions (D0075 à D0140) en
`validated` ; assemblage réel : 82 ENTRY, 28 retraits, 0 erreur, 0 attente. **5.3 · lot 02 « alimentation, boissons, repas et table » validé** (rapport
`docs/rapports/etape2-tache5-3-lot02-valide.md`) : 41 entrées et 80 décisions (D0141 à D0220) en
`validated` ; assemblage réel : 123 ENTRY, 28 retraits, 0 erreur, 0 attente. **5.4 · lot 03 « maison, habitat et vie domestique » validé** (rapport
`docs/rapports/etape2-tache5-4-lot03-valide.md`) : 40 entrées (39 gardées, 掃除する fusionné dans
掃除) et 72 décisions (D0221 à D0292) en `validated` ; assemblage réel : 162 ENTRY, 29 retraits,
0 erreur, 0 attente. **5.5 · lot 04 « ville, transports et déplacements » validé** (rapport
`docs/rapports/etape2-tache5-5-lot04-valide.md`) : 39 entrées (38 gardées, 出ます fusionné dans
出る) et 62 décisions (D0293 à D0354) en `validated` ; assemblage réel : 200 ENTRY, 30 retraits,
0 erreur, 0 attente. **5.6 · lot 05 « achats, vêtements et objets personnels » validé** (rapport
`docs/rapports/etape2-tache5-6-lot05-valide.md`) : 37 entrées, dont les deux premiers mots hors
JLPT, et 55 décisions (D0355 à D0409) en `validated` ; assemblage réel : 237 ENTRY, 30 retraits,
0 erreur, 0 attente. **5.7 · lot 06 « école, apprentissage, langue et écrit » validé** (rapport
`docs/rapports/etape2-tache5-7-lot06-valide.md`), après l'audit 5.7-C du champ `counter` : 37
entrées et 46 décisions (D0410 à D0455) en `validated` ; assemblage réel : 274 ENTRY, 30 retraits,
0 erreur, 0 attente. **5.8 · lot 07 « météo, saisons et nature » validé** (rapport
`docs/rapports/etape2-tache5-8-lot07-valide.md`) : 34 entrées et 48 décisions (D0456 à D0503) en
`validated` ; assemblage réel : 308 ENTRY, 30 retraits, 0 erreur, 0 attente ; 匹 est le seul
`counter` du corpus. **5.9 · lot 08 « communication, correspondance et médias » validé** (rapport
`docs/rapports/etape2-tache5-9-lot08-valide.md`) : 29 entrées et 36 décisions (D0504 à D0539) en
`validated` ; assemblage réel : 337 ENTRY, 30 retraits, 0 erreur, 0 attente. **5.10 · lot 09 « loisirs, sorties et voyages » validé** (rapport
`docs/rapports/etape2-tache5-10-lot09-valide.md`) : 20 entrées (19 gardées, 散歩する fusionné dans
散歩) et 35 décisions (D0540 à D0574) en `validated` ; assemblage réel : 356 ENTRY, 31 retraits,
0 erreur, 0 attente. 5.11 · lot 10 « position, direction et orientation » : périmètre validé (24 entrées), **proposition**
livrée (`reconstruction/a2-04/lots/lot-10.json`, rapport `docs/rapports/etape2-tache5-11-lot10.md`) ;
aucune décision validée avant la relecture. Le validateur lexical n'est pas
encore appliqué à `data/` (bascule à la publication d'A2-04).
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
| 4 | A2-03 · Validateur | module `tools/lexicon/`, fonction pure `validateLexicon` testée sur des jeux d'essai, appelée par l'outil d'assemblage d'A2-04 puis par `validate-data` à la publication ; sous-tâches autorisées une à une : 4.1 socle (index des registres, règles transmises) ; 4.2 schéma strict et ENTRY (I1 à I6, I16, I17, A1 à A3, N1) ; 4.3 SENSE (I7 à I11, I13 à I15) ; 4.4 références transversales (I12, I19, I14 des expressions, futur format de `lieux.json` sur jeu d'essai) ; 4.5 point d'entrée et clôture | ✅ fait, A2-03 fermé (4.1 à 4.5 validées) |
| 5 | A2-04 · 5.0 · Infrastructure | `reconstruction/a2-04/` (sources figées et empreintes, `place-tags.json`, `lots/`, `journal.json`) et `tools/reconstruction/` (règles et listes fermées, couche mécanique, contrôle des lots et du journal, assembleur partiel et complet, rapport de relecture, commandes) ; aucune décision lexicale | validée |
| 6 | A2-04 · 5.1 à 5.15 · Lots | 5.1 lot 0 · identité (60 entrées : 27 groupes de doublons candidats, formes et lectures avec « / »), avant tout lot thématique ; puis lots thématiques regroupés par ancienne catégorie (environ 50 entrées, cible indicative) : proposition, relecture sur le rapport généré, validation, commit dans l'espace de travail | 5.1 à 5.10 validées (lots 0 à 09) ; 5.11 proposée (lot 10) |
| 7 | A2-04 · 5.16 · Passe finale | fusions, relations, tags de lieu, `vocab-retired.json`, remappage des références | à faire |
| 8 | A2-04 · 5.17 · Publication | une seule opération : vocabulaire canonique, validateur activé, `events.js` (E1 à E4) ; l'ancienne app cesse de fonctionner sur `ocha-v2` | à faire |
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
  `tools/validate-data.mjs`, `data/registries/` (registres A2), `docs/conception/a2/` (snapshots A2 figés), `tools/lexicon/` (validateur lexical), `tools/lexicon-adapter.mjs` (son adaptateur), `tools/reconstruction/` et `reconstruction/a2-04/` (reconstruction du vocabulaire), `tests/` (431 tests dans Node, plus la page
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
| 2026-10-02 | A2-04 · frontière : chaque champ est mécanique, humain, ou mécanique sauf exception (table de `docs/rapports/etape2-tache5-0-infrastructure.md`) ; une ENTRY ne sort de l'assemblage que si tous ses champs humains sont décidés et validés ; une proposition n'est jamais lue comme une décision | `tools/reconstruction/` |
| 2026-10-02 | A2-04 · `group` : mécanique, repris s'il est compatible avec la classe (verbe : `ru`, `u`, `irrégulier`, `suru` ; adjectif en い : `i` ; en な : `na` ; nom : `nom`), `null` pour une classe sans groupe ; incompatibilité = exception ; une décision ne choisit qu'une valeur compatible avec la classe | `tools/reconstruction/rules.mjs` |
| 2026-10-02 | A2-04 · tags de lieu : candidats proposés mécaniquement (ancienne catégorie dans `vocab_categories` du lieu, ou `places` d'un mot hors JLPT, par la correspondance décidée de `place-tags.json`), jamais canoniques sans décision humaine | `tools/reconstruction/mechanical.mjs` |
| 2026-10-02 | A2-04 · ajouts : identifiant = max(identifiants actifs ∪ retirés) + 1 au moment de l'assemblage, jamais une constante ; les identifiants actifs comprennent ceux de toutes les entrées sources ; aucun ajout sans décision « ajout » journalisée | `tools/reconstruction/assemble.mjs` |
| 2026-10-02 | A2-04 · « / » dans une forme ou une lecture : jamais de découpage automatique, l'entrée va au lot 0 ; furigana repris (espaces de découpage retirés) seulement si la structure est valide et que le texte de base est exactement la forme | `tools/reconstruction/mechanical.mjs` |
| 2026-10-02 | A2-04 · espace de travail `reconstruction/a2-04/`, conservé jusqu'à A2-05 sans suppression automatique ; lots en JSON (seule source des décisions, statuts `proposed` / `validated`), rapports Markdown générés et jamais relus ; journal à identifiants stables `A2-04-D<nnnn>` ; validation partielle (I12 et I19 en attente pour les cibles non assemblées, forme locale vérifiée) et complète ; nombre de lots indicatif | `reconstruction/a2-04/` |
| 2026-10-02 | A2-04 · 5.0 : la correspondance lieu → tag est une donnée (`reconstruction/a2-04/place-tags.json`), non du code, conformément au garde-fou « aucun `lieu_` dans `src/` ni `tools/` » | `reconstruction/a2-04/place-tags.json` |
| 2026-10-02 | A2-04 · `group` : la règle de 5.0 est la règle officielle (verbe → `ru`, `u`, `irrégulier`, `suru` ; adjectif en い → `i` ; en な → `na` ; nom → `nom` ; numéral, pronom, adverbe, déterminant, conjonction, interjection → `null`) ; elle suit le schéma verrouillé, aucun addendum ; l'arbitrage contraire du découpage est retiré | `tools/reconstruction/rules.mjs` |
| 2026-10-02 | A2-04 · 5.1 · les entrées de journal sont proposées avec le lot qui les cite : leur statut est celui de ces entrées de lot ; une entrée de journal ne décide rien, l'assembleur n'agit que sur les décisions validées ; si une proposition change, son entrée de journal est réécrite sous le même identifiant avant la validation | `reconstruction/a2-04/journal.json` |
| 2026-10-02 | A2-04 · 5.1 · rapport de relecture : groupes candidats réunis sous un en-tête avec la proposition du groupe, décisions du journal affichées avec leur raison, sens en tableau | `tools/reconstruction/report.mjs` |
| 2026-10-02 | A2-04 · lot 0 arbitré : les 27 fusions, les huit découpages en sens, les corrections factuelles (おととし, 可愛い) et structurelles (furigana), et les tags de lieu retenus sont approuvés ; lectures par défaut なな (七), よん (四), きゅう (九), なに (何), まいとし, まいつき | `reconstruction/a2-04/lots/lot-00.json` |
| 2026-10-02 | A2-04 · journal : chaque décision a son propre statut `proposed` ou `validated` ; une décision `proposed` n'a aucun effet normatif et peut être réécrite sous le même identifiant ; une décision de lot validée ne cite que du journal validé (`journal-non-valide`) | `tools/reconstruction/decisions.mjs` |
| 2026-10-02 | A2-04 · forme usuelle : l'identifiant survivant d'une fusion (plus petit numéro) et la forme usuelle sont deux décisions indépendantes ; `word` (avec ses lectures) est décidable pour le survivant d'une fusion, et seulement pour lui | `tools/reconstruction/decisions.mjs` |
| 2026-10-02 | A2-04 · 大変 (`n5_v_495`) ajouté aux exceptions de classe : adjectif en な, groupe `na` ; l'emploi intensifieur relève du sens et de sa fonction | `tools/reconstruction/rules.mjs` |
| 2026-10-02 | Addendum A5 · `category: null` permis lorsqu'aucune catégorie primaire suffisamment pertinente n'existe : justifié par une fonction linguistique pour une unité grammaticale ou pragmatique ; pour un sens lexical plein, décision humaine justifiée au journal (nature `categorie-nulle`, sur le sens précis). I9 : avertissement `categorie-nulle` au lieu d'une erreur | `docs/conception/addendum-A5-category-null.md`, `tools/lexicon/sense.mjs` |
| 2026-10-02 | A2-04 · 5.1b validée ; いい / 良い : D0037 validée (いい seule lecture, よい dans la nuance) ; une lecture propre à une graphie n'est pas nécessaire pour A2-04 | `reconstruction/a2-04/lots/lot-00.json` |
| 2026-10-02 | Addendum A6 · `semantic_type: null` permis quand aucun type terminal d'A2-ST ne décrit correctement la nature du sens (partie du corps, unité de mesure…), indépendamment de `category` ; I10 modifié dans `schema-A2-01.md` (type terminal ou `null` ; avertissement `type-nul` sans fonction linguistique) ; en reconstruction, tout `semantic_type: null` exige une décision `type-nul` sur le sens précis ; `A2-ST-v1` inchangé | `docs/conception/addendum-A6-semantic-type-null.md`, `tools/lexicon/sense.mjs`, `tools/reconstruction/decisions.mjs` |
| 2026-10-02 | Lot 0 : `semantic_type: null` pour お腹 (partie du corps) et pour les sens « kilogramme » et « kilomètre » de キロ (unités de mesure), justifiés D0070 à D0072 | `reconstruction/a2-04/journal.json` |
| 2026-10-02 | A2-04 · 5.1c validée ; règle stricte maintenue : pendant A2-04, tout `semantic_type: null` exige une décision `type-nul`, même quand une fonction linguistique explique l'absence (何, 大変 « très ») ; le validateur canonique n'avertit qu'en l'absence de fonction, pour éviter le bruit sur les unités fonctionnelles ; `category: null` (aucun domaine thématique) et `semantic_type: null` (aucun type ontologique) sont deux absences indépendantes | `tools/reconstruction/decisions.mjs`, `tools/lexicon/sense.mjs` |
| 2026-10-02 | A2-04 · 5.1 fermée : lot 0 et son journal entièrement validés ; un test permanent exige que l'espace de travail réel s'assemble sans problème, sans erreur du validateur lexical et sans attente | `reconstruction/a2-04/`, `tests/reconstruction/workspace.test.js` |
| 2026-10-02 | A2-04 · 5.2 · périmètre du lot 01 : `personnes_famille` et `corps_sante` (49 entrées), sans 習う (au lot école) ni ハンカチ (au lot accessoires), avec 皆さん ; A6 n'est pas une règle « corps ⇒ null » : chaque `semantic_type: null` est décidé et justifié sens par sens ; 方 (personne / suffixe 〜方) et 叔母 / 伯母, 叔父 / 伯父 sont des questions d'identité exposées, pas tranchées en silence ; deux traductions ne font pas deux sens ; le report des relations à 5.16 ne reporte pas la description intrinsèque (nuances, fonctions) | `reconstruction/a2-04/lots/lot-01.json` |
| 2026-10-02 | A2-04 · lot 01 arbitré : 方 = voie A (« personne » respectueux, `suffix: false` ; le suffixe 〜方 est une unité distincte, en attente d'un chantier sur la représentation des affixes) ; 叔母 / 叔父 sans graphie 伯母 / 伯父 (叔 / 伯 porte une information lexicale réelle) ; 頭 à deux sens ; pas de fonction `politesse` pour les termes d'adresse (nuance d'usage intrinsèque, pas d'annotation pragmatique systématique sans règle A2-LING) ; une alternative doit être équivalente au sens, jamais un terme voisin (病院 sans « clinique », 歯 sans « denture », 男 sans « garçon ») ; 足 garde « jambe » en alternative (largeur référentielle d'un même lexème) | `reconstruction/a2-04/lots/lot-01.json` |
| 2026-10-02 | A2-04 · 5.2 fermée : lot 01 et ses 66 décisions validés ; méthode confirmée pour les lots suivants : composition du lot d'abord, proposition après validation du périmètre, révision, validation atomique (statuts seulement), commit après la validation ; les avertissements A5, A6 et 醤 restent et ne sont jamais « corrigés » pour obtenir zéro avertissement | `reconstruction/a2-04/` |
| 2026-10-02 | A2-04 · 5.3 · périmètre du lot 02 : `nourriture_boissons` (26) et 15 ajouts du même domaine (飲む ; 甘い, 辛い, まずい ; vaisselle et couverts ; レストラン, 喫茶店, 食堂) ; 作る, 台所, 冷蔵庫, 八百屋, 吸う et 煙草 hors du lot ; tags décidés candidat par candidat, jamais par ancienne catégorie, une décision pouvant citer un tag du registre absent des candidats ; un tag d'ENTRY vaut pour tous ses sens ; お皿 / 皿 et お弁当 / 弁当 : retirer お change la forme lexicale, ce n'est pas une graphie ; lectures en katakana : statu quo mécanique pendant 5.3 | `reconstruction/a2-04/lots/lot-02.json` |
| 2026-10-02 | A2-04 · critère des tags de lieu : un tag signale une association caractéristique et utile au contexte de l'Explorer (vocabulaire d'action propre au lieu : ce qu'on y achète typiquement ou ce qu'on vous y propose, ce qu'on y commande ou demande pour être servi, le nom du lieu), jamais la simple possibilité d'employer le mot dans ce lieu ; une décision antérieure (晩ご飯, lot 0) n'est pas une règle | `reconstruction/a2-04/lots/lot-02.json` |
| 2026-10-02 | A2-04 · lot 02 arbitré : découpages (魚, ご飯, 料理, 甘い, まずい à deux sens ; お茶, お酒, 飲む, 辛い à un sens), correction 辛い / つらい (deux unités lexicales), graphies 鶏肉 et 茶碗, pas de 皿 ni de 弁当, `categorie-nulle` de 甘い et まずい validés ; « Gobelet » retiré de カップ, « Riz au curry » de カレー ; `ufs` non corrigé dans le lot (registre fermé) | `reconstruction/a2-04/lots/lot-02.json` |
| 2026-10-02 | A2-04 · 5.3 fermée : lot 02 et ses 80 décisions validés ; le critère des tags de lieu (association caractéristique, jamais la simple possibilité d'emploi) est la référence pour la suite d'A2-04 ; `ufs` et la convention des lectures en katakana restent des points ouverts séparés | `reconstruction/a2-04/` |
| 2026-10-02 | A2-04 · 5.4 · périmètre du lot 03 : la partie domestique de `maison_quotidien`, avec les mots de la maison rangés ailleurs (家, 廊下, 階段, 門, トイレ, お手洗い ; mobilier et équipement ; 洗う, 住む), soit 40 entrées ; les mots de la ville de `maison_quotidien` vont à un futur lot « ville et lieux publics » ; aucun sens sans documentation par la source (une polysémie connue mais absente des sources relève de l'enrichissement, pas de la reconstruction) | `reconstruction/a2-04/lots/lot-03.json` |
| 2026-10-02 | A2-04 · identité : お風呂 et ふろ restent deux ENTRY (la présence de お n'est pas une différence d'écriture, comme お皿 / 皿) ; 掃除する fusionné dans 掃除 (`suru_compatible: true`). Règle transversale : une forme en する est fusionnée avec son nom quand elle n'apporte pas d'identité lexicale propre ; chaque cas (散歩する, 勉強する…) est examiné selon ce critère, jamais fusionné aveuglément | `reconstruction/a2-04/lots/lot-03.json` |
| 2026-10-02 | A2-04 · lectures absentes de la mécanique : aucune lecture n'est ajoutée au fil des lots (家 garde いえ seule ; うち reste dans la nuance) ; un éventuel enrichissement des lectures manquantes passera par une procédure globale décidée avant 5.17 | `reconstruction/a2-04/lots/lot-03.json` |
| 2026-10-03 | A2-04 · lot 03 arbitré : お風呂 et ふろ, deux ENTRY à un seul sens (le bain japonais, l'installation et par extension la pièce ; aucune action, portée par 入る dans お風呂に入る) ; エレベーター : `lieu_gare` seul, l'ascenseur n'étant pas caractéristique du service hôtelier ; le reste du lot validé tel que proposé (掃除 / 掃除する, 洗濯, 家 いえ seule, graphies, corrections de 窓 et ポスト, 電気 à deux sens, tags) | `reconstruction/a2-04/lots/lot-03.json` |
| 2026-10-03 | A2-04 · 5.4 fermée : lot 03 et ses 72 décisions validés ; premier retrait par fusion d'une forme en する (`v_220 → v_219`), qui porte le total à 29 identifiants retirés | `reconstruction/a2-04/` |
| 2026-10-03 | A2-04 · 5.5 · périmètre du lot 04 : 39 entrées (13 lieux publics, dont 7 des 9 mots urbains écartés du lot 03 ; 11 transports ; 15 verbes de déplacement) ; 国 et 帰国 reportés au lot « pays et voyage » ; 出ます fusionné dans 出る en conservant `v_642`, par une `exception-fusion` (forme conjuguée tenant lieu d'ENTRY : représentation manifestement erronée) | `reconstruction/a2-04/lots/lot-04.json` |
| 2026-10-03 | A2-04 · lot 04 arbitré : 出ます / 出る et les trois sens de 出る confirmés (D0335 à D0339) ; 図書館 parmi les espaces publics collectifs, sans créer de catégorie pour une seule entrée ; 降りる sans tag : verbe général de descente ou de sortie d'un véhicule, non propre à la gare ; le reste du lot validé tel que proposé | `reconstruction/a2-04/lots/lot-04.json` |
| 2026-10-03 | A2-04 · 5.5 fermée : lot 04 et ses 62 décisions validés ; une décision de tags « sans changement de valeur » (D0347, avant `[]`, après `[]`) est légitime quand elle matérialise un arbitrage humain négatif, et elle garde la stabilité des identifiants suivants | `reconstruction/a2-04/` |
| 2026-10-03 | A2-04 · 5.6 · périmètre du lot 05 : 37 entrées (achats et argent avec les deux mots hors JLPT et 八百屋 ; vêtements sans 曇る ; accessoires et objets personnels) ; いくら : classe `pronom` (identité interrogative de prix ou de quantité), sans transformer ses constructions en sens ; aucune fusion pré-arbitrée ; les mots hors JLPT suivent exactement le même modèle et la même exigence de journalisation que le N5 ; 円, absent des sources, n'est pas introduit | `reconstruction/a2-04/lots/lot-05.json` |
| 2026-10-03 | A2-04 · lot 05 arbitré : une proximité fonctionnelle ne fait pas une appartenance catégorielle ; faute de catégorie pertinente dans le registre, `category: null` justifié (A5) plutôt qu'une catégorie approchée (時計 n'est pas une unité temporelle, 荷物 n'est pas une utilisation des transports), le `semantic_type` restant renseigné ; 荷物 garde `lieu_hotel` (faire garder ses bagages, action propre au parcours hôtelier) ; le reste du lot validé tel que proposé | `reconstruction/a2-04/lots/lot-05.json` |
| 2026-10-03 | A2-04 · 5.6 fermée : lot 05 et ses 55 décisions validés ; `vocab-hors-jlpt.json` reçoit ses deux premières ENTRY (`v_718` レジ袋, `v_719` ポイントカード) | `reconstruction/a2-04/` |
| 2026-10-03 | A2-04 · 5.7 · périmètre du lot 06 : 37 entrées (école et personnes ; apprendre et savoir, avec 分かる, 知る, 忘れる ; langue et écrit ; fournitures) ; 平仮名 : forme usuelle ひらがな, 平仮名 en graphie, comme exception humaine propre à cette ENTRY. Mise en œuvre : une liste fermée `USUAL_FORM_IDS`, distincte des graphies fautives, qui ne contient que `n5_v_604` ; la règle mécanique générale n'est pas modifiée et aucune autre entrée n'est traitée ainsi | `tools/reconstruction/rules.mjs`, `tools/reconstruction/mechanical.mjs` |
| 2026-10-03 | A2-04 · lot 06 relu : `USUAL_FORM_IDS` et D0440 confirmés ; `concept_abstrait` confirmé pour 英語 et pour le sens « langue » de 言葉 (une langue est un système abstrait conventionnel, pas un contenu) ; validation suspendue à l'audit du champ `counter` | `reconstruction/a2-04/lots/lot-06.json` |
| 2026-10-03 | A2-04 · 5.7-C · audit du champ `counter` (sans modification de données) : `counter` (`{ counter_for }`) est la propriété d'une ENTRY qui **est** un compteur (A2-LING §3, schéma I6 ; au N5, seul 匹 selon A2-02) ; ce que documentent les sources (« ce nom se compte avec 冊 ») est une autre relation, non représentée ; `counter: null` est correct pour les 43 noms validés concernés et pour 本, 辞書, 鉛筆, 字 ; aucune reprise des lots 0 à 05 ; les emplois de compteur de 本 (〜本) et de 人 (〜人) sont des unités distinctes, avec le chantier des affixes | `docs/rapports/etape2-tache5-7c-audit-compteurs.md` |
| 2026-10-03 | A2-04 · 5.7-C clos et 5.7 fermée : distinction confirmée entre une ENTRY qui est un compteur (`counter.counter_for`) et un nom qui se compte avec un compteur (relation non représentée, question de conception non bloquante) ; `counter: null` correct partout, aucune reprise des lots 0 à 05 ; lot 06 et ses 46 décisions validés | `reconstruction/a2-04/` |
| 2026-10-03 | A2-04 · 5.8 · périmètre du lot 07 : 34 entrées (saisons, temps qu'il fait, chaud et froid, paysages et plantes, animaux), dont 曇る, 川, 涼しい, 咲く et 匹 ; 匹 reste dans ce lot (le regroupement aide l'arbitrage, il ne fixe pas l'ontologie) : classe `nom`, `counter: { counter_for: ["small_animals"] }`, aucune classe ni fonction « compteur » ; la catégorie de son sens est déterminée indépendamment de `counter_for` ; aucune polysémie pré-validée par analogie (鳥 n'hérite pas du cas 魚) | `reconstruction/a2-04/lots/lot-07.json` |
| 2026-10-03 | A2-04 · lot 07 validé sans révision : 匹 (`counter_for: small_animals`, catégorie « nombres & quantification › comptage & compteurs › animaux », qui décrit le concept désigné et non la compatibilité, `semantic_type: null`, aucune fonction « compteur ») ; une catégorie existante et pertinente est préférée à `category: null` ; 曇る à deux sens (le ciel, une surface qui s'embue), la qualification « extension » par la source n'imposant pas de réduire à une nuance ; 鳥 à un sens ; 木, 吹く et 冷たい à deux sens ; saisons dans « temps › moments et périodes » (le thème du lot n'infléchit pas l'ontologie) ; 空 au niveau 1 « monde naturel » plutôt qu'une sous-catégorie forcée ; test permanent : seule 匹 porte un `counter` dans tous les lots | `reconstruction/a2-04/lots/lot-07.json`, `tests/reconstruction/workspace.test.js` |
| 2026-10-03 | A2-04 · 5.9 · périmètre du lot 08 : 29 entrées (parler, demander, répondre ; téléphone ; correspondance ; presse, radio, télévision, enregistrement ; photographie) ; かける : seulement les sens documentés par la source, aucune polysémie extérieure ni graphie en kanji non documentée ; 撮る : l'homophonie ne permet jamais de récupérer les sens de 取る ; `suru_compatible` : champ humain sans règle mécanique, même doctrine que le lot 06 (la seule existence de 〜する ne suffit pas) ; objets datés traités normalement, sans nuance « vieilli » non établie par la source ; le test des compteurs vaut pour la reconstruction N5, pas comme règle ontologique générale | `reconstruction/a2-04/lots/lot-08.json` |
| 2026-10-03 | A2-04 · 5.9 · vérification de `suru_compatible` (sans modification de données) : `false` est la valeur par défaut d'une propriété facultative dont seule la présence est définie (« le nom forme un verbe avec する », schéma §6, I6) ; il signifie « compatibilité non établie », jamais « incompatibilité établie ». Confirmé par la pratique : 238 noms validés à `false`, dont un seul justifié au journal. D0426 (作文), D0507 (話) et D0519 (電話) sont conformes. Précision de lecture pour tout consommateur des données : ne pas générer de forme en する quand `false`, sans conclure à une incompatibilité | `docs/rapports/etape2-tache5-9-verif-suru.md` |
| 2026-10-03 | A2-04 · 5.9 fermée : lot 08 validé sans modification ; lecture de `suru_compatible` confirmée (`true` = compatibilité établie, `false` = non établie, valeur par défaut, pas une négation linguistique) ; D0507 et D0519 conservées telles quelles, leur « non retenu » étant compatible avec cette lecture | `reconstruction/a2-04/` |
| 2026-10-03 | A2-04 · 5.10 · périmètre du lot 09 : 20 entrées (musique, chant, image ; activités et sorties ; piscine ; pays et voyages), dont 映画館, プール, 国, 帰国 et 旅行 ; la position et la direction (27 entrées, avec les démonstratifs) forment un lot à part ; 散歩 / 散歩する : candidat à la fusion, décidé après confrontation des fiches, le précédent 掃除 / 掃除する fournissant le critère, pas le résultat ; aucun nombre de sens pré-validé ; aucun sens repris d'un homophone (お釣り, 引く, 唄) ; chaque ancien candidat de lieu rejeté explicitement | `reconstruction/a2-04/lots/lot-09.json` |
| 2026-10-03 | A2-04 · lot 09 arbitré : fusion 散歩する → 散歩 validée (散歩 `suru_compatible: true`) ; `suru_compatible: true` seulement quand la source établit la **formation** du verbe avec する (散歩, 旅行, 帰国), jamais pour une construction nom + を + する (スポーツ, 釣り : `false`), même si la source porte l'étiquette « Nom / verbe suru » ; 国 à un sens, le pays natal étant le même concept contextualisé (nuance) ; le reste du lot validé tel que proposé | `reconstruction/a2-04/lots/lot-09.json` |
| 2026-10-03 | A2-04 · 5.10 fermée : lot 09 validé ; la distinction « formation Nする » / « construction Nをする » est une clarification opérationnelle d'A2-04 pour décider `suru_compatible` d'après la source, et non une affirmation qu'une construction Nをする interdirait linguistiquement Nする | `reconstruction/a2-04/` |
| 2026-10-03 | A2-04 · 5.11 · séquençage : lot 10 = espace lexical (position, direction, distance, orientation, 24 entrées dont 向こう et 地図) ; lot 11 = système démonstratif et interrogatif (こ・そ・あ・ど) ; 次 avec l'ordre et le temps. Tags de la gare : aucune présomption pour les points cardinaux, la signalétique 東口 / 西口 ne les rendant pas propres à la gare ; chaque candidat examiné individuellement. Aucun découpage pré-validé (前, 後ろ, 隣, 向こう, 表, 縦, 横, 先) ; aucun sens repris d'un homographe (中 suffixal, 表 ひょう, 角 つの, 蕎麦) | `reconstruction/a2-04/lots/lot-10.json` |

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
- **Parties du corps et unités dans les lots suivants** : par l'addendum A6, leur
  `semantic_type` est `null`, justifié sens par sens au journal (`type-nul`), comme pour お腹 et
  キロ dans le lot 0.
- **Lecture よい de いい** : le schéma attache les furigana de chaque lecture à la forme usuelle
  (I4) ; よい, lisible seulement sur la graphie 良い, est décrite dans la nuance. Une lecture
  propre à une graphie demanderait un changement du schéma.
- **Lectures des mots en katakana** (point transversal, à trancher globalement avant 5.17) : la
  couche mécanique reprend la lecture de la source, en hiragana avec trait d'allongement
  (カレー → かれー, コーヒー → こーひー). C'est valide pour le schéma ; faut-il normaliser les lectures
  des emprunts en katakana ? Si la règle change, elle s'applique uniformément à tout le corpus
  concerné, jamais lot par lot. Statu quo pendant les lots.
- **Identifiant `ufs` du registre des catégories** (« Œufs », `alimentation_cuisine › aliments`) :
  la règle mécanique d'A2-02 a supprimé la ligature œ. Le registre est verrouillé et
  l'identifiant figé ; une correction passerait par une décision sur le registre, pas par la
  reconstruction.
- **Audit A2-05, tags de lieu du lot 0** : selon le critère du lot 02 (association caractéristique,
  pas simple possibilité d'emploi), les tags `lieu_restaurant` des trois repas (晩ご飯, 昼ご飯,
  朝ご飯), et peut-être celui de 醤油, semblent trop larges. Ils ne sont pas rouverts pendant les
  lots ; à réexaminer à l'audit.
- **Lectures manquantes, candidats d'enrichissement** : 家 lu うち (documenté par la nuance de la
  source). Aucune lecture n'est ajoutée pendant les lots ; si l'on décide d'enrichir les lectures
  avant 5.17, il faudra une procédure globale.
- **Verbes en する** : la règle de fusion du lot 03 (掃除 / 掃除する) devra être appliquée cas par
  cas aux autres formes en する du corpus (散歩する, 勉強する…), selon l'identité lexicale.
- **« Se compte avec »** (question de conception, sans urgence ; audit 5.7-C) : les sources disent
  avec quel compteur on compte 43 noms déjà validés (本, 枚, 個, 台, 軒…). Ce n'est **pas** le champ
  `counter`, qui porte la propriété d'une ENTRY qui *est* un compteur (`counter_for`, seul 匹 au
  N5) : `counter: null` est correct partout. La relation « se compte avec » n'est représentée nulle
  part. Faut-il la modéliser (propriété du nom, relation vers le compteur, ou leçons de grammaire
  seulement) ? Les sources figées permettront de l'extraire plus tard, sans reprendre les lots.
- **Lecture de `suru_compatible: false`** : valeur par défaut, « compatibilité non établie », pas
  une incompatibilité. Le schéma, verrouillé, ne le dit pas explicitement ; à reprendre si une
  évolution du schéma est décidée, et à respecter par la morphologie (étape 3).
- **Affixes** : la représentation des suffixes (〜方 « manière de… », 〜人, 〜さん…) n'est pas
  définie ; aucune ENTRY d'affixe n'est créée avant un chantier dédié.
- **Identifiants de sens après publication** : ils sont générés dans l'ordre des sens jusqu'à la
  publication ; ensuite, réordonner les sens ne doit jamais les renuméroter. À protéger par
  l'audit A2-05.
- **Bascule du validateur lexical à la publication d'A2-04** : suivre le plan de
  `docs/rapports/etape2-A2-03.md`, section 4 (appel par `validate-data`, retrait de l'ancien
  contrôle du vocabulaire, `lieux.json` en `vocab_tags`, références remappées, `events.js` E1 à E4,
  formats de `README.md` et `GUIDE-CONTENU.md`).
- **Anomalie du dictionnaire des kanji** : `data/kanji_jouyou_fr.json` contient cinq clés qui sont
  des mots (山羊, 生活, 措置, 継続, 迅速) ; l'adaptateur du validateur lexical les écarte ; à
  corriger dans une tâche de données.
- **醤 absent des kanji connus** (avertissement `kanji-inconnu` sur 醤油, lot 0) : signalé à juste
  titre, non bloquant ; à reprendre avec A2-05 ou la tâche de données sur les kanji, sans ajout
  artificiel.
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
| 2026-10-02 | 2 · 4.5 | Adaptateur du validateur lexical (dépendances, extraction des références, sans bascule), audit de couverture (5 trous révélés par la neutralisation des 81 sites, plus 1 trou indépendant révélé par un sabotage de l'adaptateur, tous comblés), test permanent de couverture, rapport final d'A2-03 avec plan de bascule ; 10 nouveaux tests ; 380 tests | — |
| 2026-10-02 | 2 · 5 (A2-04) | Découpage et arbitrage d'A2-04 (frontière mécanique / humaine, `group`, tags de lieu, ajouts, lot 0, validation partielle, journal) | — |
| 2026-10-02 | 2 · 5.0 | Infrastructure de reconstruction : sources figées (empreintes), règles et listes fermées ancrées à leurs mots, couche mécanique, contrôle des lots et du journal, assembleur partiel et complet avec le verrou « proposer n'est pas décider », rapport de relecture, commandes ; aucune décision lexicale ; 29 nouveaux tests, 23 sabotages attrapés après comblement d'un trou (tags candidats) ; 409 tests | — |
| 2026-10-02 | 2 · 5.1 | Lot 0 · identité **proposé** (60 entrées : 27 fusions proposées, 33 entrées gardées ; 56 décisions au journal dont 13 abandons journalisés) ; rapport de relecture regroupé ; essai à blanc : aucun problème de frontière, 5 erreurs I9 qui révèlent le conflit avec A2 §10 ; 2 nouveaux tests ; 411 tests | — |
| 2026-10-02 | 2 · 5.1b | Révision du lot 0 après arbitrage : journal à statut, forme usuelle décidable après fusion (8 formes changées), 大変 en adjectif en な, addendum A5 et I9 en avertissement, lectures なな et よん ; 15 nouvelles décisions au journal (identifiants des 56 premières inchangés) ; essai à blanc : aucun problème de frontière, 3 erreurs `type-nul` (types ouverts) ; 4 nouveaux tests, 9 sabotages attrapés ; 415 tests | — |
| 2026-10-02 | 2 · 5.1c | Addendum A6 (`semantic_type: null`), I10 modifié dans le schéma et le validateur, justification `type-nul` en reconstruction ; lot 0 : 3 types nuls décidés, 74 décisions au journal ; essai à blanc lot et journal validés : 33 ENTRY, 28 identifiants retirés, 0 erreur, avertissements intentionnels seulement ; 2 nouveaux tests, 7 sabotages attrapés ; 417 tests | — |
| 2026-10-02 | 2 · 5.1 | Validation du lot 0 : 60 entrées et 74 décisions du journal passées en `validated` sans autre changement ; assemblage réel : 33 ENTRY, 28 identifiants retirés, 0 problème, 0 erreur, 0 attente, avertissements intentionnels (A5 × 5, A6 × 3, 醤) ; test permanent d'assemblage réel ; 3 sabotages attrapés ; 418 tests | — |
| 2026-10-02 | 2 · 5.2 | Lot 01 proposé : 49 entrées, 65 décisions de journal proposées (D0075 à D0139) ; essai à blanc : 82 ENTRY, 0 problème, 0 erreur, avertissements intentionnels (14 `type-nul`, 5 `categorie-nulle` de plus) ; points à arbitrer : 方, 叔 / 伯, 頭, fonction `politesse` des termes d'adresse ; 1 nouveau test ; 419 tests | — |
| 2026-10-02 | 2 · 5.2b | Révision du lot 01 : 6 entrées modifiées (3 nuances corrigées, 3 alternatives retirées), 8 décisions réécrites sous leur identifiant, 1 nouvelle (D0140) ; essai à blanc inchangé : 82 ENTRY, 28 retraits, 0 erreur, 0 attente ; 419 tests | — |
| 2026-10-02 | 2 · 5.2 | Validation du lot 01 : 49 entrées et 66 décisions passées en `validated` sans autre changement ; assemblage réel : 82 ENTRY, 28 retraits, 0 problème, 0 erreur, 0 attente, 609 entrées encore à décider ; test d'état adapté ; 3 sabotages attrapés ; 419 tests | — |
| 2026-10-02 | 2 · 5.3 | Lot 02 proposé : 41 entrées, 80 décisions de journal proposées (D0141 à D0220), dont 29 décisions de tags écartées des candidats ; 3 tags portés par un sens ; essai à blanc : 123 ENTRY, 0 problème, 0 erreur, 2 `categorie-nulle` de plus ; 1 nouveau test ; 420 tests | — |
| 2026-10-02 | 2 · 5.3b | Révision du lot 02 : critère des tags de lieu formalisé ; 11 entrées modifiées (9 tags retirés, 2 alternatives retirées), 18 décisions réécrites sous leur identifiant, aucune nouvelle ; 27 tags au lieu de 37 ; essai à blanc inchangé : 123 ENTRY, 0 erreur, 0 attente ; tags des repas du lot 0 signalés à l'audit A2-05 ; 420 tests | — |
| 2026-10-02 | 2 · 5.3 | Validation du lot 02 : 41 entrées et 80 décisions passées en `validated` sans autre changement ; assemblage réel : 123 ENTRY, 28 retraits, 0 problème, 0 erreur, 0 attente, 568 entrées encore à décider ; test d'état adapté ; 3 sabotages attrapés (le troisième refait avec le bon identifiant) ; 420 tests | — |
| 2026-10-02 | 2 · 5.4 | Lot 03 proposé : 40 entrées (39 gardées, 掃除する fusionné dans 掃除), 72 décisions de journal proposées (D0221 à D0292) ; essai à blanc : 162 ENTRY, 29 retraits, 0 problème, 0 erreur, 0 attente, 1 `type-nul` de plus (電気 « électricité ») ; 1 nouveau test ; 421 tests | — |
| 2026-10-03 | — | Feuille de route globale `ROADMAP.md` ajoutée à la racine, sans décision de conception nouvelle ; branchée dans `REGLES-CONSTRUCTION.md` (lecture avant toute tâche, mise à jour seulement si l'avancement global change, case de la liste de contrôle) | — |
| 2026-10-03 | 2 · 5.4b | Révision du lot 03 : 3 entrées modifiées (お風呂 et ふろ à un sens, エレベーター sans `lieu_hotel`), 3 décisions réécrites sous leur identifiant (D0254, D0256, D0259), aucune nouvelle ; essai à blanc inchangé : 162 ENTRY, 29 retraits, 0 erreur, 0 attente ; 421 tests | — |
| 2026-10-03 | 2 · 5.4 | Validation du lot 03 : 40 entrées et 72 décisions passées en `validated` sans autre changement ; assemblage réel : 162 ENTRY, 29 retraits, 0 problème, 0 erreur, 0 attente, 528 entrées encore à décider ; test d'état adapté ; 3 sabotages attrapés (chacun vérifié comme modifiant réellement les données) ; `ROADMAP.md` mis à jour (5.4 ✅, 5.5 prochain chantier) ; 421 tests | — |
| 2026-10-03 | 2 · 5.5 | Lot 04 proposé : 39 entrées (38 gardées, 出ます fusionné dans 出る avec exception à la règle du plus petit numéro), 62 décisions de journal proposées (D0293 à D0354) ; essai à blanc : 200 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, 2 `categorie-nulle` de plus ; 1 nouveau test ; 422 tests | — |
| 2026-10-03 | 2 · 5.5b | Révision du lot 04 : 降りる sans `lieu_gare` ; D0347 réécrite à sa place (émise explicitement pour garder les identifiants suivants), aucune autre décision modifiée ; essai à blanc inchangé : 200 ENTRY, 30 retraits, 0 erreur, 0 attente ; 422 tests | — |
| 2026-10-03 | 2 · 5.5 | Validation du lot 04 : 39 entrées et 62 décisions passées en `validated` sans autre changement ; journal entier validé (354 décisions) ; assemblage réel : 200 ENTRY, 30 retraits (dont `v_537 → v_642`), 0 problème, 0 erreur, 0 attente, 489 entrées encore à décider ; test d'état adapté (il exige aussi l'exception à la règle du plus petit numéro) ; 3 sabotages attrapés ; `ROADMAP.md` mis à jour (5.5 ✅, 5.6 prochain chantier) ; 422 tests | — |
| 2026-10-03 | 2 · 5.6 | Lot 05 proposé : 37 entrées, 55 décisions de journal proposées (D0355 à D0409) ; いくら en `pronom` confirmé par la source ; premières ENTRY de `vocab-hors-jlpt.json` (`v_718`, `v_719`) ; essai à blanc : 237 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, aucun avertissement nouveau ; 1 nouveau test ; 423 tests | — |
| 2026-10-03 | 2 · 5.6b | Révision du lot 05 : 時計 et 荷物 en `category: null`, D0404 et D0408 réécrites à leur place en `categorie-nulle` ; aucune autre décision modifiée ; essai à blanc : 237 ENTRY, 30 retraits, 0 erreur, 0 attente, 2 `categorie-nulle` de plus ; refus vérifié sans justification ; 423 tests | — |
| 2026-10-03 | 2 · 5.6 | Validation du lot 05 : 37 entrées et 55 décisions passées en `validated` sans autre changement ; journal entier validé (409 décisions) ; assemblage réel : 237 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, 452 entrées encore à décider ; 16 `categorie-nulle`, dont 時計 et 荷物 couverts par D0404 et D0408 ; test d'état adapté ; 3 sabotages attrapés ; `ROADMAP.md` mis à jour (5.6 ✅, 5.7 prochain chantier) ; 423 tests | — |
| 2026-10-03 | 2 · 5.7 | Lot 06 proposé : 37 entrées, 46 décisions de journal proposées (D0410 à D0455) ; liste fermée `USUAL_FORM_IDS` (平仮名 → ひらがな), 2 tests et 2 sabotages ; essai à blanc : 274 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, 1 `categorie-nulle` de plus ; compteurs consignés comme point transversal ; 426 tests | — |
| 2026-10-03 | 2 · 5.7-C | Audit du champ `counter`, sans modification de données : `counter: null` correct partout ; la relation « se compte avec » (43 noms validés) est une question de conception distincte, non bloquante ; correction de ma présentation précédente (45 → 44 mentions, dont 1 faux positif, 時計) ; le lot 06 reste proposé, prêt à valider | — |
| 2026-10-03 | 2 · 5.7 | Validation du lot 06 : 37 entrées et 46 décisions passées en `validated` sans autre changement ; journal entier validé (455 décisions) ; assemblage réel : 274 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, 415 entrées encore à décider ; test d'état adapté (forme usuelle de 平仮名, aucun `counter` sur les noms comptés) ; 3 sabotages attrapés ; `ROADMAP.md` mis à jour (5.7 ✅, 5.8 prochain chantier) ; 426 tests | — |
| 2026-10-03 | 2 · 5.8 | Lot 07 proposé : 34 entrées, 48 décisions de journal proposées (D0456 à D0503) ; premier `counter` du corpus (匹, `small_animals`) ; essai à blanc : 308 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, 381 entrées restantes après le lot ; 1 nouveau test ; 427 tests | — |
| 2026-10-03 | 2 · 5.8 | Validation du lot 07 : 34 entrées et 48 décisions passées en `validated` sans autre changement ; journal entier validé (503 décisions) ; assemblage réel : 308 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, 381 entrées encore à décider ; A5 et A6 couverts (曇る, 吹く, 冷たい, 匹) ; nouveau test transversal des compteurs ; 4 sabotages attrapés, dont un sur un lot déjà validé ; `ROADMAP.md` mis à jour (5.8 ✅, 5.9 prochain chantier) ; 428 tests | — |
| 2026-10-03 | 2 · 5.9 | Lot 08 proposé : 29 entrées, 36 décisions de journal proposées (D0504 à D0539) ; essai à blanc : 337 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, 352 entrées restantes après le lot ; portée du test des compteurs explicitée dans son commentaire ; 1 nouveau test ; 429 tests | — |
| 2026-10-03 | 2 · 5.9 | Vérification de `suru_compatible: false`, sans modification de données : sens « non établi » confirmé par le schéma et par la pratique validée ; D0507 et D0519 conformes ; reformulation facultative proposée | — |
| 2026-10-03 | 2 · 5.9 | Validation du lot 08 : 29 entrées et 36 décisions passées en `validated` sans autre changement ; journal entier validé (539 décisions) ; assemblage réel : 337 ENTRY, 30 retraits, 0 problème, 0 erreur, 0 attente, 352 entrées encore à décider ; test d'état adapté (seul 質問 a `suru_compatible: true` dans le lot) ; 3 sabotages attrapés ; `ROADMAP.md` mis à jour (5.9 ✅, 5.10 prochain chantier) ; 429 tests | — |
| 2026-10-03 | 2 · 5.10 | Lot 09 proposé : 20 entrées (19 gardées, 散歩する fusionné dans 散歩 après confrontation des fiches), 35 décisions de journal proposées (D0540 à D0574) ; essai à blanc : 356 ENTRY, 31 retraits, 0 problème, 0 erreur, 0 attente, 332 entrées restantes après le lot ; 1 nouveau test ; 430 tests | — |
| 2026-10-03 | 2 · 5.10b | Révision du lot 09 : 釣り en `suru_compatible: false`, 国 à un sens ; D0554, D0568 et D0570 réécrites à leur place, aucune nouvelle décision ; essai à blanc inchangé : 356 ENTRY, 31 retraits, 0 erreur, 0 attente, 332 entrées restantes ; 430 tests | — |
| 2026-10-03 | 2 · 5.10 | Validation du lot 09 : 20 entrées et 35 décisions passées en `validated` sans autre changement ; journal entier validé (574 décisions) ; assemblage réel : 356 ENTRY, 31 retraits (dont `v_194 → v_193`), 0 problème, 0 erreur, 0 attente, 332 entrées encore à décider ; test d'état adapté (fusion de 散歩する ; `suru_compatible: true` seulement pour 散歩, 旅行, 帰国 dans le lot) ; 3 sabotages attrapés ; `ROADMAP.md` mis à jour (5.10 ✅, 5.11 prochain chantier) ; 430 tests | — |
| 2026-10-03 | 2 · 5.11 | Lot 10 proposé : 24 entrées, 56 décisions de journal proposées (D0575 à D0630), dont 22 rejets de `lieu_gare` motivés un par un ; 先 en classe `nom` ; essai à blanc : 380 ENTRY, 31 retraits, 0 problème, 0 erreur, 0 attente, 308 entrées restantes après le lot ; 1 nouveau test ; 431 tests | — |
