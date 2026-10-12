# Étape 2 · A2-05 · Volet 2 · Audit des `null`

Ce rapport est le rapport unique du volet 2. Il est livré par tranches : tranche 1, les 27 `type-nul` (arbitrée) ; tranche 2, les `categorie-nulle`, eux-mêmes livrés en plusieurs tranches de relecture.

# Tranche 1 · les 27 `type-nul`

**Date** : 2026-10-08
**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation) : les 27 verdicts sont confirmés, L = 24, F = 1, C = 2, N = 0 ; 体, 身体 et 声 sont confirmés L, non N ; les trois corrections sont retenues et rejoignent la future liste fermée des corrections du volet 2 ; **aucune n'est faite**. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire d'avertissements n'est modifié.
**Périmètre appliqué** : `docs/rapports/etape2-A2-05-perimetre.md`, validé le 2026-10-07 (§5, méthode ; §6, critères ; ordre de revue : les 27 `type-nul` d'abord).
**Suite** : les 120 `categorie-nulle`, en tranche 2 ci-dessous.
**État du dépôt** : `ocha-v2` et `origin/ocha-v2` à `5a8687b063fd2fca7c343d544aff040709bc5ec8`.

---

## 1. Résultat de la tranche

| Classement | Cas | Sens |
|---|---|---|
| **L** | 24 | `v_44_s1` お腹 ; `v_46_s1` 体 ; `v_48_s1` 口 ; `v_51_s1` 手 ; `v_54_s1` 歯 ; `v_57_s1` 目 ; `v_58_s1` 耳 ; `v_60_s1` 足 ; `v_61_s1` 身体 ; `v_65_s1` 頭 ; `v_67_s1` 鼻 ; `v_321_s2` 時間 ; `v_363_s1` キロ ; `v_363_s2` キロ ; `v_364_s1` キログラム ; `v_366_s1` メートル ; `v_521_s1` たぶん ; `v_603_s1` 髪 ; `v_611_s1` グラム ; `v_648_s1` 匹 ; `v_653_s1` 声 ; `v_690_s2` 背 ; `v_713_s1` 電気 ; `v_716_s1` 顔 |
| **F** | 1 | `v_500_s2` また |
| **C** | 2 | `v_65_s2` 頭 ; `v_696_s1` 表 |
| **N** | 0 | — |
| **Total** | 27 | L + F + C + N = 27 |

- **L** : `null` légitime. **F** : fonction linguistique ou information manquante. **C** : type à corriger. **N** : point non documenté, statut provisoire.
- **Trois corrections sont proposées**, une F et deux C (§4). Elles ne sont pas faites.
- **Aucun N** : dans les 27 cas, les snapshots et les addenda ont permis de décider.
- **6 verdicts portent une réserve explicite**, à examiner en priorité à la relecture : `v_46_s1` 体 ; `v_61_s1` 身体 ; `v_65_s2` 頭 ; `v_500_s2` また ; `v_653_s1` 声 ; `v_696_s1` 表.

## 2. Méthode suivie

Pour chacun des 27 cas, individuellement et dans cet ordre :

1. lecture de la fiche source entière, exemple compris ;
2. lecture du SENSE publié, des autres sens de l'ENTRY et de sa nuance ;
3. lecture de la décision `type-nul` et des autres décisions de l'entrée ;
4. confrontation aux seize définitions de frontière d'A2-ST-v1 (§3), à ce qui n'est pas un type sémantique (§4), à A6, et, selon le cas, à A9, A2-LING, A2-DIM et A2-GLOBAL (§13, §15) ;
5. comparaison aux sens publiés comparables : même catégorie, même famille source, même raison invoquée ;
6. classement.

La présentation est regroupée par familles pour que les comparaisons se voient. **Chaque verdict a été rendu sur la lecture du cas lui-même** : la motivation de chaque fiche cite ce que dit sa propre fiche source et son propre exemple.

**Ce que l'audit ne fait pas.** Il ne juge que le `semantic_type: null`. La catégorie de ces sens, leurs autres couches et les sens voisins relèvent du volet 1 ; quand la lecture en a croisé un, il est signalé sans être tranché.

## 3. Ce que la lecture par famille fait apparaître

### 3.1 Le corps et ses parties (14 cas)

A6 a été écrit à partir d'une partie du corps (お腹) : la légitimité du `null` pour une partie du corps est posée par l'addendum lui-même, non par une lecture des lots. La vérification a porté sur deux points.

- **Chaque sens est-il bien une partie du corps ?** Douze le sont, d'après leur fiche et leur exemple. Deux ne le sont pas : 体 et 身体 désignent le corps entier. Pour eux, A6 ne dit rien ; le verdict L repose sur la lecture des définitions, et porte une réserve.
- **Un type terminal a-t-il été oublié ?** Les décisions du lot 01 n'écartent expressément que `organisme_vivant`. La définition d'`objet_artefact` (« objet matériel individualisable ») a été relue pour chaque cas : une partie du corps n'est pas individualisable comme un objet, et aucun sens rangé dans l’être humain ou le monde naturel ne porte ce type.

Un point dépasse l'audit : onze décisions du lot 01 écrivent qu'`organisme_vivant` « désigne un être vivant non humain », ce qui est la définition du snapshot ; D0070 (lot 0) écrit « l'être vivant ». La différence est de rédaction et ne change aucun verdict.

### 3.2 Unités de mesure et de comptage (7 cas)

A6 a aussi été écrit à partir de キロ, dans ses deux sens. Pour les autres unités, chaque fiche a été relue : chacune nomme une unité (« l'unité de mesure de masse », « de longueur », « pour les heures »), et dans chaque exemple c'est le nombre qui porte la quantité.

Le corpus applique partout la même frontière : une **quantité déterminée** est une `quantite_valeur` (les nombres, 半, 半分, 一人, 二人), une **unité** est sans type. D0906 (lot 13) l'écrit en toutes lettres pour 半. Aucun traitement divergent n'a été trouvé.

匹 est à part : c'est un compteur, non une unité de mesure. Son `null` est légitime, mais son fondement le plus direct est A2-LING, non l'exclusion de la mesure que sa décision invoque.

### 3.3 Cas singuliers (6 cas)

C'est ici que se trouvent les trois corrections proposées et les verdicts les moins assurés. Chaque cas est seul de son espèce : aucune lecture de famille ne peut le porter.

## 4. Corrections proposées

Aucune n'est faite. Chacune demande un arbitrage, puis la procédure du périmètre (§7) : liste fermée, lot 27 comme véhicule, réouverture de l'ENTRY dans son lot d'origine, décisions nouvelles à la fin du journal, validation atomique, publication.

| Sens | Classement | Correction proposée | Effet sur les avertissements |
|---|---|---|---|
| `v_65_s2` 頭 « Esprit » | C | `semantic_type` : `null` → `propriete`. | `type-nul` cesserait |
| `v_500_s2` また « Aussi » | F | `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]` ; `semantic_type` reste `null`. | `type-nul` et `categorie-nulle` de ce sens cesseraient |
| `v_696_s1` 表 « Face » | C | `semantic_type` : `null` → `lieu`. | `type-nul` cesserait |

**Conséquence pour l'inventaire** : si les trois corrections étaient retenues et validées, quatre lignes de `avertissements-connus.json` disparaîtraient (trois `type-nul`, un `categorie-nulle`). L'inventaire devrait alors être resynchronisé par une commande déterministe, jamais à la main (périmètre, §7).

## 5. Les 27 fiches d'audit

### A · Le corps et ses parties

#### `v_44_s1` · お腹 (おなか) · « Ventre » — **L**

- **Fiche source** (`n5_v_44`, nom) : traductions « Ventre ; Estomac ; Abdomen ». Nuance : « Nom désignant le ventre ou l'estomac, très fréquemment écrit en hiragana (ou parfois en kanji 腹, hara). Il est souvent utilisé dans des expressions figées comme avoir faim (おなかがすいた, onakagasuita) ou avoir mal au ventre (おなかが痛い, onakaga itai). » Exemple : « 朝 ごはん を 食べて 、おなか が いっぱい に なりました 。 » — « En ayant mangé le petit-déjeuner, mon ventre est devenu plein (j'ai le ventre plein). »
- **État publié** : sens 1 sur 1 ; traduction « Ventre » (Estomac, Abdomen) ; catégorie `etre_humain › corps › tronc` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0070 (lot 00) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne l'être vivant, et la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « le ventre ou l'estomac » et son exemple un ventre plein : une partie du corps, et rien d'autre. C'est le cas même qu'A6 cite. Aucune des seize définitions ne décrit une partie : ce n'est ni un être vivant, ni un objet individualisable. La raison de D0070 tient ; elle écrit « l'être vivant » là où le snapshot dit « non traité comme personne humaine », sans changer la conclusion.

#### `v_46_s1` · 体 (からだ) · « Corps » — **L**

- **Fiche source** (`n5_v_46`, nom) : traductions « Corps ; Physique ; Santé corporelle ». Nuance : « Nom fondamental désignant le corps humain dans sa globalité, qu'il s'agisse de la forme physique, de la santé ou de l'enveloppe corporelle. » Exemple : « 毎日 運動 を して 、体 を 健康 に します 。 » — « Je fais du sport tous les jours pour garder mon corps en bonne santé. »
- **État publié** : sens 1 sur 1 ; traduction « Corps » ; catégorie `etre_humain › corps` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0104 (lot 01) : « Le corps humain : ni une personne, ni un organisme vivant non humain ; la totalité n'est pas un type sémantique. Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : 身体 « Corps », de même sens et de registre soutenu, est sans type. Les noms de parties du corps sont sans type. Aucun sens publié ne désigne un corps avec un type. 体 et 身体 sont les deux seuls cas de la famille qui ne sont pas des parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « le corps humain dans sa globalité », forme physique, santé, enveloppe corporelle. Ce n'est pas une partie : A6 ne cite pas ce cas. Lecture des définitions une à une : ce n'est pas une personne (un individu désigné comme tel), ni un organisme vivant (un être vivant, animal ou plante), ni un objet individualisable ; le corps est ce dont une personne est faite, non un être distinct d'elle. Aucun type terminal ne le décrit. La raison de D0104 tient.
- **Réserve** : C'est, avec 身体, le verdict le moins directement couvert par A6 : à confirmer en priorité à la relecture.

#### `v_48_s1` · 口 (くち) · « Bouche » — **L**

- **Fiche source** (`n5_v_48`, nom) : traductions « Bouche ; Ouverture ; Entrée / Issue ». Nuance : « Nom désignant la partie du visage (la bouche) ou, par extension, une ouverture, une entrée ou une issue (comme 改札口 (kaisatsuguchi), la sortie des tickets de métro). » Exemple : « 薬 を 飲む とき 、口 を 開けます 。 » — « Quand on prend un médicament, on ouvre la bouche. »
- **État publié** : sens 1 sur 1 ; traduction « Bouche » ; catégorie `etre_humain › corps › tete_visage` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0121 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « la partie du visage (la bouche) » ; l'exemple dit « on ouvre la bouche ». L'emploi pour une ouverture est gardé en nuance (D0120) et n'est pas le sens audité. Une partie du visage : aucun type terminal ne la décrit. La raison de D0121 tient.

#### `v_51_s1` · 手 (て) · « Main » — **L**

- **Fiche source** (`n5_v_51`, nom) : traductions « Main ; Bras ; Écriture (style) ». Nuance : « Nom fondamental désignant la main humaine, la patte d'un animal, ou par extension le style d'écriture. » Exemple : « 食事 の 前 に 、手 を 洗います 。 » — « Avant le repas, je me lave les mains. »
- **État publié** : sens 1 sur 1 ; traduction « Main » ; catégorie `etre_humain › corps › membres` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0127 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « la main humaine, la patte d'un animal » ; l'exemple dit « je me lave les mains ». Un seul sens est retenu, la main (D0126). Une partie du corps : aucun type terminal ne la décrit. La raison de D0127 tient.

#### `v_54_s1` · 歯 (は) · « Dent » — **L**

- **Fiche source** (`n5_v_54`, nom) : traductions « Dent ; Denture ». Nuance : « Nom désignant une dent humaine ou animale, élément essentiel de l'hygiène et de la santé corporelle. » Exemple : « 毎朝 、歯 を 磨きます 。 » — « Je me brosse les dents tous les matins. »
- **État publié** : sens 1 sur 1 ; traduction « Dent » ; catégorie `etre_humain › corps › tete_visage` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0123 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « une dent humaine ou animale » ; l'exemple dit « je me brosse les dents ». Une dent est une partie du corps, non un objet individualisable ni un être vivant. La raison de D0123 tient.

#### `v_57_s1` · 目 (め) · « Œil » — **L**

- **Fiche source** (`n5_v_57`, nom) : traductions « Œil ; Yeux ; Vue ; Regard ». Nuance : « Nom fondamental désignant l'organe de la vision (l'œil ou les yeux). S'utilise aussi par extension pour exprimer un point de vue ou une perspective. » Exemple : « 目 が 痛い ので 、医者 に 診てもらいます 。 » — « J'ai mal à l'œil, je me fais donc examiner par un médecin. »
- **État publié** : sens 1 sur 1 ; traduction « Œil » (Yeux) ; catégorie `etre_humain › corps › tete_visage` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0115 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « l'organe de la vision (l'œil ou les yeux) » ; l'exemple dit « j'ai mal à l'œil ». La vue et le regard sont gardés en nuance (D0114). Un organe : aucun type terminal ne le décrit. La raison de D0115 tient.

#### `v_58_s1` · 耳 (みみ) · « Oreille » — **L**

- **Fiche source** (`n5_v_58`, nom) : traductions « Oreille ; Ouïe ». Nuance : « Nom désignant l'organe de l'audition (l'oreille) ou la capacité d'entendre. » Exemple : « 音楽 を 聞く とき 、耳 に イヤホン を つけます 。 » — « Quand on écoute de la musique, on met des écouteurs dans les oreilles. »
- **État publié** : sens 1 sur 1 ; traduction « Oreille » ; catégorie `etre_humain › corps › tete_visage` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0117 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « l'organe de l'audition (l'oreille) ou la capacité d'entendre » ; l'exemple porte sur l'organe (des écouteurs dans les oreilles). L'ouïe est gardée en nuance (D0116). Un organe : aucun type terminal ne le décrit. La raison de D0117 tient.

#### `v_60_s1` · 足 (あし) · « Pied » — **L**

- **Fiche source** (`n5_v_60`, nom) : traductions « Pied ; Jambe ». Nuance : « Nom désignant le pied ou la jambe humaine, ou par extension la patte d'un animal (le japonais emploie généralement un seul mot pour couvrir ces différentes parties). » Exemple : « 長い 時間 歩いて 、足 が 痛いです 。 » — « En ayant marché longtemps, j'ai mal aux pieds (ou aux jambes). »
- **État publié** : sens 1 sur 1 ; traduction « Pied » (Jambe) ; catégorie `etre_humain › corps › membres` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0130 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « le pied ou la jambe humaine, ou par extension la patte d'un animal » ; l'exemple dit « j'ai mal aux pieds ». Un seul concept, le membre inférieur (D0129). Une partie du corps : aucun type terminal ne la décrit. La raison de D0130 tient.

#### `v_61_s1` · 身体 (しんたい) · « Corps » — **L**

- **Fiche source** (`n5_v_61`, nom) : traductions « Corps ; Physique ; Organisme ». Nuance : « Équivalent soutenu ou médical de 体 (karada), ce dernier étant réservé à l'usage courant. » Exemple : « 健康 の ため に 、身体 を 動かします 。 » — « Pour ma santé, je fais bouger mon corps. »
- **État publié** : sens 1 sur 1 ; traduction « Corps » (Organisme) ; catégorie `etre_humain › corps` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0106 (lot 01) : « Le corps humain : même raison que 体 (n5_v_46). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : 体 « Corps » est sans type. Les noms de parties du corps sont sans type. Aucun sens publié ne désigne un corps avec un type.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche ne dit qu'une chose : « équivalent soutenu ou médical de 体 ». L'exemple dit « je fais bouger mon corps ». Le sens est le corps humain entier, comme 体, lu ici pour lui-même : ni personne, ni organisme vivant au sens du snapshot, ni objet. L'alternative publiée « Organisme » est un synonyme français de « corps » ; elle ne fait pas du sens un être vivant au sens d'A2-ST. La raison de D0106 renvoie à celle de 体 et tient avec elle.
- **Réserve** : Même réserve que pour 体 : à confirmer en priorité à la relecture.

#### `v_65_s1` · 頭 (あたま) · « Tête » — **L**

- **Fiche source** (`n5_v_65`, nom) : traductions « Tête ; Esprit ; Intellect ». Nuance : « Désigne la tête ou, dans un autre sens, l'intelligence et la matière grise. » Exemple : « 昨日 から 頭 が 痛い です 。 » — « J'ai mal à la tête depuis hier. »
- **État publié** : sens 1 sur 2 ; traduction « Tête » ; catégorie `etre_humain › corps › tete_visage` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`. Autres sens : « Esprit » (`etre_humain › psychologie_esprit › pensee`, `null`).
- **Justification historique** : D0109 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit que le mot « désigne la tête » ; l'exemple dit « j'ai mal à la tête ». Le sens 1 est la partie anatomique, distincte du sens 2 (D0108). Aucun type terminal ne la décrit. La raison de D0109 tient.

#### `v_67_s1` · 鼻 (はな) · « Nez » — **L**

- **Fiche source** (`n5_v_67`, nom) : traductions « Nez ; Flur (odorat) ». Nuance : « Nom désignant l'organe de l'odorat et de la respiration situé sur le visage. » Exemple : « 風邪 を 引いて 、鼻 が 出ます 。 » — « J'ai attrapé un rhume et le nez me coule. »
- **État publié** : sens 1 sur 1 ; traduction « Nez » ; catégorie `etre_humain › corps › tete_visage` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0119 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « l'organe de l'odorat et de la respiration situé sur le visage » ; l'exemple dit « le nez me coule ». Un organe : aucun type terminal ne le décrit. La raison de D0119 tient.

#### `v_603_s1` · 髪 (かみ) · « Cheveux » — **L**

- **Fiche source** (`n5_v_603`, nom) : traductions « Cheveux ; Chevelure ». Nuance : « Nom désignant les cheveux de la tête (à ne pas confondre avec l'homophone *kami* qui signifie « papier » ou « dieu » selon le contexte et l'écriture). » Exemple : « 髪 を 切ります 。 » — « Je me coupe les cheveux. »
- **État publié** : sens 1 sur 1 ; traduction « Cheveux » (Chevelure) ; catégorie `etre_humain › apparence_presentation_personnelle › coiffure_pilosite` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0124 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « les cheveux de la tête » ; l'exemple dit « je me coupe les cheveux ». Les cheveux font partie du corps ; ce n'est ni une matière considérée comme masse, ni un objet. La raison de D0124 tient. La catégorie (apparence › coiffure et pilosité) n'est pas l'objet de ce cas.

#### `v_690_s2` · 背 (せ) · « Dos » — **L**

- **Fiche source** (`n5_v_690`, nom) : traductions « Taille ; Hauteur (du corps) ; Dos ». Nuance : « Nom désignant la stature ou la hauteur d'une personne (souvent utilisé dans l'expression *se ga takai* pour dire qu'on est grand). Il peut aussi désigner le dos au sens anatomique. » Exemple : « あの ともだち は 背 が たかい です 。 » — « Cet ami est grand de taille. »
- **État publié** : sens 2 sur 2 ; traduction « Dos » ; catégorie `etre_humain › corps › tronc` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`. Autres sens : « Taille » (`etre_humain › corps › caracteristiques_corporelles`, `propriete`).
- **Justification historique** : D0132 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit que le mot « peut aussi désigner le dos au sens anatomique ». L'exemple illustre le sens 1 (la taille) ; le sens 2 repose sur le texte de la fiche. Une partie du corps : aucun type terminal ne la décrit. La raison de D0132 tient.

#### `v_716_s1` · 顔 (かお) · « Visage » — **L**

- **Fiche source** (`n5_v_716`, nom) : traductions « Visage ; Figure ; Mine ». Nuance : « Nom désignant le visage humain ou l'expression faciale (la mine). Il est également utilisé dans diverses expressions idiomatiques liées aux relations sociales ou aux émotions. » Exemple : « 顔 を 洗い ます 。 » — « Je me lave le visage. »
- **État publié** : sens 1 sur 1 ; traduction « Visage » (Figure) ; catégorie `etre_humain › corps › tete_visage` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0113 (lot 01) : « Partie du corps : aucun type terminal d'A2-ST-v1 ne convient (organisme_vivant désigne un être vivant non humain ; la partie n'est pas un type sémantique). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l'être vivant, pas une partie de lui », est l'un des trois cas qui fondent l'addendum. A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ». A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c'est une caractéristique du corps, non une de ses parties.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « le visage humain ou l'expression faciale (la mine) » ; l'exemple dit « je me lave le visage ». La mine est gardée en nuance (D0112). Une partie du corps : aucun type terminal ne la décrit. La raison de D0113 tient.

### B · Unités de mesure et de comptage

#### `v_321_s2` · 時間 (じかん) · « Heure (durée) » — **L**

- **Fiche source** (`n5_v_321`, nom) : traductions « Temps ; Heure (durée) ». Nuance : « Nom composé de 時 (heure/moment) et de 間 (intervalle/espace), désignant une durée ou le temps global disponible. Compteur spécifique : 時間 (jikan) pour les heures. Les romajis associés sont (*jikan*). » Exemple : « いま 、時間 が ありません 。 » — « Je n'ai pas le temps maintenant. »
- **État publié** : sens 2 sur 2 ; traduction « Heure (durée) » ; catégorie `temps › unites_temporelles › seconde_minute_heure` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`. Autres sens : « Temps » (`temps › duree`, `concept_abstrait`).
- **Justification historique** : D0926 (lot 13) : « Heure, unité de durée : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0) et 匹 (lot 07). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : « キロ au sens "kilogramme" » et « キロ au sens "kilomètre" » sont deux des trois cas qui fondent l'addendum ; « la mesure non plus : une unité, un instrument, une propriété mesurable ou une opération de mesure ne sont "pas automatiquement" des `quantite_valeur` ». A2-ST-v1, §3, Quantité / valeur : « valeur quantitative, quantité ou grandeur conceptualisée abstraitement » ; « unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type ». A2-ST-v1, §4 : la « mesure » n'est pas un type sémantique.
- **Comparables examinés** : Les autres unités publiées (キロ, キログラム, グラム, メートル, 時間 sens 2) sont toutes sans type. Les sens qui désignent une quantité déterminée portent `quantite_valeur` : 半 « Moitié » et « Et demie (heure) » (D0906 : « une quantité, non une unité »), 半分, 一人, 二人, les nombres. Dans la même catégorie complète, 半 « Et demie (heure) » est une `quantite_valeur` : une demi-heure est une quantité, l'heure est l'unité.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit : « Compteur spécifique : 時間 (jikan) pour les heures ». Le sens 2 est l'heure comme unité de durée, distincte du sens 1 (le temps, la durée). L'exemple illustre le sens 1 ; le sens 2 vient du texte de la fiche. Une unité n'est pas une quantité déterminée. La raison de D0926 tient.

#### `v_363_s1` · キロ (きろ) · « Kilo (kilogramme) » — **L**

- **Fiche source** (`n5_v_363`, nom) : traductions « Kilo ; Kilogramme ; Kilomètre ». Nuance : « Nom emprunté (katakana) servant d'abréviation courante pour désigner soit un kilogramme (キログラム), soit un kilomètre (キロメートル) selon le contexte. Les romajis associés sont (*kiro*). » Exemple : « りんご を 2 キロ かいました 。 » — « J'ai acheté 2 kilos de pommes. »
- **État publié** : sens 1 sur 2 ; traduction « Kilo (kilogramme) » ; catégorie `nombres_quantification` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`. Autres sens : « Kilomètre » (`espace_proprietes_spatiales › distance_proximite`, `null`).
- **Justification historique** : D0071 (lot 00) : « Kilogramme, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : « キロ au sens "kilogramme" » et « キロ au sens "kilomètre" » sont deux des trois cas qui fondent l'addendum ; « la mesure non plus : une unité, un instrument, une propriété mesurable ou une opération de mesure ne sont "pas automatiquement" des `quantite_valeur` ». A2-ST-v1, §3, Quantité / valeur : « valeur quantitative, quantité ou grandeur conceptualisée abstraitement » ; « unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type ». A2-ST-v1, §4 : la « mesure » n'est pas un type sémantique.
- **Comparables examinés** : Les autres unités publiées (キロ, キログラム, グラム, メートル, 時間 sens 2) sont toutes sans type. Les sens qui désignent une quantité déterminée portent `quantite_valeur` : 半 « Moitié » et « Et demie (heure) » (D0906 : « une quantité, non une unité »), 半分, 一人, 二人, les nombres.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit que キロ désigne « soit un kilogramme, soit un kilomètre » ; l'exemple (« 2 kilos de pommes ») illustre ce sens. C'est le cas même qu'A6 cite. Une unité de masse : aucun type terminal ne la décrit. La raison de D0071 tient.

#### `v_363_s2` · キロ (きろ) · « Kilomètre » — **L**

- **Fiche source** (`n5_v_363`, nom) : traductions « Kilo ; Kilogramme ; Kilomètre ». Nuance : « Nom emprunté (katakana) servant d'abréviation courante pour désigner soit un kilogramme (キログラム), soit un kilomètre (キロメートル) selon le contexte. Les romajis associés sont (*kiro*). » Exemple : « りんご を 2 キロ かいました 。 » — « J'ai acheté 2 kilos de pommes. »
- **État publié** : sens 2 sur 2 ; traduction « Kilomètre » ; catégorie `espace_proprietes_spatiales › distance_proximite` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`. Autres sens : « Kilo (kilogramme) » (`nombres_quantification`, `null`).
- **Justification historique** : D0072 (lot 00) : « Kilomètre, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : « キロ au sens "kilogramme" » et « キロ au sens "kilomètre" » sont deux des trois cas qui fondent l'addendum ; « la mesure non plus : une unité, un instrument, une propriété mesurable ou une opération de mesure ne sont "pas automatiquement" des `quantite_valeur` ». A2-ST-v1, §3, Quantité / valeur : « valeur quantitative, quantité ou grandeur conceptualisée abstraitement » ; « unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type ». A2-ST-v1, §4 : la « mesure » n'est pas un type sémantique.
- **Comparables examinés** : Les autres unités publiées (キロ, キログラム, グラム, メートル, 時間 sens 2) sont toutes sans type. Les sens qui désignent une quantité déterminée portent `quantite_valeur` : 半 « Moitié » et « Et demie (heure) » (D0906 : « une quantité, non une unité »), 半分, 一人, 二人, les nombres.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit que キロ désigne « soit un kilogramme, soit un kilomètre ». Le sens 2 est l'unité de distance ; l'exemple illustre le sens 1. C'est le second cas qu'A6 cite. La raison de D0072 tient. La catégorie de ce sens (espace › distance et proximité), qui diffère de celle de メートル, est un point réservé du volet 1 et n'est pas jugée ici.

#### `v_364_s1` · キログラム (きろぐらむ) · « Kilogramme » — **L**

- **Fiche source** (`n5_v_364`, nom) : traductions « Kilogramme ; Kilo ». Nuance : « Nom emprunté (katakana) désignant précisément l'unité de mesure de masse (le kilogramme). Souvent abrégé en *kiro*. Les romajis associés sont (*kirogramu*). » Exemple : « わたしの たいじゅう は 74 キログラム です 。 » — « Mon poids est de 74 kilogrammes. »
- **État publié** : sens 1 sur 1 ; traduction « Kilogramme » (Kilo) ; catégorie `nombres_quantification` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0954 (lot 14) : « Kilogramme, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : « キロ au sens "kilogramme" » et « キロ au sens "kilomètre" » sont deux des trois cas qui fondent l'addendum ; « la mesure non plus : une unité, un instrument, une propriété mesurable ou une opération de mesure ne sont "pas automatiquement" des `quantite_valeur` ». A2-ST-v1, §3, Quantité / valeur : « valeur quantitative, quantité ou grandeur conceptualisée abstraitement » ; « unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type ». A2-ST-v1, §4 : la « mesure » n'est pas un type sémantique.
- **Comparables examinés** : Les autres unités publiées (キロ, キログラム, グラム, メートル, 時間 sens 2) sont toutes sans type. Les sens qui désignent une quantité déterminée portent `quantite_valeur` : 半 « Moitié » et « Et demie (heure) » (D0906 : « une quantité, non une unité »), 半分, 一人, 二人, les nombres.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit : « l'unité de mesure de masse (le kilogramme) » ; l'exemple dit « mon poids est de 74 kilogrammes ». Le nombre porte la quantité, le mot nomme l'unité. La raison de D0954 tient.

#### `v_366_s1` · メートル (めーとる) · « Mètre » — **L**

- **Fiche source** (`n5_v_366`, nom) : traductions « Mètre ; Unité de mesure de longueur ». Nuance : « Nom emprunté (katakana) désignant l'unité de mesure de longueur (le mètre). Les romajis associés sont (*meetoru*). » Exemple : « ここ から えき まで 100 メートル です 。 » — « Il y a 100 mètres d'ici à la gare. »
- **État publié** : sens 1 sur 1 ; traduction « Mètre » ; catégorie `espace_proprietes_spatiales › dimensions › longueur` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0957 (lot 14) : « Mètre, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : « キロ au sens "kilogramme" » et « キロ au sens "kilomètre" » sont deux des trois cas qui fondent l'addendum ; « la mesure non plus : une unité, un instrument, une propriété mesurable ou une opération de mesure ne sont "pas automatiquement" des `quantite_valeur` ». A2-ST-v1, §3, Quantité / valeur : « valeur quantitative, quantité ou grandeur conceptualisée abstraitement » ; « unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type ». A2-ST-v1, §4 : la « mesure » n'est pas un type sémantique.
- **Comparables examinés** : Les autres unités publiées (キロ, キログラム, グラム, メートル, 時間 sens 2) sont toutes sans type. Les sens qui désignent une quantité déterminée portent `quantite_valeur` : 半 « Moitié » et « Et demie (heure) » (D0906 : « une quantité, non une unité »), 半分, 一人, 二人, les nombres.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit : « l'unité de mesure de longueur (le mètre) » ; l'exemple dit « il y a 100 mètres d'ici à la gare ». Le nombre porte la quantité, le mot nomme l'unité. La raison de D0957 tient. Sa catégorie est un point réservé du volet 1 et n'est pas jugée ici.

#### `v_611_s1` · グラム (ぐらむ) · « Gramme » — **L**

- **Fiche source** (`n5_v_611`, nom) : traductions « Gramme ; Unité de mesure de masse (g) ». Nuance : « Nom (emprunt en katakana de l'anglais *gram*) utilisé pour exprimer le poid ou la masse, fréquemment employé lors des achats de nourriture ou de recettes de cuisine. » Exemple : « にく を 200 グラム かい まし た 。 » — « J'ai acheté 200 grammes de viande. »
- **État publié** : sens 1 sur 1 ; traduction « Gramme » ; catégorie `nombres_quantification` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D1008 (lot 14) : « Gramme, unité de mesure : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A6, §1 : « キロ au sens "kilogramme" » et « キロ au sens "kilomètre" » sont deux des trois cas qui fondent l'addendum ; « la mesure non plus : une unité, un instrument, une propriété mesurable ou une opération de mesure ne sont "pas automatiquement" des `quantite_valeur` ». A2-ST-v1, §3, Quantité / valeur : « valeur quantitative, quantité ou grandeur conceptualisée abstraitement » ; « unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type ». A2-ST-v1, §4 : la « mesure » n'est pas un type sémantique.
- **Comparables examinés** : Les autres unités publiées (キロ, キログラム, グラム, メートル, 時間 sens 2) sont toutes sans type. Les sens qui désignent une quantité déterminée portent `quantite_valeur` : 半 « Moitié » et « Et demie (heure) » (D0906 : « une quantité, non une unité »), 半分, 一人, 二人, les nombres.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit que le mot est « utilisé pour exprimer le poids ou la masse » ; l'exemple dit « 200 grammes de viande ». Le nombre porte la quantité, le mot nomme l'unité. La raison de D1008 tient.

#### `v_648_s1` · 匹 (ひき) · « Compteur des petits animaux » — **L**

- **Fiche source** (`n5_v_648`, nom) : traductions « Compteur pour petits animaux ; Compteur (chats, chiens, poissons, insectes, etc.) ». Nuance : « Compteur numérique spécial utilisé pour compter les petits animaux (chiens, chats, poissons, insectes, etc.). Ce compteur subit des modifications phonétiques régulières selon le chiffre qui le précède (par exemple : *ippiki*, *nihiki*, *sanbiki*). » Exemple : « いえ に ねこ が 2 匹 い ます 。 » — « Il y a deux chats dans la maison. »
- **État publié** : sens 1 sur 1 ; traduction « Compteur des petits animaux » ; catégorie `nombres_quantification › comptage_compteurs › animaux` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom` ; `counter` renseigné.
- **Justification historique** : D0502 (lot 07) : « Unité de comptage : la mesure est exclue des types sémantiques, et une unité n'est pas automatiquement une quantite_valeur (A2-ST-v1) ; même raison que キロ (lot 0). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A2-LING-v1, §3 : le compteur est une propriété linguistique de l'ENTRY ; §5 : « compteur ≠ quantificateur ». A2-ST-v1, §4 : les « fonctions grammaticales, discursives ou pragmatiques » ne sont pas des types sémantiques. A2-ST-v1, §3, Quantité / valeur : « valeur quantitative, quantité ou grandeur conceptualisée abstraitement » ; « unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type ».
- **Comparables examinés** : 匹 est la seule ENTRY publiée qui soit elle-même un compteur (`counter`). 一人 et 二人, formés avec un compteur, sont des `quantite_valeur` : ils désignent une quantité déterminée de personnes. Les unités de mesure sont sans type.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit un « compteur numérique spécial utilisé pour compter les petits animaux » ; dans l'exemple (« deux chats »), le nombre porte la quantité et 匹 la classe de ce qui est compté. Le sens ne désigne ni une entité, ni une quantité : son contenu est un rôle du système de comptage, que le modèle porte par la propriété `counter` de l'ENTRY. Le fondement direct du `null` est le statut de compteur, qu'A2-LING (§3) fait porter par l'ENTRY, et l'absence de tout type terminal approprié : A2-ST (§4) exclut les fonctions grammaticales des types sémantiques. La raison de D0502 l'établissait par analogie avec les unités de mesure ; cette analogie n'est pas le fondement retenu (arbitrage du 2026-10-08), et elle ne contredit pas la conclusion.

### C · Cas singuliers

#### `v_65_s2` · 頭 (あたま) · « Esprit » — **C**

- **Fiche source** (`n5_v_65`, nom) : traductions « Tête ; Esprit ; Intellect ». Nuance : « Désigne la tête ou, dans un autre sens, l'intelligence et la matière grise. » Exemple : « 昨日 から 頭 が 痛い です 。 » — « J'ai mal à la tête depuis hier. »
- **État publié** : sens 2 sur 2 ; traduction « Esprit » (Intelligence) ; catégorie `etre_humain › psychologie_esprit › pensee` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`. Autres sens : « Tête » (`etre_humain › corps › tete_visage`, `null`).
- **Justification historique** : D0110 (lot 01) : « Faculté mentale : ni concept abstrait (type jamais de secours), ni propriété ; aucun type terminal ne convient. Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A2-ST-v1, §3, Propriété : « caractéristique attribuable à une entité, indépendamment du fait qu'elle soit permanente ou variable ». A2-ST-v1, §3, Concept abstrait : « ce type ne doit jamais devenir une catégorie de secours ».
- **Comparables examinés** : 力 « Force » (lot 20, D1361), dont la fiche couvre « la force physique […] ou les compétences intellectuelles », porte `propriete` : « une caractéristique que l'on attribue à une personne ou à un animal ». 背, sens 1 « Taille », caractéristique du corps, porte `propriete`. Aucun autre nom publié ne désigne une faculté mentale.
- **Verdict proposé** : **C**.
- **Motivation** : La fiche décrit, « dans un autre sens, l'intelligence et la matière grise » ; la nuance publiée donne 頭がいい (être intelligent) et 頭を使う (réfléchir). L'intelligence, ou la faculté de penser, est une caractéristique que l'on attribue à une personne : c'est la définition de `propriete`. D0110 écarte ce type par une simple affirmation (« ni propriété »), sans dire pourquoi. Depuis, le lot 20 a typé 力 en `propriete` pour une capacité de même nature. Un type terminal existant décrit donc le sens, et un sens comparable le porte : les conditions de L ne sont pas réunies.
- **Correction proposée** : `semantic_type` : `null` → `propriete`. L'avertissement `type-nul` cesserait. Aucune autre couche n'est touchée.
- **Réserve** : Proposition moins assurée que pour 表 : la traduction principale « Esprit » peut se lire comme le siège de la pensée plutôt que comme une capacité. Si l'arbitrage juge que le sens désigne l'esprit lui-même, le `null` se maintiendrait et le cas serait reclassé L.

#### `v_500_s2` · また (また) · « Aussi » — **F**

- **Fiche source** (`n5_v_500`, adverbe) : traductions « À nouveau ; Encore ; Aussi ; De plus ». Nuance : « Adverbe exprimant la répétition d'une action ou le retour d'un état (« à nouveau, une fois de plus »), ou servant à lier des arguments (« de plus ») et à prendre congé (« à plus / à bientôt » avec *mata ne*). » Exemple : « また あいましょう 。 » — « Regardons-nous à nouveau (ou : à bientôt). »
- **État publié** : sens 2 sur 2 ; traduction « Aussi » (De plus) ; catégorie `null` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `adverbe`. Autres sens : « À nouveau » (`null`, `concept_abstrait`). Ce sens porte aussi l'avertissement `categorie-nulle`, audité à part.
- **Justification historique** : D1403 (lot 21) : « Aucun type (arbitrage des choix du lot 21) : la proposition rangeait ce sens en concept_abstrait. La fiche décrit un emploi discursif, qui sert à lier des arguments, à ajouter un élément à ce qui précède ; A2-ST décrit des entités, des occurrences, des conditions et des abstractions, non des fonctions de discours, et concept_abstrait ne doit pas servir de type de secours. Aucun type terminal existant ne décrit correctement ce sens. Le sens reste sans catégorie (D1380) et sans fonction (D1381), connecteur n'ayant pas de définition normative. Addendum A6. »
- **Normes appliquées** : A9, §4.2 : « un sens dont le contenu est le rôle fonctionnel lui-même n'a en général aucun type terminal applicable : `semantic_type: null`, justifié par une décision `type-nul` (A6), comme 何, 大変 "très" et また, sens 2 ». A9, §3.1 : `connecteur`, « fonction pragmatique d'un SENSE dont le rôle est de relier l'énoncé qu'il introduit à un énoncé ou à une situation qui précède, en marquant entre eux une relation (opposition, succession, addition, conséquence) ». A9, §2.1 : une fonction est attribuée « lorsque le rôle qu'elle décrit fait partie intégrante du sens tel qu'il est modélisé, et que la fiche source l'atteste ». A9, §5 : « réservation pour l'audit A2-05 […] au minimum また, sens 2 "Aussi, de plus" (D1381, refusée faute de définition, qui relèverait de `connecteur`) ». A2-ST-v1, §4 : les « fonctions grammaticales, discursives ou pragmatiques » ne sont pas des types sémantiques.
- **Comparables examinés** : Les sens publiés dont le contenu est un rôle de liaison portent `connecteur` et sont sans type : しかし, でも, それから, そうして, では, それでは, じゃあ, じゃ (lot 23). また, sens 2, est le seul sens de liaison publié sans fonction : il a été décidé au lot 21, avant A9.
- **Verdict proposé** : **F**.
- **Motivation** : La fiche dit que また sert aussi « à lier des arguments ("de plus") » ; le sens 2 publié, « Aussi, de plus », est ce rôle même, et sa nuance le dit : « pour lier des arguments, ajouter un élément à ce qui précède ». L'exemple de la fiche illustre le sens 1 ; le sens 2 repose sur le texte de la fiche et sur deux de ses quatre traductions. Le `null` lui-même est juste : A9 (§4.2) cite ce sens comme exemple d'un contenu qui est un rôle fonctionnel, sans type applicable, et D1403 tient. Mais le SENSE est incomplet : D1381 a refusé `connecteur` « faute de définition normative ». A9 la définit depuis, pour une relation d'addition entre énoncés, et réserve expressément ce cas à A2-05. La fonction est définie, intégrale au sens modélisé et attestée par la fiche.
- **Correction proposée** : `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]` ; `semantic_type` reste `null`. Les deux avertissements de ce sens (`type-nul` et `categorie-nulle`) cesseraient d'être émis, le `null` étant alors porté par une fonction. La raison de D1381 est périmée ; D1403 reste valable.
- **Réserve** : Ce sens porte aussi un avertissement `categorie-nulle`, qui sera audité avec les 120 : son verdict ne peut pas être fixé ici, mais il dépend de la même correction.

#### `v_521_s1` · たぶん (たぶん) · « Peut-être » — **L**

- **Fiche source** (`n5_v_521`, adverbe) : traductions « Peut-être ; Probablement ; Vraisemblablement ». Nuance : « Adverbe exprimant une probabilité ou une supposition de l'ordre de 70 à 80 % de chance qu'un fait se produise ou soit vrai. » Exemple : « あした は たぶん あめ が ふり ます 。 » — « Demain, il pleuvra peut-être. »
- **État publié** : sens 1 sur 1 ; traduction « Peut-être » (Probablement, Vraisemblablement) ; catégorie `null` ; type `null` ; dimensions `probabilite:probabilite` ; fonctions aucune ; classe `adverbe`. Ce sens porte aussi l'avertissement `categorie-nulle`, audité à part.
- **Justification historique** : D1433 (lot 22) : « Aucun type : たぶん ne désigne ni une entité, ni une occurrence, ni une condition, ni une abstraction ; il qualifie la probabilité de ce qui est dit. concept_abstrait ne sert pas de type de secours (D1403). Le sens est porté par la dimension probabilité (D1431). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A2-ST-v1, §4 : « possibilité / impossibilité » et « nécessité » ne sont pas des types sémantiques ; A2-DIM-v1, §2, range la probabilité parmi les dimensions (modalité conceptuelle). A9, §4.3 : « une modalité conceptuelle reste une dimension (`probabilite` pour たぶん), non une fonction `modalite`, qui n'est pas définie ». A2-ST-v1, §3, Propriété : « caractéristique attribuable à une entité, indépendamment du fait qu'elle soit permanente ou variable ». A2-ST-v1, §3, Concept abstrait : « ce type ne doit jamais devenir une catégorie de secours ».
- **Comparables examinés** : ちょうど « Exactement » et 大体 « À peu près » sont des `propriete` : ils qualifient une mesure ou une quantité, donc une entité. いつも, よく « Souvent », 時々 sont des `concept_abstrait` ; ils sont candidats au volet 1 (C3) et ne valent pas précédent ici. たぶん est le seul adverbe publié qui exprime la probabilité d'un fait.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « une probabilité ou une supposition de l'ordre de 70 à 80 % de chance qu'un fait se produise ou soit vrai » ; l'exemple dit « demain, il pleuvra peut-être ». Le mot ne désigne ni une entité, ni une occurrence ; il n'attribue pas une caractéristique à une entité, mais qualifie la vraisemblance d'un fait : ce n'est pas une `propriete`. A2-ST exclut les notions modales des types, et le sens est porté par la dimension `probabilite`, ce qu'A9 (§4.3) confirme nommément. `concept_abstrait` ne serait ici qu'un type de secours. La raison de D1433 tient. Le verdict est établi sans recours à la fonction `modalite`, qui n'est pas définie.
- **Chantier normatif** : Pour mémoire, sans effet sur ce verdict : la fonction `modalite` n'a pas de définition normative (chantier normatif des fonctions d'A2-LING non définies).

#### `v_653_s1` · 声 (こえ) · « Voix » — **L**

- **Fiche source** (`n5_v_653`, nom) : traductions « Voix ; Cri (d'animal) ». Nuance : « Nom désignant la voix humaine lorsqu'on parle ou que l'on chante, ainsi que le cri émis par un animal. » Exemple : « かれ は おおきい 声 で はなし ます 。 » — « Il parle d'une voix forte. »
- **État publié** : sens 1 sur 1 ; traduction « Voix » (Cri (d'animal)) ; catégorie `null` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`. Ce sens porte aussi l'avertissement `categorie-nulle`, audité à part.
- **Justification historique** : D1365 (lot 20) : « Aucun type : la voix est un son émis par un être vivant, et aucun type du registre A2-ST ne convient à un son (ni objet, ni substance, ni action, ni information). Absence décidée, comme pour les parties du corps (lot 01). Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A2-GLOBAL-v1, §13 : le crash-test final n'a révélé le besoin d'aucun nouveau type sémantique ; §15 : une anomalie est d'abord un cas de données ou de frontière. A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu'il est fabriqué, utilisé ou structuré par une fonction ». A2-ST-v1, §3, Événement : « occurrence conceptualisée comme quelque chose qui survient » ; Résultat : « entité ou état conceptualisé principalement comme l'aboutissement d'une action, d'un processus ou d'un événement » ; Information / contenu : « contenu informationnel […] représentable ou transmissible indépendamment de son support ».
- **Comparables examinés** : 歌 « Chanson » et 音楽 « Musique » sont des `information_contenu` : une œuvre, un art, non un son. 風 « Vent » est un `processus`, un déplacement d'air. Aucun sens publié ne désigne un son : la comparaison ne fournit aucun type.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « la voix humaine lorsqu'on parle ou que l'on chante, ainsi que le cri émis par un animal » ; l'exemple dit « il parle d'une voix forte ». Lecture des définitions : la voix n'est pas un objet matériel ni une substance ; ce n'est pas un contenu transmissible ; dans l'exemple, elle n'est pas quelque chose qui survient, mais ce avec quoi l'on parle, ce qui écarte `evenement` et `action` ; la fiche ne la présente pas comme l'aboutissement d'un acte, ce qui écarte `resultat`. Aucun type terminal ne décrit un son émis par un être vivant. La raison de D1365 tient par ses propres motifs ; son rapprochement avec les parties du corps est une analogie, non un fondement.
- **Réserve** : Aucun snapshot ne traite des sons. Le verdict repose sur la seule lecture des définitions : à confirmer à la relecture. La catégorie nulle du même sens sera auditée avec les 120.

#### `v_696_s1` · 表 (おもて) · « Face » — **C**

- **Fiche source** (`n5_v_696`, nom) : traductions « Surface ; Devant ; Face ; Côté recto ». Nuance : « Nom désignant le côté visible, la face avant, le recto d'une feuille ou l'extérieur d'un bâtiment (par opposition à *ura* pour l'envers ou le verso). » Exemple : « かみ の 表 に 名前 を かき ます 。 » — « J'écris mon nom sur le recto (la face avant) de la feuille. »
- **État publié** : sens 1 sur 1 ; traduction « Face » (Recto, Devant) ; catégorie `espace_proprietes_spatiales › position_localisation › devant_derriere` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0604 (lot 10) : « La face d'une chose en est une partie : la partie n'est pas un type sémantique, et aucun type terminal ne convient (comme les parties du corps, lot 01) Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A2-ST-v1, §3, Lieu : « espace ou emplacement conceptualisé comme lieu ». A2-ST-v1, §4 : « partie / totalité » n'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.
- **Comparables examinés** : Dans la même famille source (`position_direction / position`), décidés au même lot 10, les noms de position sont des `lieu` : 上 « Dessus », dont la fiche dit « la partie supérieure, le dessus d'un objet ou la position au-dessus » ; 横 « Côté », « le flanc ou le côté horizontal d'un objet ou d'une personne » ; 下 « Dessous » ; 中 « Intérieur » ; 外 « Extérieur » ; 前 ; 後ろ ; 角 « Coin ». 表 est le seul nom de position publié sans type.
- **Verdict proposé** : **C**.
- **Motivation** : La fiche décrit « le côté visible, la face avant, le recto d'une feuille ou l'extérieur d'un bâtiment » ; l'exemple dit « j'écris mon nom sur le recto de la feuille », où 表 est l'emplacement où l'on écrit. D0604 retient que « la face d'une chose en est une partie » et qu'une partie n'est pas un type. Mais 上 et 横, dont les fiches parlent tout autant de « la partie supérieure » et du « flanc » d'un objet, sont typés `lieu` : un emplacement conceptualisé comme lieu. Le même type convient à 表, et des sens comparables le portent. Le `type-nul` de 表 a été validé à l'arbitrage du lot 10 ; il n'en reste pas moins contredit par le traitement des sens voisins du même lot.
- **Correction proposée** : `semantic_type` : `null` → `lieu`. L'avertissement `type-nul` cesserait. Aucune autre couche n'est touchée.
- **Réserve** : Si l'arbitrage jugeait au contraire qu'un côté d'une chose n'est pas un lieu, c'est le type de 上 et de 横 qui serait en cause, au volet 1 ; dans les deux cas, le traitement actuel n'est pas cohérent.

#### `v_713_s1` · 電気 (でんき) · « Électricité » — **L**

- **Fiche source** (`n5_v_713`, nom) : traductions « Électricité ; Lumière électrique ; Éclairage ». Nuance : « Nom composé des kanjis signifiant « électricité / éclair » et « esprit / énergie / atmosphère », désignant à la fois l'énergie électrique et l'éclairage d'une pièce (que l'on allume ou éteint). » Exemple : « へや の 電気 を つけ ます 。 » — « J'allume la lumière (l'électricité) de la pièce. »
- **État publié** : sens 1 sur 2 ; traduction « Électricité » ; catégorie `sciences › physique › electricite_magnetisme` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `nom`. Autres sens : « Lumière » (`habitat_vie_domestique › equipements_domestiques › equipements_fonctionnels`, `objet_artefact`).
- **Justification historique** : D0275 (lot 03) : « L'électricité, phénomène et forme d'énergie : ni substance, ni objet, ni concept abstrait de secours ; aucun type terminal ne convient. Addendum A6. »
- **Normes appliquées** : A6, §2 : « `semantic_type: null` est permis lorsqu'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n'est jamais une échappatoire ». A2-ST-v1, §3, Concept abstrait : « ce type ne doit jamais devenir une catégorie de secours ». A2-ST-v1, §3, Substance / matière : « matière, matériau ou substance considérée comme masse/composition » ; Processus : « évolution, déroulement ou transformation conceptualisé dans sa progression ».
- **Comparables examinés** : 風 « Vent » est un `processus` ; 雨 et 雪 sont des `substance_matiere` ; 天気 est un `etat`. Le sens 2 de la même ENTRY, « Lumière », est un `objet_artefact` (l'éclairage que l'on allume). 力 « Force » est une `propriete`. Aucun sens publié ne désigne une forme d'énergie.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit que le mot désigne « à la fois l'énergie électrique et l'éclairage d'une pièce » ; le sens 1 est l'énergie, l'exemple illustre le sens 2. L'électricité n'est pas une matière considérée comme masse, ni un objet ; la fiche ne la présente pas comme un déroulement ; c'est une réalité physique, non une abstraction, de sorte que `concept_abstrait` ne serait qu'un type de secours. Aucun type terminal ne la décrit. La raison de D0275 tient.

## 6. Complétude

Contrôle par script contre `avertissements-connus.json` : les 27 couples `{ type-nul, sens }` de l'inventaire figurent chacun une fois dans ce rapport, aucun n'est ajouté. L = 24, F = 1, C = 2, N = 0 ; total 27.

## Annexe · Sens comparables relevés

**Famille A · être humain › corps, et apparence**

| SENSE | Mot | Sens | Catégorie | Type |
|---|---|---|---|---|
| `v_44_s1` | お腹 | Ventre | etre_humain › corps › tronc | null |
| `v_46_s1` | 体 | Corps | etre_humain › corps | null |
| `v_48_s1` | 口 | Bouche | etre_humain › corps › tete_visage | null |
| `v_51_s1` | 手 | Main | etre_humain › corps › membres | null |
| `v_54_s1` | 歯 | Dent | etre_humain › corps › tete_visage | null |
| `v_57_s1` | 目 | Œil | etre_humain › corps › tete_visage | null |
| `v_58_s1` | 耳 | Oreille | etre_humain › corps › tete_visage | null |
| `v_60_s1` | 足 | Pied | etre_humain › corps › membres | null |
| `v_61_s1` | 身体 | Corps | etre_humain › corps | null |
| `v_65_s1` | 頭 | Tête | etre_humain › corps › tete_visage | null |
| `v_67_s1` | 鼻 | Nez | etre_humain › corps › tete_visage | null |
| `v_603_s1` | 髪 | Cheveux | etre_humain › apparence_presentation_personnelle › coiffure_pilosite | null |
| `v_690_s1` | 背 | Taille | etre_humain › corps › caracteristiques_corporelles | propriete |
| `v_690_s2` | 背 | Dos | etre_humain › corps › tronc | null |
| `v_716_s1` | 顔 | Visage | etre_humain › corps › tete_visage | null |

**Famille B · unités, compteurs et quantités voisines**

| SENSE | Mot | Sens | Catégorie | Type |
|---|---|---|---|---|
| `v_311_s1` | 半 | Moitié | nombres_quantification › proportions › fraction | quantite_valeur |
| `v_311_s2` | 半 | Et demie (heure) | temps › unites_temporelles › seconde_minute_heure | quantite_valeur |
| `v_321_s1` | 時間 | Temps | temps › duree | concept_abstrait |
| `v_321_s2` | 時間 | Heure (durée) | temps › unites_temporelles › seconde_minute_heure | null |
| `v_363_s1` | キロ | Kilo (kilogramme) | nombres_quantification | null |
| `v_363_s2` | キロ | Kilomètre | espace_proprietes_spatiales › distance_proximite | null |
| `v_364_s1` | キログラム | Kilogramme | nombres_quantification | null |
| `v_366_s1` | メートル | Mètre | espace_proprietes_spatiales › dimensions › longueur | null |
| `v_611_s1` | グラム | Gramme | nombres_quantification | null |
| `v_627_s1` | 一人 | Une personne | nombres_quantification › comptage_compteurs › personnes | quantite_valeur |
| `v_627_s2` | 一人 | Seul | null | etat |
| `v_631_s1` | 二人 | Deux personnes | nombres_quantification › comptage_compteurs › personnes | quantite_valeur |
| `v_648_s1` | 匹 | Compteur des petits animaux | nombres_quantification › comptage_compteurs › animaux | null |
| `v_650_s1` | 半分 | Moitié | nombres_quantification › proportions › fraction | quantite_valeur |

**Noms de position de la famille source de 表**

| SENSE | Mot | Sens | Catégorie | Type |
|---|---|---|---|---|
| `v_43_s1` | 隣 | À côté | espace_proprietes_spatiales › distance_proximite › proximite | lieu |
| `v_341_s1` | そば | Près | espace_proprietes_spatiales › distance_proximite › proximite | lieu |
| `v_345_s1` | 上 | Dessus | espace_proprietes_spatiales › position_localisation › dessus_dessous | lieu |
| `v_346_s1` | 中 | Intérieur | espace_proprietes_spatiales › position_localisation › interieur_exterieur | lieu |
| `v_347_s1` | 先 | Avant (plus loin) | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu |
| `v_347_s2` | 先 | D'abord | temps › chronologie › avant_apres | concept_abstrait |
| `v_348_s1` | 前 | Devant | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu |
| `v_348_s2` | 前 | Avant (dans le temps) | temps › chronologie › avant_apres | concept_abstrait |
| `v_352_s1` | 外 | Extérieur | espace_proprietes_spatiales › position_localisation › interieur_exterieur | lieu |
| `v_354_s1` | 後ろ | Derrière | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu |
| `v_356_s1` | 横 | Côté | espace_proprietes_spatiales › position_localisation | lieu |
| `v_358_s1` | 角 | Coin | espace_proprietes_spatiales › forme › angulaire | lieu |
| `v_630_s1` | 下 | Dessous | espace_proprietes_spatiales › position_localisation › dessus_dessous | lieu |
| `v_696_s1` | 表 | Face | espace_proprietes_spatiales › position_localisation › devant_derriere | null |
| `v_704_s1` | 近く | Environs | espace_proprietes_spatiales › distance_proximite › proximite | lieu |
| `v_704_s2` | 近く | Prochainement | temps › moments_periodes › futur | concept_abstrait |

**Sens sans type et sans fonction (les 27)**

| SENSE | Mot | Sens | Catégorie | Type |
|---|---|---|---|---|
| `v_44_s1` | お腹 | Ventre | etre_humain › corps › tronc | null |
| `v_46_s1` | 体 | Corps | etre_humain › corps | null |
| `v_48_s1` | 口 | Bouche | etre_humain › corps › tete_visage | null |
| `v_51_s1` | 手 | Main | etre_humain › corps › membres | null |
| `v_54_s1` | 歯 | Dent | etre_humain › corps › tete_visage | null |
| `v_57_s1` | 目 | Œil | etre_humain › corps › tete_visage | null |
| `v_58_s1` | 耳 | Oreille | etre_humain › corps › tete_visage | null |
| `v_60_s1` | 足 | Pied | etre_humain › corps › membres | null |
| `v_61_s1` | 身体 | Corps | etre_humain › corps | null |
| `v_65_s1` | 頭 | Tête | etre_humain › corps › tete_visage | null |
| `v_65_s2` | 頭 | Esprit | etre_humain › psychologie_esprit › pensee | null |
| `v_67_s1` | 鼻 | Nez | etre_humain › corps › tete_visage | null |
| `v_321_s2` | 時間 | Heure (durée) | temps › unites_temporelles › seconde_minute_heure | null |
| `v_363_s1` | キロ | Kilo (kilogramme) | nombres_quantification | null |
| `v_363_s2` | キロ | Kilomètre | espace_proprietes_spatiales › distance_proximite | null |
| `v_364_s1` | キログラム | Kilogramme | nombres_quantification | null |
| `v_366_s1` | メートル | Mètre | espace_proprietes_spatiales › dimensions › longueur | null |
| `v_500_s2` | また | Aussi | null | null |
| `v_521_s1` | たぶん | Peut-être | null | null |
| `v_603_s1` | 髪 | Cheveux | etre_humain › apparence_presentation_personnelle › coiffure_pilosite | null |
| `v_611_s1` | グラム | Gramme | nombres_quantification | null |
| `v_648_s1` | 匹 | Compteur des petits animaux | nombres_quantification › comptage_compteurs › animaux | null |
| `v_653_s1` | 声 | Voix | null | null |
| `v_690_s2` | 背 | Dos | etre_humain › corps › tronc | null |
| `v_696_s1` | 表 | Face | espace_proprietes_spatiales › position_localisation › devant_derriere | null |
| `v_713_s1` | 電気 | Électricité | sciences › physique › electricite_magnetisme | null |
| `v_716_s1` | 顔 | Visage | etre_humain › corps › tete_visage | null |

**Sens de liaison portant `connecteur`**

| SENSE | Mot | Sens | Catégorie | Type |
|---|---|---|---|---|
| `v_413_s1` | じゃあ | Alors | null | null |
| `v_416_s1` | それから | Ensuite | null | null |
| `v_417_s1` | それでは | Dans ce cas | null | null |
| `v_418_s1` | では | Dans ce cas | null | null |
| `v_593_s1` | しかし | Cependant | null | null |
| `v_595_s1` | じゃ | Dans ce cas | null | null |
| `v_596_s1` | そうして | Et puis | null | null |
| `v_599_s1` | でも | Mais | null | null |

**Adverbes typés**

| SENSE | Mot | Sens | Catégorie | Type |
|---|---|---|---|---|
| `v_359_s1` | 近々 | Bientôt | temps › moments_periodes › futur | concept_abstrait |
| `v_425_s1` | だんだん | Graduellement | null | concept_abstrait |
| `v_494_s1` | いつも | Toujours | temps › frequence › frequent | concept_abstrait |
| `v_496_s1` | ちょうど | Exactement | null | propriete |
| `v_497_s2` | ちょっと | Un instant | temps › duree | concept_abstrait |
| `v_500_s1` | また | À nouveau | null | concept_abstrait |
| `v_501_s1` | まだ | Encore | temps › relations_temporelles | concept_abstrait |
| `v_501_s2` | まだ | Pas encore | temps › relations_temporelles | concept_abstrait |
| `v_502_s1` | もう | Déjà | temps › relations_temporelles | concept_abstrait |
| `v_502_s2` | もう | Ne… plus | temps › relations_temporelles | concept_abstrait |
| `v_503_s1` | もう一度 | Encore une fois | null | concept_abstrait |
| `v_504_s1` | ゆっくり | Lentement | espace_proprietes_spatiales › vitesse | propriete |
| `v_504_s2` | ゆっくり | Tranquillement | null | propriete |
| `v_506_s1` | よく | Souvent | temps › frequence › frequent | concept_abstrait |
| `v_506_s2` | よく | Bien | null | propriete |
| `v_509_s3` | 少し | Un court instant | temps › duree | concept_abstrait |
| `v_517_s2` | 一番 | Numéro un | nombres_quantification › nombres › ordinaux | concept_abstrait |
| `v_518_s1` | すぐに | Tout de suite | temps › relations_temporelles | concept_abstrait |
| `v_519_s1` | たいてい | Généralement | temps › frequence › frequent | concept_abstrait |
| `v_525_s1` | まっすぐ | Tout droit | espace_proprietes_spatiales › parcours_trajectoire | propriete |
| `v_525_s2` | まっすぐ | Honnête | null | propriete |
| `v_540_s1` | 初めて | Pour la première fois | temps › chronologie › succession | concept_abstrait |
| `v_546_s1` | 大体 | À peu près | nombres_quantification › approximation_quantitative | propriete |
| `v_546_s2` | 大体 | En général | temps › frequence › frequent | concept_abstrait |
| `v_554_s1` | 時々 | Parfois | temps › frequence › occasionnel | concept_abstrait |

**Autres comparables cités**

| SENSE | Mot | Sens | Catégorie | Type |
|---|---|---|---|---|
| `v_200_s1` | 音楽 | Musique | arts_creation › musique | information_contenu |
| `v_269_s1` | 天気 | Temps (qu'il fait) | monde_naturel › meteo › conditions_atmospheriques | etat |
| `v_280_s1` | 雨 | Pluie | monde_naturel › meteo › pluie | substance_matiere |
| `v_281_s1` | 雪 | Neige | monde_naturel › meteo › neige | substance_matiere |
| `v_282_s1` | 風 | Vent | monde_naturel › meteo › vent | processus |
| `v_646_s1` | 力 | Force | null | propriete |
| `v_676_s1` | 歌 | Chanson | arts_creation › musique › chant | information_contenu |
| `v_713_s1` | 電気 | Électricité | sciences › physique › electricite_magnetisme | null |
| `v_713_s2` | 電気 | Lumière | habitat_vie_domestique › equipements_domestiques › equipements_fonctionnels | objet_artefact |

---

# Tranche 2 · `categorie-nulle`, première tranche : 26 cas

**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : L = 23, F = 1, C = 2, N = 0. 皆 et 皆さん sont confirmés C ; また, sens 2, est confirmé F, par la correction `connecteur` déjà retenue, comptée une seule fois. Les corrections retenues rejoignent la future liste fermée ; **aucune n'est faite**. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n'est modifié.
**Reste à faire** : 94 `categorie-nulle`, en tranches suivantes ; aucune n'est commencée.

## T2.1 Résultat de la tranche

| Classement | Cas | Sens |
|---|---|---|
| **L** | 23 | `v_633_s1` 人 ; `v_657_s1` 女 ; `v_686_s1` 男 ; `v_667_s1` 方 ; `v_700_s1` 誰か ; `v_691_s1` 自分 ; `v_361_s1` 違う ; `v_361_s2` 違う ; `v_512_s1` 大丈夫 ; `v_516_s1` ある ; `v_516_s2` ある ; `v_548_s1` 居る ; `v_573_s1` 要る ; `v_665_s2` 持つ ; `v_524_s1` なる ; `v_560_s1` 消える ; `v_560_s2` 消える ; `v_579_s1` 閉まる ; `v_710_s1` 開く ; `v_80_s2` 曇る ; `v_163_s1` かかる ; `v_496_s1` ちょうど ; `v_675_s1` 次 |
| **F** | 1 | `v_500_s2` また |
| **C** | 2 | `v_606_s1` 皆 ; `v_687_s1` 皆さん |
| **N** | 0 | — |
| **Total** | 26 | L + F + C + N = 26 |

**Cumul du volet 2 à ce stade** : 27 `type-nul` arbitrés (L = 24, F = 1, C = 2, N = 0) et 26 `categorie-nulle` arbitrés (L = 23, F = 1, C = 2, N = 0), soit 53 cas arbitrés sur 147 : L = 47, F = 2, C = 4, N = 0.

- **Deux corrections nouvelles sont proposées** (皆 et 皆さん) ; la troisième (また, sens 2) est la correction déjà retenue. Aucune n'est faite.
- **Aucun N.**
- **4 fiches portent une réserve** : `v_606_s1` 皆 ; `v_687_s1` 皆さん ; `v_361_s1` 違う ; `v_163_s1` かかる.

## T2.2 Composition et méthode

La tranche réunit quatre familles du criblage (rapport de criblage, annexe D), prises en entier : « personne générique » (8), « état général » (8), « événement, processus ou phénomène général » (6), « fiche qui déborde un domaine » (3) ; et le `categorie-nulle` de また, sens 2, demandé à part.

Pour chaque cas, individuellement : fiche source entière et exemple ; sens publié et autres sens de l'ENTRY ; décision `categorie-nulle` et décisions voisines ; A5, A2-L3-v1 (§2, §5 à §7) et A2-GLOBAL-v1 (§4.4, §10, §11), A2-DIM-v1 et A9 selon le cas ; sens comparables publiés. L'arbre des catégories d'A2-L3 (§5) a été relu pour chaque sens, à la recherche d'une catégorie qui le décrirait.

## T2.3 Ce que la lecture par famille fait apparaître

**La formule de la raison n'est pas toujours le bon fondement.** La liste des éléments hors hiérarchie (A2-L3 §6, A2-GLOBAL §4.4) nomme la « personne générique », l'« action générique », la « propriété générale », et des notions comme « identité / différence » ou « possibilité / nécessité ». Elle ne contient ni « état général » ni « événement général », que treize raisons de cette tranche emploient. Pour ces treize cas, le `null` a donc été vérifié autrement, sens par sens :

- par un élément de la liste que la raison ne nommait pas : la différence (違う, sens 1), la validité (違う, sens 2), la nécessité (要る) ;
- ou par l'absence de toute catégorie qui décrive le sens, après relecture de l'arbre d'A2-L3 : l'existence, la possession, le changement, l'ouverture.

Dans les treize cas la conclusion tient ; c'est sa formulation qui est imprécise. Je le signale sans en faire un écart : aucune donnée n'est en cause.

**« Personne générique » a été étendue à des ensembles.** Six des huit cas désignent une personne sans domaine, et sont L. Les deux autres, 皆 et 皆さん, désignent tous les membres d'un groupe. Le lot 24 a rangé 大勢, « un nombre élevé de personnes », dans la quantité : je propose le même traitement par la totalité, que le registre nomme. C'est la seule divergence entre lots trouvée dans cette tranche.

**Une fiche qui nomme elle-même plusieurs domaines** (かかる, ちょうど, 次, mais aussi なる et 大丈夫) fonde un `null` plus solidement qu'une formule générale : la fiche dit pourquoi aucun domaine ne suffit.

## T2.4 Corrections proposées

| Sens | Classement | Correction proposée | Statut |
|---|---|---|---|
| `v_606_s1` 皆 « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite`. | nouvelle, à arbitrer |
| `v_687_s1` 皆さん « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite`. | nouvelle, à arbitrer |
| `v_500_s2` また « Aussi » | F | La même que pour le `type-nul` de ce sens, déjà retenue : `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]`. | déjà retenue (arbitrage de la tranche 1) |

## T2.5 Les 26 fiches d'audit

### A · Personnes désignées sans domaine (8 cas)

#### `v_633_s1` · 人 (ひと) · « Personne » — **L**

- **Fiche source** (`n5_v_633`, nom) : traductions « Personne ; Gens ; Homme / Humain ». Nuance : « Nom fondamental désignant un être humain ou une personne en général. Il sert également de suffixe de nationalité ou de métier (par exemple, *nihonjin* 日本人). » Exemple : « あの 人 は どなた です か 。 » — « Qui est cette personne ? »
- **État publié** : sens 1 sur 1 ; traduction « Personne » (Gens, Être humain) ; catégorie `null` ; type `personne` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0096 (lot 01) : « « Personne générique », explicitement hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « personne générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : Dans la même famille source, 女の子 « Fille » et 男の子 « Garçon » sont en être humain › cycle de vie › enfance, 大人 « Adulte » en âge adulte, 子供 « Enfant » en enfance : chacun de ces mots dit un âge de la vie. Les autres noms de personnes sans précision (人, 方, 女, 男, 誰か, 自分) sont sans catégorie.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « un être humain ou une personne en général » ; l'exemple dit « qui est cette personne ? ». C'est la personne générique elle-même, que l'architecture place hors de la hiérarchie thématique. Aucune catégorie ne la nomme, et la fiche ne lui donne ni âge, ni rôle, ni lien. La raison de D0096 tient, et sa citation d'A2-GLOBAL §4.4 est exacte.

#### `v_657_s1` · 女 (おんな) · « Femme » — **L**

- **Fiche source** (`n5_v_657`, nom) : traductions « Femme ; Sexe féminin ». Nuance : « Nom désignant le genre féminin ou une personne de sexe féminin. Souvent combiné avec d'autres mots pour former des expressions (comme *onnanoko* pour une fillette ou *onna no hito* pour une femme adulte). » Exemple : « あの 女 の ひと は せんせい です 。 » — « Cette femme est professeur. »
- **État publié** : sens 1 sur 1 ; traduction « Femme » ; catégorie `null` ; type `personne` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0094 (lot 01) : « Personne désignée par son sexe : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « personne générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : Dans la même famille source, 女の子 « Fille » et 男の子 « Garçon » sont en être humain › cycle de vie › enfance, 大人 « Adulte » en âge adulte, 子供 « Enfant » en enfance : chacun de ces mots dit un âge de la vie. Les autres noms de personnes sans précision (人, 方, 女, 男, 誰か, 自分) sont sans catégorie.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « le genre féminin ou une personne de sexe féminin » ; l'exemple dit « cette femme est professeur ». A2-L3 n'a aucune catégorie du sexe ou du genre, et la fiche ne dit aucun âge : « cycle de vie », qui porte 女の子, ne convient pas. Une personne désignée sans domaine : la raison de D0094 tient.

#### `v_686_s1` · 男 (おとこ) · « Homme » — **L**

- **Fiche source** (`n5_v_686`, nom) : traductions « Homme ; Sexe masculin ; Garçon ». Nuance : « Nom désignant le genre masculin ou une personne de sexe masculin. Souvent associé à d'autres mots pour former des expressions (comme *otokonoko* pour un petit garçon ou *otoko no hito* pour un homme adulte). » Exemple : « あの 男 の ひと は だれ です か 。 » — « Qui est cet homme ? »
- **État publié** : sens 1 sur 1 ; traduction « Homme » ; catégorie `null` ; type `personne` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0092 (lot 01) : « Personne désignée par son sexe : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4) ; aucune catégorie de sexe ou de genre n'existe. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « personne générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : Dans la même famille source, 女の子 « Fille » et 男の子 « Garçon » sont en être humain › cycle de vie › enfance, 大人 « Adulte » en âge adulte, 子供 « Enfant » en enfance : chacun de ces mots dit un âge de la vie. Les autres noms de personnes sans précision (人, 方, 女, 男, 誰か, 自分) sont sans catégorie.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « le genre masculin ou une personne de sexe masculin » ; l'exemple dit « qui est cet homme ? ». Aucune catégorie du sexe ou du genre n'existe ; « Garçon », que la source donne en traduction, n'est pas le sens retenu et 男の子 le porte. La raison de D0092 tient.

#### `v_667_s1` · 方 (かた) · « Personne » — **L**

- **Fiche source** (`n5_v_667`, nom) : traductions « Personne ; Monsieur / Madame (suffixe honorifique) ; Manière de faire ». Nuance : « Nom / suffixe poli désignant une personne avec respect (par exemple *ano kata* cette personne-là). Il sert aussi de suffixe pour indiquer la manière ou la façon de faire quelque chose (*kata* après la racine d'un verbe). » Exemple : « あの 方 は どなた です か 。 » — « Qui est cette personne (polie) ? »
- **État publié** : sens 1 sur 1 ; traduction « Personne » (Monsieur, Madame) ; catégorie `null` ; type `personne` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0097 (lot 01) : « « Personne générique » (forme respectueuse), hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « personne générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A9, §3.3 : « la politesse n'est pas le registre : une marque de registre poli ou formel (forme polie d'un mot, pronom de respect, interrogatif poli) ne suffit pas à attribuer la fonction ».
- **Comparables examinés** : Dans la même famille source, 女の子 « Fille » et 男の子 « Garçon » sont en être humain › cycle de vie › enfance, 大人 « Adulte » en âge adulte, 子供 « Enfant » en enfance : chacun de ces mots dit un âge de la vie. Les autres noms de personnes sans précision (人, 方, 女, 男, 誰か, 自分) sont sans catégorie.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit un « nom / suffixe poli désignant une personne avec respect » ; l'exemple dit « qui est cette personne ? ». Le sens retenu est la personne, dite avec respect ; le suffixe de manière n'est pas modélisé ici. Le respect est un registre : A9 exclut d'en faire une fonction `politesse`, et il ne crée aucun domaine. La raison de D0097 tient.

#### `v_700_s1` · 誰か (だれか) · « Quelqu'un » — **L**

- **Fiche source** (`n5_v_700`, pronom) : traductions « Quelqu'un ; N'importe qui (dans une phrase affirmative) ». Nuance : « Pronom indéfini composé du pronom interrogatif *dare* (qui) et de la particule interrogative/indéfinie *ka*, désignant une personne indéterminée (« quelqu'un »). » Exemple : « きょうしつ に 誰か が い ます 。 » — « Il y a quelqu'un dans la classe. »
- **État publié** : sens 1 sur 1 ; traduction « Quelqu'un » (N'importe qui) ; catégorie `null` ; type `personne` ; dimensions aucune ; fonctions aucune ; classe `pronom`.
- **Justification historique** : D0724 (lot 11) : « Personne indéterminée : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4) ; pas de fonction interrogative (誰か n'interroge pas), ni deictique (référent indéterminé, non repéré par la situation d'énonciation, A7) Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « personne générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : Dans la même famille source, 女の子 « Fille » et 男の子 « Garçon » sont en être humain › cycle de vie › enfance, 大人 « Adulte » en âge adulte, 子供 « Enfant » en enfance : chacun de ces mots dit un âge de la vie. Les autres noms de personnes sans précision (人, 方, 女, 男, 誰か, 自分) sont sans catégorie.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit un « pronom indéfini […] désignant une personne indéterminée » ; l'exemple dit « il y a quelqu'un dans la classe ». Une personne quelconque, sans domaine. D0724 écarte `interrogatif` et `deictique` par une lecture de la fiche qui tient : le mot n'interroge pas et ne repère rien dans la situation. Sa citation d'A2-GLOBAL §4.4 est exacte.

#### `v_691_s1` · 自分 (じぶん) · « Soi-même » — **L**

- **Fiche source** (`n5_v_691`, pronom) : traductions « Soi-même ; Soi ; Moi-même ; Personnellement ». Nuance : « Pronom réfléchi composé des kanjis signifiant « soi » et « partie / part », utilisé pour désigner sa propre personne (« soi-même » ou « je / mon propre »). » Exemple : « 自分 で りょうり を し ます 。 » — « Je fais la cuisine par moi-même. »
- **État publié** : sens 1 sur 1 ; traduction « Soi-même » (Soi) ; catégorie `null` ; type `personne` ; dimensions aucune ; fonctions aucune ; classe `pronom`.
- **Justification historique** : D0730 (lot 11) : « Pronom réfléchi : « personne générique », sans domaine thématique ; pas de fonction deictique (A7 : référence déterminée par la syntaxe, §3.1 ; l'emploi « je », conservé en nuance, ne fait pas partie intégrante du sens modélisé, §4) Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « personne générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : Dans la même famille source, 女の子 « Fille » et 男の子 « Garçon » sont en être humain › cycle de vie › enfance, 大人 « Adulte » en âge adulte, 子供 « Enfant » en enfance : chacun de ces mots dit un âge de la vie. Les autres noms de personnes sans précision (人, 方, 女, 男, 誰か, 自分) sont sans catégorie.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit un « pronom réfléchi […] utilisé pour désigner sa propre personne » ; l'exemple dit « je fais la cuisine par moi-même ». Le sens désigne la personne dont on parle, sans domaine thématique. D0730 a examiné `deictique` au regard d'A7 et l'a écarté, la référence venant de la syntaxe ; cette lecture tient. Aucune autre fonction définie ne s'applique.

#### `v_606_s1` · 皆 (みんな) · « Tout le monde » — **C**

- **Fiche source** (`n5_v_606`, pronom) : traductions « Tout le monde ; Tous ; Ensemble ». Nuance : « Pronom / adverbe désignant l'ensemble d'un groupe de personnes. S'écrit très fréquemment en hiragana (*みんな*) dans la vie de tous les jours. » Exemple : « みんな で ごはん を たべ まし た 。 » — « Tout le monde a mangé ensemble. »
- **État publié** : sens 1 sur 1 ; traduction « Tout le monde » (Tous) ; catégorie `null` ; type `groupe_collectif` ; dimensions aucune ; fonctions aucune ; classe `pronom`.
- **Justification historique** : D0732 (lot 11) : « Ensemble de personnes : « personne générique », hors de la hiérarchie thématique, comme 皆さん (lot 01) Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « personne générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Nombres & quantification : « Totalité & partie → Totalité ; Partie ; Majorité / minorité ; Reste » ; Relations sociales : « Groupes & appartenance sociale → Membres ; Groupes ; Communautés ; Appartenance ». A9, §3.4 : « un mot qui prédique la quantité […] ou qui désigne une quantité n'est pas un quantificateur ».
- **Comparables examinés** : 大勢 « Beaucoup de monde » (lot 24, D1517), « utilisé exclusivement pour désigner une grande foule ou un nombre élevé de personnes », est en nombres et quantification › quantité › grande quantité, type `groupe_collectif` : « la catégorie grande quantité porte l'aspect quantitatif ». 全部 « Tout », de la même famille source que 皆 (`adverbes_expressions / quantite`), est en totalité et partie › totalité. 皆さん est sans catégorie.
- **Verdict proposé** : **C**.
- **Motivation** : La fiche décrit un « pronom / adverbe désignant l'ensemble d'un groupe de personnes » ; l'exemple dit « tout le monde a mangé ensemble ». Le sens n'est pas une personne quelconque : c'est la totalité d'un groupe. Le lot 24 a arbitré, pour 大勢, qu'un mot désignant des personnes par leur nombre porte la catégorie de quantité, le type disant qu'il s'agit de personnes. Le même raisonnement vaut ici pour la totalité, que le registre nomme. La raison de D0732 (lot 11) étend « personne générique » à un ensemble, ce que ni A2-L3 ni A2-GLOBAL ne disent, et elle est antérieure à cet arbitrage.
- **Correction proposée** : `category` : `null` → `nombres_quantification › totalite_partie › totalite`. L'avertissement `categorie-nulle` cesserait. Le type `groupe_collectif` n'est pas touché ; aucune fonction n'est proposée (le mot désigne, A9 §3.4).
- **Réserve** : Si l'arbitrage tient au contraire qu'un mot qui désigne des personnes reste une « personne générique », le `null` se maintient et le cas est reclassé L ; c'est alors la catégorie de 大勢 qui serait à examiner au volet 1. Dans les deux cas, 皆 et 大勢 ne sont pas traités de la même façon aujourd'hui.

#### `v_687_s1` · 皆さん (みなさん) · « Tout le monde » — **C**

- **Fiche source** (`n5_v_687`, nom) : traductions « Tout le monde ; Mesdames et messieurs ; Tous ». Nuance : « Nom / expression de politesse formé à partir du mot *minna* (tous) suivi du suffixe honorifique *-san*, utilisé pour s'adresser poliment à un groupe de personnes. » Exemple : « 皆さん 、 おはよう ござい ます 。 » — « Bonjour à tout le monde ! »
- **État publié** : sens 1 sur 1 ; traduction « Tout le monde » (Vous tous, Mesdames et messieurs) ; catégorie `null` ; type `groupe_collectif` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D0103 (lot 01) : « Ensemble de personnes quelconque : « personne générique », hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « personne générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Nombres & quantification : « Totalité & partie → Totalité ; Partie ; Majorité / minorité ; Reste » ; Relations sociales : « Groupes & appartenance sociale → Membres ; Groupes ; Communautés ; Appartenance ». A9, §3.3 : « la politesse n'est pas le registre : une marque de registre poli ou formel (forme polie d'un mot, pronom de respect, interrogatif poli) ne suffit pas à attribuer la fonction ».
- **Comparables examinés** : 皆 « Tout le monde », dont 皆さん est la forme honorifique, et 大勢 « Beaucoup de monde » (nombres et quantification › quantité › grande quantité, `groupe_collectif`).
- **Verdict proposé** : **C**.
- **Motivation** : La fiche décrit une expression « formée à partir du mot minna (tous) suivi du suffixe honorifique -san, utilisée pour s'adresser poliment à un groupe de personnes » ; l'exemple dit « bonjour à tout le monde ! ». Le sens est le même ensemble que 皆, dit avec respect : la totalité des personnes à qui l'on s'adresse. Le respect est un registre, non une fonction (A9, §3.3), et ne change pas le domaine. Ce qui vaut pour 皆 vaut ici, sur la lecture de cette fiche : la totalité est nommée par le registre, et 大勢 est traité par la quantité. D0103 (lot 01) parle d'un « ensemble de personnes quelconque », ce que la fiche ne dit pas : elle parle de tous.
- **Correction proposée** : `category` : `null` → `nombres_quantification › totalite_partie › totalite`. L'avertissement `categorie-nulle` cesserait. Aucune fonction n'est proposée.
- **Réserve** : Même réserve que pour 皆. L'emploi d'adresse (« Mesdames et messieurs ») est une alternative publiée ; s'il était jugé central, la totalité décrirait moins bien le sens.

### B · États (8 cas)

#### `v_361_s1` · 違う (ちがう) · « Être différent » — **L**

- **Fiche source** (`n5_v_361`, verbe) : traductions « Être différent ; Se tromper ; C'est faux ; Être incorrect ». Nuance : « Verbe du groupe u (godan) exprimant la différence entre deux éléments, ou signifiant qu'une information est erronée ("c'est faux" / "non, ce n'est pas ça"). Les romajis associés sont (*chigau*). » Exemple : « いいえ 、それ は 違います 。 » — « Non, c'est différent (ou : ce n'est pas exact). »
- **État publié** : sens 1 sur 2 ; traduction « Être différent » ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; classe `verbe`. Autres sens : « Être incorrect » (`null`, `etat`).
- **Justification historique** : D1325 (lot 20) : « La différence entre deux éléments : état général, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « identité / différence » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 同じ « Même » (`v_438_s1`) est sans catégorie, pour l'identité. Aucun sens publié ne range la différence dans un domaine.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit un verbe « exprimant la différence entre deux éléments » ; l'exemple se traduit « non, c'est différent ». La différence est nommée par l'architecture parmi les éléments hors hiérarchie : l'absence de catégorie est sa réponse, non une difficulté de classement. D1325 parle d'« état général », formule qui n'est pas dans la liste ; le fondement exact est « identité / différence ». La conclusion tient.
- **Réserve** : Le document historique `02_Ocha_Stress_Test_N5_N2.md` (§7) disait que 違う ne devait pas « tomber en NULL ». Il n'est pas normatif, et le snapshot final range l'identité et la différence hors de la hiérarchie : il ne fonde aucun écart.

#### `v_361_s2` · 違う (ちがう) · « Être incorrect » — **L**

- **Fiche source** (`n5_v_361`, verbe) : traductions « Être différent ; Se tromper ; C'est faux ; Être incorrect ». Nuance : « Verbe du groupe u (godan) exprimant la différence entre deux éléments, ou signifiant qu'une information est erronée ("c'est faux" / "non, ce n'est pas ça"). Les romajis associés sont (*chigau*). » Exemple : « いいえ 、それ は 違います 。 » — « Non, c'est différent (ou : ce n'est pas exact). »
- **État publié** : sens 2 sur 2 ; traduction « Être incorrect » (Se tromper) ; catégorie `null` ; type `etat` ; dimensions `exactitude_inexactitude:inexactitude` ; fonctions aucune ; classe `verbe`. Autres sens : « Être différent » (`null`, `etat`).
- **Justification historique** : D1326 (lot 20) : « Une information erronée : état général, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « validité / adéquation » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-GLOBAL-v1, §11 : « préférer `category: null` à une catégorie artificielle ».
- **Comparables examinés** : ちょうど « Exactement », qui porte le pôle opposé du même axe (`exactitude`), est sans catégorie. Aucun sens publié ne range l'erreur dans un domaine.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit que le verbe signifie aussi « qu'une information est erronée » ; l'exemple se traduit aussi « ce n'est pas exact ». L'inexactitude n'a pas de domaine : A2-DIM la porte par un axe, que ce sens a reçu (D1368), et la validité est hors hiérarchie. « Communication » décrirait le fait de parler, non le caractère erroné de ce qui est dit. La raison de D1326 tient par sa conclusion.

#### `v_512_s1` · 大丈夫 (だいじょうぶ) · « Ça va » — **L**

- **Fiche source** (`n5_v_512`, adjectif en na) : traductions « Ça va ; Pas de problème ; En sécurité ; Correct ; Tout va bien ». Nuance : « Adjectif en na (utilisé comme expression autonome) signifiant que tout est en ordre, qu'il n'y a pas lieu de s'inquiéter ou pour rassurer quelqu'un. » Exemple : « 「 しんぱい しないで 、 大丈夫 です 。」 » — « « Ne t'inquiète pas, ça va. » »
- **État publié** : sens 1 sur 1 ; traduction « Ça va » (Pas de problème, Tout va bien) ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; classe `adjectif_na`.
- **Justification historique** : D1125 (lot 16) : « Aucune catégorie primaire pertinente : « tout va bien » est l'état général d'une personne ou d'une situation, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 元気 « En forme » est en être humain › états et besoins physiques › fatigue et énergie physique : sa fiche ne parle que de la personne (« énergie vitale, bonne santé, dynamisme »). 大丈夫 n'a pas de voisin de même portée.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit que « tout est en ordre, qu'il n'y a pas lieu de s'inquiéter », « ou pour rassurer quelqu'un » ; l'exemple dit « ne t'inquiète pas, ça va ». La fiche ne limite pas le mot à la santé ni à la personne : il vaut d'une situation autant que de quelqu'un. La catégorie de 元気 serait trop étroite. L'emploi pour rassurer reste en nuance (doctrine du lot 16, reprise par A9 §2.1). La raison de D1125 tient.

#### `v_516_s1` · ある (ある) · « Y avoir » — **L**

- **Fiche source** (`n5_v_516`, verbe) : traductions « Exister ; Y avoir ; Posséder ; Se trouver (pour les objets inanimés) ». Nuance : « Verbe intransitif (groupe u) fondamental exprimant l'existence, la présence ou la possession de choses inanimées (objets, lieux, concepts abstraits), par opposition à *iru* pour les êtres vivants. » Exemple : « つくえ の うえ に ほん が ある 。 » — « Il y a un livre sur le bureau. »
- **État publié** : sens 1 sur 2 ; traduction « Y avoir » (Exister, Se trouver (pour les objets inanimés)) ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; classe `verbe`. Autres sens : « Posséder » (`null`, `etat`).
- **Justification historique** : D1303 (lot 20) : « L'existence ou la présence d'une chose : état général, sans domaine thématique propre ; aucune catégorie du registre ne nomme l'existence. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-DIM-v1, §5 : « existence/absence » et « transformation/modification » sont des familles « non promues à ce stade » ; elles ne sont pas non plus des catégories.
- **Comparables examinés** : 居る « Y avoir (êtres vivants) » est sans catégorie. Les noms de position (上, 中, 外) sont en espace › position et localisation : ils disent où, non qu'une chose existe.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « l'existence, la présence […] de choses inanimées » ; l'exemple dit « il y a un livre sur le bureau ». Aucune catégorie d'A2-L3 ne nomme l'existence ; A2-DIM l'a examinée comme famille et ne l'a pas promue. « Position et localisation » décrit des positions relatives, non le fait d'exister ou d'être présent. La raison de D1303 tient.

#### `v_516_s2` · ある (ある) · « Posséder » — **L**

- **Fiche source** (`n5_v_516`, verbe) : traductions « Exister ; Y avoir ; Posséder ; Se trouver (pour les objets inanimés) ». Nuance : « Verbe intransitif (groupe u) fondamental exprimant l'existence, la présence ou la possession de choses inanimées (objets, lieux, concepts abstraits), par opposition à *iru* pour les êtres vivants. » Exemple : « つくえ の うえ に ほん が ある 。 » — « Il y a un livre sur le bureau. »
- **État publié** : sens 2 sur 2 ; traduction « Posséder » ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; classe `verbe`. Autres sens : « Y avoir » (`null`, `etat`).
- **Justification historique** : D1304 (lot 20) : « La possession d'une chose : état général, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « inclusion / appartenance » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : 持つ, sens 2 « Posséder », est sans catégorie. Aucun sens publié ne range la possession dans un domaine ; l'économie ne nomme que l'argent, le prix, l'achat et la vente.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit aussi « la possession de choses inanimées » ; l'exemple illustre le sens 1, et ce sens repose sur le texte de la fiche. Avoir quelque chose n'est pas un domaine thématique : A2-L3 n'a pas de catégorie de la possession, et l'appartenance est hors hiérarchie. La raison de D1304 tient.

#### `v_548_s1` · 居る (いる) · « Y avoir (pour les êtres vivants) » — **L**

- **Fiche source** (`n5_v_548`, verbe) : traductions « Être ; Se trouver ; Y avoir (pour les êtres vivants) ». Nuance : « Verbe intransitif (groupe ichidan / ru) exprimant l'existence ou la présence d'êtres animés (humains et animaux), par opposition à *aru* qui s'emploie pour les objets inanimés. » Exemple : « へや の なか に こども が 居ます 。 » — « Il y a un enfant dans la pièce. »
- **État publié** : sens 1 sur 1 ; traduction « Y avoir (pour les êtres vivants) » (Être, Se trouver) ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; classe `verbe`.
- **Justification historique** : D1307 (lot 20) : « L'existence ou la présence d'un être vivant : état général, sans domaine thématique propre, comme ある. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-DIM-v1, §5 : « existence/absence » et « transformation/modification » sont des familles « non promues à ce stade » ; elles ne sont pas non plus des catégories.
- **Comparables examinés** : ある, sens 1 « Y avoir », est sans catégorie pour la même notion appliquée aux choses.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « l'existence ou la présence d'êtres animés (humains et animaux) » ; l'exemple dit « il y a un enfant dans la pièce ». Que le sujet soit vivant ne donne pas de domaine : le sens est l'existence, non l'être vivant. Aucune catégorie ne la nomme. La raison de D1307 tient.

#### `v_573_s1` · 要る (いる) · « Avoir besoin de » — **L**

- **Fiche source** (`n5_v_573`, verbe) : traductions « Avoir besoin de ; Être nécessaire ; Falloir ». Nuance : « Verbe intransitif (groupe u exceptionnel - i/e ru) exprimant la nécessité ou le besoin de quelque chose (s'emploie généralement avec la particule *ga* pour l'objet requis). Homophone parfait de 居る et いる (exister). » Exemple : « あたらしい ぱソコン が 要り ます 。 » — « J'ai besoin d'un nouvel ordinateur. »
- **État publié** : sens 1 sur 1 ; traduction « Avoir besoin de » (Être nécessaire, Falloir) ; catégorie `null` ; type `etat` ; dimensions `necessite_facultativite:necessite` ; fonctions aucune ; classe `verbe`.
- **Justification historique** : D1313 (lot 20) : « Avoir besoin de quelque chose : état général, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « possibilité / nécessité » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : Aucun autre sens publié n'exprime la nécessité. « États et besoins physiques » nomme le sommeil, la faim, la fatigue : des besoins du corps, non le besoin d'un objet.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « la nécessité ou le besoin de quelque chose » ; l'exemple dit « j'ai besoin d'un nouvel ordinateur ». La nécessité est nommée parmi les éléments hors hiérarchie, et A2-DIM la porte par un axe, que ce sens a reçu (D1366). D1313 parle d'« état général » ; le fondement exact est « possibilité / nécessité ». La conclusion tient.

#### `v_665_s2` · 持つ (もつ) · « Posséder » — **L**

- **Fiche source** (`n5_v_665`, verbe) : traductions « Tenir ; Porter (en main) ; Posséder ; Avoir sur soi ». Nuance : « Verbe transitif (groupe u) exprimant l'action physique de tenir ou de porter quelque chose dans ses mains, ou par extension de posséder un objet ou un sentiment. » Exemple : « かばん を 持っ て いき ます 。 » — « Je porte (tiens) mon sac en y allant. »
- **État publié** : sens 2 sur 2 ; traduction « Posséder » ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; classe `verbe`. Autres sens : « Tenir » (`null`, `action`).
- **Justification historique** : D1311 (lot 20) : « Posséder un objet ou avoir un sentiment : état général, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « inclusion / appartenance » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : ある, sens 2 « Posséder », est sans catégorie. Le sens 1 de la même ENTRY, « Tenir », est lui aussi sans catégorie (audité à part).
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit, « par extension », le fait « de posséder un objet ou un sentiment » ; l'exemple illustre le sens 1. Un objet et un sentiment relèvent de domaines différents : aucune catégorie ne couvre ce que l'on possède, et la possession elle-même n'en a pas. La raison de D1311 tient.

### C · Événements et processus (6 cas)

#### `v_524_s1` · なる (なる) · « Devenir » — **L**

- **Fiche source** (`n5_v_524`, verbe) : traductions « Devenir ; Se transformer en ; Prendre forme ». Nuance : « Verbe intransitif (groupe u) exprimant un changement d'état, de condition, de statut ou de temps (souvent associé aux particules *ni* pour les noms et *ku* pour les adjectifs en i). » Exemple : « いしゃ に なる 。 » — « Je vais devenir médecin. »
- **État publié** : sens 1 sur 1 ; traduction « Devenir » (Se transformer en) ; catégorie `null` ; type `evenement` ; dimensions aucune ; fonctions aucune ; classe `verbe`.
- **Justification historique** : D1321 (lot 20) : « Devenir, changer d'état : événement général, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-DIM-v1, §5 : « existence/absence » et « transformation/modification » sont des familles « non promues à ce stade » ; elles ne sont pas non plus des catégories.
- **Comparables examinés** : 変える « Changer » (transitif) est sans catégorie. Aucun sens publié ne range le changement dans un domaine.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « un changement d'état, de condition, de statut ou de temps » ; l'exemple dit « je vais devenir médecin ». La fiche énumère elle-même quatre domaines : aucun ne décrit le sens. A2-DIM a examiné la transformation comme famille et ne l'a pas promue. La raison de D1321 tient. Le verdict ne dépend pas de la fonction `aspect`, non définie.

#### `v_560_s1` · 消える (きえる) · « S'éteindre » — **L**

- **Fiche source** (`n5_v_560`, verbe) : traductions « S'éteindre ; Disparaître ; S'effacer ». Nuance : « Verbe intransitif (groupe ichidan / ru) exprimant le fait qu'une lumière, un feu ou une source d'énergie s'éteint de lui-même, ou qu'une chose/personne disparaît de la vue (la contrepartie transitive étant *kesu* 消す). » Exemple : « へや の でんき が 消え まし た 。 » — « La lumière de la pièce s'est éteinte. »
- **État publié** : sens 1 sur 2 ; traduction « S'éteindre » ; catégorie `null` ; type `evenement` ; dimensions aucune ; fonctions aucune ; classe `verbe`. Autres sens : « Disparaître » (`null`, `evenement`).
- **Justification historique** : D1185 (lot 18) : « Une lumière, un feu ou une source d'énergie qui s'éteint : événement général, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ».
- **Comparables examinés** : 消す « Éteindre » et 付ける « Allumer » (transitifs) sont sans catégorie. 電気, sens 2 « Lumière », est en habitat › équipements domestiques : c'est l'éclairage, un objet.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « une lumière, un feu ou une source d'énergie » qui « s'éteint de lui-même » ; l'exemple dit « la lumière de la pièce s'est éteinte ». L'exemple porte sur un éclairage, mais la fiche couvre aussi le feu et toute source d'énergie : la catégorie de l'éclairage domestique serait trop étroite. La raison de D1185 tient.

#### `v_560_s2` · 消える (きえる) · « Disparaître » — **L**

- **Fiche source** (`n5_v_560`, verbe) : traductions « S'éteindre ; Disparaître ; S'effacer ». Nuance : « Verbe intransitif (groupe ichidan / ru) exprimant le fait qu'une lumière, un feu ou une source d'énergie s'éteint de lui-même, ou qu'une chose/personne disparaît de la vue (la contrepartie transitive étant *kesu* 消す). » Exemple : « へや の でんき が 消え まし た 。 » — « La lumière de la pièce s'est éteinte. »
- **État publié** : sens 2 sur 2 ; traduction « Disparaître » (S'effacer) ; catégorie `null` ; type `evenement` ; dimensions aucune ; fonctions aucune ; classe `verbe`. Autres sens : « S'éteindre » (`null`, `evenement`).
- **Justification historique** : D1186 (lot 18) : « Disparaître de la vue : événement général, sans domaine thématique propre, comme le sens « apparaître » de 出る (lot 04). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ».
- **Comparables examinés** : 出る, sens 3 « Apparaître », son contraire, est sans catégorie. « Sens et perception › vue » nomme la perception, non le fait de cesser d'être visible.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit aussi « qu'une chose / personne disparaît de la vue » ; l'exemple illustre le sens 1. Disparaître n'est pas percevoir : la catégorie de la vue décrirait celui qui regarde, non ce qui disparaît. Aucun domaine ne nomme l'apparition ni la disparition. La raison de D1186 tient.

#### `v_579_s1` · 閉まる (しまる) · « Se fermer » — **L**

- **Fiche source** (`n5_v_579`, verbe) : traductions « Se fermer ; Être fermé ». Nuance : « Verbe intransitif (groupe u) exprimant le fait qu'une porte, une fenêtre ou un magasin se ferme de lui-même ou est fermé (la contrepartie transitive étant *shimeru* 閉める). » Exemple : « ドア が 閉り まし た 。 » — « La porte s'est fermée. »
- **État publié** : sens 1 sur 1 ; traduction « Se fermer » ; catégorie `null` ; type `evenement` ; dimensions aucune ; fonctions aucune ; classe `verbe`.
- **Justification historique** : D1178 (lot 18) : « Une porte, une fenêtre ou un magasin qui se ferme : événement général, sans domaine thématique propre, comme 開く. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « transitif / intransitif » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : 閉める « Fermer » (transitif) et 開く « S'ouvrir » sont sans catégorie. ドア, 戸, 窓 sont en environnement construit › éléments architecturaux › portes et fenêtres : ce sont les objets.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « une porte, une fenêtre ou un magasin » qui « se ferme de lui-même ou est fermé » ; l'exemple dit « la porte s'est fermée ». Le magasin qui ferme sort du domaine des portes et fenêtres : ranger le verbe avec ces objets ferait du contexte d'usage un domaine, ce qu'A2-L3 écarte (§7, règle 1). La raison de D1178 tient.

#### `v_710_s1` · 開く (あく) · « S'ouvrir » — **L**

- **Fiche source** (`n5_v_710`, verbe) : traductions « S'ouvrir ; Être ouvert ». Nuance : « Verbe intransitif (groupe u) exprimant l'action d'une porte, d'une fenêtre, d'un magasin ou d'un contenant qui s'ouvre de lui-même ou par une action (à ne pas confondre avec le verbe transitif *akeru* ou le verbe *hiraku*). » Exemple : « ドア が 開き ます 。 » — « La porte s'ouvre. »
- **État publié** : sens 1 sur 1 ; traduction « S'ouvrir » ; catégorie `null` ; type `evenement` ; dimensions aucune ; fonctions aucune ; classe `verbe`.
- **Justification historique** : D1169 (lot 18) : « Une porte, une fenêtre, un magasin ou un contenant qui s'ouvre : événement général, sans domaine thématique propre ; « portes et fenêtres » ne couvrirait ni le magasin ni le contenant. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « transitif / intransitif » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : 開ける « Ouvrir » (transitif) et 閉まる « Se fermer » sont sans catégorie.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « une porte, une fenêtre, un magasin ou un contenant qui s'ouvre » ; l'exemple dit « la porte s'ouvre ». D1169 l'écrit : « portes et fenêtres » ne couvrirait ni le magasin ni le contenant. Aucun domaine ne nomme l'ouverture. La raison tient.

#### `v_80_s2` · 曇る (くもる) · « S'embuer » — **L**

- **Fiche source** (`n5_v_80`, verbe godan) : traductions « Devenir nuageux ; Se couvrir (ciel) ; S'embuer (lunettes, vitre) ». Nuance : « Verbe godan désignant le fait que le ciel se couvre de nuages, ou par extension qu'une surface vitrée ou des lunettes s'embuent. » Exemple : « 朝 は 晴れていた のに 、昼 から 曇って きました 。 » — « Le temps était clair ce matin, mais il a commencé à se couvrir depuis midi. »
- **État publié** : sens 2 sur 2 ; traduction « S'embuer » ; catégorie `null` ; type `processus` ; dimensions aucune ; fonctions aucune ; classe `verbe`. Autres sens : « Se couvrir (le ciel) » (`monde_naturel › meteo › nuages`, `processus`).
- **Justification historique** : D0466 (lot 07) : « Une surface qui s'embue : phénomène physique général, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Se couvrir (le ciel) », est en monde naturel › météo › nuages. Aucun autre sens publié ne décrit la buée.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche dit que le verbe désigne aussi, « par extension », le fait « qu'une surface vitrée ou des lunettes s'embuent » ; l'exemple illustre le sens 1. La buée sur une vitre n'est pas un phénomène du ciel : la catégorie météo du sens 1 ne s'étend pas à ce sens, et aucun domaine ne nomme ce phénomène. La raison de D0466 tient.

### D · Fiches qui débordent un domaine (3 cas)

#### `v_163_s1` · かかる (かかる) · « Prendre (du temps ou de l'argent) » — **L**

- **Fiche source** (`n5_v_163`, verbe godan) : traductions « Prendre (du temps ou de l'argent) ; Coûter ; Prendre du temps ». Nuance : « Verbe godan polyvalent servant à indiquer l'exigence ou la consommation d'une ressource. Il s'associe principalement à une notion de durée temporelle ou à un montant financier. S'écrit le plus souvent directement en hiragana au niveau N5 bien qu'il soit issu du kanji 掛かる (kakaru). » Exemple : « うち から 会社 まで 1時間 掛かります 。 » — « Il faut une heure de chez moi jusqu'à l'entreprise. »
- **État publié** : sens 1 sur 1 ; traduction « Prendre (du temps ou de l'argent) » (Coûter) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `verbe`.
- **Justification historique** : D1344 (lot 20) : « Ce qu'une chose exige en temps ou en argent : la durée relèverait du temps et le prix de l'économie ; aucun domaine ne couvre les deux, et le sens est unique. Propriété sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ». A2-GLOBAL-v1, §11 : « préférer `category: null` à une catégorie artificielle ».
- **Comparables examinés** : する, sens 2 « Coûter (pour un prix) », est en économie et commerce › prix et valeur économique › prix : sa fiche ne parle que d'« un montant financier ». 高い est scindé en « Haut » et « Cher ». かかる garde un sens unique pour le temps et l'argent.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « l'exigence ou la consommation d'une ressource », « une notion de durée temporelle ou un montant financier » ; l'exemple porte sur le temps (« il faut une heure »). Le sens publié réunit les deux ressources : la durée relèverait du temps, le coût de l'économie, et ni l'une ni l'autre catégorie ne décrit le sens entier. Une catégorie ne s'impose pas quand la fiche déborde son domaine (doctrine du lot 19). La raison de D1344 tient.
- **Réserve** : Ce `null` découle du choix de garder un seul sens (D1343). Si le sens était scindé comme celui de 高い, chaque moitié aurait une catégorie. Le découpage n'est pas l'objet de cet audit ; je le signale au volet 1.

#### `v_496_s1` · ちょうど (ちょうど) · « Exactement » — **L**

- **Fiche source** (`n5_v_496`, adverbe) : traductions « Exactement ; Juste ; Précisément ». Nuance : « Adverbe indiquant qu'une mesure, une heure, une quantité ou une coïncidence correspond parfaitement sans excès ni manque. » Exemple : « いま ちょうど じゅうじ です 。 » — « Il est exactement dix heures maintenant. »
- **État publié** : sens 1 sur 1 ; traduction « Exactement » (Juste, Précisément) ; catégorie `null` ; type `propriete` ; dimensions `exactitude_inexactitude:exactitude` ; fonctions aucune ; classe `adverbe`.
- **Justification historique** : D1562 (lot 24) : « L'exactitude d'une mesure, d'une heure, d'une quantité ou d'une coïncidence : la fiche couvre plusieurs domaines, et aucune catégorie ne les nomme tous ; la dimension porte le sens. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « validité / adéquation » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-GLOBAL-v1, §11 : « préférer `category: null` à une catégorie artificielle ».
- **Comparables examinés** : 違う, sens 2 « Être incorrect », porte le pôle opposé du même axe et est sans catégorie. 大体 « À peu près » est en nombres et quantification › approximation quantitative : sa fiche ne parle que de quantité.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « une mesure, une heure, une quantité ou une coïncidence » qui « correspond parfaitement » ; l'exemple dit « il est exactement dix heures ». Quatre domaines sont nommés par la fiche même : aucun ne décrit le sens, que porte la dimension `exactitude` (D1561). La raison de D1562 tient.

#### `v_675_s1` · 次 (つぎ) · « Suivant » — **L**

- **Fiche source** (`n5_v_675`, nom) : traductions « Suivant ; Prochain ; Ensuite ». Nuance : « Nom / adjectif en -no indiquant ce qui vient immédiatement après dans l'ordre, le temps ou l'espace. » Exemple : « 次 の えき で おり ます 。 » — « Je descends à la prochaine gare. »
- **État publié** : sens 1 sur 1 ; traduction « Suivant » (Prochain, Ensuite) ; catégorie `null` ; type `concept_abstrait` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D1351 (lot 20) : « Aucune catégorie (arbitrage des choix du lot 20) : la proposition rangeait ce sens dans temps › chronologie › succession. La fiche dit explicitement « dans l'ordre, le temps ou l'espace » : classer le sens entier dans le seul domaine du temps serait artificiel, et aucun domaine thématique ne couvre cette généralité. Type concept_abstrait, comme le sens « avant (dans le temps) » de 前 (lot 10). La fiche dit « nom / adjectif en -no » : la classe mécanique est nom, et l'emploi avec の est dit en nuance. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-GLOBAL-v1, §11 : « préférer `category: null` à une catégorie artificielle ».
- **Comparables examinés** : 先, sens 2 « D'abord », est en temps › chronologie › avant / après ; 初めて est en temps › chronologie › succession : leurs fiches ne parlent que du temps. 次 est le seul de ces mots dont la fiche nomme aussi l'ordre et l'espace.
- **Verdict proposé** : **L**.
- **Motivation** : La fiche décrit « ce qui vient immédiatement après dans l'ordre, le temps ou l'espace » ; l'exemple dit « je descends à la prochaine gare », une succession dans une ligne, non dans le temps. La catégorie « succession » appartient au temps : elle ne décrirait qu'un des trois domaines que la fiche nomme. La raison de D1351, arbitrée au lot 20, tient.

### E · また, sens 2 (1 cas)

#### `v_500_s2` · また (また) · « Aussi » — **F**

- **Fiche source** (`n5_v_500`, adverbe) : traductions « À nouveau ; Encore ; Aussi ; De plus ». Nuance : « Adverbe exprimant la répétition d'une action ou le retour d'un état (« à nouveau, une fois de plus »), ou servant à lier des arguments (« de plus ») et à prendre congé (« à plus / à bientôt » avec *mata ne*). » Exemple : « また あいましょう 。 » — « Regardons-nous à nouveau (ou : à bientôt). »
- **État publié** : sens 2 sur 2 ; traduction « Aussi » (De plus) ; catégorie `null` ; type `null` ; dimensions aucune ; fonctions aucune ; classe `adverbe`. Autres sens : « À nouveau » (`null`, `concept_abstrait`).
- **Justification historique** : D1380 (lot 21) : « L'ajout d'un élément à ce qui précède : une relation de discours, sans domaine thématique (A2-LING-v1, §5 : une fonction discursive ne fait pas une catégorie). Addendum A5. »
- **Normes appliquées** : A5, §2 : « pour une unité principalement grammaticale ou pragmatique, une fonction linguistique le justifie directement ». A9, §4.1 : « un sens qui porte une fonction et n'a pas de domaine thématique a `category: null` ; la fonction le justifie (A5) ». A2-LING-v1, §5 : « fonction discursive ≠ domaine Communication ».
- **Comparables examinés** : Les sens de liaison publiés (しかし, でも, それから, そうして, では, それでは, じゃあ, じゃ) sont sans catégorie et portent `connecteur` : leur `null` ne produit aucun avertissement.
- **Verdict proposé** : **F**.
- **Motivation** : La fiche dit que また sert « à lier des arguments ("de plus") ». Le `category: null` est juste : une fonction discursive ne fait pas un domaine. Mais il n'est aujourd'hui justifié que par une décision `categorie-nulle` (D1380), parce que la fonction manquait. Avec `connecteur`, retenu à l'arbitrage de la tranche des `type-nul`, la fonction justifie directement l'absence de catégorie (A5, §2 ; A9, §4.1), comme pour les autres sens de liaison.
- **Correction proposée** : La même que pour le `type-nul` de ce sens, déjà retenue : `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]`. `category` reste `null`. Une seule correction pour les deux avertissements.

## T2.6 Complétude

Contrôle par script : les 26 sens de cette tranche portent chacun un avertissement `categorie-nulle` de l'inventaire et ont chacun une décision de journal de cette nature. L = 23, F = 1, C = 2, N = 0 ; total 26.

---

# Tranche 3 · `categorie-nulle`, deuxième tranche : 29 cas

**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation) : L = 29, F = 0, C = 0, N = 0. Les 28 L proposés sont confirmés ; le seul C proposé, 冷たい sens 2, est **reclassé L** (la fiche ne décrit pas assez précisément un état psychologique), son `category: null` étant maintenu. Les réserves de 丈夫, 力 et 意味 sont arbitrées L ; les autres réserves documentaires sont conservées. **Cette tranche ne retient aucune correction.** Périmètre validé le même jour : les 29 `categorie-nulle` de la famille automatique « propriété générale ». Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n'est modifié.
**Reste à faire après cette tranche** : 65 `categorie-nulle` (« action générale » 36, « aucune catégorie ne nomme la notion » 18, « autre formulation » 11) ; aucun n'est commencé.

## T3.1 Résultat de la tranche

| Classement | Cas | Sens |
|---|---|---|
| **L** | 29 | `v_420_s1` いい ; `v_452_s1` 悪い ; `v_427_s2` まずい ; `v_434_s1` 危ない ; `v_484_s2` 重い ; `v_432_s1` 便利 ; `v_442_s1` 大切 ; `v_456_s1` 易しい ; `v_486_s1` 難しい ; `v_495_s2` 大変 ; `v_62_s1` 軽い ; `v_484_s1` 重い ; `v_428_s1` 丈夫 ; `v_451_s1` 強い ; `v_449_s1` 弱い ; `v_462_s1` 清い ; `v_646_s1` 力 ; `v_478_s1` 賑やか ; `v_489_s1` 静か ; `v_265_s2` 冷たい ; `v_464_s2` 甘い ; `v_422_s2` うるさい ; `v_461_s2` 汚い ; `v_462_s2` 清い ; `v_609_s2` 立派 ; `v_609_s1` 立派 ; `v_438_s1` 同じ ; `v_421_s1` いろいろ ; `v_513_s2` 意味 |
| **F** | 0 | — |
| **C** | 0 | — |
| **N** | 0 | — |
| **Total** | 29 | L + F + C + N = 29 |

**Cumul arbitré du volet 2** : 27 `type-nul` (L = 24, F = 1, C = 2, N = 0), 26 `categorie-nulle` (L = 23, F = 1, C = 2, N = 0) et ces 29 `categorie-nulle` (L = 29, F = 0, C = 0, N = 0), soit **82 cas arbitrés sur 147 : L = 76, F = 2, C = 4, N = 0**.

- **Aucune correction** n'est retenue dans cette tranche. La liste des corrections du volet 2 reste à cinq modifications de SENSE, dont aucune n'est exécutée.
- **Aucun N.**
- **9 fiches portent une réserve ou une note d'arbitrage** : `v_62_s1` 軽い ; `v_484_s1` 重い ; `v_428_s1` 丈夫 ; `v_646_s1` 力 ; `v_489_s1` 静か ; `v_265_s2` 冷たい ; `v_464_s2` 甘い ; `v_461_s2` 汚い ; `v_513_s2` 意味.
- **Un point de contrôle transversal est renvoyé au volet 1**, sans verdict : le traitement du caractère d'une personne (明るい, 暗い, 爽やか, sens 2, catégorisés ; 冷たい, sens 2, et まっすぐ, sens 2, sans catégorie).

## T3.2 Composition et méthode

La tranche est la famille « propriété générale » du criblage, prise en entier : les 29 sens dont la raison journalisée emploie cette formule (ou « propriété physique générale »). **Elle est définie par une formulation, non par le type `propriete`** : les comparaisons n'ont donc pas été limitées à la tranche. Les cinq sens de type `propriete` rangés dans d'autres familles (`v_424_s1` きれい, `v_458_s1` 有名, `v_506_s2` よく, `v_504_s2` ゆっくり, `v_525_s2` まっすぐ) ont été consultés comme comparables, fiche et décision lues ; **ils ne reçoivent aucun verdict ici**.

Pour chaque cas, individuellement : fiche source entière et exemple ; sens publié, nuance publiée et autres sens de l'ENTRY ; décision `categorie-nulle` et décisions voisines ; A5, A2-L3-v1 (§2, §5 à §8), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11), A2-DIM-v1 et A9 selon le cas ; sens comparables publiés. L'arbre des catégories d'A2-L3 (§5) a été relu pour chaque sens, à la recherche d'une catégorie qui le décrirait. Les fiches sont regroupées pour la lecture ; chaque verdict est motivé sur la fiche du cas.

**Un cas n'est audité qu'une fois.** Quatorze de ces sens étaient aussi candidats au criblage du volet 1 (fonction non examinée avant A9, dimension possible, même traduction dans deux ENTRY, point réservé). Chaque fiche traite ces relevés et dit ce qu'il en reste.

## T3.3 Ce que la lecture fait apparaître

**La formule est ici le bon fondement, sauf pour quatre sens.** « Propriété générale » figure dans la liste des éléments hors hiérarchie (A2-L3 §6, A2-GLOBAL §4.4), à la différence d'« état général » ou d'« événement général » (tranche précédente). Pour vingt-cinq sens, la fiche décrit bien une propriété qu'aucun domaine ne borne. Quatre reposent sur un autre fondement, que la fiche d'audit nomme : l'identité, élément distinct de la même liste (同じ) ; l'absence du poids dans l'arbre (軽い et 重い, sens 1) ; une fiche qui déborde par ses propres termes la catégorie la plus proche (力).

**Le caractère d'une personne n'est pas traité partout de la même façon.** C'est la seule divergence entre lots trouvée dans cette tranche. Trois sens publiés qui décrivent le tempérament d'une personne portent la catégorie être humain › psychologie et esprit › états psychologiques : 明るい « Enjoué » (lot 0), 暗い « Triste » et 爽やか « Vif » (lot 17, dont les décisions disent « le caractère d'une personne »). À l'inverse, la raison de まっすぐ « Honnête » (lot 22, D1411 ; hors tranche, sans verdict ici) dit que « le registre n'a pas de catégorie pour la personnalité ou le caractère ». Six sens de cette tranche qualifient une personne. Lus un par un, cinq jugent une conduite ou une valeur morale (甘い, うるさい, 汚い, 清い et 立派, sens 2) : la fiche ne dit pas ce que la personne éprouve, et ils sont L. Le sixième, 冷たい « Froid (attitude) », repose sur la seule traduction « Insensible (figuré) » : la proposition était C, par rapprochement avec les trois sens catégorisés ; **l'arbitrage l'a classé L**, la fiche ne décrivant pas assez précisément un état psychologique. **Le problème de cohérence demeure et devient un point de contrôle transversal du volet 1** : 明るい, 暗い et 爽やか (sens 2) d'un côté, 冷たい (sens 2) et まっすぐ « Honnête » de l'autre. Aucun verdict n'est pris sur ces comparables.

**Deux catégories ont été examinées que les lots n'avaient pas discutées** : « Propriétés des matériaux » pour 丈夫 « Solide », et « Capacités & aptitudes » pour 力 « Force ». Elles sont écartées toutes deux, sur la fiche ; l'arbitrage confirme L.

**Les relevés du criblage sont réglés dans les fiches.**

- Fonctions refusées avant A9 faute de définition (いろいろ, 同じ) ou jamais examinées (いい, 強い) : A9 définit depuis `quantificateur`, `comparatif` et `intensifieur`, et aucune ne s'applique ; les conclusions d'origine tiennent, par un motif désormais normatif.
- Emplois d'adresse réservés au lot 16 (悪い, 危ない) : A9, §2.1, les nomme et les laisse en nuance.
- Dimensions possibles (いろいろ, 重い sens 2, いい) : aucun axe ne décrit directement le sens. Pour 意味, sens 2, la question de l'axe utilité a été posée à l'arbitrage, qui confirme L sans dimension.
- Même traduction dans deux ENTRY (軽い / 薄い, 悪い / まずい, いい / じゃ) : les référents diffèrent ; aucun écart.

**Le point ouvert du lot 15 sur « la catégorie du poids »** reçoit une réponse pour le `null` : aucune catégorie existante ne convient, et le `null` est légitime. Je ne propose aucune catégorie nouvelle.

## T3.4 Corrections

**Aucune.** La correction proposée pour `v_265_s2` 冷たい (`category` : `null` → `etre_humain › psychologie_esprit › etats_psychologiques`) **n'est pas retenue** : le cas est classé L et garde `category: null`. La liste des corrections du volet 2 reste à cinq modifications de SENSE (また sens 2, 頭 sens 2, 表, 皆, 皆さん). **Rien n'est exécuté.**

**Points signalés, hors de l'objet de cet audit** : la traduction principale de 汚い, sens 2, « Grossier (langage) », ne nomme que la moitié du sens ; la traduction publiée de 冷たい, sens 2, « Distant », s'écarte de « Insensible ».

## T3.5 Les 29 fiches d'audit

### A · Jugements généraux, d'une chose ou d'une situation (5 cas)

#### `v_420_s1` · いい (いい) · « Bon » — **L**

- **Fiche source** (`n5_v_420`, adjectif en i) : traductions « Bon ; Bien ; Chouette ; Bienveillant ». Nuance : « Adjectif en i très courant exprimant la qualité positive, l'approbation ou la convenance. Sa forme de dictionnaire formelle est *yoi*, mais *ii* est beaucoup plus utilisé à l'oral au présent (les deux partagent les mêmes formes conjuguées en *yoi-*). » Exemple : « きょう は 良い てんき です ね 。 » — « Il fait bon temps aujourd'hui, n'est-ce pas ? »
- **État publié** : sens 1 sur 1 ; traduction « Bon » (Bien, Chouette, Bienveillant) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`.
- **Justification historique** : D0065 (lot 00) : « « Bon » : propriété générale, hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ». A9, §3.6 : l'`intensifieur` modifie le degré d'une propriété exprimée par un autre mot, « sans désigner lui-même la propriété, l'état ou l'action modifiés ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : 悪い « Mauvais » est sans catégorie. 美味しい « Délicieux » est en alimentation › goûts alimentaires et 上手 « Doué » en capacités et aptitudes › habileté : leurs fiches limitent le jugement à un aliment, à une activité. Hors tranche, sans verdict ici : きれい, sens 1 « Beau », et よく, sens 2 « Bien » (dont la raison renvoie à ce sens), sont sans catégorie. じゃ, sens 2, se traduit aussi « Bon » : c'est un mot de transition (`discours`), sans rapport de sens ; le criblage les rapprochait par la seule traduction (C3-b, C7-d).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit un adjectif « exprimant la qualité positive, l'approbation ou la convenance » ; l'exemple dit « il fait bon temps aujourd'hui ». Le jugement positif s'applique à n'importe quoi : aucun domaine d'A2-L3 ne le décrit, et c'est la propriété générale que l'architecture place hors hiérarchie. La citation d'A2-GLOBAL §4.4 par D0065 est exacte. Deux points du criblage sont réglés ici. Fonctions (C7-c) : la fiche ne décrit ni un mot qui modifie le degré d'un autre (`intensifieur`), ni un mot qui gère l'échange (`discours`) ; « l'approbation » y est une valeur de l'adjectif, non un emploi de réponse établi. Dimension : « la convenance » évoque l'axe adéquation, mais elle n'est qu'un des trois termes de la fiche ; l'axe ne décrit pas directement le sens, et aucune dimension n'est proposée.

#### `v_452_s1` · 悪い (わるい) · « Mauvais » — **L**

- **Fiche source** (`n5_v_452`, adjectif en i) : traductions « Mauvais ; Néfaste ; Coupable ; Désolé (formule polie) ». Nuance : « Adjectif en i qualifiant ce qui est moralement ou physiquement mauvais, de mauvaise qualité, ou utilisé pour s'excuser familièrement (« c'est ma faute / désolé »). » Exemple : « きょう は め が 悪い です 。 » — « Ma vue est mauvaise aujourd'hui. »
- **État publié** : sens 1 sur 1 ; traduction « Mauvais » ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`.
- **Justification historique** : D1098 (lot 16) : « Évaluation générale : « propriété générale », hors de la hiérarchie thématique, comme いい (lot 0). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A9, §2.1 : « l'emploi d'adresse d'un mot lexical (le refus pour 嫌, l'excuse pour 悪い, l'avertissement pour 危ない, la réplique pour 違う, la prise de congé pour また) reste en nuance, sans sens ni fonction ».
- **Comparables examinés** : いい « Bon » est sans catégorie. まずい, sens 1 « Mauvais (au goût) », est en alimentation › goûts alimentaires : sa fiche parle d'« un aliment qui a un mauvais goût » ; le criblage les rapprochait par la traduction (C1-a), les référents diffèrent. 下手 « Maladroit » est en capacités et aptitudes › habileté.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « ce qui est moralement ou physiquement mauvais, de mauvaise qualité » ; l'exemple dit « ma vue est mauvaise aujourd'hui ». Le moral, le physique, la qualité, et la vue dans l'exemple : la fiche nomme elle-même plusieurs domaines, et aucun ne décrit le sens. La raison de D1098 tient. Le point réservé au lot 16 (l'emploi d'excuse) est réglé par A9, qui le nomme : il reste en nuance, sans sens ni fonction `politesse`.

#### `v_427_s2` · まずい (まずい) · « Fâcheux » — **L**

- **Fiche source** (`n5_v_427`, adjectif en i) : traductions « Mauvais (goût) ; Désagréable (au goût) ; Impropre ; Fâcheux (situation critique) ». Nuance : « Adjectif en i qualifiant un aliment qui a un mauvais goût, ou familièrement une situation délicate (« c'est mal barré / c'est problématique »). » Exemple : « この りょうり は ちょっと まずい です 。 » — « Ce plat est un peu mauvais (immangeable). »
- **État publié** : sens 2 sur 2 ; traduction « Fâcheux » (Embarrassant) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Mauvais (au goût) » (`alimentation_cuisine › gouts_alimentaires`, `propriete`).
- **Justification historique** : D0197 (lot 02) : « Évaluation générale d'une situation : « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Mauvais (au goût) », est en alimentation › goûts alimentaires. 困る « Avoir des ennuis » est en psychologie et esprit › états psychologiques : sa fiche décrit l'embarras de la personne (« où l'on ne sait comment réagir »), non la situation. 大変, sens 2 « Difficile », qui qualifie aussi une situation, est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le mot qualifie aussi, « familièrement une situation délicate » ; l'exemple illustre le sens 1, et ce sens repose sur le texte de la fiche et sur la traduction « Fâcheux (situation critique) ». Le jugement porte sur une situation quelconque : la catégorie du goût, qui porte le sens 1, ne s'y étend pas, et aucun domaine ne nomme une situation qui tourne mal. La raison de D0197 tient.

#### `v_434_s1` · 危ない (あぶない) · « Dangereux » — **L**

- **Fiche source** (`n5_v_434`, adjectif en i) : traductions « Dangereux ; Périlleux ; Risqué ; Attention ! ». Nuance : « Adjectif en i qualifiant une situation qui présente un risque physique ou un danger, ou utilisé comme interjection pour avertir quelqu'un (« Attention ! »). » Exemple : « ここ は 危ない から 、 はいって は いけ ませ ん 。 » — « C'est dangereux ici, il ne faut pas entrer. »
- **État publié** : sens 1 sur 1 ; traduction « Dangereux » (Risqué) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`.
- **Justification historique** : D1114 (lot 16) : « Évaluation générale du risque d'une situation : « propriété générale », sans domaine thématique propre ; aucun axe d'A2-DIM ne décrit le danger. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §8 : « Urgences & protection civile : non promu dans ce snapshot ». A9, §2.1 : « l'emploi d'adresse d'un mot lexical (le refus pour 嫌, l'excuse pour 悪い, l'avertissement pour 危ない, la réplique pour 違う, la prise de congé pour また) reste en nuance, sans sens ni fonction ».
- **Comparables examinés** : Aucun autre sens publié ne décrit le danger. A2-DIM n'a aucun axe du risque, ce que D1114 relevait déjà. Santé et médecine › urgences médicales et droit › application de la loi désignent des secours et des institutions, non le caractère dangereux d'une situation.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « une situation qui présente un risque physique ou un danger » ; l'exemple dit « c'est dangereux ici, il ne faut pas entrer ». A2-L3 n'a pas de catégorie du danger ni de la sécurité, et son §8 dit explicitement qu'une branche de protection civile n'a pas été promue : l'absence est un choix de l'architecture. La raison de D1114 tient. Le point réservé au lot 16 (l'avertissement « Attention ! ») est réglé par A9, qui le nomme : il reste en nuance, sans sens ni fonction.

#### `v_484_s2` · 重い (おもい) · « Grave » — **L**

- **Fiche source** (`n5_v_484`, adjectif en i) : traductions « Lourd ; Pesant ; Grave (situation, responsabilité) ». Nuance : « Adjectif en i qualifiant un poids physique important (antonyme de *karui*), ou par extension une atmosphère, une responsabilité ou une charge morale pesante. » Exemple : « この にもつ は 重い です 。 » — « Ce bagage est lourd. »
- **État publié** : sens 2 sur 2 ; traduction « Grave » ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Lourd » (`null`, `propriete`).
- **Justification historique** : D1071 (lot 15) : « Gravité d'une situation, d'une responsabilité ou d'une atmosphère : « propriété générale », sans domaine thématique propre (comme 甘い « indulgent », lot 02). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Lourd », est lui aussi sans catégorie, pour une autre raison (audité à part). 大変, sens 2, a « Grave » pour autre traduction et est sans catégorie. 大切 « Important » porte l'axe importance.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le mot qualifie, « par extension une atmosphère, une responsabilité ou une charge morale pesante » ; l'exemple illustre le sens 1. Une atmosphère, une responsabilité, une charge morale : trois référents sans domaine commun. La raison de D1071 tient. Le criblage rapprochait « grave » de l'axe importance (C5-b) : la fiche dit « pesante », ce qui pèse, non ce qui compte ; l'axe ne décrit pas directement le sens, et aucune dimension n'est proposée.

### B · Propriétés que porte un axe d'A2-DIM (5 cas)

#### `v_432_s1` · 便利 (べんり) · « Pratique » — **L**

- **Fiche source** (`n5_v_432`, adjectif en na) : traductions « Pratique ; Commode ; Utile ». Nuance : « Adjectif en na qualifiant un objet, un service ou un endroit qui facilite la vie ou rend un service appréciable. » Exemple : « この パソコン は とても 便利 です 。 » — « Cet ordinateur est très pratique. »
- **État publié** : sens 1 sur 1 ; traduction « Pratique » (Commode, Utile) ; catégorie `null` ; type `propriete` ; dimensions `utilite_inutilite:utilite` ; fonctions aucune ; classe `adjectif_na`.
- **Justification historique** : D1109 (lot 16) : « Évaluation générale de l'utilité d'une chose : « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : 大切 « Important », 易しい « Facile » et 難しい « Difficile » sont sans catégorie et portent chacun un axe d'A2-DIM. Hors tranche, sans verdict ici : 有名 « Célèbre », de la même famille source, est sans catégorie et sans dimension.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « un objet, un service ou un endroit qui facilite la vie ou rend un service appréciable » ; l'exemple dit « cet ordinateur est très pratique ». Trois sortes de référents, nommées par la fiche : l'utilité n'appartient à aucun domaine. L'exemple porte sur un ordinateur, mais ranger le mot dans la technologie ferait du contexte un domaine. Le sens est porté par l'axe utilité (D1110). La raison de D1109 tient.

#### `v_442_s1` · 大切 (たいせつ) · « Important » — **L**

- **Fiche source** (`n5_v_442`, adjectif en na) : traductions « Important ; Précieux ; Cher ; Essentiel ». Nuance : « Adjectif en na qualifiant ce qui a de la valeur, de l'importance ou qui est cher à notre cœur (personnes, objets ou notions). » Exemple : « これ は 大切 な しょるい です 。 » — « C'est un document important. »
- **État publié** : sens 1 sur 1 ; traduction « Important » (Précieux, Cher) ; catégorie `null` ; type `propriete` ; dimensions `importance_insignifiance:importance` ; fonctions aucune ; classe `adjectif_na`.
- **Justification historique** : D1102 (lot 16) : « Évaluation générale de l'importance d'une chose : « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : かわいい « Mignon » est en émotions et sentiments › affection : sa fiche décrit « ce qui éveille de la tendresse, de l'affection ». 便利 « Pratique » est sans catégorie, avec l'axe utilité.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « ce qui a de la valeur, de l'importance ou qui est cher à notre cœur (personnes, objets ou notions) » ; l'exemple dit « c'est un document important ». L'attachement (« cher à notre cœur ») relèverait de l'affection, mais il n'est qu'un des trois termes d'un sens unique (D1101), et l'exemple porte sur l'importance : la catégorie de かわいい ne décrirait pas le sens entier. Le sens est porté par l'axe importance (D1103). La raison de D1102 tient.

#### `v_456_s1` · 易しい (やさしい) · « Facile » — **L**

- **Fiche source** (`n5_v_456`, adjectif en i) : traductions « Facile ; Simple ; Aisé ». Nuance : « Adjectif en i qualifiant une tâche, un exercice ou une épreuve qui ne présente pas de difficulté (partage la même lecture que l'adjectif signifiant « aimable/gentil », mais s'écrit avec le kanji de la simplicité). » Exemple : « この しごと は 易しい です 。 » — « Ce travail est facile. »
- **État publié** : sens 1 sur 1 ; traduction « Facile » (Simple) ; catégorie `null` ; type `propriete` ; dimensions `facilite_difficulte:facilite` ; fonctions aucune ; classe `adjectif_i`.
- **Justification historique** : D1091 (lot 16) : « Propriété générale d'une tâche, sans domaine thématique propre ; le sens passe par la dimension facilité / difficulté, comme le sens « difficile » de 大変 (lot 0). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : 上手 « Doué » et 下手 « Maladroit », de la même famille source, sont en capacités et aptitudes › habileté : leurs fiches qualifient la personne (« quelqu'un qui a de l'habileté », « le manque d'habileté »). 難しい et 大変, sens 2, sont sans catégorie, avec le même axe.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « une tâche, un exercice ou une épreuve qui ne présente pas de difficulté » ; l'exemple dit « ce travail est facile ». La propriété est celle de la tâche, non l'habileté de celui qui la fait : la catégorie de 上手 ne convient pas. « Exercice » et « épreuve » évoquent l'école, mais l'exemple porte sur un travail : l'éducation serait un contexte, non le sens. Le sens est porté par l'axe facilité (D1092). La raison de D1091 tient.

#### `v_486_s1` · 難しい (むずかしい) · « Difficile » — **L**

- **Fiche source** (`n5_v_486`, adjectif en i) : traductions « Difficile ; Compliqué ; Ardu ; Problématique ». Nuance : « Adjectif en i qualifiant une tâche, une question ou une situation qui demande beaucoup d'effort ou de réflexion pour être résolue ou comprise (antonyme de *yasashii*). » Exemple : « この もんだい は 難しい です 。 » — « Ce problème est difficile. »
- **État publié** : sens 1 sur 1 ; traduction « Difficile » (Compliqué) ; catégorie `null` ; type `propriete` ; dimensions `facilite_difficulte:difficulte` ; fonctions aucune ; classe `adjectif_i`.
- **Justification historique** : D1094 (lot 16) : « Propriété générale d'une tâche, sans domaine thématique propre ; le sens passe par la dimension facilité / difficulté, comme le sens « difficile » de 大変 (lot 0). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : 易しい « Facile », que la fiche donne pour contraire, et 大変, sens 2 « Difficile », sont sans catégorie, avec le même axe. 問題, sens 2 « Question (d'examen) », est en éducation › évaluation scolaire : c'est l'objet que l'exemple qualifie, non la difficulté.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « une tâche, une question ou une situation qui demande beaucoup d'effort ou de réflexion pour être résolue ou comprise » ; l'exemple dit « ce problème est difficile ». Une tâche, une question, une situation : la difficulté n'appartient à aucun domaine. Le sens est porté par l'axe difficulté (D1095). La raison de D1094 tient.

#### `v_495_s2` · 大変 (たいへん) · « Difficile » — **L**

- **Fiche source** (`n5_v_495`, adverbe) : traductions « Très ; Grave ; Difficile ; Pénible ». Nuance : « Adverbe (et adjectif en na) exprimant un degré élevé (synonyme de *totemo* dans le langage courant), ou désignant une situation difficile ou un pétrin (« c'est dur / pénible »). » Exemple : « きょう は 大変 あつい です 。 » — « Il fait très chaud aujourd'hui. »
- **État publié** : sens 2 sur 2 ; traduction « Difficile » (Pénible, Grave) ; catégorie `null` ; type `propriete` ; dimensions `facilite_difficulte:difficulte` ; fonctions aucune ; classe `adjectif_na`. Autres sens : « Très » (`null`, `null`).
- **Justification historique** : D0067 (lot 00) : « « Difficile » : propriété générale ; le sens passe par la dimension facilité / difficulté. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ». A9, §3.6 : l'`intensifieur` modifie le degré d'une propriété exprimée par un autre mot, « sans désigner lui-même la propriété, l'état ou l'action modifiés ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : 難しい « Difficile » est sans catégorie, avec le même axe. まずい, sens 2 « Fâcheux », qui qualifie aussi une situation, est sans catégorie. Le sens 1 de la même ENTRY, « Très », est sans catégorie par sa fonction `intensifieur`, sans avertissement.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le mot désigne aussi « une situation difficile ou un pétrin » ; l'exemple illustre le sens 1, et ce sens repose sur le texte de la fiche. Une situation quelconque, qualifiée de pénible : aucun domaine. Le sens est porté par l'axe difficulté. La raison de D0067 tient. Le point réservé par A9 pour cette ENTRY porte sur le sens 1 ; ce sens-ci désigne lui-même la propriété, et ne reçoit aucune fonction.

### C · Poids, force et résistance (7 cas)

#### `v_62_s1` · 軽い (かるい) · « Léger » — **L**

- **Fiche source** (`n5_v_62`, adjectif i) : traductions « Léger ; Peu lourd ; Bénin (maladie) ». Nuance : « Adjectif en -i qui signifie "léger" (contraire de 重い, lourd) et qualifie aussi une maladie ou un symptôme sans gravité. » Exemple : « この 鞄 は 軽くて 、持ちやすい です 。 » — « Ce sac est léger et facile à porter. »
- **État publié** : sens 1 sur 2 ; traduction « Léger » ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Bénin » (`sante_medecine › maladies_troubles`, `propriete`).
- **Justification historique** : D1073 (lot 15) : « Aucune catégorie primaire pertinente : le poids est une propriété physique générale d'un objet, que le registre ne range nulle part (espace › dimensions ne couvre que longueur, largeur, hauteur, profondeur et taille ; sciences › physique désigne la discipline, non la propriété d'un objet du quotidien). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-L3-v1, §5 : « Dimensions → Longueur ; Largeur ; Hauteur ; Profondeur ; Taille » (Espace & propriétés spatiales) ; « Propriétés des matériaux » (Matières & matériaux) ; « Physique → Mécanique ; Électricité & magnétisme ; Thermique ; Optique ; Énergie physique » (Sciences). A2-DIM-v1, §3 : « les propriétés physiques ne sont pas regroupées dans une dimension universelle unique ». A2-GLOBAL-v1, §11 : « préférer `category: null` à une catégorie artificielle » ; « ne jamais créer une nouvelle catégorie, dimension ou relation uniquement pour sauver un cas isolé ».
- **Comparables examinés** : 重い, sens 1 « Lourd », que la fiche donne pour contraire, est sans catégorie, avec la même raison. 薄い, sens 1 « Mince », et 厚い « Épais » sont en espace › dimensions, au niveau 2 : l'épaisseur n'est aucune des sous-catégories, mais c'est une grandeur spatiale (D1067). Le sens 2 de la même ENTRY, « Bénin », est en santé › maladies et troubles. 薄い, sens 3 « Léger (goût) », est en goûts alimentaires : le criblage les rapprochait par la traduction (C1-a), les référents diffèrent.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que l'adjectif « signifie léger (contraire de 重い, lourd) » ; l'exemple dit « ce sac est léger et facile à porter ». Le sens est le poids d'un objet. L'arbre d'A2-L3 ne le nomme nulle part : « Dimensions » appartient à l'espace et le poids n'est pas une grandeur spatiale, ce qui le distingue de l'épaisseur de 薄い ; « Propriétés des matériaux » décrit une matière, non le poids d'un sac ; « Physique › Mécanique » est une discipline. A2-DIM écarte aussi une dimension des propriétés physiques. La raison de D1073 tient, et sa lecture du registre est exacte.
- **Réserve** : Le lot 15 a laissé ouverte « la catégorie du poids ». Cet audit y répond pour le `null` : aucune catégorie existante ne convient, et le `null` est légitime. Créer une catégorie du poids serait une évolution de la conception, que deux sens ne justifient pas (A2-GLOBAL, §11) ; je ne la propose pas.

#### `v_484_s1` · 重い (おもい) · « Lourd » — **L**

- **Fiche source** (`n5_v_484`, adjectif en i) : traductions « Lourd ; Pesant ; Grave (situation, responsabilité) ». Nuance : « Adjectif en i qualifiant un poids physique important (antonyme de *karui*), ou par extension une atmosphère, une responsabilité ou une charge morale pesante. » Exemple : « この にもつ は 重い です 。 » — « Ce bagage est lourd. »
- **État publié** : sens 1 sur 2 ; traduction « Lourd » (Pesant) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Grave » (`null`, `propriete`).
- **Justification historique** : D1070 (lot 15) : « Aucune catégorie primaire pertinente : le poids est une propriété physique générale d'un objet, que le registre ne range nulle part (espace › dimensions ne couvre que longueur, largeur, hauteur, profondeur et taille ; sciences › physique désigne la discipline, non la propriété d'un objet du quotidien). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-L3-v1, §5 : « Dimensions → Longueur ; Largeur ; Hauteur ; Profondeur ; Taille » (Espace & propriétés spatiales) ; « Propriétés des matériaux » (Matières & matériaux) ; « Physique → Mécanique ; Électricité & magnétisme ; Thermique ; Optique ; Énergie physique » (Sciences). A2-DIM-v1, §3 : « les propriétés physiques ne sont pas regroupées dans une dimension universelle unique ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : 軽い, sens 1 « Léger », est sans catégorie, avec la même raison. 薄い « Mince » et 厚い « Épais » sont en espace › dimensions, au niveau 2. Le sens 2 de la même ENTRY, « Grave », est sans catégorie (audité à part).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « un poids physique important (antonyme de karui) » ; l'exemple dit « ce bagage est lourd ». Le sens est le poids d'un objet, que l'arbre d'A2-L3 ne nomme nulle part : ni l'espace, dont le poids n'est pas une grandeur, ni les matériaux, ni la physique comme discipline. L'exemple porte sur un bagage : le voyage serait un contexte, non le sens. La raison de D1070 tient.
- **Réserve** : Même point ouvert du lot 15 que pour 軽い : le `null` est légitime ; aucune catégorie n'est proposée.

#### `v_428_s1` · 丈夫 (じょうぶ) · « Solide » — **L**

- **Fiche source** (`n5_v_428`, adjectif en na) : traductions « Solide ; Robuste ; Résistant ; En bonne santé ». Nuance : « Adjectif en na qualifiant la robustesse physique d'un objet (solide, durable) ou la robustesse de la santé d'une personne. » Exemple : « この かばん は 丈夫 です 。 » — « Ce sac est solide. »
- **État publié** : sens 1 sur 2 ; traduction « Solide » (Robuste, Résistant) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_na`. Autres sens : « En bonne santé » (`sante_medecine › sante_etats_pathologiques`, `propriete`).
- **Justification historique** : D1141 (lot 17) : « La solidité d'un objet : propriété générale d'une chose, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Matières & matériaux : « Matières naturelles ; Métaux ; Minéraux ; Matériaux organiques ; Matériaux manufacturés ; Propriétés des matériaux ». A2-L3-v1, §2 : la catégorie « n'est déterminée ni par sa classe grammaticale, ni par son contexte d'utilisation habituel, ni par sa forme physique, ni par les domaines auxquels il peut être associé ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 2 de la même ENTRY, « En bonne santé », est en santé › santé et états pathologiques. 強い « Fort » et 弱い « Faible », de la même famille source, sont sans catégorie. Aucun sens publié n'emploie « Propriétés des matériaux » : les seuls sens de ce domaine sont des matières (紙, 木).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « la robustesse physique d'un objet (solide, durable) » ; l'exemple dit « ce sac est solide ». J'ai examiné « Matières & matériaux › Propriétés des matériaux », que le lot 17 n'avait pas discuté. La fiche attribue la robustesse à un objet, non à une matière, et la même fiche l'étend à la santé d'une personne (sens 2) : le mot dit qu'une chose résiste, quel que soit ce dont elle est faite. Le ranger avec les matériaux en ferait un domaine associé, ce qu'A2-L3 écarte. La raison de D1141 tient.
- **Réserve** : La question de « Propriétés des matériaux » a été posée à l'arbitrage du 2026-10-08, qui confirme L : la catégorie n'est pas retenue.

#### `v_451_s1` · 強い (つよい) · « Fort » — **L**

- **Fiche source** (`n5_v_451`, adjectif en i) : traductions « Fort ; Puissant ; Résistant ; Robuste ». Nuance : « Adjectif en i qualifiant une force physique importante, de la robustesse ou une forte intensité (antonyme de *yowai*). » Exemple : « あめ が 強い です 。 » — « La pluie est forte. »
- **État publié** : sens 1 sur 1 ; traduction « Fort » (Puissant, Résistant) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`.
- **Justification historique** : D1135 (lot 17) : « La force, la robustesse ou l'intensité : propriété générale d'une chose, sans domaine thématique propre ; la fiche l'applique aussi bien à une personne qu'à un phénomène (la pluie). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Être humain : « Capacités & aptitudes → Aptitude ; Habileté ; Incapacité » ; « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort ». A9, §3.6 : l'`intensifieur` modifie le degré d'une propriété exprimée par un autre mot, « sans désigner lui-même la propriété, l'état ou l'action modifiés ».
- **Comparables examinés** : 弱い « Faible », que la fiche donne pour contraire, est sans catégorie. 元気 « En forme » est en états et besoins physiques › fatigue et énergie physique : sa fiche ne parle que d'une personne. 力 « Force », dont la raison renvoie à ce sens, est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « une force physique importante, de la robustesse ou une forte intensité » ; l'exemple dit « la pluie est forte ». La force physique d'une personne relèverait de l'être humain, mais l'exemple même porte sur la pluie : la fiche déborde ce domaine par l'intensité d'un phénomène, et le sens est unique (D1134). La raison de D1135, qui le relève, tient. Fonction (criblage, C7-c) : « fort » désigne lui-même la propriété ; ce n'est pas un `intensifieur`.

#### `v_449_s1` · 弱い (よわい) · « Faible » — **L**

- **Fiche source** (`n5_v_449`, adjectif en i) : traductions « Faible ; Fragile ; Peu résistant ; Vulnérable ». Nuance : « Adjectif en i qualifiant un manque de force physique, de résistance ou d'intensité (antonyme de *tsuyoi*). » Exemple : « きょう は かぜ が 弱い です 。 » — « Le vent est faible aujourd'hui. »
- **État publié** : sens 1 sur 1 ; traduction « Faible » (Fragile) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`.
- **Justification historique** : D1138 (lot 17) : « Le manque de force, de résistance ou d'intensité : propriété générale d'une chose, sans domaine thématique propre, comme 強い. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Être humain : « Capacités & aptitudes → Aptitude ; Habileté ; Incapacité » ; « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort ».
- **Comparables examinés** : 強い « Fort », que la fiche donne pour contraire, est sans catégorie. 丈夫, sens 1 « Solide », de la même famille source, est sans catégorie. 元気 « En forme » est en fatigue et énergie physique, pour une personne.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « un manque de force physique, de résistance ou d'intensité » ; l'exemple dit « le vent est faible aujourd'hui ». Sur la lecture de cette fiche, et non par renvoi à 強い : l'exemple porte sur le vent, non sur une personne, et la fiche réunit la force, la résistance et l'intensité en un sens (D1137). Aucun domaine ne couvre les trois. La raison de D1138 tient.

#### `v_462_s1` · 清い (きよい) · « Pur » — **L**

- **Fiche source** (`n5_v_462`, adjectif en i) : traductions « Pur ; Limpide ; Innocent ; Honnête ». Nuance : « Adjectif en i qualifiant ce qui est physiquement pur (comme l'eau claire) ou moralement pur et intègre (comme une conscience ou un cœur). » Exemple : « かれ は 清い こころ を 持って います 。 » — « Il a un cœur pur. »
- **État publié** : sens 1 sur 2 ; traduction « Pur » (Limpide) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Pur (moralement) » (`null`, `propriete`).
- **Justification historique** : D1149 (lot 17) : « La pureté physique d'une chose : propriété générale d'une chose, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §2 : la catégorie « n'est déterminée ni par sa classe grammaticale, ni par son contexte d'utilisation habituel, ni par sa forme physique, ni par les domaines auxquels il peut être associé ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : きれい, sens 2 « Propre », et 汚い, sens 1 « Sale », de la même famille source, sont en habitat › entretien domestique › nettoyage : leurs fiches parlent de « propreté (ordre, netteté) » et du « manque de propreté physique d'un endroit ou d'un objet ». Le sens 2 de la même ENTRY est sans catégorie (audité à part).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « ce qui est physiquement pur (comme l'eau claire) » ; l'exemple illustre le sens 2, et ce sens repose sur le texte de la fiche et sur la traduction « Limpide ». La pureté d'une eau n'est pas la propreté que l'on obtient en nettoyant : la catégorie de « Propre » et de « Sale » ne convient pas. L'eau n'est que l'illustration (« comme ») : ni les eaux naturelles ni la chimie ne décrivent le sens. La raison de D1149 tient.

#### `v_646_s1` · 力 (ちから) · « Force » — **L**

- **Fiche source** (`n5_v_646`, nom) : traductions « Force ; Puissance ; Énergie ; Capacité physique ou mentale ». Nuance : « Nom désignant la force physique d'une personne ou d'un animal, mais aussi la puissance, l'énergie ou les compétences intellectuelles dans un domaine. » Exemple : « かれ は 力 が つよい です 。 » — « Il a beaucoup de force (il est fort physiquement). »
- **État publié** : sens 1 sur 1 ; traduction « Force » (Puissance, Énergie) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `nom`.
- **Justification historique** : D1362 (lot 20) : « La force, la puissance, l'énergie : propriété générale, sans domaine thématique propre, comme 強い (lot 17). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Être humain : « Capacités & aptitudes → Aptitude ; Habileté ; Incapacité » ; « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine.
- **Comparables examinés** : 出来る, sens 1 « Pouvoir », est en capacités et aptitudes › aptitude ; 上手 et 下手 en habileté ; 元気 en fatigue et énergie physique : leurs fiches ne parlent que d'une personne. 頭, sens 2 « Esprit », est en psychologie et esprit › pensée. 死ぬ « Mourir » est sans catégorie, sa fiche portant aussi sur un animal (lot 19 ; non audité ici). 強い « Fort », auquel la raison renvoie, est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « la force physique d'une personne ou d'un animal, mais aussi la puissance, l'énergie ou les compétences intellectuelles dans un domaine » ; l'exemple dit « il a beaucoup de force ». La catégorie la plus proche est « Capacités & aptitudes », et je l'ai examinée de près : la source glose elle-même « capacité physique ou mentale ». Mais la fiche attribue la force à « une personne ou un animal », et y joint la puissance et l'énergie sans les rapporter à l'être humain : elle déborde ce domaine par ses propres termes, et le sens est unique (D1361). La doctrine du lot 19 s'applique. La raison de D1362 tient par sa conclusion ; son renvoi à 強い vaut pour la généralité, non pour la fiche, qui ne parle d'aucun phénomène.
- **Réserve** : C'était le cas le plus proche d'une catégorie dans cette tranche ; la question de « Capacités & aptitudes » a été posée à l'arbitrage du 2026-10-08, qui confirme L. Le cas repose sur la même doctrine que 死ぬ, qui sera audité dans une tranche suivante : les deux verdicts devront rester cohérents.

### D · Animation et calme d'un lieu (2 cas)

#### `v_478_s1` · 賑やか (にぎやか) · « Animé » — **L**

- **Fiche source** (`n5_v_478`, adjectif en na) : traductions « Animé ; Bruyant ; Populeux ; Joyeux (lieu) ». Nuance : « Adjectif en na qualifiant un endroit plein de vie, de monde, d'animation ou d'agitation joyeuse (comme une rue commerçante ou une fête). » Exemple : « この まち は いつも 賑やか です 。 » — « Cette ville est toujours animée. »
- **État publié** : sens 1 sur 1 ; traduction « Animé » (Joyeux (lieu)) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_na`.
- **Justification historique** : D1154 (lot 17) : « L'animation ou le calme d'un lieu : propriété générale d'un endroit ou d'une atmosphère, sans domaine thématique propre ; la fiche parle de vie, de monde et d'agitation autant que de bruit, ce que « ouïe » ne couvrirait qu'en partie. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : うるさい, sens 1 « Bruyant », de la même famille source, est en sens et perception › ouïe : sa fiche parle, pour ce sens, d'« un bruit excessif et désagréable » et de rien d'autre. 静か « Calme », dont la fiche donne ce mot pour contraire, est sans catégorie. 楽しい « Amusant » est en émotions › joie et plaisir.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « un endroit plein de vie, de monde, d'animation ou d'agitation joyeuse (comme une rue commerçante ou une fête) » ; l'exemple dit « cette ville est toujours animée ». Le bruit n'y est pas nommé : la traduction « Bruyant » a été écartée (D1155). L'ouïe ne décrirait donc pas le sens ; la joie n'en est qu'une teinte ; la ville et la rue sont des contextes. La raison de D1154 tient.

#### `v_489_s1` · 静か (しずか) · « Calme » — **L**

- **Fiche source** (`n5_v_489`, adjectif en na) : traductions « Calme ; Tranquille ; Silencieux ; Paisible ». Nuance : « Adjectif en na qualifiant un endroit dépourvu de bruit et d'agitation, ou une atmosphère paisible et sereine (antonyme de *nigiyaka*). » Exemple : « この としばこ は いつも 静か です 。 » — « Cette bibliothèque est toujours calme. »
- **État publié** : sens 1 sur 1 ; traduction « Calme » (Tranquille, Silencieux) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_na`.
- **Justification historique** : D1156 (lot 17) : « L'animation ou le calme d'un lieu : propriété générale d'un endroit ou d'une atmosphère, sans domaine thématique propre ; la fiche parle de vie, de monde et d'agitation autant que de bruit, ce que « ouïe » ne couvrirait qu'en partie. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : うるさい, sens 1 « Bruyant », est en sens et perception › ouïe. 賑やか « Animé », que la fiche donne pour contraire, est sans catégorie. Hors tranche, sans verdict ici : ゆっくり, sens 2 « Tranquillement », est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « un endroit dépourvu de bruit et d'agitation, ou une atmosphère paisible et sereine » ; l'exemple dit « cette bibliothèque est toujours calme ». L'absence de bruit relèverait de l'ouïe, comme « Bruyant » ; mais la fiche y joint l'absence d'agitation et une atmosphère paisible, et la traduction principale est « Calme », non « Silencieux ». L'ouïe ne couvrirait qu'une partie du sens, ce que D1156 relève. La raison tient.
- **Réserve** : L'écart avec うるさい, sens 1 (ouïe), vient des fiches : celle de うるさい ne parle que de bruit. Si « Silencieux » était jugé central, l'ouïe conviendrait ; la fiche ne le dit pas.

### E · Conduite et caractère d'une personne (6 cas)

#### `v_265_s2` · 冷たい (つめたい) · « Froid (attitude) » — **L**

- **Fiche source** (`n5_v_265`, adjectif i) : traductions « Froid (au toucher) ; Glacé ; Froid (chose ou liquide) ; Insensible (figuré) ». Nuance : « Adjectif en -i (形容詞) qualifiant la température tactile d'un objet, d'une surface ou d'un liquide, à ne pas confondre avec 寒い (samui) qui qualifie la température ambiante de l'air. » Exemple : « この みず は とても 冷たい です 。 » — « Cette eau est très froide (au toucher). »
- **État publié** : sens 2 sur 2 ; traduction « Froid (attitude) » (Distant) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Froid (au toucher) » (`etre_humain › sens_perception › toucher_sensations`, `propriete`).
- **Justification historique** : D0481 (lot 07) : « Attitude distante envers autrui : « propriété générale », sans domaine thématique propre (comme 甘い « indulgent », lot 02). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Être humain : « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques » ; « Émotions & sentiments → Joie & plaisir ; Tristesse ; Peur & inquiétude ; Colère ; Affection ; Surprise & réactions émotionnelles ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 明るい, sens 2 « Enjoué » (lot 0, D0033 : « le caractère d'une personne »), 暗い, sens 2 « Triste » (lot 17, D1166 : « le caractère d'une personne »), et 爽やか, sens 2 « Vif » (lot 17, D1165), sont tous trois en être humain › psychologie et esprit › états psychologiques, type `propriete`. 甘い, sens 2 « Indulgent », auquel la raison renvoie, est sans catégorie. Hors tranche, sans verdict ici : まっすぐ, sens 2 « Honnête », est sans catégorie, sa raison (D1411) disant que « le registre n'a pas de catégorie pour la personnalité ou le caractère ».
- **Verdict arbitré (proposé : C)** : **L**.
- **Motivation** : La nuance et l'exemple de la fiche ne portent que sur la température au toucher ; ce sens repose sur la seule traduction « Insensible (figuré) », que D0480 a lue comme « une attitude envers autrui » et qui est publiée « Froid (attitude) », « Distant ». La fiche atteste donc un emploi figuré pour une personne, sans rien en dire de plus : elle ne décrit pas assez précisément un état psychologique pour justifier la catégorie des états psychologiques, et aucun autre domaine ne nomme ce trait. Le `null` est maintenu, et la raison de D0481 tient. La proposition initiale de cet audit était C, par rapprochement avec 明るい, 暗い et 爽やか ; l'arbitrage du 2026-10-08 l'a écartée pour ce motif et a classé le cas L.
- **Réserve** : Point de contrôle transversal renvoyé au volet 1, sans verdict à ce jour : 明るい, 暗い et 爽やか, sens 2, sont en états psychologiques pour « le caractère d'une personne », alors que 冷たい, sens 2, et まっすぐ, sens 2 « Honnête » (D1411), sont sans catégorie. Ces sens ne sont pas traités de la même façon aujourd'hui ; aucun des quatre comparables n'est jugé ici. La traduction publiée (« Distant ») s'écarte de celle de la source (« Insensible ») : signalé, sans effet sur le verdict.

#### `v_464_s2` · 甘い (あまい) · « Indulgent » — **L**

- **Fiche source** (`n5_v_464`, adjectif en i) : traductions « Sucré ; Doux (saveur) ; LaXiste ; Ingénu ». Nuance : « Adjectif en i qualifiant une saveur sucrée, ou par extension une attitude trop clémente, indulgente ou naïve (« être indulgent / trop laxiste envers quelqu'un »). » Exemple : « この ケーキ は とても 甘い です 。 » — « Ce gâteau est très sucré. »
- **État publié** : sens 2 sur 2 ; traduction « Indulgent » (Laxiste) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Sucré » (`alimentation_cuisine › gouts_alimentaires › sucre`, `propriete`).
- **Justification historique** : D0192 (lot 02) : « Attitude générale envers autrui (trop indulgent) : « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Être humain : « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques » ; « Émotions & sentiments → Joie & plaisir ; Tristesse ; Peur & inquiétude ; Colère ; Affection ; Surprise & réactions émotionnelles ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Sucré », est en goûts alimentaires › sucré. 冷たい, sens 2, dont la raison renvoie à ce sens, est sans catégorie. 明るい, 暗い et 爽やか, sens 2, sont en états psychologiques pour le tempérament d'une personne. 会う « Rencontrer » et 頼む « Demander » sont en relations sociales › interactions sociales : ce sont des actes.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le mot qualifie, « par extension une attitude trop clémente, indulgente ou naïve (être indulgent / trop laxiste envers quelqu'un) » ; l'exemple illustre le sens 1. La fiche décrit une manière de traiter quelqu'un, jugée excessive (« trop ») : c'est une conduite et un jugement sur elle, non ce que la personne éprouve. La catégorie des états psychologiques ne la décrit pas, et « Interactions sociales » nomme des actes d'interaction, non une façon d'être avec autrui. La raison de D0192 tient.
- **Réserve** : « Naïve » et « Ingénu », que la fiche donne aussi, désignent une disposition d'esprit. Ce sens relève du même point de contrôle transversal que 冷たい (le caractère d'une personne), renvoyé au volet 1.

#### `v_422_s2` · うるさい (うるさい) · « Agaçant » — **L**

- **Fiche source** (`n5_v_422`, adjectif en i) : traductions « Bruyant ; Agaçant ; Embêtant ; Chicanier ». Nuance : « Adjectif en i qualifiant un bruit excessif et désagréable, ou par extension une personne insistante ou ennuyeuse. » Exemple : « となり の へや が うるさい です 。 » — « La chambre d'à côté est bruyante. »
- **État publié** : sens 2 sur 2 ; traduction « Agaçant » (Embêtant) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Bruyant » (`etre_humain › sens_perception › ouie`, `propriete`).
- **Justification historique** : D1152 (lot 17) : « Le comportement insistant ou ennuyeux d'une personne : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Être humain : « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques » ; « Émotions & sentiments → Joie & plaisir ; Tristesse ; Peur & inquiétude ; Colère ; Affection ; Surprise & réactions émotionnelles ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Bruyant », est en sens et perception › ouïe. つまらない « Ennuyeux » est en psychologie et esprit › attention et かわいい « Mignon » en émotions › affection : leurs fiches nomment l'effet produit (« qui manque d'intérêt », « qui éveille de la tendresse, de l'affection »).
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le mot qualifie, « par extension une personne insistante ou ennuyeuse » ; l'exemple illustre le sens 1. La fiche décrit la conduite de la personne (« insistante »), non un sentiment : « Agaçant » est la traduction retenue, et la fiche ne nomme ni l'agacement ni la colère. C'est ce qui distingue ce sens de つまらない et de かわいい, rangés par l'effet que leurs fiches nomment. La raison de D1152 tient.

#### `v_461_s2` · 汚い (きたない) · « Grossier (langage) » — **L**

- **Fiche source** (`n5_v_461`, adjectif en i) : traductions « Sale ; Immonde ; Crasseux ; Grossier (langage) ». Nuance : « Adjectif en i qualifiant un manque de propreté physique d'un endroit ou d'un objet, ou par extension un langage grossier ou une action malhonnête (antonyme de *kirei* dans son sens de propreté). » Exemple : « この くつ は 汚い です 。 » — « Ces chaussures sont sales. »
- **État publié** : sens 2 sur 2 ; traduction « Grossier (langage) » ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Sale » (`habitat_vie_domestique › entretien_domestique › nettoyage`, `propriete`).
- **Justification historique** : D1146 (lot 17) : « Un langage grossier ou une action malhonnête : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine. A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Sale », est en entretien domestique › nettoyage. 言葉 « Mot » et 話, sens 2 « Histoire », sont en communication et langage › expression : ce sont des contenus de parole. 清い, sens 2 « Pur (moralement) », est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le mot qualifie, « par extension un langage grossier ou une action malhonnête » ; l'exemple illustre le sens 1. Un langage grossier relèverait de la communication ; une action malhonnête n'en relève pas. Le sens, unique (D1145 : « la conduite d'une personne »), couvre les deux, et la nuance publiée les garde : aucun domaine ne le décrit en entier. La raison de D1146 tient.
- **Réserve** : La traduction principale publiée, « Grossier (langage) », ne nomme que la moitié de ce sens ; « malhonnête » n'apparaît qu'en nuance. Si le sens était réduit au langage, « Communication & langage › Expression » serait à examiner. Je le signale ; le découpage et la traduction ne sont pas l'objet de cet audit.

#### `v_462_s2` · 清い (きよい) · « Pur (moralement) » — **L**

- **Fiche source** (`n5_v_462`, adjectif en i) : traductions « Pur ; Limpide ; Innocent ; Honnête ». Nuance : « Adjectif en i qualifiant ce qui est physiquement pur (comme l'eau claire) ou moralement pur et intègre (comme une conscience ou un cœur). » Exemple : « かれ は 清い こころ を 持って います 。 » — « Il a un cœur pur. »
- **État publié** : sens 2 sur 2 ; traduction « Pur (moralement) » (Innocent, Honnête) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_i`. Autres sens : « Pur » (`null`, `propriete`).
- **Justification historique** : D1150 (lot 17) : « La pureté morale : évaluation générale d'une conduite, « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Être humain : « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques » ; « Émotions & sentiments → Joie & plaisir ; Tristesse ; Peur & inquiétude ; Colère ; Affection ; Surprise & réactions émotionnelles ».
- **Comparables examinés** : 汚い, sens 2, et 立派, sens 2, qui jugent aussi une conduite, sont sans catégorie. 明るい, 暗い et 爽やか, sens 2, sont en états psychologiques pour le tempérament. Hors tranche, sans verdict ici : まっすぐ, sens 2 « Honnête », est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit ce qui est « moralement pur et intègre (comme une conscience ou un cœur) » ; l'exemple dit « il a un cœur pur ». C'est un jugement moral : l'intégrité, l'honnêteté. A2-L3 n'a aucune catégorie de la morale ; la religion et le droit, qui en sont voisins, ne sont nommés ni par la fiche ni par l'exemple. Ce n'est pas non plus un état psychologique : la fiche ne dit pas ce que la personne éprouve, mais ce qu'elle vaut. La raison de D1150 tient.

#### `v_609_s2` · 立派 (りっぱ) · « Remarquable » — **L**

- **Fiche source** (`n5_v_609`, adjectif) : traductions « Magnifique ; Superbe ; Splendide ; Remarquable ; Digne ». Nuance : « Adjectif en -na qualifiant quelque chose de grand, d'impressionnant, d'élégant, ou une personne qui fait preuve d'un comportement admirable et remarquable. » Exemple : « あの たてもの は 立派 です ね 。 » — « Ce bâtiment est magnifique, n'est-ce pas ? »
- **État publié** : sens 2 sur 2 ; traduction « Remarquable » (Digne) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_na`. Autres sens : « Magnifique » (`null`, `propriete`).
- **Justification historique** : D1108 (lot 16) : « Appréciation générale de la conduite d'une personne : « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY est sans catégorie (audité à part). 清い, sens 2, et 汚い, sens 2, qui jugent aussi une conduite, sont sans catégorie. 上手 « Doué » est en habileté : sa fiche parle du talent pour une activité, non de la conduite.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « une personne qui fait preuve d'un comportement admirable et remarquable » ; l'exemple illustre le sens 1, et ce sens repose sur le texte de la fiche et sur les traductions « Remarquable », « Digne ». C'est l'appréciation d'une conduite, sans que la fiche dise en quoi elle est admirable : aucun domaine ne la décrit. La raison de D1108 tient.

### F · Aspect, identité, diversité, raison d'être (4 cas)

#### `v_609_s1` · 立派 (りっぱ) · « Magnifique » — **L**

- **Fiche source** (`n5_v_609`, adjectif) : traductions « Magnifique ; Superbe ; Splendide ; Remarquable ; Digne ». Nuance : « Adjectif en -na qualifiant quelque chose de grand, d'impressionnant, d'élégant, ou une personne qui fait preuve d'un comportement admirable et remarquable. » Exemple : « あの たてもの は 立派 です ね 。 » — « Ce bâtiment est magnifique, n'est-ce pas ? »
- **État publié** : sens 1 sur 2 ; traduction « Magnifique » (Superbe, Splendide) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_na`. Autres sens : « Remarquable » (`null`, `propriete`).
- **Justification historique** : D1107 (lot 16) : « Appréciation générale de l'aspect d'une chose : « propriété générale », sans domaine thématique propre, comme きれい « beau » (lot 0). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : Hors tranche, sans verdict ici : きれい, sens 1 « Beau », auquel la raison renvoie, est sans catégorie. かわいい « Mignon » est en émotions › affection, sa fiche nommant l'affection. 大きい « Grand » est en espace › dimensions › taille.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « quelque chose de grand, d'impressionnant, d'élégant » ; l'exemple dit « ce bâtiment est magnifique ». « Grand » pourrait évoquer la taille, mais la fiche l'associe à l'impression produite et à l'élégance : c'est une appréciation de l'aspect, non une mesure. L'exemple porte sur un bâtiment, qui est un contexte. « Apparence & présentation personnelle » décrit l'apparence d'une personne, et la fiche dit « quelque chose ». La raison de D1107 tient.

#### `v_438_s1` · 同じ (おなじ) · « Même » — **L**

- **Fiche source** (`n5_v_438`, adjectif en na) : traductions « Même ; Identique ; Pareil ». Nuance : « Adjectif en na (souvent considéré grammaticalement comme un adjectif adnominal ou un nom nominal) qui sert à indiquer l'identité ou la similitude entre deux ou plusieurs choses. » Exemple : « 私 たち は 同じ クラス です 。 » — « Nous sommes dans la même classe. »
- **État publié** : sens 1 sur 1 ; traduction « Même » (Identique, Pareil) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `determinant`.
- **Justification historique** : D1420 (lot 22) : « L'identité ou la similitude : une propriété générale, sans domaine thématique propre ; aucune catégorie du registre ne nomme la comparaison. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « identité / différence » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-DIM-v1, §4 : identité, différence, similarité et comparaison sont « reportées vers `relations` ». A9, §3.5, frontière 1 : « l'identité et la similitude ne sont pas des comparaisons de degré » ; « même », « différent », « semblable » relèvent du sens.
- **Comparables examinés** : 違う, sens 1 « Être différent », est sans catégorie, et a été confirmé L sur le même élément de la liste (tranche précédente). Aucun sens publié ne range l'identité dans un domaine.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le mot « sert à indiquer l'identité ou la similitude entre deux ou plusieurs choses » ; l'exemple dit « nous sommes dans la même classe ». L'identité est nommée par l'architecture parmi les éléments hors hiérarchie, comme la comparaison : l'absence de catégorie est sa réponse. D1420 parle de « propriété générale » ; le fondement exact est « identité / différence ». La conclusion tient. Fonction (criblage, C7-c et C10-a) : D1421 refusait `comparatif` faute de définition ; A9 la définit depuis et tranche dans le même sens, l'identité n'étant pas une comparaison de degré. La conclusion de D1421 reste donc juste, par un motif désormais normatif.

#### `v_421_s1` · いろいろ (いろいろ) · « Divers » — **L**

- **Fiche source** (`n5_v_421`, adjectif en na) : traductions « Divers ; Varié ; Différents ; Plusieurs sortes de ». Nuance : « Adjectif en na (ou adverbe/adjectif nominal) redoublé exprimant la diversité ou la variété de choses, d'idées ou de situations. » Exemple : « デパート で いろいろ な もの を かい まし た 。 » — « J'ai acheté diverses choses au grand magasin. »
- **État publié** : sens 1 sur 1 ; traduction « Divers » (Varié, Différents, Plusieurs sortes de) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `adjectif_na`.
- **Justification historique** : D1423 (lot 22) : « La diversité : une propriété générale, sans domaine thématique propre. Elle n'est pas une quantité : aucune catégorie de nombres et quantification n'est cherchée pour elle. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A9, §3.4 : le `quantificateur` « quantifie un référent désigné par un autre mot […] en en donnant l'étendue : beaucoup, peu, un peu, tout ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : 多い « Nombreux » et 大勢 « Beaucoup de monde » sont en nombres et quantification › quantité › grande quantité : ils disent un grand nombre. 同じ « Même » est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « la diversité ou la variété de choses, d'idées ou de situations » ; l'exemple dit « j'ai acheté diverses choses au grand magasin ». Le mot dit que les choses sont de sortes différentes, non combien il y en a : la quantité ne le décrit pas, ce que D1423 relève. Des choses, des idées, des situations : aucun domaine. La raison tient. Deux points du criblage sont réglés ici. Fonction (C7-c, C10-a) : D1424 refusait `quantificateur` faute de définition ; A9 la définit depuis, par « l'étendue » d'un référent (beaucoup, peu, tout) ; la variété n'est pas une étendue, et la fonction ne s'applique pas. Dimension (C5-b) : l'axe uniforme / non uniforme décrit l'homogénéité d'un tout ; la fiche parle de la variété de plusieurs choses et ne nomme pas l'uniformité. L'axe ne décrit pas directement le sens, et aucune dimension n'est proposée.

#### `v_513_s2` · 意味 (いみ) · « Intérêt » — **L**

- **Fiche source** (`n5_v_513`, nom) : traductions « Signification ; Sens ; Importance ; Portée ». Nuance : « Nom désignant le sens d'un mot, d'une phrase, d'un symbole, ou l'intention / l'utilité derrière une action. » Exemple : « この ことば の 意味 を おしえて ください 。 » — « Veuillez m'expliquer la signification de ce mot. »
- **État publié** : sens 2 sur 2 ; traduction « Intérêt » (Utilité) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; classe `nom`. Autres sens : « Sens » (`communication_langage › comprehension_linguistique`, `information_contenu`).
- **Justification historique** : D0445 (lot 06) : « Utilité ou raison d'être d'une action : « propriété générale », sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ». Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Sens », est en communication et langage › compréhension linguistique. 便利 « Pratique » est sans catégorie et porte l'axe utilité. 問題, sens 1 « Problème », de la même famille source, est sans catégorie (non audité ici).
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le nom désigne aussi « l'intention / l'utilité derrière une action » ; l'exemple illustre le sens 1, et ce sens repose sur le texte de la fiche. La raison d'être d'une action quelconque n'a pas de domaine : la catégorie du sens 1, qui décrit la signification d'un mot, ne s'y étend pas. La raison de D0445 tient. Dimension : la fiche nomme « l'utilité », et l'axe utilité existe. Je ne le propose pas : la fiche joint l'intention à l'utilité, la traduction principale est « Intérêt », et le nom désigne la raison d'être d'une action plus qu'il ne caractérise une chose comme utile ; l'axe ne décrit pas directement le sens.
- **Réserve** : Ce sens a été décidé au lot 06, avant la doctrine du lot 16 sur les dimensions, et la question n'avait pas été posée. Elle l'a été à l'arbitrage du 2026-10-08, qui confirme L, sans dimension.

## T3.6 Complétude

Contrôle par script : les 29 sens de cette tranche portent chacun un avertissement `categorie-nulle` de l'inventaire, ont chacun exactement une décision de journal de cette nature, et aucun ne figure dans les 26 `categorie-nulle` déjà arbitrés. L = 29, F = 0, C = 0, N = 0 ; total 29. Avec les tranches précédentes : 82 fiches arbitrées sur 147.

---

# Tranche 4 · `categorie-nulle`, troisième tranche : 22 cas

**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : L = 21, F = 0, C = 1, N = 0. 並ぶ, sens 1, est **confirmé C** (`semantic_type: action` conservé) ; 出す, sens 3, est confirmé L ; les 20 autres L sont confirmés. La correspondance de substance entre « action générale » et « action générique » est acceptée **pour les cas justifiés individuellement**, sans devenir une présomption pour les tranches suivantes. La modification retenue rejoint la liste des corrections du volet 2 ; **elle n'est pas appliquée**. Périmètre validé le même jour : « action générale », première partie, 22 SENSE (les 19 du lot 18, et かける sens 3, 持つ sens 1, 無くす). Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n'est modifié ; aucune décision historique n'est réécrite.
**Reste à faire après cette tranche** : 43 `categorie-nulle` (« action générale », seconde partie, 14 ; « aucune catégorie ne nomme la notion » 18 ; « autre formulation » 11) ; aucun n'est commencé.

## T4.1 Résultat de la tranche

| Classement | Cas | Sens |
|---|---|---|
| **L** | 21 | `v_541_s1` 取る ; `v_665_s1` 持つ ; `v_79_s1` 押す ; `v_130_s1` 引く ; `v_50_s2` 差す ; `v_522_s2` 付ける ; `v_164_s3` かける ; `v_576_s1` 貼る ; `v_539_s1` 切る ; `v_567_s1` 磨く ; `v_580_s1` 開ける ; `v_709_s1` 閉める ; `v_522_s1` 付ける ; `v_561_s1` 消す ; `v_539_s2` 切る ; `v_637_s1` 使う ; `v_545_s1` 変える ; `v_532_s1` 作る ; `v_564_s1` 無くす ; `v_541_s2` 取る ; `v_536_s3` 出す |
| **F** | 0 | — |
| **C** | 1 | `v_528_s1` 並ぶ |
| **N** | 0 | — |
| **Total** | 22 | L + F + C + N = 22 |

**Cumul arbitré du volet 2** : 27 `type-nul` (L = 24, F = 1, C = 2), 55 `categorie-nulle` (L = 52, F = 1, C = 2) et ces 22 `categorie-nulle` (L = 21, C = 1), soit **104 cas arbitrés sur 147 : L = 97, F = 2, C = 5, N = 0**.

- **Une modification est retenue** (`v_528_s1` 並ぶ) ; elle n'est pas appliquée. La liste des corrections du volet 2 compte désormais six modifications de SENSE (T4.5).
- **Aucun N.**
- **5 fiches portent une réserve** : `v_567_s1` 磨く ; `v_539_s2` 切る ; `v_564_s1` 無くす ; `v_536_s3` 出す ; `v_528_s1` 並ぶ (T4.5).
- **Les sept chevauchements avec le volet 1 sont traités dans les fiches** (T4.4).

## T4.2 Composition et méthode

La tranche réunit les 19 sens de la famille « action générale » décidés au lot 18 « Actions sur les objets », et trois sens d'autres lots que leurs raisons ou leur famille source y rattachent : `v_164_s3` かける « Accrocher » (lot 08), `v_665_s1` 持つ « Tenir » (lot 20), `v_564_s1` 無くす « Perdre (un objet) » (lot 0). Les 14 autres sens de la famille sont réservés à la tranche suivante et **ne sont pas audités ici** ; quand une fiche les cite, c'est comme comparables, sans verdict.

Pour chaque cas, individuellement : fiche source entière (traductions, nuance, exemple) ; sens publié, nuance publiée et autres sens de l'ENTRY ; décision `categorie-nulle` et décisions voisines, celles du lot 26 comprises ; A5, A2-L3-v1 (§2, §5 à §7), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11), A2-DIM-v1 et A9 selon le cas ; sens comparables publiés, **dans la tranche et hors d'elle**. L'arbre des catégories d'A2-L3 (§5) a été relu pour chaque sens, et les catégories des 145 sens de verbes publiés (90 en portent une) ont été relevées pour situer chaque cas. Les fiches sont regroupées pour la lecture ; chaque verdict est motivé sur la fiche du cas.

## T4.3 « Action générale » et « action générique »

**Le constat.** Les 22 raisons de la tranche, comme les 36 de la famille, disent « action générale ». La liste des éléments hors hiérarchie (A2-L3 §6, A2-GLOBAL §4.4) dit **« action générique »**, à côté d'« objet / artefact générique », de « personne générique » et de « lieu générique » ; elle ne dit « générale » que pour la propriété. Les deux formules n'ont pas la même lettre. Une seule raison cite la norme à l'appui de la formule : D0069 (無くす), que le criblage avait relevée (C9-a).

**La lecture proposée.**

1. Ce que la norme écarte, c'est la création d'une racine « Actions » : ces éléments « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Une action qu'aucun domaine thématique ne borne n'a donc pas de catégorie, par décision de l'architecture et non par manque.
2. « Action générale, sans domaine thématique propre » désigne cela. La formule des raisons se lit donc au sens d'« action générique » : la correspondance tient **dans la substance**, pas dans la lettre.
3. **Elle ne dispense de rien.** Une action n'est pas générique parce qu'elle est une action : le registre range des verbes d'action dès que leur fiche décrit un domaine. 洗う « Laver » est en entretien domestique, 置く « Poser » et 並べる « Aligner » en position et localisation, 上げる « Lever » en mouvement, 入れる « Mettre dans » en entrée et sortie, 締める « Serrer » en accessoires vestimentaires, 作る « Préparer (un repas) » en cuisine. La formule ne fonde donc pas le `null` à elle seule : chaque cas a été vérifié sur sa fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3 §2 ; §7, règle 7 ; A2-GLOBAL §10 et §11).

**Le résultat, sens par sens.** La correspondance tient pour 21 sens : la fiche décrit un geste ou une action qu'aucun domaine ne borne, ou nomme elle-même plusieurs domaines. Elle ne tient pas pour 並ぶ, sens 1, où une catégorie publiée pour ses comparables décrit le sens (proposé C). Pour D0069, la citation du §4.4 est inexacte dans la lettre et la conclusion est juste : rien n'est à corriger dans les données, et une décision validée ne se réécrit pas.

**Arbitrage du 2026-10-08.** La correspondance de substance entre « action générale » et « action générique » est **acceptée pour les cas justifiés individuellement**. **Elle n'est pas une présomption automatique pour les tranches suivantes** : les 14 sens restants de la famille, qui emploient la même formule, seront vérifiés un par un sur leur fiche, sans que la formule vaille justification.

## T4.4 Ce que la lecture fait apparaître

**Une ligne de partage entre les verbes d'action catégorisés et les autres.** Dans les données publiées, un verbe d'action sur un objet porte une catégorie quand sa fiche décrit **où va l'objet** (置く, 並べる, 入れる, 出す « Sortir », 上げる « Lever ») ou **sur quel objet typique** il s'exerce (締める, 着る, 洗う). Il n'en porte pas quand elle décrit **une manière d'agir sur un objet quelconque** : saisir, tenir, pousser, tirer, fixer, accrocher, coller, couper, ouvrir, fermer. Les fiches de cette tranche sont de la seconde sorte, à une exception près (並ぶ, sens 1). La ligne est cohérente ; elle n'était écrite nulle part.

**Les verdicts sont cohérents avec les intransitifs déjà arbitrés.** 開ける, 閉める et 消す sont reliés par `transitive_of` à 開く, 閉まる et 消える, confirmés L à la tranche 2 pour la même étendue (porte, magasin, contenant ; lumière, feu). Les fiches des transitifs ont été lues pour elles-mêmes ; elles conduisent au même résultat. 持つ, sens 1, est cohérent avec son sens 2 « Posséder » (L).

**Les sept chevauchements avec le volet 1** (un cas n'est audité qu'une fois) :

| Sens | Relevé du criblage | Ce qu'il en reste |
|---|---|---|
| 取る, sens 1 | C1-a, C3-b : « Prendre » dans cinq ENTRY, catégories et types différents | cinq mots, cinq référents ; seul le français les réunit ; aucun écart |
| 開ける | C1-a : « Ouvrir » aussi pour 差す, sens 1 (un parapluie) | autre mot, autre référent ; aucun écart |
| 開ける, 閉める, 消す | C3-e : type `action`, quand l'intransitif relié est `evenement` | différence attendue entre un transitif et son intransitif ; aucun écart |
| 開ける, 閉める, 消す, 並ぶ | C10-a : la raison renvoie la relation à la passe finale | soldé : les relations sont publiées depuis le lot 26 (D1573, D1575, D1577, D1579) |
| 使う | C7-c : « ou » dans une traduction, fonction `connecteur` non examinée | fausse alerte : une conjonction du français dans une glose ; aucune fonction |
| 無くす | C9-a : D0069 cite le §4.4 pour un élément qui n'y est pas tel quel | citation inexacte dans la lettre, conclusion juste (T4.3) |

Ces relevés sont réglés pour les sens de la tranche. **Aucun verdict n'est donné aux autres candidats du volet 1** que ces relevés nomment (乗る, 撮る, 浴びる, 差す sens 1, les intransitifs) ni aux comparables hors tranche (洗う, 置く, 並べる, 見せる).

## T4.5 Réserves, divergences et modification proposée

### Modification retenue (1), non appliquée

| Sens | Classement | Modification retenue | Statut |
|---|---|---|---|
| `v_528_s1` 並ぶ « Faire la queue » | C | `category` : `null` → `espace_proprietes_spatiales › position_localisation`. | retenue à l'arbitrage du 2026-10-08 ; non appliquée |

Elle rejoint la liste des corrections du volet 2, qui compte désormais **six modifications de SENSE, toutes non appliquées** :

| # | SENSE | Classement | Modification retenue |
|---|---|---|---|
| 1 | `v_500_s2` また « Aussi » | F | `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]` (une modification, deux avertissements) |
| 2 | `v_65_s2` 頭 « Esprit » | C | `semantic_type` : `null` → `propriete` |
| 3 | `v_696_s1` 表 « Face » | C | `semantic_type` : `null` → `lieu` |
| 4 | `v_606_s1` 皆 « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` |
| 5 | `v_687_s1` 皆さん « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` |
| 6 | `v_528_s1` 並ぶ « Faire la queue » | C | `category` : `null` → `espace_proprietes_spatiales › position_localisation` ; `semantic_type: action` conservé |

Sept avertissements cesseraient. **Rien n'est exécuté** ; aucune décision historique n'est modifiée.

### Divergences relevées (3)

1. **並ぶ, sens 1, et ses voisins du même lot.** « Aligner / Mettre en rang » (並べる), « Être aligné » (並ぶ, sens 2) et « Poser » (置く) sont en position et localisation ; « Faire la queue / Se mettre en rang » (並ぶ, sens 1) est sans catégorie. C'est le fondement du C proposé.
2. **磨く et 洗う, entre deux lots.** 洗う (lot 03) est en entretien domestique › nettoyage, bien que sa fiche couvre des objets, des vêtements et des aliments ; 磨く (lot 18) est sans catégorie parce que la sienne couvre les dents et les chaussures. Le `null` de 磨く est maintenu (L). **Aucun verdict n'est pris sur 洗う**, qui n'est pas dans les 147 : point pour l'examen des autres candidats du volet 1.
3. **切る, sens 2, et かける, sens 1.** « Passer (un appel) » est en communication › contact ; « Raccrocher (un téléphone) » est sans catégorie. La fiche de 切る justifie la différence (elle joint une connexion et un contact que l'on éteint), mais la traduction principale publiée ne montre que l'appel.

### Réserves, fiche par fiche

- `v_567_s1` 磨く « Brosser » (**L**) : Divergence signalée, sans verdict : 洗う, dont la fiche couvre aussi plusieurs domaines (objets, vêtements, aliments), porte une catégorie depuis le lot 03, quand 磨く n'en porte pas. 洗う n'est pas dans les 147 : c'est un point pour l'examen des autres candidats du volet 1. Si l'arbitrage jugeait « Nettoyage » suffisant pour 磨く, le cas deviendrait C ; la fiche, qui cite d'abord les dents, ne le soutient pas.
- `v_539_s2` 切る « Raccrocher (un téléphone) » (**L**) : La traduction principale publiée, « Raccrocher (un téléphone) », est plus étroite que le sens ; « Éteindre (un contact) » n'est qu'une autre traduction. Il en résulte une asymétrie visible avec かける, sens 1 « Passer (un appel) », catégorisé. Si le sens était réduit à l'appel, « Communication › Contact » conviendrait. Je le signale ; le découpage et la traduction ne sont pas l'objet de cet audit.
- `v_564_s1` 無くす « Perdre (un objet) » (**L**) : D0069 est la seule raison de la tranche qui cite le §4.4 à l'appui de la formule « action générale ». L'écart est de formulation ; aucune donnée n'est en cause, et une décision validée ne se réécrit pas.
- `v_536_s3` 出す « Présenter » (**L**) : « Communication › Transmission » était la catégorie la plus proche, et porte le sens 2 de la même ENTRY. La question a été posée à l'arbitrage du 2026-10-08, qui confirme L : la soumission d'un document ne suffit pas à établir ce domaine.
- `v_528_s1` 並ぶ « Faire la queue » (**C**) : La question de savoir si faire la queue est d'abord une attente a été posée à l'arbitrage du 2026-10-08, qui confirme C : la catégorie est suffisamment pertinente au regard de la fiche entière et des comparables 並べる et 並ぶ, sens 2 ; `semantic_type: action` est conservé. La modification est retenue, non appliquée. Relevé du criblage (C10-a) : le renvoi de D1228 à la passe finale est soldé, la relation étant publiée sur 並べる (D1579), vers le sens 2.

**Après arbitrage** : les questions posées pour 並ぶ, sens 1, et pour 出す, sens 3, sont tranchées (C et L). **Restent conservées** les réserves sur 磨く / 洗う (point pour le volet 1, sans verdict sur 洗う), sur la traduction partielle de 切る, sens 2, et sur la citation de D0069.

## T4.6 Les 22 fiches d'audit

### A · Gestes de la main sur un objet (5 cas)

#### `v_541_s1` · 取る (とる) · « Prendre » — **L**

- **Fiche source** (`n5_v_541`, verbe) : traductions « Prendre ; Saisir ; Obtenir ; Prendre (une photo) ». Nuance : « Verbe transitif (groupe u) désignant l'action de saisir ou de prendre un objet avec la main, d'obtenir quelque chose (comme une note ou un permis), ou de prendre une photo (*shashin o toru*). » Exemple : « テーブル の うえ の ぺん を 取っ て ください 。 » — « Veuillez prendre le stylo qui est sur la table. »
- **État publié** : sens 1 sur 2 ; traduction « Prendre » (Saisir) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Obtenir » (`null`, `action`).
- **Justification historique** : D1202 (lot 18) : « Saisir ou prendre un objet avec la main : action générale, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 持つ, sens 1 « Tenir », dont la raison renvoie à ce sens, est sans catégorie (même tranche). 置く « Poser » est en espace › position et localisation : sa fiche décrit le lieu où l'objet est placé. Le criblage rapprochait cinq sens traduits « Prendre » (C1-a, C3-b) : 乗る (un transport), 撮る (une photo), 浴びる (une douche), かかる (du temps) et celui-ci ; ce sont cinq mots et cinq référents, que seul le français réunit ; aucun écart.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de saisir ou de prendre un objet avec la main » ; l'exemple dit « veuillez prendre le stylo qui est sur la table ». Un geste de la main sur un objet quelconque : aucun domaine d'A2-L3 ne le décrit, et seule une catégorie « Actions », que l'architecture refuse, l'accueillerait. L'emploi « prendre une photo » a été écarté comme confusion de la source (D1201) ; il ne donne aucun domaine à ce sens. La raison de D1202 tient.

#### `v_665_s1` · 持つ (もつ) · « Tenir » — **L**

- **Fiche source** (`n5_v_665`, verbe) : traductions « Tenir ; Porter (en main) ; Posséder ; Avoir sur soi ». Nuance : « Verbe transitif (groupe u) exprimant l'action physique de tenir ou de porter quelque chose dans ses mains, ou par extension de posséder un objet ou un sentiment. » Exemple : « かばん を 持っ て いき ます 。 » — « Je porte (tiens) mon sac en y allant. »
- **État publié** : sens 1 sur 2 ; traduction « Tenir » (Porter (en main), Avoir sur soi) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Posséder » (`null`, `etat`).
- **Justification historique** : D1310 (lot 20) : « Tenir ou porter quelque chose dans ses mains : action générale, sans domaine thématique propre, comme 取る (lot 18). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : 取る, sens 1 « Prendre », auquel la raison renvoie, est sans catégorie (même tranche). Le sens 2 de la même ENTRY, « Posséder », a été confirmé L. かばん « Sac », objet de l'exemple, est en habillement › sacs et contenants personnels.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action physique de tenir ou de porter quelque chose dans ses mains » ; l'exemple dit « je porte (tiens) mon sac en y allant ». Avoir un objet en main ou sur soi, quel qu'il soit : aucun domaine. Le sac de l'exemple est un contexte. « Porter » n'est pas ici un déplacement : la fiche dit « dans ses mains », non d'un lieu à un autre. Sur la lecture de cette fiche, et non par renvoi à 取る : la raison de D1310 tient.

#### `v_79_s1` · 押す (おす) · « Pousser » — **L**

- **Fiche source** (`n5_v_79`, verbe godan) : traductions « Pousser ; Appuyer sur (un bouton) ; Tamponner ». Nuance : « Verbe godan très courant au quotidien, désignant l'action de pousser un objet, d'appuyer sur un bouton, ou d'appliquer un tampon/sceau. » Exemple : « ドア の ボタン を 押して 、電車 を 降ります 。 » — « J'appuie sur le bouton de la porte pour descendre du train. »
- **État publié** : sens 1 sur 1 ; traduction « Pousser » (Appuyer sur (un bouton), Tamponner) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1208 (lot 18) : « Pousser un objet, appuyer sur un bouton ou apposer un tampon : action générale, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre » ; « Entrée & sortie → Entrer / sortir ».
- **Comparables examinés** : 上げる, sens 2 « Lever », est en espace › mouvement et déplacement › monter, descendre : sa fiche décrit le fait de « lever, élever ou monter un objet », une direction. 引く, sens 1 « Tirer », est sans catégorie (même tranche). ボタン, sens 2 « Bouton (d'appareil) », est en technologie › appareils électroniques : c'est l'objet.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de pousser un objet, d'appuyer sur un bouton, ou d'appliquer un tampon/sceau » ; l'exemple dit « j'appuie sur le bouton de la porte ». Trois objets pour un même geste, exercer une pression (D1207) : dans deux des trois, rien ne se déplace. Le mouvement ne décrit donc pas le sens, à la différence de 上げる, et ni le bouton ni le tampon ne donnent un domaine commun. La raison de D1208 tient.

#### `v_130_s1` · 引く (ひく) · « Tirer » — **L**

- **Fiche source** (`n5_v_130`, verbe godan) : traductions « Tirer ; Tracer (une ligne) ; Chercher (dans un dictionnaire) ; Jouer d'un instrument à cordes ». Nuance : « Verbe d'action polyvalent. Son sens premier est de tirer. Il s'utilise aussi dans des expressions, comme feuilleter ou chercher dans un dictionnaire 辞書を引く(jisho o hiku), ou encore jouer d'un instrument à cordes ou du piano. » Exemple : « わからない 言葉 を 辞書 で 引きます 。 » — « Je cherche un mot que je ne connais pas dans le dictionnaire. »
- **État publié** : sens 1 sur 2 ; traduction « Tirer » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Chercher (dans un dictionnaire) » (`communication_langage › langues`, `action`).
- **Justification historique** : D1212 (lot 18) : « Tirer quelque chose : action générale, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre » ; « Entrée & sortie → Entrer / sortir ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 押す « Pousser » est sans catégorie (même tranche). 上げる, sens 2 « Lever », est en mouvement et déplacement › monter, descendre. Le sens 2 de la même ENTRY, « Chercher (dans un dictionnaire) », est en communication et langage › langues.
- **Verdict** : **L**.
- **Motivation** : La fiche dit seulement : « son sens premier est de tirer » ; l'exemple illustre le sens 2, et ce sens repose sur cette phrase et sur la traduction « Tirer ». La fiche ne dit ni ce que l'on tire, ni vers où : elle ne décrit pas un déplacement dans une direction, comme celle de 上げる. Rien n'y désigne un domaine. Les deux autres emplois de la source ont été écartés (D1210, confusion avec 弾く ; D1211, non développé) et ne donnent aucun domaine à ce sens. La raison de D1212 tient.

#### `v_50_s2` · 差す (さす) · « Pointer » — **L**

- **Fiche source** (`n5_v_50`, verbe godan) : traductions « Ouvrir (un parapluie) ; Lever (une main, un parasol) ; Pointer ; Verser (des gouttes) ». Nuance : « Verbe godan employé spécifiquement pour l'action d'ouvrir et de tenir un parapluie au-dessus de soi (傘を差す, kasa o sasu), ou de tendre la main ou pointer quelque chose. » Exemple : « 雨 が 降ってきた ので 、傘 を 差します 。 » — « La pluie s'étant mise à tomber, j'ouvre un parapluie. »
- **État publié** : sens 2 sur 2 ; traduction « Pointer » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Ouvrir (un parapluie) » (`habillement_accessoires_personnels › accessoires_vestimentaires`, `action`).
- **Justification historique** : D1217 (lot 18) : « Tendre la main ou pointer quelque chose : action générale, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Communication & langage : « Communication → Transmission ; Échange ; Contact ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Ouvrir (un parapluie) », est en habillement › accessoires vestimentaires. 見せる « Montrer » et 教える, sens 2 « Indiquer », sont en communication › transmission : leurs fiches disent « faire voir un objet ou une information », « indiquer une information ou un chemin à quelqu'un ». 座る et 立つ, des postures, sont sans catégorie (tranche suivante, non audités).
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe s'emploie aussi pour « tendre la main ou pointer quelque chose » ; l'exemple illustre le sens 1, et ce sens repose sur ces mots et sur la traduction « Pointer ». La fiche décrit un geste, non le fait de faire savoir quelque chose à quelqu'un : elle ne nomme ni destinataire ni information, ce qui distingue ce sens de 見せる et de 教える. Elle ne décrit pas non plus une direction dans l'espace. Aucun domaine ne nomme un geste de la main. La raison de D1217 tient.

### B · Fixer, coller, couper, frotter (5 cas)

#### `v_522_s2` · 付ける (つける) · « Fixer » — **L**

- **Fiche source** (`n5_v_522`, verbe) : traductions « Allumer ; Fixer ; Attacher ; Appliquer ». Nuance : « Verbe transitif (groupe ichidan / ru) signifiant l'action de mettre en marche un appareil électrique (lumière, climatiseur, télévision) ou d'attacher/fixer quelque chose. » Exemple : « へや の でんき を 付けて ください 。 » — « Veuillez allumer la lumière de la pièce. »
- **État publié** : sens 2 sur 2 ; traduction « Fixer » (Attacher) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Allumer » (`null`, `action`).
- **Justification historique** : D1195 (lot 18) : « Attacher ou fixer quelque chose : action générale, sans domaine thématique propre, comme le sens « accrocher » de かける (lot 08). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : かける, sens 3 « Accrocher », auquel la raison renvoie, et 貼る « Coller » sont sans catégorie (même tranche). 締める « Serrer » est en habillement › accessoires vestimentaires : sa fiche cite la cravate et la ceinture. 置く « Poser » est en position et localisation. Le sens 1 de la même ENTRY est sans catégorie (audité à part).
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe signifie aussi « attacher/fixer quelque chose » ; l'exemple illustre le sens 1, et ce sens repose sur ces mots et sur les traductions « Fixer », « Attacher ». La fiche ne dit ni quoi, ni à quoi, ni où : aucun objet typique ne donne un domaine, à la différence de 締める, et elle ne décrit pas un lieu, à la différence de 置く. La raison de D1195 tient.

#### `v_164_s3` · かける (かける) · « Accrocher » — **L**

- **Fiche source** (`n5_v_164`, verbe ichidan) : traductions « Téléphoner ; Passer un appel ; Mettre (des lunettes) ; Accrocher ». Nuance : « Verbe ichidan d'une polyvalence extrême dont le sens dépend entièrement du nom auquel il est associé. S'écrit majoritairement en hiragana à ce niveau. Son sens s'oriente vers le fait de projeter ou d'appliquer quelque chose sur un support, comme une action vers autrui ou l'installation de lunettes sur le visage. » Exemple : « 母 に 電話 を かけます 。 » — « Je téléphone à ma mère. »
- **État publié** : sens 3 sur 3 ; traduction « Accrocher » (Suspendre) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Passer (un appel) » (`communication_langage › communication › contact`, `action`) ; « Mettre (des lunettes) » (`habillement_accessoires_personnels › accessoires_vestimentaires`, `action`).
- **Justification historique** : D0521 (lot 08) : « Accrocher, suspendre un objet : action générale, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre » ; « Entrée & sortie → Entrer / sortir ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 置く « Poser » est en espace › position et localisation : sa fiche décrit « poser ou placer un objet sur une surface (table, étagère, sol) » (D1220). Les sens 1 et 2 de la même ENTRY sont en communication › contact et en habillement › accessoires vestimentaires. 付ける, sens 2 « Fixer », dont la raison renvoie à ce sens, est sans catégorie (même tranche).
- **Verdict** : **L**.
- **Motivation** : La fiche ne développe pas cet emploi : il repose sur la seule traduction « Accrocher ». Sa nuance dit que le sens du verbe « dépend entièrement du nom auquel il est associé » et s'oriente « vers le fait de projeter ou d'appliquer quelque chose sur un support » ; l'exemple illustre le sens 1. J'ai examiné « Position & localisation », qui porte 置く : la fiche de 置く décrit le lieu où l'objet est posé ; celle-ci ne décrit ni lieu ni objet pour « accrocher », et « un support » vaut pour ses trois sens. Elle n'est pas assez précise pour fonder une catégorie. La raison de D0521 tient.

#### `v_576_s1` · 貼る (はる) · « Coller » — **L**

- **Fiche source** (`n5_v_576`, verbe) : traductions « Coller ; Afficher ; Fixer avec de la colle ou un adhésif ». Nuance : « Verbe transitif (groupe u) désignant l'action de coller un timbre, une affiche, une étiquette ou du ruban adhésif sur une surface. » Exemple : « ふうとう に きって を 貼り ます 。 » — « Je colle un timbre sur l'enveloppe. »
- **État publié** : sens 1 sur 1 ; traduction « Coller » (Afficher) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1204 (lot 18) : « Coller quelque chose sur une surface : action générale, sans domaine thématique propre ; le timbre de l'exemple n'est qu'un des objets que cite la fiche. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre » ; « Entrée & sortie → Entrer / sortir ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : 置く « Poser » est en position et localisation, pour un objet placé sur une surface. テープ, sens 1 « Ruban adhésif », est en habitat › accessoires domestiques et 切手 « Timbre » en communication › transmission : ce sont des objets que la fiche cite. 付ける, sens 2 « Fixer », est sans catégorie (même tranche).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de coller un timbre, une affiche, une étiquette ou du ruban adhésif sur une surface » ; l'exemple dit « je colle un timbre sur l'enveloppe ». Quatre objets de domaines différents, ce que D1204 relève : le timbre de l'exemple n'en est qu'un. « Sur une surface » rappelle 置く, mais le sens est ici la manière de fixer, par adhésion, non l'endroit où l'objet se trouve. Aucun domaine ne nomme le collage. La raison tient.

#### `v_539_s1` · 切る (きる) · « Couper » — **L**

- **Fiche source** (`n5_v_539`, verbe) : traductions « Couper ; Trancher ; Éteindre (un contact) ; Raccrocher (un téléphone) ». Nuance : « Verbe transitif (groupe u) exprimant l'action physique de trancher ou de couper un matériau avec un outil (ciseaux, couteau), ou de couper une connexion / un appel. » Exemple : « はさみ で かみ を 切り ます 。 » — « Je coupe du papier avec des ciseaux. »
- **État publié** : sens 1 sur 2 ; traduction « Couper » (Trancher) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Raccrocher (un téléphone) » (`null`, `action`).
- **Justification historique** : D1198 (lot 18) : « Couper un matériau avec un outil : action générale, sans domaine thématique propre ; la découpe en cuisine n'en est qu'un cas, et l'exemple porte sur du papier. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Alimentation & cuisine : « Cuisine & préparation → Découpe ; Mélange & préparation ; Cuisson ; Assaisonnement ». A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : 作る, sens 2 « Préparer (un repas) », est en alimentation › cuisine et préparation. ナイフ « Couteau » est en alimentation › vaisselle et ustensiles › couverts. Le sens 2 de la même ENTRY est sans catégorie (audité à part).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action physique de trancher ou de couper un matériau avec un outil (ciseaux, couteau) » ; l'exemple dit « je coupe du papier avec des ciseaux ». A2-L3 nomme la découpe, mais en cuisine : la fiche parle d'« un matériau », et son exemple porte sur du papier. La catégorie de la cuisine ne décrirait qu'un cas, ce que D1198 dit. La raison tient.

#### `v_567_s1` · 磨く (みがく) · « Brosser » — **L**

- **Fiche source** (`n5_v_567`, verbe) : traductions « Brosser ; Polir ; Frotter ; Nettoyer (les dents, des chaussures) ». Nuance : « Verbe transitif (groupe u) exprimant l'action de frotter pour nettoyer ou faire briller, le plus souvent utilisé pour se brosser les dents (*ha o migaku*) ou cirer des chaussures. » Exemple : « まいあさ は を 磨き ます 。 » — « Je me brosse les dents tous les matins. »
- **État publié** : sens 1 sur 1 ; traduction « Brosser » (Polir, Frotter) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1238 (lot 18) : « Frotter pour nettoyer ou faire briller : action générale. Les dents relèveraient des soins bucco-dentaires et les chaussures de l'entretien ; aucun domaine ne couvre les deux, et le sens est unique. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Entretien domestique → Nettoyage ; Lessive ; Gestion des déchets » (Habitat & vie domestique) ; « Hygiène & soins personnels → Toilette corporelle ; Soins des cheveux ; Soins bucco-dentaires ; Soins esthétiques » (Être humain). Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine.
- **Comparables examinés** : 洗う « Laver » (lot 03) est en habitat › entretien domestique › nettoyage : sa fiche parle de « laver des objets, des vêtements ou des aliments avec de l'eau ». きれい, sens 2 « Propre », et 汚い, sens 1 « Sale », sont dans la même catégorie. 浴びる, sens 1 « Prendre (une douche) », est en hygiène et soins personnels › toilette corporelle.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de frotter pour nettoyer ou faire briller, le plus souvent utilisé pour se brosser les dents ou cirer des chaussures » ; l'exemple dit « je me brosse les dents tous les matins ». Les dents relèvent de l'hygiène de la personne, les chaussures de l'entretien des objets : deux niveaux 1, et la fiche met les dents en premier. Le sens est unique, par un choix arbitré au lot 18 (D1237). Aucune des deux catégories ne décrit le sens entier ; la doctrine du lot 19 s'applique. La raison de D1238 tient.
- **Réserve** : Divergence signalée, sans verdict : 洗う, dont la fiche couvre aussi plusieurs domaines (objets, vêtements, aliments), porte une catégorie depuis le lot 03, quand 磨く n'en porte pas. 洗う n'est pas dans les 147 : c'est un point pour l'examen des autres candidats du volet 1. Si l'arbitrage jugeait « Nettoyage » suffisant pour 磨く, le cas deviendrait C ; la fiche, qui cite d'abord les dents, ne le soutient pas.

### C · Ouvrir, fermer, allumer, éteindre (5 cas)

#### `v_580_s1` · 開ける (あける) · « Ouvrir » — **L**

- **Fiche source** (`n5_v_580`, verbe) : traductions « Ouvrir ; Déverrouiller ; Déballer ». Nuance : « Verbe transitif (groupe ichidan / ru) exprimant l'action intentionnelle d'ouvrir une porte, une fenêtre, une boîte ou un contenant (par opposition au verbe intransitif *aku* 開く qui signifie « s'ouvrir »). » Exemple : « まど を 開け て ください 。 » — « Veuillez ouvrir la fenêtre. »
- **État publié** : sens 1 sur 1 ; traduction « Ouvrir » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations `transitive_of` → `v_710_s1` ; classe `verbe`.
- **Justification historique** : D1172 (lot 18) : « Ouvrir une porte, une fenêtre, une boîte ou un contenant : action générale, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Éléments architecturaux → Murs ; Toits ; Portes & fenêtres ; Escaliers ; Étages » (Environnement construit) ; « Rangement » (Habitat & vie domestique). A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « transitif / intransitif » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : 開く « S'ouvrir », auquel ce sens est relié par `transitive_of`, a été confirmé L : « portes et fenêtres » ne couvrait ni le magasin ni le contenant. 閉める « Fermer » est sans catégorie (même tranche). ドア, 戸 et 窓 sont en environnement construit › éléments architecturaux › portes et fenêtres, 箱 « Boîte » en habitat › rangement : ce sont les objets. 差す, sens 1, se traduit « Ouvrir (un parapluie) » : autre mot, autre référent (criblage, C1-a) ; aucun écart.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action intentionnelle d'ouvrir une porte, une fenêtre, une boîte ou un contenant » ; l'exemple dit « veuillez ouvrir la fenêtre ». La porte et la fenêtre relèvent d'un domaine, la boîte d'un autre : la fiche en nomme deux, et ranger le verbe avec ses objets ferait du contexte un domaine. Le verdict est cohérent avec celui de 開く. La raison de D1172 tient. Relevés du criblage : le type diffère de celui de 開く (`action` contre `evenement`, C3-e), ce qui est la différence attendue entre un transitif et son intransitif ; le renvoi de D1175 à la passe finale (C10-a) est soldé, la relation étant publiée depuis le lot 26 (D1573).

#### `v_709_s1` · 閉める (しめる) · « Fermer » — **L**

- **Fiche source** (`n5_v_709`, verbe) : traductions « Fermer ; Fermer une porte, une fenêtre ou un tiroir ». Nuance : « Verbe transitif (groupe ichidan / ru) exprimant l'action de fermer quelque chose (comme une porte, une fenêtre ou un couvercle), par opposition au verbe intransitif *shimaru*. » Exemple : « 1sutekina mado o 閉め て ください 。 » — « Veuillez fermer la fenêtre. »
- **État publié** : sens 1 sur 1 ; traduction « Fermer » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations `transitive_of` → `v_579_s1` ; classe `verbe`.
- **Justification historique** : D1180 (lot 18) : « Fermer une porte, une fenêtre, un tiroir ou un couvercle : action générale, sans domaine thématique propre, comme 開ける. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Éléments architecturaux → Murs ; Toits ; Portes & fenêtres ; Escaliers ; Étages » (Environnement construit) ; « Rangement » (Habitat & vie domestique). A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « transitif / intransitif » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : 閉まる « Se fermer », relié par `transitive_of`, a été confirmé L. 開ける « Ouvrir », auquel la raison renvoie, est sans catégorie (même tranche). 締める « Serrer », homophone que sa propre fiche demande de ne pas confondre, est en habillement › accessoires vestimentaires.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de fermer quelque chose (comme une porte, une fenêtre ou un couvercle) » ; sa traduction ajoute « un tiroir ». L'exemple, dont le texte japonais est altéré (D1182), se traduit « veuillez fermer la fenêtre ». Une porte, une fenêtre, un couvercle, un tiroir : des objets de domaines différents, introduits par « comme ». Aucun ne donne le domaine du verbe. Sur la lecture de cette fiche, et non par renvoi à 開ける : la raison de D1180 tient. Relevés du criblage : même différence de type attendue avec 閉まる (C3-e) ; le renvoi de D1183 (C10-a) est soldé par D1575.

#### `v_522_s1` · 付ける (つける) · « Allumer » — **L**

- **Fiche source** (`n5_v_522`, verbe) : traductions « Allumer ; Fixer ; Attacher ; Appliquer ». Nuance : « Verbe transitif (groupe ichidan / ru) signifiant l'action de mettre en marche un appareil électrique (lumière, climatiseur, télévision) ou d'attacher/fixer quelque chose. » Exemple : « へや の でんき を 付けて ください 。 » — « Veuillez allumer la lumière de la pièce. »
- **État publié** : sens 1 sur 2 ; traduction « Allumer » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Fixer » (`null`, `action`).
- **Justification historique** : D1194 (lot 18) : « Mettre en marche un appareil électrique : action générale, sans domaine thématique propre, comme le sens « éteindre » de 消す. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Équipements domestiques → Électroménager ; Chauffage & climatisation ; Équipements fonctionnels » (Habitat & vie domestique) ; « Appareils électroniques » (Technologie) ; « Télévision » (Médias). A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : 消す, sens 1 « Éteindre », auquel la raison renvoie, est sans catégorie (même tranche) ; 消える, sens 1 « S'éteindre », a été confirmé L. Les appareils que cite la fiche sont publiés dans des catégories différentes : 電気, sens 2 « Lumière », en habitat › équipements domestiques › équipements fonctionnels ; ストーブ « Poêle (de chauffage) » en chauffage et climatisation ; テレビ « Télévision » en médias › télévision.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de mettre en marche un appareil électrique (lumière, climatiseur, télévision) » ; l'exemple dit « veuillez allumer la lumière de la pièce ». À la différence de 消す, la fiche ne parle pas du feu : j'ai donc examiné « Équipements domestiques ». Mais les trois appareils qu'elle cite relèvent, dans les données publiées, de deux niveaux 1 (habitat, médias) : aucune catégorie ne couvre « un appareil électrique », et ranger le verbe avec l'un d'eux ferait du contexte un domaine. La raison de D1194 tient.

#### `v_561_s1` · 消す (けす) · « Éteindre » — **L**

- **Fiche source** (`n5_v_561`, verbe) : traductions « Éteindre ; Effacer ; Faire disparaître ». Nuance : « Verbe transitif (groupe u) désignant l'action intentionnelle d'éteindre un appareil électrique, une lumière ou un feu, ou d'effacer des notes écrites (avec une gomme par exemple). » Exemple : « ねる まえ に テレビ を 消し て ください 。 » — « Veuillez éteindre la télévision avant de dormir. »
- **État publié** : sens 1 sur 2 ; traduction « Éteindre » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations `transitive_of` → `v_560_s1` ; classe `verbe`. Autres sens : « Effacer » (`communication_langage › ecriture`, `action`).
- **Justification historique** : D1189 (lot 18) : « Éteindre un appareil électrique, une lumière ou un feu : action générale, sans domaine thématique propre ; aucun domaine ne couvre à la fois l'appareil et le feu. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Équipements domestiques → Électroménager ; Chauffage & climatisation ; Équipements fonctionnels » (Habitat & vie domestique) ; « Appareils électroniques » (Technologie) ; « Télévision » (Médias). A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « transitif / intransitif » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».
- **Comparables examinés** : 消える, sens 1 « S'éteindre », relié par `transitive_of`, a été confirmé L pour la même étendue (lumière, feu, source d'énergie). 付ける, sens 1 « Allumer », est sans catégorie (même tranche). Le sens 2 de la même ENTRY, « Effacer », est en communication et langage › écriture.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action intentionnelle d'éteindre un appareil électrique, une lumière ou un feu » ; l'exemple dit « veuillez éteindre la télévision avant de dormir ». Un appareil et un feu n'ont pas de domaine commun, ce que D1189 dit. Le verdict est cohérent avec celui de 消える. La raison tient. Relevés du criblage : différence de type attendue avec 消える (C3-e) ; le renvoi de D1192 (C10-a) est soldé par D1577.

#### `v_539_s2` · 切る (きる) · « Raccrocher (un téléphone) » — **L**

- **Fiche source** (`n5_v_539`, verbe) : traductions « Couper ; Trancher ; Éteindre (un contact) ; Raccrocher (un téléphone) ». Nuance : « Verbe transitif (groupe u) exprimant l'action physique de trancher ou de couper un matériau avec un outil (ciseaux, couteau), ou de couper une connexion / un appel. » Exemple : « はさみ で かみ を 切り ます 。 » — « Je coupe du papier avec des ciseaux. »
- **État publié** : sens 2 sur 2 ; traduction « Raccrocher (un téléphone) » (Éteindre (un contact)) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Couper » (`null`, `action`).
- **Justification historique** : D1199 (lot 18) : « Couper une connexion ou un appel : action générale, sans domaine thématique propre. L'appel seul relèverait de communication › contact, comme le sens « passer un appel » de かける (lot 08), mais la fiche réunit l'appel et la connexion, et donne « éteindre (un contact) ». Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Communication & langage : « Communication → Transmission ; Échange ; Contact ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine.
- **Comparables examinés** : かける, sens 1 « Passer (un appel) », est en communication et langage › communication › contact. 消す, sens 1 « Éteindre », est sans catégorie (même tranche). 電話 « Téléphone (appareil) » est en technologie › appareils électroniques › téléphones.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe signifie aussi « couper une connexion / un appel » ; ses traductions donnent « Éteindre (un contact) » et « Raccrocher (un téléphone) » ; l'exemple illustre le sens 1. L'appel seul relèverait de « Contact », comme かける ; mais la fiche y joint une connexion, et un contact que l'on éteint, qui n'est pas une communication. Le sens est unique (D1197) et déborde ce domaine. La raison de D1199, qui l'explique, tient.
- **Réserve** : La traduction principale publiée, « Raccrocher (un téléphone) », est plus étroite que le sens ; « Éteindre (un contact) » n'est qu'une autre traduction. Il en résulte une asymétrie visible avec かける, sens 1 « Passer (un appel) », catégorisé. Si le sens était réduit à l'appel, « Communication › Contact » conviendrait. Je le signale ; le découpage et la traduction ne sont pas l'objet de cet audit.

### D · Actions sans objet typique (4 cas)

#### `v_637_s1` · 使う (つかう) · « Utiliser » — **L**

- **Fiche source** (`n5_v_637`, verbe) : traductions « Utiliser ; Se servir de ; Employer (un objet ou une langue) ». Nuance : « Verbe transitif (groupe u) très courant signifiant utiliser un objet, un outil, de l'argent, une langue ou un service. » Exemple : « この パソコン を 使い ます 。 » — « J'utilise cet ordinateur. »
- **État publié** : sens 1 sur 1 ; traduction « Utiliser » (Se servir de, Employer (un objet ou une langue)) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1206 (lot 18) : « Utiliser un objet, un outil, de l'argent, une langue ou un service : action générale, sans domaine thématique propre ; la fiche réunit ces emplois dans une seule description. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A9, §3.1 : le `connecteur` relie « l'énoncé qu'il introduit à un énoncé ou à une situation qui précède » ; A9, §2.2 : une fonction ne s'attribue jamais par la classe, ni, a fortiori, par un mot de la traduction.
- **Comparables examinés** : Aucun autre sens publié n'exprime l'usage. 便利 « Pratique », qui porte l'axe utilité, est sans catégorie (L).
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe signifie « utiliser un objet, un outil, de l'argent, une langue ou un service » ; l'exemple dit « j'utilise cet ordinateur ». Cinq sortes de choses, de l'économie au langage : la fiche nomme elle-même la généralité du sens. C'est l'action générique au sens le plus strict. La raison de D1206 tient. Relevé du criblage (C7-c) : la règle a vu « ou » dans la traduction « Employer (un objet ou une langue) » ; c'est une conjonction du français dans une glose, non un rôle du mot japonais. Aucune fonction `connecteur` n'est en cause.

#### `v_545_s1` · 変える (かえる) · « Changer » — **L**

- **Fiche source** (`n5_v_545`, verbe) : traductions « Changer ; Modifier ; Transformer ; Remplacer ». Nuance : « Verbe transitif (groupe ichidan / ru) exprimant l'action de modifier, de transformer ou de remplacer quelque chose (par opposition au verbe intransitif *kawaru* qui désigne un changement qui se produit de lui-même). » Exemple : « よみかた を 変え ます 。 » — « Je change la manière de lire. »
- **État publié** : sens 1 sur 1 ; traduction « Changer » (Modifier, Transformer, Remplacer) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1232 (lot 18) : « Modifier, transformer ou remplacer quelque chose : action générale, sans domaine thématique propre ; l'exemple de la fiche (la manière de lire) est abstrait. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-DIM-v1, §5 : « transformation/modification » est une famille « non promue à ce stade » ; elle n'est pas non plus une catégorie.
- **Comparables examinés** : なる « Devenir » a été confirmé L : aucun sens publié ne range le changement dans un domaine. 着る « Mettre (un vêtement) » et 脱ぐ « Enlever (un vêtement) » sont en habillement › vêtements : leurs traductions nomment le vêtement.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de modifier, de transformer ou de remplacer quelque chose » ; l'exemple dit « je change la manière de lire ». « Quelque chose » : la fiche ne borne pas l'objet, et son exemple est abstrait. A2-DIM a examiné la transformation comme famille et ne l'a pas promue ; aucune catégorie ne la nomme. Le verdict est cohérent avec celui de なる. La raison de D1232 tient.

#### `v_532_s1` · 作る (つくる) · « Fabriquer » — **L**

- **Fiche source** (`n5_v_532`, verbe) : traductions « Fabriquer ; Préparer (un repas) ; Créer ; Produire ». Nuance : « Verbe transitif (groupe u) exprimant l'action de fabriquer un objet, de cuisiner un plat ou de créer quelque chose de matériel ou d'immatériel. » Exemple : « まいにち ばんごはん を 作り ます 。 » — « Je prépare le dîner tous les jours. »
- **État publié** : sens 1 sur 2 ; traduction « Fabriquer » (Créer, Produire) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Préparer (un repas) » (`alimentation_cuisine › cuisine_preparation`, `action`).
- **Justification historique** : D1236 (lot 18) : « Fabriquer un objet, créer quelque chose de matériel ou d'immatériel : action générale, sans domaine thématique propre ; « fabrication », dans le registre, est un domaine industriel. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Fabrication → Assemblage ; Usinage ; Fabrication » (Production & industrie) ; « Création artistique » (Arts & création). A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 2 de la même ENTRY, « Préparer (un repas) », est en alimentation › cuisine et préparation. 撮る « Prendre (une photo) » est en arts et création › arts visuels. 出来る, sens 2 « Être achevé / prêt », est sans catégorie (non audité ici).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit l'action « de fabriquer un objet […] ou de créer quelque chose de matériel ou d'immatériel » ; l'exemple illustre le sens 2. A2-L3 nomme la fabrication, mais dans « Production & industrie », avec l'assemblage et l'usinage : un domaine industriel, ce que D1236 relève. « Création artistique » ne décrirait que ce que crée un art. La fiche réunit le matériel et l'immatériel : aucun domaine ne couvre les deux. La raison tient.

#### `v_564_s1` · 無くす (なくす) · « Perdre (un objet) » — **L**

- **Fiche source** (`n5_v_564`, verbe) : traductions « Perdre (un objet) ; Égarer ; Se débarrasser de ». Nuance : « Verbe transitif (groupe u) exprimant l'action de perdre un objet matériel, de l'égarer au point de ne plus le retrouver (à ne pas confondre avec le verbe intransitif *nakunaru* なくなる qui signifie « disparaître » ou « décéder »). » Exemple : « さいふ を 無くし まし た 。 » — « J'ai perdu mon portefeuille. »
- **État publié** : sens 1 sur 1 ; traduction « Perdre (un objet) » (Égarer) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D0069 (lot 00) : « « Perdre (un objet) » : action générale, hors de la hiérarchie thématique (A2-GLOBAL §4.4). Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : 持つ « Tenir » est sans catégorie (même tranche) ; ある et 持つ, sens « Posséder », ont été confirmés L. 忘れる « Oublier » est en psychologie et esprit › mémoire. 財布 « Portefeuille », objet de l'exemple, est en habillement › sacs et contenants personnels.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de perdre un objet matériel, de l'égarer au point de ne plus le retrouver » ; l'exemple dit « j'ai perdu mon portefeuille ». Ne plus avoir un objet, quel qu'il soit : aucun domaine ne nomme la perte, pas plus que la possession. Ce n'est pas un oubli : la fiche ne parle pas de mémoire. La conclusion de D0069 tient. Sa citation, elle, est inexacte dans la lettre (criblage, C9-a) : A2-GLOBAL §4.4 nomme l'« action générique », non l'« action générale » ; voir T4.3.
- **Réserve** : D0069 est la seule raison de la tranche qui cite le §4.4 à l'appui de la formule « action générale ». L'écart est de formulation ; aucune donnée n'est en cause, et une décision validée ne se réécrit pas.

### E · Obtenir, soumettre, se mettre en rang (3 cas)

#### `v_541_s2` · 取る (とる) · « Obtenir » — **L**

- **Fiche source** (`n5_v_541`, verbe) : traductions « Prendre ; Saisir ; Obtenir ; Prendre (une photo) ». Nuance : « Verbe transitif (groupe u) désignant l'action de saisir ou de prendre un objet avec la main, d'obtenir quelque chose (comme une note ou un permis), ou de prendre une photo (*shashin o toru*). » Exemple : « テーブル の うえ の ぺん を 取っ て ください 。 » — « Veuillez prendre le stylo qui est sur la table. »
- **État publié** : sens 2 sur 2 ; traduction « Obtenir » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Prendre » (`null`, `action`).
- **Justification historique** : D1203 (lot 18) : « Obtenir une note ou un permis : action générale, sans domaine thématique propre ; la fiche ne le rattache ni à l'école ni à l'administration en particulier. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Évaluation scolaire → Examens ; Notes ; Réussite / échec scolaire » (Éducation & apprentissage) ; « Administration publique → Administrations ; Services administratifs ; Documents administratifs » (Politique & institutions publiques). A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : テスト « Examen » et 問題, sens 2 « Question (d'examen) », sont en éducation › évaluation scolaire › examens. 買う « Acheter » est en économie › achat et vente › achat. Le sens 1 de la même ENTRY est sans catégorie (audité à part).
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe signifie aussi « obtenir quelque chose (comme une note ou un permis) » ; l'exemple illustre le sens 1. La note relèverait de l'évaluation scolaire, le permis de l'administration : deux domaines, que la fiche ne donne qu'en exemples (« comme ») d'un « quelque chose ». Aucun ne décrit le sens. La raison de D1203, qui le dit, tient.

#### `v_536_s3` · 出す (だす) · « Présenter » — **L**

- **Fiche source** (`n5_v_536`, verbe) : traductions « Sortir ; Envoyer (du courrier) ; Mettre dehors ; Présenter ». Nuance : « Verbe transitif (groupe u) exprimant l'action de faire sortir quelque chose d'un endroit, de poster une lettre ou de soumettre un document. » Exemple : « てがみ を ポスト に 出し ます 。 » — « Je poste (sors) une lettre dans la boîte aux lettres. »
- **État publié** : sens 3 sur 3 ; traduction « Présenter » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Sortir » (`espace_proprietes_spatiales › entree_sortie › entrer_sortir`, `action`) ; « Envoyer (du courrier) » (`communication_langage › communication › transmission`, `action`).
- **Justification historique** : D1225 (lot 18) : « Soumettre ou présenter un document : action générale, sans domaine thématique propre ; la fiche ne le rattache ni à l'école ni à l'administration. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Communication & langage : « Communication → Transmission ; Échange ; Contact ». A2-L3-v1, §5 : « Évaluation scolaire → Examens ; Notes ; Réussite / échec scolaire » (Éducation & apprentissage) ; « Administration publique → Administrations ; Services administratifs ; Documents administratifs » (Politique & institutions publiques). A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 2 de la même ENTRY, « Envoyer (du courrier) », est en communication › transmission, comme 見せる « Montrer » (« faire voir un objet ou une information ») et 教える, sens 2 « Indiquer ». 渡す, sens 1 « Remettre », est sans catégorie (tranche suivante, non audité).
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe exprime aussi l'action « de soumettre un document » ; l'exemple illustre le sens 2, et ce sens repose sur ces mots et sur la traduction « Présenter ». La fiche ne dit ni à qui, ni dans quel cadre : ni l'école ni l'administration, ce que D1225 relève. J'ai examiné « Transmission », que la raison ne discutait pas : soumettre un document, c'est le remettre pour qu'il soit reçu, non faire connaître une information à quelqu'un ; la fiche ne nomme aucun contenu communiqué. Elle n'est pas assez précise pour fonder cette catégorie. La raison tient.
- **Réserve** : « Communication › Transmission » était la catégorie la plus proche, et porte le sens 2 de la même ENTRY. La question a été posée à l'arbitrage du 2026-10-08, qui confirme L : la soumission d'un document ne suffit pas à établir ce domaine.

#### `v_528_s1` · 並ぶ (ならぶ) · « Faire la queue » — **C**

- **Fiche source** (`n5_v_528`, verbe) : traductions « Faire la queue ; Se mettre en rang ; Être aligné ». Nuance : « Verbe intransitif (groupe u) exprimant le fait de se placer en ligne, de faire la file d'attente ou d'être disposé côte à côte de manière ordonnée. » Exemple : « きっぷ の うりば で 並んで います 。 » — « Je fais la queue au guichet des billets. »
- **État publié** : sens 1 sur 2 ; traduction « Faire la queue » (Se mettre en rang) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Être aligné » (`espace_proprietes_spatiales › position_localisation`, `etat`).
- **Justification historique** : D1227 (lot 18) : « Se mettre en rang, faire la queue : action générale, sans domaine thématique propre. Addendum A5. »
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre » ; « Entrée & sortie → Entrer / sortir ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Dans le même lot : 並べる « Aligner » (autre traduction publiée : « Mettre en rang ») et 置く « Poser » sont en espace › position et localisation, par un choix arbitré (D1229, D1220 ; choix 11 du lot 18) ; le sens 2 de la même ENTRY, « Être aligné », aussi. 待つ « Attendre » est sans catégorie (tranche suivante, non audité).
- **Verdict** : **C**.
- **Motivation** : La fiche décrit en une phrase « le fait de se placer en ligne, de faire la file d'attente ou d'être disposé côte à côte de manière ordonnée » ; l'exemple dit « je fais la queue au guichet des billets ». Les trois termes disent une même notion spatiale : une disposition en ligne. Le lot 18 l'a reconnue pour l'état (« Être aligné », sens 2) et pour le transitif (並べる, dont « Mettre en rang » est une traduction publiée), tous deux en position et localisation ; il a laissé sans catégorie « Se mettre en rang », qui est la même disposition, prise par des personnes. Les deux sens de 並ぶ diffèrent par le référent et par le type (`action`, `etat`), non par le domaine. La fiche ne justifie pas la différence, et l'arbitrage du lot 18 n'a porté que sur la catégorie de 置く, de 並べる et du sens 2. Une catégorie publiée pour des sens comparables convient donc aussi à celui-ci : la condition de L n'est pas remplie.
- **Modification retenue, non appliquée** : `category` : `null` → `espace_proprietes_spatiales › position_localisation`. L'avertissement `categorie-nulle` cesserait. Le type `action`, la particule に et la relation `transitive_of` de 並べる vers le sens 2 ne sont pas touchés.
- **Réserve** : La question de savoir si faire la queue est d'abord une attente a été posée à l'arbitrage du 2026-10-08, qui confirme C : la catégorie est suffisamment pertinente au regard de la fiche entière et des comparables 並べる et 並ぶ, sens 2 ; `semantic_type: action` est conservé. La modification est retenue, non appliquée. Relevé du criblage (C10-a) : le renvoi de D1228 à la passe finale est soldé, la relation étant publiée sur 並べる (D1579), vers le sens 2.

## T4.7 Complétude : contrôles d'exhaustivité

Calculés par le script qui écrit cette tranche, sur l'inventaire, le journal, l'état publié et le rapport lui-même ; le script s'arrête si l'un d'eux échoue.

| Contrôle | Résultat |
|---|---|
| Les 22 identifiants des fiches sont exactement ceux du périmètre validé | oui, 22 distincts |
| Chacun porte un avertissement `categorie-nulle` de l'inventaire (120 au total) | oui |
| Chacun a exactement une décision de journal `categorie-nulle`, `validated`, sur ce sens | oui |
| Chaque raison emploie la formule « action générale » | oui |
| Chaque sens a bien `category: null` dans les données publiées | oui |
| Aucun ne figure parmi les 55 `categorie-nulle` déjà arbitrés du rapport | oui |
| Composition : sens décidés au lot 18 | 19 ; plus かける (lot 08), 持つ (lot 20), 無くす (lot 0) |
| Les 22 et les 14 de la seconde partie sont disjoints, et leur réunion est la famille « action générale » restante | oui, 36 |
| Verdicts | L = 21, F = 0, C = 1, N = 0 ; total 22 |
| Un verdict C ou F a une modification proposée, et seulement lui | oui |
| Fiches au rapport | 27 `type-nul` + 55 + 22 `categorie-nulle` = 104 sur 147 |
| `categorie-nulle` restant après cette tranche | 43 (14, 18, 11) |

---

# Tranche 5 · `categorie-nulle`, quatrième tranche : 14 cas

**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : L = 14, F = 0, C = 0, N = 0. 渡す, sens 1, est confirmé L (la distinction avec 上げる reste documentée) ; 出る, sens 3, est confirmé L (type `evenement` cohérent, justification historique imprécise, non réécrite) ; 座る et 立つ sont confirmés L, en l'absence de catégorie des postures ; les dix autres L sont confirmés. **La famille « action générale » est entièrement arbitrée : 36 cas** (35 L, 1 C). Le contrôle de provenance des informations publiées non retrouvées dans les fiches sources est ajouté au suivi transversal du volet 1 (T5.5). Périmètre validé le même jour : « action générale », seconde partie, 14 SENSE. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n'est modifié ; aucune correction n'est appliquée ; aucune décision historique n'est réécrite.
**Reste à faire après cette tranche** : 29 `categorie-nulle` (« aucune catégorie ne nomme la notion » 18 ; « autre formulation » 11) ; aucun n'est commencé.

## T5.1 Résultat de la tranche

| Classement | Cas | Sens |
|---|---|---|
| **L** | 14 | `v_533_s1` 借りる ; `v_575_s1` 貸す ; `v_578_s1` 返す ; `v_562_s1` 渡す ; `v_608_s2` やる ; `v_551_s1` 座る ; `v_568_s1` 立つ ; `v_552_s1` 待つ ; `v_266_s2` 吹く ; `v_542_s2` 吸う ; `v_526_s1` コピーする ; `v_635_s2` 休む ; `v_642_s2` 出る ; `v_642_s3` 出る |
| **F** | 0 | — |
| **C** | 0 | — |
| **N** | 0 | — |
| **Total** | 14 | L + F + C + N = 14 |

**Cumul arbitré du volet 2** : 27 `type-nul` (L = 24, F = 1, C = 2), 77 `categorie-nulle` (L = 73, F = 1, C = 3) et ces 14 `categorie-nulle` (L = 14), soit **118 cas arbitrés sur 147 : L = 111, F = 2, C = 5, N = 0**.

- **Aucune modification** n'est retenue dans cette tranche. La liste des corrections du volet 2 reste à six modifications de SENSE, toutes non appliquées.
- **Aucun N.**
- **6 fiches portent une réserve, conservée** : `v_578_s1` 返す ; `v_562_s1` 渡す ; `v_608_s2` やる ; `v_266_s2` 吹く ; `v_642_s2` 出る ; `v_642_s3` 出る (T5.5).
- **Les cinq chevauchements avec le volet 1 sont traités dans les fiches** (T5.4).

## T5.2 Composition et méthode

La tranche réunit les 14 sens restants de la famille « action générale » : dix du lot 19, deux du lot 04, un du lot 07, un du lot 20.

Pour chaque cas, individuellement : fiche source entière (traductions, nuance, exemple), et pour 出る la fiche de 出ます qui y a été fusionnée ; sens publié, nuance publiée et autres sens de l'ENTRY ; décision `categorie-nulle` et décisions voisines, celles du lot 26 comprises ; A5, A2-L3-v1 (§2, §5 à §7), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11) et A9 selon le cas ; sens comparables publiés, dans la tranche et hors d'elle. L'arbre des catégories d'A2-L3 (§5) a été relu pour chaque sens.

**Comparables externes lus sans être audités** : 吸う, sens 1 « Fumer », et たばこ (famille « aucune catégorie ») ; やる, sens 1 « Faire », et する (famille « autre formulation ») ; 上げる et 起きる (catégorisés, hors des 147). **Aucun ne reçoit de verdict ici.**

## T5.3 La formule n'est pas la preuve

Conformément à l'arbitrage du 2026-10-08, **aucun `null` de cette tranche n'est fondé sur la formule « action générale »**. Chaque fiche d'audit donne le fondement tiré de la fiche source et de l'arbre d'A2-L3 :

| Sens | Fondement du `null`, vérifié sur la fiche |
|---|---|
| `v_533_s1` 借りる « Emprunter » | la fiche réunit un emprunt gratuit et une location |
| `v_575_s1` 貸す « Prêter » | la fiche réunit un prêt entre personnes et une location |
| `v_578_s1` 返す « Rendre » | la fiche réunit un objet restitué et de l'argent rendu |
| `v_562_s1` 渡す « Remettre » | la fiche décrit un geste ; « Interactions sociales » examinée et écartée |
| `v_608_s2` やる « Donner (à des plantes, des animaux) » | le destinataire (un inférieur, un animal, une plante) déborde tout domaine |
| `v_551_s1` 座る « S'asseoir » | aucune catégorie ne nomme les postures |
| `v_568_s1` 立つ « Se lever » | aucune catégorie ne nomme les postures |
| `v_552_s1` 待つ « Attendre » | aucune catégorie ne nomme l'attente ; « Temps » examiné et écarté |
| `v_266_s2` 吹く « Souffler (de l'air) » | la fiche réunit souffler de l'air et jouer d'un instrument |
| `v_542_s2` 吸う « Aspirer » | la fiche réunit l'air et le liquide ; aucune catégorie de la respiration |
| `v_526_s1` コピーする « Photocopier » | la fiche ne décrit pas le sens ; aucune catégorie de la reproduction d'un document |
| `v_635_s2` 休む « S'absenter » | la fiche nomme deux domaines (l'école, le travail) |
| `v_642_s2` 出る « Assister à » | la fiche dit seulement « participer à un événement » |
| `v_642_s3` 出る « Apparaître » | sens de type `evenement` ; aucune catégorie de l'apparition |

Trois sortes de fondement apparaissent : une fiche qui **réunit deux domaines** dans un sens unique (借りる, 貸す, 返す, 吹く, 吸う, 休む, やる) ; une notion qu'**aucune catégorie ne nomme** (les postures, l'attente, la remise d'un objet, la reproduction d'un document, l'apparition) ; une fiche **trop peu précise** pour fonder une catégorie (出る, sens 2 ; コピーする). Seuls 渡す et 待つ relèvent de l'« action générique » au sens strict d'A2-L3 §6 ; pour 出る, sens 3, la formule est inapplicable (T5.4).

## T5.4 Points examinés à la demande de l'arbitrage

**出る, sens 3 : « action générale » et `evenement`.** Le sens est publié avec le type `evenement`, et sa raison (D0339, lot 04) dit « action générale ». C'est la raison qui est inexacte, non la donnée : ce qui apparaît survient, et 消える « Disparaître », son contraire, confirmé L à la tranche 2, porte le même type. Le `null` tient par l'absence de toute catégorie de l'apparition, non par l'« action générique ». Aucune modification n'est proposée ; la décision n'est pas réécrite.

**座る et 立つ : les deux fondements des raisons.** D1245 et D1247 invoquent « aucune catégorie du registre ne nomme les postures » et « action générale ». Le premier fondement est vérifié et exact (ni « Corps », ni « États & besoins physiques », ni l'espace ne nomment une posture) ; le second n'ajoute rien. La différence avec 並ぶ, sens 1 (C retenu), tient aux fiches : celle de 並ぶ décrit une disposition en ligne, un emplacement relatif ; celles-ci une attitude du corps.

**Les cinq chevauchements avec le volet 1** (un cas n'est audité qu'une fois) :

| Sens | Relevé du criblage | Ce qu'il en reste |
|---|---|---|
| 借りる, 貸す | C10-a : la raison renvoie la relation à la passe finale | soldé : `reciprocal_with` est publiée depuis le lot 26 (D1581), notée une fois, sur 借りる |
| 渡す, sens 1 | C10-a : même renvoi | soldé : la relation publiée (D1583) part du sens 2 « Faire traverser », non de ce sens |
| 立つ | C1-a : « Se lever » traduit aussi 起きる, sens 2, catégorisé | deux référents (une chaise ; le lit et le sommeil) ; l'écart est justifié |
| やる, sens 2 | C1-a : « Donner » traduit aussi 上げる, sens 1, catégorisé | le destinataire diffère (un inférieur, un animal, une plante) ; l'écart est justifié |
| やる, sens 2 | C1-d : sens reliés par `similar_to`, catégories de niveaux 1 différents | `similar_to` dit une ressemblance, non une identité de domaine ; aucun écart |

**Aucun verdict n'est donné aux autres candidats du volet 1** que ces relevés nomment (起きる, 上げる).

**Dépendances internes.** Cinq raisons renvoient à un autre sens de la tranche (借りる, 渡す et 返す à 貸す ; 立つ à 座る ; 吸う à 吹く). Chaque fiche a été lue pour elle-même : aucun verdict ne repose sur le renvoi.

## T5.5 Réserves, divergences et modifications

### Modifications proposées

**Aucune.**

### Divergences relevées (2), sans verdict sur les comparables

1. **渡す, sens 1, et 上げる, sens 1, dans le même lot.** « Donner » (上げる) est en relations sociales › interactions sociales ; « Remettre », dont une autre traduction publiée est « Donner en main propre », est sans catégorie, comme 貸す, 借りる et 返す. Les fiches justifient la différence (un don situé dans les relations entre personnes ; un geste). **Arbitrage : L confirmé** ; la distinction reste documentée.
2. **吹く, sens 2, et 弾く.** « Jouer (d'un instrument à cordes ou à clavier) » est en musique › instruments, et sa fiche renvoie à 吹く pour les instruments à vent ; 吹く réunit cet emploi et « souffler de l'air » dans un sens sans catégorie.

### Constat documentaire, hors de l'objet de l'audit (pour le volet 1)

Pour trois sens de deux ENTRY décidées dans les premiers lots (出る, lot 04 ; 吹く, lot 07), la donnée publiée porte des éléments que **ni les fiches sources ni les anciens exemples ne contiennent** : la particule に et la nuance « 授業に出る », « 会議に出る » (出る, sens 2) ; la particule が et la nuance « 月が出る » (出る, sens 3) ; la nuance « 笛を吹く » (吹く, sens 2). La doctrine dit que la fiche source décide. Les verdicts de cette tranche ne s'appuient sur aucun de ces éléments. **Je ne propose rien ici.**

**Arbitrage du 2026-10-08** : ce constat est **ajouté au suivi transversal du volet 1**, comme contrôle de provenance des informations publiées non retrouvées dans les fiches sources (`v_642_s2` : particule に et nuances ; `v_642_s3` : particule が et nuance ; `v_266_s2` : nuance). Il reste à rechercher, ultérieurement, si des décisions explicites autorisaient ces éléments. **Aucun verdict ni aucune correction n'est pris à ce stade.**

### Réserves, fiche par fiche

- `v_578_s1` 返す « Rendre » (**L**) : Deux emplois sur trois sont monétaires. Si le sens était scindé (l'objet, l'argent), le second aurait une catégorie. Le découpage n'est pas l'objet de cet audit ; je le signale.
- `v_562_s1` 渡す « Remettre » (**L**) : Divergence signalée, sans verdict sur 上げる : « Donner » est catégorisé, et « Remettre », dont une autre traduction publiée est « Donner en main propre », ne l'est pas, dans le même lot. La différence tient aux fiches (un don situé socialement ; un geste). La question a été posée à l'arbitrage du 2026-10-08, qui confirme L : le geste de remise d'un objet ne suffit pas à imposer `relations_sociales › interactions_sociales`. La distinction avec 上げる reste documentée.
- `v_608_s2` やる « Donner (à des plantes, des animaux) » (**L**) : La traduction principale publiée, « Donner (à des plantes, des animaux) », omet « quelqu'un d'inférieur », que la fiche donne en premier et que la nuance publiée conserve. Je le signale ; la traduction n'est pas l'objet de cet audit, et le verdict n'en dépend pas : avec ou sans la personne, la fiche déborde la catégorie de 上げる.
- `v_266_s2` 吹く « Souffler (de l'air) » (**L**) : Asymétrie visible avec 弾く, catégorisé, dont la fiche renvoie expressément à 吹く pour les instruments à vent. Si l'emploi musical formait un sens à part, il aurait cette catégorie. Le découpage n'est pas l'objet de cet audit ; je le signale. Constat documentaire, hors de l'objet de l'audit : la nuance publiée (« 笛を吹く : jouer de la flûte ») donne un exemple que ni la fiche ni les anciens exemples ne contiennent.
- `v_642_s2` 出る « Assister à » (**L**) : La raison de D0338 illustre le sens par « (cours, réunion) », et la donnée publiée porte la particule に et la nuance « 授業に出る », « 会議に出る ». Rien de cela n'est dans les fiches sources ni dans les anciens exemples, dont les particules sont を et から. Le verdict ne s'appuie pas sur ces éléments. Je les signale comme constat documentaire pour le volet 1 (« la fiche source décide »), sans verdict.
- `v_642_s3` 出る « Apparaître » (**L**) : D0339 (lot 04) qualifie d'« action générale » un sens de type `evenement`. L'écart est dans la raison, antérieure à ces distinctions ; aucune donnée n'est en cause, et une décision validée ne se réécrit pas, ce que l'arbitrage du 2026-10-08 confirme (type `evenement` cohérent, justification imprécise, non réécrite). Même constat documentaire que pour le sens 2 : la particule が et la nuance « 月が出る » publiées ne sont pas dans les fiches sources.

## T5.6 Les 14 fiches d'audit

### A · Prêter, emprunter, rendre, remettre, donner (5 cas)

#### `v_533_s1` · 借りる (かりる) · « Emprunter » — **L**

- **Fiche source** (`n5_v_533`, verbe) : traductions « Emprunter ; Louer ». Nuance : « Verbe transitif (groupe ichidan / ru) exprimant l'action d'emprunter un objet à quelqu'un ou de louer un bien (comme un logement, par opposition à *貸す kasu* qui signifie prêter). » Exemple : « としょかん で ほん を 借り ます 。 » — « J'emprunte un livre à la bibliothèque. »
- **État publié** : sens 1 sur 1 ; traduction « Emprunter » (Louer) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations `reciprocal_with` → `v_575_s1` ; classe `verbe`.
- **Justification historique** : D1267 (lot 19) : « Emprunter un objet ou louer un bien : action générale, sans domaine thématique propre, comme 貸す. Addendum A5. »
- **Fondement vérifié** : la fiche réunit un emprunt gratuit et une location.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Économie & commerce : « Achat & vente → Achat ; Vente ; Commande ; Échange commercial » ; « Transactions & paiement → Paiement ; Facturation ; Dette ; Crédit » ; « Banque & finance → Banque ; Comptes ; Épargne ; Prêt ; Investissement ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine.
- **Comparables examinés** : 貸す « Prêter », relié par `reciprocal_with` et auquel la raison renvoie, est sans catégorie (même tranche). 買う « Acheter » et 売る « Vendre » sont en économie › achat et vente : leurs fiches parlent d'acheter et de vendre un bien. 住む « Habiter » est en habitat › logements.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action d'emprunter un objet à quelqu'un ou de louer un bien (comme un logement) » ; l'exemple dit « j'emprunte un livre à la bibliothèque ». Louer relèverait de l'économie, et le logement de l'habitat ; emprunter un livre n'est ni l'un ni l'autre, et c'est ce que montre l'exemple. « Prêt », dans A2-L3, est un produit de banque. La fiche réunit un emprunt gratuit et une location dans un sens unique : aucune catégorie ne le décrit en entier. La raison de D1267 tient par sa conclusion ; son renvoi à 貸す n'est pas le fondement, la fiche l'est. Relevé du criblage (C10-a) : le renvoi de D1268 à la passe finale est soldé, la relation étant publiée (D1581).

#### `v_575_s1` · 貸す (かす) · « Prêter » — **L**

- **Fiche source** (`n5_v_575`, verbe) : traductions « Prêter ; Louer (à quelqu'un) ». Nuance : « Verbe transitif (groupe u) exprimant l'action de prêter un objet à quelqu'un ou de lui louer un bien (par opposition à *kariru* 借りる qui signifie emprunter). » Exemple : « ともだち に かさ を 貸し まし た 。 » — « J'ai prêté mon parapluie à un ami. »
- **État publié** : sens 1 sur 1 ; traduction « Prêter » (Louer (à quelqu'un)) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1264 (lot 19) : « Prêter un objet ou louer un bien à quelqu'un : action générale, sans domaine thématique propre ; le « prêt » du registre est un produit bancaire, et l'exemple porte sur un parapluie. Addendum A5. »
- **Fondement vérifié** : la fiche réunit un prêt entre personnes et une location.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Économie & commerce : « Achat & vente → Achat ; Vente ; Commande ; Échange commercial » ; « Transactions & paiement → Paiement ; Facturation ; Dette ; Crédit » ; « Banque & finance → Banque ; Comptes ; Épargne ; Prêt ; Investissement ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine.
- **Comparables examinés** : 借りる « Emprunter » est sans catégorie (même tranche) ; la relation `reciprocal_with` est notée une fois, sur 借りる. 買う et 売る sont en économie › achat et vente. 上げる, sens 1 « Donner », est en relations sociales › interactions sociales (voir la fiche de 渡す).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de prêter un objet à quelqu'un ou de lui louer un bien » ; l'exemple dit « j'ai prêté mon parapluie à un ami ». Même étendue que 借りる, lue sur cette fiche : un prêt entre amis et une location. « Prêt », dans A2-L3, est rangé sous « Banque & finance », ce que D1264 relève : il ne décrit pas un parapluie prêté. La location seule relèverait de l'économie ; le sens est unique. La raison tient. Relevé du criblage (C10-a) : le renvoi de D1265 à la passe finale est soldé (D1581).

#### `v_578_s1` · 返す (かえす) · « Rendre » — **L**

- **Fiche source** (`n5_v_578`, verbe) : traductions « Rendre ; Restituer ; Rembourser ; Renvoyer ». Nuance : « Verbe transitif (groupe u) exprimant l'action de restituer un objet emprunté à son propriétaire, de rendre l'monnaie ou de rembourser une somme d'argent. » Exemple : « としょかん に ほん を 返し ます 。 » — « Je rends le livre à la bibliothèque. »
- **État publié** : sens 1 sur 1 ; traduction « Rendre » (Restituer, Rembourser) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1270 (lot 19) : « Rendre un objet, de la monnaie ou une somme : action générale, sans domaine thématique propre ; le remboursement seul relèverait des transactions, mais la fiche réunit les trois, et son exemple porte sur un livre. Addendum A5. »
- **Fondement vérifié** : la fiche réunit un objet restitué et de l'argent rendu.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Économie & commerce : « Achat & vente → Achat ; Vente ; Commande ; Échange commercial » ; « Transactions & paiement → Paiement ; Facturation ; Dette ; Crédit » ; « Banque & finance → Banque ; Comptes ; Épargne ; Prêt ; Investissement ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine.
- **Comparables examinés** : 借りる et 貸す sont sans catégorie (même tranche). 買う « Acheter » est en économie › achat et vente › achat. かかる « Prendre (du temps ou de l'argent) » a été confirmé L, pour une fiche qui réunit de même deux domaines.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de restituer un objet emprunté à son propriétaire, de rendre la monnaie ou de rembourser une somme d'argent » ; l'exemple dit « je rends le livre à la bibliothèque ». Deux des trois emplois touchent à l'argent et relèveraient de « Transactions & paiement » ; le premier, que l'exemple illustre et que la traduction principale dit, n'en relève pas. Le sens est unique, par un choix du lot 19 (D1269) : la catégorie économique n'en décrirait qu'une partie. La raison de D1270, qui l'explique, tient.
- **Réserve** : Deux emplois sur trois sont monétaires. Si le sens était scindé (l'objet, l'argent), le second aurait une catégorie. Le découpage n'est pas l'objet de cet audit ; je le signale.

#### `v_562_s1` · 渡す (わたす) · « Remettre » — **L**

- **Fiche source** (`n5_v_562`, verbe) : traductions « Remettre ; Donner en main propre ; Transférer ; Faire traverser ». Nuance : « Verbe transitif (groupe u) exprimant l'action de remettre un objet directement à quelqu'un d'autre de la main à la main, ou de faire traverser quelque chose. » Exemple : « せんせい に しょるい を 渡し まし た 。 » — « J'ai remis les documents au professeur. »
- **État publié** : sens 1 sur 2 ; traduction « Remettre » (Donner en main propre) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Faire traverser » (`espace_proprietes_spatiales › parcours_trajectoire`, `action`).
- **Justification historique** : D1273 (lot 19) : « Remettre un objet à quelqu'un, de la main à la main : action générale, sans domaine thématique propre, comme 貸す. Addendum A5. »
- **Fondement vérifié** : la fiche décrit un geste ; « Interactions sociales » examinée et écartée.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Relations sociales : « Interactions sociales » ; A9, §3.3 : cette catégorie « désigne des concepts d'interaction (rencontrer, demander) ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 上げる, sens 1 « Donner » (même lot), est en relations sociales › interactions sociales : sa fiche dit « donner quelque chose à quelqu'un (hors du cercle familial proche) », et D1263 retient la catégorie parce que la fiche situe le don « par rapport au cercle de la personne ». 会う « Rencontrer » et 頼む « Demander » sont dans la même catégorie. 出す, sens 3 « Présenter », a été confirmé L. Le sens 2 de la même ENTRY, « Faire traverser », est en parcours et trajectoire.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de remettre un objet directement à quelqu'un d'autre de la main à la main » ; l'exemple dit « j'ai remis les documents au professeur ». J'ai examiné « Interactions sociales », qui porte 上げる « Donner » : la fiche de 上げる parle d'un don et le situe dans les relations entre personnes ; celle-ci décrit le geste par lequel un objet change de mains (« directement », « de la main à la main »), sans rien dire du lien entre les personnes. Elle ne décrit pas une interaction sociale, et aucune catégorie ne nomme la remise d'un objet. Sur la lecture de cette fiche, et non par renvoi à 貸す : la raison de D1273 tient. Relevé du criblage (C10-a) : le renvoi de D1275 est soldé ; la relation publiée part du sens 2 (D1583), non de celui-ci.
- **Réserve** : Divergence signalée, sans verdict sur 上げる : « Donner » est catégorisé, et « Remettre », dont une autre traduction publiée est « Donner en main propre », ne l'est pas, dans le même lot. La différence tient aux fiches (un don situé socialement ; un geste). La question a été posée à l'arbitrage du 2026-10-08, qui confirme L : le geste de remise d'un objet ne suffit pas à imposer `relations_sociales › interactions_sociales`. La distinction avec 上げる reste documentée.

#### `v_608_s2` · やる (やる) · « Donner (à des plantes, des animaux) » — **L**

- **Fiche source** (`n5_v_608`, verbe) : traductions « Faire ; Donner (à des plantes, des animaux) ; Jouer (à un jeu, un sport) ». Nuance : « Verbe transitif (groupe u) synonyme familier de *suru* (faire) ou *ageru* (donner à quelqu'un de inférieur, un animal ou une plante). Il est très employé à l'oral pour exprimer l'action de s'adonner à une activité ou de s'occuper de quelque chose. » Exemple : « あした 、 テニス を やる よ 。 » — « Demain, je fais (joue au) tennis ! »
- **État publié** : sens 2 sur 2 ; traduction « Donner (à des plantes, des animaux) » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Faire » (`null`, `action`).
- **Justification historique** : D1335 (lot 20) : « Donner à un animal ou à une plante : action générale, sans domaine thématique propre ; la fiche ne la rattache ni au jardin ni à l'élevage. Addendum A5. »
- **Fondement vérifié** : le destinataire (un inférieur, un animal, une plante) déborde tout domaine.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Relations sociales : « Interactions sociales » ; A9, §3.3 : cette catégorie « désigne des concepts d'interaction (rencontrer, demander) ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine. A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 上げる, sens 1 « Donner », relié à ce sens par `similar_to`, est en relations sociales › interactions sociales. Le sens 1 de la même ENTRY, « Faire », et する « Faire » sont sans catégorie (famille « autre formulation », non audités ici). 鳴く « Crier (animal) » est en monde naturel › animaux : sa fiche est réservée aux animaux.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe est un « synonyme familier de […] ageru (donner à quelqu'un de inférieur, un animal ou une plante) » ; l'exemple illustre le sens 1, et ce sens repose sur ces mots et sur la traduction « Donner (à des plantes, des animaux) ». Le destinataire est un inférieur, un animal ou une plante : trois référents, dont deux ne sont pas des personnes. La catégorie de 上げる, qui décrit une relation entre personnes, ne convient donc pas ; ni « Animaux » ni « Végétation » ne décrivent un don, et la fiche ne parle ni de jardin ni d'élevage, ce que D1335 relève. Aucune catégorie ne décrit le sens. La raison tient. Relevés du criblage : « Donner » traduit aussi 上げる, catégorisé (C1-a), et les deux sens reliés par `similar_to` n'ont pas la même catégorie (C1-d) : l'écart est justifié par le destinataire ; `similar_to` dit une ressemblance, non une identité de domaine.
- **Réserve** : La traduction principale publiée, « Donner (à des plantes, des animaux) », omet « quelqu'un d'inférieur », que la fiche donne en premier et que la nuance publiée conserve. Je le signale ; la traduction n'est pas l'objet de cet audit, et le verdict n'en dépend pas : avec ou sans la personne, la fiche déborde la catégorie de 上げる.

### B · Postures et attente (3 cas)

#### `v_551_s1` · 座る (すわる) · « S'asseoir » — **L**

- **Fiche source** (`n5_v_551`, verbe) : traductions « S'asseoir ; Prendre place ». Nuance : « Verbe intransitif (groupe u) exprimant l'action de s'asseoir (souvent employé sous la forme en *-te iru* pour indiquer l'état « être assis »). » Exemple : « いす に 座っ て ください 。 » — « Veuillez vous asseoir sur la chaise. »
- **État publié** : sens 1 sur 1 ; traduction « S'asseoir » (Prendre place) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1245 (lot 19) : « S'asseoir : une posture du corps. Aucune catégorie du registre ne nomme les postures (le corps y est décrit par ses parties, l'espace par le déplacement) ; action générale. Addendum A5. »
- **Fondement vérifié** : aucune catégorie ne nomme les postures.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Être humain : « Corps → Tête & visage ; Membres ; Tronc ; Organes ; Caractéristiques corporelles » ; « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort ». A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 立つ « Se lever » est sans catégorie (même tranche). 寝る, sens 2 « Se coucher », et 起きる, sens 2 « Se lever », sont en états et besoins physiques › sommeil et repos : leurs fiches parlent de dormir et de sortir du sommeil. 置く « Poser » et 並ぶ, sens 1 « Faire la queue » (C retenu), sont en position et localisation.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de s'asseoir » ; l'exemple dit « veuillez vous asseoir sur la chaise ». La raison de D1245 donne deux fondements. Le premier est vérifiable et exact : A2-L3 ne nomme aucune posture ; « Corps » énumère des parties, « États & besoins physiques » le sommeil, la faim, la fatigue et le confort, et la fiche ne parle pas de repos. « Position & localisation » dit où une chose se trouve par rapport à une autre (dessus, devant, dedans) : s'asseoir est une attitude du corps, non un emplacement, ce qui distingue ce sens de 並ぶ, dont la fiche décrit une disposition en ligne. Le second fondement, « action générale », n'ajoute rien et n'est pas la preuve. Le `null` tient par l'absence de catégorie.

#### `v_568_s1` · 立つ (たつ) · « Se lever » — **L**

- **Fiche source** (`n5_v_568`, verbe) : traductions « Se lever ; Être debout ; Se dresser ». Nuance : « Verbe intransitif (groupe u) exprimant l'action de se mettre debout ou d'être en position verticale (souvent employé à la forme en *-te iru* pour indiquer l'état « être debout »). » Exemple : « いす から 立っ て ください 。 » — « Veuillez vous lever de la chaise. »
- **État publié** : sens 1 sur 1 ; traduction « Se lever » (Se dresser) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1247 (lot 19) : « Se mettre debout : une posture du corps, comme 座る ; aucune catégorie du registre ne nomme les postures. Action générale. Addendum A5. »
- **Fondement vérifié** : aucune catégorie ne nomme les postures.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Être humain : « Corps → Tête & visage ; Membres ; Tronc ; Organes ; Caractéristiques corporelles » ; « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort ». A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 座る « S'asseoir », auquel la raison renvoie, est sans catégorie (même tranche). 起きる, sens 2 « Se lever » (autre traduction : « Sortir du lit »), est en sommeil et repos : sa fiche décrit « l'action de sortir du sommeil ou de se lever le matin ». 上げる, sens 2 « Lever », et 登る « Monter » sont en mouvement et déplacement › monter, descendre.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de se mettre debout ou d'être en position verticale » ; l'exemple dit « veuillez vous lever de la chaise ». Sur la lecture de cette fiche, et non par renvoi à 座る : aucune catégorie d'A2-L3 ne nomme une posture. Ce n'est pas un déplacement vers le haut, comme 登る : on se dresse sur place. Ce n'est pas non plus le lever du matin de 起きる, que le criblage rapprochait par la traduction (C1-a) : celui-ci quitte le lit et le sommeil, celui-là une chaise ; deux référents, et l'écart de catégorie est justifié. Le fondement est l'absence de catégorie des postures ; « action générale » n'est pas la preuve. La raison de D1247 tient.

#### `v_552_s1` · 待つ (まつ) · « Attendre » — **L**

- **Fiche source** (`n5_v_552`, verbe) : traductions « Attendre ; Patienter ». Nuance : « Verbe transitif (groupe u) exprimant l'action de patienter en attendant l'arrivée de quelqu'un ou qu'un événement se produise. » Exemple : « えき で ともだち を 待っ て います 。 » — « J'attends un ami à la gare. »
- **État publié** : sens 1 sur 1 ; traduction « Attendre » (Patienter) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1281 (lot 19) : « Attendre quelqu'un ou quelque chose : action générale, sans domaine thématique propre. Addendum A5. »
- **Fondement vérifié** : aucune catégorie ne nomme l'attente ; « Temps » examiné et écarté.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier » ; « Chronologie » ; « Durée » ; « Fréquence » ; « Relations temporelles ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : Aucun autre sens publié n'exprime l'attente. まだ, もう et すぐに sont en temps › relations temporelles : ce sont des repères dans le temps. 困る « Avoir des ennuis » est en psychologie et esprit › états psychologiques. 並ぶ, sens 1 « Faire la queue », est retenu en position et localisation, non comme une attente.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action de patienter en attendant l'arrivée de quelqu'un ou qu'un événement se produise » ; l'exemple dit « j'attends un ami à la gare ». La source classait le mot sous « temps ». J'ai examiné ce domaine : A2-L3 y range des notions de temps (unités, moments, durée, fréquence, relations temporelles), non ce que fait une personne pendant que le temps passe. La fiche ne décrit pas non plus « patienter » comme un état d'esprit. Aucune catégorie ne nomme l'attente. La raison de D1281 ne donne que la formule ; le `null` tient par cette vérification.

### C · Souffler, aspirer, photocopier (3 cas)

#### `v_266_s2` · 吹く (ふく) · « Souffler (de l'air) » — **L**

- **Fiche source** (`n5_v_266`, verbe godan) : traductions « Souffler ; Jouer d'un instrument à vent ; Émettre de l'air ». Nuance : « Verbe 五段 (godan) transitif ou intransitif désignant l'action du vent qui souffle, ou de souffler de l'air/de jouer d'un instrument à vent. Compteur spécifique : 回 (kai). » Exemple : « きょう は かぜ が つよく 吹いて います 。 » — « Le vent souffle fort aujourd'hui. »
- **État publié** : sens 2 sur 2 ; traduction « Souffler (de l'air) » (Jouer d'un instrument à vent) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Souffler (le vent) » (`monde_naturel › meteo › vent`, `processus`).
- **Justification historique** : D0472 (lot 07) : « Souffler de l'air (sur une bougie, dans un instrument) : action générale, sans domaine thématique propre. Addendum A5. »
- **Fondement vérifié** : la fiche réunit souffler de l'air et jouer d'un instrument.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Arts & création : « Musique → Chant ; Instruments ; Composition ; Interprétation ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine. A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 弾く « Jouer (d'un instrument à cordes ou à clavier) » est en arts et création › musique › instruments ; sa fiche dit : « pour les instruments à vent, on utilise 吹く ». 歌う « Chanter » est en musique › chant. Le sens 1 de la même ENTRY, « Souffler (le vent) », est en météo › vent. 吸う, sens 2 « Aspirer », dont la raison renvoie à ce sens, est sans catégorie (même tranche).
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe désigne aussi l'action « de souffler de l'air/de jouer d'un instrument à vent » ; l'exemple illustre le sens 1. Jouer d'un instrument relèverait de « Musique › Instruments », comme 弾く ; souffler de l'air n'en relève pas. Le sens publié réunit les deux (D0471 : « une action humaine »), avec « Jouer d'un instrument à vent » en autre traduction : la catégorie de la musique n'en décrirait qu'une partie. La raison de D0472 tient par sa conclusion.
- **Réserve** : Asymétrie visible avec 弾く, catégorisé, dont la fiche renvoie expressément à 吹く pour les instruments à vent. Si l'emploi musical formait un sens à part, il aurait cette catégorie. Le découpage n'est pas l'objet de cet audit ; je le signale. Constat documentaire, hors de l'objet de l'audit : la nuance publiée (« 笛を吹く : jouer de la flûte ») donne un exemple que ni la fiche ni les anciens exemples ne contiennent.

#### `v_542_s2` · 吸う (すう) · « Aspirer » — **L**

- **Fiche source** (`n5_v_542`, verbe) : traductions « Fumer ; Aspirer ; Inhaler ». Nuance : « Verbe transitif (groupe u) exprimant l'action d'inspirer de l'air ou de la fumée (comme fumer une cigarette), ou d'aspirer un liquide. » Exemple : « ここで たばこ を 吸い ます か 。 » — « Est-ce qu'on fume des cigarettes ici ? »
- **État publié** : sens 2 sur 2 ; traduction « Aspirer » (Inhaler) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Fumer » (`null`, `action`).
- **Justification historique** : D1293 (lot 19) : « Inspirer de l'air ou aspirer un liquide : action générale, sans domaine thématique propre, comme le sens « souffler (de l'air) » de 吹く (lot 07). Addendum A5. »
- **Fondement vérifié** : la fiche réunit l'air et le liquide ; aucune catégorie de la respiration.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Consommation alimentaire » (Alimentation & cuisine) ; « Symptômes & douleur → Douleur ; Fièvre ; Symptômes respiratoires ; Troubles fonctionnels » (Santé & médecine). A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 吹く, sens 2 « Souffler (de l'air) », auquel la raison renvoie, est sans catégorie (même tranche). 飲む « Boire » est en alimentation › consommation alimentaire : sa fiche parle de « boire un liquide […] ou d'avaler un médicament ». Le sens 1 de la même ENTRY, « Fumer », est sans catégorie (famille « aucune catégorie », non audité ici).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action d'inspirer de l'air ou de la fumée (comme fumer une cigarette), ou d'aspirer un liquide » ; l'exemple illustre le sens 1. Ce sens réunit l'air que l'on inspire et le liquide que l'on aspire. Aspirer un liquide n'est pas le boire : la fiche ne parle pas de consommation, à la différence de celle de 飲む. A2-L3 ne nomme pas la respiration, sinon par ses symptômes en médecine. Aucune catégorie ne décrit le sens, et aucune ne couvre l'air et le liquide. Sur la lecture de cette fiche, et non par renvoi à 吹く : la raison de D1293 tient.

#### `v_526_s1` · コピーする (こぴーする) · « Photocopier » — **L**

- **Fiche source** (`n5_v_526`, verbe) : traductions « Photocopier ; Faire une copie ; Dupliquer ». Nuance : « Verbe d'action (verbe en suru) composé du mot emprunté *kopii* (copie / photocopie) et du verbe auxiliaire *suru* (faire). » Exemple : « この しるし を コピーして ください 。 » — « Veuillez photocopier ce document. »
- **État publié** : sens 1 sur 1 ; traduction « Photocopier » (Faire une copie) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1260 (lot 19) : « Faire une photocopie : action générale, sans domaine thématique propre ; la fiche ne la rattache ni au bureau ni à l'école. Addendum A5. »
- **Fondement vérifié** : la fiche ne décrit pas le sens ; aucune catégorie de la reproduction d'un document.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Écriture → Écrire ; Systèmes d'écriture ; Orthographe » (Communication & langage) ; « Machines & systèmes techniques » (Technologie) ; « Publication & diffusion » (Médias). A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 書く « Écrire » est en communication et langage › écriture › écrire ; 撮る « Prendre (une photo) » en arts et création › arts visuels ; 働く « Travailler » en travail et vie professionnelle › travail et emploi. Aucun autre sens publié ne désigne la reproduction d'un document.
- **Verdict** : **L**.
- **Motivation** : La fiche ne décrit pas le sens : elle dit seulement que le verbe est « composé du mot emprunté kopii (copie / photocopie) et du verbe auxiliaire suru (faire) » ; l'exemple se traduit « veuillez photocopier ce document ». La source classait le mot sous « travail », mais la fiche ne nomme ni bureau ni école, ce que D1260 relève : ce serait un contexte. Photocopier n'est pas écrire, et A2-L3 ne nomme la reproduction d'un document nulle part : ni dans l'écriture, ni dans les machines, ni dans la publication. La fiche n'est pas assez précise pour fonder une catégorie. La raison tient.

### D · S'absenter, assister, apparaître (3 cas)

#### `v_635_s2` · 休む (やすむ) · « S'absenter » — **L**

- **Fiche source** (`n5_v_635`, verbe) : traductions « Se reposer ; S'absenter ; Prendre un congé ; Faire une pause ». Nuance : « Verbe intransitif / transitif (groupe u) exprimant l'action de faire une pause pour récupérer, ou de s'absenter de l'école ou du travail (ex: *kaisha o yasumu* s'absenter du travail). » Exemple : « すこし 休み ます 。 » — « Je me repose un peu. »
- **État publié** : sens 2 sur 2 ; traduction « S'absenter » (Prendre un congé) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Se reposer » (`etre_humain › etats_besoins_physiques › sommeil_repos`, `action`).
- **Justification historique** : D1249 (lot 19) : « S'absenter de l'école ou du travail : la fiche réunit les deux lieux ; « congés », dans le registre, relève des seules conditions de travail. Action générale. Addendum A5. »
- **Fondement vérifié** : la fiche nomme deux domaines (l'école, le travail).
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Conditions de travail → Horaires ; Congés ; Environnement professionnel » (Travail & vie professionnelle) ; « Vie scolaire & universitaire → Classe ; Devoirs ; Vacances scolaires » (Éducation & apprentissage). Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine. A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Se reposer », est en états et besoins physiques › sommeil et repos. 働く « Travailler » et 勤める « Travailler pour » sont en travail et vie professionnelle › travail et emploi : leurs fiches ne parlent que du travail.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe exprime aussi l'action « de s'absenter de l'école ou du travail (ex : kaisha o yasumu, s'absenter du travail) » ; l'exemple illustre le sens 1. A2-L3 nomme « Congés » sous le travail et « Vacances scolaires » sous l'éducation : deux niveaux 1, et la fiche nomme les deux lieux. Ni l'un ni l'autre ne décrit le sens entier. La raison de D1249, qui le dit, tient ; la formule « action générale » n'y ajoute rien.

#### `v_642_s2` · 出る (でる) · « Assister à » — **L**

- **Fiche source** (`n5_v_642`, verbe) : traductions « Sortir ; Quitter ; Partir ; Apparaître ». Nuance : « Verbe intransitif (groupe ru / ichidan) exprimant l'action de quitter un lieu (souvent suivi de la particule *o* pour indiquer le lieu que l'on quitte, comme *heya o deru* sortir de la pièce) ou de se manifester. » Exemple : « いま いえ を 出ます 。 » — « Je sors de la maison maintenant. »
- **État publié** : sens 2 sur 3 ; traduction « Assister à » (Participer à) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Sortir » (`espace_proprietes_spatiales › entree_sortie › entrer_sortir`, `action`) ; « Apparaître » (`null`, `evenement`).
- **Justification historique** : D0338 (lot 04) : « Prendre part à une activité (cours, réunion) : « action générale », sans domaine thématique propre. Addendum A5. »
- **Fondement vérifié** : la fiche dit seulement « participer à un événement ».
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Relations sociales : « Groupes & appartenance sociale → Membres ; Groupes ; Communautés ; Appartenance » ; « Interactions sociales ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 会う « Rencontrer » est en relations sociales › interactions sociales. 習う « Apprendre (auprès de quelqu'un) » est en éducation › apprentissage. Le sens 1 de la même ENTRY, « Sortir », est en entrée et sortie ; le sens 3 est sans catégorie (audité à part).
- **Verdict** : **L**.
- **Motivation** : Ce sens vient de la fiche fusionnée de 出ます (D0335), qui dit : « ou de participer à un événement », et donne la traduction « Assister à ». C'est tout ce que les sources en disent : ni la fiche de 出る, ni celle de 出ます, ni leurs exemples, qui portent tous sur le fait de quitter un lieu, ne précisent l'événement. Un événement quelconque n'a pas de domaine ; « Groupes & appartenance sociale » décrit l'appartenance à un groupe, non la présence à un événement. La fiche n'est pas assez précise pour fonder une catégorie. La conclusion de D0338 tient.
- **Réserve** : La raison de D0338 illustre le sens par « (cours, réunion) », et la donnée publiée porte la particule に et la nuance « 授業に出る », « 会議に出る ». Rien de cela n'est dans les fiches sources ni dans les anciens exemples, dont les particules sont を et から. Le verdict ne s'appuie pas sur ces éléments. Je les signale comme constat documentaire pour le volet 1 (« la fiche source décide »), sans verdict.

#### `v_642_s3` · 出る (でる) · « Apparaître » — **L**

- **Fiche source** (`n5_v_642`, verbe) : traductions « Sortir ; Quitter ; Partir ; Apparaître ». Nuance : « Verbe intransitif (groupe ru / ichidan) exprimant l'action de quitter un lieu (souvent suivi de la particule *o* pour indiquer le lieu que l'on quitte, comme *heya o deru* sortir de la pièce) ou de se manifester. » Exemple : « いま いえ を 出ます 。 » — « Je sors de la maison maintenant. »
- **État publié** : sens 3 sur 3 ; traduction « Apparaître » ; catégorie `null` ; type `evenement` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Sortir » (`espace_proprietes_spatiales › entree_sortie › entrer_sortir`, `action`) ; « Assister à » (`null`, `action`).
- **Justification historique** : D0339 (lot 04) : « Apparaître, devenir visible : « action générale », sans domaine thématique propre. Addendum A5. »
- **Fondement vérifié** : sens de type `evenement` ; aucune catégorie de l'apparition.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Arbitrage du 2026-10-08 : la formule « action générale » n'est pas une preuve ; le `null` est vérifié sur la fiche, par l'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §2 : « lorsqu'aucune catégorie suffisamment caractéristique n'existe, l'absence de catégorie est préférable à une classification artificielle ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 消える, sens 2 « Disparaître », son contraire, a été confirmé L, avec le type `evenement` : aucun domaine ne nomme l'apparition ni la disparition. なる « Devenir » (L) est aussi un `evenement` sans catégorie. 見る « Voir » est en sens et perception › vue.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe exprime aussi le fait « de se manifester » ; sa traduction donne « Apparaître » ; les exemples illustrent le sens 1. Le sens est publié avec le type `evenement`, et sa raison dit « action générale » : les deux ne s'accordent pas. Vérification faite, c'est la raison qui est inexacte, non la donnée : ce qui apparaît ne fait rien, cela survient, et 消える « Disparaître », son contraire, porte le même type. Le `null` ne peut donc pas se fonder sur l'« action générique » ; il se fonde sur l'absence de toute catégorie décrivant le sens : apparaître n'est pas percevoir, la vue décrirait celui qui regarde, et A2-L3 ne nomme ni l'apparition ni la disparition. La conclusion de D0339 tient ; sa formule, non.
- **Réserve** : D0339 (lot 04) qualifie d'« action générale » un sens de type `evenement`. L'écart est dans la raison, antérieure à ces distinctions ; aucune donnée n'est en cause, et une décision validée ne se réécrit pas, ce que l'arbitrage du 2026-10-08 confirme (type `evenement` cohérent, justification imprécise, non réécrite). Même constat documentaire que pour le sens 2 : la particule が et la nuance « 月が出る » publiées ne sont pas dans les fiches sources.

## T5.7 Complétude : contrôles reproductibles

Calculés par `a2-05-travail/audit-cat-t4.mjs`, qui écrit cette tranche, sur l'inventaire (`avertissements-connus.json`), le journal, l'état publié et le rapport lui-même. Le script s'arrête si l'un d'eux échoue. Commande : `node a2-05-travail/audit-cat-t4.mjs . docs/rapports/etape2-A2-05-audit-null.md`.

| Contrôle | Résultat |
|---|---|
| Les 14 identifiants des fiches sont exactement ceux du périmètre validé | oui, 14 distincts |
| Chacun porte un avertissement `categorie-nulle` de l'inventaire (120 au total) | oui |
| Chacun a exactement une décision de journal `categorie-nulle`, `validated`, sur ce sens | oui |
| Chaque raison emploie la formule « action générale » | oui |
| Chaque sens a bien `category: null` dans les données publiées | oui |
| Aucun ne figure parmi les 77 `categorie-nulle` déjà arbitrés du rapport | oui |
| Les 14 sont exactement le reste de la famille « action générale » | oui ; famille entière : 36 = 22 + 14 |
| Chaque fiche porte un fondement vérifié, distinct de la formule | oui, 14 |
| Verdicts de la tranche | L = 14, F = 0, C = 0, N = 0 ; total 14 |
| Un verdict C ou F a une modification proposée, et seulement lui | oui |
| Cumul arbitré avant cette tranche, recompté sur les fiches du rapport | 104 fiches : L = 97, F = 2, C = 5, N = 0 |
| Fiches au rapport après cette tranche | 27 `type-nul` + 77 + 14 `categorie-nulle` = 118 sur 147 |
| `categorie-nulle` restant après cette tranche | 29 (18 et 11) |

---

# Tranche 6 · `categorie-nulle`, cinquième tranche : 18 cas

**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation) : L = 14, F = 0, C = 4, N = 0. Les 13 L proposés sont confirmés, ainsi que quatre des cinq C : 時計 (`temps`, niveau 1), カレンダー (`temps › calendrier`), また sens 1 et もう一度 (`temps › chronologie › succession`), les autres champs restant inchangés. Le cinquième C proposé, 一人 sens 2 « Seul », est **reclassé L** et garde `category: null` : la fiche décrit l'absence de compagnie et non une interaction sociale, et la catégorie de 一緒 ne suffit pas à imposer une symétrie ; la divergence avec 一緒 est conservée comme contrôle transversal du volet 1, sans verdict sur ce comparable. Les quatre modifications retenues rejoignent la liste des corrections du volet 2 ; **aucune n'est appliquée**, et les justifications historiques ne sont pas réécrites. Périmètre validé le même jour : la famille « aucune catégorie ne nomme la notion », 18 SENSE. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n'est modifié ; aucune correction n'est appliquée ; aucune décision historique n'est réécrite.
**Reste à faire après cette tranche** : 11 `categorie-nulle` (« autre formulation ») ; aucun n'est commencé.

## T6.1 Résultat de la tranche

| Classement | Cas | Sens |
|---|---|---|
| **L** | 14 | `v_542_s1` 吸う ; `v_598_s1` たばこ ; `v_598_s2` たばこ ; `v_694_s1` 荷物 ; `v_144_s1` 忙しい ; `v_457_s1` 暇 ; `v_627_s2` 一人 ; `v_425_s1` だんだん ; `v_504_s2` ゆっくり ; `v_525_s2` まっすぐ ; `v_510_s1` 本当 ; `v_558_s1` 死ぬ ; `v_653_s1` 声 ; `v_685_s1` 生活 |
| **F** | 0 | — |
| **C** | 4 | `v_671_s1` 時計 ; `v_287_s1` カレンダー ; `v_500_s1` また ; `v_503_s1` もう一度 |
| **N** | 0 | — |
| **Total** | 18 | L + F + C + N = 18 |

**Cumul arbitré du volet 2** : 27 `type-nul` (L = 24, F = 1, C = 2), 91 `categorie-nulle` (L = 87, F = 1, C = 3) et ces 18 `categorie-nulle` (L = 14, C = 4), soit **136 cas arbitrés sur 147 : L = 125, F = 2, C = 9, N = 0**.

- **4 modifications sont retenues** (`v_671_s1` 時計 ; `v_287_s1` カレンダー ; `v_500_s1` また ; `v_503_s1` もう一度) ; aucune n'est appliquée. La liste des corrections du volet 2 compte désormais dix modifications de SENSE (T6.5).
- **Aucun N.**
- **10 fiches portent une réserve ou une note d'arbitrage** : `v_671_s1` 時計 ; `v_287_s1` カレンダー ; `v_457_s1` 暇 ; `v_627_s2` 一人 ; `v_500_s1` また ; `v_503_s1` もう一度 ; `v_425_s1` だんだん ; `v_525_s2` まっすぐ ; `v_510_s1` 本当 ; `v_558_s1` 死ぬ (T6.5).
- **Les six chevauchements avec le volet 1 sont traités dans les fiches** (T6.4), type sémantique compris pour les cinq `concept_abstrait`.

## T6.2 Composition et méthode

La tranche est la famille « aucune catégorie ne nomme la notion », prise en entier : 18 sens, cinq classes grammaticales, huit valeurs de `semantic_type` (dont `null`). Ce qui les réunit est l'affirmation de leur raison : le registre n'aurait aucune catégorie pour la notion. **L'audit a consisté à vérifier cette affirmation, sens par sens**, en relisant l'arbre d'A2-L3 (§5) en entier et en cherchant, dans les données publiées, comment des sens comparables sont rangés.

Pour chaque cas, individuellement : fiche source entière (traductions, nuance, exemple, anciens exemples) ; sens publié, nuance publiée et autres sens de l'ENTRY ; décision `categorie-nulle` et décisions voisines ; arbitrages des lots (révision 5.6b, choix des lots 19 à 22) ; A5, A2-L3-v1 (§2, §5 à §7), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11), A2-ST-v1, A2-DIM-v1 et A9 selon le cas ; sens comparables publiés, dans la tranche et hors d'elle.

**Comparables lus sans être audités** : dans la dernière famille, 物 « Chose », 問題 « Problème », 他 « Autre », よく sens 2 « Bien » ; hors des 147, 初めて, 一緒, 休み, 夏休み, 生まれる, 灰皿, マッチ, ペン, 鉛筆, ノート, 辞書, 切符, 切手, 地図, かばん, 元気, 遊ぶ, 鳴く. **Aucun ne reçoit de verdict ici.**

## T6.3 L'affirmation d'absence, vérifiée cas par cas

| Sens | Résultat de la vérification | Verdict |
|---|---|---|
| `v_542_s1` 吸う « Fumer » | affirmation exacte : l'arbre ne nomme ni le tabac ni le fait de fumer | **L** |
| `v_598_s1` たばこ « Cigarette » | affirmation exacte : le domaine fonctionnel de l'objet, le tabac, n'existe pas dans l'arbre | **L** |
| `v_598_s2` たばこ « Tabac » | affirmation exacte : aucun domaine de l'arbre ne rend compte de cette matière | **L** |
| `v_671_s1` 時計 « Horloge » | affirmation non confirmée : le temps est le domaine fonctionnel de l'objet | **C** |
| `v_287_s1` カレンダー « Calendrier » | affirmation non confirmée : « Calendrier » est le domaine fonctionnel de l'objet | **C** |
| `v_694_s1` 荷物 « Bagage » | affirmation exacte dans sa conclusion : la fiche nomme deux domaines fonctionnels (le voyage, la poste) | **L** |
| `v_144_s1` 忙しい « Occupé » | affirmation exacte : l'état d'une personne quant à son temps n'a pas de catégorie | **L** |
| `v_457_s1` 暇 « Libre » | affirmation exacte : « Moments & périodes » et « Loisirs » examinés et écartés | **L** |
| `v_627_s2` 一人 « Seul » | affirmation maintenue par l'arbitrage : l'absence de compagnie n'est pas une interaction sociale | **L** |
| `v_500_s1` また « À nouveau » | affirmation non confirmée : « Succession » porte déjà 初めて, dans le même lot | **C** |
| `v_503_s1` もう一度 « Encore une fois » | affirmation non confirmée : « Succession » porte déjà 初めて, dans le même lot | **C** |
| `v_425_s1` だんだん « Graduellement » | affirmation exacte : la manière dont un changement se fait n'a pas de catégorie ; `temps` écarté par un arbitrage du lot 21 | **L** |
| `v_504_s2` ゆっくり « Tranquillement » | affirmation exacte : une manière d'agir ; « Sommeil & repos » et « Confort » examinés et écartés | **L** |
| `v_525_s2` まっすぐ « Honnête » | conclusion exacte : un jugement sur la conduite n'a pas de catégorie ; la formule de la raison est trop large | **L** |
| `v_510_s1` 本当 « Vérité » | affirmation exacte : un statut épistémique, porté par une dimension | **L** |
| `v_558_s1` 死ぬ « Mourir » | formule inexacte, conclusion exacte : l'arbre nomme la mort, mais dans un domaine que la fiche déborde | **L** |
| `v_653_s1` 声 « Voix » | affirmation exacte dans sa conclusion : la fiche réunit la voix humaine et le cri d'un animal | **L** |
| `v_685_s1` 生活 « Mode de vie » | affirmation exacte : une notion générale qu'aucun domaine ne borne ; « Habitat & vie domestique » examiné et écarté | **L** |

**Trois situations.**

1. **L'affirmation est exacte** : l'arbre ne nomme pas la notion, ou aucun de ses domaines ne décrit le sens entier (le tabac, l'occupation et la disponibilité, la manière d'agir, le jugement moral, la vérité, le mode de vie, la progression ; la voix et le bagage, dont les fiches réunissent plusieurs domaines).
2. **La formule est inexacte, la conclusion tient** : pour 死ぬ, l'arbre nomme la mort (« Cycle de vie › Mort ») ; le `null` vient du débordement de la fiche, non d'une absence.
3. **L'affirmation n'est pas confirmée** : une catégorie décrit le sens, et des sens comparables publiés la portent. C'est le cas des deux objets du temps et des deux mots de la répétition (C retenus). Pour « Seul », que l'audit proposait d'y joindre, l'arbitrage maintient l'affirmation : l'absence de compagnie n'est pas une interaction sociale.

## T6.4 Points examinés à la demande de l'arbitrage

**Les cinq `concept_abstrait` (C3-0), type vérifié indépendamment de la catégorie, sans en faire un type de secours.**

| Sens | Type publié | Ce que la vérification établit |
|---|---|---|
| 本当 « Vérité » | `concept_abstrait` | type propre : un concept non matériel, ni information, ni quantité, ni propriété d'une entité |
| 生活 « Mode de vie » | `concept_abstrait` | type propre : ni une activité, ni l'état d'une personne à un moment |
| また, sens 1 « À nouveau » | `concept_abstrait` | cohérent avec les adverbes de temps publiés, la catégorie `temps › chronologie › succession` étant retenue |
| もう一度 « Encore une fois » | `concept_abstrait` | même constat que pour また, sens 1 |
| だんだん « Graduellement » | `concept_abstrait` | tenable : ni entité, ni occurrence, ni caractéristique d'une entité ; écart signalé avec ゆっくり (`propriete`), sans proposition |

Aucun changement de type n'est proposé.

**Les autres chevauchements avec le volet 1.**

| Sens | Relevé du criblage | Ce qu'il en reste |
|---|---|---|
| だんだん | C7-c : « peu » dans « Peu à peu », fonction `quantificateur` non examinée | fausse alerte : le mot ne donne l'étendue d'aucun référent |
| だんだん | C10-a : D1400 refuse `aspect` faute de définition | `aspect` n'a toujours pas de définition normative ; le verdict n'en dépend pas (Q4) |
| 一人, sens 2 | C7-c : « tout » dans « Tout seul » | fausse alerte : un adverbe du français dans une traduction |
| 本当 | C5-0 : dimension `vrai_faux:vrai` posée | l'axe décrit directement le sens ; réserve sur « réel » |

**声 : un seul avertissement examiné.** Le `type-nul` de ce sens est arbitré L (tranche 1) et n'est pas rouvert. La fiche `categorie-nulle` conclut L : la fiche source réunit la voix qui parle, la voix qui chante et le cri d'un animal.

**Aucun verdict n'est donné aux sens hors tranche**, y compris quand une fiche relève un écart avec eux (初めて, 一緒, 休み, ペン, 切符, ゆっくり sens 1, 明るい, 暗い, 爽やか).

## T6.5 Réserves, divergences et modifications proposées

### Modifications retenues (4), non appliquées

| Sens | Classement | Modification retenue | Comparable publié qui la fonde | Statut |
|---|---|---|---|---|
| `v_671_s1` 時計 « Horloge » | C | `category` : `null` → `temps` (niveau 1 seul). | ペン, 鉛筆, ノート (écrire) ; 切符 (utilisation des transports) ; A2-L3 §7, règle 5 | retenue à l'arbitrage du 2026-10-08 ; non appliquée |
| `v_287_s1` カレンダー « Calendrier » | C | `category` : `null` → `temps › calendrier` (niveau 2). | les mêmes ; « Calendrier » est le nom du domaine | retenue à l'arbitrage du 2026-10-08 ; non appliquée |
| `v_500_s1` また « À nouveau » | C | `category` : `null` → `temps › chronologie › succession`. | 初めて « Pour la première fois », même lot 21 | retenue à l'arbitrage du 2026-10-08 ; non appliquée |
| `v_503_s1` もう一度 « Encore une fois » | C | `category` : `null` → `temps › chronologie › succession`. | 初めて « Pour la première fois », même lot 21 | retenue à l'arbitrage du 2026-10-08 ; non appliquée |

**Non retenue** : `v_627_s2` 一人 « Seul », `category` : `null` → `relations_sociales › interactions_sociales`. Le cas est classé L et garde `category: null`.

Les trois questions posées à l'arbitrage ont reçu leur réponse : **un objet spécialisé suit le domaine qu'il sert** (時計, カレンダー) ; **« une fois de plus » est, comme « la première fois », une place dans une suite d'occurrences** (また sens 1, もう一度) ; **la catégorie d'un pôle ne s'impose pas à l'autre par symétrie** (一人, sens 2, face à 一緒).

La liste des corrections du volet 2 compte désormais **dix modifications de SENSE, toutes non appliquées** :

| # | SENSE | Classement | Modification retenue |
|---|---|---|---|
| 1 | `v_500_s2` また « Aussi » | F | `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]` (une modification, deux avertissements) |
| 2 | `v_65_s2` 頭 « Esprit » | C | `semantic_type` : `null` → `propriete` |
| 3 | `v_696_s1` 表 « Face » | C | `semantic_type` : `null` → `lieu` |
| 4 | `v_606_s1` 皆 « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` |
| 5 | `v_687_s1` 皆さん « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` |
| 6 | `v_528_s1` 並ぶ « Faire la queue » | C | `category` : `null` → `espace_proprietes_spatiales › position_localisation` |
| 7 | `v_671_s1` 時計 « Horloge » | C | `category` : `null` → `temps` (niveau 1) |
| 8 | `v_287_s1` カレンダー « Calendrier » | C | `category` : `null` → `temps › calendrier` |
| 9 | `v_500_s1` また « À nouveau » | C | `category` : `null` → `temps › chronologie › succession` |
| 10 | `v_503_s1` もう一度 « Encore une fois » | C | `category` : `null` → `temps › chronologie › succession` |

Onze avertissements cesseraient (また, sens 2, en porte deux). また porte deux modifications, une par sens. **Rien n'est exécuté** ; aucune décision historique n'est réécrite.

### Divergences relevées (4), sans verdict sur les comparables

1. **Objets rangés ou non dans le domaine qu'ils servent** : ペン, 鉛筆, ノート, 辞書, 切符, 切手, 地図 d'un côté ; 時計 et カレンダー de l'autre. **Résolue** par les deux C retenus.
2. **一緒 (lot 22) et 一人, sens 2 (lot 14)** : « être accompagné » est en interactions sociales, « être sans compagnie » sans catégorie. **Conservée** comme contrôle transversal du volet 1, sans verdict sur 一緒.
3. **初めて et les mots de la répétition, dans le même lot 21** : la première occurrence est en succession ; « une fois de plus » et « à nouveau » étaient sans catégorie. **Résolue** par les deux C retenus.
4. **Le type des adverbes de manière** : だんだん `concept_abstrait` (lot 21), ゆっくり `propriete` (lot 22). Aucune proposition ; **conservée** pour le volet 1.

**Points transversaux conservés** : 死ぬ (formule inexacte, doctrine commune avec 力) ; 声 (`type-nul` arbitré L, non rouvert) ; だんだん / ゆっくり (type) ; 本当 (« réel » et l'axe réel / fictif) ; まっすぐ (formule de D1411 et caractère d'une personne).

### Réserves, fiche par fiche

- `v_671_s1` 時計 « Horloge » (**C**) : Ce `null` venait d'un arbitrage (révision 5.6b du lot 05), qui avait rejeté un niveau 3 précis sans examiner le niveau 1. L'arbitrage du 2026-10-08 retient la modification : `temps`, au niveau 1, les autres champs restant inchangés. Elle n'est pas appliquée ; D0404 n'est pas réécrite.
- `v_287_s1` カレンダー « Calendrier » (**C**) : Les deux verdicts étaient liés par leur argument. L'arbitrage du 2026-10-08 retient les deux modifications ; celle-ci : `temps › calendrier`, au niveau 2, les autres champs restant inchangés. Elle n'est pas appliquée ; D0849 n'est pas réécrite.
- `v_457_s1` 暇 « Libre » (**L**) : La traduction principale de la source est « Temps libre », et la fiche dit « adjectif en na (et nom) ». Lu comme un nom, « temps libre » serait une période, proche de 休み. Le lot 16 a retenu « Libre » en traduction principale (D1119) ; l'audit suit le sens publié.
- `v_627_s2` 一人 « Seul » (**L**) : Divergence conservée comme contrôle transversal du volet 1, sans verdict sur 一緒 : « être accompagné » est en interactions sociales, « être sans compagnie » sans catégorie. Les deux pôles ne sont pas traités de la même façon aujourd'hui.
- `v_500_s1` また « À nouveau » (**C**) : Le lot 21 avait arbitré l'absence de catégorie contre la seule alternative `temps › fréquence` (choix 9) ; la succession n'y avait pas été discutée. L'arbitrage du 2026-10-08 retient la modification, les autres champs restant inchangés. Elle n'est pas appliquée ; D1379 n'est pas réécrite. La prise de congé (« à bientôt ») reste en nuance (A9, §2.1).
- `v_503_s1` もう一度 « Encore une fois » (**C**) : Les deux verdicts étaient liés. L'arbitrage du 2026-10-08 retient la modification, les autres champs restant inchangés. Elle n'est pas appliquée ; D1385 n'est pas réécrite.
- `v_425_s1` だんだん « Graduellement » (**L**) : Deux adverbes de manière sont typés différemment : だんだん `concept_abstrait` (lot 21), ゆっくり `propriete` (lot 22, « une caractéristique de la manière d'agir »). Je ne propose aucun changement de type ; je signale l'écart pour le volet 1.
- `v_525_s2` まっすぐ « Honnête » (**L**) : La formule de D1411 est l'un des termes du point de contrôle transversal sur le caractère d'une personne (volet 1). Ce verdict ne le tranche pas : il établit seulement qu'un jugement moral n'a pas de catégorie.
- `v_510_s1` 本当 « Vérité » (**L**) : La fiche dit « réel, authentique ou vrai », et « Réalité » est une autre traduction publiée. A2-DIM distingue vérité et réalité (§3) et a un axe réel / fictif. Je ne propose pas de seconde dimension : le sens publié est « Vérité » ; je le signale.
- `v_558_s1` 死ぬ « Mourir » (**L**) : Le fondement est la doctrine du lot 19 (une catégorie ne s'impose pas quand la fiche déborde son domaine), non l'absence de catégorie. 死ぬ et 生まれる, deux événements de la vie, ne sont pas traités de la même façon ; les fiches justifient l'écart.

## T6.6 Les 18 fiches d'audit

### A · Le tabac (3 cas)

#### `v_542_s1` · 吸う (すう) · « Fumer » — **L**

- **Fiche source** (`n5_v_542`, verbe) : traductions « Fumer ; Aspirer ; Inhaler ». Nuance : « Verbe transitif (groupe u) exprimant l'action d'inspirer de l'air ou de la fumée (comme fumer une cigarette), ou d'aspirer un liquide. » Exemple : « ここで たばこ を 吸い ます か 。 » — « Est-ce qu'on fume des cigarettes ici ? »
- **État publié** : sens 1 sur 2 ; traduction « Fumer » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Aspirer » (`null`, `action`).
- **Justification historique** : D1292 (lot 19) : « Fumer : aucune catégorie du registre ne nomme le tabac ; il n'est ni un aliment ni un soin. Action sans domaine thématique propre. Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : l'arbre ne nomme ni le tabac ni le fait de fumer.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Consommation alimentaire » (Alimentation & cuisine) ; « Accessoires domestiques » (Habitat & vie domestique) ; « Produits agricoles » (Agriculture & élevage) ; « Produits manufacturés » (Production & industrie) ; « Matières naturelles ; Matériaux organiques ; Matériaux manufacturés » (Matières & matériaux). A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : たばこ, sens 1 et 2, sont sans catégorie (même tranche). Le sens 2 de la même ENTRY, « Aspirer », a été confirmé L. 飲む « Boire » et 食べる « Manger » sont en alimentation › consommation alimentaire. 灰皿 « Cendrier » est en habitat › accessoires domestiques.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action d'inspirer […] de la fumée (comme fumer une cigarette) » ; l'exemple dit « est-ce qu'on fume des cigarettes ici ? ». La source classait le mot sous « consommation ». L'affirmation de D1292 est exacte : A2-L3 ne nomme le tabac nulle part. « Consommation alimentaire » décrit ce que l'on mange et boit ; fumer n'est ni l'un ni l'autre, ce que la raison relève, et la fiche ne parle ni de santé ni de soin. Aucune catégorie ne décrit le sens. La raison tient.

#### `v_598_s1` · たばこ (たばこ) · « Cigarette » — **L**

- **Fiche source** (`n5_v_598`, nom) : traductions « Cigarette ; Tabac ; Cigare ». Nuance : « Nom désignant le tabac ou une cigarette. S'écrit le plus souvent en hiragana (たばこ) ou parfois en kanji (煙草). On l'associe fréquemment au verbe *suu* (吸う) pour dire « fumer ». » Exemple : « ここで たばこ を すっ て は いけ ませ ん 。 » — « Il est interdit de fumer une cigarette ici. »
- **État publié** : sens 1 sur 2 ; traduction « Cigarette » ; catégorie `null` ; type `objet_artefact` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`. Autres sens : « Tabac » (`null`, `substance_matiere`).
- **Justification historique** : D1295 (lot 19) : « Une cigarette : aucune catégorie du registre ne la nomme. Objet sans domaine thématique propre. Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : le domaine fonctionnel de l'objet, le tabac, n'existe pas dans l'arbre.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §7, règle 5 : « un objet fonctionnel spécialisé suit son domaine fonctionnel, pas une racine "Objets" ». A2-L3-v1, §5 : « Consommation alimentaire » (Alimentation & cuisine) ; « Accessoires domestiques » (Habitat & vie domestique) ; « Produits agricoles » (Agriculture & élevage) ; « Produits manufacturés » (Production & industrie) ; « Matières naturelles ; Matériaux organiques ; Matériaux manufacturés » (Matières & matériaux). A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 灰皿 « Cendrier » et マッチ « Allumette » sont en habitat › accessoires domestiques : la fiche de 灰皿 décrit « le récipient utilisé pour déposer les cendres ». 吸う, sens 1 « Fumer », et le sens 2 de la même ENTRY sont sans catégorie (même tranche). Hors tranche, sans verdict : 物 « Chose » est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le nom désigne « le tabac ou une cigarette », et qu'on l'associe à 吸う « pour dire fumer » ; l'exemple dit « il est interdit de fumer une cigarette ici ». Une cigarette est un objet spécialisé : A2-L3 (§7, règle 5) veut qu'il suive son domaine fonctionnel. J'ai donc cherché ce domaine : c'est le tabac, que l'arbre ne nomme pas. « Accessoires domestiques », qui porte le cendrier, décrit un objet de la maison ; la cigarette n'en est pas un. « Consommation alimentaire » et « Produits manufacturés » ne décrivent pas davantage ce que la fiche dit. L'affirmation de D1295 est exacte, et le `null` ne vient pas d'une difficulté de classement : le domaine manque. La raison tient.

#### `v_598_s2` · たばこ (たばこ) · « Tabac » — **L**

- **Fiche source** (`n5_v_598`, nom) : traductions « Cigarette ; Tabac ; Cigare ». Nuance : « Nom désignant le tabac ou une cigarette. S'écrit le plus souvent en hiragana (たばこ) ou parfois en kanji (煙草). On l'associe fréquemment au verbe *suu* (吸う) pour dire « fumer ». » Exemple : « ここで たばこ を すっ て は いけ ませ ん 。 » — « Il est interdit de fumer une cigarette ici. »
- **État publié** : sens 2 sur 2 ; traduction « Tabac » ; catégorie `null` ; type `substance_matiere` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`. Autres sens : « Cigarette » (`null`, `objet_artefact`).
- **Justification historique** : D1301 (lot 19) : « Le tabac : aucune catégorie du registre ne le nomme ; il n'est ni un aliment ni une matière de construction ou de fabrication. Matière sans domaine thématique propre, comme le sens 1. Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : aucun domaine de l'arbre ne rend compte de cette matière.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Consommation alimentaire » (Alimentation & cuisine) ; « Accessoires domestiques » (Habitat & vie domestique) ; « Produits agricoles » (Agriculture & élevage) ; « Produits manufacturés » (Production & industrie) ; « Matières naturelles ; Matériaux organiques ; Matériaux manufacturés » (Matières & matériaux). A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY est sans catégorie (même tranche). 紙 « Papier » et 木, sens 2 « Bois (matière) », sont en matières et matériaux : ce sont des matériaux de fabrication.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le nom désigne « le tabac ou une cigarette » ; l'exemple illustre le sens 1, et ce sens repose sur ces mots et sur la traduction « Tabac ». La fiche ne dit rien de plus du tabac : ni plante, ni culture, ni produit. « Matières & matériaux » range des matériaux de fabrication ; « Produits agricoles » supposerait que la fiche parle d'agriculture ; l'alimentation ne convient pas. L'affirmation de D1301 est exacte. La raison tient.

### B · Objets que la raison écarte d'un domaine voisin (3 cas)

#### `v_671_s1` · 時計 (とけい) · « Horloge » — **C**

- **Fiche source** (`n5_v_671`, nom) : traductions « Horloge ; Montre ; Pendule ; Réveil ». Nuance : « Nom composé des kanjis signifiant « temps » et « mesurer / compter », désignant aussi bien une montre portée au poignet qu'une horloge murale ou une pendule. » Exemple : « かべ に 時計 が かかってい ます 。 » — « Il y a une horloge accrochée au mur. »
- **État publié** : sens 1 sur 1 ; traduction « Horloge » (Montre, Pendule) ; catégorie `null` ; type `objet_artefact` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`.
- **Justification historique** : D0404 (lot 05) : « Aucune catégorie primaire pertinente : 時計 est un instrument qui indique le temps, pas une unité temporelle, et le registre n'a pas de catégorie d'instrument de mesure. Le ranger avec les unités de l'heure ferait d'une proximité fonctionnelle une appartenance (révision 5.6b). Addendum A5. »
- **Vérification de l'affirmation** : affirmation non confirmée : le temps est le domaine fonctionnel de l'objet.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §7, règle 5 : « un objet fonctionnel spécialisé suit son domaine fonctionnel, pas une racine "Objets" ». A2-ST-v1, §5, règles 4 et 5 : « la fonction ou le domaine spécialisé détermine `category` ; la nature de l'entité détermine `semantic_type` » ; « un objet spécialisé reste Objet / artefact même si sa catégorie est Santé, Alimentation, Technologie ». A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier → Jours ; Mois ; Années ; Dates » ; « Chronologie → Avant / après ; Début / fin ; Succession » ; « Durée » ; « Fréquence → Fréquent ; Occasionnel ; Rare » ; « Relations temporelles ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : Dans les données publiées, les objets spécialisés suivent leur domaine fonctionnel, y compris quand la catégorie nomme une notion ou une activité : ペン « Stylo », 鉛筆 « Crayon » et ノート « Cahier » sont en communication et langage › écriture › écrire ; 辞書 « Dictionnaire » en langues ; 切符 « Billet » en transport › utilisation des transports ; 切手 « Timbre » en communication › transmission ; 地図 « Carte » en représentation géographique › cartes. カレンダー est sans catégorie, par renvoi à ce sens (même tranche). Sur les 89 sens publiés de type `objet_artefact`, cinq seulement sont sans catégorie : 時計, カレンダー, 荷物, たばこ (sens 1) et 物 « Chose » (hors tranche, sans verdict).
- **Verdict** : **C**.
- **Motivation** : La fiche décrit un nom « composé des kanjis signifiant temps et mesurer / compter, désignant aussi bien une montre portée au poignet qu'une horloge murale ou une pendule » ; l'exemple dit « il y a une horloge accrochée au mur ». C'est un objet spécialisé, dont la fonction est de donner l'heure. D0404 (révision 5.6b) a écarté la catégorie proposée alors, temps › unités temporelles › heures, minutes, secondes, au motif qu'une horloge n'est pas une unité et qu'une « proximité fonctionnelle » ne fait pas une appartenance. Le premier point est juste : ce niveau 3 ne convenait pas. Le second ne s'accorde pas avec A2-L3 (§7, règle 5), pour qui un objet fonctionnel spécialisé « suit son domaine fonctionnel », ni avec les données publiées, où le stylo est rangé avec l'écriture et le billet avec l'utilisation des transports. Le domaine fonctionnel d'une horloge est le temps. La catégorie convient au niveau 1, sans descendre vers une sous-catégorie qui dirait une notion précise ; six sens publiés portent déjà `temps` seul. L'affirmation de la raison ne tient donc pas : elle a cherché une catégorie d'instrument de mesure, que l'arbre n'a pas, au lieu du domaine que l'instrument sert.
- **Modification retenue, non appliquée** : `category` : `null` → `temps` (niveau 1 seul). L'avertissement `categorie-nulle` cesserait. Le type `objet_artefact` n'est pas touché.
- **Réserve** : Ce `null` venait d'un arbitrage (révision 5.6b du lot 05), qui avait rejeté un niveau 3 précis sans examiner le niveau 1. L'arbitrage du 2026-10-08 retient la modification : `temps`, au niveau 1, les autres champs restant inchangés. Elle n'est pas appliquée ; D0404 n'est pas réécrite.

#### `v_287_s1` · カレンダー (かれんだー) · « Calendrier » — **C**

- **Fiche source** (`n5_v_287`, nom) : traductions « Calendrier ; Éphéméride ». Nuance : « Nom d'origine étrangère (gairaigo) transcrit en katakana, désignant un calendrier ou un almanach. Compteur spécifique : 枚 (mai) pour les feuilles ou 冊 (satsu) pour les livrets. Les romajis associés sont (*karendaa*). » Exemple : « カレンダー に よえい を かきこみます 。 » — « Je note mes projets sur le calendrier. »
- **État publié** : sens 1 sur 1 ; traduction « Calendrier » (Éphéméride) ; catégorie `null` ; type `objet_artefact` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`.
- **Justification historique** : D0849 (lot 13) : « Aucune catégorie primaire pertinente : カレンダー est un objet qui présente les jours et les mois, pas une notion du calendrier. Le ranger dans temps › calendrier ferait d'une proximité fonctionnelle une appartenance ; le registre n'a pas de catégorie pour ce type d'objet. Même traitement que 時計 (lot 05, révision 5.6b). Addendum A5. »
- **Vérification de l'affirmation** : affirmation non confirmée : « Calendrier » est le domaine fonctionnel de l'objet.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §7, règle 5 : « un objet fonctionnel spécialisé suit son domaine fonctionnel, pas une racine "Objets" ». A2-ST-v1, §5, règles 4 et 5 : « la fonction ou le domaine spécialisé détermine `category` ; la nature de l'entité détermine `semantic_type` » ; « un objet spécialisé reste Objet / artefact même si sa catégorie est Santé, Alimentation, Technologie ». A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier → Jours ; Mois ; Années ; Dates » ; « Chronologie → Avant / après ; Début / fin ; Succession » ; « Durée » ; « Fréquence → Fréquent ; Occasionnel ; Rare » ; « Relations temporelles ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 時計, auquel la raison renvoie, est retenu C dans cette tranche. ペン, 鉛筆 et ノート sont en écriture › écrire ; 辞書 en langues ; 地図 en représentation géographique › cartes ; 切符 en utilisation des transports : des objets rangés dans le domaine qu'ils servent. Les noms des jours de la semaine sont en temps › calendrier › jours.
- **Verdict** : **C**.
- **Motivation** : La fiche décrit un nom « désignant un calendrier ou un almanach » ; l'exemple dit « je note mes projets sur le calendrier ». C'est un objet spécialisé, dont la fonction est de présenter les jours et les mois, ce que D0849 dit elle-même. La raison écarte temps › calendrier parce que l'objet n'est « pas une notion du calendrier » et qu'une proximité fonctionnelle ne ferait pas une appartenance. Or c'est le critère même d'A2-L3 (§7, règle 5) : un objet fonctionnel spécialisé suit son domaine fonctionnel ; sa nature d'objet est dite par le type (A2-ST, §5, règle 4), non par l'absence de catégorie. « Calendrier » est le nom du domaine. La raison ajoute que « le registre n'a pas de catégorie pour ce type d'objet » : elle cherche une catégorie d'objets, que l'architecture refuse par principe. L'affirmation ne tient pas, et le `null` repose sur le seul renvoi à 時計.
- **Modification retenue, non appliquée** : `category` : `null` → `temps › calendrier` (niveau 2). L'avertissement `categorie-nulle` cesserait. Le type `objet_artefact` n'est pas touché.
- **Réserve** : Les deux verdicts étaient liés par leur argument. L'arbitrage du 2026-10-08 retient les deux modifications ; celle-ci : `temps › calendrier`, au niveau 2, les autres champs restant inchangés. Elle n'est pas appliquée ; D0849 n'est pas réécrite.

#### `v_694_s1` · 荷物 (にもつ) · « Bagage » — **L**

- **Fiche source** (`n5_v_694`, nom) : traductions « Bagage ; Colis ; Paquet ; Fardeau ». Nuance : « Nom composé des kanjis signifiant « fardeau / charge » et « chose / objet », désignant les bagages de voyage, les paquets ou les colis postaux. » Exemple : « ホテル に 荷物 を おき ます 。 » — « Je pose mes bagages à l'hôtel. »
- **État publié** : sens 1 sur 1 ; traduction « Bagage » (Colis, Paquet) ; catégorie `null` ; type `objet_artefact` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`.
- **Justification historique** : D0408 (lot 05) : « Aucune catégorie primaire pertinente : 荷物 est ce qui est porté ou transporté, pas une utilisation des transports, et le registre n'a pas de catégorie des bagages ni des marchandises (révision 5.6b). Le type sémantique objet_artefact reste connu. Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte dans sa conclusion : la fiche nomme deux domaines fonctionnels (le voyage, la poste).
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §7, règle 5 : « un objet fonctionnel spécialisé suit son domaine fonctionnel, pas une racine "Objets" ». A2-L3-v1, §5 : « Préparation du voyage » (Voyage & tourisme) ; « Utilisation des transports » (Transport & mobilité) ; « Sacs & contenants personnels → Sacs ; Sacs à dos ; Portefeuilles » (Habillement & accessoires personnels) ; « Communication → Transmission » (Communication & langage). Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine.
- **Comparables examinés** : かばん « Sac » est en habillement › sacs et contenants personnels : sa fiche décrit « un sac servant à transporter des affaires », un contenant. 切符 « Billet » est en transport › utilisation des transports ; 切手 « Timbre » en communication › transmission. 時計 et カレンダー sont retenus C dans cette tranche.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit un nom « désignant les bagages de voyage, les paquets ou les colis postaux » ; l'exemple dit « je pose mes bagages à l'hôtel ». J'ai appliqué la même règle qu'à 時計 : un objet spécialisé suit son domaine fonctionnel. Ici la fiche en nomme deux, le voyage pour les bagages et la poste pour les colis ; et le mot désigne ce que l'on transporte, non un contenant, ce qui écarte la catégorie de かばん. Aucun domaine ne couvre les deux emplois d'un sens unique (D0407). Le `null` tient, par le débordement de la fiche plus que par l'absence d'une catégorie « des bagages » qu'invoque D0408.

### C · États d'une personne (3 cas)

#### `v_144_s1` · 忙しい (いそがしい) · « Occupé » — **L**

- **Fiche source** (`n5_v_144`, adjectif en i) : traductions « Occupé ; Pris ; Débordé (par le travail ou les tâches) ». Nuance : « Adjectif en -i désignant un emploi du temps chargé. Son kanji (忙) est fascinant : il fusionne la clé du 'cœur/esprit' 心 (shin) et le kanji de la 'perte/disparition' 亡 (bou). Littéralement, être pressé ou occupé en japonais signifie ainsi 'perdre son cœur' ou avoir l'esprit complètement accaparé. » Exemple : « 今週 は 仕事 が おおく て とても 忙しい です 。 » — « Cette semaine, j'ai beaucoup de travail et je suis très occupé. »
- **État publié** : sens 1 sur 1 ; traduction « Occupé » (Pris, Débordé) ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adjectif_i`.
- **Justification historique** : D1122 (lot 16) : « Aucune catégorie primaire pertinente : la fiche décrit « un emploi du temps chargé », l'état d'une personne quant à son temps. Le registre ne le range ni dans le temps (qui porte les notions de temps), ni dans le seul travail : la traduction de la source dit « par le travail ou les tâches ». Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : l'état d'une personne quant à son temps n'a pas de catégorie.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier → Jours ; Mois ; Années ; Dates » ; « Chronologie → Avant / après ; Début / fin ; Succession » ; « Durée » ; « Fréquence → Fréquent ; Occasionnel ; Rare » ; « Relations temporelles ». A2-L3-v1, §5, Être humain : « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort » ; « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 暇 « Libre » est sans catégorie (même tranche). 休み « Repos » est en temps › moments et périodes : c'est une période. 元気 « En forme » et 疲れる « Se fatiguer » sont en états et besoins physiques › fatigue et énergie physique ; 困る « Avoir des ennuis » en états psychologiques. 働く « Travailler » est en travail et vie professionnelle.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « un emploi du temps chargé » ; sa traduction précise « débordé (par le travail ou les tâches) » ; l'exemple dit « j'ai beaucoup de travail et je suis très occupé ». Le reste de la nuance commente le kanji, non l'emploi (D1123). J'ai vérifié l'affirmation de D1122 : « Temps » range des notions de temps, non l'état de celui qui en manque ; le travail n'est qu'une des causes que nomme la fiche (« ou les tâches ») ; ce n'est ni de la fatigue ni un état d'esprit, que la fiche ne décrit pas. Aucune catégorie ne décrit le fait d'être occupé. La raison tient.

#### `v_457_s1` · 暇 (ひま) · « Libre » — **L**

- **Fiche source** (`n5_v_457`, adjectif en na) : traductions « Temps libre ; Libre ; Dispo ; Oisif ». Nuance : « Adjectif en na (et nom) désignant le fait d'avoir du temps libre, de ne pas être occupé par le travail ou des obligations. » Exemple : « きょう の ごご は 暇 です 。 » — « Je suis libre (j'ai du temps libre) cet après-midi. »
- **État publié** : sens 1 sur 1 ; traduction « Libre » (Temps libre) ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adjectif_na`.
- **Justification historique** : D1120 (lot 16) : « Aucune catégorie primaire pertinente : avoir ou non du temps devant soi est l'état d'une personne, que le registre ne range ni dans le temps (qui porte les notions de temps), ni dans le travail (la fiche parle du travail « ou » d'autres obligations). Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : « Moments & périodes » et « Loisirs » examinés et écartés.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier → Jours ; Mois ; Années ; Dates » ; « Chronologie → Avant / après ; Début / fin ; Succession » ; « Durée » ; « Fréquence → Fréquent ; Occasionnel ; Rare » ; « Relations temporelles ». A2-L3-v1, §5, Loisirs & jeux : « Loisirs » ; « Activités récréatives → Collection ; Promenade de loisir ; Passe-temps ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 忙しい « Occupé » est sans catégorie (même tranche). 休み « Repos » et 夏休み sont en temps › moments et périodes (D0947 : « la période pendant laquelle on ne travaille ou n'étudie pas »). 遊ぶ « S'amuser » est en loisirs et jeux › loisirs.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « le fait d'avoir du temps libre, de ne pas être occupé par le travail ou des obligations » ; l'exemple dit « je suis libre cet après-midi ». Deux catégories voisines ont été examinées. « Moments & périodes », qui porte 休み : 休み désigne une période ; ce sens, publié « Libre » avec le type `etat`, dit la disponibilité d'une personne, ce que l'exemple montre. « Loisirs » : la fiche ne parle d'aucune activité de loisir, seulement de l'absence d'obligations. Aucune catégorie ne décrit le fait d'être disponible. La raison de D1120 tient.
- **Réserve** : La traduction principale de la source est « Temps libre », et la fiche dit « adjectif en na (et nom) ». Lu comme un nom, « temps libre » serait une période, proche de 休み. Le lot 16 a retenu « Libre » en traduction principale (D1119) ; l'audit suit le sens publié.

#### `v_627_s2` · 一人 (ひとり) · « Seul » — **L**

- **Fiche source** (`n5_v_627`, nom) : traductions « Une personne ; Tout seul ; Seul(e) ». Nuance : « Compteur / nom spécial (lecture japonaise *kun'yomi*) désignant soit une seule personne, soit le fait d'être seul sans compagnie (*hitori de*). » Exemple : « へや に 一人 が い ます 。 » — « Il y a une personne dans la pièce. »
- **État publié** : sens 2 sur 2 ; traduction « Seul » (Tout seul) ; catégorie `null` ; type `etat` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`. Autres sens : « Une personne » (`nombres_quantification › comptage_compteurs › personnes`, `quantite_valeur`).
- **Justification historique** : D1015 (lot 14) : « Aucune catégorie primaire pertinente : « être seul, sans compagnie » est un état d'une personne, que le registre ne range ni dans les relations sociales (il s'agit de l'absence de compagnie, non d'une relation) ni dans les états physiques ou psychologiques. Type etat. Addendum A5. »
- **Vérification de l'affirmation** : affirmation maintenue par l'arbitrage : l'absence de compagnie n'est pas une interaction sociale.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Relations sociales : « Interactions sociales » ; « Amitié & relations interpersonnelles » ; « Groupes & appartenance sociale ». A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 一緒 « Ensemble » (lot 22, choix arbitré) est en relations sociales › interactions sociales, type `etat` : sa fiche décrit le fait « d'être accompagné », et D1415 retient la catégorie parce que « la fiche et son exemple ne portent que sur des personnes ». 上手 et 下手 partagent la catégorie de l'habileté, D1090 y voyant « un degré sur la même échelle ». Le sens 1 de la même ENTRY, « Une personne », est en comptage et compteurs › personnes.
- **Verdict arbitré (proposé : C)** : **L**.
- **Motivation** : La fiche dit que le mot désigne aussi « le fait d'être seul sans compagnie (hitori de) » ; l'exemple illustre le sens 1, et ce sens repose sur ces mots et sur les traductions « Tout seul », « Seul(e) ». D1015 (lot 14) écarte les relations sociales : « il s'agit de l'absence de compagnie, non d'une relation ». La fiche décrit en effet une absence de compagnie, non une interaction entre personnes, et aucune autre catégorie ne nomme le fait d'être seul. Le `null` est maintenu, et la raison tient. La proposition initiale de cet audit était C, par symétrie avec 一緒 « Ensemble », rangé depuis le lot 22 en interactions sociales ; l'arbitrage du 2026-10-08 l'a écartée : la catégorie de 一緒 ne suffit pas à imposer une symétrie, et le cas est classé L. Relevé du criblage (C7-c) : la règle a vu « tout » dans « Tout seul » ; c'est un adverbe du français dans une traduction ; aucune fonction `quantificateur` n'est en cause.
- **Réserve** : Divergence conservée comme contrôle transversal du volet 1, sans verdict sur 一緒 : « être accompagné » est en interactions sociales, « être sans compagnie » sans catégorie. Les deux pôles ne sont pas traités de la même façon aujourd'hui.

### D · Répétition et progression (3 cas)

#### `v_500_s1` · また (また) · « À nouveau » — **C**

- **Fiche source** (`n5_v_500`, adverbe) : traductions « À nouveau ; Encore ; Aussi ; De plus ». Nuance : « Adverbe exprimant la répétition d'une action ou le retour d'un état (« à nouveau, une fois de plus »), ou servant à lier des arguments (« de plus ») et à prendre congé (« à plus / à bientôt » avec *mata ne*). » Exemple : « また あいましょう 。 » — « Regardons-nous à nouveau (ou : à bientôt). »
- **État publié** : sens 1 sur 2 ; traduction « À nouveau » (Encore) ; catégorie `null` ; type `concept_abstrait` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adverbe`. Autres sens : « Aussi » (`null`, `null`).
- **Justification historique** : D1379 (lot 21) : « La répétition d'une action ou le retour d'un état : aucune catégorie du registre ne nomme la répétition. temps › fréquence dit combien souvent une chose arrive (toujours, souvent, parfois), non qu'elle arrive une fois de plus. Aucune catégorie n'est cherchée pour réduire les avertissements (arbitrage du lot 20). Addendum A5. »
- **Vérification de l'affirmation** : affirmation non confirmée : « Succession » porte déjà 初めて, dans le même lot.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier → Jours ; Mois ; Années ; Dates » ; « Chronologie → Avant / après ; Début / fin ; Succession » ; « Durée » ; « Fréquence → Fréquent ; Occasionnel ; Rare » ; « Relations temporelles ». A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. » A9, §2.1 : un emploi d'adresse d'un mot lexical, ou un emploi seulement mentionné en nuance, reste en nuance, sans sens ni fonction. A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 初めて « Pour la première fois » (même lot 21, choix 17 arbitré) est en temps › chronologie › succession, type `concept_abstrait` ; D1394 : « la première d'une suite d'occurrences ». いつも « Toujours » et 時々 « Parfois » sont en temps › fréquence. もう一度 est sans catégorie (même tranche). Le sens 2 de la même ENTRY, « Aussi », est arbitré F (`connecteur`).
- **Verdict** : **C**.
- **Motivation** : La fiche décrit « la répétition d'une action ou le retour d'un état (à nouveau, une fois de plus) » ; l'exemple se traduit « à bientôt », et les anciens exemples disent « retrouvons-nous à nouveau demain ». D1379 a raison sur un point, arbitré au lot 21 (choix 9) : la répétition n'est pas une fréquence. Mais elle n'a comparé le sens qu'à la fréquence. Dans le même lot, 初めて est rangé en succession, comme « la première d'une suite d'occurrences ». « Une fois de plus » est une occurrence de plus dans cette même suite : la notion est la même, à un autre rang. La fiche ne justifie pas que la première occurrence ait un domaine et que la suivante n'en ait pas. L'affirmation « aucune catégorie du registre ne nomme la répétition » ne tient donc pas. Type (criblage, C3-0) : avec cette catégorie, `concept_abstrait` est celui de tous les adverbes de temps publiés (初めて, いつも, 時々) ; il ne sert pas ici de type de secours.
- **Modification retenue, non appliquée** : `category` : `null` → `temps › chronologie › succession`. L'avertissement `categorie-nulle` cesserait. Le type `concept_abstrait` et le sens 2 ne sont pas touchés.
- **Réserve** : Le lot 21 avait arbitré l'absence de catégorie contre la seule alternative `temps › fréquence` (choix 9) ; la succession n'y avait pas été discutée. L'arbitrage du 2026-10-08 retient la modification, les autres champs restant inchangés. Elle n'est pas appliquée ; D1379 n'est pas réécrite. La prise de congé (« à bientôt ») reste en nuance (A9, §2.1).

#### `v_503_s1` · もう一度 (もういちど) · « Encore une fois » — **C**

- **Fiche source** (`n5_v_503`, adverbe) : traductions « Encore une fois ; Une autre fois ; De nouveau ». Nuance : « Expression adverbiale composée de *mou* (encore/un de plus) et *ichido* (une fois), servant à demander la répétition d'une action (« répétez s'il vous plaît »). » Exemple : « もう一度 おねがいします 。 » — « Encore une fois, s'il vous plaît. »
- **État publié** : sens 1 sur 1 ; traduction « Encore une fois » (Une autre fois, De nouveau) ; catégorie `null` ; type `concept_abstrait` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adverbe`.
- **Justification historique** : D1385 (lot 21) : « La répétition d'une action : aucune catégorie du registre ne nomme la répétition, comme pour また, sens 1. Addendum A5. »
- **Vérification de l'affirmation** : affirmation non confirmée : « Succession » porte déjà 初めて, dans le même lot.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier → Jours ; Mois ; Années ; Dates » ; « Chronologie → Avant / après ; Début / fin ; Succession » ; « Durée » ; « Fréquence → Fréquent ; Occasionnel ; Rare » ; « Relations temporelles ». A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. » A9, §2.1 : un emploi d'adresse d'un mot lexical, ou un emploi seulement mentionné en nuance, reste en nuance, sans sens ni fonction. A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 初めて « Pour la première fois » est en temps › chronologie › succession (D1394 : « la première d'une suite d'occurrences »). また, sens 1 « À nouveau », auquel la raison renvoie, est retenu C dans cette tranche. いつも et 時々 sont en temps › fréquence.
- **Verdict** : **C**.
- **Motivation** : La fiche décrit une expression « composée de mou (encore / un de plus) et ichido (une fois), servant à demander la répétition d'une action » ; l'exemple dit « encore une fois, s'il vous plaît ». Sur la lecture de cette fiche, et non par renvoi à また : « une fois de plus » compte une occurrence après les précédentes. C'est, à un autre rang, ce que 初めて dit de la première, que le même lot range en succession. D1385 ne donne pour raison que le renvoi à また. La catégorie de 初めて convient aussi à ce sens. La demande (« répétez s'il vous plaît ») reste en nuance (A9, §2.1). Type (criblage, C3-0) : avec cette catégorie, `concept_abstrait` est celui des adverbes de temps publiés ; il ne sert pas de type de secours.
- **Modification retenue, non appliquée** : `category` : `null` → `temps › chronologie › succession`. L'avertissement `categorie-nulle` cesserait. Le type `concept_abstrait` n'est pas touché.
- **Réserve** : Les deux verdicts étaient liés. L'arbitrage du 2026-10-08 retient la modification, les autres champs restant inchangés. Elle n'est pas appliquée ; D1385 n'est pas réécrite.

#### `v_425_s1` · だんだん (だんだん) · « Graduellement » — **L**

- **Fiche source** (`n5_v_425`, adverbe) : traductions « Graduellement ; Peu à peu ; Progressivement ». Nuance : « Adverbe exprimant une progression lente ou un changement qui s'effectue étape par étape au fil du temps. » Exemple : « だんだん あたたかく なって きま した 。 » — « Il fait progressivement plus chaud. »
- **État publié** : sens 1 sur 1 ; traduction « Graduellement » (Peu à peu, Progressivement) ; catégorie `null` ; type `concept_abstrait` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adverbe`.
- **Justification historique** : D1399 (lot 21) : « La manière dont se fait un changement, étape par étape : ni une fréquence, ni une durée, ni une relation entre deux moments ; aucun domaine du registre ne nomme la progression. Aucune catégorie n'est cherchée pour réduire les avertissements (arbitrage du lot 20). Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : la manière dont un changement se fait n'a pas de catégorie ; `temps` écarté par un arbitrage du lot 21.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier → Jours ; Mois ; Années ; Dates » ; « Chronologie → Avant / après ; Début / fin ; Succession » ; « Durée » ; « Fréquence → Fréquent ; Occasionnel ; Rare » ; « Relations temporelles ». A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. » A9, §3.4 : le `quantificateur` « quantifie un référent désigné par un autre mot […] en en donnant l'étendue : beaucoup, peu, un peu, tout ». Périmètre du volet 2, Q4 : si L peut être établi indépendamment d'une fonction non définie, le cas est classé normalement, et le chantier normatif de la fonction est référencé à part.
- **Comparables examinés** : 初めて (succession), いつも et 時々 (fréquence) sont en temps. なる « Devenir » et 変える « Changer », arbitrés L, sont sans catégorie : aucun sens publié ne range le changement dans un domaine. ゆっくり, sens 1 « Lentement », est en espace › vitesse, type `propriete` ; son sens 2 est sans catégorie (même tranche).
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « une progression lente ou un changement qui s'effectue étape par étape au fil du temps » ; l'exemple dit « il fait progressivement plus chaud ». Le mot dit comment un changement se fait, non quand ni combien de fois : ni la fréquence, ni la durée, ni la succession ne le décrivent, et le changement lui-même n'a pas de catégorie. « Au fil du temps » situe le changement sans faire du temps le sens : l'arbitrage du lot 21 (choix 18) a écarté `temps` au niveau 1 pour cette raison. L'affirmation de D1399 est exacte. Relevés du criblage : « peu », dans « Peu à peu », n'est pas un `quantificateur` (C7-c), le mot ne donnant l'étendue d'aucun référent ; D1400 refusait `aspect`, qui n'a toujours pas de définition normative (C10-a), et le verdict ne dépend pas de cette fonction. Type (C3-0) : le sens ne désigne ni une entité ni une occurrence, et n'est pas une caractéristique attribuée à une entité ; `concept_abstrait` n'est pas ici un type de secours, sous la réserve qui suit.
- **Réserve** : Deux adverbes de manière sont typés différemment : だんだん `concept_abstrait` (lot 21), ゆっくり `propriete` (lot 22, « une caractéristique de la manière d'agir »). Je ne propose aucun changement de type ; je signale l'écart pour le volet 1.

### E · Manière et caractère (2 cas)

#### `v_504_s2` · ゆっくり (ゆっくり) · « Tranquillement » — **L**

- **Fiche source** (`n5_v_504`, adverbe) : traductions « Lentement ; Tranquillement ; À son aise ; Prendre son temps ». Nuance : « Adverbe mimétique (gitaigo) qualifiant un déplacement à faible vitesse, ou le fait d'agir sans se presser, de se détendre et de prendre son temps. » Exemple : « ゆっくり あるいて ください 。 » — « Marchez lentement, s'il vous plaît. »
- **État publié** : sens 2 sur 2 ; traduction « Tranquillement » (À son aise) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adverbe`. Autres sens : « Lentement » (`espace_proprietes_spatiales › vitesse`, `propriete`).
- **Justification historique** : D1435 (lot 22) : « « Tranquillement, à son aise » : agir sans se presser, se détendre, prendre son temps ; une manière d'agir, non une vitesse de déplacement : aucune catégorie du registre ne la nomme (arbitrage des choix du lot 22). Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : une manière d'agir ; « Sommeil & repos » et « Confort » examinés et écartés.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Être humain : « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort » ; « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Lentement », est en espace › vitesse. 休む, sens 1 « Se reposer », est en états et besoins physiques › sommeil et repos. 静か « Calme », arbitré L, est sans catégorie. Hors tranche, sans verdict : よく, sens 2 « Bien », est sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « le fait d'agir sans se presser, de se détendre et de prendre son temps » ; l'exemple illustre le sens 1 ; un ancien exemple dit « je me reposerai tranquillement à la maison ». « Se détendre » évoque le repos, et « à son aise » le confort, que A2-L3 nomme sous les états et besoins physiques. Mais le mot ne désigne ni le repos ni un état du corps : il dit de quelle façon l'on fait une chose, quelle qu'elle soit. Aucune catégorie ne nomme une manière d'agir. L'affirmation de D1435, arbitrée au lot 22, est exacte.

#### `v_525_s2` · まっすぐ (まっすぐ) · « Honnête » — **L**

- **Fiche source** (`n5_v_525`, adverbe) : traductions « Tout droit ; Directement ; Honnête ; Français (pour une direction ou un caractère) ». Nuance : « Adverbe (et adjectif en na) indiquant une direction sans déviation ni virage (« tout droit »), ou qualifiant un comportement droit et intègre. » Exemple : « まっすぐ いって ください 。 » — « Allez tout droit, s'il vous plaît. »
- **État publié** : sens 2 sur 2 ; traduction « Honnête » ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adverbe`. Autres sens : « Tout droit » (`espace_proprietes_spatiales › parcours_trajectoire`, `propriete`).
- **Justification historique** : D1411 (lot 22) : « « Honnête » : un trait de caractère ; le registre n'a pas de catégorie pour la personnalité ou le caractère. Addendum A5. »
- **Vérification de l'affirmation** : conclusion exacte : un jugement sur la conduite n'a pas de catégorie ; la formule de la raison est trop large.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Être humain : « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort » ; « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 清い, sens 2 « Pur (moralement) » (autre traduction : « Honnête »), 汚い, sens 2, et 立派, sens 2, qui jugent une conduite, sont arbitrés L. 冷たい, sens 2, est arbitré L. 明るい, 暗い et 爽やか, sens 2, sont en psychologie et esprit › états psychologiques pour « le caractère d'une personne » (point de contrôle du volet 1, sans verdict). Le sens 1 de la même ENTRY est en parcours et trajectoire.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le mot qualifie aussi « un comportement droit et intègre » ; l'exemple illustre le sens 1, et ce sens repose sur ces mots et sur la traduction « Honnête ». C'est un jugement sur la conduite : la droiture, l'intégrité. A2-L3 n'a aucune catégorie de la morale, et la fiche ne dit pas ce que la personne éprouve : ce n'est pas un état psychologique. Le verdict est celui de 清い, sens 2, lu sur cette fiche. La conclusion de D1411 tient. Sa formule est plus large que ce qu'elle établit : elle dit que le registre n'a pas de catégorie « pour la personnalité ou le caractère », alors que trois sens publiés décrivant un tempérament en portent une.
- **Réserve** : La formule de D1411 est l'un des termes du point de contrôle transversal sur le caractère d'une personne (volet 1). Ce verdict ne le tranche pas : il établit seulement qu'un jugement moral n'a pas de catégorie.

### F · Cas singuliers (4 cas)

#### `v_510_s1` · 本当 (ほんとう) · « Vérité » — **L**

- **Fiche source** (`n5_v_510`, nom) : traductions « Vérité ; Réalité ; Vrai ; Sérieux ». Nuance : « Nom (souvent utilisé comme adverbe ou adjectif en na) désignant ce qui est réel, authentique ou vrai, employé fréquemment pour marquer l'etonnement (« vraiment ? »). » Exemple : « それ は 本当 です か 。 » — « Est-ce vrai ? »
- **État publié** : sens 1 sur 1 ; traduction « Vérité » (Réalité, Vrai) ; catégorie `null` ; type `concept_abstrait` ; dimensions `vrai_faux:vrai` ; fonctions aucune ; relations aucune ; classe `nom`.
- **Justification historique** : D0068 (lot 00) : « « Vérité » : statut épistémique, porté par la dimension vrai / faux ; aucune catégorie primaire pertinente. Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : un statut épistémique, porté par une dimension.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-DIM-v1, §2 et §3 : « Réalité & statut épistémique → Réel ↔ Fictif ; Vrai ↔ Faux ; Évidence ↔ Non-évidence » ; « vérité ≠ réalité ≠ certitude ≠ exactitude ≠ précision ». A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. » A9, §2.1 : un emploi d'adresse d'un mot lexical, ou un emploi seulement mentionné en nuance, reste en nuance, sans sens ni fonction.
- **Comparables examinés** : ちょうど « Exactement » et 違う, sens 2 « Être incorrect », arbitrés L, sont sans catégorie et portent un axe d'A2-DIM. Hors tranche, sans verdict : 問題 « Problème » et 他 « Autre » sont des `concept_abstrait` sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit un nom « désignant ce qui est réel, authentique ou vrai » ; l'exemple dit « est-ce vrai ? ». La vérité n'appartient à aucun domaine : elle se dit de n'importe quel énoncé, et A2-DIM la traite comme un axe, que ce sens porte. « Communication » décrirait le fait de parler, non la vérité de ce qui est dit. L'affirmation de D0068 est exacte. Relevés du criblage. Dimension (C5-0) : l'axe vrai / faux décrit directement le sens. Type (C3-0) : la vérité est un concept non matériel, qui n'est ni une information, ni une quantité, ni une propriété attribuée à une entité ; `concept_abstrait` est ici le type propre, non un type de secours. L'emploi d'étonnement (« vraiment ? ») reste en nuance (A9, §2.1).
- **Réserve** : La fiche dit « réel, authentique ou vrai », et « Réalité » est une autre traduction publiée. A2-DIM distingue vérité et réalité (§3) et a un axe réel / fictif. Je ne propose pas de seconde dimension : le sens publié est « Vérité » ; je le signale.

#### `v_558_s1` · 死ぬ (しぬ) · « Mourir » — **L**

- **Fiche source** (`n5_v_558`, verbe) : traductions « Mourir ; Périr ; Décéder ». Nuance : « Verbe intransitif (groupe u exceptionnel - terminaison -nu) désignant l'action biologique de cesser de vivre. C'est l'un des rares verbes en *-nu* de la langue japonaise (dont le radical change en *-nde* pour la forme en te). » Exemple : « むかし 、 ゆうめい な いぬ が 死ん だ 。 » — « Autrefois, un chien célèbre est mort. »
- **État publié** : sens 1 sur 1 ; traduction « Mourir » (Décéder) ; catégorie `null` ; type `evenement` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`.
- **Justification historique** : D1299 (lot 19) : « Aucune catégorie (arbitrage des choix du lot 19) : la proposition rangeait ce sens dans être humain › cycle de vie › mort. La fiche décrit « l'action biologique de cesser de vivre », et son exemple porte sur un chien : classer le verbe entier dans le cycle de vie humain serait artificiel, et le registre n'a pas de catégorie générale de la mort qui convienne au sens documenté. 生まれる, dans ce lot, garde naissance : sa fiche et son exemple portent sur une personne. Addendum A5. »
- **Vérification de l'affirmation** : formule inexacte, conclusion exacte : l'arbre nomme la mort, mais dans un domaine que la fiche déborde.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5, Être humain : « Cycle de vie → Naissance ; Enfance ; Âge adulte ; Vieillissement ; Mort ». Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine. A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 生まれる « Naître » (même lot) est en être humain › cycle de vie › naissance : sa fiche et son exemple portent sur une personne (« je suis né à Tokyo »). 力 « Force » a été confirmé L sur la même doctrine, sa fiche portant sur « une personne ou un animal ». 咲く « Fleurir » est en monde naturel › végétation › fleurs.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « l'action biologique de cesser de vivre » ; l'exemple dit « autrefois, un chien célèbre est mort » ; un ancien exemple parle d'une fleur. Ici la formule de la famille est inexacte dans la lettre : A2-L3 nomme la mort, sous « Être humain › Cycle de vie ». Le `null` ne vient donc pas d'une absence, mais d'un débordement : la fiche dit « biologique », et son exemple porte sur un animal ; la catégorie décrirait la mort d'une personne. Le lot 19 l'a arbitré ainsi (D1299), en gardant « naissance » pour 生まれる, dont la fiche porte sur une personne. Le verdict est cohérent avec celui de 力. La raison tient.
- **Réserve** : Le fondement est la doctrine du lot 19 (une catégorie ne s'impose pas quand la fiche déborde son domaine), non l'absence de catégorie. 死ぬ et 生まれる, deux événements de la vie, ne sont pas traités de la même façon ; les fiches justifient l'écart.

#### `v_653_s1` · 声 (こえ) · « Voix » — **L**

- **Fiche source** (`n5_v_653`, nom) : traductions « Voix ; Cri (d'animal) ». Nuance : « Nom désignant la voix humaine lorsqu'on parle ou que l'on chante, ainsi que le cri émis par un animal. » Exemple : « かれ は おおきい 声 で はなし ます 。 » — « Il parle d'une voix forte. »
- **État publié** : sens 1 sur 1 ; traduction « Voix » (Cri (d'animal)) ; catégorie `null` ; type `null` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`.
- **Justification historique** : D1369 (lot 20) : « Aucune catégorie (arbitrage des choix du lot 20) : la proposition rangeait ce sens dans être humain › sens et perception › ouïe. La fiche porte à la fois sur la voix humaine et sur le cri d'un animal ; « ouïe » décrit la perception auditive d'un être humain, non le son que produit une voix ou un animal : la catégorie serait artificielle. Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte dans sa conclusion : la fiche réunit la voix humaine et le cri d'un animal.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-L3-v1, §5 : « Sens & perception → Vue ; Ouïe ; … » (Être humain) ; « Parole & conversation → Parler ; … » (Communication & langage) ; « Musique → Chant ; … » (Arts & création) ; « Animaux » (Monde naturel). Doctrine du lot 19 : une catégorie ne s'impose pas quand la fiche déborde son domaine.
- **Comparables examinés** : 鳴く « Crier (animal) » est en monde naturel › animaux ; 歌う « Chanter » en musique › chant ; 話す « Parler » en parole et conversation › parler ; 聞く, sens 1 « Écouter », et うるさい, sens 1 « Bruyant », en sens et perception › ouïe.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « la voix humaine lorsqu'on parle ou que l'on chante, ainsi que le cri émis par un animal » ; l'exemple dit « il parle d'une voix forte ». Ce sens porte deux avertissements ; son `type-nul` est arbitré L et n'est pas rouvert : seul l'avertissement de catégorie est examiné ici. La voix qui parle relèverait de la parole, celle qui chante de la musique, le cri de l'animal du monde naturel : la fiche nomme trois domaines pour un sens unique (D1364). « Ouïe », proposée puis écartée au lot 20, décrit celui qui entend, non le son émis. Aucune catégorie ne décrit le sens entier. La raison de D1369 tient.

#### `v_685_s1` · 生活 (せいかつ) · « Mode de vie » — **L**

- **Fiche source** (`n5_v_685`, nom) : traductions « Mode de vie ; Vie quotidienne ; Subsistance ; Existence ». Nuance : « Nom / verbe suru composé des kanjis signifiant « vie / naître » et « vivre / action », désignant le train-train quotidien, la vie de tous les jours ou les conditions d'existence (souvent utilisé avec le verbe *suru* pour « vivre / subvenir à ses besoins »). » Exemple : « まいにち たのしい 生活 を し て い ます 。 » — « Je mène une vie quotidienne agréable tous les jours. »
- **État publié** : sens 1 sur 1 ; traduction « Mode de vie » (Vie quotidienne, Subsistance, Existence) ; catégorie `null` ; type `concept_abstrait` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`.
- **Justification historique** : D1289 (lot 19) : « La vie de tous les jours, les conditions d'existence : notion générale, qui n'est le domaine d'aucune catégorie en particulier (ni l'habitat, ni le travail, ni le cycle de vie). Addendum A5. »
- **Vérification de l'affirmation** : affirmation exacte : une notion générale qu'aucun domaine ne borne ; « Habitat & vie domestique » examiné et écarté.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Vérification de l'affirmation d'absence : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7). A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. » A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : 住む « Habiter » est en habitat › logements ; 働く « Travailler » en travail et vie professionnelle ; 生まれる en cycle de vie. Hors tranche, sans verdict : 問題 « Problème » est un `concept_abstrait` sans catégorie.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « le train-train quotidien, la vie de tous les jours ou les conditions d'existence » ; l'exemple dit « je mène une vie quotidienne agréable ». J'ai examiné « Habitat & vie domestique », dont le nom évoque la vie de tous les jours : ses catégories décrivent le logement, le mobilier et l'entretien, non la manière de vivre. La fiche couvre l'ensemble de l'existence, subsistance comprise : ni l'habitat, ni le travail, ni le cycle de vie ne la décrivent, ce que D1289 relève. L'affirmation est exacte. Type (criblage, C3-0) : un mode de vie est un concept non matériel, qui n'est ni une activité ni l'état d'une personne à un moment ; `concept_abstrait` est ici le type propre.

## T6.7 Complétude : contrôles reproductibles

Calculés par `a2-05-travail/audit-cat-t5.mjs`, qui écrit cette tranche, sur l'inventaire (`avertissements-connus.json`), le journal, l'état publié, le registre des catégories et le rapport lui-même. Le script s'arrête si l'un d'eux échoue. Commande : `node a2-05-travail/audit-cat-t5.mjs . docs/rapports/etape2-A2-05-audit-null.md`.

| Contrôle | Résultat |
|---|---|
| Les 18 identifiants des fiches sont exactement ceux du périmètre validé | oui, 18 distincts |
| Chacun porte un avertissement `categorie-nulle` de l'inventaire (120 au total) | oui |
| Chacun a exactement une décision de journal `categorie-nulle`, `validated`, sur ce sens | oui |
| Chaque raison contient la formule de la famille, et aucune formule d'une famille déjà traitée | oui |
| Chaque sens a bien `category: null` dans les données publiées | oui |
| Aucun ne figure parmi les 91 `categorie-nulle` déjà arbitrés du rapport | oui |
| Les 18 sont exactement les cas restants de cette famille | oui ; 29 restants = 18 + 11 « autre formulation » |
| Chaque fiche porte le résultat de la vérification de l'affirmation d'absence | oui, 18 |
| Chaque catégorie proposée existe dans `data/registries/categories.json` | oui |
| Verdicts de la tranche | L = 14, F = 0, C = 4, N = 0 ; total 18 |
| Un verdict C ou F a une modification proposée, et seulement lui | oui |
| Sens publiés de type `objet_artefact` ; sans catégorie | 89 ; 5 |
| Cumul arbitré avant cette tranche, recompté sur les fiches du rapport | 118 fiches : L = 111, F = 2, C = 5, N = 0 |
| Fiches au rapport après cette tranche | 27 `type-nul` + 91 + 18 `categorie-nulle` = 136 sur 147 |
| `categorie-nulle` restant après cette tranche | 11 (« autre formulation ») |

---

# Tranche 7 · `categorie-nulle`, sixième et dernière tranche : 11 cas, et clôture du volet 2

**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : L = 11, F = 0, C = 0, N = 0. 他 « Autre » est confirmé L (l'altérité, hors hiérarchie ; « Le reste » ne suffit pas à imposer la catégorie de 後, sens 3) ; 出来る, sens 2, est confirmé L (`semantic_type: resultat`, rare mais conforme à la définition normative) ; たぶん est confirmé L (dimension `probabilite` maintenue, `type-nul` non rouvert) ; する et やる sont confirmés L, ainsi que les sept autres. **Le volet 2 est entièrement arbitré : 147 cas sur 147, L = 136, F = 2, C = 9, N = 0.** Dix modifications de SENSE sont retenues, **toutes non appliquées**. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n'est modifié ; aucune décision historique n'est réécrite.
**Avec cette tranche, les 147 avertissements de l'inventaire ont chacun leur fiche d'audit** : le contrôle de clôture est en T7.8.

## T7.1 Résultat de la tranche

| Classement | Cas | Sens |
|---|---|---|
| **L** | 11 | `v_181_s1` する ; `v_608_s1` やる ; `v_424_s1` きれい ; `v_458_s1` 有名 ; `v_506_s2` よく ; `v_511_s1` 問題 ; `v_605_s1` 他 ; `v_664_s2` 所 ; `v_684_s1` 物 ; `v_521_s1` たぶん ; `v_523_s2` 出来る |
| **F** | 0 | — |
| **C** | 0 | — |
| **N** | 0 | — |
| **Total** | 11 | L + F + C + N = 11 |

**Bilan définitif des verdicts du volet 2** : 27 `type-nul` (L = 24, F = 1, C = 2) et 120 `categorie-nulle` (L = 112, F = 1, C = 7), soit **147 cas arbitrés sur 147 : L = 136, F = 2, C = 9, N = 0**.

- **Aucune modification n'est proposée** dans cette tranche. La liste des corrections du volet 2 reste à dix modifications de SENSE, toutes non appliquées (T7.8).
- **Aucun N**, dans cette tranche comme dans tout le volet.
- **5 fiches portent une réserve** : `v_506_s2` よく ; `v_511_s1` 問題 ; `v_605_s1` 他 ; `v_664_s2` 所 ; `v_523_s2` 出来る (T7.5). Une seule nomme le classement que le cas prendrait si l'arbitrage en décidait autrement : 他 (C possible, « Reste »).
- **Les huit chevauchements avec le volet 1 sont traités dans les fiches** (T7.4), types, dimensions et fonctions vérifiés indépendamment.

## T7.2 Composition et méthode

La tranche réunit les 11 derniers `categorie-nulle`. C'est une famille résiduelle : ses raisons n'emploient aucune des formules des familles déjà traitées. Elle n'a donc pas d'unité, et **l'audit a commencé, pour chaque sens, par identifier le fondement réel du `null`**, au lieu de reprendre la justification historique.

Pour chaque cas, individuellement : fiche source entière (traductions, nuance, exemple, anciens exemples) ; sens publié, nuance publiée et autres sens de l'ENTRY ; décision `categorie-nulle` et décisions voisines, celles du lot 26 comprises ; A5, A2-L3-v1 (§2, §5 à §7), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11), A2-ST-v1, A2-DIM-v1 et A9 selon le cas ; sens comparables publiés, dans la tranche et hors d'elle.

**Comparables lus sans être audités** (catégorisés, hors des 147) : 上げる, 遊ぶ, スポーツ, 上手, かわいい, うるさい sens 1, 終わる, 始まる, 後 sens 3, 半, 半分, 全部, 所 sens 1, 出来る sens 1, 問題 sens 2. **Aucun ne reçoit de verdict ici.**

## T7.3 Le fondement réel de chaque `null`

| Sens | Formule de la raison historique | Fondement réel, vérifié sur la fiche |
|---|---|---|
| `v_181_s1` する « Faire » | « action la plus générale » | « action générique », élément hors hiérarchie (A2-L3 §6), au sens le plus strict |
| `v_608_s1` やる « Faire » | « action la plus générale […] comme する » | « action générique » au sens strict ; « Jeux » et « Sports » examinés et écartés |
| `v_424_s1` きれい « Beau » | « appréciation esthétique générale » | « propriété générale » (A2-L3 §6) ; « Vue » et « Apparence physique » examinées et écartées |
| `v_458_s1` 有名 « Célèbre » | « caractéristique générale » | « propriété générale » : la fiche nomme trois sortes de référents |
| `v_506_s2` よく « Bien » | « aucun domaine thématique propre, comme […] いい » | « propriété générale », appliquée à une action ; « Habileté » examinée et écartée |
| `v_511_s1` 問題 « Problème » | « notion générale » | aucun domaine : une difficulté se rencontre dans toute situation ; « Conflit » examiné et écarté |
| `v_605_s1` 他 « Autre » | « notion générale » | « identité / différence », élément hors hiérarchie (A2-L3 §6) ; « Reste » examiné et écarté |
| `v_664_s2` 所 « Partie » | « notion générale » | aucune catégorie ne décrit un point d'une chose ou d'une situation ; « Totalité & partie › Partie » examinée et écartée |
| `v_684_s1` 物 « Chose » | « nom générique » | « objet / artefact générique », élément hors hiérarchie (A2-L3 §6), à la lettre |
| `v_521_s1` たぶん « Peut-être » | « une estimation du locuteur, sans domaine thématique » | « possibilité / nécessité », élément hors hiérarchie (A2-L3 §6) : une modalité, portée par une dimension |
| `v_523_s2` 出来る « Être achevé / prêt » | « résultat général » | aucune catégorie de l'achèvement ; « Début / fin » et « Fabrication » examinées et écartées |

**Ce que le tableau montre.** Huit de ces onze sens relèvent d'un élément que l'architecture nomme elle-même hors hiérarchie (A2-L3 §6) : l'action générique (する, やる), la propriété générale (きれい, 有名, よく), l'objet générique (物), l'identité et la différence (他), la possibilité et la nécessité (たぶん). Pour ceux-là, la raison historique disait juste, avec d'autres mots. Les trois autres (問題, 所, 出来る) tiennent par l'absence de toute catégorie décrivant le sens ; « notion générale » et « résultat général » ne sont pas des éléments de la liste, et n'ont pas servi de preuve.

## T7.4 Points examinés à la demande de l'arbitrage

**出来る, sens 2 : le type `resultat`.** Il ne se trouve sur aucun autre des 145 sens de verbes publiés (C3-c). Vérifié contre A2-ST : « entité ou état conceptualisé principalement comme l'aboutissement d'une action, d'un processus ou d'un événement ». « Être achevé, prêt » y répond exactement, mieux qu'`evenement` (rien ne survient) ou qu'`etat` (qui ne dirait pas l'aboutissement). Le couple est rare, non fautif ; il vient d'un choix arbitré au lot 20. Aucun changement n'est proposé.

**たぶん : la dimension `probabilite`.** A2-DIM a un axe « Probabilité », à pôle unique, dans la modalité conceptuelle ; la fiche dit « une probabilité ou une supposition ». L'axe décrit directement le sens, et il est le seul à le faire. Le `type-nul` de ce sens, arbitré L, n'est pas rouvert. La fonction `modalite` reste sans définition normative ; le verdict n'en dépend pas.

**する et やる : la cohérence.** Les deux sens « Faire » ont le même type (`action`), la même absence de catégorie et le même fondement (l'action générique) ; ils sont reliés par `equivalent_to`, notée une fois, sur する. Ce qui les distingue, le registre familier de やる et son emploi pour une activité ou un jeu, est en nuance. Aucun écart.

**Les huit chevauchements avec le volet 1.**

| Sens | Relevé du criblage | Ce qu'il en reste |
|---|---|---|
| する, やる sens 1 | C10-a : la raison renvoie la relation à la passe finale | soldé : `equivalent_to` (D1585) et `similar_to` (D1587) sont publiées |
| よく, sens 2 | C7-c : « bien », fonction `intensifieur` non examinée | le mot désigne lui-même la qualité de l'action ; aucune fonction |
| 問題, sens 1 | C3-0 : `concept_abstrait` | type propre : ni information, ni état, ni événement |
| 他 | C3-0 : `concept_abstrait` | tenable : le type dit la nature abstraite du référent, non la relation |
| 他 | C10-a : D1428 refuse `alternative` faute de définition | fonction toujours non définie ; le verdict n'en dépend pas (Q4) |
| 所, sens 2 | C3-0 : `concept_abstrait` | type propre : un point d'une chose n'est plus un `lieu` |
| たぶん | C5-0 : dimension `probabilite` posée | l'axe décrit directement le sens |
| たぶん | C10-a : D1434 refuse `modalite` faute de définition | fonction toujours non définie ; le verdict n'en dépend pas (Q4) |
| 出来る, sens 2 | C3-c : verbe de type `resultat` | conforme à la définition d'A2-ST ; rare, non fautif |

**Aucun verdict n'est donné aux sens hors tranche.**

## T7.5 Réserves, divergences et modifications

### Modifications proposées

**Aucune.**

### Divergences relevées (2), sans verdict sur les comparables

1. **他 et 後, sens 3.** « Le reste » porte la catégorie totalité et partie › reste comme sens de 後, et n'est qu'une traduction, sans catégorie, pour 他. Proposé L pour 他 : sa fiche dit l'altérité, non la part d'un tout.
2. **Le type des adverbes de manière** (déjà au suivi transversal) : よく sens 2 et ゆっくり sont `propriete`, だんだん `concept_abstrait`.

### Réserves, fiche par fiche

- `v_506_s2` よく « Bien » (**L**) : Type : よく, sens 2, et ゆっくり sont typés `propriete`, だんだん `concept_abstrait` ; c'est le point de contrôle du volet 1 sur le type des adverbes de manière. Aucun changement n'est proposé.
- `v_511_s1` 問題 « Problème » (**L**) : La fiche dit que le problème « pose une difficulté », et A2-DIM a un axe facilité / difficulté, que portent 難しい et 大変. Je ne le propose pas : le nom désigne ce qui fait difficulté, il ne qualifie rien comme difficile ; l'axe ne décrit pas directement le sens. Je le signale.
- `v_605_s1` 他 « Autre » (**L**) : Divergence signalée, sans verdict sur 後 : « Le reste » est catégorisé comme sens de 後 et n'est qu'une traduction, sans catégorie, pour 他. La question a été posée à l'arbitrage du 2026-10-08, qui confirme L : « Le reste » ne suffit pas à imposer la catégorie de 後, sens 3.
- `v_664_s2` 所 « Partie » (**L**) : La traduction principale publiée, « Partie », est le second des deux mots de la fiche (« un point / une partie ») et porte le nom d'une catégorie de quantification qui ne convient pas. « Point » rendrait mieux le sens. Je le signale ; la traduction n'est pas l'objet de cet audit.
- `v_523_s2` 出来る « Être achevé / prêt » (**L**) : Les lots 18 et 19 ont mis en nuance l'état qui résulte d'un événement (開く, 立つ, 座る) ; ici la fiche donne le résultat comme le sens lui-même, sans événement distinct : le traitement diffère parce que les fiches diffèrent. A2-DIM a un axe complet / incomplet : je ne le propose pas, la fiche parlant d'une chose faite ou prête, non de la complétude d'un tout.

## T7.6 Les 11 fiches d'audit

### A · L'action la plus générale (2 cas)

#### `v_181_s1` · する (する) · « Faire » — **L**

- **Fiche source** (`n5_v_181`, verbe irrégulier) : traductions « Faire ; Coûter (pour un prix) ; Valoir ». Nuance : « Verbe irrégulier fondamental (groupe 3). En dehors de son sens principal de 'faire', il change de sens lorsqu'il est placé immédiatement après un montant financier pour indiquer le prix ou la valeur qu'affiche un objet. » Exemple : « この ノート は 200円 します 。 » — « Ce carnet coûte 200 yens. »
- **État publié** : sens 1 sur 2 ; traduction « Faire » ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations `equivalent_to` → `v_608_s1` ; classe `verbe`. Autres sens : « Coûter (pour un prix) » (`economie_commerce › prix_valeur_economique › prix`, `propriete`).
- **Justification historique** : D1331 (lot 20) : « Faire : action la plus générale, sans domaine thématique propre. Addendum A5. »
- **Fondement réel** : « action générique », élément hors hiérarchie (A2-L3 §6), au sens le plus strict.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : やる, sens 1 « Faire », relié par `equivalent_to`, est sans catégorie (même tranche). Le sens 2 de la même ENTRY, « Coûter (pour un prix) », est en économie › prix. 働く « Travailler », 作る sens 2 « Préparer (un repas) » et 洗う « Laver » portent une catégorie : leurs fiches nomment ce que l'on fait.
- **Verdict** : **L**.
- **Motivation** : La fiche dit seulement que le verbe a pour « sens principal » celui de « faire » ; l'exemple illustre le sens 2, et les anciens exemples disent faire ses devoirs, un travail, le ménage. Le fondement réel est nommé par l'architecture : c'est l'« action générique » d'A2-L3 (§6), au sens le plus strict ; « faire » n'a pas d'objet propre, et toute catégorie serait celle de ce que l'on fait, non du verbe. La raison de D1331 (« action la plus générale ») dit la même chose. Cohérence avec やる : même sens, même type `action`, même absence de catégorie, et la relation `equivalent_to` les relie ; rien ne les distingue quant au domaine. Relevé du criblage (C10-a) : le renvoi de D1332 à la passe finale est soldé, la relation étant publiée (D1585).

#### `v_608_s1` · やる (やる) · « Faire » — **L**

- **Fiche source** (`n5_v_608`, verbe) : traductions « Faire ; Donner (à des plantes, des animaux) ; Jouer (à un jeu, un sport) ». Nuance : « Verbe transitif (groupe u) synonyme familier de *suru* (faire) ou *ageru* (donner à quelqu'un de inférieur, un animal ou une plante). Il est très employé à l'oral pour exprimer l'action de s'adonner à une activité ou de s'occuper de quelque chose. » Exemple : « あした 、 テニス を やる よ 。 » — « Demain, je fais (joue au) tennis ! »
- **État publié** : sens 1 sur 2 ; traduction « Faire » (Jouer (à un jeu, un sport)) ; catégorie `null` ; type `action` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Donner (à des plantes, des animaux) » (`null`, `action`).
- **Justification historique** : D1334 (lot 20) : « Faire, s'adonner à une activité : action la plus générale, sans domaine thématique propre, comme する. Addendum A5. »
- **Fondement réel** : « action générique » au sens strict ; « Jeux » et « Sports » examinés et écartés.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « action générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §5 : « Loisirs ; Jeux ; … Activités récréatives » (Loisirs & jeux) ; « Pratique sportive ; Disciplines sportives » (Sports). A2-L3-v1, §7, règle 1 : « concept ≠ contexte d'usage ».
- **Comparables examinés** : する, sens 1 « Faire », relié par `equivalent_to`, est sans catégorie (même tranche). Le sens 2 de la même ENTRY, « Donner », a été confirmé L. 遊ぶ « S'amuser » est en loisirs et jeux › loisirs ; スポーツ « Sport » en sports › pratique sportive.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe est un « synonyme familier de suru (faire) », « très employé à l'oral pour exprimer l'action de s'adonner à une activité ou de s'occuper de quelque chose » ; l'exemple dit « demain, je fais (joue au) tennis ». Le fondement réel est le même que pour する : l'« action générique ». L'exemple porte sur un sport, et « Jouer (à un jeu, un sport) » est une autre traduction publiée : j'ai donc examiné les jeux et les sports. La fiche dit « une activité », « quelque chose » : le tennis n'est qu'un cas, et les anciens exemples parlent d'un travail et de devoirs. La raison de D1334 tient, par la fiche et non par le seul renvoi à する. Cohérence avec する : les deux sens sont traités de la même façon, et le registre familier de やる reste en nuance. Relevé du criblage (C10-a) : les renvois de D1336 et D1337 à la passe finale sont soldés ; les relations sont publiées sur する (D1585) et sur 上げる (D1587).

### B · Appréciations et propriétés (3 cas)

#### `v_424_s1` · きれい (きれい) · « Beau » — **L**

- **Fiche source** (`n5_v_424`, adjectif en na) : traductions « Joli ; Propre ; Beau ; Net ». Nuance : « Adjectif en na s'appliquant aussi bien à la beauté visuelle (paysage, personne) qu'à la propreté (ordre, netteté). » Exemple : « きれい な はな が さいて います 。 » — « De jolies fleurs sont écloses. »
- **État publié** : sens 1 sur 2 ; traduction « Beau » (Joli) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adjectif_na`. Autres sens : « Propre » (`habitat_vie_domestique › entretien_domestique › nettoyage`, `propriete`).
- **Justification historique** : D0066 (lot 00) : « « Beau » : appréciation esthétique générale, sans domaine thématique propre. Addendum A5. »
- **Fondement réel** : « propriété générale » (A2-L3 §6) ; « Vue » et « Apparence physique » examinées et écartées.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §5, Être humain : « Sens & perception → Vue ; Ouïe ; Odorat ; Goût ; Toucher & sensations » ; « Apparence & présentation personnelle → Apparence physique ; Coiffure & pilosité ; Présentation personnelle ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 立派, sens 1 « Magnifique », dont la raison renvoie à ce sens, et いい « Bon » sont arbitrés L. かわいい « Mignon » est en émotions › affection, sa fiche nommant l'affection. うるさい, sens 1 « Bruyant », est en sens et perception › ouïe. Le sens 2 de la même ENTRY, « Propre », est en entretien domestique › nettoyage.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que l'adjectif s'applique « à la beauté visuelle (paysage, personne) » ; l'exemple dit « de jolies fleurs sont écloses ». Le fondement réel est la « propriété générale » : la raison de D0066 parle d'« appréciation esthétique générale », ce qui revient au même sans employer la formule. Deux catégories ont été examinées. « Apparence physique » décrit une personne ; la fiche nomme aussi un paysage, et l'exemple des fleurs. « Vue » : la fiche dit « visuelle », mais la beauté est un jugement porté sur ce que l'on voit, non une qualité perçue comme l'est le bruit pour うるさい. Aucune catégorie ne décrit le sens. La raison tient.

#### `v_458_s1` · 有名 (ゆうめい) · « Célèbre » — **L**

- **Fiche source** (`n5_v_458`, adjectif en na) : traductions « Célèbre ; Renommé ; Connu ». Nuance : « Adjectif en na qualifiant une personne, un lieu ou une chose qui jouit d'une grande notoriété ou d'une popularité reconnue. » Exemple : « ここ は 有名 な まち です 。 » — « C'est une ville célèbre. »
- **État publié** : sens 1 sur 1 ; traduction « Célèbre » (Connu) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adjectif_na`.
- **Justification historique** : D1111 (lot 16) : « La notoriété est une caractéristique générale d'une personne, d'un lieu ou d'une chose, sans domaine thématique propre ; aucun axe d'A2-DIM ne la décrit, aucune dimension n'est donc portée. Addendum A5. »
- **Fondement réel** : « propriété générale » : la fiche nomme trois sortes de référents.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. Doctrine du lot 16 : un axe d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors.
- **Comparables examinés** : 便利 « Pratique », de la même famille source, est arbitré L, avec l'axe utilité. いい et 立派 sont arbitrés L. Aucun autre sens publié n'exprime la notoriété.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « une personne, un lieu ou une chose qui jouit d'une grande notoriété ou d'une popularité reconnue » ; l'exemple dit « c'est une ville célèbre ». Le fondement réel est la « propriété générale » : trois sortes de référents, nommées par la fiche, sans domaine commun. A2-L3 ne nomme pas la notoriété ; les médias, qui la produisent, ne la décrivent pas. D1111 relève aussi qu'aucun axe d'A2-DIM ne la porte : c'est exact, et aucune dimension n'est proposée. La raison tient.

#### `v_506_s2` · よく (よく) · « Bien » — **L**

- **Fiche source** (`n5_v_506`, adverbe) : traductions « Souvent ; Bien ; Fréquemment ». Nuance : « Adverbe exprimant la fréquence élevée d'une action (« souvent ») ou la réussite d'une action faite de manière approfondie ou satisfaisante (« bien / habilement », issu de l'adjectif *ii* / *yoi*). » Exemple : « わたし は よく えいが を み ます 。 » — « Je regarde souvent des films. »
- **État publié** : sens 2 sur 2 ; traduction « Bien » (Habilement) ; catégorie `null` ; type `propriete` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `adverbe`. Autres sens : « Souvent » (`temps › frequence › frequent`, `concept_abstrait`).
- **Justification historique** : D1374 (lot 21) : « « Bien, habilement » : la qualité ou la réussite d'une action, quelle qu'elle soit ; aucun domaine thématique propre, comme le sens « Bon » de いい (D0065). Addendum A5. »
- **Fondement réel** : « propriété générale », appliquée à une action ; « Habileté » examinée et écartée.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « propriété générale » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §5, Être humain : « Capacités & aptitudes → Aptitude ; Habileté ; Incapacité ». A9, §3.6 : l'`intensifieur` modifie le degré d'une propriété exprimée par un autre mot, « sans désigner lui-même la propriété, l'état ou l'action modifiés ». A2-DIM-v1, §5 : « réussite/échec » et « accomplissement » sont des familles « non promues à ce stade ».
- **Comparables examinés** : いい « Bon », auquel la raison renvoie, est arbitré L. 上手 « Doué » est en capacités et aptitudes › habileté : sa fiche qualifie la personne. ゆっくり, sens 2 « Tranquillement », est arbitré L. Le sens 1 de la même ENTRY, « Souvent », est en temps › fréquence.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que l'adverbe exprime aussi « la réussite d'une action faite de manière approfondie ou satisfaisante (bien / habilement) » ; l'exemple illustre le sens 1, et un ancien exemple dit « je le connais bien ». Le fondement réel est une appréciation générale, portée sur une action quelconque. « Habilement » évoque l'habileté, qui porte 上手 : mais 上手 qualifie une personne par son talent, et ce sens dit qu'une action est bien faite, y compris connaître, où il n'y a pas d'habileté. Aucune catégorie ne décrit le sens. La raison de D1374 tient, sur la fiche et non par le seul renvoi à いい. Relevés du criblage. Fonction (C7-c), vérifiée indépendamment : le mot désigne lui-même la qualité de l'action ; il ne modifie pas le degré d'une propriété exprimée par un autre mot, et n'est pas un `intensifieur`. Dimension : « réussite / échec » est une famille qu'A2-DIM n'a pas promue ; aucune n'est proposée.
- **Réserve** : Type : よく, sens 2, et ゆっくり sont typés `propriete`, だんだん `concept_abstrait` ; c'est le point de contrôle du volet 1 sur le type des adverbes de manière. Aucun changement n'est proposé.

### C · Notions générales de type `concept_abstrait` (3 cas)

#### `v_511_s1` · 問題 (もんだい) · « Problème » — **L**

- **Fiche source** (`n5_v_511`, nom) : traductions « Problème ; Question (d'examen) ; Sujet de discussion ; Affaire ». Nuance : « Nom désignant une question à résoudre (comme dans un test scolaire) ou un problème / différend qui pose une difficulté dans une situation. » Exemple : « この しけん の 問題 は むずかしい です 。 » — « Les problèmes de cet examen sont difficiles. »
- **État publié** : sens 1 sur 2 ; traduction « Problème » ; catégorie `null` ; type `concept_abstrait` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`. Autres sens : « Question (d'examen) » (`education_apprentissage › evaluation_scolaire › examens`, `information_contenu`).
- **Justification historique** : D1359 (lot 20) : « Un problème, une difficulté dans une situation : notion générale, sans domaine thématique propre. Addendum A5. »
- **Fondement réel** : aucun domaine : une difficulté se rencontre dans toute situation ; « Conflit » examiné et écarté.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §5, Relations sociales : « Amitié & relations interpersonnelles → Amitié ; Connaissance ; Voisinage ; Conflit ; Réconciliation ». A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. » A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».
- **Comparables examinés** : Le sens 2 de la même ENTRY, « Question (d'examen) », est en éducation › évaluation scolaire › examens. 意味, sens 2 « Intérêt », de la même famille source, est arbitré L. 本当 et 生活 sont arbitrés L, avec `concept_abstrait` pour type propre. 難しい « Difficile » porte l'axe difficulté.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le nom désigne aussi « un problème / différend qui pose une difficulté dans une situation » ; l'exemple illustre le sens 2, et un ancien exemple dit « il n'y a pas de gros problème à ce sujet ». Le fondement réel est l'absence de tout domaine : une difficulté se rencontre dans n'importe quelle situation. « Différend » évoque le conflit, que A2-L3 nomme sous les relations interpersonnelles ; mais la fiche le donne comme un cas de problème, non comme le sens. La raison de D1359 tient. Relevé du criblage, type (C3-0), vérifié indépendamment : un problème est un concept non matériel, qui n'est ni une information (comme la question d'examen du sens 2), ni un état, ni un événement ; `concept_abstrait` est ici le type propre.
- **Réserve** : La fiche dit que le problème « pose une difficulté », et A2-DIM a un axe facilité / difficulté, que portent 難しい et 大変. Je ne le propose pas : le nom désigne ce qui fait difficulté, il ne qualifie rien comme difficile ; l'axe ne décrit pas directement le sens. Je le signale.

#### `v_605_s1` · 他 (ほか) · « Autre » — **L**

- **Fiche source** (`n5_v_605`, nom) : traductions « Autre ; En plus ; Le reste ; En dehors de ». Nuance : « Nom / expression désignant ce qui est différent, additionnel ou extérieur à un élément donné (très utilisé dans la structure *hoka ni* en plus de / à part...). » Exemple : « ほか に なに か ります か 。 » — « Y a-t-il autre chose ? »
- **État publié** : sens 1 sur 1 ; traduction « Autre » (Le reste) ; catégorie `null` ; type `concept_abstrait` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`.
- **Justification historique** : D1427 (lot 22) : « L'altérité, ce qui est autre que l'élément donné : une notion générale, sans domaine thématique propre. Addendum A5. »
- **Fondement réel** : « identité / différence », élément hors hiérarchie (A2-L3 §6) ; « Reste » examiné et écarté.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « identité / différence » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §5, Nombres & quantification : « Totalité & partie → Totalité ; Partie ; Majorité / minorité ; Reste » ; « Proportions → Fraction ; Pourcentage ; Rapport ». A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. » A2-ST-v1, §4 : identité / différence, possibilité, nécessité et mesure « ne doivent pas être ajoutés à `semantic_type` simplement pour classifier un mot difficile ». Périmètre du volet 2, Q4 : si L peut être établi indépendamment d'une fonction non définie, le cas est classé normalement, et le chantier normatif de la fonction est référencé à part.
- **Comparables examinés** : 後, sens 3 « Le reste », est en nombres et quantification › totalité et partie › reste (D0953 : « ce qui reste d'un tout »), type `concept_abstrait`. 同じ « Même » et 違う, sens 1 « Être différent », sont arbitrés L, sur l'identité et la différence. 全部 « Tout » est en totalité.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « ce qui est différent, additionnel ou extérieur à un élément donné » ; l'exemple se traduit « y a-t-il autre chose ? ». Le fondement réel est nommé par l'architecture : c'est l'altérité, c'est-à-dire la différence, élément hors hiérarchie (« identité / différence »), comme pour 同じ et 違う. « Le reste » est une autre traduction publiée, et 後, sens 3, porte la catégorie du reste : je l'ai examinée. Le reste d'un tout est une partie ; la fiche de 他 ne parle d'aucun tout : elle dit ce qui n'est pas l'élément donné, en plus ou à part. La catégorie n'en décrirait qu'une traduction. La conclusion de D1427 tient. Relevés du criblage. Type (C3-0), vérifié indépendamment : l'altérité est un concept non matériel ; A2-ST (§4) rappelle que l'identité et la différence ne sont pas des types, mais le type dit ici la nature abstraite du référent, non la relation ; `concept_abstrait` n'est pas un type de secours. Fonction (C10-a) : D1428 refusait `alternative`, qui n'a toujours pas de définition normative ; le verdict n'en dépend pas.
- **Réserve** : Divergence signalée, sans verdict sur 後 : « Le reste » est catégorisé comme sens de 後 et n'est qu'une traduction, sans catégorie, pour 他. La question a été posée à l'arbitrage du 2026-10-08, qui confirme L : « Le reste » ne suffit pas à imposer la catégorie de 後, sens 3.

#### `v_664_s2` · 所 (ところ) · « Partie » — **L**

- **Fiche source** (`n5_v_664`, nom) : traductions « Endroit ; Lieu ; Place ; Partie ». Nuance : « Nom désignant un lieu, un endroit physique, ou un point/une partie spécifique d'une chose ou d'une situation. » Exemple : « ここ は きれいな 所 です ね 。 » — « C'est un endroit magnifique, n'est-ce pas ? »
- **État publié** : sens 2 sur 2 ; traduction « Partie » ; catégorie `null` ; type `concept_abstrait` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`. Autres sens : « Endroit » (`espace_proprietes_spatiales › position_localisation`, `lieu`).
- **Justification historique** : D1355 (lot 20) : « Un point ou une partie d'une chose ou d'une situation : notion générale, sans domaine thématique propre. Addendum A5. »
- **Fondement réel** : aucune catégorie ne décrit un point d'une chose ou d'une situation ; « Totalité & partie › Partie » examinée et écartée.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §5, Nombres & quantification : « Totalité & partie → Totalité ; Partie ; Majorité / minorité ; Reste » ; « Proportions → Fraction ; Pourcentage ; Rapport ». A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. » A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : Le sens 1 de la même ENTRY, « Endroit », est en position et localisation, type `lieu`. 半 et 半分 « Moitié » sont en nombres et quantification › proportions › fraction ; 全部 « Tout » en totalité ; 後, sens 3 « Le reste », en reste : des parts d'un tout. 問題 et 他 sont dans la même tranche.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le nom désigne aussi « un point/une partie spécifique d'une chose ou d'une situation » ; l'exemple illustre le sens 1. Le registre a une catégorie qui porte le mot de la traduction : « Totalité & partie › Partie ». Je l'ai examinée de près. Elle appartient à la quantification : la part d'un tout, comme la moitié ou le reste. La fiche dit « un point », un endroit précis d'une chose ou d'une situation, au sens où l'on parle d'un point d'un texte : ce n'est pas une quantité. Le sens prolonge le sens 1, un lieu, vers l'abstrait, et aucun domaine ne le décrit. Le fondement réel est cette absence, non la formule de D1355 (« notion générale ») ; la conclusion tient. Relevé du criblage, type (C3-0), vérifié indépendamment : un point d'une chose ou d'une situation est un concept non matériel ; ce n'est plus un `lieu` ; `concept_abstrait` est ici le type propre.
- **Réserve** : La traduction principale publiée, « Partie », est le second des deux mots de la fiche (« un point / une partie ») et porte le nom d'une catégorie de quantification qui ne convient pas. « Point » rendrait mieux le sens. Je le signale ; la traduction n'est pas l'objet de cet audit.

### D · L'objet générique (1 cas)

#### `v_684_s1` · 物 (もの) · « Chose » — **L**

- **Fiche source** (`n5_v_684`, nom) : traductions « Chose ; Objet ; Article ; Bien matériel ». Nuance : « Nom générique désignant un objet tangible, une chose matérielle, ou par extension une entité concrète (à distinguer des notions abstraites ou des personnes). » Exemple : « たいせつ な 物 を なくし まし た 。 » — « J'ai perdu une chose importante. »
- **État publié** : sens 1 sur 1 ; traduction « Chose » (Objet, Article) ; catégorie `null` ; type `objet_artefact` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `nom`.
- **Justification historique** : D1352 (lot 20) : « Une chose matérielle, quelle qu'elle soit : nom générique, sans domaine thématique propre. Addendum A5. »
- **Fondement réel** : « objet / artefact générique », élément hors hiérarchie (A2-L3 §6), à la lettre.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « objet / artefact générique » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §7, règle 5 : « un objet fonctionnel spécialisé suit son domaine fonctionnel, pas une racine "Objets" ».
- **Comparables examinés** : 時計 et カレンダー (C retenus), 荷物 et たばこ, sens 1 (L), sont les autres objets sans catégorie de l'inventaire : des objets spécialisés. 84 des 89 sens publiés de type `objet_artefact` portent une catégorie. Aucun autre sens publié ne désigne un objet quelconque.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit un « nom générique désignant un objet tangible, une chose matérielle, ou par extension une entité concrète » ; l'exemple dit « j'ai perdu une chose importante ». Le fondement réel est nommé par l'architecture, à la lettre : c'est l'« objet / artefact générique », premier élément de la liste hors hiérarchie. La règle 5 d'A2-L3, qui a conduit à ranger 時計 et カレンダー, vaut pour un objet spécialisé ; celui-ci est, par définition, l'objet sans spécialité. C'est le seul objet du corpus dont le `null` soit la réponse directe de l'architecture. La raison de D1352 (« nom générique ») tient.

### E · Cas singuliers (2 cas)

#### `v_521_s1` · たぶん (たぶん) · « Peut-être » — **L**

- **Fiche source** (`n5_v_521`, adverbe) : traductions « Peut-être ; Probablement ; Vraisemblablement ». Nuance : « Adverbe exprimant une probabilité ou une supposition de l'ordre de 70 à 80 % de chance qu'un fait se produise ou soit vrai. » Exemple : « あした は たぶん あめ が ふり ます 。 » — « Demain, il pleuvra peut-être. »
- **État publié** : sens 1 sur 1 ; traduction « Peut-être » (Probablement, Vraisemblablement) ; catégorie `null` ; type `null` ; dimensions `probabilite:probabilite` ; fonctions aucune ; relations aucune ; classe `adverbe`.
- **Justification historique** : D1432 (lot 22) : « La probabilité qu'un fait se produise ou soit vrai : une estimation du locuteur, sans domaine thématique. Addendum A5. »
- **Fondement réel** : « possibilité / nécessité », élément hors hiérarchie (A2-L3 §6) : une modalité, portée par une dimension.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « possibilité / nécessité » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-DIM-v1, §2 et §3 : « Modalité conceptuelle → Possibilité ↔ Impossibilité ; Nécessité ↔ Facultativité ; Probabilité ; Certitude ↔ Incertitude » ; « modalité conceptuelle ≠ modalité grammaticale ». Périmètre du volet 2, Q4 : si L peut être établi indépendamment d'une fonction non définie, le cas est classé normalement, et le chantier normatif de la fonction est référencé à part.
- **Comparables examinés** : ちょうど « Exactement », 違う sens 2 et 本当 « Vérité » sont arbitrés L, sans catégorie et avec un axe d'A2-DIM. 出来る, sens 1 « Pouvoir », porte l'axe possibilité et la catégorie de l'aptitude, sa fiche parlant de la capacité d'une personne.
- **Verdict** : **L**.
- **Motivation** : La fiche décrit « une probabilité ou une supposition de l'ordre de 70 à 80 % de chance qu'un fait se produise ou soit vrai » ; l'exemple dit « demain, il pleuvra peut-être ». Ce sens porte deux avertissements ; son `type-nul` est arbitré L et n'est pas rouvert : seul l'avertissement de catégorie est examiné ici. Le fondement réel est nommé par l'architecture : la probabilité est une modalité, de la famille « possibilité / nécessité » qu'A2-L3 place hors hiérarchie ; « Probabilités », sous les mathématiques, désigne une discipline. La raison de D1432 (« une estimation du locuteur, sans domaine thématique ») tient. Relevés du criblage. Dimension (C5-0), vérifiée indépendamment : A2-DIM a un axe « Probabilité », à pôle unique, dans la modalité conceptuelle ; la fiche dit « une probabilité » ; l'axe décrit directement le sens, et il est le seul à le faire : l'axe certitude / incertitude dirait le degré d'assurance du locuteur, que la fiche chiffre justement comme une probabilité. Fonction (C10-a) : D1434 refusait `modalite`, qui n'a toujours pas de définition normative ; A2-DIM distingue d'ailleurs la modalité conceptuelle de la modalité grammaticale ; le verdict n'en dépend pas.

#### `v_523_s2` · 出来る (できる) · « Être achevé / prêt » — **L**

- **Fiche source** (`n5_v_523`, verbe) : traductions « Pouvoir ; Être capable de ; Réussir ; Être achevé / prêt ». Nuance : « Verbe intransitif (groupe ichidan / ru) exprimant la capacité ou la possibilité physique/mentale de faire quelque chose (« savoir faire, être capable »), ou le fait qu'une chose soit terminée ou fabriquée. » Exemple : « わたし は にほんご が 出きる 。 » — « Je peux parler japonais (je suis capable de faire du japonais). »
- **État publié** : sens 2 sur 2 ; traduction « Être achevé / prêt » ; catégorie `null` ; type `resultat` ; dimensions aucune ; fonctions aucune ; relations aucune ; classe `verbe`. Autres sens : « Pouvoir » (`etre_humain › capacites_aptitudes › aptitude`, `etat`).
- **Justification historique** : D1317 (lot 20) : « Une chose terminée ou fabriquée : résultat général, sans domaine thématique propre. Addendum A5. »
- **Fondement réel** : aucune catégorie de l'achèvement ; « Début / fin » et « Fabrication » examinées et écartées.
- **Normes appliquées** : A5, §2 : `category: null` est permis « lorsqu'aucune catégorie sémantique primaire suffisamment pertinente n'existe » ; pour un sens lexical plein, « ce n'est jamais une valeur par défaut ni un fourre-tout ». Fondement vérifié sur la fiche : l'arbre d'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n'est pas tenue pour une preuve. A2-L3-v1, §5 : « Chronologie → Avant / après ; Début / fin ; Succession » (Temps) ; « Fabrication → Assemblage ; Usinage ; Fabrication » (Production & industrie). A2-ST-v1, §3 : « Résultat : entité ou état conceptualisé principalement comme l'aboutissement d'une action, d'un processus ou d'un événement » ; « Événement : occurrence conceptualisée comme quelque chose qui survient » ; « État : condition dans laquelle se trouve momentanément ou contextuellement une entité ». A2-DIM-v1, §5 : « réussite/échec » et « accomplissement » sont des familles « non promues à ce stade ». A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».
- **Comparables examinés** : 終わる « Finir » et 始まる « Commencer » sont en temps › chronologie › début et fin, type `evenement` : la fiche de 終わる parle d'« une action, un événement ou une période [qui] arrive à son terme ». 作る, sens 1 « Fabriquer », et なる « Devenir » sont arbitrés L. Le sens 1 de la même ENTRY, « Pouvoir », est en capacités et aptitudes › aptitude.
- **Verdict** : **L**.
- **Motivation** : La fiche dit que le verbe exprime aussi « le fait qu'une chose soit terminée ou fabriquée » ; l'exemple illustre le sens 1, et un ancien exemple dit « ce travail peut être fait d'ici demain ». Le fondement réel est l'absence de catégorie : A2-L3 ne nomme pas l'achèvement, et A2-DIM range l'« accomplissement » parmi les familles non promues. « Début / fin », qui porte 終わる, décrit le terme d'une action ou d'une période dans le temps ; ce sens dit qu'une chose existe, faite ou prête : son objet est le produit, non le moment. « Fabrication » est un domaine industriel, déjà écarté pour 作る. La conclusion de D1317 tient ; sa formule, « résultat général », n'est pas un élément de la liste hors hiérarchie. Relevé du criblage, type (C3-c), vérifié indépendamment : `resultat` ne se trouve sur aucun autre des 145 sens de verbes. A2-ST le définit comme « entité ou état conceptualisé principalement comme l'aboutissement d'une action, d'un processus ou d'un événement » : « être achevé, prêt » y répond exactement, mieux qu'`evenement` (rien ne survient) ou qu'`etat` (qui ne dirait pas l'aboutissement). Le couple est rare, non fautif ; il vient d'un choix arbitré au lot 20 (D1316).
- **Réserve** : Les lots 18 et 19 ont mis en nuance l'état qui résulte d'un événement (開く, 立つ, 座る) ; ici la fiche donne le résultat comme le sens lui-même, sans événement distinct : le traitement diffère parce que les fiches diffèrent. A2-DIM a un axe complet / incomplet : je ne le propose pas, la fiche parlant d'une chose faite ou prête, non de la complétude d'un tout.

## T7.7 Complétude de la tranche : contrôles reproductibles

Calculés par `a2-05-travail/audit-cat-t6.mjs`, qui écrit cette tranche et le contrôle de clôture. Le script s'arrête si l'un d'eux échoue. Commande : `node a2-05-travail/audit-cat-t6.mjs . docs/rapports/etape2-A2-05-audit-null.md`.

| Contrôle | Résultat |
|---|---|
| Les 11 identifiants des fiches sont exactement ceux du périmètre validé | oui, 11 distincts |
| Chacun porte un avertissement `categorie-nulle` de l'inventaire | oui |
| Chacun a exactement une décision de journal `categorie-nulle`, `validated`, sur ce sens | oui |
| Aucune raison ne contient une formule des familles déjà traitées | oui |
| Chaque sens a bien `category: null` dans les données publiées | oui |
| Aucun ne figure parmi les 109 `categorie-nulle` déjà arbitrés ; les 11 sont exactement les restants | oui |
| Chaque fiche porte un fondement réel, distinct de la formule historique | oui, 11 |
| Verdicts de la tranche | L = 11, F = 0, C = 0, N = 0 ; total 11 |
| Un verdict C ou F a une modification proposée, et seulement lui | oui |

## T7.8 Contrôle de clôture du volet 2

Calculé par le même script, sur `reconstruction/a2-04/avertissements-connus.json` et sur les fiches de ce rapport (titres de niveau 4 portant un identifiant de SENSE et un verdict). **Aucune donnée n'est lue pour être modifiée.**

### 1. Une fiche, et une seule, par avertissement

| Contrôle | Résultat |
|---|---|
| Avertissements de l'inventaire | 148 : 120 `categorie-nulle`, 27 `type-nul`, et 1 autre (`kanji-inconnu`, hors du volet 2) |
| Fiches d'audit au rapport | 147 : 120 `categorie-nulle`, 27 `type-nul` |
| Avertissements sans fiche | 0 |
| Fiches sans avertissement dans l'inventaire (aucun avertissement supplémentaire) | 0 |
| Couples `{ code, SENSE }` portant deux fiches | 0 |
| SENSE distincts concernés | 144 (trois portent les deux avertissements : `v_500_s2`, `v_521_s1`, `v_653_s1`) |

### 2. Un verdict unique par fiche, et la somme

| | L | F | C | N | Total |
|---|---|---|---|---|---|
| 27 `type-nul` | 24 | 1 | 2 | 0 | 27 |
| 120 `categorie-nulle` | 112 | 1 | 7 | 0 | 120 |
| **Volet 2** | 136 | 2 | 9 | 0 | 147 |

Chaque fiche porte un verdict et un seul, dans son titre. **L + F + C + N = 136 + 2 + 9 + 0 = 147.** **N = 0** : aucun cas n'a requis de chantier normatif.

### 3. Les verdicts antérieurement arbitrés sont conservés

Les 136 fiches des tranches 1 à 6 ont été recomptées et comparées, une à une, à la table des verdicts arbitrés que porte le script (les onze fiches non L, toutes les autres L) : **0 écart**. Cumul retrouvé : L = 125, F = 2, C = 9, N = 0. Le texte du rapport antérieur à cette tranche n'est pas touché par le script, qui ne fait qu'ajouter.

### 4. Liste consolidée des modifications retenues

| # | SENSE | Mot | Lot | Classement | Champ | De | Vers | Avertissements qui cesseraient | Arbitrée à la |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_500_s2` | また « Aussi » | 21 | F | `linguistic_functions.pragmatic_discourse` | `[]` | `["connecteur"]` | `type-nul` et `categorie-nulle` | tranches 1 et 2 |
| 2 | `v_65_s2` | 頭 « Esprit » | 01 | C | `semantic_type` | `null` | `propriete` | `type-nul` | tranche 1 |
| 3 | `v_696_s1` | 表 « Face » | 10 | C | `semantic_type` | `null` | `lieu` | `type-nul` | tranche 1 |
| 4 | `v_606_s1` | 皆 « Tout le monde » | 11 | C | `category` | `null` | `nombres_quantification › totalite_partie › totalite` | `categorie-nulle` | tranche 2 |
| 5 | `v_687_s1` | 皆さん « Tout le monde » | 01 | C | `category` | `null` | `nombres_quantification › totalite_partie › totalite` | `categorie-nulle` | tranche 2 |
| 6 | `v_528_s1` | 並ぶ « Faire la queue » | 18 | C | `category` | `null` | `espace_proprietes_spatiales › position_localisation` | `categorie-nulle` | tranche 4 |
| 7 | `v_671_s1` | 時計 « Horloge » | 05 | C | `category` | `null` | `temps` | `categorie-nulle` | tranche 6 |
| 8 | `v_287_s1` | カレンダー « Calendrier » | 13 | C | `category` | `null` | `temps › calendrier` | `categorie-nulle` | tranche 6 |
| 9 | `v_500_s1` | また « À nouveau » | 21 | C | `category` | `null` | `temps › chronologie › succession` | `categorie-nulle` | tranche 6 |
| 10 | `v_503_s1` | もう一度 « Encore une fois » | 21 | C | `category` | `null` | `temps › chronologie › succession` | `categorie-nulle` | tranche 6 |

**Avertissements corrigés et SENSE modifiés ne sont pas le même compte :**

| Mesure | Nombre |
|---|---|
| Verdicts F ou C (un par avertissement) | 11 : 2 F et 9 C |
| **Avertissements qui cesseraient** | **11** : 8 `categorie-nulle` et 3 `type-nul` |
| **SENSE réellement modifiés** | **10** (`v_500_s2` porte deux avertissements pour une seule modification) |
| ENTRY à rouvrir | 9 (また porte deux modifications, une par sens) |
| Lots d'origine concernés | 7 : 01, 05, 10, 11, 13, 18, 21 |
| Avertissements `categorie-nulle` et `type-nul` qui resteraient émis | 136 : 112 `categorie-nulle` et 24 `type-nul`, tous classés L |

Les deux F sont le même SENSE (`v_500_s2`) : la fonction `connecteur` y justifie directement l'absence de catégorie et de type, et les deux avertissements cesseraient sans que les `null` changent. Chaque catégorie proposée existe dans `data/registries/categories.json` ; chaque champ visé est bien `null` ou vide dans les données publiées. **Aucune de ces modifications n'est appliquée** : ni lot, ni journal, ni donnée, ni inventaire n'est touché, et aucune décision historique n'est réécrite.
