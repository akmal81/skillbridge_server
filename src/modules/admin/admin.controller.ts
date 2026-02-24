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



// get all user
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
          const result = await adminService.getAllUsers()
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

// bann user
const banUnban = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
          const result = await adminService.banUnban(req.params.userId as string)
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


const getAllbookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
          const result = await adminService.getAllbookings()
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
    deleteCagegory,
    getAllUsers,
    banUnban,
    getAllbookings
}