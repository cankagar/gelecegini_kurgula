"use client";

import { useState } from "react";
import {
  useClassroomInvitationMutations,
  type ClassroomInvitation,
  type InvitationStatus,
} from "@/entities/classroom-invitation";
import { formatDateTime, formatRemainingTime } from "@/shared/lib/date";
import { ApiError } from "@/shared/api";
import { Modal, ModalTitle, ModalDescription, ModalFooter } from "@/shared/ui/modal";

const STATUS_LABELS: Partial<Record<InvitationStatus, string>> = {
  pending: "Bekliyor",
  expired: "Süresi Doldu",
};

const STATUS_CLASSES: Partial<Record<InvitationStatus, string>> = {
  pending: "bg-primary-tint text-primary",
  expired: "bg-danger-bg text-danger",
};

type InvitationRowProps = {
  classroomId: string;
  invitation: ClassroomInvitation;
};

export function InvitationRow({ classroomId, invitation }: InvitationRowProps) {
  const { revoke, resend } = useClassroomInvitationMutations(classroomId);
  const [rowError, setRowError] = useState<string | null>(null);
  const [isConfirmingRevoke, setIsConfirmingRevoke] = useState(false);

  async function handleRevoke() {
    setRowError(null);
    try {
      await revoke.mutateAsync(invitation.id);
      setIsConfirmingRevoke(false);
    } catch (err) {
      setRowError(err instanceof ApiError ? err.message : "Davet iptal edilemedi.");
    }
  }

  async function handleResend() {
    setRowError(null);
    try {
      await resend.mutateAsync(invitation.id);
    } catch (err) {
      setRowError(err instanceof ApiError ? err.message : "Davet tekrar gönderilemedi.");
    }
  }

  return (
    <li className="rounded-xl bg-bg px-4 py-3 text-[0.85rem]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="font-medium text-text">{invitation.email}</span>{" "}
          <span
            className={`rounded-full px-2 py-0.5 text-[0.75rem] font-medium ${STATUS_CLASSES[invitation.status]}`}
          >
            {STATUS_LABELS[invitation.status]}
          </span>
          <p className="mt-0.5 text-[0.75rem] text-text-muted">
            Gönderim: {formatDateTime(invitation.created_at)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {invitation.status === "expired" && (
            <button
              onClick={handleResend}
              disabled={resend.isPending}
              className="text-[0.8rem] font-medium text-primary underline underline-offset-2 transition-colors duration-150 hover:opacity-80 disabled:opacity-50"
            >
              Tekrar Gönder
            </button>
          )}
          {invitation.status === "pending" && (
            <div
              className="group relative h-[1.1rem] w-28 shrink-0 cursor-not-allowed overflow-hidden"
              title="Süresi dolmadan tekrar gönderilemez"
            >
              <span className="absolute inset-0 flex items-center whitespace-nowrap text-[0.8rem] font-medium text-text-muted/40 transition-transform duration-200 ease-out group-hover:-translate-y-full">
                Tekrar Gönder
              </span>
              <span className="absolute inset-0 flex translate-y-full items-center whitespace-nowrap text-[0.75rem] text-text-muted transition-transform duration-200 ease-out group-hover:translate-y-0">
                {formatRemainingTime(invitation.expires_at)}
              </span>
            </div>
          )}
          <button
            onClick={() => setIsConfirmingRevoke(true)}
            className="rounded-full bg-danger px-3.5 py-1.5 text-[0.8rem] font-medium text-cta-text transition-opacity duration-150 hover:opacity-90"
          >
            İptal Et
          </button>
        </div>
      </div>

      {rowError && <p className="mt-1.5 text-[0.78rem] text-danger">{rowError}</p>}

      <Modal open={isConfirmingRevoke} onClose={() => setIsConfirmingRevoke(false)}>
        <ModalTitle>Daveti iptal et</ModalTitle>
        <ModalDescription>{invitation.email} adresine gönderilen davet iptal edilsin mi?</ModalDescription>
        <ModalFooter>
          <button
            onClick={() => setIsConfirmingRevoke(false)}
            className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text"
          >
            Vazgeç
          </button>
          <button
            onClick={handleRevoke}
            disabled={revoke.isPending}
            className="rounded-full bg-danger px-3.5 py-1.5 text-[0.8rem] font-medium text-cta-text transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
          >
            {revoke.isPending ? "İptal ediliyor..." : "İptal Et"}
          </button>
        </ModalFooter>
      </Modal>
    </li>
  );
}
