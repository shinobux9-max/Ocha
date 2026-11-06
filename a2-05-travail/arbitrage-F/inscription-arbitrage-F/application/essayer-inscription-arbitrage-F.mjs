// A2-05 · bloc F : essai, sur copie jetable, de l'application de l'inscription de l'arbitrage du 2026-11-03 ; jamais sur le dépôt réel.
// Refus avant écriture, exécution nominale, seconde exécution refusée ; puis, sur la copie appliquée : sabotages de la cohérence entre le rapport F,
// le bloc d'état et la prochaine action (relais), puis commit simulé (C9b levé ; C9a reste, le rapport arbitré de F étant hors du manifeste).
// Usage : node a2-05-travail/arbitrage-F/inscription-arbitrage-F/application/essayer-inscription-arbitrage-F.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { essayer, espace } from '../../essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', I = W + 'arbitrage-F/inscription-arbitrage-F/', A = I + 'application/', PROP = I + 'proposition/';
const RF = 'docs/rapports/etape2-A2-05-volet1-lot3-F.md', CTRL = W + 'controle-relais-allege.mjs', A10 = 'docs/conception/addendum-A10-interrogatif.md';
const CIBLES = Object.keys(JSON.parse(readFileSync(resolve(root, PROP + 'manifeste.json'), 'utf8')));
const remplace = (a, b) => (o) => Buffer.from(o.toString('utf8').replace(a, () => b), 'utf8');

essayer({
  root, SCR: A + 'appliquer-inscription-arbitrage-F.mjs', A, fin: /inscription de l'arbitrage du bloc F appliquée/, cibles: CIBLES,
  scenario: ({ altere, refus, f, g, ok, lancer, premier }) => {
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R1 index non vide', /P2 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    mkdirSync(f(A + 'depart')); const r2 = lancer(); ok(r2.code === 1 && /P3 sauvegarde/.test(premier(r2)), 'R2 sauvegarde déjà présente', premier(r2)); rmSync(f(A + 'depart'), { recursive: true });
    altere('R3 manifeste de la proposition modifié', PROP + 'manifeste.json', espace, /P4 manifeste/);
    altere('R4 version proposée modifiée (rapport F)', PROP + RF, espace, /P7 .*lot3-F\.md/);
    altere('R5 diff relu modifié (ETAT-ACTUEL.md)', PROP + 'diffs/ETAT-ACTUEL.md.diff', espace, /P8 .*ETAT-ACTUEL/);
    altere('R6 fichier de départ modifié (ETAT-ACTUEL.md)', 'ETAT-ACTUEL.md', espace, /P6 .*ETAT-ACTUEL/);
    altere('R7 relais en service modifié', 'docs/relecture/reprise-A2-05.md', espace, /P9 préservé : docs\/relecture/);
    altere('R8 `CLAUDE.md` modifié', 'CLAUDE.md', espace, /P9 préservé : CLAUDE/);
    altere('R9 manifeste d\'empreintes modifié', W + 'empreintes-rapports-arbitres.json', espace, /P9 préservé : a2-05-travail\/empreintes-rapports/);
    altere('R10 registre des tranches modifié', W + 'registre-tranches.json', espace, /P9 préservé : a2-05-travail\/registre/);
    altere('R11 donnée modifiée', 'data/n5/vocab.json', espace, /P10 /);
  },
  apres: ({ cl, f, ok, g }) => {
    const relais = (...o) => { const r = cl.lancer(CTRL, '--apres-application', ...o); const L = r.out.split('\n'); return { code: r.code, out: r.out, fin: L.at(-1), ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
    const r0 = relais(); ok(r0.ids === 'C9a,C9b', 'T1 témoin : copie appliquée, relais C9a et C9b seuls', r0.fin + ' ; ' + r0.ids);
    const sabote = (nom, p, fn, doit) => { const o = readFileSync(f(p)); const m = fn(o); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(f(p), m); const r = relais(); ok(r.ids.split(',').includes(doit), nom, 'écarts : ' + r.ids); writeFileSync(f(p), o); };
    sabote('S1 rapport F ramené à la proposition, pilotage inscrit : le bloc d\'état ne correspond plus (C8)', RF, remplace(/^\*\*Statut\*\* : [^\n]*$/m, '**Statut** : **proposition, non arbitrée.**'), 'C8');
    // S2 : le relais voit le bloc altéré, mais par un refus de sync-stable (exception) et non par un écart nommé : défaut antérieur, de la classe du diagnostic C9a, non corrigé
    { const o = readFileSync(f('ETAT-ACTUEL.md')); writeFileSync(f('ETAT-ACTUEL.md'), remplace('377 sens arbitrés sur 377 ; 0 restent', '376 sens arbitrés sur 377 ; 1 restent')(o)); const r = relais();
      ok(r.code !== 0 && /Refus: bloc modifié à la main/.test(r.out), 'S2 bloc d\'état altéré à la main dans ETAT-ACTUEL.md : détecté, par une exception de sync-stable (« bloc modifié à la main ») et non par un écart nommé', 'code ' + r.code + ' ; écarts nommés : ' + (r.ids || 'aucun')); writeFileSync(f('ETAT-ACTUEL.md'), o); }
    sabote('S3 prochaine action divergente dans ROADMAP.md (C5f)', 'ROADMAP.md', remplace('La décision sur la protection du rapport arbitré de F', 'La décision sur la protection du rapport de F'), 'C5f');
    const modifies = g('-c', 'core.quotepath=false', 'diff', '--name-only').stdout.trim().split('\n').filter(Boolean);
    const nonSuivis = [RF, A10, 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md'];
    g('add', '--', ...new Set([...modifies, ...CIBLES, ...nonSuivis])); const c = g('commit', '--quiet', '--no-verify', '-m', 'essai'); ok(c.status === 0, 'A1 commit simulé des fichiers suivis modifiés, des cinq fichiers visés, d\'A10 et des rapports F, dans la copie seulement', 'code ' + c.status);
    const dc = g('diff', '--check', 'HEAD~1', 'HEAD'); ok(dc.status === 0 && !dc.stdout.trim(), 'A2 `git diff --check` du commit simulé', 'code ' + dc.status);
    const a3 = relais(); ok(a3.ids === 'C9a', 'A3 après commit simulé : C9b levé ; C9a seul, le rapport arbitré de F restant hors du manifeste', a3.fin + ' ; écarts : ' + (a3.ids || 'aucun'));
    const a4 = relais('--strict'); ok(a4.ids.split(',').includes('C9a'), 'A4 après commit simulé : `--strict`, C9a présent', a4.fin + ' ; écarts : ' + a4.ids);
  },
});
