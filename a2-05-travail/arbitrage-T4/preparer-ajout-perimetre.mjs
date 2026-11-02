// A2-05 : préconditions et essai de l'ajout du périmètre accepté de T4 au manifeste d'empreintes (34e entrée), SANS l'ajouter (décision du 2026-10-23 :
// préparation autorisée, écriture non autorisée). Calcule aussi, dans la copie, l'aperçu de synchronisation qui suivrait l'ajout, sans l'appliquer.
// Usage : node a2-05-travail/arbitrage-T4/preparer-ajout-perimetre.mjs <racine du dépôt> [--apercu-sortie <fichier>]
// 1. Préconditions, sur le dépôt réel, en lecture seule : identité du document (chemin, empreinte de la version acceptée) ; statut « périmètre accepté
//    le » ; 35 sens distincts, exactement C1 à C4 du découpage arbitré ; 33 entrées, toutes identiques, sans clé en double ; périmètre absent ; seul
//    document arbitré hors du manifeste : ce périmètre ; rapport d'audit de T4 inexistant et absent du manifeste ; règle commune sans anomalie.
// 2. Essai dans une copie temporaire (dépôt git jetable dont HEAD porte le manifeste de HEAD réel) : `--ajouter` n'inscrit que ce périmètre → 34
//    entrées, les 33 précédentes inchangées ; C9a de la copie conforme ; second ajout refusé ; aperçu de synchronisation de la copie (empreinte et
//    lignes : bloc a2-05:etat seul). Le dépôt réel n'est pas modifié (vérifié).
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail');
const ia = process.argv.indexOf('--apercu-sortie'); const apercuSortie = ia > 0 ? process.argv[ia + 1] : null;
const MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', R = 'docs/rapports/etape2-A2-05-volet1-lot3-', RAP = R + 'T4.md', PER = R + 'T4-perimetre.md';
const PER_ACCEPTE = 'ac266eee382048c0cfc6f6837bf0c54283493147e78f51d6fc27c1a3a99c9346'; // version acceptée le 2026-10-23, relevée après l'inscription du §0
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const avant = { man: sha(join(root, MAN)), per: sha(join(root, PER)), etat: sha(join(root, 'ETAT-ACTUEL.md')), road: sha(join(root, 'ROADMAP.md')) };
const { rapportsArbitres, verifierEmpreintes, anomaliesTranches } = await import(pathToFileURL(join(W, 'empreintes-lot3.mjs')).href);
const tp = readFileSync(join(root, PER), 'utf8');
ok('P1', 'identité : le périmètre de T4 est la version acceptée (empreinte relevée), au statut « périmètre accepté le 2026-10-23 »', avant.per === PER_ACCEPTE && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-23 \(§0\)/m.test(tp), avant.per.slice(0, 12) + '… ; ' + (tp.match(/^\*\*Statut\*\* : .{0,50}/m) ?? [''])[0]);
const dec = [...readFileSync(join(root, R + 'perimetre.md'), 'utf8').matchAll(/^\| \d+ \| (C[1-4]) \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => m[2]);
const s2 = tp.slice(tp.indexOf('## 2. '), tp.indexOf('## 3. ')); const idsP = [...s2.matchAll(/^\| \d+ \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => m[1]);
ok('P2', '35 sens distincts de C1 à C4 du découpage arbitré, égaux au §2 du périmètre, dans le même ordre', dec.length === 35 && new Set(dec).size === 35 && idsP.length === 35 && dec.every((x, k) => idsP[k] === x), 'découpage : ' + dec.length + ' (' + new Set(dec).size + ' distincts) ; §2 : ' + idsP.length);
const brut = readFileSync(join(root, MAN), 'utf8'); const m = JSON.parse(brut);
const v = verifierEmpreintes(root); const ecrites = [...brut.matchAll(/^\s*"([^"]+)": "[0-9a-f]{64}"/gm)].length;
ok('P3', 'manifeste : 33 entrées, toutes identiques, sans clé en double ; périmètre de T4 absent', Object.keys(m.empreintes).length === 33 && v.controles === 33 && ecrites === 33 && !Object.hasOwn(m.empreintes, PER), v.controles + ' identiques ; ' + ecrites + ' empreintes écrites ; ' + m.ajouts.length + ' ajouts datés');
ok('P4', 'seul document arbitré hors du manifeste : le périmètre de T4', JSON.stringify(rapportsArbitres(root).filter((p) => !Object.hasOwn(m.empreintes, p))) === JSON.stringify([PER]), v.nouveaux.join(', '));
ok('P5', 'rapport d\'audit de T4 inexistant et absent du manifeste (`--ajouter` n\'inscrira que le périmètre)', !existsSync(join(root, RAP)) && !Object.hasOwn(m.empreintes, RAP), existsSync(join(root, RAP)) ? 'présent' : 'inexistant');
const headR = spawnSync('git', ['show', 'HEAD:' + MAN], { cwd: root, encoding: 'utf8' }); const head = JSON.parse(headR.stdout);
const an = anomaliesTranches(root, m, new Set(Object.keys(head.empreintes)), brut);
ok('P6', 'règle commune (anomaliesTranches) : manifeste existant sans anomalie', an.length === 0, an.join(' ; ') || 'aucune');
// Essai de l'opération dans une copie
const tmp = mkdtempSync(join(tmpdir(), 'ocha-ajout-t4p-')); const copie = join(tmp, 'arbre');
for (const f of ['CLAUDE.md', 'ETAT-ACTUEL.md', 'ROADMAP.md', 'REGLES-CONSTRUCTION.md']) cpSync(join(root, f), join(copie, f));
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'tests', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
const g = (...a) => spawnSync('git', ['-c', 'user.name=essai', '-c', 'user.email=essai@invalid', '-c', 'core.autocrlf=false', ...a], { cwd: copie, encoding: 'utf8' });
writeFileSync(join(copie, MAN), headR.stdout); g('init', '-q'); g('add', MAN); g('commit', '-q', '-m', 'HEAD'); writeFileSync(join(copie, MAN), brut);
const x = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie, '--ajouter'], { encoding: 'utf8' });
const m2 = JSON.parse(readFileSync(join(copie, MAN), 'utf8')); const k1 = Object.keys(m.empreintes), k2 = Object.keys(m2.empreintes);
ok('E1', 'essai (copie) : --ajouter inscrit ce seul périmètre → 34 entrées, les 33 précédentes inchangées (valeurs et ordre), un ajout daté', x.status === 0 && k2.length === 34 && k1.every((k, i) => k2[i] === k && m2.empreintes[k] === m.empreintes[k]) && k2[33] === PER && m2.empreintes[PER] === PER_ACCEPTE && JSON.stringify(m2.ajouts.at(-1).chemins) === JSON.stringify([PER]) && m2.ajouts.length === m.ajouts.length + 1,
  'code ' + x.status + ' ; « ' + x.stdout.trim() + ' » ; nouvelle empreinte ' + (m2.empreintes[PER] ?? '').slice(0, 12) + '… ; ajout ' + JSON.stringify(m2.ajouts.at(-1)));
const c = spawnSync('node', [join(copie, 'a2-05-travail', 'controle-relais-allege.mjs'), copie, '--apres-application'], { encoding: 'utf8', maxBuffer: 1 << 26 });
const l9 = (c.stdout.match(/^(conforme|ÉCART) +C9a .*$/m) ?? [''])[0];
ok('E2', 'essai (copie) : C9a conforme après l\'ajout', l9.startsWith('conforme'), l9.slice(0, 9).trim() + ' ; ' + (l9.match(/\d+ rapports arbitrés identiques sur \d+ au manifeste/) ?? [''])[0] + ' ; autres écarts de la copie : ' + ((c.stdout.match(/^ÉCART +(C\w+)/gm) ?? []).map((s) => s.replace(/^ÉCART +/, '')).filter((s) => s !== 'C9a').join(', ') || 'aucun'));
const y = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie, '--ajouter'], { encoding: 'utf8' });
ok('E3', 'essai (copie) : second --ajouter refusé, manifeste inchangé', y.status !== 0 && readFileSync(join(copie, MAN), 'utf8') === JSON.stringify(m2, null, 1) + '\n', 'code ' + y.status + ' ; ' + (y.stderr.match(/Error: .*/) ?? [''])[0]);
// Aperçu de synchronisation de la copie, après l'ajout simulé
const ap = spawnSync('node', [join(copie, 'a2-05-travail', 'sync-stable.mjs'), copie, '--apercu'], { encoding: 'utf8' });
const apTxt = existsSync(join(copie, 'a2-05-travail/sync-stable-apercu.md')) ? readFileSync(join(copie, 'a2-05-travail/sync-stable-apercu.md'), 'utf8') : '';
const plan = (ap.stdout.match(/plan ([0-9a-f]{16})/) ?? [])[1];
const changees = apTxt.split('\n').filter((l) => /^[-+](?![-+]{2} )/.test(l));
const horsBloc = changees.filter((l) => !/a2-05:etat:debut|^[-+]- \*\*(Lot 3|Corrections retenues|Tranches|Contrôles)\*\*/.test(l));
// Les comptes inchangés ne figurent dans aucune ligne retirée ni ajoutée (l'aperçu, à une ligne de contexte, peut ne pas les montrer) ;
// leur valeur est lue dans le bloc actuel du dépôt réel, que le plan conserve
const blocReel = readFileSync(join(root, 'ETAT-ACTUEL.md'), 'utf8').replace(/\r\n/g, '\n');
const ctx = (re) => re.test(blocReel) && !changees.some((l) => re.test(l));
ok('E4', 'essai (copie) : aperçu de synchronisation calculé après l\'ajout ; lignes du bloc a2-05:etat seulement ; 34 rapports ; comptes inchangés', ap.status === 0 && plan && !horsBloc.length && /\+- \*\*Contrôles\*\* : [^\n]*34 rapports arbitrés identiques/.test(apTxt) && ctx(/- \*\*Lot 3\*\* : 217 sens arbitrés sur 377 ; 160 restent \(0 proposés\)\. \*\*Bloc B\*\* : 148 sur 148\./) && ctx(/- \*\*Corrections retenues, non appliquées\*\* : 189, dans 169 ENTRY ; prochain numéro libre : V1-15\./),
  'code ' + ap.status + ' ; plan ' + plan + ' ; ' + changees.length + ' lignes changées, hors du bloc : ' + horsBloc.length);
if (apercuSortie) writeFileSync(apercuSortie, apTxt);
rmSync(tmp, { recursive: true, force: true });
ok('E5', 'dépôt réel inchangé (manifeste, périmètre de T4, documents de pilotage)', sha(join(root, MAN)) === avant.man && sha(join(root, PER)) === avant.per && sha(join(root, 'ETAT-ACTUEL.md')) === avant.etat && sha(join(root, 'ROADMAP.md')) === avant.road, 'manifeste ' + avant.man.slice(0, 12) + '…');
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id + ' ' + r.nom + ' : ' + r.detail);
const n = res.filter((r) => r.ok).length; console.log(n + ' conformes sur ' + res.length + ' ; opération à faire, sur autorisation distincte : node a2-05-travail/empreintes-lot3.mjs . --ajouter'); process.exit(n === res.length ? 0 : 1);
