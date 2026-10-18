// A2-05 · volet 1 · lot 3 : inventaire documentaire des sens restants, pour l'étude de méthode. Lecture seule.
// N'ouvre aucune fiche source pour la juger (seule sa taille est mesurée), ne juge aucun sens, ne décide rien, ne modifie pas le découpage.
// Usage : node inventaire-v1-lot3-restants.mjs <racine du dépôt>   (écrit docs/rapports/etape2-A2-05-volet1-lot3-inventaire-restants.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const LF = String.fromCharCode(10);
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, LF);
const read = (p) => JSON.parse(txt(p));
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const tous = new Map(vocab.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const sourcesHj = read('reconstruction/a2-04/sources/vocab-hors-jlpt.json');
// Une ENTRY hors JLPT est publiée sous un identifiant v_…, sa fiche source et son lot sous hj_v_… : résolution par le mot, correspondance unique exigée
const exceptions = [];
const source = (e) => {
  if (sources.has('n5_' + e.id)) return { sid: 'n5_' + e.id, src: sources.get('n5_' + e.id) };
  const hj = sourcesHj.filter((s) => s.word === e.word);
  if (hj.length !== 1) throw new Error(e.id + ' : fiche source introuvable (' + hj.length + ' correspondance(s) hors JLPT)');
  exceptions.push(e.id + ' (' + e.word + ') → ' + hj[0].id);
  return { sid: hj[0].id, src: hj[0] };
};
const anciens = read('reconstruction/a2-04/sources/exemples.json');
const candidats = new Map(read('a2-05-travail/criblage/resultat.json').candidats.map((c) => [c.id, c]));
const journal = read('reconstruction/a2-04/journal.json');
const perimetre = txt(R + 'perimetre.md');
const bilanV2 = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fonctions = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];

// Découpage arbitré du lot 3 (§5 et §6 du périmètre) ; aucune ligne n'est modifiée
const lignes = [...perimetre.matchAll(/^\| \d+ \| ([A-F]\d+) \| `((?:hj_)?v_\d+_s\d+)` \|.*$/gm)].map((m) => ({ l: m[1], id: m[2] }));
if (lignes.length !== 377 || new Set(lignes.map((x) => x.id)).size !== 377) throw new Error('périmètre : 377 candidats distincts attendus');
const livDef = new Map([...perimetre.matchAll(/^\| ([A-F]\d+) \| ([A-F]) \| ([^|]+) \| (\d+) \| (\d+) \| ([^|]+) \|$/gm)].map((m) => [m[1], { motif: m[3].trim(), sens: +m[4], entry: +m[5] }]));
if (livDef.size !== 40) throw new Error('périmètre : 40 livraisons attendues, lues ' + livDef.size);
const arbitre = (l) => { try { return /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt(R + l + '.md')); } catch { return false; } };
const livraisons = [...livDef.keys()];
const arbitrees = livraisons.filter(arbitre);
const ATTENDU = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'];
if (arbitrees.join() !== ATTENDU.join()) throw new Error('livraisons arbitrées inattendues : ' + arbitrees.join());
const restants = lignes.filter((x) => !arbitrees.includes(x.l));
if (restants.length !== 229) throw new Error('229 sens restants attendus, lus ' + restants.length);

const corr = (eid) => bilanV2.split(LF).filter((l) => /^\| V[12]-\d+ \|/.test(l) && (l.includes('`' + eid + '`') || l.includes('`' + eid + '_'))).map((l) => l.split('|')[1].trim());
const fiches = restants.map((x) => {
  const t = tous.get(x.id); const c = candidats.get(x.id); if (!t || !c) throw new Error(x.id + ' : hors des données ou du criblage');
  const { sid, src } = source(t.e);
  const taille = JSON.stringify(src).length + JSON.stringify(anciens.vocab?.[sid] ?? []).length;
  return { ...x, ...t, c, regles: c.regles.map((g) => g.regle), dec: journal.filter((d) => d.entry === sid).length, corr: corr(t.e.id), taille, fn: fonctions(t.s), autres: t.e.senses.length - 1 };
});
// Contrôles : chaque sens restant une fois, chaque livraison restante complète
for (const l of livraisons.filter((l) => !arbitrees.includes(l))) { const n = fiches.filter((f) => f.l === l).length; if (n !== livDef.get(l).sens) throw new Error(l + ' : ' + n + ' sens lus, ' + livDef.get(l).sens + ' attendus'); }

const BLOCS = { B: 'catégories et types posés (C1, C3)', C: 'tags, dimensions et justifications datées (C8, C5, C10)', D: 'fonctions, et `null` portés par une fonction (C2, C4, C7)', E: 'points réservés par les lots', F: 'interrogatifs, **suspendu au préalable E5**' };
const P = [];
P.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — inventaire documentaire des sens restants', '');
P.push('**Date** : 2026-10-18');
P.push("**Statut** : **document d'étude, sans décision.** Écrit par `a2-05-travail/inventaire-v1-lot3-restants.mjs`, en lecture seule, à partir du périmètre arbitré du lot 3 (découpage des 377 en six blocs et 40 livraisons, 2026-10-12), du résultat du criblage, de l'état publié, du journal et de la liste globale des corrections. **Aucun sens n'est jugé, aucune fiche source n'est lue pour être évaluée (seule sa taille est mesurée), le découpage n'est pas modifié, aucun périmètre de livraison n'est proposé.** Il éclaire l'étude de méthode (`docs/rapports/etape2-A2-05-etude-methode.md`).", '');
P.push('## 1. Où en est le lot 3', '');
P.push('**' + (377 - restants.length) + ' sens arbitrés sur 377** (livraisons ' + arbitrees.join(', ') + ') ; **' + restants.length + ' restent**, dans **' + new Set(fiches.map((f) => f.e.id)).size + ' ENTRY** et **' + new Set(fiches.map((f) => f.l)).size + ' livraisons** du découpage arbitré (contrôle du script : chaque sens restant y figure une fois, et chaque livraison restante est complète).', '');
P.push('| Bloc | Question directrice (périmètre du lot 3, §4) | Sens restants | ENTRY | Livraisons restantes |', '|---|---|---|---|---|');
for (const b of ['B', 'C', 'D', 'E', 'F']) { const fb = fiches.filter((f) => f.l[0] === b); P.push('| ' + b + ' | ' + BLOCS[b] + ' | ' + fb.length + ' | ' + new Set(fb.map((f) => f.e.id)).size + ' | ' + [...new Set(fb.map((f) => f.l))].join(', ') + ' |'); }
P.push('| **Total** | | **' + fiches.length + '** | **' + new Set(fiches.map((f) => f.e.id)).size + '** | **' + new Set(fiches.map((f) => f.l)).size + '** |', '');
P.push('## 2. Les livraisons restantes, telles que le découpage arbitré les définit', '');
P.push("Indicateurs mesurés, sans jugement : **règles** du criblage qui désignent les sens ; **fonctions** publiées ; **décisions** de journal des ENTRY ; **corrections** déjà retenues sur ces ENTRY ; **taille** cumulée des fiches sources et de leurs anciens exemples (en milliers de caractères JSON), indice du volume de lecture ; **autres sens** des mêmes ENTRY, hors de la livraison.", '');
P.push('| Livraison | Thème ou motif (découpage arbitré) | Sens | ENTRY | Règles | Sens avec fonction | Décisions | Corrections retenues | Taille des fiches (k) | Autres sens des ENTRY |', '|---|---|---|---|---|---|---|---|---|---|');
for (const l of livraisons.filter((x) => !arbitrees.includes(x))) {
  const fl = fiches.filter((f) => f.l === l); const ent = [...new Map(fl.map((f) => [f.e.id, f])).values()];
  const regles = [...new Set(fl.flatMap((f) => f.regles))].sort();
  const motif = livDef.get(l).motif.length > 160 ? livDef.get(l).motif.slice(0, 157) + '…' : livDef.get(l).motif;
  P.push('| ' + l + ' | ' + motif + ' | ' + fl.length + ' | ' + ent.length + ' | ' + regles.join(', ') + ' | ' + fl.filter((f) => f.fn.length).length + ' | ' + ent.reduce((n, f) => n + f.dec, 0) + ' | ' + [...new Set(fl.flatMap((f) => f.corr))].length + ' | ' + Math.round(ent.reduce((n, f) => n + f.taille, 0) / 1000) + ' | ' + ent.reduce((n, f) => n + f.autres, 0) + ' |');
}
P.push('', '## 3. Les sens restants, livraison par livraison', '');
P.push("Valeurs publiées, sans jugement ; l'état de chaque sens reste celui du commit `3d67594`.", '');
for (const l of livraisons.filter((x) => !arbitrees.includes(x))) {
  P.push('**' + l + '** (' + livDef.get(l).motif + ') :', '', '| Sens | Mot | Traduction | Catégorie publiée | Type | Fonctions | Règles |', '|---|---|---|---|---|---|---|');
  for (const f of fiches.filter((x) => x.l === l)) P.push('| `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + (f.fn.length ? f.fn.map((y) => '`' + y + '`').join(', ') : '—') + ' | ' + f.regles.join(', ') + ' |');
  P.push('');
}
const tailles = fiches.map((f) => f.taille).sort((a, b) => a - b);
P.push('## 4. Limites et dépendances, relevées sans les trancher', '');
P.push('- **Bloc F (' + fiches.filter((f) => f.l[0] === 'F').length + " sens)** : suspendu au préalable normatif E5 (`interrogatif`), ni adopté ni normatif ; il ne peut entrer dans aucune livraison avant l'adoption de l'addendum et l'accord sur un périmètre opérationnel. **Sens restants hors du bloc F : " + fiches.filter((f) => f.l[0] !== 'F').length + '.**');
P.push('- **Bloc E (' + fiches.filter((f) => f.l[0] === 'E').length + ' sens)** : points que les lots ont explicitement renvoyés à A2-05 (deixis temporelle, emplois d\'adresse, sous-catégories absentes, tags) ; chaque motif est une question normative ou documentaire propre.');
P.push('- **Bloc D (' + fiches.filter((f) => f.l[0] === 'D').length + ' sens)** : application d\'A7 et d\'A9 sens par sens ; ' + fiches.filter((f) => f.l[0] === 'D' && f.fn.length).length + ' sens portent déjà une fonction publiée.');
P.push('- **Sens dont l\'ENTRY porte d\'autres sens hors de la livraison** : ' + fiches.filter((f) => f.autres).length + ' sur ' + fiches.length + ' ; ils obligent à lire des comparables dans la même ENTRY sans les juger.');
P.push('- **ENTRY hors JLPT, publiées sous un autre identifiant que leur fiche source** : ' + (exceptions.length ? exceptions.join(' ; ') + " ; leur fiche et leur lot portent l'identifiant `hj_v_…`. **Le module commun des livraisons (`lot3-commun.mjs`) cherche la fiche sous `n5_` suivi de l'identifiant publié : il s'arrêterait sur ces sens** ; constat technique pour l'étude de méthode, sans modification du module." : 'aucune.'));
P.push('- **Corrections déjà retenues sur les ENTRY restantes** : ' + [...new Set(fiches.flatMap((f) => f.corr))].length + ' (non rouvertes, non appliquées).');
P.push('- **Volume de lecture** : taille médiane d\'une fiche avec ses anciens exemples, ' + Math.round(tailles[Math.floor(tailles.length / 2)] / 100) / 10 + ' k caractères ; plus grande, ' + Math.round(tailles.at(-1) / 100) / 10 + ' k.');
P.push('- **Fermés, et non touchés par cet inventaire** : QC-1, QC-2, HP-1 à HP-4, G1 à G7, le bloc F, E5, le balayage global des relations, l\'application des 185 corrections.', '');
const t = P.join(LF) + LF; if (/ +$/m.test(t)) throw new Error('espace en fin de ligne');
writeFileSync(join(root, R + 'inventaire-restants.md'), t);
console.log('inventaire : ' + fiches.length + ' sens restants, ' + new Set(fiches.map((f) => f.e.id)).size + ' ENTRY, ' + new Set(fiches.map((f) => f.l)).size + ' livraisons ; arbitrés : ' + (377 - fiches.length));
