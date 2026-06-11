/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, X, ExternalLink, LifeBuoy } from 'lucide-react';
import { motion } from 'motion/react';

export const SafetyBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Small floating persistent safeguard handle */}
      <div className="mt-8 flex justify-center pb-6">
        <button
          id="trigger-safety-banner-btn"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-stone-400 hover:text-stone-700 hover:underline transition-all bg-stone-100/50 hover:bg-stone-100 px-4 py-2 rounded-full border border-stone-200/55"
        >
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>Når du trenger mer enn Depoet</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="bg-white max-w-lg w-full rounded-2xl border border-stone-200 shadow-xl overflow-hidden relative"
          >
            {/* Close button */}
            <button
              id="close-safety-banner-btn"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-50 transition-all"
              aria-label="Lukk"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-amber-800">
                <ShieldAlert className="w-8 h-8 text-amber-700 shrink-0" />
                <h3 className="text-xl font-serif text-stone-900 tracking-tight">Når du trenger mer enn Depoet</h3>
              </div>

              <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
                <p>
                  Depoet er et digitalt øvingsrom for å holde en langsiktig retning, men det er ikke en erstatning for behandling, kliniske utredninger eller akutt krisehjelp.
                </p>
                <p className="font-semibold text-stone-800">
                  Hvis du eller familien opplever situasjoner preget av:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
                  <li>Akutt fare for liv og helse</li>
                  <li>Vold eller trusler om vold i hjemmet</li>
                  <li>Alvorlig selvskading eller suicidalitet</li>
                  <li>Psykose, vrangforestillinger eller tungt rusmisbruk</li>
                  <li>Alvorlig eller langvarig skolefravær hos barnet</li>
                  <li>Skremmende situasjoner der barnet ikke opplever trygghet</li>
                  <li>Øyeblikk der du som forelder er redd for å skade barnet ditt ordentlig</li>
                </ul>
                <p className="text-xs italic bg-amber-50 border-l-2 border-amber-500 p-3 text-amber-900 rounded-r-md">
                  ...så skal verken denne appen eller boken stå alene. Å hente inn hjelp utenfra er ikke et tegn på at du feiler, det er et modig tegn på omsorg.
                </p>
              </div>

              <div className="border-t border-stone-100 pt-5 space-y-3">
                <p className="text-xs tracking-wider uppercase text-stone-400">Offentlige hjelpetjenester i Norge</p>
                
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                    <div>
                      <p className="font-semibold text-red-900">Akutt fare for liv og helse</p>
                      <p className="text-red-700 text-xxs">Ring medisinsk nødtelefon direkte</p>
                    </div>
                    <a href="tel:113" id="call-emergency-btn" className="flex items-center gap-1.5 bg-red-600 text-white font-bold px-3 py-1.5 rounded hover:bg-red-700 transition-colors">
                      <PhoneCall className="w-3 h-3" />
                      113
                    </a>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/60 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-stone-800">Legevakt (Nasjonalt)</p>
                      <p className="text-stone-500 text-xxs">For øyeblikkelig hjelp når fastlegen er stengt</p>
                    </div>
                    <a href="tel:116117" className="font-bold text-stone-700 bg-stone-200/80 px-2.5 py-1.5 rounded transition-colors hover:bg-stone-200">
                      116 117
                    </a>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/60 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-stone-800">Alarmtelefonen for barn og unge</p>
                      <p className="text-stone-500 text-xxs">Døgnåpen, gratis tjeneste for barn og bekymrede voksne</p>
                    </div>
                    <a href="tel:116111" className="font-bold text-stone-700 bg-stone-200/80 px-2.5 py-1.5 rounded transition-colors hover:bg-stone-200">
                      116 111
                    </a>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/60 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-stone-800">Mental Helse Hjelpetelefonen</p>
                      <p className="text-stone-500 text-xxs">En gratis og anonym telefontjeneste for alle som sliter</p>
                    </div>
                    <a href="tel:116123" className="font-bold text-stone-700 bg-stone-200/80 px-2.5 py-1.5 rounded transition-colors hover:bg-stone-200">
                      116 123
                    </a>
                  </div>
                </div>

                <div className="pt-2 text-stone-500 text-xxs leading-relaxed">
                  <span className="font-bold">Fastlegen:</span> Din primærkontakt i helsevesenet. Fastlegen hjelper med medisinsk rådgivning og henviser videre til <span className="font-semibold">BUP</span> (Barne- og ungdomspsykiatrisk poliklinikk) eller kommunale støtteteam.
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  id="dismiss-safety-banner-btn"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-pine-600 hover:bg-pine-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                >
                  Jeg forstår, lukk her
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
