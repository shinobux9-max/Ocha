# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 15 · Périmètre proposé « Couleurs, formes, dimensions et poids »

**Date** : 2026-10-05
**Nature** : proposition de périmètre, pour relecture puis arbitrage. **Aucune décision lexicale** :
aucun fichier de lot, aucune décision de journal, aucune règle n'est créé ni modifié.

**Nom de ce fichier** : il suit la convention recommandée à la relecture (les lots sont désignés par
leur numéro, « A2-04 · lot 15 »), retenue par l'arbitrage du 2026-10-05 (§8).

**État** : périmètre arbitré le 2026-10-05 (§8). Les sections 1 à 7 sont la proposition telle
qu'elle a été relue.

---

## 1. Méthode

Après le lot 14, l'assemblage réel compte 501 ENTRY, 31 retraits et **187 entrées non décidées** :
environ 58 verbes, 64 adjectifs, 41 adverbes, conjonctions et interjections, 24 noms.

Le périmètre part de sept anciennes sous-catégories de `descriptions_qualites` : `couleurs`,
`couleur`, `dimension`, `taille`, `taille_dimensions`, `forme` et `poids`.

**Contrôles par script**, sur les sources figées et les 15 fichiers de lot existants (lots 0 à 14) :
- ces sept sous-catégories comptent **29** entrées sources (12, 1, 8, 4, 1, 1, 2) ; aucune n'est
  décidée ; le périmètre les prend toutes ;
- les 29 identifiants sont distincts, présents dans la source, absents de tout lot ;
- aucune n'a de candidat de tag de lieu ;
- les 29 lectures sont mécaniques (furigana cohérents avec la forme et avec les kana) ;
- une seule classe grammaticale est en exception : 大きな (`CLASS_EXCEPTION_IDS`).

## 2. Périmètre proposé : 29 entrées, en quatre groupes

### A. Couleurs (13)

| Identifiant | Mot | Lecture | Ancien type | Sens de la source |
|---|---|---|---|---|
| `n5_v_475` | 色 | いろ | nom | Couleur ; teinte |
| `n5_v_466` | 白 | しろ | nom | Blanc ; couleur blanche |
| `n5_v_467` | 白い | しろい | adjectif en i | Blanc ; de couleur blanche |
| `n5_v_479` | 赤 | あか | nom | Rouge ; couleur rouge |
| `n5_v_480` | 赤い | あかい | adjectif en i | Rouge ; de couleur rouge |
| `n5_v_487` | 青 | あお | nom | Bleu ; couleur bleue ; vert (par extension traditionnelle pour certains éléments naturels comme les feux de circulation ou la verdure) |
| `n5_v_488` | 青い | あおい | adjectif en i | Bleu ; de couleur bleue ; vert (jeune, immature) |
| `n5_v_490` | 黄色 | きいろ | nom | Jaune ; couleur jaune |
| `n5_v_491` | 黄色い | きいろい | adjectif en i | Jaune ; de couleur jaune |
| `n5_v_492` | 黒 | くろ | nom | Noir ; couleur noire |
| `n5_v_493` | 黒い | くろい | adjectif en i | Noir ; de couleur noire ; sombre |
| `n5_v_473` | 緑 | みどり | nom | Vert ; verdure ; couleur verte |
| `n5_v_693` | 茶色 | ちゃいろ | nom | Marron ; brun ; couleur thé |

### B. Taille (4)

| Identifiant | Mot | Lecture | Ancien type | Sens de la source |
|---|---|---|---|---|
| `n5_v_440` | 大きい | おおきい | adjectif en i | Grand ; vaste ; volumineux ; gros |
| `n5_v_441` | 大きな | おおきな | adjectif en na | Grand ; vaste ; important |
| `n5_v_445` | 小さい | ちいさい | adjectif en i | Petit ; réduit ; minime |
| `n5_v_446` | 小さな | ちいさな | adjectif en na | Petit ; modeste ; de petite taille |

### C. Dimensions (9)

| Identifiant | Mot | Lecture | Ancien type | Sens de la source |
|---|---|---|---|---|
| `n5_v_485` | 長い | ながい | adjectif en i | Long ; de longue durée |
| `n5_v_468` | 短い | みじかい | adjectif en i | Court ; bref |
| `n5_v_448` | 広い | ひろい | adjectif en i | Spacieux ; large ; vaste ; grand (superficie) |
| `n5_v_463` | 狭い | せまい | adjectif en i | Étroit ; resserré ; exigu ; petit (espace) |
| `n5_v_443` | 太い | ふとい | adjectif en i | Gros ; épais ; large (pour un objet cylindrique ou allongé) |
| `n5_v_469` | 細い | ほそい | adjectif en i | Mince ; fin ; étroit (allongé) |
| `n5_v_435` | 厚い | あつい | adjectif en i | Épais ; volumineux ; chaleureux (pour l'accueil) |
| `n5_v_477` | 薄い | うすい | adjectif en i | Mince ; fin ; pâle (couleur) ; léger (goût) |
| `n5_v_183` | 低い | ひくい | adjectif en i | Bas ; peu élevé (en parlant d'une hauteur, d'un prix ou d'une voix) |

### D. Forme et poids (3)

| Identifiant | Mot | Lecture | Ancien type | Sens de la source |
|---|---|---|---|---|
| `n5_v_431` | 丸い | まるい | adjectif en i | Rond ; circulaire ; sphérique |
| `n5_v_484` | 重い | おもい | adjectif en i | Lourd ; pesant ; grave (situation, responsabilité) |
| `n5_v_62` | 軽い | かるい | adjectif i | Léger ; peu lourd ; bénin (maladie) |

## 3. Pourquoi ce thème, et faut-il scinder ou élargir ?

Le lot se relit par comparaison des paradigmes (paires nom / adjectif des couleurs, paires
d'antonymes), mais **se décide fiche par fiche** : les paires n'imposent ni les mêmes sens d'une
entrée à l'autre, ni des relations à créer pendant le lot.

Aucun blocage général n'est identifié pour préparer ce périmètre. Deux points touchent pourtant des
questions ouvertes : la classe de 小さな (§5.1), qui demande un arbitrage sur la frontière mécanique,
et l'emploi de 色 en composé (§5.3, point 1), voisin du point ouvert des affixes.

Les deux autres grands blocs restants sont moins mûrs : les adverbes et mots de liaison butent sur
les fonctions sans définition normative et sur les réserves du lot 13 au regard d'A7 ; les verbes
(environ 58) demandent plusieurs lots.

**Scission : non recommandée.** 29 entrées est une taille ordinaire.

**Élargissement : non recommandé.** Ajouter l'âge (古い, 新しい, 若い) et la force ou l'état physique
(強い, 弱い, 丈夫) porterait le lot à 35 entrées, en y introduisant d'autres axes sans nécessité.

## 4. Entrées voisines, hors périmètre

| Identifiant | Mot | Ancienne catégorie | Pourquoi hors périmètre |
|---|---|---|---|
| `n5_v_654`, `n5_v_447`, `n5_v_655` | 多い, 少ない, 大勢 | `descriptions_qualites › quantite` | lot « quantité et degré », réservé |
| `n5_v_454` | 早い | `descriptions_qualites › temps` | réservée à l'arbitrage du périmètre du lot 13 |
| `n5_v_482`, `n5_v_483` | 速い, 遅い | `descriptions_qualites › vitesse` | autre axe ; 遅い touche au temps |
| `n5_v_436`, `n5_v_453`, `n5_v_476` | 古い, 新しい, 若い | `descriptions_qualites › age` | autre axe |
| `n5_v_449`, `n5_v_451`, `n5_v_428` | 弱い, 強い, 丈夫 | `descriptions_qualites › etat_physique` | autre axe |
| `n5_v_4` | 暗い | `emotions_sentiments › emotions` | rangée avec les émotions ; antonyme de 明るい, validé |
| `n5_v_450` | 弱く | `adverbes_expressions › etat_physique` | forme adverbiale de 弱い, classe à décider |

**Voisins déjà validés**, utiles à la cohérence : 高い (v_188, deux sens : haut, cher), 安い (v_185),
明るい (v_455), 背 (v_690, « taille »).

## 5. Cas sensibles

Ils sont relevés ici, aucun n'est tranché.

### 5.1. Frontière mécanique : la classe de 小さな

- 大きな est dans `CLASS_EXCEPTION_IDS` : sa classe et son groupe sont à décider (`determinant`
  pressenti dans les points ouverts d'`ETAT-ACTUEL.md`).
- **小さな n'y est pas** : son ancien type « adjectif en na » donne mécaniquement `adjectif_na`,
  groupe `na`, et une décision de lot qui les changerait serait refusée
  (`decision-hors-frontiere`).
- Sa fiche dit pourtant : « **Adjectif adnominal (rententaishi)** dérivé de l'adjectif en i
  *chiisai*, qui se place obligatoirement directement devant un nom sans prendre la particule
  *na* ». L'anomalie est donc documentée par la source elle-même, indépendamment de 大きな, dont la
  fiche dit la même chose.
- **Mécanisme proposé** : ajouter `n5_v_446` à `CLASS_EXCEPTION_IDS`. L'ajout rend la classe et le
  groupe décidables ; il n'attribue pas `determinant` et ne modifie pas les sources. C'est une
  modification des règles de reconstruction, à arbitrer avant la proposition lexicale (comme la
  liste fermée de 九つ au lot 14).

### 5.2. Mécanique

- **Lectures** : toutes mécaniques, aucune à décider.
- **Types hérités** : 軽い porte « adjectif i », reconnu par la table des types (`adjectif_i`).
- **`kanji_list`** : 黄色 et 黄色い listent 黄 et 色, 茶色 liste 茶 et 色 ; rien d'anormal relevé.

### 5.3. Sens et doctrine

1. **色 : emploi en suffixe ou en composé.** La fiche dit « utilisé en suffixe/composé pour
   qualifier les différentes teintes ». À examiner sans transformer d'office cette mention en
   `suffix: true` : 半 est la seule ENTRY à le porter, et la représentation des affixes reste un
   point ouvert.
2. **Paires nom / adjectif** (白 / 白い, 赤 / 赤い, 青 / 青い, 黄色 / 黄色い, 黒 / 黒い) : mots
   distincts, aucune fusion a priori. Les fiches des adjectifs les disent « dérivés » du nom ; la
   dérivation mentionnée par les fiches n'autorise aucune relation hors du registre.
3. **Paradigme incomplet.** 緑 et 茶色 n'ont pas d'adjectif en い dans les sources ; 緑の et 茶色の
   sont évoqués en nuance (茶色 : « Nom / adjectif en -no »). Rien n'est complété, et la classe de
   茶色 est mécanique (`nom`).
4. **緑 : « verdure ».** Présent dans les traductions et dans la nuance (« la couleur verte ou la
   verdure de la nature ») : candidat de sens distinct, à examiner.
5. **青 : « vert ».** Donné « par extension traditionnelle » (feux de circulation, verdure) : sens
   ou autre traduction qualifiée, à décider sur la fiche.
6. **青い : « vert (jeune, immature) ».** La nuance ne parle que des fruits non mûrs et des légumes
   feuillus. Il faut distinguer la portée figurée (« immature ») de la simple couleur verte des
   fruits et des légumes, sans ajouter ce que la fiche ne dit pas.
7. **黒い : « sombre ».** Une traduction, que la nuance ne développe pas.
8. **長い et 短い : la durée.** Les deux fiches la documentent autant l'une que l'autre (« une durée
   temporelle prolongée », « une durée brève »). Un sens ou deux, à examiner avec le même critère,
   fiche par fiche.
9. **厚い : « chaleureux (pour l'accueil) ».** Traduction que la nuance ne développe pas.
10. **薄い.** Épaisseur, liquide dilué, couleur peu intense, goût léger : plusieurs emplois, dont la
    nuance développe les trois premiers.
11. **重い et 軽い.** Extension morale pour 重い (responsabilité, atmosphère), maladie sans gravité
    pour 軽い : toutes deux documentées par la nuance.
12. **低い.** La fiche cite la hauteur, le niveau (température, note), la voix, et mentionne le prix
    en renvoyant à 安い. Son antonyme 高い est validé avec deux sens (haut, cher) : la cohérence est
    à contrôler, sans aligner d'office.
13. **大きい / 大きな, 小さい / 小さな.** Quatre mots distincts, aucune fusion a priori. 大きな porte
    « important », 小さな « modeste » : traductions à examiner.
14. **Dimensions et types.** Les adjectifs voisins validés sont en `propriete`. Les catégories
    (espace › dimensions, couleurs, forme, poids) sont à décider sens par sens ; l'écart メートル /
    キロ réservé à l'audit A2-05 n'est pas rouvert ici.

## 6. Numérotation des travaux

`ROADMAP.md` et `ETAT-ACTUEL.md` réservent déjà **5.16** à la passe finale et **5.17** à la
publication. Donner 5.16 au lot 15 obligerait à décaler ces deux repères, puis à les décaler encore
après chaque lot.

**Convention proposée** : désigner les prochains travaux par leur numéro de lot (« A2-04 · lot 15 »,
puis lot 16, etc.) et garder 5.16 et 5.17 pour les deux opérations finales. Les rapports se nomment
`etape2-A2-04-lot15-<objet>.md`. Si elle est retenue, elle sera écrite dans `ROADMAP.md` (§5.1) et
dans la feuille de route d'`ETAT-ACTUEL.md`.

## 7. Ce qui est à arbitrer

1. **Le thème et le périmètre** : « Couleurs, formes, dimensions et poids », 29 entrées, sans
   scission ni élargissement.
2. **小さな** : l'ajout de `n5_v_446` à `CLASS_EXCEPTION_IDS` (§5.1), qui conditionne la proposition
   lexicale.
3. **La numérotation** (§6).

Aucune proposition lexicale ne sera écrite avant la validation de ce périmètre.

## 8. Arbitrage du 2026-10-05

- **Périmètre retenu** : les 29 entrées, sous le titre « Couleurs, formes, dimensions et poids »,
  sans scission ni élargissement. Les voisins du §4 restent hors du lot.
- **小さな** : `n5_v_446` entre dans `CLASS_EXCEPTION_IDS`. Sa classe et son groupe deviennent
  décidables ; **aucune classe n'est attribuée**, et les sources figées ne sont pas modifiées. Deux
  tests le contrôlent (la liste et la justification par la fiche ; l'effet sur la couche mécanique).
- **Numérotation** : les lots sont désignés par leur numéro (« A2-04 · lot 15 », puis lot 16, etc.) ;
  5.16 reste la passe finale et 5.17 la publication. Le nom de ce fichier est donc définitif.
- Deux formulations du §5.3 ont été rectifiées après relecture (dérivation nom / adjectif, critère
  pour 長い et 短い).
- Cet arbitrage porte sur le périmètre, sur le mécanisme et sur la numérotation : il ne tranche
  aucun cas sensible du §5.
