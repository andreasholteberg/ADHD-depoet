import Link from "next/link";

import { Container } from "@/components/shared/Container";

const footerLinks = [
  { href: "/", label: "Depotet" },
  { href: "/det-smeller-na", label: "Det smeller nå" },
  { href: "/nodbremsen", label: "Få hjelp i kveld" },
  { href: "/logg-inn", label: "Logg inn" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
              Depotet
            </p>
            <p className="depotet-muted mt-2">
              Phase 1 bygges som en enkel, statisk og rolig brukerflate.
            </p>
          </div>

          <nav aria-label="Footer-navigasjon" className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                className="text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-150 hover:text-[var(--color-text)]"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
