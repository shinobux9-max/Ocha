// A2-05 · volet 1 · lot 3 : complément proposé de INVENTAIRE-SCRIPTS.md pour T6 (nouveaux scripts, contrôles adaptés), EN PROPOSITION.
// L'inventaire n'est pas modifié : la version proposée et le diff exact sont écrits dans arbitrage-T6/inventaire/. Sept lignes sont insérées
// après la dernière ligne de T5 (ancre présente une fois) ; aucune ligne existante ne change.
// Usage : node a2-05-travail/arbitrage-T6/inventaire/preparer-inventaire-T6.mjs <racine du dépôt>
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const INV = 'a2-05-travail/INVENTAIRE-SCRIPTS.md', OUT = 'a2-05-travail/arbitrage-T6/inventaire';
const sha = (t) => createHash('sha256').update(t).digest('hex');
const t = readFileSync(join(root, INV), 'utf8'); const avant = sha(t);
if (t.includes('\r\n')) throw new Error(INV + ' : fins de ligne CRLF inattendues');
const L = t.split('\n'); const k = L.findIndex((l) => l.startsWith('| `arbitrage-T5/preparer-formalisation-protection-rapport-T5.mjs` |'));
if (k < 0 || L.filter((l) => l.startsWith('| `arbitrage-T5/preparer-formalisation-protection-rapport-T5.mjs` |')).length !== 1) throw new Error('ancre absente ou multiple');
if (/perimetre-T6|recalcul-T6|arbitrage-T6/.test(t)) throw new Error('complément déjà présent');
const AJOUTS = [
  "| `perimetre-T6.mjs` | périmètre opérationnel de T6 (D6, D7) : configuration (autorisation, 13 risques rédigés, sans verdict) passée au générateur v2, non modifié ; constante `ARBITRAGE` renseignée le 2026-10-27 (périmètre accepté, frontières de l'audit) | `docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md` | lancé le 2026-10-27, code 0 (proposition, `d0d4e113…`) ; version acceptée (`614b7503…`) appliquée le 2026-10-27 par les diffs relus ; sa régénération par cette configuration est identique |",
  "| `recalcul-T6-perimetre.mjs` | recalcul indépendant du périmètre de T6 (n'importe aucun module v2) : découpage, contiguïté, doublons, sens non encore examinés, inventaire des 103 restants (option `--inventaire`), lot 23 entier, fonctions d'A9, catégories et types nuls, une décision `type-nul` par sens, décisions du journal, corrections, modification n°1 du volet 2, provenance, relations, manifeste (37 entrées, T6 absent) ; 22 contrôles | — (lecture seule) | lancé le 2026-10-27, code 0 ; 8 sabotages sur 8 (harnais hors du dépôt, source dans la note d'export du périmètre) ; conforme après la consolidation ; adaptation à la 38e entrée proposée (`arbitrage-T6/consolidation/`), non appliquée |",
  "| `arbitrage-T6/preparer-consolidation-T6.mjs` | préparation de la consolidation du périmètre accepté de T6 et de la clôture de T5, avec l'adaptation des trois contrôles qui exigent 37 empreintes, sans application ; simulation dans un clone git jetable, états E0 à E4 (consolidation, contrôles remplacés, 38e entrée, synchronisation) | `arbitrage-T6/consolidation/` (versions proposées, diffs, manifeste simulé, aperçu d'E3, documents d'E4) | lancé le 2026-10-27 : premier lancement code 1 (deux attentes du préparateur fausses ; sorties dans `arbitrage-T6/lancement-1/`), second code 0, sorties identiques octet pour octet ; consolidation documentaire appliquée le 2026-10-27, sur autorisation (cinq diffs relus ; versions identiques aux versions relues) |",
  "| `arbitrage-T6/proposition-T6-perimetre.md`, `arbitrage-T6/application-consolidation/` | proposition livrée du périmètre de T6 (`d0d4e113…`, lue par les contrôles adaptés) ; versions de départ, patchs et diffs effectivement appliqués lors de la consolidation du 2026-10-27 | — | — |",
  "| `arbitrage-T6/consolidation/controle-bilan-pilote.mjs`, `…/recalcul-T5-perimetre.mjs`, `…/recalcul-T6-perimetre.mjs` | adaptations proposées à la 38e entrée : contrôle du bilan du pilote (périmètre accepté de T6, 38 empreintes) ; recalcul de T5 (au moins 37 empreintes, positions de T5 fixes ; forme retenue par l'arbitrage du 2026-10-27) ; recalcul de T6 (périmètre accepté, 38 empreintes) | — (lecture seule) | **non appliquées** ; simulées (E2 : deux écarts, aucun, un, attendus ; E3 et E4 conformes) ; tests de résistance : 16 cas sur 16 conformes aux attentes |",
  "| `arbitrage-T6/controles/sabotages-controles-T6.mjs` | tests de résistance des trois contrôles adaptés, dans un clone git jetable à l'état E3 : témoins sains avant et après, 14 sabotages (manifeste, périmètre, §0, proposition sauvegardée, documents de T5 et plus anciens, entrées fictives, positions), attentes fixées à l'avance ; option `--renfort` | aucun dans le dépôt (clone temporaire supprimé) ; sorties dans `arbitrage-T6/controles/sorties/` | lancé le 2026-10-27 sur les adaptations relues et sur la variante renforcée, code 0 chacun, 16 cas sur 16 |",
  "| `arbitrage-T6/controles/preparer-renfort.mjs` | variante renforcée proposée : empreinte fixée du périmètre accepté de T6 (`614b7503…`), indépendante du manifeste, dans le contrôle du bilan du pilote et le recalcul de T6 ; recalcul de T5 repris tel qu'il a été relu | `arbitrage-T6/controles/renfort/` | lancé le 2026-10-27, code 0 ; non appliquée |",
];
if (AJOUTS.some((l) => l.split('|').length !== 6)) throw new Error('ligne de tableau à quatre colonnes attendue');
L.splice(k + 1, 0, ...AJOUTS); const prop = L.join('\n');
writeFileSync(join(root, OUT, 'INVENTAIRE-SCRIPTS.md'), prop);
const d = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', INV, OUT + '/INVENTAIRE-SCRIPTS.md'], { cwd: root, encoding: 'utf8' });
writeFileSync(join(root, OUT, 'INVENTAIRE-SCRIPTS.md.diff'), d.stdout);
const plus = d.stdout.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++')).length, moins = d.stdout.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('---')).length;
const apres = sha(readFileSync(join(root, INV), 'utf8'));
console.log('inventaire réel ' + avant.slice(0, 12) + '… ' + (apres === avant ? 'inchangé' : 'MODIFIÉ') + ' ; proposé ' + sha(prop).slice(0, 12) + '… ; diff code ' + d.status + ' : +' + plus + ' / -' + moins + ' lignes');
process.exit(apres === avant && plus === AJOUTS.length && moins === 0 ? 0 : 1);
