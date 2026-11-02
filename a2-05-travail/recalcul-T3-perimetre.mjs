// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T3 (B15, B16), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, le bilan du volet 2 (corrections), le rapport du lot 1 et le périmètre
// généré, et compare. Code 1 au premier écart. Ne juge aucun sens.
// Usage : node a2-05-travail/recalcul-T3-perimetre.mjs <racine du dépôt>
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+'; const LIVS = ['B15', 'B16'];
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// 1. Découpage arbitré : liste du §6 et lignes de synthèse
const decoupage = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
const liste = [...decoupage.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3] }));
const t3 = liste.filter((l) => LIVS.includes(l.liv));
const synth = Object.fromEntries([...decoupage.matchAll(/^\| (B1[56]) \| B \| [^|]+ \| ([0-9]+) \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => [m[1], +m[2]]));
ctl(liste.length === 377 && new Set(liste.map((l) => l.id)).size === 377, 'liste globale', liste.length + ' lignes, ' + new Set(liste.map((l) => l.id)).size + ' distinctes');
ctl(LIVS.every((l) => t3.filter((x) => x.liv === l).length === synth[l]) && t3.length === 24, 'B15 et B16 contre la synthèse', LIVS.map((l) => l + ' ' + t3.filter((x) => x.liv === l).length + '/' + synth[l]).join(', ') + ' (lignes ' + t3[0]?.n + ' à ' + t3.at(-1)?.n + ')');
const ids = t3.map((l) => l.id); const entries = [...new Set(ids.map((id) => id.replace(/_s[0-9]+$/, '')))];
ctl(new Set(ids).size === 24 && entries.length === 24, 'aucun doublon de sens ni d\'ENTRY', ids.length + ' sens, ' + entries.length + ' ENTRY');

// 2. Périmètre généré : §2 identique au découpage
const gen = txt('docs/rapports/etape2-A2-05-volet1-lot3-T3-perimetre.md');
const s2 = gen.slice(gen.indexOf('## 2. '), gen.indexOf('## 3. '));
const idsGen = [...s2.matchAll(new RegExp('^\\| [0-9]+ \\| `(' + ID + ')` \\|', 'gm'))].map((m) => m[1]);
ctl(idsGen.length === ids.length && idsGen.every((id, k) => id === ids[k]), 'sens du périmètre généré = découpage', idsGen.length + ' sens, ' + entries.length + ' ENTRY');

// 3. Corrections : toute ligne de tableau du bilan (hors §7) citant une ENTRY de T3 ou l'un de ses sens, identifiant exact
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md').replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
const cite = (l, e) => new RegExp('`(?:n5_)?' + e + '(?:_s[0-9]+)?`').test(l);
const corr = bilan.split('\n').filter((l) => /^\| (V[12]-[0-9]+|[0-9]+) \|/.test(l) && entries.some((e) => cite(l, e))).map((l) => l.split('|')[1].trim());
const corrGen = ((gen.match(/^- \*\*Corrections retenues sur ces ENTRY\*\*[^:]*: (.*)\.$/m) ?? [])[1] ?? '').split(', ').filter(Boolean);
ctl(corr.length === corrGen.length && corr.every((c) => corrGen.includes(c)), 'corrections retenues (V1-n, V2-n, modifications du volet 2)', 'recalcul ' + corr.join(', ') + ' ; générateur ' + corrGen.join(', '));
console.log('constat  corrections V1-n ou modifications du volet 2 sur les ENTRY de T3 : ' + (corr.filter((c) => /^V1-|^[0-9]+$/.test(c)).join(', ') || 'aucune'));

// 4. Comparables du lot 1 : étiquette du générateur (corrigé) conforme au verdict arbitré
const lot1 = new Map([...txt('docs/rapports/etape2-A2-05-coherence-retroactive.md').matchAll(new RegExp('^#### `(' + ID + ')` · [^\\n]* — \\*\\*([^*]+)\\*\\*$', 'gm'))].map((m) => [m[1], m[2]]));
const comp = new Map([...gen.matchAll(new RegExp('^\\| `(' + ID + ')` \\|.*\\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim()]));
ctl(lot1.size === 19, 'sens du lot 1', lot1.size);
const vus = [...lot1.keys()].filter((x) => comp.has(x));
const faux = vus.filter((id) => !comp.get(id).endsWith('volet 1, lot 1 (' + lot1.get(id) + ', arbitré)'));
ctl(!faux.length, 'étiquettes des comparables du lot 1 conformes au verdict arbitré', vus.map((id) => id + ' « ' + comp.get(id) + ' »').join(' ; ') || 'aucun comparable du lot 1');
console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');
process.exit(ecarts ? 1 : 0);
