import type { LucideIcon } from "lucide-react";

type IconChipProps = {
  icon: LucideIcon;
  size?: number;
  className?: string;
};

export function IconChip({ icon: Icon, size = 14, className = "" }: IconChipProps) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-primary-border group-hover:bg-primary-tint group-hover:text-primary ${className}`}
    >
      <Icon size={size} />
    </span>
  );
}
