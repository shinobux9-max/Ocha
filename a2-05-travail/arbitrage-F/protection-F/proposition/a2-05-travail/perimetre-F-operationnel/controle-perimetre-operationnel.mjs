// A2-05 · bloc F : contrôle du périmètre opérationnel (A10, §7). Lecture seule ; n'écrit rien. N'exécute aucun filtre de recherche d'omissions : du module
// omissions.mjs, il n'emploie que la construction de la population et la liste des filtres. Ne juge aucun sens.
// Usage : node a2-05-travail/perimetre-F-operationnel/controle-perimetre-operationnel.mjs <racine du dépôt> [--sabotages]. Code 0 si tout est conforme.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { charger, construirePopulation, sourceDe, FILTRES } from './omissions.mjs';
import { couverture } from '../couverture-lot3.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const REP = 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md', DEC = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ID = 'v_[0-9]+_s[0-9]+';
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const cat = (c) => '`' + (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null') + '`';
const entryDe = (id) => id.replace(/_s[0-9]+$/, '');
const GABARITS = { D0073: "Unité grammaticale (interrogatif) : ni entité ni concept désigné, aucun type terminal ne s'applique. Addendum A6.", D0373: "Pronom interrogatif : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何, lot 0). Addendum A6." };
const GAB_COMMUN = "Unité interrogative : ni entité ni concept désigné, aucun type terminal ne s'applique (comme 何 et いくら, lots 0 et 05). Addendum A6.";

function controler(D) {
  const R = []; const ok = (c, nom, d) => R.push({ c: !!c, nom, d: d ?? '' });
  ok(/🔒 validé le 2026-11-03/.test(D.a10) && D.som.includes('addendum-A10-interrogatif.md'), 'A10 validé le 2026-11-03 et inscrit au sommaire');
  // Découpage et frontières
  const liste = [...D.dec.matchAll(new RegExp('^\\| ([0-9]+) \\| ([A-F][0-9]+) \\| `(' + ID + ')` \\| ([^|]+) \\| [^|]+ \\| ([0-9]+) \\|', 'gm'))].map((m) => ({ n: +m[1], liv: m[2], id: m[3], lot: m[5] }));
  const F = liste.filter((l) => /^F[12]$/.test(l.liv)); const ids = F.map((l) => l.id); const f1 = F.filter((l) => l.liv === 'F1'), f2 = F.filter((l) => l.liv === 'F2');
  const ents = (a) => new Set(a.map((l) => entryDe(l.id)));
  ok(liste.length === 377 && F.length === 17 && new Set(ids).size === 17 && F.every((l, k) => l.n === 361 + k) && liste.find((l) => l.n === 360)?.liv === 'E3', 'découpage : 17 lignes distinctes, 361 à 377, contiguës, dernières des 377, bordées par E3', String(F.length));
  ok(f1.length === 11 && ents(f1).size === 9 && f2.length === 6 && ents(f2).size === 6 && ents(F).size === 15 && f1.at(-1)?.n === 371 && f2[0]?.n === 372, 'frontière F1/F2 : F1 11 sens, 9 ENTRY, 361 à 371 ; F2 6 sens, 6 ENTRY, 372 à 377', [f1.length, ents(f1).size, f2.length, ents(f2).size].join(', '));
  ok(![...ents(f1)].some((e) => ents(f2).has(e)), 'aucune ENTRY coupée par la frontière F1/F2');
  ok(JSON.stringify([...D.restants].sort()) === JSON.stringify([...ids].sort()) || (!D.restants.length && ids.every((i) => D.etats[i] === 'arbitré')), 'couverture : les 17 restants du lot 3 sont exactement le bloc F, ou, après son arbitrage, aucun restant et ses 17 sens arbitrés', D.restants.length + ' restants');
  // Exhaustivité, population
  const { pop, porteurs, manquantes } = construirePopulation(D); const P = porteurs.map((p) => p.id).sort();
  ok(JSON.stringify(P) === JSON.stringify([...ids].sort()), 'exhaustivité : porteurs publiés d\'`interrogatif` = les 17 sens du bloc F', P.length + ' porteurs');
  ok(porteurs.every((p) => JSON.stringify(fns(p.s)) === '["interrogatif"]'), 'aucun cumul sur les 17 sens');
  const EP = new Set(porteurs.map((p) => p.e.id)); ok(!pop.some((p) => EP.has(p.e.id)) && EP.size === 15, 'les 15 ENTRY porteuses n\'ont aucun autre sens');
  ok([...EP].every((e) => !(D.fusions[sourceDe(e)] ?? []).length), 'aucune fiche fusionnée vers une ENTRY porteuse');
  const n5 = pop.filter((p) => p.e.level === 'N5').length; const fus = Object.values(D.fusions).flat();
  ok(pop.length + porteurs.length === 824 && pop.length === 807 && n5 === 805 && pop.length - n5 === 2 && new Set(pop.map((p) => p.e.id)).size === 669, 'population : 824 sens publiés, 807 sans la fonction (805 N5, 2 hors JLPT), 669 ENTRY', [pop.length + porteurs.length, pop.length, n5, new Set(pop.map((p) => p.e.id)).size].join(', '));
  ok(!manquantes.length && fus.length === 33 && Object.keys(D.fusions).length === 33 && pop.filter((p) => p.fusionnees.length).length === 45, 'population : toutes les fiches présentes ; 33 fiches fusionnées vers 33 ENTRY, 45 sens', manquantes.join(', '));
  ok(pop.some((p) => p.id === 'v_700_s1') && !pop.some((p) => ids.includes(p.id)), '誰か dans la population ; aucun porteur dans la population');
  // Décisions
  const src15 = [...EP].map(sourceDe); const dec15 = D.journal.filter((d) => src15.includes(d.entry));
  ok(dec15.length === 42 && dec15.every((d) => d.status === 'validated') && !dec15.some((d) => /linguistic_functions/.test(String(d.field))), '42 décisions des 15 ENTRY, toutes validées, aucune sur `linguistic_functions`', String(dec15.length));
  const sens = new Map(porteurs.map((p) => [p.id, p])); const tn = {};
  for (const id of ids) {
    const n = id.match(/_s([0-9]+)$/)[1]; const ds = dec15.filter((d) => d.kind === 'type-nul' && d.entry === sourceDe(entryDe(id)) && d.field === 'sens ' + n + ' · semantic_type');
    tn[id] = ds.length === 1 && ds[0].status === 'validated' && sens.get(id)?.s.semantic_type === null ? ds[0] : null;
  }
  ok(Object.values(tn).every(Boolean) && new Set(Object.values(tn).map((d) => d?.id)).size === 17 && dec15.filter((d) => d.kind === 'type-nul').length === 17, '17 décisions `type-nul` : une par sens, validées, champ `sens N · semantic_type`, type publié nul', Object.entries(tn).filter(([, d]) => !d).map(([i]) => i).join(', '));
  const gab = Object.values(tn).filter(Boolean).filter((d) => d.reason !== (GABARITS[d.id.replace('A2-04-', '')] ?? GAB_COMMUN));
  ok(!gab.length, 'gabarits des raisons : D0073, D0373, et un gabarit commun aux quinze autres', gab.map((d) => d.id).join(', '));
  // Tableau du §2 contre les données, le découpage et le bilan
  const b8 = D.bil.replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '').split('\n').filter((l) => /^\| V[12]-[0-9]+ \|/.test(l));
  const corrDe = (e) => b8.filter((l) => { const c = l.split('|')[2]?.trim().replaceAll('`', ''); return c === e || c.startsWith(e + '_s'); }).map((l) => l.split('|')[1].trim()).sort((a, b) => +a.slice(3) - +b.slice(3));
  const sec2 = D.rep.slice(D.rep.indexOf('## 2. '), D.rep.indexOf('## 3. '));
  const lignes = [...sec2.matchAll(new RegExp('^\\| ([0-9]+) \\| ([0-9]+) \\| (F[12]) \\| `(' + ID + ')` \\| ([^|]+) \\| ([^|]+) \\| ([^|]+) \\| ([^|]+) \\| ([^|]+) \\| (D[0-9]{4}) \\| ([^|]+) \\|$', 'gm'))];
  const faux = lignes.filter((m, k) => {
    const l = F[k], p = sens.get(m[4]); const c = m[11].trim() === '—' ? '' : m[11].trim();
    return !l || !p || +m[1] !== k + 1 || +m[2] !== l.n || m[3] !== l.liv || m[4] !== l.id || m[5].trim() !== p.e.word || m[6].trim() !== p.s.meaning.primary || m[7].trim() !== p.e.linguistic.grammatical_class || m[8].trim() !== cat(p.s.category) || m[9].trim() !== '`null`' || 'A2-04-' + m[10] !== tn[m[4]]?.id || c !== corrDe(p.e.id).join(', ');
  });
  ok(lignes.length === 17 && !faux.length, 'rapport, §2 : 17 lignes égales au découpage, aux données, au journal et au bilan', faux.map((m) => m[4]).join(', ') || String(lignes.length));
  const toutes = [...new Set([...EP].flatMap(corrDe))].sort((a, b) => +a.slice(3) - +b.slice(3)); ok(toutes.join() === 'V2-133,V2-134,V2-135,V2-136,V2-137,V2-138,V2-139,V2-140,V2-141' && b8.filter((l) => toutes.includes(l.split('|')[1].trim())).every((l) => /nuance/.test(l.split('|')[5] ?? '')), 'neuf corrections retenues sur les 15 ENTRY, V2-133 à V2-141, toutes de `nuance`', toutes.join(', '));
  // Gabarits et filtres décrits
  const sec5 = D.rep.slice(D.rep.indexOf('## 5. '), D.rep.indexOf('## 6. ')); ok([...Object.values(GABARITS), GAB_COMMUN].every((g) => sec5.includes('« ' + g + ' »')) && sec5.includes('| D0641, D0652, D0664, D0681, D0682, D0683, D0696, D0705, D0708, D0710, D0712, D0714, D0716, D0718, D0720 |'), 'rapport, §5 : les trois gabarits cités mot pour mot, avec leurs décisions');
  const sec6 = D.rep.slice(D.rep.indexOf('## 6. '), D.rep.indexOf('## 7. ')); const fl = [...sec6.matchAll(/^\| ((?:T[12]-[a-z]+)|X1) \|/gm)].map((m) => m[1]);
  ok(fl.join() === D.filtres.join(), 'rapport, §6 : filtres décrits = filtres du module, dans l\'ordre', fl.join());
  const formes = [...new Set(porteurs.flatMap((p) => [p.e.word, ...(p.e.writings ?? []).map((w) => w.form), ...p.e.readings.map((r) => r.kana)]))].sort();
  const cites = (sec6.match(/porteuses \(([^)]+)\)/)?.[1] ?? '').split(', ').sort(); ok(JSON.stringify(cites) === JSON.stringify(formes), 'rapport, §6 : formes des porteurs citées pour T2-serie = graphies et lectures publiées', formes.length + ' formes');
  ok(['**807 sens**', '805 N5 et 2 hors JLPT, dans 669 ENTRY', '**33 fiches fusionnées, rattachées à 33 ENTRY**, soit 45 sens', '**conforme, 31 vérifications.**'].every((q) => sec6.includes(q)), 'rapport, §6 : chiffres de la population et de l\'essai cités');
  // Statut, absence de verdict et de candidat
  ok(/^\*\*Statut\*\* : \*\*périmètre opérationnel accepté le 2026-11-03 \(§0\)\.\*\* La proposition est conservée telle qu'elle a été livrée\./m.test(D.rep) && /^## 0\. Arbitrage$/m.test(D.rep) && ["J'accepte le périmètre opérationnel du bloc F : 17 sens dans 15 ENTRY, lignes 361 à 377, sans ajout ni retrait.", '**Activer X1**', "Ne prendre aucun verdict lexical avant autorisation distincte d'ouverture de l'audit F."].every((q) => D.rep.includes(q)), 'rapport accepté le 2026-11-03, §0 d\'arbitrage présent, proposition conservée');
  ok(!/\| (conforme|écart|à arbitrer) \|/i.test(D.rep) && !/\bV1-3[2-9]\b/.test(D.rep), 'aucun verdict ; aucune correction nouvelle');
  const t = D.registre.find((x) => x.id === 'F'); ok(t?.statut === 'planifiée' && t.livraison === 'F' && JSON.stringify(t.livraisons) === '["F1","F2"]', 'registre des tranches : F planifiée, une seule livraison F (F1, F2)');
  return R;
}

const D0 = charger(root); const reg = JSON.parse(txt('a2-05-travail/registre-tranches.json')).tranches;
const D = { ...D0, rep: txt(REP), dec: txt(DEC), bil: txt(BIL), a10: txt('docs/conception/addendum-A10-interrogatif.md'), som: txt('docs/conception/00-sommaire.md'), registre: reg, filtres: FILTRES.map(([id]) => id), restants: couverture(root).sens.filter((s) => s.etat !== 'arbitré').map((s) => s.id), etats: Object.fromEntries(couverture(root).sens.map((s) => [s.id, s.etat])) };
const R = controler(D);
const git = (...a) => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8' });
const zones = git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools').trim();
R.push({ c: !zones, nom: 'non-régression : data/, reconstruction/, tests/, tools/ sans modification', d: zones });
R.push({ c: !git('diff', '--cached', '--name-only').trim(), nom: 'index vide' });
R.push({ c: git('rev-parse', 'HEAD').trim() === '39cce138f12c50d32675cc4acff5237883eec0b1', nom: 'HEAD à 39cce13' });
const man = JSON.parse(txt('a2-05-travail/empreintes-rapports-arbitres.json')).empreintes; const diff = Object.entries(man).filter(([p, h]) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);
const cles = Object.keys(man), ordre45 = createHash('sha256').update(cles.slice(0, 45).join('\n')).digest('hex') === '924e9f657f1ef376dd0b4821a5768a4cbfbd4075f7382308f99b3d95b66169db';
R.push({ c: !diff.length && ordre45 && ((cles.length === 45 && !Object.hasOwn(man, REP)) || (cles.length === 47 && cles[45] === 'docs/rapports/etape2-A2-05-volet1-lot3-F.md' && cles[46] === REP)), nom: 'non-régression : empreintes identiques, les 45 premières entrées dans leur ordre ; 45 entrées, périmètre opérationnel hors du manifeste, ou 47, rapport arbitré de F et périmètre opérationnel en 46e et 47e', d: diff.join(', ') || cles.length + ' entrées' });
R.push({ c: !existsSync(join(root, 'a2-05-travail/perimetre-F-operationnel/sorties')), nom: 'aucune sortie de filtrage dans le dépôt' });
for (const r of R) console.log((r.c ? 'conforme  ' : 'ÉCART     ') + r.nom + (r.d && !r.c ? ' — ' + r.d : ''));
const ko = R.filter((r) => !r.c).length; console.log('\n' + (R.length - ko) + ' conformes sur ' + R.length);
let sok = true;
if (process.argv.includes('--sabotages')) {
  const clone = (o) => structuredClone(o); const e = (d, id) => d.vocab.find((x) => x.id === id); const j = (d, id) => d.journal.find((x) => x.id === 'A2-04-' + id);
  const S = {
    'fonction posée sur un autre sens (誰か)': (d) => { e(d, 'v_700').senses[0].linguistic_functions.grammatical.push('interrogatif'); },
    'fonction retirée d\'un sens (どこ)': (d) => { e(d, 'v_395').senses[0].linguistic_functions.grammatical = []; },
    'cumul ajouté (どなた)': (d) => { e(d, 'v_397').senses[0].linguistic_functions.pragmatic_discourse.push('politesse'); },
    'sens non porteur ajouté à une ENTRY porteuse': (d) => { const x = e(d, 'v_401'); x.senses.push({ ...structuredClone(x.senses[0]), id: 'v_401_s2', linguistic_functions: { grammatical: [], pragmatic_discourse: [] } }); },
    'fiche fusionnée vers une ENTRY porteuse': (d) => { d.fusions.n5_v_401 = ['n5_v_1']; },
    'fiche source supprimée': (d) => { d.sources = d.sources.filter((s) => s.id !== 'n5_v_10'); },
    'type posé (いつ)': (d) => { e(d, 'v_391').senses[0].semantic_type = 'concept_abstrait'; },
    'décision `type-nul` dévalidée': (d) => { j(d, 'D0705').status = 'proposed'; },
    'gabarit d\'une raison modifié': (d) => { j(d, 'D0720').reason += ' Fonction interrogative.'; },
    'frontière F1/F2 déplacée': (d) => { d.dec = d.dec.replace(/^\| 372 \| F2 \|/m, '| 372 | F1 |'); },
    'traduction altérée dans le rapport': (d) => { d.rep = d.rep.replace('| 何 | Quoi |', '| 何 | Que |'); },
    'correction oubliée dans le rapport': (d) => { d.rep = d.rep.replace('| D0718 | V2-139 |', '| D0718 | — |'); },
    'filtre ajouté au module sans le rapport': (d) => { d.filtres = [...d.filtres, 'T2-autre']; },
    'verdict glissé dans le rapport': (d) => { d.rep += '\n| v_401_s1 | conforme |\n'; },
    'statut ramené à la proposition': (d) => { d.rep = d.rep.replace(/^\*\*Statut\*\* : [^\n]*$/m, '**Statut** : **proposition de périmètre opérationnel, non arbitrée.**'); },
    'registre revenu à « suspendue »': (d) => { d.registre.find((x) => x.id === 'F').statut = 'suspendue'; },
    'A10 dévalidé': (d) => { d.a10 = d.a10.replace('🔒 validé le 2026-11-03', 'proposé'); },
  };
  let n = 0; for (const [nom, f] of Object.entries(S)) { const d = clone(D); f(d); const x = controler(d).filter((r) => !r.c); if (x.length) n++; console.log((x.length ? 'détecté   ' : 'NON VU    ') + nom + (x.length ? ' — ' + x[0].nom : '')); }
  const tem = !controler(clone(D)).some((r) => !r.c); console.log('témoin sain : ' + (tem ? 'conforme' : 'ÉCART')); console.log(n + ' sabotages détectés sur ' + Object.keys(S).length); sok = tem && n === Object.keys(S).length;
}
process.exit(ko || !sok ? 1 : 0);
