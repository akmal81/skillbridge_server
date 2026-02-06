import { prisma } from "../../lib/prisma"


const getCategories = async () => {

    return await prisma.category.findMany({
        include:{
            _count:{
                select:{
                    tutors:true
                }
            }
        }
    })


}
export const categoryService = {
    getCategories
}