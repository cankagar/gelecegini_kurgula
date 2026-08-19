"use client";

import { useRouter } from "next/navigation";
import { useClassroomQuery } from "@/entities/classroom";
import { useHomeworkQuery } from "@/entities/homework";
import { AssignmentList, ClassroomDetailShell } from "@/widgets/classroom-detail";
import { AttendanceTab } from "@/widgets/classroom-attendance";
import { ROUTES } from "@/shared/lib/routes";
import { PenIcon, SpinnerIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";

type DashboardAdminClassroomViewProps = {
  classroomId: string;
};

export function DashboardAdminClassroomView({ classroomId }: DashboardAdminClassroomViewProps) {
  const router = useRouter();
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);
  const { data: homework = [] } = useHomeworkQuery(classroomId);

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
              className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text"
            >
              <PenIcon size={14} />
              Düzenle
            </button>
          }
          assignmentsContent={<AssignmentList assignments={homework} />}
          attendanceContent={<AttendanceTab classroom={classroom} classroomId={classroomId} />}
        />
      )}
    </div>
  );
}
