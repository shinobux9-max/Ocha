# Étape 2 · A2-05 — diagnostic du défaut de restauration lié aux fins de ligne

**Date** : 2026-11-01
**Statut** : **proposition, sans application.** Rien n'est corrigé : le dépôt réel n'a pas de `.gitattributes`, et n'en reçoit aucun. Les commits et les attributs candidats n'ont existé que dans des clones temporaires, supprimés ensuite. Aucun `git add`, commit ni push sur le dépôt réel.

**Autorisation** : « Avant toute autorisation de commit, préparer une analyse technique séparée du défaut de restauration lié aux fins de ligne. » ; « Ne pas appliquer de correction technique à ce stade. »

**Outil** : `a2-05-travail/arbitrage-F/diagnostic-eol/diagnostic-restauration.mjs`. Résultats bruts : `resultats.json`, dans le même dossier. Candidats : `gitattributes-candidat-cible.txt`, `gitattributes-candidat-global.txt`.

## 1. Conclusions

1. **Le défaut est réel et antérieur à ce travail.** Sur ce poste, une restauration par défaut change 1 009 fichiers sur 1 134, dont les 45 documents protégés : **0 empreinte sur 45** concorde, et le relais s'arrête en erreur.
2. **Le commit ne l'aggrave pas** : il ne réécrit aucun fichier de travail. Le risque est à la restauration.
3. **`core.autocrlf=false` ne suffit pas.** Il rétablit les 45 empreintes, mais change 83 autres fichiers, et le relais reste en écart sur C10a et C11a.
4. **Un `.gitattributes` ciblé résout le défaut, dans les deux configurations**, sans changer un seul octet des 45 documents protégés ni aucun blob de données.
5. **C5a et C8 n'ont rien à voir avec les fins de ligne.** Tous deux portent sur le commit cité par les documents, et se résolvent par la mise à jour de cette référence.
6. **Je recommande le candidat ciblé**, sur décision distincte, porté par le commit de checkpoint lui-même (§7).

## 2. Mécanisme

| Élément | Constat |
|---|---|
| `core.autocrlf` | `true`, venant de la configuration système de Git pour Windows |
| `.gitattributes` | absent |
| Stockage | Git normalise les textes en LF dans les blobs |
| Checkout en `true` | tout fichier texte est écrit en CRLF |
| Checkout en `false` | tout fichier est écrit tel qu'il est stocké, donc en LF |
| Manifeste | SHA-256 des octets, sans normalisation |

**Pourquoi le défaut est resté invisible** : l'état de travail garde ses fins de ligne, car `git add` ne réécrit rien. Les fichiers créés par les scripts sont en LF, ceux édités sous Windows en CRLF. Mes essais copiaient l'arbre avec `--no-checkout` : aucun ne passait par un vrai checkout.

**Inventaire des 1 134 fichiers du commit simulé** :

| Stocké | État de travail | Fichiers | Effet |
|---|---|---|---|
| LF | LF | 1 009 | changent en `true` |
| LF | CRLF | 80 | changent en `false` |
| LF | mixte | 3 | changent dans les deux cas |
| CRLF | CRLF | 3 | les trois sources figées de `reconstruction/a2-04/sources/` ; stables |
| binaire | binaire | 27 | stables |
| vide | vide | 12 | stables |

## 3. Matrice des six restaurations

Chaque restauration est un vrai clone du commit simulé. Les octets sont comparés à l'état de travail, fichier par fichier.

| Attributs | `autocrlf` | Octets différents | Empreintes | Relais | Autres contrôles | `verify`, assemblage | Tests |
|---|---|---|---|---|---|---|---|
| aucun | `true` | **1 009** | **0/45** | **s'arrête en erreur** | empreintes, pilote, T5 à T9 en écart | 0 ; 0 | **505/510** |
| aucun | `false` | 83 | 45/45 | 26/30 : C5a, C8, C10a, C11a | à 0 | 0 ; 0 | 510/510 |
| **ciblé** | `true` | 332, hors zones | **45/45** | 28/30 : C5a, C8 | à 0 | 0 ; 0 | **510/510** |
| **ciblé** | `false` | 28, hors zones | **45/45** | 28/30 : C5a, C8 | à 0 | 0 ; 0 | **510/510** |
| global | `true` | 2 | 45/45 | 28/30 : C5a, C8 | à 0 | 0 ; 0 | 510/510 |
| global | `false` | 2 | 45/45 | 28/30 : C5a, C8 | à 0 | 0 ; 0 | 510/510 |

**Avec le candidat ciblé, les 332 et 28 fichiers différents sont tous hors des zones visées** : `.claude/`, `css/`, `js/`, `src/`, `tests/`, `tools/` et quelques fichiers de la racine. Aucun n'est haché ni comparé octet pour octet. **`docs/`, `data/`, `reconstruction/` et `a2-05-travail/` restent identiques à l'état de travail, dans les deux configurations.**

## 4. Les écarts du relais

| Contrôle | Objet | Cause | Résolution |
|---|---|---|---|
| **C5a** | commit cité = HEAD = `origin/ocha-v2` | les documents citent encore `7803163` | mise à jour de la référence |
| **C8** | essai de reprise, 11 réponses sur 12 ; seule la question « Sur quel commit repartir ? » échoue | même cause | même résolution |
| **C10a** | documents réels = versions finales du manifeste | `CLAUDE.md` et `note-relais.md`, CRLF en travail, restaurés en LF | candidat ciblé |
| **C11a** | fins de ligne prévues | même cause | candidat ciblé |

**Correction d'une affirmation du dossier précédent** : j'y annonçais le relais à 29 sur 30 après le commit, C5a seul, et je n'avais pas analysé C8. C'est exact avant le push. **Après le push, `origin/ocha-v2` change, et C8 tombe avec C5a : relais à 28 sur 30**, jusqu'à la mise à jour de la référence.

**Les cinq tests en échec** (`true`, sans attributs) sont ceux de `tests/registries/transcription.test.js` : ils comparent les registres à `docs/conception/a2/`. Le candidat ciblé couvre cette zone.

## 5. Fichiers dont les octets changent au checkout

| Zone | Fichiers | `true`, sans attributs | `false`, sans attributs |
|---|---|---|---|
| `a2-05-travail/` | 373 | 367 | 6 |
| `docs/rapports/` hors A2-05 | 106 | 88 | 18 |
| `docs/rapports/` A2-05 | 116 | 116 | 0 |
| `docs/conception/` | 35 | 32 | 3 |
| `data/` | 33 | 20 | 13 |
| `reconstruction/` | 66 | 50 | 10 |
| `.claude/`, `css/`, `js/`, `src/`, `tests/`, `tools/`, autres | reste | reste | reste |

Détail par zone et par configuration : `resultats.json`.

## 6. Le candidat ciblé

```gitattributes
/a2-05-travail/** -text
/docs/** -text
/reconstruction/** -text
/data/** -text
/CLAUDE.md text eol=crlf
/ETAT-ACTUEL.md text eol=crlf
/ROADMAP.md text eol=crlf
# ... 50 autres lignes eol=crlf, une par fichier CRLF de ces zones
```

**Principe** : `-text` interdit toute conversion ; `eol=crlf` fixe les fichiers qui doivent rester en CRLF. Les attributs l'emportent sur `core.autocrlf` : le résultat ne dépend plus du poste.

**Effets vérifiés sur les clones** :

| Effet | Résultat |
|---|---|
| 45 documents protégés | aucun octet changé ; 45/45 dans les deux configurations |
| Sources figées, stockées en CRLF | non touchées ; `verify` conforme partout |
| Blobs réécrits par `git add --renormalize` | **2 seulement**, hors `.gitattributes` : deux fichiers de trace à fins de ligne mixtes, dans `a2-05-travail/` |
| Données lexicales, normes, décisions | aucun blob réécrit |
| `git status` après restauration | propre |

**Trois précautions apprises en le testant** :

1. **Ancrer chaque chemin à la racine.** Sans `/`, le motif `ETAT-ACTUEL.md` capturait aussi `docs/legacy/ETAT-ACTUEL.md`, qui est en LF.
2. **Couvrir `docs/conception/`.** Ma première version ne visait que `docs/rapports/` : cinq tests échouaient encore.
3. **Exclure les fichiers mixtes et ceux stockés en CRLF** des lignes `eol=crlf` : sinon, leurs blobs seraient réécrits.

**Limites** :

- **Pas de rétroactivité.** `7803163` et les commits antérieurs restent fragiles en `autocrlf=true`, car ils n'ont pas ce fichier.
- **53 lignes à entretenir** : un nouveau fichier CRLF dans ces zones serait stocké tel quel sous `-text`, sans perte, mais sa ligne manquerait.
- **Les deux fichiers de trace mixtes** (corrigé le 2026-11-01, après mesure sur le commit simulé avec `.gitattributes` ; ma version précédente disait qu'aucun n'était restitué à l'identique, « dans aucune variante », et ne donnait pas de cause). **`a2-05-travail/proposition-CLAUDE-md-section5.diff`**, suivi, a un blob en LF : il revient en LF, et diffère de la copie de travail mixte, dans les deux configurations. **`a2-05-travail/correction-res/regeneration/sortie-preparation.txt`**, non suivi jusqu'ici, est stocké tel quel sous `-text` : il revient à l'identique. Ce sont des traces, ni hachées ni lues par un contrôle. Détail : `docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md`, §7.
- **`REGLES-CONSTRUCTION.md`** (ajouté le 2026-11-01) : en LF sur le disque et sans ligne dans le candidat, il revient en CRLF sous `core.autocrlf=true`. Ce diagnostic ne l'avait pas isolé. Il n'est pas au manifeste, et aucun contrôle n'en souffre.

## 7. Solutions comparées

| Solution | Résout | Coût | Avis |
|---|---|---|---|
| **`.gitattributes` ciblé** | empreintes, relais, tests, dans les deux configurations | 53 lignes ; aucun fichier produit touché | **recommandée** |
| `.gitattributes` global (`* -text`) | idem ; seulement 2 fichiers différents | réécrit le blob de `js/features/oral.js`, fichier de l'application, hors du chantier | non recommandée |
| Manifeste normalisant les fins de ligne | les empreintes seules | modifie un outil et invalide la lecture des 45 entrées ; ne résout ni C10a, ni C11a, ni les tests | écartée |
| Convention « cloner en `false` » | les empreintes seules | relais 26/30 ; repose sur la mémoire de chacun | transitoire seulement |
| `core.autocrlf=false` dans la configuration du dépôt | rien pour un nouveau clone | la configuration locale ne se transmet pas | écartée |

**Recommandation d'ordre**, si vous retenez le candidat : l'inclure **dans le commit de checkpoint**, pour que ce commit soit le premier restaurable, plutôt que dans un commit suivant. `docs/conception/` n'est pas modifié par ce fichier, placé à la racine. Sa pose reste une correction technique, à autoriser distinctement.

## 8. Ce que ce diagnostic ne fait pas

Il ne pose aucun `.gitattributes`, ne modifie ni le manifeste, ni un outil, ni un document protégé. Il ne teste que ce poste Windows : ni Linux, ni macOS. Les zones hors du candidat restent soumises à `core.autocrlf`, sans conséquence sur les contrôles mesurés ici.

## 9. Questions à l'arbitrage

1. Le candidat ciblé est-il retenu, ou une autre solution ?
2. Si oui, sa pose est-elle portée par le commit de checkpoint ?
3. Les deux fichiers de trace mixtes appellent-ils un traitement, ou restent-ils tels quels ?
