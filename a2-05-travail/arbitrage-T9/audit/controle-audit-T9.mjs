// A2-05 · T9 : contrôle indépendant de l'audit des 24 sens, en proposition. N'importe aucun module v2 ; lecture seule ; n'écrit rien.
// Usage : node controle-audit-T9.mjs <racine du dépôt> [--sabotages]. Code 0 si tout est conforme (et, avec --sabotages, si chaque sabotage est détecté).
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const txt = (p) => readFileSync(join(root, p), 'utf8'); const json = (p) => JSON.parse(txt(p));
const RAPPORT = 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', PERIMETRE = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', BILAN = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ECARTS = { v_348_s2: 'V1-25', v_285_s1: 'V1-26', v_704_s2: 'V1-27', v_594_s1: 'V1-28', v_91_s1: 'V1-29', v_92_s1: 'V1-30', v_459_s1: 'V1-31' };
const NIVEAU2 = ['v_435_s1', 'v_443_s1', 'v_448_s1', 'v_463_s1', 'v_469_s1', 'v_477_s1'];
const DEICTIQUES = ['去年', '昨日', '来年', '一昨日', 'さ来年', '近々'];
const CHAMPS = ['Catégorie', 'Type', 'Fonctions', 'Dimensions', 'Tags', 'Relations', 'Particules', '`counter`'];
const base = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<\/?[a-z]+>/gi, '').replace(/\*+/g, '').replaceAll('’', "'").replace(/\s+/g, ' ').trim();
const forme = (s) => base(s).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const lignes = (t, a, b) => { const i = t.indexOf(a); return t.slice(i, t.indexOf(b, i)).split(/\r?\n/).filter((l) => /^\| \d+ \| `v_/.test(l)).map((l) => l.split('|').map((x) => x.trim())); };
// Citations de premier niveau, guillemets imbriqués compris
const citations = (t) => { const o = []; let d = 0, i0 = 0; for (let i = 0; i < t.length; i++) { if (t[i] === '«') { if (!d) i0 = i + 1; d++; } else if (t[i] === '»' && d) { d--; if (!d) o.push(t.slice(i0, i)); } } return o; };

function controler({ rapport, perimetre, vocab, sources, anciens, journal, lots, crible, normes, bilan }) {
  const R = []; const ok = (c, nom, d) => R.push({ c: !!c, nom, d: d ?? '' });
  const src = new Map(sources.map((s) => [s.id, s])); const sens = new Map(); for (const e of vocab) for (const s of e.senses) sens.set(s.id, { e, s });
  const mot = (w) => vocab.find((e) => e.word === w);
  const per = lignes(perimetre, '## 2. Les 24 sens', '## 3.').map((k) => k[2].replaceAll('`', ''));
  const rows = lignes(rapport, '## 1. Résultat proposé', '## 2. Méthode').map((k) => ({ id: k[2].replaceAll('`', ''), mot: k[3], trad: k[4], liv: k[5], cat: k[6].replaceAll('`', ''), type: k[7].replaceAll('`', ''), fonc: k[8].replaceAll('`', ''), v: k[10].replaceAll('*', ''), corr: k[11] }));
  ok(per.length === 24 && rows.length === 24 && new Set(rows.map((r) => r.id)).size === 24 && per.every((id, i) => rows[i]?.id === id), '24 lignes distinctes, mêmes sens et même ordre que le périmètre accepté', String(rows.length));
  const liv = (n) => rows.filter((r) => r.liv === n).length; ok(liv('E1') === 9 && liv('E2') === 12 && liv('E3') === 3, 'E1 9 sens, E2 12, E3 3', [liv('E1'), liv('E2'), liv('E3')].join(', '));
  ok(/\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/.test(rapport) && !/^## 0\. Arbitrage/m.test(rapport), 'statut : proposition ; aucun §0');
  const faux = rows.filter((r) => { const x = sens.get(r.id); if (!x) return true; return x.e.word !== r.mot || x.s.meaning.primary !== r.trad || cat(x.s.category) !== r.cat || String(x.s.semantic_type) !== r.type || (fns(x.s).join(', ') || 'aucune') !== r.fonc; });
  ok(!faux.length, '§1 égal aux données publiées', faux.map((r) => r.id).join(', '));
  const vb = rows.filter((r) => (ECARTS[r.id] ? r.v !== 'écart' || r.corr !== ECARTS[r.id] : r.v !== 'conforme' || r.corr !== '—'));
  ok(!vb.length && rows.filter((r) => r.v === 'conforme').length === 17, '17 conformes, 7 écarts (V1-25 à V1-31), aucun suspendu', vb.map((r) => r.id).join(', '));
  // Fiches d'examen
  const q4 = rapport.slice(rapport.indexOf('## 4. Les fiches'), rapport.indexOf('## 5. Points'));
  const bloc = (id) => q4.split('#### `' + id + '`')[1]?.split('#### `')[0] ?? '';
  const ch = (b, n) => b.split(/\r?\n/).find((l) => l.startsWith('- **' + n)) ?? '';
  const mq = []; const manq = []; for (const r of rows) { const b = bloc(r.id); const c = crible.find((x) => x.id === r.id); if (!b || !c) { mq.push(r.id + ' : fiche ou candidat absent'); continue; } const texte = ch(b, 'Motivation') + ch(b, 'Réserve'); for (const g of c.regles) if (!texte.includes(g.regle)) mq.push(r.id + ' : ' + g.regle); for (const k of CHAMPS) if (!texte.includes(k) && !(k === 'Fonctions' && texte.includes('`linguistic_functions`')) && !(k === 'Tags' && texte.includes('`tags`'))) manq.push(r.id + ' : ' + k); for (const k of ['Fiche source', 'Anciens exemples', 'État publié', 'Décisions de journal']) if (!ch(b, k)) manq.push(r.id + ' : ' + k); }
  ok(!mq.length, 'chaque règle du criblage, RES comprise, est examinée dans la motivation de son sens', mq.join(', '));
  ok(!manq.length, 'chaque fiche : huit champs nommés, fiche source, exemples, état publié, décisions', manq.join(', '));
  // Citations : tout passage entre guillemets de premier niveau se retrouve dans une source nommée
  const num = (id) => 'n5_v_' + id.match(/^v_(\d+)/)[1];
  const ids = [...new Set(rows.map((r) => num(r.id)))];
  const pasCite = []; for (const r of rows) { const b = bloc(r.id); const so = src.get(num(r.id)); const x = sens.get(r.id); const corpus = base([so?.nuance, so?.meanings?.primary, ...(so?.meanings?.secondary ?? []), so?.meanings?.primary + ' ; ' + (so?.meanings?.secondary ?? []).join(' ; '), so?.example?.french ?? so?.example?.translation, ...(anciens[num(r.id)] ?? []).map((q) => q.french ?? q.translation), x?.s.meaning.primary, ...(x?.s.meaning.alternatives ?? []), x?.s.nuance, x?.e.nuance, ...sources.flatMap((z) => [z.meanings?.primary, ...(z.meanings?.secondary ?? [])]), ...vocab.flatMap((e) => e.senses.flatMap((s) => [s.meaning.primary, ...(s.meaning.alternatives ?? [])])), ...journal.map((d) => d.reason), normes].join(' § ')); for (const q of citations(ch(b, 'Motivation') + ' ' + ch(b, 'Réserve'))) if (!corpus.includes(base(q))) pasCite.push(r.id + ' : ' + base(q)); }
  ok(!pasCite.length, 'citations retrouvées mot pour mot (fiche, décision, données, norme ou rapport du lot 15), sans exception', pasCite.join(' | '));
  const dc = [...new Set((q4.match(/D\d{4}/g) ?? []))].filter((n) => journal.find((x) => x.id === 'A2-04-' + n)?.status !== 'validated');
  ok(!dc.length, 'chaque décision citée existe et est validée', dc.join(', '));
  // Valeurs « avant » des sept corrections, et absence d'attribution déjà faite
  const av = { V125: sens.get('v_348_s2')?.s.meaning.alternatives, V126: fns(sens.get('v_285_s1')?.s ?? {}), V127: fns(sens.get('v_704_s2')?.s ?? {}), t594: mot('醤油')?.tags, t91: sens.get('v_91_s1')?.e.tags, t92: sens.get('v_92_s1')?.e.tags, t459: sens.get('v_459_s1')?.e.tags };
  ok(JSON.stringify(av.V125) === '["Auparavant"]' && !av.V126.length && !av.V127.length && JSON.stringify(av.t594) === '["lieu_konbini","lieu_restaurant"]' && [av.t91, av.t92, av.t459].every((t) => JSON.stringify(t) === '["lieu_restaurant"]'), 'valeurs « avant » des sept corrections égales aux données publiées : aucune appliquée', JSON.stringify(av));
  ok(!/\| V1-(2[5-9]|3[01]) \|/.test(bilan), 'V1-25 à V1-31 non attribués au bilan');
  ok(!/\bV1-3[2-9]\b/.test(rapport), 'aucun identifiant au-delà de V1-31');
  // Traductions
  const abs = []; for (const r of rows) { const x = sens.get(r.id); const so = src.get(num(r.id)); const f = [so?.meanings?.primary, ...(so?.meanings?.secondary ?? [])].map(forme); for (const t of [x?.s.meaning.primary, ...(x?.s.meaning.alternatives ?? [])]) if (!f.some((z) => z === forme(t) || z.includes(forme(t)))) abs.push(r.id + ' : ' + t); }
  ok(abs.sort().join('|') === "v_285_s1 : L'avant-dernière année|v_348_s2 : Auparavant|v_704_s2 : Bientôt", 'trois traductions publiées absentes des traductions des fiches, chacune traitée au rapport', abs.join(' ; '));
  const toute = (id) => { const z = src.get(id); return base([z?.nuance, z?.meanings?.primary, ...(z?.meanings?.secondary ?? []), z?.example?.french ?? z?.example?.translation, ...(anciens[id] ?? []).map((q) => q.french ?? q.translation)].join(' § ')).toLowerCase(); };
  ok(!toute('n5_v_348').includes('auparavant') && toute('n5_v_704').includes('bientôt') && toute('n5_v_285').includes("l'année précédant l'année dernière"), '« Auparavant » nulle part dans la fiche ; « bientôt » et la description de おととし y sont');
  // Faits établis par les fiches
  const ex = (id) => [src.get(id)?.example, ...(anciens[id] ?? [])].filter(Boolean).map((q) => ({ j: base(q.japanese), f: base(q.french ?? q.translation) }));
  ok(ex('n5_v_347').length === 4 && ex('n5_v_347').every((q) => /先 に/.test(q.j)), '先 : quatre exemples, tous en 先 に, aucun spatial');
  ok(ex('n5_v_704').length === 4 && ex('n5_v_704').every((q) => /の 近く/.test(q.j)), '近く : quatre exemples, tous spatiaux, aucun temporel');
  ok(ex('n5_v_348').filter((q) => /始まる 前/.test(q.j)).length === 1 && !ex('n5_v_348').some((q) => /年前|年 前/.test(q.j)), '前 : un seul exemple temporel, relatif à une action, aucun 三年前');
  ok(ex('n5_v_659').length === 4 && !ex('n5_v_659').some((q) => /non merci|refus/i.test(q.f)), '嫌 : quatre exemples, aucun refus');
  ok(ex('n5_v_465').length === 4 && !ex('n5_v_465').some((q) => /aïe/i.test(q.f)), '痛い : quatre exemples, aucune exclamation');
  ok(/plutôt l'adjectif spécifique 安い/.test(base(src.get('n5_v_183')?.nuance)), '低い : la fiche renvoie à 安い pour un prix');
  ok(/degré élevé/.test(src.get('n5_v_495')?.nuance ?? '') && ex('n5_v_495').some((q) => /大変 あつい/.test(q.j)) && fns(sens.get('v_495_s1')?.s ?? {}).join() === 'intensifieur', '大変 : degré élevé attesté, 大変 あつい, intensifieur publié');
  const lieu = /レストラン|カフェ|食堂|コンビニ|スーパー/; const nb = (id) => ex(id).filter((q) => lieu.test(q.j)).length;
  ok(nb('n5_v_92') === 2 && nb('n5_v_91') === 0 && nb('n5_v_459') === 0 && nb('n5_v_594') === 0, 'lieux nommés dans les exemples : 昼ご飯 deux, 晩ご飯, 朝ご飯 et 醤油 aucun', [nb('n5_v_92'), nb('n5_v_91'), nb('n5_v_459'), nb('n5_v_594')].join(', '));
  ok(/お握り/.test(ex('n5_v_92')[3]?.j ?? ''), '昼ご飯 : le troisième ancien exemple est un onigiri');
  // Comparables et normes
  const dx = DEICTIQUES.filter((w) => !mot(w)?.senses.some((s) => fns(s).includes('deictique')));
  ok(!dx.length && fns(mot('後')?.senses[0] ?? {}).includes('deictique'), 'comparables : 去年, 昨日, 来年, 一昨日, さ来年, 近々 et 後 s1 portent `deictique`', dx.join(', '));
  ok(!fns(sens.get('v_347_s2')?.s ?? {}).length && !fns(sens.get('v_348_s2')?.s ?? {}).length, '先 s2 et 前 s2 sans fonction');
  ok(['塩', '砂糖', '夕飯'].every((w) => mot(w) && !(mot(w).tags ?? []).length), '塩, 砂糖 et 夕飯 sans tag');
  ok(mot('高い')?.senses.some((s) => /Cher/.test(s.meaning.primary)) && mot('低い')?.senses.length === 1, '高い a un sens « Cher », 低い un seul sens');
  ok(mot('長い')?.senses[0].meaning.alternatives.length === 0 && mot('短い')?.senses[0].meaning.alternatives.join() === 'Bref', '短い garde « Bref », 長い sans alternative');
  ok(cat(mot('大きい')?.senses[0].category).endsWith('taille') && cat(mot('小さな')?.senses[0].category).endsWith('taille') && /superficie/.test(mot('大きい')?.nuance ?? '') && /superficie/.test(mot('小さい')?.nuance ?? ''), '大きい et 小さな en `taille` ; les nuances d\'ENTRY de 大きい et 小さい nomment la superficie');
  const n2 = NIVEAU2.filter((id) => { const c = sens.get(id)?.s.category; return !c || c.level_3 || c.level_2 !== 'dimensions'; });
  ok(!n2.length, 'les six adjectifs au niveau 2 `dimensions`', n2.join(', '));
  ok(base(normes).includes("Le Level 3 n'est pas obligatoire. Un Level 2 suffisamment précis peut recevoir directement des entrées lexicales."), 'A2-L3 : le niveau 3 n\'est pas obligatoire');
  ok(base(normes).includes('おととし « il y a deux ans », 近く « prochainement »') && base(normes).includes('au minimum おととし') && base(normes).includes('le refus pour 嫌') && base(normes).includes('le registre n\'a aucune catégorie du degré'), 'A7, §2 et §5 ; A9, §2.1 et §4.1 : passages cités présents');
  // Décisions
  const dec = journal.filter((x) => ids.includes(x.entry));
  ok(ids.length === 21 && dec.length === 41 && dec.every((x) => x.status === 'validated'), '21 ENTRY ; 41 décisions, toutes validées', String(dec.length));
  ok(ids.every((id) => lots.some((l) => l.entries?.[id]?.status === 'validated')), 'les 21 ENTRY validées dans leur lot');
  ok(!journal.filter((x) => ids.includes(x.entry) && /lieu_/.test(String(x.field) + x.reason) && /tags/.test(String(x.field))).filter((x) => ['n5_v_594', 'n5_v_91', 'n5_v_92', 'n5_v_459'].includes(x.entry)).length, 'aucune décision ne porte sur les tags de 醤油, 晩ご飯, 昼ご飯 et 朝ご飯');
  ok(journal.find((x) => x.id === 'A2-04-D0173')?.reason.includes('La décision du lot 0 pour 晩ご飯 n\'est pas une règle'), 'D0173 signale le tag de 晩ご飯 à l\'audit');
  return R;
}
const sb = json('reconstruction/a2-04/sources/vocab.json'), eb = json('reconstruction/a2-04/sources/exemples.json');
const NORMES = ['docs/conception/a2/A2-L3-v1.md', 'docs/conception/addendum-A7-deictique.md', 'docs/conception/addendum-A9-fonctions-linguistiques.md', 'docs/rapports/etape2-A2-04-lot15-valide.md'];
const D = { rapport: txt(RAPPORT), perimetre: txt(PERIMETRE), bilan: txt(BILAN), vocab: [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')], sources: Array.isArray(sb) ? sb : (sb.vocab ?? sb.items), anciens: eb.vocab ?? eb, journal: json('reconstruction/a2-04/journal.json'), lots: readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => json('reconstruction/a2-04/lots/' + f)), crible: json('a2-05-travail/criblage/resultat.json').candidats, normes: NORMES.map(txt).join('\n') };
const R = controler(D);
const git = (...a) => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8' });
const sous = git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').trim();
R.push({ c: !sous, nom: 'data/, reconstruction/, tests/, tools/, docs/conception/ sans modification', d: sous }); R.push({ c: !git('diff', '--cached', '--name-only').trim(), nom: 'index vide' });
R.push({ c: git('rev-parse', 'HEAD').trim() === '78031638c0f81dca1b167e3f57f5a891767fc4cb', nom: 'HEAD à 7803163' });
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const diff = Object.entries(man).filter(([p, h]) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);
R.push({ c: Object.keys(man).length === 44 && !diff.length, nom: '44 empreintes recalculées, identiques', d: diff.join(', ') }); R.push({ c: !Object.hasOwn(man, RAPPORT), nom: 'rapport d\'audit de T9 hors du manifeste' });
for (const r of R) console.log((r.c ? 'conforme  ' : 'ÉCART     ') + r.nom + (r.d && !r.c ? ' — ' + r.d : ''));
const ko = R.filter((r) => !r.c).length; console.log('\n' + (R.length - ko) + ' conformes sur ' + R.length);
let sok = true;
if (process.argv.includes('--sabotages')) {
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const e = (d, id) => d.vocab.find((x) => x.id === id);
  const S = {
    'verdict changé': (d) => { d.rapport = d.rapport.replace('| **conforme** | — |', '| **écart** | — |'); },
    'sens retiré du §1': (d) => { d.rapport = d.rapport.split(/\r?\n/).filter((l) => !l.includes('| `v_495_s1` | 大変 |')).join('\n'); },
    'correction déjà appliquée : Auparavant': (d) => { e(d, 'v_348').senses[1].meaning.alternatives = []; },
    'correction déjà appliquée : tag': (d) => { e(d, 'v_92').tags = []; },
    'fonction ajoutée à 先 s2': (d) => { e(d, 'v_347').senses[1].linguistic_functions.grammatical.push('deictique'); },
    'traduction nouvelle': (d) => { e(d, 'v_468').senses[0].meaning.alternatives.push('Exigu'); },
    'citation altérée dans une motivation': (d) => { d.rapport = d.rapport.replace('« Vocabulaire peu utile dans les deux lieux »', '« Vocabulaire inutile dans les deux lieux »'); },
    'règle retirée d\'une motivation': (d) => { d.rapport = d.rapport.replace('`C10-a` : ce renvoi', 'ce renvoi'); },
    'exemple de 近く devenu temporel': (d) => { d.anciens.n5_v_704[0].japanese = '近く 行きます'; },
    'lieu ajouté à un exemple de 朝ご飯': (d) => { d.anciens.n5_v_459[0].japanese = 'レストラン で 朝ご飯 を 食べます'; },
    'niveau 3 ajouté à 厚い': (d) => { e(d, 'v_435').senses[0].category.level_3 = 'taille'; },
    'décision dévalidée': (d) => { d.journal.find((x) => x.id === 'A2-04-D0173').status = 'proposed'; },
    'norme A2-L3 altérée': (d) => { d.normes = d.normes.replace('pas obligatoire', 'obligatoire'); },
    'V1-25 déjà attribué au bilan': (d) => { d.bilan += '\n| V1-25 | x |\n'; },
    'statut arbitré': (d) => { d.rapport = d.rapport.replace('**Statut** : **proposition, non arbitrée.**', '**Statut** : **arbitré.**'); },
  };
  let n = 0; for (const [nom, f] of Object.entries(S)) { const d = clone(D); f(d); const x = controler(d).filter((r) => !r.c); if (x.length) n++; console.log((x.length ? 'détecté   ' : 'NON VU    ') + nom + (x.length ? ' — ' + x[0].nom : '')); }
  const tem = !controler(clone(D)).some((r) => !r.c); console.log('témoin sain : ' + (tem ? 'conforme' : 'ÉCART')); console.log(n + ' sabotages détectés sur ' + Object.keys(S).length); sok = tem && n === Object.keys(S).length;
}
process.exit(ko || !sok ? 1 : 0);
