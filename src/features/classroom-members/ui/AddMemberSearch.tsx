"use client";

import { useState } from "react";
import { useClassroomMutations, useClassroomQuery } from "@/entities/classroom";
import { useAdminUsersQuery, ROLE_LABELS, type UserRole } from "@/entities/user";
import { formatFullName, useDebouncedValue } from "@/shared/lib";

type AddMemberSearchProps = {
  classroomId: string;
  title: string;
  description: string;
  // Arama sonuçları bu rollerden birine sahip olmayan kullanıcılar için elenir.
  eligibleRoles: UserRole[];
  // Backend'e gönderilen `role` query param'ı — verilirse arama o role
  // sabitlenir (örn. öğrenci aramasında "student"). Boş bırakılırsa backend
  // arayan kullanıcının rolüne göre kendi kısıtlamasını uygular.
  searchRole?: UserRole;
};

export function AddMemberSearch({
  classroomId,
  title,
  description,
  eligibleRoles,
  searchRole,
}: AddMemberSearchProps) {
  const { data: classroom } = useClassroomQuery(classroomId);
  const { addMember } = useClassroomMutations(classroomId);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 600);
  const { data: searchData, isFetching } = useAdminUsersQuery(
    debouncedSearch,
    searchRole,
    debouncedSearch.trim().length > 0
  );
  const isSearching = isFetching || search !== debouncedSearch;

  const existingMemberIds = new Set(classroom?.members.map((m) => m.member_id));
  const eligibleRoleSet = new Set(eligibleRoles);
  const searchResults = (searchData ?? []).filter(
    (u) => u.roles.some((r) => eligibleRoleSet.has(r)) && !existingMemberIds.has(u.id)
  );

  async function handleAdd(memberId: string) {
    try {
      await addMember.mutateAsync(memberId);
      setSearch("");
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  return (
    <div>
      <h2 className="text-[0.9rem] font-medium text-text">{title}</h2>
      <p className="mt-1 text-[0.8rem] text-text-muted">{description}</p>
      <div className="relative mt-3 max-w-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="İsim veya e-posta ile ara..."
          className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        {search.trim().length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-border bg-bg shadow-sm">
            {isSearching && (
              <div className="px-3 py-2.5 text-[0.85rem] text-text-muted">Aranıyor...</div>
            )}
            {!isSearching && searchResults.length === 0 && (
              <div className="px-3 py-2.5 text-[0.85rem] text-text-muted">
                Uygun kullanıcı bulunamadı.
              </div>
            )}
            {!isSearching &&
              searchResults.map((candidate) => (
                <button
                  key={candidate.id}
                  onClick={() => handleAdd(candidate.id)}
                  disabled={addMember.isPending}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[0.85rem] text-text transition-colors duration-150 hover:bg-surface disabled:opacity-50"
                >
                  <span>
                    <span className="font-medium">{formatFullName(candidate, "İsimsiz")}</span>{" "}
                    <span className="text-text-muted">{candidate.email}</span>{" "}
                    <span className="text-[0.75rem] text-text-muted">
                      ({candidate.roles.map((r) => ROLE_LABELS[r] ?? r).join(", ")})
                    </span>
                  </span>
                  <span className="text-text-muted">Ekle</span>
                </button>
              ))}
          </div>
        )}
      </div>

      {addMember.isError && (
        <p className="mt-2 text-[0.8rem] text-danger">
          Kullanıcı eklenemedi. Zaten sınıfta olabilir veya rolü uygun değil.
        </p>
      )}
    </div>
  );
}
