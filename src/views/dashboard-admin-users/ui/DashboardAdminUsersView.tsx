"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminUsersQuery, ROLE_LABELS } from "@/entities/user";
import type { UserRole } from "@/entities/user";
import { SpinnerIcon, UsersIcon, CheckCircleIcon, AlertTriangleIcon } from "@/shared/ui/icons";
import { Avatar } from "@/shared/ui/avatar";
import { SearchInput } from "@/shared/ui/search-input";
import { ROUTES } from "@/shared/lib/routes";

const TABS: { label: string; role: UserRole | undefined }[] = [
  { label: "Tümü", role: undefined },
  { label: "Öğrenciler", role: "student" },
  { label: "Öğretmenler", role: "teacher" },
  { label: "Adminler", role: "admin" },
];

export function DashboardAdminUsersView() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState<UserRole | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInput.trim()), 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const isSearching = search.length > 0;
  const { data: users, isLoading, isError } = useAdminUsersQuery(search, activeRole);

  const stats = useMemo(() => {
    const total = users?.length ?? 0;
    const active = users?.filter((u) => u.is_active).length ?? 0;
    return { total, active, inactive: total - active };
  }, [users]);

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">Kullanıcılar</h1>
        <p className="text-[0.9rem] text-text-muted">Tüm kayıtlı kullanıcıları görüntüle ve ara.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Toplam kullanıcı", value: stats.total, Icon: UsersIcon },
          { label: "Aktif", value: stats.active, Icon: CheckCircleIcon },
          { label: "Pasif", value: stats.inactive, Icon: AlertTriangleIcon },
        ].map(({ label, value, Icon }) => (
          <div key={label} className="rounded-2xl bg-border p-1.5">
            <div className="flex items-center gap-3 rounded-[calc(1rem-0.375rem)] bg-bg px-5 py-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-tint text-accent">
                <Icon size={18} />
              </span>
              <div>
                <p className="font-heading text-xl font-bold text-text tracking-[-0.02em]">{value}</p>
                <p className="text-[0.78rem] text-text-muted">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder="İsim veya e-posta ile ara..."
          className="sm:max-w-sm"
        />

        {!isSearching && (
          <div className="flex gap-1 border-b border-border sm:border-b-0">
            {TABS.map((tab) => {
              const active = activeRole === tab.role;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveRole(tab.role)}
                  className={`-mb-px border-b-2 px-3 py-2 text-[0.85rem] font-medium transition-colors duration-150 ${
                    active ? "border-primary text-text" : "border-transparent text-text-muted hover:text-text"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-border">
        <table className="w-full text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-text-muted">
              <th className="px-4 py-2.5 font-medium">Ad Soyad</th>
              <th className="px-4 py-2.5 font-medium">E-posta</th>
              <th className="px-4 py-2.5 font-medium">Rol</th>
              <th className="px-4 py-2.5 font-medium">Durum</th>
            </tr>
          </thead>
          <tbody key={`${activeRole ?? "all"}-${search}`}>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                  <SpinnerIcon className="mx-auto animate-spin" size={20} />
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                  Kullanıcılar yüklenemedi.
                </td>
              </tr>
            )}

            {!isLoading && !isError && users?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                  Kullanıcı bulunamadı.
                </td>
              </tr>
            )}

            {users?.map((user) => (
              <tr
                key={user.id}
                onClick={() => router.push(ROUTES.ADMIN.USER_DETAIL(user.id))}
                className="cursor-pointer border-b border-border text-text transition-colors duration-150 last:border-0 hover:bg-surface"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={user.full_name ?? user.email ?? "?"} size={28} />
                    <span className="font-medium">{user.full_name ?? "—"}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-text-muted">{user.email ?? "—"}</td>
                <td className="px-4 py-2.5">{ROLE_LABELS[user.role] ?? user.role}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.75rem] font-medium ${
                      user.is_active ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                    }`}
                  >
                    {user.is_active ? "Aktif" : "Pasif"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
