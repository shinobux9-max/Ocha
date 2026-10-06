# Ocha v2 — Rapport de l'étape 2 · A2-04 · préalable au lot 23 · point d'arrêt normatif sur les fonctions A2-LING

**Date** : 2026-10-06
**Nature** : rapport d'arbitrage **normatif**, demandé après la clôture du lot 22. **Aucune décision
lexicale** : aucun fichier de lot (pas de `lot-23.json`), aucune décision de journal (`A2-04-D…`),
aucune ENTRY modifiée, aucune définition écrite dans la conception, aucun addendum créé. Rien n'est
validé, committé ni poussé.
**Objet** : dire, pour les six fonctions d'A2-LING dont dépendent les 28 entrées restantes
(`connecteur`, `discours`, `politesse`, `quantificateur`, `comparatif`, `intensifieur`), ce que
disent les normes, ce qu'attestent les fiches, et quelles définitions seraient possibles, avec
leurs conséquences. **L'arbitrage choisit ; ce rapport ne décide rien.**
**Nom du fichier** : il porte le préfixe `lot23` parce que ce point d'arrêt conditionne le lot 23 et
que l'export de relecture regroupe les rapports par lot ; ce n'est pas le périmètre du lot 23, qui
ne sera préparé qu'après l'arbitrage.

**État réel vérifié avant ce rapport** : `ocha-v2` = `origin/ocha-v2` = `f3e81bc` ; assemblage réel :
657 ENTRY, 34 retraits, **28 entrées écartées, toutes non décidées**, 0 problème, 0 erreur, 0
attente ; 1 435 décisions validées (D0001 à D1435), aucune proposition en cours ; 474 tests verts.

---

## 1. Méthode

1. **Les 28 identifiants** sont relevés par script : les entrées des sources figées
   (`vocab.json`, `vocab-hors-jlpt.json`) qu'aucun fichier de lot ne décide. Il y en a 28, toutes
   dans `vocab.json`.
2. **Chaque fiche est lue en entier** : traductions, nuance, exemple, particules. Les usages
   rapportés au §4 sont ceux que la fiche **atteste** ; rien n'est ajouté par connaissance externe.
3. **Les normes** relues : `A2-LING-v1` (§1 à §7), le registre `linguistic-functions.json`,
   l'addendum A7 (`deictique`), A5 et A6 (absences justifiées), `A2-DIM-v1` (§3, §4), `A2-L3-v1`
   (§21, « Nombres & quantification »), `A2-REL-v1.1`, `A2-ST-v1`, le registre des classes, et le
   validateur (`tools/lexicon/sense.mjs`, `tools/reconstruction/decisions.mjs`).
4. **Les précédents** sont relevés par script sur l'assemblage réel (toutes les fonctions posées sur
   des sens validés) et sur le journal (toutes les décisions qui refusent ou citent une fonction).
5. **Les formulations proposées au §7** partent des besoins observés dans ces 28 fiches et des
   frontières déjà écrites dans A2-LING ; aucune n'étend une fonction au-delà de ce qu'une fiche
   atteste. Elles sont des **options** ; la recommandation de Claude est dite comme telle.

---

## 2. L'état normatif actuel

### 2.1. Ce que fixe A2-LING-v1

- **14 fonctions**, en deux familles, au niveau du SENSE (§4) : GRAMMATICAL (`interrogatif`,
  `deictique`, `comparatif`, `quantificateur`, `negation`, `pluralisation`, `modalite`, `aspect`,
  `temps`) et PRAGMATIC / DISCOURSE (`connecteur`, `intensifieur`, `alternative`, `discours`,
  `politesse`). « Aucun sous-niveau supplémentaire n'est officialisé. »
- **La couche ne doit pas** remplacer la catégorie, dupliquer une dimension ou une relation, ni
  devenir un texte libre (§1). « Une entrée principalement grammaticale, discursive ou pragmatique
  peut légitimement avoir `category: null`. »
- **Polysémie** (§6) : chaque SENSE porte ses propres fonctions ; on ne force pas tous les emplois
  dans une seule analyse.
- **Anti-prolifération** (§7) : une fonction ne se crée que si elle est récurrente ou structurante,
  ne duplique ni catégorie, ni dimension, ni relation, a une fonction linguistique identifiable et
  améliore réellement la représentation. Ce critère vaut aussi, par analogie, pour l'étendue qu'on
  donne à une fonction existante.
- **Gouvernance** (§9) : toute modification d'A2-LING passe par une nouvelle version. A7 a montré
  l'autre voie : un **addendum de conception Ocha**, qui définit une fonction existante sans
  modifier A2-LING (ni l'arbre, ni les identifiants).

### 2.2. Les six fonctions concernées

| Fonction | Famille | Nom au registre | Définition normative | Ce qu'A2-LING en dit | Précédents validés |
|---|---|---|---|---|---|
| `connecteur` | pragmatique | oui | **absente** | §5 : « les connecteurs et autres unités principalement discursives/pragmatiques peuvent avoir `category: null` » ; sous-fonctions observées (その上 addition, その為 cause, そのほか extension) **non officialisées** | aucune pose ; **refus** : また, sens 2 (D1381) |
| `discours` | pragmatique | oui | **absente** | §5 : « fonction discursive ≠ domaine Communication » : un mot n'est pas en `communication_langage` parce qu'il organise le discours | aucune pose ; **refus** : もう一度 (D1384), また, prise de congé (D1378) |
| `politesse` | pragmatique | oui | **absente** | §5 : « conservée comme fonction » ; le corpus atteste des formes honorifiques et des formules sociales ; **aucune taxonomie des registres** (honorifique, humble, formel, familier) | aucune pose ; **refus** : もう一度 (D1384), また (D1378) ; emplois d'adresse en nuance (lots 16, 20) |
| `quantificateur` | grammaticale | oui | **absente** | §5 : « compteur ≠ quantificateur » ; « la quantité ou le nombre comme concept reste représentable sémantiquement dans `Nombres & quantification` » | aucune pose ; **refus** : いろいろ (D1424) |
| `comparatif` | grammaticale | oui | **absente** | rien | aucune pose ; **refus** : 同じ (D1421) |
| `intensifieur` | pragmatique | oui | **absente** | rien | **une pose** : 大変, sens 1 « Très » (lot 00, D0034, D0074), sur un sens implicite |

**Autres fonctions citées par ces fiches, hors des six** : `negation` (いいえ, あまり ; aucune
définition ; refus pour まだ et もう, D1387, D1390 : « la négation est portée par le verbe ») ;
`pluralisation` (など, question ouverte au périmètre du lot 22 ; aucune définition). Elles ne sont
traitées ici que pour leurs frontières.

### 2.3. Les précédents : deux régimes successifs

**Avant le lot 20, des fonctions ont été posées sans définition écrite**, sur un sens implicite
(`ETAT-ACTUEL.md`, points ouverts : « `interrogatif` et `intensifieur` sont appliqués sur un sens
implicite ; une définition écrite ne sera décidée que si un cas l'exige ») :

| Fonction | Sens validés | Lots |
|---|---|---|
| `interrogatif` | 17 (何, いくら, いくつ, la série en ど, いつ, なぜ…) | 00, 05, 11 |
| `intensifieur` | 1 : 大変, sens 1 « Très » (catégorie nulle, type nul, D0074 : « fonction pragmatique ») | 00 |
| `deictique` | 43 (lot 11, lot 12, 近々, 後) | 11, 12, 13 ; **définie depuis par A7** |

**Depuis le lot 20, la doctrine est inverse** : « aucune fonction qui n'a pas de définition
normative n'est posée ; aucune définition, aucun addendum n'est créé » (D1305, D1319, D1323, D1350 ;
reconduite aux lots 21 et 22 : D1381, D1384, D1387, D1390, D1392, D1397, D1400, D1421, D1424,
D1428, D1434). Elle a été tenable parce que, dans ces lots, la fonction refusée était **contournable** :

| Cas | Ce qui a porté l'information à la place de la fonction |
|---|---|
| 出来る (`modalite`), たぶん (`modalite`) | une dimension d'A2-DIM : `possibilite_impossibilite`, `probabilite` |
| なる (`aspect`), まだ, もう (`aspect`, `negation`) | la catégorie `temps › relations_temporelles` et le sens ; la négation portée par le verbe |
| 次, すぐに, まだ, もう (`deictique`) | A7 appliquée : le repérage ne dépend pas de l'énonciation |
| 同じ (`comparatif`), いろいろ (`quantificateur`), 他 (`alternative`) | le sens lui-même (« Même », « Divers », « Autre ») et un type (`propriete`, `concept_abstrait`) |
| また, sens 2 (`connecteur`) | la traduction « Aussi, de plus » et la nuance ; **sans catégorie ni type** (D1380, D1403) |
| もう一度, また, prise de congé (`discours`, `politesse`) | un sens lexical (« Encore une fois », « À nouveau »), l'emploi d'adresse étant en nuance |

**La doctrine des emplois d'adresse (lot 16)** : quand un mot lexical a aussi un emploi d'adresse
(refus pour 嫌, excuse pour 悪い, avertissement pour 危ない, réplique pour 違う, exclamation pour
痛い), cet emploi est conservé **en nuance**, sans sens ni fonction (D1081, D1097, D1113, D1327).

### 2.4. Ce qu'une fonction change mécaniquement

| Règle | Avec une fonction sur le sens | Sans fonction |
|---|---|---|
| A5, reconstruction (`decisions.mjs`) | `category: null` **n'exige pas** de décision `categorie-nulle` | une décision `categorie-nulle` sur ce sens est obligatoire |
| A5, validateur (I9) | aucun avertissement `categorie-nulle` | avertissement pour l'audit A2-05 |
| A6, reconstruction | décision `type-nul` **toujours** exigée pendant A2-04 (règle de 5.1c, même avec une fonction : 何, 大変) | idem |
| A6, validateur (I10) | aucun avertissement `type-nul` | avertissement pour l'audit A2-05 |
| I13 | la fonction doit exister dans sa famille ; c'est le seul contrôle | — |

Aucun outil n'est à modifier pour appliquer une définition : I13 accepte déjà les six identifiants.
**Aucun consommateur applicatif** ne lit encore `linguistic_functions` (moteur, exercices) : la
perte dont parle le §6 est une perte du modèle, et de son exploitation future (A2-LING §7.6).

### 2.5. Normes voisines qui bornent les définitions

- **A2-L3** (§21) a un domaine `nombres_quantification` : `quantite` (`grande_quantite`,
  `petite_quantite`, `absence`, `surplus_reste`), `totalite_partie` (`totalite`, `partie`…),
  `approximation_quantitative`, `ordre_numerique`, `nombres › ordinaux`. Il a aussi
  `communication_langage › parole_conversation › reponse` (validé pour 答える) et
  `relations_sociales › interactions_sociales`. **Il n'a aucune catégorie du degré ni de la
  comparaison** (seul `couleurs › teintes_nuances › intensite`, propre aux couleurs).
- **A2-DIM** (§3) : « `Quantification` n'est pas dupliquée ici : elle possède déjà le Level 1
  `Nombres & quantification`. » (§4) : identité, différence, similarité, **comparaison**,
  opposition… sont « reportées vers `relations` ». Axes utiles ici : `exactitude_inexactitude`,
  `precision_imprecision_ambiguite`.
- **A2-REL** : `identical_to`, `similar_to`, `compared_to`, `opposed_to`, `contrasted_with`… Ce sont
  des **relations entre sens** (A ↔ B dans le lexique), non le rôle d'un mot dans la phrase ; toutes
  sont reportées à la passe finale 5.16.
- **A2-ST** : aucun type ne décrit une fonction de discours ; `concept_abstrait` ne sert pas de type
  de secours (D1403). Les mots fonctionnels reçoivent `semantic_type: null` (A6), comme 何, 大変 « très »
  et また, sens 2.
- **Registre des classes (A2-02)** : nom, numéral, pronom, verbe, adjectif en い, adjectif en な,
  adverbe, déterminant, **conjonction, interjection** (jamais employées à ce jour) ; **pas de
  « particule »**.
- **Registres de politesse de l'application** : `data/registres.json` (familier, poli…) et
  `data/expressions.json` (salutations, remerciements, réponses comme いいえ « de rien », chacune avec
  son registre) portent déjà le **registre** des formules. Une fonction `politesse` comprise comme
  marque de registre dupliquerait ce système.

---

## 3. Inventaire des 28 entrées, regroupées par fonction potentiellement concernée

Chaque entrée est rangée **une fois**, sous la fonction que sa fiche met au premier plan ; les autres
fonctions possibles sont dites dans la colonne « aussi ». La classe est l'état mécanique : « à
décider » quand la classe est une exception consignée (`rules.mjs`), à décider dans un lot.

| Groupe | Fonction première | Entrées | Aussi concernées |
|---|---|---|---|
| A. Liaison | `connecteur` | しかし, でも, それから, そうして (4) | — |
| B. Transition et conclusion | `connecteur` / `discours` | では, それでは, じゃ, じゃあ (4) | `politesse` (prise de congé polie : では, それでは) |
| C. Réponses | `discours` | はい, ええ, いいえ (3) | `politesse` (いいえ « de rien ») ; `negation` (いいえ) |
| D. Formules sociales | `politesse` | どうぞ, どうも (2) | `intensifieur` (どうも « vraiment », atténuation) |
| E. Quantité | `quantificateur` | 多い, 少ない, 大勢, たくさん, 全部, 少し, ちょっと (7) | `intensifieur` (少し, ちょっと : petit degré, atténuation) ; `politesse` / `discours` (ちょっと : refus poli, hésitation) |
| F. Degré | `intensifieur` | とても, あまり, 結構 (3) | `politesse` (結構 « non merci ») ; `negation` (あまり, とても + négation) |
| G. Comparaison | `comparatif` | もっと, 一番 (2) | `intensifieur` (もっと : intensification) |
| H. Hors des six | — | ちょうど, 大体, など (3) | dimensions (ちょうど, 大体) ; classe et `pluralisation` (など) |

**Total** : 4 + 4 + 3 + 2 + 7 + 3 + 2 + 3 = **28**.

**Classes à décider (exceptions consignées)** : じゃあ, それから, それでは, いいえ, ええ, しかし, じゃ,
そうして, でも, どうぞ, など, 一番, たくさん, 全部, 多い (15). Les autres ont une classe mécanique :
はい (interjection), では (conjonction), 少ない (adjectif en い), 大勢 (nom), et adverbe pour 結構,
ちょうど, ちょっと, とても, どうも, 少し, あまり, 大体, もっと.

---

## 4. Les usages attestés par chaque fiche

Les citations sont celles des fiches (`07-lot-courant-sources.md` les donne en entier). « Trad. » :
traduction principale, puis secondaires ; « Ex. » : l'exemple de la fiche.

### A. Liaison (4)

| Entrée | Trad. | Ce que dit la nuance | Ex. |
|---|---|---|---|
| **しかし** `n5_v_593` | Cependant ; mais, toutefois, néanmoins | « conjonction / adverbe de liaison » : « introduire une opposition ou une restriction par rapport à la phrase précédente » ; « plus formel que でも » | てんきがよいです。しかし、さむいです。« Il fait beau. Cependant, il fait froid. » |
| **でも** `n5_v_599` | Mais ; cependant, pourtant | « conjonction / adverbe de liaison » : opposition ou restriction ; « plus familier et informel que しかし » | くるまはほしいです。でも、たかいです。« Je veux une voiture. Mais elle est chère. » |
| **それから** `n5_v_416` | Ensuite ; et puis, puis après | « conjonction ou adverbe de liaison » (それ + から) : « lier des actions consécutives dans le temps ou énumérer des éléments » | あさごはんをたべました。それから、がっこうへいきました。 |
| **そうして** `n5_v_596` | Et puis ; et ensuite, c'est ainsi que | « conjonction » : lier deux phrases ou actions « de manière séquentielle », ou « ajouter une information » ; « un peu plus soutenu que それから » | même schéma que それから |

**Ce qui est attesté** : un emploi **inter-phrastique**, toujours en tête de la seconde phrase dans
l'exemple, qui relie son énoncé au précédent par une relation : opposition (しかし, でも), succession
(それから, そうして), addition (そうして ; énumération pour それから). Un **registre** distingue les
paires (しかし formel / でも familier ; そうして plus soutenu).

### B. Transition et conclusion (4)

| Entrée | Trad. | Ce que dit la nuance | Ex. |
|---|---|---|---|
| **では** `n5_v_418` | Alors ; dans ce cas, eh bien | « conjonction de transition » : passer à une autre idée, conclure un accord, « prendre congé de manière polie » | では、またあした。« Alors, à demain ! » |
| **それでは** `n5_v_417` | Alors ; dans ce cas, « sur ce (formel / poli) » | « conjonction de transition (forme polie et complète de jaa) » : introduire une conclusion, un changement de sujet, « prendre congé de manière polie » | それでは、はじめましょう。« Alors, commençons. » |
| **じゃ** `n5_v_595` | Alors ; bon, dans ce cas | « interjection / particule de transition (contraction familière de では) » : transition, conclure un accord, prendre congé (« ja, mata ») | じゃ、またあした。 |
| **じゃあ** `n5_v_413` | Alors ; dans ce cas, eh bien | « conjonction ou particule de transition familière (contraction de では) » : transition, conclure un accord, « alors / dans ce cas » | じゃあ、またあした。 |

**Ce qui est attesté** : trois emplois, que les fiches donnent ensemble : (i) **« dans ce cas »** : une
conséquence tirée de ce qui précède (relation entre énoncés) ; (ii) **transition, changement de
sujet, ouverture** (« commençons ») ; (iii) **clôture de l'échange et prise de congé** (« à demain »),
dite « polie » pour では et それでは. Un **registre** sépare la forme pleine (それでは, では) des
contractions familières (じゃ, じゃあ). Trois exemples sur quatre sont des prises de congé.

### C. Réponses (3)

| Entrée | Trad. | Ce que dit la nuance | Ex. |
|---|---|---|---|
| **はい** `n5_v_344` | Oui ; c'est exact, entendu | « interjection ou terme d'approbation poli » : marquer l'accord, **répondre à un appel**, confirmer une information | はい、わかりました。« Oui, j'ai compris. » |
| **ええ** `n5_v_586` | Oui ; d'accord, certes | « interjection marquant l'approbation ou l'accord » ; « plus douce et conversationnelle que はい » | ええ、そうです。« Oui, c'est bien cela. » |
| **いいえ** `n5_v_584` | Non ; de rien, pas du tout | « interjection / expression de négation » : répondre par la négative ; « décliner poliment un compliment ou un remerciement (dans le sens de “de rien”) » | **exemple altéré dans la source** : いいえ、ちigai masu。(romaji mêlé aux kana) — « Non, ce n'est pas ça. » |

**Ce qui est attesté** : des **mots-réponses**, qui n'ont pas de contenu propre hors de l'échange :
accord, confirmation, réponse à un appel (はい) ; refus de la vérité d'une proposition (いいえ) ; pour
いいえ, un second emploi social attesté par la nuance et une traduction (« de rien »), que
`expressions.json` donne aussi comme réponse polie à un remerciement.

### D. Formules sociales (2)

| Entrée | Trad. | Ce que dit la nuance | Ex. |
|---|---|---|---|
| **どうぞ** `n5_v_600` | S'il vous plaît ; je vous en prie, allez-y | « adverbe / interjection » : **inviter** quelqu'un à faire quelque chose, **lui céder le passage**, **lui offrir** un objet | どうぞ、こちらへはいってください。« S'il vous plaît, entrez par ici. » |
| **どうも** `n5_v_499` | Merci ; bien des choses, « vraiment (particule d'atténuation) » | « formule abrégée utilisée seule pour **remercier** de façon familière mais polie (raccourci de doumo arigatou) », ou « exprimer un vague sentiment de gêne ou d'incertitude » | てつだってくれて、どうも。« Merci de m'avoir aidé. » |

**Ce qui est attesté** : pour ces deux mots, **l'acte social est le sens lui-même** (inviter, offrir,
céder le passage ; remercier). Contrairement à 嫌 ou 危ない (lot 16), il n'y a pas de sens lexical
auquel rattacher l'emploi d'adresse en nuance. どうも a un second emploi, flou (« gêne ou
incertitude », « vraiment »), que la fiche ne développe pas.

### E. Quantité (7)

| Entrée | Trad. | Ce que dit la fiche | Ex. |
|---|---|---|---|
| **多い** `n5_v_654` | Nombreux ; beaucoup de, abondant | « adjectif en -i qualifiant une grande quantité de choses ou de personnes » ; particule が | ほんがおおいです。« Il y a beaucoup de livres. » |
| **少ない** `n5_v_447` | Peu nombreux ; raréfié, en petite quantité, peu de | « adjectif en i qualifiant une quantité restreinte ou un nombre faible » ; « antonyme de ooi » | くるまがすくないです。« Il y a peu de voitures. » |
| **大勢** `n5_v_655` | Beaucoup de monde ; une foule, un grand nombre de personnes | « nom / adverbe » ; « utilisé exclusivement pour désigner une grande foule ou un nombre élevé de personnes » ; particule の | おおぜいのひとがいます。« Il y a beaucoup de monde. » |
| **たくさん** `n5_v_520` | Beaucoup ; en grande quantité, nombreux, suffisamment | « adverbe (ou nom / adjectif en na dans certaines tournures) » : « quantité abondante d'objets ou de personnes, ou l'accomplissement d'une action en grand nombre » | りんごをたくさんかいました。« J'ai acheté beaucoup de pommes. » |
| **全部** `n5_v_639` | Tout ; l'ensemble, la totalité | « nom / adverbe » : « l'intégralité d'une quantité ou d'un groupe d'objets » ; « souvent placé près du verbe ou suivi de の lorsqu'il qualifie un nom » | りんごをぜんぶたべました。« J'ai tout mangé des pommes. » |
| **少し** `n5_v_509` | Un peu ; une petite quantité, un court instant | « adverbe (ou nom) » : « une faible quantité, **un petit degré** ou **une courte durée** » ; « plus neutre ou écrit » que ちょっと | みずをすこしください。« Donnez-moi un peu d'eau. » |
| **ちょっと** `n5_v_497` | Un peu ; un instant, un peu de, « Euh… (hésitation) » | « adverbe » : « une faible quantité ou un bref instant », ou « **formule atténuante** pour exprimer une hésitation ou un **refus poli** (“c'est un peu délicat…”) » | コーヒーをちょっとのみます。« Je bois un peu de café. » |

**Ce qui est attesté** : (i) des mots qui **quantifient un référent nommé ailleurs** (« beaucoup de
pommes », « un peu d'eau », « tout [des pommes] »), placés près du verbe ; (ii) deux **adjectifs** qui
**prédiquent** la quantité (« les livres sont nombreux ») ; (iii) un nom qui **désigne** une grande
quantité de personnes (大勢), employé avec の devant 人. 少し et ちょっと débordent la quantité : degré,
durée, et pour ちょっと, atténuation, hésitation, refus poli.

### F. Degré (3)

| Entrée | Trad. | Ce que dit la fiche | Ex. |
|---|---|---|---|
| **とても** `n5_v_498` | Très ; extrêmement, vraiment | « adverbe d'**intensité** placé devant les adjectifs ou les verbes pour accentuer un degré élevé » ; « utilisé également avec la négation pour signifier “impossible / pas du tout” » | きょうはとてもさむいです。« Il fait très froid. » |
| **あまり** `n5_v_515` | Pas tellement ; pas beaucoup, « guère (toujours suivi d'une négation) » | « adverbe d'**atténuation** qui, employé **systématiquement** avec une structure verbale ou adjectivale **négative**, signifie “ne… pas tellement / pas trop” » | **exemple fautif dans la source** : にくを est écrit ににくを — « Je ne mange pas tellement de viande. » |
| **結構** `n5_v_471` | Assez ; pas mal, suffisamment, « non merci (pour refuser poliment) » | « adverbe (et adjectif en na) exprimant qu'une quantité ou un **degré** est tout à fait satisfaisant », ou « **formule de politesse** pour décliner une offre (“c'est bon, merci”) » | このえいがはけっこうおもしろいです。« Ce film est assez intéressant. » |

**Ce qui est attesté** : un mot qui **modifie le degré d'une propriété exprimée par un autre mot**
(さむい, おもしろい), sans contenu propre : renforcement (とても), degré modéré (結構), atténuation
sous négation (あまり). Deux emplois débordent : とても + négation (« pas du tout »), et 結構 comme
refus poli, que la fiche donne comme second usage, avec une traduction.

### G. Comparaison (2)

| Entrée | Trad. | Ce que dit la fiche | Ex. |
|---|---|---|---|
| **もっと** `n5_v_607` | Plus ; davantage, encore plus | « adverbe exprimant l'**intensification ou l'augmentation** d'une action, d'une quantité ou d'une qualité **par rapport au niveau actuel** » | もっとにほんごをべんきょうしたいです。« Je veux étudier le japonais davantage. » |
| **一番** `n5_v_517` | Le plus ; le meilleur, numéro un, premier | « adverbe (ichi + ban, suffixe de classement) » : « marquer le **superlatif absolu** (“le plus…” de tous) ou désigner **la première position** » | にほんごのなかでなにがいちばんすきですか。« Qu'est-ce que vous aimez le plus… ? » |

**Ce qui est attesté** : un degré **situé par rapport à une référence** : le niveau actuel (もっと),
l'ensemble de tous les éléments (一番, « の中で »). 一番 a un second emploi, la **première position**
dans un classement (« numéro un », « premier »), qui n'est pas comparatif.

### H. Hors des six (3)

| Entrée | Trad. | Ce que dit la fiche | Ex. |
|---|---|---|---|
| **ちょうど** `n5_v_496` | Exactement ; juste, précisément | « adverbe » : « une mesure, une heure, une quantité ou une coïncidence correspond parfaitement sans excès ni manque » | いまちょうどじゅうじです。« Il est exactement dix heures. » |
| **大体** `n5_v_546` | En général ; à peu près, généralement, presque | « adverbe (et nom) » : « une **approximation** ou une **règle générale** » ; « très proche de taitei, mais s'emploie aussi pour “grosso modo / à peu près” » | しごとはだいたいおわりました。« Le travail est à peu près terminé. » |
| **など** `n5_v_602` | Etc. ; entre autres, et des choses comme… | « **particule suffixe** placée après un nom (ou une énumération de noms) » : des exemples « non exhaustifs parmi une liste plus large » | りんごなどのくだものがすきです。« J'aime les fruits tels que les pommes. » |

**Ce qui est attesté** : ちょうど et 大体 décrivent l'**exactitude ou l'approximation** d'une mesure ;
大体 a aussi un emploi de généralité (proche de たいてい, validée en `temps › frequence`). など marque
une **énumération non exhaustive** ; sa fiche la dit « particule suffixe », classe absente du registre.

---

## 5. Les cas déjà traités sans fonction, et pourquoi

| Entrée validée | Fonction écartée | Décision | Pourquoi c'était tenable |
|---|---|---|---|
| また, sens 2 « Aussi, de plus » (lot 21) | `connecteur` | D1381 (et D1380, D1403 : sans catégorie ni type) | le sens est lexicalisé par sa traduction ; **c'est le seul connecteur déjà validé**, et il l'est sans aucune information structurelle : ni catégorie, ni type, ni fonction |
| また, prise de congé « mata ne » (lot 21) | `discours`, `politesse` | D1378 | emploi d'adresse d'un mot lexical (« à nouveau ») : nuance du sens 1 (doctrine du lot 16) |
| もう一度 (lot 21) | `discours`, `politesse` | D1384 | la demande de répétition est un emploi ; le sens est la répétition (« encore une fois ») |
| 嫌, 悪い, 危ない (lot 16) ; 違う (lot 20) ; 痛い (lot 01) | fonction pragmatique | D1081, D1097, D1113, D1327 | emploi d'adresse d'un mot lexical, en nuance |
| 同じ (lot 22) | `comparatif` | D1421 | l'identité est dite par le sens (« Même ») ; A2-DIM renvoie l'identité aux relations |
| いろいろ (lot 22) | `quantificateur` | D1424 | la diversité est dite par le sens (« Divers »), type `propriete` |
| 他 (lot 22) | `alternative` | D1428 | sens « Autre, le reste », type `concept_abstrait` |
| たぶん (lot 22), 出来る (lot 20) | `modalite` | D1434, D1319 | une dimension (`probabilite`, `possibilite_impossibilite`) porte l'information |
| まだ, もう (lot 21) | `aspect`, `negation` | D1387, D1390 | la catégorie `temps › relations_temporelles` ; la négation portée par le verbe |
| なる (lot 20), 初めて, だんだん (lot 21) | `aspect` | D1323, D1397, D1400 | le sens et la catégorie temporelle |

**Le point commun** : chaque fois, l'information refusée à la fonction était portée **par un autre
champ** (catégorie, dimension, sens, nuance). La doctrine du lot 20 a coûté peu, sauf pour また,
sens 2, déjà sans aucun marquage structurel.

---

## 6. Les cas où l'absence de fonction ferait perdre une information centrale

Le critère : l'information est **le cœur du sens** et **aucun autre champ** du modèle ne peut la
porter (ni catégorie, ni dimension, ni relation, ni nuance d'un sens lexical voisin).

| Groupe | Information en jeu | Un autre champ peut-il la porter ? | Perte sans fonction |
|---|---|---|---|
| A. Liaison | relier un énoncé au précédent (opposition, succession, addition) | non : A2-LING §5 exclut `communication_langage` ; aucune dimension ; les relations relient des sens du lexique, pas des énoncés | **centrale** : 4 sens qui seraient, comme また sens 2, sans catégorie, sans type et sans fonction, donc indiscernables d'un sens lexical mal rangé (avertissements A5 et A6 permanents) |
| B. Transition | conséquence, transition, clôture de l'échange | non | **centrale**, pour les mêmes raisons |
| C. Réponses | répondre dans l'échange | partiellement : `parole_conversation › reponse` désigne le **concept** de réponse (答える), non le mot qui répond ; A2-LING §5 l'exclut | **centrale** : « Oui » et « Non » n'ont ni domaine ni type |
| D. Formules sociales | accomplir un acte social (inviter, offrir, remercier) | non : la doctrine du lot 16 suppose un sens lexical d'accueil, absent ici ; `interactions_sociales` désigne des concepts (頼む, 会う), pas des formules | **centrale** : l'acte **est** le sens |
| E. Quantité | quantifier un référent | **oui, en grande partie** : `nombres_quantification › quantite › grande_quantite / petite_quantite`, `totalite_partie › totalite` | **faible** : la catégorie porte le concept ; seule se perd la distinction entre « désigner une quantité » et « quantifier un nom » |
| F. Degré | modifier le degré d'une propriété | non : aucune catégorie du degré, aucune dimension | **centrale**, et **incohérente** : 大変 « Très » porte `intensifieur`, とても « Très » ne la porterait pas |
| G. Comparaison | situer un degré par rapport à une référence (plus que, le plus de tous) | non : A2-DIM renvoie la comparaison aux relations, qui ne relient que des sens entre eux | **centrale** : le superlatif est tout le sens de 一番, sens 1 |
| H. ちょうど, 大体 | exactitude, approximation | **oui** : dimensions `exactitude_inexactitude`, `precision_imprecision_ambiguite` ; catégorie `approximation_quantitative` ; `temps › frequence` pour la généralité | **nulle** : ces deux entrées peuvent être décidées sans fonction |
| H. など | énumération non exhaustive | non ; et la classe manque | à part : la question est d'abord celle de la **classe** (§8.6) |

**Conclusion du constat** : pour **22 entrées** (groupes A, B, C, D, F, G et une partie de E),
l'absence de fonction ne reporte pas l'information ailleurs : elle la perd. Pour **5 entrées**
(多い, 少ない, 大勢, ちょうど, 大体), le modèle a déjà un champ adéquat. など relève d'une autre question.
(少し et ちょっと sont comptées dans les 22 pour leurs emplois de degré et d'atténuation, たくさん et 全部
pour la quantification d'un référent.)

---

## 7. Formulations possibles, par fonction

Pour chaque fonction : des options numérotées, du plus étroit au plus large, **toutes tirées des
fiches** ; puis les frontières, et la recommandation de Claude. **Option 0, commune à toutes** :
pas de définition ; la fonction reste inutilisée, les sens concernés reçoivent `category: null` et
`semantic_type: null` justifiés (A5, A6), l'emploi étant dit par la traduction et la nuance
(doctrine du lot 20 prolongée).

**Principe commun proposé, repris d'A7 (§4)** : une fonction est attribuée **lorsque l'emploi qu'elle
décrit fait partie intégrante du sens tel qu'il est modélisé** ; un emploi mentionné en nuance ne
suffit pas. Ce principe garde intacte la doctrine du lot 16 (emplois d'adresse en nuance) et la
règle du lot 11 (jamais par appartenance morphologique ni par classe).

### 7.1. `connecteur`

> **C1 (recommandée)** — fonction pragmatique d'un SENSE dont le rôle est de **relier l'énoncé qu'il
> introduit à un énoncé ou à une situation qui précède**, en marquant entre eux une relation
> (opposition, succession, addition, conséquence). La relation précise est dite dans la nuance ; elle
> n'est pas une sous-fonction (A2-LING §5).

> **C2 (large)** — C1, plus tout mot qui **organise le discours** (ouverture, transition, changement
> de sujet, clôture), même sans relation logique avec ce qui précède.

**Frontières** : (1) relier deux **énoncés**, non deux mots d'un même syntagme : など n'est pas un
connecteur ; (2) une relation entre sens du lexique reste une relation A2-REL ; (3) C2 absorberait
`discours` (§7.2) : à éviter si `discours` est défini.

**Recommandation** : **C1**, avec `discours` défini à part (D1).

### 7.2. `discours`

> **D1 (recommandée)** — fonction pragmatique d'un SENSE dont le rôle est de **gérer l'échange
> lui-même** plutôt que d'en apporter le contenu : **répondre** (accord, confirmation, réponse à un
> appel, dénégation), **ouvrir ou faire passer** l'échange à une autre étape (transition, changement
> de sujet), **le clore** (conclusion, prise de congé).

> **D2 (large)** — D1, plus les **marqueurs d'hésitation et d'atténuation conversationnelle**
> (ちょっと « euh… », どうも « gêne, incertitude »).

**Frontières** : (1) A2-LING §5 : `discours` ne fait pas une catégorie `communication_langage` ; (2)
avec `connecteur` : un sens qui tire une **conséquence** de ce qui précède (« dans ce cas ») est
connecteur ; un sens qui **fait passer l'échange** (« bon, alors… », « à demain ») est discours. Un
même mot peut avoir les deux emplois, en deux sens ou dans un seul sens qui porte les deux
fonctions : à trancher (§9, Q2) ; (3) la prise de congé **d'un mot lexical** (また) reste en nuance.

**Recommandation** : **D1** ; l'hésitation de ちょっと et la gêne de どうも, que leurs fiches ne
développent pas, restent en nuance.

### 7.3. `politesse`

> **P1 (recommandée)** — fonction pragmatique d'un SENSE qui **accomplit un acte social
> conventionnel** par une formule : remercier, inviter, offrir, céder le passage, décliner une offre
> ou un remerciement, prendre congé poliment. Le **registre** (familier, poli, formel) est dit dans
> la nuance ; il n'est pas une sous-fonction (A2-LING §5).

> **P2 (large)** — P1, plus **toute marque de registre poli ou formel** portée par un sens (それでは
> « forme polie », いかが « comment (poli) », どなた, こちら « moi, nous (poli) »…).

**Frontières** : (1) **P2 dupliquerait le registre** que portent déjà `registres.json` et
`expressions.json`, et A2-LING §5 refuse explicitement une taxonomie des registres ; elle ferait
aussi entrer dans l'audit une dizaine de sens validés du lot 11 ; (2) avec la doctrine du lot 16 :
l'emploi social d'un **mot lexical** (嫌, 悪い, 危ない, 違う, また) reste en nuance ; `politesse` ne
s'attribue que lorsque l'acte **est** le sens modélisé ; (3) avec `relations_sociales ›
interactions_sociales` : cette catégorie désigne des **concepts** d'interaction (会う, 頼む) ; une
formule n'y entre pas du seul fait qu'elle est sociale.

**Recommandation** : **P1**.

### 7.4. `quantificateur`

> **Q1 (recommandée)** — fonction grammaticale d'un SENSE qui **quantifie un référent désigné par un
> autre mot** (un nom, l'objet ou le sujet d'un verbe), en en donnant l'étendue : beaucoup, peu, un
> peu, tout. Le concept de quantité reste porté par la catégorie `nombres_quantification` lorsqu'elle
> s'applique (A2-LING §5) ; un mot qui **prédique** la quantité (« les livres sont nombreux ») ou qui
> **désigne** une quantité n'est pas un quantificateur.

> **Q2 (large)** — tout sens dont le contenu est une quantité, prédicats compris (多い, 少ない) et noms
> de quantité (大勢).

> **Q0 bis (étroite)** — pas de fonction : la catégorie `nombres_quantification` suffit pour tout le
> groupe E.

**Frontières** : (1) **compteur ≠ quantificateur** (A2-LING §5) : 匹, 一人 restent hors ; (2) **avec
la catégorie** : le risque de doublon interdit par A2-LING §7.2 est réel ; Q1 l'évite en réservant la
fonction au **rôle** (quantifier un autre mot), la catégorie gardant le **concept** ; Q2 le crée
pour 多い et 少ない, qui seraient fonction **et** catégorie pour la même information ; (3) **avec les
adjectifs de dimension** : 大きい, 小さい, 長い (lots 15, 17) prédiquent une propriété sans fonction ;
Q1 traite 多い et 少ない de la même façon, Q2 non ; (4) **avec `intensifieur`** : 少し, ちょっと
« un peu » quantifient un référent (« un peu d'eau ») ou modifient un degré (« un peu froid ») ; la
règle de partage est au §7.6.

**Recommandation** : **Q1**. Elle ne coûte rien à 多い, 少ない (catégorie, type `propriete`), et
garde à たくさん, 全部, 少し, ちょっと l'information de rôle que la catégorie ne porte pas.

### 7.5. `comparatif`

> **K1 (recommandée)** — fonction grammaticale d'un SENSE qui **situe le degré d'une propriété, d'une
> quantité ou d'une action par rapport à une référence** : un autre terme, le niveau actuel
> (comparatif), ou l'ensemble de tous les termes (superlatif).

> **K2 (large)** — K1, plus l'**identité et la similitude** (同じ « même », 違う « différent »).

**Frontières** : (1) K2 heurte A2-DIM §4 (identité, similarité, comparaison « reportées vers
`relations` ») et rouvrirait 同じ (D1421) ; (2) la **relation** `compared_to` relie deux sens du
lexique ; la fonction décrit le rôle d'un mot dans la phrase : elles ne se dupliquent pas ; (3) un
classement (« premier », « numéro un ») n'est pas une comparaison : c'est un **ordinal**, qui a sa
catégorie (`nombres › ordinaux`, `ordre_numerique`).

**Recommandation** : **K1**.

### 7.6. `intensifieur`

> **I1 (recommandée)** — fonction pragmatique d'un SENSE qui **modifie le degré** d'une propriété,
> d'un état ou d'une action exprimés par un autre mot, **en le renforçant ou en l'atténuant**, sans
> apporter de contenu propre.

> **I2 (étroite)** — le même rôle, **en renforcement seulement** (très, extrêmement).

**Frontières** : (1) **I1 et le libellé** : « intensifieur » nomme le renforcement ; I1 y range
aussi l'atténuation, que deux fiches nomment expressément (あまり « adverbe d'atténuation », ちょっと
« formule atténuante ») et que 少し atteste (« un petit degré ») ; A2-LING n'a pas de fonction
« atténuateur », et en créer une passerait par une nouvelle version d'A2-LING (§9) ; I1 est donc
l'extension minimale qui couvre les fiches ; I2 laisse あまり, 結構, 少し, ちょっと (degré) sans
fonction ; (2) **avec `quantificateur`** : un même mot (少し, ちょっと) reçoit `quantificateur` dans
un sens qui quantifie un référent, `intensifieur` dans un sens qui modifie un degré ; si la fiche ne
distingue pas ces emplois en deux sens, le choix se fait à la proposition, sens par sens ; (3)
**avec `comparatif`** : もっと « par rapport au niveau actuel » est comparatif (K1) ; s'il reçoit
aussi `intensifieur` est à trancher (§9, Q2) ; (4) **avec `negation`** : pour あまり (et とても
« pas du tout »), la négation est portée par le verbe (précédent D1387, D1390) ; la contrainte
« toujours suivi d'une négation » est une construction, dite en nuance ; (5) **le précédent de 大変**
« Très » (D0074) est conforme à I1 comme à I2.

**Recommandation** : **I1**, en disant explicitement dans l'addendum que la fonction couvre la
modification du degré dans les deux sens. Si l'arbitrage juge que c'est élargir le libellé, I2,
avec les atténuateurs sans fonction (catégorie et type nuls, justifiés).

### 7.7. Hors des six : `negation`, `pluralisation`

- **`negation`** : aucun besoin observé qui ne soit couvert. いいえ « Non » est une **réponse**
  (`discours`, D1) ; あまり et とても + négation suivent la règle déjà appliquée (la négation est
  portée par le verbe). **Pas de définition proposée.**
- **`pluralisation`** : など ne pluralise pas ; elle marque des exemples non exhaustifs. **Pas de
  définition proposée** ; など relève d'abord de sa classe (§8.6).

---

## 8. Conséquences attendues, et conflits

### 8.1. Sur les 28 entrées, par option

« F » : la fonction s'appliquerait (au moins un sens) ; « — » : sans fonction ; « ? » : selon le
découpage des sens, décidé à la proposition. Les colonnes donnent l'effet de l'option retenue pour
**la** fonction de la ligne, toutes choses égales par ailleurs.

| Entrée | Fonction | Option 0 | Option étroite | Option large |
|---|---|---|---|---|
| しかし, でも, それから, そうして | `connecteur` | — | F (C1) | F (C2) |
| では, それでは, じゃ, じゃあ | `connecteur` / `discours` | — | F : C1 pour « dans ce cas », D1 pour la transition et la clôture | F (C2 seul suffirait) |
| はい, ええ, いいえ | `discours` | — | F (D1) | F (D2) |
| どうぞ, どうも | `politesse` | — | F (P1) | F (P2) |
| いいえ « de rien », 結構 « non merci », では, それでは « prise de congé polie » | `politesse` | — | ? (P1, si l'emploi fait un sens) | F (P2) |
| たくさん, 全部 | `quantificateur` | — | F (Q1) | F (Q2) |
| 少し, ちょっと (quantité) | `quantificateur` | — | F (Q1) | F (Q2) |
| 多い, 少ない | `quantificateur` | — | — (Q1 : catégorie seule) | F (Q2) |
| 大勢 | `quantificateur` | — | ? (Q1 : nom qui désigne une foule, mais employé avec の devant 人 : cas limite) | F (Q2) |
| とても | `intensifieur` | — | F (I2) | F (I1) |
| あまり, 結構 (degré), 少し, ちょっと (degré) | `intensifieur` | — | — (I2) | F (I1) |
| もっと | `comparatif` (`intensifieur` ?) | — | F (K1) | F (K1, et I1 si cumul) |
| 一番 | `comparatif` | — | F (K1) pour « le plus » ; l'emploi « premier » hors fonction | idem |
| ちょうど, 大体 | aucune | — | — | — |
| など | aucune | — | — | — |

**Effet sur les décisions et les avertissements** (§2.4) : chaque sens qui reçoit une fonction
n'exige plus de décision `categorie-nulle` et ne produit plus d'avertissement `categorie-nulle` ni
`type-nul` ; la décision `type-nul` reste exigée pendant A2-04. Avec l'option 0 partout, les
22 entrées concernées laisseraient chacune au moins une décision `categorie-nulle`, une décision
`type-nul` et deux avertissements permanents pour l'audit A2-05 ; avec les options recommandées, ces
avertissements ne resteraient que pour les sens laissés sans fonction.

### 8.2. Sur les sens déjà validés

Une définition s'applique à toutes les données, y compris validées. A7 a fixé la méthode : la règle
vaut maintenant, **l'audit de ses conséquences antérieures est réservé à A2-05**, sans réouverture
immédiate. Les sens validés qu'une définition toucherait :

| Sens validé | Fonction | Sous l'option recommandée | Sous l'option large |
|---|---|---|---|
| また, sens 2 « Aussi, de plus » (D1381) | `connecteur` | **qualifié** (C1 : addition) | qualifié |
| 大変, sens 1 « Très » (D0074) | `intensifieur` | **conforme** (I1, I2) | conforme |
| もう一度 (D1384) | `discours`, `politesse` | non qualifié (sens : la répétition) | non qualifié |
| 同じ (D1421) | `comparatif` | non qualifié (K1) | qualifié (K2) |
| いろいろ (D1424) | `quantificateur` | non qualifié (Q1 : diversité, non quantité) | à examiner (Q2) |
| いかが, どなた, どちら s2-s3, こちら s2, あちら (lot 11) | `politesse` | non qualifiés (P1) | qualifiés (P2) |
| 他 (D1428) | `alternative` | hors du champ | hors du champ |

Sous les options recommandées, **un seul sens validé deviendrait non conforme** : また, sens 2, qui
qualifierait pour `connecteur`. Deux voies : la réserver à l'audit A2-05 (méthode d'A7), ou la
rouvrir avec le lot qui portera les connecteurs (méthode de 暖かい). À arbitrer (§9, Q8).

### 8.3. Avec A2-ST

Les sens fonctionnels n'ont pas de type ontologique : `semantic_type: null` (A6), comme 何, 大変
« très » et また, sens 2 (D1403). **Aucun conflit** si l'on s'y tient. Point d'attention : la
tentation de `quantite_valeur` pour たくさん ou 全部 (une quantité « conceptualisée abstraitement »,
A2-ST) : un quantificateur ne désigne pas une quantité, il en applique une ; le type relèverait de
la proposition, sens par sens, sans règle nouvelle ici.

### 8.4. Avec A2-DIM

- **Pas de conflit pour les six fonctions** : A2-DIM n'a ni axe du degré, ni axe de la quantité
  (« Quantification n'est pas dupliquée »), ni axe de la comparaison (reportée aux relations).
- **Frontière à garder** : une dimension caractérise un sens (たぶん, `probabilite`) ; elle ne
  remplace pas une fonction absente. ちょうど (`exactitude_inexactitude` ou
  `precision_imprecision_ambiguite`) et 大体 (`precision_imprecision_ambiguite`) peuvent en recevoir
  une, selon la règle du lot 16 (un axe employé lorsqu'il décrit directement le sens) : c'est une
  décision de lot.

### 8.5. Avec les catégories (A2-L3)

- **`quantificateur` / `nombres_quantification`** : le principal risque de doublon ; Q1 le règle par
  la séparation rôle / concept ; Q2 le crée.
- **`discours` / `communication_langage › parole_conversation › reponse`** : A2-LING §5 tranche déjà :
  はい, いいえ ne vont pas dans `reponse` du seul fait qu'ils répondent.
- **`politesse` / `relations_sociales › interactions_sociales`** : même logique (§7.3, frontière 3).
- **Degré et comparaison** : aucune catégorie ; pas de conflit, mais pas de repli non plus : sans
  fonction, ces sens sont nécessairement sans catégorie.

### 8.6. Avec les classes et les autres champs

- **Classes** : `conjonction` et `interjection` existent au registre et n'ont jamais servi ; la classe
  de 15 entrées est à décider dans un lot. **Aucune règle « classe ⇒ fonction »** n'est proposée
  (règle du lot 11) : une conjonction n'est pas connecteur par sa classe, mais par son sens.
- **など** : sa fiche la dit « particule suffixe » ; le registre n'a pas de classe « particule », et
  la conception est verrouillée (une classe nouvelle passe par un addendum). Options : (a) l'écarter
  du lot 23 et la traiter avec la question des affixes (point ouvert) ou à 5.16 ; (b) une classe du
  registre existant, avec la propriété `suffix: true` (précédents : 半, 辺), la description de la
  fiche en nuance ; (c) un addendum ajoutant une classe. **Recommandation** : (a), la question
  n'étant pas celle des fonctions.
- **Relations (A2-REL)** : 多い / 少ない (`opposed_to`, « antonyme » dans la fiche), しかし / でも,
  じゃ / じゃあ / では / それでは (registres d'un même mot ?), それから / そうして : candidates à 5.16,
  comme aux lots 18 à 22. Aucun conflit avec les fonctions.
- **Particules** : 多い (が), 大勢 (の) ; mécaniques pour un sens unique.
- **Identité (A3)** : じゃ, じゃあ, では, それでは sont-elles une ou plusieurs unités lexicales
  (contraction, forme pleine) ? La question est **lexicale** et se pose au périmètre du lot 23 ;
  elle ne conditionne pas les définitions.
- **Anomalies des sources** à journaliser dans le lot : l'exemple de あまり (ににく pour にく) et celui
  de いいえ (« ちigai masu », romaji mêlé aux kana).

---

## 9. Ce qui est à arbitrer

| N° | Question | Options | Recommandation de Claude |
|---|---|---|---|
| Q1 | **Le niveau de gouvernance** | (a) un addendum A9 de conception Ocha, qui définit des fonctions existantes sans modifier A2-LING, comme A7 ; (b) une version A2-LING-v2 ; (c) aucune définition (option 0 partout, doctrine du lot 20 prolongée) | **(a)** |
| Q2 | **Le cumul de fonctions sur un même sens** (もっと : comparatif et intensifieur ; では : connecteur et discours) | (a) permis, chaque fonction justifiée ; (b) une seule fonction par sens, la plus spécifique ; (c) deux sens si la fiche distingue les emplois, sinon une seule | **(c)**, et à défaut (b) |
| Q3 | `connecteur` | 0, C1, C2 | **C1** |
| Q4 | `discours` | 0, D1, D2 | **D1** |
| Q5 | `politesse` | 0, P1, P2 | **P1** |
| Q6 | `quantificateur` | 0 bis (catégorie seule), Q1, Q2 | **Q1** |
| Q7 | `comparatif` ; `intensifieur` | K1, K2 ; I1, I2 | **K1** ; **I1** (ou I2 si le libellé doit rester strict) |
| Q8 | **Les sens validés touchés** (また, sens 2) | (a) audit A2-05, sans réouverture (méthode A7) ; (b) réouverture avec le lot des connecteurs | **(a)** |
| Q9 | **Le principe commun** : une fonction n'est attribuée que si l'emploi fait partie intégrante du sens modélisé (A7 §4), jamais par la classe | retenir ou non | **retenir** |
| Q10 | **など** | (a) hors du lot 23 ; (b) classe existante et `suffix` ; (c) addendum de classe | **(a)** |
| Q11 | `negation`, `pluralisation` | définir ou non | **ne pas définir** (aucun besoin non couvert) |

## 10. Ce que l'arbitrage déclenchera, et ce qu'il ne fera pas

1. **Si Q1 (a)** : Claude rédige l'addendum A9, sur le modèle d'A7 (constat, définitions, frontières,
   sens à plusieurs emplois, application et effets, réserve pour A2-05), **soumis à validation
   avant tout codage ni toute décision de lot**. Aucun outil n'est à modifier (I13 accepte déjà ces
   valeurs) ; un test pourrait garder la liste des fonctions définies, à décider avec l'addendum.
2. **Ensuite seulement** : le périmètre du lot 23, parmi les 28 entrées, **sans décision lexicale**
   avant l'accord sur ce périmètre. Le regroupement suivra l'arbitrage (par exemple : liaison,
   transition, réponses et formules d'un côté, 13 ou 14 entrées ; quantité, degré et comparaison de
   l'autre).
3. **Ce que l'arbitrage ne fera pas** : il ne décide aucun sens, aucune classe, aucune catégorie ;
   il ne rouvre aucune entrée validée ; il ne modifie ni A2-LING, ni le registre, ni les sources.

## 11. Où trouver les pièces dans l'export de relecture

| Fichier | Contenu |
|---|---|
| `06-lot-courant-rapports.md` | ce rapport |
| `07-lot-courant-sources.md` | partie 1 : **les 28 fiches sources complètes**, avec le pré-remplissage mécanique ; partie 2 : les précédents validés (大変, また, もう一度, 同じ, いろいろ, 他, たぶん, まだ, もう, すぐに, 次, ある, 出来る, なる, 嫌, 悪い, 危ない, 違う, 痛い, いくつ, 何, 半, たいてい, 大丈夫, いかが, こちら), avec leurs décisions intégrales |
| `08-lot-courant.json` | aucun fichier de lot : la liste des 28 identifiants |
| `09-journal-lot-courant.json` | vide : aucune décision |
| `03-references-A2.md` | A2-LING-v1, A2-L3, A2-ST, A2-DIM, A2-REL, le registre des classes |
| `04-addenda.md` | A5, A6, **A7** (le modèle d'un addendum de fonction) |
| `10-diff-et-controles.md` | le diff contre `f3e81bc` et les contrôles |

## 12. Arbitrage normatif (2026-10-06)

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle »). Les
décisions retenues :

1. **Q1** : un addendum de conception Ocha, **A9**, sur le modèle d'A7, sans modifier A2-LING-v1 ni
   les registres.
2. **Q2** : cumul de fonctions autorisé sur un même SENSE lorsque chaque fonction décrit un rôle
   distinct, intégral au sens modélisé et attesté par la fiche ; **ne jamais scinder un sens
   uniquement pour éviter un cumul** ; si la fiche établit réellement deux emplois distincts, le
   découpage reste possible selon les règles ordinaires.
3. **Q3** : `connecteur` = C1. **Q4** : `discours` = D1. **Q5** : `politesse` = P1. **Q6** :
   `quantificateur` = Q1.
4. **Q7** : `comparatif` = K1 ; `intensifieur` = I1, **reformulée** : « sans apporter de contenu
   propre » devient « sans désigner lui-même la propriété, l'état ou l'action modifiés ».
5. **Q8** : また, sens 2, réservée à l'audit A2-05, sans réouverture immédiate.
6. **Q9** : principe retenu : la fonction suit l'emploi qui fait partie intégrante du sens modélisé,
   jamais la classe.
7. **Q10** : など hors du lot 23 ; sa classe fera l'objet d'un préalable spécifique après A9.
8. **Q11** : ni `negation` ni `pluralisation` ne sont définies à ce stade.

**A9 doit expliciter** les frontières avec les catégories, A2-ST, A2-DIM, les relations, les classes
et les registres de politesse, ainsi que la règle de polysémie et de cumul.

**Ce qu'il n'autorise pas** : ni la validation d'A9, ni un commit, ni un push ; ni `lot-23.json`, ni
décision de journal, ni modification d'ENTRY ; le périmètre lexical du lot 23 n'est pas préparé.

**Suite donnée** : A9 rédigé en statut « proposé » (`docs/conception/addendum-A9-fonctions-linguistiques.md`),
soumis à relecture avant toute validation. **Relecture favorable, sans correction ; A9 validé le
2026-10-06**, sur l'autorisation explicite de ChatGPT (statut seulement). Ni commit, ni push ; le
périmètre du lot 23 n'est pas préparé.
