import { TimeSlot, Tutor } from "../../../generated/prisma/client";
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

const getAllTutors = async (
    payload: {
        search?: string |number| undefined,
    }

) => {

const {search} =payload;
const searchCondition =[];

if(search){
    const searchString = String(search);
    const SearchNumber = Number(search);
}

   
}


export const tutorService = {
    createTutorProfile,
    updateTutorProfile,
    createTimeSlot,
    updateTimeSlot,
    getAllTutors
}