// A2-05 · volet 1 · lot 3 : tests de résistance du recalcul indépendant du périmètre de T7 (recalcul-T7-perimetre.mjs), dans un clone git
// jetable recouvert de l'arbre de travail ; jamais dans le dépôt réel. Témoin sain avant et après ; chaque sabotage modifie réellement un
// fichier (refus s'il est sans effet), doit rendre le code 1 avec l'écart attendu, fixé à l'avance, puis le fichier est restauré et sa
// restauration vérifiée. Dépôt réel comparé avant et après. Chemins de machine masqués.
// Usage : node a2-05-travail/arbitrage-T7/sabotages-recalcul-T7.mjs <racine du dépôt>
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T7/sorties/';
const shaB = (b) => createHash('sha256').update(b).digest('hex');
const tmp = mkdtempSync(join(tmpdir(), 'ocha-sabotages-T7-')); const C = join(tmp, 'essai');
const masquer = (l) => [[root, '<racine>'], [C, '<clone>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
let ecarts = 0; const ok = (b, l, d) => { if (!b) ecarts++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = shaB(readFileSync(join(root, p))); } }; marcher(''); return h; };
const reel0 = instantane();

const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const rec = () => { const r = spawnSync(process.execPath, [join(C, 'a2-05-travail/recalcul-T7-perimetre.mjs'), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const temoin = (quand) => { const r = rec(); const n = r.out.split('\n').filter((l) => l.startsWith('conforme ')).length; ok(r.code === 0 && n === 24 && r.out.endsWith('recalcul conforme'), 'témoin sain ' + quand, 'code ' + r.code + ', ' + n + ' contrôles conformes'); };
const J = (t) => JSON.parse(t); const S = (o) => JSON.stringify(o, null, 2) + '\n';
const sensDe = (v, id) => v.flatMap((e) => e.senses).find((s) => s.id === id);
const VOC = 'data/n5/vocab.json', DEC = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md', GEN = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md';
const SAB = [
  ['S1', 'découpage : une ligne de D1 rattachée à D2', DEC, (t) => t.replace('| 253 | D1 |', '| 253 | D2 |'), 'D1 et D4 contre la synthèse'],
  ['S2', 'découpage : numéro de ligne déplacé dans D1 (contiguïté)', DEC, (t) => t.replace('| 260 | D1 |', '| 299 | D1 |'), 'deux segments contigus'],
  ['S3', 'découpage : un sens de D4 remplacé par un sens de D1 (doublon)', DEC, (t) => t.replace('| 289 | D4 | `v_330_s1` |', '| 289 | D4 | `v_329_s1` |'), 'aucun doublon de sens'],
  ['S4', 'data : catégorie de 両親 modifiée', VOC, (t) => { const v = J(t); sensDe(v, 'v_20_s1').category.level_3 = 'fratrie'; return S(v); }, 'catégories, types et fonctions du §2'],
  ['S5', 'data : `quantificateur` ajouté à 毎日', VOC, (t) => { const v = J(t); const s = sensDe(v, 'v_330_s1'); s.linguistic_functions = { ...(s.linguistic_functions ?? {}), grammatical: ['quantificateur'] }; return S(v); }, 'aucune fonction d\'A9 dans T7'],
  ['S6', 'data : relation ajoutée à まずい sens 1', VOC, (t) => { const v = J(t); const s = sensDe(v, 'v_427_s1'); s.relations = [...(s.relations ?? []), { type: 'opposed_to', target: 'v_474_s1' }]; return S(v); }, 'relations publiées touchant T7'],
  ['S7', 'journal : D0819 repassée en `proposed`', 'reconstruction/a2-04/journal.json', (t) => { const j = J(t); j.find((d) => d.id === 'A2-04-D0819').status = 'proposed'; return S(j); }, 'décisions de journal par ENTRY'],
  ['S8', 'lot 01 : ENTRY 両親 repassée en `proposed`', 'reconstruction/a2-04/lots/lot-01.json', (t) => { const j = J(t); j.entries.n5_v_20.status = 'proposed'; return S(j); }, 'chaque ENTRY validée dans son lot d\'origine'],
  ['S9', 'criblage : relevé C7-c de 大好き retiré', 'a2-05-travail/criblage/resultat.json', (t) => { const j = J(t); const c = j.candidats.find((x) => x.id === 'v_2_s1'); c.regles = c.regles.filter((g) => g.regle !== 'C7-c'); return S(j); }, 'chaque sens de T7 candidat sur C7-b ou C7-c'],
  ['S10', 'registre : T7 réduite à D1', 'a2-05-travail/registre-tranches.json', (t) => { const j = J(t); j.tranches.find((x) => x.id === 'T7').livraisons = ['D1']; return S(j); }, 'restants par tranche du registre'],
  ['S11', 'bilan : correction fictive V1-99 sur 両親', 'docs/rapports/etape2-A2-05-bilan-volet2.md', (t) => t.replace(/\n*$/, '\n\n| V1-99 | `v_20_s1` | x | x | x | x | x | x |\n'), 'corrections retenues sur les ENTRY de T7'],
  ['S12', 'rapport arbitré de T5 revenu en proposition', 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le /m, '**Statut** : **proposé le '), 'les 296 sens arbitrés à la clôture de T6'],
  ['S13', 'fiche de 毎年 insérée dans le rapport arbitré de T6', 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', (t) => t.replace(/\n*$/, '\n\n#### `v_329_s1` · 毎年 · « Chaque année » — proposé : **conforme**\n'), 'sens non encore examinés'],
  ['S14', 'manifeste : une empreinte altérée', 'a2-05-travail/empreintes-rapports-arbitres.json', (t) => t.replace(/("docs\/rapports\/etape2-A2-05-volet1-lot3-T6\.md": ")([0-9a-f])/, (m, a, c) => a + (c === '0' ? '1' : '0')), 'manifeste'],
  ['S15', 'périmètre généré : type de 毎年 modifié au §2', GEN, (t) => t.replace(/(\| `v_329_s1` \| [^\n]*?\| )`concept_abstrait`/, '$1`etat`'), 'catégories, types et fonctions du §2'],
  ['S16', 'périmètre généré : une décision retirée du §5 (毎年)', GEN, (t) => t.replace('D0038 (decision, readings)', '**aucune**'), 'décisions de journal par ENTRY'],
];
temoin('avant');
for (const [n, quoi, p, f, attendu] of SAB) {
  const orig = readFileSync(join(C, p)); const mod = f(orig.toString('utf8'));
  if (mod === orig.toString('utf8')) { ok(false, n + ' ' + quoi, 'sabotage sans effet sur ' + p); continue; }
  writeFileSync(join(C, p), mod); const r = rec(); writeFileSync(join(C, p), orig);
  const ec = r.out.split('\n').filter((l) => l.startsWith('ÉCART')).map((l) => l.slice(9).split(' : ')[0]);
  ok(r.code === 1 && ec.some((l) => l.includes(attendu)) && shaB(readFileSync(join(C, p))) === shaB(orig), n + ' ' + quoi, 'code ' + r.code + ' ; ' + ec.length + ' écart(s) : ' + ec.join(' | ').slice(0, 300) + ' ; restauré');
}
temoin('après');
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(); const ch = [...new Set([...Object.keys(reel0), ...Object.keys(reel1)])].filter((p) => reel0[p] !== reel1[p]);
ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel1).length + ' fichiers identiques');
dire(ecarts ? ecarts + ' écart(s)' : 'sabotages conformes : ' + SAB.length + ' sur ' + SAB.length + ' détectés');
mkdirSync(join(root, OUT), { recursive: true }); writeFileSync(join(root, OUT, 'sabotages.txt'), log.join('\n') + '\n');
process.exit(ecarts ? 1 : 0);
