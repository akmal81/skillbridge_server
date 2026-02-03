import { User } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const updateStudentProfile = async (
    payload: Partial<User>,
    studentId: string
) => {



    const result = await prisma.user.update(
        {
            where: {
                id: studentId
            },
            data: {
                ...payload
            }
        }
    )
    return result
}


export const studentService = {
    updateStudentProfile
}