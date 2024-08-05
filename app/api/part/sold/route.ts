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
        return NextResponse.error();
    }
    
    const { 
        parts,
        total,
        type,
        name,
        phone
    } = body;

    const Part = await prisma.payment.create({
      data: {
        parts: {
          connect: parts.map((item: any) => ({ id: item.id })),
        },
        total: total,
        type: type,
        name: name,
        phone: phone,
      },
      include: {
        parts: true
      }
    })

    if(Part){
      await prisma.part.updateMany({
        where: {
            id: {
              in: parts?.map((item: any) => item.id)
            },
            status: 'Basket',
            sellerId: currentUser?.id,
        },
        data: {
            status: 'Sale'
        }
    })
    }

    return NextResponse.json(Part);
  } catch (error) {
    return NextResponse.error();
  }
}