// A2-05 : inscription de l'arbitrage de T2 au §0 de son rapport (décision du 2026-10-22), par le module v2, proposition conservée.
// Usage : node a2-05-travail/arbitrage-T2/inscrire.mjs <racine du dépôt>
// Le rapport est régénéré, avec la constante ARBITRAGE d'audit-v1-lot3-T2.mjs, dans une copie temporaire de l'arbre qui contient le rapport
// proposé (le registre de couverture y lit l'état de la proposition livrée : 21 sens proposés). Le résultat doit être exactement la
// proposition, à deux différences près : la ligne de statut, et le §0 inséré avant le §1. Sinon, arrêt sans écriture. La proposition
// livrée est sauvegardée à côté (proposition-T2.md) avant l'écriture. Aucune donnée, aucun manifeste ni registre n'est modifié.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const H = join(root, 'a2-05-travail', 'arbitrage-T2');
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T2.md';
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const arret = (m) => { console.log('ARRÊT SANS ÉCRITURE : ' + m); process.exit(2); };
const P = readFileSync(join(root, RAP), 'utf8');
if (!/^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(P)) arret('le rapport n\'est pas au statut de proposition');
if (Object.hasOwn(JSON.parse(readFileSync(join(root, 'a2-05-travail/empreintes-rapports-arbitres.json'), 'utf8')).empreintes, RAP)) arret('rapport déjà au manifeste');
const src = readFileSync(join(root, 'a2-05-travail', 'audit-v1-lot3-T2.mjs'), 'utf8');
const date = (src.match(/const ARBITRAGE = \{ date: '(\d{4}-\d{2}-\d{2})'/) ?? [])[1]; if (!date) arret('ARBITRAGE non renseigné dans la configuration');
// Génération dans une copie temporaire (le rapport proposé y est présent, comme lors de la livraison relue)
const tmp = mkdtempSync(join(tmpdir(), 'ocha-arb-t2-')); const copie = join(tmp, 'arbre');
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
const r = spawnSync('node', [join(copie, 'a2-05-travail', 'audit-v1-lot3-T2.mjs'), copie], { encoding: 'utf8' });
if (r.status !== 0) { rmSync(tmp, { recursive: true, force: true }); arret('génération : code ' + r.status + ' : ' + r.stderr.split('\n').find((x) => /Error/.test(x))); }
const G = readFileSync(join(copie, RAP), 'utf8'); rmSync(tmp, { recursive: true, force: true });
// Résultat attendu, construit à partir de la proposition : la ligne de statut remplacée, le §0 (tel que généré) inséré avant le §1
const lp = P.split('\n'); const lg = G.split('\n');
const iStat = lp.findIndex((l) => l.startsWith('**Statut** : ')); const i1 = lp.indexOf('## 1. Résultat proposé');
const statut = '**Statut** : **arbitré le ' + date + '** (§0). La proposition est conservée telle qu\'elle a été livrée.';
const j0 = lg.indexOf('## 0. Arbitrage'), j1 = lg.indexOf('## 1. Résultat proposé');
if (iStat < 0 || i1 < 0 || j0 < 0 || j1 < 0) arret('structure inattendue');
const E = [...lp.slice(0, iStat), statut, ...lp.slice(iStat + 1, i1), ...lg.slice(j0, j1), ...lp.slice(i1)].join('\n');
if (E !== G) {
  const le = E.split('\n'); const d = lg.map((l, i) => (l !== le[i] ? i + 1 : 0)).filter(Boolean).slice(0, 10);
  arret('le rapport régénéré diffère de la proposition hors du statut et du §0 (lignes ' + d.join(', ') + ')');
}
writeFileSync(join(H, 'proposition-T2.md'), P);
writeFileSync(join(root, RAP), G);
console.log('inscrit : ' + RAP + ' (proposition ' + sha(P).slice(0, 12) + '… sauvegardée dans a2-05-travail/arbitrage-T2/proposition-T2.md ; arbitré ' + sha(G).slice(0, 12) + '…) ; différence : ligne de statut et §0 (' + (j1 - j0) + ' lignes insérées), rien d\'autre');
