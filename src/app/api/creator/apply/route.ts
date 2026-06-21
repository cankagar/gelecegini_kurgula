import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET /api/creator/apply - Get status of current user's application
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Giriş yapmanız gerekmektedir." }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const application = await prisma.creatorApplication.findUnique({
      where: { userId }
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("GET application status error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/creator/apply - Submit application
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Giriş yapmanız gerekmektedir." }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();

    // Destructure all required fields
    const {
      fullName, username, email, phone, city, district, profession, institution,
      educationLevel, university, department, expertise, workingInstitution,
      interests, bio, projects, achievements, website, linkedin, github, scholar, orcid, references,
      whyPost, whichFields, postTypes, priorExp, files
    } = body;

    // Validate main required fields
    if (!fullName || !username || !email || !phone || !city || !district || !profession || !institution ||
        !educationLevel || !interests || !bio || !whyPost || !whichFields || !postTypes || !priorExp) {
      return NextResponse.json({ success: false, error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 });
    }

    // Upsert application
    const application = await prisma.creatorApplication.upsert({
      where: { userId },
      update: {
        fullName, username, email, phone, city, district, profession, institution,
        educationLevel, university, department, expertise, workingInstitution,
        interests, bio, projects, achievements, website, linkedin, github, scholar, orcid, references,
        whyPost, whichFields, postTypes, priorExp, files,
        status: "PENDING",
        adminNotes: null, // Clear previous rejection notes
      },
      create: {
        userId,
        fullName, username, email, phone, city, district, profession, institution,
        educationLevel, university, department, expertise, workingInstitution,
        interests, bio, projects, achievements, website, linkedin, github, scholar, orcid, references,
        whyPost, whichFields, postTypes, priorExp, files,
        status: "PENDING",
      }
    });

    return NextResponse.json({ success: true, data: application });
  } catch (error: any) {
    console.error("POST creator application error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
