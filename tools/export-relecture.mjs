// Ocha v2 — Export de relecture
//
// Produit, pour un relecteur qui n'a pas accès au dépôt, dix fichiers datés dans un dossier de
// sortie (par défaut chatgpt-relecture/, à la racine) : gouvernance, conception, références A2,
// addenda, relais, rapports du lot, fiches sources, lot, journal du lot, diff et contrôles.
//
//   node tools/export-relecture.mjs [--lot lot-17] [--ref <commit>] [--note <fichier>]
//                                   [--ids id,id,…] [--precedents id,id,…]
//                                   [--avant-lot <fichier> --avant-journal <fichier>]
//                                   [--out <dossier>] [--sans-controles]
//
//   --lot         lot à relire (défaut : le dernier fichier de lot)
//   --ref         commit de référence du diff (défaut : HEAD)
//   --note        note de relais écrite à la main, reprise telle quelle dans 05-relais.md
//                 (défaut : docs/relecture/note-relais.md)
//   --ids         identifiants sources d'un lot qui n'a pas encore de fichier (périmètre) ; à
//                 défaut, ils sont lus dans le §2 du rapport de périmètre
//   --precedents  entrées validées à joindre, en plus de celles que le journal du lot cite
//   --avant-lot, --avant-journal  copies d'avant une validation, pour la comparer à l'état actuel
//
// L'outil ne modifie aucun fichier du dépôt : il n'écrit que dans le dossier de sortie, où il
// remplace les exports précédents (une seule version courante). Il ne committe rien. Les
// documents sont recopiés en entier, depuis l'arbre de travail, modifications non committées
// comprises.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { join, resolve, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { readSources } from './reconstruction/sources.mjs';
import { prefillAll } from './reconstruction/mechanical.mjs';
import { assemble, validateAssembly } from './reconstruction/assemble.mjs';
import { renderLotReport } from './reconstruction/report.mjs';
import { readLexiconDependencies } from './lexicon-adapter.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const DEFAULT_OUT = 'chatgpt-relecture';
export const DEFAULT_NOTE = 'docs/relecture/note-relais.md';
export const EXPORT_FILES = Object.freeze([
  '01-gouvernance.md', '02-conception.md', '03-references-A2.md', '04-addenda.md', '05-relais.md',
  '06-lot-courant-rapports.md', '07-lot-courant-sources.md', '08-lot-courant.json', '09-journal-lot-courant.json', '10-diff-et-controles.md'
]);

// Documents regroupés. Les neuf parties de conception (moteur, exercices, sessions, architecture)
// ne servent pas à relire un lot de vocabulaire : elles ne sont pas exportées.
const GOUVERNANCE = ['CLAUDE.md', 'REGLES-CONSTRUCTION.md', 'ROADMAP.md', 'ETAT-ACTUEL.md'];
const CONCEPTION = ['docs/conception/00-sommaire.md', 'docs/conception/README.md', 'docs/conception/schema-A2-01.md', 'docs/conception/registre-des-tags.md',
  'docs/conception/GUIDE-CONTENU.md', 'docs/conception/strategie-reconstruction.md', 'reconstruction/a2-04/README.md',
  'tools/reconstruction/rules.mjs', 'tools/reconstruction/decisions.mjs'];
const REFERENCES = ['docs/conception/a2/README.md', 'docs/conception/a2/A2-L3-v1.md', 'docs/conception/a2/A2-ST-v1.md', 'docs/conception/a2/A2-DIM-v1.md',
  'docs/conception/a2/A2-REL-v1.1.md', 'docs/conception/a2/A2-LING-v1.md',
  'data/registries/grammatical-classes.json', 'data/registries/counters.json', 'data/registries/tags.json'];

// Ce qu'un export ne doit jamais contenir : une adresse, un chemin personnel de la machine.
const SENSITIVE = [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, /[A-Za-z]:[\\/]Users[\\/]/, /\/home\/[a-z0-9_-]+\//];
const JAPANESE = /[぀-ヿ㐀-鿿々]/;

const fence = (content, lang = '') => {
  const longest = Math.max(2, ...[...content.matchAll(/`+/g)].map((m) => m[0].length));
  const f = '`'.repeat(longest + 1);
  return `${f}${lang}\n${content.replace(/\n$/, '')}\n${f}`;
};
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/ +/g, ' ').trim();
const count = (list, key) => { const c = {}; for (const x of list) c[x[key]] = (c[x[key]] ?? 0) + 1; return c; };
const inline = (o) => Object.entries(o).map(([k, v]) => `${v} « ${k} »`).join(', ') || 'aucun';

/** Identifiants sources d'un rapport de périmètre : ceux de sa section 2, dans l'ordre. */
export function idsOfPerimeter(markdown) {
  const section = /^## 2\.[^\n]*\n([\s\S]*?)(?=^## \d+\.)/m.exec(markdown)?.[1] ?? '';
  return [...new Set([...section.matchAll(/`((?:n5|hj)_v_[0-9]+)`/g)].map((m) => m[1]))];
}

/**
 * Précédents validés que le texte cite : une entrée d'un autre lot dont le mot apparaît isolé
 * (ni précédé ni suivi d'un caractère japonais), ce qui écarte un mot pris dans un exemple.
 * @returns {{ id: string, lot: string, citedBy: string[] }[]}
 */
export function citedPrecedents(texts, lots, sourcesById, ownIds, lotName) {
  const out = [];
  for (const l of lots) {
    if (l.lot === lotName) continue;
    for (const [id, d] of Object.entries(l.entries)) {
      if (ownIds.includes(id) || !d.fields || d.status !== 'validated') continue;
      const forms = String(sourcesById.get(id)?.word ?? '').split('/').map((w) => w.trim()).filter(Boolean);
      const citedBy = texts.filter(({ text }) => forms.some((f) => {
        for (let i = text.indexOf(f); i !== -1; i = text.indexOf(f, i + 1)) {
          if (!JAPANESE.test(text[i - 1] ?? '') && !JAPANESE.test(text[i + f.length] ?? '')) return true;
        }
        return false;
      })).map((t) => t.label);
      if (citedBy.length) out.push({ id, lot: l.lot, citedBy });
    }
  }
  return out;
}

/**
 * Entrées d'AUTRES lots que les décisions du lot touchent : une ENTRY validée rouverte, une fusion.
 * Elles ne sont pas dans le fichier du lot ; le relecteur doit pourtant les voir.
 * @returns {{ id: string, lot: string, decisions: string[] }[]}
 */
export function touchedElsewhere(own, lots, lotIds, lotName) {
  const out = [];
  for (const id of new Set(own.map((d) => d.entry))) {
    if (lotIds.includes(id)) continue;
    const l = lots.find((x) => x.lot !== lotName && x.entries[id]);
    if (l) out.push({ id, lot: l.lot, decisions: own.filter((d) => d.entry === id).map((d) => d.id) });
  }
  return out;
}

/**
 * Construit l'export en mémoire.
 * @param {object} options racine du dépôt, lot, commit de référence, note, identifiants, précédents
 *   ajoutés, copies d'avant validation, exécution des contrôles, date de l'export
 * @returns {{ files: Record<string, string>, summary: object }}
 */
export function buildExport({ root = ROOT, lot: lotName, ref = 'HEAD', note = DEFAULT_NOTE, ids, precedents = [], before, controls = true, now = new Date(), outName = DEFAULT_OUT } = {}) {
  const read = (p) => readFileSync(join(root, p), 'utf8');
  const has = (p) => existsSync(join(root, p));
  const run = (cmd, args) => {
    const r = spawnSync(cmd, args, { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
    return { out: (r.stdout ?? '').replace(/\r\n/g, '\n'), code: r.status };
  };
  const git = (...args) => run('git', ['-c', 'core.quotepath=false', ...args]);
  const node = (...args) => run(process.execPath, args);

  const work = join(root, 'reconstruction', 'a2-04');
  const lotFiles = readdirSync(join(work, 'lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort();
  const lots = lotFiles.map((f) => JSON.parse(readFileSync(join(work, 'lots', f), 'utf8')));
  lotName ??= lots.at(-1).lot;
  if (!/^lot-\d+$/.test(lotName)) throw new Error(`lot « ${lotName} » : forme lot-NN attendue`);
  const nn = lotName.slice(4);
  const lotPath = `reconstruction/a2-04/lots/${lotName}.json`;
  const lotRaw = has(lotPath) ? read(lotPath) : null;
  const lot = lotRaw ? JSON.parse(lotRaw) : null;
  const journal = JSON.parse(read('reconstruction/a2-04/journal.json'));
  const own = journal.filter((d) => d.lot === lotName);
  const sources = readSources(join(work, 'sources'));
  const sourcesById = new Map([...sources.vocab, ...sources.hj].map((e) => [e.id, e]));
  const prefills = prefillAll(sources);

  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const head = git('log', '--oneline', '-1').out.trim();
  const refLine = git('log', '--oneline', '-1', ref).out.trim() || ref;
  const branch = git('branch', '--show-current').out.trim();
  const header = (title, what) => `# ${title}\n\n> **Export de relais pour relecture.** Date de l'export : ${stamp} (horloge de la machine). Branche \`${branch}\`. Dernier commit : \`${head}\`. Commit de référence du diff : \`${refLine}\`.\n> Les documents sont recopiés depuis l'arbre de travail, **modifications non committées comprises**. Les originaux restent à leur emplacement dans le dépôt ; ce dossier n'en est qu'une copie de lecture.\n> ${what}\n`;
  const bar = '═'.repeat(100);
  const doc = (path, i, n) => `\n\n${bar}\n## DOCUMENT ${i}/${n} — chemin d'origine : \`${path}\`\n${bar}\n\n${path.endsWith('.md') ? read(path).replace(/\s+$/, '') : fence(read(path), path.endsWith('.json') ? 'json' : 'js')}\n\n${bar}\n## FIN DU DOCUMENT ${i}/${n} — \`${path}\`\n${bar}\n`;
  const bundle = (title, what, paths, extra = '') => {
    const missing = paths.filter((p) => !has(p));
    if (missing.length) throw new Error(`documents introuvables : ${missing.join(', ')}`);
    return `${header(title, what)}\n**Documents contenus, en entier, dans cet ordre :**\n\n${paths.map((p, i) => `${i + 1}. \`${p}\``).join('\n') || '_aucun_'}\n${extra}${paths.map((p, i) => doc(p, i + 1, paths.length)).join('')}`;
  };
  const files = {};
  const title = lot?.title ?? null;
  const lotLabel = `Lot ${Number(nn)}${title ? ` « ${title} »` : ''}`;

  // ── 01 à 04 : regroupements documentaires ─────────────────────────────────
  files['01-gouvernance.md'] = bundle('Ocha v2 — Gouvernance', 'Contenu intégral, sans résumé.', GOUVERNANCE);
  const parts = readdirSync(join(root, 'docs', 'conception')).filter((f) => /^partie-/.test(f)).sort().map((f) => `\`docs/conception/${f}\``).join(', ');
  files['02-conception.md'] = bundle('Ocha v2 — Conception applicable à la relecture lexicale', 'Contenu intégral, sans résumé.', CONCEPTION,
    `\n**Non inclus, volontairement** : ${parts}. Ces parties décrivent le moteur d'apprentissage, les exercices, les sessions et l'architecture ; elles ne servent pas à relire un lot de vocabulaire. Le sommaire (document 1) dit ce que chacune contient ; demander celle dont on aurait besoin.\n\n**Deux fichiers de code sont inclus** parce qu'ils sont la référence de la frontière entre ce qui est mécanique et ce qui se décide dans un lot : \`rules.mjs\` (listes fermées, table des classes) et \`decisions.mjs\` (format des lots et du journal, contrôles).\n`);
  files['03-references-A2.md'] = bundle('Ocha v2 — Références normatives A2', 'Contenu intégral, sans résumé.', REFERENCES,
    '\n**Snapshots normatifs** : catégories (A2-L3), types sémantiques (A2-ST), dimensions (A2-DIM), relations (A2-REL), fonctions linguistiques (A2-LING).\n\n**Registres JSON** : seuls les trois registres sans snapshot Markdown sont recopiés (classes grammaticales, compteurs, tags). Les cinq autres registres de `data/registries/` sont la forme lue par les outils des snapshots ci-dessous ; ils ne sont pas recopiés ici.\n');
  const addenda = readdirSync(join(root, 'docs', 'conception')).filter((f) => /^addendum-A\d/.test(f)).sort().map((f) => `docs/conception/${f}`);
  files['04-addenda.md'] = bundle('Ocha v2 — Addenda normatifs', 'Contenu intégral, sans résumé.', addenda,
    '\n**Pour la relecture lexicale**, les plus sollicités sont A3 (modèle lexical), A5 (`category: null`), A6 (`semantic_type: null`), A7 (`deictique`) et A8 (furigana).\n');

  // ── 06 : rapports du lot, dans l'ordre périmètre, proposition, validation, généré ──
  const order = ['perimetre', 'proposition', 'valide'];
  const rank = (f) => { const k = order.findIndex((o) => f.includes(`-${o}`)); return k === -1 ? order.length : k; };
  const prefix = `etape2-A2-04-lot${nn}-`;
  const reports = readdirSync(join(root, 'docs', 'rapports')).filter((f) => f.startsWith(prefix) && f.endsWith('.md'))
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b)).map((f) => `docs/rapports/${f}`);
  const generated = `reconstruction/a2-04/rapports/${lotName}.md`;
  if (has(generated)) reports.push(generated);
  files['06-lot-courant-rapports.md'] = bundle(`Ocha v2 — ${lotLabel} : rapports`, 'Contenu intégral, dans leur état actuel.', reports,
    has(generated) ? `\n**Le dernier document est le rapport généré**, entrée par entrée, à partir de \`${lotName}.json\` et du journal. Il ne se modifie pas à la main ; le JSON est la seule source des décisions.\n` : '\n**Aucun rapport généré** : le lot n\'a pas encore de fichier.\n');

  // ── Identifiants du lot : le fichier de lot, sinon --ids, sinon le rapport de périmètre ──
  const perimeter = reports.find((p) => p.includes('-perimetre'));
  const lotIds = lot ? Object.keys(lot.entries) : (ids?.length ? ids : (perimeter ? idsOfPerimeter(read(perimeter)) : []));
  const unknown = lotIds.filter((id) => !sourcesById.has(id));
  if (unknown.length) throw new Error(`identifiants absents des sources : ${unknown.join(', ')}`);

  // ── 08, 09 : le lot (copie exacte) et son journal ─────────────────────────
  files['08-lot-courant.json'] = lotRaw ?? JSON.stringify({ lot: lotName, etat: 'aucun fichier de lot : le périmètre n\'est pas arbitré, ou la proposition n\'est pas écrite', identifiants_candidats: lotIds }, null, 2);
  files['09-journal-lot-courant.json'] = JSON.stringify(own, null, 2);

  // ── 07 : fiches sources complètes, et précédents validés cités ────────────
  const texts = lot ? own.map((d) => ({ label: d.id, text: d.reason })) : (perimeter ? [{ label: perimeter, text: read(perimeter) }] : []);
  const found = citedPrecedents(texts, lots, sourcesById, lotIds, lotName);
  for (const id of precedents) {
    if (found.some((p) => p.id === id)) continue;
    const l = lots.find((x) => x.lot !== lotName && x.entries[id]);
    if (!l) throw new Error(`précédent « ${id} » : aucune entrée de ce nom dans un autre lot`);
    found.push({ id, lot: l.lot, citedBy: ['ajouté à la main (--precedents)'] });
  }
  let s7 = header(`Ocha v2 — ${lotLabel} : fiches sources et précédents`, 'Les fiches sont recopiées en entier depuis les sources figées (`reconstruction/a2-04/sources/`, jamais modifiées). **La fiche entière décide, exemple compris.**');
  s7 += `\n## Mode d'emploi\n\nPour chaque entrée : la fiche source complète en JSON (tous ses champs), son exemple sans balises, le pré-remplissage mécanique (ce qui n'est **pas** décidable dans un lot, et les exceptions qui le deviennent), puis les anciens exemples de contexte (\`sources/exemples.json\`, lecture seule, non migrés).\n\n${lot ? 'Les décisions prises sur ces fiches sont dans `08-lot-courant.json` (les champs de chaque entrée) et `09-journal-lot-courant.json` (les raisons).' : '**Aucune décision n\'est prise sur ces fiches** : le lot n\'a pas encore de fichier. Ce sont les entrées candidates du périmètre.'}\n\n- Entrées : ${lotIds.length}\n- Identifiants : ${lotIds.join(', ') || 'aucun'}\n\n# Partie 1 — Les ${lotIds.length} fiches sources\n`;
  for (const id of lotIds) {
    const e = sourcesById.get(id); const p = prefills.get(id);
    const extra = sources.exemples?.vocab?.[id] ?? [];
    s7 += `\n\n## ${id} → ${p.id} · ${e.word}（${e.reading}）\n\n**Fiche source complète** :\n\n${fence(JSON.stringify(e, null, 2), 'json')}\n\n**Exemple, sans balises** : ${strip(e.example?.japanese)} — ${e.example?.french}\n\n**Pré-remplissage mécanique** (non décidable dans un lot) :\n\n${fence(JSON.stringify({ values: p.values, exceptions: p.exceptions, tagCandidates: p.tagCandidates, sourceParticles: p.sourceParticles }, null, 2), 'json')}\n\n${extra.length ? `**Contexte, anciens exemples** (${extra.length}) :\n\n${fence(JSON.stringify(extra, null, 2), 'json')}` : '**Contexte, anciens exemples** : aucun.'}\n`;
  }
  s7 += `\n\n# Partie 2 — Précédents validés cités (${found.length})\n\nRelevés automatiquement : toute entrée validée d'un autre lot dont le mot apparaît, isolé, dans ${lot ? 'une raison du journal du lot' : 'le rapport de périmètre'}. Pour chacun : qui le cite, la fiche source, la décision validée et ses décisions de journal, intégrales. Un précédent peut manquer s'il est cité autrement que par son mot ; la liste se complète avec \`--precedents\`.\n`;
  for (const p of found) {
    const e = sourcesById.get(p.id); const d = lots.find((l) => l.lot === p.lot).entries[p.id];
    s7 += `\n\n## ${p.id} · ${e.word} — ${p.lot}, \`${d.status}\`\n\n**Cité par** : ${p.citedBy.join(', ')}\n\n**Fiche source** :\n\n${fence(JSON.stringify(e, null, 2), 'json')}\n\n**État actuel de l'entrée** (dans \`lots/${p.lot}.json\`, statut \`${d.status}\`) :\n\n${fence(JSON.stringify(d, null, 2), 'json')}\n\n**Décisions de journal de cette entrée** :\n\n${fence(JSON.stringify(journal.filter((j) => j.entry === p.id), null, 2), 'json')}\n`;
  }
  const touched = touchedElsewhere(own, lots, lotIds, lotName);
  s7 += `\n\n# Partie 3 — Entrées d'autres lots touchées par ce lot (${touched.length})\n\n${touched.length ? 'Une décision de ce lot porte sur une entrée d\'un **autre** lot : une ENTRY validée rouverte, une fusion. Ces entrées ne sont pas dans `08-lot-courant.json`. Pour chacune : la fiche source, son état actuel dans son lot, et **toutes** ses décisions de journal, les anciennes comme les nouvelles. L\'état d\'avant une réouverture est dans le champ `before` de la décision qui la porte.' : '_Aucune : les décisions de ce lot ne portent que sur ses propres entrées._'}\n`;
  for (const t of touched) {
    const e = sourcesById.get(t.id); const d = lots.find((l) => l.lot === t.lot).entries[t.id];
    s7 += `\n\n## ${t.id} · ${e.word} — ${t.lot}, \`${d.status}\`\n\n**Décisions de ce lot qui la touchent** : ${t.decisions.join(', ')}\n\n**Fiche source** :\n\n${fence(JSON.stringify(e, null, 2), 'json')}\n\n**État actuel de l'entrée** (dans \`lots/${t.lot}.json\`, statut \`${d.status}\`) :\n\n${fence(JSON.stringify(d, null, 2), 'json')}\n\n**Toutes les décisions de journal de cette entrée** :\n\n${fence(JSON.stringify(journal.filter((j) => j.entry === t.id), null, 2), 'json')}\n`;
  }
  files['07-lot-courant-sources.md'] = s7;

  // ── État relu en mémoire, et contrôles ────────────────────────────────────
  const a = assemble({ sources, lots, journal });
  const r = validateAssembly(a, readLexiconDependencies(join(root, 'data')));
  const entries = a.files.reduce((n, f) => n + f.entries.length, 0);
  const reasons = count(a.excluded, 'reason');
  const warnings = count(r.warnings, 'code');
  const continuous = journal.every((d, i) => d.id === `A2-04-D${String(i + 1).padStart(4, '0')}`);
  const last = `D${String(journal.length).padStart(4, '0')}`;
  const pendingEntries = lots.flatMap((l) => Object.values(l.entries)).filter((e) => e.status !== 'validated').length;
  const status = git('status', '--short').out.replace(/\n$/, '');
  const ahead = git('status', '-sb').out.split('\n')[0].replace(/^## /, '');
  const ctl = controls ? {
    verify: node('tools/reconstruction/run.mjs', 'verify'),
    assemble: node('tools/reconstruction/run.mjs', 'assemble'),
    tests: node('--test', 'tests/**/*.test.js'),
    layers: node('tools/check-layers.mjs'),
    validate: node('tools/validate-data.mjs'),
    diffcheck: git('diff', '--check')
  } : null;
  const testLine = (k) => (ctl?.tests.out.match(new RegExp(`^ℹ ${k} (\\d+)`, 'm')) ?? [])[1] ?? '?';
  const tests = ctl ? `${testLine('tests')} tests, ${testLine('pass')} réussis, ${testLine('fail')} en échec, ${testLine('skipped')} sautés` : 'non exécutés pour cet export';
  const reportFresh = lot && has(generated) ? renderLotReport(lot, sources, journal) === read(generated) : null;
  // Une décision du lot peut être citée par une entrée d'un autre lot qu'il rouvre : elle compte comme citée.
  const citedInLot = new Set(lot ? Object.values(lot.entries).flatMap((e) => e.journal ?? []) : []);
  const citedAnywhere = new Set(lots.flatMap((l) => Object.values(l.entries).flatMap((e) => e.journal ?? [])));
  const outside = own.filter((d) => !citedInLot.has(d.id) && citedAnywhere.has(d.id)).map((d) => d.id.replace("A2-04-", ""));
  const uncited = own.filter((d) => !citedAnywhere.has(d.id)).map((d) => d.id.replace("A2-04-", ""));
  const foreign = [...citedInLot].filter((id) => !own.some((d) => d.id === id) && !lots.some((l) => l.lot !== lotName && Object.values(l.entries).some((e) => (e.journal ?? []).includes(id))));
  const cites = !lot ? null : `toutes les décisions du lot sont citées : ${uncited.length === 0}${uncited.length ? ` (non citées : ${uncited.join(", ")})` : ""} ; ${outside.length ? `citées seulement par une entrée d'un autre lot que ce lot rouvre : ${outside.join(", ")}` : "toutes par une entrée du lot"} ; le lot ne cite aucune décision inconnue : ${foreign.length === 0}`;

  // Comparaison avant / après une validation, sur des copies gardées hors dépôt.
  let flip = null;
  if (before?.lot && before?.journal && lotRaw) {
    const noStatus = (o) => JSON.stringify(JSON.parse(JSON.stringify(o, (k, v) => (k === 'status' ? undefined : v))));
    const lines = (x, y) => {
      const p = x.split('\n'); const q = y.split('\n');
      if (p.length !== q.length) return { n: null, onlyStatus: false };
      const ch = p.map((l, i) => [l, q[i]]).filter(([u, v]) => u !== v);
      return { n: ch.length, onlyStatus: ch.every(([u, v]) => /^\s*"status": "proposed",$/.test(u) && v === u.replace('proposed', 'validated')) };
    };
    const l0 = readFileSync(before.lot, 'utf8'); const j0 = readFileSync(before.journal, 'utf8');
    flip = { lot: { ...lines(l0, lotRaw), same: noStatus(JSON.parse(l0)) === noStatus(lot) }, journal: { ...lines(j0, read('reconstruction/a2-04/journal.json')), same: noStatus(JSON.parse(j0)) === noStatus(journal) } };
  }

  // ── 10 : diff depuis le commit de référence, et contrôles ─────────────────
  const exclude = `:(exclude)${outName}`;
  const tracked = git('diff', ref, '--', '.', exclude).out;
  const stat = git('diff', '--stat', ref, '--', '.', exclude).out;
  const untracked = git('ls-files', '--others', '--exclude-standard').out.split('\n').filter((f) => f && !f.startsWith(`${outName}/`));
  let s10 = header(`Ocha v2 — ${lotLabel} : diff et contrôles`, `Diff de l'arbre de travail par rapport au commit de référence. ${status ? '**Ce qui n\'est pas committé est signalé au §1.**' : 'L\'arbre de travail est propre : tout ce diff est committé.'}`);
  s10 += `\n## 1. Ce que contient ce diff\n\n**Fichiers suivis modifiés** (\`git diff --stat ${ref}\`) :\n\n${fence(stat || '(aucune différence)')}\n\n**Fichiers nouveaux, non suivis** (${untracked.length}) :\n\n${untracked.map((f) => `- \`${f}\``).join('\n') || '_aucun_'}\n\n**État git** (\`git status --short\`) ; le dossier \`${outName}/\`, cet export, y figure et n'est pas dans le diff :\n\n${fence(status || '(arbre de travail propre)')}\n`;
  s10 += `\n## 2. Contrôles ${ctl ? `exécutés pour cet export, le ${stamp}` : 'NON exécutés pour cet export'}\n\n${ctl ? 'Ces commandes ont été lancées par Claude Code sur le dépôt local, au moment de l\'export. **Le relecteur n\'a pas accès au dépôt : il ne peut pas les reproduire, seulement relire leurs résultats.**' : '**L\'export a été produit sans relancer les commandes** (`--sans-controles`). Seul l\'état relu en mémoire, ci-dessous, date de l\'export.'}\n\n| Contrôle | Résultat |\n|---|---|\n`;
  if (ctl) s10 += `| \`node tools/reconstruction/run.mjs verify\` | ${ctl.verify.out.trim()} (code ${ctl.verify.code}) |\n| \`node tools/reconstruction/run.mjs assemble\` | ${ctl.assemble.out.split('\n')[0]} (code ${ctl.assemble.code}) |\n| \`node --test "tests/**/*.test.js"\` (le script \`npm test\`) | ${tests} (code ${ctl.tests.code}) |\n| \`node tools/check-layers.mjs\` | ${ctl.layers.out.trim().split('\n').at(-1)} |\n| \`node tools/validate-data.mjs\` | ${ctl.validate.out.trim().split('\n').at(-1)} |\n| \`git diff --check\` | ${ctl.diffcheck.out.trim() || 'aucune sortie (propre)'} |\n`;
  s10 += `| assemblage relu en mémoire | ${entries} ENTRY, ${a.retired.length} retraits, ${a.excluded.length} écartées (${inline(reasons)}) ; ${a.problems.length} problème, ${r.errors.length} erreur lexicale, ${a.pending.length + r.pending.length} attente ; ${r.warnings.length} avertissements (${inline(warnings)}) |\n| journal | ${journal.length} décisions, identifiants continus de D0001 à ${last} : ${continuous} ; statuts : ${inline(count(journal, 'status'))} |\n| journal du lot | ${own.length} décisions${own.length ? `, ${own[0].id} à ${own.at(-1).id} ; statuts : ${inline(count(own, 'status'))}` : ''} |\n| lot | ${lot ? `${lotIds.length} entrées ; statuts : ${inline(count(Object.values(lot.entries), 'status'))} ; ${Object.values(lot.entries).reduce((n, e) => n + (e.fields?.senses.length ?? 0), 0)} sens ; ${cites}` : `aucun fichier de lot ; ${lotIds.length} entrées candidates`} |\n| rapport généré | ${reportFresh === null ? 'sans objet' : `identique à une régénération en mémoire depuis les JSON actuels : ${reportFresh}`} |\n`;
  if (ctl) s10 += `\n**Sortie de \`assemble\`** (l'outil n'imprime que les 50 premiers avertissements) :\n\n${fence(ctl.assemble.out)}\n\n**Résumé de la suite de tests** :\n\n${fence(ctl.tests.out.split('\n').filter((l) => /^ℹ /.test(l)).join('\n'))}\n`;
  s10 += '\n## 3. Comparaison avant / après validation\n\n';
  s10 += flip ? `Faite pour cet export sur des copies du lot et du journal prises avant la bascule, gardées hors dépôt. Deux comparaisons : ligne à ligne sur le texte, et sur le contenu une fois le champ \`status\` retiré.\n\n| Fichier | Lignes différentes | Toutes sont \`"status": "proposed"\` → \`"validated"\` | Contenu identique hors statut |\n|---|---|---|---|\n| \`${lotName}.json\` | ${flip.lot.n} | ${flip.lot.onlyStatus} | ${flip.lot.same} |\n| \`journal.json\` | ${flip.journal.n} | ${flip.journal.onlyStatus} | ${flip.journal.same} |\n\n**Limite** : ces copies ne sont ni versionnées ni fournies ici ; le relecteur ne peut pas refaire cette comparaison.\n` : 'Sans objet pour cet export : aucune copie d\'avant validation n\'a été fournie à l\'outil.\n';
  s10 += `\n## 4. Limites de ces contrôles\n\n- Les tests vérifient la **forme et la cohérence** (statuts, citations, registres, choix arbitrés figés). Ils ne disent pas qu'un choix lexical est juste.\n- Les résultats antérieurs à l'export (sabotages, essais à blanc, relectures) ne sont pas relancés par l'outil : ils sont rapportés dans les rapports du lot (\`06\`) et dans la note de relais (\`05\`).\n- Le validateur lexical n'est pas encore appliqué à \`data/\` : la bascule aura lieu à la publication d'A2-04.\n\n## 5. Diff des fichiers suivis\n\n\`git diff ${ref}\`, en entier :\n\n${fence(tracked || '(aucune différence)', 'diff')}\n\n## 6. Fichiers nouveaux, en entier\n`;
  untracked.forEach((f, i) => { s10 += `\n### ${i + 1}/${untracked.length} — \`${f}\`\n\n${fence(git('diff', '--no-index', '--', '/dev/null', f).out, 'diff')}\n`; });
  if (!untracked.length) s10 += '\n_Aucun fichier nouveau._\n';
  files['10-diff-et-controles.md'] = s10;

  // ── 05 : relais (la note écrite à la main, puis l'état relevé par l'outil) ──
  // La note se lit depuis la racine, ou par un chemin absolu ; un chemin absolu n'est pas recopié.
  const notePath = resolve(root, note);
  const noteName = isAbsolute(note) ? 'un fichier hors dépôt' : `\`${note}\``;
  const noteText = existsSync(notePath) ? readFileSync(notePath, 'utf8').replace(/\s+$/, '') : null;
  let s5 = header('Ocha v2 — Relais de relecture', 'Ce fichier dit où en est le projet, ce qui a été vérifié et par qui, et ce qui est attendu du relecteur.');
  s5 += `\n# Partie 1 — Note de relais\n\n${noteText ? `Écrite à la main par Claude Code, reprise telle quelle depuis ${noteName}.\n\n${noteText}` : `**Aucune note de relais** : le fichier ${noteName} n'existe pas. Les consignes, l'état du lot et la prochaine action ne sont donc pas décrits ici.`}\n\n# Partie 2 — État réel, relevé par l'outil le ${stamp}\n\n| Élément | Valeur |\n|---|---|\n| Branche | \`${branch}\` |\n| Dernier commit | \`${head}\` |\n| Commit de référence du diff | \`${refLine}\` |\n| Position par rapport au dépôt distant | ${ahead} |\n| Lot exporté | ${lotLabel} : ${lot ? `${lotIds.length} entrées (${inline(count(Object.values(lot.entries), 'status'))}), ${own.length} décisions de journal` : `aucun fichier de lot ; ${lotIds.length} entrées candidates`} |\n| Assemblage réel | ${entries} ENTRY, ${a.retired.length} retraits, ${a.excluded.length} entrées écartées (${inline(reasons)}) |\n| Problèmes, erreurs, attentes | ${a.problems.length}, ${r.errors.length}, ${a.pending.length + r.pending.length} |\n| Avertissements | ${r.warnings.length} (${inline(warnings)}) |\n| Journal | ${journal.length} décisions, D0001 à ${last}, sans trou : ${continuous} ; statuts : ${inline(count(journal, 'status'))} |\n| Lots | ${lots.length} fichiers (${lots[0].lot} à ${lots.at(-1).lot}) ; entrées non validées : ${pendingEntries} |\n| Tests | ${tests} |\n\n**État git** (\`git status --short\`)${status ? ' — ce qui suit n\'est **pas committé**' : ''} :\n\n${fence(status || '(arbre de travail propre)')}\n\nLe dossier \`${outName}/\` est cet export : il n'est pas suivi par git et ne se committe pas sans l'accord de l'utilisateur.\n\n**Contrôles** : ${ctl ? `relancés pour cet export, le ${stamp}` : 'non relancés pour cet export'} ; détail et sorties dans \`10-diff-et-controles.md\`.\n\n# Partie 3 — Les fichiers de ce dossier\n\n| Fichier | Contenu |\n|---|---|\n| \`01-gouvernance.md\` | \`CLAUDE.md\`, \`REGLES-CONSTRUCTION.md\`, \`ROADMAP.md\`, \`ETAT-ACTUEL.md\`, en entier |\n| \`02-conception.md\` | sommaire, schéma lexical A2-01, registre des tags, guide de contenu, stratégie de reconstruction, règles et format des lots |\n| \`03-references-A2.md\` | snapshots A2 (catégories, types, dimensions, relations, fonctions) ; registres des classes, compteurs et tags |\n| \`04-addenda.md\` | les addenda, en entier |\n| \`05-relais.md\` | ce fichier |\n| \`06-lot-courant-rapports.md\` | ${reports.length} document(s) : ${reports.map((p) => `\`${p.split('/').at(-1)}\``).join(', ') || 'aucun'} |\n| \`07-lot-courant-sources.md\` | ${lotIds.length} fiches sources complètes, ${found.length} précédents validés cités |\n| \`08-lot-courant.json\` | ${lot ? `copie exacte de \`${lotPath}\`` : 'aucun fichier de lot : la liste des identifiants candidats'} |\n| \`09-journal-lot-courant.json\` | ${own.length} décisions du lot, intégrales, sous leurs identifiants |\n| \`10-diff-et-controles.md\` | diff depuis \`${ref}\`, contrôles, comparaison avant / après, limites |\n`;
  files['05-relais.md'] = s5;

  for (const [name, content] of Object.entries(files)) {
    const hit = SENSITIVE.map((re) => re.exec(content)?.[0]).find(Boolean);
    if (hit) throw new Error(`${name} : donnée personnelle ou chemin de machine dans l'export (« ${hit} »)`);
  }
  return { files, summary: { lot: lotName, title, ref, stamp, ids: lotIds.length, decisions: own.length, reports, precedents: found.map((p) => p.id), touched: touched.map((t) => t.id), tests, controls: Boolean(ctl), note: Boolean(noteText) } };
}

/** Écrit l'export dans le dossier de sortie, en y remplaçant les exports précédents. */
export function writeExport(outDir, files) {
  mkdirSync(outDir, { recursive: true });
  for (const f of readdirSync(outDir)) if (/^\d\d-.+\.(md|json)$/.test(f) && !Object.hasOwn(files, f)) rmSync(join(outDir, f));
  for (const [name, content] of Object.entries(files)) writeFileSync(join(outDir, name), content);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const opt = (name) => { const i = args.indexOf(`--${name}`); return i === -1 ? undefined : args[i + 1]; };
  const list = (name) => opt(name)?.split(',').map((x) => x.trim()).filter(Boolean);
  const out = opt('out') ?? DEFAULT_OUT;
  const before = opt('avant-lot') && opt('avant-journal') ? { lot: opt('avant-lot'), journal: opt('avant-journal') } : undefined;
  const { files, summary } = buildExport({ lot: opt('lot'), ref: opt('ref') ?? 'HEAD', note: opt('note') ?? DEFAULT_NOTE, ids: list('ids'), precedents: list('precedents') ?? [], before, controls: !args.includes('--sans-controles'), outName: out.replace(/[\\/]+$/, '').split(/[\\/]/).at(-1) });
  writeExport(resolve(ROOT, out), files);
  console.log(`export de relecture : ${summary.lot}${summary.title ? ` « ${summary.title} »` : ''}, référence ${summary.ref}, ${summary.stamp}`);
  for (const [name, content] of Object.entries(files)) console.log(`  ${name.padEnd(30)} ${String(Buffer.byteLength(content)).padStart(8)} octets`);
  console.log(`  ${summary.ids} fiches, ${summary.decisions} décisions, ${summary.reports.length} rapports, ${summary.precedents.length} précédents ; tests : ${summary.tests} ; note de relais : ${summary.note ? 'reprise' : 'ABSENTE'}`);
  console.log(`écrit dans ${out}/ (dossier non suivi par git : ne pas committer sans accord)`);
}
