# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.1b · Lot 0, révision après arbitrage

**Date** : 2026-10-02
**Référence** : arbitrage du lot 0 du 2026-10-02 (quatre changements demandés, lectures, types
sémantiques ouverts).
**Statut du lot** : toujours **en proposition**. Il ne reste qu'un point avant la validation : le
type sémantique de お腹 et des deux sens de キロ.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **415 tests, tous verts** (411 avant, 4 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes au manifeste |
| `run.mjs assemble` | 0 ENTRY : rien n'est validé |
| Essai à blanc (lot **et** journal supposés validés, en mémoire) | 33 ENTRY, 28 identifiants retirés, **aucun problème de frontière** ; 3 erreurs `type-nul` (types ouverts, section 5) ; 5 avertissements `categorie-nulle` (justifiés, A5) ; 1 avertissement `kanji-inconnu` (醤) |
| Lot validé, journal resté proposé (essai) | `journal-non-valide`, 0 ENTRY : le nouveau verrou tient |
| `data/` | non modifié |

## 2. Les quatre changements d'infrastructure

**1. Statut propre du journal.**
- Chaque décision porte `status: proposed | validated`, et le statut est obligatoire.
- Une décision `proposed` n'a aucun effet normatif. Elle peut être réécrite sous le même
  identifiant.
- Une décision de lot `validated` ne cite que des décisions validées ; sinon `journal-non-valide`,
  et l'entrée n'est pas assemblée.
- Toutes les décisions du lot 0 sont `proposed`.

**2. Forme usuelle après fusion.**
- Pour le survivant d'une fusion, et pour lui seul, `word` devient décidable. L'identifiant
  survivant et la forme usuelle sont deux décisions indépendantes.
- Une forme décidée exige ses lectures (`decision-incomplete` sinon), puisque les furigana
  dépendent de la forme.
- Hors fusion, `word` reste mécanique (`decision-hors-frontiere`).

**3. 大変.** `n5_v_495` entre dans la liste fermée des exceptions de classe (46 entrées). Il est
décidé `adjectif_na`, avec le groupe `na`.

**4. Addendum A5, `category: null`.** Voir `docs/conception/addendum-A5-category-null.md`.
- **Reconstruction** : un sens lexical sans catégorie ni fonction exige une décision de nature
  `categorie-nulle`, sur ce sens précisément (champ `sens <n> · category`). Sinon :
  `categorie-nulle-injustifiee`.
- **Validateur lexical (I9)** : ce cas devient un avertissement `categorie-nulle` au lieu d'une
  erreur, puisque les données canoniques ne portent pas le journal. L'avertissement liste les cas
  pour l'audit A2-05.
- **Documents** : `schema-A2-01.md` mentionne A5 dans son statut, et le sommaire liste A5.

## 3. Le lot 0 révisé

**Formes usuelles décidées** (journalisées, D0057 à D0064) :

| ENTRY | Forme usuelle | Autre graphie |
|---|---|---|
| `v_44` | お腹 | おなか |
| `v_64` | かばん | 鞄 |
| `v_87` | 果物 | くだもの |
| `v_91` | 晩ご飯 | ばんごはん |
| `v_92` | 昼ご飯 | ひるごはん |
| `v_226` | 鍵 | かぎ |
| `v_263` | 曇り | くもり |
| `v_68` | 履く | はく |
| `v_420` | いい | 良い |

Les autres survivants gardent leur forme : せっけん, おととし, かわいい, きれい, 朝ご飯, 曲がる. 明い
est absorbé sans devenir une graphie.

**Autres décisions** :
- **大変** : adjectif en な, groupe `na`. Ses deux sens restent « très » (fonction `intensifieur`)
  et « difficile ».
- **Lectures** : なな (七) et よん (四) par défaut. Les notes disent les contextes de la seconde
  lecture : しち dans 七時 et 七月 ; し dans 四月, souvent évitée ailleurs car homophone de 死.
  La contradiction de l'ancienne note de 七 est corrigée.
- **`category: null`** : les 5 sens lexicaux sans catégorie (良い, きれい, 大変 « difficile », 本当,
  無くす) citent chacun une décision `categorie-nulle` (D0065 à D0069).

**Journal** : 71 décisions.
- Les identifiants des 56 premières sont inchangés.
- 18 ont été réécrites à leur place : formes usuelles, 大変, いい, lectures des nombres, et la
  formulation des fusions de graphies.
- 15 sont nouvelles, de D0057 à D0071.

## 4. Une contradiction révélée : la lecture よい de いい

Avec `word: いい`, la lecture よい ne peut pas être une lecture structurée. I4 exige que les
furigana de chaque lecture aient `word` pour texte de base, et よい n'est lisible que sur la
graphie 良い. Le schéma ne donne des furigana à une graphie que pour la lecture par défaut.

Mise en œuvre retenue :
- **lecture** : いい seule ;
- **graphie** : 良い (lu いい) ;
- **nuance de l'ENTRY** : « Forme écrite ou soutenue : よい (良い). Les formes conjuguées viennent
  de よい : よかった, よくない. »

Le choix est journalisé (D0037). Une vraie lecture よい exigerait des lectures propres à chaque
graphie, donc un changement du schéma. Je le signale sans le proposer pour le lot 0.

## 5. Le seul point ouvert : types sémantiques

Je n'ai mis aucune valeur approchée, comme demandé :
- **お腹** (`n5_v_44`) : `semantic_type: null`. Aucun type d'`A2-ST-v1` ne couvre une partie du
  corps (D0070).
- **キロ** (`n5_v_363`), sens « kilogramme » et « kilomètre » : `semantic_type: null`. Une unité
  n'est pas automatiquement une quantité (D0071).

Avec une catégorie non nulle, `semantic_type: null` est refusé par I10 (`type-nul`). Ces deux
entrées ne peuvent donc pas sortir de l'assemblage tant que le point n'est pas tranché ; le
validateur fait lui-même barrière.

La question dépasse le lot 0 : tout le vocabulaire du corps (頭, 手, 目…) et des unités (メートル,
グラム…) la posera dans les lots suivants.

## 6. Sabotages

| # | Sabotage | Attrapé |
|---|---|---|
| B1 | décision validée citant du journal proposé | oui |
| B2 | statut du journal non contrôlé | oui |
| B3 | forme usuelle décidable pour toute entrée | oui |
| B4 | forme décidée sans ses lectures | oui |
| B5 | `category: null` lexicale sans justification | oui |
| B6 | justification acceptée pour n'importe quel sens | oui |
| B7 | 大変 hors des exceptions de classe | oui |
| B8 | I9 redevenu une erreur | oui |
| B9 | I9 sans aucun signalement | oui |

## 7. Pour passer le lot 0 en `validated`

Une fois les types sémantiques de お腹 et de キロ arbitrés :
1. les décisions de lot et du journal passent en `validated` ;
2. l'assemblage partiel et le validateur lexical doivent donner 33 ENTRY et 28 identifiants
   retirés, sans erreur.

Si le type n'est pas tranché tout de suite, les 58 autres entrées peuvent être validées seules :
お腹 et キロ restent alors `proposed`. Mais キロ survit à la fusion de `n5_v_610`, et お腹 à celle
de `n5_v_45`. Ces deux fusions resteraient donc en attente, ce que l'assembleur sait gérer.
