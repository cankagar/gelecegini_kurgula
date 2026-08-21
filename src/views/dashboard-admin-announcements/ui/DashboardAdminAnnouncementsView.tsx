"use client";

import { useState } from "react";
import {
  ANNOUNCEMENTS_PAGE_SIZE,
  useAllAnnouncementsQuery,
  useAnnouncementMutations,
  type Announcement,
} from "@/entities/announcement";
import { AnnouncementFormModal } from "@/features/announcement-form";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { SpinnerIcon } from "@/shared/ui/icons";
import { Pagination } from "@/shared/ui/pagination";
import { formatDateTime, formatRemainingTime } from "@/shared/lib/date";

export function DashboardAdminAnnouncementsView() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useAllAnnouncementsQuery(page);
  const { update, remove } = useAnnouncementMutations();
  const announcements = data?.items;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / ANNOUNCEMENTS_PAGE_SIZE)) : 1;

  const [formTarget, setFormTarget] = useState<"create" | Announcement | null>(null);
  const [announcementToRemove, setAnnouncementToRemove] = useState<Announcement | null>(null);

  function toggleActive(announcement: Announcement) {
    update.mutate({ id: announcement.id, params: { isActive: !announcement.is_active } });
  }

  async function confirmDelete() {
    if (!announcementToRemove) return;
    await remove.mutateAsync(announcementToRemove.id);
    setAnnouncementToRemove(null);
  }

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">Duyurular</h1>
          <p className="text-[0.9rem] text-text-muted">
            Admin/öğretmen/öğrenci panellerinin üstünde gösterilen duyurular.
          </p>
        </div>

        <button
          onClick={() => setFormTarget("create")}
          className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-[0.85rem] font-semibold text-cta-text transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary-hover active:scale-[0.98]"
        >
          Duyuru Oluştur
        </button>
      </div>

      <AnnouncementFormModal
        open={formTarget !== null}
        onClose={() => setFormTarget(null)}
        onSaved={() => setFormTarget(null)}
        announcement={formTarget === "create" ? null : formTarget}
      />

      <div className="mt-6 overflow-hidden rounded-md border border-border">
        <table className="w-full text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-text-muted">
              <th className="px-4 py-2.5 font-medium">Başlık</th>
              <th className="px-4 py-2.5 font-medium">Metin</th>
              <th className="px-4 py-2.5 font-medium">Durum</th>
              <th className="px-4 py-2.5 font-medium">Oluşturulma</th>
              <th className="px-4 py-2.5 font-medium">Bitiş</th>
              <th className="px-4 py-2.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                  <SpinnerIcon className="mx-auto animate-spin" size={20} />
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                  Duyurular yüklenemedi.
                </td>
              </tr>
            )}

            {!isLoading && !isError && announcements?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                  Henüz duyuru yok.
                </td>
              </tr>
            )}

            {announcements?.map((announcement) => (
              <tr key={announcement.id} className="border-b border-border text-text last:border-0">
                <td className="px-4 py-2.5 font-medium">{announcement.title}</td>
                <td className="max-w-xs truncate px-4 py-2.5 text-text-muted">{announcement.body}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.75rem] font-medium ${
                      announcement.is_active ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                    }`}
                  >
                    {announcement.is_active ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-text-muted">{formatDateTime(announcement.created_at)}</td>
                <td className="px-4 py-2.5 text-text-muted">
                  {announcement.expires_at ? (
                    <div className="flex flex-col">
                      <span>{formatDateTime(announcement.expires_at)}</span>
                      <span className="text-[0.75rem]">{formatRemainingTime(announcement.expires_at)}</span>
                    </div>
                  ) : (
                    "Süresiz"
                  )}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => toggleActive(announcement)}
                      className={`rounded-full px-3 py-1 text-[0.8rem] font-medium transition-opacity duration-150 hover:opacity-80 ${
                        announcement.is_active
                          ? "bg-danger-bg text-danger"
                          : "bg-success-bg text-success"
                      }`}
                    >
                      {announcement.is_active ? "Pasif Yap" : "Aktif Yap"}
                    </button>
                    <button
                      onClick={() => setFormTarget(announcement)}
                      className="rounded-full bg-primary-tint px-3 py-1 text-[0.8rem] font-medium text-primary-hover transition-opacity duration-150 hover:opacity-80"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => setAnnouncementToRemove(announcement)}
                      className="rounded-full bg-danger-bg px-3 py-1 text-[0.8rem] font-medium text-danger transition-opacity duration-150 hover:opacity-80"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <ConfirmDialog
        open={announcementToRemove !== null}
        onClose={() => setAnnouncementToRemove(null)}
        onConfirm={confirmDelete}
        title="Duyuruyu sil"
        description={
          announcementToRemove
            ? `"${announcementToRemove.title}" duyurusu kalıcı olarak silinsin mi? Bu işlem geri alınamaz.`
            : undefined
        }
        confirmLabel="Sil"
        pendingLabel="Siliniyor..."
        isPending={remove.isPending}
      />
    </div>
  );
}
