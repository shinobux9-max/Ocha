// A2-05 : inscription de l'arbitrage de T3 au §0 de son rapport (décision du 2026-10-23), par le module v2, proposition conservée.
// Usage : node a2-05-travail/arbitrage-T3/inscrire.mjs <racine du dépôt>
// Le rapport est régénéré, avec la constante ARBITRAGE d'audit-v1-lot3-T3.mjs, dans une copie temporaire de l'arbre qui reconstitue l'état de la
// livraison relue : rapport de T3 absent (le §6 livré dit « 193 arbitrés, 0 proposés ») et manifeste à 31 entrées, le périmètre de T3 hors du
// manifeste (le §6 livré le dit) ; ce manifeste est reconstruit en retirant la 32e entrée et le dernier ajout, et son empreinte doit être celle
// relevée avant l'ajout. Le résultat doit être exactement la proposition, à deux différences près : la ligne de statut, et le §0 inséré avant le §1.
// Sinon, arrêt sans écriture. La proposition livrée est sauvegardée à côté (proposition-T3.md) avant l'écriture. Aucune donnée, aucun manifeste
// ni registre n'est modifié.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const H = join(root, 'a2-05-travail', 'arbitrage-T3');
const MAN = 'a2-05-travail/empreintes-rapports-arbitres.json';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T3.md', PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T3-perimetre.md';
const PROPOSITION = 'c4f38a6ededf3d5b9e4822765e48c8922912f42b542af752b4382fefc821fcb9'; // rapport livré et relu
const MAN_LIVRAISON = 'f43773b19253a4e2bd645b8cd7044d7e4b9176c5a29ad23071f869e0103aa448'; // manifeste à 31 entrées, relevé avant l'ajout du périmètre
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const arret = (m) => { console.log('ARRÊT SANS ÉCRITURE : ' + m); process.exit(2); };
const P = readFileSync(join(root, RAP), 'utf8');
if (sha(P) !== PROPOSITION) arret('le rapport n\'est pas la proposition relue (' + sha(P).slice(0, 12) + '…)');
if (!/^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(P)) arret('le rapport n\'est pas au statut de proposition');
const m = JSON.parse(readFileSync(join(root, MAN), 'utf8'));
if (Object.hasOwn(m.empreintes, RAP)) arret('rapport déjà au manifeste');
const cles = Object.keys(m.empreintes);
if (cles.length !== 32 || cles[31] !== PER || JSON.stringify(m.ajouts.at(-1).chemins) !== JSON.stringify([PER])) arret('manifeste inattendu : la 32e entrée et le dernier ajout doivent être le seul périmètre de T3');
const m31 = { ...m, empreintes: Object.fromEntries(cles.slice(0, 31).map((k) => [k, m.empreintes[k]])), ajouts: m.ajouts.slice(0, -1) };
const brut31 = JSON.stringify(m31, null, 1) + '\n';
if (sha(brut31) !== MAN_LIVRAISON) arret('manifeste reconstruit à 31 entrées différent de celui de la livraison (' + sha(brut31).slice(0, 12) + '…)');
const src = readFileSync(join(root, 'a2-05-travail', 'audit-v1-lot3-T3.mjs'), 'utf8');
const date = (src.match(/const ARBITRAGE = \{ date: '(\d{4}-\d{2}-\d{2})'/) ?? [])[1]; if (!date) arret('ARBITRAGE non renseigné dans la configuration');
// Génération dans une copie temporaire qui reconstitue l'état de la livraison
const tmp = mkdtempSync(join(tmpdir(), 'ocha-arb-t3-')); const copie = join(tmp, 'arbre');
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
rmSync(join(copie, RAP)); writeFileSync(join(copie, MAN), brut31);
const r = spawnSync('node', [join(copie, 'a2-05-travail', 'audit-v1-lot3-T3.mjs'), copie], { encoding: 'utf8' });
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
writeFileSync(join(H, 'proposition-T3.md'), P);
writeFileSync(join(root, RAP), G);
console.log('inscrit : ' + RAP + ' (proposition ' + sha(P).slice(0, 12) + '… sauvegardée dans a2-05-travail/arbitrage-T3/proposition-T3.md ; arbitré ' + sha(G).slice(0, 12) + '…) ; différence : ligne de statut et §0 (' + (j1 - j0) + ' lignes insérées), rien d\'autre');
