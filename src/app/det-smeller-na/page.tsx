import { LinkButton } from "@/components/shared/Button";

export const dynamic = "force-static";

export default function CrisisPage() {
  return (
    <main className="min-h-screen bg-[var(--color-crisis-bg)] text-[var(--color-crisis-text)]">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-10">
        <section className="max-w-2xl">
          <h1 className="text-[clamp(2.4rem,10vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">
            Stopp opp.
          </h1>

          <div className="mt-8 space-y-5 text-[clamp(1.15rem,3vw,1.5rem)] leading-[1.45] text-[var(--color-crisis-muted)]">
            <p>Pust.</p>
            <p>Si rolig:</p>
            <p className="text-[var(--color-crisis-text)]">
              “Dette ble for mye. Vi tar en pause.”
            </p>
            <p>Gå unna i noen minutter.</p>
            <p>Når du har gått unna, kan du ta neste steg.</p>
          </div>

          <div className="mt-10">
            <LinkButton href="#etter" variant="crisis">
              Jeg har gått unna. Hva gjør jeg nå?
            </LinkButton>
          </div>
        </section>

        <section className="mt-20 max-w-xl border-t border-white/10 pt-10" id="etter">
          <div className="space-y-4 text-[clamp(1.15rem,3vw,1.5rem)] leading-[1.45] text-[var(--color-crisis-muted)]">
            <p className="text-[var(--color-crisis-text)]">Dette var nødbremsen.</p>
            <p>Vil du ha hjelp til resten av kvelden?</p>
          </div>

          <div className="mt-8">
            <LinkButton href="/nodbremsen" variant="crisis">
              Se Nødbremsen
            </LinkButton>
          </div>
        </section>
      </div>
    </main>
  );
}
