// A2-05 : moteur commun des applications ciblées de diffs relus (révision 4 d'E5, clôture de T9). Aucun effet à l'import.
// (1) Préconditions, sans écriture : index vide ; sauvegarde absente ; 45 empreintes ; fins de ligne ; ancres uniques ; ajouts absents ; aperçu vide au plan attendu ; relais 30 sur 30 ;
// recalculs de T5 à T9 et pilote conformes ; empreintes de départ, versions approuvées et diffs relus ; diffs régénérés identiques. (2) Originaux sauvegardés. (3) Hunks appliqués par
// remplacements ciblés ; résultat de tous les fichiers égal aux versions relues, calculé avant d'en écrire un seul. (4) Contrôles communs et propres à l'opération.
// Arrêt au premier écart, avant ou après écriture ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const W = 'a2-05-travail/', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', MAN_SHA = '89716587f51f6359b567cf56b07437b69093d67583c3180268fc7467183e836e';
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
const RECS = [5, 6, 7, 8, 9].map((n) => ['recalcul de T' + n, W + 'recalcul-T' + n + '-perimetre.mjs']).concat([['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]);
const nom = (p) => p.split('/').pop();

// Diff de deux fichiers hors du dépôt : depuis le `.gitattributes`, les deux chemins relèvent d'attributs différents, et `git diff --no-index` y comparerait des fins de ligne converties
export function diffBrut(root, a, b) {
  const t = mkdtempSync(join(tmpdir(), 'ocha-diff-')); const n = nom(a); mkdirSync(join(t, 'avant')); mkdirSync(join(t, 'apres')); copyFileSync(join(root, a), join(t, 'avant', n)); copyFileSync(join(root, b), join(t, 'apres', n));
  const r = spawnSync('git', ['-c', 'core.autocrlf=true', 'diff', '--no-index', '--no-color', '--', 'avant/' + n, 'apres/' + n], { cwd: t, encoding: 'utf8', maxBuffer: 1 << 28 }); rmSync(t, { recursive: true, force: true }); return r;
}

// cfg : { root, A (dossier d'application), SRC (dossier des versions), D [[cible, nomVersion, départ, proposé, diff relu]], plan, planApres, avant(u), apres(u, ctx), fin (texte final) }
export function appliquer(cfg) {
  const { root, A, SRC, D, plan, planApres } = cfg; const DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
  const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
  const lire = (p) => readFileSync(join(root, p), 'utf8');
  const trace = []; let ecrit = false;
  const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
  const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture des documents')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };
  const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
  const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  const fin = (r) => r.out.split('\n').pop();
  const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
  const apercu = () => { const r = lancer(W + 'sync-stable.mjs', '--apercu'); return { r, vide: r.code === 0 && !changees(lire(APERCU)).length, plan: (r.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] }; };
  const etat = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();
  const restantsF = () => spawnSync(process.execPath, ['--input-type=module', '-e', "import {couverture} from './a2-05-travail/couverture-lot3.mjs'; const s=couverture('.').sens.filter((x)=>x.etat!=='arbitré'); console.log(s.length, [...new Set(s.map((x)=>x.livraison))].sort().join())"], { cwd: root, encoding: 'utf8' }).stdout.trim();
  const pasAppliquees = () => { const v = JSON.parse(lire('data/n5/vocab.json')); const e = (id) => v.find((x) => x.id === id); const fns = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse]; return JSON.stringify(e('v_348').senses[1].meaning.alternatives) === '["Auparavant"]' && !fns(e('v_285').senses[0]).length && !fns(e('v_704').senses[1]).length && JSON.stringify(e('v_594').tags) === '["lieu_konbini","lieu_restaurant"]' && ['v_91', 'v_92', 'v_459'].every((id) => JSON.stringify(e(id).tags) === '["lieu_restaurant"]') && JSON.stringify(e('v_427').senses[0].meaning.alternatives) === '["Pas bon"]'; };
  const style = (b) => { const crlf = (b.match(/\r\n/g) ?? []).length, lf = (b.match(/\n/g) ?? []).length; return crlf === lf ? 'CRLF' : crlf === 0 ? 'LF' : 'mixte'; };
  const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\') || l === '') continue; if (l[0] === ' ') { h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
  const LFs = (t) => t.replace(/\r\n/g, '\n');
  const appliquerHunks = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) { if (!a) throw new Error('hunk sans ancre'); if (t.split(a).length !== 2) throw new Error('ancre non unique'); t = t.replace(a, () => b); } return crlf ? t.replace(/\n/g, '\r\n') : t; };
  const corps = (d) => d.slice(d.indexOf('@@'));
  const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
  const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();
  const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);
  const u = { ok, lire, lancer, fin, changees, shaF, LFs };

  dire('--- Préconditions');
  ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
  ok(!existsSync(join(root, DEP)), 'P2 sauvegarde absente');
  ok(shaF(MAN) === MAN_SHA && cles.length === 45 && cles.every((p) => shaF(p) === man[p]), 'P3 manifeste : 45 empreintes conformes', MAN_SHA);
  const H = {};
  for (const [p, v] of D) {
    const s = style(lire(p));
    ok(s !== 'mixte' && s === style(lire(SRC + v)), 'P4 fins de ligne homogènes et égales à celles de la version approuvée : ' + nom(p), s);
    H[p] = hunks(readFileSync(join(root, SRC + cfg.diffDe(p)), 'utf8'));
    const t = LFs(lire(p)); ok(H[p].length > 0 && H[p].every(({ a, b }) => a && t.split(a).length === 2 && t.split(b).length === 1), 'P5 ancres uniques, ajouts absents du texte : ' + nom(p), H[p].length + ' hunk(s)');
  }
  const N = cfg.N ?? []; // fichiers nouveaux : [[cible, source relue, empreinte]]
  for (const [p, s, h] of N) { ok(!existsSync(join(root, p)), 'P6 fichier nouveau absent : ' + nom(p)); ok(shaF(SRC + s) === h, 'P10 fichier nouveau, version approuvée : ' + nom(p), h); }
  cfg.avant(u);
  const ap0 = apercu(); ok(ap0.vide && ap0.plan === plan, 'P7 aperçu de synchronisation vide, plan attendu', fin(ap0.r));
  const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P8 relais de départ : 30 sur 30', fin(rel0));
  for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'P8 bis ' + n + ' conforme', 'code ' + r.code + ' ; ' + fin(r)); }
  for (const [p, v, d, pr, h] of D) {
    ok(shaF(p) === d, 'P9 empreinte de départ : ' + p, shaF(p));
    ok(shaF(SRC + v) === pr, 'P10 version approuvée : ' + nom(p), shaF(SRC + v));
    const r = diffBrut(root, p, SRC + v);
    ok(r.status === 1 && sha(r.stdout) === h && shaF(SRC + cfg.diffDe(p)) === h, 'P11 diff relu et diff régénéré identiques, octet pour octet : ' + nom(p), h);
  }
  const avant = Object.fromEntries(D.map(([p]) => [p, lire(p)]));
  const blocs0 = ['ETAT-ACTUEL.md', 'ROADMAP.md'].map((p) => lire(p).match(/<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/)[0]);
  const arbre0 = instantane();

  dire('--- Sauvegarde et application');
  for (const [p] of D) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'original sauvegardé : ' + nom(p), shaF(p)); }
  const sorties = {}; for (const [p, , , pr] of D) { const t = appliquerHunks(avant[p], H[p]); sorties[p] = t; ok(sha(Buffer.from(t, 'utf8')) === pr, 'résultat des hunks = version approuvée : ' + nom(p), pr); }
  ecrit = true;
  for (const [p] of D) { writeFileSync(join(root, p), sorties[p]); ok(true, 'écrit : ' + p); }
  for (const [p, s, h] of N) { copyFileSync(join(root, SRC + s), join(root, p)); ok(shaF(p) === h, 'écrit, nouveau : ' + p, h); }

  dire('--- Contrôles après application');
  mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
  for (const [p, v, , pr, h] of D) {
    ok(shaF(p) === pr && Buffer.compare(readFileSync(join(root, p)), readFileSync(join(root, SRC + v))) === 0 && style(lire(p)) === style(avant[p]), 'C1 document égal à la version approuvée, octet pour octet ; fins de ligne préservées : ' + nom(p), style(lire(p)));
    const r = diffBrut(root, DEP + p, p); writeFileSync(join(root, REELS, nom(p) + '.diff'), r.stdout);
    const relu = readFileSync(join(root, SRC + cfg.diffDe(p)), 'utf8');
    ok(r.status === 1 && sha(relu) === h && corps(r.stdout) === corps(relu), 'C2 diff réel identique au diff relu, octet pour octet à partir du premier @@ : ' + nom(p));
  }
  cfg.apres(u, { avant, REELS });
  ok(['ETAT-ACTUEL.md', 'ROADMAP.md'].every((p, i) => lire(p).match(/<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/)[0] === blocs0[i] && blocs0[i].includes('empreinte=fe4967cf00896f07')), 'C6 blocs a2-05:etat intacts, marqueur fe4967cf00896f07');
  const ap1 = apercu(); ok(ap1.vide && ap1.plan === planApres, 'C7 aperçu suivant vide, sans nouvelle synchronisation', fin(ap1.r));
  const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C8 manifeste : 45 empreintes conformes', emp.out.slice(0, 80));
  const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C9 relais : 30 sur 30', fin(rel));
  for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'C10 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
  const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out) && restantsF() === '17 F1,F2', 'C11 couverture : 360/377, 17 restants, tous dans le bloc F', cov.out.slice(0, 70));
  ok(etat() === ETAT_ATTENDU, 'C12 204 corrections dans 177 ENTRY ; V1-22 et V1-23 réservés ; V1-32 libre', etat());
  ok(pasAppliquees(), 'C13 aucune correction appliquée : V1-25 à V1-31 aux valeurs « avant » ; `v_427_s1` publie toujours « Pas bon »');
  const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort();
  ok(JSON.stringify(mod) === JSON.stringify([...D, ...N].map(([p]) => p).sort()) && !zones(), 'C14 arbre entier comparé : fichiers visés seuls modifiés ; documents protégés, normes, données, journal, lots et registre intacts', Object.keys(arbre1).length + ' fichiers ; zones git sans modification');
  ok(!existsSync(join(root, 'docs/conception/addendum-A10-interrogatif.md')), 'C15 aucun addendum A10 installé');
  ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C16 index vide');
  const dc = git('diff', '--check'); ok(dc.status === 0, 'C17 git diff --check', 'code ' + dc.status);
  writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n' + cfg.fin + '\n');
  console.log(cfg.fin);
  process.exit(0);
}
