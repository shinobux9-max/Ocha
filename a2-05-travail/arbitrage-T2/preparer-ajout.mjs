// A2-05 : préparation de l'ajout du rapport arbitré de T2 au manifeste d'empreintes (31e entrée), SANS l'ajouter (décision du 2026-10-22).
// Usage : node a2-05-travail/arbitrage-T2/preparer-ajout.mjs <racine du dépôt>
// 1. Préconditions, sur le dépôt réel, en lecture seule : statut « arbitré le » ; 21 sens de B13 et B14, chacun une fois, eux seuls ; périmètre
//    de T2 au manifeste, empreinte conforme ; 30 entrées, toutes identiques ; rapport absent du manifeste ; seule anomalie de la règle commune :
//    l'omission de ce rapport ; aucun autre rapport arbitré hors du manifeste.
// 2. Essai de l'opération dans une copie temporaire (dépôt git jetable dont HEAD porte le manifeste de HEAD réel) : `--ajouter` n'inscrit
//    que ce rapport → 31 entrées, les 30 précédentes inchangées ; C9a de la copie conforme. Le dépôt réel n'est pas modifié (vérifié).
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail');
const MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', R = 'docs/rapports/etape2-A2-05-volet1-lot3-', RAP = R + 'T2.md', PER = R + 'T2-perimetre.md';
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const avant = { man: sha(join(root, MAN)), rap: sha(join(root, RAP)) };
const { rapportsArbitres, verifierEmpreintes, anomaliesTranches } = await import(pathToFileURL(join(W, 'empreintes-lot3.mjs')).href);
const t = readFileSync(join(root, RAP), 'utf8');
ok('P1', 'rapport de T2 au statut « arbitré le »', /^\*\*Statut\*\* : \*\*arbitré le 2026-10-22\*\* \(§0\)/m.test(t), (t.match(/^\*\*Statut\*\* : .{0,60}/m) ?? [''])[0]);
const ids = [...t.matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` /gm)].map((m) => m[1]);
const dec = [...readFileSync(join(root, R + 'perimetre.md'), 'utf8').matchAll(/^\| \d+ \| (B1[34]) \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => m[2]);
ok('P2', '21 sens examinés, distincts, exactement ceux de B13 et B14 du découpage arbitré', ids.length === 21 && new Set(ids).size === 21 && dec.length === 21 && dec.every((x) => ids.includes(x)), ids.length + ' fiches, ' + new Set(ids).size + ' distinctes ; découpage : ' + dec.length);
const m = JSON.parse(readFileSync(join(root, MAN), 'utf8'));
const v = verifierEmpreintes(root);
ok('P3', 'manifeste : 30 entrées, toutes identiques ; périmètre de T2 protégé, empreinte conforme ; rapport de T2 absent', Object.keys(m.empreintes).length === 30 && v.controles === 30 && m.empreintes[PER] === sha(join(root, PER)) && !Object.hasOwn(m.empreintes, RAP), v.controles + ' identiques ; périmètre ' + (m.empreintes[PER] ?? '').slice(0, 12) + '…');
ok('P4', 'seul rapport arbitré hors du manifeste : celui de T2', JSON.stringify(rapportsArbitres(root).filter((p) => !Object.hasOwn(m.empreintes, p))) === JSON.stringify([RAP]), v.nouveaux.join(', '));
const headR = spawnSync('git', ['show', 'HEAD:' + MAN], { cwd: root, encoding: 'utf8' }); const head = JSON.parse(headR.stdout);
const an = anomaliesTranches(root, m, new Set(Object.keys(head.empreintes)), readFileSync(join(root, MAN), 'utf8'));
ok('P5', 'règle commune (C9a) : une seule anomalie, l\'omission de ce rapport', an.length === 1 && an[0].startsWith(RAP) && /omission/.test(an[0]), an.join(' ; '));
// Essai de l'opération dans une copie
const tmp = mkdtempSync(join(tmpdir(), 'ocha-ajout-t2-')); const copie = join(tmp, 'arbre');
for (const f of ['CLAUDE.md', 'ETAT-ACTUEL.md', 'ROADMAP.md', 'REGLES-CONSTRUCTION.md']) cpSync(join(root, f), join(copie, f));
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'tests', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
const g = (...a) => spawnSync('git', ['-c', 'user.name=essai', '-c', 'user.email=essai@invalid', '-c', 'core.autocrlf=false', ...a], { cwd: copie, encoding: 'utf8' });
const reel = readFileSync(join(copie, MAN), 'utf8');
writeFileSync(join(copie, MAN), headR.stdout); g('init', '-q'); g('add', MAN); g('commit', '-q', '-m', 'HEAD'); writeFileSync(join(copie, MAN), reel);
const x = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie, '--ajouter'], { encoding: 'utf8' });
const m2 = JSON.parse(readFileSync(join(copie, MAN), 'utf8')); const k1 = Object.keys(m.empreintes), k2 = Object.keys(m2.empreintes);
ok('E1', 'essai (copie) : --ajouter inscrit ce seul rapport → 31 entrées, les 30 précédentes inchangées (valeurs et ordre), un ajout daté', x.status === 0 && k2.length === 31 && k1.every((k, i) => k2[i] === k && m2.empreintes[k] === m.empreintes[k]) && k2[30] === RAP && m2.empreintes[RAP] === avant.rap && JSON.stringify(m2.ajouts.at(-1).chemins) === JSON.stringify([RAP]) && m2.ajouts.length === m.ajouts.length + 1,
  'code ' + x.status + ' ; « ' + x.stdout.trim() + ' » ; nouvelle empreinte ' + (m2.empreintes[RAP] ?? '').slice(0, 12) + '… ; ajout ' + JSON.stringify(m2.ajouts.at(-1)));
const c = spawnSync('node', [join(copie, 'a2-05-travail', 'controle-relais-allege.mjs'), copie, '--apres-application'], { encoding: 'utf8', maxBuffer: 1 << 26 });
const l9 = (c.stdout.match(/^(conforme|ÉCART) +C9a .*$/m) ?? [''])[0];
ok('E2', 'essai (copie) : C9a conforme après l\'ajout', l9.startsWith('conforme'), l9.slice(0, 9).trim() + ' ; ' + (l9.match(/\d+ rapports arbitrés identiques sur \d+ au manifeste/) ?? [''])[0] + ' ; autres écarts de la copie : ' + ((c.stdout.match(/^ÉCART +(C\w+)/gm) ?? []).map((s) => s.replace(/^ÉCART +/, '')).filter((s) => s !== 'C9a').join(', ') || 'aucun'));
rmSync(tmp, { recursive: true, force: true });
ok('E3', 'dépôt réel inchangé (manifeste, rapport de T2)', sha(join(root, MAN)) === avant.man && sha(join(root, RAP)) === avant.rap, 'manifeste ' + avant.man.slice(0, 12) + '… ; rapport ' + avant.rap.slice(0, 12) + '…');
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id + ' ' + r.nom + ' : ' + r.detail);
const n = res.filter((r) => r.ok).length; console.log(n + ' conformes sur ' + res.length + ' ; opération à faire, sur autorisation : node a2-05-travail/empreintes-lot3.mjs . --ajouter'); process.exit(n === res.length ? 0 : 1);
