// A2-05 · volet 1 · lot 3 : module commun des livraisons du bloc A (à partir d'A4). Lecture seule sur les données.
// Chaque script de livraison fournit sa configuration (sens, verdicts motivés, textes propres) et appelle produire(config).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const LF = String.fromCharCode(10);
export const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/[a-z]+>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/_/g, '').replace(/\s+/g, ' ').trim();
export const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fonctionsDe = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const fonctions = (s) => { const f = fonctionsDe(s); return f.length ? f.map((x) => '`' + x + '`').join(', ') : 'aucune'; };

// config : { root, livraison, deja[], titre, autorisation, IDS[], F{id:{v,m,r}}, typeAttendu, controleDeixis, emploi, methode, axesNote, comparables(ctx) -> lignes[], points[], questions[], arbitrage, suivantes }
export function produire(cfg) {
  const { root, livraison: L } = cfg;
  if (!root) throw new Error('argument attendu : racine du dépôt');
  const txt = (p) => readFileSync(join(root, p), 'utf8');
  const read = (p) => JSON.parse(txt(p));
  const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
  const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
  const anciens = read('reconstruction/a2-04/sources/exemples.json');
  const journal = read('reconstruction/a2-04/journal.json');
  const crib = read('a2-05-travail/criblage/resultat.json');
  const bilanV2 = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
  const bilanProv = txt('docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md');
  const perimetre = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
  const arbitre = (p) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt(p));
  if (!arbitre('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md')) throw new Error('le périmètre du lot 3 ne porte pas son arbitrage');
  for (const l of cfg.deja) if (!arbitre('docs/rapports/etape2-A2-05-volet1-lot3-' + l + '.md')) throw new Error(l + ' ne porte pas son arbitrage : ' + L + ' ne peut pas être livrée');
  const tous = vocab.flatMap((e) => e.senses.map((s) => ({ e, s })));
  const candidats = new Map(crib.candidats.map((c) => [c.id, c]));
  const livraison = new Map([...perimetre.matchAll(/^\| \d+ \| ([A-F]\d+) \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => [m[2], m[1]]));
  if (livraison.size !== 377) throw new Error('périmètre : 377 candidats attendus, lus ' + livraison.size);
  const { IDS, F } = cfg;
  // État de la liste globale des corrections au moment de la livraison (par défaut : celui des livraisons A4 à A6)
  const liste = cfg.liste ?? { n: 180, entry: 161, libre: 'V1-6' };
  // La section 7 du bilan (périmètre T1 à T8) numérote des sens, non des corrections : elle est écartée du relevé
  // Un identifiant d'ENTRY n'en désigne pas un autre qui le prolonge (`v_66` n'est pas `v_660`) : il est suivi d'un accent grave ou d'un « _ »
  const tient = (l, eid) => l.includes('`' + eid + '`') || l.includes('`' + eid + '_');
  const bilanCorr = bilanV2.replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');

  const fiches = IDS.map((id) => {
    const eid = id.replace(/_s\d+$/, ''); const sid = 'n5_' + eid;
    const e = vocab.find((x) => x.id === eid); const s = e?.senses.find((x) => x.id === id); const src = sources.get(sid); const c = candidats.get(id);
    if (!e || !s || !src || !c) throw new Error(id + ' : sens, fiche source ou candidat introuvable');
    if (c.dans147.length) throw new Error(id + ' : sens des 147, hors du lot 3');
    if (livraison.get(id) !== L) throw new Error(id + ' : hors de la livraison ' + L + ' du périmètre arbitré');
    if (cfg.typeAttendu && s.semantic_type !== cfg.typeAttendu) throw new Error(id + ' : type publié inattendu');
    if (!F[id] || !['conforme', 'écart', 'suspendu'].includes(F[id].v)) throw new Error(id + ' : fiche d\'examen absente ou verdict inconnu');
    const regles = c.regles.map((g) => g.regle);
    const corr = bilanCorr.split(LF).filter((l) => /^\| (V[12]-\d+|\d+) \|/.test(l) && tient(l, eid)).map((l) => l.split('|')[1].trim() + ' (' + l.split('|')[2].trim() + ', ' + l.split('|')[5].trim() + ')');
    const prov = bilanProv.split(LF).filter((l) => /^\| \d+ \|/.test(l) && tient(l, eid)).map((l) => { const k = l.split('|').map((x) => x.trim()); return k[3] + ' : ' + k[7] + ' (' + k[2] + ')'; });
    const dec = journal.filter((d) => d.entry === sid);
    if (dec.some((d) => d.status !== 'validated')) throw new Error(id + ' : décision non validée');
    // Une décision de catégorie ou de type inscrite au champ d'un autre sens (« sens N · ») ne vaut pas pour celui-ci
    const rangS = e.senses.indexOf(s) + 1;
    const decType = dec.filter((d) => /semantic_type|category/.test(d.field) && (!/^sens \d+ · /.test(d.field) || d.field.startsWith('sens ' + rangS + ' · ')));
    const ailleurs = journal.filter((d) => d.entry !== sid && d.reason.includes(e.word) && /concept_abstrait|semantic_type/.test(d.reason + ' ' + d.field));
    const fonc = fonctionsDe(s);
    if (cfg.controleDeixis) {
      // Une ENTRY à plusieurs sens porte une décision de fonction par sens : seule celle du sens examiné est confrontée
      const rang = e.senses.indexOf(s) + 1;
      const decFonc = dec.filter((d) => /linguistic_functions/.test(d.field) && (!/^sens \d+ · /.test(d.field) || d.field.startsWith('sens ' + rang + ' · ')));
      if (decFonc.length !== 1 || !/A7/.test(decFonc[0].reason)) throw new Error(id + ' : une décision de fonction citant A7 attendue');
      const refuse = /^Pas de fonction deictique/.test(decFonc[0].reason);
      if ((refuse && fonc.length) || (!refuse && fonc.join() !== 'deictique')) throw new Error(id + ' : fonction publiée contraire à sa décision');
    }
    // Chaque numéro de décision cité dans la fiche d'examen doit appartenir à l'ENTRY, sauf ceux déclarés extérieurs
    for (const n of (F[id].m + F[id].r).match(/D\d{4}/g) ?? []) if (!dec.some((d) => d.id === 'A2-04-' + n) && !(F[id].ext ?? []).includes(n)) throw new Error(id + ' : ' + n + ' cité, absent des décisions de l\'ENTRY');
    for (const n of F[id].ext ?? []) if (!journal.some((d) => d.id === 'A2-04-' + n && d.status === 'validated')) throw new Error(id + ' : ' + n + ' introuvable au journal');
    // Décisions d'un autre champ (`senses`) qui motivent le type et la catégorie : déclarées par la fiche, contrôlées ici
    const motive = (F[id].motive ?? []).map((n) => dec.find((d) => d.id === 'A2-04-' + n));
    for (const d of motive) if (!d || !d.reason.includes(s.semantic_type)) throw new Error(id + ' : décision déclarée motivante absente de l\'ENTRY, ou qui ne nomme pas le type publié');
    return { id, eid, sid, e, s, src, c, regles, corr, prov, dec, decType, ailleurs, motive, fonc, ex: anciens.vocab?.[sid] ?? [] };
  });
  const idsL = [...livraison].filter(([, l]) => l === L).map(([id]) => id);
  if (idsL.length !== IDS.length || idsL.some((id) => !IDS.includes(id)) || new Set(IDS).size !== IDS.length) throw new Error(L + ' : les sens ne sont pas ceux du périmètre arbitré');
  const N = fiches.length;
  const axes = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.axe)))];
  const reglesVues = [...new Set(fiches.flatMap((f) => f.regles))];
  const compte = (v) => fiches.filter((f) => F[f.id].v === v).length;
  const nConf = compte('conforme'); const nEcart = compte('écart'); const nSusp = compte('suspendu');
  const sansDecType = fiches.filter((f) => !f.decType.length && !f.ailleurs.length && !f.motive.length).length;
  const avecFonction = fiches.filter((f) => f.fonc.length).length;
  const bloc = L[0];
  const tailleBloc = [...livraison].filter(([, l]) => l[0] === bloc).length;
  const dejaArb = [...livraison].filter(([, l]) => cfg.deja.includes(l)).length;
  const dejaBloc = [...livraison].filter(([, l]) => cfg.deja.includes(l) && l[0] === bloc).length;
  const ctx = { tous, candidats, livraison, fiches, journal, IDS, fonctions, cat, deja: cfg.deja, L, N, sansDecType, avecFonction };

  const P = [];
  P.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — livraison ' + L + ' : ' + cfg.titre, '');
  P.push('**Date** : ' + cfg.date);
  P.push(cfg.arbitrage
    ? '**Statut** : **arbitré le ' + cfg.arbitrage.date + '** (§0). La proposition est conservée telle qu\'elle a été livrée.'
    : "**Statut** : **proposition, non arbitrée.** Les verdicts ci-dessous sont proposés ; aucun n'est acquis. Écrit par `a2-05-travail/audit-v1-lot3-" + L + ".mjs` (module `lot3-commun.mjs`), en lecture seule sur les données : aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune décision historique n'est réécrite. **" + cfg.suivante + " n'est pas commencée ; le bloc F, les vérifications HP-1 à HP-4 et G1 à G7 ne sont pas ouverts ; aucune des " + liste.n + " corrections retenues n'est appliquée.**");
  P.push('', '**Autorisation** : ' + cfg.autorisation, '');
  if (cfg.arbitrage) P.push('## 0. Arbitrage', '', ...cfg.arbitrage.texte, '');
  P.push('## 1. Résultat proposé', '');
  P.push('| N° | Sens | Mot | Traduction | Lot | Catégorie publiée | Type publié | Fonction publiée | Règles du criblage | Verdict proposé | Correction |', '|---|---|---|---|---|---|---|---|---|---|---|');
  fiches.forEach((f, i) => P.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + String(f.c.lot).padStart(2, '0') + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + fonctions(f.s) + ' | ' + f.regles.join(', ') + ' | **' + F[f.id].v + '** | ' + (F[f.id].k ? F[f.id].k.n : '—') + ' |'));
  const corrs = fiches.filter((f) => F[f.id].k);
  if (nEcart !== corrs.length) throw new Error('un écart sans correction, ou une correction sans écart');
  P.push('', '**' + N + ' sens examinés : ' + nConf + ' conformes, ' + nEcart + ' écart, ' + (nSusp ? nSusp + ' suspendu' : 'aucun sens suspendu') + '.** ' + (corrs.length ? '**Corrections proposées : ' + corrs.map((f) => F[f.id].k.n).join(', ') + '.**' : '**Aucune correction n\'est proposée** : ' + liste.libre + ' reste libre, et la liste globale reste à ' + liste.n + ' corrections dans ' + liste.entry + ' ENTRY, toutes non appliquées.'), '');
  P.push(cfg.emploi(ctx), '');
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
    P.push('- **Fiche source** (`' + f.sid + '`, ' + src.type + ' ; ancien rangement `' + src.category + ' / ' + src.subcategory + '`) : traductions « ' + [src.meanings.primary, ...(src.meanings.secondary ?? [])].join(' ; ') + ' » ; particules ' + (src.particles?.length ? src.particles.join(', ') : 'aucune') + '. Nuance : « ' + strip(src.nuance) + ' » Exemple : « ' + strip(src.example?.japanese) + ' » — « ' + strip(src.example?.french) + ' »');
    P.push('- **Anciens exemples** (' + f.ex.length + ') : ' + (f.ex.length ? f.ex.map((q) => '« ' + strip(q.japanese) + ' » — « ' + strip(q.french ?? q.translation) + ' »').join(' ; ') : 'aucun') + '.');
    P.push('- **État publié** : sens ' + (f.e.senses.indexOf(s) + 1) + ' sur ' + f.e.senses.length + ' ; traduction « ' + s.meaning.primary + ' »' + (s.meaning.alternatives?.length ? ' (' + s.meaning.alternatives.join(', ') + ')' : '') + ' ; catégorie `' + cat(s.category) + '` ; type `' + s.semantic_type + '` ; dimensions ' + (s.dimensions?.length ? JSON.stringify(s.dimensions) : 'aucune') + ' ; fonctions ' + fonctions(s) + ' ; relations ' + (s.relations?.length ? s.relations.length : 'aucune') + ' ; particules ' + (s.particles?.length ? s.particles.join(', ') : 'aucune') + ' ; nuance du sens : ' + (s.nuance ? '« ' + s.nuance + ' »' : 'aucune') + ' ; tags de l\'ENTRY ' + (f.e.tags?.length ? f.e.tags.join(', ') : 'aucun') + ' ; classe `' + f.e.linguistic.grammatical_class + '`.' + (f.e.senses.length > 1 ? ' Autres sens : ' + f.e.senses.filter((x) => x !== s).map((x) => '« ' + x.meaning.primary + ' » (`' + cat(x.category) + '`, `' + x.semantic_type + '`)').join(' ; ') + '.' : ''));
    P.push('- **Décisions de journal de l\'ENTRY** (' + f.dec.length + ', toutes validées) : ' + f.dec.map((d) => d.id.replace('A2-04-', '') + ' (lot ' + d.lot.slice(-2) + ', ' + d.kind + ', ' + d.field + ') : « ' + d.reason + ' »').join(' ; ') + (f.motive.length ? ' **Aucune ne porte sur le champ du type ni sur celui de la catégorie pris seuls ; le type et la catégorie de ce sens sont motivés par ' + f.motive.map((d) => d.id.replace('A2-04-', '')).join(', ') + ', décision du champ `' + f.motive[0].field + '`** (contrôle du script : la décision appartient à l\'ENTRY et nomme le type publié).' : f.decType.length || f.ailleurs.length ? '' : ' **Aucune ne porte sur le champ du type ni sur celui de la catégorie, et aucune décision de type du journal ne nomme ce mot** (recherche faite par le script).'));
    P.push('- **Déjà arbitré sur cette ENTRY, non rouvert** : provenance des nuances (lot 2) : ' + (f.prov.length ? f.prov.join(' ; ') : 'aucune ligne dans le plan des 278') + ' ; corrections retenues, non appliquées : ' + (f.corr.length ? f.corr.join(' ; ') : 'aucune') + '.');
    P.push('- **Verdict proposé** : **' + X.v + '**.');
    P.push('- **Motivation** : ' + X.m);
    if (X.k) P.push('- **Correction proposée (' + X.k.n + ')** : ' + X.k.t);
    P.push('- **Réserve** : ' + X.r, '');
  }
  P.push('## 5. Points portés à l\'arbitrage', '');
  for (const p of cfg.points(ctx)) P.push(p, '');
  P.push('## 6. Contrôles de couverture', '');
  P.push('| Contrôle | Résultat |', '|---|---|');
  P.push('| Les sens de la livraison ' + L + ' du périmètre arbitré sont examinés, et eux seuls | ' + N + ' fiches, ' + new Set(fiches.map((f) => f.id)).size + ' identifiants distincts, identiques aux lignes ' + L + ' du périmètre |');
  P.push('| Chaque sens est un candidat du criblage, hors des 147 | ' + N + ' sur ' + N + ' |');
  P.push('| ENTRY concernées | ' + new Set(fiches.map((f) => f.eid)).size + ' |');
  if (cfg.typeAttendu) P.push('| Type publié de chaque sens | `' + cfg.typeAttendu + '`, ' + N + ' sur ' + N + ' |');
  if (cfg.controleDeixis) P.push('| Fonction publiée, confrontée à sa décision | ' + avecFonction + ' sens avec `deictique` (décision qui la pose, citant A7) ; ' + (N - avecFonction) + ' sans fonction (décision qui la refuse, citant A7) ; aucune discordance |');
  P.push('| Numéros de décision cités dans les motivations | tous appartiennent à l\'ENTRY concernée, ou sont déclarés extérieurs et présents au journal (contrôle du script) |');
  P.push('| Règles du criblage relevées | ' + reglesVues.join(', ') + ' seulement ; axes : ' + axes.join(', ') + ' |');
  P.push('| Décisions de journal lues | ' + fiches.reduce((n, f) => n + f.dec.length, 0) + ', toutes validées, aucune modifiée |');
  P.push('| Verdicts proposés | ' + nConf + ' conformes, ' + nEcart + ' écart, ' + nSusp + ' suspendu |');
  P.push('| Corrections proposées | ' + (corrs.length ? corrs.map((f) => F[f.id].k.n).join(', ') : '0 ; ' + liste.libre + ' non attribué ; ' + liste.n + ' corrections dans ' + liste.entry + ' ENTRY, inchangées et non appliquées') + ' |');
  P.push('| Lot 3 : arbitrés à ce jour | ' + dejaArb + ' sens (' + cfg.deja.join(', ') + ') sur 377 |');
  P.push('| Lot 3 après ' + L + ', **si la proposition est arbitrée** | ' + (dejaArb + N - nSusp) + ' sens sur 377 ; restent ' + (377 - dejaArb - N + nSusp) + ', dont ' + (tailleBloc - dejaBloc - N + nSusp) + ' du bloc ' + bloc + (cfg.suivantes ? ' (' + cfg.suivantes + ')' : '') + ' et 17 du bloc F, suspendu à E5 |');
  P.push('', '## 7. Questions à l\'arbitrage', '');
  cfg.questions.forEach((q, i) => P.push((i + 1) + '. ' + q));
  P.push('');
  writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot3-' + L + '.md'), P.join(LF) + LF);
  console.log(L + ' : ' + N + ' sens, ' + new Set(fiches.map((f) => f.eid)).size + ' ENTRY ; ' + nConf + ' conformes, ' + nEcart + ' écart, ' + nSusp + ' suspendu ; corrections : ' + corrs.length + ' ; règles : ' + reglesVues.join(', ') + ' ; avec fonction : ' + avecFonction + ' ; sans décision de type ni de catégorie : ' + sansDecType + ' ; déjà arbitrés : ' + dejaArb + ' ; bloc ' + bloc + ' : ' + tailleBloc);
}
