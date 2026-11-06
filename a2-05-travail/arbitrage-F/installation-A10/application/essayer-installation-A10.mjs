// A2-05 : essai de l'installation d'A10 et de C6 sur copie jetable, jamais sur le dépôt réel : refus, exécution nominale, commit simulé dans la copie, sabotages de C6, restauration fraîche, export.
// Usage : node a2-05-travail/arbitrage-F/installation-A10/application/essayer-installation-A10.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { essayer, espace, inverse } from '../../essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/installation-A10/', PR = OUT + 'proposition/', A = OUT + 'application/', SOM = 'docs/conception/00-sommaire.md', CIBLE = 'docs/conception/addendum-A10-interrogatif.md', REL = W + 'controle-relais-allege.mjs', E5 = 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CONSIGNES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL], A9 = 'docs/conception/addendum-A9-fonctions-linguistiques.md', GA = '.gitattributes', REGLE = '/' + CIBLE + ' text eol=crlf', QUATRE = [CIBLE, SOM, REL, GA], GA_DEPART = A + 'depart/gitattributes-depart.txt';
const iso = (j) => j.getFullYear() + '-' + String(j.getMonth() + 1).padStart(2, '0') + '-' + String(j.getDate()).padStart(2, '0');
const J = new Date(); const AUJ = iso(J), VEILLE = iso(new Date(J.getFullYear(), J.getMonth(), J.getDate() - 1)), DEMAIN = iso(new Date(J.getFullYear(), J.getMonth(), J.getDate() + 1));
const C6_AVANT = "addenda[0] === 'A1' && addenda.at(-1) === 'A9' && addenda.length === 9", C6_APRES = "addenda.map((a) => +a.slice(1)).sort((x, y) => x - y).join() === '1,2,3,4,5,6,7,8,9,10'";
essayer({
  root, SCR: A + 'installer-A10.mjs', A, args: [AUJ], fin: /installation d'A10 conforme, date effective/, cibles: QUATRE,
  scenario: ({ altere, refus, f, g, ok, lancer, premier }) => {
    refus('R1 date absente', /D1 date/, []); refus('R2 format invalide', /D1 date/, ['02/11/2026']); refus('R3 date impossible', /D2 date réelle/, ['2026-02-30']); refus('R4 veille', /D3 date égale/, [VEILLE]); refus('R5 lendemain', /D3 date égale/, [DEMAIN]);
    const o = g('rev-parse', 'HEAD').stdout.trim(); g('update-ref', 'HEAD', o + '~1'); refus('R6 HEAD antérieur au commit de clôture', /P1 HEAD descend/); g('update-ref', 'HEAD', o);
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R7 index non vide', /P2 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    mkdirSync(f(A + 'depart')); const r8 = lancer(); ok(r8.code === 1 && /P3 sauvegarde/.test(premier(r8)), 'R8 sauvegarde déjà présente', premier(r8)); rmSync(f(A + 'depart'), { recursive: true });
    for (const [n, p] of [['R9 fichier A10 déjà présent', CIBLE], ['R10 autre fichier A10', 'docs/conception/addendum-A10-autre.md'], ['R11 graphie minuscule', 'docs/conception/addendum-a10.md'], ['R12 numéro suivant', 'docs/conception/addendum-A11-x.md']]) { writeFileSync(f(p), 'x\n'); refus(n, /U1 /); rmSync(f(p)); }
    altere('R13 numéro employé dans un outil', 'tools/export-relecture.mjs', (b) => Buffer.concat([b, Buffer.from('// A12\n')]), /U2 /);
    altere('R14 numéro employé dans une partie de la conception', 'docs/conception/partie-1-definitions.md', (b) => Buffer.concat([b, Buffer.from('A10\n')]), /U2 /);
    altere('R15 A10 déjà au sommaire', SOM, (b) => Buffer.concat([b, Buffer.from('| A10 |\r\n')]), /U2 /);
    altere('R16 proposition E5 modifiée', E5, espace, /T1 /);
    altere('R17 partie I modifiée', PR + 'partie-I-revision-4.md', espace, /T2 /);
    altere('R18 texte relu modifié', PR + 'addendum-A10-interrogatif.md', espace, /T3 /);
    altere('R19 diff relu d\'A10 modifié', PR + 'diffs/addendum-A10-interrogatif.md.diff', (b) => Buffer.concat([Buffer.from('\n'), b]), /T4 /);
    altere('R20 `CLAUDE.md` modifié', 'CLAUDE.md', espace, /P4 préservé : CLAUDE/);
    altere('R21 relais en service modifié', 'docs/relecture/reprise-A2-05.md', espace, /P4 préservé : docs\/relecture/);
    altere('R22 §8.117 retiré du bilan', BIL, (b) => Buffer.from(b.toString('utf8').replace('### 8.117 ', '### 8.11x '), 'utf8'), /P5 consignation/);
    altere('R23 trace de consignation altérée', W + 'arbitrage-F/consignation-cloture-checkpoint/application/sorties/application.txt', (b) => Buffer.from(b.toString('utf8').replace('consignation de la clôture conforme', 'interrompue'), 'utf8'), /P5 consignation/);
    altere('R24 donnée modifiée', 'data/n5/vocab.json', espace, /P6 données/);
    altere('R25 sommaire modifié', SOM, espace, /P6 données/);
    altere('R26 contrôle du relais modifié : empreinte de départ', REL, espace, /P8 empreinte de départ : a2-05/);
    altere('R27 version approuvée du sommaire modifiée', PR + '00-sommaire.md', espace, /P9 version approuvée : 00-sommaire/);
    altere('R28 version approuvée de C6 modifiée', PR + 'controle-relais-allege.mjs', espace, /P9 version approuvée : controle/);
    altere('R29 diff relu de C6 modifié', PR + 'diffs/controle-relais-allege.mjs.diff', (b) => Buffer.concat([Buffer.from('\n'), b]), /P10 diff relu/);
    altere('R30 fins de ligne du contrôle inversées', REL, inverse, /P8 empreinte de départ : a2-05/);
    altere('R31 bloc d\'état altéré : aperçu non vide', 'ETAT-ACTUEL.md', (b) => Buffer.from(b.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P14 aperçu/);
    altere('R32 ligne « Prochaine action » divergente', 'ROADMAP.md', (b) => Buffer.from(b.toString('utf8').replace('- **Prochaine action.** ', '- **Prochaine action.**  '), 'utf8'), /P15 relais|P14 aperçu/);
    altere('R33 manifeste modifié', W + 'empreintes-rapports-arbitres.json', espace, /P7 manifeste/);
    altere('R34 règle d\'A10 déjà présente', GA, (b) => Buffer.concat([b, Buffer.from(REGLE + '\n')]), /U4 /);
    altere('R35 `.gitattributes` modifié', GA, (b) => Buffer.concat([b, Buffer.from('# x\n')]), /P8 empreinte de départ : \.gitattributes/);
    altere('R36 fins de ligne de `.gitattributes` inversées', GA, inverse, /P8 empreinte de départ : \.gitattributes/);
    altere('R37 version approuvée de `.gitattributes` modifiée', PR + 'gitattributes-propose.txt', espace, /P9 version approuvée : gitattributes/);
    altere('R38 diff relu de `.gitattributes` modifié', PR + 'diffs/gitattributes-propose.txt.diff', (b) => Buffer.concat([Buffer.from('\n'), b]), /P10 diff relu.*gitattributes/);
    altere('R39 règle d\'A9 retirée de `.gitattributes`', GA, (b) => Buffer.from(b.toString('utf8').replace('/' + A9 + ' text eol=crlf\n', ''), 'utf8'), /P8 empreinte de départ : \.gitattributes/);
  },
  apres: ({ cl, C, f, ok, g }, N) => {
    const t = readFileSync(f(CIBLE), 'utf8'), gab = readFileSync(f(PR + 'addendum-A10-interrogatif.md'), 'utf8');
    ok(t === gab.replace('<DATE-D-ADOPTION>', AUJ) && t.includes('\r\n'), 'A1 A10 installé = texte relu, à la seule date près, fins de ligne de A9', AUJ);
    const relais = (...o) => { const r = cl.lancer(REL, '--apres-application', ...o); return { fin: r.out.split('\n').pop().slice(0, 60), ids: r.out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
    const r0 = relais(); ok(r0.fin === '29 conformes sur 30' && r0.ids === 'C9b', 'A2 après installation : 29 sur 30, C9b seul ; C6 conforme', r0.fin + ' ; écarts : ' + r0.ids);
    // Témoin : sans la règle, le CRLF d'A10 entre dans l'objet Git et `--check` le signale. Le commit du témoin est défait, A10 reste dans l'arbre
    const gaInstalle = readFileSync(f(GA)); writeFileSync(f(GA), readFileSync(f(GA_DEPART))); g('add', '--', CIBLE); g('commit', '--quiet', '--no-verify', '-m', 'temoin'); const dt = g('diff', '--check', 'HEAD~1', 'HEAD'); const brut = g('cat-file', 'blob', 'HEAD:' + CIBLE).stdout; g('reset', '--quiet', '--mixed', 'HEAD~1'); writeFileSync(f(GA), gaInstalle);
    ok(dt.status === 2 && brut.includes('\r'), 'A3 témoin, sans la règle : CR dans l\'objet Git, `git diff --check` à code 2', 'code ' + dt.status);
    // Commit simulé, dans la copie seulement : les quatre fichiers et la consignation déjà appliquée, seuls fichiers suivis modifiés
    ok(g('diff', '--check').status === 0, 'A3 bis `git diff --check` de l\'arbre après installation', 'code 0');
    g('add', '--', ...QUATRE, ...CONSIGNES); const c = g('commit', '--quiet', '--no-verify', '-m', 'essai'); ok(c.status === 0, 'A3 ter commit simulé, dans la copie seulement', 'code ' + c.status);
    const liste = g('-c', 'core.quotepath=false', 'diff', '--name-only', 'HEAD~1', 'HEAD').stdout.trim().split('\n').sort().join(); ok(liste === [...QUATRE, ...CONSIGNES].sort().join(), 'A3 quater contenu du commit simulé : sept fichiers, les quatre visés et les trois consignés', liste.split(',').length + ' fichiers');
    const dc = g('diff', '--check', 'HEAD~1', 'HEAD'); ok(dc.status === 0 && !dc.stdout.trim(), 'A4 `git diff --check` du commit simulé, sans filtre de chemin : code 0, aucun signalement', 'code ' + dc.status + ' ; ' + (dc.stdout.trim().slice(0, 120) || 'aucun'));
    const objet = g('cat-file', 'blob', 'HEAD:' + CIBLE).stdout; ok(!objet.includes('\r') && objet.length > 0 && !/^.*[ \t]$/m.test(objet), 'A4 bis A10 dans l\'objet Git : aucun CR, aucun blanc final');
    const fant = g('status', '--porcelain', '--', ...QUATRE).stdout.trim(); ok(!fant, 'A4 ter aucun fichier des quatre ne paraît modifié après le commit', fant || 'aucun');
    const a10 = g('check-attr', 'text', 'eol', '--', CIBLE).stdout.trim().split('\n').map((l) => l.split(': ').pop()).join(); ok(a10 === 'set,crlf', 'A4 quater attributs d\'A10 après commit', a10);
    const r1 = relais(); ok(r1.fin === '30 conformes sur 30' && !r1.ids, 'A5 après commit simulé : C9b levé, relais normal 30 sur 30', r1.fin + ' ; écarts : ' + (r1.ids || 'aucun'));
    const r2 = relais('--strict'); ok(r2.fin === '29 conformes sur 30' && r2.ids === 'C5a', 'A6 après commit simulé : `--strict` 29 sur 30, C5a seul, attendu après tout commit de contenu', r2.fin + ' ; écarts : ' + r2.ids);
    const texteRel = readFileSync(f(REL)); const ad10 = readFileSync(f(CIBLE)), ad9 = readFileSync(f(A9));
    const sab = (nom, faire, defaire) => { faire(); const r = relais(); defaire(); ok(r.ids.split(',').includes('C6'), nom, r.fin + ' ; écarts : ' + r.ids); };
    sab('S1 addendum A10 retiré : C6 en écart', () => rmSync(f(CIBLE)), () => writeFileSync(f(CIBLE), ad10));
    sab('S2 addendum A9 retiré : C6 en écart', () => rmSync(f(A9)), () => writeFileSync(f(A9), ad9));
    sab('S3 addendum A11 ajouté : C6 en écart', () => writeFileSync(f('docs/conception/addendum-A11-x.md'), 'x\n'), () => rmSync(f('docs/conception/addendum-A11-x.md')));
    sab('S4 addendum A10 dédoublé : C6 en écart', () => writeFileSync(f('docs/conception/addendum-A10-bis.md'), 'x\n'), () => rmSync(f('docs/conception/addendum-A10-bis.md')));
    sab('S5 C6 revenu à son ancienne forme : C6 en écart', () => writeFileSync(f(REL), texteRel.toString('utf8').replace(C6_APRES, () => C6_AVANT)), () => writeFileSync(f(REL), texteRel));
    const r3 = relais(); ok(r3.fin === '30 conformes sur 30', 'A7 témoin : copie revenue, 30 sur 30', r3.fin);
    // Restauration fraîche : les octets ne dépendent pas de la configuration du poste
    for (const cfg of ['true', 'false', 'input']) {
      const d = join(C, '..', 'frais-' + cfg); const x = spawnSync('git', ['clone', '--quiet', '--shared', '-c', 'core.autocrlf=' + cfg, C, d], { encoding: 'utf8', maxBuffer: 1 << 28 }); const gd = (...a) => spawnSync('git', a, { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout.trim();
      ok(x.status === 0 && [CIBLE, SOM, REL].every((p) => existsSync(join(d, p)) && readFileSync(join(d, p)).equals(readFileSync(f(p)))), 'A8 restauration fraîche, core.autocrlf=' + cfg + ' : A10, sommaire et contrôle identiques, octet pour octet', 'code ' + x.status);
      const eqGa = readFileSync(join(d, GA)).equals(readFileSync(f(GA))); const crGa = readFileSync(join(d, GA)).includes('\r\n'); ok(readFileSync(join(d, GA)).toString('utf8').replace(/\r\n/g, '\n') === readFileSync(f(GA), 'utf8') && (eqGa || cfg === 'true'), 'A8 bis `.gitattributes`, core.autocrlf=' + cfg + ' : contenu identique', eqGa ? 'octet pour octet' : 'CRLF en restauration' + (crGa ? ', sans règle propre, comme avant' : ''));
      const stD = gd('status', '--porcelain', '--', ...QUATRE); const atD = gd('check-attr', 'text', 'eol', '--', CIBLE).split('\n').map((l) => l.trim().split(': ').pop()).join(); ok(!stD && atD === 'set,crlf', 'A8 ter core.autocrlf=' + cfg + ' : aucun des quatre ne paraît modifié ; règle d\'A10 active', stD || atD);
      rmSync(d, { recursive: true, force: true });
    }
    const e = spawnSync(process.execPath, [f('tools/export-relecture.mjs'), '--lot', 'lot-27', '--ref', 'HEAD', '--note', W + 'note-export-lot3-F-verifier-et-reprise.md'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); const add = existsSync(f('chatgpt-relecture/04-addenda.md')) ? readFileSync(f('chatgpt-relecture/04-addenda.md'), 'utf8') : ''; ok(e.status === 0 && add.includes('Addendum A10 · Définition opérationnelle'), 'A9 l\'export reprend A10 sans changement d\'outil', 'code ' + e.status);
    const st = g('status', '--porcelain', '--', 'data', 'reconstruction', 'tools', 'tests').stdout.trim(); ok(!st, 'A10 `data`, `reconstruction`, `tools`, `tests` intacts dans la copie', st.slice(0, 120) || 'aucune modification');
    const q = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (k) => ((q.stdout ?? '').match(new RegExp('^. ' + k + ' (\\d+)$', 'm')) ?? [])[1]; ok(q.status === 0 && n('pass') === '510', 'A11 510 tests après commit simulé et export', 'code ' + q.status + ' ; ' + n('pass') + ' sur ' + n('tests'));
    ok(N.out.split('\n').some((l) => l.startsWith('conforme C9 relais : 29 sur 30, C9b seul')), 'A12 trace : écart temporaire de C9b documenté par l\'exécution');
    const sauvegarde = A + 'depart/docs/conception/00-sommaire.md'; const asv = g('check-attr', 'text', '--', sauvegarde).stdout.trim().split(': ').pop(); ok(asv === 'unset' && existsSync(f(GA_DEPART)) && !existsSync(f(A + 'depart/.gitattributes')), 'A13 sauvegarde de `.gitattributes` inerte : les sauvegardes voisines gardent leurs attributs', asv);
    // Mesure, non exigée : si les traces et scripts d'`installation-A10/` entraient dans le même commit, `git diff --check` les jugerait sous `/a2-05-travail/** -text`
    g('add', '--', OUT); g('commit', '--quiet', '--no-verify', '-m', 'mesure'); const dm = g('-c', 'core.quotepath=false', 'diff', '--check', 'HEAD~1', 'HEAD'); const sigM = [...new Set(dm.stdout.split('\n').filter((l) => /:\d+:/.test(l)).map((l) => l.split(':')[0].replace(OUT, '')))]; ok(true, 'M1 mesure, non exigée : `installation-A10/` committé en plus', 'code ' + dm.status + ' ; ' + sigM.length + ' fichier(s) signalé(s) : ' + sigM.join(', ').slice(0, 400));
  },
});
