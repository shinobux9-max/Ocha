# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.14 · Lot 13 « Calendrier, dates et durées » · proposition

**Date** : 2026-10-04
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 27 entrées du lot et ses 109
décisions de journal. Rien n'est validé, rien n'est commité. Les cas sensibles ne sont pas
tranchés : chaque choix ci-dessous est une proposition, avec son alternative quand il y en a une.

**À lire avec** : `reconstruction/a2-04/rapports/lot-13.md` (rapport généré, entrée par entrée, avec
les fiches sources et les exemples).

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-13.json` | nouveau : 27 entrées, toutes `proposed`, aucune fusion, aucun ajout |
| `journal.json` | 109 décisions `proposed`, D0845 à D0953 ; les 844 décisions existantes sont identiques |
| Périmètre | arbitré : 26 entrées de `temps_calendrier` et 夏休み, sans scission |
| Règles, validateur, registres | inchangés |

**Sens** : 41, pour 27 entrées (14 entrées à deux sens).

**Décisions du journal, par nature** :

| Nature | Champ | Nombre |
|---|---|---|
| `decision` | fonction linguistique d'un sens (A7) | 37 |
| `decision` | tags (rejet de `lieu_hotel`) | 26 |
| `decision` | sens | 17 |
| `decision` | classe grammaticale | 12 |
| `abandon` | sens | 12 |
| `decision` | catégorie d'un sens | 1 |
| `decision` | `suffix` | 1 |
| `decision` | `counter` | 1 |
| `categorie-nulle` | catégorie d'un sens (A5) | 1 |
| `type-nul` | type d'un sens (A6) | 1 |

## 2. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Réel | 445 | 31 | 243 | 0 | 0 | 0 |
| **Essai à blanc**, lot 13 supposé validé, en mémoire | **472** | **31** | **216** | 0 | 0 | 0 |

- **Avertissements à l'essai à blanc** : 47, soit 2 de plus qu'aujourd'hui, tous deux justifiés au
  journal : `categorie-nulle` sur カレンダー (D0849), `type-nul` sur 時間, sens 2 (D0926).
- **Tests** : 444 réussis, 0 échec (442 avant ; deux tests ajoutés : l'état du lot 13 et l'essai à
  blanc).
- **Sabotages** : 8 sur 8 attrapés, chacun vérifié comme modifiant réellement son fichier, puis
  restauré à l'octet près (entrée ou décision validée par erreur, entrée sortie du périmètre,
  justification A5 ou A6 retirée, classe non décidée, compatibilité de compteur inventée, catégorie
  hors registre).
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes.

## 3. Les choix lexicaux, groupe par groupe

### A. Jours de la semaine (7)

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| 日曜日 … 土曜日 | Dimanche … Samedi | temps › calendrier › jours | `concept_abstrait` |

- Un sens chacun. La glose étymologique de chaque fiche (« le jour du Soleil ») est abandonnée : ce
  n'est ni un sens ni une traduction.
- Pas de fonction `deictique` : un jour de la semaine est un repère du calendrier.
- Nuance : aucune. Classe et lecture : mécaniques.

### B. Jours du mois (10)

| Mot | Sens 1 | Sens 2 |
|---|---|---|
| 二日, 四日 à 十日, 二十日 | la durée (« Deux jours ») | la date (« Le 2 (du mois) ») |
| **三日** | **la date** (« Le 3 (du mois) ») | **la durée** (« Trois jours ») |

- **Deux sens** : chaque fiche dit « désignant soit une durée…, soit le … jour d'un mois ». Une date
  et une durée sont deux référents.
- **La date** : temps › calendrier › dates, `concept_abstrait`.
- **La durée** : temps › durée, `quantite_valeur`. C'est une quantité de temps, non une unité.
- **Ordre des sens : celui de chaque fiche.** Neuf fiches donnent la durée en premier, 三日 la date.
- **Classe** : `nom`, groupe `nom`. La fiche dit « Nom temporel » ; ce ne sont pas des numéraux
  simples.
- **Lecture** : mécanique, en bloc dans les sources et concordante. Hors de la liste A d'A8.
- **Nuance** : « Lecture japonaise traditionnelle (ふつか), la même pour la date et pour la durée. »
- Aucune forme absente n'est complétée (ついたち, 十四日, 二十四日).

### C. Durées et unités (5)

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| 一日 (いちにち) | Une journée | temps › durée | `quantite_valeur` |
| 一月 (ひとつき) | Un mois | temps › durée | `quantite_valeur` |
| 年 (とし) | 1. Année · 2. Âge | temps › calendrier › années · être humain › cycle de vie | `concept_abstrait` · `propriete` |
| 時間 | 1. Temps · 2. Heure (durée) | temps › durée · temps › unités › seconde, minute, heure | `concept_abstrait` · `null` (A6) |
| 半 | 1. Moitié · 2. Et demie (heure) | nombres › proportions › fraction · temps › unités › seconde, minute, heure | `quantite_valeur` · `quantite_valeur` |

- **一日, 一月** : un seul sens chacun. ついたち et いちがつ, que les fiches signalent « à ne pas
  confondre », ne sont ni des lectures ni des sens de ces entrées ; la nuance le dit, rien n'est
  ajouté. Classe `nom`.
- **年** : deux sens, selon la fiche (« une année calendaire ou l'âge d'une personne »).
- **時間** : deux sens. Le second est l'heure comme unité de durée, d'où `semantic_type: null`,
  comme キロ et 匹.
- **半** : deux sens, et `suffix: true`.

### D. Calendrier et repères (5, avec 夏休み)

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| カレンダー | Calendrier | `null` (A5) | `objet_artefact` |
| 誕生日 | Anniversaire | temps › calendrier › dates | `concept_abstrait` |
| 休み | Repos (pause, congé, vacances) | temps › moments et périodes | `concept_abstrait` |
| 夏休み | Vacances d'été | temps › moments et périodes | `concept_abstrait` |
| 後 (あと) | 1. Après · 2. Derrière | temps › chronologie › avant, après · espace › position › devant, derrière | `concept_abstrait` · `lieu` |

- **カレンダー** : même traitement que 時計 (lot 05). C'est un objet, pas une notion du calendrier.
- **休み** : un seul sens. Pause, congé et vacances sont des traductions d'une même notion. « Jour
  férié » est abandonné : la fiche parle d'un jour de congé.
- **夏休み** : même catégorie et même type que 休み.
- **後** : deux sens, comme 前 et 先 (lot 10). Les particules de la source (で, に) vont au sens
  temporel. Pas de fonction `deictique` : l'emploi « plus tard » est décrit dans la nuance.

## 4. Blocages de modèle

**4.1. 時間 comme compteur : le modèle ne peut pas le dire.**
La fiche dit que 時間 sert de compteur pour les heures. Le champ `counter` exige au moins une
compatibilité du registre des compteurs, qui en a six : petits animaux, objets plats, objets longs,
livres et volumes, unités génériques, occurrences. Aucune ne décrit une durée.

- **Proposé** : `counter: null`, l'emploi étant décrit dans la nuance du sens 2. Aucune
  compatibilité n'est inventée.
- **Pour le dire dans le modèle**, il faudrait une compatibilité nouvelle dans le registre, qui est
  verrouillé : c'est une décision sur le registre, pas sur ce lot.
- **Conséquence** : le test « seule 匹 porte un `counter` » reste vrai.

**4.2. 半 et le champ `suffix` : première utilisation.**
La fiche dit « Nom suffixe ou nominal » et donne 三時半. Le champ `suffix` existe dans le schéma
(propriété « suffixe » d'A2-LING-v1), mais aucune ENTRY ne le porte encore.

- **Proposé** : `suffix: true`, parce que la fiche l'établit.
- **Alternative** : `suffix: false`, tant que la propriété n'a pas de définition opérationnelle
  (A2-LING dit seulement qu'elle est « une propriété linguistique et non un domaine sémantique »).
- Ce choix ne crée aucune ENTRY d'affixe et ne touche pas au point ouvert sur les affixes.

## 5. Choix à arbitrer

1. **Jours du mois : deux sens.** Alternative : un seul sens, avec la date ou la durée en nuance.
2. **Ordre des sens des jours du mois : celui de chaque fiche.** 三日 est alors la seule entrée à
   montrer la date par défaut. Alternative : un ordre unique, qui s'écarterait d'une fiche. L'ordre
   fixe les identifiants de sens.
3. **Type des durées : `quantite_valeur`** (二日 « deux jours », 一日, 一月). Alternative :
   `concept_abstrait`, comme les repères temporels. C'est le premier emploi de ce type pour le
   temps ; il n'est porté aujourd'hui que par des nombres et par お金.
4. **年, sens « âge »** : être humain › cycle de vie, type `propriete`. Alternatives : type
   `quantite_valeur` ; catégorie nulle.
5. **休み : un seul sens**, rangé dans temps › moments et périodes. Alternatives : deux sens (la
   pause, le congé) ; travail › conditions de travail › congés.
6. **夏休み** : même rangement que 休み. Alternative : éducation › vie scolaire › vacances
   scolaires, que la fiche (« scolaires ou professionnelles ») déborde.
7. **後, « le reste » abandonné** : la fiche le donne comme traduction, mais ne le décrit pas.
   Alternative : un troisième sens.
8. **後, sans fonction `deictique`** (A7, §4), comme 前 et 先. Alternative : la fonction, au titre de
   l'emploi « plus tard ».
9. **カレンダー en catégorie nulle**, comme 時計. Alternative : temps › calendrier.
10. **Les 26 rejets de `lieu_hotel`**, un par entrée. 夏休み n'avait aucun candidat.
11. **Les deux points du §4** : 時間 et `counter`, 半 et `suffix`.

## 6. Cohérence avec les lots validés

- **Temps** : les repères du calendrier reçoivent `concept_abstrait`, comme ceux des lots 0, 7 et
  12. Trois chemins de catégorie servent pour la première fois : temps › calendrier (jours, dates,
  années), temps › durée, temps › unités temporelles.
- **A7** : aucune des 27 entrées ne reçoit `deictique`. Les 37 décisions correspondantes disent
  pourquoi, sens par sens.
- **A8** : aucune lecture n'est décidée ; toutes sont mécaniques et concordantes.
- **A5 et A6** : une catégorie nulle (カレンダー) et un type nul (時間, sens 2), chacun justifié au
  journal.
- **Doctrine** : aucun sens, aucune lecture, aucune graphie n'est ajouté par connaissance externe.

## 7. Suite

1. Relecture de la proposition et arbitrage des points du §5.
2. Révision 5.14b si nécessaire, sous les mêmes identifiants.
3. Sur autorisation : validation atomique du lot 13 (statuts seulement).
