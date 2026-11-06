// A2-05 : application de la consignation de la clôture du checkpoint (§8.117), par les trois diffs relus. Autorisée le 2026-11-02 ; à lancer une seule fois.
// Blocs a2-05:etat, journal historique, bilan antérieur, `CLAUDE.md`, relais et normes inchangés. N'indexe, ne committe et ne pousse rien.
// Usage : node a2-05-travail/arbitrage-F/consignation-cloture-checkpoint/application/appliquer-consignation-cloture.mjs <racine du dépôt>
import { resolve } from 'node:path';
import { appliquer } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/consignation-cloture-checkpoint/', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const nom = (p) => p.split('/').pop(); const JOURNAL = "**Checkpoint Git clos, à l'état 6 sur 6**";
const PRESERVES = { 'CLAUDE.md': 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04', 'docs/relecture/reprise-A2-05.md': 'd0586d42795b00fb5360de4f91585e3ea65dc91355cf92e9e9faca28b2061344', [W + 'references-git.json']: null };
appliquer({
  root, A: OUT + 'application/', SRC: OUT + 'proposition/', diffDe: (p) => 'diffs/' + nom(p) + '.diff', plan: '9fd2f5efd8ba99a9', planApres: 'cc10d8c7b48ebad0', fin: 'consignation de la clôture conforme',
  D: [
    [BIL, nom(BIL), 'c8abe093f4ccb02eff714d5d189a21e1eca1179cc84b81f37bbaa11d1d33cf07', '677e5589f1adeddd17d4e9629d477f1386c22ce9ab1afd90d3e528e0a20fd9a3', '64b48ab77ddfd5461ae6a137e9ff58105dc457ef4283587caf89786778a6d059'],
    [ETAT, ETAT, 'f697311b7e6756c94c9279a29f05f3bda22e838dc227305efe34a145460adf92', '178f3e566b0241558eb591bf7fdedec3d3fa0f31fab94eadb750890530e82738', '15411d5ece5655d142107c841a33e42ef01f5358f3f42248252479f0195c2477'],
    [ROAD, ROAD, 'c455d511d197f23813d6b96f55f01e1fc19914386c624373372e48ef51d5de91', 'ee1fd1a2e23f3bc5598fbae030f852155215cd4252ccfbe93a5598e1bf7f1840', '498d7985e63d7c019e7042d9aea2fed6a11d1fd8b090eb4ee9220799020031e0'],
  ],
  avant: ({ ok, lire, shaF }) => {
    for (const [p, h] of Object.entries(PRESERVES)) { PRESERVES[p] = h ?? shaF(p); ok(!h || shaF(p) === h, 'P6 préservé : ' + p, PRESERVES[p].slice(0, 12) + '…'); }
    ok(!/^### 8\.117 /m.test(lire(BIL)) && (lire(BIL).match(/^### 8\.116 /gm) ?? []).length === 1, 'P6 ajout absent : §8.117 ; §8.116 présent');
    ok(!lire(ETAT).includes(JOURNAL), 'P6 ajout absent : ligne de journal');
  },
  apres: ({ ok, lire, shaF }, { avant }) => {
    for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'C3 préservé : ' + p);
    const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**')); ok(pa(lire(ETAT)) === pa(lire(ROAD)), 'C3 bis « Prochaine action » identique dans les deux documents');
    const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT)); ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C4 journal historique intact, une ligne ajoutée', j1.length + ' lignes');
    const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL), reste = b1.slice(b0.length); ok(b1.startsWith(b0) && /^\s*### 8\.117 /.test(reste) && reste.split('### 8.').length === 2, 'C5 §8.116 et bilan antérieur inchangés, §8.117 seul ajouté');
  },
});
