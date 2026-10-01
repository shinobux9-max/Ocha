// Ocha v2 — Validation des données
//
// Vérifie les fichiers de data/ selon le document de conception :
//   - partie 2, section 2.7 (validation du graphe) et addendum 2.10 (formes, group) ;
//   - addendum A1 (champ `construction`) ;
//   - addendum A4 (identifiants de grammaire `g_<n>`, niveau lu dans le champ `level`) ;
//   - docs/conception/GUIDE-CONTENU.md (format des phrases, romaji, questions).
//
// Deux niveaux de gravité (partie 2, 2.7) :
//   - erreur        : le contenu ne peut pas être livré (code de sortie 1) ;
//   - avertissement : signalé, sans bloquer.
//
// Usage : node tools/validate-data.mjs
//
// Ce script lit les données, il ne les modifie jamais.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GUIDED_CONFIG } from '../src/config.js';
// Même contrôle du catalogue des kana que le contenu : une seule définition des règles.
import { kanaProblems, kanaEntries } from '../src/content/index.js';

// ── Périmètre ───────────────────────────────────────────────────────────────

// Niveaux dont la STRUCTURE est validée. Les niveaux N4 à N1 sont hors périmètre : leurs
// données sont encore dans l'ancien format (identifiants, `group`, exemples, romaji) et
// doivent d'abord être migrées au format v2 (voir ETAT-ACTUEL.md, points ouverts).
// Pour valider un nouveau niveau après sa migration : l'ajouter ici, ex. ['n5', 'n4'].
export const VALIDATED_LEVELS = ['n5'];

// Tous les niveaux existants sont LUS pour construire l'index des identifiants, afin qu'une
// référence vers un niveau supérieur soit reconnue (et signalée comme telle). L'ordre est celui
// de la progression d'Ocha, du plus précoce au plus avancé (addendum A3, L3).
const ALL_LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const levelRank = (lvl) => ALL_LEVELS.indexOf(lvl);

// Valeurs du champ `level` d'un élément et niveau de fichier correspondant (addendum A4).
const LEVEL_VALUES = Object.freeze({ N5: 'n5', N4: 'n4', N3: 'n3', N2: 'n2', N1: 'n1' });
const levelFromField = (value) => (Object.hasOwn(LEVEL_VALUES, value) ? LEVEL_VALUES[value] : null);

// Identifiants indépendants du niveau (addendum A4) : la grammaire est `g_<n>` (contrôle I20).
// Le niveau d'un élément n'est JAMAIS déduit de son identifiant.
const GRAMMAR_ID = /^g_[1-9][0-9]*$/;
// Préfixes réservés aux identifiants d'éléments (contrôle I18) ; « v_ » s'ajoutera avec A2-03.
export const RESERVED_PREFIXES = Object.freeze(['g_']);

// Emplacements provisoires : l'ancienne app charge encore ces fichiers ici. Ils seront
// déplacés à l'étape 5 (concepts vers data/<niveau>/concepts.json).
const conceptsPath = (lvl) => join('concepts', `${lvl}.json`);

// Fichiers de data/ que le validateur ne lit pas (ancienne app uniquement, voir ETAT-ACTUEL.md).
export const IGNORED_FILES = ['mapping.json', join('curriculum', 'n5.json')];

// ── Valeurs connues ─────────────────────────────────────────────────────────

// `group` du vocabulaire (addendum 2.10) : catégories qui se conjuguent…
const CONJUGABLE_GROUPS = ['ru', 'u', 'irrégulier', 'suru', 'i', 'na', 'nom'];
// …et catégories qui ne se conjuguent pas (décision du 2026-09-30, ETAT-ACTUEL.md).
const OTHER_GROUPS = ['adverbe', 'pronom', 'interrogatif', 'démonstratif', 'conjonction',
  'temps', 'quantité', 'interjection'];
export const KNOWN_GROUPS = new Set([...CONJUGABLE_GROUPS, ...OTHER_GROUPS]);

const REF_KEYS = ['grammar', 'vocab', 'kanji', 'kana', 'expression']; // partie 2, 2.3
const MACRON = /[āīūēōĀĪŪĒŌ]/;                                         // GUIDE-CONTENU, §2
const LATIN = /[A-Za-z]/;
const stripRuby = (s) => String(s).replace(/<ruby>(.*?)<rt>.*?<\/rt><\/ruby>/g, '$1');

// ── Collecte des problèmes ──────────────────────────────────────────────────

class Report {
  constructor() { this.errors = []; this.warnings = []; }
  error(code, where, message) { this.errors.push({ code, where, message }); }
  warn(code, where, message) { this.warnings.push({ code, where, message }); }
}

// ── Lecture des fichiers ────────────────────────────────────────────────────

function loadJson(dataDir, rel, report, { required = false } = {}) {
  const full = join(dataDir, rel);
  if (!existsSync(full)) {
    if (required) report.error('fichier-absent', rel, 'fichier obligatoire introuvable');
    return undefined;
  }
  try {
    return JSON.parse(readFileSync(full, 'utf8').replace(/^\uFEFF/, ''));
  } catch (e) {
    report.error('json-invalide', rel, `JSON invalide : ${e.message}`);
    return undefined;
  }
}

// ── Index des identifiants ──────────────────────────────────────────────────

function buildIndex(dataDir, report) {
  const index = {
    grammar: new Map(), vocab: new Map(), expression: new Map(),
    // Kanji ÉLÉMENTS : ceux des catalogues de niveau (décision du 2026-10-01). Le dictionnaire
    // s'y ajoute seulement dans `kanjiKnown`, pour l'avertissement sur les kanji des mots.
    kanji: new Set(), kanjiKnown: new Set(),
    // Kana : le catalogue de data/kana.json (décision du 2026-10-01).
    kana: new Set(),
    registers: new Set(), places: new Set(), categories: new Map(),
    // Niveau du fichier où chaque élément est défini (« vocab:<id> », « grammar:<id> ») : c'est
    // la place du fichier qui le donne, jamais l'identifiant (addendum A4).
    fileLevel: new Map()
  };

  // Unicité des identifiants ENTRE fichiers, par espace d'identifiants (vocab, grammar,
  // expression). Les espaces ne peuvent pas se chevaucher : leurs préfixes diffèrent
  // (partie 2, 2.3). Un doublon À L'INTÉRIEUR d'un fichier est signalé par la validation de
  // ce fichier (niveaux validés seulement).
  const sources = { vocab: new Map(), grammar: new Map(), expression: new Map() };
  const register = (space, item, file, lvl) => {
    if (!item || typeof item.id !== 'string') return;
    const first = sources[space].get(item.id);
    if (first && first !== file) {
      report.error('id-duplique-global', file, `identifiant « ${item.id} » déjà défini dans ${first}`);
      return; // la première définition est conservée
    }
    if (!first) sources[space].set(item.id, file);
    if (!index[space].has(item.id)) {
      index[space].set(item.id, item);
      if (lvl) index.fileLevel.set(`${space}:${item.id}`, lvl);
    }
  };

  for (const lvl of ALL_LEVELS) {
    const vocabFile = `${lvl}/vocab.json`;
    const vocab = loadJson(dataDir, join(lvl, 'vocab.json'), new Report());
    if (Array.isArray(vocab)) for (const w of vocab) register('vocab', w, vocabFile, lvl);
    const grammarFile = `${lvl}/grammar.json`;
    const grammar = loadJson(dataDir, join(lvl, 'grammar.json'), new Report());
    if (Array.isArray(grammar)) for (const g of grammar) register('grammar', g, grammarFile, lvl);
    const kanji = loadJson(dataDir, join(lvl, 'kanji.json'), new Report());
    if (kanji && Array.isArray(kanji.chars)) kanji.chars.forEach((c) => { index.kanji.add(c); index.kanjiKnown.add(c); });
  }
  const dict = loadJson(dataDir, 'kanji_jouyou_fr.json', report);
  if (dict && typeof dict === 'object') Object.keys(dict).forEach((c) => index.kanjiKnown.add(c));

  const kana = loadJson(dataDir, 'kana.json', report, { required: true });
  if (kana !== undefined) {
    const problems = kanaProblems(kana);
    for (const pb of problems) report.error(pb.code, pb.where, pb.message);
    if (problems.length === 0) kanaEntries(kana).forEach((k) => index.kana.add(k.id));
  }

  const hj = loadJson(dataDir, 'vocab-hors-jlpt.json', report);
  if (Array.isArray(hj)) for (const w of hj) register('vocab', w, 'vocab-hors-jlpt.json', 'hors_jlpt');

  const expressions = loadJson(dataDir, 'expressions.json', report);
  if (Array.isArray(expressions)) for (const e of expressions) register('expression', e, 'expressions.json');

  const registres = loadJson(dataDir, 'registres.json', report);
  if (Array.isArray(registres)) registres.forEach((r) => r && r.id && index.registers.add(r.id));

  const lieux = loadJson(dataDir, 'lieux.json', report);
  if (Array.isArray(lieux)) lieux.forEach((l) => l && l.id && index.places.add(l.id));

  // Catégories : seulement celles des niveaux validés et des mots hors JLPT (les niveaux hors
  // périmètre ont encore leurs anciennes catégories).
  for (const w of index.vocab.values()) {
    const lvl = index.fileLevel.get(`vocab:${w.id}`);
    const inScope = lvl === 'hors_jlpt' || VALIDATED_LEVELS.includes(lvl);
    if (inScope && w.category) index.categories.set(w.category, (index.categories.get(w.category) || 0) + 1);
  }
  return { index, files: { hj, expressions, registres, lieux } };
}

// Vérifie qu'un élément référencé existe. type : clé de REF_KEYS.
function exists(index, type, id) {
  switch (type) {
    case 'grammar': return index.grammar.has(id);
    case 'vocab': return index.vocab.has(id);
    case 'expression': return index.expression.has(id);
    case 'kanji': return index.kanji.has(id);
    case 'kana': return index.kana.has(id);
    default: return false;
  }
}

// Vérifie un objet de références groupées par type ({ grammar: [...], vocab: [...] }).
function checkRefGroup(index, report, where, group, label, { allowedKeys = REF_KEYS } = {}) {
  const refs = [];
  if (group === undefined) return refs;
  if (!group || typeof group !== 'object' || Array.isArray(group)) {
    report.error('format', where, `« ${label} » doit être un objet groupé par type`);
    return refs;
  }
  for (const [key, ids] of Object.entries(group)) {
    if (!allowedKeys.includes(key)) {
      report.error('cle-inconnue', where, `« ${label} » : clé « ${key} » non autorisée (${allowedKeys.join(', ')})`);
      continue;
    }
    if (!Array.isArray(ids)) { report.error('format', where, `« ${label}.${key} » doit être une liste`); continue; }
    for (const id of ids) {
      if (!exists(index, key, id)) report.error('ref-inexistante', where, `« ${label}.${key} » : identifiant inexistant « ${id} »`);
      refs.push({ type: key, id });
    }
  }
  return refs;
}

const keyOf = (r) => `${r.type}:${r.id}`;

// ── Phrases (format commun, GUIDE-CONTENU §5) ───────────────────────────────

function checkSentence(index, report, where, s, { characters = null } = {}) {
  if (!s || typeof s !== 'object') { report.error('format', where, 'phrase absente ou invalide'); return; }
  for (const f of ['japanese', 'romaji', 'french', 'register']) {
    if (typeof s[f] !== 'string' || s[f] === '') report.error('champ-manquant', where, `champ « ${f} » manquant`);
  }
  if (s.register && !index.registers.has(s.register)) report.error('registre-inconnu', where, `registre inconnu « ${s.register} »`);
  if (typeof s.romaji === 'string' && MACRON.test(s.romaji)) report.warn('romaji-macron', where, `romaji avec macron : « ${s.romaji} »`);
  if (s.speaker !== undefined && characters && !characters.has(s.speaker)) {
    report.error('personnage-inconnu', where, `« speaker » inconnu : « ${s.speaker} »`);
  }
  const plain = stripRuby(s.japanese || '');
  for (const r of s.refs || []) {
    if (!r || typeof r.text !== 'string') { report.error('format', where, 'référence sans « text »'); continue; }
    if (!plain.includes(r.text)) report.error('ref-texte-absent', where, `le texte « ${r.text} » n'apparaît pas dans la phrase`);
    const type = r.vocab ? 'vocab' : r.expression ? 'expression' : null;
    if (!type) { report.error('format', where, `référence « ${r.text} » sans « vocab » ni « expression »`); continue; }
    if (!exists(index, type, r[type])) report.error('ref-inexistante', where, `référence « ${r.text} » : ${type} inexistant « ${r[type]} »`);
  }
  for (const g of s.grammar || []) {
    if (!index.grammar.has(g)) report.error('ref-inexistante', where, `grammaire inexistante « ${g} »`);
  }
  for (const [i, tb] of (s.sounds_textbook || []).entries()) {
    for (const f of ['japanese', 'romaji', 'why', 'natural', 'natural_romaji']) {
      if (typeof tb?.[f] !== 'string' || tb[f] === '') report.error('champ-manquant', `${where} · sounds_textbook[${i}]`, `champ « ${f} » manquant`);
    }
    if (tb?.natural_romaji && MACRON.test(tb.natural_romaji)) report.warn('romaji-macron', `${where} · sounds_textbook[${i}]`, 'romaji avec macron');
  }
}

// ── Activités (missions, lectures) : requires, teaches, questions ───────────

// Niveau d'une leçon : son champ `level` ; à défaut (niveaux hors périmètre, encore dans l'ancien
// format), le niveau du fichier qui la définit. Jamais l'identifiant (addendum A4, A4-2).
function grammarLevel(index, id) {
  return levelFromField(index.grammar.get(id)?.level) ?? index.fileLevel.get(`grammar:${id}`) ?? null;
}

function checkReservedPrefix(report, where, id, what) {
  if (typeof id !== 'string') return;
  const prefix = RESERVED_PREFIXES.find((p) => id.startsWith(p));
  if (prefix) report.error('prefixe-reserve', where, `${what} « ${id} » : le préfixe « ${prefix} » est réservé (addendum A4)`);
}

function checkActivity(index, report, where, act, level) {
  const req = checkRefGroup(index, report, where, act.requires, 'requires');
  const teach = checkRefGroup(index, report, where, act.teaches, 'teaches');
  const reqKeys = new Set(req.map(keyOf));
  for (const t of teach) {
    if (reqKeys.has(keyOf(t))) report.error('requires-et-teaches', where, `« ${t.id} » est à la fois exigé et enseigné`);
  }
  for (const r of req) {
    if (r.type === 'kana') report.error('kana-exige', where, `un kana ne peut pas être exigé (« ${r.id} »)`);
  }
  if (teach.length > GUIDED_CONFIG.maxTaughtElements) {
    report.warn('teaches-trop-long', where, `« teaches » contient ${teach.length} éléments (plus de ${GUIDED_CONFIG.maxTaughtElements})`);
  }
  if (act.requires === undefined && act.teaches === undefined) {
    report.warn('sans-relations', where, 'ni « requires » ni « teaches »');
  }
  // Partie 2, 2.7 · grammaire d'un niveau supérieur : comparaison des champs `level` de
  // l'activité (à défaut, son fichier) et de la leçon (contrôle A4 de schema-A2-01.md).
  const actLevel = levelFromField(act.level) ?? level;
  for (const r of req) {
    if (r.type !== 'grammar') continue;
    const rl = grammarLevel(index, r.id);
    if (rl && actLevel && levelRank(rl) > levelRank(actLevel)) {
      report.warn('niveau-superieur', where, `exige « ${r.id} », d'un niveau supérieur`);
    }
  }
  return new Set([...reqKeys, ...teach.map(keyOf)]);
}

function checkQuestions(index, report, where, questions, activityId, allowed, seenIds) {
  for (const [i, q] of (questions || []).entries()) {
    const qWhere = `${where} · question ${i + 1}`;
    if (!q || typeof q !== 'object') { report.error('format', qWhere, 'question invalide'); continue; }
    if (typeof q.id !== 'string' || q.id === '') {
      report.error('question-sans-id', qWhere, 'question rédigée sans identifiant');
    } else {
      if (seenIds.has(q.id)) report.error('id-duplique', qWhere, `identifiant de question en double « ${q.id} »`);
      seenIds.add(q.id);
      checkReservedPrefix(report, qWhere, q.id, 'question');
      if (!q.id.startsWith(`${activityId}_`)) report.warn('question-id-prefixe', qWhere, `l'identifiant devrait commencer par « ${activityId}_ »`);
    }
    if (q.target === undefined) {
      report.error('question-sans-cible', qWhere, 'question sans « target »');
    } else {
      const targets = checkRefGroup(index, report, qWhere, q.target, 'target');
      for (const t of targets) {
        if (!allowed.has(keyOf(t))) report.error('cible-hors-activite', qWhere, `la cible « ${t.id} » n'est ni enseignée ni exigée par l'activité`);
      }
    }
    if (Array.isArray(q.choices) && Number.isInteger(q.answer) && (q.answer < 0 || q.answer >= q.choices.length)) {
      report.error('reponse-invalide', qWhere, `« answer » (${q.answer}) hors des choix`);
    }
  }
}

// ── Grammaire ───────────────────────────────────────────────────────────────

function checkGrammar(index, report, lvl, grammar) {
  const where0 = `${lvl}/grammar.json`;
  const ids = new Set();
  let withoutRequires = 0;
  for (const g of grammar) {
    const where = `${where0} · ${g?.id ?? '?'}`;
    if (!g || typeof g.id !== 'string') { report.error('format', where0, 'leçon sans identifiant'); continue; }
    if (ids.has(g.id)) report.error('id-duplique', where, 'identifiant en double');
    ids.add(g.id);
    if (!GRAMMAR_ID.test(g.id)) report.error('forme-id', where, "l'identifiant doit avoir la forme « g_<n> » (addendum A4)");
    const fieldLevel = levelFromField(g.level);
    if (!fieldLevel) report.error('niveau-invalide', where, '« level » manquant ou invalide (N5 à N1)');
    else if (fieldLevel !== lvl) report.error('niveau-fichier', where, `« level » ${g.level} ne correspond pas au fichier ${where0}`);
    if (g.requires === undefined) withoutRequires++;
    const req = checkRefGroup(index, report, where, g.requires, 'requires', { allowedKeys: ['grammar'] });
    if (req.some((r) => r.id === g.id)) report.error('prerequis-soi-meme', where, 'la leçon se déclare elle-même comme prérequis');
    if (g.pattern !== undefined && typeof g.pattern !== 'string') {
      report.error('format', where, '« pattern » est le motif d\'affichage, en texte (addendum A1)');
    }
    if (g.construction !== undefined) {
      const c = g.construction;
      if (!c || typeof c.form !== 'string' || typeof c.suffix !== 'string') {
        report.error('format', where, '« construction » doit contenir « form » et « suffix » (addendum A1)');
      }
    }
    if (g.forms !== undefined && (!Array.isArray(g.forms) || g.forms.some((f) => typeof f !== 'string'))) {
      report.error('format', where, '« forms » doit être une liste d\'identifiants de formes');
    }
  }
  if (withoutRequires > 0) {
    report.warn('lecon-sans-requires', where0, `${withoutRequires} leçon(s) sans « requires » : l'ordre de référence s'applique (partie 2, 2.6)`);
  }
  checkGrammarCycles(report, grammar, where0);
}

function checkGrammarCycles(report, grammar, where) {
  const deps = new Map(grammar.filter((g) => g && g.id).map((g) => [g.id, (g.requires && g.requires.grammar) || []]));
  const state = new Map(); // 1 = en cours, 2 = terminé
  const visit = (id, path) => {
    if (state.get(id) === 2) return;
    if (state.get(id) === 1) {
      report.error('cycle', where, `cycle de prérequis : ${[...path.slice(path.indexOf(id)), id].join(' → ')}`);
      return;
    }
    state.set(id, 1);
    for (const d of deps.get(id) || []) if (deps.has(d)) visit(d, [...path, id]);
    state.set(id, 2);
  };
  for (const id of deps.keys()) visit(id, []);
}

// ── Vocabulaire ─────────────────────────────────────────────────────────────

function checkVocab(index, report, where0, vocab, prefix) {
  const ids = new Set();
  const unknownGroups = new Map();
  for (const w of vocab) {
    const where = `${where0} · ${w?.id ?? '?'}`;
    if (!w || typeof w.id !== 'string') { report.error('format', where0, 'mot sans identifiant'); continue; }
    if (ids.has(w.id)) report.error('id-duplique', where, 'identifiant en double');
    ids.add(w.id);
    if (!w.id.startsWith(prefix)) report.error('prefixe-id', where, `l'identifiant devrait commencer par « ${prefix} »`);
    for (const f of ['word', 'reading', 'romaji', 'type', 'group', 'category']) {
      if (typeof w[f] !== 'string' || w[f] === '') report.error('champ-manquant', where, `champ « ${f} » manquant`);
    }
    if (!w.meanings || typeof w.meanings.primary !== 'string') report.error('champ-manquant', where, 'champ « meanings.primary » manquant');
    if (typeof w.reading === 'string' && LATIN.test(w.reading)) report.error('lecture-romaji', where, `lecture en caractères latins : « ${w.reading} »`);
    if (typeof w.romaji === 'string' && MACRON.test(w.romaji)) report.warn('romaji-macron', where, `romaji avec macron : « ${w.romaji} »`);
    if (typeof w.group === 'string' && w.group !== '' && !KNOWN_GROUPS.has(w.group)) {
      unknownGroups.set(w.group, [...(unknownGroups.get(w.group) || []), w.id]);
    }
    if (w.group === 'suru' && typeof w.word === 'string' && !w.word.endsWith('する')) {
      report.warn('suru-sans-suru', where, `group « suru » mais le mot « ${w.word} » ne se termine pas par する`);
    }
    for (const k of w.kanji_list || []) {
      if (typeof k !== 'string' || [...k].length !== 1) {
        report.error('kanji-list-format', where, `« kanji_list » : chaque entrée doit être un seul kanji (« ${k} »)`);
      } else if (!index.kanjiKnown.has(k)) {
        report.warn('kanji-inconnu', where, `kanji « ${k} » absent des listes de kanji`);
      }
    }
  }
  for (const [g, list] of unknownGroups) {
    report.warn('group-inconnu', where0, `« group » inconnu « ${g} » (${list.length} mot(s), ex. ${list.slice(0, 3).join(', ')})`);
  }
}

function checkCategories(index, report) {
  const cats = [...index.categories.keys()];
  for (const c of cats) {
    if (index.categories.get(c) === 1) report.warn('categorie-isolee', 'vocabulaire', `catégorie « ${c} » utilisée par un seul mot (faute de frappe ?)`);
  }
  const norm = (c) => c.split('_').sort().join('_');
  const seen = new Map();
  for (const c of cats) {
    const n = norm(c);
    if (seen.has(n) && seen.get(n) !== c) report.warn('categorie-doublon', 'vocabulaire', `catégories « ${seen.get(n)} » et « ${c} » semblent identiques`);
    else seen.set(n, c);
  }
}

// ── Fichiers de contenu v2 ──────────────────────────────────────────────────

function characterSet(act) {
  return new Set((act.characters || []).map((c) => c && c.id).filter(Boolean));
}

function checkMissions(index, report, lvl, missions, questionIds) {
  const where0 = `${lvl}/missions.json`;
  const ids = new Set();
  for (const m of missions) {
    const where = `${where0} · ${m?.id ?? '?'}`;
    if (!m || typeof m.id !== 'string') { report.error('format', where0, 'mission sans identifiant'); continue; }
    if (ids.has(m.id)) report.error('id-duplique', where, 'identifiant en double');
    ids.add(m.id);
    checkReservedPrefix(report, where, m.id, 'mission');
    for (const c of m.characters || []) checkReservedPrefix(report, where, c?.id, 'personnage');
    if (!index.places.has(m.place)) report.error('lieu-inconnu', where, `lieu inconnu « ${m.place} »`);
    const allowed = checkActivity(index, report, where, m, lvl);
    const chars = characterSet(m);
    (m.dialogue || []).forEach((s, i) => checkSentence(index, report, `${where} · dialogue ${i + 1}`, s, { characters: chars }));
    checkQuestions(index, report, where, m.exercises, m.id, allowed, questionIds);
  }
}

function checkLectures(index, report, lvl, lectures, questionIds) {
  const where0 = `${lvl}/lectures.json`;
  const ids = new Set();
  for (const l of lectures) {
    const where = `${where0} · ${l?.id ?? '?'}`;
    if (!l || typeof l.id !== 'string') { report.error('format', where0, 'lecture sans identifiant'); continue; }
    if (ids.has(l.id)) report.error('id-duplique', where, 'identifiant en double');
    ids.add(l.id);
    checkReservedPrefix(report, where, l.id, 'lecture');
    for (const c of l.characters || []) checkReservedPrefix(report, where, c?.id, 'personnage');
    if (!['histoire', 'dialogue', 'carnet', 'lettre'].includes(l.type)) report.error('format', where, `type inconnu « ${l.type} »`);
    if (l.place !== undefined && l.place !== null && !index.places.has(l.place)) report.error('lieu-inconnu', where, `lieu inconnu « ${l.place} »`);
    const allowed = checkActivity(index, report, where, l, lvl);
    const chars = characterSet(l);
    const blocks = l.blocks || [];
    blocks.forEach((b, bi) => {
      const bWhere = `${where} · bloc ${bi + 1}`;
      if (Array.isArray(b.lines)) b.lines.forEach((s, li) => checkSentence(index, report, `${bWhere} · ligne ${li + 1}`, s, { characters: chars }));
      else checkSentence(index, report, bWhere, b, { characters: chars });
    });
    for (const [qi, q] of (l.questions || []).entries()) {
      const ref = q && q.line_ref;
      if (!Array.isArray(ref)) continue;
      const block = blocks[ref[0]];
      const ok = block && (ref.length === 1 || (Array.isArray(block.lines) && block.lines[ref[1]]));
      if (!ok) report.error('line-ref-invalide', `${where} · question ${qi + 1}`, `« line_ref » ${JSON.stringify(ref)} ne désigne aucune ligne`);
    }
    checkQuestions(index, report, where, l.questions, l.id, allowed, questionIds);
  }
}

function checkExpressions(index, report, expressions) {
  const where0 = 'expressions.json';
  const ids = new Set();
  for (const e of expressions) {
    const where = `${where0} · ${e?.id ?? '?'}`;
    if (!e || typeof e.id !== 'string') { report.error('format', where0, 'expression sans identifiant'); continue; }
    if (ids.has(e.id)) report.error('id-duplique', where, 'identifiant en double');
    ids.add(e.id);
    if (!e.id.startsWith('ex_')) report.error('prefixe-id', where, "l'identifiant devrait commencer par « ex_ »");
    checkReservedPrefix(report, where, e.id, 'expression');
    for (const [i, v] of (e.variants || []).entries()) {
      if (!index.registers.has(v?.register)) report.error('registre-inconnu', `${where} · variante ${i + 1}`, `registre inconnu « ${v?.register} »`);
      if (typeof v?.romaji === 'string' && MACRON.test(v.romaji)) report.warn('romaji-macron', `${where} · variante ${i + 1}`, 'romaji avec macron');
    }
    for (const p of e.places || []) if (!index.places.has(p)) report.error('lieu-inconnu', where, `lieu inconnu « ${p} »`);
    for (const r of e.related || []) if (!index.expression.has(r)) report.error('ref-inexistante', where, `expression liée inexistante « ${r} »`);
    if (e.refs) checkRefGroup(index, report, where, e.refs, 'refs');
    (e.examples || []).forEach((s, i) => checkSentence(index, report, `${where} · exemple ${i + 1}`, s));
    (e.responses || []).forEach((s, i) => {
      if (s?.register && !index.registers.has(s.register)) report.error('registre-inconnu', `${where} · réponse ${i + 1}`, `registre inconnu « ${s.register} »`);
    });
  }
}

function checkLieux(index, report, lieux) {
  for (const l of lieux) {
    checkReservedPrefix(report, `lieux.json · ${l?.id ?? '?'}`, l?.id, 'lieu');
    for (const c of l?.vocab_categories || []) {
      if (!index.categories.has(c)) report.warn('categorie-inconnue', `lieux.json · ${l.id}`, `catégorie de vocabulaire inconnue « ${c} »`);
    }
  }
}

function checkParticles(index, report, lvl, particles) {
  for (const [i, p] of particles.entries()) {
    if (p?.grammar_id && !index.grammar.has(p.grammar_id)) {
      report.error('ref-inexistante', `${lvl}/particles.json · ${p.particle ?? i + 1}`, `leçon inexistante « ${p.grammar_id} »`);
    }
  }
}

// ── Registres A2 (A2-02) ────────────────────────────────────────────────────
//
// Intégrité interne des registres de data/registries/ (décision 11 d'A2-02). Leur usage par le
// vocabulaire est contrôlé ailleurs (A2-03). Chaque registre a sa propre structure ; tous ont
// une version de snapshot `source` et des familles.

const REGISTRY_ID = /^[a-z0-9]+(_[a-z0-9]+)*$/;
export const REGISTRY_SOURCES = Object.freeze({
  'categories.json': 'A2-L3-v1',
  'semantic-types.json': 'A2-ST-v1',
  'dimensions.json': 'A2-DIM-v1',
  'relations.json': 'A2-REL-v1.1',
  'linguistic-functions.json': 'A2-LING-v1'
});

// Un nœud de registre : exactement les clés attendues, identifiant valide et non réservé,
// libellé non vide. Renvoie vrai si le nœud est utilisable pour la suite des contrôles.
function checkRegistryNode(report, where, node, keys, what) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    report.error('registre-format', where, `${what} : objet attendu`);
    return false;
  }
  const actual = Object.keys(node).sort().join(',');
  if (actual !== [...keys].sort().join(',')) {
    report.error('registre-format', where, `${what} : clés ${actual || '(aucune)'} au lieu de ${keys.join(', ')}`);
  }
  if (typeof node.id !== 'string' || !REGISTRY_ID.test(node.id)) {
    report.error('registre-id', where, `${what} : identifiant invalide « ${node.id} » (minuscules ASCII et « _ »)`);
    return false;
  }
  checkReservedPrefix(report, where, node.id, what);
  if (typeof node.label !== 'string' || node.label.trim() === '') report.error('registre-format', where, `${what} « ${node.id} » : libellé manquant`);
  return true;
}

function checkUnique(report, where, ids, what) {
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) report.error('id-duplique', where, `${what} « ${id} » en double`);
    seen.add(id);
  }
}

// Racine commune : { source, families }, puis les enfants de chaque famille sous `childKey`.
// Renvoie la liste des enfants valides, avec leur famille.
function checkRegistryRoot(report, file, data, childKey, childWhat) {
  const where = `registries/${file}`;
  if (!data || typeof data !== 'object' || Array.isArray(data)) { report.error('registre-format', where, 'objet attendu'); return []; }
  const keys = Object.keys(data).sort().join(',');
  if (keys !== 'families,source') report.error('registre-format', where, `clés ${keys} au lieu de source, families`);
  if (data.source !== REGISTRY_SOURCES[file]) report.error('registre-source', where, `source « ${data.source} » au lieu de « ${REGISTRY_SOURCES[file]} »`);
  if (!Array.isArray(data.families) || data.families.length === 0) { report.error('registre-format', where, '« families » doit être une liste non vide'); return []; }
  const children = [];
  const families = data.families.filter((f, i) => checkRegistryNode(report, `${where} · famille ${i + 1}`, f, ['id', 'label', childKey], 'famille'));
  checkUnique(report, where, families.map((f) => f.id), 'famille');
  for (const f of families) {
    const fWhere = `${where} · ${f.id}`;
    if (!Array.isArray(f[childKey]) || f[childKey].length === 0) { report.error('registre-format', fWhere, `« ${childKey} » doit être une liste non vide`); continue; }
    f[childKey].forEach((c, i) => children.push({ node: c, family: f.id, where: `${fWhere} · ${i + 1}` }));
  }
  return children.filter((c) => {
    const ok = c.node !== null && typeof c.node === 'object' && !Array.isArray(c.node);
    if (!ok) report.error('registre-format', c.where, `${childWhat} : objet attendu`);
    return ok;
  });
}

function checkSemanticTypes(report, data) {
  const types = checkRegistryRoot(report, 'semantic-types.json', data, 'types', 'type')
    .filter((c) => checkRegistryNode(report, c.where, c.node, ['id', 'label'], 'type'));
  checkUnique(report, 'registries/semantic-types.json', types.map((c) => c.node.id), 'type');
}

function checkDimensions(report, data) {
  const where = 'registries/dimensions.json';
  const axes = checkRegistryRoot(report, 'dimensions.json', data, 'axes', 'axe')
    .filter((c) => checkRegistryNode(report, c.where, c.node, ['id', 'label', 'poles'], 'axe'));
  checkUnique(report, where, axes.map((c) => c.node.id), 'axe');
  for (const { node: axis, where: aWhere } of axes) {
    // Un axe a au moins un pôle : « Probabilité » n'en a qu'un (décision 4 d'A2-02).
    if (!Array.isArray(axis.poles) || axis.poles.length === 0) { report.error('registre-format', aWhere, `axe « ${axis.id} » sans pôle`); continue; }
    const poles = axis.poles.filter((p, i) => checkRegistryNode(report, `${aWhere} · pôle ${i + 1}`, p, ['id', 'label'], 'pôle'));
    checkUnique(report, aWhere, poles.map((p) => p.id), 'pôle');
  }
}

function checkRelations(report, data) {
  const where = 'registries/relations.json';
  const relations = checkRegistryRoot(report, 'relations.json', data, 'relations', 'relation')
    .filter((c) => checkRegistryNode(report, c.where, c.node, ['id', 'label', 'symmetric', 'inverse'], 'relation'));
  checkUnique(report, where, relations.map((c) => c.node.id), 'relation');
  const byId = new Map(relations.map((c) => [c.node.id, c.node]));
  for (const { node: r, where: rWhere } of relations) {
    if (typeof r.symmetric !== 'boolean') report.error('registre-format', rWhere, `« ${r.id} » : « symmetric » doit être un booléen`);
    if (r.inverse === null) continue;
    const inv = byId.get(r.inverse);
    if (!inv) report.error('inverse-invalide', rWhere, `« ${r.id} » : inverse inconnu « ${r.inverse} »`);
    else if (inv === r) report.error('inverse-invalide', rWhere, `« ${r.id} » est son propre inverse`);
    else if (inv.inverse !== r.id) report.error('inverse-invalide', rWhere, `« ${r.id} » ↔ « ${inv.id} » : inverse non réciproque`);
    if (r.symmetric === true) report.error('inverse-invalide', rWhere, `« ${r.id} » est symétrique : elle n'a pas d'inverse`);
  }
}

function checkLinguisticFunctions(report, data) {
  const functions = checkRegistryRoot(report, 'linguistic-functions.json', data, 'functions', 'fonction')
    .filter((c) => checkRegistryNode(report, c.where, c.node, ['id', 'label'], 'fonction'));
  checkUnique(report, 'registries/linguistic-functions.json', functions.map((c) => c.node.id), 'fonction');
}

// Catégories (A2-02 · 3.2) : un arbre { source, levels }, niveaux 1 → 2 → 3. Identité locale :
// un identifiant n'est unique que parmi ses frères ; un nœud de niveau 2 est identifié par
// (L1, L2), un nœud de niveau 3 par (L1, L2, L3). Les répétitions entre parents différents
// (« mois », « radio → radio ») sont donc légales. Un niveau 2 sans niveau 3 a `children: []`.
function checkCategoryTree(report, data) {
  const where = 'registries/categories.json';
  if (!data || typeof data !== 'object' || Array.isArray(data)) { report.error('registre-format', where, 'objet attendu'); return; }
  const keys = Object.keys(data).sort().join(',');
  if (keys !== 'levels,source') report.error('registre-format', where, `clés ${keys} au lieu de source, levels`);
  if (data.source !== REGISTRY_SOURCES['categories.json']) report.error('registre-source', where, `source « ${data.source} » au lieu de « ${REGISTRY_SOURCES['categories.json']} »`);
  if (!Array.isArray(data.levels) || data.levels.length === 0) { report.error('registre-format', where, '« levels » doit être une liste non vide'); return; }
  // Vérifie une fratrie : chaque nœud, puis l'unicité des identifiants parmi ces seuls frères.
  const siblings = (list, sWhere, nodeKeys, what) => {
    if (!Array.isArray(list)) { report.error('registre-format', sWhere, '« children » doit être une liste'); return []; }
    const ok = list.filter((n, i) => checkRegistryNode(report, `${sWhere} · ${i + 1}`, n, nodeKeys, what));
    checkUnique(report, sWhere, ok.map((n) => n.id), what);
    return ok;
  };
  for (const l1 of siblings(data.levels, where, ['id', 'label', 'children'], 'catégorie de niveau 1')) {
    for (const l2 of siblings(l1.children, `${where} · ${l1.id}`, ['id', 'label', 'children'], 'catégorie de niveau 2')) {
      siblings(l2.children, `${where} · ${l1.id} › ${l2.id}`, ['id', 'label'], 'catégorie de niveau 3');
    }
  }
}

const REGISTRY_CHECKS = {
  'categories.json': checkCategoryTree,
  'semantic-types.json': checkSemanticTypes,
  'dimensions.json': checkDimensions,
  'relations.json': checkRelations,
  'linguistic-functions.json': checkLinguisticFunctions
};

// ── Point d'entrée ──────────────────────────────────────────────────────────

export function validateData(dataDir) {
  const report = new Report();
  const { index, files } = buildIndex(dataDir, report);

  for (const lvl of VALIDATED_LEVELS) {
    const vocab = loadJson(dataDir, join(lvl, 'vocab.json'), report, { required: true });
    const grammar = loadJson(dataDir, join(lvl, 'grammar.json'), report, { required: true });
    loadJson(dataDir, join(lvl, 'kanji.json'), report, { required: true });
    loadJson(dataDir, join(lvl, 'exemples.json'), report);
    loadJson(dataDir, conceptsPath(lvl), report);
    if (Array.isArray(vocab)) checkVocab(index, report, `${lvl}/vocab.json`, vocab, `${lvl}_v_`);
    if (Array.isArray(grammar)) checkGrammar(index, report, lvl, grammar);

    const questionIds = new Set();
    const missions = loadJson(dataDir, join(lvl, 'missions.json'), report);
    if (Array.isArray(missions)) checkMissions(index, report, lvl, missions, questionIds);
    const lectures = loadJson(dataDir, join(lvl, 'lectures.json'), report);
    if (Array.isArray(lectures)) checkLectures(index, report, lvl, lectures, questionIds);
    const particles = loadJson(dataDir, join(lvl, 'particles.json'), report);
    if (Array.isArray(particles)) checkParticles(index, report, lvl, particles);
  }

  if (Array.isArray(files.hj)) checkVocab(index, report, 'vocab-hors-jlpt.json', files.hj, 'hj_v_');
  if (Array.isArray(files.expressions)) checkExpressions(index, report, files.expressions);
  if (Array.isArray(files.lieux)) checkLieux(index, report, files.lieux);
  if (Array.isArray(files.registres)) {
    for (const r of files.registres) checkReservedPrefix(report, `registres.json · ${r?.id ?? '?'}`, r?.id, 'registre');
  }
  loadJson(dataDir, 'onboarding.json', report);
  for (const [file, check] of Object.entries(REGISTRY_CHECKS)) {
    const data = loadJson(dataDir, join('registries', file), report, { required: true });
    if (data !== undefined) check(report, data);
  }
  checkCategories(index, report);

  return report;
}

// ── Exécution en ligne de commande ──────────────────────────────────────────

function printGrouped(title, items) {
  if (items.length === 0) return;
  console.log(`\n${title} (${items.length})`);
  const byCode = new Map();
  for (const it of items) byCode.set(it.code, [...(byCode.get(it.code) || []), it]);
  for (const [code, list] of byCode) {
    console.log(`\n  [${code}] ${list.length}`);
    for (const it of list.slice(0, 10)) console.log(`    ${it.where} : ${it.message}`);
    if (list.length > 10) console.log(`    … et ${list.length - 10} autre(s)`);
  }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const dataDir = join(root, 'data');
  if (!existsSync(dataDir) || !readdirSync(dataDir).length) {
    console.log('validate-data : dossier data/ introuvable ou vide');
    process.exit(1);
  }
  const { errors, warnings } = validateData(dataDir);
  console.log(`validate-data : niveaux validés ${VALIDATED_LEVELS.join(', ')} + fichiers communs`);
  printGrouped('ERREURS', errors);
  printGrouped('AVERTISSEMENTS', warnings);
  console.log(`\nvalidate-data : ${errors.length} erreur(s), ${warnings.length} avertissement(s)`);
  process.exit(errors.length ? 1 : 0);
}
