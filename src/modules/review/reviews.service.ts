import { prisma } from "../../lib/prisma"

const createReview = async (payload:{tutorId:string, studentId:string,
    review:string, rating:string |number
}) => {

const numericRating = Number(payload.rating)

const result = await prisma.$transaction(async (tx)=>{


     await tx.bookings.findFirstOrThrow(
        {
            where:{
                studentId:payload.studentId,
                tutorId: payload.tutorId,
                status:"COMPLETED"
            }
        }
    );


      const newResult =   await tx.reviews.create(
        {
            data:{
                studentId:payload.studentId,
                tutorId:payload.tutorId,
                review:payload.review,
                rating: numericRating
            }
        }
    );

    const status = await tx.reviews.aggregate(
        {
            where: {
                tutorId:payload.tutorId
            },
            _avg:{
                rating:true
            },
            _count:{
                rating:true
            }
        }
    )

    await tx.tutor.update(
        {
            where:{
                id:payload.tutorId
            },
            data:{
                avg_rating:status._avg.rating as number || 0
            }
        }
    )
return {newResult, status}

})

   
   

return result
    
}
const getReviewByTutorId= async (tutorId:string) => {

    return await prisma.reviews.findMany(
        {
            where:{
                tutorId
            }
        }
    )
    
}

const getAllReviews = async()=>{
    return await prisma.reviews.findMany({
        take:4,
        include:{
            student:{
                select:{

                    name:true
                }
            },
        }
    })
}
export const reviewsService ={
    createReview,
    getReviewByTutorId,
    getAllReviews
}