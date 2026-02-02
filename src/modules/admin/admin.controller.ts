import { NextFunction, Request, Response } from "express"
import { adminService } from "./admin.service"
import { success } from "better-auth"

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
       


        const result = await adminService.createCategory(req.body)

        res.status(201).json(result)
    } catch (error:any) {
        res.status(400).json(
           { 
            success:false,
            message:error.message,
            error: error
        }
        )
    }
}

const deleteCagegory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.categoryId
          const result = await adminService.deleteCagegory(categoryId as string)
        res.status(201).json(result)
        
    } catch (error:any) {
         res.status(400).json(
           { 
            success:false,
            message:error.message,
            error: error
        }
        )
    }
}

export const adminController = {
    createCategory,
    deleteCagegory
}