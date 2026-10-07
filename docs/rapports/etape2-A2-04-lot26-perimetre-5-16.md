# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.16 « Passe finale » · périmètre

**Date** : 2026-10-07
**Nature** : **recensement et proposition de périmètre**, à arbitrer. **Aucune modification** : aucune
donnée, aucune relation, aucune phrase, aucune référence, aucun furigana, aucune graphie ; aucun
fichier de lot, aucune décision de journal. Rien n'est validé, committé ni poussé. Les contrôles cités
ont été lancés en lecture seule.
**Nom du fichier** : il porte le préfixe `lot26` pour que l'export de relecture le regroupe, comme les
préalables des lots 23 et 25. **Il n'existe aucun lot 26** ; le véhicule de la passe finale est une
question à arbitrer (§6, Q1).

**État réel vérifié avant ce rapport** : `ocha-v2` = `origin/ocha-v2` = `8ce0e23` ; assemblage réel,
partiel et complet : **684 ENTRY, 35 retraits (33 fusions, `v_717` et `v_602` sans successeur), 0
entrée écartée**, 0 problème, 0 erreur, 0 attente, 148 avertissements ; 1 569 décisions validées
(D0001 à D1569), aucune proposition en cours ; **aucun sens ne porte de relation** ; 481 tests verts.

---

## 1. Méthode

1. **Les sources normatives de 5.16** sont relevées : `ROADMAP.md` (tableau A2-04 et contenu de
   5.17), `ETAT-ACTUEL.md` (plan de l'étape 2, ligne 7 ; points ouverts), le rapport d'infrastructure
   5.0, et le `README.md` de `reconstruction/a2-04/`.
2. **Toutes les mentions** de « 5.16 », « passe finale » et « audit final » sont relevées par
   recherche dans le dépôt : gouvernance, conception, rapports des lots, rapports générés.
3. **Le journal** est interrogé par script : **29 décisions validées** renvoient explicitement à 5.16
   ou à la passe finale. Les autres décisions qui signalent un report (« candidat », « signalé »,
   « à revoir ») sont relues une à une pour séparer ce qui relève de 5.16 de ce qui relève d'autres
   chantiers.
4. **L'état réel** de chaque élément est mesuré par script sur l'assemblage complet, en lecture
   seule : références des activités et des expressions, phrases d'`exemples.json`, formes et lectures
   des ENTRY concernées, collisions de formes entre ENTRY.
5. **Rien n'est décidé ici** : pour chaque élément, ce rapport dit si une décision existe déjà, à
   appliquer, ou si un arbitrage est nécessaire.

## 2. Les entrées concernées

Les fiches sources complètes sont dans `07-lot-courant-sources.md`.

- **など** : `n5_v_602` (retirée sans successeur, lot 25).
- **Lecture, particule et formes** : `n5_v_116` (頼む), `n5_v_518` (すぐに), `n5_v_598` (煙草),
  `n5_v_548` (居る).
- **Relations candidates** : `n5_v_208`, `n5_v_209` (お風呂, ふろ) ; `n5_v_710`, `n5_v_580` (開く, 開ける) ;
  `n5_v_579`, `n5_v_709` (閉まる, 閉める) ; `n5_v_560`, `n5_v_561` (消える, 消す) ; `n5_v_528`, `n5_v_529`
  (並ぶ, 並べる) ; `n5_v_575`, `n5_v_533` (貸す, 借りる) ; `n5_v_562`, `n5_v_563` (渡す, 渡る) ;
  `n5_v_181`, `n5_v_608`, `n5_v_527` (する, やる, 上げる) ; `n5_v_593`, `n5_v_599` (しかし, でも) ;
  `n5_v_416`, `n5_v_596` (それから, そうして) ; `n5_v_418`, `n5_v_417`, `n5_v_595`, `n5_v_413` (では,
  それでは, じゃ, じゃあ) ; `n5_v_344`, `n5_v_586`, `n5_v_584` (はい, ええ, いいえ) ; `n5_v_654`,
  `n5_v_447` (多い, 少ない), avec `n5_v_520` et `n5_v_655` (たくさん, 大勢), mentionnées seulement ;
  `n5_v_509`, `n5_v_497` (少し, ちょっと).

## 3. Ce que les normes mettent dans 5.16

| Source | Ce qu'elle dit |
|---|---|
| `ROADMAP.md`, tableau A2-04 | **5.16** : « Passe finale : cohérence, relations, fusions restantes, tags, remappages » |
| `ETAT-ACTUEL.md`, plan de l'étape 2, ligne 7 | « fusions, relations, tags de lieu, `vocab-retired.json`, remappage des références » |
| `docs/rapports/etape2-tache5-0-infrastructure.md` | « **Assemblage complet** (5.16) : chaque entrée source doit être décidée, et I12 et I19 s'appliquent à tout, sur les références remappées » |
| `reconstruction/a2-04/README.md` | `out/` : sortie de `assemble --complete --write` (lexique candidat, identifiants retirés, table des identifiants) |
| `ROADMAP.md`, contenu de **5.17** (plan d'A2-03, §4) | `validate-data` sur `data/` ; `lieux.json` en `vocab_tags` ; **références des missions, lectures et expressions remappées** ; `events.js` E1 à E4 ; documentation |

**Constat** : la frontière entre 5.16 et 5.17 n'est pas tranchée pour deux points. Le plan met le
« remappage des références » en 5.16, et la publication les « références remappées » en 5.17. Les
« tags de lieu » sont en 5.16 dans le plan, mais seulement `lieux.json` (5.17) et leur cohérence
globale (A2-05) sont documentés concrètement (§5.3, Q8).

## 4. Inventaire, élément par élément

**Lecture des colonnes** : « Nature » vaut **appliquer** quand la décision existe déjà et que
l'opération est mécanique, et **arbitrer** quand un choix reste à faire avant toute modification.

### 4.1. Décisions déjà prises, à appliquer ou à constater

| # | Élément | Source exacte | État actuel | Pourquoi 5.16 | Fichiers concernés | Dépendances | Nature |
|---|---|---|---|---|---|---|---|
| A1 | **Assemblage complet** | rapport 5.0 (« Assemblage complet (5.16) ») | **atteint** : 0 problème, 0 erreur, 0 attente ; toutes les entrées décidées ; I12 et I19 appliqués aux 71 références remappées | le rapport 5.0 le place en 5.16 | aucun (constat) ; contrôle en test | aucune | **constater** et figer par un test |
| A2 | **Identifiants retirés** (`vocab-retired.json`) | `ETAT-ACTUEL.md`, plan, ligne 7 ; A3 (« identifiants retirés (fusion, suppression) ») | calculé par l'assemblage : **35** (33 fusions, `v_717` et `v_602`, sans successeur) ; écrit seulement par `--write` dans `reconstruction/a2-04/out/` (non suivi) | inscrit au plan de 5.16 | `reconstruction/a2-04/out/vocab-retired.json` ; `data/vocab-retired.json` à la publication | les relations (§4.2) ne changent pas les retraits | **appliquer** (génération mécanique) |
| A3 | **Table de remappage des références** des activités et des expressions | plan, ligne 7 ; rapport 5.0 ; contenu de 5.17 | **71 références** extraites (70 dans `data/n5/`, 1 dans `expressions.json`), **71 remappées, 0 perdue** ; 5 visent une entrée fusionnée (`lectures.json` : `n5_l_3` → 良い `n5_v_583` → `v_420` ; `n5_l_5` → 昼ご飯 `n5_v_105` → `v_92`, お腹 `n5_v_45` → `v_44`) ; aucune ne vise `n5_v_602` | inscrit au plan de 5.16 | `reconstruction/a2-04/out/id-map.json` ; `data/n5/missions.json`, `lectures.json`, `data/expressions.json` (à la publication) | la frontière 5.16 / 5.17 (Q7) | **appliquer** (table mécanique) ; l'écriture dans `data/` est à situer (Q7) |
| A4 | **Contrôle d'identité par script** | `ETAT-ACTUEL.md`, point ouvert « Contrôle d'identité absent du validateur » (lot 17) ; `etape2-A2-04-lot17-valide.md` (« à chercher par script avant la passe finale (5.16) ») | **fait en lecture seule pour ce rapport** : **aucune forme** (forme usuelle ou graphie) n'est portée par deux ENTRY ; 15 lectures par défaut partagées, toutes des homophones distincts (はな 鼻 / 花, いる 居る / 要る, あつい 暑い / 熱い / 厚い…) | réservé explicitement « avant la passe finale (5.16) » | aucun | aucune | **constater** : aucune fusion restante n'en découle |
| A5 | **Fusions restantes** | `ROADMAP.md` (« fusions restantes ») ; plan, ligne 7 ; point ouvert « doublons candidats » | les 27 groupes du lot 0 sont tous décidés ; A4 ne trouve aucune collision ; aucune fusion n'est en attente au journal | inscrit à 5.16 | aucun | A4 | **constater** : rien à fusionner |

### 4.2. Candidats non décidés, à arbitrer avant toute modification

#### Les phrases d'exemple

| # | Élément | Source exacte | État actuel | Pourquoi 5.16 | Fichiers concernés | Dépendances | Nature |
|---|---|---|---|---|---|---|---|
| B1 | **Les 3 phrases de など** | préalable du lot 25, §12, Q3 (« traitées à la passe finale 5.16, avec la remise en cohérence et le remappage des références ») ; rapports de périmètre, de proposition et de validation du lot 25 | **3 phrases** rangées sous la clé `n5_v_602` dans `data/n5/exemples.json`, intactes ; `n5_v_602` n'a **aucun successeur** : aucune clé de vocabulaire ne peut les recevoir mécaniquement | arbitrage explicite (Q3) | `data/n5/exemples.json` | B2, Q7 ; le registre de phrases (tâche 11) | **arbitrer** : leur sort (Q2) |
| B2 | **Les phrases rangées sous des entrées fusionnées**, et la clé fantôme | A3 (fusions, `merged_into`) ; `ETAT-ACTUEL.md`, point ouvert « `data/n5/exemples.json` » (registre de phrases, tâche 11, « clé fantôme `n5_v_717` ») | `exemples.json` range **2 152 phrases** de vocabulaire sous **717 clés** d'anciens identifiants ; **33 clés** d'entrées **fusionnées** (99 phrases) ont un survivant ; **`n5_v_717`** (3 phrases) est la clé fantôme, retirée d'emblée par A3 ; les 682 autres clés passent de `n5_v_<n>` à `v_<n>` | « remise en cohérence et remappage » cités pour B1 ; la même question se pose pour toutes ces clés | `data/n5/exemples.json` | **le registre de phrases** (tâche 11, plan de l'étape 2, ligne 11, « requis avant l'étape 3 ») doit le reconstruire et en corriger les défauts | **arbitrer** : 5.16 ou tâche 11 (Q3) ; le rattachement au survivant serait ensuite mécanique |

#### Les relations candidates

**État commun** : aucun sens du corpus ne porte de relation. Les lots 18 à 24 ont tous écrit
`relations: []` avec un « report intégral à la passe finale 5.16 » (arbitrages des périmètres) ; les
paires ci-dessous sont celles que le journal inscrit **comme candidates explicites**. Une relation
relie deux **sens** (`v_<n>_s<m>`), d'un type du registre A2-REL v1.1 ; elle n'est notée qu'une fois
quand elle est symétrique ou qu'elle a un inverse (I12). **Toutes demandent un arbitrage** (type,
sens reliés, direction), et toutes touchent des ENTRY validées (Q1).

| # | Paire ou groupe | Source exacte (journal) | Sens actuels | Type indiqué par la source | Fichiers | Nature |
|---|---|---|---|---|---|---|
| R1 | お風呂 / ふろ (`v_208`, `v_209`) | D0261 (lot 03) : « leur proximité pourra être notée par une relation en 5.16 » ; rapport 5.4 | un sens chacun (« Bain ») | **aucun** type nommé | `lot-03.json`, journal | **arbitrer** (type ; ou aucune relation) |
| R2 | 開く / 開ける (`v_710`, `v_580`) | D1171, D1175 (lot 18) | 開く s1 « S'ouvrir » ; 開ける s1 « Ouvrir » | `transitive_of` / `intransitive_of` ; chaque fiche nomme son correspondant | `lot-18.json`, journal | **arbitrer** (confirmer type et sens) |
| R3 | 閉まる / 閉める (`v_579`, `v_709`) | D1179, D1183 (lot 18) | s1 « Se fermer » ; s1 « Fermer » | idem | `lot-18.json`, journal | **arbitrer** |
| R4 | 消える / 消す (`v_560`, `v_561`) | D1187, D1192 (lot 18) | 消える s1 « S'éteindre », s2 « Disparaître » ; 消す s1 « Éteindre », s2 « Effacer » | idem ; D1188 : « aucune symétrie n'est imposée » entre les sens 2 | `lot-18.json`, journal | **arbitrer** (quels sens : s1 / s1 seulement ?) |
| R5 | 並ぶ / 並べる (`v_528`, `v_529`) | D1228, D1231 (lot 18) | 並ぶ s1 « Faire la queue », s2 « Être aligné » ; 並べる s1 « Aligner » | idem | `lot-18.json`, journal | **arbitrer** (s2 / s1 ?) |
| R6 | 貸す / 借りる (`v_575`, `v_533`) | D1265, D1268 (lot 19) | s1 « Prêter » ; s1 « Emprunter » | `reciprocal_with` (symétrique) ; chaque fiche nomme l'autre | `lot-19.json`, journal | **arbitrer** |
| R7 | 渡す / 渡る (`v_562`, `v_563`) | D1275 (lot 19) : « pour l'examen » ; la fiche de 渡す ne nomme pas 渡る | 渡す s1 « Remettre », s2 « Faire traverser » ; 渡る s1 « Traverser » (lot 04) | examen `transitive_of` / `intransitive_of` | `lot-19.json`, `lot-04.json`, journal | **arbitrer** (relation ou non ; s2 / s1 ?) |
| R8 | する / やる (`v_181`, `v_608`) | D1332, D1336 (lot 20) : « type exact décidé à 5.16, sens par sens » ; « une relation ne servira pas à représenter le registre familier » | する s1 « Faire », s2 « Coûter » ; やる s1 « Faire », s2 « Donner » | **non fixé** (A2-REL n'a pas de relation de synonymie ; candidats : famille identité et comparaison) | `lot-20.json`, journal | **arbitrer** |
| R9 | やる / 上げる (`v_608`, `v_527`) | D1337 (lot 20) | やる s2 « Donner » ; 上げる s1 « Donner », s2 « Lever » (lot 19) | **non fixé** | `lot-20.json`, `lot-19.json`, journal | **arbitrer** |
| R10 | しかし / でも (`v_593`, `v_599`) | D1440 (lot 23) | s1 « Cependant » ; s1 « Mais » | **non fixé** ; même rôle, registres différents | `lot-23.json`, journal | **arbitrer** |
| R11 | それから / そうして (`v_416`, `v_596`) | D1449 (lot 23) | s1 « Ensuite » ; s1 « Et puis » | **non fixé** | `lot-23.json`, journal | **arbitrer** |
| R12 | では / それでは / じゃ / じゃあ (`v_418`, `v_417`, `v_595`, `v_413`) | D1462 (lot 23) : « des formes de registres différents, non des graphies » ; deux ENTRY pour じゃ et じゃあ | trois sens chacun pour では, それでは, じゃ ; deux pour じゃあ | **non fixé** | `lot-23.json`, journal | **arbitrer** (quelles paires, quels sens) |
| R13 | はい / ええ / いいえ (`v_344`, `v_586`, `v_584`) | D1488 (lot 23) | はい s1 « Oui » ; ええ s1 « Oui » ; いいえ s1 « Non », s2 « De rien » | **non fixé** (accord, de registres différents ; いいえ, la réponse négative) | `lot-23.json`, journal | **arbitrer** |
| R14 | 多い / 少ない (`v_654`, `v_447`) | D1513 (lot 24) : « la fiche de 少ない le dit « antonyme de ooi » : opposed_to » | s1 « Nombreux » ; s1 « Peu nombreux » | `opposed_to` (symétrique) | `lot-24.json`, journal | **arbitrer** (confirmer) |
| R14 bis | たくさん, 大勢 (`v_520`, `v_655`) | D1513 : « disent aussi une grande quantité, de classes et d'emplois différents » | un sens chacun | **mentionnées, non inscrites** comme candidates | — | **arbitrer** si elles entrent ou non |
| R15 | 少し / ちょっと (`v_509`, `v_497`) | D1534 (lot 24) : « très proche d'usage », « un peu plus neutre ou écrit » | 少し : 3 sens ; ちょっと : 2 sens | **non fixé** | `lot-24.json`, journal | **arbitrer** (quels sens) |

**Explicitement écartées par le journal** (aucune candidate à 5.16) : 変える / « kawaru » (D1233, second
membre absent des sources) ; 始まる / 始める et 始まる / 終わる (D1340) ; 起きる / 起こす (lot 19, second
membre absent) ; よく / いい (D1375, lien d'origine) ; 早い / 速い (D1402, distinction). Elles ne sont
pas proposées ici.

#### Lecture, particule et formes

| # | Élément | Source exacte | État actuel (assemblage réel) | Pourquoi 5.16 | Fichiers concernés | Dépendances | Nature |
|---|---|---|---|---|---|---|---|
| F1 | **Furigana de 頼む** (`v_116`) | D1278 (lot 19) : « L'anomalie est inscrite pour la passe finale, avant publication » ; `ETAT-ACTUEL.md`, « Passe finale, avant publication : furigana de 頼む » | furigana `<ruby>頼<rt>たノ</rt></ruby>む`, avec un **ノ en katakana** ; kana たのむ et romaji justes ; A8 accepte (clé hiragana / katakana) ; la lecture est **mécanique** | réservé explicitement | `lot-19.json` (l'entrée), journal ; peut-être `rules.mjs` | **aucun mécanisme ne rend aujourd'hui cette lecture décidable** : `READING_EXCEPTION_IDS` (九つ seule) est une liste fermée, que le lot 19 n'a pas ouverte | **arbitrer** (Q5) |
| F2 | **Particule de すぐに** (`v_518`) | D1391 (lot 21) : « signalée pour la passe finale » ; `ETAT-ACTUEL.md`, « Passe finale : particule de すぐに » (« à revoir avec les furigana de 頼む ») | sens unique, `particles: ["に"]`, repris mécaniquement de la fiche ; に fait partie de la forme | réservé explicitement | `lot-21.json`, journal | se traite avec F1 (même passe) | **arbitrer** (garder ou retirer に) |
| F3 | **煙草 : forme usuelle et furigana** (`v_598`) | D1294 (lot 19) : « signalé pour la passe finale, avec la question de la forme usuelle » ; `ETAT-ACTUEL.md`, « Passe finale : 煙草 » | forme usuelle **煙草** (mécanique) ; graphie **たばこ** (décidée au lot 19) ; furigana **segmentés** `<ruby>煙<rt>たば</rt></ruby><ruby>草<rt>こ</rt></ruby>`, « sans fondement dans la fiche » ; la fiche dit le mot « le plus souvent » écrit en hiragana | réservé explicitement | `lot-19.json`, journal ; peut-être `rules.mjs` (`USUAL_FORM_IDS`, liste A d'A8) | **aucun mécanisme ouvert** : `USUAL_FORM_IDS` (平仮名 seule) et la liste A d'A8 sont des listes fermées ; se traite avec F4 | **arbitrer** (Q6) |
| F4 | **居る : forme usuelle et graphie いる** (`v_548`) | D1308 (lot 20) : « signalée pour la passe finale » ; `ETAT-ACTUEL.md`, « Passe finale : 居る » (« à revoir avec 煙草 ») | forme usuelle **居る** (mécanique), aucune graphie ; いる n'est citée que par la fiche de 要る | réservé explicitement | `lot-20.json`, journal ; peut-être `rules.mjs` | avec F3 ; la règle « une graphie s'ajoute si la fiche de l'entrée la documente » (lot 20) | **arbitrer** (Q6) |

### 4.3. Points de frontière, à trancher

| # | Point | Constat | Proposition |
|---|---|---|---|
| C1 | **Tags de lieu** | le plan les met en 5.16, mais aucun tag n'est en attente au journal ; `lieux.json` (`vocab_categories` → `vocab_tags`) est au contenu de 5.17 ; « cohérence globale des tags de lieu » et « certains tags `lieu_restaurant` du lot 0 » sont réservés à **A2-05** (`ROADMAP.md`) | aucun tag en 5.16 ; garder 5.17 et A2-05 tels qu'écrits (Q8) |
| C2 | **Remappage : calculé en 5.16, écrit en 5.17 ?** | le plan dit 5.16, la publication 5.17 ; la table (A3) est déjà calculable, 0 référence perdue | 5.16 produit et vérifie la table (`out/`) ; 5.17 l'écrit dans `data/` (Q7) |
| C3 | **Compteurs de 45 entrées** (« en 5.16 ou à l'audit A2-05 ? », `etape2-tache5-7-lot06.md`, §5) | **question close** depuis l'audit 5.7-C (`ETAT-ACTUEL.md`, table des décisions, 2026-10-03) : `counter` est la propriété d'une ENTRY qui **est** un compteur (seul 匹 au N5) ; le manque de compatibilité pour 時間 (D0925) est un point de registre | **hors 5.16** |

## 5. Hors de 5.16, relevé pour mémoire

Ces points sont réservés par les documents **à d'autres chantiers** ; ils ne sont pas proposés pour
5.16.

| Point | Source | Chantier |
|---|---|---|
| Défauts des exemples (静か « としばこ », D1158 ; 閉める, texte parasite, D1182 ; いいえ, exemple altéré, D1499 ; あまり, exemple fautif, D1546 ; 辺, lecture あたり des anciens exemples) | journal ; `ETAT-ACTUEL.md`, points ouverts | registre de phrases (tâche 11) |
| また, sens 2 (`connecteur` possible) ; 大変 « très » ; deixis temporelle (おととし, 近く, 前, 先) | A9, §5 ; A7 ; points ouverts | audit A2-05 |
| Catégories nulles (lots 15 à 24), メートル / キロ, poids, sous-catégories d'espace, 声 sans type, extensions en nuance | points ouverts | audit A2-05 |
| Lecture うち de 家 (D0223 : « procédure globale si elle est décidée avant 5.17 ») | journal | enrichissement, non réservé à 5.16 ; à décider avant 5.17 s'il est retenu |
| 皿 comme ENTRY distincte (D0202 : « à décider si un lot la rencontre ») | journal | aucun lot ne l'a rencontrée ; hors 5.16 |
| Identifiants de grammaire dans `exemples.json` (`n5_g_<n>` → `g_<n>`) | addendum A4 (« réidentification mécanique, indépendante du vocabulaire ») | A4 |
| Affixes, classes à plusieurs valeurs (« adjectif en na (et nom) ») | points ouverts | chantiers de modèle, hors A2-04 |

## 6. Ce qui est à arbitrer

| # | Question | Options | Proposition de Claude |
|---|---|---|---|
| Q1 | **Le véhicule** : relations, furigana et formes touchent des ENTRY **validées** | (a) un **lot 26 « Passe finale »** qui rouvre explicitement les seules ENTRY concernées, décisions nouvelles à la fin du journal, validation avec lui (précédents : 5.13-C, 暖かい) ; (b) plusieurs lots thématiques ; (c) un autre mécanisme, par addendum | **(a)**, réouvertures limitées aux ENTRY effectivement modifiées |
| Q2 | **Les 3 phrases de など** (B1) | (a) rattachées au point de grammaire `g_27` ou à la particule など (`particles.json`) dans le futur registre de phrases ; (b) gardées sans référence de vocabulaire ; (c) écartées | **(a)**, décidé ici mais **exécuté avec le registre de phrases** (Q3) |
| Q3 | **Les clés d'`exemples.json`** (B2 : 682 renommages, 33 clés fusionnées, la clé fantôme) | (a) en 5.16 : table de correspondance seulement, sans toucher `exemples.json` ; (b) en 5.16 : réécriture d'`exemples.json` ; (c) entièrement à la tâche 11 (registre de phrases) | **(a)** : 5.16 fixe la correspondance (fusionnées → survivant, `v_602` → Q2, `v_717` → aucune), la tâche 11 l'applique |
| Q4 | **Les relations** (R1 à R15) | (a) les seules candidates inscrites, chacune arbitrée (type, sens, direction) ; (b) un balayage de tout le corpus ; (c) aucune relation en v1 | **(a)** ; un balayage global relève d'A2-05 |
| Q4 bis | **Les relations sans type nommé** (R1, R8 à R13, R15) | (a) un type de la famille « identité et comparaison » (`similar_to`, `equivalent_to`…), sens par sens ; (b) aucune relation, la proximité restant en nuance | à proposer cas par cas, après Q4 ; **aucune relation pour représenter un registre** (D1332) |
| Q5 | **頼む** (F1) | (a) corriger les furigana (`<rt>たの</rt>`) par une décision `correction`, après avoir rendu la lecture décidable (entrée dans `READING_EXCEPTION_IDS`, liste fermée, par arbitrage) ; (b) un mécanisme propre aux furigana (addendum) ; (c) laisser en l'état | **(a)**, la plus proche des précédents (九つ) |
| Q6 | **煙草 et 居る** (F3, F4) | pour chacun : (a) statu quo ; (b) forme usuelle en hiragana (`USUAL_FORM_IDS`, comme 平仮名) ; (c) pour 煙草, furigana en bloc (liste A d'A8, fermée) ; (d) pour 居る, graphie いる | à arbitrer **fiche par fiche** ; la fiche de 居る ne documente pas いる (règle du lot 20) |
| Q7 | **Frontière du remappage** (A3, C2) | (a) 5.16 calcule et vérifie, 5.17 écrit ; (b) 5.16 écrit | **(a)** |
| Q8 | **Tags de lieu** (C1) | (a) hors 5.16 (5.17 et A2-05) ; (b) un contrôle en 5.16 | **(a)** |
| Q9 | **すぐに** (F2) | (a) retirer に de `particles` (partie de la forme) ; (b) le garder | à arbitrer avec Q5 |

## 7. Ce que l'arbitrage déclenchera, et ce qu'il ne fera pas

1. **Après l'arbitrage du périmètre** : selon Q1, Claude prépare la proposition de la passe finale :
   la liste exacte des ENTRY rouvertes, une décision par modification, l'essai à blanc, le rapport.
   Rien n'est écrit avant l'autorisation explicite de la proposition.
2. **Les mécanismes fermés** (`READING_EXCEPTION_IDS`, `USUAL_FORM_IDS`, liste A d'A8) ne sont ouverts
   que par un arbitrage explicite, entrée par entrée, comme pour 九つ et 平仮名.
3. **Aucune donnée de `data/`** n'est modifiée en 5.16 si Q3 et Q7 suivent la proposition : 5.16 produit
   des tables et des décisions ; la publication 5.17 et la tâche 11 les appliquent.
4. **Aucun point du §5** n'est traité en 5.16.

## 8. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport | `06-lot-courant-rapports.md` |
| Les 39 fiches sources des entrées concernées | `07-lot-courant-sources.md` |
| Les 29 décisions du journal citées | non jointes en entier : identifiants et extraits au §4 ; aucune décision de lot 26 n'existe (`09` est vide) |
| `ROADMAP.md`, `ETAT-ACTUEL.md` | `01-gouvernance.md` |
| Le registre A2-REL, le schéma A2-01 (I12) | `03-references-A2.md`, `02-conception.md` |
| Les addenda A3, A4, A8 | `04-addenda.md` |
| L'état réel, la note de relais | `05-relais.md` |
| Le diff contre `8ce0e23` | `10-diff-et-controles.md` |

## 9. Arbitrage rendu (2026-10-07)

Rendu par ChatGPT, par délégation, et relayé par l'utilisateur. **Il ne vaut autorisation ni de
validation, ni de commit, ni de push.** Il autorise la seule préparation de la proposition du lot 26.

| # | Arbitrage |
|---|---|
| Q1 | **Un lot 26 « Passe finale ».** Seules les ENTRY dont les données sont réellement modifiées sont rouvertes, explicitement. Les décisions historiques restent intactes ; les décisions nouvelles s'ajoutent à la fin du journal. |
| Q2 | Les 3 phrases rangées sous `n5_v_602` seront rattachées canoniquement au **point de grammaire `g_27`** dans le futur registre de phrases. Elles ne sont pas modifiées maintenant. |
| Q3 | En 5.16 : **fixer et vérifier seulement la table de correspondance** d'`exemples.json`, sans réécrire ce fichier. Clés fusionnées → survivant ; `n5_v_602` → `g_27`, pour la tâche 11 ; `n5_v_717` → aucune ENTRY de vocabulaire. L'application appartient à la tâche 11. |
| Q4 | **Les seules relations candidates explicites, R1 à R15** ; aucun balayage global. Détail ci-dessous. I12 : une relation symétrique, ou une paire relation / inverse, n'est stockée qu'une fois. |
| Q5 | **頼む** : `n5_v_116` entre dans la liste fermée `READING_EXCEPTION_IDS`, pour rendre sa lecture décidable ; puis une décision `correction` donne `<ruby>頼<rt>たの</rt></ruby>む`. Aucune règle générale, aucun addendum. |
| Q6 | **煙草** : `USUAL_FORM_IDS` s'ouvre pour cette seule ENTRY ; たばこ forme usuelle, 煙草 conservée en autre graphie ; 煙草 n'entre pas dans la liste A des lectures spéciales d'A8, aucune règle de furigana n'est inventée. **居る** : statu quo complet, ni graphie いる, ni changement de forme usuelle. |
| Q7 | 5.16 **calcule et vérifie** la table de remappage dans l'espace de reconstruction ; **5.17 seulement** écrit les références remappées dans `data/`. |
| Q8 | **Aucun travail de tags de lieu** en 5.16 : 5.17 pour `lieux.json`, A2-05 pour l'audit global. |
| Q9 | **すぐに** garde `particles: ["に"]` : la fiche l'atteste, et aucune norme n'autorise une exception. |

**Q4, relation par relation** :

| # | Arbitrage |
|---|---|
| R1 | お風呂 / ふろ : `equivalent_to`, sens « Bain » |
| R2 | 開ける « Ouvrir » `transitive_of` 開く « S'ouvrir » |
| R3 | 閉める « Fermer » `transitive_of` 閉まる « Se fermer » |
| R4 | 消す s1 « Éteindre » `transitive_of` 消える s1 « S'éteindre », seulement ; aucune relation s2 / s2 |
| R5 | 並べる « Aligner » `transitive_of` 並ぶ « Être aligné » ; pas « Faire la queue » |
| R6 | 貸す / 借りる : `reciprocal_with` |
| R7 | 渡す « Faire traverser » `transitive_of` 渡る « Traverser » ; pas le sens « Remettre » |
| R8 | する / やる : `equivalent_to`, sur « Faire » seulement |
| R9 | やる / 上げる : `similar_to`, sur « Donner » |
| R10 | しかし / でも : `equivalent_to`, sur leur emploi d'opposition ou de restriction |
| R11 | それから / そうして : `equivalent_to`, sur l'emploi séquentiel |
| R12 | `equivalent_to` entre emplois correspondants seulement ; paires structurantes では ↔ じゃ et それでは ↔ じゃあ ; aucun graphe complet entre les quatre, aucun sens nouveau ; identifiants et libellés exacts à donner dans la proposition |
| R13 | はい « Oui » ↔ ええ « Oui » : `equivalent_to` ; いいえ « Non » : `opposed_to` avec chacun de ces sens « Oui » ; aucun lien pour いいえ « De rien » |
| R14 | 多い / 少ない : `opposed_to` |
| R14 bis | たくさん / 大勢 : aucune relation, hors périmètre |
| R15 | 少し / ちょっと : `similar_to` entre emplois correspondants de faible quantité ou degré et de courte durée seulement ; aucun lien fondé sur l'hésitation ou le refus ; identifiants et libellés exacts à donner dans la proposition |

**Hors de la proposition** : `data/n5/exemples.json`, les références publiées de `data/`, les tags de
lieu et les points déclarés hors 5.16 (§5) ne sont pas modifiés.

**Suite** : la proposition du lot 26 est dans `docs/rapports/etape2-A2-04-lot26-proposition.md`.
