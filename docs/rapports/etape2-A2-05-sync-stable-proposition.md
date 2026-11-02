# Étape 2 · A2-05 — synchronisation documentaire stable par marqueurs (étape 2 du plan de transition)

**Date** : 2026-10-18
**Statut** : **proposition, non activée.** Préparation autorisée le 2026-10-18, après le push du checkpoint B (`78031638c0f81dca1b167e3f57f5a891767fc4cb`), référence documentaire de la transition. L'outil n'a écrit dans aucun document de pilotage : il n'a été lancé sur les documents réels qu'en aperçu, et son mode d'application ne l'a été que sur des copies temporaires. Le relais actuel n'est pas remplacé. **Aucun périmètre de T1, aucun audit lexical, aucun `git add`, commit ni push.**

## 1. Ce qui est proposé

| Élément | Fichier | Rôle |
|---|---|---|
| Module | `a2-05-travail/sync-stable.mjs` | fonctions pures et ligne de commande ; successeur proposé de `sync-pilotage-v2.mjs`, qui reste inchangé |
| Essais | `a2-05-travail/essais-sync-stable.mjs` → `docs/rapports/etape2-A2-05-sync-stable-essais.md` | non-régression, idempotence, refus ; uniquement sur copies temporaires |
| Aperçu réel | `a2-05-travail/sync-stable-apercu.md` | différences que produirait l'application sur les documents réels, avec l'empreinte du plan |

**Le bloc d'état.** Un bloc unique, identique dans `ETAT-ACTUEL.md` et `ROADMAP.md`, entre deux marqueurs, inséré une seule fois juste avant la rubrique « Terminé et arbitré » de l'étape en cours :

```markdown
<!-- a2-05:etat:debut empreinte=<16 caractères hexadécimaux> (bloc généré par a2-05-travail/sync-stable.mjs ; ne pas modifier à la main) -->
- **Lot 3** : … **Bloc B** : …
- **Corrections retenues, non appliquées** : … ; prochain numéro libre : …
- **Tranches** : …
- **Contrôles** : …
<!-- a2-05:etat:fin -->
```

Les valeurs sont **calculées**, jamais recopiées : registre de couverture des 377, liste globale des corrections du bilan du volet 2 (§8 et modifications du volet 2), registre des tranches, manifeste des empreintes. Le marqueur de début porte l'empreinte du contenu du bloc, ce qui permet de déceler toute retouche à la main.

**Ce qui reste rédigé à la main.** Les rubriques (décisions, motifs, prochaine action), les lignes du journal et les sous-sections du bilan. L'outil les **contrôle** sans les réécrire : les nombres des rubriques (candidats arbitrés, bloc B, corrections) doivent être ceux qu'il calcule, faute de quoi il refuse. Il offre deux ajouts contrôlés : une ligne de journal, insérée après la dernière ligne du tableau et refusée si elle est mal formée ; une sous-section §8.N du bilan, refusée hors séquence. Rejoués, ces deux ajouts ne changent rien.

**Les mentions « non committé ».** `--commit <sha>` marque, dans le journal d'`ETAT-ACTUEL.md`, **les seules lignes qui portaient « non committé » dans le commit lui-même**. Le contenu de `ETAT-ACTUEL.md` est lu à ce commit, et le commit doit être contenu dans `origin/ocha-v2`, c'est-à-dire poussé. Seule la dernière cellule change : `non committé` devient le hash court. Les lignes postérieures au commit ne sont pas touchées.

## 2. Garanties, et refus correspondants

| Garantie | Mécanisme | Essais |
|---|---|---|
| Aucune écriture sans différence montrée | `--apercu` n'écrit que l'aperçu ; `--appliquer` exige `--plan <empreinte>`, celle de l'aperçu, et refuse si un document a changé depuis | R16, R17 |
| Marqueurs uniques et cohérents | refus si un marqueur est absent, dupliqué, mal formé, mal ordonné ou cité hors ligne ; insertion unique ; ligne d'ancrage unique | R1 à R11 |
| Bloc non retouché | empreinte du contenu dans le marqueur de début | R6 |
| Deux documents en accord | refus si les marqueurs ne sont que dans un des deux documents, ou si leurs blocs diffèrent | R14, R15 |
| Rubriques rédigées en accord avec les valeurs calculées | `verifierCoherence` | R12, R13 |
| Rien hors des marqueurs et des cellules visées | comparaison ligne à ligne ; fins de ligne conservées | N1 à N3, I3 |
| Idempotence | second plan sans différence, seconde application sans écriture ; marquage, ligne de journal et sous-section rejoués sans effet | I1 à I6 |
| Marquage limité au commit poussé | lecture du fichier au commit ; ancêtre d'`origin/ocha-v2` ; refus d'un commit inconnu, d'un commit sans ligne « non committé », d'une ligne retouchée ou dupliquée | R18 à R21 |
| Historique et données intacts | les essais comparent par SHA-256 les documents réels avant et après ; 27 empreintes des rapports arbitrés ; aucun changement dans `data/`, `reconstruction/`, `tools/`, `tests/` ni `docs/conception/` | P1 à P3 |

## 3. Résultats

- **Essais** : 41, tous conformes (`docs/rapports/etape2-A2-05-sync-stable-essais.md`).
- **Aperçu réel** (`a2-05-travail/sync-stable-apercu.md`, `--commit 78031638c0f81dca1b167e3f57f5a891767fc4cb`) : **plan `89fa2e8a0a2c245b`** :
  - `ETAT-ACTUEL.md` : 6 lignes de bloc et une ligne vide insérées ; **29 lignes du journal marquées `7803163`** ;
  - `ROADMAP.md` : 6 lignes de bloc et une ligne vide insérées ;
  - la ligne de journal de ce cycle, postérieure au checkpoint, reste « non committé ».
- Les deux documents réels ont la même empreinte SHA-256 avant et après l'aperçu.

## 4. Mentions de l'état Git hors du journal

L'outil ne traite que le bloc d'état et la dernière cellule des lignes du journal. Les autres mentions sont recensées ici, sans être modifiées par l'outil :

| Mention | Traitement |
|---|---|
| Rubriques et paragraphe « travaux postérieurs au checkpoint » d'`ETAT-ACTUEL.md` et de `ROADMAP.md` | mis à jour à la main dans ce cycle, comme à chaque tâche : checkpoint B `7803163` committé et poussé |
| Puces historiques du relais `docs/relecture/reprise-A2-05.md` (21 « non committé », 50 « 558f150 ») | **conservées** : elles datent chacune leur cycle ; le relais n'est pas remplacé |
| `CLAUDE.md`, §5 (`ocha-v2` et `origin/ocha-v2` « sont à `558f150` ») | fichier de gouvernance : à mettre à jour par une proposition distincte, à relire, et non par l'outil |
| `docs/relecture/note-relais.md` | note manuelle propre aux exports ; non concernée |

## 5. Adoption proposée, sur autorisation distincte

1. Relancer `node a2-05-travail/sync-stable.mjs . --apercu --commit 78031638c0f81dca1b167e3f57f5a891767fc4cb` et montrer l'aperçu avec son empreinte.
2. Sur accord, `node a2-05-travail/sync-stable.mjs . --appliquer --plan <empreinte> --commit 78031638c0f81dca1b167e3f57f5a891767fc4cb` : insertion unique des marqueurs et marquage des 29 lignes.
3. Relancer les essais et le contrôle de blancs (`git diff --check`).
4. Pour chaque cycle suivant : mise à jour par `--apercu` puis `--appliquer`, et non plus par un script propre au cycle (`tourNN.mjs`) ; `sync-pilotage-v2.mjs` reste dans git, inutilisé.
5. Si une suite permanente est voulue, déplacer les essais dans `tests/`, ce qui demande l'autorisation propre aux tests.

## 6. Demandé au relecteur

1. L'emplacement du bloc, avant la rubrique « Terminé et arbitré » des deux documents.
2. La forme du marquage : `non committé` remplacé par le hash court entre accents graves, comme pour `558f150`, `3756fe3` et `5a8687b` dans le journal.
3. Le traitement des mentions du §4, en particulier une proposition distincte pour `CLAUDE.md`.
4. L'autorisation, distincte, d'appliquer le plan aux documents réels.

## 7. Ce qui reste fermé

Le relais allégé (étape 3), le contrôle final de transition, le périmètre de T1 et tout audit lexical ; QC-1, QC-2, HP-1 à HP-4, G1 à G7, le bloc F, E5 et le balayage des relations ; l'application des 185 corrections ; toute modification des données, normes, registres, snapshots ou tests. **Décomptes** : lot 3, 148 sur 377 (229 restants) ; bloc B, 79 sur 148 ; 185 corrections dans 165 ENTRY, non appliquées ; V1-11 libre.
