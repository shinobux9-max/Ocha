// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T9 (E1, E2, E3), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, l'état publié, le journal, les lots, le résultat du criblage, le bilan du volet 2 (corrections), les rapports
// de livraison et de tranche, le rapport du lot 1, le registre des tranches, le manifeste d'empreintes et le périmètre généré, et compare. Dérivé du recalcul de T8.
// Changements : un seul segment contigu, bordé par D8 et F1 ; 336 sens arbitrés à la clôture de T8 fixés par leur empreinte ; marques RES du criblage, sur les seuls 24
// sens de T9, motifs égaux au découpage, §7.2 ; règles du §2 égales au criblage hors RES (défaut signalé, non corrigé) ; générateur et criblage à leur empreinte.
// Code 1 au premier écart constaté en fin de lecture (chaque contrôle est rendu). Ne juge aucun sens.
// Adaptation au périmètre accepté (§0 ; proposition sauvegardée, empreinte fixée ; empreinte de la version acceptée fixée, indépendante du manifeste) et à
// sa protection (absent du manifeste ou en 44e entrée) : préparée le 2026-11-01, appliquée seulement sur autorisation distincte ; version initiale `dadfd652…`.
// Usage : node a2-05-travail/recalcul-T9-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les sens restants, sens par sens)
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const sha = (t) => createHash('sha256').update(t).digest('hex');
const octets = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+'; const LIVS = ['E1', 'E2', 'E3']; const N = 24; const NE = 21;
const ARBITRES_T8 = '18138b39ae715d35d5680df9342051cbfaef7fe12d7f2a0400fcbfefc700fbb1'; // liste triée des 336 sens arbitrés à la clôture de T8
const ORDRE_43 = 'cd85be623e87b1a3d50c82180472cab375f128af44d9dad8d616c6034a653bad'; // les 43 entrées du manifeste, dans leur ordre
const GENERATEUR = '6537c0ee36816b0eea17269502dc8e9876fe1579fc1115fc31eebca7e3a496d1', CRIBLAGE = 'aef9e029f25c17d36200587d5f7cee01035444868f54c453f30d19b6bff0060d';
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// 1. Découpage arbitré : liste du §6 et lignes de synthèse ; un segment contigu, bordé par D8 et F1
const decoupage = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
const liste = [...decoupage.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\| ([^|]+) \\| [^|]+ \\| ([0-9]+) \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3], mot: m[4].trim(), lot: m[5] }));
const t9 = liste.filter((l) => LIVS.includes(l.liv));
const synth = Object.fromEntries([...decoupage.matchAll(/^\| ([A-F][0-9]+) \| [A-F] \| [^|]+ \| ([0-9]+) \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => [m[1], +m[2]]));
ctl(liste.length === 377 && new Set(liste.map((l) => l.id)).size === 377 && liste.every((l, k) => l.n === k + 1), 'liste globale', liste.length + ' lignes, ' + new Set(liste.map((l) => l.id)).size + ' distinctes, numérotées 1 à 377');
ctl(LIVS.every((l) => t9.filter((x) => x.liv === l).length === synth[l]) && t9.length === N, 'E1, E2 et E3 contre la synthèse', LIVS.map((l) => l + ' ' + t9.filter((x) => x.liv === l).length + '/' + synth[l]).join(', '));
const contigu = t9.every((x, k) => x.n === 337 + k) && LIVS.every((l, k) => { const s = t9.filter((x) => x.liv === l); return s.every((x, j) => x.n === s[0].n + j) && (k === 0 || s[0].n === t9.filter((x) => x.liv === LIVS[k - 1]).at(-1).n + 1); });
ctl(contigu && liste[335]?.liv === 'D8' && liste[360]?.liv === 'F1', 'un seul segment contigu, 337 à 360, bordé par D8 et F1', LIVS.map((l) => { const s = t9.filter((x) => x.liv === l); return l + ' ' + s[0]?.n + ' à ' + s.at(-1)?.n; }).join(' ; ') + ' ; avant : ' + liste[335]?.liv + ' ; après : ' + liste[360]?.liv);
const ids = t9.map((l) => l.id); const entries = [...new Set(ids.map((id) => id.replace(/_s[0-9]+$/, '')))];
ctl(new Set(ids).size === N && entries.length === NE, 'aucun doublon de sens ; ENTRY distinctes', ids.length + ' sens, ' + entries.length + ' ENTRY');

// 2. Les 24 sens ne sont examinés dans aucun rapport de livraison ou de tranche (hors périmètres)
const rapports = readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)[0-9]+\.md$/.test(f));
const fichesDe = (f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1]);
const dejaVus = ids.filter((id) => rapports.some((f) => fichesDe(f).includes(id)));
ctl(!dejaVus.length, 'sens non encore examinés (' + rapports.length + ' rapports de livraison et de tranche lus)', dejaVus.join(', ') || 'aucun des 24 examiné ailleurs');

// 3. Inventaire des restants, sans compte global figé ; 336 sens arbitrés à la clôture de T8 fixés par leur empreinte ; répartition par tranche
const arbitre = (f) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/' + f));
const arbitres = new Set(rapports.filter(arbitre).flatMap(fichesDe));
const horsListe = [...arbitres].filter((id) => !liste.some((l) => l.id === id));
const restants = liste.filter((l) => !arbitres.has(l.id));
const reg = json('a2-05-travail/registre-tranches.json').tranches; const trancheDe = new Map(reg.flatMap((t) => t.livraisons.map((l) => [l, t.id])));
const parLiv = {}; for (const r of restants) parLiv[r.liv] = (parLiv[r.liv] ?? 0) + 1;
const parTr = {}; for (const r of restants) { const t = trancheDe.get(r.liv) ?? '(hors registre)'; parTr[t] = (parTr[t] ?? 0) + 1; }
ctl(!horsListe.length && !parTr['(hors registre)'], 'inventaire des restants (liste globale moins les sens des rapports arbitrés)', arbitres.size + ' arbitrés, ' + restants.length + ' restants ; hors de la liste globale : ' + (horsListe.join(', ') || 'aucun') + ' ; par livraison : ' + Object.entries(parLiv).map(([k, v]) => k + ' ' + v).join(', '));
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const cles = Object.keys(man);
const H43 = new Set(cles.slice(0, 43));
const historiques = [...new Set(rapports.filter((f) => H43.has('docs/rapports/' + f) && arbitre(f)).flatMap(fichesDe))].sort();
ctl(historiques.length === 336 && sha(historiques.join('\n')) === ARBITRES_T8 && historiques.every((id) => arbitres.has(id)), 'les 336 sens arbitrés à la clôture de T8 restent arbitrés (empreinte de leur liste triée, `' + ARBITRES_T8.slice(0, 8) + '…`)', historiques.length + ' lus, ' + arbitres.size + ' arbitrés en tout');
ctl(reg.find((t) => t.id === 'T9')?.livraisons.join() === LIVS.join() && reg.find((t) => t.id === 'T9')?.statut === 'planifiée' && reg.find((t) => t.id === 'F')?.livraisons.join() === 'F1,F2' && reg.find((t) => t.id === 'F')?.statut === 'suspendue' && restants.length === 41 && parTr.T9 === 24 && parTr.F === 17 && Object.keys(parTr).length === 2 && ids.every((id) => restants.some((r) => r.id === id)), 'restants par tranche du registre : T9 24, F 17 ; 41 en tout ; T9 = E1, E2, E3 ; F suspendue ; registre non modifié', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));
if (process.argv.includes('--inventaire')) for (const l of [...new Set(restants.map((r) => r.liv))]) console.log('   ' + l + ' (' + (trancheDe.get(l) ?? '?') + ') : ' + restants.filter((r) => r.liv === l).map((r) => r.mot + ' `' + r.id + '`').join(', '));

// 4. Périmètre généré : §2 identique au découpage ; catégorie, type et fonctions égaux à l'état publié
const GEN = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md';
const gen = txt(GEN);
const s2 = gen.slice(gen.indexOf('## 2. '), gen.indexOf('## 3. '));
const lignes = [...s2.matchAll(new RegExp('^\\| [0-9]+ \\| `(' + ID + ')` \\| [^|]+ \\| [^|]+ \\| [^|]+ \\| (E[123]) \\| `([^`]+)` \\| `([^`]+)` \\| ([^|]+) \\|([^|]*)\\|$', 'gm'))].map((m) => ({ id: m[1], liv: m[2], cat: m[3], type: m[4], fn: [...m[5].matchAll(/`([^`]+)`/g)].map((x) => x[1]).join(), regles: m[6].trim() }));
ctl(lignes.length === N && lignes.every((l, k) => l.id === ids[k] && l.liv === t9[k].liv), 'sens du périmètre généré = découpage (ordre et livraison)', lignes.length + ' sens, ' + entries.length + ' ENTRY');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const sens = new Map(pub.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const fn = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const catDe = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const diffCat = lignes.filter((l) => !sens.has(l.id) || catDe(sens.get(l.id).s.category) !== l.cat || String(sens.get(l.id).s.semantic_type) !== l.type || fn(sens.get(l.id).s).join() !== l.fn);
ctl(!diffCat.length, 'catégories, types et fonctions du §2 = état publié (data/)', diffCat.map((l) => l.id).join(', ') || N + ' sens identiques');

// 5. Marques RES : exactement les 24 sens, une chacun ; six autres, hors des 377 ; motifs égaux au découpage, §7.2 ; règles du §2 = criblage hors RES
ctl(octets('a2-05-travail/perimetre-v2.mjs') === GENERATEUR && octets('a2-05-travail/criblage/resultat.json') === CRIBLAGE, 'générateur à sa version corrigée (voie A, sur autorisation) ; criblage inchangé, marques conservées', GENERATEUR.slice(0, 12) + '… ; ' + CRIBLAGE.slice(0, 12) + '…');
const candidats = json('a2-05-travail/criblage/resultat.json').candidats; const crib = new Map(candidats.map((c) => [c.id, c]));
const marques = candidats.flatMap((c) => c.regles.filter((g) => g.regle === 'RES').map((g) => ({ id: c.id, motif: g.detail.replace(/^point réservé à A2-05 : /, '') })));
const marT9 = marques.filter((m) => ids.includes(m.id)), marHors = marques.filter((m) => !ids.includes(m.id));
ctl(marques.length === 30 && marT9.length === N && new Set(marT9.map((m) => m.id)).size === N, 'marques RES au criblage : 30, dont une sur chacun des 24 sens', marques.length + ' marques ; sur T9 : ' + marT9.length);
const lesSix = ['v_363_s2', 'v_366_s1', 'v_434_s1', 'v_452_s1', 'v_495_s2', 'v_500_s2'];
ctl(JSON.stringify(marHors.map((m) => m.id).sort()) === JSON.stringify([...lesSix].sort()) && !marHors.some((m) => liste.some((l) => l.id === m.id)) && lesSix.every((id) => gen.includes('`' + id + '`')), 'six marques hors de T9, hors des 377, nommées par le rapport', marHors.map((m) => m.id).join(', '));
const s72 = decoupage.slice(decoupage.indexOf('### 7.2 '), decoupage.indexOf('### 7.3 '));
const t72 = [...s72.matchAll(/^\| (.+?) \| ([0-9]+) \| (.*) \|$/gm)].map((m) => ({ motif: m[1], n: +m[2], ids: [...m[3].matchAll(new RegExp('`(' + ID + ')`', 'g'))].map((x) => x[1]) })).filter((x) => x.ids.length);
const ecM = t72.filter((x) => x.n !== x.ids.length || JSON.stringify([...x.ids].sort()) !== JSON.stringify(marT9.filter((m) => m.motif === x.motif).map((m) => m.id).sort()));
ctl(t72.length === 9 && t72.reduce((n, x) => n + x.n, 0) === N && !ecM.length && t72.every((x) => gen.includes('**' + x.motif + '** (' + x.n + ' : ')), 'neuf motifs de réservation = découpage, §7.2 ; repris par le rapport', ecM.map((x) => x.motif).join(' ; ') || t72.map((x) => x.n).join(', '));
const ecR = lignes.filter((l) => l.regles !== (crib.get(l.id)?.regles ?? []).filter((g) => g.regle !== 'RES').map((g) => g.regle).join(', '));
ctl(!ecR.length, 'règles du §2 = criblage hors RES, sens par sens', ecR.map((l) => l.id).join(', ') || N + ' sens');
const lesRegles = [...new Set(ids.flatMap((id) => crib.get(id)?.regles.map((g) => g.regle) ?? []))].filter((g) => g !== 'RES').length;
ctl(lesRegles === 14 && /\*\*14 règles\*\*/.test(gen) && /Défaut « RES » \(signalé à part, non corrigé/.test(gen) && /Trois voies, à arbitrer, aucune retenue/.test(gen), 'quatorze règles hors RES ; défaut signalé à part, proposition conservée', lesRegles + ' règles');

// 6. Fonctions, types, catégories : relevé exact ; aucun interrogatif
const avecFn = ids.filter((id) => fn(sens.get(id).s).length);
ctl(JSON.stringify(avecFn) === JSON.stringify(['v_495_s1']) && fn(sens.get('v_495_s1').s).join() === 'intensifieur', 'une seule fonction : intensifieur sur 大変 s1 ; ni deictique ni interrogatif', avecFn.join(', '));
const compte = (f) => { const o = {}; for (const id of ids) { const k = f(sens.get(id).s); o[k] = (o[k] ?? 0) + 1; } return JSON.stringify(Object.fromEntries(Object.entries(o).sort())); };
const types = compte((s) => String(s.semantic_type)), niveaux = compte((s) => (!s.category ? 'null' : s.category.level_3 ? '3' : '2'));
ctl(types === '{"concept_abstrait":4,"evenement":3,"lieu":3,"null":1,"propriete":12,"substance_matiere":1}' && niveaux === '{"2":6,"3":17,"null":1}', 'types et niveaux de catégorie, comptes du rapport', types + ' ; ' + niveaux);

// 7. Tags et relations
const tagues = entries.filter((e) => (pub.find((x) => x.id === e)?.tags ?? []).length).map((e) => e + ':' + pub.find((x) => x.id === e).tags.join('+')).sort().join(' ');
ctl(tagues === 'v_459:lieu_restaurant v_594:lieu_konbini+lieu_restaurant v_91:lieu_restaurant v_92:lieu_restaurant', 'tags publiés : quatre ENTRY', tagues);
const rel = pub.flatMap((e) => e.senses.flatMap((s) => (s.relations ?? []).map((r) => ({ de: s.id, vers: r.target })))).filter((r) => ids.includes(r.de) || ids.includes(r.vers));
ctl(!rel.length, 'aucune relation publiée ne touche T9', rel.map((r) => r.de + ' ' + r.vers).join(', ') || 'aucune');

// 8. Lots d'origine et décisions de journal par ENTRY : décisions = §5 du générateur, toutes validées
const lotDe = new Map(); for (const f of readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-[0-9]+\.json$/.test(f))) for (const [k, v] of Object.entries(json('reconstruction/a2-04/lots/' + f).entries ?? {})) lotDe.set(k, { lot: f.slice(4, 6), status: v.status });
const ecLot = t9.filter((l) => { const x = lotDe.get('n5_' + l.id.replace(/_s[0-9]+$/, '')); return !x || x.lot !== l.lot || x.status !== 'validated'; });
ctl(!ecLot.length, 'chaque ENTRY validée dans son lot d\'origine (colonne du découpage)', ecLot.map((l) => l.id).join(', ') || 'lots ' + [...new Set(t9.map((l) => l.lot))].join(', '));
const journal = json('reconstruction/a2-04/journal.json');
const s5 = gen.slice(gen.indexOf('## 5. '), gen.indexOf('## 6. '));
const decGen = new Map([...s5.matchAll(/^\| `(v_[0-9]+)` \| [^|]+ \| `([^`]+)` \| (.*) \|$/gm)].map((m) => [m[1], { src: m[2], d: [...m[3].matchAll(/D[0-9]{4}/g)].map((x) => x[0]) }]));
const ecD = entries.filter((e) => { const s = 'n5_' + e; const d = journal.filter((x) => x.entry === s).map((x) => x.id.replace('A2-04-', '')); const g = decGen.get(e); return !g || g.src !== s || d.join() !== g.d.join() || journal.some((x) => x.entry === s && x.status !== 'validated'); });
const dT9 = journal.filter((x) => entries.some((e) => x.entry === 'n5_' + e)); const nat = {}; for (const d of dT9) nat[d.kind] = (nat[d.kind] ?? 0) + 1;
ctl(!ecD.length && dT9.length === 41 && nat.decision === 24 && nat.abandon === 12 && nat.correction === 3 && nat['categorie-nulle'] === 1 && nat['type-nul'] === 1, 'décisions de journal par ENTRY = §5 du générateur (toutes validées)', ecD.join(', ') || dT9.length + ' décisions (' + Object.entries(nat).map(([k, v]) => k + ' ' + v).join(', ') + ') ; lots ' + [...new Set(dT9.map((d) => d.lot))].join(', '));
const fnDec = dT9.filter((d) => /linguistic_functions/.test(d.field)).map((d) => d.id); const tagDec = dT9.filter((d) => d.field === 'tags').map((d) => d.id.replace('A2-04-', '')).sort();
ctl(!fnDec.length && JSON.stringify(tagDec) === JSON.stringify(['D0586', 'D0600', 'D0625']), 'aucune décision de fonction ; décisions de tags : 先, 前 et 近く seulement', 'fonctions : ' + (fnDec.join(', ') || 'aucune') + ' ; tags : ' + tagDec.join(', '));
const d495 = dT9.filter((d) => d.entry === 'n5_v_495'); const cat1 = d495.some((d) => d.kind === 'categorie-nulle' && d.field === 'sens 1 · category');
ctl(!cat1 && d495.some((d) => d.kind === 'categorie-nulle' && d.field === 'sens 2 · category') && d495.some((d) => d.kind === 'type-nul' && d.field === 'sens 1 · semantic_type') && !dT9.some((d) => d.entry === 'n5_v_459'), '大変 : catégorie nulle décidée au sens 2 seul, type nul au sens 1 ; 朝ご飯 sans décision', d495.map((d) => d.id.replace('A2-04-', '') + ' ' + d.kind).join(', '));

// 9. Corrections : toute ligne de tableau du bilan (hors §7) citant une ENTRY de T9 ; égales au générateur ; toutes de nuance
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md').replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
const cite = (l, e) => new RegExp('`(?:n5_)?' + e + '(?:_s[0-9]+)?`').test(l);
const lignesC = bilan.split('\n').filter((l) => /^\| (V[12]-[0-9]+|[0-9]+) \|/.test(l) && entries.some((e) => cite(l, e)));
const corr = [...new Set(lignesC.map((l) => l.split('|')[1].trim()))].sort();
const corrGen = ((gen.match(/^- \*\*Corrections retenues sur ces ENTRY\*\*[^:]*: (.*)\.$/m) ?? [])[1] ?? '').split(', ').filter(Boolean).sort();
const CORR = ['V2-116', 'V2-117', 'V2-123', 'V2-152', 'V2-153', 'V2-154', 'V2-155', 'V2-156', 'V2-157', 'V2-158'];
ctl(JSON.stringify(corr) === JSON.stringify(corrGen) && JSON.stringify(corr) === JSON.stringify(CORR) && lignesC.every((l) => /^`nuance`/.test(l.split('|')[5]?.trim() ?? '')), 'corrections retenues sur les ENTRY de T9 : dix, toutes de nuance, égales au générateur', 'recalcul ' + corr.join(', ') + ' ; générateur ' + corrGen.join(', '));

// 10. Autres sens des mêmes ENTRY : aucun restant ; frontière F ; comparables du lot 1
const livDe = new Map(liste.map((l) => [l.id, l.liv]));
const autres = pub.filter((e) => entries.includes(e.id)).flatMap((e) => e.senses.filter((s) => !ids.includes(s.id)).map((s) => ({ w: e.word, id: s.id, o: livDe.has(s.id) ? livDe.get(s.id) + (arbitres.has(s.id) ? ' arbitré' : ' restant') : 'hors des 377' })));
ctl(autres.length === 3 && !autres.some((x) => / restant$/.test(x.o)), 'autres sens des mêmes ENTRY : aucun restant', autres.map((x) => x.w + ' `' + x.id + '` ' + x.o).join(', '));
const compF = (gen.match(/^- \*\*Comparables du bloc F\*\*[^:]*: (.*)\.$/m) ?? [])[1];
ctl(compF === 'どこ' && !ids.some((id) => ['F1', 'F2'].includes(livDe.get(id))) && !ids.some((id) => fn(sens.get(id).s).includes('interrogatif')), 'frontière du bloc F : aucun sens de F ; どこ, seul comparable', compF ?? 'absent');
const lot1 = new Map([...txt('docs/rapports/etape2-A2-05-coherence-retroactive.md').matchAll(new RegExp('^#### `(' + ID + ')` · [^\\n]* — \\*\\*([^*]+)\\*\\*$', 'gm'))].map((m) => [m[1], m[2]]));
const comp = new Map([...gen.matchAll(new RegExp('^\\| `(' + ID + ')` \\|.*\\| ([^|]+) \\|$', 'gm'))].map((m) => [m[1], m[2].trim()]));
const vus = [...lot1.keys()].filter((x) => comp.has(x));
ctl(lot1.size === 19 && vus.every((id) => comp.get(id).endsWith('volet 1, lot 1 (' + lot1.get(id) + ', arbitré)')), 'sens du lot 1 ; étiquettes des comparables conformes', lot1.size + ' lus ; parmi les comparables : ' + (vus.join(', ') || 'aucun'));

// 11. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée ; empreinte de la version acceptée fixée ; inventaire des 41
const PROP9 = 'a2-05-travail/arbitrage-T9/proposition-T9-perimetre.md';
const PL = (existsSync(join(root, PROP9)) ? txt(PROP9) : '').split('\n'), G = gen.split('\n');
const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T9'); const sans0 = a0 > 0 && b0 > a0 ? [...G.slice(0, a0), ...G.slice(b0)] : G; const st = PL.findIndex((l) => l.startsWith('**Statut** : '));
ctl(octets(PROP9) === '01b9bf833a66fd56a8183ee24fb4c47a11506be2d687dc09b3cabab604d84205' && /^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/.test(PL[st] ?? '') && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-11-01 \(§0\)\.\*\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', octets(PROP9).slice(0, 12) + '… ; §0 : ' + (b0 - a0) + ' lignes');
ctl(octets(GEN) === '85faf16c39db3e262524bb98b6fa8e6f60afe97a37d694e8119d7a5138933e88', 'périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', octets(GEN).slice(0, 12) + '…');
const s09 = a0 > 0 && b0 > a0 ? G.slice(a0, b0).join('\n') : '';
ctl(s09.includes("**J'accepte le périmètre opérationnel de T9 : E1 + E2 + E3, soit 24 sens dans 21 ENTRY, lignes 337 à 360.**") && s09.includes('Je confirme le maintien de 先 s1, 前 s1 et 近く s1.') && s09.includes('**voie A**') && s09.includes("**L'audit lexical des 24 sens n'est pas autorisé**"), '§0 de T9 : 24 sens, 21 ENTRY ; trois sens spatiaux maintenus ; voie A recommandée ; audit non autorisé', 'présents');
const invL = gen.split('\n').find((l) => l.startsWith('- **Inventaire exhaustif des 41 sens restants**')) ?? '';
const invIds = [...invL.matchAll(new RegExp('`(' + ID + ')`', 'g'))].map((m) => m[1]); const manque = restants.filter((r) => !invL.includes(r.mot + ' `' + r.id + '`'));
ctl(invIds.length === 41 && new Set(invIds).size === 41 && !manque.length, 'inventaire des 41 du rapport = restants recalculés, chacun une fois', manque.map((r) => r.id).join(', ') || invIds.length + ' sens');

// 12. Manifeste : au moins 43 entrées, toutes identiques (SHA-256 des octets, sans le module v2) ; les 43 premières dans leur ordre ; périmètre accepté de T9 absent ou en 44e entrée
const diffE = Object.entries(man).filter(([p, h]) => octets(p) !== h).map(([p]) => p);
ctl(cles.length >= 43 && !diffE.length && sha(cles.slice(0, 43).join('\n')) === ORDRE_43 && (cles.indexOf(GEN) === -1 || cles.indexOf(GEN) === 43), 'manifeste : au moins 43 empreintes recalculées, toutes identiques ; les 43 premières dans leur ordre ; périmètre de T9 absent ou en 44e entrée', cles.length + ' entrées ; différentes : ' + (diffE.join(', ') || 'aucune'));
console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');
process.exit(ecarts ? 1 : 0);
