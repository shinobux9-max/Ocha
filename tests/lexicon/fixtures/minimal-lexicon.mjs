// Fixture technique du validateur lexical (A2-03).
//
// ILLUSTRATIVE : ces entrées suivent le schéma A2-01 pour tester le validateur. Elles ne sont PAS
// les décisions de reconstruction des vraies entrées (高い…), que seule A2-04 peut prendre.
// Les identifiants de registres sont ceux de data/registries/ (verrouillés par A2-02).

export function minimalLexicon() {
  return {
    files: [
      {
        file: 'n5/vocab.json',
        level: 'N5',
        entries: [
          {
            id: 'v_188',
            level: 'N5',
            word: '高い',
            writings: [],
            readings: [
              { kana: 'たかい', romaji: 'takai', furigana: '<ruby>高<rt>たか</rt></ruby>い', default: true, note: null }
            ],
            linguistic: { grammatical_class: 'adjectif_i', group: 'i', suru_compatible: false, suffix: false, counter: null },
            nuance: null,
            tags: [],
            retired_sense_ids: [],
            senses: [
              {
                id: 'v_188_s1',
                meaning: { primary: 'Haut', alternatives: ['Élevé'] },
                category: { level_1: 'espace_proprietes_spatiales', level_2: 'dimensions', level_3: 'hauteur' },
                semantic_type: 'propriete',
                dimensions: [],
                relations: [],
                linguistic_functions: { grammatical: [], pragmatic_discourse: [] },
                tags: [],
                particles: [],
                nuance: null
              },
              {
                id: 'v_188_s2',
                meaning: { primary: 'Cher', alternatives: ['Coûteux'] },
                category: { level_1: 'economie_commerce', level_2: 'prix_valeur_economique', level_3: 'prix' },
                semantic_type: 'propriete',
                dimensions: [],
                relations: [],
                linguistic_functions: { grammatical: [], pragmatic_discourse: [] },
                tags: ['lieu_konbini'],
                particles: [],
                nuance: null
              }
            ]
          }
        ]
      },
      { file: 'vocab-hors-jlpt.json', level: 'hors_jlpt', entries: [] }
    ],
    retired: [{ id: 'v_717', merged_into: null }],
    knownKanji: ['高']
  };
}
