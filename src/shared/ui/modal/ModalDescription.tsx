import type { ReactNode } from "react";

type ModalDescriptionProps = {
  children: ReactNode;
};

export function ModalDescription({ children }: ModalDescriptionProps) {
  return <p className="mt-1.5 text-[0.85rem] text-text-muted">{children}</p>;
}
