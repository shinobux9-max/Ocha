// Ocha v2 — Validateur lexical : SENSE (A2-03 · 4.3)
//
// Contrôles de docs/conception/schema-A2-01.md, §12 : I7, I8, I9, I10, I11, I13, I14 (tags de
// l'ENTRY et de ses SENSE) et I15. La forme stricte des SENSE (I1) est vérifiée par la description
// déclarative (schema.mjs) quand l'ENTRY est vérifiée.
//
// Hors de 4.3 : I12 (type, cible et cohérence des relations, 4.4) ; I14 pour les expressions et
// les lieux (4.4). La stabilité historique des identifiants de sens (« numérotation monotone ») ne
// se déduit pas d'un seul état des données : elle relève du journal de reconstruction (A2-04).

import { SENSE_ID, usable } from './schema.mjs';

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Une fonction linguistique au moins, dans l'une ou l'autre famille.
function hasFunction(sense) {
  const lf = sense.linguistic_functions;
  if (!isObject(lf)) return false;
  return Object.values(lf).some((list) => Array.isArray(list) && list.length > 0);
}

// I14 · tags : connus, sans doublon dans la liste ; `kind` lu au registre, jamais déduit du nom.
function checkTagList(report, ctx, where, tags) {
  const seen = new Set();
  for (const t of tags) {
    if (typeof t !== 'string' || t === '') continue;
    if (ctx.index.tagKind(t) === null) report.error('tag-inconnu', where, `tag « ${t} » absent du registre`);
    if (seen.has(t)) report.error('tag-doublon', where, `tag « ${t} » en double`);
    seen.add(t);
  }
}

function checkSense(report, ctx, entryWhere, entry, sense, k, ids, retired) {
  const where = `${entryWhere} · ${typeof sense?.id === 'string' ? sense.id : `senses[${k}]`}`;
  if (!isObject(sense)) return; // forme déjà signalée par I1

  // I7 · identifiant : forme, appartenance à l'ENTRY, unicité, jamais un identifiant retiré
  if (usable(sense, 'id', 'text')) {
    if (!SENSE_ID.test(sense.id)) report.error('sens-id', where, `identifiant « ${sense.id} » : forme v_<n>_s<m> attendue`);
    else if (typeof entry.id === 'string' && !sense.id.startsWith(`${entry.id}_s`)) {
      report.error('sens-id', where, `« ${sense.id} » n'appartient pas à l'ENTRY « ${entry.id} »`);
    }
    if (ids.has(sense.id)) report.error('id-duplique', where, `sens « ${sense.id} » en double`);
    ids.add(sense.id);
    if (retired.has(sense.id)) report.error('id-retire', where, `« ${sense.id} » figure dans retired_sense_ids`);
  }

  // I8 · libellé : alternatives distinctes entre elles et du libellé principal
  const m = sense.meaning;
  if (usable(sense, 'meaning', 'object') && usable(m, 'alternatives', 'list')) {
    const seen = new Set(usable(m, 'primary', 'text') ? [m.primary] : []);
    for (const a of m.alternatives) {
      if (typeof a !== 'string' || a === '') continue;
      if (seen.has(a)) report.error('sens-libelle', where, `traduction « ${a} » répétée`);
      seen.add(a);
    }
  }

  // I9 · catégorie : chemin complet existant, ou null (addendum A5). Pour une unité grammaticale
  // ou pragmatique, une fonction linguistique justifie null. Pour un sens lexical plein, null est
  // une décision humaine justifiée au journal de reconstruction, que les données canoniques ne
  // portent pas : le validateur le signale pour l'audit, sans le refuser.
  if (Object.hasOwn(sense, 'category')) {
    if (sense.category === null) {
      if (!hasFunction(sense)) report.warn('categorie-nulle', where, 'category: null pour un sens lexical (sans fonction linguistique) : décision à justifier (addendum A5)');
    } else if (isObject(sense.category) && typeof sense.category.level_1 === 'string') {
      let node = null;
      try {
        node = ctx.index.resolveCategory(sense.category);
      } catch (e) {
        report.error('categorie-chemin', where, e.message);
        node = undefined;
      }
      if (node === null) {
        const path = ['level_1', 'level_2', 'level_3'].map((l) => sense.category[l]).filter((x) => x != null).join(' › ');
        report.error('categorie-inconnue', where, `chemin de catégorie « ${path} » absent du registre`);
      }
    }
  }

  // I10 · type sémantique : terminal du registre, ou null seulement si category est null
  if (Object.hasOwn(sense, 'semantic_type')) {
    if (sense.semantic_type === null) {
      if (sense.category !== null) report.error('type-nul', where, 'semantic_type: null seulement si category est null');
    } else if (typeof sense.semantic_type === 'string' && sense.semantic_type !== '' && !ctx.index.isSemanticType(sense.semantic_type)) {
      report.error('type-inconnu', where, `type sémantique « ${sense.semantic_type} » : type terminal du registre attendu`);
    }
  }

  // I11 · dimensions : axe et pôle du registre, pôle de cet axe, un axe au plus une fois
  if (usable(sense, 'dimensions', 'list')) {
    const axes = new Set();
    for (const d of sense.dimensions) {
      if (!usable(d, 'axis', 'text') || !usable(d, 'pole', 'text')) continue;
      const poles = ctx.index.axisPoles(d.axis);
      if (poles === null) report.error('dimension-inconnue', where, `axe « ${d.axis} » absent du registre`);
      else if (!poles.includes(d.pole)) report.error('pole-inconnu', where, `pôle « ${d.pole} » hors de l'axe « ${d.axis} » (${poles.join(', ')})`);
      if (axes.has(d.axis)) report.error('dimension-doublon', where, `axe « ${d.axis} » porté deux fois`);
      axes.add(d.axis);
    }
  }

  // I13 · fonctions linguistiques : au registre, chacune dans sa famille
  if (usable(sense, 'linguistic_functions', 'object')) {
    for (const family of ctx.index.functionFamilies()) {
      const list = sense.linguistic_functions[family];
      if (!Array.isArray(list)) continue;
      for (const f of list) {
        if (typeof f === 'string' && f !== '' && !ctx.index.isFunction(family, f)) {
          report.error('fonction-inconnue', where, `fonction « ${f} » absente de la famille « ${family} »`);
        }
      }
    }
  }

  // I14 · tags du SENSE : connus, sans doublon, jamais un tag déjà porté par l'ENTRY
  if (usable(sense, 'tags', 'list')) {
    checkTagList(report, ctx, where, sense.tags);
    const entryTags = usable(entry, 'tags', 'list') ? new Set(entry.tags) : new Set();
    for (const t of new Set(sense.tags)) {
      if (entryTags.has(t)) report.error('tag-repete', where, `tag « ${t} » déjà porté par l'ENTRY`);
    }
  }

  // I15 · particules : valeurs de particles.json
  if (usable(sense, 'particles', 'list')) {
    for (const p of sense.particles) {
      if (typeof p === 'string' && p !== '' && !ctx.particles.has(p)) report.error('particule-inconnue', where, `particule « ${p} » absente de particles.json`);
    }
  }
}

/**
 * Contrôles des SENSE d'une ENTRY, et des tags de l'ENTRY elle-même (I14).
 * @param {{ index: object, particles: Set<string> }} ctx
 */
export function checkSenses(report, ctx, where, entry) {
  // I14 · tags de l'ENTRY : connus, sans doublon
  if (usable(entry, 'tags', 'list')) checkTagList(report, ctx, where, entry.tags);

  // I7 · identifiants retirés : forme d'un sens de cette ENTRY
  const retired = new Set();
  if (usable(entry, 'retired_sense_ids', 'list')) {
    for (const r of entry.retired_sense_ids) {
      if (typeof r !== 'string' || r === '') continue;
      if (!SENSE_ID.test(r) || (typeof entry.id === 'string' && !r.startsWith(`${entry.id}_s`))) {
        report.error('sens-retire-invalide', where, `« ${r} » n'a pas la forme d'un sens de cette ENTRY`);
      }
      retired.add(r);
    }
  }

  if (!usable(entry, 'senses', 'list')) return;
  // I7 · au moins un SENSE
  if (entry.senses.length === 0) report.error('sens-manquant', where, 'au moins un SENSE attendu');
  const ids = new Set();
  entry.senses.forEach((sense, k) => checkSense(report, ctx, where, entry, sense, k, ids, retired));
}
