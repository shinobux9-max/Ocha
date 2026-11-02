// A2-05 · volet 1 · lot 3 : tests de résistance du recalcul indépendant du périmètre de T8 (recalcul-T8-perimetre.mjs), dans un clone git jetable recouvert
// de l'arbre de travail ; jamais dans le dépôt réel. Témoin sain avant et après ; chaque sabotage modifie réellement un fichier (refus s'il est sans effet),
// doit rendre le code 1 avec l'écart attendu, fixé à l'avance, puis le fichier est restauré et sa restauration vérifiée. Dépôt réel comparé avant et après.
// Usage : node a2-05-travail/arbitrage-T8/sabotages-recalcul-T8.mjs <racine du dépôt>
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T8/sorties/', EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const shaB = (b) => createHash('sha256').update(b).digest('hex');
const log = []; const dire = (l) => { console.log(l); log.push(l); };
let ecarts = 0; const ok = (b, l, d) => { if (!b) ecarts++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = shaB(readFileSync(join(r, p))); } }; m(''); return h; };
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-sabotages-T8-')); const C = join(tmp, 'essai');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const rec = () => { const r = spawnSync(process.execPath, [join(C, 'a2-05-travail/recalcul-T8-perimetre.mjs'), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const temoin = (quand) => { const r = rec(); ok(r.code === 0 && r.out.endsWith('recalcul conforme'), 'témoin sain ' + quand, r.out.split('\n').filter((l) => l.startsWith('conforme ')).length + ' contrôles conformes'); };
const J = (t) => JSON.parse(t.replace(/^﻿/, '')); const S = (o) => JSON.stringify(o, null, 2) + '\n';
const sensDe = (v, id) => v.flatMap((e) => e.senses).find((s) => s.id === id);
const VOC = 'data/n5/vocab.json', DEC = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md', GEN = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md', JRN = 'reconstruction/a2-04/journal.json', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', REG = 'a2-05-travail/registre-tranches.json';
const SAB = [
  ['S1', 'découpage : une ligne de D5 rattachée à D6', DEC, (t) => t.replace('| 299 | D5 |', '| 299 | D6 |'), 'D5 et D8 contre la synthèse'],
  ['S2', 'découpage : numéro de ligne déplacé dans D5 (contiguïté)', DEC, (t) => t.replace('| 301 | D5 |', '| 340 | D5 |'), 'deux segments contigus'],
  ['S3', 'découpage : un sens de D8 remplacé par un autre sens de D8 (doublon)', DEC, (t) => t.replace('| 327 | D8 | `v_471_s2` |', '| 327 | D8 | `v_471_s1` |'), 'aucun doublon de sens'],
  ['S4', 'data : catégorie de 全部 modifiée', VOC, (t) => { const v = J(t); sensDe(v, 'v_639_s1').category.level_3 = null; return S(v); }, 'catégories, types et fonctions'],
  ['S5', 'data : `quantificateur` ajouté à いつも', VOC, (t) => { const v = J(t); const s = sensDe(v, 'v_494_s1'); s.linguistic_functions = { grammatical: ['quantificateur'], pragmatic_discourse: [] }; return S(v); }, 'D5 sans fonction'],
  ['S6', 'data : `intensifieur` retiré de もっと (cumul)', VOC, (t) => { const v = J(t); sensDe(v, 'v_607_s1').linguistic_functions.pragmatic_discourse = []; return S(v); }, 'D5 sans fonction'],
  ['S7', 'data : `quantificateur` ajouté hors de D8 (多い), contrôle de répartition', VOC, (t) => { const v = J(t); const s = sensDe(v, 'v_654_s1'); s.linguistic_functions = { grammatical: ['quantificateur'], pragmatic_discourse: [] }; return S(v); }, 'tous les sens publiés quantificateur'],
  ['S8', 'data : `deictique` ajouté à すぐに', VOC, (t) => { const v = J(t); const s = sensDe(v, 'v_518_s1'); s.linguistic_functions = { grammatical: ['deictique'], pragmatic_discourse: [] }; return S(v); }, 'aucun sens de T8 ne porte deictique'],
  ['S9', 'data : relation ajoutée à いつも', VOC, (t) => { const v = J(t); const s = sensDe(v, 'v_494_s1'); s.relations = [...(s.relations ?? []), { type: 'similar_to', target: 'v_519_s1' }]; return S(v); }, 'relation publiée touchant T8'],
  ['S10', 'journal : D1553 repassée en `proposed`', JRN, (t) => { const j = J(t); j.find((d) => d.id === 'A2-04-D1553').status = 'proposed'; return S(j); }, 'décisions de journal par ENTRY'],
  ['S11', 'journal : décision `type-nul` de とても changée de nature', JRN, (t) => { const j = J(t); j.find((d) => d.id === 'A2-04-D1542').kind = 'decision'; return S(j); }, 'les 11 types nuls'],
  ['S12', 'lot 24 : ENTRY 全部 repassée en `proposed`', 'reconstruction/a2-04/lots/lot-24.json', (t) => { const j = J(t); j.entries.n5_v_639.status = 'proposed'; return S(j); }, 'chaque ENTRY validée'],
  ['S13', 'bilan : V1-7 retirée', BIL, (t) => t.replace(/^\| V1-7 \|.*\r?\n/m, ''), 'corrections retenues sur les ENTRY de T8'],
  ['S14', 'bilan : correction fictive sur `v_497_s1`', BIL, (t) => t.trimEnd() + '\n\n| V1-99 | `v_497_s1` | essai |\n', 'corrections retenues sur les ENTRY de T8'],
  ['S15', 'registre : statut de T8 changé', REG, (t) => { const o = J(t); o.tranches.find((x) => x.id === 'T8').statut = 'suspendue'; return JSON.stringify(o, null, 1) + '\n'; }, 'restants par tranche du registre'],
  ['S16', 'un sens de T8 déjà examiné dans un autre rapport', 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', (t) => t + '\n#### `v_494_s1` · いつも\n', 'sens non encore examinés'],
  ['S17', 'un rapport arbitré antérieur perd son statut : les 320 ne sont plus entiers', 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le /m, '**Statut** : **proposition du '), 'les 320 sens arbitrés'],
  ['S18', 'rapport de T8 : un sens retiré de l\'inventaire des 57', GEN, (t) => t.replace('晩ご飯 `v_91_s1`, ', ''), 'inventaire des 57'],
  ['S19', 'rapport de T8 : ligne du §2 altérée', GEN, (t) => t.replace('| 1 | `v_494_s1` | いつも | Toujours | adverbe | D5 |', '| 1 | `v_494_s1` | いつも | Toujours | adverbe | D8 |'), 'sens du périmètre généré'],
  ['S20', 'rapport de T8 : statut « accepté »', GEN, (t) => t.replace('**Statut** : **proposition de périmètre opérationnel, non arbitrée.**', '**Statut** : **périmètre accepté.**'), 'périmètre en proposition'],
  ['S21', 'rapport de T8 : comparable du bloc F inséré', GEN, (t) => t.replace('**6.2 Autres livraisons', '- **Comparables du bloc F** (essai).\n\n**6.2 Autres livraisons'), 'frontières'],
  ['S22', 'manifeste : ordre de deux entrées inversé', MAN, (t) => { const o = J(t); const e = Object.entries(o.empreintes); [e[3], e[4]] = [e[4], e[3]]; o.empreintes = Object.fromEntries(e); return JSON.stringify(o, null, 1) + '\n'; }, 'manifeste'],
  ['S23', 'manifeste : périmètre de T8 ajouté', MAN, (t) => { const o = J(t); o.empreintes[GEN] = '0'.repeat(64); return JSON.stringify(o, null, 1) + '\n'; }, 'manifeste'],
];
temoin('avant les sabotages');
for (const [k, nom, p, f, att] of SAB) {
  const orig = readFileSync(join(C, p)); const t = orig.toString('utf8'); const mod = f(t);
  if (mod === t) { ok(false, k + ' ' + nom, 'sabotage sans effet sur ' + p); continue; }
  writeFileSync(join(C, p), mod); const r = rec(); writeFileSync(join(C, p), orig);
  const e = r.out.split('\n').filter((l) => /^ÉCART/.test(l)).map((l) => l.replace(/^ÉCART\s+/, ''));
  ok(r.code === 1 && e.some((l) => l.startsWith(att) || l.includes(att)) && shaB(readFileSync(join(C, p))) === shaB(orig), k + ' ' + nom, e.length + ' écart(s) : ' + e.map((l) => l.split(' : ')[0].slice(0, 60)).join(' | '));
}
temoin('après les sabotages');
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const ch = Object.keys({ ...reel0, ...reel1 }).filter((p) => reel0[p] !== reel1[p]);
ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ecarts ? ecarts + ' écart(s)' : SAB.length + ' sabotages détectés sur ' + SAB.length + ' ; témoins sains');
mkdirSync(join(root, OUT), { recursive: true }); writeFileSync(join(root, OUT, 'sabotages-recalcul-T8.txt'), log.join('\n') + '\n');
process.exit(ecarts ? 1 : 0);
