// Tests de tools/export-relecture.mjs
// Lancement : npm test
//
// L'export est construit en mémoire, sans relancer les contrôles (sinon l'outil relancerait cette
// suite). Rien n'est écrit dans le dépôt : les écritures se font dans un dossier temporaire.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { buildExport, writeExport, idsOfPerimeter, citedPrecedents, touchedElsewhere, EXPORT_FILES } from '../../tools/export-relecture.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const NOW = new Date(2026, 9, 5, 19, 30);
// Lot clos, pris comme lot de référence : son fichier, son journal et ses rapports existent.
const LOT16 = buildExport({ lot: 'lot-16', ref: 'HEAD', controls: false, now: NOW });

test('périmètre : les identifiants viennent de la section 2 seulement, sans doublon', () => {
  const md = '## 1. Méthode\n\n`n5_v_1`\n\n## 2. Périmètre proposé\n\n| `n5_v_2` | a |\n| `n5_v_3` | b |\n| `n5_v_2` | a |\n| `hj_v_1` | c |\n\n## 3. Suite\n\n`n5_v_4`\n';
  assert.deepEqual(idsOfPerimeter(md), ['n5_v_2', 'n5_v_3', 'hj_v_1']);
  assert.deepEqual(idsOfPerimeter('# Sans section\n'), []);
  assert.equal(idsOfPerimeter(read('docs/rapports/etape2-A2-04-lot16-perimetre.md')).length, 21);
});

test('précédents : un mot isolé est retenu, un mot pris dans un exemple japonais ne l\'est pas', () => {
  const lots = [
    { lot: 'lot-00', entries: { a: { status: 'validated', fields: {} }, b: { status: 'validated', fields: {} }, c: { status: 'validated', retire: { merged_into: 'a' } }, d: { status: 'proposed', fields: {} } } },
    { lot: 'lot-99', entries: { e: { status: 'validated', fields: {} } } }
  ];
  const src = new Map([['a', { word: 'いい / 良い' }], ['b', { word: '上' }], ['c', { word: '明い' }], ['d', { word: '痛い' }], ['e', { word: '大変' }]]);
  const texts = [
    { label: 'D1', text: 'Comme いい « bon » (lot 0).' },
    { label: 'D2', text: 'えが上手です : 上 n\'est pas cité ici, 上手 si.' },
    { label: 'D3', text: 'Comme 良い, et 明い, 痛い et 大変.' }
  ];
  // a : cité par ses deux formes ; b : 上 isolé dans D2 ; c : retirée ; d : non validée ; e : lot courant.
  assert.deepEqual(citedPrecedents(texts, lots, src, [], 'lot-99'), [
    { id: 'a', lot: 'lot-00', citedBy: ['D1', 'D3'] },
    { id: 'b', lot: 'lot-00', citedBy: ['D2'] }
  ]);
  assert.deepEqual(citedPrecedents([{ label: 'D4', text: 'えが上手です' }], lots, src, [], 'lot-99'), [], '上 dans 上手 n\'est pas une citation');
  assert.deepEqual(citedPrecedents(texts, lots, src, ['a'], 'lot-99').map((p) => p.id), ['b'], 'une entrée du lot n\'est pas son propre précédent');
});

test('entrées d\'autres lots : une décision du lot qui porte sur une entrée d\'un autre lot la fait exporter', () => {
  const lots = [
    { lot: 'lot-07', entries: { x: { status: 'proposed', retire: { merged_into: 'a' } }, y: { status: 'validated', fields: {} } } },
    { lot: 'lot-17', entries: { a: { status: 'proposed', fields: {} } } }
  ];
  const own = [{ id: 'D1', entry: 'x' }, { id: 'D2', entry: 'x' }, { id: 'D3', entry: 'a' }, { id: 'D4', entry: 'inconnue' }];
  // x : entrée du lot 07, rouverte par deux décisions du lot 17 ; a : entrée du lot lui-même ; y : non touchée.
  assert.deepEqual(touchedElsewhere(own, lots, ['a'], 'lot-17'), [{ id: 'x', lot: 'lot-07', decisions: ['D1', 'D2'] }]);
  assert.deepEqual(touchedElsewhere([{ id: 'D3', entry: 'a' }], lots, ['a'], 'lot-17'), []);
  // Un lot clos sans réouverture n'a pas cette partie remplie.
  assert.deepEqual(LOT16.summary.touched, []);
  assert.match(LOT16.files['07-lot-courant-sources.md'], /# Partie 3 — Entrées d'autres lots touchées par ce lot \(0\)\n\n_Aucune/);
});

test('export : exactement les dix fichiers attendus, chacun daté et rattaché à un commit', () => {
  assert.deepEqual(Object.keys(LOT16.files).sort(), [...EXPORT_FILES].sort());
  assert.equal(EXPORT_FILES.length, 10);
  for (const name of EXPORT_FILES.filter((f) => f.endsWith('.md'))) {
    assert.match(LOT16.files[name], /Date de l'export : 2026-10-05 19:30/, name);
    assert.match(LOT16.files[name], /Dernier commit : `[0-9a-f]{7} /, name);
  }
  assert.deepEqual([LOT16.summary.lot, LOT16.summary.ids, LOT16.summary.decisions, LOT16.summary.controls], ['lot-16', 21, 51, false]);
});

test('export : les documents regroupés sont entiers, avec leur chemin d\'origine', () => {
  const expected = {
    '01-gouvernance.md': ['CLAUDE.md', 'REGLES-CONSTRUCTION.md', 'ROADMAP.md', 'ETAT-ACTUEL.md'],
    '02-conception.md': ['docs/conception/00-sommaire.md', 'docs/conception/schema-A2-01.md'],
    '03-references-A2.md': ['docs/conception/a2/A2-L3-v1.md', 'docs/conception/a2/A2-ST-v1.md', 'docs/conception/a2/A2-DIM-v1.md', 'docs/conception/a2/A2-REL-v1.1.md', 'docs/conception/a2/A2-LING-v1.md'],
    '04-addenda.md': readdirSync(join(ROOT, 'docs', 'conception')).filter((f) => /^addendum-A\d/.test(f)).map((f) => `docs/conception/${f}`),
    '06-lot-courant-rapports.md': ['docs/rapports/etape2-A2-04-lot16-perimetre.md', 'docs/rapports/etape2-A2-04-lot16-proposition.md', 'docs/rapports/etape2-A2-04-lot16-valide.md', 'reconstruction/a2-04/rapports/lot-16.md']
  };
  for (const [name, paths] of Object.entries(expected)) {
    assert.ok(paths.length > 0, name);
    for (const p of paths) {
      assert.ok(LOT16.files[name].includes(`chemin d'origine : \`${p}\``), `${name} : chemin de ${p}`);
      assert.ok(LOT16.files[name].includes(read(p).replace(/\s+$/, '')), `${name} : ${p} en entier`);
    }
  }
  // L'ordre des rapports : périmètre, proposition, validation, puis le rapport généré.
  assert.deepEqual(LOT16.summary.reports, expected['06-lot-courant-rapports.md']);
  // Un code source garde ses accents graves : il est entouré d'une clôture plus longue.
  assert.ok(LOT16.files['02-conception.md'].includes(read('tools/reconstruction/rules.mjs').replace(/\n$/, '')));
});

test('export : le lot est une copie exacte, le journal du lot est intégral', () => {
  assert.equal(LOT16.files['08-lot-courant.json'], read('reconstruction/a2-04/lots/lot-16.json'));
  const own = JSON.parse(read('reconstruction/a2-04/journal.json')).filter((d) => d.lot === 'lot-16');
  assert.deepEqual(JSON.parse(LOT16.files['09-journal-lot-courant.json']), own);
  assert.equal(own.length, 51);
});

test('export : chaque fiche source est complète, exemple compris, et les précédents cités sont joints', () => {
  const s7 = LOT16.files['07-lot-courant-sources.md'];
  const vocab = JSON.parse(read('reconstruction/a2-04/sources/vocab.json'));
  for (const id of Object.keys(JSON.parse(read('reconstruction/a2-04/lots/lot-16.json')).entries)) {
    const e = vocab.find((x) => x.id === id);
    assert.ok(s7.includes(JSON.stringify(e, null, 2)), `${id} : fiche complète`);
    assert.ok(s7.includes(e.example.french), `${id} : exemple`);
  }
  // Relevés dans les raisons du journal : いい, きれい, 面白い, 大変, 痛い, 病気.
  assert.deepEqual([...LOT16.summary.precedents].sort(), ['n5_v_10', 'n5_v_420', 'n5_v_424', 'n5_v_465', 'n5_v_495', 'n5_v_55']);
  assert.match(s7, /## n5_v_495 · 大変 — lot-00, `validated`\n\n\*\*Cité par\*\* : A2-04-D/);
  const more = buildExport({ lot: 'lot-16', controls: false, now: NOW, precedents: ['n5_v_627'] });
  assert.ok(more.summary.precedents.includes('n5_v_627'));
  assert.match(more.files['07-lot-courant-sources.md'], /ajouté à la main \(--precedents\)/);
  assert.throws(() => buildExport({ lot: 'lot-16', controls: false, precedents: ['n5_v_999999'] }), /précédent « n5_v_999999 »/);
});

test('export : sans contrôles relancés, le relais et le diff le disent ; la note est reprise telle quelle', () => {
  assert.match(LOT16.files['10-diff-et-controles.md'], /## 2\. Contrôles NON exécutés pour cet export/);
  assert.match(LOT16.files['05-relais.md'], /\| Tests \| non exécutés pour cet export \|/);
  assert.match(LOT16.files['05-relais.md'], /\| Assemblage réel \| \d+ ENTRY, \d+ retraits, \d+ entrées écartées/);
  // Seules les sections de contrôle sont regardées : le diff, plus bas, peut citer n'importe quel texte.
  assert.doesNotMatch(LOT16.files['10-diff-et-controles.md'].split('\n## 3. ')[0], /node --test|run\.mjs verify/);
  const dir = mkdtempSync(join(tmpdir(), 'ocha-note-'));
  try {
    writeFileSync(join(dir, 'note.md'), '## Consignes\n\nNOTE-DE-TEST : lire chaque fiche entière.\n\n');
    const withNote = buildExport({ lot: 'lot-16', controls: false, now: NOW, note: join(dir, 'note.md') });
    assert.equal(withNote.summary.note, true);
    assert.match(withNote.files['05-relais.md'], /reprise telle quelle depuis un fichier hors dépôt\.\n\n## Consignes\n\nNOTE-DE-TEST : lire chaque fiche entière\.\n\n# Partie 2/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
  const absent = buildExport({ lot: 'lot-16', controls: false, now: NOW, note: 'docs/relecture/aucune-note-de-ce-nom.md' });
  assert.equal(absent.summary.note, false);
  assert.match(absent.files['05-relais.md'], /\*\*Aucune note de relais\*\* : le fichier `docs\/relecture\/aucune-note-de-ce-nom\.md` n'existe pas/);
});

test('export : un lot sans fichier (périmètre) donne les fiches candidates, sans décision', () => {
  const p = buildExport({ lot: 'lot-98', controls: false, now: NOW, ids: ['n5_v_436', 'n5_v_453'] });
  assert.deepEqual(JSON.parse(p.files['08-lot-courant.json']).identifiants_candidats, ['n5_v_436', 'n5_v_453']);
  assert.deepEqual(JSON.parse(p.files['09-journal-lot-courant.json']), []);
  assert.match(p.files['07-lot-courant-sources.md'], /\*\*Aucune décision n'est prise sur ces fiches\*\*/);
  assert.match(p.files['07-lot-courant-sources.md'], /## n5_v_436 → v_436 · 古い/);
  assert.match(p.files['05-relais.md'], /aucun fichier de lot ; 2 entrées candidates/);
  assert.throws(() => buildExport({ lot: 'lot-98', controls: false, ids: ['n5_v_999999'] }), /identifiants absents des sources/);
  assert.throws(() => buildExport({ lot: 'seize', controls: false }), /forme lot-NN attendue/);
});

test('export : aucune adresse ni chemin personnel ; une fuite arrête l\'export', () => {
  for (const [name, content] of Object.entries(LOT16.files)) {
    assert.doesNotMatch(content, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, `${name} : adresse`);
    assert.doesNotMatch(content, /[A-Za-z]:[\\/]Users[\\/]/, `${name} : chemin de machine`);
  }
  const dir = mkdtempSync(join(tmpdir(), 'ocha-fuite-'));
  try {
    // L'adresse est fabriquée ici pour que ce fichier de test n'en contienne aucune.
    const at = String.fromCharCode(64);
    writeFileSync(join(dir, 'note.md'), `Écrire à quelqu.un${at}exemple.org pour la suite.\n`);
    assert.throws(() => buildExport({ lot: 'lot-16', controls: false, now: NOW, note: join(dir, 'note.md') }), /05-relais\.md : donnée personnelle ou chemin de machine/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('écriture : une seule version courante, sans toucher aux autres fichiers du dossier', () => {
  const dir = mkdtempSync(join(tmpdir(), 'ocha-export-'));
  try {
    writeFileSync(join(dir, '11-ancien-export.md'), 'périmé');
    writeFileSync(join(dir, '05-relais.md'), 'ancienne version');
    writeFileSync(join(dir, 'notes-personnelles.txt'), 'à garder');
    writeExport(dir, LOT16.files);
    assert.deepEqual(readdirSync(dir).sort(), [...EXPORT_FILES, 'notes-personnelles.txt'].sort());
    assert.equal(readFileSync(join(dir, '05-relais.md'), 'utf8'), LOT16.files['05-relais.md']);
    assert.equal(readFileSync(join(dir, 'notes-personnelles.txt'), 'utf8'), 'à garder');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('l\'outil n\'écrit que dans son dossier de sortie, et ne committe rien', () => {
  const code = read('tools/export-relecture.mjs');
  const writes = [...code.matchAll(/(writeFileSync|rmSync|mkdirSync)\(([^)]*)\)/g)].map((m) => m[2]);
  assert.ok(writes.length >= 3);
  for (const w of writes) assert.match(w, /^(join\()?outDir/, `écriture hors du dossier de sortie : ${w}`);
  assert.doesNotMatch(code, /'(commit|add|push|rm|reset|checkout|stash)'/, 'aucune commande git qui modifie le dépôt');
});
