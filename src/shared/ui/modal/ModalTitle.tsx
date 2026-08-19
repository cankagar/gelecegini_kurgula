import type { ReactNode } from "react";

type ModalTitleProps = {
  children: ReactNode;
};

export function ModalTitle({ children }: ModalTitleProps) {
  return (
    <h2 className="break-words pr-8 font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
      {children}
    </h2>
  );
}
