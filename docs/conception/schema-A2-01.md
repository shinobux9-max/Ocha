# Ocha — Schéma A2-01 · Vocabulaire ENTRY → SENSE

**Statut** : 🔒 validé le 2026-10-02 (projet A2-01). Décisions de fond : addenda A2, A3 et A4.

**Objet** : la forme exacte des données de vocabulaire d'Ocha v2 et les contrôles que le
validateur (A2-03) leur applique.

Une ENTRY décrit une unité lexicale : son identité, ses formes, ses lectures et ses propriétés
linguistiques. Ses sens portent tout ce qui en dépend. Le schéma est **strict** : tout champ
absent de ce document est une erreur. Les valeurs entre chevrons sont des identifiants de
registres fixés par A2-02.

---

## 1. Fichiers canoniques

| Fichier | Contenu |
|---|---|
| `data/<niveau>/vocab.json` | les ENTRY d'un niveau JLPT (`data/n5/vocab.json` en premier) |
| `data/vocab-hors-jlpt.json` | les ENTRY hors JLPT, même schéma |
| `data/vocab-retired.json` | les identifiants d'ENTRY retirés, jamais réattribués |
| registres A2-02 | catégories, types, axes, relations, fonctions, classes grammaticales, compteurs, tags (emplacement fixé par A2-02) |

Un identifiant d'ENTRY est unique dans l'ensemble de ces fichiers.

## 2. Exemple complet

```json
{
  "id": "v_188",
  "level": "N5",
  "word": "高い",
  "writings": [],
  "readings": [
    { "kana": "たかい", "romaji": "takai",
      "furigana": "<ruby>高<rt>たか</rt></ruby>い", "default": true, "note": null }
  ],
  "linguistic": {
    "grammatical_class": "<adjectif en い>",
    "group": "i",
    "suru_compatible": false,
    "suffix": false,
    "counter": null
  },
  "nuance": null,
  "tags": [],
  "retired_sense_ids": [],
  "senses": [
    {
      "id": "v_188_s1",
      "meaning": { "primary": "Haut", "alternatives": ["Élevé"] },
      "category": { "level_1": "<Espace & propriétés spatiales>", "level_2": "<Dimensions>", "level_3": "<Hauteur>" },
      "semantic_type": "<Propriété>",
      "dimensions": [],
      "relations": [ { "type": "opposed_to", "target": "v_183_s1" } ],
      "linguistic_functions": { "grammatical": [], "pragmatic_discourse": [] },
      "tags": [],
      "particles": [],
      "nuance": null
    },
    {
      "id": "v_188_s2",
      "meaning": { "primary": "Cher", "alternatives": ["Coûteux"] },
      "category": { "level_1": "<Économie & commerce>", "level_2": "<Prix & valeur économique>", "level_3": "<Prix>" },
      "semantic_type": "<Propriété>",
      "dimensions": [],
      "relations": [ { "type": "opposed_to", "target": "v_185_s1" } ],
      "linguistic_functions": { "grammatical": [], "pragmatic_discourse": [] },
      "tags": [],
      "particles": [],
      "nuance": null
    }
  ]
}
```

La classification et les sens de 低い (`v_183`) et 安い (`v_185`) sont illustratifs ; ils se
décident dans A2-04. Deux variantes, en extrait :

```json
"word": "何",
"readings": [
  { "kana": "なに", "romaji": "nani", "furigana": "<ruby>何<rt>なに</rt></ruby>", "default": true, "note": null },
  { "kana": "なん", "romaji": "nan", "furigana": "<ruby>何<rt>なん</rt></ruby>", "default": false,
    "note": "devant t, d, n, devant un compteur et devant です" }
]
```

```json
"word": "きれい",
"writings": [ { "form": "綺麗", "furigana": "<ruby>綺<rt>き</rt></ruby><ruby>麗<rt>れい</rt></ruby>" } ]
```

## 3. ENTRY

| Champ | Type | Obligatoire | Règle |
|---|---|---|---|
| `id` | texte | oui | `v_<n>`, numéro historique conservé (`n5_v_188` → `v_188`) ; immuable après la première publication ; absent de `vocab-retired.json` |
| `level` | texte | oui | `N5` à `N1` ou `hors_jlpt`, égal au niveau du fichier ; pour un mot de plusieurs listes JLPT, le niveau le plus précoce de la progression (N5 → N4 → N3 → N2 → N1) |
| `word` | texte | oui | forme usuelle, celle qu'Ocha affiche par défaut ; jamais de « / » |
| `writings` | liste | non, `[]` par défaut | autres formes : `{ form, furigana }` |
| `readings` | liste | oui, au moins 1 | voir section 4 |
| `linguistic` | objet | oui | voir section 6 |
| `nuance` | texte ou `null` | non | ce qui vaut pour l'unité lexicale entière |
| `tags` | liste | non | identifiants du registre des tags ; tags de lieu compris |
| `retired_sense_ids` | liste | non, `[]` par défaut | sens retirés de cette ENTRY, jamais réattribués |
| `senses` | liste | oui, au moins 1 | ordre significatif : le premier sens est montré par défaut |

Les kanji d'un mot ne sont pas stockés : ils se calculent à partir de `word`, la forme usuelle
(caractères kanji, sans doublon, dans l'ordre). Les formes de `writings` ne changent pas cette
relation.

## 4. Lecture

| Champ | Type | Règle |
|---|---|---|
| `kana` | texte | en kana seulement, sans « / » |
| `romaji` | texte | sans macron (GUIDE-CONTENU) |
| `furigana` | texte | furigana de la forme usuelle pour cette lecture ; texte de base hors `<rt>` égal à `word` |
| `default` | booléen | exactement une lecture vaut `true` |
| `note` | texte ou `null` | condition d'emploi de cette lecture |

## 5. Forme graphique

| Champ | Type | Règle |
|---|---|---|
| `form` | texte | différente de `word` et des autres formes |
| `furigana` | texte | pour la lecture par défaut ; texte de base hors `<rt>` égal à `form` |

## 6. Propriétés linguistiques

| Champ | Type | Obligatoire | Règle |
|---|---|---|---|
| `grammatical_class` | identifiant | oui | registre des classes grammaticales |
| `group` | texte ou `null` | oui | comportement morphologique : `ru`, `u`, `irrégulier`, `suru`, `i`, `na`, `nom` ; `null` quand rien n'est à conjuguer |
| `suru_compatible` | booléen | non, `false` | le nom forme un verbe avec する ; seulement avec `group: nom` ; distinct de `group: suru` (verbe écrit avec する) |
| `suffix` | booléen | non, `false` | propriété « suffixe » d'`A2-LING-v1` |
| `counter` | objet ou `null` | non | `{ counter_for: [<registre>] }`, au moins une valeur |

## 7. SENSE

| Champ | Type | Obligatoire | Règle |
|---|---|---|---|
| `id` | texte | oui | `<id de l'ENTRY>_s<m>`, unique ; numérotation monotone |
| `meaning.primary` | texte | oui | libellé montré par défaut |
| `meaning.alternatives` | liste | oui, peut être vide | autres traductions du **même** sens, distinctes du libellé |
| `category` | objet ou `null` | oui | `{ level_1, level_2, level_3 }`, `level_1` obligatoire, `level_3` seulement avec `level_2`, chemin existant ; `null` seulement pour un sens portant au moins une fonction linguistique |
| `semantic_type` | identifiant ou `null` | oui | `null` seulement si `category` est `null` |
| `dimensions` | liste | oui, peut être vide | `{ axis, pole }`, pôle de l'axe, un axe au plus une fois |
| `relations` | liste | oui, peut être vide | `{ type, target }` : type de `A2-REL-v1.1`, cible = identifiant de SENSE ; une relation symétrique ou inverse n'est notée qu'une fois |
| `linguistic_functions` | objet | oui | `{ grammatical: [], pragmatic_discourse: [] }` |
| `tags` | liste | non | jamais un tag déjà porté par l'ENTRY |
| `particles` | liste | non | valeurs de `particles.json` |
| `nuance` | texte ou `null` | non | ce qui vaut pour ce sens seulement |

Un sens ne porte pas d'exemple : les exemples vivent dans le registre de phrases.

## 8. Portée des nuances

| Information | Place |
|---|---|
| porte sur l'unité lexicale entière (écrit en kana à ce niveau, comportement général) | `nuance` de l'ENTRY |
| porte sur un sens | `nuance` du SENSE |
| porte sur une lecture (emploi de なん) | `note` de la lecture |
| se déduit des données (classe, kanji, forme) | nulle part |

## 9. Identifiants retirés

`data/vocab-retired.json` est une liste de `{ id, merged_into }`, où `merged_into` est
l'identifiant de l'ENTRY qui a repris l'entrée, ou `null`.

- Le prochain numéro libre est le plus grand numéro présent ou retiré, plus un.
- À la première publication, le fichier contient au moins `v_717` (réservé) et les entrées
  fusionnées.
- Lors d'une fusion, l'ENTRY canonique garde par défaut le plus petit numéro des entrées
  fusionnées ; toute exception est justifiée dans le journal de reconstruction.

## 10. Référence de phrase vers un sens

Le registre de phrases suit le format commun du `README.md` des données. Une référence au
vocabulaire peut préciser le sens :

```json
{ "text": "高い", "vocab": "v_188", "sense": "v_188_s2" }
```

`sense` doit appartenir à l'ENTRY de `vocab`. Le reste du registre (fichier, identifiants de
phrases) se décide avec son projet.

## 11. `senseId` dans les événements

`QUESTION_ANSWERED` peut porter `senseId`, sans aucun effet (addendum A2, D1).

```json
{ "questionId": "gen:meaning:v_188:s2",
  "target": [ { "type": "vocab", "id": "v_188" } ],
  "senseId": "v_188_s2",
  "correct": true }
```

L'identifiant de question de l'exemple n'est qu'une illustration : la forme des identifiants de
questions générées relève de l'étape 3.

---

## 12. Invariants du validateur

Le validateur A2-03 vérifie 20 erreurs, 4 avertissements et 2 informations sur le vocabulaire
et les identifiants de grammaire (addendum A4). Les contrôles actuels qui ne portent pas sur le
vocabulaire (grammaire, missions, lectures, expressions, particules, kana) restent inchangés.
Les avertissements `categorie-isolee` et `categorie-doublon` disparaissent avec les anciennes
catégories.

### Erreurs

| # | Contrôle |
|---|---|
| I1 | **Schéma strict** : tout champ hors schéma, à n'importe quel niveau (ENTRY, lecture, forme, propriétés linguistiques, SENSE, sous-objets), est une erreur |
| I2 | Identifiant d'ENTRY de forme `v_<n>`, unique dans tous les fichiers de vocabulaire, absent de `vocab-retired.json` |
| I3 | `level` parmi `N5` à `N1` et `hors_jlpt`, égal au niveau du fichier |
| I4 | `word` sans « / » ; au moins une lecture, exactement une `default: true` ; `kana` en kana seulement, sans « / » ; texte de base des furigana hors `<rt>` égal à `word` |
| I5 | `writings` : chaque `form` différente de `word` et des autres formes ; texte de base des furigana hors `<rt>` égal à `form` |
| I6 | `grammatical_class` dans son registre ; `group` parmi `ru`, `u`, `irrégulier`, `suru`, `i`, `na`, `nom` ou `null` ; `suru_compatible: true` seulement avec `group: nom` ; `counter_for` non vide et dans son registre |
| I7 | Au moins un SENSE ; identifiant `<id de l'ENTRY>_s<m>`, unique, absent de `retired_sense_ids` ; chaque identifiant de `retired_sense_ids` a la forme d'un sens de cette ENTRY |
| I8 | `meaning.primary` non vide ; alternatives non vides, distinctes entre elles et du libellé |
| I9 | `category` : chemin existant, `level_1` présent, `level_3` seulement avec `level_2` ; `category: null` seulement si le sens porte au moins une fonction linguistique |
| I10 | `semantic_type` dans son registre, ou `null` seulement si `category` est `null` |
| I11 | Dimension : axe et pôle dans le registre, pôle appartenant à l'axe, un axe au plus une fois par sens |
| I12 | Relation : type de `A2-REL-v1.1` ; cible = sens existant, différent du sens porteur ; aucun doublon, y compris une relation symétrique notée des deux côtés ou une relation et son inverse |
| I13 | Fonctions linguistiques dans le registre, chacune dans sa famille (`grammatical` ou `pragmatic_discourse`) |
| I14 | Tags (addendum A2, §6) : dans le registre ; jamais sur grammaire, activité, kanji, kana ; pas le même tag sur une ENTRY et l'un de ses sens ; pas de tag de lieu sur une expression ; `vocab_tags` de `lieux.json` existants |
| I15 | `particles` : valeurs de `particles.json` |
| I16 | Une unité, une ENTRY : deux ENTRY ne partagent jamais la même forme usuelle et la même lecture par défaut |
| I17 | `vocab-retired.json` : identifiants de forme `v_<n>`, sans doublon, absents du vocabulaire ; `merged_into` désigne une ENTRY existante ou vaut `null` |
| I18 | Aucun identifiant d'une autre famille (lieu, registre de langue, personnage, tag, entrée de registre A2-02, phrase, gabarit) ne commence par `v_` ou `g_` |
| I19 | Toute référence `vocab` (activités, expressions, phrases) désigne une ENTRY existante ; tout `sense` appartient à l'ENTRY référencée |
| I20 | Grammaire (A4) : identifiant de forme `g_<n>`, unique ; champ `level` présent, parmi `N5` à `N1`, égal au niveau du fichier ; aucun contrôle de préfixe de niveau |

### Avertissements

| # | Contrôle |
|---|---|
| A1 | Romaji avec macron (contrôle actuel, inchangé) |
| A2 | Kanji de la forme usuelle absent de tous les catalogues de kanji (contrôle actuel `kanji-inconnu`, appliqué aux kanji calculés) |
| A3 | `group: suru` sur une forme qui ne se termine pas par する (contrôle actuel `suru-sans-suru`) |
| A4 | Activité qui exige une leçon de niveau supérieur (partie 2, 2.7) : comparaison des champs `level` de l'activité et de la leçon, jamais de l'identifiant |

### Informations

| # | Contenu |
|---|---|
| N1 | Nombre d'ENTRY par niveau |
| N2 | Nombre de sens sans aucune phrase dans le registre de phrases (une ligne de synthèse, actif quand le registre existe) |

### Côté `learning` (`src/learning/events.js`)

| # | Contrôle |
|---|---|
| E1 | Identifiant de référence `vocab` de forme `^v_[1-9][0-9]*$` |
| E2 | `senseId` facultatif dans `QUESTION_ANSWERED`, de forme `^v_[1-9][0-9]*_s[1-9][0-9]*$` |
| E3 | `senseId` admis seulement si `target` contient exactement une référence `vocab`, et s'il commence par l'identifiant de cette référence suivi de `_s` ; sinon l'événement est rejeté |
| E4 | `senseId` n'a aucun effet sur l'état, le SRS, les faiblesses, le budget ni le résumé quotidien (test de non-effet) |
| E5 | Identifiant de référence `grammar` de forme `^g_[1-9][0-9]*$` |

### Quand chaque contrôle s'applique

| Contrôles | Mise en service |
|---|---|
| I18 (préfixe `g_`), I20, A4, E5 | tâche 1 bis (réidentification de la grammaire) |
| I1 à I17, I18 (préfixe `v_`), I19, A1 à A3, N1 | écrits et testés en A2-03 ; activés sur `data/` à la publication d'A2-04 |
| E1 à E4 | publication d'A2-04 |
| N2 | registre de phrases |
