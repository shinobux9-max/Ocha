# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 25 « Retrait de など » · proposition

**Date** : 2026-10-07
**Nature** : livraison pour relecture, en `proposed` : l'unique entrée du lot et son unique décision
de journal (D1569). **Validé le 2026-10-07**, statuts seulement (rapport
`docs/rapports/etape2-A2-04-lot25-valide.md`) ; committé (`b3740c7`) et poussé.
**Autorisation** : après l'arbitrage du périmètre, approuvé sans correction (P1 à P3), ChatGPT a
autorisé la proposition, par délégation ; l'utilisateur l'a transmise (« J'autorise la proposition du
lot 25 »), en précisant que la validation, le commit et le push ne sont pas autorisés.

**À lire avec** : `docs/rapports/etape2-A2-04-lot25-prealable-classe-nado.md` (préalable, arbitrage
au §12), `docs/rapports/etape2-A2-04-lot25-perimetre.md` (périmètre), et
`reconstruction/a2-04/rapports/lot-25.md` (rapport généré).

---

## 1. Ce qui est écrit

### 1.1. `reconstruction/a2-04/lots/lot-25.json` (nouveau)

```json
{
  "lot": "lot-25",
  "title": "Retrait de など",
  "entries": {
    "n5_v_602": {
      "status": "proposed",
      "journal": [
        "A2-04-D1569"
      ],
      "retire": {
        "merged_into": null
      }
    }
  },
  "additions": []
}
```

Une seule entrée, `n5_v_602` ; aucun champ lexical (`fields`) ; aucun ajout d'ENTRY.

### 1.2. D1569, ajoutée à la fin de `reconstruction/a2-04/journal.json`

| Clé | Valeur |
|---|---|
| `id` | `A2-04-D1569` |
| `status` | `proposed` |
| `date` | `2026-10-07` |
| `lot`, `entry`, `field` | `lot-25`, `n5_v_602`, `entrée` |
| `kind` | `retrait` |
| `before`, `after` | `null`, `null` (aucun successeur) |
| `reason` | « Retrait sans successeur (arbitrage du préalable sur la classe de など, option C ; périmètre du lot 25). La fiche n'atteste que « particule suffixe » ; aucune classe du registre lexical n'est attestée. L'addendum A3 (L8) distingue la grammaire du vocabulaire, et permet la suppression d'un identifiant : merged_into vaut null. » |

La raison s'en tient aux **quatre points arbitrés** : la fiche (« particule suffixe ») ; aucune
classe attestée ; A3, L8 et la suppression d'un identifiant ; `merged_into: null`. Elle ne dit rien
des autres particules : **aucune règle générale**.

**Aucune décision `abandon`** : une entrée retirée ne garde aucune traduction ; la nature
`retrait` suffit (périmètre, P2).

## 2. Ce qui n'est pas touché

- **Les 1 568 décisions validées** (D0001 à D1568) : le journal avant la proposition est un préfixe
  exact du journal après, à l'octet ; l'empreinte des décisions validées est contrôlée par un test.
- **Les 25 fichiers de lot validés** (lot-00 à lot-24) : inchangés.
- **Les 3 phrases** rangées sous `n5_v_602` dans `exemples.json` : intactes, pour 5.16
  (préalable, Q3).
- `data/n5/particles.json`, `data/n5/grammar.json`, les registres (`data/registries/`), les sources
  figées (conformes au manifeste) et les outils : **aucun diff** depuis `5e9a233`.

## 3. Assemblage

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs | Attente | Avertissements |
|---|---|---|---|---|---|---|---|
| Réel, partiel | 684 | 34 | 1 (など, proposition non validée) | 0 | 0 | 0 | 148 |
| **Essai à blanc, partiel** (lot et journal supposés validés) | **684** | **35** | **0** | **0** | **0** | **0** | **148** |
| **Essai à blanc, complet** | **684** | **35** | **0** | **0** | **0** | **0** | **148** |

- **Assemblage complet** : avec le remappage des références des activités et des expressions, comme
  `run.mjs assemble --complete` : 71 références extraites, **0 non remappée** ; aucune ne vise
  `n5_v_602`. L'assemblage complet n'a plus aucun problème : **toutes les entrées des sources
  seraient décidées**.
- **Retraits sans successeur** dans l'essai à blanc : `v_717` et `v_602` (§5) ; `v_602` n'est pas
  assemblée, et aucun avertissement n'apparaît.

## 4. Tests et contrôles

- **Tests** : 481 réussis, 0 échec (479 avant, 2 ajoutés).
- **Tests d'état adaptés** à l'état proposé : など écartée comme « proposition non validée » ; 26
  fichiers de lot, les lots 0 à 24 entièrement validés, seul le lot 25 proposé ; le journal compte
  1 569 décisions, D1569 seule en `proposed`.
- **Tests ajoutés** :
  1. le lot 25 tel qu'arbitré (une entrée, `retire: { merged_into: null }`, D1569 citée, titre) ;
     D1569 de nature `retrait`, sans successeur, sur `n5_v_602`, la seule à citer など, sa raison
     portant les quatre points et aucune formule générale sur les particules ;
  2. l'essai à blanc, partiel et complet : 684 ENTRY, 35 retraits, 0 écartée, sans problème, erreur
     ni attente, `v_602` retirée sans successeur et non assemblée, 148 avertissements.
- **Sabotages** : 21, avec le harnais corrigé (`tests/reconstruction/*.test.js`, témoin sain vérifié
  d'abord : 87 réussis, 0 échec), **21 sur 21 attrapés**, chacun vérifié comme modifiant réellement
  son fichier, puis rétabli à l'octet près (empreintes contrôlées). Parmi eux : entrée ou D1569
  passée en `validated` ; fusion au lieu d'une suppression ; `retire` sans `merged_into` ; entrée
  gardée avec une classe ; D1569 non citée, supprimée, de nature `fusion`, avec un successeur, ou sur
  une autre entrée ; raison privée de « particule suffixe » ou d'A3 (L8), ou changée en règle
  générale sur les particules ; décision `abandon` ajoutée ; seconde entrée, ENTRY ajoutée, titre
  changé ; D1568 ou D0001 retouchée en silence ; lot 24 rouvert ; D1569 citée par le lot 23.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste ; `git diff --check` propre.

## 5. Un constat corrigé : `v_717`

Le rapport du préalable et le rapport de périmètre disent que le retrait sans successeur n'a jamais
été employé, et que les 34 retraits sont tous des fusions. **C'est inexact.** Les 34 retraits
comptent :

- **33 fusions**, décidées dans les lots ;
- **`v_717`**, retiré **d'emblée et sans successeur** par l'addendum A3 (« `v_717` est retiré
  d'emblée, à cause de la clé fantôme `n5_v_717` de `exemples.json` »), inscrit dans l'outil comme
  `RESERVED_RETIRED`, sans décision de lot.

L'essai à blanc l'a fait apparaître. **Ce qui reste vrai** : `v_602` serait le premier retrait sans
successeur **décidé dans un lot** et justifié au journal. Le mécanisme, lui, est déjà éprouvé par
l'assemblage et par le validateur, ce qui confirme que la forme prévue est acceptée. Rien de
l'arbitrage ne change. Un erratum est ajouté à la fin des deux rapports, sans réécrire leur texte
arbitré.

## 6. Ce qui est à relire

1. **`lot-25.json`** : la forme exacte (§1.1), conforme à P2.
2. **D1569** : nature, champs, et la raison, limitée aux quatre points arbitrés (§1.2).
3. **L'essai à blanc** (§3) : 684 ENTRY, 35 retraits, 0 écartée ; assemblage complet sans problème.
4. **Le constat corrigé sur `v_717`** (§5) et les deux errata.

Ensuite : des corrections, ou l'autorisation explicite de la validation atomique du lot 25 (entrée et
D1569, de `proposed` à `validated`). Cette relecture n'autorise ni validation, ni commit, ni push.
