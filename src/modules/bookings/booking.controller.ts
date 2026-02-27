import { NextFunction, Request, Response } from "express"
import { bookingService } from "./bookings.service"
import { UserRole } from "../../middleWare/auth"

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tutorId } = req.body

        const user = req.user

        if (!user) {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }
        if (user?.role !== UserRole.STUDENT) {
            return res.status(400).json(
                {
                    error: "Please Register as a Student",
                }
            )
        }
        // req.body.studentId = req.user?.id



        const result = await bookingService.createBooking(
            req.body
        )

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

const getBookingsStudentId = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const user = req.user
        if (!user) {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }
        if (user?.role !== UserRole.STUDENT) {
            return res.status(400).json(
                {
                    error: "Please Register as a Student",
                }
            )
        }


        const { studentId } = req.params
        const result = await bookingService.getBookingsStudentId(
            studentId as string
        )

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
const getBookingsTutorId = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const user = req.user
        if (!user) {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }
        if (user?.role !== UserRole.TUTOR) {
            return res.status(400).json(
                {
                    error: "Please Register as a Student",
                }
            )
        }


        const { tutorId } = req.params
        const result = await bookingService.getBookingsTutorId(
            tutorId as string
        )

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


const updateBookingbyStudent = async (req: Request, res: Response, next: NextFunction) => {


    try {


        const user = req.user
        if (!user) {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }
        if (user?.role !== UserRole.STUDENT) {
            return res.status(400).json(
                {
                    error: "Please Register as a Student",
                }
            )
        }


        const { bookingId } = req.params
        const result = await bookingService.updateBookingbyStudent(
            bookingId as string
        )

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
const completeBooking = async (req: Request, res: Response, next: NextFunction) => {


    try {


        const user = req.user
        if (!user) {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }
        if (user?.role !== UserRole.TUTOR) {
            return res.status(400).json(
                {
                    error: "Please Register as a tutor",
                }
            )
        }


        const { bookingId } = req.params
        const result = await bookingService.completeBooking(
            bookingId as string, req.body.status
        )

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




const updateBookingbyTutor = async (req: Request, res: Response, next: NextFunction) => {


    try {


        const user = req.user
        if (!user) {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }
        if (user?.role !== UserRole.TUTOR) {
            return res.status(400).json(
                {
                    error: "Please Register as a Student",
                }
            )
        }


        const { tutorId, bookingId, studentId } = req.body

        const result = await bookingService.updateBookingbyTutor(
            req.body
        )

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






export const bookingController = {
    createBooking,
    getBookingsStudentId,
    getBookingsTutorId,
    updateBookingbyStudent,
    updateBookingbyTutor,
    completeBooking
}