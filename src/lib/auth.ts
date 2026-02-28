import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),




    trustedOrigins: [
        process.env.APP_URL,
        process.env.PROD_APP_URL,
        "https://skillbridge-client-rouge.vercel.app",
        "http://localhost:3000",
    ].filter(Boolean) as string[],





    cookie: {
        crossSite: true,
        sameSite: "none",
        secure: true,
        httpOnly: true,
    },






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

    session: {
        expiresIn: 60 * 60 * 24 * 7, // ১ সপ্তাহ (এটি যোগ করুন)
        updateAge: 60 * 60 * 24,    // ১ দিন
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },



    advanced: {
        // এই অংশটি গুরুত্বপূর্ণ
        useSecureCookies: true, // প্রোডাকশনে অবশ্যই true
        crossSite: true,        // এটি নিশ্চিত করুন
    },


    basePath: "/api/auth",


});