/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { PUBLIC_COURSES } from '../data/publicCourses';
import { COURSE_CATALOG } from '../data/courseCatalog';
import { loadCourseContent } from '../lib/courseContent';
import { loadVideoPlayback } from '../lib/videoPlayback';
import { COURSE_LAUNCH_STATUS, PARKURS_STATUS } from '../lib/productCopy';
import { CourseModule, UserOnboarding } from '../types';
import { BookOpen, CheckCircle, ChevronRight, Play, FileText, Sparkles, HelpCircle, Heart, Trash, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'motion/react';

// Anbefalt lesesti basert på onboarding (bok: «Før vi begynner» – akutt → modul 2,3,5; stille → 1,6,9; ungdom → 7).
function recommendedStart(onb: UserOnboarding | null): string | null {
  if (!onb) return null;
  if (onb.heaviestNow === 'Ungdom')
    return 'For ungdom og tenåringer er beredskapskapittelet skrevet som en egen inngang – start gjerne med «De mørke veikryssene» (modul 7).';
  if (onb.heaviestNow === 'Min egen reaksjon' || onb.desiredHelp === 'Regulere meg selv' || onb.desiredHelp === 'Reparere etter konflikt')
    return 'Står dere mest i akutte utbrudd, peker boken på føreren, lånte bremser og reparasjon – modul 2, 3 og 5.';
  if (onb.desiredHelp === 'Forstå barnet' || onb.desiredHelp === 'Holde retning over tid' || onb.heaviestNow === 'Skole')
    return 'Er bekymringen mer stille, begynner boken med blikket, motorveien og det lange løpet – modul 1, 6 og 8.';
  return 'For hverdagens harde øyeblikk peker boken på lånte bremser og autovern – modul 3 og 4.';
}

export const CoursesView: React.FC = () => {
  const { user, toggleCompletedModule, updateWeeklyGoal } = useAppState();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [courses, setCourses] = useState(PUBLIC_COURSES);
  const [catalog, setCatalog] = useState(
    COURSE_CATALOG.map((course) => ({ ...course, unlocked: course.availability === 'public' })),
  );

  // Reflection form answers stored locally per lesson
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [videoPlayback, setVideoPlayback] = useState<{ videoKey: string; embedUrl: string } | null>(null);
  const [videoPlaybackLoading, setVideoPlaybackLoading] = useState(false);
  const [videoPlaybackFailed, setVideoPlaybackFailed] = useState(false);

  const activeCourse = courses.find(c => c.id === selectedCourseId);
  const activeModule = activeCourse?.modules.find(m => m.id === selectedModuleId);

  useEffect(() => {
    let cancelled = false;
    loadCourseContent().then((response) => {
      if (!response || cancelled) return;
      setCourses(response.courses);
      setCatalog(response.catalog);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!showExportSuccess) return;
    const timeoutId = window.setTimeout(() => setShowExportSuccess(false), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [showExportSuccess]);

  useEffect(() => {
    const videoKey = activeModule?.video?.videoKey;
    const published = activeModule?.video?.status === 'published';
    setVideoPlayback(null);
    setVideoPlaybackFailed(false);
    setVideoPlaybackLoading(Boolean(videoKey && published));
    if (!videoKey || !published) return;

    let cancelled = false;
    loadVideoPlayback(videoKey).then((result) => {
      if (cancelled) return;
      setVideoPlaybackLoading(false);
      if (result) setVideoPlayback({ videoKey, embedUrl: result.embedUrl });
      else setVideoPlaybackFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, [activeModule?.video?.status, activeModule?.video?.videoKey]);

  const activeVideoUrl =
    activeModule?.video && videoPlayback?.videoKey === activeModule.video.videoKey
      ? videoPlayback.embedUrl
      : null;

  const handleCompleteModule = (mod: CourseModule) => {
    toggleCompletedModule(mod.id, mod.depotExports);
    setShowExportSuccess(true);
  };

  const handleActivateGoal = (goal: string) => {
    updateWeeklyGoal(goal);
    alert('Ukesmålet er satt som ditt aktive mål i "I dag" og "Søndagsverkstedet"!');
  };

  const isModuleCompleted = (modId: string) => {
    return user?.completedModules.includes(modId) || false;
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {activeModule && activeCourse ? (
        /* 1. Module Reader */
        <motion.div 
          initial={{ opacity: 0, y: 5 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pb-20"
        >
          {/* Top Return Navigation */}
          <button
            id="course-reader-back-btn"
            onClick={() => setSelectedModuleId(null)}
            className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-stone-800 transition-colors py-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tilbake til {activeCourse.title}</span>
          </button>

          {/* Module Banner */}
          <div className="space-y-2">
            <span className="text-xxs uppercase tracking-widest text-stone-400">
              Leksjonsmateriale ({courses.findIndex(c => c.id === activeCourse.id) + 1}/{courses.length})
            </span>
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="module-reader-title">
              {activeModule.title}
            </h2>
            <div className="flex gap-2 items-center">
              <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                {activeCourse.title}
              </span>
              {isModuleCompleted(activeModule.id) && (
                <span className="text-xxs bg-green-50 text-green-700/80 px-2 py-0.5 rounded font-bold border border-green-200">
                  FULLFØRT
                </span>
              )}
            </div>
          </div>

          <div className="space-y-8 divide-y divide-stone-150 pt-2 selection:bg-stone-200">
            
            {/* Vignette Scene */}
            <div className="space-y-3 pb-6">
              <p className="text-stone-400 text-xxs uppercase tracking-widest">En scene fra hverdagen</p>
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 italic font-serif text-stone-850 text-sm leading-relaxed shadow-xxs">
                {activeModule.videoText.split('\n\n')[0]}
              </div>
            </div>

            {/* Bunny-video: signert URL hentes fra server og utløper etter kort tid. */}
            {activeVideoUrl && (
              <div className="pt-2 pb-6">
                <div className="relative w-full overflow-hidden rounded-xl border border-stone-200 bg-black" style={{ aspectRatio: '16 / 9' }}>
                  <iframe
                    src={activeVideoUrl}
                    title={activeModule.title}
                    loading="lazy"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}
            {activeModule.video?.status === 'published' && !activeVideoUrl && (
              <div className="pt-2 pb-6" role="status">
                <p className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-600">
                  {videoPlaybackLoading
                    ? 'Laster video…'
                    : videoPlaybackFailed
                      ? 'Videoen kunne ikke lastes. Hele modulen kan fortsatt leses nedenfor.'
                      : 'Videoen klargjøres.'}
                </p>
              </div>
            )}

            {/* Perspektiv / lesetekst (videomanus). Fullverdig leseversjon når video mangler. */}
            <div className="space-y-4 pt-6 pb-6">
              <p className="text-stone-400 text-xxs uppercase tracking-widest">
                {activeVideoUrl ? 'Les i stedet' : 'Perspektiv og læring · Leseversjon'}
              </p>
              <div className="space-y-4 text-stone-700 text-sm leading-relaxed font-serif">
                {activeModule.videoText.split('\n\n').slice(1).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Screen Text (Short summary) */}
            <div className="space-y-2 pt-6 pb-6 bg-stone-50 p-4 rounded-xl border border-stone-200/50">
              <span className="text-stone-400 text-xxs uppercase tracking-widest block">Kort skjermtekst</span>
              <p className="text-xs text-stone-700 font-medium leading-relaxed">
                {activeModule.screenText}
              </p>
            </div>

            {/* Reflection Questions */}
            <div className="space-y-5 pt-6 pb-6">
              <p className="text-stone-400 text-xxs uppercase tracking-widest">Interaktive refleksjonsspørsmål</p>
              <div className="space-y-4">
                {activeModule.reflectionQuestions.map((q, idx) => (
                  <div key={idx} className="space-y-1.5 p-4 bg-stone-50/50 border border-stone-100 rounded-xl">
                    <label className="text-xs font-medium text-stone-800" htmlFor={`reflection-${activeModule.id}-${idx}`}>
                      {idx + 1}. {q}
                    </label>
                    <textarea
                      id={`reflection-${activeModule.id}-${idx}`}
                      rows={2}
                      value={reflectionAnswers[`${activeModule.id}-${idx}`] || ''}
                      onChange={(e) => setReflectionAnswers({
                        ...reflectionAnswers,
                        [`${activeModule.id}-${idx}`]: e.target.value
                      })}
                      placeholder="Skriv ned dine egne ord..."
                      className="w-full mt-1 p-2 bg-stone-55 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500 transition-all font-serif"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Little before you go further validering */}
            <div className="space-y-3 pt-6 pb-6">
              <p className="text-stone-400 text-xxs uppercase tracking-widest">Før du går videre</p>
              <p className="text-stone-700 text-xs italic leading-relaxed pl-4 border-l-2 border-stone-400 font-serif">
                Husk: At kroppen din går i alarm, er ikke et tegn på at du svikter. Det er bare at systemet reagerer som det skal på for høyt stress. Du kan alltid starte på nytt.
              </p>
            </div>

            {/* Micro exercise */}
            <div className="space-y-3 pt-6 pb-6">
              <p className="text-stone-700 text-xxs uppercase tracking-widest font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                <span>Mikroøvelse</span>
              </p>
              <div className="bg-stone-50 p-4 border border-stone-200 rounded-xl space-y-2">
                <p className="text-xs text-stone-700 leading-relaxed font-serif font-medium">
                  {activeModule.microExercise}
                </p>
              </div>
            </div>

            {/* Legg fra deg – bevisst generisk tekst som gjelder alle moduler */}
            <div className="space-y-2 pt-6 pb-6">
              <span className="text-stone-400 text-xxs uppercase tracking-widest block">Det du kan legge fra deg</span>
              <p className="text-xs text-stone-600 leading-relaxed">
                Slipp ambisjonen om å gjøre alt i denne modulen perfekt. Én ekte, liten øvelse i løpet av uken er nok – resten kan ligge.
              </p>
            </div>

            {/* Ukesmål */}
            <div className="space-y-3 pt-6 pb-6 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-stone-400 text-xxs uppercase tracking-widest block">Modulens ukesmål</span>
                <p className="text-sm font-bold font-serif italic text-stone-850">
                  "{activeModule.weeklyGoal}"
                </p>
              </div>
              <button
                id={`activate-goal-btn-${activeModule.id}`}
                onClick={() => handleActivateGoal(activeModule.weeklyGoal)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg border border-stone-250 transition-all shrink-0 cursor-pointer"
              >
                Aktiver mål
              </button>
            </div>

            {/* Når det glipper – bevisst generisk tekst som gjelder alle moduler */}
            <div className="space-y-4 pt-6 pb-6">
              <p className="text-stone-400 text-xxs uppercase tracking-widest">Når det glipper</p>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                De fleste gangene kommer du til å gjøre det gamle før du rekker å tenke. Det er helt normalt. Å se det etterpå er samme øvelse, bare litt forsinket – og det er sånn det begynner for alle.
              </p>
            </div>

            {/* Language card preloads */}
            <div className="space-y-3 pt-6 pb-6">
              <p className="text-stone-400 text-xxs uppercase tracking-widest">Relevante språkkort</p>
              <div className="grid grid-cols-1 gap-2">
                {activeModule.languageCards.map((txt, index) => (
                  <div key={index} className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs italic font-serif text-stone-800 text-center">
                    "{txt}"
                  </div>
                ))}
              </div>
            </div>

            {/* DEPOT EXPORT (Complete and trigger integration mechanics) */}
            <div className="pt-8 pb-10 space-y-4">
              <div className="bg-moss text-cream p-6 rounded-xl space-y-4 relative overflow-hidden">
                <div className="hidden" aria-hidden="true" />
                
                <div className="space-y-1 relative z-10">
                  <span className="text-stone-400 text-xxs uppercase tracking-widest">Koble på Depoet</span>
                  <h4 className="text-base font-serif text-white">Fullfør lærdommen</h4>
                  <p className="text-stone-300 text-xs leading-relaxed font-serif">
                    Når du markerer modulen som fullført, planter Depoet automatisk relevante språkkort i språkbanken, ukesmålet i Søndagsverkstedet, og tilpasser "I dag" sløyfen.
                  </p>
                </div>

                <div className="pt-2 relative z-10">
                  <button
                    id={`complete-module-trigger-${activeModule.id}`}
                    onClick={() => handleCompleteModule(activeModule)}
                    className={`w-full py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isModuleCompleted(activeModule.id)
                        ? 'bg-green-600 hover:bg-green-700 text-stone-100'
                        : 'bg-stone-100 hover:bg-stone-55 text-stone-905 shadow-sm'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{isModuleCompleted(activeModule.id) ? 'Fullført (Klikk for å endre)' : 'Registrer depot-eksport'}</span>
                  </button>
                </div>

                {showExportSuccess && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center text-xs text-green-400 font-serif relative z-10 pt-1"
                  >
                    Atomene er eksportert! Sjekk språksidene eller ukesmålet ditt nå.
                  </motion.p>
                )}
              </div>
            </div>

          </div>

        </motion.div>
      ) : activeCourse ? (
        /* 2. Lessons listings for Selected Course */
        <motion.div 
          initial={{ opacity: 0, y: 5 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Return link */}
          <button
            id="course-list-back-btn"
            onClick={() => setSelectedCourseId(null)}
            className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-stone-800 transition-colors py-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vis alle kursene</span>
          </button>

          {/* Heading */}
          <div className="space-y-1">
            <span className="text-xxs bg-stone-100 px-2 py-0.5 rounded text-stone-500 uppercase tracking-widest">{activeCourse.badge}</span>
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight">On-demand moduler</h2>
            <p className="text-stone-600 text-xs leading-relaxed">{activeCourse.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {activeCourse.modules.map((mod, index) => {
              const completed = isModuleCompleted(mod.id);
              return (
                <button
                  key={mod.id}
                  id={`select-module-btn-${mod.id}`}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className="w-full text-left bg-stone-55 hover:bg-stone-50 border border-stone-200/80 p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex gap-3 pr-4">
                    <div className="mt-1 shrink-0">
                      {completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : mod.video?.status === 'published' ? (
                        <Play className="w-5 h-5 text-stone-400 group-hover:text-stone-700 transition-colors" />
                      ) : (
                        <FileText className="w-5 h-5 text-stone-400 group-hover:text-stone-700 transition-colors" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-800 group-hover:text-stone-950 font-serif">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed font-serif line-clamp-1">
                        {mod.screenText}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                </button>
              );
            })}
          </div>

        </motion.div>
      ) : (
        /* 3. Overall Courses Landing board */
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="courses-landing-title">Kurs og øvingsprogram</h2>
            <p className="text-stone-500 text-xs">
              ADHD Depoet er en del av Kontinuum og bygger på forståelsesgrunnlaget i Førersetet.
            </p>
            <p className="text-stone-500 text-xs">
              {COURSE_LAUNCH_STATUS}
            </p>
          </div>

          {/* Avgrensning / disclaimer – rolig, ikke alarmerende. Sikkerhetsnumre ligger i tillegg inne i de sensitive modulene. */}
          <div className="bg-stone-50 border border-stone-200/70 rounded-xl px-4 py-3">
            <p className="text-xxs text-stone-500 leading-relaxed">
              Innholdet her er foreldrestøtte og kunnskap bygget på boken <span className="italic">Førersetet</span> – ikke behandling, terapi eller akutthjelp. Ved akutt fare for liv og helse, ring 113.
            </p>
          </div>

          {/* Anbefalt lesesti basert på onboarding (bok: «Før vi begynner») */}
          {recommendedStart(user?.onboardingAnswers ?? null) && courses.some((course) => course.id === 'førersetet-hoved') && (
            <button
              id="recommended-path-hint"
              onClick={() => setSelectedCourseId('førersetet-hoved')}
              className="w-full text-left bg-pine-50 border border-pine-300/40 rounded-xl px-4 py-3 hover:border-pine-300 transition-colors cursor-pointer"
            >
              <span className="text-xxs uppercase tracking-widest text-pine-700 font-semibold block mb-1">Anbefalt start for deg</span>
              <p className="text-xs text-stone-700 leading-relaxed">{recommendedStart(user?.onboardingAnswers ?? null)}</p>
            </button>
          )}

          <div className="bg-stone-55 rounded-xl border border-stone-200 divide-y divide-stone-150 shadow-sm overflow-hidden">
            {catalog.map((course) => {
              const courseContent = courses.find((item) => item.id === course.id);
              // Count completed lessons
              const completedCount = courseContent?.modules.filter(m => isModuleCompleted(m.id)).length ?? 0;
              const totalCount = course.moduleCount;

              return (
                <div key={course.id} className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-500 px-1.5 py-0.5 bg-stone-100 rounded">
                        {course.badge}
                      </span>
                      <h3 className="text-lg font-serif text-stone-900 font-bold">{course.title}</h3>
                    </div>
                    {totalCount > 0 && (
                      <span className="text-xxs text-stone-400">
                        {completedCount}/{totalCount} fullført
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-605 leading-relaxed font-serif">
                    {course.description}
                  </p>

                  <div className="flex justify-end pt-2">
                    <button
                      id={`enter-course-btn-${course.id}`}
                      onClick={() => courseContent && setSelectedCourseId(course.id)}
                      disabled={!courseContent}
                      className="px-4 py-2 bg-pine-600 hover:bg-pine-700 disabled:bg-stone-300 disabled:text-stone-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:cursor-default transition-all shadow-sm rounded-lg"
                    >
                      <span>
                        {courseContent
                          ? 'Åpne leksjoner'
                          : course.availability === 'first_paid_bundle'
                            ? 'Krever pilottilgang'
                            : 'Pakkes senere'}
                      </span>
                      {courseContent && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <section
            aria-labelledby="from-kontinuum-title"
            className="rounded-xl border border-stone-200 bg-stone-50 p-5"
          >
            <p id="from-kontinuum-title" className="text-xxs uppercase tracking-widest text-stone-500">
              Fra Kontinuum
            </p>
            <p className="mt-2 text-sm font-serif text-stone-800">
              {PARKURS_STATUS}
            </p>
          </section>
        </div>
      )}

    </div>
  );
};
