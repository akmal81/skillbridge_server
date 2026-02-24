import { string } from "better-auth";
import { TimeSlot, Tutor } from "../../../generated/prisma/client";
import { TutorWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


// create tutor profile
const createTutorProfile = async (
    payload: Omit<Tutor, "id" | "userId" | "avg_rating">,
    userId: string
) => {

    return await prisma.tutor.create({
        data: {
            ...payload,
            userId: userId
        }
    })
}


// update tutor profile



const updateTutorProfile = async (
    payload: Partial<Tutor>,
    tutorId: string
) => {



    const result = await prisma.tutor.update(
        {
            where: {
                id: tutorId
            },
            data: {
                ...payload
            }
        }
    )
    return result
}


// set or create availability slot in the timeSlot table

const createTimeSlot = async (
    payload: Omit<TimeSlot, "id" | "tutorId" | "availability">,
    userId: string
) => {

    await prisma.user.findUniqueOrThrow(
        {
            where: { id: userId }
        }
    )

    const tutor = await prisma.tutor.findUniqueOrThrow(     //??????????????
        {
            where: {
                userId
            },

        }
    )


    if (tutor) {
        return await prisma.timeSlot.create(
            {
                data: {
                    ...payload,
                    tutorId: tutor.id
                }
            }
        )
    }
}

// set avaiablelity /upadate time slot
const updateTimeSlot = async (
    payload: Partial<TimeSlot>,
    slotId: string
) => {

    await prisma.timeSlot.findUniqueOrThrow(     //??????????????
        {
            where: {
                id: slotId
            },

        }
    )


    return await prisma.timeSlot.update(
        {
            where: {
                id: slotId
            },
            data: {
                ...payload
            }
        }
    )
}


// get all tutor
//? Browse and search tutors by subject, rating, and price

const getAllTutors = async (payload: {
   
    subject?:string
    rating?: number
    price?: number
    category?: string
    isFeatured?: boolean
    
}) => {

    const andConditions: TutorWhereInput[]=[]


    // if (payload.search) {
    //     andConditions.push({
    //         subject: {
    //             contains: payload.search,
    //             mode: "insensitive"
    //         }
    //     })
    // }
    if (payload.subject) {
        andConditions.push({
            subject: {
                contains: payload.subject,
                mode: "insensitive"
            }
        })
    }


    if (typeof payload.rating === "number") {
        andConditions.push({
            avg_rating: {
                equals: payload.rating
            }
        })
    }


    if (typeof payload.price === "number") {
        andConditions.push({
            course_price: {
                equals: payload.price
            }
        })
    }

    if (typeof payload.isFeatured === 'boolean') {
        const { isFeatured } = payload
        andConditions.push(
            {
                isFeatured: isFeatured
            }
        )
    }

return prisma.tutor.findMany(
    {
        where:{
            AND:andConditions
        },
       include:{
            user:{
                select:{
                    name:true
                }
            }, 
            _count:{
               select:{
                reviews:true
               }
            }
        }
    }
)
    
};

// * Filter tutors by tutor id
const getTutorById = async (tutorId:string) => {
    return prisma.tutor.findUnique(
        {
            where:{
                id: tutorId
            },
            include:{
                user:{
                    select:{
                        name:true
                    }
                },
               _count:{
                select:{
                    reviews:true
                }
               }
            }
        }
    )
}

// * Filter tutors by category
const getTutorByCategoryId = async (categoryId:string) => {
    return await prisma.tutor.findMany(
        {
            where:{
                categoryId: categoryId
            },
             include:{
            user:{
                select:{
                    name:true
                }
            }, 
            _count:{
               select:{
                reviews:true
               }
            }
        }
        }
    )
}


//* Landing page with featured tutors
const getTutorFeatured=async function () {
    return await prisma.tutor.findMany(
        {
            where:{
                isFeatured:true
            },
            include:{
                user:{
                    select:{
                        name:true
                    }
                },
                 _count:{
               select:{
                bookings:true
               }
            }
            }
        }
    )
}



export const tutorService = {
    createTutorProfile,
    updateTutorProfile,
    createTimeSlot,
    updateTimeSlot,
    getAllTutors,
    getTutorById,
    getTutorByCategoryId,
    getTutorFeatured
}