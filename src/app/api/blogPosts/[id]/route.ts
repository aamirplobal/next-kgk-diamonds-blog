import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db_client";
import PhysicsContentPlugin from "ai-content-plugin";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await req.json();
    const { title, content, published, imageUrl } = body;

    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        title,
        content,
        published,
        imageUrl,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.blogPost.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const plugin = new PhysicsContentPlugin(process.env.AI_API_KEY as string);
    const { title, content } = await plugin.getContent();

    return NextResponse.json({ title, content }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
