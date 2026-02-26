import { NextFunction, Request, Response } from "express"
import { tutorService } from "./tutor.service"
import { success } from "better-auth"


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
            next(error)
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
            next(error)
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

        const { search, subject, rating, price, category, isFeatured, userId } = req.query;

        const payload: {
            // search?: string
            subject?: string
            rating?: number
            price?: number
            category?: string
            isFeatured?: boolean
            userId?: string
        } = {}



        // if (typeof search === "string") {
        //     payload.search = search
        // }
        if (typeof subject === "string") {
            payload.subject = subject
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

        const tutorData = result.map((item) => {
            return {
                id: item.id,
                userId: item.userId,
                categoryId: item.categoryId,
                name: item.user.name,
                bio: item.bio,
                image: item.image,
                subject: item.subject,
                experience: item.experience,
                course_price: item.course_price,
                avg_rating: item.avg_rating,
                isFeatured: item.isFeatured,
                availability: item.availability,
                reviews: item._count.reviews
            }
        })

        res.status(201).json({
            success: true,
            data: tutorData
        })

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
        const result = await tutorService.getTutorById(tutorId as string);

        const formateddata = {
            ...result,
            name: result?.user.name,
            reviews: result?._count.reviews,
            user:undefined,
            _count:undefined
        }

        res.status(201).json(formateddata)
    }

    catch (error: any) {
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
    
        const result = await tutorService.getTutorByCategoryId(categoryId as string)
       
       const tutorData = result.map((item) => {
            return {
                id: item.id,
                userId: item.userId,
                categoryId: item.categoryId,
                name: item.user.name,
                bio: item.bio,
                image: item.image,
                subject: item.subject,
                experience: item.experience,
                course_price: item.course_price,
                avg_rating: item.avg_rating,
                isFeatured: item.isFeatured,
                availability: item.availability,
                reviews: item._count.reviews
            }
        })

       
        res.status(201).json({
            success: true,
            data: tutorData
        })
    } catch (error: any) {
        res.status(400).json(
            next(error)
        )
    }
}

//! Landing page with featured tutors
const getTutorFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await tutorService.getTutorFeatured()
        const tutorData = result.map((item) => {
            return {
                id: item.id,
                userId: item.userId,
                categoryId: item.categoryId,
                name: item.user.name,
                bio: item.bio,
                image: item.image,
                subject: item.subject,
                experience: item.experience,
                course_price: item.course_price,
                avg_rating: item.avg_rating,
                isFeatured: item.isFeatured,
                availability: item.availability,
                bookings: item._count.bookings
            }
        })

        res.status(201).json({
            success: true,
            data: tutorData
        })

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

const getTutorByUserId = async(req: Request, res: Response, next: NextFunction)=>{

    try {
        

        const {userId} = req.params
        const result = await tutorService.getTutorByUserId(userId as string)
        res.status(201).json(result)
    } catch (error:any) {
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
    getTutorFeatured,
    getTutorByUserId
}