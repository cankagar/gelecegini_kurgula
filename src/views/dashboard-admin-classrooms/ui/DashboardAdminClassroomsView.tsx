"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClassroomsQuery, useCreateClassroomMutation } from "@/entities/classroom";
import { ROUTES } from "@/shared/lib/routes";
import { SpinnerIcon } from "@/shared/ui/icons";
import { SearchInput } from "@/shared/ui/search-input";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("tr-TR");
}

export function DashboardAdminClassroomsView() {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data: classrooms, isLoading, isError } = useClassroomsQuery(search);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const createClassroom = useCreateClassroomMutation();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput.trim());
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      const classroom = await createClassroom.mutateAsync(trimmed);
      setName("");
      setIsCreateOpen(false);
      router.push(ROUTES.ADMIN.CLASSROOM_EDIT(classroom.id));
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">Sınıflar</h1>
        <p className="text-[0.9rem] text-text-muted">Sınıf oluştur ve öğrenci ata.</p>
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-3">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
          <SearchInput value={searchInput} onChange={setSearchInput} placeholder="Sınıf adı ile ara..." />
          <button
            type="submit"
            className="shrink-0 rounded-md border border-border px-3.5 py-2 text-[0.85rem] font-medium text-text-muted transition-colors duration-150 hover:text-text"
          >
            Ara
          </button>
        </form>

        <div className="relative shrink-0">
          <button
            onClick={() => setIsCreateOpen((open) => !open)}
            className="rounded-full bg-primary px-5 py-2.5 text-[0.85rem] font-semibold text-cta-text transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-hover active:scale-[0.98]"
          >
            {isCreateOpen ? "Vazgeç" : "Oluştur"}
          </button>

          {isCreateOpen && (
            <form
              onSubmit={handleCreate}
              className="absolute right-0 z-10 mt-2 w-72 rounded-md border border-border bg-bg p-4 shadow-sm"
            >
              <label className="text-[0.8rem] font-medium text-text">Sınıf adı</label>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ör. 10-A Matematik"
                className="mt-1.5 w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={createClassroom.isPending || !name.trim()}
                className="mt-3 w-full rounded-md bg-primary px-3.5 py-2 text-[0.85rem] font-semibold text-cta-text transition-opacity duration-150 hover:bg-primary-hover disabled:opacity-50"
              >
                {createClassroom.isPending ? "Oluşturuluyor..." : "Sınıfı Oluştur"}
              </button>
              {createClassroom.isError && (
                <p className="mt-2 text-[0.8rem] text-danger">Sınıf oluşturulamadı.</p>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-border">
        <table className="w-full text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-text-muted">
              <th className="px-4 py-2.5 font-medium">Sınıf Adı</th>
              <th className="px-4 py-2.5 font-medium">Oluşturulma Tarihi</th>
              <th className="px-4 py-2.5 font-medium">Durum</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-text-muted">
                  <SpinnerIcon className="mx-auto animate-spin" size={20} />
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-text-muted">
                  Sınıflar yüklenemedi.
                </td>
              </tr>
            )}

            {!isLoading && !isError && classrooms?.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-text-muted">
                  {search ? "Aramayla eşleşen sınıf yok." : "Henüz sınıf yok."}
                </td>
              </tr>
            )}

            {classrooms?.map((classroom) => (
              <tr
                key={classroom.id}
                onClick={() => router.push(ROUTES.ADMIN.CLASSROOM_DETAIL(classroom.id))}
                className="cursor-pointer border-b border-border text-text transition-colors duration-150 last:border-0 hover:bg-surface"
              >
                <td className="px-4 py-2.5 font-medium">{classroom.name}</td>
                <td className="px-4 py-2.5 text-text-muted">{formatDate(classroom.created_at)}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.75rem] font-medium ${
                      classroom.closed_at ? "bg-danger-bg text-danger" : "bg-success-bg text-success"
                    }`}
                  >
                    {classroom.closed_at ? "Kapalı" : "Açık"}
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
