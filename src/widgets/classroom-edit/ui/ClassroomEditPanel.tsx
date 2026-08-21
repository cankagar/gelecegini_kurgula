"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  useClassroomMutations,
  useClassroomQuery,
  type ClassroomMember,
} from "@/entities/classroom";
import { useClassroomInvitationsQuery } from "@/entities/classroom-invitation";
import { ClassroomInvitationsPanel, InvitationRow } from "@/features/classroom-invitations";
import { formatFullName } from "@/shared/lib";
import { Avatar } from "@/shared/ui/avatar";
import { SpinnerIcon } from "@/shared/ui/icons";
import { BackLink } from "@/shared/ui/back-link";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";

const ROLE_LABELS: Record<string, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

type ClassroomEditPanelProps = {
  classroomId: string;
  backHref: string;
  classroomsHref: string;
  // Rol'e özel ek bölüm (örn. admin'in öğretmen/admin arama paneli) — widget
  // içine role kontrolü yazmak yerine dışarıdan slot olarak geçiliyor.
  extraSection?: ReactNode;
  // Sınıfı kapatma/yeniden açma/silme yalnızca admin yetkisinde (backend de
  // aynı kısıtı uyguluyor) — widget'a role kontrolü yazmak yerine dışarıdan geçiliyor.
  canManageLifecycle?: boolean;
};

export function ClassroomEditPanel({
  classroomId,
  backHref,
  classroomsHref,
  extraSection,
  canManageLifecycle = false,
}: ClassroomEditPanelProps) {
  const router = useRouter();
  const { data: classroom, isLoading, isError } = useClassroomQuery(classroomId);
  const { update, remove, removeMember, close, reopen } = useClassroomMutations(classroomId);
  const { data: invitations } = useClassroomInvitationsQuery(classroomId);

  // Kabul edilmiş davetler artık gerçek üye (classroom.members'ta zaten var),
  // iptal edilenler ise ölü kayıt — sadece bekleyen/süresi dolmuş davetler üst sırada gösterilir.
  const pendingInvitations = (invitations ?? []).filter(
    (invitation) => invitation.status === "pending" || invitation.status === "expired"
  );

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [memberToRemove, setMemberToRemove] = useState<ClassroomMember | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);

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

  async function confirmToggleClosed() {
    try {
      if (classroom?.closed_at) {
        await reopen.mutateAsync();
      } else {
        await close.mutateAsync();
      }
      setIsCloseConfirmOpen(false);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  async function confirmDeleteClassroom() {
    try {
      await remove.mutateAsync();
      router.push(classroomsHref);
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

  async function confirmRemoveMember() {
    if (!memberToRemove) return;
    await handleRemoveMember(memberToRemove.member_id);
    setMemberToRemove(null);
  }

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <BackLink href={backHref}>Sınıf</BackLink>

      {isLoading && (
        <div className="mt-8 flex justify-center text-text-muted">
          <SpinnerIcon className="animate-spin" size={20} />
        </div>
      )}

      {isError && <p className="mt-8 text-[0.9rem] text-text-muted">Sınıf yüklenemedi.</p>}

      {classroom && (
        <div className="mt-6 flex flex-col gap-6">
          <div className="flex items-start justify-between rounded-2xl bg-surface/50 px-6 py-5">
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
                    className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text disabled:opacity-50"
                  >
                    İptal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={startEditingName}
                    className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text"
                  >
                    İsmi Düzenle
                  </button>
                  {canManageLifecycle && (
                    <>
                      <button
                        onClick={() => setIsCloseConfirmOpen(true)}
                        disabled={close.isPending || reopen.isPending}
                        className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text disabled:opacity-50"
                      >
                        {classroom.closed_at ? "Yeniden Aç" : "Kapat"}
                      </button>
                      <button
                        onClick={() => setIsDeleteConfirmOpen(true)}
                        disabled={remove.isPending}
                        className="rounded-md border border-border px-3 py-1.5 text-[0.8rem] font-medium text-danger transition-colors duration-150 hover:bg-danger-bg disabled:opacity-50"
                      >
                        Sil
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-surface/50 px-6 py-5">
            <ClassroomInvitationsPanel classroomId={classroomId} />
          </div>

          {extraSection && <div className="rounded-2xl bg-surface/50 px-6 py-5">{extraSection}</div>}

          <div className="rounded-2xl bg-surface/50 px-6 py-5">
            <h2 className="text-[0.9rem] font-medium text-text">Üyeler</h2>

            {pendingInvitations.length === 0 && classroom.members.length === 0 ? (
              <p className="mt-3 text-[0.85rem] text-text-muted">Henüz üye yok.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {pendingInvitations.map((invitation) => (
                  <InvitationRow
                    key={invitation.id}
                    classroomId={classroomId}
                    invitation={invitation}
                  />
                ))}
                {classroom.members.map((member) => (
                  <li
                    key={member.member_id}
                    className="flex items-center justify-between rounded-xl bg-bg px-4 py-3 text-[0.85rem]"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={formatFullName(member, "İsimsiz")} src={member.avatar_url} size={32} />
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
                    </div>
                    <button
                      onClick={() => setMemberToRemove(member)}
                      className="rounded-full bg-danger px-3.5 py-1.5 text-[0.8rem] font-medium text-cta-text transition-opacity duration-150 hover:opacity-90"
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

      <ConfirmDialog
        open={memberToRemove !== null}
        onClose={() => setMemberToRemove(null)}
        onConfirm={confirmRemoveMember}
        title="Üyeyi çıkar"
        description={
          memberToRemove
            ? `${formatFullName(memberToRemove, "Bu kullanıcı")} sınıftan çıkarılsın mı?`
            : undefined
        }
        confirmLabel="Çıkar"
        pendingLabel="Çıkarılıyor..."
        isPending={removeMember.isPending}
      />

      <ConfirmDialog
        open={isCloseConfirmOpen}
        onClose={() => setIsCloseConfirmOpen(false)}
        onConfirm={confirmToggleClosed}
        title={classroom?.closed_at ? "Sınıfı yeniden aç" : "Sınıfı kapat"}
        description={
          classroom?.closed_at
            ? "Sınıf yeniden açılsın mı?"
            : "Sınıf kapatılsın mı? Öğrenciler kapalı sınıfa yeni işlem yapamaz."
        }
        confirmLabel={classroom?.closed_at ? "Yeniden Aç" : "Kapat"}
        pendingLabel="İşleniyor..."
        isPending={close.isPending || reopen.isPending}
        variant="default"
      />

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteClassroom}
        title="Sınıfı sil"
        description="Bu sınıfı silmek istediğine emin misin? Bu işlem geri alınamaz."
        confirmLabel="Sil"
        pendingLabel="Siliniyor..."
        isPending={remove.isPending}
      />
    </div>
  );
}
