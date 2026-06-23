import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAnonymousUserId } from "@/lib/anon-user";

// POST /api/posts/[id] - Add a comment
// PUT /api/posts/[id] - Toggle like
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, error: "Yorum içeriği boş olamaz." }, { status: 400 });
    }

    // Check if post exists
    const postExists = await prisma.post.findUnique({
      where: { id },
    });
    if (!postExists) {
      return NextResponse.json({ success: false, error: "Gönderi bulunamadı." }, { status: 404 });
    }

    const authorId = await getAnonymousUserId();
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: id,
        authorId,
      },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profile: { select: { avatarUrl: true } },
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error: any) {
    console.error("POST comment error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getAnonymousUserId();

    // Check if post exists
    const postExists = await prisma.post.findUnique({
      where: { id },
    });
    if (!postExists) {
      return NextResponse.json({ success: false, error: "Gönderi bulunamadı." }, { status: 404 });
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId,
        },
      },
    });

    let liked = false;

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId: id,
            userId,
          },
        },
      });
      liked = false;
    } else {
      // Like
      await prisma.like.create({
        data: {
          postId: id,
          userId,
        },
      });
      liked = true;
    }

    // Return updated like count
    const likeCount = await prisma.like.count({
      where: { postId: id },
    });

    return NextResponse.json({ success: true, data: { liked, likeCount } });
  } catch (error: any) {
    console.error("PUT like error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
