"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClassroomQuery } from "@/entities/classroom";
import { PenIcon, SpinnerIcon } from "@/shared/ui/icons";

const ROLE_LABELS: Record<string, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

type DashboardAdminClassroomViewProps = {
  classroomId: string;
};

export function DashboardAdminClassroomView({ classroomId }: DashboardAdminClassroomViewProps) {
  const router = useRouter();
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/dashboard/admin/classrooms"
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
              <div className="flex items-center gap-2.5">
                <h1 className="font-heading text-xl font-bold text-text tracking-[-0.02em]">
                  {classroom.name}
                </h1>
                {classroom.closed_at ? (
                  <span className="rounded-full bg-danger-bg px-2 py-0.5 text-[0.75rem] font-medium text-danger">
                    Kapandı · {formatDate(classroom.closed_at)}
                  </span>
                ) : (
                  <span className="rounded-full bg-success-bg px-2 py-0.5 text-[0.75rem] font-medium text-success">
                    Aktif
                  </span>
                )}
              </div>
              <p className="mt-1 text-[0.85rem] text-text-muted">{classroom.members.length} üye</p>
            </div>

            <button
              onClick={() => router.push(`/dashboard/admin/classrooms/${classroomId}/edit`)}
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
            >
              <PenIcon size={14} />
              Düzenle
            </button>
          </div>

          <div className="px-8 py-6">
            <h2 className="text-[0.9rem] font-medium text-text">Üyeler</h2>

            {classroom.members.length === 0 ? (
              <p className="mt-3 text-[0.85rem] text-text-muted">Henüz üye yok.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border rounded-md border border-border">
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
        </div>
      )}
    </div>
  );
}
