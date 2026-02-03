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

        const { search, rating, price, category, isFeatured, userId } = req.query;

        const payload: {
            search?: string
            rating?: number
            price?: number
            category?: string
            isFeatured?: boolean
            userId?: string
        } = {}



        if (typeof search === "string") {
            payload.search = search
        }

        if (typeof rating === "string" && !isNaN(Number(rating))) {
            payload.rating = Number(rating)
        }

        if (typeof price === "string" && !isNaN(Number(price))) {
            payload.price = Number(price)
        }
        if (typeof category === "string") {
            payload.category = category
        }
        if (typeof isFeatured === "string") {
            payload.isFeatured = isFeatured === "true"
        }

        const result = await tutorService.getAllTutors(payload)
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


// get tutor by id

const getTutorById = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const { tutorId } = req.params
        const result = await tutorService.getTutorById(tutorId as string)
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


const getTutorByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {

       
        const { categoryId } = req.params
        console.log(categoryId)
        const result = await tutorService.getTutorByCategoryId(categoryId as string)
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

//! Landing page with featured tutors
const getTutorFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tutorService.getTutorFeatured()
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
    getAllTutors,
    getTutorById,
    getTutorByCategoryId,
    getTutorFeatured
}