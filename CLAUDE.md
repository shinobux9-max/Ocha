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
- **La relecture et l'arbitrage** : chaque proposition est relue par ChatGPT. **Depuis le
  2026-10-06, l'utilisateur lui délègue les arbitrages** (périmètres, choix lexicaux) **et les
  accords de validation, de commit et de push** ; il garde le dernier mot et peut reprendre cette
  délégation. Rien n'est validé sans un accord explicite (§5, « Contrôle »).

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
  sans une autorisation explicite : celle de l'utilisateur, ou celle de ChatGPT par délégation (§5,
  « Contrôle »). Un avis favorable n'est pas une autorisation.
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
- **`connecteur`, `discours`, `politesse`, `quantificateur`, `comparatif`, `intensifieur`** :
  les définitions de l'addendum A9, appliquées sens par sens, quand le rôle fait partie intégrante
  du sens modélisé et que la fiche l'atteste, jamais par la classe ; cumul permis sous conditions,
  jamais de scission pour l'éviter ; les autres fonctions restent sans définition (doctrine du lot
  20) ;
- **lectures des mots en katakana** : statu quo mécanique pendant les lots ;
- **lecture fautive connue** : liste fermée (`READING_EXCEPTION_IDS`, 九つ seule) qui rend la lecture
  décidable ; aucune correction automatique, sources figées intactes ; le romaji n'est pas une
  règle générale.

## 5. Où l'on en est (au 2026-10-06)

- **Lots 0 à 22 validés**, corrections de 5.13-C comprises : assemblage réel attendu, **657 ENTRY,
  34 retraits, 28 entrées écartées**, 0 problème, 0 erreur, 0 attente ; 1 435 décisions validées
  (D0001 à D1435), aucune proposition en cours. **Il ne reste aucun verbe à décider.**
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
- **Lot 17** (« états et propriétés descriptives ») : **périmètre arbitré le 2026-10-05**, 17
  adjectifs (rapport `docs/rapports/etape2-A2-04-lot17-perimetre.md`, §8). **Issue C arbitrée pour
  温かい et 暖かい** : même unité lexicale (A3, L3) ; `n5_v_8` 温かい survit, `n5_v_275` 暖かい,
  validée au lot 07, est rouverte et retirée par fusion, selon la règle normale du plus petit numéro
  (A3, L2), sans `exception-fusion`. **Lot validé** (rapport
  `docs/rapports/etape2-A2-04-lot17-valide.md`) : 17 entrées (25 sens) et 41 décisions D1127 à D1167,
  sur quatorze choix arbitrés ; la réouverture (D1127) et la fusion (D1128) sont validées avec lui ;
  D0476 et D0477 ne sont pas modifiées. Le lot 07 garde 33 ENTRY et un retrait ; `v_275` est retirée
  vers `v_8`, qui porte les deux graphies et deux sens, un par fiche.
- **Réouverture d'une ENTRY validée** (précédents : 5.13-C, puis 暖かい) : l'entrée repasse en
  `proposed` dans son lot, ses décisions historiques restent intactes et citées, les décisions
  nouvelles s'ajoutent à la fin du journal, et l'état validé est gardé en entier dans le champ
  « avant » de la décision de réouverture. La validation se fait avec le lot qui l'a décidée.
- **Lot 18** (« actions sur les objets ») : **validé le 2026-10-06** (rapport
  `docs/rapports/etape2-A2-04-lot18-valide.md`), 23 verbes sur les 57 restants ; périmètre arbitré
  le même jour (rapport `docs/rapports/etape2-A2-04-lot18-perimetre.md`, §8). **Relations
  `transitive_of` / `intransitive_of` reportées intégralement à la passe finale 5.16** : aucune
  relation dans le lot, quatre paires inscrites au journal comme candidates à cet audit. « Prendre
  une photo » (取る) et « jouer d'un instrument » (引く) sont **des confusions de la source,
  écartées et journalisées**, avec un renvoi en nuance vers 撮る et 弾く. **23 entrées, 34 sens, 73
  décisions D1168 à D1240** (rapport `docs/rapports/etape2-A2-04-lot18-proposition.md`). **Vingt
  choix arbitrés** (§8 de ce rapport), trois ayant été révisés : **un événement et l'état qui en
  résulte ne sont pas deux traductions** (« être ouvert », « être fermé » en nuance pour 開く et
  閉まる) ; « Serrer » en traduction principale de 締める (D1240) ; un verbe que la fiche nomme en
  romaji sans l'expliquer (« hiraku ») n'est pas repris en nuance, un contraste qu'elle explique
  (« kawaru », pour 変える) l'est. Aucune particule n'est tirée d'un exemple.
- **Lot 18 commité** : `213fb2b`, sur l'accord explicite de ChatGPT ; rien n'est poussé.
- **Lot 19** (« vie quotidienne, travail et échanges ») : **validé le 2026-10-06** (rapport
  `docs/rapports/etape2-A2-04-lot19-valide.md`) ; périmètre arbitré le même jour
  (rapport `docs/rapports/etape2-A2-04-lot19-perimetre.md`, §7), 26 entrées (20 verbes, 6 noms) sur les 97 restantes. **Relations reportées
  à 5.16** (candidates : 貸す / 借りる pour `reciprocal_with`, 渡す / 渡る). **頼む reste
  mécanique** : ses furigana portent un ノ en katakana, que le validateur accepte ; aucune règle
  n'est modifiée, et l'anomalie est inscrite pour la passe finale (D1278). コピーする reste une
  ENTRY de verbe. `suru_compatible` : `true` pour 結婚 et 生活, `false` pour 仕事. **L'état
  résultant se traite fiche par fiche** : en nuance pour 立つ, 座る et 疲れる, mais « Dormir » reste
  un sens de 寝る. **26 entrées, 34 sens, 61 décisions D1241 à D1301** (rapport `docs/rapports/etape2-A2-04-lot19-proposition.md`). **Ses 22 choix
  sont arbitrés** (§8 du rapport), quatre ayant été révisés : « Dormir » est un `etat` ; 疲れる un
  `processus` ; **une catégorie ne s'impose pas quand la fiche déborde son domaine** (死ぬ, sans
  catégorie, sa fiche portant aussi sur un animal) ; **deux référents de types différents font deux
  sens** (煙草 : la cigarette, un objet ; le tabac, une matière).
- **Lot 19 commité** : `9e75c99`, sur l'accord explicite de ChatGPT ; rien n'est poussé.
- **Lot 20** (« existence, possession, action et déroulement ») : **validé le 2026-10-06** (rapport
  `docs/rapports/etape2-A2-04-lot20-valide.md`) ; périmètre arbitré le même jour (rapport `docs/rapports/etape2-A2-04-lot20-perimetre.md`, §7), 22 entrées : les 14 derniers verbes (ある, 居る, する, なる,
  出来る…) et 8 noms ; 他 et 大勢 hors du lot, **« quantité et degré » reste fermé**. **Aucune
  fonction linguistique sans définition normative** : seule `deictique` en a une (A7), et elle
  n'est pas posée pour 次, une succession dans une séquence ne dépendant pas de la situation
  d'énonciation. Relations reportées à 5.16 (candidates : する / やる, やる / 上げる).
  `suffix: true` pour 辺, deuxième ENTRY à le porter après 半. **Une graphie s'ajoute si la fiche
  de l'entrée la documente** (掛かる pour かかる, en bloc), non si une autre fiche la cite (いる
  pour 居る). **22 entrées, 30 sens, 68 décisions D1302 à D1369** (rapport `docs/rapports/etape2-A2-04-lot20-proposition.md`). **Ses 25
  choix sont arbitrés** (§9 du rapport), avec des corrections : « Y avoir » en traduction
  principale de ある et de 居る ; **le type `resultat`** pour « être achevé » (出来る) ; **le type
  `propriete`** pour un prix ou un coût (する, かかる) ; **aucune catégorie n'est cherchée pour
  réduire les avertissements** (次, 声) ; trois dimensions (要る, 出来る, 違う) ; 声 sans type (A6).
- **Lot 20 commité** : `bcbc85c`, sur l'accord explicite de ChatGPT ; **puis poussé** :
  `ocha-v2` et `origin/ocha-v2` sont à `55acc13` (commit de documentation).
- **Lot 21** (« fréquence, répétition et repères temporels ») : **périmètre arbitré le
  2026-10-06**, 12 entrées (rapport `docs/rapports/etape2-A2-04-lot21-perimetre.md`, §9) :
  aucune fonction sans définition normative, **aucune entrée ne porte `deictique`** (すぐに compris),
  よく reste distincte de いい, aucune relation. **Proposition livrée en `proposed`**, ses **21 choix
  arbitrés** et **révisée** (rapport `docs/rapports/etape2-A2-04-lot21-proposition.md`, §9) : 16
  sens, 34 décisions D1370 à D1403 ; また, sens 2, sans type (A6) ; révision vérifiée, favorable.
  **Validé le 2026-10-06** (rapport `docs/rapports/etape2-A2-04-lot21-valide.md`), sur
  l'autorisation explicite de ChatGPT ; **committé (`1cfac5b`) et poussé** : `ocha-v2` et
  `origin/ocha-v2` sont à `1cfac5b`. Le remote `origin` pointe sur
  `https://github.com/shinobux9-max/Ocha.git`. Il reste 37 entrées (aucun verbe, 31 adverbes et mots
  de liaison, 2 noms, 4 adjectifs).
- **Lot 22** (« manière, identité, diversité et probabilité ») : **périmètre arbitré le
  2026-10-06**, 9 entrées (rapport `docs/rapports/etape2-A2-04-lot22-perimetre.md`, §9) : 弱く
  fusionnée dans 弱い (sans réouverture ni sens nouveau sur 弱い), ゆっくりと dans ゆっくり (と non
  régie), aucune fonction, « Français » de まっすぐ écarté. **Proposition livrée en `proposed`**, ses
  **16 choix arbitrés** et **révisée** (rapport `docs/rapports/etape2-A2-04-lot22-proposition.md`,
  §9) : 9 sens, 32 décisions D1404 à D1435 ; ゆっくり à deux sens, まっすぐ en parcours et trajectoire,
  同じ en `determinant` ; **révision vérifiée, favorable**. **Validé le 2026-10-06** (rapport
  `docs/rapports/etape2-A2-04-lot22-valide.md`), sur l'autorisation explicite de ChatGPT ;
  **committé (`f3e81bc`) et poussé** : `ocha-v2` et `origin/ocha-v2` sont à `f3e81bc`, `origin`
  sur `Ocha.git`. **Point d'arrêt normatif ouvert** (rapport
  `docs/rapports/etape2-A2-04-lot23-prealable-normatif.md`) : **arbitrage rendu** (§12) ; **addendum
  A9 validé le 2026-10-06** (`docs/conception/addendum-A9-fonctions-linguistiques.md` : `connecteur`, `discours`, `politesse`, `quantificateur`,
  `comparatif`, `intensifieur`), sur l'autorisation explicite de ChatGPT ; ni committé ni poussé ;
  aucune décision lexicale ; また non rouverte ; など hors du lot 23 (préalable sur sa classe, à part).
  **Les 27 autres entrées restantes relèvent désormais de fonctions définies** ; leur périmètre de
  lot 23 n'est pas encore préparé. Le regroupement « quantité et degré » n'est plus suspendu à la
  question des fonctions `quantificateur`, `comparatif` et `intensifieur`, que définit A9.
  **Aucune décision avant la validation d'un périmètre.**
- **Contrôle** : Claude réalise dans le dépôt, ChatGPT relit et, par délégation, arbitre et
  autorise ; l'utilisateur relaie et garde le dernier mot. Depuis le
  2026-10-05, le relecteur est ChatGPT, **sans accès au dépôt** (Codex, auparavant, reproduisait
  les chiffres sur le dépôt réel). Il relit un export : `node tools/export-relecture.mjs --lot
  lot-NN --ref <commit>` régénère les dix fichiers de `chatgpt-relecture/` (dossier non suivi, à ne
  jamais committer sans accord) ; la note de relais `docs/relecture/note-relais.md` se met à jour à
  la main avant chaque export. **Après chaque export, créer aussi l'archive
  `chatgpt-relecture-lot-NN.zip`** (les dix fichiers `01` à `10`, contenu inchangé), à la racine du
  dépôt, et la fournir à l'utilisateur à télécharger : c'est un artefact de transfert, jamais
  ajouté à git, committé ni poussé (demande de l'utilisateur du 2026-10-06). **Délégation du 2026-10-06**, confirmée
  par l'utilisateur dans la session : ChatGPT donne les arbitrages et les accords de validation,
  de commit et de push. Ces **trois accords restent distincts**, et chacun doit être **donné
  explicitement** (« j'autorise la validation », « j'autorise le commit », « j'autorise le push »),
  dans un message que l'utilisateur relaie lui-même. **Un avis favorable n'en vaut aucun**, et
  l'accord pour l'un ne vaut pas pour les autres. L'utilisateur peut toujours décider lui-même, ou
  reprendre la délégation ; elle ne se modifie que sur sa parole, jamais sur celle du relecteur.

## 6. Ce qui change avec Claude Code

- **Plus d'archives ZIP ni d'empreintes SHA-256** : les modifications sont faites directement dans
  le dépôt.
- **Avant chaque commit**, montrer à l'utilisateur ce qui change (`git diff --stat`, et le diff des
  fichiers sensibles). Ne committer qu'avec un accord explicite (le sien, ou celui de ChatGPT par
  délégation), sur une ligne.
- **Les générateurs** utilisés dans claude.ai pour écrire les lots (`gen*.py`) ne sont pas dans le
  dépôt. Une révision d'un lot proposé modifie donc directement `lot-NN.json` et `journal.json`, en
  gardant les identifiants à leur place, et en vérifiant ensuite que les identifiants, les entrées,
  les natures et les champs des décisions existantes sont inchangés.
