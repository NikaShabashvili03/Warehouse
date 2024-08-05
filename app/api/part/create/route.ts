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
        name,
        description,
        price,
        condition,
        original,
        manufacturer,
        categoryName,
        categoryId,
        technical,
        type
    } = body;
    

    const lastProduct = await prisma?.categories.findMany({
        where: {
            categoryId: categoryId
        },
        select: {
            part: true
        },
        take: 1,
        orderBy: {
            createdAt: 'desc'
        }
    })

    const lastProductId = lastProduct[0]?.part?.partId;
    const newProductId = (lastProductId ? parseInt(lastProductId) + 1 : categoryId + "01").toString();
    
    const Part = await prisma.part.create({
        include: {
            manufacturer: true,
            category: true
        },
        data: {
            name: name,
            description: description,
            original: Boolean(original),
            partId: newProductId,
            status: 'Stock',
            type: type,
            creatorId: currentUser?.id,
            price: parseFloat(price.toFixed(2)),
            condition: condition,
            manufacturer: {
                createMany: {
                    data: manufacturer
                }
            },
            category: {
                create: {
                    name: categoryName,
                    categoryId: categoryId,
                    technical: technical
                }
            }
        },
    })


    return NextResponse.json(Part);
  } catch (error) {
    return NextResponse.error();
  }
}