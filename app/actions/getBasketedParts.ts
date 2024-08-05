import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'
import { NextResponse } from 'next/server';


export default async function getBasketedParts() {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return undefined;
        }

        const Parts = await prisma?.part.findMany({
            where: {
                sellerId: currentUser.id,
                status: 'Basket'
            },
            include: {
                category: true,
                manufacturer: true,
                creator: true
            }
        })

        let totalPrice = 0;
        Parts?.forEach(part => {
            totalPrice += part.price;
        });
        
        return {
            parts: Parts,
            totalPrice: totalPrice
        }
    } catch (error: any) {
        return undefined;
    }
}