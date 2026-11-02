// A2-05 : préconditions et essai de l'ajout du périmètre accepté de T3 au manifeste d'empreintes (32e entrée), SANS l'ajouter (autorisation du 2026-10-23).
// Usage : node a2-05-travail/arbitrage-T3/preparer-ajout-perimetre.mjs <racine du dépôt>
// 1. Préconditions, sur le dépôt réel, en lecture seule : identité du document (chemin, empreinte de la version acceptée) ; statut « périmètre accepté
//    le » ; 24 sens distincts, exactement B15 et B16 du découpage arbitré ; 31 entrées, toutes identiques, sans clé en double ; périmètre absent ;
//    seul document arbitré hors du manifeste : ce périmètre ; rapport d'audit de T3 encore en proposition (sinon `--ajouter` l'inscrirait aussi) ;
//    règle commune (anomaliesTranches) sans anomalie.
// 2. Essai de l'opération dans une copie temporaire (dépôt git jetable dont HEAD porte le manifeste de HEAD réel) : `--ajouter` n'inscrit que ce
//    périmètre → 32 entrées, les 31 précédentes inchangées ; C9a de la copie conforme. Le dépôt réel n'est pas modifié (vérifié).
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail');
const MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', R = 'docs/rapports/etape2-A2-05-volet1-lot3-', RAP = R + 'T3.md', PER = R + 'T3-perimetre.md';
const PER_ACCEPTE = '270451ec4a683a5441879df1ed7f03d6c9739abcc553ad6dcae22a1faea277e0'; // version acceptée le 2026-10-22, relevée avant l'ajout
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const avant = { man: sha(join(root, MAN)), per: sha(join(root, PER)), rap: sha(join(root, RAP)) };
const { rapportsArbitres, verifierEmpreintes, anomaliesTranches } = await import(pathToFileURL(join(W, 'empreintes-lot3.mjs')).href);
const tp = readFileSync(join(root, PER), 'utf8');
ok('P1', 'identité : le périmètre de T3 est la version acceptée (empreinte relevée), au statut « périmètre accepté le 2026-10-22 »', avant.per === PER_ACCEPTE && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-22 \(§0\)/m.test(tp), avant.per.slice(0, 12) + '… ; ' + (tp.match(/^\*\*Statut\*\* : .{0,50}/m) ?? [''])[0]);
const dec = [...readFileSync(join(root, R + 'perimetre.md'), 'utf8').matchAll(/^\| \d+ \| (B1[56]) \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => m[2]);
const idsP = [...new Set([...tp.matchAll(/`((?:hj_)?v_\d+_s\d+)`/g)].map((m) => m[1]))];
ok('P2', '24 sens distincts de B15 et B16 du découpage arbitré, tous présents dans le périmètre', dec.length === 24 && new Set(dec).size === 24 && dec.every((x) => idsP.includes(x)), 'découpage : ' + dec.length + ' (' + new Set(dec).size + ' distincts) ; présents dans le périmètre : ' + dec.filter((x) => idsP.includes(x)).length);
const brut = readFileSync(join(root, MAN), 'utf8'); const m = JSON.parse(brut);
const v = verifierEmpreintes(root); const ecrites = [...brut.matchAll(/^\s*"([^"]+)": "[0-9a-f]{64}"/gm)].length;
ok('P3', 'manifeste : 31 entrées, toutes identiques, sans clé en double ; périmètre de T3 absent', Object.keys(m.empreintes).length === 31 && v.controles === 31 && ecrites === 31 && !Object.hasOwn(m.empreintes, PER), v.controles + ' identiques ; ' + ecrites + ' empreintes écrites ; ' + m.ajouts.length + ' ajouts datés');
ok('P4', 'seul document arbitré hors du manifeste : le périmètre de T3', JSON.stringify(rapportsArbitres(root).filter((p) => !Object.hasOwn(m.empreintes, p))) === JSON.stringify([PER]), v.nouveaux.join(', '));
const tr = readFileSync(join(root, RAP), 'utf8');
ok('P5', 'rapport d\'audit de T3 encore en proposition et absent du manifeste (`--ajouter` n\'inscrira que le périmètre)', /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(tr) && !Object.hasOwn(m.empreintes, RAP), avant.rap.slice(0, 12) + '…');
const headR = spawnSync('git', ['show', 'HEAD:' + MAN], { cwd: root, encoding: 'utf8' }); const head = JSON.parse(headR.stdout);
const an = anomaliesTranches(root, m, new Set(Object.keys(head.empreintes)), brut);
ok('P6', 'règle commune (anomaliesTranches) : manifeste existant sans anomalie', an.length === 0, an.join(' ; ') || 'aucune');
// Essai de l'opération dans une copie
const tmp = mkdtempSync(join(tmpdir(), 'ocha-ajout-t3p-')); const copie = join(tmp, 'arbre');
for (const f of ['CLAUDE.md', 'ETAT-ACTUEL.md', 'ROADMAP.md', 'REGLES-CONSTRUCTION.md']) cpSync(join(root, f), join(copie, f));
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'tests', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
const g = (...a) => spawnSync('git', ['-c', 'user.name=essai', '-c', 'user.email=essai@invalid', '-c', 'core.autocrlf=false', ...a], { cwd: copie, encoding: 'utf8' });
writeFileSync(join(copie, MAN), headR.stdout); g('init', '-q'); g('add', MAN); g('commit', '-q', '-m', 'HEAD'); writeFileSync(join(copie, MAN), brut);
const x = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie, '--ajouter'], { encoding: 'utf8' });
const m2 = JSON.parse(readFileSync(join(copie, MAN), 'utf8')); const k1 = Object.keys(m.empreintes), k2 = Object.keys(m2.empreintes);
ok('E1', 'essai (copie) : --ajouter inscrit ce seul périmètre → 32 entrées, les 31 précédentes inchangées (valeurs et ordre), un ajout daté', x.status === 0 && k2.length === 32 && k1.every((k, i) => k2[i] === k && m2.empreintes[k] === m.empreintes[k]) && k2[31] === PER && m2.empreintes[PER] === PER_ACCEPTE && JSON.stringify(m2.ajouts.at(-1).chemins) === JSON.stringify([PER]) && m2.ajouts.length === m.ajouts.length + 1,
  'code ' + x.status + ' ; « ' + x.stdout.trim() + ' » ; nouvelle empreinte ' + (m2.empreintes[PER] ?? '').slice(0, 12) + '… ; ajout ' + JSON.stringify(m2.ajouts.at(-1)));
const c = spawnSync('node', [join(copie, 'a2-05-travail', 'controle-relais-allege.mjs'), copie, '--apres-application'], { encoding: 'utf8', maxBuffer: 1 << 26 });
const l9 = (c.stdout.match(/^(conforme|ÉCART) +C9a .*$/m) ?? [''])[0];
ok('E2', 'essai (copie) : C9a conforme après l\'ajout', l9.startsWith('conforme'), l9.slice(0, 9).trim() + ' ; autres écarts de la copie : ' + ((c.stdout.match(/^ÉCART +(C\w+)/gm) ?? []).map((s) => s.replace(/^ÉCART +/, '')).filter((s) => s !== 'C9a').join(', ') || 'aucun'));
const y = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie, '--ajouter'], { encoding: 'utf8' });
ok('E3', 'essai (copie) : second --ajouter refusé, manifeste inchangé', y.status !== 0 && readFileSync(join(copie, MAN), 'utf8') === JSON.stringify(m2, null, 1) + '\n', 'code ' + y.status + ' ; ' + (y.stderr.match(/Error: .*/) ?? [''])[0]);
rmSync(tmp, { recursive: true, force: true });
ok('E4', 'dépôt réel inchangé (manifeste, périmètre et rapport de T3)', sha(join(root, MAN)) === avant.man && sha(join(root, PER)) === avant.per && sha(join(root, RAP)) === avant.rap, 'manifeste ' + avant.man.slice(0, 12) + '…');
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id + ' ' + r.nom + ' : ' + r.detail);
const n = res.filter((r) => r.ok).length; console.log(n + ' conformes sur ' + res.length + ' ; opération autorisée, à faire une fois : node a2-05-travail/empreintes-lot3.mjs . --ajouter'); process.exit(n === res.length ? 0 : 1);
