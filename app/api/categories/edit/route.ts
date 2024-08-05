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
        name,
        type,
        technical
    } = body;
    

    const updatedCategory = await prisma.allCategory.update({
        where: {
            id: id
        },
        data: {
            name: name,
            technical: technical,
            type: type,
        }
    })



    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.error();
  }
}