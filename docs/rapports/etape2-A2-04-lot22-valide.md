# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 22 « Manière, identité, diversité et probabilité » · validation

**Date** : 2026-10-06
**Nature** : validation atomique du lot 22. **Statuts seulement** : `proposed` → `validated`.
Aucun changement de contenu hors statuts.
**Autorisation** : après la vérification ciblée de la révision, favorable, ChatGPT a autorisé la
validation, par délégation ; l'utilisateur l'a transmise (« J'autorise la validation atomique du lot
22 »), en précisant que le commit et le push ne sont pas autorisés. **Rien n'est committé, rien
n'est poussé.**

**À lire avec** : `docs/rapports/etape2-A2-04-lot22-perimetre.md` (périmètre, §9),
`docs/rapports/etape2-A2-04-lot22-proposition.md` (proposition, arbitrage des 16 choix et révision,
§9 et §10), `reconstruction/a2-04/rapports/lot-22.md` (rapport généré).

---

## 1. La bascule

| Fichier | Lignes changées | Toutes `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|
| `reconstruction/a2-04/lots/lot-22.json` | 9 | oui | oui |
| `reconstruction/a2-04/journal.json` | 32 | oui | oui |

- **9 entrées** du lot 22 (7 gardées, 2 retirées par fusion) et **32 décisions** (D1404 à D1435)
  passent en `validated`.
- Le script refuse de basculer s'il ne trouve pas exactement 9 entrées proposées dans le lot, et 32
  décisions proposées du lot 22, de D1404 à D1435.
- Deux comparaisons après l'écriture : ligne à ligne sur le texte (même nombre de lignes, seules les
  41 lignes de statut diffèrent), puis sur le contenu une fois le champ `status` retiré. Les copies
  d'avant la bascule sont gardées hors dépôt.
- Aucun autre fichier de lot n'est modifié ; les 1 403 décisions des lots 0 à 21 étaient déjà
  validées et sont identiques ; **弱い (lot 17) n'est pas touchée**.

## 2. Ce qui est validé

**9 entrées, 2 fusions, 9 sens, 32 décisions.**

- **Arbitrage du périmètre** : **弱く fusionnée dans 弱い** (D1412), plus petit numéro, sans
  `exception-fusion`, sans réouverture de 弱い et sans sens nouveau sur elle ; **ゆっくりと
  fusionnée dans ゆっくり** (D1408), son emploi et sa nuance de style en nuance (D1407), と non régie ;
  aucune fonction (D1421, D1424, D1428, D1434 : ni `comparatif`, ni `quantificateur`, ni
  `alternative`, ni `modalite`) ; « Français » de まっすぐ écarté comme confusion de la source
  (D1410), sans remplacement ; aucune relation.
- **Arbitrage des 16 choix**, avec trois corrections appliquées à la révision : ゆっくり à deux sens
  (« Lentement », `vitesse` ; « Tranquillement », sans catégorie, D1435) ; まっすぐ, sens 1, en
  `parcours_trajectoire` ; 同じ en `determinant`, la description de la fiche en nuance (D1418).
- **Lectures** : 一緒 (D1413, furigana de l'exemple de sa fiche) et 同じ (D1417, おなじ).
- **Classes** : 一緒 en `nom` (D1414) ; 同じ en `determinant` (D1418).
- **Types** : `propriete` pour 6 sens (ゆっくり ×2, まっすぐ ×2, 同じ, いろいろ) ; `etat` pour 一緒 ;
  `concept_abstrait` pour 他 ; **aucun type pour たぶん** (`type-nul`, D1433).
- **Dimension** : `probabilite` pour たぶん (D1431).
- **Catégories** : 6 sens sans catégorie (A5) ; ゆっくり, sens 1 (`vitesse`), まっすぐ, sens 1
  (`parcours_trajectoire`) et 一緒 (`interactions_sociales`) en ont une.

## 3. Assemblage réel

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la validation | 650 | 32 | 37 (28 non décidées, 9 propositions) | 0 | 0 | 0 |
| **Après la validation** | **657** | **34** | **28** | **0** | **0** | **0** |

- C'est l'état attendu par l'essai à blanc : 657 = 650 + 7 ; 34 = 32 + 2 (`v_505` vers `v_504`,
  `v_450` vers `v_449`).
- **Journal** : 1 435 décisions, D0001 à D1435, toutes validées ; aucune proposition en cours.
- **Avertissements** : 147, soit 7 de plus qu'avant le lot : 6 `categorie-nulle` et 1 `type-nul`,
  tous justifiés au journal.
- **Les 28 entrées restantes** : 1 nom (大勢), 25 adverbes, conjonctions et interjections, 2
  adjectifs (多い, 少ない). **Toutes dépendent de fonctions A2-LING sans définition normative.**

## 4. Tests et contrôles

- **Tests** : 474 réussis, 0 échec.
- **Tests d'état adaptés** : le lot 22 est affirmé entièrement validé, journal compris ; l'espace de
  travail réel attend 657 ENTRY, 34 retraits, 28 entrées écartées, toutes non décidées, 23 fichiers
  de lot, 147 avertissements, aucune proposition ; le journal, 1 435 décisions toutes validées, les
  32 dernières étant celles du lot 22 ; les contrôles des lots 17 à 21 dans l'assemblage réel suivent
  les nouveaux comptes.
- **L'essai à blanc en mémoire est devenu le contrôle du lot dans l'assemblage réel**, sans bascule
  en mémoire : mêmes assertions (fusions, 弱い et ゆっくり survivantes, classes, lectures, particule
  de 一緒).
- **Sabotages** : 49 rejoués sur l'état validé, tous attrapés, chacun vérifié comme modifiant
  réellement son fichier, puis rétabli à l'octet près (empreintes contrôlées). Parmi eux : une
  entrée, une décision, D1435 ou le lot entier remis en `proposed` ; 弱い rouverte, ou un sens
  ajouté à 弱い ; fusions défaites, inversées ou détournées ; と en particule régie ; « Français »
  remis ou « Franc » inventé ; fonction ou relation posée ; ゆっくり remise à un sens ; まっすぐ remise
  en `orientation` ; 同じ remise en `adjectif_na` ; décision d'un lot clos modifiée.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 5. Ce qui reste ouvert

- **Le point d'arrêt normatif** (rapport de périmètre du lot 22, §4) : les 28 entrées restantes
  dépendent toutes de `connecteur`, `discours`, `politesse`, `quantificateur`, `comparatif`,
  `intensifieur` (et `negation`), sans définition normative ; la classe de など n'existe pas au
  registre. **Une décision normative est nécessaire avant tout périmètre de lot 23.**
- **Morphologie (étape 3)** : la forme en -ku de 弱い (弱く), désormais retirée, est à produire par la
  morphologie ; 同じ, en `determinant`, ne reçoit pas de な.
- **Registre de phrases** : l'exemple altéré de 他.
- **Audit A2-05** : les 6 catégories nulles et le type nul du lot.

## 6. Suite

1. Contrôle du diff de validation.
2. **Commit**, sur un accord explicite ; `git diff --stat` et la liste exacte des fichiers sont
   montrés avant.
3. **Push** : sur un accord explicite et distinct.
4. Ensuite seulement : le point d'arrêt normatif. Le lot 23 n'est pas préparé.
