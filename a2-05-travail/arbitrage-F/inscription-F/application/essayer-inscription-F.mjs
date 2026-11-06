// A2-05 · bloc F : essai, sur copie jetable, de l'application de l'inscription du périmètre F et de la consignation §8.119 ; jamais sur le dépôt réel.
// Refus avant écriture, exécution nominale, seconde exécution refusée ; puis, sur la copie appliquée : sabotages de la cohérence entre le registre, le rapport
// accepté et A10 (C5c, recalculs de T7 à T9, contrôle du périmètre), commit simulé (C9b levé, `git diff --check`).
// Usage : node a2-05-travail/arbitrage-F/inscription-F/application/essayer-inscription-F.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, mkdirSync, renameSync } from 'node:fs';
import { resolve } from 'node:path';
import { essayer, espace } from '../../essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', I = W + 'arbitrage-F/inscription-F/', A = I + 'application/', PROP = I + 'proposition/';
const REG = W + 'registre-tranches.json', REP = 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md', CTRL = W + 'controle-relais-allege.mjs', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs';
const A10 = 'docs/conception/addendum-A10-interrogatif.md', DOS = W + 'audit-F/dossier-F.md';
const CIBLES = Object.keys(JSON.parse(readFileSync(resolve(root, PROP + 'manifeste.json'), 'utf8')));
const rapport = Object.keys(JSON.parse(readFileSync(resolve(root, W + 'empreintes-rapports-arbitres.json'), 'utf8')).empreintes)[0];
const remplace = (a, b) => (o) => Buffer.from(o.toString('utf8').replace(a, () => b), 'utf8');

essayer({
  root, SCR: A + 'appliquer-inscription-F.mjs', A, fin: /inscription du périmètre F et consignation §8\.119 appliquées/, cibles: CIBLES,
  scenario: ({ altere, refus, f, g, ok, lancer, premier }) => {
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R1 index non vide', /P2 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    mkdirSync(f(A + 'depart')); const r2 = lancer(); ok(r2.code === 1 && /P3 sauvegarde/.test(premier(r2)), 'R2 sauvegarde déjà présente', premier(r2)); rmSync(f(A + 'depart'), { recursive: true });
    altere('R3 manifeste de la proposition modifié', PROP + 'manifeste.json', espace, /P4 manifeste/);
    altere('R4 version proposée modifiée (registre)', PROP + REG, espace, /P7 .*registre-tranches/);
    altere('R5 diff relu modifié (ETAT-ACTUEL.md)', PROP + 'diffs/ETAT-ACTUEL.md.diff', espace, /P8 .*ETAT-ACTUEL/);
    altere('R6 fichier de départ modifié (ETAT-ACTUEL.md)', 'ETAT-ACTUEL.md', espace, /P6 .*ETAT-ACTUEL/);
    altere('R7 contrôle du relais modifié', CTRL, espace, /P6 .*controle-relais/);
    altere('R8 relais en service modifié', 'docs/relecture/reprise-A2-05.md', espace, /P9 préservé : docs\/relecture/);
    altere('R9 `CLAUDE.md` modifié', 'CLAUDE.md', espace, /P9 préservé : CLAUDE/);
    renameSync(f(DOS), f(DOS + '.x')); refus('R10 dossier d\'audit absent', /P10 dossier/); renameSync(f(DOS + '.x'), f(DOS));
    altere('R11 donnée modifiée', 'data/n5/vocab.json', espace, /P11 /);
    altere('R12 rapport protégé modifié', rapport, espace, /P12 relais|P13 /);
  },
  apres: ({ cl, f, ok, g }) => {
    const relais = (...o) => { const r = cl.lancer(CTRL, '--apres-application', ...o); const L = r.out.split('\n'); return { fin: L.at(-1), ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
    const codes = () => ['recalcul-T7-perimetre.mjs', 'recalcul-T8-perimetre.mjs', 'recalcul-T9-perimetre.mjs'].map((s) => cl.lancer(W + s).code).join('') + '/' + cl.lancer(CPO).code;
    const r0 = relais(); ok(r0.ids === 'C9b' && codes() === '000/0', 'T1 témoin : copie appliquée, relais C9b seul ; recalculs de T7 à T9 et contrôle du périmètre à code 0', r0.fin + ' ; ' + codes());
    const sabote = (nom, p, fn, attendu, cAttendu) => { const o = readFileSync(f(p)); const m = fn(o); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(f(p), m); const r = relais(); const c = codes(); ok(r.ids.split(',').includes('C5c') && r.ids.split(',').every((x) => attendu.includes(x)) && c === cAttendu, nom, 'écarts : ' + r.ids + ' ; codes T7 T8 T9 / périmètre : ' + c); writeFileSync(f(p), o); };
    const J = (fn) => (o) => { const t = JSON.parse(o.toString('utf8')); fn(t.tranches.find((x) => x.id === 'F'), t); return Buffer.from(JSON.stringify(t, null, 1) + '\n', 'utf8'); };
    sabote('S1 registre : F revenue à « suspendue », périmètre accepté', REG, J((t) => { t.statut = 'suspendue'; }), ['C5c', 'C8', 'C9b'], '111/1');
    sabote('S2 rapport ramené à la proposition, registre inscrit', REP, remplace(/^\*\*Statut\*\* : [^\n]*$/m, '**Statut** : **proposition de périmètre opérationnel, non arbitrée.**'), ['C5c', 'C9b'], '000/1');
    sabote('S3 rapport sans §0, registre inscrit', REP, remplace('## 0. Arbitrage', '## 0bis. Arbitrage'), ['C5c', 'C9b'], '000/1');
    sabote('S4 registre : livraison unique `F` retirée', REG, J((t) => { delete t.livraison; }), ['C5c', 'C9b'], '111/1');
    sabote('S5 registre : une tranche « ouverte »', REG, J((t, o) => { o.tranches.find((x) => x.id === 'T9').statut = 'ouverte'; }), ['C5c', 'C8', 'C9b'], '001/0');
    const a10 = readFileSync(f(A10)); rmSync(f(A10)); const r6 = relais(); ok(r6.ids.split(',').includes('C5c'), 'S6 A10 absent : C5c en écart (F planifiée sans A10 adopté)', 'écarts : ' + r6.ids); writeFileSync(f(A10), a10);
    const modifies = g('-c', 'core.quotepath=false', 'diff', '--name-only').stdout.trim().split('\n').filter(Boolean);
    g('add', '--', ...new Set([...modifies, ...CIBLES, A10])); const c = g('commit', '--quiet', '--no-verify', '-m', 'essai'); ok(c.status === 0, 'A1 commit simulé des fichiers suivis modifiés, des dix fichiers visés et d\'A10, dans la copie seulement', 'code ' + c.status);
    const dc = g('diff', '--check', 'HEAD~1', 'HEAD'); ok(dc.status === 0 && !dc.stdout.trim(), 'A2 `git diff --check` du commit simulé', 'code ' + dc.status);
    const a3 = relais(); ok(a3.ids === '', 'A3 après commit simulé : relais 30 sur 30', a3.fin);
    const a4 = relais('--strict'); ok(a4.ids === 'C5a', 'A4 après commit simulé : `--strict`, C5a seul', a4.fin + ' ; ' + a4.ids);
  },
});
