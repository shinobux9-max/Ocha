// A2-05 · volet 1 · lot 3 : application de l'état E2 de la consolidation de T7 (autorisation du 2026-10-30 : « J'accepte E1 et autorise uniquement
// E2 : l'installation du recalcul T7 adapté déjà relu. »). Dérivé de application-E1/appliquer-E1.mjs. Un seul fichier remplacé :
// a2-05-travail/recalcul-T7-perimetre.mjs, par la version relue de consolidation/ (c8877283…). Ni 40e entrée (E3), ni synchronisation (E4),
// ni consignation. (1) Préconditions, sans écriture : recalcul en service à son empreinte complète (version initiale 4c990f02…) ; version
// proposée et diff relus à leurs empreintes ; diff régénéré identique octet pour octet au diff approuvé ; état E1 intact (six documents,
// proposition sauvegardée) ; 39 empreintes, manifeste à son empreinte ; relais 29 sur 30 (C9a) ; recalcul d'origine 24/24 ; aperçu vide ;
// index vide. (2) Sauvegarde du script de départ dans application-E2/depart/. (3) Copie de la version relue ; identité octet pour octet ;
// node --check. (4) Contrôles attendus après E2. Arrêt au premier écart, sans réparation ; chemins masqués.
// Usage : node a2-05-travail/arbitrage-T7/application-E2/appliquer-E2.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-T7/consolidation/', OUT = W + 'arbitrage-T7/application-E2/', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = '7a79b16e4641f93f';
const REC = W + 'recalcul-T7-perimetre.mjs', V = F + 'recalcul-T7-perimetre.mjs', D = F + 'diffs/recalcul-T7-perimetre.mjs.diff', DEP = OUT + 'depart/';
const REC_SHA0 = '4c990f0272a323c127e5507aabd00d915af7752d1723cb3c81194f595655faa0'; // version initiale, en service
const REC_SHA1 = 'c8877283e3864a7e9c9f542a08e74b189aef3c6f4b9e9bfc0abf01e7b75eb91c'; // version adaptée relue (export de consolidation)
const DIFF_SHA = '5f5091abff4ee80c8cd31db58ca8e02a4925852ae26ece5fe0176fadf2b99966';
const MAN = W + 'empreintes-rapports-arbitres.json', MAN_SHA = 'eb6599cb5f1a01ec609f5481477853f4def1430c2d5b858c18d7fc00b0a806a2';
const PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md', PROP = W + 'arbitrage-T7/proposition-T7-perimetre.md';
// État E1 : documents appliqués le 2026-10-29, à leurs empreintes relues ; la proposition sauvegardée
const E1 = {
  [W + 'perimetre-T7.mjs']: '61fbb8a35286e66cd7dfdf68543187a75e321e3aaf1fcdcc5d658d8796b6c818',
  [PER]: 'a93a75cc4da86efeeea667aa357dcd457ac7583311d7fad6ce3a0a68f4cf77dc',
  'ETAT-ACTUEL.md': '51e410b7eaf1e5c5d950adcea8938d9f88c0ce75e8061cb158fca0b43a786737',
  'ROADMAP.md': '0497e58a0cefdc67521b4ad3a03df0c5dc1f9a5dc3eb0471bca60ead736bae06',
  'docs/rapports/etape2-A2-05-bilan-volet2.md': 'ee6f63e4afebf19d16d77f0dd30bfae883ef255d83d4afec6e1fda3f8279b3b9',
  [W + 'INVENTAIRE-SCRIPTS.md']: '1ee4d3950f6013946e275f255ed527f7565ddd897789d207a3e58b114dfc5724',
  [PROP]: '046c68e4c9822ec3c84db47167f7e31d3ec84ae18b5b7f216029e309206bdd45',
};
const masquer = (l) => [[root, '<racine>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'application.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
process.on('uncaughtException', (e) => { dire('EXCEPTION ' + masquer(String(e?.message ?? e)).slice(0, 200)); ok(false, 'interruption'); });
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const sha = (p) => shaB(readFileSync(join(root, p)));
const lire = (p) => readFileSync(join(root, p), 'utf8');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ' + e.slice(0, 260)); };
const conformes = (r) => r.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const gitDiff = (a, b) => spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', a, b], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const corps = (d) => d.slice(d.indexOf('\n@@') + 1);
const lignesPM = (t) => t.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
const initial = instantane();

dire('# Préconditions (aucune écriture)');
ok(sha(REC) === REC_SHA0, REC + ' : recalcul en service à son empreinte complète (version initiale)', REC_SHA0);
ok(sha(V) === REC_SHA1, V + ' : version proposée à l\'empreinte complète de la version relue', REC_SHA1);
ok(sha(D) === DIFF_SHA, D + ' : diff approuvé à son empreinte', DIFF_SHA);
ok(gitDiff(REC, V) === lire(D), 'diff régénéré (recalcul en service → version proposée) identique octet pour octet au diff approuvé');
const nc0 = spawnSync(process.execPath, ['--check', join(root, V)], { encoding: 'utf8' }); ok(nc0.status === 0, 'node --check, version proposée', 'code ' + nc0.status);
for (const [p, h] of Object.entries(E1)) ok(sha(p) === h, p + ' : inchangé depuis E1', h.slice(0, 12) + '…');
const t = Object.fromEntries(['ETAT-ACTUEL.md', 'ROADMAP.md'].map((p) => [p, lire(p)]));
ok(Object.values(t).every((x) => bloc(x).includes('empreinte=' + MARQUEUR + ' ')) && bloc(t['ETAT-ACTUEL.md']) === bloc(t['ROADMAP.md']), 'blocs a2-05:etat identiques, au marqueur ' + MARQUEUR);
const man = JSON.parse(lire(MAN)).empreintes;
ok(sha(MAN) === MAN_SHA && Object.keys(man).length === 39 && !Object.hasOwn(man, PER), 'manifeste à son empreinte : 39 entrées ; périmètre de T7 absent', MAN_SHA.slice(0, 12) + '…');
const emp0 = lancer(W + 'empreintes-lot3.mjs'); ok(emp0.code === 0 && emp0.out === 'empreintes : 39 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + PER, '39 empreintes conformes ; seul le périmètre accepté de T7 hors du manifeste', emp0.out);
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); const ec0 = ecarts(rel0).map((l) => (l.match(/^ÉCART\s+(C\w+)/) ?? [])[1]);
ok(rel0.out.split('\n').pop() === '29 conformes sur 30' && JSON.stringify(ec0) === '["C9a"]', 'relais 29 sur 30 avant E2, C9a seul');
const r70 = lancer(REC); ok(r70.code === 0 && !ecarts(r70).length && conformes(r70) === 24, 'recalcul de T7 d\'origine : 24/24 avant E2');
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte0 = lire(APERCU);
mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'apercu-avant-E2.md'), texte0);
ok(ap0.code === 0 && lignesPM(texte0).length === 0, 'aperçu de synchronisation vide avant E2', 'plan ' + (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]);
const idx0 = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx0.status === 0 && idx0.stdout.trim() === '', 'index vide avant l\'écriture');
const ch0 = differents(initial, instantane()); ok(ch0.every((p) => p === APERCU), 'préconditions sans écriture (au plus l\'aperçu régénéré)', ch0.join(', ') || 'aucun fichier changé');

dire('\n# Sauvegarde du script de départ');
ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true }); copyFileSync(join(root, REC), join(root, DEP + 'recalcul-T7-perimetre.mjs'));
ok(sha(DEP + 'recalcul-T7-perimetre.mjs') === REC_SHA0, 'sauvegarde ' + DEP + 'recalcul-T7-perimetre.mjs', REC_SHA0.slice(0, 12) + '…');

dire('\n# Installation de la version relue');
copyFileSync(join(root, V), join(root, REC));
ok(readFileSync(join(root, REC)).equals(readFileSync(join(root, V))) && sha(REC) === REC_SHA1, REC + ' : identique octet pour octet à la version relue', REC_SHA1);
const nc1 = spawnSync(process.execPath, ['--check', join(root, REC)], { encoding: 'utf8' }); ok(nc1.status === 0, 'node --check ' + REC, 'code ' + nc1.status);
mkdirSync(join(root, OUT, 'diffs-reels'), { recursive: true });
const reel = gitDiff(DEP + 'recalcul-T7-perimetre.mjs', REC); writeFileSync(join(root, OUT, 'diffs-reels', 'recalcul-T7-perimetre.mjs.diff'), reel);
ok(corps(reel) === corps(lire(D)) && corps(reel).length > 0, 'diff réel (script de départ → script installé) de hunks identiques au diff approuvé', 'diffs-reels/recalcul-T7-perimetre.mjs.diff ; ' + shaB(reel).slice(0, 12) + '…');

dire('\n# Contrôles après E2');
const A = { rec7: lancer(REC), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), cbp: lancer(W + 'controle-bilan-pilote.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), emp: lancer(W + 'empreintes-lot3.mjs'), cov: lancer(W + 'couverture-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
writeFileSync(join(root, OUT, 'sorties', 'recalcul-T7-adapte-E2.txt'), masquer(A.rec7.out) + '\n');
const e7 = ecarts(A.rec7);
ok(A.rec7.code === 1 && conformes(A.rec7) === 25 && e7.length === 1 && A.rec7.out.split('\n').pop() === '1 écart(s)', 'recalcul de T7 adapté : 25 conformes, un seul écart', conformes(A.rec7) + ' conformes ; ' + e7.length + ' écart(s)');
ok(e7[0].startsWith('ÉCART    manifeste : au moins 40 empreintes recalculées, toutes identiques ; les 39 premières entrées dans leur ordre ; périmètre accepté de T7 protégé (40e entrée) : ')
  && e7[0].endsWith(': 39 entrées ; 39 premières 4b46ca6736e6… ; périmètre de T7 : hors du manifeste ; différentes : aucune'),
  'cet écart est la 40e entrée manquante (39 entrées, 39 premières dans leur ordre, aucune empreinte différente)', e7[0].split(' : ').slice(-1)[0]);
ok(A.rec7.out.includes('conforme périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée') && A.rec7.out.includes('conforme périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)'), 'recalcul de T7 adapté : les deux contrôles nouveaux du périmètre accepté sont conformes');
ok(A.rec5.code === 0 && !ecarts(A.rec5).length && conformes(A.rec5) === 17, 'recalcul de T5 : 17/17');
ok(A.rec6.code === 0 && !ecarts(A.rec6).length && conformes(A.rec6) === 27, 'recalcul de T6 : 27/27');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length && conformes(A.cbp) === 46, 'contrôle du bilan du pilote : 46/46');
const ecRel = ecarts(A.rel).map((l) => (l.match(/^ÉCART\s+(C\w+)/) ?? [])[1]);
ok(A.rel.out.split('\n').pop() === '29 conformes sur 30' && JSON.stringify(ecRel) === '["C9a"]', 'relais --apres-application : 29 sur 30, C9a seul');
ok(A.emp.code === 0 && A.emp.out === emp0.out && sha(MAN) === MAN_SHA, 'manifeste : 39 empreintes conformes, inchangé', A.emp.out);
ok(A.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '296/377', 'couverture 296/377, 81 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 5) === 'V1-24', 'corrections 196 dans 172 ENTRY, aucune appliquée ; V1-24 libre');
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte1 = lire(APERCU); writeFileSync(join(root, OUT, 'sorties', 'apercu-apres-E2.md'), texte1);
ok(ap1.code === 0 && lignesPM(texte1).length === 0, 'aperçu de synchronisation vide', 'plan ' + (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]);
const ch1 = differents(initial, instantane());
ok(ch1.includes(REC) && ch1.every((p) => [REC, APERCU].includes(p)), 'arbre de travail : seul le recalcul de T7 change (plus l\'aperçu régénéré) ; aucun autre script, ni manifeste, rapports protégés, normes, données, registre', ch1.join(', '));
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\nE2 appliqué : contrôles conformes');
fin(0);
