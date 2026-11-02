// A2-05 · volet 1 · lot 3 : préparation de l'état E3 de la consolidation de T7 (40e entrée du manifeste : le périmètre accepté de T7), sans
// application (consigne du 2026-10-30 : « Préparer, sans appliquer, l'ajout du périmètre accepté de T7 comme 40e entrée du manifeste »).
// (1) État de départ réel, sans écriture : E2 installé (recalcul adapté c8877283…), manifeste à 39 entrées (eb6599cb…). (2) Dans un clone git
// jetable (--shared, --no-checkout) recouvert de l'arbre de travail : ajout par l'outil réel (empreintes-lot3.mjs --ajouter, daté du jour) ;
// manifeste prévu : 40 entrées, les 39 précédentes inchangées en valeur et en ordre, 40e = périmètre accepté de T7 ; comparaison avec la
// simulation de la consolidation (seule la date peut différer) ; contrôles prévus après E3. (3) Sorties dans preparation-E3/ ; dépôt réel
// inchangé hors de ce dossier. Arrêt au premier écart ; chemins masqués.
// Usage : node a2-05-travail/arbitrage-T7/preparation-E3/preparer-E3.mjs <racine du dépôt>
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T7/preparation-E3/', APERCU = W + 'sync-stable-apercu.md';
const REC = W + 'recalcul-T7-perimetre.mjs', REC_SHA1 = 'c8877283e3864a7e9c9f542a08e74b189aef3c6f4b9e9bfc0abf01e7b75eb91c';
const MAN = W + 'empreintes-rapports-arbitres.json', MAN_SHA = 'eb6599cb5f1a01ec609f5481477853f4def1430c2d5b858c18d7fc00b0a806a2';
const SIMU = W + 'arbitrage-T7/consolidation/empreintes-rapports-arbitres-simule-E3.json', SIMU_SHA = '34ed709559232aefc1f2928e4a9d69aec3e9ff8b4b833f0e0d026140c1e39e51';
const PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md', PER_SHA = 'a93a75cc4da86efeeea667aa357dcd457ac7583311d7fad6ce3a0a68f4cf77dc';
const K39 = '4b46ca6736e6ba5256098a0bf6aba5d690f221ea631715f2931aa42b69eacf1f', MARQUEUR = '7a79b16e4641f93f';
const tmp = mkdtempSync(join(tmpdir(), 'ocha-preparation-e3-t7-')); const C = join(tmp, 'arbre');
const masquer = (l) => [[root, '<racine>'], [C, '<clone>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
const fin = (code) => { rmSync(tmp, { recursive: true, force: true }); mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'preparation.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart'); fin(1); } };
process.on('uncaughtException', (e) => { dire('EXCEPTION ' + masquer(String(e?.message ?? e)).slice(0, 200)); ok(false, 'interruption'); });
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const shaR = (base, p) => shaB(readFileSync(join(base, p)));
const lancer = (base, s, ...a) => { const r = spawnSync(process.execPath, [join(base, s), base, ...a], { cwd: base, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ' + e.slice(0, 260)); };
const conformes = (r) => r.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const gitDiff = (cwd, a, b) => spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', a, b], { cwd, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = shaR(root, p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const lignesPM = (t) => t.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
const initial = instantane();

dire('# Départ réel (aucune écriture)');
ok(shaR(root, REC) === REC_SHA1, 'E2 installé : recalcul de T7 adapté', REC_SHA1.slice(0, 12) + '…');
ok(shaR(root, MAN) === MAN_SHA, 'manifeste réel à 39 entrées, à son empreinte', MAN_SHA.slice(0, 12) + '…');
ok(shaR(root, PER) === PER_SHA, 'périmètre accepté de T7 à sa version acceptée', PER_SHA.slice(0, 12) + '…');
ok(shaR(root, SIMU) === SIMU_SHA, 'simulation E3 de la consolidation relue à son empreinte', SIMU_SHA.slice(0, 12) + '…');
const m0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const c0 = Object.keys(m0.empreintes);
ok(c0.length === 39 && shaB(c0.join('\n')) === K39 && !c0.includes(PER), '39 entrées dans leur ordre (liste fixée par son empreinte) ; périmètre de T7 absent', K39.slice(0, 12) + '…');

dire('\n# Clone jetable, ajout par l\'outil réel');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && shaR(C, MAN) === MAN_SHA && shaR(C, REC) === REC_SHA1, 'clone jetable recouvert de l\'arbre de travail (état E2)', 'code ' + cl.status);
const ap2 = lancer(C, W + 'sync-stable.mjs', '--apercu'); ok(ap2.code === 0 && lignesPM(readFileSync(join(C, APERCU), 'utf8')).length === 0, 'E2 dans le clone : aperçu vide', 'plan ' + (ap2.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]);
const aj = lancer(C, W + 'empreintes-lot3.mjs', '--ajouter');
ok(aj.code === 0 && aj.out === 'manifeste : 1 rapport(s) ajouté(s) : ' + PER, 'empreintes-lot3.mjs --ajouter : seul le périmètre accepté de T7', aj.out);
const brut = readFileSync(join(C, MAN), 'utf8'); const m1 = JSON.parse(brut); const c1 = Object.keys(m1.empreintes); const jour = m1.ajouts.at(-1).date;
ok(c1.length === 40 && c0.every((p, i) => c1[i] === p && m1.empreintes[p] === m0.empreintes[p]) && c1[39] === PER && m1.empreintes[PER] === PER_SHA, 'manifeste prévu : 40 entrées ; les 39 précédentes inchangées, en valeur et en ordre ; 40e = périmètre accepté de T7', PER_SHA.slice(0, 12) + '…');
ok(m1.ajouts.length === m0.ajouts.length + 1 && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1).chemins) === JSON.stringify([PER]) && jour >= m0.ajouts.at(-1).date, 'ajouts : historique inchangé ; un ajout nouveau, daté du jour de l\'opération', jour);
for (const k of ['genere_par', 'etabli_le', 'note']) ok(m1[k] === m0[k], 'champ « ' + k + ' » inchangé');
const simu = readFileSync(join(root, SIMU), 'utf8');
ok(brut === simu.replace('"date": "2026-10-29",\n   "chemins": [\n    "' + PER, '"date": "' + jour + '",\n   "chemins": [\n    "' + PER), 'manifeste prévu = simulation de la consolidation, à la date de l\'ajout près', jour === '2026-10-29' ? 'identique' : 'date ' + jour + ' au lieu de 2026-10-29 ; aucune autre différence');
const prevuSha = shaB(brut);
mkdirSync(join(root, OUT), { recursive: true }); writeFileSync(join(root, OUT, 'manifeste-prevu.json'), brut);
const dman = gitDiff(root, MAN, OUT + 'manifeste-prevu.json'); writeFileSync(join(root, OUT, 'manifeste-39-40.diff'), dman);
const pm = lignesPM(dman); ok(pm.filter((l) => l[0] === '-').length === 1 && pm.filter((l) => l[0] === '+').length === 8, 'diff du manifeste : +8 / -1 (virgule de la 39e entrée, 40e entrée, bloc d\'ajout)', shaB(dman).slice(0, 12) + '…');
writeFileSync(join(root, OUT, 'ordre-des-empreintes.md'), '# Ordre des empreintes du manifeste prévu après E3\n\n| n° | rapport | empreinte |\n|---|---|---|\n' + c1.map((p, i) => '| ' + (i + 1) + ' | `' + p + '` | `' + m1.empreintes[p] + '` |').join('\n') + '\n');

dire('\n# Contrôles prévus après E3 (dans le clone)');
const B = { rel: lancer(C, W + 'controle-relais-allege.mjs', '--apres-application'), emp: lancer(C, W + 'empreintes-lot3.mjs'), cov: lancer(C, W + 'couverture-lot3.mjs'), cbp: lancer(C, W + 'controle-bilan-pilote.mjs'), rec5: lancer(C, W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(C, W + 'recalcul-T6-perimetre.mjs'), rec7: lancer(C, REC) };
for (const [k, r] of Object.entries(B)) montrer('E3 ' + k, r);
ok(B.rel.code === 0 && B.rel.out.split('\n').pop() === '30 conformes sur 30', 'relais --apres-application : 30 sur 30 (C9a résolu)');
ok(B.emp.code === 0 && B.emp.out === 'empreintes : 40 rapports contrôlés, identiques', 'manifeste : 40 empreintes conformes ; aucun rapport arbitré hors du manifeste', B.emp.out);
ok(B.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(B.cov.out) && q(B.rel, 2) === '296/377', 'couverture 296/377, 81 restants');
ok(q(B.rel, 4) === '196/172/0' && q(B.rel, 5) === 'V1-24', 'corrections 196 dans 172 ENTRY, aucune appliquée ; V1-24 libre');
ok(B.cbp.code === 0 && !ecarts(B.cbp).length && conformes(B.cbp) === 46, 'contrôle du bilan du pilote : 46/46');
ok(B.rec5.code === 0 && !ecarts(B.rec5).length && conformes(B.rec5) === 17, 'recalcul de T5 : 17/17');
ok(B.rec6.code === 0 && !ecarts(B.rec6).length && conformes(B.rec6) === 27, 'recalcul de T6 : 27/27');
ok(B.rec7.code === 0 && !ecarts(B.rec7).length && conformes(B.rec7) === 26, 'recalcul de T7 adapté : 26/26 (40e entrée protégée)');
ok(B.rec7.out.includes('conforme manifeste : au moins 40 empreintes recalculées, toutes identiques ; les 39 premières entrées dans leur ordre ; périmètre accepté de T7 protégé (40e entrée) : 40 entrées ; 39 premières 4b46ca6736e6… ; périmètre de T7 : 40e entrée ; différentes : aucune'), 'contrôle du manifeste du recalcul de T7 : 40 entrées, 39 premières dans leur ordre, périmètre de T7 en 40e');
const ap3 = lancer(C, W + 'sync-stable.mjs', '--apercu'); const texte3 = readFileSync(join(C, APERCU), 'utf8'); writeFileSync(join(root, OUT, 'apercu-prevu-E3.md'), masquer(texte3));
const pm3 = lignesPM(texte3); const plan3 = (ap3.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
ok(ap3.code === 0 && pm3.length === 8 && pm3.every((l) => /^[-+]<!-- a2-05:etat:debut empreinte=[0-9a-f]{16} /.test(l) || /^[-+]- \*\*Contrôles\*\* : registre de couverture sans omission ni doublon ; manifeste d'empreintes, (39|40) rapports arbitrés identiques\.$/.test(l)) && pm3.filter((l) => l.startsWith('-<!--')).every((l) => l.includes(MARQUEUR)),
  'aperçu après E3 (non vide, prévu) : seuls le marqueur et la ligne « Contrôles » des deux blocs changent (39 → 40 rapports)', 'plan ' + plan3 + ' ; ' + pm3.length + ' lignes +/-');
const marq3 = (pm3.find((l) => l.startsWith('+<!--')) ?? '').match(/empreinte=([0-9a-f]{16})/)?.[1];
dire('   marqueur prévu après E4 : ' + marq3 + ' ; plan de synchronisation prévu : ' + plan3);

dire('\n# Dépôt réel');
const ch = differents(initial, instantane()); ok(!ch.length, 'dépôt réel inchangé hors de ' + OUT, ch.join(', ') || 'aucune modification');
dire('\nmanifeste prévu : ' + prevuSha + ' (valable pour un ajout daté du ' + jour + ' seulement)');
dire('préparation conforme');
fin(0);
