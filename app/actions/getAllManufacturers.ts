import prisma from '@/libs/prismadb'


export default async function getAllManufacturers() {
    try {
        const Manufacturers = await prisma?.allManufacturers.findMany()
        
        return Manufacturers
    } catch (error: any) {
        throw new Error(error)
    }
}