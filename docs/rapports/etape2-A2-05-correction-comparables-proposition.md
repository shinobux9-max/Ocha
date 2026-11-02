# Étape 2 · A2-05 — générateur de périmètres : comparables du lot 1, correctif proposé

**Date** : 2026-10-21
**Statut** : **correctif accepté et appliqué le 2026-10-22, point 9 compris (§7).** Le texte qui suit est celui de la proposition, conservé tel qu'il a été relu. **Proposition (2026-10-21), non appliquée alors.** Préparation autorisée le 2026-10-21 avec l'acceptation du périmètre de T2 : « J'autorise la préparation d'un correctif technique en proposition uniquement, sans application. » Le générateur réel `a2-05-travail/perimetre-v2.mjs` **n'est pas modifié** (empreinte vérifiée avant et après) ; la version proposée est dans `a2-05-travail/correction-comparables/proposition/perimetre-v2.mjs`, et la différence exacte dans `a2-05-travail/correction-comparables/diffs/perimetre-v2.mjs.diff`. Aucune donnée, aucun arbitrage du lot 1, aucun résultat du criblage, aucune règle linguistique, aucun registre ni test n'est modifié. **L'audit des 21 sens de T2 n'est pas commencé ; aucune fiche n'est lue pour un verdict.**

## 1. Le défaut

Le générateur v2 donne à chaque comparable un « État » tiré de deux sources seulement : le registre des 377 (livraison, et son arbitrage) et les 147 du volet 2. **Il ignore les 19 sens du lot 1 du volet 1** (`etape2-A2-05-coherence-retroactive.md`, arbitré le 2026-10-08). Un sens du lot 1 est donc affiché « hors des 377 et des 147 », ou seulement « volet 2 (147, arbitré) » s'il est aussi parmi les 147. Par ailleurs, les corrections retenues sur les comparables ne sont pas montrées, sauf celles des dix modifications du volet 2, et seulement pour les sens nommés par une règle.

**Dans le périmètre accepté de T2** : 洗う (`v_221_s1`), affiché « hors des 377 et des 147 », est un sens du lot 1, en écart (E3), qui porte **V1-1** (`category` : `…nettoyage` → `null`) ; 冷たい sens 2 (`v_265_s2`), écart (E2), qui porte **V1-5**, et 汚い sens 2 (`v_461_s2`), conforme, n'apparaissent que comme sens du volet 2.

**Constat hors de T2, sans correction** : le même défaut touche le **périmètre arbitré de T1** (`…-lot3-T1-perimetre.md`, protégé par le manifeste) : 冷たい sens 2 y est affiché « volet 2 (147, arbitré) », et 爽やか sens 2 (`v_1_s2`), 暗い sens 2 (`v_4_s2`) et 明るい sens 2 (`v_455_s2`) « hors des 377 et des 147 » (lignes 100, 132, 135 et 191), alors que ce sont des sens du lot 1, arbitrés conformes (sauf 冷たい sens 2, en écart). Le rapport n'est pas régénéré ; un erratum à son §0 relèverait d'une autorisation distincte. Les essais de non-régression montrent aussi des sens du lot 1 parmi les comparables de B8, B9, T3, T7 et T8 (§3, E7) ; les rapports de B8 et de B9 ont été écrits par d'autres scripts et ne sont pas examinés ici.

## 2. Le correctif proposé

Préparé par `a2-05-travail/correction-comparables/preparer.mjs` (remplacements ciblés à occurrence unique dans `perimetre-v2.mjs`). Point par point, selon l'autorisation :

| Point demandé | Ce que fait la version proposée |
|---|---|
| 1. Reconnaître les 19 sens du lot 1 et leur statut | lit les 19 fiches du rapport du lot 1 et leur verdict arbitré (« conforme », « écart (En) ») ; exige le statut « arbitré le » et exactement 19 fiches, sinon refus |
| 2. Identifier 洗う, 冷たい sens 2, 汚い sens 2 | « État » complété : « volet 1, lot 1 (écart (E3), arbitré) » pour 洗う ; « volet 2 (147, arbitré) ; volet 1, lot 1 (…) » pour les deux autres ; dans les §4.1, §4.2, §6.2, §6.3 et au §7 |
| 3. Montrer V1-1 et V1-5 | nouveau **§4.3** : toutes les corrections retenues (modifications du volet 2, V1-n, V2-n) des comparables, hors des ENTRY de la tranche (dont les corrections restent au §6.1, inchangé) |
| 4. Valeur publiée et valeur retenue | le §4.3 a deux colonnes : « Valeur publiée » (celle du tableau du bilan pour V1-n et les modifications ; pour une V2-n de nuance, lue dans l'état publié au niveau de l'unité) et « Valeur retenue, non appliquée » |
| 5. Provenance exacte | colonne « Provenance » : section du bilan qui porte la ligne (V1-1 et V1-5 : §8.1 ; modification n°7 : §2 ; V2-n : leur sous-section du §8) ; numéro de correction et unité (sens ou ENTRY) tels qu'au bilan ; contrôles : dix modifications exactement, aucun numéro en double |
| 6. Préserver T2 et les autres comptages | aucun calcul des sens, ENTRY, règles, comparables, décisions ni des corrections des ENTRY de la tranche n'est modifié (E2, E6, E7) |
| 7. Effet sur les règles du criblage, sans les modifier | nouveau relevé au §6.1, « Relevés du criblage dont une valeur est déjà corrigée » : pour chaque relevé, les sens qu'il nomme (toute correction, en disant si elle touche le champ du critère de la règle) et les membres de la catégorie ou de la famille source qu'il compte (corrections du champ du critère seulement) ; **les relevés du criblage sont affichés tels quels, jamais recalculés** ; il remplace l'ancien relevé, limité aux modifications du volet 2 des sens nommés |
| 8. Différences, non-régression, sabotages | différence exacte (`diffs/`), essais `a2-05-travail/correction-comparables/essais.mjs` (§3) |

**Point 9, ajouté, détachable** : le générateur proposé **refuse d'écrire sur un périmètre dont le statut est « périmètre accepté le » ou « arbitré le », même absent du manifeste**. Sans ce garde, appliquer le correctif puis relancer `perimetre-T2.mjs` réécrirait le périmètre accepté de T2, qui n'est pas protégé par le manifeste (§5). Il peut être retiré du correctif sans effet sur les points 1 à 8.

**Critère d'une règle** (pour le point 7) : C1-a, la catégorie et la traduction ; C3-b, le type et la traduction ; C3-c, le type ; C3-d, le type et la catégorie ; C5-0, les dimensions ; C8-b, les tags et la catégorie ; C8-c, les tags ; autres règles C1, la catégorie. Le champ d'une correction est lu dans sa colonne « Champ ».

## 3. Les essais

`node a2-05-travail/correction-comparables/essais.mjs . --apercu` : **16 sur 16, code 0** (sortie entière dans la note d'export). Copie temporaire de l'arbre, supprimée ensuite ; générateur proposé substitué, générateur actuel gardé à côté.

| Essai | Résultat |
|---|---|
| E1 | T2, générateur actuel : reproduit le périmètre accepté octet pour octet ; générateur proposé : code 0 |
| E2 | T2 : 21 sens, 21 ENTRY, règles, comparables, décisions et les 7 corrections des ENTRY de T2 identiques |
| E3 | 洗う, 冷たい sens 2, 汚い sens 2 reconnus, avec leur verdict arbitré |
| E4 | V1-1 (§8.1 ; publiée `…nettoyage`, retenue `null` (A5)), V1-5 (§8.1 ; « Froid (attitude) » → « Insensible (figuré) »), modification n°7 (§2) ; 16 corrections sur les comparables de T2 |
| E5 | 14 relevés touchés, dont : 掃除 C1-f (洗う, V1-1, champ du critère, membre de la catégorie) ; 寒い C1-a (冷たい sens 2, V1-5, champ du critère) ; 寒い C1-h et 暑い C1-h (V1-5, autre champ que le critère) ; 灰皿 C1-h (時計, modification n°7, champ du critère) ; et 住む C1-b et C1-h (洗う, membre de la famille source) ; le relevé C1-f de 掃除 reste « 3 sens sur 4 » |
| E6 | T2 : hors des ajouts du correctif, texte identique octet pour octet |
| E7 | non-régression T1, B8, B9 (mode de non-régression), T3 à T8 : comptes identiques, texte identique hors ajouts ; T9 et F non générés (chantiers fermés) |
| E8 | périmètre accepté de T2 (copie) : refusé par le générateur proposé (code 1), réécrit par l'actuel (code 0) |
| S1 à S4 | sabotages refusés : fiche du lot 1 retirée ; rapport du lot 1 sans arbitrage ; une des dix modifications retirée ; numéro de correction en double |
| S5, S6 | sabotages acceptés par la génération mais détectés : V1-1 retirée du bilan (E4) ; verdict de 洗う altéré (E3) |
| S0 | témoin sain après les sabotages |
| E9 | dépôt inchangé : `data`, `reconstruction`, `tests`, `tools`, `docs/conception`, générateur réel, manifeste, registre des tranches, criblage, rapport du lot 1, bilan, périmètre accepté de T2 |

**Premier lancement : 14 sur 16, code 1**, deux défauts de la proposition elle-même, corrigés dans `preparer.mjs` avant le second lancement : (E3) 汚い sens 2, autre sens d'une ENTRY de T2, était étiqueté mais absent de la ligne de contrôle du §7 ; (E4) la provenance lisait « §8 » au lieu de « §8.1 » (titres « ### 8.1 » sans point final).

**Aperçu** : le périmètre de T2 tel que l'écrirait le générateur corrigé est dans `a2-05-travail/correction-comparables/apercu/T2-perimetre-corrige.md`, **pour lecture seule** ; le périmètre accepté n'est pas remplacé. Différence : trois étiquettes (§4.1, §4.2), une au §6.3, le §4.3 (16 lignes), le relevé du §6.1, deux lignes du §7.

**Limite** : pour une V2-n qui ne porte pas sur une nuance (V2-15, particules de 吹く), la valeur publiée n'est pas relevée séparément (« (non relevée) ») ; le tableau du bilan la donne dans la valeur retenue (« `["が"]` → `[]` »).

## 4. Ce qui n'est pas fait

Le correctif n'est pas appliqué ; le périmètre accepté de T2 n'est pas régénéré ; le module commun v2 n'est pas touché (il n'étiquette pas les comparables : la configuration de chaque tranche les écrit) ; aucun rapport arbitré n'est corrigé (T1 compris) ; aucune correction n'est appliquée ; aucun audit de T2.

## 5. Incident, non réparé : contrôle C9a du relais

L'inscription du §0 de T2 donne au périmètre le statut « périmètre accepté le » : `rapportsArbitres` le compte comme rapport arbitré, alors qu'il est hors du manifeste (les 29 empreintes sont préservées). Le contrôle du relais (`--apres-application`) rend donc **29 sur 30, code 1** ; seul écart, C9a, critère (d) « aucun rapport arbitré hors manifeste ». `empreintes-lot3.mjs` rend code 0 en signalant le fichier « hors du manifeste ». **Diagnostic** : la réparation de C9a du 2026-10-21 n'a pas prévu l'état d'une tranche dont le périmètre est accepté et le rapport non encore arbitré ; ajouter le périmètre seul au manifeste ferait échouer le critère (c), qui exige des paires. Options présentées, non tranchées : **A** (recommandée) C9a admet un périmètre accepté seul tant que le rapport de sa tranche n'est pas arbitré, jamais un rapport seul, puis ajout du périmètre de T2 au manifeste (29 empreintes inchangées, une trentième) ; **B** C9a tolère ce périmètre hors du manifeste jusqu'à l'arbitrage de la tranche ; **C** laisser 29 sur 30 consigné. Le point 9 du correctif (§2) protège le périmètre accepté quelle que soit l'option.

## 6. Décisions demandées

1. Retenir, ou non, le correctif (points 1 à 8), et le point 9.
2. Autoriser, ou non, son application, séparément.
3. Choisir une option pour C9a (§5).
4. Dire si le constat sur le périmètre arbitré de T1 appelle un erratum.
5. Puis seulement, l'audit des 21 sens de T2, sur autorisation distincte.

## 7. Décision et application (2026-10-22)

**Décision** (ChatGPT, par délégation ; relayé par l'utilisateur) : « J'accepte le correctif présenté dans `a2-05-travail/correction-comparables/diffs/perimetre-v2.mjs.diff`, **y compris son point 9 de protection des périmètres acceptés**. […] **Ne pas régénérer ni remplacer le périmètre T2 accepté.** Son aperçu corrigé reste un document de comparaison. » Option A retenue pour C9a, en proposition seulement (`docs/rapports/etape2-A2-05-c9a-resolution-proposition.md`) ; erratum de T1 en proposition seulement (`docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre-erratum-proposition.md`) ; **audit de T2 non autorisé**.

**Avant l'écriture** (`node a2-05-travail/correction-comparables/appliquer.mjs .`, code 0) : empreinte du générateur réel = état de départ documenté (`bc8cdfb7540b…`, `correction-hj/manifeste.json`, `final_sha256`) ; version proposée = version relue (`d40aea3cc3e7…`) ; différence = différence relue (`96bf54536a41…`, identique octet pour octet à la Partie 4 de l'export du 2026-10-21, comme `preparer.mjs` et `essais.mjs` à sa Partie 9) ; différence recalculée identique ; `git apply` en bac à sable redonnant la version proposée. Sauvegarde de départ : `a2-05-travail/correction-comparables/depart/perimetre-v2.mjs` ; manifeste : `a2-05-travail/correction-comparables/manifeste.json`.

**Après l'écriture** : générateur réel identique, octet pour octet, à la version proposée (`d40aea3cc3e7…`) ; `node --check` conforme. Essais relancés en mode `--apres-application` (`essais.mjs`, mode ajouté par remplacements ciblés : la référence indépendante est la sauvegarde de départ, et non plus le générateur du dépôt) : **20 sur 20, code 0**. Aux 16 essais d'origine s'ajoutent E0 (identités : réel = proposé ; départ = état documenté), E10 (les 19 sens du lot 1, relus indépendamment : 14 conformes, 5 écarts ; 20 étiquettes affichées, toutes conformes au verdict arbitré), E11 (117 affichages de corrections sur les comparables, 86 corrections distinctes, chacune retrouvée dans le bilan : numéro, section, valeur retenue, valeur publiée pour V1-n et les modifications) et E12 (dépôt réel : `perimetre-T2.mjs` refuse d'écrire sur le périmètre accepté de T2, code 1, « périmètre accepté, il ne se régénère pas » ; le générateur refuse aussi le périmètre arbitré de T1, protégé par le manifeste ; empreintes inchangées). Pour T2 : V1-1 et V1-5 au §8.1, 16 corrections sur les comparables, 14 relevés du criblage signalés sans recalcul ; T2 : 21 sens, 21 ENTRY, 7 corrections des ENTRY, inchangés.

**Contrôles globaux après application** : assemblage réel code 0 (684 ENTRY, 35 retraits, 0 écartée, 148 avertissements ; sortie identique octet pour octet à celle d'avant l'application) ; 510 tests, 510 verts, code 0 ; couverture 172/377, bloc B 103/148, code 0 ; manifeste : 29 rapports identiques, code 0 (T2 signalé hors du manifeste) ; manifeste, périmètres de T1 (`459e4d1b82d5…`) et de T2 (`b3b8ac70c178…`) inchangés ; `data`, `reconstruction`, `tools`, `tests`, `docs/conception`, `src` sans modification ; `git diff --check` code 0 ; index vide. **Contrôle du relais : 29 sur 30, code 1, C9a seul, inchangé : incident ouvert**, conservé jusqu'à sa résolution.

**Non fait** : le périmètre accepté de T2 n'est ni régénéré ni remplacé ; l'aperçu `apercu/T2-perimetre-corrige.md` reste un document de comparaison ; aucun rapport arbitré n'est modifié ; aucune donnée ni correction lexicale n'est appliquée ; aucun audit.
