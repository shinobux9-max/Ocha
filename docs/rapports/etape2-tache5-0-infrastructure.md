# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.0 · Infrastructure de reconstruction

**Date** : 2026-10-02
**Référence** : arbitrage du découpage d'A2-04 et autorisation de 5.0 du 2026-10-02.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **409 tests, tous verts** (380 avant, 29 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| `node tools/reconstruction/run.mjs verify` | sources conformes au manifeste |
| `node tools/reconstruction/run.mjs assemble` | 0 ENTRY, 718 entrées écartées (aucune décision), 1 identifiant retiré (`v_717`) |
| Décisions lexicales | **aucune** : aucun fichier de lot, journal vide |
| `data/`, `src/` | non modifiés |

## 2. Fichiers

| Fichier | Rôle |
|---|---|
| `reconstruction/a2-04/README.md` | description de l'espace de travail et des commandes |
| `reconstruction/a2-04/sources/` | copies figées de `data/n5/vocab.json`, `data/vocab-hors-jlpt.json`, `data/lieux.json`, `data/n5/exemples.json`, et `manifest.json` (SHA-256) |
| `reconstruction/a2-04/place-tags.json` | correspondance décidée lieu → tag (registre-des-tags.md, §5) |
| `reconstruction/a2-04/sources/.gitattributes` | aucune conversion de fin de ligne sur les copies figées |
| `reconstruction/a2-04/journal.json` | journal, vide |
| `reconstruction/a2-04/lots/README.md` | aucun lot avant 5.1 |
| `tools/reconstruction/rules.mjs` | frontière et listes fermées |
| `tools/reconstruction/mechanical.mjs` | couche mécanique |
| `tools/reconstruction/decisions.mjs` | contrôle des lots et du journal |
| `tools/reconstruction/assemble.mjs` | assembleur, validation par le validateur lexical, remappage des références |
| `tools/reconstruction/sources.mjs` | empreintes et lecture des sources |
| `tools/reconstruction/report.mjs` | rapport de relecture d'un lot (Markdown généré) |
| `tools/reconstruction/run.mjs` | commandes `verify`, `report`, `assemble` |
| `tests/reconstruction/` | `helpers.mjs` et 4 fichiers de tests (29 tests) |

## 3. La frontière, telle qu'implémentée

| Champ | Origine | Règle (`rules.mjs`, `mechanical.mjs`) |
|---|---|---|
| `id` | mécanique | `n5_v_<n>` → `v_<n>` ; `hj_v_1` → `v_718`, `hj_v_2` → `v_719` ; `v_717` retiré |
| `level` | mécanique | `N5` ou `hors_jlpt` selon le fichier source |
| `word` | mécanique sauf exception | exception : forme avec « / », ou graphie fautive listée (明い) |
| `readings` | mécanique sauf exception | une lecture reprise, `default: true`, `note: null` ; exceptions : lecture avec « / » (jamais découpée), lecture hors kana, furigana incohérents, forme en exception |
| `grammatical_class` | mécanique sauf exception | 15 nombres → `numeral` par liste ; table des 17 anciens types ; exceptions : 45 entrées listées et les types sans classe par défaut (`adjectif`, `adverbe / pronom`) |
| `group` | mécanique sauf exception | repris s'il est compatible avec la classe, `null` pour une classe sans groupe ; incompatibilité ou classe en exception : décision |
| `writings`, `suru_compatible`, `suffix`, `counter`, `nuance`, `tags`, `senses` | humain | toujours décidés explicitement |
| tags de lieu | candidats mécaniques, donnée humaine | candidats par `place-tags.json`, jamais canoniques sans décision |
| particules d'un sens unique | mécanique | reprises des sources ; plusieurs sens : décidées par sens |
| identifiants de sens | mécanique | `<id>_s<m>` dans l'ordre décidé |
| fusions, retraits, ajouts | humain, conséquences mécaniques | journal obligatoire ; plus petit numéro survivant sauf exception journalisée ; ajouts au numéro calculé |

**Sur les vraies sources**, la couche mécanique donne :
- 718 entrées, dont 60 dans le lot 0 ;
- 210 entrées avec des tags de lieu **candidats** ;
- exceptions : 58 classes (45 listées et 13 de l'ancien type `adjectif`) et autant de groupes, 23
  furigana incohérents, 6 lectures avec « / », 1 lecture hors kana, 2 formes (いい / 良い, 明い) ;
- groupes : les noms gardent `nom`, les pronoms, adverbes, numéraux, conjonctions et interjections
  prennent `null`.

## 4. Les verrous

**« Proposer n'est pas décider »** (`assemble.mjs`). Seule une décision `validated` est lue. Une
entrée seulement proposée est écartée avec la raison « proposition non validée ». Le sabotage qui
lit les propositions comme des décisions (Z1) fait échouer le test du verrou.

**La frontière** (`decisions.mjs`). Un lot ne peut décider que :
- les champs humains (tous exigés) ;
- les champs mécaniques **d'une entrée en exception sur ce champ** (alors exigés).

Sont refusés :
- un champ mécanique décidé hors exception (`decision-hors-frontiere`) ;
- un champ manquant (`decision-incomplete`) ;
- un groupe incompatible avec la classe (`decision-groupe`) ;
- un identifiant de sens ou des particules de sens unique (`decision-hors-frontiere`).

Une entrée dont la décision a un problème est écartée, seule.

**Pas de déduction cachée** :
- « / » n'est jamais découpé ;
- les nombres viennent d'une liste, jamais d'une détection (万年筆 reste un nom) ;
- un groupe incompatible n'est jamais corrigé en silence ;
- un tag candidat n'entre jamais seul dans la sortie.

## 5. Le reste de l'infrastructure

**Lots** : JSON, seule source des décisions. Chaque entrée est soit gardée (`fields`), soit
retirée (`retire: { merged_into }`), avec le statut `proposed` ou `validated` et les décisions
du journal citées. Les ajouts portent `key`, `status`, `journal`, `level` et `fields`. Une entrée
décidée dans deux lots est refusée.

**Journal** :
- chaque décision a la forme `{ id, date, lot, entry, field, kind, before, after, reason }` ;
- identifiants `A2-04-D<nnnn>` uniques ;
- natures : `correction`, `fusion`, `retrait`, `exception-fusion`, `abandon`, `ajout`,
  `decision` ;
- une fusion cite une `fusion`, un retrait un `retrait`, un ajout un `ajout`, et une dérogation à
  la règle du plus petit numéro une `exception-fusion`.

**Assemblage partiel** (pendant les lots) :
- seules les entrées décidées sont assemblées et validées ;
- une relation vers une entrée **pas encore assemblée** est mise en attente, sa forme locale et
  son type étant vérifiés ;
- une relation vers un sens inexistant d'une entrée **déjà assemblée** reste une erreur ;
- une fusion vers un survivant pas encore assemblé est en attente.

**Assemblage complet** (5.16) : chaque entrée source doit être décidée, et I12 et I19 s'appliquent
à tout, sur les références remappées.

**Ajouts** : l'identifiant vaut le maximum des identifiants actifs et retirés, plus un, calculé à
l'assemblage. Aujourd'hui, cela donne `v_720`. Sans les mots hors JLPT, le même calcul donne
`v_718`, ce qui montre qu'aucune constante n'est codée.

**Rapport de relecture** : généré depuis le JSON. Il montre, pour chaque entrée :
- la source et le pré-remplissage mécanique ;
- les exceptions et les tags candidats ;
- la proposition, ou la décision, avec son statut bien visible ;
- jusqu'à trois anciens exemples, en lecture seule.

Aucun outil ne relit un Markdown.

**Sources** : empreintes SHA-256 dans `manifest.json`. `verify` et `assemble` refusent des sources
modifiées. Aucun outil n'écrit dans `data/`. Un `.gitattributes` propre au dossier (`* -text`)
empêche Git de convertir les fins de ligne : avec `core.autocrlf` actif, un checkout pourrait
sinon réécrire les copies en CRLF et casser leurs empreintes sans qu'aucune source n'ait changé.

## 6. Point à arbitrer : `group: nom`

Ton arbitrage dit « nom sans propriété morphologique → `group: null` » et qu'une décision ne peut
pas mettre `group: "nom"`. Mais `schema-A2-01.md` (§6, I6) compte `nom` parmi les valeurs
morphologiques de `group`, et n'admet `suru_compatible` **qu'avec `group: nom`** : 結婚 ne pourrait
plus porter `suru_compatible`.

5.0 applique le schéma :
- les noms gardent `group: nom` ;
- une décision ne peut choisir qu'une valeur compatible avec la classe (`nom` pour un nom, `null`
  pour un pronom, un déterminant ou un numéral).

Si vous voulez `null` pour les noms aussi, il faudra un addendum qui touche I6. Le changement dans
l'infrastructure tient alors en une ligne de `CLASS_GROUPS`.

## 7. Un choix d'implémentation

La table « lieu → tag » est dans `reconstruction/a2-04/place-tags.json`, et non dans le code. Je
l'avais d'abord écrite dans `rules.mjs`, mais le garde-fou d'A2-02 (aucune chaîne `lieu_` dans
`src/` ni `tools/`) l'a refusée. C'est juste : une correspondance décidée est une donnée. Le
garde-fou n'a pas été affaibli.

## 8. Sabotages

| # | Sabotage | Attrapé |
|---|---|---|
| Z1 | **VERROU** : une proposition lue comme une décision | oui |
| Z2 | entrée en erreur assemblée quand même | oui |
| Z3 à Z7 | champ mécanique décidable, champ humain manquant, exception non exigée, groupe incompatible, identifiant de sens décidable | oui |
| Z8, Z9 | fusion sans journal, règle du plus petit numéro ignorée | oui |
| Z10, Z11 | identifiant d'ajout constant `v_720` ; calculé sur les seules entrées assemblées | oui |
| Z12 | lectures « / » découpées mécaniquement | oui |
| Z13 | furigana repris sans comparer la forme | oui |
| Z14 | numéraux détectés par leurs caractères | oui |
| Z15 | groupe incompatible corrigé en silence | oui |
| Z16 | **tags candidats devenus canoniques** | oui, **après comblement d'un trou** (ci-dessous) |
| Z17 | relation vers un sens inexistant mise en attente | oui |
| Z18 | mode complet sans contrôle d'exhaustivité | oui |
| Z19 | empreintes des sources non vérifiées | oui |
| Z20 | sortie écrite dans `data/` | oui |
| Z21, Z22 | identifiant de journal libre, entrée décidée dans deux lots | oui |
| Z23 | particules d'un sens unique non reprises | oui |

**Trou révélé et comblé (Z16).** Faire entrer les tags candidats dans la sortie ne faisait
échouer aucun test : mon test décidait pour `hj_v_1` le même tag que son candidat, ce qui ne
distingue rien. Un test décide maintenant `tags: []` pour une entrée qui a un candidat, et pour
`hj_v_1`, et vérifie que la sortie reste sans tag.

## 9. Pour 5.1

Le lot 0 compte 60 entrées : les 27 groupes de doublons candidats (54 entrées) et les 6 entrées à
lecture avec « / » (毎年, 毎月, 七, 九, 四, 何 ; いい / 良い est déjà dans un groupe). Je proposerai
le fichier `lots/lot-00.json` (statut `proposed`) et son rapport généré. Rien ne sera validé sans
vous.
