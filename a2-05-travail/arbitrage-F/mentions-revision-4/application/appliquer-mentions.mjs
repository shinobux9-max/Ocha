// A2-05 : actualisation des trois mentions « révision 3 » du pilotage (autorisée le 2026-11-01), par les diffs relus, en remplacements ciblés. Les lignes de journal datées ne changent pas.
// E5 reste non normative ; A10 n'est pas adopté. Usage : node a2-05-travail/arbitrage-F/mentions-revision-4/application/appliquer-mentions.mjs <racine du dépôt>
import { resolve } from 'node:path';
import { appliquer } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-F/mentions-revision-4/', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md';
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l));
appliquer({
  root, A: OUT + 'application/', SRC: OUT, diffDe: (p) => 'diffs/' + p + '.diff', plan: 'c73b0fdc9f7d49e9', planApres: '4a677034b3b201bd', fin: 'mentions conformes',
  D: [
    [ETAT, ETAT, '2f231a904a33d3c1108729cb9cea740025deb17fe710435dabb17aef54ccfdc5', '0d2da75966ea5b7b6f3e61ff5f86e540b97b7ddb93668b0da3ea1b011eb8559b', '04538634fa6b2ba4fffd4ebe079efa851b3b1e1807c7621e5e7f14939f7e591b'],
    [ROAD, ROAD, '05d46e7be98b18898867d052ec3514f872e1f48a020c98749c7e3d0b97f3d6d0', '9861dc97a40db6cb6c0370d840edaa5ef4f245605695563161184d40c0ce5d33', 'fad6187e1ea1d177272d203716d5d00ee287a0ff163b82392d2227ee616bc1d5'],
  ],
  avant: ({ ok, lire }) => { ok(!lire(ETAT).includes('(préalable normatif E5, révision 4)') && !lire(ROAD).includes('(préalable normatif E5, révision 4)'), 'P6 ajout absent : mentions de la révision 4'); },
  apres: ({ ok, lire }, { avant }) => {
    ok(JSON.stringify(jr(lire(ETAT))) === JSON.stringify(jr(avant[ETAT])), 'C3 journal historique identique, mentions datées « révision 3 » comprises', jr(lire(ETAT)).filter((l) => l.includes('révision 3')).length + ' lignes');
    ok(!/révision 3/.test(lire(ETAT).split(/\r?\n/).filter((l) => !/^\| \d{4}-\d{2}-\d{2}/.test(l)).join('\n')) && !/révision 3/.test(lire(ROAD)), 'C4 plus aucune mention « révision 3 » hors du journal historique');
    ok(/^\*\*Statut\*\* : \*\*PROPOSITION, non validée, non normative\.\*\*/m.test(lire('docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md')), 'C5 E5 reste une proposition non normative');
  },
});
