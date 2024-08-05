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
        data,
    } = body;

    if (!data || !Array.isArray(data)) {
        return;
    }

    const manufacturerPromises = data.map(async (item) => {
        try {
            const newManufacturer = await prisma.allManufacturers.update({
                where: {
                  id: item.id,
                },
                data: {
                    name: item.name,
                    models: item.models
                }
            });
            return newManufacturer;
        } catch (error) {
            console.error(`Error creating manufacturer for name ${item.name}:`, error);
            return null; 
        }
    });

    const createdManufacturers = await Promise.all(manufacturerPromises);

    return NextResponse.json(createdManufacturers);
  } catch (error) {
    return NextResponse.error();
  }
}