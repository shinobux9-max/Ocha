# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 16 « Préférences, appréciations et états de la personne » · proposition

**Date** : 2026-10-05
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 21 entrées du lot et ses 51
décisions de journal. Rien n'est validé, rien n'est commité. Les cas sensibles ne sont pas
tranchés : chaque choix ci-dessous est une proposition, avec son alternative quand il y en a une.

**À lire avec** : `reconstruction/a2-04/rapports/lot-16.md` (rapport généré, entrée par entrée) et
`docs/rapports/etape2-A2-04-lot16-perimetre.md` (périmètre arbitré, cas sensibles relevés).

**État** : les dix-huit choix du §4 ont été retenus tels que proposés dans la version révisée (§7),
et le lot validé, le 2026-10-05 (`docs/rapports/etape2-A2-04-lot16-valide.md`). Ce rapport reste la
proposition telle qu'elle a été relue : les mentions « proposed » et l'essai à blanc y décrivent
l'état d'avant la validation.

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Les deux
principes arbitrés avec le périmètre sont appliqués : un axe d'A2-DIM lorsqu'il décrit directement
le sens ; une traduction française naturelle lorsque la fiche l'atteste.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-16.json` | nouveau : 21 entrées, toutes `proposed`, aucune fusion, aucun ajout |
| `journal.json` | 51 décisions `proposed`, D1076 à D1126, ajoutées à la fin ; les 1 075 décisions existantes sont identiques |
| `reconstruction/a2-04/rapports/lot-16.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | deux tests adaptés à une proposition en cours, deux tests ajoutés |
| Règles, validateur, registres, sources figées | inchangés |

**Sens** : 22, pour 21 entrées (seule 立派 a deux sens).

| Nature | Champ | Nombre |
|---|---|---|
| `abandon` | sens | 19 |
| `categorie-nulle` | catégorie d'un sens (A5) | 12 |
| `decision` | sens | 10 |
| `decision` | dimension d'un sens | 4 |
| `decision` | catégorie d'un sens (欲しい, 下手) | 2 |
| `decision` | classe grammaticale | 2 |
| `correction` | nuance (confusion de la source) | 1 |
| `abandon` | nuance (explication de kanji) | 1 |

Une entrée, 嫌い, ne demande aucune décision notable. Aucune lecture, aucune forme, aucun tag,
aucune particule, aucune relation ni aucune fonction linguistique n'est décidé.

## 2. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Réel | 530 | 31 | 158 (137 non décidées, 21 propositions non validées) | 0 | 0 | 0 |
| **Essai à blanc**, lot 16 supposé validé, en mémoire | **551** | **31** | **137** | 0 | 0 | 0 |

- **Avertissements à l'essai à blanc** : 66, soit 12 de plus, tous des `categorie-nulle` justifiées
  au journal (§3, groupes C, D et E).
- **Tests** : 451 réussis, 0 échec (449 avant ; deux tests ajoutés : l'état du lot 16 proposé,
  l'essai à blanc).
- **Sabotages** : 20 joués, chacun vérifié comme modifiant réellement son fichier, puis rétabli à
  l'octet près. **Un n'a pas été attrapé au premier passage** : l'ajout de « Gentil » (l'homophone
  cité par la fiche de 易しい) aux traductions. Le trou de test est comblé : le test fixe désormais
  les traductions exactes des 21 entrées ; le sabotage rejoué est attrapé, avec deux autres du même
  genre. Les autres : une entrée ou une décision validée par erreur ; une décision d'un lot clos
  rouverte ; la particule が ajoutée à 好き ; la nuance de 好き remise selon la fiche fautive ; une
  classe changée ou décidée à tort ; une dimension retirée, ajoutée sans raison ou inversée ; une
  catégorie nulle sans justification ; un second sens créé pour « Attention ! » ; une fonction
  pragmatique ajoutée ; un type changé ; une décision supprimée ; une traduction abandonnée remise.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes.

## 3. Les choix lexicaux, groupe par groupe

### A. Préférences et désirs (5)

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| 好き | Aimer (Aimé, Préféré) | psychologie › préférences | `propriete` |
| 大好き | Adorer (Aimer beaucoup) | idem | `propriete` |
| 嫌い | Détester (Ne pas aimer) | idem | `propriete` |
| 嫌 | Désagréable (Détestable) | idem | `propriete` |
| 欲しい | Vouloir (Désirer) | psychologie › états psychologiques | `etat` |

- **Traductions par des verbes.** 大好き, 嫌い et 欲しい gardent celles de la source. Pour 好き,
  « Aimer » passe en tête : l'exemple de la fiche est « j'aime les pommes ». « Aimé » et
  « Préféré » sont gardées. La classe japonaise n'est pas touchée (adjectifs en な et en い).
- **好き et が.** La nuance de la source dit 好き « suivi de » が ; son exemple place が avant
  (りんごが好きです). C'est une confusion de la source : la nuance rédigée suit l'exemple, et la
  correction est journalisée (D1078). Le champ des particules, vide dans la fiche, n'est pas
  complété ; 大好き, 嫌い et 欲しい gardent leur が, mécanique.
- **大好き** : un degré de 好き, dit en nuance ; deux mots distincts, aucune fusion, aucune fonction.
- **嫌** : classe `adjectif_na` (la fiche dit « adjectif en -na »). Le refus (« non, je ne veux
  pas ») est un emploi d'adresse, conservé en nuance.
- **Types.** Les définitions d'A2-ST sont suivies. Une préférence est une `propriete` :
  « caractéristique attribuable à une entité, indépendamment du fait qu'elle soit permanente ou
  variable ». Vouloir un objet est un `etat` : « condition dans laquelle se trouve momentanément ou
  contextuellement une entité ». La distinction ne repose pas sur la durée.
- **欲しい** : psychologie › états psychologiques, sous-catégorie existante qui convient au « désir
  d'obtenir un objet ».

### B. Plaisir et intérêt (2)

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| 楽しい | Amusant (Agréable) | émotions › joie, plaisir | `propriete` |
| つまらない | Ennuyeux (Inintéressant) | psychologie › attention | `propriete` |

- Les deux catégories sont celles des deux sens de 面白い (lot 0) : « amusant » et « intéressant ».
- **楽しい** : « Joyeux » et « Gai » sont abandonnés ; la fiche décrit ce qui procure du plaisir,
  et son exemple un voyage, non l'humeur d'une personne.
- **つまらない** : la formule de modestie en offrant un cadeau est conservée en nuance. La fiche ne
  rattache pas explicitement « Sans valeur » et « Trivial » à un emploi ; les rapprocher de cette
  formule est le choix proposé.

### C. Compétence et difficulté (4)

| Mot | Sens | Catégorie | Dimension |
|---|---|---|---|
| 上手 | Doué (Habile, Bon (dans un domaine)) | capacités et aptitudes › habileté | — |
| 下手 | Maladroit (Nul, Mauvais (en pratique)) | idem | — |
| 易しい | Facile (Simple) | `null` (A5) | facilité / difficulté · facilité |
| 難しい | Difficile (Compliqué) | `null` (A5) | facilité / difficulté · difficulté |

- **上手 et 下手** : la même catégorie, deux degrés d'une même échelle ; 下手 n'est pas une
  « incapacité ». La construction avec が est dite en nuance de 上手, avec l'exemple de la fiche.
- **易しい et 難しい** : sans catégorie, avec la dimension, comme le sens « difficile » de 大変
  (lot 0). L'axe simplicité / complexité n'est pas ajouté pour « Simple » et « Compliqué ».
- **易しい** : la fiche cite un homophone, « aimable, gentil », absent des sources. La nuance le
  signale ; aucun sens, aucune graphie n'est ajouté.

### D. Appréciation et valeur (6)

| Mot | Sens | Catégorie | Dimension |
|---|---|---|---|
| 悪い | Mauvais | `null` (A5) | — |
| 大切 | Important (Précieux, Cher) | `null` (A5) | importance / insignifiance · importance |
| 立派 | 1. Magnifique (Superbe, Splendide) · 2. Remarquable (Digne) | `null` · `null` (A5) | — |
| 便利 | Pratique (Commode, Utile) | `null` (A5) | utilité / inutilité · utilité |
| 有名 | Célèbre (Connu) | `null` (A5) | — |
| 危ない | Dangereux (Risqué) | `null` (A5) | — |

- **Sans catégorie** : ce sont des évaluations générales, comme いい « bon » et きれい « beau »
  (lot 0).
- **悪い** : un seul sens, comme いい. La nuance garde l'exemple de la fiche (めが悪い, « avoir une
  mauvaise vue ») et l'emploi d'excuse. La source se contredit sur cet emploi (« formule polie »
  dans la traduction, « familièrement » dans la nuance) : la nuance, qui le développe, est suivie.
- **大切** : un seul sens, la fiche réunissant valeur, importance et attachement dans une même
  description.
- **立派** : deux sens, la fiche distinguant une chose impressionnante (l'exemple : un bâtiment) et
  une personne au comportement admirable. Classe `adjectif_na`.
- **危ない** : « Attention ! » est conservé en nuance, comme l'exclamation de 痛い (lot 01).
- **Dimensions** : portées par 大切 et 便利, dont un axe décrit directement le sens ; aucune pour
  悪い, 立派, 有名 et 危ない, qu'aucun axe ne décrit (ni le bien et le mal, ni la notoriété, ni le
  danger ne sont des axes d'A2-DIM).

### E. États de la personne (4)

| Mot | Sens | Catégorie | Type |
|---|---|---|---|
| 元気 | En forme (En bonne santé, Vigoureux) | états et besoins physiques › fatigue et énergie physique | `etat` |
| 暇 | Libre (Temps libre) | `null` (A5) | `etat` |
| 忙しい | Occupé (Pris, Débordé) | `null` (A5) | `etat` |
| 大丈夫 | Ça va (Pas de problème, Tout va bien) | `null` (A5) | `etat` |

- **Type `etat`** : la condition du moment d'une personne, comme 病気 (lot 01).
- **暇** : « Libre » passe en tête, l'exemple employant le mot en prédicat (« je suis libre cet
  après-midi ») ; « Temps libre », traduction principale de la source, est gardé.
- **忙しい** : la nuance de la source est une explication du kanji ; elle n'est pas reprise.
- **元気** : « Joyeux », et pour **大丈夫** « En sécurité » et « Correct », que les fiches ne
  développent pas, sont signalés en nuance, hors des sens.

## 4. Choix à arbitrer

1. **好き : « Aimer » en traduction principale**, « Aimé » et « Préféré » gardées. Alternative :
   « Aimé » en tête, comme la source.
2. **Préférences en `propriete`, désir en `etat`** (好き, 大好き, 嫌い, 嫌 ; 欲しい), selon les
   définitions d'A2-ST. Alternative : le même type pour les cinq.
3. **欲しい dans psychologie › états psychologiques.** Alternative : psychologie › préférences.
4. **嫌 : un seul sens**, le refus en nuance. Alternative : un second sens pour le refus.
5. **楽しい : « Joyeux » et « Gai » abandonnés.** Alternative : les garder comme autres traductions.
6. **つまらない : un seul sens**, la modestie en nuance. Alternative : un second sens, « sans
   valeur ».
7. **下手 dans « habileté »**, comme 上手. Alternative : capacités et aptitudes › incapacité.
8. **易しい et 難しい : catégorie nulle et dimension**, comme 大変. Alternative : une catégorie
   (éducation › apprentissage), que les fiches ne soutiennent pas seules.
9. **悪い : un seul sens**, l'excuse en nuance, « familièrement » retenu contre « formule polie ».
   Alternative : un second sens pour l'excuse.
10. **大切 : un seul sens**, avec la dimension d'importance. Alternative : un second sens pour
    l'attachement.
11. **立派 : deux sens** (chose, personne). Alternative : un seul.
12. **便利 : dimension d'utilité** ; **有名 et 危ない : aucune dimension.**
13. **危ない : un seul sens**, « Attention ! » en nuance. Alternative : un second sens.
14. **Les douze catégories nulles** (易しい, 難しい, 悪い, 大切, 立派 deux fois, 便利, 有名, 危ない, 暇,
    忙しい, 大丈夫). Alternatives ponctuelles : le temps pour 暇 et 忙しい ; le travail pour 忙しい.
15. **元気 dans l'énergie physique**, en `etat`. Alternative : santé et médecine.
16. **暇 : « Libre » en tête.** Alternative : « Temps libre », comme la source.
17. **Traductions non développées signalées en nuance** (元気 « joyeux », 大丈夫 « en sécurité »,
    « correct »). Alternative : les abandonner sans les signaler.
18. **Les fiches « adjectif en na (et nom) »** (好き, 元気, 暇) : classe mécanique, rien n'est
    proposé. Le point reste ouvert, il ne relève pas de ce lot.

## 5. Cohérence avec les lots validés

- **いい, きれい** (lot 0) : même traitement de l'appréciation générale, sans catégorie.
- **面白い** (lot 0) : ses deux catégories servent à 楽しい et à つまらない.
- **大変** (lot 0) : même dimension et même absence de catégorie que 難しい.
- **痛い** (lot 01) : même traitement de l'emploi d'adresse, en nuance.
- **病気** (lot 01) : même type `etat` que les états de la personne.
- **Lot 15** : la fiche entière décide, exemple compris ; les traductions non développées sont
  signalées en nuance ; aucune symétrie n'est imposée entre deux entrées.
- **`counter`** : toujours porté par la seule 匹. **`suffix`** : par la seule 半.
- **Dimensions** : quatre sens de plus en portent une ; le corpus en compterait sept.
- **Doctrine** : aucun sens, aucune lecture, aucune graphie n'est ajouté par connaissance externe.

## 6. Suite

1. Relecture de la proposition, avec une recommandation motivée par la pertinence pédagogique, puis
   arbitrage des points du §4.
2. Révision si nécessaire, sous les mêmes identifiants de journal.
3. Sur autorisation : validation atomique du lot 16 (statuts seulement).

## 7. Révision du 2026-10-05, après relecture

Une entrée et quatre décisions sont révisées **à leur place**. Les 20 autres entrées et les 47
autres décisions du lot sont identiques ; les identifiants, les entrées, les champs, les natures et
les statuts des 51 décisions n'ont pas changé ; le lot cite les mêmes décisions. Le texte ci-dessus
décrit la proposition révisée.

| Entrée | Décision | Révision |
|---|---|---|
| 欲しい | D1084 (valeur et raison) | La catégorie passe du niveau 2 à psychologie › états psychologiques : cette sous-catégorie existante convient au désir. Affirmer qu'aucune ne convenait n'était pas justifié. Le type `etat` est conservé |
| 欲しい, 好き | D1084, D1076 (raison) | La justification des types cite les définitions d'A2-ST (une caractéristique attribuée ; une condition dans une situation). L'opposition « durable contre momentané » ne suffisait pas : une propriété peut être variable |
| つまらない | D1088 (raison) | Le rattachement de « Sans valeur » et « Trivial » à la modestie est présenté comme le choix proposé ; la fiche ne le dit pas explicitement |
| 忙しい | D1122 (raison) | La catégorie nulle est justifiée par sa propre fiche (« un emploi du temps chargé », « par le travail ou les tâches »). La première rédaction lui prêtait une formulation de la fiche de 暇 (« d'autres obligations ») |

- **Choix retenus par la relecture, sans changement** : traductions naturelles (« Aimer »,
  « Vouloir », « Libre ») ; emplois d'adresse en nuance ; quatre dimensions ; douze catégories
  nulles ; deux sens pour 立派, un seul pour 大切 et つまらない. Ils restent à arbitrer.
- **Résultats** : inchangés. Réel 530 / 31 / 158 ; essai à blanc 551 / 31 / 137, 0 problème, 0
  erreur, 0 attente, 66 avertissements ; 451 tests.
- **Sabotages** : 4 de plus sur les points révisés, tous attrapés, chacun vérifié comme modifiant
  réellement son fichier puis rétabli à l'octet près : 欲しい remise au niveau 2 ; la raison de
  D1076 remise à « caractéristique durable » ; celle de D1088 remise à l'affirmation ; celle de
  D1122 avec la formulation de 暇.
