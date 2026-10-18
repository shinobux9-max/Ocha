# Proposition : relais de reprise allégé d'A2-05 (non appliquée)

**Date** : 2026-10-18
**Statut** : **proposition, non appliquée.** Le relais actuel, `docs/relecture/reprise-A2-05.md` (environ 250 Ko, une puce d'environ 2 Ko par cycle), n'est pas modifié. Si la proposition est retenue, ce texte remplacerait son contenu courant ; l'historique resterait dans git (au checkpoint), dans le bilan du volet 2 (§8) et dans le journal d'`ETAT-ACTUEL.md`.

---

## Modèle proposé (environ 5 Ko, stable d'un cycle à l'autre)

### 1. Objet

Permettre de reprendre A2-05 dans une session neuve. Ce fichier ne décide rien ; il renvoie aux documents qui font foi.

### 2. Où sont les choses

| Besoin | Document |
|---|---|
| État chiffré (lot 3, bloc B, corrections, tranches) | bloc généré entre les marqueurs `a2-05:etat` d'`ETAT-ACTUEL.md` (proposition de synchronisation stable) |
| Historique des arbitrages | `docs/rapports/etape2-A2-05-bilan-volet2.md`, §8, une sous-section par cycle |
| Découpage des 377 et règles du criblage | `docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md` (arbitré le 2026-10-12) |
| Couverture des 377 | `a2-05-travail/couverture-lot3.mjs` (registre calculé) |
| Rapports arbitrés protégés | `a2-05-travail/empreintes-rapports-arbitres.json` |
| Tranches | `a2-05-travail/registre-tranches.json` |
| Scripts et ce qu'ils écrivent | `a2-05-travail/INVENTAIRE-SCRIPTS.md` |
| Liste globale des corrections retenues | bilan du volet 2, §2 et §8 |

### 3. Règles qui ne changent pas

- Aucune décision avant l'acceptation explicite d'un périmètre ; chaque fiche source lue en entier ; chaque champ justifié ; le tri simple ou complexe n'est qu'une aide.
- Un rapport arbitré ne se régénère jamais ; un arbitrage s'inscrit au §0, la proposition est conservée.
- Aucune correction appliquée, aucune donnée, norme, registre, snapshot ni test modifié sans accord spécifique ; validation, commit et push : trois accords distincts.
- Fermés jusqu'à décision : QC-1, QC-2, HP-1 à HP-4, G1 à G7, le bloc F, E5, le balayage global des relations.

### 4. Dernier cycle

Une ligne par cycle, générée : date, objet, rapport, décomptes calculés. Les lignes plus anciennes sont dans le bilan du volet 2.

### 5. Prochaine action

Une ligne, recopiée de la rubrique « Prochaine action » d'`ETAT-ACTUEL.md`.

---

## Ce que l'adoption demanderait

1. Une archive de l'actuel relais dans git (checkpoint), avant remplacement.
2. Le remplacement du contenu courant par ce modèle, rempli par le script de synchronisation stable.
3. Dans les notes d'export, la différence du relais au lieu de sa copie entière.
