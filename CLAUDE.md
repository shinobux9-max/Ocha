# Ocha v2 — Instructions pour Claude Code

Ce fichier est lu automatiquement à chaque session. Il remplace la conversation claude.ai
utilisée jusqu'au 2026-10-04 : **rien de cette conversation n'est disponible ici**, tout ce qu'il
faut savoir est dans le dépôt.

## 1. Le projet

- **Ocha** : PWA d'apprentissage du japonais, modulaire en ESM. Reconstruction en cours sur la
  branche **`ocha-v2`** (dépôt `https://github.com/shinobux9-max/Ocha`).
- **Langue de travail** : le français, pour les échanges, les rapports, les décisions et les
  commentaires.
- **L'utilisateur** est sous Windows, avec PowerShell : `npm.cmd test` plutôt que `npm test` dans
  PowerShell ; messages de commit sur **une seule ligne**.
- **La relecture** : l'utilisateur fait relire chaque proposition par un relecteur (ChatGPT), puis
  arbitre. Rien n'est validé sans cet arbitrage explicite.

## 2. À faire au début de chaque session

1. Lire **`ROADMAP.md`** : la position globale, et l'ordre des chantiers.
2. Lire **`ETAT-ACTUEL.md`** : l'étape en cours, les décisions, les points ouverts. Le fichier est
   long ; lire d'abord « Étape en cours » et « Points ouverts », puis la table des décisions au
   besoin.
3. Lire **`REGLES-CONSTRUCTION.md`** (version 2.3 et plus) : les règles de travail.
4. **Vérifier l'état réel** avant de se fier aux chiffres des documents :
   `node tools/reconstruction/run.mjs assemble`, puis la suite de tests. L'assemblage réel fait
   foi.

## 3. Règles non négociables

- **Patcher par remplacement ciblé**, jamais réécrire un fichier entier existant.
- **`node --check`** sur chaque fichier JS modifié.
- **Événements d'interface par délégation** (`REGLES-CONSTRUCTION.md` §6) : les éléments cliquables
  portent `data-action="…"`, traité par un écouteur unique par écran. **Interdit** : `onclick` ou
  tout autre gestionnaire écrit dans le HTML généré, et toute fonction exposée sur `window` pour
  l'interface.
- **Retour** : toujours `history.back()`, jamais l'appel direct à l'écran parent (cela provoque une
  boucle de navigation). Exception : ⌂ et les onglets de la barre du bas remplacent la pile.
- **La conception est verrouillée** (`docs/conception/`, snapshots A2) : toute évolution passe par
  un addendum explicite, validé avant d'être codé. Jamais de modification « en passant ».
- **Une proposition ne vaut jamais validation.** Ne jamais passer quoi que ce soit en `validated`
  sans l'autorisation explicite de l'utilisateur.
- **`ETAT-ACTUEL.md` est mis à jour à chaque tâche**. `ROADMAP.md` ne l'est que si l'avancement
  global change.
- **Ne jamais partir d'une copie extérieure au dépôt** (copies du Project claude.ai, anciennes
  archives) pour réécrire un fichier de gouvernance : elles peuvent être périmées. C'est la cause
  de l'incident du 2026-10-04 (`REGLES-CONSTRUCTION.md` revenu en 2.2).

## 4. La reconstruction du vocabulaire (A2-04)

**Espace de travail** : `reconstruction/a2-04/`.

| Élément | Rôle |
|---|---|
| `sources/` | copies figées des anciennes données, contrôlées par `manifest.json` (SHA-256) |
| `lots/lot-NN.json` | les décisions par entrée : `fields` (garder) ou `retire` (fusion), avec `status` |
| `journal.json` | les décisions `A2-04-D<nnnn>`, chacune avec son `status` |
| `rapports/lot-NN.md` | rapport généré, entrée par entrée ; jamais relu par un outil |

**Commandes** (`tools/reconstruction/run.mjs`) : `verify`, `report lot-NN`, `assemble`.

**Le protocole d'un lot**, sans exception :
1. **Composition** du périmètre, par identifiants contrôlés par script (distincts, présents dans
   la source, non décidés), avec les cas sensibles. **Aucune décision avant validation du
   périmètre.**
2. **Proposition** (`proposed`) : décisions d'entrée et décisions de journal, essai à blanc en
   mémoire (lot et journal supposés validés), rapport de livraison dans `docs/rapports/`.
3. **Relecture** par l'utilisateur, puis **révision** (5.Nb) si nécessaire.
4. **Validation atomique** : statuts seulement (`proposed` → `validated`, entrées et journal du
   lot), après vérification que le contenu hors statut est identique ; assemblage réel ; test
   d'état du lot adapté ; sabotages vérifiés comme modifiant réellement les données.

**Les invariants du journal** :
- les identifiants sont **stables** : une révision réécrit une décision **à sa place**, sous le
  même identifiant ; toute décision nouvelle s'ajoute à la fin ;
- une décision validée n'est **jamais** modifiée en silence. Une correction ultérieure se fait par
  une décision nouvelle, journalisée, avec une réouverture explicite ;
- une décision de lot `validated` ne cite que des décisions de journal `validated`.

**Les doctrines fixées**, détaillées dans la table des décisions d'`ETAT-ACTUEL.md` :
- **un SENSE n'est pas une traduction** : deux traductions ne font pas deux sens ;
- **la fiche source décide** : aucun sens, aucune lecture, aucune graphie ajouté par connaissance
  externe ; une confusion de la source est corrigée et journalisée, pas transformée en sens ;
- **tags de lieu** : association caractéristique et utile au contexte de l'Explorer, jamais la
  simple possibilité d'employer le mot dans le lieu ; chaque candidat hérité est arbitré
  individuellement ;
- **`suru_compatible`** : `true` seulement si la source établit la formation Nする ; `false` veut
  dire « non établi », jamais « incompatible » ;
- **`counter`** : réservé aux ENTRY qui sont elles-mêmes des compteurs (seul 匹 au N5) ;
- **absences justifiées** : `category: null` (addendum A5), `semantic_type: null` (addendum A6) ;
- **`deictique`** : la définition de l'addendum A7 (personne, espace, temps), appliquée sens par
  sens ;
- **lectures des mots en katakana** : statu quo mécanique pendant les lots ;
- **lecture fautive connue** : liste fermée (`READING_EXCEPTION_IDS`, 九つ seule) qui rend la lecture
  décidable ; aucune correction automatique, sources figées intactes ; le romaji n'est pas une
  règle générale.

## 5. Où l'on en est (au 2026-10-05)

- **Lots 0 à 16 validés**, corrections de 5.13-C comprises : assemblage réel attendu, **551 ENTRY,
  31 retraits, 137 entrées écartées**, 0 problème, 0 erreur, 0 attente ; 1 126 décisions validées
  (D0001 à D1126), aucune proposition en cours.
- **Lot 12** (5.13, « temps relatif, moments de la journée et fréquence ») : validé, 31 entrées et
  97 décisions (D0735 à D0826, D0840 à D0844), après la révision 5.13b (rapport
  `docs/rapports/etape2-tache5-13-lot12-valide.md`).
- **Chantier 5.13-C** (furigana) : 16 lectures ou graphies ont des furigana qui contredisent les
  kana, dont **13 dans des lots validés** (11 au relevé initial, plus お巡りさん et 靴下) et 3 dans
  le lot 12. **Chantier clos.** Décisions prises par l'utilisateur :
  - **(A) la segmentation d'une lecture spéciale** relève d'une liste fermée ;
  - **(B) la contradiction furigana / kana** relève d'une règle générale et d'un invariant (addendum
    A8) ;
  - **les cas validés sont corrigés maintenant**, par une réouverture contrôlée et journalisée ;
  - **近々 → ちかじか** ;
  - **スポーツ** : c'est le kana qui est faux (すぷーつ → すぽーつ).
- **Addendum A8, validé et implémenté** (`docs/conception/addendum-A8-furigana.md`) : il complète
  I4 (lectures) et I5 (graphies, contre la lecture par défaut), erreur `furigana-lecture` ; la règle
  détecte, un humain choisit le champ à corriger ; liste A de cinq lectures dans `rules.mjs` (大人,
  今年, 今朝, 昨夜 à corriger ; 今日 seulement protégée).
- **13 corrections validées** (rapport `docs/rapports/etape2-tache5-13c-valide.md`) : 13 entrées des
  lots 00, 01, 03, 05, 08 et 09 ont été rouvertes, corrigées par les décisions `correction` D0827 à
  D0839, puis revalidées.
- **5.13b, révision du lot 12, validée avec lui** : cinq lectures (今年, 今朝, 昨夜, 近々, 夕方 ;
  D0840 à D0844) et la raison de D0746 (昨日), bloc par nécessité. Une décision n'invoque
  « jukujikun » que pour une entrée de la liste fermée d'A8 ; un test le contrôle.
- **Lot 13** (5.14, « calendrier, dates et durées ») : validé, 27 entrées et 109 décisions D0845 à
  D0953 (rapport `docs/rapports/etape2-tache5-14-lot13-valide.md`). 半 est la seule ENTRY à porter
  `suffix`. **Restent ouverts** : le registre des compteurs n'a aucune compatibilité pour une durée
  (時間 est validé avec `counter: null`) ; les sens temporels de 前 et 先 (lot 10) sont joints à
  l'audit A2-05 de la deixis temporelle.
- **Lot 14** (5.15, « nombres, compteurs et mesures ») : validé, 29 entrées et 72 décisions D0954 à
  D1025 (rapport `docs/rapports/etape2-tache5-15-lot14-valide.md`). Un emploi avec compteur ne
  produit pas automatiquement un sens : les sens suivent les fiches. **Reste ouvert** : l'écart de
  catégorie entre メートル et le sens « kilomètre » de キロ, pour l'audit A2-05.
- **Lot 15** (« couleurs, formes, dimensions et poids ») : validé, 29 entrées (36 sens) et 50
  décisions D1026 à D1075 (rapport `docs/rapports/etape2-A2-04-lot15-valide.md`), sur dix-sept choix
  arbitrés. 大きな et 小さな sont en `determinant` (小さな était entrée dans `CLASS_EXCEPTION_IDS` à
  l'arbitrage du périmètre) ; 色 reste sans `suffix` ; le poids est sans catégorie (A5). **La fiche
  entière décide, exemple compris** : les emplois attestés par un exemple (低い et le prix, 大きな et
  la voix) sont conservés en nuance, sans seuil ni symétrie imposés. **Restent ouverts** : la
  catégorie du poids, et les sous-catégories absentes d'espace › dimensions (superficie,
  circonférence, épaisseur).
- **Numérotation** : à partir du lot 15, un lot est désigné par son numéro (« A2-04 · lot 15 », puis
  lot 16, etc.), sans nouveau numéro de sous-tâche ; **5.16 reste la passe finale et 5.17 la
  publication**. Les rapports se nomment `etape2-A2-04-lot<NN>-<objet>.md`.
- **Lot 16** (« préférences, appréciations et états de la personne ») : validé, 21 adjectifs (22
  sens) et 51 décisions D1076 à D1126 (rapport `docs/rapports/etape2-A2-04-lot16-valide.md`), sur
  dix-huit choix arbitrés. Deux principes arbitrés avec le périmètre : **un axe d'A2-DIM est employé
  lorsqu'il décrit directement le sens**, et seulement alors ; **une traduction française naturelle**
  (« aimer », « vouloir », « libre ») **lorsque la fiche l'atteste**, la classe japonaise restant
  dite. Les emplois d'adresse (refus, excuse, avertissement) sont conservés en nuance, sans sens ni
  fonction. **Restent ouverts** : les fiches « adjectif en na (et nom) », le schéma ne portant
  qu'une classe ; les douze catégories nulles du lot, pour l'audit A2-05.
- **Ensuite** : choix du thème du lot 17 parmi les 137 entrées restantes, puis composition de son
  périmètre. Un lot voisin du lot 16 réunirait 17 adjectifs des choses et des lieux. Un lot « quantité et
  degré » reste réservé, précédé de la question des fonctions `quantificateur`, `comparatif` et
  `intensifieur`. **Aucune décision avant la validation d'un périmètre.**
- **Contrôle** : Claude réalise dans le dépôt, Codex relit et reproduit les chiffres sur le dépôt
  réel, l'utilisateur arbitre.

## 6. Ce qui change avec Claude Code

- **Plus d'archives ZIP ni d'empreintes SHA-256** : les modifications sont faites directement dans
  le dépôt.
- **Avant chaque commit**, montrer à l'utilisateur ce qui change (`git diff --stat`, et le diff des
  fichiers sensibles). Ne committer qu'avec son accord, sur une ligne.
- **Les générateurs** utilisés dans claude.ai pour écrire les lots (`gen*.py`) ne sont pas dans le
  dépôt. Une révision d'un lot proposé modifie donc directement `lot-NN.json` et `journal.json`, en
  gardant les identifiants à leur place, et en vérifiant ensuite que les identifiants, les entrées,
  les natures et les champs des décisions existantes sont inchangés.
