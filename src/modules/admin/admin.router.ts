import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { adminController } from "./admin.controller";

const router = Router()
// booking management
router.get('/bookings', auth(UserRole.ADMIN), adminController.getAllbookings)
// user management
router.get('/users', auth(UserRole.ADMIN), adminController.getAllUsers)
router.patch('/users/:userId', auth(UserRole.ADMIN), adminController.banUnban)



// category management
router.post('/categories', auth(UserRole.ADMIN), adminController.createCategory)
router.delete('/categories/:categoryId', auth(UserRole.ADMIN), adminController.deleteCagegory)



export const adminRoutes = router;