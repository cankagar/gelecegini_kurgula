"use client";

import { useState, type ReactNode } from "react";
import { Modal, ModalTitle } from "@/shared/ui/modal";
import { formatDate, formatRemainingTime } from "@/shared/lib/date";
import { formatFullName } from "@/shared/lib";
import type { Homework } from "@/entities/homework";
import { AssignmentCard } from "./AssignmentCard";

type AssignmentListProps = {
  assignments: Homework[];
  emptyLabel?: string;
  renderAction?: (assignment: Homework) => ReactNode;
};

export function AssignmentList({
  assignments,
  emptyLabel = "Henüz ödev verilmedi.",
  renderAction,
}: AssignmentListProps) {
  const [selected, setSelected] = useState<Homework | null>(null);
  const remaining = selected?.due_date ? formatRemainingTime(selected.due_date) : null;

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

            <p className="text-[0.8rem] text-text-muted">
              Veren:{" "}
              {formatFullName({
                first_name: selected.created_by_first_name,
                last_name: selected.created_by_last_name,
              })}
            </p>

            {selected.description && (
              <p className="whitespace-pre-line break-words font-heading text-[1.05rem] font-medium leading-relaxed text-text">
                {selected.description}
              </p>
            )}

            {selected.due_date && (
              <div className="flex flex-wrap items-center gap-2 text-[0.8rem]">
                <span className="text-text-muted">Teslim: {formatDate(selected.due_date)}</span>
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
