// Ocha v2 — Adaptateur du validateur lexical (A2-03 · 4.5)
//
// Le validateur lexical (tools/lexicon/) est pur : il reçoit toutes ses données. Ce module est son
// adaptateur : il lit les fichiers de data/ et construit les dépendances, et il extrait les
// références au vocabulaire des formats sources actuels. Il est placé HORS de tools/lexicon/
// pour que le cœur reste sans accès au disque.
//
// Deux appelants (arbitrage d'A2-03) :
//   - depuis A2-04.0, l'outil d'assemblage, sur l'espace de reconstruction ;
//   - depuis la publication d'A2-04 (5.17), validate-data, sur data/, à la place de l'ancien
//     contrôle du vocabulaire. data/n5/vocab.json est au schéma A2-01.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { readRegistries } from './lexicon/index.mjs';

const ALL_LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/**
 * Dépendances du validateur lexical, lues dans data/ :
 *   - registries : les huit registres ;
 *   - knownKanji : catalogues de kanji de tous les niveaux présents, et dictionnaire (A2), comme
 *     l'actuel contrôle `kanji-inconnu`. Seules les clés d'un caractère sont des kanji : le
 *     dictionnaire contient aussi quelques mots (山羊, 生活…), écartés ici et signalés comme
 *     anomalie de données (ETAT-ACTUEL.md) ;
 *   - particles : valeurs `particle` des particles.json présents (I15) ;
 *   - expressions : expressions.json (I14 : seul `tags` est examiné) ;
 *   - lieux : seulement si `includeLieux` est vrai. Depuis la publication d'A2-04 (5.17),
 *     lieux.json porte `vocab_tags` ; il n'y a aucune détection automatique du format.
 */
export function readLexiconDependencies(dataDir, { includeLieux = false } = {}) {
  const knownKanji = new Set();
  const particles = new Set();
  for (const lvl of ALL_LEVELS) {
    const kanjiPath = join(dataDir, lvl, 'kanji.json');
    if (existsSync(kanjiPath)) for (const c of readJson(kanjiPath).chars ?? []) knownKanji.add(c);
    const partPath = join(dataDir, lvl, 'particles.json');
    if (existsSync(partPath)) for (const p of readJson(partPath)) if (typeof p?.particle === 'string') particles.add(p.particle);
  }
  const dict = join(dataDir, 'kanji_jouyou_fr.json');
  if (existsSync(dict)) for (const c of Object.keys(readJson(dict))) if ([...c].length === 1) knownKanji.add(c);
  const deps = {
    registries: readRegistries(dataDir),
    knownKanji: [...knownKanji],
    particles: [...particles],
    expressions: readJson(join(dataDir, 'expressions.json'))
  };
  if (includeLieux) deps.lieux = readJson(join(dataDir, 'lieux.json'));
  return deps;
}

/** Contenu de data/vocab-retired.json (ou du fichier équivalent de l'espace de travail). */
export const readRetired = (path) => readJson(path);

// ── Extraction des références au vocabulaire (I19) ──────────────────────────
//
// Parcours identique à celui de validate-data : requires, teaches, cibles des questions, refs
// des phrases (dialogues, blocs et lignes des lectures, exemples des expressions), refs des
// expressions. Les formats actuels ne portent aucun `sense` : l'extracteur n'en produit jamais.
// Le futur registre de phrases n'est pas connu ici : son extraction viendra avec son projet.

function fromGroup(out, where, group, label) {
  if (!isObject(group) || !Array.isArray(group.vocab)) return;
  for (const id of group.vocab) if (typeof id === 'string') out.push({ where: `${where} · ${label}`, vocab: id });
}

function fromSentence(out, where, sentence) {
  if (!isObject(sentence)) return;
  for (const r of sentence.refs || []) if (isObject(r) && typeof r.vocab === 'string') out.push({ where, vocab: r.vocab });
}

function fromActivity(out, file, act) {
  if (!isObject(act) || typeof act.id !== 'string') return;
  const where = `${file} · ${act.id}`;
  fromGroup(out, where, act.requires, 'requires');
  fromGroup(out, where, act.teaches, 'teaches');
  (act.dialogue || []).forEach((s, i) => fromSentence(out, `${where} · dialogue ${i + 1}`, s));
  (act.blocks || []).forEach((b, bi) => {
    if (Array.isArray(b?.lines)) b.lines.forEach((s, li) => fromSentence(out, `${where} · bloc ${bi + 1} · ligne ${li + 1}`, s));
    else fromSentence(out, `${where} · bloc ${bi + 1}`, b);
  });
  [...(act.exercises || []), ...(act.questions || [])].forEach((q, i) => fromGroup(out, `${where} · question ${i + 1}`, q?.target, 'target'));
}

/**
 * Références au vocabulaire, normalisées en { where, vocab } (jamais de `sense`).
 * @param {{ activities?: { file: string, items: object[] }[], expressions?: object[] }} sources
 */
export function extractReferences({ activities = [], expressions = [] } = {}) {
  const out = [];
  for (const { file, items } of activities) for (const act of items || []) fromActivity(out, file, act);
  for (const e of expressions) {
    if (!isObject(e) || typeof e.id !== 'string') continue;
    const where = `expressions.json · ${e.id}`;
    fromGroup(out, where, e.refs, 'refs');
    (e.examples || []).forEach((s, i) => fromSentence(out, `${where} · exemple ${i + 1}`, s));
  }
  return out;
}

/** Missions et lectures des niveaux demandés, pour extractReferences. */
export function readActivities(dataDir, levels) {
  const out = [];
  for (const lvl of levels) {
    for (const name of ['missions.json', 'lectures.json']) {
      const path = join(dataDir, lvl, name);
      if (existsSync(path)) out.push({ file: `${lvl}/${name}`, items: readJson(path) });
    }
  }
  return out;
}
