import { Request, Response } from "express";
import { categoryService } from "./categories.service";




const getCategories = async (req: Request, res: Response) => {

    try {
    
        const result = await categoryService.getCategories()

         const data = result.map((item)=>{
            return{
                id:item.id,
                catName: item.catName,
                tutors:item._count.tutors
            }
        })

        res.status(201).json({
            success:true,
            data:data
        })
    } catch (error: any) {
        res.status(400).json(
            {
                success: false,
                message: error.message,
                error: error
            }
        )
    }
}





export const categoryController = {
    getCategories
}