// A2-05 · recherche d'omissions : essai, sur copie jetable, de l'application de l'inscription du périmètre du groupe E et de l'arbitrage de la livraison E1 ; jamais sur le dépôt réel.
// Refus avant écriture, exécution nominale, seconde exécution refusée ; puis, sur la copie appliquée, sabotages de la prochaine action (C5f).
// Usage : node a2-05-travail/omissions-temps3/inscription-E1/application/essayer-inscription-E1.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { essayer, espace } from '../../../arbitrage-F/essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-E1/', A = I + 'application/', PROP = I + 'proposition/';
const CIBLES = Object.keys(JSON.parse(readFileSync(resolve(root, PROP + 'manifeste.json'), 'utf8')));
const NR = 'docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md', CTRL = W + 'controle-relais-allege.mjs';

essayer({
  root, SCR: A + 'appliquer-inscription-E1.mjs', A, fin: /inscription du périmètre du groupe E et de l'arbitrage de la livraison E1 appliquée/, cibles: CIBLES,
  scenario: ({ altere, refus, f, g, ok, lancer, premier }) => {
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R1 index non vide', /P2 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    mkdirSync(f(A + 'depart')); const r2 = lancer(); ok(r2.code === 1 && /P3 sauvegarde/.test(premier(r2)), 'R2 sauvegarde déjà présente', premier(r2)); rmSync(f(A + 'depart'), { recursive: true });
    altere('R3 manifeste de la proposition modifié', PROP + 'manifeste.json', espace, /P4 manifeste/);
    altere('R4 version proposée modifiée (ETAT-ACTUEL.md)', PROP + 'ETAT-ACTUEL.md', espace, /P7 .*ETAT-ACTUEL/);
    altere('R5 diff relu modifié (bilan)', PROP + 'diffs/docs__rapports__etape2-A2-05-bilan-volet2.md.diff', espace, /P8 .*bilan/);
    altere('R6 version proposée d\'un document neuf modifiée', PROP + NR, espace, /P7 .*omissions-interrogatif-E1\.md/);
    altere('R7 fichier de départ modifié (ROADMAP.md)', 'ROADMAP.md', espace, /P6 .*ROADMAP/);
    writeFileSync(f(NR), 'x\n'); refus('R8 document neuf déjà présent', /P6 document neuf absent : .*omissions-interrogatif-E1\.md/); rmSync(f(NR));
    altere('R10 donnée modifiée', 'data/n5/vocab.json', espace, /P10 /);
  },
  apres: ({ cl, f, ok }) => {
    const relais = () => { const r = cl.lancer(CTRL, '--apres-application'); const L = r.out.split('\n'); return { fin: L.at(-1), ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
    const r0 = relais(); ok(r0.ids === 'C9b' && r0.fin === '29 conformes sur 30', 'T1 témoin : copie appliquée, relais 29 sur 30, C9b seul', r0.fin);
    const sabote = (nom, p, fn) => { const o = readFileSync(f(p)); writeFileSync(f(p), fn(o.toString('utf8'))); try { const r = relais(); ok(r.ids.split(',').includes('C5f'), nom, 'écarts : ' + r.ids); } finally { writeFileSync(f(p), o); } };
    sabote('S1 prochaine action divergente (ROADMAP.md) : C5f', 'ROADMAP.md', (t) => t.replace('puis l\'inscription de son arbitrage', 'puis la clôture de son arbitrage'));
    sabote('S2 renvoi .md retiré de la prochaine action (ETAT-ACTUEL.md) : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('`docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md`, §0', 'rapport de la livraison E1, §0'));
    const r1 = relais(); ok(r1.ids === 'C9b', 'T2 témoin après sabotages : C9b seul', r1.fin);
  },
});
