import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  muted?: boolean;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Section({
  children,
  className,
  contentClassName,
  muted = false,
}: SectionProps) {
  return (
    <section
      className={cn(
        "depotet-section",
        muted && "bg-[var(--color-surface-muted)]",
        className,
      )}
    >
      <div className={cn("depotet-container", contentClassName)}>{children}</div>
    </section>
  );
}
