# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 18 « Actions sur les objets » · validation

**Date** : 2026-10-06
**Nature** : validation atomique du lot 18. **Statuts seulement** : `proposed` → `validated`.
Aucun changement lexical, aucune réécriture d'une décision ou d'un champ.
**Autorisation** : donnée par ChatGPT (« J'autorise la validation »), qui a aussi dit ne pas
autoriser encore le commit ni le push ; **confirmée par l'utilisateur dans la session**, avec la
délégation qui la fonde (§2). **Rien n'est commité, rien n'est poussé.**

**À lire avec** : `docs/rapports/etape2-A2-04-lot18-perimetre.md` (périmètre, §8),
`docs/rapports/etape2-A2-04-lot18-proposition.md` (proposition, arbitrage des vingt choix et
révision, §8 et §9), `reconstruction/a2-04/rapports/lot-18.md` (rapport généré).

---

## 1. La bascule

| Fichier | Lignes changées | Toutes `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|
| `reconstruction/a2-04/lots/lot-18.json` | 23 | oui | oui |
| `reconstruction/a2-04/journal.json` | 73 | oui | oui |

- **23 entrées** du lot 18 et **73 décisions** (D1168 à D1240) passent en `validated`.
- Le script refuse de basculer s'il ne trouve pas exactement 23 entrées proposées dans le lot, et 73
  décisions proposées dans tout le journal, de D1168 à D1240.
- Deux comparaisons après l'écriture : ligne à ligne sur le texte, puis sur le contenu une fois le
  champ `status` retiré. Les copies d'avant la bascule sont gardées hors dépôt.
- Aucun autre fichier de lot n'est modifié ; les 1 167 décisions des lots 0 à 17 étaient déjà
  validées et ne changent pas.

## 2. Qui a décidé, et la délégation

Le relais qui autorisait la validation annonçait aussi que l'utilisateur avait délégué à ChatGPT
les arbitrages et les accords de validation, de commit et de push. Les règles du dépôt disaient
alors que l'avis du relecteur ne vaut aucun de ces accords : **Claude Code n'a rien validé sur cette
seule annonce** et a demandé confirmation à l'utilisateur. Ses trois réponses :

1. **La validation du lot 18 est autorisée.**
2. **La délégation est complète** : ChatGPT donne les arbitrages et les accords de validation, de
   commit et de push. Les trois accords restent distincts ; chacun est donné explicitement, dans un
   message que l'utilisateur relaie lui-même ; un avis favorable n'en vaut aucun. L'utilisateur
   garde le dernier mot, et la délégation ne se modifie que sur sa parole.
3. **Les deux arbitrages du lot 18** (périmètre, vingt choix), d'abord inscrits comme « arbitrés par
   l'utilisateur », **étaient ceux de ChatGPT ; l'utilisateur les approuve.** L'attribution est
   corrigée dans les deux rapports, la note de relais et `ETAT-ACTUEL.md`.

La règle est inscrite dans `CLAUDE.md` (§1, §3, §5 « Contrôle », §6), dans
`docs/relecture/note-relais.md` (§1 et §2) et dans `ETAT-ACTUEL.md` (points ouverts).

## 3. Ce qui est validé

**23 verbes, 34 sens, 73 décisions.** Dix entrées ont plusieurs sens (neuf en ont deux, 出す en a
trois) ; treize en ont un seul.

- **Arbitrage du périmètre** : aucune relation (`relations: []` pour les 34 sens) ; les quatre
  paires transitif / intransitif sont candidates à l'audit de 5.16, une décision par membre (D1171
  et D1175, D1179 et D1183, D1187 et D1192, D1228 et D1231) ; « prendre une photo » (取る, D1201) et
  « jouer d'un instrument » (引く, D1210) sont des confusions de la source, écartées, avec un renvoi
  en nuance vers 撮る et 弾く.
- **Arbitrage des vingt choix** : dix-sept retenus tels que proposés, trois révisés.
  - 開く et 閉まる : un seul sens `evenement` ; « être ouvert » et « être fermé » en nuance (« Désigne
    aussi l'état qui en résulte »), ni autre traduction ni second sens (D1168, D1177).
  - 締める : « Serrer » en traduction principale (D1240).
  - « hiraku » n'est pas repris dans la nuance de 開く (D1170) ; « kawaru » reste dans celle de 変える
    (D1233).
- **Types** : `evenement` pour 開く, 閉まる et les deux sens de 消える ; `etat` pour « être aligné » de
  並ぶ ; `action` pour les 29 autres sens.
- **Catégories** : 23 sens sans catégorie (A5), 11 avec.
- **Particules** : décidées pour les seules entrées à plusieurs sens, toutes prises dans la fiche ;
  aucune n'est tirée d'un exemple.
- **Lectures** : deux corrections (閉まる, D1176 ; 作る, D1234).
- **Anomalies de la source non reprises** : le texte parasite de l'exemple de 閉める (D1182), le
  mauvais kanji de la nuance de 締める (D1215).

## 4. Assemblage réel

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la validation | 567 | 32 | 120 (97 non décidées, 23 propositions) | 0 | 0 | 0 |
| **Après la validation** | **590** | **32** | **97** | **0** | **0** | **0** |

- C'est l'état attendu par l'essai à blanc : 590 = 567 + 23.
- **Journal** : 1 240 décisions, D0001 à D1240, toutes validées ; aucune proposition en cours.
- **Avertissements** : 98, soit 23 de plus qu'avant le lot, tous des `categorie-nulle` justifiées
  au journal.
- Les 97 entrées restantes : 34 verbes, 42 adverbes et mots de liaison, 16 noms, 5 adjectifs.

## 5. Tests et contrôles

- **Tests** : 466 réussis, 0 échec.
- **Tests d'état adaptés** : le lot 18 est affirmé entièrement validé, journal compris ; l'espace de
  travail réel attend 590 ENTRY, 32 retraits, 97 entrées écartées, 19 fichiers de lot, 98
  avertissements, aucune proposition ; le journal, 1 240 décisions toutes validées, les 73 dernières
  étant celles du lot 18 ; le contrôle du lot 17 dans l'assemblage réel suit les nouveaux comptes.
- **L'essai à blanc en mémoire est devenu le contrôle du lot dans l'assemblage réel** : mêmes
  assertions (23 verbes sans relation, deux lectures, particules, homophones distincts), sans
  bascule en mémoire.
- **Sabotages** : 36 rejoués sur l'état validé, tous attrapés, chacun vérifié comme modifiant
  réellement son fichier, puis rétabli à l'octet près (empreintes contrôlées). Parmi eux : entrée ou
  décision du lot remise en `proposed` ; décision d'un lot clos rouverte ; relation posée ; sens
  photographique ou musical recréé ; état résultant remis parmi les traductions, ou second sens
  `etat` créé ; « hiraku » remis en nuance ; « Attacher » remis en tête ; D1240 non citée, changée
  de nature ou supprimée.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 6. Ce qui reste ouvert

- **Audit des relations de 5.16** : les quatre paires candidates du lot ; aucun sens du corpus ne
  porte encore de relation.
- **Audit A2-05** : les 23 catégories nulles du lot, avec celles des lots précédents.
- **Le validateur** ne contrôle toujours pas qu'une graphie d'une ENTRY n'est pas la forme d'une
  autre ; les homophones du lot (取る et 撮る, 引く et 弾く, 閉める et 締める) sont contrôlés par un
  test, non par une règle.
- **Hors lexique** : le push de la branche, jamais fait.

## 7. Suite

1. Contrôle du diff de validation.
2. **Commit**, sur un accord explicite ; `git diff --stat` et la liste exacte des fichiers seront
   montrés avant.
3. **Push** : sur un accord explicite et distinct.
4. Lot 19 : thème et périmètre, sur demande explicite ; aucune décision lexicale avant l'arbitrage
   du périmètre.
