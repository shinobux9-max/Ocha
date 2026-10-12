# Ocha --- Snapshot global officiel de l'architecture sémantique A2

**Version :** A2-GLOBAL-v1\
**Statut :** Source de vérité architecturale A2\
**Base d'audit :** corpus JLPT N5 → N2 (\~5 000 entrées) + crash-test
transversal final

## 1. Objet

Ce document clôt la phase de conception de l'architecture sémantique A2
d'Ocha.

Il consolide, sans les remplacer dans leur niveau de détail, les
snapshots officiels suivants :

-   `Ocha_Snapshot_Officiel_A2_Level1-3_v1.md`
-   `Ocha_Snapshot_Officiel_A2_Semantic_Types_v1.md`
-   `Ocha_Snapshot_Officiel_A2_Dimensions_v1.md`
-   `Ocha_Snapshot_Officiel_A2_Relations_v1.1.md`
-   `Ocha_Snapshot_Officiel_A2_Linguistic_v1.md`

En cas de besoin de définition détaillée ou de frontière fine, le
snapshot spécialisé correspondant reste la référence normative.

`A2-REL-v1.1` remplace `A2-REL-v1` comme version active de la couche
Relations.

## 2. Principe central

La classification doit représenter **le sens lexical**, et non
simplement la forme du mot, son contexte habituel, sa classe
grammaticale ou son apparence physique.

La catégorie principale décrit le domaine sémantique le plus
caractéristique du concept exprimé.

L'architecture sépare cinq informations qui ne doivent pas être
confondues :

``` text
domaine sémantique
≠ nature du concept
≠ caractéristique conceptuelle
≠ relation avec un autre concept
≠ fonction linguistique
```

La polysémie est native : une même entrée peut posséder plusieurs
`SENSE`.

L'absence de catégorie sémantique est autorisée lorsqu'aucun domaine
primaire pertinent n'existe.

## 3. Architecture globale

``` text
ENTRY
│
├── LINGUISTIC_PROPERTIES
│   ├── catégorie grammaticale
│   ├── écriture
│   ├── suffixe
│   └── compteur
│
└── SENSE[]
    │
    ├── category
    │   ├── level_1
    │   ├── level_2
    │   └── level_3 [optionnel]
    │
    ├── semantic_type
    │
    ├── dimensions[]
    │
    ├── relations[]
    │
    └── linguistic_functions
        ├── grammatical[]
        └── pragmatic_discourse[]
```

### Portée

-   `ENTRY` représente l'entrée lexicale et ses propriétés linguistiques
    relativement stables.
-   `SENSE` représente une signification précise.
-   Une entrée peut posséder plusieurs `SENSE`.
-   `category` peut être `null`.
-   `level_3` n'est pas obligatoire.
-   Un sens peut porter zéro, une ou plusieurs dimensions.
-   Un sens peut porter zéro, une ou plusieurs relations.
-   Les fonctions linguistiques sont attribuées au niveau approprié au
    sens.

## 4. Couche 1 --- CATEGORY

### 4.1 Rôle

`category` répond à la question :

> **Dans quel domaine sémantique principal ce sens s'inscrit-il ?**

Elle ne doit pas être déterminée par : - la classe grammaticale ; - le
contexte d'usage habituel ; - la seule forme physique ; - une
association thématique indirecte.

Lorsqu'une fonction spécialisée fait intrinsèquement partie de la
définition du concept, cette fonction peut déterminer la catégorie.

### 4.2 Les 32 Level 1 officiels

1.  Être humain
2.  Santé & médecine
3.  Relations sociales
4.  Droit & justice
5.  Politique & institutions publiques
6.  Habitat & vie domestique
7.  Alimentation & cuisine
8.  Habillement & accessoires personnels
9.  Économie & commerce
10. Travail & vie professionnelle
11. Espace & propriétés spatiales
12. Transport & mobilité
13. Voyage & tourisme
14. Environnement construit & espaces humains
15. Monde naturel
16. Temps
17. Communication & langage
18. Éducation & apprentissage
19. Sciences
20. Technologie
21. Nombres & quantification
22. Territoires & lieux géographiques
23. Religion & spiritualité
24. Culture & traditions
25. Arts & création
26. Loisirs & jeux
27. Sports
28. Médias
29. Matières & matériaux
30. Production & industrie
31. Agriculture & élevage
32. Couleurs

La structure exhaustive Level 2 → Level 3 est conservée dans `A2-L3-v1`.

### 4.3 Règles de frontière figées

1.  **Concept ≠ contexte d'usage.**
2.  **Forme physique ≠ domaine sémantique.**
3.  Un établissement spécialisé suit généralement sa fonction
    spécialisée.
4.  Une profession spécialisée suit généralement son domaine spécialisé
    ; sa nature de personne est représentée ailleurs.
5.  Un objet fonctionnel spécialisé suit son domaine fonctionnel, pas
    une racine générique « Objets ».
6.  La polysémie est traitée au niveau du `SENSE`.
7.  `category: null` est autorisé lorsqu'aucune catégorie primaire
    pertinente n'existe.
8.  Le Level 3 n'est créé que lorsqu'il améliore réellement la
    discrimination sémantique.
9.  Les regroupements pédagogiques/UI ne modifient pas l'ontologie.
10. Aucun Level 4 universel n'est prévu en A2.

### 4.4 Éléments hors hiérarchie thématique

Ne doivent pas être recréés automatiquement comme Level 1/2/3 :

-   objet / artefact générique ;
-   personne générique ;
-   lieu générique ;
-   action générique ;
-   propriété générale ;
-   cause / conséquence ;
-   opposition ;
-   comparaison ;
-   identité / différence ;
-   inclusion / appartenance ;
-   connexion / séparation ;
-   validité / adéquation ;
-   possibilité / nécessité ;
-   transitif / intransitif ;
-   fonction grammaticale ou pragmatique.

### 4.5 Anciens candidats non promus

**Énergie & systèmes énergétiques** : non promu en A2.

**Urgences & protection civile** : non promu en A2.

Toute promotion future nécessitera de nouvelles preuves architecturales.

## 5. Couche 2 --- SEMANTIC TYPE

### 5.1 Rôle

`semantic_type` répond à la question :

> **Quelle sorte d'entité ou de concept ce sens lexical désigne-t-il ?**

Il est orthogonal à `category` et est attribué au `SENSE`.

### 5.2 Architecture officielle

``` text
SEMANTIC TYPE
│
├── ENTITY
│   ├── Personne
│   ├── Organisme vivant
│   ├── Objet / artefact
│   ├── Substance / matière
│   ├── Lieu
│   ├── Organisation
│   └── Groupe / collectif
│
├── OCCURRENCE
│   ├── Action
│   ├── Processus
│   ├── Événement
│   └── Résultat
│
├── CONDITION
│   ├── État
│   └── Propriété
│
└── ABSTRACT
    ├── Information / contenu
    ├── Quantité / valeur
    └── Concept abstrait
```

### 5.3 Règles fondamentales

-   Deux sens d'un même mot peuvent avoir des Semantic Types différents.
-   `semantic_type` ne remplace jamais `category`.
-   La fonction spécialisée détermine la catégorie ; la nature de
    l'entité détermine le Semantic Type.
-   Un objet spécialisé reste `Objet / artefact`.
-   Une profession spécialisée reste `Personne`.
-   Un établissement fonctionnel est généralement `Lieu`; l'institution
    correspondante peut constituer un autre sens `Organisation`.
-   `Concept abstrait` n'est jamais une catégorie de secours.
-   Les relations et fonctions linguistiques restent séparées.

## 6. Couche 3 --- DIMENSIONS

### 6.1 Rôle

Une dimension décrit une caractéristique abstraite transversale portée
par un `SENSE`.

Elle ne remplace ni `category`, ni `semantic_type`, ni une relation
binaire, ni `linguistic`.

### 6.2 Architecture officielle

``` text
DIMENSIONS
├── MODALITÉ CONCEPTUELLE
│   ├── Possibilité ↔ Impossibilité
│   ├── Nécessité ↔ Facultativité
│   ├── Probabilité
│   └── Certitude ↔ Incertitude
│
├── DIFFICULTÉ
│   ├── Facilité ↔ Difficulté
│   └── Simplicité ↔ Complexité
│
├── VALIDITÉ & QUALITÉ CONCEPTUELLE
│   ├── Validité ↔ Invalidité
│   ├── Exactitude ↔ Inexactitude
│   ├── Précision ↔ Imprécision / ambiguïté
│   └── Adéquation ↔ Inadéquation
│
├── RÉALITÉ & STATUT ÉPISTÉMIQUE
│   ├── Réel ↔ Fictif
│   ├── Vrai ↔ Faux
│   └── Évidence ↔ Non-évidence
│
├── NORMALITÉ
│   ├── Normal ↔ Anormal
│   ├── Habituel ↔ Exceptionnel
│   └── Attendu ↔ Inattendu
│
├── ÉVALUATION FONCTIONNELLE
│   ├── Importance ↔ Insignifiance
│   ├── Utilité ↔ Inutilité
│   ├── Efficacité ↔ Inefficacité
│   └── Avantage ↔ Désavantage
│
├── COMPLÉTUDE & ORGANISATION
│   ├── Complet ↔ Incomplet
│   ├── Uniforme ↔ Non uniforme
│   └── Ordonné ↔ Désordonné
│
├── FONCTIONNEMENT
│   ├── Fonctionnel ↔ Défaillant
│   └── Actif ↔ Inactif
│
└── NATURE CONCEPTUELLE
    └── Concret ↔ Abstrait
```

### 6.3 Frontières principales

-   Modalité conceptuelle ≠ modalité grammaticale.
-   Vérité ≠ réalité ≠ certitude ≠ exactitude ≠ précision.
-   Adéquation intrinsèque = dimension ; correspondance explicite A↔B =
    relation.
-   `Valeur` n'est pas une dimension universelle.
-   `Quantification` n'est pas dupliquée ici : elle possède déjà
    `Nombres & quantification`.
-   Les propriétés physiques ne sont pas regroupées dans une dimension
    universelle unique.

### 6.4 Familles non promues en A2

Réussite/échec ; désir/volonté ; capacité ; effort ;
transformation/modification ; accomplissement ; existence/absence ;
limite/seuil/condition ; hasard/contingence ; classification/exemplarité
; situation/contexte.

Elles restent réévaluables dans une version future.

## 7. Couche 4 --- RELATIONS

### 7.1 Rôle

`relations[]` représente les liens sémantiques explicites entre deux
sens, concepts ou unités lexicales.

### 7.2 Architecture officielle --- A2-REL-v1.1

``` text
RELATIONS
│
├── IDENTITÉ & COMPARAISON
│   ├── identical_to
│   ├── different_from
│   ├── similar_to
│   ├── equivalent_to
│   ├── corresponds_to
│   ├── compared_to
│   ├── opposed_to
│   └── contrasted_with
│
├── STRUCTURE
│   ├── part_of        ↔ has_part
│   ├── member_of      ↔ has_member
│   └── composed_of    ↔ component_of
│
├── CONNEXION
│   ├── connected_to
│   └── separated_from
│
├── CAUSALITÉ
│   └── causes         ↔ consequence_of
│
├── ORGANISATION
│   └── reciprocal_with
│
└── RELATIONS LEXICALES
    └── transitive_of  ↔ intransitive_of
```

### 7.3 Symétrie

Relations symétriques :

-   `identical_to`
-   `different_from`
-   `similar_to`
-   `equivalent_to`
-   `opposed_to`
-   `contrasted_with`
-   `connected_to`
-   `separated_from`
-   `reciprocal_with`

Relations dirigées avec inverse :

-   `part_of` ↔ `has_part`
-   `member_of` ↔ `has_member`
-   `composed_of` ↔ `component_of`
-   `causes` ↔ `consequence_of`
-   `transitive_of` ↔ `intransitive_of`

Relations dirigées sans inverse figé :

-   `corresponds_to`
-   `compared_to`

### 7.4 Candidats retirés

Après le crash-test transversal final :

-   `oriented_toward` : non retenue comme relation officielle A2 ;
-   `distributed_over` : non retenue comme relation officielle A2.

Le retrait concerne uniquement leur statut de **type relationnel
générique**. Les concepts d'orientation et de distribution restent
représentables dans les autres couches appropriées.

## 8. Couche 5 --- LINGUISTIC

### 8.1 Rôle

La couche `linguistic` représente les propriétés et fonctions
linguistiques d'une entrée ou d'un sens.

Elle est structurée et contrôlée : elle ne doit pas devenir un champ de
texte libre.

### 8.2 Propriétés linguistiques de l'ENTRY

``` text
LINGUISTIC_PROPERTIES
├── catégorie grammaticale
├── écriture
├── suffixe
└── compteur
```

### 8.3 Fonctions linguistiques du SENSE

``` text
LINGUISTIC_FUNCTIONS
│
├── GRAMMATICAL
│   ├── interrogatif
│   ├── déictique
│   ├── comparatif
│   ├── quantificateur
│   ├── négation
│   ├── pluralisation
│   ├── modalité
│   ├── aspect
│   └── temps
│
└── PRAGMATIC / DISCOURSE
    ├── connecteur
    ├── intensifieur
    ├── alternative
    ├── discours
    └── politesse
```

Aucun sous-niveau supplémentaire n'est officialisé en A2.

### 8.4 Frontières principales

**Compteur ≠ quantificateur.**\
Le compteur appartient au système linguistique japonais ; la quantité
comme concept reste représentable par `Nombres & quantification`.

**Modalité grammaticale ≠ modalité conceptuelle.**\
La première appartient à `linguistic`, la seconde à `dimensions`.

**Temps grammatical ≠ Temps conceptuel.**\
Le premier appartient à `linguistic`, le second au domaine `Temps`.

**Fonction discursive ≠ domaine Communication.**\
Un connecteur ou marqueur discursif n'appartient pas automatiquement à
`Communication & langage`.

**Écriture comme propriété ≠ concept d'écriture.**\
L'orthographie d'une entrée relève des propriétés linguistiques ; un
concept lexical d'écriture peut relever de `Communication & langage`.

**Politesse.**\
La politesse reste une fonction linguistique/pragmatique. Aucune
taxonomie détaillée des registres n'est figée en A2.

## 9. Polysémie

La classification est effectuée par `SENSE`, jamais obligatoirement par
`ENTRY`.

Exemple conceptuel :

``` text
ENTRY
├── SENSE 1
│   ├── meaning
│   ├── category
│   ├── semantic_type
│   ├── dimensions[]
│   ├── relations[]
│   └── linguistic_functions
│
└── SENSE 2
    ├── meaning
    ├── category
    ├── semantic_type
    ├── dimensions[]
    ├── relations[]
    └── linguistic_functions
```

Une même graphie peut donc porter des analyses entièrement différentes
selon le sens.

Les cas `高い`, `高度`, `人` et `回` ont notamment servi de stress-tests
à ce principe.

## 10. `category: null`

`category: null` est une possibilité architecturale officielle.

Elle signifie :

> aucune catégorie sémantique primaire suffisamment pertinente pour ce
> sens.

Elle ne signifie pas :

> entrée oubliée ou non classée.

Les unités principalement grammaticales, discursives ou pragmatiques
peuvent légitimement utiliser ce mécanisme.

À l'inverse, un mot lexical plein ne doit pas être placé en `null`
simplement parce que son classement est difficile.

## 11. Règle générale d'arbitrage

Lorsqu'un cas semble ambigu, appliquer dans cet ordre :

1.  identifier le `SENSE` exact ;
2.  déterminer le domaine conceptuel principal, s'il existe ;
3.  déterminer la nature du concept avec `semantic_type` ;
4.  ajouter seulement les dimensions réellement portées par le sens ;
5.  ajouter seulement les relations explicites et validées ;
6.  représenter séparément les fonctions linguistiques ;
7.  préférer `category: null` à une catégorie artificielle ;
8.  ne jamais créer une nouvelle catégorie, dimension ou relation
    uniquement pour sauver un cas isolé.

## 12. Principe anti-prolifération global

Aucune couche ne doit devenir un fourre-tout.

Une extension de l'architecture doit être justifiée par : - une
récurrence corpus ; - une distinction conceptuelle stable ; - l'absence
de doublon avec les couches existantes ; - une utilité réelle pour la
représentation ou l'exploitation des données ; - des frontières
suffisamment définissables.

Un cas isolé ou une traduction française ambiguë ne suffit pas.

## 13. Résultat du crash-test transversal final

Le crash-test final n'a révélé aucune rupture nécessitant : - un nouveau
Level 1 ; - un nouveau Semantic Type ; - une nouvelle famille de
dimensions ; - une nouvelle couche architecturale ; - une extension
immédiate de la couche Linguistic.

Il a conduit à une seule révision officielle : retrait de
`oriented_toward` et `distributed_over` de la liste des relations
opérationnelles.

L'architecture A2 est donc considérée comme **fermée et cohérente pour
cette version**.

Cela ne signifie pas qu'elle est immuable : toute évolution future devra
être versionnée et justifiée par le corpus ou par les besoins réels de
migration/exploitation.

## 14. Gouvernance officielle

La procédure reste :

**travail → stress-test → validation → snapshot officiel → étape
suivante**

Les snapshots A2 ne doivent pas être modifiés silencieusement.

Toute évolution structurelle doit produire une nouvelle version
documentée.

### Références normatives A2

-   CATEGORY : `A2-L3-v1`
-   SEMANTIC TYPE : `A2-ST-v1`
-   DIMENSIONS : `A2-DIM-v1`
-   RELATIONS : `A2-REL-v1.1`
-   LINGUISTIC : `A2-LING-v1`
-   GLOBAL : `A2-GLOBAL-v1`

## 15. Statut final de la phase A2

**Architecture sémantique A2 : VALIDÉE ET FIGÉE.**

Le travail suivant ne doit plus consister à redessiner l'architecture
par défaut.

La prochaine phase peut porter sur son **implémentation et la migration
des données lexicales**, en utilisant A2 comme référence stable. Toute
anomalie rencontrée pendant la migration doit d'abord être traitée comme
un cas de données ou de frontière avant d'être interprétée comme une
lacune architecturale.
