import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { getPromptForUser, getDailyCardId } from '../data/dailyPrompts';
import { PARENT_ENERGY_LABELS, todayIsoDate } from '../lib/parentState';
import { ParentEnergyLevel } from '../types';
import { ReflectionEntry, loadReflections, saveReflections } from '../lib/reflections';
import { shareLanguageCard, ShareResult } from '../lib/shareCard';
import { Sparkles, Heart, Star, CheckCircle, Sun, BatteryCharging, AlertTriangle, Coffee, Calendar, ArrowRight, Share2, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const TodayView: React.FC = () => {
  const { user, toggleFavoriteLanguage, updateDailyCheckIn, sundayReports, setActiveTab } = useAppState();
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [savedReflections, setSavedReflections] = useState<ReflectionEntry[]>(loadReflections);
  const [shareResult, setShareResult] = useState<ShareResult | null>(null);

  const handleShareDailyCard = async (text: string) => {
    const result = await shareLanguageCard(text);
    if (result === 'dismissed') return;
    setShareResult(result);
    setTimeout(() => setShareResult(null), 2000);
  };

  // Lavmælt søndagsinvitasjon: vises bare på søndager, og ikke hvis uka allerede er landet i dag.
  // Ingen lagring, ingen telling – å overse den har ingen konsekvens.
  const isSunday = new Date().getDay() === 0;
  const hasLandedToday = sundayReports.some((r) => r.date.slice(0, 10) === todayIsoDate());

  // Dagens innsjekk leses fra brukeren (persistert), ikke flyktig komponent-state
  const todayCheckIn = user?.lastCheckIn && user.lastCheckIn.date === todayIsoDate() ? user.lastCheckIn : null;
  const parentCheckIn: ParentEnergyLevel | null = todayCheckIn?.state ?? null;
  const completedStatus = todayCheckIn?.completedStatus ?? null;

  const handleCheckIn = (state: ParentEnergyLevel) => {
    updateDailyCheckIn({ state, completedStatus: null });
  };

  // Get active prompt based on user's current focus challenge
  const focus = user?.currentFocus || 'Skjerm';
  const prompt = getPromptForUser(focus);

  // Reell, stabil ID for dagens språkkort + faktisk lagret status
  const dailyCardId = getDailyCardId(prompt);
  const isFavorite = user?.savedCards.includes(dailyCardId) || false;

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionAnswer.trim()) return;

    const newEntry: ReflectionEntry = {
      id: 'ref-' + Date.now(),
      date: new Date().toLocaleDateString('no-NO'),
      checkIn: parentCheckIn ? PARENT_ENERGY_LABELS[parentCheckIn] : 'Sliten, men til stede',
      reflection: reflectionAnswer
    };

    const updated = [newEntry, ...savedReflections];
    setSavedReflections(updated);
    saveReflections(updated);
    setReflectionAnswer('');
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {/* Visual Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="today-view-title">I dag</h2>
        <p className="text-stone-500 text-xs">Ditt frivillige daglige pusterom</p>
      </div>

      {/* Søndagsnudge: rolig invitasjon, ikke en påminnelse */}
      {isSunday && !hasLandedToday && (
        <button
          id="sunday-nudge"
          onClick={() => setActiveTab('sunday')}
          className="w-full text-left bg-pine-50 border border-pine-300/60 hover:border-pine-600 rounded-xl p-4 flex items-center gap-3 transition-all cursor-pointer group"
        >
          <div className="p-2 bg-white border border-pine-300/50 rounded-lg shrink-0">
            <Calendar className="w-4 h-4 text-pine-700" />
          </div>
          <div className="flex-1 space-y-0.5">
            <p className="text-sm font-serif text-stone-900">Det er søndag. Vil du lande uka litt?</p>
            <p className="text-xxs text-stone-500 leading-relaxed">
              Ti minutter, uten dom. Like greit å la være – verkstedet ligger her uansett.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-pine-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* 1. Opening Ritual: Toleransevindu Check-in */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-sm" id="today-checkin-block">
        <div className="space-y-1">
          <p className="text-stone-400 text-xxs uppercase tracking-wider">Regulering før retning</p>
          <h3 className="text-sm font-medium text-stone-900">Hvor stort er toleransevinduet ditt akkurat nå?</h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            id="today-checkin-rom"
            onClick={() => handleCheckIn('rom')}
            className={`p-3 rounded-lg border text-xxs leading-snug flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
              parentCheckIn === 'rom'
                ? 'border-sage-600 bg-sage-50 text-sage-800 font-semibold shadow-xs'
                : 'border-stone-200/85 hover:border-stone-400 bg-white text-stone-500'
            }`}
          >
            <Sun className={`w-4 h-4 ${parentCheckIn === 'rom' ? 'text-sage-600' : 'text-stone-400'}`} />
            <span>Jeg har litt rom</span>
          </button>

          <button
            id="today-checkin-sliten"
            onClick={() => handleCheckIn('sliten')}
            className={`p-3 rounded-lg border text-xxs leading-snug flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
              parentCheckIn === 'sliten'
                ? 'border-amber-400 bg-amber-50 text-amber-900 font-semibold shadow-xs'
                : 'border-stone-200/85 hover:border-stone-400 bg-white text-stone-500'
            }`}
          >
            <BatteryCharging className={`w-4 h-4 ${parentCheckIn === 'sliten' ? 'text-amber-700' : 'text-stone-400'}`} />
            <span>Jeg er sliten</span>
          </button>

          <button
            id="today-checkin-tom"
            onClick={() => handleCheckIn('tom')}
            className={`p-3 rounded-lg border text-xxs leading-snug flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
              parentCheckIn === 'tom'
                ? 'border-terra-600 bg-terra-50 text-terra-800 font-semibold shadow-xs'
                : 'border-stone-200/85 hover:border-stone-400 bg-white text-stone-500'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 ${parentCheckIn === 'tom' ? 'text-terra-600 animate-pulse' : 'text-stone-400'}`} />
            <span>Jeg er nesten tom</span>
          </button>
        </div>

        {parentCheckIn && (
          <motion.div 
            initial={{ opacity: 0, y: 3 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={`p-4 rounded-xl text-xs leading-relaxed border ${
              parentCheckIn === 'tom'
                ? 'bg-amber-50/70 border-amber-200 text-stone-800'
                : 'bg-stone-50 border-stone-150 text-stone-700'
            }`}
          >
            {parentCheckIn === 'rom' && (
              <p className="font-serif">
                🌿 <strong>Fint.</strong> Da kan dagens lille ting få plass – du trenger ikke gjøre den perfekt, bare prøve. Og husk: en god dag i dag betyr ikke at du må prestere i morgen også.
              </p>
            )}
            {parentCheckIn === 'sliten' && (
              <p className="font-serif">
                🔋 <strong>Takk for at du sier det – også til deg selv.</strong> På slitne dager senker vi kravene, ikke deg. Dagens ting er liten med vilje. Kommer du ikke til den, har du ikke mislyktes – du har vært ærlig om hvor du er.
              </p>
            )}
            {parentCheckIn === 'tom' && (
              <div className="space-y-3 font-serif">
                <p className="font-semibold text-amber-950 text-sm flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Dagens frikort: Du skal IKKE øve på noe i dag.</span>
                </p>
                <p>
                  Ærlig talt. Når tanken er tom, er ikke jobben å bli en bedre forelder – det er å komme deg gjennom kvelden. Så dagens eneste oppgave er å senke kravene så mye du kan.
                </p>
                <p className="text-xs text-stone-600 bg-white/75 p-2 rounded-lg border border-amber-100/50">
                  🍕 <strong>Ferdigmat er helt greit.</strong> 📱 <strong>Skjerm er helt greit.</strong> Et barn som legger seg litt sent i et hjem uten storm, har det bedre enn et barn i et perfekt opplegg med en utslitt voksen.
                </p>
                <p className="text-stone-800 font-medium italic">
                  Du har absolutt ingenting å bevise i kveld. Bare kom deg igjennom. Vi er her i morgen.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* RENDER THE DAILY MOTOR COMPONENT ONLY IF NOT DEEP EXEMPT (parentCheckIn !== 'tom') */}
      {parentCheckIn === 'tom' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-stone-900 text-stone-100 rounded-xl p-6 space-y-4 shadow-sm relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-stone-850/40 rounded-bl-full pointer-events-none" />
          <Heart className="w-8 h-8 text-red-400 mx-auto" />
          <div className="space-y-1 relative z-10 max-w-md mx-auto">
            <h4 className="font-serif text-lg text-stone-100">Kun hvile i sikte</h4>
            <p className="text-xs text-stone-300 leading-relaxed font-serif">
              Fordi du valgte å fortelle at tanken er helt tom i kveld, har vi fjernet alle mikrohandlinger, øvelser og refleksjonsspørsmål for i dag. Det finnes ingen lekser eller teknikker her.
            </p>
          </div>
          <div className="border-t border-stone-800 pt-3 text-xxs text-stone-400">
            Dagen har en sikker brems: aldri teknikk på tom tank
          </div>
        </motion.div>
      ) : (
        <>
          {/* 2. Validation & Micro action Block */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5 shadow-sm relative overflow-hidden" id="today-practice-card">
            {/* Active focus pill */}
            <div className="absolute top-4 right-4 bg-pine-50 px-2 py-0.5 rounded text-xxs text-pine-700 uppercase tracking-widest">
              Fokus: {focus === 'Min egen reaksjon' ? 'alarm' : focus}
            </div>

            <div className="space-y-2">
              <p className="text-stone-400 text-xxs uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                <span>1. Kort validering</span>
              </p>
              <blockquote className="text-base font-serif italic text-stone-800 border-l border-stone-300 pl-4">
                "{prompt.validationText}"
              </blockquote>
            </div>

            <div className="space-y-2">
              <p className="text-stone-400 text-xxs uppercase tracking-wider">2. Dagens mikrohandling</p>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-3">
                <h4 className="text-sm font-semibold text-stone-800">{prompt.theme}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{prompt.microAction}</p>
              </div>
            </div>

            {/* Action Goal Toggles (Equal values: "Prøvde den" vs "Kom ikke til det") */}
            <div className="pt-2 border-t border-stone-100 space-y-3">
              <p className="text-xxs text-stone-400 uppercase tracking-wider">Oppfølging uten skyld</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="today-action-trydd"
                  onClick={() => updateDailyCheckIn({ completedStatus: 'provd' })}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                    completedStatus === 'provd'
                      ? 'bg-pine-600 border-pine-600 text-white shadow-xs'
                      : 'border-stone-200 hover:border-stone-400 text-stone-700 bg-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Prøvde den</span>
                </button>

                <button
                  id="today-action-skipped"
                  onClick={() => updateDailyCheckIn({ completedStatus: 'kom-ikke' })}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                    completedStatus === 'kom-ikke'
                      ? 'bg-stone-100 border-stone-300 text-stone-800 shadow-xs'
                      : 'border-stone-200 hover:border-stone-400 text-stone-600 bg-white'
                  }`}
                >
                  <Heart className="w-4 h-4 shrink-0 text-stone-500" />
                  <span>Kom ikke til det i dag</span>
                </button>
              </div>

              {completedStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg text-xs leading-relaxed font-serif bg-stone-55 border border-stone-100 text-stone-700"
                >
                  {completedStatus === 'provd' ? (
                    <p>✨ <strong>Takk for at du prøvde.</strong> Hver lille ting utvider det lille sekundet ditt bittelitt.</p>
                  ) : (
                    <p>❤️ <strong>Helt greit.</strong> At du var innom i det hele tatt, på en slik dag, er mer enn nok. Vi prøver igjen i morgen – eller ikke. Det er ditt.</p>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* 3. Core Språkkort */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 space-y-4 shadow-sm relative overflow-hidden" id="today-language-card-block">
            <div className="absolute top-0 right-0 w-24 h-24 bg-stone-800/40 rounded-bl-full z-0 pointer-events-none" />
            
            <div className="space-y-1 relative z-10">
              <p className="text-stone-500 text-xxs uppercase tracking-wider">3. Dagens språkkort</p>
              <p className="text-sm text-stone-300 font-serif leading-relaxed">
                Hjernen vår trenger et ferdig utvalgt språk i lomma når det stormer eller låser seg:
              </p>
            </div>

            <div className="bg-stone-800/80 border border-stone-700 p-5 rounded-xl relative z-10 text-center">
              <p className="text-base font-serif italic text-stone-100">
                "{prompt.languageCard.text}"
              </p>
              <span className="inline-block mt-3 text-xxs bg-stone-700 px-2 py-0.5 rounded text-stone-400">
                Situasjon: {prompt.languageCard.category}
              </span>
            </div>

            <div className="flex justify-between items-center relative z-10 text-xs text-stone-400">
              <button
                id="today-share-lang-btn"
                onClick={() => handleShareDailyCard(prompt.languageCard.text)}
                className="flex items-center gap-1 hover:text-stone-200 font-semibold transition-all py-1 px-2.5 rounded hover:bg-stone-800"
              >
                {shareResult ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-pine-300" />
                    <span className="text-pine-300">{shareResult === 'copied' ? 'Kopiert – klar til å limes inn' : 'Delt'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Del kortet</span>
                  </>
                )}
              </button>
              <button
                id={`today-fav-lang-btn`}
                onClick={() => toggleFavoriteLanguage(dailyCardId)}
                className="flex items-center gap-1 hover:text-stone-200 font-semibold transition-all py-1 px-2.5 rounded hover:bg-stone-800"
              >
                <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-300 text-amber-300' : 'text-stone-400'}`} />
                <span>{isFavorite ? 'Lagret i språkbanken' : 'Stjernemerk'}</span>
              </button>
            </div>
          </div>

          {/* 4. Voluntary non-guilt reflection */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4 shadow-sm" id="today-reflection-block">
            <div className="space-y-1">
              <p className="text-stone-400 text-xxs uppercase tracking-wider">4. Valgfri refleksjon</p>
              <h3 className="text-sm font-medium text-stone-900 leading-snug">{prompt.reflectionQuestion}</h3>
            </div>

            <form onSubmit={handleSaveReflection} className="space-y-3">
              <textarea
                id="today-reflection-input"
                value={reflectionAnswer}
                onChange={(e) => setReflectionAnswer(e.target.value)}
                rows={2}
                placeholder="Skriv noen tanker her om du har rom (helt valgfritt)..."
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500 transition-all font-serif"
              />
              <div className="flex justify-end">
                <button
                  id="today-save-reflection-btn"
                  type="submit"
                  disabled={!reflectionAnswer.trim()}
                  className="px-4 py-1.5 bg-pine-600 hover:bg-pine-700 text-white text-xs font-semibold rounded transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  Lagre refleksjon
                </button>
              </div>
            </form>

            {/* Show past reflection notes if any exist */}
            {savedReflections.length > 0 && (
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <p className="text-xxs text-stone-400 uppercase tracking-widest">Tidligere små notater</p>
                <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
                  {savedReflections.map((entry) => (
                    <div key={entry.id} className="p-3 bg-stone-50 rounded-lg text-xxs border border-stone-100 space-y-1.5 animate-fadeIn">
                      <div className="flex justify-between items-center text-stone-400">
                        <span>{entry.date}</span>
                        <span className="italic">{entry.checkIn}</span>
                      </div>
                      <p className="text-stone-700 italic font-serif">"{entry.reflection}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
};
