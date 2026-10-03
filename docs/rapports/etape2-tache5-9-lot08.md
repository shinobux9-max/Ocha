# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.9 · Lot 08 « communication, correspondance et médias » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 29 entrées et les 36 décisions de journal du lot sont `proposed`
(D0504 à D0539). Les lots 0 à 07 et leurs 503 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-08.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **429 tests, tous verts** (428 avant, 1 nouveau : le lot 08 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 308 ENTRY, 30 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 08 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 337 (308 + 29) | **337** |
| Identifiants retirés | 30 | **30** (aucune fusion) |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Entrées restantes après le lot | 352 | **352** |
| Avertissements | — | `categorie-nulle` × 21 (1 nouveau : かける « accrocher »), `type-nul` × 19, `kanji-inconnu` × 1 |

**Au passage**, la portée du test permanent des compteurs est explicitée dans son commentaire : il
couvre la reconstruction N5. Ce n'est pas une règle ontologique générale, et un futur corpus qui
introduirait 枚, 冊, 個… comme ENTRY-compteurs le fera évoluer. Le test lui-même n'a pas changé.

## 2. Les cas mis en évidence

| Entrée | Proposition | Ce que dit la source |
|---|---|---|
| **かける** | **trois sens** : passer (un appel) / mettre (des lunettes) / accrocher (D0520) | les trois emplois documentés (« Téléphoner ; Passer un appel ; Mettre (des lunettes) ; Accrocher »), **et rien d'autre** ; aucune graphie en kanji, puisque la source dit qu'il « s'écrit majoritairement en hiragana à ce niveau » ; sens 3 en `categorie-nulle` (D0521) |
| **聞く** | **deux sens** : écouter / demander (D0509) | « signifie à la fois écouter et demander (une question) » ; particules distinctes (を ; に pour la personne interrogée) |
| **話** | **deux sens** : conversation / histoire, récit (D0506) | « une discussion, une conversation… ou une histoire racontée (comme un conte ou un récit) » |
| **呼ぶ** | **deux sens** : appeler (faire venir, inviter) / nommer (D0513) | « appeler quelqu'un à voix haute, l'inviter… ou de le nommer » ; inviter reste dans le sens 1, puisque c'est faire venir à un événement |
| **電話** | **deux sens** : l'appareil / l'appel (D0518) | « désignant l'appareil ou la communication » : un objet et un événement |
| **テレビ** | un sens, télévision (autre traduction : téléviseur) (D0530) | contrairement à 電話, la nuance ne distingue pas le média de l'appareil |
| **テープ** | **deux sens** : ruban adhésif / bande magnétique (D0534) | deux objets distincts, dans deux domaines distincts |
| **レコード** | un sens, disque (D0536) | le « record sportif », cité par la nuance de la source, est un autre emploi de l'emprunt, hors N5 |
| **カメラ** | un sens, appareil photo (autre traduction : caméra) | l'appareil qui capte les images, quelle qu'en soit la forme |
| **撮る** | un sens ; **aucune correction** | la source distingue elle-même 撮る de 取る (même lecture) : rien n'est mêlé |

## 3. `suru_compatible`, uniquement d'après la source

`suru_compatible` est un champ humain (`HUMAN_FIELDS`) : il n'existe aucune règle mécanique pour
lui, et la doctrine est donc celle du lot 06.

| Entrée | Décision | Raison |
|---|---|---|
| **質問** | `true` (D0511) | « Nom / verbe suru… 質問する » |
| **話** | `false` (D0507) | la source le décrit comme un nom dérivé de 話す, sans emploi en する |
| **電話** | `false` (D0519) | la source ne documente que l'appareil et la communication ; l'appel s'y dit 電話をかける |

**電話 attire l'attention.** 電話する est très courant en japonais, mais la source ne le documente
pas : appliquer la doctrine du lot 06 donne `false`. Si tu juges qu'il faut l'appliquer autrement
ici, c'est une ligne à changer.

## 4. Autres décisions

- **名前** : au niveau 1 « communication et langage » (D0515), le registre n'ayant pas de catégorie
  des noms et désignations ; même démarche que 空 au lot 07.
- **Médias** : catégories du niveau 1 « médias », qui existe et couvre exactement ce lot :
  - 新聞 et 雑誌 : presse ;
  - ニュース : actualités ;
  - テレビ : télévision ;
  - ラジオ : radio.
- **Bande magnétique** : « technologie › données › stockage ».
- **Photographie** (写真, フィルム, 撮る) : « arts visuels » au niveau 2, plutôt que « photographie
  artistique » : une photo ordinaire n'est pas une œuvre.
- **Les objets datés** (ラジカセ, テープレコーダー, フィルム, レコード) sont traités normalement,
  **sans nuance « vieilli »**, comme demandé : la source n'en établit pas.

## 5. Journal du lot

36 décisions proposées, de D0504 à D0539 :
- 12 décisions : découpages, sens uniques, `suru_compatible` (trois), catégorie de 名前 ;
- 23 abandons ;
- 1 `categorie-nulle` (かける « accrocher »).

## 6. Ce que j'attends

Ton arbitrage, en particulier sur :
- les trois sens de かける ;
- les deux sens de 聞く, 話, 呼ぶ, 電話 et テープ ;
- `suru_compatible` de 電話 (`false` selon la doctrine) ;
- la catégorie de 名前, et celle de la photographie.
