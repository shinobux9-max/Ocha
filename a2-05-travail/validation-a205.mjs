// A2-05 · volet 1 · échantillon de VALIDATION du criblage révisé. Lecture seule.
// Usage : node validation-a205.mjs <racine> <scratchpad> <graine> <taille> <fichier des sens déjà lus>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const [root, sp, seedArg, sizeArg, readFile] = process.argv.slice(2);
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const res = read(join(sp, 'criblage/resultat.json'));
const cand = new Set(res.candidats.map((c) => c.id));
const already = new Set(read(readFile));
const vocab = [...read(join(root, 'data/n5/vocab.json')), ...read(join(root, 'data/vocab-hors-jlpt.json'))];
const sources = new Map([...read(join(root, 'reconstruction/a2-04/sources/vocab.json')), ...read(join(root, 'reconstruction/a2-04/sources/vocab-hors-jlpt.json'))].map((e) => [e.id, e]));
const lotOf = new Map();
for (const f of readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((x) => x.endsWith('.json')).sort()) for (const id of Object.keys(read(join(root, 'reconstruction/a2-04/lots', f)).entries ?? {})) lotOf.set(id, Number(f.replace(/\D/g, '')));
const S = [];
for (const e of vocab) {
  const n = e.id.slice(2);
  const srcId = [`n5_v_${n}`, `hj_v_${n}`].find((id) => sources.has(id)) ?? [...sources.values()].find((x) => x.id.startsWith('hj_') && x.word === e.word)?.id;
  for (const s of e.senses) S.push({ id: s.id, word: e.word, cls: e.linguistic.grammatical_class, lot: lotOf.get(srcId), srcId, cat: !!s.category, type: !!s.semantic_type, dim: s.dimensions.length > 0, fn: s.linguistic_functions.grammatical.length + s.linguistic_functions.pragmatic_discourse.length > 0, tag: (e.tags ?? []).length + (s.tags ?? []).length > 0, rel: s.relations.length > 0 });
}
const nonCand = S.filter((s) => !cand.has(s.id));
const pool = nonCand.filter((s) => !already.has(s.id));
const size = Number(sizeArg);
let a = Number(seedArg) >>> 0;
const rnd = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const shuffle = (list) => { const l = list.slice().sort((x, y) => x.id.localeCompare(y.id)); for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return l; };
const lots = [...new Set(pool.map((s) => s.lot))].sort((x, y) => x - y);
const g = new Map(lots.map((l) => [l, shuffle(pool.filter((s) => s.lot === l))]));
const quota = new Map(lots.map((l) => [l, (g.get(l).length / pool.length) * size]));
const alloc = new Map(lots.map((l) => [l, Math.min(g.get(l).length, Math.max(1, Math.floor(quota.get(l))))]));
const total = () => [...alloc.values()].reduce((x, y) => x + y, 0);
// on ramène le total à la taille voulue : on complète par plus grand reste, ou on retire aux lots les plus servis
for (const l of lots.slice().sort((x, y) => (quota.get(y) % 1) - (quota.get(x) % 1))) { if (total() >= size) break; if (alloc.get(l) < g.get(l).length) alloc.set(l, alloc.get(l) + 1); }
while (total() > size) { const l = lots.slice().sort((x, y) => (alloc.get(y) - quota.get(y)) - (alloc.get(x) - quota.get(x))).find((x) => alloc.get(x) > 1); alloc.set(l, alloc.get(l) - 1); }
const sample = lots.flatMap((l) => g.get(l).slice(0, alloc.get(l)));
const swaps = [];
const ensure = (label, test) => {
  if (sample.some(test) || !pool.some(test)) return;
  const pick = shuffle(pool.filter((s) => test(s) && !sample.includes(s)))[0];
  // on remplace, dans le lot le plus servi, un sens dont le retrait ne vide aucune strate déjà couverte
  const victim = sample.slice().sort((x, y) => alloc.get(y.lot) - alloc.get(x.lot)).find((v) => sample.filter((s) => s.cls === v.cls).length > 1 && sample.filter((s) => s.lot === v.lot).length > 1 && !(v.tag && sample.filter((s) => s.tag).length === 1));
  sample.splice(sample.indexOf(victim), 1, pick);
  swaps.push({ strate: label, entre: pick.id, sort: victim.id });
};
for (const cls of [...new Set(pool.map((s) => s.cls))].sort()) ensure(`classe ${cls}`, (s) => s.cls === cls);
for (const [l, k] of [['catégorie', 'cat'], ['type', 'type'], ['dimension', 'dim'], ['fonction', 'fn'], ['tag', 'tag'], ['relation', 'rel']]) ensure(`couche ${l}`, (s) => s[k]);
const tally = (list, key) => Object.fromEntries([...new Set(list.map(key))].sort().map((v) => [v, list.filter((s) => key(s) === v).length]));
const out = { graine: Number(seedArg), nonCandidats: nonCand.length, dejaLus: [...already].filter((id) => nonCand.some((s) => s.id === id)).length, population: pool.length, taille: sample.length, parLot: tally(sample, (s) => s.lot), parLotPopulation: tally(pool, (s) => s.lot), parClasse: tally(sample, (s) => s.cls), parClassePopulation: tally(pool, (s) => s.cls), couches: Object.fromEntries(['cat', 'type', 'dim', 'fn', 'tag', 'rel'].map((k) => [k, `${sample.filter((s) => s[k]).length} / ${pool.filter((s) => s[k]).length}`])), remplacements: swaps, echantillon: sample.map((s) => s.id) };
writeFileSync(join(sp, `validation-${seedArg}.json`), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
