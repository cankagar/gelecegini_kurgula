export function formatFullName(
  person: { first_name?: string | null; last_name?: string | null },
  fallback = "İsimsiz Kullanıcı"
) {
  const full = [person.first_name, person.last_name].filter(Boolean).join(" ").trim();
  return full || fallback;
}
