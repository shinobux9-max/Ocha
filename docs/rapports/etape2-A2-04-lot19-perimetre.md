# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 19 · Périmètre proposé « Vie quotidienne, travail et échanges »

**Date** : 2026-10-06
**Nature** : proposition de périmètre, pour relecture puis arbitrage. **Aucune décision lexicale** :
aucun fichier de lot, aucune décision de journal, aucune règle n'est créé ni modifié.
**État** : périmètre **arbitré le 2026-10-06** (§7), par ChatGPT, sur délégation de l'utilisateur. Les §1 à §6 restent le rapport tel
qu'il a été relu.

---

## 1. Méthode

Après le lot 18 (commit `213fb2b`), l'assemblage réel compte 590 ENTRY, 32 retraits et **97 entrées
non décidées** : 34 verbes, 42 adverbes, conjonctions et interjections, 16 noms et 5 adjectifs.

Le périmètre proposé en retient 26 : 20 verbes et 6 noms, ceux qui disent ce qu'une personne fait
de sa journée, de son travail, et ce qu'elle donne, prête ou demande à une autre. Chaque fiche a
été lue en entier : traductions, nuance **et exemple**.

**Contrôles par script**, sur les sources figées et les 19 fichiers de lot existants (lots 0 à 18) :
- les 26 identifiants sont distincts, présents dans la source, non décidés, absents de tout lot ;
- aucune n'a de candidat de tag de lieu ;
- **deux lectures sont en exception**, donc déjà décidables : 借りる (les furigana de la source ont
  pour texte de base 借る, non 借りる) et 待つ (furigana まつ sur 待, suivis de つ : ils contredisent
  les kana, addendum A8) ; les 24 autres lectures sont mécaniques ;
- toutes les classes sont mécaniques (`verbe` ou `nom`) ; aucune liste fermée n'est modifiée par ce
  périmètre ;
- **une lecture mécanique porte un défaut que le pré-remplissage ne signale pas** : 頼む (§5.1).

## 2. Périmètre proposé : 26 entrées, en cinq groupes

### A. Le rythme de la journée et le corps (6)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_577` | 起きる | おきる | Se réveiller ; se lever ; sortir du lit |
| `n5_v_49` | 寝る | ねる | Dormir ; se coucher ; aller au lit |
| `n5_v_551` | 座る | すわる | S'asseoir ; prendre place |
| `n5_v_568` | 立つ | たつ | Se lever ; être debout ; se dresser |
| `n5_v_635` | 休む | やすむ | Se reposer ; s'absenter ; prendre un congé ; faire une pause |
| `n5_v_9` | 疲れる | つかれる | Se fatiguer ; être fatigué ; s'épuiser |

### B. Le travail (5)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_534` | 働く | はたらく | Travailler ; exercer un emploi ; œuvrer |
| `n5_v_143` | 勤める | つとめる | Travailler pour ; être employé par ; exercer un emploi dans |
| `n5_v_141` | 仕事 | しごと | Travail ; emploi ; profession ; tâche professionnelle |
| `n5_v_142` | 会社 | かいしゃ | Entreprise ; société ; compagnie ; bureau (par extension) |
| `n5_v_526` | コピーする | こぴーする | Photocopier ; faire une copie ; dupliquer |

### C. Donner, prêter, rendre, demander (6)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_527` | 上げる | あげる | Donner ; offrir ; lever ; monter |
| `n5_v_575` | 貸す | かす | Prêter ; louer (à quelqu'un) |
| `n5_v_533` | 借りる | かりる | Emprunter ; louer |
| `n5_v_578` | 返す | かえす | Rendre ; restituer ; rembourser ; renvoyer |
| `n5_v_562` | 渡す | わたす | Remettre ; donner en main propre ; transférer ; faire traverser |
| `n5_v_116` | 頼む | たのむ | Demander ; commander (un plat au restaurant) ; prier / confier une tâche |

### D. Rencontrer, attendre, vivre (6)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_530` | 会う | あう | Rencontrer ; voir quelqu'un ; faire la rencontre de |
| `n5_v_552` | 待つ | まつ | Attendre ; patienter |
| `n5_v_569` | 結婚 | けっこん | Mariage ; se marier |
| `n5_v_153` | 生まれる | うまれる | Naître ; venir au monde |
| `n5_v_558` | 死ぬ | しぬ | Mourir ; périr ; décéder |
| `n5_v_685` | 生活 | せいかつ | Mode de vie ; vie quotidienne ; subsistance ; existence |

### E. Fumer (3)

| Identifiant | Mot | Lecture | Sens de la source |
|---|---|---|---|
| `n5_v_542` | 吸う | すう | Fumer ; aspirer ; inhaler |
| `n5_v_598` | 煙草 | たばこ | Cigarette ; tabac ; cigare |
| `n5_v_683` | 灰皿 | はいざら | Cendrier ; récipient pour les cendres de cigarettes |

## 3. Pourquoi ce thème, et faut-il scinder ou élargir ?

**L'intérêt pour Ocha.** Ce sont les mots avec lesquels un débutant raconte sa journée (se lever,
travailler, se reposer, se coucher), son travail (会社で働く) et ses échanges avec les autres
(prêter, rendre, attendre, rencontrer). Les verbes et les noms d'un même groupe se citent dans leurs
fiches : 吸う et 煙草, 貸す et 借りる, 働く et 会社.

**Le titre est un regroupement de travail.** Il n'oriente pas les catégories : 生まれる et 死ぬ
relèvent du cycle de vie, 頼む de la demande, 灰皿 des objets.

**Le lot se décide fiche par fiche.** Aucun groupe n'impose les mêmes sens à ses membres.

**Scission : non recommandée.** 26 entrées est une taille ordinaire (le lot 15 en comptait 29).
Si une scission était préférée, la coupe naturelle passerait entre A, B et E (la personne seule, 14
entrées) et C et D (les relations entre personnes, 12 entrées).

**Élargissement : non recommandé.** Les 14 autres verbes sont des verbes d'existence, de
possession, de changement et de déroulement (§4) : ils posent des questions de fonction
grammaticale que ce lot n'a pas à ouvrir.

**Le groupe E peut sortir du lot sans dommage** : c'est le seul qui ne tienne au thème que par
l'usage quotidien. Je le propose ici parce que les trois fiches se citent et qu'aucun autre lot ne
les accueillerait mieux.

## 4. Les 97 entrées restantes, regroupées

Les 26 entrées du périmètre proposé sont en gras. Les autres sont laissées à des lots ultérieurs ;
les regroupements sont des hypothèses de travail, non des périmètres.

### Verbes (34)

| Axe | Verbes |
|---|---|
| **Rythme de la journée et corps** | **起きる, 寝る, 座る, 立つ, 休む, 疲れる** |
| **Travail** | **働く, 勤める, コピーする** |
| **Donner, prêter, rendre, demander** | **上げる, 貸す, 借りる, 返す, 渡す, 頼む** |
| **Rencontrer, attendre, vivre** | **会う, 待つ, 生まれる, 死ぬ** |
| **Fumer** | **吸う** |
| Existence, possession, besoin | ある, 居る, 持つ, 要る |
| Capacité, changement, différence | 出来る, なる, 違う, 困る |
| Faire | する, やる |
| Déroulement et durée | 始まる, 終わる, かかる |
| Perception | 見る |

### Noms (16)

| Axe | Noms |
|---|---|
| **Travail** | **仕事, 会社** |
| **Vie** | **結婚, 生活** |
| **Fumer** | **煙草, 灰皿** |
| Noms généraux et abstraits | 物, 所, 辺, 問題, 力, 声 |
| Ordre, début, reste, nombre | 次, 初め, 他, 大勢 |

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

**Ce qui reste bloqué ou réservé** : le lot « quantité et degré », précédé de la question des
fonctions `quantificateur`, `comparatif` et `intensifieur`, sans définition normative ; 早い
(réservée depuis le lot 13) ; 弱く (forme de 弱い, identité à décider) ; ゆっくり et ゆっくりと,
じゃ et じゃあ, では et それでは (paires à examiner au regard d'A3).

**Voisins déjà validés**, utiles à la cohérence :

| Mot | Lot | Ce qui est validé |
|---|---|---|
| 休み | 13 | Repos (`concept_abstrait`) |
| 渡る | 04 | Traverser (`action`) |
| 入る | 04 | Entrer ; « être dedans », l'état résultant, en nuance (D0340) |
| 開く, 閉まる | 18 | un seul sens `evenement` ; l'état résultant en nuance |
| 曲がる | 0 | Tourner (`action`) ; Être courbé (`etat`) |
| 散歩, 掃除, 勉強, 練習, 買い物, 洗濯 | 03, 05, 06, 09 | noms à `suru_compatible: true` ; 散歩する et 掃除する, fiches de verbe, fusionnées dans le nom |
| 料理 | 02 | Cuisine (`action`) ; Plat |

## 5. Cas sensibles

Ils sont relevés ici, aucun n'est tranché.

### 5.1. Frontière mécanique : trois lectures

- **借りる** : furigana de la source sur 借る (かり sur le kanji). Lecture décidable ; le romaji dit
  kariru et la forme porte り.
- **待つ** : furigana まつ sur 待, suivis de つ, soit まつつ contre le kana まつ. Lecture décidable
  (A8).
- **頼む** : les furigana de la source écrivent **たノ**, avec un ノ en katakana, sur 頼. La lecture
  en kana (たのむ) et le romaji (tanomu) sont justes. **Le pré-remplissage ne signale aucune
  exception** : la lecture est donc mécanique, et un lot ne peut pas la décider. Deux issues, à
  arbitrer : laisser le défaut jusqu'à la passe finale, ou ajouter 頼む à une liste fermée pour
  rendre la lecture décidable, comme 九つ (`READING_EXCEPTION_IDS`). La seconde modifie une règle :
  elle demanderait un accord explicite, un test, et rien d'autre dans ce lot. **Je ne sais pas si
  le validateur lexical rejetterait ces furigana à l'assemblage** : je ne l'ai pas essayé, pour ne
  rien écrire avant l'arbitrage ; l'essai à blanc de la proposition le dira.

### 5.2. コピーする : une fiche de verbe en する, sans nom

La source a une fiche コピーする (« verbe en suru », composé de « kopii » et de する) et **aucune
fiche コピー**. Les précédents ne s'appliquent pas tels quels : 散歩する et 掃除する ont été
fusionnées dans la fiche de leur nom, qui existait. Trois issues, à arbitrer :

1. garder コピーする telle quelle, classe `verbe`, forme mécanique ;
2. changer la forme usuelle en コピー, nom à `suru_compatible: true` : c'est créer une forme que la
   source ne donne pas comme entrée, même si sa nuance nomme « kopii » ;
3. réserver l'entrée pour le lot de する.

Autre point : l'exemple dit この しるし を コピーして, traduit « ce document » ; しるし veut dire
« signe » ou « marque ». L'exemple ne serait pas repris.

### 5.3. `suru_compatible` : 結婚, 生活, 仕事

- **結婚** : la fiche dit « nom (et verbe suru) », « s'emploie couramment sous la forme kekkon
  suru », et son exemple est 結婚します. La formation Nする est établie.
- **生活** : la fiche dit « nom / verbe suru », mais son exemple est 生活をしています, avec を.
- **仕事** : la fiche ne dit rien de する ; son exemple est 仕事をします, avec を.

La doctrine : `true` seulement si la source établit la formation Nする ; `false` veut dire « non
établi ». Le cas de 生活 est à arbitrer : la mention « verbe suru » de la nuance suffit-elle, quand
l'exemple montre をする ?

### 5.4. L'événement et l'état qui en résulte (principe arbitré au lot 18)

Le lot 18 a retenu qu'un événement et l'état qui en résulte ne sont pas deux traductions, et que
l'état se dit en nuance. Quatre fiches posent la même question, chacune à sa façon :

- **立つ** : « Se lever ; être debout ; se dresser ». La nuance dit que l'état « être debout » se
  dit à la forme en -te iru.
- **座る** : « S'asseoir ; prendre place ». L'état « être assis » n'est que dans la nuance.
- **疲れる** : « Se fatiguer ; être fatigué ; s'épuiser ». La nuance dit que le verbe **décrit
  l'état** de fatigue, et que « être fatigué » se dit 疲れている. Type à décider : `evenement`,
  `processus` ou `etat`.
- **寝る** : « Dormir ; se coucher ; aller au lit ». Ici, c'est la traduction principale qui est
  l'état (ou l'activité), et l'exemple traduit « je dors (je vais me coucher) à 23 heures ».
- **起きる** : « Se réveiller ; se lever ; sortir du lit » : deux événements proches, sortir du
  sommeil et quitter le lit.

Le principe du lot 18 s'applique-t-il tel quel, fiche par fiche ? 寝る est le cas le moins simple.

### 5.5. Les paires et les relations

Les relations sont reportées à 5.16 depuis le lot 18. Si ce report vaut aussi pour ce lot, sont
candidates à l'audit :

- **貸す / 借りる** : chaque fiche nomme l'autre (« par opposition à ») ; ce n'est pas une paire
  transitif / intransitif, mais deux points de vue sur le même échange.
- **渡す / 渡る** : 渡る est validée (lot 04) ; la fiche de 渡す donne « faire traverser », sans
  nommer 渡る.
- **起きる** nomme « okosu » (起こす, réveiller quelqu'un), **absent des sources** : aucune paire,
  comme « kawaru » pour 変える. La fiche l'écrit en kanji et en explique le sens : la mention est
  plus développée que celle de « hiraku ».
- **働く / 勤める** : deux mots voisins, particules différentes (で et に pour l'un, に et を pour
  l'autre) ; aucune fiche ne nomme l'autre.
- **休む / 休み** (lot 13) : le verbe et le nom.

### 5.6. Sens et doctrine

Ce qui suit dit ce que la proposition aura à peser, sans le trancher.

1. **上げる** : donner quelque chose à quelqu'un, « hors du cercle familial proche », et lever ou
   monter un objet ; l'exemple porte sur le don. Deux référents possibles. Les sources n'ont ni
   くれる ni もらう : rien ne sera ajouté.
2. **休む** : faire une pause pour récupérer, et s'absenter de l'école ou du travail (« kaisha o
   yasumu ») ; l'exemple porte sur le repos.
3. **頼む** : demander un service, « faire une prière », et commander au restaurant ; l'exemple
   porte sur la commande. « Prier / confier une tâche » réunit deux emplois dans une traduction.
4. **返す** : restituer un objet emprunté, rendre la monnaie, rembourser ; un seul geste, plusieurs
   objets. La nuance porte une coquille (« l'monnaie »), sans effet.
5. **渡す** : remettre de la main à la main, et « faire traverser », que la nuance ne développe
   pas plus que la traduction.
6. **貸す, 借りる** : prêter et louer, emprunter et louer ; la location d'un logement est citée
   pour 借りる.
7. **吸う** : inspirer de l'air ou de la fumée, et aspirer un liquide ; la traduction principale de
   la source est « Fumer », et l'exemple le porte.
8. **煙草** : la fiche dit que le mot « s'écrit le plus souvent en hiragana (たばこ) ou parfois en
   kanji », et son exemple l'écrit en hiragana. La forme usuelle de l'entrée est pourtant 煙草, et
   elle est **mécanique** : un lot ne peut pas la changer. Les furigana de la source découpent la
   lecture en たば sur 煙 et こ sur 草, découpage que rien ne fonde dans la fiche ; il est
   mécanique lui aussi. La liste fermée des lectures spéciales (A8) ne contient pas ce mot. À
   signaler pour la passe finale, ou à arbitrer si la liste doit s'ouvrir. « Cigare » n'est pas
   développé.
9. **会社** : « Bureau (par extension) » n'est pas développé par la nuance, qui explique surtout
   les kanji ; l'exemple traduit le verbe (働いています), non le nom.
10. **仕事** : activité professionnelle, ou tâche à accomplir ; la nuance explique aussi les kanji.
11. **生活** : le train-train quotidien, la vie de tous les jours, les conditions d'existence.
12. **生まれる** : la fiche donne la particule に ; son exemple dit 東京で生まれました, avec で.
    Aucune particule n'est tirée d'un exemple (arbitrage du lot 18) : la particule d'un sens unique
    reste celle de la fiche, mécaniquement.
13. **死ぬ** : une grande part de la nuance est une remarque de conjugaison (verbe en -nu).
14. **勤める** : être employé dans une entreprise, exercer une fonction ; un seul référent.
15. **会う, 待つ, 働く, 灰皿** : un seul référent chacune.
16. **Types et catégories.** Les verbes iraient en `action`, sauf ceux du §5.4 et 生まれる, 死ぬ
    (`evenement` ?). Des catégories existent pour une bonne part du lot : travail et vie
    professionnelle, cycle de vie (naissance, mort), couple (mariage), états et besoins physiques
    (sommeil et repos, fatigue), achat et vente ou transactions (prêt). Le lot devrait compter
    moins de catégories nulles que le lot 18.

## 6. Ce qui est à arbitrer

1. **Le thème et le périmètre** : « Vie quotidienne, travail et échanges », 26 entrées (20 verbes,
   6 noms), sans scission ni élargissement ; le groupe E (fumer) dans le lot.
2. **Les relations** (§5.5) : même report intégral à 5.16 que pour le lot 18, avec 貸す / 借りる et
   渡す / 渡る inscrites comme candidates ; ou un autre traitement.
3. **頼む** (§5.1) : laisser la lecture mécanique avec son défaut, ou la rendre décidable par une
   liste fermée (ce qui modifie une règle).
4. **コピーする** (§5.2) : la garder telle quelle, en faire un nom, ou la réserver.
5. **Le principe de l'état résultant** (§5.4) : appliqué fiche par fiche, 寝る comprise.

Aucune proposition lexicale ne sera écrite avant l'arbitrage de ce périmètre.

## 7. Arbitrage du périmètre (2026-10-06)

**Arbitré par ChatGPT, sur délégation de l'utilisateur** (`CLAUDE.md`, §5, « Contrôle »). Les décisions retenues :

1. **Périmètre retenu intégralement** : « Vie quotidienne, travail et échanges », **26 entrées**,
   sans scission ni élargissement. Le groupe E (吸う, 煙草, 灰皿) reste dans le lot : plus
   périphérique, mais cohérent, et sans meilleur lot d'accueil.
2. **Relations : report intégral à la passe finale 5.16.** `relations: []` pour tous les sens du
   lot. Candidates explicites à 5.16 : **貸す / 借りる**, pour `reciprocal_with` ; **渡す / 渡る**,
   pour l'examen `transitive_of` / `intransitive_of`. Aucune relation pour 起きる / 起こす : 起こす
   n'est pas une ENTRY des sources.
3. **頼む : `READING_EXCEPTION_IDS` n'est pas modifiée.** Le ノ de たノ est une anomalie graphique
   de la source, et A8 rapproche hiragana et katakana : ce n'est pas le cas de 九つ, où la lecture
   elle-même était fautive. La lecture reste mécanique pendant le lot ; l'anomalie est inscrite
   pour la passe finale, avant publication. Aucune règle n'est modifiée.
4. **コピーする : l'ENTRY est conservée telle quelle** (forme コピーする, classe `verbe`, groupe
   `suru`). Elle n'est ni transformée en nom コピー, qui n'existe pas dans les sources, ni
   réservée. L'exemple fautif de la source n'est pas repris.
5. **`suru_compatible`** : 結婚 `true` ; 生活 `true` (la mention explicite « nom / verbe suru »
   suffit, l'exemple en をする ne la retire pas) ; 仕事 `false` (« non établi »).
6. **État résultant : fiche par fiche, sans application mécanique.** 立つ et 座る : « être debout »
   et « être assis » en nuance. 疲れる : « être fatigué » en nuance lorsqu'il s'exprime par
   疲れている ; son type reste à arbitrer à la proposition. 寝る : « Dormir » n'est pas rabattu sur
   un état résultant ; le découpage est à proposer sur la fiche entière. 起きる : examinée sur sa
   propre documentation, sans le modèle de 立つ ni celui de 開く.

**Ce que l'arbitrage ne tranche pas** : le nombre de sens, leurs types et leurs catégories, sauf
`suru_compatible`.

**Ce qu'il n'autorise pas** : ni la validation du lot 19, ni un commit, ni un push.

**Vérifié avant de l'appliquer** : la relation `reciprocal_with` existe au registre A2-REL ; A8
compare bien les kana par une clé qui convertit les katakana en hiragana
(`tools/lexicon/entry.mjs`). L'essai à blanc de la proposition le confirme : le validateur accepte
les furigana de 頼む.

**Suite donnée** : proposition lexicale en `proposed`, décisions à partir de D1241 (rapport
`docs/rapports/etape2-A2-04-lot19-proposition.md`).
