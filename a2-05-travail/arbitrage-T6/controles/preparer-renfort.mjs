// A2-05 · volet 1 · lot 3 : variante renforcée des adaptations relues (arbitrage-T6/consolidation/), EN PROPOSITION. Rien n'est installé.
// Le contrôle du bilan du pilote et le recalcul de T6 exigent en plus que le périmètre accepté de T6 garde l'empreinte de la version relue et
// acceptée (614b7503…), indépendamment du manifeste : une modification du §0 accompagnée d'un manifeste réaligné (sabotage S4) est alors
// détectée. Le recalcul de T5 est repris tel qu'il a été relu (« au moins 37 empreintes », retenu par l'arbitrage du 2026-10-27).
// Usage : node a2-05-travail/arbitrage-T6/controles/preparer-renfort.mjs <racine du dépôt>   (écrit arbitrage-T6/controles/renfort/ ; refus s'il existe)
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const SRC = 'a2-05-travail/arbitrage-T6/consolidation', OUT = 'a2-05-travail/arbitrage-T6/controles/renfort';
const ACC = '614b7503d32408028d853993430049a4faa65dcda5480e679754b3d4b5c11803';
const RELUS = { 'controle-bilan-pilote.mjs': '0022122f6ab0', 'recalcul-T5-perimetre.mjs': '44b49ef9b658', 'recalcul-T6-perimetre.mjs': '0a8113c04c94' };
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
if (existsSync(join(root, OUT))) throw new Error(OUT + ' existe déjà');
for (const [n, h] of Object.entries(RELUS)) if (!sha(join(root, SRC, n)).startsWith(h)) throw new Error(n + ' : version relue modifiée');
if (sha(join(root, 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md')) !== ACC) throw new Error('périmètre accepté : empreinte inattendue');
const remplacer = (t, n, ancre, nouveau) => { if (t.split(ancre).length !== 2) throw new Error(n + ' : ancre absente ou multiple : ' + ancre.slice(0, 80)); return t.replace(ancre, () => nouveau); };

let cbp = readFileSync(join(root, SRC, 'controle-bilan-pilote.mjs'), 'utf8');
cbp = remplacer(cbp, 'cbp', "// le §0 inséré et est protégé au manifeste (38e entrée, 38 empreintes), et que le registre porte toujours la condition du pilote.\n",
  "// le §0 inséré, garde l'empreinte de sa version acceptée et est protégé au manifeste (38e entrée, 38 empreintes), et que le registre porte\n// toujours la condition du pilote.\n");
const A_I6 = "'T6 : périmètre accepté (§0), 22 sens dans 13 ENTRY ; seuls changent le statut et le §0', i6.detail);\n";
cbp = remplacer(cbp, 'cbp', A_I6, A_I6 + "ctl(sha(P6) === '" + ACC + "', 'T6 : périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', sha(P6).slice(0, 12) + '…');\n");
let rec6 = readFileSync(join(root, SRC, 'recalcul-T6-perimetre.mjs'), 'utf8');
rec6 = remplacer(rec6, 'rec6', "// Adaptation au périmètre accepté (§0, proposition sauvegardée) et à sa protection (38e entrée du manifeste) : préparée le 2026-10-27, appliquée\n",
  "// Adaptation au périmètre accepté (§0, proposition sauvegardée, empreinte de la version acceptée) et à sa protection (38e entrée du manifeste) :\n// préparée le 2026-10-27, appliquée\n");
const A13 = "// 13. Manifeste : 38 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2 ; périmètre accepté de T6 protégé (38e entrée)\n";
rec6 = remplacer(rec6, 'rec6', A13, [
  "// Le périmètre accepté garde l'empreinte de sa version acceptée, indépendamment du manifeste (une modification du §0 avec un manifeste réaligné est détectée)",
  "const shaGen = createHash('sha256').update(readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md'))).digest('hex');",
  "ctl(shaGen === '" + ACC + "', 'périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', shaGen.slice(0, 12) + '…');",
  '',
].join('\n') + A13);

mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
writeFileSync(join(root, OUT, 'controle-bilan-pilote.mjs'), cbp);
writeFileSync(join(root, OUT, 'recalcul-T6-perimetre.mjs'), rec6);
copyFileSync(join(root, SRC, 'recalcul-T5-perimetre.mjs'), join(root, OUT, 'recalcul-T5-perimetre.mjs'));
for (const n of Object.keys(RELUS)) {
  const c = spawnSync(process.execPath, ['--check', join(root, OUT, n)], { encoding: 'utf8' });
  const d = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', SRC + '/' + n, OUT + '/' + n], { cwd: root, encoding: 'utf8' });
  writeFileSync(join(root, OUT, 'diffs', n + '.renfort.diff'), d.stdout);
  console.log(n + ' : node --check code ' + c.status + ' ; diff avec la version relue, code ' + d.status + ' ; ' + sha(join(root, OUT, n)).slice(0, 12) + '…');
}
