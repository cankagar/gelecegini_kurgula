"use client";

import { useState, type FormEvent } from "react";
import {
  useClassroomInvitationMutations,
  useClassroomInvitationsQuery,
  type InvitationStatus,
} from "@/entities/classroom-invitation";
import { formatDateTime, formatRemainingTime } from "@/shared/lib/date";
import { ApiError } from "@/shared/api";
import { SpinnerIcon } from "@/shared/ui/icons";

const STATUS_LABELS: Record<InvitationStatus, string> = {
  pending: "Bekliyor",
  expired: "Süresi Doldu",
  accepted: "Kabul Edildi",
  revoked: "İptal Edildi",
};

const STATUS_CLASSES: Record<InvitationStatus, string> = {
  pending: "bg-primary-tint text-primary",
  expired: "bg-danger-bg text-danger",
  accepted: "bg-success-bg text-success",
  revoked: "bg-surface text-text-muted",
};

// İptal her zaman mümkün (hâlâ geçerli veya süresi dolmuş, farketmez).
// Tekrar gönderme ise sadece süresi dolmuşsa — geçerli bir link varken ikinci
// bir mail/token üretilmesin diye backend de bunu zorluyor.
const REVOKABLE = new Set<InvitationStatus>(["pending", "expired"]);
const RESENDABLE = new Set<InvitationStatus>(["expired"]);

type ClassroomInvitationsPanelProps = {
  classroomId: string;
};

export function ClassroomInvitationsPanel({ classroomId }: ClassroomInvitationsPanelProps) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rowError, setRowError] = useState<{ invitationId: string; message: string } | null>(null);

  const { data: invitations, isLoading } = useClassroomInvitationsQuery(classroomId);
  const { invite, revoke, resend } = useClassroomInvitationMutations(classroomId);

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setError(null);
    setFeedback(null);
    try {
      const result = await invite.mutateAsync(trimmed);
      setEmail("");
      setFeedback(
        result.status === "added"
          ? "Kullanıcı zaten öğrenciydi, direkt sınıfa eklendi."
          : "Davet e-postası gönderildi."
      );
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Davet gönderilemedi.");
    }
  }

  async function handleRevoke(invitationId: string) {
    if (!window.confirm("Bu daveti iptal etmek istediğine emin misin?")) return;
    setRowError(null);
    try {
      await revoke.mutateAsync(invitationId);
    } catch (err) {
      setRowError({
        invitationId,
        message: err instanceof ApiError ? err.message : "Davet iptal edilemedi.",
      });
    }
  }

  async function handleResend(invitationId: string) {
    setRowError(null);
    try {
      await resend.mutateAsync(invitationId);
    } catch (err) {
      setRowError({
        invitationId,
        message: err instanceof ApiError ? err.message : "Davet tekrar gönderilemedi.",
      });
    }
  }

  return (
    <div className="border-b border-border px-8 py-6">
      <h2 className="text-[0.9rem] font-medium text-text">Öğrenci Davet Et</h2>
      <p className="mt-1 text-[0.8rem] text-text-muted">
        E-posta zaten öğrenciyse direkt eklenir, değilse davet linki gönderilir.
      </p>

      <form onSubmit={handleInvite} className="mt-3 flex max-w-sm gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ogrenci@example.com"
          required
          className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={invite.isPending}
          className="shrink-0 rounded-md bg-primary px-3 py-2 text-[0.8rem] font-medium text-cta-text transition-colors duration-150 hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {invite.isPending ? "Gönderiliyor..." : "Davet Et"}
        </button>
      </form>

      {feedback && <p className="mt-2 text-[0.8rem] text-success">{feedback}</p>}
      {error && <p className="mt-2 text-[0.8rem] text-danger">{error}</p>}

      <div className="mt-5">
        {isLoading && (
          <div className="flex justify-center py-4 text-text-muted">
            <SpinnerIcon className="animate-spin" size={16} />
          </div>
        )}

        {invitations && invitations.length > 0 && (
          <ul className="divide-y divide-border rounded-md border border-border">
            {invitations.map((invitation) => (
              <li key={invitation.id} className="px-4 py-2.5 text-[0.85rem]">
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

                  {REVOKABLE.has(invitation.status) && (
                    <div className="flex shrink-0 items-center gap-3">
                      {RESENDABLE.has(invitation.status) && (
                        <button
                          onClick={() => handleResend(invitation.id)}
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
                          <span className="absolute inset-0 flex items-center translate-y-full whitespace-nowrap text-[0.75rem] text-text-muted transition-transform duration-200 ease-out group-hover:translate-y-0">
                            {formatRemainingTime(invitation.expires_at)}
                          </span>
                        </div>
                      )}
                      {REVOKABLE.has(invitation.status) && (
                        <button
                          onClick={() => handleRevoke(invitation.id)}
                          disabled={revoke.isPending}
                          className="text-[0.8rem] font-medium text-danger underline underline-offset-2 transition-colors duration-150 hover:opacity-80 disabled:opacity-50"
                        >
                          İptal Et
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {rowError && rowError.invitationId === invitation.id && (
                  <p className="mt-1.5 text-[0.78rem] text-danger">{rowError.message}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
