"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useClassroomQuery } from "@/entities/classroom";
import { useHomeworkQuery, useHomeworkMutations, type Homework } from "@/entities/homework";
import { AssignmentList, ClassroomDetailShell } from "@/widgets/classroom-detail";
import { AttendanceTab } from "@/widgets/classroom-attendance";
import { SpinnerIcon, PenIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { Modal, ModalTitle } from "@/shared/ui/modal";
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
  const { create: createHomework, update: updateHomework, remove: removeHomework } =
    useHomeworkMutations(classroomId);

  // "create" = yeni ödev formu, bir Homework = o ödevi düzenleme formu, null = kapalı.
  const [formTarget, setFormTarget] = useState<"create" | Homework | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [homeworkToRemove, setHomeworkToRemove] = useState<Homework | null>(null);

  const isEditing = formTarget !== null && formTarget !== "create";
  const isSaving = isEditing ? updateHomework.isPending : createHomework.isPending;
  const hasSaveError = isEditing ? updateHomework.isError : createHomework.isError;

  function openCreateForm() {
    setTitle("");
    setDescription("");
    setDueDate("");
    setFormTarget("create");
  }

  function openEditForm(assignment: Homework) {
    setTitle(assignment.title);
    setDescription(assignment.description);
    setDueDate(assignment.due_date.slice(0, 10));
    setFormTarget(assignment);
  }

  function resetForm() {
    setFormTarget(null);
  }

  async function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !dueDate) return;

    try {
      if (isEditing) {
        await updateHomework.mutateAsync({
          homeworkId: (formTarget as Homework).id,
          input: { title: trimmedTitle, description: description.trim(), due_date: dueDate },
        });
      } else {
        await createHomework.mutateAsync({
          title: trimmedTitle,
          description: description.trim(),
          due_date: dueDate,
        });
      }
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
    <div className="w-full px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
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
                  onClick={openCreateForm}
                  className="rounded-full bg-text px-4 py-2 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90"
                >
                  Ödev Ver
                </button>
              </div>

              <AssignmentList
                assignments={homework}
                renderAction={(assignment) => (
                  <>
                    <button
                      onClick={() => openEditForm(assignment)}
                      className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[0.8rem] font-medium text-text transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-border/60"
                    >
                      <PenIcon size={14} />
                      Düzenle
                    </button>
                    <button
                      onClick={() => setHomeworkToRemove(assignment)}
                      className="flex items-center gap-1.5 rounded-full bg-danger-bg px-3 py-1.5 text-[0.8rem] font-medium text-danger transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-80"
                    >
                      <Trash2 size={14} />
                      Sil
                    </button>
                  </>
                )}
              />
            </div>
          }
          attendanceContent={<AttendanceTab classroom={classroom} classroomId={classroomId} />}
        />
      )}

      <Modal
        open={formTarget !== null}
        onClose={resetForm}
        variant="default"
        size="lg"
        ariaLabel={isEditing ? "Ödevi düzenle" : "Yeni ödev"}
      >
        <ModalTitle>{isEditing ? "Ödevi Düzenle" : "Yeni Ödev"}</ModalTitle>
        <form onSubmit={handleSubmitForm} className="mt-6 flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8rem] font-medium text-text-muted">Ödev başlığı</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn. Bölüm 3 alıştırmaları"
              className="rounded-md border border-border px-3.5 py-2.5 text-[0.9rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[0.8rem] font-medium text-text-muted">Açıklama (opsiyonel)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ödevle ilgili detayları buraya yazabilirsin"
              rows={5}
              className="rounded-md border border-border px-3.5 py-2.5 text-[0.9rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.8rem] font-medium text-text-muted">Son teslim tarihi</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="rounded-md border border-border px-3.5 py-2.5 text-[0.9rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <button
              type="submit"
              disabled={!title.trim() || !dueDate || isSaving}
              className="rounded-full bg-text px-6 py-2.5 text-[0.85rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
            >
              {isSaving ? "Kaydediliyor..." : isEditing ? "Kaydet" : "Oluştur"}
            </button>
          </div>

          {hasSaveError && (
            <p className="text-[0.8rem] text-danger">
              {isEditing ? "Ödev güncellenemedi." : "Ödev oluşturulamadı."}
            </p>
          )}
        </form>
      </Modal>

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
