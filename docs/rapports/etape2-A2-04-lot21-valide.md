# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 21 « Fréquence, répétition et repères temporels » · validation

**Date** : 2026-10-06
**Nature** : validation atomique du lot 21. **Statuts seulement** : `proposed` → `validated`.
Aucun changement de contenu hors statuts.
**Autorisation** : après la vérification ciblée de la révision, favorable, ChatGPT a autorisé la
validation, par délégation ; l'utilisateur l'a transmise (« J'autorise la validation atomique du lot
21 »), en précisant que le commit et le push ne sont pas autorisés. **Rien n'est committé, rien
n'est poussé.**

**À lire avec** : `docs/rapports/etape2-A2-04-lot21-perimetre.md` (périmètre, §9),
`docs/rapports/etape2-A2-04-lot21-proposition.md` (proposition, arbitrage des 21 choix et révision,
§9 et §10), `reconstruction/a2-04/rapports/lot-21.md` (rapport généré).

---

## 1. La bascule

| Fichier | Lignes changées | Toutes `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|
| `reconstruction/a2-04/lots/lot-21.json` | 12 | oui | oui |
| `reconstruction/a2-04/journal.json` | 34 | oui | oui |

- **12 entrées** du lot 21 et **34 décisions** (D1370 à D1403) passent en `validated`.
- Le script refuse de basculer s'il ne trouve pas exactement 12 entrées proposées dans le lot, et
  34 décisions proposées du lot 21, de D1370 à D1403.
- Deux comparaisons après l'écriture : ligne à ligne sur le texte (même nombre de lignes, seules les
  46 lignes de statut diffèrent), puis sur le contenu une fois le champ `status` retiré. Les copies
  d'avant la bascule sont gardées hors dépôt.
- Aucun autre fichier de lot n'est modifié ; les 1 369 décisions des lots 0 à 20 étaient déjà
  validées et sont identiques.

## 2. Ce qui est validé

**12 entrées (11 adverbes, 1 adjectif), 16 sens, 34 décisions.** Quatre entrées ont deux sens (よく,
また, まだ, もう) ; huit en ont un seul.

- **Arbitrage du périmètre** : aucune fonction linguistique sans définition normative ; **aucune
  entrée ne porte `deictique`**, すぐに compris (D1392 : absence de délai par rapport à un repère,
  contrairement à 近々) ; six décisions disent qu'aucune fonction n'est posée (D1381, D1387, D1390,
  D1392, D1397, D1400) ; **よく reste distincte de いい**, sans fusion ni réouverture de `v_420`
  (D1373) ; **aucune relation**, aucune candidate à 5.16.
- **Arbitrage des 21 choix** : la proposition retenue, avec trois corrections appliquées à la
  révision :
  - よく, sens 2 : la remarque « issu de ii / yoi » conservée en nuance, attribuée à la fiche
    (D1375) ;
  - また, sens 2 « Aussi / De plus » : sans type (D1403, A6), sans catégorie (D1380), sans fonction
    (D1381) ;
  - D1378 : la prise de congé conservée en nuance, sans `discours` ni `politesse`.
- **Types** : `concept_abstrait` pour 13 sens ; `propriete` pour 2 (よく « Bien », 早い) ; **aucun
  type pour また, sens 2** (`type-nul`, D1403).
- **Catégories** : `temps › fréquence` (いつも, たいてい, よく 1, 時々), `temps › relations
  temporelles` (まだ, もう, すぐに), `temps › chronologie › succession` (初めて), `temps` (早い) ;
  5 sens sans catégorie (A5 : よく 2, また 1 et 2, もう一度, だんだん).
- **Lecture** : une correction, もう一度, avec les furigana de l'exemple de sa fiche (D1383).
- **Aucune** dimension, relation, fonction, graphie, tag, forme ni classe décidée.

## 3. Assemblage réel

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la validation | 638 | 32 | 49 (37 non décidées, 12 propositions) | 0 | 0 | 0 |
| **Après la validation** | **650** | **32** | **37** | **0** | **0** | **0** |

- C'est l'état attendu par l'essai à blanc : 650 = 638 + 12.
- **Journal** : 1 403 décisions, D0001 à D1403, toutes validées ; aucune proposition en cours.
- **Avertissements** : 140, soit 6 de plus qu'avant le lot : 5 `categorie-nulle` et 1 `type-nul`,
  tous justifiés au journal.
- **Les 37 entrées restantes** : 2 noms (他, 大勢), 31 adverbes, conjonctions et interjections, 4
  adjectifs (多い, 少ない, 同じ, いろいろ).

## 4. Tests et contrôles

- **Tests** : 472 réussis, 0 échec.
- **Tests d'état adaptés** : le lot 21 est affirmé entièrement validé, journal compris ; l'espace de
  travail réel attend 650 ENTRY, 32 retraits, 37 entrées écartées, toutes non décidées, 22 fichiers
  de lot, 140 avertissements, aucune proposition ; le journal, 1 403 décisions toutes validées, les
  34 dernières étant celles du lot 21 ; les contrôles des lots 17 à 20 dans l'assemblage réel suivent
  les nouveaux comptes.
- **L'essai à blanc en mémoire est devenu le contrôle du lot dans l'assemblage réel**, sans bascule
  en mémoire : mêmes assertions (classes, avertissements du lot, particule de すぐに, lecture de
  もう一度, よく et いい distinctes).
- **Sabotages** : 42 rejoués sur l'état validé, tous attrapés, chacun vérifié comme modifiant
  réellement son fichier, puis rétabli à l'octet près (empreintes contrôlées). Parmi eux : une entrée,
  une décision, D1403 ou le lot entier remis en `proposed` ; `deictique`, `aspect`, `connecteur` ou
  `discours` posée ; relation ou dimension posée ; いい rouverte ; よく réduite à un sens ; remarque
  ii / yoi retirée, déplacée ou non attribuée à la fiche ; また, sens 2, retypé ; furigana de
  もう一度 remis à la source ou mis en bloc ; décision supprimée ; décision d'un lot clos modifiée.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 5. Ce qui reste ouvert

- **Les 37 entrées restantes** dépendent pour une bonne part de questions normatives : le lot
  « quantité et degré » (fonctions `quantificateur`, `comparatif`, `intensifieur`) ; les mots de
  liaison et les réponses (`connecteur`, `discours`, `politesse`) ; la classe de など ; l'identité
  de 弱く et de ゆっくりと (rapport de périmètre du lot 21, §4 et §6).
- **Passe finale 5.16** : la particule に de すぐに, reprise mécaniquement de la fiche alors qu'elle
  fait partie de la forme ; avec les furigana de 頼む et les formes de 煙草 et 居る.
- **Registre de phrases** : les exemples altérés de たいてい, すぐに et また.
- **Audit A2-05** : les 5 catégories nulles et le type nul du lot.

## 6. Suite

1. Contrôle du diff de validation.
2. **Commit**, sur un accord explicite ; `git diff --stat` et la liste exacte des fichiers sont
   montrés avant.
3. **Push** : sur un accord explicite et distinct.
4. Lot 22 : rien n'est préparé ; thème et périmètre sur demande explicite seulement.
