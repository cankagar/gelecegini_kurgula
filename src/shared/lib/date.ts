export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR");
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
