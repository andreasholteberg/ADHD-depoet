import React from 'react';
import { SITUATIONS } from '../data/situations';
import { X, Volume2, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DemoAcuteCardProps {
  onClose: () => void;
  onTryApp: () => void;
}

/**
 * Demo-visning av ett akuttkort fra landingssiden – uten onboarding, uten lagring.
 * Gjenbruker eksisterende situasjonsdata og samme kortstruktur som "Hva gjør jeg nå?".
 * Lavmælt merket som forhåndsvisning. Ingenting skrives til localStorage herfra.
 */
export const DemoAcuteCard: React.FC<DemoAcuteCardProps> = ({ onClose, onTryApp }) => {
  const card = SITUATIONS.find((s) => s.id === 'skjerm-av');
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" id="demo-acute-overlay">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-stone-50 max-w-lg w-full rounded-2xl border border-stone-200 shadow-xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Topp: lavmælt demo-merking + lukk */}
        <div className="flex justify-between items-center px-5 py-3 bg-white border-b border-stone-200">
          <span className="text-xxs text-stone-500">Forhåndsvisning · ingenting lagres her</span>
          <button
            id="demo-close-btn"
            onClick={onClose}
            aria-label="Lukk forhåndsvisning"
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Innhold: selve kortet, samme struktur som i akuttlaget */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="space-y-1">
            <span className="text-xxs bg-stone-100 px-2 py-0.5 rounded text-stone-500 uppercase tracking-widest">{card.category}</span>
            <h3 className="text-xl font-serif text-stone-900 tracking-tight" id="demo-situation-title">{card.situation}</h3>
            <p className="text-xxs text-stone-500 leading-relaxed">
              Slik ser et kort i akuttlaget «Hva gjør jeg nå?» ut – støtte for de harde minuttene.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/65 rounded-xl p-4 space-y-1.5">
            <span className="text-xxs text-amber-850 uppercase tracking-wider block font-bold">1. Først: senk tempoet</span>
            <p className="text-sm font-serif text-stone-850 leading-relaxed font-semibold">"{card.firstStep}"</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5">
            <span className="text-xxs text-stone-400 uppercase tracking-wider block">2. Hva kan være under panseret?</span>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">{card.underTheHood}</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5">
            <span className="text-xxs text-stone-700 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-stone-700" />
              <span>3. Én ting du kan gjøre nå</span>
            </span>
            <p className="text-xs text-stone-750 font-medium leading-relaxed font-serif">{card.immediateAction}</p>
          </div>

          <div className="bg-stone-900 text-stone-100 rounded-xl p-4 space-y-2">
            <span className="text-xxs text-stone-400 uppercase tracking-wider font-bold flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-stone-400" />
              <span>4. Én setning du kan si</span>
            </span>
            <p className="text-sm font-serif italic text-stone-100 leading-relaxed pl-3 border-l-2 border-stone-500">
              "{card.sentenceToSay}"
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5">
            <span className="text-xxs text-stone-400 uppercase tracking-wider block">5. Etterpå: hvis det glapp</span>
            <p className="text-xs text-stone-600 leading-relaxed italic font-serif">{card.repairAfterward}</p>
          </div>
        </div>

        {/* Bunn: ærlig vei videre */}
        <div className="px-5 py-4 bg-white border-t border-stone-200 space-y-3">
          <p className="text-xxs text-stone-500 leading-relaxed">
            Dette er ett av mange kort. I appen finner du flere situasjoner, et daglig pusterom og en språkbank du kan bygge selv. Ingen konto – bare noen få spørsmål så Depoet treffer litt bedre.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              id="demo-dismiss-btn"
              onClick={onClose}
              className="px-4 py-2 border border-stone-250 hover:border-stone-450 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-all cursor-pointer"
            >
              Lukk
            </button>
            <button
              id="demo-try-app-btn"
              onClick={onTryApp}
              className="px-5 py-2 bg-pine-600 hover:bg-pine-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Utforsk hele Depoet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
