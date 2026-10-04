# Ocha — Document de conception v1

## Addendum A7 · Définition opérationnelle de la fonction `deictique`

**Statut** : 🔒 validé le 2026-10-03 (arbitrage du lot 11 d'A2-04).

**Objet** : fixer la règle selon laquelle Ocha attribue la fonction linguistique `deictique` à un
sens. `A2-LING-v1` fixe l'existence de la fonction (famille GRAMMATICAL, identifiant `deictique`),
mais ne la définit pas.

**Ce que cet addendum ne fait pas** :
- il ne modifie pas `A2-LING-v1` : ni l'arbre des fonctions, ni l'identifiant, ni la structure ;
- il ne définit **aucune autre** fonction d'A2-LING ;
- il n'ajoute aucune fonction, et en particulier aucune fonction « anaphorique ».

C'est une convention d'application propre à Ocha, comme A5 et A6.

---

## 1. Constat

Aucune définition normative de `deictique` n'existe : ni dans `A2-LING-v1` (§4, simple libellé ;
§5, aucune frontière pour cette fonction), ni dans `A2-GLOBAL-v1`, ni dans le registre
`linguistic-functions.json` (`{ "id": "deictique", "label": "déictique" }`), ni dans le schéma
`schema-A2-01` et ses addenda.

Le lot 11 (démonstratifs, interrogatifs et pronoms) a été le premier à appliquer cette fonction, à
22 sens. Une règle conditionnant autant de décisions, et les lots à venir, relève d'un addendum, et
non d'un arbitrage de lot (`REGLES-CONSTRUCTION`, « toute évolution passe par un addendum
explicite »).

## 2. Définition

> **`deictique`** — fonction grammaticale d'un SENSE dont l'interprétation référentielle ou le
> repérage dépend directement de la **situation d'énonciation**, notamment du **locuteur**, de
> l'**interlocuteur**, du **lieu d'énonciation** ou du **moment d'énonciation**.

La définition couvre donc trois axes :

| Axe | Le référent est repéré par rapport à… | Exemples |
|---|---|---|
| **Personne** | qui parle, à qui l'on parle | 私, あなた ; こちら « moi, nous (poli) » |
| **Espace** | où se trouvent le locuteur et l'interlocuteur | これ, ここ, この, あそこ, そっち |
| **Temps** | le moment où l'on parle | おととし « il y a deux ans », 近く « prochainement » ; le futur lot du temps (今, 今日, 明日, 去年…) |

## 3. Frontières

1. **Référence syntaxique** : une référence déterminée uniquement par la syntaxe n'est pas
   déictique. Exemple : l'emploi réfléchi de 自分, dont le référent est le sujet de la phrase
   (彼は自分を…).
2. **Anaphore** : un emploi anaphorique, dont le référent est récupéré dans le discours antérieur
   (それ, その, そこ « dont on vient de parler »), ne suffit pas à lui seul à attribuer `deictique`.
   Un sens qui possède **aussi** un emploi déictique documenté peut néanmoins porter la fonction ;
   l'emploi anaphorique est alors décrit dans la nuance.
3. **Interrogation** : un sens qui interroge sans renvoyer à un référent situé (la série en ど)
   n'est pas déictique ; il relève d'`interrogatif`.

## 4. Sens à plusieurs emplois

La fonction est attribuée **lorsqu'un emploi déictique fait partie intégrante du sens tel qu'il est
modélisé**. Une simple traduction contextuelle, ou un emploi marginal mentionné en nuance, ne suffit
pas.

Cette règle remplace toute notion de « sens dominant », difficile à objectiver. Exemple : 自分 est
modélisé comme un sens réfléchi ; son emploi pour « je », documenté par la source, est conservé en
nuance. Il ne fait pas partie intégrante du sens modélisé : 自分 ne reçoit pas `deictique`.

## 5. Application et effets

| Où | Effet |
|---|---|
| Reconstruction A2-04 | les décisions qui attribuent ou refusent `deictique` citent cet addendum au lieu de poser elles-mêmes une définition (lot 11 : révision 5.12b) |
| Lots à venir | la définition s'applique telle quelle, y compris à la deixis temporelle (lot du temps et du calendrier) |
| **Données déjà validées** | **réservation pour l'audit A2-05** : auditer toutes les ENTRY et tous les SENSE déjà validés susceptibles de relever de la deixis temporelle, **au minimum おととし (lot 0) et 近く, sens 2 « prochainement » (lot 10)**. La règle est décidée maintenant ; seul l'audit exhaustif de ses conséquences antérieures est reporté. |
| Validateur lexical | aucun changement : `deictique` reste une valeur du registre, contrôlée par I13 comme toute fonction |

---

## Décisions de cet addendum

| Point | Décision |
|---|---|
| Niveau de gouvernance | addendum de conception Ocha, et non nouvelle version d'A2-LING |
| Définition de `deictique` | dépendance directe à la situation d'énonciation : personne, espace, **temps** |
| Référence syntaxique (réfléchi) | non déictique |
| Anaphore seule | insuffisante ; la fonction reste possible si le sens a aussi un emploi déictique documenté |
| Sens à plusieurs emplois | fonction attribuée si l'emploi déictique fait partie intégrante du sens modélisé |
| Données validées | audit rétroactif de la deixis temporelle réservé à A2-05 (au minimum おととし et 近く sens 2) |
| Autres fonctions d'A2-LING | hors du champ de cet addendum |
