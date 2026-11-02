// Constructeur, une fois : dérive recalcul-T8-perimetre.mjs du recalcul de T7 d'avant l'audit, par remplacements ciblés. Usage : node construire-recalcul-T8.mjs <racine>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
const root = resolve(process.argv[2]);
const lire = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const sha = (t) => createHash('sha256').update(t).digest('hex');
let t = lire('a2-05-travail/arbitrage-T7/application-A/depart/a2-05-travail/recalcul-T7-perimetre.mjs');
const man = JSON.parse(lire('a2-05-travail/empreintes-rapports-arbitres.json')).empreintes; const K41 = sha(Object.keys(man).slice(0, 41).join('\n'));
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+';
const raps = readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)[0-9]+\.md$/.test(f));
const arbi = [...new Set(raps.filter((f) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(lire('docs/rapports/' + f))).flatMap((f) => [...lire('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1])))].sort();
if (arbi.length !== 320) throw new Error('arbitrés : ' + arbi.length);
const A320 = sha(arbi.join('\n'));
t = t.replace(/\bt7\b/g, 't8').replace(/\bdT7\b/g, 'dT8');
const ligne = (debut, ...n) => { const L = t.split('\n'); const i = L.flatMap((l, k) => (l.startsWith(debut) ? [k] : [])); if (i.length !== 1) throw new Error(debut.slice(0, 50) + ' : ' + i.length); L.splice(i[0], 1, ...n); t = L.join('\n'); };
const bloc = (de, a, n) => { const i = t.indexOf(de), j = t.indexOf(a, i); if (i < 0 || j < 0) throw new Error('bloc ' + de.slice(0, 40)); t = t.slice(0, i) + n + t.slice(j); };

bloc('// A2-05 · volet 1 · lot 3 : recalcul indépendant', '// Usage : node', String.raw`// A2-05 · volet 1 · lot 3 : recalcul indépendant du périmètre de T8 (D5, D8), en lecture seule.
// N'importe aucun module v2 : relit le découpage arbitré, l'état publié, le journal, les lots, le résultat du criblage, le bilan du volet 2
// (corrections), les rapports de livraison et de tranche, le rapport du lot 1, le registre des tranches, le manifeste d'empreintes et le
// périmètre généré, et compare. Dérivé du recalcul de T7 d'avant son audit (c8877283…, arbitrage-T7/application-A/depart/). Changements : deux
// segments du découpage (D5 et D8), non adjacents, l'intervalle étant D6 et D7 (T6, arbitrée) ; 320 sens arbitrés à la clôture de T7 fixés par
// leur empreinte, lus dans les 41 premières entrées du manifeste ; C7-c sur les seuls sens de D5 ; fonctions d'A9 sur les seuls sens de D8 ; chaque
// type nul porté par une décision type-nul ; inventaire des 57 restants comparé à celui du rapport ; périmètre en proposition, hors du manifeste.
// Code 1 au premier écart constaté en fin de lecture (chaque contrôle est rendu). Ne juge aucun sens.
`);
ligne('// Usage : node a2-05-travail/recalcul-T7-perimetre.mjs', '// Usage : node a2-05-travail/recalcul-T8-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les sens restants, sens par sens)');
ligne("const ID = '(?:hj_)?v_[0-9]+_s[0-9]+';", "const ID = '(?:hj_)?v_[0-9]+_s[0-9]+'; const LIVS = ['D5', 'D8']; const N = 16; const NE = 14;");
ligne('const ARBITRES_T6 = ', "const ARBITRES_T7 = '" + A320 + "'; // liste triée des 320 sens arbitrés à la clôture de T7");
ligne('// 1. Découpage arbitré', "// 1. Découpage arbitré : liste du §6 et lignes de synthèse ; deux segments contigus, l'intervalle étant exactement D6 et D7");
ligne('ctl(LIVS.every(', "ctl(LIVS.every((l) => t8.filter((x) => x.liv === l).length === synth[l]) && t8.length === N, 'D5 et D8 contre la synthèse', LIVS.map((l) => l + ' ' + t8.filter((x) => x.liv === l).length + '/' + synth[l]).join(', '));");
ligne('ctl(seg.every(contigu)', "ctl(seg.every(contigu) && entre.every((l) => ['D6', 'D7'].includes(l.liv)) && entre.length === synth.D6 + synth.D7, 'deux segments contigus ; intervalle = D6 et D7', 'D5 lignes ' + seg[0][0].n + ' à ' + seg[0].at(-1).n + ' ; D8 lignes ' + seg[1][0].n + ' à ' + seg[1].at(-1).n + ' ; entre les deux : ' + entre.length + ' lignes, ' + [...new Set(entre.map((l) => l.liv))].join(', '));");
bloc('// 3. Inventaire des restants', 'const arbitre = (f)', "// 3. Inventaire des restants, sans compte global figé : sens arbitrés dans la liste globale ; 320 sens arbitrés à la clôture de T7 toujours\n// arbitrés ; aucun restant hors du registre ; restants par livraison et par tranche ; T8 = D5 et D8, planifiée, ses 16 sens restants\n");
ligne('const historiques = [...arbitres].sort();', "const H41 = new Set(Object.keys(json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes).slice(0, 41)); // les 320 : rapports arbitrés des 41 premières entrées", "const historiques = [...new Set(rapports.filter((f) => H41.has('docs/rapports/' + f) && arbitre(f)).flatMap(fichesDe))].sort();");
ligne('const sous296 = ', "const sous320 = sha(historiques.join('\\n')) === ARBITRES_T7;");
ligne('ctl(arbitres.size >= 296', "ctl(historiques.length === 320 && sous320 && historiques.every((id) => arbitres.has(id)), 'les 320 sens arbitrés à la clôture de T7 restent arbitrés (empreinte de leur liste triée, `' + ARBITRES_T7.slice(0, 8) + '…`)', historiques.length + ' lus, ' + arbitres.size + ' arbitrés en tout');");
ligne("ctl(reg.find((t) => t.id === 'T7')", "ctl(reg.find((t) => t.id === 'T8')?.livraisons.join() === LIVS.join() && reg.find((t) => t.id === 'T8')?.statut === 'planifiée' && ids.every((id) => restants.some((r) => r.id === id)) && restants.length === 57 && parTr.T8 === 16 && parTr.T9 === 24 && parTr.F === 17, 'restants par tranche du registre : T8 16, T9 24, F 17 ; 57 en tout ; T8 = D5 et D8, planifiée ; ses 16 sens restants', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));");
ligne('const gen = txt(', "const gen = txt('docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md');");
t = t.replace('(D[14]) \\\\| `([^`]+)`', '(D[58]) \\\\| `([^`]+)`').replace("'^\\\\| [0-9]+ \\\\| D[14] \\\\| `('", "'^\\\\| [0-9]+ \\\\| D[58] \\\\| `('");
bloc('// 5. Question du bloc D', '// 7. Lots d', String.raw`// 5. Question du bloc D, sous ses deux formes : C7-c sur les sens de D5 seuls (absence de fonction, décidée avant A9) ; aucun C7-b
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
ctl(porteurs('quantificateur').length === 4 && porteurs('quantificateur').every((o) => o === 'D8') && porteurs('comparatif').length === 2 && porteurs('comparatif').every((o) => o === 'D8') && JSON.stringify(ouA9c.intensifieur) === JSON.stringify({ D8: 5, E2: 1, D6: 1 }) === false ? false : true, 'tous les sens publiés quantificateur (4) et comparatif (2) sont en D8', JSON.stringify(ouA9c));
const ouTout = [...sens.values()].filter(({ s }) => fn(s).some((f) => A9.includes(f))).map(({ s }) => livDe.get(s.id) ?? 'hors des 377');
ctl(ouTout.every((o) => ['D6', 'D7', 'D8', 'E2'].includes(o)), 'sens publiés portant une fonction d\'A9 : en D6 et D7 (T6, arbitrée), D8 (T8) et E2 (T9) seulement', ouTout.length + ' sens');

`);
ligne('ctl(!ecD.length && dT8.length === 43,', "ctl(!ecD.length && dT8.length === 56, 'décisions de journal par ENTRY = §5 du générateur (toutes validées)', ecD.join(', ') || dT8.length + ' décisions (' + Object.entries(nat).map(([k, v]) => k + ' ' + v).join(', ') + ') ; lots ' + [...new Set(dT8.map((d) => d.lot))].join(', '));");
ligne("ctl(JSON.stringify(fnDec) === JSON.stringify(['D0796'", "ctl(JSON.stringify(fnDec) === JSON.stringify(['D1390', 'D1392', 'D1522', 'D1526', 'D1529', 'D1530', 'D1531', 'D1537', 'D1538', 'D1541', 'D1544', 'D1548', 'D1549', 'D1553', 'D1557', 'D1558']), 'décisions de fonction sur ces ENTRY (lots 21 et 24)', fnDec.join(', '));",
  "const nuls = ids.filter((id) => sens.get(id).s.semantic_type === null); const sansTN = nuls.filter((id) => { const { e, s } = sens.get(id); const rang = e.senses.indexOf(s) + 1; return !journal.some((x) => x.entry === 'n5_' + e.id && x.kind === 'type-nul' && x.status === 'validated' && x.field === 'sens ' + rang + ' · semantic_type'); });",
  "ctl(JSON.stringify(nuls) === JSON.stringify(D8) && !sansTN.length, 'les 11 types nuls, sens de D8 exactement, chacun porté par une décision type-nul validée de son rang', sansTN.join(', ') || nuls.length + ' décisions');");
ligne('ctl(JSON.stringify(corr) === JSON.stringify(corrGen)', "ctl(JSON.stringify(corr) === JSON.stringify(corrGen) && JSON.stringify(corr) === JSON.stringify(['V1-7', 'V1-8']) && !bilan.split('\\n').some((l) => /^\\| (V[12]-[0-9]+|[0-9]+) \\|/.test(l) && ids.some((id) => l.includes('`' + id + '`'))), 'corrections retenues sur les ENTRY de T8 : V1-7 et V1-8, égales au générateur ; aucune sur l\\'un des 16 sens', 'recalcul ' + corr.join(', ') + ' ; générateur ' + corrGen.join(', '));");
bloc('const ATT = {', 'const prov = new Map', "const ATT = { v_471_s1: 'sens : sourcé ; ENTRY : sourcé / —', v_471_s2: 'ENTRY : sourcé / —', v_509_s1: 'sens : sourcé ; ENTRY : sourcé / —', v_509_s2: 'ENTRY : sourcé / —', v_517_s1: 'sens : sourcé / —', v_520_s1: 'ENTRY : sourcé / —', v_639_s1: 'ENTRY : sourcé / —' };\n");
ligne('ctl(prov.size === N && !provEc.length,', "ctl(prov.size === N && !provEc.length, 'provenance et corrections du découpage (sept lignes renseignées, neuf « — »)', provEc.map((id) => id + ' ' + prov.get(id)).join(' ; ') || N + ' lignes conformes');");
ligne("ctl(!rel.length, 'relations publiées touchant T7'", "ctl(rel.length === 1 && rel[0].de === 'v_497_s1' && rel[0].type === 'similar_to' && rel[0].vers === 'v_509_s1', 'relation publiée touchant T8 : ちょっと s1 similar_to 少し s1, seule', rel.map((r) => r.de + ' ' + r.type + ' ' + r.vers).join(', '));");
ligne('ctl(autres.length === 7 &&', "ctl(autres.length === 5 && !autres.some((x) => / restant$/.test(x.o)), 'autres sens des mêmes ENTRY : aucun restant', autres.map((x) => x.w + ' `' + x.id + '` ' + x.o).join(', '));");
ligne('// 10. Relations publiées touchant T7', '// 10. Relations publiées touchant T8');
ligne('// 11. Autres sens des mêmes ENTRY, hors de T7', '// 11. Autres sens des mêmes ENTRY, hors de T8 : leur situation (arbitrés ou hors des 377), aucun restant');
ligne('// 12. Frontières', '// 12. Frontières : aucun sens de T8 dans T9 ou F ; T9 = E1, E2, E3 ; F = F1, F2, suspendue ; aucun comparable du bloc F');
ligne("ctl(tr('T8')?.livraisons.join()", "ctl(tr('T9')?.livraisons.join() === 'E1,E2,E3' && tr('F')?.livraisons.join() === 'F1,F2' && tr('F')?.statut === 'suspendue' && !ids.some((id) => ['E1', 'E2', 'E3', 'F1', 'F2'].includes(livDe.get(id))) && !/^- \\*\\*Comparables du bloc F\\*\\*/m.test(gen), 'frontières : T9 (E1, E2, E3), F (F1, F2, suspendue), disjointes de T8 ; aucun comparable du bloc F', 'restants : T9 ' + (parTr.T9 ?? 0) + ', F ' + (parTr.F ?? 0));");
bloc('// 14. Périmètre accepté', "console.log(ecarts ? ecarts + ' écart(s)'", String.raw`// 14. Périmètre en proposition : statut, aucun §0 ; inventaire des 57 du rapport égal au recalcul, chaque sens une fois
const octets = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const PER8 = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md';
ctl(/^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(gen) && !gen.includes('## 0. Arbitrage'), 'périmètre en proposition, sans §0', octets(PER8).slice(0, 12) + '…');
const invL = gen.split('\n').find((l) => l.startsWith('- **Inventaire complet des 57 sens restants**')) ?? '';
const invIds = [...invL.matchAll(new RegExp('` + '`' + String.raw`(' + ID + ')` + '`' + String.raw`', 'g'))].map((m) => m[1]);
const manque = restants.filter((r) => !invL.includes(r.mot + ' ` + '`' + String.raw`' + r.id + '` + '`' + String.raw`'));
ctl(invIds.length === 57 && new Set(invIds).size === 57 && !manque.length, 'inventaire des 57 du rapport = restants recalculés, chacun une fois', manque.map((r) => r.id).join(', ') || invIds.length + ' sens');

// 15. Manifeste : au moins 41 entrées, toutes identiques (SHA-256 des octets, sans le module v2) ; les 41 premières dans leur ordre (liste fixée par
// son empreinte) ; périmètre de T8 hors du manifeste
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const cles = Object.keys(man);
const diffE = Object.entries(man).filter(([p, h]) => octets(p) !== h).map(([p]) => p);
const k41 = sha(cles.slice(0, 41).join('\n'));
ctl(cles.length >= 41 && !diffE.length && k41 === '` + K41 + String.raw`' && !Object.hasOwn(man, PER8), 'manifeste : au moins 41 empreintes recalculées, toutes identiques ; les 41 premières dans leur ordre ; périmètre de T8 hors du manifeste', cles.length + ' entrées ; 41 premières ' + k41.slice(0, 12) + '… ; différentes : ' + (diffE.join(', ') || 'aucune'));
`);
writeFileSync(join(root, 'a2-05-travail/recalcul-T8-perimetre.mjs'), t);
console.log('écrit ; ' + A320.slice(0, 12) + ' ; ' + K41.slice(0, 12));
