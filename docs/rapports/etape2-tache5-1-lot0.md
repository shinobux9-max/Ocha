# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.1 · Lot 0 « identité » (proposition)

**Date** : 2026-10-02
**Statut** : **PROPOSITION**. Aucune entrée n'est validée : tout le lot est en `proposed`, et
l'assembleur n'en produit rien (0 ENTRY).
**À relire** : `reconstruction/a2-04/rapports/lot-00.md` (rapport généré, entrée par entrée, avec
les sources, la mécanique, la proposition, les décisions du journal et les anciens exemples).

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **411 tests, tous verts** (409 avant, 2 nouveaux) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (les mêmes qu'avant) |
| `node tools/check-layers.mjs` | aucune violation |
| `node tools/reconstruction/run.mjs verify` | sources conformes au manifeste |
| `node tools/reconstruction/run.mjs assemble` | 0 ENTRY : rien n'est validé |
| Essai à blanc (en mémoire, tout supposé validé) | 33 ENTRY, 28 identifiants retirés, **aucun problème de frontière**, 5 erreurs I9 (section 4.1), 2 avertissements (鞄 et 醤 hors des kanji connus) |

## 2. Ce que contient le lot

- **60 entrées** : les 27 groupes de doublons candidats (54 entrées) et les 6 entrées à lecture
  avec « / » (毎年, 毎月, 七, 九, 四, 何).
- **Proposition** : 27 fusions, 33 entrées gardées et entièrement décidées (une entrée ne se
  décide que dans un lot).
- **Journal** : 56 décisions proposées avec le lot : 27 fusions, 5 corrections, 11 décisions,
  13 abandons. Chaque fusion, correction, découpage en sens et information non reprise y est
  justifié.

**Les 27 groupes sont 27 candidats.** Chacun est proposé à la fusion parce que l'examen des sources
le justifie (sections 3 et 4), mais rien n'est présumé : chaque groupe peut être gardé séparé ou
corrigé autrement.

## 3. Les 27 groupes candidats

| # | Groupe | Proposition | Graphie gardée en plus | Sens |
|---|---|---|---|---|
| 1 | お姉さん (n5_v_17) / お姉さん (n5_v_591) | fusion dans n5_v_17 | — | Grande sœur ; Jeune femme |
| 2 | お母さん (n5_v_18) / お母さん (n5_v_592) | fusion dans n5_v_18 | — | Mère |
| 3 | お父さん (n5_v_19) / お父さん (n5_v_590) | fusion dans n5_v_19 | — | Père |
| 4 | 美味しい (n5_v_474) / 美味しい (n5_v_587) | fusion dans n5_v_474 | — | Délicieux |
| 5 | 面白い (n5_v_10) / 面白い (n5_v_588) | fusion dans n5_v_10 | — | Intéressant ; Amusant |
| 6 | 本当 (n5_v_510) / 本当 (n5_v_514) | fusion dans n5_v_510 | — | Vérité |
| 7 | 浴びる (n5_v_559) / 浴びる (n5_v_582) | fusion dans n5_v_559 | — | Prendre (une douche) ; Recevoir (de la lumière, des acclamations) |
| 8 | 無くす (n5_v_564) / 無くす (n5_v_601) | fusion dans n5_v_564 | — | Perdre (un objet) |
| 9 | 醤油 (n5_v_594) / 醤油 (n5_v_706) | fusion dans n5_v_594 | — | Sauce soja |
| 10 | おなか (n5_v_44) / お腹 (n5_v_45) | fusion dans n5_v_44 | お腹 | Ventre |
| 11 | 鞄 (n5_v_64) / かばん (n5_v_227) | fusion dans n5_v_64 | かばん | Sac |
| 12 | くだもの (n5_v_87) / 果物 (n5_v_107) | fusion dans n5_v_87 | 果物 | Fruit |
| 13 | ばんごはん (n5_v_91) / 晩ご飯 (n5_v_106) | fusion dans n5_v_91 | 晩ご飯 | Dîner |
| 14 | ひるごはん (n5_v_92) / 昼ご飯 (n5_v_105) | fusion dans n5_v_92 | 昼ご飯 | Déjeuner |
| 15 | かぎ (n5_v_226) / 鍵 (n5_v_238) | fusion dans n5_v_226 | 鍵 | Clé |
| 16 | せっけん (n5_v_228) / 石鹸 (n5_v_235) | fusion dans n5_v_228 | 石鹸 | Savon |
| 17 | くもり (n5_v_263) / 曇り (n5_v_276) | fusion dans n5_v_263 | 曇り | Temps nuageux |
| 18 | おととし (n5_v_285) / 一昨年 (n5_v_289) | fusion dans n5_v_285 | 一昨年 | Il y a deux ans |
| 19 | かわいい (n5_v_423) / 可愛い (n5_v_437) | fusion dans n5_v_423 | 可愛い | Mignon |
| 20 | はく (n5_v_68) / 履く (n5_v_549) | fusion dans n5_v_68 | 履く | Mettre (en bas du corps) |
| 21 | きれい (n5_v_424) / 綺麗 (n5_v_472) | fusion dans n5_v_424 | 綺麗 | Beau ; Propre |
| 22 | いい / 良い (n5_v_420) / 良い (n5_v_583) | fusion dans n5_v_420 | いい | Bon |
| 23 | 朝ご飯 (n5_v_459) / 朝御飯 (n5_v_460) | fusion dans n5_v_459 | 朝御飯 | Petit-déjeuner |
| 24 | 曲がる (n5_v_555) / 曲る (n5_v_672) | fusion dans n5_v_555 | 曲る | Tourner ; Être courbé |
| 25 | 明るい (n5_v_455) / 明い (n5_v_668) | fusion dans n5_v_455 | — | Lumineux ; Enjoué |
| 26 | 大変 (n5_v_495) / 大変 (n5_v_508) | fusion dans n5_v_495 | — | Très ; Difficile |
| 27 | キロ (n5_v_363) / キロ (n5_v_610) | fusion dans n5_v_363 | — | Kilo (kilogramme) ; Kilomètre |


La règle du plus petit numéro survivant est appliquée partout. Les fusions entre deux graphies
d'un même mot gardent la seconde graphie dans `writings`, sauf 明い (graphie fautive, absorbée sans
devenir une graphie).

**Corrections relevées en chemin** (journalisées) :
- furigana incohérents de 美味しい, 醤油 (ruby imbriqué), 明るい et 可愛い (lu かあいい) ;
- sens principal erroné de おととし : la source disait « l'année dernière », おととし est
  l'année d'avant (« il y a deux ans »).

## 4. Points à arbitrer

### 4.1 `category: null` pour une propriété générale : I9 plus strict qu'A2

C'est le point le plus important. A2 autorise `category: null` « lorsqu'aucune catégorie
primaire pertinente n'existe » (`A2-GLOBAL-v1`, §10) et met la « propriété générale » hors de la
hiérarchie (§4.4). Notre schéma (I9) ne l'admet qu'avec une fonction linguistique.

Cinq sens n'ont aucun domaine thématique honnête et sont proposés à `null`. Ce sont les 5 erreurs
de l'essai à blanc :
- 良い « bon » ;
- きれい « beau » ;
- 大変 « difficile » ;
- 本当 « vérité » ;
- 無くす « perdre ».

Leur sens passe par le type sémantique et, quand il existe, par une dimension (`difficulte`,
`vrai`).

Deux voies :
- **a** : addendum à I9 aligné sur A2 §10. `null` est permis aussi pour une propriété ou une action
  générale, sans fonction linguistique, et l'erreur devient un avertissement à justifier au
  journal ;
- **b** : garder I9 et forcer une catégorie, ce qui contredit A2 §4.4.

Je ne tranche pas.

### 4.2 Forme usuelle des paires kana / kanji

La forme usuelle (`word`) est mécanique pour l'entrée survivante, et la survivante est celle du
plus petit numéro. La forme usuelle d'une paire dépend donc de la numérotation d'origine.

Pour six paires, la forme ainsi retenue est discutable :

| Survivante | Forme gardée | Autre graphie | Forme usuelle probable |
|---|---|---|---|
| `n5_v_64` | 鞄 | かばん | かばん (鞄 n'est pas un kanji courant) |
| `n5_v_87` | くだもの | 果物 | les deux |
| `n5_v_91` | ばんごはん | 晩ご飯 | 晩ご飯 à l'écrit |
| `n5_v_92` | ひるごはん | 昼ご飯 | 昼ご飯 à l'écrit |
| `n5_v_263` | くもり | 曇り | 曇り (bulletins météo) |
| `n5_v_68` | はく | 履く | les deux |

Une dérogation (`exception-fusion`) n'est admise que pour une représentation **erronée**, ce qui
n'est pas le cas ici.

Deux voies :
- **a** : garder ces formes ;
- **b** : rendre `word` décidable pour le survivant d'une fusion, en l'ajoutant aux exceptions de
  la frontière. C'est un changement de `rules.mjs`, donc d'infrastructure.

### 4.3 Classe de 大変

La fusion de 大変 adverbe (`n5_v_495`) et de 大変 adjectif en な (`n5_v_508`) garde la classe
mécanique de la survivante : `adverbe`. Or le sens « difficile » est un emploi d'adjectif en な
(大変だ, 大変な).

Je propose deux sens, « très » (`intensifieur`) et « difficile ». La classe reste toutefois un
champ mécanique hors liste d'exceptions. Pour la décider, il faudrait ajouter `n5_v_495` aux
exceptions de classe (`CLASS_EXCEPTION_IDS`), ce qui est aussi un changement d'infrastructure.

### 4.4 いい / 良い

Les lectures sont attachées à la forme usuelle, dont le texte de base des furigana doit être égal
à `word`. いい et よい ne peuvent donc être deux lectures que de 良い. Je propose :
- `word` : 良い ;
- lectures : いい (par défaut) et よい (note : forme écrite ou soutenue, base des formes
  conjuguées) ;
- `writings` : いい.

La forme affichée par défaut sera 良い alors que いい s'écrit surtout en kana. C'est une limite du
modèle, à accepter ou à faire évoluer.

### 4.5 Lectures par défaut

Pour 七 et 四, j'ai gardé l'ordre de la source : しち et し par défaut. Mais なな et よん sont les
lectures les plus courantes pour compter. Il faut confirmer les lectures par défaut. Pour 九
(きゅう), 何 (なに), 毎年 (まいとし) et 毎月 (まいつき), le choix est plus net.

### 4.6 Types sémantiques à confirmer

| Cas | Type proposé | Doute |
|---|---|---|
| parties du corps (おなか) | `organisme_vivant` | une partie n'est pas un organisme |
| aliments (果物, 醤油, 石鹸 pour une matière) | `substance_matiere` | — |
| expressions de temps (おととし, 毎年, 毎月) | `concept_abstrait` | A2 interdit d'en faire un type de secours |
| unités (キロ) | `quantite_valeur` | `A2-ST-v1` précise qu'une unité n'est pas automatiquement de ce type |

### 4.7 Découpages en sens

Les sens ont été découpés seulement quand la différence est exploitable :
- 面白い : intéressant / amusant ;
- お姉さん : grande sœur / jeune femme ;
- 浴びる : prendre une douche / recevoir ;
- きれい : beau / propre ;
- 明るい : lumineux / enjoué ;
- 曲がる : tourner / être courbé ;
- 大変 : très / difficile ;
- キロ : kilogramme / kilomètre.

Les autres entrées ont un seul sens.

Les abandons de traductions sont journalisés, par exemple « Valise » (鞄), « Mot de passe » (かぎ)
et « Sérieux » (本当).

### 4.8 Tags de lieu

Les candidats retenus :
- `lieu_konbini` : くだもの, 醤油 ;
- `lieu_restaurant` : 醤油, ばんごはん, ひるごはん, 朝ご飯 ;
- `lieu_hotel` : かぎ, せっけん.

Les candidats écartés :
- `lieu_hotel` pour おととし, 毎年, 毎月 et pour le sac ;
- `lieu_konbini` pour les trois repas ;
- `lieu_restaurant` pour くだもの.

Les candidats viennent des anciennes catégories et ne sont que des propositions : la décision est
humaine.

## 5. Comment arbitrer

Vous pouvez répondre groupe par groupe (« accepté », « séparé », « autre correction ») et trancher
les points de la section 4. J'applique alors vos décisions dans le fichier de lot :
- les entrées acceptées passent en `validated` ;
- les entrées refusées sont réécrites et repassent en relecture ;
- une entrée de journal qui change est réécrite sous le même identifiant.

L'assemblage partiel et le validateur lexical confirmeront le résultat. Si vous choisissez 4.2 b
ou 4.3, je modifierai d'abord la frontière (`rules.mjs`), avec ses tests et ses sabotages.

## 6. Changement d'infrastructure dans cette livraison

Le rapport de relecture (`report.mjs`) a été amélioré pour permettre l'arbitrage :
- les groupes candidats sont réunis sous un en-tête, avec la proposition du groupe ;
- chaque décision du journal est montrée avec sa raison ;
- les sens sont présentés en tableau.

Deux tests et trois sabotages le protègent : raisons masquées, groupes dispersés, proposition
présentée comme décision.

Le test « 5.0 ne contient aucune décision » est remplacé par celui de 5.1 : seul le lot 0 existe,
entièrement proposé, et chaque décision du journal est citée par une entrée de lot.
