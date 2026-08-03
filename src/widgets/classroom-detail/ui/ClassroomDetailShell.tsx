"use client";

import { useState, type ReactNode } from "react";
import type { ClassroomWithMembers } from "@/entities/classroom";
import { ROLE_LABELS } from "@/entities/user";
import { formatDateTime } from "@/shared/lib/date";

type Tab = "assignments" | "members";

type ClassroomDetailShellProps = {
  classroom: ClassroomWithMembers;
  headerActions?: ReactNode;
  assignmentsContent: ReactNode;
};

export function ClassroomDetailShell({
  classroom,
  headerActions,
  assignmentsContent,
}: ClassroomDetailShellProps) {
  const [tab, setTab] = useState<Tab>("assignments");

  return (
    <div className="mt-6 rounded-md border border-border bg-bg">
      <div className="flex items-start justify-between border-b border-border px-8 py-6">
        <div>
          <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
            {classroom.name}
          </h1>
          <p className="mt-1 text-[0.9rem] text-text-muted">{classroom.members.length} üye</p>
        </div>

        {headerActions && <div className="flex shrink-0 items-center gap-2">{headerActions}</div>}
      </div>

      <div className="flex border-b border-border px-8">
        <button
          onClick={() => setTab("assignments")}
          className={`px-4 py-2.5 text-[0.85rem] font-medium border-b-2 transition-colors duration-150 ${
            tab === "assignments"
              ? "border-primary text-text"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          Ödevler
        </button>
        <button
          onClick={() => setTab("members")}
          className={`px-4 py-2.5 text-[0.85rem] font-medium border-b-2 transition-colors duration-150 ${
            tab === "members"
              ? "border-primary text-text"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          Üyeler
        </button>
      </div>

      {tab === "assignments" && <div className="px-8 py-6">{assignmentsContent}</div>}

      {tab === "members" && (
        <div className="px-8 py-6">
          {classroom.members.length === 0 ? (
            <p className="text-[0.85rem] text-text-muted">Henüz üye yok.</p>
          ) : (
            <ul className="divide-y divide-border rounded-md border border-border">
              {classroom.members.map((member) => (
                <li key={member.member_id} className="px-4 py-2.5 text-[0.85rem]">
                  <span className="font-medium text-text">{member.full_name ?? "İsimsiz"}</span>{" "}
                  <span className="text-text-muted">{member.email}</span>{" "}
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[0.75rem] font-medium text-text-muted">
                    {member.roles.map((r) => ROLE_LABELS[r] ?? r).join(", ")}
                  </span>
                  <p className="mt-0.5 text-[0.75rem] text-text-muted">
                    Katılım: {formatDateTime(member.joined_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
