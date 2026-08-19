import type { ReactNode } from "react";
import { ChevronDown, FileText, X } from "lucide-react";
import { IconChip } from "@/shared/ui/icon-chip";
import { formatDate, formatRemainingTime } from "@/shared/lib/date";
import { formatFullName } from "@/shared/lib";
import type { Homework } from "@/entities/homework";

type AssignmentCardProps = {
  assignment: Homework;
  isExpanded: boolean;
  onToggle: () => void;
  action?: ReactNode;
};

export function AssignmentCard({ assignment, isExpanded, onToggle, action }: AssignmentCardProps) {
  const remaining = assignment.due_date ? formatRemainingTime(assignment.due_date) : null;
  const isExpired = remaining === "Süresi doldu";
  const givenBy = formatFullName({
    first_name: assignment.created_by_first_name,
    last_name: assignment.created_by_last_name,
  });

  return (
    // `overflow-hidden` burada YOK bilerek — bir sticky ata'sında overflow hidden/clip
    // olursa tarayıcı sticky'yi o ata'nın kutusuna hapseder, header artık sayfa
    // scroll'una göre üstte sabit kalamaz. Köşe yuvarlaklığı header/panel'in kendi
    // `rounded-t-2xl`/`rounded-b-2xl` sınıflarıyla (aynı `bg-bg` rengiyle) sağlanıyor.
    <li className="rounded-2xl bg-bg transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
      <div
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className={`flex cursor-pointer items-start justify-between gap-4 rounded-t-2xl px-5 py-4 hover:bg-bg-alt ${
          isExpanded ? "sticky top-0 z-10 bg-bg" : ""
        }`}
      >
        <div className="flex min-w-0 items-start gap-3">
          <IconChip icon={FileText} />
          <div className="min-w-0">
            <p
              className={`font-medium text-text ${isExpanded ? "break-words" : "truncate text-[0.9rem]"}`}
            >
              {assignment.title}
            </p>
            {!isExpanded && assignment.description && (
              <p className="mt-1 line-clamp-2 break-words text-[0.8rem] text-text-muted">
                {assignment.description}
              </p>
            )}
            {!isExpanded && assignment.due_date && (
              <div className="mt-2 flex items-center gap-2 text-[0.75rem]">
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
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {isExpanded ? (
            <button
              onClick={onToggle}
              aria-label="Kapat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface hover:text-text"
            >
              <X size={16} />
            </button>
          ) : (
            <>
              {action}
              <ChevronDown size={16} className="text-text-muted" />
            </>
          )}
        </div>
      </div>

      {/* grid-rows 0fr→1fr tekniği: içerik hep DOM'da, yükseklik animasyonu için
          gerçek height:auto ölçümüne gerek yok — tarayıcı bu grid geçişini animasyonlar. */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-4 rounded-b-2xl px-5 pb-5 pl-[3.25rem]">
            <div className="flex flex-wrap items-center gap-2 text-[0.8rem]">
              <span className="text-text-muted">Ödevi veren: {givenBy}</span>
              {assignment.due_date && (
                <>
                  <span className="text-text-muted">
                    Teslim: {formatDate(assignment.due_date)}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ${
                      isExpired ? "bg-danger-bg text-danger" : "bg-primary-tint text-primary"
                    }`}
                  >
                    {remaining}
                  </span>
                </>
              )}
            </div>

            {assignment.description && (
              <p className="whitespace-pre-line break-words text-[0.9rem] leading-relaxed text-text">
                {assignment.description}
              </p>
            )}

            {action && <div>{action}</div>}
          </div>
        </div>
      </div>
    </li>
  );
}
