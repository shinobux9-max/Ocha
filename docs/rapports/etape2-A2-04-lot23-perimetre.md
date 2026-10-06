# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 23 « Liaison, échange et formules sociales » · périmètre

**Date** : 2026-10-06
**Nature** : **proposition de périmètre**, à arbitrer. **Aucune décision lexicale** : aucun fichier de
lot (pas de `lot-23.json`), aucune décision de journal, aucune ENTRY modifiée, aucun statut
`proposed`. Les fonctions d'A9 sont **signalées comme potentielles**, jamais attribuées. Rien n'est
validé, committé ni poussé.
**Cadre normatif** : addendum A9, validé le 2026-10-06 (`docs/conception/addendum-A9-fonctions-linguistiques.md`),
commité et poussé (`fac6a60`) ; arbitrage du préalable (`docs/rapports/etape2-A2-04-lot23-prealable-normatif.md`, §12).

**État réel vérifié avant ce rapport** : `ocha-v2` = `origin/ocha-v2` = `fac6a60` ; assemblage
réel : 657 ENTRY, 34 retraits, **28 entrées écartées, toutes non décidées**, 0 problème, 0 erreur,
0 attente ; 1 435 décisions validées, aucune proposition en cours ; 474 tests verts.

---

## 1. Méthode

1. **Les entrées restantes** sont relevées par script (entrées des sources figées qu'aucun fichier
   de lot ne décide) : 28, toutes dans `vocab.json`. **など (`n5_v_602`) est exclue d'office**
   (arbitrage du préalable, Q10 : préalable spécifique sur sa classe).
2. **Les 27 autres** sont réparties selon le rôle que leurs fiches mettent au premier plan, avec
   les groupes du rapport du préalable (§3).
3. **Chaque fiche candidate est lue en entier** : traductions, nuance, exemple, particules ; les
   anciens exemples de contexte (`exemples.json`, lecture seule, non migrés) sont consultés comme
   contexte, jamais comme source de décision.
4. **Les fonctions d'A9** sont indiquées comme **potentielles**, d'après ce que la fiche atteste ;
   leur attribution, sens par sens, relève de la proposition (A9, §2.1 : le rôle doit faire partie
   intégrante du sens modélisé).
5. **Identifiants contrôlés par script** : distincts, présents dans la source, non décidés.

---

## 2. Périmètre proposé : 13 entrées

Les fiches sources complètes sont dans `07-lot-courant-sources.md` (partie 1).

### A. Liaison entre énoncés (4)

| Identifiant | Mot | Traduction de la fiche | Classe (état mécanique) |
|---|---|---|---|
| `n5_v_593` | しかし | Cependant ; mais, toutefois, néanmoins | à décider (exception consignée) |
| `n5_v_599` | でも | Mais ; cependant, pourtant | à décider (exception consignée) |
| `n5_v_416` | それから | Ensuite ; et puis, puis après | à décider (exception consignée) |
| `n5_v_596` | そうして | Et puis ; et ensuite, c'est ainsi que | à décider (exception consignée) |

### B. Transition, conclusion et prise de congé (4)

| Identifiant | Mot | Traduction de la fiche | Classe (état mécanique) |
|---|---|---|---|
| `n5_v_418` | では | Alors ; dans ce cas, eh bien | `conjonction` (mécanique) |
| `n5_v_417` | それでは | Alors ; dans ce cas, sur ce (formel / poli) | à décider (exception consignée) |
| `n5_v_595` | じゃ | Alors ; bon, dans ce cas | à décider (exception consignée) |
| `n5_v_413` | じゃあ | Alors ; dans ce cas, eh bien | à décider (exception consignée) |

### C. Réponses (3)

| Identifiant | Mot | Traduction de la fiche | Classe (état mécanique) |
|---|---|---|---|
| `n5_v_344` | はい | Oui ; c'est exact, entendu | `interjection` (mécanique) |
| `n5_v_586` | ええ | Oui ; d'accord, certes | à décider (exception consignée) |
| `n5_v_584` | いいえ | Non ; de rien, pas du tout | à décider (exception consignée) |

### D. Formules sociales (2)

| Identifiant | Mot | Traduction de la fiche | Classe (état mécanique) |
|---|---|---|---|
| `n5_v_600` | どうぞ | S'il vous plaît ; je vous en prie, allez-y | à décider (exception consignée) |
| `n5_v_499` | どうも | Merci ; bien des choses, vraiment (particule d'atténuation) | `adverbe` (mécanique) |

**Total** : 4 + 4 + 3 + 2 = **13 entrées**, toutes adverbes, conjonctions ou interjections selon les
sources ; aucune lecture à décider (tout en kana), aucun tag de lieu candidat, aucune particule dans
les fiches.

## 3. Pourquoi ce thème, et faut-il scinder ou élargir ?

**Le thème** : des mots dont le sens est **le rôle dans l'échange ou entre énoncés**, sans domaine
thématique : relier deux énoncés (A), faire passer ou clore l'échange (B), répondre (C), accomplir
un acte social (D). Ce sont exactement les trois fonctions pragmatiques d'A9 que les lots
précédents n'ont jamais appliquées : `connecteur`, `discours`, `politesse`.

**Pourquoi ne pas prendre les 27 entrées d'un coup** : les 14 autres (quantité, degré,
comparaison, mesure) posent des questions **d'une autre nature** : la frontière entre
`quantificateur` et la catégorie `nombres_quantification`, entre `quantificateur` et
`intensifieur` (少し, ちょっと), entre `comparatif` et `intensifieur` (もっと), les adjectifs
prédicatifs (多い, 少ない), les dimensions (ちょうど, 大体). Les réunir doublerait le nombre de
frontières à arbitrer dans une seule proposition, sans dépendance entre les deux groupes : aucune
des 13 entrées ne dépend d'une décision sur les 14 autres, ni l'inverse.

**Pourquoi ne pas scinder davantage** : les quatre groupes A à D partagent la frontière
`connecteur` / `discours` / `politesse` d'A9 (§3.1 à §3.3) ; la série では, それでは, じゃ, じゃあ
touche les trois à la fois, et はい, いいえ, どうも touchent `discours` et `politesse`. Les séparer
ferait arbitrer deux fois la même frontière.

**Taille** : 13 entrées, dans la fourchette des lots récents (9 à 26).

**Alternative**, si l'arbitrage la préfère : un seul lot de 27 entrées (périmètre « tout sauf
など ») ; c'est possible, mais la proposition et sa relecture seraient beaucoup plus lourdes.

## 4. Entrées reportées et hors périmètre

### Reportées : un lot suivant, « quantité, degré et comparaison » (14)

| Groupe | Entrées | Fonctions A9 potentielles |
|---|---|---|
| Quantité | 多い `n5_v_654`, 少ない `n5_v_447`, 大勢 `n5_v_655`, たくさん `n5_v_520`, 全部 `n5_v_639`, 少し `n5_v_509`, ちょっと `n5_v_497` | `quantificateur` (A9, §3.4 : pas pour un prédicat ni un nom de quantité) ; `intensifieur` (少し, ちょっと) |
| Degré | とても `n5_v_498`, あまり `n5_v_515`, 結構 `n5_v_471` | `intensifieur` ; `politesse` (結構 « non merci ») |
| Comparaison | もっと `n5_v_607`, 一番 `n5_v_517` | `comparatif` ; `intensifieur` (もっと) |
| Mesure, approximation | ちょうど `n5_v_496`, 大体 `n5_v_546` | aucune ; dimensions d'A2-DIM |

Leurs fiches sont dans l'export du préalable ; elles seront exportées avec leur propre périmètre.
Deux de ces entrées ont un **emploi social** qui touche le lot 23 : 結構 (refus poli) et ちょっと
(refus poli, hésitation). Elles restent avec leur sens premier (degré, quantité) ; la doctrine du
lot 16 et A9 (§2.1) s'y appliqueront lors de leur lot.

### Hors périmètre (1)

**など** `n5_v_602` : préalable spécifique sur sa classe (« particule suffixe » selon sa fiche, classe
absente du registre), après A9 (arbitrage du préalable, Q10). Aucune décision dans le lot 23 ni le
suivant avant ce préalable.

**Total** : 13 incluses + 14 reportées + 1 hors périmètre = **28**.

## 5. Fonctions A9 potentiellement concernées, entrée par entrée

**Rien n'est attribué ici.** Pour chaque entrée : ce que la fiche atteste, et les fonctions
qu'A9 pourrait viser, avec la frontière en jeu. L'attribution, le découpage des sens et la
justification fonction par fonction (A9, §2.3) relèvent de la proposition.

| Entrée | Ce que la fiche atteste | Fonctions potentielles | Frontière ou question |
|---|---|---|---|
| **しかし** | opposition ou restriction « par rapport à la phrase précédente » ; plus formel que でも | `connecteur` | le registre (formel) en nuance (A9, §2.4) |
| **でも** | opposition ou restriction ; plus familier que しかし | `connecteur` | idem |
| **それから** | « lier des actions consécutives dans le temps ou **énumérer des éléments** » | `connecteur` | l'énumération relie-t-elle des énoncés (A9, §3.1, frontière 1) ? un sens ou deux |
| **そうして** | lier deux phrases « de manière séquentielle », ou « ajouter une information » | `connecteur` | succession et addition : un seul rôle de liaison, ou deux sens |
| **では** | « passage à une autre idée, conclure un accord ou prendre congé de manière polie » | `connecteur` (conséquence, « dans ce cas ») ; `discours` (transition, clôture) ; `politesse` (« prendre congé poliment ») | cumul (A9, §2.3) ou découpage ; la politesse d'une prise de congé, distincte du registre (A9, §3.3, frontière 1) |
| **それでは** | conclusion, changement de sujet, « prendre congé de manière polie » ; « forme polie et complète de jaa » | idem | « forme polie » est un **registre** : il ne suffit pas pour `politesse` (A9, §3.3) |
| **じゃ** | transition, conclure un accord, prendre congé (« ja, mata ») ; « contraction familière de では » | `connecteur` ; `discours` | registre familier en nuance |
| **じゃあ** | transition, conclure un accord, « alors / dans ce cas » ; « contraction de では » | `connecteur` ; `discours` | identité avec じゃ (§6.1) |
| **はい** | accord, **réponse à un appel**, confirmation ; « terme d'approbation poli » | `discours` (réponse) | « poli » est un registre, non une formule sociale (A9, §3.3) |
| **ええ** | approbation, accord ; « plus douce et conversationnelle que はい » | `discours` | registre en nuance |
| **いいえ** | réponse négative ; « décliner poliment un compliment ou un remerciement (de rien) » | `discours` (dénégation) ; `politesse` (décliner un remerciement, A9 §3.3) | un sens ou deux (la fiche atteste deux emplois, avec une traduction « de rien ») ; `negation` non définie (A9, §6) |
| **どうぞ** | inviter, céder le passage, offrir un objet | `politesse` | un seul acte (inviter / offrir) ou plusieurs : le découpage suit la fiche |
| **どうも** | remercier (raccourci de どうもありがとう) ; « exprimer un vague sentiment de gêne ou d'incertitude » ; « vraiment (particule d'atténuation) » | `politesse` (remercier) ; `intensifieur` ? (« vraiment ») | le second emploi est peu développé par la fiche : en nuance (A9, §2.1, §3.2 frontière 2), ou un sens si la fiche l'établit |

**Pour toutes les entrées** : aucune catégorie thématique n'est attendue (A2-LING §5 ; A9 §4.1 :
ni `communication_langage › parole_conversation › reponse` pour un mot qui répond, ni
`relations_sociales › interactions_sociales` pour une formule) ; un sens qui reçoit une fonction n'exige
pas de décision `categorie-nulle` (A5) ; chaque `semantic_type: null` exige une décision `type-nul`
(A6, règle de 5.1c ; A9, §4.2).

## 6. Dépendances, ambiguïtés et risques

### 6.1. Risque de fusion : じゃ et じゃあ

Deux fiches pour deux formes très proches : じゃ (`n5_v_595`, « contraction familière de では ») et
じゃあ (`n5_v_413`, « contraction de では », « familière »). Mêmes traductions principales
(« Alors »), mêmes emplois (transition, accord, prise de congé), mêmes exemples (« じゃ、またあした »
/ « じゃあ、またあした »). **Aucune des deux fiches ne dit que l'une est une variante de l'autre.**

| Issue | Effet |
|---|---|
| **A. Une seule unité lexicale** (A3, L3), la seconde forme étant l'allongement oral de la première | fusion au plus petit numéro : `n5_v_413` じゃあ survit, `n5_v_595` じゃ est retirée ; la forme usuelle et la seconde forme sont à décider (writings, lectures) |
| **B. Deux unités** (deux formes enseignées, la fiche les traite séparément) | deux ENTRY, une relation candidate à 5.16 |

**Ce que les fiches établissent** : la même origine (contraction de では) et le même emploi ; la
distinction de forme (voyelle longue) n'est ni commentée ni opposée. **Ce qu'elles n'établissent
pas** : que じゃ et じゃあ soient un même mot. Une fusion supposerait cette identité ; c'est la
question à arbitrer. La règle « la fiche source décide » interdit de trancher par connaissance
externe.

### 6.2. Pas de fusion attendue

- **では / じゃ / じゃあ** : les fiches disent « contraction de では » ; une contraction est une **autre
  forme**, d'un autre registre, non une graphie. Aucune fusion proposée ; relation candidate à
  5.16.
- **では / それでは** : それでは est « la forme polie et complète de jaa », composée de それ ; deux
  mots. Pas de fusion.
- **それから / そうして**, **しかし / でも**, **はい / ええ** : synonymes ou quasi-synonymes de registres
  différents, documentés comme tels par leurs fiches : deux ENTRY chacun ; relations candidates à
  5.16.
- **それ (lot 11, validée) et それから, それでは** : composés ; aucune fusion, aucune réouverture.

### 6.3. Classes

Dix entrées ont une classe en exception consignée, à décider à la proposition : しかし, でも,
それから, そうして, それでは, じゃ, じゃあ, ええ, いいえ, どうぞ. Le registre a `conjonction` et
`interjection`, **jamais employées à ce jour**, et `adverbe`. Les fiches hésitent elles-mêmes
(« conjonction / adverbe de liaison », « interjection / particule de transition », « adverbe /
interjection »). **A9, §2.2** : la classe ne décide pas de la fonction, ni l'inverse. Deux
mécaniques sont incohérentes avec leurs fiches : はい (`interjection` mécanique ; `group: "nom"` dans
la source) et どうも (`adverbe`, alors que sa fiche le dit « formule abrégée utilisée seule »). Elles
restent mécaniques, sauf exception de classe arbitrée.

### 6.4. Sens et emplois

- **Découpage** : la règle d'A9 (§2.3) s'applique : un sens par emploi que la fiche établit
  réellement ; cumul de fonctions sur un même sens si les rôles sont intégraux ; jamais de
  scission pour éviter un cumul. Les cas à trancher : では, それでは, じゃ, じゃあ (conséquence /
  transition / clôture), いいえ (non / de rien), どうも (merci / « vraiment »), それから (succession /
  énumération), そうして (succession / addition).
- **Emplois d'adresse d'un mot lexical** (doctrine du lot 16) : ne concernent pas ces 13 entrées,
  qui n'ont pas de sens lexical d'accueil : leur rôle **est** le sens (rapport du préalable, §6).
- **Précédent à garder cohérent** : また, sens 2 (« Aussi, de plus ») reste validée sans fonction et
  **n'est pas rouverte** (A9, §5 : audit A2-05) ; une décision du lot 23 qui pose `connecteur` sur
  une addition (そうして) créera une asymétrie connue, à signaler, non à corriger dans ce lot.

### 6.5. Anomalies de source

- **いいえ** : l'exemple de la fiche est altéré (« いいえ、ちigai masu。 », romaji mêlé aux kana) ;
  les anciens exemples de contexte donnent « いいえ、ちがいます ». À journaliser ; l'exemple ne se
  corrige pas par connaissance externe, la décision dira ce qui en est retenu.
- **はい** : `group: "nom"` dans la source, pour une interjection ; sans effet (le groupe dépend de la
  classe).

### 6.6. Lien avec les expressions de l'application

`data/expressions.json` cite はい (une fois) et いいえ (deux fois, dont « Mais non, de rien », registre
poli) dans des réponses de formules. Aucune dépendance de données : les expressions ne sont pas
remappées avant la publication 5.17 ; le registre reste porté par `registres.json` et
`expressions.json` (A9, §4.6).

## 7. Ce qui est à arbitrer

1. **Le thème et le périmètre** : « Liaison, échange et formules sociales », **13 entrées** (A à D),
   les 14 entrées de quantité, de degré et de comparaison étant reportées à un lot suivant, et
   など hors périmètre ; ou l'alternative d'un lot unique de 27 entrées.
2. **じゃ et じゃあ** : issue A (fusion dans `n5_v_413`) ou issue B (deux ENTRY) (§6.1).
3. **Les orientations de la proposition**, si l'arbitrage veut les fixer dès le périmètre :
   - le cumul ou le découpage pour では, それでは, じゃ, じゃあ (A9, §2.3) ;
   - le sort de « de rien » (いいえ) et de « vraiment » (どうも) : sens ou nuance ;
   - le traitement de l'exemple altéré de いいえ.

**Laissés à la proposition** : les classes, le découpage des sens, les traductions, les fonctions
(sens par sens, A9), les types (A6) et les catégories (A5).

## 8. Où trouver les pièces dans l'export de relecture

| Fichier | Contenu |
|---|---|
| `06-lot-courant-rapports.md` | ce rapport, puis le rapport du préalable (arbitrage au §12) |
| `07-lot-courant-sources.md` | partie 1 : **les 13 fiches sources complètes**, avec le pré-remplissage mécanique et les anciens exemples de contexte ; partie 2 : les précédents validés cités (また, もう一度, それ, 大丈夫, 嫌, 悪い, 危ない, 違う, いかが, こちら, 大変) |
| `08-lot-courant.json` | aucun fichier de lot : la liste des 13 identifiants candidats |
| `09-journal-lot-courant.json` | vide : aucune décision |
| `04-addenda.md` | A5, A6, A7 et **A9 validé** |
| `10-diff-et-controles.md` | le diff contre `fac6a60` et les contrôles |

## 9. Arbitrage du périmètre (2026-10-06)

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle »). Les
décisions retenues :

1. **Périmètre approuvé** : « Liaison, échange et formules sociales », **13 entrées** ; les 14
   entrées de quantité, de degré et de comparaison sont reportées ; など reste hors périmètre.
2. **じゃ et じゃあ** : deux ENTRY ; les sources ne suffisent pas à établir leur identité lexicale ;
   **aucune fusion**.
3. **では, それでは, じゃ, じゃあ** : distinguer les emplois réellement établis par les fiches ; ne
   pas créer un SENSE fourre-tout pour éviter la polysémie ; cumul A9 seulement lorsque deux rôles
   sont intégraux au même emploi.
4. **いいえ** : « De rien » est un SENSE distinct du sens « Non ».
5. **どうも** : « Vraiment (particule d'atténuation) » est un SENSE distinct de « Merci » ; le vague
   sentiment de gêne ou d'incertitude reste en nuance, sauf preuve plus forte dans la fiche.
6. **そうして** : succession et addition peuvent rester dans un même sens de liaison.
7. **それから** : privilégier le sens temporel unique ; « énumérer des éléments » reste en nuance tant
   qu'aucun second sens n'est nécessaire.
8. **Exemple corrompu de いいえ** : journaliser l'anomalie ; ne pas inventer de correction ni de
   remplacement à partir des anciens exemples.

**Ce qu'il autorise** : la proposition lexicale complète, tout en `proposed`. **Ce qu'il n'autorise
pas** : ni validation, ni commit, ni push.

**Suite donnée** : proposition lexicale en `proposed`, décisions D1436 à D1509 (rapport
`docs/rapports/etape2-A2-04-lot23-proposition.md`).
