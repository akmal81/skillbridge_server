
import { BookingStatus } from "../../../generated/prisma/enums"
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


const updateBookingbyStudent = async (bookingId: string) => {

    const result = await prisma.bookings.updateMany({
        where: {
            id: bookingId
        },
        data: {
            status: "CANCELLED"
        }
    })

    return result
}
const completeBooking = async (bookingId: string, status: BookingStatus) => {
    return await prisma.$transaction(async (tx) => {
        // ১. বুকিং স্ট্যাটাস আপডেট করা
        const updatedBooking = await tx.bookings.update({
            where: { id: bookingId },
            data: { status: status },
            include: { timeSlot: true } 
        });

       
        if (status === "COMPLETED" || status === "CANCELLED") {
            await tx.timeSlot.update({
                where: { id: updatedBooking.timeSlotId },
                data: { 
                    isBooked: false, 
                    availability: true 
                }
            });
        }

        return updatedBooking;
    });
};
const updateBookingbyTutor = async (payload: { studentId: string, tutorId: string, bookingId: string }) => {

    const result = await prisma.bookings.updateMany({
        where: {
            tutorId: payload.tutorId,
            studentId: payload.studentId,
            id: payload.bookingId
        },
        data: {
            status: "CONFIRMED"
        }
    })

    return result
}


export const bookingService = {
    createBooking,
    getBookingsStudentId,
    getBookingsTutorId,
    updateBookingbyStudent,
    updateBookingbyTutor,
    completeBooking

}