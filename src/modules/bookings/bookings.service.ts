
import { prisma } from "../../lib/prisma"

const createBooking = async (
    payload: { studentId: string, tutorId: string, timeSlotId: string }
) => {

    const result = await prisma.bookings.create(
        {
            data: {
                ...payload
            }
        }
    )


    if (result) {
        await prisma.timeSlot.update(
            {
                where: {
                    id: payload.timeSlotId
                },
                data: {
                    isBooked: true,
                    availability: false
                }
            }
        )
    }
    return result
}


const getBookingsStudentId = async (studentId: string) => {

    const now = new Date()

    const allBookings = await prisma.bookings.findMany({
        where: {
            studentId: studentId
        },
        include: {
            timeSlot: true,
            tutor: {
                include: {
                    user: true
                }
            }
        },
        orderBy: {
            timeSlot: {
                date: "asc"
            }
        }
    })


    const upcoming = allBookings.filter(booking => new Date(booking.timeSlot.date) >= now);
    const past = allBookings.filter(booking => new Date(booking.timeSlot.date) < now);

    return {

        upcoming,
        past
    }
}
const getBookingsTutorId = async (tutorId: string) => {

    const now = new Date()

    const allBookings = await prisma.bookings.findMany({
        where: {
            tutorId: tutorId
        },
        include: {
            timeSlot: true,
            student: true,
        },
        orderBy: {
            timeSlot: {
                date: "asc"
            }
        }
    })


    // const upcoming = allBookings.filter(booking => new Date(booking.timeSlot.date) >= now);
    // const past = allBookings.filter(booking => new Date(booking.timeSlot.date) < now);

    // return {

    //     upcoming,
    //     past
    // }

    return allBookings
}


const updateBooking = async (payload: { studentId: string, tutorId?: string, timeSlotId?: string }) => {

    const result = await prisma.bookings.updateMany({
        where: {
            studentId: payload.studentId
        },
        data: {
            status: "CANCELLED"
        }
    })

    return result
}


export const bookingService = {
    createBooking,
    getBookingsStudentId,
    getBookingsTutorId,
    updateBooking
}