import { prisma } from "@/lib/prisma";

const ANON_EMAIL = "anonim@nexstem.local";

// No auth system: writes need a User row to satisfy FK constraints, so every
// public submission attaches to this single shared placeholder account.
export async function getAnonymousUserId() {
  const existing = await prisma.user.findUnique({ where: { email: ANON_EMAIL } });
  if (existing) return existing.id;

  const created = await prisma.user.create({
    data: {
      email: ANON_EMAIL,
      username: "anonim",
      name: "Misafir",
      passwordHash: "disabled",
    },
  });
  return created.id;
}
