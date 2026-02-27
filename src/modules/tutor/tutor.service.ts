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
    payload: Omit<TimeSlot, "id"  |"isBooked"| "availability">,
  
) => {

  

    const tutor = await prisma.tutor.findUniqueOrThrow(    
        {
            where: {
                id: payload.tutorId
            },

        }
    )


    // if (tutor) {
    //     return await prisma.timeSlot.create(
    //         {
    //             data: {
    //                 ...payload,
    //                 // tutorId: tutor.id,
    //             }
    //         }
    //     )
    // }


return await prisma.timeSlot.create({
        data: {
            tutorId: payload.tutorId,
           date: new Date(payload.date), 
            startTime: new Date(payload.startTime),
            endTime: new Date(payload.endTime),
            // isBooked: false,
            // availability: true,
        },
    });

}

const getTimeSlotsByTutorId = async (tutorId: string) => {

    return await prisma.timeSlot.findMany(
        {
            where: {
            tutorId,
           
            endTime: {
                gte: new Date(), 
            },
        },
        orderBy: {
            startTime: 'asc', 
        },
        }
    )   
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


const deleteTimeSlot = async (slotId: string) => {

    await prisma.bookings.findFirstOrThrow(
        {
            where: {
                timeSlotId: slotId
            }
        }
    )

    return await prisma.timeSlot.delete(
        {
            where: {
                id: slotId
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
                timeSlots:{
                    where:{
                        startTime:{
                            gte: new Date()
                        },
                        isBooked: false,
                        availability: true
                    },
                    orderBy: {
                        startTime: 'asc'
                    }
                },
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


const getTutorByUserId = async(userId:string) => {
    return await prisma.tutor.findUnique(
        {
            where:{
                userId:userId
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
    getTutorFeatured,
    getTutorByUserId,
    getTimeSlotsByTutorId,
    deleteTimeSlot
}