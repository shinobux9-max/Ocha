# Étape 2 · A2-05 · Bilan consolidé du volet 2 et suite proposée

**Date** : 2026-10-08
**Statut** : **proposition, non arbitrée**, pour les sections 3 à 6 (points restants, ordre d'exécution, périmètre du prochain lot). Les sections 1 et 2 consolident des arbitrages déjà rendus.
**Précision du 2026-10-12** (arbitrage du checkpoint documentaire) : **les §3 à §5 demeurent des propositions non arbitrées** ; **le §6 était une proposition de périmètre, acceptée le 2026-10-08 puis exécutée** (lot 1 du volet 1 : §7 et §8.1) ; les §7 et §8 enregistrent des arbitrages rendus, dont la liste consolidée unique des corrections. Les sections historiques sont conservées telles quelles.
**Ce document ne décide rien et ne modifie rien** : aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot, aucun inventaire, aucun outil ni aucun test. `ocha-v2` et `origin/ocha-v2` sont à `5a8687b063fd2fca7c343d544aff040709bc5ec8` ; rien n'est committé, indexé ni poussé depuis.

Rapports de référence : `etape2-A2-05-audit-null.md` (les 147 fiches, le contrôle de clôture en T7.8), `etape2-A2-05-criblage-coherence.md` (volet 1), `etape2-A2-05-perimetre*.md` (les trois périmètres validés), `docs/relecture/reprise-A2-05.md` (relais).

---

## 1. Bilan du volet 2 : les 147 `null` sont audités et arbitrés

### 1.1 Verdicts

| Tranche | Objet | Cas | L | F | C | N |
|---|---|---|---|---|---|---|
| 1 | les 27 `type-nul` | 27 | 24 | 1 | 2 | 0 |
| 2 | `categorie-nulle` : personne générique, état, événement, fiche qui déborde, また sens 2 | 26 | 23 | 1 | 2 | 0 |
| 3 | « propriété générale » | 29 | 29 | 0 | 0 | 0 |
| 4 | « action générale », première partie | 22 | 21 | 0 | 1 | 0 |
| 5 | « action générale », seconde partie | 14 | 14 | 0 | 0 | 0 |
| 6 | « aucune catégorie ne nomme la notion » | 18 | 14 | 0 | 4 | 0 |
| 7 | « autre formulation » | 11 | 11 | 0 | 0 | 0 |
| **Volet 2** | | **147** | **136** | **2** | **9** | **0** |

Par code : 27 `type-nul` (L 24, F 1, C 2) et 120 `categorie-nulle` (L 112, F 1, C 7). Tous les verdicts ont été arbitrés par ChatGPT, sur délégation. **N = 0** : aucun cas n'a requis de chantier normatif pour être tranché.

### 1.2 Preuve de complétude

Calculée par `a2-05-travail/audit-cat-t6.mjs` sur `reconstruction/a2-04/avertissements-connus.json` et sur les fiches du rapport d'audit ; le script s'arrête au premier écart (rapport d'audit, T7.8).

| Contrôle | Résultat |
|---|---|
| Avertissements de l'inventaire | 148 : 120 `categorie-nulle`, 27 `type-nul`, 1 `kanji-inconnu` (hors du volet 2, renvoyé à G5) |
| Fiches d'audit | 147 : 120 et 27 |
| Avertissements sans fiche ; fiches sans avertissement ; couples portant deux fiches | 0 ; 0 ; 0 |
| SENSE distincts | 144 (trois portent les deux avertissements : `v_500_s2`, `v_521_s1`, `v_653_s1`) |
| Verdict par fiche | un et un seul ; L + F + C + N = 136 + 2 + 9 + 0 = 147 |
| Verdicts arbitrés recomptés contre la table du script | 0 écart |
| Chaque fiche a une décision de journal `validated` de la nature attendue, sur le sens précis | oui, contrôlé tranche par tranche |

### 1.3 Ce que l'audit a établi, au-delà des verdicts

- **La formule de la raison n'est pas la preuve.** « État général », « événement général », « action générale », « notion générale », « résultat général » ne sont pas dans la liste des éléments hors hiérarchie (A2-L3 §6, A2-GLOBAL §4.4). Chaque `null` a été vérifié sur la fiche. La correspondance de substance entre « action générale » et « action générique » est acceptée pour les cas justifiés individuellement, sans devenir une présomption.
- **Un objet spécialisé suit le domaine qu'il sert** (A2-L3 §7, règle 5) : 時計 et カレンダー reçoivent une catégorie ; seul 物, l'objet générique, relève de la liste hors hiérarchie.
- **Une catégorie publiée pour des comparables directs s'applique** quand la fiche ne justifie pas la différence (皆 et 皆さん face à 大勢 ; 並ぶ sens 1 face à 並べる ; また sens 1 et もう一度 face à 初めて). **Elle ne s'impose pas par simple symétrie** (一人 face à 一緒 ; 冷たい face à 明るい ; 他 face à 後).
- **Une fiche qui déborde un domaine** fonde le `null` plus solidement qu'une formule (doctrine du lot 19 : 死ぬ, 力, 返す, 吹く, 休む…).
- **Les relevés du criblage** portant sur ces 144 sens (61 étaient candidats au volet 1) ont été traités dans les fiches : un cas n'est audité qu'une fois.

## 2. Liste fermée des dix modifications retenues, et leurs effets

**Aucune n'est appliquée.** Toutes sont arbitrées ; leur exécution demande une autorisation distincte (§5, phase B).

| # | SENSE | Mot | Lot | Cl. | Champ | De | Vers | Avertissements qui cesseraient |
|---|---|---|---|---|---|---|---|---|
| 1 | `v_500_s2` | また « Aussi » | 21 | F | `linguistic_functions.pragmatic_discourse` | `[]` | `["connecteur"]` | `type-nul` et `categorie-nulle` |
| 2 | `v_65_s2` | 頭 « Esprit » | 01 | C | `semantic_type` | `null` | `propriete` | `type-nul` |
| 3 | `v_696_s1` | 表 « Face » | 10 | C | `semantic_type` | `null` | `lieu` | `type-nul` |
| 4 | `v_606_s1` | 皆 « Tout le monde » | 11 | C | `category` | `null` | `nombres_quantification › totalite_partie › totalite` | `categorie-nulle` |
| 5 | `v_687_s1` | 皆さん « Tout le monde » | 01 | C | `category` | `null` | `nombres_quantification › totalite_partie › totalite` | `categorie-nulle` |
| 6 | `v_528_s1` | 並ぶ « Faire la queue » | 18 | C | `category` | `null` | `espace_proprietes_spatiales › position_localisation` | `categorie-nulle` |
| 7 | `v_671_s1` | 時計 « Horloge » | 05 | C | `category` | `null` | `temps` (niveau 1 seul) | `categorie-nulle` |
| 8 | `v_287_s1` | カレンダー « Calendrier » | 13 | C | `category` | `null` | `temps › calendrier` | `categorie-nulle` |
| 9 | `v_500_s1` | また « À nouveau » | 21 | C | `category` | `null` | `temps › chronologie › succession` | `categorie-nulle` |
| 10 | `v_503_s1` | もう一度 « Encore une fois » | 21 | C | `category` | `null` | `temps › chronologie › succession` | `categorie-nulle` |

Pour chacun de ces sens, **les autres champs restent inchangés** ; aucun identifiant de SENSE n'est renuméroté.

**Effets attendus**, vérifiés par le script sur les données publiées (chaque champ visé est bien `null` ou vide ; chaque catégorie visée existe au registre) :

| Mesure | Avant | Après |
|---|---|---|
| Avertissements `categorie-nulle` | 120 | 112 (8 cessent) |
| Avertissements `type-nul` | 27 | 24 (3 cessent) |
| Total du volet 2 | 147 | 136, tous classés L |
| `kanji-inconnu` | 1 | 1 (inchangé) |
| SENSE modifiés | — | 10 (`v_500_s2` porte deux avertissements pour une seule modification) |
| ENTRY à rouvrir | — | 9 (また porte deux modifications, une par sens) |
| Lots d'origine touchés | — | 7 : 01, 05, 10, 11, 13, 18, 21 |
| Décisions de journal nouvelles | — | à partir de D1614 (réouvertures, puis corrections), à la fin du journal |

**Ce que la preuve de sortie exigera** (périmètre du volet 2, §9) : inventaire resynchronisé par une commande déterministe et testée, égal aux 136 avertissements encore émis ; chacun rattaché à une décision `validated` et à un verdict L ; aucun avertissement nouveau.

## 3. Volet 1 : ce qui reste à examiner individuellement

### 3.1 Les candidats du criblage non encore lus

Le criblage (validé) a retenu **443 sens candidats**. 61 étaient parmi les 144 sens du volet 2 et sont traités. **Restent 382 sens candidats, dans 335 ENTRY**, non examinés individuellement. Un sens peut relever de plusieurs axes.

| Axe | Objet | Sens restants |
|---|---|---|
| C1 | catégories posées (contexte d'usage, comparables, même traduction) | 183 |
| C2 | `category: null` portés par une fonction | 55 |
| C3 | types posés, dont les `concept_abstrait` (examen individuel imposé) | 111, dont 86 `concept_abstrait` |
| C4 | `semantic_type: null` portés par une fonction | 71 |
| C5 | dimensions | 6 |
| C7 | fonctions, dont les sens décidés avant A7 et A9 | 48 |
| C8 | tags de lieu | 44 |
| C10 | justifications datées | 27 |
| RES | points réservés par les lots | 24 |

C6 (les 22 relations et les candidates journalisées) et C9 (citations d'A2-GLOBAL) portent sur des liens et des décisions, non sur des sens ; ils restent à conclure à partir des constats du criblage.

**Chantier normatif signalé** : 17 sens portent `interrogatif`, fonction sans définition normative, appliquée sur un sens implicite. Sa définition (un addendum, arbitré à part) doit aboutir avant la clôture de l'étape 2. `modalite`, `aspect` et `alternative` restent sans définition ; aucun verdict du volet 2 n'en dépend.

### 3.2 Les points de contrôle transversaux ouverts par le volet 2

Renvoyés au volet 1 par arbitrage, **sans verdict** (relais, §6 bis).

| # | Point | Sens publiés à examiner | Sens du volet 2 déjà arbitrés, pour mémoire |
|---|---|---|---|
| T1 | le caractère d'une personne est-il un « état psychologique » ? | 明るい sens 2, 暗い sens 2, 爽やか sens 2 | 冷たい sens 2, まっすぐ sens 2, 甘い sens 2 (L) |
| T2 | une fiche qui couvre plusieurs domaines et porte une catégorie | 洗う | 磨く (L) |
| T3 | les deux pôles de la compagnie | 一緒 | 一人 sens 2 (L) |
| T4 | « Le reste » | 後 sens 3 | 他 (L) |
| T5 | **provenance** des informations publiées non retrouvées dans les fiches sources | 出る sens 2 (particule に, nuances), 出る sens 3 (particule が, nuance), 吹く sens 2 (nuance) ; **et tout autre sens concerné** | — |
| T6 | le type des adverbes de manière | だんだん, ゆっくり sens 1 et 2, よく sens 2 | — |
| T7 | traductions publiées plus étroites que le sens | 汚い sens 2, 切る sens 2, やる sens 2, 冷たい sens 2, 所 sens 2 | — |
| T8 | une dimension voisine non posée | 本当 (réel / fictif) | — |

Tenus pour justifiés par les fiches, et cités pour mémoire seulement : 渡す et 上げる ; 吹く et 弾く ; 切る sens 2 et かける sens 1 ; 立つ et 起きる ; 死ぬ et 生まれる. Quatre raisons historiques sont inexactes dans la lettre et **ne sont pas réécrites** : D0069, D0339, D1299, D1411.

## 4. Volet 3 : état des contrôles G1 à G7

**Aucun n'est commencé.** Le volet 3 peut être mené en parallèle du volet 1, sur autorisation ; il ne modifie aucun fichier.

| Contrôle | Objet | Nature | État | Dépendances |
|---|---|---|---|---|
| G1 | statistiques du corpus, réconciliation des comptes | script, exhaustif | non commencé | ses chiffres de `null` doivent s'accorder avec le volet 2 (147 aujourd'hui) ; **à refaire après les corrections** (136) |
| G2 | échantillon d'au moins 68 ENTRY, tous champs, contre la fiche source | lecture | non commencé | tirage à graine fixe ; distinct de l'échantillon du volet 1 ; ses constats sémantiques sont renvoyés aux volets 1 et 2 ; **recoupe le point T5** (particules, nuances) |
| G3 | doublons et fusions oubliés | script, puis lecture des paires | non commencé | chaque paire nouvelle doit recevoir une issue arbitrée avant la clôture de l'étape 2 ; une fusion suivrait A3 et le lot 27 |
| G4 | stabilité des identifiants de SENSE | script et constat | non commencé | si aucun test ne la protège : chantier d'outillage séparé, **à mener avant le lot de corrections**, qui rouvre des ENTRY |
| G5 | anomalies de kanji (醤油 ; cinq clés qui sont des mots) | script | non commencé | ne conditionne pas la clôture, si l'état et le chantier de destination sont documentés |
| G6 | listes fermées et règles transversales non sémantiques | script | non commencé | aucune |
| G7 | points ouverts non sémantiques d'`ETAT-ACTUEL.md` | constat | non commencé | à refaire sur l'état d'`ETAT-ACTUEL.md` au moment du contrôle ; ce fichier s'arrête à la clôture de 5.17 |

## 5. Ordre d'exécution proposé

Trois phases, que rien n'oblige à enchaîner sans accord. **Chaque étape reste soumise à son propre périmètre, puis à sa propre autorisation.**

### Phase A · Audit documentaire (aucune donnée modifiée)

1. **A1 · Points de contrôle transversaux ouverts par le volet 2** (§6, proposé comme prochain lot).
2. **A2 · Examen individuel des 382 candidats restants du volet 1**, par axe, en tranches de 20 à 30 sens : d'abord C2 et C4 (les `null` portés par une fonction, 55 et 71 sens, dont dépend la déclaration finale sur les `null`), puis les `concept_abstrait` (C3), puis C1, C7, C8, et les axes de décisions (C5, C6, C9, C10, RES).
3. **A3 · Volet 3** : G1, G3, G4, G5, G6 par script ; G2 par lecture ; G7 par constat. Peut être mené en parallèle de A2.
4. **A4 · Chantier normatif** sur `interrogatif` (addendum, arbitré à part).

### Phase B · Corrections de données (sur autorisations explicites et distinctes)

1. **B0 · Outillage préalable**, en chantiers séparés : la commande de resynchronisation de l'inventaire des avertissements ; la protection de la stabilité des identifiants de SENSE, si G4 en montre l'absence.
2. **B1 · Arbitrage global et liste fermée** : les dix modifications du volet 2, plus celles que les volets 1 et 3 auront retenues. Aucune correction hors de cette liste.
3. **B2 · Lot 27**, lot véhicule sans ENTRY propre : réouverture de chaque ENTRY dans son lot d'origine, décisions nouvelles à la fin du journal (à partir de D1614), proposition, relecture, validation atomique.
4. **B3 · Publication** : suite pré-publication verte, `publish --write`, suite complète verte ; inventaire resynchronisé par la commande de B0, jamais à la main.
5. **B4 · Commit, puis push**, chacun sur son accord.

Les corrections peuvent être faites en une seule fois, à la fin de la phase A (une seule réouverture par ENTRY, une seule publication), ou en deux fois si l'arbitrage préfère appliquer d'abord les dix modifications du volet 2. **Je recommande une seule fois** : 明るい, 一緒 ou 洗う, encore à examiner, peuvent toucher des lots déjà concernés.

### Phase C · Validation finale

1. Preuves de sortie du volet 2 (périmètre, §9, points 6 à 13) : diff limité à la liste fermée, assemblage sans problème, `validate-data` sans erreur, inventaire égal aux avertissements émis, N = 0 et L + F + C = 147.
2. G1 refait sur le corpus corrigé.
3. Rapports de synthèse des volets 1 et 3, puis `docs/rapports/etape2-A2-05.md` et la **déclaration finale de sortie d'A2-05**, sur accord explicite.
4. Mise à jour des documents de gouvernance (`CLAUDE.md`, `ETAT-ACTUEL.md`, `ROADMAP.md`, `docs/relecture/note-relais.md`), qui s'arrêtent à la clôture de 5.17, et commit du travail documentaire en attente.

## 6. Périmètre proposé pour le prochain lot de travail

**Proposition, non arbitrée. Aucun de ces sens n'a été audité pour la question posée ; aucune fiche n'a été lue à cette fin au-delà de ce que le volet 2 a dû consulter comme comparable.**

### Thème

**Volet 1 · lot 1 : les points de contrôle transversaux ouverts par le volet 2** (T1 à T8). C'est un lot fermé et petit, dont chaque question est déjà formulée et dont les comparables sont déjà arbitrés ; il solde ce que le volet 2 a laissé ouvert avant d'aborder les 382 candidats par axe.

### Entrées

| Point | SENSE | Mot | Question, et rien d'autre |
|---|---|---|---|
| T1 | `v_455_s2` | 明るい « Enjoué » | la catégorie `etre_humain › psychologie_esprit › etats_psychologiques` décrit-elle ce sens ? |
| T1 | `v_4_s2` | 暗い « Triste » | même question |
| T1 | `v_1_s2` | 爽やか « Vif » | même question |
| T2 | `v_221_s1` | 洗う « Laver » | la catégorie `entretien_domestique › nettoyage` décrit-elle une fiche qui nomme objets, vêtements et aliments ? |
| T3 | `v_628_s1` | 一緒 « Ensemble » | la catégorie `relations_sociales › interactions_sociales` décrit-elle ce sens ? |
| T4 | `v_663_s3` | 後 « Le reste » | la catégorie `totalite_partie › reste`, posée sur un sens attesté par une seule traduction, tient-elle ? |
| T5 | `v_642_s2`, `v_642_s3`, `v_266_s2` | 出る, 吹く | des décisions explicites autorisaient-elles la particule ou la nuance publiée, absentes des fiches ? |
| T6 | `v_425_s1`, `v_504_s1`, `v_504_s2`, `v_506_s2` | だんだん, ゆっくり, よく | `concept_abstrait` ou `propriete` : quel type pour un adverbe de manière ? |
| T7 | `v_461_s2`, `v_539_s2`, `v_608_s2`, `v_265_s2`, `v_664_s2` | 汚い, 切る, やる, 冷たい, 所 | la traduction principale publiée rend-elle le sens que la fiche décrit ? |
| T8 | `v_510_s1` | 本当 « Vérité » | l'axe réel / fictif décrit-il aussi directement le sens ? |

**19 sens, dans 17 ENTRY.** Sept n'ont jamais été audités (les six de T1 à T4, et ゆっくり sens 1). Les douze autres ont une fiche au volet 2, pour leur `null` ; **leur verdict L n'est pas rouvert** : la question posée ici porte sur un autre champ (particule, nuance, type, traduction, dimension).

**Pour T5 seulement, un criblage par script, exhaustif et sans verdict**, est proposé en plus : relever dans tout le corpus publié les particules d'un sens absentes de sa fiche source, et les exemples japonais d'une nuance absents de la fiche et des anciens exemples. Il dira combien de sens sont concernés ; leur examen individuel ferait l'objet d'un périmètre à part.

### Limites

- **Aucun autre candidat du volet 1** : les 382 sens du criblage restent pour les tranches suivantes, par axe.
- **Aucun des contrôles G1 à G7.**
- **Aucune correction**, aucune réouverture, aucune décision de journal ; les justifications historiques ne sont pas réécrites.
- **Les verdicts du volet 2 ne sont pas rouverts** : un constat sur 明るい, 一緒, 洗う ou 後 n'entraîne aucun reclassement automatique de 冷たい, 一人, 磨く ou 他 ; s'il le fallait, ce serait une question posée à l'arbitrage.
- Verdicts attendus pour ce lot, selon les codes du volet 1 (périmètre de cohérence, §5) : conforme, écart à corriger, ou point non documenté ; chaque écart nomme la modification proposée, qui rejoindrait la liste fermée de la phase B.

### Critères de complétude

- 19 identifiants de SENSE distincts, tous publiés ; chaque question est rattachée à un point T1 à T8 du relais (§6 bis) ;
- pour T1 à T4 : la fiche source entière, l'état publié, les décisions de journal et les comparables arbitrés sont cités dans la fiche d'examen ;
- pour T5 : la recherche d'une décision explicite est faite dans le journal entier et dans les rapports des lots 04 et 07, et son résultat est donné, positif ou négatif ;
- le criblage de T5 est reproductible (script, comptes, liste des sens relevés) ;
- aucun fichier de données, de lot, de journal, de registre ni d'inventaire n'est modifié : `git status` et l'assemblage inchangés, suite de tests verte.

### Alternatives, si l'arbitrage préfère un autre lot

- **Le volet 3 par script** (G1, G3, G4, G5, G6) : exhaustif, rapide, sans lecture lexicale ; il peut précéder ou accompagner ce lot.
- **Les `null` portés par une fonction** (C2 et C4, 55 et 71 sens) : c'est la première tranche de A2, et la plus proche du volet 2 par sa méthode.

## 7. Vérification documentaire du périmètre T1 à T8 (2026-10-08)

**Demandée par le relecteur avant la confirmation finale du périmètre. Aucun arbitrage lexical n'est commencé ; aucune fiche source n'a été lue pour établir cette section**, qui est calculée par `a2-05-travail/perimetre-t1-t8.mjs` sur les lots, les données publiées, l'inventaire, le criblage et le rapport d'audit. Le script s'arrête au premier écart.

### 7.1 Liste fermée des 19 SENSE

| # | Point | SENSE | Mot | Sens publié | Lot | Catégorie publiée | Type publié | Criblage (volet 1) | État d'audit antérieur |
|---|---|---|---|---|---|---|---|---|---|
| 1 | T1 | `v_455_s2` | 明るい | Enjoué | 00 | `etre_humain › psychologie_esprit › etats_psychologiques` | `propriete` | C1-g | **jamais audité** |
| 2 | T1 | `v_4_s2` | 暗い | Triste | 17 | `etre_humain › psychologie_esprit › etats_psychologiques` | `propriete` | — | **jamais audité** |
| 3 | T1 | `v_1_s2` | 爽やか | Vif | 17 | `etre_humain › psychologie_esprit › etats_psychologiques` | `propriete` | — | **jamais audité** |
| 4 | T2 | `v_221_s1` | 洗う | Laver | 03 | `habitat_vie_domestique › entretien_domestique › nettoyage` | `action` | C1-b, C1-h | **jamais audité** |
| 5 | T3 | `v_628_s1` | 一緒 | Ensemble | 22 | `relations_sociales › interactions_sociales` | `etat` | C7-c | **jamais audité** |
| 6 | T4 | `v_663_s3` | 後 | Le reste | 13 | `nombres_quantification › totalite_partie › reste` | `concept_abstrait` | C3-0, C1-g | **jamais audité** |
| 7 | T5 | `v_642_s2` | 出る | Assister à | 04 | `null` | `action` | — | volet 2, tranche 5, `categorie-nulle` : **L** |
| 8 | T5 | `v_642_s3` | 出る | Apparaître | 04 | `null` | `evenement` | — | volet 2, tranche 5, `categorie-nulle` : **L** |
| 9 | T5 | `v_266_s2` | 吹く | Souffler (de l'air) | 07 | `null` | `action` | — | volet 2, tranche 5, `categorie-nulle` : **L** |
| 10 | T6 | `v_425_s1` | だんだん | Graduellement | 21 | `null` | `concept_abstrait` | C3-0, C7-c, C10-a | volet 2, tranche 6, `categorie-nulle` : **L** |
| 11 | T6 | `v_504_s1` | ゆっくり | Lentement | 22 | `espace_proprietes_spatiales › vitesse` | `propriete` | C1-h | **jamais audité** |
| 12 | T6 | `v_504_s2` | ゆっくり | Tranquillement | 22 | `null` | `propriete` | — | volet 2, tranche 6, `categorie-nulle` : **L** |
| 13 | T6 | `v_506_s2` | よく | Bien | 21 | `null` | `propriete` | C7-c | volet 2, tranche 7, `categorie-nulle` : **L** |
| 14 | T7 | `v_461_s2` | 汚い | Grossier (langage) | 17 | `null` | `propriete` | — | volet 2, tranche 3, `categorie-nulle` : **L** |
| 15 | T7 | `v_539_s2` | 切る | Raccrocher (un téléphone) | 18 | `null` | `action` | — | volet 2, tranche 4, `categorie-nulle` : **L** |
| 16 | T7 | `v_608_s2` | やる | Donner (à des plantes, des animaux) | 20 | `null` | `action` | C1-a, C1-d | volet 2, tranche 5, `categorie-nulle` : **L** |
| 17 | T7 | `v_265_s2` | 冷たい | Froid (attitude) | 07 | `null` | `propriete` | C1-a | volet 2, tranche 3, `categorie-nulle` : **L** |
| 18 | T7 | `v_664_s2` | 所 | Partie | 20 | `null` | `concept_abstrait` | C3-0 | volet 2, tranche 7, `categorie-nulle` : **L** |
| 19 | T8 | `v_510_s1` | 本当 | Vérité | 00 | `null` | `concept_abstrait` | C3-0, C5-0 | volet 2, tranche 6, `categorie-nulle` : **L** |

### 7.2 Unicité et répartition

| Contrôle | Résultat |
|---|---|
| Identifiants de SENSE | 19, tous distincts, tous publiés, dans des ENTRY `validated` |
| ENTRY | 17 (出る et ゆっくり ont deux sens dans le périmètre) |
| **Sens jamais audités** | **7** : `v_455_s2` 明るい ; `v_4_s2` 暗い ; `v_1_s2` 爽やか ; `v_221_s1` 洗う ; `v_628_s1` 一緒 ; `v_663_s3` 後 ; `v_504_s1` ゆっくり |
| **Sens déjà examinés au volet 2** | **12** : `v_642_s2` 出る ; `v_642_s3` 出る ; `v_266_s2` 吹く ; `v_425_s1` だんだん ; `v_504_s2` ゆっくり ; `v_506_s2` よく ; `v_461_s2` 汚い ; `v_539_s2` 切る ; `v_608_s2` やる ; `v_265_s2` 冷たい ; `v_664_s2` 所 ; `v_510_s1` 本当 |
| Verdicts antérieurs de ces 12 sens | tous L ; aucun n'est rouvert |
| Sens du périmètre déjà visés par l'une des dix modifications retenues | 0 |
| ENTRY du périmètre portant par ailleurs une modification retenue sur un autre sens | 0 |
| Lots d'origine | 00, 03, 04, 07, 13, 17, 18, 20, 21, 22 |
| Par point | T1 : 3 ; T2 : 1 ; T3 : 1 ; T4 : 1 ; T5 : 3 ; T6 : 4 ; T7 : 5 ; T8 : 1 |

### 7.3 La question posée à chaque sens, et rien d'autre

| Point | SENSE | Question |
|---|---|---|
| T1 | `v_455_s2` 明るい | la catégorie `etre_humain › psychologie_esprit › etats_psychologiques` décrit-elle ce sens ? |
| T1 | `v_4_s2` 暗い | même question |
| T1 | `v_1_s2` 爽やか | même question |
| T2 | `v_221_s1` 洗う | la catégorie `entretien_domestique › nettoyage` décrit-elle une fiche qui nomme plusieurs domaines ? |
| T3 | `v_628_s1` 一緒 | la catégorie `relations_sociales › interactions_sociales` décrit-elle ce sens ? |
| T4 | `v_663_s3` 後 | la catégorie `totalite_partie › reste` tient-elle pour un sens attesté par une seule traduction ? |
| T5 | `v_642_s2` 出る | provenance de la particule et des nuances publiées |
| T5 | `v_642_s3` 出る | provenance de la particule et de la nuance publiées |
| T5 | `v_266_s2` 吹く | provenance de la nuance publiée |
| T6 | `v_425_s1` だんだん | le type publié décrit-il ce sens ? (examen individuel) |
| T6 | `v_504_s1` ゆっくり | le type publié décrit-il ce sens ? (examen individuel) |
| T6 | `v_504_s2` ゆっくり | le type publié décrit-il ce sens ? (examen individuel) |
| T6 | `v_506_s2` よく | le type publié décrit-il ce sens ? (examen individuel) |
| T7 | `v_461_s2` 汚い | fidélité de la traduction principale |
| T7 | `v_539_s2` 切る | fidélité de la traduction principale |
| T7 | `v_608_s2` やる | fidélité de la traduction principale |
| T7 | `v_265_s2` 冷たい | fidélité de la traduction principale |
| T7 | `v_664_s2` 所 | fidélité de la traduction principale |
| T8 | `v_510_s1` 本当 | l'axe réel / fictif décrit-il aussi directement le sens ? |

### 7.4 Limites confirmées par le relecteur

- **T5 · provenance** : seul un **criblage factuel et exhaustif** est autorisé, sur tout le corpus publié : particules d'un sens absentes de sa fiche source ; exemples japonais d'une nuance absents de la fiche et des anciens exemples. Il constate et compte. **Tout cas supplémentaire qu'il relèverait reste hors du périmètre des 19** : il est listé, sans examen ni verdict, pour un périmètre ultérieur. Pour les trois sens de T5, l'examen consiste à rechercher si une décision explicite autorisait ces éléments.
- **T6 · type** : chacun des quatre sens est contrôlé **individuellement**, contre les définitions d'A2-ST. **Aucun type commun n'est imposé** aux adverbes de manière : deux sens peuvent garder des types différents si leurs fiches le justifient.
- **T7 · traductions** : l'examen se limite à la **fidélité de la traduction principale** au sens que la fiche décrit. **Les verdicts `categorie-nulle` de ces cinq sens ne sont pas rouverts**, non plus que le découpage en sens.
- **Pour les douze sens déjà examinés** : la question porte sur un autre champ que celui de leur avertissement (particule, nuance, type, traduction, dimension). Leur verdict L du volet 2 reste acquis.
- **Pour les sept sens jamais audités** : la question est celle du tableau 7.3. **Option (b), retenue à l'acceptation définitive du périmètre (2026-10-08)** : cinq d'entre eux, candidats du criblage, sont examinés **en entier**, avec leurs autres relevés : `v_455_s2` 明るい (T1, C1-g) ; `v_221_s1` 洗う (T2, C1-b, C1-h) ; `v_628_s1` 一緒 (T3, C7-c) ; `v_663_s3` 後 (T4, C3-0, C1-g) ; `v_504_s1` ゆっくり (T6, C1-h). Un cas n'étant audité qu'une fois, **ces cinq sens sortiront des 382 candidats restants du volet 1 (382 → 377) une fois leur audit validé**. 暗い et 爽やか, qui ne sont pas candidats du criblage, ne sont examinés que sur T1.
- **Aucune correction** : un écart constaté nommerait une modification proposée, à joindre à la liste globale de la phase B ; les dix modifications du volet 2 restent différées.

### 7.5 Références nécessaires à l'audit, une fois le périmètre confirmé

- **Normes** : A2-L3-v1 (§2, §5 à §7) pour T1 à T4 ; A2-ST-v1 (§3 à §5) pour T6 ; A2-DIM-v1 (§2, §3) pour T8 ; A3 et le schéma A2-01 pour les particules et les nuances (T5) ; la doctrine « la fiche source décide » (`CLAUDE.md`, §4) pour T5 et T7 ; A2-GLOBAL-v1 (§10, §11).
- **Comparables arbitrés au volet 2**, à citer sans les rouvrir : 冷たい, まっすぐ, 甘い, 清い (T1) ; 磨く (T2) ; 一人 sens 2 (T3) ; 他 (T4) ; だんだん, ゆっくり sens 2, よく sens 2 (T6, leurs fiches de `null`).
- **Décisions à relire pour T5** : D0335, D0337 à D0339 (出る, lot 04) ; D0471 à D0473 (吹く, lot 07) ; les rapports des lots 04 et 07.

## 8. Liste globale des corrections : celles du volet 1, tenues à part (2026-10-08)

**Le bilan du volet 2 et sa liste fermée de dix modifications (§2) sont inchangés.** Cette section ne fait qu'ajouter, à côté, les corrections retenues par le volet 1. **Aucune n'est appliquée.**

### 8.1 Volet 1, lot 1 (T1 à T8) : arbitré, 14 conformes et 5 écarts

Arbitrage du 2026-10-08 (ChatGPT, par délégation) ; détail dans `etape2-A2-05-coherence-retroactive.md`.

| # | SENSE | Mot | Lot | Code | Champ | Valeur publiée | Valeur retenue |
|---|---|---|---|---|---|---|---|
| V1-1 | `v_221_s1` | 洗う « Laver » | 03 | E3 | `category` | `habitat_vie_domestique › entretien_domestique › nettoyage` | `null` (A5) ; `semantic_type: action` conservé |
| V1-2 | `v_642_s2` | 出る « Assister à » | 04 | E2 | `particles` ; `nuance` | `["に"]` ; « 授業に出る : assister au cours ; 会議に出る : participer à la réunion. » | `[]` ; « Participer à un événement. », sans exemple japonais |
| V1-3 | `v_642_s3` | 出る « Apparaître » | 04 | E2 | `particles` ; `nuance` | `["が"]` ; « 月が出る : la lune apparaît. » | `[]` ; « Se manifester. » |
| V1-4 | `v_266_s2` | 吹く « Souffler (de l'air) » | 07 | E2 | `nuance` | « 笛を吹く : jouer de la flûte. » | « Souffler de l'air ; jouer d'un instrument à vent. » |
| V1-5 | `v_265_s2` | 冷たい | 07 | E2 | `meaning.primary` ; `meaning.alternatives` | « Froid (attitude) » ; `["Distant"]` | « Insensible (figuré) » ; `[]` ; `category: null`, `semantic_type: propriete` et le découpage conservés |

### 8.2 Effets attendus, toutes corrections faites

- **Avertissements** : les dix modifications du volet 2 font passer l'inventaire de 120 à 112 `categorie-nulle` et de 27 à 24 `type-nul` (§2). **V1-1 ajoute un avertissement `categorie-nulle` : 113.** C'est un avertissement **nouveau et attendu**, à inscrire à l'inventaire avec sa justification (action générale, la fiche de 洗う couvrant la vaisselle, le linge, les mains et les aliments ; même fondement que 磨く, arbitré L) ; le baseline refusant toute régression, cette inscription fait partie de la correction. Les quatre autres corrections ne touchent aucun avertissement.
- **Verdicts du volet 2** : aucun n'est modifié. 出る sens 2 et 3, 吹く sens 2 et 冷たい sens 2 restent L sur leur `categorie-nulle`.
- **Étendue** : 15 SENSE au total (10 + 5), sans recoupement ; 13 ENTRY ; lots 01, 03, 04, 05, 07, 10, 11, 13, 18, 21.

### 8.3 Candidats du volet 1

Les cinq sens de l'option (b) sont audités et arbitrés : **il reste 377 candidats** (382 − 5 : `v_455_s2`, `v_221_s1`, `v_628_s1`, `v_663_s3`, `v_504_s1`).

### 8.4 Doctrine de provenance (arbitrée le 2026-10-08)

- **Aucune exception générale** n'autorise un contenu non sourcé au motif qu'il serait linguistiquement correct.
- Le criblage T5 est **un inventaire de signalements, non de 270 erreurs**.
- Les deux autres particules signalées (吹く sens 1, 近く sens 1) et les relevés bruts de nuances restent **hors du lot 1, sans verdict** ; ils sont à trier pour écarter les faux positifs, puis à soumettre à un périmètre distinct : c'est l'objet du périmètre proposé pour le lot 2 (`etape2-A2-05-volet1-lot2-perimetre.md`).

### 8.5 Réserves non closes du lot 1

Verdicts « conforme » gardés avec leur réserve : **暗い** sens 2 (la fiche parle aussi d'une ambiance et d'un avenir) ; **爽やか** sens 2 (« franche » dit une conduite) ; **後** sens 3 (catégorie et type tirés d'un seul mot de la fiche) ; だんだん (type différent de ゆっくり et よく, justifié par les fiches) ; 汚い sens 2 et 所 sens 2 (« malhonnête » et « point », attestés par la nuance seule, non ajoutés en traduction) ; 切る sens 2 (ordre des traductions, choix du lot 18).

### 8.6 Volet 1, lot 2 (provenance), tranche 1 : arbitrée, 9 sourcés et 25 écarts (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé et accepté par l'utilisateur) ; détail, fiche par fiche, dans `etape2-A2-05-volet1-lot2-provenance.md` (§P1.0 et §P1.3). **Proposé le 2026-10-08 : 10 sourcés, 24 écarts.** Les 24 écarts et 9 des 10 « sourcé » sont confirmés ; **`v_152` 来る est reclassé écart** : la fiche nomme la forme négative et sa lecture, sans écrire la graphie 来ない, qui ne se reconstitue pas par connaissance grammaticale extérieure. **Les 25 corrections V2-1 à V2-25 sont tenues à part** des dix modifications du volet 2 (§2) et des cinq corrections du lot 1 (§8.1). **Aucune n'est appliquée.** Les numéros V2-1 à V2-24 sont ceux de la proposition ; V2-25 naît de l'arbitrage. **Second arbitrage du même jour** (relecture du périmètre de la tranche 2) : les variantes de V2-3 et V2-6 sont écartées, les corrections de base conservées ; aucun des 25 verdicts n'est rouvert.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-1 | `v_157` | 走る | 04 | `nuance` (ENTRY) | « Se dit aussi d'un véhicule qui roule. Verbe du groupe u malgré sa terminaison en -iru. » |
| V2-2 | `v_159` | 電車 | 04 | `nuance` (ENTRY) | « Littéralement « véhicule électrique » : le train de banlieue ou de ligne classique. » |
| V2-3 | `v_213` | 入る | 04 | `nuance` (ENTRY) | « Avec に : 部屋に入る, entrer dans la pièce. Se dit aussi d'entrer dans un bain, et de ce qui est contenu dans quelque chose. » *Variante (garder « 入っている : être dedans. ») écartée au second arbitrage du 2026-10-10.* |
| V2-4 | `v_240` | 交番 | 04 | `nuance` (ENTRY) | « Le petit poste de police de quartier japonais, où l'on demande aussi son chemin. » |
| V2-5 | `v_242` | 図書館 | 04 | `nuance` (ENTRY) | « La bibliothèque publique ou universitaire. » |
| V2-6 | `v_563` | 渡る | 04 | `nuance` (ENTRY) | « Avec を : 橋を渡る, traverser le pont. » *Variante (ajouter « 道路を渡る, traverser la route ») écartée au second arbitrage du 2026-10-10.* |
| V2-7 | `v_644` | 切符 | 04 | `nuance` (ENTRY) | « Billet de train, de métro ou de bus ; ne se dit ni d'un billet de banque ni d'un billet d'avion. » |
| V2-8 | `v_705` | 道 | 04 | `nuance` (ENTRY) | « Tout chemin où l'on circule, à pied ou en véhicule. » |
| V2-9 | `v_128` | 川 | 07 | `nuance` (ENTRY) | « Tout cours d'eau. » |
| V2-10 | `v_254_s2` | 木 | 07 | `nuance` (sens 2) | « Le bois en tant que matériau. » |
| V2-11 | `v_256` | 海 | 07 | `nuance` (ENTRY) | « 海で泳ぐ : nager dans la mer. » |
| V2-12 | `v_260` | 空 | 07 | `nuance` (ENTRY) | « 空は青い : le ciel est bleu. » |
| V2-13 | `v_265_s1` | 冷たい | 07 | `nuance` (sens 1) | « 冷たいお茶 : du thé froid. L'air froid se dit 寒い. » |
| V2-14 | `v_265_s2` | 冷たい | 07 | `nuance` (sens 2) | « Emploi figuré. » ; s'ajoute à V1-5, qui porte sur les traductions du même sens |
| V2-15 | `v_266_s1` | 吹く | 07 | `particles` (sens 1) | `["が"]` → `[]` ; la nuance est conservée |
| V2-16 | `v_267` | 夏 | 07 | `nuance` (ENTRY) | « La saison la plus chaude. » |
| V2-17 | `v_269` | 天気 | 07 | `nuance` (ENTRY) | « Les conditions atmosphériques ; seul, il désigne souvent le beau temps : 天気がいい, il fait beau. » |
| V2-18 | `v_272` | 晴れ | 07 | `nuance` (ENTRY) | « Forme nominale de 晴れる. » |
| V2-19 | `v_273` | 晴れる | 07 | `nuance` (ENTRY) | « Le ciel se dégage, les nuages se dissipent. » |
| V2-20 | `v_274` | 暑い | 07 | `nuance` (ENTRY) | « La chaleur de l'air, du temps ; un objet chaud se dit 熱い (même lecture). » |
| V2-21 | `v_279` | 降る | 07 | `nuance` (ENTRY) | « Avec が : 雨が降る, il pleut. » |
| V2-22 | `v_280` | 雨 | 07 | `nuance` (ENTRY) | « 雨が降る : il pleut. L'intensité se dit par des onomatopées : ぽつぽつ, しとしと, ザーザー. » |
| V2-23 | `v_282` | 風 | 07 | `nuance` (ENTRY) | « 風が吹く : le vent souffle. » |
| V2-24 | `v_648` | 匹 | 07 | `nuance` (ENTRY) | « Pour compter chiens, chats, poissons, insectes. La lecture change selon le nombre : いっぴき, にひき, さんびき. » |
| V2-25 | `v_152` | 来る | 04 | `nuance` (ENTRY) | « Mouvement vers le locuteur. Verbe irrégulier : le kanji se lit く, き ou こ selon la forme (d'origine, polie, négative). » (arbitrage du 2026-10-10) |

**Effets attendus, toutes corrections faites** :
- **Champs** : 21 nuances d'ENTRY, 3 nuances de sens (木 sens 2, 冷たい sens 1 et sens 2), une liste de particules (吹く sens 1). Aucun `category`, aucun `semantic_type`, aucune traduction, aucun découpage.
- **Avertissements** : aucun effet. Les avertissements de l'inventaire (`categorie-nulle`, `type-nul`, `kanji-inconnu`) ne portent sur aucun de ces champs ; les décomptes du §8.2 (112, puis 113 avec V1-1 ; 24) sont inchangés.
- **Recoupements** : 24 ENTRY, lots 04 et 07. Deux ENTRY sont déjà visées par le lot 1, sur d'autres sens ou d'autres champs : 冷たい (V1-5, traductions du sens 2 ; V2-13 et V2-14, nuances) et 吹く (V1-4, nuance du sens 2 ; V2-15, particules du sens 1). 出る (V1-2, V1-3) n'a aucune correction de provenance : son sens 1 est sourcé. Aucune ENTRY n'est visée par les dix modifications du volet 2.
- **Verdicts du volet 2** : aucun n'est modifié.

### 8.7 Liste globale des corrections retenues, à ce jour

**Total à jour : 183 corrections, 164 ENTRY, aucune appliquée (§8.41 : V1-7 et V1-8, retenues à l'arbitrage de la livraison A7 du lot 3 ; `v_497` et `v_509`, ENTRY qu'aucune autre correction ne visait).** Après A6 (§8.40 : V1-6 ; `v_321`) : 181 corrections, 162 ENTRY. Après 8f (§8.33, clôture de la tranche 8, sans correction nouvelle ; V2-84 d'origine `hors_jlpt`) : 180 corrections, 161 ENTRY. Après 8e (§8.32) : 180 corrections, 161 ENTRY. Après 8d (§8.31) : 179 corrections, 160 ENTRY. Après 8c (§8.30) : 177 corrections, 158 ENTRY. Après 8b (§8.29) : 177 corrections, 158 ENTRY. Après 8a (§8.28) : 175 corrections, 156 ENTRY. Après 7e et la clôture de la tranche 7 (§8.27) : 173 corrections, 154 ENTRY. Après 7d (§8.26) : 173 corrections, 154 ENTRY. Après 7c (§8.25) : 167 corrections, 148 ENTRY. Après 7b (§8.24) : 163 corrections, 144 ENTRY. Après 7a (§8.23) : 162 corrections, 143 ENTRY. Après 6e et la clôture de la tranche 6 (§8.22) : 159 corrections, 140 ENTRY. Après 6d (§8.21) : 153 corrections, 135 ENTRY. Après 6c (§8.20) : 147 corrections, 132 ENTRY. Après 6b (§8.19) : 138 corrections, 125 ENTRY. Après 6a (§8.18) : 130 corrections, 117 ENTRY. Après la clôture de la tranche 5 (§8.17) : 124 corrections, 112 ENTRY. Après 5b (§8.16) : 121 corrections, 109 ENTRY. Après 5a (§8.15) : 117 corrections, 105 ENTRY. Après la clôture de la tranche 4 (§8.14) : 111 corrections, 101 ENTRY. Après le lot 05 (§8.13) : 99 corrections, 90 ENTRY. Après la clôture de la tranche 3 (§8.12) : 92 corrections, 84 ENTRY. Après le lot 02 (§8.11) : 86 corrections, 78 ENTRY. Après la clôture de la tranche 2 (§8.10) : 71 corrections, 64 ENTRY. Mise à jour du 2026-10-10, après l'arbitrage du bloc 1 bis : 45 corrections, dans 40 ENTRY ; V2-26 à V2-30 s'ajoutent à la troisième liste (§8.8) ; lots inchangés. Le texte ci-dessous est celui de l'inscription précédente.

**Trois listes distinctes, aucune appliquée** : les dix modifications du volet 2 (§2) ; les cinq corrections du volet 1, lot 1, V1-1 à V1-5 (§8.1) ; les 25 corrections du volet 1, lot 2, tranche 1, V2-1 à V2-25 (§8.6). **40 corrections**, dans 35 ENTRY (13 pour les deux premières listes, 22 de plus pour la troisième) ; lots 01, 03, 04, 05, 07, 10, 11, 13, 18, 21. Elles seront exécutées ensemble, sur autorisations explicites et distinctes, selon la procédure du §5 du relais (lot véhicule, réouvertures, décisions nouvelles à la fin du journal, validation atomique, publication). Les tranches suivantes du contrôle de provenance y ajouteront leurs corrections, sous de nouveaux numéros.

### 8.8 Volet 1, lot 2 (provenance), bloc 1 bis : arbitré, 5 sourcés et 5 écarts (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-1bis.md` (§B0). Les dix verdicts proposés sont confirmés ; les cinq corrections sont retenues sans modification. Sourcés : 町, 犬, 猫, 鳥, 春. **Aucune correction n'est appliquée.** Elles rejoignent la troisième liste, à la suite de V2-25.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-26 | `v_270` | 寒い | 07 | `nuance` (ENTRY) | « Le froid de l'air ; un objet froid se dit 冷たい. » (暑い retiré, 冷たい conservé) |
| V2-27 | `v_277` | 熱い | 07 | `nuance` (ENTRY) | « Un objet, un liquide, un aliment. 猫舌 : qui ne supporte pas ce qui est trop chaud. » (暑い retiré, 猫舌 conservé) |
| V2-28 | `v_154` | 自動車 | 04 | `nuance` (ENTRY) | « Terme formel ; dans la conversation : クルマ. » (graphie de la source, et non 車) |
| V2-29 | `v_674` | 橋 | 04 | `nuance` (ENTRY) | « Ne pas confondre avec l'homophone « baguettes », d'accentuation différente. » (graphie 箸 retirée) |
| V2-30 | `v_261` | 花 | 07 | `nuance` (ENTRY) | retirée, sans nouvelle nuance tirée des compteurs de la fiche |

**Effets attendus** : cinq nuances d'ENTRY, dans cinq ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; aucun verdict du volet 2 ni de la tranche 1 modifié. **Liste globale : 10 + 5 + 30 = 45 corrections, 40 ENTRY**, lots 01, 03, 04, 05, 07, 10, 11, 13, 18, 21.

### 8.9 Volet 1, lot 2 (provenance), tranche 2, lot 00 : arbitré, 7 sourcés et 2 écarts (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t2-lot00.md` (§L0). Les neuf verdicts proposés sont confirmés ; les deux corrections sont retenues sans modification. Sourcés : 鍵, 曲がる, お姉さん, お母さん, お父さん, お腹, 履く. **Critère confirmé** : une graphie n'est sourcée que si la fiche, ou sa fiche fusionnée, l'atteste pour le mot concerné ; une graphie déduite par analogie ne l'est pas. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-31 | `v_420` | いい | 00 | `nuance` (ENTRY) | « Forme écrite ou soutenue : よい (良い). Les formes conjuguées viennent de よい : よかった. » (よくない retiré) |
| V2-32 | `v_564` | 無くす | 00 | `nuance` (ENTRY) | « Transitif (を) ; ne pas confondre avec l'intransitif なくなる (disparaître, être perdu). » (graphie de la fiche) |

**Effets attendus** : deux nuances d'ENTRY, dans deux ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; les verdicts du volet 2 portant sur いい et 無くす (L) ne sont pas rouverts. **Liste globale : 10 + 5 + 32 = 47 corrections, 42 ENTRY**, lots 00, 01, 03, 04, 05, 07, 10, 11, 13, 18, 21.

### 8.10 Volet 1, lot 2 (provenance), tranche 2, lot 01 : arbitré, 10 sourcés et 24 écarts ; clôture de la tranche 2 (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t2-lot01.md` (§M0). Les 34 verdicts proposés sont confirmés ; les 24 corrections sont retenues sans modification de leur contenu. **叔母 et 叔父 (V2-35, V2-36)** : écarts confirmés ; D0081 et D0083 sont conservées avec leurs justifications, sans réécriture, leur fondement n'étant pas entièrement vérifiable dans les fiches ; le changement sera porté par une décision nouvelle quand les corrections seront exécutées. **友達** : sourcé (達 appartient au mot que la fiche écrit, et la fiche décrit le suffixe). **V2-53 et V2-55** : transcriptions en kana de romajis attestés, recevables ; elles n'autorisent pas l'ajout de graphies en kanji absentes des sources. Les informations françaises attestées sont préservées quand un exemple japonais construit est retiré (目, 耳, 顔). **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-33 | `v_15` | お巡りさん | 01 | `nuance` (ENTRY) | « Terme familier et bienveillant, avec さん : le policier de quartier. Terme officiel, plus formel : 警察官. », le mot que la fiche donne. |
| V2-34 | `v_20` | 両親 | 01 | `nuance` (ENTRY) | « Les deux parents ensemble ; terme un peu formel, pour ses parents comme pour ceux d'autrui. » |
| V2-35 | `v_24` | 叔母 | 01 | `nuance` (ENTRY) | « Terme neutre ou humble. Écrit 叔母 pour la sœur cadette d'un parent ou l'épouse d'un oncle cadet. » |
| V2-36 | `v_25` | 叔父 | 01 | `nuance` (ENTRY) | « Terme neutre ou humble. Écrit 叔父 pour le frère cadet d'un parent ou l'époux d'une tante cadette. » |
| V2-37 | `v_27` | 外国人 | 01 | `nuance` (ENTRY) | retirée (aucune nuance publiée), faute de contenu sourcé à conserver. |
| V2-38 | `v_31` | 子供 | 01 | `nuance` (ENTRY) | retirée (aucune nuance publiée), faute de contenu sourcé à conserver. |
| V2-39 | `v_35` | 家族 | 01 | `nuance` (ENTRY) | retirée (aucune nuance publiée), faute de contenu sourcé à conserver. |
| V2-40 | `v_46` | 体 | 01 | `nuance` (ENTRY) | « 体に良い : bon pour la santé. », la forme de l'ancien exemple. |
| V2-41 | `v_47` | 医者 | 01 | `nuance` (ENTRY) | retirée (aucune nuance publiée), faute de contenu sourcé à conserver. |
| V2-42 | `v_48` | 口 | 01 | `nuance` (ENTRY) | « Désigne aussi l'ouverture d'un objet. » |
| V2-43 | `v_55` | 病気 | 01 | `nuance` (ENTRY) | « 病気になる : tomber malade. » |
| V2-44 | `v_57` | 目 | 01 | `nuance` (ENTRY) | « Désigne aussi la vue. », d'après les traductions de la fiche et D0114, sans exemple japonais. |
| V2-45 | `v_58` | 耳 | 01 | `nuance` (ENTRY) | « Désigne aussi l'ouïe. », d'après la traduction de la fiche et D0116, sans exemple japonais. |
| V2-46 | `v_65_s2` | 頭 | 01 | `nuance` (sens 2) | « 頭を使う : réfléchir. » |
| V2-47 | `v_603` | 髪 | 01 | `nuance` (ENTRY) | « 髪を切る : se faire couper les cheveux. Ne pas confondre avec les homophones « papier » et « dieu ». » |
| V2-48 | `v_633` | 人 | 01 | `nuance` (ENTRY) | retirée (aucune nuance publiée), faute de contenu sourcé à conserver. |
| V2-49 | `v_657` | 女 | 01 | `nuance` (ENTRY) | « Terme direct, un peu brusque pour désigner quelqu'un ; plus poli : 女の人. » |
| V2-50 | `v_660` | 家内 | 01 | `nuance` (ENTRY) | « Terme humble pour sa propre épouse, face à un tiers. » |
| V2-51 | `v_667` | 方 | 01 | `nuance` (ENTRY) | « Terme respectueux pour désigner une personne : あの方 (cette personne). » |
| V2-52 | `v_686` | 男 | 01 | `nuance` (ENTRY) | « Terme direct, un peu brusque pour désigner quelqu'un ; plus poli : 男の人. » |
| V2-53 | `v_687` | 皆さん | 01 | `nuance` (ENTRY) | « Forme respectueuse pour s'adresser à un groupe : 皆さん、おはようございます. Plus neutre : みんな. », la salutation de l'exemple et le mot de la fiche en kana. |
| V2-54 | `v_716` | 顔 | 01 | `nuance` (ENTRY) | « Désigne aussi l'expression du visage (la mine). », d'après la nuance de la fiche et D0112. |
| V2-55 | `v_42` | 警官 | 01 | `nuance` (ENTRY) | « Terme neutre, plus formel. Dans la conversation courante : おまわりさん. », le romaji de la fiche transcrit en kana. |
| V2-56 | `v_656` | 奥さん | 01 | `nuance` (ENTRY) | « Terme respectueux pour l'épouse d'autrui ; sert aussi à s'adresser à une femme mariée. Pour sa propre épouse : かない ou つま. », les graphies de la fiche. |

**Effets attendus** : 23 nuances d'ENTRY et une nuance de sens (頭, sens 2), dans 24 ENTRY ; cinq nuances retirées en entier (外国人, 子供, 家族, 医者, 人) ; aucun avertissement touché ; deux ENTRY portent déjà une modification du volet 2, sur un autre champ (頭 sens 2, n° 2 ; 皆さん, n° 5) ; aucun verdict du volet 2 rouvert.

**Clôture de la tranche 2** : bloc 1 bis (10 : 5 sourcés, 5 écarts), lot 00 (9 : 7, 2), lot 01 (34 : 10, 24), soit **53 nuances, 22 sourcées, 31 écarts, toutes arbitrées**, et les corrections V2-26 à V2-56. **Liste globale : 10 + 5 + 56 = 71 corrections, 64 ENTRY, toutes non appliquées**, lots 00, 01, 03, 04, 05, 07, 10, 11, 13, 18, 21. **Restent 225 nuances** (tranches 3 à 8), plus les 2 nuances hors JLPT suivies à part ; 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.11 Volet 1, lot 2 (provenance), tranche 3, lot 02 : arbitré, 4 sourcés, 3 assumés et 15 écarts (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t3-lot02.md` (§N0). Les 22 verdicts proposés sont confirmés ; les 15 corrections sont retenues sans modification. **Classement de provenance confirmé pour ce chantier**, sans modifier les normes A2 : **sourcé** (attesté par la fiche examinée ou par une normalisation admise) ; **assumé** (introduit par une décision validée qui en identifie l'origine, vérifiable dans les sources figées : 飲む, D0189 ; カップ, D0204 ; コップ, D0206) ; **écart** (provenance non établie, même si une décision historique la mentionne : ナイフ, D0214 ; 辛い, D0195). **Réserve de fidélité sémantique, hors périmètre, non corrigée ici** : la nuance de カップ réduit le récipient à une tasse « à anse », alors que sa fiche dit « avec ou sans anse ». **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-57 | `v_84` | お弁当 | 02 | `nuance` (ENTRY) | « Forme polie et courante ; 弁当 sans お existe aussi, surtout à l'écrit et dans les composés. » |
| V2-58 | `v_85` | お茶 | 02 | `nuance` (ENTRY) | « Désigne d'abord le thé vert japonais. » |
| V2-59 | `v_86` | お酒 | 02 | `nuance` (ENTRY) | « Désigne aussi, plus précisément, le saké. » |
| V2-60 | `v_88` | ご飯 | 02 | `nuance` (ENTRY) | « Terme poli et courant. » |
| V2-61 | `v_90` | とり肉 | 02 | `nuance` (ENTRY) | retirée (aucune nuance publiée), faute de contenu sourcé à conserver. |
| V2-62 | `v_95` | コーヒー | 02 | `nuance` (ENTRY) | « La boisson ; l'établissement se dit カフェ. » |
| V2-63 | `v_98` | レストラン | 02 | `nuance` (ENTRY) | « Plutôt un restaurant à l'occidentale. » |
| V2-64 | `v_111` | 箸 | 02 | `nuance` (ENTRY) | retirée (aucune nuance publiée), faute de contenu sourcé à conserver. |
| V2-65 | `v_120` | 飲み物 | 02 | `nuance` (ENTRY) | retirée (aucune nuance publiée), faute de contenu sourcé à conserver. |
| V2-66 | `v_211` | ナイフ | 02 | `nuance` (ENTRY) | « Couteau de table. » |
| V2-67 | `v_427_s2` | まずい | 02 | `nuance` (sens 2) | « Se dit d'une situation qui tourne mal. » |
| V2-68 | `v_427` | まずい | 02 | `nuance` (ENTRY) | « Familier pour le goût. » |
| V2-69 | `v_464_s2` | 甘い | 02 | `nuance` (sens 2) | « Être indulgent envers quelqu'un ; avoir une vue trop optimiste. » |
| V2-70 | `v_481` | 辛い | 02 | `nuance` (ENTRY) | « Se dit aussi d'un plat trop salé dans certaines régions. » |
| V2-71 | `v_677` | 水 | 02 | `nuance` (ENTRY) | « L'eau froide ou à température ambiante ; l'eau chaude se dit おゆ. » |

**Effets attendus** : 13 nuances d'ENTRY et 2 nuances de sens (まずい et 甘い, sens 2), dans 14 ENTRY qu'aucune autre correction ne vise ; trois nuances retirées en entier (とり肉, 箸, 飲み物) ; aucun avertissement touché ; まずい et 甘い (sens 2, L au volet 2) ne sont pas rouverts.

**Liste globale : 10 + 5 + 71 = 86 corrections, 78 ENTRY, toutes non appliquées**, lots 00, 01, 02, 03, 04, 05, 07, 10, 11, 13, 18, 21. **Restent 203 nuances** (lot 03 : 14 ; tranches 4 à 8 : 189), plus les 2 nuances hors JLPT suivies à part ; 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.12 Volet 1, lot 2 (provenance), tranche 3, lot 03 : arbitré, 6 sourcés, 2 assumés et 6 écarts ; clôture de la tranche 3 (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t3-lot03.md` (§O0). Les 14 verdicts proposés sont confirmés ; les six corrections sont retenues sans modification. Assumés : テーブル (D0271, fiche de 机) ; ふろ (D0261, fiche de お風呂). **お手洗い (V2-76)** : l'attestation réciproque par la fiche de トイレ ne suffit pas, à elle seule, à sourcer le renvoi dans la fiche de お手洗い, et aucune décision ne l'assume ; écart confirmé, sans modifier la doctrine documentaire ni les normes A2. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-72 | `v_34` | 家庭 | 03 | `nuance` (ENTRY) | « Le foyer, la vie de famille à la maison, par opposition au bâtiment 家 (いえ) : 家庭の料理, la cuisine familiale. », la forme de l'ancien exemple. |
| V2-73 | `v_209_s1` | ふろ | 03 | `nuance` (sens 1) | « Le bain japonais : la baignoire d'eau chaude où l'on se plonge après s'être lavé, et par extension la pièce. ふろに入る : prendre un bain (l'action est portée par 入る). », la forme de l'exemple de la fiche. |
| V2-74 | `v_229` | ちり紙 | 03 | `nuance` (ENTRY) | « Terme un peu vieilli. » |
| V2-75 | `v_237` | 紙 | 03 | `nuance` (ENTRY) | « Le papier, ou une feuille. » |
| V2-76 | `v_589` | お手洗い | 03 | `nuance` (ENTRY) | « Terme poli, sûr dans toutes les situations ; littéralement « se laver les mains ». » |
| V2-77 | `v_708` | 門 | 03 | `nuance` (ENTRY) | « Grande porte extérieure : l'entrée d'une propriété, d'une école, d'un temple ; la porte d'une maison se dit ドア. » |

**Effets attendus** : cinq nuances d'ENTRY et une nuance de sens (ふろ, sens 1), dans six ENTRY qu'aucune autre correction ne vise ; aucune nuance retirée en entier ; aucun avertissement touché.

**Clôture de la tranche 3** : lot 02 (22 : 4 sourcés, 3 assumés, 15 écarts) et lot 03 (14 : 6, 2, 6), soit **36 nuances, 10 sourcées, 5 assumées, 21 écarts, toutes arbitrées**, et les corrections V2-57 à V2-77. **Liste globale : 10 + 5 + 77 = 92 corrections, 84 ENTRY, toutes non appliquées**, lots 00, 01, 02, 03, 04, 05, 07, 10, 11, 13, 18, 21. **Restent 189 nuances** (tranches 4 à 8), plus les 2 nuances hors JLPT suivies à part ; 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.13 Volet 1, lot 2 (provenance), tranche 4, lot 05 et nuances hors JLPT : arbitrés (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t4-lot05.md` (§Q0). **Lot 05 : 6 sourcés, 0 assumé, 6 écarts ; hors JLPT, comptées à part : 1 sourcé (`hj_v_2` ポイントカード), 1 écart (`hj_v_1` レジ袋)**. Les quatorze verdicts proposés sont confirmés ; les sept corrections sont retenues sans modification de fond. **時計** : l'arbitrage du volet 2 sur sa catégorie (n° 7) est conservé intégralement ; V2-82 le complète sans le rouvrir. **V2-84 rejoint la liste globale unique**, avec l'identification explicite de son origine `hors_jlpt` ; aucune décision historique n'est inventée pour les ENTRY hors JLPT. **Deux comptabilités distinctes** : les nuances du plan initial de provenance, et les nuances hors JLPT, contrôlées à part. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-78 | `v_234` | 傘 | 05 | `nuance` (ENTRY) | « Contre la pluie ou le soleil. » |
| V2-79 | `v_572` | 脱ぐ | 05 | `nuance` (ENTRY) | « Pour les vêtements comme pour les chaussures et les chaussettes : くつを脱ぐ. », la graphie de la fiche. |
| V2-80 | `v_614` | スリッパ | 05 | `nuance` (ENTRY) | « Chaussures d'intérieur, portées après avoir retiré ses chaussures au げんかん. », la graphie de la fiche. |
| V2-81 | `v_618` | ハンカチ | 05 | `nuance` (ENTRY) | « Petit carré de tissu pour s'essuyer les mains. » |
| V2-82 | `v_671` | 時計 | 05 | `nuance` (ENTRY) | « Tout instrument qui donne l'heure : la montre au poignet comme l'horloge murale. » |
| V2-83 | `v_679` | 洋服 | 05 | `nuance` (ENTRY) | « Par opposition aux vêtements traditionnels japonais (わふく, きもの). », le romaji de la fiche transcrit en kana. |
| V2-84 | `hj_v_1` | レジ袋 | 05 (origine `hors_jlpt`) | `nuance` (ENTRY) | « Payant au Japon depuis 2020 : le caissier demande presque toujours si l'on en veut un. », le texte de la fiche, sans la phrase japonaise construite. |

**Effets attendus** : sept nuances d'ENTRY, dans sept ENTRY, dont 時計, qui porte aussi la modification n° 7 du volet 2 (autre champ) ; aucune nuance retirée en entier ; aucun avertissement touché.

**Liste globale : 10 + 5 + 84 = 99 corrections, 90 ENTRY (dont une hors JLPT), toutes non appliquées**, lots 00, 01, 02, 03, 04, 05, 07, 10, 11, 13, 18, 21. **Comptabilité du plan : restent 177 nuances** (lot 06 : 18 ; tranches 5 à 8 : 159). **Comptabilité hors JLPT : 2 nuances, toutes deux arbitrées.** 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.14 Volet 1, lot 2 (provenance), tranche 4, lot 06 : arbitré, 5 sourcés, 1 assumé et 12 écarts ; clôture de la tranche 4 (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t4-lot06.md` (§R0). Les 18 verdicts proposés sont confirmés ; les douze corrections sont retenues sans modification de fond. **クラス** assumé (D0414, fiche de 教室) ; **教室** écart (V2-87 : aucune décision n'assume le renvoi inverse ; doctrine de お手洗い / トイレ inchangée). **文章** écart (V2-96) : la fiche décrit le sens du kanji 文 dans le composé, sans l'attester comme mot autonome ; D0443 n'a qu'un fondement partiel et reste intacte. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-85 | `v_32` | 学生 | 06 | `nuance` (ENTRY) | « Le plus souvent un étudiant du secondaire ou de l'université. » |
| V2-86 | `v_131` | 授業 | 06 | `nuance` (ENTRY) | « Le cours donné par un enseignant. » |
| V2-87 | `v_133` | 教室 | 06 | `nuance` (ENTRY) | « La salle physique où ont lieu les cours. » |
| V2-88 | `v_135` | 知る | 06 | `nuance` (ENTRY) | « À l'affirmatif, toujours 知っている ; au négatif, 知らない. » |
| V2-89 | `v_138_s1` | 言葉 | 06 | `nuance` (sens 1) | « Les paroles, ce qui est dit. » |
| V2-90 | `v_138_s2` | 言葉 | 06 | `nuance` (sens 2) | « 外国の言葉 : une langue étrangère. », la forme de l'ancien exemple. |
| V2-91 | `v_170_s2` | 字 | 06 | `nuance` (sens 2) | « Le style d'écriture d'une personne. » |
| V2-92 | `v_513_s2` | 意味 | 06 | `nuance` (sens 2) | « L'utilité, la raison d'être d'une action. », d'après la fiche. |
| V2-93 | `v_553` | 忘れる | 06 | `nuance` (ENTRY) | « Un fait comme un objet : 宿題を忘れる, oublier ses devoirs ; かさを忘れる, oublier son parapluie. », les formes de l'ancien exemple et de l'exemple. |
| V2-94 | `v_556` | 書く | 06 | `nuance` (ENTRY) | « Écrire des lettres, des caractères, un texte. » |
| V2-95 | `v_647` | 勉強 | 06 | `nuance` (ENTRY) | « 勉強する : étudier ; l'étude en général. » |
| V2-96 | `v_666` | 文章 | 06 | `nuance` (ENTRY) | « Un texte rédigé, un passage suivi. » |

**Effets attendus** : huit nuances d'ENTRY et quatre nuances de sens (言葉 sens 1 et 2, 字 sens 2, 意味 sens 2), dans onze ENTRY qu'aucune autre correction ne vise ; aucune nuance retirée en entier ; aucun avertissement touché ; 意味 sens 2 (L au volet 2) n'est pas rouvert.

**Clôture de la tranche 4 du plan** : lot 05 (12 : 6 sourcés, 0 assumé, 6 écarts) et lot 06 (18 : 5, 1, 12), soit **30 nuances, 11 sourcées, 1 assumée, 18 écarts, toutes arbitrées**. **Hors JLPT, comptées à part, déjà arbitrées** : 2 nuances, 1 sourcée, 1 écart. **Liste globale unique : 10 + 5 + 96 = 111 corrections, 101 ENTRY, toutes non appliquées**, lots 00 à 07, 10, 11, 13, 18, 21. **Restent 159 nuances du plan** (tranches 5 à 8). 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.15 Volet 1, lot 2 (provenance), tranche 5, livraison 5a : arbitrée, 3 sourcés et 6 écarts (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t5-5a.md` (§S0). Les neuf verdicts sont confirmés ; les six corrections sont retenues sans modification. **Précision méthodologique** : la forme du dictionnaire et le retrait de mots non essentiels sont admis lorsque la construction attestée reste intacte ; remplacer un complément ou changer une particule n'est pas une simple normalisation. Pour テレビ, insuffisance de provenance, non démonstration d'incorrection linguistique. かける sens 3 : seule sa nuance est corrigée ; son arbitrage du volet 2 reste inchangé. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-97 | `v_52` | 手紙 | 08 | `nuance` (ENTRY) | « Une lettre écrite à la main ; 手紙を書く. » |
| V2-98 | `v_164_s1` | かける | 08 | `nuance` (sens 1) | « 電話をかける : téléphoner ; 母に電話をかける. », la forme de l'exemple de la fiche. |
| V2-99 | `v_164_s2` | かける | 08 | `nuance` (sens 2) | « Mettre ses lunettes. » |
| V2-100 | `v_164_s3` | かける | 08 | `nuance` (sens 3) | « Accrocher un tableau au mur. », le texte français, sans l'exemple japonais. |
| V2-101 | `v_173` | 番号 | 08 | `nuance` (ENTRY) | « 電話番号 : numéro de téléphone. » |
| V2-102 | `v_203` | テレビ | 08 | `nuance` (ENTRY) | « テレビでニュースを見る : regarder les informations à la télévision. », la forme de l'exemple de la fiche. |

**Effets attendus** : trois nuances d'ENTRY et trois nuances de sens (かける sens 1 à 3), dans quatre ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; かける sens 3 (L au volet 2) non rouvert. **Liste globale unique : 10 + 5 + 102 = 117 corrections, 105 ENTRY, toutes non appliquées**, lots 00 à 08, 10, 11, 13, 18, 21. **Restent 150 nuances du plan** (5b : 9 ; 5c : 11 ; tranches 6 à 8 : 130). 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.16 Volet 1, lot 2 (provenance), tranche 5, livraison 5b : arbitrée, 4 sourcés, 1 assumé et 4 écarts (2026-10-10)

Arbitrage du 2026-10-10 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t5-5b.md` (§T0). Les neuf verdicts sont confirmés ; les quatre corrections sont retenues sans modification. Assumé : 話 (D0507). **Précision méthodologique (話す)** : une variante expressément autorisée par la description de la fiche (l'alternance を / で pour la langue parlée) peut être sourcée lorsqu'elle conserve le mot et la construction ; remplacer arbitrairement une particule reste une non-normalisation ; la précision est propre au contrôle de provenance, n'élargit pas les normes A2 et n'autorise aucune variante inférée de connaissances externes. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-103 | `v_169_s2` | 呼ぶ | 08 | `nuance` (sens 2) | « Nommer, donner un nom. », d'après la fiche. |
| V2-104 | `v_175_s2` | 聞く | 08 | `nuance` (sens 2) | « La personne à qui l'on demande est suivie de に : おまわりさんに道を聞く. », la forme de l'ancien exemple. |
| V2-105 | `v_176` | 言う | 08 | `nuance` (ENTRY) | « 〜と言う : nommer. À l'oral, souvent prononcé ゆう. », la construction de l'ancien exemple et l'emploi assumé par D0504. |
| V2-106 | `v_699_s2` | 話 | 08 | `nuance` (sens 2) | « Une histoire racontée, un récit. », d'après la fiche. |

**Effets attendus** : une nuance d'ENTRY et trois nuances de sens, dans quatre ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché. **Liste globale unique : 10 + 5 + 106 = 121 corrections, 109 ENTRY, toutes non appliquées**, lots 00 à 08, 10, 11, 13, 18, 21. **Restent 141 nuances du plan** (5c : 11 ; tranches 6 à 8 : 130). 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.17 Volet 1, lot 2 (provenance), tranche 5, livraison 5c : arbitrée, 7 sourcés, 1 assumé et 3 écarts ; clôture de la tranche 5 (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t5-5c.md` (§U0). Les onze verdicts sont confirmés ; les trois corrections sont retenues sans modification. **泳ぐ, sourcé** : la fiche documente explicitement le marquage du lieu avec で, notamment pour une piscine, et プール et sa construction avec で figurent dans les anciens exemples ; プールで泳ぐ est conservé, sans la correction de repli. **弾く, assumé** : D0545 et D1210 établissent explicitement la distinction avec l'homophone 引く, avec un fondement vérifiable dans les sources figées ; le renvoi est conservé, sans la correction de repli ; le candidat sémantique `v_192_s1` reste ouvert dans les 377. **国, écart** : 国へかえる, fondé sur l'exemple source (particule へ, verbe en kana), est conservé ; 国に帰る et お国はどちらですか, absents de la source, ne le sont pas ; la correction de repli réduite au français seul n'est pas employée. **Aucune décision historique n'est réécrite. Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-107 | `v_26` | 外国 | 09 | `nuance` (ENTRY) | « Tout pays autre que le Japon : 外国に行く, aller à l'étranger. », sans le renvoi à 外国人. |
| V2-108 | `v_193` | 散歩 | 09 | `nuance` (ENTRY) | « 散歩する : se promener ; 公園を散歩する, se promener dans le parc. », sans 犬の散歩. |
| V2-109 | `v_243` | 国 | 09 | `nuance` (ENTRY) | « Désigne aussi le pays ou la région d'origine de quelqu'un : 国へかえる, rentrer dans son pays. », la forme de l'exemple, sans お国はどちらですか. |

**Effets attendus** : trois nuances d'ENTRY, dans trois ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché. **Liste globale unique : 10 + 5 + 109 = 124 corrections, 112 ENTRY, toutes non appliquées**, lots 00 à 11, 13, 18, 21. **Tranche 5 close : 29 nuances, 14 sourcées, 2 assumées, 13 écarts** (5a : 3, 0, 6 ; 5b : 4, 1, 4 ; 5c : 7, 1, 3). **Restent 130 nuances du plan** (tranche 6 : 47 ; tranche 7 : 39 ; tranche 8 : 44). 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.18 Volet 1, lot 2 (provenance), tranche 6, livraison 6a : arbitrée, 4 sourcés et 6 écarts (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t6-6a.md` (§W0). Les dix verdicts sont confirmés ; les six corrections sont retenues sans modification. Sourcés : 隣 (y compris 隣の家 : la fiche documente expressément 隣 + の + nom de lieu, donne « Maison d'à côté » et écrit 家), 上, 外, 後ろ. Les corrections de repli proposées pour 隣 et pour 横 ne sont pas employées. **Précisions méthodologiques**, propres au contrôle de provenance, sans nouvelle règle normative : une construction expressément autorisée par une fiche, combinée à des éléments documentés par cette même fiche, peut être sourcée (précédent de 話す) ; une simple attestation d'une lecture dans d'autres exemples ne suffit pas à établir une catégorie grammaticale ou une unité lexicale autonome ; une réduction d'exemple peut supprimer un complément sans modifier la construction essentielle attestée. **D0595, D0581 et D0603 ne sont pas réécrites** (D0581 reste une décision historique au fondement partiel). **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-110 | `v_341` | そば | 10 | `nuance` (ENTRY) | « Tout près de quelqu'un ou de quelque chose : 駅のそば. », sans la mention de l'homophone 蕎麦. |
| V2-111 | `v_346` | 中 | 10 | `nuance` (ENTRY) | « Avec の et に : 箱の中に, dans la boîte. », sans la phrase sur 〜中. |
| V2-112 | `v_356` | 横 | 10 | `nuance` (ENTRY) | « L'espace juste à côté ou le flanc : 横に置く ; aussi le sens horizontal. », sans le renvoi à 縦. |
| V2-113 | `v_597` | 縦 | 10 | `nuance` (ENTRY) | « La dimension de haut en bas, ou le sens de la longueur ; contraire : 横 (l'horizontale, la largeur). », sans 縦に書く. |
| V2-114 | `v_630` | 下 | 10 | `nuance` (ENTRY) | « Avec に : つくえの下に, sous le bureau. », la graphie de l'exemple de la fiche. |
| V2-115 | `v_696` | 表 | 10 | `nuance` (ENTRY) | « Le côté visible, la face avant, le recto, l'extérieur d'un bâtiment ; contraire : 裏 (l'envers). », sans la phrase sur 表 lu ひょう. |

**Effets attendus** : six nuances d'ENTRY, dans six ENTRY ; cinq qu'aucune autre correction ne vise, et 表, qui porte déjà la modification n° 3 du volet 2 sur un autre champ (`semantic_type`), non rouverte ; aucun avertissement touché. **Liste globale unique : 10 + 5 + 115 = 130 corrections, 117 ENTRY, toutes non appliquées**, lots 00 à 11, 13, 18, 21. **Restent 120 nuances du plan** : tranche 6, 37 (6b : 9 ; 6c : 10 ; 6d : 7 ; 6e : 11) ; tranche 7, 39 ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.19 Volet 1, lot 2 (provenance), tranche 6, livraison 6b : arbitrée, 1 sourcé et 8 écarts (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t6-6b.md` (§X0). Les neuf verdicts sont confirmés ; les huit corrections sont retenues sans modification. Sourcé : 近く sens 1 (駅の近くに, attesté par la fiche et ses anciens exemples). **北 et 南** : les composés non sourcés sont remplacés par les expressions attestées, les nuances n'étant pas supprimées. **角** : la coquille présumée `つき` des fiches sources n'est pas corrigée silencieusement ; elle est signalée, sans devenir une donnée validée. **先 sens 1 et 近く sens 2** : la nuance française est conservée, sans exemple japonais construit. **D0624, D0619, D0617 et D0621 ne sont pas réécrites** ; les faiblesses de leur fondement restent documentées. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-116 | `v_347_s1` | 先 | 10 | `nuance` (sens 1) | « L'avant ; l'extrémité d'une chose. », d'après la fiche, sans exemple japonais. |
| V2-117 | `v_348_s2` | 前 | 10 | `nuance` (sens 2) | « 映画が始まる前に : avant que le film ne commence. », la forme de l'ancien exemple. |
| V2-118 | `v_349` | 北 | 10 | `nuance` (ENTRY) | « Exemple : 北の方, vers le nord. », la forme de l'ancien exemple. |
| V2-119 | `v_350` | 南 | 10 | `nuance` (ENTRY) | « Exemple : 南の方, vers le sud. », la forme de l'ancien exemple. |
| V2-120 | `v_358` | 角 | 10 | `nuance` (ENTRY) | « L'angle de deux rues ou le coin d'un bâtiment : 角を右に曲がる, tourner à droite au coin. », sans 次の ni la phrase sur 角 lu つの. |
| V2-121 | `v_360` | 近い | 10 | `nuance` (ENTRY) | « Une distance courte, dans l'espace ou dans le temps : 駅から近い, près de la gare. », la construction de l'ancien exemple. |
| V2-122 | `v_362` | 遠い | 10 | `nuance` (ENTRY) | « Une grande distance, dans l'espace ou dans le temps : ここから遠い. », la forme de l'ancien exemple, privé de とても. |
| V2-123 | `v_704_s2` | 近く | 10 | `nuance` (sens 2) | « La proximité dans le temps : bientôt. », d'après la fiche, sans exemple japonais. |

**Effets attendus** : cinq nuances d'ENTRY et trois nuances de sens, dans huit ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; les quatre sens du point réservé de la deixis temporelle (先 sens 1, 前 sens 2, 近く sens 1 et sens 2) restent candidats, ce point n'étant pas ouvert. **Liste globale unique : 10 + 5 + 123 = 138 corrections, 125 ENTRY, toutes non appliquées**, lots 00 à 11, 13, 18, 21. **Le lot 10 est entièrement contrôlé** (6a et 6b : 19 nuances, 5 sourcées, 14 écarts). **Restent 111 nuances du plan** : tranche 6, 28 (6c : 10 ; 6d : 7 ; 6e : 11) ; tranche 7, 39 ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.20 Volet 1, lot 2 (provenance), tranche 6, livraison 6c : arbitrée, 1 sourcé et 9 écarts (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t6-6c.md` (§Y0). Les dix verdicts sont confirmés. V2-124 à V2-131 sont retenues sans modification ; **V2-132 est retenue sous sa forme de repli** : l'exemple そっちのてんきはどうですか, attesté, illustre surtout la proximité spatiale avec l'interlocuteur et n'est pas retenu comme illustration du sens « Toi, ton camp » ; la proposition d'origine reste lisible dans le rapport de 6c. Sourcé : あっち sens 1. **Renvois entre formes** : ceux des formes polies こちら, そちら et あちら vers leurs variantes familières sont des écarts de provenance ; les renvois inverses, documentés dans les fiches familières, restent sourcés ; cette asymétrie est documentaire, non une règle linguistique. こんな料理 est conservé (construction et graphie attestées dans la fiche de こんな) ; あの人 est conservé (ancien exemple). **D0671 et les autres décisions historiques ne sont pas réécrites. Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-124 | `v_339_s1` | こちら | 11 | `nuance` (sens 1) | « こちらへどうぞ : par ici, je vous prie. », sans le renvoi à こっち. |
| V2-125 | `v_339_s2` | こちら | 11 | `nuance` (sens 2) | « Forme polie pour désigner sa propre personne. », d'après la fiche, sans exemple japonais. |
| V2-126 | `v_340_s1` | そちら | 11 | `nuance` (sens 1) | « Une direction ou un endroit proche de l'interlocuteur. », sans le renvoi à そっち. |
| V2-127 | `v_404_s1` | あちら | 11 | `nuance` (sens 1) | « Forme polie d'あそこ. », sans le renvoi à あっち. |
| V2-128 | `v_404_s2` | あちら | 11 | `nuance` (sens 2) | « Désigne poliment une personne. », d'après la fiche, sans exemple japonais. |
| V2-129 | `v_406_s1` | あの | 11 | `nuance` (sens 1) | « Toujours devant un nom : あの人. Désigne ce qui est éloigné des deux interlocuteurs. », la forme de l'ancien exemple. |
| V2-130 | `v_409_s2` | こっち | 11 | `nuance` (sens 2) | « Peut désigner le locuteur ou son camp. », d'après la fiche, sans exemple japonais. |
| V2-131 | `v_412_s1` | こんな | 11 | `nuance` (sens 1) | « Toujours devant un nom : こんな料理, ce genre de plat ; ce qui ressemble à ce qui est proche du locuteur. », la forme de l'exemple de la fiche, avec la graphie de son ancien exemple. |
| V2-132 | `v_414_s2` | そっち | 11 | `nuance` (sens 2) | « Désigne aussi le camp de l'interlocuteur. », version arbitrée (correction de repli), sans exemple japonais. |

**Effets attendus** : neuf nuances de sens, dans sept ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; les dix sens de 6c restent candidats au volet 1, leurs fonctions, types et catégories n'étant pas examinés ici. **Liste globale unique : 10 + 5 + 132 = 147 corrections, 132 ENTRY, toutes non appliquées**, lots 00 à 11, 13, 18, 21. Ce total de 147 corrections est sans rapport avec les 147 arbitrages du volet 2. **Restent 101 nuances du plan** : tranche 6, 18 (6d : 7 ; 6e : 11) ; tranche 7, 39 ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés, non rouverts.

### 8.21 Volet 1, lot 2 (provenance), tranche 6, livraison 6d : arbitrée, 1 sourcé et 6 écarts (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t6-6d.md` (§Z0). Les sept verdicts sont confirmés ; les six corrections sont retenues sans modification. Sourcé : どっち (la fiche atteste dochira ; transcription en どちら recevable, précédent du lot 01). お国はどちらですか est conservé pour どちら sens 2, attesté par un ancien exemple de cette fiche ; **V2-109, pour 国, est maintenue séparément**. Pour どの, どの本 est retenu plutôt que l'exemple entier. **Les renvois asymétriques relèvent exclusivement de la provenance documentaire ; ils ne constituent pas une nouvelle règle linguistique.** Aucune fiche source ni décision historique n'est modifiée. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-133 | `v_396_s1` | どちら | 11 | `nuance` (sens 1) | « Pour choisir entre deux : コーヒーとこうちゃと、どちらがすきですか. », la forme de l'exemple de la fiche, sans 紅茶 ni いい. |
| V2-134 | `v_396_s2` | どちら | 11 | `nuance` (sens 2) | « Forme polie : お国はどちらですか, d'où venez-vous ? », sans le renvoi à どこ. |
| V2-135 | `v_396_s3` | どちら | 11 | `nuance` (sens 3) | « Pour demander l'identité de quelqu'un de façon respectueuse. », d'après la fiche, sans exemple japonais. |
| V2-136 | `v_396` | どちら | 11 | `nuance` (ENTRY) | « Forme polie ; plus familier : どっち, どれ. », sans どこ. |
| V2-137 | `v_398_s1` | どの | 11 | `nuance` (sens 1) | « Toujours devant un nom : どの本, quel livre ? », la suite de l'ancien exemple, sans ですか. |
| V2-138 | `v_399_s1` | どれ | 11 | `nuance` (sens 1) | « Parmi trois éléments ou plus. », sans le renvoi à どちら ni à どっち. |

**Effets attendus** : une nuance d'ENTRY et cinq nuances de sens, dans trois ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; les six sens de 6d restent candidats au volet 1. **Liste globale unique : 10 + 5 + 138 = 153 corrections, 135 ENTRY, toutes non appliquées**, lots 00 à 11, 13, 18, 21. **Restent 94 nuances du plan** : 6e, 11 ; tranche 7, 39 ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.22 Volet 1, lot 2 (provenance), tranche 6, livraison 6e : arbitrée, 5 sourcés et 6 écarts ; clôture de la tranche 6 (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t6-6e.md` (§AA0). Les onze verdicts sont confirmés ; les six corrections sont retenues sans modification. Sourcés : どなた, 誰, なぜ, あなた, 誰か. **自分** : écart confirmé ; la flexion régulière ne suffit pas à rendre automatiquement sourcée une expression nouvelle ; 自分でやる, forme du dictionnaire, est retenue. **皆** : みなさん, graphie de l'ancien exemple de cette ENTRY ; la correction de catégorie du volet 2 (n° 4) est préservée séparément ; « plus respectueux » n'est pas explicité par la fiche de 皆, point noté sans rouvrir l'audit du français. **どう** : l'asymétrie avec いかが est documentaire, non linguistique. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié. **Aucune correction n'est appliquée.**

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-139 | `v_390_s1` | いかが | 11 | `nuance` (sens 1) | « Forme polie de どう : いかがですか, comment allez-vous ?, qu'en pensez-vous ? », sans la phrase sur la proposition ni お茶はいかがですか. |
| V2-140 | `v_393_s1` | どう | 11 | `nuance` (sens 1) | « La manière, l'état, l'avis : どうですか, comment est-ce ?, qu'en pensez-vous ? », sans le renvoi à いかが. |
| V2-141 | `v_585_s1` | いくつ | 11 | `nuance` (sens 1) | « Pour un nombre d'objets, avec le compteur général 〜つ ; aussi pour demander l'âge. », sans おいくつですか. |
| V2-142 | `v_606_s1` | 皆 | 11 | `nuance` (sens 1) | « Souvent écrit みんな. Plus respectueux, pour s'adresser à un groupe : みなさん. », la graphie de l'ancien exemple de la fiche. |
| V2-143 | `v_688_s1` | 私 | 11 | `nuance` (sens 1) | « Neutre et poli, pour tous. Possessif : 私の名前, mon nom. », la forme de l'ancien exemple, sans わたくし. |
| V2-144 | `v_691_s1` | 自分 | 11 | `nuance` (sens 1) | « Sa propre personne ; s'emploie aussi pour « moi, je » : 自分でやる, le faire soi-même. », la forme du dictionnaire de l'ancien exemple. |

**Effets attendus** : six nuances de sens, dans six ENTRY ; cinq qu'aucune autre correction ne vise, et 皆, qui porte déjà la modification n° 4 du volet 2 sur un autre champ (`category`), non rouverte ; aucun avertissement touché. **Liste globale unique : 10 + 5 + 144 = 159 corrections, 140 ENTRY, toutes non appliquées**, lots 00 à 11, 13, 18, 21.

**Clôture de la tranche 6** (lots 10 et 11 : 47 nuances, 41 ENTRY) :

| Livraison | Contenu | Nuances | Sourcées | Assumées | Écarts | Corrections |
|---|---|---|---|---|---|---|
| 6a | lot 10, positions relatives | 10 | 4 | 0 | 6 | V2-110 à V2-115 |
| 6b | lot 10, directions, distance et repères | 9 | 1 | 0 | 8 | V2-116 à V2-123 |
| 6c | lot 11, séries こ, そ, あ | 10 | 1 | 0 | 9 | V2-124 à V2-132 (V2-132 sous sa forme de repli) |
| 6d | lot 11, どちら et le choix | 7 | 1 | 0 | 6 | V2-133 à V2-138 |
| 6e | lot 11, autres interrogatifs et pronoms | 11 | 5 | 0 | 6 | V2-139 à V2-144 |
| **Tranche 6** | | **47** | **12** | **0** | **35** | **35 corrections, dans 30 ENTRY** |

Par lot : lot 10, 19 nuances, 5 sourcées, 14 écarts ; lot 11, 28 nuances, 7 sourcées, 21 écarts. Des huit faux positifs présumés de la tranche, six sont confirmés justes (近く sens 1, あっち, どっち, なぜ, 誰, あなた) et deux recouvraient un écart de graphie (下, 皆). **Restent 83 nuances de provenance** : tranche 7, 39 ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.23 Volet 1, lot 2 (provenance), tranche 7, livraison 7a : arbitrée, 5 sourcés, 1 assumé et 3 écarts (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t7-7a.md` (§AB0). Les neuf verdicts sont confirmés ; les trois corrections sont retenues sans modification. Sourcés : さ来年, 去年, 明日, 近々, 昼 (sens 1). **晩** : « assumé », confirmé ; D0808 attribue explicitement le sens « Nuit » à 夜 afin de le retirer de 晩, ce qui fournit un fondement vérifiable au renvoi publié ; **ce précédent n'est pas à généraliser à toute relation structurée ni à toute citation incidente d'un autre mot**. **午前** : écart de graphie confirmé (la fiche écrit 午前10時) ; le renvoi à 午後 est conservé, l'opposition étant documentée dans un ancien exemple de la même fiche. **午後** : 午後1時, attesté par l'ancien exemple ; le renvoi à 午前, expressément nommé, est conservé. **昼, sens 2** : 昼にする est retiré ; 昼ごはん, graphie de la fiche de 昼, est employée, sans y substituer 昼ご飯, qui provient d'une autre fiche. **Périmètre de la tranche 7 arbitré le même jour** (39 nuances, cinq livraisons) ; une relation structurée validée (`transitive_of`) ne rend pas automatiquement « assumé » le renvoi présent dans une nuance. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-145 | `v_310` | 午前 | 12 | `nuance` (ENTRY) | « Aussi devant une heure : 午前10時, dix heures du matin. Contraire : 午後. », le nombre écrit comme dans l'ancien exemple de la fiche. |
| V2-146 | `v_649` | 午後 | 12 | `nuance` (ENTRY) | « Aussi devant une heure : 午後1時, une heure de l'après-midi. Contraire : 午前. », la suite de l'ancien exemple de la fiche et sa traduction. |
| V2-147 | `v_670_s2` | 昼 | 12 | `nuance` (sens 2) | « Le repas se dit aussi 昼ごはん. », la graphie de l'exemple de la fiche, sans 昼にする ni « faire la pause déjeuner ». |

**Effets attendus** : deux nuances d'ENTRY et une nuance de sens, dans trois ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché. **Liste globale unique : 10 + 5 + 147 = 162 corrections, 143 ENTRY, toutes non appliquées**, lots 00 à 13, 18, 21. **Restent 74 nuances de provenance** : tranche 7, 30 (7b : 9 ; 7c : 7 ; 7d : 6 ; 7e : 8) ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.24 Volet 1, lot 2 (provenance), tranche 7, livraison 7b : arbitrée, 7 sourcés, 1 assumé et 1 écart (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t7-7b.md` (§AC0). Les neuf verdicts sont confirmés ; la correction est retenue sans modification. **緑** : écart de graphie confirmé ; la fiche écrit midori no iro en romaji mais n'atteste pas le kanji 色 ; 緑の木 provient de l'ancien exemple de cette fiche ; la correction de repli 緑のいろ n'est pas employée. **色** : « assumé », confirmé ; D1026 cite expressément 茶色 et 黄色, indique leur statut de composés présents dans les sources et précise que l'emploi en composé est décrit en nuance ; **cette décision n'est pas à généraliser à toute mention incidente d'un autre mot**. **白い, 赤い, 黒い** : sourcés ; chaque fiche décrit la dérivation depuis le nom en romaji et écrit le radical en kanji dans l'adjectif, sans graphie extérieure à la fiche. **白 et 黒** : sourcés indépendamment, chacun à partir de sa propre fiche et de ses anciens exemples. **黄色 et 茶色** : sourcés, pour la décomposition du composé et pour l'emploi avec の. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-148 | `v_473` | 緑 | 15 | `nuance` (ENTRY) | « Souvent suivi de の pour qualifier un nom : 緑の木, des arbres verts. », la suite de l'ancien exemple de la fiche et sa traduction. |

**Effets attendus** : une nuance d'ENTRY, dans une ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché. **Liste globale unique : 10 + 5 + 148 = 163 corrections, 144 ENTRY, toutes non appliquées**, lots 00 à 13, 15, 18, 21. **Restent 65 nuances de provenance** : tranche 7, 21 (7c : 7 ; 7d : 6 ; 7e : 8) ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.25 Volet 1, lot 2 (provenance), tranche 7, livraison 7c : arbitrée, 2 sourcés, 1 assumé et 4 écarts (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t7-7c.md` (§AD0). Six des sept verdicts proposés sont confirmés ; **celui de 低い est modifié** : la proposition le donnait « sourcé » (3 sourcés, 1 assumé, 3 écarts), l'arbitrage le reclasse en « écart ». La suppression de あまり dans 値段は低くありません retire une information de degré présente dans l'exemple source (« pas très bas ») ; elle dépasse une simple réduction de contexte. **V2-152 est ajoutée par l'arbitrage** : remplacer uniquement cette suite, sans modifier le reste de la nuance ni rouvrir l'arbitrage du lot 15 sur l'emploi de 低い avec les prix. Sourcés : 大きな, 小さな (dérivation dite par la fiche, radical écrit en kanji). **短い** : « assumé », confirmé ; D1053 nomme explicitement 長い comme le contraire participant à son raisonnement sur le sens unique ; décision à ne pas généraliser aux citations incidentes. **大きい, 小さい, 重い (sens 1)** : écarts de graphie confirmés, V2-149 à V2-151 retenues sans modification ; **aucune exception n'autorise les kanji d'un contraire au seul motif que celui-ci possède une autre fiche source**. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-149 | `v_440` | 大きい | 15 | `nuance` (ENTRY) | « Une taille, un volume ou une superficie. Contraire : ちいさい. », le contraire que la fiche nomme, transcrit en kana. |
| V2-150 | `v_445` | 小さい | 15 | `nuance` (ENTRY) | « Une taille, un volume ou une superficie. Contraire : おおきい. », le contraire que la fiche nomme, transcrit en kana. |
| V2-151 | `v_484_s1` | 重い | 15 | `nuance` (sens 1) | « Contraire : かるい. », le contraire que la fiche nomme, transcrit en kana. |
| V2-152 | `v_183` | 低い | 15 | `nuance` (ENTRY) | Remplacer uniquement 値段は低くありません par 値段はあまり低くありません : « Une faible hauteur ou un niveau peu élevé : une température, une note, une voix, un prix (値段はあまり低くありません). Pour dire « bon marché », on emploie plutôt 安い. Contraire : 高い. » Ajoutée par l'arbitrage. |

**Effets attendus** : trois nuances d'ENTRY et une nuance de sens, dans quatre ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; le verdict du volet 2 sur 重い, sens 1, n'est pas rouvert. **Liste globale unique : 10 + 5 + 152 = 167 corrections, 148 ENTRY, toutes non appliquées**, lots 00 à 13, 15, 18, 21. **Restent 58 nuances de provenance** : tranche 7, 14 (7d : 6 ; 7e : 8) ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.26 Volet 1, lot 2 (provenance), tranche 7, livraison 7d : arbitrée, 6 écarts ; le lot 15 est entièrement arbitré (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t7-7d.md` (§AE0). Les six verdicts sont confirmés (0 sourcé, 0 assumé, 6 écarts) ; les six corrections sont retenues sans modification. Dans les six cas, le contraire publié en kanji est remplacé par sa transcription en kana, et le reste de la nuance est conservé intégralement. **La transcription en kana est admise parce que les romaji concernés sont explicitement attestés ; aucune exception ne permet d'importer les kanji d'une autre ENTRY.** **細い** : このみちは細いです est conservé. **厚い** : la mention de la traduction source « chaleureux (pour l'accueil) » est conservée, conformément à D1064. **薄い, sens 1** : **la graphie de atsui n'est pas établie par la fiche** ; aucune graphie kanji non attestée par cette fiche n'est choisie ; le verdict ne rouvre ni D1065 ni les sens 2 et 3. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-153 | `v_448` | 広い | 15 | `nuance` (ENTRY) | « Une grande superficie, une pièce spacieuse, un espace étendu. Contraire : せまい. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. |
| V2-154 | `v_463` | 狭い | 15 | `nuance` (ENTRY) | « Une superficie restreinte, un passage étroit, une pièce exiguë. Contraire : ひろい. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. |
| V2-155 | `v_443` | 太い | 15 | `nuance` (ENTRY) | « Un objet allongé ou cylindrique de forte circonférence : un tronc d'arbre, une jambe, une corde. Contraire : ほそい. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. |
| V2-156 | `v_469` | 細い | 15 | `nuance` (ENTRY) | « Un objet allongé ou un membre de faible circonférence ou épaisseur ; aussi un chemin étroit (このみちは細いです). Contraire : ふとい. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. |
| V2-157 | `v_435` | 厚い | 15 | `nuance` (ENTRY) | « L'épaisseur d'un objet plat ou volumineux : un livre, un manteau, une planche. Contraire : うすい. La source donne aussi la traduction « chaleureux (pour l'accueil) », sans la développer. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. |
| V2-158 | `v_477_s1` | 薄い | 15 | `nuance` (sens 1) | « Un objet plat de faible épaisseur : une feuille de papier. Contraire : あつい. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. La graphie de atsui n'est pas établie par la fiche. |

**Effets attendus** : cinq nuances d'ENTRY et une nuance de sens, dans six ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché. **Liste globale unique : 10 + 5 + 158 = 173 corrections, 154 ENTRY, toutes non appliquées**, lots 00 à 13, 15, 18, 21.

**Le lot 15 est entièrement arbitré sur son périmètre de provenance : 22 nuances** (7b : 9 ; 7c : 7 ; 7d : 6), 9 sourcées, 2 assumées, 11 écarts ; 11 corrections, V2-148 à V2-158, dans 11 ENTRY. **Restent 52 nuances de provenance** : 7e, 8 ; tranche 8, 44. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.27 Volet 1, lot 2 (provenance), tranche 7, livraison 7e : arbitrée, 4 sourcés et 4 assumés, aucune correction ; clôture de la tranche 7 (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t7-7e.md` (§AF0). Les huit verdicts sont confirmés, sans correction supplémentaire. Sourcés : 開く, 閉める, 並べる (renvoi attesté par le romaji et le radical que la fiche écrit), 取る (撮 dans un ancien exemple, confirmé par D1201). Assumés : 閉まる (D1176), 引く (D1210), **消す (D1192) et 並ぶ (D1228), avec réserve**. Pour ces deux ENTRY, quatre points sont consignés séparément au rapport : la fiche examinée ne nomme pas le correspondant et n'est pas la source du renvoi ; l'affirmation « La fiche nomme elle-même son correspondant » de D1192 et de D1228 est inexacte pour elles ; ces décisions validées assument néanmoins expressément le renvoi en nuance ; les fiches des partenaires (消える, 並べる) attestent les couples. **D1192 et D1228 ne sont pas réécrites.** D1577 et D1579, qui portent sur `transitive_of`, ne sont pas employées comme autorisation de renvois pédagogiques ; D1579 concerne le sens 2 de 並ぶ, « Être aligné », non le sens 1 ; ces sens ne sont pas rouverts. **Ces deux cas ne créent aucune nouvelle règle normative.** Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

**Aucune correction ne naît de 7e.** **Liste globale unique, inchangée : 10 + 5 + 158 = 173 corrections, 154 ENTRY, toutes non appliquées**, lots 00 à 13, 15, 18, 21.

**Clôture de la tranche 7** (lots 12, 15 et 18 : 39 nuances, 38 ENTRY) :

| Livraison | Contenu | Nuances | Sourcées | Assumées | Écarts | Corrections |
|---|---|---|---|---|---|---|
| 7a | lot 12, temps relatif et moments de la journée | 9 | 5 | 1 | 3 | V2-145 à V2-147 |
| 7b | lot 15, couleurs | 9 | 7 | 1 | 1 | V2-148 |
| 7c | lot 15, taille, longueur, hauteur et poids | 7 | 2 | 1 | 4 | V2-149 à V2-152 (V2-152 ajoutée par l'arbitrage : 低い reclassé de sourcé à écart) |
| 7d | lot 15, étendue et épaisseur | 6 | 0 | 0 | 6 | V2-153 à V2-158 |
| 7e | lot 18, actions sur les objets | 8 | 4 | 4 | 0 | aucune |
| **Tranche 7** | | **39** | **18** | **7** | **14** | **14 corrections, dans 14 ENTRY** |

Par lot : lot 12, 9 nuances, 5 sourcées, 1 assumée, 3 écarts ; lot 15, 22 nuances, 9 sourcées, 2 assumées, 11 écarts ; lot 18, 8 nuances, 4 sourcées, 4 assumées (dont deux avec réserve), 0 écart. Des vingt faux positifs présumés de la tranche, huit sont sourcés, deux assumés, dix recouvraient un écart de graphie. Règles fixées par les arbitrages de la tranche, sans portée normative nouvelle au-delà du contrôle de provenance : une relation structurée validée ne rend pas à elle seule un renvoi « assumé » ; un précédent « assumé » ne se généralise pas aux citations incidentes ; la transcription en kana d'un romaji attesté est admise, sans importer les kanji d'une autre ENTRY ; le retrait d'un mot qui porte une information de l'exemple source n'est pas une simple réduction. **Restent 44 nuances de provenance, toutes dans la tranche 8.** 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.28 Volet 1, lot 2 (provenance), tranche 8, livraison 8a : arbitrée, 5 sourcés et 2 écarts (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t8-8a.md` (§AG0). Les sept verdicts sont confirmés ; les deux corrections sont retenues sans modification. Sourcés : 一月 (la fiche distingue ひとつき de いちがつ ; les lectures publiées ne sont pas rouvertes), ゼロ (零 et れい), 二十歳 (歳), 好き et 上手 (le retrait du thème de l'exemple conserve la construction essentielle). **下手** : écart de graphie ; D1090 cite 上手 pour justifier une catégorie, mais n'assume pas la graphie de ce renvoi en nuance. **難しい** : écart de graphie ; **la fiche ne permet pas d'attribuer un kanji précis au romaji yasashii** ; la limite est signalée, sans importer de graphie depuis l'ENTRY 易しい. **Périmètre de la tranche 8 arbitré le même jour** (44 nuances dans 40 ENTRY, six livraisons) ; les critères déjà arbitrés s'appliquent sans nouvelle exception et ne sont pas de nouvelles règles normatives ; un champ structuré validé (`suru_compatible: true`) ne fonde pas à lui seul un élément de nuance, pas plus qu'une relation. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-159 | `v_430` | 下手 | 16 | `nuance` (ENTRY) | « Le manque d'habileté dans une activité : りょうりが下手です (cuisiner mal). Contraire : じょうず. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. |
| V2-160 | `v_486` | 難しい | 16 | `nuance` (ENTRY) | « Une tâche, une question ou une situation qui demande de l'effort ou de la réflexion. Contraire : やさしい. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. La graphie de yasashii n'est pas établie par la fiche. |

**Effets attendus** : deux nuances d'ENTRY, dans deux ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; le verdict du volet 2 sur 難しい, sens 1, n'est pas rouvert. **Liste globale unique : 10 + 5 + 160 = 175 corrections, 156 ENTRY, toutes non appliquées**, lots 00 à 13, 15, 16, 18, 21. **Restent 37 nuances de provenance, toutes en tranche 8** (8b : 7 ; 8c : 9 ; 8d : 9 ; 8e : 7 ; 8f : 5). 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.29 Volet 1, lot 2 (provenance), tranche 8, livraison 8b : arbitrée, 2 sourcés, 3 assumés et 2 écarts (2026-10-12)

Arbitrage définitif du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur ; rendu après ouverture et relecture directe de l'archive) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t8-8b.md` (§AH0). Les sept verdicts sont confirmés ; les deux corrections sont retenues sans modification. Sourcés : 遅い et 汚い (sens 1), dont les transcriptions en kana respectent les romaji des fiches. Assumés : **強い et 弱い** (D1134 et D1137 identifient explicitement le contraire dans le raisonnement sur le sens unique, comme D1053 pour 短い) ; **早い** (D1402 valide expressément le maintien de 速い dans la nuance). Écarts : 新しい et 静か. Pour 弱い, la suppression de きょうは dans l'exemple est une réduction de contexte acceptable : elle ne modifie pas le prédicat, contrairement au retrait de あまり corrigé dans 低い (V2-152). Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-161 | `v_453` | 新しい | 17 | `nuance` (ENTRY) | « Ce qui vient d'être acquis ou fabriqué, ou qui est récent. Contraire : ふるい. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. |
| V2-162 | `v_489` | 静か | 17 | `nuance` (ENTRY) | « Un endroit sans bruit ni agitation, ou une atmosphère paisible et sereine. Contraire : にぎやか. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. |

**Effets attendus** : deux nuances d'ENTRY, dans deux ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; le verdict du volet 2 sur 静か, sens 1, n'est pas rouvert. **Liste globale unique : 10 + 5 + 162 = 177 corrections, 158 ENTRY, toutes non appliquées**, lots 00 à 13, 15 à 18, 21. **Restent 30 nuances de provenance, toutes dans la tranche 8** (8c : 9 ; 8d : 9 ; 8e : 7 ; 8f : 5). 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.30 Volet 1, lot 2 (provenance), tranche 8, livraison 8c : arbitrée, 9 sourcés, aucune correction (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t8-8c.md` (§AI0). **Bilan de 8c : 9 sourcés, 0 assumé, 0 écart, aucune correction.** Les neuf verdicts sont confirmés : 座る et 立つ (exemples attestés ; forme en -te iru, transcrite ている) ; 結婚 (la fiche nomme elle-même kekkon suru avec son sens ; 結婚する n'est pas construit à partir du seul champ `suru_compatible`) ; 死ぬ (terminaison ぬ, décrite comme -nu) ; 生活 (emploi avec suru ; aucune forme composée ajoutée) ; また, sens 1 (またね transcrit mata ne ; traduction de またあいましょう selon D1382) ; 同じ (同じクラス atteste l'emploi sans な ; D1418 explicite l'observation ; décision de classe non rouverte) ; 他 (ほかに attesté ; exemple altéré non repris, D1429) ; それでは (じゃあ correspond au romaji jaa, sans s'appuyer sur une relation `equivalent_to`). Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

**Aucune correction ne naît de 8c.** **Liste globale unique, inchangée : 10 + 5 + 162 = 177 corrections, 158 ENTRY, toutes non appliquées**, lots 00 à 13, 15 à 18, 21. **Restent 21 nuances de provenance** : 8d, 9 ; 8e, 7 ; 8f, 5. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.31 Volet 1, lot 2 (provenance), tranche 8, livraison 8d : arbitrée, 5 sourcés, 2 assumés et 2 écarts (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t8-8d.md` (§AJ0). Les neuf verdicts sont confirmés ; les deux corrections sont retenues sans modification. Sourcés : 居る, なる, 困る, やる (sens 1), 次, dont les nuances et les exemples sont conservés tels que publiés. Assumés : **出来る, sens 1** (D1315 décrit explicitement le remplacement de 出きる par 出来る dans l'exemple de la nuance ; un ancien exemple confirme cette graphie) ; **終わる** (D1341 assume explicitement la graphie 終わりました à la place de 終りました ; les anciens exemples l'attestent). Écarts : **ある** (aucun kanji n'est attribué à iru à partir d'une autre ENTRY) ; **やる, sens 2** (D1337 documente une paire candidate à une relation, D1587 valide une relation ; aucune de ces décisions n'assume expressément la graphie dans la nuance de やる). Ces deux verdicts respectent la distinction retenue entre les décisions portant sur les relations structurées et celles qui assument expressément un renvoi pédagogique. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-163 | `v_516` | ある | 20 | `nuance` (ENTRY) | « Pour les choses inanimées : objets, lieux, notions abstraites. Pour les êtres vivants, on emploie いる. », le verbe que la fiche nomme, transcrit en kana ; aucune autre partie de la nuance n'est modifiée. |
| V2-164 | `v_608_s2` | やる | 20 | `nuance` (sens 2) | « Donner à un animal, à une plante, ou à quelqu'un d'inférieur ; la fiche le rapproche de あげる (« ageru »). », le verbe que la fiche nomme, transcrit en kana ; aucune autre partie de la nuance n'est modifiée. |

**Effets attendus** : une nuance d'ENTRY et une nuance de sens, dans deux ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; les verdicts du volet 2 sur les sens de ある et de やる ne sont pas rouverts. **Liste globale unique : 10 + 5 + 164 = 179 corrections, 160 ENTRY, toutes non appliquées**, lots 00 à 13, 15 à 18, 20, 21. **Restent 12 nuances de provenance** : 8e, 7 ; 8f, 5. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.32 Volet 1, lot 2 (provenance), tranche 8, livraison 8e : arbitrée, 6 sourcés et 1 écart (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t8-8e.md` (§AK0). Les sept verdicts sont confirmés ; la correction est retenue sans modification. **Exemples écrits en kana (多い, 少ない, 大勢, 全部, 少し sens 1) : sourcés.** Leur graphie n'est pas identique à celle des exemples sources, le mot vedette y étant écrit en kana plutôt qu'en kanji ; les kana publiés correspondent exactement aux furigana fournis par les mêmes fiches, et les phrases conservent tous leurs mots, particules et formes verbales : **c'est une transcription fidèle d'une lecture attestée, non une graphie ajoutée depuis une autre fiche**. Cette distinction est consignée pour ces exemples, sans dire qu'ils sont graphiquement identiques et **sans créer de règle normative générale** ; aucune correction n'est nécessaire pour eux. Sourcés aussi : たくさん (y compris な, transcription du na de la fiche) ; 少し, nuance d'ENTRY (ちょっと transcrivant chotto). **少ない** : écart de graphie ; seul 多い est remplacé par おおい ; D1605 valide une relation structurée et n'assume pas la graphie 多い dans la nuance. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

| # | Unité | Mot | Lot | Champ | Correction retenue |
|---|---|---|---|---|---|
| V2-165 | `v_447` | 少ない | 24 | `nuance` (ENTRY) | « Qualifie une quantité restreinte ou un nombre faible d'éléments ou de personnes : このまちはくるまがすくないです (il y a peu de voitures dans cette ville). Antonyme de おおい, selon la fiche. » Seul 多い est remplacé par おおい, dans le renvoi au contraire ; le reste de la nuance, exemple compris, est conservé. |

**Effets attendus** : une nuance d'ENTRY, dans une ENTRY qu'aucune autre correction ne vise ; aucun avertissement touché ; la relation `opposed_to` de 少ない n'est pas touchée. **Liste globale unique : 10 + 5 + 165 = 180 corrections, 161 ENTRY, toutes non appliquées**, lots 00 à 13, 15 à 18, 20, 21, 24. **Restent 5 nuances de provenance, toutes dans 8f.** 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.33 Volet 1, lot 2 (provenance), tranche 8, livraison 8f : arbitrée, 5 sourcés, aucune correction ; clôture de la tranche 8 ; les 278 nuances du plan sont arbitrées (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-t8-8f.md` (§AL0). Les cinq verdicts sont confirmés, sans correction supplémentaire : `v_471_s1` 結構, `v_471` 結構, `v_517_s1` 一番, `v_546_s1` 大体, `v_546` 大体, tous sourcés. Les trois exemples utilisant けっこう, いちばん et だいたい sont acceptés comme transcriptions fidèles des furigana de leurs fiches respectives, selon le raisonnement retenu pour 8e ; **ils ne sont pas graphiquement identiques aux exemples sources ; le constat est individuel et ne crée aucune règle normative générale**. Pour 一番, la graphie いちばん figure aussi dans trois anciens exemples de sa propre fiche. Les renvois な et たいてい sont documentés par les indications en romaji de leurs fiches. Aucune donnée publiée, fiche source, décision historique, registre, outil ni snapshot n'est modifié.

**Aucune correction ne naît de 8f.** **Liste globale unique, inchangée : 10 + 5 + 165 = 180 corrections, 161 ENTRY, toutes non appliquées**, lots 00 à 13, 15 à 18, 20, 21, 24.

**Clôture de la tranche 8** (lots 13, 14, 16, 17, 19 à 24 : 44 nuances, 40 ENTRY) :

| Livraison | Contenu | Nuances | Sourcées | Assumées | Écarts | Corrections |
|---|---|---|---|---|---|---|
| 8a | lots 13, 14 et 16 : calendrier, nombres, préférences et aptitudes | 7 | 5 | 0 | 2 | V2-159, V2-160 |
| 8b | lot 17 et 早い : états et propriétés descriptives | 7 | 2 | 3 | 2 | V2-161, V2-162 |
| 8c | lot 19, また, lots 22 et 23 | 9 | 9 | 0 | 0 | aucune |
| 8d | lot 20 : existence, possession, action et déroulement | 9 | 5 | 2 | 2 | V2-163, V2-164 |
| 8e | lot 24 : quantité | 7 | 6 | 0 | 1 | V2-165 |
| 8f | lot 24 : degré, rang et approximation | 5 | 5 | 0 | 0 | aucune |
| **Tranche 8** | | **44** | **32** | **5** | **7** | **7 corrections, dans 7 ENTRY** |

**Les 278 nuances de provenance du plan sont arbitrées** : 119 sourcées, 20 assumées, 139 écarts ; il ne reste aucune nuance de provenance à examiner. La vérification exhaustive de ce constat (couverture des identifiants, rapprochement des écarts et des 165 corrections de provenance, chevauchements, réserves, limites) est dans `etape2-A2-05-volet1-lot2-provenance-bilan.md`, livré en proposition. **Aucune correction n'est appliquée ; aucun nouveau chantier lexical n'est commencé.** 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.34 Volet 1, lot 2 (provenance) : bilan exhaustif arbitré, contrôle de provenance clos (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot2-provenance-bilan.md` (§0). **Le bilan exhaustif est accepté** : 278 nuances du plan, toutes arbitrées (119 sourcées, 20 assumées, 139 écarts) ; 34 unités de la tranche 1 et 2 hors JLPT, distinguées du plan ; 165 corrections de provenance ; rapprochements cohérents entre écarts et corrections ; chevauchements avec les 377 candidats et les 147 arbitrages du volet 2 documentés, non rouverts. Les réserves du bilan (§5) sont conservées. **Limites maintenues** : le bilan prouve la couverture documentaire et la cohérence des décomptes ; il ne constitue ni une nouvelle vérification lexicale de toutes les fiches, ni une preuve de reproductibilité complète.

**Le contrôle de provenance du volet 1, lot 2, est clos documentairement.** **Liste globale unique, inchangée : 10 + 5 + 165 = 180 corrections, 161 ENTRY, toutes retenues et non appliquées.** **Ni A2-05 ni l'étape 2 ne sont terminées** : restent l'examen individuel des 377 candidats du volet 1 (lot 3, dont seul le périmètre est préparé, en proposition : `etape2-A2-05-volet1-lot3-perimetre.md`), le volet 3 (G1 à G7, non ouvert), l'application des corrections et l'arbitrage global. 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.35 Volet 1, lot 3 : livraison pilote A1 arbitrée ; liste distincte des vérifications hors périmètre (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-A1.md` (§0). **A1 : 10 conformes, 0 écart, 0 suspendu, aucune correction** ; les dix sens (英語, 言葉 sens 2, 冬, 夏, 春, 秋, 北, 南, 東, 西) conservent `concept_abstrait`. **V1-6 reste disponible.** Le raisonnement tenu pour les saisons peut servir de base aux autres sens temporels du bloc A, chaque fiche étant examinée intégralement, sans verdict automatique. **Lot 3 : 10 sens arbitrés sur 377 ; 367 restent**, dont 59 du bloc A et 17 du bloc F, suspendu au préalable E5. Périmètre inchangé : 377 candidats, 40 livraisons, sans ajout ni retrait.

**Liste distincte des vérifications hors périmètre.** Ces sens ne sont pas des candidats des 377 et n'y sont pas ajoutés ; **aucun n'est examiné, aucun ne porte de verdict** ; leur type publié n'est ni validé ni infirmé. Leur cadre de contrôle sera proposé ultérieurement, sans examen lexical individuel non autorisé.

| N° | Sens | Mot | Traduction | Catégorie publiée | Type publié | Origine | Motif | État |
|---|---|---|---|---|---|---|---|---|
| HP-1 | `v_604_s1` | ひらがな | Hiragana | `communication_langage › ecriture › systemes_d_ecriture` | `information_contenu` | A1, R1 | comparable de 英語 et 言葉 (sens 2), `concept_abstrait` : un système d'écriture publié `information_contenu`, sans décision de type | non examiné ; cadre à proposer |
| HP-2 | `v_682_s1` | 漢字 | Kanji | `communication_langage › ecriture › systemes_d_ecriture` | `information_contenu` | A1, R1 | même motif | non examiné ; cadre à proposer |
| HP-3 | `v_351_s1` | 右 | Droite | `espace_proprietes_spatiales › direction_orientation › gauche_droite` | `lieu` | A1, R3 | comparable des points cardinaux, `concept_abstrait` : même catégorie de niveau 2, publié `lieu`, sans décision de type | non examiné ; cadre à proposer |
| HP-4 | `v_353_s1` | 左 | Gauche | `espace_proprietes_spatiales › direction_orientation › gauche_droite` | `lieu` | A1, R3 | même motif | non examiné ; cadre à proposer |

**Liste globale unique, inchangée : 10 + 5 + 165 = 180 corrections, 161 ENTRY, toutes retenues et non appliquées.** 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.36 Volet 1, lot 3 : livraison A2 arbitrée (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-A2.md` (§0). **A2 : 9 conformes, 0 écart, 0 suspendu, aucune correction** ; les neuf sens (あさって, さ来年, 一昨日, 今, 今年, 今日, 今晩, 今月, 今朝) conservent `concept_abstrait`, leurs catégories et leurs fonctions. 今 : la fiche désigne l'instant présent et non une période étendue ; le type reste pertinent selon A2-ST. **R4** : l'absence de décision historique sur les types et les catégories est un constat documentaire, non un écart à corriger. **R5** : `temps › moments_periodes › parties_de_la_journee` est conservée pour 今晩 et 今朝 (la catégorie décrit une partie de journée ; `deictique` porte le repérage par rapport au présent) ; précédent noté pour l'examen de 昨夜 en A3, sans préjuger son verdict. **V1-6 reste libre.**

**Lot 3 : 19 sens arbitrés sur 377 (A1 : 10 ; A2 : 9) ; 358 restent**, dont 50 du bloc A et les 17 du bloc F, suspendus au préalable E5. Périmètre inchangé : 377 candidats, 40 livraisons. Vérifications hors périmètre HP-1 à HP-4 (§8.35) : non commencées. **Liste globale unique, inchangée : 10 + 5 + 165 = 180 corrections, 161 ENTRY, toutes retenues et non appliquées.** 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.37 Volet 1, lot 3 : livraison A3 arbitrée (2026-10-12)

Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-A3.md` (§0). **A3 : 9 conformes, 0 écart, 0 suspendu, aucune correction** ; les neuf sens (今週, 先月, 先週, 午前, 去年, 夜, 明日, 昨夜, 昨日) conservent leurs types, catégories et fonctions publiés. 昨夜 : `parties_de_la_journee` et `deictique` conservées, justifiées séparément par la fiche. 去年 : `deictique` confirmée, les traductions et les exemples établissant le repérage. R4 conservé comme constat, sans écart. **V1-6 reste libre.**

**Lot 3 : 28 sens arbitrés sur 377 (A1 : 10 ; A2 : 9 ; A3 : 9) ; 349 restent**, dont 41 du bloc A et les 17 du bloc F, suspendu au préalable E5. Périmètre inchangé : 377 candidats, 40 livraisons. Vérifications hors périmètre HP-1 à HP-4 (§8.35) : non commencées. **Liste globale unique, inchangée : 10 + 5 + 165 = 180 corrections, 161 ENTRY, toutes retenues et non appliquées.** 377 candidats et 147 arbitrages du volet 2 inchangés.

### 8.38 Volet 1, lot 3 : livraison A4 arbitrée (2026-10-13)

Arbitrage du 2026-10-13 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-A4.md` (§0). **A4 : 8 conformes, 0 écart, 0 suspendu, aucune correction** ; les huit sens (晩, 朝, 来年, 来月, 来週, 夕方, 午後, 昼 sens 1) sont confirmés. 昼, sens 1 : le découpage de D0800 est conservé, le sens réunissant la période diurne et son milieu ; `concept_abstrait` et `parties_de_la_journee` sont justifiés pour les champs examinés ; la réserve sur la traduction principale est conservée, sans rouvrir le découpage ni les traductions. 午後 : le constat « nom / adverbe temporel » dans la fiche, contre `nom` publié, est conservé ; il n'est pas un écart dans l'audit C3-0, et la classe n'est pas modifiée. R4 conservé comme constat documentaire. **V1-6 reste libre.**

**Lot 3 : 36 sens arbitrés sur 377 (A1 : 10 ; A2 : 9 ; A3 : 9 ; A4 : 8) ; 341 restent**, dont 33 du bloc A et les 17 du bloc F, suspendu au préalable E5. Périmètre inchangé : 377 candidats, 40 livraisons. Vérifications hors périmètre HP-1 à HP-4 (§8.35) : consignées, non commencées ; leur examen individuel n'est pas autorisé. **Liste globale unique, inchangée : 10 + 5 + 165 = 180 corrections, 161 ENTRY, toutes retenues et non appliquées.** 377 candidats et 147 arbitrages du volet 2 inchangés. La livraison A5, autorisée par le même arbitrage, est livrée en proposition (`etape2-A2-05-volet1-lot3-A5.md`) ; rien n'en est inscrit ici avant son arbitrage.

### 8.39 Volet 1, lot 3 : livraison A5 arbitrée (2026-10-13)

Arbitrage du 2026-10-13 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-A5.md` (§0). **A5 : 11 conformes, 0 écart, 0 suspendu, aucune correction.** 夏休み : `concept_abstrait`, `temps › moments_periodes` au niveau 2 et aucune fonction conservés ; la fiche définit une période, même si un ancien exemple dit que les vacances commencent ; D0845 justifie le refus de catégories plus étroites. Les dix dates du mois (七日, 三日, 九日, 二十日, 二日, 五日, 八日, 六日, 十日, 四日) : `concept_abstrait` et `temps › calendrier › dates` conservés, les fiches distinguant expressément la date de la durée ; les sens de durée ne sont pas rouverts. 七日, 二日, 十日 et 四日 : « conforme » maintenu malgré l'absence d'exemple illustrant la date ; constat documentaire conservé, sans créer d'exemple. 二十日 : réserve conservée sur l'ancien exemple relatif à はたち（二十歳）, sans modifier la source ni ouvrir de nouveau chantier. **V1-6 reste libre.**

**Lot 3 : 47 sens arbitrés sur 377 (A1 : 10 ; A2 : 9 ; A3 : 9 ; A4 : 8 ; A5 : 11) ; 330 restent**, dont 22 du bloc A et les 17 du bloc F, suspendu au préalable E5. Périmètre inchangé : 377 candidats, 40 livraisons. Vérifications hors périmètre HP-1 à HP-4 (§8.35) : consignées, non commencées. **Liste globale unique, inchangée : 10 + 5 + 165 = 180 corrections, 161 ENTRY, toutes retenues et non appliquées.** 377 candidats et 147 arbitrages du volet 2 inchangés. La livraison A6, autorisée par le même arbitrage, est livrée en proposition (`etape2-A2-05-volet1-lot3-A6.md`) ; **elle propose une correction, V1-6, qui n'est pas retenue tant qu'elle n'est pas arbitrée et n'est donc pas inscrite dans la liste**.

### 8.40 Volet 1, lot 3 : livraison A6 arbitrée, 10 conformes et 1 écart ; correction V1-6 retenue (2026-10-13)

Arbitrage du 2026-10-13 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-A6.md` (§0). **A6 : 10 conformes, 1 écart, 0 suspendu.** Conformes : les sept jours de la semaine (土曜日, 日曜日, 月曜日, 火曜日, 水曜日, 木曜日, 金曜日), 年 (sens 1), 誕生日 et 休み. 休み : `concept_abstrait` conservé, la fiche présentant une période, un congé ou des vacances, non l'état ou l'action de se reposer ; réserve conservée sur la traduction principale « Repos ». 誕生日 : `concept_abstrait` conservé, le sens désignant la date, non l'événement de célébration. Jours de la semaine : absence de `deictique` confirmée, le repérage du jour le plus proche dépendant du contexte, non du mot. 年, sens 1 : constat conservé sur l'ancien exemple qui quantifie des années, sans rouvrir les autres emplois.

**Écart confirmé, correction retenue, non appliquée** :

| # | SENSE | Mot | Lot | Code | Champ | Valeur publiée | Valeur retenue |
|---|---|---|---|---|---|---|---|
| V1-6 | `v_321_s1` | 時間 « Temps » | 13 | E1 | `semantic_type` | `concept_abstrait` | `quantite_valeur` ; catégorie `temps › duree`, traductions, absence de fonction, sens 2 et `counter` conservés |

**Motivation de l'arbitrage** : la fiche désigne une durée ou du temps disponible ; ses exemples emploient cette durée comme une quantité de temps ; A2-ST couvre les grandeurs quantitatives abstraites sans exiger une valeur chiffrée. **D0924, justification révisée, décision non modifiée** : D0924 (lot 13, validée) justifiait `concept_abstrait` par « la notion de durée, non une quantité déterminée » ; la définition de `quantite_valeur` dans A2-ST-v1 (« valeur quantitative, quantité ou grandeur conceptualisée abstraitement ») ne demandant ni quantité déterminée ni valeur chiffrée, ce critère n'est pas un critère de la norme. D0924 reste au journal telle qu'elle a été validée ; l'application, le jour où elle sera autorisée, passera par une décision nouvelle, journalisée, avec une réouverture explicite. **Le verdict ne préjuge pas de ceux de ちょっと, sens 2, et de 少し, sens 3** (livraison A7). **Code d'écart** : l'arbitrage n'en a pas donné ; « E1 » (contradiction avec une norme finale) est ma lecture, à confirmer. **Confirmé depuis par l'arbitrage d'A7 : voir §8.41.**

**Effets attendus** : un champ d'un sens, dans une ENTRY (`v_321`) qu'aucune autre correction ne visait ; le type reste renseigné, aucun avertissement de l'inventaire n'est touché ; `temps › duree` compterait 13 `quantite_valeur` sur 15.

**Liste globale unique : 10 + 6 + 165 = 181 corrections, 162 ENTRY, toutes retenues et non appliquées** ; V1-7 est le prochain numéro libre du volet 1. **Lot 3 : 58 sens arbitrés sur 377 (A1 : 10 ; A2 : 9 ; A3 : 9 ; A4 : 8 ; A5 : 11 ; A6 : 11) ; 319 restent**, dont 11 du bloc A et les 17 du bloc F, suspendu au préalable E5. Périmètre inchangé : 377 candidats, 40 livraisons. Vérifications hors périmètre HP-1 à HP-4 (§8.35) : consignées, non commencées. 147 arbitrages du volet 2 inchangés. La livraison A7, autorisée par le même arbitrage, est livrée en proposition (`etape2-A2-05-volet1-lot3-A7.md`) ; **elle propose deux corrections, V1-7 et V1-8, qui ne sont pas retenues tant qu'elles ne sont pas arbitrées et ne sont donc pas inscrites dans la liste**.

### 8.41 Volet 1, lot 3 : livraison A7 arbitrée, 9 conformes et 2 écarts ; corrections V1-7 et V1-8 retenues ; les 69 sens du bloc A sont arbitrés (2026-10-13)

Arbitrage du 2026-10-13 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-A7.md` (§0). **A7 : 9 conformes, 2 écarts, 0 suspendu.** Conformes : 初め ; まだ (sens 1 et 2) ; もう (sens 1) ; よく (sens 1) ; 初めて ; 時々 ; 一番 (sens 2) ; 大体 (sens 2). **Adverbes temporels** : `concept_abstrait` est conservé pour sept sens, chacun motivé par la notion temporelle que décrit sa fiche (rapport temporel, fréquence, succession ou rang) ; leur type ne se déduit pas de la seule absence de fonction grammaticale définie ; A9, §4.2, reste pleinement applicable ; **l'arbitrage n'est pas généralisé** aux autres adverbes, notamment もう (sens 2), すぐに, いつも et たいてい. La distinction entre fréquence et quantité de temps est maintenue. Réserves conservées : exemples absents ou ambigus (まだ, sens 1 ; 少し, sens 3 ; 一番, sens 2 ; 大体, sens 2) ; classement de 大体, sens 2.

**Écarts confirmés, corrections retenues, non appliquées** :

| # | SENSE | Mot | Lot | Code | Champ | Valeur publiée | Valeur retenue |
|---|---|---|---|---|---|---|---|
| V1-7 | `v_497_s2` | ちょっと « Un instant » | 24 | E1 | `semantic_type` | `concept_abstrait` | `quantite_valeur` ; les autres champs du sens et les autres sens conservés |
| V1-8 | `v_509_s3` | 少し « Un court instant » | 24 | E1 | `semantic_type` | `concept_abstrait` | `quantite_valeur` ; les autres champs du sens et les autres sens conservés |

**Motivation de l'arbitrage** : pour ちょっと, sens 2, la fiche désigne un bref instant comme petite quantité de temps ; pour 少し, sens 3, la fiche désigne explicitement une courte durée. Chaque sens a été examiné sur sa propre fiche ; le verdict de 時間 n'a pas été transposé. D1535 et D1528, qui ont posé `concept_abstrait`, ne sont pas modifiées.

**Code d'écart, vérifié sur la légende du volet 1** (`etape2-A2-05-coherence-retroactive.md` : E1, contradiction avec une norme finale ; E2, justification devenue obsolète ; E3, application incohérente entre lots ; E4, compréhension incomplète de l'architecture ; E5, point non documenté) : **E1 est confirmé pour V1-6, V1-7 et V1-8**, le type publié contredisant la définition de `quantite_valeur` dans A2-ST-v1, norme finale. La mention « à confirmer » de la ligne V1-6 (§8.40) est levée.

**Effets attendus** : un champ d'un sens dans deux ENTRY (`v_497`, `v_509`) qu'aucune autre correction ne visait ; le type reste renseigné, aucun avertissement de l'inventaire n'est touché ; avec V1-6, les quinze sens de `temps › duree` porteraient `quantite_valeur` ; la relation `similar_to` entre les deux sens n'est pas touchée.

**Liste globale unique : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 est le prochain numéro libre du volet 1. **Lot 3 : 69 sens arbitrés sur 377 (A1 : 10 ; A2 : 9 ; A3 : 9 ; A4 : 8 ; A5 : 11 ; A6 : 11 ; A7 : 11) ; 308 restent**, dans les blocs B à F, dont les 17 du bloc F, suspendu au préalable E5. **Bloc A : 69 sens arbitrés, 66 conformes et 3 écarts** ; son bilan est préparé (`etape2-A2-05-volet1-lot3-blocA-bilan.md`) et soumis à relecture ; **le bloc n'est pas tenu pour clos avant cette relecture**. Périmètre inchangé : 377 candidats, 40 livraisons. Vérifications hors périmètre HP-1 à HP-4 (§8.35) : consignées, non commencées. 147 arbitrages du volet 2 inchangés. Le périmètre opérationnel de B1 est préparé (`etape2-A2-05-volet1-lot3-B1-perimetre.md`), non arbitré ; aucun sens de B1 n'est examiné.

### 8.42 Volet 1, lot 3 : bilan du bloc A arbitré, bloc A clos documentairement ; périmètre de B1 accepté (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-blocA-bilan.md` et `etape2-A2-05-volet1-lot3-B1-perimetre.md` (§0 de chacun). **Bilan du bloc A** : décomptes confirmés (69 sens arbitrés dans sept livraisons ; 66 conformes, 3 écarts, 0 suspendu ; V1-6, V1-7 et V1-8 retenues, non appliquées ; code E1 confirmé pour les trois ; 23 réserves et constats conservés) ; contrôles de couverture et de non-duplication cohérents. Une précision rédactionnelle est faite au §4 : la notion « Période ou portion du temps » est renommée « Périodes et repères temporels », sa justification tenant compte de 今, instant présent et non période étendue ; aucun verdict, aucune correction et aucune décision historique ne change. **Le bilan est arbitré ; le bloc A est clos documentairement.**

**Périmètre de B1 accepté** : 12 sens dans 12 ENTRY, sans ajout ni retrait ; les sept règles du criblage et les comparables recensés sont conservés. **Les rapprochements mécaniques de traduction** (« Café (boisson) » / « Café (établissement) », les emplois de « Cuisine », de « Prendre », de « Léger ») **ne prouvent pas une identité de sens** : chaque différence est examinée sur la fiche entière et les décisions applicables. Les comparables ne sont pas arbitrés par B1 ; les autres sens des mêmes ENTRY restent hors du périmètre. L'audit de B1, seule, est autorisé ; B2 ne commence pas avant l'arbitrage de B1.

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 est le prochain numéro libre. **Lot 3 : 69 sens arbitrés sur 377 ; 308 restent** ; bloc A clos ; bloc B commencé par B1 seule ; bloc F suspendu au préalable E5, ni adopté ni appliqué. HP-1 à HP-4 et G1 à G7 non ouverts.

### 8.43 Volet 1, lot 3 : livraison B1 arbitrée, 12 conformes ; question de couverture d'A2-L3 consignée (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B1.md` (§0). **B1 : 12 conformes, 0 écart, 0 suspendu, aucune correction** ; les catégories, types, fonctions, tags et particules publiés des douze sens sont conservés ; les rapprochements mécaniques des traductions françaises et des familles sources ne démontrent aucun écart. **撮る** : `arts_creation › arts_visuels` au niveau 2 et `action` confirmés, « conforme » avec réserve documentaire. **コーヒー** : `lieu_konbini` et `lieu_restaurant` confirmés ; constat d'absence de motivation individuelle écrite conservé, sans écart. Réserves conservées sur l'attestation indirecte de 料理 (sens 1), 昼 (sens 2) et 薄い (sens 3) ; R4 maintenu comme constat. Ne sont rouverts ni les décisions historiques, ni les autres sens des ENTRY, ni les corrections de provenance déjà retenues.

**Question consignée séparément, distincte des vérifications HP-1 à HP-4 :**

| # | Objet | Origine | Sens concerné | Comparables | État |
|---|---|---|---|---|---|
| QC-1 | Couverture d'A2-L3 : la photographie ordinaire. A2-L3 ne nomme la photographie que comme « Photographie artistique » (« Arts visuels → Dessin ; Peinture ; Sculpture ; Photographie artistique ») ; ni « Médias » ni « Technologie » n'ont de sous-catégorie pour la photographie | B1, réserve sur 撮る | `v_171_s1` 撮る, « Prendre (une photo) », `arts_creation › arts_visuels`, `action` : conforme avec réserve | `v_168_s1` 写真 « Photo » et `v_167_s1` フィルム « Pellicule », au niveau 2 de `arts_visuels`, hors des 377 et des 147 | consignée, **à cadrer avant tout examen normatif distinct** ; A2-L3 non modifié ; B1 non élargie |

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste le prochain numéro disponible. **Lot 3 : 81 sens arbitrés sur 377 (bloc A : 69 ; B1 : 12) ; 296 restent**, dont 136 du bloc B et 17 du bloc F, suspendu au préalable E5. Le bloc A reste clos documentairement. Le périmètre opérationnel de B2 est préparé (`etape2-A2-05-volet1-lot3-B2-perimetre.md`), non arbitré ; aucun sens de B2 n'est examiné.

### 8.44 Volet 1, lot 3 : périmètre de B2 accepté ; QC-1 confirmée ; erratum du décompte R4 de B1 (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B2-perimetre.md` (§0). **Périmètre de B2 validé : 8 sens dans 8 ENTRY, sans ajout ni retrait** (引く sens 2, 教える sens 2, 本, 辞書, かける sens 1, 字 sens 2, 聞く sens 2, ポスト) ; cinq règles (C1-a, C1-f, C1-g, C1-h, C3-d), quatre sens nommés par les règles et 37 comparables conservés ; les rapprochements mécaniques ne constituent pas des preuves d'écart. Chevauchements conservés (B3 ; six autres sens des mêmes ENTRY ; cinq corrections de provenance). **字** : ひらがな et 漢字 consultés comme comparables, sans ouvrir HP-1 ni HP-2. **聞く** : la fonction `interrogatif` n'est pas attribuée automatiquement au verbe « demander » ; E5 reste non adopté, ses décisions ne sont pas anticipées. **QC-1** : désignation confirmée ; consignée, non examinée sur le fond, à cadrer avant un contrôle normatif distinct ; ni correction, ni candidat des 377, ni autorisation de modifier A2-L3. L'audit de B2, seule, est autorisé ; la livraison B2 est livrée en proposition (`etape2-A2-05-volet1-lot3-B2.md`) ; **rien n'en est inscrit ici avant son arbitrage**.

**Erratum, sans effet sur aucun verdict : le décompte R4 du rapport de B1.** Le module commun `lot3-commun.mjs` comptait comme décision de catégorie ou de type d'un sens une décision inscrite au champ d'un **autre** sens de la même ENTRY (par exemple D0521, « sens 3 · category », pour かける, sens 1). Le défaut a été trouvé et corrigé le 2026-10-16, pendant la préparation de B2, comme l'avait été le même défaut pour les décisions de fonction (A5). **Effet** : le rapport de B2 dit « 7 des 8 sens » (et non 6). **Le rapport de B1, arbitré, n'est pas régénéré** : il dit « 7 des 12 sens n'ont aucune décision de journal sur leur catégorie ni sur leur type », alors que le décompte exact est **10 des 12** (甘い, 薄い et 作る, comptés à tort, n'ont de décision que pour un autre sens) ; régénéré, il changerait aussi la ligne « Décisions de journal » de ces trois fiches. Les motivations des trois fiches disent déjà, chacune, le constat R4 ; **aucun verdict, aucune correction, aucun arbitrage n'en dépend**. Vérifié avec le module corrigé : les rapports d'A4 et d'A5 se régénèrent à l'identique. Ceux d'A6 et d'A7 n'ont été relancés qu'avec le module d'origine, où ils ne différaient que par l'affichage, déjà connu, des corrections V1-6 à V1-8 ; dans leurs fiches, les sens qui portent une décision d'un autre sens ont aussi une décision `senses` qui les motive, ce qui laisse leurs décomptes inchangés, **mais je ne l'ai pas vérifié en les relançant**. **Question au relecteur** : régénérer le rapport de B1 en inscrivant l'erratum à son §0, ou le laisser tel qu'il a été arbitré avec l'erratum consigné ici.

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste le prochain numéro disponible. **Lot 3 : 81 sens arbitrés sur 377 ; 296 restent** ; bloc A clos ; bloc B : 12 sens arbitrés sur 148 (B1) ; bloc F suspendu, E5 non adopté.

### 8.45 Volet 1, lot 3 : livraison B2 arbitrée ; erratum de B1 inscrit ; A6 et A7 recontrôlés (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B2.md` (§0). **B2 : 8 conformes, 0 écart, 0 suspendu ; aucune correction.** **字, sens 2** : `propriete` maintenu ; la réserve sur l'absence d'exemple est conservée. **聞く, sens 2** : `action` et `parole_conversation › question` maintenus ; aucune attribution automatique d'`interrogatif` ; E5 n'est pas adopté. **R4** : 7 des 8 sens sans décision de journal sur leur catégorie ni sur leur type ; constat, non écart. **Les cinq corrections de provenance** déjà retenues sur ces ENTRY (V2-91, V2-98 à V2-100, V2-104) ne sont pas rouvertes.

**Réponse à la question du §8.44 : le rapport de B1, arbitré, est conservé sans régénération de sa proposition** ; une mention d'erratum datée est inscrite à son §0 : ancien décompte 7 sur 12, décompte exact 10 sur 12 ; sens concernés 甘い, 薄い et 作る ; cause : une décision portant sur un autre sens de la même ENTRY avait été comptée ; conséquence : aucune modification des douze verdicts, aucune correction nouvelle.

**Contrôle d'A6 et d'A7 avec le module corrigé** (demandé par l'arbitrage) : les deux scripts ont été relancés séparément avec `lot3-commun.mjs` corrigé, puis leurs rapports comparés aux rapports arbitrés. **Seules différences : les lignes « Déjà arbitré … corrections retenues » qui affichent V1-6 (A6) et V1-7, V1-8 (A7)**, différence d'affichage déjà connue, due à l'inscription postérieure de ces corrections. **Aucun décompte R4, aucune ligne « Décisions de journal », aucun verdict ne change** : le défaut corrigé n'atteignait aucun sens d'A6 ni d'A7. Les deux rapports arbitrés ont été remis à l'identique (`cmp` : 0) ; aucune proposition arbitrée n'est régénérée.

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste le prochain numéro disponible. **Lot 3 : 89 sens arbitrés sur 377 ; 288 restent** ; bloc A clos ; **bloc B : 20 sens arbitrés sur 148 (B1, B2), 128 restent** ; bloc F suspendu, E5 non adopté. Le périmètre opérationnel de B3 est préparé (`etape2-A2-05-volet1-lot3-B3-perimetre.md`), non arbitré ; aucun sens de B3 n'est examiné.

### 8.46 Volet 1, lot 3 : périmètre de B3 accepté ; livraison B3 en proposition (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B3-perimetre.md` (§0). **Périmètre de B3 validé : 7 sens dans 7 ENTRY, sans ajout ni retrait** (意味, 出す sens 2, 書く, 消す sens 2, 読む, ページ, 質問) ; axes C1 et C3, règles C1-a, C1-g, C1-h et C3-d, 14 sens nommés par le criblage et 34 comparables conservés ; les rapprochements mécaniques ne sont pas des preuves d'écart. **Chevauchements et limites** : les six sens de B2 restent des comparables arbitrés, non rouverts ; 問題 (sens 2) est consulté comme comparable de B5, sans anticiper son verdict ; les autres sens de 出す et de 消す sont pris en compte sans être réexaminés ; V2-92 et V2-94 restent retenues, non appliquées, non rouvertes ; ひらがな et 漢字 sont consultés comme comparables, sans ouvrir HP-1 ni HP-2 ; `interrogatif` n'est pas attribué automatiquement à 質問, E5 demeurant non adopté ; QC-1, HP-3, HP-4 et G1 à G7 restent fermés. L'audit de B3, seule, est autorisé ; **la livraison B3 est livrée en proposition** (`etape2-A2-05-volet1-lot3-B3.md` : 7 conformes proposés, aucune correction) ; **rien n'en est inscrit ici avant son arbitrage**.

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste le prochain numéro disponible. **Lot 3 : 89 sens arbitrés sur 377 ; 288 restent** ; bloc A clos ; B1 et B2 arbitrées ; **bloc B : 20 sens arbitrés sur 148, 128 restent** ; bloc F suspendu, E5 non adopté.

### 8.47 Volet 1, lot 3 : livraison B3 arbitrée ; défaut de préfixe du module ; périmètre de B4 en proposition (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B3.md` (§0). **B3 : 7 conformes, 0 écart, 0 suspendu ; aucune correction nouvelle.** Champs publiés confirmés pour 意味, 出す (sens 2), 書く, 消す (sens 2), 読む, ページ et 質問. **消す, sens 2** : `communication_langage › ecriture` et `action` maintenus ; aucune symétrie avec le sens 1 ni avec 消える. **書く** : `action` maintenu, malgré les instruments d'écriture de la même catégorie. **質問** : `information_contenu`, la catégorie et `suru_compatible` confirmés ; `interrogatif` non attribué ; le verdict de 問題 (sens 2, B5) n'est pas anticipé. **ページ : « conforme », avec réserve documentaire** : `objet_artefact` et `communication_langage › lecture` conservés ; la page d'un site web, citée par la fiche sans exemple, reste signalée ; aucune correction, aucun sens nouveau ; D1010 n'est pas modifiée. **R4** : 5 des 7 sens, avec la précision sur D1224 pour 出す. V2-92, V2-94, les autres sens des ENTRY et les décisions historiques ne sont pas rouverts.

**Second défaut d'affichage du module commun : la recherche par préfixe.** En préparant le périmètre de B4, le décompte « corrections sur ces ENTRY » est apparu faux (37) : `lot3-commun.mjs` et les scripts de périmètre cherchaient l'identifiant d'une ENTRY par son début (« `` `v_4 `` »), si bien que `v_4` trouvait aussi `v_42`, `v_455`, etc. Corrigé le 2026-10-16 : l'identifiant doit être suivi d'un accent grave ou d'un « _ ». **Rapports déjà livrés** : un contrôle de toutes les ENTRY des livraisons A4 à B4 ne trouve qu'un rapport touché, **celui de B1, arbitré**, à la seule ligne « Déjà arbitré sur cette ENTRY » de **飲む** (`v_66`) : elle affiche, en plus de la ligne exacte (`v_66` : assumé, 3 · lot 02), les lignes de provenance de 家内 (`v_660`), 方 (`v_667`) et 文章 (`v_666`), et leurs corrections V2-50, V2-51 et V2-96, qui ne portent pas sur 飲む. **Valeur exacte : provenance « `v_66` : assumé (3 · lot 02) » ; aucune correction retenue sur l'ENTRY.** Le périmètre de B1 (§5) donnait la valeur exacte. La motivation et la réserve de 飲む ne citent aucune de ces corrections : **aucun verdict, aucune correction, aucun arbitrage n'en dépend.** Le rapport de B1 n'est ni régénéré ni modifié. Avec le module corrigé, A4, A5, B2 et B3 se régénèrent à l'identique, A6 et A7 ne diffèrent que par l'affichage connu de V1-6 à V1-8 et sont remis à l'identique ; B1 n'est pas relancé. Les périmètres de B2 et de B3 n'étaient pas touchés (aucune collision). **Question au relecteur** : inscrire un second erratum daté au §0 du rapport de B1, comme le premier, ou consigner le défaut ici seulement.

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste le prochain numéro disponible. **Lot 3 : 96 sens arbitrés sur 377 ; 281 restent** ; bloc A clos ; B1, B2 et B3 arbitrées ; **bloc B : 27 sens arbitrés sur 148, 121 restent** ; bloc F suspendu, E5 non adopté. Le périmètre opérationnel de B4 est préparé (`etape2-A2-05-volet1-lot3-B4-perimetre.md`), non arbitré ; aucun sens de B4 n'est examiné.

### 8.48 Volet 1, lot 3 : périmètre de B4 accepté ; second erratum de B1 ; livraison B4 en proposition (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B4-perimetre.md` (§0). **Périmètre de B4 validé : 9 sens dans 9 ENTRY, sans ajout ni retrait** (暗い, 明るい, 薄い sens 2, お巡りさん, 警官, 交番, 頼む sens 2, する sens 2, 高い sens 2) ; axes C1 et C3, règles C1-b, C1-f, C1-g, C1-h et C3-c, six sens nommés et quatorze comparables conservés ; ces résultats de criblage ne sont pas des preuves d'écart. **Points d'attention** : pour する (sens 2), vérifier `propriete` sans imposer `action` par principe ; pour お巡りさん et 警官, examiner séparément le type et la catégorie, sans déduire d'écart du contraste avec les noms généraux de personnes ; いくら, comparable seulement (fonction et type non examinés, E5 non adopté, bloc F suspendu) ; 安い (D1) non anticipé ; décisions de lecture et de relations, et quatre corrections de provenance, non rouvertes.

**Réponse à la question du §8.47 : un second erratum daté est inscrit au §0 du rapport arbitré de B1**, la proposition historique étant conservée intégralement : pour 飲む (`v_66`), provenance exacte « `v_66`, assumé » (tranche 3 · lot 02 du contrôle de provenance), aucune correction retenue sur l'ENTRY ; les lignes de `v_660`, `v_667` et `v_666`, et V2-50, V2-51 et V2-96, résultent d'une correspondance erronée par préfixe ; aucune conséquence sur le verdict de 飲む ni sur les douze verdicts de B1. **Précision** : l'arbitrage écrit « assumé (3 nuances, lot 02) » ; dans le bilan de provenance, « 3 · lot 02 » désigne la tranche 3 (lot 02), non un nombre de nuances ; l'erratum porte la valeur exacte. **Le module commun corrigé est conservé** (correspondance exacte des identifiants). **Une protection contre les collisions d'identifiants est recommandée pour une phase distincte de vérification des outils** ; les tests du dépôt ne sont pas modifiés.

L'examen de B4, seule, est autorisé ; **la livraison B4 est livrée en proposition** (`etape2-A2-05-volet1-lot3-B4.md` : 9 conformes proposés, aucune correction ; réserve proposée sur 暗い et 明るい, sens 1) ; **rien n'en est inscrit ici avant son arbitrage**.

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste le prochain numéro disponible. **Lot 3 : 96 sens arbitrés sur 377 ; 281 restent** ; bloc A clos ; B1, B2 et B3 arbitrées ; **bloc B : 27 sens arbitrés sur 148, 121 restent** ; bloc F suspendu, E5 non adopté.

### 8.49 Volet 1, lot 3 : livraison B4 arbitrée ; QC-2 consignée ; périmètre de B5 en proposition (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B4.md` (§0). **B4 : 9 conformes, 0 écart, 0 suspendu ; aucune correction supplémentaire.** **暗い et 明るい, sens 1** : conformité retenue **avec réserve** sur le rattachement de l'éclairage d'un lieu à `couleurs › teintes_nuances › clair_fonce`. **する, sens 2** : `propriete` confirmé, conformément à D1330 et à A2-ST ; `action` n'est pas imposé par la classe verbale. **お巡りさん et 警官** : `personne` et `police` confirmés séparément ; aucune fonction `politesse`. **薄い, sens 2** : l'absence d'exemple reste un constat documentaire. **Relations** : contraires nommés par les fiches, relations absentes : constat conservé ; aucun balayage ni ajout de relation n'est ouvert. **R4** : 8 sur 9, décompte corrigé, conservé. **Second erratum de B1** : inscription acceptée, avec la précision « assumé (tranche 3 · lot 02 du contrôle de provenance) » ; la proposition historique de B1 et ses verdicts restent intacts.

**Question consignée séparément, distincte de QC-1 et des vérifications HP-1 à HP-4 :**

| # | Objet | Origine | Sens concernés | Comparables | État |
|---|---|---|---|---|---|
| QC-2 (provisoire) | Couverture d'A2-L3 : l'éclairage d'un lieu. A2-L3 n'a aucune catégorie de la lumière ou de l'éclairage ; « Couleurs → Teintes & nuances → Clair / foncé » est la seule dont le libellé la couvre, par extension ; ni « Sens & perception → Vue » ni « Physique → Optique » ne la nomment | B4, réserve sur 暗い et 明るい (sens 1) | `v_4_s1` 暗い « Sombre » et `v_455_s1` 明るい « Lumineux », `couleurs › teintes_nuances › clair_fonce`, `propriete` : conformes avec réserve | les autres sens de `couleurs › teintes_nuances` (薄い, sens 2, B4) | consignée, **documentaire** : sans changement normatif, sans proposition de nouvelle catégorie à ce stade, audit non ouvert |

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste le prochain numéro disponible. **Lot 3 : 105 sens arbitrés sur 377 ; 272 restent** ; bloc A clos ; B1 à B4 arbitrées ; **bloc B : 36 sens arbitrés sur 148, 112 restent** ; bloc F suspendu, E5 non adopté. Le périmètre opérationnel de B5 est préparé (`etape2-A2-05-volet1-lot3-B5-perimetre.md`), non arbitré ; aucun sens de B5 n'est examiné.

### 8.50 Volet 1, lot 3 : périmètre de B5 accepté ; livraison B5 en proposition (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B5-perimetre.md` (§0). **Périmètre de B5 accepté, sans ajout ni retrait : 8 sens** (テスト, 問題 sens 2, 練習, 作文, 入口, 公園, 交差点, 建物) ; axes C1, C5 et C8, cinq règles, cinq comparables nommés et 23 sens des mêmes catégories retenus. **Points prioritaires** : le tag `lieu_gare` de 入口 ; la distinction entre 問題 (sens 2) et 質問 ; les décisions `suru_compatible` de 練習 et 作文 ; la justification des types et catégories publiés. L'audit de B5, seule, est autorisé ; **la livraison B5 est livrée en proposition** (`etape2-A2-05-volet1-lot3-B5.md` : 8 conformes proposés, aucune correction ; réserve proposée sur la catégorie de 練習) ; **rien n'en est inscrit ici avant son arbitrage**.

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste le prochain numéro disponible. **Lot 3 : 105 sens arbitrés sur 377 ; 272 restent** ; bloc A clos ; B1 à B4 arbitrées ; **bloc B : 36 sens arbitrés sur 148, 112 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées.

### 8.51 Volet 1, lot 3 : livraison B5 arbitrée ; périmètre de B6 en proposition (2026-10-16)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B5.md` (§0). **B5 : 8 conformes, 0 écart, 0 suspendu ; aucune correction nouvelle.** **練習** (`v_570_s1`) : **conforme avec réserve documentaire** ; `education_apprentissage › apprentissage › exercices`, `action` et `suru_compatible: true` maintenus ; le concept commun aux contextes du sport, de la musique et de la langue est l'exercice répété en vue de progresser ; ni « Sports → Entraînement » ni `category: null` ne sont retenus ; aucune nouvelle question de couverture n'est ouverte. **入口** (`v_214_s1`) : conforme ; `lieu_gare` confirmé, justifié par D0236 et conforté par l'exemple de la fiche ; les tags de 出口, de 廊下 et des autres comparables ne sont pas modifiés. **問題** (`v_511_s2`) : conforme ; la distinction avec 質問 est maintenue, B3 n'est pas rouverte. **練習 et 作文** : `suru_compatible` publié et ses justifications (D0423, D0426) confirmés. **Constats conservés** : テスト sans décision propre ; 入口 / 出口 sans relation ; R4 à 6 sur 8, avec sa précision méthodologique. Aucun nouveau chantier n'est ouvert.

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste la prochaine référence libre. **Lot 3 : 113 sens arbitrés sur 377 ; 264 restent** ; bloc A clos ; B1 à B5 arbitrées ; **bloc B : 44 sens arbitrés sur 148, 104 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées. Le périmètre opérationnel de B6 est préparé (`etape2-A2-05-volet1-lot3-B6-perimetre.md`), non arbitré ; aucun sens de B6 n'est examiné.

### 8.52 Volet 1, lot 3 : périmètre de B6 accepté ; livraison B6 en proposition, deux écarts proposés (2026-10-17)

Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B6-perimetre.md` (§0). **Périmètre de B6 accepté, sans ajout ni retrait : 9 sens** (歩く, 降りる, 出かける, 来る, 行く, 走る, 飛ぶ, 高い sens 1, 入る) ; axe C1, règles C1-g et C1-h, trois comparables nommés, 32 sens des mêmes catégories et risques documentés retenus. L'audit de B6, seule, est autorisé, avec des consignes particulières (niveaux 2 et 3 des catégories spatiales ; aucune catégorie nulle déduite de 座る, 立つ et 出る sens 2 ; B7, B8 et E2 non anticipées ; 高い sens 2 non rouvert).

**La livraison B6 est livrée en proposition** (`etape2-A2-05-volet1-lot3-B6.md`) : 7 conformes et **2 écarts proposés, E1** : 来る (`v_152_s1`) et 行く (`v_156_s1`) ne portent pas `deictique`, alors que leurs fiches (« un mouvement vers le locuteur » ; « un mouvement du locuteur vers un autre lieu ») et leurs nuances publiées les repèrent par rapport au locuteur, ce que A7 définit. **Corrections proposées V1-9 et V1-10** (`linguistic_functions.grammatical` : `[]` → `["deictique"]`), **non retenues, non inscrites dans la liste globale** avant l'arbitrage. Deux réserves sont portées à l'arbitrage : A7 n'a jamais été appliquée à un verbe ; la fiche de 行く est moins nette que celle de 来る. **Rien n'en est inscrit ici comme retenu avant l'arbitrage.**

**Liste globale unique, inchangée : 10 + 8 + 165 = 183 corrections, 164 ENTRY, toutes retenues et non appliquées** ; V1-9 reste la prochaine référence libre tant que l'arbitrage n'a pas retenu la proposition. **Lot 3 : 113 sens arbitrés sur 377 ; 264 restent** ; bloc A clos ; B1 à B5 arbitrées ; **bloc B : 44 sens arbitrés sur 148, 104 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées.

### 8.53 Volet 1, lot 3 : livraison B6 arbitrée, deux écarts confirmés ; périmètre de B7 en proposition (2026-10-17)

Arbitrage du 2026-10-17 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B6.md` (§0). **B6 : 7 conformes, 2 écarts E1, aucun suspendu.** **Sept conformes** : 歩く, 降りる, 出かける, 走る, 飛ぶ, 高い (sens 1) et 入る ; catégories, niveaux, types et autres champs publiés conservés. **Constats conservés** : 出かける sans décision de journal ; exemple principal de 高い relevant du sens 2 ; deux anciens exemples de 飛ぶ employant 飛ばす ; absence de relation 高い / 低い ; R4 à 9 sur 9. Aucun chantier complémentaire n'est ouvert.

**Écarts confirmés, corrections retenues, non appliquées** :

| # | SENSE | Mot | Lot | Code | Champ | Valeur publiée | Valeur retenue |
|---|---|---|---|---|---|---|---|
| V1-9 | `v_152_s1` | 来る « Venir » | 04 | E1 | `linguistic_functions.grammatical` | `[]` | `["deictique"]` ; catégorie, type, traduction, particules et nuance de l'ENTRY conservés |
| V1-10 | `v_156_s1` | 行く « Aller » | 04 | E1 | `linguistic_functions.grammatical` | `[]` | `["deictique"]` ; les autres champs du sens et de l'ENTRY conservés |

**Motivation de l'arbitrage** : les fiches sources et leurs nuances publiées établissent explicitement le repérage par rapport au locuteur ; l'addendum A7 s'applique aux SENSE sans restriction de classe grammaticale ; l'absence de précédent verbal n'est pas une exclusion normative. **A7 n'est pas modifié, aucun nouvel addendum n'est créé, et rien n'est généralisé automatiquement à d'autres verbes.** L'application passera par des décisions nouvelles citant A7 ; aucune décision historique n'est réécrite.

**Liste globale unique : 10 + 10 + 165 = 185 corrections, 165 ENTRY, toutes retenues et non appliquées** (recalcul par script après consolidation : 行く, `v_156`, est la seule ENTRY nouvelle ; 来る, `v_152`, portait déjà V2-25) ; **V1-11** est le prochain numéro disponible. **Lot 3 : 122 sens arbitrés sur 377 ; 255 restent** ; bloc A clos ; B1 à B6 arbitrées ; **bloc B : 53 sens arbitrés sur 148, 95 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées. Le périmètre opérationnel de B7 est préparé (`etape2-A2-05-volet1-lot3-B7-perimetre.md`), non arbitré ; aucun sens de B7 n'est examiné ; `deictique` n'est attribué par anticipation ni à 帰る ni à aucun autre comparable.

### 8.54 Volet 1, lot 3 : périmètre de B7 accepté ; livraison B7 en proposition, neuf conformes proposés (2026-10-17)

Arbitrage du 2026-10-17 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B7-perimetre.md` (§0). **Périmètre de B7 accepté, sans ajout ni retrait : 9 sens** (登る, 近い, 上げる sens 2, 並ぶ sens 2, 並べる, 入れる, 出す sens 1, 帰る, 止まる) ; axes C1, C3 et C10, quatre règles et comparables recensés retenus. L'audit de B7, seule, est autorisé, avec des vigilances particulières (帰る et A7, sans généralisation automatique de B6 ; 並ぶ et 並べる, la correction n°6 du volet 2 et les relations de 5.16, non rouvertes ; 近い, type et catégorie examinés à part ; 止まる, `evenement` selon A2-ST, sans catégorie nulle déduite des comparables ; どこ, comparable seulement).

**La livraison B7 est livrée en proposition** (`etape2-A2-05-volet1-lot3-B7.md`) : **9 conformes proposés, aucun écart, aucune correction proposée.** Deux lectures sont portées à l'arbitrage : 帰る ne porte pas `deictique`, sa fiche repérant le retour par le sujet du déplacement (« chez soi », « son point de départ » ; A7, §3, frontière 1), non par le locuteur ; l'axe « Ordonné ↔ Désordonné » d'A2-DIM n'est pas posé pour 並ぶ (sens 2) et 並べる, la doctrine du lot 16 (un axe décrivant directement le sens) n'étant pas remplie. **Rien n'en est inscrit ici comme retenu avant l'arbitrage.**

**Liste globale unique, inchangée : 10 + 10 + 165 = 185 corrections, 165 ENTRY, toutes retenues et non appliquées** ; V1-11 reste le prochain numéro disponible. **Lot 3 : 122 sens arbitrés sur 377 ; 255 restent** ; bloc A clos ; B1 à B6 arbitrées ; **bloc B : 53 sens arbitrés sur 148, 95 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées. B8 n'est pas ouverte.

### 8.55 Volet 1, lot 3 : livraison B7 arbitrée, neuf conformes ; périmètre de B8 en proposition (2026-10-17)

Arbitrage du 2026-10-17 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B7.md` (§0). **B7 : 9 conformes, aucun écart, aucune correction nouvelle, aucun suspendu.** **Deux lectures explicitement arbitrées** : **帰る (`v_550_s1`)**, conforme sans `deictique` : le repérage « chez soi » ou « son point de départ » dépend du sujet du déplacement et non directement de la situation d'énonciation ; la frontière 1 d'A7 justifie l'absence de cette fonction ; la distinction avec 来る et 行く, arbitrés en B6, est conservée, et rien n'est généralisé à 着く ni aux autres verbes ; **並ぶ (`v_528_s2`) et 並べる (`v_529_s1`)**, conformes sans dimension `ordonne_desordonne` : la mention « de manière ordonnée » décrit la disposition spatiale ou sa manière de réalisation, et ne suffit pas à établir que l'axe caractérise directement les sens modélisés ; doctrine du lot 16 ; A2-DIM n'est pas modifié. **Autres confirmations** : 近い, `propriete` et `proximite` (niveau 3) ; 止まる, `evenement` et `mouvement_deplacement` (niveau 2) ; la correction n°6 du volet 2 et la relation `transitive_of` préservées, sans réouverture ; 登る, 上げる (sens 2), 入れる et 出す (sens 1) conformes. Les constats sur les exemples, les décisions et les provenances sont conservés, sans correction supplémentaire.

**Liste globale unique, inchangée : 10 + 10 + 165 = 185 corrections, 165 ENTRY, toutes retenues et non appliquées** (recalcul par script avant et après cette inscription) ; **V1-11** reste le prochain numéro disponible. **Lot 3 : 131 sens arbitrés sur 377 ; 246 restent** ; bloc A clos ; B1 à B7 arbitrées ; **bloc B : 62 sens arbitrés sur 148, 86 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées. Le périmètre opérationnel de B8 est préparé (`etape2-A2-05-volet1-lot3-B8-perimetre.md`), non arbitré ; aucun sens de B8 n'est examiné ; aucune décision lexicale n'est prise.

### 8.56 Volet 1, lot 3 : périmètre de B8 accepté ; livraison B8 en proposition, sept conformes proposés (2026-10-18)

Arbitrage du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B8-perimetre.md` (§0). **Périmètre de B8 accepté, sans ajout ni retrait : 7 sens** (渡す sens 2, 渡る, 着く, 置く, 縦, 出る sens 1, 後 sens 2) ; regroupement en quatre ensembles, axes C1 et C10, quatre règles et comparables recensés retenus. L'audit de B8, seule, est autorisé, avec des vigilances particulières (着く et A7, sans généralisation de B6 et B7 ; 後 sens 2, référent spatial distinct du sens temporel, sans transfert automatique de `deictique` ; 渡す / 渡る, D1582 et D1583 lues, `transitive_of` non rouverte ; 縦, `hauteur` vérifiée sur le référent ; 置く, correction n°6 non rouverte ; 出る sens 1, séparé de V1-2 et V1-3 ; どこ, comparable seulement).

**La livraison B8 est livrée en proposition** (`etape2-A2-05-volet1-lot3-B8.md`) : **7 conformes proposés, aucun écart, aucune correction proposée.** Trois lectures sont portées à l'arbitrage : 着く ne porte pas `deictique`, sa fiche repérant l'arrivée par la destination, nommée dans la phrase, non par le locuteur ; 後 (sens 2) ne porte pas `deictique`, son référent étant spatial et sans repère d'énonciation, la fonction du sens 1 (D0952) ne valant que pour l'axe du temps ; 縦 est en `hauteur`, la fiche documentant la dimension verticale, l'orientation et le « sens de la longueur » restant des traductions contextuelles (D0607). Un défaut d'affichage du module commun est signalé, sans modification du module : 後 (sens 2) est écarté à tort du décompte R4 par D1425, qui ne cite que le sens 3 de 後 ; le décompte exact est de 6 sur 7. **Rien n'en est inscrit ici comme retenu avant l'arbitrage.**

**Liste globale unique, inchangée : 10 + 10 + 165 = 185 corrections, 165 ENTRY, toutes retenues et non appliquées** ; V1-11 reste le prochain numéro disponible. **Lot 3 : 131 sens arbitrés sur 377 ; 246 restent** ; bloc A clos ; B1 à B7 arbitrées ; **bloc B : 62 sens arbitrés sur 148, 86 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées. B9 n'est pas ouverte.

### 8.57 Volet 1, lot 3 : livraison B8 arbitrée, sept conformes ; fin d'`espace_proprietes_spatiales` dans le bloc B ; périmètre de B9 en proposition (2026-10-18)

Arbitrage du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B8.md` (§0). **B8 : 7 conformes, aucun écart, aucune correction supplémentaire, aucun suspendu.** **Trois lectures explicitement arbitrées** : **着く (`v_565_s1`)**, conforme sans `deictique` : la fiche décrit l'arrivée à une destination indiquée dans la phrase, non un repérage directement dépendant du locuteur ; application d'A7, sans généralisation depuis B6 ou B7 ; **後 (`v_663_s2`)**, conforme sans `deictique` : le référent spatial « Derrière » ne reçoit pas automatiquement la fonction attribuée au sens 1 par D0952, et aucun emploi déictique constitutif du sens 2 n'est documenté par la fiche ; **縦 (`v_597_s1`)**, conforme avec la catégorie `espace_proprietes_spatiales › dimensions › hauteur` : la fiche et ses exemples décrivent la dimension verticale mesurée ou comparée ; D0607 maintient un seul concept ; aucun sens autonome d'orientation n'est créé. **Autres confirmations** : 渡す (sens 2) et 渡る, relation `transitive_of` inchangée ; 置く, correction n°6 du volet 2 non rouverte ; 出る (sens 1), V1-2 et V1-3 restant limitées aux sens 2 et 3. Les constats documentaires sur les exemples, nuances, traductions et relations sont conservés, sans correction nouvelle ; toutes les décisions et corrections antérieures sont conservées.

**R4 : la valeur arbitrée est de 6 sens sur 7** sans décision écrite spécifique sur la catégorie ou le type. **Le module commun affiche 5 sur 7 à tort** : sa recherche par mot associe 後 (sens 2) à D1425, qui ne cite que le sens 3. 5 sur 7 est un **défaut d'affichage connu** ; le module partagé n'est pas modifié et les rapports historiques ne sont pas régénérés.

**L'examen du domaine `espace_proprietes_spatiales` dans le bloc B est terminé** (B6, B7 et B8 : 25 sens, 23 conformes et 2 écarts E1) ; ni le bloc B ni A2-05 ne sont terminés.

**Liste globale unique, inchangée : 10 + 10 + 165 = 185 corrections, 165 ENTRY, toutes retenues et non appliquées** (recalcul par script avant et après cette inscription) ; **V1-11** reste le prochain numéro disponible. **Lot 3 : 138 sens arbitrés sur 377 ; 239 restent** ; bloc A clos ; B1 à B8 arbitrées ; **bloc B : 69 sens arbitrés sur 148, 79 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées. Le périmètre opérationnel de B9 est préparé (`etape2-A2-05-volet1-lot3-B9-perimetre.md`), non arbitré ; aucun sens de B9 n'est examiné ; aucune décision n'est prise sur ses sens.

### 8.58 Volet 1, lot 3 : périmètre de B9 accepté ; livraison B9 en proposition, dix conformes proposés (2026-10-18)

Arbitrage du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B9-perimetre.md` (§0). **Périmètre de B9 accepté, sans ajout ni retrait : 10 sens dans 9 ENTRY** (温かい, 疲れる, 面白い, おじいさん sens 2, おばあさん sens 2, 大人, 子供 sens 1, 男の子, 寝る sens 1 et sens 2) ; trois groupes, axe C1, règles C1-a, C1-b, C1-f et C1-h, comparables recensés retenus. L'audit de B9, seule, est autorisé, avec des vigilances particulières (sens d'âge et de parenté ; deux sens de 寝る, D1243 non rouverte ; fusion 温かい / 暖かい ; `processus` de 疲れる selon D1250 ; lecture de 大人, D0830, non rouverte ; V2-38 de 子供 maintenue).

**La livraison B9 est livrée en proposition** (`etape2-A2-05-volet1-lot3-B9.md`) : **10 conformes proposés, aucun écart, aucune correction proposée.** Deux lectures sont portées à l'arbitrage : おじいさん et おばあさん (sens 2) ne portent pas `politesse`, la fiche ne disant qu'un registre poli et un emploi d'adresse, qu'A9 exclut (frontières 1 et 2) ; 疲れる est en `processus` selon D1250, bien que la fiche dise « l'état de fatigue », l'état étant celui de la forme 疲れている, en nuance. **Rien n'en est inscrit ici comme retenu avant l'arbitrage.**

**Méthode** : l'arbitrage du périmètre annonce, après l'arbitrage de B9, une étude d'une organisation à 25 à 30 sens par livraison ; d'ici là, la procédure n'est pas modifiée et B10 n'est pas préparée.

**Liste globale unique, inchangée : 10 + 10 + 165 = 185 corrections, 165 ENTRY, toutes retenues et non appliquées** ; V1-11 reste le prochain numéro disponible. **Lot 3 : 138 sens arbitrés sur 377 ; 239 restent** ; bloc A clos ; B1 à B8 arbitrées ; **bloc B : 69 sens arbitrés sur 148, 79 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées.

### 8.59 Volet 1, lot 3 : livraison B9 arbitrée, dix conformes ; étude d'évolution de la méthode en proposition (2026-10-18)

Arbitrage du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur) ; détail dans `etape2-A2-05-volet1-lot3-B9.md` (§0). **B9 : 10 conformes, aucun écart, aucune correction nouvelle, aucun suspendu.** **Deux lectures confirmées** : **おじいさん et おばあさん, sens 2**, conformes sans `politesse` : A9 distingue le registre poli et l'emploi d'adresse d'un mot lexical de la fonction pragmatique accomplie par une formule ; le registre est conservé en nuance ; **疲れる**, conforme avec `semantic_type: processus` : le sens principal « Se fatiguer » exprime une évolution, l'état « Être fatigué », exprimé par 疲れている, reste dans la nuance, conformément à D1250. Les deux sens de 寝る selon D1243, la fusion 温かい / 暖かい, les distinctions entre âge et parenté et toutes les autres décisions antérieures sont conservés ; les constats documentaires aussi, avec R4 à 6 sur 10. Aucun chantier complémentaire n'est ouvert.

**Étude d'évolution de la méthode** (`etape2-A2-05-etude-methode.md`), demandée par le même arbitrage, **livrée en proposition, non arbitrée**, avec un inventaire documentaire des sens restants (`etape2-A2-05-volet1-lot3-inventaire-restants.md`, écrit en lecture seule par un nouveau script) : recommandation de tranches de 20 à 25 sens (35 pour le bloc C), regroupant les livraisons du découpage arbitré sans déplacer aucun sens, un cycle par tranche, après une étape d'outillage relue (module commun en version 2, vérifications, registre de couverture, synchronisation stable, relais allégé) ; constat technique : les ENTRY hors JLPT `v_718` (B12) et `v_719` (C4) arrêteraient le module commun en l'état. **Aucun script existant, aucune règle ni aucun découpage opérationnel n'est modifié ; aucun périmètre de B10 n'est préparé ; aucun audit lexical n'est fait.**

**Liste globale unique, inchangée : 10 + 10 + 165 = 185 corrections, 165 ENTRY, toutes retenues et non appliquées** (recalcul par script avant et après cette inscription) ; **V1-11** reste le prochain numéro disponible. **Lot 3 : 148 sens arbitrés sur 377 ; 229 restent** ; bloc A clos ; B1 à B9 arbitrées ; **bloc B : 79 sens arbitrés sur 148, 69 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées.

### 8.60 Volet 1, lot 3 : étude de méthode arbitrée ; outillage v2 et plan de checkpoint en proposition (2026-10-18)

Arbitrage du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur) sur `etape2-A2-05-etude-methode.md` : **neuf tranches T1 à T9 retenues en principe** (212 sens hors F), sans déplacer aucun sens du découpage arbitré le 2026-10-12 ; **T1 (B10 à B12, 24 sens), pilote** ; **T4 (35 sens) conditionnée** au bilan du pilote, divisible en deux ; **bloc F suspendu** à E5. **Gouvernance** : périmètres générés et contrôlés automatiquement, mais **acceptation explicite du périmètre avant tout audit** ; la préapprobation des périmètres suivants sera étudiée après le pilote. **Relecture intégrale maintenue** : chaque fiche lue en entier, chaque champ justifié ; le tri simple ou complexe n'est qu'une aide ; aucun sondage ne remplace cette obligation.

**Proposition d'outillage v2** (`etape2-A2-05-outillage-proposition.md`), préparée en proposition, non adoptée : module `lot3-commun-v2.mjs` (v1 gelé), générateur de périmètres `perimetre-v2.mjs`, registre de couverture des 377, manifeste d'empreintes de 27 rapports arbitrés, contrôles des motivations, dédoublonnage par ENTRY, résolution canonique des identifiants hors JLPT (`v_718` → `hj_v_1`, `v_719` → `hj_v_2`), synchronisation stable et relais allégé en aperçu. **Essais** (`etape2-A2-05-outillage-essais.md`) : tous conformes ; non-régression B6 à B9 sans différence ; R4 à 9, 7, 6 et 6, valeurs arbitrées ; huit sabotages refusés ; aucun rapport arbitré modifié. **Plan de checkpoint** (`etape2-A2-05-plan-checkpoint.md`) : options A et B, listes exactes, exclusions, contrôles ; **rien n'est indexé, committé ni poussé.**

**Liste globale unique, inchangée : 185 corrections, 165 ENTRY, toutes non appliquées** ; V1-11 libre. **Lot 3 : 148 sens arbitrés sur 377 ; 229 restent** ; **bloc B : 79 sur 148, 69 restent** ; bloc F suspendu, E5 non adopté ; QC-1 et QC-2 consignées, non cadrées. Ni périmètre de T1 ni audit lexical.

### 8.61 Outillage v2 retenu en principe ; checkpoint B préparé (2026-10-18)

Arbitrage du 2026-10-18 : outillage v2 retenu en principe, sous réserve d'un contrôle final avant sa première utilisation sur T1 ; contrôles des motivations : **bloquant** (sens omis, dupliqué ou inconnu ; champ absent ; règle non citée ; citation introuvable), **avertissement** (attribution ambiguë ou citation trouvée ailleurs), **relecture humaine obligatoire** (pertinence, justification, lecture intégrale). Séparation imposée dans `lot3-commun-v2.mjs` (bloquant par défaut) et vérifiée par les essais. Synchronisation stable et relais allégé retenus en principe, à mettre en service après le checkpoint. **Option B du checkpoint retenue (173 chemins)**, non exécutée ; contrôle préalable entièrement conforme (`etape2-A2-05-checkpoint-B-controle.md`) ; plan de transition (`etape2-A2-05-plan-transition.md`). Décomptes inchangés : 148/377 ; bloc B 79/148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.

### 8.62 Checkpoint B : exception documentaire sur les blancs (2026-10-18)

Arbitrage du 2026-10-18 (option a) : les 177 chemins indexés sont conservés sans correction des anomalies de blancs relevées par `git diff --cached --check`. **Exception strictement limitée aux 32 signalements ci-dessous, dans 23 fichiers** (16 rapports arbitrés, intacts avec leurs empreintes ; 2 fichiers de différences unifiées, lignes de contexte non modifiées ; 5 fichiers générés pour ce checkpoint, non corrigés). Le code non nul de `git diff --cached --check` (2) est une **exception acceptée, non une conformité** ; toute anomalie supplémentaire la rend caduque.

- `a2-05-travail/controle-pilotage.md` (lignes de contexte vides de différences unifiées) : l. 63, espace finale ; l. 116, espace finale ; l. 134, espace finale ; l. 136, espace finale ; l. 185, espace finale ; l. 190, espace finale ; l. 196, espace finale ; l. 253, espace finale.
- `a2-05-travail/proposition-CLAUDE-md-section5.diff` (lignes de contexte vides de différences unifiées) : l. 6, espace finale ; l. 9, espace finale.
- `a2-05-travail/sync-pilotage-v2-apercu.md` (fichier généré pour ce checkpoint) : l. 39, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-checkpoint-B-controle.md` (fichier généré pour ce checkpoint) : l. 39, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-outillage-essais.md` (fichier généré pour ce checkpoint) : l. 84, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-plan-checkpoint.md` (fichier généré pour ce checkpoint) : l. 441, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-A1.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 283, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-A2.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 246, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-A3.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 244, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-A4.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 230, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-A5.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 268, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-A6.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 290, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-A7.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 300, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B1.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 267, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B2.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 214, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B3.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 202, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B4.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 240, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B5.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 85, espace finale ; l. 225, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B6.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 239, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B7.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 245, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B8.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 214, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-B9.md` (rapport arbitré, protégé par le manifeste d'empreintes) : l. 245, ligne vide en fin de fichier.
- `docs/rapports/etape2-A2-05-volet1-lot3-inventaire-restants.md` (fichier généré pour ce checkpoint) : l. 413, ligne vide en fin de fichier.

### 8.63 Checkpoint B poussé ; synchronisation stable en proposition (2026-10-18)

Checkpoint B committé et poussé le 2026-10-18 (`78031638c0f81dca1b167e3f57f5a891767fc4cb`, 177 chemins), sur des autorisations distinctes ; il devient la référence documentaire de la transition. Étape 2 du plan de transition autorisée en préparation : `a2-05-travail/sync-stable.mjs` (marqueurs uniques à empreinte, refus des marqueurs absents, dupliqués, mal ordonnés ou retouchés, contrôle de cohérence avec les rubriques rédigées, aperçu avant toute écriture, application liée à l'empreinte de l'aperçu, marquage des seules lignes « non committé » contenues dans un commit poussé) ; essais : `docs/rapports/etape2-A2-05-sync-stable-essais.md` ; proposition : `docs/rapports/etape2-A2-05-sync-stable-proposition.md`. **Non activée** ; relais actuel conservé. Décomptes inchangés : 148/377 ; bloc B 79/148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.

### 8.64 Synchronisation stable appliquée (2026-10-18)

Arbitrage du 2026-10-18 : proposition de synchronisation stable acceptée (emplacement du bloc avant « Terminé et arbitré » ; marquage `7803163` des seules 29 lignes du checkpoint B) ; application du plan `89fa2e8a0a2c245b` autorisée et faite, après contrôle de l'empreinte et de l'aperçu, identique à celui livré. Contrôles après application tous conformes. `CLAUDE.md` non modifié : correction de sa référence Git proposée à part (`a2-05-travail/proposition-CLAUDE-md-reference-git.md`). Relais allégé non mis en service. Décomptes inchangés : 148/377 ; bloc B 79/148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.

### 8.65 Étape 2 de la transition clôturée ; relais allégé en proposition (2026-10-20)

Arbitrage du 2026-10-20 (ChatGPT, par délégation ; relayé par l'utilisateur) : l'étape 2 du plan de transition (synchronisation stable par marqueurs) est acceptée et **clôturée documentairement** ; le plan `89fa2e8a0a2c245b`, déjà appliqué, n'est ni réappliqué ni régénéré. **Étape 3 autorisée en préparation seulement** : relais candidat `a2-05-travail/reprise-A2-05-allegee-candidat.md` (8 441 octets ; renvoie au bloc `a2-05:etat` pour les décomptes, ne fait pas foi) ; rapport comparatif, contrôles, essai de reprise simulée et décisions D1 à D6 : `docs/rapports/etape2-A2-05-relais-allege-proposition.md` ; contrôles : `a2-05-travail/controle-relais-allege.mjs`, lecture seule. Diff ciblé de `CLAUDE.md` (`558f150` → `7803163`) proposé, non appliqué : `a2-05-travail/proposition-CLAUDE-md-reference-git.diff`. **Relais en service inchangé** ; ni T1 ni audit lexical ; aucun `git add`, commit ni push. Décomptes inchangés : 148/377 ; bloc B 79/148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.

### 8.66 Arbitrage du relais allégé ; doctrines du volet 2 consolidées (2026-10-20)

Arbitrage du 2026-10-20 (ChatGPT, par délégation ; relayé par l'utilisateur) sur la proposition de relais allégé (`etape2-A2-05-relais-allege-proposition.md`) : **D1**, option A (remplacement du contenu du relais, exception à `CLAUDE.md` §3 accordée pour cette seule opération, sur ce seul fichier, sans précédent) ; **D2**, candidat accepté avec deux précisions (quatre états à ne pas confondre ; « Prochaine action » réduite au renvoi à `ETAT-ACTUEL.md`) ; **D3**, taille acceptée ; **D4**, la présente sous-section ; **D5**, correction future de `tools/export-relecture.mjs` retenue en principe, non faite ; **D6**, gel de `docs/relecture/note-relais.md` par un renvoi. Correction de la référence Git de `CLAUDE.md` acceptée (`558f150` → `7803163`).

**Doctrines du volet 2, consolidées (D4).** Cette liste reprend mot pour mot le §6 du relais de reprise tel qu'il est au commit `78031638` (« Arbitrages de fond à ne pas perdre »), qui était le seul endroit où elles étaient réunies. **Elle ne crée aucune règle** : chaque formulation renvoie à sa provenance, qui fait foi ; un précédent cité reste un précédent, et ne devient pas une norme générale.

1. « **Les normes actuelles jugent** : snapshots de `docs/conception/a2/`, addenda validés, registres. Les documents de `docs/conception/legacy/a2/` éclairent, sans fonder aucun verdict. » — Provenance : périmètre du volet 2 (`etape2-A2-05-perimetre.md`, §5) ; périmètre de la cohérence rétroactive (`etape2-A2-05-perimetre-coherence.md`, §5) ; `docs/conception/a2/README.md` (documents de `legacy/a2/` « pas normatifs »).
2. « **Hors hiérarchie par décision de l'architecture** (A2-L3 §6, A2-GLOBAL §4.4) : objet, personne, lieu et action génériques, propriété générale, identité / différence, possibilité / nécessité, validité / adéquation, inclusion / appartenance, transitif / intransitif. Pour eux, `category: null` est la réponse de l'architecture, non une lacune. » — Provenance : A2-L3 §6 et A2-GLOBAL §4.4, qui font foi ; application : audit des `null`, tranche 2 (`etape2-A2-05-audit-null.md`, §T2.3), arbitrée le 2026-10-08.
3. « **« État général » et « événement général » ne sont pas dans cette liste.** Un `null` justifié par ces formules se vérifie par un élément de la liste que la raison ne nommait pas, ou par l'absence de toute catégorie décrivant le sens, après relecture de l'arbre d'A2-L3. » — Provenance : audit des `null`, §T2.3 (treize cas, conclusions maintenues, formulation jugée imprécise, sans écart), arbitrée le 2026-10-08.
4. « **« Personne générique » ne s'étend pas automatiquement à un ensemble complet de personnes** : A2-L3 nomme « Totalité & partie › Totalité ». Le type `groupe_collectif` dit la nature du référent, la catégorie la totalité. » — Provenance : audit des `null`, §T2.3 et fiches de 皆 et 皆さん (C, arbitrés le 2026-10-08 ; précédent cité : 大勢, lot 24) ; corrections n° 4 et 5 du §2 de ce bilan.
5. « **Un `null` de type** : une partie du corps, le corps entier, une unité de mesure, un compteur, un son, l'électricité sont confirmés L. Un nom de position est un `lieu` (表, comme 上 et 横). Une capacité attribuée à une personne est une `propriete` (頭 sens 2, comme 力). » — Provenance : audit des `null`, tranche 1 (`type-nul`), arbitrée le 2026-10-08 : §3.1 (corps et parties ; 体 et 身体, L avec réserve), §3.2 (unités ; 匹, compteur), §5 C (声, 電気 : L ; 表 : C, comparables 上 et 横 ; 頭 sens 2 : C, comparable 力, D1361) ; corrections n° 2 et 3 du §2 de ce bilan.
6. « **Un C final a été corrigé** ; si l'arbitrage rejette la correction, le cas est reclassé avant la sortie. **N n'est jamais un état final.** » — Provenance : périmètre du volet 2 (`etape2-A2-05-perimetre.md`, §6, critères de classement, et §6.4, statut provisoire N).
7. « **La correction d'un SENSE n'en renumérote aucun.** » — Provenance : §2 de ce bilan (« aucun identifiant de SENSE n'est renuméroté »).

Aucune donnée, norme, aucun registre, snapshot, outil ni test modifié ; aucune correction appliquée. Décomptes inchangés : 148/377 ; bloc B 79/148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.
