import prisma from '@/libs/prismadb'


interface IProductsParams {
    name: string | undefined,
}

export default async function getTechnicalsByCategory(params: IProductsParams) {
    try {
        const {
            name,
        } = params;
        
        if(!name){
            return null;
        }

        const CategoryTechnicals = await prisma?.allCategory.findUnique({
            where: {
                name: name
            },
            select: {
                technical: true
            }
        })

        if(!CategoryTechnicals){
            return {}
        }
        
        return CategoryTechnicals
    } catch (error: any) {
        throw new Error(error)
    }
}