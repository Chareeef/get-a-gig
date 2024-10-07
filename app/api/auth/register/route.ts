import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists." },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 },
    );
  } else {
    return NextResponse.json({
      message: `User ${user.name} registered successfully.`,
    });
  }
}
