// A2-05 · T9 : application de la consignation de clôture (autorisée le 2026-11-01) : quatre diffs relus, par remplacements ciblés.
// Usage : node a2-05-travail/arbitrage-F/cloture-T9/application/appliquer-cloture-T9.mjs <racine du dépôt>
import { resolve } from 'node:path';
import { appliquer } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/cloture-T9/', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md';
const nom = (p) => p.split('/').pop();
appliquer({
  root, A: OUT + 'application/', SRC: OUT, diffDe: (p) => 'diffs/' + nom(p) + '.diff', plan: '02704a905a7b7b2c', planApres: 'c73b0fdc9f7d49e9', fin: 'clôture de T9 conforme',
  D: [
    [BIL, nom(BIL), 'fb60295d0076225896747bf61e3d489467038a26e012e48d6d7ffc0dcf718b7a', 'fb2045d393e81bdb7633215952be8ab8ed1ab735b62e6ad7e8012a2d7c8d9a7f', 'cf221d2e237ce79b627a8c6ce970de68caf027f2ed8aa3fc53acf1ea36b462c0'],
    [ETAT, ETAT, 'd9a2a2f7ae3fe2c9e17d20b08356b7e10883144e7182e335e13790645baade17', '2f231a904a33d3c1108729cb9cea740025deb17fe710435dabb17aef54ccfdc5', '41d3ddc156633c1280c3484a2c7527e57f88e4995880b96525bacf5e14b1c31c'],
    [ROAD, ROAD, 'fcdaa47173516322de767ad21df3c2e5b1b5ca95d0e79f6d672cede11ba62b03', '05d46e7be98b18898867d052ec3514f872e1f48a020c98749c7e3d0b97f3d6d0', '2904102538b363cf6f53cd8a967c29832f81bf2ab5060e250c5142975aea0548'],
    [INV, nom(INV), '018b40bc87b6f257bebb69ac520b0951a7ee243f9fb17f3e79e4a97ed95dc3b6', '42456677d17b726728e85323b9e51db3ba2a24e11512b5d5cbdcdd5ab022421d', '1af170711fb0a06b6b777597c6625cb2ed6801cc73fb51787f09672c33f35f41'],
  ],
  avant: ({ ok, lire }) => {
    ok(!/^### 8\.114 /m.test(lire(BIL)) && (lire(BIL).match(/^### 8\.113 /gm) ?? []).length === 1, 'P6 ajout absent : §8.114 ; §8.113 présent');
    ok(!lire(INV).includes('appliquer-consignation-T9.mjs') && !lire(INV).includes('essayer-consignation-T9.mjs'), 'P6 ajout absent : deux lignes de l\'inventaire');
    ok(!lire(ETAT).includes('**Consignation de T9 appliquée**'), 'P6 ajout absent : ligne de journal');
  },
  apres: ({ ok, lire, changees }, { avant, REELS }) => {
    const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
    ok(pa(lire(ETAT)) === pa(lire(ROAD)) && pa(lire(ETAT)).startsWith("- **Prochaine action.** La décision sur la révision 4 de la proposition d'addendum E5 (`docs/"), 'C3 « Prochaine action » identique dans les deux documents');
    const plus = (p) => changees(lire(REELS + p + '.diff')).filter((l) => l.startsWith('+')); const pE = plus(ETAT), pR = plus(ROAD);
    ok(pR.length === 2 && pR.every((l) => pE.includes(l)) && pE.length === 3, 'C3 rubriques communes identiques ; ETAT-ACTUEL.md n\'ajoute que la ligne de journal');
    const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
    ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C4 journal historique intact, une ligne ajoutée', j1.length + ' lignes');
    const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL), reste = b1.slice(b0.length);
    ok(b1.startsWith(b0) && /^\s*### 8\.114 /.test(reste) && reste.split('### 8.').length === 2 && /^### 8\.113 /m.test(b0), 'C5 §8.113 et bilan antérieur inchangés, §8.114 seul ajouté');
    const iA = avant[INV].split('\n'), iB = lire(INV).split('\n'); ok(iB.length === iA.length + 2 && iA.every((l) => iB.includes(l)) && lire(INV).includes('| `arbitrage-T9/consignation-T9/application/appliquer-consignation-T9.mjs` |') && lire(INV).includes('| `arbitrage-T9/consignation-T9/application/essayer-consignation-T9.mjs` |'), 'C5 bis inventaire : deux lignes ajoutées, par chemins complets, aucune ancienne modifiée');
  },
});
