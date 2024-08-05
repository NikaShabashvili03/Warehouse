import prisma from '@/libs/prismadb'

interface IParams {
    type: 'Part' | 'Disc' | undefined,
}

export default async function getAllCategories(
    params: IParams
) {
    try {
        const {
            type,
        } = params;

        const Categories = await prisma?.allCategory.findMany({
            where: {
                type: type
            },
            select: {
                name: true,
                categoryId: true
            }
        })
        
        return Categories
    } catch (error: any) {
        throw new Error(error)
    }
}