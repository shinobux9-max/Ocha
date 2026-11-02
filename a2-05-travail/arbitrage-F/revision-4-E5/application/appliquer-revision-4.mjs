// A2-05 · E5 : remplacement de la révision 3 de la proposition d'addendum par la révision 4 (autorisé le 2026-11-01), par le diff relu, en remplacements ciblés.
// La proposition reste non normative ; A10 n'est pas adopté ; `docs/conception/` n'est pas touché. Usage : node a2-05-travail/arbitrage-F/revision-4-E5/application/appliquer-revision-4.mjs <racine du dépôt>
import { resolve } from 'node:path';
import { appliquer } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-F/revision-4-E5/', P = 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md';
const section = (t, a, b) => { const i = t.indexOf(a), j = t.indexOf(b, i + 1); return i < 0 || j < 0 ? null : t.slice(i, j); };
const GARDEES = [['### 2. Définition', '### 3. Principes'], ['### 4. Frontières', '### 7. Application'], ['### 8. Recherche des omissions', '### Décisions de cet addendum']];
appliquer({
  root, A: OUT + 'application/', SRC: OUT, diffDe: () => 'proposition-addendum.diff', plan: '02704a905a7b7b2c', planApres: '02704a905a7b7b2c', fin: 'révision 4 conforme',
  D: [[P, 'proposition-addendum-revision-4.md', 'f1ca707a76ef8f262bf5a1108e78f02f1e1a4d1d895f50aed1f202a00ed4ad90', '984125877445b370ce4a1fc2a96b6d32a1ac1564c207906118dde852d9e1468e', '070a6c1b0d43bc6c9b0b01b2fc4a1f341b9d568184669884ab703162d2a5a1fa']],
  avant: ({ ok, lire }) => { ok(lire(P).includes('**Révision 3, du 2026-10-12**') && !lire(P).includes('révision 4'), 'P6 ajout absent : révision 4'); },
  apres: ({ ok, lire }, { avant }) => {
    const t = lire(P), t0 = avant[P];
    ok(GARDEES.every(([a, b]) => section(t, a, b) !== null && section(t, a, b) === section(t0, a, b)), 'C3 définition, frontières, autres couches, cumul et recherche des omissions inchangés, octet pour octet');
    ok(/^\*\*Version courante : révision 4, du 2026-11-01\*\*/m.test(t) && /^\*\*Historique, révision 2/m.test(t) && /^\*\*Historique, révision 3/m.test(t), 'C4 révision 4 identifiée ; historique des révisions 2 et 3 conservé');
    ok(/^\*\*Statut\*\* : \*\*PROPOSITION, non validée, non normative\.\*\*/m.test(t) && t.includes('Le texte n\'est ni adopté, ni normatif, ni déplacé dans `docs/conception/`.'), 'C5 la proposition reste non normative, non adoptée');
  },
});
