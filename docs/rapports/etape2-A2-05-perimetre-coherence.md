# Étape 2 · A2-05 · Volet 1 · Cohérence sémantique rétroactive des lots — périmètre révisé

**Date** : 2026-10-07
**Statut** : **périmètre révisé une seconde fois après les arbitrages du 2026-10-07 (§10), toutes
ses questions étant arbitrées ; non validé. Le contrôle n'est pas commencé.** Aucune décision n'est réexaminée, aucune ENTRY n'est rouverte, aucun fichier de
données, de registre, d'outil ou de test n'est modifié.
**Préalables** : ce contrôle ne commence qu'après la relecture et la validation du rangement
documentaire d'A2 et des trois périmètres d'A2-05.

**A2-05 a trois volets** (arbitrage du 2026-10-07) :

| Volet | Objet | Périmètre |
|---|---|---|
| 1 | cohérence sémantique rétroactive, axes C1 à C10 | ce rapport |
| 2 | audit individuel des 147 `null` | `etape2-A2-05-perimetre.md` |
| 3 | contrôles globaux résiduels (statistiques, échantillon, doublons et fusions, stabilité des SENSE, kanji, autres réservations) | `etape2-A2-05-perimetre-controles-globaux.md` |
**État du dépôt au relevé** : `ocha-v2` et `origin/ocha-v2` à
`5a8687b063fd2fca7c343d544aff040709bc5ec8`.

---

## 1. Objet et limites

Vérifier que les décisions prises pendant les lots 0 à 26 restent cohérentes avec l'architecture A2
finale, maintenant que `A2-GLOBAL-v1` et les documents historiques sont dans le dépôt.

**Ce n'est pas** une nouvelle passe sur chaque lot, ni une relecture de toutes les ENTRY depuis
zéro. Les questions d'identité (fusions, graphies, lectures, furigana), de classe grammaticale et de
rédaction des traductions ne sont pas dans ce volet : celles qu'A2-05 doit contrôler relèvent du
volet 3.

**Le rapport ne signale que cinq sortes d'écarts** :

| Code | Écart |
|---|---|
| E1 | contradiction avec une norme finale |
| E2 | justification devenue obsolète |
| E3 | application incohérente entre lots |
| E4 | décision qui reposait sur une compréhension incomplète de l'architecture |
| E5 | point réellement non documenté |

**Priorité entre les codes : un écart reçoit un seul code, le premier qui s'applique dans cet
ordre.**

1. **E1** dès qu'un texte final (snapshot, addendum validé) ou un arbitrage transversal applicable
   est contredit par la donnée publiée. C'est le code de la non-conformité, quelle qu'en soit
   l'origine.
2. **E2** si la donnée est conforme aux normes actuelles, mais que la raison journalisée invoque une
   règle remplacée depuis, ou l'absence d'une règle qui existe aujourd'hui. L'écart porte sur la
   justification, non sur la valeur.
3. **E3** si deux traitements comparables restent réellement contradictoires **sans** que les normes
   actuelles ni un arbitrage transversal déterminent lequel prévaut. Quand une norme ou un arbitrage
   tranche, il s'applique : l'écart est alors un E1 ou un E2, pas un E3.
4. **E4** seulement si aucun des trois premiers ne s'applique : la donnée ne contredit aucune norme,
   sa justification n'est pas périmée, aucun traitement comparable ne la contredit, mais la décision
   a été prise sans un élément de l'architecture qui était pourtant écrit (par exemple une section
   d'`A2-GLOBAL-v1` non disponible dans le dépôt). E4 n'est jamais un qualificatif ajouté à un E1,
   un E2 ou un E3 : l'origine d'un écart se dit dans sa description, pas dans son code.
5. **E5** si les normes actuelles ne permettent pas de trancher. Un E5 ne désigne aucune donnée
   comme fautive, et ne la déclare pas non plus conforme : il est rattaché à un chantier normatif
   nommé. Un E5 peut rester renvoyé à ce chantier **seulement si cela n'empêche aucune des
   conditions de sortie concernées**. Deux cas ne le peuvent pas :
   - lorsqu'il porte sur l'un des 147 `null`, il prend au volet 2 le statut provisoire **N**, qui
     doit être résolu puis reclassé avant la déclaration finale de conformité des 147 ;
   - l'E5 commun de la fonction `interrogatif` (§4), déjà attribuée à 17 sens : son chantier
     normatif doit aboutir avant la clôture de l'étape 2.

Cette règle de priorité a été **validée telle que rédigée** (arbitrage du 2026-10-07).

Une décision conforme n'est pas commentée : le rapport en donne seulement le compte.

**Aucune réouverture automatique.** Le contrôle produit un rapport ; les écarts sont soumis à
l'arbitrage avant toute correction.

## 2. Ce qui a changé pendant la construction

Le contrôle part d'un constat de dates, vérifié dans le dépôt.

**L'architecture A2 elle-même n'a pas changé pendant les lots.** Les six snapshots sont datés du
2026-10-01 ; les registres en ont été transcrits le 2026-10-02 (A2-02), avant le lot 0. Aucun
snapshot n'a été modifié depuis.

**Ce qui a évolué, ce sont les règles d'application d'Ocha** :

| Date | Évolution | Lots décidés avant |
|---|---|---|
| 2026-10-02 | addendum A5 (`category: null` pour un sens lexical) | aucun (né avec le lot 0) |
| 2026-10-02 | addendum A6 (`semantic_type: null`) | aucun (né avec le lot 0) |
| 2026-10-02 | critère des tags de lieu formalisé à la révision du lot 02 | lot 0, lot 01 |
| 2026-10-04 | addendum A7 (`deictique`) | lots 0 à 10 |
| 2026-10-05 | « un axe d'A2-DIM est employé lorsqu'il décrit directement le sens » (lot 16) | lots 0 à 15 |
| 2026-10-06 | « aucune fonction linguistique sans définition normative » (lot 20) | lots 0 à 19 |
| 2026-10-06 | addendum A9 (six fonctions) | lots 0 à 22 |
| 2026-10-07 | relations posées à la passe finale (lot 26) | lots 0 à 25 |

**Et un fait de documentation** : `A2-GLOBAL-v1` n'était pas dans le dépôt pendant les lots. Il a
été cité depuis une copie extérieure (lot 0, lot 11), et les lots ont travaillé sur les cinq
snapshots spécialisés et les registres. Les documents historiques (stress-test, reprise d'audit)
n'étaient pas disponibles non plus.

## 3. Population, relevée sur le dépôt

Relevé par script, en lecture seule, sur les données publiées et le journal.

**Le corpus** : 684 ENTRY, 824 SENSE ; 1 613 décisions de journal, toutes validées (D0001 à D1613).

| Couche | SENSE concernés | Décisions de journal sur le champ |
|---|---|---|
| `category` non nulle | 649 (29 niveaux 1 employés sur 32) | 148 sur `category` |
| `category: null` | 175 (120 sans fonction, 55 avec) | dont 120 `categorie-nulle` |
| `semantic_type` non nul | 726 | 103 sur `semantic_type` |
| `semantic_type: null` | 98 (27 sans fonction, 71 avec) | dont 98 `type-nul` |
| `dimensions` | 13 | 10 |
| `relations` | 21 (22 liens, tous posés au lot 26) | 42 |
| fonctions linguistiques | 94 | 138 |
| tags | 42 ENTRY et 3 SENSE | 175 |

**Une précision de méthode** : la catégorie et le type de la plupart des sens ne sont pas décidés
par une décision à part. Ils sont portés par les 737 décisions de champ `senses`, qui fixent le
découpage d'une entrée et la description de ses sens d'un seul bloc. La population du contrôle ne
se réduit donc pas aux décisions dont le champ nomme une couche : elle se définit sur les SENSE.

**Les décisions qui citent une norme dans leur raison** : 431 citent un snapshot ou l'un des addenda
A5, A6, A7 ou A9.

| Norme citée | Décisions |
|---|---|
| `A2-GLOBAL` | 8 (toutes « §4.4 », toutes `categorie-nulle`) |
| `A2-ST` | 40 |
| `A2-LING` | 31 |
| `A2-REL` | 20 |
| `A2-DIM` | 14 |
| `A2-L3` | 0 |
| A5 | 155 |
| A6 | 99 |
| A7 | 114 |
| A9 | 91 |

Au total, 660 décisions touchent une des couches par leur champ, leur nature ou leur raison.

## 4. Les dix axes du contrôle

Chaque axe a sa population, ses normes et sa question. Aucun n'est tranché ici.

| # | Axe | Population | Normes applicables |
|---|---|---|---|
| C1 | **Catégories posées** : la catégorie décrit-elle le concept, et non son contexte d'usage ou sa forme ? Deux sens comparables ont-ils la même ? | 649 sens | A2-L3 §2, §5, §7 ; A2-GLOBAL §4.1, §4.3, §11 |
| C2 | **`category: null`** portés par une fonction : la fonction justifie-t-elle effectivement l'absence de catégorie, selon A5 ? Elle ne le peut que si elle est elle-même **définie normativement et applicable** au sens (A7, A9). | 55 sens | A2-GLOBAL §4.4, §10 ; A5 ; A7 ; A9 |
| C3 | **Types posés**. Les 95 `concept_abstrait` sont **tous examinés individuellement**, fiche source entière et exemple compris : A2-ST interdit d'en faire un type de secours. | 726 sens, dont 95 `concept_abstrait` | A2-ST §3, §4, §5 ; A2-GLOBAL §5.3 |
| C4 | **`semantic_type: null`** sur un sens qui porte une fonction. **La fonction ne justifie pas le `null` par elle-même** : A6 exige qu'aucun type terminal d'A2-ST ne décrive correctement la nature du sens. La question est donc celle d'A6, posée pour chacun de ces sens. | 71 sens | A2-ST §3, §4 ; A6 |
| C5 | **Dimensions** : posées quand l'axe décrit directement le sens ; absentes ailleurs pour la même raison ? | 13 sens posés, et les sens comparables sans dimension | A2-DIM §2 à §5, §7 ; A2-GLOBAL §6 |
| C6 | **Relations** : type, sens porteur, symétrie ; candidates journalisées et non posées | 22 liens, 42 décisions | A2-REL-v1.1 ; A2-GLOBAL §7 ; I12 |
| C7 | **Fonctions linguistiques** : appliquées sens par sens selon A7 et A9 ; sens des lots antérieurs à ces addenda | 94 sens, 138 décisions | A2-LING §4, §5 ; A2-GLOBAL §8 ; A7 ; A9 |
| C8 | **Tags** : critère de l'association caractéristique, appliqué de la même façon avant et après sa formalisation | 45 porteurs, 175 décisions | `registre-des-tags.md` ; addendum de liaison, D2 |
| C9 | **Décisions citant `A2-GLOBAL`** : la citation est-elle exacte, maintenant que le texte est lisible ? | 8 décisions, et les citations des addenda et rapports | A2-GLOBAL |
| C10 | **Justifications datées** : une raison invoque-t-elle une règle remplacée depuis, ou l'absence d'une règle qui existe aujourd'hui ? | les 431 décisions citant une norme, lues par date (§2) | toutes |

**Répartition des `null`** (arbitrage du 2026-10-07) :

| Population | Volet |
|---|---|
| 120 `category: null` sans fonction, 27 `semantic_type: null` sans fonction | volet 2, les 147 |
| 55 `category: null` avec fonction | volet 1, axe C2 |
| 71 `semantic_type: null` avec fonction | volet 1, axe C4 |

**Fonction `interrogatif`** (axe C7, arbitrage de R3). Elle est posée sur 17 sens et n'a aucune
définition normative ; A9 constate lui-même qu'elle est appliquée sur un sens implicite. Ces 17
annotations ne sont pas fautives pour autant. Le rapport constate **un E5 normatif commun**, recense
les 17 sens, et n'invente aucune définition. **Cet E5 ne peut pas rester non résolu à la clôture de
l'étape 2**, la fonction étant déjà attribuée à 17 sens : il est porté par un **chantier normatif
séparé**, explicitement arbitré, avec un addendum validé conformément à la gouvernance. Ce chantier
**doit aboutir avant la clôture de l'étape 2** ; les 17 annotations sont ensuite **contrôlées contre
la définition obtenue**. Si `interrogatif` conditionne en plus l'un des 147 `null`, ce cas est un N
du volet 2, à résoudre de toute façon avant la déclaration finale des `null`.

**Points sémantiques déjà réservés à A2-05**, rattachés à ces axes : tags de lieu du lot 0 (C8) ;
deixis temporelle de おととし, 近く, 前, 先 (C7) ; fonctions d'A9 sur les sens validés avant lui, dont
また, sens 2 (C7) ; catégories de メートル et de キロ (C1) ; extensions conservées en nuance au lot 15
(C1, C5). **Ces dix axes ne couvrent pas tout A2-05** : les statistiques, l'échantillon significatif,
les doublons et fusions oubliés, la stabilité des identifiants de SENSE et les anomalies de kanji
relèvent du volet 3.

## 5. Méthode

Le contrôle se fait en deux temps, suivis d'un échantillon de contrôle, pour ne pas relire 824 sens
un par un. Les 431 décisions qui citent une norme ne sont pas examinées une à une : leurs citations
sont vérifiées mécaniquement, et seules celles que le criblage retient deviennent des candidats.

**Temps 1 · Criblage exhaustif, par script et par lecture groupée.** Tous les sens et toutes les
décisions de la population sont passés au crible, sans jugement individuel :

- regroupement des sens par valeur (même catégorie, même type, même dimension, même fonction, même
  tag) et par raison journalisée, pour faire apparaître les sens comparables traités différemment ;
- relevé des raisons qui citent une norme, classées par norme et par date ;
- relevé des sens décidés avant une règle (§2) et que cette règle pourrait concerner ;
- vérification mécanique des citations (numéro de section, texte cité) contre les snapshots.

Le criblage produit une **liste de candidats**. D'un sens qui n'y entre pas, le rapport dit
seulement : **« aucun écart détecté par le criblage »**. Ce n'est pas une déclaration de cohérence.

Entrent d'office dans les candidats, quel que soit le résultat du criblage : les 95 sens
`concept_abstrait` (C3), les 55 sens de C2 et les 71 sens de C4.

**Temps 2 · Examen individuel des candidats.** Pour chaque candidat, et pour lui seul, la
confrontation demandée, dans cet ordre :

1. la fiche source entière, exemple compris, et le sens réellement traité ;
2. la décision historique du journal, et les décisions voisines de la même entrée ;
3. les snapshots finaux applicables : `A2-L3-v1`, `A2-ST-v1`, `A2-DIM-v1`, `A2-REL-v1.1`,
   `A2-LING-v1`, `A2-GLOBAL-v1` ;
4. les addenda Ocha validés (A3, A5, A6, A7, A9) et les doctrines arbitrées ;
5. les décisions comparables prises dans les autres lots.

Chaque candidat reçoit l'un des cinq codes d'écart, selon la règle de priorité du §1, ou « sans
écart » avec sa raison.

**Temps 3 · Échantillon de contrôle parmi les non-candidats.** Le criblage est lui-même contrôlé,
conformément à l'objectif « relire un échantillon significatif » de la `ROADMAP.md` (§6) :

- **taille : 10 % des sens non candidats, avec un minimum de 50 sens** ;
- l'échantillon est **stratifié** par lot d'origine, par classe grammaticale et par couche
  contrôlée (catégorie, type, dimension, fonction, tag). Il n'est pas nécessaire de représenter
  toutes les combinaisons croisées de strates ;
- le tirage est fait par script, à graine fixe et consignée, pour être reproductible ;
- chaque sens tiré reçoit l'examen individuel du temps 2 ;
- **si l'échantillon révèle un cas que le criblage aurait dû détecter, le critère de criblage est
  révisé et la population concernée est repassée au crible** ; le rapport consigne le critère
  d'origine, le cas qui l'a mis en défaut et le critère révisé.

La population de référence est celle des non-candidats à l'issue du temps 1 ; son effectif exact, et
donc celui de l'échantillon, sont donnés dans le rapport avec la graine.

**Règle des divergences entre lots** (arbitrage de R5). Lorsqu'une norme actuelle ou un arbitrage
transversal applicable tranche la divergence, il s'applique, et l'écart est un E1 ou un E2. E3, sans
désignation d'un traitement qui prévaut, n'est employé que lorsque deux traitements comparables
restent réellement contradictoires sans que les normes actuelles déterminent lequel prévaut.

**Règles de lecture** :

- **Les normes actuelles jugent ; les documents historiques éclairent.** Un document de
  `docs/conception/legacy/a2/` peut expliquer d'où vient une décision ; il ne fonde aucun écart à lui
  seul, et aucune règle n'en est tirée.
- **La fiche source décide** : aucun sens ni emploi ajouté par connaissance externe.
- **Un arbitrage rendu n'est pas un écart en soi.** Un choix arbitré explicitement pendant un lot
  n'est signalé que s'il contredit un texte final (E1) ou un arbitrage comparable (E3).
- **Aucune norme n'est créée.** Un manque de la norme est un E5, pas une occasion de la compléter.
- **L'objectif n'est pas de réduire les avertissements** ni d'uniformiser pour uniformiser : deux
  sens proches peuvent différer si leurs fiches diffèrent.

## 6. Articulation des trois volets

| Volet | Population | Unité de revue |
|---|---|---|
| 1 · Cohérence sémantique (ce rapport) | 824 sens, 660 décisions | criblage exhaustif, examen individuel des candidats, échantillon de contrôle |
| 2 · Audit des `null` | 147 avertissements | chaque cas, individuellement |
| 3 · Contrôles globaux résiduels | le corpus entier | contrôles par script, échantillon, constats |

**Ordre arbitré** (R4) :

1. criblage de cohérence (temps 1 de ce volet) ;
2. audit individuel des 147 `null` (volet 2), en utilisant les familles de sens comparables
   révélées par le criblage ;
3. examen individuel des autres candidats du contrôle de cohérence (temps 2 et 3 de ce volet) ;
4. arbitrage global des rapports.

**Un même cas n'est audité individuellement qu'une fois.** Un sens des 147 est audité au volet 2 ;
le volet 1 le prend comme point de comparaison (C1, C3) et reçoit son verdict. Un sens tiré à la
fois par deux échantillons, ou candidat de deux axes, reçoit un seul examen, reporté dans chaque
rapport qui le concerne.

Le volet 3 ne dépend pas de cet ordre : ses contrôles par script peuvent être menés en parallèle,
et son échantillon est distinct de celui du temps 3 (il porte sur l'ENTRY entière, non sur les
seules couches sémantiques).

## 7. Livrable et suite

**Livrable** : `docs/rapports/etape2-A2-05-coherence-retroactive.md`, avec :

- le compte des sens et des décisions criblés, par axe ;
- les critères de criblage, tels qu'appliqués, et leurs révisions éventuelles ;
- la liste des candidats, et pour chacun les cinq confrontations et son code ;
- l'échantillon de contrôle : graine, strates, sens tirés, résultat de chaque examen ;
- les écarts regroupés par code (E1 à E5), puis par lot ;
- la liste des points non documentés (E5), à part ;
- **aucune correction, aucune valeur proposée d'office** : pour un E1 ou un E3, le rapport dit ce
  que la norme ou le précédent demanderait, et laisse l'arbitrage décider.

**Suite**, après arbitrage seulement : les corrections retenues suivent la procédure du périmètre
des `null` (§7) : liste fermée, **lot 27 comme lot véhicule d'A2-05, sans ENTRY propre**,
réouverture de l'ENTRY dans son lot d'origine, décisions nouvelles à la fin du journal, validation
atomique, publication par `publish --write`, inventaire des avertissements resynchronisé par une
commande déterministe et jamais à la main, puis commit et push sur des accords distincts.

## 8. Fichiers susceptibles d'être modifiés

**Pendant le contrôle** : aucun fichier de données, de registre, d'outil, de test ni de
reconstruction. Seulement le rapport de cohérence, et les documents de suivi.

**Jamais dans ce contrôle** : les snapshots et `docs/conception/` (verrouillés), `data/registries/`,
les sources figées, `src/`. Une lacune de la norme se signale (E5) ; elle ne se corrige que par un
addendum arbitré à part.

## 9. Preuves attendues

1. **Exhaustivité du criblage** : les 824 sens et les 660 décisions sont tous passés au crible,
   compte à l'appui, par script.
2. **Traçabilité des candidats** : pour chaque candidat, le critère de criblage qui l'a fait
   entrer.
3. **Cinq confrontations** écrites pour chaque candidat, avec la section de norme citée.
4. **Vérification des citations** : chaque citation d'un snapshot dans une raison de journal est
   confrontée au texte ; le résultat est donné pour toutes, exactes comprises.
5. **Échantillon de contrôle** : effectif des non-candidats, taille de l'échantillon (10 %, au
   moins 50), graine, strates ; chaque sens tiré examiné ; et la preuve que tout cas mis au jour a
   conduit à réviser le critère et à repasser la population concernée.
6. **Un seul code par écart**, attribué selon la règle de priorité du §1.
7. **Aucune modification** : `git status` sans changement de données, assemblage et suite de tests
   inchangés.
8. **Arbitrage** : chaque écart est tranché explicitement (corrigé, maintenu avec sa raison, ou
   renvoyé à un chantier nommé). Aucun ne reste en attente à la clôture de l'étape 2. Un E5 peut
   rester renvoyé à un chantier normatif nommé seulement si cela n'empêche aucune des conditions de
   sortie concernées (§1). Deux E5 ne peuvent pas rester renvoyés :
   - **un E5 qui porte sur l'un des 147 `null`** : c'est un N du volet 2, à résoudre et à reclasser
     avant la déclaration finale (N = 0) ;
   - **l'E5 commun de la fonction `interrogatif`** : son chantier normatif a abouti avant la clôture
     de l'étape 2, et les 17 annotations ont été contrôlées contre la définition obtenue ; le
     rapport de synthèse en donne la preuve.

## 10. Questions posées et arbitrages rendus

Les six questions sont gardées dans leur formulation d'origine, chacune suivie de l'arbitrage rendu
le 2026-10-07 (ChatGPT, par délégation). Le corps du rapport est révisé en conséquence.

- **R1 · Méthode en deux temps.** Le criblage exhaustif suivi d'un examen individuel des seuls
  candidats répond-il à la demande, ou faut-il un examen individuel d'une population plus large
  (par exemple les 431 décisions qui citent une norme) ?
  - **Arbitrage : accepté avec modification.** Criblage exhaustif puis examen individuel des
    candidats ; les 431 décisions citant une norme ne sont pas examinées une à une. « Réputé
    cohérent » est remplacé par « aucun écart détecté par le criblage ». Un échantillon de contrôle
    stratifié est ajouté parmi les non-candidats ; s'il révèle un cas que le criblage aurait dû
    détecter, le critère est révisé et la population concernée repassée (§5).
- **R2 · `concept_abstrait`** (95 sens). Proposition : examen individuel de tous, puisque A2-ST
  interdit d'en faire un type de secours ; c'est la plus grosse population à relire une par une.
  - **Arbitrage : accepté.** Les 95 sens sont examinés individuellement, fiche source entière et
    exemple compris (§4, C3).
- **R3 · Fonctions non définies.** `interrogatif` est posé sur 17 sens sans définition normative.
  Proposition : constater (E5), sans préalable normatif dans A2-05.
  - **Arbitrage : modifié.** Les 17 annotations ne sont pas automatiquement fautives. Le rapport
    constate un E5 normatif commun, recense les 17 sens et n'invente aucune définition. Le point ne
    reste pas simplement ouvert à la clôture de l'étape 2 : il est renvoyé à un chantier normatif
    séparé (addendum), qui permettra ensuite de contrôler les annotations existantes (§4).
  - **Précision arbitrée ensuite** : cet E5 ne peut pas rester non résolu à la clôture de l'étape 2.
    Le chantier normatif séparé doit aboutir avant cette clôture, puis les 17 annotations sont
    contrôlées contre la définition obtenue (§1, §4, §9).
- **R4 · Ordre des volets.** Cohérence d'abord, puis `null`, arbitrés ensemble (§6) ; ou l'inverse.
  - **Arbitrage : accepté, ordre précisé.** Criblage de cohérence ; audit individuel des 147
    `null` ; examen individuel des autres candidats ; arbitrage global. Un même cas n'est audité
    individuellement qu'une fois (§6).
- **R5 · Précédents contradictoires.** Quand deux lots ont arbitré différemment deux cas
  comparables, le rapport signale E3 sans dire lequel prévaut. À confirmer.
  - **Arbitrage : accepté avec précision.** Quand une norme actuelle ou un arbitrage transversal
    applicable tranche, il s'applique, et l'écart relève de E1 ou de E2. E3 sans désignation n'est
    employé que si les normes actuelles ne déterminent pas le traitement qui prévaut (§1, §5).
- **R6 · Rattachement des points réservés** (§4) aux axes, plutôt qu'un périmètre séparé : cela
  remplacerait la question Q1 du périmètre des `null`.
  - **Arbitrage : refusé en l'état.** Les dix axes ne couvrent pas tout A2-05 : la `ROADMAP.md`
    exige aussi un échantillon significatif, des statistiques du corpus, la recherche de doublons
    et de fusions oubliés, la stabilité des identifiants de SENSE et le traitement des anomalies de
    kanji, et le §1 exclut l'identité et les fusions. A2-05 est structuré en trois volets ; ces
    points forment le volet 3.

**Arbitrages complémentaires du même jour**, appliqués au §1 et au §4 : la répartition des `null`
entre le volet 2, C2 et C4 ; la reformulation de C4 (une fonction ne justifie pas par elle-même
`semantic_type: null`) ; la condition de C2 (une fonction définie et applicable normativement) ; la
règle de priorité entre E1 et E5, **validée telle que rédigée**.

**Arbitrages de la seconde révision** :

- **Échantillon de contrôle** : 10 % des sens non candidats, avec un minimum de 50 sens ; tirage
  reproductible à graine fixe ; stratifié par lot d'origine, classe grammaticale et couche
  contrôlée, sans obligation de représenter toutes les combinaisons croisées ; la règle de reprise
  du criblage en cas de faux négatif reste telle qu'elle est (§5).
- **E5 et statut N** : un E5 portant sur l'un des 147 prend au volet 2 le statut provisoire N (§1,
  §9).
- **Véhicule des corrections** : le lot 27 (§7).

**Toutes les questions de ce périmètre sont arbitrées.**

**Aucun contrôle n'est commencé et aucune décision n'est réexaminée avant la validation de ce
périmètre.**
