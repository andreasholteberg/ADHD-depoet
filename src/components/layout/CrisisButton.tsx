import { LinkButton } from "@/components/shared/Button";

type CrisisButtonProps = {
  className?: string;
};

export function CrisisButton({ className }: CrisisButtonProps) {
  return (
    <LinkButton
      className={className}
      href="/det-smeller-na"
      variant="header-crisis"
    >
      Det smeller nå
    </LinkButton>
  );
}
