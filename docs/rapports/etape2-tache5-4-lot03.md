# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.4 · Lot 03 « maison, habitat et vie domestique » (proposition)

**Date** : 2026-10-02
**Statut** : **PROPOSITION**. Les 40 entrées et les 72 décisions de journal du lot sont `proposed`
(D0221 à D0292). Les lots 0 à 02 et leurs 220 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-03.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **421 tests, tous verts** (420 avant, 1 nouveau : le lot 03 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 123 ENTRY, 28 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 03 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 162 (123 + 39) | **162** |
| Identifiants retirés | 29 (28 + 掃除する) | **29** : `v_220 → v_219` |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Avertissements | — | `type-nul` × 18 (1 nouveau : 電気 « électricité »), `categorie-nulle` × 12 (aucun nouveau), `kanji-inconnu` × 1 (醤) |

## 2. Les trois arbitrages appliqués

- **お風呂 / ふろ : deux ENTRY distinctes** (décision D0261). Elles ont les mêmes deux sens (le
  bain, la salle de bain). ふろ reçoit la graphie 風呂, variante kana / kanji documentée par la
  source. La présence de お n'est pas une différence d'écriture ; leur proximité pourra être notée
  en 5.16.
- **掃除 / 掃除する : fusion** (décision D0288). 掃除 survit avec `suru_compatible: true`, et
  掃除する est retiré, `merged_into` 掃除. Le journal consigne la **règle transversale** : on
  fusionne une forme en する avec son nom quand elle n'apporte pas d'identité lexicale propre, et
  chaque cas futur (散歩する, 勉強する…) est examiné selon ce critère. 洗濯 reçoit aussi
  `suru_compatible: true` (洗濯する), sans fusion : il n'existe pas d'ENTRY 洗濯する.
- **家 garde sa seule lecture いえ** (décision D0223). うち, documentée par la nuance de la source,
  reste dans la nuance de l'ENTRY ; elle n'est pas ajoutée aux lectures. Elle est consignée comme
  candidat d'enrichissement dans `ETAT-ACTUEL.md`.

## 3. Aucun sens sans source

Chaque sens proposé est documenté par la source. Les acceptions que la source contient à tort
sont corrigées, pas transformées en sens :
- **窓 « guichet »** : sens de 窓口, autre mot (correction D0248) ;
- **ポスト « pilier (métier) »** : traduction erronée ; l'emploi « poste, fonction » existe mais
  est hors N5 (correction).

Deux découpages sont documentés par la source :
- **電気** : électricité / lumière (電気をつける) ; le sens 1 reçoit `semantic_type: null` (A6), car
  un phénomène physique n'a aucun type terminal ;
- **お風呂, ふろ** : bain / salle de bain. La baignoire (浴槽) est abandonnée.

## 4. Graphies

| Entrée | Graphie ajoutée | Raison |
|---|---|---|
| 入口 | 入り口 | même mot, okurigana différent ; la forme usuelle 入口 reste mécanique |
| いす | 椅子 | variante kana / kanji documentée par la source |
| ふろ | 風呂 | idem |

Les furigana de 入口 (ceux de 入り口) et de お手洗い (ruby sans lecture, 御 au lieu de お) sont
corrigés et journalisés.

## 5. Tags de lieu : le critère du lot 02, sur l'hôtel et la gare

- **Hôtel**, retenus seulement pour le vocabulaire d'action du scénario (arrivée, horaires, petits
  problèmes dans la chambre) :
  - 部屋, ベッド, シャワー, お風呂 ;
  - 電気, sur le **sens « lumière »** seulement (電気がつかない) ;
  - エレベーター.
- **Hôtel, écartés** : tout le reste de l'ancienne catégorie de la maison (台所, 庭, いす, テーブル,
  冷蔵庫, 洗濯, 掃除…). Ces mots peuvent se rencontrer à l'hôtel, mais l'association n'est pas
  caractéristique. ふろ aussi est écartée : dans le service hôtelier, on dit お風呂.
- **Gare**, ajoutés hors des candidats : 入口, 出口 (sorties numérotées), エレベーター.
- **Gare**, retenus parmi les candidats : トイレ et お手洗い, qu'on demande dans une gare.
- **Gare, écartés** : 家, 廊下, 階段, 門. Une gare peut en contenir, ce qui ne suffit pas.

| Entrée | Candidats hérités | Décision | Écart |
|---|---|---|---|
| 家 | gare | — | − gare |
| 家庭 | hotel | — | − hotel |
| テーブル | — | — | = |
| 台所 | hotel | — | − hotel |
| 机 | — | — | = |
| マッチ | — | — | = |
| エレベーター | — | gare, hotel | + gare, + hotel |
| いす | hotel | — | − hotel |
| お風呂 | hotel | hotel | = |
| ふろ | hotel | — | − hotel |
| ドア | hotel | — | − hotel |
| ベッド | hotel | hotel | = |
| 入口 | hotel | gare | + gare, − hotel |
| 庭 | hotel | — | − hotel |
| 戸 | hotel | — | − hotel |
| 掃除 | hotel | — | − hotel |
| 掃除する | — | retirée (fusion dans 掃除) | — |
| 洗う | — | — | = |
| 窓 | hotel | — | − hotel |
| 部屋 | hotel | hotel | = |
| ちり紙 | hotel | — | − hotel |
| ポスト | hotel | — | − hotel |
| 箱 | hotel | — | − hotel |
| 紙 | hotel | — | − hotel |
| 出口 | hotel | gare | + gare, − hotel |
| 本棚 | — | — | = |
| 玄関 | hotel | — | − hotel |
| アパート | hotel | — | − hotel |
| 住む | — | — | = |
| お手洗い | gare | gare | = |
| シャワー | hotel | hotel | = |
| ストーブ | — | — | = |
| トイレ | gare | gare | = |
| 冷蔵庫 | — | — | = |
| 廊下 | gare | — | − gare |
| 洗濯 | hotel | — | − hotel |
| 花瓶 | — | — | = |
| 門 | gare | — | − gare |
| 階段 | gare | — | − gare |
| 電気 | hotel | hotel (sens 2) | = |


Légende : `+` ajouté hors des candidats, `−` candidat écarté, `=` décision identique aux candidats.

## 6. Journal du lot

72 décisions proposées, de D0221 à D0292 :
- 32 décisions : tags, découpages, sens uniques, graphies, la lecture うち, お風呂 / ふろ ;
- 34 abandons ;
- 4 corrections : furigana de 入口 et de お手洗い, 窓 « guichet », ポスト « pilier » ;
- 1 `type-nul` (電気 « électricité ») ;
- 1 fusion (掃除する).

## 7. Ce que j'attends

Ton arbitrage, en particulier sur :
- 電気, お風呂 et ふろ à deux sens ;
- les corrections de 窓 et de ポスト ;
- les graphies 入り口, 椅子 et 風呂 ;
- les tags (hôtel, gare, et le tag de 電気 porté par un sens) ;
- la formulation de la règle transversale des verbes en する (D0288).
