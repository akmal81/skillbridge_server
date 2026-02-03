import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { tutorController } from "./tutor.controller";


const router = Router()


// putlic tutor route
// *Browse and search tutors by subject, rating, and price
router.get('/', tutorController.getAllTutors)

// *View detailed tutor profiles with reviews
router.get('/:tutorId', tutorController.getTutorById)

// * Filter tutors by category
router.get('/bycategory/:categoryId', tutorController.getTutorByCategoryId)

//* featured for landing page
router.get('/featured', tutorController.getTutorFeatured)



// private route for tutor
router.post('/', auth(UserRole.TUTOR), tutorController.createTutorProfile)
router.patch('/:tutorId', auth(UserRole.TUTOR), tutorController.updateTutorProfile)

//time slot
router.post('/time-slot', auth(UserRole.TUTOR), tutorController.createTimeSlot)
router.patch('/available/:slotId', auth(UserRole.TUTOR), tutorController.updateTimeSlot)

export const tutorRoutes = router