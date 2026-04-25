import Link from "next/link";

import { CrisisButton } from "@/components/layout/CrisisButton";
import { LinkButton } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

const primaryLinks = [
  { href: "/nodbremsen", label: "Få hjelp i kveld" },
  { href: "/depotet", label: "Depotet" },
  { href: "/logg-inn", label: "Logg inn" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[color:rgba(250,247,241,0.94)] backdrop-blur-sm">
      <Container>
        <div className="flex flex-col gap-3 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              className="min-w-0 text-lg font-semibold tracking-tight text-[var(--color-text)]"
              href="/"
            >
              Depotet
            </Link>

            <div className="flex items-center gap-2 md:hidden">
              <CrisisButton className="shrink-0" />
            </div>

            <nav
              aria-label="Hovednavigasjon desktop"
              className="hidden items-center gap-2 md:flex"
            >
              <CrisisButton className="shrink-0" />
              {primaryLinks.map((link) => (
                <LinkButton key={link.href} href={link.href} variant="secondary">
                  {link.label}
                </LinkButton>
              ))}
            </nav>
          </div>

          <nav
            aria-label="Hovednavigasjon mobil"
            className="flex flex-wrap gap-2 md:hidden"
          >
            <LinkButton href="/nodbremsen" variant="secondary">
              Få hjelp i kveld
            </LinkButton>
            <LinkButton href="/depotet" variant="secondary">
              Depotet
            </LinkButton>
            <LinkButton href="/logg-inn" variant="secondary">
              Logg inn
            </LinkButton>
          </nav>

          <div className="hidden items-center justify-between gap-4 md:flex">
            <div className="depotet-muted">
              Rolig, enkel og mobil-først navigasjon for Phase 1.
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
