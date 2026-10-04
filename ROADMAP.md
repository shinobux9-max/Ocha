# Ocha v2 — Feuille de route

**Statut :** document de suivi global\
**Branche concernée :** `ocha-v2`\
**Dernière mise à jour :** 2026-10-03 (clôture du lot 09)

> Ce fichier répond à une question simple : **où en est Ocha v2, et que
> reste-t-il à faire jusqu'à la version finale ?**
>
> -   `ROADMAP.md` = vision globale, ordre des grands chantiers et
>     avancement.
> -   `ETAT-ACTUEL.md` = état technique détaillé de la tâche en cours.
> -   `docs/conception/` = cahier des charges verrouillé.
> -   `REGLES-CONSTRUCTION.md` = règles opérationnelles de construction.
>
> En cas de contradiction, la conception verrouillée et ses addenda
> validés font référence.\
> Cette roadmap ne crée **aucune nouvelle décision de conception**.

------------------------------------------------------------------------

## 1. Vue d'ensemble

La reconstruction officielle d'Ocha v2 suit les **étapes 0 à 7**
définies dans la conception.

| Étape | Objectif | État |
|---|---|---|
| **0 · Préparation** | Nouvelle branche, architecture, gouvernance, outils de validation et nettoyage initial | ✅ Terminée |
| **1 · Stockage et apprentissage** | IndexedDB, événements, états, SRS, faiblesses, budget, journal, déclarations | ✅ Terminée |
| **2 · Contenu et graphe** | Reconstruire les données canoniques et le graphe pédagogique | 🔵 **En cours** |
| **3 · Exercices** | Représentation, morphologie, exceptions et générateurs d'exercices | ⬜ À faire |
| **4 · Moteur guidé** | Composer les sessions, prioriser, rattraper, adapter et reprendre | ⬜ À faire |
| **5 · Interface** | Construire les écrans et connecter l'interface au nouveau moteur | ⬜ À faire |
| **6 · PWA et finitions** | Hors-ligne, musique, voix, persistance, export/import | ⬜ À faire |
| **7 · Bascule** | Remplacer l'application actuelle par Ocha v2 après validation finale | ⬜ À faire |

### Position actuelle

**Nous sommes dans l'Étape 2 · Contenu et graphe.**

Plus précisément :

**A2-04 · reconstruction du vocabulaire N5 → 5.11, lot 10 « Position, direction et
orientation ».**

Les lots 0 à 09 sont terminés et validés. Le périmètre du lot 10 est validé (24 entrées) ; sa
proposition est livrée (statut `proposed`) et en relecture. Le lot 11 traitera ensuite le système
démonstratif et interrogatif (こ・そ・あ・ど).

------------------------------------------------------------------------

## 2. Étape 0 · Préparation — ✅ TERMINÉE

Objectif : créer une base saine pour Ocha v2 sans modifier l'application
actuelle utilisée comme référence.

Principaux éléments réalisés :

-   branche `ocha-v2` ;
-   nouvelle arborescence ;
-   documents de gouvernance et de conception ;
-   `src/config.js` et paramètres centralisés ;
-   `tools/check-layers.mjs` ;
-   `tools/validate-data.mjs` ;
-   nettoyage structurel initial des données ;
-   validation initiale sans erreur.

**Condition de sortie : atteinte.**

------------------------------------------------------------------------

## 3. Étape 1 · Stockage et apprentissage — ✅ TERMINÉE

Objectif : construire le cœur pédagogique persistant avant le contenu,
les exercices et l'interface.

Les 13 tâches de l'étape ont été réalisées et validées.

Principaux composants :

-   contrat de stockage ;
-   stockage mémoire pour les tests ;
-   IndexedDB pour l'application ;
-   SRS (`gradeReview`, retard) ;
-   cinq états calculés ;
-   faiblesses ;
-   format des événements pédagogiques ;
-   effets des événements ;
-   déclarations « je connais » et annulation ;
-   pipeline central `recordLearningEvent` ;
-   journal et compaction ;
-   budget quotidien de nouveautés ;
-   gestion des échecs d'écriture ;
-   tests de bout en bout et navigateur.

**Principe fondamental :** toute progression pédagogique passe par
`recordLearningEvent`.

**Condition de sortie : atteinte.**

------------------------------------------------------------------------

## 4. Étape 2 · Contenu et graphe — 🔵 EN COURS

Objectif officiel : chargement du contenu, références normalisées
`{ type, id }`, graphe, relations dérivées et prise en charge de `forms`
/ `construction`.

Cette étape contient actuellement le plus gros chantier de
reconstruction des données.

------------------------------------------------------------------------

### 4.1 Architecture sémantique A2

#### A2-01 · Modèle lexical ENTRY → SENSE — ✅ TERMINÉ

Décisions principales :

-   `ENTRY` est l'unique unité d'apprentissage du vocabulaire ;
-   `SENSE` représente les sens sémantiques mais ne possède pas de
    progression indépendante ;
-   nouveaux identifiants vocabulaire `v_<n>` ;
-   nouveaux identifiants grammaire `g_<n>` ;
-   séparation claire entre graphies, lectures, informations
    linguistiques et sens ;
-   exemples retirés des ENTRY de vocabulaire ;
-   relations sémantiques portées par les SENSE ;
-   `category:null` et `semantic_type:null` encadrés par les addenda
    validés.

#### A2-02 · Registres fermés — ✅ TERMINÉ

Registres établis :

-   catégories ;
-   types sémantiques ;
-   dimensions ;
-   relations ;
-   fonctions linguistiques ;
-   classes grammaticales ;
-   compteurs ;
-   tags.

Les tags de lieu initiaux sont notamment :

-   `lieu_konbini` ;
-   `lieu_gare` ;
-   `lieu_restaurant` ;
-   `lieu_hotel`.

#### A2-03 · Validateur lexical — ✅ TERMINÉ

Le nouveau modèle lexical dispose d'un validateur strict couvrant
notamment :

-   schéma ENTRY ;
-   schéma SENSE ;
-   lectures et furigana ;
-   catégories et types ;
-   relations ;
-   références ;
-   tags ;
-   identifiants actifs et retirés.

Le validateur est déjà utilisé dans l'espace de reconstruction. Sa
bascule sur les données canoniques aura lieu lors de la publication
A2-04.

------------------------------------------------------------------------

### 4.2 Grammaire N5 — 🟡 STRUCTURE MIGRÉE, CONTENU À INTÉGRER

La grammaire n'est **pas oubliée**.

#### Déjà fait

-   **75 leçons de grammaire N5** conservées ;
-   anciens IDs `n5_g_<n>` remplacés par `g_<n>` ;
-   champ `level` explicite ;
-   références actives remappées ;
-   validation structurelle correspondante effectuée.

#### Reste à faire pendant l'Étape 2

-   écrire/valider les dépendances pédagogiques `requires` des leçons ;
-   intégrer la grammaire au graphe ;
-   vérifier les liens avec vocabulaire, kanji, expressions et activités
    ;
-   traiter les exemples de grammaire dans le futur registre commun de
    phrases/exemples ;
-   vérifier que le contenu grammatical est exploitable par les
    générateurs de l'Étape 3.

> La migration des IDs de grammaire est terminée ; cela ne signifie pas
> que tout le travail pédagogique sur les 75 leçons est terminé.

------------------------------------------------------------------------

### 4.3 G1 · Catalogue minimal / chargement — ✅ TERMINÉ

Réalisé :

-   catalogue minimal de contenu ;
-   `createContent(rawData)` pur ;
-   `elementExists` ;
-   `elementsOfScope` ;
-   `data/kana.json` canonique ;
-   210 kana conservés ;
-   intégration minimale CONTENT ↔ LEARNING.

------------------------------------------------------------------------

## 5. A2-04 · Reconstruction du vocabulaire N5 — 🔵 EN COURS

Objectif : reconstruire le vocabulaire N5 dans le nouveau format
canonique sans recopier aveuglément les défauts des anciens JSON.

### Méthode

Les anciennes données sont des **sources figées**.

La reconstruction se fait dans :

`reconstruction/a2-04/`

Chaque information est soit :

1.  **mécanique** : transformation déterministe ;
2.  **humaine** : décision proposée puis validée ;
3.  **mécanique sauf exception** : règle générale avec exceptions
    explicitement journalisées.

Une proposition n'est jamais considérée comme une décision tant qu'elle
n'est pas validée.

Le futur JSON canonique n'est publié qu'à la fin d'A2-04.

------------------------------------------------------------------------

### 5.1 Avancement des lots

| Sous-tâche | Contenu | État |
|---|---|---|
| **5.0** | Infrastructure de reconstruction | ✅ Terminée |
| **5.1 · lot 0** | Identité, doublons, fusions, graphies et lectures problématiques | ✅ Terminé |
| **5.2 · lot 01** | Personnes, famille, corps et santé | ✅ Terminé |
| **5.3 · lot 02** | Alimentation, boissons, repas et table | ✅ Terminé |
| **5.4 · lot 03** | Maison, habitat et vie domestique | ✅ Terminé |
| **5.5 · lot 04** | Ville, transports et déplacements | ✅ Terminé |
| **5.6 · lot 05** | Achats, vêtements et objets personnels | ✅ Terminé |
| **5.7 · lot 06** | École, apprentissage, langue et écrit | ✅ Terminé |
| **5.8 · lot 07** | Météo, saisons et nature | ✅ Terminé |
| **5.9 · lot 08** | Communication, correspondance et médias | ✅ Terminé |
| **5.10 · lot 09** | Loisirs, sorties et voyages | ✅ Terminé |
| **5.11 · lot 10** | Position, direction et orientation | 🟡 **Proposition livrée ; en relecture** |
| **5.12 → 5.15** | Lots thématiques suivants | ⬜ À faire |
| **5.16** | Passe finale : cohérence, relations, fusions restantes, tags, remappages | ⬜ À faire |
| **5.17** | Publication atomique du vocabulaire canonique | ⬜ À faire |

**Contenu de la publication 5.17** (plan écrit dans `docs/rapports/etape2-A2-03.md`, section 4,
rien de nouveau ici) :
- `validate-data` appelle le validateur lexical sur `data/` ;
- l'ancien contrôle du vocabulaire est retiré ;
- `lieux.json` passe de `vocab_categories` à `vocab_tags` ;
- les références des missions, lectures et expressions sont remappées vers les identifiants `v_<n>` ;
- `events.js` reçoit E1 à E4 ;
- les sections de format de `README.md` et `GUIDE-CONTENU.md` sont réécrites.

#### État chiffré après le lot 09

-   **356 ENTRY validées** dans la reconstruction, dont 2 hors JLPT ;
-   **31 identifiants retirés** (dont `掃除する`, `出ます` et `散歩する`) ;
-   **332 anciennes entrées encore à décider** ;
-   **574 décisions humaines validées** au journal ;
-   **1 compteur** (`匹`), seul `counter` du corpus ;
-   assemblage : **0 problème, 0 erreur, 0 attente**.

#### Lot 09 · clos

Thème : **Loisirs, sorties et voyages** (20 anciennes entrées : 19 gardées, 1 fusion). Arbitrages
appliqués :

-   `散歩する` fusionné dans `散歩` après confrontation des fiches (règle des formes en する du
    lot 03, appliquée cas par cas) ;
-   `suru_compatible: true` seulement quand la source établit la formation du verbe avec する
    (`散歩`, `旅行`, `帰国`) ; une construction nom + を + する ne suffit pas (`スポーツ`, `釣り`) ;
-   `国` à un sens, le pays d'origine dans la nuance ; aucun sens repris d'un homophone
    (`お釣り`, `引く`, `唄`).

#### Lot 10 · proposition en relecture

Thème : **Position, direction et orientation** (24 anciennes entrées, aucune fusion). Les 22
candidats `lieu_gare` sont rejetés un par un. Essai à blanc : **380 ENTRY**, **31 identifiants
retirés**, 0 problème, 0 erreur, 0 attente ; 308 entrées restantes après le lot.

**Prochaine action immédiate :** relire et arbitrer la proposition du lot 10, la réviser si
besoin, puis la valider avant de composer le lot 11 (5.12, démonstratifs et interrogatifs).

------------------------------------------------------------------------

## 6. A2-05 · Audit global du vocabulaire — ⬜ À FAIRE

A2-05 intervient **après la publication/reconstruction A2-04 et avant la
construction complète du graphe G2–G9**.

Objectifs :

-   relire un échantillon significatif ;
-   vérifier les statistiques du corpus ;
-   rechercher les incohérences entre lots ;
-   vérifier les catégories, types, fonctions et tags ;
-   rechercher les doublons ou fusions oubliés ;
-   contrôler les décisions transversales ;
-   produire un rapport d'audit.

Points déjà réservés pour cet audit :

-   certains tags `lieu_restaurant` décidés dans le lot 0 ;
-   cohérence globale des tags de lieu ;
-   stabilité des identifiants de SENSE après la publication : réordonner des sens ne doit
    jamais les renuméroter ;
-   recoupement des avertissements `categorie-nulle` (A5) et `type-nul` (A6) avec leurs
    justifications au journal ;
-   anomalies de données kanji : `醤` absent des kanji connus, cinq clés du dictionnaire qui
    sont des mots (山羊, 生活, 措置, 継続, 迅速) ;
-   anomalies ou décisions transversales découvertes pendant les lots.

------------------------------------------------------------------------

## 7. Graphe pédagogique G2–G9 — ⬜ À FAIRE

Le graphe complet sera construit **sur le corpus canonique audité**, pas
sur les anciens JSON.

Il devra relier les éléments pédagogiques avec les références
normalisées `{ type, id }`.

Le graphe couvrira notamment :

-   vocabulaire ;
-   SENSE lorsqu'une relation sémantique le demande ;
-   grammaire ;
-   kanji ;
-   kana lorsque pertinent ;
-   expressions ;
-   activités et contenu qui enseignent ou utilisent ces éléments ;
-   `requires` ;
-   `teaches` ;
-   `uses` ;
-   relations dérivées ;
-   `forms` / `construction`.

La conception détaillée des tâches G2 à G9 reste celle des documents de
l'Étape 2 et devra être suivie tâche par tâche.

------------------------------------------------------------------------

## 8. Registre commun de phrases et exemples — ⬜ À FAIRE AVANT L'ÉTAPE 3

Les exemples ne doivent plus être enfermés directement dans les fiches
de vocabulaire.

Un registre commun devra être reconstruit à partir des sources
existantes.

Il devra pouvoir référencer précisément :

-   une ENTRY de vocabulaire ;
-   éventuellement un SENSE ;
-   une ou plusieurs leçons de grammaire ;
-   les kanji concernés ;
-   les autres éléments nécessaires.

Sources à reprendre/auditer :

-   anciens exemples du vocabulaire ;
-   `data/n5/exemples.json` ;
-   exemples des leçons de grammaire ;
-   autres phrases utiles des contenus existants.

Le format canonique exact du registre de phrases doit être fixé dans ce
chantier ; il ne doit pas être inventé silencieusement avant.

**Condition importante :** le registre N5 nécessaire aux générateurs
doit exister avant l'Étape 3.

------------------------------------------------------------------------

## 9. Clôture de l'Étape 2 — ⬜ À FAIRE

L'Étape 2 pourra être fermée lorsque les données nécessaires aux
exercices seront canoniques, validées et reliées.

Cela implique au minimum :

-   vocabulaire N5 reconstruit et audité ;
-   grammaire N5 correctement identifiée et intégrée ;
-   kana canoniques ;
-   kanji nécessaires intégrés au catalogue/graphe ;
-   expressions intégrées ;
-   graphe construit et validé ;
-   dépendances pédagogiques nécessaires définies ;
-   phrases/exemples nécessaires disponibles ;
-   validations et tests de l'Étape 2 verts.

------------------------------------------------------------------------

## 10. Étape 3 · Exercices — ⬜ À FAIRE

Objectif officiel : **représentation, morphologie, exceptions et
générateurs**.

Le chantier devra transformer le contenu canonique en exercices
réellement utilisables.

Il couvrira notamment les mécanismes définis dans
`partie-5-exercices.md` :

-   représentation adaptative ;
-   morphologie ;
-   formes ;
-   constructions ;
-   générateurs ;
-   naturel et registre ;
-   exploitation du vocabulaire, de la grammaire, des kanji et des
    phrases.

Les tests bloquants prévus par la conception devront accompagner les
modules.

**Dépendance : Étape 2 terminée.**

------------------------------------------------------------------------

## 11. Étape 4 · Moteur guidé — ⬜ À FAIRE

Objectif : décider **quoi faire apprendre ou réviser, dans quel ordre et
dans quelle session**.

À construire notamment :

-   composition des sessions par rôles ;
-   priorisation ;
-   éléments en retard ;
-   faiblesses ;
-   rattrapage ;
-   nouveautés ;
-   budget quotidien ;
-   limites de nouveautés par session ;
-   adaptation ;
-   reprise d'une session interrompue ;
-   motifs de sélection ;
-   planification du réapprentissage.

Les cinq scénarios de référence A à E de la conception doivent devenir
des scénarios automatiques.

**Dépendance : exercices disponibles et système d'apprentissage de
l'Étape 1 déjà opérationnel.**

------------------------------------------------------------------------

## 12. Étape 5 · Interface — ⬜ À FAIRE

L'interface ne doit être reconstruite qu'à cette étape.

Ordre prévu par la conception :

1.  design system ;
2.  navigation ;
3.  header et barre du bas ;
4.  panneau de paramètres ;
5.  accueil ;
6.  session guidée ;
7.  Réviser ;
8.  Apprendre et bibliothèque ;
9.  Pratiquer ;
10. Explorer ;
11. Lire ;
12. recherche ;
13. dossiers ;
14. premier lancement.

La maquette existante sert de **référence visuelle**, pas de base de
code à recopier.

L'Explorer pourra notamment exploiter les tags reconstruits pendant
A2-04.

À cette étape devront également être résolus les éléments d'interface
volontairement reportés, par exemple l'accès aux dossiers.

------------------------------------------------------------------------

## 13. Étape 6 · PWA et finitions — ⬜ À FAIRE

Objectif : rendre Ocha v2 robuste dans son usage réel.

Prévu par la conception :

-   service worker ;
-   fonctionnement hors ligne ;
-   cache des données et ressources ;
-   musique ;
-   voix ;
-   demande de stockage persistant ;
-   export ;
-   import ;
-   tests d'éviction et de fonctionnement hors ligne.

L'état pédagogique reste dans IndexedDB ; les paramètres utilisateur
restent séparés.

------------------------------------------------------------------------

## 14. Étape 7 · Bascule — ⬜ À FAIRE

Dernière étape.

La branche `ocha-v2` ne remplace l'application actuelle qu'une fois les
tests verts.

Avant la bascule :

-   toute la suite automatique doit être verte ;
-   les critères bloquants doivent être satisfaits ;
-   les parcours réels doivent être testés ;
-   les critères de qualité et d'ergonomie doivent être vérifiés ;
-   les tests hors ligne doivent être concluants ;
-   aucune dépendance à l'ancienne application ne doit rester nécessaire
    au fonctionnement de v2.

Ensuite seulement :

**`ocha-v2` devient la nouvelle application Ocha.**

------------------------------------------------------------------------

## 15. Vue condensée jusqu'à Ocha v2

``` text
0 · Préparation
   ✅

1 · Stockage & apprentissage
   ✅

2 · Contenu & graphe
   🔵 EN COURS
   │
   ├── A2-01 Modèle lexical                 ✅
   ├── Grammaire : nouveaux IDs             ✅
   ├── G1 Catalogue minimal                 ✅
   ├── A2-02 Registres                      ✅
   ├── A2-03 Validateur lexical             ✅
   │
   ├── A2-04 Vocabulaire N5                 🔵
   │   ├── 5.0 Infrastructure               ✅
   │   ├── Lot 0 Identité                   ✅
   │   ├── Lot 01 Personnes                 ✅
   │   ├── Lot 02 Alimentation              ✅
   │   ├── Lot 03 Maison                    ✅
   │   ├── Lot 04 Ville (5.5)               ✅
   │   ├── Lot 05 Achats (5.6)              ✅
   │   ├── Lot 06 École (5.7)               ✅
   │   ├── Lot 07 Météo, nature (5.8)       ✅
   │   ├── Lot 08 Communication (5.9)       ✅
   │   ├── Lot 09 Loisirs, voyages (5.10)   ✅
   │   ├── Lot 10 Position (5.11)           🟡
   │   ├── Lots suivants                    ⬜
   │   ├── 5.16 Passe finale                ⬜
   │   └── 5.17 Publication                 ⬜
   │
   ├── A2-05 Audit vocabulaire              ⬜
   ├── G2–G9 Graphe                         ⬜
   ├── Grammaire : dépendances/intégration  ⬜
   ├── Registre phrases/exemples            ⬜
   └── Clôture Étape 2                      ⬜

3 · Exercices
   ⬜

4 · Moteur guidé
   ⬜

5 · Interface
   ⬜

6 · PWA & finitions
   ⬜

7 · Bascule
   ⬜

🎯 OCHA v2
```

------------------------------------------------------------------------

## 16. Règles de mise à jour de cette roadmap

Ce fichier doit rester **synthétique**.

Après une tâche importante :

1.  mettre à jour `ETAT-ACTUEL.md` avec le détail technique ;
2.  mettre à jour `ROADMAP.md` seulement si l'avancement global change ;
3.  ne jamais transformer un point ouvert en décision simplement pour
    compléter la roadmap ;
4.  ne jamais ajouter une nouvelle étape de conception sans arbitrage
    explicite ;
5.  conserver l'ordre officiel des étapes 0 à 7 ;
6.  une tâche n'est marquée `✅` qu'après validation et tests attendus ;
7.  utiliser :
    -   `✅` terminé et validé ;
    -   `🔵` chantier actuellement en cours ;
    -   `🟡` préparé ou partiellement réalisé ;
    -   `⬜` à faire ;
    -   `⛔` bloqué, uniquement lorsqu'un blocage réel existe.

------------------------------------------------------------------------

## 17. Points à faire confirmer lors de la validation de ce fichier

Cette roadmap synthétise l'état actuel mais **ne tranche pas** les
points suivants :

-   détail exact du découpage des futurs lots A2-04 après le lot 03 ;
-   convention globale des lectures des emprunts en katakana ;
-   éventuelle correction de l'identifiant de catégorie `ufs` ;
-   procédure d'enrichissement des lectures absentes des sources, par
    exemple `家 → うち` ;
-   représentation future des affixes comme `〜方` ;
-   format final et identifiant du registre de phrases/exemples ;
-   ordre fin entre certaines tâches du graphe, de la grammaire et du
    registre de phrases lorsque leurs dépendances seront précisées ;
-   placement de la tâche de données sur les anomalies kanji (dictionnaire, `醤`) ;
-   relation « se compte avec » (audit 5.7-C) : les sources disent avec quel compteur on compte
    de nombreux noms ; ce n'est pas le champ `counter` (réservé aux ENTRY qui sont des compteurs,
    comme 匹), qui est correct partout ; faut-il modéliser cette relation, et sous quelle forme ?
    Non bloquant : les sources figées permettront de l'extraire plus tard ;
-   migration future du N4, qui devra reprendre la méthode de
    reconstruction adaptée au format v2 avant son intégration au moteur
    guidé.

Ces points doivent rester ouverts tant qu'une décision explicite n'a pas
été prise.
