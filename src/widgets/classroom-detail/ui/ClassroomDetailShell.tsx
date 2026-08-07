"use client";

import { useState, type ReactNode } from "react";
import type { ClassroomWithMembers } from "@/entities/classroom";
import { ROLE_LABELS } from "@/entities/user";
import { formatDateTime } from "@/shared/lib/date";
import { formatFullName } from "@/shared/lib";

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
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex items-start justify-between rounded-2xl bg-surface/50 px-6 py-5">
        <div>
          <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
            {classroom.name}
          </h1>
          <p className="mt-1 text-[0.9rem] text-text-muted">{classroom.members.length} üye</p>
        </div>

        {headerActions && <div className="flex shrink-0 items-center gap-2">{headerActions}</div>}
      </div>

      <div className="rounded-2xl bg-surface/50">
        <div className="flex gap-1 p-2">
          <button
            onClick={() => setTab("assignments")}
            className={`rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              tab === "assignments" ? "bg-bg text-text" : "text-text-muted hover:text-text"
            }`}
          >
            Ödevler
          </button>
          <button
            onClick={() => setTab("members")}
            className={`rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              tab === "members" ? "bg-bg text-text" : "text-text-muted hover:text-text"
            }`}
          >
            Üyeler
          </button>
        </div>

        {tab === "assignments" && <div className="px-6 pb-6">{assignmentsContent}</div>}

        {tab === "members" && (
          <div className="px-6 pb-6">
            {classroom.members.length === 0 ? (
              <p className="text-[0.85rem] text-text-muted">Henüz üye yok.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {classroom.members.map((member) => (
                  <li key={member.member_id} className="rounded-xl bg-bg px-4 py-3 text-[0.85rem]">
                    <span className="font-medium text-text">{formatFullName(member, "İsimsiz")}</span>{" "}
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
    </div>
  );
}
