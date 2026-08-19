"use client";

import { Modal, ModalTitle, ModalDescription, ModalFooter } from "@/shared/ui/modal";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  pendingLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  /** "danger" = kırmızı onay butonu (silme/geri alınamaz işlemler). "default" = nötr işlemler için. */
  variant?: "danger" | "default";
};

const CONFIRM_BUTTON_CLASSES = {
  danger: "bg-danger text-cta-text hover:opacity-90",
  default: "bg-text text-white hover:opacity-90",
} as const;

/**
 * Geri alınamaz/yıkıcı işlemler (silme, iptal, kaldırma) için ortak onay diyaloğu.
 * Hiçbir silme aksiyonu doğrudan mutation'ı tetiklemez — önce bu diyalogla kullanıcıdan
 * onay alınır. `Modal` üzerine kurulu; title/description/footer'ı burada sabitler.
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Onayla",
  pendingLabel = "İşleniyor...",
  cancelLabel = "Vazgeç",
  isPending = false,
  variant = "danger",
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel={title}>
      <ModalTitle>{title}</ModalTitle>
      {description && <ModalDescription>{description}</ModalDescription>}
      <ModalFooter>
        <button
          onClick={onClose}
          disabled={isPending}
          className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text disabled:opacity-50"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          disabled={isPending}
          className={`rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium transition-opacity duration-150 disabled:opacity-50 ${CONFIRM_BUTTON_CLASSES[variant]}`}
        >
          {isPending ? pendingLabel : confirmLabel}
        </button>
      </ModalFooter>
    </Modal>
  );
}
