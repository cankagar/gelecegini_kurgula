"use client";

import Link from "next/link";
import { useMyClassroomsQuery } from "@/entities/classroom";
import { SpinnerIcon } from "@/shared/ui/icons";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR");
}

export function DashboardTeacherClassesView() {
  const { data: classrooms, isLoading, isError } = useMyClassroomsQuery();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-heading text-2xl font-bold text-text tracking-[-0.02em]">Sınıflarım</h1>
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
        <ul className="mt-6 divide-y divide-[#EAEAEA] rounded-md border border-[#EAEAEA]">
          {classrooms.map((classroom) => (
            <li key={classroom.id}>
              <Link
                href={`/dashboard/teacher/classes/${classroom.id}`}
                className="flex items-center justify-between px-4 py-3 transition-colors duration-150 hover:bg-[#F0EFEC]"
              >
                <span className="text-[0.9rem] font-medium text-text">{classroom.name}</span>
                <span className="text-[0.8rem] text-text-muted">
                  {formatDate(classroom.created_at)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
