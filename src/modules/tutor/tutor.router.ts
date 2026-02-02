import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { tutorController } from "./tutor.controller";


const router = Router()


// putlic tutor route

router.get('/', tutorController.getAllTutors)
router.get('/:tutorId', tutorController.getTutorById)

// private route for tutor
router.post('/', auth(UserRole.TUTOR), tutorController.createTutorProfile)
router.patch('/:tutorId', auth(UserRole.TUTOR), tutorController.updateTutorProfile)

        //time slot
router.post('/time-slot', auth(UserRole.TUTOR), tutorController.createTimeSlot)
router.patch('/available/:slotId', auth(UserRole.TUTOR), tutorController.updateTimeSlot)

export const tutorRoutes = router