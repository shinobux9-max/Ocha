# Étape 2 · A2-05 — essais de la synchronisation stable par marqueurs

**Date** : 2026-10-18
**Statut** : **essais d'une proposition, non activée.** Écrit par `a2-05-travail/essais-sync-stable.mjs` ; toute écriture a lieu dans un dossier temporaire du système, sur des copies de `ETAT-ACTUEL.md` et `ROADMAP.md` ; les documents réels sont comparés par SHA-256 avant et après. Commit marqué dans les essais : `78031638c0f81dca1b167e3f57f5a891767fc4cb`.

**Résultat** : **41 essais, tous conformes.**

| N° | Groupe | Objet | Résultat | Détail |
|---|---|---|---|---|
| V1 | valeurs | valeurs calculées | conforme | 148/377, 229 restants ; bloc B 79/148 ; 185 corrections, 165 ENTRY ; V1-11 ; 27 empreintes |
| N1 | non-régression | insertion dans `ETAT-ACTUEL.md` : texte hors bloc identique | conforme | 6 lignes de bloc et 1 ligne vide insérées ; fins de ligne conservées |
| N1 | non-régression | insertion dans `ROADMAP.md` : texte hors bloc identique | conforme | 6 lignes de bloc et 1 ligne vide insérées ; fins de ligne conservées |
| N2 | non-régression | marquage `7803163` : seules les dernières cellules visées changent | conforme | 29 lignes changées sur 1295 ; 29 visées ; 1 ligne(s) postérieure(s) au commit laissée(s) « non committé » |
| N3 | non-régression | plan complet appliqué sur copie de `ETAT-ACTUEL.md` : bloc inséré + 29 cellules, rien d'autre | conforme | texte hors bloc identique au seul marquage |
| N3 | non-régression | plan complet appliqué sur copie de `ROADMAP.md` : bloc inséré, rien d'autre | conforme | aucune ligne de journal dans ROADMAP.md |
| I1 | idempotence | second plan sur les copies synchronisées : aucune différence | conforme | 0 ligne(s) du journal marquées `7803163` sur 29 visées (29 déjà marquées) |
| I1 | idempotence | seconde application : aucun octet écrit | conforme | empreintes inchangées |
| I2 | idempotence | remplacement par le même bloc : identique | conforme | — |
| I3 | non-régression | valeurs changées : seules les lignes du bloc changent | conforme | 2 lignes changées, toutes dans le bloc |
| I4 | idempotence | second marquage `7803163` | conforme | 0 marquées, 29 déjà marquées |
| I5 | idempotence | ligne de journal ajoutée une fois, puis rien | conforme | — |
| I6 | idempotence | sous-section §8.64 ajoutée une fois, puis rien | conforme | — |
| R1 | refus | marqueur de début absent | conforme | refus : « marqueur de début absent » |
| R2 | refus | marqueur de fin absent | conforme | refus : « marqueur de fin absent » |
| R3 | refus | marqueur de début dupliqué | conforme | refus : « marqueur de début dupliqué (2) » |
| R4 | refus | marqueur de fin dupliqué | conforme | refus : « marqueur de fin dupliqué (2) » |
| R5 | refus | marqueurs inversés | conforme | refus : « marqueur de fin avant le marqueur de début » |
| R6 | refus | bloc retouché à la main (148 → 149) | conforme | refus : « bloc modifié à la main : son contenu ne correspond plus à l'empreinte de son marqueur » |
| R7 | refus | marqueur de début mal formé | conforme | refus : « marqueur de début mal formé » |
| R8 | refus | marqueur cité hors ligne | conforme | refus : « marqueur a2-05:etat mal formé ou hors ligne (3 occurrences) » |
| R9 | refus | insertion alors que les marqueurs existent | conforme | refus : « marqueurs déjà présents : l'insertion est unique » |
| R10 | refus | ligne d'ancrage absente | conforme | refus : « ligne d'ancrage « - **Terminé et arbitré.** » : 0 occurrence(s), une seule attendue » |
| R11 | refus | ligne d'ancrage dupliquée | conforme | refus : « ligne d'ancrage « - **Terminé et arbitré.** » : 2 occurrence(s), une seule attendue » |
| R12 | refus | rubrique incohérente (148 → 149 dans le texte rédigé) | conforme | refus : « rubrique « candidats arbitrés » incohérente avec les valeurs calculées : « **149 candidats arbitrés sur 377 ; 229 restent** » » |
| R13 | refus | rubrique de corrections incohérente (185 → 186) | conforme | refus : « rubrique « corrections » incohérente avec les valeurs calculées : « **186 corrections, dans 165 ENTRY** » » |
| R14 | refus | marqueurs dans un seul des deux documents | conforme | refus : « marqueurs présents dans un seul des deux documents de pilotage » |
| R15 | refus | blocs divergents entre les deux documents | conforme | refus : « blocs différents dans ETAT-ACTUEL.md et ROADMAP.md » |
| R16 | refus | application avec une empreinte qui n'est pas celle de l'aperçu | conforme | refus : « empreinte du plan différente de celle de l'aperçu montré : rien n'est écrit » |
| R17 | refus | document modifié entre l'aperçu et l'application | conforme | refus : « ROADMAP.md modifié depuis le calcul du plan : rien n'est écrit » |
| R16-17 | refus | aucune écriture après refus | conforme | ETAT-ACTUEL.md inchangé |
| R18 | refus | commit inconnu | conforme | refus : « commit inconnu : deadbeefdeadbeef » |
| R19 | refus | commit sans ligne « non committé » (`558f150`) | conforme | refus : « aucune ligne « non committé » dans le commit » |
| R20 | refus | ligne du commit retouchée dans le journal courant | conforme | refus : « ligne du commit introuvable dans le journal courant : « \| 2026-10-12 \| 2 · A2-05 \| Volet 1, lot 2 : tranches 6, 7 et » » |
| R21 | refus | ligne du commit dupliquée dans le journal courant | conforme | refus : « ligne dupliquée dans le journal » |
| R22 | refus | ligne de journal mal formée | conforme | refus : « ligne de journal mal formée » |
| R23 | refus | sous-section du bilan hors séquence | conforme | refus : « §8.65 : la dernière sous-section est 8.63 » |
| R24 | refus | sous-section existante, contenu différent | conforme | refus : « §8.64 existe déjà avec un autre contenu » |
| P1 | protection | documents réels inchangés par les essais | conforme | `ETAT-ACTUEL.md`, `ROADMAP.md`, `docs/rapports/etape2-A2-05-bilan-volet2.md` |
| P2 | protection | rapports arbitrés | conforme | 27 empreintes identiques |
| P3 | protection | données, normes, registres, snapshots, outils, tests, application | conforme | aucun changement |
