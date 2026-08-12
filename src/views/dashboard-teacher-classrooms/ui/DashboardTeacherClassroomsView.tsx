"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMyClassroomsQuery } from "@/entities/classroom";
import { CreateClassroomModal } from "@/features/create-classroom";
import { SpinnerIcon } from "@/shared/ui/icons";
import { ROUTES } from "@/shared/lib/routes";
import { formatDate } from "@/shared/lib/date";

export function DashboardTeacherClassroomsView() {
  const router = useRouter();
  const { data: classrooms, isLoading, isError } = useMyClassroomsQuery();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">Sınıflarım</h1>
          <p className="mt-1.5 text-[0.9rem] text-text-muted">Dahil olduğun sınıflar burada listelenir.</p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-[0.85rem] font-semibold text-cta-text transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-hover active:scale-[0.98]"
        >
          Sınıf Oluştur
        </button>
      </div>

      <CreateClassroomModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(classroom) => {
          setIsCreateOpen(false);
          router.push(ROUTES.TEACHER.CLASSROOM_EDIT(classroom.id));
        }}
      />

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
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {classrooms.map((classroom) => (
            <Link
              key={classroom.id}
              href={ROUTES.TEACHER.CLASSROOM_DETAIL(classroom.id)}
              className="group flex aspect-[2/1] flex-col justify-between rounded-2xl border border-border bg-bg p-5 transition-colors duration-150 hover:border-primary-border hover:bg-surface"
            >
              <span className="font-heading text-[1.05rem] font-bold text-text tracking-[-0.02em] group-hover:text-primary">
                {classroom.name}
              </span>
              <span className="text-[0.78rem] text-text-muted">{formatDate(classroom.created_at)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
