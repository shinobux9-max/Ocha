# Aperçu de la synchronisation documentaire stable (proposition, non appliquée)

**Date** : 2026-10-18
**Statut** : **aperçu généré par `a2-05-travail/sync-pilotage-v2.mjs`, sans effet sur les documents de pilotage.** Aucun marqueur n'est inséré ; aucun document n'est modifié.

## 1. Bloc d'état commun, identique dans `ETAT-ACTUEL.md` et `ROADMAP.md`

Il remplacerait les nombres aujourd'hui recopiés à la main dans les cinq rubriques ; le texte rédigé (décisions, motifs, prochaine action) resterait écrit à la main, hors des marqueurs.

```markdown
<!-- a2-05:etat:debut (bloc généré par a2-05-travail/sync-pilotage-v2.mjs ; ne pas modifier à la main) -->
- **Lot 3** : 148 sens arbitrés sur 377 ; 229 restent (0 proposés). **Bloc B** : 79 sur 148.
- **Corrections retenues, non appliquées** : 185, dans 165 ENTRY ; prochain numéro libre : V1-11.
- **Tranches** : T1 (B10, B11, B12 ; 24 sens ; planifiée) ; T2 (B13, B14 ; 21 sens ; planifiée) ; T3 (B15, B16 ; 24 sens ; planifiée) ; T4 (C1, C2, C3, C4 ; 35 sens ; planifiée) ; T5 (D2, D3 ; 22 sens ; planifiée) ; T6 (D6, D7 ; 22 sens ; planifiée) ; T7 (D1, D4 ; 24 sens ; planifiée) ; T8 (D5, D8 ; 16 sens ; planifiée) ; T9 (E1, E2, E3 ; 24 sens ; planifiée) ; F (F1, F2 ; 17 sens ; suspendue) ; 212 sens hors du bloc F.
- **Contrôles** : registre de couverture sans omission ni doublon ; manifeste d'empreintes, 27 rapports arbitrés identiques.
<!-- a2-05:etat:fin -->
```

## 2. Modèles générés à chaque cycle

- **Ligne du journal d'`ETAT-ACTUEL.md`** : `| <date> | 2 · A2-05 | <tranche> : <objet> ; 148 arbitrés sur 377 ; 185 corrections dans 165 ENTRY. | non committé |`, les nombres étant calculés.
- **Sous-section du bilan du volet 2** : en-tête, renvoi au rapport, et nombres calculés ; le texte de l'arbitrage est recopié depuis le §0 du rapport, non réécrit.
- **Puce du relais allégé** : une ligne par cycle (voir la proposition de relais allégé).

## 3. Contrôles du script

| Contrôle | Résultat |
|---|---|
| Livraisons restantes toutes rattachées à une tranche | 24 livraisons, aucune hors registre |
| Aucune livraison dans deux tranches | contrôlé |
| Sens hors du bloc F dans les tranches | 212 |
| Liste globale recalculée | 10 V1, 165 V2, 10 modifications du volet 2 : 185 corrections, 165 ENTRY |

## 4. Ce que l'adoption demanderait

1. Insérer une fois les marqueurs dans `ETAT-ACTUEL.md` et `ROADMAP.md`, à la place des nombres des cinq rubriques (proposition à relire).
2. Ajouter un mode d'application qui ne remplace que le contenu entre marqueurs, et s'arrête si les marqueurs manquent ou sont dupliqués.
3. Retirer les scripts de synchronisation propres à chaque cycle (`tourNN.mjs`).

