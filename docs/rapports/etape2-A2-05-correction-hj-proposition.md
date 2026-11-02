# Étape 2 · A2-05 — correction technique du rapprochement des identifiants hors JLPT : proposition

**Date** : 2026-10-20
**Statut** : **proposition, non appliquée.** Préparation autorisée le 2026-10-20 (relecteur, par délégation ; relayé par l'utilisateur) : « J'autorise la préparation d'une correction technique en proposition », limitée à la résolution canonique de `hj_v_1` et de `hj_v_2`, au générateur de périmètres v2 et au module commun v2, sans modifier leur logique linguistique ; « Ne pas appliquer encore la correction technique proposée. Livrer son diff et ses tests pour relecture. »

Les modules réels `a2-05-travail/perimetre-v2.mjs` et `a2-05-travail/lot3-commun-v2.mjs` **ne sont pas modifiés** (empreintes vérifiées). Les versions proposées sont dans `a2-05-travail/correction-hj/proposition/`. Aucune fiche source, aucun identifiant publié, aucune décision historique modifiés ; aucune donnée, norme, aucun registre, snapshot ni test du dépôt modifié. Aucun audit de T1, aucun verdict, aucune autre tranche lancée ; aucun `git add`, commit ni push.

## 0. Arbitrage du 2026-10-20

Arbitrage (ChatGPT, par délégation ; relayé par l'utilisateur) : « La correction proposée est acceptée. J'autorise son application aux deux modules v2 uniquement », exclusivement selon les différences approuvées de `a2-05-travail/correction-hj/diffs/`. **Appliquée le 2026-10-20** (§7). Le défaut « RES » de T9 reste une question technique distincte, non résolue. La proposition ci-dessous est conservée telle qu'elle a été relue ; elle garde la trace du défaut.

## 1. Le défaut

Le bilan du volet 2 inscrit V2-84 (レジ袋) sous l'identifiant **source** canonique `hj_v_1`. Le générateur et le module commun cherchent les corrections, et le module la provenance, sous l'identifiant **publié** `v_718`. Pour les deux ENTRY hors JLPT (`v_718` → `hj_v_1`, `v_719` → `hj_v_2`), une correction inscrite sous l'identifiant source échappe donc au rapprochement. Pour les 682 ENTRY N5, l'identifiant source vaut « `n5_` » suivi de l'identifiant publié, et le bilan cite l'identifiant publié : rien ne leur échappe.

## 2. La correction proposée

**Une seule idée** : chercher une ENTRY sous l'identifiant publié **et**, pour une ENTRY hors JLPT, sous son identifiant source. La fonction exportée `identifiantsCites(eid, sid)`, dans le module commun, rend `[eid]` pour une ENTRY N5 et `[eid, sid]` pour une ENTRY hors JLPT, sans doublon. Elle est employée à trois endroits :

| Fichier | Emploi |
|---|---|
| `lot3-commun-v2.mjs` | corrections retenues de chaque fiche (ligne 128 actuelle) ; provenance de chaque fiche (ligne 129 actuelle) |
| `perimetre-v2.mjs` | corrections retenues sur les ENTRY de la tranche (`correctionsDe`, ligne 42 actuelle, et son appel, ligne 57) |

**Rien d'autre ne change** : règles, comparables, risques, contrôles, refus, mode bloquant et textes produits restent identiques. La correspondance canonique elle-même (`correspondance`, table de l'assemblage) est inchangée : elle donnait déjà `v_718` → `hj_v_1` et `v_719` → `hj_v_2`. Différences exactes :
- `a2-05-travail/correction-hj/diffs/lot3-commun-v2.mjs.diff` : +6 lignes, 2 lignes remplacées ;
- `a2-05-travail/correction-hj/diffs/perimetre-v2.mjs.diff` : 3 lignes remplacées.

Elles sont reproduites dans la note d'export. Les versions proposées sont produites par `a2-05-travail/correction-hj/preparer.mjs`, par remplacements ciblés à occurrence unique ; toutes deux passent `node --check` (code 0).

## 3. Les essais

`node a2-05-travail/correction-hj/essais-correction-hj.mjs .` travaille sur une **copie temporaire de l'arbre**, où les deux versions proposées remplacent les modules, et compare au générateur actuel. **11 sur 11 conformes, code 0** :

| Essai | Résultat |
|---|---|
| E1 · Résolution canonique | `v_718` → `hj_v_1` ; `v_719` → `hj_v_2` |
| E2 · ENTRY N5 ordinaires | 682 ENTRY : un seul identifiant cherché, l'identifiant publié |
| E3 · ENTRY hors JLPT | `v_718` + `hj_v_1` ; `v_719` + `hj_v_2` |
| E4 · Doublons | aucun, sur 684 listes |
| E5 · Recalcul indépendant, tranche par tranche | les corrections du générateur proposé sont égales, sans doublon, à un **recalcul indépendant** : extraction des identifiants cités dans les tableaux du bilan, puis inverse de la correspondance canonique, sans la fonction proposée. Résultat sur 9 tranches ; T9 est refusée à l'identique par les deux générateurs (§4) |
| E6 · T1 | **9 corrections** : V1-5, V2-13, V2-14, V2-27, **V2-84**, V2-98, V2-99, V2-100, V2-104 ; seule V2-84 s'ajoute |
| E7 · ポイントカード (`v_719`, T4) | aucune correction retenue citée sous `v_719` ni sous `hj_v_2` ; T4 : 11 corrections, identiques avant et après |
| E8 · Tranches sans ENTRY hors JLPT | aucune différence entre générateurs actuel et proposé (T2, T3, T5 à T8, F ; T9 refusée par les deux) |
| E9 · Non-régression B6 à B9 | `essais-outillage-v2.mjs` relancé avec les modules proposés : code 0 ; rapport d'essais **identique** à celui du dépôt |
| E10 · Non-régression du périmètre de T1 | régénéré avec le générateur proposé : **une seule ligne change**, celle des corrections retenues du §6.1, où V2-84 s'ajoute |
| E11 · Innocuité | modules réels, 27 rapports arbitrés et périmètre de T1 du dépôt inchangés |

**Corrections par tranche** (générateur proposé ; recalcul indépendant ; générateur actuel) : T1 9 ; 9 ; 8 (V2-84 ajoutée). T2 7, T3 3, T4 11, T5 10, T6 0, T7 6, T8 2 et F 9 : identiques dans les trois colonnes. T9 : générateur refusé, recalcul indépendant 10.

**Limite du module commun** : `produire` n'est pas appelé sur T1, puisqu'il exige des fiches d'examen, qui contiennent des verdicts. Son emploi de la fonction est couvert par la non-régression B6 à B9 (E9), où il n'y a pas d'ENTRY hors JLPT, et par l'identité du code avec le générateur. Dans le bilan de provenance, les seules mentions de `hj_v_*` sont dans la liste des V2 (ligne de V2-84) et dans un paragraphe, non dans les lignes de provenance numérotées. La correction ne change donc rien à la provenance lue pour レジ袋 et ポイントカード, mais elle la rendrait correcte si une telle ligne existait.

## 4. Deux constats

1. **Premier lancement des essais : code 1.** Le générateur s'est arrêté sur T9 (« règle RES : définition introuvable »). J'ai adapté l'essai pour consigner une tranche refusée, à condition qu'elle le soit à l'identique par les deux générateurs. Le défaut n'est pas corrigé, ni masqué.
2. **Le générateur v2 ne sait pas produire le périmètre de T9.** Le criblage marque les points réservés du bloc E d'une règle « RES », que le tableau des règles du découpage arbitré ne définit pas. Ce défaut est **antérieur à la correction, et indépendant d'elle**. Il ne touche pas T1. Il devra être traité avant le périmètre de T9, par une décision distincte.

## 5. Application, sur autorisation distincte

Si la correction est retenue :
1. Copier les deux versions proposées sur les modules réels, après vérification que leurs empreintes de départ n'ont pas changé.
2. Relancer `essais-correction-hj.mjs`. Il compare alors le générateur réel à lui-même ; je le signale pour qu'E5 à E8 soient relus en conséquence, et non comme un échec à interpréter à la volée.
3. Relancer `essais-outillage-v2.mjs` sur une copie, ainsi que le contrôle du relais.
4. **Régénérer le périmètre de T1** : seule la ligne du §6.1 changera, et le risque manuel « V2-84 omise » de `perimetre-T1.mjs` deviendra caduc et sera à retirer.
5. Livrer le tout pour l'acceptation du périmètre de T1.

## 6. Décisions demandées

1. Retenir, ou non, la correction proposée, et **autoriser son application**.
2. Décider du traitement du défaut « RES » (T9), à part, avant le périmètre de T9.
3. L'acceptation du périmètre de T1 reste une décision distincte, attendue après l'application éventuelle.

## 7. Application du 2026-10-20

**Avant l'écriture** (`node a2-05-travail/correction-hj/appliquer.mjs .`) :
- les empreintes des modules réels sont celles relevées à la préparation (`perimetre-v2.mjs` `a12eeeecc27a…`, `lot3-commun-v2.mjs` `b91dd4e4c130…`), c'est-à-dire leur état au commit `7803163` ;
- pour chaque module, la différence recalculée entre le module réel et la version proposée est **identique** à la différence approuvée ;
- la différence approuvée, appliquée par `git apply` à une copie du module réel, redonne **exactement** la version proposée.

**Deux arrêts sans écriture, avant que l'application ne passe** :
1. Code 2 : mon script passait à `git apply`, lancé depuis un dossier temporaire, un chemin relatif. La racine est désormais résolue en chemin absolu.
2. Code 2 : `core.autocrlf=true` est actif sur la machine, si bien que `git apply` réécrivait la copie en CRLF, et la comparaison, octet pour octet, échouait. La vérification passe désormais `core.autocrlf=false` ; la comparaison reste octet pour octet.

Les modules réels sont restés intacts dans les deux cas (empreintes vérifiées).

**Écriture** : code 0. Les deux modules réels sont identiques, octet pour octet, aux versions proposées (`cmp`, code 0) :
- `lot3-commun-v2.mjs` → `cbd42c6c874c…` ;
- `perimetre-v2.mjs` → `bc8cdfb7540b…`.

Sauvegarde de départ : `a2-05-travail/correction-hj/depart/`. Manifeste : `a2-05-travail/correction-hj/manifeste.json`. Différence par rapport au commit : 11 insertions et 5 suppressions, soit exactement les différences approuvées.

**Essais après application** :
- `essais-correction-hj.mjs . --reference a2-05-travail/correction-hj/depart` donne **11 sur 11** (code 0). La référence de comparaison est la **sauvegarde de départ**, et non les modules réels : sans elle, la version corrigée serait comparée à elle-même.
- Un premier passage, lancé sans cette référence parce que la modification du script avait été bloquée, a donné 10 sur 11 (code 1) : E6 échouait, puisque V2-84 ne « s'ajoutait » plus. Ce résultat est conservé ; **il n'est pas présenté comme une preuve**.
- Le recalcul indépendant (E5 : T1 9, T2 7, T3 3, T4 11, T5 10, T6 0, T7 6, T8 2, F 9) et la non-régression B6 à B9 (E9 : rapport d'essais identique au rapport historique du dépôt) restent des références indépendantes de la correction.

**Fiches d'examen temporaires** (`essai-fiche-temporaire.mjs`) : **3 sur 3** (code 0). Le premier passage avait rendu le code 1, faute d'éléments de configuration du rapport ; ils ont été fournis, neutres et vides. Résultats :
- **B12** : la fiche de `v_718_s1` affiche, avec le module corrigé, « V2-84 (`hj_v_1`, `nuance` (ENTRY)) » ; avec le module de départ, « aucune » ;
- **C4** : la fiche de `v_719_s1` n'a aucune correction, avec l'un comme avec l'autre ;
- le dossier temporaire est supprimé, et les 27 rapports sont inchangés.

Le module exige, pour chaque sens de la livraison, un champ `v` pris dans sa liste. Les fiches sont donc des **marqueurs techniques** (`v: 'suspendu'`, motivation « essai technique, sans lecture de la fiche ni valeur lexicale »), en mode signalement. **Aucune fiche source n'a été lue pour juger, aucun verdict lexical n'a été produit**, et les rapports produits ont été supprimés.

**Périmètre de T1 régénéré** avec le générateur corrigé. Il ne diffère de la version précédente que sur trois lignes :
- §6.1 : la liste des corrections retenues compte **9** corrections, V2-84 comprise ;
- §6.4 : le signalement d'omission de V2-84, devenu obsolète, est retiré, et l'item des comptages de référence précise que le compte de 8 précédait la correction.

Les 24 sens, les 22 ENTRY, les 9 règles, les comparables (27, 82, 18, 0), les décisions (§5) et les contrôles (§7) sont inchangés. **La trace du défaut et de sa résolution reste dans ce rapport.**

**Contrôles globaux** : relais 30 sur 30 ; synchronisation idempotente (148/377, 79/148, 185 dans 165 ENTRY, V1-11) ; 27 empreintes ; zones protégées intactes ; `git diff --check` code 0 ; index vide. Aucun audit de T1 ; T9 n'est pas ouverte ; le défaut « RES » n'est pas traité.

**Décomptes conservés** : lot 3, 148 sur 377 ; bloc B, 79 sur 148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.
