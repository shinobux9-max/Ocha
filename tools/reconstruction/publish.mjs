// Ocha v2 — Reconstruction (A2-04 · 5.17) : publication
//
// Calcule, EN MÉMOIRE et sans accès au disque, ce que la publication écrit dans data/ : la sortie
// de l'assembleur complet, les lieux convertis, les références remappées. Elle ne décide rien :
// data/ est une PROJECTION de l'espace de reconstruction, jamais une seconde source éditoriale
// (arbitrage du périmètre de 5.17, Q2 et Q8). Lire, afficher et écrire reviennent à run.mjs.
//
// La publication n'écrit que si aucune condition bloquante n'est relevée. L'une d'elles est
// l'inventaire des avertissements connus : absent, ou dépassé par un avertissement nouveau, il
// bloque TOUTE publication, la première comprise. Pour la première, il est amorcé avant, par une
// étape distincte qui n'écrit jamais dans data/ (checkBootstrap).

import { assemble, validateAssembly, remapReferences } from './assemble.mjs';
import { extractReferences } from '../lexicon-adapter.mjs';

// Les sept fichiers de data/ que la publication écrit, et eux seuls.
export const PUBLISHED_FILES = Object.freeze([
  'n5/vocab.json', 'vocab-hors-jlpt.json', 'vocab-retired.json', 'lieux.json',
  'n5/missions.json', 'n5/lectures.json', 'expressions.json'
]);
// Fichiers dont seules les références au vocabulaire changent, par remplacement de jetons.
export const REFERENCE_FILES = Object.freeze(['n5/missions.json', 'n5/lectures.json', 'expressions.json']);

// Avertissements admis du validateur lexical, et baseline exact du seul amorçage initial. Ces
// nombres n'acceptent QUE l'amorçage : la règle permanente est l'inventaire (checkInventory), qui
// refuse toute régression et permet toute diminution (arbitrage, Q5).
export const WARNING_CODES = Object.freeze(['categorie-nulle', 'type-nul', 'kanji-inconnu']);
export const BOOTSTRAP_BASELINE = Object.freeze({ 'categorie-nulle': 120, 'type-nul': 27, 'kanji-inconnu': 1 });

const OLD_ID = /^(?:n[1-5]|hj)_v_[0-9]+$/;
const OLD_TOKEN = /"((?:n[1-5]|hj)_v_[0-9]+)"/g;
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const eolOf = (text) => (text.includes('\r\n') ? '\r\n' : '\n');

/** Texte publié d'un fichier de vocabulaire : indentation de 2, LF, saut de ligne final. */
export const serializeVocab = (value) => `${JSON.stringify(value, null, 2)}\n`;

/**
 * Remplace, dans le texte d'un fichier, chaque chaîne qui est un ancien identifiant de vocabulaire
 * par son identifiant canonique. Le reste du texte est conservé à l'octet.
 * @returns {{ text: string, replaced: { from: string, to: string }[], unknown: string[] }}
 */
export function remapTokens(text, idMap) {
  const replaced = [];
  const unknown = [];
  const out = text.replace(OLD_TOKEN, (match, id) => {
    if (!Object.hasOwn(idMap, id) || idMap[id] === null) { unknown.push(id); return match; }
    replaced.push({ from: id, to: idMap[id] });
    return `"${idMap[id]}"`;
  });
  return { text: out, replaced, unknown };
}

/**
 * Comparaison structurelle : `after` est `before`, à ceci près que chaque chaîne qui était un
 * ancien identifiant de vocabulaire vaut maintenant son identifiant canonique. Rend le nombre de
 * chaînes changées, ou null à la première autre différence.
 */
export function sameExceptIds(before, after, idMap) {
  let changed = 0;
  const walk = (a, b) => {
    if (typeof a === 'string') {
      if (a === b) return true;
      if (OLD_ID.test(a) && Object.hasOwn(idMap, a) && idMap[a] === b) { changed += 1; return true; }
      return false;
    }
    if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((x, i) => walk(x, b[i]));
    if (isObject(a)) {
      const ka = Object.keys(a); const kb = isObject(b) ? Object.keys(b) : null;
      return kb !== null && ka.length === kb.length && ka.every((k, i) => k === kb[i] && walk(a[k], b[k]));
    }
    return a === b;
  };
  return walk(before, after) ? changed : null;
}

/**
 * Lieux : `vocab_categories` est remplacé, À LA MÊME PLACE, par `vocab_tags`, liste du tag que
 * place-tags.json donne au lieu. Les autres champs, l'ordre et la mise en forme sont conservés.
 * Un lieu déjà converti est laissé tel quel (idempotence).
 * @returns {{ text: string, lieux: object[], converted: number, problems: string[] }}
 */
export function convertLieux(text, placeTags) {
  const problems = [];
  const eol = eolOf(text);
  const final = /\r?\n$/.test(text) ? eol : '';
  const serialize = (v) => `${JSON.stringify(v, null, 2).replace(/\n/g, eol)}${final}`;
  const lieux = JSON.parse(text.replace(/^﻿/, ''));
  if (!Array.isArray(lieux)) return { text, lieux: [], converted: 0, problems: ['lieux.json : liste attendue'] };
  if (serialize(lieux) !== text) problems.push('lieux.json : mise en forme inattendue, la conversion ne la conserverait pas');
  let converted = 0;
  const next = lieux.map((lieu) => {
    if (!isObject(lieu) || typeof lieu.id !== 'string') { problems.push('lieux.json : lieu sans identifiant'); return lieu; }
    if (!Object.hasOwn(placeTags, lieu.id)) { problems.push(`lieux.json · ${lieu.id} : aucun tag dans place-tags.json`); return lieu; }
    const tags = [placeTags[lieu.id]];
    if (Object.hasOwn(lieu, 'vocab_categories') && Object.hasOwn(lieu, 'vocab_tags')) {
      problems.push(`lieux.json · ${lieu.id} : « vocab_categories » et « vocab_tags » à la fois`);
      return lieu;
    }
    if (Object.hasOwn(lieu, 'vocab_tags')) {
      if (JSON.stringify(lieu.vocab_tags) !== JSON.stringify(tags)) problems.push(`lieux.json · ${lieu.id} : « vocab_tags » différent de place-tags.json`);
      return lieu;
    }
    if (!Object.hasOwn(lieu, 'vocab_categories')) { problems.push(`lieux.json · ${lieu.id} : ni « vocab_categories » ni « vocab_tags »`); return lieu; }
    converted += 1;
    return Object.fromEntries(Object.entries(lieu).map(([k, v]) => (k === 'vocab_categories' ? ['vocab_tags', tags] : [k, v])));
  });
  return { text: serialize(next), lieux: next, converted, problems };
}

/** Inventaire trié d'une liste d'avertissements : un couple { code, where } par avertissement. */
export function inventoryOf(warnings) {
  return warnings.map((w) => ({ code: w.code, where: w.where }))
    .sort((a, b) => (a.where === b.where ? a.code.localeCompare(b.code) : a.where.localeCompare(b.where)));
}

const keyOf = (w) => `${w.code}\u0000${w.where}`;

/**
 * Règle permanente. Problèmes : inventaire absent ou mal formé, avertissement nouveau, code non
 * admis. Un avertissement de l'inventaire qui n'est plus émis est ACCEPTÉ, et seulement signalé
 * dans `gone` : une diminution reste permise.
 */
export function checkInventory(warnings, inventory) {
  const problems = [];
  if (inventory === null || inventory === undefined) return { problems: ['inventaire des avertissements connus absent (avertissements-connus.json)'], gone: [] };
  if (!Array.isArray(inventory) || inventory.some((x) => !isObject(x) || typeof x.code !== 'string' || typeof x.where !== 'string' || Object.keys(x).length !== 2)) {
    return { problems: ['inventaire des avertissements connus : liste de { code, where } attendue'], gone: [] };
  }
  const known = new Set(inventory.map(keyOf));
  if (known.size !== inventory.length) problems.push('inventaire des avertissements connus : ligne en double');
  for (const x of inventory) if (!WARNING_CODES.includes(x.code)) problems.push(`inventaire : code « ${x.code} » non admis`);
  const emitted = new Set();
  for (const w of warnings) {
    emitted.add(keyOf(w));
    if (!WARNING_CODES.includes(w.code)) problems.push(`avertissement de code inattendu « ${w.code} » : ${w.where}`);
    else if (!known.has(keyOf(w))) problems.push(`avertissement nouveau, absent de l'inventaire : [${w.code}] ${w.where}`);
  }
  return { problems, gone: inventory.filter((x) => !emitted.has(keyOf(x))) };
}

/**
 * Amorçage, pour la PREMIÈRE publication seulement. Accepté sur le seul baseline exact : aucune
 * erreur, les seuls codes admis, et exactement les nombres de BOOTSTRAP_BASELINE. Refusé si un
 * inventaire existe déjà, ou si data/ est déjà publié (présence de vocab-retired.json).
 */
export function checkBootstrap({ errors, warnings }, { inventoryExists, alreadyPublished }) {
  const problems = [];
  if (inventoryExists) problems.push('amorçage refusé : un inventaire des avertissements existe déjà');
  if (alreadyPublished) problems.push('amorçage refusé : data/ est déjà publié (data/vocab-retired.json existe) ; un état partiel se diagnostique et se répare, le baseline ne se recrée pas');
  if (errors.length) problems.push(`amorçage refusé : ${errors.length} erreur(s) du validateur lexical`);
  const counts = {};
  for (const w of warnings) counts[w.code] = (counts[w.code] ?? 0) + 1;
  for (const code of Object.keys(counts)) if (!WARNING_CODES.includes(code)) problems.push(`amorçage refusé : code d'avertissement inattendu « ${code} »`);
  for (const [code, n] of Object.entries(BOOTSTRAP_BASELINE)) {
    if ((counts[code] ?? 0) !== n) problems.push(`amorçage refusé : ${counts[code] ?? 0} « ${code} » au lieu de ${n}`);
  }
  const total = Object.values(BOOTSTRAP_BASELINE).reduce((a, b) => a + b, 0);
  if (warnings.length !== total) problems.push(`amorçage refusé : ${warnings.length} avertissements au lieu de ${total}`);
  return problems;
}

/**
 * Calcule la publication.
 * @param {object} input
 * @param {{ vocab, hj, lieux, exemples, placeTags }} input.sources sources figées de la reconstruction
 * @param {object[]} input.lots fichiers de lot
 * @param {object[]} input.journal journal des décisions
 * @param {{ registries, knownKanji, particles }} input.deps dépendances du validateur lexical
 * @param {Record<string, string>} input.raw texte actuel de lieux.json et des trois fichiers de
 *   références, par chemin relatif à data/
 * @param {object[]|null} input.inventory inventaire des avertissements connus, ou null s'il est absent
 * @returns {{ files: Record<string, string>, blocking: string[], lexical: { errors, warnings }, gone: object[], summary: object }}
 *   files : texte de chacun des sept fichiers publiés ; blocking : conditions bloquantes relevées
 */
export function buildPublication({ sources, lots, journal, deps, raw, inventory }) {
  const blocking = [];
  const block = (code, message) => blocking.push(`[${code}] ${message}`);

  // Tout est validé : une proposition n'est jamais publiée.
  const pendingEntries = lots.flatMap((l) => Object.entries(l?.entries ?? {}).filter(([, e]) => e?.status !== 'validated').map(([id]) => `${l.lot} · ${id}`));
  if (pendingEntries.length) block('proposition', `${pendingEntries.length} entrée(s) de lot non validée(s) : ${pendingEntries.slice(0, 5).join(', ')}`);
  const pendingDecisions = journal.filter((d) => d?.status !== 'validated').map((d) => d?.id);
  if (pendingDecisions.length) block('proposition', `${pendingDecisions.length} décision(s) du journal non validée(s) : ${pendingDecisions.slice(0, 5).join(', ')}`);

  // Assemblage complet, sans problème, sans entrée écartée, sans attente.
  const assembly = assemble({ sources, lots, journal, mode: 'complete' });
  for (const p of assembly.problems) block('assemblage', `${p.where ?? p.entry} : ${p.message ?? p.reason}`);
  for (const p of assembly.pending) block('assemblage', `en attente : ${p.entry} (${p.reason})`);

  const files = {};
  for (const f of assembly.files) files[f.file] = serializeVocab(f.entries);
  files['vocab-retired.json'] = serializeVocab(assembly.retired);

  // Lieux.
  const lieux = convertLieux(raw['lieux.json'], sources.placeTags);
  for (const p of lieux.problems) block('lieux', p);
  files['lieux.json'] = lieux.text;

  // Références : remplacement de jetons, puis comparaison structurelle.
  const canonical = new Set(assembly.files.flatMap((f) => f.entries).map((e) => e.id));
  const parsed = {};
  const replaced = {};
  for (const file of REFERENCE_FILES) {
    const before = raw[file];
    const r = remapTokens(before, assembly.idMap);
    for (const id of r.unknown) block('reference', `${file} : « ${id} » sans identifiant canonique (inconnu, ou retiré sans successeur)`);
    const a = JSON.parse(before.replace(/^﻿/, ''));
    const b = JSON.parse(r.text.replace(/^﻿/, ''));
    const changed = sameExceptIds(a, b, assembly.idMap);
    if (changed === null || changed !== r.replaced.length) block('reference', `${file} : le remplacement a changé autre chose que les identifiants de vocabulaire`);
    if (new RegExp(OLD_TOKEN.source).test(r.text)) block('reference', `${file} : un ancien identifiant de vocabulaire subsiste`);
    files[file] = r.text;
    parsed[file] = b;
    replaced[file] = r.replaced.length;
  }
  const extracted = extractReferences({
    activities: [{ file: 'n5/missions.json', items: parsed['n5/missions.json'] }, { file: 'n5/lectures.json', items: parsed['n5/lectures.json'] }],
    expressions: parsed['expressions.json']
  });
  // Après le remplacement, toute référence est déjà canonique : le remappeur, strict, la garde
  // telle quelle ou la signale.
  const remapped = remapReferences(extracted, assembly.idMap, canonical);
  for (const r of remapped.unknown) block('reference', `${r.where} : « ${r.vocab} » ne désigne aucune ENTRY publiée`);

  // Validateur lexical, sur l'état publié : lieux convertis, expressions et références remappées.
  const report = validateAssembly(assembly, { ...deps, expressions: parsed['expressions.json'], lieux: lieux.lieux }, { references: remapped.references });
  for (const e of report.errors) block('lexique', `[${e.code}] ${e.where} : ${e.message}`);
  for (const p of report.pending) block('assemblage', `en attente : ${p.entry} (${p.reason})`);

  // Inventaire des avertissements connus.
  const inv = checkInventory(report.warnings, inventory);
  for (const p of inv.problems) block('avertissements', p);

  const count = (list, key) => list.reduce((c, x) => ({ ...c, [x[key]]: (c[x[key]] ?? 0) + 1 }), {});
  return {
    files, blocking,
    lexical: { errors: report.errors, warnings: report.warnings },
    gone: inv.gone,
    summary: {
      entries: Object.fromEntries(assembly.files.map((f) => [f.file, f.entries.length])),
      retired: assembly.retired.length,
      lieux: { total: lieux.lieux.length, converted: lieux.converted },
      references: { total: extracted.length, replaced, kept: remapped.references.length },
      warnings: { total: report.warnings.length, byCode: count(report.warnings, 'code') },
      errors: report.errors.length
    }
  };
}
