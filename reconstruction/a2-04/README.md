# Reconstruction du vocabulaire N5 (A2-04)

Espace de **travail** de la reconstruction (addendum A3, L1) : ni source, ni données canoniques.
Rien ici n'est lu par l'application ; `data/` ne change qu'à la publication (A2-04.17).

| Chemin | Rôle |
|---|---|
| `sources/` | copies figées des anciens fichiers, protégées par `manifest.json` (SHA-256) ; jamais modifiées |
| `lots/<lot>.json` | décisions humaines, une entrée source par clé ; seul le statut `validated` vaut décision |
| `place-tags.json` | correspondance décidée lieu → tag de lieu (registre-des-tags.md, §5) : sert à proposer des tags candidats |
| `journal.json` | décisions notables (corrections, fusions, retraits, ajouts…), identifiants `A2-04-D<nnnn>` |
| `exemples-correspondance.json` | passe finale 5.16 : les clés de vocabulaire de `exemples.json` sans ENTRY (など → `g_27`, clé fantôme `n5_v_717`) ; le reste de la correspondance est mécanique ; rien n'est réécrit avant la tâche 11 |
| `rapports/<lot>.md` | rapports de relecture **générés** à partir des lots ; jamais relus par un outil |
| `out/` | sortie de l'assemblage (`--write`) : lexique candidat, identifiants retirés, table des identifiants ; **n'est pas** le chemin de publication |
| `avertissements-connus.json` | inventaire des avertissements du validateur lexical à la publication (5.17) : **baseline technique**, qui refuse toute régression et permet toute diminution. **Il ne valide pas ces avertissements** : l'audit un par un des `category: null` et des `semantic_type: null` relève d'A2-05 et conditionne la clôture de l'étape 2 |

**Publication (5.17).** `data/` est une **projection** de cet espace, jamais une seconde source
éditoriale. Le vocabulaire de `data/` ne se corrige jamais à la main : une correction passe par une
décision journalisée dans un lot, puis par `publish`. Un test tient `data/` égal à ce que `publish`
calcule.

```
node tools/reconstruction/run.mjs publish            # calcule et affiche, n'écrit rien
node tools/reconstruction/run.mjs publish --write    # écrit les sept fichiers de data/
```

**Protocole d'une publication** (arbitrage du 2026-10-07) : avant `publish --write`, lancer une
suite pré-publication qui ne contient que les tests compatibles avec l'ancien `data/`, et qui doit
être verte ; après, lancer la suite complète, verte elle aussi. **Aucun test rouge n'est interprété
à la volée comme « attendu »** : on s'arrête et on rend compte.

`publish --amorcer-avertissements` n'a servi qu'une fois, à la première publication : il est refusé
dès qu'un inventaire existe ou que `data/vocab-retired.json` existe. Un inventaire absent est une
erreur ; un état partiel se diagnostique et se répare, le baseline ne se recrée pas.

Frontière mécanique / humaine : `tools/reconstruction/rules.mjs`. Format des lots :
`tools/reconstruction/decisions.mjs`.

Commandes (depuis la racine du dépôt) :

```
node tools/reconstruction/run.mjs verify
node tools/reconstruction/run.mjs report lot-00
node tools/reconstruction/run.mjs assemble
node tools/reconstruction/run.mjs assemble --complete --write
```

Conservé au moins jusqu'à l'audit A2-05, sans suppression automatique.
