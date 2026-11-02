// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T7 (D1, D4), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, l'état publié, le journal, les lots, le résultat du criblage, le bilan du volet 2
// (corrections), les rapports de livraison et de tranche, le rapport du lot 1, le registre des tranches, le manifeste d'empreintes et le
// périmètre généré, et compare. Dérivé de la version initiale du recalcul de T6 (0c4ea1d7…, arbitrage-T6/installation/depart/). Changements :
// deux segments du découpage (D1 et D4), non adjacents, l'intervalle étant D2 et D3 (T5, arbitrée) ; inventaire des restants sans compte global
// figé (principe retenu le 2026-10-29 pour les recalculs), avec la protection historique des 296 sens arbitrés à la clôture de T6 ; question du
// bloc D relevée dans le criblage (C7-b, C7-c : fonction absente et terme déclencheur) ; aucune fonction d'A9 dans T7 ; lots d'origine ;
// autres sens des mêmes ENTRY ; frontières avec T8, T9 et le bloc F ; aucune relation publiée. Code 1 au premier écart constaté en fin de
// lecture (chaque contrôle est rendu). Ne juge aucun sens.
// Adaptation au périmètre accepté (§0 ; proposition sauvegardée, empreinte fixée ; empreinte de la version acceptée fixée, indépendante du
// manifeste) et à sa protection (40e entrée du manifeste ; les 39 premières entrées dans leur ordre, liste fixée par son empreinte) : préparée
// le 2026-10-29, appliquée seulement sur autorisation distincte ; version initiale `4c990f02…`.
// Usage : node a2-05-travail/recalcul-T7-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les sens restants, sens par sens)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const sha = (t) => createHash('sha256').update(t).digest('hex');
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+'; const LIVS = ['D1', 'D4']; const N = 24; const NE = 24;
const ARBITRES_T6 = '7c5254d7d18a2793142045107da7ffeddd0eb1ad8531f829037c88e258b5e7e4'; // liste triée des 296 sens arbitrés à la clôture de T6
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// 1. Découpage arbitré : liste du §6 et lignes de synthèse ; deux segments contigus, l'intervalle étant exactement D2 et D3
const decoupage = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
const liste = [...decoupage.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\| ([^|]+) \\| [^|]+ \\| ([0-9]+) \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3], mot: m[4].trim(), lot: m[5] }));
const t7 = liste.filter((l) => LIVS.includes(l.liv));
const synth = Object.fromEntries([...decoupage.matchAll(/^\| ([A-F][0-9]+) \| [A-F] \| [^|]+ \| ([0-9]+) \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => [m[1], +m[2]]));
ctl(liste.length === 377 && new Set(liste.map((l) => l.id)).size === 377 && liste.every((l, k) => l.n === k + 1), 'liste globale', liste.length + ' lignes, ' + new Set(liste.map((l) => l.id)).size + ' distinctes, numérotées 1 à 377');
ctl(LIVS.every((l) => t7.filter((x) => x.liv === l).length === synth[l]) && t7.length === N, 'D1 et D4 contre la synthèse', LIVS.map((l) => l + ' ' + t7.filter((x) => x.liv === l).length + '/' + synth[l]).join(', '));
const seg = LIVS.map((l) => t7.filter((x) => x.liv === l)); const contigu = (s) => s.every((x, k) => x.n === s[0].n + k);
const entre = liste.filter((l) => l.n > seg[0].at(-1).n && l.n < seg[1][0].n);
ctl(seg.every(contigu) && entre.every((l) => ['D2', 'D3'].includes(l.liv)) && entre.length === synth.D2 + synth.D3, 'deux segments contigus ; intervalle = D2 et D3', 'D1 lignes ' + seg[0][0].n + ' à ' + seg[0].at(-1).n + ' ; D4 lignes ' + seg[1][0].n + ' à ' + seg[1].at(-1).n + ' ; entre les deux : ' + entre.length + ' lignes (' + [...new Set(entre.map((l) => l.liv))].join(', ') + ')');
const ids = t7.map((l) => l.id); const entries = [...new Set(ids.map((id) => id.replace(/_s[0-9]+$/, '')))];
ctl(new Set(ids).size === N && entries.length === NE, 'aucun doublon de sens ; ENTRY distinctes', ids.length + ' sens, ' + entries.length + ' ENTRY');

// 2. Aucun de ces sens n'est déjà examiné dans un rapport de livraison ou de tranche (hors périmètres)
const rapports = readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)[0-9]+\.md$/.test(f));
const fichesDe = (f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1]);
const examines = new Set(rapports.flatMap(fichesDe));
const deja = ids.filter((id) => examines.has(id));
ctl(!deja.length, 'sens non encore examinés (' + rapports.length + ' rapports de livraison et de tranche lus)', deja.join(', ') || 'aucun déjà examiné');

// 3. Inventaire des restants, sans compte global figé : sens arbitrés dans la liste globale ; 296 sens arbitrés à la clôture de T6 toujours
// arbitrés ; aucun restant hors du registre ; restants par livraison et par tranche ; T7 = D1 et D4, planifiée, ses 24 sens restants
const arbitre = (f) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + f));
const arbitres = new Set(rapports.filter(arbitre).flatMap(fichesDe));
const horsListe = [...arbitres].filter((id) => !liste.some((l) => l.id === id));
const restants = liste.filter((l) => !arbitres.has(l.id));
const reg = json('a2-05-travail/registre-tranches.json').tranches; const trancheDe = new Map(reg.flatMap((t) => t.livraisons.map((l) => [l, t.id])));
const parLiv = {}; for (const r of restants) parLiv[r.liv] = (parLiv[r.liv] ?? 0) + 1;
const parTr = {}; for (const r of restants) { const t = trancheDe.get(r.liv) ?? '(hors registre)'; parTr[t] = (parTr[t] ?? 0) + 1; }
ctl(!horsListe.length && !parTr['(hors registre)'], 'inventaire des restants (liste globale moins les sens des rapports arbitrés)', arbitres.size + ' arbitrés, ' + restants.length + ' restants ; hors de la liste globale : ' + (horsListe.join(', ') || 'aucun') + ' ; par livraison : ' + Object.entries(parLiv).map(([k, v]) => k + ' ' + v).join(', '));
const historiques = [...arbitres].sort(); // contient les 296 tant qu'aucun n'est retiré ; comparés par leur empreinte quand il y en a exactement 296
const sous296 = arbitres.size === 296 ? sha(historiques.join('\n')) === ARBITRES_T6 : null;
ctl(arbitres.size >= 296 && sous296 !== false, 'les 296 sens arbitrés à la clôture de T6 restent arbitrés (empreinte de leur liste triée, `' + ARBITRES_T6.slice(0, 8) + '…`)', arbitres.size === 296 ? 'liste identique' : arbitres.size + ' arbitrés (progression ; empreinte comparée à 296 seulement)');
ctl(reg.find((t) => t.id === 'T7')?.livraisons.join() === LIVS.join() && reg.find((t) => t.id === 'T7')?.statut === 'planifiée' && (arbitres.size > 296 || ids.every((id) => restants.some((r) => r.id === id))), 'restants par tranche du registre ; T7 = D1 et D4, planifiée ; ses 24 sens restants', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));
if (process.argv.includes('--inventaire')) for (const l of [...new Set(restants.map((r) => r.liv))]) console.log('   ' + l + ' (' + (trancheDe.get(l) ?? '?') + ') : ' + restants.filter((r) => r.liv === l).map((r) => r.mot + ' `' + r.id + '`').join(', '));

// 4. Périmètre généré : §2 identique au découpage ; catégorie, type et fonctions égaux à l'état publié
const gen = txt('docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md');
const s2 = gen.slice(gen.indexOf('## 2. '), gen.indexOf('## 3. '));
const lignes = [...s2.matchAll(new RegExp('^\\| [0-9]+ \\| `(' + ID + ')` \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| (D[14]) \\| `([^`]+)` \\| `([^`]+)` \\| ([^|]+) \\|', 'gm'))].map((m) => ({ id: m[1], liv: m[2], cat: m[3], type: m[4], fn: [...m[5].matchAll(/`([^`]+)`/g)].map((x) => x[1]).join() }));
ctl(lignes.length === N && lignes.every((l, k) => l.id === ids[k] && l.liv === t7[k].liv), 'sens du périmètre généré = découpage (ordre et livraison)', lignes.length + ' sens, ' + entries.length + ' ENTRY');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const sens = new Map(pub.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const fn = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const catDe = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const diffCat = lignes.filter((l) => !sens.has(l.id) || catDe(sens.get(l.id).s.category) !== l.cat || String(sens.get(l.id).s.semantic_type) !== l.type || fn(sens.get(l.id).s).join() !== l.fn);
ctl(!diffCat.length, 'catégories, types et fonctions du §2 = état publié (data/)', diffCat.map((l) => l.id).join(', ') || N + ' sens identiques');

// 5. Question du bloc D, relevée dans le criblage : chaque sens de T7 est candidat sur C7-b ou C7-c ; fonction absente et terme déclencheur
const crib = new Map(json('a2-05-travail/criblage/resultat.json').candidats.map((c) => [c.id, c]));
const c7 = ids.map((id) => { const r = (crib.get(id)?.regles ?? []).filter((g) => /^C7-[bc]$/.test(g.regle)); return { id, mot: sens.get(id)?.e.word, r, sans: r.map((g) => (g.detail.match(/^sans ([a-zé]+)/) ?? [])[1]) }; });
const parFn = {}; for (const x of c7) for (const f of x.sans) parFn[f] = [...(parFn[f] ?? []), x.mot];
ctl(c7.every((x) => x.r.length === 1 && x.sans[0]), 'chaque sens de T7 candidat sur C7-b ou C7-c, une fois (fonction absente relevée)', Object.entries(parFn).map(([f, m]) => f + ' ' + m.length + ' (' + m.join(', ') + ')').join(' ; '));
const C7B = ['v_269_s1', 'v_419_s1'];
ctl(JSON.stringify(c7.filter((x) => x.r[0]?.regle === 'C7-b').map((x) => x.id)) === JSON.stringify(C7B) && c7.filter((x) => x.r[0]?.regle === 'C7-b').every((x) => x.sans[0] === 'deictique'), '`C7-b` (sans `deictique`, décidé avant A7) : 天気 et 向こう seulement ; les 22 autres `C7-c`', c7.filter((x) => x.r[0]?.regle === 'C7-c').length + ' sens `C7-c`');

// 6. Fonctions : aucune fonction d'A9 sur T7 ; `deictique` sur 近々 et 後 (sens 1) seulement ; les sens publiés portant une fonction d'A9 sont
// hors de T7 (T6, arbitrée ; D8, tranche T8 ; E2, tranche T9)
const A9 = ['connecteur', 'discours', 'politesse', 'intensifieur', 'quantificateur', 'comparatif'];
const livDe = new Map(liste.map((l) => [l.id, l.liv]));
const avecFn = ids.filter((id) => fn(sens.get(id).s).length);
ctl(!ids.some((id) => fn(sens.get(id).s).some((f) => A9.includes(f))) && JSON.stringify(avecFn) === JSON.stringify(['v_359_s1', 'v_663_s1']) && avecFn.every((id) => fn(sens.get(id).s).join() === 'deictique'), 'aucune fonction d\'A9 dans T7 ; `deictique` sur 近々 et 後 (sens 1) seulement', (ids.length - avecFn.length) + ' sens sans fonction ; ' + avecFn.map((id) => sens.get(id).e.word + ' ' + fn(sens.get(id).s).join('+')).join(', '));
const ouA9 = [...sens.values()].filter(({ s }) => fn(s).some((f) => A9.includes(f))).map(({ s }) => livDe.get(s.id) ?? 'hors des 377');
const ouA9c = {}; for (const o of ouA9) ouA9c[o] = (ouA9c[o] ?? 0) + 1;
ctl(ouA9.every((o) => ['D6', 'D7', 'D8', 'E2'].includes(o)), 'sens publiés portant une fonction d\'A9 : en D6 et D7 (T6, arbitrée), D8 (T8) et E2 (T9) seulement', ouA9.length + ' sens : ' + Object.entries(ouA9c).map(([k, v]) => k + ' ' + v).join(', '));

// 7. Lots d'origine et décisions de journal par ENTRY : chaque ENTRY validée dans le lot de la colonne « lot » du découpage ; décisions = §5
// du générateur, toutes validées
const lotDe = new Map(); for (const f of readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-[0-9]+\.json$/.test(f))) for (const [k, v] of Object.entries(json('reconstruction/a2-04/lots/' + f).entries ?? {})) lotDe.set(k, { lot: f.slice(4, 6), status: v.status });
const ecLot = t7.filter((l) => { const x = lotDe.get('n5_' + l.id.replace(/_s[0-9]+$/, '')); return !x || x.lot !== l.lot || x.status !== 'validated'; });
ctl(!ecLot.length, 'chaque ENTRY validée dans son lot d\'origine (colonne du découpage)', ecLot.map((l) => l.id).join(', ') || 'lots ' + [...new Set(t7.map((l) => l.lot))].join(', '));
const journal = json('reconstruction/a2-04/journal.json');
const s5 = gen.slice(gen.indexOf('## 5. '), gen.indexOf('## 6. '));
const decGen = new Map([...s5.matchAll(/^\| `(v_[0-9]+)` \| [^|]+ \| `([^`]+)` \| (.*) \|$/gm)].map((m) => [m[1], { src: m[2], d: [...m[3].matchAll(/D[0-9]{4}/g)].map((x) => x[0]) }]));
const ecD = entries.filter((e) => { const s = 'n5_' + e; const d = journal.filter((x) => x.entry === s).map((x) => x.id.replace('A2-04-', '')); const g = decGen.get(e); return !g || g.src !== s || d.join() !== g.d.join() || journal.some((x) => x.entry === s && x.status !== 'validated'); });
const dT7 = journal.filter((x) => entries.some((e) => x.entry === 'n5_' + e)); const nat = {}; for (const d of dT7) nat[d.kind] = (nat[d.kind] ?? 0) + 1;
ctl(!ecD.length && dT7.length === 43, 'décisions de journal par ENTRY = §5 du générateur (toutes validées)', ecD.join(', ') || dT7.length + ' décisions (' + Object.entries(nat).map(([k, v]) => k + ' ' + v).join(', ') + ') ; lots ' + [...new Set(dT7.map((d) => d.lot))].join(', '));
const fnDec = dT7.filter((d) => / · linguistic_functions$/.test(d.field)).map((d) => d.id.replace('A2-04-', ''));
ctl(JSON.stringify(fnDec) === JSON.stringify(['D0796', 'D0819', 'D0821', 'D0823', 'D0825', 'D0908', 'D0952']), 'décisions de fonction sur ces ENTRY (lots 12 et 13, A7)', fnDec.join(', '));

// 8. Corrections : toute ligne de tableau du bilan (hors §7) citant une ENTRY de T7 ou l'un de ses sens, identifiant exact ; égales au générateur
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md').replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
const cite = (l, e) => new RegExp('`(?:n5_)?' + e + '(?:_s[0-9]+)?`').test(l);
const corr = [...new Set(bilan.split('\n').filter((l) => /^\| (V[12]-[0-9]+|[0-9]+) \|/.test(l) && entries.some((e) => cite(l, e))).map((l) => l.split('|')[1].trim()))].sort();
const corrGen = ((gen.match(/^- \*\*Corrections retenues sur ces ENTRY\*\*[^:]*: (.*)\.$/m) ?? [])[1] ?? '').split(', ').filter(Boolean).sort();
ctl(JSON.stringify(corr) === JSON.stringify(corrGen) && JSON.stringify(corr) === JSON.stringify(['V2-17', 'V2-34', 'V2-38', 'V2-56', 'V2-67', 'V2-68']) && corr.every((c) => c.startsWith('V2-')), 'corrections retenues sur les ENTRY de T7 : six V2-n (provenance des nuances), égales au générateur ; aucune V1-n ni modification du volet 2', 'recalcul ' + corr.join(', ') + ' ; générateur ' + corrGen.join(', '));

// 9. Provenance (lot 2) et corrections : colonnes du découpage
const ATT = { v_20_s1: 'ENTRY : écart / V2-34 (`v_20`)', v_31_s2: 'ENTRY : écart / V2-38 (`v_31`)', v_656_s1: 'ENTRY : écart / V2-56 (`v_656`)', v_427_s1: 'ENTRY : écart / V2-67 (`v_427_s2`), V2-68 (`v_427`)', v_269_s1: '— / V2-17 (`v_269`)', v_192_s1: 'ENTRY : assumé / —', v_359_s1: 'ENTRY : sourcé / —', v_429_s1: 'ENTRY : sourcé / —' };
const prov = new Map([...decoupage.matchAll(new RegExp('^\\| [0-9]+ \\| D[14] \\| `(' + ID + ')` \\|.*\\| ([^|]+) \\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim() + ' / ' + m[3].trim()]));
const provEc = ids.filter((id) => prov.get(id) !== (ATT[id] ?? '— / —'));
ctl(prov.size === N && !provEc.length, 'provenance et corrections du découpage (huit lignes renseignées, seize « — »)', provEc.map((id) => id + ' ' + prov.get(id)).join(' ; ') || N + ' lignes conformes');

// 10. Relations publiées touchant T7 : aucune
const rel = pub.flatMap((e) => e.senses.flatMap((s) => (s.relations ?? []).map((r) => ({ de: s.id, type: r.type, vers: r.target })))).filter((r) => ids.includes(r.de) || ids.includes(r.vers));
ctl(!rel.length, 'relations publiées touchant T7', rel.length ? rel.map((r) => r.de + ' ' + r.type + ' ' + r.vers).join(', ') : 'aucune');

// 11. Autres sens des mêmes ENTRY, hors de T7 : leur situation (arbitrés ou hors des 377), aucun restant
const autres = pub.filter((e) => entries.includes(e.id)).flatMap((e) => e.senses.filter((s) => !ids.includes(s.id)).map((s) => ({ w: e.word, id: s.id, o: livDe.has(s.id) ? livDe.get(s.id) + (arbitres.has(s.id) ? ' arbitré' : ' restant') : 'hors des 377' })));
ctl(autres.length === 7 && !autres.some((x) => / restant$/.test(x.o)), 'autres sens des mêmes ENTRY : aucun restant', autres.map((x) => x.w + ' `' + x.id + '` ' + x.o).join(', '));

// 12. Frontières : aucun sens de T7 dans T8, T9 ou F ; T8 = D5, D8 ; T9 = E1, E2, E3 ; F = F1, F2, suspendue
const tr = (id) => reg.find((t) => t.id === id);
ctl(tr('T8')?.livraisons.join() === 'D5,D8' && tr('T9')?.livraisons.join() === 'E1,E2,E3' && tr('F')?.livraisons.join() === 'F1,F2' && tr('F')?.statut === 'suspendue' && !ids.some((id) => ['D5', 'D8', 'E1', 'E2', 'E3', 'F1', 'F2'].includes(livDe.get(id))), 'frontières : T8 (D5, D8), T9 (E1, E2, E3), F (F1, F2, suspendue), disjointes de T7', 'restants : T8 ' + (parTr.T8 ?? 0) + ', T9 ' + (parTr.T9 ?? 0) + ', F ' + (parTr.F ?? 0));

// 13. Comparables du lot 1 : étiquette du générateur conforme au verdict arbitré
const lot1 = new Map([...txt('docs/rapports/etape2-A2-05-coherence-retroactive.md').matchAll(new RegExp('^#### `(' + ID + ')` · [^\\n]* — \\*\\*([^*]+)\\*\\*$', 'gm'))].map((m) => [m[1], m[2]]));
const comp = new Map([...gen.matchAll(new RegExp('^\\| `(' + ID + ')` \\|.*\\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim()]));
const vus = [...lot1.keys()].filter((x) => comp.has(x));
ctl(lot1.size === 19 && vus.every((id) => comp.get(id).endsWith('volet 1, lot 1 (' + lot1.get(id) + ', arbitré)')), 'sens du lot 1 ; étiquettes des comparables conformes', lot1.size + ' lus ; parmi les comparables : ' + (vus.join(', ') || 'aucun'));

// 14. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée, elle-même égale à la proposition relue
// (empreinte fixée) ; la version acceptée garde son empreinte, indépendamment du manifeste. Un fichier absent se lit vide : écart, sans exception
const octets = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const PROP7 = 'a2-05-travail/arbitrage-T7/proposition-T7-perimetre.md', PER7 = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md';
const PL = (existsSync(join(root, PROP7)) ? txt(PROP7) : '').split('\n'), G = gen.split('\n');
const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T7'); const sans0 = a0 > 0 && b0 > a0 ? [...G.slice(0, a0), ...G.slice(b0)] : G;
const st = PL.findIndex((l) => l.startsWith('**Statut** : '));
ctl(octets(PROP7) === '046c68e4c9822ec3c84db47167f7e31d3ec84ae18b5b7f216029e309206bdd45' && /^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/.test(PL[st] ?? '') && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-29 \(§0\)\.\*\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', 'proposition ' + octets(PROP7).slice(0, 12) + '… ; §0 : ' + (a0 > 0 ? b0 - a0 : 0) + ' lignes ; ' + (G[st] ?? '').slice(0, 50).replace(/\*/g, ''));
ctl(octets(PER7) === 'a93a75cc4da86efeeea667aa357dcd457ac7583311d7fad6ce3a0a68f4cf77dc', 'périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', octets(PER7).slice(0, 12) + '…');

// 15. Manifeste : au moins 40 entrées, toutes identiques (SHA-256 des octets, sans le module v2) ; les 39 premières, celles d'avant T7, dans leur
// ordre (liste fixée par son empreinte) ; périmètre accepté de T7 en 40e. Les entrées suivantes relèvent des contrôles de leurs propres tranches.
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const cles = Object.keys(man);
const diffE = Object.entries(man).filter(([p, h]) => octets(p) !== h).map(([p]) => p);
const k39 = sha(cles.slice(0, 39).join('\n')); const pos7 = cles.indexOf(PER7);
ctl(cles.length >= 40 && !diffE.length && k39 === '4b46ca6736e6ba5256098a0bf6aba5d690f221ea631715f2931aa42b69eacf1f' && pos7 === 39, 'manifeste : au moins 40 empreintes recalculées, toutes identiques ; les 39 premières entrées dans leur ordre ; périmètre accepté de T7 protégé (40e entrée)', cles.length + ' entrées ; 39 premières ' + k39.slice(0, 12) + '… ; périmètre de T7 : ' + (pos7 === -1 ? 'hors du manifeste' : (pos7 + 1) + 'e entrée') + ' ; différentes : ' + (diffE.join(', ') || 'aucune'));
console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');
process.exit(ecarts ? 1 : 0);
