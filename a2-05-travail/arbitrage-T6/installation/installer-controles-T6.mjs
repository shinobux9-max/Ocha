// A2-05 · volet 1 · lot 3 : installation des trois contrôles adaptés à la 38e entrée (version finale relue), autorisée le 2026-10-28, sans ajout
// au manifeste. (1) Préconditions, avant toute écriture : empreintes intégrales des trois scripts en service et des trois propositions finales ;
// diffs réels identiques aux diffs relus (fichiers finale/diffs/*.en-service.diff et blocs du §2.1 de la note relue) ; 37 empreintes du
// manifeste ; intégrité du périmètre accepté de T6 et de sa proposition sauvegardée ; état de départ des contrôles. (2) Sauvegarde des versions
// de départ dans arbitrage-T6/installation/depart/ (refus s'il existe). (3) Remplacements successifs, chacun vérifié octet pour octet et par
// node --check. (4) État E2 : contrôles, relais, couverture, manifeste ; arbre de travail entier comparé à l'état de départ (seuls les trois
// contrôles changent) ; index vide ; git diff --check. Arrêt au premier écart, sans réparation. Le manifeste, le bloc d'état, l'inventaire,
// le journal, les rapports et les données ne sont pas écrits.
// Usage : node a2-05-travail/arbitrage-T6/installation/installer-controles-T6.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', FIN = W + 'arbitrage-T6/controles/finale/', OUT = W + 'arbitrage-T6/installation/';
const NOTE = W + 'note-export-lot3-T6-controles-finale.md', MAN = W + 'empreintes-rapports-arbitres.json';
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-', P6 = R + 'T6-perimetre.md', PROP6 = W + 'arbitrage-T6/proposition-T6-perimetre.md';
// Ordre des remplacements, empreintes intégrales de départ (en service, consignées le 2026-10-27) et d'arrivée (version finale relue)
const SCRIPTS = [
  ['controle-bilan-pilote.mjs', '3c24223897ed0dbf8a4e7400e60b36dd52c9eb2371656a18f8d984fa32cf8281', '5a4c6624e8d5c1564f04b7e141f7e55f3c4afe6a253c19608d99e086b84facf7'],
  ['recalcul-T5-perimetre.mjs', '7f23952def9aa2ac021b4fb527ffd2a8aa613e9ba8c8b0b4e15bd23e659f9849', '44b49ef9b65874abd6acd878ff51e2d2165a74b9e062436883fb51473be4f4cc'],
  ['recalcul-T6-perimetre.mjs', '0c4ea1d7fb3b38ae4032d59c7e1f88ca1f8bcd5302724cd30bdd91e7dbcf88a2', '614f6b64b71ea43f52bcca64b6cfe60fdb1e822e98b4143bb74967b49f1b2cd9'],
];
const log = []; const dire = (l) => { console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'installation.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.autocrlf=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const ecarts = (r) => r.out.split('\n').filter((l) => /^ÉCART/.test(l)).map((l) => l.replace(/^ÉCART\s+/, ''));
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ÉCART ' + e.slice(0, 260)); };
// Empreintes de tous les fichiers de l'arbre de travail, hors .git, node_modules, chatgpt-relecture, archives et dossier d'installation
const instantane = () => {
  const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
    if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
    if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h;
};

dire('# Préconditions (aucune écriture)');
for (const [n, dep, arr] of SCRIPTS) {
  ok(sha(W + n) === dep, n + ' en service : empreinte intégrale de départ', sha(W + n));
  ok(sha(FIN + n) === arr, n + ' proposition finale : empreinte intégrale', sha(FIN + n));
}
const note = readFileSync(join(root, NOTE), 'utf8').replace(/\r\n/g, '\n');
const blocs = [...note.matchAll(/````diff\n([\s\S]*?)\n````/g)].map((m) => m[1]);
for (const [n] of SCRIPTS) {
  const reel = git('diff', '--no-index', '--no-color', '--', W + n, FIN + n).stdout;
  const relu = readFileSync(join(root, FIN + 'diffs/' + n + '.en-service.diff'), 'utf8');
  const bloc = blocs.find((b) => b.startsWith('diff --git a/' + W + n + ' b/' + FIN + n + '\n'));
  ok(reel === relu, n + ' : diff réel identique octet pour octet au diff relu (' + FIN + 'diffs/' + n + '.en-service.diff)', reel.split('\n').length - 1 + ' lignes');
  ok(bloc !== undefined && bloc === reel.replace(/\n$/, ''), n + ' : diff réel identique au bloc du §2.1 de la note relue', bloc === undefined ? 'bloc absent' : 'identique');
}
const man = JSON.parse(readFileSync(join(root, MAN), 'utf8')).empreintes; const cles = Object.keys(man);
const diff37 = cles.filter((p) => !existsSync(join(root, p)) || sha(p) !== man[p]);
ok(cles.length === 37 && !diff37.length, 'manifeste : 37 empreintes recalculées, identiques', cles.length + ' entrées ; différentes : ' + (diff37.join(', ') || 'aucune'));
const emp0 = lancer(W + 'empreintes-lot3.mjs');
ok(emp0.code === 0 && emp0.out === 'empreintes : 37 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + P6, 'outil du manifeste (lecture seule)', emp0.out);
ok(!(P6 in man), 'périmètre accepté de T6 hors du manifeste', 'absent');
ok(sha(P6).startsWith('614b7503d324'), 'périmètre accepté de T6 : empreinte de la version acceptée (614b7503d324…)', sha(P6));
ok(sha(PROP6).startsWith('d0d4e113a85b'), 'proposition sauvegardée du périmètre de T6 (d0d4e113a85b…)', sha(PROP6));
const dep = { cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs') };
for (const [k, r] of Object.entries(dep)) montrer('départ ' + k, r);
ok(dep.cbp.code === 0 && dep.rec5.code === 0 && dep.rec6.code === 0, 'départ : les trois contrôles en service conformes à 37 empreintes');
const relDep = ecarts(dep.rel); ok(/29 conformes sur 30$/.test(dep.rel.out) && relDep.length === 1 && /^C9a\s/.test(relDep[0]), 'départ : relais 29 sur 30, C9a seul');
const initial = instantane();

dire('\n# Sauvegarde des versions de départ');
const DEP = OUT + 'depart/'; ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true });
for (const [n, h] of SCRIPTS) { copyFileSync(join(root, W + n), join(root, DEP + n)); ok(sha(DEP + n) === h, 'sauvegarde ' + DEP + n, h.slice(0, 12) + '…'); }

dire('\n# Remplacements successifs');
for (const [n, , arr] of SCRIPTS) {
  copyFileSync(join(root, FIN + n), join(root, W + n));
  ok(Buffer.compare(readFileSync(join(root, W + n)), readFileSync(join(root, FIN + n))) === 0 && sha(W + n) === arr, n + ' installé, identique octet pour octet à la proposition finale', arr.slice(0, 12) + '…');
  const c = spawnSync(process.execPath, ['--check', join(root, W + n)], { encoding: 'utf8' }); ok(c.status === 0, 'node --check ' + W + n, 'code ' + c.status + (c.stderr ? ' ; ' + c.stderr.trim() : ''));
}

dire('\n# État E2 (trois contrôles installés, 37 empreintes)');
const E2 = { cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs') };
for (const [k, r] of Object.entries(E2)) montrer('E2 ' + k, r);
const e = ecarts(E2.cbp);
ok(E2.cbp.code === 1 && e.length === 2 && e[0].startsWith('T6 : périmètre accepté protégé au manifeste, empreinte identique') && e[1].startsWith('manifeste : 38 empreintes recalculées, identiques') && !/^(Error|\w*Error):/m.test(E2.cbp.out),
  'contrôle du bilan du pilote : exactement les deux écarts attendus (T6 hors du manifeste ; 37 entrées au lieu de 38), sans exception', e.length + ' écart(s)');
const e6 = ecarts(E2.rec6);
ok(E2.rec6.code === 1 && e6.length === 1 && e6[0].startsWith('manifeste : 38 empreintes recalculées, identiques ; périmètre accepté de T6 protégé (38e entrée)'), 'recalcul de T6 : seule la 38e empreinte manquante', e6.length + ' écart(s)');
ok(E2.rec5.code === 0 && ecarts(E2.rec5).length === 0, 'recalcul de T5 conforme', E2.rec5.out.split('\n').pop());
const rel = ecarts(E2.rel); ok(/29 conformes sur 30$/.test(E2.rel.out) && rel.length === 1 && /^C9a\s/.test(rel[0]), 'relais 29 sur 30, C9a seul', E2.rel.out.split('\n').pop() + ' (code ' + E2.rel.code + ')');
ok(/Q4 Corrections retenues \/ ENTRY \/ appliquées → 196\/172\/0$/m.test(E2.rel.out) && /Q5 Prochain numéro libre → V1-24$/m.test(E2.rel.out) && /Q11 Combien de rapports arbitrés protégés \? → 37$/m.test(E2.rel.out),
  'relais : 196 corrections dans 172 ENTRY, aucune appliquée ; V1-24 libre ; 37 rapports protégés');
ok(E2.cov.code === 0 && /^couverture : 274 arbitrés, 0 proposés, 103 restants, sur 377 ; bloc B : 148\/148/.test(E2.cov.out), 'couverture 274/377, 103 restants', E2.cov.out.slice(0, 90));
ok(E2.emp.code === 0 && E2.emp.out === emp0.out, 'manifeste : 37 empreintes identiques, périmètre de T6 seul hors du manifeste', E2.emp.out);
const apres = instantane(); const attendus = SCRIPTS.map(([n]) => W + n).sort();
const changes = [...new Set([...Object.keys(initial), ...Object.keys(apres)])].filter((p) => initial[p] !== apres[p]).sort();
ok(JSON.stringify(changes) === JSON.stringify(attendus), 'arbre de travail : seuls les trois contrôles diffèrent de l\'état de départ (documents protégés, manifeste, inventaire, journal, données inchangés)', changes.join(', ') + ' ; ' + Object.keys(apres).length + ' fichiers comparés');
const idx = git('diff', '--cached', '--name-only'); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide', idx.stdout.trim() || 'vide');
const chk = git('diff', '--check'); ok(chk.status === 0, 'git diff --check', 'code ' + chk.status + (chk.stdout.trim() ? ' ; ' + chk.stdout.trim() : ''));
dire('\ninstallation conforme : état E2 atteint');
fin(0);
