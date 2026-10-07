// A2-04 · 5.17 « Publication » : la commande de publication et l'inventaire des avertissements.
//
// data/ est une PROJECTION de l'espace de reconstruction (arbitrage du périmètre de 5.17, Q2 et
// Q8) : le vocabulaire publié est la sortie de l'assembleur complet, jamais corrigée à la main. Ces
// tests tiennent cette égalité, le remappage strict des références, la conversion des lieux, et la
// règle de l'inventaire : aucune régression, toute diminution permise, amorçage une seule fois.
//
// IMPORTANT : l'inventaire est un BASELINE TECHNIQUE. Il dit quels avertissements sont connus, non
// qu'ils sont légitimes. L'audit, un par un, des `category: null` et des `semantic_type: null`
// relève d'A2-05, et conditionne la clôture de l'étape 2.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { assemble, remapReferences } from '../../tools/reconstruction/assemble.mjs';
import {
  buildPublication, remapTokens, sameExceptIds, convertLieux, inventoryOf, checkInventory, checkBootstrap,
  PUBLISHED_FILES, REFERENCE_FILES, WARNING_CODES, BOOTSTRAP_BASELINE
} from '../../tools/reconstruction/publish.mjs';
import { ROOT, WORK, SOURCES, DEPS } from './helpers.mjs';

const DATA = join(ROOT, 'data');
const readJson = (p) => JSON.parse(readFileSync(p, 'utf8').replace(/^﻿/, ''));
const readLots = () => readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).sort().map((f) => readJson(join(WORK, 'lots', f)));
const readJournal = () => readJson(join(WORK, 'journal.json'));
const INVENTORY = join(WORK, 'avertissements-connus.json');

// Entrées réelles d'une publication, toutes en mémoire ; `over` remplace ce qu'un test veut casser.
function inputs(over = {}) {
  const raw = Object.fromEntries(['lieux.json', ...REFERENCE_FILES].map((f) => [f, readFileSync(join(DATA, f), 'utf8')]));
  return {
    sources: SOURCES, lots: readLots(), journal: readJournal(),
    deps: { registries: DEPS.registries, knownKanji: DEPS.knownKanji, particles: DEPS.particles },
    raw, inventory: existsSync(INVENTORY) ? readJson(INVENTORY) : null, ...over
  };
}
const blockedBy = (p, code) => p.blocking.filter((b) => b.startsWith(`[${code}]`));
const warning = (code, where) => ({ code, where, message: 'essai' });
// Baseline exact, fabriqué : 120 categorie-nulle, 27 type-nul, 1 kanji-inconnu.
const exactBaseline = () => Object.entries(BOOTSTRAP_BASELINE).flatMap(([code, n]) => Array.from({ length: n }, (_, k) => warning(code, `essai · ${code} · ${k}`)));
const NOT_PUBLISHED = { inventoryExists: false, alreadyPublished: false };

// ── Remappage des références : idempotent, jamais permissif (choix 4) ────────

test('remapReferences : ancien identifiant connu → canonique ; canonique existant → conservé ; tout autre → erreur', () => {
  const idMap = { n5_v_1: 'v_1', n5_v_2: 'v_1', n5_v_3: null, hj_v_1: 'v_718' };
  const refs = [
    { where: 'a', vocab: 'n5_v_1' }, { where: 'b', vocab: 'n5_v_2' }, { where: 'c', vocab: 'hj_v_1' }, // anciens, connus
    { where: 'd', vocab: 'v_1' }, { where: 'e', vocab: 'v_718' },                                       // déjà canoniques
    { where: 'f', vocab: 'n5_v_3' }, { where: 'g', vocab: 'n5_v_999' }, { where: 'h', vocab: 'v_3' },    // retiré, inconnu, non assemblé
    { where: 'i', vocab: 'v_999' }, { where: 'j', vocab: '' }, { where: 'k', vocab: 'ex_1' }
  ];
  const r = remapReferences(refs, idMap);
  assert.deepEqual(r.references.map((x) => `${x.where}:${x.vocab}`), ['a:v_1', 'b:v_1', 'c:v_718', 'd:v_1', 'e:v_718']);
  assert.deepEqual(r.unknown.map((x) => x.where), ['f', 'g', 'h', 'i', 'j', 'k'], 'aucune tolérance pour une référence inconnue');
  // Idempotence : remapper le résultat ne change rien, et ne perd rien.
  const again = remapReferences(r.references, idMap);
  assert.deepEqual(again, { references: r.references, unknown: [] });
  // L'ensemble canonique peut être donné explicitement : un identifiant hors de lui est refusé.
  assert.equal(remapReferences([{ where: 'x', vocab: 'v_718' }], idMap, new Set(['v_1'])).unknown.length, 1);
});

test('remapTokens : seules les chaînes qui sont un ancien identifiant changent ; le reste est conservé à l\'octet', () => {
  const idMap = { n5_v_12: 'v_12', n5_v_13: 'v_12', hj_v_1: 'v_718', n5_v_602: null };
  const text = '{\r\n  "vocab": ["n5_v_12", "n5_v_13",   "hj_v_1"],\r\n  "note": "voir n5_v_12 dans le texte",\r\n  "id": "n5_m_1"\r\n}';
  const r = remapTokens(text, idMap);
  assert.equal(r.text, '{\r\n  "vocab": ["v_12", "v_12",   "v_718"],\r\n  "note": "voir n5_v_12 dans le texte",\r\n  "id": "n5_m_1"\r\n}');
  assert.deepEqual([r.replaced.length, r.unknown], [3, []]);
  assert.equal(sameExceptIds(JSON.parse(text), JSON.parse(r.text), idMap), 3, 'comparaison structurelle : trois chaînes, rien d\'autre');
  // Inconnu, ou retiré sans successeur : laissé tel quel et signalé, jamais deviné.
  const bad = remapTokens('["n5_v_999", "n5_v_602"]', idMap);
  assert.deepEqual([bad.text, bad.unknown], ['["n5_v_999", "n5_v_602"]', ['n5_v_999', 'n5_v_602']]);
  // Idempotence.
  assert.deepEqual(remapTokens(r.text, idMap), { text: r.text, replaced: [], unknown: [] });
});

test('sameExceptIds : toute autre différence est refusée', () => {
  const idMap = { n5_v_1: 'v_1' };
  const a = { vocab: ['n5_v_1'], n: 1, t: 'x' };
  assert.equal(sameExceptIds(a, { vocab: ['v_1'], n: 1, t: 'x' }, idMap), 1);
  for (const b of [{ vocab: ['v_2'], n: 1, t: 'x' }, { vocab: ['v_1'], n: 2, t: 'x' }, { vocab: ['v_1'], n: 1, t: 'y' },
    { vocab: ['v_1'], n: 1 }, { n: 1, vocab: ['v_1'], t: 'x' }, { vocab: ['v_1', 'v_1'], n: 1, t: 'x' }]) {
    assert.equal(sameExceptIds(a, b, idMap), null, JSON.stringify(b));
  }
});

// ── Lieux ────────────────────────────────────────────────────────────────────

test('convertLieux : vocab_categories remplacé à la même place par vocab_tags ; le reste et la mise en forme sont conservés', () => {
  const lieux = [{ id: 'konbini', name: 'Konbini', vocab_categories: ['a', 'b'], order: 1 }, { id: 'gare', vocab_categories: ['c'], order: 2 }];
  const placeTags = { konbini: 'lieu_konbini', gare: 'lieu_gare' };
  const text = JSON.stringify(lieux, null, 2).replace(/\n/g, '\r\n');
  const r = convertLieux(text, placeTags);
  assert.deepEqual([r.problems, r.converted], [[], 2]);
  assert.deepEqual(r.lieux, [{ id: 'konbini', name: 'Konbini', vocab_tags: ['lieu_konbini'], order: 1 }, { id: 'gare', vocab_tags: ['lieu_gare'], order: 2 }]);
  assert.deepEqual(Object.keys(r.lieux[0]), ['id', 'name', 'vocab_tags', 'order'], 'même place dans l\'objet');
  assert.ok(r.text.includes('\r\n') && !r.text.endsWith('\n'), 'fins de ligne et absence de saut final conservées');
  // Idempotence : un fichier déjà converti n'est plus modifié.
  assert.deepEqual([convertLieux(r.text, placeTags).text, convertLieux(r.text, placeTags).converted], [r.text, 0]);
  // Refus : lieu sans tag, tag différent, les deux champs à la fois, aucun des deux.
  assert.match(convertLieux(text, { konbini: 'lieu_konbini' }).problems.join(), /gare : aucun tag/);
  assert.match(convertLieux(r.text, { konbini: 'lieu_autre', gare: 'lieu_gare' }).problems.join(), /konbini : « vocab_tags » différent/);
  assert.match(convertLieux(JSON.stringify([{ id: 'gare', vocab_categories: [], vocab_tags: [] }], null, 2), placeTags).problems.join(), /à la fois/);
  assert.match(convertLieux(JSON.stringify([{ id: 'gare' }], null, 2), placeTags).problems.join(), /ni « vocab_categories » ni « vocab_tags »/);
});

// ── Inventaire des avertissements connus (Q5) ────────────────────────────────

test('inventaire : trié, déterministe, un couple { code, where } par avertissement', () => {
  const inv = inventoryOf([warning('type-nul', 'b'), warning('categorie-nulle', 'b'), warning('kanji-inconnu', 'a')]);
  assert.deepEqual(inv, [{ code: 'kanji-inconnu', where: 'a' }, { code: 'categorie-nulle', where: 'b' }, { code: 'type-nul', where: 'b' }]);
  assert.deepEqual(WARNING_CODES, ['categorie-nulle', 'type-nul', 'kanji-inconnu']);
});

test('inventaire, règle permanente : aucune régression, toute diminution permise', () => {
  const known = exactBaseline();
  const inventory = inventoryOf(known);
  // État de référence : rien à signaler.
  assert.deepEqual(checkInventory(known, inventory), { problems: [], gone: [] });
  // (3) Un 149e avertissement : échec.
  assert.match(checkInventory([...known, warning('categorie-nulle', 'essai · nouveau')], inventory).problems.join(), /avertissement nouveau, absent de l'inventaire/);
  // (2) Un code inattendu : échec, même sans dépasser le nombre.
  assert.match(checkInventory([...known.slice(1), warning('romaji-macron', 'essai · x')], inventory).problems.join(), /code inattendu « romaji-macron »/);
  // Un avertissement connu déplacé sur un autre sens est un avertissement nouveau.
  assert.equal(checkInventory([...known.slice(1), warning(known[0].code, 'ailleurs')], inventory).problems.length, 1);
  // (4) Un avertissement connu qui disparaît : accepté, et signalé sans échec.
  const fewer = checkInventory(known.slice(3), inventory);
  assert.deepEqual([fewer.problems, fewer.gone.length], [[], 3]);
  assert.deepEqual(checkInventory([], inventory).problems, [], 'plus aucun avertissement : accepté');
  // (5) Inventaire absent : échec, toujours.
  assert.match(checkInventory(known, null).problems.join(), /inventaire des avertissements connus absent/);
  assert.match(checkInventory([], undefined).problems.join(), /absent/);
  // Inventaire mal formé, ou portant un code non admis, ou une ligne en double.
  assert.match(checkInventory(known, [{ code: 'type-nul' }]).problems.join(), /liste de \{ code, where \} attendue/);
  assert.match(checkInventory([], [{ code: 'autre', where: 'x' }]).problems.join(), /code « autre » non admis/);
  assert.match(checkInventory([], [{ code: 'type-nul', where: 'x' }, { code: 'type-nul', where: 'x' }]).problems.join(), /ligne en double/);
});

test('inventaire, amorçage : accepté sur le seul baseline exact (0 erreur ; 120, 27, 1), une seule fois', () => {
  const known = exactBaseline();
  assert.deepEqual(BOOTSTRAP_BASELINE, { 'categorie-nulle': 120, 'type-nul': 27, 'kanji-inconnu': 1 });
  // (1) Le baseline exact : accepté.
  assert.deepEqual(checkBootstrap({ errors: [], warnings: known }, NOT_PUBLISHED), []);
  // Tout écart le fait refuser : une erreur, un avertissement de plus, de moins, un code inattendu,
  // une autre répartition pour le même total.
  const refused = (report, re) => assert.match(checkBootstrap(report, NOT_PUBLISHED).join(' | '), re);
  refused({ errors: [{ code: 'x' }], warnings: known }, /1 erreur\(s\)/);
  refused({ errors: [], warnings: [...known, warning('type-nul', 'essai · 149')] }, /28 « type-nul » au lieu de 27/);
  refused({ errors: [], warnings: known.slice(1) }, /119 « categorie-nulle » au lieu de 120/);
  refused({ errors: [], warnings: [...known.slice(1), warning('romaji-macron', 'x')] }, /code d'avertissement inattendu « romaji-macron »/);
  refused({ errors: [], warnings: [...known.filter((w) => w.code !== 'kanji-inconnu'), warning('type-nul', 'essai · swap')] }, /0 « kanji-inconnu » au lieu de 1/);
  refused({ errors: [], warnings: [] }, /0 avertissements au lieu de 148/);
  // (5) Après la première publication, l'amorçage est fermé : un inventaire existe, ou data/ est publié.
  assert.match(checkBootstrap({ errors: [], warnings: known }, { inventoryExists: true, alreadyPublished: false }).join(), /un inventaire des avertissements existe déjà/);
  assert.match(checkBootstrap({ errors: [], warnings: known }, { inventoryExists: false, alreadyPublished: true }).join(), /data\/ est déjà publié/);
});

// ── La publication, calculée en mémoire ──────────────────────────────────────

test('publication : sept fichiers et eux seuls ; conditions bloquantes relevées une à une', () => {
  const p = buildPublication(inputs({ inventory: [] }));
  assert.deepEqual(Object.keys(p.files).sort(), [...PUBLISHED_FILES].sort(), 'bornée aux sept fichiers');
  assert.deepEqual([p.summary.entries, p.summary.retired, p.summary.lieux.total, p.summary.references.total, p.summary.errors],
    [{ 'n5/vocab.json': 682, 'vocab-hors-jlpt.json': 2 }, 35, 4, 71, 0]);
  // Inventaire vide : chaque avertissement est nouveau, et lui seul bloque.
  assert.equal(blockedBy(p, 'avertissements').length, p.lexical.warnings.length);
  assert.equal(p.blocking.length, p.lexical.warnings.length);
  // Inventaire absent : une condition bloquante, pour toute publication.
  assert.deepEqual(blockedBy(buildPublication(inputs({ inventory: null })), 'avertissements'), ['[avertissements] inventaire des avertissements connus absent (avertissements-connus.json)']);

  const full = inventoryOf(p.lexical.warnings);
  assert.deepEqual(buildPublication(inputs({ inventory: full })).blocking, [], 'inventaire complet : aucune condition bloquante');
  const blocked = (over, code, re) => {
    const q = buildPublication(inputs({ inventory: full, ...over }));
    assert.ok(blockedBy(q, code).some((b) => re.test(b)), `${code} : ${q.blocking.slice(0, 2).join(' | ')}`);
  };
  // Une proposition n'est jamais publiée : entrée de lot, ou décision du journal.
  const lots = readLots(); lots.find((l) => l.lot === 'lot-21').entries.n5_v_518.status = 'proposed';
  blocked({ lots }, 'proposition', /1 entrée\(s\) de lot non validée/);
  const journal = readJournal(); journal.at(-1).status = 'proposed';
  blocked({ journal }, 'proposition', /1 décision\(s\) du journal non validée/);
  // Référence inconnue, ou vers une ENTRY retirée sans successeur, sous l'ancienne forme comme sous la nouvelle.
  const base = inputs();
  const withMission = (id) => ({ raw: { ...base.raw, 'n5/missions.json': base.raw['n5/missions.json'].replace(/"(?:n5_v_84|v_84)"/, `"${id}"`) } });
  blocked(withMission('n5_v_99999'), 'reference', /« n5_v_99999 » sans identifiant canonique/);
  blocked(withMission('n5_v_602'), 'reference', /« n5_v_602 » sans identifiant canonique/);
  blocked(withMission('v_602'), 'reference', /« v_602 » ne désigne aucune ENTRY publiée/);
  blocked(withMission('v_99999'), 'reference', /« v_99999 » ne désigne aucune ENTRY publiée/);
  // Lieux : un lieu de lieux.json sans tag dans place-tags.json ; un lieu qui porte déjà un autre tag.
  // (Un lieu des SOURCES sans tag est refusé plus tôt encore, par la couche mécanique.)
  const lieuxText = base.raw['lieux.json'];
  const eol = lieuxText.includes('\r\n') ? '\r\n' : '\n';
  const withLieux = (mutate) => {
    const list = JSON.parse(lieuxText); mutate(list);
    return { raw: { ...base.raw, 'lieux.json': `${JSON.stringify(list, null, 2).replace(/\n/g, eol)}${/\r?\n$/.test(lieuxText) ? eol : ''}` } };
  };
  blocked(withLieux((l) => l.push({ id: 'ecole', vocab_categories: [] })), 'lieux', /ecole : aucun tag/);
  blocked(withLieux((l) => { const g = l.find((x) => x.id === 'gare'); delete g.vocab_categories; g.vocab_tags = ['lieu_inconnu']; }), 'lieux', /gare : « vocab_tags » différent/);
  assert.throws(() => buildPublication(inputs({ sources: { ...SOURCES, placeTags: { konbini: 'lieu_konbini' } } })), /sans tag dans place-tags\.json/);
});

// ── L'état réel, publié (A2-04 · 5.17) ───────────────────────────────────────

const lf = (s) => s.replace(/\r\n/g, '\n');
const dataText = (f) => readFileSync(join(DATA, f), 'utf8');

// Le test permanent d'Q2 : data/ est exactement la projection de la reconstruction. Toute correction
// faite à la main dans le vocabulaire publié, sans passer par un lot et par `publish`, le fait échouer.
test('data/ est la projection de la reconstruction : les sept fichiers publiés sont ceux que publish calcule', () => {
  const p = buildPublication(inputs());
  assert.deepEqual(p.blocking, [], 'aucune condition bloquante sur l\'état réel');
  for (const f of PUBLISHED_FILES) assert.equal(lf(dataText(f)), lf(p.files[f]), `data/${f} : différent de la publication calculée`);
  // Idempotence : sur un data/ publié, il n'y a plus rien à convertir ni à remapper.
  assert.deepEqual([p.summary.lieux.converted, p.summary.references.replaced], [0, { 'n5/missions.json': 0, 'n5/lectures.json': 0, 'expressions.json': 0 }]);
  assert.equal(p.summary.references.kept, 71, 'les 71 références désignent une ENTRY publiée');
  // Vocabulaire : la sortie de l'assembleur complet, ENTRY pour ENTRY.
  const a = assemble({ sources: SOURCES, lots: readLots(), journal: readJournal(), mode: 'complete' });
  assert.deepEqual(readJson(join(DATA, 'n5', 'vocab.json')), a.files[0].entries);
  assert.deepEqual(readJson(join(DATA, 'vocab-hors-jlpt.json')), a.files[1].entries);
  assert.deepEqual(readJson(join(DATA, 'vocab-retired.json')), a.retired);
  assert.deepEqual([a.files[0].entries.length, a.files[1].entries.length, a.retired.length], [682, 2, 35]);
  // Format arbitré (choix 1) : indentation de 2, saut de ligne final.
  for (const f of ['n5/vocab.json', 'vocab-hors-jlpt.json', 'vocab-retired.json']) {
    assert.equal(lf(dataText(f)), `${JSON.stringify(readJson(join(DATA, f)), null, 2)}\n`, `${f} : format`);
  }
});

test('data/ publié : lieux en vocab_tags, références canoniques, plus aucun ancien identifiant de vocabulaire', () => {
  const lieux = readJson(join(DATA, 'lieux.json'));
  assert.deepEqual(lieux.map((l) => [l.id, l.vocab_tags, 'vocab_categories' in l]),
    Object.entries(SOURCES.placeTags).map(([id, tag]) => [id, [tag], false]));
  // Les autres champs des lieux sont ceux de la source figée, dans le même ordre.
  assert.deepEqual(lieux.map((l) => Object.keys(l)), SOURCES.lieux.map((l) => Object.keys(l).map((k) => (k === 'vocab_categories' ? 'vocab_tags' : k))));
  for (const [i, l] of lieux.entries()) {
    const { vocab_tags: _t, ...rest } = l; const { vocab_categories: _c, ...old } = SOURCES.lieux[i];
    assert.deepEqual(rest, old, `${l.id} : seul le champ des tags change`);
  }
  const ids = new Set([...readJson(join(DATA, 'n5', 'vocab.json')), ...readJson(join(DATA, 'vocab-hors-jlpt.json'))].map((e) => e.id));
  for (const f of REFERENCE_FILES) {
    const text = dataText(f);
    assert.ok(!/(?:n[1-5]|hj)_v_[0-9]/.test(text), `${f} : ancien identifiant de vocabulaire`);
    for (const m of text.match(/"v_[0-9]+"/g) ?? []) assert.ok(ids.has(m.slice(1, -1)), `${f} : ${m} ne désigne aucune ENTRY publiée`);
  }
  assert.equal(REFERENCE_FILES.reduce((n, f) => n + (dataText(f).match(/"v_[0-9]+"/g) ?? []).length, 0), 71);
  assert.ok(![...ids].some((id) => !/^v_[1-9][0-9]*$/.test(id)), 'tous les identifiants publiés sont de forme v_<n>');
});

// Q6 : les quatre fichiers figés ne sont pas remappés ; ils gardent leurs anciens identifiants.
test('data/ publié : les quatre fichiers figés sont intacts (exemples, concepts, curriculum, mapping)', () => {
  const FROZEN = {
    'n5/exemples.json': '73fd83308102df2111520f6f3c6509fa17812c0d5f240c6367db0946dfa9732c',
    'concepts/n5.json': '92aa5ff0cbc65f974fd84a05e4b150b41404cbeefe9b551b82b48d07124ff587',
    'curriculum/n5.json': '96bccaa152e3458129b00296a8cb16f57d83fcefe42fe0afb24ae060b76b0dab',
    'mapping.json': 'e5f38b94f2a5f6732e18c37943ae17b41cefc65c460f7c414385f305c67440fd'
  };
  for (const [f, hash] of Object.entries(FROZEN)) {
    assert.equal(createHash('sha256').update(lf(dataText(f))).digest('hex'), hash, `data/${f} : modifié`);
    assert.ok(!PUBLISHED_FILES.includes(f), `${f} : hors de la publication`);
  }
  assert.deepEqual(readJson(join(DATA, 'n5', 'exemples.json')), SOURCES.exemples, 'exemples.json : identique à la source figée');
  assert.equal(Object.keys(readJson(join(DATA, 'n5', 'exemples.json')).vocab).filter((k) => /^n5_v_[0-9]+$/.test(k)).length, 717, 'ses 717 clés gardent l\'ancienne forme (tâche 11)');
});

// L'inventaire est un BASELINE TECHNIQUE : il liste les avertissements connus, il ne les légitime
// pas. Leur audit un par un (catégories et types nuls) relève d'A2-05 et conditionne la clôture de
// l'étape 2. Ce test refuse toute régression ; il ne fixe AUCUN nombre : une diminution reste permise.
test('inventaire réel : aucun avertissement nouveau, aucun code inattendu, aucune erreur ; une diminution reste permise', () => {
  assert.ok(existsSync(INVENTORY), 'après la première publication, un inventaire absent est une erreur');
  const inventory = readJson(INVENTORY);
  assert.deepEqual(inventory, inventoryOf(inventory), 'trié');
  assert.ok(inventory.every((x) => WARNING_CODES.includes(x.code)));
  const p = buildPublication(inputs());
  assert.deepEqual(p.lexical.errors, []);
  assert.deepEqual(checkInventory(p.lexical.warnings, inventory).problems, []);
  assert.ok(p.lexical.warnings.length <= inventory.length, 'jamais plus d\'avertissements que l\'inventaire');
  // Chaque ligne désigne une ENTRY publiée (et, pour un sens, un sens de cette ENTRY).
  const entries = new Map([...readJson(join(DATA, 'n5', 'vocab.json')), ...readJson(join(DATA, 'vocab-hors-jlpt.json'))].map((e) => [e.id, e]));
  for (const x of inventory) {
    const [, entryId, senseId] = x.where.split(' · ');
    assert.ok(entries.has(entryId), `${x.where} : ENTRY inconnue`);
    if (senseId) assert.ok(entries.get(entryId).senses.some((s) => s.id === senseId), `${x.where} : sens inconnu`);
  }
});

// Après la première publication, l'amorçage est fermé : la commande le refuse et n'écrit rien.
test('amorçage fermé après la première publication : refusé par la commande, sans aucune écriture', () => {
  assert.ok(existsSync(join(DATA, 'vocab-retired.json')), 'verrou de première publication');
  const snapshot = () => [INVENTORY, ...PUBLISHED_FILES.map((f) => join(DATA, f))].map((p) => createHash('sha256').update(readFileSync(p)).digest('hex')).join();
  const before = snapshot();
  const r = spawnSync(process.execPath, [join(ROOT, 'tools', 'reconstruction', 'run.mjs'), 'publish', '--amorcer-avertissements'], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /amorçage refusé : un inventaire des avertissements existe déjà/);
  assert.match(r.stdout, /amorçage refusé : data\/ est déjà publié/);
  assert.match(r.stdout, /amorçage : REFUSÉ, rien n'est écrit/);
  assert.equal(snapshot(), before, 'ni l\'inventaire ni data/ ne changent');
  // Sans option : la publication est à jour, rien à écrire.
  const dry = spawnSync(process.execPath, [join(ROOT, 'tools', 'reconstruction', 'run.mjs'), 'publish'], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(dry.status, 0, dry.stdout);
  assert.match(dry.stdout, /fichiers de data\/ à écrire : aucun \(data\/ est à jour\)/);
  assert.equal(snapshot(), before);
});
