# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.1c · Addendum A6 et lot 0 prêt à valider

**Date** : 2026-10-02
**Référence** : arbitrage du 2026-10-02 (décision complémentaire A6, `semantic_type: null`).
**Statut du lot** : toujours **en proposition**. L'essai à blanc donne exactement le résultat
attendu : le lot peut passer entièrement en `validated` après cette relecture.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **417 tests, tous verts** (415 avant, 2 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes au manifeste |
| `run.mjs assemble` | 0 ENTRY : rien n'est validé |
| `data/` | non modifié |

**Essai à blanc** (en mémoire, lot **et** journal entièrement supposés validés) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY assemblées | 33 | **33** |
| Identifiants retirés | 28 | **28** (`v_717` et les 27 fusions) |
| Problèmes de reconstruction | 0 | **0** |
| Erreurs du validateur lexical | 0 | **0** |
| En attente | — | **0** |
| Avertissements | A5 et A6 seulement | `categorie-nulle` × 5 (A5), `type-nul` × 3 (A6), et `kanji-inconnu` × 1 (醤) |

L'avertissement sur 醤 n'est ni d'A5 ni d'A6 : 醤 ne figure réellement ni dans les catalogues ni
dans le dictionnaire. C'est le contrôle A2 ordinaire, et l'information est juste.

## 2. Addendum A6

`docs/conception/addendum-A6-semantic-type-null.md` :
- **Règle** : `semantic_type: null` est permis lorsqu'aucun type terminal d'`A2-ST-v1` ne décrit
  correctement la nature du sens.
- **Indépendance** : il ne dépend plus de `category`.
- **Garde-fou** : c'est une décision justifiée sens par sens, jamais une échappatoire.
- **`A2-ST-v1` n'est pas modifié** : seul le schéma Ocha l'est.

**Textes modifiés** :
- `schema-A2-01.md` : le statut cite A6 ; §7 (ligne `semantic_type`, et `category` pour A5) et
  §12 (I9 et I10) ;
- le sommaire liste A6 ;
- A5 renvoie à A6 pour I10.

## 3. Mise en œuvre

**Reconstruction** (`decisions.mjs`) :
- **nature `type-nul`** : ajoutée au journal ;
- **justification exigée** : tout sens à `semantic_type: null` doit citer une décision `type-nul`
  sur ce sens précisément (champ `sens <n> · semantic_type`) ;
- **sinon** : `type-nul-injustifie`, et l'entrée n'est pas assemblée.

**Validateur lexical** (I10, `sense.mjs`) :
- `semantic_type` vaut un type terminal du registre ou `null`, sans condition sur `category` ;
- un type inconnu ou non terminal reste une erreur ;
- `null` sans fonction linguistique donne l'avertissement `type-nul`, pour l'audit.

**Un choix à confirmer.** La reconstruction exige la justification pour **tout**
`semantic_type: null`, comme demandé, y compris pour une unité grammaticale. Le validateur, lui,
n'avertit que pour un sens sans fonction linguistique, par analogie avec A5. Sinon, chaque mot
grammatical (何, les particules de discours…) produirait un avertissement sans intérêt.
- Le lot 0 justifie donc aussi les deux sens fonctionnels : 何 « quoi » et 大変 « très » (D0073,
  D0074).
- Si vous préférez qu'une fonction linguistique suffise aussi en reconstruction, comme pour A5,
  c'est une ligne à changer.

## 4. Lot 0

Les décisions de l'arbitrage, chacune avec sa justification `type-nul` :

| Sens | `semantic_type` | Décision | Raison |
|---|---|---|---|
| お腹 « ventre » | `null` | D0070 (réécrite à sa place) | partie du corps : aucun type terminal ; la partie n'est pas un type sémantique |
| キロ « kilogramme » | `null` | D0071 (réécrite à sa place) | unité de mesure : la mesure est exclue des types |
| キロ « kilomètre » | `null` | D0072 | idem |
| 何 « quoi » | `null` | D0073 | unité grammaticale (interrogatif) |
| 大変 « très » | `null` | D0074 | emploi intensifieur (fonction pragmatique) |

Les catégories restent celles proposées :
- **お腹** : être humain › corps › tronc ;
- **キロ « kilogramme »** : nombres et quantification, niveau 1 seulement ;
- **キロ « kilomètre »** : espace › distance et proximité.

Le registre des catégories n'a pas de branche « unités de mesure ».

**Journal** : 74 décisions.
- Les identifiants des 71 précédentes sont inchangés.
- Seules D0070 et D0071 ont été réécrites, de `decision` en `type-nul`.
- 3 sont nouvelles, de D0072 à D0074.

## 5. Sabotages

| # | Sabotage | Attrapé |
|---|---|---|
| C1 | `semantic_type: null` sans justification | oui |
| C2 | justification acceptée pour n'importe quel sens | oui |
| C3 | justification de n'importe quelle nature | oui |
| C4 | I10 de nouveau lié à `category` | oui |
| C5 | `semantic_type: null` sans aucun signalement | oui |
| C6 | avertissement même avec une fonction linguistique | oui |
| C7 | justification exigée seulement quand `category` est `null` | oui |

## 6. Pour valider le lot 0

Une fois 5.1c relue, j'appliquerai la validation en une opération :
1. les 60 entrées du lot et les 74 décisions du journal passent en `validated` ;
2. l'assemblage partiel et le validateur lexical doivent redonner, cette fois en réel, 33 ENTRY et
   28 identifiants retirés, sans erreur ;
3. le test « le lot 0 est entièrement proposé » devient « le lot 0 est entièrement validé ».

Ensuite viendront les lots thématiques (5.2 et suivants).
