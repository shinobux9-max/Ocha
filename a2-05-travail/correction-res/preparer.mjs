// A2-05 : préparation de la correction technique du défaut « RES » (voie A, recommandée le 2026-11-01), EN PROPOSITION : le générateur réel n'est pas modifié.
// Usage : node a2-05-travail/correction-res/preparer.mjs <racine du dépôt>
// Une ligne du générateur : le motif de lecture reconnaît aussi RES, littéralement. Aucune règle linguistique nouvelle ; découpage et criblage inchangés. Conséquence : le
// recalcul de T9 fixe l'empreinte du générateur, sa constante et son libellé suivent. Essais dans un clone jetable, l'ancien générateur gardé à côté : non-régression de toutes les
// tranches et livraisons, T9 comparée hors RES, refus maintenus, contrôles en service, sur l'état actuel et sur l'état consolidé simulé. Sorties dans correction-res/, seulement
// sans écart ; refus si proposition/ existe. Dépôt réel inchangé. Les périmètres acceptés ne se régénèrent pas : le rapport de T9 accepté reste tel quel.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'correction-res/', GEN = W + 'perimetre-v2.mjs', REC = W + 'recalcul-T9-perimetre.mjs', CRB = W + 'criblage/resultat.json', REG = W + 'registre-tranches.json', MAN = W + 'empreintes-rapports-arbitres.json';
const DEC = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', RT8 = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md', CONS = W + 'arbitrage-T9/consolidation/', APERCU = W + 'sync-stable-apercu.md';
const GEN0 = 'd40aea3cc3e7916d1194b143563292c8e0bb8cba95f7da02c18332beb5ecfaac', REC0 = 'dadfd65262ddb0de3d16e3ae443c7eb6b1f74a4205e680327f382c06b3f567b2', CRB0 = 'aef9e029f25c17d36200587d5f7cee01035444868f54c453f30d19b6bff0060d';
const AVANT = "matchAll(/^\\| (C\\d+-[a-z0]) \\| ([^|]+) \\| \\d+ \\|$/gm)", APRES = "matchAll(/^\\| (C\\d+-[a-z0]|RES) \\| ([^|]+) \\| \\d+ \\|$/gm)";
const LIB0 = "'générateur et criblage inchangés (défaut non corrigé, marques conservées)'", LIB1 = "'générateur à sa version corrigée (voie A, sur autorisation) ; criblage inchangé, marques conservées'";
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => sha(readFileSync(p));
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const lire = (p) => readFileSync(join(root, p), 'utf8');
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(OUT)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const une = (t, x, y, nom) => { if (t.split(x).length !== 2) throw new Error(nom + ' : ancre non unique'); return t.replace(x, () => y); };
if (existsSync(join(root, OUT, 'proposition'))) { console.log('ARRÊT : ' + OUT + 'proposition existe déjà'); process.exit(1); }

// (1) Préconditions
ok(shaF(join(root, GEN)) === GEN0, 'P1 générateur à son empreinte relue', GEN0.slice(0, 12) + '…');
ok(shaF(join(root, REC)) === REC0, 'P2 recalcul de T9 à son empreinte relue', REC0.slice(0, 12) + '…');
ok(shaF(join(root, CRB)) === CRB0, 'P3 criblage à son empreinte relue', CRB0.slice(0, 12) + '…');
ok(lire(GEN).split(AVANT).length === 2, 'P4 motif de lecture présent une fois dans le générateur');
ok(existsSync(join(root, CONS, 'recalcul-T9-perimetre.mjs')), 'P5 consolidation proposée présente, pour la simulation de l\'état consolidé');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P6 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// (2) Versions proposées
const genP = une(lire(GEN), AVANT, APRES, 'générateur'); const genSha = sha(Buffer.from(genP, 'utf8'));
const adapte = (t) => une(une(t, "GENERATEUR = '" + GEN0 + "'", "GENERATEUR = '" + genSha + "'", 'recalcul, constante'), LIB0, LIB1, 'recalcul, libellé');
const recP = adapte(lire(REC));
const dG = (lire(GEN).split('\n').filter((l, i) => l !== genP.split('\n')[i])); ok(dG.length === 1 && genP.split('\n').length === lire(GEN).split('\n').length, 'R0 générateur : une seule ligne change', dG.length + ' ligne');
const defs = (t, re) => [...t.matchAll(re)].map((m) => m[1]);
const dec = lire(DEC).replace(/\r\n/g, '\n');
const nv = new Set(defs(dec, /^\| (C\d+-[a-z0]|RES) \| ([^|]+) \| \d+ \|$/gm)), an = new Set(defs(dec, /^\| (C\d+-[a-z0]) \| ([^|]+) \| \d+ \|$/gm));
ok([...nv].filter((x) => !an.has(x)).join() === 'RES' && [...an].every((x) => nv.has(x)), 'R1 identifiants lus au découpage : RES seul s\'ajoute, aucune règle perdue', an.size + ' → ' + nv.size);

// (3) Clone jetable : ancien générateur à côté, générateur proposé en place
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-correction-res-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p); const S = join(tmp, 'sorties'); mkdirSync(S);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
writeFileSync(f(W + 'perimetre-v2-actuel.mjs'), lire(GEN)); writeFileSync(f(GEN), genP);
const { produirePerimetre: ancien } = await import(pathToFileURL(f(W + 'perimetre-v2-actuel.mjs')).href);
const { produirePerimetre: nouveau } = await import(pathToFileURL(f(GEN)).href);
const essai = (gen, nom, livraisons, extra = {}) => { const sortie = join(S, nom + '-' + (gen === ancien ? 'a' : 'n') + '.md'); try { const r = gen({ root: C, nom, livraisons, date: '2026-11-01', sortie, autorisation: 'essai', nonreg: true, ...extra }); return { txt: readFileSync(sortie, 'utf8'), r }; } catch (e) { return { err: e.message }; } };
const reg = JSON.parse(lire(REG)).tranches;
const synth = [...dec.matchAll(/^\| ([A-F][0-9]+) \| [A-F] \| [^|]+ \| [0-9]+ \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => m[1]);
const groupes = [...reg.filter((t) => t.id !== 'T9').map((t) => [t.id, t.livraisons]), ...synth.filter((l) => !/^E/.test(l)).map((l) => [l, [l]])];
const diff = []; let produits = 0; for (const [nom, l] of groupes) { const a = essai(ancien, nom, l), n = essai(nouveau, nom, l); if (a.txt) produits++; if (a.txt !== n.txt || a.err !== n.err) diff.push(nom); }
ok(!diff.length && groupes.length === 46 && produits === groupes.length, 'N1 non-régression : T1 à T8, F et 37 livraisons hors bloc E : texte identique octet pour octet, ancien et proposé', groupes.length + ' groupes ; produits : ' + produits + ' ; différents : ' + (diff.join(', ') || 'aucun'));

// T9 : ancien générateur, arrêt exact ; proposé : produit ; comparaison hors RES avec l'ancien sur un criblage sans marque RES
const a9 = essai(ancien, 'T9', ['E1', 'E2', 'E3']); ok(a9.err === 'règle RES : définition introuvable', 'N2 ancien générateur sur T9 : arrêt exact', a9.err);
const n9 = essai(nouveau, 'T9', ['E1', 'E2', 'E3']); ok(n9.txt && n9.r.sens === 24 && n9.r.entry === 21 && n9.r.regles.length === 15 && n9.r.regles.includes('RES'), 'N3 générateur proposé sur T9 : 24 sens, 21 ENTRY, 15 règles dont RES', n9.err ?? n9.r.regles.join(', '));
const crib0 = readFileSync(f(CRB)); { const o = JSON.parse(crib0); for (const c of o.candidats) c.regles = c.regles.filter((g) => g.regle !== 'RES'); writeFileSync(f(CRB), JSON.stringify(o)); }
const b9 = essai(ancien, 'T9', ['E1', 'E2', 'E3']); writeFileSync(f(CRB), crib0);
const hors = (t) => { const L = t.split('\n'); const i2 = L.findIndex((l) => l.startsWith('## 2. ')), i3 = L.findIndex((l) => l.startsWith('## 3. ')); return L.map((l, k) => { if (k > i2 && k < i3 && /^\| [0-9]+ \| `/.test(l)) return l.replace(/\| ([^|]*) \|$/, (m, x) => { const y = x.trim().split(', ').filter((g) => g && g !== 'RES').join(', '); return '| ' + y + ' |'; }); return l.replace(/`RES` — point réservé à A2-05 : [^;]*?(?= ; |\.$)/, '').replace(' ;  ; ', ' ; ').replace(/ ; \.$/, '.').replace(/ : ; /, ' : ').replace('**15 règles**', '**14 règles**'); }).filter((l) => !/^\| RES \| /.test(l)).join('\n'); };
ok(b9.txt && hors(n9.txt ?? '') === b9.txt, 'N4 T9 : hors des mentions de RES (24 lignes du §2, 24 relevés, le compte des règles, une ligne de règle), texte identique à celui de l\'ancien générateur sur un criblage sans RES', 'ancien : ' + (b9.err ?? 'produit'));
const ligneRES = (n9.txt ?? '').split('\n').find((l) => /^\| RES \| /.test(l)) ?? ''; ok(/^\| RES \| point déjà réservé à A2-05 par un lot \| /.test(ligneRES) && (ligneRES.split('|')[3].match(/,/g) ?? []).length === 23, 'N5 ligne RES du §3 : définition du découpage, 24 sens désignés', ligneRES.slice(0, 80) + '…');
for (const [nom, l, n] of [['E1', ['E1'], 9], ['E2', ['E2'], 12], ['E3', ['E3'], 3]]) { const e = essai(nouveau, nom, l); ok(e.r?.sens === n, 'N6 livraison ' + nom + ' produite : ' + n + ' sens', e.err ?? ''); }

// Le motif ne devient pas permissif
const faux = (regle) => { const o = JSON.parse(crib0); o.candidats.find((c) => c.id === 'v_465_s1').regles.push({ axe: 'C1', regle, detail: 'essai' }); writeFileSync(f(CRB), JSON.stringify(o)); const e = essai(nouveau, 'T9', ['E1', 'E2', 'E3']); writeFileSync(f(CRB), crib0); return e.err; };
ok(faux('QQQ') === 'règle QQQ : définition introuvable', 'N7 règle inconnue toujours refusée', faux('QQQ'));
ok(faux('C99-z') === 'règle C99-z : définition introuvable', 'N8 règle de forme C inconnue toujours refusée', faux('C99-z'));
// Le découpage est protégé : son empreinte est ajustée dans le manifeste du clone, sans quoi le refus viendrait du manifeste et non de la définition absente
{ const o = readFileSync(f(DEC)), m0 = readFileSync(f(MAN)); const t = o.toString('utf8').replace(/^\| RES \| .*\r?\n/gm, ''); const m = JSON.parse(m0); m.empreintes[DEC] = sha(Buffer.from(t, 'utf8')); writeFileSync(f(DEC), t); writeFileSync(f(MAN), JSON.stringify(m, null, 1) + '\n'); const e = essai(nouveau, 'T9', ['E1', 'E2', 'E3']); writeFileSync(f(DEC), o); writeFileSync(f(MAN), m0); ok(e.err === 'règle RES : définition introuvable', 'N9 sans définition au découpage, RES reste refusée : aucune définition inventée', e.err); }
{ let m = ''; try { nouveau({ root: C, nom: 'T8', livraisons: ['D5', 'D8'], date: '2026-11-01', sortie: RT8, autorisation: 'essai', nonreg: true }); } catch (e) { m = e.message; } ok(/protégé par le manifeste/.test(m), 'N10 périmètre protégé : réécriture toujours refusée', m.slice(-60)); }

// État actuel du dépôt, correction appliquée sur le clone
rmSync(f(W + 'perimetre-v2-actuel.mjs'));
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 120);
const ecarts = (r) => r.out.split('\n').filter((l) => /^ÉCART/.test(l)).map((l) => l.replace(/^ÉCART\s+/, '').slice(0, 70));
const r0 = lancer(REC); ok(r0.code === 1 && ecarts(r0).length === 1 && /^générateur et criblage inchangés/.test(ecarts(r0)[0]), 'A1 recalcul de T9 non adapté : un seul écart, l\'empreinte du générateur : le verrou fonctionne', ecarts(r0).join(' | '));
writeFileSync(f(REC), recP);
const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], T5: [W + 'recalcul-T5-perimetre.mjs'], T6: [W + 'recalcul-T6-perimetre.mjs'], T7: [W + 'recalcul-T7-perimetre.mjs'], T8: [W + 'recalcul-T8-perimetre.mjs'], T9: [REC] };
const tous = (nom) => { const R = Object.fromEntries(Object.entries(CTRL).map(([k, x]) => [k, lancer(...x)])); for (const [k, r] of Object.entries(R)) dire('   ' + nom + ' ' + k + ' (code ' + r.code + ') : ' + fin(r)); return R; };
const R1 = tous('A'); ok(Object.values(R1).every((r) => r.code === 0), 'A2 état actuel : contrôles en service à 0');
const rel1 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel1.code === 0 && fin(rel1) === '30 conformes sur 30', 'A3 relais : 30 sur 30', fin(rel1));
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); ok(ap1.code === 0 && !readFileSync(f(APERCU), 'utf8').split('\n').some((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)), 'A4 aperçu vide', fin(ap1));
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([GEN, REC].sort()), 'A5 deux fichiers modifiés, aucun autre : découpage, criblage, registre, données, normes et rapports inchangés', diffI(reel0, instantane(C)).join(', '));
ok(spawnSync(process.execPath, ['--check', f(GEN)], { encoding: 'utf8' }).status === 0 && spawnSync(process.execPath, ['--check', f(REC)], { encoding: 'utf8' }).status === 0, 'A6 node --check des deux fichiers');

// État consolidé, simulé : rapport accepté, recalcul adapté par la consolidation, puis 44e entrée ; la correction s'y applique par les mêmes ancres
for (const [p, n] of [[RAP, 'etape2-A2-05-volet1-lot3-T9-perimetre.md'], [W + 'perimetre-T9.mjs', 'perimetre-T9.mjs']]) cpSync(join(root, CONS, n), f(p));
cpSync(join(root, CONS, 'proposition-T9-perimetre.md'), f(W + 'arbitrage-T9/proposition-T9-perimetre.md'));
const recC = adapte(readFileSync(join(root, CONS, 'recalcul-T9-perimetre.mjs'), 'utf8')); writeFileSync(f(REC), recC);
const R2 = lancer(REC); ok(R2.code === 0, 'B1 état consolidé : recalcul adapté, puis corrigé par les mêmes ancres, à 0', fin(R2));
const av = readFileSync(f(RAP)); const pT = lancer(W + 'perimetre-T9.mjs'); ok(pT.code !== 0 && /défaut RES non reproduit|périmètre accepté/.test(pT.out) && Buffer.compare(av, readFileSync(f(RAP))) === 0, 'B2 perimetre-T9.mjs relancé après correction : refus, rapport accepté inchangé', (pT.out.match(/défaut RES non reproduit[^;]*|périmètre accepté[^\n]*/) ?? [''])[0].slice(0, 80));
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); const R3 = tous('B'); ok(aj.code === 0 && Object.values(R3).every((r) => r.code === 0), 'B3 état consolidé, 44e entrée : contrôles en service à 0', fin(aj));
{ let m = ''; try { nouveau({ root: C, nom: 'T9', livraisons: ['E1', 'E2', 'E3'], date: '2026-11-01', sortie: RAP, autorisation: 'essai', nonreg: true }); } catch (e) { m = e.message; } ok(/protégé par le manifeste/.test(m), 'B4 périmètre accepté de T9, protégé : réécriture refusée par le générateur corrigé', m.slice(-60)); }

// (4) Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'proposition'), { recursive: true }); mkdirSync(join(d, 'diffs'), { recursive: true }); mkdirSync(join(d, 'apercu'), { recursive: true }); const tab = [];
  for (const [p, nom, t, h0] of [[GEN, 'perimetre-v2.mjs', genP, GEN0], [REC, 'recalcul-T9-perimetre.mjs', recP, REC0]]) { writeFileSync(join(d, 'proposition', nom), t); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + 'proposition/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + h0 + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'apercu', 'T9-avec-RES.md'), n9.txt);
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const chR = diffI(reel0, reel1); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la correction RES conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
