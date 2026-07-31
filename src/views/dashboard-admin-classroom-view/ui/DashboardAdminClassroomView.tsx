"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClassroomQuery } from "@/entities/classroom";
import { ROUTES } from "@/shared/lib/routes";
import { PenIcon, SpinnerIcon } from "@/shared/ui/icons";

const ROLE_LABELS: Record<string, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
};

type Tab = "assignments" | "members";

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

type DashboardAdminClassroomViewProps = {
  classroomId: string;
};

export function DashboardAdminClassroomView({ classroomId }: DashboardAdminClassroomViewProps) {
  const router = useRouter();
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);
  const [tab, setTab] = useState<Tab>("assignments");

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <Link
        href={`/dashboard${ROUTES.ADMIN.CLASSROOMS}`}
        className="text-[0.85rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
      >
        ← Sınıflar
      </Link>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Sınıf yüklenemedi.</p>}

      {classroom && (
        <div className="mt-6 rounded-md border border-border bg-bg">
          <div className="flex items-start justify-between border-b border-border px-8 py-6">
            <div>
              <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
                {classroom.name}
              </h1>
              <p className="mt-1 text-[0.9rem] text-text-muted">{classroom.members.length} üye</p>
            </div>

            <button
              onClick={() => router.push(`/dashboard${ROUTES.ADMIN.CLASSROOM_EDIT(classroomId)}`)}
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
            >
              <PenIcon size={14} />
              Düzenle
            </button>
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

          {tab === "assignments" && (
            <div className="px-8 py-10 text-center text-[0.85rem] text-text-muted">
              Henüz ödev verilmedi.
            </div>
          )}

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
                        {ROLE_LABELS[member.role] ?? member.role}
                      </span>
                      <p className="mt-0.5 text-[0.75rem] text-text-muted">
                        Katılım: {formatDate(member.joined_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
