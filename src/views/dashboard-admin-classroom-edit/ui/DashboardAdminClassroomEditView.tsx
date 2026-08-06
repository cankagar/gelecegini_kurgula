"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClassroomMutations, useClassroomQuery } from "@/entities/classroom";
import { useAdminUsersQuery } from "@/entities/user";
import { ClassroomInvitationsPanel } from "@/features/classroom-invitations";
import { ROUTES } from "@/shared/lib/routes";
import { formatFullName } from "@/shared/lib";
import { SpinnerIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";

const ROLE_LABELS: Record<string, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
};

// Öğrenciler artık "Öğrenci Davet Et" akışından eklenir (rol ataması + davet
// e-postası orada yönetiliyor) — bu arama kutusu sadece öğretmen/admin üyeliği için.
const ELIGIBLE_ROLES = new Set(["teacher", "admin"]);

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

type DashboardAdminClassroomEditViewProps = {
  classroomId: string;
};

export function DashboardAdminClassroomEditView({
  classroomId,
}: DashboardAdminClassroomEditViewProps) {
  const router = useRouter();
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);
  const { update, remove, addMember, removeMember, close, reopen } =
    useClassroomMutations(classroomId);

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [memberSearch, setMemberSearch] = useState("");

  // Rol filtresi vermiyoruz: admin öğrenci, öğretmen veya admin — herhangi bir
  // uygun rolde kullanıcı arayabilmeli. "user" rolü ve mevcut üyeler aşağıda elenir.
  const { data: searchData, isFetching: isSearching } = useAdminUsersQuery(memberSearch);

  const existingMemberIds = new Set(classroom?.members.map((m) => m.member_id));
  const searchResults = (searchData ?? []).filter(
    (u) => u.roles.some((r) => ELIGIBLE_ROLES.has(r)) && !existingMemberIds.has(u.id)
  );

  function startEditingName() {
    if (!classroom) return;
    setNameDraft(classroom.name);
    setIsEditingName(true);
  }

  async function saveName() {
    const trimmed = nameDraft.trim();
    if (!trimmed) return;
    try {
      await update.mutateAsync(trimmed);
      setIsEditingName(false);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  async function handleToggleClosed() {
    try {
      if (classroom?.closed_at) {
        await reopen.mutateAsync();
      } else {
        await close.mutateAsync();
      }
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  async function handleDeleteClassroom() {
    if (!window.confirm("Bu sınıfı silmek istediğine emin misin? Bu işlem geri alınamaz.")) return;
    try {
      await remove.mutateAsync();
      router.push(ROUTES.ADMIN.CLASSROOMS);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  async function handleAddMember(memberId: string) {
    try {
      await addMember.mutateAsync(memberId);
      setMemberSearch("");
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  async function handleRemoveMember(memberId: string) {
    try {
      await removeMember.mutateAsync(memberId);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <BackLink href={ROUTES.ADMIN.CLASSROOM_DETAIL(classroomId)}>Sınıf</BackLink>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Sınıf yüklenemedi.</p>}

      {classroom && (
        <div className="mt-6 rounded-md border border-border bg-bg">
          <div className="flex items-start justify-between border-b border-border px-8 py-6">
            <div className="flex-1">
              {isEditingName ? (
                <input
                  type="text"
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  className="rounded-md border border-border px-3 py-2 text-[0.95rem] font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              ) : (
                <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
                  {classroom.name}
                </h1>
              )}
              <p className="mt-1 text-[0.9rem] text-text-muted">{classroom.members.length} üye</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {isEditingName ? (
                <>
                  <button
                    onClick={saveName}
                    disabled={update.isPending}
                    className="rounded-md bg-primary px-3 py-1.5 text-[0.8rem] font-medium text-cta-text transition-colors duration-150 hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {update.isPending ? "Kaydediliyor..." : "Kaydet"}
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    disabled={update.isPending}
                    className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text disabled:opacity-50"
                  >
                    İptal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={startEditingName}
                    className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
                  >
                    İsmi Düzenle
                  </button>
                  <button
                    onClick={handleToggleClosed}
                    disabled={close.isPending || reopen.isPending}
                    className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-150 hover:text-text disabled:opacity-50"
                  >
                    {classroom.closed_at ? "Yeniden Aç" : "Kapat"}
                  </button>
                  <button
                    onClick={handleDeleteClassroom}
                    disabled={remove.isPending}
                    className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-danger transition-colors duration-150 hover:bg-danger-bg disabled:opacity-50"
                  >
                    Sil
                  </button>
                </>
              )}
            </div>
          </div>

          <ClassroomInvitationsPanel classroomId={classroomId} />

          <div className="border-b border-border px-8 py-6">
            <h2 className="text-[0.9rem] font-medium text-text">Öğretmen/Admin Ekle</h2>
            <p className="mt-1 text-[0.8rem] text-text-muted">
              Öğretmen veya admin rolündeki kullanıcıları ekleyebilirsin.
            </p>
            <div className="relative mt-3 max-w-sm">
              <input
                type="text"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="İsim veya e-posta ile ara..."
                className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              {memberSearch.trim().length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-bg shadow-sm">
                  {isSearching && (
                    <div className="px-3 py-2.5 text-[0.85rem] text-text-muted">Aranıyor...</div>
                  )}
                  {!isSearching && searchResults.length === 0 && (
                    <div className="px-3 py-2.5 text-[0.85rem] text-text-muted">
                      Uygun kullanıcı bulunamadı.
                    </div>
                  )}
                  {!isSearching &&
                    searchResults.map((candidate) => (
                      <button
                        key={candidate.id}
                        onClick={() => handleAddMember(candidate.id)}
                        disabled={addMember.isPending}
                        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[0.85rem] text-text transition-colors duration-150 hover:bg-surface disabled:opacity-50"
                      >
                        <span>
                          <span className="font-medium">{formatFullName(candidate, "İsimsiz")}</span>{" "}
                          <span className="text-text-muted">{candidate.email}</span>{" "}
                          <span className="text-[0.75rem] text-text-muted">
                            ({candidate.roles.map((r) => ROLE_LABELS[r] ?? r).join(", ")})
                          </span>
                        </span>
                        <span className="text-text-muted">Ekle</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {addMember.isError && (
              <p className="mt-2 text-[0.8rem] text-danger">
                Kullanıcı eklenemedi. Zaten sınıfta olabilir veya rolü uygun değil.
              </p>
            )}
          </div>

          <div className="px-8 py-6">
            <h2 className="text-[0.9rem] font-medium text-text">Üyeler</h2>

            {classroom.members.length === 0 ? (
              <p className="mt-3 text-[0.85rem] text-text-muted">Henüz üye yok.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border rounded-md border border-border">
                {classroom.members.map((member) => (
                  <li
                    key={member.member_id}
                    className="flex items-center justify-between px-4 py-2.5 text-[0.85rem]"
                  >
                    <div>
                      <span className="font-medium text-text">
                        {formatFullName(member, "İsimsiz")}
                      </span>{" "}
                      <span className="text-text-muted">{member.email}</span>{" "}
                      <span className="rounded-full bg-surface px-2 py-0.5 text-[0.75rem] font-medium text-text-muted">
                        {member.roles.map((r) => ROLE_LABELS[r] ?? r).join(", ")}
                      </span>
                      <p className="mt-0.5 text-[0.75rem] text-text-muted">
                        Katılım: {formatDate(member.joined_at)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.member_id)}
                      disabled={removeMember.isPending}
                      className="text-[0.8rem] font-medium text-danger underline underline-offset-2 transition-colors duration-150 hover:opacity-80 disabled:opacity-50"
                    >
                      Çıkar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
