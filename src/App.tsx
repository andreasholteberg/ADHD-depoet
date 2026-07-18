import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
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
import { getStoredTheme, setTheme, type ThemePref } from './lib/theme';
import { exportAllData } from './lib/dataExport';
import { useEscapeClose } from './lib/useEscapeClose';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { appConfig } from './lib/config';
import { isEmailOtpCode, normalizeEmailOtpInput } from './lib/authCode';
import { AUTH_CALLBACK_PATH } from './lib/authRedirect';
import {
  ACCOUNT_AND_DATA_STATUS,
  LOCAL_BUILD_STATUS,
  REMINDER_STATUS,
} from './lib/productCopy';
import { getCurrentSession, getSupabaseClient } from './lib/supabaseClient';
import {
  buildLocalImportPreview,
  cancelAccountDeletion,
  exportServerData,
  getAccountState,
  importLocalDeviceData,
  requestAccountDeletion,
  requestMagicLink,
  signOut,
  syncLocalDepotToSupabase,
  type AccountState,
  type SyncStatus,
  verifyEmailOtp,
} from './lib/syncService';
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
  Archive,
  Sun,
  Moon,
  Monitor,
  Download,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppInner() {
  const { 
    user, 
    sundayReports,
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
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [themePref, setThemePref] = useState<ThemePref>(getStoredTheme());

  // Escape lukker profilmodalen (WCAG 2.1.2)
  useEscapeClose(() => setShowProfile(false), showProfile);

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
  const [otpEmail, setOtpEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(appConfig.backendEnabled ? 'idle' : 'local');
  const [syncMessage, setSyncMessage] = useState('');
  const [syncConsentChecked, setSyncConsentChecked] = useState(false);
  const [accountState, setAccountState] = useState<AccountState | null>(null);

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
      setSyncConsentChecked(Boolean(user.syncConsent?.acceptedAt));
    }
  }, [user, showProfile]);

  useEffect(() => {
    if (!appConfig.backendEnabled) {
      setSession(null);
      setSyncStatus('local');
      return;
    }

    let active = true;
    const supabase = getSupabaseClient();

    getCurrentSession().then((currentSession) => {
      if (!active) return;
      setSession(currentSession);
      setSyncStatus(currentSession ? 'idle' : 'local');
      if (currentSession?.user.email) {
        setUserEmail(currentSession.user.email);
      }
    });

    const { data } = supabase!.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setSyncStatus(nextSession ? 'idle' : 'local');
      if (nextSession?.user.email) {
        setUserEmail(nextSession.user.email);
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setAccountState(null);
      return;
    }
    getAccountState()
      .then((state) => {
        setAccountState(state);
        if (state.state === 'locked') setSyncStatus('locked');
      })
      .catch(() => setSyncMessage('Kontostatus kunne ikke hentes akkurat nå.'));
  }, [session]);

  useEffect(() => {
    if (session && window.location.pathname === AUTH_CALLBACK_PATH) {
      window.history.replaceState({}, '', '/');
    }
  }, [session]);

  if (window.location.pathname === '/personvern') {
    return (
      <PrivacyPolicy
        onClose={() => {
          window.history.pushState({}, '', '/');
          setShowPrivacy(false);
        }}
      />
    );
  }

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
    const hasMessageOptIn = optEmail || optSms || optPuff || optReturn;
    updateUserSettings({
      name: userName,
      email: userEmail || undefined,
      pauseUntil: pauseOption,
      emailConsent: hasMessageOptIn
        ? user?.emailConsent ?? {
            acceptedAt: new Date().toISOString(),
            version: appConfig.emailEnabled ? 'profile-email-opt-in-v1' : 'profile-local-message-interest-v1',
          }
        : null,
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

  const handleRequestMagicLink = async () => {
    const email = userEmail.trim();
    setMagicEmailError('');
    setOtpError('');
    setOtpCode('');
    setSyncMessage('');

    if (!appConfig.backendEnabled) {
      setMagicEmailError('Innlogging er ikke konfigurert ennå.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setMagicEmailError('Vennligst oppgi en gyldig e-postadresse.');
      return;
    }
    if (!syncConsentChecked) {
      setMagicEmailError('Du må samtykke til skylagring før vi sender innloggingslenke.');
      return;
    }

    const acceptedAt = new Date().toISOString();
    updateUserSettings({
      email,
      syncConsent: { acceptedAt, version: 'sync-v1' },
      freeTextSyncConsent: null,
    });

    setIsSendingLink(true);
    const result = await requestMagicLink(email);
    setIsSendingLink(false);
    setSyncMessage(result.message);
    if (result.ok) {
      setOtpEmail(email);
      setLinkSent(true);
    } else {
      setMagicEmailError(result.message);
    }
  };

  const handleVerifyEmailOtp = async () => {
    setOtpError('');
    setSyncMessage('');

    if (!isEmailOtpCode(otpCode)) {
      setOtpError('Skriv inn alle seks sifrene fra e-posten.');
      return;
    }

    if (!otpEmail) {
      setOtpError('E-postadressen mangler. Be om en ny kode og prøv igjen.');
      return;
    }

    setIsVerifyingCode(true);
    const result = await verifyEmailOtp(otpEmail, otpCode);
    setIsVerifyingCode(false);

    if (!result.ok) {
      setOtpError(result.message);
      return;
    }

    setSession(result.session);
    setOtpCode('');
    setLinkSent(false);
    setSyncStatus('idle');
    setSyncMessage(result.message);
  };

  const handleRunSync = async () => {
    if (!session || !user) return;
    let reflectionCount = 0;
    try {
      const value = JSON.parse(localStorage.getItem('depoet_reflections') ?? '[]');
      reflectionCount = Array.isArray(value) ? value.length : 0;
    } catch {
      reflectionCount = 0;
    }
    const preview = await buildLocalImportPreview(
      { user, sundayReports },
      { reflectionCount },
    );
    const structuredCount =
      preview.structured.savedLanguageCards +
      preview.structured.courseProgress +
      preview.structured.practices +
      preview.structured.cycles +
      preview.structured.observations +
      preview.structured.sundayDecisions;
    const approved = confirm(
      'Forhåndsvisning før synk:\n\n' +
        structuredCount +
        ' strukturerte oppføringer kan sendes til kontoen.\n' +
        (preview.localOnlyFreeText.reflections + preview.localOnlyFreeText.sundayReports) +
        ' fritekstoppføringer blir på denne enheten.\n\nVil du fortsette?',
    );
    if (!approved) {
      setSyncMessage('Ingen data ble sendt.');
      return;
    }
    setSyncStatus('syncing');
    setSyncMessage('Importerer godkjent strukturert data...');
    const importResult = await importLocalDeviceData(preview, true);
    if (!importResult.ok) {
      setSyncStatus('error');
      setSyncMessage(importResult.message);
      return;
    }
    const result = await syncLocalDepotToSupabase(session, { user, sundayReports });
    setSyncStatus(result.ok ? 'synced' : result.pending > 0 ? 'queued' : 'error');
    setSyncMessage(result.message);
  };

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
    setSyncStatus('local');
    setSyncMessage('Du er logget ut. Lokale data ligger fortsatt i denne nettleseren.');
  };

  const handleExportData = async () => {
    const serverData = appConfig.backendEnabled && session ? await exportServerData(session) : undefined;
    if (exportAllData(serverData)) {
      setExportDone(true);
      setTimeout(() => setExportDone(false), 2500);
    }
  };

  const handleDeleteAllData = async () => {
    if (appConfig.backendEnabled && session) {
      const confirmed = confirm(
        'Dette oppretter en sletteforespørsel. Kontoen låses med en gang, men kan gjenåpnes i syv dager. Lokale data beholdes inntil serverflyten er ferdig. Vil du fortsette?',
      );
      if (!confirmed) return;
      const result = await requestAccountDeletion();
      setSyncMessage(result.message);
      if (!result.ok) {
        setSyncStatus('error');
        return;
      }
      setAccountState(result.state);
      setSyncStatus('locked');
      return;
    }
    const confirmed = confirm(
      'Dette sletter alt Depoet har lagret i denne nettleseren. Det kan ikke angres. Vil du fortsette?',
    );
    if (!confirmed) return;
    resetAllData();
    setShowProfile(false);
  };

  const handleCancelAccountDeletion = async () => {
    const result = await cancelAccountDeletion();
    setSyncMessage(result.message);
    if (result.ok) {
      setAccountState(result.state);
      setSyncStatus('idle');
    } else {
      setSyncStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-850 flex flex-col selection:bg-stone-200">
      
      {/* 1. TOP ANCHORED UKESMÅL NOTE (consistency-focused pinned task) */}
      {user?.selectedWeeklyGoal && (
        <div className="bg-moss text-cream-soft text-center py-2 px-4 shadow-sm text-xs relative flex items-center justify-center gap-2 border-b border-stone-800">
          <Lightbulb className="w-3.5 h-3.5 text-cream-soft/80 shrink-0" />
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
              <span className="relative inline-block w-7 h-7 shrink-0">
                <img src="/depoet-logo-thumb-transparent.png" alt="" className="absolute inset-0 w-7 h-7 object-contain dark:hidden" />
                <img src="/depoet-logo-thumb-transparent-dark-mode.png" alt="" className="absolute inset-0 hidden w-7 h-7 object-contain dark:block" />
              </span>
              <span>Depoet</span>
            </h1>
            <p className="text-stone-500 text-xs font-medium">Et øvingsrom for {user?.name || 'deg'}</p>
          </div>

          <div className="flex flex-wrap justify-end items-center gap-2">
            {/* Vis Landingsside button */}
            <button
              id="view-landing-btn"
              onClick={() => setShowLanding(true)}
              className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-xs font-semibold bg-stone-55 border border-stone-200 px-3 py-1.5 rounded-lg hover:shadow-xs transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Landingsside</span>
            </button>

            {/* Profil og innstillinger / Sync button */}
            <button
              id="open-profile-btn"
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-xs font-semibold bg-stone-55 border border-stone-200 px-3 py-1.5 rounded-lg hover:shadow-xs transition-all cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Profil</span>
            </button>

            {/* Quick simulator handle (kun i utviklingsmodus) */}
            {isDev && (
              <button
                id="toggle-simulator-btn"
                onClick={() => setShowSimulator(!showSimulator)}
                className="text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800 text-[10px] uppercase bg-stone-100 px-2.5 py-1.5 rounded-lg border border-stone-200 cursor-pointer"
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
                    className="w-full text-center bg-stone-55 hover:bg-stone-50 border border-stone-300 p-2 rounded text-stone-800 transition-all text-xs font-semibold shadow-xs cursor-pointer"
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
                      className="flex-1 text-center bg-stone-55 border border-stone-250 hover:border-stone-400 p-2 rounded text-stone-600 hover:text-red-700 text-xxs transition-all cursor-pointer shadow-xs"
                    >
                      🗑️ Nullstill app-data
                    </button>
                    
                    <button
                      id="sim-btn-welcome"
                      onClick={() => setShowReturnWelcome(true)}
                      className="flex-1 text-center bg-stone-55 border border-stone-250 hover:border-stone-400 p-2 rounded text-stone-600 text-xxs transition-all cursor-pointer shadow-xs"
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

        {/* Lavmælt produktstatus + personverninngang */}
        <div className="text-center px-6 pb-3 max-w-md mx-auto space-y-1">
          <p className="text-xs text-stone-500 leading-relaxed">
            {appConfig.backendEnabled ? ACCOUNT_AND_DATA_STATUS : LOCAL_BUILD_STATUS}
            {' '}Videokursene er på vei.
          </p>
          <button
            id="app-privacy-link"
            onClick={() => setShowPrivacy(true)}
            className="text-xs text-stone-500 underline underline-offset-2 hover:text-stone-800 cursor-pointer"
          >
            Personvernerklæring
          </button>
        </div>

        {/* RETURN WELCOME OVERLAY (skamfri retur etter fravær – lukkes med kryss eller valg) */}
        <ReturnWelcome />

        {/* PERSONVERNERKLÆRING – tilgjengelig fra footer og profil */}
        {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}

        {/* 6. TAB BAR NAVIGATION (Anchored at the bottom for responsive easy interaction) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-stone-55 border-t border-stone-200/80 shadow-lg px-2 py-2 z-40">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            
            <button
              id="nav-tab-today"
              onClick={() => setActiveTab('today')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10.5px] leading-tight font-semibold transition-all cursor-pointer ${
                activeTab === 'today' ? 'text-pine-700 font-bold' : 'text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeTab === 'today' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-500 dark:text-stone-600'}`} />
              <span>I dag</span>
            </button>

            <button
              id="nav-tab-nowWhat"
              onClick={() => setActiveTab('nowWhat')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10.5px] leading-tight font-semibold transition-all cursor-pointer ${
                activeTab === 'nowWhat' ? 'text-pine-700 font-bold' : 'text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
              }`}
            >
              <HelpCircle className={`w-4 h-4 ${activeTab === 'nowWhat' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-500 dark:text-stone-600'}`} />
              <span>Hva gjør jeg?</span>
            </button>

            <button
              id="nav-tab-sunday"
              onClick={() => setActiveTab('sunday')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10.5px] leading-tight font-semibold transition-all cursor-pointer ${
                activeTab === 'sunday' ? 'text-pine-700 font-bold' : 'text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
              }`}
            >
              <Calendar className={`w-4 h-4 ${activeTab === 'sunday' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-500 dark:text-stone-600'}`} />
              <span>Søndag</span>
            </button>

            <button
              id="nav-tab-courses"
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10.5px] leading-tight font-semibold transition-all cursor-pointer ${
                activeTab === 'courses' ? 'text-pine-700 font-bold' : 'text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'courses' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-500 dark:text-stone-600'}`} />
              <span>Kurs</span>
            </button>

            <button
              id="nav-tab-lang"
              onClick={() => setActiveTab('languageBank')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10.5px] leading-tight font-semibold transition-all cursor-pointer ${
                activeTab === 'languageBank' ? 'text-pine-700 font-bold' : 'text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
              }`}
            >
              <MessageSquare className={`w-4 h-4 ${activeTab === 'languageBank' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-500 dark:text-stone-600'}`} />
              <span>Språkbank</span>
            </button>

            <button
              id="nav-tab-depot"
              onClick={() => setActiveTab('myDepot')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10.5px] leading-tight font-semibold transition-all cursor-pointer ${
                activeTab === 'myDepot' ? 'text-pine-700 font-bold' : 'text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
              }`}
            >
              <Archive className={`w-4 h-4 ${activeTab === 'myDepot' ? 'text-pine-700 stroke-[2.2]' : 'text-stone-500 dark:text-stone-600'}`} />
              <span>Mitt depot</span>
            </button>

          </div>
        </nav>

        {/* 7. PAUSE RETURN SHAME-FREE GREETING LAYER OVERLAY */}
           {/* 8. PROFILE / INNSTILLINGER SYNC OVERLAY (MODAL SYSTEM WITH OPT-INS AND USER REGISTRATION UPGRADE) */}
        <AnimatePresence>
          {showProfile && (
            <div className="fixed inset-0 bg-[#1a1612]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                className="bg-stone-55 border border-stone-200 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
                id="profile-settings-dialog"
                role="dialog"
                aria-modal="true"
                aria-label="Profil og innstillinger"
              >
                {/* Modal header */}
                <div className="bg-moss text-cream p-5 flex justify-between items-center">
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
                  
                  {/* Utseende: lys / mørk modus (Kontinuum) */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Utseende</span>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { val: 'system', label: 'System', Icon: Monitor },
                        { val: 'light', label: 'Lys', Icon: Sun },
                        { val: 'dark', label: 'Mørk', Icon: Moon },
                      ] as const).map(({ val, label, Icon }) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => { setTheme(val); setThemePref(val); }}
                          className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                            themePref === val
                              ? 'border-pine-600 bg-pine-50 text-stone-900'
                              : 'border-stone-200 bg-stone-55 hover:border-stone-400 text-stone-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-stone-400 leading-relaxed">«System» følger enheten din. Valget huskes på denne enheten.</p>
                  </div>

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
                        className="px-3 py-1 bg-stone-55 hover:bg-stone-50 border border-amber-300 hover:border-amber-400 text-[10px] font-bold text-stone-800 rounded-lg transition-all cursor-pointer"
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

                    {!(appConfig.backendEnabled && session) ? (
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
                              Du bruker Depoet som anonym gjest. Alt du har bygget – språkbanken, målene, det du har øvd på – ligger lagret lokalt i denne nettleseren og sendes ikke til oss. Merk at det forsvinner hvis du tømmer nettleserdataene dine.
                            </p>
                          </div>
                        </div>

                        {/* UPGRADE FORM / Send Magic Link – ekte flow når backend er konfigurert */}
                        {!appConfig.backendEnabled ? (
                          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xl">
                            <p className="text-xxs text-stone-600 leading-relaxed font-serif">
                              <strong>Konto er ikke koblet til i dette bygget.</strong> {LOCAL_BUILD_STATUS}
                            </p>
                          </div>
                        ) : !linkSent ? (
                          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-xl space-y-3">
                            <p className="text-xxs text-stone-600 leading-relaxed font-serif">
                              <strong>Ta vare på verktøykassa di.</strong> Skriv inn e-posten din, så sender vi en engangskode og en sikker lenke – ingen passord. Strukturert synk skjer først etter aktivt samtykke. Fritekst er lokal som standard og krever et eget, aktivt samtykke før eventuell synk.
                            </p>
                            <div className="space-y-2 rounded-xl border border-stone-200 bg-stone-55 p-3">
                              <label className="flex items-start gap-2 text-xxs text-stone-700 leading-relaxed font-serif cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={syncConsentChecked}
                                  onChange={(e) => setSyncConsentChecked(e.target.checked)}
                                  className="mt-0.5 accent-pine-700"
                                />
                                <span>Jeg samtykker til at Depoet kan lagre profil, lagrede kort, mål, kursfremgang og innstillinger på server for å synke mellom enheter.</span>
                              </label>
                              <p className="text-xxs text-stone-600 leading-relaxed font-serif">
                                Refleksjoner, søndagsnotater og annen fritekst blir lokalt i dagens løsning. Eventuell fritekstsynk krever et eget, aktivt samtykke.
                              </p>
                            </div>
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
                                    className="w-full pl-9 pr-3 py-2.5 bg-stone-55 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-500 text-xs text-stone-850 font-serif"
                                  />
                                </div>
                                <button
                                  type="button"
                                  disabled={isSendingLink || !userEmail || !syncConsentChecked}
                                  onClick={handleRequestMagicLink}
                                  className="px-4 py-2 bg-pine-600 hover:bg-pine-700 disabled:bg-stone-300 text-white rounded-xl text-xxs font-semibold transition-all cursor-pointer shrink-0 h-[42px] flex items-center justify-center text-stone-100"
                                >
                                  {isSendingLink ? 'Sender...' : 'Send kode og lenke'}
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
                              <span className="font-bold text-green-950 text-xs">Kode og sikker lenke er sendt</span>
                            </div>
                            <p className="text-[11px] text-green-850 leading-relaxed font-serif">
                              Vi sendte meldingen til <strong>{otpEmail}</strong>. Skriv inn engangskoden under, eller bruk den sikre lenken i e-posten. Bruk bare én av dem.
                            </p>
                            <form
                              className="space-y-1.5"
                              onSubmit={(event) => {
                                event.preventDefault();
                                void handleVerifyEmailOtp();
                              }}
                            >
                              <label htmlFor="otp-code" className="block text-[11px] font-semibold text-green-950">
                                Engangskode
                              </label>
                              <div className="flex flex-col gap-2 sm:flex-row">
                                <input
                                  id="otp-code"
                                  type="text"
                                  inputMode="numeric"
                                  autoComplete="one-time-code"
                                  pattern="[0-9]*"
                                  maxLength={6}
                                  value={otpCode}
                                  onChange={(event) => {
                                    setOtpCode(normalizeEmailOtpInput(event.target.value));
                                    setOtpError('');
                                  }}
                                  aria-invalid={Boolean(otpError)}
                                  aria-describedby={otpError ? 'otp-code-error' : 'otp-code-help'}
                                  placeholder="000000"
                                  className="min-w-0 flex-1 rounded-xl border border-green-250 bg-white px-4 py-2.5 text-center font-mono text-lg tracking-[0.35em] text-stone-900 focus:border-green-700 focus:outline-none"
                                />
                                <button
                                  type="submit"
                                  disabled={isVerifyingCode || !isEmailOtpCode(otpCode)}
                                  className="h-[46px] shrink-0 rounded-xl bg-pine-600 px-4 py-2 text-xxs font-semibold text-white transition-all hover:bg-pine-700 disabled:bg-stone-300"
                                >
                                  {isVerifyingCode ? 'Kontrollerer...' : 'Logg inn med kode'}
                                </button>
                              </div>
                              <p id="otp-code-help" className="text-[10px] text-green-850">
                                Koden består av seks sifre.
                              </p>
                              {otpError && (
                                <p id="otp-code-error" role="alert" className="text-[11px] text-red-700">
                                  {otpError}
                                </p>
                              )}
                            </form>
                            <div className="flex flex-col gap-1.5 border-t border-green-250 pt-3 text-[10px] text-green-850 sm:flex-row sm:items-center sm:justify-between">
                              <span>Vil du heller bruke lenken? Åpne den sikre lenken i samme e-post.</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setLinkSent(false);
                                  setOtpCode('');
                                  setOtpError('');
                                  setSyncMessage('');
                                }}
                                className="text-left font-semibold text-green-950 underline underline-offset-2 sm:text-right"
                              >
                                Bruk en annen e-postadresse
                              </button>
                            </div>
                            {syncMessage && <p className="text-[10px] text-green-800 font-serif">{syncMessage}</p>}
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
                                Innlogget · koblet til {session?.user.email || user?.email}
                              </span>
                            </div>
                            <p className="text-xxs text-green-800 leading-relaxed font-serif">
                              Strukturert synkronisering er tilgjengelig. Fritekst er lokal som standard og synkroniseres bare etter et eget, aktivt samtykke.
                            </p>
                            <p className="text-[10px] text-green-900/80 font-semibold">
                              Sync-status: {syncStatus === 'syncing' ? 'synker' : syncStatus === 'synced' ? 'synket' : syncStatus === 'error' ? 'feil' : 'klar'}
                              {' · fritekst beholdes lokalt'}
                            </p>
                            {syncMessage && (
                              <p className="text-[10px] text-green-900/80 font-serif">{syncMessage}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2">
                          {accountState?.state === 'locked' ? (
                            <button
                              type="button"
                              onClick={handleCancelAccountDeletion}
                              className="px-3 py-2 bg-pine-600 hover:bg-pine-700 text-white rounded-lg text-xxs font-semibold transition-all cursor-pointer"
                            >
                              Kanseller sletteforespørselen
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleRunSync}
                              disabled={syncStatus === 'syncing'}
                              className="px-3 py-2 bg-pine-600 hover:bg-pine-700 disabled:bg-stone-300 text-white rounded-lg text-xxs font-semibold transition-all cursor-pointer"
                            >
                              {syncStatus === 'syncing' ? 'Synker...' : 'Forhåndsvis og synk'}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Er du sikker på at du vil logge ut? Dataene dine blir værende lokalt på denne nettleseren.')) {
                                handleSignOut();
                              }
                            }}
                            className="text-stone-500 hover:text-stone-800 hover:underline text-xxs font-medium cursor-pointer"
                          >
                            Logg ut ({session?.user.email || user?.email})
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
                          {appConfig.emailEnabled
                            ? 'E-postflyten er aktivert i dette bygget, men bare for valg du selv skrur på.'
                            : REMINDER_STATUS}
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
                            <div className="w-8 h-4 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-55 after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pine-600" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-semibold text-stone-800 group-hover:text-stone-950 flex items-center gap-1.5 text-xs">
                              <span>{appConfig.emailEnabled ? 'Send meg en daglig e-post' : 'Lagre ønsket om daglig e-post lokalt'}</span>
                              <Mail className="w-3.5 h-3.5 text-stone-400 font-normal" />
                            </span>
                            <p className="text-xxs text-stone-500 leading-relaxed font-serif">
                              {appConfig.emailEnabled
                                ? 'Dagens pusterom og ett språkkort, hver morgen. En liten påminnelse, ikke en oppgave.'
                                : 'Ingen e-post sendes nå. Dette lagrer bare ønsket ditt lokalt.'}
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
                            <div className="w-8 h-4 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-55 after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pine-600" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-semibold text-stone-800 group-hover:text-stone-950 flex items-center gap-1.5 text-xs">
                              <span>Lagre ønsket om daglig SMS lokalt</span>
                              <Smartphone className="w-3.5 h-3.5 text-stone-400 font-normal" />
                            </span>
                            <p className="text-xxs text-stone-500 leading-relaxed font-serif">
                              SMS er ikke aktivert i v1. Valget lagres lokalt for senere vurdering.
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
                            <div className="w-8 h-4 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-55 after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pine-600" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-semibold text-stone-800 group-hover:text-stone-950 text-xs">
                              {appConfig.emailEnabled ? 'Send meg en søndagspuff' : 'Lagre ønsket om søndagspuff lokalt'}
                            </span>
                            <p className="text-xxs text-stone-500 leading-relaxed font-serif">
                              {appConfig.emailEnabled
                                ? 'En liten påminnelse om Søndagsverkstedet. Ti minutter, ingen fasit.'
                                : 'Ingen melding sendes nå. Dette lagrer bare ønsket ditt lokalt.'}
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
                            <div className="w-8 h-4 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-55 after:border-stone-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pine-600" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-semibold text-stone-800 group-hover:text-stone-950 text-xs">
                              {appConfig.emailEnabled ? 'Send meg en velkommen-tilbake-puff' : 'Lagre ønsket om velkommen-tilbake lokalt'}
                            </span>
                            <p className="text-xxs text-stone-500 leading-relaxed font-serif">
                              {appConfig.emailEnabled
                                ? 'Hvis du har vært borte noen dager, sender vi én mild melding. Aldri en påminnelse om hvor lenge. Standard trigger: 4 dager.'
                                : 'Ingen melding sendes nå. Dette lagrer bare ønsket ditt lokalt.'}
                            </p>
                          </div>
                        </label>

                      </div>

                      {/* SAMTYKKE CARD (vises ved opt-in) */}
                      {(optEmail || optSms || optPuff || optReturn) && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 bg-moss text-cream rounded-xl space-y-2 leading-relaxed"
                        >
                          <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-cream-soft shrink-0" />
                            <span>DEPOETS SAMTYKKEGARANTI (Opt-in)</span>
                          </p>
                          <p className="text-xxs font-serif text-stone-200 leading-relaxed">
                            Når du slår på en avtale, gjelder den bare den typen melding du har valgt – aldri oftere enn det. Du kan skru av hver enkelt når som helst. Vi teller aldri fravær, og vi sender aldri noe som får deg til å føle at du ligger etter.
                          </p>
                          <p className="text-xxs font-serif text-stone-400 leading-relaxed border-t border-stone-800 pt-2">
                            {appConfig.emailEnabled
                              ? 'Når e-postflyten er aktiv, lagres samtykket for valgene du selv skrur på. Du kan trekke samtykket tilbake når som helst.'
                              : 'Dette er et lokal-først bygg: meldinger sendes ikke, og valgene dine lagres foreløpig kun lokalt i nettleseren din.'}
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
                              : 'bg-stone-55 border-stone-200 text-stone-600 hover:border-stone-400'
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
                              : 'bg-stone-55 border-stone-200 text-stone-600 hover:border-stone-400'
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
                              : 'bg-stone-55 border-stone-200 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          Ubestemt tid
                        </button>
                      </div>
                      
                      {pauseOption && (
                        <p className="text-[10px] text-amber-800 italic font-serif flex items-center gap-1">
                          <span>{appConfig.emailEnabled ? 'Påminnelser deaktiveres inntil du trykker "Avslutt pause" eller til tidsperioden utløper.' : 'Pausen lagres lokalt. Ingen påminnelser sendes i dette bygget.'}</span>
                        </p>
                      )}
                    </div>

                    {isDev && (
                      <>
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
                              : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
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
                              : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
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
                              : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
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
                              : 'border-transparent text-stone-500 hover:text-stone-700 dark:text-stone-600 dark:hover:text-stone-800'
                          }`}
                        >
                          Returpuff
                        </button>
                      </div>

                      {/* Variant control panel (testverktøy – kun i utviklingsmodus) */}
                      {isDev && (
                      <div className="bg-stone-55 border border-stone-200/80 rounded-xl p-3.5 space-y-3 shadow-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-700 tracking-wider uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
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
                              className="bg-moss hover:bg-[#2c3327] text-white font-sans text-[10px] font-bold py-1.5 px-3 rounded-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-xxs"
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
                            <span className="text-green-700 font-semibold">● Substitusjonssjekk: Godkjent</span>
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
                                    <span className="border border-stone-300 bg-stone-55 px-2 py-0.5 rounded text-[8px] text-stone-600 font-medium whitespace-nowrap">Skru av daglig e-post</span>
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
                                <div className="bg-stone-55 border border-stone-200 text-stone-850 p-3 rounded-2xl shadow-xxs rounded-tl-sm max-w-[85%] font-serif text-xxs leading-snug">
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
                                  <p className="text-[9.5px] bg-stone-55 p-2 border border-stone-150 rounded text-stone-700 font-serif">
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
                                  <p className="text-[9.5px] bg-stone-55 p-2 border border-stone-150 rounded text-stone-700 font-serif">
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
                      </>
                    )}

                    {/* 4. DINE DATA – innsyn, eksport og sletting (GDPR art. 15/17/20 på lokalt nivaa) */}
                    <div className="space-y-3 pt-2">
                      <div className="space-y-1">
                        <h4 className="font-bold text-stone-900 text-[10px] uppercase tracking-wider border-b border-stone-100 pb-1">
                          4. Dine data
                        </h4>
                        <p className="text-xxs text-stone-500 leading-relaxed font-serif">
                          Fritekst og lokale innstillinger ligger på denne enheten. Er du innlogget, kan eksporten også
                          hente den strukturerte kontokopien. Kontosletting har en syvdagers angrefrist.
                        </p>
                      </div>

                      {/* Lagret e-postadresse: synlig og mulig å fjerne enkeltvis */}
                      {user?.email && (
                        <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <p className="text-xxs font-semibold text-stone-800">E-post lagret: {user.email}</p>
                            <p className="text-[10px] text-stone-500 leading-relaxed">
                              {session
                                ? 'Brukes til passordfri innlogging. Eventuelle påminnelser krever et eget valg'
                                : appConfig.emailEnabled
                                  ? 'Lagres for meldingene du har skrudd på'
                                  : 'Kun lagret her lokalt'}
                              {user.emailConsent ? ` · samtykke gitt ${new Date(user.emailConsent.acceptedAt).toLocaleDateString('no-NO')}` : ''}
                              {session || appConfig.emailEnabled ? '.' : '. Ingen påminnelses-e-post er sendt.'}
                            </p>
                          </div>
                          <button
                            id="remove-stored-email-btn"
                            type="button"
                            onClick={() => {
                              updateUserSettings({
                                email: undefined,
                                emailConsent: null,
                                optIns: { dailyEmail: false, dailySms: false, weeklyPuff: false, returnOptIn: false }
                              });
                              setOptEmail(false);
                              setOptSms(false);
                              setOptPuff(false);
                              setOptReturn(false);
                              setUserEmail('');
                            }}
                            className="text-xxs font-semibold text-stone-600 hover:text-red-700 underline underline-offset-2 cursor-pointer shrink-0 text-left sm:text-right"
                          >
                            Fjern e-posten og trekk samtykket
                          </button>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          id="export-my-data-btn"
                          type="button"
                          onClick={handleExportData}
                          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-55 border border-stone-250 hover:border-stone-450 rounded-xl text-xxs font-semibold text-stone-700 transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{exportDone ? 'Lastet ned!' : 'Last ned mine data (JSON)'}</span>
                        </button>
                        <button
                          id="delete-all-data-btn"
                          type="button"
                          onClick={handleDeleteAllData}
                          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-55 border border-stone-250 hover:border-red-300 rounded-xl text-xxs font-semibold text-stone-700 hover:text-red-700 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{session ? 'Be om kontosletting (7 dager)' : 'Slett alt jeg har lagret her'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowPrivacy(true)}
                        className="text-[11px] text-stone-500 underline underline-offset-2 hover:text-stone-800 cursor-pointer"
                      >
                        Les personvernerklæringen
                      </button>
                    </div>

                    {/* Saving actions */}
                    <div className="pt-4 border-t border-stone-150 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 italic font-serif">
                        {appConfig.backendEnabled ? 'Lokal-først, med konto og strukturert synk etter aktivt samtykke.' : LOCAL_BUILD_STATUS}
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
