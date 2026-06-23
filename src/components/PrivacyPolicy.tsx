/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X } from 'lucide-react';

/**
 * Personvern-modal for landingssiden. Brukervendt sammendrag av
 * docs/personvernerklæring.md. Vises ved e-postfangst (samtykke) og fra footer.
 * Full erklæring vedlikeholdes i docs/ og kan flyttes til en egen /personvern-rute senere.
 */
export const PrivacyPolicy: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Personvernerklæring"
    >
      <div
        className="bg-[#faf7f2] max-w-2xl w-full my-8 rounded-2xl shadow-xl border border-[#e7e0d6] p-6 md:p-8 text-[#23262b]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-2xl font-serif font-semibold text-[#1a1d21]">Personvernerklæring</h2>
          <button onClick={onClose} aria-label="Lukk" className="text-[#5b6068] hover:text-[#1a1d21] p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#5b6068] italic mb-5 leading-relaxed">
          Tidlig forhåndsvisning. I dag lagres kun e-postadressen du eventuelt oppgir; konto, synkronisering
          og utsending av e-post er ikke aktivt ennå. Dette er et utkast som ikke erstatter juridisk gjennomgang.
        </p>

        <div className="space-y-5 text-sm text-[#33373d] leading-relaxed">
          <section>
            <h3 className="font-semibold text-[#1a1d21] mb-1">Hvem er ansvarlig?</h3>
            <p>Behandlingsansvarlig er Irmelin Irene Hannisdal Holteberg. Kontakt: andreasholteberg@gmail.com · adhd-depoet.com.</p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1d21] mb-1">Hva samler vi inn?</h3>
            <p>
              Kun e-postadressen du frivillig oppgir for å få gratis-dryppene og daglig støtte. Eventuelt valgfritt
              kallenavn og fremgang lagres lokalt i nettleseren din. Vi samler <strong>ikke</strong> inn opplysninger om barnet
              ditt, diagnose, helseopplysninger eller betalingsinformasjon.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1d21] mb-1">Hvorfor, og på hvilket grunnlag?</h3>
            <p>
              E-postadressen brukes til å sende deg dryppene og daglig støtte du har samtykket til (GDPR art. 6 nr. 1 a –
              samtykke; jf. markedsføringsloven § 15). Lokal lagring av depot og innstillinger skjer i nettleseren for at
              tjenesten skal fungere.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1d21] mb-1">Lagring og sletting</h3>
            <p>
              E-postadressen fjernes umiddelbart ved avmelding. Lokalt lagrede data ligger kun i nettleseren din og
              slettes når du tømmer nettstedsdata. Ber du om sletting, gjøres det innen 30 dager.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1d21] mb-1">Deling</h3>
            <p>
              Vi selger ikke og deler ikke opplysningene dine med annonsører. Når tjenesten settes i drift, brukes
              databehandlere (f.eks. hosting og e-postutsending) bundet av databehandleravtale. Vi bruker ingen
              tredjeparts sporings- eller reklamecookies.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1d21] mb-1">Dine rettigheter</h3>
            <p>
              Du kan be om innsyn, retting, sletting og utlevering av opplysningene dine, og du kan når som helst
              trekke tilbake samtykket ditt eller melde deg av. Send en e-post til andreasholteberg@gmail.com.
              Du kan også klage til Datatilsynet (datatilsynet.no).
            </p>
          </section>
        </div>

        <div className="pt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#3a5a40] hover:bg-[#2f4a35] text-white font-semibold px-5 py-2.5 rounded-full text-sm cursor-pointer transition-all"
          >
            Lukk
          </button>
        </div>
      </div>
    </div>
  );
};
