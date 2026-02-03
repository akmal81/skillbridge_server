import { NextFunction, Request, Response } from "express"
import { bookingService } from "./bookings.service"
import { UserRole } from "../../middleWare/auth"

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tutorId} = req.body

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
            req.body.studentId = req.user?.id



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
         

const {tutorId} = req.params
        const result = await bookingService.getBookingsStudentId(
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




export const bookingController ={
    createBooking,
    getBookingsStudentId
}