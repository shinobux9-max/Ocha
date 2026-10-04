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
- **Fonctions appelées par `onclick`** : toujours exposées sur `window` dans `app.js` (méthode de
  vérification : `REGLES-CONSTRUCTION.md`).
- **Bouton retour ou FAB** : appelle toujours `history.back()`, jamais la fonction de l'écran
  parent (cela provoque une boucle de navigation).
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
- **lectures des mots en katakana** : statu quo mécanique pendant les lots.

## 5. Où l'on en est (au 2026-10-04)

- **Lots 0 à 11 validés** : assemblage réel attendu, **414 ENTRY, 31 retraits, 274 entrées
  écartées**, 734 décisions validées.
- **Lot 12** (5.13, « temps relatif, moments de la journée et fréquence ») : 31 entrées et 92
  décisions D0735 à D0826, toutes **`proposed`**. Ses arbitrages sémantiques sont acceptés, mais
  **sa validation est suspendue** au chantier 5.13-C.
- **Chantier 5.13-C** (furigana) : 16 lectures ou graphies ont des furigana qui contredisent les
  kana, dont 11 dans des lots validés. Le validateur ne le contrôle pas encore. Décisions déjà
  prises par l'utilisateur :
  - **(A) la segmentation d'une lecture spéciale** relève d'une liste fermée (今朝, 昨夜, 今年,
    大人) ;
  - **(B) la contradiction furigana / kana** relève d'une règle générale et d'un invariant (addendum
    A8, à écrire, complément d'I4) ;
  - **les cas validés sont corrigés maintenant**, par une réouverture contrôlée et journalisée ;
  - **近々 → ちかじか** ;
  - **スポーツ** : c'est le kana qui est faux (すぷーつ → すぽーつ).
- **En attente d'arbitrage** : les cinq points du rapport `docs/rapports/etape2-tache5-13c-portee.md`
  (portée d'A8 sur les graphies, 風邪, 八百屋, forme de la réouverture, ordre des identifiants).
  **Ne rien écrire de 5.13-C avant cet arbitrage.**
- **Ensuite** : 5.13b (corrections du lot 12), validation du lot 12, puis la composition du lot 13
  (calendrier, dates, durées), dont le périmètre n'est pas encore figé.

## 6. Ce qui change avec Claude Code

- **Plus d'archives ZIP ni d'empreintes SHA-256** : les modifications sont faites directement dans
  le dépôt.
- **Avant chaque commit**, montrer à l'utilisateur ce qui change (`git diff --stat`, et le diff des
  fichiers sensibles). Ne committer qu'avec son accord, sur une ligne.
- **Les générateurs** utilisés dans claude.ai pour écrire les lots (`gen*.py`) ne sont pas dans le
  dépôt. Une révision d'un lot proposé modifie donc directement `lot-NN.json` et `journal.json`, en
  gardant les identifiants à leur place, et en vérifiant ensuite que les identifiants, les entrées,
  les natures et les champs des décisions existantes sont inchangés.
