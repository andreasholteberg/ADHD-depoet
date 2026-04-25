import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function GuideSection() {
  return (
    <Section muted>
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Kort forklaring
            </p>
            <h2 className="depotet-subtitle mt-4">
              Mange konflikter handler ikke først og fremst om vilje.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)]">
              De handler om kapasitet. Barnet kan forstå beskjeden, men likevel
              mangle bremser akkurat når det gjelder.
            </p>
            <p className="mt-4 text-[var(--color-text-muted)]">
              Det betyr ikke at alt skal godtas. Det betyr at den voksne må
              starte med regulering før forklaring.
            </p>
          </Card>

          <Card className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Bok
            </p>
            <h2 className="depotet-subtitle mt-4">
              Boken forklarer hvorfor det krasjer.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)]">
              Trenger godkjent tekst fra innholdskilde.
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
