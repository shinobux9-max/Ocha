// A2-05 : évaluation de l'alternative renforcée pour les références Git, EN PROPOSITION : aucun contrôle réel n'est modifié.
// Sur une copie jetable reliée à un distant nu : fichier de références, seule ligne « Git » du relais, correctif du contrôle, script de clôture ; versions figées, manifeste et CLAUDE.md intacts.
// Démontre : clôture sans contrôle strict refusée ; contrôle strict échoué bloquant ; commit non déclaré détecté ; déclaration liée à HEAD et au distant réel ; écarts de la ligne « Git » limités ;
// C10c et version figée intacts ; contrôles conformes après le commit de clôture et après restauration sous core.autocrlf=true et false.
// Usage : node a2-05-travail/arbitrage-F/references-git/evaluer-references.mjs <racine du dépôt>
// Écrit dans ce dossier : controle-relais-propose.txt, controle-relais.diff, reprise-propose.md, reprise-ligne-git.diff, references-git-propose.json, mesures.json, sortie-evaluation.txt. Code 1 au premier écart.
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, cpSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/references-git/', REL = W + 'controle-relais-allege.mjs', REF = W + 'references-git.json', CLO = W + 'cloture-checkpoint.mjs', REPRISE = 'docs/relecture/reprise-A2-05.md', VF = W + 'versions-finales/', CAND = W + 'reprise-A2-05-allegee-candidat.md', GA = '.gitattributes';
const HIST = '78031638c0f81dca1b167e3f57f5a891767fc4cb', EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'], TOUT = '30 conformes sur 30';
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); }; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const remplacer = (t, a, b) => { if (t.split(a).length !== 2) throw new Error('fragment non unique : ' + a.slice(0, 60)); return t.replace(a, () => b); };

// Le correctif proposé, en sept remplacements ciblés
const FRAGMENTS = [
  ["import { spawnSync } from 'node:child_process';",
   "import { spawnSync } from 'node:child_process';\nimport { createHash as hashRef } from 'node:crypto';"],
  ["const APRES = process.argv.includes('--apres-application');",
   "const APRES = process.argv.includes('--apres-application');\n// --strict : à la clôture d'un checkpoint, exige que tout soit poussé et que rien ne suive la référence déclarée, sinon le fichier de références lui-même\nconst STRICT = process.argv.includes('--strict'), REF = 'a2-05-travail/references-git.json';"],
  ["ok('C5a', 'commit cité = HEAD = origin/ocha-v2', head === orig && c.includes(head), head.slice(0, 7) + ' / ' + orig.slice(0, 7));",
   "const refs = existsSync(join(root, REF)) ? JSON.parse(lire(REF)) : {}; const refHist = refs.historique?.commit ?? '', courante = refs.checkpoint?.commit ?? refHist, ck = refs.checkpoint;\nconst ancetre = (a, b) => /^[0-9a-f]{40}$/.test(a) && spawnSync('git', ['merge-base', '--is-ancestor', a, b], { cwd: root }).status === 0;\n// Une référence déclarée doit porter le sceau de cloture-checkpoint.mjs : une écriture à la main fait tomber C5a\nconst sceauOk = !ck || (ck.verification?.head === ck.commit && ck.verification?.distant_reel === ck.commit && ck.verification?.sceau === hashRef('sha256').update(['checkpoint', ck.commit, ck.commit, 'strict'].join('|')).digest('hex'));\nconst enAvance = git('rev-list', '--count', courante + '..HEAD').out, nonPousses = git('rev-list', '--count', orig + '..HEAD').out, suite = git('diff', '--name-only', courante, head).out.split('\\n').filter(Boolean);\nok('C5a', 'référence historique citée par le candidat ; référence déclarée, scellée, ancêtre de HEAD et d\\'origin/ocha-v2' + (STRICT ? ' ; tout est poussé, rien après la référence' : ' (ne prouve pas une clôture Git : seul cloture-checkpoint.mjs --verifier la constate)'), refHist && c.includes(refHist) && ancetre(refHist, courante) && ancetre(courante, head) && ancetre(courante, orig) && sceauOk && (!STRICT || (head === orig && suite.every((p) => p === REF))), 'déclarée ' + courante.slice(0, 7) + ' ; HEAD ' + head.slice(0, 7) + ', en avance de ' + enAvance + ' ; non poussés : ' + nonPousses);"],
  ["['Q1 Sur quel commit repartir ?', () => c.match(/poussé : `([0-9a-f]{40})`/)?.[1], () => orig],",
   "['Q1 Quel est le dernier checkpoint déclaré ?', () => courante, () => (ancetre(courante, orig) ? courante : orig)],"],
  ["live === lire(VF + '/' + ANCIEN) && live !== ancien",
   "sansGit(live) === sansGit(lire(VF + '/' + ANCIEN)) && live !== ancien"],
  ["else { const live = lire(ANCIEN); ok('C9c',",
   "else { const live = lire(ANCIEN); const sansGit = (t) => t.split('\\n').filter((l) => !l.startsWith('- **Git** :')).join('\\n'); ok('C9c',"],
  ["const changes = Object.entries(man).filter(([p, m]) => (APRES ? (h(brut(p)) !== m.final_sha256 && !suiteBilan(p, m)) ||",
   "// Le relais en service peut différer de sa version figée par sa seule ligne « Git », à la forme exacte ci-dessous ; la version figée et son empreinte ne changent pas\nconst LIGNE_GIT = /^- \\*\\*Git\\*\\* : branche `ocha-v2`\\. Référence historique : `([0-9a-f]{40})` \\(checkpoint B, 2026-10-18, 177 chemins\\)\\. Dernier checkpoint déclaré : `a2-05-travail\\/references-git\\.json`\\. \\*\\*Les travaux postérieurs à ce checkpoint ne sont ni committés ni poussés, sauf mention contraire d'`ETAT-ACTUEL\\.md`\\.\\*\\* À vérifier par `git rev-parse HEAD origin\\/ocha-v2` et `git ls-remote origin refs\\/heads\\/ocha-v2` avant de s'y fier\\.$/;\nconst suiteRelais = (p, m) => { if (p !== ANCIEN || h(brut(VF + '/' + p)) !== m.final_sha256) return false; const v = brut(VF + '/' + p).split('\\n'), l = brut(p).split('\\n'), d = l.map((x, i) => (x !== v[i] ? i : -1)).filter((i) => i >= 0); return l.length === v.length && d.length === 1 && v[d[0]].startsWith('- **Git** :') && LIGNE_GIT.exec(l[d[0]])?.[1] === refHist; };\nconst changes = Object.entries(man).filter(([p, m]) => (APRES ? (h(brut(p)) !== m.final_sha256 && !suiteBilan(p, m) && !suiteRelais(p, m)) ||"],
];
const LIGNE_AVANT = "- **Git** : branche `ocha-v2`. Dernier commit confirmé, poussé : `" + HIST + "` (checkpoint B, 2026-10-18, 177 chemins). **Les travaux postérieurs ne sont ni committés ni poussés.** À vérifier par `git rev-parse HEAD origin/ocha-v2` avant de s'y fier.";
const LIGNE_APRES = "- **Git** : branche `ocha-v2`. Référence historique : `" + HIST + "` (checkpoint B, 2026-10-18, 177 chemins). Dernier checkpoint déclaré : `" + REF + "`. **Les travaux postérieurs à ce checkpoint ne sont ni committés ni poussés, sauf mention contraire d'`ETAT-ACTUEL.md`.** À vérifier par `git rev-parse HEAD origin/ocha-v2` et `git ls-remote origin refs/heads/ocha-v2` avant de s'y fier.";
const refsJson = (ck) => JSON.stringify({ role: "références Git d'A2-05 : technique, non normatif. `historique` ne change pas ; `checkpoint` ne s'écrit que par `a2-05-travail/cloture-checkpoint.mjs`, après un push, sur autorisation ; git fait foi pour HEAD et le distant.", historique: { commit: HIST, libelle: 'checkpoint B, 2026-10-18, 177 chemins' }, checkpoint: ck }, null, 1) + '\n';
const scelle = (c) => ({ commit: c, verification: { head: c, origin_local: c, distant_reel: c, sceau: createHash('sha256').update(['checkpoint', c, c, 'strict'].join('|')).digest('hex') } });

const relSource = readFileSync(join(root, REL), 'utf8');
const relProp = FRAGMENTS.reduce((t, [a, b]) => remplacer(t, a, b), relSource);
const repProp = remplacer(readFileSync(join(root, REPRISE), 'utf8'), LIGNE_AVANT, LIGNE_APRES);
const ligneC10c = (t) => t.split('\n').find((l) => l.startsWith("ok('C10c'"));
ok(ligneC10c(relProp) === ligneC10c(relSource) && ligneC10c(relProp), 'D6 ligne de C10c identique dans le contrôle proposé');
ok(!FRAGMENTS.some(([, b]) => /final_sha256\s*=[^=]/.test(b)), 'D6 le correctif n\'écrit aucune empreinte de la version figée');

// Copie jetable reliée à un distant nu : suivis et non suivis, index rafraîchi avant le `.gitattributes`, comme sur le dépôt réel
const tmp = mkdtempSync(join(tmpdir(), 'ocha-references-')); const C = join(tmp, 'arbre'), NU = join(tmp, 'distant.git'); const f = (p) => join(C, p);
const g = (...a) => { const r = spawnSync('git', ['-c', 'core.quotepath=false', '-c', 'core.safecrlf=false', '-c', 'user.name=simulation', '-c', 'user.email=simulation', ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: (r.stdout ?? '').trim(), err: r.stderr ?? '' }; };
spawnSync('git', ['clone', '--quiet', '--bare', root, NU], { encoding: 'utf8' }); spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); g('read-tree', 'HEAD'); g('remote', 'set-url', 'origin', NU);
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip') && e !== GA) cpSync(join(root, e), join(C, e), { recursive: true });
g('update-index', '-q', '--refresh'); cpSync(join(root, GA), f(GA));

const relais = (r, ...o) => { const x = spawnSync(process.execPath, [join(r, REL), r, '--apres-application', ...o], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }); const s = ((x.stdout ?? '') + (x.stderr ?? '')).trim().split('\n'); return { code: x.status, fin: s[s.length - 1].slice(0, 40), plante: !/ conformes sur 30$/.test(s[s.length - 1]), e: s.filter((l) => /^ÉCART/.test(l)).map((l) => l.split(/\s+/)[1]).sort().join(', '), c5a: (s.find((l) => /^\S+\s+C5a /.test(l)) ?? '').split(' : ').pop(), c10c: s.some((l) => /^conforme C10c /.test(l)) }; };
const M = []; const etape = (nom, attendu, attenduStrict, r = C) => { const a = relais(r), b = relais(r, '--strict'); M.push({ nom, normal: a.fin, ecarts: a.e || 'aucun', strict: b.fin, ecartsStrict: b.e || 'aucun', detail: a.c5a }); ok(!a.plante && !b.plante && a.c10c && (a.e || 'aucun') === attendu && (b.e || 'aucun') === attenduStrict, nom, 'normal ' + a.fin + ' (' + (a.e || 'aucun') + ') ; --strict ' + b.fin + ' (' + (b.e || 'aucun') + ') ; ' + a.c5a); };
const clo = (...a) => { const x = spawnSync(process.execPath, [f(CLO), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const etatGit = (nom, re) => { const r = clo('--etat'); const l = r.out.split('\n')[0]; ok(r.code === 0 && re.test(l) && /seul --verifier la constate/.test(r.out), 'D8 état intermédiaire nommé, ' + nom, l); };
const R = []; const refus =(nom, a, re) => { const av = readFileSync(f(REF)); const r = clo(...a); const inchange = av.equals(readFileSync(f(REF))); R.push({ nom, sortie: r.out.slice(0, 110) }); ok(r.code === 1 && re.test(r.out) && inchange, nom, r.out.slice(0, 110) + (inchange ? '' : ' ; FICHIER MODIFIÉ')); };

const a0 = relais(C); ok(a0.code === 0, 'témoin : contrôle réel, avant toute modification de la copie', a0.fin);
writeFileSync(f(REL), relProp); writeFileSync(f(REPRISE), repProp); writeFileSync(f(REF), refsJson(null)); cpSync(join(root, OUT, 'cloture-checkpoint-propose.txt'), f(CLO));
etape('E0, alternative posée, avant commit', 'aucun', 'aucun');
const liste = readFileSync(join(root, W + 'arbitrage-F/checkpoint/chemins-inclus.txt'), 'utf8').trim().split('\n').concat([REF, CLO]); writeFileSync(join(tmp, 'liste.txt'), liste.join('\n') + '\n');
const add = g('add', '--pathspec-from-file=' + join(tmp, 'liste.txt')); const com = g('commit', '--quiet', '--no-verify', '-m', 'simulation checkpoint'); ok(add.code === 0 && com.code === 0, 'commit simulé, liste du dossier plus les deux fichiers de l\'alternative', add.err.slice(0, 100)); const N = g('rev-parse', 'HEAD').out;
etape('E1, après le commit N, non poussé', 'aucun', 'C5a'); etatGit('commit N', /^état 1\./);

// D4 : la déclaration exige HEAD et le distant réel
refus('D4 déclaration avant le push', ['--declarer', N, '--libelle', 'x'], /push à faire/);
g('push', '--quiet', 'origin', 'ocha-v2'); etape('E2, après le push de N, référence non déclarée', 'aucun', 'C5a'); etatGit('N poussé', /^état 2\./);
refus('D4 commit déclaré différent de HEAD', ['--declarer', HIST, '--libelle', 'x'], /différent du commit déclaré/);
refus('D4 hash abrégé', ['--declarer', N.slice(0, 7), '--libelle', 'x'], /40 caractères/);
const nu = (...a) => spawnSync('git', ['--git-dir', NU, ...a], { encoding: 'utf8' });
nu('update-ref', 'refs/heads/ocha-v2', HIST); refus('D4 distant réel en retard sur la référence locale', ['--declarer', N, '--libelle', 'x'], /distant réel .* différent/); nu('update-ref', 'refs/heads/ocha-v2', N);
g('remote', 'set-url', 'origin', join(tmp, 'absent.git')); refus('D4 distant réel injoignable', ['--declarer', N, '--libelle', 'x'], /injoignable/); g('remote', 'set-url', 'origin', NU);
writeFileSync(f('docs/z.md'), 'x\n'); g('add', 'docs/z.md'); refus('D4 index non vide', ['--declarer', N, '--libelle', 'x'], /index non vide/); g('rm', '--cached', '--quiet', 'docs/z.md'); rmSync(f('docs/z.md'));

// D1 : une clôture sans contrôle strict est refusée
refus('D1 aucun mode', [], /aucun mode ne contourne/);
refus('D1 mode inventé', ['--sans-strict'], /aucun mode ne contourne/);
refus('D1 vérification sans déclaration', ['--verifier'], /aucun checkpoint/);
const refsAvant = readFileSync(f(REF));
for (const [nom, ck] of [['référence écrite à la main, sans sceau', { commit: N }], ['référence au sceau faux', { commit: N, verification: { head: N, distant_reel: N, sceau: '0'.repeat(64) } }]]) {
  writeFileSync(f(REF), refsJson(ck)); const a = relais(C); ok(/C5a/.test(a.e) && !a.plante, 'D1 ' + nom + ' : relais en écart, même en mode normal', a.fin + ' ; ' + a.e); refus('D1 ' + nom + ' : clôture refusée', ['--verifier'], /sans contrôle strict/); writeFileSync(f(REF), refsAvant);
}

// D2 : un contrôle strict échoué bloque la clôture
const sabotRel = readFileSync(f(REL), 'utf8'); writeFileSync(f(REL), remplacer(sabotRel, "const APRES = process.argv.includes('--apres-application');", "const APRES = process.argv.includes('--apres-application');\nif (process.argv.includes('--strict')) { console.log('ÉCART    C5a sabotage'); console.log('\\n29 conformes sur 30'); process.exit(1); }"));
refus('D2 relais --strict échoué : déclaration annulée, fichier restauré', ['--declarer', N, '--libelle', 'x'], /relais --strict : 29 conformes sur 30 ; déclaration annulée/);
refus('D2 option inconnue : aucun contournement', ['--declarer', N, '--libelle', 'x', '--sans-strict', '--force'], /relais --strict : 29/);
writeFileSync(f(REL), sabotRel);
const repA = readFileSync(f(REPRISE)); writeFileSync(f(REPRISE), repA.toString('utf8').replace('## 6. Prochaine action', '## 6. Prochaine action ')); refus('D2 relais en écart avant déclaration', ['--declarer', N, '--libelle', 'x'], /relais avant déclaration/); writeFileSync(f(REPRISE), repA);

// Parcours nominal
const d1 = clo('--declarer', N, '--libelle', "checkpoint du lot 3 jusqu'à T9"); ok(d1.code === 0, 'déclaration de N', d1.out.slice(0, 110));
etape('E3, référence déclarée, non committée', 'aucun', 'aucun'); etatGit('référence déclarée', /^état 3\./);
refus('D1 vérification avant le commit de clôture', ['--verifier'], /référence non committée/);
g('add', REF); g('commit', '--quiet', '--no-verify', '-m', 'simulation cloture'); const M1 = g('rev-parse', 'HEAD').out;
refus('D1 vérification avant le push de clôture', ['--verifier'], /commits non poussés/); etatGit('commit de clôture', /^état 4\./);
const rN = relais(C), rS = relais(C, '--strict'); ok(rN.code === 0 && rS.code === 1, 'D9 à l\'état 4, clôture non poussée, le relais normal est à 30 sur 30 : il ne prouve donc pas la clôture ; `--strict` et `--verifier` la refusent', rN.fin + ' ; --strict ' + rS.fin);
g('push', '--quiet', 'origin', 'ocha-v2'); etatGit('second push', /^état 5\./); const v1 = clo('--verifier'); ok(v1.code === 0, 'D7 clôture vérifiée, HEAD, distant réel et relais --strict', v1.out.slice(0, 110));
etape('E4, commit de clôture et push', 'aucun', 'aucun');

// D7 : restaurations
const restaurer = (val, ref) => { const d = join(tmp, 'r-' + val + '-' + ref.slice(0, 6)); spawnSync('git', ['clone', '--quiet', '-c', 'core.autocrlf=' + val, C, d], { encoding: 'utf8' }); spawnSync('git', ['checkout', '--quiet', ref], { cwd: d }); spawnSync('git', ['update-ref', 'refs/remotes/origin/ocha-v2', ref], { cwd: d }); return d; };
const empreintes = (d) => spawnSync(process.execPath, [join(d, W + 'empreintes-lot3.mjs'), d], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }).status, pilote = (d) => spawnSync(process.execPath, [join(d, W + 'controle-bilan-pilote.mjs'), d], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }).status;
const tests = (d) => { const x = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }); return [x.status, (((x.stdout ?? '') + (x.stderr ?? '')).match(/^(?:# |ℹ )(tests|pass|fail) (\d+)/gm) ?? []).join(' ').replace(/# |ℹ /g, '')]; };
for (const v of ['true', 'false']) {
  etape('E5, restauration de N, core.autocrlf=' + v, 'aucun', 'C5a', restaurer(v, N));
  const d = restaurer(v, M1 + ''); const d2 = d; etape('E6, restauration du commit de clôture, core.autocrlf=' + v, 'aucun', 'aucun', d2);
  const [t, s] = tests(d2); ok(empreintes(d2) === 0 && pilote(d2) === 0 && t === 0, 'D7 restauration du commit de clôture, core.autocrlf=' + v + ' : empreintes, pilote, tests', s);
}

// D3 : un commit nouveau non déclaré reste détecté
writeFileSync(f('docs/simulation.md'), 'x\n'); g('add', 'docs/simulation.md'); g('commit', '--quiet', '--no-verify', '-m', 'simulation ordinaire'); const P = g('rev-parse', 'HEAD').out;
etape('E7, commit ordinaire, non poussé', 'aucun', 'C5a'); refus('D3 commit non poussé : clôture refusée', ['--verifier'], /commits non poussés/); refus('D3 commit non poussé : déclaration refusée', ['--declarer', P, '--libelle', 'x'], /push à faire/);
g('push', '--quiet', 'origin', 'ocha-v2'); etape('E8, ce commit poussé, non déclaré', 'aucun', 'C5a'); refus('D3 commit poussé, non déclaré : clôture refusée', ['--verifier'], /commit non déclaré après la référence : docs\/simulation\.md/);
const d2 = clo('--declarer', P, '--libelle', 'second cycle'); ok(d2.code === 0, 'second cycle : déclaration du nouveau commit', d2.out.slice(0, 90)); g('add', REF); g('commit', '--quiet', '--no-verify', '-m', 'simulation cloture 2'); g('push', '--quiet', 'origin', 'ocha-v2'); const v2 = clo('--verifier'); ok(v2.code === 0, 'second cycle : clôture vérifiée', v2.out.slice(0, 90));
etape('E9, second cycle clos', 'aucun', 'aucun');

// D5, D6 : sabotages ; chacun modifie réellement les octets
const S = []; const sabot = (nom, p, fn, attendu) => { const o = existsSync(f(p)) ? readFileSync(f(p)) : null; const n = fn(o?.toString('utf8') ?? ''); if (n === null) rmSync(f(p)); else { if (n === o?.toString('utf8')) ok(false, nom, 'sabotage sans effet'); writeFileSync(f(p), n); } const a = relais(C); if (o) writeFileSync(f(p), o); S.push({ nom, ecarts: a.e || 'aucun' }); ok(!a.plante && attendu.test(a.e), nom, a.fin + ' ; ' + (a.e || 'aucun')); };
const orph = g('commit-tree', 'HEAD^{tree}', '-m', 'orphelin').out;
sabot('S1 référence inconnue, sceau juste', REF, () => refsJson(scelle('a'.repeat(40))), /C5a/);
sabot('S2 référence hors de l\'historique, sceau juste', REF, () => refsJson(scelle(orph)), /C5a/);
sabot('S3 fichier de références absent', REF, () => null, /C5a/);
sabot('S4 référence historique changée', REF, (t) => t.replace(HIST, N), /C5a/);
sabot('D5 relais : une autre ligne modifiée', REPRISE, (t) => t.replace('## 6. Prochaine action', '## 6. Prochaine action '), /C10a/);
sabot('D5 relais : ligne « Git » avec une autre référence historique', REPRISE, (t) => t.replace(HIST, N), /C10a/);
sabot('D5 relais : retour à une référence seule', REPRISE, (t) => t.replace(LIGNE_APRES, LIGNE_AVANT.replace(HIST, N)), /C10a/);
sabot('D5 relais : un mot ajouté à la ligne « Git »', REPRISE, (t) => t.replace(LIGNE_APRES, LIGNE_APRES + ' Voir aussi.'), /C10a/);
sabot('D5 relais : ligne « Git » supprimée', REPRISE, (t) => t.replace(LIGNE_APRES + '\n', ''), /C10a/);
sabot('D5 relais : une ligne ajoutée après la ligne « Git »', REPRISE, (t) => t.replace(LIGNE_APRES, LIGNE_APRES + '\n- Ajout.'), /C10a/);
sabot('D5 relais : seconde ligne « Git »', REPRISE, (t) => t.replace(LIGNE_APRES, LIGNE_APRES + '\n' + LIGNE_APRES), /C10a/);
sabot('S8 candidat modifié', CAND, (t) => t.replace(HIST, N), /C4|C10b/);
sabot('D6 version figée du relais modifiée', VF + REPRISE, (t) => t + ' ', /C10a/);
sabot('D6 manifeste figé modifié', VF + 'manifeste.json', (t) => t.replace('a651cc84', 'b651cc84'), /C10a/);
sabot('D6 version figée de CLAUDE.md : sans `7803163`', VF + 'CLAUDE.md', (t) => t.replace('`origin/ocha-v2` sont à `7803163`', '`origin/ocha-v2` sont à `' + N.slice(0, 7) + '`'), /C10c/);
sabot('D6 `CLAUDE.md`, ligne 128, modifié', 'CLAUDE.md', (t) => t.replace('`origin/ocha-v2` sont à `7803163`', '`origin/ocha-v2` sont à `' + N.slice(0, 7) + '`'), /C10a/);
ok(relais(C).code === 0, 'témoin après sabotages : relais à 30 sur 30', relais(C).fin);

// Versions proposées ; aucune écriture hors de ce dossier
const d = join(root, OUT); mkdirSync(d, { recursive: true });
writeFileSync(join(d, 'controle-relais-propose.txt'), relProp); writeFileSync(join(d, 'reprise-propose.md'), repProp); writeFileSync(join(d, 'references-git-propose.json'), refsJson(null));
const dif = (a, b) => diffBrut(root, a, b).stdout;
writeFileSync(join(d, 'controle-relais.diff'), dif(REL, OUT + 'controle-relais-propose.txt')); writeFileSync(join(d, 'reprise-ligne-git.diff'), dif(REPRISE, OUT + 'reprise-propose.md'));
writeFileSync(join(d, 'mesures.json'), JSON.stringify({ etapes: M, refus: R, sabotages: S }, null, 1) + '\n');
rmSync(tmp, { recursive: true, force: true });
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim() && !existsSync(join(root, REF)) && !existsSync(join(root, CLO)), 'dépôt réel : index vide, ni fichier de références ni script de clôture posés');
dire(ko ? ko + ' écart(s)' : 'évaluation conforme');
writeFileSync(join(d, 'sortie-evaluation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
