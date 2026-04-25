import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const dynamic = "force-static";

export default function VeiledningPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-14">
        <Container>
          <Card className="p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Veiledning
                </p>
                <h1 className="depotet-title mt-4">
                  Veiledning når dere trenger mer støtte.
                </h1>
                <p className="mt-5 text-[var(--color-text-muted)]">
                  Noen ganger holder det ikke med et kurs eller en daglig
                  handling.
                </p>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Da kan veiledning hjelpe med å justere strukturen rundt
                  barnet, språket dere bruker og forventningene i hverdagen.
                </p>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Dette er ikke terapi. Dette er operativ veiledning for å
                  justere hverdagen rundt barnet.
                </p>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Det er ikke behandling av barnet.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href="/depotet" variant="primary">
                    Depotet
                  </LinkButton>
                  <LinkButton href="/det-smeller-na" variant="secondary">
                    Det smeller nå
                  </LinkButton>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    1:1 foreldreveiledning
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    For foreldre som trenger hjelp til å gjøre systemet praktisk
                    i egen hverdag.
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Fokus er ikke lange analyser. Fokus er hva dere gjør neste
                    gang det låser seg.
                  </p>
                </Card>
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    Begrenset familieveiledning
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    For familier som har kommet inn i fastlåste mønstre.
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Tilbudet skal være begrenset og tydelig.
                  </p>
                </Card>
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    Profesjonelle
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    For skole, PPT, barnevern og behandlere kan rammeverket
                    brukes som et praktisk språk for barn som mangler bremser i
                    krevende situasjoner.
                  </p>
                </Card>
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
                Depotet
              </p>
              <h2 className="depotet-subtitle mt-4">
                Depotet gir deg én tydelig retning hver dag.
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Depotet gir deg én tydelig retning hver dag.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Depotet er ikke et kursbibliotek.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Det er et system for de dagene du ikke orker å finne ut av alt
                selv.
              </p>
              <div className="mt-8">
                <LinkButton href="/depotet" variant="primary">
                  Depotet
                </LinkButton>
              </div>
            </Card>

            <Card className="p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Veiledning
              </p>
              <h2 className="depotet-subtitle mt-4">
                Veiledning når dere trenger mer støtte.
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Det skal fremstilles som støtte for dem som trenger mer.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Trenger godkjent tekst fra innholdskilde.
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
                Profesjonelle
              </p>
              <h2 className="depotet-subtitle mt-4">
                Et praktisk språk i krevende situasjoner.
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                For skole, PPT, barnevern og behandlere kan rammeverket brukes
                som et praktisk språk for barn som mangler bremser i krevende
                situasjoner.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Målet er ikke å gjøre alle barn like.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Målet er å forstå hva som skjer før tiltakene blir for stramme,
                for sene eller for mange.
              </p>
            </Card>

            <div id="kontakt-placeholder">
              <Card className="p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Veiledning
                </p>
                <h2 className="depotet-subtitle mt-4">Kom i kontakt</h2>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Trenger godkjent tekst fra innholdskilde.
                </p>
                <div className="mt-8">
                  <LinkButton href="#kontakt-placeholder" variant="secondary">
                    Kommer snart
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
