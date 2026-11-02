# Étape 2 · A2-05 · Volet 1 · Lot 3 — périmètre opérationnel de la tranche F (livraisons F1, F2)

**Date** : 2026-11-01
**Statut** : **proposition de périmètre opérationnel, non arbitrée.** Généré par `a2-05-travail/perimetre-v2.mjs`, à partir du découpage arbitré du lot 3, du registre de couverture, du résultat du criblage, de l'état publié, du journal et de la liste globale des corrections. **Aucune fiche source n'est ouverte, aucun sens n'est jugé, aucune décision lexicale n'est prise.**

**Autorisation** : arbitrage du 2026-11-01 (ChatGPT, par délégation ; relayé par l'utilisateur), qui autorise la clôture documentaire définitive de T9 : « **Je demande explicitement de lancer la préparation documentaire du bloc F, en proposition uniquement, avec examen préalable d'E5.** » ; « **Ne prendre aucune décision lexicale avant acceptation du périmètre et résolution des préalables nécessaires.** » ; « Ne pas encore ouvrir l'audit lexical du bloc F ni exécuter E5. »

## 1. Où se place F

**Lot 3 : 360 sens arbitrés sur 377 ; 17 restent.** **Bloc B : 148 sur 148.** (Registre de couverture, calculé.)

## 2. Les 17 sens

**17 sens, 15 ENTRY**, exactement les lignes F1, F2 du découpage arbitré (contrôle du script).

| N° | Sens | Mot | Traduction | Classe | Livraison | Catégorie publiée | Type publié | Fonctions | Règles du criblage |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_401_s1` | 何 | Quoi | pronom | F1 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 2 | `v_179_s1` | いくら | Combien | pronom | F1 | `economie_commerce › prix_valeur_economique › prix` | `null` | `interrogatif` | C4-0, C1-a |
| 3 | `v_343_s1` | どっち | Lequel (des deux) | pronom | F1 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 4 | `v_390_s1` | いかが | Comment (poli) | adverbe | F1 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 5 | `v_391_s1` | いつ | Quand | pronom | F1 | `temps` | `null` | `interrogatif` | C4-0 |
| 6 | `v_393_s1` | どう | Comment | adverbe | F1 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 7 | `v_394_s1` | どうして | Pourquoi | adverbe | F1 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 8 | `v_395_s1` | どこ | Où | pronom | F1 | `espace_proprietes_spatiales › position_localisation` | `null` | `interrogatif` | C4-0, C1-a |
| 9 | `v_396_s1` | どちら | Lequel (des deux) | pronom | F1 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 10 | `v_396_s2` | どちら | Où (poli) | pronom | F1 | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | `interrogatif` | C4-0, C1-a |
| 11 | `v_396_s3` | どちら | Qui (poli) | pronom | F1 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 12 | `v_397_s1` | どなた | Qui (poli) | pronom | F2 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 13 | `v_398_s1` | どの | Quel … | determinant | F2 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 14 | `v_399_s1` | どれ | Lequel | pronom | F2 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 15 | `v_400_s1` | なぜ | Pourquoi | adverbe | F2 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 16 | `v_402_s1` | 誰 | Qui | pronom | F2 | `null` | `null` | `interrogatif` | C2-0, C4-0 |
| 17 | `v_585_s1` | いくつ | Combien | pronom | F2 | `nombres_quantification` | `null` | `interrogatif` | C4-0, C1-a |

## 3. Axes et règles

**Axes** : C1, C2, C4 ; **3 règles**.

| Règle | Détection | Sens désignés |
|---|---|---|
| C1-a | même traduction principale dans deux ENTRY, catégories différentes | いくら, どこ, どちら (s2), いくつ |
| C2-0 | population imposée : `category: null` avec une fonction | 何, どっち, いかが, どう, どうして, どちら (s1), どちら (s3), どなた, どの, どれ, なぜ, 誰 |
| C4-0 | population imposée : `semantic_type: null` avec une fonction | 何, いくら, どっち, いかが, いつ, どう, どうして, どこ, どちら (s1), どちら (s2), どちら (s3), どなた, どの, どれ, なぜ, 誰, いくつ |

**Relevés du criblage, sens par sens** (sans jugement) :

- **`v_401_s1` 何** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_179_s1` いくら** : `C4-0` — semantic_type: null avec fonction (interrogatif) ; `C1-a` — même traduction principale « Combien », catégories différentes : v_179_s1 economie_commerce › prix_valeur_economique › prix | v_585_s1 nombres_quantification.
- **`v_343_s1` どっち** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_390_s1` いかが** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_391_s1` いつ** : `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_393_s1` どう** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_394_s1` どうして** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_395_s1` どこ** : `C4-0` — semantic_type: null avec fonction (interrogatif) ; `C1-a` — même traduction principale « Où », catégories différentes : v_395_s1 espace_proprietes_spatiales › position_localisation | v_396_s2 espace_proprietes_spatiales › direction_orientation › orientation.
- **`v_396_s1` どちら** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_396_s2` どちら** : `C4-0` — semantic_type: null avec fonction (interrogatif) ; `C1-a` — même traduction principale « Où », catégories différentes : v_395_s1 espace_proprietes_spatiales › position_localisation | v_396_s2 espace_proprietes_spatiales › direction_orientation › orientation.
- **`v_396_s3` どちら** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_397_s1` どなた** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_398_s1` どの** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_399_s1` どれ** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_400_s1` なぜ** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_402_s1` 誰** : `C2-0` — category: null avec fonction (interrogatif) ; `C4-0` — semantic_type: null avec fonction (interrogatif).
- **`v_585_s1` いくつ** : `C4-0` — semantic_type: null avec fonction (interrogatif) ; `C1-a` — même traduction principale « Combien », catégories différentes : v_179_s1 economie_commerce › prix_valeur_economique › prix | v_585_s1 nombres_quantification.

## 4. Comparables

**4.1 Sens nommés par les règles** (4) :

| Sens | Mot | Traduction | Catégorie | Type | Nommé à propos de | État |
|---|---|---|---|---|---|---|
| `v_585_s1` | いくつ | Combien | `nombres_quantification` | `null` | いくら | **F** |
| `v_396_s2` | どちら | Où (poli) | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | どこ | **F** |
| `v_395_s1` | どこ | Où | `espace_proprietes_spatiales › position_localisation` | `null` | どちら | **F** |
| `v_179_s1` | いくら | Combien | `economie_commerce › prix_valeur_economique › prix` | `null` | いくつ | **F** |

**4.2 Sens publiés des mêmes catégories de niveau 2** (46, ceux de F compris) :

| Sens | Mot | Traduction | Catégorie | Type | État |
|---|---|---|---|---|---|
| `v_179_s1` | いくら | Combien | `economie_commerce › prix_valeur_economique › prix` | `null` | **F** |
| `v_181_s2` | する | Coûter (pour un prix) | `economie_commerce › prix_valeur_economique › prix` | `propriete` | B4 (arbitrée) |
| `v_185_s1` | 安い | Bon marché | `economie_commerce › prix_valeur_economique › prix` | `propriete` | D1 (arbitrée) |
| `v_188_s2` | 高い | Cher | `economie_commerce › prix_valeur_economique › prix` | `propriete` | B4 (arbitrée) |
| `v_339_s1` | こちら | Par ici | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | D2 (arbitrée) |
| `v_340_s1` | そちら | Par là | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | D2 (arbitrée) |
| `v_345_s1` | 上 | Dessus | `espace_proprietes_spatiales › position_localisation › dessus_dessous` | `lieu` | hors des 377 et des 147 |
| `v_346_s1` | 中 | Intérieur | `espace_proprietes_spatiales › position_localisation › interieur_exterieur` | `lieu` | hors des 377 et des 147 |
| `v_347_s1` | 先 | Avant (plus loin) | `espace_proprietes_spatiales › position_localisation › devant_derriere` | `lieu` | E1 (arbitrée) |
| `v_348_s1` | 前 | Devant | `espace_proprietes_spatiales › position_localisation › devant_derriere` | `lieu` | E1 (arbitrée) |
| `v_349_s1` | 北 | Nord | `espace_proprietes_spatiales › direction_orientation › directions_cardinales` | `concept_abstrait` | A1 (arbitrée) |
| `v_350_s1` | 南 | Sud | `espace_proprietes_spatiales › direction_orientation › directions_cardinales` | `concept_abstrait` | A1 (arbitrée) |
| `v_351_s1` | 右 | Droite | `espace_proprietes_spatiales › direction_orientation › gauche_droite` | `lieu` | hors des 377 et des 147 |
| `v_352_s1` | 外 | Extérieur | `espace_proprietes_spatiales › position_localisation › interieur_exterieur` | `lieu` | hors des 377 et des 147 |
| `v_353_s1` | 左 | Gauche | `espace_proprietes_spatiales › direction_orientation › gauche_droite` | `lieu` | hors des 377 et des 147 |
| `v_354_s1` | 後ろ | Derrière | `espace_proprietes_spatiales › position_localisation › devant_derriere` | `lieu` | hors des 377 et des 147 |
| `v_355_s1` | 東 | Est | `espace_proprietes_spatiales › direction_orientation › directions_cardinales` | `concept_abstrait` | A1 (arbitrée) |
| `v_356_s1` | 横 | Côté | `espace_proprietes_spatiales › position_localisation` | `lieu` | hors des 377 et des 147 |
| `v_357_s1` | 西 | Ouest | `espace_proprietes_spatiales › direction_orientation › directions_cardinales` | `concept_abstrait` | A1 (arbitrée) |
| `v_363_s1` | キロ | Kilo (kilogramme) | `nombres_quantification` | `null` | volet 2 (147, arbitré) |
| `v_364_s1` | キログラム | Kilogramme | `nombres_quantification` | `null` | volet 2 (147, arbitré) |
| `v_391_s1` | いつ | Quand | `temps` | `null` | **F** |
| `v_392_s1` | そこ | Là | `espace_proprietes_spatiales › position_localisation` | `null` | D2 (arbitrée) |
| `v_395_s1` | どこ | Où | `espace_proprietes_spatiales › position_localisation` | `null` | **F** |
| `v_396_s2` | どちら | Où (poli) | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | **F** |
| `v_403_s1` | あそこ | Là-bas | `espace_proprietes_spatiales › position_localisation` | `null` | D2 (arbitrée) |
| `v_404_s1` | あちら | Là-bas (poli) | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | D2 (arbitrée) |
| `v_405_s1` | あっち | Par là-bas | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | D2 (arbitrée) |
| `v_408_s1` | ここ | Ici | `espace_proprietes_spatiales › position_localisation` | `null` | D3 (arbitrée) |
| `v_409_s1` | こっち | Par ici | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | D3 (arbitrée) |
| `v_414_s1` | そっち | Par là | `espace_proprietes_spatiales › direction_orientation › orientation` | `null` | D3 (arbitrée) |
| `v_419_s1` | 向こう | En face | `espace_proprietes_spatiales › position_localisation` | `lieu` | D1 (arbitrée) |
| `v_436_s1` | 古い | Vieux | `temps` | `propriete` | hors des 377 et des 147 |
| `v_453_s1` | 新しい | Nouveau | `temps` | `propriete` | hors des 377 et des 147 |
| `v_454_s1` | 早い | Tôt | `temps` | `propriete` | hors des 377 et des 147 |
| `v_483_s2` | 遅い | En retard | `temps` | `propriete` | B16 (arbitrée) |
| `v_528_s2` | 並ぶ | Être aligné | `espace_proprietes_spatiales › position_localisation` | `etat` | B7 (arbitrée) |
| `v_529_s1` | 並べる | Aligner | `espace_proprietes_spatiales › position_localisation` | `action` | B7 (arbitrée) |
| `v_555_s1` | 曲がる | Tourner | `espace_proprietes_spatiales › direction_orientation › orientation` | `action` | hors des 377 et des 147 |
| `v_571_s1` | 置く | Poser | `espace_proprietes_spatiales › position_localisation` | `action` | B8 (arbitrée) |
| `v_585_s1` | いくつ | Combien | `nombres_quantification` | `null` | **F** |
| `v_611_s1` | グラム | Gramme | `nombres_quantification` | `null` | volet 2 (147, arbitré) |
| `v_630_s1` | 下 | Dessous | `espace_proprietes_spatiales › position_localisation › dessus_dessous` | `lieu` | hors des 377 et des 147 |
| `v_663_s2` | 後 | Derrière | `espace_proprietes_spatiales › position_localisation › devant_derriere` | `lieu` | B8 (arbitrée) |
| `v_664_s1` | 所 | Endroit | `espace_proprietes_spatiales › position_localisation` | `lieu` | hors des 377 et des 147 |
| `v_696_s1` | 表 | Face | `espace_proprietes_spatiales › position_localisation › devant_derriere` | `null` | volet 2 (147, arbitré) |

**4.3 Corrections retenues, non appliquées, sur les comparables** (12 ; hors des ENTRY de F, dont les corrections sont au §6.1) : la valeur publiée est celle des données ; la valeur retenue n'est pas appliquée.

| Sens | Mot | Correction | Unité | Champ | Valeur publiée | Valeur retenue, non appliquée | Provenance | État |
|---|---|---|---|---|---|---|---|---|
| `v_339_s1` | こちら | V2-124 | `v_339_s1` | `nuance` (sens 1) | « Forme polie de こっち : こちらへどうぞ, par ici, je vous prie. » | « こちらへどうぞ : par ici, je vous prie. », sans le renvoi à こっち. | bilan du volet 2, §8.20 | D2 (arbitrée) |
| `v_340_s1` | そちら | V2-126 | `v_340_s1` | `nuance` (sens 1) | « Forme polie de そっち : une direction ou un endroit proche de l'interlocuteur. » | « Une direction ou un endroit proche de l'interlocuteur. », sans le renvoi à そっち. | bilan du volet 2, §8.20 | D2 (arbitrée) |
| `v_346_s1` | 中 | V2-111 | `v_346` | `nuance` (ENTRY) | « Avec の et に : 箱の中に, dans la boîte. Lu ちゅう ou じゅう, 〜中 est un suffixe, une autre unité. » | « Avec の et に : 箱の中に, dans la boîte. », sans la phrase sur 〜中. | bilan du volet 2, §8.18 | hors des 377 et des 147 |
| `v_347_s1` | 先 | V2-116 | `v_347_s1` | `nuance` (sens 1) | « この先 : plus loin ; ペンの先 : la pointe du stylo. » | « L'avant ; l'extrémité d'une chose. », d'après la fiche, sans exemple japonais. | bilan du volet 2, §8.19 | E1 (arbitrée) |
| `v_349_s1` | 北 | V2-118 | `v_349` | `nuance` (ENTRY) | « Exemple : 北口, la sortie nord. » | « Exemple : 北の方, vers le nord. », la forme de l'ancien exemple. | bilan du volet 2, §8.19 | A1 (arbitrée) |
| `v_350_s1` | 南 | V2-119 | `v_350` | `nuance` (ENTRY) | « Exemple : 南口, la sortie sud. » | « Exemple : 南の方, vers le sud. », la forme de l'ancien exemple. | bilan du volet 2, §8.19 | A1 (arbitrée) |
| `v_356_s1` | 横 | V2-112 | `v_356` | `nuance` (ENTRY) | « L'espace juste à côté ou le flanc : 横に置く ; aussi le sens horizontal, par opposition à 縦. » | « L'espace juste à côté ou le flanc : 横に置く ; aussi le sens horizontal. », sans le renvoi à 縦. | bilan du volet 2, §8.18 | hors des 377 et des 147 |
| `v_404_s1` | あちら | V2-127 | `v_404_s1` | `nuance` (sens 1) | « Forme polie d'あそこ et d'あっち. » | « Forme polie d'あそこ. », sans le renvoi à あっち. | bilan du volet 2, §8.20 | D2 (arbitrée) |
| `v_453_s1` | 新しい | V2-161 | `v_453` | `nuance` (ENTRY) | « Ce qui vient d'être acquis ou fabriqué, ou qui est récent. Contraire : 古い. » | « Ce qui vient d'être acquis ou fabriqué, ou qui est récent. Contraire : ふるい. », le contraire que la fiche nomme, transcrit en kana ; le reste de la nuance est conservé intégralement. | bilan du volet 2, §8.29 | hors des 377 et des 147 |
| `v_630_s1` | 下 | V2-114 | `v_630` | `nuance` (ENTRY) | « Avec に : 机の下に, sous le bureau. » | « Avec に : つくえの下に, sous le bureau. », la graphie de l'exemple de la fiche. | bilan du volet 2, §8.18 | hors des 377 et des 147 |
| `v_696_s1` | 表 | modification n°3 du volet 2 | `v_696_s1` | `semantic_type` | `null` | `lieu` | bilan du volet 2, §2 | volet 2 (147, arbitré) |
| `v_696_s1` | 表 | V2-115 | `v_696` | `nuance` (ENTRY) | « Le côté visible, la face avant, le recto, l'extérieur d'un bâtiment ; contraire : 裏 (l'envers). Lu ひょう, 表 (tableau) est un autre mot. » | « Le côté visible, la face avant, le recto, l'extérieur d'un bâtiment ; contraire : 裏 (l'envers). », sans la phrase sur 表 lu ひょう. | bilan du volet 2, §8.18 | volet 2 (147, arbitré) |

## 5. Décisions antérieures

| ENTRY | Mot | Source canonique | Décisions (identifiant, nature, champ) |
|---|---|---|---|
| `v_401` | 何 | `n5_v_401` | D0043 (decision, readings) ; D0073 (type-nul, sens 1 · semantic_type) |
| `v_179` | いくら | `n5_v_179` | D0371 (decision, tags) ; D0372 (decision, grammatical_class) ; D0373 (type-nul, sens 1 · semantic_type) ; D0374 (abandon, senses) |
| `v_343` | どっち | `n5_v_343` | D0696 (type-nul, sens 1 · semantic_type) ; D0697 (decision, grammatical_class) ; D0698 (decision, senses) ; D0699 (abandon, senses) ; D0700 (decision, tags) |
| `v_390` | いかが | `n5_v_390` | D0718 (type-nul, sens 1 · semantic_type) ; D0719 (abandon, senses) |
| `v_391` | いつ | `n5_v_391` | D0712 (type-nul, sens 1 · semantic_type) ; D0713 (decision, grammatical_class) |
| `v_393` | どう | `n5_v_393` | D0705 (type-nul, sens 1 · semantic_type) ; D0706 (decision, senses) ; D0707 (abandon, senses) |
| `v_394` | どうして | `n5_v_394` | D0716 (type-nul, sens 1 · semantic_type) ; D0717 (abandon, senses) |
| `v_395` | どこ | `n5_v_395` | D0652 (type-nul, sens 1 · semantic_type) ; D0653 (abandon, senses) |
| `v_396` | どちら | `n5_v_396` | D0681 (type-nul, sens 1 · semantic_type) ; D0682 (type-nul, sens 2 · semantic_type) ; D0683 (type-nul, sens 3 · semantic_type) ; D0684 (decision, senses) ; D0685 (abandon, senses) |
| `v_397` | どなた | `n5_v_397` | D0710 (type-nul, sens 1 · semantic_type) ; D0711 (abandon, senses) |
| `v_398` | どの | `n5_v_398` | D0664 (type-nul, sens 1 · semantic_type) ; D0665 (decision, grammatical_class) ; D0666 (abandon, senses) |
| `v_399` | どれ | `n5_v_399` | D0641 (type-nul, sens 1 · semantic_type) ; D0642 (abandon, senses) |
| `v_400` | なぜ | `n5_v_400` | D0714 (type-nul, sens 1 · semantic_type) ; D0715 (abandon, senses) |
| `v_402` | 誰 | `n5_v_402` | D0708 (type-nul, sens 1 · semantic_type) ; D0709 (abandon, senses) |
| `v_585` | いくつ | `n5_v_585` | D0720 (type-nul, sens 1 · semantic_type) ; D0721 (decision, grammatical_class) ; D0722 (decision, senses) ; D0723 (abandon, senses) |

## 6. Risques

**6.1 Détectés automatiquement** (faits relevés dans les données, sans jugement) :

- **Mots d'un seul caractère** : 何, 誰 ; les décisions d'autres ENTRY qui les citent seront listées pour lecture, jamais comptées.
- **Fonctions publiées** sur 17 sens : 何 (interrogatif), いくら (interrogatif), どっち (interrogatif), いかが (interrogatif), いつ (interrogatif), どう (interrogatif), どうして (interrogatif), どこ (interrogatif), どちら (interrogatif), どちら (interrogatif), どちら (interrogatif), どなた (interrogatif), どの (interrogatif), どれ (interrogatif), なぜ (interrogatif), 誰 (interrogatif), いくつ (interrogatif).
- **ENTRY portant plusieurs sens de la tranche** : どちら ; chaque sens est examiné séparément, l'ENTRY est comptée une fois.
- **Relevés du criblage dont une valeur est déjà corrigée** (correction retenue, non appliquée ; relevés conservés tels quels, non recalculés, sans jugement ; détail des valeurs au §4.3) : いくら `C1-a` : いくつ (`v_585_s1`, V2-141, `nuance` (sens 1), autre champ que le critère, nommé par le relevé) ; どこ `C1-a` : どちら (`v_396_s2`, V2-134, `nuance` (sens 2), autre champ que le critère, nommé par le relevé) ; どこ `C1-a` : どちら (`v_396_s2`, V2-136, `nuance` (ENTRY), autre champ que le critère, nommé par le relevé).
- **Décisions de lecture ou de graphie** sur 何 : hors des champs examinés, non rouvertes.
- **Corrections retenues sur ces ENTRY** (non rouvertes, non appliquées) : V2-139, V2-140, V2-133, V2-134, V2-135, V2-136, V2-137, V2-138, V2-141.

**6.2 Autres livraisons concernées** (24, lues sans être jugées) : する (B4 (arbitrée)), 安い (D1 (arbitrée)), 高い (B4 (arbitrée)), こちら (D2 (arbitrée)), そちら (D2 (arbitrée)), 先 (E1 (arbitrée)), 前 (E1 (arbitrée)), 北 (A1 (arbitrée)), 南 (A1 (arbitrée)), 東 (A1 (arbitrée)), 西 (A1 (arbitrée)), そこ (D2 (arbitrée)), あそこ (D2 (arbitrée)), あちら (D2 (arbitrée)), あっち (D2 (arbitrée)), ここ (D3 (arbitrée)), こっち (D3 (arbitrée)), そっち (D3 (arbitrée)), 向こう (D1 (arbitrée)), 遅い (B16 (arbitrée)), 並ぶ (B7 (arbitrée)), 並べる (B7 (arbitrée)), 置く (B8 (arbitrée)), 後 (B8 (arbitrée)).

**6.3 Autres sens des mêmes ENTRY** (hors du périmètre) : aucun.

**6.4 Risques relevés par le rédacteur** :

- **Portée de ce document : un périmètre préparatoire, non le « périmètre opérationnel de contrôle » d'E5.** La séquence arbitrée pour E5 place ce périmètre opérationnel **après** l'adoption de l'addendum (proposition d'addendum, §7 : « adoption explicite » ; puis « préparation et validation d'un périmètre opérationnel de contrôle » ; puis examen et recherche d'omissions). Celui-ci est produit **avant** toute adoption : il fixe une population, des bornes et des frontières, et ne peut citer aucune définition. Le titre et le statut viennent du générateur v2, non modifié. **La question 3 du §8, écrite par le générateur, n'a pas d'objet ici** : l'examen des 17 sens reste interdit tant qu'E5 n'est pas résolu. Le dossier `etape2-A2-05-bloc-F-analyse-E5.md` traite ce point et l'ordre des opérations.
- **Bornes** (découpage arbitré du 2026-10-12, §5 et §6) : **un seul segment contigu, lignes 361 à 377, les dernières du découpage** : **F1**, lignes 361 à 371 (11 sens, 9 ENTRY : 何, いくら, どっち, いかが, いつ, どう, どうして, どこ, どちら s1, s2 et s3) ; **F2**, lignes 372 à 377 (6 sens, 6 ENTRY : どなた, どの, どれ, なぜ, 誰, いくつ). Le segment est bordé par E3 (ligne 360).
- **Thème et justification du regroupement.** **Unité normative** : le bloc F réunit tous les sens publiés qui portent `interrogatif`, et eux seuls ; sa raison d'être est la dépendance à E5, non un champ lexical. **F1 et F2 ne sont pas deux thèmes** : la coupure suit l'ordre du découpage et la taille des livraisons, non le contenu. Elle sépare des mots que les fiches rapprochent : どうして (F1) et なぜ (F2), « Pourquoi » ; いくら (F1) et いくつ (F2), « Combien » ; どちら s3 (F1), どなた et 誰 (F2), l'identité d'une personne ; どっち et どちら s1 (F1), どの et どれ (F2), le choix. Le registre des tranches porte déjà une seule tranche `F` (F1, F2).
- **Ce que les fiches disent demander** (relevé du dossier E5 et de la proposition, partie II, §2 ; sans jugement sur aucun sens) : l'identité d'une personne : 誰, どなた, どちら ; une chose : 何 ; un emplacement ou une direction : どこ, どちら ; le moment : いつ ; la manière, l'état ou l'avis : どう, いかが ; la cause : どうして, なぜ ; une quantité ou un âge : いくつ ; un prix : いくら ; un choix : どれ, どの, どっち, どちら.
- **Motifs de suspension historiques** (cités, non repris à mon compte) : découpage, §7.3 : « le bloc F ne peut pas être audité avant qu'un addendum la fixe » ; dossier E5, §1 : « ils ne peuvent recevoir ni « conforme » ni « écart » avant elle » ; registre des tranches : « suspendue au préalable E5 » ; séquence arbitrée : « ni examen du bloc F ni recherche d'omissions avant son adoption et l'accord sur un périmètre opérationnel ».
- **État publié** (relevé sans jugement) : **fonctions** : `interrogatif` seule, sur les 17 sens, sans cumul. **Types** : `semantic_type: null` sur les 17, par 17 décisions `type-nul` (D0073, D0373, D0641, D0652, D0664, D0681, D0682, D0683, D0696, D0705, D0708, D0710, D0712, D0714, D0716, D0718, D0720). **Catégories** : 5 sens en ont une (いくら, いつ, どこ, どちら s2, いくつ), 12 n'en ont pas. **Classes** : `pronom` 12, `adverbe` 4, `determinant` 1. **Aucune décision de journal ne porte sur `linguistic_functions`** pour ces ENTRY : A9, §1, parle d'un « sens implicite ».
- **Inclusions, exclusions, reports** (aucun ajout, retrait ni déplacement proposé) : (a) **les 17 sens de F1 et F2, tels quels** ; (b) **誰か reste hors du périmètre** : il n'est pas candidat des 377, D0724 refuse la fonction, et il relève de la recherche d'omissions, non du contrôle des 17 ; (c) **聞く et 質問**, arbitrés en B2 et B3, ne sont pas rouverts ; (d) **aucun sens n'est ajouté par anticipation** : une omission découverte plus tard « n'est pas ajoutée d'office aux 377 candidats ».
- **Frontières** : **recherche d'omissions** : séparée, non lancée, aucun filtre exécuté ; **volet 3** (G1 à G7) : fermé ; **HP-1 à HP-4** : 右 et 左 figurent ici parmi les comparables de catégorie (§7), lus sans être examinés, leur cadre restant à proposer ; **sens arbitrés cités au §6.2** : comparables, non rouverts ; **grammaire** : les marques de l'interrogation sont hors de la proposition d'addendum (§4, point 5).
- **Décisions et normes applicables, lues sans être rouvertes** : A2-LING (§4 : la fonction n'y est que nommée) ; A7 (§3, point 3) ; A9 (§1, §2, §3.3, frontière 1, §6) ; A5, A6 ; doctrine du lot 20 ; axe C4 du périmètre de la cohérence rétroactive ; D0724 (誰か) ; D0372, D0665, D0697, D0713 et D0721 (classe) ; les 17 décisions `type-nul`. **La proposition d'addendum (révision 3) n'est pas normative** : elle est citée, jamais appliquée.
- **Corrections retenues** (non rouvertes, non appliquées) : **neuf, toutes de `nuance`** : V2-133 à V2-136 (どちら), V2-137 (どの), V2-138 (どれ), V2-139 (いかが), V2-140 (どう), V2-141 (いくつ). Aucune V1-n sur ces ENTRY. Les nuances publiées ne sont donc pas celles qui resteront : l'examen devra lire les deux.
- **Collisions de noms** : « E5 » est le préalable normatif, sans rapport avec les livraisons E1 à E3 du bloc E. « F1 » et « F2 » sont des livraisons, sans rapport avec les fonctions ni avec les filtres de la proposition.
- **Chantiers fermés** : E5 n'est pas exécuté ; QC-1, QC-2, G1 à G7, HP-1 à HP-4 restent fermés ; le statut « planifiée » des tranches et les anomalies d'outillage ne sont pas traités ; aucune correction nouvelle n'est proposée ; les 204 corrections retenues ne sont pas appliquées.

## 7. Contrôles

| Contrôle | Résultat |
|---|---|
| Sens de la tranche, exactement ceux du découpage | 17 sens, 17 distincts |
| Registre de couverture | 360 arbitrés, 17 restants ; sens de la tranche : tous restants |
| Manifeste d'empreintes | 45 rapports identiques |
| Sens du lot 1 du volet 1 (rapport arbitré le 2026-10-08) | 19 lus ; parmi les comparables : aucun |
| Corrections retenues lues dans le bilan | 204 (10 modifications du volet 2, 29 V1-n, 165 V2-n) ; sur les comparables (§4.3) : 12 |
| Décisions lues | 42, toutes validées, une ENTRY comptée une fois |
| Vérifications hors périmètre (ひらがな, 漢字, 右, 左) parmi les comparables | 右, 左 |
| Comparables du bloc F | aucun |

## 8. Questions

1. Le périmètre de F est-il accepté, sans ajout ni retrait ?
2. Les comparables et les risques conviennent-ils ?
3. L'autorisation d'examiner F, seule.

