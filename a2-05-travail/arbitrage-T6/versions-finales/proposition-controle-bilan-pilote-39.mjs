// A2-05 · volet 1 · lot 3 : contrôle des faits chiffrés du bilan du pilote (T1, T2, T3), en lecture seule. N'importe aucun module v2.
// Recalcule, à partir des rapports arbitrés, des périmètres, du manifeste et du registre : tailles, verdicts proposés et arbitrés, statuts,
// protection au manifeste, tri simple ou complexe, questions portées à l'arbitrage, taille des rapports ; vérifie que le bilan du pilote et le
// périmètre de T4 sont acceptés (§0), que chacun ne diffère de sa proposition sauvegardée que par la ligne de statut et le §0 inséré, que la
// proposition de T4 portait 35 sens, que le §0 du bilan du pilote est identique, champ par champ, à sa référence approuvée (tirée du diff relu)
// et que ses faits égalent les faits recalculés, que le périmètre accepté de T4 est protégé au manifeste, que le rapport de T4, arbitré, ne
// diffère de sa proposition sauvegardée que par la ligne de statut et le §0 inséré (§1 et 35 fiches d'examen d'origine conservés), que son §0
// est identique, champ par champ, à sa référence approuvée, que ses faits arbitrés (28 conformes, 7 écarts) concordent avec le §1, avec les
// réservations déclarées et avec le §8.91 du bilan, que ce rapport est protégé au manifeste, que le périmètre de T5 est accepté (§0), ne diffère
// de sa proposition sauvegardée (22 sens, D2 et D3) que par la ligne de statut et le §0 inséré et est protégé au manifeste, que le rapport de
// T5, arbitré, ne diffère de sa proposition sauvegardée que par la ligne de statut et le §0 inséré (§1 et 22 fiches d'examen d'origine
// conservés), que son §0 est identique, champ par champ, à sa référence approuvée (tirée du diff relu), que la réserve normative (D0668, D0679,
// D0687, D0691) concorde avec cette référence, avec le §8.95 du bilan, avec le journal et avec les données publiées, que ses faits arbitrés
// (22 conformes, aucun écart, aucune correction nouvelle) concordent avec le §1 et avec le bilan, que ce rapport est protégé au manifeste (37e
// entrée), que le périmètre de T6 est accepté (§0), ne diffère de sa proposition sauvegardée (22 sens, D6 et D7) que par la ligne de statut et
// le §0 inséré, garde l'empreinte de sa version acceptée et est protégé au manifeste (38e entrée, 38 empreintes), et que le registre porte
// toujours la condition du pilote. Si un des quatre documents de T5 attendus manque (périmètre accepté, rapport arbitré, leurs propositions
// sauvegardées), un écart explicite le dit et les contrôles de T5 qui en dépendent sont en écart, sans exception. Code 1 au premier écart.
// Usage : node a2-05-travail/controle-bilan-pilote.mjs <racine du dépôt>
// Historique : adaptation à l'arbitrage de T5 et à la 37e entrée, appliquée le 2026-10-27 ; adaptation au périmètre accepté de T6 et à la
// 38e entrée (38 empreintes), avec l'empreinte fixée du périmètre accepté de T6 et l'écart explicite pour un document de T5 manquant, préparée
// le 2026-10-27, appliquée seulement sur autorisation distincte.
// PROPOSITION (2026-10-29), non appliquée : adaptation à la 39e entrée (rapport arbitré de T6). Le manifeste porte 38 entrées (rapport de T6
// absent) ou 39 (rapport de T6 en 39e entrée) ; à 39 entrées, le rapport de T6 doit être identique à sa version arbitrée relue (empreinte fixée,
// indépendante du manifeste ; fichier absent : écart, non exception). Les autres contrôles sont inchangés.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };
const man = JSON.parse(txt('a2-05-travail/empreintes-rapports-arbitres.json')).empreintes;
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
// Documents de T5 attendus : leur absence est relevée ici, puis signalée par un écart explicite (section de T5) au lieu d'une exception
const T5_ATTENDUS = [R + 'T5-perimetre.md', 'a2-05-travail/arbitrage-T5/proposition-T5-perimetre.md', R + 'T5.md', 'a2-05-travail/arbitrage-T5/proposition-T5.md'];
const absents5 = T5_ATTENDUS.filter((p) => !existsSync(join(root, p))); const lire5 = (p) => (absents5.includes(p) ? '' : txt(p));
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
  const manque = [doc, prop].filter((p) => absents5.includes(p)); if (manque.length) return { ok: false, detail: 'document absent : ' + manque.join(', ') };
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
// Périmètre de T5, accepté le 2026-10-25 : proposition sauvegardée conservée (22 sens, D2 et D3, sans §0), seuls changent le statut et le §0 ;
// protégé au manifeste.
ctl(!absents5.length, 'T5 : documents attendus présents (périmètre accepté, rapport arbitré et leurs propositions sauvegardées)', absents5.length ? 'absents : ' + absents5.join(', ') : T5_ATTENDUS.length + ' présents');
const P5 = R + 'T5-perimetre.md', p5 = lire5(P5), PROP5 = 'a2-05-travail/arbitrage-T5/proposition-T5-perimetre.md', prop5 = lire5(PROP5);
const liv5 = (t) => [...t.slice(t.indexOf('## 2. '), t.indexOf('## 3. ')).matchAll(/^\| [0-9]+ \| `(?:hj_)?v_[0-9]+_s[0-9]+` \|[^|]+\|[^|]+\|[^|]+\| (D[23]) \|/gm)].map((m) => m[1]);
const d5 = liv5(prop5);
ctl(/^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(prop5) && !prop5.includes('## 0. Arbitrage') && n4(prop5) === 22 && d5.filter((x) => x === 'D2').length === 11 && d5.filter((x) => x === 'D3').length === 11, 'T5 : proposition sauvegardée en proposition, sans §0, 22 sens, D2 11 et D3 11 (fait historique)', n4(prop5) + ' sens ; D2 ' + d5.filter((x) => x === 'D2').length + ', D3 ' + d5.filter((x) => x === 'D3').length);
const i5 = inscrit(P5, PROP5, 'ee014eb7d33e', /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-25 \(§0\)\.\*\*/, 10);
ctl(i5.ok && p5.includes('« **J\'accepte le périmètre opérationnel de T5 : livraisons D2 et D3, 22 sens dans 18 ENTRY, sans ajout, retrait ni déplacement.** »') && n4(p5) === 22 && p5.includes('**22 sens, 18 ENTRY**'), 'T5 : périmètre accepté (§0), 22 sens dans 18 ENTRY ; seuls changent le statut et le §0', i5.detail);
ctl(!absents5.includes(P5) && man[P5] === sha(P5), 'T5 : périmètre accepté protégé au manifeste, empreinte identique', absents5.includes(P5) ? 'fichier absent' : man[P5] ? sha(P5).slice(0, 12) + '…' : 'absent du manifeste');
// Périmètre de T6, accepté le 2026-10-27 : proposition sauvegardée conservée (22 sens, D6 et D7, sans §0), seuls changent le statut et le §0 ;
// protégé au manifeste.
const P6 = R + 'T6-perimetre.md', p6 = txt(P6), PROP6 = 'a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md', prop6 = txt(PROP6);
const liv6 = (t) => [...t.slice(t.indexOf('## 2. '), t.indexOf('## 3. ')).matchAll(/^\| [0-9]+ \| `(?:hj_)?v_[0-9]+_s[0-9]+` \|[^|]+\|[^|]+\|[^|]+\| (D[67]) \|/gm)].map((m) => m[1]);
const d6 = liv6(prop6);
ctl(/^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(prop6) && !prop6.includes('## 0. Arbitrage') && n4(prop6) === 22 && d6.filter((x) => x === 'D6').length === 12 && d6.filter((x) => x === 'D7').length === 10, 'T6 : proposition sauvegardée en proposition, sans §0, 22 sens, D6 12 et D7 10 (fait historique)', n4(prop6) + ' sens ; D6 ' + d6.filter((x) => x === 'D6').length + ', D7 ' + d6.filter((x) => x === 'D7').length);
const i6 = inscrit(P6, PROP6, 'd0d4e113a85b', /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-27 \(§0\)\.\*\*/, 10);
ctl(i6.ok && p6.includes('« **J\'accepte le périmètre opérationnel de T6 : D6 et D7, 22 sens dans 13 ENTRY, soit l\'intégralité du lot 23.** »') && n4(p6) === 22 && p6.includes('**22 sens, 13 ENTRY**'), 'T6 : périmètre accepté (§0), 22 sens dans 13 ENTRY ; seuls changent le statut et le §0', i6.detail);
ctl(sha(P6) === '614b7503d32408028d853993430049a4faa65dcda5480e679754b3d4b5c11803', 'T6 : périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', sha(P6).slice(0, 12) + '…');
ctl(man[P6] === sha(P6), 'T6 : périmètre accepté protégé au manifeste, empreinte identique', man[P6] ? sha(P6).slice(0, 12) + '…' : 'absent du manifeste');
// Rapport de T5, arbitré le 2026-10-25 : proposition sauvegardée conservée, seuls changent le statut et le §0 (§1 et 22 fiches d'examen d'origine,
// 22 conformes proposés) ; §0 identique, champ par champ, à sa référence approuvée (tirée du diff relu, protégée par empreinte) ; réserve normative
// confrontée à la référence, au §8.95 du bilan, au journal et aux données publiées ; faits arbitrés (22 conformes, aucun écart, aucune correction
// nouvelle) confrontés au §1 et au bilan ; rapport protégé au manifeste.
const T5R = R + 'T5.md', t5r = lire5(T5R), PROPT5 = 'a2-05-travail/arbitrage-T5/proposition-T5.md';
const it5 = inscrit(T5R, PROPT5, 'd9361ba48ca5', /^\*\*Statut\*\* : \*\*arbitré le 2026-10-25\*\* \(§0\)\./, 17);
ctl(it5.ok, 'T5 : rapport arbitré (§0) ; proposition conservée, seuls changent le statut et le §0', it5.detail);
const s1t5 = t5r.slice(t5r.indexOf('## 1. Résultat proposé'), t5r.indexOf('## 2. '));
const l5 = [...s1t5.matchAll(/^\| [0-9]+ \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|.*\| \*\*(conforme|écart|suspendu)\*\* \| ([^|]+) \|$/gm)];
const c5p = l5.filter((m) => m[2] === 'conforme').length, e5p = l5.filter((m) => m[2] === 'écart').length, k5p = l5.map((m) => m[3].trim()).filter((x) => x !== '—');
const fi5 = [...t5r.matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` · [^\n]* — proposé : \*\*(conforme|écart|suspendu)\*\*$/gm)];
const ids5 = [...p5.slice(p5.indexOf('## 2. '), p5.indexOf('## 3. ')).matchAll(/^\| [0-9]+ \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|/gm)].map((m) => m[1]);
ctl(l5.length === 22 && c5p === 22 && e5p === 0 && !k5p.length && fi5.length === 22 && fi5.every((m, k) => m[2] === 'conforme' && m[1] === l5[k][1]) && JSON.stringify(l5.map((m) => m[1])) === JSON.stringify(ids5), 'T5 : §1 et fiches d\'examen d\'origine : 22 sens, 22 conformes, aucun écart, aucune correction, 22 fiches, sens du périmètre accepté', l5.length + ' sens, ' + c5p + ' conformes, ' + e5p + ' écarts ; ' + k5p.length + ' corrections ; ' + fi5.length + ' fiches');
const REFT5 = 'a2-05-travail/arbitrage-T5/reference-s0-T5.json', REFT5_SHA = '757083e5ca9268c5', refT5 = existsSync(join(root, REFT5));
ctl(refT5 && sha(REFT5).startsWith(REFT5_SHA), 'T5, §0 : référence approuvée intacte', refT5 ? sha(REFT5).slice(0, 16) + '…' : 'référence absente');
const rt5 = refT5 ? JSON.parse(txt(REFT5)) : { s0: { points: [] }, faits: { corrections: {}, reserve: { decisions: [], fragments: [] } } };
const f5 = t5r.split('\n'), a5 = f5.indexOf('## 0. Arbitrage'), b5 = f5.findIndex((l, k) => k > a5 && /^## \d+\. /.test(l));
const Q5 = f5.slice(a5, b5); while (Q5.length && Q5.at(-1) === '') Q5.pop();
let q5 = 8; const pq5 = []; for (; q5 < Q5.length && Q5[q5].startsWith('| '); q5++) pq5.push(Q5[q5].match(/^\| \*\*(.+?)\*\* \| (.+) \|$/));
const div5 = [
  ...[['intitule', Q5[0]], ['decision', Q5[2]], ['synthese', Q5[4]], ['entete', Q5[6]], ['separateur', Q5[7]], ['liste', Q5[q5 + 1]]].filter(([c, v]) => v !== rt5.s0[c]).map(([c]) => c),
  ...(Q5[1] !== '' || Q5[3] !== '' || Q5[5] !== '' || Q5[q5] !== '' || Q5.length !== q5 + 2 ? ['disposition des lignes'] : []),
  ...(pq5.length !== rt5.s0.points.length ? ['nombre de points ' + pq5.length] : []),
  ...rt5.s0.points.flatMap((p, k) => (pq5[k] && pq5[k][1] === p.point && pq5[k][2] === p.arbitrage ? [] : ['point « ' + p.point + ' »'])),
];
ctl(a5 > 0 && b5 > a5 && rt5.s0.points.length === 6 && div5.length === 0, 'T5, §0 : identique à la référence approuvée, champ par champ', div5.length ? div5.join(' ; ') : 'intitulé, décision, synthèse, en-tête, ' + pq5.length + ' points, liste');
// Réserve normative : point du §0 et paragraphe du §8.95 portant les six fragments de la référence ; quatre décisions `type-nul` du lot 11
// conservées (journal : validées, sans modification de valeur) ; types nuls des quatre sens publiés.
const s895 = bilanV2.slice(Math.max(0, bilanV2.search(/^### 8\.95 /m))); const fin895 = s895.slice(1).search(/^### /m);
const t895 = bilanV2.search(/^### 8\.95 /m) < 0 ? '' : fin895 < 0 ? s895 : s895.slice(0, fin895 + 1);
const res895 = t895.split('\n').find((l) => l.startsWith('**Réserve normative** ')) ?? '', res0 = pq5.find((m) => m && m[1] === rt5.faits.reserve.point)?.[2] ?? '';
const jr = JSON.parse(txt('reconstruction/a2-04/journal.json')), pub5 = new Map(JSON.parse(txt('data/n5/vocab.json')).map((e) => [e.id, e]));
const decR = rt5.faits.reserve.decisions.map((d) => {
  const x = jr.find((y) => y.id === 'A2-04-' + d.decision), e = x && pub5.get(x.entry.replace(/^n5_/, '')), s = e?.senses.find((y) => y.id === e.id + '_s' + d.sens);
  const ok = !!s && x.status === 'validated' && x.lot === 'lot-11' && x.kind === 'type-nul' && x.field === 'sens ' + d.sens + ' · semantic_type' && x.before === null && x.after === null && e.word === d.mot && s.semantic_type === null;
  return { ok, detail: d.decision + ' ' + d.mot + ' ' + (s ? s.id + ' ' + s.semantic_type : 'sens introuvable') };
});
ctl(rt5.faits.reserve.fragments.length === 6 && rt5.faits.reserve.fragments.every((x) => res0.includes(x) && res895.includes(x)), 'T5, réserve normative : six fragments de la référence dans le point du §0 et dans le §8.95', rt5.faits.reserve.fragments.filter((x) => !res0.includes(x) || !res895.includes(x)).map((x) => '« ' + x.slice(0, 40) + ' » absent').join(' ; ') || (rt5.faits.reserve.fragments.length ? rt5.faits.reserve.fragments.length + ' fragments, §0 et §8.95' : 'aucun fragment dans la référence'));
ctl(decR.length === 4 && decR.every((d) => d.ok), 'T5, réserve normative : D0668, D0679, D0687 et D0691 conservées (journal, lot 11, `type-nul`, validées) ; types nuls publiés', decR.map((d) => (d.ok ? '' : 'ÉCART ') + d.detail).join(' ; ') || 'aucune décision dans la référence');
const synth5 = (Q5[4] ?? '').match(/^\*\*(\d+) conformes, aucun écart, aucun suspendu\*\*, comme proposé\./);
const ret5 = [...Q5.join('\n').matchAll(/\b(V[12]-\d+) (?:retenues?|non retenue, identifiant réservé)\b/g)].map((x) => x[1]);
const lg5 = (Q5[q5 + 1] ?? '').match(/^\*\*Liste globale inchangée : aucune correction nouvelle ; (\d+) corrections dans (\d+) ENTRY, non appliquées ; (V1-\d+) reste libre\.\*\*/);
const v1b = [...new Set([...bilanV2.matchAll(/^\| (V1-\d+) \|/gm)].map((x) => x[1]))], resB = [...bilanV2.matchAll(/^\| réservé \| (V1-\d+) \|/gm)].map((x) => x[1]);
const okF5 = !!synth5 && +synth5[1] === 22 && +synth5[1] === c5p && e5p === 0 && !ret5.length && !!lg5 && JSON.stringify({ total: +lg5[1], entry: +lg5[2], prochain: lg5[3] }) === JSON.stringify(rt5.faits.corrections)
  && JSON.stringify(v1b) === JSON.stringify(V(1, 21)) && JSON.stringify(resB) === JSON.stringify(V(22, 23)) && /^### 8\.95 Volet 1, lot 3 : T5 arbitrée, 22 conformes, aucun écart/.test(t895) && !/^\|/m.test(t895)
  && t895.includes('**T5 : 22 conformes, aucun écart, aucun suspendu**');
ctl(okF5, 'T5 : 22 conformes, aucun écart = §1 ; aucune correction nouvelle (§0 ; bilan : V1-1 à V1-21 retenues, V1-22 et V1-23 réservées, V1-24 libre ; §8.95 sans ligne de tableau)', synth5 ? synth5[1] + ' conformes ; corrections citées au §0 : ' + (ret5.join(', ') || 'aucune') + ' ; bilan : ' + v1b.length + ' retenues, réservées ' + resB.join(', ') + ' ; liste ' + (lg5 ? lg5.slice(1).join(', ') : 'illisible') : 'synthèse du §0 illisible');
ctl(!absents5.includes(T5R) && man[T5R] === sha(T5R), 'T5 : rapport arbitré protégé au manifeste, empreinte identique', absents5.includes(T5R) ? 'fichier absent' : man[T5R] ? sha(T5R).slice(0, 12) + '…' : 'absent du manifeste');
const reg = JSON.parse(txt('a2-05-travail/registre-tranches.json')).tranches;
const t4 = reg.find((t) => t.id === 'T4');
ctl(t4?.condition === 'conditionnée au bilan du pilote ; divisible en deux' && reg.filter((t) => ['T1', 'T2', 'T3', 'T4', 'T5'].includes(t.id)).every((t) => t.statut === 'planifiée'), 'registre : condition du pilote portée par T4 ; statuts non modifiés', 'T4 « ' + t4?.condition + ' » ; T1 à T5 « planifiée »');
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md'); const i86 = bilan.search(/^### 8\.86 /m);
ctl(i86 > 0 && !/^### 8\.[0-9]+ [^\n]*bilan du pilote/im.test(bilan.slice(0, i86)) && /^### 8\.87 [^\n]*bilan du pilote accepté/m.test(bilan), 'bilan du volet 2 : aucun bilan du pilote avant §8.86 ; acceptation consignée au §8.87', 'aucune sous-section antérieure à §8.86 intitulée « bilan du pilote » ; §8.87 présent');
const diffM = Object.entries(man).filter(([p, h]) => !existsSync(join(root, p)) || sha(p) !== h).map(([p]) => p);
const T6R = R + 'T6.md', nM = Object.keys(man).length, pos6 = Object.keys(man).indexOf(T6R), a6 = existsSync(join(root, T6R));
ctl((nM === 38 || nM === 39) && !diffM.length && Object.keys(man)[35] === P5 && Object.keys(man)[36] === T5R && Object.keys(man)[37] === P6 && (nM === 38 ? pos6 === -1 : pos6 === 38), 'manifeste : 38 ou 39 empreintes recalculées, identiques ; périmètre de T5 (36e entrée), rapport arbitré de T5 (37e entrée), périmètre de T6 (38e entrée) ; rapport arbitré de T6 absent ou 39e entrée', nM + ' entrées ; rapport de T6 : ' + (pos6 === -1 ? 'hors du manifeste' : (pos6 + 1) + 'e entrée') + ' ; différentes : ' + (diffM.join(', ') || 'aucune'));
// Rapport arbitré de T6, une fois au manifeste : identique à sa version arbitrée relue (empreinte fixée, indépendante du manifeste)
ctl(pos6 === -1 || (a6 && sha(T6R) === '7e3bfd8ecc1221100a22e35e89bebc81ebfb43f673dc1f1a8d31c701ea4016df'), 'T6 : rapport arbitré, s\'il est au manifeste, identique à sa version arbitrée relue (empreinte fixée, indépendante du manifeste)', pos6 === -1 ? 'hors du manifeste : sans objet' : a6 ? sha(T6R).slice(0, 12) + '…' : 'fichier absent');
console.log(ecarts ? ecarts + ' écart(s)' : 'contrôle conforme');
process.exit(ecarts ? 1 : 0);
