"use client";

import { useState, type ReactNode } from "react";
import type { ClassroomMember, ClassroomWithMembers } from "@/entities/classroom";
import { formatFullName } from "@/shared/lib";
import { Avatar } from "@/shared/ui/avatar";
import { ClassroomTabBar, type ClassroomTab } from "./ClassroomTabBar";

type ClassroomDetailShellProps = {
  classroom: ClassroomWithMembers;
  headerActions?: ReactNode;
  assignmentsContent: ReactNode;
  /** Sadece öğretmen/admin view'leri geçer — verilmezse "Yoklama" tabı hiç görünmez. */
  attendanceContent?: ReactNode;
  /** Verilirse üye satırları tıklanabilir olur (örn. admin'de öğrenci detayına gitmek için). */
  onMemberClick?: (member: ClassroomMember) => void;
};

export function ClassroomDetailShell({
  classroom,
  headerActions,
  assignmentsContent,
  attendanceContent,
  onMemberClick,
}: ClassroomDetailShellProps) {
  const [tab, setTab] = useState<ClassroomTab>("assignments");

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-[1.6rem] font-bold text-text tracking-[-0.025em] sm:text-[1.9rem]">
            {classroom.name}
          </h1>
          <p className="mt-1.5 text-[0.9rem] text-text-muted">{classroom.members.length} üye</p>
        </div>

        {headerActions && <div className="flex shrink-0 items-center gap-2">{headerActions}</div>}
      </div>

      <ClassroomTabBar tab={tab} onTabChange={setTab} hasAttendance={!!attendanceContent} />

      {tab === "assignments" && assignmentsContent}

      {tab === "attendance" && attendanceContent}

      {tab === "members" &&
        (classroom.members.length === 0 ? (
          <p className="text-[0.85rem] text-text-muted">Henüz üye yok.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {classroom.members.map((member) => (
              <li
                key={member.member_id}
                onClick={onMemberClick ? () => onMemberClick(member) : undefined}
                className={`flex items-center gap-3 rounded-xl bg-bg px-4 py-3 text-[0.85rem] font-medium text-text ${
                  onMemberClick ? "cursor-pointer transition-colors duration-150 hover:bg-surface" : ""
                }`}
              >
                <Avatar name={formatFullName(member, "İsimsiz")} size={32} />
                {formatFullName(member, "İsimsiz")}
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}
