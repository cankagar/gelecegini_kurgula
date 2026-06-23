import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAnonymousUserId } from "@/lib/anon-user";

export async function GET(request: Request) {
  try {
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

    // Format posts to include like count (no session to check per-visitor like state)
    const formattedPosts = posts.map((post: (typeof posts)[number]) => {
      const isLiked = false;
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
    const body = await request.json();
    const { title, content, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Başlık ve içerik girmek zorunludur." }, { status: 400 });
    }

    const authorId = await getAnonymousUserId();
    const post = await prisma.post.create({
      data: {
        title,
        content,
        tags: tags || "",
        authorId,
      },
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    console.error("POST post error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
