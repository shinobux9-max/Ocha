# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 17 « États et propriétés descriptives » · proposition

**Date** : 2026-10-05
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 17 entrées du lot, ses 41
décisions de journal, et la réouverture de 暖かい dans le lot 07. Rien n'est validé, rien n'est
commité. Les cas sensibles ne sont pas tranchés : chaque choix ci-dessous est une proposition, avec
son alternative quand il y en a une.

**À lire avec** : `reconstruction/a2-04/rapports/lot-17.md` (rapport généré, entrée par entrée) et
`docs/rapports/etape2-A2-04-lot17-perimetre.md` (périmètre arbitré, §8).

**Version** : révisée le 2026-10-05 après relecture (§8). Le texte ci-dessous décrit la proposition
révisée.

**État** : les quatorze choix du §5 ont été retenus dans leur version révisée, et le lot validé avec
l'entrée rouverte du lot 07, le 2026-10-06 (`docs/rapports/etape2-A2-04-lot17-valide.md`). Ce rapport
reste la proposition telle qu'elle a été relue : les mentions « proposed » et l'essai à blanc y
décrivent l'état d'avant la validation.

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Aucun sens,
aucune lecture, aucune graphie n'est ajouté par connaissance externe.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-17.json` | nouveau : 17 entrées, toutes `proposed`, aucun ajout |
| `reconstruction/a2-04/lots/lot-07.json` | **une entrée rouverte** : `n5_v_275` (暖かい) passe de « gardée, validée » à « retirée par fusion dans `n5_v_8` », `proposed` ; les 33 autres entrées sont identiques |
| `journal.json` | 41 décisions `proposed`, D1127 à D1167, ajoutées à la fin ; les 1 126 décisions existantes sont identiques |
| `reconstruction/a2-04/rapports/lot-17.md` | rapport généré |
| `reconstruction/a2-04/rapports/lot-07.md` | rapport régénéré (l'entrée rouverte) |
| `tests/reconstruction/workspace.test.js` | trois tests adaptés (lot 07, espace de travail réel, journal), deux tests ajoutés |
| Règles, validateur, registres, sources figées | inchangés |

**Sens** : 25, pour 17 entrées (8 entrées à deux sens).

| Nature | Champ | Nombre |
|---|---|---|
| `abandon` | sens | 11 |
| `categorie-nulle` | catégorie d'un sens (A5) | 9 |
| `decision` | sens | 11 |
| `decision` | catégorie d'un sens | 4 |
| `abandon` | nuance (commentaire de kanji, exemple fautif) | 2 |
| `decision` | classe grammaticale | 1 |
| `decision` | graphie | 1 |
| `decision` | réouverture d'une ENTRY validée | 1 |
| `fusion` | entrée | 1 |

Aucune lecture, aucune forme usuelle, aucun tag, aucune particule, aucune relation, aucune
dimension ni aucune fonction linguistique n'est décidé.

## 2. La réouverture de 暖かい et sa fusion dans 温かい

**L'arbitrage** (rapport de périmètre, §8) : issue C. `n5_v_8`, 温かい, survit ; `n5_v_275`, 暖かい,
est retirée par fusion. C'est la règle normale d'A3 (L2), sans exception.

**Ce qui est écrit, dans l'ordre du journal** :

| Décision | Entrée | Ce qu'elle fait |
|---|---|---|
| **D1127** (`decision`, entrée) | `n5_v_275` | la réouverture explicite. Son champ « avant » garde **en entier** l'état validé de l'ENTRY : lot, statut, décisions citées, tous les champs |
| **D1128** (`fusion`, entrée) | `n5_v_275` | la fusion dans `n5_v_8`. Aucune `exception-fusion` : le plus petit numéro survit |
| D1159 (`decision`, graphie) | `n5_v_8` | 暖かい devient une autre graphie de l'ENTRY survivante |
| D1160 (`decision`, sens) | `n5_v_8` | deux sens, un par fiche |
| D1161 (`decision`, catégorie) | `n5_v_8` | la catégorie du sens 1 |
| D1162 (`abandon`, sens) | `n5_v_8` | « Chaleureux », signalé en nuance |

**D0476 et D0477 ne sont pas modifiées.** Elles restent au journal, validées, et citées par l'entrée
rouverte. Un test vérifie l'empreinte de leur contenu entier. Ce qu'elles décidaient est repris
dans l'ENTRY survivante :

| Décision validée du lot 07 | Dans l'ENTRY survivante |
|---|---|
| D0476 : 温かい est une autre graphie de 暖かい | le lien entre les deux graphies est conservé, dans l'autre sens : 暖かい est une autre graphie de 温かい |
| D0477 : « Chaud » abandonné pour le sens météorologique (« chaud » se dit 暑い) | « Chaud » n'entre pas dans le sens 2 ; il est la traduction principale du sens 1, d'après la fiche de 温かい |

**L'ENTRY survivante, `v_8`** :

| | Valeur | Source |
|---|---|---|
| Forme usuelle | 温かい (mécanique) | la fiche survivante |
| Autre graphie | 暖かい, furigana あたた sur 暖 | les deux fiches |
| Lecture | あたたかい (mécanique) | les deux fiches |
| Sens 1 | Chaud (Tiède) · sens et perception › toucher, sensations | fiche de 温かい ; exemple : « je bois du thé chaud » |
| Sens 2 | Doux (agréablement chaud) (Tiède) · météo › conditions atmosphériques | fiche de 暖かい ; exemple : « il a fait doux ». **Identique au sens validé au lot 07** |
| Nuance | l'usage de chaque graphie ; « chaleureux » signalé comme non développé | les deux fiches |

Le corpus sépare déjà la température de l'air de celle d'une chose : 寒い et 冷たい, 暑い et 熱い
(lot 07).

**Effet sur les comptes**, à la validation : le lot 07 garderait 33 ENTRY et un retrait ; `v_275`
serait retirée vers `v_8` et ne serait jamais réattribuée.

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la proposition (commit `6c8fc50`) | 551 | 31 | 137 | 0 | 0 | 0 |
| **Réel**, proposition en cours | **550** | 31 | 138 (120 non décidées, 18 propositions) | 0 | 0 | 0 |
| **Essai à blanc**, tout supposé validé, en mémoire | **567** | **32** | **120** | 0 | 0 | 0 |

- **L'état réel perd une ENTRY** tant que rien n'est validé : 暖かい, rouverte, n'est plus assemblée,
  et 温かい ne l'est pas encore. C'est l'effet attendu d'une réouverture ; il cesse à la validation.
- **Essai à blanc** : 567 = 551 + 17 − 1. `v_275` n'existe plus ; elle est retirée vers `v_8`, qui
  porte les deux graphies et les deux sens ; une seule ENTRY porte 温かい ou 暖かい.
- **Avertissements à l'essai à blanc** : 75, soit 9 de plus, tous des `categorie-nulle` justifiées
  au journal ; aucun ne disparaît.
- **Tests** : 463 réussis, 0 échec (461 avant ; deux tests ajoutés : l'état du lot 17 proposé,
  l'essai à blanc). La suite en compte 464 depuis l'ajout, ensuite, d'un test à l'outil d'export
  (les entrées d'autres lots touchées par un lot, comme 暖かい, sont désormais exportées).
- **Sabotages** : 23 joués, chacun vérifié comme modifiant réellement son fichier, puis rétabli à
  l'octet près. **Un n'a pas été attrapé au premier passage : D0476, validée, modifiée en silence.**
  Le test ne contrôlait que le début de sa raison. Il vérifie maintenant l'empreinte du contenu
  entier de D0476 et de D0477 ; le sabotage rejoué est attrapé, avec deux variantes (une virgule,
  une date). Les autres : entrée ou décision validée par erreur ; fusion inversée ou vers une autre
  entrée ; état validé perdu dans la réouverture ; graphie retirée ; sens météorologique modifié ;
  « Chaud » remis contre D0477 ; sens de la fiche de 温かい perdu ; `exception-fusion` ajoutée ;
  classe changée ; catégorie nulle sans justification ; sens retiré ; dimension ajoutée ; exemple
  fautif repris en nuance ; homophone ajouté ; décision d'un lot clos rouverte.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes.

## 4. Les choix lexicaux, groupe par groupe

Tous les sens sont de type `propriete`, sans dimension.

| Mot | Sens | Catégorie |
|---|---|---|
| 古い | Vieux (Ancien) | temps |
| 新しい | Nouveau (Neuf, Récent) | temps |
| 若い | Jeune | être humain › cycle de vie |
| 強い | Fort (Puissant, Résistant) | `null` (A5) |
| 弱い | Faible (Fragile) | `null` (A5) |
| 丈夫 | 1. Solide (Robuste, Résistant) · 2. En bonne santé | `null` (A5) · santé › santé et états pathologiques |
| 速い | Rapide (Prompt) | espace › vitesse |
| 遅い | 1. Lent · 2. En retard (Tardif) | espace › vitesse · temps |
| 汚い | 1. Sale (Crasseux) · 2. Grossier (langage) | habitat › entretien domestique › nettoyage · `null` (A5) |
| 清い | 1. Pur (Limpide) · 2. Pur (moralement) (Innocent, Honnête) | `null` · `null` (A5) |
| うるさい | 1. Bruyant · 2. Agaçant (Embêtant) | sens et perception › ouïe · `null` (A5) |
| 賑やか | Animé (Joyeux (lieu)) | `null` (A5) |
| 静か | Calme (Tranquille, Silencieux) | `null` (A5) |
| 温かい | 1. Chaud (Tiède) · 2. Doux (agréablement chaud) (Tiède) | toucher, sensations · météo |
| 温い | Tiède | sens et perception › toucher, sensations |
| 爽やか | 1. Frais (Rafraîchissant, Agréable) · 2. Vif | météo › conditions atmosphériques · psychologie › états psychologiques |
| 暗い | 1. Sombre (Obscur) · 2. Triste | couleurs › teintes et nuances › clair / foncé · psychologie › états psychologiques |

- **Deux sens lorsque la fiche décrit deux référents** (« … ou … », « par extension ») : 丈夫,
  汚い, 清い, うるさい, 爽やか, 暗い, comme 重い au lot 15. Pour 清い, l'exemple porte sur le sens
  moral ; il est conservé en nuance.
- **遅い** : deux sens, la fiche lui donnant deux contraires (« pour la vitesse et l'heure »), comme
  高い au lot 05.
- **強い, 弱い, 若い** : un seul sens. La fiche réunit force, résistance et intensité dans une même
  description, avec un seul contraire ; l'intensité, que les deux exemples illustrent (la pluie, le
  vent), est conservée en nuance avec l'exemple.
- **Catégories reprises des voisins validés** : 暗い suit les deux sens de 明るい ; 爽やか suit 涼しい
  et le sens « enjoué » de 明るい ; 汚い suit le sens « propre » de きれい ; 温い suit 熱い et 冷たい.
- **古い et 新しい** : dans `temps`, au seul niveau 1 ; ce qui « date de longtemps » ou qui est
  « récent » est une propriété directement temporelle (révisé, §8).
- **Neuf catégories nulles** : la force, la solidité, la pureté, l'animation et
  le calme d'un lieu, et trois évaluations d'une conduite.
- **温い** : classe `adjectif_i`. « Fadasse » et « Laxiste (par extension) », non développés, sont
  signalés en nuance.
- **速い** : la nuance dit qu'il s'écrit autrement que l'adjectif de même lecture signifiant « tôt »,
  sans en donner le kanji ; ce mot est dans les sources, hors du lot.
- **静か** : l'exemple fautif de la source (としばこ) n'est repris nulle part ; il est journalisé.
- **暗い** : le commentaire culturel sur le kanji n'est pas repris.

## 5. Choix à arbitrer

1. **温かい : forme usuelle 温かい**, 暖かい en autre graphie. Alternative : 暖かい en forme usuelle,
   l'identifiant survivant restant `v_8`.
2. **温かい : deux sens**, un par fiche. Alternative : un seul sens, « une température douce et
   agréable ».
3. **温かい, sens 1 : « Chaud »** en traduction principale, comme la fiche et son exemple.
   Alternative : « Tiède » en tête, pour le distinguer de 熱い.
4. **丈夫, 汚い, 清い, うるさい, 爽やか, 暗い : deux sens.** Alternative, pour chacune : un seul sens,
   l'extension en nuance.
5. **遅い : deux sens** (lent ; en retard). Alternative : un seul.
6. **強い et 弱い : un seul sens**, l'intensité en nuance. Alternative : un second sens.
7. **若い : un seul sens**, dans être humain › cycle de vie.
8. **丈夫, sens 2 : santé › santé et états pathologiques**, en `propriete`. Alternative : la
   catégorie et le type de 元気 (énergie physique, `etat`).
9. **遅い, sens 2 : catégorie `temps`** au seul niveau 1.
10. **静か et 賑やか : sans catégorie** ; うるさい, sens 1, dans l'ouïe. Alternative : l'ouïe pour
    les trois.
11. **賑やか : « Bruyant » abandonné**, pour le distinguer de うるさい.
12. **Neuf catégories nulles** ; 古い et 新しい dans `temps`, au niveau 1 (révisé après relecture,
    §8). Alternative écartée : les laisser sans catégorie.
13. **Traductions non développées signalées en nuance** (温かい « chaleureux », 温い « fadasse »,
    « laxiste »).
14. **Les nuances rédigées**, exemples compris.

## 6. Cohérence avec les lots validés

- **Lot 07** : une ENTRY rouverte et fusionnée ; les 33 autres, et tout son journal, sont intacts.
- **Lot 0** : la fusion suit le traitement des doublons (きれい / 綺麗) ; la forme usuelle et
  l'identifiant survivant restent deux décisions indépendantes.
- **Lots 15 et 16** : la fiche entière décide, exemple compris ; les traductions non développées
  sont signalées en nuance ; un axe d'A2-DIM ne s'emploie que s'il décrit directement le sens.
- **`counter`** : toujours porté par la seule 匹. **`suffix`** : par la seule 半.
- **A7, A8** : aucune fonction linguistique, aucune lecture décidée.

## 7. Suite

1. Relecture de la proposition et de la réouverture, puis arbitrage des points du §5.
2. Révision si nécessaire, sous les mêmes identifiants de journal.
3. Sur autorisation : validation atomique (statuts seulement) du lot 17 **et** de l'entrée rouverte
   du lot 07, ensemble.

## 8. Révision du 2026-10-05, après relecture

La relecture retient 13 des 14 choix et demande une correction sur le point 12. Deux entrées et
deux décisions sont révisées **à leur place** ; les 15 autres entrées et les 39 autres décisions du
lot sont identiques ; les identifiants, les entrées, les champs et les statuts des 41 décisions
n'ont pas changé ; le lot cite les mêmes décisions. La réouverture de 暖かい n'est pas touchée.

| Entrée | Décision | Révision |
|---|---|---|
| 古い | D1129 (`categorie-nulle` → `decision`) | la catégorie passe de `null` à `temps`, au seul niveau 1 |
| 新しい | D1131 (`categorie-nulle` → `decision`) | la catégorie passe de `null` à `temps`, au seul niveau 1 |

**Pourquoi.** A5 ne permet `category: null` que si aucune catégorie primaire suffisamment
pertinente n'existe. Or les deux fiches décrivent une propriété directement temporelle : ce qui
« date de longtemps », ce qui est « récent ». Le domaine Temps existe et convient. Ma première
proposition les laissait sans catégorie parce que le cycle de vie du registre concerne les
personnes ; j'avais omis de regarder le temps lui-même. Aucune sous-catégorie ne nomme
l'ancienneté ni la nouveauté : le niveau 1 suffit, comme pour le sens « en retard » de 遅い.

- **Les neuf autres catégories nulles** sont inchangées, sur l'avis de la relecture.
- **Résultats** : réel inchangé, 550 / 31 / 138 ; essai à blanc 567 / 32 / 120, 0 problème, 0
  erreur, 0 attente, **75 avertissements** (9 de plus qu'avant le lot, au lieu de 11) ; 464 tests.
- **Sabotages** : 3 de plus sur les points révisés, tous attrapés, chacun vérifié comme modifiant
  réellement son fichier puis rétabli à l'octet près : 古い remise sans catégorie ; 新しい rangée dans une
  sous-catégorie que rien ne justifie ; D1131 remise en `categorie-nulle`.
- **Outil d'export** : son contrôle « le lot cite exactement ses décisions » affichait `false`, à
  tort : D1127 est citée par l'entrée rouverte du lot 07, non par une entrée du lot 17. Le contrôle
  dit maintenant que toutes les décisions du lot sont citées, et lesquelles le sont seulement par une
  entrée d'un autre lot.
