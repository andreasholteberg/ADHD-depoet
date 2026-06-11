import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { Calendar, HelpCircle, ArrowRight, ArrowLeft, Check, RefreshCw, Archive, Sparkles, AlertCircle, Heart, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export const SundayWorkshopView: React.FC = () => {
  const { saveSundayWorkshop, sundayReports, resetAllData } = useAppState();
  const [step, setStep] = useState(1);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Workshop Form State
  const [stateCheckIn, setStateCheckIn] = useState('Jeg er sliten');
  const [lighterAnswerType, setLighterAnswerType] = useState('Ja, et lite øyeblikk');
  const [customLighterText, setCustomLighterText] = useState('');
  const [whereWasTooMuch, setWhereWasTooMuch] = useState<string[]>([]);
  const [learningText, setLearningText] = useState('');
  const [weeklyGoalType, setWeeklyGoalType] = useState('Jeg går inn to minutter før skjermen skal av.');
  const [customWeeklyGoalText, setCustomWeeklyGoalText] = useState('');
  const [whatToPutDownType, setWhatToPutDownType] = useState('Jeg trenger ikke fikse alle situasjoner.');
  const [customPutDownText, setCustomPutDownText] = useState('');
  const [supportNeeded, setSupportNeeded] = useState('Jeg vet ikke');

  const tooMuchChoices = ['Morgen', 'Skjerm', 'Legging', 'Overganger', 'Lekser', 'Skole', 'Søsken', 'Min reaksjon', 'Ungdomsuro', 'Annet'];
  
  const weeklyGoalChoices = [
    'Jeg går inn to minutter før skjermen skal av.',
    'Jeg legger merke til mitt første alarmtegn.',
    'Jeg prøver én reparasjonssetning når jeg ble for hard.',
    'Jeg sier én setning roligere enn kroppen min har lyst til.',
    'Jeg sender en kort melding på dagtid uten krav (ungdom).',
    'Jeg vil skrive mitt eget bittelille mål...'
  ];

  const putDownChoices = [
    'Jeg trenger ikke fikse alle situasjoner.',
    'Jeg trenger ikke være en perfekt forelder.',
    'Jeg trenger ikke ta igjen noe.',
    'Jeg trenger ikke gjøre alt på én gang.',
    'Jeg vil skrive mitt eget...'
  ];

  const supportChoices = ['Skjerm', 'Morgen', 'Legging', 'Overganger', 'Reparasjon', 'Egen regulering', 'Skole', 'Søsken', 'Ungdom', 'Jeg vet ikke'];

  const toggleTooMuch = (choice: string) => {
    const updated = [...whereWasTooMuch];
    const idx = updated.indexOf(choice);
    if (idx >= 0) updated.splice(idx, 1);
    else updated.push(choice);
    setWhereWasTooMuch(updated);
  };

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      // Compile and Save Sunday Workshop Report!
      saveSundayWorkshop({
        stateCheckIn,
        whatWasLighter: lighterAnswerType === 'Jeg vil skrive selv' ? customLighterText : lighterAnswerType,
        whereWasTooMuch,
        learning: learningText || 'Å stoppe opp et lite sekund gjør en ørliten forskjell.',
        nextGoal: weeklyGoalType === 'Jeg vil skrive mitt eget bittelille mål...' ? customWeeklyGoalText : weeklyGoalType,
        whatToPutDown: whatToPutDownType === 'Jeg vil skrive mitt eget...' ? customPutDownText : whatToPutDownType,
        supportNeeded
      });
      setHasCompleted(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleResetWorkshop = () => {
    setStep(1);
    setHasCompleted(false);
    // Reset answers
    setStateCheckIn('Jeg er sliten');
    setLighterAnswerType('Ja, et lite øyeblikk');
    setCustomLighterText('');
    setWhereWasTooMuch([]);
    setLearningText('');
    setWeeklyGoalType('Jeg går inn to minutter før skjermen skal av.');
    setCustomWeeklyGoalText('');
    setWhatToPutDownType('Jeg trenger ikke fikse alle situasjoner.');
    setCustomPutDownText('');
    setSupportNeeded('Jeg vet ikke');
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {/* View Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="sunday-view-header">Søndagsverkstedet</h2>
        <p className="text-stone-500 text-xs">Ditt ukentlige styringsrom og landingstid</p>
      </div>

      {hasCompleted ? (
        /* Completed Screen */
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-stone-200 p-8 space-y-6 text-center shadow-sm"
        >
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-850 mx-auto">
            <Check className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-stone-900">Ukesverkstedet er plantet</h3>
            <p className="text-stone-600 text-sm leading-relaxed max-w-sm mx-auto font-serif">
              Nydelig levert. Dette har lagt seg inn i historikken din, justert hvilke mikrohandlinger vi løfter frem, og satt et bittelite verdig mål for uken som kommer.
            </p>
          </div>

          {/* New Focus Highlight Box */}
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-xl max-w-sm mx-auto text-stone-700 text-xs space-y-2 text-left shadow-xs">
            <div className="flex gap-2 items-center font-bold text-stone-850">
              <Sparkles className="w-4 h-4 text-stone-700" />
              <span>Ditt nye ukesmål er aktivt:</span>
            </div>
            <p className="italic font-serif text-stone-800 font-medium pl-3 border-l border-stone-300">
              "{weeklyGoalType === 'Jeg vil skrive mitt eget bittelille mål...' ? customWeeklyGoalText : weeklyGoalType}"
            </p>
            <div className="pt-2 text-[10px] text-stone-400 uppercase tracking-widest border-t border-stone-100 mt-2">
              Fokus neste uke: {supportNeeded}
            </div>
          </div>

          <div className="flex justify-center gap-2 pt-4">
            <button
              id="sunday-restart-btn"
              onClick={handleResetWorkshop}
              className="px-5 py-2.5 bg-pine-600 hover:bg-pine-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Marker uken ferdig & start ny økt</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* Stepping Flow Panel */
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-6">
          
          {/* Subtle colored bar at top reflecting calm light theme */}
          <div className="h-1 bg-stone-300 w-full" />
          
          <div className="p-6 md:p-8 space-y-6">

            {/* Framing Box printed first on Step 1 to ground the user safely */}
            {step === 1 && (
              <div className="p-4 bg-stone-50 border border-stone-150 rounded-xl text-stone-750 text-xs leading-relaxed flex gap-3 shadow-xxs">
                <Heart className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                <p className="font-serif italic text-stone-700">
                  «Ti minutter, uten dom. Dette er ikke en evaluering av uka di. Det er bare et øyeblikk til å puste og se hva du tar med deg videre.»
                </p>
              </div>
            )}

            {/* Step indicators */}
            <div className="flex justify-between items-center text-xxs text-stone-400">
              <span>Ukesverksted – steg {step} av 7</span>
              <span>{Math.round((step / 7) * 100)}% landet</span>
            </div>

            {/* STEP 1: Land først */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-amber-850 text-xxs block uppercase tracking-widest font-bold">STEG 1: LAND FØRST</span>
                  <h3 className="text-lg font-serif text-stone-900 leading-snug">
                    Pust ut. Uka var som den var – verken bestått eller strøket. Du trenger ikke forsvare noe her. Hvordan føles det i kroppen akkurat nå?
                  </h3>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { val: 'Jeg har litt rom', label: '🌿 Jeg har litt margin og rom' },
                    { val: 'Jeg er sliten', label: '🔋 Jeg er ganske sliten' },
                    { val: 'Jeg er nesten tom', label: '⚠️ Reservetanken min er nesten tom' }
                  ].map((choice) => (
                    <button
                      key={choice.val}
                      id={`sun-step1-choice-${choice.val.replace(/\s+/g, '-')}`}
                      onClick={() => setStateCheckIn(choice.val)}
                      className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        stateCheckIn === choice.val
                          ? 'border-pine-600 bg-pine-50 text-stone-950 font-semibold shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-600'
                      }`}
                    >
                      <span>{choice.label}</span>
                      {stateCheckIn === choice.val && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Hva ble litt lettere? */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-amber-855 text-xxs block uppercase tracking-widest font-bold">STEG 2: SE DET SMÅ BLE LITT LETTERE</span>
                  <h3 className="text-lg font-serif text-stone-900 leading-snug">
                    Var det ett øyeblikk, én overgang, én kveld som gikk litt bedre enn den kunne? Det teller – selv om alt annet var tungt.
                  </h3>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    'Ja, et lite øyeblikk gikk greit',
                    'Kanskje ett sekund føltes ledig',
                    'Faktisk ingenting jeg kom på',
                    'Jeg vil skrive selv'
                  ].map((choice) => (
                    <button
                      key={choice}
                      id={`sun-step2-choice-${choice.replace(/\s+/g, '-')}`}
                      onClick={() => setLighterAnswerType(choice)}
                      className={`w-full text-left p-4 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        lighterAnswerType === choice
                          ? 'border-pine-600 bg-pine-50 text-stone-950 font-semibold shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-600'
                      }`}
                    >
                      <span>{choice}</span>
                      {lighterAnswerType === choice && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full" />}
                    </button>
                  ))}

                  {lighterAnswerType === 'Jeg vil skrive selv' && (
                    <motion.textarea
                      id="sun-step2-custom-input"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      value={customLighterText}
                      onChange={(e) => setCustomLighterText(e.target.value)}
                      placeholder="Skriv inn ditt lille øyeblikk (f.eks: 'Under middagsfuroa klarte jeg å ta en dyp utpust...') "
                      rows={2}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-500 transition-all font-serif mt-2"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Hvor ble det for mye? */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-amber-855 text-xxs block uppercase tracking-widest font-bold">STEG 3: KARTLEGG UTEN SKYLD</span>
                  <h3 className="text-lg font-serif text-stone-900 leading-snug">
                    Ikke for å henge deg ut – bare for å se mønsteret. Hvor i uka ble vinduet ditt smalest? Det sier mer om belastning enn om deg.
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {tooMuchChoices.map((choice) => {
                    const isSelected = whereWasTooMuch.includes(choice);
                    return (
                      <button
                        key={choice}
                        id={`sun-step3-too-much-${choice}`}
                        onClick={() => toggleTooMuch(choice)}
                        className={`text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-pine-600 bg-pine-50 text-stone-900 font-semibold shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                        }`}
                      >
                        <span>{choice}</span>
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-pine-600 border-pine-600 text-white' : 'border-stone-300 bg-white'}`}>
                          {isSelected && <span className="text-[9px] font-bold">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Hva tar du med deg? */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-amber-855 text-xxs block uppercase tracking-widest font-bold">STEG 4: LÆRDOM UTEN REKKFØLGE</span>
                  <h3 className="text-lg font-serif text-stone-900 leading-snug">
                    Hva lærte du om deg selv eller barnet? Bare en liten detalj – et tidlig alarmtegn du gjenkjente, eller en tone som virket.
                  </h3>
                </div>

                <div className="pt-2">
                  <textarea
                    id="sun-step4-learning-input"
                    value={learningText}
                    onChange={(e) => setLearningText(e.target.value)}
                    placeholder="F.eks: 'At surt svar ofte betyr regulering fremfor personlig avvisning, gjorde det lettere å ikke svelge agnet i går morges når skoene var borte...'"
                    rows={4}
                    className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-500 transition-all font-serif"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 5: Ett lite mål for neste uke */}
            {step === 5 && (
              <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-amber-855 text-xxs block uppercase tracking-widest font-bold">STEG 5: ETT BITTELITE MÅL</span>
                  <h3 className="text-lg font-serif text-stone-900 leading-snug">
                    Hva vil du øve på i én situasjon neste uke? Målet skal være bittelite, nært og situasjonsbasert.
                  </h3>
                </div>

                <div className="space-y-2 pt-2 max-h-80 overflow-y-auto pr-1">
                  {weeklyGoalChoices.map((choice) => (
                    <button
                      key={choice}
                      id={`sun-step5-goal-${choice.replace(/\s+/g, '-').slice(0, 15)}`}
                      onClick={() => setWeeklyGoalType(choice)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs transition-all flex items-start justify-between gap-3 cursor-pointer ${
                        weeklyGoalType === choice
                          ? 'border-pine-600 bg-pine-50 text-stone-950 font-semibold shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-500'
                      }`}
                    >
                      <span className="leading-relaxed">{choice}</span>
                      {weeklyGoalType === choice && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full mt-1.5 shrink-0" />}
                    </button>
                  ))}

                  {weeklyGoalType === 'Jeg vil skrive mitt eget bittelille mål...' && (
                    <motion.textarea
                      id="sun-step5-custom-goal-input"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      value={customWeeklyGoalText}
                      onChange={(e) => setCustomWeeklyGoalText(e.target.value)}
                      placeholder="Skriv målet ditt helt konkret (f.eks: 'Jeg holder kjeft i to sekunder i gangen før sko tas på...')"
                      rows={2}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-500 transition-all font-serif mt-2"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 6: Hva kan du legge fra deg? */}
            {step === 6 && (
              <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-amber-855 text-xxs block uppercase tracking-widest font-bold">STEG 6: LEGGE FRA SEG</span>
                  <h3 className="text-lg font-serif text-stone-900 leading-snug">
                    Hva trenger du ikke å bære denne uka? Avlasting og frihet er like viktig som handling.
                  </h3>
                </div>

                <div className="space-y-2 pt-2">
                  {putDownChoices.map((choice) => (
                    <button
                      key={choice}
                      id={`sun-step6-putdown-${choice.replace(/\s+/g, '-').slice(0, 15)}`}
                      onClick={() => setWhatToPutDownType(choice)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        whatToPutDownType === choice
                          ? 'border-pine-600 bg-pine-50 text-stone-950 font-semibold shadow-xs'
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-500'
                      }`}
                    >
                      <span>{choice}</span>
                      {whatToPutDownType === choice && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full" />}
                    </button>
                  ))}

                  {whatToPutDownType === 'Jeg vil skrive mitt eget...' && (
                    <motion.textarea
                      id="sun-step6-custom-putdown-input"
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      value={customPutDownText}
                      onChange={(e) => setCustomPutDownText(e.target.value)}
                      placeholder="Skriv det som skal glemmes eller utgå denne uka..."
                      rows={2}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-500 transition-all font-serif mt-2"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 7: Hva trenger du støtte til? */}
            {step === 7 && (
              <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-amber-855 text-xxs block uppercase tracking-widest font-bold">STEG 7: SIGNAL OM STØTTE</span>
                  <h3 className="text-lg font-serif text-stone-900 leading-snug">
                    Hvilket tema eller fokusområde ønsker du at dagbøkene, mikrohandlingene og språkkortene skal rulle rundt neste uke?
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {supportChoices.map((choice) => (
                    <button
                      key={choice}
                      id={`sun-step7-support-${choice}`}
                      onClick={() => setSupportNeeded(choice)}
                      className={`text-left p-3.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        supportNeeded === choice
                          ? 'border-pine-600 bg-pine-50 text-stone-950 font-semibold shadow-xs'
                          : 'border-stone-200 hover:border-stone-350 bg-white text-stone-500'
                      }`}
                    >
                      <span>{choice}</span>
                      {supportNeeded === choice && <div className="w-1.5 h-1.5 bg-pine-600 rounded-full" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-stone-100">
              {step > 1 ? (
                <button
                  id="sunday-prev-step-btn"
                  onClick={handlePrev}
                  className="text-stone-500 hover:text-stone-800 text-xs font-semibold py-2 cursor-pointer transition-colors duration-200"
                >
                  Tilbake
                </button>
              ) : (
                <div className="w-10" />
              )}

              <button
                id="sunday-next-step-btn"
                onClick={handleNext}
                className="px-6 py-2.5 bg-pine-600 hover:bg-pine-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-98 animate-fadeIn"
              >
                <span>{step === 7 ? 'Fullfør Ukesverksted' : 'Neste'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Historically Saved Reviews */}
      {sundayReports.length > 0 && (
        <div className="space-y-3 pt-4" id="sunday-history-block">
          <div className="flex items-center gap-1.5 text-stone-550 text-xxs uppercase tracking-widest">
            <Archive className="w-3.5 h-3.5" />
            <span>Tidligere ukes-notater</span>
          </div>

          <div className="space-y-3">
            {sundayReports.map((report) => (
              <div key={report.id} className="bg-white border border-stone-200 p-5 rounded-xl space-y-4 shadow-xxs">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-stone-800 font-serif">Søndagsverksted</p>
                    <p className="text-[10px] text-stone-400">Logget {new Date(report.date).toLocaleDateString('no-NO')}</p>
                  </div>
                  <span className="text-xxs bg-stone-50 border border-stone-200 px-2 py-0.5 rounded text-stone-500 uppercase">
                    {report.stateCheckIn}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xxs border-t border-stone-100 pt-3">
                  <div>
                    <span className="text-stone-400 block mb-0.5">Lettere:</span>
                    <p className="font-serif text-stone-700 italic">"{report.whatWasLighter}"</p>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">For mye:</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {report.whereWasTooMuch.length > 0 ? (
                        report.whereWasTooMuch.map((ch) => (
                          <span key={ch} className="bg-stone-50 border border-stone-100 px-1.5 py-0.2 rounded text-stone-500 text-[9px]">{ch}</span>
                        ))
                      ) : (
                        <span className="text-stone-400 italic">Ingenting valgt</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-400 block mb-0.5">Én lærdom:</span>
                    <p className="text-stone-700 leading-relaxed font-serif">"{report.learning}"</p>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Mål for ny uke:</span>
                    <p className="font-serif text-stone-850 font-bold leading-relaxed italic">"{report.nextGoal}"</p>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Lagt fra meg:</span>
                    <p className="font-serif text-stone-500 italic leading-relaxed">"{report.whatToPutDown}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
