# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.11 · Lot 10 « position, direction et orientation » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 24 entrées et les 56 décisions de journal du lot sont `proposed`
(D0575 à D0630). Les lots 0 à 09 et leurs 574 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-10.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **431 tests, tous verts** (430 avant, 1 nouveau : le lot 10 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 356 ENTRY, 31 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 10 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 380 (356 + 24) | **380** |
| Identifiants retirés | 31 | **31** (aucune fusion) |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Entrées restantes après le lot | 308 | **308** |
| Avertissements | — | `type-nul` × 20 (1 nouveau : 表), `categorie-nulle` × 21, `kanji-inconnu` × 1 |

## 2. Les 22 candidats `lieu_gare`, examinés un par un

**Un compte précisé.** Le lot porte **22** candidats, et non 23 : ses 24 entrées comprennent 22
entrées de `position_direction`, plus 向こう et 地図, qui n'en portent pas. Le 23e candidat de
l'ancienne catégorie est sur 次, laissé hors du lot.

**Résultat** : les 22 sont **rejetés**, chacun par sa propre décision, avec sa raison. Le lot ne
porte aucun tag.
- **Mots d'espace généraux** (上, 下, 中, 外, 前, 後ろ, 横, 隣, そば, 近く, 表, 縦, 先, 近い, 遠い) : ils
  s'emploient partout, et pouvoir les dire dans une gare ne les rend pas propres à la gare. Pour
  隣, même 隣の駅 (la station voisine) reste un emploi général.
- **右, 左** : indiquer la droite ou la gauche vaut pour toute orientation.
- **Points cardinaux** (東, 西, 南, 北), **sans présomption**, comme demandé. Les noms de sorties
  (東口, 西口…) montrent qu'un point cardinal qualifie une sortie. Ils ne rendent pas le point
  cardinal propre à la gare : il structure aussi villes, routes, cartes et régions.
- **角** : l'angle de rue relève de la ville.

## 3. Sens, à partir des fiches (aucun découpage pré-validé)

| Entrée | Proposition | Ce que dit la fiche |
|---|---|---|
| **前** | **deux sens** : devant (espace) / avant (temps) (D0585) | « l'espace situé en face… **ou** un moment antérieur dans le temps » : une position et un moment |
| **近く** | **deux sens** : environs / prochainement (D0598) | « la proximité spatiale (près de…) **ou** temporelle (bientôt) » ; 近く結婚する |
| **先** | **deux sens** : avant, bout (espace) / auparavant, d'abord (temps) (D0623), **à arbitrer** | « l'avant… l'extrémité d'une chose » ; « le futur proche, une priorité dans l'ordre chronologique ». C'est le même raisonnement que 前 ; on peut aussi n'en garder qu'un, si l'on juge ces emplois pas assez autonomes. |
| **近い, 遠い** | **un sens** chacun (D0626) | « une distance courte dans l'espace **ou** dans le temps » : la même échelle de distance, appliquée au temps |
| **縦** | un sens, sens vertical (D0607) | « la dimension verticale ou l'orientation de haut en bas » : « vertical » et « longueur » sont des traductions contextuelles |
| **横** | un sens, côté (D0589) | « le flanc ou le côté horizontal » : « horizontal » en est la direction, dans la nuance |
| **隣** | un sens, à côté (D0592) | « l'emplacement directement à côté ou voisin » : le voisin, la maison d'à côté sont des emplois avec の |
| **向こう** | un sens, en face (D0601) | « en face, de l'autre côté d'une rue, ou un lieu distant et vis-à-vis » |
| **表** | un sens, face (D0603) ; `type-nul` (D0604) | le côté visible d'une chose, qui en est une partie (comme les parties du corps) |
| **上, 下** | un sens chacun (D0575, D0578) | les nuances ne décrivent que la position ; « supérieur » et « inférieur » (rang) n'y figurent pas |

**Pourquoi 前 et 近く ont deux sens, mais pas 近い.** 前 « avant » et 近く « prochainement »
désignent un **moment** : un autre référent, une autre catégorie (temps), un autre type. 近い et 遠い
mesurent une **distance**, et la même échelle s'applique à l'espace comme au temps. Les fiches font
elles-mêmes cette différence.

## 4. Autres décisions

- **先, classe `nom`** (D0624, exception de classe) : la source l'étiquette « adverbe », mais tous ses
  emplois documentés sont ceux d'un nom (先に, この先, l'extrémité). L'emploi adverbial passe par に.
- **Points cardinaux, type `concept_abstrait`** (D0620, citée par les quatre) : une direction n'est
  ni un lieu ni un objet ; c'est un concept non matériel sans type plus précis.
- **そば** : graphie 側, documentée par la source (D0595). Rien n'est repris de l'homophone 蕎麦.
- **Homographes, autres unités** : aucun sens n'est récupéré de 中 lu ちゅう ou じゅう (suffixe),
  de 表 lu ひょう (tableau), de 角 lu つの (corne). C'est signalé dans les nuances.
- **地図** : « territoires › représentation géographique › cartes », une catégorie exacte du
  registre.

## 5. Journal du lot

56 décisions proposées, de D0575 à D0630 :
- 36 décisions : 22 rejets de tags, découpages, sens uniques, classe de 先, type des points
  cardinaux, graphie de そば ;
- 19 abandons ;
- 1 `type-nul` (表).

## 6. Ce que j'attends

Ton arbitrage, en particulier sur :
- **先** : un ou deux sens ;
- les deux sens de 前 et de 近く, face au sens unique de 近い et 遠い ;
- `concept_abstrait` pour les points cardinaux ;
- le `type-nul` de 表 ;
- les 22 rejets de tags.
