"use client";

import { useState, type ReactNode } from "react";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (assignments.length === 0) {
    return <p className="py-8 text-center text-[0.85rem] text-text-muted">{emptyLabel}</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          isExpanded={expandedId === assignment.id}
          onToggle={() =>
            setExpandedId((current) => (current === assignment.id ? null : assignment.id))
          }
          action={renderAction?.(assignment)}
        />
      ))}
    </ul>
  );
}
