"use client";

import { AddMemberSearch } from "@/features/classroom-members";
import { ClassroomEditPanel } from "@/widgets/classroom-edit";
import { ROUTES } from "@/shared/lib/routes";

type DashboardAdminClassroomEditViewProps = {
  classroomId: string;
};

export function DashboardAdminClassroomEditView({
  classroomId,
}: DashboardAdminClassroomEditViewProps) {
  return (
    <ClassroomEditPanel
      classroomId={classroomId}
      backHref={ROUTES.ADMIN.CLASSROOM_DETAIL(classroomId)}
      classroomsHref={ROUTES.ADMIN.CLASSROOMS}
      extraSection={
        <div className="flex flex-col gap-6">
          <AddMemberSearch
            classroomId={classroomId}
            title="Öğretmen/Admin Ekle"
            description="Öğretmen veya admin rolündeki kullanıcıları ekleyebilirsin."
            eligibleRoles={["teacher", "admin"]}
          />
          <AddMemberSearch
            classroomId={classroomId}
            title="Öğrenci Ekle"
            description="Sistemde zaten kayıtlı olan bir öğrenciyi direkt sınıfa ekleyebilirsin."
            eligibleRoles={["student"]}
            searchRole="student"
          />
        </div>
      }
    />
  );
}
