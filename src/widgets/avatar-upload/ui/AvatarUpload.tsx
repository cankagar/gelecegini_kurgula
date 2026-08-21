"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Camera, X } from "lucide-react";
import { useAvatarUploadMutation, useRemoveAvatarMutation } from "@/entities/user";
import { Avatar } from "@/shared/ui/avatar";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { SpinnerIcon } from "@/shared/ui/icons";
import { AvatarCropModal } from "./AvatarCropModal";

type AvatarUploadProps = {
  userId: string;
  name: string;
  avatarUrl: string | null;
  size?: number;
  /** Sadece admin — kullanıcı kendi fotoğrafını kaldıramaz, sadece değiştirebilir. */
  canRemove?: boolean;
  className?: string;
};

// Profil-detay ve kendi-profil sayfalarının paylaştığı avatar düzenleme bloğu —
// tıklayınca dosya seçtirir, client-side webp'e çevirip yükler; admin ayrıca
// kaldırabilir. Bkz. entities/user/lib/useAvatarUploadMutation.
export function AvatarUpload({
  userId,
  name,
  avatarUrl,
  size = 48,
  canRemove = false,
  className = "",
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  // Her yeni dosya seçiminde artar — AvatarCropModal'ı bu `key` ile yeniden
  // mount ettirip zoom/pan/naturalSize'ı sıfırdan başlatmak için.
  const [cropToken, setCropToken] = useState(0);
  const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const upload = useAvatarUploadMutation(userId);
  const remove = useRemoveAvatarMutation(userId);

  const isBusy = upload.isPending || remove.isPending;

  function pickFile() {
    setLocalError(null);
    inputRef.current?.click();
  }

  function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setLocalError(null);
    setCropToken((t) => t + 1);
    setPendingFile(file);
  }

  function cancelCrop() {
    setPendingFile(null);
    upload.reset();
  }

  async function confirmCrop(croppedBlob: Blob) {
    try {
      await upload.mutateAsync(croppedBlob);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Fotoğraf yüklenemedi.");
    } finally {
      setPendingFile(null);
    }
  }

  async function confirmRemove() {
    try {
      await remove.mutateAsync();
      setIsConfirmingRemove(false);
    } catch {
      // hata mesajı aşağıda mutation state'inden okunuyor, dialog açık kalır
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={pickFile}
        disabled={isBusy}
        aria-label="Profil fotoğrafını değiştir"
        className="group relative block rounded-full disabled:cursor-not-allowed"
      >
        <Avatar name={name} src={avatarUrl} size={size} />
        <span
          style={{ width: size, height: size }}
          className="absolute inset-0 flex items-center justify-center rounded-full text-white opacity-0 transition-opacity duration-150 group-hover:bg-black/40 group-hover:opacity-100"
        >
          {isBusy ? (
            <SpinnerIcon className="animate-spin" size={size * 0.4} />
          ) : (
            <Camera size={size * 0.4} />
          )}
        </span>
      </button>

      {canRemove && avatarUrl && (
        <button
          type="button"
          onClick={() => setIsConfirmingRemove(true)}
          disabled={isBusy}
          aria-label="Fotoğrafı kaldır"
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-bg text-text-muted transition-colors duration-150 hover:text-danger disabled:opacity-50"
        >
          <X size={12} />
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileSelected}
      />

      {(localError || upload.isError || remove.isError) && (
        <p className="absolute left-1/2 top-full z-10 mt-1 w-40 -translate-x-1/2 text-center text-[0.7rem] text-danger">
          {localError ?? "İşlem başarısız oldu."}
        </p>
      )}

      <ConfirmDialog
        open={isConfirmingRemove}
        onClose={() => setIsConfirmingRemove(false)}
        onConfirm={confirmRemove}
        title="Profil fotoğrafını kaldır"
        description="Bu kullanıcının profil fotoğrafı kaldırılacak. Bu işlem geri alınamaz."
        confirmLabel="Kaldır"
        pendingLabel="Kaldırılıyor..."
        isPending={remove.isPending}
      />

      <AvatarCropModal
        key={cropToken}
        open={pendingFile !== null}
        file={pendingFile}
        onCancel={cancelCrop}
        onConfirm={confirmCrop}
        isSubmitting={upload.isPending}
      />
    </div>
  );
}
