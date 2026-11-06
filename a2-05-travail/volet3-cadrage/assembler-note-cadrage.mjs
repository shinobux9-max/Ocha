// A2-05 · volet 3 : assemble la note d'export de la proposition de cadrage (lecture seule ; écrit un seul fichier neuf).
// Usage : node a2-05-travail/volet3-cadrage/assembler-note-cadrage.mjs <racine du dépôt>
// Chaque extrait est pris entre deux titres d'ancrage exacts ; une ancre absente ou ambiguë arrête tout, sans rien écrire.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2];
if (!root) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/note-export-volet3-cadrage.md';
if (existsSync(join(root, OUT))) throw new Error('existe déjà : ' + OUT);

const lire = (f) => readFileSync(join(root, f), 'utf8');
const sha = (t) => createHash('sha256').update(t, 'utf8').digest('hex');
const empreintes = [];
const fichier = (f) => { const t = lire(f); empreintes.push([f, sha(t)]); return t; };

// extrait de la ligne qui commence par `debut` (incluse) jusqu'à la ligne qui commence par `fin` (exclue) ; fin null = jusqu'au bout
const extrait = (f, debut, fin) => {
  const L = fichier(f).split('\n');
  const i = L.filter((l) => l.startsWith(debut)).length;
  if (i !== 1) throw new Error(`ancre de début ${i === 0 ? 'absente' : 'ambiguë'} dans ${f} : ${debut}`);
  const a = L.findIndex((l) => l.startsWith(debut));
  let b = L.length;
  if (fin !== null) {
    b = L.findIndex((l, k) => k > a && l.startsWith(fin));
    if (b < 0) throw new Error(`ancre de fin absente dans ${f} : ${fin}`);
  }
  return { texte: L.slice(a, b).join('\n').replace(/\s+$/, ''), lignes: `${a + 1} à ${b}` };
};

const P = 'a2-05-travail/volet3-cadrage/proposition-cadrage-volet3.md';
const PG = 'docs/rapports/etape2-A2-05-perimetre-controles-globaux.md';
const PV2 = 'docs/rapports/etape2-A2-05-perimetre.md';
const BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ETAT = 'ETAT-ACTUEL.md';
const RM = 'ROADMAP.md';
const GLOB = 'docs/conception/a2/A2-GLOBAL-v1.md';
const L3P = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md';

const proposition = fichier(P).replace(/\s+$/, '');
const perimetreG = fichier(PG).replace(/\s+$/, '');
const global = fichier(GLOB).replace(/\s+$/, '');
const v2 = extrait(PV2, '## 7. Procédure si une correction est nécessaire', '## 10. Hors de ce périmètre');
const bilEnTete = extrait(BIL, '# Étape 2 · A2-05 · Bilan consolidé', '## 1. Bilan du volet 2');
const bil45 = extrait(BIL, '## 4. Volet 3 : état des contrôles G1 à G7', '## 6. Périmètre proposé pour le prochain lot de travail');
const b835 = extrait(BIL, '### 8.35 ', '### 8.36 ');
const b843 = extrait(BIL, '### 8.43 ', '### 8.44 ');
const b849 = extrait(BIL, '### 8.49 ', '### 8.50 ');
const etatCours = extrait(ETAT, '## Étape en cours', '**Tâche précédente, terminée : A2-04');
const etatPO = extrait(ETAT, '## Points ouverts', '## Journal des tâches');
const rm9 = extrait(RM, '## 9. Clôture de l\'Étape 2', '## 10. Étape 3');
const rm6 = extrait(RM, '## 6. A2-05 · Audit global du vocabulaire', '## 7. Graphe pédagogique');
const l3stat = extrait(L3P, '**Statut** : **arbitré le 2026-10-12', '**');

const N = [];
N.push('# Note d\'export — A2-05 · volet 3 · proposition de cadrage des contrôles globaux G1 à G7 (proposée, non arbitrée)');
N.push('');
N.push('**Date** : 2026-11-05.');
N.push('');
N.push('**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé.');
N.push('');
N.push('**Autorisation exécutée** : « Je t\'autorise uniquement à produire une proposition de cadrage du volet 3, portant sur les contrôles globaux G1 à G7. » Aucun contrôle n\'est exécuté ; HP-1 à HP-4, QC-1 et QC-2 ne sont pas examinés ; l\'application des 204 corrections n\'est pas préparée ; aucune donnée lexicale, norme ni décision historique n\'est modifiée.');
N.push('');
N.push('**Fichiers produits, non suivis par git** : `' + P + '` (la proposition), `a2-05-travail/volet3-cadrage/assembler-note-cadrage.mjs` (ce script) et cette note. **Aucun fichier suivi n\'est modifié par ce travail** ; l\'arbre de travail garde les modifications non committées antérieures (inscriptions jusqu\'à E3 et bilan de clôture des omissions, installation d\'A10).');
N.push('');
N.push('**Ce qui est attendu du relecteur** : relire la proposition (partie A) contre les textes qu\'elle cite (annexes A à F) ; vérifier que chaque marque [D] renvoie bien à un texte qui le dit, que les [P] sont bien des propositions non arbitrées, et que les [R] ne créent aucune règle ; arbitrer Q1 à Q8 (§8 de la proposition). **L\'étape 2 reste ouverte.**');
N.push('');
N.push('**Pourquoi `A2-GLOBAL-v1` est recopié** (annexe C) : `tools/export-relecture.mjs` ne le met pas dans `03-references-A2.md` (décision D5, correction retenue en principe, non faite) ; le volet 3 juge aussi selon ce snapshot.');
N.push('');
N.push('## Empreintes des fichiers lus (SHA-256, UTF-8, à la lecture)');
N.push('');
N.push('| Fichier | SHA-256 |');
N.push('|---|---|');
const posEmpreintes = N.length; // rempli à la fin
N.push('');
N.push('---');
N.push('');
N.push('# Partie A — La proposition de cadrage, en entier');
N.push('');
N.push(proposition);
N.push('');
N.push('---');
N.push('');
N.push('# Annexe A — Périmètre du volet 3 (`' + PG + '`), en entier');
N.push('');
N.push(perimetreG);
N.push('');
N.push('---');
N.push('');
N.push(`# Annexe B — Volet 2 : procédure de correction, fichiers, preuves de sortie (\`${PV2}\`, lignes ${v2.lignes})`);
N.push('');
N.push(v2.texte);
N.push('');
N.push('---');
N.push('');
N.push('# Annexe C — `' + GLOB + '`, en entier (absent de 03-references-A2.md, décision D5)');
N.push('');
N.push(global);
N.push('');
N.push('---');
N.push('');
N.push(`# Annexe D — Bilan du volet 2 : en-tête (statut des §3 à §5) et §4 à §5, **propositions non arbitrées** (\`${BIL}\`, lignes ${bilEnTete.lignes} et ${bil45.lignes})`);
N.push('');
N.push(bilEnTete.texte);
N.push('');
N.push(bil45.texte);
N.push('');
N.push('---');
N.push('');
N.push(`# Annexe E — HP-1 à HP-4, QC-1, QC-2 (\`${BIL}\`, §8.35, §8.43, §8.49 ; lignes ${b835.lignes}, ${b843.lignes}, ${b849.lignes})`);
N.push('');
N.push(b835.texte);
N.push('');
N.push(b843.texte);
N.push('');
N.push(b849.texte);
N.push('');
N.push(`**Arbitrage de C6 et C9** (\`${L3P}\`, statut, lignes ${l3stat.lignes}) : voir la phrase « C6 et C9 : un rapport séparé de conclusion du criblage, après les examens individuels et avant le bilan final du volet 1, distinct de G1 à G7 ».`);
N.push('');
N.push(l3stat.texte);
N.push('');
N.push('---');
N.push('');
N.push(`# Annexe F — Pilotage : \`${ETAT}\` (« Étape en cours », lignes ${etatCours.lignes} ; « Points ouverts », lignes ${etatPO.lignes}) et \`${RM}\` (§6, lignes ${rm6.lignes} ; §9, lignes ${rm9.lignes})`);
N.push('');
N.push('Les « Points ouverts » sont la population de G7 **à la date du cadrage** ; selon V5, la confrontation sera refaite sur l\'état d\'`ETAT-ACTUEL.md` au moment de l\'exécution.');
N.push('');
N.push(etatCours.texte);
N.push('');
N.push(etatPO.texte);
N.push('');
N.push(rm6.texte);
N.push('');
N.push(rm9.texte);
N.push('');

const lignesEmp = empreintes.filter(([f], i, a) => a.findIndex(([g]) => g === f) === i).map(([f, h]) => `| \`${f}\` | \`${h}\` |`);
N.splice(posEmpreintes, 0, ...lignesEmp);
const texte = N.join('\n') + '\n';
writeFileSync(join(root, OUT), texte);
console.log('écrit : ' + OUT + ' (' + Buffer.byteLength(texte) + ' octets, sha256 ' + sha(texte) + ')');
for (const l of lignesEmp) console.log(l);
