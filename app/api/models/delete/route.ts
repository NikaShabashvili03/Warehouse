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
    
    const manufacturer = await prisma.allManufacturers.delete({
        where: {
            id: id,
        }
    })



    return NextResponse.json(manufacturer);
  } catch (error) {
    return NextResponse.error();
  }
}