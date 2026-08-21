"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { Modal, ModalTitle, ModalDescription, ModalFooter } from "@/shared/ui/modal";

const OUTPUT_SIZE = 480;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

type AvatarCropModalProps = {
  open: boolean;
  file: File | null;
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
  isSubmitting?: boolean;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function cropToWebpBlob(imageUrl: string, area: Area): Promise<Blob> {
  const image = await loadImage(imageUrl);

  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Görsel işlenemedi — tarayıcı desteklemiyor.");

  ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Görsel dönüştürülemedi."))),
      "image/webp",
      0.92
    );
  });
}

// Dairesel avatar kırpma — react-easy-crop pan/zoom'u yönetir, "Tamam" dediğinde
// son seçilen alan canvas'a çizilip webp blob olarak döner. Kare çıktı yeterli —
// `Avatar` component'i görüntülendiği her yerde `rounded-full` ile daireye
// kırpıyor, burada ek maskeye gerek yok.
export function AvatarCropModal({
  open,
  file,
  onCancel,
  onConfirm,
  isSubmitting = false,
}: AvatarCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  // Kütüphane resim decode hatasını sessizce yutuyor (boş daire kalır) —
  // örn. iPhone HEIC formatı Chrome/Firefox'ta <img> ile açılamaz.
  const [loadError, setLoadError] = useState(false);

  // Lazy initializer — mount başına TEK sefer oluşturulur. Bunu bir effect
  // içinde oluşturup ayrı effect'te revoke etmek (önceki hâl) dev'de
  // StrictMode'un mount→cleanup→remount döngüsünde URL'i erken revoke edip
  // aynı (artık geçersiz) URL'i tutmaya yol açıyordu — format bağımsız her
  // yüklemeyi bozan buydu. Revoke artık sadece bu component'in gerçek kapanış
  // noktalarında (Vazgeç/Tamam) imperative olarak yapılıyor, effect'e bağlı değil.
  const [imageUrl] = useState<string | null>(() =>
    file ? URL.createObjectURL(file) : null
  );

  const handleCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  function handleCancel() {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    onCancel();
  }

  async function handleConfirm() {
    if (!imageUrl || !croppedAreaPixels) return;
    setIsCropping(true);
    try {
      const blob = await cropToWebpBlob(imageUrl, croppedAreaPixels);
      onConfirm(blob);
    } catch {
      // hata mesajı çağıran tarafta (AvatarUpload) yakalanıp gösteriliyor
    } finally {
      URL.revokeObjectURL(imageUrl);
      setIsCropping(false);
    }
  }

  const busy = isCropping || isSubmitting;

  return (
    <Modal open={open} onClose={handleCancel} ariaLabel="Profil fotoğrafını kırp">
      <ModalTitle>Profil fotoğrafını kırp</ModalTitle>
      <ModalDescription>Fotoğrafı sürükle, kaydırma çubuğuyla yakınlaştır.</ModalDescription>

      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="relative h-[280px] w-[280px] overflow-hidden rounded-2xl bg-bg-alt">
          {imageUrl && !loadError && (
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              objectFit="cover"
              showGrid={false}
              minZoom={MIN_ZOOM}
              maxZoom={MAX_ZOOM}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              mediaProps={{ onError: () => setLoadError(true) }}
            />
          )}
          {loadError && (
            <p className="flex h-full items-center px-6 text-center text-[0.8rem] text-danger">
              Bu görsel açılamadı — formatı desteklenmiyor olabilir (örn. HEIC). Lütfen JPG, PNG
              veya WEBP formatında bir fotoğraf seçin.
            </p>
          )}
        </div>

        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          disabled={loadError}
          aria-label="Yakınlaştır"
          className="w-full max-w-[260px] accent-primary disabled:opacity-40"
        />
      </div>

      <ModalFooter>
        <button
          onClick={handleCancel}
          disabled={busy}
          className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-medium text-text-muted transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-text hover:bg-text hover:text-cta-text disabled:opacity-50"
        >
          Vazgeç
        </button>
        <button
          onClick={handleConfirm}
          disabled={!croppedAreaPixels || busy}
          className="rounded-full bg-text px-3.5 py-1.5 text-[0.8rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Yükleniyor..." : "Tamam"}
        </button>
      </ModalFooter>
    </Modal>
  );
}
