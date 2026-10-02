# Ocha v2 — Rapport de l'étape 2 · A2-03 · 4.4 · Références transversales

**Date** : 2026-10-02
**Référence** : autorisation de 4.4 du 2026-10-02 ; `schema-A2-01.md`, §12 (I12, I14, I19) ;
addendum A2, D1 et D2.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **370 tests, tous verts** (359 avant, 11 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| Données, `learning` | non modifiés ; `expressions.json` et `lieux.json` intacts ; le validateur lexical n'est toujours pas branché sur `data/` |

Contrôles en place : I12, I19, I14 hors du vocabulaire (expressions, futur format des lieux).
Avec 4.2 et 4.3, tous les invariants prévus pour A2-03 sont couverts. Reste 4.5 : point
d'entrée, audit de couverture et clôture.

## 2. Fichiers

| Fichier | Contenu |
|---|---|
| `tools/lexicon/references.mjs` | **nouveau** : relations, références, tags des expressions et des lieux |
| `tools/lexicon/index.mjs` | contrat d'entrée augmenté de `references`, `expressions`, `lieux` (facultatifs) |
| `tests/lexicon/references.test.js` | **nouveau** : 9 tests |
| `tests/lexicon/purity.test.js` | **nouveau** : 2 tests de pureté |
| `tests/lexicon/sense.test.js` | test de frontière de 4.3 reformulé |

## 3. I12 · relations

- **Index global** : tous les SENSE de tous les fichiers fournis (identifiant → ENTRY).
- **Contrôles** :
  - type au registre (`relation-inconnue`) ;
  - cible = un SENSE existant, ni une ENTRY, ni un sens inexistant (`relation-cible`) ;
  - cible différente du sens porteur (`relation-cible`).
- **Doublons** (`relation-doublon`), par une clé canonique qui suit le registre :
  - symétrique : la paire est triée, l'ordre est indifférent ;
  - paire inverse : `A part_of B` et `B has_part A` donnent la même clé (écrite avec le type le
    plus petit dans l'ordre alphabétique, sens inversé si besoin) ;
  - dirigée sans inverse (`compared_to`, `corresponds_to`) : l'orientation compte, `A → B` et
    `B → A` sont deux liens distincts.
- **Le lien miroir n'est jamais exigé.** Une relation symétrique notée d'un seul côté est valide.
  La noter des deux côtés est un doublon : c'est la règle d'I12 (« y compris une relation
  symétrique notée des deux côtés »), qui découle de la même logique, une seule écriture par
  lien.

## 4. I19 · références

- **Forme** : les références arrivent **déjà extraites**, en une liste plate
  `{ where, vocab, sense? }` (`REFERENCE_SHAPE`, contrôlée strictement). Le validateur ne connaît
  ni la structure des missions et des lectures, ni celle du futur registre de phrases : c'est le
  « petit mécanisme générique » demandé, sans schéma de phrase.
- **Contrôles** :
  - `vocab` désigne une ENTRY du lexique (`reference-inconnue`) ;
  - `sense`, s'il est présent, doit être un sens existant **de cette ENTRY** (`reference-sens`).
- **D1 intact** : une référence sans `sense` est une référence pédagogique à l'ENTRY ; `sense` la
  précise sans créer d'unité de progression.
- **Extraction** : extraire ces références des activités et des expressions revient à l'appelant.
  `validate-data` parcourt déjà chacune d'elles ; le branchement est prévu pour 4.5 et la
  publication d'A2-04.

## 5. Tags hors du vocabulaire (I14, D2)

**Expressions** : seul le champ `tags` est examiné, et il est facultatif.
- Absent : rien à contrôler. Les expressions actuelles n'en ont pas et passent ; un test vérifie
  qu'A2-03 n'en a ajouté aucun.
- Présent : liste de tags connus (`tag-inconnu`), sans doublon (`tag-doublon`), jamais de nature
  `lieu` (`tag-lieu-expression`), puisque `places` est le champ dédié aux lieux.

**Lieux, futur format** : seul `vocab_tags` est examiné.
- C'est une liste (`lieu-format` sinon, ce qui est le cas de l'ancien format).
- Ses tags existent (`tag-inconnu`) et sont de nature `lieu` (`lieu-tag-nature`), sans doublon.
- Le vrai `lieux.json` n'est pas migré, et un test vérifie qu'il garde `vocab_categories`.

**Le préfixe n'intervient jamais.** Les tests utilisent un registre augmenté de tags
synthétiques :
- `lieu_trompeur`, préfixé `lieu_` mais de nature `theme` : accepté sur une expression, refusé
  dans un lieu ;
- `pres_de_la_gare`, de nature `lieu` sans préfixe : refusé sur une expression, accepté dans un
  lieu.

Les sabotages qui déduisent la nature du préfixe, côté expressions comme côté lieux, sont
attrapés.

## 6. Pureté

Tout arrive par le contrat d'entrée ; aucun module ne lit de fichier. Un nouveau test en fait une
règle :
- seul `registries.mjs` importe `node:fs`, pour l'aide `readRegistries` offerte à l'appelant ;
- aucun autre module n'importe `node:fs`, n'utilise `fetch`, `require` ou d'import dynamique ;
- aucun module du validateur n'appelle `readRegistries`.

Le sabotage qui fait lire les références sur le disque est attrapé.

## 7. Sabotages

| # | Sabotage | Attrapé |
|---|---|---|
| R1 à R3 | type de relation, cible, relation vers soi-même non contrôlés | oui |
| R4 | relation symétrique : ordre conservé | oui |
| R5 | paire inverse non canonisée | oui |
| R6 | relation dirigée traitée comme symétrique | oui |
| R7 | lien miroir exigé | oui |
| R8 | ENTRY référencée non contrôlée | oui |
| R9 | appartenance du sens à l'ENTRY ignorée | oui (après simplification, voir ci-dessous) |
| R10 | sens référencé non contrôlé | oui |
| R11 à R13 | tag de lieu sur une expression ; nature déduite du préfixe (expressions, lieux) | oui |
| R14 | tag inconnu accepté dans un lieu | oui |
| R15 | références lues sur le disque | oui (pureté) |
| R16 à R18 | références, lieux non contrôlés ; forme des références non contrôlée | oui |

**Une redondance supprimée.** Le premier R9 (retirer le contrôle « le sens commence par
l'identifiant de l'ENTRY ») n'a fait échouer aucun test. Ce n'était pas un trou : le contrôle
d'existence (« ce sens appartient-il, dans l'index, à cette ENTRY ? ») couvrait déjà le cas,
ainsi qu'un identifiant mal formé. J'ai gardé ce seul contrôle. Le saboter (existence sans
appartenance, ou aucun contrôle) fait échouer les tests.

Aucun trou révélé.

## 8. Pour 4.5

Pour brancher `validateLexicon` sur `data/` à la publication d'A2-04, l'appelant devra fournir :
- `knownKanji` et `particles` ;
- les **références extraites** des activités et des expressions ;
- `expressions` et `lieux`.

Construire ces entrées à partir de `data/`, dans l'outil d'assemblage comme dans
`validate-data`, est l'objet naturel du point d'entrée de 4.5.
