// A2-05 · volet 1 · lot 3 : module commun des livraisons, version 2 (outillage en proposition, non adopté). Lecture seule sur les données.
// La version 1 (lot3-commun.mjs) reste gelée : les rapports arbitrés qu'elle a écrits ne sont jamais régénérés.
// Apports de la version 2 :
//   - fiche source et décisions résolues par la correspondance canonique de l'assemblage (idMap), et non par « n5_ » + identifiant publié ;
//   - les décisions d'autres ENTRY qui citent le mot sont listées pour lecture, jamais comptées (plus de faux rapprochement par sous-chaîne) ;
//   - dédoublonnage par ENTRY (une ENTRY qui porte deux sens de la livraison n'est comptée qu'une fois) ;
//   - contrôles des motivations : champs, règles du criblage, citations de la fiche et des décisions ;
//   - tri « simple / complexe », aide à la priorisation seulement ;
//   - tranches de plusieurs livraisons du découpage arbitré ; couverture des 377 et manifeste d'empreintes contrôlés avant écriture ;
//   - refus d'écrire sur un rapport arbitré (manifeste).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, isAbsolute } from 'node:path';
import { readSources } from '../tools/reconstruction/sources.mjs';
import { assemble } from '../tools/reconstruction/assemble.mjs';
import { couverture } from './couverture-lot3.mjs';
import { verifierEmpreintes, MANIFESTE } from './empreintes-lot3.mjs';

export const LF = String.fromCharCode(10);
export const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/[a-z]+>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/_/g, '').replace(/\s+/g, ' ').trim();
export const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fonctionsDe = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const fonctions = (s) => { const f = fonctionsDe(s); return f.length ? f.map((x) => '`' + x + '`').join(', ') : 'aucune'; };
// Normalisation pour comparer une citation à son texte d'origine : balises, emphases, guillemets et espaces neutralisés
export const norm = (s) => strip(s).replace(/[«»"“”„]/g, ' ').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();

/** Identifiants sous lesquels une ENTRY est citée dans les bilans : l'identifiant publié et, pour une ENTRY hors JLPT, son identifiant source
 *  canonique (`v_718` → `hj_v_1`, `v_719` → `hj_v_2`). Pour une ENTRY N5, l'identifiant source est « n5_ » + l'identifiant publié : les deux
 *  coïncident une fois le préfixe retiré, et la liste n'a qu'un élément (aucun doublon). */
export const identifiantsCites = (eid, sid) => [...new Set([eid, String(sid ?? '').replace(/^n5_/, '')].filter(Boolean))];

/** Correspondance canonique : identifiant publié → identifiant source, par la table de l'assemblage (entrées validées, non retirées). */
export function correspondance(root) {
  const work = join(root, 'reconstruction', 'a2-04');
  const sources = readSources(join(work, 'sources'));
  const lots = readdirSync(join(work, 'lots')).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(readFileSync(join(work, 'lots', f), 'utf8')));
  const journal = JSON.parse(readFileSync(join(work, 'journal.json'), 'utf8'));
  const a = assemble({ sources, lots, journal, mode: 'partial' });
  const valides = new Set(); for (const lot of lots) for (const [oldId, d] of Object.entries(lot?.entries ?? {})) if (d?.status === 'validated' && !d.retire) valides.add(oldId);
  const canon = new Map();
  for (const [oldId, newId] of Object.entries(a.idMap)) if (typeof newId === 'string' && valides.has(oldId)) { if (canon.has(newId)) throw new Error(newId + ' : deux entrées sources canoniques (' + canon.get(newId) + ', ' + oldId + ')'); canon.set(newId, oldId); }
  return { canon, srcById: new Map([...sources.vocab, ...sources.hj].map((s) => [s.id, s])), exemples: sources.exemples, journal };
}

/** Citations de premier niveau « … » d'un texte, guillemets imbriqués compris, avec leur position. */
export function citations(t) {
  const out = []; let depth = 0; let start = -1;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '«') { if (depth === 0) start = i; depth++; } else if (t[i] === '»' && depth > 0) { depth--; if (depth === 0) out.push({ debut: start, texte: t.slice(start + 1, i).trim() }); }
  }
  return out;
}

const CHAMPS = [['catégorie', /catégorie/i], ['type', /\btype\b|semantic_type/i], ['fonctions', /fonction/i], ['dimensions', /dimension/i], ['tags', /\btags?\b/i], ['relations', /relation/i], ['particules', /particule/i], ['counter', /counter/]];

/** Contrôles d'une fiche d'examen : champs nommés, règles du criblage citées, citations retrouvées. Renvoie la liste des manques. */
export function controlerMotivation(f, X, journal) {
  const texte = X.m + ' ' + X.r; const manques = [];
  for (const [nom, re] of CHAMPS) if (!re.test(texte)) manques.push('champ non nommé : ' + nom);
  for (const g of f.regles) if (!texte.includes(g)) manques.push('règle du criblage non citée : ' + g);
  const src = f.src; const corpusFiche = norm([src.nuance, src.meanings?.primary, ...(src.meanings?.secondary ?? []), [src.meanings?.primary, ...(src.meanings?.secondary ?? [])].join(' ; '), src.example?.japanese, src.example?.french, ...(src.particles ?? []), ...f.ex.map((q) => strip(q.japanese) + ' ' + strip(q.french ?? q.translation))].join(' | '));
  // Sources connues : la fiche, les décisions nommées dans la fiche d'examen, les nuances publiées du sens et de l'ENTRY
  const autres = [...new Set((X.m + ' ' + X.r).match(/D\d{4}/g) ?? [])].map((n) => [n, journal.find((x) => x.id === 'A2-04-' + n)]).filter(([, d]) => d).map(([n, d]) => [n, norm(d.reason)]);
  autres.push(['la fiche', corpusFiche], ['les nuances publiées', norm((f.s.nuance ?? '') + ' | ' + (f.e.nuance ?? ''))]);
  const attributions = [];
  let ctrl = 0; let nonCtrl = 0;
  for (const c of citations(X.m)) {
    // Attribution : la dernière décision nommée juste avant, sans coupure de phrase et à 35 caractères au plus ; sinon la fiche, nommée
    // juste avant ; sinon la citation n'est pas attribuée (norme, nuance publiée, criblage) et n'est pas contrôlée
    const avant = X.m.slice(Math.max(0, c.debut - 90), c.debut);
    const ds = [...avant.matchAll(/D\d{4}/g)]; const der = ds.at(-1);
    const reste = der ? avant.slice(der.index + der[0].length) : null;
    const dec = der && reste.length <= 35 && !/[;.]/.test(reste) ? [null, der[0]] : null;
    const fiche = /(fiche[^«»;.]{0,40}|traductions?[^«»;.]{0,10}|exemple dit[^«»;.]{0,10}|anciens exemples[^«»;.]{0,40})$/i.test(avant) && !/publi[ée]/.test(avant.slice(-45));
    let corpus = null; let ou = '';
    if (dec) { const d = journal.find((x) => x.id === 'A2-04-' + dec[1]); if (d) { corpus = norm(d.reason); ou = dec[1]; } }
    else if (fiche) { corpus = corpusFiche; ou = 'la fiche'; }
    if (!corpus) { nonCtrl++; continue; }
    ctrl++;
    for (const frag of c.texte.split(/\[[^\]]*\]|…/).map((x) => norm(x)).filter((x) => x.length >= 4)) {
      if (corpus.includes(frag)) continue;
      const ailleurs = autres.find(([, t]) => t.includes(frag));
      if (ailleurs) attributions.push('attribuée à ' + ou + ', trouvée dans ' + ailleurs[0] + ' : « ' + frag.slice(0, 80) + ' »');
      else manques.push('citation introuvable (annoncée de ' + ou + ') : « ' + frag.slice(0, 80) + ' »');
    }
  }
  return { manques, attributions, citationsControlees: ctrl, citationsNonControlees: nonCtrl };
}

const POINT = /point porté à l'arbitrage|portée à l'arbitrage|portées à l'arbitrage|lecture portée/i;
/** Tri d'aide à la priorisation : complexe dès qu'un point est porté à l'arbitrage, qu'un écart ou une correction est proposé, ou que la configuration le dit. */
export function trier(X) {
  if (X.cas) return { cas: X.cas, motif: 'déclaré dans la configuration' };
  if (X.v !== 'conforme') return { cas: 'complexe', motif: 'verdict ' + X.v };
  if (X.k) return { cas: 'complexe', motif: 'correction proposée' };
  if (POINT.test(X.m + ' ' + X.r)) return { cas: 'complexe', motif: "point porté à l'arbitrage" };
  return { cas: 'simple', motif: "aucun point porté à l'arbitrage" };
}

// config : { root, nom, livraisons[], titre, autorisation, IDS[], F{id:{v,m,r,k?,cas?,motive?,ext?}}, liste, date, suivante, emploi, methode, axesNote, comparables(ctx), points(ctx), questions[], arbitrage, strict, nonreg, sortie }
export function produire(cfg) {
  const { root } = cfg; if (!root) throw new Error('argument attendu : racine du dépôt');
  const nom = cfg.nom ?? cfg.livraison; const livs = cfg.livraisons ?? [cfg.livraison];
  const txt = (p) => readFileSync(join(root, p), 'utf8');
  const read = (p) => JSON.parse(txt(p));
  const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
  const { canon, srcById, exemples, journal } = correspondance(root);
  const crib = read('a2-05-travail/criblage/resultat.json');
  const bilanV2 = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
  const bilanProv = txt('docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md');
  const cov = couverture(root); const emp = verifierEmpreintes(root);
  const sortie = cfg.sortie ?? 'docs/rapports/etape2-A2-05-volet1-lot3-' + nom + '.md';
  const manifeste = JSON.parse(txt(MANIFESTE)).empreintes;
  if (Object.hasOwn(manifeste, sortie)) throw new Error(sortie + ' : rapport arbitré, protégé par le manifeste ; il ne se régénère pas');
  const tous = vocab.flatMap((e) => e.senses.map((s) => ({ e, s })));
  const candidats = new Map(crib.candidats.map((c) => [c.id, c]));
  const livraisonDe = new Map(cov.sens.map((s) => [s.id, s.livraison])); const etatDe = new Map(cov.sens.map((s) => [s.id, s.etat]));
  const { IDS, F } = cfg;
  const attendus = cov.sens.filter((s) => livs.includes(s.livraison)).map((s) => s.id);
  if (new Set(IDS).size !== IDS.length || attendus.length !== IDS.length || attendus.some((id) => !IDS.includes(id))) throw new Error(nom + ' : les sens ne sont pas exactement ceux des livraisons ' + livs.join(', ') + ' du découpage arbitré');
  if (!cfg.nonreg) for (const id of IDS) if (etatDe.get(id) === 'arbitré') throw new Error(id + ' : déjà arbitré (' + livraisonDe.get(id) + ')');
  const liste = cfg.liste ?? { n: 185, entry: 165, libre: 'V1-11' };
  const tient = (l, eid) => l.includes('`' + eid + '`') || l.includes('`' + eid + '_');
  const tientE = (l, eid, sid) => identifiantsCites(eid, sid).some((x) => tient(l, x)); // identifiant publié et, hors JLPT, identifiant source
  const bilanCorr = bilanV2.replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');

  const fiches = IDS.map((id) => {
    const eid = id.replace(/_s\d+$/, '');
    const e = vocab.find((x) => x.id === eid); const s = e?.senses.find((x) => x.id === id);
    const sid = canon.get(eid); const src = sid ? srcById.get(sid) : undefined; const c = candidats.get(id);
    if (!e || !s || !sid || !src || !c) throw new Error(id + ' : sens, correspondance canonique, fiche source ou candidat introuvable');
    if (c.dans147.length) throw new Error(id + ' : sens des 147, hors du lot 3');
    if (!F[id] || !['conforme', 'écart', 'suspendu'].includes(F[id].v)) throw new Error(id + ' : fiche d\'examen absente ou verdict inconnu');
    const regles = c.regles.map((g) => g.regle);
    const corr = bilanCorr.split(LF).filter((l) => /^\| (V[12]-\d+|\d+) \|/.test(l) && tientE(l, eid, sid)).map((l) => l.split('|')[1].trim() + ' (' + l.split('|')[2].trim() + ', ' + l.split('|')[5].trim() + ')');
    const prov = bilanProv.split(LF).filter((l) => /^\| \d+ \|/.test(l) && tientE(l, eid, sid)).map((l) => { const k = l.split('|').map((x) => x.trim()); return k[3] + ' : ' + k[7] + ' (' + k[2] + ')'; });
    const dec = journal.filter((d) => d.entry === sid);
    if (dec.some((d) => d.status !== 'validated')) throw new Error(id + ' : décision non validée');
    const rangS = e.senses.indexOf(s) + 1;
    const decType = dec.filter((d) => /semantic_type|category/.test(d.field) && (!/^sens \d+ · /.test(d.field) || d.field.startsWith('sens ' + rangS + ' · ')));
    // Mentions dans les décisions d'autres ENTRY : listées pour lecture, jamais comptées
    const mentions = journal.filter((d) => d.entry !== sid && d.reason.includes(e.word) && /concept_abstrait|semantic_type/.test(d.reason + ' ' + d.field)).map((d) => d.id.replace('A2-04-', ''));
    for (const n of (F[id].m + F[id].r).match(/D\d{4}/g) ?? []) if (!dec.some((d) => d.id === 'A2-04-' + n) && !(F[id].ext ?? []).includes(n)) throw new Error(id + ' : ' + n + ' cité, absent des décisions de l\'ENTRY');
    for (const n of F[id].ext ?? []) if (!journal.some((d) => d.id === 'A2-04-' + n && d.status === 'validated')) throw new Error(id + ' : ' + n + ' introuvable au journal');
    const motive = (F[id].motive ?? []).map((n) => dec.find((d) => d.id === 'A2-04-' + n));
    for (const d of motive) if (!d || !d.reason.includes(s.semantic_type)) throw new Error(id + ' : décision déclarée motivante absente de l\'ENTRY, ou qui ne nomme pas le type publié');
    const f = { id, eid, sid, e, s, src, c, regles, corr, prov, dec, decType, mentions, motive, fonc: fonctionsDe(s), ex: exemples.vocab?.[sid] ?? [], livraison: livraisonDe.get(id) };
    f.controle = controlerMotivation(f, F[id], journal); f.tri = trier(F[id]);
    return f;
  });
  const entrees = [...new Map(fiches.map((f) => [f.eid, f])).values()];
  const N = fiches.length;
  const manques = fiches.flatMap((f) => f.controle.manques.map((m) => ({ id: f.id, m })));
  // Bloquant par défaut (arbitrage du 2026-10-18) : champ absent, règle non citée, citation introuvable ; les attributions à vérifier
  // ne sont que des avertissements ; le mode signalement (cfg.signalement) est réservé à la non-régression des rapports historiques
  cfg.strict = cfg.strict ?? !cfg.signalement;
  if (cfg.strict && manques.length) throw new Error('contrôles des motivations : ' + manques.length + ' manque(s), dont ' + manques.slice(0, 3).map((x) => x.id + ' : ' + x.m).join(' ; '));
  const axes = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.axe)))];
  const reglesVues = [...new Set(fiches.flatMap((f) => f.regles))];
  const compte = (v) => fiches.filter((f) => F[f.id].v === v).length;
  const nConf = compte('conforme'); const nEcart = compte('écart'); const nSusp = compte('suspendu');
  const sansDecType = fiches.filter((f) => !f.decType.length && !f.motive.length).length;
  const avecFonction = fiches.filter((f) => f.fonc.length).length;
  const ctx = { tous, candidats, fiches, entrees, journal, IDS, fonctions, cat, nom, livs, N, sansDecType, avecFonction, cov };

  const P = [];
  P.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — ' + (livs.length > 1 ? 'tranche ' + nom + ' (livraisons ' + livs.join(', ') + ')' : 'livraison ' + nom) + ' : ' + cfg.titre, '');
  P.push('**Date** : ' + cfg.date);
  P.push(cfg.arbitrage
    ? '**Statut** : **arbitré le ' + cfg.arbitrage.date + '** (§0). La proposition est conservée telle qu\'elle a été livrée.'
    : "**Statut** : **proposition, non arbitrée.** Les verdicts ci-dessous sont proposés ; aucun n'est acquis. Écrit avec le module `lot3-commun-v2.mjs`, en lecture seule sur les données : aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune décision historique n'est réécrite. **" + (cfg.suivante ?? 'La suite') + " n'est pas commencée ; aucune des " + liste.n + " corrections retenues n'est appliquée.**");
  P.push('', '**Autorisation** : ' + cfg.autorisation, '');
  if (cfg.arbitrage) P.push('## 0. Arbitrage', '', ...cfg.arbitrage.texte, '');
  P.push('## 1. Résultat proposé', '');
  P.push('| N° | Sens | Mot | Traduction | Livraison | Catégorie publiée | Type publié | Fonction publiée | Règles du criblage | Verdict proposé | Correction |', '|---|---|---|---|---|---|---|---|---|---|---|');
  fiches.forEach((f, i) => P.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + f.livraison + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + fonctions(f.s) + ' | ' + f.regles.join(', ') + ' | **' + F[f.id].v + '** | ' + (F[f.id].k ? F[f.id].k.n : '—') + ' |'));
  const corrs = fiches.filter((f) => F[f.id].k);
  if (nEcart !== corrs.length) throw new Error('un écart sans correction, ou une correction sans écart');
  P.push('', '**' + N + ' sens examinés : ' + nConf + ' conformes, ' + nEcart + ' écart, ' + (nSusp ? nSusp + ' suspendu' : 'aucun sens suspendu') + '.** ' + (corrs.length ? '**Corrections proposées : ' + corrs.map((f) => F[f.id].k.n).join(', ') + '.**' : '**Aucune correction n\'est proposée** : ' + liste.libre + ' reste libre, et la liste globale reste à ' + liste.n + ' corrections dans ' + liste.entry + ' ENTRY, toutes non appliquées.'), '');
  P.push('**Tri d\'aide à la priorisation** (il ne dispense d\'aucune lecture : chaque fiche source se lit en entier, et chaque sens a sa fiche d\'examen complète) :', '', '| Sens | Mot | Cas | Motif | Règles | Fonctions | Décisions de l\'ENTRY | Autres sens de l\'ENTRY |', '|---|---|---|---|---|---|---|---|');
  for (const f of [...fiches].sort((a, b) => (a.tri.cas === b.tri.cas ? 0 : a.tri.cas === 'complexe' ? -1 : 1))) P.push('| `' + f.id + '` | ' + f.e.word + ' | **' + f.tri.cas + '** | ' + f.tri.motif + ' | ' + f.regles.length + ' | ' + f.fonc.length + ' | ' + f.dec.length + ' | ' + (f.e.senses.length - 1) + ' |');
  P.push('', cfg.emploi(ctx), '');
  P.push('## 2. Méthode', '', cfg.methode, '');
  P.push('**Axes signalés** : les ' + N + ' sens ne sont désignés que par ' + (reglesVues.length === 1 ? 'la règle ' : 'les règles ') + reglesVues.map((r) => '`' + r + '`').join(', ') + ' (axe' + (axes.length > 1 ? 's' : '') + ' ' + axes.join(', ') + '). ' + cfg.axesNote, '');
  P.push("**Limites** : un comparable sert de contrôle, non de source ; je ne juge aucun sens hors des " + N + " ; rien n'est ajouté aux fiches.", '');
  P.push(...cfg.comparables(ctx));
  P.push('## 4. Les fiches d\'examen', '');
  for (const f of fiches) {
    const X = F[f.id]; const s = f.s; const src = f.src;
    P.push('#### `' + f.id + '` · ' + f.e.word + ' (' + src.reading + ') · « ' + s.meaning.primary + ' » — proposé : **' + X.v + '**', '');
    P.push('- **Questions** : ' + cfg.question);
    P.push('- **Règles du criblage** : ' + f.c.regles.map((g) => '`' + g.regle + '` (' + g.detail + ')').join(' ; ') + '. Aucun autre axe.');
    P.push('- **Fiche source** (`' + f.sid + '`' + (f.sid !== 'n5_' + f.eid ? ', correspondance canonique de `' + f.eid + '`' : '') + ', ' + src.type + ' ; ancien rangement `' + src.category + ' / ' + src.subcategory + '`) : traductions « ' + [src.meanings.primary, ...(src.meanings.secondary ?? [])].join(' ; ') + ' » ; particules ' + (src.particles?.length ? src.particles.join(', ') : 'aucune') + '. Nuance : « ' + strip(src.nuance) + ' » Exemple : « ' + strip(src.example?.japanese) + ' » — « ' + strip(src.example?.french) + ' »');
    P.push('- **Anciens exemples** (' + f.ex.length + ') : ' + (f.ex.length ? f.ex.map((q) => '« ' + strip(q.japanese) + ' » — « ' + strip(q.french ?? q.translation) + ' »').join(' ; ') : 'aucun') + '.');
    P.push('- **État publié** : sens ' + (f.e.senses.indexOf(s) + 1) + ' sur ' + f.e.senses.length + ' ; traduction « ' + s.meaning.primary + ' »' + (s.meaning.alternatives?.length ? ' (' + s.meaning.alternatives.join(', ') + ')' : '') + ' ; catégorie `' + cat(s.category) + '` ; type `' + s.semantic_type + '` ; dimensions ' + (s.dimensions?.length ? JSON.stringify(s.dimensions) : 'aucune') + ' ; fonctions ' + fonctions(s) + ' ; relations ' + (s.relations?.length ? JSON.stringify(s.relations) : 'aucune') + ' ; particules ' + (s.particles?.length ? s.particles.join(', ') : 'aucune') + ' ; nuance du sens : ' + (s.nuance ? '« ' + s.nuance + ' »' : 'aucune') + ' ; tags de l\'ENTRY ' + (f.e.tags?.length ? f.e.tags.join(', ') : 'aucun') + ' ; classe `' + f.e.linguistic.grammatical_class + '` ; `counter` ' + (f.e.linguistic.counter ?? 'null') + '.' + (f.e.senses.length > 1 ? ' Autres sens : ' + f.e.senses.filter((x) => x !== s).map((x) => '« ' + x.meaning.primary + ' » (`' + cat(x.category) + '`, `' + x.semantic_type + '`)').join(' ; ') + '.' : ''));
    P.push('- **Décisions de journal de l\'ENTRY** (' + f.dec.length + ', toutes validées) : ' + (f.dec.length ? f.dec.map((d) => d.id.replace('A2-04-', '') + ' (lot ' + d.lot.slice(-2) + ', ' + d.kind + ', ' + d.field + ') : « ' + d.reason + ' »').join(' ; ') : '**aucune**') + (f.motive.length ? ' **Le type et la catégorie de ce sens sont motivés par ' + f.motive.map((d) => d.id.replace('A2-04-', '')).join(', ') + ', décision du champ `' + f.motive[0].field + '`** (contrôle du script).' : f.decType.length ? '' : ' **Aucune ne porte sur le champ du type ni sur celui de la catégorie de ce sens** (R4).') + (f.mentions.length ? ' Décisions d\'autres ENTRY qui citent le mot, **listées pour lecture, non comptées** : ' + f.mentions.join(', ') + '.' : ''));
    P.push('- **Déjà arbitré sur cette ENTRY, non rouvert** : provenance des nuances (lot 2) : ' + (f.prov.length ? f.prov.join(' ; ') : 'aucune ligne dans le plan des 278') + ' ; corrections retenues, non appliquées : ' + (f.corr.length ? f.corr.join(' ; ') : 'aucune') + '.');
    P.push('- **Verdict proposé** : **' + X.v + '** ; tri : ' + f.tri.cas + ' (' + f.tri.motif + ').');
    P.push('- **Motivation** : ' + X.m);
    if (X.k) P.push('- **Correction proposée (' + X.k.n + ')** : ' + X.k.t);
    P.push('- **Réserve** : ' + X.r);
    P.push('- **Contrôles de la fiche d\'examen** : ' + (f.controle.manques.length ? f.controle.manques.join(' ; ') : 'champs nommés, règles citées, citations retrouvées') + ' ; citations contrôlées : ' + f.controle.citationsControlees + ', non attribuées : ' + f.controle.citationsNonControlees + (f.controle.attributions.length ? ' ; attributions à vérifier : ' + f.controle.attributions.join(' ; ') : '') + '.', '');
  }
  P.push('## 5. Points portés à l\'arbitrage', '');
  for (const p of cfg.points(ctx)) P.push(p, '');
  P.push('## 6. Contrôles de couverture', '');
  P.push('| Contrôle | Résultat |', '|---|---|');
  P.push('| Les sens des livraisons ' + livs.join(', ') + ' du découpage arbitré sont examinés, et eux seuls | ' + N + ' fiches, ' + new Set(fiches.map((f) => f.id)).size + ' identifiants distincts, identiques aux lignes du découpage |');
  P.push('| Registre de couverture des 377 | ' + cov.totaux.arbitres + ' arbitrés, ' + cov.totaux.proposes + ' proposés, ' + cov.totaux.restants + ' restants ; aucun sens examiné deux fois, aucun omis dans un rapport existant |');
  P.push('| Manifeste d\'empreintes des rapports arbitrés | ' + emp.controles + ' rapports, identiques' + (emp.nouveaux.length ? ' ; hors manifeste : ' + emp.nouveaux.join(', ') : '') + ' |');
  P.push('| Chaque sens est un candidat du criblage, hors des 147 | ' + N + ' sur ' + N + ' |');
  P.push('| ENTRY concernées | ' + entrees.length + ' |');
  P.push('| Fiches sources résolues par la correspondance canonique | ' + N + ' sur ' + N + (fiches.some((f) => f.sid !== 'n5_' + f.eid) ? ' (dont hors JLPT : ' + fiches.filter((f) => f.sid !== 'n5_' + f.eid).map((f) => '`' + f.eid + '` → `' + f.sid + '`').join(', ') + ')' : '') + ' |');
  P.push('| Numéros de décision cités dans les motivations | tous appartiennent à l\'ENTRY concernée, ou sont déclarés extérieurs et présents au journal (contrôle du script) |');
  P.push('| Contrôles des motivations (champs, règles, citations) | ' + (manques.length ? manques.length + ' manque(s) signalé(s) dans les fiches' : 'aucun manque') + (cfg.strict ? ' ; mode strict' : ' ; mode signalement') + ' |');
  P.push('| Règles du criblage relevées | ' + reglesVues.join(', ') + ' seulement ; axes : ' + axes.join(', ') + ' |');
  P.push('| Décisions de journal lues | ' + entrees.reduce((n, f) => n + f.dec.length, 0) + ', dans ' + entrees.length + ' ENTRY (une ENTRY comptée une fois), toutes validées, aucune modifiée |');
  P.push('| Verdicts proposés | ' + nConf + ' conformes, ' + nEcart + ' écart, ' + nSusp + ' suspendu ; tri : ' + fiches.filter((f) => f.tri.cas === 'complexe').length + ' complexe(s), ' + fiches.filter((f) => f.tri.cas === 'simple').length + ' simple(s) |');
  P.push('| R4 (aucune décision sur la catégorie ni sur le type) | ' + sansDecType + ' sur ' + N + ' (les mentions d\'autres ENTRY ne sont pas comptées) |');
  P.push('| Corrections proposées | ' + (corrs.length ? corrs.map((f) => F[f.id].k.n).join(', ') : '0 ; ' + liste.libre + ' non attribué ; ' + liste.n + ' corrections dans ' + liste.entry + ' ENTRY, inchangées et non appliquées') + ' |');
  P.push('', '## 7. Questions à l\'arbitrage', '');
  cfg.questions.forEach((q, i) => P.push((i + 1) + '. ' + q));
  P.push('');
  writeFileSync(isAbsolute(sortie) ? sortie : join(root, sortie), P.join(LF) + LF);
  return { nom, N, nConf, nEcart, nSusp, sansDecType, manques, fiches: fiches.map((f) => ({ id: f.id, verdict: F[f.id].v, categorie: cat(f.s.category), type: f.s.semantic_type, fonctions: f.fonc.join(','), correction: F[f.id].k ? F[f.id].k.n : '—', sid: f.sid, tri: f.tri.cas, mentions: f.mentions, citationsControlees: f.controle.citationsControlees, attributions: f.controle.attributions })) };
}
