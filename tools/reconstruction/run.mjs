// Ocha v2 — Reconstruction (A2-04) : commandes
//
//   node tools/reconstruction/run.mjs verify                       empreintes des sources
//   node tools/reconstruction/run.mjs report <lot>                 rapport de relecture d'un lot
//   node tools/reconstruction/run.mjs assemble [--complete] [--write]
//
// Aucune commande n'écrit dans data/.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifySources, readSources } from './sources.mjs';
import { assemble, validateAssembly, remapReferences } from './assemble.mjs';
import { renderLotReport } from './report.mjs';
import { readLexiconDependencies, extractReferences, readActivities } from '../lexicon-adapter.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const WORK = join(ROOT, 'reconstruction', 'a2-04');
const DATA = join(ROOT, 'data');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const readLots = () => readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).sort().map((f) => readJson(join(WORK, 'lots', f)));
const print = (title, list) => { if (list.length) { console.log(`\n${title} (${list.length})`); for (const p of list.slice(0, 50)) console.log(`  [${p.code ?? '·'}] ${p.where ?? p.entry} : ${p.message ?? p.reason}`); } };

const [command, ...args] = process.argv.slice(2);

if (command === 'verify') {
  const problems = verifySources(join(WORK, 'sources'));
  print('Sources', problems);
  console.log(problems.length ? '\nsources : NON CONFORMES' : 'sources : conformes au manifeste');
  process.exit(problems.length ? 1 : 0);
}

if (command === 'report') {
  const name = args[0];
  const path = join(WORK, 'lots', `${name}.json`);
  if (!name || !existsSync(path)) { console.error(`lot introuvable : ${name}`); process.exit(1); }
  mkdirSync(join(WORK, 'rapports'), { recursive: true });
  writeFileSync(join(WORK, 'rapports', `${name}.md`), renderLotReport(readJson(path), readSources(join(WORK, 'sources'))));
  console.log(`rapport écrit : reconstruction/a2-04/rapports/${name}.md`);
  process.exit(0);
}

if (command === 'assemble') {
  const complete = args.includes('--complete');
  const sourceProblems = verifySources(join(WORK, 'sources'));
  if (sourceProblems.length) { print('Sources', sourceProblems); process.exit(1); }
  const sources = readSources(join(WORK, 'sources'));
  const assembly = assemble({ sources, lots: readLots(), journal: readJson(join(WORK, 'journal.json')), mode: complete ? 'complete' : 'partial' });
  const deps = readLexiconDependencies(DATA);
  let references;
  if (complete) {
    const extracted = extractReferences({ activities: readActivities(DATA, ['n5']), expressions: deps.expressions });
    const remapped = remapReferences(extracted, assembly.idMap);
    references = remapped.references;
    for (const r of remapped.unknown) assembly.problems.push({ code: 'reference-non-remappee', where: r.where, message: `« ${r.vocab} » sans nouvel identifiant` });
  }
  const report = validateAssembly(assembly, deps, { references });
  const entries = assembly.files.reduce((n, f) => n + f.entries.length, 0);
  console.log(`assemblage ${assembly.mode} : ${entries} ENTRY, ${assembly.retired.length} identifiant(s) retiré(s), ${assembly.excluded.length} entrée(s) écartée(s)`);
  print('Problèmes de décision', assembly.problems);
  print('Erreurs du validateur lexical', report.errors);
  print('Avertissements', report.warnings);
  print('En attente', [...assembly.pending, ...report.pending]);
  if (args.includes('--write')) {
    const out = join(WORK, 'out');
    mkdirSync(join(out, 'n5'), { recursive: true });
    for (const f of assembly.files) writeFileSync(join(out, f.file), `${JSON.stringify(f.entries, null, 2)}\n`);
    writeFileSync(join(out, 'vocab-retired.json'), `${JSON.stringify(assembly.retired, null, 2)}\n`);
    writeFileSync(join(out, 'id-map.json'), `${JSON.stringify(assembly.idMap, null, 2)}\n`);
    console.log('\nsortie écrite dans reconstruction/a2-04/out/');
  }
  process.exit(assembly.problems.length + report.errors.length ? 1 : 0);
}

console.error('commandes : verify | report <lot> | assemble [--complete] [--write]');
process.exit(1);
