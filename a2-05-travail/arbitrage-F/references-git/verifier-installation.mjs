// A2-05 : vérification de l'alternative INSTALLÉE sur les références Git, dérivée d'evaluer-references.mjs, qui ne se relance pas après installation. Aucun contrôle ni document n'est modifié.
// Sur une copie jetable reliée à un distant nu, depuis l'état réel, sans rien y poser : contrôles C5a, C8, C10a et C10c sur le dépôt réel ; clôture sans contrôle strict refusée ; contrôle strict échoué bloquant ;
// commit non déclaré détecté ; déclaration liée à HEAD et au distant réel ; écarts de la ligne « Git » limités ; C10c et version figée intacts ; contrôles conformes après restauration sous core.autocrlf=true et false.
// Usage : node a2-05-travail/arbitrage-F/references-git/verifier-installation.mjs <racine du dépôt>
// Écrit dans ce dossier : mesures-installees.json, sortie-verification-installee.txt. N'indexe, ne committe et ne pousse rien sur le dépôt réel. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/references-git/', REL = W + 'controle-relais-allege.mjs', REF = W + 'references-git.json', CLO = W + 'cloture-checkpoint.mjs', REPRISE = 'docs/relecture/reprise-A2-05.md', VF = W + 'versions-finales/', CAND = W + 'reprise-A2-05-allegee-candidat.md', GA = '.gitattributes';
const HIST = '78031638c0f81dca1b167e3f57f5a891767fc4cb', EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'], TOUT = '30 conformes sur 30';
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); }; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const remplacer = (t, a, b) => { if (t.split(a).length !== 2) throw new Error('fragment non unique : ' + a.slice(0, 60)); return t.replace(a, () => b); };

const LIGNE_AVANT = "- **Git** : branche `ocha-v2`. Dernier commit confirmé, poussé : `" + HIST + "` (checkpoint B, 2026-10-18, 177 chemins). **Les travaux postérieurs ne sont ni committés ni poussés.** À vérifier par `git rev-parse HEAD origin/ocha-v2` avant de s'y fier.";
const LIGNE_APRES = "- **Git** : branche `ocha-v2`. Référence historique : `" + HIST + "` (checkpoint B, 2026-10-18, 177 chemins). Dernier checkpoint déclaré : `" + REF + "`. **Les travaux postérieurs à ce checkpoint ne sont ni committés ni poussés, sauf mention contraire d'`ETAT-ACTUEL.md`.** À vérifier par `git rev-parse HEAD origin/ocha-v2` et `git ls-remote origin refs/heads/ocha-v2` avant de s'y fier.";
const refsJson = (ck) => JSON.stringify({ role: "références Git d'A2-05 : technique, non normatif. `historique` ne change pas ; `checkpoint` ne s'écrit que par `a2-05-travail/cloture-checkpoint.mjs`, après un push, sur autorisation ; git fait foi pour HEAD et le distant.", historique: { commit: HIST, libelle: 'checkpoint B, 2026-10-18, 177 chemins' }, checkpoint: ck }, null, 1) + '\n';
const scelle = (c) => ({ commit: c, verification: { head: c, origin_local: c, distant_reel: c, sceau: createHash('sha256').update(['checkpoint', c, c, 'strict'].join('|')).digest('hex') } });

// État installé : empreintes relues, ligne de C10c identique à celle d'avant l'installation, aucune référence déclarée
const shaF = (r, p) => createHash('sha256').update(readFileSync(join(r, p))).digest('hex');
for (const [p, h] of [[REL, 'ab75091684e89226a6efece4b509b9666a8e770a23f57440449f6b869d8729a9'], [REPRISE, 'd0586d42795b00fb5360de4f91585e3ea65dc91355cf92e9e9faca28b2061344'], [REF, '16037a88795a9b9bacb9939abbf281172e4abef769ecdb3da1f2ba0cfa9b1c91'], [CLO, 'fbe081613ae10574829d91abf47910a27816522a34261bff3a23fe3453eca351']]) ok(shaF(root, p) === h, 'V0 installé, empreinte relue : ' + p, h.slice(0, 12) + '…');
const ligneC10c = (t) => t.split('\n').find((l) => l.startsWith("ok('C10c'"));
const l0 = ligneC10c(readFileSync(join(root, OUT, 'application/depart', REL), 'utf8')), l1 = ligneC10c(readFileSync(join(root, REL), 'utf8'));
ok(l0 && l0 === l1, 'D6 ligne de C10c identique à celle d\'avant l\'installation');
for (const [p, h] of [[VF + REPRISE, 'a651cc84229efb893f11310209c1c05c4e810d53dffcb00fc5e2d3c859466e09'], [VF + 'manifeste.json', 'd67a0e2962955e924f15e4b4dc0a428ab08918e56223f33ba4af618d61265d21'], [VF + 'CLAUDE.md', 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04'], [CAND, '9fe27d79e6232dbc9fbef87cf6cc188e9da170b6f21400886ce2f4d27a3e4136'], ['CLAUDE.md', 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04']]) ok(shaF(root, p) === h, 'D6 préservé : ' + p, h.slice(0, 12) + '…');
ok(JSON.parse(readFileSync(join(root, REF), 'utf8')).checkpoint === null, 'V0 aucune référence déclarée');

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
// Contrôles détaillés sur le dépôt réel, puis clôture impossible tant qu'aucun checkpoint n'est déclaré
const lignesRelais = (...o) => { const x = spawnSync(process.execPath, [join(root, REL), root, '--apres-application', ...o], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, s: ((x.stdout ?? '') + (x.stderr ?? '')).trim().split('\n') }; };
const reel = lignesRelais(), strict = lignesRelais('--strict');
for (const id of ['C5a', 'C8', 'C9c', 'C10a', 'C10c']) ok(reel.s.some((l) => new RegExp('^conforme ' + id + ' ').test(l)) && strict.s.some((l) => new RegExp('^conforme ' + id + ' ').test(l)), 'V1 dépôt réel, relais normal et --strict : ' + id);
ok(reel.code === 0 && strict.code === 0 && reel.s.pop() === TOUT && strict.s.pop() === TOUT, 'V1 dépôt réel : relais normal et --strict à 30 sur 30, sans valeur de clôture', TOUT);
const cloReel = (...a) => { const x = spawnSync(process.execPath, [join(root, CLO), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const et = cloReel('--etat'), ve = cloReel('--verifier'); ok(et.code === 0 && /^état 0\./.test(et.out), 'V1 dépôt réel, --etat', et.out.split('\n')[0]); ok(ve.code === 1 && /aucun checkpoint/.test(ve.out), 'V1 dépôt réel, --verifier refuse : aucune clôture constatable', ve.out);
etape('E0, alternative installée, avant commit', 'aucun', 'aucun');
const liste = readFileSync(join(root, W + 'arbitrage-F/checkpoint/chemins-inclus.txt'), 'utf8').trim().split('\n'); ok(liste.includes(REF) && liste.includes(CLO) && liste.includes(OUT + 'verifier-installation.mjs'), 'liste régénérée après installation, alternative comprise', liste.length + ' fichiers'); writeFileSync(join(tmp, 'liste.txt'), liste.join('\n') + '\n');
const add = g('add', '--pathspec-from-file=' + join(tmp, 'liste.txt')); const com = g('commit', '--quiet', '--no-verify', '-m', 'simulation checkpoint'); ok(add.code === 0 && com.code === 0, 'commit simulé, liste du dossier régénérée', add.err.slice(0, 100)); const N = g('rev-parse', 'HEAD').out;
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
// Un bloc d'état modifié à la main n'atteint pas C8 : `sync-stable.mjs` refuse en amont et le relais s'arrête, code 1 (premier passage : sortie-verification-premier-passage-code1.txt)
{ const p = f('ETAT-ACTUEL.md'), o = readFileSync(p), n = o.toString('utf8').replace('**Lot 3** : 360 sens arbitrés', '**Lot 3** : 359 sens arbitrés'); writeFileSync(p, n); const x = spawnSync(process.execPath, [join(C, REL), C, '--apres-application'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(p, o); const cause = (x.stderr ?? '').match(/bloc modifié à la main[^\n]*/)?.[0]; S.push({ nom: 'S5 bloc d\'état altéré', ecarts: 'arrêt, code ' + x.status }); ok(n !== o.toString('utf8') && x.status === 1 && cause && !(x.stdout ?? '').includes(TOUT), 'S5 bloc d\'état altéré dans ETAT-ACTUEL.md : relais arrêté, jamais conforme', 'code ' + x.status + ' ; ' + cause); }
sabot('S6 C8 : référence inconnue, Q1 fausse', REF, () => refsJson(scelle('b'.repeat(40))), /C5a, C8/);
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

// Traces ; aucune écriture hors de ce dossier
writeFileSync(join(root, OUT, 'mesures-installees.json'), JSON.stringify({ etapes: M, refus: R, sabotages: S }, null, 1) + '\n');
rmSync(tmp, { recursive: true, force: true });
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim() && spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout.trim() === HIST && JSON.parse(readFileSync(join(root, REF), 'utf8')).checkpoint === null, 'dépôt réel : index vide, HEAD inchangé, aucune référence déclarée');
dire(ko ? ko + ' écart(s)' : 'vérification conforme');
writeFileSync(join(root, OUT, 'sortie-verification-installee.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
