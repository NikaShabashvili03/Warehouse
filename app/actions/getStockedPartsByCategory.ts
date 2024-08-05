import prisma from '@/libs/prismadb'


interface IParams {
    type: 'Part' | 'Disc',
    category: string | undefined,
    morePrice: any | undefined
    lessPrice: any | undefined,
    condition: 'New' | 'Secondary' | undefined,
    technical: string | undefined,
    manufacturer: string | undefined,
    model: string | undefined,
    toYear: string | undefined,
    fromYear: string | undefined,
    page:  number | undefined
}
export default async function getStockedPartsByCategory(
    params: IParams
) {
    try {
        const {
            type,
            category,
            morePrice,
            lessPrice,
            condition,
            technical,
            manufacturer,
            model,
            toYear,
            fromYear,
            page = 1
        } = params;

        const technicals = technical ? JSON.parse(technical) : undefined

        const parts = await prisma?.part.findMany({
            where: {
                status: 'Stock',
                type: type,
                price: {
                    gte: morePrice ? parseFloat(morePrice) : 0,
                    lte: lessPrice ? parseFloat(lessPrice) : 999999
                },
                condition: condition,
            },
            include: {
                category: true,
                manufacturer: true,
                creator: true,
            },
            orderBy: {
                createdAt: 'desc'
            },
        })

        const filteredPartsByTechnicals = parts.filter((part: any) => {
            if (!technicals || !part.category) return part;

            const categoryTechnical = part.category.technical;

            return Object.entries(technicals).every(([key, value]) => {
                return categoryTechnical[key] === value
            })
        });

        const filteredByManufacturer = filteredPartsByTechnicals?.filter((part) => {
            if(!manufacturer && !model && !toYear && !fromYear) return part

            const manufacturers = part.manufacturer;

            return manufacturers?.some(item => 
                        (manufacturer ? item.name === manufacturer : true) &&
                        (model ? item.model === model : true) &&
                        (fromYear ? item.fromYear >= parseInt(fromYear) : true) &&
                        (toYear ? item.toYear <= parseInt(toYear) : true)
            );
        })

        const groupedParts = filteredByManufacturer.reduce((acc: any, curr: any) => {
            const categoryId = curr.category?.categoryId;

            if (categoryId) {
                acc[categoryId] = acc[categoryId] || {
                    name: curr.category.name,
                    id: categoryId,
                    data: [],
                };

                acc[categoryId].data.push(curr);
            }

            return acc;
        }, {});

        const result = Object.values(groupedParts);

        let filteredGroup = result;

        if(category){
            filteredGroup = result.filter((part: any) => {
                return (
                    category && part.name === category
                )
            })
        }

        const pageSize = 2;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const totalGroups = filteredGroup.length; 
        const maxPage = Math.ceil(totalGroups / pageSize);

        return {
            data: filteredGroup?.slice(startIndex, endIndex),
            maxPage: maxPage
        };
    } catch (error: any) {
        throw new Error(error)
    }
}