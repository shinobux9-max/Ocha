# Ocha — Reprise et audit final

## À lire en premier dans une nouvelle conversation

Fichiers de référence :
1. `01_Ocha_Etat_et_Architecture.md`
2. `02_Ocha_Stress_Test_N5_N2.md`
3. `Conversation semantique(2).txt` — archive complète (~35 798 lignes)

---

# 1. Situation

Nous avons stress-testé l'architecture sur environ 5 000 mots N5 → N2.

La conversation historique est très longue et contient plusieurs versions successives de l'architecture. Il faut donc raisonner chronologiquement et ne jamais confondre une proposition ancienne avec une décision finale.

---

# 2. Première tâche : déterminer le nombre final

L'archive documente une version comprenant :

- 32 racines considérées solides ;
- 33. Énergie & systèmes énergétiques 🟡 ;
- 34. Urgences & protection civile 🟡.

La phrase historique indique :

> « 32 racines suffisamment solides, plus 2 candidats sérieux à confirmer sur le corpus. »

Une formulation ultérieure parle de « 32–34 racines ».

**Le nombre final est donc à reconstruire, pas à supposer.**

Chercher dans l'archive :
1. dernière liste des racines ;
2. éventuelle promotion d'Énergie ;
3. éventuelle promotion d'Urgences ;
4. éventuelles suppressions/ajouts ultérieurs ;
5. dernière formulation sur le nombre ;
6. décision finale, si elle existe.

Si aucune décision finale n'est retrouvée :
> constater explicitement que le nombre est resté ouvert, puis décider avec le corpus N5 → N2.

---

# 3. Deuxième tâche : construire la liste canonique

Une fois le nombre établi :

```text
01. ...
02. ...
...
N. ...
```

Pour chaque Level 1 :
- nom ;
- définition ;
- sous-domaines ;
- exemples ;
- frontières ;
- domaines voisins ;
- statut historique ;
- décision actuelle.

Ne rien inventer lorsqu'un élément n'est pas supporté par l'archive.

---

# 4. Troisième tâche : audit des domaines

Pour chaque domaine :

1. périmètre ;
2. cohérence ;
3. chevauchements ;
4. trous ;
5. exemples N5 ;
6. exemples N4 ;
7. exemples N3 ;
8. exemples N2 ;
9. cas NULL ;
10. cas polysémiques ;
11. relations transversales ;
12. sous-domaines ;
13. décision.

Statuts :
- 🟢 conserver
- 🟡 ajuster
- 🟠 fusionner
- 🔴 scinder
- 🔵 candidat à créer
- ⚪ à confirmer

---

# 5. Règles de décision

### Règle 1
Ne pas multiplier les Level 1 pour quelques mots difficiles.

### Règle 2
Ne pas utiliser de catégorie-poubelle : abstrait, divers, autre, objets, actions génériques, etc.

### Règle 3
Distinguer domaine et semantic_type.

### Règle 4
Distinguer domaine et relation.

### Règle 5
NULL peut être intentionnel, mais pas comme refuge pour les noms/verbes lexicaux pleins.

### Règle 6
Respecter la polysémie avec plusieurs senses.

### Règle 7
Une décision finale doit être identifiable comme telle dans l'archive ou explicitement prise pendant le nouvel audit.

---

# 6. Architecture de données cible

```text
ENTRY
 └── SENSE
      ├── definition
      ├── category / Level 1
      ├── subcategory
      ├── semantic_type
      ├── dimensions / tags
      ├── relations
      └── linguistic
```

---

# 7. Ce qu'il ne faut pas faire

- repartir des anciennes catégories N5 ;
- inventer une liste de 32 ou 34 de mémoire ;
- traiter les 34 candidats comme 34 définitifs ;
- créer un domaine pour chaque concept transversal ;
- oublier les relations et la polysémie ;
- remplacer une décision historique par une intuition sans le signaler.

---

# 8. Objectif de sortie

À la fin de l'audit, produire une architecture canonique avec :

```text
NOMBRE FINAL : ???

LISTE CANONIQUE
01. ...
02. ...
...

STATUTS
...

DIMENSIONS TRANSVERSALES
...

RELATIONS
...

LINGUISTIQUE
...

NULL INTENTIONNEL
...
```

Le but n'est pas d'obtenir artificiellement 32 ou 34.

Le but est de déterminer l'architecture que le travail N5 → N2 justifie réellement.

---

# 9. Première question

> **Après lecture de l'archive complète, quel est réellement l'état final de l'architecture : 32, 33, 34 ou autre ?**

Ne pas répondre de mémoire. Reconstituer les dernières décisions à partir de l'archive avant de commencer l'audit.
