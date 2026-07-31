export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR");
}

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}
