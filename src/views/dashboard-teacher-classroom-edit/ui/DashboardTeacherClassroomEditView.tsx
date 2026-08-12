"use client";

import { ClassroomEditPanel } from "@/widgets/classroom-edit";
import { ROUTES } from "@/shared/lib/routes";

type DashboardTeacherClassroomEditViewProps = {
  classroomId: string;
};

export function DashboardTeacherClassroomEditView({
  classroomId,
}: DashboardTeacherClassroomEditViewProps) {
  return (
    <ClassroomEditPanel
      classroomId={classroomId}
      backHref={ROUTES.TEACHER.CLASSROOM_DETAIL(classroomId)}
      classroomsHref={ROUTES.TEACHER.CLASSROOMS}
    />
  );
}
