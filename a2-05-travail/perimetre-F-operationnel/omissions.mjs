// A2-05 · bloc F : recherche des omissions d'`interrogatif` (A10, §8), temps 1 et 2. PRÉPARÉ : jamais exécuté sur les données réelles avant l'accord sur le
// périmètre opérationnel. Un filtre ne vaut jamais preuve : il désigne des sens à relire (temps 3), rien de plus. Fonctions pures, aucune écriture.
// La construction de la population n'est pas un filtre : le contrôle du périmètre l'emploie pour compter les 807 sens. La ligne de commande refuse de filtrer
// sans `--execution-autorisee`, réservé à l'exécution réelle, sur autorisation distincte.
// Usage : node a2-05-travail/perimetre-F-operationnel/omissions.mjs <racine du dépôt> --execution-autorisee [--avec-X1]
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { HJ_IDS } from '../../tools/reconstruction/rules.mjs';

export const FONCTION = 'interrogatif';
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const nettoyer = (t) => String(t ?? '').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/\*+/g, '');
// Mots interrogatifs français (A10, §8, temps 1) : qui, que (et sa forme élidée qu'), quoi, quel et ses formes, lequel et ses formes, où, quand, comment, pourquoi, combien
export const MOTS_FR = ['qui', 'que', 'quoi', 'quel', 'quelle', 'quels', 'quelles', 'lequel', 'laquelle', 'lesquels', 'lesquelles', 'auquel', 'auxquels', 'auxquelles', 'duquel', 'desquels', 'desquelles', 'où', 'quand', 'comment', 'pourquoi', 'combien'];
const RE_MOTS = new RegExp("(?<!\\p{L})(?:qu['’](?=\\p{L})|(?:" + MOTS_FR.join('|') + ')(?!\\p{L}))', 'iu');
const RE_RADICAUX = /interrog|question|demand/i, RE_POINT = /[?？]/, RE_X1 = /question|interrog/i;
const CLASSES = ['pronom', 'determinant', 'adverbe'];

// Textes d'un sens : fiche source de l'ENTRY et fiches retirées par fusion vers elle ; valeurs publiées. Les exemples ne sont jamais lus par un filtre.
const textes = (p) => {
  const f = p.fiches; return {
    type: f.map((x) => x.type), traductions: [...f.flatMap((x) => [x.meanings?.primary, ...(x.meanings?.secondary ?? [])]), p.s.meaning.primary, ...(p.s.meaning.alternatives ?? [])].map(nettoyer),
    nuances: [...f.map((x) => x.nuance), p.e.nuance, p.s.nuance].map(nettoyer), categories: f.flatMap((x) => [x.category, x.subcategory]).map(nettoyer),
  };
};
const un = (l, re) => l.some((t) => re.test(t));

// id, temps, libellé, prédicat ; X1 est proposé hors A10 et n'est appliqué que sur option
export const FILTRES = [
  ['T1-radicaux', 1, 'radicaux « interrog », « question », « demand » dans le type, les traductions ou les nuances', (p, t) => un([...t.type, ...t.traductions, ...t.nuances], RE_RADICAUX)],
  ['T1-point', 1, "point d'interrogation dans une traduction ou une nuance", (p, t) => un([...t.traductions, ...t.nuances], RE_POINT)],
  ['T1-mots', 1, 'mot interrogatif français dans une traduction', (p, t) => un(t.traductions, RE_MOTS)],
  ['T2-classe', 2, 'ENTRY de classe `pronom`, `determinant` ou `adverbe`', (p) => CLASSES.includes(p.e.linguistic?.grammatical_class)],
  ['T2-nuls', 2, 'sens sans catégorie ou sans type, sans aucune fonction', (p) => (p.s.category === null || p.s.semantic_type === null) && !fns(p.s).length],
  ['T2-serie', 2, "ENTRY dont une graphie contient une graphie ou une lecture d'une ENTRY porteuse", (p, t, ctx) => ctx.formes.some((m) => p.graphies.some((x) => x.includes(m)))],
  ['T2-journal', 2, 'ENTRY dont une décision de journal emploie le vocabulaire de la question', (p, t, ctx) => ctx.journalQ.has(p.source)],
  ['X1', 0, 'catégorie ou sous-catégorie de la fiche source nommant la question (proposé, hors A10)', (p, t) => un(t.categories, RE_X1)],
];

export function charger(root) {
  const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
  const fusions = {}; const L = 'reconstruction/a2-04/lots/';
  for (const n of readdirSync(join(root, L)).filter((n) => /^lot-[0-9]+\.json$/.test(n))) for (const [id, e] of Object.entries(json(L + n).entries)) if (e.retire?.merged_into) (fusions[e.retire.merged_into] ??= []).push(id);
  return { vocab: [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')], sources: [...json('reconstruction/a2-04/sources/vocab.json'), ...json('reconstruction/a2-04/sources/vocab-hors-jlpt.json')], fusions, journal: json('reconstruction/a2-04/journal.json') };
}

// Fiche source d'une ENTRY publiée : `n5_<id>`, ou la clé hors JLPT dont `HJ_IDS` (règles de la reconstruction) donne l'identifiant publié
const HJ_SOURCE = Object.fromEntries(Object.entries(HJ_IDS).map(([s, v]) => [v, s]));
export const sourceDe = (id) => HJ_SOURCE[id] ?? 'n5_' + id;
// Graphies (mot et graphies) et formes (graphies et lectures) ; les lectures du candidat ne sont pas comparées : どう relèverait 動物 (どうぶつ)
const graphiesDe = (e) => [e.word, ...(e.writings ?? []).map((w) => w.form)].filter((x) => typeof x === 'string' && x);
const formesDe = (e) => [...graphiesDe(e), ...(e.readings ?? []).map((r) => r.kana)].filter((x) => typeof x === 'string' && x);

// Population (A10, §8) : tous les SENSE publiés qui ne portent pas la fonction, avec leurs fiches ; les porteurs sont rendus à part
export function construirePopulation(D) {
  const src = new Map(D.sources.map((s) => [s.id, s])); const pop = [], porteurs = [], manquantes = [];
  for (const e of D.vocab) {
    const source = sourceDe(e.id); const ids = [source, ...(D.fusions[source] ?? [])]; const fiches = ids.map((i) => src.get(i)).filter(Boolean);
    if (fiches.length !== ids.length) manquantes.push(...ids.filter((i) => !src.has(i)));
    for (const s of e.senses) (fns(s).includes(FONCTION) ? porteurs : pop).push({ id: s.id, e, s, source, fiches, fusionnees: ids.slice(1), graphies: graphiesDe(e) });
  }
  return { pop, porteurs, manquantes };
}

// Temps 1 et 2 : chaque filtre est appliqué à chaque sens ; un sens relevé est compté une fois, avec tous ses filtres d'origine
export function relever(D, { avecX1 = false } = {}) {
  const { pop, porteurs } = construirePopulation(D);
  const entreesP = [...new Set(porteurs.map((p) => p.e))]; const formes = [...new Set(entreesP.flatMap(formesDe))];
  const idsP = new Set(entreesP.map((e) => e.id));
  const journalQ = new Set(D.journal.filter((d) => RE_RADICAUX.test([d.reason, JSON.stringify(d.before ?? ''), JSON.stringify(d.after ?? '')].join(' '))).map((d) => d.entry));
  const ctx = { formes, journalQ }; const actifs = FILTRES.filter(([id]) => id !== 'X1' || avecX1);
  const candidats = [];
  for (const p of pop) {
    const t = textes(p); const f = actifs.filter(([id, , , pr]) => (id === 'T2-serie' && idsP.has(p.e.id) ? false : pr(p, t, ctx))).map(([id]) => id);
    if (f.length) candidats.push({ id: p.id, entry: p.e.id, mot: p.e.word, traduction: p.s.meaning.primary, filtres: f });
  }
  const parFiltre = Object.fromEntries(actifs.map(([id]) => [id, candidats.filter((c) => c.filtres.includes(id)).length]));
  const t1 = candidats.filter((c) => c.filtres.some((f) => f.startsWith('T1-'))).length;
  return { population: pop.length, porteurs: porteurs.length, parFiltre, releves: candidats.length, parTemps1: t1, seulementTemps2: candidats.length - t1, nonReleves: pop.length - candidats.length, candidats };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const args = process.argv.slice(2); const root = resolve(args[0] ?? ''); if (!args[0]) throw new Error('argument attendu : racine du dépôt');
  if (!args.includes('--execution-autorisee')) { console.error("refus : la recherche d'omissions n'est pas autorisée ; aucun filtre exécuté (A10, §7 : accord préalable sur le périmètre opérationnel)"); process.exit(2); }
  console.log(JSON.stringify(relever(charger(root), { avecX1: args.includes('--avec-X1') }), null, 1));
}
