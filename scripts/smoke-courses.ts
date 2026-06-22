import { COURSES } from '../src/data/courses';
import { SITUATIONS as SITUATION_CARDS } from '../src/data/situations';

const errors: string[] = [];
const ok = (cond: boolean, msg: string) => { if (!cond) errors.push(msg); };

const situationIds = new Set(SITUATION_CARDS.map((s: any) => s.id));
const allModules = COURSES.flatMap(c => c.modules);
const ids = new Set<string>();
const keys = new Set<string>();

ok(COURSES.length === 9, `Forventet 9 kurs, fant ${COURSES.length}`);
ok(allModules.length === 32, `Forventet 32 moduler, fant ${allModules.length}`);

for (const m of allModules) {
  const at = `modul ${m.id}`;
  ok(!ids.has(m.id), `Duplisert id: ${m.id}`); ids.add(m.id);

  const v: any = m.video;
  ok(!!v, `${at}: mangler video-blokk`);
  if (v) {
    ok(v.videoKey === m.id, `${at}: videoKey != id (${v.videoKey})`);
    ok(!keys.has(v.videoKey), `${at}: duplisert videoKey ${v.videoKey}`);
    keys.add(v.videoKey);
    ok(v.status === 'script-ready', `${at}: status != script-ready`);
    ok(v.provider === 'bunny', `${at}: provider != bunny`);
    for (const f of ['bunnyLibraryId','bunnyVideoId','embedUrl','thumbnailUrl','durationSeconds','transcript']) {
      ok(v[f] === null, `${at}: video.${f} skal være null`);
    }
  }
  // Ingen gamle flate videofelt på modulnivå.
  for (const f of ['embedUrl','bunnyVideoId','bunnyLibraryId','videoUrl']) {
    ok(!(f in (m as any)), `${at}: flatt videofelt gjeninnført: ${f}`);
  }

  ok(typeof m.videoText === 'string' && m.videoText.includes('\n\n'),
     `${at}: videoText mangler dobbelt linjeskift (vignett + brødtekst)`);
  ok(!!m.screenText, `${at}: tom screenText`);
  ok(Array.isArray(m.reflectionQuestions) && m.reflectionQuestions.length >= 4,
     `${at}: < 4 refleksjonsspørsmål`);
  ok(Array.isArray(m.languageCards) && m.languageCards.length >= 3 && m.languageCards.length <= 5,
     `${at}: språkkort utenfor 3-5`);
  ok(!!m.microExercise, `${at}: tom microExercise`);
  ok(!!m.weeklyGoal, `${at}: tom weeklyGoal`);

  const d: any = m.depotExports;
  ok(!!d && !!d.todayAction && !!d.sundayQuestion && !!d.weeklyGoal && !!d.returnMessage,
     `${at}: ufullstendig depotExports`);

  if (m.situationCardId) ok(situationIds.has(m.situationCardId),
     `${at}: situationCardId finnes ikke i situations.ts: ${m.situationCardId}`);
  if (d && d.situationCardId) ok(situationIds.has(d.situationCardId),
     `${at}: depot.situationCardId finnes ikke: ${d.situationCardId}`);
}

if (errors.length) {
  console.error(`SMOKE-TEST: ${errors.length} FEIL`);
  for (const e of errors) console.error(' - ' + e);
  process.exit(1);
} else {
  console.log(`SMOKE-TEST: PASS - ${COURSES.length} kurs, ${allModules.length} moduler, alle kontrakter OK`);
}
