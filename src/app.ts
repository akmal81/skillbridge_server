import express, { Application } from "express";
import  cors  from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { adminRoutes } from "./modules/admin/admin.router";
import { tutorRoutes } from "./modules/tutor/tutor.router";
import { bookingRoutes } from "./modules/bookings/booking.router";
import { reviewsRoutes } from "./modules/review/reviews.router";
import { studentsRoutes } from "./modules/students/student.router";
import errorHandler from "./middleWare/globalErrorHandler";
import { notFound } from "./middleWare/notFounds";


const app:Application = express();

app.use(cors(
    {
        origin:process.env.APP_URL || "http://localhost:3000",
        credentials:true
    }
))


app.use(express.json())

app.all("/api/auth/*splat", toNodeHandler(auth), adminRoutes);

// tutor api
app.use('/api/v1/tutor', tutorRoutes)

// student api

app.use('/api/v1/students', studentsRoutes)

// booking

app.use('/api/v1/bookings', bookingRoutes)

// reviews
app.use('/api/v1/reviews', reviewsRoutes)


// admin api

app.use('/api/v1/admin', adminRoutes)

// error hadler
app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res)=>{
    res.send("hello")
})

export default app;