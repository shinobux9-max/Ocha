# Ocha — Document de conception v1

## Addendum A4 · Identifiants indépendants du niveau

**Statut** : 🔒 validé le 2026-10-02.

**Objet** : séparer l'identité des éléments de leur niveau pédagogique. Complète l'addendum A3
(`addendum-A3-modele-lexical.md`), qui le fait pour le vocabulaire, en l'étendant à la
grammaire, hors du périmètre d'A2.

---

## 1. Principe

L'identifiant dit ce qu'est un élément ; le champ `level` dit où il se situe dans la
progression. Aucun comportement d'Ocha n'extrait le niveau d'un identifiant d'élément.

| Famille | Identifiant | Niveau |
|---|---|---|
| Vocabulaire | `v_188` | champ `level` (addendum A3) |
| Grammaire | `g_8` | champ `level` (cet addendum) |
| Expression | `ex_3` | champ `level` (déjà le cas) |
| Kanji | le caractère | catalogue de kanji du niveau (déjà le cas) |
| Kana | `kana_あ` | sans niveau |
| Mission, lecture | `n5_m_1`, `n5_l_5` | **dans l'identifiant, volontairement** : ce sont des activités construites pour un niveau, pas des éléments suivis |

## 2. Décisions

### A4-1 · Identifiants de grammaire

- Une leçon de grammaire s'identifie par `g_<n>` (`^g_[1-9][0-9]*$`).
- Le numéro historique est conservé : `n5_g_<n>` devient `g_<n>`, pour les 75 leçons N5, sans
  exception.
- Chaque leçon reçoit un champ `level` obligatoire, égal au niveau de son fichier.

### A4-2 · Aucun niveau lu dans un identifiant

- L'avertissement « activité dont `requires` contient de la grammaire d'un niveau supérieur »
  (partie 2, 2.7) compare le champ `level` de l'activité à celui de la leçon exigée.
- Le validateur ne contrôle plus de préfixe de niveau sur la grammaire.

### A4-3 · Stabilité

- À partir de la première publication des données canoniques Ocha v2, l'identifiant d'une leçon
  est immuable et jamais réattribué.
- Si une leçon devait un jour être retirée, le même mécanisme que pour le vocabulaire
  s'applique (fichier d'identifiants retirés, créé au premier retrait).

### A4-4 · Préfixes réservés

Aucun identifiant d'une autre famille (lieu, registre de langue, personnage, tag, entrée de
registre A2-02, phrase, gabarit) ne commence par `v_` ou `g_`.

### Hors de cet addendum

Un même point de grammaire présent dans plusieurs niveaux JLPT n'est pas traité ici : la
question se posera à l'intégration du N4, où il faudra décider si ce sont une ou deux leçons.

## 3. Mise en œuvre

La réidentification de la grammaire est mécanique et ne dépend pas de la reconstruction du
vocabulaire. Elle se fait en un seul commit (étape 2, tâche 1 bis) : `grammar.json` (identifiants
et champ `level`), les références actives des données (`particles.json`, `lectures.json`,
`missions.json`, `expressions.json`), `src/learning/events.js`, `tools/validate-data.mjs` et les
tests concernés. `exemples.json` et les fichiers de l'ancienne application ne sont pas modifiés :
ce sont des sources figées.

## 4. Textes précisés

| Texte | Précision |
|---|---|
| Partie 1, 1.1 | grammaire : `g_<n>` ; exemple `g_8` |
| Partie 2 (2.3 à 2.8, 2.10), partie 5, partie 8, addendum A1 | les identifiants `n5_g_<n>` cités se lisent `g_<n>`, même numéro ; `gen:cloze:n5_g_8:ex2` se lit `gen:cloze:g_8:ex2` |
| Partie 2, 2.7 | l'avertissement de niveau compare les champs `level` (A4-2) |
| `README.md`, `GUIDE-CONTENU.md` | identifiants de grammaire et champ `level` des leçons |
| `REGLES-CONSTRUCTION.md` §5 | version 2.3 : `g_<n>` au lieu de `n5_g_…` |

---

## Décisions de cet addendum

| Point | Décision |
|---|---|
| A4-1 · `g_<n>`, numéro conservé, champ `level` | validé |
| A4-2 · Aucun niveau lu dans un identifiant d'élément | validé |
| A4-3 · Immuable après la première publication, jamais réattribué | validé |
| A4-4 · Préfixes `v_` et `g_` réservés | validé |
| Missions et lectures gardent leur niveau dans l'identifiant | validé |
