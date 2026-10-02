// Ocha v2 — Validateur lexical : description du schéma (A2-03)
//
// Implémentation exécutable de docs/conception/schema-A2-01.md, qui reste la référence humaine.
// Ce fichier est la SEULE description du schéma utilisée par le validateur : aucun contrôle ne
// relit le Markdown. Une divergence entre les deux se corrige consciemment, des deux côtés.
//
// A2-03 · 4.1 : socle seulement (registres, niveaux). La description des objets ENTRY et SENSE
// vient avec 4.2 et 4.3.

// Registres de data/registries/ et version de leur source (A2-02) : cinq transcriptions de
// snapshot, trois registres décidés en A2-02. Liste unique, importée aussi par validate-data.
export const REGISTRY_SOURCES = Object.freeze({
  'categories.json': 'A2-L3-v1',
  'semantic-types.json': 'A2-ST-v1',
  'dimensions.json': 'A2-DIM-v1',
  'relations.json': 'A2-REL-v1.1',
  'linguistic-functions.json': 'A2-LING-v1',
  // Décidés en A2-02, non transcrits d'un snapshot : classes grammaticales (A2-LING-v1 nomme la
  // propriété sans en donner les valeurs), compatibilités de compteur (notions d'A2-LING-v1,
  // identifiants fixés en A2-02 sauf `small_animals`), tags.
  'grammatical-classes.json': 'A2-02',
  'counters.json': 'A2-02',
  'tags.json': 'A2-02'
});

export const REGISTRY_FILES = Object.freeze(Object.keys(REGISTRY_SOURCES));

// Valeurs du champ `level` d'une ENTRY (schema-A2-01.md, §3).
export const LEXICON_LEVELS = Object.freeze(['N5', 'N4', 'N3', 'N2', 'N1', 'hors_jlpt']);

// ── Description déclarative des objets (A2-03 · 4.2) ─────────────────────────
//
// Chaque objet est décrit par ses champs. Pour chaque champ :
//   type     : 'text' (chaîne non vide), 'boolean', 'list', 'object'
//   required : le champ doit être présent
//   nullable : null est une valeur permise (distinct de l'absence)
//   items    : pour une liste, la description de ses éléments ('text' ou un objet décrit)
//   shape    : pour un objet, sa description
// Le validateur VALIDE, il ne normalise pas : un champ facultatif absent n'est jamais remplacé
// par une valeur par défaut, même quand le schéma en indique une (« absent équivaut à [] »).
// Tout champ non décrit est une erreur (I1). La description des SENSE vient avec 4.3 : en 4.2,
// `senses` est seulement une liste.

export const WRITING_SHAPE = Object.freeze({
  form: { type: 'text', required: true },
  furigana: { type: 'text', required: true }
});

// Lecture : le schéma (§4) ne marque aucun champ facultatif ; tous sont obligatoires, `note`
// pouvant valoir null.
export const READING_SHAPE = Object.freeze({
  kana: { type: 'text', required: true },
  romaji: { type: 'text', required: true },
  furigana: { type: 'text', required: true },
  default: { type: 'boolean', required: true },
  note: { type: 'text', required: true, nullable: true }
});

export const COUNTER_SHAPE = Object.freeze({
  counter_for: { type: 'list', required: true, items: 'text' }
});

export const LINGUISTIC_SHAPE = Object.freeze({
  grammatical_class: { type: 'text', required: true },
  group: { type: 'text', required: true, nullable: true },
  suru_compatible: { type: 'boolean', required: false },
  suffix: { type: 'boolean', required: false },
  counter: { type: 'object', required: false, nullable: true, shape: COUNTER_SHAPE }
});

export const ENTRY_SHAPE = Object.freeze({
  id: { type: 'text', required: true },
  level: { type: 'text', required: true },
  word: { type: 'text', required: true },
  writings: { type: 'list', required: false, items: WRITING_SHAPE },
  readings: { type: 'list', required: true, items: READING_SHAPE },
  linguistic: { type: 'object', required: true, shape: LINGUISTIC_SHAPE },
  nuance: { type: 'text', required: false, nullable: true },
  tags: { type: 'list', required: false, items: 'text' },
  retired_sense_ids: { type: 'list', required: false, items: 'text' },
  senses: { type: 'list', required: true }
});

// Entrée de data/vocab-retired.json (schema-A2-01.md, §9).
export const RETIRED_SHAPE = Object.freeze({
  id: { type: 'text', required: true },
  merged_into: { type: 'text', required: true, nullable: true }
});

// ── Valeurs (schema-A2-01.md, §3 à §6 et §9) ────────────────────────────────

export const ENTRY_ID = /^v_[1-9][0-9]*$/;
// `group` : comportement morphologique seulement (addendum A3, L6), ou null.
export const GROUP_VALUES = Object.freeze(['ru', 'u', 'irrégulier', 'suru', 'i', 'na', 'nom']);
// Kana d'une lecture : hiragana, katakana et « ー », sans « / » (règle unique du validateur).
export const KANA_READING = /^[\u3041-\u3096\u30A1-\u30FA\u30FC]+$/;
export const MACRON = /[āīūēōĀĪŪĒŌ]/;
// Kanji d'un mot, calculés à partir de sa forme usuelle (addendum A3, L5) ; 々 n'en est pas un.
export const KANJI_CHAR = /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/u;

// ── Vérificateur de forme générique (I1) ────────────────────────────────────

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function typeOk(type, value) {
  if (type === 'text') return typeof value === 'string' && value !== '';
  if (type === 'boolean') return typeof value === 'boolean';
  if (type === 'list') return Array.isArray(value);
  if (type === 'object') return isObject(value);
  throw new Error(`type de schéma inconnu : ${type}`);
}

/**
 * Vérifie un objet contre sa description : champs inconnus, manquants, types, et récursivement
 * les sous-objets décrits. Rend vrai si l'objet est un objet (même avec des erreurs de champ),
 * pour que l'appelant puisse poursuivre ses contrôles sur les champs bien typés.
 */
export function checkShape(report, where, value, shape, what) {
  if (!isObject(value)) { report.error('type-invalide', where, `${what} : objet attendu`); return false; }
  for (const key of Object.keys(value)) {
    if (!Object.hasOwn(shape, key)) report.error('champ-inconnu', where, `${what} : champ « ${key} » hors schéma`);
  }
  for (const [key, field] of Object.entries(shape)) {
    if (!Object.hasOwn(value, key)) {
      if (field.required) report.error('champ-manquant', where, `${what} : champ « ${key} » manquant`);
      continue;
    }
    const v = value[key];
    if (v === null) {
      if (!field.nullable) report.error('type-invalide', where, `${what} : « ${key} » ne peut pas valoir null`);
      continue;
    }
    if (!typeOk(field.type, v)) { report.error('type-invalide', where, `${what} : « ${key} » doit être de type ${field.type}`); continue; }
    if (field.type === 'object' && field.shape) checkShape(report, `${where} · ${key}`, v, field.shape, key);
    if (field.type === 'list' && field.items) {
      v.forEach((item, i) => {
        const w = `${where} · ${key}[${i}]`;
        if (field.items === 'text') { if (!typeOk('text', item)) report.error('type-invalide', w, `${key} : texte non vide attendu`); }
        else checkShape(report, w, item, field.items, key);
      });
    }
  }
  return true;
}

/** Vrai si le champ est présent et bien typé (non null) : on peut alors l'examiner. */
export const usable = (value, key, type) => isObject(value) && Object.hasOwn(value, key) && value[key] !== null && typeOk(type, value[key]);
