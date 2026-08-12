"use client";

import { ATTENDANCE_STATUS_LABELS, useMyAttendanceQuery } from "@/entities/attendance";
import { formatDate } from "@/shared/lib/date";
import { SpinnerIcon } from "@/shared/ui/icons";

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

      <div className="mt-8 overflow-hidden rounded-md border border-border">
        <table className="w-full text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-text-muted">
              <th className="px-4 py-2.5 font-medium">Sınıf</th>
              <th className="px-4 py-2.5 font-medium">Tarih</th>
              <th className="px-4 py-2.5 font-medium">Durum</th>
              <th className="px-4 py-2.5 font-medium">Not</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                  <SpinnerIcon className="mx-auto animate-spin" size={20} />
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                  Yoklama geçmişi yüklenemedi.
                </td>
              </tr>
            )}

            {!isLoading && !isError && records?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                  Henüz bir yoklama kaydın yok.
                </td>
              </tr>
            )}

            {records?.map((record, index) => (
              <tr
                key={`${record.classroom_id}-${record.session_date}-${index}`}
                className="border-b border-border text-text last:border-0"
              >
                <td className="px-4 py-2.5 font-medium">{record.classroom_name}</td>
                <td className="px-4 py-2.5 text-text-muted">{formatDate(record.session_date)}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.75rem] font-medium ${
                      record.status === "present"
                        ? "bg-success-bg text-success"
                        : "bg-danger-bg text-danger"
                    }`}
                  >
                    {ATTENDANCE_STATUS_LABELS[record.status]}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-text-muted">{record.note ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
