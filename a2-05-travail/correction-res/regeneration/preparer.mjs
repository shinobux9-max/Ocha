// A2-05 : régénération de la correction technique du défaut « RES » (voie A, acceptée sur le fond le 2026-11-01), EN PROPOSITION : le générateur réel n'est pas modifié.
// Usage : node a2-05-travail/correction-res/regeneration/preparer.mjs <racine du dépôt>
// Reprend correction-res/preparer.mjs, conservé, sur l'état réel d'après O3 : recalcul de T9 adapté (33 contrôles), périmètre accepté protégé (44 entrées). Le correctif du générateur est
// le même, une ligne ; l'adaptation du recalcul porte sur sa version actuelle. Essais dans un clone jetable, l'ancien générateur gardé à côté : non-régression des groupes historiques, T9
// comparée hors RES, refus des marques non définies, verrou d'empreinte, contrôles en service. Sorties dans regeneration/, seulement sans écart ; refus si proposition/ existe. Dépôt réel inchangé.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'correction-res/regeneration/', GEN = W + 'perimetre-v2.mjs', REC = W + 'recalcul-T9-perimetre.mjs', CRB = W + 'criblage/resultat.json', REG = W + 'registre-tranches.json', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', CFG = W + 'perimetre-T9.mjs';
const DEC = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', RT8 = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md', ANCIEN_DIFF = W + 'correction-res/diffs/perimetre-v2.mjs.diff';
const GEN0 = 'd40aea3cc3e7916d1194b143563292c8e0bb8cba95f7da02c18332beb5ecfaac', REC0 = '63aaa07c854fd6a79eba540f6b63c0bb5fbec8159b72a6eb74d035d7567f8a06', CRB0 = 'aef9e029f25c17d36200587d5f7cee01035444868f54c453f30d19b6bff0060d', MAN0 = '2c74018e3b04c06395298e2452d039de409353aae8a62d5d7d99cf43e01f78e3', GEN_RELU = '6537c0ee36816b0eea17269502dc8e9876fe1579fc1115fc31eebca7e3a496d1', PLAN = '7d25ea8442b9dd06';
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
const corps = (d) => d.slice(d.indexOf('@@'));
if (existsSync(join(root, OUT, 'proposition'))) { console.log('ARRÊT : ' + OUT + 'proposition existe déjà'); process.exit(1); }

// (1) Préconditions, état réel après O3
ok(shaF(join(root, GEN)) === GEN0, 'P1 générateur réel à son empreinte, correction non appliquée', GEN0.slice(0, 12) + '…');
ok(shaF(join(root, REC)) === REC0, 'P2 recalcul de T9, version actuelle', REC0.slice(0, 12) + '…');
ok(shaF(join(root, CRB)) === CRB0, 'P3 criblage à son empreinte', CRB0.slice(0, 12) + '…');
ok(shaF(join(root, MAN)) === MAN0 && Object.keys(JSON.parse(lire(MAN)).empreintes).length === 44, 'P4 manifeste : 44 entrées', MAN0.slice(0, 12) + '…');
ok(lire(GEN).split(AVANT).length === 2, 'P5 motif de lecture présent une fois dans le générateur');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P6 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// (2) Versions proposées
const genP = une(lire(GEN), AVANT, APRES, 'générateur'); const genSha = sha(Buffer.from(genP, 'utf8'));
ok(genSha === GEN_RELU, 'R0 correctif identique à celui relu et accepté sur le fond', genSha.slice(0, 12) + '…');
const dG = lire(GEN).split('\n').filter((l, i) => l !== genP.split('\n')[i]); ok(dG.length === 1 && genP.split('\n').length === lire(GEN).split('\n').length, 'R0 générateur : une seule ligne change', dG.length + ' ligne');
const adapte = (t) => une(une(t, "GENERATEUR = '" + GEN0 + "'", "GENERATEUR = '" + genSha + "'", 'recalcul, constante'), LIB0, LIB1, 'recalcul, libellé');
const recP = adapte(lire(REC));
const defs = (t, re) => [...t.matchAll(re)].map((m) => m[1]);
const dec = lire(DEC).replace(/\r\n/g, '\n');
const nv = new Set(defs(dec, /^\| (C\d+-[a-z0]|RES) \| ([^|]+) \| \d+ \|$/gm)), an = new Set(defs(dec, /^\| (C\d+-[a-z0]) \| ([^|]+) \| \d+ \|$/gm));
ok([...nv].filter((x) => !an.has(x)).join() === 'RES' && [...an].every((x) => nv.has(x)), 'R1 identifiants lus au découpage : RES seul s\'ajoute, aucune règle perdue', an.size + ' → ' + nv.size);

// (3) Clone jetable : ancien générateur à côté, générateur proposé en place
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-regeneration-res-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p); const S = join(tmp, 'sorties'); mkdirSync(S);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
writeFileSync(f(W + 'perimetre-v2-actuel.mjs'), lire(GEN)); writeFileSync(f(GEN), genP);
const { produirePerimetre: ancien } = await import(pathToFileURL(f(W + 'perimetre-v2-actuel.mjs')).href);
const { produirePerimetre: nouveau } = await import(pathToFileURL(f(GEN)).href);
const essai = (gen, nom, livraisons) => { const sortie = join(S, nom + '-' + (gen === ancien ? 'a' : 'n') + '.md'); try { const r = gen({ root: C, nom, livraisons, date: '2026-11-01', sortie, autorisation: 'essai', nonreg: true }); return { txt: readFileSync(sortie, 'utf8'), r }; } catch (e) { return { err: e.message }; } };
const E = ['E1', 'E2', 'E3'];
const reg = JSON.parse(lire(REG)).tranches;
const synth = [...dec.matchAll(/^\| ([A-F][0-9]+) \| [A-F] \| [^|]+ \| [0-9]+ \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => m[1]);
const groupes = [...reg.filter((t) => t.id !== 'T9').map((t) => [t.id, t.livraisons]), ...synth.filter((l) => !/^E/.test(l)).map((l) => [l, [l]])];
const diff = []; let produits = 0; for (const [nom, l] of groupes) { const a = essai(ancien, nom, l), n = essai(nouveau, nom, l); if (a.txt) produits++; if (a.txt !== n.txt || a.err !== n.err) diff.push(nom); }
ok(!diff.length && groupes.length === 46 && produits === groupes.length, 'N1 non-régression : T1 à T8, F et 37 livraisons hors bloc E : texte identique octet pour octet, ancien et proposé', groupes.length + ' groupes ; produits : ' + produits + ' ; différents : ' + (diff.join(', ') || 'aucun'));
const a9 = essai(ancien, 'T9', E); ok(a9.err === 'règle RES : définition introuvable', 'N2 ancien générateur sur T9 : arrêt exact', a9.err);
const n9 = essai(nouveau, 'T9', E); ok(n9.txt && n9.r.sens === 24 && n9.r.entry === 21 && n9.r.regles.length === 15 && n9.r.regles.includes('RES'), 'N3 générateur proposé sur T9 : 24 sens, 21 ENTRY, 15 règles dont RES', n9.err ?? n9.r.regles.join(', '));
const crib0 = readFileSync(f(CRB)); { const o = JSON.parse(crib0); for (const c of o.candidats) c.regles = c.regles.filter((g) => g.regle !== 'RES'); writeFileSync(f(CRB), JSON.stringify(o)); }
const b9 = essai(ancien, 'T9', E); writeFileSync(f(CRB), crib0);
const hors = (t) => { const L = t.split('\n'); const i2 = L.findIndex((l) => l.startsWith('## 2. ')), i3 = L.findIndex((l) => l.startsWith('## 3. ')); return L.map((l, k) => { if (k > i2 && k < i3 && /^\| [0-9]+ \| `/.test(l)) return l.replace(/\| ([^|]*) \|$/, (m, x) => { const y = x.trim().split(', ').filter((g) => g && g !== 'RES').join(', '); return '| ' + y + ' |'; }); return l.replace(/`RES` — point réservé à A2-05 : [^;]*?(?= ; |\.$)/, '').replace(' ;  ; ', ' ; ').replace(/ ; \.$/, '.').replace(/ : ; /, ' : ').replace('**15 règles**', '**14 règles**'); }).filter((l) => !/^\| RES \| /.test(l)).join('\n'); };
ok(b9.txt && hors(n9.txt ?? '') === b9.txt, 'N4 T9 : hors des mentions de RES (24 lignes du §2, 24 relevés, le compte des règles, une ligne de règle), texte identique à celui de l\'ancien générateur sur un criblage sans RES', 'ancien : ' + (b9.err ?? 'produit'));
const ligneRES = (n9.txt ?? '').split('\n').find((l) => /^\| RES \| /.test(l)) ?? ''; ok(/^\| RES \| point déjà réservé à A2-05 par un lot \| /.test(ligneRES) && (ligneRES.split('|')[3].match(/,/g) ?? []).length === 23, 'N5 ligne RES du §3 : définition du découpage, 24 sens désignés', ligneRES.slice(0, 80) + '…');
for (const [nom, n] of [['E1', 9], ['E2', 12], ['E3', 3]]) { const e = essai(nouveau, nom, [nom]); ok(e.r?.sens === n, 'N6 livraison ' + nom + ' produite : ' + n + ' sens', e.err ?? ''); }

// Refus des marques non définies : le motif reconnaît RES littéralement, et rien d'autre
for (const regle of ['QQQ', 'C99-z', 'RES2', 'res', 'RESERVE', 'XRES', 'C1']) { const o = JSON.parse(crib0); o.candidats.find((c) => c.id === 'v_465_s1').regles.push({ axe: 'C1', regle, detail: 'essai' }); writeFileSync(f(CRB), JSON.stringify(o)); const e = essai(nouveau, 'T9', E); writeFileSync(f(CRB), crib0); ok(e.err === 'règle ' + regle + ' : définition introuvable', 'N7 marque non définie refusée : ' + regle, e.err); }
// Le découpage est protégé : son empreinte est ajustée dans le manifeste du clone, sans quoi le refus viendrait du manifeste et non de la définition absente
{ const o = readFileSync(f(DEC)), m0 = readFileSync(f(MAN)); const t = o.toString('utf8').replace(/^\| RES \| .*\r?\n/gm, ''); const m = JSON.parse(m0); m.empreintes[DEC] = sha(Buffer.from(t, 'utf8')); writeFileSync(f(DEC), t); writeFileSync(f(MAN), JSON.stringify(m, null, 1) + '\n'); const e = essai(nouveau, 'T9', E); writeFileSync(f(DEC), o); writeFileSync(f(MAN), m0); ok(e.err === 'règle RES : définition introuvable', 'N8 sans définition au découpage, RES reste refusée : aucune définition inventée', e.err); }
for (const [p, nom, l] of [[RT8, 'T8', ['D5', 'D8']], [RAP, 'T9', E]]) { let m = ''; try { nouveau({ root: C, nom, livraisons: l, date: '2026-11-01', sortie: p, autorisation: 'essai', nonreg: true }); } catch (e) { m = e.message; } ok(/protégé par le manifeste/.test(m), 'N9 périmètre protégé de ' + nom + ' : réécriture refusée', m.slice(-60)); }

// État réel, correction appliquée sur le clone
rmSync(f(W + 'perimetre-v2-actuel.mjs'));
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 120);
const ecarts = (r) => r.out.split('\n').filter((l) => /^ÉCART/.test(l)).map((l) => l.replace(/^ÉCART\s+/, '').slice(0, 70));
const r0 = lancer(REC); ok(r0.code === 1 && ecarts(r0).length === 1 && /^générateur et criblage inchangés/.test(ecarts(r0)[0]), 'A1 recalcul non adapté : un seul écart, l\'empreinte du générateur : le verrou fonctionne', ecarts(r0).join(' | '));
writeFileSync(f(REC), recP);
const r1 = lancer(REC); const n33 = r1.out.split('\n').filter((l) => l.startsWith('conforme ')).length; ok(r1.code === 0 && n33 === 33, 'A2 recalcul adapté : 33 contrôles conformes', n33 + ' ; code ' + r1.code);
for (const [n, s] of [['T5', W + 'recalcul-T5-perimetre.mjs'], ['T6', W + 'recalcul-T6-perimetre.mjs'], ['T7', W + 'recalcul-T7-perimetre.mjs'], ['T8', W + 'recalcul-T8-perimetre.mjs'], ['pilote', W + 'controle-bilan-pilote.mjs'], ['couverture', W + 'couverture-lot3.mjs'], ['empreintes', W + 'empreintes-lot3.mjs']]) { const r = lancer(s); ok(r.code === 0, 'A3 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'A4 relais : 30 sur 30', fin(rel));
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); ok(ap.code === 0 && (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] === PLAN && !readFileSync(f(APERCU), 'utf8').split('\n').some((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)), 'A5 aperçu vide : le plan et les blocs ne dépendent pas de ce correctif', fin(ap));
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([GEN, REC].sort()), 'A6 deux fichiers modifiés, aucun autre : découpage, criblage, registre, données, normes et rapports inchangés', diffI(reel0, instantane(C)).join(', '));
ok(spawnSync(process.execPath, ['--check', f(GEN)], { encoding: 'utf8' }).status === 0 && spawnSync(process.execPath, ['--check', f(REC)], { encoding: 'utf8' }).status === 0, 'A7 node --check des deux fichiers');
const av = readFileSync(f(RAP)); const pT = lancer(CFG); ok(pT.code !== 0 && /protégé par le manifeste/.test(pT.out) && Buffer.compare(av, readFileSync(f(RAP))) === 0, 'A8 perimetre-T9.mjs relancé après correction : refus, rapport accepté inchangé', (pT.out.match(/[^\n]*protégé par le manifeste[^\n]*/) ?? [''])[0].slice(-70));
// Le verrou du recalcul adapté tient : retour à l'ancien motif, motif élargi
const sabote = (nom, m) => { const o = readFileSync(f(GEN)); writeFileSync(f(GEN), m(o.toString('utf8'))); const r = lancer(REC); writeFileSync(f(GEN), o); ok(r.code === 1 && ecarts(r).some((l) => l.startsWith('générateur à sa version corrigée')), nom, ecarts(r).length + ' écart(s)'); };
sabote('S1 générateur revenu à l\'ancien motif', () => lire(GEN));
sabote('S2 motif élargi au-delà de RES', (t) => t.replace(APRES, "matchAll(/^\\| (C\\d+-[a-z0]|[A-Z]+) \\| ([^|]+) \\| \\d+ \\|$/gm)"));

// (4) Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'proposition'), { recursive: true }); mkdirSync(join(d, 'diffs'), { recursive: true }); mkdirSync(join(d, 'apercu'), { recursive: true }); const tab = [];
  for (const [p, nom, t, h0] of [[GEN, 'perimetre-v2.mjs', genP, GEN0], [REC, 'recalcul-T9-perimetre.mjs', recP, REC0]]) { writeFileSync(join(d, 'proposition', nom), t); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + 'proposition/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + h0 + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); if (p === GEN) ok(corps(r.stdout) === corps(readFileSync(join(root, ANCIEN_DIFF), 'utf8')), 'R2 diff du générateur identique au diff relu, à partir du premier @@'); }
  writeFileSync(join(d, 'apercu', 'T9-avec-RES.md'), n9.txt);
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const chR = diffI(reel0, reel1); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ko ? ko + ' écart(s) ; aucune proposition conservée pour relecture' : 'régénération de la correction RES conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
