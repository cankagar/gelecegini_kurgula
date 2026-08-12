"use client";

import { useState } from "react";
import { useClassroomMutations, useClassroomQuery } from "@/entities/classroom";
import { useAdminUsersQuery } from "@/entities/user";
import { ClassroomEditPanel } from "@/widgets/classroom-edit";
import { ROUTES } from "@/shared/lib/routes";
import { formatFullName, useDebouncedValue } from "@/shared/lib";

const ROLE_LABELS: Record<string, string> = {
  admin: "Yönetici",
  teacher: "Öğretmen",
};

// Öğrenciler artık "Öğrenci Davet Et" akışından eklenir (rol ataması + davet
// e-postası orada yönetiliyor) — bu arama kutusu sadece öğretmen/admin üyeliği için.
const ELIGIBLE_ROLES = new Set(["teacher", "admin"]);

type DashboardAdminClassroomEditViewProps = {
  classroomId: string;
};

export function DashboardAdminClassroomEditView({
  classroomId,
}: DashboardAdminClassroomEditViewProps) {
  const { data: classroom } = useClassroomQuery(classroomId);
  const { addMember } = useClassroomMutations(classroomId);

  const [memberSearch, setMemberSearch] = useState("");

  // Rol filtresi vermiyoruz: admin öğrenci, öğretmen veya admin — herhangi bir
  // uygun rolde kullanıcı arayabilmeli. "user" rolü ve mevcut üyeler aşağıda elenir.
  const debouncedMemberSearch = useDebouncedValue(memberSearch, 600);
  const { data: searchData, isFetching } = useAdminUsersQuery(
    debouncedMemberSearch,
    undefined,
    debouncedMemberSearch.trim().length > 0
  );
  const isSearching = isFetching || memberSearch !== debouncedMemberSearch;

  const existingMemberIds = new Set(classroom?.members.map((m) => m.member_id));
  const searchResults = (searchData ?? []).filter(
    (u) => u.roles.some((r) => ELIGIBLE_ROLES.has(r)) && !existingMemberIds.has(u.id)
  );

  async function handleAddMember(memberId: string) {
    try {
      await addMember.mutateAsync(memberId);
      setMemberSearch("");
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  return (
    <ClassroomEditPanel
      classroomId={classroomId}
      backHref={ROUTES.ADMIN.CLASSROOM_DETAIL(classroomId)}
      classroomsHref={ROUTES.ADMIN.CLASSROOMS}
      extraSection={
        <div>
          <h2 className="text-[0.9rem] font-medium text-text">Öğretmen/Admin Ekle</h2>
          <p className="mt-1 text-[0.8rem] text-text-muted">
            Öğretmen veya admin rolündeki kullanıcıları ekleyebilirsin.
          </p>
          <div className="relative mt-3 max-w-sm">
            <input
              type="text"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="İsim veya e-posta ile ara..."
              className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            {memberSearch.trim().length > 0 && (
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
                      onClick={() => handleAddMember(candidate.id)}
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
      }
    />
  );
}
