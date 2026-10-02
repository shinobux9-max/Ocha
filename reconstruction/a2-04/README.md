# Reconstruction du vocabulaire N5 (A2-04)

Espace de **travail** de la reconstruction (addendum A3, L1) : ni source, ni données canoniques.
Rien ici n'est lu par l'application ; `data/` ne change qu'à la publication (A2-04.17).

| Chemin | Rôle |
|---|---|
| `sources/` | copies figées des anciens fichiers, protégées par `manifest.json` (SHA-256) ; jamais modifiées |
| `lots/<lot>.json` | décisions humaines, une entrée source par clé ; seul le statut `validated` vaut décision |
| `place-tags.json` | correspondance décidée lieu → tag de lieu (registre-des-tags.md, §5) : sert à proposer des tags candidats |
| `journal.json` | décisions notables (corrections, fusions, retraits, ajouts…), identifiants `A2-04-D<nnnn>` |
| `rapports/<lot>.md` | rapports de relecture **générés** à partir des lots ; jamais relus par un outil |
| `out/` | sortie de l'assemblage (`--write`) : lexique candidat, identifiants retirés, table des identifiants |

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
