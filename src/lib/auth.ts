import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),


    cookie: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
    },

    // ২. সেশন সেটিংস
    session: {
        expiresIn: 60 * 60 * 24 * 7, // ৭ দিন
        updateAge: 60 * 60 * 24,    // ১ দিন
        cookieCache: {
            enabled: false, // এটি অনেক সময় ডিফল্ট Lax কুকি পুশ করে
        }
    },

    // ৩. অ্যাডভান্সড অপশনে crossSite এর বদলে এগুলো ব্যবহার করুন
    advanced: {
        useSecureCookies: true, // প্রোডাকশনে এটি কুকিকে Secure করবে
    },

    // ৪. আপনার ডোমেইনগুলো এখানে দিন
    trustedOrigins: [
        "https://skillbridge-client-rouge.vercel.app",
        "https://skillbridge-client-jy8514m9q-akmal-hossains-projects.vercel.app",
    ],

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