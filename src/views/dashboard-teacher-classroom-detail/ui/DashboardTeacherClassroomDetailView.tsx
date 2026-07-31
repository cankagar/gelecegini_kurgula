"use client";

import { useState } from "react";
import { useClassroomQuery } from "@/entities/classroom";
import { SpinnerIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";
import { ROUTES } from "@/shared/lib/routes";

const ROLE_LABELS: Record<string, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
};

// Ödev verme burada yalnızca görsel/client-side bir taslak — henüz backend'e bağlı değil.
type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
};

type Tab = "assignments" | "members";

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

type DashboardTeacherClassroomDetailViewProps = {
  classroomId: string;
};

export function DashboardTeacherClassroomDetailView({
  classroomId,
}: DashboardTeacherClassroomDetailViewProps) {
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);

  const [tab, setTab] = useState<Tab>("assignments");

  const [assignments, setAssignments] = useState<Assignment[]>([]);
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
      <BackLink href={`/dashboard${ROUTES.TEACHER.CLASSROOMS}`}>Sınıflarım</BackLink>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Sınıf yüklenemedi.</p>}

      {classroom && (
        <>
          <h1 className="mt-4 font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
            {classroom.name}
          </h1>
          <p className="mt-1.5 text-[0.9rem] text-text-muted">{classroom.members.length} üye</p>

          <div className="mt-6 flex border-b border-border">
            <button
              onClick={() => setTab("assignments")}
              className={`px-4 py-2.5 text-[0.85rem] font-medium border-b-2 transition-colors duration-150 ${
                tab === "assignments"
                  ? "border-primary text-text"
                  : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              Ödevler
            </button>
            <button
              onClick={() => setTab("members")}
              className={`px-4 py-2.5 text-[0.85rem] font-medium border-b-2 transition-colors duration-150 ${
                tab === "members"
                  ? "border-primary text-text"
                  : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              Üyeler
            </button>
          </div>

          {tab === "assignments" && (
            <div className="mt-6 rounded-md border border-border bg-bg">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="text-[0.95rem] font-semibold text-text">Ödevler</h2>
                <button
                  onClick={() => setIsFormOpen((open) => !open)}
                  className="rounded-md bg-text px-3 py-1.5 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90"
                >
                  {isFormOpen ? "Vazgeç" : "Ödev Ver"}
                </button>
              </div>

              {isFormOpen && (
                <form
                  onSubmit={handleCreateAssignment}
                  className="flex flex-col gap-3 border-b border-border px-6 py-5"
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

              {assignments.length === 0 ? (
                <p className="px-6 py-8 text-center text-[0.85rem] text-text-muted">
                  Henüz ödev verilmedi.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {assignments.map((assignment) => (
                    <li key={assignment.id} className="flex items-start justify-between px-6 py-4">
                      <div>
                        <p className="text-[0.9rem] font-medium text-text">{assignment.title}</p>
                        {assignment.description && (
                          <p className="mt-1 text-[0.8rem] text-text-muted">
                            {assignment.description}
                          </p>
                        )}
                        {assignment.dueDate && (
                          <p className="mt-1.5 text-[0.75rem] text-text-muted">
                            Teslim: {new Date(assignment.dueDate).toLocaleDateString("tr-TR")}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveAssignment(assignment.id)}
                        className="text-[0.8rem] font-medium text-danger underline underline-offset-2 transition-colors duration-150 hover:opacity-80"
                      >
                        Kaldır
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {tab === "members" && (
            <div className="mt-6 rounded-md border border-border bg-bg">
              {classroom.members.length === 0 ? (
                <p className="px-6 py-8 text-center text-[0.85rem] text-text-muted">
                  Henüz üye yok.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {classroom.members.map((member) => (
                    <li key={member.member_id} className="px-6 py-3">
                      <p className="text-[0.85rem] font-medium text-text">
                        {member.full_name ?? "İsimsiz"}
                      </p>
                      <p className="mt-0.5 text-[0.78rem] text-text-muted">{member.email}</p>
                      <p className="mt-1 text-[0.72rem] text-text-muted">
                        {ROLE_LABELS[member.role] ?? member.role} · Katılım:{" "}
                        {formatDate(member.joined_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
