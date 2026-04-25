import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const dynamic = "force-static";

export default function DepotetPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-14">
        <Container>
          <Card className="p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Depotet
                </p>
                <h1 className="depotet-title mt-4">
                  Depotet gir deg én tydelig retning hver dag.
                </h1>
                <p className="mt-5 max-w-2xl text-[var(--color-text-muted)]">
                  Depotet er ikke et kursbibliotek.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  Det er et system for de dagene du ikke orker å finne ut av alt
                  selv.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  Du åpner Depotet, får én handling for dagen, gjør den så godt
                  du kan, og går videre.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  Målet er ikke perfekte foreldre. Målet er litt mindre kaos,
                  litt raskere reparasjon og litt mer retning over tid.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href="#interesseliste" variant="primary">
                    Sett meg på interesseliste
                  </LinkButton>
                  <LinkButton href="/nodbremsen" variant="secondary">
                    Få hjelp i kveld
                  </LinkButton>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-primary-soft)] p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text)]">
                    I DAG
                  </p>
                  <h2 className="depotet-subtitle mt-4">
                    I DAG er hovedflaten i Depotet.
                  </h2>
                  <p className="mt-4 text-[var(--color-text)]">
                    Den gir ikke en liste med valg.
                  </p>
                  <p className="mt-3 text-[var(--color-text)]">
                    Den gir én konkret handling.
                  </p>
                  <p className="mt-4 rounded-[20px] bg-[var(--color-surface)] px-4 py-4 text-[var(--color-text)]">
                    “I dag: Gi én beskjed. Vent ti sekunder før du gjentar.”
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="bg-[var(--color-surface-muted)] shadow-none">
                    <p className="font-semibold text-[var(--color-text)]">
                      Søndagsverkstedet
                    </p>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                      Søndagsverkstedet er en rolig ukentlig nullstilling.
                    </p>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                      Ikke for å måle deg. Ikke for å gi dårlig samvittighet.
                    </p>
                  </Card>
                  <Card className="bg-[var(--color-surface-muted)] shadow-none">
                    <p className="font-semibold text-[var(--color-text)]">
                      Verktøykassa
                    </p>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                      Verktøykassa er for dagene du har mer kapasitet.
                    </p>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                      Men den skal ikke stå i veien for det viktigste: Én
                      handling i dag.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Bro fra Nødbremsen til Depotet
              </p>
              <h2 className="depotet-subtitle mt-4">
                Depotet er laget for kontinuiteten etterpå.
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Nødbremsen kan hjelpe i kveld.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Men hvis det smeller igjen i morgen, trenger du mer enn en
                akuttknapp.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Depotet selger ikke mer innhold.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Depotet selger mindre kaos og tydeligere retning.
              </p>
            </Card>

            <Card className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Det smeller nå
              </p>
              <h2 className="depotet-subtitle mt-4">
                Når det smeller, trenger du ikke ti råd.
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Når det smeller, trenger du ikke ti råd.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Du trenger én handling som senker trykket.
              </p>
              <div className="mt-8">
                <LinkButton href="/det-smeller-na" variant="header-crisis">
                  Det smeller nå
                </LinkButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Kurs
              </p>
              <h2 className="depotet-subtitle mt-4">
                Hvor krasjer det oftest?
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Noen problemer trenger målrettet hjelp.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Temakursene er laget for konkrete situasjoner, som skjerm,
                morgen, legging og skole.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Alle kurs peker videre mot Depotet, fordi det som virker én gang
                må bli mulig å gjenta.
              </p>
              <div className="mt-8">
                <LinkButton href="/kurs" variant="secondary">
                  Kurs
                </LinkButton>
              </div>
            </Card>

            <div id="interesseliste">
              <Card className="p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Depotet
                </p>
                <h2 className="depotet-subtitle mt-4">
                  Sett meg på interesseliste
                </h2>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Trenger godkjent tekst fra innholdskilde.
                </p>
                <div className="mt-8">
                  <LinkButton href="#interesseliste" variant="primary">
                    Sett meg på interesseliste
                  </LinkButton>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
