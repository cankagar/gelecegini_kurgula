"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRequireAuth } from "@/features/auth";
import { useUpdateMeMutation, ROLE_LABELS } from "@/entities/user";
import { AvatarUpload } from "@/widgets/avatar-upload";
import { PenIcon } from "@/shared/ui/icons";
import { formatFullName } from "@/shared/lib";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const fieldClass =
  "rounded-xl border border-border bg-bg-alt px-3.5 py-2.5 text-[0.9rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20";

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
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="inline-flex items-center rounded-full border border-primary-border bg-primary-tint px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-primary-hover">
            Hesabım
          </span>

          <h1 className="mt-5 font-heading text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-text sm:text-[2.5rem] lg:text-[3rem]">
            {formatFullName(user)}
          </h1>
          <p className="mt-2 font-serif text-[1.05rem] italic text-text-muted">{user.email ?? "—"}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Identity — outer shell + inner core (double-bezel) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="rounded-[2rem] bg-bg-alt p-2 ring-1 ring-border md:col-span-2"
          >
            <div className="flex h-full flex-col justify-between rounded-[calc(2rem-0.5rem)] bg-bg p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-7 md:p-8">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <AvatarUpload
                    userId={user.id}
                    name={formatFullName(user, user.email ?? "?")}
                    avatarUrl={user.avatar_url}
                    size={64}
                    canRemove
                    className="mt-1 shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    {isEditing && draft ? (
                      <div className="flex flex-col gap-2.5">
                        <div className="flex flex-col gap-2.5 sm:flex-row">
                          <input
                            type="text"
                            value={draft.firstName}
                            onChange={(e) => setDraft({ ...draft, firstName: e.target.value })}
                            placeholder="Ad"
                            className={`${fieldClass} w-full font-medium sm:w-auto sm:flex-1`}
                          />
                          <input
                            type="text"
                            value={draft.lastName}
                            onChange={(e) => setDraft({ ...draft, lastName: e.target.value })}
                            placeholder="Soyad"
                            className={`${fieldClass} w-full font-medium sm:w-auto sm:flex-1`}
                          />
                        </div>
                        <p className="mt-0.5 truncate text-[0.85rem] text-text-muted">{user.email ?? "—"}</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-[1.1rem] font-semibold text-text">{formatFullName(user)}</p>
                        <p className="mt-0.5 truncate text-[0.85rem] text-text-muted">{user.email ?? "—"}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex w-full shrink-0 flex-wrap items-center gap-2.5 sm:w-auto">
                  {isEditing ? (
                    <>
                      <button
                        onClick={save}
                        disabled={updateMe.isPending}
                        className="rounded-full bg-text px-5 py-2 text-[0.82rem] font-medium text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                      >
                        {updateMe.isPending ? "Kaydediliyor..." : "Kaydet"}
                      </button>
                      <button
                        onClick={cancelEditing}
                        disabled={updateMe.isPending}
                        className="rounded-full border border-border px-5 py-2 text-[0.82rem] font-medium text-text-muted transition-colors duration-300 hover:text-text disabled:opacity-50"
                      >
                        İptal
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={startEditing}
                      className="group flex items-center gap-2.5 rounded-full bg-text pl-5 pr-1.5 py-1.5 text-[0.8rem] font-medium text-white transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 active:scale-[0.98]"
                    >
                      Düzenle
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <PenIcon size={13} />
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {updateMe.isError && (
                <p className="mt-4 text-[0.8rem] text-danger">
                  Kaydedilemedi. Lütfen tekrar deneyin.
                </p>
              )}
            </div>
          </motion.div>

          {/* Roles — outer shell + inner core */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            className="rounded-[2rem] bg-bg-alt p-2 ring-1 ring-border"
          >
            <div className="flex h-full flex-col rounded-[calc(2rem-0.5rem)] bg-bg p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-7 md:p-8">
              <p className="text-[0.72rem] uppercase tracking-[0.14em] text-text-muted">Roller</p>

              <div className="mt-4 flex flex-1 flex-col gap-2">
                {user.roles.length > 0 ? (
                  user.roles.map((r) => (
                    <span
                      key={r}
                      className="flex items-center gap-2 rounded-full border border-border bg-bg-alt px-3.5 py-2 text-[0.82rem] font-medium text-text"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {ROLE_LABELS[r]}
                    </span>
                  ))
                ) : (
                  <p className="text-[0.82rem] text-text-muted">Henüz rol atanmadı.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
