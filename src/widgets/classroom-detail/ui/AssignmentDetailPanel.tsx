import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { IconChip } from "@/shared/ui/icon-chip";
import { formatDate, formatRemainingTime } from "@/shared/lib/date";
import { formatFullName } from "@/shared/lib";
import type { Homework } from "@/entities/homework";

type AssignmentDetailPanelProps = {
  assignment: Homework;
  onBack: () => void;
  action?: ReactNode;
};

export function AssignmentDetailPanel({ assignment, onBack, action }: AssignmentDetailPanelProps) {
  const remaining = assignment.due_date ? formatRemainingTime(assignment.due_date) : null;
  const isExpired = remaining === "Süresi doldu";
  const givenBy = formatFullName({
    first_name: assignment.created_by_first_name,
    last_name: assignment.created_by_last_name,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-[0.85rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
        >
          <IconChip icon={ArrowLeft} className="group-hover:-translate-x-0.5" />
          Ödevler
        </button>

        {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
      </div>

      <h2 className="break-words font-heading text-xl font-bold tracking-[-0.02em] text-text">
        {assignment.title}
      </h2>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] font-medium text-text-muted">
        <span>Ödevi veren: {givenBy}</span>
        {assignment.due_date && (
          <>
            <span className="text-text-muted/40">•</span>
            <span>Teslim: {formatDate(assignment.due_date)}</span>
            {remaining && (
              <span
                className={`rounded-full px-2 py-0.5 font-medium ${
                  isExpired ? "bg-danger-bg text-danger" : "bg-primary-tint text-primary"
                }`}
              >
                {remaining}
              </span>
            )}
          </>
        )}
      </div>

      {assignment.description && (
        <p className="whitespace-pre-line break-words font-sans text-[0.9rem] leading-[1.7] text-text">
          {assignment.description}
        </p>
      )}
    </div>
  );
}
