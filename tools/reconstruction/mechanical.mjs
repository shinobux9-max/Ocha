// Ocha v2 — Reconstruction (A2-04) : couche mécanique
//
// Calcule, à partir des seules sources, ce que la frontière déclare mécanique, et signale les
// exceptions. Elle ne décide rien : une ambiguïté devient une exception, tranchée dans un lot.
// Aucune donnée n'est inventée : pas de sens, pas de classification, pas de tag canonique (les
// tags de lieu ne sont que des CANDIDATS proposés à la décision humaine).

import { parseFurigana } from '../lexicon/index.mjs';
import { KANA_READING } from '../lexicon/schema.mjs';
import {
  HJ_IDS, TYPE_CLASS, NUMERAL_IDS, CLASS_EXCEPTION_IDS, WORD_EXCEPTION_IDS, CLASS_GROUPS, IDENTITY_GROUPS
} from './rules.mjs';

/** Nouvel identifiant d'une entrée source (addendum A3) : n5_v_<n> → v_<n>, hors JLPT par table. */
export function newId(oldId) {
  if (Object.hasOwn(HJ_IDS, oldId)) return HJ_IDS[oldId];
  const m = /^n5_v_([1-9][0-9]*)$/.exec(oldId);
  if (!m) throw new Error(`identifiant source inattendu : « ${oldId} »`);
  return `v_${m[1]}`;
}

/** Numéro d'un identifiant v_<n>. */
export const numberOf = (id) => Number(/^v_([0-9]+)$/.exec(id)?.[1] ?? NaN);

const IDENTITY = new Set(IDENTITY_GROUPS.flat());

/** Entrée du lot 0 : doublon candidat, ou forme ou lecture contenant « / ». */
export const isIdentityEntry = (source) =>
  IDENTITY.has(source.id) || String(source.word).includes('/') || String(source.reading).includes('/');

// Furigana repris tels quels, ou après retrait des espaces de découpage, SEULEMENT si la
// structure est valide et que son texte de base est exactement la forme. Sinon : exception.
function mechanicalFurigana(furigana, word) {
  if (typeof furigana !== 'string') return null;
  for (const candidate of [furigana, furigana.replace(/[ \u3000]/g, '')]) {
    const parsed = parseFurigana(candidate);
    if (!parsed.error && parsed.base === word) return candidate;
  }
  return null;
}

/**
 * Pré-remplissage mécanique d'une entrée source.
 * @param {object} source entrée de l'ancien vocabulaire
 * @param {{ level: string, lieux: object[], placeTags: Record<string, string> }} ctx
 *   placeTags : correspondance décidée lieu → tag (reconstruction/a2-04/place-tags.json)
 * @returns {{ oldId, id, level, values, exceptions, tagCandidates, sourceParticles, identity }}
 *   values : valeurs mécaniques (word, readings, grammatical_class, group) des champs sans
 *   exception ; exceptions : champ → raison, pour les champs à décider.
 */
export function prefill(source, { level, lieux, placeTags }) {
  const values = {};
  const exceptions = {};

  // Forme usuelle
  if (String(source.word).includes('/')) exceptions.word = 'forme contenant « / »';
  else if (Object.hasOwn(WORD_EXCEPTION_IDS, source.id)) exceptions.word = 'graphie fautive connue';
  else values.word = source.word;

  // Lectures : une seule lecture, kana valides, furigana cohérents ; sinon exception.
  if (exceptions.word) exceptions.readings = 'dépend de la forme, en exception';
  else if (String(source.reading).includes('/')) exceptions.readings = 'lecture contenant « / » (aucun découpage automatique)';
  else if (!KANA_READING.test(String(source.reading))) exceptions.readings = `lecture « ${source.reading} » hors kana`;
  else {
    const furigana = mechanicalFurigana(source.word_furigana, source.word);
    if (furigana === null) exceptions.readings = 'furigana incohérents avec la forme';
    else values.readings = [{ kana: source.reading, romaji: source.romaji, furigana, default: true, note: null }];
  }

  // Classe grammaticale : liste explicite des nombres, table des anciens types, exceptions.
  if (Object.hasOwn(NUMERAL_IDS, source.id)) values.grammatical_class = 'numeral';
  else if (Object.hasOwn(CLASS_EXCEPTION_IDS, source.id)) exceptions.grammatical_class = 'classe à décider (liste consignée)';
  else if (!Object.hasOwn(TYPE_CLASS, source.type)) exceptions.grammatical_class = `ancien type inconnu « ${source.type} »`;
  else if (TYPE_CLASS[source.type] === null) exceptions.grammatical_class = `ancien type « ${source.type} » sans classe par défaut`;
  else values.grammatical_class = TYPE_CLASS[source.type];

  // Groupe : repris s'il est compatible avec la classe ; null pour une classe sans groupe.
  if (exceptions.grammatical_class) exceptions.group = 'dépend de la classe, en exception';
  else {
    const allowed = CLASS_GROUPS[values.grammatical_class];
    if (allowed.length === 0) values.group = null;
    else if (allowed.includes(source.group)) values.group = source.group;
    else exceptions.group = `ancien group « ${source.group} » incompatible avec la classe « ${values.grammatical_class} »`;
  }

  // Tags de lieu : candidats seulement, par la correspondance explicite lieu → tag.
  const tagCandidates = new Set();
  for (const lieu of lieux) {
    if (Array.isArray(lieu.vocab_categories) && lieu.vocab_categories.includes(source.category)) {
      if (!Object.hasOwn(placeTags, lieu.id)) throw new Error(`lieu « ${lieu.id} » sans tag dans place-tags.json`);
      tagCandidates.add(placeTags[lieu.id]);
    }
  }
  for (const place of source.places || []) {
    if (!Object.hasOwn(placeTags, place)) throw new Error(`lieu « ${place} » sans tag dans place-tags.json`);
    tagCandidates.add(placeTags[place]);
  }

  return {
    oldId: source.id,
    id: newId(source.id),
    level,
    values,
    exceptions,
    tagCandidates: [...tagCandidates],
    sourceParticles: Array.isArray(source.particles) ? [...source.particles] : [],
    identity: isIdentityEntry(source)
  };
}

/** Pré-remplissage de toutes les sources. */
export function prefillAll(sources) {
  const out = new Map();
  const ctx = { lieux: sources.lieux, placeTags: sources.placeTags };
  for (const s of sources.vocab) out.set(s.id, prefill(s, { ...ctx, level: 'N5' }));
  for (const s of sources.hj) out.set(s.id, prefill(s, { ...ctx, level: 'hors_jlpt' }));
  return out;
}
