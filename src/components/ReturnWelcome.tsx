/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { Heart, Sparkles, Calendar, HelpCircle, X } from 'lucide-react';
import { motion } from 'motion/react';

export const ReturnWelcome: React.FC = () => {
  const { showReturnWelcome, setShowReturnWelcome, setActiveTab, user } = useAppState();

  if (!showReturnWelcome) return null;

  const handleRoute = (tab: 'today' | 'nowWhat' | 'sunday') => {
    setActiveTab(tab);
    setShowReturnWelcome(false);
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white max-w-lg w-full rounded-2xl border border-stone-200 shadow-xl overflow-hidden relative"
      >
        {/* Subtle close button */}
        <button
          id="close-return-welcome-btn"
          onClick={() => setShowReturnWelcome(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-50 transition-all"
          aria-label="Lukk"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 md:p-10 space-y-6">
          <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-700">
            <Heart className="w-6 h-6" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="return-welcome-header">
              Velkommen tilbake, {user?.name || 'Forelder'}.
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Du har ikke gått glipp av noe. Du har ikke mistet noen streaks, og du skal ikke ta igjen noe som helst. Livet skjer, og i Depoet starter vi alltids nøyaktig herfra i dag.
            </p>
          </div>

          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-100">
            <p className="text-xs tracking-wider text-stone-400 uppercase mb-3">Velg hvor du vil starte i dag</p>
            <div className="space-y-2">
              <button
                id="return-route-today"
                onClick={() => handleRoute('today')}
                className="w-full text-left bg-white border border-stone-200/80 hover:border-stone-400 p-3.5 rounded-lg flex items-center gap-3 transition-all text-stone-800 hover:bg-stone-50 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-stone-700" />
                <div className="text-left">
                  <p className="text-sm font-medium">Gå til I dag</p>
                  <p className="text-xs text-stone-500">Se dagens enkle pusterom og mikrohandling</p>
                </div>
              </button>

              <button
                id="return-route-sunday"
                onClick={() => handleRoute('sunday')}
                className="w-full text-left bg-white border border-stone-200/80 hover:border-stone-400 p-3.5 rounded-lg flex items-center gap-3 transition-all text-stone-800 hover:bg-stone-50 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-stone-700" />
                <div className="text-left">
                  <p className="text-sm font-medium">Søndagsverkstedet</p>
                  <p className="text-xs text-stone-500">Vurder uka i fred og velg et nytt bittelite mål</p>
                </div>
              </button>

              <button
                id="return-route-now"
                onClick={() => handleRoute('nowWhat')}
                className="w-full text-left bg-white border border-stone-200/80 hover:border-stone-400 p-3.5 rounded-lg flex items-center gap-3 transition-all text-stone-800 hover:bg-stone-50 shadow-sm"
              >
                <HelpCircle className="w-4 h-4 text-stone-700" />
                <div className="text-left">
                  <p className="text-sm font-medium">Finn hjelp i Hva gjør jeg nå?</p>
                  <p className="text-xs text-stone-500">Om du står i en aktiv kamp eller slitasje akkurat nå</p>
                </div>
              </button>
            </div>
          </div>
          
          <div className="text-center pt-2">
            <button
              id="return-dismiss-only"
              onClick={() => setShowReturnWelcome(false)}
              className="text-stone-400 hover:text-stone-600 text-xs uppercase tracking-wider transition-colors"
            >
              Bare lukk og gå til rullende side
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
