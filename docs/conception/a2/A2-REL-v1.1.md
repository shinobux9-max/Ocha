# Ocha --- Snapshot officiel des Relations sémantiques

**Version :** A2-REL-v1.1\
**Statut :** Référence officielle de travail --- révision de A2-REL-v1\
**Dépendances :** - `Ocha_Snapshot_Officiel_A2_Level1-3_v1.md` -
`Ocha_Snapshot_Officiel_A2_Semantic_Types_v1.md` -
`Ocha_Snapshot_Officiel_A2_Dimensions_v1.md`

**Base d'audit :** stress-test JLPT N5 → N2 (\~5 000 entrées) +
crash-test transversal final

## 1. Objet de la révision

Cette version reprend A2-REL-v1 sans modifier les familles de relations
déjà validées.

Seule modification architecturale :

-   `oriented_toward` est retirée de la liste des relations
    opérationnelles ;
-   `distributed_over` est retirée de la liste des relations
    opérationnelles.

Ces deux candidats avaient été explicitement placés **À SURVEILLER**
dans A2-REL-v1. Le crash-test final confirme l'existence conceptuelle de
l'orientation et de la distribution, mais ne fournit pas une structure
relationnelle A→B suffisamment stable, récurrente et délimitée pour
justifier deux types de relations génériques.

Leur retrait ne signifie donc pas que les concepts d'orientation ou de
distribution disparaissent de l'architecture. Ils peuvent continuer à
être représentés par les domaines, dimensions, sens lexicaux ou autres
couches appropriées.

## 2. Rôle

La couche `relations` représente les liens sémantiques explicites entre
deux sens, concepts ou unités lexicales.

Elle ne doit pas : - remplacer le domaine thématique (`category`) ; -
décrire la nature ontologique du sens (`semantic_type`) ; - dupliquer
une caractéristique intrinsèque déjà portée par `dimensions` ; -
absorber les fonctions grammaticales, discursives ou pragmatiques de
`linguistic`.

## 3. Relations officielles --- A2-REL-v1.1

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

## 4. Symétrie et direction

### Relations traitées comme symétriques

-   `identical_to`
-   `different_from`
-   `similar_to`
-   `equivalent_to`
-   `opposed_to`
-   `contrasted_with`
-   `connected_to`
-   `separated_from`
-   `reciprocal_with`

Le lien ne nécessite pas deux enregistrements indépendants pour exprimer
les deux directions.

### Relations dirigées avec inverse

-   `part_of` ↔ `has_part`
-   `member_of` ↔ `has_member`
-   `composed_of` ↔ `component_of`
-   `causes` ↔ `consequence_of`
-   `transitive_of` ↔ `intransitive_of`

L'implémentation peut stocker une relation canonique et déduire
automatiquement son inverse lorsque celui-ci est strictement déterminé.

### Relations dirigées sans inverse figé

-   `corresponds_to`
-   `compared_to`

Aucun inverse supplémentaire n'est créé tant que le corpus ne le
justifie pas.

## 5. Frontières importantes

### Identité ≠ similarité ≠ équivalence

-   `identical_to` : A et B représentent le même élément ou concept dans
    le cadre modélisé ;
-   `similar_to` : A et B partagent une ressemblance sans être
    identiques ;
-   `equivalent_to` : A et B sont considérés comme équivalents selon une
    valeur, une fonction ou un cadre déterminé.

### Différence ≠ opposition ≠ contraste

-   `different_from` exprime la non-identité ou la différence ;
-   `opposed_to` exprime une opposition conceptuelle ;
-   `contrasted_with` représente une mise en contraste explicite.

Une simple différence n'implique donc pas automatiquement une
opposition.

### Appartenance ≠ partie-tout ≠ composition

-   `member_of` : A appartient à un groupe/ensemble B ;
-   `part_of` : A constitue une partie de B ;
-   `composed_of` : A est constitué de B ou d'un ensemble de
    constituants.

Ces structures ne doivent pas être fusionnées.

### Cause et conséquence

`causes` et `consequence_of` décrivent deux directions d'une même
structure causale.

### Axes conceptuels

Les couples observés dans le corpus --- par exemple attacher/détacher,
entrer/sortir, partir/revenir, chauffer/refroidir, gagner/perdre,
intérieur/extérieur --- ne créent pas automatiquement chacun un nouveau
type de relation.

Ils doivent utiliser une relation générique déjà validée lorsqu'elle
convient, ou rester représentés par les autres couches de
l'architecture.

## 6. Relations lexicales

Le corpus N2 confirme la relation entre verbes transitifs et
intransitifs, notamment :

-   散らかす ↔ 散らかる
-   溶かす ↔ 溶ける
-   挟む ↔ 挟まる
-   塞ぐ ↔ 塞がる
-   ぶつける ↔ ぶつかる
-   纏める ↔ 纏まる

La relation officielle reste :

`transitive_of ↔ intransitive_of`

Aucune famille supplémentaire de relations lexicales --- synonymie,
dérivation, variante, causatif, etc. --- n'est officialisée dans cette
version.

## 7. Candidats retirés après crash-test final

### `oriented_toward` --- retirée

L'orientation est bien attestée dans le corpus, notamment comme
direction, position, déplacement orienté ou cible.

Cependant, le crash-test ne démontre pas qu'un type générique
`A oriented_toward B` constitue une relation entre deux `SENSE`
suffisamment stable et utile.

**Décision A2 : non retenue comme relation officielle.**

Une réintroduction future nécessiterait de nouveaux cas corpus montrant
une relation explicite, récurrente et informatiquement définissable.

### `distributed_over` --- retirée

La distribution apparaît comme phénomène transversal dans le corpus,
mais les données disponibles ne démontrent pas suffisamment une relation
générique stable `A distributed_over B`.

Elle peut selon les cas relever d'une action, d'un processus, de la
quantification ou du sens lexical.

**Décision A2 : non retenue comme relation officielle.**

Une réintroduction future nécessiterait des preuves corpus
supplémentaires.

## 8. Principe anti-prolifération

Une nouvelle relation ne doit être créée que si :

1.  elle relie réellement deux sens/concepts ;
2.  elle est récurrente ou structurellement importante ;
3.  elle ne duplique pas une `dimension` ;
4.  elle ne duplique pas une relation existante ;
5.  elle possède une direction et des frontières définissables ;
6.  son ajout améliore réellement la représentation ou l'exploitation
    des données.

Le retrait de `oriented_toward` et `distributed_over` constitue une
application directe de cette règle.

## 9. Modèle architectural

``` text
ENTRY
└── SENSE
    ├── category
    │   ├── level_1
    │   ├── level_2
    │   └── level_3 [si nécessaire]
    ├── semantic_type
    ├── dimensions[]
    ├── relations[]
    └── linguistic
```

## 10. Gouvernance

A2-REL-v1.1 remplace A2-REL-v1 comme référence officielle de travail
pour la couche `relations`.

A2-REL-v1 reste utile comme trace historique de la phase où
`oriented_toward` et `distributed_over` étaient encore sous
surveillance.

Toute évolution ultérieure doit être documentée dans une nouvelle
version.

Procédure officielle :

**travail → stress-test → validation → snapshot officiel → étape
suivante**

Aucune modification des couches `category`, `semantic_type`,
`dimensions` ou `linguistic` n'est introduite par cette révision.

## 11. Étape suivante

Le crash-test transversal final n'a pas mis en évidence de rupture
nécessitant une nouvelle couche architecturale.

La prochaine étape est la création du **snapshot global de
l'architecture A2**, consolidant :

1.  `category` --- Level 1 → Level 3 ;
2.  `semantic_type` ;
3.  `dimensions[]` ;
4.  `relations[]` selon A2-REL-v1.1 ;
5.  `linguistic` ;
6.  l'articulation globale `ENTRY → SENSE`.
