import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET /api/creator/applications - Fetch all creator applications (Admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Yetkisiz erişim. Bu işlem için yönetici yetkisi gereklidir." }, { status: 403 });
    }

    const applications = await prisma.creatorApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            role: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, data: applications });
  } catch (error: any) {
    console.error("GET creator applications error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/creator/applications - Approve or Reject an application (Admin only)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Yetkisiz erişim. Bu işlem için yönetici yetkisi gereklidir." }, { status: 403 });
    }

    const body = await request.json();
    const { applicationId, status, adminNotes } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ success: false, error: "Lütfen applicationId ve status alanlarını belirtin." }, { status: 400 });
    }

    if (status !== "APPROVED" && status !== "REJECTED") {
      return NextResponse.json({ success: false, error: "Geçersiz durum (status). APPROVED veya REJECTED olmalıdır." }, { status: 400 });
    }

    // Find the application
    const application = await prisma.creatorApplication.findUnique({
      where: { id: applicationId },
      include: { user: true }
    });

    if (!application) {
      return NextResponse.json({ success: false, error: "Başvuru bulunamadı." }, { status: 404 });
    }

    // Update application status
    const updatedApplication = await prisma.creatorApplication.update({
      where: { id: applicationId },
      data: {
        status,
        adminNotes: adminNotes || null
      }
    });

    // Update user role if status is APPROVED
    if (status === "APPROVED") {
      // Set to VERIFIED_CREATOR
      await prisma.user.update({
        where: { id: application.userId },
        data: { role: "VERIFIED_CREATOR" }
      });
    } else if (status === "REJECTED") {
      // Revert user role back to STUDENT if they were VERIFIED_CREATOR
      if (application.user.role === "VERIFIED_CREATOR") {
        await prisma.user.update({
          where: { id: application.userId },
          data: { role: "STUDENT" }
        });
      }
    }

    return NextResponse.json({ success: true, data: updatedApplication });
  } catch (error: any) {
    console.error("PUT creator applications error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
