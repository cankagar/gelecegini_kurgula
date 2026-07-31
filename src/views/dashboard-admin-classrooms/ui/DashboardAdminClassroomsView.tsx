"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClassroomsQuery, useCreateClassroomMutation } from "@/entities/classroom";
import { SpinnerIcon } from "@/shared/ui/icons";

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
      router.push(`/dashboard/admin/classrooms/${classroom.id}/edit`);
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-heading text-2xl font-bold text-text tracking-[-0.02em]">Sınıflar</h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">Sınıf oluştur ve öğrenci ata.</p>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
        <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Sınıf adı ile ara..."
            className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
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
            className="rounded-md bg-text px-3.5 py-2 text-[0.85rem] font-medium text-white transition-opacity duration-150 hover:opacity-90"
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
              <th className="px-4 py-2.5 font-medium">Durum</th>
              <th className="px-4 py-2.5 font-medium">Oluşturulma Tarihi</th>
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
                onClick={() => router.push(`/dashboard/admin/classrooms/${classroom.id}`)}
                className="cursor-pointer border-b border-border last:border-0 text-text transition-colors duration-150 hover:bg-surface"
              >
                <td className="px-4 py-2.5 font-medium">{classroom.name}</td>
                <td className="px-4 py-2.5">
                  {classroom.closed_at ? (
                    <span className="rounded-full bg-danger-bg px-2 py-0.5 text-[0.75rem] font-medium text-danger">
                      Kapandı · {formatDate(classroom.closed_at)}
                    </span>
                  ) : (
                    <span className="rounded-full bg-success-bg px-2 py-0.5 text-[0.75rem] font-medium text-success">
                      Aktif
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-text-muted">{formatDate(classroom.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
