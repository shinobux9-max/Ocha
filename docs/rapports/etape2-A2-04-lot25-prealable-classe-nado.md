# Ocha v2 — Rapport de l'étape 2 · A2-04 · préalable sur la classe de など

**Date** : 2026-10-07
**Nature** : rapport d'arbitrage **normatif**, demandé après la clôture du lot 24. **Aucune décision
lexicale** : aucun fichier de lot (pas de `lot-25.json`), aucune décision de journal (`A2-04-D…`),
aucune ENTRY modifiée, aucun registre modifié, aucun addendum créé. Rien n'est validé, committé ni
poussé.
**Objet** : dire ce que la fiche de など (`n5_v_602`) atteste de sa classe, ce que permettent le
registre des classes, le schéma et les règles, et quelles options minimales existent, avec leurs
conséquences. **L'arbitrage choisit ; ce rapport ne décide rien.**
**Nom du fichier** : il porte le préfixe `lot25` pour que l'export de relecture le regroupe, comme
le préalable du lot 23 ; il n'existe aucun lot 25, et aucun ne sera préparé avant l'arbitrage.

**État réel vérifié avant ce rapport** : `ocha-v2` = `origin/ocha-v2` = `5e9a233` ; assemblage réel :
684 ENTRY, 34 retraits, **1 entrée écartée (など, non décidée)**, 0 problème, 0 erreur, 0 attente ;
1 568 décisions validées (D0001 à D1568), aucune proposition en cours ; 479 tests verts.

---

## 1. Méthode

1. **La fiche** de `n5_v_602` est lue en entier, dans la source figée
   (`reconstruction/a2-04/sources/vocab.json`), champ par champ.
2. **Les normes** relues : le registre `data/registries/grammatical-classes.json` (A2-02, 3.3), le
   schéma A2-01 (§6, invariant I6, §7 pour `particles`), l'addendum A3 (L2, L6, L8),
   `A2-LING-v1` (§3, « suffixe »), `REGLES-CONSTRUCTION.md` (conception verrouillée), et le code
   qui les applique (`tools/reconstruction/rules.mjs`, `decisions.mjs`, `assemble.mjs`,
   `tools/lexicon/schema.mjs`).
3. **Les précédents** sont relevés par script dans les lots et le journal validés : les fiches
   qui nomment une « particule » ou une « postposition », et les ENTRY qui portent `suffix: true`.
4. **L'état du modèle** pour les particules est relevé dans les fichiers existants
   (`data/n5/particles.json`, `data/n5/grammar.json`, `exemples.json`). Ces fichiers ne sont **pas
   une attestation** sur la fiche : ils disent comment Ocha range déjà les particules.
5. **Rien n'est ajouté par connaissance externe** : aucune analyse de など (origine, emplois non
   cités) qui ne figure dans la fiche.

---

## 2. Ce que la fiche dit, exactement

| Champ de la fiche | Valeur |
|---|---|
| `id`, `word`, `reading`, `romaji` | `n5_v_602`, など, など, nado |
| `meanings.primary` | « Etc. » |
| `meanings.secondary` | « Entre autres », « Et des choses comme... » |
| `nuance` | « **Particule suffixe** placée après un nom (ou une énumération de noms) pour indiquer qu'il ne s'agit que d'exemples non exhaustifs parmi une liste plus large (équivalent de « et cetera » ou « entre autres »). » |
| `type`, `group` | `adverbe`, `adverbe` (ancien rangement) |
| `category`, `subcategory` | `adverbes_expressions`, `enumeration` (ancien rangement, indicatif) |
| `particles` | `[]` |
| `example` | りんご **など** の くだもの が すき です 。 — « J'aime les fruits **tels que** les pommes (entre autres). » |

**Ce que la fiche atteste sur la classe** : une seule chose, en gras : « **particule suffixe** ».
Elle ne nomme **aucune autre classe**. Contrairement à じゃ (« interjection / particule de
transition ») ou à じゃあ (« conjonction ou particule de transition »), elle ne propose pas de
seconde classe disponible au registre.

**Ce que la fiche n'atteste pas** : l'ancien `type: adverbe` n'est pas une attestation. C'est le
rangement hérité, que la reconstruction ne reprend jamais comme preuve. C'est pourquoi など est dans
`CLASS_EXCEPTION_IDS` depuis le lot 0 (« classe à décider »), parmi les « conjonctions et
interjections mal rangées » et les « formes particulières ».

---

## 3. Le registre des classes, et pourquoi aucune classe ne convient

Le registre (`grammatical-classes.json`, arbitrage A2-02 n° 7 : « exactement les dix ») contient :
`nom`, `numeral`, `pronom`, `verbe`, `adjectif_i`, `adjectif_na`, `adverbe`, `determinant`,
`conjonction`, `interjection`. **Aucune classe « particule ».**

| Classe | Compatible avec la fiche ? | Pourquoi |
|---|---|---|
| `nom` | **non attestée** | la fiche ne dit pas « nom » ; など ne désigne rien, elle suit un nom |
| `numeral`, `pronom`, `verbe`, `adjectif_i`, `adjectif_na` | **non** | aucun trait de ces classes n'est attesté |
| `adverbe` | **non attestée** | seul l'ancien type le dit ; la fiche dit « particule », placée après un nom, non devant un verbe ou un adjectif |
| `determinant` | **non** | un déterminant précède le nom (この, 大きな) ; など le suit |
| `conjonction` | **non attestée** | la fiche ne la dit pas reliant deux énoncés ; elle clôt une énumération (la liaison des noms est le fait de や, dans les exemples de la couche grammaire) |
| `interjection` | **non** | aucun emploi autonome n'est attesté |

**Conclusion** : aucune des dix classes n'est attestée par la fiche. Toute classe existante
attribuée à など serait une **convention Ocha**, non une décision tirée de la source.

**La règle des précédents** (D1471, じゃ) : « « particule » n'est pas une classe du registre, et
`interjection` est la classe attestée par la fiche et disponible ». Elle suppose qu'une classe soit
à la fois **attestée** et **disponible**. Pour など, l'intersection est vide.

---

## 4. Attesté, ou convention Ocha

| Élément | Statut |
|---|---|
| « Particule suffixe » | **attesté** (fiche, en gras) |
| Placée après un nom ou une énumération de noms | **attesté** |
| Exemples non exhaustifs ; « Etc. », « Entre autres », « Et des choses comme... » | **attesté** |
| Exemple りんごなどのくだもの | **attesté** |
| L'ancien type `adverbe` | **hérité**, non attesté ; déjà écarté comme preuve (`CLASS_EXCEPTION_IDS`) |
| Le registre de dix classes, sans « particule » | **convention Ocha** (A2-02, arbitré) |
| La propriété `suffix` (`A2-LING-v1`, §3 : « une propriété linguistique et non un domaine sémantique ») | **convention Ocha**, applicable à ce que la fiche dit « suffixe » (précédents 半, 辺) |
| La couche des particules (`particles.json`, 20 entrées dont など, rattachée au point de grammaire `g_27`) | **état du modèle** Ocha, non une attestation de la fiche |
| « Une construction grammaticale relève de la grammaire » (A3, L8) | **règle** Ocha |
| Le retrait sans successeur (A3 : « identifiants retirés (fusion, suppression) ») | **règle** Ocha, prévue, jamais employée |

---

## 5. Les précédents comparables

- **Fiches qui nomment une « particule »** : じゃ (D1471, `interjection`) et じゃあ (D1479,
  `conjonction`). Dans les deux cas, la fiche nomme **aussi** une classe du registre, et c'est elle
  qui est retenue ; « particule » n'est jamais devenue une classe. **Aucun précédent pour une fiche
  qui ne nomme que « particule ».**
- **Fiches qui nomment une « postposition »** : 後 (`n5_v_663`) et 近く (`n5_v_704`), « nom /
  postposition » ; la classe est restée mécanique (`nom`), la fiche nommant aussi « nom ».
- **`suffix: true`** : deux ENTRY seulement, toutes deux `nom` et dites « nom suffixe » ou « nom /
  suffixe » par leur fiche : 半 (D0907, lot 13) et 辺 (D1356, lot 20). Ces décisions « ne créent
  aucune ENTRY d'affixe » ; la représentation des affixes reste un point ouvert.
- **Les particules dans le vocabulaire** : relevé par script, aucune des 20 particules de
  `particles.json` (は, が, を, に, で, へ, と, も, の, か, ね, よ, から, まで, より, だけ, ごろ,
  くらい / ぐらい, や, など) n'est une ENTRY de la source, **sauf など**. Les autres sont décrites
  seulement par la couche grammaire.
- **Le point de grammaire `g_27`** (« Conclure une énumération », motif « [Nom / Liste] + など »,
  badge « Particule - Etc. & Exemples ») décrit déjà など, avec ses équivalents « et cætera »,
  « entre autres », « et autres choses du même genre ».
- **Le retrait sans successeur** : prévu par A3 et par l'outil (`retire: { merged_into: null }`,
  décision de nature `retrait`, champ `merged_into` annulable dans `tools/lexicon/schema.mjs`),
  **jamais employé** : les 34 retraits actuels sont tous des fusions.

---

## 6. Les options minimales

### Option A · Une classe existante, avec `suffix: true`

など reste une ENTRY ; sa classe est choisie parmi les dix, par convention : `adverbe` (l'ancien
type) ou `nom` (le modèle de 半 et 辺). `suffix: true`, la fiche disant « suffixe ». La mention
« particule suffixe » va en nuance d'ENTRY.

- **Schéma, registres** : aucun changement.
- **Données** : une ENTRY de plus (685) ; sens « Etc. », sans fonction (`pluralisation` n'est pas
  définie, A9, Q11), donc une catégorie et un type à décider ou à justifier nuls (A5, A6).
- **Ce qu'elle coûte** : une classe que la fiche n'atteste pas, et qu'elle contredit (« particule »).
  Elle romprait la règle de D1471 (classe attestée et disponible). `adverbe` reprendrait l'ancien
  rangement que la reconstruction a écarté ; `nom` étendrait le précédent de 半 et 辺, dont les
  fiches disent « nom », à une fiche qui ne le dit pas. Et など serait la seule particule du
  vocabulaire, en double avec `particles.json`.

### Option B · Un addendum qui ajoute une classe `particule`

Un addendum de conception (A10) ajoute une onzième classe au registre ; など la reçoit, la classe
étant celle que la fiche atteste.

- **Schéma** : I6 inchangé dans sa lettre (« dans son registre ») ; `CLASS_GROUPS` gagne
  `particule: []` (groupe `null`).
- **Registres** : `grammatical-classes.json` passe à onze classes, contre l'arbitrage A2-02 n° 7
  (« exactement les dix ») ; les tests de l'étape 3.3 qui figent les dix classes (D1 à D3) et
  `validate-data` sont à adapter.
- **Données** : une ENTRY de plus (685), même question de catégorie et de type que A.
- **Ce qu'elle coûte** : une classe créée pour une seule ENTRY, alors que les dix-neuf autres
  particules ne sont pas des ENTRY ; elle ouvrirait la question de leur place dans le vocabulaire,
  et doublerait la couche des particules. Le coût normatif est le plus élevé des trois.

### Option C · Retrait sans successeur : など relève de la couche grammaire

など n'est pas gardée comme ENTRY : elle est retirée par suppression (`retire: { merged_into: null
}`, décision de nature `retrait`), au motif qu'elle est une particule, que la fiche le dit, et que
le modèle range les particules dans la grammaire (A3, L8), où など est déjà décrite (`particles.json`,
`g_27`).

- **Schéma, registres** : aucun changement ; le mécanisme existe (A3, outil, validateur).
- **Données** : 684 ENTRY, **35 retraits**, 0 entrée écartée ; `v_602` entre dans
  `vocab-retired.json` à la publication et n'est jamais réattribué. Aucune référence à `n5_v_602`
  dans les missions, les lectures, le curriculum ou les concepts ; seules **3 phrases d'exemple**
  sont rangées sous `n5_v_602` dans `exemples.json`. Leur rattachement (à la particule ou à `g_27`)
  relève du registre des phrases, à la passe finale 5.16 ou à la publication 5.17, non de ce
  préalable.
- **Ce qu'elle coûte** : la première suppression sans successeur, à justifier au journal ; les
  traductions de la fiche (« Etc. », « Entre autres ») ne sont pas reprises dans le vocabulaire,
  mais `g_27` les porte déjà. Elle tranche, pour la seule など, que **le vocabulaire ne contient
  pas de particule** : ce n'est pas une règle nouvelle, c'est l'état actuel des dix-neuf autres.

### Option D · Report à la passe finale 5.16

Rien n'est décidé maintenant. **Conséquence** : l'assemblage complet reste impossible (`mode
complete` exige que chaque entrée source soit décidée) ; le report ne fait que déplacer la même
question.

---

## 7. Conséquences, en résumé

| | A · classe existante | B · addendum `particule` | C · retrait | D · report |
|---|---|---|---|---|
| Classe attestée par la fiche | non | **oui** | sans objet | — |
| Conception modifiée | non | **oui** (addendum) | non | non |
| Registre des classes modifié | non | **oui** (onze classes) | non | non |
| Outils et tests de registre | non | **oui** | non | non |
| ENTRY | 685 | 685 | 684 | 684 |
| Retraits | 34 | 34 | **35** | 34 |
| Entrées écartées | 0 | 0 | 0 | **1** |
| Particule en double avec la grammaire | **oui** | **oui** | non | — |
| Mécanisme employé pour la première fois | non | classe nouvelle | **suppression** | — |
| Décision lexicale ensuite | lot d'une entrée | addendum validé, puis lot | lot d'une entrée | à 5.16 |

Dans les options A, B et C, la décision lexicale se prend ensuite dans un lot d'une entrée, selon
le protocole normal (proposition, relecture, validation), après cet arbitrage. Aucune ne demande de
rouvrir une ENTRY validée.

---

## 8. Recommandation

**Option C**, le retrait sans successeur, pour quatre raisons :

1. **La fiche décide** : elle dit « particule », et rien d'autre. A met une classe qu'elle n'atteste
   pas ; B crée une classe pour la suivre ; C la suit sans rien inventer.
2. **Le modèle a déjà la place** : A3, L8 range la grammaire hors du vocabulaire, et など est déjà
   décrite comme particule (`particles.json`) et comme point de grammaire (`g_27`), avec les mêmes
   équivalents.
3. **La cohérence** : les dix-neuf autres particules ne sont pas des ENTRY ; C aligne など sur elles,
   A et B en feraient une exception.
4. **Le coût minimal** : aucune conception, aucun registre, aucun outil modifié ; un mécanisme prévu
   par A3.

**Si l'arbitrage veut garder など comme ENTRY**, Claude recommande **B plutôt que A** : seule B
donne une classe attestée par la fiche ; A contredirait la règle de D1471.

Cette recommandation n'est pas une décision : aucune ENTRY, aucune décision de journal, aucun lot
ne sera écrit avant l'arbitrage.

---

## 9. Ce qui est à arbitrer

| # | Question | Options | Recommandation |
|---|---|---|---|
| Q1 | など reste-t-elle une ENTRY du vocabulaire ? | (a) oui ; (b) non, retrait sans successeur (option C) ; (c) report à 5.16 (option D) | **(b)** |
| Q2 | Si oui : quelle classe ? | (a) `adverbe` + `suffix` (A) ; (b) `nom` + `suffix` (A) ; (c) addendum `particule` (B) | **(c)** |
| Q3 | Si C : sort des 3 phrases d'exemple rangées sous `n5_v_602` | (a) au registre des phrases, à 5.16 ou 5.17 ; (b) maintenant | **(a)** : hors de ce préalable |
| Q4 | Le véhicule de la décision | un lot d'une entrée (lot 25), selon le protocole normal | **oui** : périmètre, proposition, relecture, validation |

---

## 10. Ce que l'arbitrage déclenchera, et ce qu'il ne fera pas

1. **Si Q1 (b)** : Claude prépare le périmètre du lot 25 (une entrée, など), puis, sur autorisation,
   la proposition : `retire: { merged_into: null }` et une décision `retrait` au journal, justifiée
   par la fiche et par A3, L8. L'assemblage attendu serait 684 ENTRY, 35 retraits, 0 écartée.
2. **Si Q1 (a) et Q2 (c)** : Claude rédige l'addendum A10, en statut « proposé », sans toucher au
   registre ; le registre, les outils et les tests ne changent qu'après sa validation. Ensuite
   seulement, le lot 25.
3. **Si Q1 (a) et Q2 (a) ou (b)** : le lot 25 directement, avec la classe choisie.
4. **Dans tous les cas** : aucune ENTRY validée n'est rouverte ; les sources figées ne changent pas ;
   `particles.json` et `g_27` ne sont pas modifiés.

---

## 11. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport | `06-lot-courant-rapports.md` |
| La fiche complète de など | `07-lot-courant-sources.md` |
| Le registre des classes, `A2-LING-v1` | `03-references-A2.md` |
| Le schéma A2-01 | `02-conception.md` |
| Les addenda (A3, A5, A6, A9) | `04-addenda.md` |
| `REGLES-CONSTRUCTION.md`, `ETAT-ACTUEL.md` | `01-gouvernance.md` |
| L'état réel, la note de relais | `05-relais.md` |
| Le diff contre `5e9a233` | `10-diff-et-controles.md` |

La couche des particules (`data/n5/particles.json`) et le point de grammaire `g_27`
(`data/n5/grammar.json`) ne sont pas dans l'export ; les passages utiles sont cités au §5.

---

## 12. Arbitrage du préalable (2026-10-07)

Rendu par ChatGPT, sur délégation de l'utilisateur, et relayé par lui.

| # | Décision |
|---|---|
| Q1 | **Option C** : など est retirée du vocabulaire, **sans successeur** |
| Q2 | **Sans objet** : aucune classe lexicale n'est attribuée ; **aucun addendum A10** n'est créé |
| Q3 | **Option (a)** : les 3 phrases rangées sous `n5_v_602` sont traitées à la passe finale 5.16, avec la remise en cohérence et le remappage des références ; **le lot 25 ne les modifie pas** |
| Q4 | **Oui** : la décision est matérialisée par un **lot 25 d'une seule entrée**, selon le protocole normal |

**La justification du futur retrait reste propre à など** :

- la fiche n'atteste que « particule suffixe » ;
- aucune classe du registre lexical n'est attestée ;
- A3 distingue la grammaire du vocabulaire (L8) et permet la suppression d'un identifiant ;
- `merged_into` vaut `null`.

**Ce que l'arbitrage n'établit pas** : aucune règle générale selon laquelle une particule serait
interdite dans le vocabulaire. Le constat du §5 (les dix-neuf autres particules ne sont pas des
ENTRY) décrit l'état des sources ; il ne devient pas une règle.

**Ce qui suit** : le périmètre du lot 25 (`docs/rapports/etape2-A2-04-lot25-perimetre.md`).
Aucun `lot-25.json`, aucune décision de journal (D1569 n'est pas créée), aucune ENTRY ni
référence de phrase modifiée avant l'autorisation de la proposition.

## Erratum (2026-10-07, à la proposition du lot 25)

Ce rapport dit que le retrait sans successeur n'a « jamais » été employé et que les 34 retraits
actuels sont « tous des fusions ». **C'est inexact** : ils comptent **33 fusions**, décidées dans les
lots, et **`v_717`**, retiré d'emblée **sans successeur** par l'addendum A3 (clé fantôme
`n5_v_717` d'`exemples.json` ; `RESERVED_RETIRED` dans `tools/reconstruction/rules.mjs`), sans
décision de lot. L'essai à blanc du lot 25 l'a fait apparaître. Ce qui reste vrai : `v_602` serait
le **premier retrait sans successeur décidé dans un lot** et justifié au journal. Les options, la
recommandation, l'arbitrage et les effets attendus (684 ENTRY, 35 retraits, 0 écartée) ne changent
pas. Détail : rapport de proposition du lot 25, §5.
