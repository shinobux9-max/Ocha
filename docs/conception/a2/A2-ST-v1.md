# Ocha — Snapshot officiel des Semantic Types

**Version :** A2-ST-v1  
**Statut :** Référence officielle de travail  
**Dépendance :** `Ocha_Snapshot_Officiel_A2_Level1-3_v1.md`  
**Base d’audit :** stress-test JLPT N5 → N2 (~5 000 entrées disponibles)

## 1. Rôle de `semantic_type`

`semantic_type` répond à la question :

> **Quelle sorte d’entité ou de concept ce sens lexical désigne-t-il ?**

Il est orthogonal à `category`.

Exemples :

```text
医者
category      = Santé & médecine > Professionnels de santé
semantic_type = Personne

病院
category      = Santé & médecine > Établissements de santé
semantic_type = Lieu

冷蔵庫
category      = Habitat & vie domestique > Équipements domestiques
semantic_type = Objet / artefact

悲しい
category      = Être humain > Émotions & sentiments
semantic_type = État

食べる
category      = Alimentation & cuisine > Consommation alimentaire
semantic_type = Action
```

## 2. Architecture officielle

```text
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

## 3. Définitions de frontière

### ENTITY

**Personne**  
Un individu humain désigné en tant qu’individu, rôle, profession, relation ou statut.

**Organisme vivant**  
Un être vivant non traité comme personne humaine : animal, plante ou autre organisme.

**Objet / artefact**  
Objet matériel individualisable, en particulier lorsqu’il est fabriqué, utilisé ou structuré par une fonction.

**Substance / matière**  
Matière, matériau ou substance considérée comme masse/composition plutôt que comme objet individualisé.

**Lieu**  
Espace ou emplacement conceptualisé comme lieu : bâtiment fonctionnel, territoire, espace naturel, espace aménagé, etc.

**Organisation**  
Entité collective structurée disposant d’une organisation ou fonction institutionnelle : entreprise, administration, parti, association, etc.

**Groupe / collectif**  
Ensemble de personnes ou d’entités considéré collectivement sans nécessiter une structure institutionnelle propre.

### OCCURRENCE

**Action**  
Faire ou acte principalement conceptualisé comme accompli par un agent.

**Processus**  
Évolution, déroulement ou transformation conceptualisé dans sa progression plutôt que comme acte ponctuel.

**Événement**  
Occurrence conceptualisée comme quelque chose qui survient.

**Résultat**  
Entité ou état conceptualisé principalement comme l’aboutissement d’une action, d’un processus ou d’un événement.

### CONDITION

**État**  
Condition dans laquelle se trouve momentanément ou contextuellement une entité.

**Propriété**  
Caractéristique attribuable à une entité, indépendamment du fait qu’elle soit permanente ou variable.

### ABSTRACT

**Information / contenu**  
Contenu informationnel, données ou information représentable/transmissible indépendamment de son support matériel.

**Quantité / valeur**  
Valeur quantitative, quantité ou grandeur conceptualisée abstraitement.  
La notion de mesure reste toutefois une dimension transversale : unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type.

**Concept abstrait**  
Concept non matériel qui ne relève pas plus précisément d’un autre Semantic Type.

Ce type ne doit **jamais** devenir une catégorie de secours.

## 4. Ce qui n’est PAS un Semantic Type

Les éléments suivants relèvent des prochaines couches architecturales :

- cause / conséquence ;
- identité / différence ;
- similarité ;
- opposition ;
- comparaison ;
- inclusion / appartenance ;
- partie / totalité ;
- connexion / séparation ;
- orientation ;
- distribution ;
- possibilité / impossibilité ;
- nécessité ;
- validité / adéquation ;
- exactitude ;
- mesure ;
- transitif / intransitif ;
- fonctions grammaticales, discursives ou pragmatiques.

Ils ne doivent donc pas être ajoutés à `semantic_type` simplement pour classifier un mot difficile.

## 5. Règles d’utilisation

1. `semantic_type` est attribué au **SENSE**, pas obligatoirement à l’entrée lexicale entière.
2. `semantic_type` ne remplace jamais `category`.
3. Deux sens d’un même mot peuvent avoir des Semantic Types différents.
4. La fonction ou le domaine spécialisé détermine `category`; la nature de l’entité détermine `semantic_type`.
5. Un objet spécialisé reste `Objet / artefact` même si sa catégorie est Santé, Alimentation, Technologie, etc.
6. Une profession spécialisée reste `Personne`.
7. Un établissement fonctionnel est généralement `Lieu`; l’institution qui l’exploite peut constituer un autre sens de type `Organisation`.
8. `Concept abstrait` n’est pas un fourre-tout.
9. Les relations conceptuelles sont stockées séparément.
10. Les informations grammaticales/pragmatiques sont stockées séparément.

## 6. Modèle architectural actuel

```text
ENTRY
└── SENSE
    ├── category
    │   ├── level_1
    │   ├── level_2
    │   └── level_3 [si nécessaire]
    │
    ├── semantic_type
    │
    ├── dimensions      [prochaine étape]
    ├── relations       [prochaine étape]
    └── linguistic
```

## 7. Gouvernance

Ce snapshot est désormais la référence officielle pour la couche `semantic_type`.

Toute modification ultérieure — ajout, suppression, fusion, scission ou changement de définition d’un Semantic Type — devra être documentée dans un nouveau snapshot.

La procédure reste :

**travail → stress-test → validation → snapshot officiel → étape suivante**

## 8. Prochaine étape

Construire et stress-tester la couche :

**Dimensions conceptuelles transversales**

avant d’aborder définitivement les relations sémantiques.
