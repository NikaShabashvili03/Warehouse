import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'


export default async function getSelledParts() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) {
            return null;
        }

        const BasketedPart = await prisma?.part.findMany({
            where: {
                sellerId: currentUser.id,
                status: 'Sale'
            },
            include: {
                category: true,
                manufacturer: true,
                creator: true,
                seller: true,
                payment: true
            },
            orderBy: {
                updatedAt: 'desc',
            }
        })
        let totalPrice = 0;
        BasketedPart.forEach(part => {
            totalPrice += part.price;
        });
        
        return {
            parts: BasketedPart,
            totalPrice: totalPrice
        }
    } catch (error: any) {
        throw new Error(error)
    }
}