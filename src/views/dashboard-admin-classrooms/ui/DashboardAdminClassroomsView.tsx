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
  const { data: classrooms, isLoading, isError } = useClassroomsQuery();
  const createClassroom = useCreateClassroomMutation();

  const [name, setName] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      await createClassroom.mutateAsync(trimmed);
      setName("");
    } catch {
      // hata mesajı mutation state'inden okunuyor
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-heading text-2xl font-bold text-text tracking-[-0.02em]">Sınıflar</h1>
      <p className="mt-1.5 text-[0.9rem] text-text-muted">
        Sınıf oluştur ve öğrenci ata.
      </p>

      <form onSubmit={handleCreate} className="mt-6 flex max-w-sm gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sınıf adı"
          className="w-full rounded-md border border-[#EAEAEA] bg-white px-3 py-2 text-[0.85rem] text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#111111]/10"
        />
        <button
          type="submit"
          disabled={createClassroom.isPending || !name.trim()}
          className="shrink-0 rounded-md bg-[#111111] px-3.5 py-2 text-[0.85rem] font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
        >
          {createClassroom.isPending ? "Oluşturuluyor..." : "Oluştur"}
        </button>
      </form>

      {createClassroom.isError && (
        <p className="mt-2 text-[0.8rem] text-[#B3261E]">Sınıf oluşturulamadı.</p>
      )}

      <div className="mt-6 overflow-hidden rounded-md border border-[#EAEAEA]">
        <table className="w-full text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-[#EAEAEA] bg-[#FBFBFA] text-text-muted">
              <th className="px-4 py-2.5 font-medium">Sınıf Adı</th>
              <th className="px-4 py-2.5 font-medium">Oluşturulma Tarihi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-text-muted">
                  <SpinnerIcon className="mx-auto animate-spin" size={20} />
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-text-muted">
                  Sınıflar yüklenemedi.
                </td>
              </tr>
            )}

            {!isLoading && !isError && classrooms?.length === 0 && (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-text-muted">
                  Henüz sınıf yok.
                </td>
              </tr>
            )}

            {classrooms?.map((classroom) => (
              <tr
                key={classroom.id}
                onClick={() => router.push(`/dashboard/admin/classrooms/${classroom.id}`)}
                className="cursor-pointer border-b border-[#EAEAEA] last:border-0 text-text transition-colors duration-150 hover:bg-[#F0EFEC]"
              >
                <td className="px-4 py-2.5 font-medium">{classroom.name}</td>
                <td className="px-4 py-2.5 text-text-muted">{formatDate(classroom.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
