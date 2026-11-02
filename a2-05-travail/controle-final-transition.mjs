// A2-05 : contrôle final de la transition vers l'outillage v2 (étape 4 du plan de transition ; EN PROPOSITION, non exécuté).
// Usage : node a2-05-travail/controle-final-transition.mjs <racine du dépôt>              → affiche le plan, n'exécute rien
//         node a2-05-travail/controle-final-transition.mjs <racine du dépôt> --executer   → exécute, SUR AUTORISATION seulement
// N'écrit rien dans le dépôt : toute sortie des outils va dans un dossier temporaire, supprimé à la fin. N'ouvre aucune fiche pour
// la juger, n'attribue aucun verdict, ne produit aucun périmètre livrable : l'essai à blanc de T1 ne rend que des contrôles et des nombres.
// Code de sortie : 0 si tous les contrôles sont conformes ; 1 sinon ; 2 si non exécuté (plan seul).
import { readFileSync, existsSync, mkdtempSync, rmSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const PLAN = [
  ['CF-1', 'couverture des 377 : aucune omission ni doublon ; 148 arbitrés, 229 restants ; T1 = B10, B11, B12 = 24 sens distincts, tous restants'],
  ['CF-2', 'protections historiques : 27 empreintes ; les 27 rapports arbitrés identiques à leur version du commit 78031638 ; réécriture du manifeste refusée'],
  ['CF-3', 'non-régression, sabotages et séparation des niveaux : essais-outillage-v2.mjs relancé sur une copie temporaire de l\'arbre ; code 0 ; rapport d\'essais identique à celui du dépôt'],
  ['CF-4', 'identifiants : correspondance canonique de toutes les ENTRY publiées ; v_718 → hj_v_1, v_719 → hj_v_2'],
  ['CF-5', 'essai à blanc de T1, générateur de périmètres : sortie temporaire, supprimée ; 24 sens ; règles du criblage toutes définies ; décisions toutes validées ; comparables comptés ; refus d\'écrire sur un périmètre arbitré'],
  ['CF-6', 'essai à blanc de T1, module v2 : résolution des 24 sens (sens, ENTRY, source canonique, fiche, candidat, hors des 147, décisions validées) ; refus sans fiches d\'examen ; refus d\'écrire sur un rapport arbitré'],
  ['CF-7', 'synchronisation stable : recalcul en mémoire idempotent ; décomptes 148/377, 79/148, 185, 165, V1-11 ; relais allégé (contrôle --apres-application)'],
  ['CF-8', 'socle : run.mjs verify ; run.mjs assemble (sans --write) ; suite de tests ; check-layers ; git diff --check ; zones protégées non modifiées'],
  ['CF-9', 'aucun des 27 rapports arbitrés modifié par le contrôle lui-même'],
];
if (!process.argv.includes('--executer')) {
  console.log('Contrôle final de transition (étape 4) : PLAN SEUL, rien n\'est exécuté. Contrôles prévus :');
  for (const [id, t] of PLAN) console.log('  ' + id + ' · ' + t);
  console.log('Exécution : --executer, sur autorisation explicite seulement.'); process.exit(2);
}

const ici = dirname(fileURLToPath(import.meta.url));
const imp = (m) => import('file:///' + join(ici, m).split(String.fromCharCode(92)).join('/'));
const { couverture } = await imp('couverture-lot3.mjs');
const { verifierEmpreintes, MANIFESTE } = await imp('empreintes-lot3.mjs');
const { produire, correspondance } = await imp('lot3-commun-v2.mjs');
const { produirePerimetre } = await imp('perimetre-v2.mjs');
const { calculerEtat, planifier } = await imp('sync-stable.mjs');
const lire = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const run = (cmd, args, cwd = root) => { const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const shaF = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const refuse = (f, re) => { try { f(); return { ok: false, msg: 'NON REFUSÉ' }; } catch (e) { return { ok: re.test(e.message), msg: e.message.slice(0, 160) }; } };
const tmp = mkdtempSync(join(tmpdir(), 'ocha-cf-'));
const protegesAvant = run('git', ['status', '--porcelain', '--', 'data', 'reconstruction', 'tools', 'tests', 'docs/conception']).out;
const manifeste = JSON.parse(lire(MANIFESTE)).empreintes;
const shaAvant = Object.fromEntries(Object.keys(manifeste).map((p) => [p, shaF(join(root, p))]));
try {
  // CF-1
  const cov = couverture(root);
  const T1 = JSON.parse(lire('a2-05-travail/registre-tranches.json')).tranches.find((t) => t.id === 'T1');
  const ids = cov.sens.filter((s) => T1.livraisons.includes(s.livraison)).map((s) => s.id);
  ok('CF-1', 'couverture et T1', cov.totaux.arbitres === 148 && cov.totaux.restants === 229 && T1.livraisons.join() === 'B10,B11,B12' && ids.length === 24 && new Set(ids).size === 24 && ids.every((id) => cov.sens.find((s) => s.id === id).etat === 'restant'),
    cov.totaux.arbitres + ' arbitrés, ' + cov.totaux.restants + ' restants ; T1 : ' + ids.length + ' sens (' + T1.livraisons.join(', ') + ')');
  // CF-2
  const emp = verifierEmpreintes(root);
  const diffHist = run('git', ['diff', '--quiet', '78031638', '--', ...Object.keys(manifeste)]);
  const reecr = run('node', [join(ici, 'empreintes-lot3.mjs'), root, '--ecrire']);
  ok('CF-2', 'protections historiques', emp.controles === 27 && diffHist.code === 0 && reecr.code !== 0 && /ne se réécrit pas/.test(reecr.out),
    emp.controles + ' empreintes ; git diff 78031638 sur les 27 : code ' + diffHist.code + ' ; réécriture du manifeste : code ' + reecr.code);
  // CF-3 : copie temporaire de l'arbre (data, docs, reconstruction, tools, a2-05-travail), puis essais sur la copie
  const copie = join(tmp, 'arbre'); for (const d of ['data', 'docs', 'reconstruction', 'tools', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
  const RE = 'docs/rapports/etape2-A2-05-outillage-essais.md'; const shaEssais = shaF(join(root, RE));
  const ess = run('node', [join(ici, 'essais-outillage-v2.mjs'), copie]);
  const identique = existsSync(join(copie, RE)) && readFileSync(join(copie, RE), 'utf8') === readFileSync(join(root, RE), 'utf8');
  ok('CF-3', 'non-régression, sabotages, séparation des niveaux (copie temporaire)', ess.code === 0 && identique && shaF(join(root, RE)) === shaEssais,
    'essais : code ' + ess.code + ' ; rapport d\'essais ' + (identique ? 'identique' : 'DIFFÉRENT') + ' à celui du dépôt ; rapport du dépôt inchangé');
  // CF-4
  const { canon, srcById, journal } = correspondance(root);
  const vocab = [...JSON.parse(lire('data/n5/vocab.json')), ...JSON.parse(lire('data/vocab-hors-jlpt.json'))];
  const sansSource = vocab.filter((e) => !canon.has(e.id)).map((e) => e.id);
  ok('CF-4', 'identifiants canoniques', !sansSource.length && canon.get('v_718') === 'hj_v_1' && canon.get('v_719') === 'hj_v_2', vocab.length + ' ENTRY publiées ; sans source : ' + (sansSource.join(', ') || 'aucune'));
  // CF-5 : générateur de périmètres, à blanc
  const sortieP = join(tmp, 'T1-perimetre-a-blanc.md');
  const p = produirePerimetre({ root, nom: 'T1', livraisons: T1.livraisons, date: 'essai à blanc', autorisation: 'essai à blanc du contrôle final de transition ; non livrable', sortie: sortieP });
  rmSync(sortieP, { force: true });
  const perArb = Object.keys(manifeste).find((k) => k.endsWith('-perimetre.md') && k !== 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
  const refP = refuse(() => produirePerimetre({ root, nom: 'T1', livraisons: T1.livraisons, date: 'x', autorisation: 'x', sortie: perArb }), /protégé par le manifeste/);
  ok('CF-5', 'essai à blanc de T1 : générateur de périmètres', p.sens === 24 && refP.ok && !existsSync(sortieP),
    p.sens + ' sens, ' + p.entry + ' ENTRY, ' + p.regles.length + ' règles (toutes définies), ' + p.cites + ' comparables nommés, ' + p.memes + ' de même catégorie, ' + p.autresLiv + ' d\'autres livraisons, ' + p.blocF.length + ' du bloc F, ' + p.corrections.length + ' correction(s) retenue(s), ' + p.risques + ' risque(s) relevé(s) ; sortie temporaire supprimée ; refus sur ' + perArb + ' : ' + (refP.ok ? 'oui' : refP.msg));
  // CF-6 : module v2, à blanc (aucune fiche d'examen, aucun verdict)
  const crib = new Map(JSON.parse(lire('a2-05-travail/criblage/resultat.json')).candidats.map((c) => [c.id, c]));
  const mauvais = ids.filter((id) => { const eid = id.replace(/_s\d+$/, ''); const e = vocab.find((x) => x.id === eid); const s = e?.senses.find((x) => x.id === id); const sid = canon.get(eid); const c = crib.get(id);
    return !e || !s || !sid || !srcById.has(sid) || !c || c.dans147.length || journal.filter((d) => d.entry === sid).some((d) => d.status !== 'validated'); });
  const refF = refuse(() => produire({ root, nom: 'T1', livraisons: T1.livraisons, IDS: ids, F: {}, sortie: join(tmp, 'T1-v2.md') }), /fiche d'examen absente/);
  const rapArb = Object.keys(manifeste).find((k) => /-lot3-B9\.md$/.test(k));
  const refR = refuse(() => produire({ root, nom: 'T1', livraisons: T1.livraisons, IDS: ids, F: {}, sortie: rapArb }), /protégé par le manifeste/);
  ok('CF-6', 'essai à blanc de T1 : module v2', !mauvais.length && refF.ok && refR.ok && !existsSync(join(tmp, 'T1-v2.md')),
    '24 sens résolus' + (mauvais.length ? ' SAUF ' + mauvais.join(', ') : '') + ' ; sans fiches : ' + (refF.ok ? 'refusé' : refF.msg) + ' ; écriture sur ' + rapArb + ' : ' + (refR.ok ? 'refusée' : refR.msg));
  // CF-7
  const plan = planifier(root, { commit: '7803163' }); const v = calculerEtat(root);
  const idem = Object.values(plan.sorties).every((s) => s.avant === s.apres);
  const rel = run('node', [join(ici, 'controle-relais-allege.mjs'), root, '--apres-application']);
  ok('CF-7', 'synchronisation stable et relais allégé', idem && v.arbitres === 148 && v.blocBArbitres === 79 && v.blocB === 148 && v.corrections === 185 && v.entry === 165 && v.libre === 'V1-11' && rel.code === 0,
    'idempotent : ' + idem + ' ; ' + v.arbitres + '/377, ' + v.blocBArbitres + '/' + v.blocB + ', ' + v.corrections + ', ' + v.entry + ', ' + v.libre + ' ; relais : ' + rel.out.split('\n').at(-1) + ' (code ' + rel.code + ')');
  // CF-8
  const ver = run('node', ['tools/reconstruction/run.mjs', 'verify']); const asm = run('node', ['tools/reconstruction/run.mjs', 'assemble']);
  const tests = run('node', ['--test', 'tests/**/*.test.js']); const lay = run('node', ['tools/check-layers.mjs']); const chk = run('git', ['diff', '--check']);
  const protegesApres = run('git', ['status', '--porcelain', '--', 'data', 'reconstruction', 'tools', 'tests', 'docs/conception']).out;
  ok('CF-8', 'socle', ver.code === 0 && asm.code === 0 && /684 ENTRY/.test(asm.out) && tests.code === 0 && lay.code === 0 && chk.code === 0 && protegesAvant === '' && protegesApres === '',
    'verify ' + ver.code + ' ; assemble ' + asm.code + ' (' + (asm.out.match(/\d+ ENTRY[^\n]*/) ?? ['?'])[0] + ') ; tests ' + tests.code + ' (' + (tests.out.match(/ℹ pass \d+/) ?? ['?'])[0] + ') ; check-layers ' + lay.code + ' ; git diff --check ' + chk.code + ' ; zones protégées : ' + (protegesApres || 'intactes'));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
const modifies = Object.entries(shaAvant).filter(([p, h]) => shaF(join(root, p)) !== h).map(([p]) => p);
ok('CF-9', 'aucun rapport arbitré modifié par le contrôle', !modifies.length, modifies.join(', ') || '27 inchangés');
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id.padEnd(5) + ' ' + r.nom + ' : ' + r.detail);
const n = res.filter((r) => !r.ok).length; console.log('\n' + (res.length - n) + ' conformes sur ' + res.length); process.exitCode = n ? 1 : 0;
