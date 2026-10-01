// Ocha v2 — Catalogue des kana
//
// Source canonique : data/kana.json (décision du 2026-10-01), reprise à l'identique des listes
// de l'ancienne application, romaji compris. Le fichier garde la grille de l'interface :
// écritures (hiragana, katakana) → groupes (base, dakuten, handakuten, sokuon, yoon) → rangées
// → cases, une case vide valant null. Le contenu en dérive la liste plate des éléments.
//
// L'identifiant d'un kana n'est pas stocké : il se déduit du caractère, « kana_ » + caractère
// (partie 1, 1.1). Un yōon (きゃ) est un élément à deux caractères.
//
// Fonctions pures : aucune lecture de fichier ici (le contenu reçoit les données déjà lues).

export const KANA_ID_PREFIX = 'kana_';

const KANA_TEXT = /^[\u3041-\u3096\u30A1-\u30FA\u30FC]+$/;
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isText = (v) => typeof v === 'string' && v !== '';

/** Identifiant d'élément d'un kana. */
export const kanaId = (char) => `${KANA_ID_PREFIX}${char}`;

/**
 * Problèmes de structure du catalogue des kana. Liste vide : le catalogue est utilisable.
 * @returns {{ code: string, where: string, message: string }[]}
 */
export function kanaProblems(kana, where = 'kana.json') {
  const problems = [];
  const add = (code, w, message) => problems.push({ code, where: w, message });
  if (!isObject(kana) || !Array.isArray(kana.scripts) || kana.scripts.length === 0) {
    add('format', where, '« scripts » doit être une liste non vide');
    return problems;
  }
  const extra = Object.keys(kana).filter((k) => k !== 'scripts');
  if (extra.length) add('cle-inconnue', where, `clé(s) inconnue(s) : ${extra.join(', ')}`);

  const scriptIds = new Set();
  const chars = new Map();
  kana.scripts.forEach((script, si) => {
    const sWhere = `${where} · écriture ${si + 1}`;
    if (!isObject(script) || !isText(script.id) || !Array.isArray(script.groups)) {
      add('format', sWhere, 'une écriture a un « id » et une liste « groups »');
      return;
    }
    if (scriptIds.has(script.id)) add('id-duplique', sWhere, `écriture « ${script.id} » en double`);
    scriptIds.add(script.id);
    const groupIds = new Set();
    script.groups.forEach((group, gi) => {
      const gWhere = `${where} · ${script.id} · groupe ${gi + 1}`;
      if (!isObject(group) || !isText(group.id) || !Array.isArray(group.rows)) {
        add('format', gWhere, 'un groupe a un « id » et une liste « rows »');
        return;
      }
      if (groupIds.has(group.id)) add('id-duplique', gWhere, `groupe « ${group.id} » en double`);
      groupIds.add(group.id);
      if (group.title !== null && !isText(group.title)) add('format', gWhere, '« title » est un texte ou null');
      group.rows.forEach((row, ri) => {
        if (!Array.isArray(row)) { add('format', `${gWhere} · rangée ${ri + 1}`, 'une rangée est une liste'); return; }
        row.forEach((cell, ci) => {
          if (cell === null) return;
          const cWhere = `${where} · ${script.id} · ${group.id} · rangée ${ri + 1} · case ${ci + 1}`;
          const keys = isObject(cell) ? Object.keys(cell).sort().join(',') : '';
          if (keys !== 'char,romaji' || !isText(cell.char) || !isText(cell.romaji)) {
            add('format', cWhere, 'une case est null ou { char, romaji }, deux textes non vides');
            return;
          }
          if (!KANA_TEXT.test(cell.char)) add('kana-invalide', cWhere, `« ${cell.char} » n'est pas écrit en kana`);
          if (chars.has(cell.char)) add('id-duplique', cWhere, `kana « ${cell.char} » déjà présent (${chars.get(cell.char)})`);
          else chars.set(cell.char, cWhere);
        });
      });
    });
  });
  return problems;
}

/**
 * Liste plate des kana, dans l'ordre de la grille : écritures, groupes, rangées, cases.
 * Suppose un catalogue sans problème (kanaProblems vide).
 * @returns {{ id: string, char: string, romaji: string, script: string, group: string }[]}
 */
export function kanaEntries(kana) {
  return kana.scripts.flatMap((script) => script.groups.flatMap((group) =>
    group.rows.flatMap((row) => row.filter((cell) => cell !== null).map((cell) => ({
      id: kanaId(cell.char), char: cell.char, romaji: cell.romaji, script: script.id, group: group.id
    })))));
}
