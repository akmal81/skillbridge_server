import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { adminController } from "./admin.controller";

const router = Router()

router.post('/', auth(UserRole.ADMIN), adminController.createCategory)
router.delete('/:categoryId', auth(UserRole.ADMIN), adminController.deleteCagegory)



export const adminRoutes = router;