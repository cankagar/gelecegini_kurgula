"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminUsersQuery } from "@/entities/user";
import type { UserRole } from "@/entities/user";
import { SpinnerIcon } from "@/shared/ui/icons";

const ROLE_LABELS: Record<string, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
  student: "Öğrenci",
  user: "Kullanıcı",
};

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

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-heading text-2xl font-bold text-text tracking-[-0.02em]">Kullanıcılar</h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">
        Tüm kayıtlı kullanıcıları görüntüle ve ara.
      </p>

      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="İsim veya e-posta ile ara..."
        className="mt-6 w-full max-w-sm rounded-md border border-[#EAEAEA] bg-white px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#111111]/10"
      />

      {!isSearching && (
        <div className="mt-5 flex gap-1 border-b border-[#EAEAEA]">
          {TABS.map((tab) => {
            const active = activeRole === tab.role;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveRole(tab.role)}
                className={`px-3 py-2 text-[0.85rem] font-medium border-b-2 -mb-px transition-colors duration-150 ${
                  active
                    ? "border-[#111111] text-text"
                    : "border-transparent text-text-muted hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-md border border-[#EAEAEA]">
        <table className="w-full text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-[#EAEAEA] bg-[#FBFBFA] text-text-muted">
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
                onClick={() => router.push(`/dashboard/admin/users/${user.id}`)}
                className="cursor-pointer border-b border-[#EAEAEA] last:border-0 text-text transition-colors duration-150 hover:bg-[#F0EFEC]"
              >
                <td className="px-4 py-2.5 font-medium">{user.full_name ?? "—"}</td>
                <td className="px-4 py-2.5 text-text-muted">{user.email ?? "—"}</td>
                <td className="px-4 py-2.5">{ROLE_LABELS[user.role] ?? user.role}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.75rem] font-medium ${
                      user.is_active
                        ? "bg-[#E6F4EA] text-[#1E7A34]"
                        : "bg-[#F3E8E8] text-[#B3261E]"
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
