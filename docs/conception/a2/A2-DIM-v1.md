# Ocha — Snapshot officiel des Dimensions conceptuelles

**Version :** A2-DIM-v1  
**Statut :** Référence officielle de travail  
**Dépendances :** snapshots A2 Level 1–3 et A2 Semantic Types  
**Base d’audit :** stress-test JLPT N5 → N2 (~5 000 entrées)

## 1. Rôle
Une dimension conceptuelle décrit une caractéristique abstraite transversale portée par un sens lexical. Elle ne remplace ni `category`, ni `semantic_type`, ni une relation entre deux concepts, ni la couche `linguistic`.

## 2. Dimensions officielles

```text
DIMENSIONS
├── MODALITÉ CONCEPTUELLE
│   ├── Possibilité ↔ Impossibilité
│   ├── Nécessité ↔ Facultativité
│   ├── Probabilité
│   └── Certitude ↔ Incertitude
├── DIFFICULTÉ
│   ├── Facilité ↔ Difficulté
│   └── Simplicité ↔ Complexité
├── VALIDITÉ & QUALITÉ CONCEPTUELLE
│   ├── Validité ↔ Invalidité
│   ├── Exactitude ↔ Inexactitude
│   ├── Précision ↔ Imprécision / ambiguïté
│   └── Adéquation ↔ Inadéquation
├── RÉALITÉ & STATUT ÉPISTÉMIQUE
│   ├── Réel ↔ Fictif
│   ├── Vrai ↔ Faux
│   └── Évidence ↔ Non-évidence
├── NORMALITÉ
│   ├── Normal ↔ Anormal
│   ├── Habituel ↔ Exceptionnel
│   └── Attendu ↔ Inattendu
├── ÉVALUATION FONCTIONNELLE
│   ├── Importance ↔ Insignifiance
│   ├── Utilité ↔ Inutilité
│   ├── Efficacité ↔ Inefficacité
│   └── Avantage ↔ Désavantage
├── COMPLÉTUDE & ORGANISATION
│   ├── Complet ↔ Incomplet
│   ├── Uniforme ↔ Non uniforme
│   └── Ordonné ↔ Désordonné
├── FONCTIONNEMENT
│   ├── Fonctionnel ↔ Défaillant
│   └── Actif ↔ Inactif
└── NATURE CONCEPTUELLE
    └── Concret ↔ Abstrait
```

## 3. Frontières
- Modalité conceptuelle ≠ modalité grammaticale.
- Vérité ≠ réalité ≠ certitude ≠ exactitude ≠ précision.
- L’adéquation est une dimension lorsqu’elle caractérise la convenance ; une correspondance explicite A↔B relève des relations.
- `Valeur` n’est pas une dimension universelle : valeur économique, valeur mesurée et évaluation abstraite doivent rester distinguées.
- `Quantification` n’est pas dupliquée ici : elle possède déjà le Level 1 `Nombres & quantification`.
- Les propriétés physiques ne sont pas regroupées dans une dimension universelle unique.

## 4. Reporté vers `relations`
Identité ; différence ; similarité ; comparaison ; opposition ; équivalence ; inclusion ; appartenance ; partie/totalité ; connexion ; séparation ; causalité ; conséquence ; orientation relationnelle ; distribution ; réciprocité ; composition ; correspondance explicite ; transitif/intransitif.

## 5. Non promu à ce stade
Réussite/échec ; désir/volonté ; capacité ; effort ; transformation/modification ; accomplissement ; existence/absence ; limite/seuil/condition ; hasard/contingence ; classification/exemplarité ; situation/contexte.

Ces familles restent réévaluables si les futurs tests montrent une lacune structurelle.

## 6. Modèle actuel
```text
ENTRY
└── SENSE
    ├── category
    │   ├── level_1
    │   ├── level_2
    │   └── level_3 [si nécessaire]
    ├── semantic_type
    ├── dimensions[]
    ├── relations[]      [prochaine étape]
    └── linguistic
```

Un sens peut porter zéro, une ou plusieurs dimensions.

## 7. Principe anti-prolifération
Une nouvelle dimension exige : récurrence corpus ; transversalité ; absence de doublon avec `semantic_type` ; absence de relation intrinsèquement binaire ; utilité discriminante ; définition et frontières stables.

## 8. Gouvernance
Ce snapshot devient la référence officielle de la couche `dimensions`.

**travail → stress-test → validation → snapshot officiel → étape suivante**

## 9. Prochaine étape
Construire et stress-tester les **Relations sémantiques transversales**, notamment identité/différence/similarité, comparaison/opposition/équivalence, inclusion/appartenance/partie-de, connexion/séparation, causalité/conséquence, composition, orientation, distribution/réciprocité, correspondance et relations lexicales transitif/intransitif.
