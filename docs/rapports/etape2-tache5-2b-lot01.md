# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.2b · Lot 01, révision après arbitrage

**Date** : 2026-10-02
**Référence** : arbitrage du lot 01 du 2026-10-02 (方, 叔 / 伯, 頭, fonction `politesse`, quatre
corrections).
**Statut du lot** : toujours **en proposition**. Aucune nouvelle infrastructure.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **419 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 33 ENTRY, 28 retraits, 0 problème, 0 erreur (seul le lot 0 est validé) |
| Lot 0 (D0001 à D0074) | inchangé |
| Identifiants D0075 à D0139 | conservés (même entrée, même nature, même champ) |

**Essai à blanc** (lot 01 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 82 | **82** |
| Identifiants retirés | 28 | **28** |
| Problèmes de reconstruction | 0 | **0** |
| Erreurs du validateur | 0 | **0** |
| En attente | 0 | **0** |
| Avertissements | intentionnels | `type-nul` × 17, `categorie-nulle` × 10, `kanji-inconnu` × 1 (醤) : les mêmes qu'en 5.2 |

## 2. Diff décisionnel

### Entrées modifiées (6)

| Entrée | Champ | Avant | Après |
|---|---|---|---|
| 叔父 `n5_v_25` | nuance | « Écrit 叔父 pour **la** frère cadet… 伯父 pour **la** frère aîné… » | « Écrit 叔父 pour **le** frère cadet… 伯父 pour **le** frère aîné… » |
| 姉 `n5_v_30` | nuance | « pour **son propre** grande sœur… pour **celui** d'autrui… s'adresser à **lui** » | « pour **sa propre** grande sœur… pour **celle** d'autrui… s'adresser à **elle** » |
| 母 `n5_v_37` | nuance | « pour **son propre** mère… **celui**… **lui** » | « pour **sa propre** mère… **celle**… **elle** » |
| 歯 `n5_v_54` | sens 1, alternatives | `["Denture"]` | `[]` ; nouvelle décision D0140 citée |
| 病院 `n5_v_56` | sens 1, alternatives | `["Clinique"]` | `[]` |
| 男 `n5_v_686` | sens 1, alternatives | `["Garçon"]` | `[]` |

### Décisions du journal réécrites à leur place (8)

| Identifiant | Entrée | Changement |
|---|---|---|
| D0081 | 叔母 | « voie alternative à arbitrer » → décidé : pas de graphie 伯母, pas d'ENTRY distincte, information dans la nuance |
| D0083 | 叔父 | idem pour 伯父 |
| D0093 | 男 | abandon complété : « Sexe masculin » **et « Garçon »** (l'enfant est représenté par 男の子) |
| D0098 | 方 | « question d'identité à arbitrer » → **voie A retenue** : « personne », respectueux, `suffix: false` ; 〜方 unité distincte, en attente d'un chantier sur les affixes |
| D0099 | 方 | abandon de « manière de faire » reformulé (sens du suffixe, unité distincte) |
| D0108 | 頭 | « à arbitrer » → **deux sens retenus** (tête, esprit) |
| D0134 | 病院 | abandon complété : « Clinique » et « Centre médical » (termes voisins, pas équivalents) |

### Nouvelle décision (1)

| Identifiant | Entrée | Décision |
|---|---|---|
| D0140 | 歯 | abandon de « Denture » : une dent et la denture ne sont pas la même unité conceptuelle |

## 3. Arbitrages appliqués sans changement de données

- **方** : voie A. L'ENTRY avait déjà `suffix: false` et un seul sens, « personne » ; seul le
  journal change.
- **叔母 / 叔父** : sans graphie 伯母 / 伯父, comme proposé.
- **頭** : deux sens, comme proposé.
- **Fonction `politesse`** : toujours absente des termes d'adresse, par cohérence avec le lot 0.
- **Accepté sans modification** :
  - 足 (un sens, « jambe » en autre traduction) ;
  - 目, 耳, 顔, 口, 手 (un sens chacun) ;
  - 背 et 子供 (deux sens) ;
  - les 14 `type-nul`, les 5 `categorie-nulle`, les catégories et les nuances sociales.

## 4. Pour valider le lot 01

L'opération sera la même que pour le lot 0 :
1. les 49 entrées et les 66 décisions du lot 01 (D0075 à D0140) passent en `validated`, en
   vérifiant que leur contenu reste identique hors statut ;
2. l'assemblage réel doit redonner 82 ENTRY, 28 retraits, 0 erreur, 0 attente ;
3. le test « lot 01 entièrement proposé » devient « lot 01 entièrement validé ».
