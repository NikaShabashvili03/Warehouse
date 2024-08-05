import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'


export default async function getAllSoldParts() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser || currentUser?.role != 'Admin') {
            return null;
        }

        const allUsers = await prisma?.part.findMany({
            where: {
                status: 'Sale'
            },
            include: {
                seller: true,
                category: true,
                payment: true
            }
        })

        // const usersWithTotalPrice = allUsers.map(user => {
        //     const totalPrice = user.SelledPart.reduce((total, part) => total + part.price, 0);
        //     return {
        //         ...user,
        //         totalPrice: totalPrice
        //     };
        // });

        // const totalSoldPrice = usersWithTotalPrice.reduce((total, user) => {
        //     return total + user?.totalPrice;
        // }, 0);

        // {
        //     users: usersWithTotalPrice,
        //     totalPrice: totalSoldPrice
        // }

        return allUsers
    } catch (error: any) {
        throw new Error(error)
    }
}