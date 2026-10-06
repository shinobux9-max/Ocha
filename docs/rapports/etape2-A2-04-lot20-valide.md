# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 20 « Existence, possession, action et déroulement » · validation

**Date** : 2026-10-06
**Nature** : validation atomique du lot 20. **Statuts seulement** : `proposed` → `validated`.
Aucun changement de contenu hors statuts.
**Autorisation** : la vérification ciblée de la révision a été rendue par ChatGPT, qui a autorisé
la validation ; l'utilisateur l'a transmise et confirmée (« La validation est autorisée »), en
précisant que le commit et le push ne le sont pas encore. **Rien n'est commité, rien n'est poussé.**

**À lire avec** : `docs/rapports/etape2-A2-04-lot20-perimetre.md` (périmètre, §7),
`docs/rapports/etape2-A2-04-lot20-proposition.md` (proposition, arbitrage des 25 choix et révision,
§9 et §10), `reconstruction/a2-04/rapports/lot-20.md` (rapport généré).

---

## 1. La bascule

| Fichier | Lignes changées | Toutes `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|
| `reconstruction/a2-04/lots/lot-20.json` | 22 | oui | oui |
| `reconstruction/a2-04/journal.json` | 68 | oui | oui |

- **22 entrées** du lot 20 et **68 décisions** (D1302 à D1369) passent en `validated`.
- Le script refuse de basculer s'il ne trouve pas exactement 22 entrées proposées dans le lot, et 68
  décisions proposées dans tout le journal, de D1302 à D1369.
- Deux comparaisons après l'écriture : ligne à ligne sur le texte, puis sur le contenu une fois le
  champ `status` retiré. Les copies d'avant la bascule sont gardées hors dépôt.
- Aucun autre fichier de lot n'est modifié ; les 1 301 décisions des lots 0 à 19 étaient déjà
  validées et ne changent pas.

## 2. Ce qui est validé

**22 entrées (les 14 derniers verbes et 8 noms), 30 sens, 68 décisions.** Huit entrées ont deux sens
(ある, 持つ, 出来る, 違う, する, やる, 所, 問題) ; quatorze en ont un seul.

- **Arbitrage du périmètre** : 他 et 大勢 hors du lot, le lot « quantité et degré » restant fermé ;
  **aucune fonction linguistique** (ni `modalite` pour 出来る, ni `aspect` pour なる, ni `deictique`
  pour 次 ; D1305, D1319, D1323, D1350) ; **aucune relation**, les candidates à l'audit de 5.16
  étant する / やる (D1332, D1336) et やる / 上げる (D1337) ; `suffix: true` pour 辺 (D1356) ; la
  graphie 掛かる pour かかる, en bloc (D1342), et aucune pour 居る (D1308) ; le tag `lieu_gare`
  refusé pour 次 (D1349).
- **Arbitrage des 25 choix** : la proposition retenue, avec sept corrections et trois dimensions.
  - « Y avoir » en traduction principale de ある (sens 1) et de 居る (D1302, D1306).
  - « Être achevé » (出来る) en `resultat` (D1316) ; le prix (する) et かかる en `propriete` (D1330,
    D1343).
  - 次 et 声 sans catégorie (D1351, D1369).
  - Trois dimensions : nécessité pour 要る (D1366), possibilité pour 出来る (D1367), inexactitude
    pour le sens 2 de 違う (D1368).
- **Types** : `etat` pour 9 sens (ある, 居る, 要る, 困る, 違う, la capacité, « posséder ») ;
  `action` pour 5 (« faire », « donner », « tenir », 見る) ; `evenement` pour 3 (なる, 始まる,
  終わる) ; `propriete` pour 3 (le prix, かかる, 力) ; `concept_abstrait` pour 4 ; `lieu` pour 2 ;
  `resultat`, `objet_artefact` et `information_contenu` pour 1 chacun ; **aucun type pour 声**
  (`type-nul`, D1365).
- **Catégories** : 20 sens sans catégorie (A5), 10 avec.
- **Lectures** : deux corrections (出来る, en bloc par nécessité, D1315 ; 初め, D1346).
- **Anomalie de la source non reprise** : l'exemple de 要る (D1314).

## 3. Assemblage réel

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la validation | 616 | 32 | 71 (49 non décidées, 22 propositions) | 0 | 0 | 0 |
| **Après la validation** | **638** | **32** | **49** | **0** | **0** | **0** |

- C'est l'état attendu par l'essai à blanc : 638 = 616 + 22.
- **Journal** : 1 369 décisions, D0001 à D1369, toutes validées ; aucune proposition en cours.
- **Avertissements** : 134, soit 21 de plus qu'avant le lot : 20 `categorie-nulle` et 1 `type-nul`,
  tous justifiés au journal.
- **Il ne reste aucun verbe à décider.** Les 49 entrées restantes : 2 noms (他, 大勢), 42 adverbes,
  conjonctions et interjections, 5 adjectifs.
- **`suffix`** : deux ENTRY le portent dans tout le corpus, 半 et 辺.

## 4. Tests et contrôles

- **Tests** : 470 réussis, 0 échec.
- **Tests d'état adaptés** : le lot 20 est affirmé entièrement validé, journal compris ; l'espace de
  travail réel attend 638 ENTRY, 32 retraits, 49 entrées écartées, 21 fichiers de lot, 134
  avertissements, aucune proposition ; le journal, 1 369 décisions toutes validées, les 68 dernières
  étant celles du lot 20 ; les contrôles des lots 17, 18 et 19 dans l'assemblage réel suivent les
  nouveaux comptes.
- **L'essai à blanc en mémoire est devenu le contrôle du lot dans l'assemblage réel** : mêmes
  assertions (classes, lectures, graphie, particules, homophones 居る et 要る, `suffix`, aucun verbe
  restant), sans bascule en mémoire.
- **Sabotages** : 55 rejoués sur l'état validé, tous attrapés, chacun vérifié comme modifiant
  réellement son fichier, puis rétabli à l'octet près (empreintes contrôlées). Parmi eux : entrée ou
  décision du lot remise en `proposed` ; décision d'un lot clos rouverte ; fonction `modalite`,
  `aspect` ou `deictique` posée ; relation posée ; 上げる rouverte ; `suffix` retiré ou posé
  ailleurs ; tag remis ; graphie いる ajoutée ; furigana segmentés ; 大勢 ou 他 ajoutée au lot ;
  traductions principales, types ou catégories remis à leur état d'avant la révision ; dimension
  retirée, inversée, posée sur le mauvais sens, ou d'identifiant inventé ; D1351 remise en
  `decision` ; D1369 non citée.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 5. Ce qui reste ouvert

- **Les 49 entrées restantes** dépendent pour une bonne part de questions normatives : le lot
  « quantité et degré » (fonctions `quantificateur`, `comparatif`, `intensifieur`, sans
  définition) ; les mots de liaison et de discours (fonctions `connecteur`, `discours`,
  `politesse`, `alternative`, sans définition) ; 早い, 弱く, 同じ, いろいろ.
- **Passe finale, avant publication** : la forme usuelle de 居る, avec 煙草 et les furigana de 頼む.
- **Audit des relations de 5.16** : する / やる, やる / 上げる, avec les candidates des lots 18
  et 19.
- **Audit A2-05** : les 20 catégories nulles du lot ; l'absence de type pour un son (声).
- **Registre de phrases** : les anciens exemples de 辺, qui lisent ce mot あたり.
- **Hors lexique** : le push de la branche, jamais fait.

## 6. Suite

1. Contrôle du diff de validation.
2. **Commit**, sur un accord explicite ; `git diff --stat` et la liste exacte des fichiers seront
   montrés avant.
3. **Push** : sur un accord explicite et distinct.
4. Lot 21 : thème et périmètre, sur demande explicite ; aucune décision lexicale avant l'arbitrage
   du périmètre.
