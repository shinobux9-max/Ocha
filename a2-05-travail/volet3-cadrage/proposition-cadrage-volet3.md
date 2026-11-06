# Étape 2 · A2-05 · Volet 3 · Contrôles globaux G1 à G7 — proposition de cadrage

**Date** : 2026-11-05.
**Statut** : **proposition, non arbitrée.** Elle cadre l'exécution du volet 3. Elle n'exécute aucun contrôle et n'ouvre ni HP-1 à HP-4, ni QC-1, ni QC-2. Elle ne prépare pas l'application des 204 corrections retenues. Elle ne crée aucune règle.
**Ce qui n'est pas modifié** : les données lexicales, les lots, le journal, les registres, les snapshots, les normes, l'inventaire des avertissements, les outils et les tests. Aucune décision historique n'est touchée. Rien n'est indexé, committé ni poussé.
**Référence** : `HEAD` et `origin/ocha-v2` sont à `39cce13`.

**Comment lire ce document.** Chaque énoncé porte une marque :
- **[D]** : une exigence documentée, avec sa source. Je la reprends sans la modifier.
- **[P]** : une proposition déjà écrite dans un document, mais jamais arbitrée. Je la cite comme telle.
- **[R]** : ma recommandation d'organisation. Elle n'a aucune force tant qu'elle n'est pas arbitrée.
- **[relevé de cadrage]** : un constat que je fais en lisant le dépôt pour ce cadrage. Ce n'est ni une exigence ni un résultat de contrôle, et il est à vérifier à l'exécution.

Là où un texte ne tranche pas, je ne tranche pas non plus : la question est posée au §8.

---

## 1. Sources lues, et leur statut

| Document | Ce qu'il fixe pour le volet 3 | Statut |
|---|---|---|
| `docs/rapports/etape2-A2-05-perimetre-controles-globaux.md` (2026-10-07) | le périmètre des sept contrôles, la méthode, les preuves, les arbitrages V1 à V6 | arbitré (V1 à V6) ; périmètre « validé » selon les documents de pilotage (voir §2.1) |
| `docs/rapports/etape2-A2-05-perimetre.md`, §7 à §9 (volet 2) | la procédure de correction (lot 27, réouverture, publication) ; la règle de l'inventaire après correction (Q7) ; les preuves de sortie des 147 `null` | arbitré (Q6, Q7 et le reste du §11) |
| `docs/rapports/etape2-A2-05-perimetre-coherence.md` (volet 1) | le temps 3, l'échantillon des non-candidats ; un échantillon commun aux deux volets n'est examiné qu'une fois | arbitré |
| `docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md`, statut | C6 et C9 : un rapport séparé de conclusion du criblage, « distinct de G1 à G7 » | arbitré le 2026-10-12 |
| `docs/rapports/etape2-A2-05-bilan-volet2.md`, §4 et §5 | une table d'état et de dépendances de G1 à G7, et un ordre en trois phases (A, B, C) | **proposition non arbitrée** (en-tête du bilan, précision du 2026-10-12) |
| `docs/rapports/etape2-A2-05-bilan-volet2.md`, §8.35, §8.43 et §8.49 | HP-1 à HP-4, QC-1, QC-2 | consignées ; chaque cadre reste à proposer |
| `ETAT-ACTUEL.md` (« Étape en cours », « Points ouverts ») et `ROADMAP.md`, §5, §6 et §9 | le point de sortie des 120 et des 27 ; la vérification après correction ; la prochaine action ; les conditions de clôture de l'étape 2 | documents de pilotage |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-cloture.md` | la clôture de la recherche d'omissions : 234 candidats, aucune omission, 573 sens non vérifiés | arbitré et inscrit le 2026-11-05 |

**État réel relevé pour ce cadrage**, en lecture seule. Ces relevés mesurent seulement la taille des populations ; ils ne sont pas les contrôles G1 à G7.
- `node tools/reconstruction/run.mjs assemble` rend le code 0.
- `data/` contient **684 ENTRY et 824 SENSE** ; `vocab-retired.json`, **35 identifiants**.
- L'inventaire `avertissements-connus.json` compte **148 avertissements** : 120 `categorie-nulle`, 27 `type-nul` et 1 `kanji-inconnu`.
- `rules.mjs` contient quatre listes fermées :

  | Liste | Membres |
  |---|---|
  | `CLASS_EXCEPTION_IDS` | 52 |
  | `USUAL_FORM_IDS` | 2 |
  | `READING_EXCEPTION_IDS` | 2 |
  | `SPECIAL_READING_IDS` (liste A d'A8) | 5 |

- La liste des doublons candidats d'`ETAT-ACTUEL.md` compte 27 groupes.
- `registre-tranches.json` : T1 à T9 et F sont toutes « planifiée ».
- Le relais `--apres-application` rend 29 conformes sur 30. Le seul écart est C9b : `docs/conception/00-sommaire.md` est modifié, et l'addendum A10 n'est pas suivi par Git.

Ces nombres sont ceux que le périmètre de 2026-10-07 suppose : 684, 824, 35, 120, 27, et le seul `kanji-inconnu` 醤油. Les populations n'ont donc pas bougé depuis le commit `3d67594`.

## 2. Trois points documentaires, relevés sans être corrigés

### 2.1 Le statut du périmètre du volet 3

- L'en-tête du rapport de périmètre dit « **non validé** ».
- `ETAT-ACTUEL.md`, ligne 20, `ROADMAP.md`, ligne 611, et le bilan du volet 2, ligne 8, disent « trois volets, aux périmètres **validés** le 2026-10-07 ». Le checkpoint documentaire classe ce rapport « périmètre du volet 3, validé ».
- Les en-têtes des périmètres des volets 1 et 2 disent eux aussi « non validé », alors que ces deux volets ont été exécutés sur ces périmètres.

L'écart tient donc à des en-têtes jamais mis à jour. Je ne propose aucune correction de ces en-têtes. Je demande seulement que l'arbitrage confirme le périmètre en vigueur (Q1).

### 2.2 Les noms G1 à G9

`ROADMAP.md` emploie G1 à G9 pour le **graphe pédagogique** : §4.3, « G1 · Catalogue minimal / chargement », terminé ; §7, « Graphe pédagogique G2–G9 ». Les contrôles G1 à G7 du volet 3 n'ont aucun rapport avec ces étapes, et le périmètre du volet 3 exclut le graphe (§1, « Hors d'A2-05 »). Dans ce document, G1 à G7 désignent toujours les contrôles du volet 3.

### 2.3 Les noms T1 à T9

« T1 et T2 », dans la prochaine action d'`ETAT-ACTUEL.md`, désignent les **tranches** du lot 3, inscrites dans `registre-tranches.json`. Le bilan du volet 2, §3.2, emploie aussi T1 à T8 pour d'autres objets : les **points transversaux** ouverts par le volet 2, soldés par le lot 1 du volet 1. Dans ce document, T1 et T2 désignent toujours les tranches.

---

## 3. Périmètre de chaque contrôle

Pour chaque contrôle, j'indique d'abord ce que le périmètre exige [D]. Viennent ensuite les données examinées, la dépendance aux 204 corrections, les critères et résultats attendus, puis les préalables techniques.

**Règles communes [D]** (périmètre, §1 et §3) :
- Le volet 3 « constate, compte et signale ». Il ne décide rien de lexical : aucune ENTRY rouverte, aucune fusion, aucune lecture ni graphie ajoutée.
- « La fiche source décide », sans connaissance externe.
- Les normes qui jugent sont `A2-GLOBAL-v1`, les cinq snapshots spécialisés, `schema-A2-01.md` et les addenda validés (A3 pour l'identité, A8 pour les furigana). Les documents `legacy/a2/` éclairent, mais ne fondent aucun constat à eux seuls.
- Méthode : G1, G3, G4, G5 et G6 sont des scripts exhaustifs en lecture seule ; G2 et la lecture des paires de G3 se font fiche contre fiche ; G7 est un constat.
- Pendant les contrôles, aucun fichier n'est modifié en dehors du rapport du volet et des documents de suivi (§4).
- Chaque constat est arbitré : corrigé, maintenu avec sa raison, ou renvoyé à un chantier nommé (§5, point 9).

### G1 · Statistiques du corpus

- **Exigence [D]** (§2, G1) :
  - **Population** : le corpus publié (684 ENTRY, 824 SENSE, 35 retraits), les sources figées et le journal.
  - **Réconciliation** : entrées des sources, ENTRY publiées, retraits (fusions et suppressions). Chaque entrée source a une destination, et une seule.
  - **Répartitions** : par niveau et fichier, classe, nombre de sens, catégorie de niveau 1, type, dimension, fonction, tag et relation.
  - **Les `null`** : par champ et selon qu'une fonction est présente, « en accord avec les chiffres des volets 1 et 2 ».
  - **Accord** entre l'assemblage, `data/`, `vocab-retired.json` et l'inventaire.
  - **Signalement** : un compte qui ne se réconcilie pas ; une valeur du registre jamais employée, ou employée une seule fois, notée à titre de constat pour le volet 1.
- **Données et documents** :
  - `reconstruction/a2-04/sources/` (sous le contrôle de `manifest.json`), `lots/`, `journal.json` et `avertissements-connus.json` ;
  - `data/n5/vocab.json`, `data/vocab-hors-jlpt.json`, `data/vocab-retired.json` et `data/registries/` ;
  - pour les chiffres attendus : le rapport d'audit du volet 2 (147 cas) et le criblage du volet 1 (443 candidats et 381 non-candidats).
- **Dépendance aux 204 corrections** :
  - [D] Les 204 corrections ne sont pas appliquées, donc G1 mesure l'état `3d67594`.
  - [D] Après les corrections, les avertissements émis doivent être égaux à l'inventaire resynchronisé (volet 2, §9, point 12).
  - [P] Le bilan, §4 et §5 (phase C, point 2), propose de refaire G1 sur le corpus corrigé.
  - [R] Deux passages du même script : G1-a avant les corrections, comme état de référence ; G1-b après la publication des corrections, comme preuve de sortie. Le second passage n'appartient pas à l'exécution que ce cadrage prépare (Q4).
- **Critères de conformité [D]** :
  - la réconciliation est complète, sans reste (§5, point 2) ;
  - les `null` concordent avec le volet 2 : 120 et 27 avertissements, 147 couples `{ code, where }` ;
  - les comptes de l'assemblage, de `data/` et de l'inventaire s'accordent ;
  - la sortie est reproductible.
- **Résultat attendu** : un tableau de comptes, une réconciliation à zéro reste, et la liste des valeurs du registre employées zéro fois ou une fois.
- **Préalable technique** : un script en lecture seule, placé dans `a2-05-travail/`. [R] Il ne lit que ces fichiers, et un passage de sabotage vérifie qu'un compte faussé est bien détecté.

### G2 · Échantillon significatif d'ENTRY, tous champs

- **Exigence [D]** (§2, G2, et arbitrage V1) :
  - **Relecture entière** d'ENTRY contre leur fiche source, tous champs : forme, graphies, lectures et furigana, classe et groupe, `suru_compatible`, `suffix`, `counter`, découpage en sens, traductions et alternatives, nuances, particules et tags.
  - **Taille** : au moins 68 ENTRY. C'est un plancher, et un dépassement dû aux inclusions contraintes est conservé.
  - **Inclusions contraintes** : au moins deux ENTRY par lot d'origine, quand le lot en contient deux ou plus ; les strates forcées (ENTRY rouvertes en 5.13-C, au lot 17 et au lot 26, et survivantes d'une fusion).
  - **Complément** stratifié par classe et par nombre de sens.
  - **Tirage** par script, à graine fixe et consignée.
  - **Distinction** avec l'échantillon du volet 1. Une ENTRY tirée par les deux n'est examinée qu'une fois. Les champs sémantiques sont renvoyés aux volets 1 et 2, sans être jugés ici.
  - **Signalement** : un écart entre la fiche et l'ENTRY que les décisions du journal n'expliquent pas.
- **Données et documents** :
  - les fiches sources (`sources/vocab.json`, `vocab-hors-jlpt.json` et `exemples.json`) ;
  - les ENTRY publiées, les lots d'origine et le journal ;
  - les listes fermées de `rules.mjs` ;
  - A3 et A8 ;
  - l'échantillon du temps 3 du volet 1 (criblage, §6), pour exclure les doublons d'examen.
- **Dépendance aux 204 corrections** :
  - [D] La règle de signalement ne connaît que les « décisions du journal ». Or les 204 corrections retenues ne sont pas encore au journal : elles sont listées au bilan du volet 2, §8.
  - [P] Le bilan, §4, note que G2 « recoupe le point T5 », c'est-à-dire la provenance des particules et des nuances. Le lot 2 du volet 1 a retenu 165 corrections de provenance (V2-1 à V2-165). Un écart de G2 sur une nuance peut donc être déjà couvert par une correction retenue.
  - **Le texte ne dit pas comment classer un tel écart. C'est la question Q3.** [R] Je propose de le rapporter comme « écart déjà couvert par la correction retenue V… », sans le compter comme un constat nouveau et sans modifier la correction.
- **Critères de conformité [D]** (§5, point 3) :
  - la graine, les inclusions contraintes, les strates et la liste des ENTRY tirées (au moins 68) sont publiées ;
  - chaque ENTRY a son résultat de relecture ;
  - chaque constat est arbitré.
- **Résultat attendu** : une fiche de relecture par ENTRY tirée, avec ses écarts éventuels et, pour chacun, l'explication du journal ou son absence.
- **Préalables techniques** :
  - un script de tirage reproductible ;
  - [R] l'échantillon tiré, présenté et accepté avant toute relecture, sur le modèle des périmètres opérationnels du lot 3 ;
  - [R] des livraisons d'environ 12 ENTRY, chacune sur une autorisation distincte ;
  - [R] des fiches complètes jointes à chaque export, puisque le relecteur n'a pas accès au dépôt.
- **Limite rappelée [D]** : G2 relit tous les champs, mais il n'est pas une vérification d'`interrogatif`. Les 573 sens non relevés par la recherche d'omissions restent non vérifiés conformes, que G2 tire leur ENTRY ou non.

### G3 · Doublons et fusions oubliés

- **Exigence [D]** (§2, G3, et arbitrage V6) :
  - **La liste des doublons candidats d'`ETAT-ACTUEL.md`** : constater l'issue de chaque paire, soit une fusion journalisée, soit deux ENTRY distinctes avec leur raison. Le relevé de cadrage y compte 27 groupes.
  - **Une recherche par script** des paires absentes de cette liste : même forme ; graphie d'une ENTRY égale à la forme d'une autre ; même lecture avec des traductions qui se recoupent ; formes qui ne diffèrent que par l'écriture (kana ou kanji).
  - **Le contrôle des 35 retraits** : chaque identifiant retiré a un successeur existant, ou bien c'est `v_717` ou `v_602`, les deux suppressions sans successeur ; aucun identifiant retiré n'est référencé.
  - **Aucune fusion n'est décidée.** Chaque paire candidate nouvelle reçoit une issue arbitrée avant la clôture de l'étape 2, y compris « deux ENTRY distinctes, aucune fusion ».
- **Données et documents** :
  - les ENTRY publiées, `vocab-retired.json`, le journal (décisions `retire` et `fusion`) et les fiches sources ;
  - A3 (L2, L3 et L8) ;
  - le point ouvert « contrôle d'identité absent du validateur ».
- **Dépendance aux 204 corrections** :
  - [relevé de cadrage, sur la liste du bilan, §8] Aucune correction retenue n'est une fusion. [D] Si une paire nouvelle est arbitrée « fusion », la décision devient une correction de plus. Elle suit alors A3 et la procédure du volet 2, §7 : lot 27, réouverture dans le lot d'origine, décisions à la fin du journal (périmètre, §4).
  - [R] Les issues de G3 doivent être connues avant que la liste fermée des corrections soit arrêtée ; G3 précède donc l'arbitrage global.
- **Critères de conformité [D]** (§5, point 4) :
  - une issue est donnée pour chaque paire de la liste ;
  - les paires nouvelles sont listées avec le critère qui les fait ressortir ;
  - chaque paire nouvelle reçoit une issue arbitrée.
- **Résultat attendu** :
  - deux tables : les paires de la liste, avec leur issue ; les paires nouvelles, avec leur critère ;
  - pour chaque paire nouvelle, les deux fiches en regard ;
  - le contrôle des retraits, sans reste.
- **Préalables techniques** :
  - un script en lecture seule ;
  - [R] si la recherche fait ressortir beaucoup de paires, leur lecture est découpée en livraisons, sur le modèle de G2.

### G4 · Stabilité des identifiants de SENSE

- **Exigence [D]** (§2, G4, et arbitrage V3) :
  - l'unicité et la forme des 824 identifiants ; aucun identifiant de sens retiré n'est réemployé ;
  - le constat de ce qui protège aujourd'hui la règle « réordonner des sens ne doit jamais les renuméroter » : d'où vient le numéro à l'assemblage et à la publication, et quel test échouerait si un identifiant changeait ;
  - deux publications successives, sans changement de décision, donnent les mêmes identifiants ;
  - le volet 3 ne modifie aucun outil ni test ;
  - si aucune protection n'existe, elle est ajoutée par un **chantier d'outillage séparé**, relu et arbitré **avant la clôture de l'étape 2**.
- **Données et documents** :
  - `data/`, les `retired_sense_ids` et le point ouvert « Identifiants de sens après publication » ;
  - le code qui produit les identifiants (`tools/reconstruction/assemble.mjs`, `tools/lexicon/sense.mjs` et `schema.mjs`) et les tests qui s'y rapportent (`tests/reconstruction/`, `tests/lexicon/`), lus et non modifiés.
- **Dépendance aux 204 corrections** :
  - [D] La procédure du volet 2 exige que « les identifiants de SENSE ne changent pas » lors d'une correction (§7, point 4), avec la preuve « identifiants de SENSE inchangés » (§9, point 6).
  - [P] Le bilan, §4, propose de mener le chantier de protection « avant le lot de corrections, qui rouvre des ENTRY ». L'arbitrage V3, lui, ne fixe que l'échéance « avant la clôture de l'étape 2 ».
  - **Q5** porte sur cet écart d'échéance. [R] Je recommande l'échéance la plus prudente, avant les corrections, puisque le lot 27 rouvre précisément des ENTRY.
- **Critères de conformité [D]** (§5, point 5) : un constat écrit de la protection existante, ou de son absence ; dans le second cas, le chantier d'outillage est relu et arbitré avant la clôture.
- **Résultat attendu** :
  - le résultat des contrôles d'unicité et de non-réemploi ;
  - la description du mécanisme de numérotation ;
  - la liste des tests qui protègent la règle, ou le constat qu'il n'y en a aucun ;
  - le résultat de l'idempotence de `publish`.
- **Préalables techniques** :
  - un script en lecture seule ;
  - [R] l'idempotence se vérifie par `run.mjs publish` sans `--write`, qui doit dire « data/ est à jour », ou par une publication calculée en mémoire, jamais par une écriture dans `data/`.

### G5 · Anomalies de kanji

- **Exigence [D]** (§2, G5, et arbitrage V2) :
  - l'avertissement `kanji-inconnu` sur 醤油 (`v_594`) est toujours émis, sur la même ENTRY et pour la même raison ;
  - l'adaptateur écarte toujours les cinq clés-mots de `data/kanji_jouyou_fr.json` (山羊, 生活, 措置, 継続, 迅速) ;
  - aucun autre kanji d'une forme ou d'une graphie publiée n'est dans ce cas ;
  - rien n'est ajouté au dictionnaire ;
  - ces anomalies ne conditionnent ni la clôture d'A2-05 ni celle de l'étape 2, à condition que leur état et leur chantier de destination (la tâche de données sur les kanji) soient documentés.
- **Données et documents** : `data/kanji_jouyou_fr.json` (lu, jamais modifié), l'adaptateur du validateur lexical, l'inventaire, et toutes les formes et graphies publiées.
- **Dépendance aux 204 corrections** : aucune [relevé de cadrage]. Aucune correction retenue ne touche une forme ou une graphie contenant 醤. V1-28 retire un tag de lieu de 醤油, mais ne change ni sa forme ni ses graphies.
- **Critères de conformité [D]** (§5, point 6) : l'état et le chantier de destination sont documentés explicitement.
- **Résultat attendu** : un constat en trois lignes, et la liste exhaustive des kanji absents du dictionnaire. Si l'état actuel se confirme, cette liste vaut 醤.
- **Préalable technique** : un script en lecture seule.

### G6 · Listes fermées et décisions transversales non sémantiques

- **Exigence [D]** (§2, G6) :
  - chaque membre d'une liste fermée de `rules.mjs` (`READING_EXCEPTION_IDS`, `USUAL_FORM_IDS`, `CLASS_EXCEPTION_IDS`, et la liste A d'A8, `SPECIAL_READING_IDS`) est justifié par une décision de journal `validated` ;
  - aucune ENTRY ne bénéficie d'une exception sans figurer dans la liste ;
  - les règles transversales s'appliquent partout où elles valent : l'invariant des furigana (A8), le statu quo des lectures des mots en katakana, « une graphie s'ajoute si la fiche de l'entrée la documente », `suru_compatible` établi par la source, `counter` réservé aux compteurs, `suffix` ;
  - **signalement** : un membre sans décision, ou une règle appliquée dans un lot et pas dans un autre.
- **Données et documents** :
  - `tools/reconstruction/rules.mjs`, lu et non modifié : 52, 2, 2 et 5 membres au relevé ;
  - le journal, les lots, les fiches sources, A8 et la table des décisions d'`ETAT-ACTUEL.md`.
- **Dépendance aux 204 corrections** : [relevé de cadrage] aucune correction retenue ne touche une liste fermée ni l'un de ces champs. Le relevé est à vérifier à l'exécution, puisque les 204 corrections portent sur des catégories, des types, des fonctions, des tags, des traductions, des particules et des nuances (par exemple V1-2, V1-3 et V2-15 pour les particules). Si G6 produit un constat, il rejoint l'arbitrage global comme les autres.
- **Critères de conformité [D]** : chaque membre est relié à une décision `validated` ; aucune exception n'est implicite ; chaque règle est appliquée de façon uniforme, ou l'écart est signalé.
- **Résultat attendu** :
  - une table par liste : membre, décision ou décisions, statut ;
  - une table par règle : population, conformes, écarts.
- **Préalables techniques** :
  - un script en lecture seule ;
  - [R] « `suru_compatible` établi par la source » et « une graphie documentée par la fiche » demandent une lecture des fiches. Le script relève ce qu'il peut décider mécaniquement et liste le reste pour une lecture, sans verdict automatique.

### G7 · Points ouverts non sémantiques

- **Exigence [D]** (§2, G7, et arbitrage V5) :
  - **la liste de 2026-10-07** : les fiches « adjectif en na (et nom) » ; le registre des compteurs sans compatibilité pour une durée (時間) ; la lecture うち de 家 ; la représentation des affixes (色, 方) ; le contrôle d'identité absent du validateur ;
  - **une liste non figée** : à l'exécution, la confrontation est refaite avec **tous** les points ouverts alors présents dans `ETAT-ACTUEL.md` ;
  - **pour chaque point** : son état, les ENTRY concernées, et s'il conditionne la clôture de l'étape 2 ou s'il est rattaché à un chantier nommé ;
  - aucun point n'est tranché par G7.
- **Données et documents** : `ETAT-ACTUEL.md` (« Points ouverts », lu au moment de l'exécution) et `ROADMAP.md`, §6, §7 et §9.
- **Dépendance aux 204 corrections** :
  - [D] G7 ne corrige rien.
  - [R] Il vient en dernier dans le volet. Les points ouverts changent avec les autres contrôles : G3 pour le contrôle d'identité, G4 pour les identifiants de sens, G5 pour les kanji. G7 doit donc lire l'état qu'ils laissent.
- **Critères de conformité [D]** (§5, point 7) : la liste des points lus au moment du contrôle, avec un rattachement explicite pour chacun.
- **Résultat attendu** : une table « point, état, ENTRY, conditionne la clôture ou chantier nommé ».
- **Préalable technique** : aucun ; c'est un constat. [R] La liste lue est jointe à l'export, ligne par ligne.
- **Précision [R]** : `ETAT-ACTUEL.md` contient aussi des points marqués « pour l'audit A2-05 » qui sont sémantiques, par exemple les catégories de メートル et de キロ, ou les extensions conservées en nuance. G7 ne les juge pas, conformément à la frontière du §1 du périmètre. Il dit seulement quel volet les porte. Dire s'ils ont été traités appartient au bilan du volet 1.

---

## 4. Dépendances entre le volet 3 et les 204 corrections retenues

| Contrôle | Lit l'état | Peut ajouter une correction à la liste fermée ? | Conditionne l'application des corrections ? | À refaire après les corrections ? |
|---|---|---|---|---|
| G1 | `3d67594` | non : c'est un constat de comptes | non | [P] oui (bilan, §5, C2), et [D] la preuve 12 du volet 2 demande l'égalité entre l'inventaire et les avertissements émis |
| G2 | `3d67594` | oui, sur arbitrage, pour un écart que le journal n'explique pas | [R] oui : ses corrections doivent entrer dans la liste fermée avant l'arbitrage global | non |
| G3 | `3d67594` | oui : une fusion arbitrée (A3, lot 27) | [R] oui, pour la même raison | non |
| G4 | outils et tests | non : ce serait un chantier d'outillage, pas une correction lexicale | [P] oui, si la protection manque (bilan, §4) ; [D] avant la clôture de l'étape 2 (V3) | [D] la preuve 6 du volet 2 (identifiants inchangés) vaut après les corrections |
| G5 | `3d67594` | non : la tâche de données sur les kanji est à part | non | non |
| G6 | `3d67594` | oui, sur arbitrage | [R] oui, comme G2 | non |
| G7 | `ETAT-ACTUEL.md` | non | non | non |

**Ce qui est documenté [D]** (volet 2, §7 et §9 ; ETAT ; ROADMAP) :
- aucune correction hors de la liste fermée ;
- toutes les corrections passent par un seul véhicule, le lot 27 ;
- une publication se fait toujours par `publish --write`, encadrée par une suite pré-publication verte puis une suite complète verte ;
- l'inventaire est resynchronisé par une commande déterministe et testée, jamais à la main. Cette commande est un chantier d'outillage séparé.

**Ce qui est recommandé [R]** : achever G2, G3 et G6, et les arbitrer, **avant** l'arbitrage global de la liste fermée, pour ne rouvrir chaque ENTRY qu'une seule fois. Le bilan, §5, recommande déjà « une seule fois » [P].

---

## 5. Préalables techniques

| # | Préalable | Nature | Fondement | Bloquant pour |
|---|---|---|---|---|
| PT-1 | Le commit de l'installation d'A10, qui lève C9b | Git, sur autorisation distincte | [D] prochaine action d'`ETAT-ACTUEL.md` | [R] La preuve 8 du volet 3 (« aucune modification ») se lit mieux sur un arbre propre. Aujourd'hui, `docs/conception/` est modifié et non committé. Ce n'est pas bloquant si le rapport explique l'écart connu. |
| PT-2 | La correction de `tools/export-relecture.mjs` : ajouter `A2-GLOBAL-v1` aux références | outillage, sur autorisation distincte | [D] D5, « retenue en principe, non faite » | [R] Le volet 3 juge aussi selon `A2-GLOBAL-v1` (périmètre, §3). Tant que l'outil n'est pas corrigé, chaque note d'export du volet 3 doit recopier ce snapshot. Ce cadrage le fait (annexe C). |
| PT-3 | Les scripts de G1, G3, G4, G5 et G6, et le tirage de G2 | scripts en lecture seule, dans `a2-05-travail/` | [D] périmètre, §3 et §5 | chaque contrôle ; aucun outil de `tools/` n'est modifié |
| PT-4 | Les harnais de sabotage de ces scripts | scripts jetables, hors du dépôt | [R] sur le modèle des contrôles du lot 3 | la recevabilité de chaque sortie |
| PT-5 | Le statut de T1 et de T2 dans `registre-tranches.json` | registre de travail, sur arbitrage distinct | [D] prochaine action d'`ETAT-ACTUEL.md` | **aucun contrôle du volet 3** ; les recalculs exigent aujourd'hui « planifiée » (bilan, §8.92 et suivants) |
| PT-6 | La commande de resynchronisation de l'inventaire | outillage séparé | [D] volet 2, §7 (Q7) | l'application des corrections, **pas** le volet 3 |
| PT-7 | La protection des identifiants de SENSE | outillage séparé | [D] V3, seulement si G4 constate l'absence | la clôture de l'étape 2 ; [P] l'application des corrections |

---

## 6. Ordre d'exécution recommandé, et autorisations distinctes

Tout cet ordre est **[R]**, sauf les marques [D]. Le périmètre dit seulement que « ce volet ne dépend pas de l'ordre des deux autres » [D].

| Étape | Objet | Autorisation distincte requise |
|---|---|---|
| 0 | Arbitrage de ce cadrage (Q1 à Q8) | arbitrage |
| 0a | PT-1 : commit de l'installation d'A10 (et, s'il le décide, du travail documentaire en attente) | « j'autorise le commit », puis, séparément, « j'autorise le push » |
| 0b | PT-2 : correction de `export-relecture.mjs` | autorisation d'outillage |
| 1 | **G5, G6, G4** : scripts, sorties, constats, en une livraison ou en trois (Q2) | autorisation d'exécution |
| 2 | **G1-a** : comptes de référence avant les corrections | autorisation d'exécution |
| 3 | **G3** : script, puis tables des paires | autorisation d'exécution |
| 3b | G3 : lecture fiche contre fiche des paires nouvelles, puis l'issue de chacune | autorisation de lecture, puis arbitrage de chaque paire [D, V6] |
| 4 | **G2** : tirage et présentation de l'échantillon | autorisation du tirage, puis acceptation de l'échantillon |
| 4b | G2 : relecture par livraisons d'environ 12 ENTRY | une autorisation par livraison, et un arbitrage par livraison |
| 5 | **G7** : confrontation avec tous les points ouverts du moment | autorisation d'exécution |
| 6 | Rapport du volet 3, `docs/rapports/etape2-A2-05-controles-globaux.md` [D, périmètre §6], en proposition | autorisation de préparation, puis arbitrage |
| 7 | Inscription documentaire de l'arbitrage du volet 3 | autorisation d'application |

**Les raisons de cet ordre [R]** :
- G4 vient tôt : son constat peut ouvrir PT-7, qui devrait, si Q5 le retient, précéder les corrections.
- G5 et G6 sont courts et ne dépendent de rien.
- G1-a fixe les comptes que les étapes suivantes citent.
- G3 et G2 sont les seuls contrôles à lire des fiches et à pouvoir ajouter des corrections. Ils précèdent l'arbitrage global.
- G7 vient en dernier, pour lire l'état que laissent les autres.

**Hors de cet ordre, et hors du volet 3** : chacun de ces chantiers a son propre cadre et sa propre autorisation (§7).

---

## 7. Carte des dépendances

```
                         ┌───────────────────────────── Étape 2 : clôture (ROADMAP §9) ─────────────────────────────┐
                         │  vocabulaire audité  ·  grammaire N5  ·  kana  ·  kanji  ·  expressions  ·  graphe G2–G9  │
                         │  ·  phrases (tâche 11)  ·  vérification des 120 categorie-nulle  ·  tests verts           │
                         └───────────────────────────────────────────▲─────────────────────────────────────────────┘
                                                                     │
                                      Synthèse d'A2-05 : etape2-A2-05.md, déclaration de sortie [D, V4]
                                                                     ▲
              ┌──────────────────────────────────┬───────────────────┴────────────┬───────────────────────────────┐
     Bilan du volet 1                    Rapport du volet 3                Preuves de sortie du volet 2       Vérification finale
     (après le rapport C6/C9 [D])        (G1 à G7)                         (§9, points 6 à 13 [D])            des 120 et des 27 [D]
              ▲                                  ▲                                  ▲                                ▲
   Rapport C6/C9 : à faire,           G5 G6 G4 → G1-a → G3 → G2 → G7      Publication (publish --write)  après les corrections ;
   distinct de G1–G7 [D]               │            │     │                        ▲                    seuls les cas manquants,
   HP-1 à HP-4 : cadre à proposer      │            └─────┴──► constats ──► Arbitrage global ──► Lot 27   incohérents ou mal justifiés
   QC-1 : à cadrer avant tout          │                         ▲        (liste fermée)  (réouvertures)   sont réexaminés [D]
     examen normatif [D]               └──► PT-7 si absence      │              ▲               ▲
   QC-2 : documentaire [D]                  (V3 [D]) ───────────────────────────┘               │
              │                                                  │                     PT-6 : resync de l'inventaire [D]
              └────────────── corrections éventuelles ───────────┘
```

**Lecture de la carte, point par point.**

| Sujet | Ce qui est documenté | Rapport avec le volet 3 | Rapport avec les 204 corrections |
|---|---|---|---|
| **HP-1 à HP-4** (ひらがな, 漢字 : `information_contenu` ; 右, 左 : `lieu`) | Consignées le 2026-10-12, hors des 377 ; leur type n'est ni validé ni infirmé ; « cadre à proposer » ; examen individuel non autorisé (bilan, §8.35). Le bilan de clôture des omissions les range parmi ce qui « reste à cadrer ». **Aucun texte ne dit explicitement qu'elles conditionnent la clôture de l'étape 2.** | Aucun. Ce sont des questions de **type**, donc sémantiques, que le volet 3 ne juge pas (§1). Si G2 tire l'une de ces quatre ENTRY, il renvoie le champ `semantic_type` au cadre HP et ne le juge pas. | Si leur examen retient un écart, la correction entre dans la liste fermée avant l'arbitrage global. [R] Leur cadre devrait donc être proposé avant cet arbitrage. Q7 demande si elles conditionnent la clôture. |
| **QC-1** (la photographie ordinaire : 撮る, 写真, フィルム) | « à cadrer avant tout examen normatif distinct » ; A2-L3 n'est pas modifié (§8.43). | Aucun : c'est une question de couverture du registre des catégories, donc normative et sémantique. | Si son cadrage menait à une évolution d'A2-L3, ce serait un addendum validé avant tout codage (CLAUDE.md, §3), puis des corrections. [R] Il faut le savoir avant de fixer la liste fermée. |
| **QC-2** (l'éclairage d'un lieu : 暗い, 明るい, sens 1) | Provisoire, **documentaire** : « sans changement normatif, sans proposition de nouvelle catégorie à ce stade », audit non ouvert (§8.49). | Aucun. | Aucun aujourd'hui. |
| **Les 120 `categorie-nulle` et les 27 `type-nul`** | Point de sortie de l'étape 2 (ROADMAP, §5 et §9 ; ETAT). Le volet 2 est arbitré : 147 sur 147, L 136, F 2, C 9, N 0. La vérification finale est faite **après l'application des corrections**, sans refaire automatiquement les 147 arbitrages : on vérifie la décision historique, le résultat appliqué et la justification finale ; seuls les cas manquants, incohérents ou insuffisamment justifiés sont réexaminés. Preuves : volet 2, §9, points 10 à 13, dont la déclaration validée dans `etape2-A2-05.md`. | G1-a compte les 147 avant les corrections. G1-b, s'il est retenu (Q4), fournit les comptes d'après. **Aucun contrôle G ne remplace cette vérification.** | Elle dépend entièrement de l'application des corrections : elle vient après. |
| **C9b et A10** | Depuis l'installation d'A10, C9b refuse le changement non committé de `docs/conception/` ; l'écart se lève au prochain commit ; le commit relève d'une autorisation distincte (bilan, §8.118 ; ETAT). | PT-1. Ce n'est pas bloquant, mais la preuve 8 du volet 3 gagne à partir d'un état committé. | Aucun direct. [R] La publication des corrections gagne à partir d'un état propre. |
| **Le statut de T1 et de T2** dans `registre-tranches.json` | Toutes les tranches sont « planifiée », alors que T1 à T9 et F sont closes ; les recalculs exigent cette valeur ; le statut relève d'un arbitrage distinct (ETAT ; bilan, §8.92 et suivants). | Aucun (PT-5). | Aucun. [R] Ce point se règle avec l'inventaire des scripts de travail, qui doivent être adaptés ensemble. |
| **`export-relecture.mjs`** (D5 : `A2-GLOBAL-v1` absent) | Correction « retenue en principe, non faite » (bilan, §8.66, D5). | PT-2 : le volet 3 juge selon `A2-GLOBAL-v1`. Contournement : le recopier dans chaque note d'export. | Aucun. |
| **Le rapport de conclusion du criblage sur C6 et C9** | Arbitré le 2026-10-12 : rapport séparé, « après les examens individuels et avant le bilan final du volet 1, **distinct de G1 à G7** ». Les examens individuels sont finis (377 sur 377). | Aucun. Il ne fait pas partie du volet 3. | C9-a a relevé un candidat (D0069) ; le bilan dit que quatre raisons historiques inexactes « ne sont pas réécrites ». |
| **La recherche d'omissions d'A10** | Close : 234 candidats, aucune omission ; les 573 sens restent non vérifiés conformes. | G2 ne la complète pas (§3, G2). | Aucune correction nouvelle. |
| **Le lot 27** | Le véhicule unique des corrections des trois volets ; décisions à partir de D1614 (volet 2, §7). | Le volet 3 ne l'ouvre pas. | C'est lui qui porte les 204 corrections. |

---

## 8. Questions soumises à l'arbitrage

- **Q1 · Le périmètre en vigueur.** Le périmètre du 2026-10-07, avec V1 à V6, est-il confirmé comme celui qui fait foi pour l'exécution, malgré la mention « non validé » de son en-tête (§2.1) ? Je ne propose aucune modification de l'en-tête.
- **Q2 · Le découpage des autorisations.** G4, G5 et G6 : une seule autorisation d'exécution, ou trois ?
- **Q3 · G2 et les corrections retenues.** Comment classer un écart de G2 qu'une correction retenue mais non appliquée explique déjà ? Ma proposition : « déjà couvert par V… », sans le compter comme un constat nouveau. Le périmètre ne connaît que les décisions du journal ; ce n'est donc pas une règle nouvelle, seulement l'interprétation d'un cas que le texte n'avait pas prévu.
- **Q4 · G1 refait après les corrections.** G1-b est-il retenu comme preuve de sortie ? Le bilan, §5, le propose, sans arbitrage.
- **Q5 · L'échéance de la protection des identifiants (PT-7).** « Avant la clôture de l'étape 2 », comme le dit V3, ou « avant le lot de corrections », comme le propose le bilan, §4 ?
- **Q6 · L'état de référence.** Le volet 3 est-il exécuté sur l'arbre de travail actuel (A10 non committé, C9b), ou après PT-1 ?
- **Q7 · HP-1 à HP-4 et la clôture.** Ces vérifications conditionnent-elles la clôture de l'étape 2 ? Aucun texte ne le dit. Leur cadre doit-il être proposé avant l'arbitrage global des corrections ?
- **Q8 · L'ordre recommandé (§6).** Est-il retenu, entièrement ou en partie ?

## 9. Ce qui n'est pas fait

- Aucun contrôle G1 à G7 n'est exécuté. Les relevés du §1 ne servent qu'à dimensionner les populations.
- HP-1 à HP-4, QC-1 et QC-2 ne sont pas examinés.
- L'application des 204 corrections n'est pas préparée.
- Aucune donnée lexicale, norme, décision historique, aucun lot, journal, registre, inventaire, outil ni test n'est modifié.
- Aucun `git add`, commit ni push.
- **L'étape 2 reste ouverte.**
