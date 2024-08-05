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
        name,
        type,
        technical
    } = body;
    

    const categories = await prisma?.allCategory.findMany();
    const lastCategoryId = categories.length != 0 ? categories[categories.length - 1].categoryId : "0";

    const newId = parseInt(lastCategoryId) + 10;

    const newCategory = await prisma.allCategory.create({
        data: {
            name: name,
            technical: technical,
            type: type,
            categoryId: newId.toString()
        }
    })



    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.error();
  }
}