// Ocha v2 — Reconstruction (A2-04) : rapport de relecture d'un lot
//
// Génère, à partir des SEULES données JSON (sources, pré-remplissage, lot, journal), un document
// Markdown pour la relecture humaine. Ce rapport n'est jamais relu par un outil : le JSON du lot
// reste la seule source des décisions.
//
// Les doublons candidats du lot 0 sont présentés ensemble, sous un en-tête de groupe, pour que la
// relecture tranche entre fusion, séparation ou autre correction. Chaque décision citée au journal
// est montrée avec sa raison.

import { prefillAll } from './mechanical.mjs';
import { HUMAN_FIELDS, IDENTITY_GROUPS } from './rules.mjs';

const json = (v) => `\`${JSON.stringify(v)}\``;
const cell = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

function sourceBlock(s) {
  return [
    `| Champ source | Valeur |`, `|---|---|`,
    `| mot, lecture | ${cell(s.word)} · ${cell(s.reading)} · ${cell(s.romaji)} |`,
    `| type, group | ${cell(s.type)} · ${cell(s.group)} |`,
    `| catégorie (ancienne, indicative) | ${cell(s.category)} › ${cell(s.subcategory)} |`,
    `| sens | ${cell(s.meanings?.primary)} ; ${cell((s.meanings?.secondary ?? []).join(' ; '))} |`,
    `| nuance | ${cell(s.nuance)} |`,
    `| particules | ${cell((s.particles ?? []).join(' '))} |`,
    `| furigana | ${cell(s.word_furigana)} |`,
    `| exemple | ${cell(s.example?.japanese)} — ${cell(s.example?.french)} |`
  ].join('\n');
}

const path = (c) => (c === null ? '**null**' : [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › '));

function sensesBlock(senses) {
  const out = ['| # | Sens | Catégorie | Type | Dimensions, fonctions, particules | Nuance |', '|---|---|---|---|---|---|'];
  senses.forEach((s, k) => {
    const extra = [
      ...(s.dimensions ?? []).map((d) => `${d.axis} : ${d.pole}`),
      ...Object.entries(s.linguistic_functions ?? {}).flatMap(([f, l]) => l.map((x) => `${f} : ${x}`)),
      ...((s.particles ?? []).length ? [`particules ${s.particles.join(' ')}`] : []),
      ...((s.tags ?? []).length ? [`tags ${s.tags.join(', ')}`] : [])
    ];
    const alts = s.meaning?.alternatives?.length ? ` (${s.meaning.alternatives.join(', ')})` : '';
    out.push(`| ${k + 1} | **${cell(s.meaning?.primary)}**${cell(alts)} | ${cell(path(s.category))} | ${cell(s.semantic_type ?? '**null**')} | ${cell(extra.join(' ; '))} | ${cell(s.nuance)} |`);
  });
  return out.join('\n');
}

function entryBlock(out, oldId, d, { byId, prefills, journalById }) {
  const s = byId.get(oldId);
  const pre = prefills.get(oldId);
  out.push(`### ${oldId} → ${pre?.id ?? '?'} · ${cell(s?.word)}`, '');
  out.push(`**Statut** : ${d.status === 'validated' ? 'décision validée' : 'PROPOSITION, non validée'}`, '');
  for (const id of d.journal ?? []) {
    const j = journalById.get(id);
    out.push(j ? `- **${id}** (${j.kind}, ${j.field}) : ${cell(j.reason)}${j.before !== null || j.after !== null ? ` — avant ${json(j.before)} → après ${json(j.after)}` : ''}`
      : `- **${id}** : absente du journal`);
  }
  if (d.journal?.length) out.push('');
  if (s) out.push(sourceBlock(s), '');
  if (pre) {
    out.push('**Mécanique**', '');
    for (const [k, v] of Object.entries(pre.values)) out.push(`- ${k} : ${json(v)}`);
    for (const [k, r] of Object.entries(pre.exceptions)) out.push(`- ${k} : **exception**, ${r}`);
    if (pre.tagCandidates.length) out.push(`- tags de lieu candidats (à confirmer) : ${pre.tagCandidates.join(', ')}`);
    out.push('');
  }
  if (d.retire) out.push(`**Retrait** : ${d.retire.merged_into === null ? 'suppression sans successeur' : `fusion dans ${d.retire.merged_into}`}`, '');
  if (d.fields) {
    out.push(`**${d.status === 'validated' ? 'Décision' : 'Proposition'}**`, '');
    for (const k of ['word', 'readings', 'grammatical_class', 'group', ...HUMAN_FIELDS.filter((f) => f !== 'senses')]) {
      if (Object.hasOwn(d.fields, k)) out.push(`- ${k} : ${json(d.fields[k])}`);
    }
    out.push('');
    if (Array.isArray(d.fields.senses)) out.push(sensesBlock(d.fields.senses), '');
  }
}

/**
 * @param {object} lot contenu d'un fichier de lot
 * @param {{ vocab, hj, lieux, exemples, placeTags }} sources
 * @param {object[]} [journal] contenu de journal.json
 */
export function renderLotReport(lot, sources, journal = []) {
  const prefills = prefillAll(sources);
  const byId = new Map([...sources.vocab, ...sources.hj].map((s) => [s.id, s]));
  const journalById = new Map(journal.map((j) => [j.id, j]));
  const ctx = { byId, prefills, journalById };
  const out = [`# Lot ${lot.lot} · ${lot.title}`, '',
    'Rapport généré à partir du fichier de lot et du journal : il ne se modifie pas, le JSON est la seule source des décisions.', ''];
  const done = new Set();
  const groups = IDENTITY_GROUPS.filter((g) => g.some((id) => Object.hasOwn(lot.entries, id)));
  if (groups.length) out.push('## Doublons candidats', '');
  for (const g of groups) {
    const words = g.map((id) => byId.get(id)?.word ?? id).join(' / ');
    const fates = g.map((id) => {
      const d = lot.entries[id];
      if (!d) return `${id} : hors de ce lot`;
      return d.retire ? `${id} : ${d.retire.merged_into === null ? 'retirée' : `fusionnée dans ${d.retire.merged_into}`}` : `${id} : gardée`;
    });
    out.push(`## Groupe candidat · ${words}`, '', `**Proposition du groupe** : ${fates.join(' ; ')}`, '');
    for (const id of g) if (lot.entries[id]) { entryBlock(out, id, lot.entries[id], ctx); done.add(id); }
  }
  const rest = Object.keys(lot.entries).filter((id) => !done.has(id));
  if (rest.length) out.push('## Autres entrées', '');
  for (const id of rest) {
    entryBlock(out, id, lot.entries[id], ctx);
    const extra = sources.exemples?.vocab?.[id];
    if (Array.isArray(extra) && extra.length) {
      out.push('**Contexte (anciens exemples, lecture seule)**', '');
      for (const e of extra.slice(0, 3)) out.push(`- ${cell(e.japanese)} — ${cell(e.french)}`);
      out.push('');
    }
  }
  // Contexte des groupes : exemples après le groupe, pour ne pas allonger chaque fiche.
  for (const g of groups) {
    const lines = g.flatMap((id) => (sources.exemples?.vocab?.[id] ?? []).slice(0, 2).map((e) => `- ${id} : ${cell(e.japanese)} — ${cell(e.french)}`));
    if (lines.length) {
      if (!out.includes('## Contexte des groupes (anciens exemples, lecture seule)')) out.push('## Contexte des groupes (anciens exemples, lecture seule)', '');
      out.push(`**${g.map((id) => byId.get(id)?.word ?? id).join(' / ')}**`, '', ...lines, '');
    }
  }
  return out.join('\n');
}
