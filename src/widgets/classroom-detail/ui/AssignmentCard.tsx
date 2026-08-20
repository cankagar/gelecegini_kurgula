import { ChevronRight, FileText } from "lucide-react";
import { IconChip } from "@/shared/ui/icon-chip";
import { formatDate, formatRemainingTime } from "@/shared/lib/date";
import type { Homework } from "@/entities/homework";

type AssignmentCardProps = {
  assignment: Homework;
  onOpen: () => void;
};

export function AssignmentCard({ assignment, onOpen }: AssignmentCardProps) {
  const remaining = assignment.due_date ? formatRemainingTime(assignment.due_date) : null;
  const isExpired = remaining === "Süresi doldu";

  return (
    <li
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group flex cursor-pointer items-center gap-3 rounded-xl bg-bg-alt px-4 py-3.5 transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface"
    >
      <IconChip icon={FileText} />

      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-base font-bold tracking-[-0.02em] text-text">
          {assignment.title}
        </p>
        {assignment.due_date && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="truncate text-[0.8rem] text-text-muted">
              Teslim: {formatDate(assignment.due_date)}
            </span>
            {remaining && (
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-medium ${
                  isExpired ? "bg-danger-bg text-danger" : "bg-primary-tint text-primary"
                }`}
              >
                {remaining}
              </span>
            )}
          </div>
        )}
      </div>

      <ChevronRight size={16} className="shrink-0 text-text-muted" />
    </li>
  );
}
