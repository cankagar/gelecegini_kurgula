"use client";

import { useQuery } from "@tanstack/react-query";
import { listAuditLog } from "@/entities/audit-log/api/auditLogApi";

export const AUDIT_LOG_PAGE_SIZE = 30;

export type AuditLogFilters = {
  targetType?: string;
  action?: string;
  createdFrom?: string;
  createdTo?: string;
};

export function useAuditLogQuery(page: number, filters: AuditLogFilters) {
  const { targetType, action, createdFrom, createdTo } = filters;

  return useQuery({
    queryKey: [
      "auditLog",
      page,
      targetType ?? "all",
      action ?? "all",
      createdFrom ?? "any",
      createdTo ?? "any",
    ],
    queryFn: () =>
      listAuditLog({
        skip: (page - 1) * AUDIT_LOG_PAGE_SIZE,
        limit: AUDIT_LOG_PAGE_SIZE,
        targetType,
        action,
        createdFrom,
        createdTo,
      }),
    staleTime: 15 * 1000,
  });
}
