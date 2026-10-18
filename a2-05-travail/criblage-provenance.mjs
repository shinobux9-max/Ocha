// A2-05 · volet 1 · T5 : criblage factuel et exhaustif de la provenance. Lecture seule sur les données.
// Relève, pour chaque sens des lots validés : (P) une particule absente des particules des fiches sources de l'ENTRY ;
// (N) un mot japonais d'une nuance (de sens ou d'ENTRY) absent de ces fiches et de leurs anciens exemples.
// Constate et compte ; ne juge rien. Usage : node criblage-provenance.mjs <racine du dépôt>
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const ex = read('reconstruction/a2-04/sources/exemples.json');
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
const st = (s) => String(s ?? '').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, '');
const JA = /[぀-ヿ㐀-鿿々ー]+/g;

// fiches fusionnées dans chaque ENTRY survivante
const fusion = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) {
  const cible = en.retire?.merged_into ?? null;
  if (cible) fusion.set(cible, [...(fusion.get(cible) ?? []), id]);
}
const out = { particules: [], nuances: [], sens: 0, entrees: 0, fusionsLues: [...fusion.values()].flat().length };
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) {
  if (!en.fields?.senses) continue;
  if (!sources.get(id)) { out.horsSources = [...(out.horsSources ?? []), id]; continue; }
  out.entrees += 1;
  const fiches = [id, ...(fusion.get(id) ?? [])].map((x) => sources.get(x)).filter(Boolean);
  const partSrc = new Set(fiches.flatMap((f) => f.particles ?? []));
  const texte = fiches.map((f) => st([f.word, f.reading, f.nuance, f.example?.japanese, ...(f.meanings?.secondary ?? [])].join(' '))).join(' ')
    + [id, ...(fusion.get(id) ?? [])].flatMap((x) => ex.vocab?.[x] ?? []).map((e) => st(e.japanese)).join(' ');
  const pub = vocab.find((e) => e.id === `v_${id.slice(5)}`);
  const formes = st([pub?.word, ...(pub?.writings ?? []).map((w) => w.text ?? w.form ?? ''), ...(pub?.readings ?? []).map((r) => r.kana)].join(' '));
  const absent = (t) => [...new Set((st(t).match(JA) ?? []).filter((m) => m.length >= 2 && !texte.includes(m) && !formes.includes(m)))];
  en.fields.senses.forEach((s, i) => {
    out.sens += 1;
    const sid = `v_${id.slice(5)}_s${i + 1}`;
    const p = (s.particles ?? []).filter((x) => !partSrc.has(x));
    if (p.length) out.particules.push({ sens: sid, mot: sources.get(id).word, lot: l.lot, particules: p, source: [...partSrc] });
    const n = absent(s.nuance);
    if (n.length) out.nuances.push({ sens: sid, mot: sources.get(id).word, lot: l.lot, absents: n, nuance: s.nuance });
  });
  const ne = absent(en.fields.nuance);
  if (ne.length) out.nuances.push({ sens: `v_${id.slice(5)} (nuance d'ENTRY)`, mot: sources.get(id).word, lot: l.lot, absents: ne, nuance: en.fields.nuance });
}
const parLot = (l) => Object.fromEntries(Object.entries(l.reduce((a, x) => ({ ...a, [x.lot]: (a[x.lot] ?? 0) + 1 }), {})).sort());
out.resume = { sens: out.sens, entrees: out.entrees, particules: out.particules.length, nuances: out.nuances.length, particulesParLot: parLot(out.particules), nuancesParLot: parLot(out.nuances) };
mkdirSync(join(root, 'a2-05-travail/provenance'), { recursive: true });
writeFileSync(join(root, 'a2-05-travail/provenance/resultat.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.resume));
for (const x of out.particules) console.log('P', x.sens, x.mot, x.lot, JSON.stringify(x.particules), 'source', JSON.stringify(x.source));
console.log('--- nuances :', out.nuances.length);
for (const x of out.nuances.slice(0, 400)) console.log('N', x.sens, x.mot, x.lot, x.absents.join(' '));
