// A2-05 · bloc F : dossier d'audit des 17 sens (15 ENTRY), pour lecture. Réunit, ENTRY par ENTRY, dans l'ordre du découpage : la fiche source complète,
// ses anciens exemples, l'ENTRY publiée, toutes ses décisions historiques (42, dont les 17 `type-nul`) et les corrections retenues (9, toutes de `nuance`).
// AUCUN VERDICT : la grille de chaque sens est vide ; l'audit s'ouvre sur autorisation distincte. Lecture seule, sauf le dossier écrit.
// Usage : node a2-05-travail/audit-F/preparer-dossier-F.mjs <racine du dépôt>. Code 1 si un décompte diffère.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { charger, construirePopulation, sourceDe } from '../perimetre-F-operationnel/omissions.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const SORTIE = 'a2-05-travail/audit-F/dossier-F.md';
const D = charger(root); const ex = JSON.parse(txt('reconstruction/a2-04/sources/exemples.json')).vocab;
const dec = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md'); const bil = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
const F = [...dec.matchAll(/^\| ([0-9]+) \| (F[12]) \| `(v_[0-9]+_s[0-9]+)` \|/gm)].map((m) => ({ n: +m[1], liv: m[2], id: m[3] }));
const { porteurs } = construirePopulation(D); const sens = new Map(porteurs.map((p) => [p.id, p]));
const b8 = bil.replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '').split('\n').filter((l) => /^\| V[12]-[0-9]+ \|/.test(l));
const corrDe = (e) => b8.filter((l) => { const c = l.split('|')[2]?.trim().replaceAll('`', ''); return c === e || c.startsWith(e + '_s'); });
const src = new Map(D.sources.map((s) => [s.id, s]));
const bloc = (o) => { const t = JSON.stringify(o, null, 1); const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + 'json\n' + t + '\n' + f; };

const entrees = [...new Set(F.map((l) => l.id.replace(/_s[0-9]+$/, '')))];
let nDec = 0, nTN = 0, nCorr = 0, nEx = 0;
const P = ['# Étape 2 · A2-05 · Volet 1 · Lot 3 — dossier d\'audit du bloc F (17 sens, 15 ENTRY)', '',
  '**Date** : 2026-11-03', '**Statut** : **dossier de lecture préparatoire, sans verdict.** Généré par `a2-05-travail/audit-F/preparer-dossier-F.mjs`. L\'audit s\'ouvre sur autorisation distincte ; la grille de chaque sens est vide.', '',
  '**Cadre** : A10 (`docs/conception/addendum-A10-interrogatif.md`) ; périmètre opérationnel accepté le 2026-11-03 (`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`, §0) : une seule livraison F, deux verdicts par sens (`interrogatif` selon A10 ; `type-nul` selon A6), catégories examinées selon les règles ordinaires, sans présumer d\'erreur. Questions Q1 à Q6 : périmètre, §4.', '',
  '**Contenu, par ENTRY, dans l\'ordre du découpage** : fiche source complète (traductions, nuance, exemple) ; anciens exemples (`reconstruction/a2-04/sources/exemples.json`, lecture seule) ; ENTRY publiée (`data/`) ; décisions historiques complètes (`reconstruction/a2-04/journal.json`), aucune réécrite ; corrections retenues non appliquées (bilan du volet 2, §8), à lire avec la nuance publiée.', '',
  '**Décision de frontière citée** (hors des 17, pour mémoire) : D0724 (誰か), « ' + D.journal.find((d) => d.id === 'A2-04-D0724').reason + ' » ; 聞く et 質問, arbitrés en B2 et B3, ne sont pas rouverts.', ''];
entrees.forEach((e, k) => {
  const lignes = F.filter((l) => l.id.startsWith(e + '_s')); const E = sens.get(lignes[0].id).e; const s0 = sourceDe(e);
  const ds = D.journal.filter((d) => d.entry === s0); nDec += ds.length; const tn = ds.filter((d) => d.kind === 'type-nul'); nTN += tn.length;
  const cs = corrDe(e); nCorr += cs.length; const xs = ex[s0] ?? []; nEx += xs.length;
  P.push('## ' + (k + 1) + '. ' + E.word + ' — `' + e + '` (ligne' + (lignes.length > 1 ? 's ' : ' ') + lignes.map((l) => l.n).join(', ') + ' ; ' + lignes.map((l) => '`' + l.id + '`').join(', ') + ')', '',
    '### Fiche source `' + s0 + '`', '', bloc(src.get(s0)), '',
    '### Anciens exemples (' + xs.length + ')', '', xs.length ? bloc(xs) : 'Aucun.', '',
    '### ENTRY publiée', '', bloc(E), '',
    '### Décisions historiques (' + ds.length + ', dont ' + tn.length + ' `type-nul`)', '',
    ...ds.flatMap((d) => ['- **' + d.id.replace('A2-04-', '') + '** · ' + d.kind + ' · ' + d.field + ' · ' + d.status + ' · lot ' + d.lot + (d.kind === 'type-nul' ? ' · **à examiner selon A6**' : ''), '  - avant : `' + JSON.stringify(d.before) + '`', '  - après : `' + JSON.stringify(d.after) + '`', '  - raison : « ' + d.reason + ' »']), '',
    '### Corrections retenues, non appliquées (' + cs.length + ')', '', ...(cs.length ? ['| Id | Unité | Champ | … |', '|---|---|---|---|', ...cs] : ['Aucune.']), '',
    '### Grille d\'examen (vide ; à remplir à l\'audit, sur autorisation distincte)', '',
    '| Sens | Q1 rôle | Q2 fiche | Q3 frontières | Q4 cumul | Q5 catégorie | Q6 type (A6) | Verdict `interrogatif` | Verdict `type-nul` |', '|---|---|---|---|---|---|---|---|---|',
    ...lignes.map((l) => '| `' + l.id + '` | — | — | — | — | — | — | — | — |'), '');
});
P.push('## Décomptes', '', '| Élément | Nombre |', '|---|---|', '| Sens | ' + F.length + ' |', '| ENTRY et fiches sources | ' + entrees.length + ' |', '| Anciens exemples | ' + nEx + ' |', '| Décisions historiques | ' + nDec + ' |', '| dont `type-nul` | ' + nTN + ' |', '| Corrections retenues, non appliquées | ' + nCorr + ' |', '| Verdicts | 0 |', '');
const ok = F.length === 17 && entrees.length === 15 && nDec === 42 && nTN === 17 && nCorr === 9 && F.every((l) => sens.has(l.id)) && entrees.every((e) => src.has(sourceDe(e)));
writeFileSync(join(root, SORTIE), P.join('\n'));
console.log((ok ? 'conforme ' : 'ÉCART    ') + 'dossier : ' + F.length + ' sens, ' + entrees.length + ' fiches, ' + nEx + ' anciens exemples, ' + nDec + ' décisions dont ' + nTN + ' type-nul, ' + nCorr + ' corrections ; aucun verdict');
process.exit(ok ? 0 : 1);
