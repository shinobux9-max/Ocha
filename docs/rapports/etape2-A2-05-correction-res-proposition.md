# Étape 2 · A2-05 — Correction technique du défaut « RES » : proposition

**Date** : 2026-11-01
**Statut** : **proposition, non appliquée.** Le générateur réel n'est pas modifié. Toute application relève d'une autorisation distincte.

**Autorisation** : arbitrage du 2026-11-01 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Je recommande la **voie A** pour la correction durable : étendre de façon minimale le motif de lecture du générateur pour reconnaître RES. » « Préparer cette correction technique séparément, avec le diff exact et les contrôles de non-régression. Ne pas l'appliquer sans autorisation distincte. » « Ne créer aucune nouvelle règle linguistique ni modifier le découpage arbitré. »

## 1. Le défaut

`perimetre-v2.mjs` lit les règles du découpage arbitré avec le motif `C\d+-[a-z0]`. RES n'a pas de préfixe `C` : sa définition, pourtant présente au découpage, n'est pas lue, et le générateur s'arrête sur T9 (« règle RES : définition introuvable », ligne 78). Il touche les 24 sens de T9, et aucune autre tranche.

**Rectification** : la proposition de correction hors JLPT du 2026-10-20 disait que le tableau des règles ne définit pas RES. C'est inexact ; ce document n'est pas modifié.

## 2. Le correctif proposé

**Générateur, une ligne (+1 / −1)**, ligne 44 :

```diff
-  const regleDef = new Map([...perimetre.matchAll(/^\| (C\d+-[a-z0]) \| ([^|]+) \| \d+ \|$/gm)].map((m) => [m[1], m[2].trim()]));
+  const regleDef = new Map([...perimetre.matchAll(/^\| (C\d+-[a-z0]|RES) \| ([^|]+) \| \d+ \|$/gm)].map((m) => [m[1], m[2].trim()]));
```

RES est reconnu **littéralement** : le motif ne s'élargit à aucune autre forme. Le découpage porte deux lignes RES ; la dernière lue, celle du tableau des règles, donne le libellé : « point déjà réservé à A2-05 par un lot ». Aucune règle linguistique n'est créée.

**Conséquence, recalcul de T9, deux lignes (+2 / −2)** : il fixe l'empreinte du générateur ; sa constante `GENERATEUR` et le libellé de ce contrôle doivent suivre. Sans cela, il rend un écart, et un seul : l'essai A1 le prouve.

| Fichier | Départ | Proposé | Diff | Lignes |
|---|---|---|---|---|
| `a2-05-travail/perimetre-v2.mjs` | `d40aea3c…` | `6537c0ee…` | `0468242f…` | +1 / −1 |
| `a2-05-travail/recalcul-T9-perimetre.mjs` | `dadfd652…` | `7f1afe82…` | `13d499c8…` | +2 / −2 |

Empreintes complètes : `a2-05-travail/correction-res/table-diffs.md` ; versions proposées : `…/proposition/` ; diffs : `…/diffs/`.

## 3. Les essais

`node a2-05-travail/correction-res/preparer.mjs .`, dans un clone jetable, l'ancien générateur gardé à côté.

| Essai | Résultat |
|---|---|
| R0, R1 | une seule ligne change ; au découpage, RES seul s'ajoute aux identifiants lus (23 → 24), aucune règle perdue |
| N1 | **non-régression : T1 à T8, F et 37 livraisons hors bloc E, 46 groupes : texte identique octet pour octet** entre ancien et proposé |
| N2 | ancien générateur sur T9 : arrêt exact |
| N3 | générateur proposé sur T9 : 24 sens, 21 ENTRY, 15 règles dont RES |
| N4 | T9, hors des mentions de RES (24 lignes du §2, 24 relevés, le compte des règles, une ligne de règle) : texte identique à celui de l'ancien générateur sur un criblage sans RES |
| N5 | ligne RES du §3 : libellé du découpage, 24 sens désignés |
| N6 | E1, E2 et E3 produites séparément : 9, 12 et 3 sens |
| N7, N8 | règles inconnues `QQQ` et `C99-z` toujours refusées : **le motif ne devient pas permissif** |
| N9 | sans définition au découpage, RES reste refusée : **aucune définition inventée** |
| N10 | périmètre protégé de T8 : réécriture refusée |
| A1 à A6 | état actuel : recalcul non adapté, un seul écart ; adapté, tous les contrôles à 0 ; relais 30 sur 30 ; aperçu vide ; **deux fichiers modifiés, aucun autre** |
| B1 à B4 | état consolidé simulé : mêmes ancres, recalcul à 0 ; 44e entrée, contrôles à 0 ; périmètre accepté de T9, réécriture refusée |

**Premier lancement : code 1, deux écarts, aucune proposition écrite**, l'un et l'autre dans les essais :

- **N4** : ma fonction de comparaison laissait « ` ;  ; ` » quand RES est au milieu de la liste, sur la seule ligne de 昼ご飯 ; le générateur était correct.
- **N9** : le refus venait du manifeste, le découpage étant protégé, et non de la définition absente : l'essai ne testait pas ce qu'il disait. Le manifeste du clone est désormais ajusté, et le refus attendu vient bien de la définition.

Aucun contrôle n'a été assoupli. La sortie du premier lancement est conservée (`a2-05-travail/correction-res/sortie-preparation-1-code1.txt`).

## 4. Ce que la correction ne change pas

- **Le rapport accepté de T9 reste tel quel.** Un périmètre accepté ne se régénère pas ; RES y reste rendu à part, au §6.4.
- **L'ordre avec la consolidation de T9 est indifférent** : les ancres du recalcul sont les mêmes avant et après (A et B).
- **Découpage, criblage, registre, données, normes, documents protégés** : inchangés (A5).

**Aperçu, pour lecture seule** : `a2-05-travail/correction-res/apercu/T9-avec-RES.md`, le périmètre tel que l'écrirait le générateur corrigé. Il ne remplace rien.

## 5. Effets connus, à savoir avant d'autoriser

1. **`perimetre-T9.mjs` ne se relancera plus** : il exige l'arrêt sur RES, qui aura disparu. Il refuse alors, sans rien écrire, et le rapport reste inchangé (B2). C'est le comportement voulu pour un périmètre accepté.
2. **Le sabotage S21 de `sabotages-recalcul-T9.mjs`** vise l'ancien motif : relancé, il serait « sans effet ». Cette version du script décrit déjà un recalcul antérieur à la consolidation.
3. **`correction-comparables/essais.mjs --apres-application`** fixe l'ancienne empreinte du générateur : il ne passerait plus. Script historique, hors des contrôles en service.
4. **Les générateurs v1** (`perimetre-v1-lot3-B*.mjs`) ont le même motif : archives de livraisons closes, non touchées.
5. **L'inscription à l'inventaire** de `correction-res/preparer.mjs` n'est pas prévue dans la consolidation de T9, tenue séparée ; elle accompagnerait l'application.

## 6. Décisions demandées

1. Accepter le correctif, une ligne et sa conséquence.
2. Autoriser son application, distinctement de la consolidation de T9.
