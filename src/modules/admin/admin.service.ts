import { role } from "better-auth/plugins"
import { Category } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createCategory = async (category: Omit<Category, "id" | "createAt" | "updateAt">) => {

    return await prisma.category.create(
        {
            data: {
                ...category
            }
        }
    )
}


// delete category

const deleteCagegory = async (categoryId: string) => {
    return await prisma.category.delete(
        {
            where: {
                id: categoryId
            }
        }
    )
}


const getAllUsers = async () => {
    return await prisma.user.findMany(
        {
            where: {
                OR: [
                    { role: 'TUTOR' },
                    { role: 'STUDENT' }
                ]
            }
        }
    )

}



const banUnban = async (userId: string) => {
    return await prisma.user.update(
        {
            where: {
                id: userId
            },
            data: {
                isBan: true
            }
        }
    )

}



const getAllbookings = async () => {
    return await prisma.bookings.findMany({
        include: {
            timeSlot: true,
            tutor: true
        }
    }
    )

}

export const adminService = {
    createCategory,
    deleteCagegory,
    getAllUsers,
    banUnban,
    getAllbookings
}