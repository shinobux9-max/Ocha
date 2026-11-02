// A2-05 : inscription de l'arbitrage de T4 (autorisée le 2026-10-24), dans le périmètre exact de la proposition corrigée pour la numérotation.
// Usage : node a2-05-travail/arbitrage-T4/inscrire.mjs <racine du dépôt> <dossier de travail, hors du dépôt>
// Préconditions sur le dépôt réel ; puis preparer-inscription-T4.mjs relancé (copie temporaire : régénération, essais, sabotages), code 0 exigé ;
// ses cinq sorties doivent être identiques, octet pour octet, aux versions relues (empreintes ci-dessous). Alors seulement : la proposition est
// sauvegardée (arbitrage-T4/proposition-T4.md), puis cinq fichiers sont écrits : le rapport de T4 (statut et §0), sa configuration (ARBITRAGE),
// le bilan du volet 2 (§8.91), ETAT-ACTUEL.md et ROADMAP.md (quatre fragments chacun). Aucun manifeste, aucune synchronisation, aucune donnée.
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const [R0, O0] = process.argv.slice(2); if (!R0 || !O0) throw new Error('arguments attendus : racine du dépôt, dossier de travail');
const root = resolve(R0), out = resolve(O0);
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const arret = (m) => { console.log('ARRÊT SANS ÉCRITURE : ' + m); process.exit(2); };
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T4.md', CFG = 'a2-05-travail/audit-v1-lot3-T4.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ATTENDU = { // versions relues (sorties de la préparation, identiques sur les trois cycles de relecture)
  'rapport-T4-arbitre-apercu.md': [RAP, 'e0022e0dd95634b1e629a4bdbecf833d0143313fc2cc4b9daa334abf5905f6c9'],
  'audit-v1-lot3-T4.avec-arbitrage.mjs': [CFG, 'c9a8554c166cb00b926a61a51bddcc1e4462ae44204325eae9f0393dbbc17b23'],
  'bilan-copie.md': [BIL, '990924a2f7e7547b72caab6c10597f9e6fd4c43d9a191fa0ec2e6fbd4d7fd095'],
  'etat-copie.md': ['ETAT-ACTUEL.md', 'e6450a6adf0b9d6ae913352c4dcb4d829a6133ec86a2848b299aece72cb17a53'],
  'roadmap-copie.md': ['ROADMAP.md', 'bb848bb8454f9caffb1bca32d93d0c5a337890e25ff6f705a1537d458a3b6e7b'],
};
// Préconditions
if (sha(join(root, RAP)) !== '2e3fcff61bef5d6f0e6d6bb8e4c7e15e564146c55ecf5eb444d24b7a19957448') arret('le rapport de T4 n\'est pas la proposition relue');
if (sha(join(root, 'a2-05-travail/sync-stable.mjs')) !== '75b686d2a1458507ebb4af99a560caa2769a2a4bb227b06d7d5b0ef7fb4264a1') arret('sync-stable.mjs n\'est pas le module vérifié');
if (/^### 8\.91 /m.test(readFileSync(join(root, BIL), 'utf8'))) arret('§8.91 déjà présent');
const { verifierEmpreintes } = await import(pathToFileURL(join(root, 'a2-05-travail/empreintes-lot3.mjs')).href);
const emp = verifierEmpreintes(root); if (emp.controles !== 34) arret('manifeste : ' + emp.controles + ' empreintes au lieu de 34');
if (existsSync(join(root, 'a2-05-travail/arbitrage-T4/proposition-T4.md'))) arret('proposition-T4.md existe déjà');
// Préparation relancée (préconditions P1 à P5 sur les fragments, régénération E2, essais et sabotages) : code 0 exigé
const p = spawnSync(process.execPath, [join(root, 'a2-05-travail/arbitrage-T4/preparer-inscription-T4.mjs'), root, out], { encoding: 'utf8' });
writeFileSync(join(out, '..', 'preparation-inscription.txt'), p.stdout + p.stderr);
if (p.status !== 0) arret('préparation : code ' + p.status);
for (const [f, [, h]] of Object.entries(ATTENDU)) if (sha(join(out, f)) !== h) arret(f + ' : différent de la version relue (' + sha(join(out, f)).slice(0, 12) + '…)');
// Écriture
copyFileSync(join(root, RAP), join(root, 'a2-05-travail/arbitrage-T4/proposition-T4.md'));
for (const [f, [cible]] of Object.entries(ATTENDU)) writeFileSync(join(root, cible), readFileSync(join(out, f)));
for (const [f, [cible, h]] of Object.entries(ATTENDU)) if (sha(join(root, cible)) !== h) { console.log('ÉCART APRÈS ÉCRITURE : ' + cible); process.exit(1); }
console.log('inscrit : ' + Object.values(ATTENDU).map(([c]) => c).join(', ') + ' ; proposition sauvegardée : a2-05-travail/arbitrage-T4/proposition-T4.md');
