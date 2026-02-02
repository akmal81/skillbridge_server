import { Category } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createCategory =async (category: Omit<Category, "id"|"createAt"|"updateAt">) => {
    
   return await prisma.category.create(
    {
        data:{
            ...category
        }
    }
   )
}


// delete category

const deleteCagegory = async (categoryId:string) => {
    return await prisma.category.delete(
        {
            where:{
                id:categoryId
            }
        }
    )
}

export const adminService = {
    createCategory,
    deleteCagegory
}