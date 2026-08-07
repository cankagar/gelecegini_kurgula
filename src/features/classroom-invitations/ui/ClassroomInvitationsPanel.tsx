"use client";

import { useState, type FormEvent } from "react";
import { useClassroomInvitationMutations } from "@/entities/classroom-invitation";
import { ApiError } from "@/shared/api";

type ClassroomInvitationsPanelProps = {
  classroomId: string;
};

export function ClassroomInvitationsPanel({ classroomId }: ClassroomInvitationsPanelProps) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { invite } = useClassroomInvitationMutations(classroomId);

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

  return (
    <div>
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
    </div>
  );
}
