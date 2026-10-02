// Ocha v2 — Validateur lexical : références transversales (A2-03 · 4.4)
//
// Contrôles qui relient les SENSE entre eux, et le lexique au reste des données :
//   - I12 : relations entre sens, sur l'index global des SENSE de tous les fichiers fournis ;
//   - I19 : références au vocabulaire venues d'ailleurs (activités, expressions, phrases),
//     fournies DÉJÀ EXTRAITES par l'appelant sous la forme { where, vocab, sense? } ;
//   - I14 hors du vocabulaire : tags des expressions (champ facultatif) et `vocab_tags` des lieux
//     (futur format de lieux.json, publié avec A2-04).
// Tout arrive par le contrat d'entrée : aucun fichier n'est lu ici.

import { SENSE_ID, checkShape, usable } from './schema.mjs';

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Forme d'une référence injectée (I19) : une référence pédagogique vise l'ENTRY ; `sense` la
// précise sans en faire une unité de progression (addendum A2, D1).
export const REFERENCE_SHAPE = Object.freeze({
  where: { type: 'text', required: true },
  vocab: { type: 'text', required: true },
  sense: { type: 'text', required: false }
});

// ── I12 · relations ─────────────────────────────────────────────────────────

// Clé canonique d'un lien selon la sémantique du registre (arbitrage d'A2-03, décision 7) :
// symétrique → ordre indifférent ; paire inverse → une seule écriture commune ; dirigée sans
// inverse → ordre significatif. La présence du lien miroir n'est jamais exigée.
function linkKey(meta, from, to) {
  if (meta.symmetric) return `${meta.id}|${[from, to].sort().join('|')}`;
  if (meta.inverse !== null) {
    const canonical = [meta.id, meta.inverse].sort()[0];
    return meta.id === canonical ? `${canonical}|${from}>${to}` : `${canonical}|${to}>${from}`;
  }
  return `${meta.id}|${from}>${to}`;
}

export function checkRelations(report, { files, index }) {
  // Index global des SENSE : identifiant → ENTRY, sur tous les fichiers fournis.
  const senses = new Map();
  for (const f of files) {
    for (const e of f.entries) {
      if (!usable(e, 'senses', 'list')) continue;
      for (const s of e.senses) if (usable(s, 'id', 'text') && SENSE_ID.test(s.id)) senses.set(s.id, e.id);
    }
  }
  const links = new Map();
  for (const f of files) {
    for (const e of f.entries) {
      if (!usable(e, 'senses', 'list')) continue;
      for (const s of e.senses) {
        if (!usable(s, 'relations', 'list') || !usable(s, 'id', 'text')) continue;
        const where = `${f.file} · ${s.id}`;
        for (const r of s.relations) {
          if (!usable(r, 'type', 'text') || !usable(r, 'target', 'text')) continue; // forme : I1
          const meta = index.relationType(r.type);
          if (meta === null) report.error('relation-inconnue', where, `type de relation « ${r.type} » absent du registre`);
          if (!senses.has(r.target)) { report.error('relation-cible', where, `cible « ${r.target} » : aucun SENSE de ce nom`); continue; }
          if (r.target === s.id) { report.error('relation-cible', where, `relation « ${r.type} » vers le sens lui-même`); continue; }
          if (meta === null) continue;
          const key = linkKey(meta, s.id, r.target);
          if (links.has(key)) report.error('relation-doublon', where, `« ${r.type} » vers « ${r.target} » : lien déjà noté (${links.get(key)})`);
          else links.set(key, `${s.id} ${r.type} ${r.target}`);
        }
      }
    }
  }
  return senses;
}

// ── I19 · références au vocabulaire ─────────────────────────────────────────

export function checkReferences(report, { references, entries, senses }) {
  references.forEach((ref, k) => {
    const where = usable(ref, 'where', 'text') ? ref.where : `référence ${k + 1}`;
    if (!checkShape(report, where, ref, REFERENCE_SHAPE, 'référence')) return;
    if (!usable(ref, 'vocab', 'text')) return;
    if (!entries.has(ref.vocab)) { report.error('reference-inconnue', where, `vocab « ${ref.vocab} » : aucune ENTRY de ce nom`); return; }
    if (!usable(ref, 'sense', 'text')) return;
    // L'index des SENSE dit à quelle ENTRY appartient chaque sens existant : un sens inexistant,
    // mal formé ou d'une autre ENTRY échoue au même contrôle.
    if (senses.get(ref.sense) !== ref.vocab) {
      report.error('reference-sens', where, `sens « ${ref.sense} » : pas un sens existant de « ${ref.vocab} »`);
    }
  });
}

// ── I14 hors du vocabulaire : expressions et lieux ──────────────────────────

// Tags d'une expression (D2) : champ facultatif, non créé par A2-03 ; s'il existe, tags connus,
// sans doublon, jamais de nature `lieu` (une expression a `places`, son champ de lieux).
export function checkExpressionTags(report, { expressions, index }) {
  expressions.forEach((ex, k) => {
    const where = `expressions.json · ${usable(ex, 'id', 'text') ? ex.id : k + 1}`;
    if (!isObject(ex) || !Object.hasOwn(ex, 'tags')) return;
    if (!Array.isArray(ex.tags)) { report.error('type-invalide', where, '« tags » doit être une liste'); return; }
    const seen = new Set();
    for (const t of ex.tags) {
      if (typeof t !== 'string' || t === '') { report.error('type-invalide', where, 'tag : texte non vide attendu'); continue; }
      const kind = index.tagKind(t);
      if (kind === null) report.error('tag-inconnu', where, `tag « ${t} » absent du registre`);
      else if (kind === 'lieu') report.error('tag-lieu-expression', where, `tag de lieu « ${t} » : une expression utilise « places »`);
      if (seen.has(t)) report.error('tag-doublon', where, `tag « ${t} » en double`);
      seen.add(t);
    }
  });
}

// Futur format de lieux.json (publié avec A2-04) : `vocab_tags` désigne des tags existants de
// nature `lieu`, décidé par le champ `kind` du registre et jamais par le préfixe de l'identifiant.
export function checkPlaces(report, { lieux, index }) {
  lieux.forEach((lieu, k) => {
    const where = `lieux.json · ${usable(lieu, 'id', 'text') ? lieu.id : k + 1}`;
    if (!isObject(lieu)) { report.error('type-invalide', where, 'lieu : objet attendu'); return; }
    if (!Array.isArray(lieu.vocab_tags)) { report.error('lieu-format', where, '« vocab_tags » : liste attendue'); return; }
    const seen = new Set();
    for (const t of lieu.vocab_tags) {
      if (typeof t !== 'string' || t === '') { report.error('type-invalide', where, 'tag : texte non vide attendu'); continue; }
      const kind = index.tagKind(t);
      if (kind === null) report.error('tag-inconnu', where, `tag « ${t} » absent du registre`);
      else if (kind !== 'lieu') report.error('lieu-tag-nature', where, `tag « ${t} » de nature « ${kind} » : seule la nature « lieu » est admise`);
      if (seen.has(t)) report.error('tag-doublon', where, `tag « ${t} » en double`);
      seen.add(t);
    }
  });
}
