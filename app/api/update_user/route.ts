import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function PUT(request: NextRequest) {
  const { id, name, email, bio } = await request.json();
  const prisma = new PrismaClient();

  if (!id || !name || !email) {
    return new NextResponse("Missing required fields", { status: 400 });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        bio: bio || null,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to update user", { status: 500 });
  }
}
