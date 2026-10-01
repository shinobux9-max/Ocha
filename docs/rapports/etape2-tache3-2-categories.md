# Ocha v2 — Rapport de l'étape 2 · A2-02 · 3.2 · Catégories

**Date** : 2026-10-02
**Référence** : autorisation de 3.2 du 2026-10-02 (structure de l'arbre, identité locale) ;
arbitrage d'A2-02 (décisions 2 et 3).

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **304 tests, tous verts** (298 avant, 6 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| `docs/conception/a2/A2-L3-v1.md` | identique, octet pour octet, au fichier du Project |
| Fichiers créés dans `data/registries/` | `categories.json` seulement ; ni `grammatical-classes.json`, ni `counters.json`, ni `tags.json` |

## 2. Fichiers

| Fichier | Contenu |
|---|---|
| `docs/conception/a2/A2-L3-v1.md` | copie figée du snapshot des catégories |
| `docs/conception/a2/README.md` | ligne du snapshot L3 ajoutée |
| `data/registries/categories.json` | **nouveau** : l'arbre, 32 / 225 / 585 |
| `tools/validate-data.mjs` | `checkCategoryTree`, `categories.json` ajouté à `REGISTRY_SOURCES` |
| `tests/tools/validate-data.test.js` | catégories dans le jeu d'essai, 4 nouveaux tests |
| `tests/registries/transcription.test.js` | 2 nouveaux tests |

## 3. `categories.json`

- **Structure** autorisée : `{ source: "A2-L3-v1", levels: [{ id, label, children: [{ id, label,
  children: [{ id, label }] }] }] }`.
  - Un niveau 2 sans niveau 3 a `children: []` (56 cas, tous valides).
  - Un niveau 3 n'a pas de clé `children`.
- **Transcription** de la section 5 du snapshot : titres `### NN. …` pour le niveau 1, lignes
  `- Niveau 2 → N3 ; N3 ; …` ou `- Niveau 2`. Le format du snapshot est entièrement régulier
  (aucune ligne atypique ; les 32 titres concordent avec la liste de la section 4).
- **Identifiants** : la règle mécanique de 3.1, appliquée une fois puis figée.
- **Identité locale** : `mois`, `membres`, `interpretation`, `radio → radio`, `sejour → sejour`,
  `animaux` (sous Monde naturel et sous Comptage & compteurs) apparaissent tels quels, sans
  désambiguïsation ni identifiant de chemin.
- Les nœuds de niveau 3 tiennent sur une ligne, pour que le fichier (2 076 lignes) reste lisible
  dans VS Code.

## 4. Contrôles

**`validate-data`** (`checkCategoryTree`) :
- racine `{ source, levels }`, `source` égale à `A2-L3-v1`, `levels` non vide ;
- clés exactes à chaque niveau : `id`, `label`, `children` aux niveaux 1 et 2 ; `id`, `label`
  au niveau 3 ;
- `children` est une liste, **vide permise** ;
- identifiants valides et non réservés, libellés non vides ;
- **unicité parmi les frères seulement** : jamais entre parents différents, ni avec le parent.

Le fichier est obligatoire, comme les quatre registres de 3.1.

Le validateur ne résout aucun nœud par son identifiant isolé. Résoudre un chemin (L1, L2, L3)
pour le vocabulaire relève d'A2-03.

**Tests de transcription** :
- l'arbre entier du registre (libellés et ordre, à chaque niveau) est comparé à celui que
  l'analyseur du test reconstruit à partir du snapshot ;
- comptes relevés à la main : 32, 225, 585, 56 ;
- la liste de la section 4 est égale aux niveaux 1 ;
- chaque identifiant est la forme mécanique de son libellé ;
- aucun chemin en double, alors que des identifiants isolés se répètent ;
- les répétitions attendues existent à leurs chemins exacts.

## 5. Sabotages

| # | Sabotage | Attrapé par |
|---|---|---|
| C1 | libellé de niveau 3 altéré | transcription |
| C2 | niveau 3 supprimé | transcription |
| C3 | deux niveaux 2 intervertis | transcription |
| C4 | deux niveaux 1 intervertis | transcription |
| C5 | `children` retiré d'un niveau 2 vide | transcription et `validate-data` |
| C6 | répétition « désambiguïsée » (`mois_calendrier`) | transcription (identifiant mécanique) |
| C7 | niveau 3 déplacé sous un autre parent | transcription |
| C8 | doublon parmi des frères | transcription et `validate-data` |
| C9 | version de source erronée | transcription et `validate-data` |
| C10 | niveau 3 avec `children` | transcription et `validate-data` |
| K1 | unicité globale au lieu de locale | jeu d'essai et vraies données refusés |
| K2 | unicité entre frères non contrôlée | test d'unicité |
| K3 | niveau 2 vide refusé | jeu d'essai et vraies données refusés |
| K4 | clés du niveau 3 non contrôlées | test des clés |
| K5 | version de source non contrôlée | test de la racine |
| K6 | catégories retirées de la liste des registres | test « fichiers obligatoires » |

Le premier sabotage K1 que j'avais écrit accumulait les identifiants d'une validation à
l'autre : il échouait à cause de cette fuite d'état, pas de la règle. Je l'ai refait avec une
unicité globale propre à une seule validation ; il est attrapé pour la bonne raison (les
répétitions légales du jeu d'essai et des vraies données sont alors refusées).

Aucun trou révélé.

## 6. Points à signaler

- Le validateur n'impose pas qu'un niveau 1 ait au moins un niveau 2 : aucune règle ne le
  demande, et le snapshot en donne toujours. Je ne l'ai pas inventé.
