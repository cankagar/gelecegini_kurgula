// Independent of `entities/user` (entities can't import sibling entities) —
// matches the backend's `UserRole` enum values relevant to classroom membership.
export type ClassroomMemberRole = "student" | "teacher" | "admin";

export type Classroom = {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
};

export type ClassroomMember = {
  member_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  roles: ClassroomMemberRole[];
  joined_at: string;
};

export type ClassroomWithMembers = Classroom & {
  members: ClassroomMember[];
};
