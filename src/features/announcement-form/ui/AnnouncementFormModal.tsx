"use client";

import { useEffect, useState } from "react";
import { useAnnouncementMutations, type Announcement } from "@/entities/announcement";
import { Modal, ModalTitle } from "@/shared/ui/modal";

type AnnouncementFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSaved: (announcement: Announcement) => void;
  /** Verilirse düzenleme modu — alanlar bu duyurudan doldurulur, kaydet PATCH atar. */
  announcement?: Announcement | null;
};

const EXPIRY_PRESETS = [
  { label: "1 gün kalsın", days: 1 },
  { label: "2 gün kalsın", days: 2 },
  { label: "1 hafta kalsın", days: 7 },
];

// datetime-local input değeri saat dilimi taşımaz — yerel saate göre yazılır,
// sonradan `handleSubmit` içinde `new Date(...)` yerel olarak parse eder.
function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function AnnouncementFormModal({ open, onClose, onSaved, announcement }: AnnouncementFormModalProps) {
  const isEditing = announcement != null;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const { create, update } = useAnnouncementMutations();
  const isPending = isEditing ? update.isPending : create.isPending;
  const isError = isEditing ? update.isError : create.isError;

  useEffect(() => {
    if (!open) return;
    setTitle(announcement?.title ?? "");
    setBody(announcement?.body ?? "");
    setExpiresAt(announcement?.expires_at ? toDatetimeLocalValue(new Date(announcement.expires_at)) : "");
  }, [open, announcement]);

  function applyExpiryPreset(days: number) {
    setExpiresAt(toDatetimeLocalValue(new Date(Date.now() + days * 24 * 60 * 60 * 1000)));
  }

  function reset() {
    setTitle("");
    setBody("");
    setExpiresAt("");
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody) return;

    try {
      const saved = isEditing
        ? await update.mutateAsync({
            id: announcement.id,
            params: {
              title: trimmedTitle,
              body: trimmedBody,
              expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
            },
          })
        : await create.mutateAsync({
            title: trimmedTitle,
            body: trimmedBody,
            expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
          });
      reset();
      onSaved(saved);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  return (
    <Modal open={open} onClose={handleClose} ariaLabel={isEditing ? "Duyuruyu Düzenle" : "Duyuru Oluştur"}>
      <ModalTitle>{isEditing ? "Duyuruyu Düzenle" : "Duyuru Oluştur"}</ModalTitle>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <label className="text-[0.8rem] font-medium text-text">Başlık</label>
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ör. Yarın sınavlar 1 saat erken başlıyor"
            className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-[0.8rem] font-medium text-text">Metin</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="Duyuru içeriği..."
            className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-[0.8rem] font-medium text-text">Bitiş tarihi (opsiyonel)</label>
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {EXPIRY_PRESETS.map((preset) => (
              <button
                key={preset.days}
                type="button"
                onClick={() => applyExpiryPreset(preset.days)}
                className="rounded-full border border-border px-3 py-1 text-[0.75rem] font-medium text-text-muted transition-colors duration-150 hover:border-primary-border hover:text-primary"
              >
                {preset.label}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[0.75rem] text-text-muted">Boş bırakılırsa duyuru 1 gün sonra otomatik kapanır.</p>
        </div>

        <button
          type="submit"
          disabled={isPending || !title.trim() || !body.trim()}
          className="rounded-md bg-primary px-3.5 py-2 text-[0.85rem] font-semibold text-cta-text transition-opacity duration-150 hover:bg-primary-hover disabled:opacity-50"
        >
          {isPending ? "Kaydediliyor..." : isEditing ? "Kaydet" : "Duyuruyu Yayınla"}
        </button>
        {isError && (
          <p className="text-[0.8rem] text-danger">
            {isEditing ? "Duyuru güncellenemedi." : "Duyuru oluşturulamadı."}
          </p>
        )}
      </form>
    </Modal>
  );
}
