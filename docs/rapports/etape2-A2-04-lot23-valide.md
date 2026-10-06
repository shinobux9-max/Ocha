# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 23 « Liaison, échange et formules sociales » · validation

**Date** : 2026-10-06
**Nature** : validation atomique du lot 23. **Statuts seulement** : `proposed` → `validated`.
Aucun changement de contenu hors statuts.
**Autorisation** : après la vérification ciblée de la révision, favorable, ChatGPT a autorisé la
validation, par délégation ; l'utilisateur l'a transmise (« J'autorise la validation atomique du lot
23 »), en précisant que le commit et le push ne sont pas autorisés. **Rien n'est committé, rien
n'est poussé.**

**À lire avec** : `docs/rapports/etape2-A2-04-lot23-perimetre.md` (périmètre, §9),
`docs/rapports/etape2-A2-04-lot23-proposition.md` (proposition, arbitrage des 18 choix et révision,
§9 et §10), `reconstruction/a2-04/rapports/lot-23.md` (rapport généré), l'addendum A9.

---

## 1. La bascule

| Fichier | Lignes changées | Toutes `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|
| `reconstruction/a2-04/lots/lot-23.json` | 13 | oui | oui |
| `reconstruction/a2-04/journal.json` | 74 | oui | oui |

- **13 entrées** du lot 23 et **74 décisions** (D1436 à D1509) passent en `validated`.
- Le script refuse de basculer s'il ne trouve pas exactement 13 entrées proposées dans le lot, et 74
  décisions proposées du lot 23, de D1436 à D1509.
- Deux comparaisons après l'écriture : ligne à ligne sur le texte (même nombre de lignes, seules les
  87 lignes de statut diffèrent), puis sur le contenu une fois le champ `status` retiré. Les copies
  d'avant la bascule sont gardées hors dépôt.
- Aucun autre fichier de lot n'est modifié ; les 1 435 décisions des lots 0 à 22 étaient déjà
  validées et sont identiques ; **また (lot 21) n'est pas rouverte**.

## 2. Ce qui est validé

**13 entrées, 22 sens, 74 décisions**, sans fusion.

- **Arbitrage du périmètre** : 13 entrées ; じゃ et じゃあ restent deux ENTRY ; un sens par emploi
  établi par la fiche pour では, それでは, じゃ, じゃあ ; « De rien » (いいえ) et « Vraiment » (どうも) en
  sens distincts ; そうして et それから à un seul sens ; l'exemple altéré de いいえ journalisé (D1499),
  ni repris ni remplacé.
- **Arbitrage des 18 choix**, avec une correction appliquée à la révision : じゃ en `interjection`
  (D1471), la classe que sa fiche atteste.
- **Classes** : 6 `conjonction` décidées (しかし, でも, それから, そうして, それでは, じゃあ) et では,
  mécanique ; 3 `interjection` décidées (じゃ, ええ, いいえ) et はい, mécanique ; 1 `adverbe` décidé
  (どうぞ) et どうも, mécanique.
- **Fonctions d'A9**, première application, sens par sens : `connecteur` 8, `discours` 10,
  `politesse` 5, `intensifieur` 1 ; deux cumuls `discours` + `politesse` (では et それでは, sens 3,
  la prise de congé « polie ») ; pas de `politesse` pour じゃ ni pour はい (registre seulement).
- **Catégories et types** : aucune catégorie (la fonction justifie l'absence, A5) ; 22 types nuls,
  chacun justifié (A6).
- **Relations** : aucune ; quatre groupes candidats à la passe finale 5.16.

## 3. Assemblage réel

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la validation | 657 | 34 | 28 (15 non décidées, 13 propositions) | 0 | 0 | 0 |
| **Après la validation** | **670** | **34** | **15** | **0** | **0** | **0** |

- C'est l'état attendu par l'essai à blanc : 670 = 657 + 13.
- **Journal** : 1 509 décisions, D0001 à D1509, toutes validées ; aucune proposition en cours.
- **Avertissements** : 147, inchangés : chaque sens du lot porte une fonction.
- **Les 15 entrées restantes** : les 14 reportées (quantité, degré, comparaison : 多い, 少ない, 大勢,
  たくさん, 全部, 少し, ちょっと, とても, あまり, 結構, もっと, 一番, ちょうど, 大体) et など, réservée à
  son préalable de classe.

## 4. Tests et contrôles

- **Tests** : 476 réussis, 0 échec.
- **Tests d'état adaptés** : le lot 23 est affirmé entièrement validé, journal compris ; l'espace
  de travail réel attend 670 ENTRY, 34 retraits, 15 entrées écartées, toutes non décidées, 24
  fichiers de lot, 147 avertissements, aucune proposition ; le journal, 1 509 décisions toutes
  validées, les 74 dernières étant celles du lot 23 ; les contrôles des lots 17 à 22 dans
  l'assemblage réel suivent les nouveaux comptes.
- **L'essai à blanc en mémoire est devenu le contrôle du lot dans l'assemblage réel**, sans bascule
  en mémoire : mêmes assertions (classes de じゃ et de じゃあ, trois sens de では).
- **Sabotages** : 40 rejoués sur l'état validé, tous attrapés, chacun vérifié comme modifiant
  réellement son fichier, puis rétabli à l'octet près (empreintes contrôlées). Parmi eux : une
  entrée, le lot entier, une décision ou D1509 remis en `proposed` ; じゃ fusionnée dans じゃあ, ou
  remise en `conjonction` ; D1471 remise à `conjonction` ; fonction retirée, mal rangée ou non définie
  (`negation`) ; `politesse` posée par le registre ; では recollée en un sens ; « De rien » ou
  « Vraiment » fondus ; catégorie inventée ; type de secours ; exemple altéré repris ou remplacé ;
  など ou とても ajoutées ; また rouverte ; décision d'un lot clos modifiée.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 5. Ce qui reste ouvert

- **Le lot des 14 entrées reportées** (« quantité, degré et comparaison ») : `quantificateur`,
  `comparatif`, `intensifieur` (A9) ; son périmètre n'est pas préparé.
- **Le préalable sur la classe de など** (arbitrage du préalable, Q10).
- **Audit A2-05** : また, sens 2 (`connecteur` possible, non rouverte), 大変 « très » à confirmer.
- **Passe finale 5.16** : les quatre groupes de relations candidates du lot.
- **Registre de phrases** : l'exemple altéré de いいえ.

## 6. Suite

1. Contrôle du diff de validation.
2. **Commit**, sur un accord explicite ; `git diff --stat` et la liste exacte des fichiers sont
   montrés avant.
3. **Push** : sur un accord explicite et distinct.
4. Ensuite seulement, sur demande : le préalable sur など ou le périmètre du lot suivant.

## Erratum (2026-10-06, pendant la révision du lot 24)

Les sabotages annoncés au §4 ont été lancés par un harnais défectueux : `node --test
tests/reconstruction/`, que Node traite comme un fichier et qui **échoue toujours**, même sur un état
sain. Les modifications et les restaurations étaient réelles, mais leur détection ne prouvait rien.
Rejoués avec un harnais corrigé (`tests/reconstruction/*.test.js`, témoin sain vérifié d'abord), puis
après le renforcement des tests (empreinte des décisions validées ; traductions gardées et
abandonnées ; particules, relations et fonctions confrontées au journal), **tous les sabotages de ce
lot sont attrapés**. Les données validées de ce lot ne changent pas. Détail : rapport de proposition
du lot 24, §9.
