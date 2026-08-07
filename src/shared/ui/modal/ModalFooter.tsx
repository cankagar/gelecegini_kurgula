import type { ReactNode } from "react";

type ModalFooterProps = {
  children: ReactNode;
};

export function ModalFooter({ children }: ModalFooterProps) {
  return <div className="mt-6 flex items-center justify-end gap-2">{children}</div>;
}
