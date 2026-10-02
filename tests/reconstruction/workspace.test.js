// Espace de travail (A2-04 · 5.0) : sources figées, aucun lot, rapport généré, data/ intouché.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdtempSync, cpSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifySources } from '../../tools/reconstruction/sources.mjs';
import { renderLotReport } from '../../tools/reconstruction/report.mjs';
import { assemble, validateAssembly } from '../../tools/reconstruction/assemble.mjs';
import { ROOT, WORK, SOURCES, DEPS, fieldsFor, validated, lot } from './helpers.mjs';

test('sources : conformes au manifeste ; une modification est détectée', () => {
  assert.deepEqual(verifySources(join(WORK, 'sources')), []);
  const dir = mkdtempSync(join(tmpdir(), 'ocha-sources-'));
  try {
    cpSync(join(WORK, 'sources'), dir, { recursive: true });
    writeFileSync(join(dir, 'lieux.json'), '[]');
    assert.deepEqual(verifySources(dir).map((p) => p.code), ['source-modifiee']);
    rmSync(join(dir, 'exemples.json'));
    assert.ok(verifySources(dir).some((p) => p.code === 'source-absente'));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// A2-04 · 5.1 fermée : le lot 0 est entièrement validé, avec tout son journal.
test('5.1 : le lot 0 est entièrement validé (60 entrées), sans ajout', () => {
  const lot0 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-00.json'), 'utf8'));
  assert.equal(Object.keys(lot0.entries).length, 60);
  assert.ok(Object.values(lot0.entries).every((e) => e.status === 'validated'));
  assert.deepEqual(lot0.additions, []);
  const cited = new Set(Object.values(lot0.entries).flatMap((e) => e.journal ?? []));
  const journal = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8'));
  assert.ok(journal.filter((j) => cited.has(j.id)).every((j) => j.status === 'validated'), 'journal du lot 0 validé');
});

// A2-04 · 5.2 fermée : le lot 01 est entièrement validé, avec tout son journal.
test('5.2 : le lot 01 est entièrement validé (49 entrées), journal compris', () => {
  const lot1 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-01.json'), 'utf8'));
  assert.equal(Object.keys(lot1.entries).length, 49);
  assert.ok(Object.values(lot1.entries).every((e) => e.status === 'validated'));
  assert.deepEqual(lot1.additions, []);
  const journal = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8'));
  const own = journal.filter((j) => j.lot === 'lot-01');
  assert.equal(own.length, 66);
  assert.ok(own.every((j) => j.status === 'validated'));
});

// A2-04 · 5.3 fermée : le lot 02 est entièrement validé, avec tout son journal.
test('5.3 : le lot 02 est entièrement validé (41 entrées), journal compris', () => {
  const lot2 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-02.json'), 'utf8'));
  assert.equal(Object.keys(lot2.entries).length, 41);
  assert.ok(Object.values(lot2.entries).every((e) => e.status === 'validated'));
  assert.deepEqual(lot2.additions, []);
  const own = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8')).filter((j) => j.lot === 'lot-02');
  assert.equal(own.length, 80);
  assert.ok(own.every((j) => j.status === 'validated'));
});

// A2-04 · 5.4 fermée : le lot 03 est entièrement validé (39 entrées gardées, 掃除する retiré),
// avec tout son journal.
test('5.4 : le lot 03 est entièrement validé (40 entrées dont 1 retrait), journal compris', () => {
  const lot3 = JSON.parse(readFileSync(join(WORK, 'lots', 'lot-03.json'), 'utf8'));
  assert.equal(Object.keys(lot3.entries).length, 40);
  assert.ok(Object.values(lot3.entries).every((e) => e.status === 'validated'));
  assert.deepEqual(Object.entries(lot3.entries).filter(([, e]) => e.retire).map(([id, e]) => [id, e.retire.merged_into]), [['n5_v_220', 'n5_v_219']]);
  assert.deepEqual(lot3.additions, []);
  const own = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8')).filter((j) => j.lot === 'lot-03');
  assert.equal(own.length, 72);
  assert.ok(own.every((j) => j.status === 'validated'));
});

// L'espace de travail réel s'assemble sans erreur : ni problème de décision, ni erreur du
// validateur lexical, ni attente. Les comptes suivent les décisions validées, lot après lot.
test('espace de travail réel : assemblage partiel sans problème ni erreur', () => {
  const lots = readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(WORK, 'lots', f), 'utf8')));
  const journal = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8'));
  const a = assemble({ sources: SOURCES, lots, journal });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  const decisions = lots.flatMap((l) => Object.values(l.entries)).filter((d) => d.status === 'validated');
  assert.equal(a.files.reduce((n, f) => n + f.entries.length, 0), decisions.filter((d) => d.fields).length);
  assert.equal(a.retired.length, 1 + decisions.filter((d) => d.retire).length);
});

test('journal : chaque décision est citée par une entrée de lot', () => {
  const journal = JSON.parse(readFileSync(join(WORK, 'journal.json'), 'utf8'));
  const lots = readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join(WORK, 'lots', f), 'utf8')));
  const cited = new Set(lots.flatMap((l) => Object.values(l.entries).flatMap((e) => e.journal ?? [])));
  assert.deepEqual(journal.filter((j) => !cited.has(j.id)).map((j) => j.id), []);
});

test('rapport : généré depuis le JSON, distingue proposition et décision', () => {
  const md = renderLotReport(lot({
    n5_v_188: { status: 'proposed', fields: fieldsFor('n5_v_188') },
    n5_v_401: validated(fieldsFor('n5_v_401'))
  }), SOURCES);
  assert.match(md, /n5_v_188 → v_188/);
  assert.match(md, /PROPOSITION, non validée/);
  assert.match(md, /décision validée/);
  assert.match(md, /readings : \*\*exception\*\*/);
  assert.match(md, /Contexte \(anciens exemples, lecture seule\)/);
  assert.match(md, /\| 1 \| \*\*Illustratif\*\*/, 'sens présentés en tableau');
});

test('rapport : groupes candidats réunis, décisions du journal avec leur raison', () => {
  const j = [{ id: 'A2-04-D0001', date: '2026-10-02', lot: 'lot-test', entry: 'n5_v_472', field: 'entrée', kind: 'fusion', before: null, after: 'n5_v_424', reason: 'Même unité, deux graphies.' }];
  const md = renderLotReport(lot({
    n5_v_472: { status: 'proposed', journal: ['A2-04-D0001'], retire: { merged_into: 'n5_v_424' } },
    n5_v_188: { status: 'proposed', fields: fieldsFor('n5_v_188') },
    n5_v_424: { status: 'proposed', journal: ['A2-04-D0001'], fields: fieldsFor('n5_v_424') }
  }), SOURCES, j);
  assert.match(md, /## Groupe candidat · きれい \/ 綺麗/);
  assert.match(md, /\*\*Proposition du groupe\*\* : n5_v_424 : gardée ; n5_v_472 : fusionnée dans n5_v_424/);
  assert.match(md, /A2-04-D0001\*\* \(fusion, entrée\) : Même unité, deux graphies\./);
  // Les deux entrées du groupe se suivent, avant les autres entrées.
  assert.ok(md.indexOf('### n5_v_424') < md.indexOf('### n5_v_472') && md.indexOf('### n5_v_472') < md.indexOf('### n5_v_188'));
});

test('aucun outil de reconstruction n\'écrit dans data/ ni ne relit un rapport Markdown', () => {
  const dir = join(ROOT, 'tools', 'reconstruction');
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.mjs'))) {
    const src = readFileSync(join(dir, f), 'utf8');
    for (const m of src.matchAll(/writeFileSync\(([^,]+),/g)) assert.ok(!/DATA/.test(m[1]), `${f} : écriture vers data/`);
    assert.ok(!/\.md['"`]\)?\s*[,)]?.*readFileSync|readFileSync\([^)]*\.md/.test(src), `${f} : lecture d'un Markdown`);
  }
});
