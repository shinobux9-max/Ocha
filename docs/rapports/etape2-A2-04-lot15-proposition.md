# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 15 « Couleurs, formes, dimensions et poids » · proposition

**Date** : 2026-10-05
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 29 entrées du lot et ses 50
décisions de journal. Rien n'est validé, rien n'est commité. Les cas sensibles ne sont pas
tranchés : chaque choix ci-dessous est une proposition, avec son alternative quand il y en a une.

**À lire avec** : `reconstruction/a2-04/rapports/lot-15.md` (rapport généré, entrée par entrée) et
`docs/rapports/etape2-A2-04-lot15-perimetre.md` (périmètre arbitré, cas sensibles relevés).

**Version** : révisée deux fois le 2026-10-05 après relecture (§7 et §8). Le texte ci-dessous décrit
la proposition révisée.

**État** : les dix-sept choix du §4 ont été retenus tels que proposés, et le lot validé, le
2026-10-05 (`docs/rapports/etape2-A2-04-lot15-valide.md`). Ce rapport reste la proposition telle
qu'elle a été relue : les mentions « proposed » et l'essai à blanc y décrivent l'état d'avant la
validation.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-15.json` | nouveau : 29 entrées, toutes `proposed`, aucune fusion, aucun ajout |
| `journal.json` | 50 décisions `proposed`, D1026 à D1075, ajoutées à la fin ; les 1 025 décisions existantes sont identiques |
| `reconstruction/a2-04/rapports/lot-15.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | deux tests adaptés à une proposition en cours, deux tests ajoutés |
| Règles, validateur, registres, sources figées | inchangés (l'exception de classe de 小さな est dans le commit `262f110`) |

**Sens** : 36, pour 29 entrées (5 entrées à deux sens, 1 à trois sens).

| Nature | Champ | Nombre |
|---|---|---|
| `abandon` | sens | 24 |
| `decision` | sens | 12 |
| `decision` | catégorie d'un sens | 7 |
| `categorie-nulle` | catégorie d'un sens (A5) | 3 |
| `decision` | classe grammaticale | 2 |
| `decision` | `suffix` | 1 |
| `correction` | sens (coquille) | 1 |

Une entrée, 丸い, ne demande aucune décision notable. Aucune lecture, aucune forme, aucun tag n'est
décidé : tout cela est mécanique dans ce lot.

## 2. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Réel | 501 | 31 | 187 (158 non décidées, 29 propositions non validées) | 0 | 0 | 0 |
| **Essai à blanc**, lot 15 supposé validé, en mémoire | **530** | **31** | **158** | 0 | 0 | 0 |

- **Avertissements à l'essai à blanc** : 54, soit 3 de plus, tous justifiés au journal : trois
  `categorie-nulle` (重い, sens 1 et 2 ; 軽い, sens 1).
- **Tests** : 450 réussis, 0 échec (448 avant ; deux tests ajoutés : l'état du lot 15 proposé,
  l'essai à blanc).
- **Sabotages** : 13 sur 13 attrapés, chacun vérifié comme modifiant réellement son fichier, puis
  rétabli à l'octet près : une entrée ou une décision du lot validée par erreur ; 小さな remise en
  `adjectif_na` ; catégorie nulle sans justification ; sens de prix ajouté à 低い par symétrie ;
  lecture décidée pour une entrée mécanique ; relation de dérivation ajoutée ; décision d'un lot
  clos rouverte ; « Important » gardé comme traduction de 大きな ; `suffix: true` pour 色 ; portée
  figurée ajoutée à 青い ; second sens de durée pour 長い ; décision du lot supprimée. Après la
  révision, 6 sabotages de plus, tous attrapés, sur les points révisés (§7).
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes.

## 3. Les choix lexicaux, groupe par groupe

Tous les sens du lot sont de type `propriete`, sauf « verdure » (緑, sens 2), en `groupe_collectif`.

### A. Couleurs (13)

| Mot | Sens | Catégorie |
|---|---|---|
| 色 | Couleur (Teinte) | couleurs |
| 白, 白い | Blanc | couleurs › noir, blanc et gris › blanc |
| 黒 | Noir | couleurs › noir, blanc et gris › noir |
| 黒い | Noir (Sombre) | idem |
| 赤, 赤い | Rouge | couleurs › couleurs chromatiques › rouge |
| 黄色, 黄色い | Jaune | couleurs › couleurs chromatiques › jaune |
| 茶色 | Marron (Brun) | couleurs › couleurs chromatiques › brun |
| 青 | 1. Bleu · 2. Vert (par extension) | … › bleu · … › vert |
| 青い | 1. Bleu · 2. Vert | … › bleu · … › vert |
| 緑 | 1. Vert · 2. Verdure | … › vert · monde naturel › végétation (`groupe_collectif`) |

- **Noms et adjectifs** : mots distincts, aucune fusion, aucune relation. La dérivation dite par les
  fiches est reprise en nuance de l'adjectif (« Adjectif correspondant au nom 白 »).
- **Les secondes traductions** (« Couleur blanche », « De couleur blanche »…) sont abandonnées
  comme redondantes.
- **色** : `suffix: false`. La fiche parle d'un emploi « en suffixe/composé », sans décrire le mot
  comme un suffixe ; l'emploi en composé passe en nuance, avec 茶色 et 黄色, qui sont dans les sources.
- **青** : le vert « par extension traditionnelle » est un second sens candidat ; la traduction de
  la source en donne elle-même la portée (feux de circulation, verdure).
- **青い** : le vert de certains contextes (fruits non mûrs, légumes feuillus), décrit par la
  nuance, est un second sens candidat. « (jeune, immature) » n'est pas gardé : la fiche ne
  développe aucune portée figurée.
- **緑** : la fiche dit « la couleur verte ou la verdure de la nature », et son exemple porte sur
  la verdure d'un parc : deux sens candidats. La verdure est un ensemble de plantes considéré
  collectivement, d'où `groupe_collectif` ; `organisme_vivant` (木, 花) désigne une plante.
- **茶色** : « Couleur thé » est une glose littérale, reprise en nuance.
- **Paradigme incomplet** : aucun adjectif n'est ajouté pour 緑 ni pour 茶色.

### B. Taille (4)

| Mot | Classe | Sens | Catégorie |
|---|---|---|---|
| 大きい | `adjectif_i` (mécanique) | Grand (Gros, Vaste) | espace › dimensions › taille |
| 小さい | `adjectif_i` (mécanique) | Petit | idem |
| 大きな | **`determinant`** | Grand (Vaste) | idem |
| 小さな | **`determinant`** | Petit | idem |

- **大きな et 小さな** : classe `determinant`, sans groupe. Chaque fiche dit « adjectif adnominal »,
  placé « obligatoirement directement devant un nom sans prendre la particule na ». C'est le
  critère retenu pour この (lot 11). Chacune est décidée sur sa propre fiche. La nuance dit « sans
  ajout de la particule な », la forme se terminant elle-même par な.
- **大きな pour une voix** : l'exemple de la fiche dit 大きなこえ, « une grande voix (fort) ». Cet
  emploi non spatial n'est attesté que par l'exemple. Il est conservé en nuance (« L'exemple source
  l'emploie aussi pour une voix forte : 大きなこえ »), sans créer de sens ; le maintien du sens unique
  est une décision du journal (D1075), à arbitrer (§4, point 17). Rien n'est ajouté à 小さな.
- **« Important » (大きな) et « Modeste » (小さな)** : emplois figurés que les fiches ne développent
  pas. Ils ne sont ni des sens, ni des traductions du sens de taille : ils sont signalés en nuance
  (« La source donne aussi la traduction « important », sans la développer »), comme « néant »
  pour ゼロ (lot 14).

### C. Dimensions (9)

| Mot | Sens | Catégorie |
|---|---|---|
| 長い | Long | espace › dimensions › longueur |
| 短い | Court (Bref) | idem |
| 低い | Bas (Peu élevé) | espace › dimensions › hauteur |
| 広い | Spacieux (Vaste, Large) | espace › dimensions |
| 狭い | Étroit (Exigu) | idem |
| 太い | Gros (Épais) | idem |
| 細い | Mince (Fin, Étroit) | idem |
| 厚い | Épais | idem |
| 薄い | 1. Mince (Fin) · 2. Pâle · 3. Léger (goût) | idem · couleurs › teintes et nuances › intensité · alimentation › goûts alimentaires |

- **長い et 短い** : un seul sens chacune, la durée en nuance. Chaque fiche applique la même échelle
  à une longueur et à une durée, avec un seul contraire ; c'est le critère de 近い (lot 10). Les
  deux fiches ont été examinées séparément ; elles donnent le même résultat. Pour 長い, la durée est
  attestée aussi par l'exemple de la fiche (« les vacances d'été sont longues »).
- **低い** : un seul sens proposé, dans la catégorie du sens « haut » de 高い. **L'emploi pour un
  prix est attesté par la fiche entière** : la traduction le cite, et l'exemple porte sur des prix
  (値段は…低くありません). Le renvoi à 安い est une préférence, qui n'écarte pas l'emploi. Il est donc
  conservé, dans le sens unique et en nuance, comme un niveau sur la même échelle que la température
  ou la note. Le découpage reste à arbitrer (§4, point 10).
- **細い** : « Étroit », attesté par l'exemple de la fiche (un chemin), est gardé sans sa
  parenthèse ; la nuance cite cet emploi.
- **Catégorie au niveau 2** pour six adjectifs : la superficie (広い, 狭い), la circonférence (太い,
  細い) et l'épaisseur (厚い, 薄い) ne sont aucune des sous-catégories du registre.
- **厚い** : « Chaleureux (pour l'accueil) », non développé par la nuance, est signalé en nuance.
- **薄い** : trois sens candidats, que la fiche énumère (objet plat, liquide dilué, couleur peu
  intense). « Pale » est corrigé en « Pâle ».

### D. Forme et poids (3)

| Mot | Sens | Catégorie |
|---|---|---|
| 丸い | Rond (Circulaire, Sphérique) | espace › forme › rond |
| 重い | 1. Lourd (Pesant) · 2. Grave | `null` (A5) · `null` (A5) |
| 軽い | 1. Léger · 2. Bénin | `null` (A5) · santé › maladies et troubles |

- **Le poids** : catégorie nulle. Le registre n'a aucune catégorie pour le poids d'un objet.
- **Seconds sens** : chacun suit sa fiche. 重い : la gravité d'une situation ou d'une
  responsabilité. 軽い : une maladie sans gravité. Ils ne sont pas symétriques, et rien n'est ajouté
  pour qu'ils le deviennent.

## 4. Choix à arbitrer

1. **大きな et 小さな : classe `determinant`.** Alternative : `adjectif_na`, l'ancien type, que les
   deux fiches contredisent.
2. **Noms de couleur : type `propriete`**, comme les adjectifs. Alternative : `concept_abstrait`.
3. **青 : deux sens** (bleu ; vert par extension). Alternative : un seul sens, l'extension en nuance.
4. **青い : deux sens** (bleu ; vert de certains contextes), sans « immature ». Alternative : un seul
   sens, le vert en nuance.
5. **緑 : deux sens** (couleur ; verdure), la verdure en `groupe_collectif`. Alternatives : un seul
   sens ; ou `organisme_vivant` pour la verdure, comme 木 et 花.
6. **黒い : « Sombre » gardé** comme autre traduction. Alternative : l'abandonner, ou le signaler
   en nuance comme non développé.
7. **色 : `suffix: false`**, l'emploi en composé en nuance. Alternative : `suffix: true`, comme 半.
8. **Traductions figurées non développées** (大きな « important », 小さな « modeste », 厚い
   « chaleureux ») : signalées en nuance. Alternative : les abandonner sans les signaler.
9. **長い et 短い : un seul sens**, la durée en nuance. Alternative : un second sens, temps › durée.
10. **低い : un seul sens**, l'emploi de prix conservé en nuance. Alternative, que la fiche
    soutient aussi : un second sens, économie › prix, comme le sens « cher » de 高い. La symétrie
    avec 高い n'est imposée ni dans un sens ni dans l'autre.
11. **薄い : trois sens.** Alternatives : deux sens (épaisseur ; couleur), ou un seul.
12. **Catégorie au niveau 2** (espace › dimensions) pour 広い, 狭い, 太い, 細い, 厚い et 薄い.
    Alternative : « largeur » pour 広い et 狭い.
13. **Le poids : catégorie nulle** (重い, 軽い). Alternative : sciences › physique › mécanique.
14. **重い « grave » : catégorie nulle** ; **軽い « bénin » : santé › maladies et troubles.**
15. **Les nuances rédigées** : contraires, objets typiques, dérivations. Elles reprennent les
    fiches ; aucune n'ajoute un emploi que la fiche ne donne pas.
16. **細い : « Étroit » gardé** comme autre traduction. Alternative : un second sens de largeur,
    que la fiche ne distingue pas.
17. **大きな : un seul sens, classé en taille**, malgré l'emploi pour une voix attesté par l'exemple
    (大きなこえ), conservé en nuance. Alternative : un second sens pour l'intensité (une voix forte).
    Comme pour 低い et 長い, c'est une extension que la fiche atteste sans la décrire à part.

## 5. Cohérence avec les lots validés

- **高い, 安い** (lot 05) : 低い partage la catégorie du sens « haut » de 高い ; la nuance de 安い
  renvoie déjà à 低い pour la hauteur.
- **明るい** (lot 0) : dans couleurs › teintes et nuances, comme le sens « pâle » de 薄い.
- **近い** (lot 10) : même critère pour l'espace et le temps que 長い et 短い.
- **この** (lot 11) : même critère de classe que 大きな et 小さな.
- **甘い, 冷たい** (lots 02 et 07) : même traitement de la « propriété générale » sans catégorie.
- **`counter`** : toujours porté par la seule 匹. **`suffix`** : par la seule 半.
- **A7** : aucune fonction linguistique dans le lot. **A8** : aucune lecture décidée.
- **Relations** : aucune. La dérivation nom / adjectif et les contraires sont dits en nuance.
- **Doctrine** : aucun sens, aucune lecture, aucune graphie n'est ajouté par connaissance externe.

## 6. Suite

1. Relecture de la proposition et arbitrage des points du §4.
2. Révision si nécessaire, sous les mêmes identifiants de journal.
3. Sur autorisation : validation atomique du lot 15 (statuts seulement).

## 7. Révision du 2026-10-05, après relecture

Cinq entrées et quatre décisions sont révisées **à leur place**. Les 24 autres entrées et les 45
autres décisions du lot sont identiques ; les identifiants, les entrées, les champs et les statuts
des 49 décisions n'ont pas changé ; le lot cite les mêmes décisions.

**Le défaut de méthode corrigé.** La première version pesait la traduction et la nuance de chaque
fiche, pas assez son exemple. Les 29 exemples ont été relus ; trois changent une décision ou sa
raison.

| Entrée | Décision | Révision |
|---|---|---|
| 低い | D1068 (raison) | L'emploi de prix est attesté par la traduction **et par l'exemple** ; le renvoi à 安い est une préférence. L'emploi est conservé dans le sens unique et en nuance ; le second sens reste une alternative à arbitrer. La première version l'écartait à tort |
| 緑 | D1041 (raison) | « Verdure » passe d'`organisme_vivant` à `groupe_collectif` (définitions d'A2-ST) ; l'exemple de la fiche étaye le second sens |
| 細い | D1061 (`abandon` → `decision`) | « Étroit », attesté par l'exemple (un chemin), est gardé sans sa parenthèse, au lieu d'être abandonné |
| 長い | D1051 (raison) | La raison cite l'exemple, qui porte sur une durée ; la proposition (un seul sens) est inchangée |
| 大きな, 小さな | aucune | Nuance : « sans ajout de la particule な », au lieu de « sans な » |

- **Rapport** : la mention « Alternative : aucune que la fiche soutienne » (§4, point 10) était
  fausse ; elle est rectifiée. « Cinq adjectifs » au niveau 2 devient « six ».
- **L'exemple de 大きな** porte sur une voix (大きなこえ, « une grande voix (fort) »), emploi non
  spatial que la fiche ne développe pas ailleurs. Cette première révision ne le relevait que dans ce
  rapport ; la seconde (§8) le conserve dans l'entrée.
- **Résultats** : inchangés. Réel 501 / 31 / 187 ; essai à blanc 530 / 31 / 158, 0 problème, 0
  erreur, 0 attente, 54 avertissements ; 450 tests.
- **Sabotages** : 6 de plus, tous attrapés, chacun vérifié comme modifiant réellement son fichier
  puis rétabli à l'octet près : l'emploi de prix retiré de la nuance de 低い ; la raison de D1068
  sans l'exemple ; « verdure » remise en `organisme_vivant` ; la nuance « sans な » rétablie ;
  « Étroit » retiré de 細い ; D1061 remise en `abandon`.

## 8. Seconde révision du 2026-10-05 : 大きな

Relever l'emploi de voix dans le rapport ne le conservait pas dans l'ENTRY. La révision porte sur
cette seule entrée.

- **Nuance de 大きな** : ajout de « L'exemple source l'emploie aussi pour une voix forte :
  大きなこえ. », avant la mention de la traduction « important ».
- **Décision nouvelle, ajoutée à la fin du journal : D1075** (`decision`, sens, `proposed`). Elle
  dit le choix proposé : un seul sens, classé en taille. L'exemple atteste l'emploi pour une voix
  forte. La proposition le conserve comme extension du sens unique en nuance ; sa séparation en un
  second sens reste soumise à l'arbitrage (§4, point 17).
- **Précision après relecture** : la première rédaction de D1075 disait qu'« un seul exemple ne
  documente pas un second référent ». C'était trop catégorique : aucun seuil normatif n'impose
  plusieurs exemples pour proposer un sens. La raison de D1075 est réécrite à sa place, sans cette
  phrase ; le choix proposé est inchangé, et aucune règle sur la valeur des exemples n'est posée.
- **Rien d'autre ne change** : les 1 074 premières décisions du journal sont identiques, les 28
  autres entrées du lot aussi ; rien n'est ajouté à 小さな par symétrie.
- **Comptes** : 50 décisions proposées, D1026 à D1075 ; 12 décisions de sens au lieu de 11 ; 36 sens,
  inchangé.
- **Résultats** : inchangés. Réel 501 / 31 / 187 ; essai à blanc 530 / 31 / 158, 0 problème, 0
  erreur, 0 attente, 54 avertissements ; 450 tests.
- **Sabotages** : 3 de plus, tous attrapés, chacun vérifié comme modifiant réellement son fichier
  puis rétabli à l'octet près : l'emploi de voix retiré de la nuance ; D1075 non citée par
  l'entrée ; l'emploi de voix ajouté à 小さな par symétrie.
