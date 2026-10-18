// A2-05 · volet 1 · lot 3 : registre de couverture des 377 sens (outillage v2, en proposition). Lecture seule sur les données.
// Pour chaque sens du découpage arbitré : sa livraison, l'état de son rapport (arbitré, proposé, absent), et le contrôle qu'il est
// examiné dans le rapport de sa livraison et dans aucun autre (titres « #### `id` »).
// Usage : node couverture-lot3.mjs <racine du dépôt> [--ecrire]   (--ecrire : écrit a2-05-travail/couverture-lot3.json)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const LF = String.fromCharCode(10);
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';

/** Calcule le registre. Lève une erreur à la première omission, au premier doublon ou au premier sens inconnu. */
export function couverture(root) {
  const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, LF);
  const perimetre = txt(R + 'perimetre.md');
  const lignes = [...perimetre.matchAll(/^\| \d+ \| ([A-F]\d+) \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => ({ id: m[2], livraison: m[1] }));
  if (lignes.length !== 377 || new Set(lignes.map((x) => x.id)).size !== 377) throw new Error('périmètre du lot 3 : 377 sens distincts attendus, lus ' + lignes.length);
  const livraisons = [...new Set(lignes.map((x) => x.livraison))];
  if (livraisons.length !== 40) throw new Error('périmètre du lot 3 : 40 livraisons attendues, lues ' + livraisons.length);
  const etats = new Map(); const vus = new Map();
  for (const l of livraisons) {
    const p = R + l + '.md';
    if (!existsSync(join(root, p))) { etats.set(l, 'absent'); continue; }
    const t = txt(p);
    etats.set(l, /^\*\*Statut\*\* : \*\*arbitré le /m.test(t) ? 'arbitré' : /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(t) ? 'proposé' : 'inconnu');
    if (etats.get(l) === 'inconnu') throw new Error(p + ' : statut illisible');
    for (const m of t.matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` /gm)) { if (!vus.has(m[1])) vus.set(m[1], []); vus.get(m[1]).push(l); }
  }
  const attendu = new Map(lignes.map((x) => [x.id, x.livraison]));
  for (const [id, ls] of vus) {
    if (!attendu.has(id)) throw new Error(id + ' : examiné en ' + ls.join(', ') + ', absent du découpage du lot 3');
    if (ls.length > 1) throw new Error(id + ' : examiné dans plusieurs rapports (' + ls.join(', ') + ')');
    if (ls[0] !== attendu.get(id)) throw new Error(id + ' : examiné en ' + ls[0] + ', alors que le découpage le range en ' + attendu.get(id));
  }
  for (const l of livraisons) if (etats.get(l) !== 'absent') {
    const manquants = lignes.filter((x) => x.livraison === l && !vus.has(x.id)).map((x) => x.id);
    if (manquants.length) throw new Error(l + ' : sens du découpage absents du rapport : ' + manquants.join(', '));
  }
  const sens = lignes.map((x) => ({ id: x.id, livraison: x.livraison, etat: etats.get(x.livraison) === 'absent' ? 'restant' : etats.get(x.livraison) }));
  const compte = (e) => sens.filter((s) => s.etat === e).length;
  const blocB = sens.filter((s) => s.livraison[0] === 'B');
  return {
    sens, etats: Object.fromEntries(etats),
    arbitrees: livraisons.filter((l) => etats.get(l) === 'arbitré'), proposees: livraisons.filter((l) => etats.get(l) === 'proposé'),
    totaux: { sens: 377, arbitres: compte('arbitré'), proposes: compte('proposé'), restants: compte('restant'), blocB: blocB.length, blocBArbitres: blocB.filter((s) => s.etat === 'arbitré').length }
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
  const c = couverture(root);
  if (process.argv.includes('--ecrire')) {
    const out = { genere_par: 'a2-05-travail/couverture-lot3.mjs', note: 'registre calculé, jamais saisi ; il se régénère à chaque exécution', totaux: c.totaux, livraisons: c.etats, sens: c.sens };
    writeFileSync(join(root, 'a2-05-travail/couverture-lot3.json'), JSON.stringify(out, null, 1) + LF);
  }
  console.log('couverture : ' + c.totaux.arbitres + ' arbitrés, ' + c.totaux.proposes + ' proposés, ' + c.totaux.restants + ' restants, sur 377 ; bloc B : ' + c.totaux.blocBArbitres + '/' + c.totaux.blocB + ' ; livraisons arbitrées : ' + c.arbitrees.join(', ') + (c.proposees.length ? ' ; proposées : ' + c.proposees.join(', ') : ''));
}
