// A2-05 · volet 1 · lot 2 (provenance) : périmètre proposé de la tranche 2, et plan complet du chantier après les deux défauts
// du tri retenus à l'arbitrage de la tranche 1 (2026-10-10). Lecture seule sur les données ; ne juge aucune nuance.
// Usage : node perimetre-v1-lot2-t2.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-tranche2-perimetre.md et a2-05-travail/provenance/plan-tranches.json
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const { releves } = read('a2-05-travail/provenance/tri.json');
const crib = read('a2-05-travail/criblage/resultat.json');
const prov = read('a2-05-travail/provenance/resultat.json');
const audit = readFileSync(join(root, 'docs/rapports/etape2-A2-05-audit-null.md'), 'utf8');
const rapportT1 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance.md'), 'utf8');
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const ex = read('reconstruction/a2-04/sources/exemples.json');
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
const fusion = new Map();
const lotDe = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) lotDe.set(`v_${id.slice(5)}`, l.lot.slice(4)); }
const compte = (l, k) => Object.fromEntries(Object.entries(l.reduce((a, x) => ({ ...a, [k(x)]: (a[k(x)] ?? 0) + 1 }), {})).sort());
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// Les mêmes normalisations que criblage-provenance.mjs (st, JA) et tri-provenance.mjs (formes, jetons, contient, enKana).
const st = (s) => String(s ?? '').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, '');
const JA = /[぀-ヿ㐀-鿿々ー]+/g;
const KANJI = /[㐀-鿿々]/;
const formesDe = (e) => [e.word, ...(e.writings ?? []).map((w) => (typeof w === 'string' ? w : w.text ?? w.form ?? w.writing ?? '')), ...(e.readings ?? []).map((r) => r.kana)].flatMap((x) => String(x ?? '').split(/\s*\/\s*/)).filter(Boolean);
const index = new Map();
for (const e of vocab) for (const f of formesDe(e)) index.set(f, [...new Set([...(index.get(f) ?? []), e.id])]);
// Mots et graphies seuls, sans les lectures : un kana qui n'est que la lecture d'un autre mot (さん, 三) n'est pas un renvoi.
const indexMot = new Map();
for (const e of vocab) for (const f of [e.word, ...(e.writings ?? []).map((w) => (typeof w === 'string' ? w : w.text ?? w.form ?? w.writing ?? ''))].flatMap((x) => String(x ?? '').split(/\s*\/\s*/)).filter(Boolean)) indexMot.set(f, [...new Set([...(indexMot.get(f) ?? []), e.id])]);
const jetons = (t) => {
  const s = String(t ?? '').replace(/\*\*/g, '').replace(/<(?!\/?(?:ruby|rt)\b)[^>]*>/g, '').replace(/\s+/g, '');
  const out = []; let i = 0;
  for (const m of s.matchAll(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g)) { for (const c of s.slice(i, m.index).replace(/<[^>]*>/g, '')) out.push([c]); out.push([m[1], m[2]]); i = m.index + m[0].length; }
  for (const c of s.slice(i).replace(/<[^>]*>/g, '')) out.push([c]);
  return out;
};
const contient = (T, s) => { const go = (i, p) => p === s.length || (i < T.length && T[i].some((a) => a && s.startsWith(a, p) && go(i + 1, p + a.length))); for (let i = 0; i < T.length; i += 1) if (go(i, 0)) return true; return false; };

// Arbitrages et listes fermées déjà établis
const v2 = new Set([...audit.matchAll(/^#### `(v_\d+_s\d+)` /gm)].map((m) => m[1]));
const LOT1 = ['v_455_s2', 'v_221_s1', 'v_628_s1', 'v_663_s3', 'v_504_s1'];
const candidats = new Set(crib.candidats.filter((c) => !v2.has(c.id) && !LOT1.includes(c.id)).map((c) => c.id));
if (candidats.size !== 377) throw new Error(`candidats : ${candidats.size}`);
const ARBITRES_LOT1 = ['v_642_s2', 'v_642_s3', 'v_266_s2'];
const MODS_V2 = { v_500_s2: 1, v_65_s2: 2, v_696_s1: 3, v_606_s1: 4, v_687_s1: 5, v_528_s1: 6, v_671_s1: 7, v_287_s1: 8, v_500_s1: 9, v_503_s1: 10 };
const V1 = { v_221_s1: 'V1-1', v_642_s2: 'V1-2', v_642_s3: 'V1-3', v_266_s2: 'V1-4', v_265_s2: 'V1-5' };
const T1 = [...rapportT1.matchAll(/^### `(v_[\w]+)` · /gm)].map((m) => m[1]);
const V2T1 = Object.fromEntries([...rapportT1.split('## P1.3')[1].split('## P1.4')[0].matchAll(/^\| (V2-\d+) \| `(v_[\w]+)` \|/gm)].map((m) => [m[2], m[1]]));
if (T1.length !== 34 || Object.keys(V2T1).length !== 25) throw new Error(`tranche 1 : ${T1.length} fiches, ${Object.keys(V2T1).length} corrections`);
// Nuances lues pour leur provenance en tranche 1 : les 33 signalées A à E. La nuance de 近く sens 1 (v_704_s1), faux positif du tri,
// n'y a été contrôlée que pour sa particule : elle reste un faux positif à contre-vérifier.
const T1nuances = new Set(releves.filter((r) => T1.includes(court(r.sens)) && !r.classe.startsWith('B')).map((r) => r.sens));
if (T1nuances.size !== 33) throw new Error(`nuances de la tranche 1 : ${T1nuances.size}`);

// Univers : toutes les nuances (de sens et d'ENTRY) des ENTRY décidées, comme le criblage T5
const tri = new Map(releves.map((r) => [r.sens, r]));
const univers = [];
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) {
  if (!en.fields?.senses || !sources.get(id)) continue;
  const eid = `v_${id.slice(5)}`;
  const fiches = [id, ...(fusion.get(id) ?? [])];
  const F = fiches.map((x) => sources.get(x));
  const texte = F.map((f) => st([f.word, f.reading, f.nuance, f.example?.japanese, ...(f.meanings?.secondary ?? [])].join(' '))).join(' ') + fiches.flatMap((x) => ex.vocab?.[x] ?? []).map((e) => st(e.japanese)).join(' ');
  const T = fiches.flatMap((x) => { const f = sources.get(x); return [f?.word, f?.reading, f?.nuance, f?.example?.japanese, ...((ex.vocab?.[x] ?? []).map((q) => q.japanese))].flatMap((t) => [...jetons(t), ['\u0000']]); });
  const partFiche = new Set(F.flatMap((f) => f.particles ?? []));
  const e = vocab.find((v) => v.id === eid);
  const ajoute = (sid, niveau, nuance) => {
    if (!nuance) return;
    const runs = [...new Set(st(nuance).match(JA) ?? [])];
    // Chaînes d'un seul caractère : tout kanji ; un kana seulement s'il n'est pas une particule du champ des fiches.
    const uns = runs.filter((c) => c.length === 1 && c !== 'ー').map((c) => ({ c, kanji: KANJI.test(c), absent: !texte.includes(c) }))
      .filter((u) => u.kanji || !partFiche.has(u.c));
    univers.push({ sens: sid, entree: eid, mot: e.word, lot: l.lot, niveau, uns, T, sensDe: niveau === 'sens' ? [sid] : e.senses.map((s) => s.id), runs });
  };
  en.fields.senses.forEach((s, i) => ajoute(`${eid}_s${i + 1}`, 'sens', s.nuance));
  ajoute(`${eid} (nuance d'ENTRY)`, 'entree', en.fields.nuance);
}
if (univers.filter((u) => tri.has(u.sens)).length !== releves.length) throw new Error('le tri ne retrouve pas toutes ses nuances dans l\'univers');
// ENTRY décidées dont la fiche n'est pas dans sources/vocab.json (fiches hors JLPT) : le criblage T5 les a sautées.
const horsCrib = lots.flatMap((l) => Object.entries(l.entries).filter(([id, en]) => en.fields?.senses && !sources.get(id))
  .flatMap(([id, en]) => [en.fields.nuance ? { sens: `${id} (nuance d'ENTRY)`, lot: l.lot.slice(4), nuance: en.fields.nuance } : null, ...en.fields.senses.map((s, i) => (s.nuance ? { sens: `${id}_s${i + 1}`, lot: l.lot.slice(4), nuance: s.nuance } : null))].filter(Boolean)));
if (JSON.stringify(horsCrib.map((h) => h.sens)) !== JSON.stringify(prov.horsSources?.map((id) => `${id} (nuance d'ENTRY)`) ?? [])) throw new Error(`hors criblage : ${horsCrib.map((h) => h.sens)}`);
if (new Set(univers.map((u) => u.sens)).size !== univers.length) throw new Error('nuance en double dans l\'univers');

// Statut de chaque nuance dans le chantier
const MOTIF = { 'A-renvoi': 'A', 'C-forme-de-l-entree': 'C', 'D-exemple-construit': 'D', 'E-autre-mot': 'E', 'B-romaji': 'B-romaji', 'B-transcription': 'B-transcription' };
for (const u of univers) {
  const r = tri.get(u.sens);
  if (ARBITRES_LOT1.includes(u.sens)) u.statut = 'arbitré au lot 1';
  else if (T1nuances.has(u.sens)) u.statut = 'arbitré en tranche 1';
  else if (r && !r.classe.startsWith('B')) u.statut = 'à examiner';
  else if (r) u.statut = 'faux positif à contre-vérifier';
  else if (u.uns.length) u.statut = 'un caractère seulement';
  else u.statut = 'hors chantier';
  u.motif = r ? MOTIF[r.classe] : (u.uns.length ? 'S1' : null);
  u.chaines = r ? r.chaines : [];
  // Une chaîne B est rapprochée par sa seule lecture (romaji, ou kana sans la graphie) : homophonie possible.
  u.parLecture = u.chaines.filter((c) => c.classe === 'B-romaji' || (c.classe === 'B-transcription' && !contient(u.T, c.chaine))).map((c) => c.chaine);
  u.candidats377 = u.sensDe.filter((id) => candidats.has(id));
  u.dans147 = u.sensDe.filter((id) => v2.has(id));
  const ids = u.niveau === 'entree' ? [u.entree, ...u.sensDe] : [u.sens];
  u.corrections = [...u.sensDe.filter((id) => MODS_V2[id]).map((id) => `volet 2 n° ${MODS_V2[id]} (\`${id}\`)`), ...u.sensDe.filter((id) => V1[id]).map((id) => `${V1[id]} (\`${id}\`)`),
    ...Object.entries(V2T1).filter(([k]) => ids.includes(k)).map(([k, n]) => `${n} (\`${k}\`)`)];
  u.lotN = u.lot.slice(4);
}
const st0 = compte(univers, (u) => u.statut);
const aExaminer = univers.filter((u) => u.statut === 'à examiner');
const fauxP = univers.filter((u) => u.statut === 'faux positif à contre-vérifier');
const s1 = univers.filter((u) => u.statut === 'un caractère seulement');
if (aExaminer.length !== 151 || fauxP.length !== 83 || st0['arbitré en tranche 1'] !== 33 || st0['arbitré au lot 1'] !== 3) throw new Error(`statuts : ${JSON.stringify(st0)}`);
if (fauxP.filter((u) => u.motif === 'B-romaji').length !== 50 || fauxP.filter((u) => u.motif === 'B-transcription').length !== 33) throw new Error('faux positifs : 50 et 33 attendus');

// Plan des tranches : lots d'origine ; la tranche 2 reçoit aussi le complément des lots de la tranche 1 (04, 07).
const PLAN = [['1 bis', [], ['04', '07']], ['2', ['00', '01'], []], ['3', ['02', '03'], []], ['4', ['05', '06'], []], ['5', ['08', '09'], []], ['6', ['10', '11'], []], ['7', ['12', '15', '18'], []]];
const lotsPlan = PLAN.flatMap(([, a, b]) => [...a, ...b]);
const lotsSans = [...new Set(univers.map((u) => u.lotN))].filter((l) => !lotsPlan.includes(l)).sort();
PLAN.push(['8', lotsSans, []]);
const aLire = univers.filter((u) => ['à examiner', 'faux positif à contre-vérifier', 'un caractère seulement'].includes(u.statut));
for (const u of aLire) u.tranche = PLAN.find(([, a, b]) => a.includes(u.lotN) || b.includes(u.lotN))[0];
if (aExaminer.some((u) => ['04', '07'].includes(u.lotN))) throw new Error('nuance à examiner restée dans les lots de la tranche 1');
if (aExaminer.some((u) => u.tranche === '8')) throw new Error('nuance à examiner dans la tranche 8');
const T2 = aLire.filter((u) => u.tranche === '2');
const T1b = aLire.filter((u) => u.tranche === '1 bis');
const ordre = { 'à examiner': 0, 'faux positif à contre-vérifier': 1, 'un caractère seulement': 2 };
for (const L of [T2, T1b]) L.sort((a, b) => ordre[a.statut] - ordre[b.statut] || a.lot.localeCompare(b.lot) || Number(a.entree.slice(2)) - Number(b.entree.slice(2)) || a.sens.localeCompare(b.sens));
const parTranche = PLAN.map(([t, a, b]) => { const l = aLire.filter((u) => u.tranche === t); return { t, lots: a, complement: b, total: l.length, ...compte(l, (u) => u.statut) }; });
if (parTranche.reduce((n, x) => n + x.total, 0) !== aLire.length) throw new Error('somme des tranches');
if ([...T2, ...T1b].some((u) => T1nuances.has(u.sens) || ARBITRES_LOT1.includes(u.sens))) throw new Error('tranche 2 : nuance déjà arbitrée');
if (T2.some((u) => !['00', '01'].includes(u.lotN)) || aLire.some((u) => ['00', '01'].includes(u.lotN) && u.tranche !== '2')) throw new Error('tranche 2 : lots 00 et 01 exactement');
if (aLire.some((u) => ['04', '07'].includes(u.lotN) !== (u.tranche === '1 bis'))) throw new Error('complément : lots 04 et 07 exactement');

// Renvois : chaîne de la nuance qui est la forme d'une autre ENTRY publiée ; tranche de cette ENTRY
const trancheDe = (eid) => { const l = lotDe.get(eid); if (!l) return 'hors vocabulaire décidé';
  if (univers.some((u) => u.entree === eid && T1nuances.has(u.sens))) return '1, arbitrée'; return PLAN.find(([, a, b]) => a.includes(l) || b.includes(l))?.[0] ?? '—'; };
const motDe = (id) => vocab.find((v) => v.id === id)?.word ?? id;
const renvoisDe = (u) => [...new Set([...u.chaines.flatMap((c) => c.renvoi ?? []), ...u.runs.flatMap((c) => indexMot.get(c) ?? [])].filter((x) => x !== u.entree))];
const uniq = (l) => [...new Map(l.map((x) => [`${x.de.sens}>${x.vers}`, x])).values()];
const T2etC = [...T1b, ...T2];
const sortants = uniq(T2etC.flatMap((u) => renvoisDe(u).map((x) => ({ de: u, vers: x, t: trancheDe(x) }))));
const T2entrees = new Set(T2etC.map((u) => u.entree));
const entrants = uniq(aLire.filter((u) => !['2', '1 bis'].includes(u.tranche)).flatMap((u) => renvoisDe(u).filter((x) => T2entrees.has(x)).map((x) => ({ de: u, vers: x }))));
const precedentsT1 = uniq(univers.filter((u) => T1nuances.has(u.sens)).flatMap((u) => renvoisDe(u).filter((x) => T2entrees.has(x)).map((x) => ({ de: u, vers: x }))));

writeFileSync(join(root, 'a2-05-travail/provenance/plan-tranches.json'), JSON.stringify({ statuts: st0, parTranche, tranche2: T2.map(({ T, runs, ...u }) => u), complement1bis: T1b.map(({ T, runs, ...u }) => u), toutes: aLire.map(({ T, runs, ...u }) => ({ ...u, renvois: renvoisDe({ ...u, runs }).map((x) => ({ id: x, mot: motDe(x), lot: lotDe.get(x) ?? null, tranche: trancheDe(x) })) })) }, null, 1));

const unites = (l) => l.map((u) => `\`${court(u.sens)}\` ${u.mot}`).join(' ; ');
const chainesTexte = (u) => {
  const c = u.chaines.filter((k) => !k.classe.startsWith('B')).map((k) => k.chaine);
  const b = u.chaines.filter((k) => k.classe.startsWith('B')).map((k) => `${k.chaine}${u.parLecture.includes(k.chaine) ? ' (par la lecture)' : ''}`);
  const s = u.uns.map((k) => `${k.c}${k.absent ? '' : ' (présent dans un texte des fiches)'}`);
  return [c.length ? c.join(' ; ') : null, b.length ? `écartées : ${b.join(' ; ')}` : null, s.length ? `un caractère : ${s.join(' ; ')}` : null].filter(Boolean).join(' — ') || '—';
};
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — périmètre proposé de la tranche 2 du contrôle de provenance');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **périmètre arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur), sous les précisions du §0. La proposition est conservée telle quelle aux §1 à §9.');
P();
P('## 0. Arbitrage du périmètre (2026-10-10)');
P();
P('**Avis favorable au plan recalculé**, avec ces réponses aux questions du §9 :');
P();
P('1. **Les 83 faux positifs présumés sont contre-vérifiés**, et non les seuls 50 rapprochés par le romaji : le cas 風 / 風邪 montre qu\'un rapprochement en kana peut aussi confondre deux homophones.');
P('2. **Les 83 contre-vérifications sont réparties dans les tranches de leurs lots d\'origine**, sans tranche séparée.');
P('3. **La règle de détection des caractères isolés est acceptée** (tout kanji isolé ; tout kana isolé que le critère des particules de la fiche n\'exclut pas). Elle sert **au seul repérage**, jamais à un verdict automatique.');
P('4. **Le bloc 1 bis (10 nuances, lots 04 et 07) et la tranche 2 (43 nuances, lots 00 et 01) sont acceptés, en livraisons séparées**, chacune avec ses propres contrôles de complétude ; **la tranche 2 est subdivisée par lot d\'origine** (lot 00 : 9 ; lot 01 : 34). Ordre : le bloc 1 bis d\'abord, puis la tranche 2 lot par lot.');
P('5. **Rattachement des deux nuances hors JLPT (`hj_v_1`, `hj_v_2`) à la future tranche 4, accepté en proposition** : contrôlées sur leurs fiches source propres (`sources/vocab-hors-jlpt.json`), comptées à part de l\'univers des 684 nuances.');
P();
P('**Conditions de l\'audit** : pour chaque nuance, lecture entière de la fiche source (traductions, nuance, exemple, anciens exemples) et contrôle de la provenance de chaque élément japonais pertinent ; **un rapprochement par la lecture ou un caractère isolé ne vaut jamais preuve** ; le texte français des nuances et les axes C1 à C10 restent hors périmètre ; les 377 candidats restent ouverts ; aucun verdict du volet 2 n\'est rouvert ; à la clôture de chaque sous-tranche, le décompte est actualisé sans double comptage. À la clôture de toute la tranche 2, le périmètre de la tranche 3 sera proposé, sans audit avant accord.');
P();
P('**Proposition d\'origine (2026-10-10)** : *proposition de périmètre, non arbitrée. Aucun audit lexical de la tranche 2 n\'est commencé : aucune nuance n\'a été lue en vue d\'un verdict.* Ce rapport est calculé par `a2-05-travail/perimetre-v1-lot2-t2.mjs`, en lecture seule, sur le tri, le criblage, les fiches sources, les lots et les rapports arbitrés ; rien n\'est modifié dans les données, le journal, les registres, les outils ni les snapshots.');
P();
P('## 1. Ce qui change depuis le périmètre du lot 2');
P();
P('La tranche 1 est arbitrée le 2026-10-10 : 9 sourcés, 25 écarts. L\'arbitrage retient **deux défauts du tri** et précise qu\'**ils ne permettent de déclarer ni faux ni vrais les autres signalements**. Le plan des tranches doit donc couvrir, en plus des 151 nuances encore à examiner, ce que le tri a écarté ou n\'a pas vu.');
P();
P('1. **Une correspondance par la lecture peut confondre deux homophones.** L\'arbitrage le formule pour le romaji (« 風 et 風邪 ») et vise les 50 nuances écartées à ce titre. **Constat factuel, à arbitrer** : 風邪 n\'a pas été écarté par le romaji, mais par la comparaison des lectures en kana. Le tri l\'a rangé en B-transcription : 風邪 se lit かぜ, et l\'exemple de la fiche de 風 écrit かぜ en kana. Le même défaut atteint donc les deux classes de faux positifs, **50 nuances B-romaji et 33 nuances B-transcription**, soit les 83. Le rapport de la tranche 1 porte un erratum sur ce point (fiche de 風), sans changer son verdict.');
P('2. **Les chaînes japonaises d\'un seul caractère ne sont pas détectées.** Le criblage T5 ne relève que les chaînes d\'au moins deux caractères. Un caractère isolé (雨, 飴) n\'a donc été vu que dans les nuances lues en entier.');
P();
P('## 2. Plan complet du chantier, recalculé');
P();
P('Chaque nuance publiée (de sens ou d\'ENTRY) des ENTRY décidées reçoit un statut, calculé :');
P();
P('| Statut | Nuances | Définition |');
P('|---|---|---|');
const DEF = { 'arbitré au lot 1': 'les trois sens arbitrés au lot 1 (出る sens 2 et 3, 吹く sens 2)', 'arbitré en tranche 1': 'les 33 nuances de la tranche 1, lues en entier', 'à examiner': 'signalées par le criblage, classe A, C, D ou E du tri', 'faux positif à contre-vérifier': 'signalées par le criblage, écartées par le tri (B-romaji ou B-transcription)', 'un caractère seulement': 'jamais signalées, mais portant une chaîne japonaise d\'un seul caractère : un kanji, ou un kana qui n\'est pas une particule du champ des fiches (§7)', 'hors chantier': 'ni signalées, ni porteuses d\'une chaîne d\'un caractère' };
for (const k of Object.keys(DEF)) P(`| ${k} | ${st0[k] ?? 0} | ${DEF[k]} |`);
P(`| **Total** | **${univers.length}** | toutes les nuances publiées des ENTRY décidées |`);
P();
P(`**Restent à lire : ${aLire.length} nuances** (${aExaminer.length} à examiner, ${fauxP.length} faux positifs, ${s1.length} à chaîne d'un caractère seulement). Les tranches suivent les lots d'origine, comme au périmètre du lot 2. Les lots qui n'avaient aucune nuance à examiner (${lotsSans.join(', ')}) n'ont que des faux positifs ou des chaînes d'un caractère : ils forment une tranche 8. **Le complément des lots 04 et 07**, lots de la tranche 1 arbitrée, forme un bloc « 1 bis » (§3).`);
P();
P('| Tranche | Lots d\'origine | À examiner | Faux positifs à contre-vérifier | Un caractère seulement | Total |');
P('|---|---|---|---|---|---|');
for (const x of parTranche) P(`| ${x.t}${['2', '1 bis'].includes(x.t) ? ' (ce périmètre)' : ''} | ${x.lots.join(', ')}${x.complement.length ? ` ; complément de la tranche 1 : ${x.complement.join(', ')}` : ''} | ${x['à examiner'] ?? 0} | ${x['faux positif à contre-vérifier'] ?? 0} | ${x['un caractère seulement'] ?? 0} | ${x.total} |`);
P(`| **Total** | | **${aExaminer.length}** | **${fauxP.length}** | **${s1.length}** | **${aLire.length}** |`);
P();
P(`**Troisième lacune, relevée en recalculant l'univers, hors de ce plan** : ${horsCrib.length} nuances appartiennent à des ENTRY hors JLPT (${horsCrib.map((h) => `\`${court(h.sens)}\`, lot ${h.lot}`).join(' ; ')}). Leurs fiches sont dans \`sources/vocab-hors-jlpt.json\`, que le criblage T5 ne lit pas : il les a comptées à part (\`horsSources\`), sans les cribler. Elles portent du japonais (${horsCrib.map((h) => `« ${h.nuance} »`).join(' ; ')}). **Proposé** : les ajouter à la tranche 4 (lot 05), contrôlées sur leur fiche hors JLPT ; elles n'entrent dans aucun décompte avant cet arbitrage.`);
P();
P('## 3. Thème et taille de la tranche 2');
P();
const t2s = compte(T2, (u) => u.statut);
const t2c = T1b;
const ligne = (u, i) => P(`| ${i + 1} | \`${court(u.sens)}\`${u.niveau === 'entree' ? ' (nuance d\'ENTRY)' : ''} | ${u.mot} | ${u.lotN} | ${u.statut} | ${u.motif} | ${chainesTexte(u)} | ${u.candidats377.map((c) => `\`${c}\``).join(', ') || '—'} | ${u.dans147.map((c) => `\`${c}\``).join(', ') || '—'} | ${u.corrections.join(', ') || '—'} |`);
const entete = () => { P('| # | Unité | Mot | Lot | Statut | Motif | Chaînes (signalées — écartées par le tri — d\'un caractère) | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Correction déjà retenue sur l\'ENTRY |'); P('|---|---|---|---|---|---|---|---|---|---|'); };
P('**Thème : les lots 00 (« Identité : doublons candidats, formes et lectures avec « / » ») et 01 (« Personnes, famille, corps et santé »)**, dans l\'ordre proposé au périmètre du lot 2. Le lot 01 domine : termes de parenté et d\'adresse (formes respectueuses en お et ご), parties du corps et santé ; ses nuances renvoient souvent à une autre ENTRY (le terme neutre, le terme respectueux, l\'homophone). La question reste la seule du chantier : chaque élément japonais de la nuance est-il dans les fiches de l\'ENTRY, ou une décision validée en assume-t-elle l\'origine ?');
P();
P(`**Taille : ${T2.length} nuances, dans ${new Set(T2.map((u) => u.entree)).size} ENTRY** : ${t2s['à examiner'] ?? 0} à examiner, ${t2s['faux positif à contre-vérifier'] ?? 0} faux positifs à contre-vérifier, ${t2s['un caractère seulement'] ?? 0} à chaîne d'un caractère seulement ; ${T2.filter((u) => u.niveau === 'entree').length} nuances d'ENTRY, ${T2.filter((u) => u.niveau === 'sens').length} nuances de sens. Par lot : ${Object.entries(compte(T2, (u) => u.lotN)).map(([k, v]) => `${k} : ${v}`).join(' ; ')}. **Aucune particule** n'y reste à contrôler : les quatre signalements du criblage sont arbitrés (lot 1 et tranche 1). La tranche dépasse la tranche 1 (34 unités) : aux 31 nuances prévues au périmètre du lot 2 s'ajoutent ${(t2s['faux positif à contre-vérifier'] ?? 0) + (t2s['un caractère seulement'] ?? 0)} contre-vérifications, courtes pour la plupart (un mot à identifier). **Option, si l'arbitrage la juge trop longue** : la couper par lot (00 : ${T2.filter((u) => u.lotN === '00').length} ; 01 : ${T2.filter((u) => u.lotN === '01').length}).`);
P();
entete();
T2.forEach(ligne);
P();
P('### Bloc « 1 bis » : complément des lots 04 et 07');
P();
const t2cs = compte(t2c, (u) => u.statut);
P(`**${t2c.length} nuances, dans ${new Set(t2c.map((u) => u.entree)).size} ENTRY** : ${t2cs['faux positif à contre-vérifier'] ?? 0} faux positifs à contre-vérifier et ${t2cs['un caractère seulement'] ?? 0} nuances à chaîne d'un caractère seulement ; lot 04 : ${t2c.filter((u) => u.lotN === '04').length} ; lot 07 : ${t2c.filter((u) => u.lotN === '07').length}. La tranche 1 est close et arbitrée ; ses lots gardent pourtant des nuances que le tri a écartées ou n'a pas vues. Elles ne rouvrent aucun verdict de la tranche 1 : ce sont d'autres nuances. **Proposé** : les auditer dans la même livraison que la tranche 2, avec leur propre décompte (橋 / 箸 et 花 / 鼻 se lisent alors avec leurs homologues, 寒い et 熱い avec la nuance arbitrée de 暑い). **Option** : un bloc livré à part, avant la tranche 3.`);
P();
entete();
T1b.forEach(ligne);
P();
P('## 4. Chevauchements avec les 377 candidats encore ouverts des axes C1 à C10');
P();
const avec377 = T2etC.filter((u) => u.candidats377.length);
const avec147 = T2etC.filter((u) => u.dans147.length);
P(`**Tranche 2 et bloc 1 bis : ${avec377.length} nuances portent sur un sens candidat du volet 1, ou sur une ENTRY qui en a un** (${new Set(T2etC.flatMap((u) => u.candidats377)).size} sens candidats distincts sur 377) : ${unites(avec377) || 'aucune'}. **${avec147.length} portent sur un sens des 147 du volet 2**, ou sur son ENTRY : ${unites(avec147) || 'aucune'}.`);
P();
P('**Règle arbitrée au lot 2, appliquée sans changement** : le contrôle de provenance ne pose qu\'une question, sur des champs que les axes C1 à C10 n\'examinent pas (`nuance`, `particles`). Un sens candidat **reste candidat** pour ses propres relevés ; **le décompte reste 377** ; aucun verdict du volet 2 n\'est rouvert.');
P();
const viseT2 = T2etC.filter((u) => u.corrections.length);
P(`**Corrections déjà retenues sur les mêmes ENTRY** : ${viseT2.length ? viseT2.map((u) => `${u.mot} (${u.corrections.join(', ')})`).join(' ; ') : 'aucune'}. Une correction de provenance s'ajouterait à celles-ci sans les modifier ; un recoupement de champ serait signalé dans la fiche.`);
P();
P('## 5. Dépendances avec les autres tranches');
P();
P('Un renvoi est une chaîne de la nuance qui est le mot, une graphie ou une lecture d\'une autre ENTRY publiée (relevé mécanique, chaînes d\'un caractère comprises). Chaque nuance se juge sur **sa** fiche (critère 2) : un renvoi peut être sourcé dans un sens et non dans l\'autre. Les renvois ne créent donc **pas de verdict commun**, mais une **lecture croisée** à signaler dans les fiches.');
P();
P(`- **Renvois sortants de la tranche 2 et du bloc 1 bis** (${sortants.length}) : ${sortants.map((x) => `${x.de.mot} → ${motDe(x.vers)} (tranche ${x.t})`).join(' ; ') || 'aucun'}.`);
P(`- **Renvois entrants**, depuis des nuances des tranches 3 à 8, vers la tranche 2 ou le bloc 1 bis (${entrants.length}) : ${entrants.map((x) => `${x.de.mot} (tranche ${x.de.tranche}) → ${motDe(x.vers)}`).join(' ; ') || 'aucun'}.`);
P(`- **Précédents arbitrés de la tranche 1** qui renvoient à une ENTRY de la tranche 2 (${precedentsT1.length}) : ${precedentsT1.map((x) => `${x.de.mot} → ${motDe(x.vers)}`).join(' ; ') || 'aucun'}. Ils sont cités, non rouverts.`);
P('- **Critères et précédents de la tranche 1, appliqués sans changement** : critère 1 (forme du dictionnaire d\'un exemple de la fiche, sans mot, particule ni construction changés : 渡る, 海, 空, 冷たい sens 1, 天気) ; critère 2 (renvoi appuyé par la fiche ou par une décision au fondement vérifiable) ; critère 3 (forme honorifique ou conjuguée, pas sourcée d\'office ; une graphie que la fiche nomme sans l\'écrire ne se reconstitue pas : 来る) ; aucune particule tirée d\'un exemple (吹く sens 1) ; l\'unité porte sur la nuance entière (雨, 飴). **Le lot 01 dépend surtout des critères 2 et 3** : formes en お et ご (classe C), termes neutre et respectueux qui se répondent (classe A).');
P('- **Ordre** : aucune tranche n\'attend le verdict d\'une autre. La tranche 8 vient en dernier parce qu\'elle ne contient que des contre-vérifications.');
P();
P('## 6. Contrôle des faux positifs du tri (rapprochements par la lecture)');
P();
const bR = fauxP.filter((u) => u.motif === 'B-romaji'), bT = fauxP.filter((u) => u.motif === 'B-transcription');
const parLect = fauxP.filter((u) => u.parLecture.length);
P(`**Méthode proposée** : **chacune des ${fauxP.length} nuances écartées est relue en entier, dans la tranche de son lot**, avec les mêmes verdicts que les autres (sourcé, assumé, écart). Pour chaque chaîne écartée, la relecture vérifie que le mot de la fiche est **le même mot** que celui de la nuance (même graphie, ou même mot écrit autrement), et non un homophone ; elle contrôle aussi les autres éléments japonais de la nuance, chaînes d'un caractère comprises. **Aucun faux positif n'est confirmé par le seul calcul.**`);
P();
P(`- **B-romaji** : ${bR.length} nuances. La correspondance y passe toujours par la lecture : l'homophonie est possible pour toutes.`);
P(`- **B-transcription** : ${bT.length} nuances. ${bT.filter((u) => u.parLecture.length).length} ont au moins une chaîne retrouvée **par sa seule lecture** (le kana de la fiche, sans la graphie) : homophonie possible. Les ${bT.filter((u) => !u.parLecture.length).length} autres sont retrouvées par leur graphie, à travers les furigana de la fiche ; le risque d'homophonie y est faible, mais elles sont relues aussi, parce que le second défaut (un caractère) peut les atteindre.`);
P(`- **Indicateur, non verdict** : ${parLect.length} des ${fauxP.length} nuances reposent sur au moins une correspondance par la lecture. Il ordonne la relecture ; il ne classe aucun cas.`);
P(`- **Répartition** : ${parTranche.map((x) => `tranche ${x.t} : ${x['faux positif à contre-vérifier'] ?? 0}`).join(' ; ')}. Relire chaque faux positif avec les autres nuances de son lot garde ensemble les paires de contraires et d'homophones (大きい / 小さい, 開く / 開ける, ある / 居る) et évite de rouvrir une ENTRY dans deux tranches.`);
P(`- **Alternative, si l'arbitrage la préfère** : une tranche dédiée aux ${fauxP.length} faux positifs, à la fin du chantier. La question y serait homogène, mais elle dépasserait la taille habituelle, et une paire de mots se lirait à deux moments.`);
P();
P('## 7. Traitement des chaînes japonaises d\'un seul caractère');
P();
const avecUn = univers.filter((u) => u.uns.length && u.statut !== 'hors chantier');
const s1Abs = avecUn.filter((u) => u.uns.some((k) => k.absent));
P('**Règle de relevé proposée, mécanique** : une chaîne d\'un seul caractère est une suite maximale de caractères japonais de longueur 1 (même expression que le criblage T5, après retrait des furigana et des balises). **Un kanji isolé est toujours relevé** ; un kana isolé l\'est **sauf s\'il est une particule du champ `particles` des fiches** de l\'ENTRY (« Avec を : … » quand la fiche porte を). Le trait d\'allongement ー seul n\'est pas relevé.');
P();
P('- **La présence mécanique ne prouve rien** : un caractère isolé peut se retrouver à l\'intérieur d\'un mot plus long des fiches (車 dans 自動車, 姉 dans お姉さん) sans que la fiche le donne comme mot. Le relevé **désigne les nuances à lire** ; le verdict se fait à la lecture.');
P(`- **Où il compte** : dans une nuance déjà à examiner ou déjà écartée, le caractère est contrôlé à la lecture de la nuance entière, comme 雨 et 飴 en tranche 1. **Il ne fait entrer de nuances nouvelles que s'il est leur seul signal** : ${s1.length} nuances, jamais signalées par le criblage.`);
P(`- **Décompte** : ${avecUn.length} nuances du chantier portent au moins une chaîne d'un caractère relevée, dont ${avecUn.filter((u) => ['arbitré en tranche 1', 'arbitré au lot 1'].includes(u.statut)).length} déjà lues ; ${s1Abs.length} en ont une absente de tous les textes des fiches. Les ${s1.length} nuances nouvelles se répartissent ainsi : ${parTranche.filter((x) => x['un caractère seulement']).map((x) => `tranche ${x.t} : ${x['un caractère seulement']}`).join(' ; ')}.`);
P(`- **Lots de la tranche 1** : ${t2c.filter((u) => u.statut === 'un caractère seulement').length} nuances des lots 04 et 07 n'ont été vues par aucun contrôle (${unites(t2c.filter((u) => u.statut === 'un caractère seulement')) || 'aucune'}) ; avec les faux positifs de ces lots, elles forment le bloc 1 bis du §3.`);
P('- **Particules nommées dans une nuance** : un kana isolé qui est une particule absente du champ `particles` des fiches (« Avec の et に : … ») est relevé par la même règle et jugé comme une chaîne : sourcé si la fiche le nomme (champ ou description) ou s\'il appartient à un exemple de la fiche repris selon le critère 1. La règle « aucune particule tirée d\'un exemple » porte sur le champ `particles` ; elle n\'interdit pas à une nuance de reprendre un exemple sourcé.');
P();
P('## 8. Critères reproductibles de complétude');
P();
P('Calculés par `a2-05-travail/perimetre-v1-lot2-t2.mjs`, qui s\'arrête au premier écart :');
P();
P(`1. **Univers** : ${univers.length} nuances publiées, de sens et d'ENTRY, des ENTRY décidées (les champs \`nuance\` des lots) ; identifiants distincts ; les ${releves.length} nuances du tri y sont toutes. Les ${horsCrib.length} nuances des ENTRY hors JLPT en sont exclues, comme du criblage, et sont signalées au §2.`);
P(`2. **Statuts exclusifs** : chaque nuance a un statut et un seul ; 3 arbitrées au lot 1, 33 en tranche 1, 151 à examiner, 83 faux positifs (50 B-romaji, 33 B-transcription), ${s1.length} « un caractère seulement » et ${st0['hors chantier']} « hors chantier », par la règle du §7.`);
P(`3. **Plan** : chaque nuance à lire appartient à une tranche et une seule ; la somme du bloc 1 bis et des tranches 2 à 8 vaut ${aLire.length} ; aucune nuance à examiner ne reste dans les lots 04 et 07, ni dans la tranche 8.`);
P(`4. **Tranche 2** : ${T2.length} identifiants distincts ; ce sont exactement les nuances à lire des lots 00 et 01 ; **bloc 1 bis** : ${T1b.length} identifiants distincts, exactement les faux positifs et les nuances « un caractère seulement » des lots 04 et 07 ; aucune n'est une nuance de la tranche 1 ni un sens arbitré au lot 1.`);
P('5. **Décomptes inchangés** : volet 2, 147 sur 147 (L 136, F 2, C 9, N 0) ; candidats du volet 1, 377 ; corrections retenues, 10 + 5 + 25, aucune appliquée.');
P(`6. **À la clôture du chantier** : 3 + 33 + ${aLire.length} = ${3 + 33 + aLire.length} nuances lues, chacune une fois ; les 4 particules du criblage sont arbitrées.`);
P();
P('## 9. Ce que la tranche 2 ne fera pas, et questions à arbitrer');
P();
P('Aucun texte français de nuance n\'est contrôlé ; aucune catégorie, aucun type, aucune traduction ni aucun découpage n\'est examiné ; aucune correction n\'est appliquée ; aucune décision de journal n\'est écrite. **L\'audit de la tranche 2 ne commence qu\'après la validation de ce périmètre.**');
P();
P(`1. Le contrôle des faux positifs couvre-t-il les **${fauxP.length}** (B-romaji et B-transcription), comme proposé au vu du constat sur 風邪, ou les seuls ${bR.length} B-romaji visés par l'arbitrage ?`);
P('2. Les faux positifs sont-ils relus **dans la tranche de leur lot** (proposé) ou dans une tranche dédiée ?');
P('3. La règle de relevé des chaînes d\'un caractère (§7) est-elle acceptée, en particulier l\'exclusion des seules particules du champ `particles` des fiches ?');
P(`4. Le **complément des lots 04 et 07** (${t2c.length} nuances) est-il audité dans la même livraison que la tranche 2, avec son propre décompte (proposé), ou livré à part ? La tranche 2 (${T2.length} nuances) doit-elle être coupée par lot ?`);
P(`5. Les ${horsCrib.length} nuances des ENTRY hors JLPT, jamais criblées, rejoignent-elles la tranche 4 (proposé) ?`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche2-perimetre.md'), md);
console.log(`statuts ${JSON.stringify(st0)} ; à lire ${aLire.length} ; tranches ${JSON.stringify(parTranche.map((x) => [x.t, x.total]))} ; T2 ${T2.length} (${JSON.stringify(t2s)}) ; 377 : ${avec377.length} ; 147 : ${avec147.length} ; par lecture ${parLect.length}`);
