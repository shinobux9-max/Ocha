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

function baseData() {
  const word = (id, w, extra = {}) => ({
    id, level: 'N5', word: w, reading: 'よみ', romaji: 'yomi',
    meanings: { primary: 'sens' }, type: 'nom', group: 'nom', category: 'nourriture', kanji_list: [], ...extra
  });
  return {
    'n5/vocab.json': [word('n5_v_1', '水'), word('n5_v_2', '食べる', { group: 'ru', type: 'verbe' })],
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
    'lieux.json': [{ id: 'konbini', vocab_categories: ['nourriture'] }],
    'onboarding.json': [],
    'n5/missions.json': [{
      id: 'n5_m_1', place: 'konbini',
      requires: { grammar: ['g_1'] },
      teaches: { vocab: ['n5_v_1'], expression: ['ex_1'] },
      characters: [{ id: 'moi' }],
      dialogue: [{
        speaker: 'moi', japanese: `${R('水', 'みず')}です。`, romaji: 'mizu desu.', french: "C'est de l'eau.",
        register: 'poli', refs: [{ text: '水', vocab: 'n5_v_1' }], grammar: ['g_1']
      }],
      exercises: [{ id: 'n5_m_1_q1', type: 'choice', target: { vocab: ['n5_v_1'] }, choices: ['a', 'b'], answer: 0 }]
    }],
    'n5/lectures.json': [{
      id: 'n5_l_1', type: 'histoire', place: null,
      requires: { grammar: ['g_1'] }, teaches: { vocab: ['n5_v_1'] },
      blocks: [{ kind: 'paragraph', lines: [{ japanese: 'みずです。', romaji: 'mizu desu.', french: 'Eau.', register: 'poli' }] }],
      questions: [{ id: 'n5_l_1_q1', target: { vocab: ['n5_v_1'] }, choices: ['a', 'b'], answer: 1, line_ref: [0, 0] }]
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
    ex.push({ type: 'choice', target: { vocab: ['n5_v_1'] } });
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
  withData(modify((d) => { d['n5/grammar.json'][1].requires.vocab = ['n5_v_1']; }), (r) => {
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

test('vocabulaire : champ manquant, doublon, lecture en romaji', () => {
  withData(modify((d) => {
    const v = d['n5/vocab.json'];
    delete v[0].type;
    v[1].reading = 'taberu';
    v.push({ ...v[0], type: 'nom' });
  }), (r) => {
    const c = codes(r.errors);
    assert.ok(c.includes('champ-manquant'));
    assert.ok(c.includes('lecture-romaji'));
    assert.ok(c.includes('id-duplique'));
  });
});

test('avertissements : teaches trop long, macron, group inconnu, suru', () => {
  withData(modify((d) => {
    const v = d['n5/vocab.json'];
    for (let i = 3; i <= 11; i++) v.push({ ...v[0], id: `n5_v_${i}` });
    d['n5/missions.json'][0].teaches.vocab = v.map((w) => w.id);
    v[0].romaji = 'mizū';
    v[0].group = 'nom_commun';
    v[1].group = 'suru';
  }), (r) => {
    const c = codes(r.warnings);
    assert.ok(c.includes('teaches-trop-long'));
    assert.ok(c.includes('romaji-macron'));
    assert.ok(c.includes('group-inconnu'));
    assert.ok(c.includes('suru-sans-suru'));
    assert.deepEqual(r.errors, []);
  });
});

test('catégories isolées ou en double', () => {
  withData(modify((d) => {
    const v = d['n5/vocab.json'];
    v[0].category = 'personnes_famille';
    v[1].category = 'famille_personnes';
  }), (r) => {
    const c = codes(r.warnings);
    assert.ok(c.includes('categorie-doublon'));
    assert.ok(c.includes('categorie-isolee'));
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
    d['n4/vocab.json'] = [{ id: 'n5_v_1' }];
    d['n4/grammar.json'] = [{ id: 'g_1' }];
  }), (r) => {
    const dups = r.errors.filter((e) => e.code === 'id-duplique-global');
    assert.equal(dups.length, 2);
    assert.ok(dups.some((e) => e.message.includes('n5/vocab.json')));
  });
});

test('un mot hors JLPT placé dans le vocabulaire N5 est signalé', () => {
  withData(modify((d) => {
    d['vocab-hors-jlpt.json'] = [{ ...d['n5/vocab.json'][0], id: 'hj_v_1' }];
    d['n5/vocab.json'].push({ ...d['n5/vocab.json'][0], id: 'hj_v_1' });
  }), (r) => {
    const c = codes(r.errors);
    assert.ok(c.includes('id-duplique-global'));
    assert.ok(c.includes('prefixe-id'));
  });
});

test('kanji_list : une entrée = exactement un kanji', () => {
  withData(modify((d) => { d['n5/vocab.json'][0].kanji_list = ['風呂']; }), (r) => {
    assert.ok(codes(r.errors).includes('kanji-list-format'));
    assert.ok(!codes(r.warnings).includes('kanji-inconnu'));
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

test('registres : les sept fichiers sont obligatoires', () => {
  for (const name of ['categories', 'semantic-types', 'dimensions', 'relations', 'linguistic-functions',
    'grammatical-classes', 'counters']) {
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
