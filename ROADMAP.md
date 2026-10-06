# Ocha v2 — Feuille de route

**Statut :** document de suivi global\
**Branche concernée :** `ocha-v2`\
**Dernière mise à jour :** 2026-10-06 (validation du lot 22)

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

**A2-04 · reconstruction du vocabulaire N5 → périmètre du lot 23, après le point d'arrêt normatif
(addendum A9 validé : six fonctions définies). Il reste 28 entrées, sans aucun verbe ; など est hors
du lot 23, sa classe fera l'objet d'un préalable à part.** Les lots 0 à 22 sont validés.

Les lots 0 à 20 sont terminés et validés. Le chantier 5.13-C (furigana qui contredisaient les kana,
y compris dans des lots validés) est clos : l'addendum A8 est validé et implémenté, et les 13
entrées validées concernées sont corrigées et revalidées.

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
| **5.11 · lot 10** | Position, direction et orientation | ✅ Terminé |
| **5.12 · lot 11** | Démonstratifs, interrogatifs et pronoms (こ・そ・あ・ど) | ✅ Terminé |
| **5.13 · lot 12** | Temps relatif, moments de la journée et fréquence | ✅ Terminé |
| **5.13-C** | Chantier transversal des furigana : addendum A8, correction des entrées validées | ✅ Terminé |
| **5.14 · lot 13** | Calendrier, dates et durées | ✅ Terminé |
| **5.15 · lot 14** | Nombres, compteurs et mesures | ✅ Terminé |
| **Lot 15** | Couleurs, formes, dimensions et poids | ✅ Terminé |
| **Lot 16** | Préférences, appréciations et états de la personne | ✅ Terminé |
| **Lot 17** | États et propriétés descriptives | ✅ Terminé |
| **Lot 18** | Actions sur les objets | ✅ Terminé |
| **Lot 19** | Vie quotidienne, travail et échanges | ✅ Terminé |
| **Lot 20** | Existence, possession, action et déroulement | ✅ Terminé |
| **Lot 21** | Fréquence, répétition et repères temporels | ✅ Terminé |
| **Lot 22** | Manière, identité, diversité et probabilité | ✅ Terminé |
| **Lots suivants** | Lots thématiques restants, désignés par leur numéro de lot (28 entrées, sans aucun verbe ; une décision normative sur les fonctions précède le lot 23) | ⬜ À faire |
| **5.16** | Passe finale : cohérence, relations, fusions restantes, tags, remappages | ⬜ À faire |
| **5.17** | Publication atomique du vocabulaire canonique | ⬜ À faire |

**Numérotation** (arbitrage du 2026-10-05) : à partir du lot 15, un lot est désigné par son numéro
(« A2-04 · lot 15 »), sans nouveau numéro de sous-tâche. **5.16** reste la passe finale et **5.17**
la publication, quel que soit le nombre de lots.

**Contenu de la publication 5.17** (plan écrit dans `docs/rapports/etape2-A2-03.md`, section 4,
rien de nouveau ici) :
- `validate-data` appelle le validateur lexical sur `data/` ;
- l'ancien contrôle du vocabulaire est retiré ;
- `lieux.json` passe de `vocab_categories` à `vocab_tags` ;
- les références des missions, lectures et expressions sont remappées vers les identifiants `v_<n>` ;
- `events.js` reçoit E1 à E4 ;
- les sections de format de `README.md` et `GUIDE-CONTENU.md` sont réécrites.

#### État chiffré après le lot 22

-   **657 ENTRY validées** dans la reconstruction, dont 2 hors JLPT ;
-   **34 identifiants retirés** ;
-   **28 anciennes entrées encore à décider**, dont aucun verbe ;
-   **1 435 décisions humaines validées** au journal ;
-   **1 compteur** (`匹`), seul `counter` du corpus ; **2 suffixes** (`半`, `辺`) ;
-   assemblage : **0 problème, 0 erreur, 0 attente**.

#### Lot 11 · clos

Thème : **Démonstratifs, interrogatifs et pronoms** (34 anciennes entrées, aucune fusion),
traité comme un système. Arbitrages appliqués :

-   5 exceptions de classe ajoutées ; classes décidées sur les fiches, la cohérence du paradigme
    servant de contrôle : 25 pronoms, 5 déterminants (dont `こんな`), 4 adverbes ;
-   **addendum A7** : définition opérationnelle de `deictique` (personne, espace, temps) ; `私`
    et `あなた` la portent, pas `自分` (réfléchi), `誰か` ni `皆` ; audit rétroactif de la deixis
    temporelle réservé à A2-05 ;
-   paradigme asymétrique assumé (les fiches ne sont pas symétriques) ; `どちら` à trois sens ;
    aucune forme absente complétée.

#### Chantier 5.13-C · furigana · clos

Le contrôle du lot 12 a montré que des furigana contredisaient les kana, y compris dans des lots
validés, et que le validateur ne le contrôlait pas.

-   **Addendum A8** (`docs/conception/addendum-A8-furigana.md`) : la lecture recomposée des
    furigana est égale aux kana (I4 et I5 complétés, erreur bloquante) ; les lectures spéciales
    d'une liste fermée s'écrivent en bloc. Le validateur et la reconstruction l'appliquent.
-   **13 entrées validées corrigées** (lots 00, 01, 03, 05, 08, 09) : rouvertes, corrigées par 13
    décisions nouvelles (D0827 à D0839), puis revalidées. Les décisions historiques sont intactes.
    Rapport : `docs/rapports/etape2-tache5-13c-valide.md`.

#### Lot 12 · clos

Thème : **Temps relatif, moments de la journée et fréquence** (31 anciennes entrées, aucune
fusion, aucun tag de lieu), premier lot de l'axe temporel d'A7 : 20 sens déictiques, dans 20
entrées ; 11 entrées sans fonction déictique. La révision 5.13b y a décidé cinq lectures rendues
décidables par A8 (今年, 今朝, 昨夜 en bloc ; 近々 ; 夕方) et fondé le bloc de 昨日 sur la nécessité.
97 décisions (D0735 à D0826, D0840 à D0844).

#### Lot 13 · clos

Thème : **Calendrier, dates et durées** (27 anciennes entrées, aucune fusion, aucun tag de lieu) :
7 jours de la semaine, 10 jours du mois, 5 durées et unités, 5 repères du calendrier, dont 夏休み.
42 sens, 109 décisions (D0845 à D0953). Arbitrages appliqués :

-   jours du mois à deux sens, la date et la durée, dans l'ordre de chaque fiche ; durées en
    `quantite_valeur` ;
-   後 à trois sens, `deictique` sur le sens temporel (seul sens déictique du lot) ;
-   半 porte `suffix` ; 時間 reste sans `counter`, le registre des compteurs n'ayant aucune
    compatibilité pour une durée (point laissé ouvert) ;
-   aucune forme absente complétée (ついたち, noms des mois).

#### Lot 14 · clos

Thème : **Nombres, compteurs et mesures** (29 anciennes entrées, aucune fusion, aucun tag) : 12
nombres simples, 9 de la série en つ, 3 de personnes et d'âge, 4 mesures, ページ. 38 sens, 72
décisions (D0954 à D1025). Arbitrages appliqués :

-   série en つ en classe `nom`, à deux sens (objets, âge) sauf 一つ ; âge chiffré en
    `quantite_valeur` ; ce n'est pas une règle générale sur les emplois avec compteur ;
-   une **liste fermée des lectures fautives connues**, limitée à 九つ, rend sa lecture décidable ;
    elle est corrigée en ここのつ dans le lot, sans toucher aux sources ;
-   unités en type nul ; aucun `counter` ; aucune forme ni lecture absente complétée.

#### Lot 15 · clos

Thème : **Couleurs, formes, dimensions et poids** (29 anciennes entrées, aucune fusion, aucun tag) :
13 couleurs, 4 de taille, 9 dimensions, 3 de forme et de poids. 36 sens, 50 décisions (D1026 à
D1075). Arbitrages appliqués :

-   `大きな` et `小さな` en classe `determinant`, chacune sur sa fiche ; `色` sans `suffix` ;
-   seconds sens de `青`, `青い` et `緑` (la verdure en `groupe_collectif`) ; `薄い` à trois sens ;
-   un seul sens pour `長い`, `短い`, `低い` et `大きな` : la durée, le prix et la voix, attestés par les
    fiches, sont conservés en nuance ; ce n'est pas une règle générale, et aucune symétrie n'est
    imposée entre deux entrées ;
-   le poids sans catégorie (A5) ; aucune relation, aucune forme ni lecture absente complétée.

#### Lot 16 · clos

Thème : **Préférences, appréciations et états de la personne** (21 anciennes entrées, toutes des
adjectifs ; aucune fusion, aucun tag) : 5 préférences et désirs, 2 de plaisir et d'intérêt, 4 de
compétence et de difficulté, 6 d'appréciation et de valeur, 4 états de la personne. 22 sens, 51
décisions (D1076 à D1126). Arbitrages appliqués :

-   traductions françaises naturelles lorsque la fiche les atteste (`好き` « Aimer », `欲しい`
    « Vouloir », `暇` « Libre »), sans toucher à la classe japonaise ;
-   un axe d'A2-DIM lorsqu'il décrit directement le sens : `易しい`, `難しい`, `大切`, `便利` ;
-   emplois d'adresse conservés en nuance (`嫌`, `悪い`, `危ない`) ; douze catégories nulles (A5) ;
-   `立派` à deux sens ; la nuance de `好き` suit son exemple (が avant 好き), contre la source.

#### Lot 17 · clos

Thème : **États et propriétés descriptives** (17 anciennes entrées, toutes des adjectifs ; aucun
tag) : âge, force et solidité, vitesse, propreté, bruit et animation, température, lumière. 25
sens, 41 décisions (D1127 à D1167). Arbitrages appliqués :

-   **`暖かい` (lot 07, validée) rouverte et fusionnée dans `温かい`** : même unité lexicale (A3, L3) ;
    le plus petit numéro survit (A3, L2), sans exception. La réouverture est explicite et
    journalisée ; les décisions historiques ne sont pas modifiées. L'ENTRY survivante porte les deux
    graphies et deux sens, un par fiche ;
-   deux sens lorsque la fiche décrit deux référents (`丈夫`, `遅い`, `汚い`, `清い`, `うるさい`,
    `爽やか`, `暗い`) ; un seul pour `強い`, `弱い` et `若い`, l'intensité étant conservée en nuance ;
-   `古い` et `新しい` dans le temps ; neuf catégories nulles (A5) ; aucune dimension.

#### Lot 18 · clos

« Actions sur les objets » : **23 verbes, 34 sens, 73 décisions** (D1168 à D1240).

-   **aucune relation** : `transitive_of` et `intransitive_of` sont reportées à la passe finale
    5.16 ; quatre paires y sont candidates (`開く` / `開ける`, `閉まる` / `閉める`, `消える` /
    `消す`, `並ぶ` / `並べる`), inscrites au journal ;
-   deux confusions de la source écartées et journalisées : « prendre une photo » (`取る`, renvoi
    vers `撮る`) et « jouer d'un instrument » (`引く`, renvoi vers `弾く`) ;
-   un événement et l'état qui en résulte ne sont pas deux traductions (`開く`, `閉まる`) ;
-   particules décidées pour les entrées à plusieurs sens, prises dans la fiche seulement ; deux
    lectures corrigées (`閉まる`, `作る`) ; 23 catégories nulles (A5).

#### Lot 19 · clos

« Vie quotidienne, travail et échanges » : **26 entrées (20 verbes, 6 noms), 34 sens, 61
décisions** (D1241 à D1301).

-   **aucune relation** ; candidates à l'audit de 5.16 : `貸す` / `借りる` (`reciprocal_with`) et
    `渡す` / `渡る` ;
-   l'état résultant traité fiche par fiche : en nuance pour `立つ`, `座る` et `疲れる` ;
    « Dormir » reste un sens de `寝る`, de type `etat` ;
-   `suru_compatible` : `true` pour `結婚` et `生活`, `false` pour `仕事` ; `コピーする`
    reste une ENTRY de verbe ;
-   deux référents de types différents font deux sens (`煙草` : la cigarette, le tabac) ; une
    catégorie ne s'impose pas quand la fiche déborde son domaine (`死ぬ`) ; 15 catégories nulles ;
-   deux lectures corrigées (`借りる`, `待つ`) ; les furigana de `頼む` restent à traiter à la
    passe finale, avant publication.

#### Lot 20 · clos

« Existence, possession, action et déroulement » : **22 entrées (les 14 derniers verbes et 8
noms), 30 sens, 68 décisions** (D1302 à D1369).

-   **aucune fonction linguistique** sans définition normative (ni `modalite`, ni `aspect`, ni
    `deictique` pour `次`) ; **aucune relation**, les candidates à 5.16 étant `する` / `やる`
    et `やる` / `上げる` ;
-   « Y avoir » en traduction principale de `ある` et de `居る`, deux mots distincts de `要る` ;
-   `resultat` pour « être achevé » (`出来る`), `propriete` pour un prix ou un coût (`する`,
    `かかる`) ; trois dimensions (`要る`, `出来る`, `違う`) ; `声` sans type ;
-   `suffix` pour `辺` ; la graphie `掛かる` pour `かかる` ; 20 catégories nulles, aucune
    n'étant cherchée pour réduire les avertissements ;
-   le lot « quantité et degré » reste fermé (`他` et `大勢` hors du lot).

#### Lot 21 · clos

« Fréquence, répétition et repères temporels » : **12 entrées (11 adverbes, 1 adjectif), 16 sens,
34 décisions** (D1370 à D1403).

-   **aucune fonction linguistique** sans définition normative ; **aucune entrée ne porte
    `deictique`**, `すぐに` compris (absence de délai par rapport à un repère, contrairement à
    `近々`) ; **aucune relation**, aucune candidate à 5.16 ;
-   `よく` reste distincte de `いい` (deux sens : souvent ; bien), la remarque « issu de ii / yoi »
    étant conservée en nuance, attribuée à la fiche ;
-   `また`, `まだ` et `もう` à deux sens ; `また`, sens 2 (« aussi, de plus »), sans catégorie ni
    type (A5, A6) ;
-   fréquences en `temps › fréquence`, `まだ`, `もう` et `すぐに` en `temps › relations
    temporelles`, `早い` en `temps` comme « en retard » (`遅い`) ; 5 catégories nulles ;
-   la lecture de `もう一度` corrigée avec les furigana de l'exemple de sa propre fiche.

#### Lot 22 · clos

« Manière, identité, diversité et probabilité » : **9 entrées (7 gardées, 2 fusions), 9 sens, 32
décisions** (D1404 à D1435).

-   **弱く fusionnée dans 弱い**, sans réouverture ni sens nouveau sur 弱い ; **ゆっくりと fusionnée
    dans ゆっくり**, と non régie ;
-   **aucune fonction linguistique** sans définition normative, **aucune relation** ;
    « Français » de `まっすぐ` écarté comme confusion de la source ;
-   `ゆっくり` à deux sens (« Lentement », `vitesse` ; « Tranquillement », sans catégorie) ;
    `まっすぐ`, sens 1, en `parcours_trajectoire` ; `同じ` en `determinant`, `一緒` en `nom` ;
-   `たぶん` avec la dimension `probabilite` et sans type (A6) ; 6 catégories nulles.

**Prochaine action immédiate :** commit puis push du lot 22, chacun sur un accord explicite ;
ensuite seulement, le point d'arrêt normatif : les 28 entrées restantes dépendent toutes de
fonctions linguistiques sans définition normative (`connecteur`, `discours`, `politesse`,
`quantificateur`, `comparatif`, `intensifieur`). Le lot 23 n'est pas préparé.

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
-   **audit rétroactif de la deixis temporelle** (réservation de l'addendum A7) : tous les sens
    déjà validés susceptibles de relever de `deictique` sur l'axe du temps, au minimum `おととし`
    (lot 0) et `近く` « prochainement » (lot 10) ;
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
   │   ├── Lot 10 Position (5.11)           ✅
   │   ├── Lot 11 こそあど (5.12)            ✅
   │   ├── Lot 12 Temps relatif (5.13)      ✅
   │   ├── 5.13-C Furigana (A8)             ✅
   │   ├── Lot 13 Calendrier (5.14)         ✅
   │   ├── Lot 14 Nombres (5.15)            ✅
   │   ├── Lot 15 Couleurs, dimensions      ✅
   │   ├── Lot 16 Préférences, états        ✅
   │   ├── Lot 17 États, propriétés         ✅
   │   ├── Lot 18 Actions sur les objets    ✅
   │   ├── Lot 19 Vie quotidienne           ✅
   │   ├── Lot 20 Existence, action         ✅
   │   ├── Lot 21 Fréquence, répétition     ✅
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

-   détail exact du découpage des lots A2-04 restants (chaque lot est composé par identifiants,
    puis validé, avant toute proposition) ;
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
