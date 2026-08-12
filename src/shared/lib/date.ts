export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR");
}

// "Bugün"ün yerel (TR) tarihini YYYY-MM-DD döner. `toISOString()` UTC kullandığı
// için gece yarısına yakın saatlerde bir gün kaymasına yol açabilir — bu yüzden
// tarih varsayılanları (ör. yoklama formu) için bu fonksiyon kullanılmalı.
export function todayLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

// Bir zaman damgasına kalan süreyi kısa Türkçe metne çevirir ("2g 3s sonra").
// Şu ana kadar süresi geçmişse "Süresi doldu" döner.
export function formatRemainingTime(target: string) {
  const diffMs = new Date(target).getTime() - Date.now();
  if (diffMs <= 0) return "Süresi doldu";

  const days = Math.floor(diffMs / 86_400_000);
  const hours = Math.floor((diffMs % 86_400_000) / 3_600_000);
  if (days > 0) return `${days}g ${hours}s sonra`;

  const minutes = Math.floor((diffMs % 3_600_000) / 60_000);
  if (hours > 0) return `${hours}s ${minutes}dk sonra`;

  return `${minutes}dk sonra`;
}
