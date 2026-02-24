import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { reviewsController } from "./reviews.controller";

const router =Router();
// tutor see rating and reviews
router.get('/:tutorId', auth(UserRole.TUTOR), reviewsController.getReviewByTutorId)
router.get('/', reviewsController.getALlReview)


// student can post or create review will update the tutor avg_rating is booking is completed
router.post('/', auth(UserRole.STUDENT), reviewsController.createReview)

export const reviewsRoutes = router;