import { NextFunction, Request, Response } from "express"
import { studentService } from "./student.service"

const updateStudentProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const { studentId } = req.params

        if (user?.role !== 'STUDENT') {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }


        const result = await studentService.updateStudentProfile(req.body, studentId as string)
        res.status(201).json(result)

    } catch (error: any) {
        res.status(400).json(
            {
                success: false,
                message: error.message,
                error: error
            }
        )
    }
}

const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const { studentId } = req.params

        if (user?.role !== 'STUDENT') {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }


        const result = await studentService.getStudentById(studentId as string)
        res.status(201).json(result)
    } catch (error: any) {
        res.status(400).json(
            {
                success: false,
                message: error.message,
                error: error
            }
        )
    }
}

export const studentController = {
    updateStudentProfile,
    getStudentById
}