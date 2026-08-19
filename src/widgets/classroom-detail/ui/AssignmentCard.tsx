import type { ReactNode } from "react";
import { FileText } from "lucide-react";
import { IconChip } from "@/shared/ui/icon-chip";
import { formatDate, formatRemainingTime } from "@/shared/lib/date";
import type { Homework } from "@/entities/homework";

type AssignmentCardProps = {
  assignment: Homework;
  action?: ReactNode;
  onOpen?: () => void;
};

export function AssignmentCard({ assignment, action, onOpen }: AssignmentCardProps) {
  const remaining = assignment.due_date ? formatRemainingTime(assignment.due_date) : null;
  const isExpired = remaining === "Süresi doldu";

  return (
    <li
      onClick={onOpen}
      className={`group rounded-2xl bg-bg px-5 py-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-bg-alt ${
        onOpen ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <IconChip icon={FileText} />
          <div>
            <p className="text-[0.9rem] font-medium text-text">{assignment.title}</p>
            {assignment.description && (
              <p className="mt-1 line-clamp-2 text-[0.8rem] text-text-muted">
                {assignment.description}
              </p>
            )}
          </div>
        </div>
        {action && (
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            {action}
          </div>
        )}
      </div>

      {assignment.due_date && (
        <div className="mt-3 flex items-center gap-2 pl-10 text-[0.75rem]">
          <span className="text-text-muted">Teslim: {formatDate(assignment.due_date)}</span>
          <span
            className={`rounded-full px-2 py-0.5 font-medium ${
              isExpired ? "bg-danger-bg text-danger" : "bg-primary-tint text-primary"
            }`}
          >
            {remaining}
          </span>
        </div>
      )}
    </li>
  );
}
