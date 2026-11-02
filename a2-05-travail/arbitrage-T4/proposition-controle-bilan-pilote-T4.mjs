// A2-05 · volet 1 · lot 3 : contrôle des faits chiffrés du bilan du pilote (T1, T2, T3), en lecture seule. N'importe aucun module v2.
// Recalcule, à partir des rapports arbitrés, des périmètres, du manifeste et du registre : tailles, verdicts proposés et arbitrés, statuts,
// protection au manifeste, tri simple ou complexe, questions portées à l'arbitrage, taille des rapports ; vérifie que le bilan du pilote et le
// périmètre de T4 sont acceptés (§0), que chacun ne diffère de sa proposition sauvegardée que par la ligne de statut et le §0 inséré, que la
// proposition de T4 portait 35 sens, que le §0 du bilan du pilote est identique, champ par champ, à sa référence approuvée (tirée du diff relu)
// et que ses faits égalent les faits recalculés, que le périmètre accepté de T4 est protégé au manifeste, que le rapport de T4, arbitré, ne
// diffère de sa proposition sauvegardée que par la ligne de statut et le §0 inséré (§1 et 35 fiches d'examen d'origine conservés), que son §0
// est identique, champ par champ, à sa référence approuvée, que ses faits arbitrés (28 conformes, 7 écarts) concordent avec le §1, avec les
// réservations déclarées et avec le §8.91 du bilan, que ce rapport est protégé au manifeste (35 empreintes), et que le registre porte toujours
// la condition du pilote. Code 1 au premier écart.
// Usage : node a2-05-travail/controle-bilan-pilote.mjs <racine du dépôt>
// PROPOSITION (2026-10-25), non appliquée : adaptation à l'arbitrage de T4 et à l'ajout de son rapport au manifeste (35e entrée).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };
const man = JSON.parse(txt('a2-05-travail/empreintes-rapports-arbitres.json')).empreintes;
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const ATTENDU = { T1: { n: 24, c: 23, e: 1, corr: ['V1-11'] }, T2: { n: 21, c: 20, e: 1, corr: ['V1-12'] }, T3: { n: 24, c: 22, e: 2, corr: ['V1-13', 'V1-14'] } };
let total = 0, tc = 0, te = 0;
for (const [t, a] of Object.entries(ATTENDU)) {
  const p = R + t + '.md', q = R + t + '-perimetre.md'; const r = txt(p);
  const s1 = r.slice(r.indexOf('## 1. Résultat proposé'), r.indexOf('## 2. '));
  const lignes = [...s1.matchAll(/^\| [0-9]+ \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|.*\| \*\*(conforme|écart|suspendu)\*\* \| ([^|]+) \|$/gm)];
  const c = lignes.filter((m) => m[2] === 'conforme').length, e = lignes.filter((m) => m[2] === 'écart').length;
  const corr = lignes.map((m) => m[3].trim()).filter((x) => x !== '—');
  const s0 = r.slice(r.indexOf('## 0. Arbitrage'), r.indexOf('## 1. '));
  const retenus = new RegExp('Les ' + a.n + ' verdicts sont retenus : ' + a.c + ' conformes, ' + a.e + ' écarts?, aucun suspendu').test(s0);
  ctl(lignes.length === a.n && c === a.c && e === a.e && JSON.stringify(corr) === JSON.stringify(a.corr), t + ' : taille et verdicts proposés (§1)', lignes.length + ' sens, ' + c + ' conformes, ' + e + ' écart(s), corrections ' + corr.join(', '));
  ctl(/^\*\*Statut\*\* : \*\*arbitré le /m.test(r) && retenus, t + ' : arbitré, verdicts proposés tous retenus (§0)', (r.match(/^\*\*Statut\*\* : \*\*arbitré le [0-9-]+/m) ?? [''])[0].replace(/\*/g, '') + (retenus ? ' ; « ' + a.n + ' verdicts retenus »' : ' ; formule de retenue non trouvée'));
  ctl(man[p] === sha(p) && man[q] === sha(q) && /^\*\*Statut\*\* : \*\*périmètre accepté le /m.test(txt(q)), t + ' : rapport et périmètre protégés au manifeste, empreintes identiques', sha(p).slice(0, 12) + '… ; ' + sha(q).slice(0, 12) + '…');
  const complexes = (r.match(/\| \*\*complexe\*\* \|/g) ?? []).length; const questions = (r.slice(r.indexOf('## 7. Questions')).match(/^[0-9]+\. /gm) ?? []).length;
  console.log('constat  ' + t + ' : tri ' + complexes + ' complexe(s), ' + (a.n - complexes) + ' simple(s) ; ' + questions + ' questions au §7 ; rapport ' + brut(p).length + ' octets (' + Math.round(brut(p).length / a.n) + ' par sens), périmètre ' + brut(q).length + ' octets');
  total += a.n; tc += c; te += e;
}
ctl(total === 69, 'pilote : 69 sens (T1, T2, T3), 65 conformes, 4 écarts', total + ' sens');
// Document accepté = proposition sauvegardée, à la ligne de statut près (ligne 4), plus le §0 inséré d'un bloc (ligne vide, « ## 0. Arbitrage », …).
const inscrit = (doc, prop, empreinte, statut, n0) => {
  const f = txt(doc).split('\n'), s = txt(prop).split('\n'); const i = f.indexOf('## 0. Arbitrage'), n = f.length - s.length;
  const reste = [...f.slice(0, i - 1), ...f.slice(i - 1 + n)];
  const ok = sha(prop).startsWith(empreinte) && i > 0 && f[i - 1] === '' && n === n0 && statut.test(f[3]) && /^\*\*Statut\*\* : \*\*proposition/.test(s[3]) && reste.length === s.length && reste.every((l, k) => k === 3 || l === s[k]);
  return { ok, detail: 'proposition ' + sha(prop).slice(0, 12) + '… ; §0 : ' + n + ' lignes insérées ; statut : ' + f[3].slice(0, 60).replace(/\*/g, '') };
};
const BP = R + 'bilan-pilote.md', bp = txt(BP);
const ibp = inscrit(BP, 'a2-05-travail/arbitrage-T4/proposition-bilan-pilote.md', '96ffa3983786', /^\*\*Statut\*\* : \*\*arbitré le 2026-10-23\*\* \(§0\)\./, 13);
ctl(ibp.ok && bp.includes('« **J\'accepte le bilan du pilote T1–T3**') && bp.includes('**La condition « bilan du pilote » de T4 est considérée comme satisfaite.**'), 'bilan du pilote, corps historique : proposition conservée, seuls changent le statut et le §0 ; accepté (§0), condition du registre satisfaite', ibp.detail);
// §0 ajouté à l'arbitrage : comparé, champ par champ, à sa référence approuvée (tirée du diff relu de l'export d'acceptation, protégée par empreinte).
const REF0 = 'a2-05-travail/arbitrage-T4/reference-s0-bilan-pilote.json', REF0_SHA = '49fb15aa19ada04e';
ctl(sha(REF0).startsWith(REF0_SHA), 'bilan du pilote, §0 : référence approuvée intacte', sha(REF0).slice(0, 16) + '…');
const ref0 = JSON.parse(txt(REF0)), fb = bp.split('\n'), d0 = fb.indexOf('## 0. Arbitrage'), f0 = fb.findIndex((l, k) => k > d0 && l.startsWith('## '));
const L0 = fb.slice(d0, f0); while (L0.length && L0.at(-1) === '') L0.pop();
const pts0 = L0.slice(6).map((l) => l.match(/^\| \*\*([^*|]+)\*\* \| (.+) \|$/));
const div0 = [
  ...[['intitule', L0[0]], ['decision', L0[2]], ['entete', L0[4]], ['separateur', L0[5]]].filter(([c, v]) => v !== ref0.s0[c]).map(([c]) => c),
  ...(L0[1] !== '' || L0[3] !== '' ? ['lignes vides'] : []), ...pts0.flatMap((m, k) => (m ? [] : ['ligne ' + (k + 7) + ' hors tableau'])),
  ...(pts0.length !== ref0.s0.points.length ? ['nombre de points ' + pts0.length + ' (attendu ' + ref0.s0.points.length + ')'] : []),
  ...ref0.s0.points.flatMap((p, k) => (pts0[k] && pts0[k][1] === p.point && pts0[k][2] === p.arbitrage ? [] : ['point ' + (k + 1) + ' « ' + p.point + ' »'])),
];
ctl(d0 > 0 && f0 > d0 && div0.length === 0, 'bilan du pilote, §0 : identique à la référence approuvée, champ par champ', div0.length ? div0.join(' ; ') : 'intitulé, décision, en-tête, ' + pts0.length + ' points : ' + ref0.s0.points.map((p) => p.point).join(', '));
const mf = (pts0.find((m) => m && m[1] === 'Faits retenus')?.[2] ?? '').match(/^([0-9]+) sens examinés : ([0-9]+) conformes, ([0-9]+) écarts ; ([0-9]+) verdicts proposés puis retenus, sans inversion ; .* ([0-9]+) incidents recensés/);
const f0b = mf ? { sens: +mf[1], conformes: +mf[2], ecarts: +mf[3], verdicts_retenus: +mf[4], incidents: +mf[5] } : null;
ctl(JSON.stringify(f0b) === JSON.stringify(ref0.faits) && f0b.sens === total && f0b.conformes === tc && f0b.ecarts === te && f0b.verdicts_retenus === total, 'bilan du pilote, §0 : faits retenus égaux à la référence et aux faits recalculés (T1, T2, T3)', f0b ? f0b.sens + ' sens, ' + f0b.conformes + ' conformes, ' + f0b.ecarts + ' écarts, ' + f0b.verdicts_retenus + ' verdicts retenus, ' + f0b.incidents + ' incidents ; recalculés : ' + total + ', ' + tc + ', ' + te : 'ligne « Faits retenus » illisible');
const P4 = R + 'T4-perimetre.md', p4 = txt(P4), prop4 = txt('a2-05-travail/arbitrage-T4/proposition-T4-perimetre.md');
const n4 = (t) => [...t.slice(t.indexOf('## 2. '), t.indexOf('## 3. ')).matchAll(/^\| [0-9]+ \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|/gm)].length;
ctl(/^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(prop4) && !prop4.includes('## 0. Arbitrage') && n4(prop4) === 35, 'T4 : proposition sauvegardée en proposition, sans §0, 35 sens (fait historique)', n4(prop4) + ' sens ; ' + prop4.length + ' caractères');
const i4 = inscrit(P4, 'a2-05-travail/arbitrage-T4/proposition-T4-perimetre.md', '206be2459e29', /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-23 \(§0\)\.\*\*/, 10);
ctl(i4.ok && p4.includes('« **J\'accepte le périmètre T4 sans ajout ni retrait : C1 à C4, 35 sens dans 35 ENTRY, en une seule tranche.** »') && n4(p4) === 35, 'T4 : périmètre accepté (§0), 35 sens, en une seule tranche ; seuls changent le statut et le §0', i4.detail);
ctl(man[P4] === sha(P4), 'T4 : périmètre accepté protégé au manifeste, empreinte identique', sha(P4).slice(0, 12) + '…');
// Rapport de T4, arbitré le 2026-10-24 : proposition sauvegardée conservée, seuls changent le statut et le §0 (§1 et 35 fiches d'examen d'origine,
// 26 conformes et 9 écarts proposés) ; §0 identique, champ par champ, à sa référence approuvée (tirée du §0 relu, protégée par empreinte) ; faits
// arbitrés (28 conformes, 7 écarts) confrontés au §1, aux réservations déclarées et au §8.91 du bilan ; rapport protégé au manifeste.
const T4R = R + 'T4.md', t4r = txt(T4R), PROPT4 = 'a2-05-travail/arbitrage-T4/proposition-T4.md';
const it4 = inscrit(T4R, PROPT4, '2e3fcff61bef', /^\*\*Statut\*\* : \*\*arbitré le 2026-10-24\*\* \(§0\)\./, 17);
ctl(it4.ok, 'T4 : rapport arbitré (§0) ; proposition conservée, seuls changent le statut et le §0', it4.detail);
const s1t4 = t4r.slice(t4r.indexOf('## 1. Résultat proposé'), t4r.indexOf('## 2. '));
const l4 = [...s1t4.matchAll(/^\| [0-9]+ \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|.*\| \*\*(conforme|écart|suspendu)\*\* \| ([^|]+) \|$/gm)];
const c4p = l4.filter((m) => m[2] === 'conforme').length, e4p = l4.filter((m) => m[2] === 'écart').length, k4p = l4.map((m) => m[3].trim()).filter((x) => x !== '—');
const V = (a, b) => Array.from({ length: b - a + 1 }, (_, k) => 'V1-' + (a + k));
ctl(l4.length === 35 && c4p === 26 && e4p === 9 && JSON.stringify(k4p) === JSON.stringify(V(15, 23)) && (t4r.match(/^#### `(?:hj_)?v_\d+_s\d+` · /gm) ?? []).length === 35, 'T4 : §1 et fiches d\'examen d\'origine : 35 sens, 26 conformes, 9 écarts proposés, corrections V1-15 à V1-23, 35 fiches', l4.length + ' sens, ' + c4p + ' conformes, ' + e4p + ' écarts ; ' + k4p.length + ' corrections');
const REFT4 = 'a2-05-travail/arbitrage-T4/reference-s0-T4.json', REFT4_SHA = 'd99cb150f924355f';
ctl(sha(REFT4).startsWith(REFT4_SHA), 'T4, §0 : référence approuvée intacte', sha(REFT4).slice(0, 16) + '…');
const rt4 = JSON.parse(txt(REFT4)), ft = t4r.split('\n'), a0 = ft.indexOf('## 0. Arbitrage'), b0 = ft.findIndex((l, k) => k > a0 && /^## \d+\. /.test(l));
const Q = ft.slice(a0, b0); while (Q.length && Q.at(-1) === '') Q.pop();
let q = 8; const pq = []; for (; q < Q.length && Q[q].startsWith('| '); q++) pq.push(Q[q].match(/^\| \*\*(.+?)\*\* \| (.+) \|$/));
const div4 = [
  ...[['intitule', Q[0]], ['decision', Q[2]], ['synthese', Q[4]], ['entete', Q[6]], ['separateur', Q[7]], ['liste', Q[q + 1]]].filter(([c, v]) => v !== rt4.s0[c]).map(([c]) => c),
  ...(Q[1] !== '' || Q[3] !== '' || Q[5] !== '' || Q[q] !== '' || Q.length !== q + 2 ? ['disposition des lignes'] : []),
  ...(pq.length !== rt4.s0.points.length ? ['nombre de points ' + pq.length] : []),
  ...rt4.s0.points.flatMap((p, k) => (pq[k] && pq[k][1] === p.point && pq[k][2] === p.arbitrage ? [] : ['point « ' + p.point + ' »'])),
];
ctl(a0 > 0 && b0 > a0 && div4.length === 0, 'T4, §0 : identique à la référence approuvée, champ par champ', div4.length ? div4.join(' ; ') : 'intitulé, décision, synthèse, en-tête, ' + pq.length + ' points, liste');
const synth = (Q[4] ?? '').match(/^\*\*(\d+) conformes, (\d+) écarts, aucun suspendu\*\*, contre (\d+) conformes et (\d+) écarts proposés/);
const resT4 = [...Q.join('\n').matchAll(/\b(V[12]-\d+) non retenue, identifiant réservé/g)].map((x) => x[1]);
const bilanV2 = txt('docs/rapports/etape2-A2-05-bilan-volet2.md'); const s891 = bilanV2.slice(Math.max(0, bilanV2.search(/^### 8\.91 /m)));
const fin891 = s891.slice(1).search(/^### /m); const t891 = bilanV2.search(/^### 8\.91 /m) < 0 ? '' : fin891 < 0 ? s891 : s891.slice(0, fin891 + 1);
const ret891 = [...t891.matchAll(/^\| (V1-\d+) \| `(?:hj_)?v_\d+/gm)].map((x) => x[1]);
const res891 = [...t891.matchAll(/^\| réservé \| (V1-\d+) \| `docs\/rapports\/etape2-A2-05-volet1-lot3-T4\.md` \|/gm)].map((x) => x[1]);
const okF = !!synth && +synth[1] === 28 && +synth[2] === 7 && +synth[3] === c4p && +synth[4] === e4p && +synth[1] === c4p + resT4.length && +synth[2] === e4p - resT4.length
  && JSON.stringify(ret891) === JSON.stringify(V(15, 21)) && JSON.stringify(res891) === JSON.stringify(resT4) && JSON.stringify(resT4) === JSON.stringify(rt4.faits.reservees)
  && JSON.stringify([...ret891, ...res891].sort()) === JSON.stringify([...k4p].sort());
ctl(okF, 'T4 : 28 conformes et 7 écarts arbitrés = §1 (26 et 9) corrigé des réservations ; §8.91 : V1-15 à V1-21 retenues, V1-22 et V1-23 réservées', synth ? synth[1] + ' et ' + synth[2] + ' ; retenues ' + ret891.join(', ') + ' ; réservées ' + res891.join(', ') : 'synthèse du §0 illisible');
ctl(man[T4R] === sha(T4R), 'T4 : rapport arbitré protégé au manifeste, empreinte identique', man[T4R] ? sha(T4R).slice(0, 12) + '…' : 'absent du manifeste');
const reg = JSON.parse(txt('a2-05-travail/registre-tranches.json')).tranches;
const t4 = reg.find((t) => t.id === 'T4');
ctl(t4?.condition === 'conditionnée au bilan du pilote ; divisible en deux' && reg.filter((t) => ['T1', 'T2', 'T3', 'T4'].includes(t.id)).every((t) => t.statut === 'planifiée'), 'registre : condition du pilote portée par T4 ; statuts non modifiés', 'T4 « ' + t4?.condition + ' » ; T1 à T4 « planifiée »');
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md'); const i86 = bilan.search(/^### 8\.86 /m);
ctl(i86 > 0 && !/^### 8\.[0-9]+ [^\n]*bilan du pilote/im.test(bilan.slice(0, i86)) && /^### 8\.87 [^\n]*bilan du pilote accepté/m.test(bilan), 'bilan du volet 2 : aucun bilan du pilote avant §8.86 ; acceptation consignée au §8.87', 'aucune sous-section antérieure à §8.86 intitulée « bilan du pilote » ; §8.87 présent');
ctl(Object.keys(man).length === 35 && Object.entries(man).every(([p, h]) => sha(p) === h), 'manifeste : 35 empreintes recalculées, identiques', Object.keys(man).length + ' entrées');
console.log(ecarts ? ecarts + ' écart(s)' : 'contrôle conforme');
process.exit(ecarts ? 1 : 0);
