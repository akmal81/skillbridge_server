import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { bookingController } from "./booking.controller";

const router = Router()

router.get('/:studentId', auth(UserRole.STUDENT), bookingController.getBookingsStudentId)
router.post('/', auth(UserRole.STUDENT), bookingController.createBooking)


export const bookingRoutes = router;