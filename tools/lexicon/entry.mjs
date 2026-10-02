// Ocha v2 — Validateur lexical : ENTRY (A2-03 · 4.2)
//
// Contrôles de docs/conception/schema-A2-01.md, §12 : I1 (forme stricte de l'ENTRY et de tous ses
// sous-objets, SENSE compris), I2, I3, I4, I5, I6, I16, I17, avertissements A1 à A3, information
// N1. Les contrôles propres aux SENSE sont dans sense.mjs (4.3).

import {
  ENTRY_SHAPE, RETIRED_SHAPE, ENTRY_ID, GROUP_VALUES, KANA_READING, MACRON, KANJI_CHAR,
  checkShape, usable
} from './schema.mjs';
import { checkSenses } from './sense.mjs';

// ── Furigana ─────────────────────────────────────────────────────────────────
//
// Seule structure admise : du texte, et des blocs <ruby> contenant une ou plusieurs paires
// « base, <rt>lecture</rt> », chaque <rt> pouvant être entouré de <rp>…</rp> (repli
// typographique). Aucune autre balise, aucun attribut, aucune imbrication. La structure est
// validée AVANT le calcul du texte de base : un HTML invalide ne passe jamais au motif que son
// texte visible correspond à la forme.

const TOKEN = /<\/?(?:ruby|rt|rp)>|<[^>]*>?|>|[^<>]+/g;

/** @returns {{ base: string } | { error: string }} */
export function parseFurigana(text) {
  const tokens = text.match(TOKEN) || [];
  let base = '';
  let i = 0;
  const next = () => tokens[i++];
  const isTag = (t) => t !== undefined && t.startsWith('<');
  const readText = (tag) => {
    const t = next();
    if (t === undefined || isTag(t) || t === '>') return { error: `contenu attendu dans <${tag}>` };
    if (next() !== `</${tag}>`) return { error: `</${tag}> attendu` };
    return { text: t };
  };
  while (i < tokens.length) {
    const t = next();
    if (t === '<ruby>') {
      let pairs = 0;
      for (;;) {
        const b = next();
        if (b === '</ruby>') break;
        if (b === undefined) return { error: '</ruby> manquant' };
        if (isTag(b) || b === '>') return { error: `texte de base attendu dans <ruby>, trouvé « ${b} »` };
        let tag = next();
        if (tag === '<rp>') { const rp = readText('rp'); if (rp.error) return rp; tag = next(); }
        if (tag !== '<rt>') return { error: `<rt> attendu après « ${b} »` };
        const rt = readText('rt');
        if (rt.error) return rt;
        if (tokens[i] === '<rp>') { i += 1; const rp = readText('rp'); if (rp.error) return rp; }
        base += b;
        pairs += 1;
      }
      if (pairs === 0) return { error: '<ruby> vide' };
    } else if (isTag(t) || t === '>') {
      return { error: `balise non admise : « ${t} »` };
    } else {
      base += t;
    }
  }
  return { base };
}

function checkFurigana(report, where, furigana, form, label) {
  const parsed = parseFurigana(furigana);
  if (parsed.error) { report.error('furigana-invalide', where, `${label} : ${parsed.error}`); return; }
  if (parsed.base !== form) report.error('furigana-base', where, `${label} : texte de base « ${parsed.base} » au lieu de « ${form} »`);
}

/** Kanji d'un mot, calculés à partir de sa forme : distincts, dans l'ordre. Jamais stockés. */
export const kanjiOf = (word) => [...new Set([...word].filter((c) => KANJI_CHAR.test(c)))];

// ── ENTRY ────────────────────────────────────────────────────────────────────

function checkEntry(report, ctx, file, entry, i) {
  const where = `${file.file} · ${typeof entry?.id === 'string' ? entry.id : `entrée ${i + 1}`}`;
  if (!checkShape(report, where, entry, ENTRY_SHAPE, 'ENTRY')) return;

  // I2 · identifiant
  if (usable(entry, 'id', 'text')) {
    if (!ENTRY_ID.test(entry.id)) report.error('entree-id', where, `identifiant « ${entry.id} » : forme v_<n> attendue`);
    if (ctx.ids.has(entry.id)) report.error('id-duplique', where, `« ${entry.id} » déjà défini dans ${ctx.ids.get(entry.id)}`);
    else ctx.ids.set(entry.id, file.file);
    if (ctx.retiredIds.has(entry.id)) report.error('id-retire', where, `« ${entry.id} » figure dans vocab-retired.json`);
  }

  // I3 · niveau
  if (usable(entry, 'level', 'text') && entry.level !== file.level) {
    report.error('niveau-fichier', where, `level « ${entry.level} » au lieu de « ${file.level} » (niveau du fichier)`);
  }

  // I4 · forme usuelle et lectures
  const word = usable(entry, 'word', 'text') ? entry.word : null;
  if (word !== null && word.includes('/')) report.error('forme-invalide', where, `« / » dans la forme « ${word} »`);
  if (usable(entry, 'readings', 'list')) {
    if (entry.readings.length === 0) report.error('lecture-manquante', where, 'au moins une lecture attendue');
    const defaults = entry.readings.filter((r) => r?.default === true).length;
    if (entry.readings.length > 0 && defaults !== 1) report.error('lecture-defaut', where, `${defaults} lecture(s) par défaut au lieu d'une`);
    entry.readings.forEach((r, k) => {
      const rWhere = `${where} · readings[${k}]`;
      if (usable(r, 'kana', 'text') && !KANA_READING.test(r.kana)) report.error('kana-invalide', rWhere, `« ${r.kana} » n'est pas en kana seulement`);
      if (usable(r, 'furigana', 'text') && word !== null) checkFurigana(report, rWhere, r.furigana, word, 'furigana de la lecture');
      if (usable(r, 'romaji', 'text') && MACRON.test(r.romaji)) report.warn('romaji-macron', rWhere, `romaji avec macron : « ${r.romaji} »`); // A1
    });
  }

  // I5 · autres formes graphiques
  if (usable(entry, 'writings', 'list')) {
    const forms = new Set(word !== null ? [word] : []);
    entry.writings.forEach((w, k) => {
      const wWhere = `${where} · writings[${k}]`;
      if (!usable(w, 'form', 'text')) return;
      if (forms.has(w.form)) report.error('graphie-doublon', wWhere, `forme « ${w.form} » déjà présente`);
      forms.add(w.form);
      if (usable(w, 'furigana', 'text')) checkFurigana(report, wWhere, w.furigana, w.form, 'furigana de la forme');
    });
  }

  // I6 · propriétés linguistiques
  const ling = entry.linguistic;
  if (usable(entry, 'linguistic', 'object')) {
    const lWhere = `${where} · linguistic`;
    if (usable(ling, 'grammatical_class', 'text') && !ctx.index.isGrammaticalClass(ling.grammatical_class)) {
      report.error('classe-inconnue', lWhere, `classe grammaticale « ${ling.grammatical_class} » absente du registre`);
    }
    if (usable(ling, 'group', 'text') && !GROUP_VALUES.includes(ling.group)) {
      report.error('group-invalide', lWhere, `group « ${ling.group} » (${GROUP_VALUES.join(', ')} ou null)`);
    }
    if (ling.suru_compatible === true && ling.group !== 'nom') {
      report.error('suru-compatible', lWhere, 'suru_compatible seulement avec group « nom »');
    }
    if (usable(ling, 'counter', 'object') && usable(ling.counter, 'counter_for', 'list')) {
      if (ling.counter.counter_for.length === 0) report.error('compteur-vide', lWhere, 'counter_for doit contenir au moins une compatibilité');
      for (const c of ling.counter.counter_for) {
        if (typeof c === 'string' && c !== '' && !ctx.index.isCounterCompatibility(c)) {
          report.error('compteur-inconnu', lWhere, `compatibilité « ${c} » absente du registre`);
        }
      }
    }
    // A3 · group « suru » sur une forme qui ne finit pas par する
    if (ling.group === 'suru' && word !== null && !word.endsWith('する')) {
      report.warn('suru-sans-suru', lWhere, `group « suru » mais « ${word} » ne finit pas par する`);
    }
  }

  // A2 · kanji de la forme usuelle, calculés (jamais stockés), absents des kanji connus
  if (word !== null) {
    for (const k of kanjiOf(word)) {
      if (!ctx.knownKanji.has(k)) report.warn('kanji-inconnu', where, `kanji « ${k} » de « ${word} » absent des kanji connus`);
    }
  }

  // I7 à I11, I13 à I15 · SENSE (et tags de l'ENTRY)
  checkSenses(report, ctx, where, entry);

  // I16 · une unité, une ENTRY : même forme usuelle et même lecture par défaut
  const def = usable(entry, 'readings', 'list') ? entry.readings.find((r) => r?.default === true) : undefined;
  if (word !== null && usable(def, 'kana', 'text')) {
    const key = `${word} ${def.kana}`;
    if (ctx.units.has(key)) report.error('unite-doublon', where, `même forme et même lecture par défaut que ${ctx.units.get(key)}`);
    else ctx.units.set(key, typeof entry.id === 'string' ? entry.id : where);
  }
}

// I17 · data/vocab-retired.json
function checkRetired(report, retired, ids) {
  const where = 'vocab-retired.json';
  const seen = new Set();
  retired.forEach((r, k) => {
    const rWhere = `${where} · ${typeof r?.id === 'string' ? r.id : k + 1}`;
    if (!checkShape(report, rWhere, r, RETIRED_SHAPE, 'identifiant retiré')) return;
    if (!usable(r, 'id', 'text')) return;
    if (!ENTRY_ID.test(r.id)) report.error('retire-invalide', rWhere, `forme v_<n> attendue pour « ${r.id} »`);
    if (seen.has(r.id)) report.error('id-duplique', rWhere, `« ${r.id} » retiré deux fois`);
    seen.add(r.id);
    if (usable(r, 'merged_into', 'text') && !ids.has(r.merged_into)) {
      report.error('retire-invalide', rWhere, `merged_into « ${r.merged_into} » ne désigne aucune ENTRY`);
    }
  });
}

/**
 * Contrôles de niveau ENTRY sur l'ensemble des fichiers (les identifiants et les unités sont
 * uniques dans tout le vocabulaire).
 */
export function checkEntries(report, { files, retired, knownKanji, particles, index }) {
  const retiredIds = new Set(retired.filter((r) => typeof r?.id === 'string').map((r) => r.id));
  const ctx = { index, retiredIds, knownKanji: new Set(knownKanji), particles: new Set(particles), ids: new Map(), units: new Map() };
  const perLevel = new Map();
  for (const file of files) {
    file.entries.forEach((entry, i) => checkEntry(report, ctx, file, entry, i));
    perLevel.set(file.level, (perLevel.get(file.level) ?? 0) + file.entries.length);
  }
  checkRetired(report, retired, ctx.ids);
  // N1 · nombre d'ENTRY par niveau
  for (const [level, n] of perLevel) report.info('entrees-par-niveau', level, `${n} ENTRY`);
}
