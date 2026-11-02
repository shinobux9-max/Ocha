// A2-05 : correctif proposé du générateur de périmètres pour les comparables du lot 1 (proposition, NON appliquée).
// Usage : node a2-05-travail/correction-comparables/preparer.mjs <racine du dépôt>
// Lit perimetre-v2.mjs SANS le modifier ; écrit sa version proposée (proposition/) et la différence exacte (diffs/), par remplacements
// ciblés à occurrence unique. Ne touche ni aux données, ni aux arbitrages du lot 1, ni au criblage, ni aux règles linguistiques.
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), OUT = join(W, 'correction-comparables');
const rep = (t, a, b, nom) => { const n = t.split(a).length - 1; if (n !== 1) throw new Error(nom + ' : ' + n + ' occurrence(s) de « ' + a.slice(0, 60) + ' »'); return t.replace(a, () => b); };
const L = (...l) => l.join('\n');

let p = readFileSync(join(W, 'perimetre-v2.mjs'), 'utf8');
// 0. En-tête et imports
p = rep(p, "// explicite, avant tout audit (arbitrage du 2026-10-18).",
  L("// explicite, avant tout audit (arbitrage du 2026-10-18).",
    "// Correctif des comparables (proposition du 2026-10-21) : l'état d'un comparable connaît aussi les 19 sens du lot 1 du volet 1 (verdict arbitré) ;",
    "// les corrections retenues des comparables sont montrées avec leur valeur publiée, leur valeur retenue (non appliquée) et leur section du bilan ;",
    "// les relevés du criblage dont une valeur est déjà corrigée sont signalés, sans être recalculés ; un périmètre accepté ne se régénère jamais."), 'en-tête');
p = rep(p, "import { readFileSync, writeFileSync } from 'node:fs';", "import { readFileSync, writeFileSync, existsSync } from 'node:fs';", 'imports');
// 1. Refus d'écrire sur un périmètre accepté, même absent du manifeste
p = rep(p, "  if (Object.hasOwn(JSON.parse(txt(MANIFESTE)).empreintes, sortie)) throw new Error(sortie + ' : périmètre arbitré, protégé par le manifeste');",
  L("  if (Object.hasOwn(JSON.parse(txt(MANIFESTE)).empreintes, sortie)) throw new Error(sortie + ' : périmètre arbitré, protégé par le manifeste');",
    "  const cible = isAbsolute(sortie) ? sortie : join(root, sortie);",
    "  if (existsSync(cible) && /^\\*\\*Statut\\*\\* : \\*\\*(périmètre accepté le |arbitré le )/m.test(readFileSync(cible, 'utf8'))) throw new Error(sortie + ' : périmètre accepté, il ne se régénère pas (même hors du manifeste)');"), 'refus');
p = rep(p, "  const { canon, journal } = correspondance(root);", "  const { canon, journal, srcById } = correspondance(root);", 'correspondance');
// 2. Les 19 sens du lot 1, lus dans leur rapport arbitré
p = rep(p, "  const les147 = new Set(fiches147);",
  L("  const les147 = new Set(fiches147);",
    "  // Lot 1 du volet 1 : 19 sens, verdicts lus dans le rapport arbitré (troisième source d'état des comparables, après les 377 et les 147)",
    "  const rapLot1 = txt('docs/rapports/etape2-A2-05-coherence-retroactive.md');",
    "  const lot1Date = (rapLot1.match(/^\\*\\*Statut\\*\\* : \\*\\*arbitré le (\\d{4}-\\d{2}-\\d{2})/m) ?? [])[1]; if (!lot1Date) throw new Error('lot 1 : rapport non arbitré');",
    "  const lot1 = new Map([...rapLot1.matchAll(/^#### `((?:hj_)?v_\\d+_s\\d+)` · .* — \\*\\*(conforme|écart \\(E\\d\\))\\*\\*$/gm)].map((m) => [m[1], m[2]]));",
    "  if (lot1.size !== 19) throw new Error('lot 1 : ' + lot1.size + ' fiches lues, 19 attendues');"), 'lot 1');
// 3. État d'un comparable : base inchangée, complétée par le lot 1
p = rep(p, "  const etat = (id) => { const l = livraisonDe.get(id); if (l) return livs.includes(l) ? '**' + nom + '**' : l + (etatDe.get(id) === 'arbitré' ? ' (arbitrée)' : etatDe.get(id) === 'proposé' ? ' (proposée)' : ' (non arbitrée)'); return les147.has(id) ? 'volet 2 (147, arbitré)' : 'hors des 377 et des 147'; };",
  L("  const etatBase = (id) => { const l = livraisonDe.get(id); if (l) return livs.includes(l) ? '**' + nom + '**' : l + (etatDe.get(id) === 'arbitré' ? ' (arbitrée)' : etatDe.get(id) === 'proposé' ? ' (proposée)' : ' (non arbitrée)'); return les147.has(id) ? 'volet 2 (147, arbitré)' : 'hors des 377 et des 147'; };",
    "  const etat = (id) => { const b = etatBase(id); if (!lot1.has(id)) return b; const l1 = 'volet 1, lot 1 (' + lot1.get(id) + ', arbitré)'; return livraisonDe.has(id) || les147.has(id) ? b + ' ; ' + l1 : l1; };"), 'état');
// 4. Corrections retenues par unité, avec valeur publiée, valeur retenue et section du bilan
p = rep(p, "  const modifsV2 = new Map(",
  L("  // Corrections retenues, non appliquées : modifications du volet 2 (§2 seulement), V1-n, V2-n ; unité, champ, valeur publiée, valeur retenue, section",
    "  const corrRetenues = []; let section = '';",
    "  for (const l of bilanCorr.split(LF)) {",
    "    const h = l.match(/^#{2,3} (\\d+(?:\\.\\d+)*)\\.? /); if (h) { section = '§' + h[1]; continue; }",
    "    const k = l.split('|').map((x) => x.trim()); if (!/^(V[12]-\\d+|\\d+)$/.test(k[1] ?? '') || !/^`(?:hj_)?v_\\d+(?:_s\\d+)?`$/.test(k[2] ?? '')) continue;",
    "    const num = /^\\d+$/.test(k[1]); if (num && section !== '§2') continue; const v2 = k[1].startsWith('V2-');",
    "    corrRetenues.push({ n: num ? 'modification n°' + k[1] + ' du volet 2' : k[1], unite: k[2].slice(1, -1), champ: v2 ? k[5] : k[6], publiee: v2 ? null : k[7], retenue: v2 ? k[6] : k[8], section });",
    "  }",
    "  if (corrRetenues.filter((c) => c.n.startsWith('modification')).length !== 10) throw new Error('bilan : liste fermée des dix modifications du volet 2 non retrouvée');",
    "  if (new Set(corrRetenues.map((c) => c.n)).size !== corrRetenues.length) throw new Error('bilan : numéro de correction en double');",
    "  const corrDe = (id) => { const eid = id.replace(/_s\\d+$/, ''); const ids = identifiantsCites(eid, canon.get(eid)); return corrRetenues.filter((c) => c.unite === id || ids.includes(c.unite) || ids.some((x) => c.unite === x + id.slice(eid.length))); };",
    "  // Valeur publiée : celle du tableau (V1-n, modifications) ; pour une V2-n (nuance), lue dans l'état publié, au niveau de l'unité (sens ou ENTRY)",
    "  const pubDe = new Map([...canon].map(([pub, src]) => [src.replace(/^n5_/, ''), pub]));",
    "  const publiee = (c) => {",
    "    if (c.publiee !== null) return c.publiee; if (!/nuance/.test(c.champ)) return '(non relevée)';",
    "    const base = c.unite.replace(/_s\\d+$/, ''); const u = (pubDe.get(base) ?? base) + c.unite.slice(base.length);",
    "    const v = u.includes('_s') ? tous.get(u)?.s.nuance : vocab.find((e) => e.id === u)?.nuance; return v ? '« ' + v + ' »' : 'aucune';",
    "  };",
    "  const modifsV2 = new Map("), 'corrections');
// 5. Relevés du criblage touchés par une correction retenue (remplace le relevé limité aux modifications du volet 2)
p = rep(p, "  const viaModif = [...cites.keys()].filter((id) => modifsV2.has(id)); if (viaModif.length) risques.push('**Rapprochements du criblage fondés sur une valeur que la liste globale corrige déjà** : ' + viaModif.map((id) => tous.get(id).e.word + ' (`' + id + '`, modification n°' + modifsV2.get(id) + ' du volet 2, retenue, non appliquée)').join(', ') + '.');",
  L("  // Relevés du criblage dont une valeur est déjà corrigée (retenue, non appliquée) : sens nommés par le relevé (toute correction, en disant si elle",
    "  // touche le champ du critère) et membres de la catégorie ou de la famille source du relevé (corrections du champ du critère seulement).",
    "  // Les relevés sont conservés tels quels, jamais recalculés.",
    "  const CRITERES = { 'C1-a': /category|meaning/, 'C3-b': /semantic_type|meaning/, 'C3-c': /semantic_type/, 'C3-d': /semantic_type|category/, 'C5-0': /dimension/, 'C8-b': /tags|category/, 'C8-c': /tags/ };",
    "  const critere = (g) => CRITERES[g] ?? (/^C1-/.test(g) ? /category/ : null);",
    "  const familleDe = (x) => { const t = tous.get(x); const so = t && srcById.get(canon.get(t.e.id)); return so ? [so.category + ' / ' + so.subcategory, t.e.linguistic.grammatical_class, t.s.semantic_type] : null; };",
    "  const touches = [];",
    "  for (const f of fiches) for (const g of f.c.regles) {",
    "    const re = critere(g.regle); const nommes = [...new Set([...g.detail.matchAll(/(?:hj_)?v_\\d+_s\\d+/g)].map((m) => m[0]))].filter((x) => x !== f.id && tous.has(x));",
    "    const catM = g.detail.match(/catégorie « ([^»]+) »/); const famM = g.detail.match(/famille source « ([^»]+) »/); const fam = famM ? famM[1].split(' | ').map((x) => x.trim()) : null;",
    "    const pop = [...tous.keys()].filter((x) => x !== f.id && ((catM && tous.get(x).s.category && cat(tous.get(x).s.category) === catM[1].trim()) || (fam && familleDe(x) && fam.every((v, i) => familleDe(x)[i] === v))));",
    "    for (const x of [...new Set([...nommes, ...pop])]) for (const c of corrDe(x)) {",
    "      const sur = re ? re.test(c.champ) : false; if (!nommes.includes(x) && !sur) continue;",
    "      touches.push(f.e.word + ' `' + g.regle + '` : ' + tous.get(x).e.word + ' (`' + x + '`, ' + c.n + ', ' + c.champ + (sur ? ', **champ du critère**' : ', autre champ que le critère') + (nommes.includes(x) ? ', nommé par le relevé' : ', membre de ' + (catM ? 'la catégorie' : 'la famille source') + ' du relevé') + ')');",
    "    }",
    "  }",
    "  if (touches.length) risques.push('**Relevés du criblage dont une valeur est déjà corrigée** (correction retenue, non appliquée ; relevés conservés tels quels, non recalculés, sans jugement ; détail des valeurs au §4.3) : ' + touches.join(' ; ') + '.');"), 'relevés touchés');
// 6. §4.3 : corrections retenues des comparables, valeur publiée et valeur retenue distinguées
p = rep(p, "  const blocF = autresLiv.filter((id) => livraisonDe.get(id)[0] === 'F');",
  L("  const blocF = autresLiv.filter((id) => livraisonDe.get(id)[0] === 'F');",
    "  const compIds = [...new Set([...cites.keys(), ...memes.map(({ s }) => s.id)])].filter((id) => !entrees.some((f) => id.startsWith(f.e.id + '_s')));",
    "  const corrComp = compIds.flatMap((id) => corrDe(id).map((c) => ({ id, c })));",
    "  // Sens du lot 1 parmi tout ce que le périmètre affiche (comparables nommés, mêmes catégories, autres sens des mêmes ENTRY)",
    "  const lot1Comp = [...new Set([...cites.keys(), ...memes.map(({ s }) => s.id), ...autresSens.map(({ y }) => y.id)])].filter((id) => lot1.has(id));"), 'comparables corrigés');
p = rep(p, "  for (const { e, s } of memes) P.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + etat(s.id) + ' |');",
  L("  for (const { e, s } of memes) P.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + etat(s.id) + ' |');",
    "  P.push('', '**4.3 Corrections retenues, non appliquées, sur les comparables** (' + corrComp.length + ' ; hors des ENTRY de ' + nom + ', dont les corrections sont au §6.1) : la valeur publiée est celle des données ; la valeur retenue n\\'est pas appliquée.', '', '| Sens | Mot | Correction | Unité | Champ | Valeur publiée | Valeur retenue, non appliquée | Provenance | État |', '|---|---|---|---|---|---|---|---|---|');",
    "  for (const { id, c } of corrComp) P.push('| `' + id + '` | ' + tous.get(id).e.word + ' | ' + c.n + ' | `' + c.unite + '` | ' + c.champ + ' | ' + publiee(c) + ' | ' + c.retenue + ' | bilan du volet 2, ' + c.section + ' | ' + etat(id) + ' |');",
    "  if (!corrComp.length) P.push('| — | — | aucune | — | — | — | — | — | — |');"), '§4.3');
// 7. Contrôles et retour
p = rep(p, "  P.push('| Manifeste d\\'empreintes | ' + emp.controles + ' rapports identiques |');",
  L("  P.push('| Manifeste d\\'empreintes | ' + emp.controles + ' rapports identiques |');",
    "  P.push('| Sens du lot 1 du volet 1 (rapport arbitré le ' + lot1Date + ') | ' + lot1.size + ' lus ; parmi les comparables : ' + (lot1Comp.length ? lot1Comp.map((id) => tous.get(id).e.word + ' (`' + id + '`, ' + lot1.get(id) + ')').join(', ') : 'aucun') + ' |');",
    "  P.push('| Corrections retenues lues dans le bilan | ' + corrRetenues.length + ' (10 modifications du volet 2, ' + corrRetenues.filter((c) => c.n.startsWith('V1-')).length + ' V1-n, ' + corrRetenues.filter((c) => c.n.startsWith('V2-')).length + ' V2-n) ; sur les comparables (§4.3) : ' + corrComp.length + ' |');"), 'contrôles');
p = rep(p, "risques: risques.length, decisions:",
  "risques: risques.length, lot1Comparables: lot1Comp.map((id) => [id, etat(id)]), correctionsComparables: corrComp.map(({ id, c }) => [id, c.n, c.section, publiee(c), c.retenue]), corrRetenues: corrRetenues.length, touches, decisions:", 'retour');

mkdirSync(join(OUT, 'proposition'), { recursive: true }); mkdirSync(join(OUT, 'diffs'), { recursive: true });
writeFileSync(join(OUT, 'proposition', 'perimetre-v2.mjs'), p);
const d = mkdtempSync(join(tmpdir(), 'cc-')); writeFileSync(join(d, 'a'), readFileSync(join(W, 'perimetre-v2.mjs'), 'utf8')); writeFileSync(join(d, 'b'), p);
const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8' });
if (r.status !== 1) throw new Error('git diff code ' + r.status);
writeFileSync(join(OUT, 'diffs', 'perimetre-v2.mjs.diff'), r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/a2-05-travail/perimetre-v2.mjs\n+++ b/a2-05-travail/perimetre-v2.mjs\n'));
console.log('perimetre-v2.mjs : version proposée et différence écrites');
