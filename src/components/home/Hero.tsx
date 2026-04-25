import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export function Hero() {
  return (
    <Section className="pt-8 md:pt-14">
      <Container>
        <Card className="overflow-hidden p-8 md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Depotet
            </p>
            <h1 className="mt-4 text-[clamp(2.4rem,12vw,5rem)] leading-[0.95] tracking-[-0.04em] text-[var(--color-text)]">
              Når det smeller hjemme – hva gjør du da?
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-[var(--color-text)]">
              Du trenger ikke bli roligere. Du trenger noe å gjøre.
            </p>
            <p className="mt-5 max-w-2xl text-[var(--color-text-muted)]">
              Når barnet låser seg, eksploderer eller nekter å følge med, er
              det lett å miste oversikten. Depotet er laget for de øyeblikkene
              der du trenger én tydelig neste handling.
            </p>
          </div>

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
  );
}
