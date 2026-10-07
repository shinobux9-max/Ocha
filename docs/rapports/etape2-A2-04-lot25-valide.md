# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 25 « Retrait de など » · validation

**Date** : 2026-10-07
**Nature** : validation atomique du lot 25. **Statuts seulement** : `proposed` → `validated`.
Aucun changement de contenu hors statuts.
**Autorisation** : après la relecture de la proposition, approuvée sans correction, ChatGPT a autorisé
la validation, par délégation ; l'utilisateur l'a transmise (« J'autorise la validation atomique du
lot 25 »), en précisant que le commit et le push ne sont pas autorisés. **Ensuite, sur deux accords
explicites et distincts : committé (`b3740c7`) et poussé.** Lot 25 clos.

**À lire avec** : `docs/rapports/etape2-A2-04-lot25-prealable-classe-nado.md` (préalable, arbitrage
au §12), `docs/rapports/etape2-A2-04-lot25-perimetre.md` (périmètre),
`docs/rapports/etape2-A2-04-lot25-proposition.md` (proposition, et le constat corrigé sur `v_717`,
§5), `reconstruction/a2-04/rapports/lot-25.md` (rapport généré).

---

## 1. La bascule

| Fichier | Lignes changées | `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|
| `reconstruction/a2-04/lots/lot-25.json` | 1 | oui (`n5_v_602`) | oui |
| `reconstruction/a2-04/journal.json` | 1 | oui (D1569) | oui |

- **L'entrée `n5_v_602`** et **la décision D1569** passent en `validated`, et rien d'autre.
- Le script refuse de basculer s'il ne trouve pas exactement cette entrée proposée dans le lot, et
  cette décision proposée dans le journal.
- Deux comparaisons après l'écriture : ligne à ligne sur le texte (même nombre de lignes, seules les
  deux lignes de statut diffèrent), puis sur le contenu une fois le champ `status` retiré. Les copies
  d'avant la bascule sont gardées hors dépôt.
- Les 1 568 décisions D0001 à D1568 sont identiques à l'octet ; aucun autre fichier de lot n'est
  modifié.

## 2. Ce qui est validé

- **`n5_v_602` (など)** : retirée **sans successeur**, `retire: { merged_into: null }` ; aucune classe,
  aucun champ lexical.
- **D1569** : nature `retrait`, `before` et `after` nuls ; raison limitée aux quatre points arbitrés
  (la fiche n'atteste que « particule suffixe » ; aucune classe du registre lexical n'est attestée ;
  A3, L8 et la suppression d'un identifiant ; `merged_into: null`). **Aucune règle générale** sur les
  particules ; aucune décision `abandon`.
- **Non modifiés** : les 3 phrases rangées sous `n5_v_602` dans `exemples.json` (pour 5.16),
  `particles.json`, `grammar.json`, les registres, les sources figées, les outils.

## 3. Assemblage réel

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente | Avertissements |
|---|---|---|---|---|---|---|---|
| Avant la validation | 684 | 34 | 1 (など, proposition non validée) | 0 | 0 | 0 | 148 |
| **Après, partiel** | **684** | **35** | **0** | **0** | **0** | **0** | **148** |
| **Après, complet** (`assemble --complete`) | **684** | **35** | **0** | **0** | **0** | **0** | **148** |

- C'est l'état attendu par l'essai à blanc.
- **Toutes les entrées des sources sont décidées** : l'assemblage complet, références des activités
  et des expressions remappées, ne relève aucun problème.
- **Retraits** : 33 fusions, et deux sans successeur : `v_717` (A3, d'emblée) et `v_602` (lot 25).
- **Journal** : 1 569 décisions, D0001 à D1569, toutes validées ; aucune proposition en cours.

## 4. Tests et contrôles

- **Tests** : 481 réussis, 0 échec.
- **Tests d'état adaptés** : aucune entrée écartée ; les assemblages réels des lots 17 à 24 attendent
  684 ENTRY, 35 retraits, 0 écartée ; les 26 fichiers de lot entièrement validés ; le journal entier
  validé, D1569 en dernière position ; le lot 25 affirmé validé, sa forme exacte et sa raison
  contrôlées ; **l'essai à blanc est devenu le contrôle de l'assemblage réel**, partiel et complet ;
  l'empreinte des décisions validées s'étend à D0001–D1569, les empreintes antérieures (D0001–D1509,
  D0001–D1568) restant contrôlées.
- **Sabotages**, rejoués sur l'état validé avec le harnais corrigé (`tests/reconstruction/*.test.js`,
  témoin sain vérifié d'abord : 87 réussis, 0 échec). Chaque sabotage modifie réellement son fichier,
  puis le fichier est rétabli à l'octet près, empreintes contrôlées.
  - Lot 25 : **22/22 attrapés**. Parmi eux : l'entrée ou D1569 remise en `proposed` ; D1569 retouchée
    en silence ; fusion au lieu d'une suppression ; entrée gardée avec une classe ; raison changée en
    règle générale sur les particules ; décision `abandon` ajoutée ; D1568 ou D0001 retouchée.
  - Lot 24 : **51/51 attrapés**.
  - Lot 23 : **40/40 attrapés**.
- `check-layers` : aucune violation. `validate-data` : 0 erreur, 8 avertissements connus. Sources
  conformes au manifeste. `git diff --check` : propre.

## 5. Ce qui reste ouvert

- **Passe finale 5.16** : les 3 phrases d'`exemples.json` rangées sous `n5_v_602`, à rattacher avec
  la remise en cohérence et le remappage des références ; les relations candidates des lots 18 à 24 ;
  les points inscrits au journal pour cette passe.
- **Publication 5.17**, puis l'**audit A2-05**.

## 6. Suite

1. Contrôle du diff de validation.
2. **Commit**, sur un accord explicite. `git diff --stat` et la liste exacte des fichiers sont
   montrés avant.
3. **Push**, sur un accord explicite et distinct.
4. Ensuite seulement, sur demande : la passe finale 5.16.
