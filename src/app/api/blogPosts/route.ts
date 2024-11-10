import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/db_client";

// GET: To get the data
export async function GET() {
  try {
    // fetching data from the database
    const posts = await prisma.blogPost.findMany();
    // return
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST: To create the data
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newProduct = await prisma.blogPost.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
