import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Create or Find Admin User
    let admin = await prisma.user.findUnique({
      where: { email: "admin@payastem.com" },
    });

    if (!admin) {
      admin = await prisma.user.create({
        data: {
          email: "admin@payastem.com",
          username: "admin",
          passwordHash: "$2b$10$t577zUq4RpeM4tU9Gge2oee3MspF7XJv99.k6Gf1XjC3Z/0CDeY3S", // "123456"
          role: "ADMIN",
          name: "Sistem Yöneticisi",
        },
      });
      await prisma.profile.create({
        data: {
          userId: admin.id,
          fullName: "Sistem Yöneticisi",
          bio: "NexSTEM Platform Admin",
        }
      });
    } else {
      await prisma.user.update({
        where: { id: admin.id },
        data: { role: "ADMIN" }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Admin account seeded/verified successfully (admin@payastem.com / 123456)!",
    });
  } catch (error: any) {
    console.error("Admin Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
