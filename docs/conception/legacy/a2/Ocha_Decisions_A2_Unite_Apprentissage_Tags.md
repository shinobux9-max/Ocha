# Ocha — Décisions A2 : unité d'apprentissage et tags

## Objectif

Ce projet sert à prendre deux décisions de conception avant l'implémentation concrète de l'architecture sémantique A2.

Les deux décisions sont :

1. déterminer ce qui constitue l'unité d'apprentissage suivie par Ocha v1 ;
2. définir précisément le rôle des `tags` dans l'architecture Ocha.

Ces décisions doivent être compatibles avec l'architecture A2 existante et avec les parties déjà verrouillées de la conception d'Ocha.

---

## Décision 1 — Unité d'apprentissage v1

### Question

A2 introduit une structure :

`ENTRY → SENSE[]`

Une même entrée lexicale peut donc posséder plusieurs sens, chacun pouvant avoir sa propre classification sémantique.

Exemple conceptuel :

`高い`
- sens : haut / élevé
- sens : cher

### Choix à examiner

Déterminer si, dans Ocha v1, l'élément suivi par :
- l'état d'apprentissage ;
- le SRS ;
- les révisions ;
- les faiblesses ;
- les événements ;
- les prérequis / enseignements lorsque concernés ;

reste l'`ENTRY`, ou devient le `SENSE`.

### Point de départ proposé

La proposition actuelle est :

**Ocha v1 suit l'`ENTRY` comme unité d'apprentissage.**

Les `SENSE` servent à enrichir la représentation lexicale et sémantique de l'entrée sans créer un second système de progression.

Cette proposition doit être examinée avant d'être considérée comme définitivement verrouillée.

### Contraintes

Si l'unité devient `SENSE`, il faudrait réexaminer les parties de la conception qui supposent actuellement qu'un élément possède un état unique.

Si l'unité reste `ENTRY`, il faut préciser comment les différents `SENSE` interviennent dans :
- l'affichage ;
- les exemples ;
- la sélection thématique ;
- les exercices ;
- les sessions ciblées.

---

# Décision 2 — Statut des `tags`

### Question

L'architecture A2 sépare notamment :
- `category` : domaine sémantique principal hiérarchique ;
- `semantic_type` : nature ontologique ;
- `dimensions` : propriétés ;
- `relations` : liens conceptuels ;
- fonctions linguistiques.

Nous avons également envisagé des `tags` pour représenter des appartenances transversales utiles à la sélection et aux sessions thématiques.

### Exemple

Un mot pourrait avoir :

`category`
→ Maison
→ Cuisine
→ Électroménager

tout en étant également pertinent pour un thème transversal comme :

`électricité`

Le tag permettrait alors de ne pas déformer la hiérarchie principale pour représenter cette relation secondaire.

### Question à trancher

Déterminer si `tags` doit devenir une composante officielle du modèle de données Ocha v1.

Si oui, définir :
- leur rôle exact ;
- ce qu'ils peuvent représenter ;
- ce qu'ils ne doivent pas représenter ;
- leur niveau d'application (`ENTRY`, `SENSE` ou autre) ;
- leur relation avec `category` ;
- leur relation avec `semantic_type` ;
- leur relation avec `dimensions` ;
- leur relation avec `relations` ;
- qui peut créer un tag ;
- comment les tags sont référencés et validés ;
- si les tags sont hiérarchiques ou plats ;
- comment ils pourront être utilisés par les futures sessions ciblées.

### Point de départ proposé

Les `tags` ne doivent pas devenir une catégorie « fourre-tout ».

Ils doivent représenter uniquement des appartenances transversales qui ne trouvent pas naturellement leur place dans la hiérarchie `category` ou dans une autre couche A2.

---

## Méthode de travail

Ne pas implémenter immédiatement.

Commencer par :
1. examiner les documents A2 ;
2. examiner les parties concernées de la conception Ocha ;
3. identifier les conséquences de chaque choix ;
4. comparer les alternatives ;
5. proposer une décision ;
6. vérifier qu'elle ne contredit pas les règles existantes ;
7. seulement ensuite produire le document de décision définitif.

Aucune modification du code ou des données ne doit être faite pendant cette phase sans décision explicite.

## Résultat attendu

À la fin de ce projet, produire un court document de décision permettant de poursuivre sans ambiguïté vers :

- le document de liaison A2 ↔ conception ;
- le schéma concret des données A2 ;
- les registres ;
- le validateur A2 ;
- la migration du N5.