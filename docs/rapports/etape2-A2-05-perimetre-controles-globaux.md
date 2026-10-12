# Étape 2 · A2-05 · Volet 3 · Contrôles globaux résiduels — périmètre révisé

**Date** : 2026-10-07
**Statut** : **périmètre révisé après l'arbitrage de V1 à V6 (§7), toutes ses questions étant
arbitrées ; non validé. Aucun contrôle n'est commencé.** Aucun fichier de
données, de registre, d'outil, de test ni de reconstruction n'est modifié.
**État du dépôt au relevé** : `ocha-v2` et `origin/ocha-v2` à
`5a8687b063fd2fca7c343d544aff040709bc5ec8`.

**A2-05 a trois volets** (arbitrage du 2026-10-07) :

| Volet | Objet | Périmètre |
|---|---|---|
| 1 | cohérence sémantique rétroactive, axes C1 à C10 | `etape2-A2-05-perimetre-coherence.md` |
| 2 | audit individuel des 147 `null` | `etape2-A2-05-perimetre.md` |
| 3 | contrôles globaux résiduels | ce rapport |

---

## 1. Objet et limites

Ce volet regroupe ce que la `ROADMAP.md` (§6) et les points ouverts d'`ETAT-ACTUEL.md` réservent à
A2-05 et que les deux premiers volets ne couvrent pas.

**Ce que la `ROADMAP.md` demande à A2-05**, et le volet qui le porte :

| Objectif de la `ROADMAP.md` (§6) | Volet |
|---|---|
| relire un échantillon significatif | 3 (G2) ; le volet 1 a son propre échantillon, sur les couches sémantiques |
| vérifier les statistiques du corpus | 3 (G1) |
| rechercher les incohérences entre lots | 1 pour les couches sémantiques ; 3 (G2, G6) pour le reste |
| vérifier les catégories, types, fonctions et tags | 1 et 2 |
| rechercher les doublons ou fusions oubliés | 3 (G3) |
| contrôler les décisions transversales | 1 pour la sémantique ; 3 (G6) pour les listes fermées et les règles d'identité |
| produire un rapport d'audit | un rapport par volet, et une synthèse (§6) |

| Point réservé | Volet |
|---|---|
| tags `lieu_restaurant` du lot 0, cohérence globale des tags de lieu | 1 (C8) |
| stabilité des identifiants de SENSE après la publication | 3 (G4) |
| recoupement des avertissements A5 et A6 avec le journal | 2 |
| audit rétroactif de la deixis temporelle (A7) | 1 (C7) |
| anomalies de données kanji | 3 (G5) |
| anomalies ou décisions transversales découvertes pendant les lots | 1 si elles sont sémantiques, 3 (G6, G7) sinon |

**Ce volet ne décide rien de lexical.** Il constate, compte et signale. Aucune ENTRY n'est rouverte,
aucune fusion n'est décidée, aucune lecture ni graphie n'est ajoutée.

**Hors d'A2-05** : le registre de phrases et les exemples fautifs relevés pendant les lots (tâche
11) ; le graphe (G2 à G9) ; la tâche de données sur le dictionnaire des kanji elle-même.

## 2. Les sept contrôles

Chaque contrôle a sa population et sa question. Aucun n'est mené ici.

### G1 · Statistiques du corpus

**Population** : le corpus publié entier (684 ENTRY, 824 SENSE, 35 identifiants retirés), les
sources figées et le journal.

**Contrôle** : produire, par script, et vérifier :

- la réconciliation des comptes : entrées des sources, ENTRY publiées, identifiants retirés
  (fusions et suppressions), chaque entrée source ayant une destination et une seule ;
- les répartitions : par niveau et par fichier, par classe grammaticale, par nombre de sens, par
  catégorie de niveau 1, par type sémantique, par dimension, par fonction, par tag, par relation ;
- les `null`, par champ et par présence d'une fonction, en accord avec les chiffres des volets 1 et
  2 ;
- l'accord entre l'assemblage, les données publiées, `vocab-retired.json` et l'inventaire des
  avertissements.

**Ce que le rapport signale** : un compte qui ne se réconcilie pas ; une répartition qui révèle une
valeur du registre jamais employée ou employée une seule fois, à titre de constat pour le volet 1.

### G2 · Échantillon significatif d'ENTRY

**Population** : les 684 ENTRY publiées.

**Contrôle** : relire en entier un échantillon d'ENTRY contre leur fiche source, **tous champs
compris** : forme, graphies, lectures et furigana, classe et groupe, `suru_compatible`, `suffix`,
`counter`, découpage en sens, traductions et alternatives, nuances, particules, tags. C'est le seul
contrôle d'A2-05 qui relit les champs non sémantiques.

- **Taille (arbitrage de V1) : 10 % des 684 ENTRY, soit au moins 68.** C'est un plancher, pas un
  plafond.
- **Inclusions contraintes**, d'abord : au moins deux ENTRY par lot d'origine lorsque le lot en
  contient au moins deux ; les strates forcées, c'est-à-dire des ENTRY rouvertes (5.13-C, lot 17,
  lot 26) et des survivantes d'une fusion.
- **Complément stratifié**, ensuite, par classe grammaticale et par nombre de sens, jusqu'à
  atteindre au moins 68.
- Si les inclusions contraintes font dépasser 68, **le dépassement est conservé**.
- Tirage par script, à graine fixe et consignée.
- Distinct de l'échantillon du volet 1, qui porte sur les couches sémantiques des sens non retenus
  par le criblage. Une ENTRY tirée par les deux n'est examinée qu'une fois.

**Ce que le rapport signale** : un écart entre la fiche et l'ENTRY que les décisions du journal
n'expliquent pas. Les champs sémantiques d'une ENTRY tirée sont renvoyés au volet 1 ou au volet 2,
selon le cas, et non jugés ici.

### G3 · Doublons et fusions oubliés

**Population** : les 684 ENTRY, les 35 identifiants retirés, et la liste des « doublons candidats »
d'`ETAT-ACTUEL.md` (points d'audit obligatoires d'A2-04).

**Contrôle** :

- pour chaque paire de la liste des doublons candidats : constater son issue (fusion journalisée,
  ou deux ENTRY distinctes avec leur raison) ;
- recherche par script des paires que cette liste ne contenait pas, comme l'était 温かい / 暖かい :
  même forme ; graphie d'une ENTRY égale à la forme d'une autre ; même lecture et traductions qui se
  recoupent ; formes qui ne diffèrent que par l'écriture (kana et kanji) ;
- contrôle des retraits : chaque identifiant retiré a un successeur existant, ou est l'une des deux
  suppressions sans successeur (`v_717`, `v_602`) ; aucun identifiant retiré n'est référencé.

**Ce que le rapport signale** : une paire candidate, avec les deux fiches en regard. **Il ne décide
aucune fusion** : l'identité lexicale (A3, L2 et L3) s'arbitre cas par cas.

**Arbitrage de V6** : chaque paire candidate nouvelle est arbitrée avant la clôture de l'étape 2, y
compris lorsque l'issue est « deux ENTRY distinctes, aucune fusion ». Aucune ne reste sans issue
écrite.

### G4 · Stabilité des identifiants de SENSE

**Population** : les 824 identifiants de SENSE publiés, et les `retired_sense_ids`.

**Contrôle** :

- unicité et forme des identifiants ; aucun identifiant de sens retiré n'est réemployé ;
- constat de ce qui protège aujourd'hui la règle « réordonner des sens ne doit jamais les
  renuméroter » : d'où vient le numéro d'un sens à l'assemblage et à la publication, et quel test,
  s'il en existe un, échouerait si un sens changeait d'identifiant d'une publication à l'autre ;
- vérification que deux publications successives sans changement de décision donnent les mêmes
  identifiants (la commande `publish` est déjà idempotente).

**Ce que le rapport signale** : l'absence d'une protection, comme un constat. **Aucun outil ni test
n'est modifié dans ce volet.**

**Arbitrage de V3** : si G4 démontre qu'aucun test ne protège la stabilité des identifiants de
SENSE, la protection est ajoutée dans un **chantier d'outillage séparé**, relu et arbitré **avant la
clôture de l'étape 2**.

### G5 · Anomalies de kanji

**Population** : l'avertissement `kanji-inconnu` (醤油, `v_594`), et les cinq clés du dictionnaire
`data/kanji_jouyou_fr.json` qui sont des mots (山羊, 生活, 措置, 継続, 迅速).

**Contrôle** : constater que l'avertissement est toujours émis, sur la même ENTRY, pour la même
raison ; que l'adaptateur du validateur écarte toujours les cinq clés ; qu'aucun autre kanji d'une
forme ou d'une graphie publiée n'est dans ce cas.

**Ce que le rapport signale** : l'état, et son rattachement à la tâche de données sur les kanji.
Rien n'est ajouté au dictionnaire « pour faire taire » l'avertissement.

**Arbitrage de V2** (et de la question Q3 du volet 2) : G5 contrôle ces anomalies exhaustivement et
les rattache à la tâche de données sur les kanji. Elles **ne conditionnent ni la clôture d'A2-05 ni
celle de l'étape 2**, à condition que leur état et leur chantier de destination soient explicitement
documentés.

### G6 · Listes fermées et décisions transversales non sémantiques

**Population** : les listes fermées de `tools/reconstruction/rules.mjs` (`READING_EXCEPTION_IDS`,
`USUAL_FORM_IDS`, `CLASS_EXCEPTION_IDS`, la liste des lectures spéciales d'A8) et les règles
transversales d'identité et de forme arbitrées pendant les lots.

**Contrôle** :

- chaque membre d'une liste fermée est justifié par une décision de journal validée, et aucune
  ENTRY ne bénéficie d'une exception sans y figurer ;
- les règles transversales sont appliquées partout où elles valent : l'invariant des furigana (A8),
  le statu quo des lectures des mots en katakana, « une graphie s'ajoute si la fiche de l'entrée la
  documente », `suru_compatible` établi par la source, `counter` réservé aux ENTRY qui sont des
  compteurs, `suffix`.

**Ce que le rapport signale** : un membre de liste sans décision, ou une règle appliquée dans un lot
et non dans un autre.

### G7 · Points ouverts non sémantiques, à constater

**Population** : les points ouverts d'`ETAT-ACTUEL.md` qui ne relèvent ni de la sémantique ni du
registre de phrases : les fiches « adjectif en na (et nom) », le schéma ne portant qu'une classe ;
le registre des compteurs sans compatibilité pour une durée (時間) ; la lecture うち de 家 ; la
représentation des affixes (色, 方) ; le contrôle d'identité absent du validateur (une graphie d'une
ENTRY égale à la forme d'une autre).

**Cette liste n'est pas figée** (arbitrage de V5). Au moment d'exécuter G7, la confrontation est
refaite avec **tous les points ouverts alors présents dans `ETAT-ACTUEL.md`**, pour vérifier
qu'aucun point non sémantique réservé à A2-05 n'est oublié ; le rapport donne la liste des points
ouverts lus et, pour chacun, le volet ou le chantier qui le porte.

**Contrôle** : pour chacun, constater son état, les ENTRY concernées, et dire s'il conditionne la
clôture de l'étape 2 ou s'il est rattaché à un chantier nommé.

**Ce que le rapport signale** : la liste, avec un rattachement pour chaque point. Aucun n'est
tranché ici : plusieurs demanderaient une évolution du schéma ou un addendum.

## 3. Méthode

- **Par script d'abord** : G1, G3, G4, G5 et G6 sont des contrôles exhaustifs par script, en
  lecture seule ; leurs sorties sont jointes au rapport.
- **Par lecture ensuite** : G2 est une relecture individuelle de l'échantillon ; les paires
  candidates de G3 sont lues fiche contre fiche.
- **La fiche source décide**, sans connaissance externe.
- **Les normes actuelles jugent** : `A2-GLOBAL-v1`, les cinq snapshots spécialisés, le schéma
  `schema-A2-01.md` et les addenda validés (A3 pour l'identité, A8 pour les furigana). Les documents
  de `docs/conception/legacy/a2/` éclairent sans fonder aucun constat à eux seuls.
- **Ce volet ne dépend pas de l'ordre des deux autres** : ses contrôles par script peuvent être
  menés pendant le criblage du volet 1.

## 4. Fichiers susceptibles d'être modifiés

**Pendant les contrôles** : aucun fichier de données, de registre, d'outil, de test ni de
reconstruction. Seulement le rapport du volet, et les documents de suivi.

**Après arbitrage**, s'il retient une correction : la procédure du volet 2 (§7) s'applique pour une
ENTRY (liste fermée, **lot 27 comme lot véhicule d'A2-05, sans ENTRY propre**, réouverture dans le
lot d'origine, décisions nouvelles à la fin du journal, validation atomique, publication par
`publish --write`, inventaire des avertissements resynchronisé par une commande déterministe et
jamais à la main). Une fusion suit en plus A3. Un outil ou un test à modifier, ou le dictionnaire des
kanji, sont des chantiers arbitrés à part.

## 5. Preuves attendues

1. Les sorties des scripts de G1, G3, G4, G5 et G6, avec leurs comptes, reproductibles.
2. La réconciliation complète des comptes de G1, sans reste.
3. L'échantillon de G2 : graine, inclusions contraintes, strates, ENTRY tirées (au moins 68),
   résultat de chaque relecture.
4. Pour G3 : l'issue de chaque paire de la liste des doublons candidats, et la liste des paires
   nouvelles avec le critère qui les a fait ressortir ; **chaque paire nouvelle a une issue
   arbitrée**, fusion ou « deux ENTRY distinctes ».
5. Pour G4 : le constat écrit de la protection existante, ou de son absence ; dans ce second cas, le
   chantier d'outillage est relu et arbitré avant la clôture de l'étape 2.
6. Pour G5 : l'état des anomalies de kanji et leur chantier de destination, explicitement
   documentés.
7. Pour G7 : la liste des points ouverts d'`ETAT-ACTUEL.md` lus au moment du contrôle, et un
   rattachement explicite pour chacun.
8. Aucune modification : `git status` sans changement de données, assemblage et suite de tests
   inchangés.
9. Chaque constat est arbitré : corrigé, maintenu avec sa raison, ou renvoyé à un chantier nommé.

## 6. Livrables d'A2-05

| Rapport | Contenu |
|---|---|
| `docs/rapports/etape2-A2-05-coherence-retroactive.md` | volet 1 |
| `docs/rapports/etape2-A2-05-audit-null.md` | volet 2 |
| `docs/rapports/etape2-A2-05-controles-globaux.md` | volet 3 |
| `docs/rapports/etape2-A2-05.md` | synthèse : les arbitrages rendus sur les trois rapports, les corrections faites, les chantiers nommés auxquels des points sont renvoyés, l'état des preuves de sortie, et **la déclaration finale de sortie d'A2-05** |

**Arbitrage de V4** : `docs/rapports/etape2-A2-05.md` est le rapport de synthèse ; il porte la
déclaration finale de sortie d'A2-05, **après arbitrage explicite**. Cette déclaration suppose, pour
les 147 `null`, la preuve finale du volet 2 : N = 0 et L + F + C = 147.

## 7. Questions posées et arbitrages rendus

Les six questions sont gardées dans leur formulation d'origine, chacune suivie de l'arbitrage rendu
le 2026-10-07 (ChatGPT, par délégation). Le corps du rapport est révisé en conséquence.

- **V1 · Taille de l'échantillon de G2.** Proposition : 10 % des ENTRY, soit environ 68, avec au
  moins deux ENTRY par lot d'origine et toutes les strates représentées. La même question se pose
  pour l'échantillon de contrôle du volet 1.
  - **Arbitrage** : 10 % des 684 ENTRY, soit au moins 68. Au moins deux ENTRY par lot lorsque le
    lot en contient au moins deux ; les strates forcées (ENTRY rouvertes, survivantes de fusion)
    incluses, puis un complément stratifié par classe et par nombre de sens. Si les inclusions
    contraintes font dépasser 68, le dépassement est conservé : 68 est un plancher, pas un plafond
    (§2, G2). L'échantillon du volet 1 est fixé à part, dans son périmètre.
- **V2 · Anomalies de kanji.** Proposition : constatées, non modifiées, rattachées à la tâche de
  données ; elles ne conditionnent pas la clôture de l'étape 2. C'est la question Q3 du volet 2,
  reprise ici.
  - **Arbitrage : accepté.** G5 les contrôle exhaustivement et les rattache à la tâche de données
    sur les kanji ; elles ne conditionnent ni la clôture d'A2-05 ni celle de l'étape 2 si leur état
    et leur chantier de destination sont explicitement documentés (§2, G5).
- **V3 · Protection des identifiants de SENSE.** Si G4 constate qu'aucun test ne protège la règle,
  faut-il l'ajouter avant la clôture de l'étape 2 ? Proposition : oui, comme chantier d'outillage
  séparé, arbitré sur le constat.
  - **Arbitrage : accepté.** La protection est ajoutée dans un chantier d'outillage séparé, relu et
    arbitré avant la clôture de l'étape 2 (§2, G4).
- **V4 · Rapport de synthèse d'A2-05** (§6). Proposition : un rapport `etape2-A2-05.md`, qui porte
  la déclaration de sortie.
  - **Arbitrage : accepté.** Il porte la déclaration finale de sortie d'A2-05, après arbitrage
    explicite (§6).
- **V5 · Périmètre de G7.** La liste des points ouverts à constater est-elle la bonne, ou certains
  relèvent-ils d'un autre chantier dès maintenant ?
  - **Arbitrage** : la liste actuelle est acceptée, mais elle n'est pas figée. À l'exécution de G7,
    la confrontation est refaite avec tous les points ouverts alors présents dans `ETAT-ACTUEL.md`
    (§2, G7).
- **V6 · Paires de G3.** Une paire candidate nouvelle doit-elle être arbitrée avant la clôture de
  l'étape 2 ? Proposition : oui, chacune, puisque l'unicité des unités lexicales est une règle
  d'A3.
  - **Arbitrage : accepté.** Chaque paire candidate nouvelle est arbitrée avant la clôture de
    l'étape 2, y compris lorsque l'issue est « deux ENTRY distinctes, aucune fusion » (§2, G3).

**Arbitrages communs aux trois volets**, appliqués au §4 : le lot 27 comme lot véhicule d'A2-05 ;
l'inventaire des avertissements resynchronisé par une commande déterministe, jamais à la main.

**Toutes les questions de ce périmètre sont arbitrées.**

**Aucun contrôle n'est commencé avant la validation de ce périmètre.**
