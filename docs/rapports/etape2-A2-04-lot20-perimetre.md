# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 20 · Périmètre proposé « Existence, possession, action et déroulement »

**Date** : 2026-10-06
**Nature** : proposition de périmètre, pour relecture puis arbitrage. **Aucune décision lexicale** :
aucun fichier de lot, aucune décision de journal, aucune règle n'est créé ni modifié.
**État** : périmètre **arbitré le 2026-10-06** (§7), par ChatGPT, sur délégation de l'utilisateur. Les §1 à §6 restent le rapport tel
qu'il a été relu.

---

## 1. Méthode

Après le lot 19 (commit `9e75c99`), l'assemblage réel compte 616 ENTRY, 32 retraits et **71 entrées
non décidées** : 14 verbes, 10 noms, 42 adverbes, conjonctions et interjections, et 5 adjectifs.

Le périmètre proposé en retient 22 : **les 14 derniers verbes** et 8 noms généraux. Après lui, il ne
resterait plus aucun verbe à décider. Chaque fiche a été lue en entier : traductions, nuance **et
exemple**.

**Contrôles par script**, sur les sources figées et les 20 fichiers de lot existants (lots 0 à 19) :
- les 22 identifiants sont distincts, présents dans la source, non décidés, absents de tout lot ;
- **deux lectures sont en exception**, donc déjà décidables : 出来る (les furigana de la source ont
  pour texte de base 出きる, non 出来る) et 初め (furigana はじめ sur 初, suivis de め : ils
  contredisent les kana, addendum A8) ; les 20 autres lectures sont mécaniques ;
- toutes les classes sont mécaniques (`verbe` ou `nom`) ; aucune liste fermée n'est modifiée par ce
  périmètre ;
- **une entrée a un candidat de tag de lieu** : 次 (`lieu_gare`), à arbitrer individuellement
  (§5.6).

**Le lot « quantité et degré » n'est pas ouvert** : ni 大勢, ni 多い, ni 少ない, ni les adverbes de
quantité et de degré ne sont dans ce périmètre (§4).

## 2. Périmètre proposé : 22 entrées, en cinq groupes

### A. Exister, avoir, avoir besoin (4)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_516` | ある | ある | Exister ; y avoir ; posséder ; se trouver (pour les objets inanimés) |
| `n5_v_548` | 居る | いる | Être ; se trouver ; y avoir (pour les êtres vivants) |
| `n5_v_665` | 持つ | もつ | Tenir ; porter (en main) ; posséder ; avoir sur soi |
| `n5_v_573` | 要る | いる | Avoir besoin de ; être nécessaire ; falloir |

### B. Pouvoir, devenir, différer, être en difficulté (4)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_523` | 出来る | できる | Pouvoir ; être capable de ; réussir ; être achevé / prêt |
| `n5_v_524` | なる | なる | Devenir ; se transformer en ; prendre forme |
| `n5_v_361` | 違う | ちがう | Être différent ; se tromper ; c'est faux ; être incorrect |
| `n5_v_544` | 困る | こまる | Avoir des ennuis ; être embarrassé ; être dans l'embarras ; être en difficulté |

### C. Faire, regarder (3)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_181` | する | する | Faire ; coûter (pour un prix) ; valoir |
| `n5_v_608` | やる | やる | Faire ; donner (à des plantes, des animaux) ; jouer (à un jeu, un sport) |
| `n5_v_698` | 見る | みる | Voir ; regarder ; examiner ; observer |

### D. Commencer, finir, durer (5)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_547` | 始まる | はじまる | Commencer (intransitif) ; débuter |
| `n5_v_470` | 終わる | おわる | Finir ; terminer ; prendre fin ; s'achever |
| `n5_v_163` | かかる | かかる | Prendre (du temps ou de l'argent) ; coûter ; prendre du temps |
| `n5_v_645` | 初め | はじめ | Début ; commencement ; au début |
| `n5_v_675` | 次 | つぎ | Suivant ; prochain ; ensuite |

### E. Noms généraux (6)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_684` | 物 | もの | Chose ; objet ; article ; bien matériel |
| `n5_v_664` | 所 | ところ | Endroit ; lieu ; place ; partie |
| `n5_v_703` | 辺 | へん | Région ; environs ; alentours ; quartier |
| `n5_v_511` | 問題 | もんだい | Problème ; question (d'examen) ; sujet de discussion ; affaire |
| `n5_v_646` | 力 | ちから | Force ; puissance ; énergie ; capacité physique ou mentale |
| `n5_v_653` | 声 | こえ | Voix ; cri (d'animal) |

## 3. Pourquoi ce thème, et faut-il scinder ou élargir ?

**L'intérêt pour Ocha.** Ce sont les verbes les plus fréquents de la langue, ceux des toutes
premières phrases : il y a un livre (ある), il y a un enfant (居る), je fais (する), je deviens (なる),
je peux (出来る), ça commence, ça finit. Ils ont été gardés pour la fin parce qu'ils sont les plus
délicats à modéliser, non parce qu'ils sont secondaires.

**Le titre est un regroupement de travail** : il n'oriente ni les catégories ni les types.

**Ce lot se décide fiche par fiche**, et pose plus de questions de principe que les précédents
(§5). Aucun blocage ne m'empêche de préparer le périmètre ; plusieurs points demandent un arbitrage
**avant** la proposition, pour ne rien ouvrir implicitement.

**Scission : possible, non recommandée.** La coupe naturelle passerait entre les verbes (A à D, 14
verbes et deux noms qui leur tiennent, 初め et 次) et le groupe E (6 noms généraux), qui pourrait
attendre un lot de noms. Je propose de les garder : ces six noms n'ont pas d'autre lot d'accueil, et
22 entrées est une taille ordinaire.

**Élargissement : non recommandé.** 他 et 大勢, les deux noms laissés de côté, touchent à des
questions réservées (§4).

## 4. Les 71 entrées restantes, regroupées

Les 22 entrées du périmètre proposé sont en gras. Les regroupements des autres sont des hypothèses
de travail, non des périmètres.

### Verbes (14)

| Axe | Verbes |
|---|---|
| **Exister, avoir, avoir besoin** | **ある, 居る, 持つ, 要る** |
| **Pouvoir, devenir, différer, être en difficulté** | **出来る, なる, 違う, 困る** |
| **Faire, regarder** | **する, やる, 見る** |
| **Commencer, finir, durer** | **始まる, 終わる, かかる** |

### Noms (10)

| Axe | Noms |
|---|---|
| **Début et ordre** | **初め, 次** |
| **Noms généraux** | **物, 所, 辺, 問題, 力, 声** |
| Reste et alternative | 他 |
| Quantité de personnes (lot réservé) | 大勢 |

### Adverbes, conjonctions, interjections (42)

| Axe | Mots |
|---|---|
| Fréquence et habitude | いつも, よく, 時々, たいてい, また, もう一度 |
| Temps et aspect | まだ, もう, すぐに, 初めて, だんだん |
| Quantité et degré (lot réservé) | とても, もっと, 少し, ちょっと, たくさん, あまり, 全部, 一番, 結構, ちょうど, 大体 |
| Manière | ゆっくり, ゆっくりと, まっすぐ, 弱く, 一緒 |
| Probabilité | たぶん |
| Liaison et discours | しかし, でも, そうして, それから, では, それでは, じゃ, じゃあ, など |
| Réponses et politesse | はい, ええ, いいえ, どうぞ, どうも |

### Adjectifs (5)

| Axe | Adjectifs |
|---|---|
| Quantité (lot réservé) | 多い, 少ない |
| Temps | 早い |
| Identité et diversité | 同じ, いろいろ |

**Ce qui reste hors du lot 20, et pourquoi** :

- **大勢** (« beaucoup de monde ») : une quantité de personnes. Je la rattache au lot « quantité et
  degré », réservé tant que la question normative des fonctions `quantificateur`, `comparatif` et
  `intensifieur` n'est pas résolue.
- **他** (« autre, en plus, le reste, en dehors de ») : la fiche décrit surtout la structure
  « hoka ni », un emploi de liaison ; la fonction `alternative` du registre n'a pas de définition
  normative. Je la laisse aux mots de liaison.
- **Les 42 adverbes et mots de liaison, et les 5 adjectifs** : aucun n'est touché.

**Après ce lot, il resterait 49 entrées**, sans aucun verbe : 2 noms, 42 adverbes et mots de
liaison, 5 adjectifs. Une part importante dépend de questions de fonctions linguistiques.

**Voisins déjà validés**, utiles à la cohérence :

| Mot | Lot | Ce qui est validé |
|---|---|---|
| 出る | 04 | trois sens, dont « Apparaître » (`evenement`) |
| 分かる, 知る | 06 | Comprendre, Savoir (`etat`) |
| 開く, 閉まる | 18 | un seul sens `evenement`, l'état résultant en nuance |
| 寝る | 19 | « Dormir » (`etat`) et « Se coucher » (`action`) |
| 上げる | 19 | Donner (interactions sociales) ; Lever |
| かける | 08 | trois sens (appel, lunettes, accrocher) ; écrit en hiragana |
| 見せる | 08 | Montrer (`action`) |
| 鳴く | 07 | Crier (animal) |
| 強い | 17 | Fort, sans catégorie |
| 時間 | 13 | validé avec `counter: null` ; le registre des compteurs n'a aucune durée |

## 5. Cas sensibles

Ils sont relevés ici, aucun n'est tranché. Chaque fiche a été lue en entier, exemple compris.

### 5.1. Frontière mécanique

- **出来る** : furigana de la source sur 出きる (で sur 出, puis きる), sans le 来 de la forme ;
  l'exemple a le même défaut. Lecture décidable. **Je ne sais pas encore quel découpage la source
  fonde** : elle donne で pour 出 et laisse き sans kanji ; la répartition de でき sur 出来 n'est
  attestée nulle part dans la fiche. C'est un cas pour le §3 de l'addendum A8 (bloc par nécessité),
  à arbitrer à la proposition.
- **初め** : furigana はじめ sur 初, suivis de め. Lecture décidable (A8).
- **居る** : la forme de l'entrée est en kanji, et elle est mécanique. La fiche de 要る nomme ce
  verbe « 居る et いる (exister) » : la graphie いる est donc citée par une autre fiche, mais **la
  fiche de 居る elle-même ne la donne pas**. À arbitrer : l'ajouter comme autre graphie sur la foi
  de la fiche de 要る, ou s'en tenir à la fiche de l'entrée. La forme usuelle, elle, reste à
  signaler pour la passe finale, comme celle de 煙草.
- **かかる** : la fiche dit que le mot « s'écrit le plus souvent directement en hiragana », « bien
  qu'il soit issu du kanji 掛かる », et son exemple l'écrit 掛かります. Une graphie 掛かる est donc
  documentée ; ses furigana, dans la source, sont un bloc qui couvre aussi l'okurigana. À arbitrer :
  ajouter cette graphie, et avec quels furigana.
- **要る, 終わる** : l'exemple de 要る écrit ぱソコン (hiragana et katakana mêlés) ; celui de 終わる
  porte des furigana sur 終り, sans le わ. Les exemples ne sont pas migrés ; les formes des deux
  entrées sont saines.

### 5.2. Les fonctions linguistiques : ne rien ouvrir implicitement

Le registre A2-LING a neuf fonctions grammaticales (dont `modalite`, `aspect`, `temps`,
`negation`) et cinq pragmatiques. **Seule `deictique` a une définition normative** (addendum A7).
Plusieurs fiches de ce lot pourraient tenter une fonction :

- **出来る** (« pouvoir, être capable de ») : `modalite` ?
- **なる** (« devenir ») : `aspect` ?
- **ある, 居る** : verbes d'existence ; aucune fonction du registre ne nomme l'existence.
- **次** (« ce qui vient immédiatement après dans l'ordre, le temps ou l'espace ») : `deictique`
  temporel, au sens d'A7 ?

**Je propose de ne poser aucune fonction sans définition normative dans ce lot**, comme les lots 15
à 19 l'ont fait (emplois d'adresse conservés en nuance, sans fonction). La seule fonction
décidable est `deictique`, et seulement pour 次, sens par sens, selon A7. À arbitrer avant la
proposition.

### 5.3. Types sémantiques : l'existence, la capacité, le besoin

Aucun verbe d'existence n'est encore validé. Les types disponibles pour un verbe sont `action`,
`processus`, `evenement`, `etat`. Seraient à peser, fiche par fiche :

- **ある, 居る, 要る** : `etat` (« exprimant l'existence, la présence », « la nécessité »), comme
  知る et 分かる.
- **出来る** : la capacité (`etat` ?) et « être achevé / prêt » (`evenement` ?).
- **違う** : « être différent » (`etat` ou `propriete` ?).
- **困る** : « une situation délicate » ; la fiche dit la forme en -te iru pour « un état
  persistant ». Le principe de l'état résultant (lots 18 et 19) s'applique-t-il, et avec quel
  type ?
- **なる, 始まる, 終わる** : des changements (`evenement` ?).
- **かかる** : « l'exigence ou la consommation d'une ressource ».

Je ne recommande aucun type à ce stade ; le relevé sert à montrer que **le lot peut se décider avec
les types existants**, sans addendum.

### 5.4. Les homophones et les mots que les fiches nomment

- **居る et 要る** : même lecture いる, deux mots. La fiche de 要る le dit (« homophone parfait de
  居る »). Classes mécaniques : `ru` pour 居る, `u` pour 要る. Aucune fusion n'est envisagée.
- **する et やる** : la fiche de やる dit « synonyme familier de suru (faire) ou ageru (donner à
  quelqu'un d'inférieur, un animal ou une plante) ». する est dans ce lot ; 上げる est validée
  (lot 19). Une mention en nuance, sans relation, suivrait le traitement de 起こす.
- **する et かかる** : les deux fiches donnent « coûter ». する l'emploie « après un montant », et
  c'est son exemple ; かかる parle de temps ou d'argent, et son exemple porte sur le temps.
- **始まる** nomme « hajimeru » (始める), **absent des sources** ; 初め est dit « dérivé du verbe
  hajimeru ». Aucune paire, aucune entrée ajoutée.
- **Relations** : si le report à 5.16 vaut aussi pour ce lot, aucune paire transitif / intransitif
  n'est candidate ici (始める manque). Seraient à inscrire, si l'arbitrage le veut : 始まる / 終わる
  (opposition, que les fiches ne disent pas), 見る / 見せる (lot 08), する / やる.
- **コピーする** (lot 19) et les noms à `suru_compatible: true` s'appuient sur する : aucune de ces
  entrées n'est touchée.

### 5.5. `suffix` et les noms dits « nom / suffixe », « nom / adjectif en -no »

- **辺** : la fiche dit « nom / suffixe », et illustre « kono hen » (« par ici »). 半 est la seule
  ENTRY à porter `suffix` (lot 13). À arbitrer : `suffix` pour 辺, ou non, la fiche ne montrant que
  l'emploi après この.
- **次** : « nom / adjectif en -no » ; classe mécanique `nom`. Le schéma ne porte qu'une classe par
  ENTRY (point ouvert depuis le lot 16).

### 5.6. Sens et doctrine

Ce qui suit dit ce que la proposition aura à peser, sans le trancher.

1. **ある** : existence, présence, possession de choses inanimées ; l'exemple porte sur la présence.
   Un sens, ou la possession à part ?
2. **居る** : existence ou présence d'êtres animés ; un seul référent.
3. **持つ** : tenir ou porter dans ses mains, et « par extension » posséder un objet ou un
   sentiment ; l'exemple porte sur le sac que l'on porte.
4. **出来る** : la capacité, et « le fait qu'une chose soit terminée ou fabriquée » ; l'exemple
   porte sur la capacité. « Réussir » n'est pas développé.
5. **なる** : un changement d'état, de condition, de statut ou de temps ; un seul référent. La
   nuance cite « ku pour les adjectifs en i » : aucune particule n'est tirée d'ailleurs que du
   champ de la fiche (に).
6. **違う** : la différence entre deux éléments, et une information erronée (« c'est faux », « non,
   ce n'est pas ça ») ; l'exemple se traduit des deux façons. « C'est faux » est un emploi
   d'adresse : nuance, ou sens ? La fiche ne donne aucune particule.
7. **困る** : un seul référent ; traductions toutes à l'état (« être embarrassé »).
8. **する** : « faire », sens principal, et « coûter » après un montant, que l'exemple illustre.
   Deux référents. « Valoir » suit le second.
9. **やる** : faire (familier), donner à une plante ou à un animal, jouer à un jeu ou à un sport ;
   l'exemple porte sur le tennis. Deux ou trois référents.
10. **見る** : porter son regard, regarder un spectacle ou la télévision, examiner attentivement ;
    un seul geste, plusieurs objets. « Voir » et « regarder » : une ou deux valeurs ?
11. **始まる, 終わる** : un seul référent chacune. 終わる n'a aucune particule dans sa fiche, et son
    exemple emploie が.
12. **かかる** : du temps ou de l'argent ; « Prendre du temps » redit la première traduction.
13. **初め** : le début d'une période, d'une action ou d'une histoire ; « Au début » est la
    traduction de 初めに.
14. **次** : « dans l'ordre, le temps ou l'espace » ; l'exemple (la prochaine gare) fonde le
    candidat de tag `lieu_gare`. La doctrine demande une association caractéristique, non la simple
    possibilité d'employer le mot dans le lieu : candidat à arbitrer, et je penche pour le refus.
15. **物** : un objet tangible ; un seul référent.
16. **所** : un lieu, et « un point / une partie spécifique d'une chose ou d'une situation ».
17. **辺** : les environs, une zone proche ; « Quartier » et « Région » sont plus larges.
18. **問題** : une question à résoudre, dans un test, et un problème ou un différend ; l'exemple
    porte sur l'examen. Deux référents de types différents (principe retenu pour 煙草) ?
19. **力** : la force physique, et la puissance, l'énergie ou les compétences intellectuelles.
20. **声** : la voix humaine, et le cri d'un animal ; deux référents ?
21. **Catégories.** Beaucoup de ces sens sont généraux : le lot comptera sans doute une forte part
    de catégories nulles (A5), comme le lot 18.

## 6. Ce qui est à arbitrer

1. **Le thème et le périmètre** : « Existence, possession, action et déroulement », 22 entrées (14
   verbes, 8 noms), sans scission ; 他 et 大勢 hors du lot.
2. **Les fonctions linguistiques** (§5.2) : aucune fonction sans définition normative dans ce lot ;
   `deictique` examinée pour 次 seulement, selon A7.
3. **Les relations** (§5.4) : même report intégral à 5.16, et quelles paires inscrire comme
   candidates.
4. **`suffix` pour 辺** (§5.5).
5. **Deux graphies** (§5.1) : 掛かる pour かかる, que sa fiche documente ; いる pour 居る, que seule
   la fiche de 要る cite. Les ajouter, ou non.
6. **Le tag `lieu_gare` de 次** (§5.6, point 14).

Deux points sont laissés à la proposition, parce qu'ils se décident sur pièces : les furigana de
出来る (bloc par nécessité, ou autre découpage) et les types sémantiques des verbes d'existence.

Aucune proposition lexicale ne sera écrite avant l'arbitrage de ce périmètre.

## 7. Arbitrage du périmètre (2026-10-06)

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle »). Les décisions retenues :

1. **Périmètre retenu intégralement** : « Existence, possession, action et déroulement », **22
   entrées**, sans scission ni élargissement : les 14 derniers verbes, 初め, 次 et les six noms
   généraux. **他 reste hors du lot**, avec les mots de liaison ; **大勢 reste hors du lot**,
   réservée au futur lot « quantité et degré », qui reste fermé.
2. **Fonctions linguistiques** : aucune fonction qui ne dispose pas d'une définition normative. Pas
   de `modalite` pour 出来る, pas d'`aspect` pour なる, aucune fonction inventée pour l'existence
   (ある, 居る). **Pour 次, pas de `deictique`** : la fiche documente une succession dans l'ordre,
   le temps ou l'espace, mais ne montre pas que le repérage dépend directement de la situation
   d'énonciation au sens d'A7 ; une relation à l'élément précédent ou suivant ne suffit pas. Aucune
   définition, aucun addendum n'est créé dans le lot 20.
3. **Relations : report intégral à la passe finale 5.16.** `relations: []` pour tous les sens.
   Candidates explicites à 5.16 : **する / やる** (la fiche de やる nomme « suru » comme synonyme
   familier pour « faire ») et **やる / 上げる** (la même fiche nomme « ageru » pour « donner »). Ne
   sont pas inscrites : 始まる / 終わる (les fiches ne les mettent pas en relation), 見る / 見せる (la
   fiche de 見る ne nomme pas 見せる). Le type de relation sera décidé à 5.16, sens par sens ; une
   relation ne servira pas à représenter le registre familier de やる. 始める reste un verbe nommé
   par les sources et absent des ENTRY : aucune entrée, aucune relation.
4. **辺 : `suffix: true`.** La fiche dit explicitement « nom / suffixe » ; que l'exemple montre
   この辺 n'annule pas cette propriété. Classe mécanique `nom`.
5. **Graphies.** かかる : **掛かる est ajoutée**, documentée par sa propre fiche et employée dans
   son exemple ; aucune segmentation de furigana n'est inventée, la forme est reprise en bloc
   (`<ruby>掛かる<rt>かかる</rt></ruby>`) ; la forme usuelle reste かかる. 居る : **いる n'est pas
   ajoutée** ; la fiche de 居る ne la donne pas, et sa citation par la fiche de 要る, pour expliquer
   l'homophonie, ne suffit pas à créer une graphie sur une autre ENTRY.
6. **次 : `lieu_gare` refusé**, `tags: []`. Le candidat ne vient que de l'exemple ; l'association
   avec une gare n'est ni caractéristique ni intrinsèque.

**Laissés à la proposition** : les furigana de 出来る selon A8 (en bloc par nécessité si la fiche ne
permet aucune segmentation) ; les types sémantiques des verbes d'existence et des autres cas
sensibles, fiche par fiche.

**Ce qu'il n'autorise pas** : ni la validation du lot 20, ni un commit, ni un push.

**Suite donnée** : proposition lexicale en `proposed`, décisions à partir de D1302 (rapport
`docs/rapports/etape2-A2-04-lot20-proposition.md`).
