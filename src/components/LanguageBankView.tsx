/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { LANGUAGE_CARDS } from '../data/languageCards';
import { DAILY_LANGUAGE_CARDS } from '../data/dailyPrompts';
import { shareLanguageCard, ShareResult } from '../lib/shareCard';
import { Search, Star, MessageCircle, Heart, Folder, Check, Filter, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export const LanguageBankView: React.FC = () => {
  const { user, toggleFavoriteLanguage } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [onlyShowFavorites, setOnlyShowFavorites] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareState, setShareState] = useState<{ id: string; result: ShareResult } | null>(null);

  const handleShare = async (text: string, id: string) => {
    const result = await shareLanguageCard(text);
    if (result === 'dismissed') return;
    setShareState({ id, result });
    setTimeout(() => setShareState(null), 2000);
  };

  // Banken + daglige kort brukeren faktisk har lagret fra "I dag"
  const savedDailyCards = DAILY_LANGUAGE_CARDS.filter(c => user?.savedCards.includes(c.id));
  const allCards = [...LANGUAGE_CARDS, ...savedDailyCards];

  // Group phrases uniquely or find unique categories
  const categories = ['Alle', ...new Set(allCards.map(c => c.category))];

  // Filter phrases based on search + selected Category + favorites filter
  const filteredCards = allCards.filter(card => {
    const matchesSearch = card.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          card.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || card.category === selectedCategory;
    const isSaved = user?.savedCards.includes(card.id) || false;
    const matchesFavorites = !onlyShowFavorites || isSaved;
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="lang-bank-title">Språkbanken</h2>
        <p className="text-stone-500 text-xs">En søkbar samling av korte setninger til hverdagen</p>
      </div>

      <div className="p-4 bg-stone-100/50 border border-stone-200/60 rounded-xl text-stone-600 text-xs leading-relaxed">
        Velg en kategori eller søk etter setninger. Klikk på stjernen for å legge en setning i favoritter, så du har din egen personlige samling lett tilgjengelig i "I dag" eller på farten.
      </div>

      {/* Main bar: Search & Favorites Filter Toggler */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            id="lang-bank-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Søk i korthallen f.eks: 'beredskap', 'sekund'..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-stone-500 shadow-sm transition-all"
          />
        </div>

        <button
          id="lang-favorites-toggle-btn"
          onClick={() => setOnlyShowFavorites(!onlyShowFavorites)}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border shrink-0 cursor-pointer ${
            onlyShowFavorites 
              ? 'bg-amber-50 border-amber-300 text-amber-900' 
              : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
          }`}
        >
          <Star className={`w-4 h-4 ${onlyShowFavorites ? 'fill-amber-500 text-amber-500' : 'text-stone-400'}`} />
          <span>Mine lagrede ({user?.savedCards?.length || 0})</span>
        </button>
      </div>

      {/* Categories chips filter */}
      {!onlyShowFavorites && (
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 pr-10">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`lang-cat-pill-${cat.replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xxs whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-pine-600 border-pine-600 text-white font-medium'
                  : 'bg-white border-stone-200 hover:border-stone-400 text-stone-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid listing phrases */}
      <div className="grid grid-cols-1 gap-3">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => {
            const isSaved = user?.savedCards.includes(card.id) || false;
            return (
              <motion.div
                key={card.id}
                id={`lang-card-entry-${card.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-stone-200 p-5 rounded-xl space-y-4 shadow-xxs hover:shadow-xs transition-shadow relative overflow-hidden"
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 flex items-center gap-1">
                    <Folder className="w-3 h-3" />
                    <span>{card.category}</span>
                  </span>
                  
                  <p className="text-base font-serif italic text-stone-850 pt-1 leading-relaxed">
                    "{card.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-stone-100 pt-3 text-xs">
                  <div className="flex items-center gap-3">
                    {/* Action Copy to Clipboard */}
                    <button
                      id={`copy-lang-${card.id}`}
                      onClick={() => handleCopyToClipboard(card.text, card.id)}
                      className="text-stone-400 hover:text-stone-700 font-medium text-xxs tracking-wider uppercase flex items-center gap-1"
                    >
                      {copiedId === card.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-600">Kopiert!</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Kopier tekst</span>
                        </>
                      )}
                    </button>

                    {/* Del kortet – f.eks. til den andre forelderen */}
                    <button
                      id={`share-lang-${card.id}`}
                      onClick={() => handleShare(card.text, card.id)}
                      className="text-stone-400 hover:text-stone-700 font-medium text-xxs tracking-wider uppercase flex items-center gap-1"
                    >
                      {shareState?.id === card.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-pine-600" />
                          <span className="text-pine-700">{shareState.result === 'copied' ? 'Kopiert – klar til å limes inn' : 'Delt'}</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Del</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Favorite Toggle Star */}
                  <button
                    id={`toggle-fav-btn-${card.id}`}
                    onClick={() => toggleFavoriteLanguage(card.id)}
                    className={`flex items-center gap-1 font-semibold text-xxs uppercase tracking-wider transition-colors ${
                      isSaved ? 'text-amber-800' : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                    <span>{isSaved ? 'Lagret' : 'Lagre'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white border border-stone-200 rounded-xl p-6">
            <p className="text-stone-400 text-sm">Fant ingen setninger tilsvarende søket ditt.</p>
            <button
              id="reset-lang-filters-btn"
              onClick={() => { setSearchTerm(''); setSelectedCategory('Alle'); setOnlyShowFavorites(false); }}
              className="text-stone-800 border-b border-stone-800 text-xs font-serif mt-3"
            >
              Vis alle setninger i listingen
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
