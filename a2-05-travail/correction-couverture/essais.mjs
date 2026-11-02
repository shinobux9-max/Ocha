// A2-05 : essais du correctif proposé du registre de couverture (proposition, NON appliquée).
// Usage : node a2-05-travail/correction-couverture/essais.mjs <racine du dépôt>
// Copie temporaire de l'arbre, modules proposés substitués ; n'écrit rien dans le dépôt. Code 0 si tous les essais sont conformes.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, existsSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), PROP = join(W, 'correction-couverture', 'proposition');
const MODS = ['couverture-lot3.mjs', 'empreintes-lot3.mjs'];
// --apres-application : référence de non-régression = registre de départ sauvegardé (depart/, empreinte du manifeste d'application) ;
// la copie part du manifeste de HEAD (27 entrées) ; E0 et E8 contrôlent l'état réel appliqué.
const APRES = process.argv.includes('--apres-application');
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json';
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const refuse = (f, re) => { try { f(); return { ok: false, msg: 'NON REFUSÉ' }; } catch (e) { return { ok: re.test(e.message), msg: e.message.slice(0, 150) }; } };
const shaAvant = Object.fromEntries([...MODS.map((m) => 'a2-05-travail/' + m), MAN, ...Object.keys(JSON.parse(readFileSync(join(root, MAN), 'utf8')).empreintes)].map((p) => [p, sha(join(root, p))]));

const tmp = mkdtempSync(join(tmpdir(), 'ocha-cv-')); const copie = join(tmp, 'arbre');
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
for (const m of MODS) cpSync(join(PROP, m), join(copie, 'a2-05-travail', m));
const CC = join(W, 'correction-couverture'); const MA = APRES ? JSON.parse(readFileSync(join(CC, 'manifeste.json'), 'utf8')).modules : null;
const manDepart = APRES ? spawnSync('git', ['-c', 'core.autocrlf=false', 'show', 'HEAD:' + MAN], { cwd: root, encoding: 'utf8' }) : null;
if (APRES) {
  if (manDepart.status !== 0) throw new Error('git show HEAD:' + MAN + ' : code ' + manDepart.status);
  if (sha(join(CC, 'depart', 'couverture-lot3.mjs')) !== MA['couverture-lot3.mjs'].depart_sha256) throw new Error('registre de départ sauvegardé : empreinte non conforme');
  cpSync(join(CC, 'depart', 'couverture-lot3.mjs'), join(copie, 'a2-05-travail', 'couverture-lot3-depart.mjs'));
  writeFileSync(join(copie, MAN), manDepart.stdout);
}
const imp = (p) => import(pathToFileURL(p).href);
const Pc = await imp(join(copie, 'a2-05-travail', 'couverture-lot3.mjs')), Pe = await imp(join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'));
const Ps = await imp(join(copie, 'a2-05-travail', 'sync-stable.mjs'));
const Ac = await imp(APRES ? join(copie, 'a2-05-travail', 'couverture-lot3-depart.mjs') : join(W, 'couverture-lot3.mjs')); // registre de départ (ou actuel), référence de non-régression
const lire = (p) => readFileSync(join(copie, p), 'utf8'); const ecrire = (p, t) => writeFileSync(join(copie, p), t);
const avecFichier = (p, t, f) => { const ex = existsSync(join(copie, p)); const avant = ex ? lire(p) : null; ecrire(p, t); try { return f(); } finally { if (ex) ecrire(p, avant); else unlinkSync(join(copie, p)); } };

// E1 · décomptes du registre proposé
const c = Pc.couverture(copie); const t1 = c.sens.filter((s) => ['B10', 'B11', 'B12'].includes(s.livraison));
ok('E1', 'registre proposé : 172/377 arbitrés, 205 restants ; bloc B 103/148 ; T1 arbitrée', c.totaux.arbitres === 172 && c.totaux.restants === 205 && c.totaux.proposes === 0 && c.totaux.blocBArbitres === 103 && c.totaux.blocB === 148 && c.tranches.T1 === 'arbitré' && JSON.stringify(c.tranchesArbitrees) === '["T1"]',
  c.totaux.arbitres + '/377, ' + c.totaux.restants + ' restants, ' + c.totaux.proposes + ' proposés ; bloc B ' + c.totaux.blocBArbitres + '/' + c.totaux.blocB + ' ; tranches : ' + JSON.stringify(c.tranches));
ok('E2', 'les 24 sens de T1 comptés une fois, par le rapport de T1', t1.length === 24 && t1.every((s) => s.etat === 'arbitré' && s.rapport === 'T1'), t1.length + ' sens ; rapport : ' + [...new Set(t1.map((s) => s.rapport))].join(', '));
// E3 · non-régression : les 353 autres sens gardent l'état que leur donne le registre actuel ; les livraisons historiques aussi
const a = Ac.couverture(copie); const autres = c.sens.filter((s) => !t1.includes(s)); const diff = autres.filter((s) => a.sens.find((x) => x.id === s.id).etat !== s.etat);
ok('E3', 'non-régression : 353 sens hors T1 et livraisons historiques inchangés', autres.length === 353 && !diff.length && JSON.stringify(a.etats) === JSON.stringify(c.etats) && JSON.stringify(a.arbitrees) === JSON.stringify(c.arbitrees), autres.length + ' sens ; différences : ' + (diff.map((s) => s.id).join(', ') || 'aucune') + ' ; registre actuel sur la même copie : ' + a.totaux.arbitres + '/377');
// E4 · synchronisation stable sur le registre proposé
const v = Ps.calculerEtat(copie);
ok('E4', 'synchronisation stable (calculerEtat) : 172/377, 103/148, 186 corrections, 166 ENTRY, V1-12', v.arbitres === 172 && v.blocBArbitres === 103 && v.corrections === 186 && v.entry === 166 && v.libre === 'V1-12', v.arbitres + '/377, ' + v.blocBArbitres + '/148, ' + v.corrections + ', ' + v.entry + ', ' + v.libre);
// E5, E6 · manifeste : 27 empreintes intactes ; T1 et son périmètre signalés comme nouveaux, puis ajout contrôlé (copie)
const e0 = Pe.verifierEmpreintes(copie);
ok('E5', 'manifeste : 27 empreintes vérifiées ; nouveaux signalés : T1 et périmètre de T1', e0.controles === 27 && JSON.stringify([...e0.nouveaux].sort()) === JSON.stringify([R + 'T1-perimetre.md', R + 'T1.md']), e0.controles + ' ; nouveaux : ' + e0.nouveaux.join(', '));
const aj = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie, '--ajouter'], { encoding: 'utf8' });
const m1 = JSON.parse(lire(MAN)); const anciens = JSON.parse(APRES ? manDepart.stdout : readFileSync(join(root, MAN), 'utf8')).empreintes;
const e1 = Pe.verifierEmpreintes(copie); const aj2 = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie, '--ajouter'], { encoding: 'utf8' });
ok('E6', 'ajout contrôlé au manifeste (copie) : 29 entrées, les 27 anciennes inchangées ; second ajout refusé', aj.status === 0 && Object.keys(m1.empreintes).length === 29 && Object.entries(anciens).every(([p, h]) => m1.empreintes[p] === h) && !e1.nouveaux.length && aj2.status !== 0,
  'ajout : code ' + aj.status + ' ; ' + Object.keys(m1.empreintes).length + ' entrées ; second ajout : code ' + aj2.status);
// Sabotages, chacun annulé aussitôt (copie temporaire)
const T1 = R + 'T1.md', B10 = R + 'B10.md'; const t1txt = lire(T1); const fiche = t1txt.match(/^#### `v_175_s1` .*$/m)[0];
const S = [
  ['S1', 'double comptage : un rapport de B10 qui examine aussi v_175_s1 (déjà dans T1)', () => avecFichier(B10, '**Statut** : **proposition, non arbitrée.**\n\n' + fiche + '\n', () => Pc.couverture(copie)), /chevauchement|plusieurs rapports/],
  ['S2', 'omission : une fiche retirée du rapport de T1', () => avecFichier(T1, t1txt.replace(/^#### `v_175_s1` /m, '#### `v_175_sX` '), () => Pc.couverture(copie)), /absents du rapport|absent du découpage/],
  ['S3', 'chevauchement : un sens de B9 examiné aussi dans T1', () => avecFichier(T1, t1txt + '\n#### `v_8_s1` · essai\n', () => Pc.couverture(copie)), /plusieurs rapports|range en/],
  ['S4', 'sens inconnu dans T1', () => avecFichier(T1, t1txt + '\n#### `v_99999_s1` · essai\n', () => Pc.couverture(copie)), /absent du découpage/],
  ['S5', 'statut illisible du rapport de T1', () => avecFichier(T1, t1txt.replace(/^\*\*Statut\*\* : .*$/m, '**Statut** : en cours'), () => Pc.couverture(copie)), /statut illisible/],
  ['S6', 'rapport historique modifié (B9)', () => avecFichier(R + 'B9.md', lire(R + 'B9.md') + ' ', () => Pe.verifierEmpreintes(copie)), /empreinte modifiée/],
];
for (const [id, nom, f, re] of S) { const r = refuse(f, re); ok(id, 'sabotage refusé : ' + nom, r.ok, r.msg); }
// S7 · un rapport de tranche proposé compte en « proposé », jamais en « arbitré »
const s7 = avecFichier(T1, t1txt.replace(/^\*\*Statut\*\* : .*$/m, '**Statut** : **proposition, non arbitrée.** Essai.'), () => Pc.couverture(copie).totaux);
ok('S7', 'rapport de tranche proposé : compté en proposé, non en arbitré', s7.arbitres === 148 && s7.proposes === 24, s7.arbitres + ' arbitrés, ' + s7.proposes + ' proposés');
// E7 · innocuité : modules réels, manifeste réel et 27 rapports arbitrés du dépôt inchangés
const modifies = Object.entries(shaAvant).filter(([p, h]) => sha(join(root, p)) !== h).map(([p]) => p);
ok('E7', 'modules réels, manifeste réel et 27 rapports du dépôt inchangés', !modifies.length, modifies.join(', ') || 'inchangés');
if (APRES) {
  // E0 · modules réels = versions proposées, empreintes du manifeste d'application
  const e0m = MODS.filter((m) => sha(join(W, m)) !== MA[m].final_sha256 || sha(join(W, m)) !== sha(join(PROP, m)));
  ok('E0', 'modules réels identiques aux versions proposées (empreintes finales du manifeste d\'application)', !e0m.length, e0m.join(', ') || MODS.map((m) => m + ' ' + MA[m].final_sha256.slice(0, 12) + '…').join(' ; '));
  // E8 · manifeste réel : 29 entrées, les 27 de HEAD inchangées, un seul ajout (T1 et son périmètre), tout vérifié sans nouveau
  const mr = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const h = JSON.parse(manDepart.stdout).empreintes; const Pr = await imp(join(W, 'empreintes-lot3.mjs')); const vr = Pr.verifierEmpreintes(root);
  const ajoutes = Object.keys(mr.empreintes).filter((p) => !(p in h)).sort();
  ok('E8', 'manifeste réel : 29 entrées, les 27 de HEAD inchangées, ajout de T1 et de son périmètre, 29 vérifiées, aucun nouveau', Object.keys(h).length === 27 && Object.keys(mr.empreintes).length === 29 && Object.entries(h).every(([p, x]) => mr.empreintes[p] === x) && JSON.stringify(ajoutes) === JSON.stringify([R + 'T1-perimetre.md', R + 'T1.md']) && (mr.ajouts ?? []).length === 1 && vr.controles === 29 && !vr.nouveaux.length,
    Object.keys(mr.empreintes).length + ' entrées ; ajoutés : ' + ajoutes.join(', ') + ' ; ajouts : ' + (mr.ajouts ?? []).length + ' ; vérifiées : ' + vr.controles + ' ; nouveaux : ' + vr.nouveaux.length);
}
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id.padEnd(3) + ' ' + r.nom + ' : ' + r.detail);
const n = res.filter((r) => !r.ok).length; console.log('\n' + (res.length - n) + ' conformes sur ' + res.length); process.exitCode = n ? 1 : 0;
