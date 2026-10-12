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

**Total à jour : 124 corrections, 112 ENTRY, aucune appliquée (§8.17, clôture de la tranche 5 ; V2-84 d'origine `hors_jlpt`).** Après 5b (§8.16) : 121 corrections, 109 ENTRY. Après 5a (§8.15) : 117 corrections, 105 ENTRY. Après la clôture de la tranche 4 (§8.14) : 111 corrections, 101 ENTRY. Après le lot 05 (§8.13) : 99 corrections, 90 ENTRY. Après la clôture de la tranche 3 (§8.12) : 92 corrections, 84 ENTRY. Après le lot 02 (§8.11) : 86 corrections, 78 ENTRY. Après la clôture de la tranche 2 (§8.10) : 71 corrections, 64 ENTRY. Mise à jour du 2026-10-10, après l'arbitrage du bloc 1 bis : 45 corrections, dans 40 ENTRY ; V2-26 à V2-30 s'ajoutent à la troisième liste (§8.8) ; lots inchangés. Le texte ci-dessous est celui de l'inscription précédente.

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
