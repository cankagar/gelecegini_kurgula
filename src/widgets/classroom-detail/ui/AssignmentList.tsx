"use client";

import { useState, type ReactNode } from "react";
import type { Homework } from "@/entities/homework";
import { AssignmentCard } from "./AssignmentCard";
import { AssignmentDetailPanel } from "./AssignmentDetailPanel";

type AssignmentListProps = {
  assignments: Homework[];
  emptyLabel?: string;
  renderAction?: (assignment: Homework) => ReactNode;
};

const TRANSITION_MS = 300;

export function AssignmentList({
  assignments,
  emptyLabel = "Henüz ödev verilmedi.",
  renderAction,
}: AssignmentListProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openAssignment = assignments.find((a) => a.id === openId) ?? null;

  // Kapanış animasyonu boyunca panel içeriği ekranda kalsın diye son açık olan
  // ödevi ayrıca tutuyoruz — openAssignment null olduğu an içerik kaybolursa
  // panel boş halde sağa doğru kayar, bu görünüşü bozar. Sadece "geri" tıklanınca
  // (bir event handler içinde) set ediliyor — render sırasında state/ref'e dokunulmuyor.
  const [closingAssignment, setClosingAssignment] = useState<Homework | null>(null);
  const renderedAssignment = openAssignment ?? closingAssignment;

  function handleBack() {
    if (openAssignment) setClosingAssignment(openAssignment);
    setOpenId(null);
    setTimeout(() => setClosingAssignment(null), TRANSITION_MS);
  }

  if (assignments.length === 0) {
    return <p className="py-8 text-center text-[0.85rem] text-text-muted">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-hidden">
      <div
        className="flex w-[200%] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: openAssignment ? "translateX(-50%)" : "translateX(0%)" }}
      >
        <div className="w-1/2 shrink-0 pr-4">
          <ul className="flex flex-col gap-2">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onOpen={() => setOpenId(assignment.id)}
              />
            ))}
          </ul>
        </div>

        <div className="w-1/2 shrink-0 pl-4">
          {renderedAssignment && (
            <AssignmentDetailPanel
              assignment={renderedAssignment}
              onBack={handleBack}
              action={renderAction?.(renderedAssignment)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
