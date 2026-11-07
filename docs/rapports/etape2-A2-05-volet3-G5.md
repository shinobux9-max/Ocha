# Étape 2 · A2-05 · Volet 3 · G5 — anomalies de kanji : rapport de livraison

**Date** : 2026-11-07.
**Statut** : **arbitré le 2026-11-07 (§0).** Rapport de livraison distinct (G5-Q4), à reprendre dans le rapport global du volet 3. La proposition relue est conservée : `a2-05-travail/volet3-cadrage/G5/rapport-G5-proposition.md`.
**Autorisation exécutée** : « J'autorise explicitement l'exécution de G5, une seule fois, en lecture seule », avec `controle-G5.mjs` dans sa révision 2 (SHA-256 `1c03b90fa767a71f2abb218ab46aa244466268d94c3c03955888674c60a2651f`, vérifiée avant le lancement).
**Ce qui n'est pas modifié** : les données, le dictionnaire, les catalogues, l'inventaire des avertissements, les normes, les outils, le validateur, les tests, les décisions historiques.
**Référence** : `HEAD`, `origin/ocha-v2` et le distant réel étaient à `0be46934ff56e8b1c7ef7aa247723c63b7d2018b`, avant comme après l'exécution.

**Marques** : [D] documenté ; [C] constaté par l'exécution ; [R] recommandation, telle qu'elle a été soumise à l'arbitrage (§0) ; [Q] question à arbitrer.

## 0. Arbitrage (2026-11-07)

Décisions de ChatGPT, par délégation, relayées par l'utilisateur, après relecture du rapport en proposition : « J'accepte les arbitrages G5-A1 à G5-A5 après relecture de ChatGPT. »

- **A1** : « retenir les trois écarts supplémentaires de K3, 鞄 (v_64), 碗 (v_89) et 鹸 (v_228), avec 醤 (v_594). Les rattacher à la tâche de données sur les kanji, sans décider ici du placement de cette tâche. »
- **A2** : « conformément à V2, constater que ces anomalies ne bloquent pas, à elles seules, la clôture d'A2-05 ou de l'étape 2, à condition que leur état et leur chantier de destination soient explicitement documentés. »
- **A3** : « conserver le cadrage historique et sa prévision conditionnelle `{醤}`. Le rapport G5 doit faire apparaître distinctement le résultat constaté `{鞄, 碗, 鹸, 醤}`. »
- **A4** : « signaler que `kanji-inconnu` ne contrôle pas les graphies, comme piste pour la tâche de données, sans décider d'une évolution du validateur. »
- **A5** : « retenir le principe d'une consignation documentaire unique après G5. »

**Prévision et résultat, distincts (A3).**

| | Ensemble des kanji absents des kanji connus | Source |
|---|---|---|
| Prévision conditionnelle du cadrage | `{醤}` (« Si l'état actuel se confirme, cette liste vaut 醤 ») | `docs/rapports/etape2-A2-05-volet3-cadrage.md`, §3, G5 ; conservé sans modification |
| **Résultat constaté par G5** | **`{鞄, 碗, 鹸, 醤}`** | §4.1 ci-dessous |

**Verdict retenu.** **K3 est non conforme**, par **trois anomalies supplémentaires** (鞄, 碗, 鹸, chacune dans une graphie seule). Le script les rapporte en **quatre lignes d'écart** : une ligne générale et une ligne par kanji (§3). K0, K1, K2 et K4 sont conformes. Selon V2, cet état **ne bloque pas, à lui seul**, la clôture d'A2-05 ni celle de l'étape 2 : l'état est documenté ici (§4) et le chantier de destination est la tâche de données sur les kanji, **dont le placement n'est pas décidé** (`ROADMAP.md`, §17). Aucune évolution du validateur n'est décidée (A4). Les §1 à §11 qui suivent sont le texte relu, inchangé hors de ce §0, de l'en-tête et du §11.

## 1. Résultat en bref

[C] **G5 rend le code de sortie 1, avec 4 lignes d'écart, toutes sur K3.** K0, K1, K2 et K4 sont conformes.

**Constat en trois lignes** (cadrage, §3, G5) :
1. `kanji-inconnu` est toujours émis, une seule fois, sur 醤油 (`v_594`), pour 醤.
2. Les cinq clés-mots du dictionnaire (山羊, 措置, 生活, 継続, 迅速) sont toujours écartées par l'adaptateur.
3. **Sur les 717 formes et graphies des 684 ENTRY, quatre kanji sont absents des kanji connus : 鞄, 碗, 鹸 et 醤.** Le cadrage attendait {醤} « si l'état actuel se confirme ». Ce n'est pas le cas : 鞄, 碗 et 鹸 n'apparaissent que dans des graphies, que l'avertissement ne lit pas (limite L1 du dossier de préparation).

**Rattachement** : les quatre kanji relèvent de la tâche de données sur les kanji, dont le placement reste à décider (`ROADMAP.md`, §17). [D] Selon l'arbitrage V2, ces anomalies ne conditionnent ni la clôture d'A2-05 ni celle de l'étape 2, à condition que leur état et leur chantier de destination soient explicitement documentés. Ce rapport les documente ; l'écart à K3 n'est donc pas, par lui-même, un obstacle à la clôture (G5-Q3).

## 2. Vérifications préalables

| Vérification | Résultat |
|---|---|
| `HEAD`, `origin/ocha-v2`, distant réel (`git ls-remote`) | `0be46934ff56e8b1c7ef7aa247723c63b7d2018b` tous trois |
| Index | vide |
| Fichiers suivis modifiés | aucun |
| Empreinte du script | `1c03b90f…`, égale à l'empreinte autorisée |

## 3. Verdicts K0 à K4

| N° | Verdict | Détail [C] |
|---|---|---|
| K0 | **conforme** (2 lignes) | `data/`, `tools/`, `reconstruction/`, `tests/` identiques à `3d67594`, sans modification locale ; dictionnaire au blob `724f6d9293ad`, inchangé |
| K1 | **conforme** (4 lignes) | validateur : 0 erreur, 149 avertissements ; un seul `kanji-inconnu`, `n5/vocab.json · v_594`, « kanji « 醤 » de « 醤油 » absent des kanji connus » ; aucun `kanji-inconnu` supplémentaire pour 醤 hors de v_594 ; inventaire et baseline à un, sur v_594 |
| K2 | **conforme** (2 lignes) | exactement cinq clés de plusieurs caractères, les cinq clés-mots ; 2 972 kanji connus, tous d'un seul caractère, aucune clé-mot retenue |
| K3 | **non conforme** (1 ligne conforme, 4 lignes d'écart) | population : 684 ENTRY, 717 formes et graphies (conforme) ; liste des kanji absents : {鞄, 碗, 鹸, 醤} au lieu de {醤} (écart) ; un écart distinct pour chacun des trois kanji supplémentaires |
| K4 | **conforme** | aucune modification dans `data/`, `tools/`, `reconstruction/`, `tests/` ; empreinte du dictionnaire identique avant et après |

[C] **Lecture du décompte « 4 écart(s) ».** Il compte des lignes, non des anomalies : la ligne globale de K3 et les trois lignes par kanji décrivent les **mêmes trois kanji supplémentaires**. Il y a donc trois anomalies distinctes, et non quatre. C'est le comportement voulu par la révision 1 (« un écart distinct par kanji supplémentaire ») ; je ne corrige pas le script.

## 4. Les deux listes, distinctes

### 4.1 Kanji absents des kanji connus (K3 ; référence : kanji connus du validateur, G5-Q1)

| Kanji | Fichier · ENTRY | Champ | Forme | Forme usuelle de l'ENTRY | Avertissement |
|---|---|---|---|---|---|
| 鞄 | `n5/vocab.json` · `v_64` | `writings[0].form` | 鞄 | かばん | aucun |
| 碗 | `n5/vocab.json` · `v_89` | `writings[0].form` | 茶碗 | ちゃわん | aucun |
| 鹸 | `n5/vocab.json` · `v_228` | `writings[0].form` | 石鹸 | せっけん | aucun |
| 醤 | `n5/vocab.json` · `v_594` | `word` | 醤油 | 醤油 | `kanji-inconnu` |

### 4.2 Kanji absents du dictionnaire lui-même (K8 ; référence : clés d'un caractère de `data/kanji_jouyou_fr.json`)

[C] Quatre kanji : **鞄** (`v_64`, `writings[0].form`, 鞄), **碗** (`v_89`, `writings[0].form`, 茶碗), **鹸** (`v_228`, `writings[0].form`, 石鹸), **醤** (`v_594`, `word`, 醤油). Chacun est absent aussi des kanji connus, et aucun n'entre dans une clé-mot.

[C] **Pourquoi les deux listes coïncident aujourd'hui.** Le dictionnaire compte 2 972 clés d'un caractère, et l'adaptateur compte 2 972 kanji connus. Les catalogues `data/n1/` à `data/n5/kanji.json` (1 143, 361, 367, 179 et 110 caractères) n'ajoutent donc aucun kanji au dictionnaire. Les deux listes restent calculées séparément, sur deux références différentes ; leur égalité est un fait de l'état actuel, pas une identité de définition.

## 5. Occurrences de 醤 hors de v_594

[C] **Aucune.** Le relevé exhaustif en compte 0, et le validateur n'émet aucun `kanji-inconnu` supplémentaire pour 醤 (K1).

## 6. Constats complémentaires K5 à K8 (sans valeur d'exigence)

- **K5** [C] : 3 occurrences en graphie de kanji absents des kanji connus, dont 0 couverte par la forme usuelle de la même ENTRY. Les trois (鞄 `v_64`, 碗 `v_89`, 鹸 `v_228`) ne sont couvertes par aucun `kanji-inconnu`. Ces trois kanji sont absents de **toute** forme usuelle publiée : le validateur ne les signale jamais. Ce sont les mêmes que les trois écarts à K3 (G5-Q3) ; K5 n'ajoute aucune exigence.
- **K6** [C] : deux caractères idéographiques non reconnus par `KANJI_CHAR`, tous deux 々 (U+3005), dans la forme usuelle de `v_359` (近々) et de `v_554` (時々). C'est la marque d'itération, qui n'est pas un kanji. Aucun caractère hors du BMP, aucun 〆, 〇 ni radical.
- **K7** [C] : les dix kanji qui composent les cinq clés-mots sont tous connus (山, 羊, 生, 活, 措, 置, 継, 続, 迅, 速).
- **K8** [C] : voir §4.2.

## 7. Absence d'écriture et preuve 8 du périmètre

| Contrôle | Avant | Après |
|---|---|---|
| `HEAD`, `origin/ocha-v2`, distant réel | `0be4693…` | `0be4693…` |
| Index ; fichiers suivis modifiés | vide ; aucun | vide ; aucun |
| `git status --porcelain --untracked-files=all` (hors `G5/execution/`, qui reçoit les sorties) | relevé | identique |
| Index Git de `data/`, `tools/`, `reconstruction/`, `tests/` (`git ls-files -s`) | empreinte relevée | identique |
| Octets des 33 fichiers de `data/` (SHA-256 par fichier) | relevés | identiques |
| Relais, mode normal (`controle-relais-allege.mjs --apres-application`) | 30 sur 30, code 0 | 30 sur 30, code 0 |
| Relais `--strict` | 29 sur 30, C5a seul, code 1 | 29 sur 30, C5a seul, code 1 |
| Empreintes (`empreintes-lot3.mjs`) | 47 rapports contrôlés, identiques, code 0 | idem |
| Tests (`node --test "tests/**/*.test.js"`) | 510 sur 510, 0 échec, code 0 | 510 sur 510, 0 échec, code 0 |

[D] Le résultat du relais `--strict` (C5a seul) est celui que l'on attend depuis le commit Q4 (dossier de préparation, §0). Son code 1 vient de cet écart connu ; il n'est ni nouveau ni causé par G5.

## 8. Analyse

- [C] **Pourquoi l'état attendu ne s'est pas confirmé.** Les documents de pilotage et le cadrage ne connaissaient que 醤, parce qu'ils s'appuyaient sur l'avertissement, qui ne lit que la forme usuelle (`entry.mjs`, l. 170-172). Le périmètre demande davantage (« une forme **ou une graphie** publiée ») : c'est exactement la limite L1 du dossier de préparation. G5 révèle trois anomalies que l'outillage existant ne pouvait pas voir.
- [C] **Les trois ENTRY concernées** (かばん, ちゃわん, せっけん) ont une forme usuelle en kana, et leur graphie en kanji est la seule à contenir le kanji absent. Leurs autres kanji (茶, 石) sont connus.
- [D] **Ce qui n'est pas fait** : rien n'est ajouté au dictionnaire ni aux catalogues « pour faire taire » quoi que ce soit (périmètre, §2) ; aucune graphie n'est retirée ni modifiée ; aucune décision lexicale n'est prise sur ces ENTRY ; le validateur n'est pas étendu aux graphies. G5 ne peut ajouter aucune correction à la liste fermée des 204 (cadrage, table des dépendances).

## 9. Points à arbitrer

- **G5-A1 · Qualification des trois kanji supplémentaires.** [R] Retenir l'écart à K3 tel qu'il est constaté, pour 鞄 (`v_64`), 碗 (`v_89`) et 鹸 (`v_228`), et le rattacher, avec 醤, à la tâche de données sur les kanji. Le placement de cette tâche reste à décider (`ROADMAP.md`, §17), hors de G5.
- **G5-A2 · Effet sur la clôture.** [R] Constater que, selon V2, cet écart ne conditionne ni la clôture d'A2-05 ni celle de l'étape 2, puisque l'état (§4) et le chantier de destination (§1) sont documentés ici.
- **G5-A3 · Écart avec le cadrage.** Le cadrage annonçait « Si l'état actuel se confirme, cette liste vaut 醤 ». [R] Le consigner comme un écart entre une prévision conditionnelle et le résultat, sans réécrire le cadrage arbitré : la trace historique reste, et le rapport G5 fait foi pour l'état.
- **G5-A4 · Observation sur l'outillage, sans exigence nouvelle.** `kanji-inconnu` ne lit pas les graphies. [R] Transmettre cette observation à la tâche de données sur les kanji, comme une piste, **sans** en faire une exigence de G5 ni une évolution du validateur décidée ici.
- **G5-A5 · Consignation.** [D] Une seule consignation documentaire après G5, sur autorisation distincte (G5-Q5) : inscription de ce rapport sous `docs/rapports/etape2-A2-05-volet3-G5.md`, puis actualisation de l'état courant d'`ETAT-ACTUEL.md` et de `ROADMAP.md` (y compris les deux points du §0 du dossier de préparation), sans réécrire les traces historiques. Elle n'est pas autorisée à ce jour.

## 10. Pièces

Toutes dans `a2-05-travail/volet3-cadrage/G5/execution/` (non suivi) : `sortie-G5.txt` (sortie intégrale), `code-G5.txt`, `git-status-avant.txt` et `-apres.txt`, `index-zones-avant.txt` et `-apres.txt`, `octets-data-avant.txt` et `-apres.txt`, `relais-avant.txt`, `relais-strict-avant.txt`, `relais-apres.txt`, `relais-strict-apres.txt`, `empreintes-avant.txt` et `-apres.txt`, `tests-avant.txt` et `-apres.txt`.

### Sortie intégrale de G5 (code de sortie 1)

```
conforme K0 data/, tools/, reconstruction/ et tests/ identiques à 3d67594 et sans modification locale
conforme K0 dictionnaire des kanji : blob 724f6d9293ad (inchangé depuis 3d67594)
conforme K1 validateur : aucune erreur : 0 erreur(s), 149 avertissement(s)
conforme K1 un seul `kanji-inconnu`, sur v_594, pour 醤 de 醤油 : n5/vocab.json · v_594 : kanji « 醤 » de « 醤油 » absent des kanji connus
conforme K1 aucun `kanji-inconnu` supplémentaire pour 醤 hors de v_594 : aucun
conforme K1 inventaire des avertissements et baseline : un `kanji-inconnu`, v_594 : n5/vocab.json · v_594
conforme K2 dictionnaire : exactement cinq clés de plusieurs caractères, les cinq clés-mots : 山羊, 措置, 生活, 継続, 迅速
conforme K2 adaptateur : kanji connus d'un seul caractère ; aucune des cinq clés-mots retenue : 2972 kanji connus
conforme K3 population : 684 ENTRY (682 de N5, 2 hors JLPT) : 684 ENTRY, 717 formes et graphies
ÉCART    K3 liste exhaustive des kanji absents des kanji connus : 醤 seul, présent en forme usuelle sur v_594 (醤油) : 鞄 (n5/vocab.json · v_64 · writings[0].form · 鞄) ; 碗 (n5/vocab.json · v_89 · writings[0].form · 茶碗) ; 鹸 (n5/vocab.json · v_228 · writings[0].form · 石鹸) ; 醤 (n5/vocab.json · v_594 · word · 醤油)
ÉCART    K3 kanji supplémentaire absent des kanji connus « 鞄 » : 鞄 (n5/vocab.json · v_64 · writings[0].form · 鞄)
ÉCART    K3 kanji supplémentaire absent des kanji connus « 碗 » : 碗 (n5/vocab.json · v_89 · writings[0].form · 茶碗)
ÉCART    K3 kanji supplémentaire absent des kanji connus « 鹸 » : 鹸 (n5/vocab.json · v_228 · writings[0].form · 石鹸)
constat  K3 relevé des occurrences de 醤 hors de v_594 (non écart à K3 par elles-mêmes) : 0
conforme K4 rien n'est ajouté au dictionnaire ; aucune modification dans data/, tools/, reconstruction/, tests/
constat  K5 occurrences en graphie de kanji absents des kanji connus : 3, dont 0 couvertes par la forme usuelle de la même ENTRY
constat  K5 kanji absents des kanji connus, présents dans une graphie et absents de la forme usuelle de la même ENTRY (aucun `kanji-inconnu` ne les couvre) : 鞄 (n5/vocab.json · v_64 · writings[0].form · 鞄) ; 碗 (n5/vocab.json · v_89 · writings[0].form · 茶碗) ; 鹸 (n5/vocab.json · v_228 · writings[0].form · 石鹸)
constat  K5 dont kanji absents de toute forme usuelle publiée (jamais signalés par le validateur) : 鞄, 碗, 鹸
constat  K6 caractères idéographiques non reconnus par KANJI_CHAR (hors BMP, 々, 〆, 〇, radicaux) dans les formes et graphies : 々 U+3005 · v_359 · word ; 々 U+3005 · v_554 · word
constat  K7 composants des cinq clés-mots : 山羊 → 山 connu, 羊 connu ; 生活 → 生 connu, 活 connu ; 措置 → 措 connu, 置 connu ; 継続 → 継 connu, 続 connu ; 迅速 → 迅 connu, 速 connu
constat  K8 kanji des formes et graphies publiées absents du dictionnaire lui-même (data/kanji_jouyou_fr.json, clés d'un caractère ; ensemble distinct de K3) : 4 → 鞄 [absent aussi des kanji connus, voir K3] v_64 · writings[0].form · 鞄 ; 碗 [absent aussi des kanji connus, voir K3] v_89 · writings[0].form · 茶碗 ; 鹸 [absent aussi des kanji connus, voir K3] v_228 · writings[0].form · 石鹸 ; 醤 [absent aussi des kanji connus, voir K3] v_594 · word · 醤油

Constat G5 :
  1. `kanji-inconnu` : toujours émis, une fois, sur 醤油 (v_594), pour 醤.
  2. Clés-mots du dictionnaire : 5 (山羊, 措置, 生活, 継続, 迅速), toujours écartées par l'adaptateur.
  3. Kanji absents des kanji connus, sur 717 formes et graphies de 684 ENTRY : 鞄, 碗, 鹸, 醤.
  Constat distinct (K8, non confondu avec le point 3) : kanji des formes et graphies publiées absents du dictionnaire lui-même : 鞄, 碗, 鹸, 醤.
  Rattachement : tâche de données sur les kanji (placement à décider : ROADMAP.md, §17). Ni la clôture d'A2-05 ni celle de l'étape 2 n'en dépendent (V2), y compris en cas d'écart à K3, pourvu que l'état et le chantier de destination soient documentés.

4 écart(s)
```

## 11. Ce qui n'est pas fait

G5 a été exécuté une seule fois. Aucune correction n'est faite, ni dans les données ni dans le script. Le placement de la tâche de données sur les kanji n'est pas décidé, et le validateur n'est pas modifié. La consignation de ce rapport (A5) se fait sur autorisation distincte ; aucun `git add`, commit ni push n'en découle. G1 à G4, G6, G7, HP-1 à HP-4, QC-1 et QC-2 ne sont pas commencés. Les 204 corrections restent retenues et non appliquées. L'étape 2 reste ouverte.
