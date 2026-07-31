import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IconChip } from "@/shared/ui/icon-chip";

type BackLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function BackLink({ href, children, className = "" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.85rem] font-medium text-text-muted transition-colors duration-150 hover:text-text ${className}`}
    >
      <IconChip icon={ArrowLeft} className="group-hover:-translate-x-0.5" />
      {children}
    </Link>
  );
}
