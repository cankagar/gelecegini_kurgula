import { httpClient, toApiError } from "@/shared/api";
import type { AuditLogPage } from "@/entities/audit-log/model/types";

export type ListAuditLogParams = {
  skip?: number;
  limit?: number;
  actorId?: string;
  targetType?: string;
  targetId?: string;
  action?: string;
  createdFrom?: string;
  createdTo?: string;
};

// Admin-only — backend rejects with 403 for non-admins.
export async function listAuditLog(params: ListAuditLogParams = {}) {
  try {
    const { skip, limit, actorId, targetType, targetId, action, createdFrom, createdTo } = params;
    const { data } = await httpClient.get<AuditLogPage>("/v1/audit-log", {
      params: {
        skip,
        limit,
        actor_id: actorId || undefined,
        target_type: targetType || undefined,
        target_id: targetId || undefined,
        action: action || undefined,
        created_from: createdFrom || undefined,
        created_to: createdTo || undefined,
      },
    });
    return data;
  } catch (err) {
    throw toApiError(err);
  }
}
