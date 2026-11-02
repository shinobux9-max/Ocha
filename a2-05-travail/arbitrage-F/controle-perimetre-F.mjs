// A2-05 · bloc F : contrôle indépendant du périmètre préparatoire et de l'analyse d'E5. N'importe aucun module v2 ; lecture seule ; n'écrit rien. Ne juge aucun sens et
// n'exécute aucun filtre de recherche d'omissions : il ne regarde que les porteurs publiés d'`interrogatif` et les 17 sens du découpage.
// Usage : node controle-perimetre-F.mjs <racine du dépôt> [--sabotages]. Code 0 si tout est conforme (et, avec --sabotages, si chaque sabotage est détecté).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n'); const json = (p) => JSON.parse(txt(p));
const PER = 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre.md', ANA = 'docs/rapports/etape2-A2-05-bloc-F-analyse-E5.md', DEC = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', PROP = 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md', DOS = 'docs/rapports/etape2-A2-05-prealable-E5-interrogatif.md';
const ID = '(?:hj_)?v_[0-9]+_s[0-9]+';
const TN = ['D0073', 'D0373', 'D0641', 'D0652', 'D0664', 'D0681', 'D0682', 'D0683', 'D0696', 'D0705', 'D0708', 'D0710', 'D0712', 'D0714', 'D0716', 'D0718', 'D0720'];
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const base = (s) => String(s).replace(/\*+/g, '').replaceAll('’', "'").replace(/\s+/g, ' ');

function controler({ per, ana, dec, bil, prop, dos, vocab, sources, journal, crible, registre, listeAddenda, a9, a7 }) {
  const R = []; const ok = (c, nom, d) => R.push({ c: !!c, nom, d: d ?? '' });
  const liste = [...dec.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\| ([^|]+) \\| [^|]+ \\| ([0-9]+) \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3], mot: m[4].trim(), lot: m[5] }));
  const F = liste.filter((l) => /^F[12]$/.test(l.liv)); const ids = F.map((l) => l.id);
  ok(liste.length === 377 && F.length === 17 && new Set(ids).size === 17 && F.every((l, k) => l.n === 361 + k), 'découpage : 17 lignes distinctes, 361 à 377, contiguës, dernières des 377', String(F.length));
  const f1 = F.filter((l) => l.liv === 'F1'), f2 = F.filter((l) => l.liv === 'F2'); const entryDe = (id) => id.replace(/_s[0-9]+$/, ''); const ent = (a) => new Set(a.map((l) => entryDe(l.id))).size;
  ok(f1.length === 11 && f2.length === 6 && ent(f1) === 9 && ent(f2) === 6 && ent(F) === 15 && f1.at(-1).n === 371 && f2[0].n === 372, 'F1 : 11 sens, 9 ENTRY, 361 à 371 ; F2 : 6 sens, 6 ENTRY, 372 à 377 ; 15 ENTRY', [f1.length, ent(f1), f2.length, ent(f2)].join(', '));
  // Exhaustivité : le bloc F est exactement l'ensemble des porteurs publiés de la fonction, et les restants exactement le bloc F
  const sens = new Map(vocab.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
  const porteurs = [...sens.values()].filter(({ s }) => fns(s).includes('interrogatif')).map(({ s }) => s.id).sort();
  ok(JSON.stringify(porteurs) === JSON.stringify([...ids].sort()), 'exhaustivité : porteurs publiés d\'`interrogatif` = les 17 sens du bloc F, ni plus ni moins', porteurs.length + ' porteurs');
  ok(ids.every((id) => JSON.stringify(fns(sens.get(id).s)) === '["interrogatif"]'), 'aucun cumul : `interrogatif` seule sur les 17 sens');
  ok(ids.every((id) => sens.get(id).s.semantic_type === null) && ids.filter((id) => sens.get(id).s.category).length === 5, 'publié : 17 types nuls ; 5 catégories, 12 sans', String(ids.filter((id) => sens.get(id).s.category).length));
  ok(sens.size === 824 && sens.size - porteurs.length === 807, 'population de la recherche d\'omissions citée : 824 sens publiés, 807 sans la fonction', String(sens.size));
  // Tableaux des deux documents
  const lp = [...per.slice(per.indexOf('## 2. '), per.indexOf('## 3. ')).matchAll(new RegExp('^\\| [0-9]+ \\| `(' + ID + ')` \\| ([^|]+) \\| ([^|]+) \\| [^|]+ \\| (F[12]) \\|', 'gm'))].map((m) => ({ id: m[1], mot: m[2].trim(), trad: m[3].trim(), liv: m[4] }));
  ok(lp.length === 17 && lp.every((l, k) => l.id === ids[k] && l.liv === F[k].liv && l.mot === sens.get(l.id)?.e.word && l.trad === sens.get(l.id)?.s.meaning.primary), 'périmètre, §2 : mêmes sens, même ordre, valeurs publiées', String(lp.length));
  const la = [...ana.slice(ana.indexOf('## 2. '), ana.indexOf('## 3. ')).matchAll(new RegExp('^\\| ([0-9]+) \\| (F[12]) \\| `(' + ID + ')` \\| `(v_[0-9]+)` \\| ([^|]+) \\| ([^|]+) \\| ([0-9]+) \\| ([^|]+) \\| ([^|]+) \\|$', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3], e: m[4], mot: m[5].trim(), trad: m[6].trim(), lot: m[7], regles: m[8].trim(), corr: m[9].trim() }));
  const fauxA = la.filter((l, k) => { const d = F[k]; const x = sens.get(l.id); return !d || l.n !== d.n || l.liv !== d.liv || l.id !== d.id || l.lot !== d.lot || !x || l.e !== x.e.id || l.mot !== x.e.word || l.trad !== x.s.meaning.primary; });
  ok(la.length === 17 && !fauxA.length, 'analyse, §2 : ligne, livraison, SENSE, ENTRY, mot, traduction et lot égaux au découpage et aux données', fauxA.map((l) => l.id).join(', ') || String(la.length));
  const crib = new Map(crible.map((c) => [c.id, c])); const reg = (id) => crib.get(id)?.regles.map((g) => g.regle).filter((g) => g !== 'RES').sort().join();
  const fauxR = la.filter((l) => l.regles.split(', ').sort().join() !== reg(l.id) || crib.get(l.id)?.regles.some((g) => g.regle === 'RES') || crib.get(l.id)?.dans147?.length);
  ok(!fauxR.length, 'analyse, §2 : règles égales au criblage ; aucune marque RES ; aucun sens des 147', fauxR.map((l) => l.id).join(', '));
  const b8 = bil.replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '').split('\n').filter((l) => /^\| V[12]-[0-9]+ \|/.test(l));
  const corrDe = (id) => b8.filter((l) => { const c = l.split('|')[2]?.trim().replaceAll('`', ''); return c === id || c === entryDe(id); }).map((l) => l.split('|')[1].trim()).sort();
  const fauxC = la.filter((l) => (l.corr === '—' ? [] : l.corr.split(', ').sort()).join() !== corrDe(l.id).join());
  ok(!fauxC.length, 'analyse, §2 : corrections égales au bilan, sens par sens ; aucune V1-n', fauxC.map((l) => l.id + ' ' + corrDe(l.id).join('+')).join(', '));
  const lesC = [...new Set(ids.flatMap(corrDe))]; ok(lesC.length === 9 && lesC.every((c) => c.startsWith('V2-')) && b8.filter((l) => lesC.includes(l.split('|')[1].trim())).every((l) => /nuance/.test(l.split('|')[5] ?? '')), 'neuf corrections retenues, toutes de `nuance`', lesC.join(', '));
  // Fiches et décisions
  const num = (id) => 'n5_' + entryDe(id); const src = new Map(sources.map((s) => [s.id, s]));
  ok([...new Set(ids.map(num))].every((id) => /interrogati/i.test(src.get(id)?.nuance ?? '')), 'les 15 fiches emploient « interrogatif » dans leur nuance');
  const ents = [...new Set(ids.map(num))]; const dec15 = journal.filter((d) => ents.includes(d.entry));
  ok(dec15.length === 42 && dec15.every((d) => d.status === 'validated') && !dec15.some((d) => /linguistic_functions/.test(String(d.field))), '42 décisions, toutes validées ; aucune sur `linguistic_functions`', String(dec15.length));
  const tn = dec15.filter((d) => d.kind === 'type-nul').map((d) => d.id.replace('A2-04-', '')).sort();
  ok(JSON.stringify(tn) === JSON.stringify(TN) && TN.every((d) => ana.includes(d) || ['D0682', 'D0683'].includes(d)) && ana.includes('D0681 à D0683') && TN.every((d) => per.includes(d)), 'les 17 décisions `type-nul` : identiques au journal, citées par les deux documents', tn.length + ' décisions');
  ok(journal.find((d) => d.id === 'A2-04-D0724')?.reason.includes("誰か n'interroge pas") && !sens.has('x') && !liste.some((l) => l.mot === '誰か'), 'D0724 citée exactement ; 誰か hors des 377');
  // Passages cités, mot pour mot
  const citE = [['proposition', prop, "Chaque attribution est justifiée par la décision qui la pose"], ['proposition', prop, "n'ont pas été essayés sur les données"], ['proposition', prop, "adoption explicite"], ['proposition', prop, "périmètre opérationnel de contrôle"], ['A9', a9, 'non définies'], ['A7', a7, 'un sens qui interroge'], ['A9', a9, 'sens implicite'], ['découpage', dec, "le bloc F ne peut pas être audité avant qu'un addendum la fixe"], ['dossier', dos, 'ils ne peuvent recevoir ni « conforme » ni « écart » avant elle']];
  const mq = citE.filter(([, t, q]) => !base(t).includes(base(q))).map(([n, , q]) => n + ' : ' + q); ok(!mq.length, 'passages cités retrouvés mot pour mot', mq.join(' | '));
  // E5 n'est ni adopté ni exécuté
  ok(!listeAddenda.some((f) => /A1[0-9]/.test(f)) && listeAddenda.length === 9, 'aucun addendum A10 dans `docs/conception/` : A1 à A9 seulement ; numéro libre', listeAddenda.length + ' addenda');
  ok(/\*\*PROPOSITION, non validée, non normative\.\*\*/.test(prop), 'proposition d\'addendum toujours non normative');
  ok(registre.find((t) => t.id === 'F')?.statut === 'suspendue' && JSON.stringify(registre.find((t) => t.id === 'F')?.livraisons) === '["F1","F2"]', 'registre : tranche F, F1 et F2, suspendue');
  ok(/\*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/.test(per) && !/^## 0\. Arbitrage/m.test(per) && /\*\*proposition, non arbitrée\.\*\*/.test(ana), 'les deux documents sont en proposition, sans §0');
  ok(!/\| (conforme|écart|suspendu) \|/.test(ana) && !/\*\*(conforme|écart)\*\* \|/.test(per), 'aucun verdict dans les deux documents');
  ok(!/\bV1-3[2-9]\b/.test(ana + per), 'aucune correction nouvelle : aucun identifiant à partir de V1-32');
  return R;
}
const sb = json('reconstruction/a2-04/sources/vocab.json');
const D = { per: txt(PER), ana: txt(ANA), dec: txt(DEC), bil: txt(BIL), prop: txt(PROP), dos: txt(DOS), vocab: [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')], sources: Array.isArray(sb) ? sb : (sb.vocab ?? sb.items), journal: json('reconstruction/a2-04/journal.json'), crible: json('a2-05-travail/criblage/resultat.json').candidats, registre: json('a2-05-travail/registre-tranches.json').tranches, listeAddenda: readdirSync(join(root, 'docs/conception')).filter((f) => /^addendum-A/.test(f)), a9: txt('docs/conception/addendum-A9-fonctions-linguistiques.md'), a7: txt('docs/conception/addendum-A7-deictique.md') };
const R = controler(D);
const git = (...a) => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8' });
const sous = git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').trim();
R.push({ c: !sous, nom: 'non-régression : data/, reconstruction/, tests/, tools/, docs/conception/ sans modification', d: sous }); R.push({ c: !git('diff', '--cached', '--name-only').trim(), nom: 'index vide' });
R.push({ c: git('rev-parse', 'HEAD').trim() === '78031638c0f81dca1b167e3f57f5a891767fc4cb', nom: 'HEAD à 7803163' });
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const diff = Object.entries(man).filter(([p, h]) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);
R.push({ c: Object.keys(man).length === 45 && !diff.length, nom: 'non-régression : 45 empreintes recalculées, identiques', d: diff.join(', ') });
R.push({ c: !Object.hasOwn(man, PER) && !Object.hasOwn(man, ANA), nom: 'périmètre et analyse hors du manifeste' });
R.push({ c: !existsSync(join(root, 'docs/conception/addendum-A10-interrogatif.md')), nom: 'fichier d\'addendum pressenti absent' });
for (const r of R) console.log((r.c ? 'conforme  ' : 'ÉCART     ') + r.nom + (r.d && !r.c ? ' — ' + r.d : ''));
const ko = R.filter((r) => !r.c).length; console.log('\n' + (R.length - ko) + ' conformes sur ' + R.length);
let sok = true;
if (process.argv.includes('--sabotages')) {
  const clone = (o) => JSON.parse(JSON.stringify(o)); const e = (d, id) => d.vocab.find((x) => x.id === id);
  const S = {
    'sens retiré de l\'analyse': (d) => { d.ana = d.ana.split('\n').filter((l) => !l.includes('`v_400_s1`')).join('\n'); },
    'sens retiré du périmètre': (d) => { d.per = d.per.replace('| `v_402_s1` | 誰 |', '| `v_999_s1` | 誰 |'); },
    'fonction posée sur un autre sens': (d) => { e(d, 'v_700').senses[0].linguistic_functions.grammatical.push('interrogatif'); },
    'fonction retirée d\'un sens': (d) => { e(d, 'v_395').senses[0].linguistic_functions.grammatical = []; },
    'cumul ajouté': (d) => { e(d, 'v_397').senses[0].linguistic_functions.pragmatic_discourse.push('politesse'); },
    'type posé': (d) => { e(d, 'v_391').senses[0].semantic_type = 'concept_abstrait'; },
    'traduction altérée dans l\'analyse': (d) => { d.ana = d.ana.replace('| 何 | Quoi |', '| 何 | Que |'); },
    'correction oubliée dans l\'analyse': (d) => { d.ana = d.ana.replace('| C2-0, C4-0 | V2-139 |', '| C2-0, C4-0 | — |'); },
    'décision dévalidée': (d) => { d.journal.find((x) => x.id === 'A2-04-D0073').status = 'proposed'; },
    'décision de fonction inventée': (d) => { d.journal.find((x) => x.id === 'A2-04-D0043').field = 'sens 1 · linguistic_functions'; },
    'citation altérée': (d) => { d.prop = d.prop.replace('la décision qui la pose', 'une décision'); },
    'addendum A10 présent': (d) => { d.listeAddenda.push('addendum-A10-interrogatif.md'); },
    'proposition devenue normative': (d) => { d.prop = d.prop.replace('**PROPOSITION, non validée, non normative.**', '**Adopté.**'); },
    'tranche F rouverte au registre': (d) => { d.registre.find((t) => t.id === 'F').statut = 'planifiée'; },
    'verdict glissé dans l\'analyse': (d) => { d.ana += '\n| x | conforme |\n'; },
    'statut arbitré': (d) => { d.per = d.per.replace('**proposition de périmètre opérationnel, non arbitrée.**', '**périmètre accepté.**'); },
  };
  let n = 0; for (const [nom, f] of Object.entries(S)) { const d = clone(D); f(d); const x = controler(d).filter((r) => !r.c); if (x.length) n++; console.log((x.length ? 'détecté   ' : 'NON VU    ') + nom + (x.length ? ' — ' + x[0].nom : '')); }
  const tem = !controler(clone(D)).some((r) => !r.c); console.log('témoin sain : ' + (tem ? 'conforme' : 'ÉCART')); console.log(n + ' sabotages détectés sur ' + Object.keys(S).length); sok = tem && n === Object.keys(S).length;
}
process.exit(ko || !sok ? 1 : 0);
