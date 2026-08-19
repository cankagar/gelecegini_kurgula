"use client";

import { useState } from "react";
import { AttendanceStatusBadge, type MyAttendanceRecord } from "@/entities/attendance";
import { formatDate } from "@/shared/lib/date";
import { Pagination } from "@/shared/ui/pagination";
import { SpinnerIcon } from "@/shared/ui/icons";
import { Modal, ModalTitle } from "@/shared/ui/modal";

const PAGE_SIZE = 8;

type AttendanceHistoryPanelProps = {
  records: MyAttendanceRecord[] | undefined;
  isLoading: boolean;
  isError: boolean;
  emptyMessage: string;
  errorMessage?: string;
};

export function AttendanceHistoryPanel({
  records,
  isLoading,
  isError,
  emptyMessage,
  errorMessage = "Devamsızlık geçmişi yüklenemedi.",
}: AttendanceHistoryPanelProps) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<MyAttendanceRecord | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center rounded-2xl bg-surface/50 py-8 text-text-muted">
        <SpinnerIcon className="animate-spin" size={20} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl bg-surface/50 px-5 py-8 text-center text-[0.85rem] text-text-muted">
        {errorMessage}
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className="rounded-2xl bg-surface/50 px-5 py-8 text-center text-[0.85rem] text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  const totalPages = Math.ceil(records.length / PAGE_SIZE);
  const pageRecords = records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface/50 p-5">
      <ul className="flex flex-col gap-1.5">
        {pageRecords.map((record, i) => (
          <li key={`${record.classroom_id}-${record.session_date}-${i}`}>
            <button
              type="button"
              onClick={() => setSelected(record)}
              className="flex w-full items-center justify-between gap-4 rounded-xl bg-bg px-4 py-3 text-left text-[0.85rem] transition-colors duration-150 hover:bg-surface"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-text">{record.classroom_name}</p>
                <p className="mt-0.5 text-text-muted">
                  {formatDate(record.session_date)}
                  {record.note ? ` — ${record.note}` : ""}
                </p>
              </div>
              <AttendanceStatusBadge status={record.status} />
            </button>
          </li>
        ))}
      </ul>

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        ariaLabel={selected?.classroom_name}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="border-b border-border pb-4">
              <ModalTitle>{selected.classroom_name}</ModalTitle>
            </div>

            <div className="flex items-center justify-between gap-4 text-[0.9rem]">
              <span className="text-text-muted">{formatDate(selected.session_date)}</span>
              <AttendanceStatusBadge status={selected.status} />
            </div>

            <div>
              <p className="text-[0.8rem] font-medium text-text-muted">Not</p>
              <p className="mt-1 whitespace-pre-line text-[0.9rem] text-text">
                {selected.note || "—"}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
