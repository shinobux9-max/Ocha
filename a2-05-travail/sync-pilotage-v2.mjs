// A2-05 · volet 1 · lot 3 : synchronisation documentaire stable (outillage v2, en proposition, non adopté).
// Calcule, à partir du registre de couverture, de la liste globale des corrections et du registre des tranches, les blocs que les
// documents de pilotage porteraient entre des marqueurs fixes. Ce script n'écrit qu'un APERÇU : il ne modifie aucun document de pilotage ;
// l'insertion des marqueurs et le mode d'application relèvent d'une décision distincte.
// Usage : node sync-pilotage-v2.mjs <racine du dépôt>   (écrit a2-05-travail/sync-pilotage-v2-apercu.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { couverture } from './couverture-lot3.mjs';
import { verifierEmpreintes } from './empreintes-lot3.mjs';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const LF = String.fromCharCode(10);
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, LF);
const cov = couverture(root); const emp = verifierEmpreintes(root);
// Liste globale des corrections : V1 et V2 du §8 du bilan, et les modifications du volet 2 (avant le §7)
const b = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
const m = new Map(); for (const l of b.slice(b.search(/^## 8\. /m)).split(LF)) { const r = l.match(/^\| (V[12]-\d+) \| (?:[a-z]+ \| )?`((?:hj_)?v_\d+)(?:_s\d+)?`/); if (r && !m.has(r[1])) m.set(r[1], r[2]); }
const vol2 = []; for (const l of b.slice(0, b.search(/^## 7\. /m)).split(LF)) { const r = l.match(/^\| (\d+) \| `((?:hj_)?v_\d+)_s\d+` \|/); if (r) vol2.push(r[2]); }
const v1 = [...m.keys()].filter((k) => k.startsWith('V1')); const total = m.size + vol2.length; const entry = new Set([...m.values(), ...vol2]).size;
const libre = 'V1-' + (Math.max(...v1.map((k) => +k.slice(3))) + 1);
const reg = JSON.parse(txt('a2-05-travail/registre-tranches.json'));
const tranches = reg.tranches.map((t) => ({ ...t, sens: cov.sens.filter((s) => t.livraisons.includes(s.livraison)).length }));
const couvertes = new Set(tranches.flatMap((t) => t.livraisons));
const restantes = Object.entries(cov.etats).filter(([, e]) => e === 'absent').map(([l]) => l);
const horsRegistre = restantes.filter((l) => !couvertes.has(l));
if (horsRegistre.length) throw new Error('livraisons restantes absentes du registre des tranches : ' + horsRegistre.join(', '));
if (tranches.flatMap((t) => t.livraisons).length !== couvertes.size) throw new Error('une livraison figure dans deux tranches');
const horsF = tranches.filter((t) => t.id !== 'F').reduce((n, t) => n + t.sens, 0);

const ETAT = ['<!-- a2-05:etat:debut (bloc généré par a2-05-travail/sync-pilotage-v2.mjs ; ne pas modifier à la main) -->',
  '- **Lot 3** : ' + cov.totaux.arbitres + ' sens arbitrés sur 377 ; ' + (377 - cov.totaux.arbitres) + ' restent (' + cov.totaux.proposes + ' proposés). **Bloc B** : ' + cov.totaux.blocBArbitres + ' sur ' + cov.totaux.blocB + '.',
  '- **Corrections retenues, non appliquées** : ' + total + ', dans ' + entry + ' ENTRY ; prochain numéro libre : ' + libre + '.',
  '- **Tranches** : ' + tranches.map((t) => t.id + ' (' + t.livraisons.join(', ') + ' ; ' + t.sens + ' sens ; ' + t.statut + ')').join(' ; ') + ' ; ' + horsF + ' sens hors du bloc F.',
  '- **Contrôles** : registre de couverture sans omission ni doublon ; manifeste d\'empreintes, ' + emp.controles + ' rapports arbitrés identiques.',
  '<!-- a2-05:etat:fin -->'];
const P = ['# Aperçu de la synchronisation documentaire stable (proposition, non appliquée)', '', '**Date** : 2026-10-18', "**Statut** : **aperçu généré par `a2-05-travail/sync-pilotage-v2.mjs`, sans effet sur les documents de pilotage.** Aucun marqueur n'est inséré ; aucun document n'est modifié.", '',
  '## 1. Bloc d\'état commun, identique dans `ETAT-ACTUEL.md` et `ROADMAP.md`', '', 'Il remplacerait les nombres aujourd\'hui recopiés à la main dans les cinq rubriques ; le texte rédigé (décisions, motifs, prochaine action) resterait écrit à la main, hors des marqueurs.', '', '```markdown', ...ETAT, '```', '',
  '## 2. Modèles générés à chaque cycle', '', '- **Ligne du journal d\'`ETAT-ACTUEL.md`** : `| <date> | 2 · A2-05 | <tranche> : <objet> ; ' + cov.totaux.arbitres + ' arbitrés sur 377 ; ' + total + ' corrections dans ' + entry + ' ENTRY. | non committé |`, les nombres étant calculés.', '- **Sous-section du bilan du volet 2** : en-tête, renvoi au rapport, et nombres calculés ; le texte de l\'arbitrage est recopié depuis le §0 du rapport, non réécrit.', '- **Puce du relais allégé** : une ligne par cycle (voir la proposition de relais allégé).', '',
  '## 3. Contrôles du script', '', '| Contrôle | Résultat |', '|---|---|', '| Livraisons restantes toutes rattachées à une tranche | ' + restantes.length + ' livraisons, aucune hors registre |', '| Aucune livraison dans deux tranches | contrôlé |', '| Sens hors du bloc F dans les tranches | ' + horsF + ' |', '| Liste globale recalculée | ' + v1.length + ' V1, ' + (m.size - v1.length) + ' V2, ' + vol2.length + ' modifications du volet 2 : ' + total + ' corrections, ' + entry + ' ENTRY |', '',
  '## 4. Ce que l\'adoption demanderait', '', '1. Insérer une fois les marqueurs dans `ETAT-ACTUEL.md` et `ROADMAP.md`, à la place des nombres des cinq rubriques (proposition à relire).', '2. Ajouter un mode d\'application qui ne remplace que le contenu entre marqueurs, et s\'arrête si les marqueurs manquent ou sont dupliqués.', '3. Retirer les scripts de synchronisation propres à chaque cycle (`tourNN.mjs`).', ''];
writeFileSync(join(root, 'a2-05-travail/sync-pilotage-v2-apercu.md'), P.join(LF) + LF);
console.log('aperçu : ' + cov.totaux.arbitres + '/377 ; ' + total + ' corrections, ' + entry + ' ENTRY, libre ' + libre + ' ; tranches : ' + tranches.map((t) => t.id + '=' + t.sens).join(', ') + ' ; hors F : ' + horsF);
