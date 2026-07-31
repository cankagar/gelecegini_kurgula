"use client";

import { useRouter } from "next/navigation";
import { useClassroomQuery } from "@/entities/classroom";
import { ClassroomDetailShell } from "@/widgets/classroom-detail";
import { ROUTES } from "@/shared/lib/routes";
import { PenIcon, SpinnerIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";

type DashboardAdminClassroomViewProps = {
  classroomId: string;
};

export function DashboardAdminClassroomView({ classroomId }: DashboardAdminClassroomViewProps) {
  const router = useRouter();
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <BackLink href={ROUTES.ADMIN.CLASSROOMS}>Sınıflar</BackLink>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Sınıf yüklenemedi.</p>}

      {classroom && (
        <ClassroomDetailShell
          classroom={classroom}
          headerActions={
            <button
              onClick={() => router.push(ROUTES.ADMIN.CLASSROOM_EDIT(classroomId))}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
            >
              <PenIcon size={14} />
              Düzenle
            </button>
          }
          assignmentsContent={
            <p className="text-center text-[0.85rem] text-text-muted">Henüz ödev verilmedi.</p>
          }
        />
      )}
    </div>
  );
}
