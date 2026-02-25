import { Request, Response } from "express";
import { reviewsService } from "./reviews.service";

const createReview = async (req:Request, res:Response) => {

     try {
          const user = req.user

    if (!user) {
        res.status(401).json(
            {
                message:"Please login to reviews you tutor"
            }
        )
    }
 req.body.studentId = user?.id as string
    const {tutorId} = req.body
    const result  = await reviewsService.createReview(req.body)
    
            res.status(201).json(result)
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



const getReviewByTutorId = async (req:Request, res:Response) => {

     try {
    //       const user = req.user

    // if (!user) {
    //     res.status(401).json(
    //         {
    //             message:"Please login first"
    //         }
    //     )
    // }
 
    const {tutorId} = req.params
        

    const result  = await reviewsService.getReviewByTutorId(tutorId as string)
    
            res.status(201).json(result)
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


const getALlReview = async (req:Request, res:Response) => {

     try {
         

    const result  = await reviewsService.getAllReviews();

    
    
            res.status(201).json(result)
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







export const reviewsController = {
    createReview,
    getReviewByTutorId,
    getALlReview
}