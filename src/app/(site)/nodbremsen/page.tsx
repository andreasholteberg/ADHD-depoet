import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const dynamic = "force-static";

export default function NodbremsenPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-14">
        <Container>
          <Card className="p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Nødbremsen
                </p>
                <h1 className="depotet-title mt-4">
                  Nødbremsen hjelper deg å stoppe konflikten før den tar over
                  hele kvelden.
                </h1>
                <p className="mt-5 max-w-2xl text-[var(--color-text-muted)]">
                  Når barnet er i alarm, virker ikke lange forklaringer.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  Nødbremsen gir deg en kort og konkret måte å stoppe opp, senke
                  trykket og komme deg ut av kampen før den gjør mer skade.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  Dette er ikke hele løsningen.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  Det er første hjelp når situasjonen allerede er i ferd med å
                  velte.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href="#kjop" variant="primary">
                    Kjøp Nødbremsen
                  </LinkButton>
                  <LinkButton href="/det-smeller-na" variant="secondary">
                    Det smeller nå
                  </LinkButton>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    Nødbremsen er førstehjelp.
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Den skal forstås som hjelp når kvelden holder på å velte.
                  </p>
                </Card>
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    Nødbremsen kan hjelpe i kveld.
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Men hvis det smeller igjen i morgen, trenger du mer enn en
                    akuttknapp.
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Nødbremsen
              </p>
              <h2 className="depotet-subtitle mt-4">
                Nødbremsen hjelper deg å stoppe konflikten før den tar over hele
                kvelden.
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Du får korte, konkrete steg for de øyeblikkene der konflikten er
                i ferd med å ta over.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Målet er ikke å forklare alt.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Målet er å hjelpe deg å stoppe opp, få litt avstand og gjøre det
                neste riktige litt enklere.
              </p>
            </Card>

            <Card className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Kort forklaring
              </p>
              <h2 className="depotet-subtitle mt-4">
                Mange konflikter handler ikke først og fremst om vilje.
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                De handler om kapasitet.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Barnet kan forstå beskjeden, men likevel mangle bremser akkurat
                når det gjelder.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Det betyr ikke at alt skal godtas.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Det betyr at den voksne må starte med regulering før forklaring.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
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
              <div className="mt-8">
                <LinkButton href="/depotet" variant="secondary">
                  Depotet
                </LinkButton>
              </div>
            </Card>

            <div id="kjop">
              <Card className="p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Nødbremsen
                </p>
                <h2 className="depotet-subtitle mt-4">
                  Kjøp Nødbremsen
                </h2>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Trenger godkjent tekst fra innholdskilde.
                </p>
                <div className="mt-8">
                  <LinkButton href="#kjop" variant="primary">
                    Kjøp Nødbremsen
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
