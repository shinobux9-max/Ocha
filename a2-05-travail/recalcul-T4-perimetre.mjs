// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T4 (C1, C2, C3, C4), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, l'état publié, le journal, le bilan du volet 2 (corrections), les rapports de
// livraison et de tranche, le rapport du lot 1, le manifeste d'empreintes et le périmètre généré, et compare. Code 1 au premier écart.
// Ne juge aucun sens.
// Usage : node a2-05-travail/recalcul-T4-perimetre.mjs <racine du dépôt>
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+'; const LIVS = ['C1', 'C2', 'C3', 'C4']; const N = 35;
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// 1. Découpage arbitré : liste du §6 et lignes de synthèse
const decoupage = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
const liste = [...decoupage.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3] }));
const t4 = liste.filter((l) => LIVS.includes(l.liv));
const synth = Object.fromEntries([...decoupage.matchAll(/^\| (C[1-4]) \| C \| [^|]+ \| ([0-9]+) \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => [m[1], +m[2]]));
ctl(liste.length === 377 && new Set(liste.map((l) => l.id)).size === 377, 'liste globale', liste.length + ' lignes, ' + new Set(liste.map((l) => l.id)).size + ' distinctes');
ctl(LIVS.every((l) => t4.filter((x) => x.liv === l).length === synth[l]) && t4.length === N, 'C1 à C4 contre la synthèse', LIVS.map((l) => l + ' ' + t4.filter((x) => x.liv === l).length + '/' + synth[l]).join(', ') + ' (lignes ' + t4[0]?.n + ' à ' + t4.at(-1)?.n + ')');
ctl(t4.every((x, k) => x.n === t4[0].n + k), 'lignes contiguës du découpage', t4.map((x) => x.n).join(',').slice(0, 40) + '…');
const ids = t4.map((l) => l.id); const entries = [...new Set(ids.map((id) => id.replace(/_s[0-9]+$/, '')))];
ctl(new Set(ids).size === N && entries.length === N, 'aucun doublon de sens ni d\'ENTRY', ids.length + ' sens, ' + entries.length + ' ENTRY');

// 2. Aucun de ces sens n'est déjà examiné dans un rapport de livraison ou de tranche (hors périmètres)
const rapports = readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)[0-9]+\.md$/.test(f));
const deja = ids.filter((id) => rapports.some((f) => txt('docs/rapports/' + f).includes('#### `' + id + '` ')));
ctl(!deja.length, 'sens non encore examinés (' + rapports.length + ' rapports de livraison et de tranche lus)', deja.join(', ') || 'aucun déjà examiné');

// 3. Périmètre généré : §2 identique au découpage ; catégorie et type égaux à l'état publié
const gen = txt('docs/rapports/etape2-A2-05-volet1-lot3-T4-perimetre.md');
const s2 = gen.slice(gen.indexOf('## 2. '), gen.indexOf('## 3. '));
const lignes = [...s2.matchAll(new RegExp('^\\| [0-9]+ \\| `(' + ID + ')` \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| (C[1-4]) \\| `([^`]+)` \\| `([^`]+)` \\|', 'gm'))].map((m) => ({ id: m[1], liv: m[2], cat: m[3], type: m[4] }));
ctl(lignes.length === N && lignes.every((l, k) => l.id === ids[k] && l.liv === t4[k].liv), 'sens du périmètre généré = découpage (ordre et livraison)', lignes.length + ' sens, ' + entries.length + ' ENTRY');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const sens = new Map(pub.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const catDe = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const diffCat = lignes.filter((l) => !sens.has(l.id) || catDe(sens.get(l.id).s.category) !== l.cat || sens.get(l.id).s.semantic_type !== l.type);
ctl(!diffCat.length, 'catégories et types du §2 = état publié (data/)', diffCat.map((l) => l.id).join(', ') || N + ' sens identiques');

// 4. Décisions de journal par ENTRY, lues directement (source canonique : n5_v_N, ou l'identifiant hj de même mot)
const hj = json('reconstruction/a2-04/sources/vocab-hors-jlpt.json');
const src = (e) => (sens.get(e + '_s1').e.level === 'hors_jlpt' ? hj.find((h) => h.word === sens.get(e + '_s1').e.word)?.id : 'n5_' + e);
const journal = json('reconstruction/a2-04/journal.json');
const s5 = gen.slice(gen.indexOf('## 5. '), gen.indexOf('## 6. '));
const decGen = new Map([...s5.matchAll(/^\| `(v_[0-9]+)` \| [^|]+ \| `([^`]+)` \| (.*) \|$/gm)].map((m) => [m[1], { src: m[2], d: [...m[3].matchAll(/D[0-9]{4}/g)].map((x) => x[0]) }]));
const ecD = entries.filter((e) => { const s = src(e); const d = journal.filter((x) => x.entry === s).map((x) => x.id.replace('A2-04-', '')); const g = decGen.get(e); return !g || g.src !== s || d.join() !== g.d.join() || journal.some((x) => x.entry === s && x.status !== 'validated'); });
const nDec = entries.reduce((n, e) => n + journal.filter((x) => x.entry === src(e)).length, 0);
ctl(!ecD.length, 'décisions de journal par ENTRY = §5 du générateur (toutes validées)', ecD.join(', ') || nDec + ' décisions ; sans décision : ' + entries.filter((e) => !journal.some((x) => x.entry === src(e))).map((e) => sens.get(e + '_s1').e.word + ' (' + src(e) + ')').join(', '));

// 5. Corrections : toute ligne de tableau du bilan (hors §7) citant une ENTRY de T4 ou l'un de ses sens, identifiant exact
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md').replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
const cite = (l, e) => new RegExp('`(?:n5_)?' + e + '(?:_s[0-9]+)?`').test(l);
const corr = bilan.split('\n').filter((l) => /^\| (V[12]-[0-9]+|[0-9]+) \|/.test(l) && entries.some((e) => cite(l, e))).map((l) => l.split('|')[1].trim());
const corrGen = ((gen.match(/^- \*\*Corrections retenues sur ces ENTRY\*\*[^:]*: (.*)\.$/m) ?? [])[1] ?? '').split(', ').filter(Boolean);
ctl(corr.length === corrGen.length && corr.every((c) => corrGen.includes(c)), 'corrections retenues (V1-n, V2-n, modifications du volet 2)', 'recalcul ' + corr.join(', ') + ' ; générateur ' + corrGen.join(', '));
console.log('constat  corrections V1-n ou modifications du volet 2 sur les ENTRY de T4 : ' + (corr.filter((c) => /^V1-|^[0-9]+$/.test(c)).join(', ') || 'aucune'));

// 6. Comparables du lot 1 : étiquette du générateur conforme au verdict arbitré
const lot1 = new Map([...txt('docs/rapports/etape2-A2-05-coherence-retroactive.md').matchAll(new RegExp('^#### `(' + ID + ')` · [^\\n]* — \\*\\*([^*]+)\\*\\*$', 'gm'))].map((m) => [m[1], m[2]]));
const comp = new Map([...gen.matchAll(new RegExp('^\\| `(' + ID + ')` \\|.*\\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim()]));
ctl(lot1.size === 19, 'sens du lot 1', lot1.size);
const vus = [...lot1.keys()].filter((x) => comp.has(x));
const faux = vus.filter((id) => !comp.get(id).endsWith('volet 1, lot 1 (' + lot1.get(id) + ', arbitré)'));
ctl(!faux.length, 'étiquettes des comparables du lot 1 conformes au verdict arbitré', vus.map((id) => id + ' « ' + comp.get(id) + ' »').join(' ; ') || 'aucun comparable du lot 1');

// 7. Manifeste : 33 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2 ; périmètre de T4 absent
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes;
const diffE = Object.entries(man).filter(([p, h]) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);
ctl(Object.keys(man).length === 33 && !diffE.length && !Object.hasOwn(man, 'docs/rapports/etape2-A2-05-volet1-lot3-T4-perimetre.md'), 'manifeste : 33 empreintes recalculées, identiques ; périmètre de T4 hors du manifeste', Object.keys(man).length + ' entrées ; différentes : ' + (diffE.join(', ') || 'aucune'));
console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');
process.exit(ecarts ? 1 : 0);
