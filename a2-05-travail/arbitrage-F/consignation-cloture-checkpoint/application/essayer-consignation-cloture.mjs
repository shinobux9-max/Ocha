// A2-05 : essai de la consignation de la clôture sur copie jetable, jamais sur le dépôt réel. Usage : node .../essayer-consignation-cloture.mjs <racine du dépôt>
import { writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { essayer, espace, inverse } from '../../essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/consignation-cloture-checkpoint/', A = OUT + 'application/', PR = OUT + 'proposition/', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
essayer({
  root, SCR: A + 'appliquer-consignation-cloture.mjs', A, fin: /consignation de la clôture conforme$/, cibles: [BIL, ETAT, ROAD],
  scenario: ({ altere, refus, f, g }) => {
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R1 index non vide', /P1 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    altere('R2 manifeste modifié', W + 'empreintes-rapports-arbitres.json', espace, /P3 manifeste/);
    altere('R3 rapport protégé modifié', 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', espace, /P3 manifeste/);
    altere('R4 fins de ligne de ROADMAP.md inversées', ROAD, inverse, /P4 fins de ligne.*ROADMAP/);
    altere('R5 ancre dédoublée dans ROADMAP.md', ROAD, (o) => Buffer.concat([o, o]), /P5 ancres uniques.*ROADMAP/);
    altere('R6 §8.117 déjà présent dans le bilan', BIL, (o) => Buffer.concat([o, Buffer.from('### 8.117 déjà là\n', 'utf8')]), /P6 ajout absent : §8\.117/);
    altere('R7 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu/);
    altere('R8 bilan modifié : empreinte de départ', BIL, espace, /P9 empreinte de départ : docs\/rapports/);
    altere('R9 version approuvée modifiée', PR + 'ROADMAP.md', espace, /P10 version approuvée : ROADMAP\.md/);
    altere('R10 diff relu modifié', PR + 'diffs/ETAT-ACTUEL.md.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu.*ETAT-ACTUEL\.md/);
    altere('R11 `CLAUDE.md` modifié', 'CLAUDE.md', espace, /P6 préservé : CLAUDE/);
  },
});
