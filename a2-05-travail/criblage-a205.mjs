// A2-05 · volet 1 · criblage de cohérence (temps 1) et tirage de l'échantillon de contrôle.
// Lecture seule sur le dépôt. Usage : node criblage-a205.mjs <racine du dépôt> <dossier de sortie>
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [root, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const text = (p) => readFileSync(join(root, p), 'utf8');

const SEED = 20261007;
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const journal = read('reconstruction/a2-04/journal.json');
const known = read('reconstruction/a2-04/avertissements-connus.json');
const sources = new Map([...read('reconstruction/a2-04/sources/vocab.json'), ...read('reconstruction/a2-04/sources/vocab-hors-jlpt.json')].map((e) => [e.id, e]));
const lotOf = new Map();
for (const f of readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((x) => x.endsWith('.json')).sort()) {
  const lot = read(`reconstruction/a2-04/lots/${f}`);
  for (const id of Object.keys(lot.entries ?? {})) lotOf.set(id, Number(f.replace(/\D/g, '')));
}

// ---------- modèle : un enregistrement par SENSE ----------
const fnOf = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];
const pathOf = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean) : null);
const norm = (t) => String(t ?? '').toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/[«»"'’.,;:!?…]/g, ' ').replace(/\s+/g, ' ').trim();
const S = [];
for (const e of vocab) {
  const n = e.id.slice(2);
  const srcId = [`n5_v_${n}`, `hj_v_${n}`].find((id) => sources.has(id)) ?? [...sources.values()].find((x) => x.id.startsWith('hj_') && x.word === e.word)?.id;
  const src = sources.get(srcId);
  e.senses.forEach((s, i) => {
    S.push({
      id: s.id, entry: e.id, num: i + 1, word: e.word, reading: e.readings.find((r) => r.default)?.kana ?? '',
      cls: e.linguistic.grammatical_class, primary: s.meaning.primary, alts: s.meaning.alternatives ?? [],
      cat: pathOf(s.category), type: s.semantic_type, dims: s.dimensions, rels: s.relations, fns: fnOf(s),
      tags: [...new Set([...(e.tags ?? []), ...(s.tags ?? [])])], entryTags: e.tags ?? [], senseTags: s.tags ?? [],
      lot: lotOf.get(srcId) ?? -1, srcId, srcGroup: src ? `${src.category} / ${src.subcategory}` : '?', nSenses: e.senses.length
    });
  });
}
const byId = new Map(S.map((s) => [s.id, s]));
const catStr = (s) => (s.cat ? s.cat.join(' › ') : 'null');

// ---------- candidats ----------
const cand = new Map(); // id de sens -> [{ axe, regle, detail }]
const add = (id, axe, regle, detail) => { if (!byId.has(id)) throw new Error(`sens inconnu ${id}`); (cand.get(id) ?? cand.set(id, []).get(id)).push({ axe, regle, detail }); };
const constats = {};
const groupBy = (list, key) => { const m = new Map(); for (const x of list) { const k = key(x); if (k === null || k === undefined) continue; (m.get(k) ?? m.set(k, []).get(k)).push(x); } return m; };
const modal = (list, key) => { const c = new Map(); for (const x of list) c.set(key(x), (c.get(key(x)) ?? 0) + 1); const [k, n] = [...c.entries()].sort((a, b) => b[1] - a[1])[0]; return { k, n, share: n / list.length, tie: [...c.values()].filter((v) => v === n).length > 1 }; };

// Populations imposées par le périmètre.
for (const s of S) {
  if (s.type === 'concept_abstrait') add(s.id, 'C3', 'C3-0', 'concept_abstrait : examen individuel imposé (R2)');
  if (s.cat === null && s.fns.length) add(s.id, 'C2', 'C2-0', `category: null avec fonction (${s.fns.join(', ')})`);
  if (s.type === null && s.fns.length) add(s.id, 'C4', 'C4-0', `semantic_type: null avec fonction (${s.fns.join(', ')})`);
  if (s.dims.length) add(s.id, 'C5', 'C5-0', `dimension posée : ${s.dims.map((d) => `${d.axis}:${d.pole}`).join(', ')}`);
}

// C1-a / C3-b / C7-d : même traduction principale, traitement différent, entre ENTRY différentes.
const byPrimary = groupBy(S, (s) => norm(s.primary) || null);
constats.memeTraduction = [];
for (const [k, g] of byPrimary) {
  if (new Set(g.map((s) => s.entry)).size < 2) continue;
  const cats = new Set(g.map(catStr)), types = new Set(g.map((s) => String(s.type))), fns = new Set(g.map((s) => s.fns.slice().sort().join('+')));
  constats.memeTraduction.push({ traduction: k, sens: g.map((s) => s.id), categories: [...cats], types: [...types], fonctions: [...fns] });
  if (cats.size > 1) for (const s of g) add(s.id, 'C1', 'C1-a', `même traduction principale « ${g[0].primary} », catégories différentes : ${g.map((x) => `${x.id} ${catStr(x)}`).join(' | ')}`);
  if (types.size > 1) for (const s of g) add(s.id, 'C3', 'C3-b', `même traduction principale « ${g[0].primary} », types différents : ${g.map((x) => `${x.id} ${x.type}`).join(' | ')}`);
  if (fns.size > 1) for (const s of g) add(s.id, 'C7', 'C7-d', `même traduction principale « ${g[0].primary} », fonctions différentes : ${g.map((x) => `${x.id} [${x.fns.join(', ')}]`).join(' | ')}`);
}

// C1-b : famille source, niveau 1 minoritaire (groupe d'au moins 5 sens catégorisés, niveau 1 modal à 70 % ou plus).
const bySrc = groupBy(S, (s) => s.srcGroup);
for (const [k, g] of bySrc) {
  const c = g.filter((s) => s.cat);
  if (c.length < 5) continue;
  const m = modal(c, (s) => s.cat[0]);
  if (m.tie || m.share < 0.7) continue;
  for (const s of c) if (s.cat[0] !== m.k) add(s.id, 'C1', 'C1-b', `famille source « ${k} » : niveau 1 modal ${m.k} (${m.n}/${c.length}), ce sens est en ${catStr(s)}`);
}

// C1-g (critère révisé après l'échantillon) : dans une famille source d'au moins 2 sens catégorisés, sens seul à porter son niveau 1.
for (const [k, g] of bySrc) {
  const c = g.filter((s) => s.cat);
  if (k === '?' || c.length < 2) continue;
  for (const s of c) if (!c.some((x) => x !== s && x.cat[0] === s.cat[0])) add(s.id, 'C1', 'C1-g', `famille source « ${k} » (${c.length} sens catégorisés) : seul sens en ${s.cat[0]}`);
}

// C1-h (critère ajouté après l'échantillon de validation) : dans une même famille source, même classe et même type, un sens sans catégorie ni fonction côtoie des sens catégorisés : ces derniers deviennent candidats.
for (const [k, g] of groupBy(S.filter((s) => s.srcGroup !== '?'), (s) => `${s.srcGroup} | ${s.cls} | ${s.type}`)) {
  const nul = g.filter((s) => !s.cat && !s.fns.length), ok = g.filter((s) => s.cat);
  if (!nul.length || !ok.length) continue;
  for (const s of ok) add(s.id, 'C1', 'C1-h', `famille source « ${k} » : catégorisé (${catStr(s)}) alors que ${nul.map((x) => `${x.id} ${x.word} « ${x.primary} »`).join(', ')} est sans catégorie`);
}

// C3-d : même catégorie complète, type minoritaire (groupe d'au moins 5 sens typés, type modal à 70 % ou plus).
const byLeaf = groupBy(S.filter((s) => s.cat), catStr);
for (const [k, g] of byLeaf) {
  const t = g.filter((s) => s.type);
  if (t.length < 5) continue;
  const m = modal(t, (s) => s.type);
  if (m.tie || m.share < 0.7) continue;
  for (const s of t) if (s.type !== m.k) add(s.id, 'C3', 'C3-d', `catégorie « ${k} » : type modal ${m.k} (${m.n}/${t.length}), ce sens est ${s.type}`);
}

// C3-c : couple classe grammaticale × type atypique (3 sens au plus, et moins de 2 % des sens typés de la classe).
const typed = S.filter((s) => s.type);
const byCls = groupBy(typed, (s) => s.cls);
constats.classeType = [];
for (const [cls, g] of byCls) {
  for (const [t, gg] of groupBy(g, (s) => s.type)) {
    constats.classeType.push({ classe: cls, type: t, n: gg.length, total: g.length });
    if (gg.length <= 3 && gg.length / g.length < 0.02) for (const s of gg) add(s.id, 'C3', 'C3-c', `couple atypique : ${cls} × ${t} (${gg.length} sens sur ${g.length} sens typés de la classe)`);
  }
}

// C1-d / C3-e / C6 : relations.
const REL = read('data/registries/relations.json').families.flatMap((f) => f.relations);
const relById = new Map(REL.map((r) => [r.id, r]));
constats.relations = [];
for (const s of S) for (const r of s.rels) {
  const t = byId.get(r.target), def = relById.get(r.type);
  const pb = [];
  if (!def) pb.push('type absent du registre');
  if (!t) pb.push('cible inexistante');
  if (t && t.rels.some((x) => x.target === s.id)) pb.push('lien noté des deux côtés (I12)');
  if (t && r.type.startsWith('transitive') && (s.cls !== 'verbe' || t.cls !== 'verbe')) pb.push('relation transitive entre non-verbes');
  constats.relations.push({ de: s.id, type: r.type, vers: r.target, problemes: pb, memeCategorie: t ? catStr(s) === catStr(t) : null, memeType: t ? s.type === t.type : null });
  if (pb.length) { add(s.id, 'C6', 'C6-a', `relation ${r.type} → ${r.target} : ${pb.join(' ; ')}`); }
  if (t && (s.cat?.[0] ?? null) !== (t.cat?.[0] ?? null)) for (const x of [s, t]) add(x.id, 'C1', 'C1-d', `sens reliés par ${r.type} (${s.id} → ${t.id}), niveaux 1 différents : ${catStr(s)} | ${catStr(t)}`);
  if (t && s.type !== t.type) for (const x of [s, t]) add(x.id, 'C3', 'C3-e', `sens reliés par ${r.type} (${s.id} → ${t.id}), types différents : ${s.type} | ${t.type}`);
}
// C6-b : relation inscrite comme candidate au journal (lots 18 à 24), ENTRY sans aucun lien publié.
constats.relationsCandidates = [];
const sensesOfSource = (srcId) => S.filter((s) => s.srcId === srcId);
for (const d of journal) {
  if (!/relations/.test(d.field) || d.lot === 'lot-26' || !/candidat/i.test(d.reason ?? '')) continue;
  const ss = sensesOfSource(d.entry);
  const linked = ss.some((s) => s.rels.length) || S.some((x) => x.rels.some((r) => ss.some((s) => s.id === r.target)));
  constats.relationsCandidates.push({ decision: d.id, entree: d.entry, mot: ss[0]?.word, lien: linked });
  if (!linked) for (const s of ss) add(s.id, 'C6', 'C6-b', `${d.id} inscrit une relation candidate ; aucun lien publié ne touche cette ENTRY`);
}

// C5-b : sens sans dimension dont une traduction contient un terme de pôle d'A2-DIM.
const POLES = {
  'possibilite_impossibilite': ['possible', 'impossible', 'pouvoir'],
  'necessite_facultativite': ['nécessaire', 'necessaire', 'obligatoire', 'facultatif', 'falloir', 'avoir besoin', 'indispensable'],
  'probabilite': ['probable', 'probablement', 'peut-être', 'sans doute'],
  'certitude_incertitude': ['certain', 'certainement', 'sûr', 'sûrement', 'incertain'],
  'facilite_difficulte': ['facile', 'difficile', 'dur', 'aisé'],
  'simplicite_complexite': ['simple', 'compliqué', 'complexe'],
  'validite_invalidite': ['valide', 'valable', 'invalide'],
  'exactitude_inexactitude': ['exact', 'exactement', 'juste', 'correct', 'inexact', 'erroné', 'se tromper', 'erreur'],
  'precision_imprecision': ['précis', 'précisément', 'vague', 'ambigu', 'environ', 'à peu près'],
  'adequation_inadequation': ['convenable', 'approprié', 'adéquat', 'convenir'],
  'reel_fictif': ['réel', 'fictif', 'imaginaire'],
  'vrai_faux': ['vrai', 'vérité', 'faux', 'mensonge'],
  'evidence_non_evidence': ['évident', 'évidemment', 'bien sûr'],
  'normal_anormal': ['normal', 'anormal', 'étrange', 'bizarre'],
  'habituel_exceptionnel': ['habituel', 'ordinaire', 'exceptionnel', 'spécial', 'd\'habitude'],
  'attendu_inattendu': ['inattendu', 'soudain', 'tout à coup'],
  'importance_insignifiance': ['important', 'précieux', 'insignifiant', 'grave'],
  'utilite_inutilite': ['utile', 'pratique', 'inutile', 'commode'],
  'efficacite_inefficacite': ['efficace', 'inefficace'],
  'avantage_desavantage': ['avantage', 'désavantage', 'inconvénient'],
  'complet_incomplet': ['complet', 'complètement', 'entier', 'incomplet', 'tout à fait'],
  'uniforme_non_uniforme': ['uniforme', 'varié', 'divers'],
  'ordonne_desordonne': ['ordonné', 'rangé', 'désordre', 'en ordre'],
  'fonctionnel_defaillant': ['fonctionner', 'en panne', 'cassé', 'se casser', 'tomber en panne'],
  'actif_inactif': ['actif', 'inactif'],
  'concret_abstrait': ['concret', 'abstrait']
};
const hasWord = (hay, w) => new RegExp(`(^|[^a-zàâäçéèêëîïôöùûüœ])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-zàâäçéèêëîïôöùûüœ])`, 'i').test(hay);
const meaningOf = (s) => [s.primary, ...s.alts].join(' | ').toLowerCase();
for (const s of S) {
  if (s.dims.length) continue;
  const hits = Object.entries(POLES).flatMap(([axis, ws]) => ws.filter((w) => hasWord(meaningOf(s), w)).map((w) => `${axis} (« ${w} »)`));
  if (hits.length) add(s.id, 'C5', 'C5-b', `sans dimension ; traduction contenant un terme de pôle : ${hits.join(', ')}`);
}

// C7 : fonctions.
const DEFINED = new Set(['deictique', 'connecteur', 'discours', 'politesse', 'quantificateur', 'comparatif', 'intensifieur']);
constats.interrogatif = S.filter((s) => s.fns.includes('interrogatif')).map((s) => s.id);
constats.fonctionsNonDefinies = S.filter((s) => s.fns.some((f) => !DEFINED.has(f))).map((s) => ({ id: s.id, fonctions: s.fns.filter((f) => !DEFINED.has(f)) }));
const LEX = {
  deictique: ['ce', 'cet', 'cette', 'ces', 'ceci', 'cela', 'ça', 'celui-ci', 'celui-là', 'ici', 'là', 'là-bas', 'maintenant', 'aujourd\'hui', 'hier', 'demain', 'avant-hier', 'après-demain', 'ce matin', 'ce soir', 'cette année', 'l\'année dernière', 'l\'année prochaine', 'le mois dernier', 'le mois prochain', 'la semaine dernière', 'la semaine prochaine', 'prochain', 'dernier', 'il y a', 'bientôt', 'prochainement', 'tout à l\'heure', 'plus tard', 'récemment', 'je', 'moi', 'tu', 'toi', 'nous', 'vous', 'il', 'elle', 'lui', 'eux'],
  connecteur: ['mais', 'et', 'donc', 'alors', 'puis', 'ensuite', 'cependant', 'pourtant', 'parce que', 'de plus', 'en outre', 'ou', 'ou bien', 'par exemple', 'c\'est pourquoi', 'et puis', 'après cela'],
  quantificateur: ['beaucoup', 'peu', 'un peu', 'tout', 'tous', 'toutes', 'chaque', 'plusieurs', 'quelques', 'assez', 'trop', 'seulement', 'nombreux', 'aucun', 'la plupart', 'la moitié', 'tout le monde', 'ensemble'],
  comparatif: ['plus', 'moins', 'le plus', 'autant', 'davantage', 'même', 'pareil', 'différent'],
  intensifieur: ['très', 'vraiment', 'extrêmement', 'tellement', 'fort', 'bien', 'tout à fait', 'si'],
  politesse: ['s\'il vous plaît', 'merci', 'excusez-moi', 'pardon', 'bienvenue', 'je vous en prie', 'de rien', 'monsieur', 'madame', 'bonjour', 'bonsoir', 'au revoir', 'enchanté', 'désolé'],
  discours: ['oui', 'non', 'eh bien', 'bon', 'tiens', 'allô', 'ah', 'euh', 'voilà', 'd\'accord', 'n\'est-ce pas']
};
const RULE_LOT = { deictique: 10 }; // A7 : lots 0 à 10 décidés avant ; A9 : lots 0 à 22
constats.lexiqueFonctionsHorsFenetre = [];
for (const s of S) {
  const m = meaningOf(s);
  for (const [f, ws] of Object.entries(LEX)) {
    if (s.fns.includes(f)) continue;
    const hit = ws.filter((w) => hasWord(m, w));
    if (!hit.length) continue;
    const limit = RULE_LOT[f] ?? 22;
    if (s.lot <= limit) add(s.id, 'C7', f === 'deictique' ? 'C7-b' : 'C7-c', `sans ${f}, décidé au lot ${s.lot} (avant la définition) ; traduction contenant : ${hit.map((w) => `« ${w} »`).join(', ')}`);
    else constats.lexiqueFonctionsHorsFenetre.push({ id: s.id, fonction: f, lot: s.lot, termes: hit });
  }
  // fonction posée avant sa définition normative
  for (const f of s.fns) {
    if (f === 'deictique' && s.lot <= 10) add(s.id, 'C7', 'C7-e', `deictique posé au lot ${s.lot}, avant l'addendum A7`);
    if (DEFINED.has(f) && f !== 'deictique' && s.lot <= 22) add(s.id, 'C7', 'C7-e', `${f} posé au lot ${s.lot}, avant l'addendum A9`);
  }
}

// C8 : tags.
const tagDec = journal.filter((d) => d.field === 'tags');
constats.tags = [];
for (const s of S) {
  if (!s.tags.length) continue;
  constats.tags.push({ id: s.id, tags: s.tags, lot: s.lot, porteur: s.senseTags.length ? 'SENSE' : 'ENTRY' });
  if (s.lot <= 1) add(s.id, 'C8', 'C8-a', `tag ${s.tags.join(', ')} décidé au lot ${s.lot}, avant la formalisation du critère (révision du lot 02)`);
}
// C8-c (critère ajouté après l'échantillon de validation) : tag porté alors que le journal n'a aucune décision sur le champ tags de l'entrée.
const tagDecided = new Set(tagDec.map((d) => d.entry));
for (const s of S) if (s.tags.length && !tagDecided.has(s.srcId)) add(s.id, 'C8', 'C8-c', `tag ${s.tags.join(', ')} porté sans décision de journal sur le champ tags (lot ${s.lot})`);
// C8-b : dans une même catégorie complète, un candidat de tag hérité gardé pour un sens et écarté pour un autre.
const removed = new Map(); // srcId -> tags écartés
for (const d of tagDec) { const b = Array.isArray(d.before) ? d.before : [], a = Array.isArray(d.after) ? d.after : []; const r = b.filter((t) => !a.includes(t)); if (r.length) removed.set(d.entry, [...(removed.get(d.entry) ?? []), ...r]); }
for (const [leaf, g] of byLeaf) {
  for (const tag of new Set(g.flatMap((s) => s.tags))) {
    const kept = g.filter((s) => s.tags.includes(tag));
    const dropped = g.filter((s) => !s.tags.includes(tag) && (removed.get(s.srcId) ?? []).includes(tag));
    if (kept.length && dropped.length) for (const s of [...kept, ...dropped]) add(s.id, 'C8', 'C8-b', `catégorie « ${leaf} », tag ${tag} : gardé pour ${kept.map((x) => x.id).join(', ')} ; candidat écarté pour ${dropped.map((x) => x.id).join(', ')}`);
  }
}

// C9 : décisions citant A2-GLOBAL ; vérification mécanique des citations de section.
const snap = { 'A2-GLOBAL': text('docs/conception/a2/A2-GLOBAL-v1.md'), 'A2-L3': text('docs/conception/a2/A2-L3-v1.md'), 'A2-ST': text('docs/conception/a2/A2-ST-v1.md'), 'A2-DIM': text('docs/conception/a2/A2-DIM-v1.md'), 'A2-REL': text('docs/conception/a2/A2-REL-v1.1.md'), 'A2-LING': text('docs/conception/a2/A2-LING-v1.md') };
const sectionExists = (doc, sec) => new RegExp(`^#{2,4}\\s+${sec.replace(/\./g, '\\.')}(\\.|\\s)`, 'm').test(snap[doc]);
const g44 = snap['A2-GLOBAL'].split('### 4.4')[1].split('### 4.5')[0].toLowerCase();
const HORS = ['objet / artefact générique', 'personne générique', 'lieu générique', 'action générique', 'propriété générale'];
constats.citations = [];
const senseOfDecision = (d) => { const m = /sens (\d+)/.exec(d.field); const ss = sensesOfSource(d.entry); return m ? ss.find((s) => s.num === Number(m[1])) : ss[0]; };
for (const d of journal) {
  const r = d.reason ?? '';
  for (const m of r.matchAll(/(A2-(?:GLOBAL|L3|ST|DIM|REL|LING))(?:-v[\d.]+)?[ ,]*§ ?(\d+(?:\.\d+)?)/g)) {
    const ok = sectionExists(m[1], m[2]);
    const row = { decision: d.id, document: m[1], section: m[2], sectionExiste: ok };
    if (m[1] === 'A2-GLOBAL' && m[2] === '4.4') {
      row.elementCite = HORS.find((h) => r.toLowerCase().includes(h)) ?? null;
      row.formule = (/«\s*([^»]+?)\s*»[^«]*hors de la hiérarchie/.exec(r) ?? [])[1] ?? null;
      row.elementDansLaListe = row.elementCite ? g44.includes(row.elementCite) : false;
    }
    constats.citations.push(row);
    const s = senseOfDecision(d);
    if (s && (!ok || (m[1] === 'A2-GLOBAL' && m[2] === '4.4' && !row.elementDansLaListe))) add(s.id, 'C9', 'C9-a', `${d.id} cite ${m[1]} §${m[2]} : ${!ok ? 'section introuvable' : 'l\'élément invoqué n\'est pas, tel quel, dans la liste du §4.4'}`);
  }
}

// C10 : justifications datées.
const OBS = [
  [/sans d[ée]finition|aucune d[ée]finition|pas de d[ée]finition|non d[ée]fini|n'a pas de d[ée]finition|sans r[èe]gle A2-LING|d[ée]finition normative/i, 'invoque l\'absence d\'une définition'],
  [/en attente|pour l'instant|provisoire|à reprendre|à revoir|à r[ée]examiner|r[ée]serv[ée]|audit A2-05|à l'audit|passe finale|5\.16/i, 'renvoie à une étape ultérieure']
];
constats.justificationsDatees = [];
for (const d of journal) {
  const r = d.reason ?? '';
  if (!/A2-(GLOBAL|L3|ST|DIM|REL|LING)|\bA[5679]\b|linguistic_functions|category|semantic_type|dimensions|relations|tags/.test(`${r} ${d.field}`)) continue;
  for (const [re, label] of OBS) {
    if (!re.test(r)) continue;
    const s = senseOfDecision(d);
    constats.justificationsDatees.push({ decision: d.id, lot: d.lot, champ: d.field, motif: label, sens: s?.id ?? null });
    if (s) add(s.id, 'C10', 'C10-a', `${d.id} (${d.lot}, ${d.field}) ${label}`);
  }
}

// Points réservés à A2-05 par les lots : candidats d'office.
const RESERVED = [
  ['メートル', null, 'C1', 'catégorie de メートル et du « kilomètre » de キロ (lot 14)'], ['キロ', 2, 'C1', 'catégorie de メートル et du « kilomètre » de キロ (lot 14)'],
  ['低い', null, 'C1', 'extension conservée en nuance (lot 15)'], ['長い', null, 'C1', 'extension conservée en nuance (lot 15)'], ['短い', null, 'C1', 'extension conservée en nuance (lot 15)'], ['大きな', null, 'C1', 'extension conservée en nuance (lot 15)'],
  ['晩ご飯', null, 'C8', 'tag lieu_restaurant du lot 0'], ['昼ご飯', null, 'C8', 'tag lieu_restaurant du lot 0'], ['朝ご飯', null, 'C8', 'tag lieu_restaurant du lot 0'], ['醤油', null, 'C8', 'tag du lot 0'],
  ['おととし', null, 'C7', 'deixis temporelle (réservation d\'A7)'], ['近く', null, 'C7', 'deixis temporelle (réservation d\'A7)'], ['前', null, 'C7', 'deixis temporelle (5.14b)'], ['先', null, 'C7', 'deixis temporelle (5.14b)'],
  ['広い', null, 'C1', 'sous-catégorie absente d’espace › dimensions (lot 15)'], ['狭い', null, 'C1', 'sous-catégorie absente d’espace › dimensions (lot 15)'], ['太い', null, 'C1', 'sous-catégorie absente d’espace › dimensions (lot 15)'], ['細い', null, 'C1', 'sous-catégorie absente d’espace › dimensions (lot 15)'], ['厚い', null, 'C1', 'sous-catégorie absente d’espace › dimensions (lot 15)'], ['薄い', 1, 'C1', 'sous-catégorie absente d’espace › dimensions (lot 15)'],
  ['嫌', null, 'C7', 'emploi d’adresse conservé en nuance, à reprendre si les fonctions sont définies (lot 16)'], ['悪い', null, 'C7', 'emploi d’adresse conservé en nuance, à reprendre si les fonctions sont définies (lot 16)'], ['危ない', null, 'C7', 'emploi d’adresse conservé en nuance, à reprendre si les fonctions sont définies (lot 16)'], ['痛い', null, 'C7', 'exclamation conservée en nuance, à reprendre si les fonctions sont définies (lot 01)'],
  ['また', 2, 'C7', 'fonctions d\'A9 (réservation de l\'addendum)'], ['大変', null, 'C7', 'fonctions d\'A9 (réservation de l\'addendum)']
];
constats.reserves = [];
for (const [word, num, axe, why] of RESERVED) {
  const ss = S.filter((s) => s.word === word && (num === null || s.num === num));
  constats.reserves.push({ mot: word, sens: ss.map((s) => s.id), motif: why });
  if (!ss.length) throw new Error(`point réservé introuvable : ${word}`);
  for (const s of ss) add(s.id, axe, 'RES', `point réservé à A2-05 : ${why}`);
}

// C1-f (critère révisé après l'échantillon) : catégorie complète dont la moitié au moins des sens est déjà candidate sur C1 : les autres sens de la catégorie le deviennent.
for (const [leaf, g] of byLeaf) {
  const isC1 = (s) => (cand.get(s.id) ?? []).some((r) => r.axe === 'C1');
  const n = g.filter(isC1).length;
  if (g.length < 2 || !n || n / g.length < 0.5) continue;
  for (const s of g.filter((x) => !isC1(x))) add(s.id, 'C1', 'C1-f', `catégorie « ${leaf} » : ${n} sens sur ${g.length} déjà candidats sur C1 ; examen de la famille entière`);
}

// ---------- les 147 du volet 2 ----------
const nullWarn = known.filter((w) => w.code !== 'kanji-inconnu').map((w) => ({ code: w.code, id: w.where.split(' · ')[2] }));
const in147 = new Map();
for (const w of nullWarn) (in147.get(w.id) ?? in147.set(w.id, []).get(w.id)).push(w.code);

// ---------- échantillon de contrôle ----------
const extra = process.env.CRIBLAGE_EXTRA ? JSON.parse(readFileSync(process.env.CRIBLAGE_EXTRA, 'utf8')) : [];
for (const x of extra) add(x.id, x.axe, x.regle, x.detail);
const nonCand = S.filter((s) => !cand.has(s.id));
const size = Math.max(50, Math.ceil(nonCand.length * 0.1));
let a = SEED >>> 0;
const rnd = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const shuffle = (list) => { const l = list.slice().sort((x, y) => x.id.localeCompare(y.id)); for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return l; };
const byLot = [...groupBy(nonCand, (s) => s.lot).entries()].sort((x, y) => x[0] - y[0]);
const quota = new Map(byLot.map(([lot, g]) => [lot, (g.length / nonCand.length) * size]));
const alloc = new Map(byLot.map(([lot]) => [lot, Math.max(1, Math.floor(quota.get(lot)))]));
const rest = () => size - [...alloc.values()].reduce((x, y) => x + y, 0);
for (const [lot] of byLot.slice().sort((x, y) => (quota.get(y[0]) % 1) - (quota.get(x[0]) % 1))) { if (rest() <= 0) break; if (alloc.get(lot) < byLot.find((b) => b[0] === lot)[1].length) alloc.set(lot, alloc.get(lot) + 1); }
const sample = [];
const pools = new Map(byLot.map(([lot, g]) => [lot, shuffle(g)]));
const prev = process.env.CRIBLAGE_PREV ? JSON.parse(readFileSync(process.env.CRIBLAGE_PREV, 'utf8')) : [];
const kept = nonCand.filter((s) => prev.includes(s.id));
sample.push(...kept);
for (const [lot] of byLot) { const have = kept.filter((s) => s.lot === lot).length; const need = Math.min(alloc.get(lot), pools.get(lot).length) - have; if (need > 0) sample.push(...pools.get(lot).filter((s) => !sample.includes(s)).slice(0, need)); }
while (sample.length < size) { const pick = shuffle(nonCand.filter((s) => !sample.includes(s)))[0]; if (!pick) break; sample.push(pick); }
const LAYERS = { categorie: (s) => !!s.cat, type: (s) => !!s.type, dimension: (s) => s.dims.length > 0, fonction: (s) => s.fns.length > 0, tag: (s) => s.tags.length > 0, relation: (s) => s.rels.length > 0 };
const complement = [];
const ensure = (label, test) => { if (sample.some(test) || !nonCand.some(test)) return; const pick = shuffle(nonCand.filter((s) => test(s) && !sample.includes(s)))[0]; sample.push(pick); complement.push({ strate: label, id: pick.id }); };
if (process.env.CRIBLAGE_FIGE) { sample.length = 0; sample.push(...kept); }
else for (const cls of [...new Set(nonCand.map((s) => s.cls))].sort()) ensure(`classe ${cls}`, (s) => s.cls === cls);
if (!process.env.CRIBLAGE_FIGE) for (const [l, t] of Object.entries(LAYERS)) ensure(`couche ${l}`, t);

// ---------- sorties ----------
const line = (s) => `${s.id} | ${s.word} | ${s.cls} | ${s.primary} | ${catStr(s)} | ${s.type} | lot ${s.lot}`;
const candList = [...cand.entries()].map(([id, rs]) => ({ ...byId.get(id), regles: rs })).sort((x, y) => Number(x.entry.slice(2)) - Number(y.entry.slice(2)) || x.num - y.num);
const families = [...bySrc.entries()].sort((x, y) => x[0].localeCompare(y[0])).map(([k, g]) => {
  const tally = (key) => Object.entries(g.reduce((c, s) => { const v = key(s); c[v] = (c[v] ?? 0) + 1; return c; }, {})).sort((x, y) => y[1] - x[1]).map(([v, n]) => `${v} ×${n}`).join(' ; ');
  return { famille: k, sens: g.length, categories: tally((s) => (s.cat ? s.cat.slice(0, 2).join(' › ') : 'null')), types: tally((s) => String(s.type)), dans147: g.filter((s) => in147.has(s.id)).map((s) => s.id), candidats: g.filter((s) => cand.has(s.id)).length, membres: g.map((s) => s.id) };
});
const axisCount = {};
for (const c of candList) for (const ax of new Set(c.regles.map((r) => r.axe))) axisCount[ax] = (axisCount[ax] ?? 0) + 1;
const ruleCount = {};
for (const c of candList) for (const rg of new Set(c.regles.map((r) => r.regle))) ruleCount[rg] = (ruleCount[rg] ?? 0) + 1;
const result = {
  graine: SEED, sens: S.length, entrees: vocab.length,
  populations: { C1: S.filter((s) => s.cat).length, C2: S.filter((s) => !s.cat && s.fns.length).length, C3: S.filter((s) => s.type).length, C3_concept_abstrait: S.filter((s) => s.type === 'concept_abstrait').length, C4: S.filter((s) => !s.type && s.fns.length).length, C5: S.filter((s) => s.dims.length).length, C6_liens: constats.relations.length, C6_sens: S.filter((s) => s.rels.length).length, C7: S.filter((s) => s.fns.length).length, C8_entry: vocab.filter((e) => e.tags.length).length, C8_sense: S.filter((s) => s.senseTags.length).length, C9: journal.filter((d) => /A2-GLOBAL/.test(d.reason ?? '')).length, C10: journal.filter((d) => /A2-(GLOBAL|L3|ST|DIM|REL|LING)|\bA[5679]\b/.test(d.reason ?? '')).length },
  candidats: candList.length, parAxe: axisCount, parRegle: ruleCount,
  candidatsDans147: candList.filter((c) => in147.has(c.id)).length, sensDes147: in147.size,
  nonCandidats: nonCand.length, tailleEchantillon: size, tires: sample.length, complement,
  allocationParLot: Object.fromEntries([...alloc.entries()].map(([l, n]) => [l, `${Math.min(n, pools.get(l).length)}/${pools.get(l).length}`])),
  echantillon: sample.map((s) => s.id), repris: kept.map((s) => s.id), nouveaux: sample.filter((s) => !kept.includes(s)).map((s) => s.id), precedentsDevenusCandidats: prev.filter((id) => cand.has(id)), supplementaires: extra.length
};
writeFileSync(join(out, 'resultat.json'), JSON.stringify({ result, constats, candidats: candList.map((c) => ({ id: c.id, mot: c.word, classe: c.cls, sens: c.primary, categorie: catStr(c), type: c.type, lot: c.lot, dans147: in147.get(c.id) ?? [], regles: c.regles })), familles: families }, null, 1));
writeFileSync(join(out, 'echantillon.txt'), sample.map(line).join('\n') + '\n');
console.log(JSON.stringify(result, null, 1));
