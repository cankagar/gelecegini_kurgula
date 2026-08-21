"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useRequireAuth } from "@/features/auth";
import { useUpdateMeMutation, ROLE_LABELS } from "@/entities/user";
import { AvatarUpload } from "@/widgets/avatar-upload";
import { IconChip } from "@/shared/ui/icon-chip";
import { formatFullName } from "@/shared/lib";
import { StudentDemographicsForm } from "./StudentDemographicsForm";

type Draft = { firstName: string; lastName: string };

// Self-profile as seen from inside a dashboard (admin/teacher/student) — same
// page shell and header pattern as viewing any other record in the
// dashboard (see DashboardAdminUserDetailView), so it reads as a native
// destination rather than a bolted-on settings page.
export function DashboardProfileView() {
  const user = useRequireAuth();
  const updateMe = useUpdateMeMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  if (!user) return null;

  function startEditing() {
    setDraft({
      firstName: user!.first_name ?? "",
      lastName: user!.last_name ?? "",
    });
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraft(null);
    setIsEditing(false);
    updateMe.reset();
  }

  async function save() {
    if (!draft) return;

    const changes: { first_name?: string; last_name?: string } = {};
    if (draft.firstName !== (user!.first_name ?? "")) changes.first_name = draft.firstName.trim();
    if (draft.lastName !== (user!.last_name ?? "")) changes.last_name = draft.lastName.trim();

    if (Object.keys(changes).length === 0) {
      setIsEditing(false);
      setDraft(null);
      return;
    }

    try {
      await updateMe.mutateAsync(changes);
      setDraft(null);
      setIsEditing(false);
    } catch {
      // hata mesajı mutation state'inden okunuyor, formu açık bırak
    }
  }

  return (
    <div className="w-full px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <AvatarUpload
            userId={user.id}
            name={formatFullName(user, user.email ?? "?")}
            avatarUrl={user.avatar_url}
            size={72}
            canRemove
            className="mt-0.5"
          />

          <div className="min-w-0 flex-1">
            {isEditing && draft ? (
              <div className="flex max-w-md flex-col gap-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={draft.firstName}
                    onChange={(e) => setDraft({ ...draft, firstName: e.target.value })}
                    placeholder="Ad"
                    className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.95rem] font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="text"
                    value={draft.lastName}
                    onChange={(e) => setDraft({ ...draft, lastName: e.target.value })}
                    placeholder="Soyad"
                    className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.95rem] font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <p className="mt-0.5 truncate text-[0.85rem] text-text-muted">{user.email ?? "—"}</p>
              </div>
            ) : (
              <>
                <h1 className="font-heading text-[1.5rem] font-bold text-text tracking-[-0.025em] sm:text-[1.9rem]">
                  {formatFullName(user)}
                </h1>
                <p className="mt-1 truncate text-[0.9rem] text-text-muted">{user.email ?? "—"}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto">
          {isEditing ? (
            <>
              <button
                onClick={save}
                disabled={updateMe.isPending}
                className="rounded-md bg-text px-3 py-1.5 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
              >
                {updateMe.isPending ? "Kaydediliyor..." : "Kaydet"}
              </button>
              <button
                onClick={cancelEditing}
                disabled={updateMe.isPending}
                className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text disabled:opacity-50"
              >
                İptal
              </button>
            </>
          ) : (
            <button
              onClick={startEditing}
              className="rounded-md border border-border bg-bg px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
            >
              Düzenle
            </button>
          )}
        </div>
      </div>

      {updateMe.isError && (
        <p className="px-4 pt-4 text-[0.8rem] text-danger sm:px-8">
          Kaydedilemedi. Lütfen tekrar deneyin.
        </p>
      )}

      <div className="px-4 py-6 text-[0.85rem] sm:px-8">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-alt px-4 py-3">
          <IconChip icon={ShieldCheck} />
          <div className="min-w-0 flex-1">
            <p className="text-text-muted">Roller</p>
            <p className="font-medium text-text">
              {user.roles.map((r) => ROLE_LABELS[r]).join(", ") || "—"}
            </p>
          </div>
        </div>
      </div>

      {user.roles.includes("student") && (
        <div className="border-t border-border px-4 py-6 sm:px-8">
          <StudentDemographicsForm />
        </div>
      )}
    </div>
  );
}
