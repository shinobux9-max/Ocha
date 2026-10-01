# Ocha v2 — Rapport de l'étape 2 · tâche 1 bis · Réidentification de la grammaire

**Date** : 2026-10-02
**Référence** : addendum A4 (`docs/conception/addendum-A4-identifiants.md`) ; contrôles E5, I18
(préfixe `g_`), I20 et A4 de `docs/conception/schema-A2-01.md`.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **268 tests, tous verts** (262 avant la tâche, 6 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant la tâche) |
| `node tools/check-layers.mjs` | aucune violation |
| `node --check` | tous les fichiers JavaScript modifiés |
| Identifiants `n5_g_…` restants | uniquement dans les sources figées : `data/n5/exemples.json`, `data/curriculum/n5.json` |

## 2. Modifications

| Fichier | Modification |
|---|---|
| `data/n5/grammar.json` | 75 leçons : `n5_g_<n>` → `g_<n>` (numéro conservé), champ `"level": "N5"` ajouté juste après `id` ; aucune autre ligne modifiée |
| `data/n5/particles.json` | 20 `grammar_id` remappés (fins de ligne CRLF du fichier conservées) |
| `data/n5/lectures.json` | 35 références remappées |
| `data/n5/missions.json` | 6 références remappées |
| `data/expressions.json` | 2 références remappées |
| `src/learning/events.js` | forme des références `grammar` : `^g_[1-9][0-9]*$` (E5) |
| `tools/validate-data.mjs` | voir section 3 |
| `tests/learning/*.test.js`, `tests/store/contract*.js`, `tests/tools/validate-data.test.js` | identifiants `n5_g_<n>` → `g_<n>` ; champ `level` dans le jeu d'essai ; trois ordres de tri attendus corrigés (`g_…` se range avant `kana_…`) |
| `tests/learning/events.test.js` | nouveau test : formes admises et refusées |
| `tests/tools/validate-data.test.js` | quatre nouveaux tests (forme, champ `level`, niveau supérieur, préfixe réservé) |
| `tests/tools/identifiers.test.js` | nouveau : garde-fou statique |

Non modifiés, comme décidé : `data/n5/exemples.json`, `data/concepts/n5.json`,
`data/curriculum/n5.json`, `data/mapping.json` (sources figées), et `data/n4/grammar.json` (N4 hors
périmètre, ancien format, `n4_g_…`).

## 3. Validateur

- **Plus aucun niveau lu dans un identifiant.** `levelOfId` est supprimé. Le validateur garde, pour
  chaque élément, le niveau du fichier où il est défini.
- **Niveau d'une leçon** (avertissement « grammaire d'un niveau supérieur », A4) : son champ
  `level` ; à défaut, le niveau de son fichier. Ce repli ne sert que pour les niveaux hors
  périmètre, dont les leçons n'ont pas encore de champ `level`.
- **Niveau d'une activité** : son champ `level` ; à défaut, son fichier.
- **Périmètre des catégories du vocabulaire** : lu à partir du fichier, et non plus du préfixe de
  l'identifiant. Le comportement est identique.
- **Nouveaux codes d'erreur** :
  - `forme-id` : identifiant de leçon qui n'a pas la forme `g_<n>` ;
  - `niveau-invalide` : champ `level` absent ou hors de `N5` à `N1` ;
  - `niveau-fichier` : champ `level` différent du fichier ;
  - `prefixe-reserve` : identifiant de lieu, registre, personnage, mission, lecture, question ou
    expression commençant par `g_`.
- Le préfixe `v_` sera réservé avec A2-03, comme prévu par le schéma.

## 4. Sabotages

Chaque règle a été cassée volontairement ; au moins un test doit échouer.

| # | Sabotage | Attrapé par |
|---|---|---|
| S1 | `events.js` : ancienne forme `n5_g_` rétablie | 26 tests de `learning` |
| S2 | `events.js` : forme trop lâche (`g_.+`) | test des formes (refuse `g_08`, `g_8a`…) |
| S3 | contrôle de forme `g_<n>` retiré | test I20 (forme) |
| S4 | champ `level` absent ou invalide accepté | test I20 (`level`) |
| S5 | champ `level` différent du fichier accepté | test I20 (`level`) |
| S6 | **niveau d'une leçon déduit de l'identifiant** | test « niveau supérieur » : `g_200` ne dit rien de son niveau, l'avertissement disparaît |
| S7 | champ `level` de l'activité ignoré | test « niveau supérieur » (activité déclarée N4) |
| S8 | comparaison des niveaux inversée | deux tests |
| S9 | préfixe `g_` non réservé | test I18 |
| S10 | contrôle de préfixe de niveau `${niveau}_g_` réintroduit | garde-fou statique et cinq autres tests |
| S11 | niveau d'une leçon lu dans le fichier, champ ignoré | test ajouté (voir ci-dessous) |

**Trou révélé et comblé (S11).** Dans les niveaux validés, I20 impose que le champ `level` égale le
fichier : lire l'un ou l'autre donne le même résultat, et aucun test ne distinguait les deux. La
règle A4-2 dit pourtant que le champ prime. Un cas a été ajouté dans un niveau hors périmètre, où
les deux peuvent diverger : une leçon rangée dans le fichier N4 mais déclarée N5 n'est pas d'un
niveau supérieur pour une activité N5.

**Sabotages des données**, vérifiés par `node tools/validate-data.mjs` :

| # | Sabotage | Erreur |
|---|---|---|
| D1 | une référence `n5_g_8` oubliée dans une lecture | `ref-inexistante` |
| D2 | champ `level` retiré d'une leçon | `niveau-invalide` |
| D3 | une leçon restée en `n5_g_3` | `forme-id` |
| D4 | `grammar_id` d'une particule non remappé | `ref-inexistante` |
| D5 | leçon déclarée N4 dans le fichier N5 | `niveau-fichier` |

## 5. Points à signaler

- **Page de test du navigateur.** `tests/store/contract-cases.js` est partagé avec
  `tests/browser/store-contract.html`. Seules les clés d'exemple (`g_10`, `g_8`) et l'ordre attendu
  changent, mais la page doit être relancée : 20 / 20 attendu.
- **Ancienne application.** Elle ne trouve plus les leçons sur `ocha-v2`, comme décidé (Q1 A).
- **Le garde-fou statique** interdit la chaîne `_g_` dans `src/` et `tools/`. Il n'empêche pas
  toute déduction imaginable du niveau ; c'est le test S6, comportemental, qui le prouve pour le
  validateur.
