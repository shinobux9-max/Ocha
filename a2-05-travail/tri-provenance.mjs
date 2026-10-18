// A2-05 · volet 1 · tri factuel des signalements de provenance (T5). Lecture seule sur les données.
// Range chaque chaîne japonaise signalée par criblage-provenance.mjs dans une classe mécanique ; ne juge rien.
// Usage : node tri-provenance.mjs <racine du dépôt>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const prov = read('a2-05-travail/provenance/resultat.json');
const crib = read('a2-05-travail/criblage/resultat.json');
const audit = readFileSync(join(root, 'docs/rapports/etape2-A2-05-audit-null.md'), 'utf8');
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const ex = read('reconstruction/a2-04/sources/exemples.json');
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
const fusion = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); }

// formes publiées de toutes les ENTRY : mot, graphies, lectures
const formesDe = (e) => [e.word, ...(e.writings ?? []).map((w) => (typeof w === 'string' ? w : w.text ?? w.form ?? w.writing ?? '')), ...(e.readings ?? []).map((r) => r.kana)].flatMap((x) => String(x ?? '').split(/\s*\/\s*/)).filter(Boolean);
const index = new Map();
for (const e of vocab) for (const f of formesDe(e)) index.set(f, [...(index.get(f) ?? []), e.id]);
const kanaDe = [...vocab.flatMap((e) => formesDe(e).filter((f) => /[㐀-鿿々]/.test(f)).map((f) => [f, e.readings?.find((r) => r.default)?.kana ?? e.readings?.[0]?.kana]))].filter((x) => x[1]).sort((a, b) => b[0].length - a[0].length);
const enKana = (s) => { let o = s; for (const [k, v] of kanaDe) o = o.split(k).join(v); return o; };

// texte d'une fiche en jetons : un ruby donne deux variantes (base, lecture)
const jetons = (t) => {
  const s = String(t ?? '').replace(/\*\*/g, '').replace(/<(?!\/?(?:ruby|rt)\b)[^>]*>/g, '').replace(/\s+/g, '');
  const out = []; let i = 0;
  for (const m of s.matchAll(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g)) { for (const c of s.slice(i, m.index).replace(/<[^>]*>/g, '')) out.push([c]); out.push([m[1], m[2]]); i = m.index + m[0].length; }
  for (const c of s.slice(i).replace(/<[^>]*>/g, '')) out.push([c]);
  return out;
};
const contient = (T, s) => { const go = (i, p) => p === s.length || (i < T.length && T[i].some((a) => a && s.startsWith(a, p) && go(i + 1, p + a.length))); for (let i = 0; i < T.length; i += 1) if (go(i, 0)) return true; return false; };
const PART = 'をがにでとのはへも';
// romaji (Hepburn simplifié) : pour retrouver un mot que la fiche cite en caractères latins
const KR = { きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo', しゃ: 'sha', しゅ: 'shu', しょ: 'sho', ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho', にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo', ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo', みゃ: 'mya', みゅ: 'myu', みょ: 'myo', りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo', ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo', じゃ: 'ja', じゅ: 'ju', じょ: 'jo', びゃ: 'bya', びゅ: 'byu', びょ: 'byo', ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo', あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o', か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko', さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so', た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to', な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no', は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho', ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo', や: 'ya', ゆ: 'yu', よ: 'yo', ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro', わ: 'wa', を: 'o', ん: 'n', が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go', ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo', だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do', ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo', ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po' };
const plat = (s) => s.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '').replace(/ou|oo/g, 'o').replace(/uu/g, 'u').replace(/ii/g, 'i').replace(/aa/g, 'a').replace(/ee|ei/g, 'e').replace(/wo/g, 'o');
const romaji = (kana) => {
  const h = [...kana].map((c) => (c >= 'ァ' && c <= 'ヶ' ? String.fromCharCode(c.charCodeAt(0) - 96) : c)).join('');
  let o = ''; let dbl = false;
  for (let i = 0; i < h.length;) {
    if (h[i] === 'っ') { dbl = true; i += 1; continue; }
    if (h[i] === 'ー') { i += 1; continue; }
    const two = KR[h.slice(i, i + 2)]; const one = KR[h[i]];
    const r = two ?? one; if (!r) return null;
    o += (dbl ? r[0] : '') + r; dbl = false; i += two ? 2 : 1;
  }
  return o;
};

const out = [];
for (const x of prov.nuances) {
  const eid = x.sens.match(/^v_\d+/)[0];
  const sid = `n5_${eid}`;
  const e = vocab.find((v) => v.id === eid);
  const fiches = [sid, ...(fusion.get(sid) ?? [])];
  const T = fiches.flatMap((id) => { const f = sources.get(id); return [f?.word, f?.reading, f?.nuance, f?.example?.japanese, ...((ex.vocab?.[id] ?? []).map((q) => q.japanese))].flatMap((t) => [...jetons(t), ['\u0000']]); });
  const lecture = T.map((t) => enKana(t[t.length - 1])).join('');
  // mots latins de la nuance des fiches, et suites de un à cinq mots : la comparaison se fait sur des mots entiers
  const mots = fiches.map((id) => sources.get(id)?.nuance ?? '').join(' ').replace(/<[^>]*>/g, ' ').normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^A-Za-z]+/).filter(Boolean);
  const latin = new Set();
  for (let i = 0; i < mots.length; i += 1) for (let n = 1; n <= 5 && i + n <= mots.length; n += 1) latin.add(plat(mots.slice(i, i + n).join('')));
  const enLatin = (s) => { const r = romaji(enKana(s)); if (!r || r.length < 2) return false; return [r, r.replace(/ha/g, 'wa')].some((v) => latin.has(plat(v))); };
  const propres = formesDe(e);
  const racines = [...new Set(propres.flatMap((f) => [f, f.length > 1 ? f.slice(0, -1) : f]))].sort((a, b) => b.length - a.length);
  const chaines = x.absents.map((s) => {
    let classe;
    const autres = (index.get(s) ?? []).filter((id) => id !== eid);
    if (contient(T, s) || lecture.includes(enKana(s))) classe = 'B-transcription';
    else if (enLatin(s)) classe = 'B-romaji';
    else if (propres.includes(s)) classe = 'A-forme-publiee';
    else if (autres.length) classe = 'A-renvoi';
    else {
      const r = racines.find((q) => s.includes(q));
      if (r) {
        const [avant, ...reste] = s.split(r); const apres = reste.join(r);
        const simple = /^[おご]?$/.test(avant) && /^[ぁ-ゖー]{0,5}$/.test(apres) && !(apres && PART.includes(apres[0]) && apres.length > 1) && !apres.includes('を');
        classe = simple ? 'C-forme-de-l-entree' : 'D-exemple-construit';
      } else classe = [...s].some((c) => PART.includes(c)) && s.length > 4 ? 'D-exemple-construit' : 'E-autre-mot';
    }
    return { chaine: s, classe, renvoi: autres };
  });
  const ordre = ['D-exemple-construit', 'E-autre-mot', 'C-forme-de-l-entree', 'A-renvoi', 'A-forme-publiee', 'B-romaji', 'B-transcription'];
  const classe = ordre.find((c) => chaines.some((k) => k.classe === c));
  out.push({ sens: x.sens, entree: eid, mot: x.mot, lot: x.lot, classe, chaines, nuance: x.nuance });
}
const compte = (l, k) => Object.fromEntries(Object.entries(l.reduce((a, x) => ({ ...a, [k(x)]: (a[k(x)] ?? 0) + 1 }), {})).sort());
const v2 = new Set([...audit.matchAll(/^#### `(v_\d+_s\d+)` /gm)].map((m) => m[1]));
const LOT1 = ['v_455_s2', 'v_221_s1', 'v_628_s1', 'v_663_s3', 'v_504_s1'];
const candidats = new Set(crib.candidats.filter((c) => !v2.has(c.id) && !LOT1.includes(c.id)).map((c) => c.id));
if (candidats.size !== 377) throw new Error(`candidats : ${candidats.size}`);
const sensDe = (r) => (r.sens.includes('_s') ? [r.sens] : vocab.find((v) => v.id === r.entree).senses.map((s) => s.id));
for (const r of out) { r.niveau = r.sens.includes('_s') ? 'sens' : 'entree'; r.candidats377 = sensDe(r).filter((id) => candidats.has(id)); r.dans147 = sensDe(r).filter((id) => v2.has(id)); }
const resume = {
  releves: out.length, chaines: out.reduce((n, r) => n + r.chaines.length, 0),
  parClasse: compte(out, (r) => r.classe), chainesParClasse: compte(out.flatMap((r) => r.chaines), (c) => c.classe),
  parLot: Object.fromEntries([...new Set(out.map((r) => r.lot))].sort().map((l) => [l, compte(out.filter((r) => r.lot === l), (r) => r.classe)]))
};
writeFileSync(join(root, 'a2-05-travail/provenance/tri.json'), JSON.stringify({ resume, releves: out }, null, 1));
console.log(JSON.stringify(resume, null, 1));
for (const c of ['B-romaji', 'A-renvoi']) { console.log(`--- ${c}`); for (const r of out.filter((q) => q.classe === c)) console.log(' ', r.sens.replace(" (nuance d'ENTRY)", '*'), r.mot, r.lot.slice(4), '|', r.chaines.map((k) => `${k.chaine}[${k.classe.slice(0, 3)}]`).join(' ')); }
const reste = out.filter((r) => !r.classe.startsWith('B'));
console.log('reste', reste.length, 'niveau', JSON.stringify(compte(reste, (r) => r.niveau)), 'ENTRY', new Set(reste.map((r) => r.entree)).size, 'avec candidats377', reste.filter((r) => r.candidats377.length).length, 'sens candidats', new Set(reste.flatMap((r) => r.candidats377)).size, 'avec sens des 147', reste.filter((r) => r.dans147.length).length);
console.log('parLot reste', JSON.stringify(compte(reste, (r) => r.lot.slice(4))));
