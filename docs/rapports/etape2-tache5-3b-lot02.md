# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.3b · Lot 02, révision après arbitrage

**Date** : 2026-10-02
**Référence** : arbitrage du lot 02 du 2026-10-02 (カップ, カレー, doctrine des tags de lieu).
**Statut du lot** : toujours **en proposition**. Aucune nouvelle infrastructure, aucune nouvelle
décision de journal.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **420 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 82 ENTRY, 28 retraits, 0 problème, 0 erreur (lots 0 et 01 seuls validés) |
| Décisions validées D0001 à D0140 | inchangées |
| Identifiants D0141 à D0220 | conservés (même entrée, même nature, même champ) ; aucune nouvelle décision |

**Essai à blanc** (lot 02 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 123 | **123** |
| Identifiants retirés | 28 | **28** |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Avertissements | inchangés | `type-nul` × 17, `categorie-nulle` × 12, `kanji-inconnu` × 1 |
| Tags du lot 02 | — | 27 (37 avant) : `lieu_konbini` × 12, `lieu_restaurant` × 13 sur une ENTRY, `lieu_restaurant` × 2 sur un sens |

## 2. Le critère des tags de lieu

**Un tag de lieu signale une association caractéristique et utile au contexte de l'Explorer, pas
la simple possibilité d'employer le mot dans ce lieu.** Concrètement, c'est le vocabulaire
d'action propre au lieu :
- **konbini** : ce qu'on y achète typiquement, ou ce qu'on vous y propose (お箸おつけしますか) ;
- **restaurant** : ce qu'on y commande ou redemande pour être servi, ce qu'on demande à table, et
  les mots qui désignent le lieu lui-même.

Ce critère n'est pas rempli quand un mot peut seulement être prononcé dans ce lieu : une viande
qu'on pourrait nommer, un repas, un plat aussi courant à la maison.

Le tag reste une association de contexte, pas l'inventaire des objets physiquement présents.
C'est pourquoi レストラン lui-même porte `lieu_restaurant`.

**Application au lot 02** :
- **retirés** :
  - `lieu_restaurant` : 肉, とり肉, 牛肉, 豚肉, 魚 « aliment », カレー, 夕飯, お皿, コップ ;
  - `lieu_konbini` : 卵 ;
- **gardés** :
  - les boissons ;
  - les couverts qu'on vous propose ou qu'on demande (箸, スプーン, フォーク, ナイフ) ;
  - ご飯 « riz cuit », qu'on commande et redemande (ご飯のおかわり), porté par ce sens ;
  - 料理 « plat », l'objet même du service, porté par ce sens ;
  - les trois lieux (レストラン, 喫茶店, 食堂) ;
  - pour le konbini, お弁当, パン, 飴 et 牛乳.

**Le lot 0 n'est pas modifié.** Ses tags `lieu_restaurant` sur les trois repas (晩ご飯, 昼ご飯,
朝ご飯), et peut-être sur 醤油, semblent trop larges selon ce critère. Ils sont consignés comme
candidats à l'audit transversal A2-05, sans être rouverts maintenant.

## 3. Diff décisionnel

### Entrées modifiées (11)

| Entrée | Changement |
|---|---|
| 肉, とり肉, 牛肉, 豚肉 | `lieu_restaurant` retiré |
| 魚 | `lieu_restaurant` retiré du sens « aliment » |
| 卵 | `lieu_konbini` retiré |
| 夕飯 | `lieu_restaurant` retiré |
| お皿, コップ | `lieu_restaurant` retiré |
| カップ | autre traduction « Gobelet » retirée |
| カレー | autre traduction « Riz au curry » retirée (reprise par la nuance, カレーライス) ; `lieu_restaurant` retiré |

### Décisions du journal réécrites à leur place (18)

- **12 changent de décision** : les décisions de tags de 肉 (D0141), とり肉 (D0143), 牛肉 (D0145),
  豚肉 (D0146), 魚 (D0147), 卵 (D0149), カレー (D0171), 夕飯 (D0173), お皿 (D0201) et コップ
  (D0205) ; les abandons complétés de カレー (D0172, « Riz au curry ») et de カップ (D0204,
  « Gobelet »).
- **6 gardent leur décision, avec une justification reformulée selon le critère** : ご飯 (D0165),
  料理 (D0175), 箸 (D0207), スプーン (D0209), フォーク (D0211), ナイフ (D0213).

## 4. Les tags du lot 02 après révision

| Entrée | Candidats hérités | Décision | Écart |
|---|---|---|---|
| 飲む | — | — | = |
| お弁当 | konbini, restaurant | konbini | − restaurant |
| お茶 | konbini, restaurant | konbini, restaurant | = |
| お酒 | konbini, restaurant | konbini, restaurant | = |
| ご飯 | konbini, restaurant | restaurant (sens 1) | − konbini |
| ちゃわん | — | — | = |
| とり肉 | konbini, restaurant | — | − konbini, − restaurant |
| カップ | — | — | = |
| カレー | konbini, restaurant | — | − konbini, − restaurant |
| コーヒー | konbini, restaurant | konbini, restaurant | = |
| パン | konbini, restaurant | konbini | − restaurant |
| レストラン | gare | restaurant | + restaurant, − gare |
| 卵 | konbini, restaurant | — | − konbini, − restaurant |
| 喫茶店 | gare | restaurant | + restaurant, − gare |
| 塩 | konbini, restaurant | — | − konbini, − restaurant |
| 夕飯 | konbini, restaurant | — | − konbini, − restaurant |
| 料理 | konbini, restaurant | restaurant (sens 2) | − konbini |
| 牛乳 | konbini, restaurant | konbini | − restaurant |
| 牛肉 | konbini, restaurant | — | − konbini, − restaurant |
| 砂糖 | konbini, restaurant | — | − konbini, − restaurant |
| 箸 | — | konbini, restaurant | + konbini, + restaurant |
| 紅茶 | konbini, restaurant | konbini, restaurant | = |
| 肉 | konbini, restaurant | — | − konbini, − restaurant |
| 豚肉 | konbini, restaurant | — | − konbini, − restaurant |
| 野菜 | konbini, restaurant | — | − konbini, − restaurant |
| 食べる | konbini, restaurant | — | − konbini, − restaurant |
| 食べ物 | konbini, restaurant | — | − konbini, − restaurant |
| 食堂 | gare | restaurant | + restaurant, − gare |
| 飲み物 | konbini, restaurant | konbini, restaurant | = |
| 飴 | konbini, restaurant | konbini | − restaurant |
| 魚 | konbini, restaurant | — | − konbini, − restaurant |
| ナイフ | — | restaurant | + restaurant |
| お皿 | hotel | — | − hotel |
| コップ | hotel | — | − hotel |
| スプーン | hotel | konbini, restaurant | + konbini, + restaurant, − hotel |
| フォーク | hotel | restaurant | + restaurant, − hotel |
| まずい | — | — | = |
| 甘い | — | — | = |
| 辛い | — | — | = |
| バター | konbini, restaurant | — | − konbini, − restaurant |
| 水 | konbini, restaurant | konbini, restaurant | = |


Légende : `+` ajouté hors des candidats, `−` candidat écarté, `=` décision identique aux candidats.

## 5. Pour valider le lot 02

L'opération sera la même que pour les lots précédents :
1. les 41 entrées et les 80 décisions D0141 à D0220 passent en `validated`, en vérifiant que leur
   contenu reste identique hors statut ;
2. l'assemblage réel doit redonner 123 ENTRY, 28 retraits, 0 erreur, 0 attente ;
3. le test « lot 02 entièrement proposé » devient « lot 02 entièrement validé ».
