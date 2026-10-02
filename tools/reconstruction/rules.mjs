// Ocha v2 — Reconstruction du vocabulaire N5 (A2-04) : règles et listes fermées
//
// Frontière verrouillée le 2026-10-02 : chaque champ canonique est soit MÉCANIQUE (calculé ici,
// de façon déterministe, à partir des sources), soit HUMAIN (décidé entrée par entrée dans un
// fichier de lot validé), soit MÉCANIQUE SAUF EXCEPTION (les entrées des listes ci-dessous, ou
// celles qu'un contrôle mécanique ne sait pas traiter sans ambiguïté, passent en décision humaine).
// Les listes nomment des identifiants ; chacun est ancré à son mot par un test.

// ── Identifiants (addendum A3, L2) ──────────────────────────────────────────

// Mots hors JLPT : numéros attribués par l'addendum A3.
export const HJ_IDS = Object.freeze({ hj_v_1: 'v_718', hj_v_2: 'v_719' });
// v_717 est retiré d'emblée (clé fantôme n5_v_717 de exemples.json).
export const RESERVED_RETIRED = Object.freeze([Object.freeze({ id: 'v_717', merged_into: null })]);

// ── Champs ──────────────────────────────────────────────────────────────────

// Décision humaine, toujours (une ENTRY ne sort qu'avec chacun de ces champs décidés).
export const HUMAN_FIELDS = Object.freeze(['writings', 'suru_compatible', 'suffix', 'counter', 'nuance', 'tags', 'senses']);
// Mécaniques sauf exception : décidés seulement pour une entrée en exception sur ce champ.
export const EXCEPTION_FIELDS = Object.freeze(['word', 'readings', 'grammatical_class', 'group']);

// ── Classe grammaticale ─────────────────────────────────────────────────────

// Les 17 anciens `type` → classe par défaut ; null = toujours une décision humaine.
export const TYPE_CLASS = Object.freeze({
  'nom': 'nom',
  'verbe': 'verbe', 'verbe godan': 'verbe', 'verbe ichidan': 'verbe', 'verbe irrégulier': 'verbe', 'verbe suru': 'verbe',
  'adjectif en i': 'adjectif_i', 'adjectif i': 'adjectif_i', 'adjectif_i': 'adjectif_i',
  'adjectif en na': 'adjectif_na', 'Adjectif en na': 'adjectif_na',
  'adverbe': 'adverbe', 'pronom': 'pronom', 'interjection': 'interjection', 'conjonction': 'conjonction',
  'adjectif': null, 'adverbe / pronom': null
});

// Les 15 nombres simples : classe `numeral` par liste explicite, jamais par détection.
export const NUMERAL_IDS = Object.freeze({
  n5_v_365: 'ゼロ', n5_v_367: '一', n5_v_369: '七', n5_v_371: '万', n5_v_372: '三', n5_v_374: '九', n5_v_376: '二',
  n5_v_378: '五', n5_v_380: '八', n5_v_382: '六', n5_v_384: '十', n5_v_385: '千', n5_v_386: '四', n5_v_388: '百', n5_v_389: '零'
});

// Classes à décider entrée par entrée (ETAT-ACTUEL.md, points ouverts), en plus des types sans
// classe par défaut : conjonctions et interjections mal rangées, déterminant, noms rangés en
// adverbes, formes particulières, composés numéraux.
export const CLASS_EXCEPTION_IDS = Object.freeze({
  n5_v_179: 'いくら', n5_v_347: '先', n5_v_391: 'いつ', n5_v_413: 'じゃあ', n5_v_416: 'それから', n5_v_417: 'それでは',
  n5_v_438: '同じ', n5_v_441: '大きな', n5_v_450: '弱く', n5_v_517: '一番', n5_v_520: 'たくさん', n5_v_584: 'いいえ',
  n5_v_586: 'ええ', n5_v_593: 'しかし', n5_v_595: 'じゃ', n5_v_596: 'そうして', n5_v_599: 'でも', n5_v_600: 'どうぞ',
  n5_v_602: 'など', n5_v_628: '一緒', n5_v_639: '全部',
  // Arbitrage du lot 0 : 大変 est un adjectif en な, son emploi intensifieur relève du sens.
  n5_v_495: '大変',
  n5_v_288: '一日', n5_v_291: '一月', n5_v_292: '七日', n5_v_293: '三日', n5_v_294: '九日', n5_v_295: '二十日',
  n5_v_296: '二日', n5_v_297: '五日', n5_v_307: '八日', n5_v_308: '六日', n5_v_309: '十日', n5_v_313: '四日',
  n5_v_368: '一つ', n5_v_370: '七つ', n5_v_373: '三つ', n5_v_375: '九つ', n5_v_377: '二つ', n5_v_379: '五つ',
  n5_v_381: '八つ', n5_v_383: '六つ', n5_v_387: '四つ', n5_v_627: '一人', n5_v_631: '二人', n5_v_632: '二十歳'
});

// ── Forme usuelle ───────────────────────────────────────────────────────────

// Graphie fautive connue ; toute forme contenant « / » est aussi une exception.
export const WORD_EXCEPTION_IDS = Object.freeze({ n5_v_668: '明い' });

// ── Groupe morphologique ────────────────────────────────────────────────────

// Valeurs de `group` compatibles avec chaque classe (schema-A2-01.md, §6). Une classe sans
// valeur compatible donne `group: null`. Une décision humaine ne peut choisir qu'une valeur
// compatible avec la classe décidée.
export const CLASS_GROUPS = Object.freeze({
  verbe: Object.freeze(['ru', 'u', 'irrégulier', 'suru']),
  adjectif_i: Object.freeze(['i']),
  adjectif_na: Object.freeze(['na']),
  nom: Object.freeze(['nom']),
  numeral: Object.freeze([]), pronom: Object.freeze([]), adverbe: Object.freeze([]), determinant: Object.freeze([]),
  conjonction: Object.freeze([]), interjection: Object.freeze([])
});

// Tags de lieu : la correspondance lieu → tag est une DONNÉE décidée (registre-des-tags.md, §5),
// lue dans reconstruction/a2-04/place-tags.json, jamais déduite d'une convention de nom.

// ── Lot 0 · identité ────────────────────────────────────────────────────────

// Doublons candidats (ETAT-ACTUEL.md) : à examiner un par un, ce ne sont PAS des fusions
// décidées. Avec les formes et lectures contenant « / », ils forment le lot 0, avant tout lot
// thématique.
export const IDENTITY_GROUPS = Object.freeze([
  ['n5_v_17', 'n5_v_591'], ['n5_v_18', 'n5_v_592'], ['n5_v_19', 'n5_v_590'], ['n5_v_474', 'n5_v_587'],
  ['n5_v_10', 'n5_v_588'], ['n5_v_510', 'n5_v_514'], ['n5_v_559', 'n5_v_582'], ['n5_v_564', 'n5_v_601'],
  ['n5_v_594', 'n5_v_706'], ['n5_v_44', 'n5_v_45'], ['n5_v_64', 'n5_v_227'], ['n5_v_87', 'n5_v_107'],
  ['n5_v_91', 'n5_v_106'], ['n5_v_92', 'n5_v_105'], ['n5_v_226', 'n5_v_238'], ['n5_v_228', 'n5_v_235'],
  ['n5_v_263', 'n5_v_276'], ['n5_v_285', 'n5_v_289'], ['n5_v_423', 'n5_v_437'], ['n5_v_68', 'n5_v_549'],
  ['n5_v_424', 'n5_v_472'], ['n5_v_420', 'n5_v_583'], ['n5_v_459', 'n5_v_460'], ['n5_v_555', 'n5_v_672'],
  ['n5_v_455', 'n5_v_668'], ['n5_v_495', 'n5_v_508'], ['n5_v_363', 'n5_v_610']
].map((g) => Object.freeze(g)));
