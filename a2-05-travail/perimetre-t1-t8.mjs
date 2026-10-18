// A2-05 · volet 1 · lot 1 : liste fermée des 19 SENSE des points transversaux T1 à T8, et contrôles de périmètre.
// Lecture seule sur les données. Aucun audit : ne lit aucune fiche source.
// Usage : node perimetre-t1-t8.mjs <racine du dépôt>   (réécrit la section 7 du bilan ; relançable)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const known = read('reconstruction/a2-04/avertissements-connus.json');
const crib = read('a2-05-travail/criblage/resultat.json');
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).map((f) => read(`reconstruction/a2-04/lots/${f}`));
const audit = readFileSync(join(root, 'docs/rapports/etape2-A2-05-audit-null.md'), 'utf8');
const BILAN = join(root, 'docs/rapports/etape2-A2-05-bilan-volet2.md');

const LISTE = [
  ['T1', 'v_455_s2', 'la catégorie `etre_humain › psychologie_esprit › etats_psychologiques` décrit-elle ce sens ?'],
  ['T1', 'v_4_s2', 'même question'],
  ['T1', 'v_1_s2', 'même question'],
  ['T2', 'v_221_s1', 'la catégorie `entretien_domestique › nettoyage` décrit-elle une fiche qui nomme plusieurs domaines ?'],
  ['T3', 'v_628_s1', 'la catégorie `relations_sociales › interactions_sociales` décrit-elle ce sens ?'],
  ['T4', 'v_663_s3', 'la catégorie `totalite_partie › reste` tient-elle pour un sens attesté par une seule traduction ?'],
  ['T5', 'v_642_s2', 'provenance de la particule et des nuances publiées'],
  ['T5', 'v_642_s3', 'provenance de la particule et de la nuance publiées'],
  ['T5', 'v_266_s2', 'provenance de la nuance publiée'],
  ['T6', 'v_425_s1', 'le type publié décrit-il ce sens ? (examen individuel)'],
  ['T6', 'v_504_s1', 'le type publié décrit-il ce sens ? (examen individuel)'],
  ['T6', 'v_504_s2', 'le type publié décrit-il ce sens ? (examen individuel)'],
  ['T6', 'v_506_s2', 'le type publié décrit-il ce sens ? (examen individuel)'],
  ['T7', 'v_461_s2', 'fidélité de la traduction principale'],
  ['T7', 'v_539_s2', 'fidélité de la traduction principale'],
  ['T7', 'v_608_s2', 'fidélité de la traduction principale'],
  ['T7', 'v_265_s2', 'fidélité de la traduction principale'],
  ['T7', 'v_664_s2', 'fidélité de la traduction principale'],
  ['T8', 'v_510_s1', 'l\'axe réel / fictif décrit-il aussi directement le sens ?']
];
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const ids = LISTE.map((x) => x[1]);
if (ids.length !== 19 || new Set(ids).size !== 19) throw new Error('19 identifiants distincts attendus');
// fiches du volet 2, avec leur tranche
const fiches = new Map();
let tranche = 0;
for (const ligne of audit.split('\n')) {
  const t = ligne.match(/^# Tranche (\d+) ·/); if (t) tranche = Number(t[1]);
  const f = ligne.match(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/);
  if (f) fiches.set(f[1], [...(fiches.get(f[1]) ?? []), { tranche, v: f[2] }]);
}
const cById = new Map(crib.candidats.map((c) => [c.id, [...new Set(c.regles.map((r) => r.regle))].join(', ')]));
const rows = LISTE.map(([t, id, q]) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  if (!e) throw new Error(`sens non publié : ${id}`);
  const s = e.senses.find((x) => x.id === id);
  const lot = lots.find((l) => l.entries[`n5_v_${e.id.slice(2)}`]);
  const st = lot.entries[`n5_v_${e.id.slice(2)}`].status;
  if (st !== 'validated') throw new Error(`ENTRY non validée : ${id}`);
  const av = known.filter((w) => w.where.endsWith(` ${id}`)).map((w) => w.code);
  const fs = fiches.get(id) ?? [];
  if (av.length !== fs.length) throw new Error(`fiches et avertissements ne concordent pas : ${id}`);
  if (fs.some((f) => f.v !== 'L')) throw new Error(`verdict non L dans le périmètre : ${id}`);
  return { t, id, q, e, s, lot: lot.lot.replace('lot-', ''), av, fs, crib: cById.get(id) ?? '—' };
});
const jamais = rows.filter((r) => !r.fs.length);
const deja = rows.filter((r) => r.fs.length);
const entrees = new Set(rows.map((r) => r.e.id));
if (jamais.length !== 7 || deja.length !== 12 || entrees.size !== 17) throw new Error(`7, 12 et 17 attendus : ${jamais.length}, ${deja.length}, ${entrees.size}`);
const MODS = ['v_500_s2', 'v_65_s2', 'v_696_s1', 'v_606_s1', 'v_687_s1', 'v_528_s1', 'v_671_s1', 'v_287_s1', 'v_500_s1', 'v_503_s1'];
const croise = ids.filter((id) => MODS.includes(id));
if (croise.length) throw new Error(`sens déjà visés par une modification retenue : ${croise}`);
const entreesMods = new Set(MODS.map((id) => id.replace(/_s\d+$/, '')));
const entreesCommunes = [...entrees].filter((x) => entreesMods.has(x));

let md = readFileSync(BILAN, 'utf8');
const MARK = '\n## 7. Vérification documentaire du périmètre T1 à T8';
if (md.includes(MARK)) md = md.slice(0, md.indexOf(MARK));
md = md.replace(/\n+$/, '\n');
const P = (t = '') => { md += `${t}\n`; };
P();
P('## 7. Vérification documentaire du périmètre T1 à T8 (2026-10-08)');
P();
P('**Demandée par le relecteur avant la confirmation finale du périmètre. Aucun arbitrage lexical n\'est commencé ; aucune fiche source n\'a été lue pour établir cette section**, qui est calculée par `a2-05-travail/perimetre-t1-t8.mjs` sur les lots, les données publiées, l\'inventaire, le criblage et le rapport d\'audit. Le script s\'arrête au premier écart.');
P();
P('### 7.1 Liste fermée des 19 SENSE');
P();
P('| # | Point | SENSE | Mot | Sens publié | Lot | Catégorie publiée | Type publié | Criblage (volet 1) | État d\'audit antérieur |');
P('|---|---|---|---|---|---|---|---|---|---|');
rows.forEach((r, i) => P(`| ${i + 1} | ${r.t} | \`${r.id}\` | ${r.e.word} | ${r.s.meaning.primary} | ${r.lot} | \`${cat(r.s.category)}\` | \`${r.s.semantic_type}\` | ${r.crib} | ${r.fs.length ? r.fs.map((f, k) => `volet 2, tranche ${f.tranche}, \`${r.av[k] ?? r.av[0]}\` : **${f.v}**`).join(' ; ') : '**jamais audité**'} |`));
P();
P('### 7.2 Unicité et répartition');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Identifiants de SENSE | ${ids.length}, tous distincts, tous publiés, dans des ENTRY \`validated\` |`);
P(`| ENTRY | ${entrees.size} (出る et ゆっくり ont deux sens dans le périmètre) |`);
P(`| **Sens jamais audités** | **${jamais.length}** : ${jamais.map((r) => `\`${r.id}\` ${r.e.word}`).join(' ; ')} |`);
P(`| **Sens déjà examinés au volet 2** | **${deja.length}** : ${deja.map((r) => `\`${r.id}\` ${r.e.word}`).join(' ; ')} |`);
P(`| Verdicts antérieurs de ces ${deja.length} sens | tous L ; aucun n\'est rouvert |`);
P(`| Sens du périmètre déjà visés par l\'une des dix modifications retenues | ${croise.length} |`);
P(`| ENTRY du périmètre portant par ailleurs une modification retenue sur un autre sens | ${entreesCommunes.length}${entreesCommunes.length ? ` (${entreesCommunes.join(', ')})` : ''} |`);
P(`| Lots d\'origine | ${[...new Set(rows.map((r) => r.lot))].sort().join(', ')} |`);
P(`| Par point | ${['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'].map((t) => `${t} : ${rows.filter((r) => r.t === t).length}`).join(' ; ')} |`);
P();
P('### 7.3 La question posée à chaque sens, et rien d\'autre');
P();
P('| Point | SENSE | Question |');
P('|---|---|---|');
for (const r of rows) P(`| ${r.t} | \`${r.id}\` ${r.e.word} | ${r.q} |`);
P();
P('### 7.4 Limites confirmées par le relecteur');
P();
P('- **T5 · provenance** : seul un **criblage factuel et exhaustif** est autorisé, sur tout le corpus publié : particules d\'un sens absentes de sa fiche source ; exemples japonais d\'une nuance absents de la fiche et des anciens exemples. Il constate et compte. **Tout cas supplémentaire qu\'il relèverait reste hors du périmètre des 19** : il est listé, sans examen ni verdict, pour un périmètre ultérieur. Pour les trois sens de T5, l\'examen consiste à rechercher si une décision explicite autorisait ces éléments.');
P('- **T6 · type** : chacun des quatre sens est contrôlé **individuellement**, contre les définitions d\'A2-ST. **Aucun type commun n\'est imposé** aux adverbes de manière : deux sens peuvent garder des types différents si leurs fiches le justifient.');
P('- **T7 · traductions** : l\'examen se limite à la **fidélité de la traduction principale** au sens que la fiche décrit. **Les verdicts `categorie-nulle` de ces cinq sens ne sont pas rouverts**, non plus que le découpage en sens.');
P('- **Pour les douze sens déjà examinés** : la question porte sur un autre champ que celui de leur avertissement (particule, nuance, type, traduction, dimension). Leur verdict L du volet 2 reste acquis.');
P('- **Pour les sept sens jamais audités** : la question est celle du tableau 7.3, sur le champ nommé ; les autres champs ne sont pas dans ce lot.');
P('- **Aucune correction** : un écart constaté nommerait une modification proposée, à joindre à la liste globale de la phase B ; les dix modifications du volet 2 restent différées.');
P();
P('### 7.5 Références nécessaires à l\'audit, une fois le périmètre confirmé');
P();
P('- **Normes** : A2-L3-v1 (§2, §5 à §7) pour T1 à T4 ; A2-ST-v1 (§3 à §5) pour T6 ; A2-DIM-v1 (§2, §3) pour T8 ; A3 et le schéma A2-01 pour les particules et les nuances (T5) ; la doctrine « la fiche source décide » (`CLAUDE.md`, §4) pour T5 et T7 ; A2-GLOBAL-v1 (§10, §11).');
P('- **Comparables arbitrés au volet 2**, à citer sans les rouvrir : 冷たい, まっすぐ, 甘い, 清い (T1) ; 磨く (T2) ; 一人 sens 2 (T3) ; 他 (T4) ; だんだん, ゆっくり sens 2, よく sens 2 (T6, leurs fiches de `null`).');
P('- **Décisions à relire pour T5** : D0335, D0337 à D0339 (出る, lot 04) ; D0471 à D0473 (吹く, lot 07) ; les rapports des lots 04 et 07.');
writeFileSync(BILAN, md);
console.log(`section 7 écrite : 19 sens, ${entrees.size} ENTRY, jamais audités ${jamais.length}, déjà examinés ${deja.length}, lots ${[...new Set(rows.map((r) => r.lot))].sort().join(',')}, ENTRY communes avec les modifications ${entreesCommunes.length}`);
