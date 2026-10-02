// Ocha v2 — Reconstruction (A2-04) : rapport de relecture d'un lot
//
// Génère, à partir des SEULES données JSON (sources, pré-remplissage, lot), un document Markdown
// pour la relecture humaine. Ce rapport n'est jamais relu par un outil : le JSON du lot reste la
// seule source des décisions.

import { prefillAll } from './mechanical.mjs';
import { HUMAN_FIELDS } from './rules.mjs';

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
    `| exemple | ${cell(s.example?.japanese)} — ${cell(s.example?.french)} |`
  ].join('\n');
}

/**
 * @param {object} lot contenu d'un fichier de lot
 * @param {{ vocab, hj, lieux, exemples }} sources
 */
export function renderLotReport(lot, sources) {
  const prefills = prefillAll(sources);
  const byId = new Map([...sources.vocab, ...sources.hj].map((s) => [s.id, s]));
  const out = [`# Lot ${lot.lot} · ${lot.title}`, '',
    'Rapport généré à partir du fichier de lot : il ne se modifie pas, le JSON est la seule source des décisions.', ''];
  for (const [oldId, d] of Object.entries(lot.entries)) {
    const s = byId.get(oldId);
    const pre = prefills.get(oldId);
    out.push(`## ${oldId} → ${pre?.id ?? '?'} · ${cell(s?.word)}`, '');
    out.push(`**Statut** : ${d.status === 'validated' ? 'décision validée' : 'PROPOSITION, non validée'}`
      + (d.journal?.length ? ` · journal : ${d.journal.join(', ')}` : ''), '');
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
      for (const k of [...HUMAN_FIELDS, 'word', 'readings', 'grammatical_class', 'group']) {
        if (Object.hasOwn(d.fields, k)) out.push(`- ${k} : ${json(d.fields[k])}`);
      }
      out.push('');
    }
    const extra = sources.exemples?.vocab?.[oldId];
    if (Array.isArray(extra) && extra.length) {
      out.push('**Contexte (anciens exemples, lecture seule)**', '');
      for (const e of extra.slice(0, 3)) out.push(`- ${cell(e.japanese)} — ${cell(e.french)}`);
      out.push('');
    }
  }
  return out.join('\n');
}
