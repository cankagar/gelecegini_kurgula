export type InvitationStatus = "pending" | "expired" | "accepted" | "revoked";

export type ClassroomInvitation = {
  id: string;
  email: string;
  status: InvitationStatus;
  invited_by: string;
  expires_at: string;
  created_at: string;
};

// Admin'in girdiği email zaten STUDENT'sa mail atılmadan direkt eklenir ("added"),
// aksi halde davet e-postası gönderilir ("invited") — backend'in tek kararı.
export type InvitationCreateResult = {
  status: "added" | "invited";
};

// Public — davet linkine giden kullanıcı için: hesabı var mı, hangi sınıfa davetli.
export type InvitationInfo = {
  email: string;
  classroom_name: string;
  account_exists: boolean;
};

export type InvitationAcceptSignupPayload = {
  password: string;
  first_name?: string;
  last_name?: string;
};
