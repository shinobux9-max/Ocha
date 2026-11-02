// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T8 (D5, D8), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, l'état publié, le journal, les lots, le résultat du criblage, le bilan du volet 2
// (corrections), les rapports de livraison et de tranche, le rapport du lot 1, le registre des tranches, le manifeste d'empreintes et le
// périmètre généré, et compare. Dérivé du recalcul de T7 d'avant son audit (c8877283…, arbitrage-T7/application-A/depart/). Changements : deux
// segments du découpage (D5 et D8), non adjacents, l'intervalle étant D6 et D7 (T6, arbitrée) ; 320 sens arbitrés à la clôture de T7 fixés par
// leur empreinte, lus dans les 41 premières entrées du manifeste ; C7-c sur les seuls sens de D5 ; fonctions d'A9 sur les seuls sens de D8 ; chaque
// type nul porté par une décision type-nul ; inventaire des 57 restants comparé à celui du rapport ; périmètre en proposition, hors du manifeste.
// Code 1 au premier écart constaté en fin de lecture (chaque contrôle est rendu). Ne juge aucun sens.
// Adaptation au périmètre accepté (§0 ; proposition sauvegardée, empreinte fixée ; empreinte de la version acceptée fixée, indépendante du manifeste) et à
// sa protection (absent du manifeste ou en 42e entrée) : préparée le 2026-10-31, appliquée seulement sur autorisation distincte ; version initiale `34b84c31…`.
// Adaptation à l'arbitrage de T8 (rapport arbitré, §0), préparée le 2026-10-31, appliquée seulement sur autorisation distincte : le contrôle « sens non
// encore examinés » devient « examinés dans le seul rapport de T8, arbitré » ; les 320 sens de la clôture de T7 restent contrôlés par leur empreinte ; les
// 41 restants sont T9 et F ; l'inventaire des 57 du périmètre égale les 41 restants et les 16 de T8 ; rapport arbitré contre sa proposition sauvegardée.
// Usage : node a2-05-travail/recalcul-T8-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les sens restants, sens par sens)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const sha = (t) => createHash('sha256').update(t).digest('hex');
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+'; const LIVS = ['D5', 'D8']; const N = 16; const NE = 14;
const ARBITRES_T7 = '5fb670af61bde42fd6336ae1f6cbae52272680e672fda8dd1080acc383abf2a3'; // liste triée des 320 sens arbitrés à la clôture de T7
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// 1. Découpage arbitré : liste du §6 et lignes de synthèse ; deux segments contigus, l'intervalle étant exactement D6 et D7
const decoupage = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
const liste = [...decoupage.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\| ([^|]+) \\| [^|]+ \\| ([0-9]+) \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3], mot: m[4].trim(), lot: m[5] }));
const t8 = liste.filter((l) => LIVS.includes(l.liv));
const synth = Object.fromEntries([...decoupage.matchAll(/^\| ([A-F][0-9]+) \| [A-F] \| [^|]+ \| ([0-9]+) \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => [m[1], +m[2]]));
ctl(liste.length === 377 && new Set(liste.map((l) => l.id)).size === 377 && liste.every((l, k) => l.n === k + 1), 'liste globale', liste.length + ' lignes, ' + new Set(liste.map((l) => l.id)).size + ' distinctes, numérotées 1 à 377');
ctl(LIVS.every((l) => t8.filter((x) => x.liv === l).length === synth[l]) && t8.length === N, 'D5 et D8 contre la synthèse', LIVS.map((l) => l + ' ' + t8.filter((x) => x.liv === l).length + '/' + synth[l]).join(', '));
const seg = LIVS.map((l) => t8.filter((x) => x.liv === l)); const contigu = (s) => s.every((x, k) => x.n === s[0].n + k);
const entre = liste.filter((l) => l.n > seg[0].at(-1).n && l.n < seg[1][0].n);
ctl(seg.every(contigu) && entre.every((l) => ['D6', 'D7'].includes(l.liv)) && entre.length === synth.D6 + synth.D7, 'deux segments contigus ; intervalle = D6 et D7', 'D5 lignes ' + seg[0][0].n + ' à ' + seg[0].at(-1).n + ' ; D8 lignes ' + seg[1][0].n + ' à ' + seg[1].at(-1).n + ' ; entre les deux : ' + entre.length + ' lignes, ' + [...new Set(entre.map((l) => l.liv))].join(', '));
const ids = t8.map((l) => l.id); const entries = [...new Set(ids.map((id) => id.replace(/_s[0-9]+$/, '')))];
ctl(new Set(ids).size === N && entries.length === NE, 'aucun doublon de sens ; ENTRY distinctes', ids.length + ' sens, ' + entries.length + ' ENTRY');

// 2. Les 16 sens sont examinés dans le seul rapport de T8, arbitré, et dans aucun autre rapport de livraison ou de tranche (hors périmètres)
const rapports = readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)[0-9]+\.md$/.test(f));
const fichesDe = (f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1]);
const RT8 = 'etape2-A2-05-volet1-lot3-T8.md';
const ailleurs = ids.filter((id) => JSON.stringify(rapports.filter((f) => fichesDe(f).includes(id))) !== JSON.stringify([RT8]));
ctl(!ailleurs.length && rapports.includes(RT8) && /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + RT8)), 'les 16 sens examinés dans le seul rapport de T8, arbitré (' + rapports.length + ' rapports de livraison et de tranche lus)', ailleurs.join(', ') || 'aucun examiné ailleurs');

// 3. Inventaire des restants, sans compte global figé : sens arbitrés dans la liste globale ; 320 sens arbitrés à la clôture de T7 toujours
// arbitrés ; aucun restant hors du registre ; restants par livraison et par tranche ; T8 = D5 et D8, statut du registre non modifié, ses 16 sens arbitrés
const arbitre = (f) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + f));
const arbitres = new Set(rapports.filter(arbitre).flatMap(fichesDe));
const horsListe = [...arbitres].filter((id) => !liste.some((l) => l.id === id));
const restants = liste.filter((l) => !arbitres.has(l.id));
const reg = json('a2-05-travail/registre-tranches.json').tranches; const trancheDe = new Map(reg.flatMap((t) => t.livraisons.map((l) => [l, t.id])));
const parLiv = {}; for (const r of restants) parLiv[r.liv] = (parLiv[r.liv] ?? 0) + 1;
const parTr = {}; for (const r of restants) { const t = trancheDe.get(r.liv) ?? '(hors registre)'; parTr[t] = (parTr[t] ?? 0) + 1; }
ctl(!horsListe.length && !parTr['(hors registre)'], 'inventaire des restants (liste globale moins les sens des rapports arbitrés)', arbitres.size + ' arbitrés, ' + restants.length + ' restants ; hors de la liste globale : ' + (horsListe.join(', ') || 'aucun') + ' ; par livraison : ' + Object.entries(parLiv).map(([k, v]) => k + ' ' + v).join(', '));
const H41 = new Set(Object.keys(json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes).slice(0, 41)); // les 320 : rapports arbitrés des 41 premières entrées
const historiques = [...new Set(rapports.filter((f) => H41.has('docs/rapports/' + f) && arbitre(f)).flatMap(fichesDe))].sort();
const sous320 = sha(historiques.join('\n')) === ARBITRES_T7;
ctl(historiques.length === 320 && sous320 && historiques.every((id) => arbitres.has(id)), 'les 320 sens arbitrés à la clôture de T7 restent arbitrés (empreinte de leur liste triée, `' + ARBITRES_T7.slice(0, 8) + '…`)', historiques.length + ' lus, ' + arbitres.size + ' arbitrés en tout');
ctl(reg.find((t) => t.id === 'T8')?.livraisons.join() === LIVS.join() && reg.find((t) => t.id === 'T8')?.statut === 'planifiée' && ids.every((id) => arbitres.has(id)) && restants.length === 41 && !parTr.T8 && parTr.T9 === 24 && parTr.F === 17, 'restants par tranche du registre : T9 24, F 17 ; 41 en tout ; T8 = D5 et D8, entièrement arbitrée, statut du registre non modifié', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));
if (process.argv.includes('--inventaire')) for (const l of [...new Set(restants.map((r) => r.liv))]) console.log('   ' + l + ' (' + (trancheDe.get(l) ?? '?') + ') : ' + restants.filter((r) => r.liv === l).map((r) => r.mot + ' `' + r.id + '`').join(', '));

// 4. Périmètre généré : §2 identique au découpage ; catégorie, type et fonctions égaux à l'état publié
const gen = txt('docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md');
const s2 = gen.slice(gen.indexOf('## 2. '), gen.indexOf('## 3. '));
const lignes = [...s2.matchAll(new RegExp('^\\| [0-9]+ \\| `(' + ID + ')` \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| (D[58]) \\| `([^`]+)` \\| `([^`]+)` \\| ([^|]+) \\|', 'gm'))].map((m) => ({ id: m[1], liv: m[2], cat: m[3], type: m[4], fn: [...m[5].matchAll(/`([^`]+)`/g)].map((x) => x[1]).join() }));
ctl(lignes.length === N && lignes.every((l, k) => l.id === ids[k] && l.liv === t8[k].liv), 'sens du périmètre généré = découpage (ordre et livraison)', lignes.length + ' sens, ' + entries.length + ' ENTRY');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const sens = new Map(pub.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const fn = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const catDe = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const diffCat = lignes.filter((l) => !sens.has(l.id) || catDe(sens.get(l.id).s.category) !== l.cat || String(sens.get(l.id).s.semantic_type) !== l.type || fn(sens.get(l.id).s).join() !== l.fn);
ctl(!diffCat.length, 'catégories, types et fonctions du §2 = état publié (data/)', diffCat.map((l) => l.id).join(', ') || N + ' sens identiques');

// 5. Question du bloc D, sous ses deux formes : C7-c sur les sens de D5 seuls (absence de fonction, décidée avant A9) ; aucun C7-b
const crib = new Map(json('a2-05-travail/criblage/resultat.json').candidats.map((c) => [c.id, c]));
const D5 = t8.filter((l) => l.liv === 'D5').map((l) => l.id), D8 = t8.filter((l) => l.liv === 'D8').map((l) => l.id);
const c7 = ids.filter((id) => (crib.get(id)?.regles ?? []).some((g) => /^C7-[bc]$/.test(g.regle)));
ctl(JSON.stringify(c7) === JSON.stringify(D5) && D5.every((id) => crib.get(id).regles.filter((g) => g.regle === 'C7-c').length === 1), 'C7-c sur les 5 sens de D5, une fois chacun ; aucun sens de D8', c7.map((id) => sens.get(id).e.word).join(', '));

// 6. Fonctions : D5 sans fonction ; D8 : chaque sens porte exactement la fonction relevée ; aucun deictique ; répartition dans tout le lexique publié
const A9 = ['connecteur', 'discours', 'politesse', 'intensifieur', 'quantificateur', 'comparatif'];
const livDe = new Map(liste.map((l) => [l.id, l.liv]));
const ATTF = { v_471_s1: 'intensifieur', v_471_s2: 'politesse', v_497_s1: 'quantificateur', v_498_s1: 'intensifieur', v_509_s1: 'quantificateur', v_509_s2: 'intensifieur', v_515_s1: 'intensifieur', v_517_s1: 'comparatif', v_520_s1: 'quantificateur', v_607_s1: 'comparatif,intensifieur', v_639_s1: 'quantificateur' };
const ecF = D8.filter((id) => fn(sens.get(id).s).join() !== ATTF[id]);
ctl(D5.every((id) => !fn(sens.get(id).s).length) && !ecF.length && Object.keys(ATTF).length === D8.length, 'D5 sans fonction ; D8 : une fonction d\'A9 sur chaque sens, celle du relevé ; un seul cumul, もっと', ecF.join(', ') || D8.length + ' sens de D8 conformes au relevé');
ctl(!ids.some((id) => fn(sens.get(id).s).includes('deictique')), 'aucun sens de T8 ne porte deictique', 'aucun');
const porteurs = (f) => [...sens.values()].filter(({ s }) => fn(s).includes(f)).map(({ s }) => livDe.get(s.id) ?? 'hors des 377');
const ouA9c = {}; for (const f of A9) { ouA9c[f] = {}; for (const o of porteurs(f)) ouA9c[f][o] = (ouA9c[f][o] ?? 0) + 1; }
ctl(porteurs('quantificateur').length === 4 && porteurs('quantificateur').every((o) => o === 'D8') && porteurs('comparatif').length === 2 && porteurs('comparatif').every((o) => o === 'D8') && ouA9c.intensifieur.D8 === 5 && ouA9c.intensifieur.E2 === 1 && ouA9c.intensifieur.D6 === 1 && porteurs('intensifieur').length === 7 && ouA9c.politesse.D8 === 1 && porteurs('politesse').length === 6, 'tous les sens publiés quantificateur (4) et comparatif (2) sont en D8 ; intensifieur 5 sur 7, politesse 1 sur 6', JSON.stringify(ouA9c));
const ouTout = [...sens.values()].filter(({ s }) => fn(s).some((f) => A9.includes(f))).map(({ s }) => livDe.get(s.id) ?? 'hors des 377');
ctl(ouTout.every((o) => ['D6', 'D7', 'D8', 'E2'].includes(o)), 'sens publiés portant une fonction d\'A9 : en D6 et D7 (T6, arbitrée), D8 (T8) et E2 (T9) seulement', ouTout.length + ' sens');

// 7. Lots d'origine et décisions de journal par ENTRY : chaque ENTRY validée dans le lot de la colonne « lot » du découpage ; décisions = §5
// du générateur, toutes validées
const lotDe = new Map(); for (const f of readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-[0-9]+\.json$/.test(f))) for (const [k, v] of Object.entries(json('reconstruction/a2-04/lots/' + f).entries ?? {})) lotDe.set(k, { lot: f.slice(4, 6), status: v.status });
const ecLot = t8.filter((l) => { const x = lotDe.get('n5_' + l.id.replace(/_s[0-9]+$/, '')); return !x || x.lot !== l.lot || x.status !== 'validated'; });
ctl(!ecLot.length, 'chaque ENTRY validée dans son lot d\'origine (colonne du découpage)', ecLot.map((l) => l.id).join(', ') || 'lots ' + [...new Set(t8.map((l) => l.lot))].join(', '));
const journal = json('reconstruction/a2-04/journal.json');
const s5 = gen.slice(gen.indexOf('## 5. '), gen.indexOf('## 6. '));
const decGen = new Map([...s5.matchAll(/^\| `(v_[0-9]+)` \| [^|]+ \| `([^`]+)` \| (.*) \|$/gm)].map((m) => [m[1], { src: m[2], d: [...m[3].matchAll(/D[0-9]{4}/g)].map((x) => x[0]) }]));
const ecD = entries.filter((e) => { const s = 'n5_' + e; const d = journal.filter((x) => x.entry === s).map((x) => x.id.replace('A2-04-', '')); const g = decGen.get(e); return !g || g.src !== s || d.join() !== g.d.join() || journal.some((x) => x.entry === s && x.status !== 'validated'); });
const dT8 = journal.filter((x) => entries.some((e) => x.entry === 'n5_' + e)); const nat = {}; for (const d of dT8) nat[d.kind] = (nat[d.kind] ?? 0) + 1;
ctl(!ecD.length && dT8.length === 56, 'décisions de journal par ENTRY = §5 du générateur (toutes validées)', ecD.join(', ') || dT8.length + ' décisions (' + Object.entries(nat).map(([k, v]) => k + ' ' + v).join(', ') + ') ; lots ' + [...new Set(dT8.map((d) => d.lot))].join(', '));
const fnDec = dT8.filter((d) => / · linguistic_functions$/.test(d.field)).map((d) => d.id.replace('A2-04-', ''));
ctl(JSON.stringify(fnDec) === JSON.stringify(['D1390', 'D1392', 'D1522', 'D1526', 'D1529', 'D1530', 'D1531', 'D1537', 'D1538', 'D1541', 'D1544', 'D1548', 'D1549', 'D1553', 'D1557', 'D1558']), 'décisions de fonction sur ces ENTRY (lots 21 et 24)', fnDec.join(', '));
const nuls = ids.filter((id) => sens.get(id).s.semantic_type === null); const sansTN = nuls.filter((id) => { const { e, s } = sens.get(id); const rang = e.senses.indexOf(s) + 1; return !journal.some((x) => x.entry === 'n5_' + e.id && x.kind === 'type-nul' && x.status === 'validated' && x.field === 'sens ' + rang + ' · semantic_type'); });
ctl(JSON.stringify(nuls) === JSON.stringify(D8) && !sansTN.length, 'les 11 types nuls, sens de D8 exactement, chacun porté par une décision type-nul validée de son rang', sansTN.join(', ') || nuls.length + ' décisions');

// 8. Corrections : toute ligne de tableau du bilan (hors §7) citant une ENTRY de T8 ou l'un de ses sens, identifiant exact ; égales au générateur
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md').replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
const cite = (l, e) => new RegExp('`(?:n5_)?' + e + '(?:_s[0-9]+)?`').test(l);
const corr = [...new Set(bilan.split('\n').filter((l) => /^\| (V[12]-[0-9]+|[0-9]+) \|/.test(l) && entries.some((e) => cite(l, e))).map((l) => l.split('|')[1].trim()))].sort();
const corrGen = ((gen.match(/^- \*\*Corrections retenues sur ces ENTRY\*\*[^:]*: (.*)\.$/m) ?? [])[1] ?? '').split(', ').filter(Boolean).sort();
ctl(JSON.stringify(corr) === JSON.stringify(corrGen) && JSON.stringify(corr) === JSON.stringify(['V1-7', 'V1-8']) && !bilan.split('\n').some((l) => /^\| (V[12]-[0-9]+|[0-9]+) \|/.test(l) && ids.some((id) => l.includes('`' + id + '`'))), 'corrections retenues sur les ENTRY de T8 : V1-7 et V1-8, égales au générateur ; aucune sur l\'un des 16 sens', 'recalcul ' + corr.join(', ') + ' ; générateur ' + corrGen.join(', '));

// 9. Provenance (lot 2) et corrections : colonnes du découpage
const ATT = { v_471_s1: 'sens : sourcé ; ENTRY : sourcé / —', v_471_s2: 'ENTRY : sourcé / —', v_509_s1: 'sens : sourcé ; ENTRY : sourcé / —', v_509_s2: 'ENTRY : sourcé / —', v_517_s1: 'sens : sourcé / —', v_520_s1: 'ENTRY : sourcé / —', v_639_s1: 'ENTRY : sourcé / —' };
const prov = new Map([...decoupage.matchAll(new RegExp('^\\| [0-9]+ \\| D[58] \\| `(' + ID + ')` \\|.*\\| ([^|]+) \\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim() + ' / ' + m[3].trim()]));
const provEc = ids.filter((id) => prov.get(id) !== (ATT[id] ?? '— / —'));
ctl(prov.size === N && !provEc.length, 'provenance et corrections du découpage (sept lignes renseignées, neuf « — »)', provEc.map((id) => id + ' ' + prov.get(id)).join(' ; ') || N + ' lignes conformes');

// 10. Relations publiées touchant T8
const rel = pub.flatMap((e) => e.senses.flatMap((s) => (s.relations ?? []).map((r) => ({ de: s.id, type: r.type, vers: r.target })))).filter((r) => ids.includes(r.de) || ids.includes(r.vers));
ctl(rel.length === 1 && rel[0].de === 'v_497_s1' && rel[0].type === 'similar_to' && rel[0].vers === 'v_509_s1', 'relation publiée touchant T8 : ちょっと s1 similar_to 少し s1, seule', rel.map((r) => r.de + ' ' + r.type + ' ' + r.vers).join(', '));

// 11. Autres sens des mêmes ENTRY, hors de T8 : leur situation (arbitrés ou hors des 377), aucun restant
const autres = pub.filter((e) => entries.includes(e.id)).flatMap((e) => e.senses.filter((s) => !ids.includes(s.id)).map((s) => ({ w: e.word, id: s.id, o: livDe.has(s.id) ? livDe.get(s.id) + (arbitres.has(s.id) ? ' arbitré' : ' restant') : 'hors des 377' })));
ctl(autres.length === 5 && !autres.some((x) => / restant$/.test(x.o)), 'autres sens des mêmes ENTRY : aucun restant', autres.map((x) => x.w + ' `' + x.id + '` ' + x.o).join(', '));

// 12. Frontières : aucun sens de T8 dans T9 ou F ; T9 = E1, E2, E3 ; F = F1, F2, suspendue ; aucun comparable du bloc F
const tr = (id) => reg.find((t) => t.id === id);
ctl(tr('T9')?.livraisons.join() === 'E1,E2,E3' && tr('F')?.livraisons.join() === 'F1,F2' && tr('F')?.statut === 'suspendue' && !ids.some((id) => ['E1', 'E2', 'E3', 'F1', 'F2'].includes(livDe.get(id))) && !/^- \*\*Comparables du bloc F\*\*/m.test(gen), 'frontières : T9 (E1, E2, E3), F (F1, F2, suspendue), disjointes de T8 ; aucun comparable du bloc F', 'restants : T9 ' + (parTr.T9 ?? 0) + ', F ' + (parTr.F ?? 0));

// 13. Comparables du lot 1 : étiquette du générateur conforme au verdict arbitré
const lot1 = new Map([...txt('docs/rapports/etape2-A2-05-coherence-retroactive.md').matchAll(new RegExp('^#### `(' + ID + ')` · [^\\n]* — \\*\\*([^*]+)\\*\\*$', 'gm'))].map((m) => [m[1], m[2]]));
const comp = new Map([...gen.matchAll(new RegExp('^\\| `(' + ID + ')` \\|.*\\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim()]));
const vus = [...lot1.keys()].filter((x) => comp.has(x));
ctl(lot1.size === 19 && vus.every((id) => comp.get(id).endsWith('volet 1, lot 1 (' + lot1.get(id) + ', arbitré)')), 'sens du lot 1 ; étiquettes des comparables conformes', lot1.size + ' lus ; parmi les comparables : ' + (vus.join(', ') || 'aucun'));

// 14. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée ; empreinte de la version acceptée fixée ; inventaire des 57 du rapport égal au recalcul, chaque sens une fois
const octets = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const PER8 = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md';
const PROP8 = 'a2-05-travail/arbitrage-T8/proposition-T8-perimetre.md';
const PL = (existsSync(join(root, PROP8)) ? txt(PROP8) : '').split('\n'), G = gen.split('\n');
const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T8'); const sans0 = a0 > 0 && b0 > a0 ? [...G.slice(0, a0), ...G.slice(b0)] : G; const st = PL.findIndex((l) => l.startsWith('**Statut** : '));
ctl(octets(PROP8) === 'c087860fb89da40410a572fc48ea31d3f881713a0af24575f36e8540063d37b8' && /^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/.test(PL[st] ?? '') && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-31 \(§0\)\.\*\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', octets(PROP8).slice(0, 12) + '… ; §0 : ' + (b0 - a0) + ' lignes');
ctl(octets(PER8) === '5b46f9353e38fb9f4b522d4363fe2b843de52819e214847cfdb5e35f508e96bb', 'périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', octets(PER8).slice(0, 12) + '…');

// 14 bis. Rapport arbitré de T8 : statut et §0 ; hors du statut et du §0, identique à sa proposition sauvegardée, empreinte fixée. Un fichier absent se lit vide
const RAP8 = 'docs/rapports/' + RT8, SAUV8 = 'a2-05-travail/arbitrage-T8/proposition-T8.md';
const SL = (existsSync(join(root, SAUV8)) ? txt(SAUV8) : '').split('\n'), RL = (existsSync(join(root, RAP8)) ? txt(RAP8) : '').split('\n');
const a1 = RL.indexOf('## 0. Arbitrage'), b1 = RL.indexOf('## 1. Résultat proposé'); const sans1 = a1 > 0 && b1 > a1 ? [...RL.slice(0, a1), ...RL.slice(b1)] : RL;
const st1 = SL.findIndex((l) => l.startsWith('**Statut** : '));
ctl(octets(SAUV8) === '2a42fb8458502a1f41f37a2d0560e5016c186a803ad653edc96437bd1b559c9d' && /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/.test(SL[st1] ?? '') && /^\*\*Statut\*\* : \*\*arbitré le 2026-10-31\*\* \(§0\)\./.test(RL[st1] ?? '') && a1 > 0 && b1 > a1 && sans1.length === SL.length && sans1.every((l, k) => k === st1 || l === SL[k]), 'rapport arbitré de T8 (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', octets(SAUV8).slice(0, 12) + '… ; §0 : ' + (b1 - a1) + ' lignes');
const s08 = a1 > 0 && b1 > a1 ? RL.slice(a1, b1).join('\n') : '';
ctl(s08.includes('**16 conformes, 0 écart, 0 suspendu**') && s08.includes('**Absence de `deictique` maintenue**') && s08.includes('**`intensifieur` seul maintenu**') && s08.includes('**Cumul `comparatif` + `intensifieur` confirmé**'), '§0 de T8 : 16 conformes, 0 écart, 0 suspendu ; すぐに, あまり et もっと tels qu\'arbitrés', 'présents');
const invL = gen.split('\n').find((l) => l.startsWith('- **Inventaire complet des 57 sens restants**')) ?? '';
const invIds = [...invL.matchAll(new RegExp('`(' + ID + ')`', 'g'))].map((m) => m[1]);
const vus57 = liste.filter((r) => !arbitres.has(r.id) || ids.includes(r.id)); const manque = vus57.filter((r) => !invL.includes(r.mot + ' `' + r.id + '`'));
ctl(invIds.length === 57 && new Set(invIds).size === 57 && vus57.length === 57 && !manque.length, 'inventaire des 57 du rapport = 41 restants recalculés et 16 sens de T8, chacun une fois', manque.map((r) => r.id).join(', ') || invIds.length + ' sens');

// 15. Manifeste : au moins 41 entrées, toutes identiques (SHA-256 des octets, sans le module v2) ; les 41 premières dans leur ordre (liste fixée par
// son empreinte) ; périmètre accepté de T8 absent ou en 42e entrée
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const cles = Object.keys(man);
const diffE = Object.entries(man).filter(([p, h]) => octets(p) !== h).map(([p]) => p);
const k41 = sha(cles.slice(0, 41).join('\n'));
ctl(cles.length >= 41 && !diffE.length && k41 === '0e811b31ce22a22e61112acec4e97d8934e882011fc1ee019dfa780f38228b11' && (cles.indexOf(PER8) === -1 || cles.indexOf(PER8) === 41), 'manifeste : au moins 41 empreintes recalculées, toutes identiques ; les 41 premières dans leur ordre ; périmètre de T8 absent ou en 42e entrée', cles.length + ' entrées ; 41 premières ' + k41.slice(0, 12) + '… ; différentes : ' + (diffE.join(', ') || 'aucune'));
const posR = cles.indexOf(RAP8);
ctl(posR === -1 || posR === 42, 'rapport arbitré de T8 absent du manifeste ou en 43e entrée', posR === -1 ? 'hors du manifeste' : posR === 42 ? '43e entrée' : (posR + 1) + 'e entrée');
console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');
process.exit(ecarts ? 1 : 0);
