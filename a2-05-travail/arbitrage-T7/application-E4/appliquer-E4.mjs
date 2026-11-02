// A2-05 · volet 1 · lot 3 : application de l'état E4 de la consolidation de T7 (autorisation du 2026-10-30 : « J'accepte E3 et j'autorise
// exclusivement l'application du plan de synchronisation E4 d57d97c1e89f746e. »). Dérivé de arbitrage-T6/synchronisation-38/
// appliquer-synchronisation-38.mjs. (1) Préconditions : 40 empreintes conformes, les 39 premières dans leur ordre et à leurs valeurs, périmètre
// accepté de T7 en 40e ; aperçu relancé sur le dépôt réel ; plan attendu ; aperçu identique, octet pour octet, à l'aperçu relu (Partie 5 de la
// note E3, 726eb5d7…) ; huit lignes +/- limitées aux deux blocs (marqueur 7a79b16e4641f93f → 32631bf599ee77a2 ; 39 → 40) ; index vide.
// (2) Sauvegarde d'ETAT-ACTUEL.md et de ROADMAP.md dans application-E4/depart/ (refus s'il existe). (3) Une seule application :
// sync-stable.mjs --appliquer --plan d57d97c1e89f746e. (4) Contrôles : seules les deux lignes prévues changent dans chaque document ; aperçu
// suivant vide ; blocs identiques ; manifeste, relais, recalculs, pilote, couverture, corrections, identifiants ; arbre de travail ; index vide ;
// git diff --check. Arrêt au premier écart, sans réparation.
// Usage : node a2-05-travail/arbitrage-T7/application-E4/appliquer-E4.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T7/application-E4/', APERCU = W + 'sync-stable-apercu.md';
const PLAN = 'd57d97c1e89f746e', APERCU_RELU = '726eb5d7d434ed1072f0d45882334654776075ef1d7c0300b70e5396ef88b6e0';
const AVANT = '7a79b16e4641f93f', APRES = '32631bf599ee77a2';
const DOCS = ['ETAT-ACTUEL.md', 'ROADMAP.md'];
const MAN = W + 'empreintes-rapports-arbitres.json', MAN_SHA = 'f5b5be5c3418ebd7f85973a3c43ea9f821c7081aee1685937b4dd62db8cb02d1';
const PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md', PER_SHA = 'a93a75cc4da86efeeea667aa357dcd457ac7583311d7fad6ce3a0a68f4cf77dc';
const K39 = '4b46ca6736e6ba5256098a0bf6aba5d690f221ea631715f2931aa42b69eacf1f';
const log = []; const dire = (l) => { console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'application.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
process.on('uncaughtException', (e) => { dire('EXCEPTION ' + String(e?.message ?? e).slice(0, 200)); ok(false, 'interruption'); });
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const sha = (p) => shaB(readFileSync(join(root, p)));
const lire = (p) => readFileSync(join(root, p), 'utf8');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const conformes = (r) => r.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ' + e.slice(0, 260)); };
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
// Lignes +/- des diffs, en-têtes « --- a/ » et « +++ b/ » exclus (une puce supprimée commence par « -- »)
const lignesPM = (t) => t.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));

dire('# Préconditions (aucune écriture dans les documents de pilotage)');
const initial = instantane();
const m = JSON.parse(lire(MAN)); const c = Object.keys(m.empreintes);
ok(sha(MAN) === MAN_SHA, 'manifeste à son empreinte après E3', MAN_SHA);
const emp0 = lancer(W + 'empreintes-lot3.mjs'); ok(emp0.code === 0 && emp0.out === 'empreintes : 40 rapports contrôlés, identiques', 'manifeste : 40 empreintes conformes', emp0.out);
ok(c.length === 40 && shaB(c.slice(0, 39).join('\n')) === K39, 'les 39 premières entrées dans leur ordre (liste fixée par son empreinte), valeurs recalculées conformes', K39.slice(0, 12) + '…');
ok(c[39] === PER && m.empreintes[PER] === PER_SHA && sha(PER) === PER_SHA, 'périmètre accepté de T7 en 40e position, à son empreinte', PER_SHA.slice(0, 12) + '…');
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); dire('   sync-stable.mjs --apercu (code ' + ap0.code + ') : ' + ap0.out.split('\n').pop());
const texte0 = lire(APERCU); mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'apercu-avant-application.md'), texte0);
ok(ap0.code === 0 && (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] === PLAN, 'plan de l\'aperçu = ' + PLAN);
ok(shaB(texte0) === APERCU_RELU, 'aperçu identique, octet pour octet, à l\'aperçu relu (Partie 5 de la note E3)', shaB(texte0));
const L0 = lignesPM(texte0);
const attendu = DOCS.flatMap(() => [
  (l) => l.startsWith('-<!-- a2-05:etat:debut empreinte=' + AVANT + ' '), (l) => l.startsWith('+<!-- a2-05:etat:debut empreinte=' + APRES + ' '),
  (l) => l.startsWith('-- **Contrôles** : ') && l.includes('39 rapports arbitrés identiques'), (l) => l.startsWith('+- **Contrôles** : ') && l.includes('40 rapports arbitrés identiques')]);
ok(L0.length === 8 && L0.every((l, i) => attendu[i](l)), 'huit lignes +/- : marqueur ' + AVANT + ' → ' + APRES + ' et 39 → 40, dans chaque bloc', L0.length + ' lignes');
const moins = L0.filter((l) => l.startsWith('-')), plus = L0.filter((l) => l.startsWith('+'));
ok(moins.every((l, i) => l.slice(1).replace(AVANT, APRES).replace('39 rapports', '40 rapports') === plus[i].slice(1)), 'aucun autre caractère ne change dans ces lignes (autres chiffres inchangés)');
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && rel0.out.split('\n').pop() === '30 conformes sur 30', 'relais 30 sur 30 avant la synchronisation');
const t0 = Object.fromEntries(DOCS.map((p) => [p, lire(p)]));
ok(DOCS.every((p) => bloc(t0[p]).includes('empreinte=' + AVANT + ' ')) && bloc(t0[DOCS[0]]) === bloc(t0[DOCS[1]]), 'blocs actuels identiques, au marqueur ' + AVANT);
const idx0 = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx0.status === 0 && idx0.stdout.trim() === '', 'index vide avant l\'écriture');
const pre = instantane(); const ch0 = differents(initial, pre);
ok(ch0.every((p) => p === APERCU), 'aperçu relancé : aucun autre fichier modifié', ch0.join(', ') || 'aperçu réécrit à l\'identique');

dire('\n# Sauvegarde des originaux');
const DEP = OUT + 'depart/'; ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true });
for (const p of DOCS) { copyFileSync(join(root, p), join(root, DEP + p)); ok(sha(DEP + p) === pre[p], 'sauvegarde ' + DEP + p, pre[p].slice(0, 12) + '…'); }

dire('\n# Application (une seule fois)');
const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', PLAN); dire('   sync-stable.mjs --appliquer --plan ' + PLAN + ' (code ' + app.code + ') : ' + app.out);
ok(app.code === 0 && app.out === 'appliqué, plan ' + PLAN, 'synchronisation appliquée au plan ' + PLAN);

dire('\n# Contrôles après synchronisation');
const t1 = Object.fromEntries(DOCS.map((p) => [p, lire(p)]));
for (const p of DOCS) {
  const a = t0[p].split('\n'), b = t1[p].split('\n'); const ch = a.map((l, i) => (l !== b[i] ? i : -1)).filter((i) => i >= 0);
  ok(a.length === b.length && ch.length === 2 && b[ch[0]] === a[ch[0]].replace('empreinte=' + AVANT + ' ', 'empreinte=' + APRES + ' ') && b[ch[1]] === a[ch[1]].replace('39 rapports arbitrés identiques', '40 rapports arbitrés identiques'),
    p + ' : seules les deux lignes prévues changent (marqueur ; 39 → 40), fins de ligne conservées', 'lignes ' + ch.map((i) => i + 1).join(', ') + ' ; ' + sha(p).slice(0, 12) + '…');
}
ok(bloc(t1[DOCS[0]]) === bloc(t1[DOCS[1]]) && bloc(t1[DOCS[0]]).includes('empreinte=' + APRES + ' '), 'blocs générés identiques entre ETAT-ACTUEL.md et ROADMAP.md, au marqueur ' + APRES);
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); dire('   sync-stable.mjs --apercu (code ' + ap1.code + ') : ' + ap1.out.split('\n').pop());
const texte1 = lire(APERCU); writeFileSync(join(root, OUT, 'sorties', 'apercu-apres-application.md'), texte1);
ok(ap1.code === 0 && lignesPM(texte1).length === 0, 'aperçu suivant vide (aucune ligne +/-)', 'plan ' + (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] + ' ; empreinte de l\'aperçu ' + shaB(texte1).slice(0, 12) + '…');
const A = { emp: lancer(W + 'empreintes-lot3.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), rec7: lancer(W + 'recalcul-T7-perimetre.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), cbp: lancer(W + 'controle-bilan-pilote.mjs'), cov: lancer(W + 'couverture-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 40 rapports contrôlés, identiques' && sha(MAN) === MAN_SHA, 'manifeste : 40 empreintes conformes, inchangé');
ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, 'relais --apres-application : 30 sur 30');
ok(A.rec7.code === 0 && !ecarts(A.rec7).length && conformes(A.rec7) === 26, 'recalcul de T7 : 26/26', conformes(A.rec7) + ' lignes conformes');
ok(A.rec5.code === 0 && !ecarts(A.rec5).length && conformes(A.rec5) === 17, 'recalcul de T5 : 17/17', conformes(A.rec5) + ' lignes conformes');
ok(A.rec6.code === 0 && !ecarts(A.rec6).length && conformes(A.rec6) === 27, 'recalcul de T6 : 27/27', conformes(A.rec6) + ' lignes conformes');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length && conformes(A.cbp) === 46, 'contrôle du bilan du pilote : 46/46', conformes(A.cbp) + ' lignes conformes');
ok(A.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '296/377', 'couverture 296/377, 81 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 11) === '40', 'corrections 196 dans 172 ENTRY, aucune appliquée ; 40 rapports protégés');
const b1 = lire('docs/rapports/etape2-A2-05-bilan-volet2.md');
ok(q(A.rel, 5) === 'V1-24' && /^\| réservé \| V1-22 \|/m.test(b1) && /^\| réservé \| V1-23 \|/m.test(b1), 'V1-22 et V1-23 réservés ; V1-24 libre (prochain identifiant calculé)');
const apres = instantane(); const ch1 = differents(initial, apres);
ok(JSON.stringify(ch1) === JSON.stringify([...DOCS, APERCU].sort()), 'arbre de travail : seuls les deux documents de pilotage et l\'aperçu changent (zones protégées, normes, données, registre, manifeste inchangés)', ch1.join(', ') + ' ; ' + Object.keys(apres).length + ' fichiers comparés');
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\nsynchronisation E4 appliquée au plan ' + PLAN + ' : contrôles conformes');
fin(0);
