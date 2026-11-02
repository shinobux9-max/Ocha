// A2-05 · volet 1 · lot 3 : référence structurée du §0 arbitré du rapport de T5, tirée du §0 relu (note d'export de la proposition de
// l'arbitrage, Partie 2.1, diff du rapport), et non du rapport lui-même. Sans option : lecture seule, compare la référence extraite au §0 réel,
// champ par champ. Avec --ecrire : écrit la seule référence `arbitrage-T5/reference-s0-T5.json` (refus si elle existe déjà). Code 1 au premier
// écart.
// Usage : node a2-05-travail/arbitrage-T5/preparer-reference-s0-T5.mjs <racine du dépôt> [--ecrire]
// PROPOSITION (2026-10-26), non appliquée : préparation de l'adaptation du contrôle du bilan du pilote à l'arbitrage de T5 (37e empreinte).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const ecrire = process.argv.includes('--ecrire');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const NOTE = 'a2-05-travail/note-export-lot3-T5-arbitrage-proposition.md', NOTE_SHA = '6bf3259cda7a8ec0';
const DOC = 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', REF = 'a2-05-travail/arbitrage-T5/reference-s0-T5.json';
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };

// §0 de T5 en structure, comme celui de T4 : intitulé, vide, décision, vide, synthèse, vide, en-tête, séparateur, points, vide, liste globale ;
// toute autre disposition est une anomalie.
const structurer = (lignes) => {
  const L = [...lignes]; while (L.length && L.at(-1) === '') L.pop();
  const anomalies = []; const points = []; let k = 8;
  for (; k < L.length && L[k].startsWith('| '); k++) { const m = L[k].match(/^\| \*\*(.+?)\*\* \| (.+) \|$/); if (m) points.push({ point: m[1], arbitrage: m[2] }); else anomalies.push('ligne ' + (k + 1) + ' hors tableau'); }
  if (L[1] !== '' || L[3] !== '' || L[5] !== '' || L[k] !== '' || L.length !== k + 2) anomalies.push('disposition des lignes vides ou nombre de lignes inattendu');
  return { intitule: L[0], decision: L[2], synthese: L[4], entete: L[6], separateur: L[7], points, liste: L[k + 1], anomalies };
};
// Fragments de la réserve normative exigés, mot pour mot, dans le point « Réserve normative » du §0 relu et dans le §8.95 du bilan
const FRAGMENTS = [
  'D0668 (こちら, sens 2), D0679 (あちら, sens 2), D0687 (こっち, sens 2) et D0691 (そっち, sens 2)',
  '**conservées, sans modification**',
  '**n\'est pas présenté comme positivement confirmé par A9**',
  'ces quatre sens désignent une personne ou un groupe',
  'est documentée, non résolue',
  'Cette réserve n\'est ni une correction V1 nouvelle, ni une autorisation de rouvrir les décisions antérieures.',
];
const faitsDe = (s) => {
  const m = (s.synthese ?? '').match(/^\*\*(\d+) conformes, aucun écart, aucun suspendu\*\*, comme proposé\./);
  const v = s.points.find((p) => /^Verdicts \(\d+\)$/.test(p.point)); const r = s.points.find((p) => p.point === 'Réserve normative (point 1)');
  const texte = [s.decision, s.synthese, ...s.points.map((p) => p.arbitrage), s.liste].join('\n');
  const reservees = [...texte.matchAll(/\b(V[12]-\d+) non retenue, identifiant réservé/g)].map((x) => x[1]);
  const retenues = [...texte.matchAll(/\b(V1-\d+) retenues?\b/g)].map((x) => x[1]);
  const lg = (s.liste ?? '').match(/^\*\*Liste globale inchangée : aucune correction nouvelle ; (\d+) corrections dans (\d+) ENTRY, non appliquées ; (V1-\d+) reste libre\.\*\*/);
  if (!m || !v || !r || !lg) return null;
  const decisions = [...r.arbitrage.matchAll(/(D\d{4}) \(([^,]+), sens (\d+)\)/g)].map((x) => ({ decision: x[1], mot: x[2], sens: +x[3] }));
  return { conformes: +m[1], ecarts: 0, suspendus: 0, retenues, reservees, corrections: { total: +lg[1], entry: +lg[2], prochain: lg[3] }, reserve: { point: r.point, decisions, fragments: FRAGMENTS.filter((f) => r.arbitrage.includes(f)) } };
};

// Référence : les lignes « + » du §0 dans le diff du rapport, Partie 2.1 de la note relue
ctl(sha(NOTE).startsWith(NOTE_SHA), 'note relue intacte', NOTE + ' ; ' + sha(NOTE).slice(0, 16) + '…');
const note = txt(NOTE).split('\n'); const p2 = note.indexOf('## 2.1 etape2-A2-05-volet1-lot3-T5.md');
const d = note.indexOf('````diff', p2); const f = note.indexOf('````', d + 1);
const bloc = note.slice(d + 1, f); const a = bloc.indexOf('+## 0. Arbitrage'); const b = bloc.indexOf(' ## 1. Résultat proposé');
const plus = bloc.slice(a, b); const ref = structurer(plus.map((l) => l.slice(1))); const faits = faitsDe(ref);
ctl(p2 > 0 && d > p2 && f > d && a > 0 && b > a && plus.every((l) => l.startsWith('+')) && ref.intitule === '## 0. Arbitrage', 'référence : §0 lu dans la note relue (Partie 2.1, lignes ajoutées du diff)', plus.length + ' lignes, à partir de la ligne ' + (d + 2 + a) + ' de la note');
ctl(ref.anomalies.length === 0 && ref.points.length === 6, 'référence : structure complète', ref.points.length + ' points : ' + ref.points.map((p) => p.point).join(', ') + (ref.anomalies.length ? ' ; ' + ref.anomalies.join(' ; ') : ''));
const attendu = { conformes: 22, ecarts: 0, suspendus: 0, retenues: [], reservees: [], corrections: { total: 196, entry: 172, prochain: 'V1-24' },
  reserve: { point: 'Réserve normative (point 1)', decisions: [{ decision: 'D0668', mot: 'こちら', sens: 2 }, { decision: 'D0679', mot: 'あちら', sens: 2 }, { decision: 'D0687', mot: 'こっち', sens: 2 }, { decision: 'D0691', mot: 'そっち', sens: 2 }], fragments: FRAGMENTS } };
ctl(JSON.stringify(faits) === JSON.stringify(attendu), 'référence : faits (22 conformes, aucun écart ; aucune correction retenue ni réservée ; liste globale ; réserve normative, quatre décisions, six fragments)', JSON.stringify(faits));
// §0 réel
const t = txt(DOC).split('\n'); const i = t.indexOf('## 0. Arbitrage'); const j = t.findIndex((l, k) => k > i && /^## \d+\. /.test(l));
const reel = structurer(t.slice(i, j));
const div = ['intitule', 'decision', 'synthese', 'entete', 'separateur', 'liste'].filter((c) => reel[c] !== ref[c]);
if (reel.points.length !== ref.points.length) div.push('nombre de points'); else ref.points.forEach((p, k) => { if (reel.points[k].point !== p.point || reel.points[k].arbitrage !== p.arbitrage) div.push('point « ' + p.point + ' »'); });
ctl(i > 0 && div.length === 0 && reel.anomalies.length === 0, '§0 réel : identique à la référence, champ par champ', div.length ? div.join(' ; ') : 'intitulé, décision, synthèse, en-tête, ' + reel.points.length + ' points, liste (lignes ' + (i + 1) + ' à ' + j + ')');
const contenu = JSON.stringify({
  objet: '§0 arbitré du rapport de T5, en structure : référence du contrôle de son intégrité et de la réserve normative',
  document: DOC,
  provenance: { note: NOTE, partie: '2.1 etape2-A2-05-volet1-lot3-T5.md (diff relu, lignes ajoutées)', ligne: d + 2 + a, empreinte_note: sha(NOTE) },
  arbitrage: 'arbitrage du 2026-10-25 (ChatGPT, par délégation ; relayé par l\'utilisateur) : 22 conformités, aucun écart, aucune nouvelle correction lexicale ; réserve normative',
  etabli_le: '2026-10-26', statut: 'proposition, non appliquée',
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
