# Étape 2 · A2-05 · Volet 1 · Lot 3 — essais de l'outillage v2 (proposition)

**Date** : 2026-10-18
**Statut** : **résultats d'essais, sans adoption.** Écrit par `a2-05-travail/essais-outillage-v2.mjs`. Les rapports arbitrés ne sont ni régénérés ni modifiés (empreintes contrôlées avant et après) ; toutes les sorties du module v2 sont écrites dans un dossier temporaire du système, supprimé à la fin ; les scripts des livraisons arbitrées ne sont pas exécutés (leurs configurations sont lues dans une copie temporaire où le module v1 est remplacé par un capteur).

**Résultat d'ensemble** : **tous les essais sont conformes à l'attendu.**

## 1. Non-régression sur B6 à B9

Pour chaque sens : verdict, catégorie, type, fonctions et correction produits par le module v2, comparés au tableau du §1 du rapport arbitré ; R4 comparé à la valeur arbitrée.

| Livraison | Sens | Différences | R4 v2 | R4 arbitré (source) | Citations contrôlées | Mentions listées, non comptées | Cas complexes (tri) |
|---|---|---|---|---|---|---|---|
| B6 | 9 | aucune | 9 | 9 (§0 de B6 (« R4 à 9 sur 9 »)) | 21 | — | v_152_s1, v_156_s1 |
| B7 | 9 | aucune | 7 | 7 (proposition retenue par l'arbitrage de B7 (7 des 9)) | 37 | — | v_528_s2, v_529_s1, v_550_s1 |
| B8 | 7 | aucune | 6 | 6 (§0 de B8 (« valeur arbitrée : 6 sens sur 7 »)) | 32 | v_663_s2 (D1425) | v_597_s1 |
| B9 | 10 | aucune | 6 | 6 (§0 de B9 (« R4 à 6 sur 10 »)) | 53 | — | v_9_s1 |

**B8** : le module v1 affichait 5 sur 7, la valeur arbitrée est 6 sur 7 ; le module v2 donne **6**, D1425 étant listée pour lecture et non comptée.

## 1 bis. Non-régression du générateur de périmètres (B8, B9)

Valeurs lues dans les périmètres arbitrés, comparées à celles du générateur v2, écrit dans un dossier temporaire.

| Périmètre | Sens nommés par les règles | Sens des mêmes catégories | Autres livraisons | Décisions par ENTRY | Risques détectés | Différences |
|---|---|---|---|---|---|---|
| B8 | 8 / 8 | 54 / 54 | 35 / 35 | 7 ENTRY comparées | 9 | aucune |
| B9 | 3 / 3 | 50 / 50 | 19 / 19 | 9 ENTRY comparées | 4 | aucune |

**Différence voulue, hors comparaison** : les « autres sens des mêmes ENTRY » ne comptent plus les sens de la même tranche (pour B9, les deux sens de 寝る se citaient l'un l'autre).

## 2. Correspondance canonique

- ENTRY publiées : 684 ; avec une entrée source canonique : 684 ; sans : aucune.
- `v_718` → `hj_v_1` ; `v_719` → `hj_v_2` (table de l'assemblage, entrées validées non retirées, correspondance unique exigée).

## 3. Sabotages

| Sabotage (dans une copie temporaire) | Résultat |
|---|---|
| générateur de périmètres : écriture demandée sur le périmètre arbitré de B9 | refusé : docs/rapports/etape2-A2-05-volet1-lot3-B9-perimetre.md : périmètre arbitré, protégé par le manifeste |
| générateur de périmètres : tranche de sens déjà arbitrés hors du mode de non-régression | refusé : v_8_s1 : arbitré, hors des sens restants |
| registre : un sens de B9 ajouté au rapport de B8 | refusé : v_8_s1 : examiné dans plusieurs rapports (B8, B9) |
| registre : un titre de fiche supprimé du rapport de B9 | refusé : B9 : sens du découpage absents du rapport : v_8_s1 |
| registre : un sens inconnu du découpage | refusé : v_99999_s1 : examiné en B9, absent du découpage du lot 3 |
| manifeste : un espace ajouté au rapport arbitré de B6 | refusé : empreinte modifiée : docs/rapports/etape2-A2-05-volet1-lot3-B6.md |
| module v2 : écriture demandée sur le rapport arbitré de B9 | refusé : docs/rapports/etape2-A2-05-volet1-lot3-B9.md : rapport arbitré, protégé par le manifeste ; il ne se régénère pas |
| module v2 : livraison B9 traitée hors du mode de non-régression (sens déjà arbitrés) | refusé : v_8_s1 : déjà arbitré (B9) |
| module v2, mode par défaut (bloquant) : fiches de B6 sans `counter` | refusé : contrôles des motivations : 9 manque(s), dont v_53_s1 : champ non nommé : counter ; v_63_s1 : champ non nommé : counter ; v_150_s1 : champ n |
| module v2, mode par défaut (bloquant) : B9, deux attributions à vérifier, aucun manque | non bloqué (attendu) |

## 4. Contrôles des motivations, en mode signalement

Les fiches d'examen de B6 à B9 ont été écrites avant ces contrôles ; leurs manques ne sont pas des écarts et n'appellent aucune reprise : ils montrent ce que le mode strict exigerait des tranches futures.

**B6** : 9 manque(s), 0 attribution(s) à vérifier :

- `v_53_s1` : champ non nommé : counter
- `v_63_s1` : champ non nommé : counter
- `v_150_s1` : champ non nommé : counter
- `v_152_s1` : champ non nommé : counter
- `v_156_s1` : champ non nommé : counter
- `v_157_s1` : champ non nommé : counter
- `v_160_s1` : champ non nommé : counter
- `v_188_s1` : champ non nommé : counter
- `v_213_s1` : champ non nommé : counter

**B7** : 0 manque(s), 0 attribution(s) à vérifier.

**B8** : 0 manque(s), 0 attribution(s) à vérifier.

**B9** : 0 manque(s), 2 attribution(s) à vérifier :

- `v_8_s1` : attribuée à la fiche, trouvée dans D1160 : « la température douce et agréable de l'eau, d'un objet ou d'un plat » (attribution à vérifier, non comptée comme manque)
- `v_8_s1` : attribuée à la fiche, trouvée dans D1160 : « d0477, validée, abandonnait chaud pour ce sens météorologique ( chaud se dit 暑い) » (attribution à vérifier, non comptée comme manque)

## 5. État avant et après

| Contrôle | Avant | Après |
|---|---|---|
| Manifeste d'empreintes | 27 rapports identiques | 27 rapports identiques |
| Couverture | 148 arbitrés, 229 restants | 148 arbitrés, 229 restants |
| Rapports arbitrés modifiés | — | aucun |

