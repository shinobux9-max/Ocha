# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.12 · Lot 11 « démonstratifs, interrogatifs et pronoms » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 34 entrées et les 104 décisions de journal du lot sont `proposed`
(D0631 à D0734). Les lots 0 à 10 et leurs 630 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-11.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **433 tests, tous verts** (431 avant, 2 nouveaux : les exceptions de classe du lot 11, le lot 11 entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 380 ENTRY, 31 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 11 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 414 (380 + 34) | **414** |
| Identifiants retirés | 31 | **31** (aucune fusion) |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Entrées restantes après le lot | 274 | **274** |
| Avertissements | — | `categorie-nulle` × 24 (3 nouveaux : 自分, 誰か, 皆), `type-nul` × 20 (aucun nouveau), `kanji-inconnu` × 1 |

## 2. Infrastructure : 5 exceptions de classe

`CLASS_EXCEPTION_IDS` passe de 46 à **51** entrées : それ, こちら, そちら, どっち, いくつ. Ce
changement rend seulement leur classe **décidable** ; la décision elle-même est prise entrée par
entrée.

Un test vérifie les cinq entrées et le compte de 51. Deux sabotages sont attrapés : retirer いくつ
de la liste, ou y glisser これ.

## 3. Classes : chaque décision s'appuie sur la fiche

Comme demandé, chaque décision explique à la fois l'insuffisance de la classe mécanique héritée et
le comportement documenté par la fiche. La cohérence du paradigme sert de **contrôle**, jamais de
source : il n'y a pas de règle « membre d'une série ⇒ même classe ».

| Entrée | Classe | Décision | Ce que dit la fiche |
|---|---|---|---|
| それ, こちら, そちら | `pronom` | D0635, D0669, D0674 | « pronom démonstratif » ; l'ancien rangement l'avait typé « nom » |
| どっち | `pronom` | D0697 | « pronom interrogatif familier » |
| いくつ | `pronom` | D0721 | « pronom interrogatif » (l'ancien type disait « adverbe ») ; même décision que いくら |
| いつ | `pronom` | D0713 | « pronom interrogatif temporel » |
| この, その, あの | `determinant` | D0655, D0658, D0661 | « précède **obligatoirement** un nom » |
| どの | `determinant` | D0665 | « se place devant un nom » |
| こんな | `determinant` | D0702 | « précède un nom » ; aucun emploi d'adjectif (prédicat, こんなだ) documenté : la seule présence de な ne fait pas un adjectif en な |

**Résultat** : 25 pronoms, 5 déterminants, 4 adverbes (どう, いかが, なぜ, どうして, classe
mécanique conservée).

## 4. Fonctions, sens par sens

- **`deictique`** : l'identifiant est vérifié dans le registre. A2-LING **liste** la fonction sans
  la **définir**. Je l'ai appliquée au sens linguistique standard, et je le dis dans chaque
  décision : un sens est déictique quand son référent dépend de la situation de parole (le
  locuteur, l'interlocuteur, leur position).
  - **Attribuée (22 sens)** : les sens des séries こ, そ et あ, chacun justifié, et 私 et あなた
    (deixis de personne).
  - **Non attribuée** : 自分 (réfléchi : il renvoie au sujet de la phrase), 誰か (indéfini), 皆.
    L'appartenance morphologique à こ・そ・あ・ど ne suffit pas.
- **`interrogatif` (15 sens)** : la série en ど et les autres interrogatifs.
- **Emploi anaphorique** : celui de それ, その, そこ (« dont on vient de parler ») est documenté
  par les fiches, mais A2-LING n'a pas de fonction dédiée. Il est décrit dans les nuances.

**Je te signale la définition de `déictique` utilisée**, puisqu'elle n'est pas écrite dans A2-LING.

## 5. Sens, à partir des fiches (aucune analogie)

| Entrée | Proposition | Ce que dit la fiche |
|---|---|---|
| **こちら** | **deux sens** : par ici / moi, nous (poli) (D0670) | « une direction, un lieu proche **ou** servant de forme polie pour désigner sa propre personne » |
| **あちら** | **deux sens** : là-bas / cette personne-là (D0680) | « de lieu ou de direction… Il sert **aussi** à désigner poliment une personne » |
| **こっち** | **deux sens** : par ici / moi, mon camp (D0688) | « Il peut **aussi** désigner le locuteur ou son camp » |
| **そっち** | **deux sens** : par là / toi, ton camp (D0692) | « un endroit proche de l'interlocuteur **ou** le camp de ce dernier » |
| **どちら** | **trois sens** : lequel (des deux) / où (poli) / qui (poli) (D0684), **à arbitrer** | la fiche **énumère** « choisir entre deux options, désigner une direction polie, **ou** demander l'origine / l'identité de quelqu'un » |
| **そちら** | **un sens** (D0675) | seule la direction est documentée ; rien n'est ajouté par analogie avec こちら |
| **あっち** | **un sens** (D0694) | seule la direction est documentée ; rien n'est ajouté par analogie avec あちら |
| **どっち** | **un sens** (D0698) | la fiche présente **une** notion : « un choix entre deux directions ou deux éléments » |
| **いくつ** | **un sens** (D0722) | l'âge est un nombre d'années : la question reste « combien » |
| **あなた** | **un sens** (D0728) | l'emploi entre époux est un usage du même pronom, pas un sens distinct |
| **どう** | **un sens** (D0706) | manière, état, avis sont les objets du même « comment » |

Le paradigme qui en résulte n'est pas symétrique (こちら a deux sens, そちら un seul), parce que
les fiches ne le sont pas. Je n'ai rien complété par symétrie.

## 6. Catégories et types

- **Catégorie** :
  - **une catégorie de domaine quand le sens désigne un domaine**, comme pour いくら au lot 05 :
    lieux (ここ, そこ, あそこ, どこ) en « position, localisation » ; directions en « orientation » ;
    いつ en « temps » ; いくつ en « nombres et quantification » ;
  - **sinon `null`**, justifié directement par la fonction (A5).
- **Trois pronoms sans fonction** (自分, 誰か, 皆) : `category: null` avec une décision
  `categorie-nulle` (personne générique, comme 人 et 皆さん au lot 01).
- **Type** :
  - **`null`** pour chaque sens démonstratif ou interrogatif, avec une décision `type-nul` par sens
    (35 au total), comme 何 et いくら ;
  - **`personne`** pour 私, あなた, 自分 et 誰か, qui désignent une personne ;
  - **`groupe_collectif`** pour 皆, comme 皆さん.

## 7. Autres décisions

- **Tags** : les quatre candidats `lieu_gare` (それ, こちら, そちら, どっち) sont rejetés un par un
  (D0637, D0672, D0677, D0700).
- **皆** : graphie みんな, documentée par la fiche (D0733). La forme usuelle n'est pas changée : 皆
  n'est pas dans `USUAL_FORM_IDS`.
- **Registre** : poli (こちら…, どなた, いかが) ou familier (こっち…) dans les nuances, sans
  fonction `politesse`, conformément au lot 01.
- **Rien n'est complété** : そんな, あんな, どんな, こう, そう et ああ ne sont pas ajoutés.

## 8. Journal du lot

104 décisions proposées, de D0631 à D0734 :
- 41 décisions : 11 classes, 18 fonctions déictiques, 8 découpages et sens uniques, 4 rejets de
  tags, 1 graphie ;
- 25 abandons ;
- 35 `type-nul` ;
- 3 `categorie-nulle`.

## 9. Ce que j'attends

Ton arbitrage, en particulier sur :
- **どちら** : trois sens ;
- la définition de `déictique` utilisée (sens linguistique standard, faute de définition dans
  A2-LING), et son attribution à 私 et あなた ;
- **こんな** en `determinant` ;
- l'asymétrie assumée du paradigme (こちら, あちら, こっち, そっち à deux sens ; そちら et あっち à un).
