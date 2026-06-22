import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { SITUATIONS } from '../data/situations';
import { AlertTriangle, ChevronRight, Volume2, Shield, Heart, Zap, Search, CornerDownRight, ArrowLeft, ShieldAlert, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export const NowWhatView: React.FC = () => {
  const { user } = useAppState();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Alle');

  // Filter situations based on category pill & search term (including situationTags array query matching)
  const filteredSituations = SITUATIONS.filter(item => {
    const matchesSearch = 
      item.situation.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.situationTags && item.situationTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = activeCategory === 'Alle' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedSituation = SITUATIONS.find(item => item.id === selectedId);

  const categories = ['Alle', 'Ungdom', 'Skjerm', 'Morgenstress', 'Legging', 'Overganger', 'Barnet eksploderer', 'Egen regulering', 'Skole', 'Søsken'];

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {selectedSituation ? (
        /* Expanded acute cards view */
        <motion.div 
          initial={{ opacity: 0, y: 5 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 animate-fadeIn"
        >
          {/* Back button */}
          <button
            id="now-what-back-btn"
            onClick={() => setSelectedId(null)}
            className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-stone-850 transition-colors py-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tilbake til oversikten</span>
          </button>

          {/* Heading */}
          <div className="space-y-1">
            <span className="text-xxs bg-stone-100 px-2 py-0.5 rounded text-stone-500 uppercase tracking-widest">{selectedSituation.category}</span>
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="active-situation-title">
              {selectedSituation.situation}
            </h2>
          </div>

          {/* Structured Card Grid */}
          <div className="space-y-4">
            
            {/* 1. Først: senk tempoet (Amber/slowness callout) */}
            <div className="bg-amber-50/70 border border-amber-200/65 rounded-xl p-5 space-y-2">
              <span className="text-xxs text-amber-850 uppercase tracking-wider block font-bold">1. Først: senk tempoet</span>
              <p className="text-sm font-serif text-stone-850 leading-relaxed font-semibold">
                "{selectedSituation.firstStep}"
              </p>
            </div>

            {/* EMERGENCY CONTACT CONTAINER (Vises kun på mest sårbare ungdoms-situasjoner) */}
            {selectedSituation.contactEmergency && (
              <motion.div 
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 p-4.5 rounded-xl space-y-3 text-stone-900 border-l-4 border-l-red-600 shadow-xxs"
                id="emergency-contact-box"
              >
                <div className="flex gap-2 items-center text-red-950 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
                  <span>Viktig: Profesjonell støtte og akutt hjelp</span>
                </div>
                <p className="text-xxs text-stone-755 leading-relaxed font-serif">
                  Disse situasjonene er svært krevende og kan være uttrykk for dypere akutt sårbarhet eller umiddelbar risiko for deg og tenåringen. Det er ingen skam å koble på eksterne ressurser. Her er pålitelige, døgnåpne krisetjenester som kan kontaktes helt anonymt:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xxs pt-1">
                  <div className="bg-white/80 p-2.5 rounded border border-red-100/60 shadow-xxs">
                    <span className="font-semibold text-red-950 block mb-0.5">📞 Alarmtelefonen for barn/unge:</span>
                    <a href="tel:116111" className="text-xs font-bold text-red-700 underline flex items-center gap-1 mt-0.5 hover:text-red-900">
                      <PhoneCall className="w-3 h-3 text-red-600" />
                      <span>116 111</span>
                    </a>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded border border-red-100/60 shadow-xxs">
                    <span className="font-semibold text-red-950 block mb-0.5">💭 Mental Helse Hjelpetelefon:</span>
                    <a href="tel:116123" className="text-xs font-bold text-red-700 underline flex items-center gap-1 mt-0.5 hover:text-red-900">
                      <PhoneCall className="w-3 h-3 text-red-600" />
                      <span>116 123</span>
                    </a>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded border border-red-100/60 shadow-xxs">
                    <span className="font-semibold text-red-950 block mb-0.5">🏥 Legevakt (Nasjonalt tlf):</span>
                    <a href="tel:116117" className="text-xs font-bold text-red-700 underline flex items-center gap-1 mt-0.5 hover:text-red-900">
                      <PhoneCall className="w-3 h-3 text-red-600" />
                      <span>116 117</span>
                    </a>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded border border-red-100/60 shadow-xxs">
                    <span className="font-semibold text-red-955 block mb-0.5">👮 Politiet (Akutt nød):</span>
                    <a href="tel:112" className="text-xs font-bold text-red-700 underline flex items-center gap-1 mt-0.5 hover:text-red-900">
                      <PhoneCall className="w-3 h-3 text-red-600" />
                      <span>112</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. Hva kan være under panseret? */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 shadow-sm">
              <span className="text-xxs text-stone-400 uppercase tracking-wider block">2. Hva kan være under panseret?</span>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                {selectedSituation.underTheHood}
              </p>
            </div>

            {/* 3. Én ting du kan gjøre nå */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 shadow-sm">
              <span className="text-xxs text-stone-700 uppercase tracking-wider block font-semibold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-stone-700" />
                <span>3. Én ting du kan gjøre nå</span>
              </span>
              <p className="text-xs text-stone-750 font-medium leading-relaxed font-serif">
                {selectedSituation.immediateAction}
              </p>
            </div>

            {/* 4. Én setning du kan si */}
            <div className="bg-stone-900 text-stone-100 rounded-xl p-5 space-y-3 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-stone-800/40 rounded-bl-full pointer-events-none" />
              <span className="text-xxs text-stone-400 uppercase tracking-wider block relative z-10 font-bold flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                <span>4. Én setning du kan si</span>
              </span>
              <p className="text-base font-serif italic text-stone-100 relative z-10 leading-relaxed pl-4 border-l-2 border-stone-500">
                "{selectedSituation.sentenceToSay}"
              </p>
            </div>

            {/* 4b. Har du nesten ikke noe igjen? – lavkapasitets-fallback (bok: epilogens kortstokk) */}
            {selectedSituation.lowCapacityStep && (
              <div className="bg-green-50/60 border border-green-200/60 rounded-xl p-5 space-y-2">
                <span className="text-xxs text-green-700 uppercase tracking-wider block font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-green-700" />
                  <span>Har du nesten ikke noe igjen?</span>
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-serif">
                  {selectedSituation.lowCapacityStep}
                </p>
                <p className="text-[10px] text-stone-400 italic pt-0.5">Noen dager er dette alt du har – og det er nok.</p>
              </div>
            )}

            {/* 5. Etterpå: hvis det glapp */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 shadow-sm">
              <span className="text-xxs text-stone-400 uppercase tracking-wider block">5. Etterpå: hvis det glapp</span>
              <p className="text-xs text-stone-600 leading-relaxed italic font-serif">
                {selectedSituation.repairAfterward}
              </p>
            </div>

          </div>

          <div className="text-center pt-4">
            <button
              id="now-what-back-bottom"
              onClick={() => setSelectedId(null)}
              className="px-6 py-2.5 bg-pine-600 hover:bg-pine-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all shadow-sm"
            >
              Ferdig, returner til listen
            </button>
          </div>

        </motion.div>
      ) : (
        /* Overview Situations Picker board */
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="now-what-list-title">Hva gjør jeg nå?</h2>
            <p className="text-stone-500 text-xs">Akuttlaget for de harde minuttene</p>
          </div>

          <div className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-xl text-stone-850 text-xs leading-relaxed flex gap-3 shadow-xxs">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900">Trenger du hjelp akkurat nå?</span> Velg den situasjonen som brenner, og få umiddelbare ord og mikrohandlinger. Ingen lange analyser – bare milde bremser her og nå.
            </div>
          </div>

          {/* Search bar inside platform */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              id="acute-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Søk på f.eks 'skjerm', 'ropte', 'stjele', 'fyll', 'alkohol', 'selvskading'..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-500 shadow-xs transition-all font-serif"
            />
          </div>

          {/* Horizontal scrollable category filters */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 pr-10">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-pill-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xxs whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                  activeCategory === cat
                    ? 'bg-pine-600 border-pine-600 text-white font-medium'
                    : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600'
                }`}
              >
                {cat === 'Ungdom' ? '🧑‍🤝‍🧑 Ungdom (13-16)' : cat}
              </button>
            ))}
          </div>

          {/* List of cards */}
          <div className="grid grid-cols-1 gap-2.5">
            {filteredSituations.length > 0 ? (
              filteredSituations.map((item) => (
                <button
                  key={item.id}
                  id={`situation-select-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  className="w-full text-left bg-white hover:bg-stone-50 border border-stone-200/70 p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer shadow-xs group"
                >
                  <div className="space-y-1.5 pr-4">
                    <div className="flex gap-1.5 items-center">
                      <span className="text-[9px] uppercase tracking-widest bg-stone-100/80 text-stone-500 px-1.5 py-0.2 rounded">{item.category}</span>
                      {item.contactEmergency && (
                        <span className="text-[9px] font-bold text-red-700 bg-red-50 border border-red-100 px-1 rounded flex items-center gap-0.5">
                          ⚠️ Akuttstøtte tilgjengelig
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-stone-850 group-hover:text-stone-950 font-serif transition-colors leading-snug">
                      {item.situation}
                    </h3>
                    {item.situationTags && item.situationTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.situationTags.map(tag => (
                          <span key={tag} className="text-[9px] text-stone-400">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-1 rounded-full bg-stone-55 group-hover:bg-stone-100 transition-colors shrink-0">
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700" />
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-10 bg-white border border-stone-200 rounded-xl p-6">
                <p className="text-stone-400 text-xs">Fant ingen akutte situasjoner som passet søket ditt.</p>
                <button
                  id="reset-acute-filters-btn"
                  onClick={() => { setSearchTerm(''); setActiveCategory('Alle'); }}
                  className="text-stone-700 hover:text-stone-900 border-b border-stone-800 text-xs font-serif mt-2"
                >
                  Nullstill søk og filtre
                </button>
              </div>
            )}
          </div>

          {/* Hvor får jeg hjelp – norske ressurser (bok: Litteratur og videre lesning) */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2.5 mt-2">
            <div className="flex items-center gap-2 text-stone-700">
              <Heart className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-xxs uppercase tracking-widest font-semibold">Hvor får jeg hjelp utenfor appen?</span>
            </div>
            <p className="text-xxs text-stone-500 leading-relaxed">
              Depoet er støtte og kunnskap, ikke behandling eller akutthjelp. Trenger du mer, er dette gode steder å begynne:
            </p>
            <ul className="text-xs text-stone-700 space-y-1 font-serif list-disc pl-4">
              <li><span className="font-semibold">ADHD Norge</span> – rådgivning, likepersoner og rettigheter (adhdnorge.no)</li>
              <li><span className="font-semibold">Fastlegen</span> – ofte det første steget, kan henvise videre til BUP</li>
              <li><span className="font-semibold">Helsedirektoratet</span> – nasjonal faglig retningslinje for ADHD</li>
            </ul>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xxs">
              <a href="tel:113" className="bg-white border border-stone-200 rounded p-2 text-stone-700 hover:border-stone-400 transition-colors"><span className="font-semibold">Akutt fare:</span> 113</a>
              <a href="tel:116117" className="bg-white border border-stone-200 rounded p-2 text-stone-700 hover:border-stone-400 transition-colors"><span className="font-semibold">Legevakt:</span> 116 117</a>
              <a href="tel:116111" className="bg-white border border-stone-200 rounded p-2 text-stone-700 hover:border-stone-400 transition-colors"><span className="font-semibold">Barn/unge:</span> 116 111</a>
              <a href="tel:116123" className="bg-white border border-stone-200 rounded p-2 text-stone-700 hover:border-stone-400 transition-colors"><span className="font-semibold">Mental Helse:</span> 116 123</a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
