// A2-05 · bloc F : essai, sur copie jetable, de l'application de la protection du rapport arbitré de F au manifeste d'empreintes ; jamais sur le dépôt réel.
// Refus avant écriture, exécution nominale, seconde exécution refusée ; puis, sur la copie appliquée : sabotages des protections (rapport F, périmètre
// opérationnel, manifeste, outil, contrôle du périmètre), puis commit simulé (C9b levé ; relais à 30 sur 30 ; en mode strict, C5a attendu, rien n'étant poussé).
// Usage : node a2-05-travail/arbitrage-F/protection-F/application/essayer-protection-F.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { essayer, espace } from '../../essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', I = W + 'arbitrage-F/protection-F/', A = I + 'application/', PROP = I + 'proposition/';
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-', RF = R + 'F.md', PF = R + 'F-perimetre-operationnel.md', PREP = R + 'F-perimetre.md';
const EMP = W + 'empreintes-lot3.mjs', MAN = W + 'empreintes-rapports-arbitres.json', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs';
const CTRL = W + 'controle-relais-allege.mjs', A10 = 'docs/conception/addendum-A10-interrogatif.md';
const CIBLES = Object.keys(JSON.parse(readFileSync(resolve(root, PROP + 'manifeste.json'), 'utf8')));
const sha = (b) => createHash('sha256').update(b).digest('hex');

essayer({
  root, SCR: A + 'appliquer-protection-F.mjs', A, fin: /protection du rapport arbitré de F appliquée/, cibles: CIBLES,
  scenario: ({ altere, refus, f, g, ok, lancer, premier }) => {
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R1 index non vide', /P2 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    mkdirSync(f(A + 'depart')); const r2 = lancer(); ok(r2.code === 1 && /P3 sauvegarde/.test(premier(r2)), 'R2 sauvegarde déjà présente', premier(r2)); rmSync(f(A + 'depart'), { recursive: true });
    altere('R3 manifeste de la proposition modifié', PROP + 'manifeste.json', espace, /P4 manifeste/);
    altere('R4 version proposée modifiée (outil d\'empreintes)', PROP + EMP, espace, /P7 .*empreintes-lot3\.mjs/);
    altere('R5 diff relu modifié (manifeste d\'empreintes)', PROP + 'diffs/' + MAN.replaceAll('/', '__') + '.diff', espace, /P8 .*empreintes-rapports-arbitres/);
    altere('R6 fichier de départ modifié (ETAT-ACTUEL.md)', 'ETAT-ACTUEL.md', espace, /P6 .*ETAT-ACTUEL/);
    altere('R7 manifeste d\'empreintes de départ modifié', MAN, espace, /P6 .*empreintes-rapports-arbitres/);
    altere('R8 rapport arbitré de F modifié', RF, espace, /P10 préservé : docs\/rapports\/etape2-A2-05-volet1-lot3-F\.md/);
    altere('R9 périmètre opérationnel de F modifié', PF, espace, /P10 préservé : .*F-perimetre-operationnel/);
    altere('R10 périmètre préparatoire de F modifié', PREP, espace, /P10 préservé : .*F-perimetre\.md/);
    altere('R11 contrôle du relais modifié', CTRL, espace, /P10 préservé : a2-05-travail\/controle-relais/);
    altere('R12 `CLAUDE.md` modifié', 'CLAUDE.md', espace, /P10 préservé : CLAUDE/);
    altere('R13 registre des tranches modifié', W + 'registre-tranches.json', espace, /P10 préservé : a2-05-travail\/registre/);
    altere('R14 donnée modifiée', 'data/n5/vocab.json', espace, /P11 /);
  },
  apres: ({ cl, f, ok, g }) => {
    const relais = (...o) => { const r = cl.lancer(CTRL, '--apres-application', ...o); const L = r.out.split('\n'); return { code: r.code, out: r.out, fin: L.at(-1), L, ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
    const r0 = relais(); ok(r0.ids === 'C9b' && r0.fin === '29 conformes sur 30', 'T1 témoin : copie appliquée, relais 29 sur 30, C9b seul ; C9a conforme', r0.fin + ' ; écarts : ' + r0.ids);
    const sabote = (nom, p, fn, juge) => { const o = readFileSync(f(p)); const m = fn(o); if (Buffer.from(m).equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(f(p), m); try { juge(nom); } finally { writeFileSync(f(p), o); } };
    const manif = (fn) => (o) => { const x = JSON.parse(o.toString('utf8')); fn(x); return Buffer.from(JSON.stringify(x, null, 1) + '\n'); };
    const retirer = (x, p) => { delete x.empreintes[p]; x.ajouts = x.ajouts.map((a) => ({ ...a, chemins: a.chemins.filter((c) => c !== p) })).filter((a) => a.chemins.length); };
    const parEmpreinte = (p) => (nom) => { const e = cl.lancer(EMP); const r = relais(); ok(e.code !== 0 && e.out.includes('empreinte modifiée : ' + p) && r.code !== 0, nom, 'empreintes : code ' + e.code + ' ; relais : code ' + r.code + ', ' + (r.ids ? 'écarts ' + r.ids : 'exception (diagnostic C9a connu, au suivi technique)')); };
    const parC9a = (nom) => { const r = relais(); ok(r.ids.split(',').includes('C9a'), nom, 'écarts : ' + r.ids); };
    const parCPO = (nom) => { const r = cl.lancer(CPO); ok(r.code !== 0 && /ÉCART\s+non-régression : empreintes identiques/.test(r.out), nom, 'code ' + r.code); };
    sabote('S1 rapport arbitré de F modifié d\'un octet', RF, (o) => Buffer.concat([o, Buffer.from('\n')]), parEmpreinte(RF));
    sabote('S2 périmètre opérationnel de F modifié d\'un octet', PF, (o) => Buffer.concat([o, Buffer.from('\n')]), parEmpreinte(PF));
    sabote('S3 rapport F retiré du manifeste : C9a', MAN, manif((x) => retirer(x, RF)), parC9a);
    sabote('S4 périmètre opérationnel retiré du manifeste, rapport F gardé : C9a', MAN, manif((x) => retirer(x, PF)), parC9a);
    sabote('S5 entrée historique (T9) retirée du manifeste : C9a', MAN, manif((x) => retirer(x, R + 'T9.md')), parC9a);
    sabote('S6 périmètre préparatoire de F ajouté au manifeste : C9a', MAN, manif((x) => { x.empreintes[PREP] = sha(readFileSync(f(PREP))); x.ajouts.at(-1).chemins.push(PREP); }), parC9a);
    sabote('S7 outil d\'empreintes ramené à sa version de HEAD : C9a', EMP, () => Buffer.from(g('show', 'HEAD:' + EMP).stdout), parC9a);
    sabote('S8 contrôle du périmètre opérationnel, manifeste à 46 entrées', MAN, manif((x) => retirer(x, RF)), parCPO);
    sabote('S9 contrôle du périmètre opérationnel, 46e et 47e entrées permutées', MAN, manif((x) => { const e = x.empreintes; x.empreintes = Object.fromEntries([...Object.entries(e).slice(0, 45), [PF, e[PF]], [RF, e[RF]]]); }), parCPO);
    const r1 = relais(); ok(r1.ids === 'C9b', 'T2 témoin après sabotages : C9b seul', r1.fin);
    const modifies = g('-c', 'core.quotepath=false', 'diff', '--name-only').stdout.trim().split('\n').filter(Boolean);
    g('add', '--', ...new Set([...modifies, ...CIBLES, RF, PF, A10])); const c = g('commit', '--quiet', '--no-verify', '-m', 'essai'); ok(c.status === 0, 'A1 commit simulé des fichiers suivis modifiés, des six fichiers visés, d\'A10 et des rapports F, dans la copie seulement', 'code ' + c.status);
    const dc = g('diff', '--check', 'HEAD~1', 'HEAD'); ok(dc.status === 0 && !dc.stdout.trim(), 'A2 `git diff --check` du commit simulé', 'code ' + dc.status);
    const a3 = relais(); ok(a3.code === 0 && a3.fin === '30 conformes sur 30' && !a3.ids, 'A3 après commit simulé : relais 30 sur 30 (C9a et C9b conformes)', a3.fin + ' ; écarts : ' + (a3.ids || 'aucun'));
    const a4 = relais('--strict'); ok(a4.ids === 'C5a', 'A4 après commit simulé : `--strict`, C5a seul (le commit n\'est pas poussé ; attendu)', a4.fin + ' ; écarts : ' + (a4.ids || 'aucun'));
    const a5 = cl.lancer(CPO); const e5 = a5.out.split('\n').filter((l) => /^ÉCART/.test(l)).map((l) => l.replace(/^ÉCART\s+/, '').trim());
    ok(e5.length === 1 && e5[0] === 'HEAD à 39cce13', 'A5 observation : après commit simulé, le contrôle du périmètre opérationnel n\'a qu\'un écart, sa vérification « HEAD à 39cce13 » (limite connue, hors de cette proposition)', e5.join(' | ') || 'aucun');
  },
});
