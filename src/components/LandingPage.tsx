/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Shield, Heart, Sparkles, AlertCircle } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { updateUserSettings, user } = useAppState();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formMsg, setFormMsg] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Lagrer interessen lokalt. E-postdrypp sendes ikke ennå (ingen backend),
    // og vi markerer derfor IKKE brukeren som synkronisert.
    updateUserSettings({
      email: email,
      optIns: {
        dailyEmail: true,
        dailySms: false,
        weeklyPuff: true,
        returnOptIn: true
      }
    });

    setSubmitted(true);
    setFormMsg('Takk for interessen! Dette er en tidlig forhåndsvisning – e-postdryppene er ikke i gang ennå, så det kommer ingen e-post nå. Ønsket ditt er lagret lokalt i nettleseren, og du kan utforske appen med en gang.');
    
    // Redirect to app after 3.5 seconds so they see the success state
    setTimeout(() => {
      onEnterApp();
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#23262b] font-sans selection:bg-[#cdbfa6]/30">
      
      {/* Decorative top header line */}
      <div className="h-1.5 bg-[#3a5a40]" />

      {/* Floating Header */}
      <nav className="max-w-3xl mx-auto px-6 py-5 flex justify-between items-center bg-transparent border-b border-[#e7e0d6]/70">
        <a href="#top" className="flex items-center no-underline">
          <img src="/depoet-logo-transparent.png" alt="ADHD Depoet" className="h-12 w-auto -my-2" />
        </a>
        <button
          onClick={onEnterApp}
          className="text-xs font-semibold text-[#3a5a40] hover:text-[#2f4a35] bg-white border border-[#e7e0d6] px-4 py-2 rounded-full hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Gå til Depoet-appen</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Hero Section */}
      <header id="top" className="py-20 text-center max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-xs tracking-[4px] uppercase text-[#3a5a40] font-bold">ADHD Depoet · bygget på boken Førersetet</div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#1a1d21] leading-tight tracking-tight">
            Når hverdagen ble en kamp
          </h1>
          <p className="text-lg md:text-xl text-[#5b6068] max-w-2xl mx-auto leading-relaxed font-serif">
            Et digitalt øvingsrom for foreldre som vil forstå og møte ADHD og reguleringsvansker på en tryggere, klokere og mer menneskelig måte.
          </p>
          <p className="text-sm md:text-base text-[#5b6068] max-w-xl mx-auto italic font-serif">
            Ikke en metode med fasit. Et blikk, et språk og en retning – og et sted å komme tilbake til når hverdagen skjer.
          </p>
          
          <div className="pt-6 flex flex-col md:flex-row justify-center items-center gap-3">
            <a
              href="#gratis"
              className="w-full md:w-auto text-center bg-[#3a5a40] hover:bg-[#2f4a35] text-white font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              Start med en gratis smakebit
            </a>
            <button
              onClick={onEnterApp}
              className="w-full md:w-auto text-center bg-white border border-[#e7e0d6] hover:bg-[#eef3f8]/35 text-[#3a5a40] font-semibold px-8 py-4 rounded-full shadow-xxs transition-all"
            >
              Utforsk Depoet-appen direkte
            </button>
          </div>
        </motion.div>
      </header>

      {/* Scene Section */}
      <section className="py-12 border-t border-[#e7e0d6] max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1d21] mb-6">
          Kanskje kjenner du dette igjen
        </h2>
        
        <div className="bg-[#eef3f8] border-l-4 border-[#3a5a40] p-5 rounded-r-lg text-base md:text-lg text-[#2a2e33] font-serif leading-relaxed italic mb-8">
          Kanskje står dere i gangen. Barnet ditt skal ta på sko. Det er egentlig alt. Og likevel vet du allerede at dette kan bli vanskelig – og at du, om noen minutter, ikke lenger bare leder situasjonen, men kjemper med den.
        </div>

        <div className="space-y-6 text-base text-[#33373d] leading-relaxed">
          <p>
            De fleste foreldre kjenner det øyeblikket. Og under det ligger ofte en blanding av utmattelse og skam: hvorfor må det være en kamp hele tiden, og hvorfor klarte jeg det ikke igjen?
          </p>
          <p className="text-xl font-serif text-[#3a5a40] font-medium pt-3">
            Det er ikke alltid det begynner med barnet. Noen ganger begynner det i deg.
          </p>
          <p>
            Førersetet handler om å forstå hva som faktisk skjer når hverdagen står på sitt vanskeligste – i barnet, i deg, og i samspillet mellom dere. Utgangspunktet er enkelt, men det forandrer mye: <strong className="font-semibold text-[#1a1d21]">atferd handler ofte om kapasitet lenge før det handler om vilje.</strong> Ikke «han vil ikke», men «han får det ikke til akkurat nå». Det fjerner ikke grensene. Det endrer rekkefølgen.
          </p>
        </div>
      </section>

      {/* Boken er fundamentet Section */}
      <section className="py-12 border-t border-[#e7e0d6] max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1d21] mb-5">
          Boken er fundamentet
        </h2>
        <p className="text-base text-[#33373d] leading-relaxed mb-2">
          ADHD Depoet bygger på <strong className="font-semibold text-[#1a1d21]">Førersetet</strong> av Andreas Holteberg – en bok om å forstå barn med ADHD og reguleringsvansker, deg selv som forelder, og samspillet mellom dere. Den gir deg et språk for det som skjer hjemme, i barnet, i deg, og mellom dere.
        </p>
        <blockquote className="my-7 pl-6 border-l-2 border-[#e0a85b]">
          <p className="font-serif text-xl md:text-2xl text-[#23262b] leading-snug mb-2">«Boken er ikke en metode. Den er et blikk, et språk og en retning. Det du gjør med det, er ditt.»</p>
          <cite className="not-italic text-[11px] tracking-wider uppercase text-[#5b6068]">Førersetet</cite>
        </blockquote>
        <p className="text-base text-[#33373d] leading-relaxed">
          Depoet tar dette språket videre – fra forståelse til øvelse, i små, daglige doser. Der boken er inngangsdøren, er Depoet huset du kan bo i over tid.
        </p>
      </section>

      {/* Gratis signup section */}
      <section id="gratis" className="py-14 bg-white border-t border-b border-[#e7e0d6]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1d21] mb-2">
            Gratis inngang: «Kapasitet før vilje»
          </h2>
          <p className="text-[#5b6068] text-sm md:text-base leading-relaxed mb-6">
            En kort, rolig start på tre dager. Tre korte e-poster som gir deg et nytt blikk på de vanskeligste øyeblikkene – og én liten ting du kan prøve med en gang.
          </p>

          <div className="bg-[#fbf3e7] border border-[#e0a85b] rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-lg md:text-xl font-serif font-semibold text-[#1a1d21]">
              Tre små drypp, på tre dager
            </h3>
            
            <ul className="space-y-3.5 text-sm text-[#3a3e44] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#e0a85b] font-bold text-base select-none">●</span>
                <span><strong className="font-semibold text-stone-900">Dag 1 — Når det ikke handler om vilje.</strong> Et nytt blikk på barnet.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#e0a85b] font-bold text-base select-none">●</span>
                <span><strong className="font-semibold text-stone-900">Dag 2 — Noen ganger begynner det i deg.</strong> Å merke din egen alarm.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#e0a85b] font-bold text-base select-none">●</span>
                <span><strong className="font-semibold text-stone-900">Dag 3 — Når det glipper.</strong> Veien tilbake. Det er aldri for sent.</span>
              </li>
            </ul>

            <form onSubmit={handleSignup} className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-4" />
                  <input
                    type="email"
                    required
                    placeholder="din-epost@eksempel.no"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitted}
                    className="w-full pl-10 pr-4 py-3.5 bg-[#fffdf9] border border-[#cdbfa6] focus:border-[#3a5a40] focus:ring-1 focus:ring-[#3a5a40] focus:outline-none rounded-xl text-stone-800 text-sm leading-relaxed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted || !email}
                  className="bg-[#3a5a40] hover:bg-[#2f4a35] disabled:bg-[#3a5a40]/50 text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
                >
                  Send meg dryppene
                </button>
              </div>

              {formMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs mt-3 p-3 rounded-lg leading-relaxed ${submitted ? 'bg-green-50 text-green-800 border border-green-200/50' : 'text-stone-500'}`}
                >
                  {formMsg}
                </motion.div>
              )}

              <p className="text-xxs text-[#5b6068] mt-2">
                Gratis. Du kan melde deg av når som helst, og vi sender deg aldri noe som får deg til å føle at du ligger etter.
              </p>
              <p className="text-xxs text-[#5b6068]">
                Tidlig forhåndsvisning: e-postdryppene er ikke i gang ennå. Ikke legg inn sensitiv informasjon.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Hvis du vil øve videre Section */}
      <section className="py-14 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1a1d21] mb-3">
          Hvis du vil øve videre
        </h2>
        <p className="text-[#33373d] text-base leading-relaxed mb-8">
          Boken står på egne ben. Men hvis språket treffer, og du vil øve mer konkret, er det en vei videre – ett lite skritt om gangen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border border-[#e7e0d6] bg-white rounded-xl p-5 shadow-xxs space-y-2">
            <h3 className="text-lg font-serif font-semibold text-[#1d578a]">Boken</h3>
            <p className="text-xs text-[#5b6068] leading-relaxed">
              Et språk for ADHD, regulering, skam og relasjonelle brudd. Stemmen du kan bli kjent med før du går videre.
            </p>
          </div>

          <div className="border border-[#e7e0d6] bg-white rounded-xl p-5 shadow-xxs space-y-2">
            <h3 className="text-lg font-serif font-semibold text-[#1d578a]">Kursene</h3>
            <p className="text-xs text-[#5b6068] leading-relaxed">
              Korte kurs som hjelper deg å øve i de øyeblikkene som gjør vondt – fra startkurset «Regulering før retning» til korte minikurs. Fra forståelse til handling.
            </p>
          </div>

          <div className="border border-[#e7e0d6] bg-white rounded-xl p-5 shadow-xxs space-y-2">
            <h3 className="text-lg font-serif font-semibold text-[#1d578a]">Depoet</h3>
            <p className="text-xs text-[#5b6068] leading-relaxed">
              Et digitalt øvingsrom for hverdagen: en liten ting om dagen, hjelp i øyeblikket, og et sted å komme tilbake til når livet skjer.
            </p>
          </div>
        </div>
      </section>

      {/* Outcome Quote Section */}
      <section className="py-12 border-t border-[#e7e0d6] max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-serif font-semibold text-[#1a1d21] mb-4">
          Hva du sitter igjen med
        </h2>
        <p className="text-base text-[#33373d] leading-relaxed">
          Målet er ikke å gjøre deg til en perfekt forelder. Det er et umulig prosjekt. Målet er at du skal kjenne:
        </p>
        <p className="text-lg md:text-xl font-serif text-[#3a5a40] font-medium py-3 italic">
          «Jeg har ikke blitt perfekt. Men jeg har fått et språk. Jeg forstår mer. Jeg reparerer raskere. Jeg står stødigere. Og jeg vet hva jeg skal gjøre når det glipper.»
        </p>
        <blockquote className="mt-6 pl-6 border-l-2 border-[#e0a85b]">
          <p className="font-serif text-xl md:text-2xl text-[#23262b] leading-snug mb-2">«Det er aldri, noensinne, for sent å reparere en relasjon.»</p>
          <cite className="not-italic text-[11px] tracking-wider uppercase text-[#5b6068]">Førersetet</cite>
        </blockquote>
      </section>

      {/* Safety Layer */}
      <section className="py-10 max-w-3xl mx-auto px-6 border-t border-[#e7e0d6]/70">
        <div className="bg-[#fbf3e7] border border-[#e0a85b]/60 rounded-xl p-5 text-xs text-[#5c4422] leading-relaxed space-y-2">
          <p className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#e0a85b]" />
            Når du trenger mer enn dette:
          </p>
          <p>
            ADHD Depoet er et øvingsrom, ikke behandling. Ved alvorlig bekymring – vold, selvskading, rus, dyp krise eller fare for at barnet ikke er trygt – skal det ikke stå alene.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px] text-[#5c4422]/90">
            <div><strong>Akutt fare:</strong> 113</div>
            <div><strong>Legevakt:</strong> 116 117</div>
            <div><strong>Alarmtelefonen:</strong> 116 111</div>
            <div><strong>Mental Helse:</strong> 116 123</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-[#e7e0d6] text-center text-xs text-[#5b6068] space-y-2">
        <img src="/depoet-logo-transparent.png" alt="ADHD Depoet" className="h-10 w-auto mx-auto" />
        <p className="max-w-md mx-auto px-6 font-serif">
          Bygget på boken Førersetet av Andreas Holteberg · adhd-depoet.com
        </p>
        <p className="max-w-md mx-auto px-6 text-[11px] text-[#8a8f96]">
          Tidlig forhåndsvisning · Data lagres lokalt i nettleseren · Innlogging, skylagring og video kommer senere
        </p>
      </footer>
    </div>
  );
};
