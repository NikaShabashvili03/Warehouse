import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request,
  ) {
  try {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return;
    }
    
    const { 
        id,
    } = body;
    
    const categories = await prisma.allCategory.delete({
        where: {
            id: id,
        }
    })

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.error();
  }
}