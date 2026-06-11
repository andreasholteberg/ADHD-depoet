import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SundayWorkshop, UserOnboarding, ParentEnergyLevel, DailyCheckIn } from '../types';
import { todayIsoDate } from '../lib/parentState';

/** JSON.parse som aldri krasjer appen ved korrupt localStorage. */
function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export type AppTab = 'today' | 'nowWhat' | 'sunday' | 'courses' | 'languageBank' | 'myDepot';

interface AppStateContextType {
  user: User | null;
  sundayReports: SundayWorkshop[];
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  showReturnWelcome: boolean;
  setShowReturnWelcome: (show: boolean) => void;
  saveOnboarding: (name: string, answers: UserOnboarding) => void;
  toggleFavoriteLanguage: (cardId: string) => void;
  toggleCompletedModule: (moduleId: string, exportedData?: any) => void;
  saveSundayWorkshop: (report: Omit<SundayWorkshop, 'id' | 'date'>) => void;
  updateWeeklyGoal: (goal: string | null) => void;
  updateUserSettings: (settings: Partial<User>) => void;
  updateDailyCheckIn: (data: { state?: ParentEnergyLevel; completedStatus?: 'provd' | 'kom-ikke' | null }) => void;
  resetAllData: () => void;
  simulateAbsence: (days: number) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'parent-prod-' + Math.floor(Math.random() * 100000),
  name: 'Forelder',
  onboardingAnswers: null,
  selectedWeeklyGoal: 'Jeg sier én setning roligere enn kroppen min har lyst til.',
  currentFocus: 'Skjerm',
  savedCards: [],
  completedModules: [],
  lastActiveAt: new Date().toISOString(),
  wantsDailyReminder: true,
  isAnonymous: true,
  optIns: {
    dailyEmail: false,
    dailySms: false,
    weeklyPuff: false,
    returnOptIn: false
  }
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sundayReports, setSundayReports] = useState<SundayWorkshop[]>([]);
  const [activeTab, setActiveTab] = useState<AppTab>('today');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [showReturnWelcome, setShowReturnWelcome] = useState<boolean>(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const parsedUser = safeParse<User>(localStorage.getItem('depoet_user'));
    const parsedReports = safeParse<SundayWorkshop[]>(localStorage.getItem('depoet_sunday_reports'));

    if (parsedUser) {
      setShowOnboarding(!parsedUser.onboardingAnswers);

      // 1) Les forrige lastActiveAt FØR vi overskriver den,
      // 2) beregn fravær, 3) trigg returvelkomst hvis relevant,
      // 4) oppdater lastActiveAt til nå (et besøk teller som aktivitet).
      const lastActive = new Date(parsedUser.lastActiveAt).getTime();
      const now = Date.now();
      const fourDays = 4 * 24 * 60 * 60 * 1000;
      if (!Number.isNaN(lastActive) && now - lastActive > fourDays && parsedUser.onboardingAnswers) {
        setShowReturnWelcome(true);
      }

      const visitedUser = { ...parsedUser, lastActiveAt: new Date().toISOString() };
      setUser(visitedUser);
      localStorage.setItem('depoet_user', JSON.stringify(visitedUser));
    } else {
      // First time use (eller korrupt lagring): Load defaults but trigger onboarding
      setUser(DEFAULT_USER);
      setShowOnboarding(true);
    }

    if (parsedReports) {
      setSundayReports(parsedReports);
    }
  }, []);

  // Sync to local storage on changes
  const saveUserAndSync = (updatedUser: User) => {
    const updated = {
      ...updatedUser,
      lastActiveAt: new Date().toISOString(),
    };
    setUser(updated);
    localStorage.setItem('depoet_user', JSON.stringify(updated));
  };

  const saveOnboarding = (name: string, answers: UserOnboarding) => {
    if (!user) return;
    const updated: User = {
      ...user,
      name,
      onboardingAnswers: answers,
      wantsDailyReminder: answers.wantsReminder,
      selectedWeeklyGoal: answers.heaviestNow === 'Skjerm' 
        ? 'Jeg går inn to minutter før skjermen skal av.'
        : answers.heaviestNow === 'Min egen reaksjon'
        ? 'Jeg legger merke til mitt første alarmtegn.'
        : 'Jeg sier én setning roligere enn kroppen min har lyst til.',
      currentFocus: answers.heaviestNow,
      isAnonymous: true, // Default to anonymous session on onboarding complete
      optIns: user.optIns || {
        dailyEmail: false,
        dailySms: false,
        weeklyPuff: false,
        returnOptIn: false
      }
    };
    saveUserAndSync(updated);
    setShowOnboarding(false);
    
    // Route them to what they said they want to start with
    if (answers.startingPage === 'today') setActiveTab('today');
    else if (answers.startingPage === 'nowWhat') setActiveTab('nowWhat');
    else if (answers.startingPage === 'sunday') setActiveTab('sunday');
    else if (answers.startingPage === 'courses') setActiveTab('courses');
  };

  const toggleFavoriteLanguage = (cardId: string) => {
    if (!user) return;
    const saved = [...user.savedCards];
    const index = saved.indexOf(cardId);
    if (index >= 0) {
      saved.splice(index, 1);
    } else {
      saved.push(cardId);
    }
    saveUserAndSync({ ...user, savedCards: saved });
  };

  const updateWeeklyGoal = (goal: string | null) => {
    if (!user) return;
    saveUserAndSync({ ...user, selectedWeeklyGoal: goal });
  };

  const updateUserSettings = (settings: Partial<User>) => {
    if (!user) return;
    
    // Deep merge optIns if provided
    let mergedOptIns = user.optIns;
    if (settings.optIns) {
      mergedOptIns = {
        ...(user.optIns || { dailyEmail: false, dailySms: false, weeklyPuff: true, returnOptIn: true }),
        ...settings.optIns
      };
    }

    // NB: Vi flipper IKKE isAnonymous automatisk ved e-post lenger.
    // Synkronisert status settes kun eksplisitt (simulert innlogging i dev),
    // slik at vi aldri viser "Synkronisert" uten reell backend.
    const updated: User = {
      ...user,
      ...settings,
      optIns: mergedOptIns
    };
    saveUserAndSync(updated);
  };

  /**
   * Lagrer dagens innsjekk (kapasitetsnivå og/eller oppfølgingsstatus) på brukeren,
   * slik at den overlever fanebytte/reload og kan styre mildere formuleringer.
   */
  const updateDailyCheckIn = (data: { state?: ParentEnergyLevel; completedStatus?: 'provd' | 'kom-ikke' | null }) => {
    if (!user) return;
    const today = todayIsoDate();
    const existing: DailyCheckIn | null =
      user.lastCheckIn && user.lastCheckIn.date === today ? user.lastCheckIn : null;

    const updatedCheckIn: DailyCheckIn = {
      date: today,
      state: data.state ?? existing?.state ?? null,
      completedStatus:
        data.completedStatus !== undefined ? data.completedStatus : existing?.completedStatus ?? null,
    };
    saveUserAndSync({ ...user, lastCheckIn: updatedCheckIn });
  };

  const toggleCompletedModule = (moduleId: string, exportedData?: any) => {
    if (!user) return;
    const completed = [...user.completedModules];
    const index = completed.indexOf(moduleId);
    
    let updatedSavedCards = [...user.savedCards];
    let updatedGoal = user.selectedWeeklyGoal;
    let updatedFocus = user.currentFocus;

    if (index >= 0) {
      completed.splice(index, 1);
    } else {
      completed.push(moduleId);
      // If we completed a module and have exported items (Depot-eksport), merge them in!
      if (exportedData) {
        if (exportedData.languageCards && exportedData.languageCards.length > 0) {
          exportedData.languageCards.forEach((cardId: string) => {
            if (!updatedSavedCards.includes(cardId)) {
              updatedSavedCards.push(cardId);
            }
          });
        }
        if (exportedData.weeklyGoal) {
          updatedGoal = exportedData.weeklyGoal;
        }
      }
    }

    saveUserAndSync({
      ...user,
      completedModules: completed,
      savedCards: updatedSavedCards,
      selectedWeeklyGoal: updatedGoal,
      currentFocus: updatedFocus
    });
  };

  const saveSundayWorkshop = (report: Omit<SundayWorkshop, 'id' | 'date'>) => {
    const newReport: SundayWorkshop = {
      ...report,
      id: 'report-' + Date.now(),
      date: new Date().toISOString(),
    };

    const updatedReports = [newReport, ...sundayReports];
    setSundayReports(updatedReports);
    localStorage.setItem('depoet_sunday_reports', JSON.stringify(updatedReports));

    // Sunday workshop answers affect current App State!
    if (user) {
      saveUserAndSync({
        ...user,
        selectedWeeklyGoal: report.nextGoal,
        currentFocus: report.supportNeeded,
      });
    }
  };

  const resetAllData = () => {
    localStorage.removeItem('depoet_user');
    localStorage.removeItem('depoet_sunday_reports');
    localStorage.removeItem('depoet_reflections');
    localStorage.removeItem('depoet_seen_prompts');
    setUser(DEFAULT_USER);
    setSundayReports([]);
    setShowOnboarding(true);
    setShowReturnWelcome(false);
    setActiveTab('today');
  };

  // Utility to test the returning user experience
  const simulateAbsence = (days: number) => {
    if (!user) return;
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - days);
    const updated = {
      ...user,
      lastActiveAt: pastDate.toISOString(),
    };
    setUser(updated);
    localStorage.setItem('depoet_user', JSON.stringify(updated));
    if (days >= 4) {
      setShowReturnWelcome(true);
    } else {
      setShowReturnWelcome(false);
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        user,
        sundayReports,
        activeTab,
        setActiveTab,
        showOnboarding,
        setShowOnboarding,
        showReturnWelcome,
        setShowReturnWelcome,
        saveOnboarding,
        toggleFavoriteLanguage,
        toggleCompletedModule,
        saveSundayWorkshop,
        updateWeeklyGoal,
        updateUserSettings,
        updateDailyCheckIn,
        resetAllData,
        simulateAbsence,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppAppStateProvider');
  }
  return context;
};
