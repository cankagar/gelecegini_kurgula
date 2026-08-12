"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClassroomQuery } from "@/entities/classroom";
import {
  AssignmentList,
  ClassroomDetailShell,
  createMockAssignments,
  type Assignment,
} from "@/widgets/classroom-detail";
import { SpinnerIcon, PenIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";
import { ROUTES } from "@/shared/lib/routes";

type DashboardTeacherClassroomDetailViewProps = {
  classroomId: string;
};

export function DashboardTeacherClassroomDetailView({
  classroomId,
}: DashboardTeacherClassroomDetailViewProps) {
  const router = useRouter();
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);

  const [assignments, setAssignments] = useState<Assignment[]>(createMockAssignments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setIsFormOpen(false);
  }

  function handleCreateAssignment(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setAssignments((prev) => [
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        description: description.trim(),
        dueDate,
      },
      ...prev,
    ]);
    resetForm();
  }

  function handleRemoveAssignment(id: string) {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <BackLink href={ROUTES.TEACHER.CLASSROOMS}>Sınıflarım</BackLink>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Sınıf yüklenemedi.</p>}

      {classroom && (
        <ClassroomDetailShell
          classroom={classroom}
          headerActions={
            <button
              onClick={() => router.push(ROUTES.TEACHER.CLASSROOM_EDIT(classroomId))}
              className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text"
            >
              <PenIcon size={14} />
              Düzenle
            </button>
          }
          assignmentsContent={
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[0.95rem] font-semibold text-text">Ödevler</h2>
                <button
                  onClick={() => setIsFormOpen((open) => !open)}
                  className="rounded-full bg-text px-4 py-2 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90"
                >
                  {isFormOpen ? "Vazgeç" : "Ödev Ver"}
                </button>
              </div>

              {isFormOpen && (
                <form
                  onSubmit={handleCreateAssignment}
                  className="flex flex-col gap-3 rounded-2xl bg-bg px-5 py-4"
                >
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ödev başlığı"
                    className="rounded-md border border-border px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Açıklama (opsiyonel)"
                    rows={3}
                    className="rounded-md border border-border px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="flex items-center gap-3">
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="rounded-md border border-border px-3 py-2 text-[0.85rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="submit"
                      disabled={!title.trim()}
                      className="rounded-md bg-text px-3.5 py-2 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
                    >
                      Oluştur
                    </button>
                  </div>
                </form>
              )}

              <AssignmentList
                assignments={assignments}
                renderAction={(assignment) => (
                  <button
                    onClick={() => handleRemoveAssignment(assignment.id)}
                    className="text-[0.8rem] font-medium text-danger underline underline-offset-2 transition-colors duration-150 hover:opacity-80"
                  >
                    Kaldır
                  </button>
                )}
              />
            </div>
          }
        />
      )}
    </div>
  );
}
