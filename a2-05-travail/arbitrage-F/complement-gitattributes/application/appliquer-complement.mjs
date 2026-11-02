// A2-05 : application de la règle complémentaire `/REGLES-CONSTRUCTION.md -text`, par le diff relu. PRÉPARÉ, à ne lancer que sur autorisation distincte, après la consignation, dont il suppose le plan.
// Usage : node a2-05-travail/arbitrage-F/complement-gitattributes/application/appliquer-complement.mjs <racine du dépôt>
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { appliquer } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-F/complement-gitattributes/', GA = '.gitattributes', RC = 'REGLES-CONSTRUCTION.md', REGLE = '/REGLES-CONSTRUCTION.md -text';
const git = (...a) => spawnSync('git', a, { cwd: root, encoding: 'utf8' }).stdout.trim();
appliquer({
  root, A: OUT + 'application/', SRC: OUT, diffDe: () => 'diffs/gitattributes.diff', plan: '05faf7026c0e3364', planApres: '05faf7026c0e3364', fin: 'règle complémentaire conforme',
  D: [[GA, 'gitattributes-propose.txt', '8efbae1ef267cd5047dd7008b83cfbb7260b8329370009dd540daf5a4023e000', 'da81234cda245291b3c2f3976e15754127c8723752053f4fa4aa03a649de9773', 'eae8abae438527de5d537ff3802c264c0aa93e2a882af253d59e938faa400cce']],
  avant: ({ ok, lire }) => { ok(!lire(GA).includes(REGLE), 'P6 ajout absent : règle complémentaire'); },
  apres: ({ ok, lire, shaF }, { avant }) => {
    const a = avant[GA].split('\n'), b = lire(GA).split('\n'); ok(b.length === a.length + 1 && a.every((l) => b.includes(l)) && b.filter((l) => l === REGLE).length === 1, 'C3 une seule ligne ajoutée');
    ok(shaF(RC) === 'de46103a472864662424613ba2028d5bed6ecfb7ce16ff95e2a37edd4530f509', 'C4 `REGLES-CONSTRUCTION.md` inchangé, octet pour octet');
    ok(!git('status', '--porcelain', '--', RC), 'C4 bis `REGLES-CONSTRUCTION.md` non modifié pour git');
    ok(git('check-attr', 'text', '--', RC).endsWith('unset') && git('check-attr', 'eol', '--', 'docs/legacy/REGLES-CONSTRUCTION.md').endsWith('crlf'), 'C5 règle active ; `docs/legacy/` non capturé');
  },
});
