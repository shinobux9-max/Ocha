# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.5 · Lot 04 « ville, transports et déplacements » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 39 entrées et les 62 décisions de journal du lot sont `proposed`
(D0293 à D0354). Les lots 0 à 03 et leurs 292 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-04.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **422 tests, tous verts** (421 avant, 1 nouveau : le lot 04 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 162 ENTRY, 29 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 04 et journal supposés validés, en mémoire) :

| Mesure | Attendu (provisoire) | Obtenu |
|---|---|---|
| ENTRY | 200 (162 + 38) | **200** |
| Identifiants retirés | 30 (29 + 出ます) | **30** : `v_537 → v_642` |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Avertissements | — | `type-nul` × 18 (aucun nouveau), `categorie-nulle` × 14 (2 nouveaux : 出る « assister à » et « apparaître »), `kanji-inconnu` × 1 (醤) |

Aucune autre question d'identité n'est apparue : les comptes provisoires se confirment.

## 2. Périmètre : provenance précisée

Les 13 lieux publics comprennent **7 des 9 mots urbains** écartés du lot 03 : 交差点, 交番, 銀行,
図書館, 大使館, 建物, 町. Les deux autres, **国 et 帰国**, restent pour le futur lot « pays et
voyage ». Les 6 lieux restants viennent de l'ancienne catégorie « lieux » : 村, 道, 橋, 公園,
郵便局, ホテル.

## 3. 出ます / 出る : fusion avec exception

- **D0335 (`fusion`)** : 出ます (`n5_v_537`) n'est pas une unité lexicale, mais la forme polie
  conjuguée de 出る. Il est fusionné dans 出る (`n5_v_642`).
- **D0336 (`exception-fusion`)** : la règle du plus petit numéro est outrepassée. `n5_v_537` est
  une représentation manifestement erronée, et garder son identifiant ferait survivre la
  représentation incorrecte au moment où elle est corrigée. `v_642` est conservé.
- **Sens de 出る** (D0337), tous documentés par les deux sources fusionnées :
  1. **sortir**, quitter un lieu (を, から) ;
  2. **assister à**, participer (に), sens apporté par 出ます (授業に出る) ;
  3. **apparaître** (が, 月が出る).

  Les sens 2 et 3 n'ont pas de catégorie thématique : `categorie-nulle` justifiée (action
  générale).

## 4. Les cas sensibles, à partir des sources

| Entrée | Proposition | Ce que dit la source |
|---|---|---|
| **入る** | un sens, « entrer » | « contenir » est une traduction trompeuse : avec 入る, c'est le contenu qui « est dedans » (入っている), état résultant décrit dans la nuance |
| **走る** | un sens, « courir » | « rouler (pour un véhicule) » est le même verbe appliqué à un véhicule : dans la nuance |
| **飛ぶ** | un sens, « voler » | « sauter, bondir » est le sens de 跳ぶ, même lecture, autre graphie, autre sens : **correction** (D0354), pas une polysémie |
| **登る** | un sens, « monter » (autre traduction : « grimper ») | « escalader » est redondant |
| **止まる** | un sens, « s'arrêter » | « être suspendu » (un service, un mécanisme) est le même concept : dans la nuance |
| **道** | un sens, « chemin » (autres traductions : « rue », « route ») | la « voie » morale (武道), documentée par la nuance de la source, est hors N5 : abandonnée |
| **町** | un sens, « ville » (autre traduction : « quartier ») | « rue commerçante » reprise dans la nuance |
| **車** | un sens, « voiture » | « roue » est un sens étymologique du kanji, non attesté comme emploi courant : abandonné |
| **電車** | un sens, « train » | « tramway » se dit 路面電車 : abandonné, alternative non équivalente |

**Autres décisions** :
- **建物** : furigana corrigés (D0306) ; ceux de la source étaient ceux de 建て物.
- **降りる** : graphie 下りる ajoutée (D0348), documentée par la source.
- **図書館** : le registre n'a pas de catégorie de bibliothèque. Je l'ai rangé parmi les espaces
  publics collectifs (D0310) ; à confirmer.

## 5. Tags de lieu : la gare à l'échelle

- **Gare, gardés** : 駅, 電車, 地下鉄, 切符, 乗る.
- **Gare, ajouté hors des candidats** : 降りる (電車を降りる).
- **Gare, écartés** :
  - バス et タクシー, qui ont leur propre arrêt ou leur propre station ;
  - 車, 自動車, 自転車, 飛行機 ;
  - 村, 道, 橋, 公園, 郵便局, et ホテル (pour la gare).

  Tous peuvent se rencontrer près d'une gare, ce qui ne suffit pas.
- **ホテル** : `lieu_gare` écarté, et `lieu_hotel` ajouté hors des candidats, car c'est le mot du
  lieu lui-même, comme レストラン.
- **Hôtel, écartés** : les mots urbains venus de la maison (町, 交差点, 建物, 図書館, 銀行, 交番,
  大使館).

| Entrée | Candidats hérités | Décision | Écart |
|---|---|---|---|
| 歩く | — | — | = |
| 降りる | — | gare | + gare |
| 郵便局 | gare | — | − gare |
| タクシー | gare | — | − gare |
| バス | gare | — | − gare |
| 乗る | gare | gare | = |
| 出かける | — | — | = |
| 地下鉄 | gare | gare | = |
| 来る | — | — | = |
| 自動車 | gare | — | − gare |
| 自転車 | gare | — | − gare |
| 行く | — | — | = |
| 走る | — | — | = |
| 車 | gare | — | − gare |
| 電車 | gare | gare | = |
| 飛ぶ | — | — | = |
| 飛行機 | gare | — | − gare |
| 駅 | gare | gare | = |
| 入る | — | — | = |
| 公園 | gare | — | − gare |
| 交差点 | hotel | — | − hotel |
| 交番 | hotel | — | − hotel |
| 図書館 | hotel | — | − hotel |
| 大使館 | hotel | — | − hotel |
| 建物 | hotel | — | − hotel |
| 町 | hotel | — | − hotel |
| 銀行 | hotel | — | − hotel |
| 村 | gare | — | − gare |
| 登る | — | — | = |
| 出ます | — | retirée (fusion dans 出る) | — |
| 帰る | — | — | = |
| 止まる | — | — | = |
| 渡る | — | — | = |
| 着く | — | — | = |
| ホテル | gare | hotel | + hotel, − gare |
| 出る | — | — | = |
| 切符 | gare | gare | = |
| 橋 | gare | — | − gare |
| 道 | gare | — | − gare |


Légende : `+` ajouté hors des candidats, `−` candidat écarté, `=` décision identique aux candidats.

## 6. Journal du lot

62 décisions proposées, de D0293 à D0354 :
- 29 décisions : tags, sens uniques, les trois sens de 出る, catégorie de 図書館, graphie
  下りる ;
- 27 abandons ;
- 2 corrections (furigana de 建物, 飛ぶ / 跳ぶ) ;
- 1 fusion et 1 `exception-fusion` (出ます) ;
- 2 `categorie-nulle` (出る).

## 7. Ce que j'attends

Ton arbitrage, en particulier sur :
- les trois sens de 出る et leurs `categorie-nulle` ;
- les sens uniques de 入る, 走る, 飛ぶ (avec la correction 跳ぶ), 止まる, 道 et 町 ;
- la catégorie de 図書館 ;
- les tags de la gare, en particulier 乗る et 降りる, et l'écart de バス et タクシー.
