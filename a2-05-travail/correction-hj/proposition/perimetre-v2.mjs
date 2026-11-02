// A2-05 · volet 1 · lot 3 : périmètres opérationnels générés et contrôlés (outillage v2, en proposition, non adopté). Lecture seule.
// Produit le périmètre d'une tranche (une ou plusieurs livraisons du découpage arbitré) : sens, règles du criblage, comparables,
// décisions antérieures, corrections retenues (provenance, volet 1, modifications du volet 2), et des risques détectés automatiquement.
// N'ouvre aucune fiche source, ne juge aucun sens. Refuse d'écrire sur un rapport arbitré (manifeste). L'acceptation du périmètre reste
// explicite, avant tout audit (arbitrage du 2026-10-18).
import { readFileSync, writeFileSync } from 'node:fs';
import { join, isAbsolute } from 'node:path';
import { couverture } from './couverture-lot3.mjs';
import { verifierEmpreintes, MANIFESTE } from './empreintes-lot3.mjs';
import { correspondance, cat, LF, identifiantsCites } from './lot3-commun-v2.mjs';

const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const fonctionsDe = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const HP = ['ひらがな', '漢字', '右', '左'];

// cfg : { root, nom, livraisons[], date, autorisation, arbitrage, sortie, nonreg, risquesManuels: [texte] }
export function produirePerimetre(cfg) {
  const { root, nom, livraisons: livs } = cfg;
  const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, LF);
  const read = (p) => JSON.parse(txt(p));
  const cov = couverture(root); const emp = verifierEmpreintes(root);
  const sortie = cfg.sortie ?? R + nom + '-perimetre.md';
  if (Object.hasOwn(JSON.parse(txt(MANIFESTE)).empreintes, sortie)) throw new Error(sortie + ' : périmètre arbitré, protégé par le manifeste');
  const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
  const tous = new Map(vocab.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
  const { canon, journal } = correspondance(root);
  const candidats = new Map(read('a2-05-travail/criblage/resultat.json').candidats.map((c) => [c.id, c]));
  const perimetre = txt(R + 'perimetre.md');
  const bilanV2 = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
  // Comme le script v1 : 147 fiches d'audit (certains sens y ont deux fiches, d'où moins d'identifiants distincts)
  const fiches147 = [...txt('docs/rapports/etape2-A2-05-audit-null.md').matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` /gm)].map((m) => m[1]);
  if (fiches147.length !== 147) throw new Error('les 147 : ' + fiches147.length + ' fiches lues');
  const les147 = new Set(fiches147);
  const regleDef = new Map([...perimetre.matchAll(/^\| (C\d+-[a-z0]) \| ([^|]+) \| \d+ \|$/gm)].map((m) => [m[1], m[2].trim()]));
  const livraisonDe = new Map(cov.sens.map((s) => [s.id, s.livraison])); const etatDe = new Map(cov.sens.map((s) => [s.id, s.etat]));
  const ids = cov.sens.filter((s) => livs.includes(s.livraison)).map((s) => s.id);
  if (!ids.length) throw new Error(nom + ' : aucune ligne du découpage pour ' + livs.join(', '));
  if (!cfg.nonreg) for (const id of ids) if (etatDe.get(id) !== 'restant') throw new Error(id + ' : ' + etatDe.get(id) + ', hors des sens restants');
  const etat = (id) => { const l = livraisonDe.get(id); if (l) return livs.includes(l) ? '**' + nom + '**' : l + (etatDe.get(id) === 'arbitré' ? ' (arbitrée)' : etatDe.get(id) === 'proposé' ? ' (proposée)' : ' (non arbitrée)'); return les147.has(id) ? 'volet 2 (147, arbitré)' : 'hors des 377 et des 147'; };
  const tient = (l, eid) => l.includes('`' + eid + '`') || l.includes('`' + eid + '_');
  const bilanCorr = bilanV2.replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
  const correctionsDe = (eid, sid) => bilanCorr.split(LF).filter((l) => /^\| V[12]-\d+ \|/.test(l) && identifiantsCites(eid, sid).some((x) => tient(l, x))).map((l) => l.split('|')[1].trim());
  const modifsV2 = new Map(bilanV2.slice(0, bilanV2.search(/^## 7\. /m)).split(LF).map((l) => l.match(/^\| (\d+) \| `((?:hj_)?v_\d+_s\d+)` \|/)).filter(Boolean).map((m) => [m[2], m[1]]));

  const fiches = ids.map((id) => { const t = tous.get(id); const c = candidats.get(id); const sid = t ? canon.get(t.e.id) : undefined; if (!t || !c || !sid || les147.has(id)) throw new Error(id + ' : hors des données, du criblage, de la correspondance, ou dans les 147'); return { id, ...t, c, sid, livraison: livraisonDe.get(id), dec: journal.filter((d) => d.entry === sid) }; });
  for (const f of fiches) if (f.dec.some((d) => d.status !== 'validated')) throw new Error(f.id + ' : décision non validée');
  const entrees = [...new Map(fiches.map((f) => [f.e.id, f])).values()];
  const regles = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.regle)))].sort();
  for (const g of regles) if (!regleDef.has(g)) throw new Error('règle ' + g + ' : définition introuvable');
  const axes = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.axe)))].sort();
  const cites = new Map(); for (const f of fiches) for (const g of f.c.regles) for (const m of g.detail.matchAll(/(?:hj_)?v_\d+_s\d+/g)) if (m[0] !== f.id && tous.has(m[0])) { if (!cites.has(m[0])) cites.set(m[0], new Set()); cites.get(m[0]).add(f.e.word); }
  const cle = (s) => s.category.level_1 + ' › ' + s.category.level_2;
  const cles = [...new Set(fiches.filter((f) => f.s.category).map((f) => cle(f.s)))];
  const memes = [...tous.values()].filter(({ s }) => s.category && cles.includes(cle(s)));
  const autresLiv = [...new Set([...memes.map(({ s }) => s.id), ...cites.keys()])].filter((id) => livraisonDe.has(id) && !livs.includes(livraisonDe.get(id)));
  const autresSens = entrees.flatMap((f) => f.e.senses.filter((y) => !ids.includes(y.id)).map((y) => ({ f, y })));
  const corrSel = [...new Set(entrees.flatMap((f) => correctionsDe(f.e.id, f.sid)))];
  const blocF = autresLiv.filter((id) => livraisonDe.get(id)[0] === 'F');
  const hp = memes.filter(({ e }) => HP.includes(e.word)).map(({ e }) => e.word);

  // Risques détectés automatiquement, sans jugement
  const risques = [];
  const horsJlpt = entrees.filter((f) => f.sid !== 'n5_' + f.e.id); if (horsJlpt.length) risques.push('**Identifiants hors JLPT** : ' + horsJlpt.map((f) => f.e.word + ' (`' + f.e.id + '` → `' + f.sid + '`)').join(', ') + ' ; fiche et décisions lues sous l\'identifiant source canonique.');
  const courts = entrees.filter((f) => [...f.e.word].length === 1); if (courts.length) risques.push('**Mots d\'un seul caractère** : ' + courts.map((f) => f.e.word).join(', ') + ' ; les décisions d\'autres ENTRY qui les citent seront listées pour lecture, jamais comptées.');
  const avecFn = fiches.filter((f) => fonctionsDe(f.s).length); if (avecFn.length) risques.push('**Fonctions publiées** sur ' + avecFn.length + ' sens : ' + avecFn.map((f) => f.e.word + ' (' + fonctionsDe(f.s).join(', ') + ')').join(', ') + '.');
  const fnAutres = autresSens.filter(({ y }) => fonctionsDe(y).length); if (fnAutres.length) risques.push('**Fonctions portées par d\'autres sens des mêmes ENTRY**, non transférables d\'office : ' + fnAutres.map(({ f, y }) => f.e.word + ' sens ' + (f.e.senses.indexOf(y) + 1) + ' (' + fonctionsDe(y).join(', ') + ')').join(', ') + '.');
  const rel = fiches.filter((f) => f.s.relations?.length || vocab.some((e) => e.senses.some((x) => (x.relations ?? []).some((r) => r.target === f.id)))); if (rel.length) risques.push('**Relations publiées** (décidées en 5.16, non rouvertes) touchant ' + rel.map((f) => f.e.word).join(', ') + '.');
  const deux = entrees.filter((f) => fiches.filter((x) => x.e.id === f.e.id).length > 1); if (deux.length) risques.push('**ENTRY portant plusieurs sens de la tranche** : ' + deux.map((f) => f.e.word).join(', ') + ' ; chaque sens est examiné séparément, l\'ENTRY est comptée une fois.');
  const autresHors = autresSens.filter(({ y }) => livraisonDe.has(y.id)); if (autresHors.length) risques.push('**Autres sens des mêmes ENTRY dans d\'autres livraisons** : ' + autresHors.map(({ f, y }) => f.e.word + ' « ' + y.meaning.primary + ' » (' + etat(y.id) + ')').join(', ') + ' ; non anticipés.');
  const viaModif = [...cites.keys()].filter((id) => modifsV2.has(id)); if (viaModif.length) risques.push('**Rapprochements du criblage fondés sur une valeur que la liste globale corrige déjà** : ' + viaModif.map((id) => tous.get(id).e.word + ' (`' + id + '`, modification n°' + modifsV2.get(id) + ' du volet 2, retenue, non appliquée)').join(', ') + '.');
  const reouv = entrees.filter((f) => f.dec.some((d) => d.field === 'entrée')); if (reouv.length) risques.push('**ENTRY rouvertes au lot 26 ou avant** : ' + reouv.map((f) => f.e.word + ' (' + f.dec.filter((d) => d.field === 'entrée').map((d) => d.id.replace('A2-04-', '')).join(', ') + ')').join(', ') + ' ; leurs décisions historiques restent citées.');
  const lect = entrees.filter((f) => f.dec.some((d) => d.field === 'readings' || d.field === 'writings')); if (lect.length) risques.push('**Décisions de lecture ou de graphie** sur ' + lect.map((f) => f.e.word).join(', ') + ' : hors des champs examinés, non rouvertes.');
  const c10 = fiches.filter((f) => f.c.regles.some((g) => g.regle === 'C10-a')); if (c10.length) risques.push('**Renvois à une étape ultérieure (C10-a)** : ' + c10.map((f) => f.e.word + ' (' + f.c.regles.filter((g) => g.regle === 'C10-a').map((g) => (g.detail.match(/D\d{4}/) ?? ['?'])[0]).join(', ') + ')').join(', ') + ' ; chaque raison sera lue en entier.');
  if (blocF.length) risques.push('**Comparables du bloc F** (suspendu à E5), lus sans être examinés : ' + blocF.map((id) => tous.get(id).e.word).join(', ') + '.');
  if (corrSel.length) risques.push('**Corrections retenues sur ces ENTRY** (non rouvertes, non appliquées) : ' + corrSel.join(', ') + '.');

  const P = [];
  P.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — périmètre opérationnel ' + (livs.length > 1 ? 'de la tranche ' + nom + ' (livraisons ' + livs.join(', ') + ')' : 'de la livraison ' + nom), '');
  P.push('**Date** : ' + cfg.date);
  P.push(cfg.arbitrage ? '**Statut** : **périmètre accepté le ' + cfg.arbitrage.date + ' (§0).** La proposition est conservée telle qu\'elle a été livrée.' : "**Statut** : **proposition de périmètre opérationnel, non arbitrée.** Généré par `a2-05-travail/perimetre-v2.mjs`, à partir du découpage arbitré du lot 3, du registre de couverture, du résultat du criblage, de l'état publié, du journal et de la liste globale des corrections. **Aucune fiche source n'est ouverte, aucun sens n'est jugé, aucune décision lexicale n'est prise.**");
  P.push('', '**Autorisation** : ' + cfg.autorisation, '');
  if (cfg.arbitrage) P.push('## 0. Arbitrage', '', ...cfg.arbitrage.texte, '');
  P.push('## 1. Où se place ' + nom, '', '**Lot 3 : ' + cov.totaux.arbitres + ' sens arbitrés sur 377 ; ' + (377 - cov.totaux.arbitres) + ' restent.** **Bloc B : ' + cov.totaux.blocBArbitres + ' sur ' + cov.totaux.blocB + '.** (Registre de couverture, calculé.)', '');
  P.push('## 2. Les ' + fiches.length + ' sens', '', '**' + fiches.length + ' sens, ' + entrees.length + ' ENTRY**, exactement les lignes ' + livs.join(', ') + ' du découpage arbitré (contrôle du script).', '', '| N° | Sens | Mot | Traduction | Classe | Livraison | Catégorie publiée | Type publié | Fonctions | Règles du criblage |', '|---|---|---|---|---|---|---|---|---|---|');
  fiches.forEach((f, i) => P.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + f.e.linguistic.grammatical_class + ' | ' + f.livraison + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + (fonctionsDe(f.s).map((x) => '`' + x + '`').join(', ') || 'aucune') + ' | ' + f.c.regles.map((g) => g.regle).join(', ') + ' |'));
  P.push('', '## 3. Axes et règles', '', '**Axes** : ' + axes.join(', ') + ' ; **' + regles.length + ' règles**.', '', '| Règle | Détection | Sens désignés |', '|---|---|---|');
  for (const g of regles) P.push('| ' + g + ' | ' + regleDef.get(g) + ' | ' + fiches.filter((f) => f.c.regles.some((y) => y.regle === g)).map((f) => f.e.word + (f.e.senses.length > 1 ? ' (s' + f.id.slice(-1) + ')' : '')).join(', ') + ' |');
  P.push('', '**Relevés du criblage, sens par sens** (sans jugement) :', '');
  for (const f of fiches) P.push('- **`' + f.id + '` ' + f.e.word + '** : ' + f.c.regles.map((g) => '`' + g.regle + '` — ' + g.detail).join(' ; ') + '.');
  P.push('', '## 4. Comparables', '', '**4.1 Sens nommés par les règles** (' + cites.size + ') :', '', '| Sens | Mot | Traduction | Catégorie | Type | Nommé à propos de | État |', '|---|---|---|---|---|---|---|');
  for (const [id, par] of cites) { const { e, s } = tous.get(id); P.push('| `' + id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + [...par].join(', ') + ' | ' + etat(id) + ' |'); }
  P.push('', '**4.2 Sens publiés des mêmes catégories de niveau 2** (' + memes.length + ', ceux de ' + nom + ' compris) :', '', '| Sens | Mot | Traduction | Catégorie | Type | État |', '|---|---|---|---|---|---|');
  for (const { e, s } of memes) P.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + etat(s.id) + ' |');
  P.push('', '## 5. Décisions antérieures', '', '| ENTRY | Mot | Source canonique | Décisions (identifiant, nature, champ) |', '|---|---|---|---|');
  for (const f of entrees) P.push('| `' + f.e.id + '` | ' + f.e.word + ' | `' + f.sid + '` | ' + (f.dec.length ? f.dec.map((d) => d.id.replace('A2-04-', '') + ' (' + d.kind + ', ' + d.field + ')').join(' ; ') : '**aucune**') + ' |');
  P.push('', '## 6. Risques', '', '**6.1 Détectés automatiquement** (faits relevés dans les données, sans jugement) :', '');
  for (const r of risques.length ? risques : ['aucun']) P.push('- ' + r);
  P.push('', '**6.2 Autres livraisons concernées** (' + autresLiv.length + ', lues sans être jugées) : ' + (autresLiv.length ? autresLiv.map((id) => tous.get(id).e.word + ' (' + etat(id) + ')').join(', ') : 'aucune') + '.', '');
  P.push('**6.3 Autres sens des mêmes ENTRY** (hors du périmètre) : ' + (autresSens.length ? autresSens.map(({ f, y }) => f.e.word + ' « ' + y.meaning.primary + ' » (' + etat(y.id) + ')').join(', ') : 'aucun') + '.', '');
  if (cfg.risquesManuels?.length) { P.push('**6.4 Risques relevés par le rédacteur** :', ''); for (const r of cfg.risquesManuels) P.push('- ' + r); P.push(''); }
  P.push('## 7. Contrôles', '', '| Contrôle | Résultat |', '|---|---|');
  P.push('| Sens de la tranche, exactement ceux du découpage | ' + fiches.length + ' sens, ' + new Set(ids).size + ' distincts |');
  P.push('| Registre de couverture | ' + cov.totaux.arbitres + ' arbitrés, ' + cov.totaux.restants + ' restants ; sens de la tranche : ' + (cfg.nonreg ? 'mode de non-régression' : 'tous restants') + ' |');
  P.push('| Manifeste d\'empreintes | ' + emp.controles + ' rapports identiques |');
  P.push('| Décisions lues | ' + entrees.reduce((n, f) => n + f.dec.length, 0) + ', toutes validées, une ENTRY comptée une fois |');
  P.push('| Vérifications hors périmètre (ひらがな, 漢字, 右, 左) parmi les comparables | ' + (hp.length ? hp.join(', ') : 'aucune') + ' |');
  P.push('| Comparables du bloc F | ' + (blocF.length ? blocF.length : 'aucun') + ' |', '');
  P.push('## 8. Questions', '', '1. Le périmètre de ' + nom + ' est-il accepté, sans ajout ni retrait ?', '2. Les comparables et les risques conviennent-ils ?', "3. L'autorisation d'examiner " + nom + ', seule.', '');
  writeFileSync(isAbsolute(sortie) ? sortie : join(root, sortie), P.join(LF) + LF);
  return { nom, sens: fiches.length, entry: entrees.length, regles, cites: cites.size, memes: memes.length, autresLiv: autresLiv.length, autresSens: autresSens.length, corrections: corrSel, blocF, risques: risques.length, decisions: Object.fromEntries(entrees.map((f) => [f.e.id, f.dec.map((d) => d.id.replace('A2-04-', ''))])) };
}
