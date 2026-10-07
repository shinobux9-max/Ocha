// Tests de tools/validate-data.mjs
// Lancement : npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { validateData, VALIDATED_LEVELS } from '../../tools/validate-data.mjs';

// ── Jeu de données minimal et valide ──

const R = (k, r) => `<ruby>${k}<rt>${r}</rt></ruby>`;

// Squelette canonique de kana.json : deux écritures, cinq groupes chacune ; seule la base des
// hiragana reçoit des cases.
const canonicalKana = (baseRows) => ({ scripts: ['hiragana', 'katakana'].map((id, i) => ({
  id, groups: ['base', 'dakuten', 'handakuten', 'sokuon', 'yoon'].map((g) => ({
    id: g, title: null, rows: g === 'base' && i === 0 ? baseRows : [] })) })) });

// Registres A2 minimaux et valides (A2-02 · 3.1) : un exemple de chaque cas utile.
function registries() {
  return {
    // Répétitions légales (identité locale) : « mois » sous deux parents, « radio → radio » ;
    // un niveau 2 sans niveau 3.
    'registries/categories.json': { source: 'A2-L3-v1', levels: [
      { id: 'temps', label: 'Temps', children: [
        { id: 'unites_temporelles', label: 'Unités temporelles', children: [{ id: 'mois', label: 'Mois' }] },
        { id: 'calendrier', label: 'Calendrier', children: [{ id: 'mois', label: 'Mois' }, { id: 'jours', label: 'Jours' }] },
        { id: 'duree', label: 'Durée', children: [] }] },
      { id: 'medias', label: 'Médias', children: [
        { id: 'radio', label: 'Radio', children: [{ id: 'radio', label: 'Radio' }] }] }] },
    'registries/grammatical-classes.json': { source: 'A2-02', classes: [
      { id: 'nom', label: 'Nom' }, { id: 'verbe', label: 'Verbe' }] },
    'registries/tags.json': { source: 'A2-02', tags: [
      { id: 'lieu_konbini', label: 'Utile au konbini', description: 'Vocabulaire du lieu konbini.', kind: 'lieu' }] },
    'registries/counters.json': { source: 'A2-02', compatibilities: [
      { id: 'small_animals', label: 'Petits animaux' }] },
    'registries/semantic-types.json': { source: 'A2-ST-v1', families: [
      { id: 'entity', label: 'ENTITY', types: [{ id: 'personne', label: 'Personne' }, { id: 'lieu', label: 'Lieu' }] }] },
    'registries/dimensions.json': { source: 'A2-DIM-v1', families: [
      { id: 'modalite_conceptuelle', label: 'MODALITÉ CONCEPTUELLE', axes: [
        { id: 'probabilite', label: 'Probabilité', poles: [{ id: 'probabilite', label: 'Probabilité' }] },
        { id: 'certitude_incertitude', label: 'Certitude ↔ Incertitude',
          poles: [{ id: 'certitude', label: 'Certitude' }, { id: 'incertitude', label: 'Incertitude' }] }] }] },
    'registries/relations.json': { source: 'A2-REL-v1.1', families: [
      { id: 'structure', label: 'STRUCTURE', relations: [
        { id: 'part_of', label: 'part_of', symmetric: false, inverse: 'has_part' },
        { id: 'has_part', label: 'has_part', symmetric: false, inverse: 'part_of' },
        { id: 'opposed_to', label: 'opposed_to', symmetric: true, inverse: null },
        { id: 'compared_to', label: 'compared_to', symmetric: false, inverse: null }] }] },
    'registries/linguistic-functions.json': { source: 'A2-LING-v1', families: [
      { id: 'grammatical', label: 'GRAMMATICAL', functions: [{ id: 'interrogatif', label: 'interrogatif' }] },
      { id: 'pragmatic_discourse', label: 'PRAGMATIC / DISCOURSE', functions: [{ id: 'politesse', label: 'politesse' }] }] }
  };
}

// ENTRY au schéma A2-01 (publication d'A2-04) : validée par le validateur lexical, que
// validate-data appelle. Valeurs minimales, prises dans les registres d'essai ci-dessus.
const entry = (id, w, kana, romaji, furigana, linguistic = {}) => ({
  id, level: 'N5', word: w, writings: [],
  readings: [{ kana, romaji, furigana, default: true, note: null }],
  linguistic: { grammatical_class: 'nom', group: 'nom', suru_compatible: false, suffix: false, counter: null, ...linguistic },
  nuance: null, tags: [], retired_sense_ids: [],
  senses: [{
    id: `${id}_s1`, meaning: { primary: 'sens', alternatives: [] },
    category: { level_1: 'temps', level_2: 'duree' }, semantic_type: 'lieu',
    dimensions: [], relations: [], linguistic_functions: { grammatical: [], pragmatic_discourse: [] }
  }]
});

function baseData() {
  return {
    'n5/vocab.json': [entry('v_1', '水', 'みず', 'mizu', R('水', 'みず')),
      entry('v_2', '食べる', 'たべる', 'taberu', `${R('食', 'た')}べる`, { grammatical_class: 'verbe', group: 'ru' })],
    'vocab-retired.json': [],
    'n5/grammar.json': [
      { id: 'g_1', level: 'N5', item: 'です', pattern: '[Nom] + です' },
      { id: 'g_2', level: 'N5', item: 'か', requires: { grammar: ['g_1'] } }
    ],
    'n5/kanji.json': { level: 'N5', count: 1, chars: ['水'] },
    'kanji_jouyou_fr.json': { 食: {} },
    'kana.json': canonicalKana([[{ char: 'あ', romaji: 'a' }, null, { char: 'きゃ', romaji: 'kya' }]]),
    ...registries(),
    'registres.json': [{ id: 'poli' }, { id: 'familier' }],
    'expressions.json': [{ id: 'ex_1', variants: [{ register: 'poli', japanese: 'ありがとうございます', romaji: 'arigatou gozaimasu' }] }],
    'vocab-hors-jlpt.json': [],
    'lieux.json': [{ id: 'konbini', vocab_tags: ['lieu_konbini'] }],
    'onboarding.json': [],
    'n5/missions.json': [{
      id: 'n5_m_1', place: 'konbini',
      requires: { grammar: ['g_1'] },
      teaches: { vocab: ['v_1'], expression: ['ex_1'] },
      characters: [{ id: 'moi' }],
      dialogue: [{
        speaker: 'moi', japanese: `${R('水', 'みず')}です。`, romaji: 'mizu desu.', french: "C'est de l'eau.",
        register: 'poli', refs: [{ text: '水', vocab: 'v_1' }], grammar: ['g_1']
      }],
      exercises: [{ id: 'n5_m_1_q1', type: 'choice', target: { vocab: ['v_1'] }, choices: ['a', 'b'], answer: 0 }]
    }],
    'n5/lectures.json': [{
      id: 'n5_l_1', type: 'histoire', place: null,
      requires: { grammar: ['g_1'] }, teaches: { vocab: ['v_1'] },
      blocks: [{ kind: 'paragraph', lines: [{ japanese: 'みずです。', romaji: 'mizu desu.', french: 'Eau.', register: 'poli' }] }],
      questions: [{ id: 'n5_l_1_q1', target: { vocab: ['v_1'] }, choices: ['a', 'b'], answer: 1, line_ref: [0, 0] }]
    }]
  };
}

function withData(files, fn) {
  const root = mkdtempSync(join(tmpdir(), 'ocha-data-'));
  try {
    for (const [rel, content] of Object.entries(files)) {
      const full = join(root, rel);
      mkdirSync(dirname(full), { recursive: true });
      writeFileSync(full, typeof content === 'string' ? content : JSON.stringify(content));
    }
    return fn(validateData(root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

const codes = (list) => list.map((x) => x.code);
const modify = (fn) => { const d = baseData(); fn(d); return d; };

// ── Tests ──

test('le périmètre validé est explicite', () => {
  assert.deepEqual(VALIDATED_LEVELS, ['n5']);
});

test('un jeu de données valide ne produit aucune erreur', () => {
  withData(baseData(), (r) => {
    assert.deepEqual(r.errors, []);
  });
});

test('JSON invalide et fichier obligatoire absent', () => {
  withData(modify((d) => { d['n5/grammar.json'] = '{ pas du json'; delete d['n5/kanji.json']; }), (r) => {
    assert.ok(codes(r.errors).includes('json-invalide'));
    assert.ok(codes(r.errors).includes('fichier-absent'));
  });
});

test('référence vers un identifiant inexistant (partie 2, 2.7)', () => {
  withData(modify((d) => { d['n5/missions.json'][0].requires.grammar.push('g_99'); }), (r) => {
    assert.ok(r.errors.some((e) => e.code === 'ref-inexistante' && e.message.includes('g_99')));
  });
});

test('élément à la fois exigé et enseigné', () => {
  withData(modify((d) => { d['n5/missions.json'][0].teaches.grammar = ['g_1']; }), (r) => {
    assert.ok(codes(r.errors).includes('requires-et-teaches'));
  });
});

test('un kana ne peut pas être exigé', () => {
  withData(modify((d) => { d['n5/missions.json'][0].requires.kana = ['kana_あ']; }), (r) => {
    assert.ok(codes(r.errors).includes('kana-exige'));
  });
});

test('question sans identifiant, sans cible, ou ciblant hors de l\'activité', () => {
  withData(modify((d) => {
    const ex = d['n5/missions.json'][0].exercises;
    ex.push({ type: 'choice', target: { vocab: ['v_1'] } });
    ex.push({ id: 'n5_m_1_q3' });
    ex.push({ id: 'n5_m_1_q4', target: { vocab: ['n5_v_2'] } });
  }), (r) => {
    const c = codes(r.errors);
    assert.ok(c.includes('question-sans-id'));
    assert.ok(c.includes('question-sans-cible'));
    assert.ok(c.includes('cible-hors-activite'));
  });
});

test('identifiant de question en double', () => {
  withData(modify((d) => { d['n5/lectures.json'][0].questions[0].id = 'n5_m_1_q1'; }), (r) => {
    assert.ok(codes(r.errors).includes('id-duplique'));
  });
});

test('cycle de prérequis et leçon qui s\'exige elle-même', () => {
  withData(modify((d) => {
    d['n5/grammar.json'][0].requires = { grammar: ['g_2'] };
    d['n5/grammar.json'].push({ id: 'g_3', level: 'N5', requires: { grammar: ['g_3'] } });
  }), (r) => {
    const c = codes(r.errors);
    assert.ok(c.includes('cycle'));
    assert.ok(c.includes('prerequis-soi-meme'));
  });
});

test('le requires d\'une leçon ne contient que de la grammaire', () => {
  withData(modify((d) => { d['n5/grammar.json'][1].requires.vocab = ['v_1']; }), (r) => {
    assert.ok(codes(r.errors).includes('cle-inconnue'));
  });
});

test('addendum A1 : pattern est un texte, construction un objet', () => {
  withData(modify((d) => {
    d['n5/grammar.json'][0].pattern = { form: 'verb_te' };
    d['n5/grammar.json'][1].construction = { form: 'verb_te' };
  }), (r) => {
    assert.equal(r.errors.filter((e) => e.code === 'format').length, 2);
  });
});

test('le texte d\'une référence doit apparaître dans la phrase', () => {
  withData(modify((d) => { d['n5/missions.json'][0].dialogue[0].refs[0].text = 'お茶'; }), (r) => {
    assert.ok(codes(r.errors).includes('ref-texte-absent'));
  });
});

test('registre, personnage et lieu inconnus', () => {
  withData(modify((d) => {
    const m = d['n5/missions.json'][0];
    m.dialogue[0].register = 'soutenu';
    m.dialogue[0].speaker = 'caissier';
    m.place = 'gare';
  }), (r) => {
    const c = codes(r.errors);
    assert.ok(c.includes('registre-inconnu'));
    assert.ok(c.includes('personnage-inconnu'));
    assert.ok(c.includes('lieu-inconnu'));
  });
});

test('sounds_textbook exige natural_romaji', () => {
  withData(modify((d) => {
    d['n5/missions.json'][0].dialogue[0].sounds_textbook = [{ japanese: 'a', romaji: 'a', why: 'x', natural: 'b' }];
  }), (r) => {
    assert.ok(r.errors.some((e) => e.code === 'champ-manquant' && e.message.includes('natural_romaji')));
  });
});

test('line_ref qui ne désigne aucune ligne', () => {
  withData(modify((d) => { d['n5/lectures.json'][0].questions[0].line_ref = [3, 0]; }), (r) => {
    assert.ok(codes(r.errors).includes('line-ref-invalide'));
  });
});

// Publication d'A2-04 : le vocabulaire est contrôlé par le validateur lexical, dont validate-data
// fusionne le rapport. Les règles elles-mêmes sont testées dans tests/lexicon/ ; ici, on vérifie
// que ses erreurs et ses avertissements arrivent bien dans le rapport de validate-data.
test('vocabulaire : erreurs du validateur lexical fusionnées (champ manquant, doublon, lecture en romaji)', () => {
  withData(modify((d) => {
    const v = d['n5/vocab.json'];
    v.push(structuredClone(v[0]));
    delete v[0].word;
    v[1].readings[0].kana = 'taberu';
  }), (r) => {
    const c = codes(r.errors);
    assert.ok(c.includes('champ-manquant'));
    assert.ok(c.includes('kana-invalide'), 'une lecture en caractères latins est refusée');
    assert.ok(c.includes('id-duplique'));
  });
});

test('avertissements : teaches trop long, macron, suru ; un group invalide est une erreur', () => {
  withData(modify((d) => {
    const v = d['n5/vocab.json'];
    // Formes distinctes : deux ENTRY de même forme et de même lecture seraient un doublon d'unité.
    for (let i = 3; i <= 11; i++) v.push(entry(`v_${i}`, 'あ'.repeat(i), 'あ'.repeat(i), 'a'.repeat(i), 'あ'.repeat(i)));
    d['n5/missions.json'][0].teaches.vocab = v.map((w) => w.id);
    v[0].readings[0].romaji = 'mizū';
    v[1].linguistic.group = 'suru';
  }), (r) => {
    const c = codes(r.warnings);
    assert.ok(c.includes('teaches-trop-long'));
    assert.ok(c.includes('romaji-macron'));
    assert.ok(c.includes('suru-sans-suru'));
    assert.deepEqual(r.errors, []);
  });
  // L'ancien avertissement « group-inconnu » n'existe plus : `group` est contraint par la classe.
  withData(modify((d) => { d['n5/vocab.json'][0].linguistic.group = 'nom_commun'; }), (r) => {
    assert.ok(codes(r.errors).includes('group-invalide'));
    assert.ok(!codes(r.warnings).includes('group-inconnu'));
  });
});

// Les anciennes catégories libres ont disparu avec l'ancien format, et avec elles les avertissements
// « categorie-isolee » et « categorie-doublon » : une catégorie est un chemin du registre, ou une erreur.
test('catégorie : un chemin absent du registre est une erreur ; plus d\'avertissement de catégorie isolée ou en double', () => {
  withData(modify((d) => {
    const v = d['n5/vocab.json'];
    v[0].senses[0].category = { level_1: 'personnes_famille' };
    v[1].senses[0].category = { level_1: 'famille_personnes' };
  }), (r) => {
    assert.equal(codes(r.errors).filter((c) => c === 'categorie-inconnue').length, 2);
    assert.ok(!codes(r.warnings).some((c) => c === 'categorie-doublon' || c === 'categorie-isolee'));
  });
});

test('les niveaux hors périmètre sont lus mais pas validés', () => {
  withData(modify((d) => {
    d['n4/vocab.json'] = [{ id: 'n4_v_1', reading: 'latin', group: 'noun' }];
    d['n4/grammar.json'] = [{ id: 'n4_g_potential' }];
    d['n5/missions.json'][0].requires.grammar.push('n4_g_potential');
  }), (r) => {
    assert.deepEqual(r.errors, []);
    assert.ok(codes(r.warnings).includes('niveau-superieur'));
  });
});

test('mapping.json et curriculum ne sont pas lus', () => {
  withData(modify((d) => {
    d['mapping.json'] = '{ invalide';
    d['curriculum/n5.json'] = '{ invalide';
  }), (r) => {
    assert.deepEqual(r.errors, []);
  });
});

test("unicité des identifiants entre fichiers (même espace d'identifiants)", () => {
  withData(modify((d) => {
    d['n4/vocab.json'] = [{ id: 'v_1' }];
    d['n4/grammar.json'] = [{ id: 'g_1' }];
  }), (r) => {
    const dups = r.errors.filter((e) => e.code === 'id-duplique-global');
    assert.equal(dups.length, 2);
    assert.ok(dups.some((e) => e.message.includes('n5/vocab.json')));
  });
});

// Depuis la publication d'A2-04, l'identifiant ne dit plus le niveau (addendum A3) : c'est le champ
// `level`, comparé au fichier, qui signale un mot hors JLPT rangé dans le vocabulaire N5.
test('un mot hors JLPT placé dans le vocabulaire N5 est signalé', () => {
  const hj = () => ({ ...entry('v_3', 'あい', 'あい', 'ai', 'あい'), level: 'hors_jlpt' });
  withData(modify((d) => {
    d['vocab-hors-jlpt.json'] = [hj()];
    d['n5/vocab.json'].push(hj());
  }), (r) => {
    const c = codes(r.errors);
    assert.ok(c.includes('id-duplique-global'));
    assert.ok(c.includes('niveau-fichier'));
  });
  // À sa place, dans vocab-hors-jlpt.json : aucune erreur.
  withData(modify((d) => { d['vocab-hors-jlpt.json'] = [hj()]; }), (r) => assert.deepEqual(r.errors, []));
});

// `kanji_list` n'existe plus : les kanji d'un mot se calculent à partir de sa forme (A2).
test('kanji_list n\'est plus un champ ; un kanji de la forme absent des kanji connus est signalé', () => {
  withData(modify((d) => { d['n5/vocab.json'][0].kanji_list = ['水']; }), (r) => {
    assert.ok(codes(r.errors).includes('champ-inconnu'));
  });
  withData(modify((d) => { d['n5/vocab.json'].push(entry('v_3', '風', 'かぜ', 'kaze', R('風', 'かぜ'))); }), (r) => {
    assert.deepEqual(r.errors, []);
    assert.deepEqual(r.warnings.filter((w) => w.code === 'kanji-inconnu').map((w) => w.where), ['n5/vocab.json · v_3']);
  });
});

test('vocab-retired.json : obligatoire ; un identifiant retiré ne peut pas être celui d\'une ENTRY', () => {
  withData(modify((d) => { delete d['vocab-retired.json']; }), (r) => {
    assert.ok(r.errors.some((e) => e.code === 'fichier-absent' && e.where === 'vocab-retired.json'));
  });
  withData(modify((d) => { d['vocab-retired.json'] = [{ id: 'v_1', merged_into: null }]; }), (r) => {
    assert.ok(codes(r.errors).includes('id-retire'));
  });
});

test('lieux : vocab_tags ne désigne que des tags existants de nature lieu (I14)', () => {
  withData(modify((d) => { d['lieux.json'][0].vocab_tags = ['lieu_inconnu']; }), (r) => {
    assert.ok(r.errors.some((e) => e.where.startsWith('lieux.json')), JSON.stringify(codes(r.errors)));
  });
  withData(modify((d) => { delete d['lieux.json'][0].vocab_tags; d['lieux.json'][0].vocab_categories = ['x']; }), (r) => {
    assert.ok(r.errors.some((e) => e.code === 'lieu-format'), 'l\'ancien champ vocab_categories n\'est plus accepté');
  });
});

test('une référence vers une ENTRY absente est refusée par les deux contrôles (2.7 et I19)', () => {
  withData(modify((d) => { d['n5/missions.json'][0].teaches.vocab = ['v_404']; }), (r) => {
    assert.ok(codes(r.errors).includes('ref-inexistante'));
    assert.ok(r.errors.some((e) => e.where.includes('n5/missions.json') && e.message.includes('v_404')));
  });
});

// ── Addendum A4 : identifiants de grammaire indépendants du niveau ──

test('grammaire : identifiant de forme g_<n> (addendum A4, I20)', () => {
  for (const bad of ['n5_g_1', 'g_01', 'g_', 'lesson_1']) {
    withData(modify((d) => { d['n5/grammar.json'].push({ id: bad, level: 'N5' }); }), (r) => {
      assert.ok(r.errors.some((e) => e.code === 'forme-id' && e.where.includes(bad)), bad);
    });
  }
});

test('grammaire : champ level obligatoire, valide et égal au niveau du fichier (I20)', () => {
  for (const level of [undefined, 'n5', 'N6', 5]) {
    withData(modify((d) => { d['n5/grammar.json'][0].level = level; }), (r) => {
      assert.ok(codes(r.errors).includes('niveau-invalide'), String(level));
    });
  }
  withData(modify((d) => { d['n5/grammar.json'][0].level = 'N4'; }), (r) => {
    assert.ok(codes(r.errors).includes('niveau-fichier'));
    assert.ok(!codes(r.errors).includes('niveau-invalide'));
  });
});

// Le niveau d'une leçon vient de son champ `level`, jamais de son identifiant (A4-2) : une
// leçon `g_200` ne dit rien de son niveau, seul son champ indique qu'elle est N4.
test('grammaire d\'un niveau supérieur : comparaison des champs level, pas des identifiants (A4)', () => {
  withData(modify((d) => {
    d['n4/grammar.json'] = [{ id: 'g_200', level: 'N4' }];
    d['n5/missions.json'][0].requires.grammar.push('g_200');
  }), (r) => {
    assert.deepEqual(r.errors, []);
    assert.ok(r.warnings.some((w) => w.code === 'niveau-superieur' && w.message.includes('g_200')));
  });
  // Même leçon, activité déclarée N4 par son propre champ level : rien à signaler.
  withData(modify((d) => {
    d['n4/grammar.json'] = [{ id: 'g_200', level: 'N4' }];
    d['n5/missions.json'][0].level = 'N4';
    d['n5/missions.json'][0].requires.grammar.push('g_200');
  }), (r) => {
    assert.ok(!codes(r.warnings).includes('niveau-superieur'));
  });
  // Leçons N5 exigées par une activité N5 : rien à signaler.
  withData(baseData(), (r) => assert.ok(!codes(r.warnings).includes('niveau-superieur')));
  // Le champ prime sur la place du fichier. Ce n'est observable que dans un niveau hors
  // périmètre, où I20 n'impose pas encore l'égalité : une leçon rangée dans le fichier N4 mais
  // déclarée N5 n'est pas d'un niveau supérieur pour une activité N5.
  withData(modify((d) => {
    d['n4/grammar.json'] = [{ id: 'g_200', level: 'N5' }];
    d['n5/missions.json'][0].requires.grammar.push('g_200');
  }), (r) => assert.ok(!codes(r.warnings).includes('niveau-superieur')));
});

test('préfixe g_ réservé aux leçons de grammaire (A4-4, I18)', () => {
  const cases = [
    (d) => { d['lieux.json'][0].id = 'g_konbini'; d['n5/missions.json'][0].place = 'g_konbini'; },
    (d) => { d['registres.json'].push({ id: 'g_soutenu' }); },
    (d) => { d['n5/missions.json'][0].characters.push({ id: 'g_ken' }); },
    (d) => { d['n5/missions.json'][0].id = 'g_m_1'; },
    (d) => { d['n5/lectures.json'][0].id = 'g_l_1'; },
    (d) => { d['n5/lectures.json'][0].questions[0].id = 'g_q_1'; }
  ];
  for (const [i, change] of cases.entries()) {
    withData(modify(change), (r) => assert.ok(codes(r.errors).includes('prefixe-reserve'), `cas ${i + 1}`));
  }
});

// ── Étape 2 · G1 : kana et kanji par catalogue (décisions du 2026-10-01) ──

test('kana.json : obligatoire et contrôlé', () => {
  withData(modify((d) => { delete d['kana.json']; }), (r) => {
    assert.ok(r.errors.some((e) => e.code === 'fichier-absent' && e.where === 'kana.json'));
  });
  withData(modify((d) => { d['kana.json'].scripts[0].groups[0].rows[0].push({ char: 'あ', romaji: 'a' }); }), (r) => {
    assert.ok(codes(r.errors).includes('id-duplique'));
  });
  withData(modify((d) => { d['kana.json'].scripts[0].groups[0].rows[0].push({ char: 'x', romaji: 'x' }); }), (r) => {
    assert.ok(codes(r.errors).includes('kana-invalide'));
  });
  // Structure canonique, même contrat que le contenu (kanaProblems).
  withData(modify((d) => { d['kana.json'].scripts[1].groups[4].id = 'foobar'; }), (r) => {
    assert.ok(codes(r.errors).includes('groupe-inconnu'));
    assert.ok(codes(r.errors).includes('groupe-manquant'));
  });
  withData(modify((d) => { d['kana.json'].scripts.reverse(); }), (r) => {
    assert.ok(codes(r.errors).includes('ordre-invalide'));
  });
});

test('un kana existe s\'il est au catalogue : yōon accepté, kana absent refusé', () => {
  withData(modify((d) => { d['n5/missions.json'][0].teaches.kana = ['kana_きゃ']; }), (r) => {
    assert.deepEqual(r.errors, []);
  });
  withData(modify((d) => { d['n5/missions.json'][0].teaches.kana = ['kana_い']; }), (r) => {
    assert.ok(r.errors.some((e) => e.code === 'ref-inexistante' && e.message.includes('kana_い')));
  });
});

test('un kanji référencé doit appartenir au catalogue d\'un niveau, pas seulement au dictionnaire', () => {
  withData(modify((d) => { d['n5/missions.json'][0].teaches.kanji = ['水']; }), (r) => {
    assert.deepEqual(r.errors, []);
  });
  withData(modify((d) => { d['n5/missions.json'][0].teaches.kanji = ['食']; }), (r) => {
    assert.ok(r.errors.some((e) => e.code === 'ref-inexistante' && e.message.includes('食')));
  });
  // Le dictionnaire reste valable pour les kanji des mots (avertissement seulement).
  withData(modify((d) => { d['n5/vocab.json'][0].kanji_list = ['食']; }), (r) => {
    assert.ok(!codes(r.warnings).includes('kanji-inconnu'));
  });
});

// ── A2-02 · 3.1 : intégrité des registres de data/registries/ (décision 11) ──

const REG = (name) => `registries/${name}.json`;
const errorsOf = (change) => withData(modify(change), (r) => r.errors);

test('registres : les huit fichiers sont obligatoires', () => {
  for (const name of ['categories', 'semantic-types', 'dimensions', 'relations', 'linguistic-functions',
    'grammatical-classes', 'counters', 'tags']) {
    const errors = errorsOf((d) => { delete d[REG(name)]; });
    assert.ok(errors.some((e) => e.code === 'fichier-absent' && e.where.includes(name)), name);
  }
});

test('registres : racine { source, families }, version du snapshot attendue', () => {
  const cases = [
    [(d) => { d[REG('semantic-types')].source = 'A2-ST-v2'; }, 'registre-source'],
    [(d) => { d[REG('dimensions')].version = 1; }, 'registre-format'],
    [(d) => { d[REG('relations')].families = []; }, 'registre-format'],
    [(d) => { d[REG('linguistic-functions')] = []; }, 'registre-format'],
    [(d) => { d[REG('semantic-types')].families[0].types = []; }, 'registre-format']
  ];
  for (const [change, code] of cases) assert.ok(codes(errorsOf(change)).includes(code), code);
});

test('registres : chaque nœud a exactement ses clés, un identifiant ASCII et un libellé', () => {
  const cases = [
    [(d) => { d[REG('semantic-types')].families[0].types[0].id = 'Personne'; }, 'registre-id'],
    [(d) => { d[REG('semantic-types')].families[0].types[0].id = 'personnalité'; }, 'registre-id'],
    [(d) => { d[REG('dimensions')].families[0].axes[1].poles[0].id = 'certitude_'; }, 'registre-id'],
    [(d) => { d[REG('linguistic-functions')].families[0].functions[0].id = 'g_interrogatif'; }, 'prefixe-reserve'],
    [(d) => { d[REG('relations')].families[0].label = ''; }, 'registre-format'],
    [(d) => { d[REG('semantic-types')].families[0].types[0].description = 'x'; }, 'registre-format'],
    [(d) => { delete d[REG('dimensions')].families[0].axes[0].label; }, 'registre-format']
  ];
  for (const [change, code] of cases) assert.ok(codes(errorsOf(change)).includes(code), code);
});

test('registres : identifiants uniques (familles, types, axes, pôles d\'un axe, relations, fonctions)', () => {
  const cases = [
    (d) => { d[REG('semantic-types')].families.push({ id: 'entity', label: 'X', types: [{ id: 'objet', label: 'O' }] }); },
    (d) => { d[REG('semantic-types')].families.push({ id: 'abstract', label: 'X', types: [{ id: 'lieu', label: 'Lieu' }] }); },
    (d) => { d[REG('dimensions')].families[0].axes.push({ id: 'probabilite', label: 'P', poles: [{ id: 'p', label: 'P' }] }); },
    (d) => { d[REG('dimensions')].families[0].axes[1].poles[1].id = 'certitude'; },
    (d) => { d[REG('relations')].families[0].relations.push({ id: 'opposed_to', label: 'o', symmetric: true, inverse: null }); },
    (d) => { d[REG('linguistic-functions')].families[1].functions.push({ id: 'interrogatif', label: 'i' }); }
  ];
  for (const [i, change] of cases.entries()) assert.ok(codes(errorsOf(change)).includes('id-duplique'), `cas ${i + 1}`);
});

test('dimensions : un axe a au moins un pôle ; un seul pôle est permis (Probabilité)', () => {
  assert.ok(codes(errorsOf((d) => { d[REG('dimensions')].families[0].axes[1].poles = []; })).includes('registre-format'));
  assert.deepEqual(errorsOf(() => {}), []);
});

test('relations : symmetric booléen, inverse existant, réciproque, jamais sur une relation symétrique', () => {
  const rel = (d, i) => d[REG('relations')].families[0].relations[i];
  const cases = [
    [(d) => { rel(d, 2).symmetric = 'oui'; }, 'registre-format'],
    [(d) => { rel(d, 0).inverse = 'whole_of'; }, 'inverse-invalide'],
    [(d) => { rel(d, 1).inverse = 'compared_to'; }, 'inverse-invalide'],
    [(d) => { rel(d, 3).inverse = 'compared_to'; }, 'inverse-invalide'],
    [(d) => { rel(d, 0).symmetric = true; }, 'inverse-invalide']
  ];
  for (const [change, code] of cases) assert.ok(codes(errorsOf(change)).includes(code), JSON.stringify(code));
});

// ── A2-02 · 3.2 : arbre des catégories (identité locale) ──

test('catégories : racine { source, levels }, version A2-L3-v1', () => {
  const cases = [
    [(d) => { d[REG('categories')].source = 'A2-L3-v2'; }, 'registre-source'],
    [(d) => { d[REG('categories')].families = []; }, 'registre-format'],
    [(d) => { d[REG('categories')].levels = []; }, 'registre-format']
  ];
  for (const [change, code] of cases) assert.ok(codes(errorsOf(change)).includes(code), code);
});

test('catégories : clés exactes à chaque niveau ; un niveau 2 sans niveau 3 est valide', () => {
  const cat = (d) => d[REG('categories')].levels;
  const cases = [
    (d) => { delete cat(d)[0].children; },                                     // niveau 1 sans children
    (d) => { delete cat(d)[0].children[2].children; },                         // niveau 2 sans children
    (d) => { cat(d)[0].children[2].children = null; },                         // children non liste
    (d) => { cat(d)[0].children[0].children[0].children = []; },               // niveau 3 avec children
    (d) => { cat(d)[1].children[0].children[0].level = 3; },                   // clé en trop
    (d) => { cat(d)[1].label = ''; }                                           // libellé vide
  ];
  for (const [i, change] of cases.entries()) assert.ok(codes(errorsOf(change)).includes('registre-format'), `cas ${i + 1}`);
  assert.deepEqual(errorsOf(() => {}), [], 'jeu valide, niveau 2 vide compris');
});

test('catégories : identifiants uniques parmi les frères seulement (identité locale)', () => {
  const cat = (d) => d[REG('categories')].levels;
  // Doublons entre frères : refusés, à chaque niveau.
  const cases = [
    (d) => { cat(d).push({ id: 'temps', label: 'Temps bis', children: [] }); },
    (d) => { cat(d)[0].children.push({ id: 'calendrier', label: 'C', children: [] }); },
    (d) => { cat(d)[0].children[1].children.push({ id: 'jours', label: 'J' }); }
  ];
  for (const [i, change] of cases.entries()) assert.ok(codes(errorsOf(change)).includes('id-duplique'), `cas ${i + 1}`);
  // Même identifiant sous des parents différents, ou identique à celui du parent : légal.
  assert.deepEqual(errorsOf((d) => { cat(d)[1].children.push({ id: 'calendrier', label: 'Calendrier', children: [{ id: 'temps', label: 'Temps' }] }); }), []);
});

test('catégories : forme des identifiants et préfixes réservés', () => {
  const cat = (d) => d[REG('categories')].levels;
  assert.ok(codes(errorsOf((d) => { cat(d)[0].children[0].id = 'Unités'; })).includes('registre-id'));
  assert.ok(codes(errorsOf((d) => { cat(d)[0].children[0].children[0].id = 'g_mois'; })).includes('prefixe-reserve'));
});

// ── A2-02 · 3.3 : classes grammaticales et compatibilités de compteur (registres plats) ──

test('registres plats : racine { source, liste }, source A2-02, entrées { id, label } uniques', () => {
  const cases = [
    [(d) => { d[REG('grammatical-classes')].source = 'A2-LING-v1'; }, 'registre-source'],
    [(d) => { d[REG('counters')].source = 'A2-LING-v1'; }, 'registre-source'],
    [(d) => { d[REG('grammatical-classes')].families = []; }, 'registre-format'],
    [(d) => { d[REG('counters')].compatibilities = []; }, 'registre-format'],
    [(d) => { d[REG('grammatical-classes')].classes[0].group = 'nom'; }, 'registre-format'],
    [(d) => { d[REG('counters')].compatibilities[0].label = ''; }, 'registre-format'],
    [(d) => { d[REG('grammatical-classes')].classes.push({ id: 'nom', label: 'Nom bis' }); }, 'id-duplique'],
    [(d) => { d[REG('counters')].compatibilities.push({ id: 'small_animals', label: 'x' }); }, 'id-duplique'],
    [(d) => { d[REG('grammatical-classes')].classes[1].id = 'Verbe'; }, 'registre-id'],
    [(d) => { d[REG('counters')].compatibilities[0].id = 'g_animals'; }, 'prefixe-reserve']
  ];
  for (const [change, code] of cases) assert.ok(codes(errorsOf(change)).includes(code), code);
});

// ── A2-02 · 3.4 : registre des tags ──

test('tags : { id, label, description, kind } exactement, kind parmi les natures permises', () => {
  const tag = (d) => d[REG('tags')].tags[0];
  const cases = [
    [(d) => { d[REG('tags')].source = 'A2-03'; }, 'registre-source'],
    [(d) => { d[REG('tags')].tags = []; }, 'registre-format'],
    [(d) => { delete tag(d).description; }, 'registre-format'],
    [(d) => { tag(d).description = ' '; }, 'registre-format'],
    [(d) => { tag(d).retired = false; }, 'registre-format'],      // aucun champ de cycle de vie
    [(d) => { tag(d).kind = 'theme'; }, 'tag-kind'],
    [(d) => { delete tag(d).kind; }, 'registre-format'],
    [(d) => { d[REG('tags')].tags.push({ ...tag(d) }); }, 'id-duplique'],
    [(d) => { tag(d).id = 'g_konbini'; }, 'prefixe-reserve']
  ];
  for (const [change, code] of cases) assert.ok(codes(errorsOf(change)).includes(code), code);
});

// La nature d'un tag vient de son champ `kind`, jamais de son identifiant (addendum A2, D2) :
// le préfixe « lieu_ » ne sert qu'à la lisibilité.
test('tags : la nature est lue dans kind, jamais déduite du préfixe de l\'identifiant', () => {
  // Préfixe « lieu_ » mais nature inconnue : refusé, le préfixe ne la rend pas valide.
  assert.ok(codes(errorsOf((d) => { d[REG('tags')].tags[0].kind = 'categorie'; })).includes('tag-kind'));
  // Nature « lieu » sans le préfixe : accepté, rien ne l'exige.
  // (Le lieu d'essai suit le tag renommé : vocab_tags doit désigner un tag existant.)
  assert.deepEqual(errorsOf((d) => { d[REG('tags')].tags[0].id = 'pres_de_la_gare'; d['lieux.json'][0].vocab_tags = ['pres_de_la_gare']; }), []);
});

// ── A2-03 · 4.1 : règles transmises par l'audit d'A2-02 ──

test('registres : libellé sans espace au début ni à la fin', () => {
  for (const label of [' Personne', 'Personne ', ' ']) {
    assert.ok(codes(errorsOf((d) => { d[REG('semantic-types')].families[0].types[0].label = label; })).includes('registre-format'), JSON.stringify(label));
  }
  assert.ok(codes(errorsOf((d) => { d[REG('tags')].tags[0].label = 'Utile au konbini '; })).includes('registre-format'));
  assert.ok(codes(errorsOf((d) => { d[REG('categories')].levels[0].children[0].children[0].label = 'Mois\t'; })).includes('registre-format'));
  assert.deepEqual(errorsOf((d) => { d[REG('semantic-types')].families[0].types[0].label = 'Objet / artefact'; }), [], 'espaces internes permis');
});

test('préfixe v_ réservé hors vocabulaire (addendum A3, I18)', () => {
  const cases = [
    (d) => { d['lieux.json'][0].id = 'v_konbini'; d['n5/missions.json'][0].place = 'v_konbini'; },
    (d) => { d['registres.json'].push({ id: 'v_soutenu' }); },
    (d) => { d['n5/missions.json'][0].characters.push({ id: 'v_ken' }); },
    (d) => { d['n5/lectures.json'][0].questions[0].id = 'v_q_1'; },
    (d) => { d[REG('counters')].compatibilities[0].id = 'v_animals'; },
    (d) => { d[REG('categories')].levels[0].children[0].id = 'v_unites'; }
  ];
  for (const [i, change] of cases.entries()) assert.ok(codes(errorsOf(change)).includes('prefixe-reserve'), `cas ${i + 1}`);
});
