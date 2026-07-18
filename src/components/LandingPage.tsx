/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { DemoAcuteCard } from './DemoAcuteCard';
import { motion } from 'motion/react';
import { Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { appConfig } from '../lib/config';
import { requestEmailOptIn } from '../lib/emailService';
import {
  ACCOUNT_AND_DATA_STATUS,
  COURSE_LAUNCH_STATUS,
  LOCAL_BUILD_STATUS,
  PARKURS_STATUS,
} from '../lib/productCopy';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { updateUserSettings, user } = useAppState();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formMsg, setFormMsg] = useState('');
  // Demo-kort: ren visningstilstand, ingenting lagres
  const [showDemo, setShowDemo] = useState(false);
  // Personvern: aktivt samtykke (§15/GDPR) før e-post lagres, og tilgjengelig erklæring
  const [consent, setConsent] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !consent) return;

    // Lagrer interessen lokalt. E-postdrypp sendes ikke ennå (ingen backend),
    // og vi markerer derfor IKKE brukeren som synkronisert.
    // Samtykket dokumenteres med tidspunkt og tekstversjon (GDPR art. 7 nr. 1).
    updateUserSettings({
      email: email,
      emailConsent: {
        acceptedAt: new Date().toISOString(),
        version: 'landing-epostdrypp-v1',
      },
      optIns: {
        dailyEmail: true,
        dailySms: false,
        weeklyPuff: true,
        returnOptIn: true
      }
    });

    setSubmitted(true);

    if (appConfig.emailEnabled) {
      const result = await requestEmailOptIn(email);
      setFormMsg(
        result.ok
          ? result.message
          : `Ønsket ditt er lagret lokalt, men e-postflyten svarte med feil: ${result.message}`,
      );
    } else {
      setFormMsg('Takk for interessen! De daglige e-postdryppene er ikke i gang ennå, så det kommer ingen påminnelses-e-post nå. Ønsket ditt er lagret lokalt i nettleseren, og du kan utforske appen med en gang.');
    }
    
    // Redirect to app after 3.5 seconds so they see the success state
    setTimeout(() => {
      onEnterApp();
    }, 4000);
  };

  return (
    <div className="kontinuum-paper min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-300/30">
      
      {/* Decorative top header line */}
      <div className="h-1.5 bg-pine-600" />

      {/* Floating Header */}
      <nav className="max-w-3xl mx-auto px-6 py-5 flex justify-between items-center bg-transparent border-b border-stone-200/70">
        <a href="#top" className="flex items-center no-underline">
          <img src="/depoet-logo-transparent.png" alt="ADHD Depoet" className="h-12 w-auto -my-2 dark:hidden" />
          <img src="/depoet-logo-transparent-dark-mode.png" alt="ADHD Depoet" className="hidden h-12 w-auto -my-2 dark:block" />
        </a>
        <button
          onClick={onEnterApp}
          className="text-xs font-semibold text-pine-600 dark:text-pine-700 hover:text-pine-700 dark:hover:text-pine-800 bg-stone-55 border border-stone-200 px-4 py-2 rounded-xl hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>Gå til Depoet-appen</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Hero Section */}
      <header id="top" className="kontinuum-hero py-20 text-center max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-xs tracking-[4px] uppercase text-pine-600 dark:text-pine-700 font-bold">ADHD Depoet · bygget på boken Førersetet</div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-950 leading-tight tracking-tight">
            Når hverdagen ble en kamp
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-serif">
            Et digitalt øvingsrom for foreldre som vil forstå og møte ADHD og reguleringsvansker på en tryggere, klokere og mer menneskelig måte.
          </p>
          <p className="text-sm md:text-base text-stone-500 max-w-xl mx-auto italic font-serif">
            Ikke en metode med fasit. Et blikk, et språk og en retning – og et sted å komme tilbake til når hverdagen skjer.
          </p>
          
          <div className="pt-6 flex flex-col md:flex-row justify-center items-center gap-3">
            <a
              href="#gratis"
              className="w-full md:w-auto text-center bg-pine-600 hover:bg-pine-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xxs transition-all active:scale-98"
            >
              Start med en gratis smakebit
            </a>
            <button
              onClick={onEnterApp}
              className="w-full md:w-auto text-center bg-stone-55 border border-stone-200 hover:bg-stone-100/70 text-pine-600 dark:text-pine-700 font-semibold px-8 py-4 rounded-xl shadow-xxs transition-all"
            >
              Utforsk Depoet-appen direkte
            </button>
          </div>

          {/* Lavterskel demo: ett ekte akuttkort, uten registrering og uten lagring */}
          <button
            id="demo-try-btn"
            onClick={() => setShowDemo(true)}
            className="text-sm text-stone-500 hover:text-pine-600 dark:text-pine-700 underline underline-offset-4 decoration-stone-300 hover:decoration-pine-600 transition-colors cursor-pointer"
          >
            Prøv uten å registrere noe – se ett akuttkort nå
          </button>
        </motion.div>
      </header>
      <div className="kontinuum-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" focusable="false">
          <path d="M0 46 C180 22 320 22 500 46 S820 70 1000 46 1260 22 1440 46" />
          <path d="M0 58 C180 34 320 34 500 58 S820 82 1000 58 1260 34 1440 58" className="kontinuum-wave-divider__echo" />
        </svg>
      </div>
      {/* Scene Section */}
      <section className="py-12 border-t border-stone-200 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-950 mb-6">
          Kanskje kjenner du dette igjen
        </h2>
        
        <div className="bg-stone-100 border-l-4 border-pine-600 p-5 rounded-r-lg text-base md:text-lg text-stone-700 font-serif leading-relaxed italic mb-8">
          Kanskje står dere i gangen. Barnet ditt skal ta på sko. Det er egentlig alt. Og likevel vet du allerede at dette kan bli vanskelig – og at du, om noen minutter, ikke lenger bare leder situasjonen, men kjemper med den.
        </div>

        <div className="space-y-6 text-base text-stone-700 leading-relaxed">
          <p>
            De fleste foreldre kjenner det øyeblikket. Og under det ligger ofte en blanding av utmattelse og skam: hvorfor må det være en kamp hele tiden, og hvorfor klarte jeg det ikke igjen?
          </p>
          <p className="text-xl font-serif text-pine-600 dark:text-pine-700 font-medium pt-3">
            Det er ikke alltid det begynner med barnet. Noen ganger begynner det i deg.
          </p>
          <p>
            Førersetet handler om å forstå hva som faktisk skjer når hverdagen står på sitt vanskeligste – i barnet, i deg, og i samspillet mellom dere. Utgangspunktet er enkelt, men det forandrer mye: <strong className="font-semibold text-stone-950">atferd handler ofte om kapasitet lenge før det handler om vilje.</strong> Ikke «han vil ikke», men «han får det ikke til akkurat nå». Det fjerner ikke grensene. Det endrer rekkefølgen.
          </p>
        </div>
      </section>

      {/* Boken er fundamentet Section */}
      <section className="py-12 border-t border-stone-200 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-950 mb-5">
          Boken er fundamentet
        </h2>
        <p className="text-base text-stone-700 leading-relaxed mb-2">
          ADHD Depoet bygger på <strong className="font-semibold text-stone-950">Førersetet</strong> av Andreas Holteberg – en bok om å forstå barn med ADHD og reguleringsvansker, deg selv som forelder, og samspillet mellom dere. Den gir deg et språk for det som skjer hjemme, i barnet, i deg, og mellom dere.
        </p>
        <blockquote className="my-7 pl-6 border-l border-pine-600/45 dark:border-pine-700/55">
          <p className="font-serif text-xl md:text-2xl text-stone-900 leading-snug mb-2">«Boken er ikke en metode. Den er et blikk, et språk og en retning. Det du gjør med det, er ditt.»</p>
          <cite className="not-italic text-[11px] tracking-wider uppercase text-stone-500">Førersetet</cite>
        </blockquote>
        <p className="text-base text-stone-700 leading-relaxed">
          Depoet tar dette språket videre – fra forståelse til øvelse, i små, daglige doser. Der boken er inngangsdøren, er Depoet huset du kan bo i over tid.
        </p>
      </section>


      <div className="kontinuum-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" focusable="false">
          <path d="M0 46 C180 22 320 22 500 46 S820 70 1000 46 1260 22 1440 46" />
          <path d="M0 58 C180 34 320 34 500 58 S820 82 1000 58 1260 34 1440 58" className="kontinuum-wave-divider__echo" />
        </svg>
      </div>
      {/* Gratis signup section */}
      <section id="gratis" className="py-14 bg-stone-55 border-t border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-950 mb-2">
            Gratis inngang: «Kapasitet før vilje»
          </h2>
          <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-6">
            {appConfig.emailEnabled
              ? 'En kort, rolig start på tre dager. Tre korte e-poster som gir deg et nytt blikk på de vanskeligste øyeblikkene – og én liten ting du kan prøve med en gang.'
              : 'En kort, rolig start på tre dager. Du kan melde interesse lokalt; de daglige e-postdryppene er ikke aktivert ennå. Passordfri innlogging er tilgjengelig separat i Profil.'}
          </p>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 md:p-8 space-y-6">
            <h3 className="text-lg md:text-xl font-serif font-semibold text-stone-950">
              Tre små drypp, på tre dager
            </h3>
            
            <ul className="space-y-3.5 text-sm text-stone-700 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-pine-600 dark:text-pine-700 font-bold text-base select-none">●</span>
                <span><strong className="font-semibold text-stone-900">Dag 1 — Når det ikke handler om vilje.</strong> Et nytt blikk på barnet.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-pine-600 dark:text-pine-700 font-bold text-base select-none">●</span>
                <span><strong className="font-semibold text-stone-900">Dag 2 — Noen ganger begynner det i deg.</strong> Å merke din egen alarm.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-pine-600 dark:text-pine-700 font-bold text-base select-none">●</span>
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
                    className="w-full pl-10 pr-4 py-3.5 bg-stone-55 border border-stone-300 focus:border-pine-600 focus:ring-1 focus:ring-pine-600 focus:outline-none rounded-xl text-stone-800 text-sm leading-relaxed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted || !email || !consent}
                  aria-describedby={!consent ? 'landing-consent-hint' : undefined}
                  className="bg-pine-600 hover:bg-pine-700 disabled:bg-pine-600/50 text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
                >
                  {appConfig.emailEnabled ? 'Send meg dryppene' : 'Lagre interessen lokalt'}
                </button>
              </div>

              {!consent && !submitted && (
                <p id="landing-consent-hint" className="text-xs text-stone-500 italic">
                  Huk av i boksen under, så blir knappen aktiv.
                </p>
              )}

              <label htmlFor="consent-email" className="flex items-start gap-2 text-xxs text-stone-500 leading-relaxed cursor-pointer pt-1">
                <input
                  id="consent-email"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={submitted}
                  className="mt-0.5 accent-pine-600 cursor-pointer shrink-0"
                />
                <span>
                  {appConfig.emailEnabled ? 'Ja, send meg gratis-dryppene og daglig støtte på e-post. ' : 'Ja, lagre interessen min lokalt til e-postdryppene åpner. '}
                  Jeg har lest{' '}
                  <button type="button" onClick={() => setShowPrivacy(true)} className="underline underline-offset-2 text-pine-600 dark:text-pine-700 hover:text-pine-700 dark:hover:text-pine-800">personvernerklæringen</button>{' '}
                  {appConfig.emailEnabled ? 'og kan melde meg av når som helst.' : 'og kan slette dette lokalt når som helst.'}
                </span>
              </label>

              {formMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs mt-3 p-3 rounded-lg leading-relaxed ${submitted ? 'bg-green-50 text-green-800 border border-green-200/50' : 'text-stone-500'}`}
                >
                  {formMsg}
                </motion.div>
              )}

              <p className="text-xxs text-stone-500 mt-2">
                {appConfig.emailEnabled
                  ? 'Gratis. Du kan melde deg av når som helst, og vi sender deg aldri noe som får deg til å føle at du ligger etter.'
                  : 'Gratis. Dette lagres lokalt i nettleseren din og sender ingen e-post nå.'}
              </p>
              <p className="text-xxs text-stone-500">
                {appConfig.emailEnabled
                  ? 'Ikke legg inn sensitiv informasjon i e-postfeltet eller appen.'
                  : 'Daglige e-postdrypp er ikke i gang ennå. Ikke legg inn sensitiv informasjon.'}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Hvis du vil øve videre Section */}
      <section className="py-14 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-950 mb-3">
          Hvis du vil øve videre
        </h2>
        <p className="text-stone-700 text-base leading-relaxed mb-8">
          Boken står på egne ben. Men hvis språket treffer, og du vil øve mer konkret, er det en vei videre – ett lite skritt om gangen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border border-stone-200 bg-stone-55 rounded-xl p-5 shadow-xxs space-y-2">
            <h3 className="text-lg font-serif font-semibold text-pine-600 dark:text-pine-700">Boken</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Et språk for ADHD, regulering, skam og relasjonelle brudd. Stemmen du kan bli kjent med før du går videre.
            </p>
          </div>

          <div className="border border-stone-200 bg-stone-55 rounded-xl p-5 shadow-xxs space-y-2">
            <h3 className="text-lg font-serif font-semibold text-pine-600 dark:text-pine-700">Kursene</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Korte kurs som hjelper deg å øve i de øyeblikkene som gjør vondt – fra startkurset «Regulering før retning» til korte minikurs. Fra forståelse til handling.
              {' '}{COURSE_LAUNCH_STATUS}
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              {PARKURS_STATUS}
            </p>
          </div>

          <div className="border border-stone-200 bg-stone-55 rounded-xl p-5 shadow-xxs space-y-2">
            <h3 className="text-lg font-serif font-semibold text-pine-600 dark:text-pine-700">Depoet</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Et digitalt øvingsrom for hverdagen: en liten ting om dagen, hjelp i øyeblikket, og et sted å komme tilbake til når livet skjer.
            </p>
          </div>
        </div>
      </section>

      {/* Outcome Quote Section */}
      <section className="py-12 border-t border-stone-200 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-serif font-semibold text-stone-950 mb-4">
          Hva du sitter igjen med
        </h2>
        <p className="text-base text-stone-700 leading-relaxed">
          Målet er ikke å gjøre deg til en perfekt forelder. Det er et umulig prosjekt. Målet er at du skal kjenne:
        </p>
        <p className="text-lg md:text-xl font-serif text-pine-600 dark:text-pine-700 font-medium py-3 italic">
          «Jeg har ikke blitt perfekt. Men jeg har fått et språk. Jeg forstår mer. Jeg reparerer raskere. Jeg står stødigere. Og jeg vet hva jeg skal gjøre når det glipper.»
        </p>
        <blockquote className="mt-6 pl-6 border-l border-pine-600/45 dark:border-pine-700/55">
          <p className="font-serif text-xl md:text-2xl text-stone-900 leading-snug mb-2">«Det er aldri, noensinne, for sent å reparere en relasjon.»</p>
          <cite className="not-italic text-[11px] tracking-wider uppercase text-stone-500">Førersetet</cite>
        </blockquote>
      </section>

      {/* Safety Layer */}
      <section className="py-10 max-w-3xl mx-auto px-6 border-t border-stone-200/70">
        <div className="bg-stone-55 border border-stone-200 rounded-xl p-5 text-xs text-stone-700 leading-relaxed space-y-2">
          <p className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-700 dark:text-amber-300" />
            Når du trenger mer enn dette:
          </p>
          <p>
            ADHD Depoet er et øvingsrom, ikke behandling. Ved alvorlig bekymring – vold, selvskading, rus, dyp krise eller fare for at barnet ikke er trygt – skal det ikke stå alene.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px] text-stone-500">
            <div><strong>Akutt fare:</strong> 113</div>
            <div><strong>Legevakt:</strong> 116 117</div>
            <div><strong>Alarmtelefonen:</strong> 116 111</div>
            <div><strong>Mental Helse:</strong> 116 123</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-stone-200 text-center text-xs text-stone-500 space-y-2">
        <img src="/depoet-logo-transparent.png" alt="ADHD Depoet" className="h-10 w-auto mx-auto dark:hidden" />
        <img src="/depoet-logo-transparent-dark-mode.png" alt="ADHD Depoet" className="hidden h-10 w-auto mx-auto dark:block" />
        <p className="max-w-md mx-auto px-6 font-serif">
          Bygget på boken Førersetet av Andreas Holteberg · adhd-depoet.com
        </p>
        <p className="max-w-md mx-auto px-6 text-xs text-stone-600 dark:text-stone-400">
          {appConfig.backendEnabled ? ACCOUNT_AND_DATA_STATUS : LOCAL_BUILD_STATUS}
        </p>
        <button onClick={() => setShowPrivacy(true)} className="text-xs text-stone-500 underline underline-offset-2 hover:text-pine-600 dark:text-pine-700 cursor-pointer">
          Personvernerklæring
        </button>
      </footer>

      {/* Personvern-overlay: vises fra samtykke-lenken og footer */}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}

      {/* Demo-overlay: ett akuttkort uten registrering */}
      {showDemo && (
        <DemoAcuteCard
          onClose={() => setShowDemo(false)}
          onTryApp={() => {
            setShowDemo(false);
            onEnterApp();
          }}
        />
      )}
    </div>
  );
};
