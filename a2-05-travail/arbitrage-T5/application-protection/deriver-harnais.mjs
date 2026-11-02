// Dérive, hors dépôt, le harnais des sabotages après application : remplacements ciblés, chacun exigé unique.
import { readFileSync, writeFileSync } from 'node:fs';
let t = readFileSync(process.argv[2], 'utf8');
const rep = (a, b) => { if (t.split(a).length !== 2) throw new Error('motif absent ou multiple : ' + a.slice(0, 70)); t = t.replace(a, () => b); };
const coupe = (debut, fin, par) => { const i = t.indexOf(debut), j = t.indexOf(fin, i); if (i < 0 || j < 0 || t.indexOf(debut, i + 1) >= 0) throw new Error('bornes : ' + debut.slice(0, 50)); t = t.slice(0, i) + par + t.slice(j + fin.length); };
rep("// A2-05 · volet 1 · lot 3 : essais,", "// DÉRIVÉ HORS DÉPÔT (2026-10-27) du harnais relu preparer-protection-rapport-T5.mjs (d5846e75ef17…), pour l'état d'après application :\n// préconditions d'après application ; étapes A et B retirées (l'état B est l'état réel) ; sabotages inchangés, lancés contre les scripts EN SERVICE.\n// A2-05 · volet 1 · lot 3 : essais,");
coupe("ok(avant[CBP].startsWith('fd30fcaa127d')", "if (ko) arret('préconditions non conformes');",
  "ok(avant[CBP].startsWith('3c24223897ed') && avant[REC].startsWith('7f23952def9a') && avant[CBP] === avant[PCBP] && avant[REC] === avant[PREC], 'P1 scripts en service = propositions relues', 'contrôle ' + avant[CBP].slice(0, 12) + '… ; recalcul ' + avant[REC].slice(0, 12) + '…');\n" +
  "ok(Object.keys(man0).length === 37 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && Object.keys(man0)[35] === P5 && Object.keys(man0)[36] === T5R, 'P2 manifeste : 37 empreintes identiques ; périmètre de T5 en 36e, rapport de T5 en 37e');\n" +
  "ok(avant[T5R].startsWith('4121ed863c5f') && existsSync(join(root, REF)) && sha(join(root, REF)).startsWith('757083e5ca9268c5'), 'P3 rapport de T5 inchangé ; référence du §0 écrite', sha(join(root, REF)).slice(0, 16) + '…');\n" +
  "if (ko) arret('préconditions non conformes');");
coupe("const e1 = run(PREF, '--ecrire');", "console.log('constat  B8 relais : ' + B.rel.fin);",
  "const B = { cbp: run(CBP), rec: run(REC), emp: run(W + 'empreintes-lot3.mjs'), rel: run(W + 'controle-relais-allege.mjs', '--apres-application') };\nfor (const [k, r] of Object.entries(B)) releve('copie ' + k, r);\n" +
  "ok(B.cbp.code === 0 && B.rec.code === 0 && B.emp.fin.includes('37 rapports contrôlés, identiques'), 'copie : contrôle et recalcul en service conformes ; 37 empreintes');");
rep("const sain = (n) => { const a = run(PCBP), b = run(PREC);", "const sain = (n) => { const a = run(CBP), b = run(REC);");
rep("'témoin sain ' + n + ' (contrôle et recalcul proposés)'", "'témoin sain ' + n + ' (contrôle et recalcul en service)'");
rep("const r = run(script); const vus", "const r = run(script === PCBP ? CBP : REC); const vus");
rep("(script === PCBP ? 'contrôle' : 'recalcul') + ' proposé'", "(script === PCBP ? 'contrôle' : 'recalcul') + ' en service'");
rep("ok(!change.length && !existsSync(join(root, REF)), 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins ; référence non écrite)'", "ok(!change.length && sha(join(root, REF)).startsWith('757083e5ca9268c5'), 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins ; référence intacte)'");
writeFileSync(process.argv[3], t);
