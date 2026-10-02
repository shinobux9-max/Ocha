// Ocha v2 — Reconstruction (A2-04) : fichiers de lot et journal
//
// Un fichier de lot (reconstruction/a2-04/lots/<lot>.json) porte les décisions humaines :
//
// {
//   "lot": "lot-00", "title": "…",
//   "entries": {
//     "<identifiant source>": { "status": "proposed" | "validated", "journal": ["A2-04-D0001"],
//                               "fields": { … } }                       // l'entrée est gardée
//     "<identifiant source>": { "status": …, "journal": […],
//                               "retire": { "merged_into": "<identifiant source>" | null } }
//   },
//   "additions": [ { "key": "…", "status": …, "journal": […], "level": "N5" | "hors_jlpt",
//                    "fields": { … } } ]
// }
//
// Seule une décision « validated » est une décision. Une proposition n'est jamais lue comme une
// décision par l'assembleur. Le JSON est la seule source : le rapport Markdown en est généré.
//
// Le journal (reconstruction/a2-04/journal.json) est une liste de décisions notables, chacune
// avec un identifiant stable A2-04-D<nnnn> et son propre statut (arbitrage du 2026-10-02) :
// « proposed » n'a aucun effet normatif et peut être réécrit sous le même identifiant ;
// « validated » seulement fait foi. Une décision de lot validée ne cite que du journal validé.

import { HUMAN_FIELDS, EXCEPTION_FIELDS, CLASS_GROUPS } from './rules.mjs';
import { numberOf, newId } from './mechanical.mjs';

export const STATUSES = Object.freeze(['proposed', 'validated']);
export const JOURNAL_ID = /^A2-04-D[0-9]{4}$/;
export const JOURNAL_KINDS = Object.freeze(['correction', 'fusion', 'retrait', 'exception-fusion', 'abandon', 'ajout', 'decision', 'categorie-nulle']);
const JOURNAL_KEYS = ['id', 'status', 'date', 'lot', 'entry', 'field', 'kind', 'before', 'after', 'reason'];
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const sameKeys = (o, keys) => Object.keys(o).sort().join(',') === [...keys].sort().join(',');

/** Problèmes du journal. Rend aussi l'index identifiant → décision. */
export function checkJournal(journal) {
  const problems = [];
  const byId = new Map();
  if (!Array.isArray(journal)) return { problems: [{ code: 'journal-format', where: 'journal.json', message: 'liste attendue' }], byId };
  journal.forEach((d, i) => {
    const where = `journal.json · ${d?.id ?? i + 1}`;
    if (!isObject(d) || !sameKeys(d, JOURNAL_KEYS)) { problems.push({ code: 'journal-format', where, message: `clés attendues : ${JOURNAL_KEYS.join(', ')}` }); return; }
    if (!JOURNAL_ID.test(d.id)) problems.push({ code: 'journal-format', where, message: 'identifiant A2-04-D<nnnn> attendu' });
    else if (byId.has(d.id)) problems.push({ code: 'journal-format', where, message: 'identifiant en double' });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(d.date))) problems.push({ code: 'journal-format', where, message: 'date AAAA-MM-JJ attendue' });
    if (!JOURNAL_KINDS.includes(d.kind)) problems.push({ code: 'journal-format', where, message: `nature « ${d.kind} » inconnue` });
    if (!STATUSES.includes(d.status)) problems.push({ code: 'journal-format', where, message: `statut parmi ${STATUSES.join(', ')} attendu` });
    if (typeof d.reason !== 'string' || d.reason.trim() === '') problems.push({ code: 'journal-format', where, message: 'raison manquante' });
    if (JOURNAL_ID.test(d.id) && !byId.has(d.id)) byId.set(d.id, d);
  });
  return { problems, byId };
}

const hasFunction = (s) => isObject(s.linguistic_functions)
  && Object.values(s.linguistic_functions).some((l) => Array.isArray(l) && l.length > 0);

// Le journal cité par une décision doit exister ; certaines décisions exigent une nature précise.
function citations(problems, where, decision, journalById) {
  const cited = Array.isArray(decision.journal) ? decision.journal : [];
  if (Object.hasOwn(decision, 'journal') && !Array.isArray(decision.journal)) problems.push({ code: 'lot-format', where, message: '« journal » doit être une liste' });
  for (const id of cited) {
    if (!journalById.has(id)) problems.push({ code: 'journal-inconnu', where, message: `décision « ${id} » absente du journal` });
    else if (decision.status === 'validated' && journalById.get(id).status !== 'validated') {
      problems.push({ code: 'journal-non-valide', where, message: `une décision validée ne cite que du journal validé (« ${id} » est « ${journalById.get(id).status} »)` });
    }
  }
  return cited.filter((id) => journalById.has(id)).map((id) => journalById.get(id));
}

// Champs décidables au-delà des champs humains : les exceptions mécaniques de l'entrée et, pour
// le survivant d'une fusion, la forme usuelle (arbitrage du lot 0, 4.2 b : l'identifiant
// survivant et la forme usuelle sont deux décisions indépendantes). Une forme décidée exige ses
// lectures, dont les furigana dépendent de la forme.
function decidable(pre, { addition, mergeTarget }) {
  if (addition) return [...EXCEPTION_FIELDS];
  const fields = EXCEPTION_FIELDS.filter((f) => pre.exceptions[f]);
  if (mergeTarget) for (const f of ['word', 'readings']) if (!fields.includes(f)) fields.push(f);
  return fields;
}

function checkFields(problems, where, fields, pre, { addition = false, mergeTarget = false, cited = [] } = {}) {
  if (!isObject(fields)) { problems.push({ code: 'lot-format', where, message: '« fields » doit être un objet' }); return; }
  const allowed = new Set([...HUMAN_FIELDS, ...decidable(pre, { addition, mergeTarget })]);
  for (const k of Object.keys(fields)) {
    if (!allowed.has(k)) problems.push({ code: 'decision-hors-frontiere', where, message: `« ${k} » est mécanique pour cette entrée : il ne se décide pas dans un lot` });
  }
  const required = [...HUMAN_FIELDS, ...(addition ? EXCEPTION_FIELDS : EXCEPTION_FIELDS.filter((f) => pre.exceptions[f]))];
  if (Object.hasOwn(fields, 'word') && !required.includes('readings')) required.push('readings');
  for (const k of required) {
    if (!Object.hasOwn(fields, k)) problems.push({ code: 'decision-incomplete', where, message: `champ « ${k} » non décidé` });
  }
  // Le groupe décidé doit être compatible avec la classe (décidée ou mécanique).
  if (Object.hasOwn(fields, 'group')) {
    const cls = fields.grammatical_class ?? pre?.values?.grammatical_class;
    const groups = CLASS_GROUPS[cls];
    if (groups && !(groups.length === 0 ? fields.group === null : groups.includes(fields.group))) {
      problems.push({ code: 'decision-groupe', where, message: `group « ${fields.group} » incompatible avec la classe « ${cls} » (${groups.length ? groups.join(', ') : 'null'})` });
    }
  }
  // Sens : identifiants et particules d'un sens unique sont mécaniques.
  if (Array.isArray(fields.senses)) {
    fields.senses.forEach((s, k) => {
      if (isObject(s) && Object.hasOwn(s, 'id')) problems.push({ code: 'decision-hors-frontiere', where: `${where} · sens ${k + 1}`, message: 'l\'identifiant d\'un sens est mécanique' });
      if (!addition && fields.senses.length === 1 && isObject(s) && Object.hasOwn(s, 'particles')) {
        problems.push({ code: 'decision-hors-frontiere', where: `${where} · sens 1`, message: 'les particules d\'un sens unique sont reprises des sources' });
      }
      // Addendum A5 : un sens lexical sans catégorie (aucune fonction linguistique) exige une
      // décision « categorie-nulle » du journal, sur ce sens précisément.
      if (isObject(s) && s.category === null && !hasFunction(s)) {
        const field = `sens ${k + 1} · category`;
        if (!cited.some((j) => j.kind === 'categorie-nulle' && j.field === field)) {
          problems.push({ code: 'categorie-nulle-injustifiee', where: `${where} · sens ${k + 1}`, message: `category: null pour un sens lexical : décision « categorie-nulle » du journal attendue (champ « ${field} »)` });
        }
      }
    });
  }
}

/**
 * Contrôle des lots : forme, frontière, citations du journal, fusions.
 * @param {object[]} lots contenus des fichiers de lot
 * @param {Map<string, object>} prefills pré-remplissage mécanique, par identifiant source
 * @param {Map<string, object>} journalById
 */
export function checkLots(lots, prefills, journalById) {
  const problems = [];
  const decidedIn = new Map();
  // Survivants de fusion : toute entrée qu'une décision de retrait désigne comme merged_into.
  const mergeTargets = new Set(lots.flatMap((l) => Object.values(isObject(l?.entries) ? l.entries : {}))
    .map((d) => d?.retire?.merged_into).filter((x) => typeof x === 'string'));
  for (const lot of lots) {
    const lw = `lot ${lot?.lot ?? '?'}`;
    if (!isObject(lot) || typeof lot.lot !== 'string' || typeof lot.title !== 'string' || !isObject(lot.entries)) {
      problems.push({ code: 'lot-format', where: lw, message: 'objet { lot, title, entries, additions? } attendu' });
      continue;
    }
    const extra = Object.keys(lot).filter((k) => !['lot', 'title', 'entries', 'additions'].includes(k));
    if (extra.length) problems.push({ code: 'lot-format', where: lw, message: `clé(s) inconnue(s) : ${extra.join(', ')}` });
    for (const [oldId, d] of Object.entries(lot.entries)) {
      const where = `${lw} · ${oldId}`;
      const start = problems.length;
      checkEntryDecision(problems, where, oldId, d, lot, prefills, journalById, decidedIn, mergeTargets);
      // Chaque problème désigne l'entrée concernée : l'assembleur écarte cette entrée seule.
      for (let i = start; i < problems.length; i += 1) problems[i].entry = oldId;
    }
    for (const [i, a] of (lot.additions ?? []).entries()) {
      const where = `${lw} · ajout ${a?.key ?? i + 1}`;
      const start = problems.length;
      checkAddition(problems, where, a, journalById);
      for (let k = start; k < problems.length; k += 1) problems[k].addition = `${lot.lot}:${a?.key}`;
    }
  }
  return { problems, decidedIn };
}

// Décision sur une entrée source : gardée (« fields ») ou retirée (« retire »).
function checkEntryDecision(problems, where, oldId, d, lot, prefills, journalById, decidedIn, mergeTargets) {
  const pre = prefills.get(oldId);
  if (!pre) { problems.push({ code: 'decision-inconnue', where, message: 'aucune entrée source de ce nom' }); return; }
  if (decidedIn.has(oldId)) problems.push({ code: 'decision-double', where, message: `déjà décidée dans ${decidedIn.get(oldId)}` });
  decidedIn.set(oldId, lot.lot);
  if (!isObject(d) || !STATUSES.includes(d.status)) { problems.push({ code: 'lot-format', where, message: `statut parmi ${STATUSES.join(', ')} attendu` }); return; }
  const keys = Object.keys(d).filter((k) => !['status', 'journal'].includes(k));
  if (keys.length !== 1 || !['fields', 'retire'].includes(keys[0])) {
    problems.push({ code: 'lot-format', where, message: 'exactement « fields » (entrée gardée) ou « retire » (entrée retirée)' });
    return;
  }
  const cited = citations(problems, where, d, journalById);
  if (keys[0] === 'fields') { checkFields(problems, where, d.fields, pre, { mergeTarget: mergeTargets.has(oldId), cited }); return; }
  // Retrait : fusion vers une entrée source, ou suppression sans successeur.
  const r = d.retire;
  if (!isObject(r) || !sameKeys(r, ['merged_into'])) { problems.push({ code: 'lot-format', where, message: '« retire » : { merged_into } attendu' }); return; }
  if (r.merged_into === null) {
    if (!cited.some((j) => j.kind === 'retrait')) problems.push({ code: 'journal-requis', where, message: 'un retrait doit citer une décision « retrait » du journal' });
    return;
  }
  if (!prefills.has(r.merged_into) || r.merged_into === oldId) { problems.push({ code: 'fusion-invalide', where, message: `merged_into « ${r.merged_into} » : entrée source inconnue` }); return; }
  if (!cited.some((j) => j.kind === 'fusion')) problems.push({ code: 'journal-requis', where, message: 'une fusion doit citer une décision « fusion » du journal' });
  // Règle des fusions (addendum A3) : le plus petit numéro survit, sauf exception justifiée.
  if (numberOf(newId(r.merged_into)) > numberOf(pre.id) && !cited.some((j) => j.kind === 'exception-fusion')) {
    problems.push({ code: 'fusion-invalide', where, message: `le plus petit numéro survit : « ${oldId} » devrait être gardé, ou l'exception justifiée au journal` });
  }
}

function checkAddition(problems, where, a, journalById) {
  const keys = isObject(a) ? Object.keys(a).sort().join(',') : '';
  if (!isObject(a) || typeof a.key !== 'string' || !STATUSES.includes(a.status) || !['N5', 'hors_jlpt'].includes(a.level)
    || keys !== 'fields,journal,key,level,status') {
    problems.push({ code: 'lot-format', where, message: 'ajout { key, status, journal, level, fields } attendu' });
    return;
  }
  const cited = citations(problems, where, a, journalById);
  if (!cited.some((j) => j.kind === 'ajout')) problems.push({ code: 'journal-requis', where, message: 'un ajout doit citer une décision « ajout » du journal' });
  checkFields(problems, where, a.fields, { exceptions: {}, values: {} }, { addition: true, cited });
}
