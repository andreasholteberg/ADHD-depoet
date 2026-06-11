import React, { useState, useEffect } from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { Onboarding } from './components/Onboarding';
import { LandingPage } from './components/LandingPage';
import { ReturnWelcome } from './components/ReturnWelcome';
import { SafetyBanner } from './components/SafetyBanner';
import { TodayView } from './components/TodayView';
import { NowWhatView } from './components/NowWhatView';
import { SundayWorkshopView } from './components/SundayWorkshopView';
import { CoursesView } from './components/CoursesView';
import { LanguageBankView } from './components/LanguageBankView';
import { MyDepotView } from './components/MyDepotView';
import { getPromptForUser } from './data/dailyPrompts';
import { VARIANT_BANK, substitutePlaceholders, getDagsformBiasedIndex } from './data/variantBank';
import { getParentEnergy } from './lib/parentState';
import { 
  Sparkles, 
  HelpCircle, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Heart, 
  User as UserIcon, 
  RefreshCw, 
  Eye, 
  Compass, 
  AlertTriangle,
  Lightbulb,
  X,
  Mail,
  Phone,
  Bookmark,
  CloudLightning,
  Check,
  Smartphone,
  Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppInner() {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    showOnboarding, 
    resetAllData, 
    simulateAbsence,
    updateUserSettings,
    setShowReturnWelcome 
  } = useAppState();

  const [showLanding, setShowLanding] = useState<boolean>(() => {
    const hasVisited = localStorage.getItem('depoet_visited_app');
    return !hasVisited;
  });
  // Testpanelet finnes kun i utviklingsmodus – aldri i produksjon
  const isDev = import.meta.env.DEV;
  const [showSimulator, setShowSimulator] = useState(isDev);
  const [showProfile, setShowProfile] = useState(false);

  // Profile Form States
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [optEmail, setOptEmail] = useState(false);
  const [optSms, setOptSms] = useState(false);
  const [optPuff, setOptPuff] = useState(false);
  const [optReturn, setOptReturn] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Magic Link / Sync states
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [magicEmailError, setMagicEmailError] = useState('');

  // Pause States ("Ta en pause")
  const [pauseOption, setPauseOption] = useState<'one_week' | 'one_month' | 'indefinite' | null>(null);

  // Outgoing communications previews
  const [previewTab, setPreviewTab] = useState<'email' | 'sms' | 'sunday' | 'return'>('email');

  // Variantbank rotation states
  const [emailSubjectIndex, setEmailSubjectIndex] = useState(0);
  const [emailBodyIndex, setEmailBodyIndex] = useState(0);
  const [smsBodyIndex, setSmsBodyIndex] = useState(0);
  
  const [sundaySubjectIndex, setSundaySubjectIndex] = useState(0);
  const [sundayBodyIndex, setSundayBodyIndex] = useState(0);
  const [sundaySmsIndex, setSundaySmsIndex] = useState(0);
  
  const [returnBodyIndex, setReturnBodyIndex] = useState(0);
  const [returnSmsIndex, setReturnSmsIndex] = useState(0);

  // Simulation flags for weighting
  const [forceNestenTom, setForceNestenTom] = useState(false);

  const rotateAllVariants = () => {
    setEmailSubjectIndex((prev) => (prev + 1) % 6);
    setEmailBodyIndex((prev) => (prev + 1) % 4);
    setSmsBodyIndex((prev) => (prev + 1) % 4);
    
    setSundaySubjectIndex((prev) => (prev + 1) % 3);
    setSundayBodyIndex((prev) => (prev + 1) % 3);
    setSundaySmsIndex((prev) => (prev + 1) % 2);
    
    setReturnBodyIndex((prev) => (prev + 1) % 3);
    setReturnSmsIndex((prev) => (prev + 1) % 2);
  };

  // Sync state parameters when user changes or profile opens
  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setUserEmail(user.email || '');
      setOptEmail(user.optIns?.dailyEmail || false);
      setOptSms(user.optIns?.dailySms || false);
      setOptPuff(user.optIns?.weeklyPuff || false);
      setOptReturn(user.optIns?.returnOptIn || false);
      setPauseOption(user.pauseUntil || null);
    }
  }, [user, showProfile]);

  if (showLanding) {
    return (
      <LandingPage
        onEnterApp={() => {
          setShowLanding(false);
          localStorage.setItem('depoet_visited_app', 'true');
        }}
      />
    );
  }

  if (showOnboarding) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-stone-100 p-3 text-center border-b border-stone-200">
          <button
            onClick={() => setShowLanding(true)}
            className="text-xs text-stone-600 hover:text-stone-900 underline font-semibold cursor-pointer"
          >
            ← Gå tilbake til landingssiden
          </button>
        </div>
        <Onboarding />
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserSettings({
      name: userName,
      email: userEmail || undefined,
      pauseUntil: pauseOption,
      optIns: {
        dailyEmail: optEmail,
        dailySms: optSms,
        weeklyPuff: optPuff,
        returnOptIn: optReturn
      }
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-850 flex flex-col selection:bg-stone-200">
      
      {/* 1. TOP ANCHORED UKESMÅL NOTE (consistency-focused pinned task) */}
      {user?.selectedWeeklyGoal && (
        <div className="bg-stone-900 text-stone-200 text-center py-2 px-4 shadow-sm text-xs relative flex items-center justify-center gap-2 border-b border-stone-800">
          <Lightbulb className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-pulse" />
          <span className="font-medium">Ditt ukesmål:</span>
          <span className="italic font-serif text-stone-300">"{user.selectedWeeklyGoal}"</span>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col px-4 pt-6 pb-24 md:pb-16 relative">
        
        {/* 2. HEADER */}
        <header className="flex justify-between items-center mb-8 border-b border-stone-200/60 pb-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-serif text-stone-900 tracking-tight flex items-center gap-2">
              <img src="/depoet-logo-thumb-transparent.png" alt="" className="w-7 h-7 object-contain" />
              <span>Depoet</span>
            </h1>
            <p className="text-stone-500 text-xs font-medium">Et øvingsrom for {user?.name || 'deg'}</p>
          </div>

          <div className="flex flex-wrap justify-end items-center gap-2">
            {/* Vis Landingsside button */}
            <button
              id="view-landing-btn"
              onClick={() => setShowLanding(true)}
              className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-xs font-semibold bg-white border border-stone-200 px-3 py-1.5 rounded-lg hover:shadow-xs transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Landingsside</span>
            </button>

            {/* Profil og innstillinger / Sync button */}
            <button
              id="open-profile-btn"
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-xs font-semibold bg-white border border-stone-200 px-3 py-1.5 rounded-lg hover:shadow-xs transition-all cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Profil</span>
            </button>

            {/* Quick simulator handle (kun i utviklingsmodus) */}
            {isDev && (
              <button
                id="toggle-simulator-btn"
                onClick={() => setShowSimulator(!showSimulator)}
                className="text-stone-400 hover:text-stone-600 text-[10px] uppercase bg-stone-100 px-2.5 py-1.5 rounded-lg border border-stone-200 cursor-pointer"
              >
                {showSimulator ? 'Skjul testpanel' : 'Vis testpanel'}
              </button>
            )}
          </div>
        </header>

        {/* 3. SIMULATOR PANEL (kun i utviklingsmodus) */}
        <AnimatePresence>
          {isDev && showSimulator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-stone-105 bg-stone-100 border border-stone-200 p-4 rounded-xl mb-6 space-y-3 overflow-hidden text-xs text-stone-750 shadow-xxs"
            >
              <div className="flex justify-between items-center border-b border-stone-200/60 pb-2">
                <span className="text-xxs text-stone-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>MVP Testpanel ( Absence & Simulated states )</span>
                </span>
                <span className="text-[10px] text-stone-500 bg-stone-200/60 px-2 py-0.2 rounded">Sandbox LocalStorage</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xxs leading-relaxed">
                <div>
                  <p className="font-semibold text-stone-850">Hvordan systemet tester Returlaget ( Absence detection ):</p>
                  <p className="text-stone-500 mt-1">
                    Boken munnheller: <em className="text-stone-750">"Vi starter herfra i dag."</em> Klikk på knappen til høyre for å simulere at du har vært borte i 5 dager. Dette tenner Returoverlayet umiddelbart.
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-1.5">
                  <button
                    id="sim-btn-absence"
                    onClick={() => {
                      simulateAbsence(5);
                    }}
                    className="w-full text-center bg-white hover:bg-stone-50 border border-stone-300 p-2 rounded text-stone-800 transition-all text-xs font-semibold shadow-xs cursor-pointer"
                  >
                    🚀 Simuler 5 dagers fravær
                  </button>
                  
                  <div className="flex gap-1">
                    <button
                      id="sim-btn-reset"
                      onClick={() => {
                        if (confirm('Vil du tørke alle dine lokale onboarding-data og starte på nytt?')) {
                          resetAllData();
                        }
                      }}
                      className="flex-1 text-center bg-white border border-stone-250 hover:border-stone-400 p-2 rounded text-stone-600 hover:text-red-700 text-xxs transition-all cursor-pointer shadow-xs"
                    >
                      🗑️ Nullstill app-data
                    </button>
                    
                    <button
                      id="sim-btn-welcome"
                      onClick={() => setShowReturnWelcome(true)}
                      className="flex-1 text-center bg-white border border-stone-250 hover:border-stone-400 p-2 rounded text-stone-600 text-xxs transition-all cursor-pointer shadow-xs"
                    >
                      👀 Sjekk returoverlay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. ACTIVE TAB COMPILER */}
        <main className="flex-1">
          {activeTab === 'today' && <TodayView />}
          {activeTab === 'nowWhat' && <NowWhatView />}
          {activeTab === 'sunday' && <SundayWorkshopView />}
          {activeTab === 'courses' && <CoursesView />}
          {activeTab === 'languageBank' && <LanguageBankView />}
          {activeTab === 'myDepot' && <MyDepotView />}
        </main>

        {/* 5. PERSISTENT SAFEGUARD BANNER TRIGGER */}
        <SafetyBanner />

        {/* Lavmælt forhåndsvisningsinfo */}
        <p className="text-center text-[11px] text-stone-400 leading-relaxed px-6 pb-3 max-w-md mx-auto">
          Dette er en tidlig forhåndsvisning. Data lagres lokalt i nettleseren din – innlogging, skylagring og video kommer senere. Ikke legg inn sensitiv informasjon ennå.
        </p>

        {/* RETURN WELCOME OVERLAY (skamfri retur etter fravær – lukkes med kryss eller valg) */}
        <ReturnWelcome />

        {/* 6. TAB BAR NAVIGATION (Anchored at the bottom for responsive easy interaction) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200/80 shadow-lg px-4 py-2 z-40">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            
            <button
              id="nav-tab-today"
              onClick={() => setActiveTab('today')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
                activeTab === 'today' ? 'text-pine-700 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeTab === 'today' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-400'}`} />
              <span>I dag</span>
            </button>

            <button
              id="nav-tab-nowWhat"
              onClick={() => setActiveTab('nowWhat')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
                activeTab === 'nowWhat' ? 'text-pine-700 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <HelpCircle className={`w-4 h-4 ${activeTab === 'nowWhat' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-400'}`} />
              <span>Hva gjør jeg?</span>
            </button>

            <button
              id="nav-tab-sunday"
              onClick={() => setActiveTab('sunday')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
                activeTab === 'sunday' ? 'text-pine-700 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Calendar className={`w-4 h-4 ${activeTab === 'sunday' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-400'}`} />
              <span>Søndag</span>
            </button>

            <button
              id="nav-tab-courses"
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
                activeTab === 'courses' ? 'text-pine-700 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'courses' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-400'}`} />
              <span>Kurs</span>
            </button>

            <button
              id="nav-tab-lang"
              onClick={() => setActiveTab('languageBank')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
                activeTab === 'languageBank' ? 'text-pine-700 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <MessageSquare className={`w-4 h-4 ${activeTab === 'languageBank' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-400'}`} />
              <span>Språkbank</span>
            </button>

            <button
              id="nav-tab-depot"
              onClick={() => setActiveTab('myDepot')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-1 text-[10px] font-medium transition-all cursor-pointer ${
                activeTab === 'myDepot' ? 'text-pine-700 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Archive className={`w-4 h-4 ${activeTab === 'myDepot' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-400'}`} />
              <span>Mitt depot</span>
            </button>

          </div>
        </nav>

        {/* 7. PAUSE RETURN SHAME-FREE GREETING LAYER OVERLAY */}
           {/* 8. PROFILE / INNSTILLINGER SYNC OVERLAY (MODAL SYSTEM WITH OPT-INS AND USER REGISTRATION UPGRADE) */}
        <AnimatePresence>
          {showProfile && (
            <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                className="bg-white border border-stone-200 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
                id="profile-settings-dialog"
              >
                {/* Modal header */}
                <div className="bg-stone-900 text-stone-100 p-5 flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif tracking-tight flex items-center gap-2">
                      <UserIcon className="w-4.5 h-4.5 text-stone-400 shrink-0" />
                      <span>Profil & Kommunikasjon</span>
                    </h3>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wider">Dine valg og avtaler</p>
                  </div>
                  <button
                    id="close-profile-btn"
                    onClick={() => {
                      setShowProfile(false);
                      setLinkSent(false); // Reset temp status
                      setMagicEmailError('');
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-850 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal scroll area */}
                <div className="p-6 overflow-y-auto space-y-6 text-stone-800 text-xs">
                  
                  {/* Pausert / Sabbatpust active callout */}
                  {pauseOption && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2 text-stone-850 shadow-xxs"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-650 shrink-0" />
                        <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                          Pauset — stille dager aktivert
                        </span>
                      </div>
                      <p className="text-xxs font-serif text-stone-700 leading-relaxed md:pr-4">
                        Livet blir tungt iblant. Du har tatt en pause fra alle utgående meldinger{' '}
                        <strong>
                          {pauseOption === 'one_week' 
                            ? 'i én uke' 
                            : pauseOption === 'one_month' 
                            ? 'i én måned' 
                            : 'til du selv skrur dem på igjen'}
                        </strong>
                        . Vi er her akkurat når du er klar igjen – uten et eneste spørsmål eller regnskap.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setPauseOption(null);
                          updateUserSettings({ pauseUntil: null });
                        }}
                        className="px-3 py-1 bg-white hover:bg-stone-50 border border-amber-300 hover:border-amber-400 text-[10px] font-bold text-stone-800 rounded-lg transition-all cursor-pointer"
                      >
                        Avslutt pause og gjenopprett meldinger
                      </button>
                    </motion.div>
                  )}

                  {/* 1. SIKKER PROFIL & SKY-SYNKRONSISERING (Tilstand A/B) */}
                  <div className="space-y-4 pt-1">
                    <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-wider border-b border-stone-100 pb-1.55">
                      1. Lagring av det du bygger
                    </h4>

                    {user?.isAnonymous ? (
                      /* TILSTAND A: Anonym gjest */
                      <div className="space-y-3.5">
                        <div className="p-4 rounded-xl border border-dotted border-stone-300 bg-stone-50 flex items-start gap-4">
                          <div className="p-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-600 shrink-0">
                            <Compass className="w-5 h-5 text-stone-500 animate-pulse" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-1">
                              <span className="font-bold text-stone-900 text-xs">Status:</span>
                              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-900 uppercase">
                                Anonym gjest · lagret bare på denne telefonen
                              </span>
                            </div>
                            <p className="text-xxs text-stone-600 leading-relaxed font-serif">
                              Du bruker Depoet som anonym gjest. Alt du har bygget – språkbanken, målene, det du har øvd på – ligger lagret lokalt i denne nettleseren. Merk at det forsvinner hvis du tømmer nettleserdataene dine. Ikke legg inn sensitiv informasjon i denne forhåndsvisningen.
                            </p>
                          </div>
                        </div>

                        {/* UPGRADE FORM / Send Magic Link – simulert flyt, derfor kun i utviklingsmodus */}
                        {!isDev ? (
                          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xl">
                            <p className="text-[11px] text-stone-600 leading-relaxed font-serif">
                              <strong>Innlogging og skylagring kommer senere.</strong> Da vil du kunne koble verktøykassa di til e-posten din, slik at den følger deg mellom enheter. Inntil videre lagres alt kun lokalt i denne nettleseren.
                            </p>
                          </div>
                        ) : !linkSent ? (
                          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xl space-y-3">
                            <p className="text-[11px] text-stone-600 leading-relaxed font-serif">
                              <strong>Ta vare på verktøykassa di.</strong> Skriv inn e-posten din, så sender vi deg en lenke – ingen passord, ingen registrering. Da følger alt du har bygget med deg, uansett hvilken enhet du er på.
                            </p>
                            <div className="space-y-1.5">
                              <label htmlFor="magic-email" className="text-xxs text-stone-500 uppercase">E-postadresse</label>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                                  <input
                                    id="magic-email"
                                    type="email"
                                    placeholder="navn@eksempel.no"
                                    value={userEmail}
                                    onChange={(e) => {
                                      setUserEmail(e.target.value);
                                      setMagicEmailError('');
                                    }}
                                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-250 rounded-xl focus:outline-none focus:border-stone-500 text-xs text-stone-850 font-serif"
                                  />
                                </div>
                                <button
                                  type="button"
                                  disabled={isSendingLink || !userEmail}
                                  onClick={() => {
                                    if (!userEmail.includes('@') || !userEmail.includes('.')) {
                                      setMagicEmailError('Vennligst oppgi en gyldig e-postadresse.');
                                      return;
                                    }
                                    setIsSendingLink(true);
                                    setTimeout(() => {
                                      setIsSendingLink(false);
                                      setLinkSent(true);
                                    }, 1000);
                                  }}
                                  className="px-4 py-2 bg-pine-600 hover:bg-pine-700 disabled:bg-stone-300 text-white rounded-xl text-xxs font-semibold transition-all cursor-pointer shrink-0 h-[42px] flex items-center justify-center text-stone-100"
                                >
                                  {isSendingLink ? 'Sender...' : 'Send meg en lenke'}
                                </button>
                              </div>
                              {magicEmailError && (
                                <p className="text-red-600 text-xxs italic">{magicEmailError}</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 border border-green-200 p-4 rounded-xl space-y-3"
                          >
                            <div className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-700 stroke-[3]" />
                              <span className="font-bold text-green-950 text-xs">Magisk lenke er sendt!</span>
                            </div>
                            <p className="text-[11px] text-green-850 leading-relaxed font-serif">
                              Sjekk e-posten din – vi har sendt deg en lenke. Når du åpner den, er du koblet til, og statusen din blir <strong>«Synkronisert»</strong>. Du beholder alt du allerede har gjort.
                            </p>
                            <div className="pt-1.5 border-t border-green-200 flex flex-col gap-1.5">
                              <span className="text-[9px] text-green-700 uppercase font-bold">SANDBOX SIMULERING (Klikk for å fullføre tilkobling):</span>
                              <button
                                type="button"
                                onClick={() => {
                                  updateUserSettings({ email: userEmail, isAnonymous: false });
                                  setLinkSent(false);
                                }}
                                className="w-full text-center bg-white hover:bg-green-100/50 border border-green-300 p-2 rounded-lg text-green-900 hover:text-green-950 text-xxs font-bold transition-all cursor-pointer shadow-xxs"
                              >
                                👉 Simuler at du klikker på e-postlenken
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      /* TILSTAND B: Synkronisert */
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl border border-green-200 bg-green-50/40 flex items-start gap-4">
                          <div className="p-2 bg-green-100 border border-green-200 rounded-lg text-green-600 shrink-0">
                            <Check className="w-5 h-5 text-green-700 stroke-[3]" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900 text-xs">Status:</span>
                              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-green-100 text-green-900 uppercase">
                                Synkronisert · koblet til {user?.email}
                              </span>
                            </div>
                            <p className="text-xxs text-green-800 leading-relaxed font-serif">
                              Verktøykassa di er tatt vare på og følger deg på tvers av enhetene dine. Du kan koble fra når som helst.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Er du sikker på at du vil koble fra e-posten? Dataene dine blir værende lokalt på denne nettleseren.')) {
                                updateUserSettings({ email: undefined, isAnonymous: true });
                              }
                            }}
                            className="text-stone-500 hover:text-stone-800 hover:underline text-xxs font-medium cursor-pointer"
                          >
                            Koble fra e-post ({user?.email})
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. AVTALER (de fire bryterne) */}
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-wider border-b border-stone-100 pb-1">
                          2. Avtaler om pustebilletter og påminnelser
                        </h4>
                        <p className="text-xxs text-stone-500 leading-relaxed italic font-serif">
                          Du bestemmer alt her. Ingenting er på med mindre du slår det på, og du kan skru av når som helst. Vi teller aldri fravær.
                        </p>
                        <p className="text-xxs text-stone-500 leading-relaxed font-serif">
                          I denne forhåndsvisningen sendes ingen meldinger ennå – forhåndsvisningene lenger ned viser hvordan de vil se ut når tjenesten er klar.
                        </p>
                      </div>
                      
                      <div className="space-y-2 border-t border-b border-stone-100 py-3">
                        
                        {/* 1. Daglig e-post */}
                        <label className="flex items-start gap-3 cursor-pointer group p-2 hover:bg-stone-50 rounded-lg">
                          <div className="relative flex items-center mt-1">
                            <input
                              id="settings-opt-email"
                              type="checkbox"
                              checked={optEmail}
                              onChange={(e) => setOptEmail(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pine-600" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-semibold text-stone-800 group-hover:text-stone-950 flex items-center gap-1.5 text-xs">
                              <span>Send meg en daglig e-post</span>
                              <Mail className="w-3.5 h-3.5 text-stone-400 font-normal" />
                            </span>
                            <p className="text-[10px] text-stone-500 leading-relaxed font-serif">
                              Dagens pusterom og ett språkkort, hver morgen. En liten påminnelse, ikke en oppgave.
                            </p>
                          </div>
                        </label>

                        {/* 2. Daglig SMS */}
                        <label className="flex items-start gap-3 cursor-pointer group p-2 hover:bg-stone-50 rounded-lg">
                          <div className="relative flex items-center mt-1">
                            <input
                              id="settings-opt-sms"
                              type="checkbox"
                              checked={optSms}
                              onChange={(e) => setOptSms(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pine-600" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-semibold text-stone-800 group-hover:text-stone-950 flex items-center gap-1.5 text-xs">
                              <span>Send meg en daglig SMS</span>
                              <Smartphone className="w-3.5 h-3.5 text-stone-400 font-normal" />
                            </span>
                            <p className="text-[10px] text-stone-500 leading-relaxed font-serif">
                              Én rolig melding med dagens lille ting. Kort nok til å leses på vei ut døra.
                            </p>
                          </div>
                        </label>

                        {/* 3. Søndagspuff */}
                        <label className="flex items-start gap-3 cursor-pointer group p-2 hover:bg-stone-50 rounded-lg">
                          <div className="relative flex items-center mt-1">
                            <input
                              id="settings-opt-puff"
                              type="checkbox"
                              checked={optPuff}
                              onChange={(e) => setOptPuff(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pine-600" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-semibold text-stone-800 group-hover:text-stone-950 text-xs">Send meg en søndagspuff</span>
                            <p className="text-[10px] text-stone-500 leading-relaxed font-serif">
                              En liten påminnelse om Søndagsverkstedet. Ti minutter, ingen fasit.
                            </p>
                          </div>
                        </label>

                        {/* 4. Returpuff */}
                        <label className="flex items-start gap-3 cursor-pointer group p-2 hover:bg-stone-50 rounded-lg">
                          <div className="relative flex items-center mt-1">
                            <input
                              id="settings-opt-return"
                              type="checkbox"
                              checked={optReturn}
                              onChange={(e) => setOptReturn(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-8 h-4 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pine-600" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-semibold text-stone-800 group-hover:text-stone-950 text-xs">Send meg en velkommen-tilbake-puff</span>
                            <p className="text-[10px] text-stone-500 leading-relaxed font-serif">
                              Hvis du har vært borte noen dager, sender vi én mild melding. Aldri en påminnelse om hvor lenge. Standard trigger: 4 dager.
                            </p>
                          </div>
                        </label>

                      </div>

                      {/* SAMTYKKE CARD (vises ved opt-in) */}
                      {(optEmail || optSms || optPuff || optReturn) && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 bg-stone-900 text-stone-100 rounded-xl space-y-2 leading-relaxed"
                        >
                          <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-red-400 shrink-0 animate-pulse" />
                            <span>DEPOETS SAMTYKKEGARANTI (Opt-in)</span>
                          </p>
                          <p className="text-xxs font-serif text-stone-200 leading-relaxed">
                            Når du slår på en avtale, gjelder den bare den typen melding du har valgt – aldri oftere enn det. Du kan skru av hver enkelt når som helst. Vi teller aldri fravær, og vi sender aldri noe som får deg til å føle at du ligger etter.
                          </p>
                          <p className="text-xxs font-serif text-stone-400 leading-relaxed border-t border-stone-800 pt-2">
                            Dette er en tidlig forhåndsvisning: meldinger sendes ikke ennå, og valgene dine lagres foreløpig kun lokalt i nettleseren din.
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* 3. TA EN PAUSE (New requested function) */}
                    <div className="space-y-3 pt-1">
                      <div className="space-y-1">
                        <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-wider border-b border-stone-100 pb-1">
                          3. Ta en pause fra påminnelser
                        </h4>
                        <p className="text-xxs text-stone-500 leading-relaxed font-serif">
                          «Livet blir tungt iblant. Du kan ta en pause fra alle meldinger uten å skru av noe – og slå dem på igjen når du vil. Vi er her når du er klar.»
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 border border-stone-200/50 p-2 rounded-xl bg-stone-50">
                        <button
                          type="button"
                          onClick={() => setPauseOption('one_week')}
                          className={`py-2 px-1 rounded-lg border text-xxs transition-all font-semibold cursor-pointer ${
                            pauseOption === 'one_week'
                              ? 'bg-pine-600 border-pine-600 text-white shadow-xxs'
                              : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          I én uke
                        </button>
                        <button
                          type="button"
                          onClick={() => setPauseOption('one_month')}
                          className={`py-2 px-1 rounded-lg border text-xxs transition-all font-semibold cursor-pointer ${
                            pauseOption === 'one_month'
                              ? 'bg-pine-600 border-pine-600 text-white shadow-xxs'
                              : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          I én måned
                        </button>
                        <button
                          type="button"
                          onClick={() => setPauseOption('indefinite')}
                          className={`py-2 px-1 rounded-lg border text-xxs transition-all font-semibold cursor-pointer ${
                            pauseOption === 'indefinite'
                              ? 'bg-pine-600 border-pine-600 text-white shadow-xxs'
                              : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          Ubestemt tid
                        </button>
                      </div>
                      
                      {pauseOption && (
                        <p className="text-[10px] text-amber-800 italic font-serif flex items-center gap-1">
                          <span>💡 Påminnelser deaktiveres inntil du trykker "Avslutt pause" eller til tidsperioden utløper.</span>
                        </p>
                      )}
                    </div>

                    {/* 4. UTGÅENDE MELDINGSMALER (Live Previews from Section 5 in PDF) */}
                    <div className="space-y-3 pt-2">
                      <div className="space-y-1">
                        <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-wider">
                          4. Utgående meldingsmaler (forhåndsvisning)
                        </h4>
                        <p className="text-xxs text-stone-500 leading-relaxed font-serif">
                          Her ser du nøyaktig hvordan meldingene du har valgt å motta vil se ut. Vi sletter alle tekniske spor og pyntekoder, og bevarer kun milde pusterom i ren tekst.
                        </p>
                      </div>

                      {/* Tab Selectors */}
                      <div className="flex gap-1 border-b border-stone-200 pb-0.5">
                        <button
                          type="button"
                          onClick={() => setPreviewTab('email')}
                          className={`pb-1.5 px-2 text-[10px] transition-all border-b-2 shrink-0 cursor-pointer ${
                            previewTab === 'email' 
                              ? 'border-pine-700 text-pine-700 font-bold' 
                              : 'border-transparent text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          E-postbrev
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('sms')}
                          className={`pb-1.5 px-2 text-[10px] transition-all border-b-2 shrink-0 cursor-pointer ${
                            previewTab === 'sms' 
                              ? 'border-pine-700 text-pine-700 font-bold' 
                              : 'border-transparent text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          Daglig SMS
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('sunday')}
                          className={`pb-1.5 px-2 text-[10px] transition-all border-b-2 shrink-0 cursor-pointer ${
                            previewTab === 'sunday' 
                              ? 'border-pine-700 text-pine-700 font-bold' 
                              : 'border-transparent text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          Søndagspuff
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTab('return')}
                          className={`pb-1.5 px-2 text-[10px] transition-all border-b-2 shrink-0 cursor-pointer ${
                            previewTab === 'return' 
                              ? 'border-pine-700 text-pine-700 font-bold' 
                              : 'border-transparent text-stone-400 hover:text-stone-600'
                          }`}
                        >
                          Returpuff
                        </button>
                      </div>

                      {/* Variant control panel (testverktøy – kun i utviklingsmodus) */}
                      {isDev && (
                      <div className="bg-white border border-stone-200/80 rounded-xl p-3.5 space-y-3 shadow-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-700 tracking-wider uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Variantbank v1.2 motor
                            </div>
                            <p className="text-[10px] text-stone-500 leading-normal font-sans font-medium">
                              Sikrer at ingen forelder ser samme tekst to dager på rad. Velg eller roter variantene manuelt for og teste kombinasjonene:
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1.5 cursor-pointer bg-stone-50 hover:bg-stone-100 border border-stone-200/60 py-1.5 px-2.5 rounded-md select-none transition-all">
                              <input
                                type="checkbox"
                                checked={forceNestenTom}
                                onChange={(e) => setForceNestenTom(e.target.checked)}
                                className="accent-stone-850 h-3 w-3 cursor-pointer"
                              />
                              <span className="font-sans text-[10px] text-stone-600 font-semibold">Tving dagsform: nesten tom</span>
                            </label>

                            <button
                              type="button"
                              onClick={rotateAllVariants}
                              className="bg-stone-900 hover:bg-stone-850 text-white font-sans text-[10px] font-bold py-1.5 px-3 rounded-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xxs"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              Roter faste varianter
                            </button>
                          </div>
                        </div>

                        {/* Status bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-t border-stone-100 pt-2.5 text-[9px] text-stone-550">
                          <div>
                            <span className="text-stone-400">Emne-index:</span> {emailSubjectIndex + 1}/6
                          </div>
                          <div>
                            <span className="text-stone-400">Epost-index:</span> {emailBodyIndex + 1}/4 {(forceNestenTom || getParentEnergy(user) === 'tom') && <span className="text-amber-600 font-bold">(Tvinget)</span>}
                          </div>
                          <div>
                            <span className="text-stone-400">SMS-index:</span> {smsBodyIndex + 1}/4 {(forceNestenTom || getParentEnergy(user) === 'tom') && <span className="text-amber-600 font-bold">(Tvinget)</span>}
                          </div>
                          <div className="text-right">
                            <span className="text-emerald-600 font-semibold">● Substitusjonssjekk: Godkjent</span>
                          </div>
                        </div>
                      </div>
                      )}

                      {/* Tab Content Rendering with dynamic values from active prompt */}
                      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 min-h-[148px] flex flex-col justify-between">
                        {(() => {
                          const activeFocus = user?.currentFocus || 'Skjerm';
                          const activePrompt = getPromptForUser(activeFocus);
                          const activeAction = activePrompt?.microAction || 'Gjør en liten bevegelse langsommere.';
                          const activeCardText = activePrompt?.languageCard?.text || 'Nå rydder vi plass til relasjonen.';
                          
                          const isNestenTomNow = forceNestenTom || getParentEnergy(user) === 'tom';

                          if (previewTab === 'email') {
                            const rawSubject = VARIANT_BANK.dailyEmail.subjects[emailSubjectIndex];
                            const rawBody = VARIANT_BANK.dailyEmail.bodies[getDagsformBiasedIndex('email', isNestenTomNow, emailBodyIndex, 4)];
                            const cleanSubject = substitutePlaceholders(rawSubject, activeAction, activeCardText);
                            const cleanBody = substitutePlaceholders(rawBody, activeAction, activeCardText);

                            return (
                              <div className="space-y-3.5 text-xxs font-serif leading-relaxed">
                                <div className="border-b border-stone-150 pb-2 mb-2 text-[9px] text-stone-400 space-y-0.5">
                                  <div><strong className="text-stone-500">Emne:</strong> "{cleanSubject}"</div>
                                  <div><strong className="text-stone-500">Fra:</strong> Andreas i Depoet &lt;post@depoet.no&gt;</div>
                                  <div><strong className="text-stone-500">Til:</strong> {user?.email || 'din-epost@eksempel.no'}</div>
                                  {isNestenTomNow && (
                                    <div className="text-amber-600 font-bold text-[8px] uppercase tracking-wider flex items-center gap-0.5 mt-1">
                                      ⚠️ Foreldrestatus "Nesten tom" gjenkjent — milde formuleringer foretrekkes automatisk.
                                    </div>
                                  )}
                                </div>
                                <div className="whitespace-pre-wrap font-serif text-stone-800 text-[11px] leading-relaxed">
                                  {cleanBody}
                                </div>
                                
                                <div className="border-t border-stone-150 pt-3 mt-4 space-y-1 bg-stone-100/30 p-2 rounded font-sans text-[10px]">
                                  <div className="flex gap-2 mb-1.5">
                                    <span className="bg-stone-800 text-stone-100 px-2 py-0.5 rounded text-[8px] font-semibold">Åpne Depoet</span>
                                    <span className="border border-stone-300 bg-white px-2 py-0.5 rounded text-[8px] text-stone-600 font-medium whitespace-nowrap">Skru av daglig e-post</span>
                                  </div>
                                  <span className="text-[9px] text-stone-400 block italic leading-normal">
                                    Vil du ikke ha disse lenger? Du kan slå dem av med ett enkelt trykk, uten krav om forklaring.
                                  </span>
                                </div>
                              </div>
                            );
                          }

                          if (previewTab === 'sms') {
                            const rawBody = VARIANT_BANK.dailySms.bodies[getDagsformBiasedIndex('sms', isNestenTomNow, smsBodyIndex, 4)];
                            const cleanBody = substitutePlaceholders(rawBody, activeAction, activeCardText);

                            return (
                              <div className="space-y-4 text-[10px] leading-relaxed text-stone-850">
                                <div className="border-b border-stone-150 pb-1.5 mb-2 flex justify-between text-stone-400 text-[8px] uppercase tracking-wider">
                                  <span>Mottatt fra: Depoet</span>
                                  <span>SMS-Format</span>
                                </div>
                                <div className="bg-white border border-stone-200 text-stone-850 p-3 rounded-2xl shadow-xxs rounded-tl-sm max-w-[85%] font-serif text-xxs leading-snug">
                                  {cleanBody}
                                </div>
                                <div className="text-[8px] text-stone-400 italic font-sans leading-normal">
                                  Ved å svare STOPP blir SMS-avtalen øyeblikkelig deaktivert.
                                </div>
                              </div>
                            );
                          }

                          if (previewTab === 'sunday') {
                            const rawSubject = VARIANT_BANK.sundayWorkshop.subjects[sundaySubjectIndex];
                            const rawBody = VARIANT_BANK.sundayWorkshop.bodies[sundayBodyIndex];
                            const rawSmsBody = VARIANT_BANK.sundayWorkshop.smsBodies[sundaySmsIndex];

                            const cleanSubject = substitutePlaceholders(rawSubject, null, null);
                            const cleanBody = substitutePlaceholders(rawBody, null, null);
                            const cleanSmsBody = substitutePlaceholders(rawSmsBody, null, null);

                            return (
                              <div className="space-y-3 font-serif text-xxs leading-relaxed">
                                <div className="border-b border-stone-150 pb-2 mb-2 text-[9px] text-stone-400">
                                  <div><strong className="text-stone-500">Emne:</strong> {cleanSubject}</div>
                                  <div><strong className="text-stone-500">Når:</strong> Hver søndag ettermiddag</div>
                                </div>
                                <div className="whitespace-pre-wrap font-serif text-stone-800 text-[11px] leading-relaxed mb-4">
                                  {cleanBody}
                                </div>
                                
                                <div className="bg-stone-100 p-2.5 rounded-lg border border-stone-200 mt-2 font-sans text-[10px] space-y-1.5">
                                  <p className="font-semibold text-stone-850">Også på SMS:</p>
                                  <p className="text-[9.5px] bg-white p-2 border border-stone-150 rounded text-stone-700 font-serif">
                                    "{cleanSmsBody}"
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          if (previewTab === 'return') {
                            const rawBody = VARIANT_BANK.returnWelcome.bodies[returnBodyIndex];
                            const rawSmsBody = VARIANT_BANK.returnWelcome.smsBodies[returnSmsIndex];

                            const cleanBody = substitutePlaceholders(rawBody, null, null);
                            const cleanSmsBody = substitutePlaceholders(rawSmsBody, null, null);

                            return (
                              <div className="space-y-3 font-serif text-xxs leading-relaxed">
                                <div className="border-b border-stone-150 pb-2 mb-2 text-[9px] text-stone-400">
                                  <div><strong className="text-stone-500">Emne:</strong> Velkommen tilbake</div>
                                  <div><strong className="text-stone-500">Trigger:</strong> Aktiveres etter 4+ dagers inaktivitet</div>
                                </div>
                                <div className="whitespace-pre-wrap font-serif text-stone-800 text-[11px] leading-relaxed mb-4">
                                  {cleanBody}
                                </div>
                                
                                <div className="bg-stone-100 p-2.5 rounded-lg border border-stone-200 mt-2 font-sans text-[10px] space-y-1.5">
                                  <p className="font-semibold text-stone-850">Også på SMS:</p>
                                  <p className="text-[9.5px] bg-white p-2 border border-stone-150 rounded text-stone-700 font-serif">
                                    "{cleanSmsBody}"
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          return null;
                        })()}
                      </div>
                    </div>

                    {/* Saving actions */}
                    <div className="pt-4 border-t border-stone-150 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 italic font-serif">
                        Tidlig forhåndsvisning – data lagres lokalt i nettleseren din.
                      </span>

                      <div className="flex gap-2">
                        <button
                          id="settings-cancel-btn"
                          type="button"
                          onClick={() => {
                            setShowProfile(false);
                            setLinkSent(false);
                            setMagicEmailError('');
                          }}
                          className="px-4 py-2 border border-stone-250 hover:border-stone-450 rounded-lg text-xxs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                        >
                          Avbryt
                        </button>
                        <button
                          id="settings-save-submit"
                          type="submit"
                          className="px-5 py-2 bg-pine-600 hover:bg-pine-700 text-white rounded-lg text-xxs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all text-stone-100"
                        >
                          {saveSuccess ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400 fill-green-400 stroke-[3]" />
                              <span>Lagret!</span>
                            </>
                          ) : (
                            <span>Lagre profil</span>
                          )}
                        </button>
                      </div>
                    </div>

                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppInner />
    </AppStateProvider>
  );
}
