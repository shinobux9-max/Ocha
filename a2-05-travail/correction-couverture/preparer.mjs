// A2-05 : correctif proposé du registre de couverture pour les rapports de tranche (proposition, NON appliquée).
// Usage : node a2-05-travail/correction-couverture/preparer.mjs <racine du dépôt>
// Lit couverture-lot3.mjs et empreintes-lot3.mjs SANS les modifier ; écrit leurs versions proposées (proposition/) et les différences
// exactes (diffs/), par remplacements ciblés à occurrence unique. Aucun décompte n'est saisi : il reste calculé.
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), OUT = join(W, 'correction-couverture');
const rep = (t, a, b, nom) => { const n = t.split(a).length - 1; if (n !== 1) throw new Error(nom + ' : ' + n + ' occurrence(s) de « ' + a.slice(0, 60) + ' »'); return t.replace(a, () => b); };

// 1. Registre de couverture : rapports de livraison (historiques) et rapports de tranche (registre des tranches)
let c = readFileSync(join(W, 'couverture-lot3.mjs'), 'utf8');
c = rep(c, "// examiné dans le rapport de sa livraison et dans aucun autre (titres « #### `id` »).",
  "// examiné dans le rapport de sa livraison, ou dans le rapport de la tranche qui la couvre (registre des tranches), et dans aucun autre\n// (titres « #### `id` »). Une livraison n'a jamais à la fois son propre rapport et le rapport d'une tranche (chevauchement refusé).", 'couverture (en-tête)');
c = rep(c, "const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';", "const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';\nconst TRANCHES = 'a2-05-travail/registre-tranches.json';\nconst statut = (t) => (/^\\*\\*Statut\\*\\* : \\*\\*arbitré le /m.test(t) ? 'arbitré' : /^\\*\\*Statut\\*\\* : \\*\\*proposition, non arbitrée\\.\\*\\*/m.test(t) ? 'proposé' : 'inconnu');", 'couverture (constantes)');
c = rep(c, "  const attendu = new Map(lignes.map((x) => [x.id, x.livraison]));",
  "  const attendu = new Map(lignes.map((x) => [x.id, x.livraison]));\n" +
  "  // Rapports de tranche : chacun couvre exactement les livraisons de sa tranche ; aucune de ces livraisons n'a son propre rapport\n" +
  "  const reg = existsSync(join(root, TRANCHES)) ? JSON.parse(txt(TRANCHES)).tranches : [];\n" +
  "  const trancheDe = new Map(reg.flatMap((t) => t.livraisons.map((l) => [l, t.id]))); const etatsT = new Map();\n" +
  "  for (const t of reg) {\n" +
  "    const p = R + t.id + '.md'; if (!existsSync(join(root, p))) continue;\n" +
  "    const tx = txt(p); const e = statut(tx); if (e === 'inconnu') throw new Error(p + ' : statut illisible');\n" +
  "    for (const l of t.livraisons) if (etats.get(l) !== 'absent') throw new Error(t.id + ' : la livraison ' + l + ' a aussi son propre rapport (chevauchement)');\n" +
  "    etatsT.set(t.id, e);\n" +
  "    for (const m of tx.matchAll(/^#### `((?:hj_)?v_\\d+_s\\d+)` /gm)) { if (!vus.has(m[1])) vus.set(m[1], []); vus.get(m[1]).push(t.id); }\n" +
  "  }", 'couverture (tranches)');
c = rep(c, "    if (ls[0] !== attendu.get(id)) throw new Error(id + ' : examiné en ' + ls[0] + ', alors que le découpage le range en ' + attendu.get(id));",
  "    if (ls[0] !== attendu.get(id) && ls[0] !== trancheDe.get(attendu.get(id))) throw new Error(id + ' : examiné en ' + ls[0] + ', alors que le découpage le range en ' + attendu.get(id) + (trancheDe.has(attendu.get(id)) ? ' (tranche ' + trancheDe.get(attendu.get(id)) + ')' : ''));", 'couverture (rapport attendu)');
c = rep(c, "  const sens = lignes.map((x) => ({ id: x.id, livraison: x.livraison, etat: etats.get(x.livraison) === 'absent' ? 'restant' : etats.get(x.livraison) }));",
  "  for (const [tid] of etatsT) {\n" +
  "    const manquants = lignes.filter((x) => trancheDe.get(x.livraison) === tid && !vus.has(x.id)).map((x) => x.id);\n" +
  "    if (manquants.length) throw new Error(tid + ' : sens de la tranche absents du rapport : ' + manquants.join(', '));\n" +
  "  }\n" +
  "  // État d'un sens : celui du rapport de sa livraison, sinon celui du rapport de sa tranche, sinon restant\n" +
  "  const etatDe = (l) => (etats.get(l) !== 'absent' ? etats.get(l) : etatsT.get(trancheDe.get(l)) ?? 'restant');\n" +
  "  const sens = lignes.map((x) => ({ id: x.id, livraison: x.livraison, etat: etatDe(x.livraison), rapport: etats.get(x.livraison) !== 'absent' ? x.livraison : etatsT.has(trancheDe.get(x.livraison)) ? trancheDe.get(x.livraison) : null }));", 'couverture (états)');
c = rep(c, "    sens, etats: Object.fromEntries(etats),",
  "    sens, etats: Object.fromEntries(etats), tranches: Object.fromEntries(etatsT),\n    tranchesArbitrees: [...etatsT].filter(([, x]) => x === 'arbitré').map(([t]) => t), tranchesProposees: [...etatsT].filter(([, x]) => x === 'proposé').map(([t]) => t),", 'couverture (retour)');

// 2. Manifeste d'empreintes : rapports de tranche arbitrés et périmètres de tranche acceptés ; ajout contrôlé, jamais de réécriture
let e = readFileSync(join(W, 'empreintes-lot3.mjs'), 'utf8');
e = rep(e, "  const l = [R + 'perimetre.md', R + 'blocA-bilan.md', ...c.arbitrees.map((x) => R + x + '.md')];",
  "  const l = [R + 'perimetre.md', R + 'blocA-bilan.md', ...c.arbitrees.map((x) => R + x + '.md'), ...(c.tranchesArbitrees ?? []).map((x) => R + x + '.md')];", 'empreintes (rapports de tranche)');
e = rep(e, "/^etape2-A2-05-volet1-lot3-[A-F]\\d+-perimetre\\.md$/", "/^etape2-A2-05-volet1-lot3-([A-F]|T)\\d+-perimetre\\.md$/", 'empreintes (périmètres de tranche)');
e = rep(e, "  if (process.argv.includes('--ecrire')) {",
  "  if (process.argv.includes('--ajouter')) {\n" +
  "    // Ajout contrôlé : seuls les rapports arbitrés absents du manifeste s'ajoutent ; les empreintes existantes, vérifiées d'abord, ne changent jamais\n" +
  "    const { nouveaux } = verifierEmpreintes(root); if (!nouveaux.length) throw new Error('aucun rapport arbitré à ajouter');\n" +
  "    const m = JSON.parse(readFileSync(join(root, MANIFESTE), 'utf8'));\n" +
  "    for (const p of nouveaux) m.empreintes[p] = sha(root, p);\n" +
  "    m.ajouts = [...(m.ajouts ?? []), { date: new Date().toISOString().slice(0, 10), chemins: nouveaux }];\n" +
  "    writeFileSync(join(root, MANIFESTE), JSON.stringify(m, null, 1) + '\\n');\n" +
  "    console.log('manifeste : ' + nouveaux.length + ' rapport(s) ajouté(s) : ' + nouveaux.join(', ')); process.exit(0);\n" +
  "  }\n" +
  "  if (process.argv.includes('--ecrire')) {", 'empreintes (ajout)');

mkdirSync(join(OUT, 'proposition'), { recursive: true }); mkdirSync(join(OUT, 'diffs'), { recursive: true });
for (const [nom, texte] of [['couverture-lot3.mjs', c], ['empreintes-lot3.mjs', e]]) {
  writeFileSync(join(OUT, 'proposition', nom), texte);
  const d = mkdtempSync(join(tmpdir(), 'cv-')); writeFileSync(join(d, 'a'), readFileSync(join(W, nom), 'utf8')); writeFileSync(join(d, 'b'), texte);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8' });
  if (r.status !== 1) throw new Error(nom + ' : git diff code ' + r.status);
  writeFileSync(join(OUT, 'diffs', nom + '.diff'), r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/a2-05-travail/' + nom + '\n+++ b/a2-05-travail/' + nom + '\n'));
  console.log(nom + ' : version proposée et différence écrites');
}
