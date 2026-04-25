import { DepotetSection } from "@/components/home/DepotetSection";
import { FirstAidSection } from "@/components/home/FirstAidSection";
import { GuideSection } from "@/components/home/GuideSection";
import { Hero } from "@/components/home/Hero";
import { ThreeStepModel } from "@/components/home/ThreeStepModel";
import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export default function Home() {
  return (
    <main>
      <Hero />
      <FirstAidSection />
      <ThreeStepModel />
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Kurs
              </p>
              <h2 className="depotet-subtitle mt-4">
                Hvor krasjer det oftest?
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Noen problemer trenger målrettet hjelp. Temakursene er laget for
                konkrete situasjoner, som skjerm, morgen, legging og skole.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                De løser ikke hele hverdagen. De gir deg et grep du kan bruke
                der det krasjer mest.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Alle kurs peker videre mot Depotet, fordi det som virker én gang
                må bli mulig å gjenta.
              </p>
            </Card>

            <Card className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Kurs
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Skjerm", "Morgen", "Legging", "Skole"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-4"
                  >
                    <p className="font-semibold text-[var(--color-text)]">
                      {item}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                      Dette løser én situasjon. Depotet hjelper deg å holde
                      retningen over tid.
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>
      <DepotetSection />
      <GuideSection />
      <Section>
        <Container>
          <Card className="p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Veiledning
                </p>
                <h2 className="depotet-subtitle mt-4">
                  Veiledning når dere trenger mer støtte.
                </h2>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Noen ganger holder det ikke med et kurs eller en daglig
                  handling.
                </p>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Dette er ikke terapi. Dette er operativ veiledning for å
                  justere hverdagen rundt barnet.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    1:1 foreldreveiledning
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Fokus er ikke lange analyser. Fokus er hva dere gjør neste
                    gang det låser seg.
                  </p>
                </Card>
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    Profesjonelle
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Et praktisk språk for barn som mangler bremser i krevende
                    situasjoner.
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
      <Section muted>
        <Container narrow>
          <Card className="p-8 md:p-10">
            <h2 className="depotet-subtitle mt-4">
              Du trenger ikke bli roligere. Du trenger noe å gjøre.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)]">
              Nødbremsen kan hjelpe i kveld.
            </p>
            <p className="mt-4 text-[var(--color-text-muted)]">
              Men hvis det smeller igjen i morgen, trenger du mer enn en
              akuttknapp.
            </p>
            <p className="mt-4 text-[var(--color-text-muted)]">
              Depotet er laget for kontinuiteten etterpå.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/det-smeller-na" variant="header-crisis">
                Det smeller nå
              </LinkButton>
              <LinkButton href="/nodbremsen" variant="secondary">
                Få hjelp i kveld
              </LinkButton>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
