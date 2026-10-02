// Ocha v2 — Reconstruction (A2-04) : assembleur
//
// Construit le lexique candidat à partir des sources (couche mécanique) et des décisions de lot
// VALIDÉES. Verrou central : une ENTRY n'entre dans la sortie que si sa décision est validée et
// sans problème. Une proposition n'est jamais lue comme une décision.
//
// Deux modes :
//   - partial : seules les entrées décidées sont assemblées ; une relation ou une fusion qui vise
//     une entrée pas encore assemblée est mise EN ATTENTE (signalée, retirée de la copie validée,
//     sa forme locale étant vérifiée ici) ; les références (I19) ne sont pas contrôlées ;
//   - complete : chaque entrée source doit être décidée ; I12 et I19 s'appliquent à tout.
// La sortie n'est jamais écrite dans data/ : la publication (A2-04.17) est une opération à part.

import { prefillAll, newId, numberOf } from './mechanical.mjs';
import { checkJournal, checkLots } from './decisions.mjs';
import { RESERVED_RETIRED } from './rules.mjs';
import { validateLexicon, buildRegistryIndex } from '../lexicon/index.mjs';
import { RELATION_SHAPE, checkShape } from '../lexicon/schema.mjs';

const SENSE_KEYS = ['meaning', 'category', 'semantic_type', 'dimensions', 'relations', 'linguistic_functions', 'tags', 'particles', 'nuance'];

// ENTRY canonique, dans l'ordre du schéma : mécanique + décision.
function buildEntry(id, level, pre, fields, sourceParticles) {
  const value = (k) => (Object.hasOwn(fields, k) ? fields[k] : pre.values[k]);
  const senses = fields.senses.map((s, k) => {
    const sense = { id: `${id}_s${k + 1}` };
    for (const key of SENSE_KEYS) if (Object.hasOwn(s, key)) sense[key] = s[key];
    // Particules d'un sens unique : reprises des sources (mécanique).
    if (fields.senses.length === 1 && sourceParticles.length > 0) sense.particles = [...sourceParticles];
    return sense;
  });
  return {
    id, level,
    word: value('word'),
    writings: fields.writings,
    readings: value('readings'),
    linguistic: {
      grammatical_class: value('grammatical_class'), group: value('group'),
      suru_compatible: fields.suru_compatible, suffix: fields.suffix, counter: fields.counter
    },
    nuance: fields.nuance,
    tags: fields.tags,
    retired_sense_ids: [],
    senses
  };
}

/**
 * @param {{ sources: { vocab: object[], hj: object[], lieux: object[] }, lots: object[], journal: object[], mode?: 'partial'|'complete' }} input
 */
export function assemble({ sources, lots, journal, mode = 'partial' }) {
  const prefills = prefillAll(sources);
  const j = checkJournal(journal);
  const { problems: lotProblems } = checkLots(lots, prefills, j.byId);
  const problems = [...j.problems, ...lotProblems];
  const badEntries = new Set(lotProblems.filter((p) => p.entry).map((p) => p.entry));
  const badAdditions = new Set(lotProblems.filter((p) => p.addition).map((p) => p.addition));

  // Décisions validées, par entrée source.
  const decided = new Map();
  for (const lot of lots) for (const [oldId, d] of Object.entries(lot?.entries ?? {})) if (d?.status === 'validated') decided.set(oldId, d);

  const excluded = [];
  const kept = new Map();      // identifiant source → ENTRY
  const retiring = [];         // { oldId, merged_into (source) | null }
  for (const [oldId, pre] of prefills) {
    const d = decided.get(oldId);
    const proposed = lots.some((lot) => lot?.entries?.[oldId]?.status === 'proposed');
    if (!d) { excluded.push({ entry: oldId, reason: proposed ? 'proposition non validée' : 'non décidée' }); continue; }
    if (badEntries.has(oldId)) { excluded.push({ entry: oldId, reason: 'décision en erreur' }); continue; }
    if (d.retire) { retiring.push({ oldId, merged_into: d.retire.merged_into }); continue; }
    kept.set(oldId, buildEntry(pre.id, pre.level, pre, d.fields, pre.sourceParticles));
  }

  // Identifiants retirés : réservés, puis fusions et suppressions dont le successeur est présent.
  const retired = RESERVED_RETIRED.map((r) => ({ ...r }));
  const idMap = {};
  for (const [oldId, e] of kept) idMap[oldId] = e.id;
  const pending = [];
  for (const r of retiring) {
    if (r.merged_into !== null && !kept.has(r.merged_into)) {
      pending.push({ entry: r.oldId, reason: `fusion vers « ${r.merged_into} », pas encore assemblée` });
      continue;
    }
    retired.push({ id: newId(r.oldId), merged_into: r.merged_into === null ? null : newId(r.merged_into) });
    idMap[r.oldId] = r.merged_into === null ? null : newId(r.merged_into);
  }

  // Ajouts : identifiant = max(identifiants actifs ∪ retirés) + 1, au moment de l'assemblage.
  // Les identifiants actifs comprennent tous ceux des entrées sources, décidées ou non, pour
  // qu'un ajout ne prenne jamais le numéro d'une entrée encore à décider.
  let next = Math.max(...[...prefills.values()].map((p) => numberOf(p.id)), ...retired.map((r) => numberOf(r.id))) + 1;
  const added = [];
  const orderedLots = [...lots].filter((l) => typeof l?.lot === 'string').sort((a, b) => a.lot.localeCompare(b.lot));
  for (const lot of orderedLots) {
    for (const a of lot.additions ?? []) {
      if (a?.status !== 'validated' || badAdditions.has(`${lot.lot}:${a.key}`)) continue;
      const id = `v_${next++}`;
      added.push({ level: a.level, entry: buildEntry(id, a.level, { values: {} }, a.fields, []) });
    }
  }

  // Fichiers, dans l'ordre des sources.
  const n5 = sources.vocab.map((s) => kept.get(s.id)).filter(Boolean).concat(added.filter((a) => a.level === 'N5').map((a) => a.entry));
  const hj = sources.hj.map((s) => kept.get(s.id)).filter(Boolean).concat(added.filter((a) => a.level === 'hors_jlpt').map((a) => a.entry));

  if (mode === 'complete') {
    for (const x of excluded) problems.push({ code: 'assemblage-incomplet', where: x.entry, message: x.reason });
    for (const p of pending) problems.push({ code: 'assemblage-incomplet', where: p.entry, message: p.reason });
  }
  return {
    mode,
    files: [{ file: 'n5/vocab.json', level: 'N5', entries: n5 }, { file: 'vocab-hors-jlpt.json', level: 'hors_jlpt', entries: hj }],
    retired, idMap, excluded, pending, problems
  };
}

/**
 * Valide un assemblage avec le validateur lexical.
 * @param {object} assembly résultat de assemble()
 * @param {{ registries, knownKanji, particles, expressions?, lieux? }} deps dépendances (adaptateur)
 * @param {{ references?: object[] }} [options] références au vocabulaire, AVEC LES NOUVEAUX
 *   IDENTIFIANTS (voir remapReferences) ; seulement en mode complete
 */
export function validateAssembly(assembly, deps, { references } = {}) {
  const problems = [];
  const pending = [];
  let files = assembly.files;
  if (assembly.mode === 'partial') {
    // Relations vers une ENTRY pas encore assemblée : en attente, forme locale vérifiée ici. Une
    // relation vers un sens inexistant d'une ENTRY déjà assemblée reste une erreur (I12).
    const present = new Set(files.flatMap((f) => f.entries).map((e) => e.id));
    const index = buildRegistryIndex(deps.registries);
    const local = { error: (code, where, message) => problems.push({ code, where, message }) };
    files = files.map((f) => ({ ...f, entries: f.entries.map((e) => ({ ...e, senses: e.senses.map((s) => {
      if (!Array.isArray(s.relations)) return s;
      const keep = [];
      for (const r of s.relations) {
        const targetEntry = typeof r?.target === 'string' ? /^(v_[0-9]+)_s[0-9]+$/.exec(r.target)?.[1] : undefined;
        if (targetEntry && !present.has(targetEntry)) {
          const where = `${f.file} · ${s.id}`;
          if (checkShape(local, where, r, RELATION_SHAPE, 'relation') && index.relationType(r.type) === null) {
            local.error('relation-inconnue', where, `type de relation « ${r.type} » absent du registre`);
          }
          pending.push({ entry: e.id, reason: `relation « ${r.type} » vers « ${r.target} » en attente` });
        } else keep.push(r);
      }
      return { ...s, relations: keep };
    }) })) }));
  }
  const input = { files, registries: deps.registries, retired: assembly.retired, knownKanji: deps.knownKanji, particles: deps.particles };
  if (assembly.mode === 'complete') {
    if (deps.expressions) input.expressions = deps.expressions;
    if (deps.lieux) input.lieux = deps.lieux;
    if (references) input.references = references;
  }
  const report = validateLexicon(input);
  return { errors: [...problems, ...report.errors], warnings: report.warnings, infos: report.infos, pending };
}

/** Remplace les anciens identifiants des références par les nouveaux (fusions comprises). */
export function remapReferences(references, idMap) {
  const out = [];
  const unknown = [];
  for (const r of references) {
    if (!Object.hasOwn(idMap, r.vocab) || idMap[r.vocab] === null) unknown.push(r);
    else out.push({ ...r, vocab: idMap[r.vocab] });
  }
  return { references: out, unknown };
}
