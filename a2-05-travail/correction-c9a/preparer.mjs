// A2-05 : résolution proposée de l'incident C9a, option A (proposition, NON appliquée ; décision du 2026-10-22).
// Usage : node a2-05-travail/correction-c9a/preparer.mjs <racine du dépôt>
// Lit empreintes-lot3.mjs et controle-relais-allege.mjs SANS les modifier ; écrit leurs versions proposées (proposition/) et les différences
// exactes (diffs/), par remplacements ciblés à occurrence unique. N'ajoute rien au manifeste d'empreintes.
// Règle (option A) : un périmètre accepté peut être protégé seul tant que le rapport de sa tranche n'est pas arbitré ; un rapport arbitré exige
// son périmètre protégé, inscrit avant lui ou avec lui ; aucune entrée étrangère, aucun doublon, aucune omission ; une seule règle, partagée
// par le contrôle C9a du relais et par l'ajout contrôlé au manifeste (--ajouter).
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), OUT = join(W, 'correction-c9a');
const rep = (t, a, b, nom) => { const n = t.split(a).length - 1; if (n !== 1) throw new Error(nom + ' : ' + n + ' occurrence(s) de « ' + a.slice(0, 60) + ' »'); return t.replace(a, () => b); };
const L = (...l) => l.join('\n');

// 1. empreintes-lot3.mjs : la règle des entrées de tranche, et son application à l'ajout contrôlé
let e = readFileSync(join(W, 'empreintes-lot3.mjs'), 'utf8');
e = rep(e, "// Usage : node empreintes-lot3.mjs <racine du dépôt> [--ecrire]",
  L("// Entrées de tranche (option A, décision du 2026-10-22) : un périmètre accepté peut être protégé seul tant que le rapport de sa tranche n'est",
    "// pas arbitré ; un rapport arbitré exige son périmètre protégé (anomaliesTranches, partagée avec le contrôle C9a du relais).",
    "// Usage : node empreintes-lot3.mjs <racine du dépôt> [--ecrire]"), 'en-tête');
e = rep(e, "if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {",
  L("export const TRANCHE = /^docs\\/rapports\\/etape2-A2-05-volet1-lot3-(T\\d+)(-perimetre)?\\.md$/;",
    "",
    "/** Anomalies des entrées de tranche d'un manifeste m, par rapport aux entrées de base (déjà admises) ; brut : texte du manifeste, pour les",
    " *  clés en double. Un périmètre accepté peut être protégé seul tant que le rapport de sa tranche n'est pas arbitré ; un rapport arbitré exige",
    " *  son périmètre protégé, inscrit avant lui ou avec lui ; aucune entrée étrangère ; aucun doublon ; aucune omission ; ajouts datés en ordre. */",
    "export function anomaliesTranches(root, m, base, brut) {",
    "  const a = []; const cles = Object.keys(m.empreintes);",
    "  const statut = (p) => (existsSync(join(root, p)) ? (readFileSync(join(root, p), 'utf8').match(/^\\*\\*Statut\\*\\* : \\*\\*(arbitré le |périmètre accepté le )/m) ?? [])[1] ?? 'autre' : 'absent');",
    "  if (brut !== null) { const n = [...brut.matchAll(/^\\s*\"([^\"]+)\": \"[0-9a-f]{64}\"/gm)].length; if (n !== cles.length) a.push('clé en double dans le manifeste (' + n + ' empreintes écrites, ' + cles.length + ' clés distinctes)'); }",
    "  const ordre = new Map(); const dates = (m.ajouts ?? []).map((x) => x.date);",
    "  (m.ajouts ?? []).forEach((x, i) => { for (const p of x.chemins) { if (ordre.has(p)) a.push(p + ' : inscrit deux fois dans les ajouts'); else ordre.set(p, i); } });",
    "  if (dates.some((d, i) => i && d < dates[i - 1])) a.push('ajouts : dates hors d\\'ordre (' + dates.join(', ') + ')');",
    "  for (const p of ordre.keys()) if (!Object.hasOwn(m.empreintes, p)) a.push(p + ' : inscrit dans les ajouts, absent des empreintes (omission)');",
    "  for (const p of cles.filter((x) => !base.has(x))) {",
    "    const t = p.match(TRANCHE); if (!t) { a.push(p + ' : entrée étrangère (ni rapport ni périmètre de tranche)'); continue; }",
    "    if (!ordre.has(p)) a.push(p + ' : entrée nouvelle non inscrite dans les ajouts');",
    "    const rap = R + t[1] + '.md', per = R + t[1] + '-perimetre.md';",
    "    if (t[2]) {",
    "      if (statut(p) !== 'périmètre accepté le ') a.push(p + ' : périmètre protégé sans le statut « périmètre accepté le » (' + statut(p) + ')');",
    "      if (statut(rap) === 'arbitré le ' && !Object.hasOwn(m.empreintes, rap)) a.push(rap + ' : rapport arbitré hors du manifeste, alors que son périmètre y est (omission)');",
    "    } else {",
    "      if (statut(p) !== 'arbitré le ') a.push(p + ' : rapport protégé sans le statut « arbitré le » (' + statut(p) + ')');",
    "      if (!Object.hasOwn(m.empreintes, per)) a.push(p + ' : rapport arbitré sans son périmètre protégé');",
    "      else if (!base.has(per) && ordre.has(p) && ordre.has(per) && ordre.get(per) > ordre.get(p)) a.push(p + ' : rapport inscrit avant son périmètre');",
    "    }",
    "  }",
    "  return a;",
    "}",
    "",
    "if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {"), 'règle');
e = rep(e, "    for (const p of nouveaux) m.empreintes[p] = sha(root, p);\n    m.ajouts = [...(m.ajouts ?? []), { date: new Date().toISOString().slice(0, 10), chemins: nouveaux }];",
  L("    const avant = new Set(Object.keys(m.empreintes)); const sain = anomaliesTranches(root, m, avant, readFileSync(join(root, MANIFESTE), 'utf8'));",
    "    if (sain.length) throw new Error('manifeste existant non conforme, aucun ajout : ' + sain.join(' ; '));",
    "    for (const p of nouveaux) m.empreintes[p] = sha(root, p);",
    "    m.ajouts = [...(m.ajouts ?? []), { date: new Date().toISOString().slice(0, 10), chemins: nouveaux }];",
    "    const an = anomaliesTranches(root, m, avant, null); if (an.length) throw new Error('ajout refusé, rien n\\'est écrit : ' + an.join(' ; '));"), 'ajout contrôlé');

// 2. controle-relais-allege.mjs : C9a applique la même règle (entrées nouvelles par rapport au manifeste de HEAD)
let c = readFileSync(join(W, 'controle-relais-allege.mjs'), 'utf8');
c = rep(c, "import { rapportsArbitres, MANIFESTE } from './empreintes-lot3.mjs';", "import { rapportsArbitres, MANIFESTE, TRANCHE, anomaliesTranches } from './empreintes-lot3.mjs';", 'import');
c = rep(c, "// arbitrés (rapport « arbitré le », périmètre « périmètre accepté le »), par paires, inscrits dans les ajouts ; aucun rapport arbitré hors manifeste",
  L("// arbitrés (rapport « arbitré le », périmètre « périmètre accepté le »), inscrits dans les ajouts ; aucun rapport arbitré hors manifeste ;",
    "// option A (décision du 2026-10-22) : un périmètre accepté peut précéder le rapport de sa tranche, jamais l'inverse (anomaliesTranches)"), 'commentaire');
c = rep(c, "const nouv = Object.keys(mReel.empreintes).filter((p) => !Object.hasOwn(mHead ?? {}, p)), inscrits = new Set((mReel.ajouts ?? []).flatMap((a) => a.chemins));",
  "const nouv = Object.keys(mReel.empreintes).filter((p) => !Object.hasOwn(mHead ?? {}, p));", 'nouvelles');
c = rep(c, "const tr = (p) => p.match(/^docs\\/rapports\\/etape2-A2-05-volet1-lot3-(T\\d+)(-perimetre)?\\.md$/);\nconst nouvHors = nouv.filter((p) => { const m = tr(p); return !m || !inscrits.has(p) || !arbR?.includes(p) || !new RegExp('^\\\\*\\\\*Statut\\\\*\\\\* : \\\\*\\\\*' + (m[2] ? 'périmètre accepté le ' : 'arbitré le '), 'm').test(lire(p)) || !nouv.includes('docs/rapports/etape2-A2-05-volet1-lot3-' + m[1] + (m[2] ? '' : '-perimetre') + '.md'); });",
  L("const tr = (p) => p.match(TRANCHE);",
    "const nouvHors = mHead ? anomaliesTranches(root, mReel, new Set(Object.keys(mHead)), lire(MANIFESTE)) : ['manifeste de HEAD illisible'];"), 'règle C9a');
c = rep(c, "ok('C9a', 'couverture et empreintes du manifeste réel (calculerEtat sans refus) ; entrées de HEAD inchangées ; entrées nouvelles = rapports de tranche arbitrés et périmètres acceptés',",
  "ok('C9a', 'couverture et empreintes du manifeste réel (calculerEtat sans refus) ; entrées de HEAD inchangées ; entrées nouvelles = rapports de tranche arbitrés et périmètres acceptés (un périmètre accepté peut précéder son rapport)',", 'libellé');
c = rep(c, "(nouvHors.length ? ' ; non conformes : ' + nouvHors.join(', ') : '')", "(nouvHors.length ? ' ; anomalies : ' + nouvHors.join(' ; ') : '')", 'détail');

mkdirSync(join(OUT, 'proposition'), { recursive: true }); mkdirSync(join(OUT, 'diffs'), { recursive: true });
for (const [m, t] of [['empreintes-lot3.mjs', e], ['controle-relais-allege.mjs', c]]) {
  writeFileSync(join(OUT, 'proposition', m), t);
  const d = mkdtempSync(join(tmpdir(), 'c9a-')); writeFileSync(join(d, 'a'), readFileSync(join(W, m), 'utf8')); writeFileSync(join(d, 'b'), t);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8' });
  if (r.status !== 1) throw new Error(m + ' : git diff code ' + r.status);
  writeFileSync(join(OUT, 'diffs', m + '.diff'), r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/a2-05-travail/' + m + '\n+++ b/a2-05-travail/' + m + '\n'));
}
console.log('C9a : versions proposées et différences écrites (empreintes-lot3.mjs, controle-relais-allege.mjs)');
