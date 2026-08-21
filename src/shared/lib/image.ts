// Sıkıştırma kalitesi kademeleri — büyük görseller ilk kalitede limitin altına
// inmezse sırayla denenir, hâlâ sığmıyorsa boyut küçültülüp tekrar denenir.
const WEBP_QUALITY_STEPS = [0.92, 0.8, 0.65, 0.5, 0.35];
const MAX_DIMENSION = 2000;
const DOWNSCALE_FACTOR = 0.75;
const MAX_DOWNSCALE_ROUNDS = 2;

async function encodeAtQuality(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

/**
 * Görseli client-side webp'e çevirir ve `maxBytes` altına sıkıştırır — kalite
 * kademeleriyle yetmezse boyutu küçültüp tekrar dener. Presigned upload URL
 * bu blob'un byte boyutuna göre imzalanır, bu yüzden backend'e bu adımdan
 * SONRAKİ boyut gönderilmeli.
 */
export async function convertImageToWebp(source: Blob, maxBytes: number): Promise<Blob> {
  const bitmap = await createImageBitmap(source);
  let width = bitmap.width;
  let height = bitmap.height;
  const initialScale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  width = Math.round(width * initialScale);
  height = Math.round(height * initialScale);

  for (let round = 0; round <= MAX_DOWNSCALE_ROUNDS; round++) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Görsel işlenemedi — tarayıcı desteklemiyor.");
    ctx.drawImage(bitmap, 0, 0, width, height);

    for (const quality of WEBP_QUALITY_STEPS) {
      const blob = await encodeAtQuality(canvas, quality);
      if (blob && blob.size <= maxBytes) return blob;
    }

    width = Math.round(width * DOWNSCALE_FACTOR);
    height = Math.round(height * DOWNSCALE_FACTOR);
  }

  throw new Error("Görsel sıkıştırma sonrası hâlâ çok büyük. Daha küçük bir görsel seçin.");
}
