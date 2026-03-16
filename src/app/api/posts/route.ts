import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, slug, content, excerpt, category_id, status, featured_media } = body;

    const post = await prisma.post.create({
      data: {
        post_id: Date.now(),
        title,
        slug,
        content,
        excerpt,
        category_id: category_id ? BigInt(category_id) : null,
        author_id: user.user_id,
        status: status || "draft",
        featured_media: featured_media || null,
        date: new Date(),
      },
    });

    // Create analytics entry
    await prisma.postAnalytics.create({
      data: {
        post_id: post.id,
        views: 0,
      },
    });

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
