# Ocha — Document de conception v1

## Addendum A9 · Définitions opérationnelles de six fonctions linguistiques

**Statut** : 🔒 validé le 2026-10-06 (préalable au lot 23 d'A2-04), après une relecture favorable,
sans correction ; validation autorisée par ChatGPT, sur délégation de l'utilisateur. La doctrine du
lot 20 (« aucune fonction sans définition normative ») reste en vigueur pour les fonctions qu'il ne
définit pas (§5, §6).

**Origine** : point d'arrêt normatif ouvert après le lot 22 d'A2-04 (rapport
`docs/rapports/etape2-A2-04-lot23-prealable-normatif.md`) ; arbitrage des questions Q1 à Q11 rendu le
2026-10-06 par ChatGPT, sur délégation de l'utilisateur. Cet addendum met cet arbitrage en forme ;
il n'ajoute aucune décision qui n'y soit pas.

**Objet** : fixer la règle selon laquelle Ocha attribue six fonctions linguistiques d'`A2-LING-v1`
à un sens : `connecteur`, `discours`, `politesse`, `quantificateur`, `comparatif` et
`intensifieur`. A2-LING-v1 fixe leur existence (famille, identifiant), mais ne les définit pas.

**Ce que cet addendum ne fait pas** :
- il ne modifie pas `A2-LING-v1` : ni l'arbre des fonctions, ni les identifiants, ni les familles,
  ni la structure ;
- il ne modifie aucun registre (`linguistic-functions.json`, catégories, types, dimensions,
  relations, classes) ;
- il ne crée aucune fonction, aucune sous-fonction, aucune taxonomie des registres de politesse ;
- il ne définit ni `negation`, ni `pluralisation`, ni aucune autre fonction d'A2-LING (§7) ;
- il ne prend aucune décision lexicale, ne rouvre aucune entrée validée et ne décide la classe
  d'aucun mot.

C'est une convention d'application propre à Ocha, comme A5, A6 et A7.

---

## 1. Constat

A2-LING-v1 nomme quatorze fonctions ; seule `deictique` a une définition normative (A7).
`interrogatif` et `intensifieur` ont été appliquées avant le lot 20 sur un sens implicite (17 sens
pour la première ; le sens « Très » de 大変 pour la seconde). Depuis le lot 20, aucune fonction sans
définition n'est posée ; c'était tenable tant qu'un autre champ (catégorie, dimension, sens, nuance)
portait l'information refusée.

Après le lot 22, les 28 entrées restantes d'A2-04 (mots de liaison, de transition, de réponse,
formules sociales, mots de quantité, de degré et de comparaison) ont pour sens le rôle même que ces
fonctions décrivent. Sans définition, ces sens resteraient sans catégorie, sans type et sans
fonction, indiscernables d'un sens lexical mal rangé (rapport du préalable, §6). Une règle qui
conditionne autant de décisions relève d'un addendum, non d'un arbitrage de lot (`REGLES-CONSTRUCTION`,
« toute évolution passe par un addendum explicite »).

## 2. Principes communs

### 2.1. Le sens modélisé décide

> Une fonction est attribuée à un SENSE **lorsque le rôle qu'elle décrit fait partie intégrante du
> sens tel qu'il est modélisé**, et que la fiche source l'atteste. Un emploi seulement mentionné en
> nuance, ou une traduction contextuelle, ne suffit pas.

C'est la règle d'A7 (§4), étendue aux six fonctions. Elle conserve la doctrine du lot 16 : l'emploi
d'adresse d'un mot lexical (le refus pour 嫌, l'excuse pour 悪い, l'avertissement pour 危ない, la
réplique pour 違う, la prise de congé pour また) reste en nuance, sans sens ni fonction.

### 2.2. Jamais par la classe

Une fonction ne s'attribue **jamais** par la classe grammaticale, ni par l'appartenance à une série
morphologique (règle du lot 11). Une `conjonction` n'est pas `connecteur` du fait de sa classe ; un
`adverbe` n'est pas `intensifieur` du fait de sa classe. Réciproquement, une fonction ne décide pas
de la classe.

### 2.3. Polysémie et cumul

1. **Chaque SENSE porte ses propres fonctions** (A2-LING, §6) : deux sens d'une même entrée peuvent
   recevoir des fonctions différentes, ou aucune.
2. **Le cumul est autorisé sur un même SENSE** lorsque **chaque fonction décrit un rôle distinct**,
   **intégral au sens modélisé** (§2.1) et **attesté par la fiche**. Le cumul se fait dans une même
   famille ou entre les deux familles.
3. **On ne scinde jamais un sens uniquement pour éviter un cumul.**
4. **Si la fiche établit réellement deux emplois distincts**, le découpage en deux sens reste
   possible, selon les règles ordinaires du découpage (« un SENSE n'est pas une traduction »).
5. **Chaque fonction posée est justifiée** par la décision qui la pose ; un cumul est justifié
   fonction par fonction.

### 2.4. Ce que la fonction ne dit pas

La relation précise (opposition, addition, succession…), le registre (familier, poli, formel), la
contrainte de construction (« toujours suivi d'une négation ») se disent **dans la nuance**. Aucune
n'est une sous-fonction : A2-LING-v1 n'en officialise aucune (§4, §5).

---

## 3. Définitions

### 3.1. `connecteur` (famille PRAGMATIC / DISCOURSE)

> **`connecteur`** — fonction pragmatique d'un SENSE dont le rôle est de **relier l'énoncé qu'il
> introduit à un énoncé ou à une situation qui précède**, en marquant entre eux une relation
> (opposition, succession, addition, conséquence). La relation précise est dite dans la nuance ;
> elle n'est pas une sous-fonction.

**Frontières** :
1. le connecteur relie deux **énoncés** (ou un énoncé et la situation qui le précède), non deux
   éléments d'un même syntagme ; une énumération de noms ne fait pas un connecteur ;
2. organiser l'échange sans relation avec ce qui précède (ouvrir, faire passer à une autre étape,
   clore) relève de `discours` (§3.2) ;
3. une relation entre deux sens du lexique reste une relation d'A2-REL (§4.4).

### 3.2. `discours` (famille PRAGMATIC / DISCOURSE)

> **`discours`** — fonction pragmatique d'un SENSE dont le rôle est de **gérer l'échange lui-même**
> plutôt que d'en apporter le contenu : **répondre** (accord, confirmation, réponse à un appel,
> dénégation), **ouvrir ou faire passer** l'échange à une autre étape (transition, changement de
> sujet), **le clore** (conclusion, prise de congé).

**Frontières** :
1. un sens qui **tire une conséquence** de ce qui précède (« dans ce cas ») est `connecteur` ; un
   sens qui **fait passer l'échange** (« bon, alors… », « à demain ») est `discours` ; un sens qui
   fait les deux, si la fiche atteste les deux rôles comme intégraux, porte les deux (§2.3) ;
2. les marqueurs d'hésitation ou de gêne qu'une fiche mentionne sans les développer restent en
   nuance (option D2 non retenue) ;
3. A2-LING (§5) : un sens n'entre pas dans `communication_langage` parce qu'il organise l'échange
   (§4.1).

### 3.3. `politesse` (famille PRAGMATIC / DISCOURSE)

> **`politesse`** — fonction pragmatique d'un SENSE qui **accomplit un acte social conventionnel**
> par une formule : remercier, inviter, offrir, céder le passage, décliner une offre ou un
> remerciement, prendre congé poliment. Le **registre** (familier, poli, formel) est dit dans la
> nuance ; il n'est pas une sous-fonction.

**Frontières** :
1. **la politesse n'est pas le registre** : une marque de registre poli ou formel (forme polie d'un
   mot, pronom de respect, interrogatif poli) ne suffit pas à attribuer la fonction (option P2 non
   retenue) ; le registre des formules est porté par `data/registres.json` et
   `data/expressions.json`, que cette fonction ne duplique pas (§4.6) ;
2. **la formule doit être le sens modélisé** (§2.1) : l'emploi social d'un mot lexical reste en
   nuance (doctrine du lot 16) ;
3. `relations_sociales › interactions_sociales` désigne des concepts d'interaction (rencontrer,
   demander) ; une formule n'y entre pas du seul fait qu'elle est sociale (§4.1).

### 3.4. `quantificateur` (famille GRAMMATICAL)

> **`quantificateur`** — fonction grammaticale d'un SENSE qui **quantifie un référent désigné par un
> autre mot** (un nom, le sujet ou l'objet d'un verbe), en en donnant l'étendue : beaucoup, peu, un
> peu, tout. Le concept de quantité reste porté par la catégorie `nombres_quantification` lorsqu'elle
> s'applique (A2-LING, §5). Un mot qui **prédique** la quantité (« les livres sont nombreux ») ou qui
> **désigne** une quantité n'est pas un quantificateur.

**Frontières** :
1. **compteur ≠ quantificateur** (A2-LING, §5) : un compteur, ou un nom formé avec un compteur,
   n'est pas quantificateur ;
2. **rôle et concept** : la fonction dit le rôle (quantifier un autre mot), la catégorie le concept
   (une grande quantité, une totalité) ; les deux peuvent coexister sur un sens sans se dupliquer ;
   un sens qui prédique ou désigne une quantité garde la catégorie seule (options Q2 et « catégorie
   seule » non retenues) ;
3. **avec `intensifieur`** : un mot qui quantifie un référent (« un peu d'eau ») et modifie un degré
   (« un peu froid ») reçoit, sens par sens, la fonction qui décrit le rôle attesté ; si un même
   sens a réellement les deux rôles, le cumul suit le §2.3.

### 3.5. `comparatif` (famille GRAMMATICAL)

> **`comparatif`** — fonction grammaticale d'un SENSE qui **situe le degré d'une propriété, d'une
> quantité ou d'une action par rapport à une référence** : un autre terme, le niveau actuel
> (comparatif), ou l'ensemble de tous les termes (superlatif).

**Frontières** :
1. **l'identité et la similitude ne sont pas des comparaisons de degré** (option K2 non retenue) :
   « même », « différent », « semblable » relèvent du sens et, entre sens du lexique, des relations
   (A2-DIM, §4 : identité, similarité, comparaison « reportées vers `relations` ») ;
2. **la relation `compared_to`** relie deux sens du lexique ; la fonction décrit le rôle d'un mot
   dans la phrase : elles ne se dupliquent pas (§4.4) ;
3. **un classement n'est pas une comparaison** : la première position dans une série (« premier »,
   « numéro un ») est un ordinal, qui relève de sa catégorie (`nombres_quantification`).

### 3.6. `intensifieur` (famille PRAGMATIC / DISCOURSE)

> **`intensifieur`** — fonction pragmatique d'un SENSE qui **modifie le degré d'une propriété, d'un
> état ou d'une action exprimés par un autre mot, en le renforçant ou en l'atténuant**, sans désigner
> lui-même la propriété, l'état ou l'action modifiés.

**Frontières** :
1. **les deux sens de la modification** : la fonction couvre le renforcement (« très ») et
   l'atténuation (« pas tellement », « un peu »), que les fiches nomment ; A2-LING n'a pas de
   fonction « atténuateur », et aucune n'est créée ;
2. **avec `comparatif`** : un degré **situé par rapport à une référence** (le niveau actuel,
   l'ensemble des termes) est `comparatif` ; s'il est aussi, dans le même sens, une modification de
   degré attestée par la fiche, le cumul suit le §2.3 ;
3. **avec la négation** : quand la négation est portée par le verbe, l'adverbe qui l'accompagne ne
   reçoit pas `negation` (précédents D1387, D1390) ; la contrainte « employé avec une négation » est
   une construction, dite en nuance ;
4. **avec `quantificateur`** : voir §3.4, frontière 3.

---

## 4. Frontières avec les autres couches

### 4.1. Catégories (A2-L3)

- Une fonction **ne remplace pas** une catégorie et **n'en crée pas** (A2-LING, §1). Un sens qui
  porte une fonction et n'a pas de domaine thématique a `category: null` ; la fonction le justifie
  (A5).
- **`quantificateur` et `nombres_quantification`** : le concept de quantité ou de totalité reste dans
  la catégorie lorsqu'elle s'applique ; la fonction ne la duplique pas (§3.4).
- **`discours` et `communication_langage › parole_conversation › reponse`** : cette catégorie désigne
  le concept de réponse (répondre) ; un mot qui répond n'y entre pas pour cela (A2-LING, §5).
- **`politesse` et `relations_sociales › interactions_sociales`** : même logique (§3.3).
- **Degré et comparaison** : le registre n'a aucune catégorie du degré ni de la comparaison ; aucune
  n'est créée.

### 4.2. Types sémantiques (A2-ST)

Une fonction **ne décide pas** du type. Un sens dont le contenu est le rôle fonctionnel lui-même n'a
en général aucun type terminal applicable : `semantic_type: null`, justifié par une décision
`type-nul` (A6), comme 何, 大変 « très » et また, sens 2. `concept_abstrait` ne sert pas de type de
secours (D1403). Un sens qui porte une fonction **et** désigne une entité, une occurrence, une
condition ou une abstraction garde le type qui la décrit.

### 4.3. Dimensions (A2-DIM)

Une dimension caractérise un sens ; une fonction décrit un rôle. Elles ne se remplacent pas :
- A2-DIM n'a ni axe du degré, ni axe de la quantité (« Quantification n'est pas dupliquée »), ni
  axe de la comparaison (reportée aux relations) : aucun conflit avec les six fonctions ;
- une modalité conceptuelle reste une dimension (`probabilite` pour たぶん), non une fonction
  `modalite`, qui n'est pas définie ;
- l'exactitude ou l'approximation d'une mesure relève des axes existants
  (`exactitude_inexactitude`, `precision_imprecision_ambiguite`), selon la règle du lot 16 (un axe
  employé lorsqu'il décrit directement le sens), non d'une fonction.

### 4.4. Relations (A2-REL)

Une relation relie **deux sens du lexique** (A ↔ B) ; une fonction décrit le **rôle d'un sens dans
l'énoncé**. Elles ne se dupliquent pas : `compared_to` n'est pas `comparatif`, `opposed_to` n'est
pas `connecteur`. Les relations restent reportées à la passe finale 5.16.

### 4.5. Classes grammaticales

Ni la classe ne décide de la fonction, ni la fonction de la classe (§2.2). Les classes
`conjonction` et `interjection` du registre s'emploient selon les règles ordinaires des lots. Une
classe absente du registre (« particule ») ne se crée pas par cet addendum : la classe de など fera
l'objet d'un préalable spécifique, après A9 (§6).

### 4.6. Registres de politesse de l'application

Le registre (familier, poli, honorifique, humble) est porté par `data/registres.json` et, pour les
formules, par `data/expressions.json`. `politesse` **ne duplique pas** ce système : elle marque
l'acte social accompli par une formule, non le registre d'une forme (§3.3). Aucune taxonomie des
registres n'est créée dans la couche linguistique (A2-LING, §5).

---

## 5. Application et effets

| Où | Effet |
|---|---|
| Reconstruction A2-04 | les décisions qui attribuent ou refusent l'une des six fonctions **citent cet addendum** au lieu de poser une définition ; un cumul est justifié fonction par fonction (§2.3) |
| Doctrine du lot 20 | elle **reste en vigueur** pour les fonctions qui n'ont pas de définition normative (toutes sauf `deictique` et les six d'A9) |
| A5, A6 | inchangés : un sens qui porte une fonction n'exige pas de décision `categorie-nulle` (A5) ; pendant A2-04, tout `semantic_type: null` exige une décision `type-nul`, même avec une fonction (règle de 5.1c) |
| Validateur lexical | **aucun changement** : les six fonctions sont déjà des valeurs du registre, contrôlées par I13 |
| Outils de reconstruction | **aucun changement** |
| **Données déjà validées** | **réservation pour l'audit A2-05**, sans réouverture immédiate : auditer les sens validés susceptibles de relever des six fonctions, **au minimum また, sens 2 « Aussi, de plus »** (D1381, refusée faute de définition, qui relèverait de `connecteur`). Le sens « Très » de 大変 (`intensifieur`, D0074) est compatible avec la définition du §3.6 ; l'audit le confirme. La règle est décidée maintenant ; seul l'audit de ses conséquences antérieures est reporté |
| Lot 23 et suivants | la définition s'applique telle quelle, sens par sens, à la proposition de chaque lot ; son périmètre est arbitré à part, sans décision lexicale avant cet arbitrage |

## 6. Ce qui reste hors de cet addendum

- **`negation` et `pluralisation`** : non définies à ce stade (aucun besoin observé qui ne soit
  couvert par le sens, la nuance ou une fonction définie) ; la doctrine du lot 20 s'y applique.
- **`interrogatif`, `modalite`, `aspect`, `temps`, `alternative`** : non définies ; `interrogatif`
  reste appliquée aux sens validés sur un sens implicite (point ouvert inchangé).
- **など** : hors du lot 23 ; sa classe (« particule suffixe » selon sa fiche, classe absente du
  registre) fera l'objet d'un **préalable spécifique, après A9**.
- **Le registre de politesse** des formes lexicales : non modélisé dans la couche linguistique.

---

## Décisions de cet addendum

| Point | Décision |
|---|---|
| Niveau de gouvernance | addendum de conception Ocha (A9), et non nouvelle version d'A2-LING (Q1) |
| Principe d'attribution | le rôle fait partie intégrante du sens modélisé et la fiche l'atteste ; jamais par la classe (Q9) |
| Polysémie et cumul | fonctions par SENSE ; cumul autorisé si chaque fonction décrit un rôle distinct, intégral au sens modélisé et attesté par la fiche ; jamais de scission pour éviter un cumul ; découpage possible si la fiche établit deux emplois distincts (Q2) |
| `connecteur` | relier l'énoncé introduit à un énoncé ou à une situation qui précède, par une relation dite en nuance (Q3, C1) |
| `discours` | gérer l'échange : répondre, ouvrir ou faire passer, clore (Q4, D1) |
| `politesse` | accomplir un acte social conventionnel par une formule ; le registre en nuance, jamais une fonction (Q5, P1) |
| `quantificateur` | quantifier un référent désigné par un autre mot ; le concept reste à la catégorie ; ni prédicat ni nom de quantité (Q6, Q1) |
| `comparatif` | situer un degré par rapport à une référence : comparatif, superlatif ; ni identité, ni classement (Q7, K1) |
| `intensifieur` | modifier le degré d'une propriété, d'un état ou d'une action exprimés par un autre mot, en le renforçant ou en l'atténuant, sans les désigner lui-même (Q7, I1 reformulée) |
| Données validées | audit A2-05, sans réouverture immédiate ; au minimum また, sens 2 (Q8) |
| など | hors du lot 23 ; préalable spécifique sur sa classe, après A9 (Q10) |
| `negation`, `pluralisation` | non définies (Q11) |
| Registres, A2-LING, outils | inchangés |
