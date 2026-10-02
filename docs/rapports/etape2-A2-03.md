# Ocha v2 — Rapport final d'A2-03 · Validateur du schéma lexical

**Date** : 2026-10-02
**Périmètre** : étape 2, tâche 4 (A2-03), sous-tâches 4.1 à 4.5. Rapports intermédiaires :
`etape2-tache4-1-socle.md`, `etape2-tache4-2-entry.md`, `etape2-tache4-3-sense.md`,
`etape2-tache4-4-references.md`.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **380 tests, tous verts** (315 avant A2-03, 65 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés depuis le début de l'étape 2) |
| `node tools/check-layers.mjs` | aucune violation |
| Audit de couverture | 81 sites d'émission sur 81 font échouer au moins un test quand on les neutralise |
| Données, `learning`, `events.js` | non modifiés par A2-03 |

**Ce que A2-03 n'affirme pas.** Les invariants I1 à I19 sont implémentés et éprouvés **sur des
jeux d'essai**. Ils ne sont **pas** validés sur le vocabulaire N5, qui reste à l'ancien format
jusqu'à la publication d'A2-04.

## 2. Ce qui a été construit

| Module | Rôle |
|---|---|
| `tools/lexicon/schema.mjs` | description déclarative du schéma (seule source exécutable), valeurs, vérificateur générique `checkShape`, liste unique des registres |
| `tools/lexicon/registries.mjs` | index des huit registres ; catégories résolues par chemin complet seulement |
| `tools/lexicon/entry.mjs` | ENTRY : I1 à I6, I16, I17, A1 à A3, N1 ; analyseur structurel des furigana |
| `tools/lexicon/sense.mjs` | SENSE : I7 à I11, I13 à I15 |
| `tools/lexicon/references.mjs` | I12, I19, tags des expressions et des lieux |
| `tools/lexicon/index.mjs` | `validateLexicon`, fonction pure |
| `tools/lexicon-adapter.mjs` | **adaptateur**, hors du cœur : dépendances lues dans `data/`, extraction des références |

**Contrat final de `validateLexicon`** (aucune lecture de fichier) :

| Clé | Obligatoire | Contenu |
|---|---|---|
| `files` | oui | `[{ file, level, entries }]`, `level` parmi `N5`… `N1`, `hors_jlpt` |
| `registries` | oui | contenu des huit registres |
| `retired` | oui | contenu de `vocab-retired.json` |
| `knownKanji` | oui | kanji connus (A2) |
| `particles` | oui | valeurs de `particles.json` (I15) |
| `references` | non | `[{ where, vocab, sense? }]`, déjà extraites (I19) |
| `expressions` | non | seul `tags` est examiné (I14) |
| `lieux` | non | futur format, seul `vocab_tags` est examiné (I14) |

**Adaptateur** (`tools/lexicon-adapter.mjs`) :
- `readLexiconDependencies(dataDir, { includeLieux })` rend les registres, `knownKanji`
  (catalogues de tous les niveaux et dictionnaire), `particles` et les expressions. Les lieux ne
  sont lus que sur demande explicite, sans aucune détection du format.
- `readRetired(chemin)`.
- `readActivities(dataDir, niveaux)` et `extractReferences({ activities, expressions })`. Ce
  dernier suit exactement le parcours de `validate-data` et ne produit **jamais** de `sense`.
  Sur les vraies données, il retrouve chaque occurrence d'un identifiant de mot, ni plus ni
  moins.

## 3. Les invariants, en trois états

| Invariant | Implémenté | Actif sur `data/` aujourd'hui | Utilisé par la reconstruction (dès A2-04.0) | Activation canonique |
|---|---|---|---|---|
| I1 à I17, I19 (vocabulaire) | ✅ `tools/lexicon/` | non | oui, sur la sortie de l'espace de travail | publication d'A2-04 |
| I12 (relations) | ✅ | non | oui | publication d'A2-04 |
| I14 sur les expressions | ✅ | non | oui, si l'appelant fournit `expressions` | publication d'A2-04 |
| I14, futur format des lieux (`vocab_tags`) | ✅ | non | oui, quand le nouveau `lieux.json` existe dans l'espace de travail | publication d'A2-04 |
| A1, A2, A3, N1 | ✅ | non | oui | publication d'A2-04 |
| I18, préfixe `v_` hors vocabulaire | ✅ `validate-data` | **oui** (4.1) | — | déjà actif |
| Libellés de registre sans espaces autour | ✅ `validate-data` | **oui** (4.1) | — | déjà actif |
| I18 pour `g_`, I20, A4, E5 | ✅ (tâche 1 bis) | **oui** | — | déjà actif |
| E1 à E4 (`events.js`, `senseId`) | non, prévu | non | — | publication d'A2-04, avec `events.js` |
| N2 (sens sans phrase) | non, prévu | non | — | registre de phrases |

## 4. Plan de bascule, pour le commit de publication d'A2-04

Une seule opération, dans le même commit que les données reconstruites :

1. **`validate-data` appelle le validateur lexical** :
   - `files` : `data/n5/vocab.json` (`N5`) et `data/vocab-hors-jlpt.json` (`hors_jlpt`) ;
   - `retired` : `data/vocab-retired.json` ;
   - dépendances : `readLexiconDependencies(data, { includeLieux: true })` ;
   - `references` : `extractReferences` sur les missions et lectures de `VALIDATED_LEVELS` et sur
     les expressions ;
   - son rapport est fusionné avec celui de `validate-data`.
2. **`validate-data` retire** l'ancien contrôle du vocabulaire (`checkVocab`), les avertissements
   `categorie-isolee` et `categorie-doublon`, les contrôles de `kanji_list` et les anciennes
   valeurs non morphologiques de `group`.
3. **`lieux.json`** passe de `vocab_categories` à `vocab_tags` ; `checkLieux` suit.
4. **Références remappées** dans les missions, lectures et expressions (`n5_v_…`, `hj_v_…` →
   `v_…`).
5. **`events.js`** : E1 à E4, avec leurs tests.
6. **Sections de format** de `README.md` et `GUIDE-CONTENU.md` réécrites ; `ETAT-ACTUEL.md`
   (l'ancienne application cesse de fonctionner sur `ocha-v2`).

D'ici là, un test vérifie que `validate-data` n'importe ni n'appelle le validateur lexical et
garde `checkVocab`.

## 5. Audit de couverture

**Mécanique.** Chacun des 81 appels qui émettent un problème dans `tools/lexicon/` a été
neutralisé à tour de rôle, et la suite de tests relancée.
- **76 sites étaient attrapés d'emblée.**
- **5 ne l'étaient pas** : de petits trous de test, maintenant comblés.
  - `index.mjs` (nom de fichier vide) : le test supprimait la clé, ce qui déclenchait aussi le
    contrôle des clés ;
  - `references.mjs`, trois sites : élément non textuel dans une liste de tags d'expression ou de
    lieu, lieu qui n'est pas un objet ;
  - `schema.mjs` : ENTRY ou SENSE qui n'est pas un objet.
- **Après comblement, 81 sur 81.**

**Permanent.** `tests/lexicon/coverage.test.js` relie chaque invariant à ses codes et vérifie :
- qu'aucun code émis n'est orphelin ;
- qu'aucun code rattaché n'est fantôme ;
- que chaque code est attendu par au moins un test.

**Sabotages de 4.5** (adaptateur et test de couverture) : 14, dont un trou révélé et comblé.
- **X3** : ignorer les catalogues de niveau ne faisait échouer aucun test, car tous les kanji des
  catalogues figurent aussi dans le dictionnaire. Un test construit maintenant un petit dossier
  de données où un catalogue contient un kanji absent du dictionnaire.

**Bilan d'A2-03.**

| Sous-tâche | Nouveaux tests | Sabotages | Trous révélés |
|---|---|---|---|
| 4.1 socle | 11 | 13 | aucun |
| 4.2 ENTRY | 20 | 26 | un défaut de code (rapport gelé), corrigé |
| 4.3 SENSE | 13 | 22 | aucun |
| 4.4 références | 11 | 19 | une redondance de code, supprimée |
| 4.5 clôture | 10 | 14, plus l'audit de 81 sites | 6 trous de test, comblés |

## 6. Anomalie de données relevée

Le dictionnaire `data/kanji_jouyou_fr.json` contient cinq clés qui sont des mots et non des
kanji : 山羊, 生活, 措置, 継続, 迅速.
- L'adaptateur ne retient que les clés d'un seul caractère.
- Le fichier n'est pas modifié : A2-03 ne touche aucune donnée.
- À corriger dans une tâche de données, consignée dans `ETAT-ACTUEL.md`.

## 7. Pour A2-04

- **A2-04.0** : l'outil d'assemblage appelle `validateLexicon` avec les dépendances de
  l'adaptateur et le lexique de l'espace de travail. `retired` vient du fichier de l'espace de
  travail.
- **Fixtures** : celles d'A2-03 (高い…) sont illustratives et ne décident rien des vraies
  entrées.
- **Publication** : le plan de bascule ci-dessus.
