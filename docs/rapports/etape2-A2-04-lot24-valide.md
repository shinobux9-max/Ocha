# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 24 « Quantité, degré et comparaison » · validation

**Date** : 2026-10-06
**Nature** : validation atomique du lot 24. **Statuts seulement** : `proposed` → `validated`.
Aucun changement de contenu hors statuts.
**Autorisation** : après l'arbitrage des 14 choix et la révision, ChatGPT a autorisé la validation,
par délégation ; l'utilisateur l'a transmise (« J'autorise la validation atomique du lot 24 »), en
précisant que le commit et le push ne sont pas autorisés. **Ensuite, sur deux accords explicites et
distincts : committé (`affa45e`) et poussé.** Lot 24 clos.

**À lire avec** : `docs/rapports/etape2-A2-04-lot24-perimetre.md` (périmètre, §9),
`docs/rapports/etape2-A2-04-lot24-proposition.md` (proposition, arbitrage des 14 choix et révision,
§9 et §10), `reconstruction/a2-04/rapports/lot-24.md` (rapport généré), l'addendum A9.

---

## 1. La bascule

| Fichier | Lignes changées | Toutes `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|
| `reconstruction/a2-04/lots/lot-24.json` | 14 | oui | oui |
| `reconstruction/a2-04/journal.json` | 59 | oui | oui |

- **14 entrées** du lot 24 et **59 décisions** (D1510 à D1568) passent en `validated`.
- Le script refuse de basculer s'il ne trouve pas exactement 14 entrées proposées dans le lot, et 59
  décisions proposées du lot 24, de D1510 à D1568.
- Deux comparaisons après l'écriture : ligne à ligne sur le texte (même nombre de lignes, seules les
  73 lignes de statut diffèrent), puis sur le contenu une fois le champ `status` retiré. Les copies
  d'avant la bascule sont gardées hors dépôt.
- Aucun autre fichier de lot n'est modifié. Les 1 509 décisions des lots 0 à 23 étaient déjà
  validées ; elles sont identiques, et leur empreinte est contrôlée par un test.

## 2. Ce qui est validé

**14 entrées, 20 sens, 59 décisions**, sans fusion ni réouverture.

- **Arbitrage du périmètre** : un seul lot de 14 entrées ; など hors du périmètre ; aucune fonction
  pour un prédicat de quantité (多い, 少ない, 大勢).
- **Arbitrage des 14 choix**, avec quatre corrections appliquées à la révision : 全部 en `adverbe`,
  大勢 en `groupe_collectif`, 大体 (sens 1) sur l'axe d'imprécision (D1568), et les traductions.
- **Classes** : 1 `adjectif_i` décidée (多い) ; 3 `adverbe` décidés (たくさん, 全部, 一番) ; 10 classes
  mécaniques.
- **Fonctions d'A9**, appliquées sens par sens : `quantificateur` 4, `intensifieur` 5, `comparatif`
  2, `politesse` 1 (結構, « Non merci ») ; un cumul `comparatif` + `intensifieur` (もっと).
- **Catégories et types** : 8 catégories nulles, dont une seule (ちょうど) demande une décision
  `categorie-nulle` (A5) ; pour les sept autres, la fonction justifie l'absence. 11 types nuls,
  chacun justifié (A6).
- **Relations** : aucune ; les paires candidates (多い / 少ない, entre autres) sont inscrites pour la
  passe finale 5.16.

## 3. Assemblage réel

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente | Avertissements |
|---|---|---|---|---|---|---|---|
| Avant la validation | 670 | 34 | 15 (1 non décidée, 14 propositions) | 0 | 0 | 0 | 147 |
| **Après la validation** | **684** | **34** | **1** (など, non décidée) | **0** | **0** | **0** | **148** |

- C'est l'état attendu par l'essai à blanc : 684 = 670 + 14.
- **Journal** : 1 568 décisions, D0001 à D1568, toutes validées ; aucune proposition en cours.
- **Avertissements** : le 148e est la catégorie nulle de ちょうど, justifiée par sa décision
  `categorie-nulle`.
- **La seule entrée restante** : など, réservée à son préalable de classe.

## 4. Tests et contrôles

- **Tests** : 479 réussis, 0 échec.
- **Tests d'état adaptés** : le lot 24 est affirmé entièrement validé, journal compris. L'espace de
  travail réel attend 684 ENTRY, 34 retraits, une entrée écartée (など, non décidée), 25 fichiers de
  lot, 148 avertissements et aucune proposition. Le journal compte 1 568 décisions, toutes validées,
  dont les 59 dernières sont celles du lot 24. L'empreinte couvre D0001 à D1568.
- **L'essai à blanc en mémoire est devenu le contrôle du lot dans l'assemblage réel**, avec les mêmes
  assertions et sans bascule en mémoire.
- **Sabotages**, rejoués avec le harnais corrigé (`tests/reconstruction/*.test.js`, témoin sain
  vérifié d'abord : 85 réussis, 0 échec). Chaque sabotage est vérifié comme modifiant réellement son
  fichier, puis le fichier est rétabli à l'octet près, empreintes contrôlées.
  - Lot 24 : **51/51 attrapés**. Parmi eux : une entrée, le lot entier, une décision ou D1568 remis en
    `proposed` ; une décision du lot retouchée en silence ; les classes, les fonctions, les
    catégories, les types et les traductions arbitrés.
  - Lot 23 : **40/40 attrapés**.
  - Lot 22 : **49/49 attrapés**.
- `check-layers` : aucune violation. `validate-data` : 0 erreur, 8 avertissements connus. Les sources
  sont conformes au manifeste. `git diff --check` : propre.

## 5. Ce qui reste ouvert

- **Le préalable sur la classe de など**, dernière entrée du vocabulaire N5 (arbitrage du préalable
  normatif, Q10).
- **Passe finale 5.16** : les relations candidates des lots 18 à 24.
- **Audit A2-05** : les catégories nulles et les points inscrits aux lots précédents.

## 6. Suite

1. Contrôle du diff de validation.
2. **Commit**, sur un accord explicite. `git diff --stat` et la liste exacte des fichiers sont
   montrés avant.
3. **Push**, sur un accord explicite et distinct.
4. Ensuite seulement, sur demande : le préalable sur la classe de など.
