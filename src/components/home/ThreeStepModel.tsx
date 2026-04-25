import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

const steps = [
  {
    title: "Forstå",
    body: "Få et språk for hvorfor det krasjer. Ikke for å unnskylde alt, men for å vite hvor du skal begynne.",
  },
  {
    title: "Håndtere",
    body: "Når det smeller, trenger du ikke ti råd. Du trenger én handling som senker trykket.",
  },
  {
    title: "Opprettholde",
    body: "Det som virker én kveld, må bli mulig å gjenta. Depotet gir deg én retning om gangen.",
  },
];

export function ThreeStepModel() {
  return (
    <Section muted>
      <Container>
        <div className="depotet-content">
          <h2 className="depotet-subtitle">Tre steg</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title}>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                {step.title}
              </p>
              <p className="mt-4 text-[var(--color-text)]">{step.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
