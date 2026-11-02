# Étape 2 · A2-05 · Volet 1 · Lot 3 — bilan du pilote des tranches (T1, T2, T3)

**Date** : 2026-10-23
**Statut** : **proposition, non arbitrée.** Ce bilan ne transforme aucune proposition en décision : il rapporte des résultats arbitrés, des incidents documentés et des constats, puis formule une recommandation. **Le périmètre de T4 n'est pas accepté** ; aucun audit de ses 35 sens n'est commencé.

**Demande** : décision du 2026-10-23 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Je recommande de conserver T4 en une seule tranche de 35 sens. Toutefois, son acceptation définitive est différée jusqu'à la formalisation du bilan du pilote exigé par le registre. » ; « Rédiger un bilan documentaire distinct, en proposition, à partir des résultats effectivement constatés pour T1, T2 et T3. »

**Fondement** : l'étude de méthode, arbitrée le 2026-10-18 (`docs/rapports/etape2-A2-05-etude-methode.md`), prévoit une « étape 3, bilan du pilote » : « On mesure la taille, le nombre de lectures portées à l'arbitrage, les erreurs relevées et le temps de relecture, puis on confirme ou on ajuste la taille. » `a2-05-travail/registre-tranches.json` porte pour T4 : « conditionnée au bilan du pilote ; divisible en deux ». Aucun bilan du pilote n'avait été consigné ; T2 et T3 ont été conduites sans lui. **Contrôle des chiffres** : `a2-05-travail/controle-bilan-pilote.mjs`, en lecture seule, sans module v2 (§10).

## 1. Ce que le pilote couvre

| Tranche | Livraisons | Sens | ENTRY | Verdicts proposés | Verdicts retenus | Corrections retenues | Arbitrage | Rapport arbitré | Références |
|---|---|---|---|---|---|---|---|---|---|
| T1 (pilote) | B10, B11, B12 | 24 | 22 | 23 conformes, 1 écart | les 24, sans changement | V1-11 (履く, catégorie) | 2026-10-20 | `9188fd78bfbc…` | bilan du volet 2, §8.68 à §8.72 |
| T2 | B13, B14 | 21 | 21 | 20 conformes, 1 écart | les 21, sans changement | V1-12 (シャワー, catégorie) | 2026-10-22 | `0ff57f27b71b…` | §8.73 à §8.80 |
| T3 | B15, B16 | 24 | 24 | 22 conformes, 2 écarts | les 24, sans changement | V1-13 (ボタン sens 2, catégorie), V1-14 (テープ sens 2, traduction secondaire) | 2026-10-23 | `0b7ffa6d3826…` | §8.81 à §8.85 |
| **Total** | 7 livraisons | **69** | — | **65 conformes, 4 écarts** | **69 sur 69** | 4, toutes non appliquées | | | |

Les ENTRY ne sont pas totalisées : une même ENTRY peut avoir un sens dans deux tranches (テープ : sens 1 en T2, sens 2 en T3). Rapports : `docs/rapports/etape2-A2-05-volet1-lot3-T1.md`, `-T2.md`, `-T3.md` ; périmètres : `-T1-perimetre.md`, `-T2-perimetre.md`, `-T3-perimetre.md` ; tous au manifeste d'empreintes. Le pilote proprement dit, au sens de l'étude de méthode, est T1 ; T2 et T3 en sont la généralisation, conduite avant ce bilan, et sont comptées ici parce que la décision le demande.

## 2. Qualité : ce qui a été maintenu

- **Lecture intégrale** de chaque fiche source (traductions, nuance, particules, exemple, anciens exemples), de l'ENTRY publiée et de ses autres sens, des décisions de journal et des corrections déjà retenues, pour chacun des 69 sens ; une fiche d'examen complète par sens, quel que soit le tri.
- **Justification individuelle** : module commun v2 en mode bloquant (champ absent, règle non citée, citation introuvable : arrêt) ; aucun verdict par analogie de traduction, de famille ou de comparable.
- **Arbitrage explicite** de chaque tranche, par le relecteur, sur un export ; inscription au §0 par le module v2, la proposition relue étant conservée octet pour octet (contrôlé à chaque fois) ; aucune décision lexicale n'a été prise hors d'un arbitrage.
- **Constat** : aucun verdict proposé n'a été inversé à l'arbitrage (69 sur 69 retenus). Les arbitrages ont ajouté des précisions (réserves sur きれい, 汚い, 灰皿 en T2 ; `lieu_gare` non exclusif pour 乗る en T3 ; tags hérités dont la pertinence n'est pas démontrée en T1 et T2) et une demande de lecture (les « 20 autres conformités » de T3, confirmée). Ce constat ne prouve pas que les verdicts sont justes : il dit seulement que la relecture n'en a contredit aucun.

## 3. Charge et lectures portées à l'arbitrage

| Tranche | Sens « complexes » au tri | Questions au §7 | Rapport (octets) | Par sens | Périmètre (octets) | Archives de relecture du cycle |
|---|---|---|---|---|---|---|
| T1 | 4 | 5 | 156 208 | 6 509 | 37 715 | 4 à 5 (périmètre, audit, arbitrage et couverture, consolidation ; une archive commune avec C9a et l'erratum) |
| T2 | 2 | 6 | 139 693 | 6 652 | 32 467 | 6 (périmètre, correctif, audit, arbitrage, manifeste, consolidation) |
| T3 | 2 | 5 | 151 015 | 6 292 | 35 631 | 5 (périmètre, audit, arbitrage, manifeste, synchronisation) |

- **Temps et charge de relecture : non mesurés.** Aucune durée de relecture, aucun effort et aucune mesure de fatigue n'ont été relevés ; les dates (T1 du 2026-10-20 au 2026-10-21, T2 du 2026-10-21 au 2026-10-22, T3 du 2026-10-22 au 2026-10-23) sont des dates de documents, non des durées. **Ces mesures sont indisponibles** ; le bilan ne les estime pas.
- La taille d'un rapport est stable, entre 6 300 et 6 650 octets par sens. **Extrapolation, non une mesure** : un rapport de 35 sens ferait environ 220 000 à 233 000 octets, soit environ une fois et demie un rapport du pilote.
- Le nombre d'archives par cycle tient surtout aux opérations techniques (manifeste, synchronisation, correctifs), non à la taille de la tranche. Le décompte des archives est approximatif : certaines couvrent deux sujets.

## 4. Erreurs et incidents techniques

| N° | Tranche | Incident | Résolution | Statut | Référence |
|---|---|---|---|---|---|
| 1 | T1 | Le générateur v2 ne résolvait pas les identifiants hors JLPT (V2-84 de レジ袋 sous `hj_v_1`) : 9 corrections sur les ENTRY de T1, non 8 | correctif du rapprochement hors JLPT, accepté et appliqué le 2026-10-20 | résolu | `etape2-A2-05-correction-hj-proposition.md`, §0 et §7 |
| 2 | T1 | Le registre de couverture ne lisait pas les rapports de tranche (148 sur 377 après l'arbitrage de T1) | correctif de couverture, appliqué le 2026-10-20 | résolu | `etape2-A2-05-couverture-tranches-proposition.md` ; bilan §8.71 |
| 3 | T1 | C9a exigeait la constante 27 : relais 29 sur 30 | C9a réparé le 2026-10-21 (manifeste réel, entrées de tranche par paires) | résolu | même rapport, §6 ; bilan §8.71 |
| 4 | T1 | Étiquettes fausses de quatre comparables du lot 1 dans le périmètre arbitré de T1 (cinq occurrences) | erratum publié le 2026-10-22, document distinct ; périmètre inchangé | résolu par erratum | `etape2-A2-05-volet1-lot3-T1-perimetre-erratum.md` ; bilan §8.75 |
| 5 | T2 | L'état des comparables ignorait les 19 sens du lot 1 | correctif des comparables, appliqué le 2026-10-22 | résolu | `etape2-A2-05-correction-comparables-proposition.md`, §7 |
| 6 | T2 | C9a : 29 sur 30 dès l'acceptation du périmètre (état « périmètre accepté, rapport non arbitré » non prévu) | option A, appliquée le 2026-10-22 (`anomaliesTranches`) | résolu | `etape2-A2-05-c9a-resolution-proposition.md`, §8 |
| 7 | T2 | Premier lancement de l'inscription arrêté sans écriture (copie sans le rapport proposé) | script corrigé ; second lancement conforme | résolu (arrêt sûr) | bilan §8.77 |
| 8 | T3 | `--ajouter` inscrit tout document arbitré hors du manifeste : ajouter le seul périmètre imposait de l'ajouter avant l'inscription de l'arbitrage | ordre adapté, accepté le 2026-10-23 ; outil inchangé | comportement de l'outil, constat | bilan §8.82 et §8.83 |
| 9 | T3 | Le §6 du rapport dépend de l'état du manifeste au moment de la génération : l'inscription a dû reconstituer l'état de la livraison | script d'inscription vérifiant l'empreinte du manifeste reconstitué | résolu | bilan §8.82 |
| 10 | T3 | « Prochaine action » rédigée sans chemin de document : C5f en échec (relais 28 sur 30) | chemin rétabli ; aperçu intermédiaire abandonné | résolu | bilan §8.83 |
| 11 | T3 | Le module v2 écrit « 2 écart » (accord) | consigné ; module partagé avec les rapports protégés | ouvert, non corrigé | bilan §8.81 |
| 12 | T3 | Rubrique « 229 candidats » périmée depuis plusieurs cycles | corrigée avec les rubriques calculées | résolu | bilan §8.82 |
| 13 | T4 (périmètre) | Ligne répétée par relevé `C8-b` dans la liste du §6.1 | consignée ; non corrigée dans ce cycle (décision du 2026-10-23) | ouvert, non corrigé | bilan §8.85 |

**Constats persistants, non ouverts** : date codée en dur de l'aperçu de `sync-stable.mjs` ; statut « planifiée » de T1, T2 et T3 dans `registre-tranches.json` ; « 27 rapports arbitrés » dans le relais figé ; export sans `A2-GLOBAL-v1` (D5) ; plusieurs états intermédiaires du relais à 28 ou 29 sur 30 pendant les consolidations, tous conservés. **Aucune erreur n'a été introduite dans les données** : aucune correction n'est appliquée, et `data/` est celui du commit `3d67594`.

**Lecture** : les incidents 1 à 7 sont des défauts d'outillage révélés par les premiers usages et corrigés ; les incidents 8 à 13 tiennent à la consolidation documentaire (ordre des opérations, rédaction), non à la taille des tranches. Aucun incident n'est lié au nombre de sens d'une tranche.

## 5. Limites du pilote

- **Taille maximale observée : 24 sens.** Le pilote ne dit rien, par mesure, d'une tranche de 35.
- **Aucune mesure de temps ni de charge** (§3).
- **Nature différente des sens** : T1 à T3 portaient surtout sur des catégories et des types ; T4 porte, pour 31 de ses 35 sens, sur l'axe C8 seul (tags de lieu). Le pilote n'a examiné les tags de lieu que ponctuellement (せっけん, シャワー, 電気 sens 2, 乗る, 切符).
- **Taux d'écart bas** (4 sur 69) : il ne permet pas d'évaluer la tenue de la relecture face à une tranche riche en écarts.
- **Relecteur unique** et sans accès au dépôt : la relecture repose sur les exports et sur les contrôles rapportés.

## 6. Risques propres à une tranche de 35 sens

1. **Longueur** : un rapport d'environ une fois et demie la taille du pilote (§3), et un périmètre déjà plus long (45 832 octets, contre 32 467 à 37 715).
2. **Effet de série sur les tags** : 31 sens de même nature (`C8-a`, `C8-b`, `C8-c`) dans des catégories voisines (aliments, boissons, pièces, transports) ; le risque est qu'un jugement sur un tag se propage par analogie d'un sens à l'autre, ce que la doctrine interdit (« chaque candidat hérité est arbitré individuellement »).
3. **Relevés croisés** : les relevés `C8-b` comparent des sens d'une même catégorie (« gardé pour… ; écarté pour… ») ; plusieurs nomment des comparables d'autres livraisons (`v_229_s1`, `v_214_s1`, `v_594_s1`, `v_91_s1`, `v_612_s1`) ; l'un dépend d'une valeur déjà corrigée (V1-12, シャワー, champ du critère).
4. **Quatre ENTRY sans décision de journal** (部屋, 地下鉄, 駅, ポイントカード) : ce n'est pas une anomalie par elle-même (décision du 2026-10-23) ; leur examen s'appuiera sur la fiche et les normes, sans décision antérieure à citer.
5. **Hétérogénéité de C4** : 下手, 出来る sens 1, 少ない et 多い relèvent d'autres axes (C5, C10 : dimensions, fonctions, relations décidées en 5.16), plus proches des examens du pilote.

## 7. Recommandation motivée

**Recommandation : maintenir T4 en une seule tranche de 35 sens**, avec les garde-fous ci-dessous ; la division C1–C2 / C3–C4 reste la solution de repli.

**Motifs** :
- Le pilote n'a montré aucun lien entre la taille et les incidents (§4) ; la taille par sens est stable (§3) ; aucun verdict n'a été contredit (§2).
- Les 31 sens de C1 à C3 posent la même question (le tag de lieu, sur la fiche) : les examiner dans un même rapport permet une lecture cohérente du critère d'un bout à l'autre de la tranche, sans en faire un traitement uniforme.
- Une division n'allègerait pas la consolidation, qui pèse plus que l'audit dans le nombre de cycles (§3) : elle doublerait les opérations d'inscription, de manifeste et de synchronisation.
- **Point neutre** : la coupure C1–C2 / C3–C4 suit les catégories (aliments et boissons, puis pièces, architecture, transports et C4) ; les relevés croisés `C8-b` restent chacun à l'intérieur d'une moitié. Cet argument ne favorise donc ni l'une ni l'autre option.

**Garde-fous proposés** (à inscrire, s'ils sont retenus, dans la décision sur T4) :
1. Chaque sens garde sa fiche d'examen complète et sa lecture intégrale ; aucun verdict collectif sur un tag.
2. Le tri simple ou complexe et les questions du §7 restent produits par le module v2 ; tout point d'interprétation est porté à l'arbitrage, non tranché par série.
3. **Repli** : si le relecteur juge la livraison de 35 sens trop lourde, l'audit peut être livré en deux rapports, C1–C2 puis C3–C4, sur décision, sans modifier la composition des sens. Cette possibilité ne modifie ni le registre ni le découpage ; elle demanderait de fixer, à ce moment, la forme des deux rapports.

**Lecture inverse, exposée** : diviser d'emblée réduirait la longueur de chaque relecture et isolerait C4, de nature différente ; cela ajoute un cycle complet de consolidation.

## 8. Frontière des tags de lieu (décision du 2026-10-23)

La future relecture de T4 **pourra examiner les tags de lieu sens par sens**, sur la fiche source et les normes applicables (critère des tags de lieu, révision du lot 02 : association caractéristique et utile au contexte de l'Explorer, jamais la simple possibilité d'employer le mot dans le lieu ; chaque candidat hérité arbitré individuellement).

Cela **n'autorise pas** :
- un audit transversal général des tags ;
- une règle nouvelle imposant la suppression ou la conservation systématique des tags hérités ;
- la réouverture des arbitrages de T1 à T3 (せっけん, シャワー, 電気 sens 2 : `lieu_hotel` conservé comme donnée héritée ; 乗る et 切符 : `lieu_gare`).

Un tag porté par un comparable d'une autre livraison n'est ni examiné ni rouvert ; un relevé `C8-b` qui nomme un comparable est lu comme un fait du criblage, non comme une décision. **Valeurs publiées et corrections retenues restent distinguées**, notamment V1-12 : la donnée publiée de シャワー reste `salle_de_bain_toilettes` tant que la correction n'est pas appliquée.

## 9. Proposition de décision sur T4

Proposée, non inscrite : le §0 du périmètre de T4 n'est pas renseigné.

1. **Accepter le périmètre opérationnel de T4** tel qu'il a été proposé (`docs/rapports/etape2-A2-05-volet1-lot3-T4-perimetre.md`), sans ajout ni retrait : C1 à C4, 35 sens dans 35 ENTRY, en **une seule tranche**.
2. **Frontière des tags de lieu** : celle du §8.
3. **Garde-fous** : ceux du §7, dont le repli en deux rapports, sur décision.
4. **Éléments préparatoires** : règles, comparables, onze corrections de provenance déjà retenues sur ces ENTRY (ni rouvertes ni appliquées), quatre ENTRY sans décision (non des anomalies), répétition d'affichage `C8-b` non corrigée.
5. **Condition du registre** : remplie par l'arbitrage du présent bilan, si elle est jugée ainsi ; `registre-tranches.json` n'est pas modifié.
6. **Séquence** : inscription de l'acceptation au §0 du périmètre ; ajout du périmètre accepté au manifeste (34e entrée) ; synchronisation ; puis autorisation distincte de l'audit des 35 sens.

## 10. Contrôles

`node a2-05-travail/controle-bilan-pilote.mjs .` : **14 sur 14 conformes**, code 0 (tailles et verdicts proposés de T1, T2 et T3, lus au §1 de chaque rapport ; statut arbitré et retenue des verdicts, lus au §0 ; rapports et périmètres protégés, empreintes recalculées ; total 69 ; périmètre de T4 en proposition, sans §0, 35 sens, hors du manifeste ; condition du registre et statuts non modifiés ; aucun bilan du pilote antérieur au bilan du volet 2 ; 33 empreintes). Décomptes maintenus : 217/377 ; bloc B 148/148 ; 189 corrections dans 169 ENTRY, non appliquées ; V1-15 libre ; 33 empreintes protégées.

## 11. Questions à l'arbitrage

1. Le bilan du pilote est-il accepté, avec ses limites (§5) et l'indisponibilité des mesures de temps (§3) ?
2. T4 est-elle maintenue entière (recommandation), ou divisée C1–C2 / C3–C4 ?
3. La frontière des tags de lieu (§8) et les garde-fous (§7) sont-ils retenus pour l'acceptation de T4 ?
4. La proposition de décision sur T4 (§9) est-elle acceptée, et dans quelle séquence ?
