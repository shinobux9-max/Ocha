// A2-05 · bloc F : assemble la note d'export de la livraison F (inscription appliquée ; audit des 17 sens en proposition).
// En-tête écrit à la main ; relais en service ; rapport d'audit ; 15 fiches sources exactes, anciens exemples et ENTRY publiées ;
// 42 décisions brutes ; vérification de l'application (table, manifeste, empreintes des diffs réels et relus, diffs réels, trace) ;
// sorties des contrôles. Lecture seule hors de la note produite ; refuse d'écraser une note existante ; s'arrête sur tout écart de décompte.
// Usage : node a2-05-travail/audit-F/assembler-note-F.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const SORTIE = 'a2-05-travail/note-export-lot3-F-audit.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const AF = 'a2-05-travail/audit-F/', INS = 'a2-05-travail/arbitrage-F/inscription-F/';
const brut = (p) => readFileSync(join(root, p));
const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (b) => createHash('sha256').update(b).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
const json = (o) => clot(JSON.stringify(o, null, 1), 'json');
const arreter = (m) => { throw new Error('ARRÊT : ' + m); };

// Les 15 ENTRY, dans l'ordre du découpage (périmètre opérationnel, §2)
const perim = txt('docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md');
const sens = [...perim.matchAll(/^\| \d+ \| (36[1-9]|37[0-7]) \| F[12] \| `(v_\d+_s\d+)` \|/gm)].map((m) => m[2]);
if (sens.length !== 17) arreter('17 sens attendus, lus ' + sens.length);
const entrees = [...new Set(sens.map((s) => s.replace(/_s\d+$/, '')))];
if (entrees.length !== 15) arreter('15 ENTRY attendues, lues ' + entrees.length);

const sources = JSON.parse(txt('reconstruction/a2-04/sources/vocab.json')); const S = Array.isArray(sources) ? sources : Object.values(sources).find(Array.isArray);
const ex = JSON.parse(txt('reconstruction/a2-04/sources/exemples.json')).vocab;
const pub = JSON.parse(txt('data/n5/vocab.json')); const P = Array.isArray(pub) ? pub : Object.values(pub).find(Array.isArray);
const journal = JSON.parse(txt('reconstruction/a2-04/journal.json')); const J = Array.isArray(journal) ? journal : (journal.decisions ?? Object.values(journal).find(Array.isArray));

let nEx = 0; const p3 = [];
entrees.forEach((e, i) => {
  const id = 'n5_' + e; const f = S.find((x) => x.id === id) ?? arreter('fiche absente : ' + id); const E = P.find((x) => x.id === e) ?? arreter('ENTRY absente : ' + e);
  const xs = ex[id] ?? []; nEx += xs.length;
  p3.push('## 3.' + (i + 1) + ' ' + f.word + ' — fiche `' + id + '` (sens ' + sens.filter((s) => s.startsWith(e + '_s')).map((s) => '`' + s + '`').join(', ') + ')', '',
    '### Fiche source, exacte (`reconstruction/a2-04/sources/vocab.json`)', '', json(f), '',
    '### Anciens exemples (' + xs.length + ', `reconstruction/a2-04/sources/exemples.json`)', '', xs.length ? json(xs) : 'Aucun.', '',
    '### ENTRY publiée (`data/n5/vocab.json`)', '', json(E), '');
});
if (nEx !== 45) arreter('45 anciens exemples attendus, lus ' + nEx);

const ids = new Set(entrees.map((e) => 'n5_' + e)); const dec = J.filter((d) => ids.has(d.entry));
const nTN = dec.filter((d) => d.kind === 'type-nul').length;
if (dec.length !== 42 || nTN !== 17 || dec.some((d) => d.status !== 'validated')) arreter('42 décisions validées dont 17 type-nul attendues : ' + dec.length + ', ' + nTN);

// Vérification de l'application : empreintes des diffs réels et relus
const manif = JSON.parse(txt(INS + 'proposition/manifeste.json')); const cibles = Object.keys(manif).sort();
if (cibles.length !== 10) arreter('dix fichiers visés attendus');
const lignesSha = cibles.map((p) => {
  const n = p.replaceAll('/', '__') + '.diff'; const r = sha(brut(INS + 'application/diffs-reels/' + n)); const l = sha(brut(INS + 'proposition/diffs/' + n)); const a = sha(brut(p));
  if (r !== l || r !== manif[p].diff || a !== manif[p].propose) arreter('empreinte divergente : ' + p);
  return '| `' + p + '` | `' + a.slice(0, 16) + '…` = proposé | `' + r.slice(0, 16) + '…` | `' + l.slice(0, 16) + '…` | identiques |';
});
const reels = cibles.map((p) => { const n = p.replaceAll('/', '__') + '.diff'; return '### `' + INS + 'application/diffs-reels/' + n + '`\n\n' + clot(txt(INS + 'application/diffs-reels/' + n), 'diff'); });

const ctl = readdirSync(join(root, AF + 'controles')).filter((f) => f.endsWith('.txt')).sort();
const p6 = ctl.map((f) => '### `' + AF + 'controles/' + f + '`\n\n' + clot(txt(AF + 'controles/' + f), 'text'));

const doc = [txt(AF + 'note-export-entete.md'), '',
  '# Partie 1 · Relais en service, en entier', '', 'Chemin : `docs/relecture/reprise-A2-05.md` ; SHA-256 `' + sha(brut('docs/relecture/reprise-A2-05.md')) + '` (préservé par l\'application : P9 et C14). Il n\'est pas modifié par cette opération.', '', txt('docs/relecture/reprise-A2-05.md'), '',
  '# Partie 2 · Rapport d\'audit F, en entier', '', 'Chemin : `docs/rapports/etape2-A2-05-volet1-lot3-F.md` ; SHA-256 `' + sha(brut('docs/rapports/etape2-A2-05-volet1-lot3-F.md')) + '`.', '', txt('docs/rapports/etape2-A2-05-volet1-lot3-F.md'), '',
  '# Partie 3 · Les 15 fiches sources, exactes', '', 'Dans l\'ordre du découpage (lignes 361 à 377). Chaque fiche est recopiée telle quelle depuis la source figée, avec ses anciens exemples (45 au total) et l\'ENTRY publiée.', '', ...p3,
  '# Partie 4 · Les 42 décisions historiques, valeurs brutes', '', 'Toutes validées ; ' + nTN + ' de nature `type-nul`. Extraites de `reconstruction/a2-04/journal.json`, tous champs, dans l\'ordre du journal.', '', json(dec), '',
  '# Partie 5 · Vérification de l\'application documentaire', '',
  '## 5.1 Empreintes', '', 'SHA-256 du fichier en place, du diff réel et du diff relu, recalculées à l\'assemblage de cette note ; le manifeste relu (`' + sha(brut(INS + 'proposition/manifeste.json')).slice(0, 16) + '…`) fixe les valeurs attendues.', '',
  '| Fichier | En place | Diff réel | Diff relu | Résultat |', '|---|---|---|---|---|', ...lignesSha, '',
  '## 5.2 Table des diffs relus', '', txt(INS + 'proposition/table-diffs.md'), '',
  '## 5.3 Manifeste de la proposition relue', '', json(manif), '',
  '## 5.4 Trace complète de l\'exécution (`' + INS + 'application/sorties/application.txt`)', '', clot(txt(INS + 'application/sorties/application.txt'), 'text'), '',
  '## 5.5 Les dix diffs réels', '', ...reels.flatMap((r) => [r, '']),
  '# Partie 6 · Contrôles exécutés après la livraison de l\'audit', '', 'Sorties complètes, commande en tête, code de sortie en fin. Le relais est lancé dans son mode de service (`--apres-application`), comme par le script d\'application.', '', ...p6.flatMap((r) => [r, ''])];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets ; ' + entrees.length + ' fiches, ' + nEx + ' anciens exemples, ' + dec.length + ' décisions dont ' + nTN + ' type-nul ; 10 diffs identiques ; ' + ctl.length + ' sorties de contrôle');
