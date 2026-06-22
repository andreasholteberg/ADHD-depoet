import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { LANGUAGE_CARDS } from '../data/languageCards';
import { DAILY_LANGUAGE_CARDS } from '../data/dailyPrompts';
import { COURSE_LANGUAGE_CARDS } from '../data/courses';
import { loadReflections } from '../lib/reflections';
import { shareLanguageCard, ShareResult } from '../lib/shareCard';
import { getMirrorPair } from '../lib/mirror';
import { LanguageCard } from '../types';
import { Star, Calendar, Feather, Lightbulb, Check, MessageCircle, ArrowRight, Folder, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Mitt depot – en rolig oversikt over det brukeren har lagt fra seg underveis.
 * Ikke et dashboard og ikke en prestasjonsvisning: bare hyllene med de små håndtakene.
 * Leser kun data som allerede finnes lokalt (app-state + localStorage via trygge helpere).
 */
export const MyDepotView: React.FC = () => {
  const { user, sundayReports, setActiveTab, toggleFavoriteLanguage } = useAppState();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareState, setShareState] = useState<{ id: string; result: ShareResult } | null>(null);

  const handleShare = async (text: string, id: string) => {
    const result = await shareLanguageCard(text);
    if (result === 'dismissed') return;
    setShareState({ id, result });
    setTimeout(() => setShareState(null), 2000);
  };

  // Lagrede språkkort: favoritter fra Språkbanken + daglige kort + kort fra kursene
  const allCards: LanguageCard[] = [...LANGUAGE_CARDS, ...DAILY_LANGUAGE_CARDS, ...COURSE_LANGUAGE_CARDS];
  const savedCards = (user?.savedCards ?? [])
    .map((id) => allCards.find((c) => c.id === id))
    .filter((c): c is LanguageCard => Boolean(c));

  // Egne små notater (refleksjoner fra "I dag") – trygg lesing, korrupt lagring gir tom liste
  const reflections = loadReflections();

  const hasAnything = savedCards.length > 0 || reflections.length > 0 || sundayReports.length > 0;

  // Varsom speiling: brukerens egne ord fra to dager med ekte avstand. Null tolkning.
  const mirrorPair = getMirrorPair(reflections, sundayReports);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const inventoryParts: string[] = [];
  if (savedCards.length > 0) inventoryParts.push(savedCards.length === 1 ? 'én setning' : `${savedCards.length} setninger`);
  if (reflections.length > 0) inventoryParts.push(reflections.length === 1 ? 'ett lite notat' : `${reflections.length} små notater`);
  if (sundayReports.length > 0) inventoryParts.push(sundayReports.length === 1 ? 'én søndagslanding' : `${sundayReports.length} søndagslandinger`);

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      {/* Tittel */}
      <div className="space-y-1">
        <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="my-depot-title">Mitt depot</h2>
        <p className="text-stone-500 text-xs">Her ligger de små håndtakene dine</p>
      </div>

      {/* Rolig åpning: tomtilstand eller lavmælt oversikt over hva som ligger her */}
      {hasAnything ? (
        <div className="p-4 bg-stone-100/60 border border-stone-200/60 rounded-xl text-stone-600 text-xs leading-relaxed">
          Dette ligger her nå: {inventoryParts.join(', ')}. Alt sammen er ditt – det venter bare, uten frister.
        </div>
      ) : (
        <div className="p-5 bg-white border border-stone-200 rounded-xl text-stone-600 text-xs leading-relaxed font-serif shadow-sm">
          Her samles det du lagrer underveis. Det trenger ikke være mye. Ett kort kan være nok å komme tilbake til.
        </div>
      )}

      {/* Aktivt ukesmål – et håndtak, ikke et krav */}
      {user?.selectedWeeklyGoal && (
        <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-2 shadow-sm" id="depot-weekly-goal">
          <p className="text-stone-400 text-xxs uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-650" />
            <span>Ukesmålet ditt akkurat nå</span>
          </p>
          <p className="text-sm font-serif italic text-stone-800 leading-relaxed">"{user.selectedWeeklyGoal}"</p>
          <p className="text-xxs text-stone-500">Du kan justere det i Søndagsverkstedet – når du vil, eller aldri.</p>
        </div>
      )}

      {/* 1. Lagrede språkkort */}
      <div className="space-y-3" id="depot-saved-cards">
        <p className="text-stone-400 text-xxs uppercase tracking-wider flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-650" />
          <span>Setningene du har lagret</span>
        </p>

        {savedCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5">
            {savedCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-stone-200 p-4 rounded-xl space-y-3 shadow-xxs"
                id={`depot-card-${card.id}`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 flex items-center gap-1">
                    <Folder className="w-3 h-3" />
                    <span>{card.sourceModule ? `${card.category} · ${card.sourceModule}` : card.category}</span>
                  </span>
                  <p className="text-sm font-serif italic text-stone-850 leading-relaxed">"{card.text}"</p>
                </div>
                <div className="flex justify-between items-center border-t border-stone-100 pt-2.5 text-xxs">
                  <div className="flex items-center gap-3">
                    <button
                      id={`depot-copy-${card.id}`}
                      onClick={() => handleCopy(card.text, card.id)}
                      className="text-stone-400 hover:text-stone-700 font-medium uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === card.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-pine-600" />
                          <span className="text-pine-700">Kopiert!</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Kopier tekst</span>
                        </>
                      )}
                    </button>

                    <button
                      id={`depot-share-${card.id}`}
                      onClick={() => handleShare(card.text, card.id)}
                      className="text-stone-400 hover:text-stone-700 font-medium uppercase tracking-wider flex items-center gap-1 cursor-pointer"
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
                  <button
                    id={`depot-unfav-${card.id}`}
                    onClick={() => toggleFavoriteLanguage(card.id)}
                    className="flex items-center gap-1 font-semibold uppercase tracking-wider text-amber-800 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Lagret</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-xl p-4 text-xs text-stone-500 leading-relaxed space-y-3">
            <p>
              Ingen setninger ennå – og det haster ikke. Når du stjernemerker et språkkort, i Språkbanken eller på dagens kort, legger det seg her.
            </p>
            <button
              id="depot-goto-langbank"
              onClick={() => setActiveTab('languageBank')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-pine-700 hover:text-pine-800 cursor-pointer"
            >
              <span>Ta en titt i Språkbanken</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Egne små notater */}
      <div className="space-y-3" id="depot-reflections">
        <p className="text-stone-400 text-xxs uppercase tracking-wider flex items-center gap-1.5">
          <Feather className="w-3.5 h-3.5 text-stone-500" />
          <span>Dine små notater</span>
        </p>

        {reflections.length > 0 ? (
          <div className="space-y-2.5">
            {reflections.slice(0, 6).map((entry) => (
              <div key={entry.id} className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5 shadow-xxs">
                <div className="flex justify-between items-center text-stone-400 text-xxs">
                  <span>{entry.date}</span>
                  <span className="italic">{entry.checkIn}</span>
                </div>
                <p className="text-stone-700 italic font-serif text-xs leading-relaxed">"{entry.reflection}"</p>
              </div>
            ))}
            {reflections.length > 6 && (
              <p className="text-xxs text-stone-400 italic px-1">
                ...og {reflections.length - 6} til, som ligger trygt her.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-xl p-4 text-xs text-stone-500 leading-relaxed">
            Ingen notater ennå. På «I dag» kan du skrive en linje når du har rom – helt valgfritt. Det du skriver, havner her.
          </div>
        )}
      </div>

      {/* Dine egne ord, over tid – ren sitering, ingen vurdering */}
      {mirrorPair && (
        <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3 shadow-sm" id="depot-mirror">
          <p className="text-stone-400 text-xxs uppercase tracking-wider">Dine egne ord, over tid</p>
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xxs text-stone-400">{mirrorPair.earlier.dateLabel} skrev du:</p>
              <p className="text-xs font-serif italic text-stone-700 leading-relaxed pl-3 border-l-2 border-stone-200">
                "{mirrorPair.earlier.text}"
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xxs text-stone-400">{mirrorPair.later.dateLabel} skrev du:</p>
              <p className="text-xs font-serif italic text-stone-850 leading-relaxed pl-3 border-l-2 border-pine-300">
                "{mirrorPair.later.text}"
              </p>
            </div>
          </div>
          <p className="text-xxs text-stone-500 italic leading-relaxed border-t border-stone-100 pt-2.5">
            Ingen måling og ingen fasit – bare ordene dine fra to forskjellige dager, lagt ved siden av hverandre.
          </p>
        </div>
      )}

      {/* 3. Søndagslandinger */}
      <div className="space-y-3" id="depot-sunday">
        <p className="text-stone-400 text-xxs uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-stone-500" />
          <span>Søndagslandingene dine</span>
        </p>

        {sundayReports.length > 0 ? (
          <div className="space-y-2.5">
            {sundayReports.slice(0, 3).map((report) => (
              <div key={report.id} className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 shadow-xxs">
                <div className="flex justify-between items-center text-xxs text-stone-400">
                  <span>{new Date(report.date).toLocaleDateString('no-NO')}</span>
                  <span className="italic">{report.stateCheckIn}</span>
                </div>
                <p className="text-xs text-stone-700 font-serif leading-relaxed">
                  <span className="text-stone-400">Én lærdom: </span>"{report.learning}"
                </p>
                <p className="text-xs text-stone-850 font-serif italic leading-relaxed">
                  <span className="text-stone-400 not-italic">Lite mål: </span>"{report.nextGoal}"
                </p>
              </div>
            ))}
            {sundayReports.length > 3 && (
              <p className="text-xxs text-stone-400 italic px-1">
                Eldre landinger finner du nederst i Søndagsverkstedet.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white border border-stone-200 rounded-xl p-4 text-xs text-stone-500 leading-relaxed space-y-3">
            <p>
              Søndagsverkstedet er ti rolige minutter for å lande uka – uten dom og uten fasit. Det du skriver der, legger seg her.
            </p>
            <button
              id="depot-goto-sunday"
              onClick={() => setActiveTab('sunday')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-pine-700 hover:text-pine-800 cursor-pointer"
            >
              <span>Ta en titt på verkstedet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Ærlig fotnote */}
      <p className="text-center text-xxs text-stone-400 leading-relaxed px-4">
        Depotet ditt lagres lokalt i denne nettleseren.
      </p>

    </div>
  );
};
