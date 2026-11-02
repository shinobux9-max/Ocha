// A2-05 · volet 1 · lot 3 : complément proposé de INVENTAIRE-SCRIPTS.md : une ligne pour appliquer-consignation-T6.mjs, EN PROPOSITION
// (décision du 2026-10-29 : inscription préparée sans application ; journal et bilan non modifiés pour cette seule inscription).
// L'inventaire réel n'est pas modifié : la version proposée et le diff exact sont écrits dans consignation-T6/inventaire/. La ligne est insérée
// après celle de preparer-consignation-T6.mjs (ancre présente une fois) ; aucune ligne existante ne change. Code 1 au premier écart.
// Usage : node a2-05-travail/arbitrage-T6/consignation-T6/inventaire/preparer-inventaire-consignation-T6.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const INV = 'a2-05-travail/INVENTAIRE-SCRIPTS.md', OUT = 'a2-05-travail/arbitrage-T6/consignation-T6/inventaire';
const sha = (t) => createHash('sha256').update(t).digest('hex');
const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) { console.log('\narrêt au premier écart'); process.exit(1); } };
const ANCRE = '| `arbitrage-T6/consignation-T6/preparer-consignation-T6.mjs` |';
const LIGNE = "| `arbitrage-T6/consignation-T6/appliquer-consignation-T6.mjs` | application de la consignation finale de T6 : préconditions (documents de départ, versions proposées et diffs relus à leurs empreintes ; diffs régénérés identiques octet pour octet aux diffs relus ; ajouts absents ; hunks à ancre unique, à leur place ; 39 empreintes ; relais 30 sur 30 ; aperçu de synchronisation vide), sauvegarde, hunks relus appliqués par remplacements ciblés, résultat égal à la version relue, contrôles (diffs réels, rubriques communes, bilan antérieur, journal, blocs, aperçu, relais, manifeste, contrôles, couverture, corrections, identifiants, arbre de travail, index, `git diff --check`) ; chemins de machine masqués dans la trace | `ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2 (§8.101), cet inventaire ; `arbitrage-T6/consignation-T6/application/depart/`, `…/diffs-reels/`, `…/sorties/` | essayé une fois sur une copie jetable, code 0 ; puis lancé une fois sur le dépôt réel le 2026-10-29, code 0 |";

const reel = readFileSync(join(root, INV), 'utf8'); const h0 = sha(reel);
ok(!existsSync(join(root, OUT, 'INVENTAIRE-SCRIPTS.md')), OUT + '/INVENTAIRE-SCRIPTS.md absent (aucune proposition antérieure écrasée)');
ok(!reel.includes('appliquer-consignation-T6.mjs'), 'ligne absente de l\'inventaire réel');
ok(LIGNE.split('|').length === 6, 'ligne de tableau à quatre colonnes');
const eol = reel.includes('\r\n') ? '\r\n' : '\n'; const L = reel.split(eol); const k = L.findIndex((l) => l.startsWith(ANCRE));
ok(k >= 0 && L.filter((l) => l.startsWith(ANCRE)).length === 1, 'ancre unique : ligne de preparer-consignation-T6.mjs', 'ligne ' + (k + 1));
L.splice(k + 1, 0, LIGNE); const prop = L.join(eol);
writeFileSync(join(root, OUT, 'INVENTAIRE-SCRIPTS.md'), prop);
const d = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', INV, OUT + '/INVENTAIRE-SCRIPTS.md'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
writeFileSync(join(root, OUT, 'INVENTAIRE-SCRIPTS.md.diff'), d.stdout);
const plus = d.stdout.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++ ')), moins = d.stdout.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('--- '));
ok(d.status === 1 && plus.length === 1 && plus[0] === '+' + LIGNE && !moins.length, 'diff : une ligne ajoutée, aucune retirée', '+' + plus.length + ' / -' + moins.length + ' ; diff ' + sha(d.stdout).slice(0, 12) + '…');
ok(prop.split(eol).filter((l) => l !== LIGNE).join(eol) === reel, 'aucune ligne existante modifiée ; fins de ligne conservées', eol === '\r\n' ? 'CRLF' : 'LF');
ok(sha(readFileSync(join(root, INV), 'utf8')) === h0, 'inventaire réel inchangé', h0.slice(0, 12) + '… ; proposé ' + sha(prop).slice(0, 12) + '…');
console.log('\npréparation conforme');
