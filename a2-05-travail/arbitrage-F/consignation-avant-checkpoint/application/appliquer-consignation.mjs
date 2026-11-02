// A2-05 : application de la consignation avant checkpoint, par les quatre diffs relus. PRÉPARÉ, à ne lancer que sur autorisation distincte.
// Le §8.114, le journal historique et les blocs d'état ne changent pas ; E5 reste non normative. Usage : node a2-05-travail/arbitrage-F/consignation-avant-checkpoint/application/appliquer-consignation.mjs <racine du dépôt>
import { resolve } from 'node:path';
import { appliquer } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/consignation-avant-checkpoint/', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md';
const nom = (p) => p.split('/').pop(); const JOURNAL = "**Révision 4 de la proposition d'addendum E5 appliquée**";
appliquer({
  root, A: OUT + 'application/', SRC: OUT, diffDe: (p) => 'diffs/' + nom(p) + '.diff', plan: '4a677034b3b201bd', planApres: '05faf7026c0e3364', fin: 'consignation conforme',
  D: [
    [BIL, nom(BIL), 'fb2045d393e81bdb7633215952be8ab8ed1ab735b62e6ad7e8012a2d7c8d9a7f', '9702e17291b18c22f143b66ed24728ac1595efeeaeb0b8db228c3d3d4d77f40e', '92d278b94d1d04e7d0d76cb070fa1c7138cb476a83952a446fd93ecd12ec37fb'],
    [ETAT, ETAT, '0d2da75966ea5b7b6f3e61ff5f86e540b97b7ddb93668b0da3ea1b011eb8559b', '98571b28561da5651a7486876424a02caf1507a3dbfd40f68e979f7436b6fe21', '5460f23e184f2a552e02c57fa987bd80d084510338fb9731be1388149e9e912a'],
    [ROAD, ROAD, '9861dc97a40db6cb6c0370d840edaa5ef4f245605695563161184d40c0ce5d33', '2ed035cc43421e05b5ca70d6eb242ef1b67f6ba1e1579707e9235fe34ea3b794', '32a454f816a19f3814bfe0694f25b9bad87a4d5e4f50b91394ad3f500233342f'],
    [INV, nom(INV), '42456677d17b726728e85323b9e51db3ba2a24e11512b5d5cbdcdd5ab022421d', '6fa8b33b9aeee4dae9cbd27d0a651b084895eb7837b571b918011e57721d0cbf', '65ef566d4d8cbe73f9c0e537fb469c5b0677e63c726157c0fc640c738a16ed5e'],
  ],
  avant: ({ ok, lire }) => {
    ok(!/^### 8\.115 /m.test(lire(BIL)) && (lire(BIL).match(/^### 8\.114 /gm) ?? []).length === 1, 'P6 ajout absent : §8.115 ; §8.114 présent');
    ok(!lire(INV).includes('arbitrage-F/'), 'P6 ajout absent : lignes de l\'inventaire');
    ok(!lire(ETAT).includes(JOURNAL), 'P6 ajout absent : ligne de journal');
  },
  apres: ({ ok, lire, changees }, { avant, REELS }) => {
    const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
    ok(pa(lire(ETAT)) === pa(lire(ROAD)) && pa(lire(ETAT)).startsWith('- **Prochaine action.** Le point de commit :'), 'C3 « Prochaine action » identique dans les deux documents');
    const plus = (p) => changees(lire(REELS + p + '.diff')).filter((l) => l.startsWith('+')); const pE = plus(ETAT), pR = plus(ROAD);
    ok(pR.length === 2 && pR.every((l) => pE.includes(l)) && pE.length === 3, 'C3 rubriques communes identiques ; ETAT-ACTUEL.md n\'ajoute que la ligne de journal');
    const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
    ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C4 journal historique intact, une ligne ajoutée', j1.length + ' lignes');
    const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL), reste = b1.slice(b0.length);
    ok(b1.startsWith(b0) && /^\s*### 8\.115 /.test(reste) && reste.split('### 8.').length === 2, 'C5 §8.114 et bilan antérieur inchangés, §8.115 seul ajouté');
    const iA = avant[INV].split('\n'), iB = lire(INV).split('\n'); ok(iB.length === iA.length + 20 && iA.every((l) => iB.includes(l)), 'C5 bis inventaire : vingt lignes ajoutées, aucune ancienne modifiée');
  },
});
