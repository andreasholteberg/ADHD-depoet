import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function FirstAidSection() {
  return (
    <Section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Det smeller nå
            </p>
            <h2 className="depotet-subtitle mt-4">Stopp opp. Pust.</h2>
            <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
              Si rolig: “Dette ble for mye. Vi tar en pause.” Gå unna i noen
              minutter. Når du har gått unna, kan du ta neste steg.
            </p>
            <div className="mt-8">
              <LinkButton href="/det-smeller-na" variant="header-crisis">
                Det smeller nå
              </LinkButton>
            </div>
          </Card>

          <Card className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Nødbremsen
            </p>
            <h2 className="depotet-subtitle mt-4">
              Nødbremsen hjelper deg å stoppe konflikten før den tar over hele
              kvelden.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)]">
              Dette er ikke hele løsningen. Det er første hjelp når situasjonen
              allerede er i ferd med å velte.
            </p>
            <div className="mt-8">
              <LinkButton href="/nodbremsen" variant="primary">
                Få hjelp i kveld
              </LinkButton>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
