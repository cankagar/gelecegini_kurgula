"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ClassroomMember } from "@/entities/classroom";
import {
  useAttendanceSessionByDateQuery,
  useTakeAttendanceMutation,
  type AttendanceStatus,
} from "@/entities/attendance";
import { ApiError } from "@/shared/api";
import { SpinnerIcon } from "@/shared/ui/icons";
import { AttendanceStudentRow } from "./AttendanceStudentRow";

type RosterEntry = { status: AttendanceStatus | null; note: string };

type AttendanceRosterFormProps = {
  classroomId: string;
  students: ClassroomMember[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  searchQuery?: string;
};

export function AttendanceRosterForm({
  classroomId,
  students,
  selectedDate,
  onDateChange,
  searchQuery = "",
}: AttendanceRosterFormProps) {
  const sessionQuery = useAttendanceSessionByDateQuery(classroomId, selectedDate);
  const takeAttendance = useTakeAttendanceMutation(classroomId);
  // Sadece kullanıcının bu oturumda fiilen değiştirdiği alanlar burada tutulur;
  // geri kalanı sunucudan gelen (veya varsayılan) değerden render sırasında
  // türetilir. Parent `selectedDate` değiştiğinde bu bileşeni `key` ile yeniden
  // mount ettiği için (bkz. AttendanceTab) tarih değişince state otomatik sıfırlanır.
  const [overrides, setOverrides] = useState<Record<string, Partial<RosterEntry>>>({});

  function getEntry(studentId: string): RosterEntry {
    const existing = sessionQuery.data?.records.find((r) => r.student_id === studentId);
    return {
      // Teacher henüz dokunmadıysa (ve düzenlenen bir oturumdan gelmiyorsa)
      // durum bilinçli olarak boş kalır — kart "işaretlendi" listesine ancak
      // öğretmen fiilen Geldi/Gelmedi seçince iner.
      status: overrides[studentId]?.status ?? existing?.status ?? null,
      note: overrides[studentId]?.note ?? existing?.note ?? "",
    };
  }

  function updateEntry(studentId: string, patch: Partial<RosterEntry>) {
    setOverrides((prev) => ({ ...prev, [studentId]: { ...getEntry(studentId), ...patch } }));
  }

  function handleSave() {
    takeAttendance.mutate({
      session_date: selectedDate,
      records: students.map((student) => {
        const entry = getEntry(student.member_id);
        // Öğretmen bir öğrenciye hiç dokunmadıysa kayıt sırasında "Geldi"
        // varsayılır — istisnaları (Gelmedi) işaretlemek yeterli olsun diye.
        return {
          student_id: student.member_id,
          status: entry.status ?? "present",
          note: entry.note.trim() || null,
        };
      }),
    });
  }

  // Arama sadece görünümü filtreler — kaydet, arama kutusundan bağımsız
  // olarak `students` (tüm sınıf) üzerinden çalışır.
  const visibleStudents = students.filter((student) => {
    const fullName = `${student.first_name ?? ""} ${student.last_name ?? ""}`.toLowerCase();
    return fullName.includes(searchQuery.trim().toLowerCase());
  });

  // İşaretlenmemiş öğrenciler üstte, işaretlenenler altta toplanır — her
  // grup içinde orijinal sıra korunur (stabil sort).
  const orderedStudents = [...visibleStudents].sort((a, b) => {
    const aMarked = getEntry(a.member_id).status !== null ? 1 : 0;
    const bMarked = getEntry(b.member_id).status !== null ? 1 : 0;
    return aMarked - bMarked;
  });
  const allMarked =
    students.length > 0 &&
    students.every((student) => getEntry(student.member_id).status !== null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="attendance-date" className="text-[0.85rem] text-text-muted">
            Tarih
          </label>
          <input
            id="attendance-date"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="rounded-md border border-border px-3 py-2 text-[0.85rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={students.length === 0 || takeAttendance.isPending || sessionQuery.isLoading}
          className="rounded-full bg-text px-4 py-2 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
        >
          {takeAttendance.isPending ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {takeAttendance.isError && (
        <p className="text-[0.8rem] text-danger">
          {takeAttendance.error instanceof ApiError
            ? takeAttendance.error.message
            : "Yoklama kaydedilemedi."}
        </p>
      )}

      {sessionQuery.isLoading && (
        <div className="flex justify-center py-8 text-text-muted">
          <SpinnerIcon className="animate-spin" size={18} />
        </div>
      )}

      {!sessionQuery.isLoading && students.length === 0 && (
        <p className="py-8 text-center text-[0.85rem] text-text-muted">
          Bu sınıfta henüz öğrenci yok.
        </p>
      )}

      {!sessionQuery.isLoading && students.length > 0 && (
        <ul className="flex flex-col gap-2">
          {allMarked && (
            <motion.li
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="rounded-2xl bg-success-bg px-5 py-4 text-center"
            >
              <p className="font-heading text-[1.2rem] font-bold text-success">
                Tüm yoklamalar alındı
              </p>
              <p className="mt-1 text-[0.85rem] text-success">Kaydetmeyi unutma!</p>
            </motion.li>
          )}

          {orderedStudents.map((student, index) => {
            const entry = getEntry(student.member_id);
            return (
              <AttendanceStudentRow
                key={student.member_id}
                student={student}
                status={entry.status}
                note={entry.note}
                isFirst={index === 0}
                onStatusChange={(status) => updateEntry(student.member_id, { status })}
                onNoteChange={(note) => updateEntry(student.member_id, { note })}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
