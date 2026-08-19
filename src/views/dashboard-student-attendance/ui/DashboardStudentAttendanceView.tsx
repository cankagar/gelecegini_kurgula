"use client";

import { useMyAttendanceQuery } from "@/entities/attendance";
import { AttendanceHistoryPanel } from "@/widgets/attendance-history";

export function DashboardStudentAttendanceView() {
  const { data: records, isLoading, isError } = useMyAttendanceQuery();

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
          Yoklamalarım
        </h1>
        <p className="text-[0.9rem] text-text-muted">
          Tüm sınıflardaki yoklama geçmişini görüntüle.
        </p>
      </div>

      <div className="mt-8">
        <AttendanceHistoryPanel
          records={records}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="Henüz bir yoklama kaydın yok."
          errorMessage="Yoklama geçmişi yüklenemedi."
        />
      </div>
    </div>
  );
}
