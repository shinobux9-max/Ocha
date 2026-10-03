# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.10b · Lot 09, révision après arbitrage

**Date** : 2026-10-03
**Référence** : arbitrage du lot 09 (釣り, 国).
**Statut du lot** : toujours **en proposition**. Deux corrections ; aucune autre décision modifiée,
aucune nouvelle décision.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **430 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 337 ENTRY, 30 retraits, 0 problème, 0 erreur (lots 0 à 08 seuls validés) |
| D0001 à D0539 | inchangées |
| D0540 à D0574 | mêmes identifiants, entrées, natures et champs ; statut `proposed` |

**Essai à blanc** (lot 09 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 356 | **356** |
| Identifiants retirés | 31 | **31**, dont `v_194 → v_193` |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Entrées restantes après le lot | 332 | **332** |
| Avertissements | inchangés | `categorie-nulle` × 21, `type-nul` × 19, `kanji-inconnu` × 1 |

## 2. Diff décisionnel

| Élément | Avant | Après |
|---|---|---|
| 釣り `n5_v_707`, `suru_compatible` | `true` | **`false`** |
| 国 `n5_v_243`, sens | 2 (pays / pays natal) | **1** : pays (autre traduction : nation) |
| 国, nuance | — | « Désigne aussi le pays ou la région d'origine de quelqu'un : 国に帰る, rentrer au pays ; お国はどちらですか, d'où venez-vous ? » |

| Décision | Changement |
|---|---|
| D0554 (釣り, `suru_compatible`) | `true` → `false`. L'étiquette « Nom / verbe suru » de la source est précisée par les constructions qu'elle documente effectivement (釣りをする, 釣りに行く) : nom + を + する, pas 釣りする. Compatibilité non établie, même doctrine que スポーツ (D0548). |
| D0568 (国, sens) | « deux sens » → « un seul sens ». Le pays natal est le même concept, contextualisé comme lieu d'origine du sujet (国に帰る) : il va dans la nuance. |
| D0570 (国, abandon) | complété : « patrie » (registre soutenu) **et** « région d'origine », reprise dans la nuance |

## 3. `suru_compatible` dans le lot, après révision

| Entrée | Valeur | Ce que la source documente |
|---|---|---|
| 散歩 | `true` | la formation avec する (fiche de 散歩, et l'entrée 散歩する) |
| 旅行 | `true` | « on lui ajoute directement する » |
| 帰国 | `true` | « souvent combiné avec する » |
| スポーツ | `false` | スポーツをする (nom + を + する) |
| 釣り | `false` | 釣りをする, 釣りに行く (nom + を + する) |

Le critère est désormais uniforme : `true` seulement quand la source établit la **formation** du
verbe avec する, et non une simple construction avec を.

## 4. Pour valider le lot 09

L'opération sera la même que pour les lots précédents :
1. les 20 entrées (19 gardées, et le retrait de 散歩する) et les 35 décisions D0540 à D0574 passent
   en `validated`, en vérifiant que leur contenu reste identique hors statut ;
2. l'assemblage réel doit redonner 356 ENTRY, 31 retraits, 0 erreur, 0 attente, 332 entrées
   restantes ;
3. le test « lot 09 entièrement proposé » devient « lot 09 entièrement validé ».
