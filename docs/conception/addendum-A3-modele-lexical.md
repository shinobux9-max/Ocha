# Ocha — Document de conception v1

## Addendum A3 · Modèle lexical et reconstruction des données

**Statut** : 🔒 validé le 2026-10-02.

**Objet** : fixer le modèle lexical d'Ocha v2 (`schema-A2-01.md`) et le principe de
reconstruction des données avant la première publication. Il remplace la contrainte d'identité
de la décision D1 de l'addendum A2 et précise les parties 1, 2, 3 et 5.

**Ne modifie** aucun snapshot A2, ni D1 sur le fond : l'ENTRY reste l'unique unité de
progression du vocabulaire, et les SENSE n'ont aucun état.

Les identifiants de grammaire suivent le même principe, par un addendum distinct
(`addendum-A4-identifiants.md`), puisque A2 ne couvre pas la grammaire.

---

## 1. Pourquoi cet addendum

L'addendum A2 supposait une migration du vocabulaire existant, en conservant ses identifiants
pour protéger la progression. Deux faits changent cette hypothèse :

- Ocha n'a aucun utilisateur, donc aucune progression à protéger ;
- l'étude du corpus N5 a montré que migrer champ par champ reconduirait des défauts de
  structure : lectures concaténées par « / », doublons lexicaux (きれい / 綺麗, いい / 良い),
  `group` utilisé comme classe grammaticale, `kanji_list` divergent de la forme du mot, exemples
  dupliqués entre fichiers.

Les données sont donc **reconstruites**, et la forme des identifiants est revue tant qu'elle
peut encore l'être.

## 2. Décisions

### L1 · Reconstruction des données

- Les données passent par trois espaces :
  - **sources** : fichiers actuels, figés, jamais chargés par Ocha v2 ;
  - **travail** : décisions par lot, audits, outil d'assemblage, hors de `data/` ;
  - **canonique** : `data/`, toujours valide.
- Le canonique ne contient ni état temporaire, ni champ hérité, ni exception tolérée. Une ENTRY
  y entre complète ou n'y entre pas.
- Reconstruire n'est pas réécrire :
  - une information source correcte et utile est conservée ;
  - une information fausse est corrigée, et la correction est journalisée ;
  - une information inutile ou dérivable n'est pas reprise, et son abandon est journalisé ;
  - rien n'est ajouté qui n'existe pas dans les sources, sauf décision explicite consignée.

### L2 · Identité lexicale

- Une ENTRY est une **unité lexicale** : une ou plusieurs formes graphiques, une ou plusieurs
  lectures, un ou plusieurs sens.
- Son identifiant est `v_<n>`, indépendant de son niveau. Mots JLPT et hors JLPT forment une
  seule famille ; « hors JLPT » est une valeur du champ `level` (`hors_jlpt`).
- **Remplace la contrainte d'identité de D1** : « À partir de la première publication des
  données canoniques Ocha v2, l'identifiant d'une ENTRY est immuable, indépendant de son niveau
  et jamais réattribué. » Avant cette publication, la réidentification est permise, par une
  table de correspondance explicite ; aucun remappage n'est silencieux.
- **Attribution des numéros** : le numéro historique est conservé. `n5_v_<n>` devient `v_<n>`
  (`v_1` à `v_716`). `v_717` est retiré d'emblée, à cause de la clé fantôme `n5_v_717` de
  `exemples.json`. Les mots hors JLPT deviennent `v_718` (`hj_v_1`) et `v_719` (`hj_v_2`).
- **Fusions** : quand plusieurs anciennes ENTRY représentent la même unité lexicale, l'ENTRY
  canonique garde par défaut le plus petit numéro des entrées fusionnées ; les autres sont
  retirées avec `merged_into`. Une exception n'est admise que si le plus petit numéro
  correspond à une représentation manifestement erronée ou à une autre unité lexicale ; elle est
  justifiée dans le journal de reconstruction.
- Les identifiants retirés (fusion, suppression) sont listés dans `data/vocab-retired.json` et
  ne sont jamais réattribués.
- Aucun identifiant d'une autre famille ne commence par `v_`.

### L3 · Un mot, une ENTRY

- Une unité lexicale n'existe qu'une fois dans tout le vocabulaire. Deux entrées qui sont la
  même unité sont fusionnées pendant la reconstruction, jamais tolérées.
- Si les sources JLPT placent une ENTRY dans
  plusieurs niveaux, son `level` canonique est le niveau pédagogique le plus précoce dans la
  progression d'Ocha : N5 → N4 → N3 → N2 → N1. `level` indique le rattachement au corpus ; le
  moment où le moteur introduit le mot reste une décision du moteur.

### L4 · Sens

- Chaque ENTRY a au moins un SENSE, identifié par `<id de l'ENTRY>_s<m>`, numéroté de façon
  monotone, jamais réattribué (`retired_sense_ids`).
- Un SENSE n'est pas une traduction : plusieurs sens n'existent que si leur différence
  sémantique ou fonctionnelle est exploitable. Les traductions voisines d'un même sens sont ses
  `alternatives`.
- Le premier sens est celui qu'Ocha montre par défaut.

### L5 · Formes, lectures, kanji

- `word` est la forme usuelle ; `writings` liste les autres formes graphiques. Aucune propriété
  calculable à partir des formes (kana seulement, présence de kanji) n'est stockée.
- `readings` liste les lectures, chacune avec ses furigana et son romaji ; une seule est la
  lecture par défaut.
- **Les kanji d'un mot sont calculés** à partir de la forme usuelle ; `kanji_list` n'existe plus
  dans les données. Les formes de `writings` ne changent pas cette relation.

### L6 · Propriétés linguistiques

- `grammatical_class` porte la classe grammaticale (registre A2-02) ; `group` ne porte que le
  comportement morphologique utile au générateur (`ru`, `u`, `irrégulier`, `suru`, `i`, `na`,
  `nom`) et vaut `null` sinon.
- `suru_compatible` signale un nom qui forme un verbe avec する ; il est distinct de
  `group: suru`.
- `suffix` et `counter` (`counter_for`, registre A2-02) représentent les propriétés « suffixe »
  et « compteur » d'`A2-LING-v1`. Un compteur peut aussi avoir une catégorie sémantique : les deux
  couches répondent à des questions différentes.

### L7 · Exemples et phrases

- Le vocabulaire ne contient aucun exemple. Les phrases vivent dans un **registre de phrases**
  au format commun ; une référence `vocab` peut préciser `sense`.
- Les exemples d'un mot ou d'un sens se retrouvent par l'index des références (contenu,
  étape 2).

### L8 · Constructions, expressions, nuances

- Une construction grammaticale relève de la grammaire, une expression figée des expressions
  (`ex_…`), un sens lexical du SENSE. Une contrainte d'emploi s'explique dans une nuance.
- Les expressions ne sont pas décrites par A2 en v1.
- Les nuances ont trois portées : ENTRY (l'unité entière), SENSE (ce sens), lecture
  (`readings[].note`). Aucune nuance source n'est reprise automatiquement.

### L9 · Sens dans les événements

- `QUESTION_ANSWERED` peut porter `senseId`, seulement si `target` contient exactement une
  référence `vocab`, et seulement un sens de cette ENTRY. Le champ est journalisé, sans aucun
  effet.

## 3. Textes précisés

| Texte | Précision |
|---|---|
| Addendum A2, D1 | la contrainte « l'identifiant d'une ENTRY existante ne change pas » est remplacée par L2 ; le reste de D1 est inchangé |
| Addendum A2, §5 et §8 | la migration devient une reconstruction (L1) ; les questions de §8 sont tranchées par `schema-A2-01.md` |
| Partie 1, 1.1 | vocabulaire : `v_<n>` ; la ligne « Mot hors JLPT `hj_v_…` » est remplacée par la valeur `hors_jlpt` du niveau |
| Partie 2, 2.3 et exemples | une référence `vocab` désigne `v_<n>` ; les identifiants cités se lisent avec la table de la section 4 |
| Partie 2, 2.5 | la relation « mot → ses kanji » se calcule à partir de la forme usuelle, et non plus de `kanji_list` |
| Partie 2, 2.10 | `group` : valeurs morphologiques seulement, `null` sinon ; les valeurs non conjugables disparaissent ; la capacité « nom + する » passe par `suru_compatible` |
| Partie 3, 3.3 | `senseId` facultatif dans `QUESTION_ANSWERED` (L9) |
| Partie 5, 5.2 | « un exemple existant du mot » se lit dans le registre de phrases (L7) |
| `README.md` et `GUIDE-CONTENU.md` | format du vocabulaire selon `schema-A2-01.md` ; mots hors JLPT dans `vocab-hors-jlpt.json` avec `level: "hors_jlpt"` ; `lieux.json` référence des tags (`vocab_tags`) ; mis à jour à la publication d'A2-04 |
| `REGLES-CONSTRUCTION.md` §5 | version 2.3 : identifiants de vocabulaire `v_<n>` ; `hj_v_…` disparaît |

## 4. Identifiants de mots cités dans la conception

Les 19 identifiants de mots cités par les documents verrouillés se lisent ainsi :

| Ancien | Nouveau | Mot |
|---|---|---|
| `n5_v_33` | `v_33` | 家 |
| `n5_v_45` | `v_45` | お腹 |
| `n5_v_66` | `v_66` | 飲む |
| `n5_v_84` | `v_84` | お弁当 |
| `n5_v_85` | `v_85` | お茶 |
| `n5_v_97` | `v_97` | パン |
| `n5_v_105` | `v_105` | 昼ご飯 |
| `n5_v_117` | `v_117` | 食べる |
| `n5_v_156` | `v_156` | 行く |
| `n5_v_185` | `v_185` | 安い |
| `n5_v_187` | `v_187` | 買う |
| `n5_v_196` | `v_196` | 映画 |
| `n5_v_333` | `v_333` | 毎朝 |
| `n5_v_344` | `v_344` | はい |
| `n5_v_401` | `v_401` | 何 |
| `n5_v_487` | `v_487` | 青 |
| `n5_v_577` | `v_577` | 起きる |
| `hj_v_1` | `v_718` | レジ袋 |
| `hj_v_2` | `v_719` | ポイントカード |

Cette table vaut sous réserve des fusions décidées dans A2-04 : si l'une de ces entrées est
fusionnée dans une autre, la table finale, publiée avec les données, fait foi.

---

## Décisions de cet addendum

| Point | Décision |
|---|---|
| L1 · Données reconstruites, trois espaces, canonique toujours valide | validé |
| L2 · Identifiant `v_<n>` indépendant du niveau, numéro historique conservé, fusion au plus petit numéro, immuable après la première publication | validé |
| L3 · Une unité lexicale, une ENTRY ; niveau le plus précoce de la progression | validé |
| L4 à L6 · Sens, formes, lectures, kanji calculés, propriétés linguistiques | validé |
| L7 · Exemples hors du vocabulaire, registre de phrases | validé |
| L8, L9 · Constructions, expressions, nuances, `senseId` | validé |
