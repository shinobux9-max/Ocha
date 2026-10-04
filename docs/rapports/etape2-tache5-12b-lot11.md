# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.12b · Addendum A7 et lot 11 révisé

**Date** : 2026-10-03
**Référence** : arbitrage sur la gouvernance de `deictique` (addendum A7 ; deixis temporelle
incluse ; audit rétroactif réservé à A2-05).
**Statut du lot** : toujours **en proposition**. Révision **purement documentaire** : les données du
lot 11 sont strictement identiques à 5.12a.

---

## 1. Addendum A7

`docs/conception/addendum-A7-deictique.md`, inscrit au sommaire.

- **Définition** : « fonction grammaticale d'un SENSE dont l'interprétation référentielle ou le
  repérage dépend directement de la situation d'énonciation, notamment du locuteur, de
  l'interlocuteur, du lieu d'énonciation ou du moment d'énonciation ». Elle couvre trois axes :
  personne, espace, **temps**.
- **Frontières** :
  - une référence purement syntaxique (le réfléchi 自分) n'est pas déictique ;
  - une anaphore seule ne suffit pas, mais un sens qui a aussi un emploi déictique documenté peut
    porter la fonction ;
  - un sens interrogatif relève d'`interrogatif`.
- **Sens à plusieurs emplois** : la fonction est attribuée si l'emploi déictique fait **partie
  intégrante du sens modélisé** ; une traduction contextuelle ou un emploi marginal en nuance ne
  suffit pas. C'est ta formulation, à la place du « sens dominant ».
- **Réservation pour A2-05** : auditer toutes les données validées susceptibles de relever de la
  deixis temporelle, au minimum おととし (lot 0) et 近く sens 2 (lot 10).

**Ce qu'A7 ne fait pas, comme demandé** :
- il ne modifie pas A2-LING : ni l'arbre, ni l'identifiant, ni la structure ;
- il **ne définit aucune des 13 autres fonctions** : le texte le dit dans son objet et dans son
  tableau de décisions ;
- il n'ajoute aucune fonction, en particulier aucune fonction « anaphorique » ;
- il ne change rien au validateur lexical, qui contrôle `deictique` par I13 comme toute fonction.

## 2. Révision 5.12b

**Ce qui change** : les **raisons** de 40 décisions, qui citent désormais A7 au lieu de poser
elles-mêmes une définition :
- les 18 décisions qui attribuent `deictique` (14 décisions de fonction et 4 découpages, pour
  こちら, あちら, こっち et そっち) ;
- les 20 décisions `type-nul` des sens déictiques ;
- les 2 décisions `categorie-nulle` qui motivent l'absence de la fonction (自分 : A7 §3.1 et §4 ;
  誰か : référent indéterminé).

**Ce qui ne change pas**, vérifié automatiquement :
- **les données du lot 11** : `lot-11.json` est identique à 5.12a ;
- **dans le journal** : pour les 104 décisions, l'identifiant, l'entrée, la nature, le champ, les
  valeurs `before` et `after` et le statut (`proposed`) sont tous inchangés ;
- **D0001 à D0630** : intactes ;
- **aucune raison ne pose plus de définition** : aucune n'emploie encore « situation de parole »
  ni « sens linguistique standard ».

**Conformément à l'arbitrage** :
- 私 et あなた gardent `deictique` ;
- 自分 ne le reçoit pas : son emploi « je » reste en nuance (A7 §4) ;
- les emplois anaphoriques restent en nuance ;
- aucun autre arbitrage du lot 11 n'est rouvert.

## 3. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **433 tests, tous verts** |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Essai à blanc (lot 11 et journal supposés validés) | **414 ENTRY, 31 retraits, 0 problème, 0 erreur, 0 attente, 274 entrées restantes** (inchangé) |

`ETAT-ACTUEL.md` et `ROADMAP.md` consignent A7, la réservation A2-05 (ajoutée aussi à la liste
d'A2-05 dans la feuille de route), et un point ouvert : les 13 autres fonctions restent sans
définition normative, à traiter seulement si un cas l'exige.

## 4. Pour valider le lot 11

L'opération sera la même que pour les lots précédents :
1. les 34 entrées et les 104 décisions D0631 à D0734 passent en `validated`, en vérifiant que leur
   contenu reste identique hors statut ;
2. l'assemblage réel doit redonner 414 ENTRY, 31 retraits, 0 erreur, 0 attente, 274 entrées
   restantes ;
3. le test « lot 11 entièrement proposé » devient « lot 11 entièrement validé ».
