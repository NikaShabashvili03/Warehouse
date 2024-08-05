import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

import prisma from "@/libs/prismadb";

export async function POST(
  request: Request,
) {
  const body = await request.json();
  const { 
    firstName,
    lastName,
    email,
    role,
    password,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const hashedPassword = await bcrypt.hash(password, 12);
  const fullName = firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase() + lastName.slice(1);

  const User = await prisma.user.create({
    data: {
      email: email,
      hashedPassword: hashedPassword,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      fullName: fullName,
      role: role
    },
  })

  return NextResponse.json(User);
}