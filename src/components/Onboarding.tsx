/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { UserOnboarding } from '../types';
import { DAILY_PROMPTS } from '../data/dailyPrompts';
import { Sparkles, ArrowRight, Heart, Calendar, HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Smakebit i onboardingen: enkel, eksplisitt mapping fra valgt belastning
 * til ett språkkort og én mikrohandling – hentet fra den eksisterende
 * daglig-banken (første prompt for valget). Ingen anbefalingsmotor.
 * Valg uten egen liste (Skole, Søsken, Annet) får en trygg, varm fallback.
 */
function getOnboardingTaste(heaviestNow: string): { card: string; action: string } {
  const list = DAILY_PROMPTS[heaviestNow];
  if (list && list.length > 0) {
    return { card: list[0].languageCard.text, action: list[0].microAction };
  }
  return {
    card: 'Vi begynner ikke med alt. Bare med én liten ting.',
    action: 'Velg ett øyeblikk i dag der du senker kravet litt, ikke deg selv.',
  };
}

export const Onboarding: React.FC = () => {
  const { saveOnboarding } = useAppState();
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  // Smakebiten vises først når brukeren aktivt har valgt noe – ikke for forhåndsvalget
  const [hasPickedHeaviest, setHasPickedHeaviest] = useState(false);

  const [answers, setAnswers] = useState<UserOnboarding>({
    heaviestNow: 'Skjerm',
    parentState: 'Jeg er sliten',
    desiredHelp: 'Håndtere konkrete situasjoner',
    wantsReminder: true,
    startingPage: 'today'
  });

  const heaviestNowChoices = [
    { value: 'Morgen', label: '🌅 Morgenstress' },
    { value: 'Skjerm', label: '📱 Skjerm og spillslutt' },
    { value: 'Legging', label: '🌙 Legging og kveldsuro' },
    { value: 'Overganger', label: '🔄 Overganger og avbrudd' },
    { value: 'Skole', label: '🏫 Skolesamarbeid og meldinger' },
    { value: 'Søsken', label: '👦👧 Søskenkonflikt' },
    { value: 'Min egen reaksjon', label: '⚡ Min egen reaksjon og alarm' },
    { value: 'Ungdom', label: '🧑‍🤝‍🧑 Ungdom og tenåringer (13-16 år)' },
    { value: 'Annet', label: '💭 Annet slitasje' }
  ];

  const parentStateChoices = [
    { value: 'Jeg har litt rom', label: '🌿 Jeg har litt overskudd og rom' },
    { value: 'Jeg er sliten', label: '🔋 Jeg er sliten, men holder ut' },
    { value: 'Jeg er nesten helt tom', label: '⚠️ Jeg er nesten helt tom og overbelastet' }
  ];

  const desiredHelpChoices = [
    { value: 'Forstå barnet', label: '🧠 Forstå barnets unike maskineri' },
    { value: 'Regulere meg selv', label: '🧘 Regulere egen alarm og beredskap' },
    { value: 'Håndtere konkrete situasjoner', label: '🛠️ Håndtere konkrete situasjoner der og da' },
    { value: 'Reparere etter konflikt', label: '❤️ Reparere etter konflikt og rydde opp skam' },
    { value: 'Holde retning over tid', label: '⛵ Holde en langsiktig retning' }
  ];

  const startingPageChoices = [
    { value: 'today', label: '☀️ I dag (Den daglige mikroseieren)', desc: 'Én liten frivillig handling og setning om gangen' },
    { value: 'nowWhat', label: '🚨 Hva gjør jeg nå? (Akuttlaget)', desc: 'Rask handlingsnær støtte i de skarpeste situasjonene' },
    { value: 'sunday', label: '📅 Søndagsverkstedet (Styringsrommet)', desc: 'Lande rolig og sette et lite mål uten dom' },
    { value: 'courses', label: '📚 Kursrekken (Førersetet)', desc: 'Ukesvis dybdereise fra bok til øvelse' }
  ];

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      saveOnboarding(name.trim() || 'Forelder', answers);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 md:p-12">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-stone-200/80 shadow-sm p-8 md:p-10 relative overflow-hidden">
        
        {/* Decorative subtle header line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-stone-300" />
        
        {/* Progress tracker */}
        <div className="flex justify-between items-center mb-10">
          <span className="text-xs text-stone-400 tracking-wider">Steg {step} av 6</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div 
                key={idx} 
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${idx <= step ? 'bg-pine-600' : 'bg-stone-200'}`} 
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-serif text-stone-900 tracking-tight" id="onboarding-title-1">Velkommen til Depoet</h1>
              <p className="text-stone-600 text-sm leading-relaxed">
                Dette er et øvingsrom for foreldre i høy belastning, i forlengelsen av boken og kursrekken <em className="text-stone-800 font-medium">Førersetet</em>. Vi starter nøyaktig der du er i dag – uten krav og uten skam.
              </p>
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-xs tracking-wider text-stone-500 uppercase" htmlFor="parent-name-input">
                Hva vil du kalles i appen?
              </label>
              <input
                id="parent-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ditt fornavn"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-500 text-stone-800 placeholder-stone-400 text-sm transition-all"
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Hva er tyngst akkurat nå?</h2>
              <p className="text-stone-500 text-xs">Dette påvirker hvilke situasjoner og mikrohandlinger vi løfter frem først.</p>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-1">
              {heaviestNowChoices.map((item) => (
                <button
                  key={item.value}
                  id={`onb-heaviest-${item.value}`}
                  onClick={() => {
                    setAnswers({ ...answers, heaviestNow: item.value });
                    setHasPickedHeaviest(true);
                  }}
                  className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-center justify-between ${
                    answers.heaviestNow === item.value 
                      ? 'border-pine-600 bg-pine-50 text-stone-900 font-medium' 
                      : 'border-stone-200 hover:border-stone-400 bg-white text-stone-600'
                  }`}
                >
                  <span>{item.label}</span>
                  {answers.heaviestNow === item.value && <div className="w-1.5 h-1.5 rounded-full bg-pine-600" />}
                </button>
              ))}
            </div>

            {/* Smakebit: ett lite håndtak før resten av stegene */}
            {hasPickedHeaviest && (() => {
              const taste = getOnboardingTaste(answers.heaviestNow);
              return (
                <motion.div
                  key={answers.heaviestNow}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-pine-50 border border-pine-300/60 rounded-xl p-4 space-y-3"
                  id="onboarding-taste-card"
                >
                  <p className="text-xxs uppercase tracking-wider text-pine-700 font-semibold">
                    Ett lite håndtak, allerede nå
                  </p>
                  <div className="space-y-1">
                    <p className="text-xxs text-stone-500">En setning du kan låne:</p>
                    <p className="text-sm font-serif italic text-stone-850 leading-relaxed">"{taste.card}"</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xxs text-stone-500">Én liten ting å prøve:</p>
                    <p className="text-xs text-stone-700 leading-relaxed">{taste.action}</p>
                  </div>
                  <p className="text-xxs text-stone-500 italic border-t border-pine-300/40 pt-2.5 leading-relaxed">
                    Resten av spørsmålene hjelper bare Depoet å bli litt mer relevant for deg. Du kan endre alt senere.
                  </p>
                </motion.div>
              );
            })()}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Hvor er du selv om dagen?</h2>
              <p className="text-stone-500 text-xs text-stone-500">Vi tilpasser daglige påminnelser etter ditt toleransevindu.</p>
            </div>
            <div className="space-y-3">
              {parentStateChoices.map((item) => (
                <button
                  key={item.value}
                  id={`onb-pstate-${item.value.replace(/\s+/g, '-')}`}
                  onClick={() => setAnswers({ ...answers, parentState: item.value })}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                    answers.parentState === item.value 
                      ? 'border-pine-600 bg-pine-50 text-stone-900 font-medium' 
                      : 'border-stone-200 hover:border-stone-400 bg-white text-stone-600'
                  }`}
                >
                  <span>{item.label}</span>
                  {answers.parentState === item.value && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Hva ønsker du mest hjelp til?</h2>
              <p className="text-stone-500 text-xs">Vi kutter støy og fokuserer på din dypeste lengsel.</p>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {desiredHelpChoices.map((item) => (
                <button
                  key={item.value}
                  id={`onb-help-${item.value.replace(/\s+/g, '-')}`}
                  onClick={() => setAnswers({ ...answers, desiredHelp: item.value })}
                  className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-center justify-between ${
                    answers.desiredHelp === item.value 
                      ? 'border-pine-600 bg-pine-50 text-stone-900' 
                      : 'border-stone-200 hover:border-stone-400 bg-white text-stone-600'
                  }`}
                >
                  <span>{item.label}</span>
                  {answers.desiredHelp === item.value && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Daglige mikro-varsler</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Vi hater nag og streaks. Vil du ha en frivillig påminnelse om dagen med dagens ene mikrohandling og et språkkort? Du kan slå det av når som helst.
              </p>
              <p className="text-stone-400 text-xs leading-relaxed">
                I denne tidlige forhåndsvisningen er utsendinger ikke aktive ennå – valget ditt lagres til tjenesten er klar.
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                id="onb-reminder-yes"
                onClick={() => setAnswers({ ...answers, wantsReminder: true })}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                  answers.wantsReminder 
                    ? 'border-pine-600 bg-pine-50 text-stone-900 font-medium' 
                    : 'border-stone-200 bg-white text-stone-500'
                }`}
              >
                <div>
                  <p className="font-medium text-stone-800">Ja, gjerne</p>
                  <p className="text-xs text-stone-500">Motta én varm mildejustering hver morgen.</p>
                </div>
                {answers.wantsReminder && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full" />}
              </button>

              <button
                id="onb-reminder-no"
                onClick={() => setAnswers({ ...answers, wantsReminder: false })}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                  !answers.wantsReminder 
                    ? 'border-pine-600 bg-pine-50 text-stone-900 font-medium' 
                    : 'border-stone-200 bg-white text-stone-500'
                }`}
              >
                <div>
                  <p className="font-medium text-stone-800">Nei, la meg åpne selv</p>
                  <p className="text-xs text-stone-500">Jeg foretrekker å sjekke inn når jeg har kapasitet.</p>
                </div>
                {!answers.wantsReminder && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full" />}
              </button>
            </div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-stone-900 tracking-tight">Hva ønsker du å starte med?</h2>
              <p className="text-stone-500 text-xs">Vårt kart er åpent. Du bestemmer innfallsvinkelen.</p>
            </div>
            <div className="space-y-2.5">
              {startingPageChoices.map((item) => (
                <button
                  key={item.value}
                  id={`onb-startpage-${item.value}`}
                  onClick={() => setAnswers({ ...answers, startingPage: item.value as any })}
                  className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-start gap-3 ${
                    answers.startingPage === item.value 
                      ? 'border-pine-600 bg-pine-50 text-stone-900 font-medium' 
                      : 'border-stone-200 hover:border-stone-400 bg-white text-stone-600'
                  }`}
                >
                  <div className="mt-1">
                    {item.value === 'today' && <Sparkles className="w-4 h-4 text-stone-700" />}
                    {item.value === 'nowWhat' && <HelpCircle className="w-4 h-4 text-stone-700" />}
                    {item.value === 'sunday' && <Calendar className="w-4 h-4 text-stone-700" />}
                    {item.value === 'courses' && <Heart className="w-4 h-4 text-stone-700" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">{item.label}</p>
                    <p className="text-xs text-stone-500 mt-0.5 font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex justify-between items-center mt-10 pt-6 border-t border-stone-100">
          {step > 1 ? (
            <button
              id="onb-btn-prev"
              onClick={handlePrev}
              className="text-stone-500 hover:text-stone-800 text-sm font-medium pr-4 py-2 transition-colors duration-200"
            >
              Tilbake
            </button>
          ) : (
            <div className="w-10" />
          )}

          <button
            id="onb-btn-next"
            onClick={handleNext}
            disabled={step === 1 && !name.trim()}
            className="px-6 py-2.5 bg-pine-600 hover:bg-pine-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span>{step === 6 ? 'Start Depoet' : 'Neste'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
