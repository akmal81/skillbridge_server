import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),




    trustedOrigins: [
        "https://skillbridge-client-rouge.vercel.app",
        "https://skillbridge-client-jy8514m9q-akmal-hossains-projects.vercel.app",
        "http://localhost:3000"
    ],

   advanced: {
       useSecureCookies: true, // এটি নিশ্চিত করুন
    },
    cookie: {
        // এই তিনটি লাইনই হলো আসল সমাধান
        sameSite: "none", 
        secure: true,     
        httpOnly: true,
    },
    session: {
        cookieCache: {
            enabled: false, // সাময়িকভাবে এটি অফ করে দেখুন সেশন পারসিস্ট করে কি না
        }
    },

    basePath: "/api/auth",




    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "student",
                required: true
            },
            isBan: {
                type: "boolean",
                defaultValue: false,
                required: false
            }
        }
    },

    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            accessType: "offline",
            prompt: "select_account consent",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },




});