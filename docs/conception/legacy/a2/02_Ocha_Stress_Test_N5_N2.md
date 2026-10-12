# Ocha — Stress-test sémantique N5 → N2

## Objet
Synthèse des enseignements du stress-test réalisé sur environ 5 000 mots N5 → N2.

## 1. But
Vérifier si l'architecture construite avec le N5 résiste à l'arrivée de vocabulaire N4, N3 et N2.

Le test devait révéler :
- catégories trop larges ;
- catégories trop étroites ;
- chevauchements ;
- trous ;
- faux besoins de nouveaux Level 1 ;
- informations qui doivent devenir transversales.

## 2. Conclusion générale
Le principal problème n'est pas de multiplier les Level 1.

Il faut distinguer :

```text
domaine
≠ nature sémantique
≠ relation
≠ fonction linguistique
≠ tag transversal
```

## 3. Abstrait
`Abstrait` ne doit pas être un macro-domaine fourre-tout.

La notion d'abstraction relève plutôt d'un semantic_type ou d'une dimension appropriée.

## 4. Objets / 物
Le N4 → N2 fournit de nombreux objets : outils, instruments, pièces, objets domestiques, matériaux, objets techniques, marchandises.

Conclusion :
> `objet` est une information sémantique importante, mais pas nécessairement un Level 1 universel.

## 5. Mesures
Unités, instruments, grandeurs, propriétés mesurables et opérations de mesure n'ont pas la même nature.

Conclusion :
> mesure/quantification doit être traitée comme dimension transversale plutôt que comme Level 1 automatique.

## 6. Logique et relations
Le corpus supérieur fait émerger différence, identité, opposition, contradiction, inclusion, appartenance, connexion, séparation, cause, comparaison, distribution, orientation.

Conclusion :
> ces relations doivent être représentables sans créer automatiquement un macro-domaine « Logique & Relations ».

## 7. 違う
`違う` est un verbe lexical plein exprimant différence/altérité. Il ne doit pas tomber en NULL simplement faute de domaine évident.

Le N2 renforce le réseau avec :
- 同じ
- 相違
- 対照
- 対立
- 矛盾
- 別々
- 同格
- 平等

## 8. Transitif / intransitif
Relations importantes observées :
- 散らかす ↔ 散らかる
- 溶かす ↔ 溶ける
- 挟む ↔ 挟まる
- 塞ぐ ↔ 塞がる
- ぶつける ↔ ぶつかる
- 纏める ↔ 纏まる

Une relation explicite de type `transitive_of` / `intransitive_of`, ou un mécanisme générique de relations lexicales, est à envisager.

## 9. Linguistique
Le champ linguistique ne doit pas devenir du texte libre.

Fonctions candidates observées :
- connecteur
- comparatif
- interrogatif
- déictique
- intensifieur
- quantificateur
- négation
- pluralisation
- suffixe
- compteur
- modalité
- aspect
- temps
- politesse
- discours
- alternative
- catégorie grammaticale
- écriture

## 10. Polysémie
Le modèle doit permettre :

```text
ENTRY
  └── SENSE
       ├── category
       ├── subcategory
       ├── semantic_type
       ├── relations
       └── linguistic
```

Une forme lexicale ne doit pas être forcée dans une seule catégorie lorsqu'elle possède plusieurs senses.

## 11. Relations transversales
Familles importantes :
- cause
- conséquence
- inclusion
- appartenance
- partie_de
- connexion
- séparation
- comparaison
- opposition
- équivalence
- orientation
- distribution
- transitif/intransitif

## 12. Axes conceptuels
Exemples récurrents :

```text
attacher ↔ détacher
entrer ↔ sortir
partir ↔ revenir
chauffer ↔ refroidir
relier ↔ séparer
gagner ↔ perdre
victoire ↔ défaite ↔ égalité
ensemble ↔ séparément
propre ↔ sale
valide ↔ invalide
règle ↔ exception
original ↔ copie
intérieur ↔ extérieur
cause ↔ conséquence
```

## 13. Conclusion
Le stress-test a fait passer le projet de :

> « Où ranger ce mot ? »

à :

> « Quelle information sémantique ce mot porte-t-il, et à quel niveau doit-elle être représentée ? »

C'est la principale conclusion de la phase N5 → N2.
