"use client";

import { useState } from "react";
import { useRequireAuth } from "@/features/auth";
import { useUpdateMeMutation, ROLE_LABELS } from "@/entities/user";
import { Avatar } from "@/shared/ui/avatar";

type Draft = { fullName: string; email: string };

export function ProfileSettingsView() {
  const user = useRequireAuth();
  const updateMe = useUpdateMeMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  function startEditing() {
    if (!user) return;
    setDraft({ fullName: user.full_name ?? "", email: user.email ?? "" });
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraft(null);
    setIsEditing(false);
    updateMe.reset();
  }

  async function save() {
    if (!user || !draft) return;

    const changes: { email?: string; full_name?: string } = {};
    if (draft.fullName !== (user.full_name ?? "")) changes.full_name = draft.fullName.trim();
    if (draft.email !== (user.email ?? "")) changes.email = draft.email.trim();

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

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
        Profil Ayarları
      </h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">
        Ad, soyad ve e-posta bilgilerini güncelle.
      </p>

      <div className="mt-8 rounded-md border border-border bg-bg p-6">
        <div className="flex items-center gap-4">
          <Avatar name={user.full_name ?? user.email ?? "?"} size={48} />
          <div className="flex-1">
            {isEditing && draft ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={draft.fullName}
                  onChange={(e) => setDraft({ ...draft, fullName: e.target.value })}
                  placeholder="Ad Soyad"
                  className="rounded-md border border-border bg-bg px-3 py-2 text-[0.9rem] font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  placeholder="E-posta"
                  className="rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            ) : (
              <>
                <p className="text-[1.05rem] font-semibold text-text">
                  {user.full_name ?? "İsimsiz Kullanıcı"}
                </p>
                <p className="mt-0.5 text-[0.85rem] text-text-muted">{user.email ?? "—"}</p>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
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

        {updateMe.isError && (
          <p className="mt-4 text-[0.8rem] text-danger">
            Kaydedilemedi. E-posta başka bir kullanıcıda olabilir.
          </p>
        )}
      </div>

      {user.roles.length > 0 && (
        <div className="mt-6 rounded-md border border-border bg-bg-alt p-4">
          <p className="text-[0.78rem] text-text-muted">Roller</p>
          <p className="mt-1 text-[0.85rem] font-medium text-text">
            {user.roles.map((r) => ROLE_LABELS[r]).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
