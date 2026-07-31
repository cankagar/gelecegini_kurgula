import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { IconChip } from "@/shared/ui/icon-chip";

type IconActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  children: React.ReactNode;
};

export function IconActionButton({ icon, children, className = "", ...props }: IconActionButtonProps) {
  return (
    <button
      {...props}
      className={`group inline-flex items-center gap-2 text-[0.85rem] font-medium text-text-muted transition-colors duration-150 hover:text-text disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <IconChip icon={icon} />
      {children}
    </button>
  );
}
