# Ocha v2 — Feuille de route

**Statut :** document de suivi global\
**Branche concernée :** `ocha-v2`\
**Dernière mise à jour :** 2026-10-18 (A2-05 en cours : volet 2 arbitré ; volet 1 : lots 1 et 2 arbitrés, lot 3 en cours, bloc A clos, 148 candidats arbitrés sur 377 ; volet 3 non commencé ; 185 corrections retenues, aucune appliquée)

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

**A2-04 · reconstruction du vocabulaire N5 → toutes les entrées sont décidées.** Les lots 0 à 25 sont
validés (など retirée sans successeur au lot 25) ; l'addendum A9 (six fonctions linguistiques) est
validé. **La passe finale 5.16 est terminée** (lot 26, validé le 2026-10-07, committé `9f3dc2b` et
poussé). **La publication 5.17 est faite** (committée `3d67594` et poussée le 2026-10-07) : le
vocabulaire canonique est dans `data/`, **A2-04 est terminé**. **Chantier en cours : A2-05**, l'audit
global du vocabulaire (section 6). L'audit un par un des `null` est arbitré ; ses corrections ne sont
pas appliquées, et le point de sortie de l'étape 2 n'est pas atteint.

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

## 5. A2-04 · Reconstruction du vocabulaire N5 — ✅ TERMINÉE

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
| **Préalable A9** | Point d'arrêt normatif : six fonctions A2-LING définies (addendum A9) | ✅ Terminé |
| **Lot 23** | Liaison, échange et formules sociales | ✅ Terminé |
| **Lot 24** | Quantité, degré et comparaison | ✅ Terminé |
| **Lot 25** | Retrait de など (préalable sur sa classe) | ✅ Terminé |
| **5.16 · lot 26** | Passe finale : cohérence, relations, fusions restantes, tags, remappages | ✅ Terminé |
| **5.17** | Publication atomique du vocabulaire canonique | ✅ Terminé (`3d67594`, poussé) |

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

#### État chiffré après le lot 26

-   **684 ENTRY validées** dans la reconstruction, dont 2 hors JLPT ;
-   **35 identifiants retirés** : 33 fusions, `v_717` (A3, d'emblée) et `v_602` (など, lot 25), sans
    successeur ;
-   **aucune ancienne entrée encore à décider** ; l'assemblage complet est sans problème ;
-   **1 613 décisions humaines validées** au journal (D0001 à D1613) ;
-   **22 relations** entre sens, notées une seule fois chacune (lot 26) ;
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

#### Préalable A9 · clos

Point d'arrêt normatif sur les fonctions A2-LING : **addendum A9** validé (`fac6a60`), qui définit
`connecteur`, `discours`, `politesse`, `quantificateur`, `comparatif` et `intensifieur`, sur le
modèle d'A7 : attribution par le sens modélisé, jamais par la classe ; cumul sous conditions ; また,
sens 2, réservée à l'audit A2-05 ; など hors du lot 23.

#### Lot 23 · clos

« Liaison, échange et formules sociales » : **13 entrées, 22 sens, 74 décisions** (D1436 à D1509).

-   **première application d'A9**, sens par sens : `connecteur` 8, `discours` 10, `politesse` 5,
    `intensifieur` 1 ; cumul `discours` + `politesse` pour la seule prise de congé « polie »
    (`では`, `それでは`) ;
-   un sens par emploi établi par la fiche : trois pour `では`, `それでは`, `じゃ` ; deux pour
    `じゃあ`, `いいえ` (« De rien »), `どうも` (« Vraiment ») ;
-   `じゃ` et `じゃあ` deux ENTRY ; `じゃ` en `interjection`, la classe suivant la fiche ;
-   aucune catégorie, 22 types nuls justifiés ; l'exemple altéré de `いいえ` journalisé.

#### Lot 24 · clos

« Quantité, degré et comparaison » : **14 entrées, 20 sens, 59 décisions** (D1510 à D1568).

-   A9 appliqué sens par sens : `quantificateur` 4, `intensifieur` 5, `comparatif` 2, `politesse` 1 ;
    cumul `comparatif` + `intensifieur` pour `もっと` ;
-   aucune fonction pour un prédicat de quantité (`多い`, `少ない`, `大勢`) ; première application des
    catégories de quantité ;
-   `少し` à trois sens ; `ちょっと`, `結構`, `一番`, `大体` à deux ; `ちょうど` sans fonction ni
    catégorie, axe `exactitude`.

Committé (`affa45e`) et poussé.

#### Préalable sur など et lot 25 · clos

La fiche de `など` ne dit que « particule suffixe » ; aucune des dix classes du registre n'est
attestée. Arbitrage : retrait sans successeur (A3, L8), sans classe ni addendum, et sans règle
générale sur les particules. Lot 25 « Retrait de など » : **1 entrée, 1 décision** (D1569, `retrait`).
Les 3 phrases rangées sous `n5_v_602` sont pour 5.16.

Committé (`b3740c7`) et poussé.

#### Passe finale 5.16 · lot 26 « Passe finale » · clos

Périmètre arbitré (neuf questions), proposition relue et révisée, puis **validée le 2026-10-07**
(rapport `docs/rapports/etape2-A2-04-lot26-valide.md`). Le lot ne décide aucune entrée nouvelle : il
**rouvre 19 ENTRY validées** dans leur lot d'origine, par **44 décisions** (D1570 à D1613).

-   **22 relations** pour les quinze candidates inscrites (R1 à R15) : `transitive_of` (cinq paires),
    `equivalent_to`, `similar_to`, `opposed_to`, `reciprocal_with` ; chacune notée une seule fois
    (I12) ; aucun balayage global ;
-   **`頼む`** : furigana corrigés (`READING_EXCEPTION_IDS`) ; **`煙草`** : forme usuelle `たばこ`
    (`USUAL_FORM_IDS`), `煙草` en autre graphie ; `居る` et `すぐに` inchangées ;
-   **constats** : assemblage complet sans problème, 35 retraits, aucune fusion restante, 71
    références remappées sans perte ;
-   **table de correspondance d'`exemples.json`** fixée et vérifiée, sans réécriture : les 3 phrases
    de `など` iront au point de grammaire `g_27`, à la tâche 11 ;
-   **hors 5.16** : aucun tag de lieu (5.17 et A2-05) ; rien n'est écrit dans `data/` (5.17).

Committé (`9f3dc2b`) et poussé : `ocha-v2` et `origin/ocha-v2` sont à `9f3dc2b`. **Le travail 5.16
est terminé ; aucune action 5.16 ne reste.**

#### Publication 5.17 · faite, committée et poussée

Le périmètre est recensé dans `docs/rapports/etape2-A2-04-lot27-perimetre-5-17.md` (le préfixe
`lot27` sert à l'export ; il n'existe aucun lot 27), et **arbitré le 2026-10-07** (§9) : un essai dans
l'arbre de travail puis un seul commit ; une commande de publication et un test permanent ; statu quo
pour les lectures des mots en katakana et pour 家 ; un baseline des avertissements ; l'espace de
reconstruction reste la source de vérité éditoriale. La **proposition d'exécution** est dans
`docs/rapports/etape2-A2-04-lot27-proposition-5-17.md`. Ce qui suit est le recensement d'origine,
écrit avant l'exécution.

-   **déjà décidé, à appliquer** : le plan de bascule d'A2-03 (vocabulaire canonique dans `data/`,
    `vocab-retired.json`, validateur lexical appelé par `validate-data`, `lieux.json` en
    `vocab_tags`, 71 références remappées, `events.js` E1 à E4, sections de format réécrites) ;
-   **à arbitrer** : huit questions, dont deux lexicales que les documents réservent « avant 5.17 »
    (lectures des mots en katakana, lecture うち de 家), et la façon de relire une opération qui tient
    en un seul commit.

**Essai exécuté le 2026-10-07, dans l'arbre de travail** (rapport
`docs/rapports/etape2-A2-04-lot27-publication-5-17.md`) : sept fichiers de `data/` publiés par la
commande `publish`, `validate-data` basculé sur le validateur lexical, `events.js` avec E1 à E4 ; 510
tests verts. Essai relu et conservé ; les documents de format (`docs/conception/README.md`,
`GUIDE-CONTENU.md`) sont à jour.

**Committé puis poussé le 2026-10-07**, chacun sur l'accord explicite de ChatGPT : commit
`3d67594844f607b4bba01005bdcf664fc2ef4193` (39 fichiers : 33 modifiés, 6 nouveaux), push
`b6d72ae..3d67594`, sans force ; `ocha-v2` et `origin/ocha-v2` sont à `3d67594`. **A2-04 est
terminé ; aucune action A2-04 ne reste.**

**Point de sortie de l'étape 2** : l'inventaire des 148 avertissements est un baseline technique, non
une validation. A2-05 doit auditer un par un les 120 `categorie-nulle` et les 27 `type-nul` ; l'étape
2 ne se clôt pas avant.

**Suite :** A2-05, ouvert le 2026-10-07 (section 6). Aucun commit ni push sans accord explicite.

------------------------------------------------------------------------

## 6. A2-05 · Audit global du vocabulaire — 🔵 EN COURS

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

**Dépendance apparue pendant l'audit** (périmètre de la cohérence rétroactive, arbitré le
2026-10-07) : la fonction `interrogatif`, posée sur 17 sens sans définition normative, demande un
addendum validé **avant la clôture de l'étape 2** ; l'examen de ces 17 sens en dépend. Séquence
arbitrée le 2026-10-12 : adoption explicite de l'addendum, puis périmètre opérationnel de contrôle,
puis examen des 17 sens et recherche d'omissions.

**Avancement (au 2026-10-16).** **A2-05 est en cours ; l'étape 2 n'est pas terminée.** Trois volets, aux périmètres validés le
2026-10-07. Les détails des arbitrages sont dans les rapports cités ; seul l'état est donné ici.

<!-- a2-05:etat:debut empreinte=fe4967cf00896f07 (bloc généré par a2-05-travail/sync-stable.mjs ; ne pas modifier à la main) -->
- **Lot 3** : 360 sens arbitrés sur 377 ; 17 restent (0 proposés). **Bloc B** : 148 sur 148.
- **Corrections retenues, non appliquées** : 204, dans 177 ENTRY ; prochain numéro libre : V1-32.
- **Tranches** : T1 (B10, B11, B12 ; 24 sens ; planifiée) ; T2 (B13, B14 ; 21 sens ; planifiée) ; T3 (B15, B16 ; 24 sens ; planifiée) ; T4 (C1, C2, C3, C4 ; 35 sens ; planifiée) ; T5 (D2, D3 ; 22 sens ; planifiée) ; T6 (D6, D7 ; 22 sens ; planifiée) ; T7 (D1, D4 ; 24 sens ; planifiée) ; T8 (D5, D8 ; 16 sens ; planifiée) ; T9 (E1, E2, E3 ; 24 sens ; planifiée) ; F (F1, F2 ; 17 sens ; suspendue) ; 212 sens hors du bloc F.
- **Contrôles** : registre de couverture sans omission ni doublon ; manifeste d'empreintes, 45 rapports arbitrés identiques.
<!-- a2-05:etat:fin -->

- **Terminé et arbitré.** **Volet 2** (audit individuel des 147 `null`) : 147 sur 147, arbitré le
  2026-10-08 (L 136, F 2, C 9, N 0). **Volet 1** (cohérence rétroactive, axes C1 à C10) : criblage
  validé (443 candidats) ; **lot 1** arbitré (19 sens : 14 conformes, 5 écarts) ; **lot 2, contrôle
  de provenance des nuances, clos documentairement le 2026-10-12** : les 278 nuances du plan sont
  arbitrées (119 sourcées, 20 assumées, 139 écarts), avec, hors plan, les 34 unités de la tranche 1
  et 2 nuances hors JLPT (bilan : `docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md`) ;
  **lot 3, examen individuel des 377 candidats restants** : périmètre arbitré le 2026-10-12 (377
  sens, 332 ENTRY, six blocs A à F, 40 livraisons ;
  `docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md`) ; livraisons **A1** (10 sens), **A2**
  (9 sens), **A3** (9 sens), **A4** (8 sens), **A5** (11 sens), **A6** (11 sens) et **A7** (11 sens)
  arbitrées : **les 69 sens du bloc A, 66 conformes et 3 écarts** (corrections V1-6, V1-7 et V1-8,
  retenues). **Livraisons B1** (12 sens), **B2** (8 sens), **B3** (7 sens), **B4** (9 sens), **B5** (8 sens),
  **B6** (9 sens), **B7** (9 sens), **B8** (7 sens) **et B9** (10 sens) arbitrées : 12, 8, 7, 9, 8, 7,
  9, 7 et 10 conformes, et **2 écarts E1 en B6** (来る et 行く : `deictique`, corrections V1-9 et
  V1-10, retenues) ; réserves documentaires : ページ en B3 ; 暗い et 明るい, sens 1, en B4 ; 練習 en
  B5. **L'examen d'`espace_proprietes_spatiales` dans le bloc B est terminé** (B6 à B8). **360
  candidats arbitrés sur 377 ; 17 restent**, dont 17 dans le bloc F, suspendu ; le bloc B est entièrement arbitré. **Le bloc A est clos documentairement** (bilan arbitré le 2026-10-16 :
  `docs/rapports/etape2-A2-05-volet1-lot3-blocA-bilan.md`).
- **Proposé, non validé.** L'**étude de méthode est arbitrée** (2026-10-18 : neuf tranches T1 à T9 retenues en principe, sans déplacer aucun
  sens ; T1 pilote ; T4 conditionnée au bilan du pilote ; périmètres générés, mais acceptés explicitement avant tout audit ;
  relecture intégrale de chaque fiche maintenue). L'**outillage v2 est retenu en principe** (2026-10-18), sous réserve d'un contrôle final avant T1 ; contrôles des
  motivations **bloquants par défaut** (attributions à vérifier en simple avertissement). Le **checkpoint B est committé et poussé** (`7803163`, 177 chemins, 2026-10-18 ;
  exception documentaire des blancs : bilan du volet 2, §8.62) ; plan de transition accepté comme plan
  (`docs/rapports/etape2-A2-05-plan-transition.md`) ; **étape 2, synchronisation stable par marqueurs, acceptée et appliquée le 2026-10-18** (plan
  `89fa2e8a0a2c245b` : bloc d'état inséré entre marqueurs, 29 lignes du journal marquées `7803163` ;
  `docs/rapports/etape2-A2-05-sync-stable-proposition.md`) ; correction de la référence Git de `CLAUDE.md` proposée à part,
  non appliquée ; **étape 2 clôturée documentairement le 2026-10-20** ; **étape 3, relais allégé : choix de conception arbitrés le 2026-10-20 (D1 à D6), versions finales appliquées le 2026-10-20 sur autorisation, acceptée et clôturée documentairement le 2026-10-20 (bilan du volet 2, §8.67)** ; **étape 4, contrôle final de transition : exécuté une fois le 2026-10-20, 9 sur 9 conformes, arbitré et clôturé documentairement le 2026-10-20** (`docs/rapports/etape2-A2-05-controle-final-transition-proposition.md` ; `docs/rapports/etape2-A2-05-controle-final-transition-resultats.md`, §0) ; **étape 5, périmètre opérationnel de T1, généré en proposition, accueilli favorablement sur le principe, non accepté** (`docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre.md`) ; **correction technique du rapprochement hors JLPT acceptée et appliquée le 2026-10-20 aux deux modules v2** (`docs/rapports/etape2-A2-05-correction-hj-proposition.md`, §0 et §7) ; **périmètre de T1 accepté le 2026-10-20** (`docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre.md`, §0) ; **T1 arbitrée le 2026-10-20** (`docs/rapports/etape2-A2-05-volet1-lot3-T1.md`, §0 : 23 conformes, 1 écart, V1-11 retenue ; ses 24 sens comptés par le registre de couverture depuis l'application du correctif le 2026-10-20, T1 et son périmètre intégrés au manifeste d'empreintes, 29 entrées ; contrôle C9a du relais réparé le 2026-10-21, 30 sur 30 : `docs/rapports/etape2-A2-05-couverture-tranches-proposition.md`, §6 ; **consolidation de T1 acceptée et close le 2026-10-21**, même rapport, §7) ; **périmètre opérationnel de T2 (B13, B14 ; 21 sens, 21 ENTRY) accepté le 2026-10-21** (`docs/rapports/etape2-A2-05-volet1-lot3-T2-perimetre.md`, §0 ; audit des 21 sens non autorisé) ; **correctif des comparables du lot 1 du générateur v2 accepté, point 9 compris, et appliqué le 2026-10-22** (`docs/rapports/etape2-A2-05-correction-comparables-proposition.md`, §7 ; essais d'après application 20 sur 20) ; **incident C9a (29 sur 30 depuis l'acceptation de T2) résolu le 2026-10-22** : option A appliquée aux deux modules, **périmètre accepté de T2 inscrit seul au manifeste (30 entrées, les 29 précédentes inchangées)**, bloc d'état synchronisé (plan `46ccaac1440d396b`), **relais 30 sur 30** (`docs/rapports/etape2-A2-05-c9a-resolution-proposition.md`, §8 ; essais d'après application 26 sur 26) ; **erratum du périmètre arbitré de T1 publié le 2026-10-22**, document distinct, hors du manifeste (`docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre-erratum.md` ; quatre sens, cinq occurrences ; périmètre et rapport de T1 inchangés) ; consolidation de C9a et erratum **acceptés le 2026-10-22** ; **audit des 21 sens de T2 livré en proposition** (bilan du volet 2, §8.76), puis **T2 arbitrée le 2026-10-22** (`docs/rapports/etape2-A2-05-volet1-lot3-T2.md`, §0, inscrit par le module v2, proposition conservée : 20 conformes, 1 écart ; **V1-12 retenue**, non appliquée : シャワー, `equipements_domestiques › equipements_fonctionnels` ; 風 conforme ; réserves sur きれい sens 2, 汚い sens 1 et 灰皿 ; `lieu_hotel` hérité, pertinence non démontrée ; bilan du volet 2, §8.77) ; bloc `a2-05:etat` synchronisé à 21 proposés avant l'inscription (plan `5e0b37e1a3968ce0`, autorisé) ; **après l'inscription, nouveau plan de synchronisation présenté, non appliqué** ; **rapport arbitré de T2 ajouté au manifeste le 2026-10-22**, sur autorisation (préparation relancée, 8 sur 8 ; `--ajouter` une fois : 31 entrées, les 30 précédentes inchangées ; second `--ajouter` refusé ; C9a conforme) ; **bloc d'état synchronisé le 2026-10-22**, sur autorisation (plan `7f27f9928f036d54`, préconditions vérifiées : bloc seul, blocs identiques, 31 empreintes) ; **relais 30 sur 30** ; **consolidation de T2 achevée, acceptée et close le 2026-10-22** (bilan du volet 2, §8.79 et §8.80) ; **périmètre opérationnel de T3 (B15, B16 ; 24 sens, 24 ENTRY) accepté le 2026-10-22**, sans ajout ni retrait (`docs/rapports/etape2-A2-05-volet1-lot3-T3-perimetre.md`, §0 ; recalcul indépendant conforme ; hors du manifeste, ajout non autorisé : relais 29 sur 30, écart C9a attendu) ; **audit des 24 sens de T3 livré en proposition, non arbitré** (`docs/rapports/etape2-A2-05-volet1-lot3-T3.md` : 22 conformes, 2 écarts ; V1-13 et V1-14 proposées, non retenues ; bilan du volet 2, §8.81) ; **périmètre accepté de T3 ajouté au manifeste le 2026-10-23**, sur autorisation, avant l'inscription de l'arbitrage (préconditions 10 sur 10 ; `--ajouter` une fois : 32 entrées, les 31 précédentes inchangées ; second `--ajouter` refusé ; relais 30 sur 30) ; **T3 arbitrée le 2026-10-23** (`docs/rapports/etape2-A2-05-volet1-lot3-T3.md`, §0, inscrit par le module v2, proposition conservée : 22 conformes, 2 écarts ; **V1-13 retenue**, non appliquée : ボタン sens 2, `machines_systemes_techniques › composants` ; **V1-14 retenue**, non appliquée : テープ sens 2, « Cassette » retirée des traductions secondaires ; 乗る et 切符 conformes, `lieu_gare` conservé, non exclusif pour 乗る ; 先生 sens 2 conforme, sans `politesse` ; bilan du volet 2, §8.82) ; **rapport arbitré de T3 : 33e entrée du manifeste préparée (9 sur 9), non ajoutée** ; relais 28 sur 30 dans cet état intermédiaire (C9a : rapport arbitré hors du manifeste ; C8 : bloc d'état non synchronisé), non réparé ; **nouveau plan de synchronisation présenté, non appliqué** (le plan `aa1154ac30a7ec27`, calculé pour 24 proposés, n'est pas appliqué) ; **inscription acceptée le 2026-10-23** (les « 20 autres conformités » comprennent 先生 sens 2 ; ordre des opérations accepté) ; **rapport arbitré de T3 ajouté au manifeste le 2026-10-23**, sur autorisation (préparation relancée, 9 sur 9 ; `--ajouter` une fois : 33 entrées, les 32 précédentes inchangées ; second `--ajouter` refusé, sans modification ; C9a conforme ; relais 29 sur 30, C8 seul : bloc d'état non synchronisé) ; plan `249d1a2acf3bce2d` (32 empreintes) non réutilisé ; **nouveau plan, à 33 empreintes, présenté, non appliqué** (bilan du volet 2, §8.83) ; **bloc d'état synchronisé le 2026-10-23**, sur autorisation (plan `1dad65102173aa58`, préconditions vérifiées : empreinte exacte, bloc seul, blocs identiques, comptes calculés, 33 empreintes ; aperçu suivant vide) ; **relais 30 sur 30** ; **consolidation technique de T3 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.84) ; **consolidation de T3 acceptée et T3 close le 2026-10-23** ; **bloc B entièrement arbitré (148 sur 148)** ; **périmètre opérationnel de T4 (C1 à C4 ; 35 sens, 35 ENTRY) préparé en proposition, non accepté** (`docs/rapports/etape2-A2-05-volet1-lot3-T4-perimetre.md` ; recalcul indépendant conforme ; condition « bilan du pilote » et frontière des tags de lieu portées à l'arbitrage ; bilan du volet 2, §8.85) ; audit des 35 sens non autorisé ; **périmètre de T4 jugé favorable sur son contenu, acceptation différée** au bilan du pilote exigé par le registre (décision du 2026-10-23) ; **bilan du pilote (T1, T2, T3) livré en proposition, non arbitré** (`docs/rapports/etape2-A2-05-volet1-lot3-bilan-pilote.md` : 69 sens, 65 conformes, 4 écarts, tous les verdicts retenus ; mesures de temps indisponibles ; 13 incidents ; recommandation : T4 entière, repli C1–C2 / C3–C4 ; frontière des tags de lieu ; contrôle 14 sur 14 ; bilan du volet 2, §8.86) ; **bilan du pilote accepté le 2026-10-23** (§0 ; condition « bilan du pilote » du registre satisfaite ; registre non modifié) ; **périmètre de T4 accepté le 2026-10-23**, sans ajout ni retrait, **en une seule tranche** (C1 à C4, 35 sens, 35 ENTRY ; §0 inscrit par le générateur v2, proposition conservée ; garde-fous retenus ; division C1–C2 / C3–C4 non retenue, repli sur nouvelle décision explicite) ; **périmètre accepté de T4 ajouté au manifeste le 2026-10-23**, sur autorisation (préconditions 11 sur 11 ; `--ajouter` une fois : 34 entrées, les 33 précédentes inchangées ; second `--ajouter` refusé, sans modification ; C9a conforme) ; **bloc d'état synchronisé le 2026-10-24**, sur autorisation (plan `b714bbc1c8204030`, aperçu relancé sur le dépôt réel : empreinte identique, bloc seul, 33 → 34 empreintes, comptes inchangés ; aperçu suivant vide) ; **relais 30 sur 30** ; audit des 35 sens non autorisé ; **contrôle du bilan du pilote remplacé le 2026-10-24** par la version adaptée (`7dbd990b…`), sur autorisation ; **incident S1** (sabotage ciblé dans le §0 : 11 sur 12), lacune réelle du §0 ; **renforcement du §0 accepté et appliqué le 2026-10-24** (`7cd28d5d…` : §0 comparé champ par champ à sa référence approuvée, `a2-05-travail/arbitrage-T4/reference-s0-bilan-pilote.json`) ; contrôle conforme ; 17 sabotages sur 17 ; relais 30 sur 30 ; adapté à l'état d'avant l'audit de T4 (bilan du volet 2, §8.87 à §8.89) ; **formalisation acceptée et close le 2026-10-24** ; **audit des 35 sens de T4 livré en proposition, non arbitré** (`docs/rapports/etape2-A2-05-volet1-lot3-T4.md` : 26 conformes, 9 écarts, tous sur des tags de lieu ; V1-15 à V1-23 proposées, non retenues ; bilan du volet 2, §8.90) ; **module `sync-stable.mjs` remplacé le 2026-10-24**, sur autorisation, par la version qui lit et confronte les identifiants réservés (`f566510836aa…` → `75b686d2a145…` ; départ sauvegardé dans `a2-05-travail/arbitrage-T4/depart/`) ; **T4 arbitrée le 2026-10-24** (`docs/rapports/etape2-A2-05-volet1-lot3-T4.md`, §0, inscrit par le module v2 le 2026-10-25, proposition conservée : 28 conformes, 7 écarts ; **V1-15 à V1-21 retenues**, non appliquées : retraits de tags de lieu de 果物, 鍵, お茶, お酒, 紅茶, 飲み物 et 水, `lieu_restaurant` conservé pour お茶, 紅茶 et 水 ; お風呂 et ベッド conformes avec réserve documentaire, `lieu_hotel` conservé ; **V1-22 et V1-23 non retenues, identifiants définitivement réservés** ; prochain identifiant V1-24 ; bilan du volet 2, §8.91) ; **contrôle du bilan du pilote adapté à l'arbitrage de T4 le 2026-10-25**, sur autorisation (`7cd28d5d…` → `de5dfa89…` ; §0 de T4 comparé champ par champ à sa référence approuvée, `a2-05-travail/arbitrage-T4/reference-s0-T4.json` ; 19 sabotages sur 19) ; **rapport arbitré de T4 ajouté au manifeste le 2026-10-25**, sur autorisation (`--ajouter` une fois : 35 entrées, les 34 précédentes inchangées) ; **bloc d'état synchronisé le 2026-10-25**, sur autorisation (plan `2619cb6300ef2de9` ; aperçu suivant vide) ; **relais 30 sur 30** ; **consolidation technique de T4 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.92) ; **formalisation de la consolidation de T4 appliquée le 2026-10-25**, sur autorisation (versions identiques aux versions relues ; relais 30 sur 30) ; **consolidation de T4 acceptée et T4 close le 2026-10-25** (clôture documentaire définitive ; décisions non rouvertes) ; **périmètre opérationnel de T5 (D2, D3 ; 22 sens, 18 ENTRY) accepté le 2026-10-25**, sans ajout, retrait ni déplacement (`docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; deixis de personne et d'espace, hors interrogatifs ; recalcul indépendant conforme, inventaire des 125 restants vérifié ; frontières de l'audit retenues ; hors du manifeste, ajout non autorisé) ; audit des 22 sens non autorisé (bilan du volet 2, §8.93) ; **consolidation documentaire de T5 acceptée le 2026-10-25** ; **contrôle du bilan du pilote et recalcul de T5 adaptés à la 36e empreinte le 2026-10-25**, sur autorisations distinctes (`de5dfa89…` → `fd30fcaa…` ; `debe3373…` → `53ca95bb…` ; départs sauvegardés dans `a2-05-travail/arbitrage-T5/depart/` ; entrée vers un fichier absent rendue comme écart ; 29 sabotages sur 29) ; **périmètre accepté de T5 ajouté au manifeste le 2026-10-25**, sur autorisation (`--ajouter` une fois : 36 entrées, les 35 précédentes inchangées ; second `--ajouter` refusé) ; **bloc d'état synchronisé le 2026-10-25**, sur autorisation (plan `27dd9e6477fd0306` ; aperçu suivant vide) ; **relais 30 sur 30** ; **consolidation technique de T5 achevée** ; audit des 22 sens non autorisé (bilan du volet 2, §8.94) ; **formalisation de la protection de T5 appliquée le 2026-10-25**, sur autorisation (versions identiques aux versions relues ; relais 30 sur 30) ; **audit des 22 sens de T5 autorisé le 2026-10-25, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-T5.md` : 22 conformes, aucun écart, aucune correction proposée) ; **T5 arbitrée le 2026-10-25** (§0 inscrit le 2026-10-25, sur autorisation, par copie des versions relues ; proposition conservée, `a2-05-travail/arbitrage-T5/proposition-T5.md` : **22 conformes, aucun écart, aucune correction lexicale nouvelle** ; aucune règle générale déduite ; **réserve normative** : les décisions `type-nul` D0668, D0679, D0687 et D0691 (こちら, あちら, こっち et そっち, sens 2) conservées sans modification, leur type `null` non présenté comme positivement confirmé par A9, tension avec A9, §4.2, documentée, non résolue ; bilan du volet 2, §8.95) ; **référence indépendante du §0 de T5 écrite le 2026-10-27**, sur autorisation (`a2-05-travail/arbitrage-T5/reference-s0-T5.json`, `757083e5…`, tirée du §0 relu, jamais du rapport) ; **contrôle du bilan du pilote et recalcul de T5 adaptés à l'arbitrage de T5 le 2026-10-27**, sur autorisation (`fd30fcaa…` → `3c242238…` ; `53ca95bb…` → `7f23952d…` ; diffs réels identiques aux diffs relus ; départs sauvegardés dans `a2-05-travail/arbitrage-T5/depart/protection-rapport/`) ; **rapport arbitré de T5 ajouté au manifeste le 2026-10-27**, sur autorisation (`--ajouter` une fois : 37 entrées, les 36 précédentes inchangées ; 40 sabotages sur 40) ; **bloc d'état synchronisé**, sur autorisation (plan `a6378961662fa21f` ; aperçu suivant vide) ; **relais 30 sur 30** ; **consolidation technique de T5 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.96) ; **formalisation de l'arbitrage et de la protection de T5 appliquée le 2026-10-27**, sur autorisation (quatre diffs relus appliqués sur les documents synchronisés ; blocs d'état préservés ; relais 30 sur 30 ; 37 empreintes) ; **T5 close le 2026-10-27** (clôture documentaire définitive ; décisions non rouvertes ; réserve normative sur D0668, D0679, D0687 et D0691 conservée, non résolue) ; **périmètre opérationnel de T6 (D6, D7 ; 22 sens, 13 ENTRY, le lot 23 entier) accepté le 2026-10-27**, sans ajout, retrait ni déplacement (`docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; liaison, échange et formules sociales ; recalcul indépendant conforme, inventaire des 103 restants vérifié ; frontières de l'audit retenues ; hors du manifeste, ajout non autorisé) ; audit des 22 sens non autorisé (bilan du volet 2, §8.97) ; **trois contrôles adaptés à la 38e entrée installés le 2026-10-28**, sur autorisation, par la version finale relue (contrôle du bilan du pilote `3c242238…` → `5a4c6624…` ; recalcul de T5 `7f23952d…` → `44b49ef9…` ; recalcul de T6 `0c4ea1d7…` → `614f6b64…` ; diffs réels identiques aux diffs relus ; départs sauvegardés dans `a2-05-travail/arbitrage-T6/installation/depart/`) ; état E2 conforme et accepté ; **incident** : la dernière vérification de l'outil d'installation (`git diff --check` lancé avec `core.autocrlf=false`) a échoué, code 2 ; échec réel de cette commande, conservé ; diagnostic accepté (commande de référence, code 0) ; outil ni relancé ni modifié ; E3 et E4 simulés sur copie, conformes ; 18 cas sur 18 aux sabotages, sans exception dans le contrôle du bilan du pilote ; **périmètre accepté de T6 ajouté au manifeste le 2026-10-28**, sur autorisation (`--ajouter` une fois : 38 entrées, les 37 précédentes inchangées ; contrôle du bilan du pilote, recalculs de T5 et de T6 conformes ; relais 30 sur 30) ; **formalisation appliquée le 2026-10-28**, sur autorisation (neuf remplacements ciblés relus ; originaux sauvegardés dans `a2-05-travail/arbitrage-T6/formalisation-38/application/depart/`) ; **bloc d'état synchronisé à 38 empreintes le 2026-10-28**, sur autorisation (plan `c8f22606c3c690bb`, aperçu relancé identique à l'aperçu relu ; marqueur `06eb4c04f71bb5c6` → `dea26959920c491d` et « 37 » → « 38 rapports arbitrés identiques » dans les deux blocs ; aperçu suivant vide ; relais 30 sur 30) : **les 38 empreintes sont désormais synchronisées** ; audit des 22 sens non autorisé (bilan du volet 2, §8.98 et §8.99) ; **audit des 22 sens de T6 autorisé le 2026-10-28, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-T6.md` : 21 conformes, aucun écart, 1 suspendu, それから, sens 1 ; aucune correction proposée) ; **T6 arbitrée le 2026-10-29** (§0 inscrit par le module v2, proposition conservée, `a2-05-travail/arbitrage-T6/proposition-T6.md` : **22 conformes, aucun écart, aucun suspendu, aucune correction lexicale nouvelle** ; それから, sens 1, conforme, lecture A, `category: null` maintenu, la catégorie n'étant plus présentée comme une contradiction normative non résolue ; bilan du volet 2, §8.100) ; **opération A appliquée le 2026-10-29**, sur autorisation (`a2-05-travail/arbitrage-T6/sequence-application/appliquer-operation-A.mjs`, une fois, code 0, 93 vérifications : recalcul de T5 adapté `44b49ef9…` → `25b82c32…` ; arbitrage de T6 inscrit, rapport `858bc41c…` → `7e3bfd8e…` ; recalcul de T6 évolutif `614f6b64…` → `4fbbdaa3…` ; §8.100 et fragments chiffrés ; contrôle du bilan du pilote évolutif `5a4c6624…` → `eee37a9e…` ; départs sauvegardés dans `a2-05-travail/arbitrage-T6/operation-A/depart/` ; relais 28 sur 30, C8 et C9a, état intermédiaire prévu) ; **opération B appliquée le 2026-10-29**, sur autorisation distincte (`a2-05-travail/arbitrage-T6/sequence-application/appliquer-operation-B.mjs`, une fois, code 0 : plan `832e3586b4df1661` et aperçu `d9754fad…` rétablis sur une copie neuve puis recalculés sur le dépôt réel, identiques aux valeurs relues ; **rapport arbitré de T6 ajouté au manifeste**, `--ajouter` une fois : 39 entrées, les 38 précédentes inchangées ; **bloc d'état synchronisé**, marqueur `dea26959920c491d` → `7a79b16e4641f93f` ; aperçu suivant vide ; relais 30 sur 30) : **les 39 empreintes sont synchronisées** ; **consolidation technique de T6 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.101) ; **T6 close le 2026-10-29** (clôture documentaire définitive, autorisée après la relecture de la consignation appliquée ; 22 sens, 22 conformes, aucun écart, aucune correction lexicale nouvelle ; décisions non rouvertes ; 39 empreintes) ; **inscription ciblée à l'inventaire appliquée le 2026-10-29**, sur autorisation distincte (une ligne, pour `appliquer-consignation-T6.mjs` ; `a2-05-travail/arbitrage-T6/consignation-T6/inventaire/appliquer-inventaire-consignation-T6.mjs`, une fois, code 0) ; **périmètre opérationnel de T7 (D1, D4 ; 24 sens, 24 ENTRY) accepté le 2026-10-29**, sans ajout, retrait, déplacement ni report (`docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; lignes 253 à 266 et 289 à 298, l'intervalle étant D2 et D3, soit T5 ; thème normatif : présence ou absence des fonctions linguistiques selon A7 et A9, sens par sens ; recalcul indépendant conforme, 16 sabotages sur 16, inventaire des 81 restants vérifié ; orientation et frontières de l'audit retenues ; **protégé au manifeste le 2026-10-30 (40e entrée)**, après l'installation du recalcul de T7 adapté, et bloc d'état synchronisé (consolidation appliquée en quatre états, E1 à E4, chacun sur autorisation distincte)) ; **audit des 24 sens de T7 autorisé le 2026-10-31, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-T7.md` : 22 conformes, 1 écart, 1 suspendu) ; **T7 arbitrée le 2026-10-31** (§0 inscrit par le module v2, proposition conservée, `a2-05-travail/arbitrage-T7/proposition-T7.md` : **23 conformes, 1 écart, 0 suspendu** ; 向こう conforme, lecture A, absence de `deictique` maintenue ; 後, sens 1, `deictique` maintenue selon D0952, réserve conservée ; « Madame » conservée pour おばさん, sens 2, en raison de D0078 ; **V1-24 retenue**, non appliquée : retrait de « Pas bon », まずい, sens 1 ; prochain identifiant V1-25 ; bilan du volet 2, §8.102 à §8.104) ; **inscription de T7 appliquée (étape A), rapport arbitré au manifeste (B1, 41e entrée) et bloc d'état synchronisé (B2, plan `9a8a65f735b1859f`) le 2026-10-31**, chacun sur autorisation distincte ; **relais 30 sur 30** ; **consolidation technique de T7 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.105) ; **consignation de T7 appliquée le 2026-10-31**, sur autorisation ; **T7 close le 2026-10-31** (clôture documentaire définitive, autorisée après la relecture de la consignation appliquée ; 24 sens, 23 conformes, 1 écart ; V1-24 retenue, non appliquée ; décisions non rouvertes ; 41 empreintes) ; **périmètre opérationnel de T8 (D5, D8 ; 16 sens, 14 ENTRY) accepté le 2026-10-31**, sans ajout, retrait, déplacement ni report (`docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; lignes 299 à 303 et 326 à 336, l'intervalle étant D6 et D7, soit T6 ; まっすぐ, sens 1, maintenu ; recalcul indépendant conforme, 23 sabotages sur 23, inventaire des 57 restants vérifié ; orientation et frontières de l'audit retenues ; **protégé au manifeste le 2026-10-31 (42e entrée)**, et bloc d'état synchronisé (consolidation appliquée en trois états, E1 à E3, chacun sur autorisation distincte)) ; **audit des 16 sens de T8 autorisé le 2026-10-31, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-T8.md` : 16 conformes, 0 écart, 0 suspendu) ; **T8 arbitrée le 2026-10-31** (§0 inscrit par le module v2, proposition conservée, `a2-05-travail/arbitrage-T8/proposition-T8.md` : **16 conformes, 0 écart, 0 suspendu**, aucune correction nouvelle ; すぐに : absence de `deictique` maintenue, réserve conservée ; あまり : `intensifieur` seul maintenu, réserve conservée ; もっと : cumul `comparatif` + `intensifieur` confirmé ; **rapport arbitré de T8 protégé au manifeste le 2026-11-01 (43e entrée)**, et bloc d'état synchronisé (étape A, puis B1 et B2, chacune sur autorisation distincte) ; **consignation finale de T8 appliquée le 2026-11-01**, sur autorisation ; **T8 close le 2026-11-01** (clôture documentaire définitive, autorisée après la relecture de la consignation appliquée ; 16 sens, 16 conformes, aucun écart ni suspendu ; 43 empreintes ; relais 30 sur 30) ; **périmètre opérationnel de T9 (E1, E2, E3 ; 24 sens, 21 ENTRY) accepté le 2026-11-01**, sans ajout, retrait, déplacement ni report, une seule tranche, les trois livraisons restant des subdivisions de travail (`docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; lignes 337 à 360 ; 先 s1, 前 s1 et 近く s1 maintenus, sans préjuger de `deictique` ni des réservations temporelles ; recalcul indépendant conforme, 29 sabotages sur 29, inventaire des 41 restants vérifié ; **protégé au manifeste le 2026-11-01 (44e entrée)**, bloc d'état synchronisé ; opérations O1, O2 et O3, chacune sur autorisation distincte) ; **défaut « RES » corrigé le 2026-11-01**, sur autorisation technique distincte (voie A : motif de lecture de `perimetre-v2.mjs` étendu à RES, littéralement, une ligne ; empreinte du générateur adaptée dans `recalcul-T9-perimetre.mjs` ; 46 groupes historiques identiques ; marques non définies refusées ; aucune règle linguistique nouvelle, découpage arbitré non modifié) ; **audit des 24 sens de T9 autorisé le 2026-11-01, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-T9.md` : 17 conformes, 7 écarts, 0 suspendu) ; **T9 arbitrée le 2026-11-01** (§0 inscrit par le module v2, proposition conservée, `a2-05-travail/arbitrage-T9/proposition-T9.md` : **17 conformes, 7 écarts, 0 suspendu** ; V1-25 à V1-31 retenues, non appliquées ; absence de `deictique` confirmée pour 先, sens 2, et 前, sens 2 ; niveau 2 des six adjectifs de dimension confirmé, sans suspension ; aucun sens interjectif pour 痛い) ; **rapport arbitré de T9 protégé au manifeste le 2026-11-01 (45e entrée)**, recalculs de T8 et de T9 adaptés et installés, bloc d'état synchronisé (étape A, puis B1 et B2, chacune sur autorisation distincte) ; **T9 close le 2026-11-01** (clôture documentaire définitive autorisée : 24 sens, 17 conformes, 7 écarts, 0 suspendu ; V1-25 à V1-31 retenues, non appliquées ; décisions historiques non rouvertes) ; bilan du volet 2, §8.106 à §8.116) (relais `docs/relecture/reprise-A2-05.md` mis en service ; ancien relais au commit `78031638` ; `CLAUDE.md` à `7803163` ; `note-relais.md` gelée ; doctrines du volet 2 au §8.66 du bilan ; `docs/rapports/etape2-A2-05-relais-allege-proposition.md`, §0 ; `docs/rapports/etape2-A2-05-relais-allege-versions-finales.md`, §9). **Bloc B : 148 sens arbitrés sur 148 (B1 à B9, T1, T2, T3), entièrement arbitré ; 0 restent.**
  Une **proposition d'addendum sur la fonction
  `interrogatif`** (préalable normatif E5, révision 4), recevable comme proposition prête pour un
  arbitrage normatif distinct, **ni adoptée ni
  normative**, rangée dans `docs/rapports/` et non dans `docs/conception/` ; numéro A10 seulement
  pressenti. Aucune norme n'est modifiée.
- **Corrections retenues, non appliquées.** **204 corrections, dans 177 ENTRY** : dix modifications
  du volet 2, V1-1 à V1-5 (lot 1), V1-6 à V1-8 (lot 3, bloc A : type de 時間, sens 1, de ちょっと,
  sens 2, et de 少し, sens 3), V1-9 et V1-10 (lot 3, B6 : `deictique` de 来る et de 行く), V1-11 (lot 3, T1 : catégorie de 履く), V1-12 (lot 3, T2 : catégorie de シャワー), V1-13 et V1-14 (lot 3, T3 : catégorie de ボタン, sens 2 ; traduction secondaire de テープ, sens 2), V1-15 à V1-21 (lot 3, T4 : retraits de tags de lieu de 果物, 鍵, お茶, お酒, 紅茶, 飲み物 et 水 ; V1-22 et V1-23, propositions non retenues de T4, réservés, jamais réattribués), V1-24 (lot 3, T7 : traduction secondaire de まずい, sens 1), V1-25 à V1-31 (lot 3, T9 : traduction secondaire de 前, sens 2 ; `deictique` de おととし et de 近く, sens 2 ; retraits de tags de lieu de 醤油, 晩ご飯, 昼ご飯 et 朝ご飯 ; prochain identifiant V1-32), V2-1 à
  V2-165 (provenance). `data/`, les lots, le journal, les
  registres, les snapshots, l'inventaire des avertissements, les outils et les tests sont ceux du
  commit `3d67594`. Liste : `docs/rapports/etape2-A2-05-bilan-volet2.md`, §8.
- **Reste à faire, et blocages.** Les 17 candidats restants du lot 3, tous du bloc F, tranche par tranche, chacune sur
  autorisation distincte. **Blocage : le bloc F (17 sens portant `interrogatif`) est suspendu**
  au préalable E5, qui doit aboutir avant la clôture de l'étape 2, selon une séquence arbitrée :
  adoption explicite de l'addendum ; puis périmètre opérationnel de contrôle, validé ; puis examen
  des 17 sens et recherche d'omissions, comptabilisés séparément. Le rapport de conclusion du
  criblage sur C6 et C9. Quatre vérifications hors périmètre (HP-1 à HP-4 : ひらがな, 漢字, 右, 左),
  consignées, non commencées : leur examen individuel n'est pas autorisé, et leur cadre reste à
  proposer. Deux questions de couverture d'A2-L3, consignées, restent à cadrer avant tout examen
  normatif : QC-1 (la photographie ordinaire : 撮る, 写真, フィルム) et QC-2, provisoire (l'éclairage
  d'un lieu : 暗い et 明るい, sens 1), documentaire, sans changement normatif. Le **volet 3** (contrôles globaux
  G1 à G7), non commencé. Puis l'arbitrage global et l'application des corrections, sur
  autorisations distinctes.
- **Prochaine action.** Le point de commit : la régénération du dossier (`docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md`), l'accord de commit et l'accord de push, chacun distinct, puis la déclaration de la référence, le commit de clôture, le second push et `a2-05-travail/cloture-checkpoint.mjs --verifier`, chacun sur autorisation distincte ; T9 est close, le périmètre préparatoire de F accepté, le bloc F suspendu, et la révision 4 de la proposition d'addendum E5 en service, non adoptée (bilan du volet 2, §8.116) ; puis, chacun sur autorisation distincte : le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1) ; l'arbitrage normatif distinct de la proposition d'addendum. Aucune correction lexicale n'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.

Les travaux postérieurs au checkpoint B `7803163` (committé et poussé le 2026-10-18) sont
documentaires et **ne sont ni committés ni poussés**. Relais : `docs/relecture/reprise-A2-05.md`.

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
   ├── A2-04 Vocabulaire N5                 ✅
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
   │   ├── Lots 22 à 25                     ✅
   │   ├── 5.16 Passe finale (lot 26)       ✅
   │   └── 5.17 Publication                 ✅
   │
   ├── A2-05 Audit vocabulaire              🔵
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
