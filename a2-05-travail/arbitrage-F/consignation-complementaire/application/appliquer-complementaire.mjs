// A2-05 : application de la consignation complémentaire (§8.116), par les quatre diffs relus de la variante demandée. PRÉPARÉ, à ne lancer que sur autorisation distincte.
// `avec` exige l'alternative effectivement installée, `sans` son absence. Le §8.115, le journal historique et les blocs d'état ne changent pas.
// Usage : node a2-05-travail/arbitrage-F/consignation-complementaire/application/appliquer-complementaire.mjs <racine du dépôt> <avec|sans>
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { appliquer } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''), v = process.argv[3]; if (!process.argv[2] || !['avec', 'sans'].includes(v)) throw new Error('arguments attendus : racine du dépôt, puis avec ou sans');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/consignation-complementaire/', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', TRACE = W + 'arbitrage-F/references-git/application/sorties/application.txt', VERIFS = 67;
const nom = (p) => p.split('/').pop(); const JOURNAL = '**Règle complémentaire du `.gitattributes` appliquée**';
const H = { avec: { plan: '9fd2f5efd8ba99a9', D: '[["9702e17291b18c22f143b66ed24728ac1595efeeaeb0b8db228c3d3d4d77f40e","c8abe093f4ccb02eff714d5d189a21e1eca1179cc84b81f37bbaa11d1d33cf07","bfad9cf04344d04c4266b18df6f12606123030822d282d18fc32866e3cd6c261"],["98571b28561da5651a7486876424a02caf1507a3dbfd40f68e979f7436b6fe21","f697311b7e6756c94c9279a29f05f3bda22e838dc227305efe34a145460adf92","43d11fa50cb4afba8ef491c679950075f9d29a74f34855f89a0ecaf8a26fc9e4"],["2ed035cc43421e05b5ca70d6eb242ef1b67f6ba1e1579707e9235fe34ea3b794","c455d511d197f23813d6b96f55f01e1fc19914386c624373372e48ef51d5de91","623a2e9b662b3b45933fa7b0c0ccb987877a9d85f33d749db89b85ac873516f1"],["6fa8b33b9aeee4dae9cbd27d0a651b084895eb7837b571b918011e57721d0cbf","e3790ce46ab98a0a6c81ee728414f4da25abe3a0b4cc3847778477b585373038","3d03aa19d36baa99aa604d4503c8952a68ccf96dae80a9023120ab2bf962b305"]]' }, sans: { plan: 'c1cf62dd3f33212d', D: '[["9702e17291b18c22f143b66ed24728ac1595efeeaeb0b8db228c3d3d4d77f40e","46d88ada88991c3aeaf024c6e390a0f76123ea41674bf0b96f9405d85f7d93d2","14a311f472d0731c09cb04ff21bf507ab839351ee769362680573eb17ce62095"],["98571b28561da5651a7486876424a02caf1507a3dbfd40f68e979f7436b6fe21","74aa63299d22958a8825ff0a3a86dab612fdd24681a869f07a71729a7f0c4d1b","59e7dcd1a115a087118d38ad2d4d56f42e1a0745f07b98a7b9085000aa2e7143"],["2ed035cc43421e05b5ca70d6eb242ef1b67f6ba1e1579707e9235fe34ea3b794","9c07a8baff3ff0060b20d1e53f911cfeb5933ae39e284fbe7310394d775a4dbb","2ce3bb8f27aaae254723bf4d8248b400fbaa26fb2cddf2d6cc9b9c45a29413bd"],["6fa8b33b9aeee4dae9cbd27d0a651b084895eb7837b571b918011e57721d0cbf","56b6b5c24eec8b75ad11f4c15ad7b3117fc98d3577665cfe4acf02a8ef71dfcd","cfda98f4248d3d11724d47df323c025a5299f35c6c6ba712a7aa71951acc3e52"]]' } }[v];
const LIGNES = { avec: 10, sans: 8 }[v];
appliquer({
  root, A: OUT + 'application/', SRC: OUT + v + '/', diffDe: (p) => 'diffs/' + nom(p) + '.diff', plan: '05faf7026c0e3364', planApres: H.plan, fin: 'consignation complémentaire conforme',
  D: [BIL, ETAT, ROAD, INV].map((p, i) => [p, nom(p), ...JSON.parse(H.D)[i]]),
  avant: ({ ok, lire }) => {
    const presents = ['references-git.json', 'cloture-checkpoint.mjs'].filter((n) => existsSync(`${root}/${W}${n}`)).length; // une installation partielle est refusée dans les deux variantes
    ok(presents === (v === 'avec' ? 2 : 0), 'P6 alternative ' + (v === 'avec' ? 'installée' : 'non installée') + ', conformément à la variante');
    if (v === 'avec') { const t = existsSync(`${root}/${TRACE}`) ? lire(TRACE) : ''; ok(/installation conforme\s*$/.test(t) && t.split('\n').filter((l) => l.startsWith('conforme')).length === VERIFS, 'P6 bis alternative installation effective : trace de l\'application, ' + VERIFS + ' vérifications'); }
    ok(!/^### 8\.116 /m.test(lire(BIL)) && (lire(BIL).match(/^### 8\.115 /gm) ?? []).length === 1, 'P6 ajout absent : §8.116 ; §8.115 présent');
    ok(!lire(ETAT).includes(JOURNAL), 'P6 ajout absent : ligne de journal');
  },
  apres: ({ ok, lire, changees }, { avant, REELS }) => {
    const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**')); ok(pa(lire(ETAT)) === pa(lire(ROAD)), 'C3 « Prochaine action » identique dans les deux documents');
    const plus = (p) => changees(lire(REELS + p + '.diff')).filter((l) => l.startsWith('+')); const pE = plus(ETAT), pR = plus(ROAD); ok(pR.length === 2 && pR.every((l) => pE.includes(l)) && pE.length === 3, 'C3 rubriques communes identiques ; ETAT-ACTUEL.md n\'ajoute que la ligne de journal');
    const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT)); ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C4 journal historique intact, §8.115 compris, une ligne ajoutée', j1.length + ' lignes');
    const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL), reste = b1.slice(b0.length); ok(b1.startsWith(b0) && /^\s*### 8\.116 /.test(reste) && reste.split('### 8.').length === 2, 'C5 §8.115 et bilan antérieur inchangés, §8.116 seul ajouté');
    const iA = avant[INV].split('\n'), iB = lire(INV).split('\n'); ok(iB.length === iA.length + LIGNES && iA.every((l) => iB.includes(l)), 'C5 bis inventaire : ' + LIGNES + ' lignes ajoutées, aucune ancienne modifiée');
  },
});
