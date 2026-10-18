// A2-05 · volet 1 · lot 3 : manifeste d'empreintes (SHA-256) des rapports arbitrés (outillage v2, en proposition).
// Par défaut, vérifie le manifeste ; avec --ecrire, l'établit à partir de l'état présent (une seule fois, sur décision).
// Rapports couverts : les rapports de livraison arbitrés du lot 3, leurs périmètres arbitrés, le périmètre du lot 3 et le bilan du bloc A.
// Usage : node empreintes-lot3.mjs <racine du dépôt> [--ecrire]
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { couverture } from './couverture-lot3.mjs';

export const MANIFESTE = 'a2-05-travail/empreintes-rapports-arbitres.json';
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const sha = (root, p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
const arbitre = (root, p) => /^\*\*Statut\*\* : \*\*(arbitré le |périmètre accepté le )/m.test(readFileSync(join(root, p), 'utf8'));

/** Rapports arbitrés à couvrir, calculés : rapports de livraison arbitrés, périmètres acceptés, périmètre du lot 3, bilan du bloc A. */
export function rapportsArbitres(root) {
  const c = couverture(root);
  const l = [R + 'perimetre.md', R + 'blocA-bilan.md', ...c.arbitrees.map((x) => R + x + '.md')];
  for (const f of readdirSync(join(root, 'docs/rapports')).filter((f) => /^etape2-A2-05-volet1-lot3-[A-F]\d+-perimetre\.md$/.test(f)).sort()) if (arbitre(root, 'docs/rapports/' + f)) l.push('docs/rapports/' + f);
  for (const p of l) if (!arbitre(root, p)) throw new Error(p + ' : ne porte pas son arbitrage');
  return l;
}

/** Vérifie le manifeste : chaque rapport listé garde son empreinte ; un rapport arbitré absent du manifeste est signalé. */
export function verifierEmpreintes(root) {
  if (!existsSync(join(root, MANIFESTE))) throw new Error('manifeste absent : ' + MANIFESTE);
  const m = JSON.parse(readFileSync(join(root, MANIFESTE), 'utf8'));
  const differents = Object.entries(m.empreintes).filter(([p, h]) => sha(root, p) !== h).map(([p]) => p);
  if (differents.length) throw new Error('empreinte modifiée : ' + differents.join(', '));
  const nouveaux = rapportsArbitres(root).filter((p) => !Object.hasOwn(m.empreintes, p));
  return { controles: Object.keys(m.empreintes).length, nouveaux };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
  if (process.argv.includes('--ecrire')) {
    if (existsSync(join(root, MANIFESTE))) throw new Error('manifeste déjà établi : il ne se réécrit pas ; une addition passe par une décision');
    const l = rapportsArbitres(root);
    const out = { genere_par: 'a2-05-travail/empreintes-lot3.mjs', etabli_le: '2026-10-18', note: 'empreintes SHA-256 des octets des rapports arbitrés ; un rapport arbitré ne se régénère pas', empreintes: Object.fromEntries(l.map((p) => [p, sha(root, p)])) };
    writeFileSync(join(root, MANIFESTE), JSON.stringify(out, null, 1) + '\n');
    console.log('manifeste établi : ' + l.length + ' rapports');
  } else {
    const v = verifierEmpreintes(root);
    console.log('empreintes : ' + v.controles + ' rapports contrôlés, identiques' + (v.nouveaux.length ? ' ; rapports arbitrés hors du manifeste : ' + v.nouveaux.join(', ') : ''));
  }
}
