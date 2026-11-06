# A2-05 · bloc F · recherche d'omissions d'`interrogatif`, temps 3 — périmètre du groupe C

**Date** : 2026-11-04
**Statut** : **proposition, non arbitrée.** Aucun sens du groupe C n'est relu, aucun verdict lexical n'est pris, aucune donnée n'est modifiée.

**Demande** (relayée) : « Je t'autorise uniquement à préparer, sans appliquer : […] le périmètre du groupe C, conformément au découpage accepté : 3 sens dans 2 ENTRY, avec les identifiants, les filtres d'origine, les fiches sources et les décisions historiques pertinentes. Ne commence aucun verdict lexical sur C avant mon acceptation explicite de son périmètre. »

**Base** :
- addendum A10 (§2 à §4, §6, §8) ;
- découpage accepté le 2026-11-04 (`a2-05-travail/omissions-temps3/decoupage.json`, SHA-256 `56da6952…7acc46`) ;
- méthode des groupes A et B (QA-4 et QB-2, acceptées).

**Outillage** : `a2-05-travail/omissions-temps3/preparer-perimetre-C.mjs`, en lecture seule, code 0 ; il produit `perimetre-C.json` et `dossier-C.md` (annexe). L'annexe recopie en entier les deux fiches sources, leurs six anciens exemples, les deux ENTRY publiées et les sept décisions de journal.

## 1. Thème du groupe

**La série (T2-serie).** Le filtre relève une ENTRY dont une graphie contient une graphie ou une lecture d'une ENTRY porteuse d'`interrogatif`. C'est une comparaison de chaînes, non de sens. Les trois sens portent aussi `T2-classe` (classe `adverbe`). Aucun ne porte un filtre du temps 1 ni `T2-journal`.

| ENTRY | Mot | Porteur dont la forme est contenue | Sens porteur |
|---|---|---|---|
| `v_494` | いつも | `v_391` いつ | `v_391_s1` « Quand » |
| `v_499` | どうも | `v_393` どう | `v_393_s1` « Comment » |

Les porteurs sont cités pour expliquer le filtre ; ils ne sont pas relus. **A10, §3, point 2, exclut toute conclusion par la série** : qu'une graphie en contienne une autre ne dit rien du sens modélisé.

`T2-serie` relève cinq sens dans toute la mesure. Les deux autres, どうぞ (`v_600_s1`, groupe B) et 誰か (`v_700_s1`, groupe A), sont déjà relus et arbitrés, dans leur groupe, en vertu de la règle de priorité.

## 2. Identifiants : 3 sens, 2 ENTRY

| N° | SENSE | ENTRY | Mot | Traduction publiée | Filtres d'origine | Catégorie publiée | Type | Fonctions publiées | Lot 3 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_494_s1` | `v_494` | いつも | Toujours | `T2-classe`, `T2-serie` | `temps › frequence › frequent` | `concept_abstrait` | — | D5 (T8) |
| 2 | `v_499_s1` | `v_499` | どうも | Merci | `T2-classe`, `T2-serie` | `null` | `null` | `politesse` | D6 (T6) |
| 3 | `v_499_s2` | `v_499` | どうも | Vraiment | `T2-classe`, `T2-serie` | `null` | `null` | `intensifieur` | D6 (T6) |

**Contrôles** (tous conformes) :
- les filtres d'origine sont identiques à la mesure ;
- aucune ENTRY du groupe ne figure dans un autre groupe ;
- tous les sens publiés de ces deux ENTRY sont candidats ;
- aucun ne porte la fonction.

## 3. Fiches sources

Les deux fiches sont présentes, sans fiche fusionnée, chacune dans un lot validé. Elles sont recopiées en entier dans l'annexe.

| Fiche | Lot | Ancien rangement | Traductions | Nuance de la fiche | Anciens exemples |
|---|---|---|---|---|---|
| `n5_v_494` いつも | lot 21 | `adverbes_expressions / frequence` | Toujours ; Habituellement ; En tout temps | « **Adverbe** exprimant une action ou un état qui se répète régulièrement sans exception notable, ou une habitude constante. » | 3 |
| `n5_v_499` どうも | lot 23 | `adverbes_expressions / politesse` | Merci ; Bien des choses ; Vraiment (particule d'atténuation) | « **Adverbe** / formule abrégée utilisée seule pour remercier de façon familière mais polie (raccourci de *doumo arigatou*), ou pour exprimer un vague sentiment de gêne ou d'incertitude. » | 3 |

À l'export de la relecture, comme pour A et B, figureront les deux fiches complètes, leurs anciens exemples et les ENTRY publiées.

## 4. Décisions historiques pertinentes

**Sept décisions de journal**, toutes `validated`, citées en entier dans l'annexe. **Aucune n'emploie le vocabulaire de la question** : C n'est pas relevé par `T2-journal`.

| ENTRY | Décisions | Objet |
|---|---|---|
| いつも | D1370 (lot 21) | un seul sens ; catégorie `temps › frequence › frequent`, type `concept_abstrait`, comme les autres mots de fréquence ; aucune dimension, aucune particule |
| どうも | D1504 (lot 23) | deux sens, « Merci » et « Vraiment » ; le « vague sentiment de gêne ou d'incertitude » reste en nuance, « la fiche ne le développant pas » |
| どうも | D1505 | abandon de « Bien des choses », signalée en nuance |
| どうも | D1506, D1507 | fonctions : `politesse` (sens 1, A9, §3.3) ; `intensifieur` (sens 2, A9, §3.6) |
| どうも | D1508, D1509 | type nul pour les deux sens (A6 ; A9, §4.2) |

**Verdicts du lot 3**, cités et non rouverts :
- `v_494_s1` : livraison D5, tranche T8, **conforme** (arbitrée le 2026-10-31) ;
- `v_499_s1` et `v_499_s2` : livraison D6, tranche T6, **conformes** (arbitrée le 2026-10-29). Pour le sens 2, le point 4 (« vraiment » ou « atténuation ») a été confirmé : `intensifieur` est conforme dans les deux lectures de la fiche.

**Corrections retenues, non appliquées** : aucune sur ces deux ENTRY.

**Fonctions déjà portées** : `politesse` (`v_499_s1`) et `intensifieur` (`v_499_s2`). Un cumul ne se poserait (A10, §6) que si la fonction `interrogatif` était établie.

## 5. Points à examiner à la relecture (sans conclusion ici)

1. **La série ne décide pas** (A10, §3, point 2) : いつも et どうも sont relevés parce que leurs graphies contiennent いつ et どう. La relecture part de la fiche, non du porteur.
2. **いつも** : la fiche décrit une fréquence (« sans exception notable », « habitude constante »). La frontière des indéfinis (A10, §4, point 1) est à examiner en R3, sans être présumée.
3. **どうも** : la nuance de la fiche mentionne un emploi « pour exprimer un vague sentiment de gêne ou d'incertitude », que D1504 garde en nuance. R1 et R2 diront si ce texte atteste ou non une demande d'information non spécifiée (A10, §2 ; §3, point 1).
4. **Ancien exemple de どうも** : il est traduit « Je vous demande mille excuses / Au revoir ». Le mot « demande » y appartient à la traduction d'un exemple, que les filtres ne lisent pas ; il sera lu en R2 comme tout ancien exemple.
5. **Sens par sens** (A10, §3, point 3) : les deux sens de どうも reçoivent chacun une conclusion.

## 6. Méthode de relecture (A10, §8, temps 3)

Elle est **identique à celle des groupes A et B** (QA-4, QB-2, acceptées) :
- la fiche entière, ses anciens exemples, l'ENTRY publiée et tous ses sens, toutes les décisions de journal de l'ENTRY et l'entrée de son lot ;
- pour les trois sens, communs au lot 3, leur verdict arbitré, cité et non rouvert, la relecture portant sur la seule fonction.

**Grille R1 à R5, sur la fonction seule** :

| N° | Question | Référence |
|---|---|---|
| R1 | Demander une information non spécifiée fait-il partie intégrante du sens modélisé ? | A10, §2 ; §3, point 1 |
| R2 | La fiche l'atteste-t-elle ? Une nuance, une traduction contextuelle ou une question d'exemple ne suffisent pas. | A10, §3, point 1 ; §8 |
| R3 | Une frontière s'applique-t-elle (indéfini, `deictique`, registre poli, sens qui nomme une question, marque grammaticale) ? | A10, §4 |
| R4 | Si R1 et R2 sont positives, un cumul serait-il fondé ? | A10, §6 |
| R5 | Les décisions existantes, citées et jamais réécrites, s'accordent-elles avec la définition ? | A10, §8 |

**Conclusions**, une par sens, motivée : « ne relève pas de la fonction », « relève de la fonction » (omission signalée, rien n'est modifié, hors des 377) ou « à arbitrer ».

**Livraison** : un seul rapport de relecture du groupe C, en proposition, avec le recueil des deux fiches complètes, sur le modèle de A et de B.

## 7. Ce qui reste séparé

- **Les 377 sens du lot 3** ne sont pas rouverts ; les trois sens de C reçoivent une conclusion sur la seule fonction.
- **Les 204 corrections** restent non appliquées ; aucune ne porte sur ces deux ENTRY.
- **La recherche d'omissions** est comptée à part. Après A et B : 57 relus, 177 restent ; C en porte 3.
- **Les groupes D et E** ne sont pas commencés.

## 8. Questions à l'arbitrage

1. **QC-1** : accepter le périmètre du groupe C tel qu'il est (3 sens, 2 ENTRY, thème T2-serie).
2. **QC-2** : appliquer à C la méthode de A et de B (grille R1 à R5, trois conclusions, un seul rapport, recueil des deux fiches complètes à l'export).
3. **QC-3** : pour les trois sens, communs au lot 3 (D5, D6), une conclusion sur la seule fonction, leurs verdicts cités et non rouverts.
4. **QC-4** : autoriser, distinctement, l'ouverture de la relecture du groupe C.
