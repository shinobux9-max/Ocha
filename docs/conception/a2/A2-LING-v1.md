# Ocha --- Snapshot officiel de la couche Linguistic

**Version :** A2-LING-v1\
**Statut :** Référence officielle de travail\
**Base d'audit :** stress-test JLPT N5 → N2 (\~5 000 entrées)

**Dépendances :** - `Ocha_Snapshot_Officiel_A2_Level1-3_v1.md` -
`Ocha_Snapshot_Officiel_A2_Semantic_Types_v1.md` -
`Ocha_Snapshot_Officiel_A2_Dimensions_v1.md` -
`Ocha_Snapshot_Officiel_A2_Relations_v1.md`

## 1. Rôle

La couche `linguistic` représente les informations propres au
fonctionnement linguistique d'une entrée ou d'un sens.

Elle ne doit pas : - remplacer la catégorie sémantique ; - transformer
une classe grammaticale en domaine thématique ; - dupliquer une
dimension conceptuelle ; - dupliquer une relation sémantique ; - devenir
un champ de texte libre.

Une entrée principalement grammaticale, discursive ou pragmatique peut
légitimement avoir `category: null`.

## 2. Séparation fondamentale

Les informations linguistiques ne vivent pas toutes au même niveau.

``` text
ENTRY
├── LINGUISTIC_PROPERTIES
│
└── SENSE
    ├── category
    ├── semantic_type
    ├── dimensions[]
    ├── relations[]
    └── LINGUISTIC_FUNCTIONS
```

Les propriétés stables de la forme lexicale sont distinguées des
fonctions qu'un sens peut remplir.

## 3. Propriétés linguistiques --- niveau ENTRY

``` text
LINGUISTIC_PROPERTIES
├── catégorie grammaticale
├── écriture
├── suffixe
└── compteur
```

### Catégorie grammaticale

Nom, verbe, adjectif et autres classes grammaticales ne déterminent
jamais la catégorie sémantique.

Des mots appartenant à des classes grammaticales différentes peuvent
partager le même domaine conceptuel.

### Écriture

Les informations relatives à la forme écrite ou au système graphique
relèvent des propriétés linguistiques lorsqu'elles décrivent l'entrée
elle-même.

Cela ne remplace pas le domaine sémantique
`Communication & langage > Écriture & systèmes graphiques` lorsqu'un mot
désigne effectivement un concept d'écriture.

### Suffixe

Le statut de suffixe est une propriété linguistique et non un domaine
sémantique.

### Compteur

Les compteurs japonais constituent un système linguistique spécifique.

Exemples :

-   `匹` --- compteur associé notamment à certains animaux ;
-   `枚` --- compteur associé notamment aux objets plats ;
-   `本` --- compteur associé notamment aux objets longs/cylindriques ;
-   `冊` --- compteur associé notamment aux livres/volumes ;
-   `個` --- compteur générique pour certaines unités ;
-   `回` --- compteur d'occurrences selon le sens et la construction.

Le compteur peut conserver une information de compatibilité telle que :

``` text
counter_for:
  - small_animals
```

Cette compatibilité ne devient pas une catégorie sémantique.

La présence d'un compteur dans une expression ne place pas
automatiquement cette expression dans `Nombres & quantification`.

## 4. Fonctions linguistiques --- niveau SENSE

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

Ces familles constituent la structure V1. Aucun sous-niveau
supplémentaire n'est officialisé dans ce snapshot.

## 5. Frontières importantes

### Compteur ≠ quantificateur

Un compteur appartient au système linguistique japonais de comptage et
de sélection des unités.

Un quantificateur exprime une fonction de quantification.

La quantité ou le nombre comme concept reste représentable
sémantiquement dans `Nombres & quantification`.

Une même graphie peut nécessiter plusieurs analyses. Par exemple `人`
peut représenter la personne (`ひと`) ou fonctionner comme compteur
(`〜にん`).

### Modalité grammaticale ≠ modalité conceptuelle

La couche `dimensions` contient notamment :

-   possibilité ↔ impossibilité ;
-   nécessité ↔ facultativité ;
-   probabilité ;
-   certitude ↔ incertitude.

Ces dimensions décrivent une caractéristique conceptuelle du sens.

La modalité grammaticale appartient à `LINGUISTIC_FUNCTIONS`.

Les deux niveaux ne doivent pas être fusionnés.

### Temps conceptuel ≠ temps grammatical

Le domaine `Temps` représente les concepts temporels : repérage,
calendrier, durée, fréquence, chronologie, etc.

Le `temps` grammatical appartient à `LINGUISTIC_FUNCTIONS`.

### Fonction discursive ≠ domaine Communication

Un mot n'appartient pas à `Communication & langage` simplement parce
qu'il sert à organiser le discours.

Les connecteurs et autres unités principalement discursives/pragmatiques
peuvent donc avoir `category: null`.

Exemples observés :

-   `その上` → addition ;
-   `その為` → cause / conséquence ;
-   `そのほか` → extension / autres éléments.

Ces sous-fonctions illustrent le système mais ne sont pas officialisées
comme arborescence universelle dans cette V1.

### Politesse

La politesse est conservée comme fonction linguistique/pragmatique.

Le corpus atteste notamment des formes honorifiques et des formules
sociales, mais la V1 ne crée pas encore une taxonomie détaillée des
registres honorifique, humble, formel, familier, etc.

## 6. Polysémie et portée

La fonction linguistique doit être attribuée au niveau approprié.

Lorsqu'une même forme possède plusieurs emplois, chaque `SENSE` peut
recevoir : - sa propre catégorie ; - son propre `semantic_type` ; - ses
dimensions ; - ses relations ; - ses fonctions linguistiques.

Il ne faut pas forcer tous les emplois d'une entrée dans une seule
analyse.

## 7. Principe anti-prolifération

Une nouvelle fonction ou propriété linguistique ne doit être créée que
si :

1.  elle est attestée de manière récurrente ou structurellement
    importante ;
2.  elle ne duplique pas une catégorie sémantique ;
3.  elle ne duplique pas une dimension ;
4.  elle ne duplique pas une relation ;
5.  elle possède une fonction linguistique identifiable ;
6.  elle améliore réellement la représentation ou l'exploitation des
    données.

## 8. Architecture consolidée après A2-LING-v1

``` text
ENTRY
├── LINGUISTIC_PROPERTIES
│   ├── catégorie grammaticale
│   ├── écriture
│   ├── suffixe
│   └── compteur
│
└── SENSE
    ├── category
    │   ├── level_1
    │   ├── level_2
    │   └── level_3 [si nécessaire]
    ├── semantic_type
    ├── dimensions[]
    ├── relations[]
    └── LINGUISTIC_FUNCTIONS
        ├── grammatical[]
        └── pragmatic_discourse[]
```

## 9. Gouvernance

Ce snapshot devient la référence officielle de travail pour la couche
`linguistic`.

Toute modification ultérieure doit être explicitée dans une nouvelle
version.

Procédure officielle :

**travail → stress-test → validation → snapshot officiel → étape
suivante**

Aucune des couches déjà figées (`category`, `semantic_type`,
`dimensions`, `relations`) ne doit être modifiée implicitement pendant
les étapes suivantes.

## 10. Prochaine étape

Les cinq composantes principales de l'architecture sont désormais
disponibles :

1.  `category` ;
2.  `semantic_type` ;
3.  `dimensions[]` ;
4.  `relations[]` ;
5.  `linguistic`.

La prochaine étape consiste à consolider leur articulation dans le
modèle global `ENTRY → SENSE`, puis à effectuer un stress-test
transversal final sur un ensemble limité de cas difficiles avant le
snapshot global de l'architecture.
