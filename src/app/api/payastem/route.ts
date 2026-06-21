import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET /api/payastem?level=...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const levelId = searchParams.get("level");

    if (!levelId) {
      return NextResponse.json({ success: false, error: "Level parameter is required" }, { status: 400 });
    }

    // Auth & Role verification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Giriş yapmanız gerekmektedir." }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    if (userRole === "STUDENT") {
      const userProfile = await prisma.profile.findUnique({
        where: { userId }
      });
      
      const allowed = isStudentAllowedForLevel(userProfile?.schoolLevel, levelId);
      if (!allowed) {
        return NextResponse.json({ 
          success: false, 
          isRestricted: true,
          error: `Bu seviyedeki içerikleri görüntüleme yetkiniz bulunmamaktadır. Kendi sınıf seviyeniz: ${userProfile?.schoolLevel || "Belirtilmemiş"}` 
        }, { status: 403 });
      }
    }

    // Verify if class level exists
    const classLevel = await prisma.classLevel.findUnique({
      where: { id: levelId },
    });

    if (!classLevel) {
      return NextResponse.json({ success: false, error: "Class level not found" }, { status: 404 });
    }

    // Fetch announcements, assignments, and resources for this level
    const announcements = await prisma.announcement.findMany({
      where: { classLevelId: levelId },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true }
        }
      }
    });

    const assignments = await prisma.assignment.findMany({
      where: { classLevelId: levelId },
      orderBy: { createdAt: "desc" },
    });

    const resources = await prisma.resource.findMany({
      where: { classLevelId: levelId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: {
        classLevel,
        announcements,
        assignments,
        resources,
      }
    });
  } catch (error: any) {
    console.error("GET PayaSTEM level error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/payastem
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Check if the user is a teacher or admin
    const userRole = (session.user as any).role;
    if (userRole !== "TEACHER" && userRole !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Forbidden: Only teachers and admins can upload content" }, { status: 403 });
    }

    const body = await request.json();
    const { type, classLevelId, title, content, description, resourceType, url, creditReward } = body;

    if (!type || !classLevelId || !title) {
      return NextResponse.json({ success: false, error: "Missing required fields: type, classLevelId, title" }, { status: 400 });
    }

    // Check if level exists
    const classLevelExists = await prisma.classLevel.findUnique({
      where: { id: classLevelId }
    });
    if (!classLevelExists) {
      return NextResponse.json({ success: false, error: "Class level not found" }, { status: 404 });
    }

    const userId = (session.user as any).id;

    if (type === "announcement") {
      if (!content) {
        return NextResponse.json({ success: false, error: "Content is required for announcements" }, { status: 400 });
      }
      const announcement = await prisma.announcement.create({
        data: {
          title,
          content,
          classLevelId,
          authorId: userId,
        }
      });
      return NextResponse.json({ success: true, data: announcement });
    } 
    
    if (type === "assignment") {
      if (!description) {
        return NextResponse.json({ success: false, error: "Description is required for assignments" }, { status: 400 });
      }
      const assignment = await prisma.assignment.create({
        data: {
          title,
          description,
          classLevelId,
          teacherId: userId,
          creditReward: creditReward ? parseInt(creditReward) : 10,
        }
      });
      return NextResponse.json({ success: true, data: assignment });
    } 
    
    if (type === "resource") {
      if (!resourceType || !url) {
        return NextResponse.json({ success: false, error: "resourceType and url are required for resources" }, { status: 400 });
      }
      const resource = await prisma.resource.create({
        data: {
          title,
          description,
          type: resourceType,
          url,
          classLevelId,
        }
      });
      return NextResponse.json({ success: true, data: resource });
    }

    return NextResponse.json({ success: false, error: "Invalid type. Must be 'announcement', 'assignment', or 'resource'" }, { status: 400 });

  } catch (error: any) {
    console.error("POST PayaSTEM error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function isStudentAllowedForLevel(studentLevel: string | null | undefined, requestedLevelId: string) {
  if (!studentLevel) return false;
  
  const normStudent = studentLevel.toLowerCase().replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u').trim();
  const normRequested = requestedLevelId.toLowerCase().trim();
  
  if (normRequested.includes("junior") && normStudent.includes("junior")) return true;
  if (normRequested.includes("ilkokul") && normStudent.includes("ilkokul")) return true;
  if (normRequested.includes("ortaokul") && normStudent.includes("ortaokul")) return true;
  if (normRequested.includes("lise") && normStudent.includes("lise")) return true;
  
  return false;
}
