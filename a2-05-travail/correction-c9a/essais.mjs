// A2-05 : essais de la résolution proposée de C9a, option A (proposition, NON appliquée).
// Usage : node a2-05-travail/correction-c9a/essais.mjs <racine du dépôt>
// Copie temporaire de l'arbre (dépôt git jetable dont HEAD porte le manifeste de HEAD réel) ; versions proposées d'empreintes-lot3.mjs et de
// controle-relais-allege.mjs substituées ; contrôle actuel gardé à côté pour comparaison. États d'une tranche (T2) : périmètre proposé,
// périmètre accepté seul, rapport proposé, tranche arbitrée, et leurs transitions ; refus : rapport sans périmètre protégé, doublons,
// omissions, entrée étrangère, changements d'état incohérents. Le rapport de T2 de la copie est SYNTHÉTIQUE (statut et titres seulement,
// aucun verdict). N'écrit rien dans le dépôt. Code 0 si tous les essais sont conformes.
// Mode --apres-application (résolution appliquée le 2026-10-22) : références indépendantes = sauvegarde de départ (correction-c9a/depart/ :
// contrôle d'avant, manifeste à 29 entrées, point de départ de la copie) ; E0 (modules réels = versions proposées ; départ = empreintes relues)
// et E10 (dépôt réel : 30 entrées, 29 inchangées, périmètre de T2 seul ajouté ; C9a conforme ; nouvel --ajouter refusé sans écriture).
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), CA = join(W, 'correction-c9a');
const MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const PER = R + 'T2-perimetre.md', RAP = R + 'T2.md';
const shaT = (t) => createHash('sha256').update(t).digest('hex'); const sha = (f) => shaT(readFileSync(f));
const arbre = (d) => readdirSync(d).flatMap((x) => { const p = join(d, x); return statSync(p).isDirectory() ? arbre(p) : [p]; });
const empreinteArbre = (dirs) => shaT(dirs.flatMap((d) => arbre(join(root, d))).sort().map((p) => relative(root, p) + ':' + sha(p)).join('\n'));
const PROTEGES = ['data', 'reconstruction', 'tests', 'tools', 'docs/conception'];
const SURVEILLES = [MAN, PER, 'a2-05-travail/empreintes-lot3.mjs', 'a2-05-travail/controle-relais-allege.mjs', 'a2-05-travail/perimetre-v2.mjs', 'a2-05-travail/registre-tranches.json', 'ETAT-ACTUEL.md', 'ROADMAP.md'];
const avant = { arbre: empreinteArbre(PROTEGES), fichiers: Object.fromEntries(SURVEILLES.map((p) => [p, sha(join(root, p))])), rap: existsSync(join(root, RAP)) };
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const APRES = process.argv.includes('--apres-application'); const DEP = join(CA, 'depart');
if (APRES) {
  const mc = JSON.parse(readFileSync(join(CA, 'manifeste.json'), 'utf8'));
  const id = Object.entries(mc.modules).map(([m, e]) => [m, sha(join(W, m)) === e.final_sha256 && sha(join(CA, 'proposition', m)) === e.final_sha256 && sha(join(DEP, m)) === e.depart_sha256]);
  ok('E0', 'modules réels = versions proposées relues ; sauvegarde de départ = empreintes de départ relues ; manifeste de départ sauvegardé (29 entrées)', id.every(([, x]) => x) && sha(join(DEP, 'empreintes-rapports-arbitres.json')) === mc.manifeste_empreintes_depart_sha256 && Object.keys(JSON.parse(readFileSync(join(DEP, 'empreintes-rapports-arbitres.json'), 'utf8')).empreintes).length === 29, id.map(([m, x]) => m + (x ? ' conforme' : ' ÉCART')).join(' ; '));
}

// Copie et dépôt git jetable : HEAD porte le manifeste de HEAD réel (27 empreintes), l'arbre de travail le manifeste réel (29)
const tmp = mkdtempSync(join(tmpdir(), 'ocha-c9a-')); const copie = join(tmp, 'arbre');
for (const f of ['CLAUDE.md', 'ETAT-ACTUEL.md', 'ROADMAP.md', 'REGLES-CONSTRUCTION.md']) cpSync(join(root, f), join(copie, f));
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'tests', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
const g = (...a) => spawnSync('git', ['-c', 'user.name=essai', '-c', 'user.email=essai@invalid', '-c', 'core.autocrlf=false', ...a], { cwd: copie, encoding: 'utf8' });
const headMan = spawnSync('git', ['show', 'HEAD:' + MAN], { cwd: root, encoding: 'utf8' }).stdout;
const lire = (p) => readFileSync(join(copie, p), 'utf8'); const ecrire = (p, t) => writeFileSync(join(copie, p), t);
const manReel = APRES ? readFileSync(join(DEP, 'empreintes-rapports-arbitres.json'), 'utf8') : lire(MAN); ecrire(MAN, headMan); g('init', '-q'); g('add', MAN); g('commit', '-q', '-m', 'HEAD de essai'); ecrire(MAN, manReel);
cpSync(join(APRES ? DEP : W, 'controle-relais-allege.mjs'), join(copie, 'a2-05-travail', 'controle-relais-allege-actuel.mjs'));
for (const m of ['empreintes-lot3.mjs', 'controle-relais-allege.mjs']) cpSync(join(CA, 'proposition', m), join(copie, 'a2-05-travail', m));

// Outils : C9a d'un contrôle (proposé ou actuel), ajout contrôlé, états de T2, restauration
const c9a = (actuel = false) => { const s = spawnSync('node', [join(copie, 'a2-05-travail', actuel ? 'controle-relais-allege-actuel.mjs' : 'controle-relais-allege.mjs'), copie, '--apres-application'], { encoding: 'utf8', maxBuffer: 1 << 26 });
  const l = (s.stdout.match(/^(conforme|ÉCART) +C9a .*$/m) ?? [])[0]; return { conforme: !!l && l.startsWith('conforme'), ligne: l ?? ('aucune ligne C9a, code ' + s.status + ' : ' + s.stderr.split('\n').find((x) => /^\w*Error: /.test(x))) }; };
const ajouter = () => { const s = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie, '--ajouter'], { encoding: 'utf8' }); return { code: s.status, msg: (s.stdout + (s.stderr.split('\n').find((x) => /^\w*Error: /.test(x)) ?? '')).trim() }; };
const verifier = () => { const s = spawnSync('node', [join(copie, 'a2-05-travail', 'empreintes-lot3.mjs'), copie], { encoding: 'utf8' }); return { code: s.status, msg: (s.stdout + (s.stderr.split('\n').find((x) => /^\w*Error: /.test(x)) ?? '')).trim() }; };
const perAccepte = lire(PER);
if (!/^\*\*Statut\*\* : \*\*périmètre accepté le /m.test(perAccepte)) throw new Error('le périmètre de T2 n\'est pas accepté : essais sans objet');
const perPropose = perAccepte.replace(/^\*\*Statut\*\* : \*\*périmètre accepté le [^\n]*$/m, '**Statut** : **proposition, non acceptée.** (essai)');
const idsT2 = [...lire(R + 'perimetre.md').matchAll(/^\| \d+ \| B1[34] \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => m[1]);
if (idsT2.length !== 21) throw new Error('T2 : 21 sens attendus dans le découpage, lus ' + idsT2.length);
const rapport = (statut) => ['# Essai synthétique (copie temporaire) : rapport de T2, sans verdict', '', '**Statut** : **' + statut + '**', '', ...idsT2.map((id) => '#### `' + id + '` · essai synthétique\n')].join('\n');
const RAP_PROPOSE = rapport('proposition, non arbitrée.'), RAP_ARBITRE = rapport('arbitré le 2026-10-30 (essai)');
const reinit = () => { ecrire(MAN, manReel); ecrire(PER, perAccepte); if (existsSync(join(copie, RAP))) rmSync(join(copie, RAP)); };
const man = () => JSON.parse(lire(MAN)); const ecrireMan = (m) => ecrire(MAN, JSON.stringify(m, null, 1) + '\n');
const m29 = JSON.parse(manReel); const anciennes = (m) => Object.entries(m29.empreintes).every(([p, h]) => m.empreintes[p] === h) && JSON.stringify(Object.keys(m.empreintes).slice(0, 29)) === JSON.stringify(Object.keys(m29.empreintes));
const shaC = (p) => sha(join(copie, p));
const scenario = (f) => { reinit(); try { return f(); } finally { reinit(); } };

// E1 · témoin : état réel (périmètre accepté de T2 hors du manifeste) ; les deux contrôles le refusent (incident C9a reproduit)
scenario(() => { const p = c9a(), a = c9a(true); ok('E1', 'témoin, état réel : périmètre accepté hors du manifeste → C9a refuse (proposé et actuel : incident reproduit)', !p.conforme && /arbitrés hors manifeste : docs\/rapports\/etape2-A2-05-volet1-lot3-T2-perimetre\.md/.test(p.ligne) && !a.conforme, 'proposé : ' + p.ligne.slice(0, 9) + ' ; actuel : ' + a.ligne.slice(0, 9)); });

// E2, E3 · état « périmètre proposé » : rien à protéger ; l'ajout contrôlé n'ajoute rien
scenario(() => { ecrire(PER, perPropose); const p = c9a(), a = c9a(true), x = ajouter();
  ok('E2', 'périmètre proposé, manifeste à 29 → C9a conforme (proposé et actuel)', p.conforme && a.conforme && Object.keys(man().empreintes).length === 29, p.ligne.slice(0, 160));
  ok('E3', 'périmètre proposé : --ajouter refuse (aucun rapport arbitré à ajouter), manifeste inchangé', x.code !== 0 && /aucun rapport arbitré à ajouter/.test(x.msg) && lire(MAN) === manReel, 'code ' + x.code + ' : ' + x.msg.slice(0, 100)); });

// E4 à E7 · transitions : périmètre accepté seul → ajouté (30) → rapport proposé (30) → tranche arbitrée hors manifeste (refus) → ajoutée (31)
scenario(() => {
  const x = ajouter(); const m = man(); const p = c9a(), a = c9a(true), v = verifier();
  ok('E4', 'périmètre accepté seul : --ajouter l\'inscrit seul → 30 entrées, les 29 inchangées (valeurs et ordre), C9a conforme ; le contrôle actuel le refuse (paires)', x.code === 0 && Object.keys(m.empreintes).length === 30 && anciennes(m) && m.empreintes[PER] === shaC(PER) && JSON.stringify(m.ajouts.at(-1).chemins) === JSON.stringify([PER]) && p.conforme && !a.conforme && v.code === 0 && !/hors du manifeste/.test(v.msg),
    'ajout : ' + x.msg.slice(0, 90) + ' ; proposé : ' + p.ligne.slice(0, 9) + ' ; actuel : ' + a.ligne.slice(0, 9) + ' ; vérification : ' + v.msg);
  ecrire(RAP, RAP_PROPOSE); const p5 = c9a(), x5 = ajouter();
  ok('E5', 'transition : rapport de T2 proposé (périmètre protégé) → C9a conforme, 30 entrées ; --ajouter n\'ajoute rien', p5.conforme && Object.keys(man().empreintes).length === 30 && x5.code !== 0, p5.ligne.slice(0, 130));
  ecrire(RAP, RAP_ARBITRE); const p6 = c9a();
  ok('E6', 'transition : tranche arbitrée, rapport pas encore protégé → C9a refuse (omission)', !p6.conforme && /T2\.md/.test(p6.ligne), p6.ligne.slice(Math.max(0, p6.ligne.search(/ ; (anomalies|arbitrés hors)|aucune ligne/))).slice(0, 220));
  const x7 = ajouter(); const m7 = man(); const p7 = c9a();
  ok('E7', 'transition : --ajouter inscrit le rapport arbitré seul → 31 entrées, les 30 précédentes inchangées, C9a conforme', x7.code === 0 && Object.keys(m7.empreintes).length === 31 && anciennes(m7) && m7.empreintes[PER] === m.empreintes[PER] && JSON.stringify(m7.ajouts.map((y) => y.chemins.length)) === '[2,1,1]' && m7.ajouts.at(-1).chemins[0] === RAP && p7.conforme,
    'ajouts : ' + m7.ajouts.map((y) => y.date + ' (' + y.chemins.map((c) => c.slice(c.lastIndexOf('lot3-') + 5)).join(', ') + ')').join(' ; ') + ' ; ' + p7.ligne.slice(0, 9));
});

// E8 · transition directe : périmètre accepté et rapport arbitré, tous deux hors du manifeste → un seul ajout (cas de T1) → 31, conforme
scenario(() => { ecrire(RAP, RAP_ARBITRE); const x = ajouter(); const m = man(); const p = c9a();
  ok('E8', 'tranche arbitrée sans aucune protection : --ajouter inscrit la paire en un ajout → 31 entrées, 29 inchangées, C9a conforme', x.code === 0 && Object.keys(m.empreintes).length === 31 && anciennes(m) && m.ajouts.at(-1).chemins.length === 2 && p.conforme, x.msg.slice(0, 160) + ' ; ' + p.ligne.slice(0, 9)); });

// Refus : chaque sabotage sur une copie restaurée ensuite
const ajoutEntree = (m, p, h = shaC(p), date = '2026-10-22') => { m.empreintes[p] = h; m.ajouts.push({ date, chemins: [p] }); return m; };
const refus = (id, nom, prep, re) => scenario(() => { prep(); const p = c9a(); ok(id, 'refus : ' + nom, !p.conforme && (!re || re.test(p.ligne)), p.ligne.slice(Math.max(0, p.ligne.search(/ ; (anomalies|arbitrés hors|altérées)|aucune ligne/))).slice(0, 240)); });
refus('R1', 'rapport arbitré protégé sans son périmètre (périmètre accepté, hors du manifeste)', () => { ecrire(RAP, RAP_ARBITRE); ecrireMan(ajoutEntree(man(), RAP)); }, /rapport arbitré sans son périmètre protégé/);
scenario(() => { ecrire(PER, perPropose); ecrire(RAP, RAP_ARBITRE); const x = ajouter();
  ok('R2', 'refus : --ajouter d\'un rapport arbitré dont le périmètre n\'est pas protégé (périmètre proposé) ; rien n\'est écrit', x.code !== 0 && /ajout refusé, rien n'est écrit : .*sans son périmètre protégé/.test(x.msg) && lire(MAN) === manReel, 'code ' + x.code + ' : ' + x.msg.slice(0, 200)); });
refus('R3', 'clé en double dans le texte du manifeste', () => { ajouter(); const t = lire(MAN); const l = t.split('\n').find((x) => x.includes('"' + PER + '": "')); ecrire(MAN, t.replace(l, l.replace(/,?$/, ',') + '\n' + l)); JSON.parse(lire(MAN)); }, /clé en double/); // JSON valide, clé répétée
refus('R4', 'chemin inscrit deux fois dans les ajouts', () => { ajouter(); const m = man(); m.ajouts.push({ date: '2026-10-22', chemins: [PER] }); ecrireMan(m); }, /inscrit deux fois/);
refus('R5', 'omission : ajout d\'un chemin absent des empreintes', () => { ajouter(); const m = man(); m.ajouts.push({ date: '2026-10-22', chemins: [RAP] }); ecrireMan(m); }, /absent des empreintes/);
refus('R6', 'omission : rapport arbitré hors du manifeste alors que son périmètre y est', () => { ajouter(); ecrire(RAP, RAP_ARBITRE); }, /rapport arbitré hors du manifeste, alors que son périmètre y est/);
refus('R7', 'fichier étranger inscrit (bilan du volet 2)', () => { ajouter(); ecrireMan(ajoutEntree(man(), 'docs/rapports/etape2-A2-05-bilan-volet2.md')); }, /entrée étrangère/);
refus('R8', 'entrée nouvelle non inscrite dans les ajouts', () => { const m = man(); m.empreintes[PER] = shaC(PER); ecrireMan(m); }, /non inscrite dans les ajouts/);
refus('R9', 'état incohérent : périmètre protégé avec le statut « proposition » (empreinte recalculée)', () => { ecrire(PER, perPropose); ecrireMan(ajoutEntree(man(), PER)); }, /sans le statut « périmètre accepté le »/);
refus('R10', 'état incohérent : périmètre protégé puis repassé en proposition (empreinte changée)', () => { ajouter(); ecrire(PER, perPropose); }, null);
refus('R11', 'état incohérent : rapport inscrit avant son périmètre', () => { ecrire(RAP, RAP_ARBITRE); const m = man(); ajoutEntree(m, RAP); ajoutEntree(m, PER); ecrireMan(m); }, /inscrit avant son périmètre/);
refus('R12', 'ajouts datés hors d\'ordre', () => { ecrireMan(ajoutEntree(man(), PER, undefined, '2026-10-19')); }, /dates hors d'ordre/);
refus('R13', 'une des 29 empreintes existantes altérée', () => { ajouter(); const m = man(); const k = Object.keys(m.empreintes)[3]; m.empreintes[k] = '0'.repeat(64); ecrireMan(m); }, null);
refus('R14', 'rapport protégé sans le statut « arbitré le » (rapport proposé inscrit)', () => { ajouter(); ecrire(RAP, RAP_PROPOSE); ecrireMan(ajoutEntree(man(), RAP)); }, /rapport protégé sans le statut « arbitré le »/);

// S0 · témoin après les sabotages : copie revenue à l'état réel, même résultat que E1
const s0 = c9a(); ok('S0', 'témoin final : copie restaurée (manifeste et périmètre identiques au dépôt), même refus que E1', lire(MAN) === manReel && lire(PER) === perAccepte && !existsSync(join(copie, RAP)) && !s0.conforme && /arbitrés hors manifeste/.test(s0.ligne), s0.ligne.slice(0, 9));

// E10 · dépôt réel, après application et ajout : 30 entrées, 29 inchangées (valeurs et ordre), T2-perimetre seul ajouté, daté ;
// C9a du dépôt conforme ; un nouvel --ajouter est refusé et n'écrit rien (idempotence)
if (APRES) {
  const md = JSON.parse(readFileSync(join(DEP, 'empreintes-rapports-arbitres.json'), 'utf8')), mr = JSON.parse(readFileSync(join(root, MAN), 'utf8'));
  const kd = Object.keys(md.empreintes), kr = Object.keys(mr.empreintes); const brut = readFileSync(join(root, MAN));
  const s = spawnSync('node', [join(W, 'controle-relais-allege.mjs'), root, '--apres-application'], { encoding: 'utf8', maxBuffer: 1 << 26 }); const l = (s.stdout.match(/^(conforme|ÉCART) +C9a .*$/m) ?? [''])[0];
  const x = spawnSync('node', [join(W, 'empreintes-lot3.mjs'), root, '--ajouter'], { encoding: 'utf8' }); const inchange = Buffer.compare(brut, readFileSync(join(root, MAN))) === 0;
  ok('E10', 'dépôt réel : 30 entrées, les 29 de départ inchangées (valeurs et ordre), seul le périmètre de T2 ajouté (empreinte du fichier, ajout daté seul) ; C9a conforme ; nouvel --ajouter refusé sans écriture',
    kr.length === 30 && kd.every((k, i) => kr[i] === k && mr.empreintes[k] === md.empreintes[k]) && kr[29] === PER && mr.empreintes[PER] === sha(join(root, PER)) && JSON.stringify(mr.ajouts.at(-1).chemins) === JSON.stringify([PER]) && mr.ajouts.length === md.ajouts.length + 1 && !existsSync(join(root, RAP)) && l.startsWith('conforme') && s.status === 0 && x.status !== 0 && /aucun rapport arbitré à ajouter/.test(x.stderr) && inchange,
    kr.length + ' entrées ; ajout ' + mr.ajouts.at(-1).date + ' : ' + mr.ajouts.at(-1).chemins.map((c) => c.slice(c.lastIndexOf('lot3-') + 5)).join(', ') + ' ; relais code ' + s.status + ', C9a ' + l.slice(0, 9).trim() + ' ; --ajouter code ' + x.status + ', manifeste ' + (inchange ? 'inchangé' : 'MODIFIÉ'));
}

// E9 · dépôt réel inchangé
const apres = { arbre: empreinteArbre(PROTEGES), fichiers: Object.fromEntries(SURVEILLES.map((p) => [p, sha(join(root, p))])), rap: existsSync(join(root, RAP)) };
ok('E9', 'dépôt inchangé (data, reconstruction, tests, tools, docs/conception ; manifeste ; périmètre de T2 ; modules ; registre ; pilotage ; aucun rapport de T2)', JSON.stringify(avant) === JSON.stringify(apres) && !apres.rap, SURVEILLES.length + ' fichiers et ' + PROTEGES.length + ' arbres comparés');

rmSync(tmp, { recursive: true, force: true });
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id.padEnd(4) + ' ' + r.nom + (r.detail ? ' : ' + r.detail : ''));
const n = res.filter((r) => r.ok).length; console.log(n + ' conformes sur ' + res.length); process.exit(n === res.length ? 0 : 1);
