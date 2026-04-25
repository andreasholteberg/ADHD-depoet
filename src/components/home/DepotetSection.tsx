import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function DepotetSection() {
  return (
    <Section>
      <Container>
        <Card className="p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Depotet
              </p>
              <h2 className="depotet-subtitle mt-4">
                Depotet gir deg én tydelig retning hver dag.
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                Depotet er ikke et kursbibliotek. Det er et system for de
                dagene du ikke orker å finne ut av alt selv.
              </p>
              <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                Målet er ikke perfekte foreldre. Målet er litt mindre kaos,
                litt raskere reparasjon og litt mer retning over tid.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="bg-[var(--color-surface-muted)] shadow-none">
                <p className="font-semibold text-[var(--color-text)]">I DAG</p>
                <p className="mt-2 text-[var(--color-text-muted)]">
                  I DAG er hovedflaten i Depotet. Den gir ikke en liste med
                  valg. Den gir én konkret handling.
                </p>
              </Card>
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
                  For dagene du har mer kapasitet. Men den skal ikke stå i veien
                  for det viktigste: Én handling i dag.
                </p>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <LinkButton href="/depotet" variant="primary">
              Depotet
            </LinkButton>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
