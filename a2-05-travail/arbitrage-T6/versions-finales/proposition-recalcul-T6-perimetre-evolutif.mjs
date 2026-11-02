// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T6 (D6, D7), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, l'état publié, le journal, le lot 23, le bilan du volet 2 (corrections), les
// rapports de livraison et de tranche, le rapport du lot 1, le registre des tranches, le manifeste d'empreintes et le périmètre généré, et
// compare. Ajouts par rapport au recalcul de T5 : inventaire des 103 sens restants ; ENTRY de T6 = lot 23 entier ; répartition des
// fonctions d'A9 ; catégories et types nuls ; relations publiées internes ; provenance (lot 2) ; modification n°1 du volet 2.
// Adaptation au périmètre accepté (§0, proposition sauvegardée, empreinte de la version acceptée) et à sa protection (38e entrée du manifeste) :
// préparée le 2026-10-27, appliquée
// seulement sur autorisation distincte. Code 1 au premier écart. Ne juge aucun sens.
// Usage : node a2-05-travail/recalcul-T6-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les sens restants, sens par sens)
// PROPOSITION (2026-10-29), non appliquée : état d'après l'arbitrage de T6 (rapport arbitré, §0), avant tout ajout de son rapport au manifeste
// (38 entrées ; le rapport arbitré de T6 reste hors du manifeste et garde l'empreinte de sa proposition sauvegardée, hors du statut et du §0).
// Version évolutive (décision du 2026-10-29), non appliquée : comptes globaux non figés ; les 296 sens arbitrés après T6 et le contenu des
// documents protégés à cette date (38 premières entrées du manifeste et rapport arbitré de T6) fixés par deux empreintes, recalculées ici sans
// lire les empreintes du manifeste ; au moins 38 entrées, périmètre de T6 en 38e, rapport arbitré de T6 absent ou en 39e.
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

// 2. Les 22 sens sont examinés dans le seul rapport de T6, arbitré, et dans aucun autre rapport de livraison ou de tranche (hors périmètres)
const rapports = readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)[0-9]+\.md$/.test(f));
const RT6 = 'etape2-A2-05-volet1-lot3-T6.md';
const ouExamine = (id) => rapports.filter((f) => txt('docs/rapports/' + f).includes('#### `' + id + '` '));
const ailleurs = ids.filter((id) => JSON.stringify(ouExamine(id)) !== JSON.stringify([RT6]));
ctl(!ailleurs.length && rapports.includes(RT6) && /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + RT6)), 'les 22 sens examinés dans le seul rapport de T6, arbitré (' + rapports.length + ' rapports de livraison et de tranche lus)', ailleurs.map((id) => id + ' : ' + (ouExamine(id).join(', ') || 'aucun rapport')).join(' ; ') || '22 sens, un seul rapport, arbitré');

// 3. Inventaire des restants : liste globale moins les sens examinés dans les rapports arbitrés ; égal au registre des tranches ; sans compte
// global figé (chaque sens arbitré appartient à la liste globale)
const arbitre = (f) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + f));
const arbitres = new Set(rapports.filter(arbitre).flatMap((f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1])));
const restants = liste.filter((l) => !arbitres.has(l.id));
const reg = json('a2-05-travail/registre-tranches.json').tranches; const trancheDe = new Map(reg.flatMap((t) => t.livraisons.map((l) => [l, t.id])));
const parLiv = {}; for (const r of restants) parLiv[r.liv] = (parLiv[r.liv] ?? 0) + 1;
const parTr = {}; for (const r of restants) { const t = trancheDe.get(r.liv) ?? '(hors registre)'; parTr[t] = (parTr[t] ?? 0) + 1; }
const horsListe = [...arbitres].filter((id) => !liste.some((l) => l.id === id));
ctl(!horsListe.length && !parTr['(hors registre)'], 'inventaire des restants (liste globale moins les sens des rapports arbitrés)', arbitres.size + ' arbitrés, ' + restants.length + ' restants ; hors de la liste globale : ' + (horsListe.join(', ') || 'aucun') + ' ; par livraison : ' + Object.entries(parLiv).map(([k, v]) => k + ' ' + v).join(', '));
// Protection historique, indépendante des empreintes du manifeste : (a) les sens examinés dans les rapports arbitrés des 37 premières entrées et
// dans le rapport arbitré de T6 sont 296, toujours arbitrés, leur ensemble trié fixé par son empreinte (aucun retrait, aucune substitution) ;
// (b) les octets des 39 documents protégés après T6 (38 premières entrées, dans l'ordre du manifeste, dont le périmètre de T6, puis le rapport
// de T6), relus ici, ont une empreinte fixée : une modification est détectée même si le manifeste est recalculé ; un fichier absent est un
// écart, non une exception
const cles0 = Object.keys(json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes);
const H38 = [...cles0.slice(0, 37), 'docs/rapports/' + RT6], H39 = [...cles0.slice(0, 38), 'docs/rapports/' + RT6];
const hRap = H38.map((p) => p.replace(/^docs\/rapports\//, '')).filter((f) => rapports.includes(f) && arbitre(f));
const hist = [...new Set(hRap.flatMap((f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1])))].sort();
const shaH = createHash('sha256').update(hist.join('\n')).digest('hex');
ctl(hRap.length === 22 && hRap.at(-1) === RT6 && hist.length === 296 && hist.every((id) => arbitres.has(id)) && shaH === '7c5254d7d18a2793142045107da7ffeddd0eb1ad8531f829037c88e258b5e7e4', 'les 296 sens arbitrés après T6 restent arbitrés (rapports arbitrés des 37 premières entrées du manifeste et rapport de T6)', hRap.length + ' rapports, ' + hist.length + ' sens, ' + shaH.slice(0, 12) + '…');
const octets = (p) => (existsSync(join(root, p)) ? createHash('sha256').update(readFileSync(join(root, p))).digest('hex') : 'absent');
// Documents de T6 (périmètre accepté, rapport arbitré, leurs propositions sauvegardées) : un fichier absent se lit vide, et les contrôles qui en
// dépendent sont en écart, sans exception
const txtSi = (p) => (existsSync(join(root, p)) ? txt(p) : '');
const shaC = createHash('sha256').update(H39.map((p) => p + ' ' + octets(p)).join('\n')).digest('hex');
ctl(shaC === '65495b5d3bb56866b41e1a5c83ffeca741623dd97da8befbc92fffd2e05594c2', 'contenu des 39 documents protégés après T6 inchangé (38 premières entrées du manifeste et rapport de T6 ; empreinte fixée, recalculée sans le manifeste)', shaC.slice(0, 12) + '… ; absents : ' + (H39.filter((p) => octets(p) === 'absent').join(', ') || 'aucun'));
ctl(!parTr.T6 && ids.every((id) => arbitres.has(id)) && reg.find((t) => t.id === 'T6')?.statut === 'planifiée', 'restants par tranche du registre ; T6 (D6, D7) entièrement arbitrée, statut du registre non modifié', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));
if (process.argv.includes('--inventaire')) for (const l of [...new Set(restants.map((r) => r.liv))]) console.log('   ' + l + ' (' + (trancheDe.get(l) ?? '?') + ') : ' + restants.filter((r) => r.liv === l).map((r) => r.mot + ' `' + r.id + '`').join(', '));

// 4. Périmètre généré : §2 identique au découpage ; catégorie, type et fonctions égaux à l'état publié
const gen = txtSi('docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md');
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
ctl(JSON.stringify(horsT6('politesse').map((x) => x.id + ' ' + x.o.replace(/ arbitré$/, ''))) === JSON.stringify(['v_471_s2 D8']) && horsT6('intensifieur').every((x) => ['D8', 'E2'].includes(x.o.replace(/ arbitré$/, ''))), '`politesse` et `intensifieur` hors de T6 : en D8 (T8) et E2 (T9), restants ou arbitrés', A9.map((F) => F + ' ' + rep[F].length + ' (T6 ' + (rep[F].length - horsT6(F).length) + (horsT6(F).length ? ' ; hors T6 : ' + horsT6(F).map((x) => x.w + ' `' + x.id + '` ' + x.o).join(', ') : '') + ')').join(' ; '));

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
const PROP = txtSi('a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md'), PL = PROP.split('\n'), G = gen.split('\n');
const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T6'); const sans0 = [...G.slice(0, a0), ...G.slice(b0)];
const st = PL.findIndex((l) => l.startsWith('**Statut** : '));
const shaProp = octets('a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md');
ctl(shaProp === 'd0d4e113a85bb44e81532c7a951a7e74a27c60ea34deff2dcc53fd284e3a1ec4' && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-27 \(§0\)\.\*\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', 'proposition ' + shaProp.slice(0, 12) + '… ; §0 : ' + (b0 - a0) + ' lignes ; ' + G[st]?.slice(0, 50).replace(/\*/g, ''));

// Le périmètre accepté garde l'empreinte de sa version acceptée, indépendamment du manifeste (une modification du §0 avec un manifeste réaligné est détectée)
const shaGen = octets('docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md');
ctl(shaGen === '614b7503d32408028d853993430049a4faa65dcda5480e679754b3d4b5c11803', 'périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', shaGen.slice(0, 12) + '…');
// 13. Manifeste : au moins 38 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2, toutes identiques ; périmètre accepté
// de T6 protégé (38e entrée) ; rapport arbitré de T6 absent du manifeste (38 entrées) ou 39e entrée. Les entrées suivantes relèvent des
// contrôles de leurs propres tranches.
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const P6 = 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md';
const diffE = Object.entries(man).filter(([p, h]) => !existsSync(join(root, p)) || createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);
const cles = Object.keys(man), pos6 = cles.indexOf('docs/rapports/' + RT6);
ctl(cles.length >= 38 && !diffE.length && cles[37] === P6 && (cles.length === 38 ? pos6 === -1 : pos6 === 38), 'manifeste : au moins 38 empreintes recalculées, toutes identiques ; périmètre accepté de T6 protégé (38e entrée) ; rapport arbitré de T6 absent ou 39e entrée', cles.length + ' entrées ; rapport de T6 : ' + (pos6 === -1 ? 'hors du manifeste' : (pos6 + 1) + 'e entrée') + ' ; différentes : ' + (diffE.join(', ') || 'aucune'));

// 14. Rapport arbitré de T6 (hors du manifeste ou 39e entrée) : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée, elle-même
// identique à la proposition relue (empreinte fixée) ; verdicts et fiches d'examen d'origine conservés (21 conformes, 1 suspendu)
const RP = 'a2-05-travail/arbitrage-T6/proposition-T6.md'; const RPL = txtSi(RP).split('\n'), RG = txtSi('docs/rapports/' + RT6).split('\n');
const r0 = RG.indexOf('## 0. Arbitrage'), r1 = RG.indexOf('## 1. Résultat proposé'); const rSans0 = [...RG.slice(0, r0), ...RG.slice(r1)];
const rst = RPL.findIndex((l) => l.startsWith('**Statut** : '));
const shaRP = octets(RP);
ctl(shaRP === '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224' && /^\*\*Statut\*\* : \*\*arbitré le 2026-10-29\*\* \(§0\)\./.test(RG[rst] ?? '') && r0 > 0 && r1 > r0 && rSans0.length === RPL.length && rSans0.every((l, k) => k === rst || l === RPL[k]), 'rapport arbitré de T6 (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', 'proposition ' + shaRP.slice(0, 12) + '… ; §0 : ' + (r1 - r0) + ' lignes ; ' + RG[rst]?.slice(0, 40).replace(/\*/g, ''));
console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');
process.exit(ecarts ? 1 : 0);
