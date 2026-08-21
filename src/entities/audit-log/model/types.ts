export type AuditLogEntry = {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  actor_first_name: string | null;
  actor_last_name: string | null;
  action: string;
  target_type: string;
  target_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type AuditLogPage = {
  items: AuditLogEntry[];
  total: number;
  skip: number;
  limit: number;
};
