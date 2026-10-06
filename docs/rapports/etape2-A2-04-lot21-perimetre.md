# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 21 · Périmètre proposé « Fréquence, répétition et repères temporels »

**Date** : 2026-10-06
**Nature** : proposition de périmètre, pour relecture puis arbitrage. **Aucune décision lexicale** :
aucun fichier de lot, aucune décision de journal, aucune règle n'est créé ni modifié.
**État** : périmètre **arbitré le 2026-10-06** (§9), par ChatGPT, sur délégation de l'utilisateur
(`CLAUDE.md`, §5, « Contrôle »). Les §1 à §8 restent le rapport tel qu'il a été relu.

---

## 1. Méthode

Le lot 20 est clos : validé, committé (`bcbc85c`), suivi du commit de documentation `55acc13`, et
**poussé** : `ocha-v2` et `origin/ocha-v2` sont tous deux à `55acc13`. État réel relevé avant ce
rapport :

- assemblage réel : **638 ENTRY, 32 retraits, 49 entrées non décidées**, 0 problème, 0 erreur,
  0 attente ;
- journal : 1 369 décisions (D0001 à D1369), toutes `validated` ; 21 fichiers de lot (lot 00 à
  lot 20), aucune entrée en `proposed` ;
- tests : 470, tous verts.

Les 49 entrées restantes : **aucun verbe**, 2 noms, 5 adjectifs, et 42 adverbes, conjonctions et
interjections. Elles sont toutes listées et regroupées au §4.

Le périmètre proposé en retient **12** : les dix adverbes de temps et de fréquence réservés par
l'arbitrage du périmètre du lot 13 (« à examiner au regard d'A7, sens par sens »), だんだん, et
l'adjectif 早い, réservé depuis le même arbitrage et laissé hors du lot 17. Chaque fiche a été lue en
entier : traductions, nuance **et exemple**.

**Contrôles par script**, sur les sources figées et les 21 fichiers de lot existants :
- les 12 identifiants sont distincts, présents dans la source, non décidés, absents de tout lot ;
- **une lecture est en exception**, donc déjà décidable : もう一度, dont les furigana de la source
  sont mal formés (la balise de fin du second `<ruby>` est `</getKey>`) ; les 11 autres lectures
  sont mécaniques ;
- toutes les classes sont mécaniques (11 `adverbe`, 1 `adjectif_i`) ; aucune entrée n'est dans
  `CLASS_EXCEPTION_IDS`, et aucune liste fermée n'est modifiée par ce périmètre ;
- **aucun candidat de tag de lieu**, ni dans le périmètre ni dans les 49 entrées restantes.

## 2. Périmètre proposé : 12 entrées, en quatre groupes

### A. Fréquence et habitude (4)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_494` | いつも | いつも | Toujours ; habituellement ; en tout temps |
| `n5_v_519` | たいてい | たいてい | Généralement ; la plupart du temps ; en général ; presque toujours |
| `n5_v_506` | よく | よく | Souvent ; bien ; fréquemment |
| `n5_v_554` | 時々 | ときどき | Parfois ; de temps en temps ; quelquefois |

### B. Répétition (2)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_500` | また | また | À nouveau ; encore ; aussi ; de plus |
| `n5_v_503` | もう一度 | もういちど | Encore une fois ; une autre fois ; de nouveau |

### C. Repères dans le déroulement (5)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_501` | まだ | まだ | Encore ; pas encore (lorsqu'il est associé à une négation) |
| `n5_v_502` | もう | もう | Déjà ; plus (avec une négation) ; encore (un de plus) |
| `n5_v_518` | すぐに | すぐに | Tout de suite ; immédiatement ; aussitôt ; sans tarder |
| `n5_v_540` | 初めて | はじめて | Pour la première fois ; pour la première occurrence |
| `n5_v_425` | だんだん | だんだん | Graduellement ; peu à peu ; progressivement |

### D. Moment (1)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_454` | 早い | はやい | Tôt ; précoce |

## 3. Pourquoi ce thème, et faut-il scinder ou élargir ?

**L'intérêt pour Ocha.** Ce sont les adverbes des premières phrases sur sa journée : je prends
toujours mon petit-déjeuner, je regarde parfois des films, j'ai déjà mangé, ce n'est pas encore
prêt, encore une fois s'il vous plaît, j'ai mangé des sushis pour la première fois.

**C'est le groupe restant le plus décidable avec les normes existantes** :
- le registre des catégories a ce qu'il faut : `temps › frequence` (`frequent`, `occasionnel`,
  `rare`), `temps › chronologie` (`avant_apres`, `debut_fin`, `succession`), `temps ›
  moments_periodes`, `temps › duree`, `temps › relations_temporelles` ;
- la seule fonction qui puisse se poser, `deictique`, a une définition normative (addendum A7) ;
- des précédents validés existent pour la fréquence (毎日, 毎週, 毎年…) et pour un adverbe de temps
  déictique (近々).

Les autres groupes dépendent, pour une bonne part, de fonctions sans définition normative ou de
questions d'identité (§4, §6).

**Le titre est un regroupement de travail** : il n'oriente ni les catégories ni les types, et il
évite à dessein le mot « aspect », nom d'une fonction d'A2-LING sans définition.

**Scission : sans objet.** 12 entrées, c'est moins que d'habitude ; les groupes restants sont tous
petits (4 à 14 entrées).

**Élargissement : possible, non recommandé.** Les cinq adverbes de manière (ゆっくり, ゆっくりと,
まっすぐ, 弱く, 一緒) pourraient s'y joindre, pour un lot de 17. Je propose de ne pas le faire : ils
portent deux questions d'identité (弱く et 弱い, validée au lot 17, ce qui demanderait une
réouverture ; ゆっくり et ゆっくりと), une exception de classe (一緒) et une confusion probable de la
source (まっすぐ). Ces questions méritent leur propre arbitrage de périmètre, et le lot 21 resterait
ainsi sans aucune réouverture d'ENTRY validée.

## 4. Les 49 entrées restantes, regroupées

Les 12 entrées du périmètre proposé sont en gras. Les regroupements des autres sont des hypothèses
de travail, non des périmètres. Entre parenthèses : la traduction principale de la source.

### Temps, fréquence et répétition (12) : périmètre proposé

| Axe | Mots |
|---|---|
| **Fréquence et habitude** | **いつも, たいてい, よく, 時々** |
| **Répétition** | **また, もう一度** |
| **Repères dans le déroulement** | **まだ, もう, すぐに, 初めて, だんだん** |
| **Moment** | **早い** |

### Manière, direction, compagnie (5)

ゆっくり `n5_v_504` (lentement), ゆっくりと `n5_v_505` (lentement), まっすぐ `n5_v_525` (tout droit),
弱く `n5_v_450` (faiblement), 一緒 `n5_v_628` (ensemble).

### Identité, diversité, alternative, probabilité (4)

同じ `n5_v_438` (même), いろいろ `n5_v_421` (divers), 他 `n5_v_605` (autre), たぶん `n5_v_521`
(peut-être).

### Quantité et degré (14) : lot réservé

| Axe | Mots |
|---|---|
| Quantité | 多い `n5_v_654` (nombreux), 少ない `n5_v_447` (peu nombreux), 大勢 `n5_v_655` (beaucoup de monde), たくさん `n5_v_520` (beaucoup), 少し `n5_v_509` (un peu), ちょっと `n5_v_497` (un peu) |
| Totalité | 全部 `n5_v_639` (tout) |
| Degré et comparaison | とても `n5_v_498` (très), あまり `n5_v_515` (pas tellement), もっと `n5_v_607` (plus), 一番 `n5_v_517` (le plus), 結構 `n5_v_471` (assez) |
| Mesure et approximation | ちょうど `n5_v_496` (exactement), 大体 `n5_v_546` (en général ; à peu près) |

### Liaison et discours (9)

しかし `n5_v_593` (cependant), でも `n5_v_599` (mais), そうして `n5_v_596` (et puis), それから
`n5_v_416` (ensuite), では `n5_v_418` (alors), それでは `n5_v_417` (alors), じゃ `n5_v_595` (alors),
じゃあ `n5_v_413` (alors), など `n5_v_602` (etc.).

### Réponses et politesse (5)

はい `n5_v_344` (oui), ええ `n5_v_586` (oui), いいえ `n5_v_584` (non), どうぞ `n5_v_600` (s'il vous
plaît), どうも `n5_v_499` (merci).

**Total** : 12 + 5 + 4 + 14 + 9 + 5 = 49.

### Une suite possible, pour information

Hypothèse de travail, à arbitrer lot par lot, jamais d'avance :

| Lot | Groupe | Ce qui le conditionne |
|---|---|---|
| 21 | Temps, fréquence et répétition (12) | rien de nouveau : A7, la doctrine du lot 20 sur les fonctions |
| 22 | Manière, identité, diversité, alternative, probabilité (9) | questions d'identité (弱く, ゆっくりと), classes (一緒, 同じ), sans fonction nouvelle si la doctrine du lot 20 est reconduite |
| 23 | Liaison, discours, réponses et politesse (14) | les fonctions `connecteur`, `discours`, `politesse` ; la classe de など |
| 24 | Quantité et degré (14) | les fonctions `quantificateur`, `comparatif`, `intensifieur` (et `negation` pour あまり) |

### Voisins déjà validés, utiles à la cohérence

| Mot | Lot | Ce qui est validé |
|---|---|---|
| 毎日, 毎晩, 毎朝, 毎週 | 12 | `temps › frequence › frequent`, `concept_abstrait`, aucune fonction |
| 毎年, 毎月 | 00 | de même |
| 近々 | 12 | adverbe, « Bientôt », `temps › moments_periodes › futur`, `concept_abstrait`, **`deictique`** |
| 近く, sens 2 | 10 | « Prochainement », sans fonction ; réservé à l'audit A2-05 de la deixis temporelle |
| 今 | 12 | « Maintenant », `deictique` |
| 後, 前, 先 | 13, 10 | 後 : `deictique` sur le sens temporel ; 前 et 先 : sens temporels sans fonction, joints à l'audit A2-05 |
| 初め | 20 | « Début », `temps › chronologie › debut_fin` |
| 次 | 20 | « Suivant », sans catégorie, **pas de `deictique`** (une succession dans une séquence ne suffit pas à A7) |
| 遅い | 17 | deux sens : « Lent » (vitesse) ; « En retard » (`temps`, niveau 1, `propriete`) |
| 速い | 17 | « Rapide », `espace_proprietes_spatiales › vitesse` |
| いい | 00 | « Bon », `propriete` ; いい seule lecture, よい dans la nuance |
| 大変 | 00 | sens « Très », `intensifieur` (posé sans définition normative) |

## 5. Cas sensibles du périmètre proposé

Ils sont relevés ici, aucun n'est tranché.

### 5.1. Frontière mécanique

- **もう一度** : seul le champ `word_furigana` est fautif. Le détail exact :

  | Champ de la fiche `n5_v_503` | Valeur, telle quelle |
  |---|---|
  | `word` | `もう一度` |
  | `word_furigana` | `もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</getKey></ruby>` |
  | `reading` | `もういちど` |
  | `romaji` | `mouichido` |
  | `kanji_list` | `一`, `度` |
  | furigana de l'exemple | `もう<ruby>一<rt>いち</rt></ruby><ruby>度<rt>ど</rt></ruby>` |

  Dans le second `<ruby>`, la balise qui ferme `<rt>ど` est `</getKey>` au lieu de `</rt>`.
  L'analyseur du validateur (`parseFurigana`) refuse la chaîne (« `</rt>` attendu ») ; la couche
  mécanique classe donc la lecture en exception (« furigana incohérents avec la forme »). Les kana,
  le romaji et la liste des kanji sont cohérents entre eux. La chaîne de l'exemple, elle, est bien
  formée : son texte de base est もう一度 et sa lecture recomposée もういちど, égale aux kana (A8,
  vérifié par la même fonction). Seule la segmentation いち / ど sur 一 / 度 est en jeu, et la fiche
  la donne deux fois (champ fautif et exemple), à l'identique hors la balise. Lecture décidable, à
  reprendre de la fiche elle-même ; aucune liste fermée n'est concernée.
  (Même défaut, hors du périmètre : 一緒, `</guasubi>` au lieu de `</rt>`.)
- **すぐに** : la forme contient la particule に, et le champ `particles` de la source vaut `["に"]`.
  Cette に fait partie du mot ; elle n'est pas une particule régie. すぐ n'est pas une entrée des
  sources : aucune forme n'est ajoutée.
- **Exemples fautifs** (non migrés, à signaler au registre de phrases) : たいてい (« じchiじ » pour
  じゅうじ), すぐに (« きた まし た »), また (français « Regardons-nous » pour « revoyons-nous »).

### 5.2. Identité

- **よく et いい** (`v_420`, validée au lot 00) : la fiche de よく donne deux emplois, « souvent »
  (son sens principal, et son exemple) et « bien », qu'elle dit « issu de l'adjectif ii / yoi ».
  L'emploi « bien » est la forme adverbiale de いい, comme 弱く l'est de 弱い. **Je propose de garder
  よく comme ENTRY distincte**, sans fusion ni réouverture de いい : son premier sens, la fréquence,
  ne se tire pas de いい. Reste à la proposition : « bien » en sens, ou en nuance. Cet arbitrage ne
  préjuge pas du cas de 弱く, dont la fiche ne décrit que la forme en -ku.
  **Les pièces de la comparaison**, toutes dans l'export (`07`) :

  | | よく `n5_v_506` (non décidée) | いい `n5_v_420` (validée, lot 00) | 良い `n5_v_583` (retirée dans `n5_v_420`) |
  |---|---|---|---|
  | Ancien type | adverbe | adjectif en i | adjectif |
  | Lecture | よく | « いい / よい » | いい (furigana よ sur 良) |
  | Traductions | Souvent ; bien ; fréquemment | Bon ; bien ; chouette ; bienveillant | Bien ; bon ; superbe ; excellent ; correct |
  | Ce que dit la nuance | fréquence élevée (« souvent »), ou action faite de manière approfondie ou satisfaisante (« bien / habilement », « issu de l'adjectif ii / yoi ») | forme formelle *yoi*, *ii* plus courant à l'oral, « les deux partagent les mêmes formes conjuguées » | *ii* plus fréquente au présent affirmatif |
  | Exemple | « わたし は よく えいが を み ます » : je regarde **souvent** des films | « きょう は 良い てんき です ね » | le même |

  **Décisions validées sur いい** : D0036 (fusion de 良い dans いい, même unité), D0037 (forme
  usuelle いい, 良い en autre graphie ; よい non structurée, décrite en nuance), D0053 (« superbe »,
  « excellent », « correct » abandonnées), D0065 (catégorie nulle). L'ENTRY validée a un seul sens,
  « Bon » (`propriete`), avec « Bien » parmi ses autres traductions, et cette nuance : « Forme écrite
  ou soutenue : よい (良い). Les formes conjuguées viennent de よい : よかった, よくない. » **La forme
  adverbiale よく n'y est pas nommée** ; seule la fiche de よく fait le lien. Rien de ce qui précède
  ne vient d'une connaissance externe.
- **もう et もう一度** : deux entrées ; la fiche de もう一度 la dit composée de もう et de 一度 (absent
  des sources). La troisième traduction de もう (« encore, un de plus ») est l'emploi qui entre dans
  もう一度. Aucune fusion envisagée.
- **また et もう一度** : « de nouveau » est dans les deux fiches. Deux traductions voisines ne font
  ni une fusion, ni un sens commun.
- **初めて et 初め** (lot 20) : la fiche de 初めて le dit dérivé de la forme en -te de « hajimeru » ;
  celle de 初め, dérivé du même verbe, absent des sources. Aucune relation.
- **早い et 速い** (lot 17) : la fiche de 早い dit elle-même s'en distinguer par le kanji. Deux mots.

### 5.3. Fonctions linguistiques : ne rien ouvrir implicitement

Plusieurs fiches pourraient tenter une fonction d'A2-LING qui n'a pas de définition normative :

| Mot | Fonction tentante | Ce que dit la fiche |
|---|---|---|
| まだ, もう | `aspect` ; `negation` | « pas encore », « ne… plus » : la négation est portée par le verbe, l'adverbe l'accompagne |
| だんだん, 初めて | `aspect` | progression ; première occurrence |
| いつも, たいてい, よく, 時々 | `quantificateur` | une fréquence, que les précédents (毎日…) rangent en `temps › frequence` sans fonction |
| また | `connecteur` | « de plus » : « servant à lier des arguments » |
| また, もう一度 | `discours`, `politesse` | « mata ne » pour prendre congé ; demander la répétition (« もう一度おねがいします ») |

**Je propose de reconduire la doctrine du lot 20** : aucune fonction sans définition normative. La
seule fonction décidable est `deictique`, selon A7, sens par sens (§5.4). Les emplois de liaison, de
congé ou de demande se décrivent en nuance, comme les emplois d'adresse du lot 16.

### 5.4. La deixis temporelle (A7)

C'est la réserve posée par le lot 13 pour ces adverbes. Aucun d'eux ne désigne un moment repéré par
rapport au moment où l'on parle, comme 今 ou 明日. Trois cas sont à peser :

- **すぐに** (« tout de suite ») : l'exemple (« il est venu tout de suite ») repère l'immédiateté par
  rapport à un autre événement, non au moment de l'énonciation. Mais **近々 « Bientôt » est validé
  avec `deictique`** (lot 12), et 近く « prochainement » est réservé à l'audit A2-05 : la cohérence
  avec ces deux sens est à surveiller.
- **もう, まだ** : « déjà », « encore » se repèrent par rapport à un moment de référence, qui peut
  être le présent (もう ひるごはん を たべました) mais ne l'est pas nécessairement.
- **初めて** : « pour la première fois de sa vie » ; la référence est la vie du sujet, non la
  situation d'énonciation.

**Je penche pour aucune fonction `deictique` dans ce lot**, A7, §4 (la fonction n'est posée que si
l'emploi déictique fait partie intégrante du sens modélisé), avec la même prudence que pour 次. À
arbitrer avant la proposition ; la décision se prendra ensuite sens par sens.

### 5.5. Catégories, types et dimensions

- **Fréquence** : `temps › frequence` et ses trois niveaux 3 (`frequent`, `occasionnel`, `rare`)
  s'offrent à いつも, たいてい, よく (« souvent ») et 時々. Les précédents de fréquence sont en
  `concept_abstrait`. 近々, seul adverbe de temps validé, l'est aussi.
- **Répétition** (また, もう一度) : aucune catégorie « répétition » ; `temps › frequence` ou
  `temps › chronologie › succession` ? Une catégorie nulle (A5) se justifierait aussi. Aucune ne
  serait cherchée pour réduire les avertissements (arbitrage du lot 20).
- **まだ, もう, だんだん, 初めて, すぐに** : `temps › chronologie`, `temps › relations_temporelles`
  (niveau 2 sans niveau 3), ou rien ?
- **早い** : « En retard », sens 2 de 遅い, est validé en `temps` au niveau 1, en `propriete`. Le
  rapprochement est naturel, sans être imposé (aucune symétrie entre deux entrées, arbitrage du
  lot 15).
- **Dimensions** : l'axe `Habituel ↔ Exceptionnel` d'A2-DIM (normalité) pourrait tenter いつも et
  たいてい. Le principe du lot 16 s'applique : un axe n'est employé que s'il décrit directement le
  sens.
- **Types** : pour un adverbe, les précédents sont `concept_abstrait` (近々, fréquence) ou un type nul
  (les adverbes interrogatifs, qui portent une fonction). Un `semantic_type: null` sans fonction
  demande une décision `type-nul` (A6).

### 5.6. Sens et doctrine

Ce qui suit dit ce que la proposition aura à peser, sans le trancher.

1. **いつも** : « Toujours » et « habituellement » ; un seul référent, la constance d'une habitude.
2. **たいてい** : une forte régularité, « sans pour autant constituer une règle absolue ».
3. **よく** : la fréquence (exemple) et « bien » (§5.2) ; deux référents, ou un sens et une nuance.
4. **時々** : une fréquence intermittente ; la nuance parle aussi du kanji d'itération 々.
5. **また** : la répétition (sens principal, exemple), « aussi / de plus » (liaison), et la prise de
   congé (« mata ne »). Deux référents, ou un sens et des nuances ?
6. **もう一度** : la répétition d'une action, et la formule de demande (« répétez s'il vous plaît »).
7. **まだ** : la continuation (« encore ») et, avec une négation, « pas encore » ; l'exemple
   (« ごはん は まだ です ») illustre le second. Deux traductions d'un même sens, ou deux sens ?
8. **もう** : « déjà » (exemple), « ne… plus » avec une négation, « encore, un de plus ». Jusqu'à trois
   emplois ; le troisième n'est développé ni par la nuance ni par l'exemple.
9. **すぐに** : un seul référent, l'absence de délai.
10. **初めて** : un seul référent ; « Pour la première occurrence » redit la première traduction.
11. **だんだん** : un seul référent, un changement progressif.
12. **早い** : un moment matinal, ou une action avant l'heure habituelle ; « Précoce ».

## 6. Les fonctions linguistiques sans définition, et ce qu'elles bloquent

A2-LING-v1 fixe 14 fonctions (9 grammaticales, 5 pragmatiques et discursives). **Seule `deictique` a
une définition normative** (addendum A7). Deux autres ont été appliquées sur un sens implicite :
`interrogatif` (17 sens, lots 00, 05, 11) et `intensifieur` (le sens « Très » de 大変, lot 00).

| Fonction | Définition | Mots restants qu'elle pourrait toucher | Effet |
|---|---|---|---|
| `deictique` | **oui (A7)** | すぐに, もう, まだ (lot 21) | décidable sens par sens |
| `aspect` | non | まだ, もう, だんだん, 初めて | contournable : doctrine du lot 20 (aucune fonction) |
| `temps` | non | aucun nettement | — |
| `negation` | non | いいえ ; あまり (toujours avec négation) ; まだ, もう, とても (avec négation) | まだ, もう : contournable ; いいえ, あまり : à peser |
| `quantificateur` | non | 多い, 少ない, 大勢, たくさん, 全部, 少し, ちょっと ; fréquences (contournable) | **bloquant** pour le lot « quantité et degré » |
| `comparatif` | non | もっと, 一番 ; 同じ ? | **bloquant** pour もっと et 一番 |
| `intensifieur` | non (appliquée à 大変) | とても, 結構, あまり, ちょっと (atténuation) | **bloquant** : un précédent existe sans définition |
| `modalite` | non | たぶん | contournable : l'axe `probabilite` d'A2-DIM existe (précédent : 出来る, `possibilite`, sans `modalite`) |
| `connecteur` | non | しかし, でも, そうして, それから, では, それでは, じゃ, じゃあ ; また (« de plus ») | **bloquant** pour les mots de liaison : leur sens *est* la fonction |
| `discours` | non | じゃ, じゃあ, では, それでは (transition, prise de congé) ; はい, ええ | **bloquant** pour les mots de liaison et les réponses |
| `politesse` | non | どうぞ, どうも, いいえ (« de rien »), それでは (« sur ce »), 結構 (refus poli) | **bloquant** pour les formules ; le lot 01 l'a refusée aux termes d'adresse |
| `alternative` | non | 他 | contournable (doctrine du lot 20) |
| `pluralisation` | non | など ? (énumération non exhaustive) | à peser |
| `interrogatif` | non (appliquée) | aucun restant | — |

**Ce qu'il en ressort** :
- **le lot 21 proposé n'en dépend pas**, si la doctrine du lot 20 est reconduite (§5.3) ;
- pour les **mots de liaison et les réponses** (14 entrées), la doctrine du lot 20 ne suffit pas : on
  ne peut pas renvoyer en nuance l'emploi qui fait tout le sens de しかし ou de どうぞ. Il faudra soit
  une définition (addendum) de `connecteur`, `discours` et `politesse`, soit décider explicitement
  qu'ils restent sans fonction, avec `category: null` et un type nul justifiés (A5, A6) ;
- pour le **lot « quantité et degré »** (14 entrées), la question réservée depuis le lot 14 reste
  entière : `quantificateur`, `comparatif`, `intensifieur`, avec le précédent de 大変 ;
- **など** pose en plus une question de classe : la fiche la dit « particule suffixe », et le registre
  des classes (A2-02, verrouillé) n'a pas de classe « particule ».

Ces questions ne sont pas à trancher maintenant ; elles le seront avant le périmètre des lots
concernés.

## 7. Ce qui est à arbitrer

1. **Le thème et le périmètre** : « Fréquence, répétition et repères temporels », 12 entrées (11
   adverbes, 1 adjectif), sans scission ; les cinq adverbes de manière hors du lot (§3).
2. **Les fonctions linguistiques** (§5.3) : reconduire la doctrine du lot 20, aucune fonction sans
   définition normative ; `deictique` examinée selon A7 seulement.
3. **La deixis temporelle** (§5.4) : aucune fonction `deictique` dans ce lot, ou un examen ouvert
   sens par sens à la proposition, en particulier pour すぐに au regard de 近々.
4. **L'identité de よく** (§5.2) : ENTRY distincte, sans fusion ni réouverture de いい.
5. **Les relations** : report intégral à la passe finale 5.16, `relations: []` partout. Trois fiches
   nomment un autre mot des sources : よく (« issu de ii / yoi »), 早い (« se distingue de hayai,
   rapide ») et もう一度 (« composée de mou »). Elles le font pour dire une origine ou une
   distinction, non une relation de sens : je propose de n'en inscrire aucune comme candidate à
   5.16. まだ et もう, opposées par l'usage, ne se nomment pas l'une l'autre.

Laissés à la proposition, parce qu'ils se décident sur pièces : les furigana de もう一度, les
catégories et types, le nombre de sens de よく, また, まだ et もう.

Aucune proposition lexicale ne sera écrite avant l'arbitrage de ce périmètre.

## 8. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport, en entier | `06-lot-courant-rapports.md` |
| Les 12 fiches sources intégrales (traductions, nuance, exemple), le pré-remplissage mécanique et les anciens exemples de contexte | `07-lot-courant-sources.md`, partie 1 |
| Les précédents validés cités ici, chacun avec sa fiche source, son état validé et ses décisions de journal : notamment 近々, 近く, 今, 明日, 後, 前, 先, 次, 初め, 毎日 et les autres fréquences, 遅い, 速い, 弱い, 大変, いい, et la fiche du doublon 良い (`n5_v_583`, retiré dans いい) | `07-lot-courant-sources.md`, partie 2 |
| Addendum A7 (`deictique`), en entier, avec A5, A6 et A8 | `04-addenda.md` |
| Registre A2-LING (les 14 fonctions), catégories A2-L3, types A2-ST, dimensions A2-DIM | `03-references-A2.md` |
| Règles mécaniques et listes fermées (`rules.mjs`) | `02-conception.md` |
| Les 49 entrées restantes, regroupées | ce rapport, §4 |
| Les contrôles de périmètre | ce rapport, §1 ; contrôles relancés à l'export : `10-diff-et-controles.md`, §2 ; état relevé par l'outil : `05-relais.md`, partie 2 |
| Les identifiants candidats (aucun fichier de lot) | `08-lot-courant.json` ; `09` est vide, aucune décision |

## 9. Arbitrage du périmètre (2026-10-06)

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle »), après
relecture de l'export complet. Les décisions retenues :

1. **Périmètre retenu intégralement** : « Fréquence, répétition et repères temporels », **12
   entrées** : いつも, たいてい, よく, 時々, また, もう一度, まだ, もう, すぐに, 初めて, だんだん, 早い.
   Pas de scission, pas d'élargissement ; les cinq adverbes de manière restent hors du lot.
2. **Doctrine du lot 20 reconduite** : aucune fonction A2-LING sans définition normative. Seule
   `deictique` est décidable, selon A7.
3. **Aucune des 12 entrées ne porte `deictique`.** En particulier, すぐに exprime l'absence de délai
   relativement à un repère ou à un événement ; contrairement à 近々, son sens n'est pas
   intrinsèquement un futur proche repéré depuis le moment d'énonciation.
4. **よく reste une ENTRY distincte de いい** : pas de fusion, pas de réouverture de `v_420`. Le
   traitement de l'emploi « bien » est décidé dans la proposition.
5. **Relations** : `[]` partout, et aucune nouvelle candidate à 5.16. Les liens documentés よく /
   いい, 早い / 速い et もう一度 / もう relèvent respectivement de l'origine, de la distinction et de
   la composition, non d'une relation sémantique officielle.

**Laissés à la proposition** : les furigana de もう一度 ; les catégories, types et dimensions ; le
découpage éventuel des sens de よく, また, まだ et もう.

**Ce qu'il n'autorise pas** : ni la validation du lot 21, ni un commit, ni un push.

**Suite donnée** : proposition lexicale en `proposed`, décisions à partir de D1370 (rapport
`docs/rapports/etape2-A2-04-lot21-proposition.md`).
