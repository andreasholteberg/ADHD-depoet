/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X } from 'lucide-react';
import { useEscapeClose } from '../lib/useEscapeClose';
import { appConfig } from '../lib/config';

/**
 * Personvernerklæring – brukervendt sammendrag av docs/personvernerklæring.md
 * (som er kilden til sannhet). Strukturen skiller tydelig mellom hvordan det
 * ER i dag (alt lokalt) og hva som ENDRES når konto/e-post lanseres.
 * Vises fra onboarding, e-postfangst, app-footer og profil.
 */
export const PrivacyPolicy: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeClose(onClose);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1a1612]/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Personvernerklæring"
    >
      <div
        className="bg-[#f6f0e8] max-w-2xl w-full my-8 rounded-2xl shadow-xl border border-[#e3dacb] p-6 md:p-8 text-[#24211e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-2xl font-serif font-semibold text-[#1a1612]">Personvernerklæring</h2>
          <button onClick={onClose} aria-label="Lukk" className="text-[#6b6358] hover:text-[#1a1612] p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#6b6358] italic mb-5 leading-relaxed">
          Sist oppdatert juli 2026. Tjenesten er rettet mot voksne over 18 år i foreldrerollen.
        </p>

        <div className="space-y-5 text-sm text-[#43403a] leading-relaxed">
          <section>
            <h3 className="font-semibold text-[#1a1612] mb-1">
              {appConfig.backendEnabled ? 'Slik er dette bygget satt opp' : 'Slik er det i dag (tidlig forhåndsvisning)'}
            </h3>
            <p>
              {appConfig.backendEnabled ? (
                <>
                  Depoet har env-gatet støtte for innlogging og synk i dette bygget. Det betyr at lokal lagring
                  fortsatt er fallback, mens serverlagring bare brukes etter aktivt synk-samtykke. Fritekst som
                  refleksjoner og søndagsnotater forblir på denne enheten i denne versjonen.
                </>
              ) : (
                <>
                  Alt du gjør i Depoet lagres <strong>kun lokalt i nettleseren på din enhet</strong>: valgfritt
                  kallenavn, svarene fra oppstarten, daglige innsjekk, refleksjoner, søndagsnotater, lagrede kort,
                  innstillinger – og e-postadressen, hvis du har oppgitt den. <strong>Ingenting sendes til oss eller
                  noen andre.</strong> Vi har ingen servere som mottar data, ingen innsyn, og vi kan derfor heller
                  ikke lese det du skriver.
                </>
              )}{' '}
              Nettstedet bruker ingen sporingscookies, ingen analyseverktøy og ingen tredjepartsskript.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1612] mb-1">Hva betyr det for deg?</h3>
            <p>
              Du kan trygt skrive for din egen del – det blir hos deg. Under «Profil → Dine data» kan du når som
              helst laste ned alt som én fil, fjerne en lagret e-postadresse, eller slette alt. Tømmer du
              nettleserens nettstedsdata, forsvinner det samme veien.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1612] mb-1">E-postadressen du eventuelt oppgir</h3>
            <p>
              Påmelding til «dryppene» lagrer adressen din og samtykket ditt lokalt, med tidspunkt. Utsending er
              ikke i gang ennå, så ingen e-post sendes – og adressen har ikke forlatt enheten din. Når utsending
              starter, skjer det bare hvis du har samtykket (GDPR art. 6 nr. 1 a, markedsføringsloven § 15), og
              du kan melde deg av i hver eneste e-post.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1612] mb-1">Dette endres når tjenesten utvides</h3>
            <p>
              Supabase og Resend er lagt inn som kodeklare, planlagte databehandlere, men e-post og synk er bare
              aktive når miljøvariabler og server-secrets er satt. Da vil enkelte opplysninger (f.eks.
              e-postadresse og kursfremgang) behandles av databehandlere med databehandleravtale – og vi varsler
              deg tydelig og ber om aktivt samtykke før strukturert data flyttes fra lokal lagring. Fritekst
              (refleksjoner og søndagsnotater) forblir lokalt i denne versjonen.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1612] mb-1">Hvem er ansvarlig?</h3>
                        <p>
              Behandlingsansvarlig er <strong>HOLTEBERG KONTINUUM</strong>, org.nr. 837 924 782,
              Bårågerveien 21, 4641 SØGNE. Kontaktperson for personvern er Andreas Holteberg:{' '}
              <a href="mailto:andreas@kontinuum.work" className="underline underline-offset-2 hover:text-[#1a1612]">
                andreas@kontinuum.work
              </a>{' '}
              · adhd-depoet.com.
            </p>
            <p className="mt-2 text-xs text-[#6b6358]">
              Dette gjelder ansvar for behandling av personopplysninger i tjenesten. Depoet er ikke en
              helsetjeneste og innebærer ikke medisinsk, psykologisk eller terapeutisk behandleransvar.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1612] mb-1">Dine rettigheter</h3>
            <p>
              Du kan be om innsyn, retting, sletting og utlevering av opplysninger, og trekke tilbake samtykker
              når som helst – i appen under «Dine data», eller ved å sende en e-post til
              andreas@kontinuum.work (svar innen 30 dager). Du kan også klage til Datatilsynet
              (datatilsynet.no).
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-[#1a1612] mb-1">Hva vi aldri ber om</h3>
            <p>
              Depoet ber ikke om barnets navn, diagnose, medisiner, skole eller journalopplysninger – og har
              ingen felt som er ment for slikt. Skriver du fritekst, anbefaler vi å bruke fornavn eller
              «barnet» i stedet for fullt navn.
            </p>
          </section>
        </div>

        <div className="pt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#5e6b4f] hover:bg-[#4c5740] text-white font-semibold px-5 py-2.5 rounded-full text-sm cursor-pointer transition-all"
          >
            Lukk
          </button>
        </div>
      </div>
    </div>
  );
};
