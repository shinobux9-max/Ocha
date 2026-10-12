# Étape 2 · A2-05 · Volet 1 · Criblage de cohérence — résultat

**Date** : 2026-10-07
**Statut (mis à jour le 2026-10-12)** : **criblage validé et terminé** (443 sens candidats, 381 non-candidats, échantillon de validation 2 propre). Le texte d'origine suit.
**Statut** : **résultat du temps 1 du volet 1 (criblage exhaustif), livré pour relecture.** Aucun candidat n'est examiné individuellement, aucun écart n'est qualifié, aucune donnée, aucun registre, aucun snapshot et aucune décision n'est modifié.
**Périmètre appliqué** : `docs/rapports/etape2-A2-05-perimetre-coherence.md`, validé le 2026-10-07.
**État du dépôt** : `ocha-v2` et `origin/ocha-v2` à `5a8687b063fd2fca7c343d544aff040709bc5ec8` ; données publiées de ce commit.

---

## 1. Ce qui a été fait, et ce qui ne l'a pas été

**Fait** :

- le criblage par script des 824 SENSE publiés (684 ENTRY) et des 1613 décisions du journal, sur les dix axes C1 à C10 ;
- la constitution des familles de sens comparables (annexes C et D) et de la liste des candidats (annexes A et B) ;
- l'inclusion d'office des populations imposées : les 95 `concept_abstrait`, les 55 sens de C2, les 71 sens de C4, les sens portant une dimension, et les points réservés par les lots ;
- trois échantillons de contrôle des non-candidats (§6) : un échantillon de développement, puis deux échantillons de validation indépendants ; les deux premiers ont conduit à réviser le criblage et à repasser toute la population.

**Non fait, conformément à la consigne** : l'audit individuel des 147 `null` ; l'examen individuel des 95 `concept_abstrait` et des autres candidats ; les contrôles G1 à G7 ; toute modification.

**Ce que signifie « candidat »** : un sens que le criblage désigne pour un examen individuel ultérieur. Ce n'est pas un écart. Inversement, d'un sens non candidat, ce rapport dit seulement : **aucun écart détecté par le criblage**.

## 2. Population examinée par axe

| Axe | Population | Effectif |
|---|---|---|
| C1 | sens à catégorie non nulle | 649 |
| C2 | `category: null` avec fonction | 55 |
| C3 | sens à type non nul | 726, dont 95 `concept_abstrait` |
| C4 | `semantic_type: null` avec fonction | 71 |
| C5 | sens portant une dimension ; et tous les sens sans dimension, pour la règle lexicale | 13 ; 811 |
| C6 | liens publiés ; décisions inscrivant une relation candidate | 22 liens sur 21 sens ; 20 décisions |
| C7 | sens portant une fonction ; et tous les sens, pour les règles lexicales | 94 ; 824 |
| C8 | porteurs de tag | 42 ENTRY et 3 SENSE, soit 45 sens concernés |
| C9 | décisions citant `A2-GLOBAL` ; citations de section d'un snapshot | 8 ; 33 |
| C10 | décisions citant un snapshot ou A5, A6, A7, A9 | 431 |

Ces effectifs sont ceux du périmètre validé.

## 3. Règles de détection utilisées

Chaque règle est appliquée par script à toute sa population. La colonne « Nature » dit sur quoi repose la détection.

| Règle | Axe | Nature | Détection | Sens candidats |
|---|---|---|---|---|
| C1-a | C1 | comparative | Même traduction principale (casse, ponctuation et parenthèses neutralisées) dans deux ENTRY différentes, avec des catégories différentes (dont `null`). Tous les sens du groupe. | 46 |
| C1-b | C1 | comparative | Famille source (ancienne catégorie / sous-catégorie de la fiche) d'au moins 5 sens catégorisés, dont un niveau 1 réunit 70 % ou plus : les sens d'un autre niveau 1. | 19 |
| C1-g | C1 | comparative, **ajoutée après l’échantillon de développement** | Famille source d'au moins 2 sens catégorisés : le sens qui est seul à porter son niveau 1. | 60 |
| C1-h | C1 | comparative, **ajoutée après l’échantillon de validation 1** | Dans une même famille source, même classe et même type : quand un sens sans catégorie ni fonction côtoie des sens catégorisés, ces derniers. | 69 |
| C1-d | C1 | comparative | Deux sens reliés par une relation publiée, de niveaux 1 différents. Les deux sens. | 2 |
| C1-f | C1 | propagation, **ajoutée après l’échantillon de développement** | Catégorie complète dont la moitié au moins des sens est déjà candidate sur C1 : ses autres sens, pour que la famille soit examinée entière. | 26 |
| C2-0 | C2 | population imposée | `category: null` avec une fonction linguistique. Tous (périmètre, C2). | 55 |
| C3-0 | C3 | population imposée | Type `concept_abstrait`. Tous (arbitrage R2). | 95 |
| C3-b | C3 | comparative | Même traduction principale dans deux ENTRY différentes, avec des types différents. Tous les sens du groupe. | 15 |
| C3-c | C3 | comparative | Couple classe grammaticale × type atypique : 3 sens au plus, et moins de 2 % des sens typés de la classe. | 5 |
| C3-d | C3 | comparative | Catégorie complète d'au moins 5 sens typés, dont un type réunit 70 % ou plus : les sens d'un autre type. | 13 |
| C3-e | C3 | comparative | Deux sens reliés par une relation publiée, de types différents. Les deux sens. | 8 |
| C4-0 | C4 | population imposée | `semantic_type: null` avec une fonction linguistique. Tous (périmètre, C4). | 71 |
| C5-0 | C5 | population imposée | Sens qui porte une dimension. Tous. | 13 |
| C5-b | C5 | lexicale | Sens sans dimension dont la traduction principale ou une alternative contient un terme de pôle d'A2-DIM (lexique en annexe F). | 5 |
| C6-a | C6 | mécanique | Lien publié dont le type est absent du registre, la cible inexistante, noté des deux côtés (I12), ou transitif entre non-verbes. | 0 |
| C6-b | C6 | mécanique | Relation inscrite comme candidate au journal (lots 18 à 24) alors qu'aucun lien publié ne touche l'ENTRY. | 0 |
| C7-b | C7 | lexicale et datée | Sens sans `deictique`, décidé aux lots 0 à 10 (avant A7), dont une traduction contient un terme déictique (lexique en annexe F). | 5 |
| C7-c | C7 | lexicale et datée | Sens sans l'une des six fonctions d'A9, décidé aux lots 0 à 22 (avant A9), dont une traduction contient un terme de cette fonction (lexique en annexe F). | 47 |
| C7-d | C7 | comparative | Même traduction principale dans deux ENTRY différentes, avec des fonctions différentes. | 8 |
| C7-e | C7 | datée | Fonction posée avant l'addendum qui la définit (`deictique` avant A7 ; fonctions d'A9 avant A9). | 1 |
| C8-a | C8 | datée | Tag porté par une ENTRY ou un SENSE décidé au lot 0 ou au lot 01, avant la formalisation du critère (révision du lot 02). | 7 |
| C8-b | C8 | comparative | Dans une même catégorie complète, un tag gardé pour un sens et le même tag, candidat hérité, écarté pour un autre. Les deux côtés. | 22 |
| C8-c | C8 | mécanique, **ajoutée après l’échantillon de validation 1** | Tag porté par une ENTRY ou un SENSE dont l’entrée n’a aucune décision de journal sur le champ `tags`. | 27 |
| C9-a | C9 | mécanique | Citation d'une section de snapshot introuvable, ou citation d'A2-GLOBAL §4.4 dont l'élément invoqué n'est pas, tel quel, dans la liste. | 1 |
| C10-a | C10 | lexicale | Raison de journal touchant une couche, qui invoque l'absence d'une définition ou renvoie à une étape ultérieure (« en attente », « réservé », « à revoir », « audit A2-05 », « passe finale », « 5.16 »). | 49 |
| RES | — | population imposée | Point déjà réservé à A2-05 par un lot (périmètre du volet 1, §4). | 30 |

**Deux notions à lire avec la règle** :

- **Famille source** : les fiches sources portent une ancienne catégorie et une ancienne sous-catégorie (par exemple `corps_sante / corps`). Ce classement n'a aucune valeur normative ; il sert seulement à rapprocher des sens que les sources rangeaient ensemble. Il y a 252 familles (annexe C).
- **Seuils** (5 sens, 70 %, 2 %, la moitié) : ce sont des choix de criblage, non des normes. Ils fixent ce que le script remonte ; l'échantillon de contrôle sert à les éprouver.

**Règles sans candidat** : C6-a et C6-b n'ont rien remonté (§5).

**Règles ajoutées après lecture** : quatre règles (C1-f, C1-g, C1-h, C8-c) et dix points réservés viennent des échantillons de contrôle (§6). Les règles d'origine n'ont pas été modifiées.

## 4. Candidats obtenus

**443 sens candidats** sur 824, et **381 non-candidats**.

| Axe | Sens candidats |
|---|---|
| C1 | 195 |
| C2 | 55 |
| C3 | 130 |
| C4 | 71 |
| C5 | 18 |
| C6 | 0 |
| C7 | 68 |
| C8 | 44 |
| C9 | 1 |
| C10 | 49 |

Un sens peut être candidat sur plusieurs axes : la somme dépasse le total.

- **122** sens ne sont candidats que par une population imposée (C2, C3 `concept_abstrait`, C4, dimension posée) ; **321** le sont par au moins une règle de détection ou un point réservé.
- **61** candidats sont aussi des sens des 147 `null` (144 sens distincts). Pour eux, le `null` lui-même est audité au volet 2 ; le volet 1 n'examine que les autres couches, et **un même cas n'est audité individuellement qu'une fois**.

La liste complète est en annexe A ; le détail de chaque détection, en annexe B.

## 5. Constats automatiques

Ces constats sont établis par le script seul. Ils ne demandent aucune lecture individuelle.

**Relations (C6).** Les 22 liens publiés ont un type présent au registre et une cible existante ; aucun n'est noté des deux côtés (I12) ; les liens transitifs relient des verbes. Anomalies mécaniques : 0. 20 liens relient deux sens de même catégorie complète, 18 deux sens de même type ; les autres sont candidats (C1-d, C3-e). Les 20 décisions qui inscrivaient une relation candidate (lots 18 à 24) portent toutes sur une ENTRY qu'un lien publié touche aujourd'hui.

**Citations (C9).** 33 raisons de journal citent une section d'un snapshot : 8 citent `A2-GLOBAL` §4.4, 25 citent `A2-LING` §5. Toutes ces sections existent. Des 8 citations du §4.4, 7 invoquent un élément qui figure tel quel dans la liste (« propriété générale », « personne générique »). D0069 (« Perdre (un objet) ») parle d'« action générale », alors que la liste porte « action générique » : c'est le seul candidat de C9. Aucune raison ne cite `A2-L3`, `A2-ST`, `A2-DIM` ni `A2-REL` avec un numéro de section : ces citations-là ne peuvent pas être vérifiées mécaniquement.

**Fonction `interrogatif` (C7).** Elle est portée par 17 sens : `v_179_s1` いくら « Combien » ; `v_343_s1` どっち « Lequel (des deux) » ; `v_390_s1` いかが « Comment (poli) » ; `v_391_s1` いつ « Quand » ; `v_393_s1` どう « Comment » ; `v_394_s1` どうして « Pourquoi » ; `v_395_s1` どこ « Où » ; `v_396_s1` どちら « Lequel (des deux) » ; `v_396_s2` どちら « Où (poli) » ; `v_396_s3` どちら « Qui (poli) » ; `v_397_s1` どなた « Qui (poli) » ; `v_398_s1` どの « Quel … » ; `v_399_s1` どれ « Lequel » ; `v_400_s1` なぜ « Pourquoi » ; `v_401_s1` 何 « Quoi » ; `v_402_s1` 誰 « Qui » ; `v_585_s1` いくつ « Combien ». C'est l'E5 normatif commun prévu par le périmètre ; le criblage ne dit rien de ces annotations. Aucune autre fonction sans définition normative n'est portée par un sens publié.

**Justifications datées (C10).** 67 détections dans les raisons du journal : 17 invoquent l'absence d'une définition, 50 renvoient à une étape ultérieure. Elles portent sur 49 sens. Le script repère une formulation ; il ne sait pas si la raison est devenue obsolète.

**Lexique des fonctions, hors fenêtre.** 23 détections concernent des sens décidés après la définition d'une fonction, dont une traduction en contient un terme sans que le sens la porte. Ils ne sont pas candidats : la fonction existait quand le lot a décidé. Ils sont donnés pour mémoire en annexe E.

**Classe × type.** La répartition complète des types par classe grammaticale est en annexe E.

## 6. Échantillons de contrôle des non-candidats

Trois échantillons ont été lus, soit 158 sens. Ils n'ont pas le même statut.

| Échantillon | Statut | Graine | Population du tirage | Sens lus | Résultat |
|---|---|---|---|---|---|
| Développement | a servi à concevoir C1-f et C1-g ; **ne valide rien** | 20261007 | 500 non-candidats du premier criblage, puis 443 après révision | 58 | 2 faiblesses du criblage |
| Validation 1 | indépendant du premier ; **non concluant** | 20261008 | 389 non-candidats jamais lus, sur 443 | 50 | 3 faiblesses du criblage |
| Validation 2 | indépendant des deux premiers | 20261009 | 290 non-candidats jamais lus, sur 381 | 50 | aucun cas que le criblage aurait dû remonter |

**Lecture de chaque sens** : fiche source entière et exemple, sens publié et autres sens de l'ENTRY, décisions du journal sur ses couches, snapshots applicables et sens comparables. Pour un sens qui appartient aussi aux 147, le `null` n'est pas examiné : il est réservé au volet 2 ; seules les autres couches le sont.

**Ce que ces échantillons valent.** Ils fournissent un contrôle ponctuel des non-candidats. Ils ne permettent ni d'exclure d'autres faux négatifs, ni d'en estimer précisément la fréquence.

### 6.1 Échantillon de développement

Premier criblage : 324 candidats, 500 non-candidats. Tirage de 54 sens (10 % des non-candidats, au moins 50 ; allocation proportionnelle par lot d'origine, puis 4 sens ajoutés pour les strates absentes : classe adjectif_na, classe determinant, classe numeral, couche tag).

La lecture n'a relevé aucun écart établi, mais deux cas que le criblage aurait dû désigner :

1. **`v_681_s1` 温い « Tiède »**, en être humain › sens et perception › toucher et sensations. Les autres sens de température au toucher (熱い, 冷たい, 温かい) étaient candidats par C1-a ; 温い, rangé comme eux, ne l'était pas.
2. **`v_455_s1` 明るい « Lumineux »**, en couleurs › teintes et nuances › clair / foncé, alors que sa fiche décrit « un espace bien éclairé par la lumière » ; de même `v_4_s1` 暗い « Sombre ». Leur famille source est trop petite pour C1-b. Ce rapport ne dit pas que ce rangement est fautif : il demande une lecture.

**Corrections** : C1-f (propagation dans une catégorie à moitié candidate) et C1-g (sens seul de sa famille source à porter son niveau 1) ; rattachement des deux ENTRY hors JLPT à leurs fiches. **Population repassée** : 381 candidats, 443 non-candidats. Quatre sens ont alors été tirés en plus et lus, ce qui porte l'échantillon de développement à 58 sens.

Parce que ces lectures ont servi à écrire les règles, elles ne peuvent pas les valider.

### 6.2 Échantillon de validation 1 : non concluant

Tirage neuf, graine 20261008, de 50 sens parmi les 389 non-candidats qu'aucune lecture n'avait touchés (443 non-candidats, moins les 54 déjà lus qui en faisaient partie). Même stratification : par lot d'origine, puis 1 remplacement pour une classe absente (classe adjectif_na : v_609_s1 à la place de v_56_s1). Répartition par classe : adjectif_i 6, adjectif_na 1, adverbe 1, nom 30, numeral 3, verbe 9.

**Résultat : l'échantillon n'est pas propre.** Aucun écart établi, mais trois cas que le criblage aurait dû désigner :

1. **`v_62_s2` 軽い « Bénin »**, en santé et médecine › maladies et troubles, alors que les trois autres sens de sa famille source (軽い « Léger », 重い « Lourd », 重い « Grave ») sont sans catégorie. Aucune règle ne rapprochait un sens catégorisé de voisins en `null` : C1-a ne le fait que pour une même traduction, C1-g ne compare que des sens catégorisés. L'asymétrie a été arbitrée au lot 15 ; elle reste un traitement différent de sens comparables, que le criblage devait remonter.
2. **`v_477_s1` 薄い « Mince »**, en espace › dimensions, au niveau 2. C'est un point réservé à A2-05 par le lot 15 (les sous-catégories absentes pour la superficie, la circonférence et l'épaisseur : 広い, 狭い, 太い, 細い, 厚い, 薄い), omis de la liste des points réservés. Une relecture de tous les points ouverts a fait apparaître une seconde omission : les emplois d'adresse conservés en nuance (嫌, 悪い, 危ない, 痛い), « à reprendre si les fonctions reçoivent une définition ».
3. **`v_617_s1` トイレ « Toilettes »**, qui porte le tag `lieu_gare` sans qu'aucune décision du journal ne porte sur ses tags. Vérification faite sur tous les porteurs : 27 des 45 sont dans ce cas, le tag hérité ayant été gardé sans décision journalisée. Le criblage ne le voyait pas.

**Corrections** :

- **C1-h** : dans une même famille source, même classe et même type, quand un sens sans catégorie ni fonction côtoie des sens catégorisés, ces derniers deviennent candidats ;
- **C8-c** : tout porteur d'un tag dont l'entrée n'a aucune décision de journal sur le champ `tags` devient candidat ;
- **points réservés** : les dix mots omis sont ajoutés.

**Toute la population a été repassée** : 443 candidats, 381 non-candidats. C1-h désigne 69 sens, C8-c 27. 5 sens de cet échantillon sont devenus candidats (`v_617_s1` トイレ « Toilettes » ; `v_642_s1` 出る « Sortir » ; `v_557_s1` 止まる « S'arrêter » ; `v_62_s2` 軽い « Bénin » ; `v_477_s1` 薄い « Mince ») ; les 45 autres ont été lus sans écart relevé.

### 6.3 Échantillon de validation 2

Tirage neuf, graine 20261009, de 50 sens parmi les 290 non-candidats du criblage révisé qu'aucune lecture n'avait touchés (381 non-candidats, moins les 91 déjà lus qui en font partie).

- **Par lot d'origine** : lot 0 : 1 ; lot 1 : 4 ; lot 2 : 4 ; lot 3 : 2 ; lot 4 : 2 ; lot 5 : 4 ; lot 6 : 4 ; lot 7 : 3 ; lot 8 : 3 ; lot 9 : 2 ; lot 10 : 2 ; lot 13 : 2 ; lot 14 : 4 ; lot 15 : 3 ; lot 16 : 1 ; lot 17 : 2 ; lot 18 : 2 ; lot 19 : 2 ; lot 20 : 2 ; lot 22 : 1. Les autres lots n'ont aucun non-candidat non lu.
- **Par classe** : adjectif_i 4, adjectif_na 2, adverbe 1, nom 33, numeral 2, verbe 8. Toutes les classes présentes dans la population du tirage sont représentées.
- **Par couche** : catégorie non nulle, 41 sens ; type non nul, 45 ; tag, 1 (sur 7 porteurs dans la population du tirage). Aucun non-candidat ne porte de dimension, de fonction ni de relation : ces sens sont tous candidats.
- **Remplacement** : couche tag, v_98_s1 à la place de v_603_s1.
- **Sens des 147** : 14. Leur `null` n'a pas été examiné.

**Résultat : 50 sens lus, aucun écart relevé, aucun cas que le criblage aurait dû remonter.**

**Quatre lectures hésitantes, non retenues.** Elles sont données pour que le relecteur en juge ; si l'une était tenue pour un faux négatif, le protocole demanderait une nouvelle correction, un nouveau passage et un nouvel échantillon.

| Sens | Ce qui a arrêté la lecture | Pourquoi le cas n'est pas retenu |
|---|---|---|
| `v_180_s1` お金 « Argent » | type `quantite_valeur` pour un nom qui désigne aussi des espèces | A2-ST définit ce type comme une « valeur quantitative », et l'argent est rangé en économie › argent et monnaie : la lecture « valeur » se tient. Aucun sens comparable n'est traité autrement. |
| `v_674_s1` 橋 « Pont » | type `objet_artefact`, quand 建物 « Bâtiment » est un `lieu` | 門 « Portail », de la même famille source, est aussi un `objet_artefact` ; un ouvrage n'est pas un bâtiment fonctionnel. |
| `v_200_s1` 音楽 « Musique » | type `information_contenu` pour un art | 歌 « Chanson », de la même famille source, porte le même type. |
| `v_245_s1` 帰国 « Retour au pays » | catégorie voyage et tourisme › séjour › retour, pour un retour dans son pays d'origine | A2-L3 range « Retour » sous « Séjour » ; la fiche décrit un déplacement de retour. Sens seul de sa famille source : aucune règle comparative ne peut le voir. |

Aucune de ces quatre lectures ne correspond à une règle comparative possible. Une règle « sens seul de sa famille source à porter son type », symétrique de C1-g, a été mesurée : elle ne remonte aucun de ces quatre sens, et désignerait 62 sens dont les types diffèrent seulement parce que leur famille source mêle des personnes, des lieux et des objets. Elle n'a pas été ajoutée.

## 7. Ce qui est automatique, et ce qui demande une lecture

| | Établi par le script | Demande une lecture individuelle |
|---|---|---|
| Populations et effectifs | oui | — |
| Validité mécanique des liens, existence des sections citées | oui | — |
| Liste des 17 sens `interrogatif` | oui | leur conformité, après la définition |
| Qu'un sens est candidat, et par quelle règle | oui | — |
| Qu'un candidat est un écart, et de quel code (E1 à E5) | **non** | oui, au temps 2 |
| Que deux sens d'une même famille sont réellement comparables | **non** | oui : le script rapproche des formes, pas des sens |
| Qu'une raison de journal est devenue obsolète | **non** | oui |
| Qu'une catégorie ou un type convient à une fiche | **non** | oui |
| Qu'un non-candidat est cohérent | **non** | seulement pour les sens lus des échantillons, et sans valeur de déclaration générale |

**Ce que le criblage ne peut pas voir.** Ses règles sont comparatives, lexicales ou datées. Un rangement appliqué partout de la même façon, mais discutable au regard d'un snapshot, ne laisse aucune trace comparative : 明るい et 暗い en sont l'exemple, trouvé par lecture. C1-g réduit cet angle mort sans le supprimer, en particulier pour les sens seuls de leur famille source et pour les familles d'un seul sens.

## 8. Suite

Selon l'ordre arbitré : audit individuel des 147 `null` (volet 2), en s'appuyant sur les familles des annexes C et D ; puis examen individuel des autres candidats ; puis arbitrage global. Rien de cela n'est commencé.

---

## Annexe A · Liste des candidats

Ordre : numéro d'ENTRY, puis numéro de sens. « 147 » : le sens porte aussi un avertissement audité au volet 2.

| # | SENSE | Mot | Classe | Sens | Catégorie | Type | Lot | 147 | Règles |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `v_2_s1` | 大好き | adjectif_na | Adorer | etre_humain › psychologie_esprit › preferences | propriete | 16 | — | C7-c |
| 2 | `v_4_s1` | 暗い | adjectif_i | Sombre | couleurs › teintes_nuances › clair_fonce | propriete | 17 | — | C1-g |
| 3 | `v_8_s1` | 温かい | adjectif_i | Chaud | etre_humain › sens_perception › toucher_sensations | propriete | 17 | — | C1-a |
| 4 | `v_9_s1` | 疲れる | verbe | Se fatiguer | etre_humain › etats_besoins_physiques › fatigue_energie_physique | processus | 19 | — | C1-f |
| 5 | `v_10_s1` | 面白い | adjectif_i | Intéressant | etre_humain › psychologie_esprit › attention | propriete | 00 | — | C1-f |
| 6 | `v_11_s2` | おじいさん | nom | Vieil homme | etre_humain › cycle_de_vie › vieillissement | personne | 01 | — | C1-b |
| 7 | `v_12_s2` | おじさん | nom | Monsieur | etre_humain › cycle_de_vie › age_adulte | personne | 01 | — | C1-b, C7-c |
| 8 | `v_13_s2` | おばあさん | nom | Vieille dame | etre_humain › cycle_de_vie › vieillissement | personne | 01 | — | C1-b |
| 9 | `v_14_s2` | おばさん | nom | Madame | etre_humain › cycle_de_vie › age_adulte | personne | 01 | — | C1-b, C7-c |
| 10 | `v_15_s1` | お巡りさん | nom | Policier | droit_justice › application_de_la_loi › police | personne | 01 | — | C1-h |
| 11 | `v_20_s1` | 両親 | nom | Parents | relations_sociales › famille_parente › parents_enfants | groupe_collectif | 01 | — | C3-d, C7-c |
| 12 | `v_22_s2` | 先生 | nom | Maître | relations_sociales › interactions_sociales | personne | 06 | — | C1-g |
| 13 | `v_28_s1` | 大人 | nom | Adulte | etre_humain › cycle_de_vie › age_adulte | personne | 01 | — | C1-f |
| 14 | `v_31_s1` | 子供 | nom | Enfant | etre_humain › cycle_de_vie › enfance | personne | 01 | — | C1-b |
| 15 | `v_31_s2` | 子供 | nom | Enfant (fils ou fille) | relations_sociales › famille_parente › parents_enfants | personne | 01 | — | C7-c |
| 16 | `v_39_s1` | 男の子 | nom | Garçon | etre_humain › cycle_de_vie › enfance | personne | 01 | — | C1-f |
| 17 | `v_42_s1` | 警官 | nom | Policier | droit_justice › application_de_la_loi › police | personne | 01 | — | C1-h |
| 18 | `v_49_s1` | 寝る | verbe | Dormir | etre_humain › etats_besoins_physiques › sommeil_repos | etat | 19 | — | C1-f |
| 19 | `v_49_s2` | 寝る | verbe | Se coucher | etre_humain › etats_besoins_physiques › sommeil_repos | action | 19 | — | C1-h |
| 20 | `v_50_s1` | 差す | verbe | Ouvrir (un parapluie) | habillement_accessoires_personnels › accessoires_vestimentaires | action | 18 | — | C1-a, C1-h |
| 21 | `v_53_s1` | 歩く | verbe | Marcher | espace_proprietes_spatiales › mouvement_deplacement | action | 04 | — | C1-h |
| 22 | `v_55_s1` | 病気 | nom | Maladie | sante_medecine › maladies_troubles | etat | 01 | — | C1-f |
| 23 | `v_62_s1` | 軽い | adjectif_i | Léger | null | propriete | 15 | categorie-nulle | C1-a |
| 24 | `v_62_s2` | 軽い | adjectif_i | Bénin | sante_medecine › maladies_troubles | propriete | 15 | — | C1-h |
| 25 | `v_63_s1` | 降りる | verbe | Descendre | espace_proprietes_spatiales › mouvement_deplacement › monter_descendre | action | 04 | — | C1-h |
| 26 | `v_64_s1` | かばん | nom | Sac | habillement_accessoires_personnels › sacs_contenants_personnels › sacs | objet_artefact | 00 | — | C1-f |
| 27 | `v_66_s1` | 飲む | verbe | Boire | alimentation_cuisine › consommation_alimentaire | action | 02 | — | C1-g, C1-h |
| 28 | `v_68_s1` | 履く | verbe | Mettre (en bas du corps) | habillement_accessoires_personnels › vetements › bas | action | 00 | — | C1-a |
| 29 | `v_74_s2` | ボタン | nom | Bouton (d'appareil) | technologie › appareils_electroniques | objet_artefact | 05 | — | C1-b, C1-g |
| 30 | `v_80_s1` | 曇る | verbe | Se couvrir (le ciel) | monde_naturel › meteo › nuages | processus | 07 | — | C1-h |
| 31 | `v_82_s1` | 締める | verbe | Serrer | habillement_accessoires_personnels › accessoires_vestimentaires | action | 18 | — | C1-g, C1-h |
| 32 | `v_84_s1` | お弁当 | nom | Bento | alimentation_cuisine › aliments › produits_prepares | substance_matiere | 02 | — | C8-b |
| 33 | `v_85_s1` | お茶 | nom | Thé | alimentation_cuisine › boissons › boissons_chaudes | substance_matiere | 02 | — | C8-c |
| 34 | `v_86_s1` | お酒 | nom | Alcool | alimentation_cuisine › boissons › boissons_alcoolisees | substance_matiere | 02 | — | C8-c |
| 35 | `v_87_s1` | 果物 | nom | Fruit | alimentation_cuisine › aliments › fruits | substance_matiere | 00 | — | C8-a, C8-c |
| 36 | `v_88_s1` | ご飯 | nom | Riz cuit | alimentation_cuisine › aliments › cereales_feculents | substance_matiere | 02 | — | C8-b |
| 37 | `v_91_s1` | 晩ご飯 | nom | Dîner | alimentation_cuisine › repas › diner | evenement | 00 | — | C8-a, C8-c, C8-b, RES |
| 38 | `v_92_s1` | 昼ご飯 | nom | Déjeuner | alimentation_cuisine › repas › dejeuner | evenement | 00 | — | C8-a, C8-c, RES, C1-f |
| 39 | `v_94_s1` | カレー | nom | Curry | alimentation_cuisine › aliments › produits_prepares | substance_matiere | 02 | — | C8-b |
| 40 | `v_95_s1` | コーヒー | nom | Café (boisson) | alimentation_cuisine › boissons › boissons_chaudes | substance_matiere | 02 | — | C1-a, C3-b, C8-c |
| 41 | `v_97_s1` | パン | nom | Pain | alimentation_cuisine › aliments › cereales_feculents | substance_matiere | 02 | — | C8-b |
| 42 | `v_100_s1` | 台所 | nom | Cuisine (pièce) | habitat_vie_domestique › espaces_domestiques › cuisine | lieu | 03 | — | C1-a, C3-b, C1-b, C1-g |
| 43 | `v_101_s1` | 喫茶店 | nom | Café (établissement) | alimentation_cuisine › restauration › cafes | lieu | 02 | — | C1-a, C3-b |
| 44 | `v_102_s1` | 塩 | nom | Sel | alimentation_cuisine › aliments › condiments_assaisonnements | substance_matiere | 02 | — | C8-b |
| 45 | `v_103_s1` | 夕飯 | nom | Dîner | alimentation_cuisine › repas › diner | evenement | 02 | — | C8-b, C10-a |
| 46 | `v_104_s1` | 料理 | nom | Cuisine | alimentation_cuisine › cuisine_preparation | action | 02 | — | C1-a, C3-b |
| 47 | `v_104_s2` | 料理 | nom | Plat | alimentation_cuisine › aliments › produits_prepares | substance_matiere | 02 | — | C8-b |
| 48 | `v_108_s1` | 牛乳 | nom | Lait | alimentation_cuisine › aliments › produits_laitiers | substance_matiere | 02 | — | C8-b |
| 49 | `v_110_s1` | 砂糖 | nom | Sucre | alimentation_cuisine › aliments › condiments_assaisonnements | substance_matiere | 02 | — | C8-b |
| 50 | `v_112_s1` | 紅茶 | nom | Thé noir | alimentation_cuisine › boissons › boissons_chaudes | substance_matiere | 02 | — | C8-c |
| 51 | `v_116_s1` | 頼む | verbe | Demander | relations_sociales › interactions_sociales | action | 19 | — | C1-a, C1-g, C1-h |
| 52 | `v_116_s2` | 頼む | verbe | Commander (un plat au restaurant) | economie_commerce › achat_vente › commande | action | 19 | — | C1-g, C1-h |
| 53 | `v_117_s1` | 食べる | verbe | Manger | alimentation_cuisine › consommation_alimentaire | action | 02 | — | C1-f |
| 54 | `v_120_s1` | 飲み物 | nom | Boisson | alimentation_cuisine › boissons | substance_matiere | 02 | — | C8-c |
| 55 | `v_121_s1` | 飴 | nom | Bonbon | alimentation_cuisine › aliments › produits_prepares | substance_matiere | 02 | — | C8-b |
| 56 | `v_122_s1` | 魚 | nom | Poisson (animal) | monde_naturel › animaux › poissons | organisme_vivant | 02 | — | C1-g |
| 57 | `v_122_s2` | 魚 | nom | Poisson (aliment) | alimentation_cuisine › aliments › poissons_produits_marins | substance_matiere | 02 | — | C1-g |
| 58 | `v_124_s1` | テスト | nom | Examen | education_apprentissage › evaluation_scolaire › examens | evenement | 06 | — | C1-f |
| 59 | `v_130_s2` | 引く | verbe | Chercher (dans un dictionnaire) | communication_langage › langues | action | 18 | — | C1-g, C1-h |
| 60 | `v_132_s2` | 教える | verbe | Indiquer | communication_langage › communication › transmission | action | 06 | — | C1-g |
| 61 | `v_134_s1` | 本 | nom | Livre | communication_langage › lecture | objet_artefact | 06 | — | C1-f |
| 62 | `v_136_s1` | 英語 | nom | Anglais (langue) | communication_langage › langues › langues | concept_abstrait | 06 | — | C3-0 |
| 63 | `v_138_s2` | 言葉 | nom | Langue | communication_langage › langues › langues | concept_abstrait | 06 | — | C3-0 |
| 64 | `v_139_s1` | 辞書 | nom | Dictionnaire | communication_langage › langues | objet_artefact | 06 | — | C1-f |
| 65 | `v_141_s1` | 仕事 | nom | Travail | travail_vie_professionnelle › travail_emploi › activite_professionnelle | action | 19 | — | C1-f |
| 66 | `v_142_s1` | 会社 | nom | Entreprise | travail_vie_professionnelle › entreprises_organisations_professionnelles › entreprises | organisation | 19 | — | C3-c |
| 67 | `v_149_s1` | 乗る | verbe | Prendre (un transport) | transport_mobilite › utilisation_des_transports | action | 04 | — | C1-a, C3-b, C8-c |
| 68 | `v_150_s1` | 出かける | verbe | Sortir (de chez soi) | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | 04 | — | C1-h |
| 69 | `v_151_s1` | 地下鉄 | nom | Métro | transport_mobilite › transport_ferroviaire › metro | objet_artefact | 04 | — | C8-c |
| 70 | `v_152_s1` | 来る | verbe | Venir | espace_proprietes_spatiales › mouvement_deplacement › aller_venir | action | 04 | — | C1-h |
| 71 | `v_156_s1` | 行く | verbe | Aller | espace_proprietes_spatiales › mouvement_deplacement › aller_venir | action | 04 | — | C1-h |
| 72 | `v_157_s1` | 走る | verbe | Courir | espace_proprietes_spatiales › mouvement_deplacement | action | 04 | — | C1-h |
| 73 | `v_159_s1` | 電車 | nom | Train | transport_mobilite › transport_ferroviaire › train | objet_artefact | 04 | — | C8-c |
| 74 | `v_160_s1` | 飛ぶ | verbe | Voler | espace_proprietes_spatiales › mouvement_deplacement | action | 04 | — | C1-h |
| 75 | `v_162_s1` | 駅 | nom | Gare | transport_mobilite › reseaux_infrastructures › gares | lieu | 04 | — | C8-c |
| 76 | `v_163_s1` | かかる | verbe | Prendre (du temps ou de l'argent) | null | propriete | 20 | categorie-nulle | C1-a, C3-b, C3-c, C7-c |
| 77 | `v_164_s1` | かける | verbe | Passer (un appel) | communication_langage › communication › contact | action | 08 | — | C1-h |
| 78 | `v_164_s2` | かける | verbe | Mettre (des lunettes) | habillement_accessoires_personnels › accessoires_vestimentaires | action | 08 | — | C1-a, C1-g, C1-h |
| 79 | `v_165_s1` | カメラ | nom | Appareil photo | technologie › appareils_electroniques › appareils_electroniques | objet_artefact | 08 | — | C1-g |
| 80 | `v_170_s2` | 字 | nom | Écriture (d'une personne) | communication_langage › ecriture › ecrire | propriete | 06 | — | C3-d |
| 81 | `v_171_s1` | 撮る | verbe | Prendre (une photo) | arts_creation › arts_visuels | action | 08 | — | C1-a, C3-b |
| 82 | `v_173_s1` | 番号 | nom | Numéro | nombres_quantification › nombres | information_contenu | 08 | — | C1-g |
| 83 | `v_175_s1` | 聞く | verbe | Écouter | etre_humain › sens_perception › ouie | action | 08 | — | C1-b, C1-g |
| 84 | `v_175_s2` | 聞く | verbe | Demander | communication_langage › parole_conversation › question | action | 08 | — | C1-a |
| 85 | `v_178_s1` | 電話 | nom | Téléphone (appareil) | technologie › appareils_electroniques › telephones | objet_artefact | 08 | — | C1-g |
| 86 | `v_179_s1` | いくら | pronom | Combien | economie_commerce › prix_valeur_economique › prix | null | 05 | — | C4-0, C1-a |
| 87 | `v_181_s1` | する | verbe | Faire | null | action | 20 | categorie-nulle | C10-a |
| 88 | `v_181_s2` | する | verbe | Coûter (pour un prix) | economie_commerce › prix_valeur_economique › prix | propriete | 20 | — | C3-c, C1-f |
| 89 | `v_183_s1` | 低い | adjectif_i | Bas | espace_proprietes_spatiales › dimensions › hauteur | propriete | 15 | — | C7-c, RES |
| 90 | `v_185_s1` | 安い | adjectif_i | Bon marché | economie_commerce › prix_valeur_economique › prix | propriete | 05 | — | C7-c, C1-f |
| 91 | `v_188_s1` | 高い | adjectif_i | Haut | espace_proprietes_spatiales › dimensions › hauteur | propriete | 05 | — | C1-g |
| 92 | `v_188_s2` | 高い | adjectif_i | Cher | economie_commerce › prix_valeur_economique › prix | propriete | 05 | — | C1-g |
| 93 | `v_192_s1` | 弾く | verbe | Jouer (d'un instrument à cordes ou à clavier) | arts_creation › musique › instruments | action | 09 | — | C7-c |
| 94 | `v_202_s1` | エレベーター | nom | Ascenseur | environnement_construit_espaces_humains › elements_architecturaux | objet_artefact | 03 | — | C8-b |
| 95 | `v_204_s1` | テープ | nom | Ruban adhésif | habitat_vie_domestique › accessoires_domestiques | objet_artefact | 08 | — | C1-g |
| 96 | `v_204_s2` | テープ | nom | Bande magnétique | technologie › donnees › stockage | objet_artefact | 08 | — | C1-g |
| 97 | `v_205_s1` | ラジオ | nom | Radio | medias › radio › radio | objet_artefact | 08 | — | C1-g |
| 98 | `v_206_s1` | ラジカセ | nom | Radio-cassette | technologie › appareils_electroniques › appareils_electroniques | objet_artefact | 08 | — | C1-g |
| 99 | `v_208_s1` | お風呂 | nom | Bain | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu | 03 | — | C8-c, C8-b, C10-a |
| 100 | `v_209_s1` | ふろ | nom | Bain | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu | 03 | — | C8-b |
| 101 | `v_212_s1` | ベッド | nom | Lit | habitat_vie_domestique › mobilier › couchage | objet_artefact | 03 | — | C8-c |
| 102 | `v_213_s1` | 入る | verbe | Entrer | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | 04 | — | C1-h |
| 103 | `v_214_s1` | 入口 | nom | Entrée | environnement_construit_espaces_humains › elements_architecturaux | lieu | 03 | — | C1-a, C8-b |
| 104 | `v_215_s1` | 公園 | nom | Parc | environnement_construit_espaces_humains › espaces_publics › parcs_amenages | lieu | 04 | — | C1-g |
| 105 | `v_219_s1` | 掃除 | nom | Ménage | habitat_vie_domestique › entretien_domestique › nettoyage | action | 03 | — | C1-f |
| 106 | `v_221_s1` | 洗う | verbe | Laver | habitat_vie_domestique › entretien_domestique › nettoyage | action | 03 | — | C1-b, C1-h |
| 107 | `v_224_s1` | 部屋 | nom | Pièce | habitat_vie_domestique › espaces_domestiques | lieu | 03 | — | C8-c |
| 108 | `v_226_s1` | 鍵 | nom | Clé | habitat_vie_domestique › accessoires_domestiques | objet_artefact | 00 | — | C8-a, C8-c, C8-b |
| 109 | `v_228_s1` | せっけん | nom | Savon | etre_humain › hygiene_soins_personnels › toilette_corporelle | substance_matiere | 00 | — | C1-g, C8-a, C8-c |
| 110 | `v_229_s1` | ちり紙 | nom | Papier hygiénique | habitat_vie_domestique › accessoires_domestiques | substance_matiere | 03 | — | C3-d, C8-b |
| 111 | `v_233_s1` | ポスト | nom | Boîte aux lettres | communication_langage › communication › transmission | objet_artefact | 03 | — | C1-g |
| 112 | `v_237_s1` | 紙 | nom | Papier | matieres_materiaux › materiaux_organiques › papier | substance_matiere | 03 | — | C1-g |
| 113 | `v_239_s1` | 交差点 | nom | Carrefour | environnement_construit_espaces_humains › voirie › carrefours | lieu | 04 | — | C1-g |
| 114 | `v_240_s1` | 交番 | nom | Poste de police | droit_justice › application_de_la_loi › police | lieu | 04 | — | C1-g |
| 115 | `v_241_s1` | 出口 | nom | Sortie | environnement_construit_espaces_humains › elements_architecturaux | lieu | 03 | — | C8-b |
| 116 | `v_244_s1` | 大使館 | nom | Ambassade | politique_institutions_publiques › relations_internationales_diplomatie › ambassades | lieu | 04 | — | C1-g |
| 117 | `v_246_s1` | 建物 | nom | Bâtiment | environnement_construit_espaces_humains › batiments_constructions › batiments | lieu | 04 | — | C1-g |
| 118 | `v_248_s1` | 玄関 | nom | Entrée | habitat_vie_domestique › espaces_domestiques › entree | lieu | 03 | — | C1-a |
| 119 | `v_254_s2` | 木 | nom | Bois (matière) | matieres_materiaux › matieres_naturelles › bois | substance_matiere | 07 | — | C1-g |
| 120 | `v_259_s1` | 登る | verbe | Monter | espace_proprietes_spatiales › mouvement_deplacement › monter_descendre | action | 04 | — | C1-h |
| 121 | `v_263_s1` | 曇り | nom | Temps nuageux | monde_naturel › meteo › nuages | etat | 00 | — | C1-f |
| 122 | `v_264_s1` | 冬 | nom | Hiver | temps › moments_periodes | concept_abstrait | 07 | — | C3-0 |
| 123 | `v_265_s1` | 冷たい | adjectif_i | Froid (au toucher) | etre_humain › sens_perception › toucher_sensations | propriete | 07 | — | C1-a, C1-h |
| 124 | `v_265_s2` | 冷たい | adjectif_i | Froid (attitude) | null | propriete | 07 | categorie-nulle | C1-a |
| 125 | `v_267_s1` | 夏 | nom | Été | temps › moments_periodes | concept_abstrait | 07 | — | C3-0 |
| 126 | `v_268_s1` | 夏休み | nom | Vacances d'été | temps › moments_periodes | concept_abstrait | 13 | — | C3-0 |
| 127 | `v_269_s1` | 天気 | nom | Temps (qu'il fait) | monde_naturel › meteo › conditions_atmospheriques | etat | 07 | — | C1-a, C3-b, C7-b |
| 128 | `v_270_s1` | 寒い | adjectif_i | Froid (temps) | monde_naturel › meteo › conditions_atmospheriques | propriete | 07 | — | C1-a, C1-h |
| 129 | `v_271_s1` | 春 | nom | Printemps | temps › moments_periodes | concept_abstrait | 07 | — | C3-0 |
| 130 | `v_274_s1` | 暑い | adjectif_i | Chaud (temps) | monde_naturel › meteo › conditions_atmospheriques | propriete | 07 | — | C1-a, C1-h |
| 131 | `v_277_s1` | 熱い | adjectif_i | Chaud (au toucher) | etre_humain › sens_perception › toucher_sensations | propriete | 07 | — | C1-a, C1-h |
| 132 | `v_278_s1` | 秋 | nom | Automne | temps › moments_periodes | concept_abstrait | 07 | — | C3-0 |
| 133 | `v_282_s1` | 風 | nom | Vent | monde_naturel › meteo › vent | processus | 07 | — | C3-c |
| 134 | `v_284_s1` | あさって | nom | Après-demain | temps › moments_periodes › futur | concept_abstrait | 12 | — | C3-0 |
| 135 | `v_285_s1` | おととし | nom | Il y a deux ans | temps › moments_periodes › passe | concept_abstrait | 00 | — | C3-0, C7-b, RES |
| 136 | `v_286_s1` | さ来年 | nom | Dans deux ans | temps › moments_periodes › futur | concept_abstrait | 12 | — | C3-0 |
| 137 | `v_290_s1` | 一昨日 | nom | Avant-hier | temps › moments_periodes › passe | concept_abstrait | 12 | — | C3-0 |
| 138 | `v_292_s2` | 七日 | nom | Le 7 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 139 | `v_293_s1` | 三日 | nom | Le 3 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 140 | `v_294_s2` | 九日 | nom | Le 9 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 141 | `v_295_s2` | 二十日 | nom | Le 20 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 142 | `v_296_s2` | 二日 | nom | Le 2 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 143 | `v_297_s2` | 五日 | nom | Le 5 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 144 | `v_298_s1` | 今 | nom | Maintenant | temps › moments_periodes › present | concept_abstrait | 12 | — | C3-0 |
| 145 | `v_299_s1` | 今年 | nom | Cette année | temps › moments_periodes › present | concept_abstrait | 12 | — | C3-0 |
| 146 | `v_300_s1` | 今日 | nom | Aujourd'hui | temps › moments_periodes › present | concept_abstrait | 12 | — | C3-0 |
| 147 | `v_301_s1` | 今晩 | nom | Ce soir | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 148 | `v_302_s1` | 今月 | nom | Ce mois-ci | temps › moments_periodes › present | concept_abstrait | 12 | — | C3-0 |
| 149 | `v_303_s1` | 今朝 | nom | Ce matin | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 150 | `v_304_s1` | 今週 | nom | Cette semaine | temps › moments_periodes › present | concept_abstrait | 12 | — | C3-0 |
| 151 | `v_305_s1` | 先月 | nom | Le mois dernier | temps › moments_periodes › passe | concept_abstrait | 12 | — | C3-0 |
| 152 | `v_306_s1` | 先週 | nom | La semaine dernière | temps › moments_periodes › passe | concept_abstrait | 12 | — | C3-0 |
| 153 | `v_307_s2` | 八日 | nom | Le 8 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 154 | `v_308_s2` | 六日 | nom | Le 6 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 155 | `v_309_s2` | 十日 | nom | Le 10 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 156 | `v_310_s1` | 午前 | nom | Matin (avant midi) | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 157 | `v_311_s1` | 半 | nom | Moitié | nombres_quantification › proportions › fraction | quantite_valeur | 13 | — | C1-g |
| 158 | `v_311_s2` | 半 | nom | Et demie (heure) | temps › unites_temporelles › seconde_minute_heure | quantite_valeur | 13 | — | C1-g, C7-c |
| 159 | `v_312_s1` | 去年 | nom | L'année dernière | temps › moments_periodes › passe | concept_abstrait | 12 | — | C3-0 |
| 160 | `v_313_s2` | 四日 | nom | Le 4 (du mois) | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 161 | `v_314_s1` | 土曜日 | nom | Samedi | temps › calendrier › jours | concept_abstrait | 13 | — | C3-0 |
| 162 | `v_315_s1` | 夜 | nom | Nuit | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 163 | `v_316_s1` | 年 | nom | Année | temps › calendrier › annees | concept_abstrait | 13 | — | C3-0 |
| 164 | `v_316_s2` | 年 | nom | Âge | etre_humain › cycle_de_vie | propriete | 13 | — | C1-b, C1-g, C3-d |
| 165 | `v_317_s1` | 日曜日 | nom | Dimanche | temps › calendrier › jours | concept_abstrait | 13 | — | C3-0 |
| 166 | `v_318_s1` | 明日 | nom | Demain | temps › moments_periodes › futur | concept_abstrait | 12 | — | C3-0 |
| 167 | `v_319_s1` | 昨夜 | nom | Hier soir | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 168 | `v_320_s1` | 昨日 | nom | Hier | temps › moments_periodes › passe | concept_abstrait | 12 | — | C3-0 |
| 169 | `v_321_s1` | 時間 | nom | Temps | temps › duree | concept_abstrait | 13 | — | C3-0, C1-a, C3-b, C3-d |
| 170 | `v_321_s2` | 時間 | nom | Heure (durée) | temps › unites_temporelles › seconde_minute_heure | null | 13 | type-nul | C1-f |
| 171 | `v_322_s1` | 晩 | nom | Soir | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 172 | `v_323_s1` | 月曜日 | nom | Lundi | temps › calendrier › jours | concept_abstrait | 13 | — | C3-0 |
| 173 | `v_324_s1` | 朝 | nom | Matin | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 174 | `v_325_s1` | 木曜日 | nom | Jeudi | temps › calendrier › jours | concept_abstrait | 13 | — | C3-0 |
| 175 | `v_326_s1` | 来年 | nom | L'année prochaine | temps › moments_periodes › futur | concept_abstrait | 12 | — | C3-0 |
| 176 | `v_327_s1` | 来月 | nom | Le mois prochain | temps › moments_periodes › futur | concept_abstrait | 12 | — | C3-0 |
| 177 | `v_328_s1` | 来週 | nom | La semaine prochaine | temps › moments_periodes › futur | concept_abstrait | 12 | — | C3-0 |
| 178 | `v_329_s1` | 毎年 | nom | Chaque année | temps › frequence › frequent | concept_abstrait | 00 | — | C3-0, C7-c |
| 179 | `v_330_s1` | 毎日 | nom | Chaque jour | temps › frequence › frequent | concept_abstrait | 12 | — | C3-0, C7-c |
| 180 | `v_331_s1` | 毎晩 | nom | Chaque soir | temps › frequence › frequent | concept_abstrait | 12 | — | C3-0, C7-c |
| 181 | `v_332_s1` | 毎月 | nom | Chaque mois | temps › frequence › frequent | concept_abstrait | 00 | — | C3-0, C7-c |
| 182 | `v_333_s1` | 毎朝 | nom | Chaque matin | temps › frequence › frequent | concept_abstrait | 12 | — | C3-0, C7-c |
| 183 | `v_334_s1` | 毎週 | nom | Chaque semaine | temps › frequence › frequent | concept_abstrait | 12 | — | C3-0, C7-c |
| 184 | `v_335_s1` | 水曜日 | nom | Mercredi | temps › calendrier › jours | concept_abstrait | 13 | — | C3-0 |
| 185 | `v_336_s1` | 火曜日 | nom | Mardi | temps › calendrier › jours | concept_abstrait | 13 | — | C3-0 |
| 186 | `v_337_s1` | 誕生日 | nom | Anniversaire | temps › calendrier › dates | concept_abstrait | 13 | — | C3-0 |
| 187 | `v_338_s1` | 金曜日 | nom | Vendredi | temps › calendrier › jours | concept_abstrait | 13 | — | C3-0 |
| 188 | `v_339_s1` | こちら | pronom | Par ici | espace_proprietes_spatiales › direction_orientation › orientation | null | 11 | — | C4-0 |
| 189 | `v_339_s2` | こちら | pronom | Moi, nous (poli) | null | null | 11 | — | C2-0, C4-0 |
| 190 | `v_340_s1` | そちら | pronom | Par là | espace_proprietes_spatiales › direction_orientation › orientation | null | 11 | — | C4-0 |
| 191 | `v_342_s1` | それ | pronom | Cela | null | null | 11 | — | C2-0, C4-0 |
| 192 | `v_343_s1` | どっち | pronom | Lequel (des deux) | null | null | 11 | — | C2-0, C4-0 |
| 193 | `v_344_s1` | はい | interjection | Oui | null | null | 23 | — | C2-0, C4-0, C5-b, C10-a |
| 194 | `v_347_s1` | 先 | nom | Avant (plus loin) | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu | 10 | — | C1-a, C3-b, C7-c, RES |
| 195 | `v_347_s2` | 先 | nom | D'abord | temps › chronologie › avant_apres | concept_abstrait | 10 | — | C3-0, C1-b, RES |
| 196 | `v_348_s1` | 前 | nom | Devant | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu | 10 | — | RES |
| 197 | `v_348_s2` | 前 | nom | Avant (dans le temps) | temps › chronologie › avant_apres | concept_abstrait | 10 | — | C3-0, C1-a, C3-b, C1-b, RES |
| 198 | `v_349_s1` | 北 | nom | Nord | espace_proprietes_spatiales › direction_orientation › directions_cardinales | concept_abstrait | 10 | — | C3-0 |
| 199 | `v_350_s1` | 南 | nom | Sud | espace_proprietes_spatiales › direction_orientation › directions_cardinales | concept_abstrait | 10 | — | C3-0 |
| 200 | `v_355_s1` | 東 | nom | Est | espace_proprietes_spatiales › direction_orientation › directions_cardinales | concept_abstrait | 10 | — | C3-0 |
| 201 | `v_357_s1` | 西 | nom | Ouest | espace_proprietes_spatiales › direction_orientation › directions_cardinales | concept_abstrait | 10 | — | C3-0 |
| 202 | `v_359_s1` | 近々 | adverbe | Bientôt | temps › moments_periodes › futur | concept_abstrait | 12 | — | C3-0, C7-c |
| 203 | `v_360_s1` | 近い | adjectif_i | Proche | espace_proprietes_spatiales › distance_proximite › proximite | propriete | 10 | — | C3-d |
| 204 | `v_361_s1` | 違う | verbe | Être différent | null | etat | 20 | categorie-nulle | C7-c |
| 205 | `v_361_s2` | 違う | verbe | Être incorrect | null | etat | 20 | categorie-nulle | C5-0 |
| 206 | `v_363_s2` | キロ | nom | Kilomètre | espace_proprietes_spatiales › distance_proximite | null | 00 | type-nul | RES |
| 207 | `v_366_s1` | メートル | nom | Mètre | espace_proprietes_spatiales › dimensions › longueur | null | 14 | type-nul | C10-a, RES |
| 208 | `v_390_s1` | いかが | adverbe | Comment (poli) | null | null | 11 | — | C2-0, C4-0 |
| 209 | `v_391_s1` | いつ | pronom | Quand | temps | null | 11 | — | C4-0 |
| 210 | `v_392_s1` | そこ | pronom | Là | espace_proprietes_spatiales › position_localisation | null | 11 | — | C4-0 |
| 211 | `v_393_s1` | どう | adverbe | Comment | null | null | 11 | — | C2-0, C4-0 |
| 212 | `v_394_s1` | どうして | adverbe | Pourquoi | null | null | 11 | — | C2-0, C4-0 |
| 213 | `v_395_s1` | どこ | pronom | Où | espace_proprietes_spatiales › position_localisation | null | 11 | — | C4-0, C1-a |
| 214 | `v_396_s1` | どちら | pronom | Lequel (des deux) | null | null | 11 | — | C2-0, C4-0 |
| 215 | `v_396_s2` | どちら | pronom | Où (poli) | espace_proprietes_spatiales › direction_orientation › orientation | null | 11 | — | C4-0, C1-a |
| 216 | `v_396_s3` | どちら | pronom | Qui (poli) | null | null | 11 | — | C2-0, C4-0 |
| 217 | `v_397_s1` | どなた | pronom | Qui (poli) | null | null | 11 | — | C2-0, C4-0 |
| 218 | `v_398_s1` | どの | determinant | Quel … | null | null | 11 | — | C2-0, C4-0 |
| 219 | `v_399_s1` | どれ | pronom | Lequel | null | null | 11 | — | C2-0, C4-0 |
| 220 | `v_400_s1` | なぜ | adverbe | Pourquoi | null | null | 11 | — | C2-0, C4-0 |
| 221 | `v_401_s1` | 何 | pronom | Quoi | null | null | 00 | — | C2-0, C4-0 |
| 222 | `v_402_s1` | 誰 | pronom | Qui | null | null | 11 | — | C2-0, C4-0 |
| 223 | `v_403_s1` | あそこ | pronom | Là-bas | espace_proprietes_spatiales › position_localisation | null | 11 | — | C4-0, C1-a |
| 224 | `v_404_s1` | あちら | pronom | Là-bas (poli) | espace_proprietes_spatiales › direction_orientation › orientation | null | 11 | — | C4-0, C1-a |
| 225 | `v_404_s2` | あちら | pronom | Cette personne-là (poli) | null | null | 11 | — | C2-0, C4-0 |
| 226 | `v_405_s1` | あっち | pronom | Par là-bas | espace_proprietes_spatiales › direction_orientation › orientation | null | 11 | — | C4-0 |
| 227 | `v_406_s1` | あの | determinant | Ce … là-bas | null | null | 11 | — | C2-0, C4-0 |
| 228 | `v_407_s1` | あれ | pronom | Cela (là-bas) | null | null | 11 | — | C2-0, C4-0 |
| 229 | `v_408_s1` | ここ | pronom | Ici | espace_proprietes_spatiales › position_localisation | null | 11 | — | C4-0 |
| 230 | `v_409_s1` | こっち | pronom | Par ici | espace_proprietes_spatiales › direction_orientation › orientation | null | 11 | — | C4-0 |
| 231 | `v_409_s2` | こっち | pronom | Moi, mon camp | null | null | 11 | — | C2-0, C4-0 |
| 232 | `v_410_s1` | この | determinant | Ce … -ci | null | null | 11 | — | C2-0, C4-0 |
| 233 | `v_411_s1` | これ | pronom | Ceci | null | null | 11 | — | C2-0, C4-0 |
| 234 | `v_412_s1` | こんな | determinant | Ce genre de | null | null | 11 | — | C2-0, C4-0 |
| 235 | `v_413_s1` | じゃあ | conjonction | Alors | null | null | 23 | — | C2-0, C4-0, C7-d, C10-a |
| 236 | `v_413_s2` | じゃあ | conjonction | Eh bien | null | null | 23 | — | C2-0, C4-0, C10-a |
| 237 | `v_414_s1` | そっち | pronom | Par là | espace_proprietes_spatiales › direction_orientation › orientation | null | 11 | — | C4-0 |
| 238 | `v_414_s2` | そっち | pronom | Toi, ton camp | null | null | 11 | — | C2-0, C4-0 |
| 239 | `v_415_s1` | その | determinant | Ce … -là | null | null | 11 | — | C2-0, C4-0 |
| 240 | `v_416_s1` | それから | conjonction | Ensuite | null | null | 23 | — | C2-0, C4-0, C10-a |
| 241 | `v_417_s1` | それでは | conjonction | Dans ce cas | null | null | 23 | — | C2-0, C4-0 |
| 242 | `v_417_s2` | それでは | conjonction | Alors | null | null | 23 | — | C2-0, C4-0, C7-d |
| 243 | `v_417_s3` | それでは | conjonction | Sur ce | null | null | 23 | — | C2-0, C4-0 |
| 244 | `v_418_s1` | では | conjonction | Dans ce cas | null | null | 23 | — | C2-0, C4-0, C10-a |
| 245 | `v_418_s2` | では | conjonction | Eh bien | null | null | 23 | — | C2-0, C4-0, C10-a |
| 246 | `v_418_s3` | では | conjonction | Alors | null | null | 23 | — | C2-0, C4-0, C7-d, C10-a |
| 247 | `v_419_s1` | 向こう | nom | En face | espace_proprietes_spatiales › position_localisation | lieu | 10 | — | C7-b |
| 248 | `v_420_s1` | いい | adjectif_i | Bon | null | propriete | 00 | categorie-nulle | C3-b, C7-d, C7-c |
| 249 | `v_421_s1` | いろいろ | adjectif_na | Divers | null | propriete | 22 | categorie-nulle | C5-b, C7-c, C10-a |
| 250 | `v_422_s1` | うるさい | adjectif_i | Bruyant | etre_humain › sens_perception › ouie | propriete | 17 | — | C1-h |
| 251 | `v_423_s1` | かわいい | adjectif_i | Mignon | etre_humain › emotions_sentiments › affection | propriete | 00 | — | C1-h |
| 252 | `v_424_s2` | きれい | adjectif_na | Propre | habitat_vie_domestique › entretien_domestique › nettoyage | propriete | 00 | — | C5-0, C1-g, C1-h |
| 253 | `v_425_s1` | だんだん | adverbe | Graduellement | null | concept_abstrait | 21 | categorie-nulle | C3-0, C7-c, C10-a |
| 254 | `v_426_s1` | つまらない | adjectif_i | Ennuyeux | etre_humain › psychologie_esprit › attention | propriete | 16 | — | C1-h |
| 255 | `v_427_s1` | まずい | adjectif_i | Mauvais (au goût) | alimentation_cuisine › gouts_alimentaires | propriete | 02 | — | C1-a, C1-h, C7-c |
| 256 | `v_428_s2` | 丈夫 | adjectif_na | En bonne santé | sante_medecine › sante_etats_pathologiques | propriete | 17 | — | C1-h |
| 257 | `v_429_s1` | 上手 | adjectif_na | Doué | etre_humain › capacites_aptitudes › habilete | propriete | 16 | — | C7-c |
| 258 | `v_430_s1` | 下手 | adjectif_na | Maladroit | etre_humain › capacites_aptitudes › habilete | propriete | 16 | — | C5-b |
| 259 | `v_432_s1` | 便利 | adjectif_na | Pratique | null | propriete | 16 | categorie-nulle | C5-0 |
| 260 | `v_433_s1` | 元気 | adjectif_na | En forme | etre_humain › etats_besoins_physiques › fatigue_energie_physique | etat | 16 | — | C1-h |
| 261 | `v_434_s1` | 危ない | adjectif_i | Dangereux | null | propriete | 16 | categorie-nulle | RES |
| 262 | `v_435_s1` | 厚い | adjectif_i | Épais | espace_proprietes_spatiales › dimensions | propriete | 15 | — | RES |
| 263 | `v_438_s1` | 同じ | determinant | Même | null | propriete | 22 | categorie-nulle | C7-c, C10-a |
| 264 | `v_439_s1` | 夕方 | nom | Fin d'après-midi | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 265 | `v_441_s1` | 大きな | determinant | Grand | espace_proprietes_spatiales › dimensions › taille | propriete | 15 | — | RES |
| 266 | `v_442_s1` | 大切 | adjectif_na | Important | null | propriete | 16 | categorie-nulle | C5-0 |
| 267 | `v_443_s1` | 太い | adjectif_i | Gros | espace_proprietes_spatiales › dimensions | propriete | 15 | — | RES |
| 268 | `v_447_s1` | 少ない | adjectif_i | Peu nombreux | nombres_quantification › quantite › petite_quantite | propriete | 24 | — | C10-a |
| 269 | `v_448_s1` | 広い | adjectif_i | Spacieux | espace_proprietes_spatiales › dimensions | propriete | 15 | — | RES |
| 270 | `v_451_s1` | 強い | adjectif_i | Fort | null | propriete | 17 | categorie-nulle | C7-c |
| 271 | `v_452_s1` | 悪い | adjectif_i | Mauvais | null | propriete | 16 | categorie-nulle | C1-a, RES |
| 272 | `v_455_s1` | 明るい | adjectif_i | Lumineux | couleurs › teintes_nuances › clair_fonce | propriete | 00 | — | C1-g |
| 273 | `v_455_s2` | 明るい | adjectif_i | Enjoué | etre_humain › psychologie_esprit › etats_psychologiques | propriete | 00 | — | C1-g |
| 274 | `v_456_s1` | 易しい | adjectif_i | Facile | null | propriete | 16 | categorie-nulle | C5-0 |
| 275 | `v_459_s1` | 朝ご飯 | nom | Petit-déjeuner | alimentation_cuisine › repas › petit_dejeuner | evenement | 00 | — | C8-a, C8-c, RES |
| 276 | `v_461_s1` | 汚い | adjectif_i | Sale | habitat_vie_domestique › entretien_domestique › nettoyage | propriete | 17 | — | C1-h |
| 277 | `v_463_s1` | 狭い | adjectif_i | Étroit | espace_proprietes_spatiales › dimensions | propriete | 15 | — | RES |
| 278 | `v_464_s1` | 甘い | adjectif_i | Sucré | alimentation_cuisine › gouts_alimentaires › sucre | propriete | 02 | — | C1-h |
| 279 | `v_465_s1` | 痛い | adjectif_i | Douloureux | sante_medecine › symptomes_douleur › douleur | propriete | 01 | — | RES |
| 280 | `v_468_s1` | 短い | adjectif_i | Court | espace_proprietes_spatiales › dimensions › longueur | propriete | 15 | — | RES |
| 281 | `v_469_s1` | 細い | adjectif_i | Mince | espace_proprietes_spatiales › dimensions | propriete | 15 | — | RES |
| 282 | `v_471_s1` | 結構 | adverbe | Assez | null | null | 24 | — | C2-0, C4-0 |
| 283 | `v_471_s2` | 結構 | adverbe | Non merci | null | null | 24 | — | C2-0, C4-0 |
| 284 | `v_473_s2` | 緑 | nom | Verdure | monde_naturel › vegetation | groupe_collectif | 15 | — | C1-b, C1-g |
| 285 | `v_474_s1` | 美味しい | adjectif_i | Délicieux | alimentation_cuisine › gouts_alimentaires | propriete | 00 | — | C1-h, C7-c |
| 286 | `v_476_s1` | 若い | adjectif_i | Jeune | etre_humain › cycle_de_vie | propriete | 17 | — | C1-g, C3-d |
| 287 | `v_477_s1` | 薄い | adjectif_i | Mince | espace_proprietes_spatiales › dimensions | propriete | 15 | — | RES |
| 288 | `v_477_s2` | 薄い | adjectif_i | Pâle | couleurs › teintes_nuances › intensite | propriete | 15 | — | C1-b, C1-g |
| 289 | `v_477_s3` | 薄い | adjectif_i | Léger (goût) | alimentation_cuisine › gouts_alimentaires | propriete | 15 | — | C1-a, C1-b, C1-g |
| 290 | `v_481_s1` | 辛い | adjectif_i | Épicé | alimentation_cuisine › gouts_alimentaires › epice | propriete | 02 | — | C1-h |
| 291 | `v_483_s2` | 遅い | adjectif_i | En retard | temps | propriete | 17 | — | C1-g |
| 292 | `v_484_s2` | 重い | adjectif_i | Grave | null | propriete | 15 | categorie-nulle | C5-b |
| 293 | `v_485_s1` | 長い | adjectif_i | Long | espace_proprietes_spatiales › dimensions › longueur | propriete | 15 | — | RES |
| 294 | `v_486_s1` | 難しい | adjectif_i | Difficile | null | propriete | 16 | categorie-nulle | C5-0 |
| 295 | `v_494_s1` | いつも | adverbe | Toujours | temps › frequence › frequent | concept_abstrait | 21 | — | C3-0, C1-h, C7-c |
| 296 | `v_495_s1` | 大変 | adjectif_na | Très | null | null | 00 | — | C2-0, C4-0, C7-e, RES |
| 297 | `v_495_s2` | 大変 | adjectif_na | Difficile | null | propriete | 00 | categorie-nulle | C5-0, RES |
| 298 | `v_496_s1` | ちょうど | adverbe | Exactement | null | propriete | 24 | categorie-nulle | C5-0 |
| 299 | `v_497_s1` | ちょっと | adverbe | Un peu | nombres_quantification › quantite › petite_quantite | null | 24 | — | C4-0, C1-a, C7-d, C10-a |
| 300 | `v_497_s2` | ちょっと | adverbe | Un instant | temps › duree | concept_abstrait | 24 | — | C3-0, C3-d, C10-a |
| 301 | `v_498_s1` | とても | adverbe | Très | null | null | 24 | — | C2-0, C4-0, C10-a |
| 302 | `v_499_s1` | どうも | adverbe | Merci | null | null | 23 | — | C2-0, C4-0 |
| 303 | `v_499_s2` | どうも | adverbe | Vraiment | null | null | 23 | — | C2-0, C4-0 |
| 304 | `v_500_s1` | また | adverbe | À nouveau | null | concept_abstrait | 21 | categorie-nulle | C3-0 |
| 305 | `v_500_s2` | また | adverbe | Aussi | null | null | 21 | categorie-nulle, type-nul | C7-c, C10-a, RES |
| 306 | `v_501_s1` | まだ | adverbe | Encore | temps › relations_temporelles | concept_abstrait | 21 | — | C3-0, C10-a |
| 307 | `v_501_s2` | まだ | adverbe | Pas encore | temps › relations_temporelles | concept_abstrait | 21 | — | C3-0 |
| 308 | `v_502_s1` | もう | adverbe | Déjà | temps › relations_temporelles | concept_abstrait | 21 | — | C3-0, C10-a |
| 309 | `v_502_s2` | もう | adverbe | Ne… plus | temps › relations_temporelles | concept_abstrait | 21 | — | C3-0, C7-c |
| 310 | `v_503_s1` | もう一度 | adverbe | Encore une fois | null | concept_abstrait | 21 | categorie-nulle | C3-0 |
| 311 | `v_504_s1` | ゆっくり | adverbe | Lentement | espace_proprietes_spatiales › vitesse | propriete | 22 | — | C1-h |
| 312 | `v_506_s1` | よく | adverbe | Souvent | temps › frequence › frequent | concept_abstrait | 21 | — | C3-0, C1-h |
| 313 | `v_506_s2` | よく | adverbe | Bien | null | propriete | 21 | categorie-nulle | C7-c |
| 314 | `v_509_s1` | 少し | adverbe | Une petite quantité | nombres_quantification › quantite › petite_quantite | null | 24 | — | C4-0, C10-a |
| 315 | `v_509_s2` | 少し | adverbe | Un peu | null | null | 24 | — | C2-0, C4-0, C1-a, C7-d |
| 316 | `v_509_s3` | 少し | adverbe | Un court instant | temps › duree | concept_abstrait | 24 | — | C3-0, C3-d |
| 317 | `v_510_s1` | 本当 | nom | Vérité | null | concept_abstrait | 00 | categorie-nulle | C3-0, C5-0 |
| 318 | `v_511_s1` | 問題 | nom | Problème | null | concept_abstrait | 20 | categorie-nulle | C3-0 |
| 319 | `v_511_s2` | 問題 | nom | Question (d'examen) | education_apprentissage › evaluation_scolaire › examens | information_contenu | 20 | — | C1-a, C1-g |
| 320 | `v_512_s1` | 大丈夫 | adjectif_na | Ça va | null | etat | 16 | categorie-nulle | C7-c |
| 321 | `v_513_s1` | 意味 | nom | Sens | communication_langage › comprehension_linguistique | information_contenu | 06 | — | C1-g |
| 322 | `v_515_s1` | あまり | adverbe | Pas tellement | null | null | 24 | — | C2-0, C4-0 |
| 323 | `v_516_s1` | ある | verbe | Y avoir | null | etat | 20 | categorie-nulle | C10-a |
| 324 | `v_517_s1` | 一番 | adverbe | Le plus | null | null | 24 | — | C2-0, C4-0 |
| 325 | `v_517_s2` | 一番 | adverbe | Numéro un | nombres_quantification › nombres › ordinaux | concept_abstrait | 24 | — | C3-0 |
| 326 | `v_518_s1` | すぐに | adverbe | Tout de suite | temps › relations_temporelles | concept_abstrait | 21 | — | C3-0, C7-c, C10-a |
| 327 | `v_519_s1` | たいてい | adverbe | Généralement | temps › frequence › frequent | concept_abstrait | 21 | — | C3-0, C1-h, C7-c |
| 328 | `v_520_s1` | たくさん | adverbe | Beaucoup | nombres_quantification › quantite › grande_quantite | null | 24 | — | C4-0 |
| 329 | `v_521_s1` | たぶん | adverbe | Peut-être | null | null | 22 | categorie-nulle, type-nul | C5-0, C10-a |
| 330 | `v_523_s1` | 出来る | verbe | Pouvoir | etre_humain › capacites_aptitudes › aptitude | etat | 20 | — | C5-0, C10-a |
| 331 | `v_523_s2` | 出来る | verbe | Être achevé / prêt | null | resultat | 20 | categorie-nulle | C3-c |
| 332 | `v_524_s1` | なる | verbe | Devenir | null | evenement | 20 | categorie-nulle | C10-a |
| 333 | `v_525_s1` | まっすぐ | adverbe | Tout droit | espace_proprietes_spatiales › parcours_trajectoire | propriete | 22 | — | C1-h, C7-c |
| 334 | `v_527_s1` | 上げる | verbe | Donner | relations_sociales › interactions_sociales | action | 19 | — | C1-a, C1-g, C1-h, C1-d, C10-a |
| 335 | `v_527_s2` | 上げる | verbe | Lever | espace_proprietes_spatiales › mouvement_deplacement › monter_descendre | action | 19 | — | C1-h |
| 336 | `v_528_s1` | 並ぶ | verbe | Faire la queue | null | action | 18 | categorie-nulle | C10-a |
| 337 | `v_528_s2` | 並ぶ | verbe | Être aligné | espace_proprietes_spatiales › position_localisation | etat | 18 | — | C3-e |
| 338 | `v_529_s1` | 並べる | verbe | Aligner | espace_proprietes_spatiales › position_localisation | action | 18 | — | C1-h, C3-e, C10-a |
| 339 | `v_531_s1` | 住む | verbe | Habiter | habitat_vie_domestique › logements | action | 03 | — | C1-b, C1-h |
| 340 | `v_532_s2` | 作る | verbe | Préparer (un repas) | alimentation_cuisine › cuisine_preparation | action | 18 | — | C1-h |
| 341 | `v_533_s1` | 借りる | verbe | Emprunter | null | action | 19 | categorie-nulle | C10-a |
| 342 | `v_534_s1` | 働く | verbe | Travailler | travail_vie_professionnelle › travail_emploi › activite_professionnelle | action | 19 | — | C1-g, C1-h |
| 343 | `v_535_s1` | 入れる | verbe | Mettre dans | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | 18 | — | C1-h |
| 344 | `v_536_s1` | 出す | verbe | Sortir | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | 18 | — | C1-h |
| 345 | `v_536_s2` | 出す | verbe | Envoyer (du courrier) | communication_langage › communication › transmission | action | 18 | — | C1-g, C1-h |
| 346 | `v_540_s1` | 初めて | adverbe | Pour la première fois | temps › chronologie › succession | concept_abstrait | 21 | — | C3-0, C10-a |
| 347 | `v_541_s1` | 取る | verbe | Prendre | null | action | 18 | categorie-nulle | C1-a, C3-b |
| 348 | `v_546_s1` | 大体 | adverbe | À peu près | nombres_quantification › approximation_quantitative | propriete | 24 | — | C5-0, C1-g |
| 349 | `v_546_s2` | 大体 | adverbe | En général | temps › frequence › frequent | concept_abstrait | 24 | — | C3-0, C1-g |
| 350 | `v_550_s1` | 帰る | verbe | Rentrer | espace_proprietes_spatiales › mouvement_deplacement › aller_venir | action | 04 | — | C1-h |
| 351 | `v_554_s1` | 時々 | adverbe | Parfois | temps › frequence › occasionnel | concept_abstrait | 21 | — | C3-0, C1-h |
| 352 | `v_556_s1` | 書く | verbe | Écrire | communication_langage › ecriture › ecrire | action | 06 | — | C1-h, C3-d |
| 353 | `v_557_s1` | 止まる | verbe | S'arrêter | espace_proprietes_spatiales › mouvement_deplacement | evenement | 04 | — | C1-h |
| 354 | `v_559_s1` | 浴びる | verbe | Prendre (une douche) | etre_humain › hygiene_soins_personnels › toilette_corporelle | action | 00 | — | C1-a, C3-b, C1-h |
| 355 | `v_559_s2` | 浴びる | verbe | Recevoir (de la lumière, des acclamations) | etre_humain › sens_perception › toucher_sensations | action | 00 | — | C1-h, C3-d |
| 356 | `v_560_s1` | 消える | verbe | S'éteindre | null | evenement | 18 | categorie-nulle | C3-e, C10-a |
| 357 | `v_561_s1` | 消す | verbe | Éteindre | null | action | 18 | categorie-nulle | C3-e, C10-a |
| 358 | `v_561_s2` | 消す | verbe | Effacer | communication_langage › ecriture | action | 18 | — | C1-h |
| 359 | `v_562_s1` | 渡す | verbe | Remettre | null | action | 19 | categorie-nulle | C10-a |
| 360 | `v_562_s2` | 渡す | verbe | Faire traverser | espace_proprietes_spatiales › parcours_trajectoire | action | 19 | — | C1-h, C10-a |
| 361 | `v_563_s1` | 渡る | verbe | Traverser | espace_proprietes_spatiales › parcours_trajectoire | action | 04 | — | C1-h |
| 362 | `v_564_s1` | 無くす | verbe | Perdre (un objet) | null | action | 00 | categorie-nulle | C9-a |
| 363 | `v_565_s1` | 着く | verbe | Arriver | espace_proprietes_spatiales › mouvement_deplacement › aller_venir | action | 04 | — | C1-h |
| 364 | `v_566_s1` | 着る | verbe | Mettre (un vêtement) | habillement_accessoires_personnels › vetements | action | 05 | — | C1-a |
| 365 | `v_568_s1` | 立つ | verbe | Se lever | null | action | 19 | categorie-nulle | C1-a |
| 366 | `v_570_s1` | 練習 | nom | Entraînement | education_apprentissage › apprentissage › exercices | action | 06 | — | C1-g, C5-b |
| 367 | `v_571_s1` | 置く | verbe | Poser | espace_proprietes_spatiales › position_localisation | action | 18 | — | C1-h |
| 368 | `v_573_s1` | 要る | verbe | Avoir besoin de | null | etat | 20 | categorie-nulle | C5-0 |
| 369 | `v_574_s1` | 読む | verbe | Lire | communication_langage › lecture › lire | action | 06 | — | C1-h |
| 370 | `v_575_s1` | 貸す | verbe | Prêter | null | action | 19 | categorie-nulle | C10-a |
| 371 | `v_577_s1` | 起きる | verbe | Se réveiller | etre_humain › etats_besoins_physiques › sommeil_repos | evenement | 19 | — | C1-f |
| 372 | `v_577_s2` | 起きる | verbe | Se lever | etre_humain › etats_besoins_physiques › sommeil_repos | action | 19 | — | C1-a, C1-h |
| 373 | `v_579_s1` | 閉まる | verbe | Se fermer | null | evenement | 18 | categorie-nulle | C3-e, C10-a |
| 374 | `v_580_s1` | 開ける | verbe | Ouvrir | null | action | 18 | categorie-nulle | C1-a, C3-e, C10-a |
| 375 | `v_581_s1` | あなた | pronom | Vous | null | personne | 11 | — | C2-0 |
| 376 | `v_584_s1` | いいえ | interjection | Non | null | null | 23 | — | C2-0, C4-0, C10-a |
| 377 | `v_584_s2` | いいえ | interjection | De rien | null | null | 23 | — | C2-0, C4-0 |
| 378 | `v_585_s1` | いくつ | pronom | Combien | nombres_quantification | null | 11 | — | C4-0, C1-a |
| 379 | `v_586_s1` | ええ | interjection | Oui | null | null | 23 | — | C2-0, C4-0 |
| 380 | `v_589_s1` | お手洗い | nom | Toilettes | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu | 03 | — | C8-c |
| 381 | `v_593_s1` | しかし | conjonction | Cependant | null | null | 23 | — | C2-0, C4-0, C10-a |
| 382 | `v_594_s1` | 醤油 | nom | Sauce soja | alimentation_cuisine › aliments › condiments_assaisonnements | substance_matiere | 00 | — | C8-a, C8-c, C8-b, RES |
| 383 | `v_595_s1` | じゃ | interjection | Dans ce cas | null | null | 23 | — | C2-0, C4-0 |
| 384 | `v_595_s2` | じゃ | interjection | Bon | null | null | 23 | — | C2-0, C4-0, C3-b, C7-d |
| 385 | `v_595_s3` | じゃ | interjection | Alors | null | null | 23 | — | C2-0, C4-0, C7-d |
| 386 | `v_596_s1` | そうして | conjonction | Et puis | null | null | 23 | — | C2-0, C4-0, C10-a |
| 387 | `v_597_s1` | 縦 | nom | Sens vertical | espace_proprietes_spatiales › dimensions › hauteur | propriete | 10 | — | C1-f |
| 388 | `v_599_s1` | でも | conjonction | Mais | null | null | 23 | — | C2-0, C4-0 |
| 389 | `v_600_s1` | どうぞ | adverbe | S'il vous plaît | null | null | 23 | — | C2-0, C4-0 |
| 390 | `v_605_s1` | 他 | nom | Autre | null | concept_abstrait | 22 | categorie-nulle | C3-0, C10-a |
| 391 | `v_606_s1` | 皆 | pronom | Tout le monde | null | groupe_collectif | 11 | categorie-nulle | C7-c |
| 392 | `v_607_s1` | もっと | adverbe | Plus | null | null | 24 | — | C2-0, C4-0 |
| 393 | `v_608_s1` | やる | verbe | Faire | null | action | 20 | categorie-nulle | C10-a |
| 394 | `v_608_s2` | やる | verbe | Donner (à des plantes, des animaux) | null | action | 20 | categorie-nulle | C1-a, C1-d |
| 395 | `v_612_s1` | シャワー | nom | Douche | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | objet_artefact | 03 | — | C3-d, C8-c, C8-b |
| 396 | `v_616_s1` | テープレコーダー | nom | Magnétophone | technologie › appareils_electroniques › appareils_electroniques | objet_artefact | 08 | — | C1-f |
| 397 | `v_617_s1` | トイレ | nom | Toilettes | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu | 03 | — | C8-c |
| 398 | `v_619_s1` | バター | nom | Beurre | alimentation_cuisine › aliments › produits_laitiers | substance_matiere | 02 | — | C8-b |
| 399 | `v_621_s1` | プール | nom | Piscine | sports › installations_equipements_sportifs_specialises | lieu | 09 | — | C1-g |
| 400 | `v_623_s1` | ページ | nom | Page | communication_langage › lecture | objet_artefact | 14 | — | C1-g |
| 401 | `v_627_s2` | 一人 | nom | Seul | null | etat | 14 | categorie-nulle | C7-c |
| 402 | `v_628_s1` | 一緒 | nom | Ensemble | relations_sociales › interactions_sociales | etat | 22 | — | C7-c |
| 403 | `v_631_s1` | 二人 | nom | Deux personnes | nombres_quantification › comptage_compteurs › personnes | quantite_valeur | 14 | — | C7-c |
| 404 | `v_634_s1` | 休み | nom | Repos | temps › moments_periodes | concept_abstrait | 13 | — | C3-0 |
| 405 | `v_635_s1` | 休む | verbe | Se reposer | etre_humain › etats_besoins_physiques › sommeil_repos | action | 19 | — | C1-h |
| 406 | `v_636_s1` | 作文 | nom | Rédaction | education_apprentissage › apprentissage › exercices | information_contenu | 06 | — | C1-f |
| 407 | `v_637_s1` | 使う | verbe | Utiliser | null | action | 18 | categorie-nulle | C7-c |
| 408 | `v_638_s1` | 兄弟 | nom | Frères et sœurs | relations_sociales › famille_parente › fratrie | groupe_collectif | 01 | — | C3-d, C7-c |
| 409 | `v_639_s1` | 全部 | adverbe | Tout | nombres_quantification › totalite_partie › totalite | null | 24 | — | C4-0 |
| 410 | `v_642_s1` | 出る | verbe | Sortir | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | 04 | — | C1-h |
| 411 | `v_644_s1` | 切符 | nom | Billet | transport_mobilite › utilisation_des_transports | objet_artefact | 04 | — | C8-c, C1-f |
| 412 | `v_645_s1` | 初め | nom | Début | temps › chronologie › debut_fin | concept_abstrait | 20 | — | C3-0 |
| 413 | `v_649_s1` | 午後 | nom | Après-midi | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 414 | `v_650_s1` | 半分 | nom | Moitié | nombres_quantification › proportions › fraction | quantite_valeur | 14 | — | C1-f |
| 415 | `v_654_s1` | 多い | adjectif_i | Nombreux | nombres_quantification › quantite › grande_quantite | propriete | 24 | — | C10-a |
| 416 | `v_656_s1` | 奥さん | nom | Épouse (d'autrui) | relations_sociales › couple_relations_intimes › mariage | personne | 01 | — | C7-c |
| 417 | `v_658_s1` | 女の子 | nom | Fille | etre_humain › cycle_de_vie › enfance | personne | 01 | — | C1-g, C1-h |
| 418 | `v_659_s1` | 嫌 | adjectif_na | Désagréable | etre_humain › psychologie_esprit › preferences | propriete | 16 | — | C10-a, RES |
| 419 | `v_662_s1` | 廊下 | nom | Couloir | environnement_construit_espaces_humains › elements_architecturaux | lieu | 03 | — | C8-b |
| 420 | `v_663_s1` | 後 | nom | Après | temps › chronologie › avant_apres | concept_abstrait | 13 | — | C3-0, C7-c, C1-f |
| 421 | `v_663_s2` | 後 | nom | Derrière | espace_proprietes_spatiales › position_localisation › devant_derriere | lieu | 13 | — | C1-g |
| 422 | `v_663_s3` | 後 | nom | Le reste | nombres_quantification › totalite_partie › reste | concept_abstrait | 13 | — | C3-0, C1-g |
| 423 | `v_664_s2` | 所 | nom | Partie | null | concept_abstrait | 20 | categorie-nulle | C3-0 |
| 424 | `v_667_s1` | 方 | nom | Personne | null | personne | 01 | categorie-nulle | C7-c |
| 425 | `v_670_s1` | 昼 | nom | Midi | temps › moments_periodes › parties_de_la_journee | concept_abstrait | 12 | — | C3-0 |
| 426 | `v_670_s2` | 昼 | nom | Déjeuner (repas) | alimentation_cuisine › repas › dejeuner | evenement | 12 | — | C1-b, C1-g |
| 427 | `v_675_s1` | 次 | nom | Suivant | null | concept_abstrait | 20 | categorie-nulle | C3-0, C7-c, C10-a |
| 428 | `v_677_s1` | 水 | nom | Eau | alimentation_cuisine › boissons › eau | substance_matiere | 02 | — | C8-c |
| 429 | `v_681_s1` | 温い | adjectif_i | Tiède | etre_humain › sens_perception › toucher_sensations | propriete | 17 | — | C1-f |
| 430 | `v_683_s1` | 灰皿 | nom | Cendrier | habitat_vie_domestique › accessoires_domestiques | objet_artefact | 19 | — | C1-h |
| 431 | `v_685_s1` | 生活 | nom | Mode de vie | null | concept_abstrait | 19 | categorie-nulle | C3-0 |
| 432 | `v_687_s1` | 皆さん | nom | Tout le monde | null | groupe_collectif | 01 | categorie-nulle | C7-b, C7-c |
| 433 | `v_688_s1` | 私 | pronom | Je | null | personne | 11 | — | C2-0 |
| 434 | `v_691_s1` | 自分 | pronom | Soi-même | null | personne | 11 | categorie-nulle | C7-c |
| 435 | `v_702_s1` | 質問 | nom | Question | communication_langage › parole_conversation › question | information_contenu | 08 | — | C1-a |
| 436 | `v_704_s1` | 近く | nom | Environs | espace_proprietes_spatiales › distance_proximite › proximite | lieu | 10 | — | RES |
| 437 | `v_704_s2` | 近く | nom | Prochainement | temps › moments_periodes › futur | concept_abstrait | 10 | — | C3-0, C1-b, C7-b, RES |
| 438 | `v_709_s1` | 閉める | verbe | Fermer | null | action | 18 | categorie-nulle | C3-e, C10-a |
| 439 | `v_710_s1` | 開く | verbe | S'ouvrir | null | evenement | 18 | categorie-nulle | C3-e, C10-a |
| 440 | `v_713_s1` | 電気 | nom | Électricité | sciences › physique › electricite_magnetisme | null | 03 | type-nul | C1-g |
| 441 | `v_713_s2` | 電気 | nom | Lumière | habitat_vie_domestique › equipements_domestiques › equipements_fonctionnels | objet_artefact | 03 | — | C1-g, C8-c |
| 442 | `v_718_s1` | レジ袋 | nom | Sac de caisse | habillement_accessoires_personnels › sacs_contenants_personnels › sacs | objet_artefact | 05 | — | C1-b, C1-g, C8-c |
| 443 | `v_719_s1` | ポイントカード | nom | Carte de fidélité | economie_commerce › marketing_promotion | objet_artefact | 05 | — | C8-c |

## Annexe B · Détail des détections, par règle

Les populations imposées (C2-0, C3-0, C4-0, C5-0) ne sont pas détaillées : l'annexe A les donne.

### C1-a

- même traduction principale « Chaud », catégories différentes : v_8_s1 etre_humain › sens_perception › toucher_sensations \| v_274_s1 monde_naturel › meteo › conditions_atmospheriques \| v_277_s1 etre_humain › sens_perception › toucher_sensations
- même traduction principale « Ouvrir (un parapluie) », catégories différentes : v_50_s1 habillement_accessoires_personnels › accessoires_vestimentaires \| v_580_s1 null
- même traduction principale « Léger », catégories différentes : v_62_s1 null \| v_477_s3 alimentation_cuisine › gouts_alimentaires
- même traduction principale « Mettre (en bas du corps) », catégories différentes : v_68_s1 habillement_accessoires_personnels › vetements › bas \| v_164_s2 habillement_accessoires_personnels › accessoires_vestimentaires \| v_566_s1 habillement_accessoires_personnels › vetements
- même traduction principale « Café (boisson) », catégories différentes : v_95_s1 alimentation_cuisine › boissons › boissons_chaudes \| v_101_s1 alimentation_cuisine › restauration › cafes
- même traduction principale « Cuisine (pièce) », catégories différentes : v_100_s1 habitat_vie_domestique › espaces_domestiques › cuisine \| v_104_s1 alimentation_cuisine › cuisine_preparation
- même traduction principale « Demander », catégories différentes : v_116_s1 relations_sociales › interactions_sociales \| v_175_s2 communication_langage › parole_conversation › question
- même traduction principale « Prendre (un transport) », catégories différentes : v_149_s1 transport_mobilite › utilisation_des_transports \| v_163_s1 null \| v_171_s1 arts_creation › arts_visuels \| v_541_s1 null \| v_559_s1 etre_humain › hygiene_soins_personnels › toilette_corporelle
- même traduction principale « Combien », catégories différentes : v_179_s1 economie_commerce › prix_valeur_economique › prix \| v_585_s1 nombres_quantification
- même traduction principale « Entrée », catégories différentes : v_214_s1 environnement_construit_espaces_humains › elements_architecturaux \| v_248_s1 habitat_vie_domestique › espaces_domestiques › entree
- même traduction principale « Froid (au toucher) », catégories différentes : v_265_s1 etre_humain › sens_perception › toucher_sensations \| v_265_s2 null \| v_270_s1 monde_naturel › meteo › conditions_atmospheriques
- même traduction principale « Temps (qu'il fait) », catégories différentes : v_269_s1 monde_naturel › meteo › conditions_atmospheriques \| v_321_s1 temps › duree
- même traduction principale « Avant (plus loin) », catégories différentes : v_347_s1 espace_proprietes_spatiales › position_localisation › devant_derriere \| v_348_s2 temps › chronologie › avant_apres
- même traduction principale « Où », catégories différentes : v_395_s1 espace_proprietes_spatiales › position_localisation \| v_396_s2 espace_proprietes_spatiales › direction_orientation › orientation
- même traduction principale « Là-bas », catégories différentes : v_403_s1 espace_proprietes_spatiales › position_localisation \| v_404_s1 espace_proprietes_spatiales › direction_orientation › orientation
- même traduction principale « Mauvais (au goût) », catégories différentes : v_427_s1 alimentation_cuisine › gouts_alimentaires \| v_452_s1 null
- même traduction principale « Un peu », catégories différentes : v_497_s1 nombres_quantification › quantite › petite_quantite \| v_509_s2 null
- même traduction principale « Question (d'examen) », catégories différentes : v_511_s2 education_apprentissage › evaluation_scolaire › examens \| v_702_s1 communication_langage › parole_conversation › question
- même traduction principale « Donner », catégories différentes : v_527_s1 relations_sociales › interactions_sociales \| v_608_s2 null
- même traduction principale « Se lever », catégories différentes : v_568_s1 null \| v_577_s2 etre_humain › etats_besoins_physiques › sommeil_repos

### C1-b

- `v_11_s2` おじいさん « Vieil homme » : famille source « personnes_famille / famille » : niveau 1 modal relations_sociales (23/28), ce sens est en etre_humain › cycle_de_vie › vieillissement
- `v_12_s2` おじさん « Monsieur » : famille source « personnes_famille / famille » : niveau 1 modal relations_sociales (23/28), ce sens est en etre_humain › cycle_de_vie › age_adulte
- `v_13_s2` おばあさん « Vieille dame » : famille source « personnes_famille / famille » : niveau 1 modal relations_sociales (23/28), ce sens est en etre_humain › cycle_de_vie › vieillissement
- `v_14_s2` おばさん « Madame » : famille source « personnes_famille / famille » : niveau 1 modal relations_sociales (23/28), ce sens est en etre_humain › cycle_de_vie › age_adulte
- `v_31_s1` 子供 « Enfant » : famille source « personnes_famille / famille » : niveau 1 modal relations_sociales (23/28), ce sens est en etre_humain › cycle_de_vie › enfance
- `v_74_s2` ボタン « Bouton (d'appareil) » : famille source « vetements / accessoires » : niveau 1 modal habillement_accessoires_personnels (5/6), ce sens est en technologie › appareils_electroniques
- `v_100_s1` 台所 « Cuisine (pièce) » : famille source « maison_quotidien / cuisine » : niveau 1 modal alimentation_cuisine (4/5), ce sens est en habitat_vie_domestique › espaces_domestiques › cuisine
- `v_175_s1` 聞く « Écouter » : famille source « communication / conversation » : niveau 1 modal communication_langage (4/5), ce sens est en etre_humain › sens_perception › ouie
- `v_221_s1` 洗う « Laver » : famille source « actions_generiques / vie_quotidienne » : niveau 1 modal etre_humain (6/8), ce sens est en habitat_vie_domestique › entretien_domestique › nettoyage
- `v_316_s2` 年 « Âge » : famille source « temps_calendrier / periodes » : niveau 1 modal temps (16/17), ce sens est en etre_humain › cycle_de_vie
- `v_347_s2` 先 « D'abord » : famille source « position_direction / position » : niveau 1 modal espace_proprietes_spatiales (13/16), ce sens est en temps › chronologie › avant_apres
- `v_348_s2` 前 « Avant (dans le temps) » : famille source « position_direction / position » : niveau 1 modal espace_proprietes_spatiales (13/16), ce sens est en temps › chronologie › avant_apres
- `v_473_s2` 緑 « Verdure » : famille source « descriptions_qualites / couleurs » : niveau 1 modal couleurs (14/15), ce sens est en monde_naturel › vegetation
- `v_477_s2` 薄い « Pâle » : famille source « descriptions_qualites / dimension » : niveau 1 modal espace_proprietes_spatiales (8/10), ce sens est en couleurs › teintes_nuances › intensite
- `v_477_s3` 薄い « Léger (goût) » : famille source « descriptions_qualites / dimension » : niveau 1 modal espace_proprietes_spatiales (8/10), ce sens est en alimentation_cuisine › gouts_alimentaires
- `v_531_s1` 住む « Habiter » : famille source « actions_generiques / vie_quotidienne » : niveau 1 modal etre_humain (6/8), ce sens est en habitat_vie_domestique › logements
- `v_670_s2` 昼 « Déjeuner (repas) » : famille source « temps_calendrier / moments_journee » : niveau 1 modal temps (10/11), ce sens est en alimentation_cuisine › repas › dejeuner
- `v_704_s2` 近く « Prochainement » : famille source « position_direction / position » : niveau 1 modal espace_proprietes_spatiales (13/16), ce sens est en temps › moments_periodes › futur
- `v_718_s1` レジ袋 « Sac de caisse » : famille source « achats_argent / commerce » : niveau 1 modal economie_commerce (4/5), ce sens est en habillement_accessoires_personnels › sacs_contenants_personnels › sacs

### C1-g

- `v_4_s1` 暗い « Sombre » : famille source « emotions_sentiments / emotions » (3 sens catégorisés) : seul sens en couleurs
- `v_22_s2` 先生 « Maître » : famille source « ecole_apprentissage / personnes » (4 sens catégorisés) : seul sens en relations_sociales
- `v_66_s1` 飲む « Boire » : famille source « actions_generiques / actions_objets » (5 sens catégorisés) : seul sens en alimentation_cuisine
- `v_74_s2` ボタン « Bouton (d'appareil) » : famille source « vetements / accessoires » (6 sens catégorisés) : seul sens en technologie
- `v_82_s1` 締める « Serrer » : famille source « actions_generiques / actions_objets » (5 sens catégorisés) : seul sens en habillement_accessoires_personnels
- `v_100_s1` 台所 « Cuisine (pièce) » : famille source « maison_quotidien / cuisine » (5 sens catégorisés) : seul sens en habitat_vie_domestique
- `v_116_s1` 頼む « Demander » : famille source « actions_generiques / actions_objets » (5 sens catégorisés) : seul sens en relations_sociales
- `v_116_s2` 頼む « Commander (un plat au restaurant) » : famille source « actions_generiques / actions_objets » (5 sens catégorisés) : seul sens en economie_commerce
- `v_122_s1` 魚 « Poisson (animal) » : famille source « nourriture_boissons / animaux » (2 sens catégorisés) : seul sens en monde_naturel
- `v_122_s2` 魚 « Poisson (aliment) » : famille source « nourriture_boissons / animaux » (2 sens catégorisés) : seul sens en alimentation_cuisine
- `v_130_s2` 引く « Chercher (dans un dictionnaire) » : famille source « actions_generiques / actions_objets » (5 sens catégorisés) : seul sens en communication_langage
- `v_132_s2` 教える « Indiquer » : famille source « ecole_apprentissage / apprentissage » (3 sens catégorisés) : seul sens en communication_langage
- `v_164_s2` かける « Mettre (des lunettes) » : famille source « communication / telephone » (5 sens catégorisés) : seul sens en habillement_accessoires_personnels
- `v_165_s1` カメラ « Appareil photo » : famille source « medias_technologie / photographie » (3 sens catégorisés) : seul sens en technologie
- `v_173_s1` 番号 « Numéro » : famille source « communication / telephone » (5 sens catégorisés) : seul sens en nombres_quantification
- `v_175_s1` 聞く « Écouter » : famille source « communication / conversation » (5 sens catégorisés) : seul sens en etre_humain
- `v_178_s1` 電話 « Téléphone (appareil) » : famille source « communication / telephone » (5 sens catégorisés) : seul sens en technologie
- `v_188_s1` 高い « Haut » : famille source « achats_argent / taille_dimensions » (2 sens catégorisés) : seul sens en espace_proprietes_spatiales
- `v_188_s2` 高い « Cher » : famille source « achats_argent / taille_dimensions » (2 sens catégorisés) : seul sens en economie_commerce
- `v_204_s1` テープ « Ruban adhésif » : famille source « objets / audio » (2 sens catégorisés) : seul sens en habitat_vie_domestique
- `v_204_s2` テープ « Bande magnétique » : famille source « objets / audio » (2 sens catégorisés) : seul sens en technologie
- `v_205_s1` ラジオ « Radio » : famille source « medias_technologie / audio » (2 sens catégorisés) : seul sens en medias
- `v_206_s1` ラジカセ « Radio-cassette » : famille source « medias_technologie / audio » (2 sens catégorisés) : seul sens en technologie
- `v_215_s1` 公園 « Parc » : famille source « lieux / loisirs » (2 sens catégorisés) : seul sens en environnement_construit_espaces_humains
- `v_228_s1` せっけん « Savon » : famille source « maison_quotidien / hygiene » (3 sens catégorisés) : seul sens en etre_humain
- `v_233_s1` ポスト « Boîte aux lettres » : famille source « maison_quotidien / objets_maison » (5 sens catégorisés) : seul sens en communication_langage
- `v_237_s1` 紙 « Papier » : famille source « maison_quotidien / objets_maison » (5 sens catégorisés) : seul sens en matieres_materiaux
- `v_239_s1` 交差点 « Carrefour » : famille source « maison_quotidien / ville » (3 sens catégorisés) : seul sens en environnement_construit_espaces_humains
- `v_240_s1` 交番 « Poste de police » : famille source « maison_quotidien / batiments » (3 sens catégorisés) : seul sens en droit_justice
- `v_244_s1` 大使館 « Ambassade » : famille source « maison_quotidien / batiments » (3 sens catégorisés) : seul sens en politique_institutions_publiques
- `v_246_s1` 建物 « Bâtiment » : famille source « maison_quotidien / batiments » (3 sens catégorisés) : seul sens en environnement_construit_espaces_humains
- `v_254_s2` 木 « Bois (matière) » : famille source « nature_animaux / plantes » (3 sens catégorisés) : seul sens en matieres_materiaux
- `v_311_s1` 半 « Moitié » : famille source « temps_calendrier / mesures » (2 sens catégorisés) : seul sens en nombres_quantification
- `v_311_s2` 半 « Et demie (heure) » : famille source « temps_calendrier / mesures » (2 sens catégorisés) : seul sens en temps
- `v_316_s2` 年 « Âge » : famille source « temps_calendrier / periodes » (17 sens catégorisés) : seul sens en etre_humain
- `v_424_s2` きれい « Propre » : famille source « descriptions_qualites / appreciation » (3 sens catégorisés) : seul sens en habitat_vie_domestique
- `v_455_s1` 明るい « Lumineux » : famille source « descriptions_qualites / luminosite » (2 sens catégorisés) : seul sens en couleurs
- `v_455_s2` 明るい « Enjoué » : famille source « descriptions_qualites / luminosite » (2 sens catégorisés) : seul sens en etre_humain
- `v_473_s2` 緑 « Verdure » : famille source « descriptions_qualites / couleurs » (15 sens catégorisés) : seul sens en monde_naturel
- `v_476_s1` 若い « Jeune » : famille source « descriptions_qualites / age » (3 sens catégorisés) : seul sens en etre_humain
- `v_477_s2` 薄い « Pâle » : famille source « descriptions_qualites / dimension » (10 sens catégorisés) : seul sens en couleurs
- `v_477_s3` 薄い « Léger (goût) » : famille source « descriptions_qualites / dimension » (10 sens catégorisés) : seul sens en alimentation_cuisine
- `v_483_s2` 遅い « En retard » : famille source « descriptions_qualites / vitesse » (3 sens catégorisés) : seul sens en temps
- `v_511_s2` 問題 « Question (d'examen) » : famille source « abstrait / concept » (2 sens catégorisés) : seul sens en education_apprentissage
- `v_513_s1` 意味 « Sens » : famille source « abstrait / concept » (2 sens catégorisés) : seul sens en communication_langage
- `v_527_s1` 上げる « Donner » : famille source « actions_generiques / mouvement » (5 sens catégorisés) : seul sens en relations_sociales
- `v_534_s1` 働く « Travailler » : famille source « actions_generiques / travail » (4 sens catégorisés) : seul sens en travail_vie_professionnelle
- `v_536_s2` 出す « Envoyer (du courrier) » : famille source « actions_generiques / mouvement » (5 sens catégorisés) : seul sens en communication_langage
- `v_546_s1` 大体 « À peu près » : famille source « adverbes_expressions / approximation » (2 sens catégorisés) : seul sens en nombres_quantification
- `v_546_s2` 大体 « En général » : famille source « adverbes_expressions / approximation » (2 sens catégorisés) : seul sens en temps
- `v_570_s1` 練習 « Entraînement » : famille source « actions_generiques / travail » (4 sens catégorisés) : seul sens en education_apprentissage
- `v_621_s1` プール « Piscine » : famille source « lieux / loisirs » (2 sens catégorisés) : seul sens en sports
- `v_623_s1` ページ « Page » : famille source « nombres_quantites / compteurs » (19 sens catégorisés) : seul sens en communication_langage
- `v_658_s1` 女の子 « Fille » : famille source « personnes_famille / personnes » (3 sens catégorisés) : seul sens en etre_humain
- `v_663_s2` 後 « Derrière » : famille source « temps_calendrier / temps » (4 sens catégorisés) : seul sens en espace_proprietes_spatiales
- `v_663_s3` 後 « Le reste » : famille source « temps_calendrier / temps » (4 sens catégorisés) : seul sens en nombres_quantification
- `v_670_s2` 昼 « Déjeuner (repas) » : famille source « temps_calendrier / moments_journee » (11 sens catégorisés) : seul sens en alimentation_cuisine
- `v_713_s1` 電気 « Électricité » : famille source « maison_quotidien / energie » (2 sens catégorisés) : seul sens en sciences
- `v_713_s2` 電気 « Lumière » : famille source « maison_quotidien / energie » (2 sens catégorisés) : seul sens en habitat_vie_domestique
- `v_718_s1` レジ袋 « Sac de caisse » : famille source « achats_argent / commerce » (5 sens catégorisés) : seul sens en habillement_accessoires_personnels

### C1-h

- `v_15_s1` お巡りさん « Policier » : famille source « personnes_famille / personnes \| nom \| personne » : catégorisé (droit_justice › application_de_la_loi › police) alors que v_633_s1 人 « Personne », v_657_s1 女 « Femme », v_667_s1 方 « Personne », v_686_s1 男 « Homme » est sans catégorie
- `v_42_s1` 警官 « Policier » : famille source « personnes_famille / personnes \| nom \| personne » : catégorisé (droit_justice › application_de_la_loi › police) alors que v_633_s1 人 « Personne », v_657_s1 女 « Femme », v_667_s1 方 « Personne », v_686_s1 男 « Homme » est sans catégorie
- `v_49_s2` 寝る « Se coucher » : famille source « actions_generiques / vie_quotidienne \| verbe \| action » : catégorisé (etre_humain › etats_besoins_physiques › sommeil_repos) alors que v_567_s1 磨く « Brosser » est sans catégorie
- `v_50_s1` 差す « Ouvrir (un parapluie) » : famille source « cactions_generiques / actions_objets \| verbe \| action » : catégorisé (habillement_accessoires_personnels › accessoires_vestimentaires) alors que v_50_s2 差す « Pointer » est sans catégorie
- `v_53_s1` 歩く « Marcher » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_62_s2` 軽い « Bénin » : famille source « descriptions_qualites / poids \| adjectif_i \| propriete » : catégorisé (sante_medecine › maladies_troubles) alors que v_62_s1 軽い « Léger », v_484_s1 重い « Lourd », v_484_s2 重い « Grave » est sans catégorie
- `v_63_s1` 降りる « Descendre » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement › monter_descendre) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_66_s1` 飲む « Boire » : famille source « actions_generiques / actions_objets \| verbe \| action » : catégorisé (alimentation_cuisine › consommation_alimentaire) alors que v_79_s1 押す « Pousser », v_130_s1 引く « Tirer » est sans catégorie
- `v_80_s1` 曇る « Se couvrir (le ciel) » : famille source « vetements / meteo \| verbe \| processus » : catégorisé (monde_naturel › meteo › nuages) alors que v_80_s2 曇る « S'embuer » est sans catégorie
- `v_82_s1` 締める « Serrer » : famille source « actions_generiques / actions_objets \| verbe \| action » : catégorisé (habillement_accessoires_personnels › accessoires_vestimentaires) alors que v_79_s1 押す « Pousser », v_130_s1 引く « Tirer » est sans catégorie
- `v_116_s1` 頼む « Demander » : famille source « actions_generiques / actions_objets \| verbe \| action » : catégorisé (relations_sociales › interactions_sociales) alors que v_79_s1 押す « Pousser », v_130_s1 引く « Tirer » est sans catégorie
- `v_116_s2` 頼む « Commander (un plat au restaurant) » : famille source « actions_generiques / actions_objets \| verbe \| action » : catégorisé (economie_commerce › achat_vente › commande) alors que v_79_s1 押す « Pousser », v_130_s1 引く « Tirer » est sans catégorie
- `v_130_s2` 引く « Chercher (dans un dictionnaire) » : famille source « actions_generiques / actions_objets \| verbe \| action » : catégorisé (communication_langage › langues) alors que v_79_s1 押す « Pousser », v_130_s1 引く « Tirer » est sans catégorie
- `v_150_s1` 出かける « Sortir (de chez soi) » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › entree_sortie › entrer_sortir) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_152_s1` 来る « Venir » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement › aller_venir) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_156_s1` 行く « Aller » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement › aller_venir) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_157_s1` 走る « Courir » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_160_s1` 飛ぶ « Voler » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_164_s1` かける « Passer (un appel) » : famille source « communication / telephone \| verbe \| action » : catégorisé (communication_langage › communication › contact) alors que v_164_s3 かける « Accrocher » est sans catégorie
- `v_164_s2` かける « Mettre (des lunettes) » : famille source « communication / telephone \| verbe \| action » : catégorisé (habillement_accessoires_personnels › accessoires_vestimentaires) alors que v_164_s3 かける « Accrocher » est sans catégorie
- `v_213_s1` 入る « Entrer » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › entree_sortie › entrer_sortir) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_221_s1` 洗う « Laver » : famille source « actions_generiques / vie_quotidienne \| verbe \| action » : catégorisé (habitat_vie_domestique › entretien_domestique › nettoyage) alors que v_567_s1 磨く « Brosser » est sans catégorie
- `v_259_s1` 登る « Monter » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement › monter_descendre) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_265_s1` 冷たい « Froid (au toucher) » : famille source « meteo_saisons / temperature \| adjectif_i \| propriete » : catégorisé (etre_humain › sens_perception › toucher_sensations) alors que v_265_s2 冷たい « Froid (attitude) » est sans catégorie
- `v_270_s1` 寒い « Froid (temps) » : famille source « meteo_saisons / temperature \| adjectif_i \| propriete » : catégorisé (monde_naturel › meteo › conditions_atmospheriques) alors que v_265_s2 冷たい « Froid (attitude) » est sans catégorie
- `v_274_s1` 暑い « Chaud (temps) » : famille source « meteo_saisons / temperature \| adjectif_i \| propriete » : catégorisé (monde_naturel › meteo › conditions_atmospheriques) alors que v_265_s2 冷たい « Froid (attitude) » est sans catégorie
- `v_277_s1` 熱い « Chaud (au toucher) » : famille source « meteo_saisons / temperature \| adjectif_i \| propriete » : catégorisé (etre_humain › sens_perception › toucher_sensations) alors que v_265_s2 冷たい « Froid (attitude) » est sans catégorie
- `v_422_s1` うるさい « Bruyant » : famille source « descriptions_qualites / caractere_bruit \| adjectif_i \| propriete » : catégorisé (etre_humain › sens_perception › ouie) alors que v_422_s2 うるさい « Agaçant » est sans catégorie
- `v_423_s1` かわいい « Mignon » : famille source « descriptions_qualites / appreciation \| adjectif_i \| propriete » : catégorisé (etre_humain › emotions_sentiments › affection) alors que v_420_s1 いい « Bon », v_452_s1 悪い « Mauvais » est sans catégorie
- `v_424_s2` きれい « Propre » : famille source « descriptions_qualites / appreciation \| adjectif_na \| propriete » : catégorisé (habitat_vie_domestique › entretien_domestique › nettoyage) alors que v_424_s1 きれい « Beau », v_442_s1 大切 « Important », v_609_s1 立派 « Magnifique », v_609_s2 立派 « Remarquable » est sans catégorie
- `v_426_s1` つまらない « Ennuyeux » : famille source « descriptions_qualites / appreciation \| adjectif_i \| propriete » : catégorisé (etre_humain › psychologie_esprit › attention) alors que v_420_s1 いい « Bon », v_452_s1 悪い « Mauvais » est sans catégorie
- `v_427_s1` まずい « Mauvais (au goût) » : famille source « descriptions_qualites / saveur \| adjectif_i \| propriete » : catégorisé (alimentation_cuisine › gouts_alimentaires) alors que v_427_s2 まずい « Fâcheux », v_464_s2 甘い « Indulgent » est sans catégorie
- `v_428_s2` 丈夫 « En bonne santé » : famille source « descriptions_qualites / etat_physique \| adjectif_na \| propriete » : catégorisé (sante_medecine › sante_etats_pathologiques) alors que v_428_s1 丈夫 « Solide » est sans catégorie
- `v_433_s1` 元気 « En forme » : famille source « descriptions_qualites / etat_sante \| adjectif_na \| etat » : catégorisé (etre_humain › etats_besoins_physiques › fatigue_energie_physique) alors que v_457_s1 暇 « Libre » est sans catégorie
- `v_461_s1` 汚い « Sale » : famille source « descriptions_qualites / proprete \| adjectif_i \| propriete » : catégorisé (habitat_vie_domestique › entretien_domestique › nettoyage) alors que v_461_s2 汚い « Grossier (langage) », v_462_s1 清い « Pur », v_462_s2 清い « Pur (moralement) » est sans catégorie
- `v_464_s1` 甘い « Sucré » : famille source « descriptions_qualites / saveur \| adjectif_i \| propriete » : catégorisé (alimentation_cuisine › gouts_alimentaires › sucre) alors que v_427_s2 まずい « Fâcheux », v_464_s2 甘い « Indulgent » est sans catégorie
- `v_474_s1` 美味しい « Délicieux » : famille source « descriptions_qualites / saveur \| adjectif_i \| propriete » : catégorisé (alimentation_cuisine › gouts_alimentaires) alors que v_427_s2 まずい « Fâcheux », v_464_s2 甘い « Indulgent » est sans catégorie
- `v_481_s1` 辛い « Épicé » : famille source « descriptions_qualites / saveur \| adjectif_i \| propriete » : catégorisé (alimentation_cuisine › gouts_alimentaires › epice) alors que v_427_s2 まずい « Fâcheux », v_464_s2 甘い « Indulgent » est sans catégorie
- `v_494_s1` いつも « Toujours » : famille source « adverbes_expressions / frequence \| adverbe \| concept_abstrait » : catégorisé (temps › frequence › frequent) alors que v_500_s1 また « À nouveau », v_503_s1 もう一度 « Encore une fois » est sans catégorie
- `v_504_s1` ゆっくり « Lentement » : famille source « adverbes_expressions / maniere \| adverbe \| propriete » : catégorisé (espace_proprietes_spatiales › vitesse) alors que v_504_s2 ゆっくり « Tranquillement » est sans catégorie
- `v_506_s1` よく « Souvent » : famille source « adverbes_expressions / frequence \| adverbe \| concept_abstrait » : catégorisé (temps › frequence › frequent) alors que v_500_s1 また « À nouveau », v_503_s1 もう一度 « Encore une fois » est sans catégorie
- `v_519_s1` たいてい « Généralement » : famille source « adverbes_expressions / frequence \| adverbe \| concept_abstrait » : catégorisé (temps › frequence › frequent) alors que v_500_s1 また « À nouveau », v_503_s1 もう一度 « Encore une fois » est sans catégorie
- `v_525_s1` まっすぐ « Tout droit » : famille source « adverbes_expressions / direction \| adverbe \| propriete » : catégorisé (espace_proprietes_spatiales › parcours_trajectoire) alors que v_525_s2 まっすぐ « Honnête » est sans catégorie
- `v_527_s1` 上げる « Donner » : famille source « actions_generiques / mouvement \| verbe \| action » : catégorisé (relations_sociales › interactions_sociales) alors que v_536_s3 出す « Présenter » est sans catégorie
- `v_527_s2` 上げる « Lever » : famille source « actions_generiques / mouvement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement › monter_descendre) alors que v_536_s3 出す « Présenter » est sans catégorie
- `v_529_s1` 並べる « Aligner » : famille source « actions_generiques / position \| verbe \| action » : catégorisé (espace_proprietes_spatiales › position_localisation) alors que v_528_s1 並ぶ « Faire la queue » est sans catégorie
- `v_531_s1` 住む « Habiter » : famille source « actions_generiques / vie_quotidienne \| verbe \| action » : catégorisé (habitat_vie_domestique › logements) alors que v_567_s1 磨く « Brosser » est sans catégorie
- `v_532_s2` 作る « Préparer (un repas) » : famille source « actions_generiques / creation \| verbe \| action » : catégorisé (alimentation_cuisine › cuisine_preparation) alors que v_532_s1 作る « Fabriquer » est sans catégorie
- `v_534_s1` 働く « Travailler » : famille source « actions_generiques / travail \| verbe \| action » : catégorisé (travail_vie_professionnelle › travail_emploi › activite_professionnelle) alors que v_526_s1 コピーする « Photocopier » est sans catégorie
- `v_535_s1` 入れる « Mettre dans » : famille source « actions_generiques / mouvement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › entree_sortie › entrer_sortir) alors que v_536_s3 出す « Présenter » est sans catégorie
- `v_536_s1` 出す « Sortir » : famille source « actions_generiques / mouvement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › entree_sortie › entrer_sortir) alors que v_536_s3 出す « Présenter » est sans catégorie
- `v_536_s2` 出す « Envoyer (du courrier) » : famille source « actions_generiques / mouvement \| verbe \| action » : catégorisé (communication_langage › communication › transmission) alors que v_536_s3 出す « Présenter » est sans catégorie
- `v_550_s1` 帰る « Rentrer » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement › aller_venir) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_554_s1` 時々 « Parfois » : famille source « adverbes_expressions / frequence \| adverbe \| concept_abstrait » : catégorisé (temps › frequence › occasionnel) alors que v_500_s1 また « À nouveau », v_503_s1 もう一度 « Encore une fois » est sans catégorie
- `v_556_s1` 書く « Écrire » : famille source « actions_generiques / travail \| verbe \| action » : catégorisé (communication_langage › ecriture › ecrire) alors que v_526_s1 コピーする « Photocopier » est sans catégorie
- `v_557_s1` 止まる « S'arrêter » : famille source « actions_generiques / mouvement_deplacement \| verbe \| evenement » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement) alors que v_642_s3 出る « Apparaître », v_710_s1 開く « S'ouvrir » est sans catégorie
- `v_559_s1` 浴びる « Prendre (une douche) » : famille source « actions_generiques / vie_quotidienne \| verbe \| action » : catégorisé (etre_humain › hygiene_soins_personnels › toilette_corporelle) alors que v_567_s1 磨く « Brosser » est sans catégorie
- `v_559_s2` 浴びる « Recevoir (de la lumière, des acclamations) » : famille source « actions_generiques / vie_quotidienne \| verbe \| action » : catégorisé (etre_humain › sens_perception › toucher_sensations) alors que v_567_s1 磨く « Brosser » est sans catégorie
- `v_561_s2` 消す « Effacer » : famille source « actions_generiques / manipulation \| verbe \| action » : catégorisé (communication_langage › ecriture) alors que v_522_s1 付ける « Allumer », v_522_s2 付ける « Fixer », v_539_s1 切る « Couper », v_539_s2 切る « Raccrocher (un téléphone) », v_541_s1 取る « Prendre », v_541_s2 取る « Obtenir », v_561_s1 消す « Éteindre », v_576_s1 貼る « Coller », v_580_s1 開ける « Ouvrir », v_637_s1 使う « Utiliser », v_709_s1 閉める « Fermer » est sans catégorie
- `v_562_s2` 渡す « Faire traverser » : famille source « actions_generiques / transaction \| verbe \| action » : catégorisé (espace_proprietes_spatiales › parcours_trajectoire) alors que v_533_s1 借りる « Emprunter », v_562_s1 渡す « Remettre », v_575_s1 貸す « Prêter », v_578_s1 返す « Rendre » est sans catégorie
- `v_563_s1` 渡る « Traverser » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › parcours_trajectoire) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_565_s1` 着く « Arriver » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › mouvement_deplacement › aller_venir) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_571_s1` 置く « Poser » : famille source « actions_generiques / position \| verbe \| action » : catégorisé (espace_proprietes_spatiales › position_localisation) alors que v_528_s1 並ぶ « Faire la queue » est sans catégorie
- `v_574_s1` 読む « Lire » : famille source « actions_generiques / travail \| verbe \| action » : catégorisé (communication_langage › lecture › lire) alors que v_526_s1 コピーする « Photocopier » est sans catégorie
- `v_577_s2` 起きる « Se lever » : famille source « actions_generiques / vie_quotidienne \| verbe \| action » : catégorisé (etre_humain › etats_besoins_physiques › sommeil_repos) alors que v_567_s1 磨く « Brosser » est sans catégorie
- `v_635_s1` 休む « Se reposer » : famille source « actions_generiques / repos \| verbe \| action » : catégorisé (etre_humain › etats_besoins_physiques › sommeil_repos) alors que v_635_s2 休む « S'absenter » est sans catégorie
- `v_642_s1` 出る « Sortir » : famille source « actions_generiques / mouvement_deplacement \| verbe \| action » : catégorisé (espace_proprietes_spatiales › entree_sortie › entrer_sortir) alors que v_551_s1 座る « S'asseoir », v_568_s1 立つ « Se lever », v_642_s2 出る « Assister à » est sans catégorie
- `v_658_s1` 女の子 « Fille » : famille source « personnes_famille / personnes \| nom \| personne » : catégorisé (etre_humain › cycle_de_vie › enfance) alors que v_633_s1 人 « Personne », v_657_s1 女 « Femme », v_667_s1 方 « Personne », v_686_s1 男 « Homme » est sans catégorie
- `v_683_s1` 灰皿 « Cendrier » : famille source « objets / accessoire \| nom \| objet_artefact » : catégorisé (habitat_vie_domestique › accessoires_domestiques) alors que v_671_s1 時計 « Horloge » est sans catégorie

### C1-d

- sens reliés par similar_to (v_527_s1 → v_608_s2), niveaux 1 différents : relations_sociales › interactions_sociales \| null

### C1-f

- `v_9_s1` 疲れる « Se fatiguer » : catégorie « etre_humain › etats_besoins_physiques › fatigue_energie_physique » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_10_s1` 面白い « Intéressant » : catégorie « etre_humain › psychologie_esprit › attention » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_28_s1` 大人 « Adulte » : catégorie « etre_humain › cycle_de_vie › age_adulte » : 2 sens sur 3 déjà candidats sur C1 ; examen de la famille entière
- `v_39_s1` 男の子 « Garçon » : catégorie « etre_humain › cycle_de_vie › enfance » : 2 sens sur 3 déjà candidats sur C1 ; examen de la famille entière
- `v_49_s1` 寝る « Dormir » : catégorie « etre_humain › etats_besoins_physiques › sommeil_repos » : 3 sens sur 5 déjà candidats sur C1 ; examen de la famille entière
- `v_55_s1` 病気 « Maladie » : catégorie « sante_medecine › maladies_troubles » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_64_s1` かばん « Sac » : catégorie « habillement_accessoires_personnels › sacs_contenants_personnels › sacs » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_92_s1` 昼ご飯 « Déjeuner » : catégorie « alimentation_cuisine › repas › dejeuner » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_117_s1` 食べる « Manger » : catégorie « alimentation_cuisine › consommation_alimentaire » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_124_s1` テスト « Examen » : catégorie « education_apprentissage › evaluation_scolaire › examens » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_134_s1` 本 « Livre » : catégorie « communication_langage › lecture » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_139_s1` 辞書 « Dictionnaire » : catégorie « communication_langage › langues » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_141_s1` 仕事 « Travail » : catégorie « travail_vie_professionnelle › travail_emploi › activite_professionnelle » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_181_s2` する « Coûter (pour un prix) » : catégorie « economie_commerce › prix_valeur_economique › prix » : 2 sens sur 4 déjà candidats sur C1 ; examen de la famille entière
- `v_185_s1` 安い « Bon marché » : catégorie « economie_commerce › prix_valeur_economique › prix » : 2 sens sur 4 déjà candidats sur C1 ; examen de la famille entière
- `v_219_s1` 掃除 « Ménage » : catégorie « habitat_vie_domestique › entretien_domestique › nettoyage » : 3 sens sur 4 déjà candidats sur C1 ; examen de la famille entière
- `v_263_s1` 曇り « Temps nuageux » : catégorie « monde_naturel › meteo › nuages » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_321_s2` 時間 « Heure (durée) » : catégorie « temps › unites_temporelles › seconde_minute_heure » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_577_s1` 起きる « Se réveiller » : catégorie « etre_humain › etats_besoins_physiques › sommeil_repos » : 3 sens sur 5 déjà candidats sur C1 ; examen de la famille entière
- `v_597_s1` 縦 « Sens vertical » : catégorie « espace_proprietes_spatiales › dimensions › hauteur » : 2 sens sur 3 déjà candidats sur C1 ; examen de la famille entière
- `v_616_s1` テープレコーダー « Magnétophone » : catégorie « technologie › appareils_electroniques › appareils_electroniques » : 2 sens sur 3 déjà candidats sur C1 ; examen de la famille entière
- `v_636_s1` 作文 « Rédaction » : catégorie « education_apprentissage › apprentissage › exercices » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_644_s1` 切符 « Billet » : catégorie « transport_mobilite › utilisation_des_transports » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_650_s1` 半分 « Moitié » : catégorie « nombres_quantification › proportions › fraction » : 1 sens sur 2 déjà candidats sur C1 ; examen de la famille entière
- `v_663_s1` 後 « Après » : catégorie « temps › chronologie › avant_apres » : 2 sens sur 3 déjà candidats sur C1 ; examen de la famille entière
- `v_681_s1` 温い « Tiède » : catégorie « etre_humain › sens_perception › toucher_sensations » : 4 sens sur 5 déjà candidats sur C1 ; examen de la famille entière

### C3-b

- même traduction principale « Café (boisson) », types différents : v_95_s1 substance_matiere \| v_101_s1 lieu
- même traduction principale « Cuisine (pièce) », types différents : v_100_s1 lieu \| v_104_s1 action
- même traduction principale « Prendre (un transport) », types différents : v_149_s1 action \| v_163_s1 propriete \| v_171_s1 action \| v_541_s1 action \| v_559_s1 action
- même traduction principale « Temps (qu'il fait) », types différents : v_269_s1 etat \| v_321_s1 concept_abstrait
- même traduction principale « Avant (plus loin) », types différents : v_347_s1 lieu \| v_348_s2 concept_abstrait
- même traduction principale « Bon », types différents : v_420_s1 propriete \| v_595_s2 null

### C3-c

- `v_142_s1` 会社 « Entreprise » : couple atypique : nom × organisation (1 sens sur 431 sens typés de la classe)
- `v_163_s1` かかる « Prendre (du temps ou de l'argent) » : couple atypique : verbe × propriete (2 sens sur 145 sens typés de la classe)
- `v_181_s2` する « Coûter (pour un prix) » : couple atypique : verbe × propriete (2 sens sur 145 sens typés de la classe)
- `v_282_s1` 風 « Vent » : couple atypique : nom × processus (1 sens sur 431 sens typés de la classe)
- `v_523_s2` 出来る « Être achevé / prêt » : couple atypique : verbe × resultat (1 sens sur 145 sens typés de la classe)

### C3-d

- `v_20_s1` 両親 « Parents » : catégorie « relations_sociales › famille_parente › parents_enfants » : type modal personne (4/5), ce sens est groupe_collectif
- `v_170_s2` 字 « Écriture (d'une personne) » : catégorie « communication_langage › ecriture › ecrire » : type modal objet_artefact (5/7), ce sens est propriete
- `v_229_s1` ちり紙 « Papier hygiénique » : catégorie « habitat_vie_domestique › accessoires_domestiques » : type modal objet_artefact (5/6), ce sens est substance_matiere
- `v_316_s2` 年 « Âge » : catégorie « etre_humain › cycle_de_vie » : type modal quantite_valeur (9/11), ce sens est propriete
- `v_321_s1` 時間 « Temps » : catégorie « temps › duree » : type modal quantite_valeur (12/15), ce sens est concept_abstrait
- `v_360_s1` 近い « Proche » : catégorie « espace_proprietes_spatiales › distance_proximite › proximite » : type modal lieu (4/5), ce sens est propriete
- `v_476_s1` 若い « Jeune » : catégorie « etre_humain › cycle_de_vie » : type modal quantite_valeur (9/11), ce sens est propriete
- `v_497_s2` ちょっと « Un instant » : catégorie « temps › duree » : type modal quantite_valeur (12/15), ce sens est concept_abstrait
- `v_509_s3` 少し « Un court instant » : catégorie « temps › duree » : type modal quantite_valeur (12/15), ce sens est concept_abstrait
- `v_556_s1` 書く « Écrire » : catégorie « communication_langage › ecriture › ecrire » : type modal objet_artefact (5/7), ce sens est action
- `v_559_s2` 浴びる « Recevoir (de la lumière, des acclamations) » : catégorie « etre_humain › sens_perception › toucher_sensations » : type modal propriete (4/5), ce sens est action
- `v_612_s1` シャワー « Douche » : catégorie « habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes » : type modal lieu (4/5), ce sens est objet_artefact
- `v_638_s1` 兄弟 « Frères et sœurs » : catégorie « relations_sociales › famille_parente › fratrie » : type modal personne (6/7), ce sens est groupe_collectif

### C3-e

- sens reliés par transitive_of (v_529_s1 → v_528_s2), types différents : action \| etat
- sens reliés par transitive_of (v_561_s1 → v_560_s1), types différents : action \| evenement
- sens reliés par transitive_of (v_709_s1 → v_579_s1), types différents : action \| evenement
- sens reliés par transitive_of (v_580_s1 → v_710_s1), types différents : action \| evenement

### C5-b

- `v_344_s1` はい « Oui » : sans dimension ; traduction contenant un terme de pôle : exactitude_inexactitude (« exact »)
- `v_421_s1` いろいろ « Divers » : sans dimension ; traduction contenant un terme de pôle : uniforme_non_uniforme (« varié »), uniforme_non_uniforme (« divers »)
- `v_430_s1` 下手 « Maladroit » : sans dimension ; traduction contenant un terme de pôle : utilite_inutilite (« pratique »)
- `v_484_s2` 重い « Grave » : sans dimension ; traduction contenant un terme de pôle : importance_insignifiance (« grave »)
- `v_570_s1` 練習 « Entraînement » : sans dimension ; traduction contenant un terme de pôle : utilite_inutilite (« pratique »)

### C7-b

- `v_269_s1` 天気 « Temps (qu'il fait) » : sans deictique, décidé au lot 7 (avant la définition) ; traduction contenant : « il »
- `v_285_s1` おととし « Il y a deux ans » : sans deictique, décidé au lot 0 (avant la définition) ; traduction contenant : « il y a », « il »
- `v_419_s1` 向こう « En face » : sans deictique, décidé au lot 10 (avant la définition) ; traduction contenant : « là », « là-bas »
- `v_687_s1` 皆さん « Tout le monde » : sans deictique, décidé au lot 1 (avant la définition) ; traduction contenant : « vous »
- `v_704_s2` 近く « Prochainement » : sans deictique, décidé au lot 10 (avant la définition) ; traduction contenant : « bientôt », « prochainement »

### C7-c

- `v_2_s1` 大好き « Adorer » : sans quantificateur, décidé au lot 16 (avant la définition) ; traduction contenant : « beaucoup »
- `v_12_s2` おじさん « Monsieur » : sans politesse, décidé au lot 1 (avant la définition) ; traduction contenant : « monsieur »
- `v_14_s2` おばさん « Madame » : sans politesse, décidé au lot 1 (avant la définition) ; traduction contenant : « madame »
- `v_20_s1` 両親 « Parents » : sans connecteur, décidé au lot 1 (avant la définition) ; traduction contenant : « et »
- `v_31_s2` 子供 « Enfant (fils ou fille) » : sans connecteur, décidé au lot 1 (avant la définition) ; traduction contenant : « ou »
- `v_163_s1` かかる « Prendre (du temps ou de l'argent) » : sans connecteur, décidé au lot 20 (avant la définition) ; traduction contenant : « ou »
- `v_183_s1` 低い « Bas » : sans quantificateur, décidé au lot 15 (avant la définition) ; traduction contenant : « peu »
- `v_185_s1` 安い « Bon marché » : sans discours, décidé au lot 5 (avant la définition) ; traduction contenant : « bon »
- `v_192_s1` 弾く « Jouer (d'un instrument à cordes ou à clavier) » : sans connecteur, décidé au lot 9 (avant la définition) ; traduction contenant : « ou »
- `v_311_s2` 半 « Et demie (heure) » : sans connecteur, décidé au lot 13 (avant la définition) ; traduction contenant : « et »
- `v_329_s1` 毎年 « Chaque année » : sans quantificateur, décidé au lot 0 (avant la définition) ; traduction contenant : « tous », « chaque »
- `v_330_s1` 毎日 « Chaque jour » : sans quantificateur, décidé au lot 12 (avant la définition) ; traduction contenant : « tous », « chaque »
- `v_331_s1` 毎晩 « Chaque soir » : sans quantificateur, décidé au lot 12 (avant la définition) ; traduction contenant : « tous », « chaque »
- `v_332_s1` 毎月 « Chaque mois » : sans quantificateur, décidé au lot 0 (avant la définition) ; traduction contenant : « tous », « chaque »
- `v_333_s1` 毎朝 « Chaque matin » : sans quantificateur, décidé au lot 12 (avant la définition) ; traduction contenant : « tous », « chaque »
- `v_334_s1` 毎週 « Chaque semaine » : sans quantificateur, décidé au lot 12 (avant la définition) ; traduction contenant : « toutes », « chaque »
- `v_347_s1` 先 « Avant (plus loin) » : sans comparatif, décidé au lot 10 (avant la définition) ; traduction contenant : « plus »
- `v_359_s1` 近々 « Bientôt » : sans quantificateur, décidé au lot 12 (avant la définition) ; traduction contenant : « peu »
- `v_361_s1` 違う « Être différent » : sans comparatif, décidé au lot 20 (avant la définition) ; traduction contenant : « différent »
- `v_420_s1` いい « Bon » : sans intensifieur, décidé au lot 0 (avant la définition) ; traduction contenant : « bien »
- `v_420_s1` いい « Bon » : sans discours, décidé au lot 0 (avant la définition) ; traduction contenant : « bon »
- `v_421_s1` いろいろ « Divers » : sans quantificateur, décidé au lot 22 (avant la définition) ; traduction contenant : « plusieurs »
- `v_425_s1` だんだん « Graduellement » : sans quantificateur, décidé au lot 21 (avant la définition) ; traduction contenant : « peu »
- `v_427_s1` まずい « Mauvais (au goût) » : sans discours, décidé au lot 2 (avant la définition) ; traduction contenant : « bon »
- `v_429_s1` 上手 « Doué » : sans discours, décidé au lot 16 (avant la définition) ; traduction contenant : « bon »
- `v_438_s1` 同じ « Même » : sans comparatif, décidé au lot 22 (avant la définition) ; traduction contenant : « même », « pareil »
- `v_451_s1` 強い « Fort » : sans intensifieur, décidé au lot 17 (avant la définition) ; traduction contenant : « fort »
- `v_474_s1` 美味しい « Délicieux » : sans discours, décidé au lot 0 (avant la définition) ; traduction contenant : « bon »
- `v_494_s1` いつも « Toujours » : sans quantificateur, décidé au lot 21 (avant la définition) ; traduction contenant : « tout »
- `v_500_s2` また « Aussi » : sans connecteur, décidé au lot 21 (avant la définition) ; traduction contenant : « de plus »
- `v_500_s2` また « Aussi » : sans comparatif, décidé au lot 21 (avant la définition) ; traduction contenant : « plus »
- `v_502_s2` もう « Ne… plus » : sans comparatif, décidé au lot 21 (avant la définition) ; traduction contenant : « plus »
- `v_506_s2` よく « Bien » : sans intensifieur, décidé au lot 21 (avant la définition) ; traduction contenant : « bien »
- `v_512_s1` 大丈夫 « Ça va » : sans quantificateur, décidé au lot 16 (avant la définition) ; traduction contenant : « tout »
- `v_512_s1` 大丈夫 « Ça va » : sans intensifieur, décidé au lot 16 (avant la définition) ; traduction contenant : « bien »
- `v_518_s1` すぐに « Tout de suite » : sans quantificateur, décidé au lot 21 (avant la définition) ; traduction contenant : « tout »
- `v_519_s1` たいてい « Généralement » : sans quantificateur, décidé au lot 21 (avant la définition) ; traduction contenant : « la plupart »
- `v_525_s1` まっすぐ « Tout droit » : sans quantificateur, décidé au lot 22 (avant la définition) ; traduction contenant : « tout »
- `v_606_s1` 皆 « Tout le monde » : sans quantificateur, décidé au lot 11 (avant la définition) ; traduction contenant : « tout », « tous », « tout le monde »
- `v_627_s2` 一人 « Seul » : sans quantificateur, décidé au lot 14 (avant la définition) ; traduction contenant : « tout »
- `v_628_s1` 一緒 « Ensemble » : sans quantificateur, décidé au lot 22 (avant la définition) ; traduction contenant : « ensemble »
- `v_631_s1` 二人 « Deux personnes » : sans quantificateur, décidé au lot 14 (avant la définition) ; traduction contenant : « tous »
- `v_637_s1` 使う « Utiliser » : sans connecteur, décidé au lot 18 (avant la définition) ; traduction contenant : « ou »
- `v_638_s1` 兄弟 « Frères et sœurs » : sans connecteur, décidé au lot 1 (avant la définition) ; traduction contenant : « et »
- `v_656_s1` 奥さん « Épouse (d'autrui) » : sans politesse, décidé au lot 1 (avant la définition) ; traduction contenant : « madame »
- `v_663_s1` 後 « Après » : sans comparatif, décidé au lot 13 (avant la définition) ; traduction contenant : « plus »
- `v_667_s1` 方 « Personne » : sans politesse, décidé au lot 1 (avant la définition) ; traduction contenant : « monsieur », « madame »
- `v_675_s1` 次 « Suivant » : sans connecteur, décidé au lot 20 (avant la définition) ; traduction contenant : « ensuite »
- `v_687_s1` 皆さん « Tout le monde » : sans connecteur, décidé au lot 1 (avant la définition) ; traduction contenant : « et »
- `v_687_s1` 皆さん « Tout le monde » : sans quantificateur, décidé au lot 1 (avant la définition) ; traduction contenant : « tout », « tous », « tout le monde »
- `v_691_s1` 自分 « Soi-même » : sans comparatif, décidé au lot 11 (avant la définition) ; traduction contenant : « même »

### C7-d

- même traduction principale « Alors », fonctions différentes : v_413_s1 [connecteur] \| v_417_s2 [discours] \| v_418_s3 [discours, politesse] \| v_595_s3 [discours]
- même traduction principale « Bon », fonctions différentes : v_420_s1 [] \| v_595_s2 [discours]
- même traduction principale « Un peu », fonctions différentes : v_497_s1 [quantificateur] \| v_509_s2 [intensifieur]

### C7-e

- `v_495_s1` 大変 « Très » : intensifieur posé au lot 0, avant l'addendum A9

### C8-a

- `v_87_s1` 果物 « Fruit » : tag lieu_konbini décidé au lot 0, avant la formalisation du critère (révision du lot 02)
- `v_91_s1` 晩ご飯 « Dîner » : tag lieu_restaurant décidé au lot 0, avant la formalisation du critère (révision du lot 02)
- `v_92_s1` 昼ご飯 « Déjeuner » : tag lieu_restaurant décidé au lot 0, avant la formalisation du critère (révision du lot 02)
- `v_226_s1` 鍵 « Clé » : tag lieu_hotel décidé au lot 0, avant la formalisation du critère (révision du lot 02)
- `v_228_s1` せっけん « Savon » : tag lieu_hotel décidé au lot 0, avant la formalisation du critère (révision du lot 02)
- `v_459_s1` 朝ご飯 « Petit-déjeuner » : tag lieu_restaurant décidé au lot 0, avant la formalisation du critère (révision du lot 02)
- `v_594_s1` 醤油 « Sauce soja » : tag lieu_konbini, lieu_restaurant décidé au lot 0, avant la formalisation du critère (révision du lot 02)

### C8-b

- catégorie « alimentation_cuisine › aliments › produits_prepares », tag lieu_konbini : gardé pour v_84_s1, v_121_s1 ; candidat écarté pour v_94_s1, v_104_s2
- catégorie « alimentation_cuisine › aliments › produits_prepares », tag lieu_restaurant : gardé pour v_104_s2 ; candidat écarté pour v_84_s1, v_94_s1, v_121_s1
- catégorie « alimentation_cuisine › aliments › cereales_feculents », tag lieu_restaurant : gardé pour v_88_s1 ; candidat écarté pour v_97_s1
- catégorie « alimentation_cuisine › aliments › cereales_feculents », tag lieu_konbini : gardé pour v_97_s1 ; candidat écarté pour v_88_s1
- catégorie « alimentation_cuisine › repas › diner », tag lieu_restaurant : gardé pour v_91_s1 ; candidat écarté pour v_103_s1
- catégorie « alimentation_cuisine › aliments › condiments_assaisonnements », tag lieu_konbini : gardé pour v_594_s1 ; candidat écarté pour v_102_s1, v_110_s1
- catégorie « alimentation_cuisine › aliments › condiments_assaisonnements », tag lieu_restaurant : gardé pour v_594_s1 ; candidat écarté pour v_102_s1, v_110_s1
- catégorie « alimentation_cuisine › aliments › produits_laitiers », tag lieu_konbini : gardé pour v_108_s1 ; candidat écarté pour v_619_s1
- catégorie « environnement_construit_espaces_humains › elements_architecturaux », tag lieu_gare : gardé pour v_202_s1, v_214_s1, v_241_s1 ; candidat écarté pour v_662_s1
- catégorie « habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes », tag lieu_hotel : gardé pour v_208_s1, v_612_s1 ; candidat écarté pour v_209_s1
- catégorie « habitat_vie_domestique › accessoires_domestiques », tag lieu_hotel : gardé pour v_226_s1 ; candidat écarté pour v_229_s1

### C8-c

- `v_85_s1` お茶 « Thé » : tag lieu_konbini, lieu_restaurant porté sans décision de journal sur le champ tags (lot 2)
- `v_86_s1` お酒 « Alcool » : tag lieu_konbini, lieu_restaurant porté sans décision de journal sur le champ tags (lot 2)
- `v_87_s1` 果物 « Fruit » : tag lieu_konbini porté sans décision de journal sur le champ tags (lot 0)
- `v_91_s1` 晩ご飯 « Dîner » : tag lieu_restaurant porté sans décision de journal sur le champ tags (lot 0)
- `v_92_s1` 昼ご飯 « Déjeuner » : tag lieu_restaurant porté sans décision de journal sur le champ tags (lot 0)
- `v_95_s1` コーヒー « Café (boisson) » : tag lieu_konbini, lieu_restaurant porté sans décision de journal sur le champ tags (lot 2)
- `v_112_s1` 紅茶 « Thé noir » : tag lieu_konbini, lieu_restaurant porté sans décision de journal sur le champ tags (lot 2)
- `v_120_s1` 飲み物 « Boisson » : tag lieu_konbini, lieu_restaurant porté sans décision de journal sur le champ tags (lot 2)
- `v_149_s1` 乗る « Prendre (un transport) » : tag lieu_gare porté sans décision de journal sur le champ tags (lot 4)
- `v_151_s1` 地下鉄 « Métro » : tag lieu_gare porté sans décision de journal sur le champ tags (lot 4)
- `v_159_s1` 電車 « Train » : tag lieu_gare porté sans décision de journal sur le champ tags (lot 4)
- `v_162_s1` 駅 « Gare » : tag lieu_gare porté sans décision de journal sur le champ tags (lot 4)
- `v_208_s1` お風呂 « Bain » : tag lieu_hotel porté sans décision de journal sur le champ tags (lot 3)
- `v_212_s1` ベッド « Lit » : tag lieu_hotel porté sans décision de journal sur le champ tags (lot 3)
- `v_224_s1` 部屋 « Pièce » : tag lieu_hotel porté sans décision de journal sur le champ tags (lot 3)
- `v_226_s1` 鍵 « Clé » : tag lieu_hotel porté sans décision de journal sur le champ tags (lot 0)
- `v_228_s1` せっけん « Savon » : tag lieu_hotel porté sans décision de journal sur le champ tags (lot 0)
- `v_459_s1` 朝ご飯 « Petit-déjeuner » : tag lieu_restaurant porté sans décision de journal sur le champ tags (lot 0)
- `v_589_s1` お手洗い « Toilettes » : tag lieu_gare porté sans décision de journal sur le champ tags (lot 3)
- `v_594_s1` 醤油 « Sauce soja » : tag lieu_konbini, lieu_restaurant porté sans décision de journal sur le champ tags (lot 0)
- `v_612_s1` シャワー « Douche » : tag lieu_hotel porté sans décision de journal sur le champ tags (lot 3)
- `v_617_s1` トイレ « Toilettes » : tag lieu_gare porté sans décision de journal sur le champ tags (lot 3)
- `v_644_s1` 切符 « Billet » : tag lieu_gare porté sans décision de journal sur le champ tags (lot 4)
- `v_677_s1` 水 « Eau » : tag lieu_konbini, lieu_restaurant porté sans décision de journal sur le champ tags (lot 2)
- `v_713_s2` 電気 « Lumière » : tag lieu_hotel porté sans décision de journal sur le champ tags (lot 3)
- `v_718_s1` レジ袋 « Sac de caisse » : tag lieu_konbini porté sans décision de journal sur le champ tags (lot 5)
- `v_719_s1` ポイントカード « Carte de fidélité » : tag lieu_konbini porté sans décision de journal sur le champ tags (lot 5)

### C9-a

- `v_564_s1` 無くす « Perdre (un objet) » : A2-04-D0069 cite A2-GLOBAL §4.4 : l'élément invoqué n'est pas, tel quel, dans la liste du §4.4

### C10-a

- `v_103_s1` 夕飯 « Dîner » : A2-04-D0173 (lot-02, tags) renvoie à une étape ultérieure
- `v_181_s1` する « Faire » : A2-04-D1332 (lot-20, relations) renvoie à une étape ultérieure
- `v_181_s1` する « Faire » : A2-04-D1585 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_208_s1` お風呂 « Bain » : A2-04-D1571 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_344_s1` はい « Oui » : A2-04-D1488 (lot-23, relations) renvoie à une étape ultérieure
- `v_344_s1` はい « Oui » : A2-04-D1599 (lot-26, entrée) renvoie à une étape ultérieure
- `v_344_s1` はい « Oui » : A2-04-D1600 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_344_s1` はい « Oui » : A2-04-D1601 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_366_s1` メートル « Mètre » : A2-04-D0956 (lot-14, sens 1 · category) renvoie à une étape ultérieure
- `v_413_s1` じゃあ « Alors » : A2-04-D1596 (lot-26, entrée) renvoie à une étape ultérieure
- `v_413_s1` じゃあ « Alors » : A2-04-D1597 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_413_s2` じゃあ « Eh bien » : A2-04-D1598 (lot-26, sens 2 · relations) renvoie à une étape ultérieure
- `v_416_s1` それから « Ensuite » : A2-04-D1449 (lot-23, relations) renvoie à une étape ultérieure
- `v_416_s1` それから « Ensuite » : A2-04-D1591 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_418_s1` では « Dans ce cas » : A2-04-D1462 (lot-23, relations) renvoie à une étape ultérieure
- `v_418_s1` では « Dans ce cas » : A2-04-D1592 (lot-26, entrée) renvoie à une étape ultérieure
- `v_418_s1` では « Dans ce cas » : A2-04-D1593 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_418_s2` では « Eh bien » : A2-04-D1594 (lot-26, sens 2 · relations) renvoie à une étape ultérieure
- `v_418_s3` では « Alors » : A2-04-D1595 (lot-26, sens 3 · relations) renvoie à une étape ultérieure
- `v_421_s1` いろいろ « Divers » : A2-04-D1424 (lot-22, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_425_s1` だんだん « Graduellement » : A2-04-D1400 (lot-21, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_438_s1` 同じ « Même » : A2-04-D1421 (lot-22, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_447_s1` 少ない « Peu nombreux » : A2-04-D1605 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_497_s1` ちょっと « Un peu » : A2-04-D1606 (lot-26, entrée) renvoie à une étape ultérieure
- `v_497_s1` ちょっと « Un peu » : A2-04-D1607 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_497_s2` ちょっと « Un instant » : A2-04-D1608 (lot-26, sens 2 · relations) renvoie à une étape ultérieure
- `v_498_s1` とても « Très » : A2-04-D1541 (lot-24, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_500_s2` また « Aussi » : A2-04-D1381 (lot-21, sens 2 · linguistic_functions) invoque l'absence d'une définition
- `v_500_s2` また « Aussi » : A2-04-D1403 (lot-21, sens 2 · semantic_type) invoque l'absence d'une définition
- `v_501_s1` まだ « Encore » : A2-04-D1387 (lot-21, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_502_s1` もう « Déjà » : A2-04-D1390 (lot-21, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_509_s1` 少し « Une petite quantité » : A2-04-D1534 (lot-24, relations) renvoie à une étape ultérieure
- `v_516_s1` ある « Y avoir » : A2-04-D1305 (lot-20, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_518_s1` すぐに « Tout de suite » : A2-04-D1391 (lot-21, senses) renvoie à une étape ultérieure
- `v_518_s1` すぐに « Tout de suite » : A2-04-D1392 (lot-21, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_521_s1` たぶん « Peut-être » : A2-04-D1434 (lot-22, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_523_s1` 出来る « Pouvoir » : A2-04-D1319 (lot-20, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_524_s1` なる « Devenir » : A2-04-D1323 (lot-20, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_527_s1` 上げる « Donner » : A2-04-D1587 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_528_s1` 並ぶ « Faire la queue » : A2-04-D1228 (lot-18, relations) renvoie à une étape ultérieure
- `v_529_s1` 並べる « Aligner » : A2-04-D1231 (lot-18, relations) renvoie à une étape ultérieure
- `v_529_s1` 並べる « Aligner » : A2-04-D1579 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_533_s1` 借りる « Emprunter » : A2-04-D1268 (lot-19, relations) renvoie à une étape ultérieure
- `v_533_s1` 借りる « Emprunter » : A2-04-D1581 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_540_s1` 初めて « Pour la première fois » : A2-04-D1397 (lot-21, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_560_s1` 消える « S'éteindre » : A2-04-D1187 (lot-18, relations) renvoie à une étape ultérieure
- `v_561_s1` 消す « Éteindre » : A2-04-D1192 (lot-18, relations) renvoie à une étape ultérieure
- `v_561_s1` 消す « Éteindre » : A2-04-D1577 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_562_s1` 渡す « Remettre » : A2-04-D1275 (lot-19, relations) renvoie à une étape ultérieure
- `v_562_s2` 渡す « Faire traverser » : A2-04-D1583 (lot-26, sens 2 · relations) renvoie à une étape ultérieure
- `v_575_s1` 貸す « Prêter » : A2-04-D1265 (lot-19, relations) renvoie à une étape ultérieure
- `v_579_s1` 閉まる « Se fermer » : A2-04-D1179 (lot-18, relations) renvoie à une étape ultérieure
- `v_580_s1` 開ける « Ouvrir » : A2-04-D1175 (lot-18, relations) renvoie à une étape ultérieure
- `v_580_s1` 開ける « Ouvrir » : A2-04-D1573 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_584_s1` いいえ « Non » : A2-04-D1603 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_593_s1` しかし « Cependant » : A2-04-D1440 (lot-23, relations) renvoie à une étape ultérieure
- `v_593_s1` しかし « Cependant » : A2-04-D1589 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_596_s1` そうして « Et puis » : A2-04-D1453 (lot-23, sens 1 · linguistic_functions) renvoie à une étape ultérieure
- `v_605_s1` 他 « Autre » : A2-04-D1428 (lot-22, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_608_s1` やる « Faire » : A2-04-D1336 (lot-20, relations) renvoie à une étape ultérieure
- `v_608_s1` やる « Faire » : A2-04-D1337 (lot-20, relations) renvoie à une étape ultérieure
- `v_654_s1` 多い « Nombreux » : A2-04-D1513 (lot-24, relations) renvoie à une étape ultérieure
- `v_659_s1` 嫌 « Désagréable » : A2-04-D1081 (lot-16, senses) invoque l'absence d'une définition
- `v_675_s1` 次 « Suivant » : A2-04-D1350 (lot-20, sens 1 · linguistic_functions) invoque l'absence d'une définition
- `v_709_s1` 閉める « Fermer » : A2-04-D1183 (lot-18, relations) renvoie à une étape ultérieure
- `v_709_s1` 閉める « Fermer » : A2-04-D1575 (lot-26, sens 1 · relations) renvoie à une étape ultérieure
- `v_710_s1` 開く « S'ouvrir » : A2-04-D1171 (lot-18, relations) renvoie à une étape ultérieure

### RES

- `v_91_s1` 晩ご飯 « Dîner » : point réservé à A2-05 : tag lieu_restaurant du lot 0
- `v_92_s1` 昼ご飯 « Déjeuner » : point réservé à A2-05 : tag lieu_restaurant du lot 0
- `v_183_s1` 低い « Bas » : point réservé à A2-05 : extension conservée en nuance (lot 15)
- `v_285_s1` おととし « Il y a deux ans » : point réservé à A2-05 : deixis temporelle (réservation d'A7)
- `v_347_s1` 先 « Avant (plus loin) » : point réservé à A2-05 : deixis temporelle (5.14b)
- `v_347_s2` 先 « D'abord » : point réservé à A2-05 : deixis temporelle (5.14b)
- `v_348_s1` 前 « Devant » : point réservé à A2-05 : deixis temporelle (5.14b)
- `v_348_s2` 前 « Avant (dans le temps) » : point réservé à A2-05 : deixis temporelle (5.14b)
- `v_363_s2` キロ « Kilomètre » : point réservé à A2-05 : catégorie de メートル et du « kilomètre » de キロ (lot 14)
- `v_366_s1` メートル « Mètre » : point réservé à A2-05 : catégorie de メートル et du « kilomètre » de キロ (lot 14)
- `v_434_s1` 危ない « Dangereux » : point réservé à A2-05 : emploi d’adresse conservé en nuance, à reprendre si les fonctions sont définies (lot 16)
- `v_435_s1` 厚い « Épais » : point réservé à A2-05 : sous-catégorie absente d’espace › dimensions (lot 15)
- `v_441_s1` 大きな « Grand » : point réservé à A2-05 : extension conservée en nuance (lot 15)
- `v_443_s1` 太い « Gros » : point réservé à A2-05 : sous-catégorie absente d’espace › dimensions (lot 15)
- `v_448_s1` 広い « Spacieux » : point réservé à A2-05 : sous-catégorie absente d’espace › dimensions (lot 15)
- `v_452_s1` 悪い « Mauvais » : point réservé à A2-05 : emploi d’adresse conservé en nuance, à reprendre si les fonctions sont définies (lot 16)
- `v_459_s1` 朝ご飯 « Petit-déjeuner » : point réservé à A2-05 : tag lieu_restaurant du lot 0
- `v_463_s1` 狭い « Étroit » : point réservé à A2-05 : sous-catégorie absente d’espace › dimensions (lot 15)
- `v_465_s1` 痛い « Douloureux » : point réservé à A2-05 : exclamation conservée en nuance, à reprendre si les fonctions sont définies (lot 01)
- `v_468_s1` 短い « Court » : point réservé à A2-05 : extension conservée en nuance (lot 15)
- `v_469_s1` 細い « Mince » : point réservé à A2-05 : sous-catégorie absente d’espace › dimensions (lot 15)
- `v_477_s1` 薄い « Mince » : point réservé à A2-05 : sous-catégorie absente d’espace › dimensions (lot 15)
- `v_485_s1` 長い « Long » : point réservé à A2-05 : extension conservée en nuance (lot 15)
- `v_495_s1` 大変 « Très » : point réservé à A2-05 : fonctions d'A9 (réservation de l'addendum)
- `v_495_s2` 大変 « Difficile » : point réservé à A2-05 : fonctions d'A9 (réservation de l'addendum)
- `v_500_s2` また « Aussi » : point réservé à A2-05 : fonctions d'A9 (réservation de l'addendum)
- `v_594_s1` 醤油 « Sauce soja » : point réservé à A2-05 : tag du lot 0
- `v_659_s1` 嫌 « Désagréable » : point réservé à A2-05 : emploi d’adresse conservé en nuance, à reprendre si les fonctions sont définies (lot 16)
- `v_704_s1` 近く « Environs » : point réservé à A2-05 : deixis temporelle (réservation d'A7)
- `v_704_s2` 近く « Prochainement » : point réservé à A2-05 : deixis temporelle (réservation d'A7)

## Annexe C · Familles source

Une ligne par famille source qui contient au moins un candidat ou un sens des 147. Les 78 autres familles (130 sens) n'en contiennent aucun.

| Famille source | Sens | Catégories (niveaux 1 et 2) | Types | Candidats | Sens des 147 |
|---|---|---|---|---|---|
| abstrait / capacite | 1 | null ×1 | propriete ×1 | 0 | `v_646_s1` |
| abstrait / concept | 4 | null ×2 ; education_apprentissage › evaluation_scolaire ×1 ; communication_langage › comprehension_linguistique ×1 | information_contenu ×2 ; concept_abstrait ×1 ; propriete ×1 | 3 | `v_511_s1` `v_513_s2` |
| abstrait / lieu | 3 | espace_proprietes_spatiales › position_localisation ×1 ; null ×1 ; espace_proprietes_spatiales › distance_proximite ×1 | lieu ×2 ; concept_abstrait ×1 | 1 | `v_664_s2` |
| abstrait / objet | 1 | null ×1 | objet_artefact ×1 | 0 | `v_684_s1` |
| abstrait / son | 1 | null ×1 | null ×1 | 0 | `v_653_s1` |
| abstrait / verite | 1 | null ×1 | concept_abstrait ×1 | 1 | `v_510_s1` |
| abstrait / vie_quotidienne | 1 | null ×1 | concept_abstrait ×1 | 1 | `v_685_s1` |
| achats_argent / commerce | 5 | economie_commerce › etablissements_commerciaux ×2 ; economie_commerce › achat_vente ×1 ; habillement_accessoires_personnels › sacs_contenants_personnels ×1 ; economie_commerce › marketing_promotion ×1 | lieu ×2 ; objet_artefact ×2 ; action ×1 | 2 | — |
| achats_argent / prix | 2 | economie_commerce › prix_valeur_economique ×2 | null ×1 ; propriete ×1 | 2 | — |
| achats_argent / taille_dimensions | 2 | espace_proprietes_spatiales › dimensions ×1 ; economie_commerce › prix_valeur_economique ×1 | propriete ×2 | 2 | — |
| actions_generiques / action | 2 | null ×2 | action ×2 | 2 | `v_608_s1` `v_608_s2` |
| actions_generiques / actions_objets | 7 | null ×2 ; alimentation_cuisine › consommation_alimentaire ×1 ; habillement_accessoires_personnels › accessoires_vestimentaires ×1 ; relations_sociales › interactions_sociales ×1 ; economie_commerce › achat_vente ×1 ; communication_langage › langues ×1 | action ×7 | 5 | `v_79_s1` `v_130_s1` |
| actions_generiques / capacite | 2 | etre_humain › capacites_aptitudes ×1 ; null ×1 | etat ×1 ; resultat ×1 | 2 | `v_523_s2` |
| actions_generiques / changement | 4 | null ×4 | evenement ×3 ; action ×1 | 2 | `v_524_s1` `v_545_s1` `v_560_s1` `v_560_s2` |
| actions_generiques / consommation | 2 | null ×2 | action ×2 | 0 | `v_542_s1` `v_542_s2` |
| actions_generiques / creation | 2 | null ×1 ; alimentation_cuisine › cuisine_preparation ×1 | action ×2 | 1 | `v_532_s1` |
| actions_generiques / etat_sante | 1 | null ×1 | evenement ×1 | 0 | `v_558_s1` |
| actions_generiques / existence | 3 | null ×3 | etat ×3 | 1 | `v_516_s1` `v_516_s2` `v_548_s1` |
| actions_generiques / manipulation | 13 | null ×12 ; communication_langage › ecriture ×1 | action ×12 ; evenement ×1 | 7 | `v_522_s1` `v_522_s2` `v_539_s1` `v_539_s2` `v_541_s1` `v_541_s2` `v_561_s1` `v_576_s1` `v_579_s1` `v_580_s1` `v_637_s1` `v_709_s1` |
| actions_generiques / mouvement | 6 | espace_proprietes_spatiales › entree_sortie ×2 ; relations_sociales › interactions_sociales ×1 ; espace_proprietes_spatiales › mouvement_deplacement ×1 ; communication_langage › communication ×1 ; null ×1 | action ×6 | 5 | `v_536_s3` |
| actions_generiques / mouvement_deplacement | 19 | espace_proprietes_spatiales › mouvement_deplacement ×10 ; null ×5 ; espace_proprietes_spatiales › entree_sortie ×3 ; espace_proprietes_spatiales › parcours_trajectoire ×1 | action ×16 ; evenement ×3 | 16 | `v_551_s1` `v_568_s1` `v_642_s2` `v_642_s3` `v_710_s1` |
| actions_generiques / orientation | 2 | null ×2 | etat ×2 | 2 | `v_361_s1` `v_361_s2` |
| actions_generiques / position | 4 | espace_proprietes_spatiales › position_localisation ×3 ; null ×1 | action ×3 ; etat ×1 | 4 | `v_528_s1` |
| actions_generiques / possession | 4 | null ×4 | action ×2 ; etat ×2 | 2 | `v_564_s1` `v_573_s1` `v_665_s1` `v_665_s2` |
| actions_generiques / prix | 2 | null ×1 ; economie_commerce › prix_valeur_economique ×1 | action ×1 ; propriete ×1 | 2 | `v_181_s1` |
| actions_generiques / repos | 2 | etre_humain › etats_besoins_physiques ×1 ; null ×1 | action ×2 | 1 | `v_635_s2` |
| actions_generiques / temps | 3 | temps › chronologie ×2 ; null ×1 | evenement ×2 ; action ×1 | 0 | `v_552_s1` |
| actions_generiques / transaction | 5 | null ×4 ; espace_proprietes_spatiales › parcours_trajectoire ×1 | action ×5 | 4 | `v_533_s1` `v_562_s1` `v_575_s1` `v_578_s1` |
| actions_generiques / travail | 5 | null ×1 ; travail_vie_professionnelle › travail_emploi ×1 ; communication_langage › ecriture ×1 ; education_apprentissage › apprentissage ×1 ; communication_langage › lecture ×1 | action ×5 | 4 | `v_526_s1` |
| actions_generiques / vie_quotidienne | 9 | etre_humain › etats_besoins_physiques ×4 ; habitat_vie_domestique › entretien_domestique ×1 ; habitat_vie_domestique › logements ×1 ; etre_humain › hygiene_soins_personnels ×1 ; etre_humain › sens_perception ×1 ; null ×1 | action ×7 ; etat ×1 ; evenement ×1 | 8 | `v_567_s1` |
| adverbes_expressions / alternance | 1 | null ×1 | concept_abstrait ×1 | 1 | `v_605_s1` |
| adverbes_expressions / appreciation | 2 | null ×2 | null ×2 | 2 | — |
| adverbes_expressions / approximation | 2 | nombres_quantification › approximation_quantitative ×1 ; temps › frequence ×1 | propriete ×1 ; concept_abstrait ×1 | 2 | — |
| adverbes_expressions / compagnie | 1 | relations_sociales › interactions_sociales ×1 | etat ×1 | 1 | — |
| adverbes_expressions / degre | 4 | null ×4 | null ×3 ; propriete ×1 | 4 | `v_495_s2` |
| adverbes_expressions / direction | 2 | espace_proprietes_spatiales › parcours_trajectoire ×1 ; null ×1 | propriete ×2 | 1 | `v_525_s2` |
| adverbes_expressions / diversite | 1 | null ×1 | propriete ×1 | 1 | `v_421_s1` |
| adverbes_expressions / etat_sante | 1 | null ×1 | etat ×1 | 1 | `v_512_s1` |
| adverbes_expressions / expressions_liaison | 9 | null ×9 | null ×9 | 9 | — |
| adverbes_expressions / frequence | 8 | temps › frequence ×4 ; null ×4 | concept_abstrait ×6 ; null ×1 ; propriete ×1 | 8 | `v_500_s1` `v_500_s2` `v_503_s1` `v_506_s2` |
| adverbes_expressions / liaison | 6 | null ×6 | null ×6 | 6 | — |
| adverbes_expressions / maniere | 2 | espace_proprietes_spatiales › vitesse ×1 ; null ×1 | propriete ×2 | 1 | `v_504_s2` |
| adverbes_expressions / mesure | 1 | null ×1 | propriete ×1 | 1 | `v_496_s1` |
| adverbes_expressions / politesse | 6 | null ×6 | null ×6 | 6 | — |
| adverbes_expressions / probabilite | 1 | null ×1 | null ×1 | 1 | `v_521_s1` |
| adverbes_expressions / progression | 1 | null ×1 | concept_abstrait ×1 | 1 | `v_425_s1` |
| adverbes_expressions / quantite | 10 | null ×4 ; nombres_quantification › quantite ×3 ; temps › duree ×2 ; nombres_quantification › totalite_partie ×1 | null ×6 ; concept_abstrait ×2 ; groupe_collectif ×2 | 10 | `v_606_s1` `v_687_s1` |
| adverbes_expressions / superlatif | 2 | null ×1 ; nombres_quantification › nombres ×1 | null ×1 ; concept_abstrait ×1 | 2 | — |
| adverbes_expressions / temps | 6 | temps › relations_temporelles ×5 ; temps › chronologie ×1 | concept_abstrait ×6 | 6 | — |
| cactions_generiques / actions_objets | 2 | habillement_accessoires_personnels › accessoires_vestimentaires ×1 ; null ×1 | action ×2 | 1 | `v_50_s2` |
| communication / actions_objets | 1 | null ×1 | propriete ×1 | 1 | `v_163_s1` |
| communication / conversation | 5 | communication_langage › parole_conversation ×4 ; etre_humain › sens_perception ×1 | action ×5 | 2 | — |
| communication / telephone | 6 | communication_langage › communication ×2 ; habillement_accessoires_personnels › accessoires_vestimentaires ×1 ; null ×1 ; nombres_quantification › nombres ×1 ; technologie › appareils_electroniques ×1 | action ×3 ; information_contenu ×1 ; objet_artefact ×1 ; evenement ×1 | 4 | `v_164_s3` |
| corps_sante / corps | 14 | etre_humain › corps ×13 ; etre_humain › psychologie_esprit ×1 | null ×13 ; propriete ×1 | 0 | `v_44_s1` `v_46_s1` `v_48_s1` `v_51_s1` `v_54_s1` `v_57_s1` `v_58_s1` `v_60_s1` `v_61_s1` `v_65_s1` `v_65_s2` `v_67_s1` `v_690_s2` |
| corps_sante / etat_sante | 1 | sante_medecine › symptomes_douleur ×1 | propriete ×1 | 1 | — |
| corps_sante / objets_personnels | 1 | habillement_accessoires_personnels › sacs_contenants_personnels ×1 | objet_artefact ×1 | 1 | — |
| corps_sante / sante | 3 | sante_medecine › maladies_troubles ×2 ; sante_medecine › medicaments ×1 | etat ×2 ; substance_matiere ×1 | 1 | — |
| corps_sante / ustensile | 1 | etre_humain › apparence_presentation_personnelle ×1 | null ×1 | 0 | `v_603_s1` |
| corps_sante / visage | 1 | etre_humain › corps ×1 | null ×1 | 0 | `v_716_s1` |
| descriptions_qualites / age | 3 | temps ×2 ; etre_humain › cycle_de_vie ×1 | propriete ×3 | 1 | — |
| descriptions_qualites / appreciation | 9 | null ×6 ; etre_humain › emotions_sentiments ×1 ; habitat_vie_domestique › entretien_domestique ×1 ; etre_humain › psychologie_esprit ×1 | propriete ×9 | 6 | `v_420_s1` `v_424_s1` `v_442_s1` `v_452_s1` `v_609_s1` `v_609_s2` |
| descriptions_qualites / caractere_bruit | 4 | null ×3 ; etre_humain › sens_perception ×1 | propriete ×4 | 1 | `v_422_s2` `v_478_s1` `v_489_s1` |
| descriptions_qualites / caracteristique | 2 | null ×2 | propriete ×2 | 1 | `v_432_s1` `v_458_s1` |
| descriptions_qualites / comparaison | 1 | null ×1 | propriete ×1 | 1 | `v_438_s1` |
| descriptions_qualites / competence | 4 | etre_humain › capacites_aptitudes ×2 ; null ×2 | propriete ×4 | 4 | `v_456_s1` `v_486_s1` |
| descriptions_qualites / couleurs | 15 | couleurs › couleurs_chromatiques ×9 ; couleurs › noir_blanc_gris ×4 ; monde_naturel › vegetation ×1 ; couleurs ×1 | propriete ×14 ; groupe_collectif ×1 | 1 | — |
| descriptions_qualites / dimension | 10 | espace_proprietes_spatiales › dimensions ×8 ; couleurs › teintes_nuances ×1 ; alimentation_cuisine › gouts_alimentaires ×1 | propriete ×10 | 10 | — |
| descriptions_qualites / etat_physique | 4 | null ×3 ; sante_medecine › sante_etats_pathologiques ×1 | propriete ×4 | 2 | `v_428_s1` `v_449_s1` `v_451_s1` |
| descriptions_qualites / etat_sante | 2 | etre_humain › etats_besoins_physiques ×1 ; null ×1 | etat ×2 | 1 | `v_457_s1` |
| descriptions_qualites / luminosite | 2 | couleurs › teintes_nuances ×1 ; etre_humain › psychologie_esprit ×1 | propriete ×2 | 2 | — |
| descriptions_qualites / poids | 4 | null ×3 ; sante_medecine › maladies_troubles ×1 | propriete ×4 | 3 | `v_62_s1` `v_484_s1` `v_484_s2` |
| descriptions_qualites / proprete | 4 | null ×3 ; habitat_vie_domestique › entretien_domestique ×1 | propriete ×4 | 1 | `v_461_s2` `v_462_s1` `v_462_s2` |
| descriptions_qualites / quantite | 3 | nombres_quantification › quantite ×3 | propriete ×2 ; groupe_collectif ×1 | 2 | — |
| descriptions_qualites / saveur | 6 | alimentation_cuisine › gouts_alimentaires ×4 ; null ×2 | propriete ×6 | 4 | `v_427_s2` `v_464_s2` |
| descriptions_qualites / securite | 1 | null ×1 | propriete ×1 | 1 | `v_434_s1` |
| descriptions_qualites / taille | 4 | espace_proprietes_spatiales › dimensions ×4 | propriete ×4 | 1 | — |
| descriptions_qualites / taille_dimensions | 1 | espace_proprietes_spatiales › dimensions ×1 | propriete ×1 | 1 | — |
| descriptions_qualites / temperature | 1 | etre_humain › sens_perception ×1 | propriete ×1 | 1 | — |
| descriptions_qualites / vitesse | 3 | espace_proprietes_spatiales › vitesse ×2 ; temps ×1 | propriete ×3 | 1 | — |
| divers / expressions_liaison | 1 | null ×1 | null ×1 | 1 | — |
| ecole_apprentissage / apprentissage | 3 | education_apprentissage › enseignement ×1 ; communication_langage › communication ×1 ; education_apprentissage › apprentissage ×1 | action ×3 | 1 | — |
| ecole_apprentissage / communication | 3 | communication_langage › parole_conversation ×2 ; communication_langage › expression ×1 | information_contenu ×2 ; evenement ×1 | 1 | — |
| ecole_apprentissage / cours | 3 | education_apprentissage › evaluation_scolaire ×1 ; education_apprentissage › enseignement ×1 ; education_apprentissage › vie_scolaire_universitaire ×1 | evenement ×2 ; information_contenu ×1 | 1 | — |
| ecole_apprentissage / ecriture_lecture | 1 | communication_langage › langues ×1 | objet_artefact ×1 | 1 | — |
| ecole_apprentissage / langues | 3 | communication_langage › langues ×2 ; communication_langage › expression ×1 | concept_abstrait ×2 ; information_contenu ×1 | 2 | — |
| ecole_apprentissage / personnes | 4 | education_apprentissage › acteurs_de_l_education ×3 ; relations_sociales › interactions_sociales ×1 | personne ×4 | 1 | — |
| ecole_apprentissage / temps | 1 | temps › chronologie ×1 | concept_abstrait ×1 | 1 | — |
| ecole_apprentissage / travail_scolaire | 1 | education_apprentissage › apprentissage ×1 | information_contenu ×1 | 1 | — |
| emotions_sentiments / emotions | 3 | couleurs › teintes_nuances ×1 ; etre_humain › psychologie_esprit ×1 ; etre_humain › emotions_sentiments ×1 | propriete ×3 | 1 | — |
| emotions_sentiments / etat_fatigue | 1 | etre_humain › etats_besoins_physiques ×1 | processus ×1 | 1 | — |
| emotions_sentiments / preferences | 5 | etre_humain › psychologie_esprit ×4 ; etre_humain › emotions_sentiments ×1 | propriete ×4 ; etat ×1 | 2 | — |
| emotions_sentiments / sensations | 5 | monde_naturel › meteo ×3 ; etre_humain › psychologie_esprit ×1 ; etre_humain › sens_perception ×1 | propriete ×5 | 1 | — |
| emotions_sentiments / sentiment | 1 | etre_humain › psychologie_esprit ×1 | propriete ×1 | 1 | — |
| lieux / batiment | 4 | habitat_vie_domestique › espaces_domestiques ×2 ; environnement_construit_espaces_humains › elements_architecturaux ×2 | lieu ×3 ; objet_artefact ×1 | 3 | — |
| lieux / loisirs | 2 | environnement_construit_espaces_humains › espaces_publics ×1 ; sports › installations_equipements_sportifs_specialises ×1 | lieu ×2 | 2 | — |
| lieux / restauration | 3 | alimentation_cuisine › restauration ×3 | lieu ×3 | 1 | — |
| loisirs / musique | 5 | arts_creation › musique ×5 | action ×2 ; information_contenu ×2 ; objet_artefact ×1 | 1 | — |
| maison_quotidien / batiments | 3 | droit_justice › application_de_la_loi ×1 ; politique_institutions_publiques › relations_internationales_diplomatie ×1 ; environnement_construit_espaces_humains › batiments_constructions ×1 | lieu ×3 | 3 | — |
| maison_quotidien / cuisine | 5 | alimentation_cuisine › vaisselle_ustensiles ×4 ; habitat_vie_domestique › espaces_domestiques ×1 | objet_artefact ×4 ; lieu ×1 | 1 | — |
| maison_quotidien / energie | 2 | sciences › physique ×1 ; habitat_vie_domestique › equipements_domestiques ×1 | null ×1 ; objet_artefact ×1 | 2 | `v_713_s1` |
| maison_quotidien / hygiene | 3 | habitat_vie_domestique › espaces_domestiques ×2 ; etre_humain › hygiene_soins_personnels ×1 | lieu ×2 ; substance_matiere ×1 | 3 | — |
| maison_quotidien / menage | 1 | habitat_vie_domestique › entretien_domestique ×1 | action ×1 | 1 | — |
| maison_quotidien / mobilier | 2 | habitat_vie_domestique › mobilier ×2 | objet_artefact ×2 | 1 | — |
| maison_quotidien / objets_maison | 5 | habitat_vie_domestique › accessoires_domestiques ×2 ; communication_langage › communication ×1 ; habitat_vie_domestique › rangement ×1 ; matieres_materiaux › materiaux_organiques ×1 | objet_artefact ×3 ; substance_matiere ×2 | 4 | — |
| maison_quotidien / pieces_maison | 8 | environnement_construit_espaces_humains › elements_architecturaux ×5 ; habitat_vie_domestique › espaces_domestiques ×3 | lieu ×5 ; objet_artefact ×3 | 4 | — |
| maison_quotidien / salle_de_bain | 1 | habitat_vie_domestique › espaces_domestiques ×1 | objet_artefact ×1 | 1 | — |
| maison_quotidien / ville | 3 | environnement_construit_espaces_humains › voirie ×1 ; territoires_lieux_geographiques › pays_territoires ×1 ; territoires_lieux_geographiques › villes_localites ×1 | lieu ×3 | 1 | — |
| medias_technologie / audio | 2 | medias › radio ×1 ; technologie › appareils_electroniques ×1 | objet_artefact ×2 | 2 | — |
| medias_technologie / photographie | 3 | arts_creation › arts_visuels ×2 ; technologie › appareils_electroniques ×1 | objet_artefact ×2 ; action ×1 | 2 | — |
| meteo_saisons / meteo | 3 | monde_naturel › meteo ×3 | etat ×2 ; processus ×1 | 1 | — |
| meteo_saisons / phenomenes_meteo | 7 | monde_naturel › meteo ×6 ; null ×1 | processus ×3 ; substance_matiere ×2 ; etat ×1 ; action ×1 | 2 | `v_266_s2` |
| meteo_saisons / saisons | 5 | temps › moments_periodes ×5 | concept_abstrait ×5 | 5 | — |
| meteo_saisons / temperature | 5 | etre_humain › sens_perception ×2 ; monde_naturel › meteo ×2 ; null ×1 | propriete ×5 | 5 | `v_265_s2` |
| nature_animaux / plantes | 3 | monde_naturel › vegetation ×2 ; matieres_materiaux › matieres_naturelles ×1 | organisme_vivant ×2 ; substance_matiere ×1 | 1 | — |
| nombres_quantites / compteurs | 19 | nombres_quantification › nombres ×9 ; etre_humain › cycle_de_vie ×8 ; communication_langage › lecture ×1 ; nombres_quantification › comptage_compteurs ×1 | quantite_valeur ×17 ; objet_artefact ×1 ; null ×1 | 1 | `v_648_s1` |
| nombres_quantites / compteurs_personnes | 3 | nombres_quantification › comptage_compteurs ×2 ; null ×1 | quantite_valeur ×2 ; etat ×1 | 2 | `v_627_s2` |
| nombres_quantites / mesures | 6 | nombres_quantification ×3 ; espace_proprietes_spatiales › distance_proximite ×1 ; espace_proprietes_spatiales › dimensions ×1 ; nombres_quantification › proportions ×1 | null ×5 ; quantite_valeur ×1 | 3 | `v_363_s1` `v_363_s2` `v_364_s1` `v_366_s1` `v_611_s1` |
| nourriture_boissons / aliments | 12 | alimentation_cuisine › aliments ×12 | substance_matiere ×12 | 5 | — |
| nourriture_boissons / animaux | 2 | monde_naturel › animaux ×1 ; alimentation_cuisine › aliments ×1 | organisme_vivant ×1 ; substance_matiere ×1 | 2 | — |
| nourriture_boissons / boisson | 1 | alimentation_cuisine › boissons ×1 | substance_matiere ×1 | 1 | — |
| nourriture_boissons / boissons | 6 | alimentation_cuisine › boissons ×5 ; alimentation_cuisine › aliments ×1 | substance_matiere ×6 | 6 | — |
| nourriture_boissons / condiment | 1 | alimentation_cuisine › aliments ×1 | substance_matiere ×1 | 1 | — |
| nourriture_boissons / cuisine | 2 | alimentation_cuisine › cuisine_preparation ×1 ; alimentation_cuisine › aliments ×1 | action ×1 ; substance_matiere ×1 | 2 | — |
| nourriture_boissons / produit_laitier | 1 | alimentation_cuisine › aliments ×1 | substance_matiere ×1 | 1 | — |
| nourriture_boissons / repas | 8 | alimentation_cuisine › repas ×5 ; alimentation_cuisine › aliments ×3 | evenement ×5 ; substance_matiere ×3 | 7 | — |
| nourriture_boissons / vie_quotidienne | 1 | alimentation_cuisine › consommation_alimentaire ×1 | action ×1 | 1 | — |
| objets / accessoire | 2 | null ×1 ; habitat_vie_domestique › accessoires_domestiques ×1 | objet_artefact ×2 | 1 | `v_671_s1` |
| objets / appareils | 1 | environnement_construit_espaces_humains › elements_architecturaux ×1 | objet_artefact ×1 | 1 | — |
| objets / audio | 2 | habitat_vie_domestique › accessoires_domestiques ×1 ; technologie › donnees ×1 | objet_artefact ×2 | 2 | — |
| objets / bagage | 1 | null ×1 | objet_artefact ×1 | 0 | `v_694_s1` |
| objets / consommation | 2 | null ×2 | objet_artefact ×1 ; substance_matiere ×1 | 0 | `v_598_s1` `v_598_s2` |
| objets / ecriture | 3 | communication_langage › ecriture ×2 ; communication_langage › communication ×1 | information_contenu ×2 ; propriete ×1 | 1 | — |
| objets / electronique | 1 | technologie › appareils_electroniques ×1 | objet_artefact ×1 | 1 | — |
| objets / materiel_scolaire | 1 | communication_langage › lecture ×1 | objet_artefact ×1 | 1 | — |
| personnes_famille / age | 2 | etre_humain › cycle_de_vie ×2 | personne ×2 | 2 | — |
| personnes_famille / famille | 28 | relations_sociales › famille_parente ×19 ; etre_humain › cycle_de_vie ×5 ; relations_sociales › interactions_sociales ×2 ; relations_sociales › couple_relations_intimes ×2 | personne ×25 ; groupe_collectif ×3 | 9 | — |
| personnes_famille / personnes | 7 | null ×4 ; droit_justice › application_de_la_loi ×2 ; etre_humain › cycle_de_vie ×1 | personne ×7 | 4 | `v_633_s1` `v_657_s1` `v_667_s1` `v_686_s1` |
| position_direction / demonstratifs_direction | 4 | espace_proprietes_spatiales › direction_orientation ×2 ; null ×2 | null ×4 | 4 | — |
| position_direction / demonstratifs_objets | 1 | null ×1 | null ×1 | 1 | — |
| position_direction / dimension | 1 | espace_proprietes_spatiales › dimensions ×1 | propriete ×1 | 1 | — |
| position_direction / distance | 2 | espace_proprietes_spatiales › distance_proximite ×2 | propriete ×2 | 1 | — |
| position_direction / ordre | 1 | null ×1 | concept_abstrait ×1 | 1 | `v_675_s1` |
| position_direction / orientation | 4 | espace_proprietes_spatiales › direction_orientation ×4 | concept_abstrait ×4 | 4 | — |
| position_direction / position | 16 | espace_proprietes_spatiales › position_localisation ×9 ; espace_proprietes_spatiales › distance_proximite ×3 ; temps › chronologie ×2 ; espace_proprietes_spatiales › forme ×1 ; temps › moments_periodes ×1 | lieu ×12 ; concept_abstrait ×3 ; null ×1 | 6 | `v_696_s1` |
| pronoms_demonstratifs / demonstratifs_direction | 8 | espace_proprietes_spatiales › direction_orientation ×4 ; null ×3 ; espace_proprietes_spatiales › position_localisation ×1 | null ×7 ; lieu ×1 | 8 | — |
| pronoms_demonstratifs / demonstratifs_lieux | 3 | espace_proprietes_spatiales › position_localisation ×3 | null ×3 | 3 | — |
| pronoms_demonstratifs / demonstratifs_objets | 5 | null ×5 | null ×5 | 5 | — |
| pronoms_demonstratifs / demonstratifs_qualites | 1 | null ×1 | null ×1 | 1 | — |
| pronoms_demonstratifs / pronom | 4 | null ×4 | personne ×4 | 3 | `v_691_s1` `v_700_s1` |
| questions / interrogatifs | 8 | null ×7 ; espace_proprietes_spatiales › direction_orientation ×1 | null ×8 | 8 | — |
| questions / lieu | 1 | espace_proprietes_spatiales › position_localisation ×1 | null ×1 | 1 | — |
| questions / quantite | 1 | nombres_quantification ×1 | null ×1 | 1 | — |
| questions / raison_maniere | 4 | null ×4 | null ×4 | 4 | — |
| questions / temps | 1 | temps ×1 | null ×1 | 1 | — |
| temps_calendrier / calendrier | 2 | null ×1 ; temps › calendrier ×1 | objet_artefact ×1 ; concept_abstrait ×1 | 1 | `v_287_s1` |
| temps_calendrier / distance | 1 | temps › moments_periodes ×1 | concept_abstrait ×1 | 1 | — |
| temps_calendrier / frequence | 6 | temps › frequence ×6 | concept_abstrait ×6 | 6 | — |
| temps_calendrier / jours | 32 | temps › calendrier ×17 ; temps › duree ×10 ; temps › moments_periodes ×5 | concept_abstrait ×22 ; quantite_valeur ×10 | 22 | — |
| temps_calendrier / mesures | 2 | nombres_quantification › proportions ×1 ; temps › unites_temporelles ×1 | quantite_valeur ×2 | 2 | — |
| temps_calendrier / moments_journee | 11 | temps › moments_periodes ×10 ; alimentation_cuisine › repas ×1 | concept_abstrait ×10 ; evenement ×1 | 11 | — |
| temps_calendrier / periodes | 17 | temps › moments_periodes ×11 ; temps › duree ×3 ; temps › calendrier ×1 ; etre_humain › cycle_de_vie ×1 ; temps › unites_temporelles ×1 | concept_abstrait ×13 ; quantite_valeur ×2 ; propriete ×1 ; null ×1 | 15 | `v_321_s2` |
| temps_calendrier / repos | 1 | temps › moments_periodes ×1 | concept_abstrait ×1 | 1 | — |
| temps_calendrier / temps | 4 | temps › moments_periodes ×1 ; temps › chronologie ×1 ; espace_proprietes_spatiales › position_localisation ×1 ; nombres_quantification › totalite_partie ×1 | concept_abstrait ×3 ; lieu ×1 | 4 | — |
| transports / mouvement_deplacement | 1 | transport_mobilite › utilisation_des_transports ×1 | action ×1 | 1 | — |
| transports / titre_transport | 1 | transport_mobilite › utilisation_des_transports ×1 | objet_artefact ×1 | 1 | — |
| transports / transports | 1 | transport_mobilite › reseaux_infrastructures ×1 | lieu ×1 | 1 | — |
| transports / transports_publics | 4 | transport_mobilite › transport_terrestre ×2 ; transport_mobilite › transport_ferroviaire ×2 | objet_artefact ×4 | 2 | — |
| travail_entreprise / entreprise | 1 | travail_vie_professionnelle › entreprises_organisations_professionnelles ×1 | organisation ×1 | 1 | — |
| travail_entreprise / etat | 1 | null ×1 | etat ×1 | 0 | `v_144_s1` |
| travail_entreprise / travail | 2 | travail_vie_professionnelle › travail_emploi ×2 | action ×2 | 1 | — |
| vetements / accessoires | 6 | habillement_accessoires_personnels › accessoires_vestimentaires ×4 ; technologie › appareils_electroniques ×1 ; habillement_accessoires_personnels › vetements ×1 | objet_artefact ×6 | 1 | — |
| vetements / actions_vestimentaires | 1 | habillement_accessoires_personnels › vetements ×1 | action ×1 | 1 | — |
| vetements / meteo | 2 | monde_naturel › meteo ×1 ; null ×1 | processus ×2 | 1 | `v_80_s2` |
| vetements / vetements | 9 | habillement_accessoires_personnels › vetements ×9 | objet_artefact ×7 ; action ×2 | 1 | — |

## Annexe D · Familles des 147 `null`, pour le volet 2

Regroupement **automatique** des 147 avertissements d'après la formulation de leur raison journalisée. Il prépare la lecture ; il ne classe aucun cas. Un cas tombe dans la première famille dont sa raison contient la formule.

### type-nul (27)

| Famille (formulation de la raison) | Cas | Sens | Dont candidats au volet 1 |
|---|---|---|---|
| partie du corps, corps | 14 | `v_44_s1` お腹 ; `v_46_s1` 体 ; `v_48_s1` 口 ; `v_51_s1` 手 ; `v_54_s1` 歯 ; `v_57_s1` 目 ; `v_58_s1` 耳 ; `v_60_s1` 足 ; `v_603_s1` 髪 ; `v_61_s1` 身体 ; `v_65_s1` 頭 ; `v_67_s1` 鼻 ; `v_690_s2` 背 ; `v_716_s1` 顔 | 0 |
| unité de mesure ou de comptage | 7 | `v_321_s2` 時間 ; `v_363_s1` キロ ; `v_363_s2` キロ ; `v_364_s1` キログラム ; `v_366_s1` メートル ; `v_611_s1` グラム ; `v_648_s1` 匹 | 3 |
| autre formulation | 4 | `v_500_s2` また ; `v_521_s1` たぶん ; `v_65_s2` 頭 ; `v_713_s1` 電気 | 3 |
| son | 1 | `v_653_s1` 声 | 0 |
| partie d'une chose | 1 | `v_696_s1` 表 | 0 |

### categorie-nulle (120)

| Famille (formulation de la raison) | Cas | Sens | Dont candidats au volet 1 |
|---|---|---|---|
| action générale | 36 | `v_130_s1` 引く ; `v_164_s3` かける ; `v_266_s2` 吹く ; `v_50_s2` 差す ; `v_522_s1` 付ける ; `v_522_s2` 付ける ; `v_526_s1` コピーする ; `v_528_s1` 並ぶ ; `v_532_s1` 作る ; `v_533_s1` 借りる ; `v_536_s3` 出す ; `v_539_s1` 切る ; `v_539_s2` 切る ; `v_541_s1` 取る ; `v_541_s2` 取る ; `v_542_s2` 吸う ; `v_545_s1` 変える ; `v_551_s1` 座る ; `v_552_s1` 待つ ; `v_561_s1` 消す ; `v_562_s1` 渡す ; `v_564_s1` 無くす ; `v_567_s1` 磨く ; `v_568_s1` 立つ ; `v_575_s1` 貸す ; `v_576_s1` 貼る ; `v_578_s1` 返す ; `v_580_s1` 開ける ; `v_608_s2` やる ; `v_635_s2` 休む ; `v_637_s1` 使う ; `v_642_s2` 出る ; `v_642_s3` 出る ; `v_665_s1` 持つ ; `v_709_s1` 閉める ; `v_79_s1` 押す | 12 |
| propriété générale | 29 | `v_265_s2` 冷たい ; `v_420_s1` いい ; `v_421_s1` いろいろ ; `v_422_s2` うるさい ; `v_427_s2` まずい ; `v_428_s1` 丈夫 ; `v_432_s1` 便利 ; `v_434_s1` 危ない ; `v_438_s1` 同じ ; `v_442_s1` 大切 ; `v_449_s1` 弱い ; `v_451_s1` 強い ; `v_452_s1` 悪い ; `v_456_s1` 易しい ; `v_461_s2` 汚い ; `v_462_s1` 清い ; `v_462_s2` 清い ; `v_464_s2` 甘い ; `v_478_s1` 賑やか ; `v_484_s1` 重い ; `v_484_s2` 重い ; `v_486_s1` 難しい ; `v_489_s1` 静か ; `v_495_s2` 大変 ; `v_513_s2` 意味 ; `v_609_s1` 立派 ; `v_609_s2` 立派 ; `v_62_s1` 軽い ; `v_646_s1` 力 | 14 |
| aucune catégorie ne nomme la notion | 18 | `v_144_s1` 忙しい ; `v_287_s1` カレンダー ; `v_425_s1` だんだん ; `v_457_s1` 暇 ; `v_500_s1` また ; `v_503_s1` もう一度 ; `v_504_s2` ゆっくり ; `v_510_s1` 本当 ; `v_525_s2` まっすぐ ; `v_542_s1` 吸う ; `v_558_s1` 死ぬ ; `v_598_s1` たばこ ; `v_598_s2` たばこ ; `v_627_s2` 一人 ; `v_653_s1` 声 ; `v_671_s1` 時計 ; `v_685_s1` 生活 ; `v_694_s1` 荷物 | 6 |
| autre formulation | 12 | `v_181_s1` する ; `v_424_s1` きれい ; `v_458_s1` 有名 ; `v_500_s2` また ; `v_506_s2` よく ; `v_511_s1` 問題 ; `v_521_s1` たぶん ; `v_523_s2` 出来る ; `v_605_s1` 他 ; `v_608_s1` やる ; `v_664_s2` 所 ; `v_684_s1` 物 | 9 |
| état général | 8 | `v_361_s1` 違う ; `v_361_s2` 違う ; `v_512_s1` 大丈夫 ; `v_516_s1` ある ; `v_516_s2` ある ; `v_548_s1` 居る ; `v_573_s1` 要る ; `v_665_s2` 持つ | 5 |
| personne générique | 8 | `v_606_s1` 皆 ; `v_633_s1` 人 ; `v_657_s1` 女 ; `v_667_s1` 方 ; `v_686_s1` 男 ; `v_687_s1` 皆さん ; `v_691_s1` 自分 ; `v_700_s1` 誰か | 4 |
| événement, processus ou phénomène général | 6 | `v_524_s1` なる ; `v_560_s1` 消える ; `v_560_s2` 消える ; `v_579_s1` 閉まる ; `v_710_s1` 開く ; `v_80_s2` 曇る | 4 |
| fiche qui déborde un domaine | 3 | `v_163_s1` かかる ; `v_496_s1` ちょうど ; `v_675_s1` 次 | 3 |

## Annexe E · Autres relevés

### Classe grammaticale × type sémantique

| Classe | Type | Sens | Sens typés de la classe |
|---|---|---|---|
| adjectif_i | propriete | 76 | 78 |
| adjectif_i | etat | 2 | 78 |
| adjectif_na | propriete | 21 | 24 |
| adjectif_na | etat | 3 | 24 |
| adverbe | concept_abstrait | 18 | 25 |
| adverbe | propriete | 7 | 25 |
| determinant | propriete | 3 | 3 |
| nom | objet_artefact | 91 | 431 |
| nom | concept_abstrait | 77 | 431 |
| nom | lieu | 64 | 431 |
| nom | personne | 42 | 431 |
| nom | quantite_valeur | 36 | 431 |
| nom | substance_matiere | 34 | 431 |
| nom | information_contenu | 23 | 431 |
| nom | propriete | 15 | 431 |
| nom | evenement | 14 | 431 |
| nom | action | 10 | 431 |
| nom | groupe_collectif | 8 | 431 |
| nom | organisme_vivant | 8 | 431 |
| nom | etat | 7 | 431 |
| nom | organisation | 1 | 431 |
| nom | processus | 1 | 431 |
| numeral | quantite_valeur | 15 | 15 |
| pronom | personne | 4 | 5 |
| pronom | groupe_collectif | 1 | 5 |
| verbe | action | 108 | 145 |
| verbe | etat | 14 | 145 |
| verbe | evenement | 13 | 145 |
| verbe | processus | 7 | 145 |
| verbe | propriete | 2 | 145 |
| verbe | resultat | 1 | 145 |

### Même traduction principale dans deux ENTRY

77 groupes. Ceux dont la catégorie, le type ou les fonctions diffèrent sont candidats (C1-a, C3-b, C7-d) ; les 55 autres sont traités de façon identique.

### Lexique des fonctions, hors fenêtre

- `v_394_s1` どうして « Pourquoi » (lot 11) : sans `deictique`, terme « il »
- `v_413_s1` じゃあ « Alors » (lot 23) : sans `deictique`, terme « ce »
- `v_413_s2` じゃあ « Eh bien » (lot 23) : sans `intensifieur`, terme « bien »
- `v_417_s1` それでは « Dans ce cas » (lot 23) : sans `deictique`, terme « ce »
- `v_417_s2` それでは « Alors » (lot 23) : sans `connecteur`, terme « alors »
- `v_417_s3` それでは « Sur ce » (lot 23) : sans `deictique`, terme « ce »
- `v_418_s1` では « Dans ce cas » (lot 23) : sans `deictique`, terme « ce »
- `v_418_s2` では « Eh bien » (lot 23) : sans `intensifieur`, terme « bien »
- `v_418_s3` では « Alors » (lot 23) : sans `connecteur`, terme « alors »
- `v_447_s1` 少ない « Peu nombreux » (lot 24) : sans `quantificateur`, terme « peu », « nombreux »
- `v_471_s1` 結構 « Assez » (lot 24) : sans `quantificateur`, terme « assez »
- `v_471_s2` 結構 « Non merci » (lot 24) : sans `discours`, terme « non »
- `v_509_s2` 少し « Un peu » (lot 24) : sans `quantificateur`, terme « peu », « un peu »
- `v_512_s1` 大丈夫 « Ça va » (lot 16) : sans `deictique`, terme « ça »
- `v_515_s1` あまり « Pas tellement » (lot 24) : sans `quantificateur`, terme « beaucoup »
- `v_546_s1` 大体 « À peu près » (lot 24) : sans `quantificateur`, terme « peu »
- `v_584_s2` いいえ « De rien » (lot 23) : sans `quantificateur`, terme « tout »
- `v_595_s1` じゃ « Dans ce cas » (lot 23) : sans `deictique`, terme « ce »
- `v_595_s3` じゃ « Alors » (lot 23) : sans `connecteur`, terme « alors »
- `v_600_s1` どうぞ « S'il vous plaît » (lot 23) : sans `deictique`, terme « je », « vous », « il »
- `v_654_s1` 多い « Nombreux » (lot 24) : sans `quantificateur`, terme « beaucoup », « nombreux »
- `v_655_s1` 大勢 « Beaucoup de monde » (lot 24) : sans `quantificateur`, terme « beaucoup »
- `v_675_s1` 次 « Suivant » (lot 20) : sans `deictique`, terme « prochain »

### Relations publiées

| De | Type | Vers | Même catégorie | Même type |
|---|---|---|---|---|
| `v_181_s1` する « Faire » | equivalent_to | `v_608_s1` やる « Faire » | oui | oui |
| `v_208_s1` お風呂 « Bain » | equivalent_to | `v_209_s1` ふろ « Bain » | oui | oui |
| `v_344_s1` はい « Oui » | equivalent_to | `v_586_s1` ええ « Oui » | oui | oui |
| `v_344_s1` はい « Oui » | opposed_to | `v_584_s1` いいえ « Non » | oui | oui |
| `v_413_s1` じゃあ « Alors » | equivalent_to | `v_417_s1` それでは « Dans ce cas » | oui | oui |
| `v_413_s2` じゃあ « Eh bien » | equivalent_to | `v_417_s2` それでは « Alors » | oui | oui |
| `v_416_s1` それから « Ensuite » | equivalent_to | `v_596_s1` そうして « Et puis » | oui | oui |
| `v_418_s1` では « Dans ce cas » | equivalent_to | `v_595_s1` じゃ « Dans ce cas » | oui | oui |
| `v_418_s2` では « Eh bien » | equivalent_to | `v_595_s2` じゃ « Bon » | oui | oui |
| `v_418_s3` では « Alors » | equivalent_to | `v_595_s3` じゃ « Alors » | oui | oui |
| `v_447_s1` 少ない « Peu nombreux » | opposed_to | `v_654_s1` 多い « Nombreux » | non | oui |
| `v_497_s1` ちょっと « Un peu » | similar_to | `v_509_s1` 少し « Une petite quantité » | oui | oui |
| `v_497_s2` ちょっと « Un instant » | similar_to | `v_509_s3` 少し « Un court instant » | oui | oui |
| `v_527_s1` 上げる « Donner » | similar_to | `v_608_s2` やる « Donner (à des plantes, des animaux) » | non | oui |
| `v_529_s1` 並べる « Aligner » | transitive_of | `v_528_s2` 並ぶ « Être aligné » | oui | non |
| `v_533_s1` 借りる « Emprunter » | reciprocal_with | `v_575_s1` 貸す « Prêter » | oui | oui |
| `v_561_s1` 消す « Éteindre » | transitive_of | `v_560_s1` 消える « S'éteindre » | oui | non |
| `v_562_s2` 渡す « Faire traverser » | transitive_of | `v_563_s1` 渡る « Traverser » | oui | oui |
| `v_580_s1` 開ける « Ouvrir » | transitive_of | `v_710_s1` 開く « S'ouvrir » | oui | non |
| `v_584_s1` いいえ « Non » | opposed_to | `v_586_s1` ええ « Oui » | oui | oui |
| `v_593_s1` しかし « Cependant » | equivalent_to | `v_599_s1` でも « Mais » | oui | oui |
| `v_709_s1` 閉める « Fermer » | transitive_of | `v_579_s1` 閉まる « Se fermer » | oui | non |

## Annexe F · Lexiques des règles lexicales

Ces lexiques sont des outils de criblage, écrits pour ce contrôle. Ils ne sont pas normatifs et n'ont aucune autorité sur la définition d'une dimension ou d'une fonction. La recherche porte sur la traduction principale et les alternatives, en mot entier.

**C5-b · termes de pôle (A2-DIM)**

- `possibilite_impossibilite` : possible, impossible, pouvoir
- `necessite_facultativite` : nécessaire, necessaire, obligatoire, facultatif, falloir, avoir besoin, indispensable
- `probabilite` : probable, probablement, peut-être, sans doute
- `certitude_incertitude` : certain, certainement, sûr, sûrement, incertain
- `facilite_difficulte` : facile, difficile, dur, aisé
- `simplicite_complexite` : simple, compliqué, complexe
- `validite_invalidite` : valide, valable, invalide
- `exactitude_inexactitude` : exact, exactement, juste, correct, inexact, erroné, se tromper, erreur
- `precision_imprecision` : précis, précisément, vague, ambigu, environ, à peu près
- `adequation_inadequation` : convenable, approprié, adéquat, convenir
- `reel_fictif` : réel, fictif, imaginaire
- `vrai_faux` : vrai, vérité, faux, mensonge
- `evidence_non_evidence` : évident, évidemment, bien sûr
- `normal_anormal` : normal, anormal, étrange, bizarre
- `habituel_exceptionnel` : habituel, ordinaire, exceptionnel, spécial, d'habitude
- `attendu_inattendu` : inattendu, soudain, tout à coup
- `importance_insignifiance` : important, précieux, insignifiant, grave
- `utilite_inutilite` : utile, pratique, inutile, commode
- `efficacite_inefficacite` : efficace, inefficace
- `avantage_desavantage` : avantage, désavantage, inconvénient
- `complet_incomplet` : complet, complètement, entier, incomplet, tout à fait
- `uniforme_non_uniforme` : uniforme, varié, divers
- `ordonne_desordonne` : ordonné, rangé, désordre, en ordre
- `fonctionnel_defaillant` : fonctionner, en panne, cassé, se casser, tomber en panne
- `actif_inactif` : actif, inactif
- `concret_abstrait` : concret, abstrait

**C7-b et C7-c · termes de fonction (A7, A9)**

- `deictique` : ce, cet, cette, ces, ceci, cela, ça, celui-ci, celui-là, ici, là, là-bas, maintenant, aujourd'hui, hier, demain, avant-hier, après-demain, ce matin, ce soir, cette année, l'année dernière, l'année prochaine, le mois dernier, le mois prochain, la semaine dernière, la semaine prochaine, prochain, dernier, il y a, bientôt, prochainement, tout à l'heure, plus tard, récemment, je, moi, tu, toi, nous, vous, il, elle, lui, eux
- `connecteur` : mais, et, donc, alors, puis, ensuite, cependant, pourtant, parce que, de plus, en outre, ou, ou bien, par exemple, c'est pourquoi, et puis, après cela
- `quantificateur` : beaucoup, peu, un peu, tout, tous, toutes, chaque, plusieurs, quelques, assez, trop, seulement, nombreux, aucun, la plupart, la moitié, tout le monde, ensemble
- `comparatif` : plus, moins, le plus, autant, davantage, même, pareil, différent
- `intensifieur` : très, vraiment, extrêmement, tellement, fort, bien, tout à fait, si
- `politesse` : s'il vous plaît, merci, excusez-moi, pardon, bienvenue, je vous en prie, de rien, monsieur, madame, bonjour, bonsoir, au revoir, enchanté, désolé
- `discours` : oui, non, eh bien, bon, tiens, allô, ah, euh, voilà, d'accord, n'est-ce pas

**C10-a · formulations cherchées dans les raisons** : « sans définition », « aucune définition », « pas de définition », « non défini », « sans règle A2-LING », « définition normative » ; « en attente », « pour l'instant », « provisoire », « à reprendre », « à revoir », « à réexaminer », « réservé », « audit A2-05 », « à l'audit », « passe finale », « 5.16 ».

## Annexe G · Échantillons de contrôle

Chaque ligne a été lue individuellement. « 147 » : le sens porte aussi un avertissement audité au volet 2.

### G.1 Échantillon de développement (58 sens, graine 20261007)

| # | SENSE | Mot | Classe | Sens | Catégorie | Type | 147 | Résultat de la lecture |
|---|---|---|---|---|---|---|---|---|
| 1 | `v_44_s1` | お腹 | nom | Ventre | etre_humain › corps › tronc | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 2 | `v_455_s1` | 明るい | adjectif_i | Lumineux | couleurs › teintes_nuances › clair_fonce | propriete | — | **faiblesse du criblage** (§6.1) ; candidat par C1-g |
| 3 | `v_27_s1` | 外国人 | nom | Étranger | politique_institutions_publiques › citoyennete › nationalite | personne | — | aucun écart relevé |
| 4 | `v_633_s1` | 人 | nom | Personne | null | personne | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 5 | `v_16_s1` | お兄さん | nom | Grand frère | relations_sociales › famille_parente › fratrie | personne | — | aucun écart relevé |
| 6 | `v_716_s1` | 顔 | nom | Visage | etre_humain › corps › tete_visage | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 7 | `v_481_s1` | 辛い | adjectif_i | Épicé | alimentation_cuisine › gouts_alimentaires › epice | propriete | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 8 | `v_93_s1` | カップ | nom | Tasse | alimentation_cuisine › vaisselle_ustensiles › vaisselle | objet_artefact | — | aucun écart relevé |
| 9 | `v_230_s1` | コップ | nom | Verre | alimentation_cuisine › vaisselle_ustensiles › vaisselle | objet_artefact | — | aucun écart relevé |
| 10 | `v_236_s1` | 箱 | nom | Boîte | habitat_vie_domestique › rangement | objet_artefact | — | aucun écart relevé |
| 11 | `v_708_s1` | 門 | nom | Portail | environnement_construit_espaces_humains › elements_architecturaux › portes_fenetres | objet_artefact | — | aucun écart relevé |
| 12 | `v_711_s1` | 階段 | nom | Escalier | environnement_construit_espaces_humains › elements_architecturaux › escaliers | objet_artefact | — | aucun écart relevé |
| 13 | `v_146_s1` | 郵便局 | nom | Bureau de poste | communication_langage › communication › transmission | lieu | — | aucun écart relevé |
| 14 | `v_213_s1` | 入る | verbe | Entrer | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 15 | `v_246_s1` | 建物 | nom | Bâtiment | environnement_construit_espaces_humains › batiments_constructions › batiments | lieu | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-g) |
| 16 | `v_157_s1` | 走る | verbe | Courir | espace_proprietes_spatiales › mouvement_deplacement | action | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 17 | `v_701_s1` | 買い物 | nom | Courses | economie_commerce › achat_vente › achat | action | — | aucun écart relevé |
| 18 | `v_70_s1` | シャツ | nom | Chemise | habillement_accessoires_personnels › vetements › hauts | objet_artefact | — | aucun écart relevé |
| 19 | `v_186_s1` | 店 | nom | Magasin | economie_commerce › etablissements_commerciaux › magasins | lieu | — | aucun écart relevé |
| 20 | `v_32_s1` | 学生 | nom | Étudiant | education_apprentissage › acteurs_de_l_education | personne | — | aucun écart relevé |
| 21 | `v_170_s1` | 字 | nom | Caractère | communication_langage › ecriture › systemes_d_ecriture | information_contenu | — | aucun écart relevé |
| 22 | `v_666_s1` | 文章 | nom | Texte | communication_langage › lecture › texte | information_contenu | — | aucun écart relevé |
| 23 | `v_132_s1` | 教える | verbe | Enseigner | education_apprentissage › enseignement › enseigner | action | — | aucun écart relevé |
| 24 | `v_253_s1` | 山 | nom | Montagne | monde_naturel › reliefs_formations_naturelles › montagnes | lieu | — | aucun écart relevé |
| 25 | `v_281_s1` | 雪 | nom | Neige | monde_naturel › meteo › neige | substance_matiere | — | aucun écart relevé |
| 26 | `v_178_s2` | 電話 | nom | Appel téléphonique | communication_langage › communication › contact | evenement | — | aucun écart relevé |
| 27 | `v_164_s1` | かける | verbe | Passer (un appel) | communication_langage › communication › contact | action | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 28 | `v_166_s1` | ニュース | nom | Informations | medias › information_mediatique › actualites | information_contenu | — | aucun écart relevé |
| 29 | `v_193_s1` | 散歩 | nom | Promenade | loisirs_jeux › activites_recreatives › promenade_de_loisir | action | — | aucun écart relevé |
| 30 | `v_243_s1` | 国 | nom | Pays | territoires_lieux_geographiques › pays_territoires › pays | lieu | — | aucun écart relevé |
| 31 | `v_630_s1` | 下 | nom | Dessous | espace_proprietes_spatiales › position_localisation › dessus_dessous | lieu | — | aucun écart relevé |
| 32 | `v_700_s1` | 誰か | pronom | Quelqu'un | null | personne | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 33 | `v_287_s1` | カレンダー | nom | Calendrier | null | objet_artefact | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 34 | `v_383_s1` | 六つ | nom | Six (objets) | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 35 | `v_373_s2` | 三つ | nom | Trois ans (âge) | etre_humain › cycle_de_vie | quantite_valeur | — | aucun écart relevé |
| 36 | `v_370_s2` | 七つ | nom | Sept ans (âge) | etre_humain › cycle_de_vie | quantite_valeur | — | aucun écart relevé |
| 37 | `v_445_s1` | 小さい | adjectif_i | Petit | espace_proprietes_spatiales › dimensions › taille | propriete | — | aucun écart relevé |
| 38 | `v_693_s1` | 茶色 | nom | Marron | couleurs › couleurs_chromatiques › brun | propriete | — | aucun écart relevé |
| 39 | `v_490_s1` | 黄色 | nom | Jaune | couleurs › couleurs_chromatiques › jaune | propriete | — | aucun écart relevé |
| 40 | `v_5_s1` | 楽しい | adjectif_i | Amusant | etre_humain › emotions_sentiments › joie_plaisir | propriete | — | aucun écart relevé |
| 41 | `v_462_s2` | 清い | adjectif_i | Pur (moralement) | null | propriete | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 42 | `v_681_s1` | 温い | adjectif_i | Tiède | etre_humain › sens_perception › toucher_sensations | propriete | — | **faiblesse du criblage** (§6.1) ; candidat par C1-f |
| 43 | `v_130_s2` | 引く | verbe | Chercher (dans un dictionnaire) | communication_langage › langues | action | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-g, C1-h) |
| 44 | `v_535_s1` | 入れる | verbe | Mettre dans | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 45 | `v_551_s1` | 座る | verbe | S'asseoir | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 46 | `v_49_s2` | 寝る | verbe | Se coucher | etre_humain › etats_besoins_physiques › sommeil_repos | action | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 47 | `v_548_s1` | 居る | verbe | Y avoir (pour les êtres vivants) | null | etat | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 48 | `v_454_s1` | 早い | adjectif_i | Tôt | temps | propriete | — | aucun écart relevé |
| 49 | `v_504_s1` | ゆっくり | adverbe | Lentement | espace_proprietes_spatiales › vitesse | propriete | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 50 | `v_655_s1` | 大勢 | nom | Beaucoup de monde | nombres_quantification › quantite › grande_quantite | groupe_collectif | — | aucun écart relevé |
| 51 | `v_489_s1` | 静か | adjectif_na | Calme | null | propriete | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 52 | `v_446_s1` | 小さな | determinant | Petit | espace_proprietes_spatiales › dimensions › taille | propriete | — | aucun écart relevé |
| 53 | `v_369_s1` | 七 | numeral | Sept | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 54 | `v_151_s1` | 地下鉄 | nom | Métro | transport_mobilite › transport_ferroviaire › metro | objet_artefact | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C8-c) |
| 55 | `v_65_s1` | 頭 | nom | Tête | etre_humain › corps › tete_visage | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 56 | `v_262_s1` | 鳥 | nom | Oiseau | monde_naturel › animaux › oiseaux | organisme_vivant | — | aucun écart relevé |
| 57 | `v_384_s1` | 十 | numeral | Dix | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 58 | `v_560_s2` | 消える | verbe | Disparaître | null | evenement | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |

### G.2 Échantillon de validation 1 (50 sens, graine 20261008) : non concluant

| # | SENSE | Mot | Classe | Sens | Catégorie | Type | 147 | Résultat de la lecture |
|---|---|---|---|---|---|---|---|---|
| 1 | `v_374_s1` | 九 | numeral | Neuf | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 2 | `v_555_s1` | 曲がる | verbe | Tourner | espace_proprietes_spatiales › direction_orientation › orientation | action | — | aucun écart relevé |
| 3 | `v_609_s1` | 立派 | adjectif_na | Magnifique | null | propriete | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 4 | `v_690_s1` | 背 | nom | Taille | etre_humain › corps › caracteristiques_corporelles | propriete | — | aucun écart relevé |
| 5 | `v_690_s2` | 背 | nom | Dos | etre_humain › corps › tronc | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 6 | `v_35_s1` | 家族 | nom | Famille | relations_sociales › famille_parente | groupe_collectif | — | aucun écart relevé |
| 7 | `v_11_s1` | おじいさん | nom | Grand-père | relations_sociales › famille_parente › grands_parents_descendants | personne | — | aucun écart relevé |
| 8 | `v_231_s1` | スプーン | nom | Cuillère | alimentation_cuisine › vaisselle_ustensiles › couverts | objet_artefact | — | aucun écart relevé |
| 9 | `v_90_s1` | とり肉 | nom | Poulet (viande) | alimentation_cuisine › aliments › viandes | substance_matiere | — | aucun écart relevé |
| 10 | `v_109_s1` | 牛肉 | nom | Bœuf (viande) | alimentation_cuisine › aliments › viandes | substance_matiere | — | aucun écart relevé |
| 11 | `v_33_s1` | 家 | nom | Maison | habitat_vie_domestique › logements › maisons | lieu | — | aucun écart relevé |
| 12 | `v_210_s1` | ドア | nom | Porte | environnement_construit_espaces_humains › elements_architecturaux › portes_fenetres | objet_artefact | — | aucun écart relevé |
| 13 | `v_617_s1` | トイレ | nom | Toilettes | habitat_vie_domestique › espaces_domestiques › salle_de_bain_toilettes | lieu | — | **faiblesse du criblage** (§6.2) ; candidat par C8-c |
| 14 | `v_147_s1` | タクシー | nom | Taxi | transport_mobilite › transport_terrestre › transport_routier | objet_artefact | — | aucun écart relevé |
| 15 | `v_255_s1` | 村 | nom | Village | territoires_lieux_geographiques › villes_localites › villages | lieu | — | aucun écart relevé |
| 16 | `v_642_s1` | 出る | verbe | Sortir | espace_proprietes_spatiales › entree_sortie › entrer_sortir | action | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 17 | `v_557_s1` | 止まる | verbe | S'arrêter | espace_proprietes_spatiales › mouvement_deplacement | evenement | — | aucun écart relevé à la lecture ; devenu candidat par une règle révisée (C1-h) |
| 18 | `v_73_s1` | ネクタイ | nom | Cravate | habillement_accessoires_personnels › accessoires_vestimentaires › cravates | objet_artefact | — | aucun écart relevé |
| 19 | `v_618_s1` | ハンカチ | nom | Mouchoir (en tissu) | habillement_accessoires_personnels › accessoires_vestimentaires | objet_artefact | — | aucun écart relevé |
| 20 | `v_182_s1` | デパート | nom | Grand magasin | economie_commerce › etablissements_commerciaux › magasins | lieu | — | aucun écart relevé |
| 21 | `v_78_s1` | 帽子 | nom | Chapeau | habillement_accessoires_personnels › accessoires_vestimentaires › couvre_chefs | objet_artefact | — | aucun écart relevé |
| 22 | `v_126_s1` | 大学 | nom | Université | education_apprentissage › etablissements_educatifs › universite | lieu | — | aucun écart relevé |
| 23 | `v_38_s1` | 生徒 | nom | Élève | education_apprentissage › acteurs_de_l_education | personne | — | aucun écart relevé |
| 24 | `v_127_s1` | 学校 | nom | École | education_apprentissage › etablissements_educatifs › ecole | lieu | — | aucun écart relevé |
| 25 | `v_256_s1` | 海 | nom | Mer | monde_naturel › eaux_milieux_aquatiques › mers_oceans | lieu | — | aucun écart relevé |
| 26 | `v_648_s1` | 匹 | nom | Compteur des petits animaux | nombres_quantification › comptage_compteurs › animaux | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 27 | `v_201_s1` | 鳴く | verbe | Crier (animal) | monde_naturel › animaux | action | — | aucun écart relevé |
| 28 | `v_164_s3` | かける | verbe | Accrocher | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 29 | `v_695_s1` | 葉書 | nom | Carte postale | communication_langage › communication › transmission | objet_artefact | — | aucun écart relevé |
| 30 | `v_199_s1` | 遊ぶ | verbe | S'amuser | loisirs_jeux › loisirs | action | — | aucun écart relevé |
| 31 | `v_189_s1` | ギター | nom | Guitare | arts_creation › musique › instruments | objet_artefact | — | aucun écart relevé |
| 32 | `v_356_s1` | 横 | nom | Côté | espace_proprietes_spatiales › position_localisation | lieu | — | aucun écart relevé |
| 33 | `v_352_s1` | 外 | nom | Extérieur | espace_proprietes_spatiales › position_localisation › interieur_exterieur | lieu | — | aucun écart relevé |
| 34 | `v_313_s1` | 四日 | nom | Quatre jours | temps › duree | quantite_valeur | — | aucun écart relevé |
| 35 | `v_367_s1` | 一 | numeral | Un | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 36 | `v_379_s1` | 五つ | nom | Cinq (objets) | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 37 | `v_376_s1` | 二 | numeral | Deux | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 38 | `v_377_s2` | 二つ | nom | Deux ans (âge) | etre_humain › cycle_de_vie | quantite_valeur | — | aucun écart relevé |
| 39 | `v_62_s2` | 軽い | adjectif_i | Bénin | sante_medecine › maladies_troubles | propriete | — | **faiblesse du criblage** (§6.2) ; candidat par C1-h |
| 40 | `v_477_s1` | 薄い | adjectif_i | Mince | espace_proprietes_spatiales › dimensions | propriete | — | **faiblesse du criblage** (§6.2) ; point réservé omis, ajouté |
| 41 | `v_484_s1` | 重い | adjectif_i | Lourd | null | propriete | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 42 | `v_6_s1` | 欲しい | adjectif_i | Vouloir | etre_humain › psychologie_esprit › etats_psychologiques | etat | — | aucun écart relevé |
| 43 | `v_461_s2` | 汚い | adjectif_i | Grossier (langage) | null | propriete | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 44 | `v_436_s1` | 古い | adjectif_i | Vieux | temps | propriete | — | aucun écart relevé |
| 45 | `v_545_s1` | 変える | verbe | Changer | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 46 | `v_539_s1` | 切る | verbe | Couper | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 47 | `v_598_s2` | たばこ | nom | Tabac | null | substance_matiere | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 48 | `v_526_s1` | コピーする | verbe | Photocopier | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 49 | `v_703_s1` | 辺 | nom | Environs | espace_proprietes_spatiales › distance_proximite › proximite | lieu | — | aucun écart relevé |
| 50 | `v_504_s2` | ゆっくり | adverbe | Tranquillement | null | propriete | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |

### G.3 Échantillon de validation 2 (50 sens, graine 20261009)

| # | SENSE | Mot | Classe | Sens | Catégorie | Type | 147 | Résultat de la lecture |
|---|---|---|---|---|---|---|---|---|
| 1 | `v_363_s1` | キロ | nom | Kilo (kilogramme) | nombres_quantification | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 2 | `v_98_s1` | レストラン | nom | Restaurant | alimentation_cuisine › restauration › restaurants | lieu | — | aucun écart relevé |
| 3 | `v_56_s1` | 病院 | nom | Hôpital | sante_medecine › etablissements_de_sante › hopitaux | lieu | — | aucun écart relevé |
| 4 | `v_57_s1` | 目 | nom | Œil | etre_humain › corps › tete_visage | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 5 | `v_54_s1` | 歯 | nom | Dent | etre_humain › corps › tete_visage | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 6 | `v_51_s1` | 手 | nom | Main | etre_humain › corps › membres | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 7 | `v_99_s1` | 卵 | nom | Œuf | alimentation_cuisine › aliments › ufs | substance_matiere | — | aucun écart relevé |
| 8 | `v_118_s1` | 食べ物 | nom | Nourriture | alimentation_cuisine › aliments | substance_matiere | — | aucun écart relevé |
| 9 | `v_88_s2` | ご飯 | nom | Repas | alimentation_cuisine › repas | evenement | — | aucun écart relevé |
| 10 | `v_145_s1` | 机 | nom | Bureau | habitat_vie_domestique › mobilier › tables_surfaces | objet_artefact | — | aucun écart relevé |
| 11 | `v_641_s1` | 冷蔵庫 | nom | Réfrigérateur | habitat_vie_domestique › equipements_domestiques › electromenager | objet_artefact | — | aucun écart relevé |
| 12 | `v_674_s1` | 橋 | nom | Pont | environnement_construit_espaces_humains › batiments_constructions › ouvrages | objet_artefact | — | aucun écart relevé ; lecture hésitante, non retenue (§6.3) |
| 13 | `v_249_s1` | 町 | nom | Ville | territoires_lieux_geographiques › villes_localites › villes | lieu | — | aucun écart relevé |
| 14 | `v_75_s1` | ポケット | nom | Poche | habillement_accessoires_personnels › vetements | objet_artefact | — | aucun écart relevé |
| 15 | `v_72_s1` | ズボン | nom | Pantalon | habillement_accessoires_personnels › vetements › bas | objet_artefact | — | aucun écart relevé |
| 16 | `v_180_s1` | お金 | nom | Argent | economie_commerce › argent_monnaie | quantite_valeur | — | aucun écart relevé ; lecture hésitante, non retenue (§6.3) |
| 17 | `v_671_s1` | 時計 | nom | Horloge | null | objet_artefact | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 18 | `v_604_s1` | ひらがな | nom | Hiragana | communication_langage › ecriture › systemes_d_ecriture | information_contenu | — | aucun écart relevé |
| 19 | `v_629_s1` | 万年筆 | nom | Stylo-plume | communication_langage › ecriture › ecrire | objet_artefact | — | aucun écart relevé |
| 20 | `v_133_s1` | 教室 | nom | Salle de classe | education_apprentissage › vie_scolaire_universitaire › classe | lieu | — | aucun écart relevé |
| 21 | `v_125_s1` | ノート | nom | Cahier | communication_langage › ecriture › ecrire | objet_artefact | — | aucun écart relevé |
| 22 | `v_7_s1` | 涼しい | adjectif_i | Frais (agréablement) | monde_naturel › meteo › conditions_atmospheriques | propriete | — | aucun écart relevé |
| 23 | `v_251_s1` | ペット | nom | Animal de compagnie | monde_naturel › animaux | organisme_vivant | — | aucun écart relevé |
| 24 | `v_266_s2` | 吹く | verbe | Souffler (de l'air) | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 25 | `v_177_s1` | 話す | verbe | Parler | communication_langage › parole_conversation › parler | action | — | aucun écart relevé |
| 26 | `v_203_s1` | テレビ | nom | Télévision | medias › television › television | objet_artefact | — | aucun écart relevé |
| 27 | `v_626_s1` | レコード | nom | Disque (vinyle) | arts_creation › musique | objet_artefact | — | aucun écart relevé |
| 28 | `v_245_s1` | 帰国 | nom | Retour au pays | voyage_tourisme › sejour › retour | evenement | — | aucun écart relevé ; lecture hésitante, non retenue (§6.3) |
| 29 | `v_200_s1` | 音楽 | nom | Musique | arts_creation › musique | information_contenu | — | aucun écart relevé ; lecture hésitante, non retenue (§6.3) |
| 30 | `v_696_s1` | 表 | nom | Face | espace_proprietes_spatiales › position_localisation › devant_derriere | null | type-nul | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 31 | `v_353_s1` | 左 | nom | Gauche | espace_proprietes_spatiales › direction_orientation › gauche_droite | lieu | — | aucun écart relevé |
| 32 | `v_294_s1` | 九日 | nom | Neuf jours | temps › duree | quantite_valeur | — | aucun écart relevé |
| 33 | `v_291_s1` | 一月 | nom | Un mois | temps › duree | quantite_valeur | — | aucun écart relevé |
| 34 | `v_372_s1` | 三 | numeral | Trois | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 35 | `v_383_s2` | 六つ | nom | Six ans (âge) | etre_humain › cycle_de_vie | quantite_valeur | — | aucun écart relevé |
| 36 | `v_380_s1` | 八 | numeral | Huit | nombres_quantification › nombres › cardinaux | quantite_valeur | — | aucun écart relevé |
| 37 | `v_375_s2` | 九つ | nom | Neuf ans (âge) | etre_humain › cycle_de_vie | quantite_valeur | — | aucun écart relevé |
| 38 | `v_467_s1` | 白い | adjectif_i | Blanc | couleurs › noir_blanc_gris › blanc | propriete | — | aucun écart relevé |
| 39 | `v_488_s2` | 青い | adjectif_i | Vert | couleurs › couleurs_chromatiques › vert | propriete | — | aucun écart relevé |
| 40 | `v_492_s1` | 黒 | nom | Noir | couleurs › noir_blanc_gris › noir | propriete | — | aucun écart relevé |
| 41 | `v_444_s1` | 好き | adjectif_na | Aimer | etre_humain › psychologie_esprit › preferences | propriete | — | aucun écart relevé |
| 42 | `v_483_s1` | 遅い | adjectif_i | Lent | espace_proprietes_spatiales › vitesse | propriete | — | aucun écart relevé |
| 43 | `v_478_s1` | 賑やか | adjectif_na | Animé | null | propriete | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 44 | `v_50_s2` | 差す | verbe | Pointer | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 45 | `v_532_s1` | 作る | verbe | Fabriquer | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 46 | `v_143_s1` | 勤める | verbe | Travailler pour | travail_vie_professionnelle › travail_emploi › emploi | action | — | aucun écart relevé |
| 47 | `v_542_s1` | 吸う | verbe | Fumer | null | action | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 48 | `v_665_s2` | 持つ | verbe | Posséder | null | etat | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 49 | `v_516_s2` | ある | verbe | Posséder | null | etat | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
| 50 | `v_525_s2` | まっすぐ | adverbe | Honnête | null | propriete | categorie-nulle | aucun écart relevé sur les autres couches ; `null` réservé au volet 2 |
