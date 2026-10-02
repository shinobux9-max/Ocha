// Aides des tests de la reconstruction (A2-04 · 5.0).
//
// Les décisions construites ici sont ILLUSTRATIVES : elles servent à éprouver l'infrastructure et
// ne décident rien du contenu des vraies entrées. Aucun fichier de lot n'est créé par les tests.

import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readSources } from '../../tools/reconstruction/sources.mjs';
import { prefillAll } from '../../tools/reconstruction/mechanical.mjs';
import { readLexiconDependencies } from '../../tools/lexicon-adapter.mjs';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const WORK = join(ROOT, 'reconstruction', 'a2-04');
export const SOURCES = readSources(join(WORK, 'sources'));
export const PREFILLS = prefillAll(SOURCES);
export const DEPS = readLexiconDependencies(join(ROOT, 'data'));

export const sense = (extra = {}) => ({
  meaning: { primary: 'Illustratif', alternatives: [] },
  category: { level_1: 'temps' },
  semantic_type: 'propriete',
  dimensions: [],
  relations: [],
  linguistic_functions: { grammatical: [], pragmatic_discourse: [] },
  tags: [],
  nuance: null,
  ...extra
});

// Décision complète et valide pour une entrée source : champs humains, plus les champs en
// exception, remplis de valeurs illustratives.
export function fieldsFor(oldId, extra = {}) {
  const pre = PREFILLS.get(oldId);
  const fields = { writings: [], suru_compatible: false, suffix: false, counter: null, nuance: null, tags: [], senses: [sense()] };
  if (pre.exceptions.word) fields.word = 'たかい';
  if (pre.exceptions.readings) fields.readings = [{ kana: 'たかい', romaji: 'takai', furigana: 'たかい', default: true, note: null }];
  if (pre.exceptions.grammatical_class) fields.grammatical_class = 'adverbe';
  if (pre.exceptions.group) fields.group = null;
  return { ...fields, ...extra };
}

export const validated = (fields, journal) => ({ status: 'validated', ...(journal ? { journal } : {}), fields });
export const lot = (entries, extra = {}) => ({ lot: 'lot-test', title: 'Essai', entries, ...extra });
export const journalEntry = (id, kind, entry = 'n5_v_1', extra = {}) => ({
  id, status: 'validated', date: '2026-10-02', lot: 'lot-test', entry, field: 'entrée', kind, before: null, after: null, reason: 'essai', ...extra
});
