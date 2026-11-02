# Étape 2 · A2-05 — périmètre arbitré de T1 : erratum des comparables du lot 1, proposé

**Date** : 2026-10-22
**Statut** : **erratum accepté et publié le 2026-10-22** : `docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre-erratum.md` (texte du §3, seule la ligne de statut renseignée ; tableau identique ; hors du manifeste ; contrôle 6 sur 6 après publication). Le texte qui suit est celui de la proposition, conservé tel qu'il a été relu. **Proposition, non appliquée alors.** Préparation décidée le 2026-10-22 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Préparer uniquement une proposition d'erratum, liée au rapport T1 protégé. Elle devra identifier précisément les quatre sens mal étiquetés et leurs états corrects, sans réécrire le corps du rapport arbitré ni modifier son empreinte. Ne pas appliquer cet erratum sans décision distincte. »
**Rapport visé** : `docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre.md`, périmètre accepté le 2026-10-20, protégé par le manifeste d'empreintes (`459e4d1b82d5abbf0d2ffc93e2fa8b411f2e6a84c1dac15a0989886da22924c6`). **Il n'est ni régénéré, ni modifié, ni annoté** ; son empreinte est vérifiée inchangée avant et après le contrôle (§4).

## 1. Le défaut

Le générateur v2 de départ (`bc8cdfb7540b…`) donnait l'« État » d'un comparable à partir du registre des 377 et des 147 du volet 2 seulement ; il ignorait les 19 sens du lot 1 du volet 1 (`docs/rapports/etape2-A2-05-coherence-retroactive.md`, arbitré le 2026-10-08). Le défaut est corrigé dans le générateur depuis le 2026-10-22 (`docs/rapports/etape2-A2-05-correction-comparables-proposition.md`, §7) ; le périmètre arbitré de T1, écrit le 2026-10-20, garde les étiquettes d'origine.

## 2. Les quatre sens et leurs cinq occurrences

| Ligne | Section | Sens | Mot | Étiquette imprimée | Étiquette exacte | Verdict arbitré du lot 1 |
|---|---|---|---|---|---|---|
| 100 | §4.1 Sens nommés par les règles | `v_265_s2` | 冷たい « Froid (attitude) » | volet 2 (147, arbitré) | volet 2 (147, arbitré) ; volet 1, lot 1 (écart (E2), arbitré) | écart (E2) ; correction **V1-5** retenue, non appliquée |
| 132 | §4.2 Sens publiés des mêmes catégories | `v_1_s2` | 爽やか « Vif » | hors des 377 et des 147 | volet 1, lot 1 (conforme, arbitré) | conforme |
| 135 | §4.2 Sens publiés des mêmes catégories | `v_4_s2` | 暗い « Triste » | hors des 377 et des 147 | volet 1, lot 1 (conforme, arbitré) | conforme |
| 191 | §4.2 Sens publiés des mêmes catégories | `v_455_s2` | 明るい « Enjoué » | hors des 377 et des 147 | volet 1, lot 1 (conforme, arbitré) | conforme |
| 255 | §6.3 Autres sens des mêmes ENTRY | `v_265_s2` | 冷たい « Froid (attitude) » | volet 2 (147, arbitré) | volet 2 (147, arbitré) ; volet 1, lot 1 (écart (E2), arbitré) | écart (E2) ; V1-5 |

Les étiquettes exactes sont celles qu'écrit le générateur corrigé (contrôle X5) ; les verdicts sont lus dans les titres des fiches du rapport du lot 1 (lignes 80 pour 明るい, 90 pour 暗い, 100 pour 爽やか et 255 pour 冷たい ; contrôle X4). 冷たい sens 2 apparaît deux fois (§4.1 et §6.3) : quatre sens, cinq occurrences. Aucune autre étiquette de ces quatre sens dans le périmètre (contrôle X3).

**Ce que l'erreur ne touche pas** : ces quatre sens sont des **comparables**, non des sens de T1 ; les 24 sens de T1, leurs règles, leurs décisions et leurs corrections sont inchangés. Le **rapport d'audit arbitré de T1** (`…-lot3-T1.md`) cite déjà « V1-5 (`v_265_s2`, E2) » parmi les corrections retenues sur l'ENTRY de 冷たい (ligne 171) et n'emploie nulle part l'étiquette « hors des 377 et des 147 » : il n'est pas visé. Les réserves documentées du lot 1 (notamment 爽やか et 暗い) restent celles du lot 1.

## 3. Texte de l'erratum proposé

À publier, sur décision, comme document distinct `docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre-erratum.md`, sans toucher au périmètre :

````markdown
# Erratum · périmètre arbitré de T1 (comparables du lot 1)

**Rapport visé** : `docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre.md` (périmètre accepté le 2026-10-20 ; empreinte au manifeste `459e4d1b82d5abbf0d2ffc93e2fa8b411f2e6a84c1dac15a0989886da22924c6`, inchangée). Le rapport n'est ni régénéré ni modifié ; cet erratum en corrige la lecture.
**Statut** : erratum documentaire, décidé le <date> (<décision>).

Le générateur de périmètres ne connaissait pas, le 2026-10-20, les 19 sens du lot 1 du volet 1 (`docs/rapports/etape2-A2-05-coherence-retroactive.md`, arbitré le 2026-10-08). Quatre comparables portent en conséquence un « État » incomplet ou inexact. Lire :

| Ligne | Section | Sens | Imprimé | Lire |
|---|---|---|---|---|
| 100 | §4.1 | `v_265_s2` 冷たい « Froid (attitude) » | volet 2 (147, arbitré) | volet 2 (147, arbitré) ; volet 1, lot 1 (écart (E2), arbitré) — V1-5 retenue, non appliquée |
| 132 | §4.2 | `v_1_s2` 爽やか « Vif » | hors des 377 et des 147 | volet 1, lot 1 (conforme, arbitré) |
| 135 | §4.2 | `v_4_s2` 暗い « Triste » | hors des 377 et des 147 | volet 1, lot 1 (conforme, arbitré) |
| 191 | §4.2 | `v_455_s2` 明るい « Enjoué » | hors des 377 et des 147 | volet 1, lot 1 (conforme, arbitré) |
| 255 | §6.3 | `v_265_s2` 冷たい « Froid (attitude) » | volet 2 (147, arbitré) | volet 2 (147, arbitré) ; volet 1, lot 1 (écart (E2), arbitré) |

Ces sens sont des comparables, non des sens de T1 : les 24 sens de T1, leurs verdicts (rapport `…-lot3-T1.md`, arbitré le 2026-10-20) et V1-11 sont inchangés. Le générateur est corrigé depuis le 2026-10-22.
````

## 4. Contrôle

`node a2-05-travail/correction-comparables/erratum-T1-controle.mjs .` : **6 sur 6, code 0** (lecture seule ; la génération de contrôle va dans un dossier temporaire du système, supprimé ensuite) :

```
conforme X1 périmètre arbitré de T1 inchangé (empreinte du manifeste) : 459e4d1b82d5…
conforme X2 cinq occurrences relevées, étiquettes imprimées exactes : l. 100 (§4.1) v_265_s2 : « volet 2 (147, arbitré) » ; l. 132 (§4.2) v_1_s2 : « hors des 377 et des 147 » ; l. 135 (§4.2) v_4_s2 : « hors des 377 et des 147 » ; l. 191 (§4.2) v_455_s2 : « hors des 377 et des 147 » ; l. 255 (§6.3) v_265_s2 : « volet 2 (147, arbitré) »
conforme X3 aucune autre étiquette de ces quatre sens dans le périmètre de T1 : aucune
conforme X4 verdicts arbitrés du lot 1 (rapport arbitré le 2026-10-08) : v_265_s2 : écart (E2) ; v_1_s2 : conforme ; v_4_s2 : conforme ; v_455_s2 : conforme
conforme X5 étiquettes exactes, écrites par le générateur corrigé (dossier temporaire) : quatre sens du lot 1 parmi les comparables de T1 : v_265_s2 : « volet 2 (147, arbitré) ; volet 1, lot 1 (écart (E2), arbitré) » ; v_1_s2 : « volet 1, lot 1 (conforme, arbitré) » ; v_4_s2 : « volet 1, lot 1 (conforme, arbitré) » ; v_455_s2 : « volet 1, lot 1 (conforme, arbitré) »
conforme X6 périmètre arbitré de T1 toujours inchangé après le contrôle : empreinte 459e4d1b82d5…
6 conformes sur 6
```

## 5. Hors de l'erratum, signalé sans proposition

Le générateur corrigé ajouterait aussi au périmètre de T1 un §4.3 (16 corrections retenues sur ses comparables, dont V1-5) et 22 relevés du criblage dont une valeur est déjà corrigée (essais d'après application, E7). La décision limite l'erratum aux quatre sens mal étiquetés : ces informations ne sont **pas** reportées dans l'erratum ; elles restent lisibles en régénérant T1 dans un dossier temporaire, jamais à la place du périmètre arbitré.

## 6. Application, sur décision distincte seulement

1. Écrire le document distinct du §3 (date et décision renseignées) ; le périmètre de T1 et son empreinte ne changent pas.
2. **Ne pas l'inscrire au manifeste** : le manifeste ne protège que des rapports arbitrés et des périmètres acceptés ; une entrée nouvelle qui n'est ni l'un ni l'autre est refusée par C9a, dans sa forme actuelle comme dans la forme proposée (« entrée étrangère », essai R7 de la proposition C9a).
3. Le signaler dans le bilan du volet 2 (§8) et dans le journal d'`ETAT-ACTUEL.md`.

## 7. Décision demandée

Retenir, ou non, cette proposition d'erratum, et autoriser, ou non, son application (§6), séparément.
