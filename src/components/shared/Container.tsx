import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
  narrow = false,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "depotet-container",
        narrow && "depotet-content",
        className,
      )}
    >
      {children}
    </div>
  );
}
