# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 25 « Retrait de など » · périmètre

**Date** : 2026-10-07
**Nature** : **proposition de périmètre**, à arbitrer. **Aucune décision lexicale** : aucun fichier de
lot (pas de `lot-25.json`), aucune décision de journal (D1569 n'est pas créée), aucune ENTRY ni
référence de phrase modifiée, aucun statut `proposed`. Rien n'est validé, committé ni poussé.
**Cadre** : l'arbitrage du préalable sur la classe de など (rapport
`docs/rapports/etape2-A2-04-lot25-prealable-classe-nado.md`, §12) : option C, retrait sans
successeur ; aucune classe, aucun addendum A10 ; les phrases traitées à 5.16 ; un lot d'une entrée.

**État réel vérifié avant ce rapport** : `ocha-v2` = `origin/ocha-v2` = `5e9a233` ; assemblage réel :
684 ENTRY, 34 retraits, **1 entrée écartée (など, non décidée)**, 0 problème, 0 erreur, 0 attente ;
1 568 décisions validées (D0001 à D1568), aucune proposition en cours ; 25 fichiers de lot (lot-00
à lot-24) ; 479 tests verts.

---

## 1. Méthode

1. **Les entrées restantes** sont relevées par script : les entrées des sources figées
   (`vocab.json`, `vocab-hors-jlpt.json`) qu'aucun fichier de lot ne décide. Il en reste **une**.
2. **Identifiant contrôlé par script** : distinct, présent une seule fois dans la source, non
   décidé (aucun fichier de lot ne le porte, aucune décision du journal ne le cite).
3. **L'assemblage complet** (`assemble --complete`, en lecture seule, sans `--write`) est lancé sur
   l'état actuel pour relever ce qui empêche encore la publication.
4. **Aucune fiche n'est relue pour une décision nouvelle** : la question de fond est tranchée par
   l'arbitrage du préalable. Ce rapport ne fait que délimiter le lot qui la matérialise.

## 2. Périmètre proposé : 1 entrée

La fiche source complète est dans `07-lot-courant-sources.md`.

| Identifiant | Mot | Traduction de la fiche | Ce que la fiche dit de la classe | Issue arbitrée |
|---|---|---|---|---|
| `n5_v_602` | など | Etc. ; entre autres, et des choses comme… | « **particule suffixe** », seule classe nommée | retrait sans successeur (préalable, Q1 : option C) |

**Contrôle par script** :

| Contrôle | Résultat |
|---|---|
| Identifiants distincts | oui (1) |
| Présent dans la source | oui, une seule fois (`vocab.json`) |
| Non décidé | oui : aucun des 25 fichiers de lot ne le porte ; aucune des 1 568 décisions ne le cite |
| Entrées non décidées dans les sources | `n5_v_602` seule |
| `lot-25.json` | n'existe pas |

## 3. Pourquoi un lot d'une seule entrée

- **C'est la dernière entrée non décidée** : avec ce lot, toutes les entrées des sources seraient
  décidées.
- **Sa question est propre** : elle relève d'un arbitrage normatif (le préalable), non d'un thème
  lexical ; le préalable l'a tenue à part de tout lot thématique (lots 23 et 24).
- **L'arbitrage l'impose** (Q4) : un lot 25 d'une seule entrée, selon le protocole normal
  (périmètre, proposition, relecture, validation).

## 4. Ce que la proposition contiendra, si elle est autorisée

Rien de ce qui suit n'est écrit. C'est la forme attendue, pour que le périmètre soit arbitré en
connaissance de cause.

- **`lot-25.json`** : une entrée, `n5_v_602`, `status: "proposed"`, `retire: { "merged_into":
  null }`, citant une décision de journal.
- **Une décision de journal, D1569**, ajoutée à la fin : `kind: "retrait"`, `field: "entrée"`,
  `before: null`, `after: null` (aucun successeur), `status: "proposed"`. Sa raison reprend
  **seulement** la justification arbitrée, propre à など :
  - la fiche n'atteste que « particule suffixe » ;
  - aucune classe du registre lexical n'est attestée ;
  - A3 distingue la grammaire du vocabulaire (L8) et permet la suppression d'un identifiant ;
  - `merged_into` vaut `null`.
- **Aucun champ lexical** : ni classe, ni sens, ni catégorie, ni type, ni traduction gardée ou
  abandonnée ; une entrée retirée ne porte pas de `fields`. Aucune décision `abandon` n'est
  nécessaire pour les traductions de la fiche, une entrée retirée n'en gardant aucune.
- **Aucune modification** de `exemples.json`, de `particles.json`, de `g_27`, des sources figées, ni
  d'aucune autre ENTRY.

## 5. Dépendances, ambiguïtés et risques

### 5.1. Première suppression sans successeur

- Les 34 retraits actuels sont **tous des fusions** (`merged_into` vers une entrée gardée). Ce
  serait le **premier retrait par suppression**.
- **L'outil le prévoit** : `decisions.mjs` accepte `retire: { merged_into: null }` à condition que
  l'entrée cite une décision de nature `retrait` (sinon, erreur `journal-requis`) ; le validateur
  lexical (`tools/lexicon/schema.mjs`) déclare `merged_into` annulable.
- **À vérifier à la proposition**, par l'essai à blanc en mémoire : que l'assemblage range bien
  `v_602` parmi les identifiants retirés sans successeur, et qu'aucun contrôle ne la traite comme
  une fusion invalide. Si l'outil refusait la forme prévue, la proposition s'arrêterait et le
  signalerait : **aucun outil ne serait modifié sans arbitrage**.

### 5.2. Les phrases d'exemple

- `exemples.json` range **3 phrases** sous `n5_v_602`. **Le lot 25 ne les touche pas** (préalable,
  Q3) : leur rattachement relève de la passe finale 5.16, avec la remise en cohérence et le
  remappage des références.
- **Constat en lecture seule** : l'assemblage complet ne relève aucune référence à `n5_v_602` dans
  les activités (missions, lectures) ni dans les expressions ; il ne signale aujourd'hui qu'un seul
  problème, `n5_v_602 : non décidée`. Les phrases d'`exemples.json` ne passent pas par ce contrôle :
  elles sont inscrites, pour 5.16, comme un point ouvert.

### 5.3. Pas de règle générale

La raison de D1569 ne dira pas qu'une particule est exclue du vocabulaire. Le constat que les
dix-neuf autres particules ne sont pas des ENTRY reste un constat sur les sources, non une règle
(arbitrage du préalable, §12).

### 5.4. Effets attendus après validation

| | Avant | Après le lot 25 |
|---|---|---|
| ENTRY | 684 | 684 |
| Retraits | 34 (34 fusions) | **35** (34 fusions, 1 suppression) |
| Entrées écartées | 1 (など) | **0** |
| Décisions | 1 568 | **1 569** (D1569) |
| Fichiers de lot | 25 | 26 |
| Assemblage complet | 1 problème (など non décidée) | **0 problème attendu**, à confirmer à l'essai à blanc |

Les tests d'état qui attendent など écartée (`workspace.test.js`) seront à adapter à la
validation, comme pour chaque lot.

## 6. Ce qui est à arbitrer

| # | Question | Proposition |
|---|---|---|
| P1 | Le périmètre : `n5_v_602` seule | **oui** |
| P2 | La forme de la proposition (§4) : une entrée en `retire: { merged_into: null }`, une décision `retrait` D1569, aucun champ lexical, aucune décision `abandon` | **oui** |
| P3 | Le titre du lot | « Retrait de など » |

Ensuite, sur autorisation explicite et distincte : la proposition lexicale (lot et D1569 en
`proposed`, essai à blanc, rapport de proposition).

## 7. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport et le rapport du préalable (arbitrage au §12) | `06-lot-courant-rapports.md` |
| La fiche complète de など | `07-lot-courant-sources.md` |
| L'addendum A3 | `04-addenda.md` |
| Le schéma A2-01, le format des lots | `02-conception.md` |
| L'état réel, la note de relais | `05-relais.md` |
| Le diff contre `5e9a233` | `10-diff-et-controles.md` |

## Erratum (2026-10-07, à la proposition du lot 25)

Ce rapport dit que le retrait sans successeur n'a « jamais » été employé et que les 34 retraits
actuels sont « tous des fusions ». **C'est inexact** : ils comptent **33 fusions**, décidées dans les
lots, et **`v_717`**, retiré d'emblée **sans successeur** par l'addendum A3 (clé fantôme
`n5_v_717` d'`exemples.json` ; `RESERVED_RETIRED` dans `tools/reconstruction/rules.mjs`), sans
décision de lot. L'essai à blanc du lot 25 l'a fait apparaître. Ce qui reste vrai : `v_602` serait
le **premier retrait sans successeur décidé dans un lot** et justifié au journal. Les options, la
recommandation, l'arbitrage et les effets attendus (684 ENTRY, 35 retraits, 0 écartée) ne changent
pas. Détail : rapport de proposition du lot 25, §5.
