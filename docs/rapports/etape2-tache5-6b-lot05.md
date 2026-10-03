# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.6b · Lot 05, révision après arbitrage

**Date** : 2026-10-03
**Référence** : arbitrage du lot 05 (catégories de 時計 et de 荷物).
**Statut du lot** : toujours **en proposition**. Deux corrections ; aucune autre décision
modifiée, aucune nouvelle décision.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **423 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 200 ENTRY, 30 retraits, 0 problème, 0 erreur (lots 0 à 04 seuls validés) |
| D0001 à D0354 | inchangées |
| D0355 à D0409 | mêmes identifiants, statut `proposed` |

**Essai à blanc** (lot 05 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 237 | **237** |
| Identifiants retirés | 30 | **30** |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Avertissements | 2 `categorie-nulle` de plus | `categorie-nulle` × 16 (14 + 時計 + 荷物), `type-nul` × 18, `kanji-inconnu` × 1 |

**Garde-fou d'A5 vérifié sur ce cas** : sans D0404, la reconstruction refuse 時計
(`categorie-nulle-injustifiee`).

## 2. Diff décisionnel

| Élément | Avant | Après |
|---|---|---|
| 時計 `n5_v_671`, sens 1, `category` | temps › unités temporelles › heures, minutes, secondes | `null` |
| 荷物 `n5_v_694`, sens 1, `category` | transports › utilisation des transports | `null` |
| D0404 (時計) | `decision`, champ `category` | `categorie-nulle`, champ `sens 1 · category` |
| D0408 (荷物) | `decision`, champ `category` | `categorie-nulle`, champ `sens 1 · category` |

Le `semantic_type` reste `objet_artefact` dans les deux cas : l'absence de catégorie primaire
pertinente n'empêche pas de connaître le type.

**Justifications (A5)** :
- **時計** : un instrument qui indique le temps, pas une unité temporelle ; le registre n'a pas de
  catégorie d'instrument de mesure. Le ranger avec les unités de l'heure ferait d'une proximité
  fonctionnelle une appartenance.
- **荷物** : ce qui est porté ou transporté, pas une utilisation des transports ; le registre n'a
  pas de catégorie des bagages ni des marchandises.

## 3. Confirmé sans changement

- **いくら** : `pronom`, un sens, fonction `interrogatif` ;
- **買い物** : `suru_compatible: true`, documenté par la source ;
- **les sens** :
  - 高い et ボタン à deux sens ;
  - 時計, 荷物 et 傘 à un sens, avec largeur référentielle ;
- **お金** : abandon de « monnaie » et de « fonds » ;
- **les mots hors JLPT** : `v_718` et `v_719` ;
- **les tags** :
  - `lieu_konbini` pour ces deux seules entrées ;
  - pas de `lieu_hotel` pour スリッパ ;
  - **`lieu_hotel` pour 荷物 (D0406)**.

## 4. Pour valider le lot 05

L'opération sera la même que pour les lots précédents :
1. les 37 entrées et les 55 décisions D0355 à D0409 passent en `validated`, en vérifiant que leur
   contenu reste identique hors statut ;
2. l'assemblage réel doit redonner 237 ENTRY, 30 retraits, 0 erreur, 0 attente ;
3. le test « lot 05 entièrement proposé » devient « lot 05 entièrement validé ».
