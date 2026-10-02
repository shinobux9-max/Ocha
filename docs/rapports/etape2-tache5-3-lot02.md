# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.3 · Lot 02 « alimentation, boissons, repas et table » (proposition)

**Date** : 2026-10-02
**Statut** : **PROPOSITION**. Les 41 entrées et les 80 décisions de journal du lot sont `proposed`
(D0141 à D0220). Les lots 0 et 01 et leurs 140 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-02.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **420 tests, tous verts** (419 avant, 1 nouveau : le lot 02 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 82 ENTRY, 28 retraits, 0 problème : les propositions respectent déjà la frontière |

**Essai à blanc** (lot 02 et journal supposés validés, en mémoire) :

| Mesure | Résultat |
|---|---|
| ENTRY | **123** (82 + 41) |
| Identifiants retirés | 28 |
| Problèmes / erreurs / attente | **0 / 0 / 0** |
| Avertissements | `type-nul` × 17 (aucun nouveau), `categorie-nulle` × 12 (2 nouveaux : 甘い « indulgent », まずい « fâcheux », justifiés), `kanji-inconnu` × 1 (醤) |

## 2. Les cas mis en évidence

### 2.1 Polysémies, jugées une par une

| Entrée | Proposition | Raison (journal) |
|---|---|---|
| **魚** | **deux sens** : animal / aliment | le référent change (un animal vivant, une nourriture), et le type aussi (`organisme_vivant`, `substance_matiere`) ; le cas de 足 n'est **pas** réutilisé |
| **ご飯** | **deux sens** : riz cuit / repas | un aliment et un événement, deux types |
| **料理** | **deux sens** : cuisine (l'activité) / plat | une activité et son résultat ; `suru_compatible: true` (料理する) |
| **お茶** | **un sens** « thé » (autre traduction : « thé vert ») | thé vert et thé, variation d'extension du même mot ; « pause thé » abandonnée, une traduction source ne suffit pas |
| **お酒** | un sens « alcool » | le saké est une spécification du même mot, comme le thé vert ; dans la nuance |
| **甘い** | **deux sens** : sucré / indulgent | une saveur et une attitude (子供に甘い) ; « LaXiste » corrigé ; « ingénu » repris dans la nuance (考えが甘い) |
| **辛い** | **un sens** « épicé » | « trop salé » est un emploi régional, dans la nuance. « Pénible » n'est **pas** un sens : c'est つらい, autre lecture du même kanji, donc une autre unité (correction journalisée) |
| **まずい** | **deux sens** : mauvais au goût / fâcheux | une saveur et une situation qui tourne mal (まずいことになった) |
| **飲む** | **un sens** « boire » | 薬を飲む garde le même sens japonais (avaler) ; « prendre » n'est que la traduction imposée par la collocation, dans la nuance |

### 2.2 Graphies : kana / kanji d'un côté, préfixe お de l'autre

| Entrée | Proposition | Raison |
|---|---|---|
| とり肉 | `writings` : 鶏肉 | même mot, même lecture : variante kana / kanji |
| ちゃわん | `writings` : 茶碗 | idem |
| **お皿** | **pas** de graphie 皿 | retirer お change la forme lexicale, pas seulement l'écriture. Question ouverte : 皿 pourrait être une ENTRY distincte, à décider si un lot la rencontre ; dans la nuance pour l'instant |
| お弁当 | pas de graphie 弁当 | même raison que お皿 |

### 2.3 Tags de lieu, entrée par entrée

Aucune règle n'est appliquée par ancienne catégorie. Chaque candidat est gardé ou écarté, et toute
différence avec les candidats est journalisée avec sa raison :
- **konbini** : ce qu'on y achète couramment, ou ce qu'on vous y propose ;
- **restaurant** : ce qu'on commande, demande ou nomme au restaurant.

**Trois tags sont portés par un sens, et non par l'ENTRY** : 魚 « aliment », ご飯 « riz cuit »,
料理 « plat ». Le lieu ne caractérise pas l'unité entière.

**Ajouts hors des candidats** (le registre fermé le permet) :
- `lieu_restaurant` pour la vaisselle et les couverts qu'on demande à table, et pour les trois
  lieux où l'on mange ;
- `lieu_konbini` pour 箸 et スプーン, qu'on propose avec un plat (お箸おつけしますか).

**Candidats écartés** :
- `lieu_hotel` pour la vaisselle (ancienne catégorie de la maison) ;
- `lieu_gare` pour les lieux de restauration (ancienne catégorie « lieux ») ;
- l'un des deux candidats, ou les deux, pour les aliments peu utiles dans un lieu.

| Entrée | Candidats hérités | Décision | Écart |
|---|---|---|---|
| 飲む | — | — | = |
| お弁当 | konbini, restaurant | konbini | − restaurant |
| お茶 | konbini, restaurant | konbini, restaurant | = |
| お酒 | konbini, restaurant | konbini, restaurant | = |
| ご飯 | konbini, restaurant | restaurant (sens 1) | − konbini |
| ちゃわん | — | — | = |
| とり肉 | konbini, restaurant | restaurant | − konbini |
| カップ | — | — | = |
| カレー | konbini, restaurant | restaurant | − konbini |
| コーヒー | konbini, restaurant | konbini, restaurant | = |
| パン | konbini, restaurant | konbini | − restaurant |
| レストラン | gare | restaurant | + restaurant, − gare |
| 卵 | konbini, restaurant | konbini | − restaurant |
| 喫茶店 | gare | restaurant | + restaurant, − gare |
| 塩 | konbini, restaurant | — | − konbini, − restaurant |
| 夕飯 | konbini, restaurant | restaurant | − konbini |
| 料理 | konbini, restaurant | restaurant (sens 2) | − konbini |
| 牛乳 | konbini, restaurant | konbini | − restaurant |
| 牛肉 | konbini, restaurant | restaurant | − konbini |
| 砂糖 | konbini, restaurant | — | − konbini, − restaurant |
| 箸 | — | konbini, restaurant | + konbini, + restaurant |
| 紅茶 | konbini, restaurant | konbini, restaurant | = |
| 肉 | konbini, restaurant | restaurant | − konbini |
| 豚肉 | konbini, restaurant | restaurant | − konbini |
| 野菜 | konbini, restaurant | — | − konbini, − restaurant |
| 食べる | konbini, restaurant | — | − konbini, − restaurant |
| 食べ物 | konbini, restaurant | — | − konbini, − restaurant |
| 食堂 | gare | restaurant | + restaurant, − gare |
| 飲み物 | konbini, restaurant | konbini, restaurant | = |
| 飴 | konbini, restaurant | konbini | − restaurant |
| 魚 | konbini, restaurant | restaurant (sens 2) | − konbini |
| ナイフ | — | restaurant | + restaurant |
| お皿 | hotel | restaurant | + restaurant, − hotel |
| コップ | hotel | restaurant | + restaurant, − hotel |
| スプーン | hotel | konbini, restaurant | + konbini, + restaurant, − hotel |
| フォーク | hotel | restaurant | + restaurant, − hotel |
| まずい | — | — | = |
| 甘い | — | — | = |
| 辛い | — | — | = |
| バター | konbini, restaurant | — | − konbini, − restaurant |
| 水 | konbini, restaurant | konbini, restaurant | = |


Légende : `+` ajouté hors des candidats, `−` candidat écarté, `=` décision identique aux candidats.

## 3. Lectures en katakana : statu quo

Comme décidé, rien ne change mécaniquement. Les 10 mots en katakana du lot gardent la lecture
produite par la couche mécanique, en hiragana avec trait d'allongement : ぱん, ばたー, かれー,
こーひー, かっぷ, こっぷ, すぷーん, ふぉーく, ないふ, れすとらん. La question est consignée comme point
ouvert transversal dans `ETAT-ACTUEL.md`, à trancher globalement avant 5.17.

## 4. Une observation sur le registre des catégories

L'identifiant de « Œufs » (`alimentation_cuisine › aliments`) est `ufs`. La règle mécanique
d'A2-02 a supprimé la ligature œ, qui n'est pas un accent décomposable. Le registre est verrouillé
et l'identifiant figé ; je l'utilise tel quel (卵). C'est consigné en point ouvert : la
correction, si on la veut, passerait par une décision sur le registre, pas par la reconstruction.

## 5. Journal du lot

80 décisions proposées, de D0141 à D0220 :
- 42 décisions : 29 décisions de tags qui s'écartent des candidats, et 13 sur les découpages en
  sens, les sens uniques et les graphies ;
- 34 abandons ;
- 2 corrections : « LaXiste » ; « pénible », qui relève de つらい ;
- 2 `categorie-nulle`.

## 6. Ce que j'attends

Ton arbitrage, en particulier sur :
- 魚, ご飯, 料理, 甘い et まずい à deux sens ;
- お茶, お酒, 辛い et 飲む à un sens ;
- お皿 et お弁当 sans graphie ;
- les tags ajoutés hors des candidats ;
- les tags portés par un sens.
