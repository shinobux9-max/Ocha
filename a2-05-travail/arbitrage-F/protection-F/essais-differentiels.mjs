// A2-05 · bloc F : essais différentiels de l'outillage d'empreintes, ancien (version de HEAD) contre proposé. Jamais sur le dépôt réel : n'opère que sur une
// copie jetable, où il modifie temporairement des statuts de rapport, rétablis aussitôt. N'écrit aucun manifeste ; appelle anomaliesTranches et rapportsArbitres
// sur des manifestes construits en mémoire.
// (T) Domaine des tranches T1 à T9 : pour chaque cas, l'ancien et le nouvel outil rendent exactement les mêmes anomalies (non-régression des protections existantes).
// (F) Tranche F : le nouvel outil admet le rapport arbitré de F avec son périmètre opérationnel accepté, et applique à F les mêmes règles qu'aux tranches T.
// Usage : node essais-differentiels.mjs <racine d'une copie jetable>   (la copie porte a2-05-travail/empreintes-lot3-ancien.mjs, version de HEAD). Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine d\'une copie jetable');
if (!existsSync(join(root, 'a2-05-travail/empreintes-lot3-ancien.mjs'))) throw new Error('copie jetable attendue : empreintes-lot3-ancien.mjs absent');
const A = await import(pathToFileURL(join(root, 'a2-05-travail/empreintes-lot3-ancien.mjs')).href);
const N = await import(pathToFileURL(join(root, 'a2-05-travail/empreintes-lot3.mjs')).href);
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json';
const RF = R + 'F.md', PF = R + 'F-perimetre-operationnel.md', PREP = R + 'F-perimetre.md', T9 = R + 'T9.md', P9 = R + 'T9-perimetre.md';
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
const m45 = JSON.parse(readFileSync(join(root, MAN), 'utf8'));
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
if (Object.keys(m45.empreintes).length !== 45) throw new Error('manifeste de départ à 45 entrées attendu');

const K45 = Object.keys(m45.empreintes); const B27 = new Set(K45.slice(0, 27)); const BS9 = new Set(K45.filter((p) => p !== T9 && p !== P9));
const cloner = (m) => structuredClone(m);
const sans = (m, ...ps) => { const c = cloner(m); for (const p of ps) delete c.empreintes[p]; c.ajouts = c.ajouts.map((a) => ({ ...a, chemins: a.chemins.filter((x) => !ps.includes(x)) })).filter((a) => a.chemins.length); return c; };
const avec = (m, groupes, date = '2026-11-03') => { const c = cloner(m); for (const g of groupes) { for (const p of g) c.empreintes[p] = existsSync(join(root, p)) ? sha(p) : '0'.repeat(64); c.ajouts.push({ date, chemins: g }); } return c; };
const texte = (m) => JSON.stringify(m, null, 1) + '\n';
const statutTemp = (p, nouveau, f) => { const o = readFileSync(join(root, p)); writeFileSync(join(root, p), o.toString('utf8').replace(/^\*\*Statut\*\* : [^\n]*$/m, nouveau)); try { return f(); } finally { writeFileSync(join(root, p), o); } };
const an = (M, m, base, brut) => M.anomaliesTranches(root, m, base, brut === undefined ? texte(m) : brut);

console.log('--- T · domaine des tranches T1 à T9 : anomalies identiques, ancien et nouvel outil');
const T = [
  ['T0 manifeste réel, base = ses 45 entrées', () => [m45, new Set(K45)], 0],
  ['T1 manifeste réel, base = les 27 entrées historiques (78031638)', () => [m45, B27], null],
  ['T2 manifeste réel, base sans T9 ni son périmètre', () => [m45, BS9], 0],
  ['T3 périmètre de T9 retiré : rapport arbitré sans son périmètre', () => [sans(m45, P9), BS9], 1],
  ['T4 rapport de T9 inscrit avant son périmètre', () => [avec(sans(m45, T9, P9), [[T9], [P9]]), BS9], 1],
  ['T5 entrée étrangère (le bilan du volet 2)', () => [avec(m45, [['docs/rapports/etape2-A2-05-bilan-volet2.md']]), new Set(K45)], 1],
  ['T6 clé en double dans le texte du manifeste', () => { const b = texte(m45).replace('  "' + T9 + '": "', '  "' + T9 + '": "' + m45.empreintes[T9] + '",\n  "' + T9 + '": "'); return [m45, new Set(K45), b]; }, 1],
  ['T7 dates des ajouts hors d\'ordre', () => { const c = cloner(m45); c.ajouts.at(-1).date = '2026-10-01'; return [c, new Set(K45)]; }, 1],
  ['T8 chemin inscrit dans les ajouts, absent des empreintes', () => { const c = cloner(m45); c.ajouts.at(-1).chemins.push(R + 'T10.md'); return [c, new Set(K45)]; }, 1],
  ['T9 entrée nouvelle non inscrite dans les ajouts', () => { const c = sans(m45, T9); c.empreintes[T9] = m45.empreintes[T9]; return [c, BS9]; }, 1],
  ['T10 chemin de forme opérationnelle pour une tranche T', () => [avec(m45, [[R + 'T9-perimetre-operationnel.md']]), new Set(K45)], 1],
  ['T11 chemin de livraison du bloc F (F1)', () => [avec(m45, [[R + 'F1.md']]), new Set(K45)], 1],
];
for (const [nom, f, attendu] of T) {
  const [m, base, brut] = f(); const a = an(A, m, base, brut), n = an(N, m, base, brut);
  ok(JSON.stringify(a) === JSON.stringify(n) && (attendu === null || (attendu ? a.length > 0 : a.length === 0)), nom, (a.length ? a.length + ' anomalie(s), identiques : ' + n[0].replace(R, '…') : 'aucune anomalie, des deux côtés'));
}
for (const [nom, p, st] of [['T12 statut du rapport de T9 altéré', T9, '**Statut** : **proposition, non arbitrée.**'], ['T13 statut du périmètre de T9 altéré', P9, '**Statut** : **proposition de périmètre, non arbitrée.**']]) {
  statutTemp(p, st, () => { const a = an(A, m45, BS9), n = an(N, m45, BS9); ok(JSON.stringify(a) === JSON.stringify(n) && a.length > 0, nom, a.length + ' anomalie(s), identiques : ' + (n[0] ?? '').replace(R, '…')); });
}
{ const a = A.rapportsArbitres(root), n = N.rapportsArbitres(root);
  ok(n.length === a.length + 1 && n.includes(PF) && !a.includes(PF) && JSON.stringify(n.filter((x) => x !== PF)) === JSON.stringify(a), 'T14 rapportsArbitres : la liste ancienne, inchangée et dans le même ordre, plus le seul périmètre opérationnel accepté de F (à son rang alphabétique parmi les périmètres)', a.length + ' puis ' + n.length + ', rang ' + (n.indexOf(PF) + 1));
  statutTemp(PF, '**Statut** : **proposition de périmètre opérationnel, non arbitrée.**', () => ok(JSON.stringify(N.rapportsArbitres(root)) === JSON.stringify(A.rapportsArbitres(root)), 'T15 périmètre opérationnel de F non accepté : rapportsArbitres identique à l\'ancien'));
  ok(!n.includes(PREP) && !N.TRANCHE.test(PREP), 'T16 périmètre préparatoire de F (non arbitré) : ni rapport arbitré, ni entrée de tranche admise'); }

console.log('--- F · tranche F : mêmes règles que les tranches T');
const NOUV = [RF, PF];
const F = [
  ['F0 rapport arbitré et périmètre opérationnel, dans un même ajout (ordre de --ajouter)', () => avec(m45, [NOUV]), []],
  ['F1 périmètre opérationnel inscrit avant le rapport, en deux ajouts', () => avec(m45, [[PF], [RF]]), []],
  ['F2 rapport arbitré seul, sans son périmètre', () => avec(m45, [[RF]]), [RF + ' : rapport arbitré sans son périmètre protégé']],
  ['F3 périmètre opérationnel seul, rapport arbitré hors du manifeste', () => avec(m45, [[PF]]), [RF + ' : rapport arbitré hors du manifeste, alors que son périmètre y est (omission)']],
  ['F4 rapport inscrit avant son périmètre', () => avec(m45, [[RF], [PF]]), [RF + ' : rapport inscrit avant son périmètre']],
  ['F5 périmètre préparatoire au lieu de l\'opérationnel', () => avec(m45, [[RF, PREP]]), [RF + ' : rapport arbitré sans son périmètre protégé', PREP + ' : entrée étrangère (ni rapport ni périmètre de tranche)']],
];
for (const [nom, f, attendu] of F) { const m = f(); const n = an(N, m, new Set(K45)); ok(JSON.stringify(n) === JSON.stringify(attendu), nom, n.length ? n.map((x) => x.replace(R, '…')).join(' ; ') : 'aucune anomalie'); }
{ const m = avec(m45, [NOUV]); const a = an(A, m, new Set(K45));
  ok(a.length === 2 && a.every((x) => /entrée étrangère/.test(x)), 'F6 témoin : l\'ancien outil refuse les deux entrées de F (entrées étrangères), cause de C9a', a.map((x) => x.replace(R, '…')).join(' ; '));
  statutTemp(RF, '**Statut** : **proposition, non arbitrée.**', () => { const n = an(N, m, new Set(K45)); ok(n.length === 1 && n[0] === RF + ' : rapport protégé sans le statut « arbitré le » (autre)', 'F7 statut du rapport F altéré', (n[0] ?? '').replace(R, '…')); });
  statutTemp(PF, '**Statut** : **proposition de périmètre opérationnel, non arbitrée.**', () => { const n = an(N, m, new Set(K45)); ok(n.length === 1 && n[0] === PF + ' : périmètre protégé sans le statut « périmètre opérationnel accepté le » (autre)', 'F8 statut du périmètre opérationnel altéré', (n[0] ?? '').replace(R, '…')); });
  statutTemp(PF, '**Statut** : **périmètre accepté le 2026-11-03 (§0).**', () => { const n = an(N, m, new Set(K45)); ok(n.length === 1 && /périmètre protégé sans le statut « périmètre opérationnel accepté le »/.test(n[0]), 'F9 périmètre de F au statut des tranches T : refusé (statut propre à F exigé)', (n[0] ?? '').replace(R, '…')); }); }
console.log(ko ? ko + ' écart(s)' : 'essais différentiels conformes'); process.exit(ko ? 1 : 0);
