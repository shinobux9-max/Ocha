// A2-05 · volet 1 · lot 3 : protection du périmètre accepté de T6 comme 38e entrée du manifeste, autorisée le 2026-10-28. (1) Préconditions,
// sans écriture : contrôles installés aux empreintes approuvées ; 37 empreintes conformes ; périmètre de T6 seul document accepté hors du
// manifeste, à son empreinte complète approuvée ; proposition sauvegardée inchangée ; prévisualisation de l'ajout (outil relu
// arbitrage-T5/application-protection/previsualiser-ajout.mjs, en mémoire, aperçu hors dépôt) : une seule entrée nouvelle. (2) Sauvegarde du
// manifeste et de l'aperçu de synchronisation de départ dans arbitrage-T6/protection-38/depart/ (refus s'il existe). (3) Ajout, une seule fois,
// par empreintes-lot3.mjs --ajouter ; manifeste écrit = prévisualisation, octet pour octet. (4) Vérifications après ajout ; arbre de travail
// comparé à l'état de départ (seul le manifeste change). (5) Aperçu de sync-stable.mjs sur le dépôt réel, non appliqué : plan attendu, seules
// les lignes du marqueur et « Contrôles » des deux blocs ; copie et empreinte de l'aperçu dans sorties/. Arrêt au premier écart, sans réparation.
// Usage : node a2-05-travail/arbitrage-T6/protection-38/ajouter-38e-T6.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T6/protection-38/', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md';
const P6 = 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md', PROP6 = W + 'arbitrage-T6/proposition-T6-perimetre.md', BILAN = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const SHA_P6 = '614b7503d32408028d853993430049a4faa65dcda5480e679754b3d4b5c11803', SHA_PROP6 = 'd0d4e113a85bb44e81532c7a951a7e74a27c60ea34deff2dcc53fd284e3a1ec4';
const PLAN = 'd69f8b1a134f37c2', PREVISU = W + 'arbitrage-T5/application-protection/previsualiser-ajout.mjs';
const INSTALLES = { [W + 'controle-bilan-pilote.mjs']: '5a4c6624e8d5c1564f04b7e141f7e55f3c4afe6a253c19608d99e086b84facf7', [W + 'recalcul-T5-perimetre.mjs']: '44b49ef9b65874abd6acd878ff51e2d2165a74b9e062436883fb51473be4f4cc', [W + 'recalcul-T6-perimetre.mjs']: '614f6b64b71ea43f52bcca64b6cfe60fdb1e822e98b4143bb74967b49f1b2cd9' };
const log = []; const dire = (l) => { console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'protection-38.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const sha = (p) => shaB(readFileSync(join(root, p)));
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^ÉCART/.test(l)).map((l) => l.replace(/^ÉCART\s+/, ''));
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ÉCART ' + e.slice(0, 260)); };
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
// Empreintes de l'arbre de travail, hors .git, node_modules, chatgpt-relecture, archives et dossier de l'opération
const instantane = () => {
  const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
    if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
    if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h;
};
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();

dire('# Préconditions (aucune écriture dans le dépôt)');
for (const [p, h] of Object.entries(INSTALLES)) ok(sha(p) === h, p + ' : empreinte approuvée', h.slice(0, 12) + '…');
const brut0 = readFileSync(join(root, MAN)); const man0 = JSON.parse(brut0.toString('utf8')).empreintes; const cles0 = Object.keys(man0);
const diff0 = cles0.filter((p) => !existsSync(join(root, p)) || sha(p) !== man0[p]);
ok(cles0.length === 37 && !diff0.length, 'manifeste : 37 empreintes recalculées, conformes', cles0.length + ' entrées ; différentes : ' + (diff0.join(', ') || 'aucune'));
const emp0 = lancer(W + 'empreintes-lot3.mjs');
ok(emp0.code === 0 && emp0.out === 'empreintes : 37 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + P6, 'périmètre de T6 seul document accepté hors du manifeste', emp0.out);
ok(sha(P6) === SHA_P6, 'périmètre accepté de T6 : empreinte complète approuvée', sha(P6));
ok(sha(PROP6) === SHA_PROP6, 'proposition sauvegardée du périmètre de T6 inchangée', sha(PROP6));
const tmp = mkdtempSync(join(tmpdir(), 'ocha-previsu-38-')); const fPrev = join(tmp, 'manifeste-previsualise.json');
const pv = spawnSync(process.execPath, [join(root, PREVISU), root, fPrev], { cwd: root, encoding: 'utf8' });
for (const l of ((pv.stdout ?? '') + (pv.stderr ?? '')).trim().split('\n')) dire('   prévisualisation : ' + l.split(fPrev).join('<aperçu hors dépôt>'));
const prevB = existsSync(fPrev) ? readFileSync(fPrev) : Buffer.alloc(0); const prev = prevB.length ? JSON.parse(prevB.toString('utf8')) : { empreintes: {} }; const clesP = Object.keys(prev.empreintes);
ok(pv.status === 0 && pv.stdout.includes('rapports arbitrés hors du manifeste : ' + JSON.stringify([P6])) && pv.stdout.includes('anomalies du manifeste existant : []') && pv.stdout.includes('anomalies après ajout simulé : []')
  && clesP.length === 38 && clesP[37] === P6 && prev.empreintes[P6] === SHA_P6 && JSON.stringify(clesP.slice(0, 37)) === JSON.stringify(cles0) && cles0.every((p) => prev.empreintes[p] === man0[p]),
  'prévisualisation : une seule entrée nouvelle (38e = périmètre de T6), 37 précédentes inchangées en valeur et en ordre, aucune anomalie', 'code ' + pv.status + ' ; aperçu ' + shaB(prevB).slice(0, 12) + '…');
const res0 = ['| réservé | V1-22 |', '| réservé | V1-23 |'].map((m) => readFileSync(join(root, BILAN), 'utf8').split('\n').filter((l) => l.startsWith(m)).length);
ok(res0[0] === 1 && res0[1] === 1, 'bilan, §8 : V1-22 et V1-23 réservés (une ligne chacun)');
const initial = instantane();

dire('\n# Sauvegarde de départ');
const DEP = OUT + 'depart/'; ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true });
copyFileSync(join(root, MAN), join(root, DEP + 'empreintes-rapports-arbitres.json')); ok(sha(DEP + 'empreintes-rapports-arbitres.json') === shaB(brut0), 'sauvegarde du manifeste de départ', shaB(brut0).slice(0, 12) + '…');
copyFileSync(join(root, APERCU), join(root, DEP + 'sync-stable-apercu.md')); ok(sha(DEP + 'sync-stable-apercu.md') === initial[APERCU], 'sauvegarde de l\'aperçu de synchronisation de départ', initial[APERCU].slice(0, 12) + '…');

dire('\n# Ajout (une seule fois)');
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); dire('   empreintes-lot3.mjs --ajouter (code ' + aj.code + ') : ' + aj.out);
const brut1 = readFileSync(join(root, MAN)); const man1 = JSON.parse(brut1.toString('utf8')).empreintes; const cles1 = Object.keys(man1);
ok(aj.code === 0 && aj.out === 'manifeste : 1 rapport(s) ajouté(s) : ' + P6, 'ajout exécuté : le seul périmètre de T6');
ok(Buffer.compare(brut1, prevB) === 0, 'manifeste écrit = prévisualisation, octet pour octet', shaB(brut1).slice(0, 12) + '…');
rmSync(tmp, { recursive: true, force: true });

dire('\n# Vérifications après ajout');
const diff1 = cles1.filter((p) => !existsSync(join(root, p)) || sha(p) !== man1[p]);
ok(cles1.length === 38 && !diff1.length && cles1[37] === P6 && JSON.stringify(cles1.slice(0, 37)) === JSON.stringify(cles0) && cles0.every((p) => man1[p] === man0[p]), '38 empreintes conformes ; les 37 précédentes inchangées en valeur et en ordre ; 38e = périmètre de T6', man1[P6].slice(0, 12) + '…');
const A = { cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 38 rapports contrôlés, identiques', 'outil du manifeste : 38 rapports identiques, aucun hors du manifeste');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length && !/^(Error|\w*Error):/m.test(A.cbp.out), 'contrôle du bilan du pilote entièrement conforme');
ok(A.rec5.code === 0 && !ecarts(A.rec5).length, 'recalcul de T5 entièrement conforme');
ok(A.rec6.code === 0 && !ecarts(A.rec6).length, 'recalcul de T6 entièrement conforme');
ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, 'relais --apres-application : 30 sur 30');
ok(A.cov.code === 0 && /^couverture : 274 arbitrés, 0 proposés, 103 restants, sur 377 ; bloc B : 148\/148/.test(A.cov.out) && q(A.rel, 2) === '274/377', 'couverture 274/377, 103 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 5) === 'V1-24' && q(A.rel, 11) === '38', 'relais : 196 corrections dans 172 ENTRY, aucune appliquée ; V1-24 libre ; 38 rapports protégés', q(A.rel, 4) + ' ; ' + q(A.rel, 5) + ' ; ' + q(A.rel, 11));
const res1 = ['| réservé | V1-22 |', '| réservé | V1-23 |'].map((m) => readFileSync(join(root, BILAN), 'utf8').split('\n').filter((l) => l.startsWith(m)).length);
ok(res1[0] === 1 && res1[1] === 1, 'V1-22 et V1-23 réservés ; V1-24 libre');
const apres = instantane(); const ch1 = differents(initial, apres);
ok(JSON.stringify(ch1) === JSON.stringify([MAN]), 'arbre de travail : seul le manifeste diffère (rapports protégés, normes, données publiées, documents de pilotage inchangés)', ch1.join(', ') + ' ; ' + Object.keys(apres).length + ' fichiers comparés');
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);

dire('\n# Aperçu de synchronisation (non appliqué)');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); dire('   sync-stable.mjs --apercu (code ' + ap.code + ') : ' + ap.out.split('\n').pop());
const texte = readFileSync(join(root, APERCU), 'utf8'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'apercu-38.md'), texte);
// Lignes +/- des diffs, en-têtes « --- a/ » et « +++ b/ » exclus (une puce supprimée commence par « -- »)
const lignes = texte.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l)); const hors = lignes.filter((l) => !/^[-+](<!-- a2-05:etat:debut empreinte=[0-9a-f]{16} |- \*\*Contrôles\*\* : )/.test(l));
ok(ap.code === 0 && plan === PLAN, 'plan de l\'aperçu = ' + PLAN, plan);
ok(hors.length === 0 && lignes.length === 8 && lignes.filter((l) => l.startsWith('+- **Contrôles**') && l.includes('38 rapports arbitrés identiques')).length === 2 && lignes.filter((l) => l.startsWith('-- **Contrôles**') && l.includes('37 rapports arbitrés identiques')).length === 2,
  'aperçu : seuls le marqueur généré et le passage de 37 à 38 empreintes, dans les deux blocs', lignes.length + ' lignes +/- ; autres : ' + hors.length);
dire('   aperçu conservé : ' + OUT + 'sorties/apercu-38.md ; empreinte ' + shaB(texte));
const final = instantane(); const ch2 = differents(initial, final);
ok(JSON.stringify(ch2) === JSON.stringify([APERCU, MAN].sort()), 'arbre de travail : seuls le manifeste et l\'aperçu de synchronisation diffèrent de l\'état de départ ; plan non appliqué', ch2.join(', '));
dire('\nprotection conforme : 38e entrée ajoutée ; aperçu présenté, non appliqué');
fin(0);
