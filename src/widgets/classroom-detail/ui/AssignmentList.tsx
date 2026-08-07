"use client";

import { useState, type ReactNode } from "react";
import { Modal, ModalTitle } from "@/shared/ui/modal";
import { formatDate, formatRemainingTime } from "@/shared/lib/date";
import type { Assignment } from "../model/types";
import { AssignmentCard } from "./AssignmentCard";

type AssignmentListProps = {
  assignments: Assignment[];
  emptyLabel?: string;
  renderAction?: (assignment: Assignment) => ReactNode;
};

export function AssignmentList({
  assignments,
  emptyLabel = "Henüz ödev verilmedi.",
  renderAction,
}: AssignmentListProps) {
  const [selected, setSelected] = useState<Assignment | null>(null);
  const remaining = selected?.dueDate ? formatRemainingTime(selected.dueDate) : null;

  if (assignments.length === 0) {
    return <p className="py-8 text-center text-[0.85rem] text-text-muted">{emptyLabel}</p>;
  }

  return (
    <>
      <ul className="flex flex-col gap-3">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            action={renderAction?.(assignment)}
            onOpen={() => setSelected(assignment)}
          />
        ))}
      </ul>

      <Modal
        variant="scroll"
        size="xl"
        open={selected !== null}
        onClose={() => setSelected(null)}
        ariaLabel={selected?.title}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="border-b border-border pb-4">
              <ModalTitle>{selected.title}</ModalTitle>
            </div>

            {selected.description && (
              <p className="whitespace-pre-line font-heading text-[1.05rem] font-medium leading-relaxed text-text">
                {selected.description}
              </p>
            )}

            {selected.dueDate && (
              <div className="flex items-center gap-2 text-[0.8rem]">
                <span className="text-text-muted">Teslim: {formatDate(selected.dueDate)}</span>
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    remaining === "Süresi doldu" ? "bg-danger-bg text-danger" : "bg-primary-tint text-primary"
                  }`}
                >
                  {remaining}
                </span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
