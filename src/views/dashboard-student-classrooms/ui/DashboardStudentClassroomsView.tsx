"use client";

import { ClassroomGrid, useMyClassroomsQuery } from "@/entities/classroom";
import { ROUTES } from "@/shared/lib/routes";
import { SpinnerIcon } from "@/shared/ui/icons";

export function DashboardStudentClassroomsView() {
  const { data: classrooms, isLoading, isError } = useMyClassroomsQuery();

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">Sınıflarım</h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">Dahil olduğun sınıflar burada listelenir.</p>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Sınıflar yüklenemedi.</p>}

      {!isLoading && !isError && classrooms?.length === 0 && (
        <p className="mt-8 text-[0.9rem] text-text-muted">Henüz bir sınıfa dahil değilsin.</p>
      )}

      {classrooms && classrooms.length > 0 && (
        <div className="mt-6">
          <ClassroomGrid classrooms={classrooms} getHref={ROUTES.STUDENT.CLASSROOM_DETAIL} />
        </div>
      )}
    </div>
  );
}
