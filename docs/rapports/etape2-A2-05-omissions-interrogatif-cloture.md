# Étape 2 · A2-05 · bloc F · recherche d'omissions d'`interrogatif` (A10, §8) — bilan de clôture

**Date** : 2026-11-05
**Statut** : bilan de clôture de la recherche d'omissions, établi le 2026-11-05 après l'arbitrage de la livraison E3, et inscrit avec cet arbitrage, sur autorisation distincte (§0). Il ne contient **aucune conclusion lexicale nouvelle** : il rassemble la mesure de couverture et les arbitrages des groupes A à E. Aucune donnée, norme, décision historique ni correction retenue n'est modifiée.

## 0. Autorisation et portée

Autorisation de préparation du 2026-11-05 (l'utilisateur, qui accepte les recommandations de ChatGPT ; relayée par l'utilisateur) : « J'autorise uniquement la préparation, sans application : de l'inscription documentaire de l'arbitrage E3, conformément à QE-4 ; du bilan de clôture de la recherche d'omissions, distinguant clairement les 234 candidats examinés des 573 sens non détectés et non audités. Le bilan ne devra pas conclure que les 807 sens sont conformes. Il devra rappeler que les 204 corrections restent non appliquées et que l'étape 2 n'est pas terminée. […] Ne prépare pas encore l'application des 204 corrections ni la clôture de l'étape 2 : ces opérations nécessiteront des autorisations distinctes. »

**Ce bilan clôt la recherche d'omissions d'A10, §8, et rien d'autre.** Il ne conclut pas que les 807 sens de la population sont conformes : **234 candidats ont été relus et arbitrés ; les 573 autres n'ont été relevés par aucun filtre, n'ont pas été relus, et ne sont pas vérifiés conformes** (A10, §8, compte rendu). Il ne clôt ni le bloc F au-delà de la recherche, ni le lot 3, ni le volet 1, ni l'étape 2, qui **n'est pas terminée** ; les **204 corrections retenues restent non appliquées**.

## 1. En bref

| Décompte | Sens | Statut |
|---|---|---|
| Population de la recherche (sens publiés qui ne portent pas `interrogatif`) | 807 | dans 669 ENTRY ; les 17 porteurs sont exclus, et contrôlés à part |
| **Candidats relevés par au moins un filtre, relus et arbitrés** | **234** | **234 « ne relève pas de la fonction », 0 « relève de la fonction », 0 « à arbitrer » ; aucune omission retenue** |
| **Non relevés par aucun filtre** | **573** | **non relus ; non vérifiés conformes** |
| dont sens non candidats des 195 ENTRY relues | 30 | lus pour l'ENTRY, sans conclusion ; non vérifiés conformes |

Les deux décomptes d'A10, §8, restent séparés et ne s'additionnent jamais : le contrôle des 17 sens qui portent la fonction (bloc F, compté dans les 377 du lot 3, arbitré le 2026-11-03) et la présente recherche d'omissions (hors des 377).

## 2. Couverture (A10, §8, compte rendu)

Mesure exécutée une fois sur autorisation et prise en acte le 2026-11-04 (`docs/rapports/etape2-A2-05-omissions-interrogatif-mesure.md`, §0) ; détail dans `a2-05-travail/arbitrage-F/mesure-couverture/mesure/mesure.json` (SHA-256 `7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44`), dont le présent bilan recalcule les décomptes.

| Filtre | Temps | Ce qu'il relève | Sens relevés | Relevés par ce seul filtre |
|---|---|---|---|---|
| `T1-radicaux` | 1 | radicaux « interrog », « question », « demand » dans le type, les traductions ou les nuances | 18 | 5 |
| `T1-point` | 1 | point d'interrogation dans une traduction ou une nuance | 12 | 6 |
| `T1-mots` | 1 | mot interrogatif français dans une traduction | 7 | 4 |
| `T2-classe` | 2 | ENTRY de classe `pronom`, `determinant` ou `adverbe` | 69 | 44 |
| `T2-nuls` | 2 | sens sans catégorie ou sans type, sans aucune fonction | 144 | 123 |
| `T2-serie` | 2 | ENTRY dont une graphie contient une graphie ou une lecture d'une ENTRY porteuse | 5 | 0 |
| `T2-journal` | 2 | ENTRY dont une décision de journal emploie le vocabulaire de la question | 31 | 10 |
| `X1` | hors A10 | catégorie ou sous-catégorie de la fiche source nommant la question (proposé, hors A10) | 0 | 0 |

- Relevés, dédupliqués (un sens compté une fois, tous ses filtres conservés) : **234** ; par le temps 1 : 35 ; par le seul temps 2 : 199 ; par le seul X1 (filtre complémentaire, hors A10) : 0.
- Répartition par nombre de filtres : 1 filtre : 192 ; 2 filtres : 37 ; 3 filtres : 3 ; 4 filtres : 1 ; 7 filtres : 1.
- Non relevés par aucun filtre : **573**.

## 3. Relecture et arbitrages (temps 3)

Chaque ENTRY a été placée tout entière dans le premier groupe dont un de ses sens porte un filtre (découpage accepté le 2026-11-04) ; chaque candidat a été relu sur sa fiche entière et les fiches fusionnées, ses anciens exemples, son ENTRY publiée et toutes ses décisions, selon la grille R1 à R5, et a reçu une conclusion motivée, arbitrée.

| Livraison | Thème | Sens | ENTRY | Ne relève pas | Relève | À arbitrer | Arbitrée le | Rapport arbitré (§0) |
|---|---|---|---|---|---|---|---|---|
| A | indices textuels du temps 1 (`T1-radicaux`, `T1-point`, `T1-mots`) | 39 | 31 | 39 | 0 | 0 | 2026-11-04 | `docs/rapports/etape2-A2-05-omissions-interrogatif-A.md` |
| B | décisions du journal (`T2-journal`) | 18 | 15 | 18 | 0 | 0 | 2026-11-04 | `docs/rapports/etape2-A2-05-omissions-interrogatif-B.md` |
| C | série (`T2-serie`) | 3 | 2 | 3 | 0 | 0 | 2026-11-04 | `docs/rapports/etape2-A2-05-omissions-interrogatif-C.md` |
| D | classe (`T2-classe`) | 53 | 40 | 53 | 0 | 0 | 2026-11-05 | `docs/rapports/etape2-A2-05-omissions-interrogatif-D.md` |
| E1 | valeurs nulles (`T2-nuls`), noms | 39 | 37 | 39 | 0 | 0 | 2026-11-05 | `docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md` |
| E2 | valeurs nulles (`T2-nuls`), adjectifs | 30 | 27 | 30 | 0 | 0 | 2026-11-05 | `docs/rapports/etape2-A2-05-omissions-interrogatif-E2.md` |
| E3 | valeurs nulles (`T2-nuls`), verbes | 52 | 43 | 52 | 0 | 0 | 2026-11-05 | `docs/rapports/etape2-A2-05-omissions-interrogatif-E3.md` |
| **Total** | | **234** | **195** | **234** | **0** | **0** | | |

**Traçabilité, vérifiée par le script de préparation** : l'ensemble des sens arbitrés dans les sept analyses (`a2-05-travail/omissions-temps3/analyse-{A,B,C,D,E1,E2,E3}.json`) est **exactement** celui des 234 candidats de la mesure ; chaque candidat a reçu une conclusion et une seule, dans une seule livraison ; il garde son identifiant de SENSE et ses filtres d'origine, de la mesure à la conclusion ; les relevés par filtre, recalculés, sont égaux à ceux de la mesure.

## 4. Ce que ce bilan n'établit pas : les limites

1. **Les 573 sens non relevés ne sont pas vérifiés conformes.** Ils n'ont pas été relus. Les filtres ne voient pas une fiche qui décrirait un emploi interrogatif sans aucune des marques recherchées, hors des classes et des séries du temps 2 ; `T2-serie` compare les graphies, non les lectures ; les phrases d'exemple ne sont pas filtrées ; les données de grammaire sont hors de la population (mesure, §7).
2. **Les 30 sens non candidats des ENTRY relues** ont été lus pour l'ENTRY, sans recevoir de conclusion ; ils sont parmi les 573 et ne sont pas vérifiés conformes.
3. **Aucune conclusion n'est tirée pour les 807 sens pris ensemble** : la recherche n'établit l'absence d'omission que pour les 234 candidats relus.
4. **Limites documentaires conservées** : huit sens de E3 ne sont illustrés par aucune phrase de leur fiche, et deux illustrations y sont incertaines ; leurs conclusions reposent sur la description de la fiche, la limite étant explicitement conservée (arbitrage de E3, point 5).
5. **Portée des lectures arbitrées** : la distinction entre l'action ou l'état désigné par un verbe et le porteur de l'interrogation vaut pour les emplois documentés dans E3, **sans règle générale sur tous les verbes** (arbitrage de E3, point 4) ; de même, la distinction entre le contenu de la question et le porteur (E1, E2), et le principe que la présence du mot relu dans une question ne prouve pas qu'il porte la fonction (arbitrage du groupe D, point 3), sont des lectures d'arbitrage, non des normes nouvelles. Aucune norme n'est modifiée ; A10 est appliqué tel qu'il est.
6. **Ce qui n'a pas été examiné** : la catégorie, le type, les dimensions et les fonctions d'A9 des sens relus ; les verdicts du lot 3 et du volet 2, cités sans être rouverts.
7. **Observations éditoriales** relevées à la lecture (anciens exemples, romaji, traductions, champs hérités des fiches) : conservées sans correction dans chaque rapport ; aucune n'est une correction retenue.
8. **Protection** : les documents neufs de `docs/rapports/` de la recherche ne sont pas protégés au manifeste d'empreintes, dont l'outillage ne couvre que le lot 3 (limite documentaire suivie séparément).

## 5. Décisions déjà existantes

Dans chaque rapport, toutes les décisions de journal des ENTRY relues ont été citées, et celles qui attribuent, refusent ou évoquent une fonction ont été confrontées à A10, sans être réécrites ; notamment : D0724 (誰か, pas de fonction interrogative ; confirmée au groupe A), D0637, D0672 et D0677 (groupe B, formule conservée comme observation de rédaction), D1504 (groupe C), D0074, D1113 et D1424 (E2), D1305, D1319, D1323 et D1327 (E3) ; D1184 (E3) n'était qu'un faux positif du repérage. Aucune contradiction avec A10 n'est établie.

## 6. Ce qui reste, hors de ce bilan

- **Les 204 corrections retenues restent non appliquées** (dont celles qui concernent les ENTRY relues ici) ; leur application demande une autorisation distincte.
- **L'étape 2 n'est pas terminée** : le volet 3 (contrôles globaux G1 à G7) n'est pas commencé ; les vérifications hors périmètre HP-1 à HP-4 et les questions de couverture QC-1 et QC-2 restent à cadrer ; la vérification des 120 avertissements `categorie-nulle` reste exigée avant toute déclaration de fin d'étape 2 ; la clôture de l'étape 2 demande une autorisation distincte.
- Le décompte de la recherche ne s'ajoute ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.

## 7. Documents

| Document | SHA-256 |
|---|---|
| `docs/rapports/etape2-A2-05-omissions-interrogatif-mesure.md` | `03d5198e9df16ca9…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-A-perimetre.md` | `dedd75d90a5cfe8c…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-A.md` | `e5e168e3c4cacf8e…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-B-perimetre.md` | `db3f97e46a474e2c…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-B.md` | `8eb0180a7e078e39…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-C-perimetre.md` | `3f472e572c0cbf0f…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-C.md` | `726c4a3e711a0653…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-D-perimetre.md` | `e057ddda41e0ed07…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-D.md` | `65764bb97d892a9e…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md` | `755b872f9489dd97…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md` | `c5d51e50ab8be700…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-E2.md` | `c1ab72ff55ef2562…` |
| `docs/rapports/etape2-A2-05-omissions-interrogatif-E3.md` | `40ba32b22aced419…` |

Les analyses individuelles et les recueils de fiches sont dans `a2-05-travail/omissions-temps3/`, non suivi : analyses A `c9c68bfde7f230d6…`, B `ea7692cdc12be7a1…`, C `c68939612eb47eaf…`, D `c0810c0f677e9364…`, E1 `af7c714ad9ea2e9e…`, E2 `172d18c0243b5e38…`, E3 `44a2f87c1626cab5…`.
