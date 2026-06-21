import { NextResponse } from "next/server";
export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, email, password, role } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Eksik bilgi girdiniz." }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ message: "Bu e-posta veya kullanıcı adı zaten kullanımda." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        role: role || "STUDENT",
        profile: {
          create: {
            fullName: username,
          }
        }
      }
    });

    return NextResponse.json({ message: "Kullanıcı başarıyla oluşturuldu.", userId: user.id }, { status: 201 });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
