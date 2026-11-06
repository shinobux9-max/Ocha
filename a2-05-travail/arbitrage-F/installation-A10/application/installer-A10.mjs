// A2-05 : installation d'A10, avec l'adaptation de C6, dans une seule opération. PRÉPARÉ, à ne lancer que sur autorisation distincte, jamais sans la date effective.
// Quatre écritures : `docs/conception/addendum-A10-interrogatif.md` (nouveau), `docs/conception/00-sommaire.md` (une ligne), `a2-05-travail/controle-relais-allege.mjs` (C6), `.gitattributes` (une ligne, option 2 arbitrée : A10 en `text eol=crlf`, comme A9). Rien d'autre.
// La date doit être celle du jour de l'installation : elle remplace `<DATE-D-ADOPTION>`, seule variable du texte relu. Moteur commun non utilisé : son C15 refuse A10 et son C9 exige 30 sur 30.
// C9b reste inchangé : son écart est attendu après l'installation, seul, et se lève au prochain commit. Arrêt au premier écart ; aucune réparation automatique ; n'indexe, ne committe et ne pousse rien.
// Usage : node a2-05-travail/arbitrage-F/installation-A10/application/installer-A10.mjs <racine du dépôt> <AAAA-MM-JJ>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt'); const date = process.argv[3];
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/installation-A10/', PR = OUT + 'proposition/', A = OUT + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/', VAR = '<DATE-D-ADOPTION>';
const CIBLE = 'docs/conception/addendum-A10-interrogatif.md', A9 = 'docs/conception/addendum-A9-fonctions-linguistiques.md', SOM = 'docs/conception/00-sommaire.md', REL = W + 'controle-relais-allege.mjs', GA = '.gitattributes', REGLE = '/' + CIBLE + ' text eol=crlf', REGLE_A9 = '/' + A9 + ' text eol=crlf', E5 = 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', APERCU = W + 'sync-stable-apercu.md', MAN = W + 'empreintes-rapports-arbitres.json';
const MAN_SHA = '89716587f51f6359b567cf56b07437b69093d67583c3180268fc7467183e836e', CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', TRACE_CONS = W + 'arbitrage-F/consignation-cloture-checkpoint/application/sorties/application.txt', ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
// [cible, version relue, diff relu, départ, proposé, empreinte du diff]
const D = [
  [SOM, '00-sommaire.md', '00-sommaire.md.diff', 'b640f360da8ea07edf455289d179c31da20d4aefc84e623d2029edcf707a991c', '2c9e2cfff2d7c5d175dcbc6cf99c853f771b993ef4e54ccd764be52b56b728fb', 'e2d7e8ea554d22fd38aca568a92ba4ba32cdc60fac4033489f586069c6ffa744'],
  [REL, 'controle-relais-allege.mjs', 'controle-relais-allege.mjs.diff', 'ab75091684e89226a6efece4b509b9666a8e770a23f57440449f6b869d8729a9', 'b91ed6ddf43ef7e2aabc52ad14725a7c8b6359f76fa5e26f473be4806b72a4dc', '47cbdf8d17c98755a4a63f58e148f8961781680c0f08413b74aebc1cf339f873'],
  [GA, 'gitattributes-propose.txt', 'gitattributes-propose.txt.diff', 'da81234cda245291b3c2f3976e15754127c8723752053f4fa4aa03a649de9773', '5710749f06c7aff2d451c24c2847ec48a96567cc13dda68045f2b0da918e3c02', '2c0aff227a83597dc5bfd2a0a0b63f646be438df32b24d703357c281eb7b635f'],
];
// Texte relu, partie I dont il dérive, proposition E5 dont celle-ci est extraite, diff de la partie I au texte relu
const GABARIT = '461589da8a09f67ad7cb625aaf2ced07ff801cdc5365564e4a092575ab1ec58b', PARTIE_I = 'c3bd780a439bbedb32e7135fc74fd23e3097c895ab58c3c81b031e563e63eeec', E5_SHA = '984125877445b370ce4a1fc2a96b6d32a1ac1564c207906118dde852d9e1468e', DIFF_A10 = '86814fa1190fd8c1416f8ca8ef5314706283449f84d7f3b0e43840354dd1d16f';
const PRESERVES = { 'CLAUDE.md': 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04', 'docs/relecture/reprise-A2-05.md': 'd0586d42795b00fb5360de4f91585e3ea65dc91355cf92e9e9faca28b2061344', [E5]: E5_SHA };

const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent'); const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ecrit = false; const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const fin = (r) => r.out.split('\n').pop();
const LFs = (t) => t.replace(/\r\n/g, '\n'); const style = (t) => { const c = (t.match(/\r\n/g) ?? []).length, l = (t.match(/\n/g) ?? []).length; return c === l ? 'CRLF' : c === 0 ? 'LF' : 'mixte'; };
const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\') || l === '') continue; if (l[0] === ' ') { h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
const poser = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) t = t.replace(a, () => b); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const corps = (d) => d.slice(d.indexOf('@@'));
const relais = (...o) => { const r = lancer(REL, '--apres-application', ...o); return { code: r.code, fin: fin(r), ids: r.out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
const apercu = () => { const r = lancer(W + 'sync-stable.mjs', '--apercu'); const vide = r.code === 0 && !lire(APERCU).split('\n').some((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); return { r, vide, plan: (r.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] }; };
const blocs = () => ['ETAT-ACTUEL.md', 'ROADMAP.md'].map((p) => lire(p).match(/<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/)[0]);
const addenda = () => readdirSync(join(root, 'docs/conception')).map((n) => n.match(/^addendum-a(\d+)/i)).filter(Boolean).map((m) => +m[1]).sort((x, y) => x - y).join();
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const RECS = [5, 6, 7, 8, 9].map((n) => ['recalcul de T' + n, W + 'recalcul-T' + n + '-perimetre.mjs']).concat([['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]);
// Copie de départ de `.gitattributes` sous un nom inerte : un fichier de ce nom agirait sur les sauvegardes de son dossier
const sauve = (p) => DEP + (p === GA ? 'gitattributes-depart.txt' : p);
const attr = (p) => git('check-attr', 'text', 'eol', '--', p).stdout.trim().split('\n').map((l) => l.split(': ').pop()).join();
const attributs = () => sha(spawnSync('git', ['-c', 'core.quotepath=false', 'check-attr', '--stdin', 'text', 'eol'], { cwd: root, input: git('ls-files').stdout, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout);
const etat = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();

dire('--- Date effective');
const j = new Date(); const aujourdhui = j.getFullYear() + '-' + String(j.getMonth() + 1).padStart(2, '0') + '-' + String(j.getDate()).padStart(2, '0');
ok(/^\d{4}-\d{2}-\d{2}$/.test(date ?? ''), 'D1 date au format AAAA-MM-JJ', date ?? 'absente');
const [an, mois, jour] = date.split('-').map(Number); const v = new Date(Date.UTC(an, mois - 1, jour));
ok(v.getUTCFullYear() === an && v.getUTCMonth() === mois - 1 && v.getUTCDate() === jour, 'D2 date réelle du calendrier', date);
ok(date === aujourdhui, 'D3 date égale au jour de l\'installation', date + ' ; horloge du poste : ' + aujourdhui);

dire('--- Préconditions de dépôt');
ok(git('merge-base', '--is-ancestor', CLOTURE, 'HEAD').status === 0, 'P1 HEAD descend du commit de clôture', CLOTURE.slice(0, 7));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P2 index vide');
ok(!existsSync(join(root, DEP)), 'P3 sauvegarde absente, opération jamais lancée');

dire('--- Unicité du numéro');
ok(addenda() === '1,2,3,4,5,6,7,8,9' && !existsSync(join(root, CIBLE)), 'U1 `docs/conception/` contient A1 à A9, aucun fichier A10 ni au-delà', addenda());
const emploi = git('grep', '-lE', '\\bA1[0-9]\\b', '--', 'tools', 'tests', 'docs/conception', 'data', 'reconstruction').stdout.trim(); ok(!emploi, 'U2 aucun numéro A10 à A19 dans `tools/`, `tests/`, `docs/conception/`, `data/`, `reconstruction/`', emploi || 'aucun');
const lignesA9 = LFs(lire(SOM)).split('\n').filter((l) => l.startsWith('| A9 |')); ok(lignesA9.length === 1 && !/\bA10\b/.test(lire(SOM)), 'U3 sommaire : ligne d\'A9 unique, A10 absent');
ok(!/addendum-a1\d/i.test(lire(GA)), 'U4 `.gitattributes` : aucune règle A10 ni au-delà');

dire('--- Texte exact');
ok(shaF(E5) === E5_SHA, 'T1 proposition E5, révision 4', E5_SHA);
ok(shaF(PR + 'partie-I-revision-4.md') === PARTIE_I, 'T2 partie I relue', PARTIE_I);
ok(shaF(PR + 'addendum-A10-interrogatif.md') === GABARIT, 'T3 texte relu d\'A10', GABARIT);
const dA = diffBrut(root, PR + 'partie-I-revision-4.md', PR + 'addendum-A10-interrogatif.md'); ok(dA.status === 1 && sha(dA.stdout) === DIFF_A10 && shaF(PR + 'diffs/addendum-A10-interrogatif.md.diff') === DIFF_A10, 'T4 diff de la partie I au texte relu, identique au diff relu', DIFF_A10);
const gabarit = lire(PR + 'addendum-A10-interrogatif.md'); ok(gabarit.split(VAR).length === 2 && style(gabarit) === style(lire('docs/conception/addendum-A9-fonctions-linguistiques.md')) && style(gabarit) !== 'mixte', 'T5 une seule variable, fins de ligne de A9', style(gabarit));
const texte = gabarit.replace(VAR, () => date); ok(texte.split(date).length === 2 && !texte.includes('<DATE') && texte.includes('**Statut** : 🔒 validé le ' + date + ' (préalable E5 d\'A2-05)'), 'T6 date posée une fois, dans le statut, aucune variable restante', date);
ok(!/[ \t]\r?$/m.test(texte), 'T7 aucun blanc en fin de ligne');

dire('--- Fichiers concernés');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'P4 préservé : ' + p, h.slice(0, 12) + '…');
ok((lire(BIL).match(/^### 8\.117 /gm) ?? []).length === 1 && existsSync(join(root, TRACE_CONS)) && /consignation de la clôture conforme\s*$/.test(lire(TRACE_CONS)), 'P5 consignation de la clôture appliquée, trace conforme');
ok(!zones(), 'P6 données, lots, journal, registres, tests, outils et normes sans modification');
const man = JSON.parse(lire(MAN)).empreintes; ok(shaF(MAN) === MAN_SHA && Object.keys(man).length === 45 && Object.entries(man).every(([p, h]) => shaF(p) === h), 'P7 manifeste : 45 empreintes conformes', MAN_SHA);
const sorties = {}; const H = {};
for (const [p, v2, d, dep, pr, h] of D) {
  ok(shaF(p) === dep, 'P8 empreinte de départ : ' + p, dep); ok(shaF(PR + v2) === pr, 'P9 version approuvée : ' + v2, pr);
  const r = diffBrut(root, p, PR + v2); ok(r.status === 1 && sha(r.stdout) === h && shaF(PR + 'diffs/' + d) === h, 'P10 diff relu et diff régénéré identiques, octet pour octet : ' + v2, h);
  const s = style(lire(p)); ok(s !== 'mixte' && s === style(lire(PR + v2)), 'P11 fins de ligne homogènes et égales à celles de la version approuvée : ' + v2, s);
  H[p] = hunks(lire(PR + 'diffs/' + d)); const t = LFs(lire(p)); ok(H[p].length > 0 && H[p].every(({ a, b }) => a && t.split(a).length === 2 && t.split(b).length === 1), 'P12 ancres uniques, ajouts absents du texte : ' + v2, H[p].length + ' hunk(s)');
  sorties[p] = poser(lire(p), H[p]); ok(sha(Buffer.from(sorties[p], 'utf8')) === pr, 'P13 résultat des hunks = version approuvée : ' + v2, pr);
}
const ap0 = apercu(); ok(ap0.vide, 'P14 aperçu de synchronisation vide', fin(ap0.r));
const rel0 = relais(); ok(rel0.code === 0 && rel0.fin === '30 conformes sur 30', 'P15 relais de départ : 30 sur 30', rel0.fin);
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'P16 ' + n + ' conforme', 'code ' + r.code); }
ok(attr(CIBLE) === 'unset,unspecified' && attr(A9) === 'set,crlf', 'P17 attributs de départ : A10 sous `/docs/** -text`, A9 en `text eol=crlf`', attr(CIBLE) + ' ; ' + attr(A9));
const attr0 = attributs(); const blocs0 = blocs(); const avant = Object.fromEntries(D.map(([p]) => [p, lire(p)])); const arbre0 = instantane();

dire('--- Sauvegarde et installation');
for (const [p] of D) { mkdirSync(dirname(join(root, sauve(p))), { recursive: true }); copyFileSync(join(root, p), join(root, sauve(p))); ok(shaF(sauve(p)) === shaF(p), 'original sauvegardé : ' + p, shaF(p)); }
ecrit = true;
writeFileSync(join(root, CIBLE), texte); ok(shaF(CIBLE) === sha(Buffer.from(texte, 'utf8')), 'écrit, nouveau : ' + CIBLE, shaF(CIBLE));
for (const [p] of D) { writeFileSync(join(root, p), sorties[p]); ok(true, 'écrit : ' + p); }

dire('--- Contrôles après installation');
mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
ok(sha(Buffer.from(lire(CIBLE).replace(date, () => VAR), 'utf8')) === GABARIT, 'C1 A10 égal au texte relu, à la seule date près', GABARIT);
for (const [p, v2, d, , pr] of D) { ok(shaF(p) === pr && style(lire(p)) === style(avant[p]), 'C2 fichier égal à la version approuvée ; fins de ligne préservées : ' + p, pr); const r = diffBrut(root, sauve(p), p); writeFileSync(join(root, REELS, v2 + '.diff'), r.stdout); ok(r.status === 1 && corps(r.stdout) === corps(lire(PR + 'diffs/' + d)), 'C3 diff réel identique au diff relu, à partir du premier @@ : ' + v2); }
const som = LFs(lire(SOM)).split('\n'); const iA9 = som.findIndex((l) => l.startsWith('| A9 |')); ok(som[iA9 + 1].startsWith('| A10 | `addendum-A10-interrogatif.md` |') && som.filter((l) => l.startsWith('| A10 |')).length === 1, 'C4 sommaire : A10 une fois, juste après A9');
ok(addenda() === '1,2,3,4,5,6,7,8,9,10', 'C5 `docs/conception/` contient exactement A1 à A10', addenda());
ok(blocs().every((b, i) => b === blocs0[i] && b.includes('empreinte=fe4967cf00896f07')), 'C6 blocs a2-05:etat intacts, marqueur fe4967cf00896f07');
const ap1 = apercu(); ok(ap1.vide && ap1.plan === ap0.plan, 'C7 aperçu vide, plan inchangé', fin(ap1.r));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C8 manifeste : 45 empreintes conformes', emp.out.slice(0, 80));
const rel = relais(); ok(rel.code === 1 && rel.fin === '29 conformes sur 30' && rel.ids === 'C9b', 'C9 relais : 29 sur 30, C9b seul, écart temporaire levé au prochain commit ; C6 conforme', rel.fin + ' ; écarts : ' + rel.ids);
const st = relais('--strict'); const attendu = git('rev-parse', 'HEAD').stdout.trim() === CLOTURE ? 'C9b' : 'C5a,C9b'; ok(st.ids === attendu, 'C9 bis relais --strict : écarts attendus seuls', st.fin + ' ; écarts : ' + st.ids);
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'C10 ' + n, 'code ' + r.code); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out), 'C11 couverture : 360/377, 17 restants', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C12 204 corrections dans 177 ENTRY, aucune appliquée ; V1-32 libre', etat());
for (const a of ['assemble', 'verify']) { const r = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'C13 run.mjs ' + a, 'code ' + r.status); }
const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (k) => ((t.stdout ?? '').match(new RegExp('^. ' + k + ' (\\d+)$', 'm')) ?? [])[1]; ok(t.status === 0 && n('tests') === '510' && n('pass') === '510', 'C14 510 tests', 'code ' + t.status + ' ; ' + n('pass') + ' sur ' + n('tests'));
const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort();
ok(JSON.stringify(mod) === JSON.stringify([CIBLE, ...D.map(([p]) => p)].sort()), 'C15 arbre entier comparé : les quatre fichiers visés seuls ; données, lots, journal, registres, outils et tests intacts', Object.keys(arbre1).length + ' fichiers');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'C16 préservé : ' + p);
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C17 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C18 git diff --check', 'code ' + dc.status);
const ga1 = LFs(lire(GA)).split('\n'); ok(ga1.filter((l) => l === REGLE).length === 1 && ga1.indexOf(REGLE) === ga1.indexOf(REGLE_A9) - 1, 'C19 `.gitattributes` : règle unique, juste avant celle d\'A9');
ok(attr(CIBLE) === 'set,crlf' && attr(A9) === 'set,crlf', 'C20 attributs d\'A10 : `text eol=crlf`, comme A9', attr(CIBLE));
ok(attributs() === attr0, 'C21 attributs de tous les fichiers suivis inchangés');
// `hash-object` sans `-w` juge ce que Git stockerait, sans index ni objet écrit : aucun CR ne doit entrer, c'est ce qui rend `git diff --check` propre au commit
const lf = Buffer.from(LFs(lire(CIBLE)), 'utf8'); const blob = createHash('sha1').update(Buffer.concat([Buffer.from('blob ' + lf.length + '\0'), lf])).digest('hex'); const stocke = git('hash-object', '--path=' + CIBLE, CIBLE).stdout.trim(); ok(stocke === blob, 'C22 A10 serait stocké en LF, sans CR, restauré en CRLF', stocke);
const FIN = 'installation d\'A10 conforme, date effective ' + date + ' ; relais à 29 sur 30, C9b seul, jusqu\'au prochain commit';
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n' + FIN + '\n'); console.log(FIN);
process.exit(0);
