# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 19 « Vie quotidienne, travail et échanges » · validation

**Date** : 2026-10-06
**Nature** : validation atomique du lot 19. **Statuts seulement** : `proposed` → `validated`.
Aucune modification de sens, de catégorie, de type, de nuance, de graphie, de lecture, de
particule, de relation ni de raison de journal.
**Autorisation** : donnée explicitement par ChatGPT (« J'autorise la validation »), par délégation
de l'utilisateur (`CLAUDE.md`, §5, « Contrôle »). Le même message dit ne pas autoriser encore le
commit ni le push : **rien n'est commité, rien n'est poussé.**

**À lire avec** : `docs/rapports/etape2-A2-04-lot19-perimetre.md` (périmètre, §7),
`docs/rapports/etape2-A2-04-lot19-proposition.md` (proposition, arbitrage des 22 choix et révision,
§8 et §9), `reconstruction/a2-04/rapports/lot-19.md` (rapport généré).

---

## 1. La bascule

| Fichier | Lignes changées | Toutes `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|
| `reconstruction/a2-04/lots/lot-19.json` | 26 | oui | oui |
| `reconstruction/a2-04/journal.json` | 61 | oui | oui |

- **26 entrées** du lot 19 et **61 décisions** (D1241 à D1301) passent en `validated`.
- Le script refuse de basculer s'il ne trouve pas exactement 26 entrées proposées dans le lot, et 61
  décisions proposées dans tout le journal, de D1241 à D1301.
- Deux comparaisons après l'écriture : ligne à ligne sur le texte, puis sur le contenu une fois le
  champ `status` retiré. Les copies d'avant la bascule sont gardées hors dépôt.
- Aucun autre fichier de lot n'est modifié ; les 1 240 décisions des lots 0 à 18 étaient déjà
  validées et ne changent pas.

## 2. Ce qui est validé

**26 entrées (20 verbes, 6 noms), 34 sens, 61 décisions.** Huit entrées ont deux sens (起きる, 寝る,
休む, 上げる, 渡す, 頼む, 吸う, 煙草) ; dix-huit en ont un seul.

- **Arbitrage du périmètre** : aucune relation (`relations: []` pour les 34 sens) ; candidates à
  l'audit de 5.16 : 貸す / 借りる pour `reciprocal_with` (D1265, D1268), 渡す / 渡る pour l'examen
  `transitive_of` / `intransitive_of` (D1275 ; 渡る, lot 04, n'est pas modifiée). 頼む garde sa
  lecture mécanique, aucune règle n'est modifiée, et son anomalie de furigana est inscrite pour la
  passe finale (D1278). コピーする reste une ENTRY de verbe (D1259). `suru_compatible` : `true`
  pour 結婚 et 生活, `false` pour 仕事. L'état résultant est en nuance pour 立つ, 座る et 疲れる.
- **Arbitrage des 22 choix** : dix-huit retenus tels que proposés, quatre révisés.
  - 寝る : « Dormir » en `etat`, « Se coucher » en `action` (D1243).
  - 疲れる : `processus` (D1250).
  - 死ぬ : sans catégorie, sa fiche portant aussi sur un animal (D1299).
  - 煙草 : deux sens, « Cigarette » (`objet_artefact`) et « Tabac » (`substance_matiere`), sans
    catégorie (D1300, D1301).
- **Types** : `evenement` pour le réveil (起きる), 結婚, 生まれる et 死ぬ ; `etat` pour « Dormir » ;
  `processus` pour 疲れる ; `organisation` pour 会社 ; `concept_abstrait` pour 生活 ;
  `objet_artefact` pour la cigarette et 灰皿 ; `substance_matiere` pour le tabac ; `action` pour les
  23 autres sens.
- **Catégories** : 15 sens sans catégorie (A5), 19 avec.
- **Lectures** : deux corrections (借りる, D1266 ; 待つ, D1280).
- **Graphie** : たばこ pour 煙草 (D1294).
- **Anomalie de la source non reprise** : l'exemple de コピーする (D1262).

## 3. Assemblage réel

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la validation | 590 | 32 | 97 (71 non décidées, 26 propositions) | 0 | 0 | 0 |
| **Après la validation** | **616** | **32** | **71** | **0** | **0** | **0** |

- C'est l'état attendu par l'essai à blanc : 616 = 590 + 26.
- **Journal** : 1 301 décisions, D0001 à D1301, toutes validées ; aucune proposition en cours.
- **Avertissements** : 113, soit 15 de plus qu'avant le lot, tous des `categorie-nulle` justifiées
  au journal.
- Les 71 entrées restantes : 14 verbes, 10 noms, 42 adverbes et mots de liaison, 5 adjectifs.

## 4. Tests et contrôles

- **Tests** : 468 réussis, 0 échec.
- **Tests d'état adaptés** : le lot 19 est affirmé entièrement validé, journal compris ; l'espace de
  travail réel attend 616 ENTRY, 32 retraits, 71 entrées écartées, 20 fichiers de lot, 113
  avertissements, aucune proposition ; le journal, 1 301 décisions toutes validées, les 61 dernières
  étant celles du lot 19 ; les contrôles des lots 17 et 18 dans l'assemblage réel suivent les
  nouveaux comptes.
- **L'essai à blanc en mémoire est devenu le contrôle du lot dans l'assemblage réel** : mêmes
  assertions (classes, lectures, particules, コピーする, 煙草, voisins distincts), sans bascule en
  mémoire.
- **Sabotages** : 43 rejoués sur l'état validé, tous attrapés, chacun vérifié comme modifiant
  réellement son fichier, puis rétabli à l'octet près (empreintes contrôlées). Parmi eux : entrée ou
  décision du lot remise en `proposed` ; décision d'un lot clos rouverte ; relation posée ;
  candidate à 5.16 effacée ; 渡る rouverte ; lecture de 頼む décidée, ou son anomalie retirée du
  journal ; コピーする changée en nom ; `suru_compatible` inversé ; « Dormir » remis en `action` ;
  疲れる remise en `evenement` ; 死ぬ remise dans le cycle de vie ; 煙草 remise en un seul sens ;
  D1299 non citée ou changée de nature.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 5. Ce qui reste ouvert

- **Passe finale, avant publication** : les furigana de 頼む (たノ, que le validateur accepte) ; la
  forme usuelle et le découpage des furigana de 煙草.
- **Audit des relations de 5.16** : 貸す / 借りる, 渡す / 渡る, avec les quatre paires du lot 18 ;
  aucun sens du corpus ne porte encore de relation.
- **Audit A2-05** : les 15 catégories nulles du lot, dont les postures du corps (座る, 立つ), qu'aucune
  catégorie du registre ne nomme, et la mort (死ぬ).
- **休む** : la particule に, que la fiche donne sans l'illustrer, n'est rattachée à aucun sens.
- **Hors lexique** : le push de la branche, jamais fait.

## 6. Suite

1. Contrôle du diff de validation.
2. **Commit**, sur un accord explicite ; `git diff --stat` et la liste exacte des fichiers seront
   montrés avant.
3. **Push** : sur un accord explicite et distinct.
4. Lot 20 : thème et périmètre, sur demande explicite ; aucune décision lexicale avant l'arbitrage
   du périmètre.
