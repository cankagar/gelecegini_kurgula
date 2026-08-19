"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClassroomQuery } from "@/entities/classroom";
import { useHomeworkQuery, useHomeworkMutations, type Homework } from "@/entities/homework";
import { AssignmentList, ClassroomDetailShell } from "@/widgets/classroom-detail";
import { AttendanceTab } from "@/widgets/classroom-attendance";
import { SpinnerIcon, PenIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { ROUTES } from "@/shared/lib/routes";

type DashboardTeacherClassroomDetailViewProps = {
  classroomId: string;
};

export function DashboardTeacherClassroomDetailView({
  classroomId,
}: DashboardTeacherClassroomDetailViewProps) {
  const router = useRouter();
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);
  const { data: homework = [] } = useHomeworkQuery(classroomId);
  const { create: createHomework, remove: removeHomework } =
    useHomeworkMutations(classroomId);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [homeworkToRemove, setHomeworkToRemove] = useState<Homework | null>(null);

  function resetForm() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setIsFormOpen(false);
  }

  async function handleCreateHomework(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !dueDate) return;

    try {
      await createHomework.mutateAsync({
        title: trimmedTitle,
        description: description.trim(),
        due_date: dueDate,
      });
      resetForm();
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  async function confirmRemoveHomework() {
    if (!homeworkToRemove) return;
    try {
      await removeHomework.mutateAsync(homeworkToRemove.id);
      setHomeworkToRemove(null);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
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
                  onSubmit={handleCreateHomework}
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
                  <div className="flex items-end gap-3">
                    <label className="flex flex-col gap-1">
                      <span className="text-[0.75rem] font-medium text-text-muted">
                        Son teslim tarihi
                      </span>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="rounded-md border border-border px-3 py-2 text-[0.85rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={!title.trim() || !dueDate || createHomework.isPending}
                      className="rounded-md bg-text px-3.5 py-2 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
                    >
                      {createHomework.isPending ? "Oluşturuluyor..." : "Oluştur"}
                    </button>
                  </div>
                  {createHomework.isError && (
                    <p className="text-[0.8rem] text-danger">Ödev oluşturulamadı.</p>
                  )}
                </form>
              )}

              <AssignmentList
                assignments={homework}
                renderAction={(assignment) => (
                  <button
                    onClick={() => setHomeworkToRemove(assignment)}
                    className="text-[0.8rem] font-medium text-danger underline underline-offset-2 transition-colors duration-150 hover:opacity-80"
                  >
                    Kaldır
                  </button>
                )}
              />
            </div>
          }
          attendanceContent={<AttendanceTab classroom={classroom} classroomId={classroomId} />}
        />
      )}

      <ConfirmDialog
        open={homeworkToRemove !== null}
        onClose={() => setHomeworkToRemove(null)}
        onConfirm={confirmRemoveHomework}
        title="Ödevi kaldır"
        description={
          homeworkToRemove
            ? `"${homeworkToRemove.title}" ödevi kaldırılsın mı? Bu işlem geri alınamaz.`
            : undefined
        }
        confirmLabel="Kaldır"
        pendingLabel="Kaldırılıyor..."
        isPending={removeHomework.isPending}
      />
    </div>
  );
}
