"use client";

import { useState } from "react";
import type { ClassroomWithMembers } from "@/entities/classroom";
import { todayLocalDateString } from "@/shared/lib/date";
import { CheckCircleIcon } from "@/shared/ui/icons";
import { SearchInput } from "@/shared/ui/search-input";
import { AttendanceRosterForm } from "./AttendanceRosterForm";

type AttendanceTabProps = {
  classroom: ClassroomWithMembers;
  classroomId: string;
};

export function AttendanceTab({ classroom, classroomId }: AttendanceTabProps) {
  const students = classroom.members.filter((m) => m.roles.includes("student"));
  const [selectedDate, setSelectedDate] = useState(todayLocalDateString());
  // Yoklama formu ilk açılışta gizli — öğretmen "Yoklama Al" ile bilinçli
  // olarak başlatmadan işaretleme ekranı gösterilmez.
  const [hasStarted, setHasStarted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Öğrenci ara..."
      />

      {hasStarted ? (
        <AttendanceRosterForm
          key={selectedDate}
          classroomId={classroomId}
          students={students}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          searchQuery={searchQuery}
        />
      ) : (
        <button
          onClick={() => setHasStarted(true)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-text px-6 py-5 text-[0.95rem] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
        >
          <CheckCircleIcon size={20} />
          Yoklama Al
        </button>
      )}
    </div>
  );
}
