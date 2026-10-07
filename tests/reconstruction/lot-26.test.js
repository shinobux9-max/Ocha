// A2-04 · lot 26 « Passe finale » (5.16) : VALIDÉ le 2026-10-07 (statuts seulement), sur
// l'autorisation explicite de ChatGPT, par délégation. Les 19 ENTRY rouvertes et les 44 décisions
// D1570 à D1613 sont passées de « proposed » à « validated » ; rien d'autre n'a changé. L'essai à
// blanc d'avant la validation (dryLots, dryJournal) est devenu l'état réel : il lui est identique.
//
// Arbitrage du périmètre (Q1 à Q9, relayé le 2026-10-07). Le lot ne décide aucune entrée nouvelle :
// il ROUVRE, dans leur lot d'origine, les seules ENTRY validées dont les données changent, par des
// décisions de journal `lot-26` ajoutées à la fin (une réouverture, puis une décision par
// modification). Les ENTRY visées par une relation sans la porter ne sont ni modifiées ni rouvertes.
// Les ENTRY rouvertes, revalidées avec le lot, sont de nouveau dans l'assemblage réel.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { assemble, validateAssembly, remapReferences } from '../../tools/reconstruction/assemble.mjs';
import { newId } from '../../tools/reconstruction/mechanical.mjs';
import { extractReferences, readActivities } from '../../tools/lexicon-adapter.mjs';
import { ROOT, WORK, SOURCES, DEPS } from './helpers.mjs';

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const readJournal = () => readJson(join(WORK, 'journal.json'));
const readLots = () => readdirSync(join(WORK, 'lots')).filter((f) => f.endsWith('.json')).sort().map((f) => readJson(join(WORK, 'lots', f)));
const asValidated = (x) => ({ ...x, status: 'validated' });
const dryJournal = () => readJournal().map(asValidated);
const dryLots = () => readLots().map((l) => ({ ...l, entries: Object.fromEntries(Object.entries(l.entries).map(([id, e]) => [id, asValidated(e)])) }));
const dnum = (n) => `A2-04-D${String(n).padStart(4, '0')}`;

// Les 19 ENTRY rouvertes, dans l'ordre du journal, avec leur lot d'origine.
const REOPENED = [
  ['n5_v_208', 'lot-03'], ['n5_v_580', 'lot-18'], ['n5_v_709', 'lot-18'], ['n5_v_561', 'lot-18'], ['n5_v_529', 'lot-18'],
  ['n5_v_533', 'lot-19'], ['n5_v_562', 'lot-19'], ['n5_v_181', 'lot-20'], ['n5_v_527', 'lot-19'], ['n5_v_593', 'lot-23'],
  ['n5_v_416', 'lot-23'], ['n5_v_418', 'lot-23'], ['n5_v_413', 'lot-23'], ['n5_v_344', 'lot-23'], ['n5_v_584', 'lot-23'],
  ['n5_v_447', 'lot-24'], ['n5_v_497', 'lot-24'], ['n5_v_116', 'lot-19'], ['n5_v_598', 'lot-19']
];
const REOPENED_IDS = REOPENED.map(([id]) => id);

// Les 22 liens arbitrés (Q4) : sens porteur, type, sens visé, et les deux libellés. Chaque lien
// n'est noté qu'une fois (I12) : sur le verbe transitif pour transitive_of, sur l'ENTRY de plus
// petit numéro pour une relation symétrique. Ce côté porteur est une convention technique PROPRE AU
// LOT 26 (arbitrage de la proposition, choix 1), stable et reproductible ; ce n'est pas une norme
// générale : I12 n'impose aucun côté.
const LINKS = [
  ['R1', 'v_208_s1', 'Bain', 'equivalent_to', 'v_209_s1', 'Bain'],
  ['R2', 'v_580_s1', 'Ouvrir', 'transitive_of', 'v_710_s1', 'S\'ouvrir'],
  ['R3', 'v_709_s1', 'Fermer', 'transitive_of', 'v_579_s1', 'Se fermer'],
  ['R4', 'v_561_s1', 'Éteindre', 'transitive_of', 'v_560_s1', 'S\'éteindre'],
  ['R5', 'v_529_s1', 'Aligner', 'transitive_of', 'v_528_s2', 'Être aligné'],
  ['R6', 'v_533_s1', 'Emprunter', 'reciprocal_with', 'v_575_s1', 'Prêter'],
  ['R7', 'v_562_s2', 'Faire traverser', 'transitive_of', 'v_563_s1', 'Traverser'],
  ['R8', 'v_181_s1', 'Faire', 'equivalent_to', 'v_608_s1', 'Faire'],
  ['R9', 'v_527_s1', 'Donner', 'similar_to', 'v_608_s2', 'Donner (à des plantes, des animaux)'],
  ['R10', 'v_593_s1', 'Cependant', 'equivalent_to', 'v_599_s1', 'Mais'],
  ['R11', 'v_416_s1', 'Ensuite', 'equivalent_to', 'v_596_s1', 'Et puis'],
  // R12 : では ↔ じゃ, sens par sens ; それでは ↔ じゃあ, deux emplois. Aucun graphe complet.
  ['R12', 'v_418_s1', 'Dans ce cas', 'equivalent_to', 'v_595_s1', 'Dans ce cas'],
  ['R12', 'v_418_s2', 'Eh bien', 'equivalent_to', 'v_595_s2', 'Bon'],
  ['R12', 'v_418_s3', 'Alors', 'equivalent_to', 'v_595_s3', 'Alors'],
  ['R12', 'v_413_s1', 'Alors', 'equivalent_to', 'v_417_s1', 'Dans ce cas'],
  ['R12', 'v_413_s2', 'Eh bien', 'equivalent_to', 'v_417_s2', 'Alors'],
  ['R13', 'v_344_s1', 'Oui', 'equivalent_to', 'v_586_s1', 'Oui'],
  ['R13', 'v_344_s1', 'Oui', 'opposed_to', 'v_584_s1', 'Non'],
  ['R13', 'v_584_s1', 'Non', 'opposed_to', 'v_586_s1', 'Oui'],
  ['R14', 'v_447_s1', 'Peu nombreux', 'opposed_to', 'v_654_s1', 'Nombreux'],
  // R15 : faible quantité, courte durée. Rien sur l'hésitation ni le refus.
  ['R15', 'v_497_s1', 'Un peu', 'similar_to', 'v_509_s1', 'Une petite quantité'],
  ['R15', 'v_497_s2', 'Un instant', 'similar_to', 'v_509_s3', 'Un court instant']
];
const entryOf = (senseId) => senseId.replace(/_s[0-9]+$/, '');
const numberOf = (senseId) => Number(/^v_([0-9]+)_/.exec(senseId)[1]);
const norm = (s) => s.replace(/’/g, '\'');

test('lot 26 (validé) : un fichier de lot sans entrée ; 19 ENTRY rouvertes dans leur lot, revalidées ; plus aucune proposition', () => {
  const lots = readLots();
  assert.equal(lots.length, 27, 'lots 0 à 26');
  assert.deepEqual(lots.find((l) => l.lot === 'lot-26'), { lot: 'lot-26', title: 'Passe finale', entries: {}, additions: [] });
  const open = lots.flatMap((l) => Object.entries(l.entries).filter(([, e]) => e.status !== 'validated').map(([id]) => `${id} ${l.lot}`));
  assert.deepEqual(open, [], 'les lots 0 à 26 sont entièrement validés');
  // Les 19 ENTRY rouvertes sont dans leur lot d'origine, validées, et elles seules citent le lot 26.
  assert.ok(REOPENED.every(([id, l]) => lots.find((x) => x.lot === l).entries[id].status === 'validated'));
  assert.ok(REOPENED.every(([id, l]) => lots.find((x) => x.lot === l).entries[id].fields), 'aucune ENTRY rouverte n\'est retirée');
  const citing = lots.flatMap((l) => Object.entries(l.entries).filter(([, e]) => e.journal.some((d) => d >= dnum(1570))).map(([id]) => `${id} ${l.lot}`));
  assert.deepEqual([...citing].sort(), REOPENED.map(([id, l]) => `${id} ${l}`).sort());
});

test('lot 26 : 44 décisions validées (D1570 à D1613), ajoutées à la fin ; D0001 à D1569 inchangées', () => {
  const journal = readJournal();
  assert.deepEqual(journal.map((j) => j.id), Array.from({ length: 1613 }, (_, k) => dnum(k + 1)), 'identifiants continus');
  const before = journal.slice(0, 1569);
  assert.ok(before.every((j) => j.status === 'validated' && j.lot !== 'lot-26'));
  assert.equal(createHash('sha256').update(JSON.stringify(before)).digest('hex'), 'c7375b5bbd5d5dd55ea408c7f43b8e317d416c742a6118bf056708006bf3ddbe', 'empreinte des décisions validées');
  const own = journal.slice(1569);
  assert.ok(own.every((j) => j.lot === 'lot-26' && j.status === 'validated' && j.date === '2026-10-07'));
  assert.ok(journal.every((j) => j.status === 'validated'), 'tout le journal est validé : aucune proposition en cours');
  // Une décision validée n'est jamais modifiée en silence : empreinte de D0001 à D1613, fixée à la
  // validation du lot 26 (2026-10-07). Elle ne change que par une décision nouvelle, ajoutée à la fin.
  assert.equal(createHash('sha256').update(JSON.stringify(journal.slice(0, 1613))).digest('hex'), '19c9c1a2f70bcf3798c9bb44e41c60a67377cf58afde4ed75d5ef06285ae589d', 'empreinte des décisions validées, lot 26 compris');
  assert.equal(journal.filter((j) => j.lot === 'lot-26').length, 44);
  // Une réouverture par ENTRY, dans l'ordre ; puis ses modifications.
  const reopen = own.filter((j) => j.field === 'entrée');
  assert.deepEqual(reopen.map((j) => j.entry), REOPENED_IDS);
  assert.ok(reopen.every((j) => j.kind === 'decision' && j.reason.startsWith('Réouverture explicite d\'une ENTRY validée') && j.after.startsWith('rouverte : ')));
  const mods = own.filter((j) => j.field !== 'entrée');
  assert.deepEqual(mods.map((j) => [j.kind, j.field.replace(/^sens [0-9] · /, '')].join(':')).reduce((c, k) => ({ ...c, [k]: (c[k] ?? 0) + 1 }), {}),
    { 'decision:relations': 22, 'correction:readings': 1, 'decision:word': 1, 'decision:writings': 1 });
  // Chaque ENTRY rouverte cite ses décisions historiques, intactes et à leur place, puis celles du lot 26.
  const lots = readLots();
  const cited = new Map();
  for (const [id, lotName] of REOPENED) {
    const e = lots.find((l) => l.lot === lotName).entries[id];
    const r = reopen.find((j) => j.entry === id);
    assert.deepEqual([r.before.lot, r.before.status], [lotName, 'validated'], id);
    const mine = own.filter((j) => j.entry === id).map((j) => j.id);
    assert.equal(mine[0], r.id, `${id} : la réouverture vient d'abord`);
    assert.deepEqual(e.journal, [...r.before.journal, ...mine], `${id} : journal historique, puis lot 26`);
    assert.ok(r.before.journal.every((d) => journal.find((j) => j.id === d).status === 'validated' && r.reason.includes(d.replace('A2-04-', ''))), `${id} : décisions historiques nommées`);
    for (const d of mine) cited.set(d, (cited.get(d) ?? 0) + 1);
  }
  assert.deepEqual([...cited.keys()].sort(), own.map((j) => j.id), 'chaque décision du lot 26 est citée');
  assert.ok([...cited.values()].every((n) => n === 1), 'une seule fois, par son ENTRY');
  const elsewhere = lots.flatMap((l) => Object.entries(l.entries)).filter(([id]) => !REOPENED_IDS.includes(id));
  assert.ok(!elsewhere.some(([, e]) => e.journal.some((d) => d >= dnum(1570))), 'aucune autre entrée ne cite le lot 26');
});

// Le cœur du lot : rejouer les décisions sur l'état d'avant, gardé au journal, redonne exactement
// l'état validé. Rien d'autre n'a donc changé dans une ENTRY rouverte.
test('lot 26 : chaque ENTRY rouverte = son état d\'avant (champ « avant ») + les modifications décidées, rien d\'autre', () => {
  const own = readJournal().filter((j) => j.lot === 'lot-26');
  const lots = readLots();
  for (const [id, lotName] of REOPENED) {
    const e = lots.find((l) => l.lot === lotName).entries[id];
    const [reopen, ...mods] = own.filter((j) => j.entry === id);
    assert.ok(mods.length >= 1, `${id} : rouverte sans modification`);
    const f = structuredClone(reopen.before.fields);
    for (const d of mods) {
      const m = /^sens ([0-9]) · relations$/.exec(d.field);
      if (m) {
        const s = f.senses[Number(m[1]) - 1];
        assert.deepEqual(s.relations, d.before, `${d.id} : état d'avant`);
        s.relations = structuredClone(d.after);
      } else if (id === 'n5_v_116' && d.field === 'readings') {
        assert.ok(!Object.hasOwn(f, 'readings'), '頼む : la lecture était mécanique');
        f.readings = [{ kana: 'たのむ', romaji: 'tanomu', furigana: d.after, default: true, note: null }];
      } else if (id === 'n5_v_598' && d.field === 'word') {
        assert.ok(!Object.hasOwn(f, 'word') && !Object.hasOwn(f, 'readings'), '煙草 : forme et lecture étaient mécaniques');
        f.word = d.after;
        f.readings = [{ kana: 'たばこ', romaji: 'tabako', furigana: 'たばこ', default: true, note: null }];
      } else if (id === 'n5_v_598' && d.field === 'writings') {
        assert.deepEqual(f.writings, d.before, `${d.id} : état d'avant`);
        f.writings = structuredClone(d.after);
      } else assert.fail(`${d.id} : modification inattendue (${d.field})`);
    }
    assert.deepEqual(e.fields, f, `${id} : état validé`);
  }
});

test('lot 26 : les 22 liens arbitrés (R1 à R15) et eux seuls, sur les sens attendus ; I12', () => {
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal(), mode: 'complete' });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, [], 'I12 : types du registre, cibles existantes, aucun doublon ni lien miroir');
  const senses = new Map(a.files.flatMap((f) => f.entries).flatMap((e) => e.senses.map((s) => [s.id, { ...s, entry: e }])));
  const found = [...senses.values()].flatMap((s) => s.relations.map((x) => `${s.id} ${x.type} ${x.target}`));
  assert.deepEqual([...found].sort(), LINKS.map(([, c, , type, t]) => `${c} ${type} ${t}`).sort(), 'tout le corpus : ces 22 liens, aucun autre');
  const registry = new Map(DEPS.registries['relations.json'].families.flatMap((f) => f.relations).map((x) => [x.id, x]));
  for (const [r0, c, cl, type, t, tl] of LINKS) {
    assert.deepEqual([norm(senses.get(c).meaning.primary), norm(senses.get(t).meaning.primary)], [cl, tl], `${r0} : libellés des sens reliés`);
    const meta = registry.get(type);
    assert.ok(meta, `${type} : au registre A2-REL`);
    // Symétrique : une seule écriture, sur l'ENTRY de plus petit numéro. Dirigée : sur le verbe transitif.
    if (meta.symmetric) assert.ok(numberOf(c) < numberOf(t), `${r0} : ${c} porte le lien symétrique`);
    else {
      assert.deepEqual([type, meta.inverse, senses.get(c).entry.linguistic.grammatical_class], ['transitive_of', 'intransitive_of', 'verbe'], r0);
      assert.ok(senses.get(c).particles.includes('を'), `${c} : le sens porteur régit を`);
    }
  }
  // Ce que l'arbitrage écarte : aucun lien, ni porté ni reçu.
  const touched = new Set(LINKS.flatMap(([, c, , , t]) => [c, t]));
  for (const s of ['v_561_s2', 'v_560_s2', 'v_528_s1', 'v_562_s1', 'v_181_s2', 'v_527_s2', 'v_417_s3', 'v_584_s2', 'v_509_s2', 'v_520_s1', 'v_655_s1']) {
    assert.ok(senses.has(s) && !touched.has(s), `${s} : sans relation`);
  }
  // R12 : aucun graphe complet. では et それでは ne sont pas reliées entre elles, ni じゃ et じゃあ.
  const pairs = new Set(LINKS.filter(([x]) => x === 'R12').map(([, c, , , t]) => [entryOf(c), entryOf(t)].sort().join('+')));
  assert.deepEqual([...pairs].sort(), ['v_413+v_417', 'v_418+v_595']);
});

test('lot 26 : les 15 ENTRY seulement visées par un lien ne sont ni modifiées ni rouvertes', () => {
  const lots = readLots();
  const journal = readJournal();
  const targets = [...new Set(LINKS.map(([, , , , t]) => `n5_${entryOf(t)}`))].filter((id) => !REOPENED_IDS.includes(id));
  assert.equal(targets.length, 15);
  for (const id of targets) {
    const e = lots.flatMap((l) => Object.entries(l.entries)).find(([k]) => k === id)[1];
    assert.equal(e.status, 'validated', id);
    assert.ok(e.fields.senses.every((s) => s.relations.length === 0), `${id} : aucune relation portée`);
    assert.ok(!journal.some((j) => j.lot === 'lot-26' && j.entry === id), `${id} : aucune décision du lot 26`);
  }
});

// L'état RÉEL, lu dans les fichiers sans rien supposer : les 19 ENTRY rouvertes sont de nouveau
// assemblées, avec leurs relations. L'essai à blanc d'avant la validation lui est identique.
test('lot 26 : assemblage réel (684 ENTRY, 35 retraits, aucune entrée écartée), sans problème ni erreur ; identique à l\'essai à blanc', () => {
  const a = assemble({ sources: SOURCES, lots: readLots(), journal: readJournal() });
  const r = validateAssembly(a, DEPS);
  assert.deepEqual(a.problems, []);
  assert.deepEqual(r.errors, []);
  assert.deepEqual([...a.pending, ...r.pending], []);
  assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0]);
  assert.deepEqual(a.excluded, [], 'plus aucune proposition écartée');
  const ids = new Set(a.files.flatMap((f) => f.entries).map((e) => e.id));
  assert.ok(REOPENED_IDS.every((id) => ids.has(newId(id))), 'les 19 ENTRY rouvertes sont assemblées');
  assert.equal(a.files.flatMap((f) => f.entries).flatMap((e) => e.senses).reduce((n, s) => n + s.relations.length, 0), 22, 'les 22 liens sont dans l\'assemblage réel');
  assert.deepEqual(readLots(), dryLots(), 'lots : l\'essai à blanc est l\'état réel');
  assert.deepEqual(readJournal(), dryJournal(), 'journal : l\'essai à blanc est l\'état réel');
});

test('lot 26 : assemblage réel, partiel et complet : 684 ENTRY, 35 retraits, aucune entrée écartée ; 71 références remappées', () => {
  for (const mode of ['partial', 'complete']) {
    const a = assemble({ sources: SOURCES, lots: readLots(), journal: readJournal(), mode });
    // Table de remappage (Q7) : calculée et vérifiée ici ; l'écriture dans data/ appartient à 5.17.
    const refs = remapReferences(extractReferences({ activities: readActivities(join(ROOT, 'data'), ['n5']), expressions: DEPS.expressions }), a.idMap);
    const r = validateAssembly(a, DEPS, mode === 'complete' ? { references: refs.references } : {});
    assert.deepEqual(a.problems, [], mode);
    assert.deepEqual(r.errors, [], mode);
    assert.deepEqual([...a.pending, ...r.pending], [], mode);
    assert.deepEqual([a.files.reduce((n, f) => n + f.entries.length, 0), a.retired.length, a.excluded.length], [684, 35, 0], mode);
    assert.equal(r.warnings.length, 148, `${mode} : aucun avertissement nouveau`);
    assert.deepEqual([refs.references.length, refs.unknown.length], [71, 0], `${mode} : 71 références, aucune perdue`);
    assert.deepEqual(a.retired.filter((x) => x.merged_into === null).map((x) => x.id), ['v_717', 'v_602']);
    assert.equal(Object.keys(a.idMap).length, 718, 'chaque entrée source a une ligne dans la table des identifiants');
  }
});

test('lot 26 : 頼む corrigée, 煙草 en たばこ ; 居る et すぐに inchangées (Q5, Q6, Q9)', () => {
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal() });
  const byId = new Map(a.files.flatMap((f) => f.entries).map((e) => [e.id, e]));
  // Q5 : seuls les furigana changent ; kana et romaji sont ceux de la source, qui reste intacte.
  assert.deepEqual(byId.get('v_116').readings, [{ kana: 'たのむ', romaji: 'tanomu', furigana: '<ruby>頼<rt>たの</rt></ruby>む', default: true, note: null }]);
  assert.deepEqual([byId.get('v_116').word, byId.get('v_116').writings], ['頼む', []]);
  assert.equal(SOURCES.vocab.find((s) => s.id === 'n5_v_116').word_furigana, '<ruby>頼<rt>たノ</rt></ruby>む');
  // Q6 : たばこ forme usuelle, 煙草 autre graphie avec les furigana de la source ; sens inchangés.
  const tabako = byId.get('v_598');
  assert.deepEqual([tabako.word, tabako.writings, tabako.readings], ['たばこ',
    [{ form: '煙草', furigana: SOURCES.vocab.find((s) => s.id === 'n5_v_598').word_furigana }],
    [{ kana: 'たばこ', romaji: 'tabako', furigana: 'たばこ', default: true, note: null }]]);
  assert.deepEqual(tabako.senses.map((s) => s.meaning.primary), ['Cigarette', 'Tabac']);
  // Révision de D1613 (arbitrage de la proposition, choix 5) : la segmentation de la source est
  // CONSERVÉE, et la raison le dit ; elle ne la donne ni pour juste, ni pour règle. 煙草 reste hors
  // de la liste A d'A8.
  const d1613 = readJournal().find((j) => j.id === 'A2-04-D1613');
  assert.deepEqual([d1613.entry, d1613.field, d1613.kind, d1613.lot], ['n5_v_598', 'writings', 'decision', 'lot-26']);
  assert.ok(!/pas tranchée/.test(d1613.reason), 'D1613 : la segmentation est tranchée');
  for (const p of ['fiche source, conservés exactement', '(I5)', 'liste fermée des lectures spéciales d\'A8', 'sans généralisation normative ni affirmation linguistique']) {
    assert.ok(d1613.reason.includes(p), `D1613 : ${p}`);
  }
  assert.equal(a.files.flatMap((f) => f.entries).filter((e) => e.word === 'たばこ' || e.writings.some((w) => w.form === 'たばこ')).length, 1, 'たばこ : une seule ENTRY');
  // Q6, Q9 : statu quo. Ni rouvertes, ni citées par le lot 26.
  assert.deepEqual([byId.get('v_548').word, byId.get('v_548').writings], ['居る', []]);
  assert.deepEqual(byId.get('v_518').senses.map((s) => s.particles), [['に']]);
  const lots = readLots();
  for (const id of ['n5_v_548', 'n5_v_518']) {
    assert.equal(lots.flatMap((l) => Object.entries(l.entries)).find(([k]) => k === id)[1].status, 'validated', id);
    assert.ok(!readJournal().some((j) => j.lot === 'lot-26' && j.entry === id), id);
  }
});

// Q2, Q3 : 5.16 fixe et vérifie la correspondance des clés de exemples.json ; elle ne réécrit rien.
test('lot 26 : correspondance des 717 clés de vocabulaire de exemples.json, sans réécriture', () => {
  const table = readJson(join(WORK, 'exemples-correspondance.json'));
  assert.deepEqual(Object.keys(table), ['objet', 'exceptions']);
  assert.deepEqual(table.exceptions, { n5_v_602: { grammar: 'g_27' }, n5_v_717: null }, 'seules clés sans ENTRY de vocabulaire');
  const data = readJson(join(ROOT, 'data', 'n5', 'exemples.json'));
  assert.deepEqual(data, SOURCES.exemples, 'data/n5/exemples.json : identique à la source figée, non réécrit');
  const a = assemble({ sources: SOURCES, lots: dryLots(), journal: dryJournal(), mode: 'complete' });
  const keys = Object.keys(data.vocab);
  const count = (list) => [list.length, list.reduce((n, k) => n + data.vocab[k].length, 0)];
  const special = keys.filter((k) => Object.hasOwn(table.exceptions, k));
  const mapped = keys.filter((k) => !Object.hasOwn(table.exceptions, k));
  assert.deepEqual([...special].sort(), ['n5_v_602', 'n5_v_717']);
  assert.ok(mapped.every((k) => typeof a.idMap[k] === 'string'), 'toute autre clé a une ENTRY, la sienne ou son survivant');
  const kept = mapped.filter((k) => a.idMap[k] === newId(k));
  const merged = mapped.filter((k) => a.idMap[k] !== newId(k));
  assert.deepEqual([count(keys), count(kept), count(merged), count(['n5_v_602']), count(['n5_v_717'])], [[717, 2152], [682, 2047], [33, 99], [1, 3], [1, 3]]);
  const entries = new Set(a.files.flatMap((f) => f.entries).map((e) => e.id));
  assert.ok(mapped.every((k) => entries.has(a.idMap[k])), 'chaque cible est une ENTRY assemblée');
  // など : retirée sans successeur, ses 3 phrases iront au point de grammaire g_27 ; v_717 : clé fantôme.
  assert.equal(a.idMap.n5_v_602, null);
  assert.ok(!Object.hasOwn(a.idMap, 'n5_v_717'));
  assert.match(readFileSync(join(ROOT, 'data', 'n5', 'grammar.json'), 'utf8'), /"id": ?"g_27"/, 'g_27 existe dans la grammaire');
  assert.ok(data.vocab.n5_v_602.every((p) => p.japanese.includes('など')));
});
