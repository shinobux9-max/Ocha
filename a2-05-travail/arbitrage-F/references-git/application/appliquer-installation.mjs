// A2-05 : installation de l'alternative sur les références Git, par les diffs relus. PRÉPARÉ, à ne lancer que sur autorisation distincte.
// Deux diffs ciblés (contrôle du relais, ligne « Git » du relais en service) et deux fichiers nouveaux (references-git.json, cloture-checkpoint.mjs). Versions figées, manifeste, candidat et CLAUDE.md intacts.
// N'écrit aucune référence, n'indexe, ne committe et ne pousse rien. Usage : node a2-05-travail/arbitrage-F/references-git/application/appliquer-installation.mjs <racine du dépôt>
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { appliquer } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/references-git/', REL = W + 'controle-relais-allege.mjs', REP = 'docs/relecture/reprise-A2-05.md', REF = W + 'references-git.json', CLO = W + 'cloture-checkpoint.mjs';
const PRESERVES = {
  [W + 'versions-finales/docs/relecture/reprise-A2-05.md']: 'a651cc84229efb893f11310209c1c05c4e810d53dffcb00fc5e2d3c859466e09',
  [W + 'versions-finales/manifeste.json']: 'd67a0e2962955e924f15e4b4dc0a428ab08918e56223f33ba4af618d61265d21',
  [W + 'versions-finales/CLAUDE.md']: 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04',
  [W + 'reprise-A2-05-allegee-candidat.md']: '9fe27d79e6232dbc9fbef87cf6cc188e9da170b6f21400886ce2f4d27a3e4136',
  'CLAUDE.md': 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04',
};
const node = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const DIFFS = { [REL]: 'controle-relais.diff', [REP]: 'reprise-ligne-git.diff' };
appliquer({
  root, A: OUT + 'application/', SRC: OUT, diffDe: (p) => DIFFS[p], plan: '05faf7026c0e3364', planApres: '05faf7026c0e3364', fin: 'installation conforme',
  D: [
    [REL, 'controle-relais-propose.txt', 'cd8e307e5664355ace8419cb05c27c95c801fed0f3f6f9e5a8874ece782bde24', 'ab75091684e89226a6efece4b509b9666a8e770a23f57440449f6b869d8729a9', '468dac3ef47a13bda48f334d31b4b54287be3edb8ce0b45c9eb7c6cfe5ed2d5f'],
    [REP, 'reprise-propose.md', 'a651cc84229efb893f11310209c1c05c4e810d53dffcb00fc5e2d3c859466e09', 'd0586d42795b00fb5360de4f91585e3ea65dc91355cf92e9e9faca28b2061344', '31b85b756ee79468313ff3a1957ce2fe128278d75ff9981e1298772bf46bbdbc'],
  ],
  N: [[REF, 'references-git-propose.json', '16037a88795a9b9bacb9939abbf281172e4abef769ecdb3da1f2ba0cfa9b1c91'], [CLO, 'cloture-checkpoint-propose.txt', 'fbe081613ae10574829d91abf47910a27816522a34261bff3a23fe3453eca351']],
  avant: ({ ok, shaF }) => { for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'P6 préservé : ' + p, h.slice(0, 12) + '…'); },
  apres: ({ ok, shaF, lire }) => {
    for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'C3 préservé : ' + p);
    ok(JSON.parse(lire(REF)).checkpoint === null, 'C4 aucune référence déclarée par l\'installation');
    const r = node(REL, '--apres-application'), s = node(REL, '--apres-application', '--strict'); ok(r.code === 0 && s.code === 0 && /^conforme C10c /m.test(s.out), 'C5 relais normal et --strict à 30 sur 30, C10c conforme', s.out.split('\n').pop());
    const e = node(CLO, '--etat'), v = node(CLO, '--verifier'); ok(e.code === 0 && /^état 0\./.test(e.out) && v.code === 1 && /aucun checkpoint/.test(v.out), 'C5 bis état 0 ; `--verifier` refuse tant qu\'aucun checkpoint n\'est déclaré', e.out.split('\n')[0]);
  },
});
