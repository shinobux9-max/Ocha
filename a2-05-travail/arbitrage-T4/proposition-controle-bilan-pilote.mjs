// A2-05 · volet 1 · lot 3 : contrôle des faits chiffrés du bilan du pilote (T1, T2, T3), en lecture seule. N'importe aucun module v2.
// Recalcule, à partir des rapports arbitrés, des périmètres, du manifeste et du registre : tailles, verdicts proposés et arbitrés, statuts,
// protection au manifeste, tri simple ou complexe, questions portées à l'arbitrage, taille des rapports ; vérifie que le bilan du pilote et le
// périmètre de T4 sont acceptés (§0), que chacun ne diffère de sa proposition sauvegardée que par la ligne de statut et le §0 inséré, que la
// proposition de T4 portait 35 sens, que le périmètre accepté de T4 est protégé au manifeste sans rapport d'audit, et que le registre porte
// toujours la condition du pilote. Code 1 au premier écart.
// Usage : node a2-05-travail/controle-bilan-pilote.mjs <racine du dépôt>
// PROPOSITION (2026-10-23), non appliquée : version adaptée à l'acceptation du bilan du pilote et du périmètre de T4.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n');
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
let ecarts = 0; const ctl = (ok, libelle, detail) => { if (!ok) ecarts++; console.log((ok ? 'conforme ' : 'ÉCART    ') + libelle + ' : ' + detail); };
const man = JSON.parse(txt('a2-05-travail/empreintes-rapports-arbitres.json')).empreintes;
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const ATTENDU = { T1: { n: 24, c: 23, e: 1, corr: ['V1-11'] }, T2: { n: 21, c: 20, e: 1, corr: ['V1-12'] }, T3: { n: 24, c: 22, e: 2, corr: ['V1-13', 'V1-14'] } };
let total = 0;
for (const [t, a] of Object.entries(ATTENDU)) {
  const p = R + t + '.md', q = R + t + '-perimetre.md'; const r = txt(p);
  const s1 = r.slice(r.indexOf('## 1. Résultat proposé'), r.indexOf('## 2. '));
  const lignes = [...s1.matchAll(/^\| [0-9]+ \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|.*\| \*\*(conforme|écart|suspendu)\*\* \| ([^|]+) \|$/gm)];
  const c = lignes.filter((m) => m[2] === 'conforme').length, e = lignes.filter((m) => m[2] === 'écart').length;
  const corr = lignes.map((m) => m[3].trim()).filter((x) => x !== '—');
  const s0 = r.slice(r.indexOf('## 0. Arbitrage'), r.indexOf('## 1. '));
  const retenus = new RegExp('Les ' + a.n + ' verdicts sont retenus : ' + a.c + ' conformes, ' + a.e + ' écarts?, aucun suspendu').test(s0);
  ctl(lignes.length === a.n && c === a.c && e === a.e && JSON.stringify(corr) === JSON.stringify(a.corr), t + ' : taille et verdicts proposés (§1)', lignes.length + ' sens, ' + c + ' conformes, ' + e + ' écart(s), corrections ' + corr.join(', '));
  ctl(/^\*\*Statut\*\* : \*\*arbitré le /m.test(r) && retenus, t + ' : arbitré, verdicts proposés tous retenus (§0)', (r.match(/^\*\*Statut\*\* : \*\*arbitré le [0-9-]+/m) ?? [''])[0].replace(/\*/g, '') + (retenus ? ' ; « ' + a.n + ' verdicts retenus »' : ' ; formule de retenue non trouvée'));
  ctl(man[p] === sha(p) && man[q] === sha(q) && /^\*\*Statut\*\* : \*\*périmètre accepté le /m.test(txt(q)), t + ' : rapport et périmètre protégés au manifeste, empreintes identiques', sha(p).slice(0, 12) + '… ; ' + sha(q).slice(0, 12) + '…');
  const complexes = (r.match(/\| \*\*complexe\*\* \|/g) ?? []).length; const questions = (r.slice(r.indexOf('## 7. Questions')).match(/^[0-9]+\. /gm) ?? []).length;
  console.log('constat  ' + t + ' : tri ' + complexes + ' complexe(s), ' + (a.n - complexes) + ' simple(s) ; ' + questions + ' questions au §7 ; rapport ' + brut(p).length + ' octets (' + Math.round(brut(p).length / a.n) + ' par sens), périmètre ' + brut(q).length + ' octets');
  total += a.n;
}
ctl(total === 69, 'pilote : 69 sens (T1, T2, T3), 65 conformes, 4 écarts', total + ' sens');
// Document accepté = proposition sauvegardée, à la ligne de statut près (ligne 4), plus le §0 inséré d'un bloc (ligne vide, « ## 0. Arbitrage », …).
const inscrit = (doc, prop, empreinte, statut, n0) => {
  const f = txt(doc).split('\n'), s = txt(prop).split('\n'); const i = f.indexOf('## 0. Arbitrage'), n = f.length - s.length;
  const reste = [...f.slice(0, i - 1), ...f.slice(i - 1 + n)];
  const ok = sha(prop).startsWith(empreinte) && i > 0 && f[i - 1] === '' && n === n0 && statut.test(f[3]) && /^\*\*Statut\*\* : \*\*proposition/.test(s[3]) && reste.length === s.length && reste.every((l, k) => k === 3 || l === s[k]);
  return { ok, detail: 'proposition ' + sha(prop).slice(0, 12) + '… ; §0 : ' + n + ' lignes insérées ; statut : ' + f[3].slice(0, 60).replace(/\*/g, '') };
};
const BP = R + 'bilan-pilote.md', bp = txt(BP);
const ibp = inscrit(BP, 'a2-05-travail/arbitrage-T4/proposition-bilan-pilote.md', '96ffa3983786', /^\*\*Statut\*\* : \*\*arbitré le 2026-10-23\*\* \(§0\)\./, 13);
ctl(ibp.ok && bp.includes('« **J\'accepte le bilan du pilote T1–T3**') && bp.includes('**La condition « bilan du pilote » de T4 est considérée comme satisfaite.**'), 'bilan du pilote : accepté (§0), condition du registre satisfaite ; proposition conservée, seuls changent le statut et le §0', ibp.detail);
const P4 = R + 'T4-perimetre.md', p4 = txt(P4), prop4 = txt('a2-05-travail/arbitrage-T4/proposition-T4-perimetre.md');
const n4 = (t) => [...t.slice(t.indexOf('## 2. '), t.indexOf('## 3. ')).matchAll(/^\| [0-9]+ \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|/gm)].length;
ctl(/^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(prop4) && !prop4.includes('## 0. Arbitrage') && n4(prop4) === 35, 'T4 : proposition sauvegardée en proposition, sans §0, 35 sens (fait historique)', n4(prop4) + ' sens ; ' + prop4.length + ' caractères');
const i4 = inscrit(P4, 'a2-05-travail/arbitrage-T4/proposition-T4-perimetre.md', '206be2459e29', /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-23 \(§0\)\.\*\*/, 10);
ctl(i4.ok && p4.includes('« **J\'accepte le périmètre T4 sans ajout ni retrait : C1 à C4, 35 sens dans 35 ENTRY, en une seule tranche.** »') && n4(p4) === 35, 'T4 : périmètre accepté (§0), 35 sens, en une seule tranche ; seuls changent le statut et le §0', i4.detail);
ctl(man[P4] === sha(P4) && !Object.hasOwn(man, R + 'T4.md'), 'T4 : périmètre accepté protégé au manifeste, empreinte identique ; aucun rapport d\'audit de T4 au manifeste', sha(P4).slice(0, 12) + '…');
const reg = JSON.parse(txt('a2-05-travail/registre-tranches.json')).tranches;
const t4 = reg.find((t) => t.id === 'T4');
ctl(t4?.condition === 'conditionnée au bilan du pilote ; divisible en deux' && reg.filter((t) => ['T1', 'T2', 'T3', 'T4'].includes(t.id)).every((t) => t.statut === 'planifiée'), 'registre : condition du pilote portée par T4 ; statuts non modifiés', 'T4 « ' + t4?.condition + ' » ; T1 à T4 « planifiée »');
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md'); const i86 = bilan.search(/^### 8\.86 /m);
ctl(i86 > 0 && !/^### 8\.[0-9]+ [^\n]*bilan du pilote/im.test(bilan.slice(0, i86)) && /^### 8\.87 [^\n]*bilan du pilote accepté/m.test(bilan), 'bilan du volet 2 : aucun bilan du pilote avant §8.86 ; acceptation consignée au §8.87', 'aucune sous-section antérieure à §8.86 intitulée « bilan du pilote » ; §8.87 présent');
ctl(Object.keys(man).length === 34 && Object.entries(man).every(([p, h]) => sha(p) === h), 'manifeste : 34 empreintes recalculées, identiques', Object.keys(man).length + ' entrées');
console.log(ecarts ? ecarts + ' écart(s)' : 'contrôle conforme');
process.exit(ecarts ? 1 : 0);
