// A2-05 · volet 1 · lot 3 : référence structurée du §0 arbitré du rapport de T4, tirée du §0 relu (note d'export de la numérotation, Partie 2),
// et non du rapport lui-même. Sans option : lecture seule, compare la référence extraite au §0 réel, champ par champ. Avec --ecrire : écrit la
// seule référence `arbitrage-T4/reference-s0-T4.json` (refus si elle existe déjà). Code 1 au premier écart.
// Usage : node a2-05-travail/arbitrage-T4/preparer-reference-s0-T4.mjs <racine du dépôt> [--ecrire]
// PROPOSITION (2026-10-25), non appliquée : préparation de l'adaptation du contrôle du bilan du pilote à l'arbitrage de T4.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const ecrire = process.argv.includes('--ecrire');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const NOTE = 'a2-05-travail/note-export-lot3-T4-reservation.md', DOC = 'docs/rapports/etape2-A2-05-volet1-lot3-T4.md';
const REF = 'a2-05-travail/arbitrage-T4/reference-s0-T4.json';
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// §0 de T4 en structure : intitulé, vide, décision, vide, synthèse, vide, en-tête, séparateur, points, vide, liste globale ; toute autre
// disposition est une anomalie.
const structurer = (lignes) => {
  const L = [...lignes]; while (L.length && L.at(-1) === '') L.pop();
  const anomalies = []; const points = []; let k = 8;
  for (; k < L.length && L[k].startsWith('| '); k++) { const m = L[k].match(/^\| \*\*(.+?)\*\* \| (.+) \|$/); if (m) points.push({ point: m[1], arbitrage: m[2] }); else anomalies.push('ligne ' + (k + 1) + ' hors tableau'); }
  if (L[1] !== '' || L[3] !== '' || L[5] !== '' || L[k] !== '' || L.length !== k + 2) anomalies.push('disposition des lignes vides ou nombre de lignes inattendu');
  return { intitule: L[0], decision: L[2], synthese: L[4], entete: L[6], separateur: L[7], points, liste: L[k + 1], anomalies };
};
const faitsDe = (s) => {
  const m = (s.synthese ?? '').match(/^\*\*(\d+) conformes, (\d+) écarts, aucun suspendu\*\*, contre (\d+) conformes et (\d+) écarts proposés/);
  const er = s.points.find((p) => /^Écarts retenus/.test(p.point))?.arbitrage.match(/\*\*V1-(\d+) à V1-(\d+) retenues\*\*/);
  const texte = [s.decision, s.synthese, ...s.points.map((p) => p.arbitrage), s.liste].join('\n');
  const reservees = [...texte.matchAll(/\b(V[12]-\d+) non retenue, identifiant réservé/g)].map((x) => x[1]);
  if (!m || !er) return null;
  const retenues = []; for (let n = +er[1]; n <= +er[2]; n++) retenues.push('V1-' + n);
  return { conformes: +m[1], ecarts: +m[2], proposes: { conformes: +m[3], ecarts: +m[4] }, retenues, reservees };
};

// Référence : le bloc « markdown » de la Partie 2 de la note relue
const note = txt(NOTE).split('\n'); const p2 = note.findIndex((l) => l.startsWith('# Partie 2 · §0 corrigé du rapport de T4'));
const d = note.indexOf('````markdown', p2); const f = note.indexOf('````', d + 1);
const ref = structurer(note.slice(d + 1, f)); const faits = faitsDe(ref);
ctl(p2 > 0 && d > p2 && f > d && ref.intitule === '## 0. Arbitrage', 'référence : §0 lu dans la note relue (Partie 2)', (f - d - 1) + ' lignes, à partir de la ligne ' + (d + 2) + ' de la note');
ctl(ref.anomalies.length === 0 && ref.points.length === 6, 'référence : structure complète', ref.points.length + ' points : ' + ref.points.map((p) => p.point).join(', ') + (ref.anomalies.length ? ' ; ' + ref.anomalies.join(' ; ') : ''));
ctl(JSON.stringify(faits) === JSON.stringify({ conformes: 28, ecarts: 7, proposes: { conformes: 26, ecarts: 9 }, retenues: ['V1-15', 'V1-16', 'V1-17', 'V1-18', 'V1-19', 'V1-20', 'V1-21'], reservees: ['V1-22', 'V1-23'] }), 'référence : faits (28/7 contre 26/9 ; retenues ; réservées)', JSON.stringify(faits));
// §0 réel
const t = txt(DOC).split('\n'); const i = t.indexOf('## 0. Arbitrage'); const j = t.findIndex((l, k) => k > i && /^## \d+\. /.test(l));
const reel = structurer(t.slice(i, j));
const div = ['intitule', 'decision', 'synthese', 'entete', 'separateur', 'liste'].filter((c) => reel[c] !== ref[c]);
if (reel.points.length !== ref.points.length) div.push('nombre de points'); else ref.points.forEach((p, k) => { if (reel.points[k].point !== p.point || reel.points[k].arbitrage !== p.arbitrage) div.push('point « ' + p.point + ' »'); });
ctl(i > 0 && div.length === 0 && reel.anomalies.length === 0, '§0 réel : identique à la référence, champ par champ', div.length ? div.join(' ; ') : 'intitulé, décision, synthèse, en-tête, ' + reel.points.length + ' points, liste (lignes ' + (i + 1) + ' à ' + j + ')');
const contenu = JSON.stringify({
  objet: '§0 arbitré du rapport de T4, en structure : référence du contrôle de son intégrité',
  document: DOC,
  provenance: { note: NOTE, partie: note[p2].replace(/^# /, ''), ligne: d + 2, empreinte_note: sha(NOTE) },
  arbitrage: 'arbitrage du 2026-10-24 (ChatGPT, par délégation ; relayé par l\'utilisateur) ; numérotation, lecture B',
  etabli_le: '2026-10-25', statut: 'proposition, non appliquée',
  s0: { intitule: ref.intitule, decision: ref.decision, synthese: ref.synthese, entete: ref.entete, separateur: ref.separateur, points: ref.points, liste: ref.liste },
  faits,
}, null, 2) + '\n';
const h = createHash('sha256').update(contenu).digest('hex');
if (ecrire) {
  if (existsSync(join(root, REF))) { console.log('refus : ' + REF + ' existe déjà'); process.exit(1); }
  if (ecarts) { console.log(ecarts + ' écart(s) : référence non écrite'); process.exit(1); }
  writeFileSync(join(root, REF), contenu); console.log('écrit : ' + REF + ' ; ' + h);
} else console.log('référence (non écrite) : ' + h + (existsSync(join(root, REF)) ? ' ; fichier existant : ' + sha(REF) + (sha(REF) === h ? ', identique' : ', DIFFÉRENT') : ''));
console.log(ecarts ? ecarts + ' écart(s)' : 'préparation conforme');
process.exit(ecarts ? 1 : 0);
