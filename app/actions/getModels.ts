import prisma from '@/libs/prismadb'


interface IProductsParams {
    category: string | undefined,
}

export default async function getCategory(params: IProductsParams) {
    try {
        const {
            category,
        } = params;
        
        if(!category){
            return null;
        }

        
        const categories = await prisma.allCategory.findUnique({
            where: {
                name: category
            }
        })
        
        return categories
    } catch (error: any) {
        throw new Error(error)
    }
}