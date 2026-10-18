// A2-05 · volet 1 · lot 2 (provenance) : partie commune des scripts d'audit, à partir de la livraison 6d.
// Lecture seule sur les données. Chaque livraison fournit une configuration (verdicts, textes, décomptes attendus) ;
// ce module fait les contrôles, s'arrête au premier écart, et écrit le rapport dans la forme des livraisons précédentes.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const court = (s) => s.replace(" (nuance d'ENTRY)", '');
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

/**
 * @param {object} c configuration de la livraison :
 *   root, code ('6d'), lettre ('Z'), titre, sortie, script,
 *   selection(u) : unités de la livraison ; attendu : { n, mots[] } ;
 *   F : { [unité]: { v, f?, o, m, k?, r? } } ; FAM : libellés des familles d'écart ;
 *   prealables : [{ fichier, marques[], message }] ; dernierV2, corrAvant, entreesAvant ;
 *   dejaFaites(u) : unités des tranches 6 à 8 déjà contrôlées ; faitesAttendu ; resteAvant ;
 *   textes : { statut, montre[], criteres, corrections, fiches, croiseIntro, croiseEntete[], croise[][], ligne1(ctx), candidats(ctx), reste(ctx), lot } ;
 *   arbitrage? : { statut, section[], verdict(id, f, num), ligne(ctx) }
 */
export function produire(c) {
  const read = (p) => JSON.parse(readFileSync(join(c.root, p), 'utf8'));
  const texte = (p) => readFileSync(join(c.root, p), 'utf8');
  const plan = read('a2-05-travail/provenance/plan-tranches.json');
  const vocab = read('data/n5/vocab.json');
  const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
  const ex = read('reconstruction/a2-04/sources/exemples.json');
  const journal = read('reconstruction/a2-04/journal.json');
  const lots = readdirSync(join(c.root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
  const audit = texte('docs/rapports/etape2-A2-05-audit-null.md');
  const bilan = texte('docs/rapports/etape2-A2-05-bilan-volet2.md');
  const fusion = new Map(); const champs = new Map();
  for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const m = en.retire?.merged_into; if (m) fusion.set(m, [...(fusion.get(m) ?? []), id]); if (en.fields) champs.set(id, en.fields); }

  // Préalables : la livraison précédente et le périmètre sont arbitrés
  for (const p of c.prealables) { const t = texte(p.fichier); if (p.marques.some((m) => !t.includes(m))) throw new Error(p.message); }

  // Périmètre de la livraison
  const F = c.F;
  const bloc = plan.toutes.filter(c.selection);
  const unites = bloc.map((u) => court(u.sens));
  if (bloc.length !== c.attendu.n || Object.keys(F).length !== c.attendu.n || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`${c.code} : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
  if (new Set(unites).size !== unites.length) throw new Error(`${c.code} : doublon`);
  if (new Set(bloc.map((u) => u.mot)).size !== c.attendu.mots.length || c.attendu.mots.some((m) => !bloc.some((u) => u.mot === m))) throw new Error(`${c.code} : mots attendus`);
  for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f) || (f.f && !c.FAM[f.f])) throw new Error(`verdict, correction ou famille incohérents : ${id}`);

  // Décomptes inchangés : volet 2, corrections retenues
  const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
  const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
  if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
  const CORR_TOUT = [...bilan.matchAll(/^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/gm)].map((m) => ({ n: m[1], entree: m[2] }));
  if (new Set(CORR_TOUT.map((x) => x.n)).size !== CORR_TOUT.length) throw new Error('bilan : numéro de correction en double');
  // Une fois la livraison arbitrée, le bilan porte aussi ses propres lignes : la proposition se recalcule sur celles d'avant.
  const CORR = CORR_TOUT.filter((x) => !(x.n.startsWith('V2-') && Number(x.n.slice(3)) > c.dernierV2));
  if (CORR.length !== c.corrAvant) throw new Error(`corrections : ${CORR.length} lignes au lieu de ${c.corrAvant}`);
  if (Math.max(...CORR.filter((x) => x.n.startsWith('V2-')).map((x) => Number(x.n.slice(3)))) !== c.dernierV2) throw new Error('dernier numéro V2');
  const entreesAvant = new Set(CORR.map((x) => x.entree)).size;
  if (entreesAvant !== c.entreesAvant) throw new Error(`ENTRY corrigées : ${entreesAvant} au lieu de ${c.entreesAvant}`);

  // Décompte du chantier
  const faites = plan.toutes.filter((u) => ['6', '7', '8'].includes(u.tranche) && c.dejaFaites(u));
  if (faites.length !== c.faitesAttendu || faites.some((u) => bloc.includes(u))) throw new Error(`déjà contrôlées : ${faites.length} au lieu de ${c.faitesAttendu}`);
  const reste = plan.toutes.filter((u) => ['6', '7', '8'].includes(u.tranche) && !bloc.includes(u) && !faites.includes(u));
  if (c.resteAvant - unites.length !== reste.length) throw new Error(`décompte : ${c.resteAvant - unites.length} contre ${reste.length} au plan`);
  const parTranche = Object.fromEntries(['6', '7', '8'].map((t) => [t, reste.filter((u) => u.tranche === t).length]));

  const src = unites.filter((u) => F[u].v === 'sourcé'), ass = unites.filter((u) => F[u].v === 'assumé'), ec = unites.filter((u) => F[u].v === 'écart');
  const NUM = new Map(ec.map((u, i) => [u, c.dernierV2 + i + 1]));
  const de = (u) => bloc.find((x) => court(x.sens) === u);
  const nomDe = (u) => `${de(u).mot}${de(u).niveau === 'sens' ? ` (sens ${u.split('_s').pop()})` : ''}`;
  const entreesEc = [...new Set(ec.map((u) => de(u).entree))];
  const dejaCorr = entreesEc.filter((e) => CORR.some((x) => x.entree === e));
  const entreesApres = new Set([...CORR.map((x) => x.entree), ...entreesEc]).size;
  const cand = [...new Set(bloc.flatMap((u) => u.candidats377))];
  const ctx = { bloc, unites, src, ass, ec, NUM, nomDe, de, dejaCorr, entreesAvant, entreesApres, entreesEc, cand, reste, parTranche, tot2, premier: c.dernierV2 + 1, dernier: c.dernierV2 + ec.length };
  const L = c.lettre; const T = c.textes; const A = c.arbitrage;
  // Une seule correction : pas de plage ni de pluriel (les rapports à plusieurs corrections sont inchangés)
  const seule = ec.length === 1;
  const plage = seule ? `V2-${ctx.premier}` : `V2-${ctx.premier} à V2-${ctx.dernier}`;

  let md = '';
  const P = (t = '') => { md += `${t}\n`; };
  P(`# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : ${c.titre}`);
  P();
  P('**Date** : 2026-10-12');
  if (A) {
    P(`**Statut** : ${A.statut}`);
    P();
    P(`## ${L}0. Arbitrage du ${A.date}`);
    P();
    for (const l of A.section) P(`- ${l}`);
    P();
    P(`**Statut d'origine (proposition)** : *proposition, non arbitrée.* ${T.statut}`);
  } else P(`**Statut** : **proposition, non arbitrée.** ${T.statut}`);
  P();
  P(`## ${L}1. Résultat proposé`);
  P();
  P('| Verdict proposé | Nuances | Détail |');
  P('|---|---|---|');
  P(`| **sourcé** | ${src.length} | ${src.map((u) => `\`${u}\` ${nomDe(u)}`).join(' ; ') || '—'} |`);
  P(`| **assumé** | ${ass.length} | ${ass.map((u) => `\`${u}\` ${nomDe(u)}`).join(' ; ') || '—'} |`);
  P(`| **écart** (E2) | ${ec.length} | ${ec.map((u) => `\`${u}\` ${nomDe(u)}`).join(' ; ') || '—'} |`);
  P(`| **Total** | ${unites.length} | |`);
  P();
  P('**Ce que la livraison montre** :');
  P();
  for (const l of T.montre) P(`- ${l}`);
  P();
  P(`## ${L}2. Critères appliqués`);
  P();
  P(T.criteres);
  P();
  P(`## ${L}3. Corrections proposées`);
  P();
  if (!ec.length) { P(`**Aucune correction n'est proposée** : la livraison ne compte aucun écart. Le dernier numéro retenu reste V2-${c.dernierV2}.`); P(); } else {
  P(`${seule ? `**Elle n'est pas exécutée.** Elle prend la suite des numéros V2 (${plage}) ; elle ne rejoindra la liste globale unique qu'après arbitrage,` : `**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (${plage}) ; elles ne rejoindront la liste globale unique qu'après arbitrage,`} à part des ${c.corrAvant} déjà retenues. ${dejaCorr.length ? `ENTRY de ${c.code} portant déjà une correction retenue : ${dejaCorr.join(', ')}.` : `Aucune ENTRY de ${c.code} n'est visée par une correction déjà retenue.`} ${T.corrections}`);
  P();
  P('| # | Unité | Mot | Famille | Correction proposée |');
  P('|---|---|---|---|---|');
  for (const u of ec) P(`| V2-${NUM.get(u)} | \`${u}\` | ${nomDe(u)} | ${F[u].f} | ${F[u].k} |`);
  P();
  }
  P(`## ${L}4. Les ${unites.length} fiches de provenance`);
  P();
  P(`Les furigana des fiches sont rendus entre crochets. Chaque fiche source est donnée en entier : traductions, particules, nuance, exemple, anciens exemples ; puis l'état publié et toutes les décisions de journal de l'ENTRY. ${T.fiches}`.trimEnd());
  P();
  let verifLot = 0;
  for (const u of bloc) {
    const id = court(u.sens); const f = F[id]; const sid = `n5_${u.entree}`;
    const e = vocab.find((x) => x.id === u.entree); if (!e) throw new Error(`ENTRY absente de l'état publié : ${u.entree}`);
    const s = u.niveau === 'sens' ? e.senses.find((x) => x.id === id) : null;
    if (u.niveau === 'sens' && !s) throw new Error(`sens absent de l'état publié : ${id}`);
    P(`### \`${id}\` · ${u.mot}${s ? ` · « ${s.meaning.primary} »` : ' · nuance d\'ENTRY'} — **${f.v}**`);
    P();
    for (const x of [sid, ...(fusion.get(sid) ?? [])]) {
      const fi = sources.get(x);
      P(`- **Fiche source** (\`${x}\`${x !== sid ? ', fusionnée' : ''}, ${fi.type}) : mot ${fi.word} (${fi.reading}) ; traductions « ${[fi.meanings.primary, ...(fi.meanings.secondary ?? [])].join(' ; ')} » ; particules ${(fi.particles ?? []).join(', ') || 'aucune'}. Nuance : « ${st(fi.nuance)} » Exemple : « ${st(fi.example?.japanese)} » — « ${st(fi.example?.french)} »`);
      for (const q of ex.vocab?.[x] ?? []) P(`  - Ancien exemple : « ${st(q.japanese)} » — « ${st(q.french ?? q.translation)} »`);
    }
    // La nuance publiée est celle du lot validé (les sens du lot sont rangés par rang, sans identifiant)
    const duLot = champs.get(sid);
    if (s) {
      const ls = duLot?.senses?.[Number(id.split('_s').pop()) - 1];
      if (!ls || ls.meaning.primary !== s.meaning.primary) throw new Error(`sens absent du lot, ou d'un autre rang : ${id}`);
      if ((ls.nuance ?? null) !== (s.nuance ?? null)) throw new Error(`nuance du sens différente de celle du lot : ${id}`);
    } else if ((e.nuance ?? null) !== (duLot?.nuance ?? null)) throw new Error(`nuance publiée différente de celle du lot : ${id}`);
    verifLot += 1;
    const autres = e.senses.filter((x) => x.id !== id).map((x) => `\`${x.id}\` « ${x.meaning.primary} », nuance ${x.nuance ? `« ${x.nuance} »` : 'aucune'}`).join(' ; ') || 'aucun';
    P(`- **Publié** : ${s ? `nuance du sens : « ${s.nuance} » ; particules du sens : ${(s.particles ?? []).join(', ') || 'aucune'} ; nuance de l'ENTRY : ${e.nuance ? `« ${e.nuance} »` : 'aucune'} ; autres sens : ${autres}` : `nuance de l'ENTRY : « ${e.nuance} » ; sens : ${e.senses.map((x) => `\`${x.id}\` « ${x.meaning.primary} », nuance ${x.nuance ? `« ${x.nuance} »` : 'aucune'}`).join(' ; ')}`}.`);
    P(`- **Décisions de l'ENTRY** : ${journal.filter((d) => d.entry === sid).map((d) => `${d.id.replace('A2-04-', '')} (${d.kind}, \`${d.field}\`) : « ${d.reason} »`).join(' ; ') || 'aucune'}.`);
    P(`- **Repérage** : ${u.statut} ; ${u.chaines.length ? `chaînes : ${u.chaines.map((k) => `${k.chaine} (${k.classe.startsWith('B') ? `écartée par le tri, ${u.parLecture.includes(k.chaine) ? 'par la lecture' : 'par la graphie'}` : 'signalée'})`).join(' ; ')}` : 'aucune chaîne signalée'}${u.uns.length ? ` ; caractère isolé : ${u.uns.map((k) => k.c).join(', ')}` : ''}.`);
    P(`- **Origine recherchée** : ${f.o}`);
    P(`- **Verdict proposé** : **${f.v}**${f.f ? ` (${c.FAM[f.f].toLowerCase()})` : ''}.`);
    if (A) P(`- **Verdict arbitré (${A.date})** : ${A.verdict(id, f, NUM.get(id))}`);
    P(`- **Justification** : ${f.m}`);
    if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
    if (f.r) P(`- **Réserve** : ${f.r}`);
    P();
  }
  if (verifLot !== unites.length) throw new Error('comparaison au lot incomplète');
  P(`## ${L}5. Recherches croisées dans les sources figées`);
  P();
  P(T.croiseIntro);
  P();
  P(`| ${T.croiseEntete.join(' | ')} |`);
  P(`|${T.croiseEntete.map(() => '---').join('|')}|`);
  for (const l of T.croise) P(`| ${l.join(' | ')} |`);
  P();
  P(`## ${L}6. Complétude et décompte`);
  P();
  P(`Calculé par \`a2-05-travail/${c.script}\` et \`a2-05-travail/provenance-commun.mjs\`, qui écrivent ce rapport et s'arrêtent au premier écart de contrôle.`);
  P();
  P('| Contrôle | Résultat |');
  P('|---|---|');
  P(`| Les fiches sont exactement la livraison ${c.code} du périmètre arbitré | ${T.ligne1(ctx)} |`);
  P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positif présumé, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
  P(`| La nuance publiée est celle du lot validé | oui, pour les ${unites.length} (comparaison de \`data/n5/vocab.json\` et de \`${T.lot}\`, au niveau de l'ENTRY ou du sens ; les sens par rang, traduction principale vérifiée) |`);
  P(`| Verdicts proposés | ${src.length} sourcé, ${ass.length} assumé, ${ec.length} écarts ; total ${unites.length} |`);
  P(`| Un écart a une famille et une correction proposée, et seulement lui | ${ec.length ? `oui : ${plage}, à la suite de V2-${c.dernierV2}` : `sans objet : aucun écart ; le dernier numéro reste V2-${c.dernierV2}`} |`);
  P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
  P(`| Candidats du volet 1 (axes C1 à C10) | ${T.candidats(ctx)} |`);
  P(`| Sens des 147 arbitrages du volet 2 | ${bloc.filter((u) => u.dans147.length).map((u) => `${u.mot} (${u.dans147.join(', ')})`).join(', ') || 'aucun'} |`);
  P(`| Corrections retenues | ${c.corrAvant} (10 + 5 + ${c.dernierV2}), dans ${entreesAvant} ENTRY, ${c.corrAvant} lignes recomptées dans le bilan, inchangées, aucune appliquée ; ${ec.length ? `${seule ? 'si la proposition était retenue' : `si les ${ec.length} propositions étaient retenues`} : ${c.corrAvant + ec.length} corrections, dans ${entreesApres} ENTRY` : 'aucune proposition dans cette livraison : le total reste inchangé'} |`);
  if (A) P(`| Verdicts arbitrés (${A.date}) | ${A.ligne(ctx)} |`);
  P(`| **Décompte du chantier** | ${c.resteAvant} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans cette livraison ; ${c.resteAvant - unites.length} resteraient après son arbitrage** : ${T.reste(ctx)} (recompte du plan : ${reste.length}). |`);
  if (/ $/m.test(md) || md.endsWith('\n\n')) throw new Error('rapport : espace en fin de ligne ou ligne vide finale');
  writeFileSync(join(c.root, c.sortie), md);
  console.log(`${c.code} : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; ${ec.length ? plage : 'aucune correction'} ; ENTRY après : ${entreesApres} ; reste ${c.resteAvant - unites.length} (plan : ${reste.length} ; tranche 6 : ${parTranche['6']} ; 7 : ${parTranche['7']} ; 8 : ${parTranche['8']})`);
  return ctx;
}
