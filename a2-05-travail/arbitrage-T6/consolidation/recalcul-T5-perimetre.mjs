// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T5 (D2, D3), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, l'état publié, le journal, le bilan du volet 2 (corrections), les rapports de
// livraison et de tranche, le rapport du lot 1, le registre des tranches, le manifeste d'empreintes et le périmètre généré, et compare.
// Ajouts par rapport au recalcul de T4 : inventaire des 125 sens restants (par livraison et par tranche du registre) ; deixis de personne et
// d'espace restante entièrement dans T5. Code 1 au premier écart. Ne juge aucun sens.
// Usage : node a2-05-travail/recalcul-T5-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les 125 restants, sens par sens)
// Historique : état d'après l'arbitrage de T5 (rapport arbitré, §0) et l'ajout de son rapport au manifeste (37e entrée), appliqué le 2026-10-27 ;
// manifeste contrôlé sans en fixer la longueur au-delà de T5 (au moins 37 entrées ; 36e et 37e inchangées ; toutes identiques), préparé le
// 2026-10-27, appliqué seulement sur autorisation distincte. Les entrées suivantes relèvent des contrôles de leurs propres tranches.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+'; const LIVS = ['D2', 'D3']; const N = 22; const NE = 18;
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// 1. Découpage arbitré : liste du §6 et lignes de synthèse
const decoupage = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
const liste = [...decoupage.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\| ([^|]+) \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3], mot: m[4].trim() }));
const t5 = liste.filter((l) => LIVS.includes(l.liv));
const synth = Object.fromEntries([...decoupage.matchAll(/^\| ([A-F][0-9]+) \| [A-F] \| [^|]+ \| ([0-9]+) \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => [m[1], +m[2]]));
ctl(liste.length === 377 && new Set(liste.map((l) => l.id)).size === 377, 'liste globale', liste.length + ' lignes, ' + new Set(liste.map((l) => l.id)).size + ' distinctes');
ctl(LIVS.every((l) => t5.filter((x) => x.liv === l).length === synth[l]) && t5.length === N, 'D2 et D3 contre la synthèse', LIVS.map((l) => l + ' ' + t5.filter((x) => x.liv === l).length + '/' + synth[l]).join(', ') + ' (lignes ' + t5[0]?.n + ' à ' + t5.at(-1)?.n + ')');
ctl(t5.every((x, k) => x.n === t5[0].n + k), 'lignes contiguës du découpage', t5.map((x) => x.n).join(','));
const ids = t5.map((l) => l.id); const entries = [...new Set(ids.map((id) => id.replace(/_s[0-9]+$/, '')))];
ctl(new Set(ids).size === N && entries.length === NE, 'aucun doublon de sens ; ENTRY distinctes', ids.length + ' sens, ' + entries.length + ' ENTRY');

// 2. Les 22 sens sont examinés dans le seul rapport de T5, arbitré, et dans aucun autre rapport de livraison ou de tranche (hors périmètres)
const rapports = readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)[0-9]+\.md$/.test(f));
const RT5 = 'etape2-A2-05-volet1-lot3-T5.md';
const ouExamine = (id) => rapports.filter((f) => txt('docs/rapports/' + f).includes('#### `' + id + '` '));
const ailleurs = ids.filter((id) => JSON.stringify(ouExamine(id)) !== JSON.stringify([RT5]));
ctl(!ailleurs.length && rapports.includes(RT5) && /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + RT5)), 'les 22 sens examinés dans le seul rapport de T5, arbitré (' + rapports.length + ' rapports de livraison et de tranche lus)', ailleurs.map((id) => id + ' : ' + (ouExamine(id).join(', ') || 'aucun rapport')).join(' ; ') || '22 sens, un seul rapport, arbitré');

// 3. Inventaire des 125 restants : liste globale moins les sens examinés dans les rapports arbitrés ; égal au registre des tranches
const arbitre = (f) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + f));
const arbitres = new Set(rapports.filter(arbitre).flatMap((f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1])));
const restants = liste.filter((l) => !arbitres.has(l.id));
const reg = json('a2-05-travail/registre-tranches.json').tranches; const trancheDe = new Map(reg.flatMap((t) => t.livraisons.map((l) => [l, t.id])));
const parLiv = {}; for (const r of restants) parLiv[r.liv] = (parLiv[r.liv] ?? 0) + 1;
const parTr = {}; for (const r of restants) { const t = trancheDe.get(r.liv) ?? '(hors registre)'; parTr[t] = (parTr[t] ?? 0) + 1; }
ctl(arbitres.size === 274 && restants.length === 103 && !parTr['(hors registre)'], 'inventaire des restants (liste globale moins les sens des rapports arbitrés)', arbitres.size + ' arbitrés, ' + restants.length + ' restants ; par livraison : ' + Object.entries(parLiv).map(([k, v]) => k + ' ' + v).join(', '));
ctl(!parTr.T5 && ids.every((id) => arbitres.has(id)) && reg.find((t) => t.id === 'T5')?.statut === 'planifiée', 'restants par tranche du registre ; T5 (D2, D3) entièrement arbitrée, statut du registre non modifié', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));
if (process.argv.includes('--inventaire')) for (const l of [...new Set(restants.map((r) => r.liv))]) console.log('   ' + l + ' (' + (trancheDe.get(l) ?? '?') + ') : ' + restants.filter((r) => r.liv === l).map((r) => r.mot + ' `' + r.id + '`').join(', '));

// 4. Périmètre généré : §2 identique au découpage ; catégorie et type égaux à l'état publié
const gen = txt('docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md');
const s2 = gen.slice(gen.indexOf('## 2. '), gen.indexOf('## 3. '));
const lignes = [...s2.matchAll(new RegExp('^\\| [0-9]+ \\| `(' + ID + ')` \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| (D[23]) \\| `([^`]+)` \\| `([^`]+)` \\|', 'gm'))].map((m) => ({ id: m[1], liv: m[2], cat: m[3], type: m[4] }));
ctl(lignes.length === N && lignes.every((l, k) => l.id === ids[k] && l.liv === t5[k].liv), 'sens du périmètre généré = découpage (ordre et livraison)', lignes.length + ' sens, ' + entries.length + ' ENTRY');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const sens = new Map(pub.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const catDe = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const diffCat = lignes.filter((l) => !sens.has(l.id) || catDe(sens.get(l.id).s.category) !== l.cat || String(sens.get(l.id).s.semantic_type) !== l.type);
ctl(!diffCat.length, 'catégories et types du §2 = état publié (data/)', diffCat.map((l) => l.id).join(', ') || N + ' sens identiques');

// 5. Deixis : sens publiés portant `deictique`, par état ; ceux de personne et d'espace encore restants sont exactement T5
const fn = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const deict = [...sens.values()].filter(({ s }) => fn(s).includes('deictique'));
const livDe = new Map(liste.map((l) => [l.id, l.liv]));
const restD = deict.filter(({ s }) => livDe.has(s.id) && !arbitres.has(s.id));
const horsT5 = restD.filter(({ s }) => !ids.includes(s.id));
ctl(ids.every((id) => fn(sens.get(id).s).includes('deictique')) && horsT5.every(({ s }) => livDe.get(s.id) === 'D4'), 'deixis : les 22 sens de T5 portent `deictique` ; les autres sens `deictique` restants sont temporels, en D4', deict.length + ' sens publiés ; restants : ' + restD.length + ' (T5 ' + (restD.length - horsT5.length) + ' ; hors T5 : ' + horsT5.map(({ e, s }) => e.word + ' `' + s.id + '` ' + livDe.get(s.id)).join(', ') + ')');

// 6. Décisions de journal par ENTRY, lues directement
const journal = json('reconstruction/a2-04/journal.json');
const s5 = gen.slice(gen.indexOf('## 5. '), gen.indexOf('## 6. '));
const decGen = new Map([...s5.matchAll(/^\| `(v_[0-9]+)` \| [^|]+ \| `([^`]+)` \| (.*) \|$/gm)].map((m) => [m[1], { src: m[2], d: [...m[3].matchAll(/D[0-9]{4}/g)].map((x) => x[0]) }]));
const ecD = entries.filter((e) => { const s = 'n5_' + e; const d = journal.filter((x) => x.entry === s).map((x) => x.id.replace('A2-04-', '')); const g = decGen.get(e); return !g || g.src !== s || d.join() !== g.d.join() || journal.some((x) => x.entry === s && x.status !== 'validated'); });
const nDec = entries.reduce((n, e) => n + journal.filter((x) => x.entry === 'n5_' + e).length, 0);
const nTN = entries.reduce((n, e) => n + journal.filter((x) => x.entry === 'n5_' + e && x.kind === 'type-nul').length, 0);
ctl(!ecD.length, 'décisions de journal par ENTRY = §5 du générateur (toutes validées)', ecD.join(', ') || nDec + ' décisions, dont ' + nTN + ' de nature type-nul');
ctl(nTN === ids.filter((id) => sens.get(id).s.semantic_type === null).length, 'chaque type nul de T5 porte une décision type-nul', nTN + ' décisions type-nul ; ' + ids.filter((id) => sens.get(id).s.semantic_type === null).length + ' types nuls');

// 7. Corrections : toute ligne de tableau du bilan (hors §7) citant une ENTRY de T5 ou l'un de ses sens, identifiant exact
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md').replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
const cite = (l, e) => new RegExp('`(?:n5_)?' + e + '(?:_s[0-9]+)?`').test(l);
const corr = bilan.split('\n').filter((l) => /^\| (V[12]-[0-9]+|[0-9]+) \|/.test(l) && entries.some((e) => cite(l, e))).map((l) => l.split('|')[1].trim());
const corrGen = ((gen.match(/^- \*\*Corrections retenues sur ces ENTRY\*\*[^:]*: (.*)\.$/m) ?? [])[1] ?? '').split(', ').filter(Boolean);
ctl(corr.length === corrGen.length && corr.every((c) => corrGen.includes(c)), 'corrections retenues (V1-n, V2-n, modifications du volet 2)', 'recalcul ' + corr.join(', ') + ' ; générateur ' + corrGen.join(', '));
console.log('constat  corrections V1-n ou modifications du volet 2 sur les ENTRY de T5 : ' + (corr.filter((c) => /^V1-|^[0-9]+$/.test(c)).join(', ') || 'aucune'));

// 8. Comparables du lot 1 : étiquette du générateur conforme au verdict arbitré
const lot1 = new Map([...txt('docs/rapports/etape2-A2-05-coherence-retroactive.md').matchAll(new RegExp('^#### `(' + ID + ')` · [^\\n]* — \\*\\*([^*]+)\\*\\*$', 'gm'))].map((m) => [m[1], m[2]]));
const comp = new Map([...gen.matchAll(new RegExp('^\\| `(' + ID + ')` \\|.*\\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim()]));
const vus = [...lot1.keys()].filter((x) => comp.has(x));
ctl(lot1.size === 19 && vus.every((id) => comp.get(id).endsWith('volet 1, lot 1 (' + lot1.get(id) + ', arbitré)')), 'sens du lot 1 ; étiquettes des comparables conformes', lot1.size + ' lus ; parmi les comparables : ' + (vus.join(', ') || 'aucun'));

// 9. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée
const PROP = txt('a2-05-travail/arbitrage-T5/proposition-T5-perimetre.md').split('\n'), G = gen.split('\n');
const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T5'); const sans0 = [...G.slice(0, a0), ...G.slice(b0)];
const st = PROP.findIndex((l) => l.startsWith('**Statut** : '));
ctl(/^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-25 \(§0\)\.\*\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PROP.length && sans0.every((l, k) => k === st || l === PROP[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', '§0 : ' + (b0 - a0) + ' lignes ; ' + G[st]?.slice(0, 50).replace(/\*/g, ''));

// 10. Manifeste : au moins 37 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2, toutes identiques ; périmètre de T5 (36e)
// et rapport de T5 (37e) protégés, à leur place
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const P5 = 'docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md';
// Une entrée dont le fichier n'existe pas compte comme une empreinte différente (écart rendu, non arrêt par exception)
const diffE = Object.entries(man).filter(([p, h]) => !existsSync(join(root, p)) || createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);
ctl(Object.keys(man).length >= 37 && !diffE.length && Object.keys(man)[35] === P5 && Object.keys(man)[36] === 'docs/rapports/' + RT5, 'manifeste : au moins 37 empreintes recalculées, toutes identiques ; périmètre de T5 (36e entrée) et rapport arbitré de T5 (37e entrée) protégés', Object.keys(man).length + ' entrées ; différentes : ' + (diffE.join(', ') || 'aucune'));
console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');
process.exit(ecarts ? 1 : 0);
