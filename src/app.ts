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
import { categoryRouter } from "./modules/category/categories.router";


const app:Application = express();

// app.use(cors(
//     {
//         origin:process.env.APP_URL || "http://localhost:3000",
//         credentials:true
//     }
// ))

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:4000",
  process.env.PROD_APP_URL, // Production frontend URL
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5000",
].filter(Boolean); 

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);


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
// category
app.use('/api/v1/categories',categoryRouter)


// admin api

app.use('/api/v1/admin', adminRoutes)

// error hadler
app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res)=>{
    res.send("hello")
})

export default app;