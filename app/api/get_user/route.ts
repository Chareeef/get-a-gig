import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  // Extract the user id from the request
  const { id } = await request.json();

  // Get the user from the database
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id },
  });

  // If the user doesn't exist, return an error
  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  // Return the user
  return NextResponse.json(user);
}
