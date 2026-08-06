"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRequireAuth } from "@/features/auth";
import { ROLE_LABELS } from "@/entities/user";
import { Avatar } from "@/shared/ui/avatar";
import { ROUTES } from "@/shared/lib/routes";
import { PenIcon, ArrowRightIcon } from "@/shared/ui/icons";

const EASE = [0.32, 0.72, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export function ProfileView() {
  const user = useRequireAuth();
  if (!user) return null;

  const shortId = user.id.slice(0, 8);

  return (
    <div className="w-full px-8 py-14 lg:px-12">
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

          <h1 className="mt-5 font-heading text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-text sm:text-[3rem]">
            {user.full_name ?? "İsimsiz Kullanıcı"}
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
            <div className="flex h-full flex-col justify-between rounded-[calc(2rem-0.5rem)] bg-bg p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-8">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar name={user.full_name ?? user.email ?? "?"} size={64} />
                  <div>
                    <p className="text-[1.1rem] font-semibold text-text">
                      {user.full_name ?? "İsimsiz Kullanıcı"}
                    </p>
                    <p className="mt-0.5 text-[0.85rem] text-text-muted">{user.email ?? "—"}</p>
                  </div>
                </div>

                <Link
                  href={ROUTES.PROFILE.SETTINGS}
                  className="group flex shrink-0 items-center gap-2.5 rounded-full bg-text pl-5 pr-1.5 py-1.5 text-[0.8rem] font-medium text-white transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-90 active:scale-[0.98]"
                >
                  Düzenle
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <PenIcon size={13} />
                  </span>
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t border-border pt-5 text-[0.72rem] text-text-muted">
                <span className="uppercase tracking-[0.14em]">Hesap No</span>
                <span className="font-mono text-text-muted/80">#{shortId}</span>
              </div>
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
            <div className="flex h-full flex-col rounded-[calc(2rem-0.5rem)] bg-bg p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
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

              <Link
                href={ROUTES.PROFILE.SETTINGS}
                className="group mt-5 flex items-center gap-1.5 text-[0.78rem] font-medium text-text-muted transition-colors duration-300 hover:text-text"
              >
                Ayarlara git
                <ArrowRightIcon
                  size={13}
                  className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
