# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.10 · Lot 09 « loisirs, sorties et voyages » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 20 entrées et les 35 décisions de journal du lot sont `proposed`
(D0540 à D0574). Les lots 0 à 08 et leurs 539 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-09.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **430 tests, tous verts** (429 avant, 1 nouveau : le lot 09 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 337 ENTRY, 30 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 09 et journal supposés validés, en mémoire). La confrontation des sources
conduit à la fusion, donc à la variante « avec fusion » :

| Mesure | Attendu (avec fusion) | Obtenu |
|---|---|---|
| ENTRY | 356 | **356** |
| Identifiants retirés | 31 | **31**, dont `v_194 → v_193` |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Entrées restantes après le lot | 332 | **332** |
| Avertissements | — | aucun nouveau : `categorie-nulle` × 21, `type-nul` × 19, `kanji-inconnu` × 1 |

## 2. 散歩 / 散歩する : la confrontation des deux fiches

| | 散歩 (`n5_v_193`) | 散歩する (`n5_v_194`) |
|---|---|---|
| Ce que dit la source | « l'action de se balader… Pour en faire le verbe "se promener", on lui ajoute directement le verbe する » | « verbe irrégulier **formé par l'association du nom 散歩 et du verbe auxiliaire する**. Il désigne l'action d'effectuer une promenade » |

**Constat.** La fiche de 散歩する se définit entièrement par le nom et する. Celle de 散歩 annonce
elle-même la forme verbale. 散歩する n'apporte aucune identité lexicale propre : sens, emploi et
construction sont ceux de 散歩 + する. C'est le critère du lot 03, appliqué après examen et non par
automatisme.

**Proposition** (D0556) :
- **fusion** de 散歩する dans 散歩 ; 散歩 survit selon la règle du plus petit numéro, **sans
  exception** ;
- **`suru_compatible: true`** pour 散歩 (D0557), établi par sa fiche et par l'entrée 散歩する
  elle-même ;
- la construction de 散歩する (公園を散歩する) est reprise dans la nuance de 散歩.

## 3. Sens et propriétés, à partir des sources

| Entrée | Proposition | Ce que dit la source |
|---|---|---|
| **歌** | **un sens**, chanson (D0541) | la nuance ne décrit que la chanson ; « poème traditionnel » (和歌) est absent et hors N5 ; rien n'est repris de 唄 |
| **遊ぶ** | **un sens**, s'amuser (D0551) | « jouer ou sortir se divertir » ; 遊びに行く (aller voir quelqu'un) n'est **pas** documenté, donc pas ajouté |
| **絵** | **un sens**, dessin (autres traductions : peinture, image) (D0546) | « une image dessinée, une peinture ou une illustration » : un concept, une largeur référentielle |
| **国** | **deux sens** : pays / pays natal (D0568), **à arbitrer** | « un pays, une nation **ou la région natale d'une personne** » (国に帰る). On peut aussi n'en garder qu'un, le pays natal allant dans la nuance. |
| **釣り** | un sens, pêche ; **correction** (D0553) | « monnaie rendue » est お釣り, un autre mot, comme la source le dit elle-même |
| **弾く** | un sens | rien n'est repris de l'homophone 引く |
| **映画館** | furigana corrigés (D0561) | ceux de la source étaient décalés d'un kanji |

**`suru_compatible`, uniquement d'après la source** (lecture confirmée au lot 08) :

| Entrée | Décision | Raison |
|---|---|---|
| 散歩 | `true` (D0557) | fiche de 散歩 et entrée 散歩する |
| 旅行 | `true` (D0566) | « on lui ajoute directement する » |
| 帰国 | `true` (D0572) | « souvent combiné avec する » |
| 釣り | `true` (D0554) | « Nom / verbe suru » |
| **スポーツ** | `false` (D0548), **à confirmer** | la source dit seulement qu'on « l'associe directement au verbe する », c'est-à-dire スポーツをする (faire du sport, avec を), sans établir de verbe formé avec する |

## 4. Les cinq anciens candidats de lieu, rejetés explicitement

Chaque rejet est une décision de journal, comme dans les lots précédents :

| Entrée | Candidat hérité | Décision |
|---|---|---|
| 映画館 | `lieu_gare` | écarté (D0562) : aucun lien avec le vocabulaire d'action de la gare |
| プール | `lieu_gare` | écarté (D0564) |
| 外国 | `lieu_gare` | écarté (D0571) |
| 国 | `lieu_hotel` | écarté (D0569) |
| 帰国 | `lieu_hotel` | écarté (D0573) |

## 5. Journal du lot

35 décisions proposées, de D0540 à D0574 :
- 14 décisions : découpages, sens uniques, `suru_compatible` (six), tags (cinq) ;
- 18 abandons ;
- 2 corrections (釣り / お釣り, furigana de 映画館) ;
- 1 fusion (散歩する).

## 6. Ce que j'attends

Ton arbitrage, en particulier sur :
- la fusion de 散歩する dans 散歩 ;
- **国** : un ou deux sens ;
- **スポーツ** : `suru_compatible: false` ;
- les sens uniques de 歌, 遊ぶ et 絵.
