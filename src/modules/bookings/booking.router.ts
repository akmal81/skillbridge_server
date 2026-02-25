import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { bookingController } from "./booking.controller";

const router = Router()

router.get('/student/:studentId', auth(UserRole.STUDENT), bookingController.getBookingsStudentId)
router.get('/tutor/:tutorId', auth(UserRole.TUTOR), bookingController.getBookingsTutorId)

router.post('/', auth(UserRole.STUDENT), bookingController.createBooking)

router.patch('/cancel/:bookingId', auth(UserRole.STUDENT), bookingController.updateBookingbyStudent)
router.patch('/tutor/:tutorId', auth(UserRole.TUTOR), bookingController.updateBookingbyTutor)


export const bookingRoutes = router;