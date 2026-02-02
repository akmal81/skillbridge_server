import { NextFunction, Request, Response } from "express"
import { tutorService } from "./tutor.service"


const createTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }


        const result = await tutorService.createTutorProfile(req.body, user.id as string)
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

// update tutor by tutor_id
const updateTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const { tutorId } = req.params

        if (user?.role !== 'TUTOR') {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }


        const result = await tutorService.updateTutorProfile(req.body, tutorId as string)
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

// create time slot 

const createTimeSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        if (user?.role !== 'TUTOR') {
            return res.status(400).json(
                {
                    error: "Unauthorized!!"
                })
        }
        console.log(user.id)

        const result = await tutorService.createTimeSlot(req.body, user.id as string)
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


// update time slot 

const updateTimeSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slotId } = req.params

        const result = await tutorService.updateTimeSlot(req.body, slotId as string)
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



// get all tutor

const getAllTutors = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {search} = req.query


        const searchString = typeof search === 'string' ? search : undefined

        const result = await tutorService.getAllTutors(
            {search:searchString}
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




export const tutorController = {
    createTutorProfile,
    updateTutorProfile,
    createTimeSlot,
    updateTimeSlot,
    getAllTutors
}