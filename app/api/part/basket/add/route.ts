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
    

    const BasketedPart = await prisma.part.update({
        where: {
            id: id
        },
        data: {
            sellerId: currentUser?.id,
            status: 'Basket'
        }
    })


    return NextResponse.json(BasketedPart);
  } catch (error) {
    return NextResponse.error();
  }
}