# Étape 2 · A2-05 — Correction technique du défaut « RES » : proposition régénérée

**Date** : 2026-11-01
**Statut** : **proposition, non appliquée.** Le générateur réel n'est pas modifié. L'application relève d'une autorisation technique distincte.

**Autorisation** : arbitrage du 2026-11-01 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **Je confirme que la correction technique RES doit précéder l'audit lexical T9.** » « Après O3, préparer, sans appliquer » le diff minimal du générateur, l'adaptation de l'empreinte dans la version actuelle du recalcul de T9, les preuves de non-régression, les contrôles de refus des marques non définies, les simulations sur copie et les diffs exacts.

**Document d'origine** : `etape2-A2-05-correction-res-proposition.md`, conservé, avec sa description du défaut (§1). Celui-ci en régénère les preuves sur l'état réel d'après O3 : recalcul de T9 adapté, 33 contrôles ; périmètre accepté protégé, 44 entrées.

## 1. Ce qui change, et ce qui ne change pas

**Le correctif du générateur est celui que vous avez accepté sur le fond** : empreinte proposée `6537c0ee…`, identique, et diff identique à partir du premier `@@`.

**Générateur, une ligne (+1 / −1)**, `perimetre-v2.mjs`, ligne 44 :

```diff
-  const regleDef = new Map([...perimetre.matchAll(/^\| (C\d+-[a-z0]) \| ([^|]+) \| \d+ \|$/gm)].map((m) => [m[1], m[2].trim()]));
+  const regleDef = new Map([...perimetre.matchAll(/^\| (C\d+-[a-z0]|RES) \| ([^|]+) \| \d+ \|$/gm)].map((m) => [m[1], m[2].trim()]));
```

**Recalcul de T9, version actuelle, deux lignes (+2 / −2)** : la constante `GENERATEUR` et le libellé de ce contrôle.

```diff
-const GENERATEUR = 'd40aea3c…', CRIBLAGE = 'aef9e029…';
+const GENERATEUR = '6537c0ee…', CRIBLAGE = 'aef9e029…';
-… 'générateur et criblage inchangés (défaut non corrigé, marques conservées)' …
+… 'générateur à sa version corrigée (voie A, sur autorisation) ; criblage inchangé, marques conservées' …
```

| Fichier | Départ | Proposé | Diff | Lignes |
|---|---|---|---|---|
| `a2-05-travail/perimetre-v2.mjs` | `d40aea3c…` | `6537c0ee…` | `99c23938…` | +1 / −1 |
| `a2-05-travail/recalcul-T9-perimetre.mjs` | `63aaa07c…` | `af733154…` | `a945f684…` | +2 / −2 |

Empreintes complètes : `a2-05-travail/correction-res/regeneration/table-diffs.md`. L'empreinte de diff du générateur diffère de celle relue (`0468242f…`) parce que l'en-tête nomme le nouveau chemin de la proposition ; le corps est identique. Le diff et l'empreinte de recalcul d'origine (`13d499c8…`, `7f1afe82…`) sont **caducs**.

## 2. Les preuves

`node a2-05-travail/correction-res/regeneration/preparer.mjs .`, dans un clone jetable, l'ancien générateur gardé à côté. **Code 0, dès le premier lancement.**

| Demande | Essai | Résultat |
|---|---|---|
| Diff minimal | R0, R1, R2 | une seule ligne ; au découpage, RES seul s'ajoute (23 → 24) ; corps du diff identique à celui relu |
| Adaptation de l'empreinte | A1, A2 | sans adaptation, un seul écart, l'empreinte ; adapté, 33 contrôles conformes |
| Non-régression, groupes historiques | N1 | **T1 à T8, F et 37 livraisons, 46 groupes, tous produits : texte identique octet pour octet** |
| T9 | N2 à N6 | ancien : arrêt exact ; proposé : 24 sens, 21 ENTRY, 15 règles dont RES ; hors des mentions de RES, identique à l'ancien sur un criblage sans RES ; E1, E2, E3 produites |
| Refus des marques non définies | N7, N8 | **`QQQ`, `C99-z`, `RES2`, `res`, `RESERVE`, `XRES`, `C1` refusées ; sans définition au découpage, RES aussi** |
| Protection | N9, A8 | périmètres protégés de T8 et de T9, réécriture refusée ; `perimetre-T9.mjs` refuse, rapport inchangé |
| Contrôles en service | A3 à A5 | recalculs T5 à T9, pilote, couverture, 44 empreintes à 0 ; relais 30 sur 30 ; aperçu vide, plan `7d25ea8442b9dd06` inchangé |
| Portée | A6, A7 | **deux fichiers modifiés, aucun autre** ; `node --check` |
| Verrou | S1, S2 | retour à l'ancien motif, motif élargi : tous deux détectés |

## 3. Effets à connaître avant d'autoriser

1. **Le rapport accepté de T9 ne change pas** : il ne se régénère pas, et RES y reste rendu à part, au §6.4.
2. **L'en-tête de `recalcul-T9-perimetre.mjs`** dit encore « défaut signalé, non corrigé » : c'est un commentaire d'historique, vrai du rapport accepté, que le correctif minimal ne touche pas.
3. **Le sabotage S21 de `sabotages-recalcul-T9.mjs`** vise l'ancien motif ; relancé, il serait « sans effet ». Ce script décrit déjà la version initiale du recalcul.
4. **`correction-comparables/essais.mjs --apres-application`** fixe l'ancienne empreinte : script historique, hors des contrôles en service.
5. **Les générateurs v1** gardent le même motif : archives de livraisons closes.
6. **Le module d'audit `lot3-commun-v2.mjs` ne lit pas ce motif** : le défaut ne touche que le générateur de périmètres. L'audit de T9 n'a pas été lancé pour le vérifier. Votre décision de faire précéder l'audit par la correction n'en dépend pas, et elle est respectée ici.

## 4. Décision demandée

Autoriser l'application des deux diffs, par un script dédié, essayé sur copie, distinctement de l'ouverture de l'audit de T9.
