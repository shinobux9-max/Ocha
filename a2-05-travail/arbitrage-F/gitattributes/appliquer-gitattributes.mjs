// A2-05 : pose du `.gitattributes` ciblé (autorisée le 2026-11-01), opération technique distincte. Écrit un seul fichier, `.gitattributes`, à la racine. Aucun `git add`, aucune renormalisation.
// Le contenu est le candidat relu, règles identiques ; seul le commentaire d'en-tête change, « non appliqué » devenant faux. Usage : node a2-05-travail/arbitrage-F/gitattributes/appliquer-gitattributes.mjs <racine du dépôt>
// (1) Préconditions, sans écriture. (2) Instantanés de git et de l'arbre. (3) Écriture du fichier. (4) Contrôles : fichiers suivis, blobs, fins de ligne et arbre inchangés, `.gitattributes` seul ajouté.
// Arrêt au premier écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-F/', A = F + 'gitattributes/', SOR = A + 'sorties/', CAND = F + 'diagnostic-eol/gitattributes-candidat-cible.txt', CIBLE = '.gitattributes', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md';
const CAND_SHA = '777b6f706911e99b1efae606e2543b73cb56fc0b5a0b7453e09781ebb0c0530a', MAN_SHA = '89716587f51f6359b567cf56b07437b69093d67583c3180268fc7467183e836e', PLAN = '4a677034b3b201bd';
const ENTETE = "# Fins de ligne : fige à la restauration les octets des zones contrôlées, quelle que soit la configuration du poste (A2-05 ; docs/rapports/etape2-A2-05-diagnostic-restauration-git.md).";
const ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
const RECS = [5, 6, 7, 8, 9].map((n) => ['recalcul de T' + n, W + 'recalcul-T' + n + '-perimetre.mjs']).concat([['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]);
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const trace = []; let ecrit = false;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 30 });
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop();
const L = (t) => t.split('\n').filter(Boolean);
const eolDe = () => L(git('ls-files', '--eol').stdout).map((l) => { const m = l.match(/^i\/(\S+)\s+w\/(\S+)\s+attr\/.*?\t(.+)$/); return m ? m[1] + ' ' + m[2] + ' ' + m[3] : l; });
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || (p + '/').startsWith(SOR)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const etat = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const apercu = () => { const r = lancer(W + 'sync-stable.mjs', '--apercu'); return { r, vide: r.code === 0 && !changees(readFileSync(join(root, APERCU), 'utf8')).length, plan: (r.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] }; };
const man = JSON.parse(readFileSync(join(root, MAN), 'utf8')).empreintes; const cles = Object.keys(man);

// (1) Préconditions
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, CIBLE)), 'P2 `.gitattributes` absent');
ok(!existsSync(join(root, SOR)), 'P2 bis opération non encore faite');
ok(shaF(CAND) === CAND_SHA, 'P3 candidat relu, empreinte complète', CAND_SHA);
const cand = readFileSync(join(root, CAND), 'utf8').split('\n'); const texte = [ENTETE, ...cand.slice(1)].join('\n'); const regles = cand.slice(1).filter(Boolean);
ok(cand[0].startsWith('# Candidat de diagnostic') && regles.length === 57 && regles.every((l) => /^\/\S+ (-text|text eol=crlf)$/.test(l)), 'P4 57 règles, toutes ancrées à la racine : 4 zones en -text, 53 lignes eol=crlf', regles.length + ' règles');
ok(!regles.some((l) => /^\* /.test(l)), 'P4 bis pas de règle globale');
const lignesCrlf = regles.filter((l) => l.endsWith('eol=crlf')).map((l) => l.slice(1).split(' ')[0]);
const style = (p) => { const b = readFileSync(join(root, p), 'utf8'); const c = (b.match(/\r\n/g) ?? []).length, l = (b.match(/\n/g) ?? []).length; return c && c === l ? 'CRLF' : c ? 'mixte' : 'LF'; };
const mq = lignesCrlf.filter((p) => !existsSync(join(root, p)) || style(p) !== 'CRLF'); ok(!mq.length, 'P5 chaque ligne eol=crlf vise un fichier présent, tout en CRLF', mq.join(', ') || lignesCrlf.length + ' fichiers');
const eol0 = eolDe(); const ZONES = /^(a2-05-travail|docs|reconstruction|data)\//;
const nonCouverts = eol0.filter((l) => /^lf crlf /.test(l)).map((l) => l.split(' ').slice(2).join(' ')).filter((p) => ZONES.test(p) && !lignesCrlf.includes(p));
ok(!nonCouverts.length, 'P6 tout fichier suivi des zones, stocké en LF et en CRLF au travail, a sa ligne', nonCouverts.join(', ') || 'aucun oublié');
const mixtes = eol0.filter((l) => / mixed /.test(l)); dire('constat  fichiers suivis mixtes : ' + mixtes.join(' | '));
ok(shaF(MAN) === MAN_SHA && cles.length === 45 && cles.every((p) => shaF(p) === man[p]), 'P7 manifeste : 45 empreintes conformes', MAN_SHA);
const ap0 = apercu(); ok(ap0.vide && ap0.plan === PLAN, 'P8 aperçu vide, plan attendu', fin(ap0.r));
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P9 relais de départ : 30 sur 30', fin(rel0));
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'P10 ' + n + ' conforme', fin(r)); }

// (2) Instantanés
dire('--- Instantanés');
const arbre = git('ls-tree', '-r', 'HEAD').stdout, indexS = git('ls-files', '-s').stdout, status0 = git('status', '--porcelain').stdout, numstat0 = git('diff', '--numstat').stdout, arbre0 = instantane();
mkdirSync(join(root, SOR), { recursive: true });
writeFileSync(join(root, SOR, 'avant-status.txt'), status0); writeFileSync(join(root, SOR, 'avant-eol.txt'), eol0.join('\n') + '\n');
dire('instantanés : arbre HEAD ' + sha(arbre).slice(0, 12) + '… ; index ' + sha(indexS).slice(0, 12) + '… ; ' + L(status0).length + ' lignes de statut ; ' + Object.keys(arbre0).length + ' fichiers');

// (3) Écriture
dire('--- Écriture');
ecrit = true; writeFileSync(join(root, CIBLE), texte); ok(sha(Buffer.from(texte, 'utf8')) === shaF(CIBLE), 'écrit : `.gitattributes`', shaF(CIBLE));

// (4) Contrôles
dire('--- Contrôles après la pose');
const lu = readFileSync(join(root, CIBLE), 'utf8').split('\n'); ok(JSON.stringify(lu.slice(1)) === JSON.stringify(cand.slice(1)) && lu[0] === ENTETE, 'C1 règles identiques au candidat relu ; seul le commentaire d\'en-tête diffère');
ok(git('ls-tree', '-r', 'HEAD').stdout === arbre, 'C2 arbre de HEAD inchangé');
ok(git('ls-files', '-s').stdout === indexS, 'C3 index inchangé : blobs et chemins identiques, aucune renormalisation');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C4 index vide');
const st1 = git('status', '--porcelain').stdout; const stAttendu = L(status0).concat('?? .gitattributes').sort().join('\n'), stObtenu = L(st1).sort().join('\n');
ok(stObtenu === stAttendu, 'C5 statut git : `.gitattributes` seul ajouté', L(st1).length + ' lignes');
ok(git('diff', '--numstat').stdout === numstat0, 'C6 différences des fichiers suivis inchangées');
const eol1 = eolDe(); writeFileSync(join(root, SOR, 'apres-status.txt'), st1); writeFileSync(join(root, SOR, 'apres-eol.txt'), eol1.join('\n') + '\n');
ok(JSON.stringify(eol1) === JSON.stringify(eol0), 'C7 fins de ligne stockées et de travail inchangées, fichier par fichier', eol1.length + ' fichiers');
const a1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(a1)])].filter((p) => arbre0[p] !== a1[p]).sort();
ok(JSON.stringify(mod) === JSON.stringify([CIBLE]), 'C8 arbre entier comparé : `.gitattributes` seul ajouté, aucun fichier modifié', Object.keys(a1).length + ' fichiers');
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C9 manifeste : 45 empreintes conformes', emp.out.slice(0, 80));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C10 relais : 30 sur 30', fin(rel));
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'C11 ' + n, fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out), 'C12 couverture : 360/377, 17 restants', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C13 204 corrections dans 177 ENTRY ; V1-22 et V1-23 réservés ; V1-32 libre', etat());
const ap1 = apercu(); ok(ap1.vide && ap1.plan === PLAN, 'C14 aperçu vide, plan inchangé', fin(ap1.r));
const asm = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), 'assemble'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0, 'C15 assemblage réel', 'code ' + asm.status);
const ver = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), 'verify'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(ver.status === 0, 'C16 sources conformes au manifeste', 'code ' + ver.status);
const dc = git('diff', '--check'); ok(dc.status === 0, 'C17 git diff --check', 'code ' + dc.status);
ok(!existsSync(join(root, 'docs/conception/addendum-A10-interrogatif.md')), 'C18 aucun addendum A10 installé');
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n`.gitattributes` conforme\n');
console.log('`.gitattributes` conforme');
process.exit(0);
