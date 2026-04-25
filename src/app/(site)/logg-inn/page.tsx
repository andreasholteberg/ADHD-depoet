import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const dynamic = "force-static";

export default function LoggInnPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-14">
        <Container>
          <Card className="p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Logg inn
                </p>
                <h1 className="depotet-title mt-4">Depotet åpner snart.</h1>
                <p className="mt-5 max-w-2xl text-[var(--color-text-muted)]">
                  Innlogging blir tilgjengelig når første versjon av systemet er
                  klar.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href="/depotet" variant="primary">
                    Depotet
                  </LinkButton>
                  <LinkButton href="/det-smeller-na" variant="header-crisis">
                    Det smeller nå
                  </LinkButton>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    Depotet
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Depotet gir deg én tydelig retning hver dag.
                  </p>
                </Card>
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    Det smeller nå
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Når det smeller, trenger du ikke ti råd.
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
