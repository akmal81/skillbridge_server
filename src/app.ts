import express, { Application } from "express";
import  cors  from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { UserRole } from "./middleWare/auth";
import { adminRoutes } from "./modules/admin/admin.router";


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

// student api

// admin api

app.use('/api/v1/categories', adminRoutes)


app.get('/', (req, res)=>{
    res.send("hello")
})

export default app;