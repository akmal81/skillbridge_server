import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { studentController } from "./student.controller";

const router = Router();

router.patch('/:studentId', auth(UserRole.STUDENT), studentController.updateStudentProfile)

export const studentsRoutes = router;