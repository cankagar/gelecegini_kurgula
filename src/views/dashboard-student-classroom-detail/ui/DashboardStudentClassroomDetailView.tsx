"use client";

import { useClassroomQuery } from "@/entities/classroom";
import { ClassroomDetailShell } from "@/widgets/classroom-detail";
import { ROUTES } from "@/shared/lib/routes";
import { SpinnerIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";

type DashboardStudentClassroomDetailViewProps = {
  classroomId: string;
};

export function DashboardStudentClassroomDetailView({
  classroomId,
}: DashboardStudentClassroomDetailViewProps) {
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <BackLink href={ROUTES.STUDENT.CLASSROOMS}>Sınıflarım</BackLink>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Sınıf yüklenemedi.</p>}

      {classroom && (
        <ClassroomDetailShell
          classroom={classroom}
          assignmentsContent={
            <p className="text-center text-[0.85rem] text-text-muted">Henüz ödev verilmedi.</p>
          }
        />
      )}
    </div>
  );
}
