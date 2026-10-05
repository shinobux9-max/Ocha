# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 17 « États et propriétés descriptives » · validation

**Date** : 2026-10-06
**Nature** : validation atomique du lot 17 et de l'entrée rouverte du lot 07, sur l'arbitrage et
l'autorisation explicites de l'utilisateur : les quatorze choix du §5 de la proposition révisée sont
retenus. L'autorisation vaut validation seulement ; rien n'est committé ni poussé.

**À lire avec** : `docs/rapports/etape2-A2-04-lot17-proposition.md` (la proposition, sa révision,
les alternatives écartées), `docs/rapports/etape2-A2-04-lot17-perimetre.md` (périmètre, issue C) et
`reconstruction/a2-04/rapports/lot-17.md` (rapport généré).

---

## 1. La bascule

**Statuts seulement** : `proposed` → `validated`.

Contrôle d'identité, fait sur les fichiers relus depuis le disque, contre des copies prises juste
avant la bascule : comparaison ligne à ligne du texte, et du contenu une fois le champ `status`
retiré.

| Fichier | Lignes changées | Toutes sont des statuts | Contenu identique hors statut |
|---|---|---|---|
| `lots/lot-17.json` | 17 | oui | oui |
| `lots/lot-07.json` | 1 (`n5_v_275`, 暖かい) | oui | oui |
| `journal.json` | 41 (D1127 à D1167) | oui | oui |

- Aucune valeur, aucune raison n'a été modifiée lors de la bascule.
- Les 1 126 décisions des lots 0 à 16 ne sont pas touchées ; D0476 et D0477 sont intactes (un test
  vérifie l'empreinte de leur contenu entier).
- Le journal entier est validé : 1 167 décisions, D0001 à D1167, sans trou. Aucune proposition
  n'est en cours.

## 2. Les choix arbitrés

1. **温かい** en forme usuelle, 暖かい en autre graphie.
2. **温かい à deux sens**, un par fiche.
3. **« Chaud »** en tête du sens 1 de 温かい.
4. **Deux sens** pour 丈夫, 汚い, 清い, うるさい, 爽やか et 暗い.
5. **Deux sens pour 遅い** : « lent » et « en retard ».
6. **Un seul sens pour 強い et 弱い**, l'intensité conservée en nuance.
7. **Un seul sens pour 若い**, dans être humain › cycle de vie.
8. **丈夫, sens 2** : santé › santé et états pathologiques, type `propriete`.
9. **遅い, sens 2** : `temps`, au niveau 1.
10. **静か et 賑やか** sans catégorie ; **うるさい, sens 1**, dans l'ouïe.
11. **« Bruyant » abandonné** pour 賑やか.
12. **Neuf catégories nulles** ; **古い et 新しい** dans `temps`, au niveau 1.
13. **Traductions non développées** conservées en nuance.
14. **Nuances rédigées** telles que proposées, exemples compris.

**Ce ne sont pas des règles générales.** Chaque sens suit sa fiche, exemple compris ; aucune
symétrie n'est imposée entre deux entrées.

## 3. La fusion de 暖かい dans 温かい, validée

- `n5_v_275` (暖かい), validée au lot 07 puis rouverte, est définitivement **retirée par fusion**
  dans `n5_v_8` (温かい). Le lot 07 garde 33 ENTRY et un retrait.
- **D1127** (réouverture) garde en entier l'état validé de l'ENTRY ; **D1128** porte la fusion.
  Aucune `exception-fusion` : le plus petit numéro survit (A3, L2).
- **D0476 et D0477** restent au journal, validées, non modifiées, citées par l'entrée retirée.
- Dans l'assemblage réel : `v_275` n'existe plus ; elle figure parmi les identifiants retirés, vers
  `v_8`, et ne sera jamais réattribuée. `v_8` porte la forme 温かい, la graphie 暖かい, la lecture
  あたたかい et deux sens. Une seule ENTRY porte ces deux graphies.

## 4. Assemblage réel

`node tools/reconstruction/run.mjs assemble`, sortie sans erreur :

| ENTRY | Retraits | Écartées | Problèmes de décision | Erreurs lexicales | Attente |
|---|---|---|---|---|---|
| **567** | **32** | **120** | 0 | 0 | 0 |

- 567 = 551 + 17 − 1. Les 120 entrées écartées sont toutes « non décidées ».
- **Avertissements** : 75, soit 9 de plus qu'avant le lot, tous des `categorie-nulle` justifiées au
  journal.
- **Le lot** : 17 entrées, 25 sens (8 entrées à deux sens) ; aucun ajout, aucun tag, aucune lecture
  ni forme décidée, aucune particule, aucune relation, aucune dimension, aucune fonction.

## 5. Tests et contrôles

- **Tests** : 464 réussis, 0 échec, 0 sauté. Le compte ne change pas à la validation : l'essai à
  blanc en mémoire n'est pas retiré, il est **transformé** en contrôle de la fusion dans
  l'assemblage réel (`v_275` absente, retirée vers `v_8`, une seule ENTRY pour les deux graphies).
  Les tests d'état du lot 07, du lot 17, de l'espace de travail réel (567 / 32 / 120, 75
  avertissements, aucune proposition en cours) et du journal (D0001 à D1167) sont adaptés.
- **Sabotages** : 19 sur 19 attrapés, chacun vérifié comme modifiant réellement son fichier, puis
  rétabli à l'octet près : une entrée ou une décision remise en `proposed` (lot 17, lot 07,
  journal) ; D0476 ou D0477 modifiée en silence ; 暖かい redevenue une ENTRY gardée ; la fusion vers
  une autre entrée ; l'état validé perdu dans la réouverture ; la graphie 暖かい retirée ; « Chaud »
  remis dans le sens météorologique ; le sens de la fiche de 温かい perdu ; une `exception-fusion`
  ajoutée ; 古い remise sans catégorie ; une catégorie nulle sans justification ; un sens retiré ou
  ajouté ; l'exemple fautif de 静か repris ; une décision supprimée ; une décision d'un lot clos
  rouverte.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste ; `node --check` sur les fichiers JS modifiés.

## 6. Ce qui reste ouvert

- **Contrôle d'identité absent du validateur** : il ne signale pas qu'une graphie d'une ENTRY est
  aussi la forme d'une autre. D'autres paires comme 温かい et 暖かい peuvent exister ; à chercher par
  script avant la passe finale (5.16).
- **Neuf catégories nulles** du lot, à recouper à l'audit A2-05.
- **Hors du lot, toujours non décidés** : 早い (réservée depuis le lot 13), 弱く (forme de 弱い,
  identité à décider), 多い et 少ない (lot « quantité et degré »), 同じ et いろいろ.
- **L'exemple fautif de 静か** (としばこ), à corriger dans le registre de phrases.

## 7. Suite

Choix du thème du lot 18 parmi les 120 entrées restantes, puis composition de son périmètre par
identifiants. Aucune décision avant la validation d'un périmètre.
