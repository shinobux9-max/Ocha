// Ocha v2 — Reconstruction (A2-04) : commandes
//
//   node tools/reconstruction/run.mjs verify                       empreintes des sources
//   node tools/reconstruction/run.mjs report <lot>                 rapport de relecture d'un lot
//   node tools/reconstruction/run.mjs assemble [--complete] [--write]
//   node tools/reconstruction/run.mjs publish [--amorcer-avertissements | --write]
//
// Seule `publish --write` écrit dans data/ : c'est l'unique chemin de publication.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifySources, readSources } from './sources.mjs';
import { assemble, validateAssembly, remapReferences } from './assemble.mjs';
import { renderLotReport } from './report.mjs';
import { readLexiconDependencies, extractReferences, readActivities } from '../lexicon-adapter.mjs';
import { buildPublication, checkBootstrap, inventoryOf, serializeVocab, PUBLISHED_FILES, REFERENCE_FILES } from './publish.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const WORK = join(ROOT, 'reconstruction', 'a2-04');
const DATA = join(ROOT, 'data');
// Inventaire des avertissements connus du validateur lexical (arbitrage de 5.17, Q5).
const INVENTORY_FILE = 'avertissements-connus.json';
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
  writeFileSync(join(WORK, 'rapports', `${name}.md`), renderLotReport(readJson(path), readSources(join(WORK, 'sources')), readJson(join(WORK, 'journal.json'))));
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

// Publication (A2-04 · 5.17) : SEUL chemin vers le vocabulaire de data/. Sans option, calcule et
// affiche, sans rien écrire. `--amorcer-avertissements` : première publication seulement, écrit le
// seul inventaire des avertissements connus, jamais data/. `--write` : écrit les sept fichiers de
// data/, et seulement si aucune condition bloquante n'est relevée.
if (command === 'publish') {
  const write = args.includes('--write');
  const bootstrap = args.includes('--amorcer-avertissements');
  if (write && bootstrap) { console.error('publish : --write et --amorcer-avertissements ne se combinent pas'); process.exit(1); }
  const sourceProblems = verifySources(join(WORK, 'sources'));
  if (sourceProblems.length) { print('Sources', sourceProblems); console.log('\npublication : REFUSÉE (sources non conformes)'); process.exit(1); }
  const inventoryPath = join(WORK, INVENTORY_FILE);
  const inventoryExists = existsSync(inventoryPath);
  const alreadyPublished = existsSync(join(DATA, 'vocab-retired.json'));
  const { registries, knownKanji, particles } = readLexiconDependencies(DATA);
  const raw = Object.fromEntries(['lieux.json', ...REFERENCE_FILES].map((f) => [f, readFileSync(join(DATA, f), 'utf8')]));
  const p = buildPublication({
    sources: readSources(join(WORK, 'sources')), lots: readLots(), journal: readJson(join(WORK, 'journal.json')),
    deps: { registries, knownKanji, particles }, raw, inventory: inventoryExists ? readJson(inventoryPath) : null
  });
  const s = p.summary;
  console.log(`publication calculée : ${Object.entries(s.entries).map(([f, n]) => `${f} ${n} ENTRY`).join(', ')} ; ${s.retired} identifiant(s) retiré(s)`);
  console.log(`  lieux : ${s.lieux.total}, dont ${s.lieux.converted} à convertir`);
  console.log(`  références : ${s.references.total}, dont à remapper ${Object.entries(s.references.replaced).map(([f, n]) => `${f} ${n}`).join(', ')}`);
  console.log(`  validateur lexical : ${s.errors} erreur(s), ${s.warnings.total} avertissement(s) (${Object.entries(s.warnings.byCode).map(([c, n]) => `${n} ${c}`).join(', ') || 'aucun'})`);
  if (p.gone.length) console.log(`  avertissements de l'inventaire qui ne sont plus émis (diminution, acceptée) : ${p.gone.length}`);
  // Un fichier est à écrire si son contenu diffère, fins de ligne mises à part.
  const changed = PUBLISHED_FILES.filter((f) => {
    const path = join(DATA, f);
    return !existsSync(path) || readFileSync(path, 'utf8').replace(/\r\n/g, '\n') !== p.files[f].replace(/\r\n/g, '\n');
  });
  console.log(`  fichiers de data/ à écrire : ${changed.length ? changed.join(', ') : 'aucun (data/ est à jour)'}`);

  if (bootstrap) {
    const problems = checkBootstrap(p.lexical, { inventoryExists, alreadyPublished });
    const other = p.blocking.filter((b) => !b.startsWith('[avertissements]'));
    if (problems.length || other.length) {
      for (const x of [...problems, ...other]) console.log(`  ${x}`);
      console.log('\namorçage : REFUSÉ, rien n\'est écrit');
      process.exit(1);
    }
    writeFileSync(inventoryPath, serializeVocab(inventoryOf(p.lexical.warnings)));
    console.log(`\namorçage : inventaire écrit (${p.lexical.warnings.length} avertissements) dans reconstruction/a2-04/${INVENTORY_FILE} ; data/ n'est pas touché`);
    process.exit(0);
  }
  if (p.blocking.length) {
    console.log(`\nConditions bloquantes (${p.blocking.length})`);
    for (const b of p.blocking.slice(0, 50)) console.log(`  ${b}`);
    console.log(`\npublication : REFUSÉE, rien n'est écrit`);
    process.exit(1);
  }
  if (!write) { console.log('\npublication : aucune condition bloquante ; rien n\'est écrit (essai, relancer avec --write)'); process.exit(0); }
  for (const f of changed) { mkdirSync(dirname(join(DATA, f)), { recursive: true }); writeFileSync(join(DATA, f), p.files[f]); }
  console.log(`\npublication : ${changed.length} fichier(s) écrit(s) dans data/`);
  process.exit(0);
}

console.error('commandes : verify | report <lot> | assemble [--complete] [--write] | publish [--amorcer-avertissements | --write]');
process.exit(1);
