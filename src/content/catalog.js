// Ocha v2 — Catalogue des éléments
//
// Construit, à partir des données déjà lues, l'ensemble des éléments qui existent et la liste
// des éléments de chaque portée (partie 1, 1.1 et 1.5). Il ne lit que ce qui fait l'identité d'un
// élément :
//   - vocabulaire, grammaire, expressions : le champ `id`, rien d'autre. Le schéma lexical actuel
//     est transitoire (addendum A3) : aucun autre champ n'entre dans ce contrat ;
//   - kanji : les caractères du catalogue de chaque niveau (`kanji.chars`). Un kanji est un
//     élément s'il appartient au catalogue d'un niveau, pas parce qu'il figure dans un mot ;
//   - kana : la grille de data/kana.json.
// Le niveau d'un élément est donné par la place de son fichier dans les données reçues, jamais
// par son identifiant (addendum A4).
//
// Portées (décision du 2026-10-01) : « kana » = tous les kana ; « n5 » à « n1 » = la grammaire,
// le vocabulaire JLPT et les kanji de ce niveau, dans cet ordre et dans l'ordre des fichiers.
// Les mots hors JLPT et les expressions existent, mais n'appartiennent à aucune portée.
// Un niveau absent des données a une portée vide.

import { kanaProblems, kanaEntries } from './kana.js';

export const ELEMENT_TYPES = Object.freeze(['grammar', 'vocab', 'kanji', 'kana', 'expression']);
export const LEVELS = Object.freeze(['n5', 'n4', 'n3', 'n2', 'n1']);
export const SCOPES = Object.freeze(['kana', ...LEVELS]);

const INPUT_KEYS = ['levels', 'kana', 'vocabHorsJlpt', 'expressions'];
const LEVEL_KEYS = ['vocab', 'grammar', 'kanji'];
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const keyOf = (type, id) => `${type}:${id}`;

/**
 * @returns {{ problems: object[], existing: Set<string>, scopes: Map<string, {type: string, id: string}[]> }}
 */
export function buildCatalog(rawData) {
  const problems = [];
  const add = (code, where, message) => problems.push({ code, where, message });
  const existing = new Set();
  const scopes = new Map(SCOPES.map((s) => [s, []]));

  if (!isObject(rawData)) {
    add('format', 'données', 'les données du contenu doivent être un objet');
    return { problems, existing, scopes };
  }
  const extra = Object.keys(rawData).filter((k) => !INPUT_KEYS.includes(k));
  if (extra.length) add('cle-inconnue', 'données', `clé(s) inconnue(s) : ${extra.join(', ')}`);

  // Un identifiant n'est défini qu'une fois par type d'élément, tous fichiers confondus.
  const definedIn = new Map();
  const define = (type, id, where) => {
    const key = keyOf(type, id);
    if (definedIn.has(key)) {
      add('id-duplique', where, `« ${id} » (${type}) déjà défini dans ${definedIn.get(key)}`);
      return false;
    }
    definedIn.set(key, where);
    existing.add(key);
    return true;
  };

  const withIds = (list, type, where, scope) => {
    if (!Array.isArray(list)) { add('format', where, 'liste attendue'); return; }
    list.forEach((item, i) => {
      if (!isObject(item) || typeof item.id !== 'string' || item.id === '') {
        add('format', `${where} · ${i + 1}`, 'élément sans identifiant');
        return;
      }
      if (define(type, item.id, where) && scope) scope.push({ type, id: item.id });
    });
  };

  // Niveaux
  const levels = rawData.levels;
  if (!isObject(levels)) {
    add('format', 'levels', '« levels » doit être un objet indexé par niveau');
  } else {
    for (const [lvl, data] of Object.entries(levels)) {
      if (!LEVELS.includes(lvl)) { add('niveau-inconnu', `levels.${lvl}`, `niveau inconnu « ${lvl} »`); continue; }
      if (!isObject(data)) { add('format', `levels.${lvl}`, 'objet attendu'); continue; }
      const missing = LEVEL_KEYS.filter((k) => !(k in data));
      if (missing.length) add('fichier-absent', `levels.${lvl}`, `manquant : ${missing.join(', ')}`);
      const unknown = Object.keys(data).filter((k) => !LEVEL_KEYS.includes(k));
      if (unknown.length) add('cle-inconnue', `levels.${lvl}`, `clé(s) inconnue(s) : ${unknown.join(', ')}`);
      const scope = scopes.get(lvl);
      if ('grammar' in data) withIds(data.grammar, 'grammar', `${lvl}/grammar.json`, scope);
      if ('vocab' in data) withIds(data.vocab, 'vocab', `${lvl}/vocab.json`, scope);
      if ('kanji' in data) {
        const where = `${lvl}/kanji.json`;
        const chars = data.kanji?.chars;
        if (!Array.isArray(chars)) {
          add('format', where, '« chars » doit être une liste');
        } else {
          chars.forEach((c, i) => {
            if (typeof c !== 'string' || [...c].length !== 1) {
              add('kanji-invalide', `${where} · ${i + 1}`, `un kanji est exactement un caractère (« ${c} »)`);
              return;
            }
            if (define('kanji', c, where)) scope.push({ type: 'kanji', id: c });
          });
        }
      }
    }
  }

  // Éléments sans portée de niveau
  withIds(rawData.vocabHorsJlpt, 'vocab', 'vocab-hors-jlpt.json', null);
  withIds(rawData.expressions, 'expression', 'expressions.json', null);

  // Kana
  const kp = kanaProblems(rawData.kana);
  problems.push(...kp);
  if (kp.length === 0) {
    for (const k of kanaEntries(rawData.kana)) {
      existing.add(keyOf('kana', k.id));
      scopes.get('kana').push({ type: 'kana', id: k.id });
    }
  }

  return { problems, existing, scopes };
}

export { keyOf };
