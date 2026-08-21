"use client";

import { useState } from "react";
import { AUDIT_LOG_PAGE_SIZE, useAuditLogQuery } from "@/entities/audit-log";
import type { AuditLogEntry } from "@/entities/audit-log";
import { SpinnerIcon } from "@/shared/ui/icons";
import { Modal, ModalDescription, ModalTitle } from "@/shared/ui/modal";
import { Pagination } from "@/shared/ui/pagination";

const ACTIONS = [
  { value: "", label: "Tüm işlemler" },
  { value: "user_role_added", label: "Rol eklendi" },
  { value: "user_role_removed", label: "Rol kaldırıldı" },
  { value: "user_activated", label: "Hesap aktifleştirildi" },
  { value: "user_deactivated", label: "Hesap deaktive edildi" },
  { value: "classroom_invitation_accepted", label: "Davet kabul edildi" },
  { value: "classroom_closed", label: "Sınıf kapatıldı" },
  { value: "classroom_reopened", label: "Sınıf yeniden açıldı" },
  { value: "classroom_deleted", label: "Sınıf silindi" },
];

const TARGET_TYPES = [
  { value: "", label: "Tüm hedefler" },
  { value: "user", label: "Kullanıcı" },
  { value: "classroom", label: "Sınıf" },
  { value: "classroom_invitation", label: "Sınıf daveti" },
];

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("tr-TR");
}

function actorLabel(entry: { actor_email: string | null; actor_first_name: string | null; actor_last_name: string | null; actor_id: string | null }) {
  if (entry.actor_email) {
    const name = [entry.actor_first_name, entry.actor_last_name].filter(Boolean).join(" ");
    return name ? `${name} (${entry.actor_email})` : entry.actor_email;
  }
  return entry.actor_id ?? "—";
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border py-2.5 last:border-0">
      <span className="text-[0.75rem] font-medium text-text-muted">{label}</span>
      <span className="break-all text-[0.85rem] text-text">{value}</span>
    </div>
  );
}

function AuditLogDetailModal({ entry, onClose }: { entry: AuditLogEntry | null; onClose: () => void }) {
  return (
    <Modal open={entry !== null} onClose={onClose} ariaLabel="Denetim kaydı detayı" size="lg">
      {entry && (
        <>
          <ModalTitle>{entry.action}</ModalTitle>
          <ModalDescription>{formatDateTime(entry.created_at)}</ModalDescription>

          <div className="mt-4">
            <DetailRow label="İşlemi Yapan" value={actorLabel(entry)} />
            <DetailRow label="Actor ID" value={entry.actor_id ?? "—"} />
            <DetailRow label="Hedef Tipi" value={entry.target_type} />
            <DetailRow label="Hedef ID" value={entry.target_id} />
          </div>

          <div className="mt-2">
            <span className="text-[0.75rem] font-medium text-text-muted">Metadata (snapshot)</span>
            {Object.keys(entry.metadata).length > 0 ? (
              <pre className="mt-1.5 overflow-x-auto rounded-md bg-bg-alt p-3 text-[0.8rem] text-text">
                {JSON.stringify(entry.metadata, null, 2)}
              </pre>
            ) : (
              <p className="mt-1.5 text-[0.85rem] text-text-muted">Kayıtlı metadata yok.</p>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}

export function DashboardAdminAuditLogView() {
  const [actionFilter, setActionFilter] = useState("");
  const [targetTypeFilter, setTargetTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState<AuditLogEntry | null>(null);

  const { data, isLoading, isError } = useAuditLogQuery(
    page,
    targetTypeFilter || undefined,
    actionFilter || undefined
  );
  const entries = data?.items;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / AUDIT_LOG_PAGE_SIZE)) : 1;

  function handleActionChange(value: string) {
    setActionFilter(value);
    setPage(1);
  }

  function handleTargetTypeChange(value: string) {
    setTargetTypeFilter(value);
    setPage(1);
  }

  return (
    <div className="w-full px-8 py-10 lg:px-12">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-[1.9rem] font-bold text-text tracking-[-0.025em]">
          Denetim Kaydı
        </h1>
        <p className="text-[0.9rem] text-text-muted">
          Rol değişiklikleri, hesap durumu ve davet kabulleri gibi güvenlik hassasiyeti olan işlemler.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <select
          value={actionFilter}
          onChange={(e) => handleActionChange(e.target.value)}
          className="rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text"
        >
          {ACTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={targetTypeFilter}
          onChange={(e) => handleTargetTypeChange(e.target.value)}
          className="rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] text-text"
        >
          {TARGET_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-border">
        <table className="w-full text-left text-[0.85rem]">
          <thead>
            <tr className="border-b border-border bg-bg-alt text-text-muted">
              <th className="px-4 py-2.5 font-medium">Zaman</th>
              <th className="px-4 py-2.5 font-medium">İşlemi Yapan</th>
              <th className="px-4 py-2.5 font-medium">İşlem</th>
              <th className="px-4 py-2.5 font-medium">Hedef</th>
            </tr>
          </thead>
          <tbody>
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
                  Denetim kaydı yüklenemedi.
                </td>
              </tr>
            )}

            {!isLoading && !isError && entries?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                  Kayıt bulunamadı.
                </td>
              </tr>
            )}

            {entries?.map((entry) => (
              <tr
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="cursor-pointer border-b border-border text-text transition-colors duration-150 last:border-0 hover:bg-surface"
              >
                <td className="px-4 py-2.5 text-text-muted">{formatDateTime(entry.created_at)}</td>
                <td className="px-4 py-2.5">{actorLabel(entry)}</td>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[0.75rem] font-medium text-text">
                    {entry.action}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-text-muted">
                  {entry.target_type}: {entry.target_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <AuditLogDetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </div>
  );
}
