"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  CalendarPlus,
  ChevronDown,
  Fingerprint,
  History,
  ShieldCheck,
  School,
} from "lucide-react";
import { useAdminUserQuery, useUpdateAdminUserMutation, ROLE_LABELS } from "@/entities/user";
import type { AdminUser, UserRole } from "@/entities/user";
import { useClassroomsForMemberQuery } from "@/entities/classroom";
import {
  GENDER_LABELS,
  PARENT_RELATION_LABELS,
  useStudentDemographicsQuery,
} from "@/entities/student-demographics";
import { useStudentAttendanceQuery } from "@/entities/attendance";
import { AttendanceHistoryPanel } from "@/widgets/attendance-history";
import { formatDate } from "@/shared/lib/date";
import { ROUTES } from "@/shared/lib/routes";
import { formatDateTime } from "@/shared/lib/date";
import { formatFullName } from "@/shared/lib";
import { SpinnerIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";
import { Avatar } from "@/shared/ui/avatar";
import { IconChip } from "@/shared/ui/icon-chip";

const ROLE_OPTIONS: UserRole[] = ["user", "student", "teacher", "admin", "author"];

type Draft = {
  firstName: string;
  lastName: string;
  roles: UserRole[];
  isActive: boolean;
};

function draftFromUser(user: AdminUser): Draft {
  return {
    firstName: user.first_name ?? "",
    lastName: user.last_name ?? "",
    roles: user.roles,
    isActive: user.is_active,
  };
}

type DashboardAdminUserDetailViewProps = {
  userId: string;
};

export function DashboardAdminUserDetailView({ userId }: DashboardAdminUserDetailViewProps) {
  const { data: user, isLoading, isError } = useAdminUserQuery(userId);
  const { updateFields, addRole, removeRole } = useUpdateAdminUserMutation(userId);
  const isStudent = user?.roles.includes("student") ?? false;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [isClassroomsOpen, setIsClassroomsOpen] = useState(false);
  const [isDemographicsOpen, setIsDemographicsOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

  const { data: classrooms, isLoading: isClassroomsLoading } = useClassroomsForMemberQuery(
    userId,
    isClassroomsOpen
  );
  const { data: demographics, isLoading: isDemographicsLoading } = useStudentDemographicsQuery(
    userId,
    isStudent && isDemographicsOpen
  );
  const {
    data: attendance,
    isLoading: isAttendanceLoading,
    isError: isAttendanceError,
  } = useStudentAttendanceQuery(userId, isStudent && isAttendanceOpen);

  const isSaving = updateFields.isPending || addRole.isPending || removeRole.isPending;

  function patch(changes: Partial<Draft>) {
    if (!user) return;
    setDraft({ ...(draft ?? draftFromUser(user)), ...changes });
  }

  function toggleRole(role: UserRole) {
    if (!draft) return;
    const roles = draft.roles.includes(role)
      ? draft.roles.filter((r) => r !== role)
      : [...draft.roles, role];
    patch({ roles });
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
    addRole.reset();
    removeRole.reset();
  }

  async function save() {
    if (!user || !draft) return;

    const fieldChanges: {
      first_name?: string;
      last_name?: string;
      is_active?: boolean;
    } = {};
    if (draft.firstName !== (user.first_name ?? ""))
      fieldChanges.first_name = draft.firstName.trim();
    if (draft.lastName !== (user.last_name ?? ""))
      fieldChanges.last_name = draft.lastName.trim();
    if (draft.isActive !== user.is_active) fieldChanges.is_active = draft.isActive;

    const rolesToAdd = draft.roles.filter((r) => !user.roles.includes(r));
    const rolesToRemove = user.roles.filter((r) => !draft.roles.includes(r));

    const tasks: Promise<unknown>[] = [];
    if (Object.keys(fieldChanges).length > 0) {
      tasks.push(updateFields.mutateAsync(fieldChanges));
    }
    rolesToAdd.forEach((r) => tasks.push(addRole.mutateAsync(r)));
    rolesToRemove.forEach((r) => tasks.push(removeRole.mutateAsync(r)));

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
      <BackLink href={ROUTES.ADMIN.USERS}>Kullanıcılar</BackLink>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Kullanıcı yüklenemedi.</p>}

      {user && (
        <div className="mt-8">
          <div className="flex items-start justify-between gap-4 border-b border-border pb-6">
            <div className="flex flex-1 items-start gap-4">
              <Avatar name={formatFullName(user, user.email ?? "?")} size={48} className="mt-0.5" />

              <div className="flex-1">
                {isEditing && draft ? (
                  <div className="flex max-w-md flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={draft.firstName}
                        onChange={(e) => patch({ firstName: e.target.value })}
                        placeholder="Ad"
                        className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.95rem] font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <input
                        type="text"
                        value={draft.lastName}
                        onChange={(e) => patch({ lastName: e.target.value })}
                        placeholder="Soyad"
                        className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.95rem] font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <p className="text-[0.85rem] text-text-muted">{user.email ?? "—"}</p>
                  </div>
                ) : (
                  <>
                    <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
                      {formatFullName(user)}
                    </h1>
                    <p className="mt-1 text-[0.9rem] text-text-muted">{user.email ?? "—"}</p>
                  </>
                )}
              </div>
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
                  className="rounded-md border border-border bg-bg px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
                >
                  Düzenle
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 px-8 py-6 text-[0.85rem]">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-alt px-4 py-3">
              <IconChip icon={ShieldCheck} />
              <div className="flex-1">
                <p className="text-text-muted">Roller</p>
                {isEditing && draft ? (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {ROLE_OPTIONS.map((role) => {
                      const selected = draft.roles.includes(role);
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => toggleRole(role)}
                          className={`rounded-full border px-2.5 py-1 text-[0.78rem] font-medium transition-colors duration-150 ${
                            selected
                              ? "border-primary-border bg-primary-tint text-accent"
                              : "border-border text-text-muted hover:text-text"
                          }`}
                        >
                          {ROLE_LABELS[role]}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="font-medium text-text">
                    {user.roles.map((r) => ROLE_LABELS[r]).join(", ") || "—"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-alt px-4 py-3">
              <IconChip icon={CalendarClock} />
              <div className="flex-1">
                <p className="text-text-muted">Durum</p>
                <div className="mt-1 flex items-center gap-3">
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
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-alt px-4 py-3">
              <IconChip icon={CalendarPlus} />
              <div>
                <p className="text-text-muted">Kayıt Tarihi</p>
                <p className="mt-1 font-medium text-text">{formatDateTime(user.created_at)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-alt px-4 py-3">
              <IconChip icon={History} />
              <div>
                <p className="text-text-muted">Son Güncelleme</p>
                <p className="mt-1 font-medium text-text">{formatDateTime(user.updated_at)}</p>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-3 rounded-xl border border-border bg-bg-alt px-4 py-3">
              <IconChip icon={Fingerprint} />
              <div className="min-w-0 flex-1">
                <p className="text-text-muted">Kullanıcı ID</p>
                <p className="mt-1 break-all font-medium text-text">{user.id}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border px-8 py-6">
            <button
              type="button"
              onClick={() => setIsClassroomsOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <h2 className="text-[0.9rem] font-medium text-text">Sınıfları</h2>
              <ChevronDown
                size={18}
                className={`shrink-0 text-text-muted transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isClassroomsOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isClassroomsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden"
                >
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
                            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text transition-colors duration-150 hover:border-primary-border hover:bg-primary-tint"
                          >
                            <School size={13} className="text-text-muted" />
                            {classroom.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isStudent && (
            <div className="border-t border-border px-8 py-6">
              <button
                type="button"
                onClick={() => setIsDemographicsOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <h2 className="text-[0.9rem] font-medium text-text">Öğrenci Bilgileri</h2>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-text-muted transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isDemographicsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isDemographicsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
              {isDemographicsLoading && (
                <div className="mt-3 flex text-text-muted">
                  <SpinnerIcon className="animate-spin" size={16} />
                </div>
              )}

              {!isDemographicsLoading && demographics && (
                <div className="mt-3 grid grid-cols-1 gap-4 text-[0.85rem] sm:grid-cols-2">
                  <DemographicField label="Doğum tarihi" value={demographics.birth_date} isDate />
                  <DemographicField
                    label="Cinsiyet"
                    value={demographics.gender ? GENDER_LABELS[demographics.gender] : null}
                  />
                  <DemographicField label="Okulu" value={demographics.school} />
                  <DemographicField label="Sınıfı" value={demographics.grade} />
                  <DemographicField label="İl" value={demographics.city} />
                  <DemographicField label="İlçe" value={demographics.district} />
                  <DemographicField label="Telefon" value={demographics.phone} />
                  <DemographicField
                    label="Daha önce merkeze geldi mi?"
                    value={
                      demographics.previously_attended === null
                        ? null
                        : demographics.previously_attended
                          ? "Evet"
                          : "Hayır"
                    }
                  />
                  <DemographicField label="Veli adı soyadı" value={demographics.parent_name} />
                  <DemographicField
                    label="Veli yakınlık derecesi"
                    value={
                      demographics.parent_relation
                        ? PARENT_RELATION_LABELS[demographics.parent_relation]
                        : null
                    }
                  />
                  <DemographicField label="Veli telefon" value={demographics.parent_phone} />
                  <DemographicField
                    label="İkinci veli telefon"
                    value={demographics.second_parent_phone}
                  />
                  <DemographicField label="Anne mesleği" value={demographics.mother_occupation} />
                  <DemographicField label="Baba mesleği" value={demographics.father_occupation} />
                  <DemographicField
                    label="Acil durumda aranacak kişi"
                    value={demographics.emergency_contact_name}
                  />
                  <DemographicField
                    label="Acil durum telefonu"
                    value={demographics.emergency_contact_phone}
                  />
                  <DemographicField
                    label="İlgilendiği alanlar"
                    value={demographics.interest_areas?.join(", ") || null}
                  />
                  <DemographicField label="Katıldığı program" value={demographics.program} />
                  <DemographicField
                    label="Kayıt tarihi"
                    value={demographics.registration_date}
                    isDate
                  />
                </div>
              )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {isStudent && (
            <div className="border-t border-border px-8 py-6">
              <button
                type="button"
                onClick={() => setIsAttendanceOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <h2 className="text-[0.9rem] font-medium text-text">Devamsızlık</h2>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-text-muted transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isAttendanceOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isAttendanceOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3">
                      <AttendanceHistoryPanel
                        records={attendance}
                        isLoading={isAttendanceLoading}
                        isError={isAttendanceError}
                        emptyMessage="Bu öğrenci için henüz devamsızlık kaydı yok."
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {(updateFields.isError || addRole.isError || removeRole.isError) && (
            <div className="border-t border-border bg-danger-bg px-8 py-4">
              <p className="text-[0.8rem] text-danger">Kaydedilemedi.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DemographicField({
  label,
  value,
  isDate,
}: {
  label: string;
  value: string | null | undefined;
  isDate?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-bg-alt px-4 py-3">
      <p className="text-text-muted">{label}</p>
      <p className="font-medium text-text">
        {value ? (isDate ? formatDate(value) : value) : "—"}
      </p>
    </div>
  );
}
