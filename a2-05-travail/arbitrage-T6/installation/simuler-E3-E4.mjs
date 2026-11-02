// A2-05 · volet 1 · lot 3 : simulation des états E3 et E4 avec les trois contrôles installés le 2026-10-28, sur copie, sans écriture sur le
// dépôt réel. Dans un clone git jetable (--shared, --no-checkout) recouvert de l'arbre de travail : témoin sain E2 (état réel reproduit) ;
// E3, ajout simulé du seul périmètre accepté de T6 par l'outil réel (empreintes-lot3.mjs --ajouter), puis second ajout refusé sans
// modification ; E4, synchronisation simulée du bloc d'état par l'outil réel (sync-stable.mjs --appliquer, plan de l'aperçu d'E3), seules les
// lignes des blocs a2-05:etat changent ; témoin sain final. À chaque état : relais, couverture, manifeste, contrôle du bilan du pilote, recalculs
// de T5 et de T6, aperçu. Le dépôt réel est comparé fichier par fichier avant et après ; seuls l'aperçu d'E3 et les diffs E2 → E4 sont écrits,
// dans arbitrage-T6/installation/sorties/. Code 1 au premier écart.
// Usage : node a2-05-travail/arbitrage-T6/installation/simuler-E3-E4.mjs <racine du dépôt>
import { readFileSync, writeFileSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T6/installation/', MAN = W + 'empreintes-rapports-arbitres.json';
const CBP = W + 'controle-bilan-pilote.mjs', REC5 = W + 'recalcul-T5-perimetre.mjs', REC6 = W + 'recalcul-T6-perimetre.mjs';
const P6 = 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md';
const INSTALLES = { [CBP]: '5a4c6624e8d5c1564f04b7e141f7e55f3c4afe6a253c19608d99e086b84facf7', [REC5]: '44b49ef9b65874abd6acd878ff51e2d2165a74b9e062436883fb51473be4f4cc', [REC6]: '614f6b64b71ea43f52bcca64b6cfe60fdb1e822e98b4143bb74967b49f1b2cd9' };
const PLAN_RELU = 'd69f8b1a134f37c2';
const shaR = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
const ok = (c, quoi, detail) => { console.log((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { console.log('\narrêt au premier écart'); process.exit(1); } };
const constat = (quoi, detail) => console.log('constat  ' + quoi + ' : ' + detail);
const instantane = () => {
  const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
    if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
    if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = shaR(p); } }; marcher(''); return h;
};
for (const [p, h] of Object.entries(INSTALLES)) ok(shaR(p) === h, p + ' : contrôle installé', h.slice(0, 12) + '…');
const reel0 = instantane();

const tmp = mkdtempSync(join(tmpdir(), 'ocha-installation-t6-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const masquer = (t) => t.split(C).join('<clone>').split(C.replace(/\\/g, '/')).join('<clone>');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: masquer(((r.stdout ?? '') + (r.stderr ?? '')).trim()) }; };
const lireC = (p) => readFileSync(join(C, p), 'utf8');
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^ÉCART/.test(l)).map((l) => l.replace(/^ÉCART\s+/, ''));
const etape = (nom) => {
  const r = { rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(CBP), rec5: lancer(REC5), rec6: lancer(REC6), ap: lancer(W + 'sync-stable.mjs', '--apercu') };
  r.apercu = lireC(W + 'sync-stable-apercu.md'); r.hunks = (r.apercu.match(/^@@/gm) ?? []).length; r.plan = (r.ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) {
    console.log('   ' + nom + ' ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop());
    for (const e of ecartsDe(v)) console.log('      ÉCART ' + e.slice(0, 260));
  }
  r.exc = /^(Error|\w*Error):/m.test(r.cbp.out); if (r.exc) console.log('      exception dans le contrôle du bilan du pilote');
  r.q = (n) => (r.rel.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
  return r;
};
const relais = (r, n, ec) => r.rel.out.split('\n').pop() === n + ' conformes sur 30' && JSON.stringify(ecartsDe(r.rel).map((l) => l.split(/\s/)[0])) === JSON.stringify(ec);
const cov = (r) => r.cov.code === 0 && /^couverture : 274 arbitrés, 0 proposés, 103 restants, sur 377 ; bloc B : 148\/148/.test(r.cov.out);
const corr = (r, nRap) => r.q(4) === '196/172/0' && r.q(5) === 'V1-24' && r.q(11) === String(nRap) && r.q(2) === '274/377';
// Lignes d'un document hors des blocs a2-05:etat (marqueurs exclus)
const horsBlocs = (t) => { const o = []; let dans = false; for (const l of t.split('\n')) { if (/^<!-- a2-05:etat:debut/.test(l)) { dans = true; continue; } if (/^<!-- a2-05:etat:fin/.test(l)) { dans = false; continue; } if (!dans) o.push(l); } return o.join('\n'); };

console.log('\n# Témoin sain E2 (état réel reproduit dans le clone)');
const man0 = JSON.parse(lireC(MAN)).empreintes;
const E2 = etape('E2');
ok(E2.cbp.code === 1 && !E2.exc && JSON.stringify(ecartsDe(E2.cbp).map((e) => e.split(' : ')[0])) === JSON.stringify(['T6', 'manifeste']) && E2.rec5.code === 0 && E2.rec6.code === 1 && ecartsDe(E2.rec6).length === 1 && relais(E2, 29, ['C9a']) && cov(E2) && corr(E2, 37) && E2.emp.code === 0 && E2.hunks === 0,
  'E2 : contrôle du bilan du pilote, les deux écarts attendus ; recalcul de T5 conforme ; recalcul de T6, la seule 38e empreinte ; relais 29 sur 30 (C9a) ; 274/377 ; 196/172/0, V1-24 ; 37 rapports ; aperçu vide');

console.log('\n# E3 : ajout simulé du seul périmètre accepté de T6 (38e entrée)');
const docsE2 = { [ETAT]: lireC(ETAT), [ROAD]: lireC(ROAD) };
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); const m3 = JSON.parse(lireC(MAN)); const cles = Object.keys(m3.empreintes);
ok(aj.code === 0 && cles.length === 38 && cles[37] === P6 && m3.empreintes[P6] === shaR(P6) && JSON.stringify(cles.slice(0, 37)) === JSON.stringify(Object.keys(man0)) && Object.entries(man0).every(([p, h]) => m3.empreintes[p] === h),
  'ajout par l\'outil réel : 38 entrées, 38e = périmètre accepté de T6 (empreinte du fichier réel), les 37 précédentes inchangées et dans le même ordre', aj.out);
const manE3 = lireC(MAN); const aj2 = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
ok(aj2.code !== 0 && lireC(MAN) === manE3, 'second ajout refusé, manifeste inchangé', 'code ' + aj2.code + ' ; ' + aj2.out.split('\n').find((l) => /Error/.test(l)));
const E3 = etape('E3');
ok(E3.cbp.code === 0 && !E3.exc && E3.rec5.code === 0 && E3.rec6.code === 0 && E3.emp.code === 0 && E3.emp.out === 'empreintes : 38 rapports contrôlés, identiques' && relais(E3, 30, []) && cov(E3) && corr(E3, 38) && E3.hunks > 0,
  'E3 : contrôle du bilan du pilote, recalculs de T5 et de T6 conformes ; 38 empreintes identiques ; relais 30 sur 30 ; 274/377 ; 196/172/0, V1-24 ; aperçu non vide (bloc d\'état resté à 37)', 'plan ' + E3.plan + ' ; ' + E3.hunks + ' hunk(s)');
const hors = E3.apercu.split('\n').filter((l) => /^[-+](?![-+])/.test(l) && !/^[-+](<!-- a2-05:etat|- \*\*Contrôles\*\*)/.test(l));
ok(hors.length === 0 && /38 rapports arbitrés identiques/.test(E3.apercu), 'aperçu d\'E3 : seuls le marqueur et la ligne « Contrôles » des blocs changent (37 → 38 rapports)', hors.length ? hors.length + ' autre(s) ligne(s)' : 'aucune autre ligne');
constat('plan d\'E3 comparé au plan relu ' + PLAN_RELU, E3.plan === PLAN_RELU ? 'identique' : 'différent : ' + E3.plan);

console.log('\n# E4 : synchronisation simulée du bloc d\'état (plan de l\'aperçu d\'E3)');
const sy = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', E3.plan ?? '');
const E4 = etape('E4');
ok(sy.code === 0 && E4.cbp.code === 0 && !E4.exc && E4.rec5.code === 0 && E4.rec6.code === 0 && E4.emp.code === 0 && E4.emp.out === 'empreintes : 38 rapports contrôlés, identiques' && relais(E4, 30, []) && cov(E4) && corr(E4, 38) && E4.hunks === 0,
  'E4 : synchronisation appliquée ; tous les contrôles conformes ; 38 empreintes identiques ; relais 30 sur 30 ; 274/377 ; 196/172/0, V1-24 ; aperçu vide', sy.out.split('\n').pop() + ' ; plan suivant ' + E4.plan);
ok(lireC(MAN) === manE3, 'E4 : manifeste inchangé depuis E3 (38 entrées)');
for (const p of [ETAT, ROAD]) {
  const t = lireC(p); ok(horsBlocs(t) === horsBlocs(docsE2[p]) && t !== docsE2[p] && /38 rapports arbitrés identiques/.test(t), 'E4, ' + p + ' : seules les lignes des blocs a2-05:etat changent, 38 rapports annoncés');
}
mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); mkdirSync(join(tmp, 'E2'), { recursive: true }); mkdirSync(join(tmp, 'E4'), { recursive: true });
writeFileSync(join(root, OUT, 'sorties', 'apercu-E3.md'), E3.apercu);
for (const p of [ETAT, ROAD]) {
  writeFileSync(join(tmp, 'E2', p), docsE2[p]); writeFileSync(join(tmp, 'E4', p), lireC(p));
  const d = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', 'E2/' + p, 'E4/' + p], { cwd: tmp, encoding: 'utf8' }).stdout;
  writeFileSync(join(root, OUT, 'sorties', 'E4-' + p + '.diff'), d);
  constat('diff E2 → E4 de ' + p + ' (sorties/E4-' + p + '.diff)', d.split('\n').filter((l) => /^[-+](?![-+])/.test(l)).length + ' ligne(s) +/-');
}

console.log('\n# Témoin sain final (E4)');
const T = etape('témoin');
ok(T.cbp.code === 0 && T.rec5.code === 0 && T.rec6.code === 0 && T.emp.code === 0 && relais(T, 30, []) && T.hunks === 0, 'témoin sain final : tous conformes, aperçu vide');
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(); const ch = [...new Set([...Object.keys(reel0), ...Object.keys(reel1)])].filter((p) => reel0[p] !== reel1[p]);
ok(ch.length === 0, 'dépôt réel inchangé par la simulation (arbre de travail entier, hors dossier d\'installation)', ch.join(', ') || Object.keys(reel1).length + ' fichiers identiques');
console.log('\nsimulation conforme : E3 et E4');
