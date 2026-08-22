"use client";

import { useState } from "react";
import { useRequireAuth } from "@/features/auth";
import { useUpdateMeMutation } from "@/entities/user";
import { AvatarUpload } from "@/widgets/avatar-upload";
import { BackLink } from "@/shared/ui/back-link";
import { formatFullName } from "@/shared/lib";

const fieldClass =
  "rounded-md border border-border bg-bg px-3 py-2 text-[0.95rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20";

type Draft = { firstName: string; lastName: string };

export function ProfileView() {
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
    <div className="w-full px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <BackLink href="/">Ana sayfaya dön</BackLink>

        <h1 className="mt-6 font-heading text-[1.9rem] font-bold tracking-[-0.025em] text-text sm:text-[2.2rem]">
          Hesabım
        </h1>
        <p className="mt-1.5 text-[0.9rem] text-text-muted">
          Profil bilgilerini buradan görüntüleyebilir ve güncelleyebilirsin.
        </p>

        <div className="mt-8 rounded-2xl bg-surface/50 p-6 sm:p-8">
          {isEditing && draft ? (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <AvatarUpload
                  userId={user.id}
                  name={formatFullName(user, user.email ?? "?")}
                  avatarUrl={user.avatar_url}
                  size={72}
                  canRemove
                  className="shrink-0"
                />
                <p className="truncate text-[0.85rem] text-text-muted">{user.email ?? "—"}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[0.8rem] font-medium text-text-muted">Ad</span>
                  <input
                    type="text"
                    value={draft.firstName}
                    onChange={(e) => setDraft({ ...draft, firstName: e.target.value })}
                    placeholder="Ad"
                    className={fieldClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[0.8rem] font-medium text-text-muted">Soyad</span>
                  <input
                    type="text"
                    value={draft.lastName}
                    onChange={(e) => setDraft({ ...draft, lastName: e.target.value })}
                    placeholder="Soyad"
                    className={fieldClass}
                  />
                </label>
              </div>

              {updateMe.isError && (
                <p className="text-[0.8rem] text-danger">Kaydedilemedi. Lütfen tekrar deneyin.</p>
              )}

              <div className="flex items-center gap-2 border-t border-border pt-5">
                <button
                  onClick={save}
                  disabled={updateMe.isPending}
                  className="rounded-md bg-text px-4 py-2 text-[0.85rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
                >
                  {updateMe.isPending ? "Kaydediliyor..." : "Kaydet"}
                </button>
                <button
                  onClick={cancelEditing}
                  disabled={updateMe.isPending}
                  className="rounded-md border border-border px-4 py-2 text-[0.85rem] font-medium text-text-muted transition-colors duration-150 hover:text-text disabled:opacity-50"
                >
                  İptal
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <AvatarUpload
                  userId={user.id}
                  name={formatFullName(user, user.email ?? "?")}
                  avatarUrl={user.avatar_url}
                  size={72}
                  canRemove
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[1.15rem] font-semibold text-text">{formatFullName(user)}</p>
                  <p className="mt-0.5 truncate text-[0.85rem] text-text-muted">{user.email ?? "—"}</p>
                </div>
              </div>

              <button
                onClick={startEditing}
                className="rounded-md border border-border bg-bg px-4 py-2 text-[0.85rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
              >
                Düzenle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
