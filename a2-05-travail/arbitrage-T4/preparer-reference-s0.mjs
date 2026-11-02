// A2-05 · volet 1 · lot 3 : référence structurée du §0 arbitré du bilan du pilote, tirée du diff relu (export d'acceptation, Partie 1),
// et non du rapport lui-même. Sans option : lecture seule, compare la référence extraite au §0 réel, champ par champ. Avec --ecrire :
// écrit la seule référence `arbitrage-T4/reference-s0-bilan-pilote.json` (refus si elle existe déjà). Code 1 au premier écart.
// Usage : node a2-05-travail/arbitrage-T4/preparer-reference-s0.mjs <racine du dépôt> [--ecrire]
// PROPOSITION (2026-10-24), non appliquée : préparation du renforcement du contrôle du §0 du bilan du pilote.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const ecrire = process.argv.includes('--ecrire');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const NOTE = 'a2-05-travail/note-export-lot3-T4-acceptation.md', DOC = 'docs/rapports/etape2-A2-05-volet1-lot3-bilan-pilote.md';
const REF = 'a2-05-travail/arbitrage-T4/reference-s0-bilan-pilote.json';
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// §0 en structure : intitulé, ligne vide, décision, ligne vide, en-tête et séparateur du tableau, une ligne par point ; toute autre ligne est une anomalie.
const structurer = (lignes) => {
  const L = [...lignes]; while (L.length && L.at(-1) === '') L.pop();
  const points = [], anomalies = [];
  L.slice(6).forEach((l, k) => { const m = l.match(/^\| \*\*([^*|]+)\*\* \| (.+) \|$/); if (m) points.push({ point: m[1], arbitrage: m[2] }); else anomalies.push('ligne ' + (k + 7) + ' : ' + l.slice(0, 40)); });
  if (L[1] !== '' || L[3] !== '') anomalies.push('lignes vides attendues après l\'intitulé et la décision');
  return { intitule: L[0], decision: L[2], entete: L[4], separateur: L[5], points, anomalies };
};
const faitsDe = (s) => {
  const c = s.points.find((p) => p.point === 'Faits retenus')?.arbitrage ?? '';
  const m = c.match(/^([0-9]+) sens examinés : ([0-9]+) conformes, ([0-9]+) écarts ; ([0-9]+) verdicts proposés puis retenus, sans inversion ; .* ([0-9]+) incidents recensés/);
  return m ? { sens: +m[1], conformes: +m[2], ecarts: +m[3], verdicts_retenus: +m[4], incidents: +m[5] } : null;
};

// Référence : les lignes « + » du diff de la Partie 1 de la note, de « +## 0. Arbitrage » à la dernière ligne ajoutée.
const note = txt(NOTE).split('\n'); const p1 = note.indexOf('# Partie 1 · Bilan du pilote : §0 inscrit'); const d = note.indexOf('+## 0. Arbitrage', p1);
const ajout = []; for (let k = d; k >= 0 && k < note.length && note[k].startsWith('+'); k++) ajout.push(note[k].slice(1));
ctl(p1 > 0 && d > p1 && ajout.length === 13, 'référence : §0 lu dans le diff relu (note d\'acceptation, Partie 1)', ajout.length + ' lignes ajoutées, à partir de la ligne ' + (d + 1) + ' de la note');
const ref = structurer(ajout); const faits = faitsDe(ref);
ctl(ref.anomalies.length === 0 && ref.points.length === 6, 'référence : structure complète', ref.points.length + ' points : ' + ref.points.map((p) => p.point).join(', ') + (ref.anomalies.length ? ' ; anomalies : ' + ref.anomalies.join(' ; ') : ''));
ctl(JSON.stringify(faits) === JSON.stringify({ sens: 69, conformes: 65, ecarts: 4, verdicts_retenus: 69, incidents: 13 }), 'référence : faits retenus', JSON.stringify(faits));

// §0 réel : de « ## 0. Arbitrage » à la section suivante.
const f = txt(DOC).split('\n'); const i = f.indexOf('## 0. Arbitrage'); const j = f.findIndex((l, k) => k > i && l.startsWith('## '));
const reel = structurer(f.slice(i, j));
const champs = ['intitule', 'decision', 'entete', 'separateur'].filter((c) => reel[c] !== ref[c]);
const pts = reel.points.length !== ref.points.length ? ['nombre de points ' + reel.points.length] : ref.points.flatMap((p, k) => (reel.points[k].point !== p.point || reel.points[k].arbitrage !== p.arbitrage ? ['point ' + (k + 1) + ' « ' + p.point + ' »'] : []));
const diff = [...champs, ...pts, ...reel.anomalies];
ctl(i > 0 && diff.length === 0, '§0 réel : identique à la référence, champ par champ', diff.length ? diff.join(' ; ') : 'intitulé, décision, en-tête, ' + reel.points.length + ' points (lignes ' + (i + 1) + ' à ' + j + ')');

const contenu = JSON.stringify({
  objet: '§0 arbitré du bilan du pilote, en structure : référence du contrôle de son intégrité',
  document: DOC,
  provenance: { note: NOTE, partie: note[p1].replace(/^# /, ''), ligne: d + 1, empreinte_note: sha(NOTE) },
  arbitrage: 'arbitrage du 2026-10-23 (ChatGPT, par délégation ; relayé par l\'utilisateur)',
  etabli_le: '2026-10-24',
  statut: 'proposition, non appliquée',
  s0: { intitule: ref.intitule, decision: ref.decision, entete: ref.entete, separateur: ref.separateur, points: ref.points },
  faits,
}, null, 2) + '\n';
if (ecrire) {
  if (existsSync(join(root, REF))) { console.log('refus : ' + REF + ' existe déjà'); process.exit(1); }
  if (ecarts) { console.log(ecarts + ' écart(s) : référence non écrite'); process.exit(1); }
  writeFileSync(join(root, REF), contenu); console.log('écrit : ' + REF + ' ; ' + createHash('sha256').update(contenu).digest('hex'));
} else console.log('référence (non écrite) : ' + createHash('sha256').update(contenu).digest('hex') + (existsSync(join(root, REF)) ? ' ; fichier existant : ' + sha(REF) + (sha(REF) === createHash('sha256').update(contenu).digest('hex') ? ', identique' : ', DIFFÉRENT') : ''));
console.log(ecarts ? ecarts + ' écart(s)' : 'préparation conforme');
process.exit(ecarts ? 1 : 0);
