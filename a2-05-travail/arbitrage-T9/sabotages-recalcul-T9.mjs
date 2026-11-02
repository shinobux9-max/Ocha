// A2-05 · volet 1 · lot 3 : tests de résistance du recalcul indépendant du périmètre de T9 (recalcul-T9-perimetre.mjs), dans un clone git jetable recouvert
// de l'arbre de travail ; jamais dans le dépôt réel. Témoin sain avant et après ; chaque sabotage modifie réellement un fichier (refus s'il est sans effet),
// doit rendre le code 1 avec l'écart attendu, fixé à l'avance, puis le fichier est restauré et sa restauration vérifiée. Dépôt réel comparé avant et après.
// Usage : node a2-05-travail/arbitrage-T9/sabotages-recalcul-T9.mjs <racine du dépôt>
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T9/sorties/', EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const shaB = (b) => createHash('sha256').update(b).digest('hex');
const log = []; const dire = (l) => { console.log(l); log.push(l); };
let ecarts = 0; const ok = (b, l, d) => { if (!b) ecarts++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = shaB(readFileSync(join(r, p))); } }; m(''); return h; };
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-sabotages-T9-')); const C = join(tmp, 'essai');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const rec = () => { const r = spawnSync(process.execPath, [join(C, 'a2-05-travail/recalcul-T9-perimetre.mjs'), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const temoin = (quand) => { const r = rec(); ok(r.code === 0 && r.out.endsWith('recalcul conforme'), 'témoin sain ' + quand, r.out.split('\n').filter((l) => l.startsWith('conforme ')).length + ' contrôles conformes'); };
const J = (t) => JSON.parse(t.replace(/^﻿/, '')); const S = (o) => JSON.stringify(o, null, 2) + '\n';
const sensDe = (v, id) => v.flatMap((e) => e.senses).find((s) => s.id === id);
const VOC = 'data/n5/vocab.json', DEC = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md', GEN = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', JRN = 'reconstruction/a2-04/journal.json', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', REG = 'a2-05-travail/registre-tranches.json', CRB = 'a2-05-travail/criblage/resultat.json';
const SAB = [
  ['S1', 'découpage : une ligne de E1 rattachée à D8', DEC, (t) => t.replace('| 337 | E1 |', '| 337 | D8 |'), 'E1, E2 et E3 contre la synthèse'],
  ['S2', 'découpage : numéro de ligne déplacé dans E2 (contiguïté)', DEC, (t) => t.replace('| 350 | E2 |', '| 390 | E2 |'), 'un seul segment contigu'],
  ['S3', 'découpage : un sens remplacé par un autre sens de E1 (doublon)', DEC, (t) => t.replace('| 338 | E1 | `v_347_s2` |', '| 338 | E1 | `v_347_s1` |'), 'aucun doublon de sens'],
  ['S4', 'data : catégorie de 低い modifiée', VOC, (t) => { const v = J(t); sensDe(v, 'v_183_s1').category.level_3 = null; return S(v); }, 'catégories, types et fonctions'],
  ['S5', 'data : `deictique` ajouté à おととし', VOC, (t) => { const v = J(t); sensDe(v, 'v_285_s1').linguistic_functions = { grammatical: ['deictique'], pragmatic_discourse: [] }; return S(v); }, 'une seule fonction'],
  ['S6', 'data : `intensifieur` retiré de 大変 s1', VOC, (t) => { const v = J(t); sensDe(v, 'v_495_s1').linguistic_functions = { grammatical: [], pragmatic_discourse: [] }; return S(v); }, 'une seule fonction'],
  ['S7', 'data : type de 痛い mis à `null`', VOC, (t) => { const v = J(t); sensDe(v, 'v_465_s1').semantic_type = null; return S(v); }, 'types et niveaux de catégorie'],
  ['S8', 'data : tag ajouté à 前', VOC, (t) => { const v = J(t); v.find((e) => e.id === 'v_348').tags = ['lieu_gare']; return S(v); }, 'tags publiés'],
  ['S9', 'data : relation ajoutée à 長い', VOC, (t) => { const v = J(t); const s = sensDe(v, 'v_485_s1'); s.relations = [...(s.relations ?? []), { type: 'antonym_of', target: 'v_468_s1' }]; return S(v); }, 'aucune relation publiée'],
  ['S10', 'journal : D1081 repassée en `proposed`', JRN, (t) => { const j = J(t); j.find((d) => d.id === 'A2-04-D1081').status = 'proposed'; return S(j); }, 'décisions de journal par ENTRY'],
  ['S11', 'journal : D0067 déplacée au sens 1 de 大変', JRN, (t) => { const j = J(t); j.find((d) => d.id === 'A2-04-D0067').field = 'sens 1 · category'; return S(j); }, '大変 : catégorie nulle'],
  ['S12', 'journal : décision de tags fictive sur 醤油', JRN, (t) => { const j = J(t); j.find((d) => d.id === 'A2-04-D0012').field = 'tags'; return S(j); }, 'aucune décision de fonction'],
  ['S13', 'lot 15 : ENTRY 長い repassée en `proposed`', 'reconstruction/a2-04/lots/lot-15.json', (t) => { const j = J(t); j.entries.n5_v_485.status = 'proposed'; return S(j); }, 'chaque ENTRY validée'],
  ['S14', 'bilan : V2-152 retirée', BIL, (t) => t.replace(/^\| V2-152 \|.*\r?\n/m, ''), 'corrections retenues sur les ENTRY de T9'],
  ['S15', 'bilan : V2-153 changée de champ', BIL, (t) => t.replace(/^(\| V2-153 \| `v_448` \| 広い \| 15 \| )`nuance` \(ENTRY\)/m, '$1`tags` (ENTRY)'), 'corrections retenues sur les ENTRY de T9'],
  ['S16', 'registre : statut de T9 changé', REG, (t) => { const o = J(t); o.tranches.find((x) => x.id === 'T9').statut = 'suspendue'; return JSON.stringify(o, null, 1) + '\n'; }, 'restants par tranche du registre'],
  ['S17', 'un sens de T9 déjà examiné dans un autre rapport', 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', (t) => t + '\n#### `v_285_s1` · おととし\n', 'sens non encore examinés'],
  ['S18', 'un rapport arbitré antérieur perd son statut : les 336 ne sont plus entiers', 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le /m, '**Statut** : **proposition du '), 'les 336 sens arbitrés'],
  ['S19', 'criblage : marque RES retirée de 痛い', CRB, (t) => { const o = J(t); const c = o.candidats.find((x) => x.id === 'v_465_s1'); c.regles = c.regles.filter((g) => g.regle !== 'RES'); return JSON.stringify(o); }, 'marques RES au criblage'],
  ['S20', 'criblage : motif RES de 嫌 changé', CRB, (t) => { const o = J(t); o.candidats.find((x) => x.id === 'v_659_s1').regles.find((g) => g.regle === 'RES').detail = 'point réservé à A2-05 : tag du lot 0'; return JSON.stringify(o); }, 'neuf motifs de réservation'],
  ['S21', 'générateur modifié (correction silencieuse du défaut)', 'a2-05-travail/perimetre-v2.mjs', (t) => t.replace("/^\\| (C\\d+-[a-z0]) \\|", "/^\\| (RES|C\\d+-[a-z0]) \\|"), 'générateur et criblage inchangés'],
  ['S22', 'découpage : motif du §7.2 privé d\'un sens', DEC, (t) => t.replace('| extension conservée en nuance (lot 15) | 4 | 低い (`v_183_s1`), 大きな (`v_441_s1`), 短い (`v_468_s1`), 長い (`v_485_s1`) |', '| extension conservée en nuance (lot 15) | 3 | 低い (`v_183_s1`), 大きな (`v_441_s1`), 短い (`v_468_s1`) |'), 'neuf motifs de réservation'],
  ['S23', 'rapport de T9 : règle fictive au §2', GEN, (t) => t.replace('| `propriete` | aucune | C10-a |', '| `propriete` | aucune | C10-a, C7-c |'), 'règles du §2'],
  ['S24', 'rapport de T9 : un sens retiré de l\'inventaire des 41', GEN, (t) => t.replace('誰 `v_402_s1`, ', ''), 'inventaire des 41'],
  ['S25', 'rapport de T9 : statut « accepté »', GEN, (t) => t.replace('**Statut** : **proposition de périmètre opérationnel, non arbitrée.**', '**Statut** : **périmètre accepté.**'), 'périmètre en proposition'],
  ['S26', 'rapport de T9 : une voie du défaut présentée comme retenue', GEN, (t) => t.replace('**Trois voies, à arbitrer, aucune retenue**', '**Voie A retenue**'), 'quatorze règles hors RES'],
  ['S27', 'rapport de T9 : autre comparable du bloc F', GEN, (t) => t.replace(/^(- \*\*Comparables du bloc F\*\*[^:]*: )どこ\.$/m, '$1何.'), 'frontière du bloc F'],
  ['S28', 'manifeste : ordre de deux entrées inversé', MAN, (t) => { const o = J(t); const e = Object.entries(o.empreintes); [e[3], e[4]] = [e[4], e[3]]; o.empreintes = Object.fromEntries(e); return JSON.stringify(o, null, 1) + '\n'; }, 'manifeste'],
  ['S29', 'manifeste : périmètre de T9 ajouté', MAN, (t) => { const o = J(t); o.empreintes[GEN] = '0'.repeat(64); return JSON.stringify(o, null, 1) + '\n'; }, 'manifeste'],
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
mkdirSync(join(root, OUT), { recursive: true }); writeFileSync(join(root, OUT, 'sabotages-recalcul-T9.txt'), log.join('\n') + '\n');
process.exit(ecarts ? 1 : 0);
