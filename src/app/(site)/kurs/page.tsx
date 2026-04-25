import { LinkButton } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";

export const dynamic = "force-static";

const courses = [
  {
    title: "Skjerm",
    body: "For overgangene som blir til kamp.",
    detail:
      "Når barnet ikke klarer å avslutte, trenger du mer enn en beskjed. Du trenger en overgang som barnet faktisk kan tåle.",
  },
  {
    title: "Morgen",
    body: "For starten på dagen som sporer av før dere kommer ut døren.",
    detail:
      "Målet er ikke en perfekt morgen. Målet er færre krasj og tydeligere rekkefølge.",
  },
  {
    title: "Legging",
    body: "For kveldene der barnet ikke lander.",
    detail:
      "Når alle er slitne, blir små krav fort store konflikter. Her handler det om å senke trykket før natten blir en ny kamp.",
  },
  {
    title: "Skole",
    body: "For møtene, meldingene og bekymringen rundt barnet.",
    detail:
      "Når skole og hjem trekker i ulik retning, trenger barnet voksne som forstår samme kart.",
  },
  {
    title: "Sjåførens eget maskineri",
    body: "For deg som merker at dine egne bremser også blir slitne.",
    detail:
      "Det er vanskelig å være rolig støtte når du selv er tom. Her starter vi med det du faktisk kan gjøre i øyeblikket.",
  },
];

export default function KursPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-14">
        <Container>
          <Card className="p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Kurs
                </p>
                <h1 className="depotet-title mt-4">Hvor krasjer det oftest?</h1>
                <p className="mt-5 max-w-2xl text-[var(--color-text-muted)]">
                  Noen problemer trenger målrettet hjelp.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  Temakursene er laget for konkrete situasjoner, som skjerm,
                  morgen, legging og skole.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  De løser ikke hele hverdagen.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  De gir deg et grep du kan bruke der det krasjer mest.
                </p>
                <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
                  Alle kurs peker videre mot Depotet, fordi det som virker én
                  gang må bli mulig å gjenta.
                </p>
              </div>

              <div className="space-y-4">
                <Card className="bg-[var(--color-primary-soft)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">Depotet</p>
                  <p className="mt-2 text-[var(--color-text)]">
                    Depotet gir deg én tydelig retning hver dag.
                  </p>
                  <p className="mt-2 text-[var(--color-text)]">
                    Dette løser én situasjon. Depotet hjelper deg å holde retningen over tid.
                  </p>
                </Card>
                <Card className="bg-[var(--color-surface-muted)] shadow-none">
                  <p className="font-semibold text-[var(--color-text)]">
                    Det smeller nå
                  </p>
                  <p className="mt-2 text-[var(--color-text-muted)]">
                    Når det smeller, trenger du ikke ti råd.
                  </p>
                  <div className="mt-6">
                    <LinkButton href="/det-smeller-na" variant="header-crisis">
                      Det smeller nå
                    </LinkButton>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.title} className="p-8">
                <p className="font-semibold text-[var(--color-text)]">
                  {course.title}
                </p>
                <p className="mt-3 text-[var(--color-text-muted)]">
                  {course.body}
                </p>
                <p className="mt-3 text-[var(--color-text-muted)]">
                  {course.detail}
                </p>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Dette løser én situasjon. Depotet hjelper deg å holde
                  retningen over tid.
                </p>
                <div className="mt-6">
                  <LinkButton href="#kurs-placeholder" variant="secondary">
                    Kommer snart
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
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
                Depotet er ikke et kursbibliotek.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Det er et system for de dagene du ikke orker å finne ut av alt
                selv.
              </p>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Du åpner Depotet, får én handling for dagen, gjør den så godt du
                kan, og går videre.
              </p>
              <div className="mt-8">
                <LinkButton href="/depotet" variant="primary">
                  Depotet
                </LinkButton>
              </div>
            </Card>

            <div id="kurs-placeholder">
              <Card className="p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Kurs
                </p>
                <h2 className="depotet-subtitle mt-4">Kommer snart</h2>
                <p className="mt-4 text-[var(--color-text-muted)]">
                  Trenger godkjent tekst fra innholdskilde.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
