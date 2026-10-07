# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 26 « Passe finale » (5.16) · validation

**Date** : 2026-10-07
**Nature** : **validation atomique**, statuts seulement. **Ni committé, ni poussé.**
**Autorisation** : donnée explicitement par ChatGPT, par délégation, et relayée par l'utilisateur :
« J'autorise explicitement la validation du lot 26. » Elle couvre la seule bascule de statut des 19
ENTRY rouvertes et des 44 décisions D1570 à D1613. **Aucun commit et aucun push ne sont autorisés.**
**Base** : `ocha-v2` = `origin/ocha-v2` = `8ce0e23`.

**En bref** : 63 statuts sont passés de `proposed` à `validated`, et rien d'autre n'a changé.
L'assemblage réel, partiel et complet, donne **684 ENTRY, 35 retraits, 0 entrée écartée**, 0 problème,
0 erreur, 0 attente. Le journal compte **1 613 décisions, toutes validées**. 490 tests verts ; 40
sabotages attrapés sur 40.

---

## 1. Ce qui a été validé

Le contenu est celui de la proposition, relue, révisée (la raison de D1613) et vérifiée : rapport
`docs/rapports/etape2-A2-04-lot26-proposition.md`, §12.

| Objet | Nombre | Bascule |
|---|---|---|
| ENTRY rouvertes, dans leur lot d'origine | 19 | `proposed` → `validated` |
| Décisions du journal, D1570 à D1613 | 44 | `proposed` → `validated` |
| **Total** | **63 statuts** | |

Les 19 ENTRY : お風呂 (lot 03) ; 開ける, 閉める, 消す, 並べる (lot 18) ; 借りる, 渡す, 上げる, 頼む,
煙草 (lot 19) ; する (lot 20) ; しかし, それから, では, じゃあ, はい, いいえ (lot 23) ; 少ない, ちょっと
(lot 24). `lot-26.json`, sans entrée, ne change pas.

## 2. La bascule : statuts seulement

Des copies du journal et des sept fichiers de lot ont été prises **avant** la bascule, hors dépôt.
Le script de bascule refuse d'écrire si une ligne autre qu'un statut changeait. La comparaison
ci-dessous a ensuite été refaite, de façon indépendante, entre ces copies et les fichiers validés.

| Fichier | Lignes (avant = après) | Lignes changées | Toutes `"status": "proposed"` → `"validated"` | Contenu identique hors statut |
|---|---|---|---|---|
| `journal.json` | 23 795 | **44** | oui | oui |
| `lots/lot-03.json` | 1 503 | **1** | oui | oui |
| `lots/lot-18.json` | 1 109 | **4** | oui | oui |
| `lots/lot-19.json` | 1 177 | **5** | oui | oui |
| `lots/lot-20.json` | 1 017 | **1** | oui | oui |
| `lots/lot-23.json` | 770 | **6** | oui | oui |
| `lots/lot-24.json` | 727 | **2** | oui | oui |
| `lots/lot-26.json` | 6 | **0** | — | oui |
| **Total** | | **63** | | |

**Numéros des lignes changées** (les mêmes avant et après, puisque aucune ligne n'est ajoutée ni
retirée) :

- `journal.json` : 22170, 22222, 22239, 22284, 22301, 22346, 22363, 22434, 22451, 22501, 22518,
  22573, 22590, 22663, 22680, 22750, 22767, 22843, 22860, 22914, 22931, 22984, 23001, 23091, 23108,
  23125, 23142, 23215, 23232, 23249, 23299, 23316, 23342, 23416, 23433, 23485, 23502, 23577, 23594,
  23611, 23684, 23696, 23763, 23775 ;
- `lot-03.json` : 294 ;
- `lot-18.json` : 39, 121, 218, 924 ;
- `lot-19.json` : 470, 574, 659, 727, 1074 ;
- `lot-20.json` : 407 ;
- `lot-23.json` : 6, 95, 183, 439, 513, 603 ;
- `lot-24.json` : 48, 306.

Chacune de ces 63 lignes est, avant, `"status": "proposed",` et, après, `"status": "validated",`, à
la même indentation.

**Ce qui n'a pas changé** : aucun contenu lexical, aucune relation, aucun identifiant, l'ordre des
décisions, les champs `before` et `after`, les règles (`rules.mjs`), `data/`. Aucun autre fichier de
`reconstruction/`, `tools/`, `data/` ni `src/` n'a été modifié par la bascule.

**Hors données, la validation a aussi touché** : les tests d'état du lot 26 (§5), les rapports
générés des sept lots concernés (ils affichent le statut), et les documents de suivi (§7).

## 3. L'état validé

| Élément | Avant la validation (proposition) | Après la validation |
|---|---|---|
| Assemblage réel, partiel | 665 ENTRY, 35 retraits, 19 écartées | **684 ENTRY, 35 retraits, 0 écartée** |
| Assemblage réel, complet | incomplet (19 propositions) | **684 ENTRY, 35 retraits, 0 écartée** |
| Problèmes, erreurs, attentes | 0, 0, 0 | **0, 0, 0** |
| Avertissements | 140 | **148**, aucun nouveau : ce sont ceux d'avant le lot 26 |
| Journal | 1 569 validées, 44 proposées | **1 613 validées, aucune proposition en cours** |
| Lots | 19 entrées proposées | **27 lots entièrement validés** |
| Relations dans le lexique assemblé | aucune | **22 liens**, notés une fois chacun |

**L'essai à blanc est devenu l'état réel** : un test vérifie que les lots et le journal lus dans les
fichiers sont identiques à l'essai à blanc d'avant la validation.

**Empreinte des décisions validées** (SHA-256 de la sérialisation des décisions, fixée dans un test) :

| Plage | Empreinte | État |
|---|---|---|
| D0001 à D1569 | `c7375b5b…6bf3ddbe` | **inchangée** depuis la validation du lot 25 |
| D0001 à D1613 | `19c9c1a2…85ae589d` | **nouvelle**, fixée à la validation du lot 26 |

**Contre le commit `8ce0e23`** : les 1 569 décisions committées sont un préfixe exact du journal ;
699 entrées sont identiques ; les 19 ENTRY rouvertes ont, dans le champ `before` de leur décision de
réouverture, exactement leur état committé ; le diff de `data/`, des sources figées, de
`place-tags.json`, de `src/` et de `docs/conception/` est vide.

## 4. Les contrôles

**Lancés par Claude Code sur le dépôt local.** Le relecteur ne peut pas les reproduire.

| Contrôle | Résultat |
|---|---|
| Bascule contre les copies d'avant | 63 lignes changées, toutes de statut ; contenu hors statut identique (§2) |
| `run.mjs assemble` | 684 ENTRY, 35 retraits, 0 écartée ; 0 problème, 0 erreur, 0 attente ; 148 avertissements |
| `run.mjs assemble --complete` | 684 ENTRY, 35 retraits, 0 écartée ; 0 problème, 0 erreur, 0 attente ; 148 avertissements |
| Références (mode complet) | 71 extraites, 71 remappées, 0 perdue |
| Suite de tests | **490 tests verts** |
| Sabotages sur l'état validé | **40 attrapés sur 40** ; témoin sain avant et après ; fichiers restaurés à l'octet |
| `check-layers` | aucune violation |
| `validate-data` | 0 erreur, 8 avertissements connus |
| `run.mjs verify` | sources conformes au manifeste |
| `git diff --check` | propre |
| `node --check` | sur chaque fichier JS modifié |
| Rapports générés | régénérés pour les lots 03, 18, 19, 20, 23, 24 et 26 ; aucun n'affiche plus de proposition |

## 5. Les tests d'état, adaptés à l'état validé

Dans `tests/reconstruction/lot-26.test.js` (neuf tests, comme à la proposition) :

- **statuts** : les 27 lots sont entièrement validés, aucune entrée proposée ; les 44 décisions du
  lot 26 et tout le journal sont validés ;
- **empreinte** : D0001 à D1569 inchangée, D0001 à D1613 fixée ;
- **assemblage** : le test de « l'état réel de la proposition » (665 ENTRY, 19 écartées) devient
  celui de l'**assemblage réel** (684, 35, 0), avec les 19 ENTRY assemblées et leurs 22 liens, et
  vérifie que l'essai à blanc est identique à l'état réel ;
- **inchangés** : le rejeu des décisions sur l'état d'avant, les 22 liens et ce que l'arbitrage
  écarte, les 15 ENTRY seulement visées, 頼む, 煙草, 居る, すぐに, la table de correspondance.

`workspace.test.js` : un commentaire note que l'essai à blanc est désormais l'état réel. Aucune
assertion n'y change.

## 6. Les sabotages, sur l'état validé

Le harnais lance `tests/reconstruction/*.test.js` et vérifie d'abord un **témoin sain** (96 tests, 0
échec), avant et après. Chaque sabotage modifie réellement un fichier, puis le fichier est restauré à
l'octet. **40 attrapés sur 40.**

**Sept sabotages propres à l'état validé** (cinq nouveaux, deux adaptés de la proposition) :

| Sabotage | Attrapé |
|---|---|
| une ENTRY revalidée repassée en `proposed` (お風呂) — adapté | oui |
| une décision du lot 26 repassée en `proposed` (D1571) — adapté | oui |
| une ENTRY seulement visée passée en `proposed` (開く) | oui |
| une décision de réouverture repassée en `proposed` (D1609) | oui |
| une décision **validée du lot 26** modifiée (raison de D1589) | oui, par l'empreinte D0001 à D1613 |
| l'identifiant d'une décision changé (D1600 en D1614) | oui |
| l'ordre de deux décisions inversé (D1600, D1601) | oui |

**Les 33 autres, rejoués sur l'état validé** : relation retirée, de type changé, de cible changée, de
cible inexistante, déplacée sur un autre sens, hors registre ; lien miroir sur une ENTRY non
rouverte ; liens écartés par l'arbitrage (« De rien », graphe complet, « Sur ce », degré de 少し,
たくさん) ; furigana et kana de 頼む ; forme, furigana et sens de 煙草 ; autre champ modifié dans une
ENTRY rouverte ; citation historique retirée ; 居る et すぐに touchées ; `lot-26.json` avec une entrée ;
décision validée antérieure modifiée (D1175) ; champ `before` altéré ; dernière décision supprimée ;
décision rattachée à un autre lot ; champ `after` contredisant la donnée ; ancienne raison de D1613
rétablie ; table de correspondance ; les deux listes fermées.

## 7. Suivi documentaire

| Document | Mise à jour |
|---|---|
| `ETAT-ACTUEL.md` | étape en cours, plan de l'étape 2 (ligne 7), points ouverts de la passe finale fermés, journal des tâches |
| `ROADMAP.md` | position actuelle, ligne 5.16, état chiffré après le lot 26, section du lot 26, prochaine action |
| `CLAUDE.md` | §5 : lot 26 validé, chiffres attendus de l'assemblage réel ; doctrine des listes fermées |
| `docs/relecture/note-relais.md` | état du lot, ce qui est attendu, prochaine action |
| Rapport de proposition | une ligne d'en-tête renvoie à ce rapport |

## 8. Ce qui reste, et ce qui n'est pas autorisé

- **Non autorisés** : le commit et le push. Ils demandent deux accords distincts et explicites.
- **Hors du futur commit** : le dossier `chatgpt-relecture/` et les archives ZIP, qui restent des
  artefacts de transmission, non suivis.
- **Après le lot 26** : la publication 5.17 (écriture dans `data/`, `lieux.json`, références
  remappées) ; la tâche 11 (registre de phrases), qui appliquera la table de correspondance
  d'`exemples.json` ; l'audit A2-05.

## 9. Où trouver les pièces dans l'export de relecture

| Pièce | Fichier de l'export |
|---|---|
| Ce rapport, le rapport de proposition, le rapport de périmètre, le rapport généré | `06-lot-courant-rapports.md` |
| Les 19 ENTRY revalidées : fiche source, état validé, toutes leurs décisions | `07-lot-courant-sources.md`, partie 3 |
| `lot-26.json` (sans entrée) | `08-lot-courant.json` |
| Les 44 décisions, toutes `validated` | `09-journal-lot-courant.json` |
| Le diff contre `8ce0e23`, les contrôles, la comparaison avant / après du journal | `10-diff-et-controles.md` |

**Limite de l'export** : sa comparaison avant / après (`10`, §3) ne porte que sur `lot-26.json` et sur
le journal, l'outil ne comparant qu'un fichier de lot. Celle des six autres fichiers de lot est au §2
de ce rapport ; les copies d'avant ne sont ni versionnées ni fournies.

**Correction de l'outil d'export, faite à la validation** : `tools/export-relecture.mjs` découpait les
fichiers sur `\n` seulement. `journal.json` étant en fins de ligne CRLF sur cette machine, chaque
ligne gardait un retour chariot et la colonne « toutes sont `"status": "proposed"` → `"validated"` »
affichait `false` à tort, alors que les 44 lignes sont bien des lignes de statut (§2). Le découpage
accepte maintenant LF et CRLF (une ligne modifiée). C'est le seul changement d'outil de la
validation ; il ne touche aucune donnée, et la suite de tests reste verte.
