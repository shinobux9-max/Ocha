// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T6 (D6, D7), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, l'état publié, le journal, le lot 23, le bilan du volet 2 (corrections), les
// rapports de livraison et de tranche, le rapport du lot 1, le registre des tranches, le manifeste d'empreintes et le périmètre généré, et
// compare. Ajouts par rapport au recalcul de T5 : inventaire des 103 sens restants ; ENTRY de T6 = lot 23 entier ; répartition des
// fonctions d'A9 ; catégories et types nuls ; relations publiées internes ; provenance (lot 2) ; modification n°1 du volet 2.
// Adaptation au périmètre accepté (§0, proposition sauvegardée) et à sa protection (38e entrée du manifeste) : préparée le 2026-10-27, appliquée
// seulement sur autorisation distincte. Code 1 au premier écart. Ne juge aucun sens.
// Usage : node a2-05-travail/recalcul-T6-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les 103 restants, sens par sens)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+'; const LIVS = ['D6', 'D7']; const N = 22; const NE = 13;
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// 1. Découpage arbitré : liste du §6 et lignes de synthèse
const decoupage = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
const liste = [...decoupage.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\| ([^|]+) \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3], mot: m[4].trim() }));
const t6 = liste.filter((l) => LIVS.includes(l.liv));
const synth = Object.fromEntries([...decoupage.matchAll(/^\| ([A-F][0-9]+) \| [A-F] \| [^|]+ \| ([0-9]+) \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => [m[1], +m[2]]));
ctl(liste.length === 377 && new Set(liste.map((l) => l.id)).size === 377, 'liste globale', liste.length + ' lignes, ' + new Set(liste.map((l) => l.id)).size + ' distinctes');
ctl(LIVS.every((l) => t6.filter((x) => x.liv === l).length === synth[l]) && t6.length === N, 'D6 et D7 contre la synthèse', LIVS.map((l) => l + ' ' + t6.filter((x) => x.liv === l).length + '/' + synth[l]).join(', ') + ' (lignes ' + t6[0]?.n + ' à ' + t6.at(-1)?.n + ')');
ctl(t6.every((x, k) => x.n === t6[0].n + k), 'lignes contiguës du découpage', t6.map((x) => x.n).join(','));
const ids = t6.map((l) => l.id); const entries = [...new Set(ids.map((id) => id.replace(/_s[0-9]+$/, '')))];
ctl(new Set(ids).size === N && entries.length === NE, 'aucun doublon de sens ; ENTRY distinctes', ids.length + ' sens, ' + entries.length + ' ENTRY');

// 2. Aucun de ces sens n'est déjà examiné dans un rapport de livraison ou de tranche (hors périmètres)
const rapports = readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)[0-9]+\.md$/.test(f));
const examines = new Set(rapports.flatMap((f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1])));
const deja = ids.filter((id) => examines.has(id));
ctl(!deja.length, 'sens non encore examinés (' + rapports.length + ' rapports de livraison et de tranche lus)', deja.join(', ') || 'aucun déjà examiné');

// 3. Inventaire des 103 restants : liste globale moins les sens examinés dans les rapports arbitrés ; égal au registre des tranches
const arbitre = (f) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + f));
const arbitres = new Set(rapports.filter(arbitre).flatMap((f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1])));
const restants = liste.filter((l) => !arbitres.has(l.id));
const reg = json('a2-05-travail/registre-tranches.json').tranches; const trancheDe = new Map(reg.flatMap((t) => t.livraisons.map((l) => [l, t.id])));
const parLiv = {}; for (const r of restants) parLiv[r.liv] = (parLiv[r.liv] ?? 0) + 1;
const parTr = {}; for (const r of restants) { const t = trancheDe.get(r.liv) ?? '(hors registre)'; parTr[t] = (parTr[t] ?? 0) + 1; }
ctl(arbitres.size === 274 && restants.length === 103 && !parTr['(hors registre)'], 'inventaire des restants (liste globale moins les sens des rapports arbitrés)', arbitres.size + ' arbitrés, ' + restants.length + ' restants ; par livraison : ' + Object.entries(parLiv).map(([k, v]) => k + ' ' + v).join(', '));
ctl(parTr.T6 === N && restants.filter((r) => trancheDe.get(r.liv) === 'T6').every((r) => ids.includes(r.id)) && reg.find((t) => t.id === 'T6')?.statut === 'planifiée', 'restants par tranche du registre ; T6 = D6 et D7, planifiée', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));
if (process.argv.includes('--inventaire')) for (const l of [...new Set(restants.map((r) => r.liv))]) console.log('   ' + l + ' (' + (trancheDe.get(l) ?? '?') + ') : ' + restants.filter((r) => r.liv === l).map((r) => r.mot + ' `' + r.id + '`').join(', '));

// 4. Périmètre généré : §2 identique au découpage ; catégorie, type et fonctions égaux à l'état publié
const gen = txt('docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md');
const s2 = gen.slice(gen.indexOf('## 2. '), gen.indexOf('## 3. '));
const lignes = [...s2.matchAll(new RegExp('^\\| [0-9]+ \\| `(' + ID + ')` \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| (D[67]) \\| `([^`]+)` \\| `([^`]+)` \\| ([^|]+) \\|', 'gm'))].map((m) => ({ id: m[1], liv: m[2], cat: m[3], type: m[4], fn: [...m[5].matchAll(/`([^`]+)`/g)].map((x) => x[1]).join() }));
ctl(lignes.length === N && lignes.every((l, k) => l.id === ids[k] && l.liv === t6[k].liv), 'sens du périmètre généré = découpage (ordre et livraison)', lignes.length + ' sens, ' + entries.length + ' ENTRY');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const sens = new Map(pub.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const fn = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const catDe = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const diffCat = lignes.filter((l) => !sens.has(l.id) || catDe(sens.get(l.id).s.category) !== l.cat || String(sens.get(l.id).s.semantic_type) !== l.type || fn(sens.get(l.id).s).join() !== l.fn);
ctl(!diffCat.length, 'catégories, types et fonctions du §2 = état publié (data/)', diffCat.map((l) => l.id).join(', ') || N + ' sens identiques');

// 5. Thème : les ENTRY de T6 sont exactement celles du lot 23, et leurs sens publiés exactement les 22
const lot23 = Object.keys(json('reconstruction/a2-04/lots/lot-23.json').entries).map((s) => s.replace(/^n5_/, '')).sort();
const sensDesEntry = pub.filter((e) => entries.includes(e.id)).flatMap((e) => e.senses.map((s) => s.id));
ctl(JSON.stringify(lot23) === JSON.stringify([...entries].sort()) && sensDesEntry.length === N && sensDesEntry.every((id) => ids.includes(id)), 'ENTRY de T6 = lot 23 entier ; leurs sens publiés = les 22', lot23.length + ' ENTRY au lot 23 ; ' + sensDesEntry.length + ' sens publiés sur ces ENTRY');

// 6. Fonctions d'A9 : chaque sens de T6 en porte une ; répartition dans tout le lexique publié, par livraison
const A9 = ['connecteur', 'discours', 'politesse', 'intensifieur', 'quantificateur', 'comparatif'];
const livDe = new Map(liste.map((l) => [l.id, l.liv]));
const ou = (id) => (ids.includes(id) ? 'T6' : livDe.has(id) ? livDe.get(id) + (arbitres.has(id) ? ' arbitré' : '') : 'hors des 377');
ctl(ids.every((id) => fn(sens.get(id).s).some((f) => A9.includes(f))), 'chaque sens de T6 porte une fonction d\'A9', ids.map((id) => sens.get(id).e.word + ' ' + fn(sens.get(id).s).join('+')).join(', '));
const rep = {}; for (const F of A9) rep[F] = [...sens.values()].filter(({ s }) => fn(s).includes(F)).map(({ e, s }) => ({ w: e.word, id: s.id, o: ou(s.id) }));
const horsT6 = (F) => rep[F].filter((x) => x.o !== 'T6');
ctl(!horsT6('connecteur').length && !horsT6('discours').length && rep.connecteur.length === 8 && rep.discours.length === 10, 'tous les sens publiés `connecteur` et `discours` sont dans T6', 'connecteur ' + rep.connecteur.length + ', discours ' + rep.discours.length);
ctl(JSON.stringify(horsT6('politesse').map((x) => x.id + ' ' + x.o)) === JSON.stringify(['v_471_s2 D8']) && horsT6('intensifieur').every((x) => ['D8', 'E2'].includes(x.o)), '`politesse` et `intensifieur` hors de T6 : restants en D8 (T8) et E2 (T9)', A9.map((F) => F + ' ' + rep[F].length + ' (T6 ' + (rep[F].length - horsT6(F).length) + (horsT6(F).length ? ' ; hors T6 : ' + horsT6(F).map((x) => x.w + ' `' + x.id + '` ' + x.o).join(', ') : '') + ')').join(' ; '));

// 7. Catégories et types nuls ; une décision type-nul par sens ; décisions de journal par ENTRY, lues directement
const journal = json('reconstruction/a2-04/journal.json');
ctl(ids.every((id) => sens.get(id).s.category === null && sens.get(id).s.semantic_type === null), '`category: null` et `semantic_type: null` sur les 22 sens', ids.filter((id) => sens.get(id).s.category !== null || sens.get(id).s.semantic_type !== null).join(', ') || '22 sur 22');
const tn = journal.filter((d) => d.kind === 'type-nul' && entries.some((e) => d.entry === 'n5_' + e));
const tnSens = tn.map((d) => d.entry.replace(/^n5_/, '') + '_s' + (d.field.match(/^sens ([0-9]+) · semantic_type$/) ?? [])[1]).sort();
ctl(tn.length === N && JSON.stringify(tnSens) === JSON.stringify([...ids].sort()) && tn.every((d) => d.status === 'validated'), 'une décision type-nul validée par sens', tn.length + ' décisions type-nul ; ' + (tn.length === N ? 'une par sens' : 'répartition différente'));
const s5 = gen.slice(gen.indexOf('## 5. '), gen.indexOf('## 6. '));
const decGen = new Map([...s5.matchAll(/^\| `(v_[0-9]+)` \| [^|]+ \| `([^`]+)` \| (.*) \|$/gm)].map((m) => [m[1], { src: m[2], d: [...m[3].matchAll(/D[0-9]{4}/g)].map((x) => x[0]) }]));
const ecD = entries.filter((e) => { const s = 'n5_' + e; const d = journal.filter((x) => x.entry === s).map((x) => x.id.replace('A2-04-', '')); const g = decGen.get(e); return !g || g.src !== s || d.join() !== g.d.join() || journal.some((x) => x.entry === s && x.status !== 'validated'); });
const dT6 = journal.filter((x) => entries.some((e) => x.entry === 'n5_' + e)); const nat = {}; for (const d of dT6) nat[d.kind] = (nat[d.kind] ?? 0) + 1;
ctl(!ecD.length && dT6.length === 90, 'décisions de journal par ENTRY = §5 du générateur (toutes validées)', ecD.join(', ') || dT6.length + ' décisions (' + Object.entries(nat).map(([k, v]) => k + ' ' + v).join(', ') + ') ; lots ' + [...new Set(dT6.map((d) => d.lot))].join(', ') + ' ; aucune de nature categorie-nulle : ' + !nat['categorie-nulle']);

// 8. Corrections : toute ligne de tableau du bilan (hors §7) citant une ENTRY de T6 ou l'un de ses sens, identifiant exact ; modification n°1
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md').replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
const cite = (l, e) => new RegExp('`(?:n5_)?' + e + '(?:_s[0-9]+)?`').test(l);
const corr = bilan.split('\n').filter((l) => /^\| (V[12]-[0-9]+|[0-9]+) \|/.test(l) && entries.some((e) => cite(l, e))).map((l) => l.split('|')[1].trim());
const corrGen = ((gen.match(/^- \*\*Corrections retenues sur ces ENTRY\*\*[^:]*: (.*)\.$/m) ?? [])[1] ?? '').split(', ').filter(Boolean);
ctl(!corr.length && !corrGen.length, 'aucune correction retenue (V1-n, V2-n, modifications du volet 2) sur les ENTRY de T6', 'recalcul ' + (corr.join(', ') || 'aucune') + ' ; générateur ' + (corrGen.join(', ') || 'aucune'));
const m1 = bilan.split('\n').filter((l) => /^\| 1 \| `v_500_s2` \| また/.test(l));
ctl(m1.length === 1 && m1[0].includes('`["connecteur"]`'), 'modification n°1 du volet 2 (また sens 2, `connecteur`, retenue, non appliquée)', m1.length + ' ligne ; état publié de また sens 2 : ' + (fn(sens.get('v_500_s2').s).join(', ') || 'aucune fonction'));

// 9. Provenance (lot 2) : colonne du découpage ; seule l'ENTRY それでは a une nuance examinée (sourcée)
const prov = new Map([...decoupage.matchAll(new RegExp('^\\| [0-9]+ \\| D[67] \\| `(' + ID + ')` \\|.*\\| ([^|]+) \\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim() + ' / ' + m[3].trim()]));
const provAutres = ids.filter((id) => prov.get(id) !== (id.startsWith('v_417_') ? 'ENTRY : sourcé / —' : '— / —'));
ctl(prov.size === N && !provAutres.length, 'provenance et corrections du découpage : それでは « ENTRY : sourcé », les autres « — »', provAutres.map((id) => id + ' ' + prov.get(id)).join(' ; ') || N + ' lignes conformes');

// 10. Relations publiées touchant T6 : toutes internes à T6 ; sens sans lien
const rel = pub.flatMap((e) => e.senses.flatMap((s) => (s.relations ?? []).map((r) => ({ de: s.id, type: r.type, vers: r.target })))).filter((r) => ids.includes(r.de) || ids.includes(r.vers));
const sansLien = ids.filter((id) => !rel.some((r) => r.de === id || r.vers === id));
ctl(rel.length === 10 && rel.every((r) => ids.includes(r.de) && ids.includes(r.vers)), 'relations publiées touchant T6 : toutes internes', rel.length + ' relations (' + rel.map((r) => r.de + ' ' + r.type + ' ' + r.vers).join(', ') + ') ; sans lien : ' + sansLien.join(', '));

// 11. Comparables du lot 1 : étiquette du générateur conforme au verdict arbitré
const lot1 = new Map([...txt('docs/rapports/etape2-A2-05-coherence-retroactive.md').matchAll(new RegExp('^#### `(' + ID + ')` · [^\\n]* — \\*\\*([^*]+)\\*\\*$', 'gm'))].map((m) => [m[1], m[2]]));
const comp = new Map([...gen.matchAll(new RegExp('^\\| `(' + ID + ')` \\|.*\\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim()]));
const vus = [...lot1.keys()].filter((x) => comp.has(x));
ctl(lot1.size === 19 && vus.every((id) => comp.get(id).endsWith('volet 1, lot 1 (' + lot1.get(id) + ', arbitré)')), 'sens du lot 1 ; étiquettes des comparables conformes', lot1.size + ' lus ; parmi les comparables : ' + (vus.join(', ') || 'aucun'));

// 12. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée (elle-même égale à la proposition relue)
const PROP = txt('a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md'), PL = PROP.split('\n'), G = gen.split('\n');
const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T6'); const sans0 = [...G.slice(0, a0), ...G.slice(b0)];
const st = PL.findIndex((l) => l.startsWith('**Statut** : '));
const shaProp = createHash('sha256').update(readFileSync(join(root, 'a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md'))).digest('hex');
ctl(shaProp === 'd0d4e113a85bb44e81532c7a951a7e74a27c60ea34deff2dcc53fd284e3a1ec4' && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-27 \(§0\)\.\*\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', 'proposition ' + shaProp.slice(0, 12) + '… ; §0 : ' + (b0 - a0) + ' lignes ; ' + G[st]?.slice(0, 50).replace(/\*/g, ''));

// 13. Manifeste : 38 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2 ; périmètre accepté de T6 protégé (38e entrée)
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const P6 = 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md';
const diffE = Object.entries(man).filter(([p, h]) => !existsSync(join(root, p)) || createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);
ctl(Object.keys(man).length === 38 && !diffE.length && Object.keys(man)[37] === P6, 'manifeste : 38 empreintes recalculées, identiques ; périmètre accepté de T6 protégé (38e entrée)', Object.keys(man).length + ' entrées ; différentes : ' + (diffE.join(', ') || 'aucune'));
console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');
process.exit(ecarts ? 1 : 0);
