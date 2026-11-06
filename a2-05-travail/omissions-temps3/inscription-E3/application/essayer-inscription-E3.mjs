// A2-05 · recherche d'omissions : essai, sur copie jetable, de l'application de l'inscription de l'arbitrage de la livraison E3 du groupe E et du bilan de clôture de la recherche d'omissions ; jamais sur le dépôt réel.
// Refus avant écriture, exécution nominale, seconde exécution refusée ; puis, sur la copie appliquée, sabotages de la prochaine action (C5f).
// Usage : node a2-05-travail/omissions-temps3/inscription-E3/application/essayer-inscription-E3.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { essayer, espace } from '../../../arbitrage-F/essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-E3/', A = I + 'application/', PROP = I + 'proposition/';
const CIBLES = Object.keys(JSON.parse(readFileSync(resolve(root, PROP + 'manifeste.json'), 'utf8')));
const NR = 'docs/rapports/etape2-A2-05-omissions-interrogatif-E3.md', NC = 'docs/rapports/etape2-A2-05-omissions-interrogatif-cloture.md', CTRL = W + 'controle-relais-allege.mjs';

essayer({
  root, SCR: A + 'appliquer-inscription-E3.mjs', A, fin: /inscription de l'arbitrage de la livraison E3 et du bilan de clôture appliquée/, cibles: CIBLES,
  scenario: ({ altere, refus, f, g, ok, lancer, premier }) => {
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R1 index non vide', /P2 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    mkdirSync(f(A + 'depart')); const r2 = lancer(); ok(r2.code === 1 && /P3 sauvegarde/.test(premier(r2)), 'R2 sauvegarde déjà présente', premier(r2)); rmSync(f(A + 'depart'), { recursive: true });
    altere('R3 manifeste de la proposition modifié', PROP + 'manifeste.json', espace, /P4 manifeste/);
    altere('R4 version proposée modifiée (ETAT-ACTUEL.md)', PROP + 'ETAT-ACTUEL.md', espace, /P7 .*ETAT-ACTUEL/);
    altere('R5 diff relu modifié (bilan)', PROP + 'diffs/docs__rapports__etape2-A2-05-bilan-volet2.md.diff', espace, /P8 .*bilan/);
    altere('R6 version proposée d\'un document neuf modifiée', PROP + NR, espace, /P7 .*omissions-interrogatif-E3\.md/);
    altere('R7 fichier de départ modifié (ROADMAP.md)', 'ROADMAP.md', espace, /P6 .*ROADMAP/);
    writeFileSync(f(NR), 'x\n'); refus('R8 document neuf déjà présent', /P6 document neuf absent : .*omissions-interrogatif-E3\.md/); rmSync(f(NR));
    writeFileSync(f(NC), 'x\n'); refus('R9 bilan de clôture déjà présent', /P6 document neuf absent : .*omissions-interrogatif-cloture\.md/); rmSync(f(NC));
    altere('R10 donnée modifiée', 'data/n5/vocab.json', espace, /P10 /);
  },
  apres: ({ cl, f, ok }) => {
    const relais = () => { const r = cl.lancer(CTRL, '--apres-application'); const L = r.out.split('\n'); return { fin: L.at(-1), ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
    const r0 = relais(); ok(r0.ids === 'C9b' && r0.fin === '29 conformes sur 30', 'T1 témoin : copie appliquée, relais 29 sur 30, C9b seul', r0.fin);
    const sabote = (nom, p, fn) => { const o = readFileSync(f(p)); writeFileSync(f(p), fn(o.toString('utf8'))); try { const r = relais(); ok(r.ids.split(',').includes('C5f'), nom, 'écarts : ' + r.ids); } finally { writeFileSync(f(p), o); } };
    sabote('S1 prochaine action divergente (ROADMAP.md) : C5f', 'ROADMAP.md', (t) => t.replace('le cadre des vérifications hors périmètre', 'l\'examen des vérifications hors périmètre'));
    sabote('S2 renvoi .md du bilan de clôture retiré de la prochaine action (ETAT-ACTUEL.md) : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('bilan de clôture, `docs/rapports/etape2-A2-05-omissions-interrogatif-cloture.md`)', 'bilan de clôture)'));
    const r1 = relais(); ok(r1.ids === 'C9b', 'T2 témoin après sabotages : C9b seul', r1.fin);
  },
});
