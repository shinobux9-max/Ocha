// A2-05 · recherche d'omissions d'`interrogatif`, temps 3 : dossier factuel du périmètre du groupe C (série, T2-serie), EN PROPOSITION ; aucun verdict.
// Lecture seule sur les données, les sources, le journal, les lots, la mesure, le découpage accepté et le bilan. Pour chaque ENTRY : porteurs dont une forme est
// contenue dans ses graphies (motif du filtre T2-serie), fiches sources en entier, anciens exemples, ENTRY publiée, toutes ses décisions de journal en entier,
// corrections retenues non appliquées, recoupement avec les 377 du lot 3. N'écrit que deux fichiers neufs (refus d'écraser) : perimetre-C.json, dossier-C.md.
// Usage : node a2-05-travail/omissions-temps3/preparer-perimetre-C.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { charger, construirePopulation, sourceDe, FONCTION } from '../perimetre-F-operationnel/omissions.mjs';
import { couverture } from '../couverture-lot3.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', DEC = O + 'decoupage.json', DEC_SHA = '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46';
const MES = 'a2-05-travail/arbitrage-F/mesure-couverture/mesure/mesure.json', MES_SHA = '7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44';
for (const f of ['perimetre-C.json', 'dossier-C.md']) if (existsSync(join(root, O + f))) throw new Error(O + f + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

ok(sha(DEC) === DEC_SHA && sha(MES) === MES_SHA, 'découpage accepté et mesure prise en acte, à leurs empreintes');
const G = JSON.parse(txt(DEC)).groupes; const C = G.C; const M = JSON.parse(txt(MES));
ok(C.sens.length === 3 && C.entry.length === 2, 'groupe C : 3 sens, 2 ENTRY', C.sens.length + ' sens, ' + C.entry.length + ' ENTRY');
ok(C.sens.every((s) => s.filtres.includes('T2-serie') && !s.filtres.some((f) => f.startsWith('T1-') || f === 'T2-journal')), 'groupe C : chaque sens porte T2-serie, aucun ne porte un filtre du temps 1 ni T2-journal');
ok(C.sens.every((s) => JSON.stringify(s.filtres) === JSON.stringify(M.candidats.find((c) => c.id === s.id)?.filtres)), 'filtres d\'origine identiques à la mesure');
ok(!C.entry.some((e) => Object.entries(G).some(([g, x]) => g !== 'C' && x.entry.includes(e))), 'aucune ENTRY du groupe C dans un autre groupe');
const autresSerie = M.candidats.filter((c) => c.filtres.includes('T2-serie') && !C.sens.some((s) => s.id === c.id));
ok(autresSerie.every((c) => Object.entries(G).some(([g, x]) => g < 'C' && x.entry.includes(c.entry))), 'les autres sens relevés par T2-serie sont dans un groupe antérieur (règle de priorité)', autresSerie.map((c) => c.id + ' ' + c.mot).join(', '));
arret();

const Dn = charger(root); const { pop, porteurs } = construirePopulation(Dn);
const parSens = new Map(pop.map((p) => [p.id, p])); const src = new Map(Dn.sources.map((s) => [s.id, s]));
const exemples = JSON.parse(txt('reconstruction/a2-04/sources/exemples.json')).vocab ?? {};
const cov = couverture(root); const lot3 = new Map(cov.sens.map((s) => [s.id, s.livraison]));
const LOTS = 'reconstruction/a2-04/lots/'; const lotDe = new Map();
for (const n of readdirSync(join(root, LOTS)).filter((n) => /^lot-[0-9]+\.json$/.test(n)).sort()) for (const [id, x] of Object.entries(JSON.parse(txt(LOTS + n)).entries)) lotDe.set(id, { lot: n.replace('.json', ''), statut: x.status, journal: x.journal ?? [] });
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md'); const corr = [];
const champ = (l) => (l.split(' | ').slice(2).find((x) => /^`[a-z_.]+`/.test(x.trim())) ?? '?').trim();
for (const l of bilan.slice(0, bilan.search(/^## 7\. /m)).split('\n')) { const r = l.match(/^\| (\d+) \| `((?:hj_)?v_\d+)_s\d+` \|/); if (r) corr.push({ id: 'volet 2, modification ' + r[1], entry: r[2], champ: champ(l) }); }
for (const l of bilan.slice(bilan.search(/^## 8\. /m)).split('\n')) { const r = l.match(/^\| (V[12]-\d+) \| (?:[a-z]+ \| )?`((?:hj_)?v_\d+)(?:_s\d+)?`/); if (r && !corr.some((c) => c.id === r[1])) corr.push({ id: r[1], entry: r[2], champ: champ(l) }); }
ok(corr.length === 204, 'corrections retenues lues dans le bilan : 204', corr.length);
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const graphies = (e) => [e.word, ...(e.writings ?? []).map((w) => w.form)].filter(Boolean);
const formes = (e) => [...graphies(e), ...(e.readings ?? []).map((r) => r.kana)].filter(Boolean);
const entreesP = [...new Set(porteurs.map((p) => p.e))];
const entrees = [];
for (const e of C.entry) {
  const sensC = C.sens.filter((s) => s.entry === e); const p0 = parSens.get(sensC[0].id); const E = p0.e; const source = sourceDe(e); const fiches = [source, ...p0.fusionnees];
  const decl = entreesP.map((pe) => ({ entry: pe.id, mot: pe.word, formes: [...new Set(formes(pe).filter((m) => graphies(E).some((g) => g.includes(m))))], sens: pe.senses.filter((s) => fns(s).includes(FONCTION)).map((s) => s.id + ' ' + s.meaning.primary) })).filter((x) => x.formes.length);
  entrees.push({
    entry: e, mot: E.word, lecture: E.readings?.[0]?.kana ?? null, classe: E.linguistic?.grammatical_class ?? null, porteursDeclencheurs: decl,
    fiches: fiches.map((f) => ({ id: f, presente: src.has(f), lot: lotDe.get(f)?.lot ?? null, statutLot: lotDe.get(f)?.statut ?? null, journalCite: lotDe.get(f)?.journal ?? [], fiche: src.get(f) ?? null, anciensExemples: exemples[f] ?? [] })),
    publiee: E,
    sensPublies: E.senses.map((s) => ({ id: s.id, traduction: s.meaning.primary, categorie: cat(s.category), type: s.semantic_type, fonctions: fns(s), candidatC: sensC.some((x) => x.id === s.id), lot3: lot3.get(s.id) ?? null })),
    decisions: Dn.journal.filter((d) => fiches.includes(d.entry)).map((d) => ({ id: d.id, statut: d.status, lot: d.lot, champ: d.field, nature: d.kind, avant: d.before ?? null, apres: d.after ?? null, raison: d.reason })),
    corrections: corr.filter((c) => c.entry === e).map((c) => c.id + ' (' + c.champ + ')'),
  });
}
ok(entrees.every((x) => x.porteursDeclencheurs.length >= 1), 'C : chaque ENTRY a au moins un porteur dont une forme est contenue dans ses graphies (motif de T2-serie)', entrees.map((x) => x.mot + ' ⊃ ' + x.porteursDeclencheurs.map((p) => p.mot + ' (' + p.entry + ')').join(', ')).join(' ; '));
ok(entrees.every((x) => x.fiches.every((f) => f.presente && f.lot && f.statutLot === 'validated')), 'C : toutes les fiches présentes, chacune dans un lot validé', entrees.reduce((n, x) => n + x.fiches.length, 0) + ' fiches');
ok(entrees.every((x) => x.decisions.length && x.decisions.every((d) => d.statut === 'validated')), 'C : chaque ENTRY a des décisions de journal, toutes validées', entrees.reduce((n, x) => n + x.decisions.length, 0) + ' décisions');
ok(entrees.every((x) => x.fiches.every((f) => JSON.stringify([...f.journalCite].sort()) === JSON.stringify(x.decisions.filter((d) => d.lot === f.lot).map((d) => d.id).sort()))), 'C : les décisions citées par l\'entrée de lot sont celles du journal pour cette fiche');
ok(entrees.every((x) => x.sensPublies.every((s) => !s.fonctions.includes(FONCTION))), 'C : aucun sens de ces ENTRY ne porte la fonction');
const nonCand = entrees.flatMap((x) => x.sensPublies.filter((s) => !s.candidatC).map((s) => s.id));
ok(!nonCand.length, 'C : tous les sens publiés de ces ENTRY sont candidats', nonCand.join(', ') || 'aucun hors candidats');
arret();

writeFileSync(join(root, O + 'perimetre-C.json'), JSON.stringify({ objet: 'Dossier factuel du groupe C, non arbitré ; aucun verdict', decoupage: { chemin: DEC, sha: DEC_SHA }, sens: C.sens, entrees }, null, 1) + '\n');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const clot = (t, lang) => '```' + lang + '\n' + t + '\n```';
const md = ['# Dossier factuel du groupe C (généré ; aucun verdict)', '',
  '## Les 3 sens', '', '| N° | SENSE | ENTRY | Mot | Traduction publiée | Filtres d\'origine | Catégorie publiée | Type | Fonctions | Lot 3 |', '|---|---|---|---|---|---|---|---|---|---|',
  ...C.sens.map((s, i) => { const p = parSens.get(s.id); return '| ' + (i + 1) + ' | `' + s.id + '` | `' + s.entry + '` | ' + cell(p.e.word) + ' | ' + cell(p.s.meaning.primary) + ' | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | `' + cat(p.s.category) + '` | `' + p.s.semantic_type + '` | ' + (fns(p.s).map((f) => '`' + f + '`').join(', ') || '—') + ' | ' + (lot3.get(s.id) ?? '—') + ' |'; }), '',
  '## Motif du filtre T2-serie : porteurs dont une forme est contenue dans une graphie du candidat', '', '| ENTRY | Mot | Porteur | Forme contenue | Sens porteurs d\'`interrogatif` |', '|---|---|---|---|---|',
  ...entrees.flatMap((x) => x.porteursDeclencheurs.map((p) => '| `' + x.entry + '` | ' + x.mot + ' | `' + p.entry + '` ' + p.mot + ' | ' + p.formes.join(', ') + ' | ' + p.sens.map((s) => '`' + s.split(' ')[0] + '` ' + cell(s.split(' ').slice(1).join(' '))).join(' ; ') + ' |')), '',
  'Les porteurs sont cités pour expliquer le filtre ; ils ne sont pas relus.', '',
  '## Les 2 ENTRY : sources, décisions, corrections', '', '| ENTRY | Mot | Classe | Fiche source (lot) | Anciens exemples | Sens publiés | Décisions de journal | Corrections retenues, non appliquées |', '|---|---|---|---|---|---|---|---|',
  ...entrees.map((x) => '| `' + x.entry + '` | ' + cell(x.mot) + ' | `' + x.classe + '` | ' + x.fiches.map((f) => '`' + f.id + '` (' + f.lot + ')').join(' ; ') + ' | ' + x.fiches.reduce((n, f) => n + f.anciensExemples.length, 0) + ' | ' + x.sensPublies.map((s) => '`' + s.id + '`').join(', ') + ' | ' + x.decisions.map((d) => d.id.replace('A2-04-', '')).join(', ') + ' | ' + (x.corrections.join(' ; ') || '—') + ' |'), '',
  ...entrees.flatMap((x) => ['## `' + x.entry + '` ' + x.mot, '',
    ...x.fiches.flatMap((f) => ['### Fiche source `' + f.id + '` (' + f.lot + '), en entier', '', clot(JSON.stringify(f.fiche, null, 1), 'json'), '', '### Anciens exemples de `' + f.id + '` (' + f.anciensExemples.length + '), en entier', '', clot(JSON.stringify(f.anciensExemples, null, 1), 'json'), '']),
    '### ENTRY publiée `' + x.entry + '`, en entier', '', clot(JSON.stringify(x.publiee, null, 1), 'json'), '',
    '### Décisions de journal (' + x.decisions.length + '), en entier', '',
    ...x.decisions.map((d) => '- **' + d.id.replace('A2-04-', '') + '** (' + d.lot + ' ; ' + cell(d.champ) + ' ; ' + d.nature + ' ; avant : `' + cell(JSON.stringify(d.avant)) + '` ; après : `' + cell(JSON.stringify(d.apres)) + '`) : « ' + cell(d.raison) + ' »'), '']), ''];
writeFileSync(join(root, O + 'dossier-C.md'), md.join('\n'));
console.log('écrits : ' + O + 'perimetre-C.json, ' + O + 'dossier-C.md'); console.log('préparation conforme ; aucun verdict');
