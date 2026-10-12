# Étape 2 · A2-05 · Volet 2 · Audit des `null` — périmètre révisé

**Date** : 2026-10-07
**Statut** : **périmètre révisé une seconde fois après les arbitrages du 2026-10-07 (§11), toutes
ses questions étant arbitrées ; non validé.** Aucun cas
n'est audité, aucune décision lexicale ou catégorielle n'est prise, aucun fichier de données,
d'outil, de test ou de reconstruction n'est modifié.

**A2-05 a trois volets** : la cohérence sémantique rétroactive (volet 1,
`etape2-A2-05-perimetre-coherence.md`), l'audit individuel des 147 `null` (volet 2, ce rapport) et
les contrôles globaux résiduels (volet 3, `etape2-A2-05-perimetre-controles-globaux.md`).
**État du dépôt au moment du relevé** : `ocha-v2` et `origin/ocha-v2` à
`5a8687b063fd2fca7c343d544aff040709bc5ec8` (clôture documentaire de 5.17, poussée).

---

## 1. Objet et limites

A2-05 est l'audit global du vocabulaire (`ROADMAP.md`, §6). Ce rapport donne le périmètre de son
**volet 2**, celui que l'arbitrage du 2026-10-07 a posé comme point de sortie de l'étape 2 :

- l'audit individuel des **120 avertissements `categorie-nulle`** ;
- l'audit individuel des **27 avertissements `type-nul`** ;
- la distinction entre les `null` réellement légitimes et les données à corriger ;
- la preuve que les `null` restants sont intentionnels et conformes aux normes.

Les autres points réservés à A2-05 (§10) ne sont pas dans ce périmètre : ils relèvent des volets 1
et 3.

**Ce que ce rapport ne fait pas** : il ne classe aucun des 147 cas, ne dit d'aucun qu'il est
légitime ou fautif, et ne propose aucune catégorie ni aucun type. Les « raisons journalisées » des
annexes sont recopiées du journal ; ce sont les justifications d'origine, pas un avis d'audit.

## 2. État de départ, relevé sur le dépôt

Relevé par script, en lecture seule, sur `data/n5/vocab.json`, `data/vocab-hors-jlpt.json`,
`reconstruction/a2-04/avertissements-connus.json` et `reconstruction/a2-04/journal.json`.

| Mesure | Valeur |
|---|---|
| ENTRY publiées | 684 (682 dans `n5/vocab.json`, 2 dans `vocab-hors-jlpt.json`) |
| SENSE publiés | 824 |
| Avertissements de l'inventaire | 148 : 120 `categorie-nulle`, 27 `type-nul`, 1 `kanji-inconnu` |
| SENSE distincts portant au moins un des 147 avertissements | 144 (3 portent les deux) |
| ENTRY concernées | 127 (105 par `categorie-nulle`, 25 par `type-nul`, 3 par les deux) |
| Décisions de journal retrouvées | 147 sur 147 : chaque avertissement a exactement une décision de la nature attendue, sur le sens précis |

Les trois SENSE qui portent les deux avertissements sont `v_500_s2` (また, « Aussi »), `v_521_s1`
(たぶん) et `v_653_s1` (声).

**Ce que l'inventaire ne couvre pas.** Le validateur n'avertit que pour un `null` **sans fonction
linguistique**. Les données publiées contiennent davantage de `null` :

| Champ | `null` au total | dont avec une fonction (aucun avertissement) | dont sans fonction (avertissement) |
|---|---|---|---|
| `category` | 175 | 55 | 120 |
| `semantic_type` | 98 | 71 | 27 |

Le journal porte 120 décisions `categorie-nulle` (une par avertissement) et 98 décisions `type-nul`
(une par `semantic_type: null`, avec ou sans fonction). Les 55 `category: null` portés par une
fonction n'ont pas de décision `categorie-nulle` : A5 les dit justifiés « directement » par la
fonction.

**Répartition des `null` entre les volets** (arbitrage du 2026-10-07) :

| Population | Volet |
|---|---|
| 120 `category: null` sans fonction, 27 `semantic_type: null` sans fonction | volet 2, ce rapport |
| 55 `category: null` avec fonction | volet 1, axe C2 : la fonction justifie-t-elle l'absence, selon A5, étant elle-même définie et applicable normativement ? |
| 71 `semantic_type: null` avec fonction | volet 1, axe C4 : aucun type terminal d'A2-ST ne décrit-il la nature du sens, comme A6 l'exige ? La fonction ne justifie pas le `null` par elle-même. |

## 3. Inventaire exact

L'inventaire complet, cas par cas, est en annexe : **annexe A** pour les 120 `categorie-nulle`,
**annexe B** pour les 27 `type-nul`. Chaque ligne donne l'identifiant du SENSE, le mot, la lecture
par défaut, la classe, la traduction principale, l'autre champ (type ou catégorie), les dimensions,
le lot d'origine, la décision de journal et sa raison.

Les répartitions ci-dessous décrivent l'inventaire ; elles ne préjugent d'aucun classement.

### 3.1 Les 120 `categorie-nulle`

Par lot d'origine :

| Lot | Nombre |
|---|---|
| lot-00 | 5 |
| lot-01 | 5 |
| lot-02 | 2 |
| lot-04 | 2 |
| lot-05 | 2 |
| lot-06 | 1 |
| lot-07 | 3 |
| lot-08 | 1 |
| lot-11 | 3 |
| lot-13 | 1 |
| lot-14 | 1 |
| lot-15 | 3 |
| lot-16 | 12 |
| lot-17 | 9 |
| lot-18 | 23 |
| lot-19 | 15 |
| lot-20 | 20 |
| lot-21 | 5 |
| lot-22 | 6 |
| lot-24 | 1 |

Par classe grammaticale :

| Classe grammaticale | Nombre |
|---|---|
| verbe | 55 |
| nom | 21 |
| adjectif_i | 18 |
| adjectif_na | 13 |
| adverbe | 9 |
| pronom | 3 |
| determinant | 1 |

Par type sémantique du sens :

| Type sémantique | Nombre |
|---|---|
| action | 38 |
| propriete | 36 |
| etat | 11 |
| concept_abstrait | 9 |
| evenement | 7 |
| personne | 6 |
| objet_artefact | 5 |
| null | 3 |
| groupe_collectif | 2 |
| processus | 1 |
| resultat | 1 |
| substance_matiere | 1 |

Certains de ces sens portent une dimension d'A2-DIM (annexe A, colonne « Dimensions »).

### 3.2 Les 27 `type-nul`

Par lot d'origine :

| Lot | Nombre |
|---|---|
| lot-00 | 3 |
| lot-01 | 14 |
| lot-03 | 1 |
| lot-07 | 1 |
| lot-10 | 1 |
| lot-13 | 1 |
| lot-14 | 3 |
| lot-20 | 1 |
| lot-21 | 1 |
| lot-22 | 1 |

Par classe grammaticale :

| Classe grammaticale | Nombre |
|---|---|
| nom | 25 |
| adverbe | 2 |

Par catégorie de premier niveau :

| Catégorie (niveau 1) | Nombre |
|---|---|
| etre_humain | 15 |
| nombres_quantification | 4 |
| espace_proprietes_spatiales | 3 |
| null | 3 |
| sciences | 1 |
| temps | 1 |

## 4. Le `kanji-inconnu`

Un seul avertissement : `n5/vocab.json · v_594`, 醤油 (しょうゆ, lot 0). Le kanji 醤 est absent de
`data/kanji_jouyou_fr.json`.

**Traitement proposé : hors du volet des `null`, sans modification.**

- Ce n'est pas un `null` : l'avertissement ne dit rien de la catégorie ni du type de 醤油.
- La graphie vient de la fiche source ; la doctrine interdit tout « ajout artificiel » au
  dictionnaire des kanji pour faire taire l'avertissement (`ETAT-ACTUEL.md`, points ouverts).
- Il relève de la tâche de données sur les kanji, avec les cinq clés du dictionnaire qui sont des
  mots (山羊, 生活, 措置, 継続, 迅速).

**Arbitrage (Q3)** : proposition acceptée. Le contrôle exhaustif des anomalies de kanji est porté par
le volet 3 (G5), qui les rattache à la tâche de données sur les kanji. Elles ne conditionnent ni la
clôture d'A2-05 ni celle de l'étape 2, à condition que leur état et leur chantier de destination
soient explicitement documentés. L'avertissement reste dans l'inventaire.

## 5. Méthode de revue individuelle

**Un cas = un avertissement**, soit 147 fiches d'audit. Un SENSE qui porte les deux avertissements
reçoit deux fiches, lues ensemble.

Pour chaque cas, dans cet ordre :

1. **Lire la fiche source entière**, exemple compris (`reconstruction/a2-04/sources/`), et non la
   seule traduction principale.
2. **Lire l'état publié du SENSE et de son ENTRY** : classe, autres sens, catégorie, type,
   dimensions, fonctions, nuance.
3. **Lire la décision de journal** qui justifie le `null`, et les décisions voisines sur la même
   entrée.
4. **Confronter la justification aux snapshots applicables, et non aux seuls registres** (les
   registres en sont la transcription, sans leurs règles ni leurs frontières) :
   - pour un `categorie-nulle` : `A2-L3-v1`, en entier pour l'arbre des catégories (§5), ses
     éléments hors de la hiérarchie (§6), ses règles de frontière (§7) et ses candidats non promus
     (§8) ; `A2-GLOBAL-v1`, §4.3, §4.4, §10 et §11 ;
   - pour un `type-nul` : `A2-ST-v1`, ses définitions de frontière (§3), ce qui n'est pas un type
     sémantique (§4) et ses règles d'utilisation (§5) ; `A2-GLOBAL-v1`, §5.3 ;
   - pour les dimensions : `A2-DIM-v1`, §2 à §5 et §7 ;
   - pour les relations qu'une raison invoque : `A2-REL-v1.1` ;
   - pour les fonctions : `A2-LING-v1`, §4 et §5, et les définitions d'A7 et d'A9 ;
   - les addenda A5 et A6, et les doctrines arbitrées pendant les lots.
5. **Comparer aux sens comparables** déjà publiés : même champ, même raison invoquée, ou sens
   voisin qui, lui, porte une catégorie ou un type. L'audit s'appuie pour cela sur **les familles de
   sens comparables révélées par le criblage du volet 1**, mené avant lui. Un écart entre deux sens
   comparables est relevé des deux côtés.
6. **Classer** le cas selon les critères du §6, en citant la norme et le passage de la fiche qui
   fondent le classement.

**Regroupement pour la lecture, verdict individuel.** Les cas sont relus par familles (même raison
journalisée, même champ, même lot), pour que la cohérence se voie ; mais chaque cas reçoit son
propre verdict motivé. Aucun verdict « par famille » ni « même raison que le précédent » sans que
la fiche du cas ait été lue.

**Aucune connaissance externe.** Comme pour les lots, la fiche source décide : l'audit ne s'appuie
sur aucun sens, emploi ou usage que la fiche ne donne pas.

**Les documents historiques éclairent, ils ne jugent pas.** Les documents de
`docs/conception/legacy/a2/` peuvent expliquer d'où vient une décision ; aucun verdict ne se fonde
sur eux seuls, et aucune règle n'en est tirée.

**Une anomalie est d'abord un cas de donnée ou de frontière.** `A2-GLOBAL-v1` (§15) demande que
toute anomalie rencontrée soit d'abord traitée ainsi, avant d'être interprétée comme une lacune de
l'architecture ; son §13 constate que le crash-test final n'a révélé le besoin d'aucun nouveau
niveau 1 ni d'aucun nouveau type sémantique.

**L'objectif n'est pas zéro avertissement.** La doctrine des lots reste vraie pour l'audit : les
avertissements A5 et A6 « ne sont jamais corrigés pour obtenir zéro avertissement » (décision du
2026-10-02), et « aucune catégorie n'est cherchée pour réduire les avertissements » (lot 20). Un
`null` légitime reste un `null`.

**Ordre de revue** (arbitrage de Q8) : les 27 `type-nul` d'abord, puis les 120 `categorie-nulle`,
regroupés selon les familles révélées par le criblage du volet 1. Chaque cas reste audité
individuellement, fiche entière et exemple compris.

**Livrable** : **un seul** rapport d'audit, `docs/rapports/etape2-A2-05-audit-null.md`, avec une
ligne par cas (147), son classement, sa motivation, et la liste des corrections que l'audit propose.
Les `categorie-nulle` peuvent être livrés à la relecture en plusieurs tranches ; le rapport final
reste unique. **Ce rapport ne modifie aucune donnée** : il est relu et arbitré avant toute correction
(§7).

## 6. Critères de classement

Chaque cas reçoit **un** classement et un seul : l'une des trois classes L, F ou C, ou, à titre
provisoire seulement, le statut N (§6.4). Les critères viennent des snapshots et des addenda A5 et
A6 ; ils ne créent aucune norme.

| Classement | Sens | État final acceptable |
|---|---|---|
| **L** | `null` légitime | oui |
| **F** | fonction linguistique ou information manquante | oui, une fois **corrigé** ; si l'arbitrage rejette la correction proposée, le cas est **reclassé** avant la sortie |
| **C** | catégorie ou type sémantique à corriger | oui, une fois **corrigé** ; si l'arbitrage rejette la correction proposée, le cas est **reclassé** avant la sortie |
| **N** | point non documenté (E5) | **non : statut provisoire** |

**Pendant l'audit : L + F + C + N = 147. À la déclaration finale : N = 0 et L + F + C = 147.**

### 6.1 Classe L · `null` légitime

Pour un `categorie-nulle`, **toutes** ces conditions (A5, §2 ; `A2-L3-v1`, §2, §6 et §7 ;
`A2-GLOBAL-v1`, §4.4, §10 et §11) :

- aucune catégorie primaire n'est suffisamment pertinente pour le sens que la fiche décrit. C'est
  le cas, **par décision de l'architecture et non par manque**, des éléments qu'`A2-L3-v1` (§6) et
  `A2-GLOBAL-v1` (§4.4) placent hors de la hiérarchie thématique : objet, personne, lieu et action
  génériques, propriété générale, et les notions relationnelles qu'ils énumèrent. C'est aussi le cas
  d'une fiche qui déborde tout domaine unique ;
- le `null` n'est pas dû à une simple difficulté de classement : « un mot lexical plein ne doit pas
  être placé en `null` simplement parce que son classement est difficile » (`A2-GLOBAL-v1`, §10) ;
- la raison journalisée tient encore, relue contre les snapshots et contre la fiche ;
- aucun sens comparable publié ne porte une catégorie qui conviendrait aussi à celui-ci.

Pour un `type-nul`, **toutes** ces conditions (A6, §2 ; `A2-ST-v1`, §3 à §5 ; `A2-GLOBAL-v1`,
§5.3) :

- aucun type terminal ne décrit correctement la nature du sens, les définitions de frontière
  d'`A2-ST-v1` (§3) étant lues une à une ;
- `concept_abstrait` n'est pas utilisable comme type de secours (`A2-ST-v1`, §3 et §5) ;
- la raison journalisée tient encore ;
- aucun sens comparable publié ne porte un type qui conviendrait aussi à celui-ci.

Le cas reste `null`, sans modification de donnée.

### 6.2 Classe F · fonction linguistique ou information manquante

Le `null` lui-même peut être juste, mais le SENSE est **incomplet** : la fiche atteste une
information que les données ne portent pas, et qui change la lecture du `null`.

- **Fonction linguistique** : le rôle fait partie intégrante du sens modélisé, la fiche l'atteste,
  et il correspond à une fonction **définie normativement** (`deictique`, A7 ; `connecteur`,
  `discours`, `politesse`, `quantificateur`, `comparatif`, `intensifieur`, A9). Le `null` serait
  alors justifié directement par la fonction, et l'avertissement cesserait d'être émis.
- **Autre information manquante** : une dimension d'A2-DIM qui décrit directement le sens, ou tout
  autre champ que la fiche atteste et que le SENSE ne porte pas.

**Fonction sans définition normative** (`interrogatif`, `negation`, `pluralisation`, `modalite`,
`aspect`, `temps`, `alternative`). Elle ne peut pas être posée (doctrine du lot 20). Arbitrage de
Q4 :

- si L ou C peut être établi **indépendamment** de la fonction hypothétique, le cas est classé
  normalement L ou C, et le chantier normatif de la fonction est référencé à part ;
- si l'absence de définition empêche **réellement** de déterminer L, F ou C, le cas reçoit
  provisoirement le statut N (§6.4) ;
- **une fonction non définie n'est jamais créée ni posée pour obtenir F.**

### 6.3 Classe C · catégorie ou type sémantique à corriger

Une valeur **existante** du registre convient directement au sens que la fiche décrit : une
catégorie primaire pour un `categorie-nulle`, un type terminal pour un `type-nul`. Entrent aussi
dans cette classe :

- une raison journalisée qui ne tient plus, relue contre le registre ou la fiche ;
- une incohérence entre deux sens comparables, dont l'un porte une valeur et l'autre `null`, quand
  la fiche ne justifie pas la différence.

Le cas C désigne la valeur attendue et sa justification ; la correction suit le §7.

### 6.4 Statut provisoire N · point non documenté (E5)

**Les propriétés et les actions générales ne sont pas des lacunes.** `A2-L3-v1` (§6) et
`A2-GLOBAL-v1` (§4.4) les placent volontairement hors de la hiérarchie thématique : pour elles,
l'absence de catégorie est la réponse de l'architecture, et le cas se juge par les conditions de la
classe L. Elles ne reçoivent jamais le statut N à ce titre.

**N** désigne le cas où les normes actuelles ne permettent **réellement** pas de décider, **après
épuisement** des snapshots et des addenda applicables : ni les conditions de L, ni celles de F, ni
celles de C ne peuvent être établies à partir des textes. L'audit ne suppose pas une lacune de
l'architecture (`A2-GLOBAL-v1`, §15) : il lit d'abord toutes les frontières applicables, et ne pose
N qu'ensuite. C'est le code E5 du volet 1, appliqué à l'un des 147.

Un cas classé N :

- **conserve provisoirement sa valeur publiée** ;
- **n'est pas déclaré légitime** ;
- est **rattaché à un chantier normatif nommé** ;
- figure dans une liste à part du rapport d'audit, avec les textes lus et ce qui manque pour
  décider.

**N n'est jamais un état final acceptable.** Avant la déclaration finale de conformité des 147,
chaque N doit avoir été résolu normativement (par le chantier auquel il est rattaché), puis reclassé
L, F ou C. Ni registre ni conception ne sont modifiés dans A2-05 lui-même. La résolution normative
d'un N passe par un chantier de conception séparé et explicitement arbitré, avec un addendum validé
conformément à la gouvernance ; un nouveau snapshot peut ensuite être produit si la procédure de
consolidation de la couche concernée l'exige.

## 7. Procédure si une correction est nécessaire

**Aucune correction pendant l'audit.** L'ordre proposé :

1. **Rapport d'audit** (§5), en proposition : 147 classements (L, F, C, ou N à titre provisoire),
   la liste des corrections proposées (classes F et C), et la liste des cas N avec leur chantier
   normatif.
2. **Relecture et arbitrage** du rapport, cas par cas pour les classes F et C et pour le statut N.
   Pour chaque N : résolution normative par son chantier, puis reclassement en L, F ou C. Pour un F
   ou un C dont l'arbitrage rejette la correction proposée : le classement est réexaminé et le cas
   **reclassé**, normalement L si le `null` est alors établi comme légitime. Un cas ne reste jamais
   C avec son `null`.
3. **Périmètre des corrections** arbitré : la liste fermée des SENSE à corriger. Aucune correction
   hors de cette liste.
4. **Proposition de correction**, selon la procédure de réouverture d'une ENTRY validée
   (précédents : 5.13-C, 暖かい, lot 26) :
   - l'ENTRY repasse en `proposed` **dans son lot d'origine** ;
   - ses décisions historiques restent intactes et citées, la décision `categorie-nulle` ou
     `type-nul` d'origine comprise ;
   - les décisions nouvelles (réouverture, puis `correction`) s'ajoutent **à la fin du journal**, à
     partir de D1614 ;
   - l'état validé est gardé en entier dans le champ « avant » de la décision de réouverture ;
   - les identifiants de SENSE ne changent pas : une correction de catégorie, de type, de fonction
     ou de dimension ne renumérote rien.
5. **Relecture, révision** si nécessaire, puis **validation atomique** (statuts seulement), sur un
   accord explicite.
6. **Publication**, selon le protocole de toute publication : suite pré-publication verte,
   `publish --write` (unique chemin vers `data/`), suite complète verte. `data/` n'est jamais
   corrigé à la main.
7. **Commit**, puis **push**, chacun sur un accord explicite et distinct.

**Le véhicule des corrections** (arbitrage de Q6) : le **lot 27**, lot véhicule d'A2-05, **sans
ENTRY propre**, sur le modèle du lot 26. Les ENTRY corrigées restent dans leurs lots d'origine. Il
sert aux corrections des trois volets.

Une précision de nommage : le préfixe `lot27` a servi, pendant 5.17, à nommer des exports de
relecture et trois rapports (`etape2-A2-04-lot27-…-5-17.md`), alors qu'aucun lot 27 n'existait. Ce
n'était qu'un préfixe d'export. Le lot 27 d'A2-05 sera, lui, un vrai fichier de lot
(`reconstruction/a2-04/lots/lot-27.json`) ; le numéro n'est pas sauté.

**L'inventaire après correction** (arbitrage de Q7). Aujourd'hui, `publish` accepte qu'un
avertissement de l'inventaire ne soit plus émis, et le signale ; il refuse tout avertissement
nouveau ; aucune commande ne réécrit `avertissements-connus.json` après l'amorçage. La règle
arbitrée :

- après une correction validée, `avertissements-connus.json` **reste synchronisé** avec les
  avertissements réellement attendus ;
- un avertissement ancien, disparu après une correction validée, **est retiré** du baseline ;
- un avertissement **nouveau bloque** : il n'est jamais ajouté automatiquement au baseline pour
  faire passer la publication ;
- **aucune édition manuelle opportuniste** du baseline. Comme aucune commande ne fait ce
  rafraîchissement, il passe, si une correction le rend nécessaire, par un **petit chantier
  d'outillage séparé** : une commande déterministe et testée, relue et arbitrée à part.

## 8. Fichiers susceptibles d'être modifiés

**Pendant l'audit** (classement des 147 cas) : aucun fichier de données, d'outil, de test ni de
reconstruction.

| Fichier | Nature |
|---|---|
| `docs/rapports/etape2-A2-05-audit-null.md` | nouveau, le rapport d'audit |
| `ETAT-ACTUEL.md`, `ROADMAP.md`, `CLAUDE.md`, `docs/relecture/note-relais.md` | suivi |

**Pendant les corrections**, si l'arbitrage en retient, et seulement pour les SENSE de la liste
fermée :

| Fichier | Nature |
|---|---|
| `reconstruction/a2-04/lots/lot-NN.json` (lots d'origine) | ENTRY rouvertes, champs corrigés |
| `reconstruction/a2-04/journal.json` | décisions nouvelles, à la fin |
| `reconstruction/a2-04/lots/lot-27.json` | nouveau : lot véhicule d'A2-05, sans ENTRY propre |
| `reconstruction/a2-04/rapports/` | rapports générés |
| `data/n5/vocab.json`, `data/vocab-hors-jlpt.json` | **par `publish --write` seulement** |
| `reconstruction/a2-04/avertissements-connus.json` | resynchronisé par une commande déterministe et testée, jamais à la main (§7) |
| `tests/reconstruction/` | tests d'état des lots touchés, test du lot 27 |
| `docs/rapports/` | rapports de proposition et de validation |

**Jamais dans ce périmètre** : `reconstruction/a2-04/sources/` (figées), `data/registries/`, les
snapshots A2 et `docs/conception/` (verrouillés : toute évolution passe par un addendum validé
avant d'être codé), `data/kanji_jouyou_fr.json`, `src/`, et les outils. La commande de
resynchronisation de l'inventaire (§7) est un chantier d'outillage séparé, hors de ce volet.

## 9. Contrôles et preuves attendus avant de déclarer l'étape 2 terminée

Ce volet est une condition **nécessaire** de la clôture de l'étape 2, non suffisante : restent
aussi les volets 1 et 3 d'A2-05, le graphe G2 à G9, le registre de phrases et la clôture elle-même.

**Preuves du rapport d'audit :**

1. **Complétude** : 147 fiches d'audit, contrôlées par script contre l'inventaire : chaque couple
   `{ code, where }` y figure une fois et une seule, aucun n'est ajouté, et les comptes sont
   120 et 27.
2. **Individualité** : chaque fiche cite le passage de la fiche source lu, la décision de journal
   et la section de snapshot ou d'addendum appliquée ; aucune motivation par simple renvoi à un
   autre cas.
3. **Classement** : chaque cas a un classement et un seul. **Pendant l'audit, L + F + C + N = 147**,
   compté par script. Chaque N est accompagné des textes lus, de ce qui manque pour décider, et du
   chantier normatif nommé auquel il est rattaché.
4. **Cohérence** : la liste des sens comparables examinés, et les écarts relevés.
5. **Relecture** : l'export joint les fiches sources des 127 ENTRY, pour que le relecteur puisse
   vérifier lui-même chaque classement.

**Preuves après les corrections**, s'il y en a :

6. Diff limité aux SENSE de la liste fermée ; décisions antérieures (D0001 à D1613) identiques,
   empreinte comprise ; identifiants de SENSE inchangés.
7. Assemblage réel, partiel et complet : 0 problème, 0 erreur, 0 attente.
8. `validate-data` : 0 erreur ; suite complète verte ; `publish` idempotent, `data/` identique à la
   publication calculée.
9. Sabotages, avec un témoin sain vérifié d'abord.

**Preuve de sortie**, dans tous les cas :

10. **Compte final : N = 0 et L + F + C = 147**, compté par script. Chaque cas un temps classé N a
    été résolu normativement par le chantier auquel il était rattaché, puis reclassé L, F ou C ; le
    rapport garde la trace de ce reclassement. **Tant qu'il reste un N, la déclaration finale ne
    peut pas être faite.**
11. **Aucun cas F ou C en attente** : chaque F et chaque C final a été **corrigé**. Un F ou un C
    dont l'arbitrage a rejeté la correction a été **reclassé** avant la sortie, avec sa raison ; le
    rapport garde la trace de ce reclassement.
12. **Un état final des `null`, réconcilié avec les 147** :
    - les avertissements `categorie-nulle` et `type-nul` encore émis sont **égaux à l'inventaire**,
      resynchronisé selon le §7 ;
    - chacun est rattaché à une décision de journal `validated` et à un classement final arbitré,
      qui ne peut être que : **L** ; ou un cas **F** dont l'information manquante a été corrigée et
      dont le `null` reste indépendamment légitime ;
    - **un C final a été corrigé : son avertissement n'est plus émis.** Aucun avertissement encore
      émis ne correspond à un C ;
    - les avertissements des 147 qui ne sont plus émis correspondent chacun à une correction
      validée (un C, ou un F dont la correction fait cesser l'avertissement), et ont été retirés de
      l'inventaire ;
    - aucun avertissement nouveau n'a été ajouté à l'inventaire sans décision explicite.
13. Une déclaration explicite, dans le rapport de synthèse `etape2-A2-05.md`, que les `null`
    restants sont intentionnels et conformes aux addenda A5 et A6, **validée par un accord
    explicite** ; un avis favorable n'y suffit pas. Elle s'appuie aussi sur les axes C2 et C4 du
    volet 1, pour les `null` portés par une fonction.

## 10. Hors de ce périmètre

Les autres points réservés à A2-05, relevés dans `ROADMAP.md` (§6) et `ETAT-ACTUEL.md` (points
ouverts), ne sont pas traités ici. Les points sémantiques relèvent du volet 1 (axes C1 à C10), les
autres du volet 3 :

- relecture d'un échantillon, statistiques du corpus, incohérences entre lots, doublons ou fusions
  oubliés (objectifs généraux d'A2-05) ;
- tags de lieu : ceux du lot 0, et la cohérence globale ;
- stabilité des identifiants de SENSE après la publication ;
- audit rétroactif de la deixis temporelle (A7) : おととし, 近く, 前, 先 ;
- audit des fonctions d'A9 sur les sens validés avant lui, dont また, sens 2 ;
- catégories de メートル et de キロ ; catégorie du poids ; sous-catégories absentes d'espace ›
  dimensions ; extensions conservées en nuance (lot 15) ;
- fiches « adjectif en na (et nom) » ; registre des compteurs sans compatibilité pour une durée ;
- anomalies du dictionnaire des kanji.

Plusieurs de ces points touchent des SENSE de l'inventaire (les catégories nulles des lots 16 et
17, le poids, メートル et キロ, 声, また). L'audit des `null` les rencontrera ; il ne tranche que la
question du `null`, et signale le reste.

## 11. Questions posées et arbitrages rendus

**Arbitrées le 2026-10-07** (ChatGPT, par délégation) ; le corps du rapport est révisé en
conséquence.

- **Q1 · Place de ce volet dans A2-05.** La proposition d'origine en faisait le premier volet, le
  reste étant renvoyé à un périmètre séparé.
  - **Arbitrage** : A2-05 a trois volets ; l'audit des `null` est le volet 2. L'ordre est : criblage
    de cohérence, audit des 147 `null`, examen des autres candidats de cohérence, arbitrage global.
    Un même cas n'est audité individuellement qu'une fois.
- **Q2 · Les `null` portés par une fonction** (55 `category: null`, 71 `semantic_type: null`), qui
  ne produisent aucun avertissement. La proposition d'origine les laissait hors de l'audit
  obligatoire.
  - **Arbitrage** : ils sont contrôlés au volet 1, les 55 par l'axe C2 et les 71 par l'axe C4 (§2).
    La preuve de sortie de l'étape 2 s'appuie donc sur les deux volets.

- **Q3 · `kanji-inconnu`.** Proposition : constaté, non modifié, rattaché à la tâche de données ; il
  ne conditionne pas la clôture de l'étape 2.
  - **Arbitrage : accepté.** Le volet 3 (G5) contrôle ces anomalies exhaustivement et les rattache
    à la tâche de données sur les kanji. Elles ne conditionnent ni la clôture d'A2-05 ni celle de
    l'étape 2 si leur état et leur chantier de destination sont explicitement documentés (§4).
- **Q4 · Fonction sans définition normative.** Que faire d'un cas qui ne relèverait d'une fonction
  que par une fonction non définie ?
  - **Arbitrage** : si L ou C peut être établi indépendamment de la fonction hypothétique, classer
    normalement L ou C et référencer séparément le chantier normatif ; si l'absence de définition
    empêche réellement de déterminer L, F ou C, classer provisoirement N ; ne jamais créer une
    fonction non définie pour obtenir F (§6.2).
- **Q5 · Point non documenté.** La notion de « lacune de registre » est retirée pour les propriétés
  et les actions générales, que l'architecture place volontairement hors de la hiérarchie. Que faire
  d'un cas que les snapshots ne permettent réellement pas de trancher ?
  - **Arbitrage : accepté, avec le statut provisoire N.** Pendant l'audit, L + F + C + N = 147. N
    conserve provisoirement la valeur publiée, n'est pas déclaré légitime et est rattaché à un
    chantier normatif nommé. N n'est jamais un état final : la preuve finale exige N = 0 et
    L + F + C = 147 (§6, §6.4, §9).
- **Q6 · Véhicule des corrections.** Un lot sans entrée propre, sur le modèle du lot 26 ; quel
  numéro, le préfixe `lot27` ayant servi aux exports de 5.17 ?
  - **Arbitrage** : le **lot 27**, lot véhicule d'A2-05, sans ENTRY propre ; les ENTRY corrigées
    restent dans leurs lots d'origine. Le numéro n'est pas sauté ; la différence avec le préfixe
    d'export de 5.17 est documentée (§7).
- **Q7 · Inventaire après correction.** Faut-il resynchroniser `avertissements-connus.json`, par
  quel moyen, et que faire d'un avertissement nouveau ?
  - **Arbitrage** : l'inventaire reste synchronisé avec les avertissements réellement attendus ; un
    avertissement disparu après une correction validée est retiré ; un avertissement nouveau
    bloque et n'est jamais ajouté automatiquement ; aucune édition manuelle opportuniste. Si
    nécessaire, un petit chantier d'outillage séparé fournit une commande déterministe et testée
    (§7).
- **Q8 · Ordre de revue, à l'intérieur de ce volet.**
  - **Arbitrage : accepté.** Les 27 `type-nul` d'abord, puis les 120 `categorie-nulle` regroupés
    selon les familles du criblage. Le rapport final reste unique ; les `categorie-nulle` peuvent
    être livrés en plusieurs tranches de relecture. Chaque cas reste audité individuellement, fiche
    entière et exemple compris (§5).

**Toutes les questions de ce périmètre sont arbitrées.**

**Aucune décision sur les 147 cas avant la validation de ce périmètre.**

---

## Annexe A · Les 120 `categorie-nulle`

Ordre : numéro d'ENTRY, puis numéro de sens. « Lot » : lot d'origine de l'ENTRY. « Décision » :
identifiant au journal, préfixe `A2-04-` omis.

| # | SENSE | Mot | Lecture | Classe | Sens | Type sémantique | Dimensions | Lot | Décision | Raison journalisée |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_50_s2` | 差す | さす | verbe | Pointer | action | — | 18 | D1217 | Tendre la main ou pointer quelque chose : action générale, sans domaine thématique propre. Addendum A5. |
| 2 | `v_62_s1` | 軽い | かるい | adjectif_i | Léger | propriete | — | 15 | D1073 | Aucune catégorie primaire pertinente : le poids est une propriété physique générale d'un objet, que le registre ne range nulle part (espace › dimensions ne couvre que longueur, largeur, hauteur, profondeur et taille ; sciences › physique désigne la discipline, non la propriété d'un objet du quotidien). Addendum A5. |
| 3 | `v_79_s1` | 押す | おす | verbe | Pousser | action | — | 18 | D1208 | Pousser un objet, appuyer sur un bouton ou apposer un tampon : action générale, sans domaine thématique propre. Addendum A5. |
| 4 | `v_80_s2` | 曇る | くもる | verbe | S'embuer | processus | — | 07 | D0466 | Une surface qui s'embue : phénomène physique général, sans domaine thématique propre. Addendum A5. |
| 5 | `v_130_s1` | 引く | ひく | verbe | Tirer | action | — | 18 | D1212 | Tirer quelque chose : action générale, sans domaine thématique propre. Addendum A5. |
| 6 | `v_144_s1` | 忙しい | いそがしい | adjectif_i | Occupé | etat | — | 16 | D1122 | Aucune catégorie primaire pertinente : la fiche décrit « un emploi du temps chargé », l'état d'une personne quant à son temps. Le registre ne le range ni dans le temps (qui porte les notions de temps), ni dans le seul travail : la traduction de la source dit « par le travail ou les tâches ». Addendum A5. |
| 7 | `v_163_s1` | かかる | かかる | verbe | Prendre (du temps ou de l'argent) | propriete | — | 20 | D1344 | Ce qu'une chose exige en temps ou en argent : la durée relèverait du temps et le prix de l'économie ; aucun domaine ne couvre les deux, et le sens est unique. Propriété sans domaine thématique propre. Addendum A5. |
| 8 | `v_164_s3` | かける | かける | verbe | Accrocher | action | — | 08 | D0521 | Accrocher, suspendre un objet : action générale, sans domaine thématique propre. Addendum A5. |
| 9 | `v_181_s1` | する | する | verbe | Faire | action | — | 20 | D1331 | Faire : action la plus générale, sans domaine thématique propre. Addendum A5. |
| 10 | `v_265_s2` | 冷たい | つめたい | adjectif_i | Froid (attitude) | propriete | — | 07 | D0481 | Attitude distante envers autrui : « propriété générale », sans domaine thématique propre (comme 甘い « indulgent », lot 02). Addendum A5. |
| 11 | `v_266_s2` | 吹く | ふく | verbe | Souffler (de l'air) | action | — | 07 | D0472 | Souffler de l'air (sur une bougie, dans un instrument) : action générale, sans domaine thématique propre. Addendum A5. |
| 12 | `v_287_s1` | カレンダー | かれんだー | nom | Calendrier | objet_artefact | — | 13 | D0849 | Aucune catégorie primaire pertinente : カレンダー est un objet qui présente les jours et les mois, pas une notion du calendrier. Le ranger dans temps › calendrier ferait d'une proximité fonctionnelle une appartenance ; le registre n'a pas de catégorie pour ce type d'objet. Même traitement que 時計 (lot 05, révision 5.6b). Addendum A5. |
| 13 | `v_361_s1` | 違う | ちがう | verbe | Être différent | etat | — | 20 | D1325 | La différence entre deux éléments : état général, sans domaine thématique propre. Addendum A5. |
| 14 | `v_361_s2` | 違う | ちがう | verbe | Être incorrect | etat | exactitude_inexactitude:inexactitude | 20 | D1326 | Une information erronée : état général, sans domaine thématique propre. Addendum A5. |
| 15 | `v_420_s1` | いい | いい | adjectif_i | Bon | propriete | — | 00 | D0065 | « Bon » : propriété générale, hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. |
| 16 | `v_421_s1` | いろいろ | いろいろ | adjectif_na | Divers | propriete | — | 22 | D1423 | La diversité : une propriété générale, sans domaine thématique propre. Elle n'est pas une quantité : aucune catégorie de nombres et quantification n'est cherchée pour elle. Addendum A5. |
| 17 | `v_422_s2` | うるさい | うるさい | adjectif_i | Agaçant | propriete | — | 17 | D1152 | Le comportement insistant ou ennuyeux d'une personne : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5. |
| 18 | `v_424_s1` | きれい | きれい | adjectif_na | Beau | propriete | — | 00 | D0066 | « Beau » : appréciation esthétique générale, sans domaine thématique propre. Addendum A5. |
| 19 | `v_425_s1` | だんだん | だんだん | adverbe | Graduellement | concept_abstrait | — | 21 | D1399 | La manière dont se fait un changement, étape par étape : ni une fréquence, ni une durée, ni une relation entre deux moments ; aucun domaine du registre ne nomme la progression. Aucune catégorie n'est cherchée pour réduire les avertissements (arbitrage du lot 20). Addendum A5. |
| 20 | `v_427_s2` | まずい | まずい | adjectif_i | Fâcheux | propriete | — | 02 | D0197 | Évaluation générale d'une situation : « propriété générale », sans domaine thématique propre. Addendum A5. |
| 21 | `v_428_s1` | 丈夫 | じょうぶ | adjectif_na | Solide | propriete | — | 17 | D1141 | La solidité d'un objet : propriété générale d'une chose, sans domaine thématique propre. Addendum A5. |
| 22 | `v_432_s1` | 便利 | べんり | adjectif_na | Pratique | propriete | utilite_inutilite:utilite | 16 | D1109 | Évaluation générale de l'utilité d'une chose : « propriété générale », sans domaine thématique propre. Addendum A5. |
| 23 | `v_434_s1` | 危ない | あぶない | adjectif_i | Dangereux | propriete | — | 16 | D1114 | Évaluation générale du risque d'une situation : « propriété générale », sans domaine thématique propre ; aucun axe d'A2-DIM ne décrit le danger. Addendum A5. |
| 24 | `v_438_s1` | 同じ | おなじ | determinant | Même | propriete | — | 22 | D1420 | L'identité ou la similitude : une propriété générale, sans domaine thématique propre ; aucune catégorie du registre ne nomme la comparaison. Addendum A5. |
| 25 | `v_442_s1` | 大切 | たいせつ | adjectif_na | Important | propriete | importance_insignifiance:importance | 16 | D1102 | Évaluation générale de l'importance d'une chose : « propriété générale », sans domaine thématique propre. Addendum A5. |
| 26 | `v_449_s1` | 弱い | よわい | adjectif_i | Faible | propriete | — | 17 | D1138 | Le manque de force, de résistance ou d'intensité : propriété générale d'une chose, sans domaine thématique propre, comme 強い. Addendum A5. |
| 27 | `v_451_s1` | 強い | つよい | adjectif_i | Fort | propriete | — | 17 | D1135 | La force, la robustesse ou l'intensité : propriété générale d'une chose, sans domaine thématique propre ; la fiche l'applique aussi bien à une personne qu'à un phénomène (la pluie). Addendum A5. |
| 28 | `v_452_s1` | 悪い | わるい | adjectif_i | Mauvais | propriete | — | 16 | D1098 | Évaluation générale : « propriété générale », hors de la hiérarchie thématique, comme いい (lot 0). Addendum A5. |
| 29 | `v_456_s1` | 易しい | やさしい | adjectif_i | Facile | propriete | facilite_difficulte:facilite | 16 | D1091 | Propriété générale d'une tâche, sans domaine thématique propre ; le sens passe par la dimension facilité / difficulté, comme le sens « difficile » de 大変 (lot 0). Addendum A5. |
| 30 | `v_457_s1` | 暇 | ひま | adjectif_na | Libre | etat | — | 16 | D1120 | Aucune catégorie primaire pertinente : avoir ou non du temps devant soi est l'état d'une personne, que le registre ne range ni dans le temps (qui porte les notions de temps), ni dans le travail (la fiche parle du travail « ou » d'autres obligations). Addendum A5. |
| 31 | `v_458_s1` | 有名 | ゆうめい | adjectif_na | Célèbre | propriete | — | 16 | D1111 | La notoriété est une caractéristique générale d'une personne, d'un lieu ou d'une chose, sans domaine thématique propre ; aucun axe d'A2-DIM ne la décrit, aucune dimension n'est donc portée. Addendum A5. |
| 32 | `v_461_s2` | 汚い | きたない | adjectif_i | Grossier (langage) | propriete | — | 17 | D1146 | Un langage grossier ou une action malhonnête : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5. |
| 33 | `v_462_s1` | 清い | きよい | adjectif_i | Pur | propriete | — | 17 | D1149 | La pureté physique d'une chose : propriété générale d'une chose, sans domaine thématique propre. Addendum A5. |
| 34 | `v_462_s2` | 清い | きよい | adjectif_i | Pur (moralement) | propriete | — | 17 | D1150 | La pureté morale : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5. |
| 35 | `v_464_s2` | 甘い | あまい | adjectif_i | Indulgent | propriete | — | 02 | D0192 | Attitude générale envers autrui (trop indulgent) : « propriété générale », sans domaine thématique propre. Addendum A5. |
| 36 | `v_478_s1` | 賑やか | にぎやか | adjectif_na | Animé | propriete | — | 17 | D1154 | L'animation ou le calme d'un lieu : propriété générale d'un endroit ou d'une atmosphère, sans domaine thématique propre ; la fiche parle de vie, de monde et d'agitation autant que de bruit, ce que « ouïe » ne couvrirait qu'en partie. Addendum A5. |
| 37 | `v_484_s1` | 重い | おもい | adjectif_i | Lourd | propriete | — | 15 | D1070 | Aucune catégorie primaire pertinente : le poids est une propriété physique générale d'un objet, que le registre ne range nulle part (espace › dimensions ne couvre que longueur, largeur, hauteur, profondeur et taille ; sciences › physique désigne la discipline, non la propriété d'un objet du quotidien). Addendum A5. |
| 38 | `v_484_s2` | 重い | おもい | adjectif_i | Grave | propriete | — | 15 | D1071 | Gravité d'une situation, d'une responsabilité ou d'une atmosphère : « propriété générale », sans domaine thématique propre (comme 甘い « indulgent », lot 02). Addendum A5. |
| 39 | `v_486_s1` | 難しい | むずかしい | adjectif_i | Difficile | propriete | facilite_difficulte:difficulte | 16 | D1094 | Propriété générale d'une tâche, sans domaine thématique propre ; le sens passe par la dimension facilité / difficulté, comme le sens « difficile » de 大変 (lot 0). Addendum A5. |
| 40 | `v_489_s1` | 静か | しずか | adjectif_na | Calme | propriete | — | 17 | D1156 | L'animation ou le calme d'un lieu : propriété générale d'un endroit ou d'une atmosphère, sans domaine thématique propre ; la fiche parle de vie, de monde et d'agitation autant que de bruit, ce que « ouïe » ne couvrirait qu'en partie. Addendum A5. |
| 41 | `v_495_s2` | 大変 | たいへん | adjectif_na | Difficile | propriete | facilite_difficulte:difficulte | 00 | D0067 | « Difficile » : propriété générale ; le sens passe par la dimension facilité / difficulté. Addendum A5. |
| 42 | `v_496_s1` | ちょうど | ちょうど | adverbe | Exactement | propriete | exactitude_inexactitude:exactitude | 24 | D1562 | L'exactitude d'une mesure, d'une heure, d'une quantité ou d'une coïncidence : la fiche couvre plusieurs domaines, et aucune catégorie ne les nomme tous ; la dimension porte le sens. Addendum A5. |
| 43 | `v_500_s1` | また | また | adverbe | À nouveau | concept_abstrait | — | 21 | D1379 | La répétition d'une action ou le retour d'un état : aucune catégorie du registre ne nomme la répétition. temps › fréquence dit combien souvent une chose arrive (toujours, souvent, parfois), non qu'elle arrive une fois de plus. Aucune catégorie n'est cherchée pour réduire les avertissements (arbitrage du lot 20). Addendum A5. |
| 44 | `v_500_s2` | また | また | adverbe | Aussi | null | — | 21 | D1380 | L'ajout d'un élément à ce qui précède : une relation de discours, sans domaine thématique (A2-LING-v1, §5 : une fonction discursive ne fait pas une catégorie). Addendum A5. |
| 45 | `v_503_s1` | もう一度 | もういちど | adverbe | Encore une fois | concept_abstrait | — | 21 | D1385 | La répétition d'une action : aucune catégorie du registre ne nomme la répétition, comme pour また, sens 1. Addendum A5. |
| 46 | `v_504_s2` | ゆっくり | ゆっくり | adverbe | Tranquillement | propriete | — | 22 | D1435 | « Tranquillement, à son aise » : agir sans se presser, se détendre, prendre son temps ; une manière d'agir, non une vitesse de déplacement : aucune catégorie du registre ne la nomme (arbitrage des choix du lot 22). Addendum A5. |
| 47 | `v_506_s2` | よく | よく | adverbe | Bien | propriete | — | 21 | D1374 | « Bien, habilement » : la qualité ou la réussite d'une action, quelle qu'elle soit ; aucun domaine thématique propre, comme le sens « Bon » de いい (D0065). Addendum A5. |
| 48 | `v_510_s1` | 本当 | ほんとう | nom | Vérité | concept_abstrait | vrai_faux:vrai | 00 | D0068 | « Vérité » : statut épistémique, porté par la dimension vrai / faux ; aucune catégorie primaire pertinente. Addendum A5. |
| 49 | `v_511_s1` | 問題 | もんだい | nom | Problème | concept_abstrait | — | 20 | D1359 | Un problème, une difficulté dans une situation : notion générale, sans domaine thématique propre. Addendum A5. |
| 50 | `v_512_s1` | 大丈夫 | だいじょうぶ | adjectif_na | Ça va | etat | — | 16 | D1125 | Aucune catégorie primaire pertinente : « tout va bien » est l'état général d'une personne ou d'une situation, sans domaine thématique propre. Addendum A5. |
| 51 | `v_513_s2` | 意味 | いみ | nom | Intérêt | propriete | — | 06 | D0445 | Utilité ou raison d'être d'une action : « propriété générale », sans domaine thématique propre. Addendum A5. |
| 52 | `v_516_s1` | ある | ある | verbe | Y avoir | etat | — | 20 | D1303 | L'existence ou la présence d'une chose : état général, sans domaine thématique propre ; aucune catégorie du registre ne nomme l'existence. Addendum A5. |
| 53 | `v_516_s2` | ある | ある | verbe | Posséder | etat | — | 20 | D1304 | La possession d'une chose : état général, sans domaine thématique propre. Addendum A5. |
| 54 | `v_521_s1` | たぶん | たぶん | adverbe | Peut-être | null | probabilite:probabilite | 22 | D1432 | La probabilité qu'un fait se produise ou soit vrai : une estimation du locuteur, sans domaine thématique. Addendum A5. |
| 55 | `v_522_s1` | 付ける | つける | verbe | Allumer | action | — | 18 | D1194 | Mettre en marche un appareil électrique : action générale, sans domaine thématique propre, comme le sens « éteindre » de 消す. Addendum A5. |
| 56 | `v_522_s2` | 付ける | つける | verbe | Fixer | action | — | 18 | D1195 | Attacher ou fixer quelque chose : action générale, sans domaine thématique propre, comme le sens « accrocher » de かける (lot 08). Addendum A5. |
| 57 | `v_523_s2` | 出来る | できる | verbe | Être achevé / prêt | resultat | — | 20 | D1317 | Une chose terminée ou fabriquée : résultat général, sans domaine thématique propre. Addendum A5. |
| 58 | `v_524_s1` | なる | なる | verbe | Devenir | evenement | — | 20 | D1321 | Devenir, changer d'état : événement général, sans domaine thématique propre. Addendum A5. |
| 59 | `v_525_s2` | まっすぐ | まっすぐ | adverbe | Honnête | propriete | — | 22 | D1411 | « Honnête » : un trait de caractère ; le registre n'a pas de catégorie pour la personnalité ou le caractère. Addendum A5. |
| 60 | `v_526_s1` | コピーする | こぴーする | verbe | Photocopier | action | — | 19 | D1260 | Faire une photocopie : action générale, sans domaine thématique propre ; la fiche ne la rattache ni au bureau ni à l'école. Addendum A5. |
| 61 | `v_528_s1` | 並ぶ | ならぶ | verbe | Faire la queue | action | — | 18 | D1227 | Se mettre en rang, faire la queue : action générale, sans domaine thématique propre. Addendum A5. |
| 62 | `v_532_s1` | 作る | つくる | verbe | Fabriquer | action | — | 18 | D1236 | Fabriquer un objet, créer quelque chose de matériel ou d'immatériel : action générale, sans domaine thématique propre ; « fabrication », dans le registre, est un domaine industriel. Addendum A5. |
| 63 | `v_533_s1` | 借りる | かりる | verbe | Emprunter | action | — | 19 | D1267 | Emprunter un objet ou louer un bien : action générale, sans domaine thématique propre, comme 貸す. Addendum A5. |
| 64 | `v_536_s3` | 出す | だす | verbe | Présenter | action | — | 18 | D1225 | Soumettre ou présenter un document : action générale, sans domaine thématique propre ; la fiche ne le rattache ni à l'école ni à l'administration. Addendum A5. |
| 65 | `v_539_s1` | 切る | きる | verbe | Couper | action | — | 18 | D1198 | Couper un matériau avec un outil : action générale, sans domaine thématique propre ; la découpe en cuisine n'en est qu'un cas, et l'exemple porte sur du papier. Addendum A5. |
| 66 | `v_539_s2` | 切る | きる | verbe | Raccrocher (un téléphone) | action | — | 18 | D1199 | Couper une connexion ou un appel : action générale, sans domaine thématique propre. L'appel seul relèverait de communication › contact, comme le sens « passer un appel » de かける (lot 08), mais la fiche réunit l'appel et la connexion, et donne « éteindre (un contact) ». Addendum A5. |
| 67 | `v_541_s1` | 取る | とる | verbe | Prendre | action | — | 18 | D1202 | Saisir ou prendre un objet avec la main : action générale, sans domaine thématique propre. Addendum A5. |
| 68 | `v_541_s2` | 取る | とる | verbe | Obtenir | action | — | 18 | D1203 | Obtenir une note ou un permis : action générale, sans domaine thématique propre ; la fiche ne le rattache ni à l'école ni à l'administration en particulier. Addendum A5. |
| 69 | `v_542_s1` | 吸う | すう | verbe | Fumer | action | — | 19 | D1292 | Fumer : aucune catégorie du registre ne nomme le tabac ; il n'est ni un aliment ni un soin. Action sans domaine thématique propre. Addendum A5. |
| 70 | `v_542_s2` | 吸う | すう | verbe | Aspirer | action | — | 19 | D1293 | Inspirer de l'air ou aspirer un liquide : action générale, sans domaine thématique propre, comme le sens « souffler (de l'air) » de 吹く (lot 07). Addendum A5. |
| 71 | `v_545_s1` | 変える | かえる | verbe | Changer | action | — | 18 | D1232 | Modifier, transformer ou remplacer quelque chose : action générale, sans domaine thématique propre ; l'exemple de la fiche (la manière de lire) est abstrait. Addendum A5. |
| 72 | `v_548_s1` | 居る | いる | verbe | Y avoir (pour les êtres vivants) | etat | — | 20 | D1307 | L'existence ou la présence d'un être vivant : état général, sans domaine thématique propre, comme ある. Addendum A5. |
| 73 | `v_551_s1` | 座る | すわる | verbe | S'asseoir | action | — | 19 | D1245 | S'asseoir : une posture du corps. Aucune catégorie du registre ne nomme les postures (le corps y est décrit par ses parties, l'espace par le déplacement) ; action générale. Addendum A5. |
| 74 | `v_552_s1` | 待つ | まつ | verbe | Attendre | action | — | 19 | D1281 | Attendre quelqu'un ou quelque chose : action générale, sans domaine thématique propre. Addendum A5. |
| 75 | `v_558_s1` | 死ぬ | しぬ | verbe | Mourir | evenement | — | 19 | D1299 | Aucune catégorie (arbitrage des choix du lot 19) : la proposition rangeait ce sens dans être humain › cycle de vie › mort. La fiche décrit « l'action biologique de cesser de vivre », et son exemple porte sur un chien : classer le verbe entier dans le cycle de vie humain serait artificiel, et le registre n'a pas de catégorie générale de la mort qui convienne au sens documenté. 生まれる, dans ce lot, garde naissance : sa fiche et son exemple portent sur une personne. Addendum A5. |
| 76 | `v_560_s1` | 消える | きえる | verbe | S'éteindre | evenement | — | 18 | D1185 | Une lumière, un feu ou une source d'énergie qui s'éteint : événement général, sans domaine thématique propre. Addendum A5. |
| 77 | `v_560_s2` | 消える | きえる | verbe | Disparaître | evenement | — | 18 | D1186 | Disparaître de la vue : événement général, sans domaine thématique propre, comme le sens « apparaître » de 出る (lot 04). Addendum A5. |
| 78 | `v_561_s1` | 消す | けす | verbe | Éteindre | action | — | 18 | D1189 | Éteindre un appareil électrique, une lumière ou un feu : action générale, sans domaine thématique propre ; aucun domaine ne couvre à la fois l'appareil et le feu. Addendum A5. |
| 79 | `v_562_s1` | 渡す | わたす | verbe | Remettre | action | — | 19 | D1273 | Remettre un objet à quelqu'un, de la main à la main : action générale, sans domaine thématique propre, comme 貸す. Addendum A5. |
| 80 | `v_564_s1` | 無くす | なくす | verbe | Perdre (un objet) | action | — | 00 | D0069 | « Perdre (un objet) » : action générale, hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. |
| 81 | `v_567_s1` | 磨く | みがく | verbe | Brosser | action | — | 18 | D1238 | Frotter pour nettoyer ou faire briller : action générale. Les dents relèveraient des soins bucco-dentaires et les chaussures de l'entretien ; aucun domaine ne couvre les deux, et le sens est unique. Addendum A5. |
| 82 | `v_568_s1` | 立つ | たつ | verbe | Se lever | action | — | 19 | D1247 | Se mettre debout : une posture du corps, comme 座る ; aucune catégorie du registre ne nomme les postures. Action générale. Addendum A5. |
| 83 | `v_573_s1` | 要る | いる | verbe | Avoir besoin de | etat | necessite_facultativite:necessite | 20 | D1313 | Avoir besoin de quelque chose : état général, sans domaine thématique propre. Addendum A5. |
| 84 | `v_575_s1` | 貸す | かす | verbe | Prêter | action | — | 19 | D1264 | Prêter un objet ou louer un bien à quelqu'un : action générale, sans domaine thématique propre ; le « prêt » du registre est un produit bancaire, et l'exemple porte sur un parapluie. Addendum A5. |
| 85 | `v_576_s1` | 貼る | はる | verbe | Coller | action | — | 18 | D1204 | Coller quelque chose sur une surface : action générale, sans domaine thématique propre ; le timbre de l'exemple n'est qu'un des objets que cite la fiche. Addendum A5. |
| 86 | `v_578_s1` | 返す | かえす | verbe | Rendre | action | — | 19 | D1270 | Rendre un objet, de la monnaie ou une somme : action générale, sans domaine thématique propre ; le remboursement seul relèverait des transactions, mais la fiche réunit les trois, et son exemple porte sur un livre. Addendum A5. |
| 87 | `v_579_s1` | 閉まる | しまる | verbe | Se fermer | evenement | — | 18 | D1178 | Une porte, une fenêtre ou un magasin qui se ferme : événement général, sans domaine thématique propre, comme 開く. Addendum A5. |
| 88 | `v_580_s1` | 開ける | あける | verbe | Ouvrir | action | — | 18 | D1172 | Ouvrir une porte, une fenêtre, une boîte ou un contenant : action générale, sans domaine thématique propre. Addendum A5. |
| 89 | `v_598_s1` | たばこ | たばこ | nom | Cigarette | objet_artefact | — | 19 | D1295 | Une cigarette : aucune catégorie du registre ne la nomme. Objet sans domaine thématique propre. Addendum A5. |
| 90 | `v_598_s2` | たばこ | たばこ | nom | Tabac | substance_matiere | — | 19 | D1301 | Le tabac : aucune catégorie du registre ne le nomme ; il n'est ni un aliment ni une matière de construction ou de fabrication. Matière sans domaine thématique propre, comme le sens 1. Addendum A5. |
| 91 | `v_605_s1` | 他 | ほか | nom | Autre | concept_abstrait | — | 22 | D1427 | L'altérité, ce qui est autre que l'élément donné : une notion générale, sans domaine thématique propre. Addendum A5. |
| 92 | `v_606_s1` | 皆 | みんな | pronom | Tout le monde | groupe_collectif | — | 11 | D0732 | Ensemble de personnes : « personne générique », hors de la hiérarchie thématique, comme 皆さん (lot 01) Addendum A5. |
| 93 | `v_608_s1` | やる | やる | verbe | Faire | action | — | 20 | D1334 | Faire, s'adonner à une activité : action la plus générale, sans domaine thématique propre, comme する. Addendum A5. |
| 94 | `v_608_s2` | やる | やる | verbe | Donner (à des plantes, des animaux) | action | — | 20 | D1335 | Donner à un animal ou à une plante : action générale, sans domaine thématique propre ; la fiche ne la rattache ni au jardin ni à l'élevage. Addendum A5. |
| 95 | `v_609_s1` | 立派 | りっぱ | adjectif_na | Magnifique | propriete | — | 16 | D1107 | Appréciation générale de l'aspect d'une chose : « propriété générale », sans domaine thématique propre, comme きれい « beau » (lot 0). Addendum A5. |
| 96 | `v_609_s2` | 立派 | りっぱ | adjectif_na | Remarquable | propriete | — | 16 | D1108 | Appréciation générale de la conduite d'une personne : « propriété générale », sans domaine thématique propre. Addendum A5. |
| 97 | `v_627_s2` | 一人 | ひとり | nom | Seul | etat | — | 14 | D1015 | Aucune catégorie primaire pertinente : « être seul, sans compagnie » est un état d'une personne, que le registre ne range ni dans les relations sociales (il s'agit de l'absence de compagnie, non d'une relation) ni dans les états physiques ou psychologiques. Type etat. Addendum A5. |
| 98 | `v_633_s1` | 人 | ひと | nom | Personne | personne | — | 01 | D0096 | « Personne générique », explicitement hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. |
| 99 | `v_635_s2` | 休む | やすむ | verbe | S'absenter | action | — | 19 | D1249 | S'absenter de l'école ou du travail : la fiche réunit les deux lieux ; « congés », dans le registre, relève des seules conditions de travail. Action générale. Addendum A5. |
| 100 | `v_637_s1` | 使う | つかう | verbe | Utiliser | action | — | 18 | D1206 | Utiliser un objet, un outil, de l'argent, une langue ou un service : action générale, sans domaine thématique propre ; la fiche réunit ces emplois dans une seule description. Addendum A5. |
| 101 | `v_642_s2` | 出る | でる | verbe | Assister à | action | — | 04 | D0338 | Prendre part à une activité (cours, réunion) : « action générale », sans domaine thématique propre. Addendum A5. |
| 102 | `v_642_s3` | 出る | でる | verbe | Apparaître | evenement | — | 04 | D0339 | Apparaître, devenir visible : « action générale », sans domaine thématique propre. Addendum A5. |
| 103 | `v_646_s1` | 力 | ちから | nom | Force | propriete | — | 20 | D1362 | La force, la puissance, l'énergie : propriété générale, sans domaine thématique propre, comme 強い (lot 17). Addendum A5. |
| 104 | `v_653_s1` | 声 | こえ | nom | Voix | null | — | 20 | D1369 | Aucune catégorie (arbitrage des choix du lot 20) : la proposition rangeait ce sens dans être humain › sens et perception › ouïe. La fiche porte à la fois sur la voix humaine et sur le cri d'un animal ; « ouïe » décrit la perception auditive d'un être humain, non le son que produit une voix ou un animal : la catégorie serait artificielle. Addendum A5. |
| 105 | `v_657_s1` | 女 | おんな | nom | Femme | personne | — | 01 | D0094 | Personne désignée par son sexe : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. |
| 106 | `v_664_s2` | 所 | ところ | nom | Partie | concept_abstrait | — | 20 | D1355 | Un point ou une partie d'une chose ou d'une situation : notion générale, sans domaine thématique propre. Addendum A5. |
| 107 | `v_665_s1` | 持つ | もつ | verbe | Tenir | action | — | 20 | D1310 | Tenir ou porter quelque chose dans ses mains : action générale, sans domaine thématique propre, comme 取る (lot 18). Addendum A5. |
| 108 | `v_665_s2` | 持つ | もつ | verbe | Posséder | etat | — | 20 | D1311 | Posséder un objet ou avoir un sentiment : état général, sans domaine thématique propre. Addendum A5. |
| 109 | `v_667_s1` | 方 | かた | nom | Personne | personne | — | 01 | D0097 | « Personne générique » (forme respectueuse), hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. |
| 110 | `v_671_s1` | 時計 | とけい | nom | Horloge | objet_artefact | — | 05 | D0404 | Aucune catégorie primaire pertinente : 時計 est un instrument qui indique le temps, pas une unité temporelle, et le registre n'a pas de catégorie d'instrument de mesure. Le ranger avec les unités de l'heure ferait d'une proximité fonctionnelle une appartenance (révision 5.6b). Addendum A5. |
| 111 | `v_675_s1` | 次 | つぎ | nom | Suivant | concept_abstrait | — | 20 | D1351 | Aucune catégorie (arbitrage des choix du lot 20) : la proposition rangeait ce sens dans temps › chronologie › succession. La fiche dit explicitement « dans l'ordre, le temps ou l'espace » : classer le sens entier dans le seul domaine du temps serait artificiel, et aucun domaine thématique ne couvre cette généralité. Type concept_abstrait, comme le sens « avant (dans le temps) » de 前 (lot 10). La fiche dit « nom / adjectif en -no » : la classe mécanique est nom, et l'emploi avec の est dit en nuance. Addendum A5. |
| 112 | `v_684_s1` | 物 | もの | nom | Chose | objet_artefact | — | 20 | D1352 | Une chose matérielle, quelle qu'elle soit : nom générique, sans domaine thématique propre. Addendum A5. |
| 113 | `v_685_s1` | 生活 | せいかつ | nom | Mode de vie | concept_abstrait | — | 19 | D1289 | La vie de tous les jours, les conditions d'existence : notion générale, qui n'est le domaine d'aucune catégorie en particulier (ni l'habitat, ni le travail, ni le cycle de vie). Addendum A5. |
| 114 | `v_686_s1` | 男 | おとこ | nom | Homme | personne | — | 01 | D0092 | Personne désignée par son sexe : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4) ; aucune catégorie de sexe ou de genre n'existe. Addendum A5. |
| 115 | `v_687_s1` | 皆さん | みなさん | nom | Tout le monde | groupe_collectif | — | 01 | D0103 | Ensemble de personnes quelconque : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. |
| 116 | `v_691_s1` | 自分 | じぶん | pronom | Soi-même | personne | — | 11 | D0730 | Pronom réfléchi : « personne générique », sans domaine thématique ; pas de fonction deictique (A7 : référence déterminée par la syntaxe, §3.1 ; l'emploi « je », conservé en nuance, ne fait pas partie intégrante du sens modélisé, §4) Addendum A5. |
| 117 | `v_694_s1` | 荷物 | にもつ | nom | Bagage | objet_artefact | — | 05 | D0408 | Aucune catégorie primaire pertinente : 荷物 est ce qui est porté ou transporté, pas une utilisation des transports, et le registre n'a pas de catégorie des bagages ni des marchandises (révision 5.6b). Le type sémantique objet_artefact reste connu. Addendum A5. |
| 118 | `v_700_s1` | 誰か | だれか | pronom | Quelqu'un | personne | — | 11 | D0724 | Personne indéterminée : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4) ; pas de fonction interrogative (誰か n'interroge pas), ni deictique (référent indéterminé, non repéré par la situation d'énonciation, A7) Addendum A5. |
| 119 | `v_709_s1` | 閉める | しめる | verbe | Fermer | action | — | 18 | D1180 | Fermer une porte, une fenêtre, un tiroir ou un couvercle : action générale, sans domaine thématique propre, comme 開ける. Addendum A5. |
| 120 | `v_710_s1` | 開く | あく | verbe | S'ouvrir | evenement | — | 18 | D1169 | Une porte, une fenêtre, un magasin ou un contenant qui s'ouvre : événement général, sans domaine thématique propre ; « portes et fenêtres » ne couvrirait ni le magasin ni le contenant. Addendum A5. |

## Annexe B · Les 27 `type-nul`

| # | SENSE | Mot | Lecture | Classe | Sens | Catégorie | Dimensions | Lot | Décision | Raison journalisée |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_44_s1` | お腹 | おなか | nom | Ventre | etre_humain › corps › tronc | — | 00 | D0070 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne l'être vivant, et la partie n'est pas un type sémantique). Addendum A6. |
| 2 | `v_46_s1` | 体 | からだ | nom | Corps | etre_humain › corps | — | 01 | D0104 | Le corps humain : ni une personne, ni un organisme vivant non humain ; la totalité n'est pas un type sémantique. Addendum A6. |
| 3 | `v_48_s1` | 口 | くち | nom | Bouche | etre_humain › corps › tete_visage | — | 01 | D0121 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 4 | `v_51_s1` | 手 | て | nom | Main | etre_humain › corps › membres | — | 01 | D0127 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 5 | `v_54_s1` | 歯 | は | nom | Dent | etre_humain › corps › tete_visage | — | 01 | D0123 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 6 | `v_57_s1` | 目 | め | nom | Œil | etre_humain › corps › tete_visage | — | 01 | D0115 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 7 | `v_58_s1` | 耳 | みみ | nom | Oreille | etre_humain › corps › tete_visage | — | 01 | D0117 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 8 | `v_60_s1` | 足 | あし | nom | Pied | etre_humain › corps › membres | — | 01 | D0130 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 9 | `v_61_s1` | 身体 | しんたい | nom | Corps | etre_humain › corps | — | 01 | D0106 | Le corps humain : même raison que 体 (n5_v_46). Addendum A6. |
| 10 | `v_65_s1` | 頭 | あたま | nom | Tête | etre_humain › corps › tete_visage | — | 01 | D0109 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 11 | `v_65_s2` | 頭 | あたま | nom | Esprit | etre_humain › psychologie_esprit › pensee | — | 01 | D0110 | Faculté mentale : ni concept abstrait (type jamais de secours), ni propriété ; aucun type terminal ne convient. Addendum A6. |
| 12 | `v_67_s1` | 鼻 | はな | nom | Nez | etre_humain › corps › tete_visage | — | 01 | D0119 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 13 | `v_321_s2` | 時間 | じかん | nom | Heure (durée) | temps › unites_temporelles › seconde_minute_heure | — | 13 | D0926 | Heure, unité de durée : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0) et 匹 (lot 07). Addendum A6. |
| 14 | `v_363_s1` | キロ | きろ | nom | Kilo (kilogramme) | nombres_quantification | — | 00 | D0071 | Kilogramme, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1). Addendum A6. |
| 15 | `v_363_s2` | キロ | きろ | nom | Kilomètre | espace_proprietes_spatiales › distance_proximite | — | 00 | D0072 | Kilomètre, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1). Addendum A6. |
| 16 | `v_364_s1` | キログラム | きろぐらむ | nom | Kilogramme | nombres_quantification | — | 14 | D0954 | Kilogramme, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0). Addendum A6. |
| 17 | `v_366_s1` | メートル | めーとる | nom | Mètre | espace_proprietes_spatiales › dimensions › longueur | — | 14 | D0957 | Mètre, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0). Addendum A6. |
| 18 | `v_500_s2` | また | また | adverbe | Aussi | null | — | 21 | D1403 | Aucun type (arbitrage des choix du lot 21) : la proposition rangeait ce sens en concept_abstrait. La fiche décrit un emploi discursif, qui sert à lier des arguments, à ajouter un élément à ce qui précède ; A2-ST décrit des entités, des occurrences, des conditions et des abstractions, non des fonctions de discours, et concept_abstrait ne doit pas servir de type de secours. Aucun type terminal existant ne décrit correctement ce sens. Le sens reste sans catégorie (D1380) et sans fonction (D1381), connecteur n'ayant pas de définition normative. Addendum A6. |
| 19 | `v_521_s1` | たぶん | たぶん | adverbe | Peut-être | null | probabilite:probabilite | 22 | D1433 | Aucun type : たぶん ne désigne ni une entité, ni une occurrence, ni une condition, ni une abstraction ; il qualifie la probabilité de ce qui est dit. concept_abstrait ne sert pas de type de secours (D1403). Le sens est porté par la dimension probabilité (D1431). Addendum A6. |
| 20 | `v_603_s1` | 髪 | かみ | nom | Cheveux | etre_humain › apparence_presentation_personnelle › coiffure_pilosite | — | 01 | D0124 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 21 | `v_611_s1` | グラム | ぐらむ | nom | Gramme | nombres_quantification | — | 14 | D1008 | Gramme, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0). Addendum A6. |
| 22 | `v_648_s1` | 匹 | ひき | nom | Compteur des petits animaux | nombres_quantification › comptage_compteurs › animaux | — | 07 | D0502 | Unité de comptage : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0). Addendum A6. |
| 23 | `v_653_s1` | 声 | こえ | nom | Voix | null | — | 20 | D1365 | Aucun type : la voix est un son émis par un être vivant, et aucun type du registre A2-ST ne convient à un son (ni objet, ni substance, ni action, ni information). Absence décidée, comme pour les parties du corps (lot 01). Addendum A6. |
| 24 | `v_690_s2` | 背 | せ | nom | Dos | etre_humain › corps › tronc | — | 01 | D0132 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
| 25 | `v_696_s1` | 表 | おもて | nom | Face | espace_proprietes_spatiales › position_localisation › devant_derriere | — | 10 | D0604 | La face d'une chose en est une partie : la partie n'est pas un type sémantique, et aucun type terminal ne convient (comme les parties du corps, lot 01) Addendum A6. |
| 26 | `v_713_s1` | 電気 | でんき | nom | Électricité | sciences › physique › electricite_magnetisme | — | 03 | D0275 | L'électricité, phénomène et forme d'énergie : ni substance, ni objet, ni concept abstrait de secours ; aucun type terminal ne convient. Addendum A6. |
| 27 | `v_716_s1` | 顔 | かお | nom | Visage | etre_humain › corps › tete_visage | — | 01 | D0113 | Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. |
