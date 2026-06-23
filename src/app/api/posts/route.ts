import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id : null;

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profile: { select: { avatarUrl: true } },
          },
        },
        comments: {
          orderBy: { createdAt: "asc" },
          include: {
            author: {
              select: {
                name: true,
                username: true,
                profile: { select: { avatarUrl: true } },
              },
            },
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });

    // Format posts to include like count and check if current user liked it
    const formattedPosts = posts.map((post: (typeof posts)[number]) => {
      const isLiked = userId ? post.likes.some((like: (typeof post.likes)[number]) => like.userId === userId) : false;
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        tags: post.tags,
        createdAt: post.createdAt,
        author: post.author,
        comments: post.comments,
        likeCount: post.likes.length,
        isLiked,
      };
    });

    return NextResponse.json({ success: true, data: formattedPosts });
  } catch (error: any) {
    console.error("GET posts error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Giriş yapmanız gerekmektedir." }, { status: 401 });
    }
  const role = (session.user as any).role;
    if (role !== "TEACHER" && role !== "ADMIN" && role !== "VERIFIED_CONTENT_CREATOR") {
      return NextResponse.json({ success: false, error: "Sadece içerik üreticileri, eğitmenler veya yöneticiler paylaşım yapabilir." }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Başlık ve içerik girmek zorunludur." }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        tags: tags || "",
        authorId: (session.user as any).id,
      },
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    console.error("POST post error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
