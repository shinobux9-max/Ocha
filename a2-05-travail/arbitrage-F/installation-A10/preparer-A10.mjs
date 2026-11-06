// A2-05 : préparation, sans installation, du texte d'A10 : partie I de la révision 4 de la proposition E5, en-tête d'addendum, liste fermée de substitutions, entrée du sommaire.
// Prouve que la définition, les principes, les frontières, le cumul et la méthode restent identiques, sabotages à l'appui ; essais sur clones jetables, avec et sans la consignation du checkpoint.
// `docs/conception/` n'est jamais écrit. La seule variable du texte est `<DATE-D-ADOPTION>`, à fixer par l'autorisation d'installation.
// Usage : node a2-05-travail/arbitrage-F/installation-A10/preparer-A10.mjs <racine du dépôt>. Sorties dans proposition/, seulement sans écart ; refus si le dossier existe. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../moteur-application.mjs';
import { cloner, controler, EXCLUS } from '../essai-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/installation-A10/', PROP = OUT + 'proposition/', CONS = W + 'arbitrage-F/consignation-cloture-checkpoint/proposition/';
const E5 = 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md', SOM = 'docs/conception/00-sommaire.md', A9 = 'docs/conception/addendum-A9-fonctions-linguistiques.md', CIBLE = 'docs/conception/addendum-A10-interrogatif.md';
const E5_SHA = '984125877445b370', SOM_SHA = 'b640f360da8ea07e', DATE = '<DATE-D-ADOPTION>', ESSAI = '2026-11-02';
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const lignes = []; const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); lignes.push(m); }; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const lire = (p) => readFileSync(join(root, p), 'utf8'); const LFs = (t) => t.replace(/\r\n/g, '\n'); const style = (t) => { const c = (t.match(/\r\n/g) ?? []).length, l = (t.match(/\n/g) ?? []).length; return c === l ? 'CRLF' : c === 0 ? 'LF' : 'mixte'; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout.trim();
if (existsSync(join(root, PROP))) { console.log('ARRÊT : ' + PROP + ' existe déjà'); process.exit(1); }

const ENTETE = [
  '# Ocha — Document de conception v1',
  '',
  '## Addendum A10 · Définition opérationnelle de la fonction `interrogatif`',
  '',
  "**Statut** : 🔒 validé le " + DATE + " (préalable E5 d'A2-05), addendum de conception normatif et autonome, distinct d'`A2-LING-v1` et d'A9 ; validation autorisée par ChatGPT, sur délégation de l'utilisateur.",
  '',
  "**Origine** : préalable normatif E5 du périmètre de la cohérence rétroactive d'A2-05 (rapports `docs/rapports/etape2-A2-05-prealable-E5-interrogatif.md` et `docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`). Cet addendum reprend la partie I de la révision 4 de ce dernier ; sa partie II, mise à l'épreuve, reste dans le rapport. Il n'ajoute aucune décision qui n'y soit pas.",
];
const TITRE_P = "## Addendum A10 (proposé) · Définition opérationnelle de la fonction `interrogatif`";
// Liste fermée : toute autre différence avec la partie I est un écart
const SUBST = [
  ["| A7, A9 | **inchangés** ; A9, §6, décrira l'état antérieur à l'adoption éventuelle de cet addendum, sans que le texte d'A9 soit modifié |", "| A7, A9 | **inchangés** ; A9, §6, décrit l'état antérieur à l'adoption de cet addendum, sans que le texte d'A9 soit modifié |"],
  ['### Décisions de cet addendum (proposées)', '### Décisions de cet addendum'],
  ['| Point | Décision proposée |', '| Point | Décision |'],
  ["| A9, §6 | décrira l'état antérieur à l'adoption éventuelle, A9 restant inchangé |", "| A9, §6 | décrit l'état antérieur à l'adoption, A9 restant inchangé |"],
];
// Adaptation proposée de C6, non appliquée : le compte d'addenda est écrit en dur, et l'ordre alphabétique place A10 avant A2
const RELAIS = W + 'controle-relais-allege.mjs', C6_AVANT = "addenda[0] === 'A1' && addenda.at(-1) === 'A9' && addenda.length === 9", C6_APRES = "addenda.map((a) => +a.slice(1)).sort((x, y) => x - y).join() === '1,2,3,4,5,6,7,8,9,10'";
const LIGNE_SOM = "| A10 | `addendum-A10-interrogatif.md` | définition opérationnelle de la fonction `interrogatif` : demander une information non spécifiée ; attribution par le sens modélisé, jamais par la classe ni par la série ; recherche des omissions en trois temps ; contrôle rétroactif réservé à A2-05 (bloc F) |";

const partieI = (t) => { const L = LFs(t).split('\n'); const a = L.indexOf(TITRE_P), b = L.indexOf('# Partie II — Mise à l\'épreuve, et points à arbitrer'); if (a < 0 || b < 0) throw new Error('partie I introuvable'); const c = L.slice(a, b); while (c.length && (c[c.length - 1] === '' || c[c.length - 1] === '---')) c.pop(); return c.join('\n') + '\n'; };
const construire = (p1) => { let t = p1; for (const [x, y] of SUBST) { if (t.split(x).length !== 2) throw new Error('substitution non unique : ' + x.slice(0, 40)); t = t.replace(x, () => y); } return ENTETE.join('\n') + '\n\n' + t.split('\n').slice(2).join('\n'); };
const sections = (t) => { const S = {}; let k = 'avant'; for (const l of t.split('\n')) { if (/^### \d\. /.test(l)) k = l; else if (l.startsWith('### Décisions de cet addendum')) k = 'décisions'; (S[k] ??= []).push(l); } return S; };

// Contrôle d'invariance : rend la liste des écarts entre la partie I et l'addendum proposé
export function invariance(p1, ad) {
  const E = []; const a = sections(p1), b = sections(ad);
  const titres = (s) => Object.keys(s).filter((k) => k.startsWith('### ')); if (JSON.stringify(titres(a)) !== JSON.stringify(titres(b))) E.push('titres des sections');
  for (const k of titres(a)) { if (k.startsWith('### 7.')) { const av = (a[k] ?? []).filter((l, i) => l !== (b[k] ?? [])[i]), ap = (b[k] ?? []).filter((l, i) => l !== (a[k] ?? [])[i]); if ((a[k] ?? []).length !== (b[k] ?? []).length || av.length !== 1 || av[0] !== SUBST[0][0] || ap[0] !== SUBST[0][1]) E.push('§7 : hors de la substitution autorisée'); } else if ((a[k] ?? []).join('\n') !== (b[k] ?? []).join('\n')) E.push(k); }
  const objetA = a.avant.slice(a.avant.findIndex((l) => l.startsWith('**Objet**'))).join('\n'), objetB = b.avant.slice(b.avant.findIndex((l) => l.startsWith('**Objet**'))).join('\n'); if (objetA !== objetB) E.push('objet et limites');
  const entete = b.avant.slice(0, b.avant.findIndex((l) => l.startsWith('**Objet**'))).join('\n').replace(/\n+$/, ''); if (entete !== ENTETE.join('\n')) E.push('en-tête');
  const da = (a['décisions'] ?? []), db = (b['décisions'] ?? []); const dif = da.map((l, i) => [l, db[i]]).filter(([x, y]) => x !== y); if (da.length !== db.length || dif.length !== 3 || !dif.every(([x, y]) => SUBST.slice(1).some(([u, v]) => u === x && v === y))) E.push('table des décisions : hors des substitutions autorisées');
  if (/\(propos[ée]e?s?\)|Décision proposée|adoption éventuelle|pressenti/.test(ad)) E.push('formule de proposition restante');
  return E;
}

// Préconditions
ok(sha(readFileSync(join(root, E5))).startsWith(E5_SHA), 'P1 proposition, révision 4', E5_SHA + '…');
ok(sha(readFileSync(join(root, SOM))).startsWith(SOM_SHA), 'P2 sommaire de départ', SOM_SHA + '…');
ok(!git('diff', '--cached', '--name-only') && !git('diff', '--name-only'), 'P3 index vide ; aucun fichier suivi modifié');
ok(existsSync(join(root, CONS, 'ETAT-ACTUEL.md')), 'P4 consignation préparée, pour l\'essai combiné');
const addenda = readdirSync(join(root, 'docs/conception')).filter((n) => /^addendum-A\d+/.test(n)).map((n) => +n.match(/^addendum-A(\d+)/)[1]).sort((x, y) => x - y);
ok(JSON.stringify(addenda) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]) && !existsSync(join(root, CIBLE)), 'U1 unicité : `docs/conception/` contient A1 à A9, aucun fichier A10', addenda.join(','));
const emploi = spawnSync('git', ['grep', '-lE', '\\bA1[0-9]\\b', '--', 'tools', 'tests', 'docs/conception'], { cwd: root, encoding: 'utf8' }).stdout.trim();
ok(!emploi, 'U2 unicité : aucun numéro A10 à A19 dans `tools/`, `tests/`, `docs/conception/`', emploi || 'aucun');
const som0 = lire(SOM); ok(LFs(som0).split('\n').filter((l) => l.startsWith('| A9 |')).length === 1 && !/\bA10\b/.test(som0), 'P5 sommaire : ligne d\'A9 unique, A10 absent');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

const p1 = partieI(lire(E5)); const adLF = construire(p1); const eol = style(lire(A9)); const rendre = (t) => (eol === 'CRLF' ? t.replace(/\n/g, '\r\n') : t);
const somP = (() => { const crlf = style(som0) === 'CRLF'; const t = LFs(som0).split('\n').flatMap((l) => (l.startsWith('| A9 |') ? [l, LIGNE_SOM] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; })();

// Invariance et sabotages
const E0 = invariance(p1, adLF); ok(!E0.length, 'I1 invariance : §1 à §6 et §8 identiques ; objet et limites identiques ; §7 et table : substitutions de la liste fermée seules', E0.join(', ') || SUBST.length + ' substitutions, plus le titre et l\'en-tête');
ok(adLF.includes('> **`interrogatif`** — fonction grammaticale d\'un SENSE dont le rôle est de **demander une information non spécifiée**'), 'I2 définition présente, mot pour mot');
ok(adLF.split(DATE).length === 2, 'I3 une seule variable, la date d\'adoption');
const SAB = {
  'définition altérée': (t) => t.replace('demander une information non spécifiée** :', 'demander une information** :'),
  'liste fermée à la place de « notamment »': (t) => t.replace('non spécifiée** : notamment', 'non spécifiée** :'),
  'principe 1 altéré': (t) => t.replace('et que **la fiche source l\'atteste**', 'ou que **la fiche source l\'atteste**'),
  'frontière des indéfinis retirée': (t) => t.split('\n').filter((l) => !l.startsWith('1. **Les indéfinis.**')).join('\n'),
  'frontière du registre poli altérée': (t) => t.replace('ne reçoit pas `politesse` de ce seul fait', 'reçoit `politesse`'),
  'règle de cumul altérée': (t) => t.replace('**On ne scinde jamais un sens uniquement pour éviter un cumul.**', '**On scinde un sens pour éviter un cumul.**'),
  'méthode : temps 3 altéré': (t) => t.replace('**Temps 3 — relecture individuelle.**', '**Temps 3 — relecture par échantillon.**'),
  'méthode : phrase ajoutée au §8': (t) => t.replace('**Compte rendu obligatoire** :', 'Un filtre suffit.\n\n**Compte rendu obligatoire** :'),
  '§7 : effet modifié': (t) => t.replace('**aucun écart n\'est présumé**', '**un écart est présumé**'),
  'table des décisions : ligne ajoutée': (t) => t.replace('| Point | Décision |', '| Point | Décision |\n| Neuf | ajout |'),
  'formule « (proposé) » restante': (t) => t.replace('### Décisions de cet addendum', '### Décisions de cet addendum (proposées)'),
  'en-tête : statut altéré': (t) => t.replace('normatif et autonome', 'provisoire'),
  'objet : limite retirée': (t) => t.split('\n').filter((l) => !l.startsWith('- il ne modifie ni A7 ni A9')).join('\n'),
};
let vus = 0; for (const [n, s] of Object.entries(SAB)) { const t = s(adLF); const e = t !== adLF && invariance(p1, t).length > 0; if (e) vus++; ok(e, 'S sabotage détecté : ' + n, t === adLF ? 'sans effet' : invariance(p1, t).join(', ')); }
ok(vus === Object.keys(SAB).length, 'S ' + vus + ' sabotages détectés sur ' + Object.keys(SAB).length);

// Essais sur clones jetables
const EXCL_INST = (p) => p.endsWith('.zip') || p === W + 'sync-stable-apercu.md' || p.startsWith(OUT);
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (EXCL_INST(p)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const reel0 = instantane();
const adEssai = rendre(adLF).replace(DATE, ESSAI);
const plans = {};
for (const [nom, cons] of [['A10 seul', false], ['consignation puis A10', true]]) {
  const cl = cloner(root); const vises = [CIBLE, SOM];
  if (cons) for (const [p, n] of [['ETAT-ACTUEL.md', 'ETAT-ACTUEL.md'], ['ROADMAP.md', 'ROADMAP.md'], ['docs/rapports/etape2-A2-05-bilan-volet2.md', 'etape2-A2-05-bilan-volet2.md']]) { cl.ecrire(p, readFileSync(join(root, CONS, n))); vises.push(p); }
  cl.ecrire(CIBLE, adEssai); cl.ecrire(SOM, somP);
  plans[nom] = controler(cl, 'E ' + nom, ok, { tests: true, chemins: vises.filter((p) => p !== CIBLE), attendus: ['C6', 'C9b'] });
  if (cons) { const x = spawnSync(process.execPath, [cl.f('tools/export-relecture.mjs'), '--lot', 'lot-27', '--ref', 'HEAD', '--note', W + 'note-export-lot3-F-verifier-et-reprise.md'], { cwd: cl.C, encoding: 'utf8', maxBuffer: 1 << 28 }); const add = existsSync(cl.f('chatgpt-relecture/04-addenda.md')) ? readFileSync(cl.f('chatgpt-relecture/04-addenda.md'), 'utf8') : ''; ok(x.status === 0 && add.includes('Addendum A10 · Définition opérationnelle'), 'E ' + nom + ' : l\'export reprend A10 sans changement d\'outil', 'code ' + x.status); }
  const st = spawnSync('git', ['status', '--porcelain', '--', 'data', 'reconstruction', 'tools', 'tests'], { cwd: cl.C, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout.trim(); ok(!st, 'E ' + nom + ' : `data`, `reconstruction`, `tools`, `tests` intacts', st.slice(0, 120) || 'aucune modification');
  if (cons) {
    // Dans le clone seulement : commit simulé, sans C6 adapté puis avec, pour séparer l'écart transitoire (C9b) de l'écart permanent (C6)
    const g = (...a) => spawnSync('git', ['-c', 'user.name=essai', '-c', 'user.email=essai', ...a], { cwd: cl.C, encoding: 'utf8', maxBuffer: 1 << 28 });
    const relais = (...o) => { const r = cl.lancer(W + 'controle-relais-allege.mjs', '--apres-application', ...o); return { fin: r.out.split('\n').pop().slice(0, 60), ids: r.out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).join() }; };
    g('add', '--', ...vises); ok(g('commit', '--quiet', '--no-verify', '-m', 'essai').status === 0, 'E commit simulé, dans le clone seulement');
    const r1 = relais(); ok(r1.fin === '29 conformes sur 30' && r1.ids === 'C6', 'E après commit simulé, C6 non adapté : C9b levé, C6 seul', r1.fin + ' ; écarts : ' + r1.ids);
    const t0 = readFileSync(cl.f(RELAIS), 'utf8'); ok(t0.split(C6_AVANT).length === 2, 'E ancre de C6, une fois'); cl.ecrire(RELAIS, t0.replace(C6_AVANT, () => C6_APRES));
    const r2 = relais(); ok(r2.fin === '30 conformes sur 30' && !r2.ids, 'E après commit simulé, C6 adapté : relais normal 30 sur 30', r2.fin + ' ; écarts : ' + (r2.ids || 'aucun'));
    const r3 = relais('--strict'); ok(r3.fin === '29 conformes sur 30' && r3.ids === 'C5a', 'E après commit simulé, C6 adapté : `--strict` 29 sur 30, C5a seul, attendu après tout commit de contenu', r3.fin + ' ; écarts : ' + r3.ids);
    const sansA10 = (() => { rmSync(cl.f(CIBLE)); const r = relais(); cl.ecrire(CIBLE, adEssai); return r; })(); ok(sansA10.ids.split(',').includes('C6'), 'E sabotage : C6 adapté refuse encore un addendum manquant', sansA10.fin + ' ; écarts : ' + sansA10.ids);
  }
  cl.nettoyer();
}
const reel1 = instantane(); const ch = [...new Set([...Object.keys(reel0), ...Object.keys(reel1)])].filter((p) => reel0[p] !== reel1[p]);
ok(!ch.length && !git('diff', '--cached', '--name-only') && !git('diff', '--name-only') && !existsSync(join(root, CIBLE)), 'dépôt réel inchangé ; `docs/conception/` intact ; A10 absent ; index vide', ch.join(', ') || Object.keys(reel1).length + ' fichiers');

// Sorties
if (!ko) {
  mkdirSync(join(root, PROP, 'diffs'), { recursive: true });
  writeFileSync(join(root, PROP, 'partie-I-revision-4.md'), rendre(p1)); writeFileSync(join(root, PROP, 'addendum-A10-interrogatif.md'), rendre(adLF)); writeFileSync(join(root, PROP, '00-sommaire.md'), somP);
  writeFileSync(join(root, PROP, 'controle-relais-allege.mjs'), lire(RELAIS).replace(C6_AVANT, () => C6_APRES));
  const tab = []; for (const [a, b, n] of [[PROP + 'partie-I-revision-4.md', PROP + 'addendum-A10-interrogatif.md', 'addendum-A10-interrogatif.md.diff'], [SOM, PROP + '00-sommaire.md', '00-sommaire.md.diff'], [RELAIS, PROP + 'controle-relais-allege.mjs', 'controle-relais-allege.mjs.diff']]) { const r = diffBrut(root, a, b); ok(r.status === 1 && !r.stdout.includes('\r'), 'diff ciblé, sans CR : ' + n); writeFileSync(join(root, PROP, 'diffs', n), r.stdout); const c = (k) => r.stdout.split('\n').filter((l) => l.startsWith(k) && !l.startsWith(k + k + k)).length; tab.push('| `' + n + '` | `' + sha(readFileSync(join(root, b))) + '` | `' + sha(r.stdout) + '` | +' + c('+') + ' / −' + c('-') + ' |'); }
  writeFileSync(join(root, PROP, 'table-diffs.md'), '| Diff | Proposé | Empreinte du diff | Lignes |\n|---|---|---|---|\n' + tab.join('\n') + '\n\nPlans après essai : ' + Object.entries(plans).map(([k, v]) => k + ' `' + v + '`').join(' ; ') + '\n');
}
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation d\'A10 conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
