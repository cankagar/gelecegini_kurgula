"use client";

import { useQuery } from "@tanstack/react-query";
import { listAuditLog } from "@/entities/audit-log/api/auditLogApi";

export const AUDIT_LOG_PAGE_SIZE = 30;

export function useAuditLogQuery(page: number, targetType?: string, action?: string) {
  return useQuery({
    queryKey: ["auditLog", page, targetType ?? "all", action ?? "all"],
    queryFn: () =>
      listAuditLog({
        skip: (page - 1) * AUDIT_LOG_PAGE_SIZE,
        limit: AUDIT_LOG_PAGE_SIZE,
        targetType,
        action,
      }),
    staleTime: 15 * 1000,
  });
}
