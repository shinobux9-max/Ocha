// A2-05 : essai de la consignation de l'installation d'A10 sur copie jetable, jamais sur le dépôt réel : installation d'abord, dans la copie, puis refus, exécution nominale, commit simulé.
// Usage : node a2-05-travail/arbitrage-F/consignation-installation-A10/application/essayer-consignation-A10.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, mkdirSync, renameSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { essayer, espace, inverse } from '../../essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/consignation-installation-A10/', A = OUT + 'application/', PR = OUT + 'proposition/', INST = W + 'arbitrage-F/installation-A10/', TRACE = INST + 'application/sorties/application.txt';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', CIBLE = 'docs/conception/addendum-A10-interrogatif.md', SOM = 'docs/conception/00-sommaire.md', REL = W + 'controle-relais-allege.mjs', GA = '.gitattributes';
const iso = (j) => j.getFullYear() + '-' + String(j.getMonth() + 1).padStart(2, '0') + '-' + String(j.getDate()).padStart(2, '0'); const AUJ = iso(new Date());
const remplace = (a, b) => (o) => Buffer.from(o.toString('utf8').replace(a, () => b), 'utf8');
essayer({
  root, SCR: A + 'appliquer-consignation-A10.mjs', A, fin: /consignation de l'installation d'A10 conforme, date effective/, cibles: [BIL, ETAT, ROAD],
  prealable: ({ f, C, ok }) => { const r = spawnSync(process.execPath, [f(INST + 'application/installer-A10.mjs'), C, AUJ], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'préalable : installation d\'A10, dans la copie seulement', 'code ' + r.status); },
  scenario: ({ altere, refus, f, g, ok, lancer, premier }) => {
    const o = g('rev-parse', 'HEAD').stdout.trim(); g('commit', '--quiet', '--no-verify', '--allow-empty', '-m', 'x'); refus('R1 HEAD a avancé : installation déjà committée', /I4 HEAD/); g('update-ref', 'HEAD', o);
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R2 index non vide', /P2 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    mkdirSync(f(A + 'depart')); const r3 = lancer(); ok(r3.code === 1 && /P3 sauvegarde/.test(premier(r3)), 'R3 sauvegarde déjà présente', premier(r3)); rmSync(f(A + 'depart'), { recursive: true });
    renameSync(f(TRACE), f(TRACE + '.x')); refus('R4 trace d\'installation absente : installation non réalisée', /I1 trace/); renameSync(f(TRACE + '.x'), f(TRACE));
    altere('R5 trace : installation non conforme', TRACE, remplace('installation d\'A10 conforme', 'installation d\'A10 interrompue'), /I1 trace/);
    altere('R6 trace : date falsifiée', TRACE, remplace('date effective ' + AUJ, 'date effective 2000-01-01'), /I2 bis/);
    const a10 = readFileSync(f(CIBLE)); rmSync(f(CIBLE)); refus('R7 A10 absent : installation défaite', /I2 bis/); writeFileSync(f(CIBLE), a10);
    altere('R8 A10 modifié', CIBLE, espace, /I2 bis/);
    altere('R9 texte relu d\'A10 modifié', INST + 'proposition/addendum-A10-interrogatif.md', espace, /I2 texte relu/);
    altere('R10 sommaire modifié', SOM, espace, /I3 fichier installé : docs/);
    altere('R11 contrôle du relais modifié', REL, espace, /I3 fichier installé : a2-05/);
    altere('R12 `.gitattributes` modifié', GA, espace, /I3 fichier installé : \.gitattributes/);
    altere('R13 `CLAUDE.md` modifié', 'CLAUDE.md', espace, /P4 préservé : CLAUDE/);
    altere('R14 donnée modifiée', 'data/n5/vocab.json', espace, /P5 données/);
    altere('R15 manifeste modifié', W + 'empreintes-rapports-arbitres.json', espace, /P6 manifeste/);
    altere('R16 §8.118 déjà présent', BIL, (b) => Buffer.concat([b, Buffer.from('### 8.118 déjà là\n', 'utf8')]), /P7 ajout absent/);
    altere('R17 bilan modifié', BIL, espace, /P8 empreinte de départ : docs/);
    altere('R18 fins de ligne de ROADMAP.md inversées', ROAD, inverse, /P8 empreinte de départ : ROADMAP/);
    altere('R19 gabarit modifié', PR + 'ROADMAP.md', espace, /P9 gabarit relu : ROADMAP/);
    altere('R20 diff relu modifié', PR + 'diffs/ETAT-ACTUEL.md.diff', (b) => Buffer.concat([Buffer.from('\n'), b]), /P10 diff relu.*ETAT-ACTUEL/);
  },
  apres: ({ cl, f, ok, g }) => {
    const bil = readFileSync(f(BIL), 'utf8'), et = readFileSync(f(ETAT), 'utf8'), ro = readFileSync(f(ROAD), 'utf8');
    ok(![bil, et, ro].some((t) => t.includes('<DATE-D-INSTALLATION>') || t.includes('<SHA-A10>')), 'A1 aucune variable restante');
    ok(et.includes('**Addendum A10 adopté et installé le ' + AUJ + '**') && ro.includes('**Addendum A10 adopté et installé le ' + AUJ + '**') && bil.includes('### 8.118 ') && bil.includes('**A10 adopté et installé le ' + AUJ + '.**'), 'A2 adoption et installation dites, à la date de la trace');
    ok(/ni adoptée ni\s+normative/.test(et) && et.includes("Jusqu'au " + AUJ + ', la **proposition'), 'A3 mention datée conservée, lue par C5e et Q7');
    g('add', '--', CIBLE, SOM, REL, GA, BIL, ETAT, ROAD); const c = g('commit', '--quiet', '--no-verify', '-m', 'essai'); ok(c.status === 0, 'A4 commit simulé, dans la copie seulement', 'code ' + c.status);
    const dc = g('diff', '--check', 'HEAD~1', 'HEAD'); ok(dc.status === 0 && !dc.stdout.trim(), 'A5 `git diff --check` du commit simulé, sans filtre de chemin', 'code ' + dc.status + ' ; ' + (dc.stdout.trim().slice(0, 140) || 'aucun signalement'));
    const relais = (...o) => { const r = cl.lancer(REL, '--apres-application', ...o); return { fin: r.out.split('\n').pop().slice(0, 60), ids: r.out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
    const r1 = relais(); ok(r1.fin === '30 conformes sur 30' && !r1.ids, 'A6 après commit simulé : relais normal, 30 sur 30', r1.fin + ' ; écarts : ' + (r1.ids || 'aucun'));
    const r2 = relais('--strict'); ok(r2.fin === '29 conformes sur 30' && r2.ids === 'C5a', 'A7 après commit simulé : `--strict`, C5a seul', r2.fin + ' ; écarts : ' + r2.ids);
  },
});
