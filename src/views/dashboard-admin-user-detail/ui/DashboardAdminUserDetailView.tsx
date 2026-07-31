"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminUserQuery, useUpdateAdminUserMutation } from "@/entities/user";
import type { AdminUser, UserRole } from "@/entities/user";
import { useClassroomsForMemberQuery } from "@/entities/classroom";
import { ROUTES } from "@/shared/lib/routes";
import { SpinnerIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";

const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
  user: "Kullanıcı",
};

const ROLE_OPTIONS: UserRole[] = ["user", "student", "teacher", "admin"];

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

type Draft = {
  fullName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

function draftFromUser(user: AdminUser): Draft {
  return {
    fullName: user.full_name ?? "",
    email: user.email ?? "",
    role: user.role,
    isActive: user.is_active,
  };
}

type DashboardAdminUserDetailViewProps = {
  userId: string;
};

export function DashboardAdminUserDetailView({ userId }: DashboardAdminUserDetailViewProps) {
  const { data: user, isLoading, isError } = useAdminUserQuery(userId);
  const { updateFields, updateRole } = useUpdateAdminUserMutation(userId);
  const { data: classrooms, isLoading: isClassroomsLoading } =
    useClassroomsForMemberQuery(userId);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  const isSaving = updateFields.isPending || updateRole.isPending;

  function patch(changes: Partial<Draft>) {
    if (!user) return;
    setDraft({ ...(draft ?? draftFromUser(user)), ...changes });
  }

  function startEditing() {
    if (!user) return;
    setDraft(draftFromUser(user));
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraft(null);
    setIsEditing(false);
    updateFields.reset();
    updateRole.reset();
  }

  async function save() {
    if (!user || !draft) return;

    const fieldChanges: { email?: string; full_name?: string; is_active?: boolean } = {};
    if (draft.fullName !== (user.full_name ?? "")) fieldChanges.full_name = draft.fullName.trim();
    if (draft.email !== (user.email ?? "")) fieldChanges.email = draft.email.trim();
    if (draft.isActive !== user.is_active) fieldChanges.is_active = draft.isActive;

    const tasks: Promise<unknown>[] = [];
    if (Object.keys(fieldChanges).length > 0) {
      tasks.push(updateFields.mutateAsync(fieldChanges));
    }
    if (draft.role !== user.role) {
      tasks.push(updateRole.mutateAsync(draft.role));
    }

    try {
      await Promise.all(tasks);
      setDraft(null);
      setIsEditing(false);
    } catch {
      // hata mesajı mutation state'inden okunuyor, formu açık bırak
    }
  }

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <BackLink href={`/dashboard${ROUTES.ADMIN.USERS}`}>Kullanıcılar</BackLink>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Kullanıcı yüklenemedi.</p>}

      {user && (
        <div className="mt-6 max-w-2xl rounded-md border border-border bg-bg">
          <div className="flex items-start justify-between border-b border-border px-8 py-6">
            <div className="flex-1">
              {isEditing && draft ? (
                <div className="flex flex-col gap-2 max-w-md">
                  <input
                    type="text"
                    value={draft.fullName}
                    onChange={(e) => patch({ fullName: e.target.value })}
                    placeholder="Ad Soyad"
                    className="rounded-md border border-border bg-bg px-3 py-2 text-[0.95rem] font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="email"
                    value={draft.email}
                    onChange={(e) => patch({ email: e.target.value })}
                    placeholder="E-posta"
                    className="rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ) : (
                <>
                  <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
                    {user.full_name ?? "İsimsiz Kullanıcı"}
                  </h1>
                  <p className="mt-1 text-[0.9rem] text-text-muted">{user.email ?? "—"}</p>
                </>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={save}
                    disabled={isSaving}
                    className="rounded-md bg-text px-3 py-1.5 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
                  >
                    {isSaving ? "Kaydediliyor..." : "Kaydet"}
                  </button>
                  <button
                    onClick={cancelEditing}
                    disabled={isSaving}
                    className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text disabled:opacity-50"
                  >
                    İptal
                  </button>
                </>
              ) : (
                <button
                  onClick={startEditing}
                  className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
                >
                  Düzenle
                </button>
              )}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 px-8 py-6 text-[0.85rem]">
            <div>
              <dt className="text-text-muted">Rol</dt>
              <dd className="mt-1.5">
                {isEditing && draft ? (
                  <select
                    value={draft.role}
                    onChange={(e) => patch({ role: e.target.value as UserRole })}
                    className="rounded-md border border-border bg-bg px-2.5 py-1.5 text-[0.85rem] font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {ROLE_LABELS[role]}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="font-medium text-text">{ROLE_LABELS[user.role]}</span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-text-muted">Durum</dt>
              <dd className="mt-1.5 flex items-center gap-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.75rem] font-medium ${
                    (isEditing && draft ? draft.isActive : user.is_active)
                      ? "bg-success-bg text-success"
                      : "bg-danger-bg text-danger"
                  }`}
                >
                  {(isEditing && draft ? draft.isActive : user.is_active) ? "Aktif" : "Pasif"}
                </span>
                {isEditing && draft && (
                  <button
                    onClick={() => patch({ isActive: !draft.isActive })}
                    className="text-[0.8rem] font-medium text-text-muted underline underline-offset-2 transition-colors duration-150 hover:text-text"
                  >
                    {draft.isActive ? "Hesabı Kapat" : "Hesabı Aç"}
                  </button>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-text-muted">Kayıt Tarihi</dt>
              <dd className="mt-1.5 font-medium text-text">{formatDate(user.created_at)}</dd>
            </div>
            <div>
              <dt className="text-text-muted">Son Güncelleme</dt>
              <dd className="mt-1.5 font-medium text-text">{formatDate(user.updated_at)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-text-muted">Kullanıcı ID</dt>
              <dd className="mt-1.5 font-medium text-text break-all">{user.id}</dd>
            </div>
          </dl>

          <div className="border-t border-border px-8 py-6">
            <h2 className="text-[0.9rem] font-medium text-text">Sınıfları</h2>

            {isClassroomsLoading && (
              <div className="mt-3 flex text-text-muted">
                <SpinnerIcon className="animate-spin" size={16} />
              </div>
            )}

            {!isClassroomsLoading && classrooms?.length === 0 && (
              <p className="mt-3 text-[0.85rem] text-text-muted">
                Bu kullanıcı henüz bir sınıfa dahil değil.
              </p>
            )}

            {!isClassroomsLoading && classrooms && classrooms.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {classrooms.map((classroom) => (
                  <li key={classroom.id}>
                    <Link
                      href={`/dashboard/admin/classrooms/${classroom.id}`}
                      className="rounded-full border border-border px-3 py-1 text-[0.8rem] font-medium text-text transition-colors duration-150 hover:bg-surface"
                    >
                      {classroom.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {(updateFields.isError || updateRole.isError) && (
            <div className="border-t border-border px-8 py-4">
              <p className="text-[0.8rem] text-danger">
                Kaydedilemedi. E-posta başka bir kullanıcıda olabilir.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
